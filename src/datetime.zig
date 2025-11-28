const std = @import("std");
const fmt = std.fmt;
const mem = std.mem;

const sh = @import("shell.zig");

pub fn hour(alloc: mem.Allocator) !u32 {
    const raw = try sh.execAlloc(alloc, "date +%H", .{});
    defer alloc.free(raw.stderr);
    defer alloc.free(raw.stdout);
    const trimmed = mem.trim(u8, raw.stdout, " \n\r\t");
    return try fmt.parseUnsigned(u32, trimmed, 10);
}
