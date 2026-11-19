/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var XP = { rows: {}, decor: {}, kinds: null, rules: null, mine: null, at: 0, loading: null, missing: false, cur: null, back: null, specs: {}, prompted: false, near: null, uid: "" };
var XP_KINDS = [
{ kind: "bed", name: "An extra bedroom", rooms: ["xbed"], price: 2400, blurb: "A bedroom with its own bed and wardrobe. It counts as a bedroom free for fostering." },
{ kind: "bath", name: "An extra bathroom", rooms: ["xbath"], price: 2000, blurb: "A bath, a basin, a mirror. You wash here as at home." },
{ kind: "study", name: "A study", rooms: ["xstudy"], price: 1800, blurb: "A desk, a chair and a bookcase." },
{ kind: "nursery", name: "A nursery", rooms: ["xnursery"], price: 1800, blurb: "A cot for a baby or toddler. It counts for a little one when you foster." },
{ kind: "play", name: "A playroom", rooms: ["xplay"], price: 1800, blurb: "A bright play mat, a little table and chairs, toys." },
{ kind: "laundry", name: "A laundry", rooms: ["xlaundry"], price: 1200, blurb: "A washer, a dryer and a cupboard." },
{ kind: "dress", name: "A dressing room", rooms: ["xdress"], price: 1500, blurb: "Wardrobes along the wall and a long mirror." },
{ kind: "library", name: "A library", rooms: ["xlibrary"], price: 3200, blurb: "Shelves of books and a chair to read in." },
{ kind: "gym", name: "A home gym", rooms: ["xgym"], price: 2800, blurb: "A running machine, a weight bench and a mat." },
{ kind: "games", name: "A games room", rooms: ["xgames"], price: 3400, blurb: "A pool table and an arcade cabinet." },
{ kind: "cinema", name: "A home cinema", rooms: ["xcinema"], price: 3600, blurb: "A big screen and a sofa to watch it from." },
{ kind: "music", name: "A music room", rooms: ["xmusic"], price: 2600, blurb: "A piano and its stool." },
{ kind: "craft", name: "A workshop", rooms: ["xcraft"], price: 2400, blurb: "A workbench and shelves for tools." },
{ kind: "sun", name: "A sunroom", rooms: ["xsun"], price: 2200, blurb: "Plants in the light and two chairs to sit in." },
{ kind: "office", name: "A home office", rooms: ["xoffice"], price: 2000, blurb: "A desk, a screen and a chair." },
{ kind: "bar", name: "A home bar", rooms: ["xbar"], price: 3000, blurb: "A bar counter and stools." },
{ kind: "sitting", name: "A sitting room", rooms: ["xsitting"], price: 2200, blurb: "A sofa, a low table and a lamp." },
{ kind: "guest", name: "A guest suite", rooms: ["xbed", "xbath", "xsitting"], price: 5600, big: true, blurb: "Three rooms: a bedroom, its own bathroom and a sitting room." },
{ kind: "family", name: "A family wing", rooms: ["xbed", "xbed", "xbath", "xplay"], price: 8400, big: true, blurb: "Four rooms: two bedrooms, a bathroom and a playroom." },
{ kind: "fun", name: "An entertainment floor", rooms: ["xcinema", "xgames", "xbar", "xgym"], price: 11500, big: true, blurb: "Four rooms: a home cinema, a games room, a bar and a gym." },
{ kind: "master", name: "A grand master suite", rooms: ["xmaster", "xdress", "xbath", "xsitting"], price: 9800, big: true, blurb: "Four rooms: a great bedroom, a dressing room, a bathroom and a sitting room." },
{ kind: "storey", name: "A whole new storey", rooms: ["xbed", "xbed", "xbed", "xbath", "xbath", "xsitting", "xstudy", "xlaundry"], price: 16000, big: true, blurb: "Eight rooms: three bedrooms, two bathrooms, a sitting room, a study and a laundry." }
];
var XP_ROOMNAME = { xbed: "the new bedroom", xmaster: "the master bedroom", xbath: "the new bathroom", xstudy: "the study", xnursery: "the nursery", xplay: "the playroom",
xlaundry: "the laundry", xdress: "the dressing room", xlibrary: "the library", xgym: "the home gym", xgames: "the games room", xcinema: "the home cinema",
xmusic: "the music room", xcraft: "the workshop", xsun: "the sunroom", xoffice: "the home office", xbar: "the home bar", xsitting: "the sitting room" };
var XP_MAX_ROOMS = 24;
function xpKinds() { return (XP.kinds && XP.kinds.length) ? XP.kinds : XP_KINDS; }
function xpKind(k) { var L = xpKinds(); for (var i = 0; i < L.length; i++)
if (L[i].kind === k)
return L[i]; return null; }
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
function std(c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r == null ? 0.6 : r, metalness: m || 0 }); }
function add(g, geo, mat, x, y, z, rx, ry, rz) { var o = new THREE.Mesh(geo, mat); o.position.set(x || 0, y || 0, z || 0); if (rx)
o.rotation.x = rx; if (ry)
o.rotation.y = ry; if (rz)
o.rotation.z = rz; g.add(o); return o; }
var BX = function (w, h, d) { return new THREE.BoxGeometry(w, h, d); }, CY = function (a, b, h, n) { return new THREE.CylinderGeometry(a, b, h, n || 16); };
FURN.xp_treadmill = function () {
var g = new THREE.Group(), blk = std(0x1E2024, 0.55, 0.2), belt = std(0x2E3036, 0.9, 0), chrome = std(0xC8CCD2, 0.25, 0.9), scr = std(0x101418, 0.3, 0.2);
add(g, BX(0.78, 0.16, 1.85), blk, 0, 0.1, 0);
add(g, BX(0.56, 0.02, 1.7), belt, 0, 0.19, 0.02);
[-0.36, 0.36].forEach(function (x) { add(g, CY(0.025, 0.025, 1.15, 10), chrome, x, 0.7, -0.78, 0.12); add(g, BX(0.04, 0.04, 0.55), chrome, x, 1.0, -0.55); });
add(g, BX(0.7, 0.32, 0.08), blk, 0, 1.28, -0.86, -0.5);
add(g, BX(0.42, 0.18, 0.01), scr, 0, 1.3, -0.82, -0.5);
return g;
};
FURN.xp_weightbench = function () {
var g = new THREE.Group(), pad = std(0x1A1A1E, 0.5, 0.05), frame = std(0x3A3E46, 0.35, 0.7), chrome = std(0xD0D4DA, 0.2, 0.95), plate = std(0x121214, 0.45, 0.4);
add(g, BX(0.32, 0.09, 1.2), pad, 0, 0.48, 0.1);
add(g, BX(0.08, 0.42, 0.08), frame, 0, 0.22, 0.55);
add(g, BX(0.08, 0.42, 0.08), frame, 0, 0.22, -0.35);
add(g, BX(0.5, 0.05, 0.08), frame, 0, 0.03, 0.55);
add(g, BX(0.5, 0.05, 0.08), frame, 0, 0.03, -0.35);
[-0.4, 0.4].forEach(function (x) { add(g, BX(0.06, 1.2, 0.06), frame, x, 0.6, -0.55); add(g, BX(0.06, 0.05, 0.5), frame, x, 0.03, -0.45); });
add(g, CY(0.015, 0.015, 1.6, 8), chrome, 0, 1.12, -0.52, 0, 0, Math.PI / 2);
[-0.66, 0.66].forEach(function (x) { add(g, CY(0.18, 0.18, 0.05, 20), plate, x, 1.12, -0.52, 0, 0, Math.PI / 2); });
return g;
};
FURN.xp_dumbbells = function () {
var g = new THREE.Group(), frame = std(0x2C2F36, 0.4, 0.6), bell = std(0x18181C, 0.45, 0.35), chrome = std(0xD0D4DA, 0.2, 0.95);
add(g, BX(1.2, 0.06, 0.36), frame, 0, 0.6, 0);
add(g, BX(1.2, 0.06, 0.36), frame, 0, 0.3, 0);
[-0.56, 0.56].forEach(function (x) { add(g, BX(0.05, 0.66, 0.32), frame, x, 0.33, 0); });
for (var i = 0; i < 5; i++) {
var x = -0.44 + i * 0.22, r = 0.035 + i * 0.007;
[0.66, 0.36].forEach(function (y) {
add(g, CY(0.012, 0.012, 0.18, 6), chrome, x, y, 0, Math.PI / 2);
add(g, CY(r, r, 0.04, 12), bell, x, y, -0.08, Math.PI / 2);
add(g, CY(r, r, 0.04, 12), bell, x, y, 0.08, Math.PI / 2);
});
}
return g;
};
FURN.xp_bike = function () {
var g = new THREE.Group(), frame = std(0x2A2D33, 0.35, 0.7), seat = std(0x141416, 0.55, 0), wheel = std(0x9AA0A8, 0.3, 0.85);
add(g, BX(0.5, 0.06, 1.0), frame, 0, 0.03, 0);
add(g, BX(0.07, 0.7, 0.07), frame, 0, 0.4, 0.25, -0.25);
add(g, BX(0.07, 0.75, 0.07), frame, 0, 0.45, -0.3, 0.2);
add(g, BX(0.22, 0.07, 0.3), seat, 0, 0.8, 0.33);
add(g, BX(0.42, 0.04, 0.04), frame, 0, 1.05, -0.42);
add(g, CY(0.26, 0.26, 0.06, 24), wheel, 0, 0.32, -0.38, 0, 0, Math.PI / 2);
return g;
};
FURN.xp_gymmat = function () { var g = new THREE.Group(); add(g, BX(0.9, 0.02, 1.9), std(0x1F8A8A, 0.85, 0), 0, 0.012, 0); g.name = "rug-gymmat"; return g; };
FURN.xp_pooltable = function () {
var g = new THREE.Group(), wood = std(0x3A2416, 0.5, 0.05), felt = std(0x1D6B3A, 0.95, 0), pocket = std(0x0A0A0C, 0.8, 0), rail = std(0x2E1C10, 0.45, 0.05);
add(g, BX(2.5, 0.22, 1.4), wood, 0, 0.66, 0);
add(g, BX(2.3, 0.03, 1.2), felt, 0, 0.785, 0);
add(g, BX(2.5, 0.07, 0.1), rail, 0, 0.81, 0.65);
add(g, BX(2.5, 0.07, 0.1), rail, 0, 0.81, -0.65);
add(g, BX(0.1, 0.07, 1.4), rail, 1.2, 0.81, 0);
add(g, BX(0.1, 0.07, 1.4), rail, -1.2, 0.81, 0);
[[-1.15, -0.6], [0, -0.62], [1.15, -0.6], [-1.15, 0.6], [0, 0.62], [1.15, 0.6]].forEach(function (p) { add(g, CY(0.06, 0.06, 0.02, 12), pocket, p[0], 0.8, p[1]); });
[[-1.0, -0.55], [1.0, -0.55], [-1.0, 0.55], [1.0, 0.55]].forEach(function (p) { add(g, BX(0.14, 0.56, 0.14), wood, p[0], 0.28, p[1]); });
var cols = [0xE8C020, 0x2050C0, 0xC02828, 0x6A2A8A, 0xE87020, 0x2A8A3A, 0x8A2020, 0x101010, 0xF2F0EA];
for (var i = 0; i < cols.length; i++) {
var row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3;
add(g, new THREE.SphereGeometry(0.028, 10, 8), std(cols[i], 0.25, 0), 0.55 + row * 0.05, 0.828, (i - [0, 1, 3, 6][row] - row / 2) * 0.058);
}
return g;
};
FURN.xp_screen = function () {
var g = new THREE.Group(), c = document.createElement("canvas");
c.width = 256;
c.height = 144;
var x = c.getContext("2d"), gr = x.createLinearGradient(0, 0, 256, 144);
gr.addColorStop(0, "#1C2A44");
gr.addColorStop(0.55, "#3A4E6E");
gr.addColorStop(1, "#6A5A48");
x.fillStyle = gr;
x.fillRect(0, 0, 256, 144);
x.fillStyle = "rgba(240,220,170,.55)";
x.beginPath();
x.arc(190, 46, 18, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#22301E";
x.beginPath();
x.moveTo(0, 110);
x.bezierCurveTo(70, 84, 150, 120, 256, 96);
x.lineTo(256, 144);
x.lineTo(0, 144);
x.fill();
var tex = new THREE.CanvasTexture(c);
add(g, BX(3.4, 1.95, 0.08), std(0x0C0C0E, 0.6, 0.1), 0, 1.65, 0);
add(g, new THREE.PlaneGeometry(3.2, 1.8), new THREE.MeshBasicMaterial({ map: tex, color: 0xB8B8B8 }), 0, 1.65, 0.045);
return g;
};
FURN.xp_kidtable = function () {
var g = new THREE.Group(), top = std(0xE8262E, 0.5, 0), leg = std(0xFFC21A, 0.5, 0), cols = [0x1E66E8, 0x22B04A, 0xFF7A1A, 0xB02AD8];
add(g, CY(0.42, 0.42, 0.05, 24), top, 0, 0.5, 0);
[[0.25, 0.25], [-0.25, 0.25], [0.25, -0.25], [-0.25, -0.25]].forEach(function (p) { add(g, CY(0.03, 0.03, 0.48, 8), leg, p[0], 0.24, p[1]); });
[[0, 0.7, Math.PI], [0, -0.7, 0], [0.7, 0, -Math.PI / 2], [-0.7, 0, Math.PI / 2]].forEach(function (p, i) {
var c = new THREE.Group();
c.position.set(p[0], 0, p[1]);
c.rotation.y = p[2];
g.add(c);
var m = std(cols[i], 0.5, 0);
add(c, BX(0.3, 0.04, 0.3), m, 0, 0.3, 0);
add(c, BX(0.3, 0.32, 0.04), m, 0, 0.46, -0.14);
[[0.12, 0.12], [-0.12, 0.12], [0.12, -0.12], [-0.12, -0.12]].forEach(function (q) { add(c, BX(0.03, 0.3, 0.03), m, q[0], 0.15, q[1]); });
});
return g;
};
FURN.xp_playmat = function () {
var g = new THREE.Group(), cols = [0xE8262E, 0xFFC21A, 0x1E66E8, 0x22B04A];
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++)
add(g, BX(0.6, 0.02, 0.6), std(cols[(i + j) % 4], 0.85, 0), -0.9 + i * 0.6, 0.012, -0.9 + j * 0.6);
g.name = "rug-playmat";
return g;
};
if (typeof SOLIDFURN !== "undefined") {
["xp_treadmill", "xp_weightbench", "xp_dumbbells", "xp_bike", "xp_pooltable", "xp_kidtable"].forEach(function (k) { SOLIDFURN[k] = 1; });
}
if (typeof furnBox === "function") {
var XPB = { xp_treadmill: [0.8, 1.9], xp_weightbench: [0.9, 1.3], xp_dumbbells: [1.2, 0.4], xp_bike: [0.5, 1.0], xp_pooltable: [2.5, 1.4], xp_kidtable: [1.5, 1.5] };
var fb0 = furnBox;
furnBox = function (k) { return XPB[k] || fb0.apply(this, arguments); };
}
})();
(function () {
if (typeof HW === "undefined" || !HW.x || !HW.x.ROOM || !HW.x.MIN)
return;
var X = HW.x, ROOM = X.ROOM, MIN = X.MIN;
function k(base, want) { var v = X.pk(base, want); if (v && FURN[v])
return v; return FURN["sg_" + base] ? "sg_" + base : null; }
function fab(b) { return X.fab(b) || k(b); }
function wd(b) { return X.wd(b) || k(b); }
function mt(b) { return X.mt(b) || k(b); }
function plain(b) { return k(b, ["white", "pine", "oak", "dove", "chrome"]); }
var BRIGHT = ["crimson", "mustard", "teal", "emerald", "navy", "sky", "pink"];
[["xbed", "bedroom"], ["xbath", "bathroom"], ["xstudy", "study"], ["xnursery", "nursery"], ["xsitting", "living"]].forEach(function (p) {
ROOM[p[0]] = function (P) { ROOM[p[1]](P); };
MIN[p[0]] = function (P) { MIN[p[1]](P); };
});
MIN.xmaster = function (P) {
var c = P.w * 0.6;
P(k("qf_bedking", ["dove", "ivory"]), c, P.B + 1.15, "+v");
[-1.4, 1.4].forEach(function (o) { P(plain("qf_nightstand1"), c + o, P.B + 0.33, "+v"); });
P("wardrobe", c, P.F - 0.35, "-v");
};
ROOM.xmaster = function (P) {
var c = P.w * 0.6;
P(X.rug(3), c, P.B + 2.4, "+v");
P(HW.grand ? "fourposter" : fab("qf_bedking"), c, P.B + 1.15, "+v");
[-1.4, 1.4].forEach(function (o) { P(wd("qf_nightstand1"), c + o, P.B + 0.33, "+v"); P.on(mt("kf_lamproundtable"), 0.55, c + o, P.B + 0.33, "+v"); });
P(X.art(2), c, P.B + 0.06, "+v");
P("wardrobe", c - 0.8, P.F - 0.35, "-v");
P("wardrobe", c + 0.8, P.F - 0.35, "-v");
P(fab("kf_loungechair"), P.w - 0.7, P.F - 1.3, "-u");
P(mt("kf_lamproundfloor"), P.w - 0.3, P.F - 0.4, "+v");
P(fab("qf_curtainsdouble"), P.w - 0.14, 0, "-u");
if (HW.grand)
P(mt("qf_lightchandelier"), c, P.B + 2.3, "+v");
};
MIN.xdress = function (P) { P("wardrobe", 1.8, P.B + 0.35, "+v"); P("wardrobe", 3.3, P.B + 0.35, "+v"); P("wallmirror", P.w - 0.12, 0, "-u"); };
ROOM.xdress = function (P) {
for (var u = 1.5; u < P.w - 1.0; u += 1.45)
P("wardrobe", u, P.B + 0.35, "+v");
P("wallmirror", P.w - 0.12, -0.6, "-u");
P(fab("kf_benchcushion") || wd("kf_bench"), P.w * 0.5, 0.4, "+v");
P(X.rug(4), P.w * 0.5, 0.4, "+v");
P(wd("qf_drawer1"), 2.2, P.F - 0.3, "-v");
P(wd("qf_drawer1"), 3.4, P.F - 0.3, "-v");
P(mt("kf_lamproundfloor"), P.w - 0.35, P.F - 0.4, "+v");
};
MIN.xplay = function (P) { P("xp_playmat", P.w * 0.5, 0, "+v"); P("xp_kidtable", P.w * 0.55, P.F - 1.3, "+v"); P("toys", P.w * 0.35, -0.4, 0); };
ROOM.xplay = function (P) {
MIN.xplay(P);
P("toys", P.w - 1.2, P.B + 0.7, 0);
P.small(k("kf_bear", ["pink", "sky", "tan"]), P.w * 0.6, -0.6, "-v");
P(k("kf_bookcaseopenlow", ["white"]), 1.6, P.B + 0.25, "+v");
P(k("kf_bookcaseopenlow", ["white"]), P.w - 0.3, P.B + 1.6, "-u");
P(k("kf_benchcushionlow", BRIGHT), 1.2, P.F - 0.4, "-v");
P(k("qf_curtainsdouble", BRIGHT), P.w - 0.14, 0, "-u");
};
MIN.xlaundry = function (P) { P(plain("kf_washer"), 1.4, P.B + 0.4, "+v"); P(plain("kf_dryer"), 2.2, P.B + 0.4, "+v"); P(plain("kf_kitchencabinet"), 3.1, P.B + 0.46, "+v"); };
ROOM.xlaundry = function (P) {
MIN.xlaundry(P);
P(plain("kf_kitchensink"), 3.98, P.B + 0.46, "+v");
P(plain("kf_kitchencabinetdrawer"), 4.86, P.B + 0.46, "+v");
P(k("qf_shelflarge", ["white", "oak"]), P.w - 0.3, P.B + 1.6, "-u");
P(k("kf_trashcan"), P.w - 0.4, P.F - 0.4, "-v");
};
MIN.xlibrary = function (P) { [1.3, 3.0, 4.7].forEach(function (u) { P("bookshelf", u, P.B + 0.25, "+v"); }); P(k("kf_loungechair", ["dove", "charcoal"]), P.w - 0.8, 0.6, "-u"); };
ROOM.xlibrary = function (P) {
for (var u = 1.3; u < P.w - 0.9; u += 1.7) {
P("bookshelf", u, P.B + 0.25, "+v");
P("bookshelf", u, P.F - 0.25, "-v");
}
P(X.rug(4), P.w * 0.55, 0, "+v");
P(fab("kf_loungechairrelax"), P.w - 0.9, -0.5, "-u");
P(fab("kf_loungechair"), P.w - 0.9, 0.9, "-u");
P(wd("kf_sidetable"), P.w - 0.5, 0.2, "-u");
P.on(mt("kf_lamproundtable"), 0.55, P.w - 0.5, 0.2, "-u");
P(mt("kf_lamproundfloor"), P.w - 0.35, P.B + 1.2, "+v");
if (HW.grand)
P(mt("qf_lightchandelier"), P.w * 0.55, 0, "+v");
};
MIN.xgym = function (P) { P("xp_treadmill", 1.3, 0, "+v"); P("xp_weightbench", P.w * 0.55, 0.2, "+v"); P("xp_gymmat", P.w - 1.0, 0.3, "+v"); };
ROOM.xgym = function (P) {
MIN.xgym(P);
P("xp_bike", 2.5, -0.6, "+v");
P("xp_dumbbells", P.w * 0.55, P.F - 0.3, "-v");
P("wallmirror", P.w - 0.12, -1.4, "-u");
P(k("kf_speaker"), 1.2, P.B + 0.3, "+v");
P("plant", P.w - 0.45, P.F - 0.45, 0);
};
MIN.xgames = function (P) { P("xp_pooltable", P.w * 0.55, 0.3, "+v"); P(k("ka_arcademachine"), 1.2, P.B + 0.45, "+v"); };
ROOM.xgames = function (P) {
MIN.xgames(P);
P(k("ka_pinball"), 2.4, P.B + 0.5, "+v");
P(k("ka_airhockey"), P.w - 1.0, P.B + 1.0, "-u");
P(k("kf_stoolbar", ["chrome", "black"]), 1.0, P.F - 0.6, "-v");
P(k("kf_stoolbar", ["chrome", "black"]), 1.8, P.F - 0.6, "-v");
P(X.art(6), P.w * 0.55, P.F - 0.05, "-v");
};
MIN.xcinema = function (P) { P("xp_screen", P.w - 0.1, 0, "-u"); P(k("kf_loungesofa", ["charcoal", "navy"]), 2.6, 0, "+u"); };
ROOM.xcinema = function (P) {
P("xp_screen", P.w - 0.1, 0, "-u");
P(k("kf_loungesofacorner", ["charcoal", "navy"]) || k("kf_loungesofa", ["charcoal", "navy"]), 2.0, 0, "+u");
P(k("kf_loungesofa", ["charcoal", "navy"]), 3.7, 0, "+u");
P(k("kf_speaker"), P.w - 0.4, P.B + 0.5, "-u");
P(k("kf_speaker"), P.w - 0.4, P.F - 0.5, "-u");
P(k("rug_border", ["0"]) || X.rug(1), 3.0, 0, "+v");
P(k("kf_tablecoffee", ["walnut", "oak"]), 3.0, -1.6, "+v");
};
MIN.xmusic = function (P) { P("piano", 2.6, P.B + 0.6, "+v"); P(k("qf_stool") || plain("kf_chair"), 2.6, P.B + 1.45, "-v"); };
ROOM.xmusic = function (P) {
MIN.xmusic(P);
P(X.rug(2), 3.0, 0.6, "+v");
P(fab("kf_loungechair"), P.w - 0.8, 0.7, "-u");
P(fab("kf_loungechair"), P.w - 0.8, -0.6, "-u");
P("bookshelf", 1.2, P.F - 0.25, "-v");
P(k("kf_speaker"), P.w - 0.4, P.B + 0.4, "-u");
P(X.art(5), 2.6, P.B + 0.06, "+v");
};
MIN.xcraft = function (P) { P(k("qp_workbench"), 2.0, P.B + 0.5, "+v"); P(k("qp_shelfsimple"), P.w - 0.3, 0, "-u"); };
ROOM.xcraft = function (P) {
MIN.xcraft(P);
P(k("qp_workbench"), 4.0, P.B + 0.5, "+v");
P("crates", 1.4, P.F - 0.7, 0);
P(k("qp_cratewooden"), P.w - 0.6, P.F - 0.6, "-v");
P(k("kf_stoolbar", ["oak", "black"]), 2.0, P.B + 1.3, "-v");
P(k("qp_pegrack"), P.w - 0.3, -1.5, "-u");
};
MIN.xsun = function (P) {
P(k("qf_houseplant3") || "plant", P.w - 0.5, P.B + 0.5, "+v");
P(k("qf_houseplant5") || "plant", P.w - 0.5, P.F - 0.5, "-v");
P(k("kf_loungechairrelax", ["sage", "ivory", "dove"]), P.w * 0.55, -0.7, "+u");
P(k("kf_loungechairrelax", ["sage", "ivory", "dove"]), P.w * 0.55, 0.8, "+u");
};
ROOM.xsun = function (P) {
MIN.xsun(P);
P(k("kf_tablecoffeeglass"), P.w * 0.55 + 1.0, 0, "+v");
P(k("kn_potlarge") || "plant", 1.2, P.B + 0.5, 0);
P(k("qf_houseplant1") || "plant", 1.2, P.F - 0.5, 0);
P(k("qf_houseplant7") || "plant", P.w * 0.5, P.B + 0.4, 0);
P(X.rug(5), P.w * 0.55, 0, "+v");
};
MIN.xoffice = function (P) { P(plain("kf_desk"), P.w - 0.5, 0, "-u"); P(k("kf_chairdesk", ["black", "dove"]), P.w - 1.25, 0, "+u"); P.on(k("kf_computerscreen"), 0.79, P.w - 0.45, 0, "-u"); };
ROOM.xoffice = function (P) {
P(wd("kf_desk"), P.w - 0.5, 0, "-u");
P(k("kf_chairdesk", ["black", "navy"]), P.w - 1.25, 0, "+u");
P.on(k("kf_computerscreen"), 0.79, P.w - 0.45, 0, "-u");
P.on(k("kf_laptop"), 0.79, P.w - 0.5, 0.5, "-u");
P(wd("kf_bookcasecloseddoors"), 1.6, P.B + 0.3, "+v");
P(wd("kf_bookcasecloseddoors"), 2.5, P.B + 0.3, "+v");
P(fab("kf_loungechair"), 1.6, P.F - 1.0, "+u");
P("plant", P.w - 0.45, P.F - 0.45, 0);
P(X.art(4), 2.0, P.F - 0.05, "-v");
};
MIN.xbar = function (P) {
P(k("kf_kitchenbar", ["walnut", "oak"]), 2.4, P.B + 1.4, "+v");
P(k("kf_kitchenbar", ["walnut", "oak"]), 3.4, P.B + 1.4, "+v");
P(k("kf_stoolbar", ["chrome", "black"]), 2.4, P.B + 2.2, "-v");
P(k("kf_stoolbar", ["chrome", "black"]), 3.4, P.B + 2.2, "-v");
};
ROOM.xbar = function (P) {
MIN.xbar(P);
P(k("kf_kitchenbar", ["walnut", "oak"]), 4.4, P.B + 1.4, "+v");
P(k("kf_stoolbar", ["chrome", "black"]), 4.4, P.B + 2.2, "-v");
P(k("qp_shelfsmallbottles"), 3.0, P.B + 0.2, "+v");
P(k("kf_kitchenfridgesmall"), 1.3, P.B + 0.4, "+v");
P(fab("kf_loungesofa"), P.w * 0.5, P.F - 0.5, "-v");
if (HW.grand)
P(mt("qf_lightchandelier"), 3.4, P.B + 1.6, "+v");
};
if (typeof ROOMNAME !== "undefined")
Object.keys(XP_ROOMNAME).forEach(function (r) { if (!ROOMNAME[r])
ROOMNAME[r] = XP_ROOMNAME[r]; });
if (typeof ROOMFURN !== "undefined")
Object.keys(XP_ROOMNAME).forEach(function (r) { if (!ROOMFURN[r])
ROOMFURN[r] = ROOMFURN.living; });
if (typeof HW_HOMES !== "undefined")
HW_HOMES.xpannex = 1;
})();
function xpUid() { try {
return (typeof session !== "undefined" && session && session.user && session.user.id) || "";
}
catch (e) {
return "";
} }
function xpKeeper() { return typeof amKeeper === "function" && !!amKeeper(); }
function xpRooms(home) {
var out = [];
(XP.rows[home] || []).forEach(function (r) { (r.rooms || []).forEach(function (x) { if (out.length < XP_MAX_ROOMS * 2)
out.push(x); }); });
return out;
}
function xpHas(home) { return !!home && xpRooms(home).length > 0; }
function xpHolds(home) { return __ZC(344, 0, this, arguments, new.target); }
function xpLotName(id) { return __ZC(344, 1, this, arguments, new.target); }
function xpHomeName(home) {
var m = /^lot:(\d+)$/.exec(home || "");
if (m)
return xpLotName(m[1]) || "your home";
m = /^eyrie:(\d+)$/.exec(home || "");
if (m)
return "your Eyrie apartment";
if (/^dream:/.test(home || ""))
return "your dream home";
return "your home";
}
function xpDreamSpec(spec) { return __ZC(344, 2, this, arguments, new.target); }
function xpHomeOfSpec(spec, I) {
if (!spec || spec.xpAnnex || spec.eyrie)
return null;
var m = I && I.wpKey && /^lot:(\d+)$/.exec(I.wpKey);
if (m)
return "lot:" + m[1];
if (xpUid() && xpDreamSpec(spec))
return "dream:" + xpUid() + ":" + spec.id;
return null;
}
var XP_DOOR_TEX = null;
function xpPlaqueTex() { return __ZC(344, 3, this, arguments, new.target); }
function xpDoorMesh() { return __ZC(344, 4, this, arguments, new.target); }
function xpSpot(I, L, B, ax, az) { return __ZC(344, 5, this, arguments, new.target); }
function xpDressDoors(I) { return __ZC(344, 6, this, arguments, new.target); }
function xpWorldKey() {
var k = typeof WLD !== "undefined" && WLD && WLD.on;
if (!k)
return null;
if (k === "surface")
k = (typeof whSurfKey === "function") ? whSurfKey() : null;
return k;
}
function xpCabinLot(h) { return __ZC(344, 7, this, arguments, new.target); }
function xpCabinSpot(key) { return __ZC(344, 8, this, arguments, new.target); }
function xpDressWorld() { return __ZC(344, 9, this, arguments, new.target); }
(function () {
if (typeof whRaise !== "function")
return;
var wr = whRaise;
whRaise = function (key, W, G) {
var list = wr.apply(this, arguments);
try {
(list || []).forEach(function (h) {
for (var i = 0; i < G.children.length; i++) {
var c = G.children[i];
if (Math.abs(c.position.x - h.x) < 0.01 && Math.abs(c.position.z - h.z) < 0.01 && Math.abs(c.position.y - h.floor) < 0.01) {
h.g = c;
break;
}
}
});
}
catch (e) { }
return list;
};
})();
function xpBase() { return (typeof WLD !== "undefined" && WLD && WLD.w && WLD.w.base) || 0; }
function xpNearIntDoor() { return __ZC(344, 10, this, arguments, new.target); }
function xpNearWorldDoor() { return __ZC(344, 11, this, arguments, new.target); }
function xpNearBack() {
if (!INT || !INT.spec || !INT.spec.xpAnnex || (INT.level || 0) !== 0 || !INT.exit)
return null;
var P = camera.position;
if (Math.abs(P.x - INT.exit.x) < 1.6 && Math.abs(P.z - INT.exit.z) < 2.4)
return { kind: "back" };
return null;
}
function xpSpec(home, o) { return __ZC(344, 12, this, arguments, new.target); }
function xpParentLook(spec) { return __ZC(344, 13, this, arguments, new.target); }
function xpEnter(n) { return __ZC(344, 14, this, arguments, new.target); }
function xpBack() { return __ZC(344, 15, this, arguments, new.target); }
function xpGoNear() { var n = XP.near; if (!n)
return; if (n.kind === "back")
xpBack();
else
xpEnter(n); }
function xpTick() {
var near = null;
try {
var walking = typeof walkMode === "undefined" || walkMode;
if (!walking)
near = null;
else if (typeof INT !== "undefined" && INT && INT.root && INT.spec && INT.spec.xpAnnex)
near = xpNearBack();
else if (typeof INT !== "undefined" && INT && INT.root && INT.xpDoors && INT.xpDoors.length)
near = xpNearIntDoor();
else if (!store.inside && typeof WLD !== "undefined" && WLD && WLD.on) {
xpDressWorld();
near = xpNearWorldDoor();
}
if (near && typeof wpEditing !== "undefined" && wpEditing)
near = null;
if (near && typeof HV !== "undefined" && HV.open)
near = null;
}
catch (e) {
near = null;
}
if (near) {
XP.near = near;
var html = near.kind === "back" ? "🏠 <b>Back into the house</b> · <b>press E</b> (or tap here), or walk out through the door" :
"🚪 <b>" + (near.mine ? "Your new rooms" : "The new rooms of " + esc(near.name)) + "</b> · <b>press E</b> (or tap here) to go through";
if (typeof worldPrompt === "function" && (!XP.prompted || (WLD && WLD.prompt && WLD.prompt.dataset.h !== html)))
worldPrompt(html, xpGoNear);
XP.prompted = true;
}
else if (XP.prompted) {
XP.prompted = false;
XP.near = null;
if (typeof worldPrompt === "function" && typeof WLD !== "undefined" && WLD.promptFn === xpGoNear)
worldPrompt(null);
}
}
setInterval(function () { try {
xpTick();
}
catch (e) { } }, 250);
addEventListener("keydown", function (e) {
if ((e.code !== "KeyE" && e.code !== "Enter") || !XP.prompted || !XP.near)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
xpGoNear();
}, true);
(function () {
if (typeof PLANS !== "undefined" && !PLANS.xpannex)
PLANS.xpannex = { mode: "rooms", rooms: ["xsitting"], wall: 0xE6DCC8, floor: "wood" };
if (typeof planOf === "function") {
var po = planOf;
planOf = function (spec) {
if (spec && spec.xpAnnex) {
var a = spec.xpAnnex;
return { mode: "rooms", rooms: (a.rooms && a.rooms.length ? a.rooms : ["xsitting"]).slice(), wall: a.wall, floor: a.floor };
}
return po.apply(this, arguments);
};
}
if (typeof furnishRoom === "function") {
var fr = furnishRoom;
furnishRoom = function () {
if (XP.cur && typeof HW !== "undefined") {
var f = HW.full, g = HW.grand;
HW.full = !!XP.cur.xpAnnex.full;
HW.grand = !!XP.cur.xpAnnex.grand;
try {
return fr.apply(this, arguments);
}
finally {
HW.full = f;
HW.grand = g;
}
}
return fr.apply(this, arguments);
};
}
if (typeof workplaceKeyOf === "function") {
var wk = workplaceKeyOf;
workplaceKeyOf = function (spec) { if (spec && spec.xpAnnex)
return "lot:x:" + spec.xpAnnex.home; return wk.apply(this, arguments); };
}
if (typeof canArrange === "function") {
var ca = canArrange;
canArrange = function (key) {
var m = /^lot:x:(.+)$/.exec(key || "");
if (m) {
if (typeof heldNow === "function" && heldNow())
return false;
return xpHolds(m[1]);
}
return ca.apply(this, arguments);
};
}
if (typeof wpSave === "function") {
var ws = wpSave;
wpSave = function () {
var key = wpEditing, m = /^lot:x:(.+)$/.exec(key || "");
if (!m)
return ws.apply(this, arguments);
var draft = wpDraft;
cityRpc("expansion_decor_save", { p_home: m[1], p_decor: draft }).then(function (o) {
if (!o || o.ok === false)
return paintArranger((o && o.say) || "That did not save.");
WP_DECOR[key] = draft.slice();
XP.decor[m[1]] = WP_DECOR[key];
wpEditing = null;
wpDraft = null;
paintArranger();
paintWorkButton();
setStatus("<b>Saved.</b> Your new rooms are arranged this way for everyone who comes in.");
}).catch(function (e) { paintArranger(xpErr(e)); });
};
}
if (typeof cityRpc === "function") {
var cr = cityRpc;
cityRpc = function (name, args) {
var m = name === "reset_workplace_decor" && args && /^lot:x:(.+)$/.exec(String(args.p_key || ""));
if (m)
return cr("expansion_decor_save", { p_home: m[1], p_decor: null }).then(function (o) { if (o && o.ok !== false) {
delete XP.decor[m[1]];
return "ok";
} return (o && o.say) || "That did not go through."; });
return cr.apply(this, arguments);
};
}
if (typeof rsyKeyOf === "function") {
var rk = rsyKeyOf;
rsyKeyOf = function (spec) { if (spec && spec.xpAnnex)
return spec.xpAnnex.look || null; return rk.apply(this, arguments); };
}
if (typeof fnHomeHere === "function") {
var fh = fnHomeHere;
fnHomeHere = function () { if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.xpAnnex)
return !!(INT.spec.xpAnnex.where); return fh.apply(this, arguments); };
}
if (typeof fnHomeWhere === "function") {
var fw = fnHomeWhere;
fnHomeWhere = function () { if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.xpAnnex)
return INT.spec.xpAnnex.where || null; return fw.apply(this, arguments); };
}
if (typeof fnDreamHome === "function") {
var fd = fnDreamHome;
fnDreamHome = function () { if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.xpAnnex)
return false; return fd.apply(this, arguments); };
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function (quiet) {
if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.xpAnnex) {
if (XP.back) {
xpBack();
if (quiet)
return ex.apply(this, arguments);
return;
}
scene.remove(INT.root);
INT = null;
store.inside = null;
return;
}
return ex.apply(this, arguments);
};
}
if (typeof makeInterior === "function") {
var mk = makeInterior;
makeInterior = function (spec) {
var was = XP.cur, I;
XP.cur = (spec && spec.xpAnnex) ? spec : null;
try {
I = mk.apply(this, arguments);
}
finally {
XP.cur = was;
}
try {
if (spec && spec.xpAnnex)
xpTidy(I, spec);
else
xpDressDoors(I);
}
catch (e) {
if (window.console)
console.warn("[home expansions]", e);
}
return I;
};
}
})();
function xpTidy(I, spec) { return __ZC(344, 16, this, arguments, new.target); }
function xpErr(e) {
var m = String(e && e.message || e || "");
try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { }
return /function|404|schema cache|PGRST202/i.test(m) ? ((typeof notOpenYet === "function") ? notOpenYet("The builders open soon.", "Home expansions need the latest server update.") : "The builders open soon.") : m;
}
function xpApply(d) { return __ZC(344, 17, this, arguments, new.target); }
function xpLoad(force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
if (XP.loading)
return XP.loading;
if (!force && XP.at && Date.now() - XP.at < 120000)
return Promise.resolve(null);
XP.at = Date.now();
XP.loading = cityRpc("expansion_board", {}).then(function (d) {
XP.loading = null;
if (!d || d.ok === false)
return d;
XP.missing = false;
xpApply(d);
if (XB.open)
xbPaint(true);
return d;
}, function (e) { XP.loading = null; XP.missing = true; XP.err = xpErr(e); if (XB.open)
xbPaint(true); return null; });
return XP.loading;
}
setInterval(function () {
try {
if (!(typeof signedIn === "function" && signedIn()))
return;
if (!XP.at)
return void xpLoad(true);
var where = (typeof store !== "undefined" && store.inside) || (typeof WLD !== "undefined" && WLD && WLD.on) || XB.open;
if (where && (typeof walkMode === "undefined" || walkMode))
xpLoad(false);
}
catch (e) { }
}, 5000);
var XB = { open: false, home: null, want: null, ask: null, msg: "", bad: false, busy: false };
function xbHere() { return __ZC(344, 18, this, arguments, new.target); }
function xbHomes() { return __ZC(344, 19, this, arguments, new.target); }
function xbPick() {
var L = xbHomes();
if (!L.length)
return null;
var h = L.filter(function (x) { return x.home === XB.home; })[0] || L.filter(function (x) { return x.here; })[0] || L[0];
XB.home = h.home;
return h;
}
function xbOpen() {
XB.open = true;
XB.ask = null;
XB.msg = "";
XB.bad = false;
XB.home = null;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
xbPaint(true);
xpLoad(true);
}
function xbClose() { XB.open = false; XB.ask = null; xbPaint(true); }
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return XB.open; }, close: xbClose });
var XB_BOX = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:52;width:min(560px,calc(100vw - 24px));max-height:min(80vh,700px);overflow-y:auto;" +
"-webkit-overflow-scrolling:touch;background:rgba(12,10,8,.97);border:1px solid #C9A868;border-radius:6px;padding:14px 16px;font:13px/1.5 var(--sans,system-ui);color:var(--bone,#E8E2D2);box-shadow:0 14px 50px rgba(0,0,0,.6)";
function xbMoney(n) { return Number(n || 0).toLocaleString() + " gold"; }
function xbPaint() { return __ZC(344, 20, this, arguments, new.target); }
function xbAct(a, v) { return __ZC(344, 21, this, arguments, new.target); }
setInterval(function () {
try {
var at = typeof wrAtOffice === "function" && wrAtOffice() && typeof signedIn === "function" && signedIn();
var b = document.getElementById("xb-lo");
if (!b && at && document.body) {
b = document.createElement("button");
b.id = "xb-lo";
b.type = "button";
b.textContent = "🏗️ Hearth & Beam: add rooms to your home";
b.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:46;background:rgba(14,12,8,.94);color:#F0D8A8;border:1px solid #C9A868;border-radius:3px;padding:9px 14px;font:13px var(--sans);cursor:pointer;max-width:calc(100vw - 24px)";
b.onclick = function () { xbOpen(); };
document.body.appendChild(b);
}
if (b)
b.style.display = at && !XB.open && !(typeof WR !== "undefined" && WR.open) ? "block" : "none";
}
catch (e) { }
}, 500);
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-homex"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-homex";
b.title = "Hearth & Beam Builders: new rooms for your home";
b.textContent = "🏗️ Home builders";
b.onclick = function () { xbOpen(); };
var pk = document.getElementById("me-restyle");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
})();
try {
if (typeof PS_SECTIONS !== "undefined") {
var xpShop = PS_SECTIONS.filter(function (s) { return s.k === "shop"; })[0];
if (xpShop && xpShop.ids.indexOf("me-homex") < 0) {
var ri = xpShop.ids.indexOf("me-restyle");
xpShop.ids.splice(ri >= 0 ? ri + 1 : xpShop.ids.length, 0, "me-homex");
}
}
}
catch (e) { }
(function () {
try {
var m = /[?&]kxp=home:([^&]+)/.exec(location.search || "");
if (!m)
return;
var want = decodeURIComponent(m[1]), tries = 0;
(function wait() { tries++; if (typeof signedIn === "function" && signedIn() && document.body) {
XB.want = want;
xbOpen();
XB.home = want;
xbPaint(true);
return;
} if (tries < 60)
setTimeout(wait, 1000); })();
}
catch (e) { }
})();
