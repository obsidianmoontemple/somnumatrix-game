/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BDL = { board: null, at: 0, busy: false, houses: {}, built: {}, solids: [], near: null, prompted: false, secret: null, cool: {}, t: 0, btn: null, said: {} };
var BDL_DEFS = {
underdark: { key: "underdark", world: "underdark", icon: "🕸️", short: "Underdark",
name: "The Underdark Bundle", house: "The House of the Hollow Star", street: "the Hanging Ring",
where: "the Hanging Ring, hung from the cavern roof round Zhaelvorn; a silk lift on the cavern floor under each manor carries you up",
face: { x: 200, z: -800 },
pet: { kind: "bd_gloomkit", name: "Gloomkit", icon: "🐈‍⬛", about: "A small six-eyed cave cat with soft violet glow in its fur. It purrs like falling water." },
skin: { arch: "bdl_underdark", name: "Hollow Star robes",
look: { topKind: "robe", top: 0x241C34, bottom: 0x241C34, back: "cloak", backColor: 0x16121F, hat: "hood", hatColor: 0x1E1830, neck: "necklace", accColor: 0xB8C4E8, hands: "gloves", shoeKind: "boots", shoes: 0x1A1622 },
about: "Layered dark silk robes with silver thread, a deep hood and a cloak the colour of the cavern." },
mount: { arch: "bdm_underdark", name: "Duskwing", fly: true, seat: 2.1,
power: { key: "dive", name: "Nightfall Dive", icon: "🌑", r: 9, npc: 34, pvp: 25, hold: 1.5, cool: 6, col: 0x6A4AC8,
say: "Duskwing folds its wings and drops on the ground before you: a ring of shadow strikes every foe around." } },
keyArch: "bdk_underdark" },
verne: { key: "verne", world: "verne", icon: "🧭", short: "Verne",
name: "The Verne Bundle", house: "The Engineer's Lighthouse", street: "the Headland Row",
where: "the Headland Row, on the shore east of the harbour past the Nautilus dock, each lighthouse at the water's edge",
face: { x: 1800, z: 600 },
pet: { kind: "bd_seadog", name: "Top", icon: "🐕", about: "A loyal, clever sea dog, after the dog of The Mysterious Island (1874). He swims like a seal." },
skin: { arch: "bdl_verne", name: "Captain of the Deep's coat",
look: { layer: "longcoat", layerColor: 0x1C2434, top: 0xE8E2D4, bottom: 0x1C2434, hat: "cap", hatColor: 0x1C2434, neck: "scarf", accColor: 0xC8A04A, shoeKind: "boots", shoes: 0x2A2018, hands: "gloves" },
about: "A dark naval coat with brass buttons, a captain's cap, a sea scarf and boots: the look of the books, never a film's." },
mount: { arch: "bdm_verne", name: "Robur's Terror", fly: true, seat: 0.55,
power: { key: "ram", name: "The Ram", icon: "⚙️", r: 14, w: 3.5, npc: 36, pvp: 25, hold: 1, cool: 6, col: 0xC8A04A,
say: "The Terror lunges forward at full power: everything in its path is struck and thrown aside." } },
keyArch: "bdk_verne" },
davinci: { key: "davinci", world: "davinci", icon: "🎨", short: "Italy",
name: "The Italy Bundle", house: "The Maestro's Villa", street: "the Villa Road",
where: "the Villa Road, on the hills north-west of Florence above the Porta al Prato",
face: { x: 0, z: 20 },
pet: { kind: "bd_lioncub", name: "Leoncino", icon: "🦁", about: "A small clockwork lion cub of carved wood and gilt, after the walking lion Leonardo built for the King of France in 1515." },
skin: { arch: "bdl_davinci", name: "The Maestro's robes",
look: { topKind: "robe", top: 0x7A2A26, bottom: 0x7A2A26, layer: "apron", layerColor: 0x6A4A30, hat: "brimmed", hatColor: 0x2A1E1A, waist: "satchel", accColor: 0xC8963A, shoeKind: "boots", shoes: 0x3A2A1E, beard: 1 },
about: "A painter-inventor's long robe, soft cap, a leather apron and a satchel for the notebooks." },
mount: { arch: "bdm_davinci", name: "The Ornithopter", fly: true, seat: 0.7,
power: { key: "falcon", name: "Falcon Strike", icon: "🦅", r: 16, w: 3, npc: 34, pvp: 25, hold: 1.2, cool: 6, col: 0xE8D8B0,
say: "The wings beat down hard: a gust like a falcon's stoop hits every foe in a line ahead." } },
keyArch: "bdk_davinci" }
};
var BDL_ORDER = ["underdark", "verne", "davinci"];
function bdlDefOfWorld(w) { for (var i = 0; i < BDL_ORDER.length; i++)
if (BDL_DEFS[BDL_ORDER[i]].world === w)
return BDL_DEFS[BDL_ORDER[i]]; return null; }
function bdlDefOfMount(a) { for (var i = 0; i < BDL_ORDER.length; i++)
if (BDL_DEFS[BDL_ORDER[i]].mount.arch === a)
return BDL_DEFS[BDL_ORDER[i]]; return null; }
function bdlDefOfPet(k) { for (var i = 0; i < BDL_ORDER.length; i++)
if (BDL_DEFS[BDL_ORDER[i]].pet.kind === k)
return BDL_DEFS[BDL_ORDER[i]]; return null; }
function bdlLite() { return typeof LITE !== "undefined" && !!LITE; }
function bdlSigned() { return typeof signedIn === "function" && signedIn(); }
function bdlMe() { try {
return bdlSigned() ? session.user.id : null;
}
catch (e) {
return null;
} }
function bdlKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function bdlEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function bdlSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function bdlTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function bdlRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function bdlHead(t) { return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + t + "</div>"; }
function bdlOwns(key) {
if (bdlKeeper())
return true;
var B = BDL.board;
if (B && B.mine && B.mine.some(function (m) { return m.bundle === key; }))
return true;
var D = BDL_DEFS[key], mine = (typeof myThings !== "undefined" && myThings) || [];
return !!D && mine.some(function (t) { return t && t.archetype === "bdk_" + D.key; });
}
function bdlHolds(arch) {
if (bdlKeeper())
return true;
var mine = (typeof myThings !== "undefined" && myThings) || [];
return mine.some(function (t) { return t && t.archetype === arch; });
}
var BDL_PLOTS = {
verne: [[1270, 162], [1312, 152], [1354, 141], [1396, 130], [1438, 118], [1480, 107], [1522, 96], [1564, 86], [1606, 78], [1648, 71], [1690, 66], [1732, 64], [1774, 64], [1816, 65], [1858, 68], [1900, 73], [1942, 79], [1984, 86], [2026, 93], [2068, 100], [2110, 106], [2152, 112], [2194, 117], [2236, 120], [2278, 122], [2320, 123], [2362, 123], [2404, 122], [2446, 120], [2488, 117], [2530, 115], [2572, 114], [2614, 113], [2656, 113], [2698, 114], [2740, 117], [2782, 122], [2824, 128], [2866, 135], [2908, 144], [2950, 153], [2992, 163], [3034, 173], [3076, 183], [3118, 192], [3160, 199], [3202, 205], [3244, 209], [3286, 211], [3328, 211], [3370, 208], [3412, 203], [3454, 197], [3496, 189], [3538, 180], [3580, 170], [3622, 160], [3664, 150], [3706, 141], [3748, 133], [3790, 126], [3832, 120], [3874, 116], [3916, 113], [3958, 112], [4000, 112], [4042, 113], [4084, 115], [4126, 117], [4168, 120], [4210, 121], [4252, 122], [4294, 122], [4336, 121], [4378, 119], [4420, 115], [4462, 110], [4504, 105], [4546, 98]],
davinci: [[-756, -500, 7.4], [-790, -540, 7], [-722, -540, 6.4], [-824, -500, 9.4], [-824, -540, 8], [-858, -500, 10.4], [-824, -580, 6.8], [-722, -620, 7.2], [-858, -580, 8.3], [-824, -620, 5.8], [-858, -620, 7], [-892, -580, 9.7], [-756, -660, 5.5], [-790, -660, 4.8], [-722, -660, 7.1], [-926, -500, 10.3], [-824, -660, 4.9], [-892, -620, 8.3], [-926, -580, 9.1], [-858, -660, 5.8], [-756, -700, 5.2], [-790, -700, 4.7], [-960, -540, 9.3], [-926, -620, 8.3], [-892, -660, 6.9], [-960, -580, 8.8], [-858, -700, 5.7], [-926, -660, 7.7], [-960, -620, 8.2], [-756, -740, 5.3], [-994, -540, 9.4], [-892, -700, 6.8], [-790, -740, 5.2], [-722, -740, 5.2], [-824, -740, 5.6], [-994, -580, 9], [-960, -660, 8.2], [-858, -740, 6.7], [-926, -700, 7.7], [-994, -620, 8.6], [-1028, -540, 10.7], [-892, -740, 7.7], [-756, -780, 5.1], [-790, -780, 6.2], [-722, -780, 3.9], [-960, -700, 8.8], [-994, -660, 8.7], [-926, -740, 8.6], [-1028, -620, 9.2], [-858, -780, 8.8], [-1062, -540, 10.9], [-994, -700, 8.7], [-892, -780, 9.5], [-960, -740, 8.5], [-1028, -660, 8.2], [-1062, -580, 9.4], [-756, -820, 5.2], [-790, -820, 7.3], [-722, -820, 3.7], [-858, -820, 10.5], [-1028, -700, 7.9], [-994, -740, 7.9], [-1096, -540, 9.4], [-1062, -660, 8.2], [-960, -780, 7.9], [-892, -820, 10.5], [-1096, -620, 7.8], [-790, -860, 8.4], [-722, -860, 3.8], [-926, -820, 9.1], [-1028, -740, 7.6], [-1062, -700, 7.8], [-824, -860, 10.5], [-994, -780, 7.4], [-858, -860, 12], [-1096, -660, 8.2], [-1130, -540, 8.5], [-892, -860, 11.5], [-1096, -700, 8.2], [-926, -860, 10.1], [-756, -900, 6.9], [-790, -900, 9.5], [-722, -900, 4.8], [-824, -900, 11.4], [-1164, -500, 9], [-1164, -540, 8.4], [-960, -860, 8.8], [-1062, -780, 6.6], [-1028, -820, 7.1], [-892, -900, 11.3], [-1130, -700, 8.3], [-994, -860, 7.9], [-926, -900, 9.8], [-756, -940, 10], [-1096, -780, 5.7], [-790, -940, 11.8], [-722, -940, 8.3], [-1198, -500, 9], [-1062, -820, 6.4], [-960, -900, 8.6], [-1198, -580, 8.2], [-1028, -860, 7.3], [-858, -940, 12.1], [-1164, -700, 7.6], [-1198, -620, 7.7], [-892, -940, 10.9], [-1096, -820, 5.5], [-1130, -780, 5.3], [-926, -940, 9.4], [-1062, -860, 6.5], [-1232, -500, 9.4], [-756, -980, 13.3], [-790, -980, 13.9], [-722, -980, 12.4], [-1028, -900, 7], [-824, -980, 12.9], [-960, -940, 8.3], [-858, -980, 12], [-1130, -820, 5.2], [-1096, -860, 5.8], [-892, -980, 11], [-994, -940, 7.5], [-1232, -660, 7.9], [-1198, -740, 7.5], [-1062, -900, 6.7], [-926, -980, 9.8], [-1266, -580, 10], [-1232, -700, 7.7], [-1028, -940, 6.8], [-1130, -860, 5.7], [-756, -1020, 15.2], [-790, -1020, 14.7], [-722, -1020, 14.6], [-960, -980, 8.9], [-824, -1020, 13.2], [-1096, -900, 6.4], [-858, -1020, 12.3], [-994, -980, 8.1], [-1062, -940, 6.7], [-1164, -860, 6], [-1300, -540, 11.7], [-926, -1020, 12.1], [-1266, -700, 8.5], [-1300, -580, 10.3], [-1028, -980, 7.4], [-1096, -940, 6.8], [-960, -1020, 11.5], [-756, -1060, 16.9], [-790, -1060, 16.1], [-722, -1060, 16.4], [-1266, -740, 8.4], [-824, -1060, 14.4], [-1300, -660, 9.5], [-858, -1060, 13.4], [-1062, -980, 7.3], [-1198, -860, 7], [-994, -1020, 10.7], [-892, -1060, 13.3], [-1130, -940, 7.3], [-1266, -780, 8.2], [-926, -1060, 13.9], [-1300, -740, 9.1], [-960, -1060, 14.2], [-756, -1100, 18.8], [-1164, -940, 7.7], [-790, -1100, 17.6], [-722, -1100, 18.8], [-1266, -820, 8.1], [-1062, -1020, 10], [-994, -1060, 13.4], [-1130, -980, 8.8], [-858, -1100, 15.3], [-1096, -1020, 10.2], [-1028, -1060, 12.8], [-1164, -980, 9.6], [-1300, -820, 8.9], [-1062, -1060, 12.6], [-1130, -1020, 10.9], [-1300, -860, 9.4], [-1198, -980, 10.3], [-1096, -1060, 12.6], [-1164, -1020, 11.8], [-1130, -1060, 12.8], [-1232, -980, 11.2], [-1198, -1020, 12.9], [-1164, -1060, 13.6], [-1266, -980, 12.5], [-1232, -1020, 14.1], [-1198, -1060, 14.8], [-1300, -980, 13.7], [-1232, -1060, 16.2], [-1300, -1020, 15.6], [-1266, -1060, 16.8], [-1300, -1060, 16.7]],
underdark: [[368, -720, 90.4], [345, -680, 94.8], [92, -959, 106.0], [391, -840, 80.3], [391, -760, 84.8], [207, -999, 91.4], [207, -601, 111.6], [0, -800, 121.7], [322, -959, 80.8], [322, -641, 98.0], [161, -999, 95.8], [161, -601, 115.7], [253, -999, 85.6], [253, -601, 106.4], [23, -920, 112.6], [23, -680, 123.8], [414, -800, 77.8], [0, -880, 116.5], [0, -720, 123.9], [115, -999, 99.1], [115, -601, 118.7], [46, -959, 107.5], [46, -641, 122.7], [299, -999, 78.5], [299, -601, 100.0], [391, -680, 85.7], [-23, -840, 119.4], [-23, -760, 123.0], [414, -880, 71.2], [414, -720, 80.5], [368, -959, 71.5], [368, -641, 89.6], [69, -999, 101.3], [69, -601, 120.6], [184, -561, 111.5], [184, -1039, 86.9], [437, -840, 69.2], [437, -760, 73.9], [230, -561, 106.8], [230, -1039, 81.6], [-46, -800, 121.2], [345, -999, 69.8], [345, -601, 92.3], [138, -561, 115.1], [138, -1039, 90.9], [276, -561, 101.0], [276, -1039, 74.9], [-23, -920, 112.6], [-23, -680, 123.8], [0, -959, 108.1], [0, -641, 123.2], [-46, -880, 116.0], [-46, -720, 123.4], [92, -561, 117.6], [92, -1039, 93.8], [437, -680, 74.9], [23, -999, 102.4], [23, -601, 121.6], [414, -641, 79.6], [322, -561, 93.9], [322, -1039, 66.7], [460, -720, 68.7], [-69, -840, 118.4], [-69, -760, 122.1], [391, -601, 83.1], [207, -1079, 76.3], [207, -521, 106.2], [161, -1079, 81.2], [161, -521, 110.3], [253, -1079, 70.1], [253, -521, 100.9], [46, -561, 119.0], [46, -1039, 95.4], [115, -1079, 84.7], [115, -521, 113.4], [-92, -800, 119.7], [368, -561, 85.3], [-46, -959, 107.5], [-46, -641, 122.7]]
};
var BDL_MAT = {}, BDL_TEX = {};
var BDL_PBR = { cave: 1, strata: 1, ashlar: 1, limestone: 1, slate: 1, terracotta: 1, stucco: 1, planks: 1, oak: 1, deck: 1, brass: 1, iron: 1, velvet: 1, quilt: 1, damask: 1, cotto: 1, darktile: 1, checker: 1, marble: 1, moss: 1 };
function bdlTex(name, mpt, nrm) { return __ZC(362, 0, this, arguments, new.target); }
function bdlM(col, tex, mpt, o) { return __ZC(362, 1, this, arguments, new.target); }
function bdlS(name, col, mpt, o) {
if (name === "stucco")
return bdlM(col === undefined ? 0xFFFFFF : col, "plaster", mpt || 3, o);
return bdlM(col === undefined ? 0xFFFFFF : col, "b:" + name, mpt || 2, o);
}
function bdlMetal(col, tex) { return bdlM(col, tex === false ? null : "b:" + (tex || "brass"), 1.2, { shine: 70, spec: 0x9A8A6A, n: 0.4 }); }
function bdlGlow(col, op) {
var k = "glow|" + col + "|" + (op || 1);
if (BDL_MAT[k])
return BDL_MAT[k];
var m = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined });
m.userData.ldShared = 1;
return (BDL_MAT[k] = m);
}
function bdlUV(g) { return __ZC(362, 2, this, arguments, new.target); }
function bdlBox(par, w, h, d, mat, x, y, z, ry) { var m = new THREE.Mesh(bdlUV(new THREE.BoxGeometry(w, h, d)), mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; par.add(m); return m; }
function bdlCyl(par, r0, r1, h, mat, x, y, z, seg, open) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg || (bdlLite() ? 10 : 20), 1, !!open), mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function bdlSph(par, r, mat, x, y, z, sx, sy, sz, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || (bdlLite() ? 8 : 16), Math.max(6, (seg || (bdlLite() ? 8 : 16)) * 0.75 | 0)), mat); m.position.set(x || 0, y || 0, z || 0); if (sx)
m.scale.set(sx, sy || sx, sz || sx); par.add(m); return m; }
function bdlCone(par, r, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg || (bdlLite() ? 8 : 16)), mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function bdlTor(par, r, t, mat, x, y, z, arc, seg) { var m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, seg || (bdlLite() ? 16 : 32), arc || Math.PI * 2), mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function bdlLathe(par, pts, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg || (bdlLite() ? 12 : 28)), mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function bdlHip(par, w, d, h, mat, x, y, z) { return __ZC(362, 3, this, arguments, new.target); }
function bdlArchShape(w, h) { var s = new THREE.Shape(), r = w / 2; s.moveTo(-r, 0); s.lineTo(-r, h); s.absarc(0, h, r, Math.PI, 0, true); s.lineTo(r, 0); s.lineTo(-r, 0); return s; }
function bdlArch(par, w, h, mat, x, y, z, ry) { var m = new THREE.Mesh(new THREE.ShapeGeometry(bdlArchShape(w, h), bdlLite() ? 6 : 12), mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; par.add(m); return m; }
function bdlPlate(lines, w, h, bg, fg) { return __ZC(362, 4, this, arguments, new.target); }
function bdlWT(r, t, mat, x, y, z, par, seg) { var m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, seg || (bdlLite() ? 16 : 32)), mat); m.position.set(x || 0, y || 0, z || 0); if (par)
par.add(m); return m; }
var BDL_OUT = {
underdark: function () { return bdlUdManor(); },
verne: function () { return bdlVrnLighthouse(); },
davinci: function () { return bdlDavVilla(); }
};
var BDL_UD_PROF = [[0, -35], [0.7, -33], [2.3, -28], [4.6, -22], [7, -16], [9, -10], [10.5, -4], [11, 0], [11.1, 4], [11.6, 12], [12.5, 20], [13.6, 28], [15.2, 36], [17.5, 44]];
function bdlUdR(y) { var P = BDL_UD_PROF; if (y <= P[0][1])
return 0; for (var i = 1; i < P.length; i++)
if (y <= P[i][1]) {
var t = (y - P[i - 1][1]) / (P[i][1] - P[i - 1][1]);
return P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t;
} return P[P.length - 1][0]; }
var BDL_UD_LEVELS = [
{ y: 0, name: "the terrace", parts: [{ ann: [11.45, 16.55] }, { box: [16, 34.6, -1.45, 1.45] }, { circ: [37.4, 0, 3.75] }, { box: [-18.6, -16, -1.15, 1.15] }] },
{ y: 10, name: "the Balcony of the Matrons", parts: [{ sec: [12.15, 16.9, 0.95] }] },
{ y: 21, name: "the High Balcony", parts: [{ sec: [13.35, 17.4, 0.62] }] },
{ y: -12, name: "the Under-Gallery", parts: [{ sec: [9.0, 13.3, 0.8] }] }
];
function bdlUdOn(L, lx, lz) { return __ZC(362, 5, this, arguments, new.target); }
function bdlRingTop(par, r0, r1, mat, y, half, seg) { return __ZC(362, 6, this, arguments, new.target); }
function bdlRail(par, r, y, half, mat, step) { return __ZC(362, 7, this, arguments, new.target); }
function bdlRailLine(par, x0, z0, x1, z1, y, mat) { return __ZC(362, 8, this, arguments, new.target); }
function bdlStarBanner() { return __ZC(362, 9, this, arguments, new.target); }
function bdlUdManor() { return __ZC(362, 10, this, arguments, new.target); }
function bdlRock(par, mat, x, y, z, s, seed) {
var R = bdlRand(seed || 7), m = new THREE.Mesh(new THREE.DodecahedronGeometry(1, bdlLite() ? 0 : 1), mat);
m.position.set(x, y, z);
m.scale.set(s * (0.8 + R() * 0.6), s * (0.5 + R() * 0.5), s * (0.8 + R() * 0.6));
m.rotation.set(R() * 3, R() * 3, R() * 3);
par.add(m);
return m;
}
function bdlWindow(par, x, y, z, ry, w, h, o) { return __ZC(362, 11, this, arguments, new.target); }
function bdlVrnLighthouse() { return __ZC(362, 12, this, arguments, new.target); }
function bdlVrnExtra(H, jz0, jz1) { return __ZC(362, 13, this, arguments, new.target); }
function bdlTree(par, kind, x, y, z, s, ry) { return __ZC(362, 14, this, arguments, new.target); }
function bdlOlive(par, x, z, seed) { return __ZC(362, 15, this, arguments, new.target); }
function bdlVine(par, x, z, seed) {
var R = bdlRand(seed * 13 + 5);
bdlCyl(par, 0.05, 0.07, 0.9, bdlS("strata", 0x7A6A5A, 1), x, 0.45, z, 5);
bdlSph(par, 0.75, bdlS("moss", 0x7AA050, 1.2), x, 1.25, z, 0.8, 0.55, 1.2, bdlLite() ? 6 : 10);
if (!bdlLite())
for (var k = 0; k < 3; k++)
bdlSph(par, 0.13, bdlM(0x4A2A5A), x + (R() - 0.5) * 0.6, 0.85, z + (R() - 0.5) * 0.9, 1, 1.3, 1, 6);
}
function bdlDavVilla() { return __ZC(362, 16, this, arguments, new.target); }
function bdlLoadDone() { return BDL.busy && BDL.wait ? BDL.wait : bdlLoad(true); }
function bdlLoad(force) { return __ZC(362, 17, this, arguments, new.target); }
function bdlWanted(D) { return __ZC(362, 18, this, arguments, new.target); }
function bdlPlotAt(D, n) { return __ZC(362, 19, this, arguments, new.target); }
function bdlLocal(lx, lz, at) { var c = Math.cos(at.rot), s = Math.sin(at.rot); return { x: at.x + lx * c + lz * s, z: at.z - lx * s + lz * c }; }
function bdlRaise() { return __ZC(362, 20, this, arguments, new.target); }
function bdlTakeDown(key) { return __ZC(362, 21, this, arguments, new.target); }
(function () {
if (typeof worldSolidAt !== "function" || typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
try {
var b = WLD.on && !store.inside && BDL.built[WLD.on];
if (b && b.solids.length && worldInRange(x) && worldSolidAt(b.solids, x - WLD.w.base, z, feet))
return true;
}
catch (e) { }
return ba.apply(this, arguments);
};
})();
function bdlMayEnter(h) { return bdlKeeper() || (h.owner && h.owner === bdlMe()); }
function bdlNearDoor() {
var key = WLD.on, b = BDL.built[key];
if (!b || !b.list.length)
return null;
var P = camera.position, lx = P.x - WLD.w.base, lz = P.z, best = null, bd = 2.6;
b.list.forEach(function (h) { var d = Math.hypot(lx - h.door.x, lz - h.door.z); if (d < bd && Math.abs(P.y - 1.72 - h.door.y) < 3) {
bd = d;
best = h;
} });
return best;
}
function bdlNearSpot() { return __ZC(362, 22, this, arguments, new.target); }
function bdlCull() {
var b = WLD.on && BDL.built[WLD.on];
if (!b)
return;
var P = camera.position, lx = P.x - WLD.w.base, far = bdlLite() ? 420 : 900;
b.list.forEach(function (h) { var v = Math.hypot(lx - h.at.x, P.z - h.at.z) < far; h.g.visible = v; (h.parts || []).forEach(function (p) { p.visible = v; }); });
}
function bdlHangLevelAt(h, x, z, feet, slack) { return __ZC(362, 23, this, arguments, new.target); }
function bdlHangList() { var b = BDL.built.underdark; return b ? b.list.filter(function (h) { return h.hang; }) : []; }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W || !W.ground || !W.block)
return;
var g0 = W.ground, b0 = W.block;
W.ground = function (x, z, feet) {
var base = g0.apply(this, arguments);
try {
if (feet !== undefined && feet > -40) {
var list = bdlHangList();
for (var i = 0; i < list.length; i++) {
var o = bdlHangLevelAt(list[i], x, z, feet);
if (o && o.L && (base == null || o.y > base))
return o.y;
}
}
}
catch (e) { }
return base;
};
W.block = function (x, z, feet) {
try {
if (feet !== undefined && feet > -40) {
var list = bdlHangList();
for (var i = 0; i < list.length; i++) {
var h = list[i], o = bdlHangLevelAt(h, x, z, feet);
if (!o)
continue;
if (o.L)
return false;
var ly = feet - h.at.y;
if (ly > -36 && ly < 44) {
var r = Math.hypot(o.lx, o.lz);
if (r < h.hang.R(ly + 1) + 0.35)
return true;
}
var flying = typeof canFly !== "undefined" && canFly;
if (!flying) {
for (var j = 0; j < h.hang.levels.length; j++) {
var y = h.at.y + h.hang.levels[j].y;
if (Math.abs(feet - y) < 0.9)
return true;
}
}
}
}
}
catch (e) { }
return b0.apply(this, arguments);
};
})();
function bdlTo(x, z, y, yw, msg) {
if (!WLD.w)
return;
camera.position.set(WLD.w.base + x, y + 1.72, z);
if (yw !== undefined)
yaw = yw;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
if (typeof pinnedLevel !== "undefined")
pinnedLevel = null;
if (msg)
bdlSay(msg);
}
function bdlHangDress(H, W) { return __ZC(362, 24, this, arguments, new.target); }
function bdlHangStair(H, from) { return __ZC(362, 25, this, arguments, new.target); }
function bdlPerch(H) { return __ZC(362, 26, this, arguments, new.target); }
(function () {
if (typeof udglSkipRoots !== "function")
return;
var sr = udglSkipRoots;
udglSkipRoots = function () { var s = sr.apply(this, arguments); try {
bdlHangList().forEach(function (h) { s.push(h.g); (h.parts || []).forEach(function (p) { s.push(p); }); });
}
catch (e) { } return s; };
})();
var BDL_IN = {};
function bdlEnter(h) { return __ZC(362, 27, this, arguments, new.target); }
function bdlLeave(quiet) { return __ZC(362, 28, this, arguments, new.target); }
function bdlIsIn() { return !!BDL.inside; }
function bdlClue(S) { worldCard(bdlHead("📜 A note") + "<div style='line-height:1.5;margin-top:6px'>" + bdlEsc(S.clue) + "</div>", {}); bdlTone(440, 0.2); }
function bdlAsk(S) { return __ZC(362, 29, this, arguments, new.target); }
function bdlBackUp() { var S = BDL.secret, I = BDL_IN[WLD.on]; BDL.secret = null; if (I && S)
I.back(S, "You climb back up, and the way closes quietly behind you."); }
function bdlFeat(F) {
if (F.dive) {
bdlDive();
return;
}
try {
if (typeof spbMend === "function")
spbMend(999);
}
catch (e) { }
bdlSay("✨ <b>" + bdlEsc(F.name) + ".</b> " + bdlEsc(F.say));
bdlTone(520, 0.5);
}
function bdlDive() { return __ZC(362, 30, this, arguments, new.target); }
var BDL_FEATS = {
vault: { name: "The Basin of Night", say: "You look into the dark water. Your strength comes back to you, all of it, cool and clear." },
moongarden: { name: "The Moonwell", say: "You drink from the Moonwell. Every hurt closes, and for a while you breathe as easily as the moths that live here." },
dock: { name: "The bathysphere", say: "", dive: true },
strong: { name: "The captain's sea chest", say: "Inside the chest: dry charts of every ocean, a sextant, and a tin of ship's biscuits. You eat one, and feel ready for anything." },
gears: { name: "The great model", say: "You turn the crank of the model flying machine. The gears hum all through the house, and you feel quick on your feet." },
codex: { name: "The secret codex", say: "You open the codex of the cellar: drawings of machines never built, and a page in his hand about the flight of birds. You come away clear-headed and strong." }
};
function bdlSecretOf(key, id) { return (BDL_SECRETS[key] || []).filter(function (S) { return S.id === id; })[0]; }
function bdlPropName(S) { return { shelf: "📕 The scrying shelf", caps: "🍄 The three great glowcaps", wheel: "☸️ The great ship's wheel", telescope: "🔭 The brass telescope", panel: "🪞 The painted panel", fountain: "⛲ The fountain and its statues" }[S.prop] || S.icon + " Something here"; }
var BDL_SECRETS = {
underdark: [
{ id: "vault", room: "The Scrying Study", clueRoom: "The Library of Old Ylmarr", prop: "shelf", icon: "📕",
clue: "A note in a Matron's hand, tucked in a book: \"What the Hollow Star keeps, it keeps behind the seventh book of the scrying shelf, the one bound in silver that is never read.\"",
ask: "The scrying shelf. Which book do you pull?", opts: ["The first book, bound in black", "The seventh book, bound in silver", "The last book, bound in red", "The thickest book, bound in spider silk"], ans: 1,
name: "The Shadow Vault", open: "The seventh book tilts with a click. The whole shelf swings inward on silent hinges, and cold air rises from a stair going down.",
look: "vault" },
{ id: "garden", room: "The Glowcap Conservatory", clueRoom: "The Matron's Parlour", prop: "caps", icon: "🍄",
clue: "Carved round the parlour hearth: \"Teal for the deep, violet for the dark, white for the star. In that order, the stone will lift.\"",
ask: "Three great glowcaps stand here, teal, violet and white. Which order do you touch them in?", opts: ["White, violet, teal", "Violet, teal, white", "Teal, violet, white", "Teal, white, violet"], ans: 2,
name: "The Sealed Moon Garden", open: "The third cap brightens softly. A silk lift lowers from a hidden shaft in the ceiling and carries you up to a garden no one has seen for a hundred years.",
look: "moongarden" }
],
verne: [
{ id: "dock", room: "The Chart Room", clueRoom: "The Library of the Extraordinary Voyages", prop: "wheel", icon: "☸️",
clue: "The last line in the captain's log on the library desk: \"Mobilis in mobili. When the wheel is set south-south-west, the sea will let you in.\"",
ask: "The great ship's wheel of the Chart Room. Which heading do you set?", opts: ["North by east", "South-south-west", "Due west", "East-north-east"], ans: 1,
name: "The Submarine Dock", open: "The wheel turns with a deep clank. Behind the chart cabinet a hatch rolls open onto an iron stair, and you smell the sea.",
look: "dock" },
{ id: "strong", room: "The Observatory", clueRoom: "The Captain's Cabin", prop: "telescope", icon: "🔭",
clue: "Pencilled on the cabin's star map: \"The Southern Cross points to the chest. Look there, not at the Pole.\"",
ask: "The brass telescope. Where do you turn it?", opts: ["The Pole Star", "The Southern Cross", "The Moon", "The Plough"], ans: 1,
name: "The Captain's Strongroom", open: "As the telescope comes round to the Southern Cross, the floor plate under your feet sinks slowly into a brass-lined strongroom.",
look: "strong" }
],
davinci: [
{ id: "gears", room: "The Painter's Studio", clueRoom: "The Library of Notebooks", prop: "panel", icon: "🪞",
clue: "A notebook on the library desk, in mirror-writing that you read in the glass beside it: \"The panel of the studio opens to the word the city of the river says backwards: ONRA.\"",
ask: "A painted panel, with letters set into its frame. Which word do you spell?", opts: ["ROMA", "ARNO", "AMOR", "ONRA"], ans: 1,
name: "The Gear Room", open: "The letters sink one by one. The panel slides aside with a sound of wooden wheels, and behind it the gears of the house are turning.",
look: "gears" },
{ id: "codex", room: "The Garden Court", clueRoom: "The Room of Riddles", prop: "fountain", icon: "⛲",
clue: "A riddle framed on the wall: \"Three stand round the water. Turn all three to face it, and the water will go down to show you the way.\"",
ask: "The fountain and its three small statues. What do you do?", opts: ["Turn all three to face the fountain", "Turn all three away", "Drink from the fountain", "Throw in a coin"], ans: 0,
name: "The Codex Cellar", open: "As the third statue turns, the fountain drains with a long gurgle and its basin sinks into steps going down into a candlelit cellar.",
look: "codex" }
]
};
var BDL_CANVAS = {};
function bdlCanvasTex(key, draw, w, h) { return __ZC(362, 31, this, arguments, new.target); }
function bdlRand(seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s & 0xffff) / 0x10000; }; }
function bdlChart(n) { return __ZC(362, 32, this, arguments, new.target); }
function bdlFresco(n) { return __ZC(362, 33, this, arguments, new.target); }
function bdlWeb(n) { return __ZC(362, 34, this, arguments, new.target); }
var BDL_UD = { th: null, floors: null, vault: null, garden: null };
function bdlUdTheme() { return __ZC(362, 35, this, arguments, new.target); }
(function () {
if (typeof udsBuilding !== "function" || typeof udxGo !== "function")
return;
var col = 0xB89AF8, sec = function (id) { return bdlSecretOf("underdark", id); };
var clue = function (id) { return function () { bdlClue(sec(id)); }; }, prop = function (id) { return function () { bdlAsk(sec(id)); }; };
var th = {};
["wall", "floor", "hallFloor", "ceil", "trim", "stair", "glow", "signBg", "signFg"].forEach(function (k) { Object.defineProperty(th, k, { enumerable: true, get: function () { return bdlUdTheme()[k]; } }); });
BDL_UD.floors = udsBuilding({ key: "bdl_ud", name: "The House of the Hollow Star", th: th, col: col, sig: "star", stairName: "The stair of the spire",
floors: [
{ label: "The Hall of the Hollow Star", sub: "the library, the scrying study, the parlour, the conservatory", R: 16, H: 14, rotName: "the Hall of the Hollow Star", wayName: "the Silk Gallery", outName: "The great door",
rooms: [{ n: "The Library of Old Ylmarr", t: "library", w: 10, d: 10, fn: clue("vault"), verb: "read the note in the open book" },
{ n: "The Scrying Study", t: "scrying", w: 9, d: 9, fn: prop("vault"), verb: "look at the scrying shelf" },
{ n: "The Matron's Parlour", t: "sitting", w: 9, d: 9, fn: clue("garden"), verb: "read the words round the hearth" },
{ n: "The Glowcap Conservatory", t: "garden", w: 10, d: 10, fn: prop("garden"), verb: "touch the three great glowcaps" },
{ n: "The Echo Room", t: "music", w: 9, d: 9 },
{ n: "The Kitchen of the Deep", t: "kitchen", w: 9, d: 9 }],
grand: { n: "The Feast Hall", t: "dining", w: 16, d: 16, h: 8 },
centre: function (A, F) {
udxF(A, "rug", F.ox, F.y + 0.02, F.oz, 0, { solid: false, s: 2.2 });
udsHeartCrystal(A, F.ox, F.y, F.oz, 1.2, col);
udxSolidR(A, F.ox, F.oz, 1.6);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
udxF(A, "candles", F.ox + Math.cos(a) * 4.6, F.y, F.oz + Math.sin(a) * 4.6, 0, { solid: false });
}
},
after: function (A, F) {
var xx = F.ox - (F.R - 0.3);
udxTalk(A, { x: xx + 1.4, z: F.oz, r: 2.6, name: "The great door", verb: "go out onto the terrace", fn: function () { bdlLeave(); } });
} },
{ label: "The Upper Spire", sub: "the bedchambers, the bathing grotto, the ballroom", R: 15, H: 12, rotName: "the Upper Spire", wayName: "the Night Corridor",
rooms: [{ n: "The Starless Bedchamber", t: "grandbed", w: 10, d: 10 }, { n: "The Robing Room", t: "robing", w: 8, d: 8 }, { n: "The Bathing Grotto", t: "bath", w: 9, d: 9 },
{ n: "The Violet Guest Room", t: "bedroom", w: 8, d: 8 }, { n: "The Little Spire Room", t: "nursery", w: 8, d: 8 }, { n: "The Blade Practice Room", t: "sparring", w: 9, d: 9 }],
grand: { n: "The Spider-Silk Ballroom", t: "ballroom", w: 16, d: 16, h: 8 },
centre: function (A, F) { udxF(A, "rug", F.ox, F.y + 0.02, F.oz, 0, { solid: false, s: 2 }); udxF(A, "chandelier", F.ox, F.y + F.H - 1.8, F.oz, 0, { solid: false }); udsWeb(A.g, F.ox, F.y + F.H - 1, F.oz, F.R * 0.6, col); } },
{ label: "The Roost", sub: "the wyvern roost, the armoury, the chart room, the shrine", R: 14, H: 12, rotName: "the Roost", wayName: "the Wing Walk",
rooms: [{ n: "The Wyvern Roost", t: "stable", w: 11, d: 11 }, { n: "The Armoury of the Spire", t: "armoury", w: 9, d: 9 }, { n: "The Chart of Every Tunnel", t: "chartroom", w: 9, d: 9 },
{ n: "The Shrine of the Hollow Star", t: "shrine", w: 9, d: 9 }, { n: "The Crystal Room", t: "crystal", w: 8, d: 8 }],
grand: { n: "The Star Chamber", t: "council", w: 14, d: 14, h: 8 },
centre: function (A, F) { udxF(A, "crystalcluster", F.ox, F.y, F.oz, 0, { s: 1.8 }); udxSolidR(A, F.ox, F.oz, 1.6); udxGlow(A.g, col, 5, 0.5, F.ox, F.y + 2, F.oz); } }
] });
function hidden(id, name, rooms, grand, centre) {
var S = sec(id), F = BDL_FEATS[S.look];
return udsBuilding({ key: "bdl_ud" + id, name: name, th: th, col: col, sig: "star",
floors: [{ label: name, R: 11, H: 9, rotName: name, wayName: "the way in", outName: "The stair back up", rooms: rooms, grand: Object.assign({ fn: function () { bdlFeat(F); }, verb: "go to " + F.name }, grand), centre: centre,
after: function (A, Fl) { var xx = Fl.ox - (Fl.R - 0.3); udxTalk(A, { x: xx + 1.4, z: Fl.oz, r: 2.6, name: "The stair back up", verb: "climb back up", fn: function () { BDL.secret = S; bdlBackUp(); } }); } }] })[0];
}
BDL_UD.vault = hidden("vault", "The Shadow Vault", [{ n: "The Treasury of the Hollow Star", t: "vault", w: 9, d: 9 }, { n: "The Silver Archive", t: "library", w: 9, d: 9 }], { n: "The Basin of Night", t: "shrine", w: 12, d: 12, h: 7 }, function (A, F) {
udxCyl(1.3, 1.5, 0.9, udxMat(0x2E2838, "stone"), F.ox, F.y + 0.45, F.oz, A.g, 24);
var w = udxCyl(1.2, 1.2, 0.05, udxMat(0x6A4AC8, null, { basic: 1 }), F.ox, F.y + 0.92, F.oz, A.g, 24);
w.userData.keep = 1;
udxSolidR(A, F.ox, F.oz, 1.7);
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2;
udxF(A, "crystalcluster", F.ox + Math.cos(a) * 6.5, F.y, F.oz + Math.sin(a) * 6.5, a, { s: 0.8 });
}
udxGlow(A.g, 0xB8A0FF, 4, 0.5, F.ox, F.y + 2, F.oz);
});
BDL_UD.garden = hidden("garden", "The Sealed Moon Garden", [{ n: "The Moth Garden", t: "garden", w: 10, d: 10 }, { n: "The Glowcap Beds", t: "garden", w: 10, d: 10 }], { n: "The Moonwell", t: "crystal", w: 12, d: 12, h: 7 }, function (A, F) {
udxF(A, "cavepool", F.ox, F.y, F.oz, 0, { s: 1.3 });
udxSolidR(A, F.ox, F.oz, 2.2);
udxGlow(A.g, 0xE8E8FF, 6, 0.55, F.ox, F.y + F.H - 2, F.oz);
for (var m = 0; m < 24; m++) {
var a = m / 24 * 6.283, rr = 5 + (m % 3) * 1.6, h = 0.4 + (m % 4) * 0.35, c = [0x4AC8B8, 0x8A5AE8, 0xE8E4F8][m % 3];
udxCyl(0.07, 0.11, h, udxMat(0xD8D0E0), F.ox + Math.cos(a) * rr, F.y + h / 2, F.oz + Math.sin(a) * rr, A.g, 6);
var s = new THREE.Mesh(new THREE.SphereGeometry(0.3 + (m % 3) * 0.12, 10, 6), udxMat(c, null, { e: c, ei: 0.55 }));
s.scale.y = 0.45;
s.position.set(F.ox + Math.cos(a) * rr, F.y + h, F.oz + Math.sin(a) * rr);
A.g.add(s);
}
});
BDL_IN.underdark = {
enter: function (h) {
var A = BDL_UD.floors[0];
udxGo(A.key, A.inAt[0], A.inAt[1], A.inAt[2], "🕸️ <b>" + bdlEsc(h.D.house) + "</b>" + (h.owner === bdlMe() ? ", your manor." : ", the manor of " + bdlEsc(h.name || "a dreamer") + (bdlKeeper() ? " (you hold the Keeper's key)." : " (you are their guest).")) +
" Three round floors of halls and rooms (the stair of the spire is beside you), and somewhere in them two secrets.");
},
out: function (h, x, z, yw, msg) { udxGo("cavern", x, z, yw); bdlTo(x, z, h.door.y, yw, msg); UDX.checkAt = 0; try {
udxCull(true);
}
catch (e) { } },
toSecret: function (S, msg) { var A = S.id === "vault" ? BDL_UD.vault : BDL_UD.garden; udxGo(A.key, A.inAt[0], A.inAt[1], A.inAt[2], msg); },
back: function (S, msg) {
var A = BDL_UD.floors[0], r = (A.F && A.F.rooms || []).filter(function (q) { return q.n === S.room; })[0];
if (r && r.c)
udxGo(A.key, r.c.x, r.c.z, r.c.ry, msg);
else
udxGo(A.key, A.inAt[0], A.inAt[1], A.inAt[2], msg);
}
};
})();
function bdlVRoom(grp, x0, z0, x1, z1, y, h, o) { return __ZC(362, 36, this, arguments, new.target); }
function bdlVChart(grp, x, y, z, ry, n, w, h) { return __ZC(362, 37, this, arguments, new.target); }
function bdlDeepTex() { return __ZC(362, 38, this, arguments, new.target); }
function bdlRoseTex() { return __ZC(362, 39, this, arguments, new.target); }
(function () {
if (typeof vrnInDef !== "function")
return;
var D = function (id) { return bdlSecretOf("verne", id); };
var I = vrnInDef("bd_light", { name: "The Engineer's Lighthouse", hw: 62, hd: 44, arrive: [0, 30, Math.PI], out: [0, 0, 0, ""],
build: function (grp, I) {
var X = I.x, Z = I.z, lite = VRN.lite;
var oak = bdlS("oak", 0xE0C8A8, 1.6), plank = bdlS("planks", 0xC8A888, 1.4), panel = bdlS("planks", 0x8A5A3A, 1.2), cream = bdlS("stucco", 0xF0E4CC, 3), lime = bdlS("limestone", 0xF0E8DC, 3), iron = bdlS("iron", 0x9AA0A8, 2), checker = bdlS("checker", 0xD8D2C8, 2.2), damask = bdlS("damask", 0xB06058, 1.2), quilt = bdlS("quilt", 0xA8B8D8, 0.8), velvet = bdlS("velvet", 0xA05A6A, 0.8), brass = bdlMetal(0xE0B860), dkwood = bdlS("planks", 0x5A3A26, 1.2), glass = bdlM(0xCFE6F2, null, 0, { op: 0.3, shine: 100 });
var H0 = 5.2, Y1 = 5.6, H1 = 4.6;
bdlVRoom(grp, X - 10, Z + 18, X + 10, Z + 34, 0, H0, { wall: cream, floor: checker, panel: panel, gaps: { s: [[X, 2.6]], w: [[Z + 26, 2.4]], e: [[Z + 26, 2.4]], n: [[X, 3.2]] } });
var rose = new THREE.Mesh(new THREE.CircleGeometry(4.2, 48), new THREE.MeshBasicMaterial({ map: bdlRoseTex().map, transparent: true, depthWrite: false }));
rose.rotation.x = -Math.PI / 2;
rose.position.set(X, 0.03, Z + 26);
grp.add(rose);
var sd = new THREE.Group();
sd.position.set(X, 0, Z + 33.6);
grp.add(sd);
vrnBoxM(2.6, 3.2, 0.12, bdlS("planks", 0x2A3A5A, 1), 0, 1.6, 0, sd);
vrnBoxM(3.0, 0.25, 0.2, brass, 0, 3.3, 0, sd);
vrnSpot(X, Z + 31.6, 2.6, "The front door", "go out", function () { bdlLeave(); }, 0);
for (var s = 0; s < 10; s++)
vrnBoxM(2.4, 0.18, 0.5, oak, X + 7, 0.09 + s * 0.55, Z + 31 - s * 0.5, grp);
vrnBoxM(0.08, 1, 5.4, brass, X + 5.75, 2.9, Z + 28.6, grp).rotation.x = -0.84;
vrnSolid({ x: X + 7, z: Z + 28.5, hw: 1.25, hd: 2.6, h: 5 });
vrnSpot(X + 5, Z + 31, 2.4, "The stair", "go up to the upper deck", function () { vrnMove(X + 5, Z + 29, Math.PI, "⬆️ <b>The upper deck.</b> The captain's cabin, the officers' cabins, the Gallery of Instruments.", Y1); }, 0);
[[-6, 22], [6, 22]].forEach(function (p) { vrnTable(grp, X + p[0], Z + p[1], 1.6, 0.8, 0, 0x5A3A22); wSph(0.45, vrnC(0x2A5A8A), X + p[0], 1.4, Z + p[1], grp, 16); bdlWT(0.5, 0.03, brass, X + p[0], 1.4, Z + p[1], grp, 24); });
bdlVChart(grp, X - 4, 2.6, Z + 18.45, 0, 1, 3, 2);
bdlVChart(grp, X + 4, 2.6, Z + 18.45, 0, 2, 3, 2);
bdlVRoom(grp, X - 32, Z + 18, X - 10, Z + 34, 0, H0, { wall: panel, floor: oak, name: "The Chart Room", signAt: [X - 10.45, Z + 26, -Math.PI / 2], gaps: { e: [[Z + 26, 2.4]], n: [[X - 21, 2.4]] } });
vrnTable(grp, X - 24, Z + 26, 4, 2, 0, 0x4A2E1E);
vrnTable(grp, X - 17, Z + 23, 2.6, 1.6, 0, 0x4A2E1E);
wBox(3.6, 0.02, 1.8, bdlChart(5), X - 24, 0.87, Z + 26, grp);
wBox(2.4, 0.02, 1.4, bdlChart(6), X - 17, 0.87, Z + 23, grp);
for (var c = 0; c < 4; c++) {
vrnBoxM(1.8, 1.1, 0.8, dkwood, X - 30 + c * 2.1, 0.55, Z + 33.2, grp);
vrnSolid({ x: X - 30 + c * 2.1, z: Z + 33.2, hw: 0.9, hd: 0.4, h: 1.1 });
}
[0, 1, 2].forEach(function (i) { bdlVChart(grp, X - 31.6, 2.6, Z + 21 + i * 4.5, Math.PI / 2, 10 + i, 3.2, 2.2); });
var wh = new THREE.Group();
wh.position.set(X - 22, 0, Z + 20);
grp.add(wh);
vrnBoxM(0.5, 1.3, 0.5, dkwood, 0, 0.65, 0, wh);
var whr = bdlWT(0.9, 0.07, dkwood, 0, 1.7, 0.3, wh, 24);
for (var k = 0; k < 8; k++) {
var sp = wCyl(0.035, 0.035, 2.2, dkwood, 0, 1.7, 0.3, wh, 5);
sp.rotation.z = k / 8 * Math.PI;
}
wCyl(0.14, 0.14, 0.3, brass, 0, 1.7, 0.3, wh, 10).rotation.x = Math.PI / 2;
vrnSolid({ x: X - 22, z: Z + 20, r: 0.6 });
vrnSpot(X - 22, Z + 21.6, 2.2, bdlPropName(D("dock")), "turn the wheel", function () { bdlAsk(D("dock")); }, 0);
bdlVRoom(grp, X + 10, Z + 18, X + 32, Z + 34, 0, H0, { wall: panel, floor: oak, name: "The Library of the Extraordinary Voyages", signAt: [X + 10.45, Z + 26, Math.PI / 2], gaps: { w: [[Z + 26, 2.4]], n: [[X + 21, 2.4]] } });
vrnShelf(grp, X + 21, Z + 18.6, 20, 0, 4.6);
vrnShelf(grp, X + 31.4, Z + 26, 14, -Math.PI / 2, 4.6);
vrnSolid({ x: X + 21, z: Z + 18.6, hw: 10, hd: 0.4, h: 5 });
vrnSolid({ x: X + 31.4, z: Z + 26, hw: 0.4, hd: 7, h: 5 });
vrnRug(grp, X + 21, Z + 27, 8, 6, 0x6A2A2A);
vrnTable(grp, X + 20, Z + 27, 3, 1.4, 0, 0x5A3A22);
vrnChair(grp, X + 20, Z + 28.4, Math.PI, 0x6A2A22);
vrnChair(grp, X + 18, Z + 25.4, 0, 0x6A2A22);
var gb = new THREE.Group();
gb.position.set(X + 27, 0, Z + 30);
grp.add(gb);
wCyl(0.25, 0.4, 1, dkwood, 0, 0.5, 0, gb, 10);
wSph(0.7, new THREE.MeshLambertMaterial({ map: vrnGlobeTex() }), 0, 1.75, 0, gb, 20);
bdlWT(0.78, 0.04, brass, 0, 1.75, 0, gb, 24);
vrnSolid({ x: X + 27, z: Z + 30, r: 0.8 });
var lec = new THREE.Group();
lec.position.set(X + 14, 0, Z + 30);
grp.add(lec);
wCyl(0.08, 0.12, 1, brass, 0, 0.5, 0, lec, 8);
var top = wBox(0.8, 0.06, 0.55, dkwood, 0, 1.05, 0, lec);
top.rotation.x = -0.35;
var pg = wBox(0.65, 0.02, 0.42, vrnC(0xF2E8D0), 0, 1.1, 0.01, lec);
pg.rotation.x = -0.35;
vrnSpot(X + 14, Z + 30, 2, "📜 The captain's log, open on its stand", "read it", function () { bdlClue(D("dock")); }, 0);
bdlVRoom(grp, X - 12, Z - 6, X + 12, Z + 18, 0, H0, { wall: damask, floor: oak, panel: panel, name: "The Captain's Saloon", signAt: [X, Z + 17.55, Math.PI], gaps: { s: [[X, 3.2]], w: [[Z + 6, 2.4]], e: [[Z + 6, 2.4]] } });
var deep = new THREE.Mesh(new THREE.PlaneGeometry(14, 4.2), new THREE.MeshBasicMaterial({ map: bdlDeepTex().map }));
deep.position.set(X, 3, Z - 5.55);
grp.add(deep);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.08, 6, 48), brass);
rim.scale.set(7.2, 2.25, 1);
rim.position.set(X, 3, Z - 5.5);
grp.add(rim);
for (var b = -3; b <= 3; b++)
vrnBoxM(0.08, 4.3, 0.08, brass, X + b * 2, 3, Z - 5.45, grp);
var og = new THREE.Group();
og.position.set(X - 9, 0, Z + 8);
og.rotation.y = Math.PI / 2;
grp.add(og);
vrnBoxM(3.2, 1.2, 1.2, dkwood, 0, 0.6, 0, og);
for (var o = 0; o < 11; o++) {
var ph = 1.4 + Math.sin(o / 10 * Math.PI) * 2.2;
wCyl(0.09, 0.09, ph, brass, -1.4 + o * 0.28, 1.2 + ph / 2, -0.3, og, 8);
}
vrnSolid({ x: X - 9, z: Z + 8, hw: 0.7, hd: 1.7, h: 4 });
[[-5, 10], [5, 10]].forEach(function (p) { var sf = new THREE.Group(); sf.position.set(X + p[0], 0, Z + p[1]); grp.add(sf); vrnBoxM(3, 0.5, 1, velvet, 0, 0.35, 0, sf); vrnBoxM(3, 0.9, 0.25, velvet, 0, 0.8, 0.45, sf); vrnSolid({ x: X + p[0], z: Z + p[1], hw: 1.5, hd: 0.6, h: 1 }); });
vrnRug(grp, X, Z + 5, 10, 7, 0x5A2A3A);
vrnTable(grp, X, Z + 5, 2.4, 1.2, 0, 0x4A2E1E);
[[9, 0], [9, 4], [9, 12]].forEach(function (p) { vrnBoxM(1.4, 1, 0.8, dkwood, X + p[0], 0.5, Z + p[1], grp); vrnBoxM(1.4, 0.9, 0.8, glass, X + p[0], 1.45, Z + p[1], grp); for (var sh = 0; sh < 4; sh++)
wSph(0.12, vrnC([0xE8C8B0, 0xD8A090, 0xF0E0D0, 0xC89A7A][sh]), X + p[0] - 0.45 + sh * 0.3, 1.15, Z + p[1], grp, 8); vrnSolid({ x: X + p[0], z: Z + p[1], hw: 0.7, hd: 0.4, h: 2 }); });
bdlVRoom(grp, X - 32, Z - 6, X - 12, Z + 18, 0, H0, { wall: lime, floor: bdlS("darktile", 0xC8C0B0, 1.4), name: "The Galley and the Mess", signAt: [X - 21, Z + 17.55, Math.PI], gaps: { e: [[Z + 6, 2.4]], s: [[X - 21, 2.4]] } });
vrnTable(grp, X - 22, Z + 6, 6, 1.4, 0, 0x6A4A2E);
for (var m = 0; m < 5; m++) {
vrnChair(grp, X - 24.4 + m * 1.2, Z + 4.8, 0, 0x4A3A2A);
vrnChair(grp, X - 24.4 + m * 1.2, Z + 7.2, Math.PI, 0x4A3A2A);
}
vrnBoxM(5, 1, 1, lime, X - 28, 0.5, Z - 5, grp);
vrnBoxM(1.6, 1.5, 1.1, iron, X - 24, 0.75, Z - 5, grp);
wCyl(0.2, 0.2, 4, iron, X - 24, 3, Z - 5.2, grp, 8);
vrnSolid({ x: X - 26, z: Z - 5, hw: 3.4, hd: 0.7, h: 1.6 });
for (var pn = 0; pn < 6; pn++)
wCyl(0.18, 0.2, 0.3, brass, X - 29.5 + pn * 0.6, 2.2, Z - 5.6, grp, 10);
bdlVRoom(grp, X + 12, Z - 6, X + 32, Z + 18, 0, H0, { wall: iron, floor: bdlS("iron", 0x8A9098, 1.5), name: "The Engine Room", signAt: [X + 21, Z + 17.55, Math.PI], gaps: { w: [[Z + 6, 2.4]], s: [[X + 21, 2.4]] } });
[[18, 2], [26, 2]].forEach(function (p) {
var dy = new THREE.Group();
dy.position.set(X + p[0], 0, Z + p[1]);
grp.add(dy);
vrnBoxM(3.6, 0.6, 2, iron, 0, 0.3, 0, dy);
var cy = wCyl(1, 1, 2.6, vrnC(0x2A4A3A), 0, 1.6, 0, dy, 20);
cy.rotation.z = Math.PI / 2;
[-1.35, 1.35].forEach(function (x) { bdlWT(1.02, 0.08, brass, x, 1.6, 0, dy, 24).rotation.y = Math.PI / 2; });
var wl = wCyl(1.1, 1.1, 0.2, iron, 2, 1.6, 0, dy, 24);
wl.rotation.z = Math.PI / 2;
vrnSolid({ x: X + p[0], z: Z + p[1], hw: 2.2, hd: 1.2, h: 3 });
});
for (var pp = 0; pp < 4; pp++) {
var pi = wCyl(0.12, 0.12, 20, brass, X + 31.5, 3.5 + pp * 0.4, Z + 6, grp, 8);
pi.rotation.x = Math.PI / 2;
}
for (var gg = 0; gg < 5; gg++) {
wCyl(0.25, 0.25, 0.06, brass, X + 14 + gg * 1.2, 2.4, Z - 5.6, grp, 16).rotation.x = Math.PI / 2;
wCyl(0.2, 0.2, 0.07, vrnC(0xF2EEE2), X + 14 + gg * 1.2, 2.4, Z - 5.55, grp, 16).rotation.x = Math.PI / 2;
}
vrnInFloor(grp, X, Z + 14, 64, 40, Y1 - 0.02, oak);
bdlVRoom(grp, X - 10, Z + 18, X + 10, Z + 34, Y1, H1, { wall: cream, floor: oak, panel: panel, lamps: true, gaps: { w: [[Z + 26, 2.4]], e: [[Z + 26, 2.4]], n: [[X, 3]] } });
vrnSpot(X + 5, Z + 29, 2.4, "The stair", "go down to the Compass Hall", function () { vrnMove(X + 5, Z + 31, 0, "⬇️ <b>The Compass Hall.</b>", 0); }, Y1);
vrnSpot(X - 6, Z + 20, 2.4, "The tower stair", "climb to the lantern", function () { vrnMove(X, Z - 14, Math.PI, "🔆 <b>The lantern room.</b> Round you, glass; in the middle the great lens, its rings of glass turning slowly round the lamp. The whole coast below.", 16); }, Y1);
wCyl(0.6, 0.7, H1, brass, X - 7, Y1 + H1 / 2, Z + 20.5, grp, 10);
for (var ts = 0; ts < 8; ts++) {
var ta = ts * 0.7;
vrnBoxM(1.4, 0.1, 0.5, oak, X - 7 + Math.cos(ta) * 1.1, Y1 + 0.3 + ts * 0.55, Z + 20.5 + Math.sin(ta) * 1.1, grp).rotation.y = -ta;
}
vrnSolid({ x: X - 7, z: Z + 20.5, r: 1.6, h: 6, b: Y1 });
bdlVRoom(grp, X - 32, Z + 18, X - 10, Z + 34, Y1, H1, { wall: panel, floor: oak, name: "The Captain's Cabin", signAt: [X - 10.45, Z + 26, -Math.PI / 2], gaps: { e: [[Z + 26, 2.4]] } });
var bed = new THREE.Group();
bed.position.set(X - 28, Y1, Z + 30);
grp.add(bed);
vrnBoxM(2.4, 0.6, 3.2, dkwood, 0, 0.3, 0, bed);
vrnBoxM(2.2, 0.25, 3, quilt, 0, 0.72, 0, bed);
vrnBoxM(2.4, 1.4, 0.15, dkwood, 0, 1, 1.55, bed);
vrnSolid({ x: X - 28, z: Z + 30, hw: 1.2, hd: 1.6, h: 1.2, b: Y1 });
var dk = new THREE.Group();
dk.position.set(X - 20, Y1, Z + 21);
grp.add(dk);
vrnBoxM(2.6, 0.1, 1.2, dkwood, 0, 0.85, 0, dk);
vrnBoxM(0.6, 0.8, 1.1, dkwood, -1, 0.4, 0, dk);
vrnBoxM(0.6, 0.8, 1.1, dkwood, 1, 0.4, 0, dk);
vrnSolid({ x: X - 20, z: Z + 21, hw: 1.3, hd: 0.6, h: 1, b: Y1 });
var star = bdlCanvasTex("vstars", function (x, W, H) {
var R = bdlRand(5);
x.fillStyle = "#0E1A2E";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8E4D0";
for (var i = 0; i < 220; i++) {
x.globalAlpha = 0.3 + R() * 0.7;
x.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
}
x.globalAlpha = 1;
var cr = [[0.62, 0.3], [0.66, 0.52], [0.56, 0.44], [0.72, 0.42]];
x.strokeStyle = "#C8A04A";
x.lineWidth = 2;
x.beginPath();
x.moveTo(cr[0][0] * W, cr[0][1] * H);
x.lineTo(cr[1][0] * W, cr[1][1] * H);
x.moveTo(cr[2][0] * W, cr[2][1] * H);
x.lineTo(cr[3][0] * W, cr[3][1] * H);
x.stroke();
x.fillStyle = "#FFE8A0";
cr.forEach(function (p) { x.beginPath(); x.arc(p[0] * W, p[1] * H, 5, 0, 7); x.fill(); });
x.font = "italic 20px Georgia";
x.fillText("the Southern Cross", W * 0.5, H * 0.68);
x.strokeStyle = "#8A6A3A";
x.lineWidth = 10;
x.strokeRect(5, 5, W - 10, H - 10);
}, 512, 384);
var sm = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.9), star);
sm.position.set(X - 31.55, Y1 + 2.4, Z + 26);
sm.rotation.y = Math.PI / 2;
grp.add(sm);
vrnSpot(X - 30, Z + 26, 2.4, "🗺️ The captain's star map", "look closely", function () { bdlClue(D("strong")); }, Y1);
bdlVRoom(grp, X + 10, Z + 18, X + 32, Z + 34, Y1, H1, { wall: bdlS("marble", 0xE8E4DC, 2), floor: bdlS("checker", 0xE8E4DC, 1.2), name: "The Bath of Warm Sea Water", signAt: [X + 10.45, Z + 26, Math.PI / 2], gaps: { w: [[Z + 26, 2.4]] } });
var tub = new THREE.Group();
tub.position.set(X + 24, Y1, Z + 27);
grp.add(tub);
vrnBoxM(3.2, 0.8, 1.8, bdlS("marble", 0xF0ECE4, 1.5), 0, 0.4, 0, tub);
vrnBoxM(2.9, 0.06, 1.5, bdlM(0x6AA8C8, null, 0, { op: 0.8, shine: 90 }), 0, 0.7, 0, tub);
vrnSolid({ x: X + 24, z: Z + 27, hw: 1.6, hd: 0.9, h: 1, b: Y1 });
bdlVRoom(grp, X - 32, Z - 6, X - 12, Z + 18, Y1, H1, { wall: panel, floor: oak, name: "The Officers' Cabins", signAt: [X - 21, Z + 17.55, Math.PI], gaps: { s: [[X - 21, 2.4]] } });
[-28, -22, -16].forEach(function (x) { var bb = new THREE.Group(); bb.position.set(X + x, Y1, Z - 3); grp.add(bb); vrnBoxM(1.4, 0.5, 2.4, dkwood, 0, 0.25, 0, bb); vrnBoxM(1.3, 0.2, 2.3, quilt, 0, 0.6, 0, bb); vrnSolid({ x: X + x, z: Z - 3, hw: 0.7, hd: 1.2, h: 1, b: Y1 }); });
bdlVRoom(grp, X - 12, Z - 6, X + 12, Z + 18, Y1, H1, { wall: cream, floor: oak, panel: panel, name: "The Gallery of Instruments", signAt: [X, Z + 17.55, Math.PI], gaps: { s: [[X, 3]] } });
[[-8, 0, "sextant"], [-3, 0, "chronometer"], [3, 0, "barometer"], [8, 0, "theodolite"]].forEach(function (p, i) {
var cs = new THREE.Group();
cs.position.set(X + p[0], Y1, Z + p[1]);
grp.add(cs);
vrnBoxM(1.6, 1, 1, dkwood, 0, 0.5, 0, cs);
vrnBoxM(1.6, 0.8, 1, glass, 0, 1.4, 0, cs);
bdlWT(0.3, 0.03, brass, 0, 1.35, 0, cs, 20);
wCyl(0.05, 0.05, 0.5, brass, 0, 1.3, 0, cs, 6);
vrnSolid({ x: X + p[0], z: Z + p[1], hw: 0.8, hd: 0.5, h: 2, b: Y1 });
});
bdlVRoom(grp, X + 12, Z - 6, X + 32, Z + 18, Y1, H1, { wall: panel, floor: oak, name: "The Engineer's Cabin", signAt: [X + 21, Z + 17.55, Math.PI], gaps: { s: [[X + 21, 2.4]] } });
vrnTable(grp, X + 22, Z + 4, 3, 1.4, 0, 0x5A3A22);
wBox(2.6, 0.02, 1.2, bdlChart(14), X + 22, Y1 + 0.87, Z + 4, grp).position.y = Y1 + 0.87;
var LY = 16, LX = X, LZ = Z - 16;
wCyl(7, 7, 0.3, brass, LX, LY - 0.15, LZ, grp, lite ? 20 : 40);
vrnFloor(LX, LZ, 0, 0, LY, { r: 6.6, inside: 1 });
wCyl(7, 7, 4.5, glass, LX, LY + 2.25, LZ, grp, lite ? 16 : 32).material = glass;
for (var a = 0; a < 12; a++) {
var aa = a / 12 * Math.PI * 2;
wCyl(0.06, 0.06, 4.5, brass, LX + Math.cos(aa) * 7, LY + 2.25, LZ + Math.sin(aa) * 7, grp, 5);
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(7, lite ? 16 : 32, 8, 0, Math.PI * 2, 0, Math.PI / 2), bdlMetal(0x5A6A5A, "iron"));
dome.material = dome.material.clone();
dome.material.side = THREE.DoubleSide;
dome.scale.y = 0.5;
dome.position.set(LX, LY + 4.5, LZ);
grp.add(dome);
for (var ln = 0; ln < 6; ln++)
bdlWT(1.4 - Math.abs(ln - 2.5) * 0.15, 0.12, bdlGlow(0xFFE8B0, 0.4), LX, LY + 1.2 + ln * 0.38, LZ, grp, 24).rotation.x = Math.PI / 2;
wSph(0.45, bdlGlow(0xFFF0C8, 0.85), LX, LY + 2.2, LZ, grp, 16);
var lg = wGlow(0xFFE0A0, 5, 0.18);
lg.position.set(LX, LY + 2.2, LZ);
grp.add(lg);
vrnSolid({ x: LX, z: LZ, r: 1.8, h: 4, b: LY });
var sea = new THREE.Mesh(new THREE.CircleGeometry(60, lite ? 24 : 48), bdlM(0x2A6A8A, null, 0, { shine: 90 }));
sea.rotation.x = -Math.PI / 2;
sea.position.set(LX, LY - 20, LZ);
grp.add(sea);
for (var w = 0; w < 12; w++) {
var wa = w / 12 * Math.PI * 2;
vrnSolid({ x: LX + Math.cos(wa) * 7, z: LZ + Math.sin(wa) * 7, r: 0.6, h: 5, b: LY });
}
var tl = new THREE.Group();
tl.position.set(LX + 4.5, LY, LZ + 1);
grp.add(tl);
wCyl(0.05, 0.07, 1.3, brass, 0, 0.65, 0, tl, 6);
var tb = wCyl(0.1, 0.15, 1.9, brass, 0, 1.5, 0.2, tl, 12);
tb.rotation.x = 1.0;
vrnSolid({ x: LX + 4.5, z: LZ + 1, r: 0.5, h: 2, b: LY });
vrnSpot(LX + 4.5, LZ + 2.2, 2.2, bdlPropName(D("strong")), "turn it", function () { bdlAsk(D("strong")); }, LY);
vrnSpot(LX - 3, LZ + 3, 2.4, "The tower stair", "go down to the upper deck", function () { vrnMove(X - 6, Z + 21.5, 0, "⬇️ <b>The upper deck.</b>", Y1); }, LY);
var SX = X - 44, SZ = Z - 26;
bdlVRoom(grp, SX - 10, SZ - 12, SX + 10, SZ + 12, 0, 7, { wall: bdlS("strata", 0x8A8478, 3), floor: bdlS("iron", 0x7A8088, 1.5), lamps: true });
var pool = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), bdlM(0x1E5A7A, null, 0, { op: 0.88, shine: 100 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(SX + 3, 0.05, SZ - 2);
grp.add(pool);
vrnSolid({ x: SX + 3, z: SZ - 2, hw: 5, hd: 7, h: 3 });
var bs = wSph(1.5, brass, SX + 3, 1.6, SZ - 2, grp, lite ? 14 : 24);
for (var p = 0; p < 6; p++) {
var ppp = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), bdlGlow(0x8AC8E8, 0.9));
var pa = p / 6 * Math.PI * 2;
ppp.position.set(SX + 3 + Math.cos(pa) * 1.52, 1.8, SZ - 2 + Math.sin(pa) * 1.52);
ppp.lookAt(SX + 3 + Math.cos(pa) * 5, 1.8, SZ - 2 + Math.sin(pa) * 5);
grp.add(ppp);
}
wCyl(0.04, 0.04, 5, iron, SX + 3, 4.6, SZ - 2, grp, 4);
vrnSpot(SX - 2, SZ - 2, 2.6, "✨ The bathysphere", "climb in and dive", function () { bdlFeat(BDL_FEATS.dock); }, 0);
vrnSpot(SX, SZ + 10, 2.4, "↩️ The iron stair", "climb back up", function () { BDL.secret = D("dock"); bdlBackUp(); }, 0);
var TX = X + 44, TZ = Z - 26;
bdlVRoom(grp, TX - 8, TZ - 8, TX + 8, TZ + 8, 0, 4.6, { wall: bdlS("brass", 0xC8A060, 1.5), floor: oak, lamps: true });
[0, 1, 2].forEach(function (r) { bdlVChart(grp, TX - 5 + r * 5, 2.4, TZ - 7.55, 0, 20 + r, 2.4, 1.6); });
var ch = new THREE.Group();
ch.position.set(TX, 0, TZ - 2);
grp.add(ch);
vrnBoxM(2, 1, 1.1, dkwood, 0, 0.5, 0, ch);
vrnBoxM(2.04, 0.1, 1.14, brass, 0, 1, 0, ch);
vrnBoxM(2.04, 0.1, 1.14, brass, 0, 0.3, 0, ch);
vrnSolid({ x: TX, z: TZ - 2, hw: 1, hd: 0.6, h: 1.1 });
vrnSpot(TX, TZ - 0.4, 2.2, "✨ The captain's sea chest", "open it", function () { bdlFeat(BDL_FEATS.strong); }, 0);
vrnSpot(TX, TZ + 6, 2.4, "↩️ The floor plate", "rise back up", function () { BDL.secret = D("strong"); bdlBackUp(); }, 0);
} });
BDL_IN.verne = {
enter: function (h) { vrnInBuild(I); vrnMove(I.x, I.z + 30, 0, "🧭 <b>" + bdlEsc(h.D.house) + "</b>" + (h.owner === bdlMe() ? ", your lighthouse." : ", the lighthouse of " + bdlEsc(h.name || "a dreamer") + (bdlKeeper() ? " (you hold the Keeper's key)." : " (you are their guest).")) + " The Compass Hall: the chart room to the left, the library to the right, the saloon ahead, a stair up, and the tower above. Two secrets are hidden here.", 0); },
out: function (h, x, z, yw, msg) { vrnMove(x, z, yw, msg, h.door.y); },
toSecret: function (S, msg) { vrnInBuild(I); if (S.id === "dock")
vrnMove(I.x - 44, I.z - 17, Math.PI, msg, 0);
else
vrnMove(I.x + 44, I.z - 20, Math.PI, msg, 0); },
back: function (S, msg) { if (S.id === "dock")
vrnMove(I.x - 22, I.z + 22, Math.PI, msg, 0);
else
vrnMove(I.x + 3, I.z - 15, 0, msg, 16); }
};
})();
function bdlDRoom(grp, x0, z0, x1, z1, y, h, o) { return __ZC(362, 40, this, arguments, new.target); }
function bdlDChair(grp, x, y, z, ry, mat) { return __ZC(362, 41, this, arguments, new.target); }
function bdlDBed(grp, x, y, z, ry, cover) { return __ZC(362, 42, this, arguments, new.target); }
(function () {
if (typeof davInDef !== "function")
return;
var D = function (id) { return bdlSecretOf("davinci", id); };
var I = davInDef("bd_villa", { name: "The Maestro's Villa", hw: 64, hd: 46, arrive: [0, 19, Math.PI], out: [0, 0, 0, ""],
build: function (grp, I) {
var X = I.x, Z = I.z, lite = DAV.lite;
var ochre = bdlS("stucco", 0xF4D8A8, 3), cream = bdlS("stucco", 0xF6EADA, 3), cotto = bdlS("cotto", 0xF0D8C0, 1.3), oak = bdlS("oak", 0xE8CCA8, 1.6), stone = bdlS("ashlar", 0xE8DCC4, 2.4), marble = bdlS("marble", 0xC8C0B4, 2), damask = bdlS("damask", 0xC87868, 1.2), velvet = bdlS("velvet", 0xB86A6A, 0.8), wood = bdlS("planks", 0x7A5232, 1.2), brass = bdlMetal(0xE0B860), iron = bdlMetal(0x3A3430, "iron");
var H0 = 5, Y1 = 5.4, H1 = 4.6;
davInFloor(grp, X, Z, 16, 16, 0, cotto);
davBoxM(6, 0.06, 6, bdlS("moss", 0xD0D8B0, 2), X - 4, 0.04, Z - 4, grp).position.set(X, 0.04, Z);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
if (i > 0 && i < 3 && j > 0 && j < 3)
continue;
var cx = X - 6 + i * 4, cz = Z - 6 + j * 4;
wCyl(0.28, 0.32, 4.6, cream, cx, 2.3, cz, grp, lite ? 8 : 14);
wBox(0.8, 0.3, 0.8, stone, cx, 4.75, cz, grp);
davSolid({ x: cx, z: cz, r: 0.4, h: 5 });
}
wCyl(2.2, 2.4, 0.6, stone, X, 0.3, Z, grp, lite ? 12 : 24);
wCyl(2.05, 2.05, 0.06, bdlM(0x6A9AB8, null, 0, { op: 0.82, shine: 90 }), X, 0.58, Z, grp, lite ? 12 : 24);
wCyl(0.25, 0.35, 1.6, stone, X, 1.1, Z, grp, 10);
wCyl(0.9, 0.4, 0.3, stone, X, 1.95, Z, grp, 16);
for (var s = 0; s < 3; s++) {
var a = s / 3 * Math.PI * 2 + 0.3, sx = X + Math.sin(a) * 3.4, sz = Z + Math.cos(a) * 3.4;
wCyl(0.3, 0.36, 0.6, stone, sx, 0.3, sz, grp, 10);
var st = new THREE.Group();
st.position.set(sx, 0.6, sz);
st.rotation.y = a + Math.PI * 0.5;
grp.add(st);
wCyl(0.16, 0.22, 0.9, marble, 0, 0.45, 0, st, 10);
wSph(0.16, marble, 0, 1.05, 0, st, 10);
var arm = wCyl(0.05, 0.05, 0.5, marble, 0.15, 0.75, 0.12, st, 6);
arm.rotation.x = 1.1;
davSolid({ x: sx, z: sz, r: 0.45, h: 2 });
}
davSolid({ x: X, z: Z, r: 2.4, h: 1 });
davSpot(X, Z + 3.6, 3.2, bdlPropName(D("codex")), "look at the statues", function () { bdlAsk(D("codex")); }, 0);
[[-7, 7], [7, 7], [-7, -7], [7, -7]].forEach(function (p) { wCyl(0.45, 0.32, 0.7, bdlS("terracotta", 0xE8A080, 0.8), X + p[0], 0.35, Z + p[1], grp, 12); wSph(0.8, bdlS("moss", 0x6A9A48, 1.2), X + p[0], 1.5, Z + p[1], grp, 10); davSolid({ x: X + p[0], z: Z + p[1], r: 0.5, h: 2 }); });
bdlDRoom(grp, X - 8, Z + 8, X + 8, Z + 22, 0, H0 + 1, { wall: ochre, floor: marble, fresco: 1, name: "The Frescoed Hall", gaps: { n: [[X, 3]], s: [[X, 2.6]], w: [[Z + 15, 2.4]], e: [[Z + 15, 2.4]] } });
var fd = new THREE.Group();
fd.position.set(X, 0, Z + 21.7);
grp.add(fd);
davBoxM(2.6, 3.4, 0.12, bdlS("planks", 0x6A4428, 1), 0, 1.7, 0, fd);
davBoxM(3.2, 0.3, 0.3, stone, 0, 3.5, 0, fd);
davSpot(X, Z + 20, 2.6, "The front door", "go out under the loggia", function () { bdlLeave(); }, 0);
for (var stp = 0; stp < 9; stp++)
davBoxM(2.2, 0.2, 0.55, stone, X + 5.6, 0.1 + stp * 0.58, Z + 20.6 - stp * 0.55, grp);
davSolid({ x: X + 5.6, z: Z + 18.4, hw: 1.1, hd: 2.6, h: 5 });
davSpot(X + 4, Z + 20, 2.4, "The stair", "go up to the upper floor", function () { davMove(X + 3.4, Z + 16, Math.PI, "⬆️ <b>The upper floor.</b> The Maestro's Bedchamber, the Upper Loggia over the garden, the Roman Bath.", Y1); }, 0);
bdlDRoom(grp, X - 26, Z + 8, X - 8, Z + 22, 0, H0, { wall: cream, floor: oak, name: "The Library of Notebooks", signAt: [X - 8.6, Z + 15, -Math.PI / 2], gaps: { e: [[Z + 15, 2.4]] } });
davShelf(grp, X - 17, Z + 8.8, 16, 0);
davShelf(grp, X - 25.4, Z + 15, 12, Math.PI / 2);
davTable(grp, X - 17, Z + 16, 3.2, 1.4, 0);
bdlDChair(grp, X - 17, 0, Z + 17.2, Math.PI);
bdlDChair(grp, X - 19, 0, Z + 14.6, 0);
var mir = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.8), bdlM(0xD8E4EC, null, 0, { shine: 120, spec: 0xFFFFFF }));
mir.position.set(X - 15.8, 1.3, Z + 15.4);
mir.rotation.x = -0.3;
grp.add(mir);
for (var nb = 0; nb < 6; nb++)
davBoxM(0.3, 0.05, 0.22, bdlS("velvet", 0xD8C8A8, 0.5), X - 18.2 + nb * 0.42, 0.94, Z + 15.8, grp);
davSpot(X - 17, Z + 17.6, 2.4, "📜 A notebook in mirror-writing", "read it in the glass", function () { bdlClue(D("gears")); }, 0);
bdlDRoom(grp, X + 8, Z + 8, X + 26, Z + 22, 0, H0, { wall: damask, floor: cotto, name: "The Room of Riddles", signAt: [X + 8.6, Z + 15, Math.PI / 2], gaps: { w: [[Z + 15, 2.4]] } });
var rid = bdlCanvasTex("riddle", function (x, W, H) {
x.fillStyle = "#E8D8B0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#6A4A2A";
x.lineWidth = 14;
x.strokeRect(7, 7, W - 14, H - 14);
x.fillStyle = "#3A2A1A";
x.font = "italic 30px Georgia";
x.textAlign = "center";
["Three stand round the water.", "Turn all three to face it,", "and the water will go down", "to show you the way."].forEach(function (t, i) { x.fillText(t, W / 2, 90 + i * 58); });
}, 512, 384);
var rp = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), rid);
rp.position.set(X + 17, 2.4, Z + 21.4);
rp.rotation.y = Math.PI;
grp.add(rp);
davSpot(X + 17, Z + 19.6, 2.4, "📜 A riddle, framed", "read it", function () { bdlClue(D("codex")); }, 0);
for (var ch = 0; ch < 4; ch++) {
var cb = new THREE.Group();
cb.position.set(X + 12 + ch * 3, 0, Z + 12);
grp.add(cb);
davBoxM(1.2, 0.8, 1.2, wood, 0, 0.4, 0, cb);
var bd = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bdlCanvasTex("chess", function (x, W, H) { for (var a2 = 0; a2 < 8; a2++)
for (var b2 = 0; b2 < 8; b2++) {
x.fillStyle = (a2 + b2) % 2 ? "#3A2A1A" : "#E8D8B0";
x.fillRect(a2 * W / 8, b2 * H / 8, W / 8, H / 8);
} }, 128, 128));
bd.rotation.x = -Math.PI / 2;
bd.position.y = 0.81;
cb.add(bd);
davSolid({ x: X + 12 + ch * 3, z: Z + 12, hw: 0.6, hd: 0.6, h: 1 });
}
bdlDRoom(grp, X - 26, Z - 8, X - 8, Z + 8, 0, H0, { wall: stone, floor: cotto, name: "The Tuscan Kitchen", signAt: [X - 8.6, Z, -Math.PI / 2], gaps: { e: [[Z, 2.4]], n: [[X - 17, 2.4]] } });
var hf = new THREE.Group();
hf.position.set(X - 25.2, 0, Z);
hf.rotation.y = Math.PI / 2;
grp.add(hf);
davBoxM(4, 2.4, 1.2, stone, 0, 1.2, 0, hf);
davBoxM(2.4, 1.4, 0.4, bdlM(0x1A1410), 0, 0.9, 0.45, hf);
davBoxM(4.6, 0.4, 1.6, stone, 0, 2.6, 0.1, hf);
wGlow && (function () { var gl = wGlow(0xFF9A50, 2.2, 0.5); gl.position.set(0, 0.8, 0.5); hf.add(gl); })();
davSolid({ x: X - 25, z: Z, hw: 0.8, hd: 2, h: 3 });
davTable(grp, X - 17, Z, 4, 1.6, 0);
for (var hb = 0; hb < 6; hb++)
wSph(0.12, bdlM([0xE8C83A, 0xC83A2A, 0x6A9A3A][hb % 3]), X - 18.5 + hb * 0.6, 0.98, Z, grp, 8);
for (var pt = 0; pt < 5; pt++)
wCyl(0.25, 0.2, 0.4, brass, X - 24 + pt * 1.2, 2.6, Z - 7.4, grp, 10);
bdlDRoom(grp, X + 8, Z - 8, X + 26, Z + 8, 0, H0, { wall: cream, floor: oak, fresco: 4, name: "The Lute Room", signAt: [X + 8.6, Z, Math.PI / 2], gaps: { w: [[Z, 2.4]], n: [[X + 17, 2.4]] } });
[[-3, 0.6], [0, -0.6], [3, 0.6]].forEach(function (p, i) { bdlDChair(grp, X + 17 + p[0], 0, Z + 2 + p[1], Math.PI, velvet); var lute = new THREE.Group(); lute.position.set(X + 17 + p[0], 0.9, Z + 1.5 + p[1]); grp.add(lute); var bo = wSph(0.32, wood, 0, 0, 0, lute, 12); bo.scale.set(1, 1.3, 0.5); var nk = wBox(0.08, 0.7, 0.04, wood, 0, 0.6, 0, lute); });
var hp = new THREE.Group();
hp.position.set(X + 22, 0, Z - 4);
grp.add(hp);
davBoxM(0.15, 2.2, 0.15, wood, 0, 1.1, 0, hp);
var arc = new THREE.Mesh(new THREE.TorusGeometry(1, 0.07, 6, 20, Math.PI / 2), wood);
arc.position.set(0, 1.1, 0);
hp.add(arc);
davSolid({ x: X + 22, z: Z - 4, r: 0.8, h: 2.2 });
bdlDRoom(grp, X - 26, Z - 24, X - 8, Z - 8, 0, H0 + 1, { wall: cream, floor: oak, name: "The Painter's Studio", signAt: [X - 17, Z - 8.6, 0], gaps: { s: [[X - 17, 2.4]] } });
for (var e = 0; e < 3; e++) {
var E = davEasel(grp, X - 23 + e * 3.4, Z - 18, 0.2 - e * 0.2, bdlFresco(10 + e));
}
davTable(grp, X - 12, Z - 12, 2.4, 1.2, 0);
for (var pc = 0; pc < 8; pc++)
wCyl(0.06, 0.06, 0.12, bdlM([0xC83A2A, 0x2A4A8A, 0xE8C83A, 0x3A7A3A, 0x8A5A3A, 0xF0F0E8, 0x2A2A2A, 0xC87A3A][pc]), X - 13 + pc * 0.28, 0.95, Z - 12, grp, 8);
var pn = new THREE.Group();
pn.position.set(X - 17, 0, Z - 23.4);
grp.add(pn);
davBoxM(2.4, 3, 0.12, bdlS("planks", 0xA87A4A, 1), 0, 1.7, 0, pn);
var pp = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.5), bdlFresco(9));
pp.position.set(0, 1.75, 0.07);
pn.add(pp);
for (var l = 0; l < 4; l++)
davBoxM(0.24, 0.24, 0.06, brass, -0.45 + l * 0.3, 0.36, 0.1, pn);
davSpot(X - 17, Z - 21.6, 2.4, bdlPropName(D("gears")), "spell a word", function () { bdlAsk(D("gears")); }, 0);
bdlDRoom(grp, X - 8, Z - 24, X + 8, Z - 8, 0, H0 + 1, { wall: stone, floor: bdlS("planks", 0xC8A07A, 1.4), name: "The Inventor's Workshop", signAt: [X, Z - 8.6, 0], gaps: { s: [[X, 3]] } });
davTable(grp, X - 4, Z - 14, 3.4, 1.6, 0);
davTable(grp, X + 4, Z - 19, 3.4, 1.6, 0);
var orn = new THREE.Group();
orn.position.set(X - 4, 1.3, Z - 14);
grp.add(orn);
davBoxM(0.3, 0.2, 1.2, wood, 0, 0, 0, orn);
[-1, 1].forEach(function (sd) { var wg = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.8), bdlM(0xE8DCC0, null, 0, { ds: true })); wg.position.set(sd * 1.1, 0.05, 0); wg.rotation.x = -Math.PI / 2; wg.rotation.z = sd * 0.15; orn.add(wg); });
var scr = new THREE.Group();
scr.position.set(X + 4, 1.0, Z - 19);
grp.add(scr);
var sc = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.5, lite ? 8 : 16, 1, true), bdlM(0xE8DCC0, null, 0, { ds: true }));
sc.position.y = 0.5;
scr.add(sc);
wCyl(0.03, 0.03, 0.9, wood, 0, 0.45, 0, scr, 5);
for (var gr = 0; gr < 3; gr++) {
var gw = wCyl(0.6 + gr * 0.2, 0.6 + gr * 0.2, 0.12, wood, X - 6 + gr * 1.6, 2.8, Z - 23.5, grp, lite ? 10 : 18);
gw.rotation.x = Math.PI / 2;
}
bdlDRoom(grp, X + 8, Z - 24, X + 26, Z - 8, 0, H0, { wall: ochre, floor: cotto, fresco: 6, name: "The Dining Sala", signAt: [X + 17, Z - 8.6, 0], gaps: { s: [[X + 17, 2.4]] } });
davTable(grp, X + 17, Z - 16, 6, 1.6, 0);
for (var dc = 0; dc < 5; dc++) {
bdlDChair(grp, X + 14.6 + dc * 1.2, 0, Z - 17.3, 0, velvet);
bdlDChair(grp, X + 14.6 + dc * 1.2, 0, Z - 14.7, Math.PI, velvet);
}
for (var cd = 0; cd < 3; cd++) {
wCyl(0.04, 0.05, 0.3, bdlM(0xF2EAD8), X + 15 + cd * 2, 1.07, Z - 16, grp, 6);
wSph(0.04, bdlGlow(0xFFD890, 0.95), X + 15 + cd * 2, 1.26, Z - 16, grp, 6);
}
davFloor(X, Z + 15, 26, 7, Y1, { inside: 1 });
bdlDRoom(grp, X - 8, Z + 8, X + 8, Z + 22, Y1, H1, { wall: cream, floor: oak, open: false, name: "The Upper Loggia", gaps: { w: [[Z + 15, 2.4]], e: [[Z + 15, 2.4]], n: [[X, 6]] } });
for (var ul = 0; ul < 5; ul++) {
wCyl(0.22, 0.26, H1, cream, X - 6 + ul * 3, Y1 + H1 / 2, Z + 8.6, grp, 10);
davSolid({ x: X - 6 + ul * 3, z: Z + 8.6, r: 0.35, h: H1, b: Y1 });
}
davBoxM(16, 1.0, 0.25, stone, X, Y1 + 0.5, Z + 8.5, grp);
davSolid({ x: X, z: Z + 8.5, hw: 8, hd: 0.2, h: 1, b: Y1 });
davSpot(X + 3.4, Z + 17, 2.4, "The stair", "go down to the Frescoed Hall", function () { davMove(X + 3.4, Z + 19, Math.PI, "⬇️ <b>The Frescoed Hall.</b>", 0); }, Y1);
bdlDRoom(grp, X - 26, Z + 8, X - 8, Z + 22, Y1, H1, { wall: damask, floor: oak, fresco: 7, name: "The Maestro's Bedchamber", signAt: [X - 8.6, Z + 15, -Math.PI / 2], gaps: { e: [[Z + 15, 2.4]] } });
bdlDBed(grp, X - 20, Y1, Z + 18, Math.PI, velvet);
davBoxM(2.2, 0.1, 1, wood, X - 12, Y1 + 0.85, Z + 11, grp);
davBoxM(2, 0.8, 0.9, wood, X - 12, Y1 + 0.4, Z + 11, grp);
davSolid({ x: X - 12, z: Z + 11, hw: 1.1, hd: 0.5, h: 1, b: Y1 });
bdlDChair(grp, X - 12, Y1, Z + 12.2, Math.PI);
davSpot(X - 23, Z + 11, 2.6, "🔭 The altana stair", "climb to the Star-Gazing Room", function () { davMove(X, Z - 36, 0, "🔭 <b>The Star-Gazing Room</b>, at the top of the altana: open arches on every side, the hills of Florence, and the stars Leonardo drew.", 12); }, Y1);
bdlDRoom(grp, X + 8, Z + 8, X + 26, Z + 22, Y1, H1, { wall: marble, floor: bdlS("checker", 0xF0E8E0, 1.2), name: "The Roman Bath", signAt: [X + 8.6, Z + 15, Math.PI / 2], gaps: { w: [[Z + 15, 2.4]] } });
davBoxM(6, 0.7, 4, marble, X + 18, Y1 + 0.35, Z + 15, grp);
davBoxM(5.4, 0.06, 3.4, bdlM(0x7AB0C8, null, 0, { op: 0.8, shine: 90 }), X + 18, Y1 + 0.66, Z + 15, grp);
davSolid({ x: X + 18, z: Z + 15, hw: 3, hd: 2, h: 1, b: Y1 });
var SY = 12, SZ = Z - 40;
davInFloor(grp, X, SZ, 10, 10, SY, cotto);
[[-5, 0, 0.5, 10], [5, 0, 0.5, 10], [0, -5, 10, 0.5], [0, 5, 10, 0.5]].forEach(function (w) { davBoxM(w[2], 1, w[3], ochre, X + w[0], SY + 0.5, SZ + w[1], grp); davSolid({ x: X + w[0], z: SZ + w[1], hw: w[2] / 2, hd: w[3] / 2, h: 1.2, b: SY }); });
[[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(function (c) { davBoxM(0.8, 4, 0.8, ochre, X + c[0], SY + 2, SZ + c[1], grp); });
davBoxM(11, 0.4, 11, cream, X, SY + 4.2, SZ, grp);
var tel = new THREE.Group();
tel.position.set(X + 2, SY, SZ);
grp.add(tel);
wCyl(0.05, 0.07, 1.3, brass, 0, 0.65, 0, tel, 6);
var tb = wCyl(0.1, 0.15, 1.8, brass, 0, 1.5, 0.2, tel, 12);
tb.rotation.x = 1.0;
var hills = new THREE.Mesh(new THREE.CylinderGeometry(70, 70, 26, lite ? 16 : 32, 1, true), new THREE.MeshBasicMaterial({ map: bdlFresco(20).map, color: 0x8A8478, side: THREE.BackSide }));
hills.position.set(X, SY - 4, SZ);
grp.add(hills);
davSpot(X - 3, SZ + 3, 2.6, "The altana stair", "go down to the bedchamber", function () { davMove(X - 22, Z + 12, 0, "⬇️ <b>The Maestro's Bedchamber.</b>", Y1); }, SY);
davSpot(X + 2, SZ + 1.4, 2, "🔭 The telescope", "look at the stars", function () { bdlSay("🔭 <b>The stars over Florence.</b> The Moon's pale ashen light (Leonardo was the first to explain it: sunlight bounced off the Earth), Jupiter, and the Milky Way across the hills."); }, SY);
var GX = X - 46, GZ = Z - 30;
bdlDRoom(grp, GX - 9, GZ - 8, GX + 9, GZ + 8, 0, 5, { wall: bdlS("ashlar", 0xC8A880, 2), floor: bdlS("planks", 0xB08860, 1.2) });
BDL.davSpin = [];
for (var gg = 0; gg < 5; gg++) {
var gw2 = new THREE.Group();
gw2.position.set(GX - 6 + gg * 3, 2.4, GZ - 7.2);
grp.add(gw2);
var R0 = 0.9 + (gg % 2) * 0.4;
var disc = wCyl(R0, R0, 0.2, wood, 0, 0, 0, gw2, 16);
disc.rotation.x = Math.PI / 2;
for (var t = 0; t < 12; t++) {
var ta = t / 12 * 6.283;
var tooth = wBox(0.2, 0.26, 0.22, bdlS("planks", 0x6A4A2A, 1), Math.cos(ta) * (R0 + 0.08), Math.sin(ta) * (R0 + 0.08), 0, gw2);
tooth.rotation.z = ta;
}
(function (G, sp) { disc.onBeforeRender = function () { G.rotation.z = performance.now() / 1000 * sp; }; })(gw2, (gg % 2 ? -1 : 1) * (0.3 + gg * 0.05));
}
var orn2 = new THREE.Group();
orn2.position.set(GX, 1.6, GZ + 0.5);
grp.add(orn2);
davBoxM(0.4, 0.3, 1.4, wood, 0, 0, 0, orn2);
[-1, 1].forEach(function (sd) { var wg2 = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.2), bdlM(0xE8DCC0, null, 0, { ds: true })); wg2.position.set(sd * 1.6, 0.1, 0); wg2.rotation.x = -Math.PI / 2; orn2.add(wg2); });
davSolid({ x: GX, z: GZ + 0.5, hw: 1.2, hd: 0.8, h: 2 });
davSpot(GX, GZ + 2.4, 2.4, "✨ The great model", "turn the crank", function () { bdlFeat(BDL_FEATS.gears); }, 0);
davSpot(GX, GZ + 6.4, 2.4, "↩️ The panel", "go back through", function () { BDL.secret = D("gears"); bdlBackUp(); }, 0);
var CX = X + 46, CZ = Z - 30;
bdlDRoom(grp, CX - 9, CZ - 8, CX + 9, CZ + 8, 0, 4, { wall: bdlS("ashlar", 0xB89A78, 2), floor: stone });
for (var dk = 0; dk < 3; dk++) {
davBoxM(1.6, 0.08, 0.9, wood, CX - 4 + dk * 4, 0.9, CZ - 2, grp);
davBoxM(1.1, 0.05, 0.7, bdlM(0xE8D8B0), CX - 4 + dk * 4, 0.96, CZ - 2, grp);
davSolid({ x: CX - 4 + dk * 4, z: CZ - 2, hw: 0.8, hd: 0.5, h: 1 });
wCyl(0.04, 0.04, 0.2, bdlM(0xF2EAD8), CX - 3.4 + dk * 4, 1.04, CZ - 2.2, grp, 5);
wSph(0.04, bdlGlow(0xFFD890, 0.95), CX - 3.4 + dk * 4, 1.18, CZ - 2.2, grp, 6);
}
davShelf(grp, CX, CZ - 7.4, 14, 0);
davSpot(CX, CZ, 2.4, "✨ The secret codex", "open it", function () { bdlFeat(BDL_FEATS.codex); }, 0);
davSpot(CX, CZ + 6.4, 2.4, "↩️ The steps", "climb back up to the fountain", function () { BDL.secret = D("codex"); bdlBackUp(); }, 0);
} });
function build() { if (I.built)
return; var grp = new THREE.Group(); grp.name = "dav-in-bd_villa"; DAV.G.add(grp); I.grp = grp; try {
I.build(grp, I);
}
catch (e) {
if (window.console)
console.warn("[bundles] villa", e);
} I.built = true; if (typeof gwBake === "function")
try {
gwBake(grp);
}
catch (e) { } }
BDL_IN.davinci = {
enter: function (h) { build(); davMove(I.x, I.z + 19, 0, "🎨 <b>" + bdlEsc(h.D.house) + "</b>" + (h.owner === bdlMe() ? ", your villa." : ", the villa of " + bdlEsc(h.name || "a dreamer") + (bdlKeeper() ? " (you hold the Keeper's key)." : " (you are their guest).")) + " The Frescoed Hall: the Garden Court ahead under the open sky, the library to the left, the Room of Riddles to the right, a stair up. Two secrets are hidden here.", 0); },
out: function (h, x, z, yw, msg) { davMove(x, z, yw, msg, h.door.y); },
toSecret: function (S, msg) { build(); if (S.id === "gears")
davMove(I.x - 46, I.z - 24, Math.PI, msg, 0);
else
davMove(I.x + 46, I.z - 24, Math.PI, msg, 0); },
back: function (S, msg) { if (S.id === "gears")
davMove(I.x - 17, I.z - 19, Math.PI, msg, 0);
else
davMove(I.x, I.z + 5, Math.PI, msg, 0); }
};
})();
function bdlPromptHtml(n) { return __ZC(362, 43, this, arguments, new.target); }
function bdlAct() { return __ZC(362, 44, this, arguments, new.target); }
function bdlTick() {
var near = null;
try {
if (BDL.inside && (!WLD.on || WLD.on !== BDL.inside.h.D.world)) {
BDL.inside = null;
BDL.secret = null;
}
var walking = typeof walkMode === "undefined" || walkMode;
if (walking && !store.inside && typeof WLD !== "undefined" && WLD.on && bdlDefOfWorld(WLD.on)) {
if (!BDL.board && !BDL.missing)
bdlLoad();
else if (Date.now() - BDL.at > 90000)
bdlLoad(true);
bdlRaise();
bdlCull();
var h = bdlNearDoor();
if (h)
near = { k: "door", h: h };
else {
var s = bdlNearSpot();
if (s)
near = { k: "spot", s: s.s, h: s.h };
}
}
}
catch (e) {
if (!BDL.warned) {
BDL.warned = 1;
if (window.console)
console.warn("[bundles] tick", e);
}
near = null;
}
if (near) {
BDL.near = near;
var html = bdlPromptHtml(near);
if (typeof worldPrompt === "function" && (!BDL.prompted || (WLD.prompt && WLD.prompt.dataset.h !== html)))
worldPrompt(html, bdlAct);
BDL.prompted = true;
}
else if (BDL.prompted) {
BDL.prompted = false;
BDL.near = null;
if (typeof worldPrompt === "function" && WLD.promptFn === bdlAct)
worldPrompt(null);
}
}
setInterval(function () { try {
bdlTick();
}
catch (e) { } }, 250);
function bdlLoop() { return __ZC(362, 45, this, arguments, new.target); }
(function () {
if (typeof ptBuild !== "function")
return;
var pb = ptBuild;
ptBuild = function (kind, colour) {
var D = bdlDefOfPet(kind);
if (!D)
return pb.apply(this, arguments);
var base = kind === "bd_seadog" ? "dog" : "cat", g = pb.call(this, base, colour || (kind === "bd_gloomkit" ? "#3A2E52" : kind === "bd_seadog" ? "#8A6A48" : "#C8963A"));
try {
var body = g.userData.body || g;
body.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(body), top = bb.max.y, fz = bb.max.z, w = bb.max.x - bb.min.x;
if (kind === "bd_gloomkit") {
var eye = bdlGlow(0xC8A8FF, 0.95);
[[0.05, 0.06], [0.035, 0.11]].forEach(function (p) { [-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), eye); e.position.set(s * p[0], top - 0.04 + p[1] * 0.4, fz - 0.05); body.add(e); }); });
for (var i = 0; i < 6; i++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 5), bdlGlow(0x9A7AE8, 0.7));
f.position.set(0, top - 0.02 - i * 0.008, fz - 0.18 - i * 0.07);
body.add(f);
}
}
else if (kind === "bd_seadog") {
var sc = new THREE.Mesh(new THREE.TorusGeometry(Math.max(0.08, w * 0.28), 0.025, 6, 16), bdlM(0x1E3A6A));
sc.position.set(0, top * 0.78, fz - 0.14);
sc.rotation.x = Math.PI / 2.4;
body.add(sc);
var tag = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 10), bdlMetal(0xC8A04A));
tag.position.set(0, top * 0.66, fz - 0.06);
tag.rotation.x = Math.PI / 2;
body.add(tag);
}
else {
var gilt = bdlMetal(0xD8A840), mane = new THREE.Mesh(new THREE.TorusGeometry(Math.max(0.07, w * 0.3), 0.05, 8, 18), gilt);
mane.position.set(0, top * 0.86, fz - 0.1);
body.add(mane);
var key = new THREE.Group();
key.position.set(0, top + 0.03, (bb.min.z + bb.max.z) / 2);
body.add(key);
bdlCyl(key, 0.012, 0.012, 0.12, gilt, 0, 0.04, 0, 6);
bdlTor(key, 0.04, 0.012, gilt, 0, 0.12, 0).rotation.y = Math.PI / 2;
g.userData.bdlKey = key;
}
}
catch (e) { }
return g;
};
})();
(function () {
if (typeof ptKindName !== "function")
return;
var pk = ptKindName;
ptKindName = function (k) { var D = bdlDefOfPet(k); if (D)
return [k, D.pet.name, D.pet.icon]; return pk.apply(this, arguments); };
})();
(function () {
if (typeof ptAnimate !== "function")
return;
var pa = ptAnimate;
ptAnimate = function (g, dt, speed) { try {
if (g && g.userData && g.userData.bdlKey)
g.userData.bdlKey.rotation.y += dt * 1.5;
}
catch (e) { } return pa.apply(this, arguments); };
})();
var BDL_LOOK_KEYS = ["hair", "hairStyle", "top", "topKind", "bottom", "bottomKind", "shoes", "shoeKind", "layer", "layerColor", "back", "backColor", "hat", "hatColor", "face", "neck", "ears", "hands", "waist", "accColor", "beard"];
var BDL_LOOK_CLEAR = ["topKind", "bottomKind", "layer", "back", "hat", "face", "neck", "ears", "hands", "waist"];
function bdlLookWorn() { try {
return dreamer().bdlLook || null;
}
catch (e) {
return null;
} }
function bdlLookWear(key) { return __ZC(362, 46, this, arguments, new.target); }
function bdlLookOff() { return __ZC(362, 47, this, arguments, new.target); }
function bdlWing(S, bone, skin, vein) { return __ZC(362, 48, this, arguments, new.target); }
function bdlTube(par, pts, r0, r1, mat, seg) { return __ZC(362, 49, this, arguments, new.target); }
var BDL_MOUNT = {
underdark: function () { return __ZC(362, 50, this, arguments, new.target); },
verne: function () { return __ZC(362, 51, this, arguments, new.target); },
davinci: function () { return __ZC(362, 52, this, arguments, new.target); }
};
(function () {
BDL_ORDER.forEach(function (k) {
var D = BDL_DEFS[k], a = D.mount.arch;
if (typeof KIT !== "undefined")
KIT[a] = { cat: "creature", size: [6, 4, 8], parts: [], bdlMount: 1 };
if (typeof RIDE_SEAT !== "undefined")
RIDE_SEAT[a] = D.mount.seat;
if (typeof RIDE_FLIES !== "undefined" && D.mount.fly)
RIDE_FLIES[a] = 1;
});
if (typeof archList === "function") {
var al = archList;
archList = function () { return al.apply(this, arguments).split(", ").filter(function (k) { return !/^bdm_/.test(k); }).join(", "); };
}
if (typeof build === "function") {
var bd = build;
build = function (spec) {
var D = spec && spec.archetype && bdlDefOfMount(spec.archetype);
if (!D)
return bd.apply(this, arguments);
var g;
try {
g = BDL_MOUNT[D.key]();
}
catch (e) {
if (window.console)
console.warn("[bundles] mount", e);
g = new THREE.Group();
}
g.userData.id = spec.id;
return g;
};
}
})();
function bdlMountNow() { return (typeof rideArch !== "undefined" && rideArch && bdlDefOfMount(rideArch)) || null; }
function bdlStrike() { return __ZC(362, 53, this, arguments, new.target); }
var BDL_FX = [];
function bdlFx(D, P, fx, fz) { return __ZC(362, 54, this, arguments, new.target); }
function bdlFxStep(dt) { return __ZC(362, 55, this, arguments, new.target); }
function bdlPowerPaint() {
var D = bdlMountNow(), show = !!D && !store.inside && (typeof walkMode === "undefined" || walkMode);
if (!BDL.btn && show) {
var b = document.createElement("button");
b.id = "bdl-power";
b.type = "button";
b.style.cssText = "position:fixed;right:10px;top:164px;z-index:30;padding:8px 12px;border-radius:12px;border:1px solid #C8A04A;background:rgba(26,22,18,.88);color:#FFE7B0;font:600 14px system-ui,sans-serif;cursor:pointer";
b.addEventListener("click", function () { bdlStrike(); });
document.body.appendChild(b);
BDL.btn = b;
}
if (!BDL.btn)
return;
BDL.btn.style.display = show ? "" : "none";
if (show) {
var t = D.mount.power.icon + " " + D.mount.power.name + " (J)";
if (BDL.btn.textContent !== t)
BDL.btn.textContent = t;
}
}
setInterval(function () { try {
bdlPowerPaint();
}
catch (e) { } }, 400);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["bdl-power"] = 1;
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "bdl-ps-power", show: function () { return !!bdlMountNow() && !store.inside; }, label: function () { var D = bdlMountNow(); return D ? D.mount.power.icon + " " + D.mount.power.name : ""; }, run: function () { bdlStrike(); } });
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyJ" || e.repeat || !bdlMountNow())
return;
var tg = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT/.test(tg))
return;
e.preventDefault();
e.stopImmediatePropagation();
bdlStrike();
}, true);
function bdlMoney(n) { return "$" + Number(n || 0).toFixed(2); }
function bdlCard(msg, tried) { return __ZC(362, 56, this, arguments, new.target); }
function bdlBuy(k) { return __ZC(362, 57, this, arguments, new.target); }
function bdlGoHome(k) { return __ZC(362, 58, this, arguments, new.target); }
function bdlRide(k) { return __ZC(362, 59, this, arguments, new.target); }
(function () {
if (typeof document === "undefined")
return;
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-bundles")) {
var b = document.createElement("button");
b.className = "btn";
b.id = "me-bundles";
b.title = "World Bundles: a house, a pet, a look, a mount and gold";
b.textContent = "🎁 World Bundles";
b.onclick = function () { bdlLoad(true); bdlCard(); };
bar.appendChild(b);
}
}
setTimeout(hook, 2000);
})();
