const std = @import("std");
const fmt_mod = std.fmt;
const mem = std.mem;
const process = std.process;
const posix = std.posix;

const log = std.log.scoped(.utils_shell);

pub fn execAlloc(
    alloc: mem.Allocator,
    comptime fmt: []const u8,
    args: anytype,
) process.Child.RunError!process.Child.RunResult {
    const cmd = try fmt_mod.allocPrint(alloc, fmt, args);
    defer alloc.free(cmd);

    return process.Child.run(
        .{
            .allocator = alloc,
            .argv = &[_][]const u8{ shell(), "-c", cmd },
        },
    );
}

pub fn execInteractive(
    alloc: mem.Allocator,
    comptime fmt: []const u8,
    args: anytype,
) !process.Child.Term {
    const cmd = try fmt_mod.allocPrint(alloc, fmt, args);
    defer alloc.free(cmd);

    var process_child = process.Child.init(
        &[_][]const u8{ shell(), "-c", cmd },
        alloc,
    );

    process_child.stderr_behavior = .Inherit;
    process_child.stdin_behavior = .Inherit;
    process_child.stdout_behavior = .Inherit;
    return try process_child.spawnAndWait();
}

pub fn commandExists(
    alloc: mem.Allocator,
    comptime fmt: []const u8,
    args: anytype,
) !bool {
    const cmd = try fmt_mod.allocPrint(alloc, fmt, args);
    defer alloc.free(cmd);

    const res = try execAlloc(
        alloc,
        "command -v {s}",
        .{cmd},
    );

    defer alloc.free(res.stderr);
    defer alloc.free(res.stdout);
    return res.term == .Exited and res.term.Exited == 0;
}

fn shell() []const u8 {
    if (posix.getenv("SHELL")) |s| return s;
    return "sh";
}
