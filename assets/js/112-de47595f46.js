/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof A !== "function" || typeof KIT === "undefined")
return;
var W = 0xF2F1EC, WOOD = 0x8A5A3A, DWOOD = 0x5A3A26, STEEL = 0xA7AAB0, DARK = 0x24262C, BLACK = 0x111216;
if (!KIT.fridge)
A("fridge", "infra", [0.9, 1.9, 0.8], [
{ g: "box", s: [0.9, 1.9, 0.78], p: [0, 0.95, 0], c: 0xE6E7EA },
{ g: "box", s: [0.86, 0.02, 0.02], p: [0, 1.25, 0.4], c: 0x9A9DA4 },
{ g: "box", s: [0.04, 0.4, 0.05], p: [0.36, 1.55, 0.42], c: STEEL },
{ g: "box", s: [0.04, 0.5, 0.05], p: [0.36, 0.8, 0.42], c: STEEL }
]);
if (!KIT.stove)
A("stove", "infra", [0.8, 0.95, 0.7], [
{ g: "box", s: [0.8, 0.9, 0.68], p: [0, 0.45, 0], c: 0xD9DADD },
{ g: "box", s: [0.8, 0.04, 0.68], p: [0, 0.92, 0], c: BLACK },
{ g: "cyl", s: [0.12, 0.12, 0.02, 16], p: [-0.2, 0.95, -0.15], c: 0x3A3C42 },
{ g: "cyl", s: [0.12, 0.12, 0.02, 16], p: [0.2, 0.95, -0.15], c: 0x3A3C42 },
{ g: "cyl", s: [0.1, 0.1, 0.02, 16], p: [-0.2, 0.95, 0.17], c: 0x3A3C42 },
{ g: "cyl", s: [0.1, 0.1, 0.02, 16], p: [0.2, 0.95, 0.17], c: 0x3A3C42 },
{ g: "box", s: [0.62, 0.4, 0.02], p: [0, 0.42, 0.35], c: 0x1C1E24 },
{ g: "box", s: [0.5, 0.03, 0.04], p: [0, 0.7, 0.37], c: STEEL }
]);
if (!KIT.kitchencounter)
A("kitchencounter", "infra", [2.4, 0.95, 0.65], [
{ g: "box", s: [2.4, 0.86, 0.6], p: [0, 0.43, 0], c: 0xB89A72 },
{ g: "box", s: [2.46, 0.06, 0.66], p: [0, 0.89, 0], c: 0xE0DCD2 },
{ g: "box", s: [0.02, 0.7, 0.02], p: [-0.6, 0.45, 0.31], c: DWOOD, rep: [3, 0.6, 0, 0] },
{ g: "box", s: [0.55, 0.05, 0.4], p: [0.6, 0.9, 0], c: STEEL },
{ g: "cyl", s: [0.02, 0.02, 0.3, 8], p: [0.6, 1.05, -0.22], c: STEEL }
]);
if (!KIT.sink)
A("sink", "infra", [0.7, 1.0, 0.55], [
{ g: "box", s: [0.7, 0.85, 0.5], p: [0, 0.43, 0], c: W },
{ g: "box", s: [0.5, 0.06, 0.36], p: [0, 0.88, 0.02], c: 0xC8CCD2 },
{ g: "cyl", s: [0.02, 0.02, 0.22, 8], p: [0, 0.99, -0.18], c: STEEL }
]);
if (!KIT.bed)
A("bed", "infra", [1.6, 1.1, 2.1], [
{ g: "box", s: [1.6, 0.3, 2.1], p: [0, 0.25, 0], c: WOOD },
{ g: "box", s: [1.5, 0.22, 2.0], p: [0, 0.5, 0], c: W },
{ g: "box", s: [1.52, 0.06, 1.4], p: [0, 0.63, 0.3], c: 0x5E7FA8 },
{ g: "box", s: [0.6, 0.14, 0.36], p: [-0.38, 0.68, -0.78], c: 0xFAFAF6 },
{ g: "box", s: [0.6, 0.14, 0.36], p: [0.38, 0.68, -0.78], c: 0xFAFAF6 },
{ g: "box", s: [1.64, 1.1, 0.08], p: [0, 0.55, -1.06], c: DWOOD }
]);
if (!KIT.sofa)
A("sofa", "infra", [2.1, 0.9, 0.9], [
{ g: "box", s: [2.1, 0.42, 0.9], p: [0, 0.21, 0], c: 0x6B4E7A },
{ g: "box", s: [2.1, 0.5, 0.22], p: [0, 0.62, -0.34], c: 0x6B4E7A },
{ g: "box", s: [0.2, 0.3, 0.9], p: [-0.95, 0.55, 0], c: 0x5E4470 },
{ g: "box", s: [0.2, 0.3, 0.9], p: [0.95, 0.55, 0], c: 0x5E4470 },
{ g: "box", s: [0.82, 0.1, 0.62], p: [-0.42, 0.47, 0.08], c: 0x7A5C8A },
{ g: "box", s: [0.82, 0.1, 0.62], p: [0.42, 0.47, 0.08], c: 0x7A5C8A }
]);
if (!KIT.armchair)
A("armchair", "infra", [0.95, 1.0, 0.9], [
{ g: "box", s: [0.95, 0.42, 0.9], p: [0, 0.21, 0], c: 0x8A4A3A },
{ g: "box", s: [0.95, 0.6, 0.2], p: [0, 0.7, -0.35], c: 0x8A4A3A },
{ g: "box", s: [0.16, 0.28, 0.9], p: [-0.4, 0.56, 0], c: 0x7A3E30 },
{ g: "box", s: [0.16, 0.28, 0.9], p: [0.4, 0.56, 0], c: 0x7A3E30 }
]);
if (!KIT.chair)
A("chair", "infra", [0.5, 0.95, 0.5], [
{ g: "box", s: [0.46, 0.05, 0.46], p: [0, 0.46, 0], c: WOOD },
{ g: "box", s: [0.46, 0.48, 0.04], p: [0, 0.72, -0.21], c: WOOD },
{ g: "box", s: [0.04, 0.45, 0.04], p: [-0.2, 0.22, -0.2], c: DWOOD, rep: [2, 0.4, 0, 0], rep2: [2, 0, 0, 0.4] }
]);
if (!KIT.diningtable)
A("diningtable", "infra", [1.8, 0.76, 0.95], [
{ g: "box", s: [1.8, 0.05, 0.95], p: [0, 0.74, 0], c: WOOD },
{ g: "box", s: [0.07, 0.72, 0.07], p: [-0.8, 0.36, -0.4], c: DWOOD, rep: [2, 1.6, 0, 0], rep2: [2, 0, 0, 0.8] }
]);
if (!KIT.desk)
A("desk", "infra", [1.4, 0.76, 0.7], [
{ g: "box", s: [1.4, 0.05, 0.7], p: [0, 0.74, 0], c: WOOD },
{ g: "box", s: [0.45, 0.7, 0.66], p: [0.45, 0.36, 0], c: DWOOD },
{ g: "box", s: [0.05, 0.7, 0.66], p: [-0.66, 0.36, 0], c: DWOOD },
{ g: "box", s: [0.3, 0.02, 0.02], p: [0.45, 0.55, 0.34], c: STEEL, rep: [3, 0, -0.22, 0] }
]);
if (!KIT.bookshelf)
A("bookshelf", "infra", [1.0, 2.0, 0.35], [
{ g: "box", s: [1.0, 2.0, 0.06], p: [0, 1.0, -0.15], c: DWOOD },
{ g: "box", s: [0.05, 2.0, 0.35], p: [-0.48, 1.0, 0], c: DWOOD, rep: [2, 0.96, 0, 0] },
{ g: "box", s: [0.92, 0.04, 0.33], p: [0, 0.05, 0], c: DWOOD, rep: [5, 0, 0.48, 0] },
{ g: "box", s: [0.8, 0.3, 0.24], p: [0, 0.25, 0.02], c: 0x8E3B2E },
{ g: "box", s: [0.7, 0.3, 0.24], p: [0, 0.73, 0.02], c: 0x2E5A8E },
{ g: "box", s: [0.85, 0.3, 0.24], p: [0, 1.21, 0.02], c: 0x3E7A4E },
{ g: "box", s: [0.6, 0.3, 0.24], p: [0, 1.69, 0.02], c: 0xB08A3A }
]);
if (!KIT.tv)
A("tv", "infra", [1.3, 1.3, 0.45], [
{ g: "box", s: [1.3, 0.5, 0.45], p: [0, 0.25, 0], c: DWOOD },
{ g: "box", s: [1.2, 0.7, 0.05], p: [0, 0.9, 0], c: BLACK },
{ g: "box", s: [1.12, 0.62, 0.01], p: [0, 0.9, 0.03], c: 0x2A3A5A }
]);
if (!KIT.bathtub)
A("bathtub", "infra", [1.7, 0.6, 0.8], [
{ g: "box", s: [1.7, 0.55, 0.8], p: [0, 0.28, 0], c: W },
{ g: "box", s: [1.5, 0.04, 0.6], p: [0, 0.54, 0], c: 0x9FC4DA },
{ g: "cyl", s: [0.02, 0.02, 0.25, 8], p: [-0.75, 0.7, 0], c: STEEL }
]);
if (!KIT.toilet)
A("toilet", "infra", [0.42, 0.8, 0.7], [
{ g: "cyl", s: [0.18, 0.14, 0.4, 16], p: [0, 0.2, 0.08], c: W },
{ g: "cyl", s: [0.2, 0.2, 0.04, 16], p: [0, 0.42, 0.08], c: 0xF8F8F6 },
{ g: "box", s: [0.4, 0.38, 0.18], p: [0, 0.6, -0.24], c: W }
]);
if (!KIT.grandpiano)
A("grandpiano", "infra", [1.5, 1.6, 2.0], [
{ g: "box", s: [1.5, 0.3, 1.9], p: [0, 0.85, 0], c: BLACK },
{ g: "box", s: [1.45, 0.04, 1.4], p: [0, 1.35, -0.15], r: [-0.5, 0, 0], c: 0x16171C },
{ g: "box", s: [1.3, 0.06, 0.18], p: [0, 0.98, 1.0], c: 0xF6F4EE },
{ g: "box", s: [0.02, 0.06, 0.18], p: [-0.6, 1.01, 1.0], c: BLACK, rep: [12, 0.11, 0, 0] },
{ g: "cyl", s: [0.05, 0.05, 0.7, 8], p: [-0.6, 0.35, 0.8], c: BLACK },
{ g: "cyl", s: [0.05, 0.05, 0.7, 8], p: [0.6, 0.35, 0.8], c: BLACK },
{ g: "cyl", s: [0.05, 0.05, 0.7, 8], p: [0, 0.35, -0.8], c: BLACK }
]);
if (!KIT.lockers)
A("lockers", "infra", [3.0, 1.9, 0.5], [
{ g: "box", s: [0.48, 1.9, 0.5], p: [-1.25, 0.95, 0], c: 0x5A7FA8, rep: [6, 0.5, 0, 0] },
{ g: "box", s: [0.3, 0.02, 0.01], p: [-1.25, 1.6, 0.26], c: 0x2E3A4A, rep: [6, 0.5, 0, 0] },
{ g: "box", s: [0.03, 0.12, 0.02], p: [-1.1, 1.0, 0.26], c: STEEL, rep: [6, 0.5, 0, 0] }
]);
if (!KIT.toaster)
A("toaster", "infra", [0.32, 0.22, 0.2], [
{ g: "box", s: [0.32, 0.2, 0.18], p: [0, 0.1, 0], c: 0xC9CCD2 },
{ g: "box", s: [0.24, 0.01, 0.03], p: [0, 0.2, -0.04], c: BLACK },
{ g: "box", s: [0.24, 0.01, 0.03], p: [0, 0.2, 0.04], c: BLACK },
{ g: "box", s: [0.03, 0.02, 0.04], p: [0.17, 0.14, 0], c: BLACK }
]);
if (!KIT.floorlamp)
A("floorlamp", "infra", [0.45, 1.7, 0.45], [
{ g: "cyl", s: [0.2, 0.22, 0.04, 16], p: [0, 0.02, 0], c: DARK },
{ g: "cyl", s: [0.02, 0.02, 1.4, 8], p: [0, 0.72, 0], c: STEEL },
{ g: "cyl", s: [0.14, 0.22, 0.3, 16], p: [0, 1.5, 0], c: 0xF0E2C0, glow: 1 }
]);
if (!KIT.window)
A("window", "infra", [1.2, 1.8, 0.12], [
{ g: "box", s: [1.2, 1.8, 0.08], p: [0, 0.9, 0], c: DWOOD },
{ g: "box", s: [0.5, 0.78, 0.02], p: [-0.27, 1.32, 0.03], c: 0x7FB2D8, glow: 1 },
{ g: "box", s: [0.5, 0.78, 0.02], p: [0.27, 1.32, 0.03], c: 0xC86A8A, glow: 1 },
{ g: "box", s: [0.5, 0.78, 0.02], p: [-0.27, 0.48, 0.03], c: 0xE0B84A, glow: 1 },
{ g: "box", s: [0.5, 0.78, 0.02], p: [0.27, 0.48, 0.03], c: 0x5AA06A, glow: 1 }
]);
if (!KIT.rug)
A("rug", "infra", [2.4, 0.03, 1.6], [
{ g: "box", s: [2.4, 0.02, 1.6], p: [0, 0.01, 0], c: 0x8E2E2E },
{ g: "box", s: [2.0, 0.022, 1.2], p: [0, 0.012, 0], c: 0xC9A060 }
]);
if (!KIT.pyramid)
A("pyramid", "structure", [46, 30, 46], [
{ g: "cone", s: [32, 30, 4], p: [0, 15, 0], r: [0, 0.785, 0], c: 0xD8BE84 },
{ g: "box", s: [3, 4, 1], p: [0, 2, 22.6], c: 0x3A2E20 }
]);
if (!KIT.tank)
A("tank", "vehicle", [3.6, 2.6, 7.2], [
{ g: "box", s: [3.4, 1.0, 6.6], p: [0, 0.9, 0], c: 0x5A6240 },
{ g: "box", s: [0.8, 0.9, 7.0], p: [-1.5, 0.45, 0], c: 0x2A2C26 },
{ g: "box", s: [0.8, 0.9, 7.0], p: [1.5, 0.45, 0], c: 0x2A2C26 },
{ g: "box", s: [2.2, 0.8, 2.6], p: [0, 1.8, -0.3], c: 0x4E5638 },
{ g: "cyl", s: [0.16, 0.18, 4.2, 10], p: [0, 1.85, 2.9], r: [1.5708, 0, 0], c: 0x3E4430 },
{ g: "cyl", s: [0.3, 0.3, 0.4, 10], p: [0, 2.35, -0.8], c: 0x3E4430 }
]);
if (!KIT.rollercoaster)
A("rollercoaster", "structure", [44, 20, 12], [
{ g: "box", s: [44, 0.4, 1.6], p: [0, 2, 0], c: 0xC03A2E },
{ g: "box", s: [12, 0.4, 1.6], p: [-14, 10, 0], r: [0, 0, 0.9], c: 0xC03A2E },
{ g: "box", s: [10, 0.4, 1.6], p: [-5, 18, 0], c: 0xC03A2E },
{ g: "box", s: [14, 0.4, 1.6], p: [6, 10, 0], r: [0, 0, -1.0], c: 0xC03A2E },
{ g: "tor", s: [5, 0.3], p: [16, 7, 0], c: 0xC03A2E },
{ g: "cyl", s: [0.25, 0.25, 18, 8], p: [-5, 9, 0], c: 0xE8E2D2, rep: [3, 4, 0, 0] },
{ g: "cyl", s: [0.25, 0.25, 9, 8], p: [-17, 4.5, 0], c: 0xE8E2D2 },
{ g: "cyl", s: [0.25, 0.25, 9, 8], p: [9, 4.5, 0], c: 0xE8E2D2 },
{ g: "box", s: [2.4, 1.2, 1.4], p: [-6, 19, 0], c: 0x2E5A8E },
{ g: "box", s: [2.4, 1.2, 1.4], p: [-3.4, 19, 0], c: 0xE0B84A }
]);
if (!KIT.terminal)
A("terminal", "structure", [60, 14, 24], [
{ g: "box", s: [60, 10, 24], p: [0, 5, 0], c: 0xD8DDE2 },
{ g: "box", s: [58, 6, 0.3], p: [0, 6, 12.1], c: 0x6A9AC8 },
{ g: "box", s: [62, 0.8, 26], p: [0, 10.4, 0], c: 0xB0B6BE },
{ g: "box", s: [3, 2.5, 12], p: [-18, 3, 18], c: 0xC8CED6, rep: [3, 18, 0, 0] }
], { sign: [0, 8.5, 12.2, 10, 1.4] });
if (!KIT.runway)
A("runway", "infra", [16, 0.05, 160], [
{ g: "box", s: [16, 0.04, 160], p: [0, 0.02, 0], c: 0x3A3C42 },
{ g: "box", s: [0.6, 0.045, 6], p: [0, 0.025, -70], c: 0xF2F2F2, rep2: [10, 0, 0, 15] }
]);
if (!KIT.firehouse)
A("firehouse", "structure", [16, 13, 14], [
{ g: "box", s: [16, 7, 14], p: [0, 3.5, 0], c: 0xA8322B },
{ g: "box", s: [4.4, 5, 0.2], p: [-4.2, 2.5, 7.05], c: 0xE8E2D2 },
{ g: "box", s: [4.4, 5, 0.2], p: [4.2, 2.5, 7.05], c: 0xE8E2D2 },
{ g: "box", s: [16.4, 0.6, 14.4], p: [0, 7.3, 0], c: 0xE8E2D2 },
{ g: "box", s: [3.6, 6, 3.6], p: [6, 10.6, -4.2], c: 0xA8322B },
{ g: "cone", s: [2.8, 2.2, 4], p: [6, 14.7, -4.2], r: [0, 0.785, 0], c: 0x3A3C42 },
{ g: "cyl", s: [0.5, 0.5, 0.6, 12], p: [0, 8.2, 7], c: 0xD4B83C }
], { sign: [0, 6.2, 7.2, 6, 1] });
if (!KIT.firetruck)
A("firetruck", "vehicle", [2.6, 3.2, 9], [
{ g: "box", s: [2.5, 2, 6], p: [0, 1.6, -1], c: 0xC0392B },
{ g: "box", s: [2.4, 1.9, 2.2], p: [0, 1.75, 3.1], c: 0xC0392B },
{ g: "box", s: [2.2, 0.8, 0.05], p: [0, 2.2, 4.22], c: 0x2A3A5A },
{ g: "box", s: [0.6, 0.2, 6.4], p: [0, 2.85, -1], c: STEEL },
{ g: "box", s: [1.4, 0.15, 0.3], p: [0, 2.8, 3.4], c: 0x3A7FE0, glow: 1 },
{ g: "cyl", s: [0.5, 0.5, 0.4, 12], p: [-1.15, 0.5, 2.8], r: [0, 0, 1.5708], c: BLACK, rep: [2, 2.3, 0, 0] },
{ g: "cyl", s: [0.5, 0.5, 0.4, 12], p: [-1.15, 0.5, -2.8], r: [0, 0, 1.5708], c: BLACK, rep: [2, 2.3, 0, 0] }
]);
if (!KIT.pizza)
A("pizza", "infra", [0.45, 0.05, 0.45], [
{ g: "cyl", s: [0.22, 0.22, 0.03, 24], p: [0, 0.015, 0], c: 0xD9A65A },
{ g: "cyl", s: [0.2, 0.2, 0.012, 24], p: [0, 0.034, 0], c: 0xC23A22 },
{ g: "cyl", s: [0.18, 0.18, 0.008, 24], p: [0, 0.043, 0], c: 0xF2D488 },
{ g: "cyl", s: [0.025, 0.025, 0.01, 10], p: [-0.07, 0.05, 0.04], c: 0x9A2A1A, rep: [3, 0.07, 0, 0], rep2: [2, 0, 0, -0.08] }
]);
if (!KIT.cake)
A("cake", "infra", [0.35, 0.32, 0.35], [
{ g: "cyl", s: [0.25, 0.25, 0.02, 24], p: [0, 0.01, 0], c: 0xF2F2F2 },
{ g: "cyl", s: [0.17, 0.17, 0.12, 24], p: [0, 0.08, 0], c: 0xF0D4E0 },
{ g: "cyl", s: [0.12, 0.12, 0.1, 24], p: [0, 0.19, 0], c: 0xF8E8F0 },
{ g: "cyl", s: [0.008, 0.008, 0.06, 6], p: [0, 0.27, 0], c: 0x6AA8E8 },
{ g: "sph", s: [0.012], p: [0, 0.31, 0], c: 0xFFC040, glow: 1 }
]);
if (!KIT.food)
A("food", "infra", [0.32, 0.12, 0.32], [
{ g: "cyl", s: [0.16, 0.13, 0.02, 24], p: [0, 0.01, 0], c: 0xF6F4EE },
{ g: "sph", s: [0.06], p: [-0.04, 0.05, 0], c: 0xB0763A },
{ g: "sph", s: [0.045], p: [0.05, 0.045, 0.03], c: 0x5E9A3E },
{ g: "sph", s: [0.04], p: [0.03, 0.04, -0.05], c: 0xE8C25A }
]);
var WORDS = {
fridge: ["fridge", "refrigerator", "freezer", "icebox"],
stove: ["stove", "oven", "cooker", "range", "grill", "barbecue", "bbq"],
creature: ["beaver", "beavers"],
kitchencounter: ["kitchen counter", "counter", "countertop", "kitchen cabinets", "cupboards"],
sink: ["sink", "kitchen sink", "basin", "washbasin"],
bed: ["bed", "beds", "bunk bed", "double bed", "four-poster bed", "hospital bed"],
sofa: ["sofa", "couch", "settee", "loveseat"],
armchair: ["armchair", "recliner", "easy chair"],
chair: ["chair", "chairs", "stool", "dining chair"],
diningtable: ["table", "dining table", "kitchen table", "coffee table"],
desk: ["desk", "school desk", "writing desk", "office desk"],
bookshelf: ["bookshelf", "bookcase", "shelves", "shelf of books"],
tv: ["tv", "television", "telly", "tv set"],
bathtub: ["bathtub", "bath tub", "tub", "the bath"],
toilet: ["toilet", "loo"],
grandpiano: ["piano", "grand piano", "upright piano"],
lockers: ["lockers", "locker", "school lockers"],
toaster: ["toaster"],
floorlamp: ["lamp", "floor lamp", "standing lamp", "reading lamp"],
window: ["window", "stained glass window", "stained glass windows", "stained glass"],
rug: ["rug", "carpet", "mat"],
pyramid: ["pyramid", "great pyramid", "egyptian pyramid"],
tank: ["tank", "army tank", "military tank", "tanks"],
rollercoaster: ["roller coaster", "rollercoaster", "coaster"],
terminal: ["terminal", "airport terminal"],
runway: ["runway", "airstrip", "landing strip"],
firehouse: ["firehouse", "fire house", "fire station", "firestation", "fire hall"],
firetruck: ["firetruck", "fire truck", "fire engine", "fire-engine"],
dog: ["wolf", "wolves", "coyote", "coyotes", "jackal", "dingo"],
pizza: ["pizza", "pizzas", "a slice of pizza"],
cake: ["cake", "birthday cake", "wedding cake", "cakes"],
food: ["food", "a plate of food", "a meal", "dinner", "breakfast", "lunch", "a feast", "sandwich", "burger", "hamburger", "pie"]
};
function unlearn(k, w) {
if (VOCAB[k]) {
var i = VOCAB[k].indexOf(w);
if (i > -1)
VOCAB[k].splice(i, 1);
}
for (var j = PHRASES.length - 1; j >= 0; j--)
if (PHRASES[j][0] === w && PHRASES[j][1] === k)
PHRASES.splice(j, 1);
}
["hallway", "corridor", "hall", "hallways", "corridors"].forEach(function (w) { unlearn("road", w); });
["airport", "the airport", "terminal", "airport terminal", "an airport"].forEach(function (w) { Object.keys(VOCAB).forEach(function (k) { if (k !== "terminal")
unlearn(k, w); }); });
["terminal", "airport terminal"].forEach(function (w) { learnWord("terminal", w); });
if (typeof learnWord === "function")
Object.keys(WORDS).forEach(function (k) { if (KIT[k])
WORDS[k].forEach(function (w) { learnWord(k, w); }); });
})();
function morePlural(w) { return __ZC(112, 0, this, arguments, new.target); }
var MORE_PLURALS_N = -1;
function morePlurals() { return __ZC(112, 1, this, arguments, new.target); }
var MORE_EXACT = null, MORE_EXACT_N = -1;
function moreExactSet() {
if (MORE_EXACT && MORE_EXACT_N === PHRASES.length)
return MORE_EXACT;
MORE_EXACT = {};
PHRASES.forEach(function (pr) { MORE_EXACT[pr[0]] = 1; });
MORE_EXACT_N = PHRASES.length;
return MORE_EXACT;
}
growIsKnown = function (w) { return __ZC(112, 2, this, arguments, new.target); };
if (typeof GROW_PLACES !== "undefined") {
GROW_PLACES.forEach(function (pl, i) { if (String(pl[0]).indexOf("fire ?house") > -1)
GROW_PLACES[i] = [pl[0], "a firehouse. a fire engine."]; });
[
[/\b(kitchens?)\b/, "a fridge. a stove. a kitchen counter. a kitchen table. a chair. a chair."],
[/\b(bedrooms?)\b/, "a bed. a lamp. a rug. a window. a chair."],
[/\b(living ?rooms?|lounge|sitting room|family room|den)\b/, "a sofa. an armchair. a television. a coffee table. a rug. a lamp."],
[/\b(bathrooms?|restrooms?|washrooms?)\b/, "a bathtub. a toilet. a sink."],
[/\b(ballrooms?|great hall|banquet hall|grand hall)\b/, "a grand piano. a rug. a lamp. a lamp. a window. a window."],
[/\b(dining rooms?)\b/, "a dining table. a chair. a chair. a chair. a chair."],
[/\b(classrooms?)\b/, "a desk. a desk. a desk. a desk. a chair. a chair. a chair. a chair."],
[/\b(hallways?|corridors?|school hall)\b/, "lockers. lockers. a lamp."],
[/\b(offices? room|cubicles?)\b/, "a desk. a chair. a lamp. a bookshelf."],
[/\b(librar(?:y|ies) room|study)\b/, "a bookshelf. a bookshelf. a bookshelf. a desk. a lamp."],
[/\b(basements?)\b/, "a cellar."],
[/\b(attics?)\b/, "crates. a window."],
[/\b(carnivals?|fun ?fairs?|county fair|state fair|the fair|amusement parks?|theme parks?|fairground)\b/, "a ferris wheel. a carousel. a roller coaster. a tent. a market stall. a market stall. string lights."],
[/\b(circus(?:es)?)\b/, "a tent. string lights. a clown. a cart."],
[/\b(jungles?|rain ?forests?|tropical forest)\b/, "a palm. a palm. a palm. a palm. a palm. a bush. a bush. reeds."],
[/\b(forests?|woods|woodland)\b/, "a tree. a tree. a tree. a tree. a tree. a tree. a bush."],
[/\b(beach(?:es)?|seashore|shore|the coast)\b/, "water. a dune. a palm. a rock."],
[/\b(airports?|airfield)\b/, "a terminal. a control tower. a runway. a plane. a plane."],
[/\b(farms?|ranch)\b/, "a farmhouse. a barn. a silo. a fence. a cow. a cow. a tractor. a haybale."],
[/\b(graveyard|cemetery)\b/, "a gravestone. a gravestone. a gravestone. a gravestone. a dead tree. a fence."],
[/\b(train station|railway station)\b/, "a station. a train."],
[/\b(gas station|petrol station)\b/, "a gas station. a car."],
[/\b(zoo)\b/, "a lion. an elephant. a fence. a fence. a tree."]
].forEach(function (pl) { GROW_PLACES.push(pl); });
}
var MORE_REL = "friend|best friend|boyfriend|girlfriend|brother|sister|mom|mum|mother|dad|father|grandmother|grandma|grandfather|grandpa|aunt|uncle|cousin|son|daughter|wife|husband|partner|boss|teacher|neighbou?r|coworker|co-worker|roommate|ex|niece|nephew";
function moreNamesIn(text) { return __ZC(112, 3, this, arguments, new.target); }
(function () {
if (typeof scanText !== "function")
return;
var inner = scanText;
scanText = function (chunk) {
try {
morePlurals();
}
catch (e) { }
var names = [];
try {
names = moreNamesIn(String(chunk || ""));
}
catch (e) { }
var c0 = (store.characters || []).length, o0 = store.objects.length;
var extra = [];
try {
var low = " " + String(chunk || "").toLowerCase() + " ", re = /\b(two|three|four|five|six|seven|eight|nine|ten|\d{1,2}|several|many|a few|a pack of|a herd of|a flock of|a group of|lots of)\s+(?:(?:big|small|little|huge|giant|black|white|grey|gray|brown|wild|hungry|angry)\s+)?([a-z]+)\b/g, m;
var NUM = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, several: 4, many: 6, "a few": 3, "a pack of": 5, "a herd of": 6, "a flock of": 7, "a group of": 4, "lots of": 6 };
while ((m = re.exec(low))) {
var n = Math.min(10, NUM[m[1]] || parseInt(m[1], 10) || 0);
if (n < 2)
continue;
var arch = growHeadArch(m[2]) || growHeadArch(growSingular(m[2]));
if (!arch || !KIT[arch] || KIT[arch].cat !== "being" || arch === "human" || arch === "crowd" || arch === "child")
continue;
var sing = m[2];
for (var pi = 0; pi < PHRASES.length; pi++) {
if (PHRASES[pi][1] === arch && morePlural(PHRASES[pi][0]) === m[2]) {
sing = PHRASES[pi][0];
break;
}
}
for (var i = 1; i < n; i++)
extra.push({ w: sing, i: i + 1 });
}
}
catch (e) { }
var res = inner.call(this, chunk);
extra.forEach(function (x) {
try {
var n1 = store.objects.length, k1 = (store.characters || []).length;
inner.call(this, "a " + x.w + ".");
for (var q = n1; q < store.objects.length; q++) {
store.objects[q].instant = true;
store.objects[q].standIn = "group";
}
var made = (store.characters || []).slice(k1)[0];
if (made) {
made.name = x.w + " " + x.i;
made.aka = [x.w + " " + x.i];
}
}
catch (e) { }
}, this);
try {
names.forEach(function (N) {
var nn = N.name.toLowerCase();
if ((store.characters || []).some(function (c) { return (c.aka || []).indexOf(nn) > -1 || String(c.name).toLowerCase() === nn; }))
return;
var fresh = (store.characters || []).slice(c0);
var c = fresh.filter(function (c) { var s = String(c.name || "").toLowerCase(); return s.indexOf(N.rel) > -1; })[0] ||
fresh.filter(function (c) { return c.archetype === "human" && /^(someone|a person|person|figure)$/i.test(c.name || ""); })[0];
if (c) {
c.role = c.role || ("my " + N.rel);
c.name = N.name;
c.aka = (c.aka || []).concat([nn]);
if (c.objId) {
var o = specById(c.objId);
if (o) {
o.label = N.name;
if (o.name !== undefined)
o.name = N.name;
}
}
}
else {
var n2 = store.objects.length;
inner.call(this, "a person.");
var made = (store.characters || []).slice(-1)[0];
if (made && store.objects.length > n2) {
made.name = N.name;
made.role = "my " + N.rel;
made.aka = (made.aka || []).concat([nn]);
var o2 = made.objId ? specById(made.objId) : null;
if (o2)
o2.label = N.name;
}
}
}, this);
if (names.length && typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("names:", e);
}
return res;
};
})();
