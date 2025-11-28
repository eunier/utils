const std = @import("std");
const head = std.heap;

const datetime = @import("datetime.zig");
const sh = @import("shell.zig");

const log = std.log.scoped(.main);

pub fn main() !void {
    var gpa = head.GeneralPurposeAllocator(.{}){};
    const alloc = gpa.allocator();
    const echo = try sh.execAlloc(alloc, "echo abc", .{});
    defer alloc.free(echo.stderr);
    defer alloc.free(echo.stdout);
    _ = try sh.execInteractive(alloc, "echo abc", .{});
    const hour = try datetime.hour(alloc);
    log.info("{d}", .{hour});
}
