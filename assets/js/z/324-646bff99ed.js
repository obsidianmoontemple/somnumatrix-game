/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(324, function () {
"use strict";
return [
function (html) {
if (!OW.hud) {
var d = document.createElement("div");
d.id = "ow-hud";
d.style.cssText = "position:fixed;left:50%;top:86px;transform:translateX(-50%);z-index:45;pointer-events:none;padding:6px 12px;border-radius:6px;background:rgba(8,14,28,.82);color:#E8F0FF;font:600 14px/1.35 var(--sans,system-ui);text-align:center;max-width:min(92vw,520px);display:none";
document.body.appendChild(d);
OW.hud = d;
}
if (!html) {
OW.hud.style.display = "none";
return;
}
if (OW.hud.dataset.h !== html) {
OW.hud.dataset.h = html;
OW.hud.innerHTML = html;
}
OW.hud.style.display = "block";
},
function (L, x, z, label) {
var dx = x - L.x, dz = z - L.z, d = Math.hypot(dx, dz);
var want = Math.atan2(-dx, -dz), rel = want - (typeof yaw !== "undefined" ? yaw : 0);
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var arrows = ["⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️", "➡️", "↗️"], i = ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8;
return arrows[i] + " " + esc(label) + " · " + Math.round(d) + " m";
},
function () {
if (OW.mats)
return OW.mats;
OW.mats = { wall: wM(0x9EA4AC), wall2: wM(0x6E7580), floor: wM(0x3E434B), roof: wM(0x7E848C), trim: wM(0x2E5A9A), panel: wM(0x9AA4AE, { e: 0x3A4048 }), glass: wM(0x2A3A4A, { e: 0x101820 }),
door: wM(0x4A5464), badge: wM(0xC8A050, { e: 0x4A3A10 }), warm: wM(0xD8C090, { e: 0x4A3A20 }), dark: wM(0x2A2E36) };
return OW.mats;
},
function (S, a, x, y, z, rot, s, solids, label) {
if (typeof KIT === "undefined" || !KIT[a] || typeof build !== "function")
return null;
var m = build({ id: "ow_" + a + "_" + Math.round(x * 10) + "_" + Math.round(z * 10), archetype: a, label: label || null, attrs: s && s !== 1 ? { s: s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
m.position.set(x, y, z);
m.rotation.y = rot || 0;
S.add(m);
if (solids) {
var d = KIT[a], sc = s || 1;
if (d && d.size && d.cat !== "being")
solids.push({ x: x, z: z, rot: rot || 0, hw: Math.max(0.2, d.size[0] * sc / 2), hd: Math.max(0.2, d.size[2] * sc / 2), h: d.size[1] * sc });
}
return m;
},
function (S, R, y, solids, place) {
var cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2, hw = (R.x1 - R.x0) / 2, hd = (R.z1 - R.z0) / 2;
function p(a, dx, dz, rot, s) { return owPiece(S, a, cx + dx, y, cz + dz, rot, s, solids); }
var id = R.id;
if (id === "airlock") {
p("lockers", -hw + 0.5, -hd + 1.4, Math.PI / 2);
p("lockers", -hw + 0.5, hd - 1.4, Math.PI / 2);
p("bench", 1, -hd + 0.6, 0);
p("console", hw - 0.8, hd - 1, -Math.PI / 2, 0.8);
}
else if (id === "ops" || id === "control") {
for (var i = -1; i <= 1; i++)
p("console", i * 3.4, -hd + 0.9, 0);
p("desk", 0, 1.2, Math.PI);
p("chair", 0, 2.1, Math.PI);
p("maptable", -hw + 2, hd - 2, 0, 0.6);
p("pottedplant", hw - 0.6, hd - 0.6, 0);
}
else if (id === "exchange") {
p("shopcounter", 0, -hd + 2.2, 0);
p("shopshelf", -hw + 0.6, 0, Math.PI / 2);
p("shopshelf", -hw + 0.6, hd - 2.4, Math.PI / 2);
p("vendingmachine", hw - 0.7, -hd + 0.8, 0);
p("crates", hw - 1.3, hd - 1.3, 0.3);
p("barstool", 2, -hd + 3.2, 0);
}
else if (id === "icelab" || id === "glacier" || id === "workshop") {
p("cryopod", hw - 1, -hd + 1.4, 0);
p("kitchencounter", -hw + 0.5, -hd + 2, Math.PI / 2);
p("console", 0, -hd + 0.9, 0);
p("desk", -1, hd - 1.4, 0);
p("chair", -1, hd - 2.2, 0);
p("crates", hw - 1.2, hd - 1.2, 0);
p("tank", hw - 1.2, 0.8, 0, 0.5);
}
else if (id === "mess") {
p("diningtable", -2, 0, 0, 0.9);
p("chair", -2, -1.1, 0);
p("chair", -2, 1.1, Math.PI);
p("diningtable", 2.4, 0, 0, 0.9);
p("chair", 2.4, -1.1, 0);
p("chair", 2.4, 1.1, Math.PI);
p("barcounter", 0, hd - 1, Math.PI);
p("coffeemachine", -hw + 0.6, hd - 0.6, Math.PI);
p("fridge", hw - 0.6, hd - 0.7, Math.PI);
}
else if (id === "bunks") {
p("bed", -hw + 1.2, -1.6, Math.PI / 2);
p("bed", -hw + 1.2, 1.6, Math.PI / 2);
p("lockers", hw - 0.5, 0, -Math.PI / 2);
p("floorlamp", hw - 0.6, hd - 0.6, 0);
}
else if (id === "power" || id === "heat" || id === "cooling") {
p("reactor", 0, 0, 0, 0.16);
p("console", hw - 0.9, 0, -Math.PI / 2, 0.8);
p("barrel", -hw + 0.8, hd - 0.8, 0);
p("barrel", -hw + 0.8, hd - 1.8, 0);
p("tank", -hw + 1.2, -hd + 1.2, 0, 0.5);
}
else if (id === "lab") {
p("console", 0, -hd + 0.8, 0);
p("kitchencounter", -hw + 0.5, -1.4, Math.PI / 2);
p("tank", -hw + 0.9, 1.6, 0, 0.4);
p("desk", hw - 1.2, hd - 1.2, -Math.PI / 2);
p("chair", hw - 2, hd - 1.2, Math.PI / 2);
p("bookshelf", 1.2, hd - 0.4, Math.PI);
}
else if (id === "crew") {
p("bed", -hw + 1.2, -hd + 1.4, Math.PI / 2);
p("bed", -hw + 1.2, hd - 1.4, Math.PI / 2);
p("lockers", hw - 0.5, -1, -Math.PI / 2);
p("armchair", hw - 1, 2.2, -Math.PI / 2);
p("floorlamp", hw - 0.5, hd - 0.5, 0);
}
else if (id === "store" || id === "drill") {
p("crates", -1.2, -1.2, 0.2);
p("crates", 1.2, 1, 0.7);
p("shopshelf", hw - 0.6, 0, -Math.PI / 2);
p("barrel", -hw + 0.8, hd - 0.8, 0);
}
},
function (id, place) {
var P = OW_PLACES[place] || {}, here = P.name || "";
if (id === "airlock")
return ["SUIT CHECK", "helmet seal · gloves · air · cooling", "never go out alone"];
if (id === "ops" || id === "control")
return [id === "control" ? "ROVER VERA: DRIVING" : "STATION STATUS", "power good · seals good · crew all present", here + " · Space Corp"];
if (id === "exchange") {
var g = OW_GOODS.filter(function (q) { return q.w === place && q.lo; }).slice(0, 3).map(function (q) { return q.n + ": " + q.b; });
return ["THE EXCHANGE BUYS"].concat(g.length ? g : ["all you gather out here"]);
}
if (id === "icelab")
return ["POLAR ICE", "cores from craters the Sun never reaches", "handle with gloves"];
if (id === "glacier")
return ["SPUTNIK PLANITIA", "nitrogen ice, churning in cells", "a few centimetres a day"];
if (id === "workshop")
return ["SALVAGE BENCH", "three parts make one good part", "test before you trust"];
if (id === "mess")
return ["TODAY'S MENU", "ration stew · fruit bar · hot tea", "ask the cook"];
if (id === "bunks")
return ["QUIET HOURS", "22:00 to 06:00", "sleep well"];
if (id === "power" || id === "heat" || id === "cooling")
return ["DANGER", "authorised crew only", "keep this door closed"];
if (id === "store" || id === "drill")
return ["STORE", "sign everything out", "sign everything back"];
if (id === "lab")
return ["THE LAB", "samples from the clouds below", "log every canister"];
if (id === "crew")
return ["CREW QUARTERS", "off shift: rest", "on shift: the rail"];
return null;
},
function (S, L, H, solids, place) {
var M = owMats(), hw = H.w / 2, hd = H.d / 2, y = H.y, hh = OW_WALL_H;
var wall = function (x0, z0, x1, z1, mat, h) {
var w = Math.max(0.24, Math.abs(x1 - x0)), d = Math.max(0.24, Math.abs(z1 - z0)), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
wBox(w, h || hh, d, mat || M.wall, H.x + cx, y + (h || hh) / 2, H.z + cz, S);
solids.push({ x: H.x + cx, z: H.z + cz, hw: w / 2, hd: d / 2 });
};
function line(axis, c, a, b, gaps, mat) {
var cuts = gaps.filter(function (g) { return g.at > a - 0.01 && g.at < b + 0.01; }).sort(function (p, q) { return p.at - q.at; }), s = a;
cuts.forEach(function (g) {
var e = g.at - g.w / 2;
if (e > s + 0.05) {
if (axis === "x")
wall(s, c, e, c, mat);
else
wall(c, s, c, e, mat);
}
if (axis === "x")
wBox(g.w, hh - 2.3, 0.24, mat || M.wall, H.x + g.at, y + 2.3 + (hh - 2.3) / 2, H.z + c, S);
else
wBox(0.24, hh - 2.3, g.w, mat || M.wall, H.x + c, y + 2.3 + (hh - 2.3) / 2, H.z + g.at, S);
s = g.at + g.w / 2;
});
if (b > s + 0.05) {
if (axis === "x")
wall(s, c, b, c, mat);
else
wall(c, s, c, b, mat);
}
}
wBox(H.w + 0.6, 0.3, H.d + 0.6, M.floor, H.x, y - 0.15, H.z, S);
wBox(H.w + 0.8, 0.3, H.d + 0.8, M.roof, H.x, y + hh + 0.15, H.z, S);
wBox(H.w + 1.0, 0.25, H.d + 1.0, M.trim, H.x, y + hh + 0.42, H.z, S);
var front = { w: 2.4 }, side = H.door || "w";
[["w", -hw, "z"], ["e", hw, "z"], ["n", -hd, "x"], ["s", hd, "x"]].forEach(function (q) {
var gaps = q[0] === side ? [{ at: 0, w: 2.4 }] : [];
if (q[2] === "z")
line("z", q[1], -hd, hd, gaps, M.wall2);
else
line("x", q[1], -hw, hw, gaps, M.wall2);
});
[-1, 1].forEach(function (s) { wBox(H.w * 0.8, 0.7, 0.06, M.glass, H.x, y + 2.4, H.z + s * (hd + 0.14), S); });
var segs = {};
function addSeg(axis, c, a, b) { var k = axis + ":" + c.toFixed(2); (segs[k] = segs[k] || { axis: axis, c: c, iv: [] }).iv.push([a, b]); }
H.rooms.forEach(function (r) {
var R = { id: r[0], name: r[1], x0: r[2], z0: r[3], x1: r[4], z1: r[5], badge: !!r[6] };
if (R.x0 > -hw + 0.01)
addSeg("z", R.x0, R.z0, R.z1);
if (R.x1 < hw - 0.01)
addSeg("z", R.x1, R.z0, R.z1);
if (R.z0 > -hd + 0.01)
addSeg("x", R.z0, R.x0, R.x1);
if (R.z1 < hd - 0.01)
addSeg("x", R.z1, R.x0, R.x1);
OW.rooms.push({ id: R.id, name: R.name, x0: H.x + R.x0, x1: H.x + R.x1, z0: H.z + R.z0, z1: H.z + R.z1, badge: R.badge, place: place, y: y });
owFurnish(S, { id: R.id, x0: H.x + R.x0, x1: H.x + R.x1, z0: H.z + R.z0, z1: H.z + R.z1 }, y, solids, place);
var pl = owPoster(R.id, place);
if (pl) {
var pz = H.z + R.z0 + 0.14, px = H.x + R.x0 + (R.x1 - R.x0) * 0.72, po = wSign(pl, 2.2, 1.3, "#0E1A2E", "#BFD8FF");
po.position.set(px, y + 1.85, pz);
S.add(po);
}
var lp = wBox(Math.min(4, R.x1 - R.x0 - 1), 0.06, 1.2, M.panel, H.x + (R.x0 + R.x1) / 2, y + hh - 0.04, H.z + (R.z0 + R.z1) / 2, S);
});
var doors = (H.doors || []).map(function (d) { return { x: d[0], z: d[1], badge: !!d[2] }; });
Object.keys(segs).forEach(function (k) {
var sg = segs[k], iv = sg.iv.sort(function (a, b) { return a[0] - b[0]; }), merged = [];
iv.forEach(function (q) { var m = merged[merged.length - 1]; if (m && q[0] <= m[1] + 0.01)
m[1] = Math.max(m[1], q[1]);
else
merged.push([q[0], q[1]]); });
var gaps = doors.filter(function (d) { return sg.axis === "x" ? Math.abs(d.z - sg.c) < 0.01 : Math.abs(d.x - sg.c) < 0.01; }).map(function (d) { return { at: sg.axis === "x" ? d.x : d.z, w: 1.6, d: d }; });
merged.forEach(function (m) { line(sg.axis, sg.c, m[0], m[1], gaps, M.wall); });
gaps.forEach(function (g) {
if (g.named)
return;
g.named = 1;
var along = sg.axis === "x", dx = H.x + (along ? g.at : sg.c), dz = H.z + (along ? sg.c : g.at);
[-1, 1].forEach(function (sd) {
var ox = along ? 0 : sd * 0.6, oz = along ? sd * 0.6 : 0, into = owRoomAt(dx - ox, dz - oz);
if (!into)
return;
var t = wSign([into.name + (into.badge ? " · staff" : "")], 1.9, 0.32, "#0E1A2E", "#E8C27A");
t.position.set(dx + (along ? 0 : sd * 0.14), y + 2.62, dz + (along ? sd * 0.14 : 0));
t.rotation.y = along ? (sd > 0 ? 0 : Math.PI) : (sd > 0 ? Math.PI / 2 : -Math.PI / 2);
S.add(t);
});
});
gaps.forEach(function (g) {
if (!g.d.badge || g.done)
return;
g.done = 1;
var along = sg.axis === "x", dx = H.x + (along ? g.at : sg.c), dz = H.z + (along ? sg.c : g.at);
var leaf = wBox(along ? 1.6 : 0.12, 2.3, along ? 0.12 : 1.6, M.door, dx, y + 1.15, dz, L);
var lamp = wBox(along ? 0.3 : 0.14, 0.14, along ? 0.14 : 0.3, M.badge, dx + (along ? 0.55 : 0.1), y + 2.45, dz + (along ? 0.1 : 0.55), L);
var sol = { x: dx, z: dz, hw: along ? 0.8 : 0.1, hd: along ? 0.1 : 0.8 };
solids.push(sol);
OW.doors.push({ x: dx, z: dz, along: along, leaf: leaf, sol: sol, y: y, open: 0, hw0: sol.hw, hd0: sol.hd });
});
});
var seam = wM(0x343940);
for (var fx = -hw + 3; fx < hw; fx += 3)
wBox(0.04, 0.02, H.d - 0.4, seam, H.x + fx, y + 0.01, H.z, S);
for (var fz = -hd + 3; fz < hd; fz += 3)
wBox(H.w - 0.4, 0.02, 0.04, seam, H.x, y + 0.01, H.z + fz, S);
[-1, 1].forEach(function (s2) { wBox(H.w - 0.5, 0.14, 0.05, M.trim, H.x, y + 1.05, H.z + s2 * (hd - 0.15), S); wBox(0.05, 0.14, H.d - 0.5, M.trim, H.x + s2 * (hw - 0.15), y + 1.05, H.z, S); });
for (var v = 0; v < 3; v++)
wBox(1.2, 0.6, 1.2, M.wall2, H.x - hw * 0.5 + v * hw * 0.5, y + hh + 0.6, H.z - hd * 0.4, S);
if (H.w > 20)
owPiece(S, "satdish", H.x + hw * 0.6, y + hh + 0.3, H.z + hd * 0.3, 0.6, 0.45);
var sx = side === "w" ? H.x - hw - 0.2 : side === "e" ? H.x + hw + 0.2 : H.x, sz = side === "n" ? H.z - hd - 0.2 : side === "s" ? H.z + hd + 0.2 : H.z;
var sign = wSign([H.name, "Space Corp · a branch of the Dragon Corp"], 5, 1.1, "#0E1A2E", "#BFD8FF");
sign.position.set(sx, y + hh - 0.6, sz);
sign.rotation.y = side === "w" ? -Math.PI / 2 : side === "e" ? Math.PI / 2 : side === "n" ? Math.PI : 0;
S.add(sign);
var lt = wBox(0.5, 0.2, 0.5, M.warm, sx, y + hh + 0.05, sz, S);
OW.halls.push({ x0: H.x - hw, x1: H.x + hw, z0: H.z - hd, z1: H.z + hd, y: y, door: side, dx: sx, dz: sz });
},
function (S, look, x, y, z, R) {
var g = new THREE.Group();
g.position.set(x, y, z);
var m;
if (look === "dark") {
m = wM(0x1E1C1E);
for (var i = 0; i < 4; i++) {
var r = wMesh(new THREE.DodecahedronGeometry(0.35 + R() * 0.35, 0), m, (R() - 0.5) * 1.6, 0.2, (R() - 0.5) * 1.6, g);
r.rotation.set(R() * 3, R() * 3, 0);
}
wMesh(new THREE.CircleGeometry(1.6, 12), wM(0x2A2826), 0, 0.03, 0, g).rotation.x = -Math.PI / 2;
}
else if (look === "hollow") {
var pit = wMesh(new THREE.CircleGeometry(2.2, 16), wM(0xB8C8D8, { e: 0x202830 }), 0, 0.03, 0, g);
pit.rotation.x = -Math.PI / 2;
wMesh(new THREE.RingGeometry(2.2, 2.6, 16), wM(0x8A8E92), 0, 0.04, 0, g).rotation.x = -Math.PI / 2;
wCyl(0.03, 0.03, 1.2, wM(0xC8C8C8), 1.6, 0.6, 0, g, 4);
wBox(0.4, 0.25, 0.02, wB(0xE8A040), 1.8, 1.1, 0, g);
}
else if (look === "cell") {
wBox(1.0, 1.4, 0.6, wM(0xD8DCE2), 0, 0.7, 0, g);
wBox(0.8, 0.2, 0.04, wB(0x5AE07A, { fog: false }), 0, 1.1, 0.31, g);
wBox(0.8, 0.5, 0.04, wM(0x3A4048), 0, 0.6, 0.31, g);
}
else if (look === "drill") {
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2, l = wCyl(0.05, 0.05, 2.6, wM(0x8A8E96), Math.cos(a) * 0.7, 1.2, Math.sin(a) * 0.7, g, 5); l.rotation.z = Math.cos(a) * 0.28; l.rotation.x = -Math.sin(a) * 0.28; });
wCyl(0.12, 0.12, 1.6, wM(0x3A3A3A), 0, 0.8, 0, g, 6);
wBox(0.5, 0.4, 0.5, wM(0xD8C8A0), 0, 2.4, 0, g);
}
else if (look === "tessera") {
m = wM(0x6A5438);
for (var j = 0; j < 3; j++) {
var b = wBox(1.2 + R(), 0.5, 0.7, m, (R() - 0.5) * 1.4, 0.25 + j * 0.15, (R() - 0.5) * 1.4, g);
b.rotation.set(0.2 * (R() - 0.5), R() * 3, 0.3 * (R() - 0.5));
}
wCyl(0.03, 0.03, 1.4, wM(0xC8C8C8), 1.2, 0.7, 0.6, g, 4);
wBox(0.4, 0.25, 0.02, wB(0xE8A040), 1.4, 1.3, 0.6, g);
}
else if (look === "salvage") {
m = wM(0x9A9890);
wBox(1.4, 0.3, 0.9, m, 0, 0.15, 0, g).rotation.y = R() * 3;
var sp = wSph(0.6, wM(0xB8B4A8), 0.6, 0.45, 0.4, g, 10);
sp.scale.y = 0.7;
wCyl(0.04, 0.04, 1.4, wM(0x5A5650), -0.5, 0.5, -0.3, g, 5).rotation.z = 0.9;
}
else if (look === "n2") {
m = wM(0xEEF2F6, { e: 0x101418 });
for (var k = 0; k < 3; k++) {
var mo = wSph(0.8 + R() * 0.5, m, (R() - 0.5) * 1.6, 0.1, (R() - 0.5) * 1.6, g, 10);
mo.scale.y = 0.35;
}
}
else if (look === "waterice") {
m = wM(0xC8D8E8);
for (var q = 0; q < 3; q++) {
var c = wBox(0.9 + R() * 0.6, 0.9 + R() * 1.2, 0.8, m, (R() - 0.5) * 1.6, 0.6, (R() - 0.5) * 1.6, g);
c.rotation.set(0.2 * (R() - 0.5), R() * 3, 0.2 * (R() - 0.5));
}
}
else if (look === "tholin") {
var pt = wMesh(new THREE.CircleGeometry(2, 14), wM(0x6A3A22), 0, 0.03, 0, g);
pt.rotation.x = -Math.PI / 2;
for (var t = 0; t < 3; t++)
wSph(0.25 + R() * 0.2, wM(0x8A4A2A), (R() - 0.5) * 2, 0.12, (R() - 0.5) * 2, g, 8);
}
else if (look === "methane") {
m = wM(0xF4F8FF, { e: 0x182028 });
for (var u = 0; u < 5; u++) {
var sp2 = wMesh(new THREE.ConeGeometry(0.25 + R() * 0.2, 0.6 + R() * 0.8, 6), m, (R() - 0.5) * 1.6, 0.4, (R() - 0.5) * 1.6, g);
}
}
else if (look === "crystal") {
m = wM(0x8FE0FF, { e: 0x2A6A8A, op: 0.92 });
for (var v = 0; v < 5; v++) {
var cr = wMesh(new THREE.CylinderGeometry(0.02, 0.28, 1.2 + R() * 1.4, 6), m, (R() - 0.5) * 1.2, 0.6, (R() - 0.5) * 1.2, g);
cr.rotation.set((R() - 0.5) * 0.6, R() * 3, (R() - 0.5) * 0.6);
}
}
else if (look === "fruit") {
var st = wCyl(0.12, 0.18, 1.6, wM(0x4A3A6A), 0, 0.8, 0, g, 6);
var cap = wSph(1.1, wM(0x3A8A7A, { e: 0x103A30 }), 0, 1.9, 0, g, 10);
cap.scale.y = 0.7;
for (var f = 0; f < 5; f++) {
var a2 = f / 5 * Math.PI * 2;
wSph(0.17, wM(0xFFE89A, { e: 0x6A5020 }), Math.cos(a2) * 0.9, 1.5, Math.sin(a2) * 0.9, g, 8);
}
}
else if (look === "dew") {
for (var b2 = 0; b2 < 5; b2++) {
var a3 = b2 / 5 * Math.PI * 2, bx = Math.cos(a3) * 0.7, bz = Math.sin(a3) * 0.7;
wCyl(0.03, 0.03, 1, wM(0x4A8A5A), bx, 0.5, bz, g, 4);
var bell = wMesh(new THREE.ConeGeometry(0.22, 0.35, 8, 1, true), wM(0xE8C8FF, { e: 0x3A2A5A, ds: true }), bx, 1.05, bz, g);
bell.rotation.x = Math.PI;
}
}
else if (look === "intake") {
wCyl(0.5, 0.6, 1.2, wM(0x8A919C), 0, 0.6, 0, g, 12);
wCyl(0.35, 0.35, 0.3, wM(0x3A6AB8), 0, 1.35, 0, g, 12);
var pipe = wCyl(0.14, 0.14, 3, wM(0x6A707C), 0, 1.2, 1.4, g, 8);
pipe.rotation.x = Math.PI / 2;
wBox(0.6, 0.4, 0.05, wB(0x5AE07A, { fog: false }), 0, 0.8, -0.52, g);
}
else if (look === "hopper") {
wBox(2.2, 1.2, 1.6, wM(0x6A707C), 0, 0.6, 0, g);
for (var h = 0; h < 5; h++)
wMesh(new THREE.IcosahedronGeometry(0.3, 0), wM(0xE8F0FA, { e: 0x182030 }), (h - 2) * 0.4, 1.3, 0, g);
}
else if (look === "mast") {
wBox(1.2, 0.9, 0.9, wM(0xD8DCE2), 0, 0.45, 0, g);
wBox(0.8, 0.2, 0.04, wB(0x8FD8FF, { fog: false }), 0, 0.7, 0.46, g);
}
else if (look === "hydro") {
wBox(4.6, 0.12, 1.2, wM(0x2A6A8A, { op: 0.6 }), 0, 1.12, 0, g);
for (var p2 = 0; p2 < 6; p2++)
wSph(0.28, wM(0x5AAA4A), -2 + p2 * 0.8, 1.3, 0, g, 6);
}
S.add(g);
return g;
},
function (G, place, P, ground, solids) {
var R = wRand(place.length * 131 + 7), list = [];
(P.gather || []).forEach(function (spec) {
var pts = spec.spots ? spec.spots.slice() : [];
if (spec.at) {
var a = spec.at;
for (var i = 0; i < a[3]; i++) {
var an = i / a[3] * Math.PI * 2 + R() * 0.6, d = a[2] * (0.35 + R() * 0.65);
pts.push([a[0] + Math.cos(an) * d, a[1] + Math.sin(an) * d]);
}
}
pts.forEach(function (q, i) {
var y = ground(q[0], q[1]), id = place + "-" + spec.k + "-" + i;
var g = owNodeLook(G, spec.look, q[0], y, q[1], R);
var glow = wGlow(0x9AD8FF, 3.2, 0.28);
glow.position.set(0, 1.2, 0);
g.add(glow);
list.push({ id: id, k: spec.k, x: q[0], z: q[1], g: g, glow: glow, look: spec.look, place: place });
});
});
return list;
},
function (L, c, place, ground) {
var look = c.look || {};
if (!c.look && !c.room)
look = { layer: "uniform", layerColor: 0x24335E, bottom: 0x1A2238, shoes: 0x111111, hat: "helmet", hatColor: 0xF2F2F0 };
if (!c.look && c.room)
look = { layer: "uniform", layerColor: 0x24335E, bottom: 0x1A2238, shoes: 0x111111 };
var g = wPerson("ow_" + place + "_" + c.id, { title: c.title, place: OW_PLACES[place].post, look: look });
g.position.set(c.x, ground(c.x, c.z), c.z);
g.rotation.y = c.rot || 0;
L.add(g);
var P = OW_PLACES[place];
var who = { g: g, c: c, x: c.x, z: c.z, place: place,
talk: { name: c.name, title: c.title, greet: c.greet,
persona: "You are " + c.name + ", " + c.who + ", at " + P.post + " on " + P.name + ", a Space Corp post in SomnuMatrix (the Space Corp is a branch of the city's Dragon Corp). Stay in character, speak warmly and briefly, share real, checked science about " + P.name + " when asked, and keep it suitable for all ages. You may only promise what you can really do here." } };
OW.crew.push(who);
return who;
},
function (S, k, ground) {
var y = ground(-14, 10);
wCyl(4, 4.2, 0.3, wM(0x5A5E66), -14, y + 0.15, 10, S, 24);
var ring = wMesh(new THREE.RingGeometry(2.8, 3.2, 32), wB(0xE8C27A), -14, y + 0.32, 10, S);
ring.rotation.x = -Math.PI / 2;
var sg = wSign(["GRAND TOUR LINE · SHUTTLE STOP", "Earth, and on round the planets", "Press E on the pad"], 3.6, 1.4, "#0E1A2E", "#E8C27A");
sg.position.set(-14, y + 2.2, 6.4);
S.add(sg);
wBox(0.12, 1.6, 0.12, wM(0x666666), -14, y + 0.8, 6.4, S);
owSpot(-14, 10, 4.5, "<b>Grand Tour Line shuttle stop</b> · the shuttles home to Earth and on round the planets", function () { if (typeof orbDepartures === "function")
orbDepartures(k); });
},
function (S, k, x, z, ground, rot) {
var C = OW_PLACES[k].chal;
if (!C)
return;
var y = ground(x, z);
var sg = wSign([C.name.toUpperCase(), "A Space Corp challenge", "Press E to take it on"], 3, 1.3, "#1A1022", "#E8C27A");
sg.position.set(x, y + 1.9, z);
sg.rotation.y = rot || 0;
S.add(sg);
[-1, 1].forEach(function (s) { wBox(0.1, 1.4, 0.1, wM(0x666666), x + Math.cos(rot || 0) * s * 1.3, y + 0.7, z - Math.sin(rot || 0) * s * 1.3, S); });
owSpot(x, z, 3, "🏁 <b>" + esc(C.name) + "</b> · a challenge", function () { owChalCard(k); });
},
function (S, x, z, y) {
var cv = wM(0xBEBCB6), lg = wM(0x8A8E96);
[[-3.6, -3.6], [3.6, -3.6], [-3.6, 3.6], [3.6, 3.6]].forEach(function (q) { wCyl(0.08, 0.1, 3.2, lg, x + q[0], y + 1.6, z + q[1], S, 6); });
wBox(8, 0.12, 8, cv, x, y + 3.25, z, S);
var sh = wMesh(new THREE.CircleGeometry(4.6, 16), wM(0x101012, { op: 0.45 }), x, y + 0.05, z, S);
sh.rotation.x = -Math.PI / 2;
},
function (k) {
var P = OW_PLACES[k], G = WORLDS.surface.g;
if (!P || !G)
return;
owReset(k);
var S = new THREE.Group(), L = new THREE.Group();
OW.G = L;
var ground = function (x, z) { return SF.cfg && SF.cfg.cloud ? 0 : sfHeight(x, z); };
if (P.hall) {
var H = Object.assign({}, P.hall), top = -1e9;
for (var gx = -H.w / 2 - 3; gx <= H.w / 2 + 3; gx += 3)
for (var gz = -H.d / 2 - 3; gz <= H.d / 2 + 3; gz += 3)
top = Math.max(top, sfHeight(H.x + gx, H.z + gz));
H.y = top + 0.25;
owHall(S, L, H, SF.solids, k);
}
OW.nodes = owNodesBuild(S, k, P, ground, SF.solids);
OW.nodes.forEach(function (n) { n.glow.parent.remove(n.glow); n.glow.position.set(n.x, ground(n.x, n.z) + 1.2, n.z); L.add(n.glow); SF.solids.push({ x: n.x, z: n.z, r: 0.9, h: 1.4 }); });
(P.crew || []).forEach(function (c) { owCrewAdd(L, c, k, function (x, z) { return owInHall(x, z) ? OW.halls[0].y : ground(x, z); }); });
if (P.trade && P.trade.at)
owSpot(P.trade.at[0], P.trade.at[1], 2.6, "🛒 <b>" + esc(P.trade.name) + "</b> · buy, sell and refine", function () { owTradeCard(k); });
owLessonSpots(k);
if (!P.cloud && k !== "veyar")
owPad(S, k, ground);
if (k === "mercury") {
[[30, 128], [52, 128], [30, 152], [52, 152]].forEach(function (q, i) { owPiece(S, "solarfarm", q[0], ground(q[0], q[1]), q[1], 0, 0.55); });
var sf = wSign(["THE SUN FIELD", "Caloris Station's solar arrays", "Sunlight here is about seven times as strong as on Earth"], 4.4, 1.4, "#101820", "#E8E0C8");
sf.position.set(40, ground(40, 118) + 1.8, 118);
S.add(sf);
P.chal.shade.forEach(function (q) { owTent(S, q[0], q[1], ground(q[0], q[1])); });
owChalBoard(S, k, 70, 8, ground, -Math.PI / 2);
}
if (k === "venus") {
[[44, 74], [-36, 64], [-74, -24]].forEach(function (q) { if (typeof pdLander === "function")
pdLander(S, q[0], q[1], ground(q[0], q[1])); });
P.chal.posts.forEach(function (q) { if (q[0] === 44 && q[1] === 12)
return; owCoolPost(S, q[0], q[1], ground(q[0], q[1])); });
owCoolPost(S, 40, 16, ground(40, 16));
var tm = new THREE.Group(), ty = ground(36, 24);
tm.position.set(36, ty, 24);
S.add(tm);
wCyl(0.12, 0.16, 5, wM(0x8A8E96), 0, 2.5, 0, tm, 8);
wBox(0.7, 2.6, 0.2, wM(0xE8E4DC), 0, 3.2, 0, tm);
wBox(0.18, 2.1, 0.08, wB(0xD84A2A, { fog: false }), 0, 3.1, 0.12, tm);
var tl = wSign(["465 °C", "noon or midnight, pole or equator"], 1.6, 0.7, "#2A1A08", "#FFD8A0");
tl.position.set(0, 1.4, 0.15);
tm.add(tl);
SF.solids.push({ x: 36, z: 24, r: 0.4 });
owChalBoard(S, k, 40, 6, ground, -Math.PI / 2);
}
if (k === "pluto") {
P.chal.ridges.forEach(function (q) { var y = ground(q[0], q[1]), rr = wBox(16, 1.8, 1.6, wM(0xD8DCE6), q[0], y + 0.6, q[1], S); rr.rotation.y = q[2]; SF.solids.push({ x: q[0], z: q[1], hw: 8, hd: 0.8, rot: q[2], h: 1.8 }); });
var gm = wSign(["SPUTNIK PLANITIA ⟶", "the nitrogen glacier · the traverse runs this way"], 4, 1, "#101820", "#E8E0C8");
gm.position.set(120, ground(120, -60) + 1.6, -60);
gm.rotation.y = -0.6;
S.add(gm);
owChalBoard(S, k, 70, 8, ground, -Math.PI / 2);
}
if (k === "veyar")
owVeyarBuild(S, L, ground);
if (P.cloud)
owCloudBuild(S, L, k);
G.add(typeof ldPress === "function" ? ldPress(S) : S);
G.add(L);
},
function (S, L, k) {
var P = OW_PLACES[k], M = owMats();
owHall(S, L, { x: 38, z: 20, w: 14, d: 10, y: 0.02, door: "w", name: "The science module", rooms: [["lab", "The lab", -7, -5, 1, 5], ["crew", "Crew quarters", 1, -5, 7, 5, 1]], doors: [[1, 0, 1]] }, SF.solids, k);
owSpot(34, 23, 2, "🛒 <b>The lab counter</b> · buy, sell and refine", function () { owTradeCard(k); });
var R = wRand(k.length * 17 + 3), angs = [-2.6, -1.0, 1.75, -2.05];
(P.intakes || []).forEach(function (kind, i) {
var a = angs[i], x = Math.cos(a) * 55.5, z = Math.sin(a) * 55.5, g = owNodeLook(S, "intake", x, 0, z, R);
g.rotation.y = -a + Math.PI / 2;
var gl = wGlow(0x9AD8FF, 3, 0.28);
gl.position.set(x, 1.4, z);
L.add(gl);
SF.solids.push({ x: x, z: z, r: 0.8 });
OW.nodes.push({ id: k + "-intake-" + i, k: kind, x: x, z: z, g: g, glow: gl, look: "intake", place: k, label: "Skimmer intake " + (i + 1) });
});
if (P.hopper) {
var hg = owNodeLook(S, "hopper", -20, 0, -46, R), hgl = wGlow(0x9AD8FF, 3, 0.28);
hgl.position.set(-20, 1.6, -46);
L.add(hgl);
SF.solids.push({ x: -20, z: -46, hw: 1.1, hd: 0.8 });
OW.nodes.push({ id: k + "-hopper", k: P.hopper, x: -20, z: -46, g: hg, glow: hgl, look: "hopper", place: k, label: "The ring-ice hopper" });
}
if (P.mastGood) {
var mg = owNodeLook(S, "mast", 10, 0, -44, R), mgl = wGlow(0x9AD8FF, 3, 0.28);
mgl.position.set(10, 1.4, -44);
L.add(mgl);
OW.nodes.push({ id: k + "-mast", k: P.mastGood, x: 10, z: -44, g: mg, glow: mgl, look: "mast", place: k, label: "The balloon return bin" });
}
wBox(8, 0.3, 5, M.floor, 0, -0.15, -56, S);
wBox(0.2, 1.1, 5, M.wall2, -4, 0.55, -56, S);
wBox(0.2, 1.1, 5, M.wall2, 4, 0.55, -56, S);
var arm = wBox(0.5, 0.5, 9, wM(0xE8C27A), 0, 2.4, -61, S);
wBox(0.4, 3, 0.4, wM(0x8A919C), 0, 1.5, -57, S);
wSph(0.7, wM(0xD8DCE2), 0, 1.7, -65, L, 12);
owPiece(S, "console", 2.6, 0, -53, Math.PI, 0.8, SF.solids);
var pb = wSign(["PROBE BAY", "Atmosphere probes · press E at the rail"], 3.4, 1, "#0E1A2E", "#BFD8FF");
pb.position.set(0, 3.4, -53.4);
S.add(pb);
SF.solids.push({ x: 0, z: -58.6, hw: 4, hd: 0.2 });
OW.drop = { k: k, arm: arm };
var nm = OW_CLOUD_NAMES[k] || ["A crew member", "A crew member"], ti = P.crewTitles || ["Probe officer", "Skimmer operator"];
owCrewAdd(L, { id: "probe", name: nm[0], title: ti[0], x: 3.6, z: -50.5, rot: Math.PI, room: 1, greet: "Want to drop one? Watch the target drift, and remember: " + (k === "jupiter" ? "Jupiter pulls hard, so it falls fast." : k === "neptune" ? "lead it against the wind, or it'll be blown clean past." : "wind and weight both matter."), who: "the probe officer who drops atmosphere probes from the bay" }, k, function () { return 0; });
owCrewAdd(L, { id: "skim", name: nm[1], title: ti[1], x: -44, z: -30, rot: 0, wander: 6, room: 1, greet: k === "saturn" ? "Ring ice in, sorted by size. Grab a crate from the hopper if you're helping." : k === "neptune" ? "Balloon's back! The data core's in the return bin by the mast." : "The intakes are open. Fill a canister if you're helping out.", who: "a crew member who keeps the station's intakes and stores" }, k, function () { return 0; });
owChalBoard(S, k, -6, -46, function () { return 0; }, Math.PI);
var ts = wSign(["GRAND TOUR LINE · SHUTTLE STOP", "Earth, and on round the planets", "Press E here"], 3.2, 1.2, "#0E1A2E", "#E8C27A");
ts.position.set(-6, 2.2, -38.6);
S.add(ts);
wBox(0.12, 1.6, 0.12, wM(0x666666), -6, 0.8, -38.6, S);
var tr = wMesh(new THREE.RingGeometry(2.4, 2.8, 32), wB(0xE8C27A), -6, 0.03, -36, S);
tr.rotation.x = -Math.PI / 2;
owSpot(-6, -36, 2.8, "<b>Grand Tour Line shuttle stop</b> · the shuttles home to Earth and on round the planets", function () { if (typeof orbDepartures === "function")
orbDepartures(k); });
if (P.tullik)
owTullikMoor(S, L);
},
function (S, L, ground) {
owPiece(S, "habitat", 70, ground(70, 40), 40, 0, 0.9, SF.solids);
var em = wSign(["THE SPACE CORP EMBASSY", "to the Veyari · visitors welcome"], 4, 1.1, "#0E1A2E", "#BFD8FF");
em.position.set(70, ground(70, 47) + 3, 47.5);
S.add(em);
var cx = -70, cz = 30, cm = wM(0xC8A0F0, { e: 0x3A1A6A, op: 0.92 });
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, x = cx + Math.cos(a) * 7, z = cz + Math.sin(a) * 7, y = ground(x, z);
var c = wMesh(new THREE.CylinderGeometry(0.05, 0.5, 3.4, 6), cm, x, y + 1.7, z, S);
SF.solids.push({ x: x, z: z, r: 0.5 });
}
var mat = wMesh(new THREE.CircleGeometry(5, 24), wM(0x4A2A6A), cx, ground(cx, cz) + 0.04, cz, S);
mat.rotation.x = -Math.PI / 2;
var giver = sfVeyari();
giver.position.set(cx, ground(cx, cz - 2), cz - 2);
L.add(giver);
OW.crew.push({ g: giver, c: { id: "giver" }, x: cx, z: cz - 2, place: "veyar", veyari: 1, talk: { name: "Oruun of the Circle", title: "keeper of the Circle of Gifts",
persona: SP_ALIENS[0].persona + " You are Oruun, keeper of the Circle of Gifts on Veyar, where Veyari and visitors exchange gifts. The Veyari never sell for money: they give, and accept gifts from far places in return. Lightsilk is woven from the threads of the glowing groves.",
greet: "Light on your path. Here nothing is bought: a gift is given, and a gift returns. What have you carried from your far sun?" } });
var sx = -90, sz = -90;
OW.song = { crystals: [], glows: [] };
for (var j = 0; j < 5; j++) {
var a2 = Math.PI + 0.35 + j * (Math.PI - 0.7) / 4, x2 = sx + Math.cos(a2) * 8, z2 = sz - Math.sin(a2) * 8, y2 = ground(x2, z2);
var cg = new THREE.Group();
cg.position.set(x2, y2, z2);
L.add(cg);
var mt = wM(OW_SONG_COL[j], { e: OW_SONG_COL[j], ei: 0.15, op: 0.92 });
var cr = wMesh(new THREE.CylinderGeometry(0.1, 0.9, 4 + j * 0.4, 6), mt, 0, 2 + j * 0.2, 0, cg);
var gl = wGlow(OW_SONG_COL[j], 7, 0);
gl.position.set(0, 3, 0);
cg.add(gl);
OW.song.crystals.push(mt);
OW.song.glows.push(gl);
SF.solids.push({ x: x2, z: z2, r: 0.9 });
}
var host = sfVeyari();
host.position.set(sx, ground(sx, sz + 4), sz + 4);
host.rotation.y = Math.PI;
L.add(host);
OW.crew.push({ g: host, c: { id: "song" }, x: sx, z: sz + 4, place: "veyar", veyari: 1, talk: { name: "Sela of the Song", title: "singer of the crystals",
persona: SP_ALIENS[0].persona + " You are Sela, who sings with the five Singing Crystals of Veyar: each crystal holds one note, and the Veyari teach their children by singing phrases for them to sing back.",
greet: "Each crystal keeps one note. I sing; you sing back. Will you try?" } });
owChalBoard(S, "veyar", sx + 4, sz + 10, ground, 0);
},
function (dt) {
var L = worldLocal(), now = Date.now(), badge = owBadge();
OW.t = (OW.t || 0) + dt;
OW.doors.forEach(function (d) {
var near = badge && Math.hypot(L.x - d.x, L.z - d.z) < 2.6;
var want = near ? 1 : 0;
d.open += (want - d.open) * Math.min(1, dt * 6);
d.leaf.position.y = d.y + 1.15 + d.open * 2.2;
d.leaf.visible = d.open < 0.97;
if (d.open > 0.6) {
d.sol.hw = -9;
d.sol.hd = -9;
}
else {
d.sol.hw = d.hw0;
d.sol.hd = d.hd0;
}
});
OW.nodes.forEach(function (n) { var ready = !(OW.picked[n.id] > now), d = Math.hypot(L.x - n.x, L.z - n.z); n.glow.visible = ready && d < 60; });
var gf = WLD.on !== "surface" || SF.cfg && SF.cfg.cloud ? function () { return 0; } : function (x, z) { return owGround(x, z, sfHeight(x, z)); };
OW.crew.forEach(function (w) { if (w.c.wander)
wWander(w.g, dt, gf, { r: w.c.wander, sp: 0.6 }); w.x = w.g.position.x; w.z = w.g.position.z; });
if (OW.song)
owSongTick(dt);
if (OW.chal) {
owChalTick(dt, L);
return;
}
owHud(owlArrow(L) || null);
OW.pt = (OW.pt || 0) + dt;
if (OW.pt < 0.12 && OW.near !== undefined) {
if (OW.near)
worldPrompt(OW.near.html, OW.near.fn);
return;
}
OW.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
OW.near = null;
return;
}
OW.near = owNearest(L, now, badge);
if (OW.near)
worldPrompt(OW.near.html, OW.near.fn);
},
function (L, now, badge) {
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
OW.crew.forEach(function (w) { cand(w.x, w.z, 2.6, function () { owCrewCard(w); }, "<b>" + esc(w.talk.name) + "</b>" + (w.talk.title ? ", " + esc(w.talk.title) : "") + " · <b>press E</b> to talk"); });
OW.spots.forEach(function (s) { cand(s.x, s.z, s.r, s.fn, s.label + " · <b>press E</b>"); });
if (bd > 0.5)
OW.nodes.forEach(function (n) { cand(n.x, n.z, 2.8, function () { owGather(n); }, owNodePrompt(n, now)); });
if (!best && !badge)
OW.doors.forEach(function (d) { cand(d.x, d.z, 2.2, function () { owStaffOnly(); }, "🔒 <b>Staff only</b> · a Space Corp badge opens this door"); });
return best;
},
function (n, now) {
var g = OW_GOOD[n.k] || {}, nm = n.label || g.n || n.k;
if (OW.picked[n.id] > now) {
var m = Math.max(1, Math.ceil((OW.picked[n.id] - now) / 60000));
return "<b>" + esc(nm) + "</b> · gathered; ready again in about " + m + " minute" + (m > 1 ? "s" : "");
}
return "<b>" + esc(nm) + "</b> · " + (g.e || "") + " <b>press E</b> to gather " + esc((g.n || "").toLowerCase());
},
function (w) {
var P = OW_PLACES[w.place], id = w.c.id, h = "";
var fns = { talk: function () { worldCard(null); owTalk(w.talk, P ? P.post : ""); } };
h += owTitle(esc(w.talk.name)) + "<div style='opacity:.8;margin-bottom:6px'>" + esc(w.talk.title || "") + (P ? " · " + esc(P.post) : "") + "</div>";
h += "<div style='margin:6px 0;font-style:italic'>\"" + esc(w.talk.greet || "") + "\"</div>";
h += owBtn("talk", "💬 Talk", "ask anything");
if (P && P.trade && (id === "clerk" || id === "store" || id === "probe" && P.cloud)) {
h += owBtn("trade", "🛒 " + esc(P.trade ? P.trade.name : "The counter"), "buy supplies, sell what you gathered, refine it");
fns.trade = function () { owTradeCard(w.place); };
}
if (P && P.cloud && id === "skim") {
h += owBtn("trade", "🛒 The lab counter", "buy supplies, sell, crack hydrogen into fuel");
fns.trade = function () { owTradeCard(w.place); };
}
if (id === "cook") {
h += owBtn("eat", "🍲 A hot meal", "a ration pack, served hot (6 gold)");
fns.eat = function () { owBuy("ow_ration", 1, function () { owEat("ow_ration"); }); };
}
if (P && P.chal && (id === "tech" || id === "ctl" || id === "drill" || id === "probe" || id === "song")) {
h += owBtn("chal", "🏁 " + esc(P.chal ? P.chal.name : "The challenge"), "take it on");
fns.chal = function () { owChalCard(w.place); };
}
if (P && P.cloud && id === "probe") {
h += owBtn("chal", "🏁 Drop a probe", "into the clouds of " + esc(P.name));
fns.chal = function () { owChalCard(w.place); };
}
var ls = OW_LESSONS.filter(function (l) { return l.w === w.place; });
if (ls.length && (/sci|Dr |geo|chief|envoy|interp/i.test(w.talk.name + " " + (w.talk.title || "") + " " + id))) {
h += owBtn("learn", "🎓 A lesson", "World Learning: The Outer Worlds");
fns.learn = function () { owCourseCard(w.place); };
}
if (w.veyari && id === "giver") {
h += owBtn("gift", "🎁 The Circle of Gifts", "give something from far away; receive a gift of Veyar");
fns.gift = function () { owTradeCard("veyar"); };
}
if (w.veyari && id === "song") {
h += owBtn("chal", "🎵 Sing with the crystals", "the Crystal Song");
fns.chal = function () { owChalCard("veyar"); };
}
if (id === "envoy" || id === "interp") {
h += owBtn("jobs", "📋 Work for the Space Corp here", "the posts on " + esc(P.name));
fns.jobs = function () { owJobsCard(w.place); };
}
if (id === "clerk" || id === "chief") {
h += owBtn("jobs", "📋 Jobs here", "the Space Corp's posts on " + esc(P.name));
fns.jobs = function () { owJobsCard(w.place); };
}
worldCard(h, fns);
},
function (place) {
var P = OW_PLACES[place], list = OW_JOBS.filter(function (j) { return j[2] === place; }), h = owTitle("📋 The Space Corp on " + esc(P.name));
h += "<div style='opacity:.85;margin-bottom:6px'>Real posts, paid by the hour like every job in Somnucor. Apply at the jobs board in the Space Corp Spaceport, or on the jobs page. Holding one opens the staff doors here, and your shift counts while you work on " + esc(P.name) + ".</div>";
list.forEach(function (j) {
h += "<div style='margin:6px 0;padding:6px 9px;border:1px solid rgba(143,180,232,.35);border-radius:4px'><b>" + esc(j[1]) + "</b> · " + j[3] + " gold an hour · " + j[4] + " post" + (j[4] > 1 ? "s" : "") + (j[5] ? "" : " · hired by the head of the Spaceport") +
"<div style='font-size:12px;opacity:.8'>" + esc(j[7].map(function (t) { return t[0]; }).join("; ")) + "</div></div>";
});
var fns = {};
if (typeof showJobBoard === "function") {
h += owBtn("apply", "📋 Open the job board", "to apply");
fns.apply = function () { worldCard(null); showJobBoard(); };
}
worldCard(h, fns);
},
function (n) {
var g = OW_GOOD[n.k];
if (!g || OW.busy)
return;
if (OW.picked[n.id] > Date.now()) {
owGoodCard(n.k);
return;
}
var mins = g.g || 15;
OW.picked[n.id] = Date.now() + mins * 60000;
owPickedSave();
if (typeof playTone === "function")
playTone(760, 0.12);
if (!owSigned()) {
setStatus("<b>You gather " + esc(g.n.toLowerCase()) + "</b> " + g.e + ". Sign in and what you gather goes to your backpack, to sell, refine, trade or eat.");
return;
}
OW.busy = true;
owRpc("ow_gather", { p_kind: n.k, p_spot: n.id }).then(function (o) {
OW.busy = false;
if (!o || o.ok === false) {
setStatus(esc((o && o.say) || "Not just now."));
if (o && o.wait) {
OW.picked[n.id] = Date.now() + o.wait * 1000;
owPickedSave();
}
else if (!o || !o.cap) {
delete OW.picked[n.id];
owPickedSave();
}
return;
}
var line = "<b>You gather " + o.got + " " + esc(g.n.toLowerCase()) + "</b> " + g.e + " (in your backpack)";
if (o.extra)
line += ", and " + o.extra_n + " " + esc(owGoodName(o.extra).toLowerCase()) + " " + owGoodIcon(o.extra) + " with it";
if (o.crew)
line += ". Crew rate: one extra for working here";
line += "." + (o.cap && o.units >= o.cap ? " That is all you can carry back today." : "");
setStatus(line);
if (typeof loadStock === "function")
loadStock();
})
.catch(function (e) { OW.busy = false; delete OW.picked[n.id]; owPickedSave(); setStatus(owSoft(e)); });
},
function (k) {
var g = OW_GOOD[k];
if (!g)
return;
var rows = [["The city pays", g.b + " gold each, anywhere stock is sold"]];
if (g.fd || g.dr)
rows.push(["Eaten as it is", (g.fd ? "food +" + g.fd : "") + (g.fd && g.dr ? ", " : "") + (g.dr ? "drink +" + g.dr : "")]);
if (g.pool)
rows.push(["Fills", "the city's " + g.pool + " store"]);
var uses = OW_REFINE.filter(function (r) { return r.need[k]; }).map(function (r) { return r.n; }).concat(OW_SWAPS.filter(function (s) { return s.give[k]; }).map(function (s) { return (s.who === "tullik" ? "Pip-Tullik swaps it for " : "The Veyari give ") + owGoodName(s.get).toLowerCase(); }));
worldCard(worldFacts(g.e + " " + g.n, "", rows, [g.note].concat(uses.length ? ["Used for: " + uses.join("; ")] : [])), {});
},
function (place, msg, tab) {
var P = OW_PLACES[place], T = P && P.trade;
if (!T && !P.cloud)
return;
var name = T ? T.name : "The lab counter", sells = T ? T.sells : ["ow_ration", "ow_pouch", "ow_soup"], refine = T ? T.refine : place;
if (P.cloud) {
sells = ["ow_ration", "ow_pouch", "ow_soup"];
name = "The lab counter, " + P.post;
}
var fns = {}, h = owTitle(esc(name));
var vey = !!(P.trade && P.trade.veyari);
if (vey && !tab)
return owGiftCard(msg);
tab = tab || "buy";
if (vey) {
name = "The Space Corp embassy's counter";
h = owTitle(esc(name));
h += owBtn("gifts", "🎁 Back to the Circle of Gifts", "");
fns.gifts = function () { owGiftCard(); };
}
(vey ? ["sell", "refine"] : ["buy", "sell", "refine"]).forEach(function (t) {
var on = t === tab;
h += "<span data-w='t-" + t + "' role='button' style='display:inline-block;margin:4px 6px 4px 0;padding:4px 10px;border-radius:12px;border:1px solid rgba(143,180,232,.5);" + (on ? "background:rgba(143,180,232,.25)" : "") + "'>" + (t === "buy" ? "🛒 Buy" : t === "sell" ? "🪙 Sell" : "⚙️ Refine") + "</span>";
fns["t-" + t] = function () { owTradeCard(place, null, t); };
});
if (msg)
h += "<div style='margin:6px 0;color:#FFE7B0'>" + msg + "</div>";
if (!owSigned())
h += "<div style='opacity:.75;margin:6px 0'>Sign in to trade: what you buy and gather is kept in your backpack.</div>";
if (tab === "buy") {
h += "<div style='opacity:.85;margin:4px 0'>Supplies the Corp ships out. Paid to the city; eat them here or carry them home.</div>";
sells.forEach(function (k) {
var g = OW_GOOD[k];
if (!g || !g.pr)
return;
h += owBtn("b-" + k, g.e + " " + esc(g.n) + " · " + g.pr + " gold", (g.fd || g.dr ? "food +" + (g.fd || 0) + (g.dr ? ", drink +" + g.dr : "") + " · " : "") + "you have " + owHave(k));
fns["b-" + k] = function () { owBuy(k, 1, function (m) { owTradeCard(place, m, "buy"); }); };
if (g.fd || g.dr) {
h += "<div style='margin:-2px 0 6px 12px'><span data-w='e-" + k + "' role='button' style='font-size:12px;text-decoration:underline'>buy one and " + (g.fd ? "eat" : "drink") + " it now</span></div>";
fns["e-" + k] = function () { owBuy(k, 1, function () { owEat(k, function (m) { owTradeCard(place, m, "buy"); }); }); };
}
});
}
else if (tab === "sell") {
h += "<div style='opacity:.85;margin:4px 0'>The post buys for the city's stores, at the city's price.</div>";
var S = owOuterStock();
if (!S.length)
h += "<div style='opacity:.75'>Nothing from out here in your backpack yet. Gather something and bring it in.</div>";
S.forEach(function (s) {
var k = s.kind, buys = +s.buys || ((OW_GOOD[k] || {}).b) || 1;
h += owBtn("s-" + k, owGoodIcon(k) + " " + esc(owGoodName(k)) + " × " + s.amount, "sell one for " + buys + " gold" + (s.amount > 1 ? " · or all for " + (s.amount * buys) : ""));
fns["s-" + k] = function () { owSell(k, 1, function (m) { owTradeCard(place, m, "sell"); }); };
if (s.amount > 1) {
h += "<div style='margin:-2px 0 6px 12px'><span data-w='sa-" + k + "' role='button' style='font-size:12px;text-decoration:underline'>sell all " + s.amount + "</span></div>";
fns["sa-" + k] = function () { owSell(k, s.amount, function (m) { owTradeCard(place, m, "sell"); }); };
}
});
}
else {
var list = OW_REFINE.filter(function (r) { return r.at.indexOf(refine) >= 0; });
h += "<div style='opacity:.85;margin:4px 0'>Turn what you gathered into something worth more, or something the forges use.</div>";
if (!list.length)
h += "<div style='opacity:.75'>Nothing is refined at this post. The Ares Gateway's fab shop refines everything.</div>";
list.forEach(function (r) {
var can = true, need = Object.keys(r.need).map(function (k) { if (owHave(k) < r.need[k])
can = false; return r.need[k] + " " + owGoodName(k).toLowerCase() + " (" + owHave(k) + ")"; }).join(", ");
h += owBtn("r-" + r.k, (can ? "" : "<span style='opacity:.55'>") + owGoodIcon(r.make) + " " + esc(r.n) + (r.x > 1 ? " · makes " + r.x : "") + (can ? "" : "</span>"), "needs " + esc(need));
fns["r-" + r.k] = function () { if (!can) {
owTradeCard(place, "You need " + esc(need) + ".", "refine");
return;
} owRefine(r.k, function (m) { owTradeCard(place, m, "refine"); }); };
});
}
worldCard(h, fns);
},
function (k, n, after) {
if (!owSigned()) {
setStatus("Sign in to buy: it is kept in your backpack.");
return;
}
if (OW.busy)
return;
OW.busy = true;
owRpc("ow_buy", { p_kind: k, p_amount: n }).then(function (o) {
OW.busy = false;
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () {
if (o && o.ok === false) {
if (after)
after(esc(o.say || "Not just now."));
else
setStatus(esc(o.say || ""));
return;
}
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (after)
after(esc((o && o.say) || "Bought."));
else
setStatus(esc((o && o.say) || ""));
});
})
.catch(function (e) { OW.busy = false; if (after)
after(owSoft(e));
else
setStatus(owSoft(e)); });
},
function (k, after) {
if (!owSigned() || OW.busy)
return;
OW.busy = true;
owRpc("ow_eat", { p_kind: k }).then(function (o) {
OW.busy = false;
if (o && o.ok !== false && typeof needsGot === "function")
try {
needsGot(o);
}
catch (e) { }
setStatus(esc((o && o.say) || ""));
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { if (after)
after(esc((o && o.say) || "")); });
})
.catch(function (e) { OW.busy = false; setStatus(owSoft(e)); });
},
function (k, n, after) {
if (!owSigned() || OW.busy)
return;
OW.busy = true;
owRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
OW.busy = false;
var ok = o === "ok";
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () {
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
var m = ok ? "Sold " + n + " " + esc(owGoodName(k).toLowerCase()) + " to the city." : esc(String(o));
if (after)
after(m);
else
setStatus(m);
});
})
.catch(function (e) { OW.busy = false; if (after)
after(owSoft(e));
else
setStatus(owSoft(e)); });
},
function (rk, after) {
if (!owSigned() || OW.busy)
return;
OW.busy = true;
owRpc("ow_refine", { p_key: rk, p_place: owHere() || "" }).then(function (o) {
OW.busy = false;
if (typeof playTone === "function")
playTone(520, 0.2);
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { after(esc((o && o.say) || "")); });
})
.catch(function (e) { OW.busy = false; after(owSoft(e)); });
},
function (who, fns, back) {
var h = "";
OW_SWAPS.filter(function (s) { return s.who === who; }).forEach(function (s) {
var can = true, give = Object.keys(s.give).map(function (k) { if (owHave(k) < s.give[k])
can = false; return s.give[k] + " " + owGoodName(k).toLowerCase() + " (" + owHave(k) + ")"; }).join(" and ");
h += owBtn("w-" + s.k, (can ? "" : "<span style='opacity:.55'>") + owGoodIcon(s.get) + " " + (s.x > 1 ? s.x + " × " : "") + esc(owGoodName(s.get)) + (can ? "" : "</span>"), "for " + esc(give));
fns["w-" + s.k] = function () { if (!can) {
back("You need " + esc(give) + ".");
return;
} owSwap(s, back); };
});
return h;
},
function (s, back) {
if (!owSigned()) {
back("Sign in to trade: it is kept in your backpack.");
return;
}
if (OW.busy)
return;
OW.busy = true;
owRpc("ow_swap", { p_key: s.k }).then(function (o) {
OW.busy = false;
if (typeof playTone === "function")
playTone(660, 0.18);
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { back(o && o.ok ? "\"" + esc(s.say) + "\" " + esc(o.say || "") : esc((o && o.say) || "Not just now.")); });
})
.catch(function (e) { OW.busy = false; back(owSoft(e)); });
},
function (msg) {
var fns = {}, h = owTitle("🎁 The Circle of Gifts", "#E8C8FF");
h += "<div style='opacity:.85;margin:4px 0'>The Veyari never sell for gold. Here, a gift from a far place is answered with a gift of Veyar. They are fondest of things from the farthest worlds.</div>";
if (msg)
h += "<div style='margin:6px 0;color:#FFE7B0'>" + msg + "</div>";
if (!owSigned())
h += "<div style='opacity:.75'>Sign in to exchange gifts: they are kept in your backpack.</div>";
h += owSwapRows("veyari", fns, owGiftCard);
h += owBtn("sell", "🪙 Sell to the embassy", "the Space Corp's embassy buys for the city");
fns.sell = function () { owTradeCard("veyar", null, "sell"); };
worldCard(h, fns);
},
function (l) {
if (OWL.cur !== l.k) {
OWL.cur = l.k;
OWL.ans = {};
OWL.msg = "";
OWL.t0 = Date.now();
if (owSigned())
owRpc("school_begin", { p_course: "world-outer", p_unit: l.n }).catch(function () { });
}
if (OWL.guide === l.k)
OWL.guide = null;
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + OW_LESSONS.length + " · World Learning: The Outer Worlds · the Department of Education" + (owlDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>The science.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
owlOpt(l, k).forEach(function (o, j) {
var on = OWL.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { OWL.ans[k] = o; owlCheck(l); owLessonCard(l); };
});
});
if (OWL.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + OWL.msg + "</div>";
b += owBtn("all", "🎓 Every lesson", "your record: " + owlCount() + " of " + OW_LESSONS.length + " stamped");
fns.all = function () { owCourseCard(); };
worldCard(owTitle("🎓 " + esc(l.title), "#BFD8FF") + b, fns);
},
function (l) {
if (owlDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return OWL.ans[k] === q[1]; }))
return;
var L = owlLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
save();
var n = owlCount();
OWL.msg = "🚀 Stamped: " + esc(l.title) + ". " + n + " of " + OW_LESSONS.length + "." + (n === OW_LESSONS.length ? " <b>Outer Worlds Explorer!</b> The certificate is in your backpack." : "");
setStatus("<b>Outer Worlds stamp</b> (" + n + " of " + OW_LESSONS.length + ")." + (n === OW_LESSONS.length ? " <b>You are an Outer Worlds Explorer.</b>" : ""));
if (owSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - OWL.t0));
setTimeout(function () { owRpc("school_pass", { p_course: "world-outer", p_unit: l.n }).catch(function () { }); }, wait);
}
},
function (place) {
var fns = {}, here = owHere(), seen = OW_LESSONS.filter(owlSeen);
var h = "<div style='opacity:.85'>Lessons taught where they happen, on Mercury, Venus, Pluto, the four cloud stations and the Ares Gateway" + (seen.length < OW_LESSONS.length ? ", and somewhere farther still" : ", and on Veyar") + ". Get both questions right at each for a stamp; all " + OW_LESSONS.length + " make an <b>Outer Worlds Explorer</b>. " + owlCount() + " stamped so far.</div>";
var list = place ? seen.filter(function (l) { return l.w === place; }).concat(seen.filter(function (l) { return l.w !== place; })) : seen;
list.forEach(function (l) {
var nm = "l-" + l.k;
h += owBtn(nm, (owlDone(l.n) ? "🚀 " : "○ ") + l.n + ". " + esc(l.title), "at " + esc(owlWhere(l)) + (here === l.w ? " · tap to be shown the way" : ""));
fns[nm] = function () { if (here !== l.w) {
owLessonCard(l);
return;
} OWL.guide = l.k; worldCard(null); setStatus("<b>" + esc(l.title) + "</b>: follow the arrow at the top."); };
});
worldCard(owTitle("World Learning: The Outer Worlds", "#BFD8FF") + h, fns);
},
function (place) {
var P = OW_PLACES[place];
if (!P)
return null;
if (P.chal)
return P.chal;
if (P.drop)
return { k: place.slice(0, 2) + "_drop", kind: "drop", name: "The Probe Drop", max: 300, min: 0, reward: place === "neptune" ? "ow_ne_storm" : "ow_he3",
about: "Drop three atmosphere probes from the bay onto " + P.drop.target + " drifting on the clouds below. " + P.name + " pulls at " + P.drop.g + " m/s², so a probe falls the 118 metres in " + Math.sqrt(2 * 118 / P.drop.g).toFixed(1) + " seconds, and the wind carries it as it falls: lead the target." };
return null;
},
function (place, msg) {
var C = owChalSpec(place);
if (!C)
return;
var best = owBestGet(C.k), timed = OW_CHAL_TIMED[C.kind], fns = {};
var h = owTitle("🏁 " + esc(C.name)) + "<div style='margin:6px 0'>" + esc(C.about) + "</div>";
h += "<div style='opacity:.8;font-size:12.5px'>" + (timed ? "Against the clock. " : "Scored out of " + C.max + ". ") + "Your best: " + (best == null ? "none yet" : timed ? owSecs(best) : best) + ". Finish it and, once a day, the Space Corp pays 20 gold and " + esc(owGoodName(C.reward).toLowerCase()) + " (for those who pay their dues).</div>";
if (msg)
h += "<div style='margin:8px 0;color:#FFE7B0'>" + msg + "</div>";
h += owBtn("go", "Start", C.kind === "song" ? "Sela sings first; then you" : C.kind === "drop" ? "walk to the rail of the probe bay" : C.kind === "edl" ? "strap in" : "the clock starts now");
fns.go = function () { worldCard(null); owChalStart(place); };
if (owSigned()) {
h += owBtn("top", "🏆 The best so far", "on this challenge");
fns.top = function () { owChalTop(place, C); };
}
worldCard(h, fns);
},
function (place, C) {
owRpc("ow_challenge_top", { p_key: C.k }).then(function (rows) {
var timed = OW_CHAL_TIMED[C.kind];
worldCard(worldFacts("🏆 " + C.name, "The best so far", (rows || []).map(function (r, i) { return [(i + 1) + ". " + (r.name || "A dreamer"), timed ? owSecs(r.score) : String(r.score)]; }), (rows && rows.length) ? [] : ["No one yet. Be the first."]), {});
})
.catch(function (e) { worldCard(worldFacts(C.name, "", [], [owSoft(e)]), {}); });
},
function (x, z, y, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
var c = wMesh(new THREE.CylinderGeometry(0.6, 0.6, 60, 10, 1, true), wB(col || 0x8FD8FF, { op: 0.22, ds: true, fog: false }), 0, 30, 0, g);
var r = wMesh(new THREE.RingGeometry(2.6, 3.4, 32), wB(col || 0x8FD8FF, { op: 0.6, ds: true }), 0, 0.15, 0, g);
r.rotation.x = -Math.PI / 2;
OW.G.add(g);
return g;
},
function (place) {
var C = owChalSpec(place);
if (!C)
return;
owChalStop(true);
var X = { place: place, C: C, kind: C.kind, t: 0, i: 0, heat: 0, cool: 100, dl: 0, score: 0, n: 0 };
OW.chal = X;
if (owSigned())
owRpc("ow_challenge_start", { p_key: C.k }).catch(function () { });
if (C.beacons) {
X.b = owBeacon(C.beacons[0][0], C.beacons[0][1], owAt(C.beacons[0][0], C.beacons[0][1]), C.kind === "cool" ? 0xFFB070 : 0x8FD8FF);
}
if (C.kind === "song")
owSongStart(X);
if (C.kind === "drop")
owDropStart(X);
if (C.kind === "edl")
owEdlStart(X);
setStatus("<b>" + esc(C.name) + ".</b> " + (C.kind === "heat" ? "Go! Keep to the shade where you can." : C.kind === "cool" ? "Go! Watch your cooling." : C.kind === "run" ? "Go! Jump the ridges." : ""));
if (typeof playTone === "function")
playTone(660, 0.25);
},
function (score) {
var X = OW.chal;
if (!X)
return;
var C = X.C, place = X.place, timed = OW_CHAL_TIMED[C.kind];
owChalStop();
var best = owBestGet(C.k), better = best == null || (timed ? score < best : score > best);
if (better)
owBestSet(C.k, score);
var line = (timed ? "Done in " + owSecs(score) : "You scored " + score + " of " + C.max) + "." + (better ? " A new best for you!" : "");
if (typeof playTone === "function") {
playTone(660, 0.2);
setTimeout(function () { playTone(880, 0.35); }, 220);
}
if (!owSigned()) {
owChalCard(place, line + " Sign in to be paid and to go on the board.");
return;
}
owRpc("ow_challenge_done", { p_key: C.k, p_score: Math.round(score) }).then(function (o) {
if (o && o.paid && typeof loadStock === "function")
loadStock();
if (o && o.paid && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
owChalCard(place, line + " " + esc((o && o.say) || ""));
}).catch(function (e) { owChalCard(place, line + " " + owSoft(e)); });
},
function (dt, L) {
var X = OW.chal, C = X.C;
X.t += dt;
if (C.kind === "song")
return owSongHud(X);
if (C.kind === "drop")
return owDropTick(X, dt, L);
if (C.kind === "edl")
return owEdlTick(X, dt);
var B = C.beacons[X.i], d = Math.hypot(L.x - B[0], L.z - B[1]), html = "<b>" + esc(C.name) + "</b> · " + owSecs(X.t) + " · beacon " + (X.i + 1) + " of " + C.beacons.length + "<br>" + owArrow(L, B[0], B[1], "the next beacon");
if (C.kind === "heat") {
var shade = owInHall(L.x, L.z) || C.shade.some(function (q) { return Math.hypot(L.x - q[0], L.z - q[1]) < 4.6; }) || Math.hypot(L.x - 20, L.z + 83) < 20;
X.heat = Math.max(0, Math.min(100, X.heat + (shade ? -C.coolDown : C.heatUp) * dt));
html += "<br>Suit heat " + owBar(X.heat, X.heat > 75 ? "#E0704A" : X.heat > 45 ? "#E8C27A" : "#7AD08A") + (shade ? " · in the shade, cooling" : " · in the sun");
if (X.heat >= 100)
return owChalFail("Your suit overheated. The rescue crew walked you back into the shade.");
}
if (C.kind === "cool") {
var post = C.posts.some(function (q) { return Math.hypot(L.x - q[0], L.z - q[1]) < 4; }) || Math.hypot(L.x - 40, L.z - 16) < 4 || owInHall(L.x, L.z);
X.cool = Math.max(0, Math.min(100, X.cool + (post ? 30 : -C.drain) * dt));
html += "<br>Suit cooling " + owBar(X.cool, X.cool < 25 ? "#E0704A" : X.cool < 50 ? "#E8C27A" : "#6AC8FF") + (post ? " · topping up at a cooling post" : "");
if (X.cool <= 0)
return owChalFail("Your suit's cooling ran out. VERA towed you back to the bunker.");
}
if (d < (C.kind === "cool" && X.i < C.beacons.length - 1 ? 3.6 : 4.5)) {
if (C.kind === "cool" && X.i < C.beacons.length - 1) {
X.dl += dt;
html += "<br>📡 Downloading the probe's data… " + owBar(X.dl / C.hold * 100, "#6AC8FF");
if (X.dl < C.hold) {
owHud(html);
return;
}
}
X.dl = 0;
X.i++;
if (typeof playTone === "function")
playTone(880, 0.15);
if (X.i >= C.beacons.length)
return owChalDone(X.t);
var N = C.beacons[X.i];
X.b.position.set(N[0], owAt(N[0], N[1]), N[1]);
}
else
X.dl = 0;
var S0 = C.start;
if (X.t > 3 && S0 && Math.hypot(L.x - S0[0], L.z - S0[1]) < 3)
worldPrompt("<b>" + esc(C.name) + "</b> · <b>press E</b> to stop", function () { owChalStop(); setStatus("Stopped."); });
else
worldPrompt(null);
owHud(html);
},
function (dt) {
var S = OW.song, X = OW.chal && OW.chal.kind === "song" ? OW.chal : null;
S.lit = S.lit || [];
for (var i = 0; i < 5; i++) {
if (S.lit[i] > 0) {
S.lit[i] -= dt;
var f = Math.max(0, S.lit[i] / 0.7);
S.glows[i].material.opacity = 0.75 * f;
S.crystals[i].emissiveIntensity = 0.15 + 0.75 * f;
}
}
if (X && X.playing) {
X.playT -= dt;
if (X.playT <= 0) {
if (X.play < X.seq.length) {
owSongHit(X.seq[X.play]);
X.play++;
X.playT = 0.95;
}
else {
X.playing = false;
owSongCard(X, "Your turn: sing it back.");
}
}
}
},
function (X, msg) {
var fns = {}, names = ["Rose", "Violet", "Sky", "Sea-green", "Gold"], h = owTitle("🎵 The Crystal Song", "#E8C8FF") + "<div style='margin:4px 0'>Round " + X.round + ". " + esc(msg) + "</div><div>";
names.forEach(function (n, i) {
var c = "#" + ("000000" + OW_SONG_COL[i].toString(16)).slice(-6);
h += "<span data-w='c" + i + "' role='button' style='display:inline-block;margin:4px;padding:12px 10px;min-width:64px;text-align:center;border-radius:8px;border:2px solid " + c + ";background:" + c + "33;font-weight:600'>" + n + "</span>";
fns["c" + i] = function () { owSongPress(i); };
});
h += "</div>";
h += owBtn("stop", "Stop", "end the song here");
fns.stop = function () { var r = X.round - 1; owChalDone(Math.max(0, r)); };
worldCard(h, fns);
},
function (i) {
var X = OW.chal;
if (!X || X.kind !== "song" || X.playing)
return;
owSongHit(i);
if (X.seq[X.pos] !== i) {
var got = X.round - 1;
setStatus("<b>A wrong note.</b> Sela smiles: \"Again, another time.\"");
owChalDone(Math.max(0, got));
return;
}
X.pos++;
if (X.pos >= X.seq.length) {
if (X.round >= X.C.max) {
owChalDone(X.C.max);
return;
}
setTimeout(function () { if (OW.chal === X)
owSongNext(X); }, 900);
owSongCard(X, "Beautiful. Again, one note longer…");
}
},
function (X) {
var P = OW_PLACES[X.place], D = P.drop;
X.n = 0;
X.score = 0;
X.objs = [];
X.phase = "aim";
X.fallT = Math.sqrt(2 * 118 / D.g);
X.wind = D.wind;
var ring = new THREE.Group();
var rm = wMesh(new THREE.RingGeometry(5, 7, 40), wB(D.ring, { op: 0.85, ds: true, fog: false }), 0, 0, 0, ring);
rm.rotation.x = -Math.PI / 2;
var rm2 = wMesh(new THREE.RingGeometry(1.2, 2, 24), wB(0xFFFFFF, { op: 0.7, ds: true, fog: false }), 0, 0.05, 0, ring);
rm2.rotation.x = -Math.PI / 2;
ring.position.set(0, -117, -66);
OW.G.add(ring);
X.objs.push(ring);
X.ring = ring;
X.rx = -50;
X.rv = 7 + Math.random() * 3;
var pr = wSph(0.6, wB(0xF4F0E8, { fog: false }), 0, 1.7, -65, OW.G, 12);
X.objs.push(pr);
X.probe = pr;
var gl = wGlow(0xFFE7B0, 6, 0.6);
pr.add(gl);
},
function (X, dt, L) {
X.rx += X.rv * dt;
if (X.rx > 55) {
X.rx = 55;
X.rv = -Math.abs(X.rv);
}
if (X.rx < -55) {
X.rx = -55;
X.rv = Math.abs(X.rv);
}
X.ring.position.x = X.rx;
var atRail = Math.hypot(L.x, L.z + 56) < 5.5, h = "<b>The Probe Drop</b> · probe " + (X.n + 1) + " of 3 · score " + X.score;
if (X.phase === "aim") {
X.probe.position.set(0, 1.7, -65);
h += "<br>" + (atRail ? "Wind " + X.wind + " m/s from the west. <b>press E</b> to release." : owArrow(L, 0, -55, "the rail of the probe bay"));
if (atRail)
worldPrompt("<b>Release the probe</b> · <b>press E</b>", owDropRelease);
else
worldPrompt(null);
}
else if (X.phase === "fall") {
X.ft += dt;
var u = Math.min(1, X.ft / X.fallT);
X.probe.position.set(X.px + X.wind * X.ft, 1.7 - 118 * u * u, -65);
if (u >= 1) {
var d = Math.abs(X.probe.position.x - X.rx), pts = Math.max(0, Math.round(100 - d * 6));
X.score += pts;
X.n++;
setStatus(pts >= 90 ? "<b>Bullseye!</b> +" + pts : pts > 0 ? "<b>Close.</b> " + d.toFixed(1) + " m off: +" + pts : "<b>Missed</b> by " + d.toFixed(1) + " m. The wind and the fall: release earlier, upwind.");
X.phase = "wait";
X.wt = 1.6;
}
h += "<br>Falling… " + (X.fallT - X.ft).toFixed(1) + " s";
worldPrompt(null);
}
else {
X.wt -= dt;
worldPrompt(null);
if (X.wt <= 0) {
if (X.n >= 3)
return owChalDone(X.score);
X.phase = "aim";
}
}
owHud(h);
},
function (t) {
if (t < 14)
return 125000 - t * t * 350;
if (t < 30)
return 56400 - (t - 14) * 2800;
if (t < 44)
return 11600 - (t - 30) * 240;
if (t < 54)
return 8240 - (t - 44) * 610;
var u = Math.min(1, (t - 54) / 12);
return 2140 * (1 - u) * (1 - u);
},
function (X, dt) {
var alt = owEdlAlt(X.t), S = OW_EDL[X.step];
if (S && alt < S.hi) {
X.pts.push(0);
setStatus("<b>Too late</b> to " + esc(S.say.toLowerCase()) + ": " + esc(S.tip) + ".");
X.step++;
S = OW_EDL[X.step];
}
if (!S || alt <= 0) {
var tot = X.pts.reduce(function (a, b) { return a + b; }, 0);
while (X.pts.length < 4) {
X.pts.push(0);
}
return owChalDone(tot);
}
var h = "<b>The Descent Simulator</b> · " + (alt >= 1000 ? (alt / 1000).toFixed(1) + " km" : Math.round(alt) + " m") + " · " + Math.round(owEdlSpeed(X.t)).toLocaleString() + " km/h · score " + X.pts.reduce(function (a, b) { return a + b; }, 0);
h += "<br>Next: <b>" + esc(S.say) + "</b>";
owHud(h);
worldPrompt("<b>" + esc(S.say) + "</b> · <b>press E</b> when it is time", owEdlAct);
},
function () {
var X = OW.chal;
if (!X || X.kind !== "edl")
return;
var S = OW_EDL[X.step];
if (!S)
return;
var alt = owEdlAlt(X.t);
if (alt > S.lo) {
setStatus("<b>Too early!</b> Wait: " + esc(S.tip) + ".");
return;
}
var err = Math.abs(alt - S.best) / Math.max(1, (S.lo - S.hi) / 2), pts = Math.max(10, Math.round(100 - err * 90));
X.pts.push(pts);
X.step++;
if (typeof playTone === "function")
playTone(520 + X.step * 80, 0.2);
setStatus("<b>" + esc(S.say) + "</b> at " + (alt >= 1000 ? (alt / 1000).toFixed(1) + " km" : Math.round(alt) + " m") + ": +" + pts + ".");
},
function (G) {
if (typeof STN !== "undefined")
OWA.solids.forEach(function (s) { var i = STN.solids.indexOf(s); if (i >= 0)
STN.solids.splice(i, 1); });
OWA.solids = [];
OWA.crew = [];
OWA.nodes = [];
OWA.spots = [];
var S = new THREE.Group(), L = new THREE.Group();
OWA.g = new THREE.Group();
OWA.g.add(S);
OWA.g.add(L);
G.add(OWA.g);
var red = wM(0xA8452A), dark = wM(0x2A2E36), M = owMats(), sol = OWA.solids;
wCyl(2.2, 2.4, 1, dark, 0, 0.5, -16, S, 32);
wMesh(new THREE.RingGeometry(1.9, 2.2, 40), wB(0xE07A50, { fog: false }), 0, 1.01, -16, S).rotation.x = -Math.PI / 2;
var globe = new THREE.Mesh(new THREE.SphereGeometry(1.25, 40, 24), new THREE.MeshLambertMaterial({ map: (typeof spPaint === "function" ? spPaint("mars") : null), color: spPaint ? 0xFFFFFF : 0xC0603A }));
globe.position.set(0, 2.5, -16);
globe.rotation.z = 0.44;
L.add(globe);
OWA.globe = globe;
[[2.1, 0.12, 0.9], [2.9, 0.08, 0.23]].forEach(function (q, i) { var m = wSph(q[1], wM(0x8A8076), 0, 2.5, -16, L, 8); OWA.moons.push({ m: m, r: q[0], w: q[2] }); });
sol.push({ x: 0, z: -16, r: 2.4 });
var mt = wSign(["THE MARS TABLE", "landing sites · press E"], 2.2, 0.6, "#2A0E08", "#FFD0B0");
mt.position.set(0, 1.35, -13.55);
S.add(mt);
var cap = new THREE.Group();
cap.position.set(-8, 0, 4.5);
S.add(cap);
wMesh(new THREE.CylinderGeometry(0.9, 2.1, 2.2, 24), wM(0x9C9890), 0, 1.6, 0, cap);
wCyl(2.25, 2.25, 0.25, wM(0x6A3A22), 0, 0.45, 0, cap, 24);
wBox(4.6, 0.2, 0.2, dark, 0, 0.25, 0, cap);
wBox(0.2, 0.2, 4.6, dark, 0, 0.25, 0, cap);
var hatch = wBox(0.9, 1.1, 0.08, wM(0x2A3A4A, { e: 0x101820 }), 0, 1.7, 1.5, cap);
hatch.rotation.x = -0.45;
owPiece(S, "console", -5.2, 0, 4.5, -Math.PI / 2, 0.8, sol);
var ds = wSign(["DESCENT SIMULATOR", "seven minutes to the surface of Mars"], 3, 0.8, "#2A0E08", "#FFD0B0");
ds.position.set(-8, 3.6, 4.5);
S.add(ds);
sol.push({ x: -8, z: 4.5, r: 2.3 });
wBox(4.4, 1.1, 0.9, wM(0x5A4A44), 8, 0.55, -3.1, S);
wBox(4.6, 0.08, 1.1, wM(0xC8B8A8), 8, 1.14, -3.1, S);
[[6.2, -5.6], [8, -5.8], [9.8, -5.6]].forEach(function (q) { wBox(1.1, 0.8, 1.1, wM(0x7A6A5A), q[0], 0.4, q[1], S); wBox(1, 0.1, 1, wM(0x9A4A2A), q[0], 0.82, q[1], S); });
var od = wSign(["THE ORE DESK", "Phobos regolith · buy and sell"], 2.6, 0.7, "#2A0E08", "#FFD0B0");
od.position.set(8, 2.4, -6.4);
S.add(od);
sol.push({ x: 8, z: -3.1, hw: 2.2, hd: 0.45 }, { x: 8, z: -5.7, hw: 2.4, hd: 0.6 });
owPiece(S, "bench", 22, 0, -1.6, 0, 1, sol);
owPiece(S, "robot", 24.8, 0, -3.4, -0.5, 0.8, sol);
wBox(5, 0.08, 1.6, wM(0x3A3E46), 22, 0.01, -1.6, S);
var fs = wSign(["THE FAB SHOP", "Fabricated in orbit · press E"], 2.6, 0.7, "#2A0E08", "#FFD0B0");
fs.position.set(22, 2.6, -4.5);
S.add(fs);
[[26.55, -26, -Math.PI / 2], [-26.55, 6, Math.PI / 2], [-26.55, -18, Math.PI / 2]].forEach(function (q) {
var b = wSign(["ARES", "", "✦", "", "MARS"], 2, 4.2, "#7A2A18", "#FFD8B8");
b.position.set(q[0], 3.2, q[1]);
b.rotation.y = q[2];
S.add(b);
});
OW_PLACES.ares.gather.forEach(function (spec) {
spec.spots.forEach(function (q, i) {
var gl = wGlow(0x9AF0C8, 2.4, 0.3);
gl.position.set(q[0], 1.7, q[1]);
L.add(gl);
OWA.nodes.push({ id: "ares-" + spec.k + "-" + i, k: spec.k, x: q[0], z: q[1], g: null, glow: gl, look: "hydro", place: "ares", label: "A hydroponic bed" });
});
});
var keep = OW.crew;
OW.crew = [];
OW_ARES_CREW.forEach(function (c) { owCrewAdd(L, c, "ares", function () { return 0; }); });
OWA.crew = OW.crew;
OW.crew = keep;
var A = OWA.spots, sp = function (x, z, r, label, fn) { A.push({ x: x, z: z, r: r, label: label, fn: fn }); };
sp(0, -12.6, 2.6, "🔴 <b>The Mars table</b> · landing sites", owMarsTable);
sp(-5.2, 6.8, 2.2, "🏁 <b>The Descent Simulator</b> · a challenge", function () { owChalCard("ares"); });
sp(8, -1.4, 2.4, "🛒 <b>The ore desk</b> · buy, sell and refine", function () { owTradeCard("ares"); });
sp(22, 0.2, 2.6, "⚙️ <b>The fab shop</b> · fabricate, or refine", owFabCard);
OW_LESSONS.forEach(function (l) {
if (l.w !== "ares")
return;
var s = OW_PLACES.ares.spots[l.at];
if (!s)
return;
sp(s[0], s[1] + (l.at === "window" ? 1 : 2), s[2] > 3 ? 3 : s[2], "🎓 <b>" + esc(l.title) + "</b> · a World Learning lesson", function () { owLessonCard(l); });
});
if (typeof ldPress === "function") {
OWA.g.remove(S);
OWA.g.add(ldPress(S));
}
},
function (on) {
if (!WORLDS.station || !WORLDS.station.g)
return;
if (on && !OWA.g)
try {
owAresBuild(WORLDS.station.g);
}
catch (e) {
if (window.console)
console.warn("[outer worlds] ares", e);
}
if (!OWA.g)
return;
OWA.g.visible = on;
OWA.solids.forEach(function (s) { var i = STN.solids.indexOf(s); if (on && i < 0)
STN.solids.push(s); if (!on && i >= 0)
STN.solids.splice(i, 1); });
if (on) {
owReset("ares");
OW.G = OWA.g;
OW.crew = OWA.crew.slice();
OW.nodes = OWA.nodes;
OW.spots = OWA.spots.slice();
}
else if (OW.k === "ares")
owReset(null);
},
function () {
var fns = {}, h = owTitle("🔴 The Mars table", "#FFD0B0") + "<div style='opacity:.85;margin:4px 0'>The planet below, turning once in 24 hours 37 minutes. Touch a site to read about it.</div>";
var sites = [["jezero", "Jezero Crater", "Perseverance landed on an old lake bed here on 18 February 2021, with the Ingenuity helicopter, which made the first powered flight on another world. The Corp's Jezero Settlement stands beside it."],
["gale", "Gale Crater", "Curiosity has climbed Mount Sharp here since 2012, reading layer after layer of rock laid down in water."],
["olympus", "Olympus Mons", "The largest volcano in the Solar System: about 22 km high and as wide as France. Its slopes are so gentle you might not know you were climbing."],
["valles", "Valles Marineris", "A canyon system about 4,000 km long and up to 7 km deep: it would reach across the United States."],
["utopia", "Utopia Planitia", "Viking 2 landed here in 1976, and China's Zhurong rover in 2021. Radar has found buried ice beneath it."],
["poles", "The polar caps", "Water ice, with a winter frost of carbon dioxide that comes and goes with the seasons."]];
sites.forEach(function (s) { h += owBtn("s-" + s[0], esc(s[1]), ""); fns["s-" + s[0]] = function () { worldCard(owTitle(esc(s[1]), "#FFD0B0") + "<div style='margin:6px 0'>" + esc(s[2]) + "</div>" + owBtn("back", "Back to the table", ""), { back: owMarsTable }); }; });
h += owBtn("down", "🚀 The Orbital Line down to Jezero", "the shuttle stop by the hangar");
fns.down = function () { if (typeof orbDepartures === "function")
orbDepartures("ares"); };
worldCard(h, fns);
},
function () {
var fns = {}, h = owTitle("⚙️ The fab shop", "#FFD0B0") + "<div style='opacity:.85;margin:4px 0'>Grace Adeyemi fabricates what the forges make (tools, armour, machines) from materials, with your name on it. Or refine what you gathered out there.</div>";
if (typeof craftOpen === "function") {
h += owBtn("make", "🛠️ Fabricate something", "from parts, crystal, glass and cloth");
fns.make = function () { worldCard(null); craftOpen("fabshop"); };
}
h += owBtn("ref", "⚗️ Refine", "Phobos regolith to ore, salvage to parts, ice to water, silk to cloth");
fns.ref = function () { owTradeCard("ares", null, "refine"); };
worldCard(h, fns);
},
function (msg) {
var fns = { talk: function () { worldCard(null); owTullikTalk(); } }, h = owTitle("🟢 Pip-Tullik the trader", "#B8F0B8");
h += "<div style='opacity:.85;margin:4px 0'>A round green ship full of curiosities, and its small, many-armed, very cheerful owner. Pip pays more than the city for things from out here (a quarter more), sells odd things you will find nowhere else, and loves a swap.</div>";
if (msg)
h += "<div style='margin:6px 0;color:#FFE7B0'>" + msg + "</div>";
if (!owSigned())
h += "<div style='opacity:.75;margin:6px 0'>Sign in to trade: it is kept in your backpack.</div>";
h += owBtn("talk", "💬 Talk with Pip", "gossip about the planets");
h += "<div style='margin:8px 0 2px'><b>Pip sells</b></div>";
OW_TULLIK_SELLS.forEach(function (k) { var g = OW_GOOD[k]; h += owBtn("b-" + k, g.e + " " + esc(g.n) + " · " + g.pr + " gold", esc(g.note)); fns["b-" + k] = function () { owBuy(k, 1, owTullikCard); }; });
var S = owOuterStock().filter(function (s) { return OW_GOOD[s.kind] && !/^ow_tk_/.test(s.kind); });
h += "<div style='margin:8px 0 2px'><b>Pip buys</b> (a quarter over the city's price)</div>";
if (!S.length)
h += "<div style='opacity:.75'>\"You have nothing from out here! Go and gather, and come back. I'll be here. Or somewhere.\"</div>";
S.forEach(function (s) {
var g = OW_GOOD[s.kind], p = Math.max(1, Math.round(g.b * 1.25));
h += owBtn("s-" + s.kind, g.e + " " + esc(g.n) + " × " + s.amount, "sell one for " + p + " gold");
fns["s-" + s.kind] = function () { owTullikSell(s.kind, 1); };
});
h += "<div style='margin:8px 0 2px'><b>Pip swaps</b></div>";
h += owSwapRows("tullik", fns, owTullikCard);
worldCard(h, fns);
},
function () {
var A = null;
SP_ALIENS.forEach(function (a) { if (a.who === "tullik")
A = a; });
wTalk({ name: "Pip-Tullik the trader", persona: (A ? A.persona : "") + " You are Pip-Tullik. You really do trade: you buy things gathered on the outer worlds for a quarter more than the city pays, sell spice cake, humming rocks and star maps, and swap. When asked to trade, say the trade window is open (press the Trade button).",
greet: "Hello hello! Tullik trading, best prices this side of Saturn. You want to swap? I have a rock that hums." });
},
function (k, n) {
if (!owSigned() || OW.busy)
return;
OW.busy = true;
owRpc("ow_tullik_sell", { p_kind: k, p_amount: n }).then(function (o) {
OW.busy = false;
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } owTullikCard(esc((o && o.say) || "")); });
})
.catch(function (e) { OW.busy = false; owTullikCard(owSoft(e)); });
},
function (S, L) {
var ship = new THREE.Group();
ship.position.set(58, -3, 58);
L.add(ship);
wSph(4.2, wM(0x7AD87A, { e: 0x2A6A2A, ei: 0.3 }), 0, 0, 0, ship, 24);
var t = wMesh(new THREE.TorusGeometry(5.4, 0.8, 8, 28), wM(0xE8C27A), 0, 0, 0, ship);
t.rotation.x = Math.PI / 2;
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
wSph(0.35, wB(0xFFF0A0, { fog: false }), Math.cos(a) * 4.1, 0.8, Math.sin(a) * 4.1, ship, 8);
}
var gang = wBox(1.2, 0.12, 9, wM(0x8A919C), 49, 0.05, 49, S);
gang.rotation.y = Math.PI / 4;
OW.tullikShip = ship;
var x = 40, z = 38;
[[-1.4, -0.9], [1.4, -0.9], [-1.4, 0.9], [1.4, 0.9]].forEach(function (q) { wCyl(0.05, 0.05, 2.4, wM(0x8A8E96), x + q[0], 1.2, z + q[1], S, 5); });
for (var s2 = 0; s2 < 5; s2++)
wBox(0.62, 0.06, 2.1, wM(s2 % 2 ? 0x7AD87A : 0xF0E8D0), x - 1.24 + s2 * 0.62, 2.42, z, S);
wBox(2.6, 0.8, 1.2, wM(0x6A4A2A), x, 0.4, z, S);
wSph(0.22, wM(0x8A8A8A), x - 0.8, 0.95, z, S, 8);
wBox(0.5, 0.04, 0.36, wM(0xE8DCC0), x, 0.82, z + 0.1, S);
wCyl(0.25, 0.25, 0.15, wM(0xC8864A), x + 0.8, 0.88, z, S, 12);
SF.solids.push({ x: x, z: z, hw: 1.4, hd: 0.7 });
var sg = wSign(["PIP-TULLIK · TRADER", "buys high · sells odd · swaps anything"], 2.8, 0.7, "#14301A", "#C8F8C8");
sg.position.set(x, 3, z - 1.05);
S.add(sg);
var pip = new THREE.Group();
pip.position.set(x, 0, z + 1.3);
var body = wSph(0.42, wM(0x6AC86A, { e: 0x1A4A1A, ei: 0.3 }), 0, 0.75, 0, pip, 16);
body.scale.set(1, 1.15, 1);
[-0.14, 0.14].forEach(function (e) { wSph(0.08, wB(0xFFFFFF), e, 0.95, 0.36, pip, 8); wSph(0.04, wB(0x101010), e, 0.95, 0.42, pip, 6); });
for (var a2 = 0; a2 < 4; a2++) {
var arm = wCyl(0.04, 0.05, 0.5, wM(0x5AB85A), (a2 < 2 ? -1 : 1) * 0.42, 0.7 - (a2 % 2) * 0.18, 0.05, pip, 5);
arm.rotation.z = (a2 < 2 ? 1 : -1) * (1.0 + (a2 % 2) * 0.3);
}
[-0.15, 0.15].forEach(function (f) { wCyl(0.06, 0.08, 0.35, wM(0x4A984A), f, 0.17, 0, pip, 6); });
L.add(pip);
OW.spots.push({ x: x, z: z + 1.6, r: 2.8, label: "🟢 <b>Pip-Tullik the trader</b> · buy, sell and swap", fn: function () { owTullikCard(); } });
}
];
});
