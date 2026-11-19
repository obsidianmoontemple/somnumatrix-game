/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof A !== "function")
return;
var WOOD = 0x8A5A3A, DW = 0x5A3A26, ST = 0xA7AAB0, DK = 0x24262C, BK = 0x111216, GL = 0x9FC4DA, W = 0xF2F1EC;
function a(k, cat, size, parts, words) { if (!KIT[k])
A(k, cat, size, parts); if (typeof learnWord === "function")
words.forEach(function (w) { learnWord(k, w); }); }
a("clothingrack", "infra", [1.6, 1.7, 0.6], [
{ g: "cyl", s: [0.02, 0.02, 1.6, 6], p: [0, 1.6, 0], r: [0, 0, 1.5708], c: ST }, { g: "cyl", s: [0.02, 0.02, 1.6, 6], p: [-0.78, 0.8, 0], c: ST }, { g: "cyl", s: [0.02, 0.02, 1.6, 6], p: [0.78, 0.8, 0], c: ST },
{ g: "box", s: [0.06, 0.8, 0.42], p: [-0.6, 1.15, 0], c: 0xA82A3A, rep: [8, 0.17, 0, 0] }, { g: "box", s: [1.6, 0.04, 0.5], p: [0, 0.02, 0], c: DK }
], ["clothing rack", "clothes rack", "rail of clothes", "clothes rail", "coat rack", "racks of clothes"]);
a("shopshelf", "infra", [2.0, 1.9, 0.5], [
{ g: "box", s: [2.0, 1.9, 0.05], p: [0, 0.95, -0.22], c: W }, { g: "box", s: [0.05, 1.9, 0.5], p: [-0.98, 0.95, 0], c: W, rep: [2, 1.96, 0, 0] },
{ g: "box", s: [1.92, 0.03, 0.48], p: [0, 0.1, 0], c: W, rep: [4, 0, 0.55, 0] },
{ g: "box", s: [0.16, 0.22, 0.16], p: [-0.8, 0.23, 0.05], c: 0xC8603A, rep: [9, 0.2, 0, 0], rep2: [3, 0, 0.55, 0] }
], ["shop shelves", "shelving", "grocery shelves", "store shelves", "aisle", "aisles"]);
a("shopcounter", "infra", [2.2, 1.0, 0.7], [
{ g: "box", s: [2.2, 0.95, 0.65], p: [0, 0.48, 0], c: WOOD }, { g: "box", s: [2.3, 0.05, 0.75], p: [0, 0.98, 0], c: 0xE0DCD2 }
], ["shop counter", "service counter", "checkout", "checkout counter", "front desk", "reception desk"]);
a("cashregister", "infra", [0.45, 0.4, 0.4], [
{ g: "box", s: [0.42, 0.14, 0.38], p: [0, 0.07, 0], c: DK }, { g: "box", s: [0.32, 0.14, 0.2], p: [0, 0.2, -0.04], r: [0.4, 0, 0], c: 0x3A3C42 },
{ g: "box", s: [0.22, 0.12, 0.02], p: [0, 0.36, -0.1], c: 0x4AB07A, glow: 1 }
], ["cash register", "till", "register", "cash till"]);
a("displaycase", "infra", [1.6, 1.1, 0.6], [
{ g: "box", s: [1.6, 0.6, 0.6], p: [0, 0.3, 0], c: WOOD }, { g: "box", s: [1.56, 0.45, 0.56], p: [0, 0.83, 0], c: GL, opa: 0.35 },
{ g: "box", s: [0.12, 0.06, 0.12], p: [-0.5, 0.66, 0], c: 0xD8B040, rep: [5, 0.25, 0, 0] }
], ["display case", "glass case", "display cabinet", "jewellery case", "jewelry case", "showcase"]);
a("mannequin", "infra", [0.5, 1.8, 0.35], [
{ g: "cyl", s: [0.2, 0.22, 0.04, 12], p: [0, 0.02, 0], c: DK }, { g: "cyl", s: [0.02, 0.02, 0.8, 6], p: [0, 0.42, 0], c: ST },
{ g: "cyl", s: [0.2, 0.15, 0.6, 10], p: [0, 1.12, 0], c: 0x2E5A8E }, { g: "sph", s: [0.11], p: [0, 1.6, 0], c: 0xE8E0D4 }
], ["mannequin", "dummy", "dress form", "mannequins"]);
a("vendingmachine", "infra", [0.9, 1.9, 0.8], [
{ g: "box", s: [0.9, 1.9, 0.8], p: [0, 0.95, 0], c: 0xC0392B }, { g: "box", s: [0.6, 1.2, 0.02], p: [-0.1, 1.15, 0.41], c: GL, glow: 1 },
{ g: "box", s: [0.12, 0.5, 0.02], p: [0.33, 1.2, 0.41], c: BK }, { g: "box", s: [0.6, 0.18, 0.02], p: [-0.1, 0.3, 0.41], c: BK }
], ["vending machine", "soda machine", "snack machine", "drinks machine"]);
a("coffeemachine", "infra", [0.5, 0.5, 0.45], [
{ g: "box", s: [0.5, 0.45, 0.42], p: [0, 0.22, 0], c: 0x3A3C42 }, { g: "cyl", s: [0.04, 0.04, 0.08, 8], p: [-0.1, 0.15, 0.2], c: ST, rep: [2, 0.2, 0, 0] },
{ g: "box", s: [0.4, 0.04, 0.2], p: [0, 0.02, 0.15], c: ST }
], ["coffee machine", "espresso machine", "coffee maker"]);
a("barcounter", "infra", [4.0, 1.1, 0.8], [
{ g: "box", s: [4.0, 1.05, 0.7], p: [0, 0.52, 0], c: DW }, { g: "box", s: [4.1, 0.06, 0.85], p: [0, 1.07, 0], c: 0x6A3A1E },
{ g: "cyl", s: [0.02, 0.02, 4.0, 6], p: [0, 0.2, 0.4], r: [0, 0, 1.5708], c: 0xC9A04A },
{ g: "cyl", s: [0.04, 0.04, 0.3, 8], p: [-1.5, 1.25, -0.2], c: 0x3A7A4A, rep: [8, 0.42, 0, 0] }
], ["bar counter", "pub bar", "saloon bar", "long bar"]);
a("barstool", "infra", [0.4, 0.8, 0.4], [
{ g: "cyl", s: [0.18, 0.18, 0.06, 12], p: [0, 0.78, 0], c: 0x8E2E2E }, { g: "cyl", s: [0.03, 0.03, 0.75, 6], p: [0, 0.38, 0], c: ST }, { g: "cyl", s: [0.2, 0.22, 0.03, 12], p: [0, 0.02, 0], c: ST }
], ["bar stool", "barstool", "stools", "bar stools"]);
a("booth", "infra", [2.0, 1.2, 1.8], [
{ g: "box", s: [2.0, 0.45, 0.55], p: [0, 0.22, -0.6], c: 0x8E2E2E }, { g: "box", s: [2.0, 0.75, 0.15], p: [0, 0.75, -0.85], c: 0x8E2E2E },
{ g: "box", s: [2.0, 0.45, 0.55], p: [0, 0.22, 0.6], c: 0x8E2E2E }, { g: "box", s: [2.0, 0.75, 0.15], p: [0, 0.75, 0.85], c: 0x8E2E2E },
{ g: "box", s: [1.6, 0.05, 0.7], p: [0, 0.74, 0], c: 0xE0DCD2 }, { g: "cyl", s: [0.05, 0.05, 0.7, 8], p: [0, 0.36, 0], c: ST }
], ["booth", "diner booth", "restaurant booth", "booths"]);
a("pottedplant", "nature", [0.6, 1.4, 0.6], [
{ g: "cyl", s: [0.22, 0.17, 0.4, 12], p: [0, 0.2, 0], c: 0xB0603A }, { g: "sph", s: [0.35], p: [0, 0.75, 0], c: 0x3E7A3E }, { g: "sph", s: [0.25], p: [0.15, 1.05, 0.05], c: 0x4A8A44 }
], ["potted plant", "house plant", "houseplant", "potted plants", "fern in a pot"]);
a("jukebox", "infra", [0.9, 1.6, 0.6], [
{ g: "box", s: [0.9, 1.2, 0.6], p: [0, 0.6, 0], c: 0x8E2E2E }, { g: "cyl", s: [0.45, 0.45, 0.6, 16, 1, false, 0, 3.1416], p: [0, 1.2, 0], r: [1.5708, 0, 1.5708], c: 0xE8B040, glow: 1 },
{ g: "box", s: [0.6, 0.4, 0.02], p: [0, 0.85, 0.31], c: GL, glow: 1 }
], ["jukebox", "juke box"]);
a("arcademachine", "infra", [0.8, 1.8, 0.8], [
{ g: "box", s: [0.8, 1.8, 0.75], p: [0, 0.9, 0], c: 0x2A2A6A }, { g: "box", s: [0.6, 0.45, 0.02], p: [0, 1.35, 0.38], r: [-0.2, 0, 0], c: 0x4AD0E8, glow: 1 },
{ g: "box", s: [0.7, 0.08, 0.3], p: [0, 0.95, 0.45], c: BK }, { g: "box", s: [0.7, 0.2, 0.02], p: [0, 1.7, 0.38], c: 0xE84A8A, glow: 1 }
], ["arcade machine", "arcade cabinet", "arcade game", "video game machine", "pinball machine"]);
a("pooltable", "infra", [2.6, 0.85, 1.5], [
{ g: "box", s: [2.6, 0.15, 1.5], p: [0, 0.8, 0], c: DW }, { g: "box", s: [2.4, 0.02, 1.3], p: [0, 0.88, 0], c: 0x2E7A4A },
{ g: "box", s: [0.12, 0.72, 0.12], p: [-1.15, 0.36, -0.6], c: DW, rep: [2, 2.3, 0, 0], rep2: [2, 0, 0, 1.2] }
], ["pool table", "billiards table", "snooker table"]);
a("fishtank", "infra", [1.2, 1.2, 0.5], [
{ g: "box", s: [1.2, 0.6, 0.5], p: [0, 0.3, 0], c: DK }, { g: "box", s: [1.18, 0.55, 0.48], p: [0, 0.88, 0], c: 0x6AB0D8, opa: 0.5 },
{ g: "sph", s: [0.04], p: [-0.2, 0.9, 0], c: 0xE8902A, rep: [4, 0.14, 0.03, 0] }
], ["fish tank", "aquarium", "fishtank"]);
a("chandelier", "infra", [1.2, 1.0, 1.2], [
{ g: "cyl", s: [0.01, 0.01, 0.6, 4], p: [0, 3.4, 0], c: GOLDish() }, { g: "tor", s: [0.45, 0.03], p: [0, 3.05, 0], r: [1.5708, 0, 0], c: GOLDish() },
{ g: "sph", s: [0.05], p: [-0.45, 3.12, 0], c: 0xFFE8A0, glow: 1, rep: [7, 0.15, 0, 0] }
], ["chandelier", "chandeliers"]);
a("winerack", "infra", [1.2, 1.8, 0.4], [
{ g: "box", s: [1.2, 1.8, 0.4], p: [0, 0.9, 0], c: DW }, { g: "cyl", s: [0.04, 0.04, 0.38, 8], p: [-0.45, 0.25, 0], r: [1.5708, 0, 0], c: 0x3A1A2A, rep: [6, 0.18, 0, 0], rep2: [6, 0, 0.28, 0] }
], ["wine rack", "wine shelves", "rack of wine"]);
a("stage", "structure", [8, 1.0, 5], [
{ g: "box", s: [8, 0.9, 5], p: [0, 0.45, 0], c: DW }, { g: "box", s: [8.4, 4, 0.2], p: [0, 2.9, -2.4], c: 0x6A1A2A },
{ g: "box", s: [0.4, 4.6, 0.4], p: [-4, 2.3, -2.3], c: 0x6A1A2A, rep: [2, 8, 0, 0] }
], ["stage", "the stage", "platform for bands", "bandstand"]);
a("neonsign", "infra", [2.2, 0.8, 0.15], [
{ g: "box", s: [2.2, 0.8, 0.08], p: [0, 2.6, 0], c: BK }, { g: "tor", s: [0.22, 0.03], p: [-0.6, 2.6, 0.06], c: 0xFF4AA0, glow: 1 },
{ g: "box", s: [0.9, 0.06, 0.03], p: [0.4, 2.75, 0.06], c: 0x4AE8FF, glow: 1 }, { g: "box", s: [0.9, 0.06, 0.03], p: [0.4, 2.45, 0.06], c: 0x4AE8FF, glow: 1 }
], ["neon sign", "neon", "open sign", "neon lights"]);
a("bakerycase", "infra", [1.8, 1.3, 0.8], [
{ g: "box", s: [1.8, 0.8, 0.8], p: [0, 0.4, 0], c: W }, { g: "box", s: [1.76, 0.5, 0.76], p: [0, 1.05, 0], c: GL, opa: 0.35 },
{ g: "sph", s: [0.08], p: [-0.7, 0.9, 0], c: 0xD8A050, rep: [8, 0.2, 0, 0] }, { g: "cyl", s: [0.1, 0.1, 0.06, 10], p: [-0.6, 1.15, 0], c: 0xF0D0E0, rep: [5, 0.3, 0, 0] }
], ["bakery case", "pastry case", "cake display", "bread counter"]);
a("barberchair", "infra", [0.8, 1.3, 0.9], [
{ g: "cyl", s: [0.3, 0.32, 0.06, 14], p: [0, 0.03, 0], c: ST }, { g: "cyl", s: [0.06, 0.06, 0.4, 8], p: [0, 0.25, 0], c: ST },
{ g: "box", s: [0.6, 0.12, 0.6], p: [0, 0.5, 0], c: 0x8E2E2E }, { g: "box", s: [0.6, 0.75, 0.1], p: [0, 0.95, -0.28], c: 0x8E2E2E }, { g: "box", s: [0.08, 0.08, 0.5], p: [-0.32, 0.68, 0], c: ST, rep: [2, 0.64, 0, 0] }
], ["barber chair", "barber's chair", "salon chair"]);
a("cinemascreen", "structure", [12, 7, 0.5], [
{ g: "box", s: [12, 6.5, 0.2], p: [0, 4.0, 0], c: 0xF4F4F4, glow: 1 }, { g: "box", s: [12.6, 7, 0.3], p: [0, 4.0, -0.15], c: BK },
{ g: "box", s: [0.4, 7, 0.6], p: [-6.4, 3.5, 0.2], c: 0x6A1A2A, rep: [2, 12.8, 0, 0] }
], ["cinema screen", "movie screen", "projection screen", "the big screen"]);
function GOLDish() { return 0xC9A04A; }
})();
