const std = @import("std");
const fmt_mod = std.fmt;
const mem = std.mem;
const process = std.process;
const posix = std.posix;

const log = std.log.scoped(.dep_util_shell);

pub fn exec(
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
            .argv = &[_][]const u8{ shell(), "-c", cmd },
        },
    );
}

pub fn execInteractive(alc: mem.Allocator, comptime fmt: []const u8, args: anytype) !process.Child.Term {
    const cmd = try fmt_mod.allocPrint(alc, fmt, args);
    defer alc.free(cmd);
    log.debug("{s}", .{cmd});

    var process_child = process.Child.init(
        &[_][]const u8{ shell(), "-c", cmd },
        alc,
    );

    process_child.stderr_behavior = .Inherit;
    process_child.stdin_behavior = .Inherit;
    process_child.stdout_behavior = .Inherit;
    return try process_child.spawnAndWait();
}

fn shell() []const u8 {
    if (posix.getenv("SHELL")) |s| return s;
    return "sh";
}
