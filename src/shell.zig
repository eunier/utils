const std = @import("std");
const fmt_mod = std.fmt;
const mem = std.mem;
const process = std.process;

const log = std.log.scoped(.dep_util_shell);

pub fn runInteractive(alc: mem.Allocator, comptime fmt: []const u8, args: anytype) !process.Child.Term {
    const cmd = try fmt_mod.allocPrint(alc, fmt, args);
    defer alc.free(cmd);

    var process_child = process.Child.init(
        &[_][]const u8{ "/usr/bin/env", "bash", "-c", cmd },
        alc,
    );

    process_child.stderr_behavior = .Inherit;
    process_child.stdin_behavior = .Inherit;
    process_child.stdout_behavior = .Inherit;
    log.debug("{s}", .{cmd});
    return try process_child.spawnAndWait();
}

/// Spawns a child process, waits for it, collecting stdout and stderr, and then returns. If it
/// succeeds, the caller owns result.stdout and result.stderr memory.
pub fn runCapture(
    alc: mem.Allocator,
    comptime fmt: []const u8,
    args: anytype,
) process.Child.RunError!process.Child.RunResult {
    const cmd = try fmt_mod.allocPrint(alc, fmt, args);
    defer alc.free(cmd);
    log.debug("{s}", .{cmd});

    return process.Child.run(
        .{
            .allocator = alc,
            .argv = &[_][]const u8{ "/usr/bin/env", "bash", "-c", cmd },
        },
    );
}
