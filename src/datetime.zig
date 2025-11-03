const std = @import("std");
const fmt = std.fmt;
const mem = std.mem;

const shell = @import("shell.zig");

const log = std.log.scoped(.datetime);

pub fn hour(alc: mem.Allocator) !u8 {
    const run_res = try shell.runCapture(alc, "date +%H", .{});
    defer alc.free(run_res.stderr);
    defer alc.free(run_res.stdout);

    const trimmed = std.mem.trim(
        u8,
        run_res.stdout,
        " \n\r\t",
    );

    return try fmt.parseInt(u8, trimmed, 10);
}
