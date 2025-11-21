const std = @import("std");
const head = std.heap;

const sh = @import("shell.zig");

pub fn main() !void {
    var gpa = head.GeneralPurposeAllocator(.{}){};
    const alc = gpa.allocator();
    const res = try sh.exec(alc, "echo abc", .{});
    defer alc.free(res.stderr);
    defer alc.free(res.stdout);
    _ = try sh.execInteractive(alc, "echo abc", .{});
}
