/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof KIT === "undefined" || typeof A !== "function")
return;
var E = (typeof CUSTOM_SHAPE !== "undefined" && CUSTOM_SHAPE.ell) ? "ell" : "sph";
var GOLD = 0xE8C050, PI = Math.PI;
function ring(n, r, y, make) { var out = []; for (var k = 0; k < n; k++) {
var a = k / n * PI * 2;
out.push(make(Math.sin(a) * r, y, Math.cos(a) * r, a));
} return out; }
A("firepalace", "structure", [18, 22, 16], [
{ g: "box", s: [16, 6, 14], p: [0, 3, 0], c: 0x6E2410 },
{ g: "box", s: [11, 5, 10], p: [0, 8.5, 0], c: 0x8E3416 },
{ g: "box", s: [6, 4, 6], p: [0, 13, 0], c: 0xA8461C },
{ g: E, s: [2.8, 3.2, 2.8], p: [0, 16.4, 0], c: 0xFFB23A, glow: 1, opa: .95 },
{ g: "cone", s: [1.2, 7, 6], p: [-7, 9.5, -6], c: 0xFF6A1A, glow: 1, opa: .9 }, { g: "cone", s: [1.2, 7, 6], p: [7, 9.5, -6], c: 0xFF6A1A, glow: 1, opa: .9 },
{ g: "cone", s: [1.2, 7, 6], p: [-7, 9.5, 6], c: 0xFF6A1A, glow: 1, opa: .9 }, { g: "cone", s: [1.2, 7, 6], p: [7, 9.5, 6], c: 0xFF6A1A, glow: 1, opa: .9 },
{ g: "box", s: [2.4, 3.6, .3], p: [0, 1.8, 7.05], c: "dark" },
{ g: "box", s: [1.2, 1.6, .2], p: [-5, 3.4, 7.05], c: 0xFFD27A, glow: 1, rep: [2, 10, 0, 0] },
{ g: "box", s: [1, 1.4, .2], p: [-3, 8.6, 5.05], c: 0xFFD27A, glow: 1, rep: [3, 3, 0, 0] },
{ g: "box", s: [16.4, .3, .3], p: [0, 6.1, 7.1], c: 0xFF8A2A, glow: 1 }
]);
A("airpalace", "structure", [18, 24, 18], [
{ g: E, s: [9, 2, 8], p: [0, 1.6, 0], c: 0xF4F6FA, opa: .92 },
{ g: E, s: [5, 1.6, 4], p: [-6, 2.2, 3], c: 0xFFFFFF, opa: .9 }, { g: E, s: [4.6, 1.4, 4.2], p: [6, 2, -3], c: 0xFFFFFF, opa: .9 },
{ g: "box", s: [10, 6, 9], p: [0, 6.4, 0], c: 0xE6EEF6 },
{ g: "cyl", s: [1.1, 1.3, 15, 10], p: [-5.5, 10.5, -4.5], c: 0xF0F4F8 }, { g: "cyl", s: [1.1, 1.3, 15, 10], p: [5.5, 10.5, -4.5], c: 0xF0F4F8 },
{ g: "cyl", s: [1.1, 1.3, 13, 10], p: [-5.5, 9.5, 4.5], c: 0xF0F4F8 }, { g: "cyl", s: [1.1, 1.3, 13, 10], p: [5.5, 9.5, 4.5], c: 0xF0F4F8 },
{ g: "cone", s: [1.5, 4, 10], p: [-5.5, 20, -4.5], c: 0x9EC8EE }, { g: "cone", s: [1.5, 4, 10], p: [5.5, 20, -4.5], c: 0x9EC8EE },
{ g: "cone", s: [1.5, 4, 10], p: [-5.5, 18, 4.5], c: 0x9EC8EE }, { g: "cone", s: [1.5, 4, 10], p: [5.5, 18, 4.5], c: 0x9EC8EE },
{ g: "sph", s: [3.6], p: [0, 10.6, 0], c: 0xBFE0FA },
{ g: "box", s: [2, 3, .3], p: [0, 4.9, 4.6], c: "dark" },
{ g: "box", s: [1, 1.6, .2], p: [-3, 7, 4.55], c: 0xCFE8FF, glow: 1, rep: [2, 6, 0, 0] }
]);
A("earthpalace", "structure", [22, 16, 18], [
{ g: E, s: [11, 8, 7], p: [0, 4, -4], c: 0x6A5A44 },
{ g: E, s: [5, 6, 5], p: [-8, 3.5, -1], c: 0x5E5040 }, { g: E, s: [5, 5.5, 5], p: [8, 3, -1], c: 0x655644 },
{ g: "box", s: [14, 7, 2], p: [0, 3.5, 3], c: 0x8A7A5E },
{ g: "cyl", s: [.7, .8, 7, 10], p: [-6, 3.5, 4.4], c: 0xA8987A, rep: [5, 3, 0, 0] },
{ g: "box", s: [15, 1, 2.8], p: [0, 7.5, 3.4], c: 0x7A6A50 },
{ g: "cone", s: [7.6, 3, 4], p: [0, 9.5, 3], r: [0, .785, 0], c: 0x4E6A34 },
{ g: "box", s: [2.6, 4, .3], p: [0, 2, 4.55], c: "dark" },
{ g: "cone", s: [.7, 2.6, 6], p: [-9, 1.3, 4], c: 0xFFB84A, glow: 1, opa: .85 }, { g: "cone", s: [.6, 2, 6], p: [9.5, 1, 3.5], c: 0xFFB84A, glow: 1, opa: .85 },
{ g: "cone", s: [.5, 1.6, 6], p: [-3, 10.5, -3], c: 0x7AE0A0, glow: 1, opa: .85 }
]);
A("waterpalace", "structure", [18, 20, 18], [
{ g: "cyl", s: [9, 9, .8, 28], p: [0, .4, 0], c: 0x2A6A8A },
{ g: "cyl", s: [8.4, 8.4, .5, 28], p: [0, .6, 0], c: "water" },
{ g: "box", s: [10, 7, 8], p: [0, 4, -1], c: 0x5AA8C8, opa: .85 },
{ g: "sph", s: [3.8], p: [0, 8.6, -1], c: 0x7AC8E8, opa: .8 },
{ g: "cyl", s: [1, 1.2, 12, 10], p: [-6, 6, -4], c: 0x6AB8D8, opa: .85 }, { g: "cyl", s: [1, 1.2, 12, 10], p: [6, 6, -4], c: 0x6AB8D8, opa: .85 },
{ g: "sph", s: [1.5], p: [-6, 12.6, -4], c: 0x9AD8F0, opa: .85 }, { g: "sph", s: [1.5], p: [6, 12.6, -4], c: 0x9AD8F0, opa: .85 },
{ g: "cone", s: [.8, 3, 8], p: [0, 14, -1], c: 0xBFE8F8, glow: 1, opa: .8 },
{ g: "box", s: [2.2, 3.4, .3], p: [0, 2.3, 3.05], c: "dark" },
{ g: "box", s: [2.4, 8, .15], p: [0, 8, 3.1], c: 0xBFE6F6, opa: .55, glow: 1 }
]);
A("elvenhall", "structure", [16, 22, 14], [
{ g: "box", s: [13, 6, 10], p: [0, 3, 0], c: 0xE8E4D8 },
{ g: E, s: [7, 2.6, 5.6], p: [0, 6.6, 0], c: 0x9AB89A },
{ g: "cyl", s: [.35, .45, 9, 8], p: [-6.2, 4.5, 5.2], c: 0xF2EEE4, rep: [5, 3.1, 0, 0] },
{ g: "box", s: [13.4, .5, .6], p: [0, 9.1, 5.2], c: 0xD8D4C8 },
{ g: "cyl", s: [.9, 1.1, 12, 10], p: [-5.5, 6, -3.5], c: 0xF0ECE2 }, { g: "cyl", s: [.9, 1.1, 15, 10], p: [5.5, 7.5, -3.5], c: 0xF0ECE2 },
{ g: "cone", s: [1.1, 6, 10], p: [-5.5, 15, -3.5], c: 0xC8D8C8 }, { g: "cone", s: [1.1, 7, 10], p: [5.5, 18.5, -3.5], c: 0xC8D8C8 },
{ g: "cone", s: [.7, 9, 8], p: [0, 13.5, -2], c: 0xD8E6D8 },
{ g: "box", s: [1.8, 3.4, .3], p: [0, 1.7, 5.05], c: "dark" },
{ g: "box", s: [.9, 2.2, .2], p: [-4, 3.4, 5.05], c: 0xD8FFE0, glow: 1, rep: [2, 8, 0, 0] },
{ g: "sph", s: [.3], p: [-6.2, 8.2, 5.8], c: 0xCFF8D8, glow: 1, rep: [5, 3.1, 0, 0] }
]);
(function () {
var parts = [{ g: "cyl", s: [1.2, 2, 20, 12], p: [0, 10, 0], c: 0xD8D0C0 },
{ g: E, s: [6, 3.4, 6], p: [0, 20.5, 0], c: 0xA8D0A0 }, { g: E, s: [4, 2.6, 4], p: [3.4, 18, 2], c: 0x9AC890 }, { g: E, s: [4, 2.6, 4], p: [-3.4, 17.5, -1.6], c: 0xB8D8B0 }];
[[5, 4.2], [10, 3.6], [15, 3]].forEach(function (q) { parts.push({ g: "cyl", s: [q[1], q[1], .3, 20], p: [0, q[0], 0], c: 0xE8E0D0 }); });
ring(8, 3.8, 5.6, function (x, y, z) { return { g: "sph", s: [.22], p: [x, y, z], c: 0xE8FFD0, glow: 1 }; }).forEach(function (p) { parts.push(p); });
ring(6, 3.2, 10.6, function (x, y, z) { return { g: "sph", s: [.22], p: [x, y, z], c: 0xE8FFD0, glow: 1 }; }).forEach(function (p) { parts.push(p); });
A("elventree", "nature", [12, 24, 12], parts);
})();
A("dwarvenhall", "structure", [26, 24, 22], [
{ g: "cone", s: [13, 22, 8], p: [0, 11, -4], c: 0x5A544C },
{ g: E, s: [7, 6, 6], p: [-9, 3.5, 1], c: 0x524C44 }, { g: E, s: [7, 5.5, 6], p: [9, 3, 1], c: 0x575148 },
{ g: "box", s: [11, 11, 1.4], p: [0, 5.5, 5.4], c: 0x6E665A },
{ g: "box", s: [12, 1.4, 1.8], p: [0, 11.4, 5.6], c: 0x7A7264 },
{ g: "box", s: [4.8, 7.6, .4], p: [0, 3.8, 6.3], c: "dark" },
{ g: "box", s: [7, .4, .2], p: [0, 8.6, 6.25], c: 0xFFB050, glow: 1 },
{ g: "box", s: [2.2, 7.4, 2], p: [-7, 3.7, 5.8], c: 0x8A8070 }, { g: "box", s: [2.2, 7.4, 2], p: [7, 3.7, 5.8], c: 0x8A8070 },
{ g: "sph", s: [1.2], p: [-7, 8.4, 5.8], c: 0x8A8070 }, { g: "sph", s: [1.2], p: [7, 8.4, 5.8], c: 0x8A8070 },
{ g: "cone", s: [1.1, 2.6, 6], p: [-7, 6.6, 7], r: [PI, 0, 0], c: 0x9A9080 }, { g: "cone", s: [1.1, 2.6, 6], p: [7, 6.6, 7], r: [PI, 0, 0], c: 0x9A9080 },
{ g: "cyl", s: [.7, .4, 1.2, 8], p: [-3.6, .6, 7.6], c: 0x3A3430 }, { g: "cyl", s: [.7, .4, 1.2, 8], p: [3.6, .6, 7.6], c: 0x3A3430 },
{ g: "cone", s: [.55, 1.2, 6], p: [-3.6, 1.7, 7.6], c: 0xFF8A2A, glow: 1, opa: .9 }, { g: "cone", s: [.55, 1.2, 6], p: [3.6, 1.7, 7.6], c: 0xFF8A2A, glow: 1, opa: .9 }
]);
(function () {
var parts = ring(9, 5.2, 1.4, function (x, y, z, a) { return { g: "box", s: [1, 2.8 + ((a * 7) % 1) * 1.2, .7], p: [x, y, z], r: [0, a, 0], c: 0x4A4A50 }; });
parts.push({ g: "cyl", s: [1.4, 1.6, .3, 10], p: [0, .15, 0], c: 0x2A2420 });
parts.push({ g: "cone", s: [.9, 2.4, 7], p: [0, 1.4, 0], c: 0xFF7A1E, glow: 1, opa: .9 });
parts.push({ g: "cone", s: [.6, 1.8, 7], p: [.4, 1.2, .3], c: 0xFFC23A, glow: 1, opa: .9 });
parts.push({ g: "cyl", s: [.9, .7, 1.2, 12], p: [2.4, .7, 1.6], c: 0x1A1A1E });
parts.push({ g: "cyl", s: [.82, .82, .1, 12], p: [2.4, 1.3, 1.6], c: 0x6AF06A, glow: 1, opa: .9 });
parts.push({ g: "box", s: [.08, 2.4, .08], p: [-3, 1.1, 2.8], r: [0, 0, .3], c: 0x6A4A2A });
parts.push({ g: "cone", s: [.35, .8, 6], p: [-3.3, .35, 2.8], c: 0x8A7A4A });
A("coven", "nature", [12, 4, 12], parts);
})();
A("witchhut", "infra", [6, 10, 6], [
{ g: "cyl", s: [.22, .3, 3, 6], p: [-1, 1.6, .2], r: [0, 0, .25], c: 0xC8A86A }, { g: "cyl", s: [.22, .3, 3, 6], p: [1, 1.6, -.2], r: [0, 0, -.25], c: 0xC8A86A },
{ g: "cyl", s: [.28, .22, 2, 6], p: [-1.2, 3.9, 0], r: [0, 0, -.3], c: 0xC8A86A }, { g: "cyl", s: [.28, .22, 2, 6], p: [1.2, 3.9, 0], r: [0, 0, .3], c: 0xC8A86A },
{ g: "box", s: [.9, .15, 1.4], p: [-1.4, .08, .5], c: 0xD8B060 }, { g: "box", s: [.9, .15, 1.4], p: [1.4, .08, .1], c: 0xD8B060 },
{ g: "box", s: [4, 3, 3.6], p: [0, 6.2, 0], r: [0, 0, .04], c: 0x4A3A2A },
{ g: "cone", s: [3.4, 2.8, 4], p: [0, 9, 0], r: [0, .785, .06], c: 0x6A5A3A },
{ g: "box", s: [.6, 1.8, .6], p: [1.2, 9.6, -.6], r: [0, 0, -.2], c: 0x3A2A20 },
{ g: "box", s: [.9, .9, .15], p: [.8, 6.4, 1.85], c: 0x8AF08A, glow: 1 },
{ g: "box", s: [1, 1.8, .15], p: [-.9, 5.6, 1.85], c: 0x1E1814 }
]);
A("wizardtower", "structure", [7, 32, 7], [
{ g: "cyl", s: [2.6, 3.1, 18, 14], p: [0, 9, 0], c: 0x6A6A7A },
{ g: "cyl", s: [3.3, 2.8, 4, 14], p: [0, 20, 0], c: 0x5A5A6E },
{ g: "cone", s: [3.7, 8, 14], p: [0, 26, 0], c: 0x2A3A8A },
{ g: "box", s: [1.4, 2.4, .4], p: [0, 1.2, 2.95], c: "dark" },
{ g: "box", s: [.7, 1.1, .2], p: [0, 7, 2.85], c: 0xFFE08A, glow: 1, rep: [3, 0, 4, 0] },
{ g: "box", s: [.8, 1.2, .2], p: [0, 20, 3.3], c: 0xFFE08A, glow: 1 },
{ g: "sph", s: [.9], p: [0, 31.3, 0], c: 0x9AD0FF, glow: 1, opa: .95 },
{ g: "box", s: [.25, .25, .25], p: [1.6, 24, 1.6], c: 0xFFF2A0, glow: 1 }, { g: "box", s: [.22, .22, .22], p: [-1.4, 26.5, 1.2], c: 0xFFF2A0, glow: 1 },
{ g: "box", s: [.25, .25, .25], p: [.4, 28, -1.2], c: 0xFFF2A0, glow: 1 }
]);
A("floatingcastle", "nature", [16, 30, 16], [
{ g: "cone", s: [7, 10, 9], p: [0, 13, 0], r: [PI, 0, 0], c: 0x6A5E50 },
{ g: E, s: [7.4, 1.4, 7.4], p: [0, 18.2, 0], c: 0x4E7A3A },
{ g: "box", s: [8, 5, 7], p: [0, 21.5, 0], c: 0xB8B0A2 },
{ g: "cyl", s: [1.3, 1.4, 9, 10], p: [-4.5, 23, -3.5], c: 0xC8C0B2 }, { g: "cyl", s: [1.3, 1.4, 9, 10], p: [4.5, 23, -3.5], c: 0xC8C0B2 },
{ g: "cyl", s: [1.3, 1.4, 8, 10], p: [-4.5, 22.5, 3.5], c: 0xC8C0B2 }, { g: "cyl", s: [1.3, 1.4, 8, 10], p: [4.5, 22.5, 3.5], c: 0xC8C0B2 },
{ g: "cone", s: [1.7, 3.6, 10], p: [-4.5, 29.3, -3.5], c: 0x3A4A8A }, { g: "cone", s: [1.7, 3.6, 10], p: [4.5, 29.3, -3.5], c: 0x3A4A8A },
{ g: "cone", s: [1.7, 3.6, 10], p: [-4.5, 28.3, 3.5], c: 0x3A4A8A }, { g: "cone", s: [1.7, 3.6, 10], p: [4.5, 28.3, 3.5], c: 0x3A4A8A },
{ g: "box", s: [1.6, 2.4, .2], p: [0, 20.2, 3.55], c: 0x2A1E16 },
{ g: "box", s: .1 > 0 ? [1.2, 6, .2] : [1, 1, 1], p: [5.5, 15, 5], c: 0xCFE6F4, opa: .6, glow: 1 }
]);
A("goldenhall", "structure", [22, 14, 14], [
{ g: "box", s: [20, 6, 12], p: [0, 3, 0], c: 0xB8862E },
{ g: "box", s: [20.6, .5, 7.6], p: [0, 8.4, -3], r: [-.72, 0, 0], c: GOLD },
{ g: "box", s: [20.6, .5, 7.6], p: [0, 8.4, 3], r: [.72, 0, 0], c: GOLD },
{ g: "box", s: [.4, 3, .4], p: [-10.2, 11.2, 0], r: [.5, 0, 0], c: GOLD }, { g: "box", s: [.4, 3, .4], p: [-10.2, 11.2, 0], r: [-.5, 0, 0], c: GOLD },
{ g: "box", s: [.4, 3, .4], p: [10.2, 11.2, 0], r: [.5, 0, 0], c: GOLD }, { g: "box", s: [.4, 3, .4], p: [10.2, 11.2, 0], r: [-.5, 0, 0], c: GOLD },
{ g: "box", s: [2.6, 4, .4], p: [0, 2, 6.1], c: "dark" },
{ g: "cyl", s: [.75, .75, .15, 14], p: [-8, 3.4, 6.1], r: [1.5708, 0, 0], c: 0xA02A2A, rep: [4, 3, 0, 0] },
{ g: "cyl", s: [.75, .75, .15, 14], p: [4, 3.4, 6.1], r: [1.5708, 0, 0], c: 0x2A4AA0, rep: [2, 4, 0, 0] },
{ g: "box", s: [20.4, .4, .4], p: [0, 6.1, 6.1], c: 0xFFD870, glow: 1 }
]);
(function () {
var parts = [], W = 20, n = 8, c = W / n, hedge = 0x2E5A2A;
function wall(x1, z1, x2, z2) { var cx = (x1 + x2) / 2, cz = (z1 + z2) / 2, w = Math.abs(x2 - x1) || .8, d = Math.abs(z2 - z1) || .8; parts.push({ g: "box", s: [w + .8, 2.4, d + .8], p: [cx - W / 2, 1.2, cz - W / 2], c: hedge }); }
wall(0, 0, W, 0);
wall(0, W, W / 2 - c / 2, W);
wall(W / 2 + c / 2, W, W, W);
wall(0, 0, 0, W);
wall(W, 0, W, W);
var seed = 7;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
for (var i = 1; i < n; i++)
for (var j = 0; j < n; j++) {
if (rnd() < 0.45)
wall(i * c, j * c, i * c, (j + 1) * c);
if (rnd() < 0.45)
wall(j * c, i * c, (j + 1) * c, i * c);
}
parts.push({ g: "cyl", s: [.9, 1.1, 1, 10], p: [0, .5, 0], c: 0xB8B0A2 }, { g: "sph", s: [.6], p: [0, 1.5, 0], c: 0xD8D0C2 });
A("hedgemaze", "nature", [21, 3, 21], parts);
})();
A("forge", "infra", [6, 5, 4.6], [
{ g: "box", s: [3.4, 1.2, 2.6], p: [-1, .6, -.4], c: 0x5A544C },
{ g: "box", s: [2.6, .2, 1.8], p: [-1, 1.25, -.4], c: 0xFF6A1A, glow: 1 },
{ g: "box", s: [1.4, 4, 1.4], p: [-1.6, 3, -1.2], c: 0x4A443E },
{ g: "box", s: [.5, .8, .5], p: [1.8, .4, .6], c: 0x2A2826 }, { g: "box", s: [1.2, .35, .5], p: [1.8, .95, .6], c: 0x3A3A3E },
{ g: "box", s: [3, 2.6, .15], p: [-1, 3.4, 1.6], c: 0x6A4A2A, opa: 0 }
]);
(function () {
var k = 1.4, parts = (KIT.cave && KIT.cave.parts || []).map(function (pt) { var q = JSON.parse(JSON.stringify(pt)); q.s = q.s.map(function (v, i) { return i < 3 ? v * k : v; }); q.p = q.p.map(function (v) { return v * k; }); return q; });
parts.push({ g: "cone", s: [1.6, 1.2, 7], p: [-5, .6, 7.4], c: GOLD, glow: 1, opa: .95 }, { g: "cone", s: [1.2, .9, 7], p: [4.6, .45, 7.2], c: GOLD, glow: 1, opa: .95 }, { g: "box", s: [1.2, .8, .8], p: [3.2, .4, 8], c: 0x6A3A1A });
A("dragonlair", "nature", [20, 12, 14], parts, { caveLike: true, doorZ: 7.1 });
})();
if (typeof BELONGS !== "undefined") {
if (KIT.elf) {
BELONGS.elvenhall = [{ n: [2, 4], kind: "elf", role: "resident", lives: true }];
BELONGS.elventree = [{ n: [1, 3], kind: "elf", role: "resident", lives: true }];
}
if (KIT.dwarf)
BELONGS.dwarvenhall = [{ n: [3, 6], kind: "dwarf", role: "resident", lives: true }];
if (KIT.witch) {
BELONGS.coven = [{ n: [3, 5], kind: "witch", role: "resident" }];
BELONGS.witchhut = [{ n: [1, 1], kind: "witch", role: "resident", lives: true }];
}
if (KIT.wizard)
BELONGS.wizardtower = [{ n: [1, 1], kind: "wizard", role: "resident", lives: true }];
if (KIT.knight)
BELONGS.goldenhall = [{ n: [2, 4], kind: "knight", role: "keeper" }];
if (KIT.dragon)
BELONGS.dragonlair = [{ n: [1, 1], kind: "dragon", role: "keeper" }];
if (KIT.dwarf)
BELONGS.forge = [{ n: [1, 1], kind: "dwarf", role: "keeper" }];
}
var STONE = 0x5E584E;
function mat(c) { return new THREE.MeshLambertMaterial({ color: c, flatShading: true }); }
if (typeof FURN !== "undefined") {
FURN.greatpillar = function () { return F([P(new THREE.CylinderGeometry(.7, .85, 7, 10), mat(STONE), 0, 3.5, 0), P(box(1.9, .5, 1.9), mat(0x4E4840), 0, .25, 0), P(box(1.9, .5, 1.9), mat(0x4E4840), 0, 6.75, 0)]); };
FURN.anvil = function () { return F([P(box(.5, .7, .5), mat(0x2A2826), 0, .35, 0), P(box(1.1, .32, .45), mat(0x3A3A3E), 0, .86, 0)]); };
FURN.hearthforge = function () { return F([P(box(2.6, 1.1, 1.8), mat(0x4E4840), 0, .55, 0), P(box(2, .12, 1.3), new THREE.MeshBasicMaterial({ color: 0xFF6A1A }), 0, 1.16, 0), P(box(1.2, 4, 1.2), mat(0x3E3A34), 0, 3, -.4)]); };
FURN.firebowl = function () { return F([P(new THREE.CylinderGeometry(.6, .35, .5, 10), mat(0x2E2A26), 0, 1, 0), P(new THREE.CylinderGeometry(.1, .14, .8, 6), mat(0x2E2A26), 0, .4, 0), P(new THREE.ConeGeometry(.4, .9, 6), new THREE.MeshBasicMaterial({ color: 0xFF8A2A, transparent: true, opacity: .9 }), 0, 1.6, 0)]); };
FURN.goldpile = function () { return F([P(new THREE.ConeGeometry(1.3, 1, 8), new THREE.MeshLambertMaterial({ color: GOLD, emissive: 0x3A2A08 }), 0, .5, 0), P(new THREE.ConeGeometry(.7, .6, 7), new THREE.MeshLambertMaterial({ color: 0xF4D870, emissive: 0x3A2A08 }), .9, .3, .5)]); };
FURN.hallbanner = function () { return F([P(box(1.4, 4, .05), mat(0x7A1E1E), 0, 4.6, 0), P(box(1.6, .12, .12), mat(GOLD), 0, 6.65, 0), P(box(.6, .6, .06), mat(GOLD), 0, 5.4, .03)]); };
}
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.greatpillar = 1;
SOLIDFURN.hearthforge = 1;
SOLIDFURN.goldpile = 1;
}
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { return k === "greatpillar" ? [1.9, 1.9] : k === "hearthforge" ? [2.6, 1.8] : k === "goldpile" ? [2.4, 2.4] : fb.apply(this, arguments); };
}
if (typeof PLANS !== "undefined") {
PLANS.dwarvenhall = { mode: "hall", w: 22, d: 40, h: 8, fill: "dwarvenhall", wall: 0x4E4840, floor: "stone" };
if (PLANS.cave)
PLANS.dragonlair = Object.assign({}, PLANS.cave, { fill: "lair", w: 18, d: 24 });
if (PLANS.tower)
PLANS.wizardtower = PLANS.tower;
}
if (typeof ROOMNAME !== "undefined") {
ROOMNAME.dwarvenhall = "the great hall";
ROOMNAME.lair = "the hoard";
}
if (typeof STOREYS !== "undefined") {
STOREYS.wizardtower = 4;
STOREYS.dwarvenhall = 1;
STOREYS.firepalace = 2;
STOREYS.waterpalace = 2;
STOREYS.airpalace = 2;
STOREYS.earthpalace = 1;
STOREYS.elvenhall = 2;
STOREYS.goldenhall = 1;
}
if (typeof fillHall === "function") {
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (kind === "lair") {
fh("cave", W, D, put, spots);
put("goldpile", 0, -D / 2 + 3, 0);
put("goldpile", -W / 4, -D / 4, 1);
put("goldpile", W / 4, -D / 3, 2);
put("goldpile", -W / 5, D / 8, 3);
put("goldpile", W / 5, D / 5, 4);
return;
}
if (kind !== "dwarvenhall")
return fh.apply(this, arguments);
for (var z = -D / 2 + 4; z < D / 2 - 3; z += 6) {
put("greatpillar", -W / 2 + 3.4, z, 0);
put("greatpillar", W / 2 - 3.4, z, 0);
}
for (var z2 = -D / 2 + 8; z2 < D / 2 - 6; z2 += 7)
put("longtable", 0, z2, PI / 2);
put("throneseat", 0, -D / 2 + 1.6, 0);
put("hallbanner", -2.4, -D / 2 + .2, 0);
put("hallbanner", 2.4, -D / 2 + .2, 0);
put("hearthforge", -W / 2 + 2, -D / 2 + 3, PI / 2);
put("anvil", -W / 2 + 4, -D / 2 + 3.4, 0);
put("hearthforge", W / 2 - 2, -D / 2 + 3, -PI / 2);
put("anvil", W / 2 - 4, -D / 2 + 3.4, 0);
for (var z3 = -D / 2 + 7; z3 < D / 2 - 3; z3 += 12) {
put("firebowl", -W / 4, z3, 0);
put("firebowl", W / 4, z3, 0);
}
spots.push({ x: 0, z: D / 2 - 4, room: "great hall" }, { x: 0, z: -D / 2 + 4, room: "great hall" });
};
}
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
if (!I || !spec || spec.archetype !== "dwarvenhall")
return I;
var hide = {};
(I.winMats || []).concat(I.winGlints || []).forEach(function (m) { hide[m.uuid] = 1; });
I.root.traverse(function (m) { if (m.isMesh && m.material && hide[m.material.uuid])
m.visible = false; });
I.winMats = [];
I.winGlints = [];
I.root.add(P(box(I.W + .4, .5, I.D + .4), mat(0x3A3630), 0, (I.ceilH || 8) - .75, 0));
return I;
};
}
var WORDS = {
firepalace: ["fire palace", "palace of fire", "flame palace", "palace of flames", "burning palace", "fire elemental palace", "fire temple", "palace made of flame", "palace made of fire"],
airpalace: ["air palace", "wind palace", "palace of air", "palace of wind", "sky palace", "palace in the sky", "air elemental palace", "palace of the winds"],
earthpalace: ["earth palace", "palace of earth", "stone palace", "palace carved from stone", "palace carved into the mountain", "earth elemental palace", "rock palace"],
waterpalace: ["water palace", "palace of water", "palace of waves", "water elemental palace", "river palace", "fountain palace"],
elvenhall: ["elven hall", "elven halls", "elven city", "elven palace", "elvish city", "elvish hall", "elf city", "elven kingdom", "elf kingdom", "rivendell", "elven realm", "elven lands", "land of the elves", "elven village"],
elventree: ["elven tree", "elf tree", "mallorn", "great silver tree", "tree city", "lothlorien"],
dwarvenhall: ["dwarven hall", "dwarven halls", "dwarf hall", "dwarven city", "dwarf city", "dwarven kingdom", "dwarf kingdom", "dwarven colony", "dwarven mountain colony", "dwarven mountain", "dwarf mountain", "great hall beneath the mountain", "great hall under the mountain", "halls beneath the mountain", "hall under the mountain", "halls under the mountain", "hall beneath the mountain", "moria", "erebor", "mountain hall"],
coven: ["coven", "coven of witches", "witches' coven", "witches circle", "witches' circle", "circle of witches", "witches' sabbath", "sabbath", "coven of warlocks", "warlock coven", "warlocks' circle"],
witchhut: ["hut on chicken legs", "house on chicken legs", "baba yaga", "baba yaga's hut", "witch's hut", "witch hut", "witches hut", "witch's cottage", "witch's house"],
wizardtower: ["wizard's tower", "wizard tower", "wizards tower", "mage tower", "mage's tower", "sorcerer's tower", "magic tower", "tower of sorcery", "warlock's tower"],
floatingcastle: ["floating castle", "castle in the sky", "flying castle", "sky castle", "castle in the clouds", "giant's castle", "castle above the clouds"],
goldenhall: ["asgard", "valhalla", "golden hall", "golden halls", "mead hall", "hall of the gods", "norse hall", "viking hall", "el dorado", "city of gold", "golden city", "halls of asgard"],
hedgemaze: ["maze", "labyrinth", "hedge maze", "maze of hedges", "garden maze", "stone labyrinth"],
forge: ["forge", "smithy", "blacksmith's forge", "blacksmith forge", "dwarf forge", "dwarven forge", "anvil", "foundry fire"],
dragonlair: ["dragon's lair", "dragon lair", "dragons lair", "dragon's hoard", "dragon hoard", "dragon's cave", "dragon cave", "lair of a dragon"],
mineshaft: ["gold mine", "coal mine", "mine shaft", "old mine", "the mines", "dwarven mine", "silver mine", "diamond mine"],
standingstones: ["stone circle", "druid circle", "druid stone circle", "circle of stones", "henge"],
shop: ["potion shop", "apothecary", "magic shop", "alchemist's shop", "alchemist shop"],
wreckedship: ["ghost ship", "haunted ship", "phantom ship", "flying dutchman"],
boardedshack: ["ghost town", "abandoned town"],
castle: ["camelot", "king arthur's castle"],
cloudpalace: ["olympus", "mount olympus", "palace of the gods", "heaven's gate palace"]
};
if (typeof learnWord === "function")
Object.keys(WORDS).forEach(function (k) {
if (!KIT[k])
return;
WORDS[k].forEach(function (w) {
if (typeof PHRASES !== "undefined")
for (var i = PHRASES.length - 1; i >= 0; i--)
if (PHRASES[i][0] === w && PHRASES[i][1] !== k)
PHRASES.splice(i, 1);
if (typeof VOCAB !== "undefined")
Object.keys(VOCAB).forEach(function (o) { if (o !== k && VOCAB[o]) {
var j = VOCAB[o].indexOf(w);
if (j > -1)
VOCAB[o].splice(j, 1);
} });
learnWord(k, w);
});
});
})();
(function () {
if (typeof EFFECTS === "undefined")
return;
function ph(spec) { var s = String((spec && spec.id) || ""), h = 0; for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) >>> 0; return (h % 628) / 100; }
function kids(g) { return g.children.filter(function (c) { return !c.userData.contact && !c.userData.model && c.name !== "model"; }); }
function glowMats(g) { var out = []; g.traverse(function (c) { if (c.material && c.material.transparent && c.material.opacity > 0.05 && !c.userData.contact)
out.push({ m: c.material, o: c.material.opacity }); }); return out; }
function pts(n, spread, col, size, opa) { return (typeof particles === "function") ? particles(n, spread, col, size, opa) : null; }
function at(g, p, x, y, z) { if (p) {
p.position.set(x, y, z);
g.add(p);
} return p; }
function up(p, dt, s, d) { if (p && typeof rise === "function")
rise(p, dt, s, d || 0); }
function down(p, dt, s) { if (p && typeof fall === "function")
fall(p, dt, s, 0); }
function pulse(g, spec, lo, sp) { var M = glowMats(g), q = ph(spec); return function (t) { var k = lo + (1 - lo) * (0.5 + 0.5 * Math.sin(t * sp + q)); M.forEach(function (x) { x.m.opacity = x.o * k; }); }; }
function hover(g, spec, h, sp) {
var K = kids(g), q = ph(spec);
K.forEach(function (c) { c.userData.y0 = c.position.y; });
return function (t) { var dy = Math.sin(t * sp + q) * h; K.forEach(function (c) { c.position.y = c.userData.y0 + dy; }); };
}
EFFECTS.firepalace = function (g, spec) {
var P = pulse(g, spec, 0.6, 3.1), F = [[-7, 13, -6], [7, 13, -6], [-7, 13, 6], [7, 13, 6], [0, 18, 0]].map(function (q) { return at(g, pts(24, [.7, 3.4, .7], 0xFF8A2A, 1.6, .8), q[0], q[1], q[2]); });
return function (t, dt) { P(t); F.forEach(function (f) { up(f, dt, 3.2); }); };
};
EFFECTS.airpalace = function (g, spec) {
var H = hover(g, spec, 0.5, 0.4), W = at(g, pts(80, [11, 6, 11], 0xFFFFFF, 1.4, .45), 0, 1, 0);
return function (t, dt) { H(t); if (W)
W.rotation.y += dt * 0.25; };
};
EFFECTS.earthpalace = function (g, spec) { return pulse(g, spec, 0.5, 1.2); };
EFFECTS.waterpalace = function (g, spec) {
var P = pulse(g, spec, 0.75, 1.4), W = at(g, pts(160, [1, 13, .3], 0xCFE8F6, 1.1, .7), 0, 1, 3.3), M = at(g, pts(50, [4, 2, 2], 0xE6F2F8, 1.8, .4), 0, .6, 3.5);
return function (t, dt) { P(t); down(W, dt, 7); up(M, dt, .8); };
};
EFFECTS.elvenhall = function (g, spec) { return pulse(g, spec, 0.55, 1.1); };
EFFECTS.elventree = function (g, spec) {
var P = pulse(g, spec, 0.5, 1.3), q = ph(spec), Mo = at(g, pts(40, [5, 14, 5], 0xE8FFD0, 1.2, .6), 0, 4, 0);
return function (t, dt) { P(t); g.rotation.z = Math.sin(t * .6 + q) * .008; up(Mo, dt, .5, .1); };
};
EFFECTS.dwarvenhall = function (g, spec) {
var P = pulse(g, spec, 0.6, 4), S = [at(g, pts(20, [.5, 3, .5], 0xFF9A3A, 1.3, .8), -3.6, 1.4, 7.6), at(g, pts(20, [.5, 3, .5], 0xFF9A3A, 1.3, .8), 3.6, 1.4, 7.6)];
return function (t, dt) { P(t); S.forEach(function (s) { up(s, dt, 2.4); }); };
};
EFFECTS.coven = function (g, spec) {
var P = pulse(g, spec, 0.55, 5), Fi = at(g, pts(40, [.8, 4, .8], 0xFF9A3A, 1.5, .85), 0, .8, 0), Sm = at(g, pts(30, [1, 6, 1], 0x5A5A5A, 2.4, .35), 0, 3, 0), Gr = at(g, pts(26, [.6, 2.4, .6], 0x7AFF7A, 1.3, .7), 2.4, 1.3, 1.6);
return function (t, dt) { P(t); up(Fi, dt, 3); up(Sm, dt, 1.2, .2); up(Gr, dt, 1); };
};
EFFECTS.witchhut = function (g, spec) {
var K = kids(g), q = ph(spec);
K.forEach(function (c) { c.userData.y0 = c.position.y; c.userData.r0 = c.rotation.z; });
var Sm = at(g, pts(20, [.4, 4, .4], 0x7A7A7A, 1.8, .35), 1.4, 10.4, -.7);
return function (t, dt) {
var step = Math.sin(t * 1.6 + q);
K.forEach(function (c) { if (c.userData.y0 > 4.5) {
c.position.y = c.userData.y0 + Math.abs(step) * .25;
} });
g.rotation.z = step * .03;
up(Sm, dt, .9, .2);
};
};
EFFECTS.wizardtower = function (g, spec) {
var P = pulse(g, spec, 0.5, 1.6), orb = null;
g.children.forEach(function (c) { if (c.position && c.position.y > 31)
orb = c; });
var y0 = orb ? orb.position.y : 0, Sp = at(g, pts(30, [2, 3, 2], 0xBFE0FF, 1, .7), 0, 29.5, 0);
return function (t, dt) { P(t); if (orb) {
orb.position.y = y0 + Math.sin(t * 1.3) * .35;
} if (Sp)
Sp.rotation.y += dt * .8; up(Sp, dt, .6); };
};
EFFECTS.floatingcastle = function (g, spec) {
var H = hover(g, spec, 0.9, 0.35), Fa = at(g, pts(120, [.6, 9, .3], 0xCFE6F4, 1.1, .6), 5.5, 8, 5);
return function (t, dt) { H(t); down(Fa, dt, 6); };
};
EFFECTS.goldenhall = function (g, spec) { return pulse(g, spec, 0.6, 1); };
EFFECTS.forge = function (g, spec) {
var P = pulse(g, spec, 0.6, 6), Sm = at(g, pts(26, [.5, 5, .5], 0x6A6560, 2, .35), -1.6, 5, -1.2), Sp = at(g, pts(16, [.6, 1.6, .6], 0xFFB050, .9, .9), 1.8, 1.1, .6);
return function (t, dt) { P(t); up(Sm, dt, 1.2, .2); up(Sp, dt, 2); };
};
EFFECTS.dragonlair = function (g, spec) {
var P = pulse(g, spec, 0.75, 2.2), Sm = at(g, pts(24, [1.2, 4, .6], 0x5A5550, 2.2, .3), 0, 3, 6.4);
return function (t, dt) { P(t); up(Sm, dt, .8, .1); };
};
})();
