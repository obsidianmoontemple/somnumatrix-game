/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(357, function () {
"use strict";
return [
function (fn, w, h) {
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#F2EEE4";
x.fillRect(0, 0, W, H);
var R = wRand(7);
for (var i = 0; i < 900; i++) {
var a = 0.03 + R() * 0.05;
x.fillStyle = "rgba(120,110,90," + a + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
fn(x, W, H, R);
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / (w || 3), 1 / (h || 2.8));
try {
t.anisotropy = Math.min(SHK.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
return t;
},
function (x, x0, y0, w, h, R) {
shkOak(x, x0 - 5, y0 - 5, w + 10, h + 10, R);
var g = x.createLinearGradient(0, y0, 0, y0 + h);
g.addColorStop(0, "#5A6E7E");
g.addColorStop(1, "#26323C");
x.fillStyle = g;
x.fillRect(x0, y0, w, h);
x.strokeStyle = "rgba(40,40,44,.9)";
x.lineWidth = 1.4;
x.beginPath();
for (var d = -h; d < w + h; d += 9) {
x.moveTo(x0 + d, y0);
x.lineTo(x0 + d + h, y0 + h);
x.moveTo(x0 + d + h, y0);
x.lineTo(x0 + d, y0 + h);
}
x.save();
x.beginPath();
x.rect(x0, y0, w, h);
x.clip();
x.stroke();
x.restore();
x.fillStyle = "#3A2A1C";
x.fillRect(x0 + w / 2 - 2, y0, 4, h);
},
function () {
return shkFrameTex(function (x, W, H, R) {
shkOak(x, 0, 0, W, 14, R);
shkOak(x, 0, H - 14, W, 14, R);
shkOak(x, 0, H / 2 - 6, W, 12, R);
shkOak(x, 0, 0, 14, H, R);
shkOak(x, W / 2 - 7, 0, 14, H, R);
x.strokeStyle = "#3A2A1C";
x.lineWidth = 11;
x.beginPath();
x.moveTo(14, H - 14);
x.quadraticCurveTo(W * 0.18, H * 0.7, W / 2 - 7, H / 2 + 6);
x.moveTo(W - 6, H / 2 + 6);
x.quadraticCurveTo(W * 0.72, H * 0.72, W / 2 + 7, H - 14);
x.stroke();
shkWindow(x, W * 0.6, H * 0.12, W * 0.3, H * 0.3, R);
});
},
function () {
return shkFrameTex(function (x, W, H, R) {
shkOak(x, 0, 0, W, 16, R);
shkOak(x, 0, 0, 14, H, R);
shkOak(x, W - 8, 0, 8, H, R);
x.fillStyle = "#1E1812";
x.fillRect(16, H * 0.16, W - 30, H * 0.54);
var cols = ["#8A3A2A", "#C8A050", "#3A5A7A", "#6A7A3A", "#B8B0A0", "#7A4A6A"];
for (var i = 0; i < 14; i++) {
x.fillStyle = cols[(R() * cols.length) | 0];
x.fillRect(22 + R() * (W - 60), H * 0.22 + R() * H * 0.38, 8 + R() * 20, 6 + R() * 14);
}
x.fillStyle = "#5A3E28";
x.fillRect(10, H * 0.7, W - 20, H * 0.08);
x.fillStyle = "#3A2A1C";
x.fillRect(10, H * 0.78, W - 20, H * 0.22);
});
},
function () {
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#9A7C48";
x.fillRect(0, 0, W, H);
var R = wRand(3);
for (var i = 0; i < 2600; i++) {
var px = R() * W, py = R() * H, l = 8 + R() * 22;
x.strokeStyle = "rgba(" + (150 + R() * 70 | 0) + "," + (110 + R() * 60 | 0) + "," + (50 + R() * 40 | 0) + "," + (0.35 + R() * 0.4) + ")";
x.lineWidth = 1 + R() * 1.4;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 3, py + l);
x.stroke();
}
for (var r = 0; r < H; r += 32) {
x.fillStyle = "rgba(60,44,20,.25)";
x.fillRect(0, r, W, 4);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 2.5, 1 / 2.5);
return t;
},
function () {
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#D8D2C2";
x.fillRect(0, 0, W, H);
var R = wRand(11);
for (var a = 0; a < 4; a++)
for (var b = 0; b < 4; b++)
if ((a + b) & 1) {
x.fillStyle = "#2A2E34";
x.fillRect(a * 64 + 3, b * 64 + 3, 58, 58);
for (var i = 0; i < 26; i++) {
x.fillStyle = "rgba(" + (70 + R() * 60 | 0) + "," + (80 + R() * 60 | 0) + "," + (90 + R() * 60 | 0) + ",.7)";
x.beginPath();
x.arc(a * 64 + 6 + R() * 52, b * 64 + 6 + R() * 52, 3 + R() * 5, 0, 7);
x.fill();
}
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 2.4, 1 / 2.4);
return t;
},
function () {
var t = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#7A8088";
x.fillRect(0, 0, W, H);
var R = wRand(5);
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(255,255,255," + (R() * 0.06) + ")";
x.fillRect(R() * W, R() * H, 3, 3);
}
for (var s = 0; s < W; s += 32) {
x.fillStyle = "#5A6068";
x.fillRect(s, 0, 4, H);
x.fillStyle = "rgba(255,255,255,.12)";
x.fillRect(s + 4, 0, 2, H);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 2, 1 / 2);
return t;
},
function () {
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#4E6660";
x.fillRect(0, 0, W, H);
var R = wRand(9);
for (var i = 0; i < 500; i++) {
var y = R() * H;
x.strokeStyle = "rgba(200,220,215," + (0.04 + R() * 0.08) + ")";
x.lineWidth = 1;
x.beginPath();
x.moveTo(R() * W, y);
x.lineTo(R() * W, y + (R() - 0.5) * 2);
x.stroke();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 30, 1 / 30);
return t;
},
function (P, w, d, h, roofMat, gableMat, x, y, z, ry, over) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
over = over === undefined ? 0.35 : over;
var half = w / 2 + over, slope = Math.hypot(half, h), a = Math.atan2(h, half);
[-1, 1].forEach(function (k) { var s = shkBox(g, slope, 0.22, d + over * 2, roofMat, k * half / 2, h / 2 + 0.11, 0); s.rotation.z = -k * a; });
if (gableMat)
[-1, 1].forEach(function (k) { g.add(shkGable(w, h, gableMat, k * (d / 2))); });
return g;
},
function (w, h, mat, z) {
var p = [-w / 2, 0, 0, w / 2, 0, 0, 0, h, 0, w / 2, 0, 0, -w / 2, 0, 0, 0, h, 0], uv = [0, 0, w, 0, w / 2, h, 0, 0, w, 0, w / 2, h], n = [];
for (var i = 0; i < 3; i++)
n.push(0, 0, 1);
for (var j = 0; j < 3; j++)
n.push(0, 0, -1);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(n, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
var m = new THREE.Mesh(g, mat);
m.position.z = z;
return m;
},
function (P, o, R) {
var g = new THREE.Group();
g.position.set(o.x, 0, o.z);
g.rotation.y = o.ry || 0;
P.add(g);
var w = o.w, d = o.d, st = o.st || 2, jet = o.jetty === undefined ? 0.45 : o.jetty, y = 0, lite = SHK.lite;
var tint = o.tint || SHK_LIME[(R() * SHK_LIME.length) | 0];
if (o.shop && !lite)
shkBox(g, w + 0.1, 0.5, d + 0.1, shkS("stone", 0xB8B0A0), 0, 0.25, 0);
for (var s = 0; s < st; s++) {
var h = s === 0 ? 3.0 : 2.7, ww = w + (s ? jet * 0.4 : 0), dd = d + (s ? jet * 2 * s : 0);
var kind = o.brick ? "brick" : s === 0 ? (o.shop ? "shop" : "frameB") : (o.wall || (R() < 0.5 ? "frameC" : R() < 0.5 ? "frameA" : "frameB"));
var mat = o.brick ? shkS("brick", 0xC07858) : shkS(kind, s === 0 && o.shop ? 0xE8E0D0 : tint);
shkBox(g, ww, h, dd, mat, 0, y + h / 2, 0);
y += h;
}
var dTop = d + (st > 1 ? jet * 2 * (st - 1) : 0), wTop = w + (st > 1 ? jet * 0.4 : 0);
var rk = o.roof || "tile", rh = Math.max(2.6, wTop * 0.62);
var roofMat = rk === "thatch" ? shkS("thatch", 0xE8D8B0) : rk === "slate" ? shkS("slate", 0x9AA0A8) : rk === "lead" ? shkS("lead", 0xC8CCD0) : shkS("tile", R() < 0.5 ? SHK_ROOFC.tile : SHK_ROOFC.tile2);
shkRoof(g, wTop, dTop, rh, roofMat, o.brick ? shkS("brick", 0xC07858) : shkS(o.wall || "frameA", tint), 0, y, 0, 0, rk === "thatch" ? 0.6 : 0.3);
if (R() < 0.8)
shkBox(g, 0.9, rh + 1.6, 0.9, shkS("brick", 0xB06848), (R() < 0.5 ? -1 : 1) * wTop * 0.22, y + rh / 2 + 0.4, -dTop * 0.3);
if (o.sign && !lite) {
var sg = wSign(o.sign, 1.5, 1.1, "#2A1E14", "#E8D0A0");
sg.position.set(w / 2 - 0.3, 3.6, d / 2 + 1.2);
sg.rotation.y = Math.PI / 2;
g.add(sg);
shkBox(g, 0.06, 0.06, 1.6, shkC(0x1A1A1A), w / 2 - 0.3, 4.25, d / 2 + 0.8);
}
shkSolidBox(o.x, o.z, w, d, o.ry || 0);
if (!o.noDoor && typeof evbWorldDoor === "function") {
var th = o.theme || (o.shop ? evbTudorShop(o.x, o.z) : "tudorhouse");
evbWorldDoor(SHK_KEY, o.x, o.z, o.ry || 0, d / 2, th, o.doorName || (EVB_TUDOR_NAMES[th] + ", " + shkPlaceName(o.x, o.z)), { lx: o.doorAt || 0, doors: o.shop ? "the shop door" : "the street door" });
}
return { g: g, top: y + rh };
},
function (P, x0, z0, x1, z1, side, R, o, no) {
o = o || {};
var L = Math.hypot(x1 - x0, z1 - z0), ux = (x1 - x0) / L, uz = (z1 - z0) / L, nx = -uz * side, nz = ux * side, t = o.start || 0, n = 0;
var ry = Math.atan2(-nx, -nz);
var gap = o.gap || (SHK.lite ? 0.3 : 0.12);
while (t < L) {
var w = (o.wMin || 5) + R() * ((o.wMax || 8) - (o.wMin || 5)), d = (o.dMin || 9) + R() * ((o.dMax || 13) - (o.dMin || 9));
if (t + w > L)
break;
var cx = x0 + ux * (t + w / 2) + nx * ((o.back || 3) + d / 2), cz = z0 + uz * (t + w / 2) + nz * ((o.back || 3) + d / 2);
if (R() < gap || (no && no(cx, cz, w / 2))) {
t += w + (R() < 0.5 ? 3 : 0);
continue;
}
shkHouse(typeof P === "function" ? P(cx, cz) : P, { x: cx, z: cz, ry: ry + (R() - 0.5) * 0.03, w: w, d: d, st: (o.stMin || 2) + Math.floor(R() * ((o.stMax || 4) - (o.stMin || 2) + 1)), roof: o.roof ? o.roof(R) : (R() < 0.85 ? "tile" : "slate"),
shop: o.shop && R() < o.shop, brick: o.brick && R() < o.brick, sign: o.signs && R() < 0.3 ? [o.signs[(R() * o.signs.length) | 0]] : null, jetty: o.jetty }, R);
t += w + (R() < 0.1 ? 2.5 : 0.05);
n++;
}
return n;
},
function (P, list, R) {
if (!list.length)
return;
var n = list.length, trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.22, 0.34, 1, 6), shkS("bark", 0x6A5038), n), crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshLambertMaterial({ color: 0x4A6E30 }), n * 2), M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), c = new THREE.Color();
list.forEach(function (t, i) {
var h = t.h || (5 + R() * 5);
p.set(t.x, h * 0.35, t.z);
s.set(1, h * 0.7, 1);
M.compose(p, q, s);
trunk.setMatrixAt(i, M);
for (var k = 0; k < 2; k++) {
var r = h * (0.32 - k * 0.06);
p.set(t.x + (R() - 0.5) * 1.2, h * (0.72 + k * 0.2), t.z + (R() - 0.5) * 1.2);
s.set(r, r * 0.85, r);
M.compose(p, q, s);
crown.setMatrixAt(i * 2 + k, M);
c.setHSL(0.24 + R() * 0.06, 0.38 + R() * 0.15, 0.24 + R() * 0.1);
crown.setColorAt(i * 2 + k, c);
}
});
trunk.userData.keep = 1;
crown.userData.keep = 1;
P.add(trunk);
P.add(crown);
list.forEach(function (t) { shkSolid({ x: t.x, z: t.z, r: 0.4 }); });
},
function (R, sex) {
var f = sex ? sex === "f" : R() < 0.45, pick = function (a) { return a[(R() * a.length) | 0]; };
var cloth = [0x5A3A2A, 0x3A3A4A, 0x6A2A2A, 0x2A3A2A, 0x7A6A4A, 0x4A4A3A, 0x2A2A3A, 0x8A5A2A, 0x5A4A6A, 0x3A5A6A];
if (f)
return { sex: "f", topKind: "dress", top: pick(cloth), bottom: pick(cloth), bottomKind: "skirt", layer: R() < 0.6 ? "apron" : null, layerColor: 0xE8E0D0, hat: pick(["hood", "hood", "none", "brimmed"]), hatColor: pick([0xE8E4DC, 0x2A2A2A, 0xF0ECE4]), hair: pick([0x3A2618, 0x6A4A2A, 0x8A5A2A, 0xC8A060, 0x1A1410]), hairStyle: pick(["bun", "braids", "long"]), shoeKind: "shoes" };
return { sex: "m", layer: pick(["tunic", "vest", "jacket", "tunic"]), layerColor: pick(cloth), top: pick([0xE8E0D0, 0xD8C8A8, 0xF0ECE4]), bottom: pick(cloth), hat: pick(["cap", "cap", "brimmed", "none", "beanie"]), hatColor: pick([0x1A1A1A, 0x3A2A1A, 0x4A3A2A, 0x6A2A2A]), hair: pick([0x3A2618, 0x6A4A2A, 0x1A1410, 0x8A6A4A, 0xA8A8A0]), hairStyle: pick(["short", "curly", "short"]), shoeKind: pick(["shoes", "boots"]), back: R() < 0.2 ? "cloak" : null, backColor: pick(cloth) };
},
function (x, z, yawTo, msg, then, y) {
var v = shkVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
SHK.moving = true;
setTimeout(function () {
if (WLD.on !== SHK_KEY) {
v.style.opacity = "0";
SHK.moving = false;
return;
}
try {
shkRoomEnsure(x, z);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] room", e);
}
var gy = shkGround(x, z, (y || 0) + 0.3);
camera.position.set(SHK.base + x, gy + 1.72, z);
if (yawTo !== undefined && yawTo !== null)
yaw = yawTo;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
SHK.zone = shkZoneAt(x, z);
SHK.inside = SHK.zone === "inside" ? shkRoomAtX(x, z) : null;
SHK.vt = 1;
if (msg)
setStatus(msg);
if (then)
try {
then();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; SHK.moving = false; }, 120);
}, 620);
},
function (key, x, z, ry, o) {
var F = SHK_FOLK[key];
o = o || {};
var p = wPerson("shk_" + key, { look: F.look || null, sex: F.look && F.look.sex, place: SHK_NAME });
p.position.set(x, o.y || 0, z);
p.rotation.y = ry || 0;
(o.P || SHK.live).add(p);
var P = { g: p, key: key, wander: o.wander || null, ground: o.y || 0 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet }, verb: o.verb, fn: o.fn });
return P;
},
function (n, x, z, r, R, o) {
o = o || {};
if (SHK.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var a = R() * Math.PI * 2, d = Math.sqrt(R()) * r, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (o.ok && !o.ok(px, pz))
continue;
var p = wPerson("shkf_" + SHK.people.length + "_" + i, { look: shkFolkLook(R) });
p.position.set(px, o.y || 0, pz);
p.rotation.y = R() * 6.28;
(o.P || SHK.live).add(p);
SHK.people.push({ g: p, wander: o.still ? null : { r: o.wr || 10, sp: 0.6 + R() * 0.6 }, ground: o.y || 0 });
}
},
function (G) {
function sheet(w, d, kind, col, x, z, y, off) {
var m = shkPlane(G, w, d, shkS(kind, col).clone(), x, y + (off || 0) * 0.008, z);
m.userData.keep = 1;
if (w > 40 || d > 40) {
var gq = new THREE.PlaneGeometry(w, d, Math.ceil(w / 40), Math.ceil(d / 40));
gq.rotateX(-Math.PI / 2);
if (m.material.map && m.material.userData.ctn && typeof metreUVs === "function")
metreUVs(gq, "pln", [w, d]);
m.geometry.dispose();
m.geometry = gq;
}
if (off) {
m.material.polygonOffset = true;
m.material.polygonOffsetFactor = -off;
m.material.polygonOffsetUnits = -off * 4;
}
return m;
}
sheet(4200, 3000, "grass", 0x8AA068, -150, -60, -0.03, 0);
sheet(1130, 620, "earth", 0xA89478, 95, -422, 0, 1);
sheet(1400, 420, "earth", 0xA89478, -370, 330, 0, 1);
sheet(130, 600, "earth", 0xA89478, 255, 400, 0, 1);
var sx = -470, sz = -430, ex = -1090, ez = -300, L = Math.hypot(ex - sx, ez - sz), s = sheet(L, 16, "earth", 0xA08C72, (sx + ex) / 2, (sz + ez) / 2, 0, 1);
s.rotation.y = -Math.atan2(ez - sz, ex - sx);
sheet(320, 260, "paving", 0xA8A090, -1180, -250, 0, 2);
sheet(800, 22, "paving", 0x9A948A, 250, -450, 0, 2);
sheet(300, 160, "paving", 0xA09A8E, -285, -445, 0, 2);
sheet(1200, 12, "paving", 0x9A948A, -355, 135, 0, 2);
sheet(16, 540, "paving", 0x9A948A, 255, 380, 0, 2);
sheet(1120, 12, "paving", 0x9A948A, 98, -135, 0, 2);
var S = SHK_STRAT;
sheet(1600, 1200, "grass", 0x8AAA68, S.x, S.z, -0.03, 0);
sheet(380, 12, "earth", 0xA89478, S.x - 30, S.z - 120, 0, 1);
sheet(12, 420, "earth", 0xA89478, S.x, S.z + 80, 0, 1);
sheet(320, 10, "earth", 0xA89478, S.x - 170, S.z + 60, 0, 1);
},
function (G, R) {
var wt = shkTexOf("water"), wm = new THREE.MeshPhongMaterial({ color: 0x8AA8A0, map: wt, shininess: 60, specular: 0x3A4A48 });
var w = shkPlane(G, 3000, SHK_RIV * 2 + 4, wm, -150, SHK_WATER, 0);
w.userData.keep = 1;
SHK.water = wt;
var stone = shkS("stone", 0xA8A090);
[-1, 1].forEach(function (k) { var b = shkBox(SHK.D.river, 3000, 2.6, 1.4, stone, -150, -0.95, k * (SHK_RIV + 0.7)); });
[["bankStairs", 1], ["paulStairs", -1]].forEach(function (p) {
var S = SHK_PLACES[p[0]], k = p[1];
for (var i = 0; i < 6; i++)
shkBox(SHK.D.river, 4, 0.25, 1.1, shkS("wood", 0x6A5034), S.x, -0.15 - i * 0.28, k * (SHK_RIV - 0.6 - i * 1.05));
shkBoat(S.x + 4, k * (SHK_RIV - 6), Math.PI / 2, R, false);
shkSpot(S.x, S.z, 4, "Watermen's stairs", "take a wherry across (a penny, says Tom)", function () { shkWherry(k); });
});
shkBox(SHK.D.west, 5, 0.25, 8, shkS("wood", 0x6A5034), -1150, -0.4, -SHK_RIV + 4);
var n = SHK.lite ? 3 : 7;
for (var i = 0; i < n; i++) {
var b = shkBoat(-900 + R() * 1800, (R() - 0.5) * 160, 0, R, !SHK.lite && i < 3);
b.userData.run = { x0: -1000, x1: 900, sp: (R() < 0.5 ? -1 : 1) * (1.6 + R() * 1.6), z: (R() - 0.5) * 170 };
SHK.boats.push(b);
}
var sw = SHK.lite ? 6 : 16, white = shkC(0xF4F4F0), beak = shkC(0xD87830);
for (var j = 0; j < sw; j++) {
var s = new THREE.Group();
wSph(0.42, white, 0, 0.18, 0, s, 8).scale.set(1, 0.6, 1.5);
var nk = wCyl(0.07, 0.09, 0.7, white, 0, 0.5, 0.45, s, 5);
nk.rotation.x = -0.25;
wSph(0.11, white, 0, 0.85, 0.55, s, 6);
wCone(0.04, 0.14, beak, 0, 0.83, 0.7, s, 4).rotation.x = Math.PI / 2;
s.position.set(-700 + R() * 1400, SHK_WATER, (R() - 0.5) * 190);
s.userData.swim = { a: R() * 6.28, sp: 0.2 + R() * 0.25 };
SHK.live.add(s);
SHK.boats.push(s);
}
for (var q = 0; q < (SHK.lite ? 1 : 3); q++)
shkShip(SHK.D.river, 420 + q * 85, -40 + q * 45, R);
},
function (x, z, ry, R, rower) {
var g = new THREE.Group(), wood = shkS("wood", 0x7A5A3A);
var hull = shkBox(g, 1.5, 0.5, 6.2, wood, 0, 0.15, 0);
var bow = shkBox(g, 1.06, 0.5, 1.06, wood, 0, 0.15, 3.1);
bow.rotation.y = Math.PI / 4;
shkBox(g, 1.2, 0.08, 5.4, shkS("wood", 0x4A3424), 0, 0.42, 0);
for (var i = -1; i <= 1; i += 2) {
var o = shkBox(g, 0.06, 0.06, 3.4, shkS("wood", 0xA88A5A), i * 1.6, 0.5, 0.4);
o.rotation.y = i * 0.5;
}
if (rower) {
var p = wPerson("shk_rower_" + x.toFixed(0), { look: { top: 0x5A6A7A, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x3A3A3A } });
p.position.set(0, 0.1, 0.6);
p.scale.setScalar(0.92);
g.add(p);
}
g.position.set(x, SHK_WATER + 0.1, z);
g.rotation.y = ry || 0;
SHK.live.add(g);
return g;
},
function (P, x, z, R) {
var g = new THREE.Group();
g.position.set(x, SHK_WATER, z);
g.rotation.y = Math.PI / 2 + (R() - 0.5) * 0.3;
P.add(g);
var dark = shkS("wood", 0x4A3424), light = shkS("wood", 0x8A6A44);
shkBox(g, 7, 3.4, 26, dark, 0, 1.2, 0);
shkBox(g, 6.2, 2.4, 6, light, 0, 3.8, -10);
shkBox(g, 5.6, 1.6, 4, light, 0, 3.4, 10.5);
var bow = shkBox(g, 4.9, 3.0, 4.9, dark, 0, 1.4, 13);
bow.rotation.y = Math.PI / 4;
[[0, 15, -1], [0, 18, 5], [0, 13, -7]].forEach(function (m) {
shkCyl(g, 0.2, 0.3, m[1], light, 0, 2.8 + m[1] / 2, m[0] + m[2]);
shkBox(g, 7, 0.18, 0.18, light, 0, 2.8 + m[1] * 0.7, m[2]);
shkBox(g, 6.4, 0.8, 0.6, shkC(0xE8E0CC), 0, 2.8 + m[1] * 0.7 - 0.4, m[2]);
});
shkBox(g, 0.1, 0.1, 12, light, 0, 8, 19).rotation.x = -0.5;
},
function (P, R) {
var bx = SHK_BRIDGE, stone = shkS("stone", 0xB0A894), len = SHK_RIV * 2 + 8;
shkBox(P, SHK_BRW * 2, 0.7, len, stone, bx, -0.35, 0);
for (var i = 0; i < 19; i++) {
var z = -SHK_RIV + 5 + i * (SHK_RIV * 2 - 10) / 18;
shkBox(P, SHK_BRW * 2 + 3, 2.4, 4.2, stone, bx, -1.9, z);
[-1, 1].forEach(function (k) { var s = shkBox(P, 4.2, 1.2, 4.2, shkS("wood", 0x5A4A36), bx + k * (SHK_BRW + 2.6), -2.4, z); s.rotation.y = Math.PI / 4; });
}
[-1, 1].forEach(function (k) {
shkRow(P, bx + k * 3, k < 0 ? -SHK_RIV + 2 : SHK_RIV - 2, bx + k * 3, k < 0 ? SHK_RIV - 2 : -SHK_RIV + 2, 1, R, { back: 0, dMin: 7.5, dMax: 8.2, wMin: 5, wMax: 7, stMin: 3, stMax: 4, gap: 0.05, shop: 0.8, jetty: 0.35 }, function (x, z) { return Math.abs(z - 38) < 12 || Math.abs(z - 92) < 9 || Math.abs(z + 30) < 5; });
});
var N = new THREE.Group();
N.position.set(bx, 0, 38);
P.add(N);
var paint = shkS("frameC", 0xF2E8D0), gilt = shkC(0xC8A040);
[-1, 1].forEach(function (k) { shkBox(N, 8, 3.2, 22, paint, k * 7, 1.6, 0); shkSolidBox(bx + k * 7, 38, 8, 22, 0); });
shkEvbDoor(bx - 7, 38, Math.PI / 2, 4, "tudorpalace", "Nonsuch House", 0, "the carved door");
shkBox(N, 22, 9, 22, paint, 0, 7.7, 0);
shkBox(N, 22.4, 0.4, 22.4, shkS("wood", 0x4A3424), 0, 3.4, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { shkCyl(N, 2, 2, 14, paint, c[0] * 11, 7, c[1] * 11, 8); var d = wSph(2.3, gilt, c[0] * 11, 15, c[1] * 11, N, 10); d.scale.set(1, 1.3, 1); wCone(0.6, 2.4, gilt, c[0] * 11, 17.6, c[1] * 11, N, 6); });
shkRoof(N, 22, 22, 5, shkS("lead", 0xC0C4C8), paint, 0, 12.2, 0, 0, 0.3);
var ns = wSign(["NONSUCH HOUSE"], 5, 0.8, "#3A2A1C", "#E8C870");
ns.position.set(0, 4.4, 11.3);
N.add(ns);
var Gt = new THREE.Group();
Gt.position.set(bx, 0, 94);
P.add(Gt);
[-1, 1].forEach(function (k) { shkCyl(Gt, 4.2, 4.4, 14, stone, k * 6.5, 7, 0, 10); shkSolidBox(bx + k * 7, 94, 6, 8, 0); var t = shkCyl(Gt, 4.6, 4.6, 1.2, stone, k * 6.5, 14.4, 0, 10); });
shkBox(Gt, 9, 5, 8, stone, 0, 10.5, 0);
for (var m = -4; m <= 4; m += 2)
shkBox(Gt, 1, 1, 8.4, stone, m, 13.5, 0);
[-1, 1].forEach(function (k) { shkBox(P, 0.6, 1, len - 2, stone, bx + k * (SHK_BRW - 0.3), 0.5, 0); });
},
function (R) {
var signs = ["The Bell", "The Swan", "The Cock", "The Rose", "The Sun", "The Crown", "The Bull", "The Star", "The Key", "The Ship", "The Lamb", "The Hart"];
shkNoRect(-440, -560, -140, -360);
shkNoRect(-95, -392, -45, -352);
shkNoRect(640, -760, 900, -120);
shkNoRect(-30, -470, 150, -430);
shkNoRect(170, -470, 230, -430);
shkNoRect(-480, -760, 700, -705);
shkNoRect(230, -150, 280, -108);
var streets = [[-455, -135, 640, -135], [-140, -450, 640, -450], [-455, -300, 640, -300], [-455, -600, 640, -600], [-80, -140, -80, -445], [100, -140, 100, -700], [255, -120, 255, -445], [420, -140, 420, -700], [-300, -140, -300, -365], [-455, -430, -430, -430]];
streets.forEach(function (s) { shkStreetNo(s[0], s[1], s[2], s[3], 3); });
shkNoRect(-470, -760, -450, -130);
var part = shkCityPart, lite = SHK.lite, o = function (x) { return Object.assign({ signs: signs, gap: lite ? 0.45 : 0.1, shop: 0.5, brick: 0.06 }, x || {}); };
shkRow(part, -455, -135, 640, -135, -1, R, o({ stMin: 2, stMax: 3 }), shkNo);
if (!lite)
shkRow(part, -455, -135, 640, -135, 1, R, o({ back: 2, dMin: 8, dMax: 11, stMin: 1, stMax: 2, gap: 0.45, shop: 0 }), shkNo);
shkRow(part, -140, -450, 640, -450, 1, R, o({ back: 11, stMin: 3, stMax: 5, shop: 0.9, signs: ["The Goldsmiths", "The Mercers", "The Golden Key", "The Angel", "The Cross Keys"] }), shkNo);
shkRow(part, -140, -450, 640, -450, -1, R, o({ back: 11, stMin: 3, stMax: 5, shop: 0.9 }), shkNo);
shkRow(part, -455, -300, 640, -300, 1, R, o(), shkNo);
shkRow(part, -455, -300, 640, -300, -1, R, o(), shkNo);
if (!lite) {
shkRow(part, -455, -600, 400, -600, 1, R, o(), shkNo);
shkRow(part, -455, -600, 400, -600, -1, R, o(), shkNo);
}
[[-80, -140, -80, -445], [100, -140, 100, -700], [255, -120, 255, -445], [420, -140, 420, -700], [-300, -140, -300, -365]].forEach(function (s, i) {
if (lite && i > 2)
return;
shkRow(part, s[0], s[1], s[2], s[3], 1, R, o(), shkNo);
shkRow(part, s[0], s[1], s[2], s[3], -1, R, o(), shkNo);
});
shkPaul(SHK.D.paul, R);
shkMermaid(SHK.D.cityM);
shkCheapside(SHK.D.cityM);
shkWall(SHK.D.cityW, R);
shkTower(SHK.D.tower, R);
},
function (P, R) {
var stone = shkS("stone", 0xC8C0AC), lead = shkS("lead", 0xB8BCC0), glass = shkC(0x3A4654), x0 = -400, x1 = -220, zc = -430;
shkBox(P, x1 - x0, 14, 34, stone, (x0 + x1) / 2, 7, zc);
shkBox(P, x1 - x0, 14, 16, stone, (x0 + x1) / 2, 21, zc);
shkRoof(P, 16, x1 - x0, 8, lead, stone, (x0 + x1) / 2, 28, zc, Math.PI / 2, 0.3);
[-1, 1].forEach(function (k) { shkRoof(P, 9, x1 - x0, 0.01, lead, null, (x0 + x1) / 2, 14, zc + k * 12.5, Math.PI / 2, 0.2); });
for (var x = x0 + 6; x < x1; x += 10) {
if (Math.abs(x + 285) < 18)
continue;
[-1, 1].forEach(function (k) { shkBox(P, 1.6, 13, 2.4, stone, x, 6.5, zc + k * 18); shkBox(P, 2.6, 8, 0.3, glass, x + 5, 7, zc + k * 17.05); shkBox(P, 2.4, 8, 0.3, glass, x + 5, 21, zc + k * 8.05); });
}
shkBox(P, 30, 28, 100, stone, -285, 14, zc);
shkRoof(P, 30, 100, 9, lead, stone, -285, 28, zc, 0, 0.3);
shkBox(P, 22, 74, 22, stone, -285, 37, zc);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { shkBox(P, 3, 76, 3, stone, -285 + c[0] * 11, 38, zc + c[1] * 11); wCone(1.6, 9, stone, -285 + c[0] * 11, 80.5, zc + c[1] * 11, P, 4); });
for (var i = -1; i <= 1; i += 2)
for (var j = 0; j < 3; j++)
shkBox(P, 0.3, 12, 3, glass, -285 + i * 11.05, 48 + j * 0, zc - 6 + j * 6);
shkPyramid(P, 22, 7, lead, -285, 74, zc);
shkBox(P, 2, 32, 36, stone, x0 - 1, 16, zc);
wCone(2, 8, stone, x0 - 1, 36, zc - 17, P, 4);
wCone(2, 8, stone, x0 - 1, 36, zc + 17, P, 4);
shkBox(P, 0.4, 9, 6, shkS("wood", 0x4A3424), x0 - 2.1, 4.5, zc);
shkBox(P, 0.3, 9, 8, glass, x0 - 2.1, 18, zc);
shkSolidBox((x0 + x1) / 2, zc, x1 - x0, 34, 0);
shkSolidBox(-285, zc, 30, 100, 0);
shkSolidBox(x0 - 1, zc, 2.4, 36, 0);
shkDoor("paul", x0 - 4, zc, "St Paul's Cathedral: Paul's Walk");
var shops = ["The Green Dragon", "The White Greyhound", "The Fox", "The Angel", "The Spread Eagle", "The Bell", "The Gun", "The Holy Ghost", "The Rose", "The Crane"];
shops.forEach(function (nm, i) {
var x = -380 + i * 21;
shkHouse(P, { x: x, z: -524, ry: 0, w: 9, d: 11, st: 3, shop: true, sign: [nm], roof: "tile", noDoor: i === 0, theme: "tudorbooks", doorName: "The bookseller's at the sign of " + nm.replace(/^The /, "the ") }, R);
});
shkDoor("print", -380, -516, "The Print Shop at the Sign of the Green Dragon");
for (var b = 0; b < (SHK.lite ? 3 : 6); b++) {
var bx = -360 + b * 24;
shkBox(P, 4, 0.9, 1.4, shkS("wood", 0x6A5034), bx, 0.45, -502);
shkBox(P, 4.4, 0.1, 2, shkC(0x8A3A2A), bx, 2.6, -502);
[-1, 1].forEach(function (k) { shkBox(P, 0.1, 2.6, 0.1, shkS("wood", 0x4A3424), bx + k * 2, 1.3, -501.2); });
for (var q = 0; q < 6; q++)
shkBox(P, 0.35, 0.06 + R() * 0.1, 0.5, shkC([0x8A2A1A, 0x2A3A6A, 0xC8B080, 0x3A5A2A][q & 3]), bx - 1.6 + q * 0.62, 0.95, -502);
shkSolidBox(bx, -502, 4, 1.4, 0);
}
shkPerson("bookseller", -300, -504, 0);
shkBox(P, 30, 10, 16, shkS("brick", 0xB87858), -180, 5, -548);
shkRoof(P, 16, 30, 6, shkS("tile", 0xA86A4A), shkS("brick", 0xB87858), -180, 10, -548, Math.PI / 2, 0.3);
for (var w = -12; w <= 12; w += 6)
shkBox(P, 2.2, 4, 0.3, glass, -180 + w, 5.5, -539.9);
shkBox(P, 3, 4, 0.4, shkS("wood", 0x3A2A1C), -180, 2, -539.8);
var ss = wSign(["STATIONERS' HALL", "The Folio Library"], 5, 1.4, "#2A1E14", "#E8D0A0");
ss.position.set(-180, 7.6, -539.6);
P.add(ss);
shkSolidBox(-180, -548, 30, 16, 0);
shkDoor("library", -180, -536, "Stationers' Hall: the Folio Library");
var pc = new THREE.Group();
pc.position.set(-250, 0, -482);
P.add(pc);
shkCyl(pc, 3, 3.2, 1.6, stone, 0, 0.8, 0, 8);
for (var a = 0; a < 8; a++)
shkBox(pc, 0.3, 4, 0.3, shkS("wood", 0x4A3424), Math.cos(a / 8 * 6.28) * 2.8, 3.6, Math.sin(a / 8 * 6.28) * 2.8);
shkPyramid(pc, 6.6, 2.6, lead, 0, 5.6, 0, 8);
wCyl(0.08, 0.08, 1.6, shkC(0xC8A040), 0, 9, 0, pc, 5);
shkSolid({ x: -250, z: -482, r: 3.3 });
shkSpot(-250, -478, 4.5, "Paul's Cross", "read the notice", function () { worldCard(worldFacts("Paul's Cross", "An open-air pulpit in St Paul's Churchyard", [["Sermons", "Every Sunday, to crowds of thousands, with the Lord Mayor listening"], ["News", "Royal proclamations were read here"], ["Books", "Forbidden books were burned here"]], ["The churchyard round you was the heart of the English book trade: every bookseller in London wanted a shop here, each under a painted sign. A Shakespeare play in quarto cost sixpence.", "Paul's Walk, the long middle of the cathedral, was where London went to gossip, show off new clothes, and do business. A 'Paul's man' was someone who hung about there. Go in by the great west door."]), {}); });
},
function (P) {
var stone = shkS("stone", 0xD8D0BC), gilt = shkC(0xD8B048), R = wRand(41);
var c = new THREE.Group();
c.position.set(60, 0, -450);
P.add(c);
shkCyl(c, 4.6, 5, 1.2, stone, 0, 0.6, 0, 8);
shkCyl(c, 3, 3.4, 6, stone, 0, 4.2, 0, 8);
shkCyl(c, 2.2, 2.6, 5, stone, 0, 9.7, 0, 8);
shkCyl(c, 1.4, 1.8, 4, stone, 0, 14.2, 0, 8);
for (var a = 0; a < 8; a++) {
var an = a / 8 * 6.28;
[[3.1, 3.6], [2.3, 9.1]].forEach(function (t) { var s = wCyl(0.32, 0.38, 1.8, gilt, Math.cos(an) * t[0], t[1], Math.sin(an) * t[0], c, 6); });
wCone(0.3, 2, stone, Math.cos(an) * 2.4, 13, Math.sin(an) * 2.4, c, 4);
}
shkCyl(c, 0.3, 0.3, 3, gilt, 0, 17.6, 0, 6);
shkBox(c, 1.6, 0.3, 0.3, gilt, 0, 18.3, 0);
shkSolid({ x: 60, z: -450, r: 5 });
var s = new THREE.Group();
s.position.set(200, 0, -450);
P.add(s);
shkCyl(s, 3, 3.2, 5, stone, 0, 2.5, 0, 6);
shkPyramid(s, 5, 3, shkS("lead", 0xB8BCC0), 0, 5, 0, 6);
wSph(0.6, gilt, 0, 8.6, 0, s, 8);
for (var k = 0; k < 3; k++) {
var sp = wCyl(0.06, 0.06, 0.8, shkC(0xC8A040), Math.cos(k * 2.1) * 3.1, 1.6, Math.sin(k * 2.1) * 3.1, s, 5);
sp.rotation.z = Math.PI / 2;
}
shkSolid({ x: 200, z: -450, r: 3.4 });
var cols = [0x8A3A2A, 0x3A5A7A, 0x6A7A3A, 0xC8A050, 0x7A4A6A];
for (var i = 0; i < (SHK.lite ? 5 : 14); i++) {
var x = -100 + i * 52 + R() * 10, z = -450 + (i & 1 ? 6 : -6);
if (Math.abs(x - 60) < 12 || Math.abs(x - 200) < 10)
continue;
shkBox(P, 3.4, 0.9, 1.6, shkS("wood", 0x7A5A3A), x, 0.45, z);
shkBox(P, 3.8, 0.08, 2.2, shkC(cols[i % 5]), x, 2.4, z);
[-1, 1].forEach(function (k) { shkBox(P, 0.08, 2.4, 0.08, shkS("wood", 0x4A3424), x + k * 1.7, 1.2, z + (z < -450 ? -0.9 : 0.9)); });
for (var q = 0; q < 5; q++)
wSph(0.16, shkC([0xD87830, 0xC83A2A, 0x8AA040, 0xE8C850][q & 3]), x - 1.2 + q * 0.6, 1.02, z, P, 6);
shkSolidBox(x, z, 3.4, 1.6, 0);
}
},
function (P, R) {
var stone = shkS("stone", 0xB8B09C), h = 7, lite = SHK.lite;
function seg(x0, z0, x1, z1) {
var L = Math.hypot(x1 - x0, z1 - z0), ry = -Math.atan2(z1 - z0, x1 - x0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
shkBox(P, L, h, 3, stone, cx, h / 2, cz, ry);
shkSolidBox(cx, cz, L, 3, ry);
if (!lite)
for (var t = 1; t < L; t += 3) {
var px = x0 + (x1 - x0) * t / L, pz = z0 + (z1 - z0) * t / L;
shkBox(P, 1.4, 1, 3, stone, px, h + 0.5, pz, ry);
}
}
seg(-460, -720, 650, -720);
seg(-460, -140, -460, -424);
seg(-460, -436, -460, -720);
seg(650, -720, 650, -400);
[-1, 1].forEach(function (k) { shkCyl(P, 3.6, 3.8, 12, stone, -460, 6, -430 + k * 7, 10); shkSolid({ x: -460, z: -430 + k * 7, r: 3.8 }); });
shkBox(P, 6, 5, 8, stone, -460, 9.5, -430);
var lg = wSign(["LUDGATE"], 4, 0.9, "#2A241C", "#E8D8B0");
lg.position.set(-456.9, 8, -430);
lg.rotation.y = Math.PI / 2;
P.add(lg);
},
function (P, R) {
var white = shkS("stone", 0xE8E4D8), stone = shkS("stone", 0xB8B09C), lead = shkS("lead", 0xB8BCC0), T = SHK_PLACES.tower;
var moat = shkPlane(P, 190, 190, new THREE.MeshLambertMaterial({ color: 0x4A6458 }), T.x, -1.0, T.z);
moat.userData.keep = 1;
shkBox(P, 150, 1, 150, shkS("grass", 0x7A9A5A), T.x, -0.5, T.z);
shkBox(P, 36, 27, 32, white, T.x, 13.5, T.z);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var x = T.x + c[0] * 18, z = T.z + c[1] * 16; shkBox(P, 5, 31, 5, white, x, 15.5, z); var d = wSph(2.6, lead, x, 32, z, P, 10); d.scale.set(1, 1.4, 1); wCone(0.3, 2.4, shkC(0xC8A040), x, 35.5, z, P, 5); });
for (var a = -14; a <= 14; a += 4)
[-1, 1].forEach(function (k) { shkBox(P, 1.2, 3, 0.3, shkC(0x2A2A30), T.x + a, 18, T.z + k * 16.05); });
[[0, -55, 110, 0], [0, 55, 110, 0], [-55, 0, 110, Math.PI / 2], [55, 0, 110, Math.PI / 2]].forEach(function (w) { shkBox(P, w[2], 11, 4, stone, T.x + w[0], 5.5, T.z + w[1], w[3]); });
[[-55, -55], [55, -55], [-55, 55], [55, 55], [0, -55], [0, 55], [-55, 0], [55, 0]].forEach(function (t) { shkCyl(P, 6, 6.4, 15, stone, T.x + t[0], 7.5, T.z + t[1], 12); });
shkSolidBox(T.x, T.z, 190, 190, 0);
shkEvbDoor(T.x, T.z, -Math.PI / 2, 95, "towerlondon", "The Tower of London", 10, "the Middle Tower gate");
shkSpot(T.x - 100, T.z, 6, "The Tower of London", "read about it", function () { worldCard(worldFacts("The Tower of London", "A royal fortress, palace and prison, on the Thames since 1078", [["The White Tower", "Built by William the Conqueror, limewashed white"], ["Inside", "The armouries, the royal mint, the Crown Jewels, a menagerie of lions"], ["Prisoners", "Sir Walter Raleigh would be held here from 1603; the young Princess Elizabeth was held here in 1554"]], ["In Richard III, the two young princes are murdered in the Tower: one of the darkest scenes Shakespeare wrote.", "The gates are shut to visitors in this dream. The moat is deep: walk round it."]), {}); });
},
function (P, R) {
var sx = -470, sz = -430, ex = -1090, ez = -300;
shkNoRect(-1320, -420, -1040, -110);
shkRow(P, sx, sz, ex, ez, 1, R, { gap: SHK.lite ? 0.6 : 0.35, brick: 0.4, stMin: 2, stMax: 3, wMin: 9, wMax: 16, dMin: 12, dMax: 18, back: 6 }, shkNo);
shkRow(P, sx, sz, ex, ez, -1, R, { gap: SHK.lite ? 0.6 : 0.35, stMin: 2, stMax: 3, back: 6 }, shkNo);
var brick = shkS("brick", 0xB86A4A), stone = shkS("stone", 0xD0C8B4), fl = shkS("flint", 0xF0ECE4), lead = shkS("lead", 0xB8BCC0), glass = shkC(0x3A4654), W = SHK_PLACES.whitehall;
[-1, 1].forEach(function (k) { shkCyl(P, 3, 3, 18, fl, W.x + 60, 9, W.z - 40 + k * 8, 8); shkPyramid(P, 6, 3, lead, W.x + 60, 18, W.z - 40 + k * 8, 8); shkSolid({ x: W.x + 60, z: W.z - 40 + k * 8, r: 3.2 }); });
shkBox(P, 8, 8, 13, fl, W.x + 60, 12, W.z - 40);
shkBox(P, 60, 16, 22, brick, W.x, 8, W.z - 30);
shkRoof(P, 22, 60, 8, lead, brick, W.x, 16, W.z - 30, Math.PI / 2, 0.3);
for (var x = -24; x <= 24; x += 8)
shkBox(P, 3, 9, 0.3, glass, W.x + x, 9, W.z - 18.9);
shkBox(P, 4, 5, 0.5, shkS("wood", 0x3A2A1C), W.x, 2.5, W.z - 18.8);
var sg = wSign(["THE GREAT HALL", "Whitehall Palace"], 6, 1.4, "#2A1E14", "#E8C870");
sg.position.set(W.x, 13, W.z - 18.6);
P.add(sg);
shkSolidBox(W.x, W.z - 30, 60, 22, 0);
shkDoor("hall", W.x, W.z - 15.5, "The Great Hall of Whitehall Palace");
[[-50, 40, 80, 20, "the Queen's lodgings"], [50, 50, 70, 18, "the courtiers' lodgings"], [-20, 110, 120, 16, "the Privy Gallery"]].forEach(function (b) { shkEvbDoor(W.x + b[0], W.z + b[1], Math.PI, b[3] / 2, "tudorpalace", "Whitehall Palace: " + b[4]); shkBox(P, b[2], 12, b[3], brick, W.x + b[0], 6, W.z + b[1]); shkRoof(P, b[3], b[2], 6, shkS("tile", 0xA05A3E), brick, W.x + b[0], 12, W.z + b[1], Math.PI / 2, 0.3); shkSolidBox(W.x + b[0], W.z + b[1], b[2], b[3], 0); });
for (var i = 0; i < 4; i++)
for (var j = 0; j < 3; j++) {
var gx = W.x + 95 + i * 12, gz = W.z + 30 + j * 12;
shkBox(P, 9, 0.7, 9, shkC(0x3E6A34), gx, 0.35, gz);
shkBox(P, 7, 0.1, 7, shkC(0x8A4A6A), gx, 0.72, gz);
}
[[-1], [1]].forEach(function (k) { var p = wPerson("shk_guard" + k[0], { look: { layer: "armor", layerColor: 0xC83A2A, top: 0xC83A2A, bottom: 0x1A1A1A, hat: "helmet", hatColor: 0xB0B4BC } }); p.position.set(W.x + k[0] * 3, 0, W.z - 15); SHK.live.add(p); });
},
function (R) {
var G = SHK_PLACES.globe, Ro = SHK_PLACES.rose, Sw = SHK_PLACES.swan;
shkNoRect(G.x - 30, G.z - 30, G.x + 30, G.z + 95);
shkNoRect(Ro.x - 20, Ro.z - 22, Ro.x + 20, Ro.z + 22);
shkNoRect(Sw.x - 22, Sw.z - 22, Sw.x + 22, Sw.z + 22);
shkNoRect(-690, 250, -530, 420);
shkNoRect(-115, 165, 10, 230);
shkNoRect(40, 135, 160, 200);
shkNoRect(150, 185, 250, 250);
shkNoRect(262, 440, 330, 500);
[[-950, 135, 240, 135], [255, 112, 255, 650], [-950, 380, 240, 380], [-50, 145, -50, 375], [-350, 140, -350, 380], [-170, 140, -170, 380], [-820, 140, -820, 380]].forEach(function (s) { shkStreetNo(s[0], s[1], s[2], s[3], 3); });
var part = shkSouthPart, lite = SHK.lite, base = { gap: lite ? 0.5 : 0.15, stMin: 2, stMax: 3, shop: 0.3, roof: function (R) { return R() < 0.25 ? "thatch" : "tile"; }, signs: ["The Bear", "The Unicorn", "The Cardinal's Hat", "The Castle", "The Bell"] };
shkRow(part, -950, 135, 240, 135, 1, R, base, shkNo);
shkRow(part, 255, 112, 255, 650, 1, R, Object.assign({}, base, { stMin: 2, stMax: 4, shop: 0.6 }), shkNo);
shkRow(part, 255, 112, 255, 650, -1, R, Object.assign({}, base, { stMin: 2, stMax: 4, shop: 0.6 }), shkNo);
shkRow(part, -950, 380, 240, 380, 1, R, Object.assign({}, base, { gap: lite ? 0.75 : 0.5, stMin: 1, stMax: 2 }), shkNo);
if (!lite)
shkRow(part, -950, 380, 240, 380, -1, R, Object.assign({}, base, { gap: 0.55, stMin: 1, stMax: 2 }), shkNo);
shkRow(part, -50, 145, -50, 375, 1, R, Object.assign({}, base, { gap: 0.2 }), shkNo);
shkRow(part, -50, 145, -50, 375, -1, R, Object.assign({}, base, { gap: 0.2 }), shkNo);
shkPlayhouseOut(part(G.x, G.z), G.x, G.z, 15.2, 20, 10.4, "globe", "The Globe", ["THE GLOBE", "Totus mundus agit histrionem"]);
shkPlayhouseOut(SHK.D.bankE, Ro.x, Ro.z, 11, 14, 9.2, "rose", "The Rose", ["THE ROSE", "Philip Henslowe's playhouse"]);
shkPlayhouseOut(SHK.D.bankW, Sw.x, Sw.z, 12, 24, 10, "swan", "The Swan", ["THE SWAN", "Francis Langley's playhouse"]);
shkSonnetGarden(SHK.D.bankW, R);
shkDefenceOut(SHK.D.bankE, R);
shkSaviour(SHK.D.borough, R);
shkTabard(SHK.D.borough, R);
var stone = shkS("stone", 0xC8C0AC);
shkBox(SHK.D.bankE, 80, 14, 26, stone, 100, 7, 165);
shkRoof(SHK.D.bankE, 26, 80, 7, shkS("lead", 0xB8BCC0), stone, 100, 14, 165, Math.PI / 2, 0.3);
var rw = wCyl(4, 4, 0.4, shkC(0x6A5A8A), 140.3, 9, 165, SHK.D.bankE, 16);
rw.rotation.z = Math.PI / 2;
shkSolidBox(100, 165, 80, 26, 0);
shkEvbDoor(100, 165, Math.PI, 13, "tudorpalace", "Winchester Palace, the Bishop of Winchester's house");
var trees = [];
for (var i = 0; i < (lite ? 40 : 120); i++) {
var x = -1350 + R() * 1700, z = 420 + R() * 260;
if (Math.abs(x - 255) < 30)
continue;
trees.push({ x: x, z: z });
}
for (var j = 0; j < (lite ? 20 : 60); j++) {
var x2 = -1350 + R() * 300, z2 = 150 + R() * 260;
trees.push({ x: x2, z: z2 });
}
for (var k = 0; k < (lite ? 14 : 40); k++) {
trees.push({ x: -1350 + R() * 2400, z: -760 - R() * 120 });
}
shkTrees(SHK.D.fields, trees, R);
shkWindmill(SHK.D.fields, -300, 560);
},
function (P, x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
shkBox(g, 5, 8, 5, shkS("wood", 0x8A6A44), 0, 6, 0);
shkRoof(g, 5, 5, 3, shkS("wood", 0x5A4A36), shkS("wood", 0x8A6A44), 0, 10, 0);
shkCyl(g, 0.4, 0.6, 2, shkS("wood", 0x5A4A36), 0, 1, 0, 6);
var s = new THREE.Group();
s.position.set(0, 8.5, 2.8);
g.add(s);
for (var i = 0; i < 4; i++) {
var b = shkBox(s, 0.8, 9, 0.1, shkS("wood", 0xC8B890), 0, 4.5, 0);
var h = new THREE.Group();
h.add(b);
h.rotation.z = i * Math.PI / 2;
s.add(h);
}
g.remove(s);
s.position.set(x, 8.5, z + 2.8);
SHK.live.add(s);
SHK.anim.push({ k: "sails", m: s });
shkSolid({ x: x, z: z, r: 3.6 });
},
function (P, x, z, r, sides, h, room, name, signs) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var wall = room === "swan" ? shkS("flint", 0xF2EEE6) : shkS("frameB", 0xF4F0E6), thatch = shkS("thatch", 0xE8D8B0);
var outer = shkCyl(g, r, r, h, wall, 0, h / 2, 0, sides, true);
shkCyl(g, r - 4.6, r + 0.4, 2.6, thatch, 0, h + 1.3, 0, sides, true);
shkBox(g, 9, 5, 6, wall, 0, h + 3.4, -r + 5);
shkRoof(g, 9, 6, 3, thatch, wall, 0, h + 5.9, -r + 5, Math.PI / 2, 0.5);
shkCyl(g, 0.08, 0.08, 7, shkS("wood", 0x4A3424), 0, h + 9, -r + 5, 5);
var flag = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6, 6, 1), new THREE.MeshLambertMaterial({ color: shkFlagCol(), side: THREE.DoubleSide }));
flag.position.set(1.35, h + 11.5, -r + 5);
g.add(flag);
flag.userData.keep = 1;
SHK.anim.push({ k: "flag", m: flag });
[-1, 1].forEach(function (k) { var a = Math.PI / 2 + k * 0.42; shkCyl(g, 2.2, 2.2, h - 1, wall, Math.cos(a) * (r + 1.4), (h - 1) / 2, Math.sin(a) * (r + 1.4), 8); shkPyramid(g, 4.4, 2.4, thatch, Math.cos(a) * (r + 1.4), h - 1, Math.sin(a) * (r + 1.4), 8); });
var fr = shkS("wood", 0x3A2A1C), leafM = shkS("wood", 0x4A3220);
shkBox(g, 3.2, 3.9, 0.06, shkC(0x140E0A), 0, 1.95, r + 0.06);
[-1, 1].forEach(function (k) {
shkBox(g, 0.45, 4.2, 0.9, fr, k * 1.75, 2.1, r + 0.1);
var lf = new THREE.Group();
lf.position.set(k * 1.55, 0, r + 0.5);
lf.rotation.y = -k * 1.35;
g.add(lf);
shkBox(lf, 1.5, 3.6, 0.12, leafM, k * 0.75, 1.8, 0);
for (var q = 0; q < 3; q++)
shkBox(lf, 1.4, 0.12, 0.16, fr, k * 0.75, 0.5 + q * 1.3, 0);
[0.35, 1.15].forEach(function (u) { shkSolid({ x: x + k * (1.55 + u * Math.cos(1.35)), z: z + r + 0.5 + u * Math.sin(1.35), r: 0.3 }); });
shkBox(g, 0.1, 0.5, 0.1, fr, k * 2.25, 3.1, r + 0.45);
shkBox(g, 0.24, 0.32, 0.24, shkGlowM(0xFFC870), k * 2.25, 2.75, r + 0.55);
});
shkBox(g, 4, 0.5, 0.9, fr, 0, 4.15, r + 0.1);
var sg = wSign(signs, 6, 1.4, "#2A1E14", "#E8D0A0");
sg.position.set(0, 5.6, r + 0.15);
g.add(sg);
shkSolid({ x: x, z: z, r: r + 0.3 });
[-1, 1].forEach(function (k) { var a = Math.PI / 2 + k * 0.42; shkSolid({ x: x + Math.cos(a) * (r + 1.4), z: z + Math.sin(a) * (r + 1.4), r: 2.3 }); });
shkDoor(room, x, z + r + 2.2, name);
(SHK.walkIn = SHK.walkIn || []).push({ room: room, x: x, z: z + r + 0.75 });
},
function (P, R) {
var C = SHK_PLACES.paris, hedge = shkS("foliage", 0x4E7A3E), stone = shkS("stone", 0xD8D0BC), x = C.x, z = C.z;
[[0, -40, 120, 1.6], [0, 40, 120, 1.6], [-60, 0, 1.6, 80], [60, 0, 1.6, 80]].forEach(function (h) {
if (h[2] > 2) {
shkBox(P, h[2] / 2 - 4, 1.8, 1.6, hedge, x + h[0] - h[2] / 4 - 2, 0.9, z + h[1]);
shkBox(P, h[2] / 2 - 4, 1.8, 1.6, hedge, x + h[0] + h[2] / 4 + 2, 0.9, z + h[1]);
shkSolidBox(x + h[0] - h[2] / 4 - 2, z + h[1], h[2] / 2 - 4, 1.6, 0);
shkSolidBox(x + h[0] + h[2] / 4 + 2, z + h[1], h[2] / 2 - 4, 1.6, 0);
}
else {
shkBox(P, h[2], 1.8, h[3], hedge, x + h[0], 0.9, z + h[1]);
shkSolidBox(x + h[0], z + h[1], h[2], h[3], 0);
}
});
var fl = [0xC83A4A, 0xE8C850, 0x8A4AA8, 0xF0ECE4, 0xE87AA0];
for (var i = -2; i <= 2; i++)
for (var j = -1; j <= 1; j += 2) {
var bx = x + i * 20, bz = z + j * 16;
shkBox(P, 10, 0.5, 8, hedge, bx, 0.25, bz);
shkBox(P, 8, 0.12, 6, shkC(fl[(i + j + 5) % 5]), bx, 0.52, bz);
shkSolidBox(bx, bz, 10, 8, 0, 0.5);
}
shkCyl(P, 4, 4.2, 0.8, stone, x, 0.4, z, 16);
shkPlane(P, 7.4, 7.4, new THREE.MeshLambertMaterial({ color: 0x6A8A90 }), x, 0.7, z).userData.keep = 1;
shkCyl(P, 0.5, 0.7, 2.6, stone, x, 1.3, z, 8);
wSph(0.7, stone, x, 2.9, z, P, 10);
shkSolid({ x: x, z: z, r: 4.3 });
SHK_SONNETS.forEach(function (S, k) {
var a = k / 10 * Math.PI * 2, sx, sz;
for (var t = 0; t < 40; t++) {
var aa = a + (t % 2 ? 1 : -1) * Math.ceil(t / 2) * 0.02, qx = x + Math.cos(aa) * 48, qz = z + Math.sin(aa) * 28;
if (!shkSolidAt(qx, qz, 0) && !shkSolidAt(qx - Math.cos(aa) * 1.4, qz - Math.sin(aa) * 1.4, 0) && !shkSolidAt(qx - Math.cos(aa) * 2.4, qz - Math.sin(aa) * 2.4, 0)) {
a = aa;
break;
}
}
sx = x + Math.cos(a) * 48;
sz = z + Math.sin(a) * 28;
var st = shkBox(P, 1.6, 1.4, 0.5, stone, sx, 0.7, sz, -a + Math.PI / 2);
var tab = wSign(["Sonnet " + S[0]], 1.3, 0.5, "#D8D0BC", "#3A2E22");
tab.position.set(sx, 1.2, sz);
tab.rotation.y = -a - Math.PI / 2;
P.add(tab);
shkSolidBox(sx, sz, 1.6, 0.5, -a + Math.PI / 2);
shkSpot(sx - Math.cos(a) * 1.4, sz - Math.sin(a) * 1.4, 2.6, "Sonnet " + S[0] + ", carved in stone", "read it", function () { shkSonnetRead(k); });
});
var bw = new THREE.Group();
bw.position.set(x + 40, 0, z - 22);
P.add(bw);
[[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]].forEach(function (c) { shkBox(bw, 0.2, 3, 0.2, shkS("wood", 0x5A4A36), c[0], 1.5, c[1]); });
shkBox(bw, 4.6, 0.4, 3.6, hedge, 0, 3.2, 0);
shkBox(bw, 1.6, 0.9, 0.8, shkS("wood", 0x6A5034), 0, 0.45, 0);
shkBox(bw, 0.5, 0.02, 0.4, shkC(0xF0E8D0), 0, 0.91, 0);
shkSolid({ x: x + 40, z: z - 22, r: 1 });
shkSpot(x + 40, z - 20, 3, "The poet's bower", "write a sonnet of your own", function () { shkSonnetWrite(); });
shkSpot(x - 40, z - 22, 3, "The beat of a line", "learn the da-DUM of verse", function () { shkBeatCard(0); });
shkBox(P, 1.2, 1, 1.2, stone, x - 40, 0.5, z - 24);
var bt = wSign(["da-DUM"], 1, 0.4, "#D8D0BC", "#3A2E22");
bt.position.set(x - 40, 1.25, z - 23.35);
P.add(bt);
shkSolidBox(x - 40, z - 24, 1.2, 1.2, 0);
var gs = wSign(["THE SONNET GARDEN", "Paris Garden"], 5, 1.2, "#2A3A22", "#E8E0B0");
gs.position.set(x, 2.8, z + 41.2);
P.add(gs);
},
function (P, R) {
var D = SHK_PLACES.defence, Rp = SHK_PLACES.rapier;
shkHouse(P, { x: D.x, z: D.z, ry: Math.PI / 2, w: 16, d: 20, st: 2, roof: "tile", wall: "frameA", sign: ["THE SCHOOL OF DEFENCE"], noDoor: 1 }, R);
shkDoor("defence", D.x + 11, D.z, "The School of Defence");
shkHouse(P, { x: Rp.x, z: Rp.z, ry: -Math.PI / 2, w: 10, d: 12, st: 3, shop: true, roof: "tile", sign: ["THE SIGN OF THE RAPIER"], theme: "tudorhouse", doorAt: 3.6, doorName: "The house behind the Sign of the Rapier" }, R);
shkSpot(Rp.x - 7.5, Rp.z, 3.6, "The Sign of the Rapier", "see London's own gear", function () { if (typeof wgOutfit === "function")
wgOutfit("bard");
else
setStatus("The Sign of the Rapier is closed just now."); });
shkPerson("outfitter", Rp.x - 7, Rp.z + 2.5, -Math.PI / 2);
var ax = Rp.x + 2, az = Rp.z + 12;
shkBox(P, 6, 0.9, 3, shkS("brick", 0xA8604A), ax, 0.45, az);
shkBox(P, 1.2, 0.6, 1.2, shkGlowM(0xE8803A), ax, 1.1, az);
shkBox(P, 8, 0.2, 5, shkS("tile", 0xA86A4A), ax, 3.5, az);
[-1, 1].forEach(function (k) { shkBox(P, 0.2, 3.5, 0.2, shkS("wood", 0x4A3424), ax + k * 3.8, 1.75, az + 2.3); });
shkSolidBox(ax, az, 6, 3, 0);
shkSpot(ax - 5, az, 3.4, "The Bankside armoury", "make London's gear at the forge", function () { if (typeof craftOpen === "function")
craftOpen("wg_bard"); });
},
function (P, R) {
var stone = shkS("stone", 0xC8BEA8), lead = shkS("lead", 0xB8BCC0), S = SHK_PLACES.saviour;
shkBox(P, 80, 16, 22, stone, S.x, 8, S.z);
shkRoof(P, 22, 80, 7, lead, stone, S.x, 16, S.z, Math.PI / 2, 0.3);
shkBox(P, 14, 40, 14, stone, S.x + 5, 20, S.z);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { wCone(0.9, 5, stone, S.x + 5 + c[0] * 6.5, 42.5, S.z + c[1] * 6.5, P, 4); });
for (var x = -34; x <= 34; x += 8)
[-1, 1].forEach(function (k) { shkBox(P, 2.4, 7, 0.3, shkC(0x3A4654), S.x + x, 8, S.z + k * 11.05); });
shkSolidBox(S.x, S.z, 80, 22, 0);
shkEvbDoor(S.x, S.z, -Math.PI / 2, 40, "cathedral", "St Saviour's church", 6, "the west door");
shkSpot(S.x - 42, S.z, 4, "St Saviour's church", "read the tablet", function () { worldCard(worldFacts("St Saviour's, Southwark", "The great church of Bankside (now Southwark Cathedral)", [["Edmund Shakespeare", "William's youngest brother, an actor, will be buried here in 1607, on a cold December morning, with the great bell tolled for him"], ["Players", "Many of the playhouse people lived in this parish"]], []), {}); });
},
function (P, R) {
var T = SHK_PLACES.tabard;
shkHouse(P, { x: T.x, z: T.z, ry: -Math.PI / 2, w: 30, d: 14, st: 3, roof: "tile", wall: "frameB", sign: ["THE TABARD"], theme: "tudorinn", doorName: "The Tabard Inn" }, R);
var w = new THREE.Group();
w.position.set(T.x - 22, 0, T.z + 20);
P.add(w);
shkBox(w, 2.2, 1, 5, shkS("wood", 0x7A5A3A), 0, 1.3, 0);
var hood = shkCyl(w, 1.3, 1.3, 5, shkC(0xE8E0CC), 0, 1.9, 0, 10, true);
hood.rotation.x = Math.PI / 2;
hood.scale.set(1, 1, 0.9);
[[-1.2, -1.8], [1.2, -1.8], [-1.2, 1.8], [1.2, 1.8]].forEach(function (c) { var wh = shkCyl(w, 0.7, 0.7, 0.15, shkS("wood", 0x4A3424), c[0], 0.7, c[1], 10); wh.rotation.z = Math.PI / 2; });
shkSolidBox(T.x - 22, T.z + 20, 2.4, 5.4, 0);
var hs = new THREE.Group();
hs.position.set(T.x - 22, 0, T.z + 14.5);
P.add(hs);
shkBox(hs, 0.7, 0.9, 2.2, shkC(0x5A3A2A), 0, 1.4, 0);
shkBox(hs, 0.4, 0.6, 0.8, shkC(0x5A3A2A), 0, 2, 1.3);
[[-0.2, -0.8], [0.2, -0.8], [-0.2, 0.8], [0.2, 0.8]].forEach(function (c) { shkBox(hs, 0.14, 1, 0.14, shkC(0x4A3020), c[0], 0.5, c[1]); });
shkSolidBox(T.x - 22, T.z + 14.5, 0.8, 2.4, 0);
shkSpot(T.x - 24, T.z + 20, 4, "The carrier's wagon", "ride to Stratford-upon-Avon (four days, or a moment in a dream)", function () { shkToStratford(); });
var sg = wSign(["To STRATFORD-upon-AVON", "the carrier goes Thursdays"], 3.4, 1, "#2A1E14", "#E8D0A0");
sg.position.set(T.x - 24.5, 2.2, T.z + 20);
sg.rotation.y = -Math.PI / 2;
P.add(sg);
},
function (k) {
var D = SHK_ROOMS[k], cx = shkRoomX(k), g = new THREE.Group();
g.name = "shk-room-" + k;
SHK.G.add(g);
var R = wRand(9000 + D.i), Rm = { k: k, x: cx, z: 0, hw: D.hw, hd: D.hd, g: g, live: new THREE.Group() };
g.add(Rm.live);
Rm.live.userData.keep = 1;
SHK.rooms[k] = Rm;
var live0 = SHK.live;
SHK.live = Rm.live;
try {
SHK_BUILD_ROOM[k](g, cx, 0, R, Rm);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] room " + k, e);
}
finally {
SHK.live = live0;
}
g.remove(Rm.live);
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[shakespeare] join", e);
}
g.add(Rm.live);
shkFlatPeople();
return Rm;
},
function (k) {
var D = SHK_ROOMS[k], dr = SHK_DOORS[D.out || k];
if (!dr) {
shkMove(SHK_PLACES.arrive.x, SHK_PLACES.arrive.z, 0, "Back out on Bankside.");
return;
}
var S = SHK_STRAT, inStrat = dr.x > S.x - 2000, c = SHK_PLACES[k] || null;
var ox = dr.x, oz = dr.z, bx = 0, bz = 0, best = null;
[[0, 3], [0, -3], [3, 0], [-3, 0]].forEach(function (o) { if (!best && !shkSolidAt(dr.x + o[0], dr.z + o[1], 0) && !shkSolidAt(dr.x + o[0] * 1.8, dr.z + o[1] * 1.8, 0))
best = o; });
if (best) {
ox = dr.x + best[0];
oz = dr.z + best[1];
}
shkMove(ox, oz, best ? shkYawTo(best[0], best[1]) : null, "Back out" + (inStrat ? " in Stratford." : " in London.") + " <span style='opacity:.75'>(" + esc(dr.name) + ")</span>");
},
function (g, cx, cz, Rm, o) {
var w = Rm.hw * 2, d = Rm.hd * 2, h = o.h || 6;
shkBox(g, w, 0.3, d, o.floor || shkS("wood", 0x8A6A48), cx, -0.15, cz);
if (o.ceil !== false)
shkBox(g, w, 0.3, d, o.ceil || shkS("plaster", 0xE8E0D0), cx, h + 0.15, cz);
var wall = o.wall || shkS("plaster", 0xEDE6D8);
shkBox(g, w, h, 0.4, wall, cx, h / 2, cz - Rm.hd - 0.2);
shkBox(g, w, h, 0.4, wall, cx, h / 2, cz + Rm.hd + 0.2);
shkBox(g, 0.4, h, d, wall, cx - Rm.hw - 0.2, h / 2, cz);
shkBox(g, 0.4, h, d, wall, cx + Rm.hw + 0.2, h / 2, cz);
shkBox(g, 2.4, 3.2, 0.2, shkS("wood", 0x3A2A1C), cx, 1.6, cz + Rm.hd - 0.05);
var out = Rm.k, sp = shkSpot(cx, cz + Rm.hd - 1.5, 2.2, o.outName || "The way out", "go back out", function () { shkGoOut(out); });
Rm.entry = { x: 0, z: cz + Rm.hd - 4.2, yaw: 0 };
return sp;
},
function () {
if (SHK.tex.books)
return SHK.tex.books;
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#3A2A1C";
x.fillRect(0, 0, W, H);
var R = wRand(17);
for (var row = 0; row < 4; row++) {
var y = row * 64, px = 4;
x.fillStyle = "#2A1E14";
x.fillRect(0, y + 58, W, 6);
while (px < W - 6) {
var bw = 6 + R() * 10, bh = 40 + R() * 16, c = ["#6A1A1A", "#2A3A5A", "#5A4A2A", "#3A5A3A", "#8A6A3A", "#4A2A3A", "#7A5A2A"][(R() * 7) | 0];
x.fillStyle = c;
x.fillRect(px, y + 58 - bh, bw, bh);
x.fillStyle = "rgba(232,200,112,.6)";
x.fillRect(px + 1, y + 58 - bh + 6, bw - 2, 2);
x.fillRect(px + 1, y + 58 - 12, bw - 2, 2);
px += bw + 1;
}
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 2, 1 / 2);
SHK.tex.books = t;
return t;
},
function (g, cx, cz, Rm, o, R) {
var r = o.r, R2 = o.r + 8, sides = o.sides, th = o.th || 3.6, wood = shkS("wood", 0x6A5034), dark = shkS("wood", 0x3A2A1C), post = o.swan ? shkS("marble", 0xD8D0C8) : shkS("wood", 0x7A5A3A);
var stageA = -Math.PI / 2;
shkBox(g, Rm.hw * 2, 0.3, Rm.hd * 2, shkS("earth", 0xA08A6A), cx, -0.15, cz);
var DW = 2.4, Rw = R2 + 0.3, oh = th + 0.4, wallM = o.wall || shkS("frameB", 0xF2EEE4), hall = Math.PI / 2;
for (var s = 0; s < sides; s++) {
var a = (s + 0.5) / sides * Math.PI * 2, da = Math.atan2(Math.sin(a - stageA), Math.cos(a - stageA));
var mid = (r + R2) / 2, sl = 2 * mid * Math.sin(Math.PI / sides) + 0.2, x = cx + Math.cos(a) * mid, z = cz + Math.sin(a) * mid, ry = -a + Math.PI / 2;
var a0 = s / sides * Math.PI * 2, a1 = (s + 1) / sides * Math.PI * 2;
var behindStage = Math.abs(da) < Math.PI / sides * 2.6, door = Math.cos(a0) * Rw > -DW - 0.6 && Math.cos(a1) * Rw < DW + 0.6 && Math.sin(a) > 0;
if (!door)
shkBox(g, sl + 0.6, th * 3 + 0.6, 0.5, wallM, cx + Math.cos(a) * Rw, (th * 3 + 0.6) / 2, cz + Math.sin(a) * Rw, ry);
else {
shkBox(g, sl + 0.6, th * 3 + 0.6 - oh, 0.5, wallM, cx + Math.cos(a) * Rw, oh + (th * 3 + 0.6 - oh) / 2, cz + Math.sin(a) * Rw, ry);
var p0x = Math.cos(a0) * Rw, p0z = Math.sin(a0) * Rw, p1x = Math.cos(a1) * Rw, p1z = Math.sin(a1) * Rw, cuts = [0, 1];
[-DW, DW].forEach(function (W) { var u = (W - p0x) / (p1x - p0x); if (u > 0 && u < 1)
cuts.push(u); });
cuts.sort();
for (var c2 = 0; c2 < cuts.length - 1; c2++) {
var ua = cuts[c2], ub = cuts[c2 + 1], um = (ua + ub) / 2, mx = p0x + (p1x - p0x) * um;
if (Math.abs(mx) < DW)
continue;
var ax = p0x + (p1x - p0x) * ua, az = p0z + (p1z - p0z) * ua, bx = p0x + (p1x - p0x) * ub, bz = p0z + (p1z - p0z) * ub, ln = Math.hypot(bx - ax, bz - az);
if (ln < 0.05)
continue;
shkBox(g, ln + 0.3, oh, 0.5, wallM, cx + (ax + bx) / 2, oh / 2, cz + (az + bz) / 2, -Math.atan2(bz - az, bx - ax));
}
}
var rf = shkBox(g, sl + 0.6, 0.3, R2 - r + 1.5, shkS("thatch", 0xE8D8B0), x, th * 3 + 1.2, z, ry);
rf.rotation.x = 0;
rf.rotateX(-0.18);
if (behindStage)
continue;
for (var t = 0; t < 3; t++) {
var y = 0.6 + t * th;
if (door && t === 0)
continue;
shkBox(g, sl, 0.25, R2 - r, wood, x, y, z, ry);
SHK.floors.push({ ring: 1, cx: cx, cz: cz, r0: r, r1: R2, a: a, da: Math.PI / sides + 0.01, y: y + 0.12 });
shkBox(g, sl, 0.9, 0.12, dark, cx + Math.cos(a) * (r + 0.1), y + 0.6, cz + Math.sin(a) * (r + 0.1), ry);
for (var b = 1; b < 4; b++)
shkBox(g, sl, 0.45, 0.5, shkS("wood", 0x8A6A48), cx + Math.cos(a) * (r + b * 1.9), y + 0.35 + b * 0.32, cz + Math.sin(a) * (r + b * 1.9), ry);
}
if (door) {
[-1, 1].forEach(function (k) {
var ex = Math.cos(k < 0 ? a1 : a0) * mid;
if (k * ex <= DW + 0.3)
return;
var w2 = Math.abs(ex) - DW - 0.3, xm = cx + k * (DW + 0.3 + w2 / 2);
shkBox(g, w2, 0.25, R2 - r, wood, xm, 0.6, cz + Math.sin(a) * mid, ry);
shkFloor(xm, cz + Math.sin(a) * mid, w2 / 2, (R2 - r) / 2, 0.72);
shkBox(g, w2, 0.9, 0.12, dark, xm, 1.2, cz + Math.sin(a) * (r + 0.1), ry);
});
}
var pa = s / sides * Math.PI * 2, px = Math.cos(pa) * r;
if (!(Math.sin(pa) > 0 && Math.abs(px) < DW + 0.5)) {
shkCyl(g, 0.22, 0.24, th * 3 + 0.6, post, cx + px, (th * 3 + 0.6) / 2, cz + Math.sin(pa) * r, 8);
shkSolid({ x: cx + px, z: cz + Math.sin(pa) * r, r: 0.3 });
}
}
shkPlayhouseWay(g, cx, cz, Rm, { r: r, Rw: Rw, DW: DW, oh: oh, wall: wallM, post: post, dark: dark });
var sw = o.stageW || 16, sd = o.stageD || 13, sz0 = cz - R2 + 2, sz1 = sz0 + sd + 4, sh = 1.6;
shkBox(g, sw, sh, sz1 - sz0, shkS("wood", 0x9A7A52), cx, sh / 2, (sz0 + sz1) / 2);
shkFloor(cx, (sz0 + sz1) / 2, sw / 2, (sz1 - sz0) / 2, sh);
shkSolid({ x: cx, z: (sz0 + sz1) / 2, hw: sw / 2, hd: (sz1 - sz0) / 2, h: sh, b: 0 });
[-1, 1].forEach(function (k) { for (var q = 0; q < 3; q++) {
var sx = cx + k * (sw / 2 + 0.7), sz = sz1 - 1 - q * 0.9;
shkBox(g, 1.4, (q + 1) * 0.53, 0.9, shkS("wood", 0x8A6A48), sx, (q + 1) * 0.53 / 2, sz);
shkFloor(sx, sz, 0.7, 0.45, (q + 1) * 0.53);
} });
shkBox(g, 1.8, 0.04, 1.2, dark, cx, sh + 0.02, sz1 - sd * 0.45);
[-1, 1].forEach(function (k) { shkCyl(g, 0.42, 0.5, 8.6, post, cx + k * (sw / 2 - 2), sh + 4.3, sz1 - 3, 12); shkSolid({ x: cx + k * (sw / 2 - 2), z: sz1 - 3, r: 0.5 }); });
shkBox(g, sw + 2, 0.5, sd + 2, shkS("wood", 0x5A4030), cx, sh + 8.9, sz1 - sd / 2 - 1);
shkRoof(g, sw + 2, sd + 2, 3, shkS("thatch", 0xE8D8B0), shkS("frameA", 0xF2EEE4), cx, sh + 9.15, sz1 - sd / 2 - 1, 0, 0.4);
var hv = shkHeavensTex(), hm = new THREE.Mesh(new THREE.PlaneGeometry(sw + 1.6, sd + 1.6), new THREE.MeshLambertMaterial({ map: hv, side: THREE.DoubleSide }));
hm.rotation.x = Math.PI / 2;
hm.position.set(cx, sh + 8.62, sz1 - sd / 2 - 1);
g.add(hm);
var fz = sz0, fr = o.frons || shkS("frameA", 0xF2EEE4);
var fw = (sw + 12) / 2;
[-1, 1].forEach(function (k) {
shkBox(g, fw - 5, th * 3 + 0.6 - sh, 0.6, fr, cx + k * (fw + 5) / 2, sh + (th * 3 + 0.6 - sh) / 2, fz);
shkBox(g, 1.9, th * 3 + 0.6 - sh, 0.6, fr, cx + k * 2.25, sh + (th * 3 + 0.6 - sh) / 2, fz);
shkSolid({ x: cx + k * (fw + 5) / 2, z: fz, hw: (fw - 5) / 2, hd: 0.35 });
shkSolid({ x: cx + k * 2.25, z: fz, hw: 0.95, hd: 0.35 });
shkBox(g, 1.8, 3.2, 0.1, shkS("wood", 0x3A2A1C), cx + k * 4.1, sh + 1.6, fz + 0.32);
});
shkBox(g, sw + 12, 1.0, 0.6, fr, cx, sh + 4.2, fz);
shkBox(g, sw + 12, 2.3, 0.6, fr, cx, th * 3 - 0.6, fz);
shkBox(g, 2.6, 3.2, 0.1, shkC(0x8A1A2A), cx, sh + 1.6, fz + 0.32);
shkBox(g, sw - 2, 0.25, 1.8, wood, cx, sh + 4.6, fz + 1.2);
for (var bb = -6; bb <= 6; bb++)
shkCyl(g, 0.06, 0.06, 0.9, post, cx + bb * 1.15, sh + 5.2, fz + 2.05, 6);
shkBox(g, sw + 12, 0.25, 9, shkS("wood", 0x7A5A3A), cx, sh - 0.12, fz - 4.8);
shkFloor(cx, fz - 4.8, (sw + 12) / 2, 4.5, sh);
shkSolid({ x: cx, z: fz - 4.8, hw: (sw + 12) / 2, hd: 4.6, h: sh, b: 0 });
shkBox(g, sw + 12, th * 3 - sh, 0.4, shkS("plaster", 0xD8CCB8), cx, sh + (th * 3 - sh) / 2, fz - 9.4);
shkSolid({ x: cx, z: fz - 9.4, hw: (sw + 12) / 2, hd: 0.3 });
[-1, 1].forEach(function (k) { shkBox(g, 0.4, th * 3 - sh, 9, shkS("plaster", 0xD8CCB8), cx + k * (sw / 2 + 6), sh + (th * 3 - sh) / 2, fz - 4.8); shkSolid({ x: cx + k * (sw / 2 + 6), z: fz - 4.8, hw: 0.3, hd: 4.6 }); });
var cc = [0x8A1A2A, 0x2A3A7A, 0xC8A040, 0x2A6A3A, 0x5A2A6A, 0xE8E0D0, 0x1A1A1A];
for (var c = 0; c < (SHK.lite ? 6 : 14); c++) {
shkBox(g, 0.5, 1.5, 0.4, shkC(cc[c % cc.length]), cx - sw / 2 - 4 + c * 1.1, sh + 1.6, fz - 8.6);
}
shkBox(g, sw / 2, 0.06, 0.3, shkS("wood", 0x4A3424), cx - sw / 4, sh + 2.5, fz - 8.7);
Rm.ringR = R2;
Rm.cx = cx;
Rm.cz = cz;
Rm.tiring = { x0: cx - sw / 2 - 5.6, x1: cx + sw / 2 + 5.6, z0: fz - 9.1, z1: fz + 0.2 };
return { stage: { x: cx, z: sz1 - sd * 0.6, y: sh }, trap: { x: cx, z: sz1 - sd * 0.45 }, tiring: { x: cx, z: fz - 4.8, y: sh }, frons: fz, yardR: r, R2: R2 };
},
function (g, cx, cz, Rm, o) {
var DW = o.DW, oh = o.oh, Rw = o.Rw, z0 = cz + o.r + 0.4, z1 = cz + Rm.hd, wood = shkS("wood", 0x5A4030), pan = shkS("wood", 0x7A5A3A);
[-1, 1].forEach(function (k) {
var x = cx + k * (DW + 0.15);
shkBox(g, 0.3, oh, Rw - z0 + cz, pan, x, oh / 2, (z0 + cz + Rw) / 2);
shkSolid({ x: x, z: (z0 + cz + Rw) / 2, hw: 0.2, hd: (Rw - z0 + cz) / 2 });
shkCyl(g, 0.3, 0.32, oh + 0.4, o.post, x, (oh + 0.4) / 2, z0, 10);
});
shkBox(g, DW * 2 + 0.9, 0.5, 0.6, wood, cx, oh + 0.15, z0);
var lz0 = cz + Rw - 0.3, ld = z1 - lz0;
[-1, 1].forEach(function (k) {
var x = cx + k * (DW + 0.3);
shkBox(g, 0.4, oh, ld, o.wall, x, oh / 2, lz0 + ld / 2);
shkSolid({ x: x, z: lz0 + ld / 2, hw: 0.25, hd: ld / 2 });
shkBox(g, 0.08, 0.3, 0.2, o.dark, cx + k * (DW + 0.05), oh - 0.6, lz0 + ld * 0.35);
shkBox(g, 0.2, 0.28, 0.2, shkGlowM(0xFFC870), cx + k * (DW + 0.05), oh - 0.85, lz0 + ld * 0.35);
});
shkBox(g, DW * 2 + 0.8, 0.25, ld, shkS("plaster", 0xE8E0D0), cx, oh + 0.12, lz0 + ld / 2);
for (var b = 0; b < 4; b++)
shkBox(g, DW * 2 + 0.6, 0.22, 0.22, wood, cx, oh - 0.12, lz0 + 0.6 + b * (ld - 1.2) / 3);
shkBox(g, DW * 2 - 0.4, 0.03, ld - 0.6, shkC(0xB8A060), cx, 0.02, lz0 + ld / 2);
var dz = z1 - 0.25, fr = shkS("wood", 0x3A2A1C);
[-1, 1].forEach(function (k) {
shkBox(g, 0.35, oh, 0.5, fr, cx + k * (DW - 0.15), oh / 2, dz);
var leaf = shkBox(g, 0.1, oh - 0.4, DW - 0.4, shkS("wood", 0x4A3220), cx + k * (DW - 0.1), (oh - 0.4) / 2, dz - (DW - 0.4) / 2 - 0.3);
for (var q = 0; q < 3; q++)
shkBox(g, 0.12, 0.1, DW - 0.5, o.dark, cx + k * (DW - 0.13), 0.5 + q * (oh - 1.2) / 2, dz - (DW - 0.4) / 2 - 0.3);
});
shkBox(g, DW * 2 + 0.4, 0.45, 0.5, fr, cx, oh - 0.2, dz);
var day = shkBox(g, DW * 2 - 0.3, oh - 0.45, 0.05, shkGlowM(0xFFF2D8), cx, (oh - 0.45) / 2, z1 + 0.05);
day.userData.keep = 1;
shkSpot(cx, z1 - 2.6, 2.2, "The door out to Bankside", "go back out", function () { shkGoOut(Rm.k); });
Rm.walkOut = { x: cx, z: z1 - 1.9, w: DW };
},
function () {
if (SHK.tex.heavens)
return SHK.tex.heavens;
return (SHK.tex.heavens = wTex(512, 512, function (x, W, H) {
var g = x.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.7);
g.addColorStop(0, "#2A3A7A");
g.addColorStop(1, "#141C40");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var R = wRand(23);
x.fillStyle = "#E8C860";
for (var i = 0; i < 90; i++) {
var sx = R() * W, sy = R() * H, s = 2 + R() * 5;
x.beginPath();
for (var p = 0; p < 10; p++) {
var a = p / 10 * Math.PI * 2, rr = p & 1 ? s * 0.4 : s;
x.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr);
}
x.fill();
}
x.fillStyle = "#F2C040";
x.beginPath();
x.arc(W * 0.3, H * 0.5, 44, 0, 7);
x.fill();
x.strokeStyle = "#F2C040";
x.lineWidth = 5;
for (var q = 0; q < 16; q++) {
var a2 = q / 16 * 6.283;
x.beginPath();
x.moveTo(W * 0.3 + Math.cos(a2) * 52, H * 0.5 + Math.sin(a2) * 52);
x.lineTo(W * 0.3 + Math.cos(a2) * 72, H * 0.5 + Math.sin(a2) * 72);
x.stroke();
}
x.fillStyle = "#E8E4D8";
x.beginPath();
x.arc(W * 0.72, H * 0.5, 38, 0, 7);
x.fill();
x.fillStyle = "#1E2A5A";
x.beginPath();
x.arc(W * 0.72 + 16, H * 0.5 - 6, 34, 0, 7);
x.fill();
x.strokeStyle = "#C8A040";
x.lineWidth = 3;
x.beginPath();
x.arc(W / 2, H / 2, W * 0.44, 0, 7);
x.stroke();
x.beginPath();
x.arc(W / 2, H / 2, W * 0.38, 0, 7);
x.stroke();
x.fillStyle = "#E8C860";
x.font = "bold 26px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
var Z = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
for (var z = 0; z < 12; z++) {
var a3 = z / 12 * 6.283;
x.fillText(Z[z] + "︎", W / 2 + Math.cos(a3) * W * 0.41, H / 2 + Math.sin(a3) * W * 0.41);
}
}));
},
function (x, z, f) {
var best = null, L = SHK.floors;
for (var i = 0; i < L.length; i++) {
var F = L[i], y = F.y;
if (y > f + 0.75)
continue;
if (F.ring) {
var dx = x - F.cx, dz = z - F.cz, d = Math.hypot(dx, dz);
if (d < F.r0 || d > F.r1)
continue;
var a = Math.atan2(dz, dx), da = Math.atan2(Math.sin(a - F.a), Math.cos(a - F.a));
if (Math.abs(da) > F.da)
continue;
}
else if (Math.abs(x - F.x) > F.hw || Math.abs(z - F.z) > F.hd)
continue;
if (best === null || y > best)
best = y;
}
return best;
},
function (g, cx, cz, R, Rm) {
var P = shkPlayhouseIn(g, cx, cz, Rm, { r: 26, sides: 20, stageW: 17, stageD: 13 }, R);
Rm.entry = { x: 0, z: cz + 36.5, yaw: 0 };
Rm.hello = "<b>Inside the Globe.</b> It is bigger inside than out, as a good playhouse should be. The yard is open to the sky; three galleries ring it; the stage juts out under its painted heavens. Above the doors at the back is the tiring-house, where the players dress. <b>To see a play, buy a ticket from Mistress Alice or the playbill here by the door, and take your seat.</b> Press E on the stage to tread the boards yourself.";
shkSpot(cx, P.stage.z, 3, "The stage of the Globe", "tread the boards (speak a famous speech)", function () { shkStageCard(); }, P.stage.y);
shkSpot(cx, P.trap.z, 1.6, "The trapdoor in the stage", "go down into 'hell', to the Hall of Plays", function () { shkGoIn("plays"); }, P.stage.y);
shkSpot(cx + 1.4, P.R2 + 3.4, 1.6, "The gallery stairs", "climb to a gallery", function () { shkStairsCard(Rm, cx, cz, P); });
shkSpot(cx - 1.4, P.R2 + 5.6, 1.8, "The playbill and the box office", "show times, tickets, and how the Globe works", function () { shkGlobeFacts(); });
var bill = wSign(["TODAY AT THE GLOBE", shkToday()[0], "tickets here"], 1.6, 1.3, "#F0E8D0", "#2A1E14");
bill.position.set(cx - 2.42, 2.1, P.R2 + 5.6);
bill.rotation.y = Math.PI / 2;
g.add(bill);
shkPerson("gatherer", cx + 1.7, P.R2 + 6.6, -Math.PI / 2, { verb: "buy a ticket (or talk)", fn: function () { shkgBoxCard(); } });
shkPerson("burbage", cx - 3, P.stage.z - 1, 0, { y: P.stage.y, wander: { r: 3, sp: 0.6 } });
shkPerson("armin", cx + 9, cz + 4, Math.PI * 0.8, { wander: { r: 4, sp: 0.7 } });
shkPerson("will", cx - 4, P.tiring.z + 1, 0.4, { y: P.tiring.y });
shkBox(g, 1.4, 0.08, 0.8, shkS("wood", 0x5A3E26), cx - 6.2, P.tiring.y + 0.82, P.tiring.z + 0.4);
[-0.6, 0.6].forEach(function (o) { shkBox(g, 0.08, 0.8, 0.7, shkS("wood", 0x4A3220), cx - 6.2 + o, P.tiring.y + 0.4, P.tiring.z + 0.4); });
var pap = shkBox(g, 0.5, 0.03, 0.36, shkC(0xEDE2C4), cx - 6.4, P.tiring.y + 0.87, P.tiring.z + 0.4);
pap.rotation.y = 0.2;
var fol = shkBox(g, 0.42, 0.1, 0.3, shkC(0x5A1E14), cx - 5.85, P.tiring.y + 0.91, P.tiring.z + 0.35);
fol.rotation.y = -0.3;
if (typeof shkTiringDress === "function")
try {
shkTiringDress(g, cx, P);
}
catch (e) { }
shkSpot(cx - 6.2, P.tiring.z + 1.3, 1.8, "Master Shakespeare's desk", "read every word he wrote (the complete works)", function () { shkFolio(); }, P.tiring.y);
shkPerson("bookkeeper", cx + 5, P.tiring.z + 1, -0.4, { y: P.tiring.y });
shkCrowd(SHK.lite ? 6 : 10, cx, cz + 6, 15, R, { wr: 3, ok: function (x, z) { return Math.hypot(x - cx, z - cz) < 23 && z > P.stage.z + 8; } });
for (var k = 0; k < (SHK.lite ? 5 : 10); k++) {
var a = -Math.PI / 2 + (R() - 0.5) * 0.2 + (k & 1 ? 1 : -1) * (0.7 + R() * 1.9), t = (R() * 3) | 0, rr = 26 + 2 + R() * 4;
var p = wPerson("shkg_" + k, { look: shkFolkLook(R) });
p.position.set(cx + Math.cos(a) * rr, 0.75 + t * 3.6, cz + Math.sin(a) * rr);
p.rotation.y = Math.atan2(cx - p.position.x, cz - p.position.z);
SHK.live.add(p);
SHK.people.push({ g: p });
}
},
function (g, cx, cz, R, Rm) {
var P = shkPlayhouseIn(g, cx, cz, Rm, { r: 17, sides: 14, stageW: 12, stageD: 9, th: 3.3 }, R);
Rm.entry = { x: 0, z: cz + 27, yaw: 0 };
Rm.hello = "<b>Inside the Rose</b>, Philip Henslowe's playhouse (1587), home of the Admiral's Men. Smaller than the Globe, and older. Edward Alleyn is rehearsing.";
shkPerson("henslowe", cx + 5, cz + 18, Math.PI);
shkPerson("alleyn", cx, P.stage.z, 0, { y: P.stage.y, wander: { r: 3, sp: 0.5 } });
shkSpot(cx - 6, cz + 22, 3, "Henslowe's diary", "read his accounts", function () { worldCard(worldFacts("Henslowe's diary", "Philip Henslowe's account book, 1592-1609", [["A new play", "He paid writers about £6 for a whole new play"], ["A costume", "A single cloak could cost £20 or more: more than a play"], ["A penny", "The yard, a penny; most of the money came from the galleries"], ["Marlowe", "Doctor Faustus, Tamburlaine and The Jew of Malta played here"]], ["The diary survives at Dulwich College, which Edward Alleyn founded. Without it we would know far less about how the playhouses worked.", "The Rose was dug up in 1989: you can still see its outline in London."]), {}); });
shkCrowd(6, cx, cz + 6, 9, R, { wr: 2, ok: function (x, z) { return Math.hypot(x - cx, z - cz) < 15 && z > P.stage.z + 6; } });
},
function (g, cx, cz, R, Rm) {
var P = shkPlayhouseIn(g, cx, cz, Rm, { r: 19, sides: 24, stageW: 13, stageD: 10, swan: true, wall: shkS("flint", 0xF2EEE6), frons: shkS("marble", 0xD8D0C8) }, R);
Rm.entry = { x: 0, z: cz + 29.5, yaw: 0 };
Rm.hello = "<b>Inside the Swan</b> (1595), the biggest and finest of the playhouses: its wooden columns are painted so well you would swear they were marble.";
shkPerson("dewitt", cx + 6, cz + 12, Math.PI * 0.9);
shkSpot(cx + 4, cz + 16, 3, "De Witt's drawing", "look at his sketch", function () { worldCard(worldFacts("The Swan, drawn by Johannes de Witt (1596)", "The only picture of the inside of an Elizabethan playhouse", [["The stage", "A great platform on posts, jutting into the yard"], ["The heavens", "A roof over the stage on two great columns"], ["The tiring-house", "Two doors onto the stage, a gallery above"], ["The crowd", "De Witt says it held 3,000"]], ["Everything we know about how the Globe looked inside starts from this one drawing (a copy made by his friend Arend van Buchell, found in a library in Utrecht in 1888)."]), {}); });
},
function (g, cx, cz, R, Rm) {
var up = shkShell(g, cx, cz, Rm, { h: 12, floor: shkS("stone", 0x9A9488), wall: shkS("stone", 0xB8B0A0), ceil: shkS("stone", 0x8A8478), outName: "The stair up to the trapdoor" });
up.verb = "climb back up onto the Globe's stage";
up.fn = function () { shkMove(shkRoomX("globe"), -18, Math.PI, "You climb up through the trapdoor onto the Globe's stage.", null, 1.6); };
Rm.entry = { x: 0, z: cz + Rm.hd - 5, yaw: 0 };
Rm.hello = "<b>The Hall of Plays</b>, under the Globe's stage, where the players called it 'hell'. Sixteen doors, one for each play, each opening into the play's own world. Walk up to a door and press E.";
for (var z = -Rm.hd + 6; z < Rm.hd; z += 12) {
for (var a = 0; a <= 8; a++) {
var an = a / 8 * Math.PI, b = shkBox(g, 3, 1.2, 1.4, shkS("stone", 0xA8A090), cx + Math.cos(an) * (Rm.hw - 1.5), 8 + Math.sin(an) * 4, cz + z);
b.rotation.z = an - Math.PI / 2;
}
[-1, 1].forEach(function (k) { shkBox(g, 1.6, 8, 1.6, shkS("stone", 0xA8A090), cx + k * (Rm.hw - 0.8), 4, cz + z); });
}
var ids = SHK_PLAY_IDS;
ids.forEach(function (id, i) {
var T = CT_BY_ID[id];
if (!T)
return;
var k = i < 8 ? -1 : 1, z = cz + Rm.hd - 18 - (i % 8) * 16.5, x = cx + k * (Rm.hw - 0.3), ry = k < 0 ? Math.PI / 2 : -Math.PI / 2;
var col = parseInt((T.col && T.col[0] || "#5A3A2A").slice(1), 16);
shkBox(g, 0.4, 5.4, 4, shkS("wood", 0x3A2A1C), x, 2.7, z);
shkBox(g, 0.3, 4.6, 3, shkC(col), x - k * 0.12, 2.4, z);
var sg = wSign([T.t, T.keep[1]], 3.8, 1.2, "#2A1E14", "#E8D0A0");
sg.position.set(x - k * 0.3, 6.2, z);
sg.rotation.y = ry;
g.add(sg);
shkBox(g, 0.3, 0.45, 0.3, shkGlowM(0xFFD490), x - k * 0.5, 4.6, z - 2.6);
shkBox(g, 0.3, 0.45, 0.3, shkGlowM(0xFFD490), x - k * 0.5, 4.6, z + 2.6);
shkSpot(x - k * 2.4, z, 3, T.t, "open the door", function () { shkPlayCard(id); });
});
shkBox(g, 1.6, 1.1, 1, shkS("wood", 0x5A4030), cx, 0.55, cz);
shkBox(g, 1.4, 0.1, 1, shkC(0xF0E8D0), cx, 1.15, cz);
shkSolidBox(cx, cz, 1.6, 1, 0);
shkSpot(cx, cz + 1.8, 2.6, "The great book of plays", "see all sixteen, and how far you have got", function () { shkPlaysAll(); });
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 28, floor: shkS("marble", 0xD8D0C0), wall: shkS("stone", 0xC8C0AC), ceil: shkS("stone", 0xB8B0A0) });
Rm.hello = "<b>Paul's Walk</b>, the long middle of St Paul's: all London comes here to walk, gossip, show off, hire servants and strike bargains. A gallant over there will test you: <b>Who said it?</b>";
var stone = shkS("stone", 0xD0C8B4);
for (var z = -Rm.hd + 10; z < Rm.hd - 6; z += 10)
[-1, 1].forEach(function (k) {
shkCyl(g, 1.3, 1.4, 20, stone, cx + k * 8, 10, cz + z, 12);
for (var c = 0; c < 4; c++)
shkCyl(g, 0.35, 0.35, 20, stone, cx + k * 8 + Math.cos(c * 1.57) * 1.3, 10, cz + z + Math.sin(c * 1.57) * 1.3, 6);
shkSolid({ x: cx + k * 8, z: cz + z, r: 1.7 });
var ar = shkBox(g, 0.8, 1.2, 10, stone, cx + k * 8, 21, cz + z + 5);
shkLightWin(g, cx + k * (Rm.hw - 0.1), 20, cz + z + 5, 0.1, 1, 0);
shkBox(g, 0.15, 7, 3, shkGlowM(0xD8DCE0), cx + k * (Rm.hw - 0.05), 18, cz + z + 5);
});
var rw = new THREE.Mesh(new THREE.CircleGeometry(7, 24), new THREE.MeshBasicMaterial({ map: shkRoseTex() }));
rw.position.set(cx, 18, cz - Rm.hd + 0.1);
g.add(rw);
shkBox(g, 20, 6, 1.5, shkS("wood", 0x5A4030), cx, 3, cz - Rm.hd + 4);
shkSolidBox(cx, cz - Rm.hd + 4, 20, 1.5, 0);
shkBox(g, 2.6, 4, 0.2, shkS("wood", 0x4A3424), cx - Rm.hw + 0.2, 2, cz + 20, Math.PI / 2);
for (var n = 0; n < 14; n++)
shkBox(g, 0.05, 0.4, 0.3, shkC(0xF0E8D0), cx - Rm.hw + 0.36, 1 + R() * 2.6, cz + 19 + R() * 2.2);
shkSpot(cx - Rm.hw + 2.4, cz + 20, 3, "The 'Si quis' door", "read the notices", function () { shkSiQuis(); });
shkBox(g, 3, 1.4, 1.6, stone, cx + Rm.hw - 3, 0.7, cz - 10);
shkSolidBox(cx + Rm.hw - 3, cz - 10, 3, 1.6, 0);
shkSpot(cx + Rm.hw - 5, cz - 10, 3, "Duke Humphrey's tomb", "read the old joke", function () { worldCard(worldFacts("Duke Humphrey's tomb", "In Paul's Walk", [], ["Gallants with no money for dinner would hang about here at noon, pretending to admire the tomb. They were said to 'dine with Duke Humphrey'.", "(The tomb is really Sir John Beauchamp's, but everyone calls it Duke Humphrey's.)"]), {}); });
shkPerson("gallant", cx + 3, cz + 40, Math.PI * 0.9, { wander: { r: 2, sp: 0.4 }, verb: "play 'Who said it?'", fn: function () { shkWhoCard(); } });
shkCrowd(SHK.lite ? 6 : 10, cx, cz, 60, R, { wr: 16, ok: function (x, z) { return Math.abs(x - cx) < 6 || Math.abs(x - cx) > 10 && Math.abs(x - cx) < 17; } });
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 10, floor: shkS("wood", 0x7A5A3A), wall: shkS("wood", 0x5A4030), ceil: shkS("plaster", 0xE8E0D0) });
Rm.hello = "<b>The Folio Library</b> at Stationers' Hall: every word he wrote, his life, his words, his playhouse. <b>Press E at the First Folio</b> to read every word he wrote, or at the reading tables to search the catalogue.";
for (var z = -Rm.hd + 3; z < Rm.hd - 6; z += 6) {
[-1, 1].forEach(function (k) { shkBox(g, 0.5, 4, 5.6, shkBooksM(), cx + k * (Rm.hw - 0.4), 2, cz + z + 2.8); shkBox(g, 0.5, 3.4, 5.6, shkBooksM(), cx + k * (Rm.hw - 0.4), 6.6, cz + z + 2.8); });
}
shkBox(g, Rm.hw * 2, 0.25, 2.4, shkS("wood", 0x5A4030), cx, 4.6, cz - Rm.hd + 1.2);
for (var t = 0; t < 3; t++) {
var tz = cz - 14 + t * 10;
shkBox(g, 8, 0.12, 2, shkS("wood", 0x6A4A30), cx, 0.85, tz);
[-3.6, 3.6].forEach(function (o) { shkBox(g, 0.2, 0.85, 1.6, shkS("wood", 0x4A3424), cx + o, 0.42, tz); });
shkSolidBox(cx, tz, 8, 2, 0);
for (var b = 0; b < 4; b++)
shkBox(g, 0.35, 0.08, 0.5, shkC([0x6A1A1A, 0x2A3A5A, 0x5A4A2A, 0x3A5A3A][b]), cx - 3 + b * 2, 0.95, tz);
}
shkBox(g, 0.8, 1.1, 0.6, shkS("wood", 0x4A3424), cx, 0.55, cz + 8);
var bk = shkBox(g, 0.9, 0.12, 0.6, shkC(0x5A2A1A), cx, 1.2, cz + 8);
bk.rotation.x = -0.3;
shkSolidBox(cx, cz + 8, 0.8, 0.6, 0);
shkSpot(cx, cz + 9.6, 2.8, "The First Folio (1623)", "read every word he wrote", function () { shkFolio(); });
shkSpot(cx, cz - 14, 3.2, "The library's catalogue", "search the library", function () { shkLibrary(""); });
var mg = new THREE.Group();
mg.position.set(cx + 8, 0.95, cz + 16);
mg.scale.setScalar(0.06);
g.add(mg);
shkCyl(mg, 15, 15, 10, shkS("frameB", 0xF4F0E6), 0, 5, 0, 20, true);
shkCyl(mg, 10.6, 15.4, 2.6, shkS("thatch", 0xE8D8B0), 0, 11.3, 0, 20, true);
shkBox(mg, 16, 1.6, 13, shkS("wood", 0x9A7A52), 0, 0.8, -6);
shkBox(g, 3, 0.9, 3, shkS("wood", 0x5A4030), cx + 8, 0.45, cz + 16);
shkSolidBox(cx + 8, cz + 16, 3, 3, 0);
shkSpot(cx + 8, cz + 18, 2.6, "A model of the Globe", "learn how a playhouse worked", function () { shkLibrary("@house"); });
shkBox(g, 1.2, 1.2, 1.2, shkC(0x4A6A8A), cx - 8, 1.5, cz + 16);
var gl = wSph(0.9, shkC(0x6A8AAA), cx - 8, 2.4, cz + 16, g, 16);
shkBox(g, 1.6, 0.9, 1.6, shkS("wood", 0x5A4030), cx - 8, 0.45, cz + 16);
shkSolidBox(cx - 8, cz + 16, 1.6, 1.6, 0);
shkPerson("librarian", cx + 2, cz + 6, Math.PI * 0.9);
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 5, floor: shkS("wood", 0x6A5034), wall: shkS("plaster", 0xE0D8C8) });
Rm.hello = "<b>The Print Shop at the Sign of the Green Dragon.</b> The press creaks, the ink smells of soot and linseed, and sheets of a new play hang drying overhead.";
var p = new THREE.Group();
p.position.set(cx - 3, 0, cz - 4);
g.add(p);
var oak = shkS("wood", 0x5A4030);
[-0.9, 0.9].forEach(function (k) { shkBox(p, 0.35, 2.6, 0.35, oak, k, 1.3, 0); });
shkBox(p, 2.2, 0.4, 0.5, oak, 0, 2.4, 0);
shkBox(p, 2.2, 0.35, 0.5, oak, 0, 1.7, 0);
shkCyl(p, 0.12, 0.12, 0.6, shkC(0x6A6A70), 0, 1.95, 0, 8);
shkBox(p, 0.06, 0.06, 1.2, shkC(0x3A3A3A), 0.2, 1.6, 0.5).rotation.y = 0.6;
shkBox(p, 0.9, 0.12, 0.7, oak, 0, 1.45, 0);
shkBox(p, 1.1, 0.12, 2.6, oak, 0, 0.95, 0.6);
shkBox(p, 1, 0.06, 0.8, shkC(0xF0E8D0), 0, 1.04, 1.4);
shkSolidBox(cx - 3, cz - 4, 2.4, 2.8, 0);
for (var c = 0; c < 2; c++) {
var tc = shkBox(g, 1.8, 0.08, 1, shkC(0x8A6A48), cx + 5, 1.1 + c * 0.5, cz - 6 + c * 0.2);
tc.rotation.x = -0.35 - c * 0.15;
}
shkBox(g, 1.8, 1.05, 0.6, shkS("wood", 0x5A4030), cx + 5, 0.52, cz - 5.8);
shkSolidBox(cx + 5, cz - 5.8, 1.8, 1, 0);
for (var l = 0; l < 4; l++) {
shkBox(g, Rm.hw * 2 - 2, 0.02, 0.02, shkC(0x8A7A5A), cx, 3.9, cz - 2 + l * 1.6);
for (var s = 0; s < 7; s++)
shkBox(g, 0.6, 0.8, 0.01, shkC(0xF2EAD8), cx - 8 + s * 2.6 + (l & 1), 3.5, cz - 2 + l * 1.6);
}
shkBox(g, 1.2, 0.8, 0.9, shkC(0xF0E8D0), cx + 7, 0.4, cz + 3);
shkSolidBox(cx + 7, cz + 3, 1.2, 0.9, 0);
shkPerson("printer", cx + 3.5, cz - 4, -Math.PI / 2);
shkSpot(cx + 4, cz - 3.6, 2.8, "The compositor's case", "set a line of type, and print it", function () { shkPrintCard(); });
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 4.2, floor: shkS("wood", 0x5A4030), wall: shkS("frameA", 0xE8DCC0), ceil: shkS("wood", 0x4A3424) });
Rm.hello = "<b>The Mermaid Tavern.</b> Low beams, a fire, the hum of talk. Ben Jonson holds court at the corner table.";
for (var b = -Rm.hd + 2; b < Rm.hd; b += 3)
shkBox(g, Rm.hw * 2, 0.3, 0.3, shkS("wood", 0x3A2A1C), cx, 4, cz + b);
shkBox(g, 8, 1.1, 1, shkS("wood", 0x5A4030), cx + Rm.hw - 6, 0.55, cz - 4);
shkSolidBox(cx + Rm.hw - 6, cz - 4, 8, 1, 0);
for (var k = 0; k < 5; k++) {
var br = shkCyl(g, 0.5, 0.5, 1, shkS("wood", 0x7A5A3A), cx + Rm.hw - 1, 0.5 + (k > 2 ? 1 : 0), cz - 9 + (k % 3) * 1.2, 10);
br.rotation.x = Math.PI / 2;
}
shkSolidBox(cx + Rm.hw - 1, cz - 8, 1.2, 4, 0);
shkBox(g, 3, 3, 1, shkS("brick", 0x8A5040), cx - Rm.hw + 0.5, 1.5, cz - 6);
shkBox(g, 1.6, 0.6, 0.4, shkGlowM(0xE88A3A), cx - Rm.hw + 1.1, 0.5, cz - 6);
var tables = [[-6, 4], [0, 4], [6, 4], [-6, -2], [-1, -2], [-6, -8]];
tables.forEach(function (t) {
var tx = cx + t[0], tz = cz + t[1];
shkBox(g, 2.6, 0.1, 1.2, shkS("wood", 0x6A4A30), tx, 0.8, tz);
shkBox(g, 0.2, 0.75, 0.8, shkS("wood", 0x4A3424), tx, 0.38, tz);
[-1, 1].forEach(function (s) { shkBox(g, 2.6, 0.45, 0.35, shkS("wood", 0x5A4030), tx, 0.22, tz + s * 1); });
shkSolidBox(tx, tz, 2.6, 1.2, 0);
for (var q = 0; q < 2; q++)
shkCyl(g, 0.08, 0.07, 0.16, shkC(0x8A8A90), tx - 0.6 + q * 1.2, 0.93, tz, 8);
});
shkPerson("jonson", cx - 6, cz - 9.2, 0, { verb: "take him on in an insult duel", fn: function () { shkInsultCard(); } });
shkPerson("barmaid", cx + Rm.hw - 6, cz - 5.4, 0);
shkCrowd(SHK.lite ? 3 : 4, cx, cz + 1, 6, R, { still: true, ok: function (x, z) { return !shkSolidAt(x, z, 0); } });
shkBox(g, 1.4, 0.04, 1.4, shkS("wood", 0x3A2A1C), cx + Rm.hw - 3, 0.02, cz - 7);
shkSpot(cx + Rm.hw - 3, cz - 7, 1.8, "A trapdoor behind the bar", "go down to the cellar", function () { shkGoIn("cellar"); });
shkSpot(cx - 6, cz - 6.4, 2.2, "The wits' corner", "read who met here", function () { worldCard(worldFacts("The Mermaid Tavern, Bread Street", "Where London's wits met", [["Ben Jonson", "Playwright and poet, the club's loudest voice"], ["John Donne", "Poet"], ["Francis Beaumont", "Playwright, who wrote a verse letter to Jonson remembering 'what things have we seen done at the Mermaid!'"]], ["Was Shakespeare a regular? Nobody can prove it. An old story tells of 'wit-combats' between him and Jonson: Jonson 'like a Spanish great galleon', slow and solid; Shakespeare 'like an English man-of-war', quick and nimble."]), {}); });
},
function (g, cx, cz, R, Rm) {
var lad = shkShell(g, cx, cz, Rm, { h: 2.8, floor: shkS("stone", 0x8A8478), wall: shkS("stone", 0x9A9488), ceil: shkS("wood", 0x3A2A1C), outName: "The ladder up" });
lad.verb = "climb back up to the tavern";
lad.fn = function () { shkMove(shkRoomX("mermaid") + 11, -5.0, 0, "Up the ladder, back behind the Mermaid's bar."); };
Rm.hello = "<b>The Mermaid's cellar.</b> Casks, cobwebs and the cold smell of old stone. Somebody once hid something down here.";
for (var k = 0; k < 10; k++) {
var bx = cx - Rm.hw + 1 + (k % 5) * 1.3, bz = cz - Rm.hd + 1 + (k > 4 ? 1.3 : 0), br = shkCyl(g, 0.55, 0.55, 1.1, shkS("wood", 0x7A5A3A), bx, 0.6, bz, 10);
br.rotation.z = Math.PI / 2;
}
shkSolidBox(cx - Rm.hw + 3.6, cz - Rm.hd + 1.6, 7, 2.8, 0);
shkBox(g, 0.6, 0.6, 0.6, shkGlowM(0xFFC880), cx + Rm.hw - 0.6, 2, cz - 2);
for (var w = 0; w < 6; w++) {
var web = shkBox(g, 0.9, 0.02, 0.9, shkC(0xD8D8D0), cx - Rm.hw + 0.6 + w * 3, 2.7, cz + (w & 1 ? Rm.hd - 0.6 : -Rm.hd + 0.6));
web.rotation.y = 0.7;
}
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 9, floor: shkS("wood", 0x9A7A52), wall: shkS("plaster", 0xE8E0D0), ceil: shkS("wood", 0x5A4030) });
Rm.hello = "<b>The School of Defence.</b> The floor is scored with circles and lines for footwork; rapiers, daggers and bucklers hang on the walls. Master Saviolo is waiting.";
var ring = new THREE.Mesh(new THREE.RingGeometry(5.6, 5.8, 40), shkC(0x3A2A1C));
ring.rotation.x = -Math.PI / 2;
ring.position.set(cx, 0.02, cz);
g.add(ring);
for (var l = -1; l <= 1; l++) {
var ln = shkBox(g, 0.1, 0.02, 11.4, shkC(0x3A2A1C), cx, 0.02, cz);
ln.rotation.y = l * Math.PI / 4;
}
for (var r2 = 0; r2 < 6; r2++) {
[-1, 1].forEach(function (k) { var w = shkBox(g, 0.04, 1.6, 0.04, shkC(0xC8CCD4), cx + k * (Rm.hw - 0.3), 2.4, cz - 12 + r2 * 1.2); w.rotation.x = 0.1; shkBox(g, 0.06, 0.06, 0.3, shkC(0xC8A040), cx + k * (Rm.hw - 0.3), 1.55, cz - 12 + r2 * 1.2); });
}
[-6, 6].forEach(function (o) { shkCyl(g, 0.2, 0.2, 1.9, shkS("wood", 0x6A5034), cx + o, 0.95, cz + 10, 8); shkSolid({ x: cx + o, z: cz + 10, r: 0.3 }); });
shkPerson("saviolo", cx, cz - 3, 0, { verb: "take a lesson in rapier and dagger", fn: function () { shkFenceCard(); } });
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 16, floor: shkS("tile", 0x9A6A4A), wall: shkS("stone", 0xD8D0BC), ceil: shkS("wood", 0x4A3424) });
Rm.hello = "<b>The Great Hall of Whitehall Palace.</b> The Queen sits under her canopy at the far end. At Christmas the Lord Chamberlain's Men play here. Today, you will.";
for (var z = -Rm.hd + 4; z < Rm.hd; z += 6) {
shkBox(g, Rm.hw * 2, 0.5, 0.5, shkS("wood", 0x4A3424), cx, 12.5, cz + z);
[-1, 1].forEach(function (k) { var hb = shkBox(g, 4, 0.5, 0.5, shkS("wood", 0x4A3424), cx + k * (Rm.hw - 2), 11.4, cz + z); hb.rotation.z = k * 0.6; shkBox(g, 0.4, 0.4, 0.6, shkC(0xC8A040), cx + k * (Rm.hw - 3.8), 10.6, cz + z); });
}
var tap = [0x6A2A2A, 0x2A4A3A, 0x3A3A6A, 0x6A4A2A];
for (var t = 0; t < 5; t++)
[-1, 1].forEach(function (k) { shkBox(g, 0.08, 6, 9, shkS("frameC", tap[(t + k + 2) % 4]), cx + k * (Rm.hw - 0.1), 5, cz - 26 + t * 12); });
shkBox(g, 12, 0.8, 8, shkS("wood", 0x6A4A30), cx, 0.4, cz - Rm.hd + 4);
shkFloor(cx, cz - Rm.hd + 4, 6, 4, 0.8);
shkSolid({ x: cx, z: cz - Rm.hd + 4, hw: 6, hd: 4, h: 0.8, b: 0 });
shkBox(g, 12, 0.1, 4, shkC(0xA82A2A), cx, 0.86, cz - Rm.hd + 6);
shkBox(g, 2, 3, 1.4, shkC(0xC8A040), cx, 2.3, cz - Rm.hd + 1.6);
shkBox(g, 4.4, 0.3, 3.4, shkC(0xD8B048), cx, 6.2, cz - Rm.hd + 2);
shkBox(g, 4.4, 5.4, 0.1, shkC(0x8A1A2A), cx, 3.5, cz - Rm.hd + 0.4);
shkSolidBox(cx, cz - Rm.hd + 1.8, 3, 2, 0);
shkPerson("queen", cx, cz - Rm.hd + 2.6, 0, { y: 0.8 });
shkBox(g, 8, 0.03, 6, shkC(0x5A3A6A), cx, 0.02, cz - Rm.hd + 14);
shkSpot(cx, cz - Rm.hd + 14, 3.4, "Before the Queen", "play for Her Majesty", function () { shkQueenCard(); });
shkCrowd(SHK.lite ? 3 : 5, cx, cz, 12, R, { still: true, ok: function (x, z) { return Math.abs(x - cx) > 5 && z > cz - Rm.hd + 10; } });
for (var gd = 0; gd < 2; gd++) {
var p = wPerson("shk_yeoman" + gd, { look: { layer: "armor", layerColor: 0xC83A2A, top: 0xC83A2A, bottom: 0x1A1A1A, hat: "brimmed", hatColor: 0x1A1A1A } });
p.position.set(cx + (gd ? 5 : -5), 0.8, cz - Rm.hd + 3);
SHK.live.add(p);
SHK.people.push({ g: p });
}
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 3.4, floor: shkS("stone", 0xB0A890), wall: shkS("frameA", 0xF0E8D8), ceil: shkS("wood", 0x4A3424) });
Rm.hello = "<b>The Shakespeares' house in Henley Street.</b> On the left, John Shakespeare's glove workshop; on the right, the hall with its fire; upstairs, the room where William was born in 1564.";
shkBox(g, 0.3, 3.4, Rm.hd * 1.2, shkS("frameA", 0xF0E8D8), cx, 1.7, cz - Rm.hd * 0.4);
shkSolid({ x: cx, z: cz - Rm.hd * 0.4, hw: 0.2, hd: Rm.hd * 0.6 });
shkBox(g, 4, 0.9, 1.4, shkS("wood", 0x6A4A30), cx - 6, 0.45, cz - 4);
shkSolidBox(cx - 6, cz - 4, 4, 1.4, 0);
for (var s = 0; s < 5; s++)
shkBox(g, 0.7, 0.9, 0.03, shkC([0xC8A878, 0xA8784A, 0xE8D8B8, 0x8A5A3A, 0xD8C098][s]), cx - 9.5 + s * 1.1, 2.3, cz - Rm.hd + 0.3);
for (var p = 0; p < 4; p++) {
shkBox(g, 0.18, 0.45, 0.04, shkC(0xE8D8B8), cx - 7 + p * 0.6, 1.1, cz - 4);
}
shkBox(g, 2.4, 2.4, 0.8, shkS("brick", 0x8A5040), cx + 8, 1.2, cz - Rm.hd + 0.5);
shkBox(g, 1.2, 0.5, 0.4, shkGlowM(0xE88A3A), cx + 8, 0.4, cz - Rm.hd + 1);
shkBox(g, 2.4, 0.8, 1.2, shkS("wood", 0x6A4A30), cx + 6, 0.4, cz);
shkSolidBox(cx + 6, cz, 2.4, 1.2, 0);
shkPerson("john", cx - 6, cz - 5.4, 0, { verb: "learn to make gloves", fn: function () { shkGloveCard(); } });
shkSpot(cx + 6, cz + 2, 2.6, "The birthroom stair", "read about the house", function () { worldCard(worldFacts("The house on Henley Street", "Where William Shakespeare was born, in 1564", [["The workshop", "John Shakespeare cut and sewed gloves here and sold them through the window to the street"], ["The family", "William was the third of eight children; three sisters died young"], ["Later", "William inherits the house in 1601; it is still standing, and you can visit it"]], ["Gloves were made of kid (young goat), sheep and deer skin, cleaned, stretched, cut to a pattern, and sewn with tiny stitches. The words of the trade turn up in the plays: Romeo wishes he were 'a glove upon that hand' of Juliet's."]), {}); });
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 4.4, floor: shkS("wood", 0x7A5A3A), wall: shkS("plaster", 0xE8E0D0), ceil: shkS("wood", 0x5A4030) });
Rm.hello = "<b>The King's New School</b>, upstairs in the Guildhall. Here, around 1571-1578, the boy William learned his Latin: six days a week, six in the morning till five at night.";
for (var b = 0; b < 4; b++) {
shkBox(g, Rm.hw * 1.4, 0.45, 0.35, shkS("wood", 0x6A4A30), cx, 0.22, cz - 3 + b * 2);
shkBox(g, Rm.hw * 1.4, 0.08, 0.5, shkS("wood", 0x6A4A30), cx, 0.75, cz - 3.6 + b * 2);
shkSolidBox(cx, cz - 3.3 + b * 2, Rm.hw * 1.4, 0.9, 0, 0.8);
}
shkBox(g, 2, 1.2, 1, shkS("wood", 0x4A3424), cx, 0.9, cz - Rm.hd + 1.4);
shkBox(g, 2.4, 0.3, 1.6, shkS("wood", 0x5A4030), cx, 0.15, cz - Rm.hd + 1.4);
shkSolidBox(cx, cz - Rm.hd + 1.4, 2, 1, 0);
shkPerson("master", cx, cz - Rm.hd + 2.4, 0, { verb: "take the hornbook lesson", fn: function () { shkSchoolCard(); } });
for (var k = 0; k < (SHK.lite ? 3 : 4); k++) {
var p = wPerson("shk_boy" + k, { child: true, look: { layer: "tunic", layerColor: [0x5A3A2A, 0x3A3A4A, 0x2A3A2A][k % 3], top: 0xE8E0D0, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x1A1A1A } });
p.position.set(cx - 6 + (k % 4) * 4, 0.2, cz - 2.6 + Math.floor(k / 4) * 2);
p.rotation.y = Math.PI;
SHK.live.add(p);
SHK.people.push({ g: p });
}
},
function (g, cx, cz, R, Rm) {
shkShell(g, cx, cz, Rm, { h: 14, floor: shkS("stone", 0xB8B0A0), wall: shkS("stone", 0xD0C8B4), ceil: shkS("wood", 0x5A4030) });
Rm.hello = "<b>Holy Trinity Church</b>, by the Avon. William was baptised here in 1564; he will be buried in the chancel in 1616.";
for (var z = -Rm.hd + 6; z < Rm.hd - 6; z += 8)
[-1, 1].forEach(function (k) { shkCyl(g, 0.7, 0.8, 10, shkS("stone", 0xC8C0AC), cx + k * 5, 5, cz + z, 10); shkSolid({ x: cx + k * 5, z: cz + z, r: 0.9 }); shkBox(g, 0.15, 6, 2.2, shkGlowM(0xD8DCE0), cx + k * (Rm.hw - 0.05), 7, cz + z + 4); });
shkCyl(g, 0.7, 0.6, 1, shkS("stone", 0xD8D0C0), cx - 3, 0.5, cz + 18, 10);
shkSolid({ x: cx - 3, z: cz + 18, r: 0.8 });
shkBox(g, 2, 0.05, 3, shkS("stone", 0x9A9488), cx, 0.03, cz - Rm.hd + 6);
shkSpot(cx, cz - Rm.hd + 8, 2.6, "A gravestone in the chancel", "read it", function () { worldCard(worldFacts("The grave in the chancel", "William Shakespeare will lie here, from 25 April 1616", [], ["\"Good friend for Jesus' sake forbear, / To dig the dust enclosed here. / Blessed be the man that spares these stones, / And cursed be he that moves my bones.\"", "Nobody ever has. A bust of him (the only likeness besides the First Folio's) will be set in the wall above, holding a quill."]), {}); });
shkPerson("vicar", cx - 1, cz + 16, 0, { verb: "see the parish register", fn: function () { worldCard(worldFacts("The parish register", "Baptisms, 1564", [["26 April 1564", "Gulielmus filius Johannes Shakspere (William, son of John Shakespeare)"], ["1582", "His marriage licence (granted at Worcester)"], ["1583, 1585", "Susanna, then the twins Hamnet and Judith"], ["1596", "Hamnet, buried, aged eleven"]], ["Babies were baptised a few days after birth, which is why his birthday is kept on 23 April (which is also St George's Day, and the day he died)."]), {}); } });
},
function (Rm, cx, cz, P) {
var R2 = P.R2, rr = (P.yardR + R2) / 2, fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The gallery stairs</div>";
[["yard", "The yard", "A penny: stand with the groundlings", 0], ["low", "The lower gallery", "Two pennies: a bench", 0.6], ["mid", "The middle gallery", "", 4.2], ["top", "The upper gallery", "The best view of the heavens", 7.8]].forEach(function (o) {
h += worldBtn(o[0], o[1], o[2]);
fns[o[0]] = function () {
var a = Math.PI / 2 + 0.5;
if (o[0] === "yard")
shkMove(cx, cz + 18, 0, "Down in the yard, among the groundlings.");
else
shkMove(cx + Math.cos(a) * rr, cz + Math.sin(a) * rr, shkYawTo(-Math.cos(a), -Math.sin(a)), "<b>" + o[1] + ".</b> The whole playhouse below you.", null, o[3] + 0.12);
};
});
worldCard(h, fns);
},
function () {
if (SHK.tex.rosew)
return SHK.tex.rosew;
return (SHK.tex.rosew = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#1A1A2A";
x.fillRect(0, 0, W, H);
var c = ["#8A1A2A", "#1A3A8A", "#C8A040", "#2A6A3A", "#6A2A7A"];
for (var r = 6; r > 0; r--) {
for (var a = 0; a < r * 6; a++) {
x.fillStyle = c[(a + r) % 5];
x.beginPath();
x.moveTo(W / 2, H / 2);
x.arc(W / 2, H / 2, r * 20, a / (r * 6) * 6.283, (a + 0.92) / (r * 6) * 6.283);
x.fill();
}
}
x.strokeStyle = "#2A2420";
x.lineWidth = 3;
for (var s = 0; s < 12; s++) {
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.cos(s / 12 * 6.283) * 124, H / 2 + Math.sin(s / 12 * 6.283) * 124);
x.stroke();
}
}));
},
function (P, R) {
var S = SHK_STRAT, X = function (x) { return S.x + x; }, Z = function (z) { return S.z + z; };
shkNoRect(X(-75), Z(-160), X(-5), Z(-125));
shkNoRect(X(2), Z(-20), X(40), Z(60));
shkNoRect(X(-45), Z(60), X(-5), Z(105));
shkNoRect(X(120), Z(-130), X(170), Z(-100));
[[-200, -120, 320, -120], [0, -120, 0, 290], [-330, 60, 0, 60]].forEach(function (s) { shkStreetNo(X(s[0]), Z(s[1]), X(s[2]), Z(s[3]), 3); });
var o = { gap: SHK.lite ? 0.5 : 0.2, stMin: 1, stMax: 2, shop: 0.25, roof: function (R) { return R() < 0.55 ? "thatch" : "tile"; }, signs: ["The Swan", "The Bear", "The Crown"] };
shkRow(P, X(-200), Z(-120), X(240), Z(-120), 1, R, o, shkNo);
shkRow(P, X(-200), Z(-120), X(240), Z(-120), -1, R, o, shkNo);
shkRow(P, X(0), Z(-115), X(0), Z(270), 1, R, o, shkNo);
shkRow(P, X(0), Z(-115), X(0), Z(270), -1, R, o, shkNo);
if (!SHK.lite)
shkRow(P, X(-300), Z(60), X(-5), Z(60), 1, R, Object.assign({}, o, { gap: 0.6 }), shkNo);
shkHouse(P, { x: X(-40), z: Z(-142), ry: 0, w: 24, d: 10, st: 2, roof: "tile", wall: "frameA", tint: 0xF2E8D4, sign: ["JOHN SHAKESPEARE · GLOVER"], noDoor: 1 }, R);
shkDoor("birthplace", X(-40), Z(-133), "The Shakespeares' house on Henley Street");
shkHouse(P, { x: X(12), z: Z(40), ry: -Math.PI / 2, w: 30, d: 10, st: 2, roof: "tile", wall: "frameA", sign: ["THE KING'S NEW SCHOOL"], noDoor: 1 }, R);
shkDoor("school", X(4), Z(40), "The King's New School (upstairs in the Guildhall)");
var stone = shkS("stone", 0xC8BEA8), lead = shkS("lead", 0xB8BCC0);
shkBox(P, 10, 11, 22, stone, X(16), 5.5, Z(8));
shkRoof(P, 10, 22, 4, lead, stone, X(16), 11, Z(8), 0, 0.3);
shkBox(P, 8, 20, 8, stone, X(16), 10, Z(-6));
shkSolidBox(X(16), Z(4), 10, 30, 0);
shkEvbDoor(X(16), Z(4), -Math.PI / 2, 5, "cathedral", "The Guild Chapel", 0, "the chapel door");
shkHouse(P, { x: X(-24), z: Z(84), ry: Math.PI / 2, w: 28, d: 16, st: 3, roof: "tile", brick: 1, sign: ["NEW PLACE"], doorAt: 6, doorName: "New Place, William Shakespeare's house" }, R);
shkSpot(X(-12), Z(84), 4, "New Place", "read about it", function () { worldCard(worldFacts("New Place", "William Shakespeare's own house in Stratford", [["Bought", "1597, for £60"], ["Size", "Brick and timber, with ten fireplaces and five gables: one of the biggest houses in town"], ["Later", "He will retire here, and die here in 1616"]], ["His wife Anne and their daughters Susanna and Judith live here while he works in London. He rides home (about three days) between seasons."]), {}); });
var T = { x: X(190), z: Z(260) };
shkBox(P, 80, 13, 18, stone, T.x, 6.5, T.z);
shkRoof(P, 18, 80, 6, lead, stone, T.x, 13, T.z, Math.PI / 2, 0.3);
shkBox(P, 12, 24, 12, stone, T.x - 10, 12, T.z);
var sp = wCone(5.5, 14, lead, T.x - 10, 31, T.z, P, 8);
for (var x = -34; x <= 34; x += 8)
[-1, 1].forEach(function (k) { shkBox(P, 2.4, 6, 0.3, shkC(0x3A4654), T.x + x, 7, T.z + k * 9.05); });
shkSolidBox(T.x, T.z, 80, 18, 0);
shkDoor("trinity", T.x - 43, T.z, "Holy Trinity Church");
var path = shkPlane(P, 150, 6, shkS("earth", 0xA89478).clone(), X(75), 0.01, Z(270));
path.userData.keep = 1;
path.material.polygonOffset = true;
path.material.polygonOffsetFactor = -1;
path.material.polygonOffsetUnits = -4;
var av = shkPlane(P, 44, 1200, new THREE.MeshPhongMaterial({ color: 0x8AA8A0, map: shkTexOf("water"), shininess: 60, specular: 0x3A4A48 }), X(270), SHK_WATER, Z(0));
av.userData.keep = 1;
[-1, 1].forEach(function (k) { shkBox(P, 1.2, 2.6, 1200, shkS("earth", 0x7A6A50), X(270 + k * 22.6), -0.95, Z(0)); });
shkBox(P, 48, 0.8, 7, stone, X(270), -0.4, Z(-120));
for (var a = 0; a < 5; a++)
shkBox(P, 2.4, 2.6, 8, stone, X(252 + a * 9), -2, Z(-120));
[-1, 1].forEach(function (k) { shkBox(P, 48, 0.9, 0.5, stone, X(270), 0.45, Z(-120 + k * 3.3)); });
var road = shkPlane(P, 180, 8, shkS("earth", 0xA89478).clone(), X(235), 0.01, Z(-120));
road.userData.keep = 1;
road.material.polygonOffset = true;
road.material.polygonOffsetFactor = -1;
road.material.polygonOffsetUnits = -4;
shkHouse(P, { x: X(-330), z: Z(78), ry: Math.PI, w: 26, d: 7, st: 1, roof: "thatch", wall: "frameB", tint: 0xF0E6D0, doorName: "The Hathaways' farmhouse at Shottery" }, R);
var fl = [0xC83A4A, 0xE8C850, 0x8A4AA8, 0xF0ECE4, 0xE87AA0, 0x4A7AC8];
for (var i = 0; i < (SHK.lite ? 10 : 28); i++) {
var fx = X(-344 + R() * 28), fz = Z(64 + R() * 6);
wSph(0.35 + R() * 0.25, shkC(fl[i % fl.length]), fx, 0.35, fz, P, 6);
wCyl(0.05, 0.05, 0.4, shkC(0x3E6A34), fx, 0.2, fz, P, 4);
}
shkPerson("anne", X(-330), Z(66), Math.PI);
var w = new THREE.Group();
w.position.set(X(140), 0, Z(-110));
P.add(w);
shkBox(w, 5, 1, 2.2, shkS("wood", 0x7A5A3A), 0, 1.3, 0);
var hood = shkCyl(w, 1.3, 1.3, 5, shkC(0xE8E0CC), 0, 1.9, 0, 10, true);
hood.rotation.z = Math.PI / 2;
hood.scale.set(0.9, 1, 1);
shkSolidBox(X(140), Z(-110), 5.4, 2.4, 0);
shkSpot(X(140), Z(-113), 4, "The carrier's wagon", "ride back to London (the Tabard, Southwark)", function () { shkToLondon(); });
var trees = [];
for (var t = 0; t < (SHK.lite ? 30 : 90); t++) {
var tx = -600 + R() * 1200, tz = -500 + R() * 1000;
if (Math.abs(tx) < 60 && tz > -160 && tz < 300)
continue;
if (Math.abs(tz + 120) < 14 || Math.abs(tz - 60) < 10 && tx < 0)
continue;
if (tx > 240 && tx < 300)
continue;
trees.push({ x: X(tx), z: Z(tz) });
}
for (var r = 0; r < 20; r++)
trees.push({ x: X(244), z: Z(-500 + r * 50) });
shkTrees(P, trees, R);
var wool = shkC(0xF0ECE0), face = shkC(0x2A2420);
for (var s = 0; s < (SHK.lite ? 5 : 14); s++) {
var sh = new THREE.Group(), sx = X(-460 + R() * 120), sz = Z(110 + R() * 120);
sh.position.set(sx, 0, sz);
sh.rotation.y = R() * 6.28;
P.add(sh);
wSph(0.55, wool, 0, 0.65, 0, sh, 8).scale.set(1, 0.85, 1.4);
wSph(0.2, face, 0, 0.75, 0.75, sh, 6);
[[-0.25, -0.4], [0.25, -0.4], [-0.25, 0.4], [0.25, 0.4]].forEach(function (c) { shkBox(sh, 0.1, 0.4, 0.1, face, c[0], 0.2, c[1]); });
shkSolid({ x: sx, z: sz, r: 0.7 });
}
shkCrowd(8, X(0), Z(-60), 90, R, { ok: function (x, z) { return !shkSolidAt(x, z, 0); } });
var sg = wSign(["STRATFORD-UPON-AVON"], 4, 0.8, "#2A3A22", "#E8E0B0");
sg.position.set(X(150), 2.6, Z(-104));
P.add(sg);
},
function (k, msg) {
var d = shkData(), first = !d.day.k[k];
d.day.k[k] = 1;
shkSave();
if (shkOff(k)) {
setStatus(msg + " <span style='opacity:.8'>(The Keeper has closed the pay for this.)</span>");
return;
}
if (!shkSigned()) {
setStatus(msg + " <span style='opacity:.8'>(Sign in to be paid, and to keep " + esc(SHK_KEEP[k][1].toLowerCase()) + ".)</span>");
return;
}
if (!first) {
setStatus(msg + " <span style='opacity:.8'>(It has paid already today.)</span>");
return;
}
shkRpc("bard_reward", { p_key: k }).then(function (o) { setStatus(msg + (o && o.say ? " <b>" + esc(o.say) + "</b>" : "")); })
.catch(function () { setStatus(msg + " <span style='opacity:.8'>(The Treasury's ledger for London isn't open yet: nothing paid.)</span>"); });
},
function (head, q, right, wrong, ok, why, extra) {
var opts = shkShuffle([[right, 1]].concat(wrong.map(function (w) { return [w, 0]; }))), fns = {}, h = head + "<div style='margin:8px 0 6px'>" + q + "</div>";
opts.forEach(function (o, i) { h += worldBtn("o" + i, esc(o[0]), ""); fns["o" + i] = function () { ok(!!o[1]); }; });
if (extra) {
h += extra.h;
fns.talk = extra.f;
}
worldCard(h, fns);
},
function () {
var h = shkT("🎭 The stage of the Globe", "Pick a speech. You'll be given its first line; choose each line that comes next. The groundlings are listening.") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("stage") + "</div>", fns = {};
SHK_SPEECH.forEach(function (S, i) { h += worldBtn("s" + i, esc(S.lines[0].replace(/[,;:]$/, "")), esc(S.who) + ", " + esc(S.play) + " · " + S.lines.length + " lines"); fns["s" + i] = function () { shkSpeech(i, 1, 0, "stage"); }; });
worldCard(h, fns);
},
function (si, n, miss, mode, then) {
var S = SHK_SPEECH[si];
if (n >= S.lines.length) {
var good = miss <= (mode === "queen" ? 1 : 2);
var all = "<div style='font:italic 13px/1.6 var(--serif,Georgia);margin:8px 0;padding:8px 10px;border-left:3px solid #C8A040;background:rgba(200,160,64,.08)'>" + S.lines.map(esc).join("<br>") + "</div>";
if (then) {
then(good, all);
return;
}
if (good) {
worldCard(shkT("👏 Bravo!", "The yard roars; someone throws a flower onto the stage. Up in the galleries, the gallants nod.") + all + "<div style='opacity:.8'>" + esc(S.who) + ", in " + esc(S.play) + ".</div>", {});
shkReward("stage", "👏 <b>The Globe applauds.</b>");
}
else
worldCard(shkT("The groundlings mutter", "A few too many stumbles (" + miss + "): they want it word-perfect. Try again!") + all + worldBtn("again", "Try again", ""), { again: function () { shkSpeech(si, 1, 0, mode); } });
return;
}
var right = S.lines[n], pool = [];
SHK_SPEECH.forEach(function (o, j) { if (j !== si)
o.lines.forEach(function (l) { pool.push(l); }); });
S.lines.forEach(function (l, j) { if (j > n + 1)
pool.push(l); });
var wrong = shkShuffle(pool.filter(function (l) { return l !== right; })).slice(0, 2);
var said = "<div style='font:italic 13px/1.6 var(--serif,Georgia);margin:6px 0;color:#F2DCA0'>" + S.lines.slice(Math.max(0, n - 3), n).map(esc).join("<br>") + "</div>";
shkAsk(shkT(mode === "queen" ? "👑 Before the Queen" : "🎭 " + esc(S.who) + " (" + esc(S.play) + ")", "Line " + (n + 1) + " of " + S.lines.length + (miss ? " · stumbles: " + miss : "")), said + "What comes next?", right, wrong, function (ok) {
if (ok)
shkSpeech(si, n + 1, miss, mode, then);
else {
setStatus(mode === "queen" ? "The Queen's eyebrows rise a little. Again." : "\"Speak up!\" shouts someone in the yard. That's not the line: try again.");
shkSpeech(si, n, miss + 1, mode, then);
}
});
},
function () {
var picks = shkShuffle(SHK_SPEECH.map(function (s, i) { return i; })).slice(0, 3), fns = {};
var h = shkT("👑 Before Her Majesty", "\"We would hear something. Choose well: we have heard them all.\" At most one stumble, then she will ask you two questions.") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("queen") + "</div>";
picks.forEach(function (i, k) {
var S = SHK_SPEECH[i];
h += worldBtn("p" + k, esc(S.who) + ", from " + esc(S.play), esc(S.lines[0]));
fns["p" + k] = function () {
shkSpeech(i, 1, 0, "queen", function (good, all) {
if (!good) {
worldCard(shkT("👑 \"Enough.\"", "\"We have heard that better.\" She waves you away, but not unkindly. Come back and try again.") + all, {});
return;
}
shkQueenAsk(0, 0);
});
};
});
var tb = shkTalkBtn("queen");
h += tb.h;
fns.talk = tb.f;
worldCard(h, fns);
},
function (n, right) {
if (n >= 2) {
if (right >= 2) {
worldCard(shkT("👑 \"Well played.\"", "The Queen smiles (a rare thing) and holds out a ribbon from her sleeve. \"Wear our favour. We shall look for you at Christmas.\""), {});
shkReward("queen", "👑 <b>The Queen's favour.</b>");
}
else
worldCard(shkT("👑 \"Hm.\"", "\"Your speaking pleased us; your knowledge less so. Study, and return.\""), {});
return;
}
var W = shkPick(SHK_WHO);
shkAsk(shkT("👑 Her Majesty asks", "Question " + (n + 1) + " of 2"), "\"Tell us, player: who says <i>" + esc(W[0]) + "</i>\"", W[1] + " (" + W[2] + ")", [W[3], W[4]], function (ok) {
setStatus(ok ? "\"Just so.\"" : "\"No: " + esc(W[1]) + ", in " + esc(W[2]) + ".\"");
shkQueenAsk(n + 1, right + (ok ? 1 : 0));
});
},
function (k) {
var S = SHK_SONNETS[k], sch = "ABABCDCDEFEFGG";
var h = shkT("Sonnet " + S[0], esc(SHK_SONNET_NOTES[S[0]] || "")) + "<div style='font:italic 13px/1.65 var(--serif,Georgia);margin:6px 0'>" + S[1].map(function (l, i) { return "<span style='display:inline-block;width:16px;opacity:.55;font-style:normal;font-size:11px'>" + sch[i] + "</span>" + esc(l) + (i === 3 || i === 7 || i === 11 ? "<br>" : ""); }).join("<br>") + "</div>" +
"<div style='font-size:12px;opacity:.8'>Fourteen lines of ten beats each; three groups of four lines (each rhyming ABAB), then a rhyming pair (GG) that turns the whole poem round. Printed in 1609.</div>";
worldCard(h + worldBtn("beat", "Learn the beat (da-DUM)", "") + worldBtn("write", "Write your own sonnet", "At the bower in the garden's corner"), { beat: function () { shkBeatCard(0); }, write: function () { shkSonnetWrite(); } });
},
function (n, right) {
right = right || 0;
if (n >= 3) {
worldCard(shkT(right >= 2 ? "You have the beat" : "Keep listening", "Iambic pentameter: five pairs of beats, each soft-LOUD, like a heartbeat: da-DUM da-DUM da-DUM da-DUM da-DUM.") +
SHK_BEAT.map(function (b) { return "<div style='font-size:12.5px;margin:4px 0'><i>" + esc(b[0]) + "</i><br><span style='opacity:.75'>" + esc(b[1]) + "</span></div>"; }).join("") + worldBtn("write", "Now write your own", "At the bower"), { write: function () { shkSonnetWrite(); } });
return;
}
var real = shkPick(SHK_SONNETS)[1], line = shkPick(real), wrong = shkShuffle(SHK_NOTBEAT).slice(0, 2);
shkAsk(shkT("The beat of a line", "Round " + (n + 1) + " of 3"), "Read them aloud. Which one has the beat of verse, da-DUM five times?", line, wrong, function (ok) {
setStatus(ok ? "Yes: ten syllables, soft-LOUD five times." : "Not that one: count the beats. The verse line is: <i>" + esc(line) + "</i>");
shkBeatCard(n + 1, right + (ok ? 1 : 0));
});
},
function (line) {
var n = 0;
String(line).toLowerCase().replace(/[^a-z' -]/g, " ").split(/[\s-]+/).forEach(function (w) {
w = w.replace(/'/g, "");
if (!w)
return;
if (w.length <= 3) {
n += 1;
return;
}
var v = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "").match(/[aeiouy]{1,2}/g);
n += Math.max(1, v ? v.length : 1);
});
return n;
},
function () {
var d = shkData(), sch = "ABABCDCDEFEFGG", h = shkT("✒️ A sonnet of your own", "Fourteen lines of about ten syllables. Lines with the same letter rhyme. The garden's judge counts and listens.") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("sonnet") + "</div>";
for (var i = 0; i < 14; i++)
h += "<div style='display:flex;gap:6px;align-items:center;margin:3px 0'><span style='width:14px;opacity:.6;font-size:11px'>" + sch[i] + "</span><input data-sl='" + i + "' maxlength='80' value='" + esc(d.draft[i] || "") + "' style='flex:1;min-width:0;background:rgba(255,255,255,.06);border:1px solid rgba(143,180,232,.4);color:inherit;border-radius:3px;padding:4px 6px;font:13px var(--serif,Georgia)'><span data-sc='" + i + "' style='width:26px;font-size:11px;opacity:.7'></span></div>";
h += worldBtn("check", "Read it to the garden", "The judge checks the beat and the rhymes");
if (d.sonnets.length)
h += worldBtn("mine", "Your sonnets (" + d.sonnets.length + ")", "");
worldCard(h, { check: function () { shkSonnetCheck(); }, mine: function () { shkMySonnets(); } });
var c = WLD.card;
c.querySelectorAll("[data-sl]").forEach(function (inp) {
inp.addEventListener("input", function () { d.draft[+inp.getAttribute("data-sl")] = inp.value; var s = c.querySelector("[data-sc='" + inp.getAttribute("data-sl") + "']"); if (s)
s.textContent = inp.value.trim() ? shkSyl(inp.value) : ""; });
inp.addEventListener("keydown", function (e) { e.stopPropagation(); });
var s = c.querySelector("[data-sc='" + inp.getAttribute("data-sl") + "']");
if (s && inp.value.trim())
s.textContent = shkSyl(inp.value);
});
},
function () {
var d = shkData(), L = [];
for (var i = 0; i < 14; i++)
L.push(String(d.draft[i] || "").trim());
var beat = L.filter(function (l) { var n = shkSyl(l); return l && n >= 8 && n <= 12; }).length;
var pairs = [[0, 2], [1, 3], [4, 6], [5, 7], [8, 10], [9, 11], [12, 13]], rh = pairs.filter(function (p) { return L[p[0]] && L[p[1]] && shkRhymes(L[p[0]], L[p[1]]); }).length;
var filled = L.filter(function (l) { return l.length >= 8; }).length;
var ok = filled === 14 && beat >= 11 && rh >= 5;
var rows = "<div style='font-size:12.5px;margin:6px 0'>Lines written: <b>" + filled + "</b> of 14 · lines with about ten syllables: <b>" + beat + "</b> (need 11) · rhyming pairs: <b>" + rh + "</b> of 7 (need 5)</div>";
rows += pairs.map(function (p) { var r = L[p[0]] && L[p[1]] && shkRhymes(L[p[0]], L[p[1]]); return "<span style='font-size:11.5px;margin-right:8px'>" + (r ? "✅" : "▫️") + " " + (p[0] + 1) + "&amp;" + (p[1] + 1) + "</span>"; }).join("");
if (ok) {
d.sonnets.push({ at: Date.now(), l: L });
if (d.sonnets.length > 30)
d.sonnets.shift();
d.draft = [];
shkSave();
worldCard(shkT("🌹 A sonnet!", "The garden's judge reads it twice, and nods. It is fair-copied and put in your Backpack.") + rows + "<div style='font:italic 13px/1.6 var(--serif,Georgia);margin:8px 0'>" + L.map(esc).join("<br>") + "</div>", {});
shkReward("sonnet", "✒️ <b>Your sonnet is fair-copied.</b>");
}
else
worldCard(shkT("Not quite yet", "Your lines are kept as you left them.") + rows + worldBtn("back", "Back to the page", ""), { back: function () { shkSonnetWrite(); } });
},
function () {
var d = shkData();
worldCard(shkT("Your sonnets", "Fair-copied in the Sonnet Garden") + d.sonnets.slice().reverse().map(function (s) { return "<div style='font:italic 12.5px/1.55 var(--serif,Georgia);margin:8px 0;padding-left:8px;border-left:2px solid #C8A040'>" + s.l.map(esc).join("<br>") + "<div style='font-style:normal;opacity:.6;font-size:11px'>" + new Date(s.at).toLocaleDateString() + "</div></div>"; }).join(""), {});
},
function () {
var tb = shkTalkBtn("jonson");
worldCard(shkT("🍺 Ben Jonson", "\"Five rounds. I begin one of Will's insults; you finish it. Four right and the tankard's yours.\"") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("insult") + "</div>" +
worldBtn("go", "Take him on", "") + worldBtn("kit", "🎲 Hurl a Shakespearean insult", "Three words, every one from the plays") + tb.h, { go: function () { shkInsult(shkShuffle(SHK_INSULTS).slice(0, 5), 0, 0); }, kit: function () { shkInsultKit(); }, talk: tb.f });
},
function (L, n, right) {
if (n >= L.length) {
if (right >= 4) {
worldCard(shkT("🍺 \"Ha! Well struck!\"", "Jonson slams his tankard down and pushes it over to you. \"Keep it. You've earned it.\" (" + right + " of 5)"), {});
shkReward("insult", "🍺 <b>You out-insulted Ben Jonson.</b>");
}
else
worldCard(shkT("\"Ha! Back to your books!\"", "Jonson wins this time (" + right + " of 5). He's buying the next round anyway.") + worldBtn("again", "Again!", ""), { again: function () { shkInsult(shkShuffle(SHK_INSULTS).slice(0, 5), 0, 0); } });
return;
}
var I = L[n];
shkAsk(shkT("🍺 Round " + (n + 1) + " of 5", "Score: " + right), "Jonson: <i>\"" + esc(I[0]) + " ...\"</i>", I[1], [I[2], I[3]], function (ok) {
setStatus(ok ? "\"Ha! Just so: <i>" + esc(I[0] + " " + I[1]) + "</i> (" + esc(I[4]) + ").\"" : "\"Wrong! It's <i>" + esc(I[0] + " " + I[1]) + "</i>, from " + esc(I[4]) + ".\"");
shkInsult(L, n + 1, right + (ok ? 1 : 0));
});
},
function () {
var a = shkPick(SHK_INS_A), b = shkPick(SHK_INS_B), c = shkPick(SHK_INS_C), an = /^[aeiou]/.test(a) ? "an" : "a";
worldCard(shkT("🎲 An insult, Shakespeare's way", "Every word is from his plays.") + "<div style='font:600 18px var(--serif,Georgia);margin:10px 0;color:#F2DCA0'>\"Thou " + esc(a) + " " + esc(b) + " " + esc(c) + "!\"</div>" + worldBtn("more", "Another", "") + worldBtn("back", "Back to Jonson", ""), { more: shkInsultKit, back: shkInsultCard });
},
function () {
var fns = {}, h = shkT("📕 The Print Shop", "Choose a play to print. First you set the type, letter by letter: every piece of type is cast <b>backwards</b>, so it prints the right way round.") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("print") + "</div>";
SHK_QUARTOS.forEach(function (Q, i) { h += worldBtn("q" + i, esc(Q[0]), "Quarto, " + Q[2]); fns["q" + i] = function () { shkType(i, shkPick(SHK_TYPEWORDS), 0, 0); }; });
var tb = shkTalkBtn("printer");
h += tb.h;
fns.talk = tb.f;
worldCard(h, fns);
},
function (qi, word, n, miss) {
if (n >= word.length) {
if (miss > 2) {
worldCard(shkT("The proof is full of errors", "Master Whitlock reads your line in the mirror and groans: " + miss + " wrong letters. \"Mind your p's and q's!\"") + worldBtn("again", "Set it again", ""), { again: function () { shkType(qi, shkPick(SHK_TYPEWORDS), 0, 0); } });
return;
}
worldCard(shkT("The forme is locked up", "Every letter set. Now ink it, and pull the bar.") + worldBtn("ink", "Ink the type", "Two leather ink-balls, soot and linseed oil"), { ink: function () {
worldCard(shkT("Inked", "Black and glistening.") + worldBtn("pull", "Pull the bar", "The platen comes down; the screw squeaks"), { pull: function () { shkPrinted(qi); } });
} });
return;
}
var L = word[n], conf = { p: "qdb", q: "pbd", b: "dpq", d: "bqp", n: "umh", u: "nhm", m: "nwu", w: "mvn" }, others = (conf[L] || "aeosrnt").split("").filter(function (c) { return c !== L; });
var opts = shkShuffle([L].concat(shkShuffle(others).slice(0, 3))), fns = {};
var h = shkT("Setting type", "Word: <b style='letter-spacing:.2em'>" + esc(word.slice(0, n)) + "<span style='opacity:.35'>" + esc(word.slice(n)) + "</span></b>" + (miss ? " · wrong pieces: " + miss : "")) +
"<div style='margin:6px 0'>Find the piece of type for <b>" + esc(L) + "</b> (it's cast backwards):</div><div style='display:flex;gap:8px;flex-wrap:wrap'>";
opts.forEach(function (c, i) {
h += "<div data-w='t" + i + "' role='button' tabindex='0' style='width:52px;height:60px;display:flex;align-items:center;justify-content:center;font:600 34px Georgia;background:#3A3A40;color:#C8C8D0;border-radius:4px;transform:scaleX(-1);border:1px solid #6A6A74'>" + esc(c) + "</div>";
fns["t" + i] = function () { if (c === L)
shkType(qi, word, n + 1, miss);
else {
setStatus("That's a <b>" + esc(c) + "</b>, backwards. Mind your p's and q's!");
shkType(qi, word, n, miss + 1);
} };
});
worldCard(h + "</div>", fns);
},
function (qi) {
var Q = SHK_QUARTOS[qi];
var page = "<div style='background:#F2EAD6;color:#2A2018;padding:14px 12px;margin:8px 0;font:14px/1.5 Georgia;text-align:center;border:1px solid #C8B898'>" +
"<div style='font-size:17px;font-weight:bold'>" + esc(Q[0]) + "</div><div style='margin:8px 0;font-size:12px'>" + esc(Q[1]) + "</div><div style='font-size:13px'>By William Shake-speare.</div>" +
"<div style='font-size:22px;margin:8px 0'>❦</div><div style='font-size:11px'>LONDON, Printed for the Stationers, and are to be sold at the signe of the Green Dragon in Paules Church-yard. " + Q[2] + ".</div></div>";
worldCard(shkT("📕 Printed!", "You lift the tympan, and there it is, the right way round.") + page + "<div style='font-size:12px;opacity:.8'>Spellings like 'diuerse' are real: printers then used u and v (and i and j) almost as one letter. A quarto sold for sixpence.</div>", {});
shkReward("print", "📕 <b>A quarto, printed by your own hand.</b>");
},
function () {
var tb = shkTalkBtn("saviolo");
worldCard(shkT("🤺 Rapier and dagger", "Master Saviolo will attack six times. Answer each one rightly: five of six and you have learned the lesson. (Blunted foils: nobody is hurt.)") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("fence") + "</div>" +
worldBtn("go", "En garde!", "") + tb.h, { go: function () { shkFence(shkShuffle(SHK_FENCE).slice(0, 6), 0, 0); }, talk: tb.f });
},
function (L, n, right) {
if (n >= L.length) {
if (right >= 5) {
worldCard(shkT("🤺 \"Bellissimo!\"", "Saviolo bows and hands you a practice foil. \"On the stage, every fight is rehearsed like a dance. The audience all carry swords: they know if you are good.\" (" + right + " of 6)"), {});
shkReward("fence", "🤺 <b>A lesson learned at the School of Defence.</b>");
}
else
worldCard(shkT("\"Again, again!\"", "He taps you lightly with his foil (" + right + " of 6). \"Grace, not strength.\"") + worldBtn("again", "Again", ""), { again: function () { shkFence(shkShuffle(SHK_FENCE).slice(0, 6), 0, 0); } });
return;
}
var F = L[n];
shkAsk(shkT("🤺 Attack " + (n + 1) + " of 6", "Touches: " + right), "Saviolo cries <b>\"" + esc(F[0]) + "!\"</b> and makes " + esc(F[1]) + ".", F[2], F[3], function (ok) {
setStatus(ok ? "Parried. \"Bene!\"" : "A touch! \"No: " + esc(F[2].toLowerCase()) + ".\"");
shkFence(L, n + 1, right + (ok ? 1 : 0));
});
},
function () {
var tb = shkTalkBtn("john");
worldCard(shkT("🧤 A pair of gloves", "\"Six steps, in the right order. Get them right and the gloves are yours.\"") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("glove") + "</div>" + worldBtn("go", "Begin", "") + tb.h, { go: function () { shkGlove(0, 0); }, talk: tb.f });
},
function (n, miss) {
if (n >= SHK_GLOVE.length) {
if (miss <= 2) {
worldCard(shkT("🧤 A fine pair", "John turns them over, tries one on, and smiles. \"My Will never had the patience for this. Take them.\""), {});
shkReward("glove", "🧤 <b>A pair of kid gloves, made by your own hand.</b>");
}
else
worldCard(shkT("\"Hmm. Not quite.\"", "Too many steps out of order (" + miss + "). \"Again: a glover learns by doing.\"") + worldBtn("again", "Again", ""), { again: function () { shkGlove(0, 0); } });
return;
}
var rest = SHK_GLOVE.slice(n + 1);
var wrong = shkShuffle(rest.length ? rest : SHK_GLOVE.slice(0, n)).slice(0, 2);
if (wrong.length < 2)
wrong = wrong.concat(shkShuffle(SHK_GLOVE.slice(0, n)).slice(0, 2 - wrong.length));
shkAsk(shkT("🧤 Step " + (n + 1) + " of 6", miss ? "Out of order: " + miss : ""), "What comes next?", SHK_GLOVE[n], wrong, function (ok) {
if (ok)
shkGlove(n + 1, miss);
else {
setStatus("\"Not yet: that comes later.\"");
shkGlove(n, miss + 1);
}
});
},
function () {
var tb = shkTalkBtn("master");
worldCard(shkT("📋 The hornbook lesson", "\"Six questions. Five right, and you may keep your hornbook.\"") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("school") + "</div>" + worldBtn("go", "Salve, magister! (Hello, master!)", "") + tb.h, { go: function () { shkSchool(shkShuffle(SHK_SCHOOLQ).slice(0, 6), 0, 0); }, talk: tb.f });
},
function (L, n, right) {
if (n >= L.length) {
if (right >= 5) {
worldCard(shkT("📋 \"Optime!\" (Excellent!)", "The master hands you your hornbook. \"You would have done well here, in Master Shakespeare's day.\" (" + right + " of 6)"), {});
shkReward("school", "📋 <b>The hornbook lesson, passed.</b>");
}
else
worldCard(shkT("\"Again, puer.\"", right + " of 6. \"Repetitio mater studiorum: repetition is the mother of learning.\"") + worldBtn("again", "Again", ""), { again: function () { shkSchool(shkShuffle(SHK_SCHOOLQ).slice(0, 6), 0, 0); } });
return;
}
var Q = L[n];
shkAsk(shkT("📋 Question " + (n + 1) + " of 6", "Right: " + right), esc(Q[0]), Q[1], Q[2], function (ok) { setStatus(ok ? "\"Recte.\" (Right.)" : "\"Non. " + esc(Q[1]) + ".\""); shkSchool(L, n + 1, right + (ok ? 1 : 0)); });
},
function () {
var tb = shkTalkBtn("gallant");
worldCard(shkT("📰 Who said it?", "\"Six lines, all the talk of Paul's. Name who says each one: five right and you're a true Paul's man.\"") + "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + shkPayLine("who") + "</div>" + worldBtn("go", "Go on, then", "") + tb.h, { go: function () { shkWho(shkShuffle(SHK_WHO).slice(0, 6), 0, 0); }, talk: tb.f });
},
function (L, n, right) {
if (n >= L.length) {
if (right >= 5) {
worldCard(shkT("📰 \"A true Paul's man!\"", "The gallant sweeps off his hat. \"Here: the latest broadside. You'll want to be up on the gossip.\" (" + right + " of 6)"), {});
shkReward("who", "📰 <b>You know your lines.</b>");
}
else
worldCard(shkT("\"Ha! Go and see more plays!\"", right + " of 6.") + worldBtn("again", "Again", ""), { again: function () { shkWho(shkShuffle(SHK_WHO).slice(0, 6), 0, 0); } });
return;
}
var W = L[n];
shkAsk(shkT("📰 " + (n + 1) + " of 6", "Right: " + right), "Who says <i>\"" + esc(W[0]) + "\"</i>", W[1], [W[3], W[4]], function (ok) { setStatus((ok ? "Yes: " : "No: ") + esc(W[1]) + ", in <i>" + esc(W[2]) + "</i>."); shkWho(L, n + 1, right + (ok ? 1 : 0)); });
},
function (P) {
var stone = shkS("stone", 0xD8D0C0), d = shkData();
SHK_AGES.forEach(function (A, i) {
var x = A.at[0], z = A.at[1], g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
shkBox(g, 1.6, 1.4, 1.6, stone, 0, 0.7, 0);
var s = [0.45, 0.8, 1, 1.05, 1.1, 0.95, 0.85][i], stoop = [0, 0, 0.05, 0, 0, 0.25, 0.35][i];
var body = wCyl(0.22 * s, 0.32 * s, 1.2 * s, stone, 0, 1.4 + 0.6 * s, 0, g, 8);
body.rotation.x = stoop;
wSph(0.18 * s, stone, 0, 1.4 + 1.35 * s, stoop * 0.5, g, 8);
if (A.k === "soldier")
wCyl(0.03, 0.03, 1.4, stone, 0.3, 1.4 + 0.7, 0, g, 4);
if (A.k === "justice") {
var b = wSph(0.3, stone, 0, 1.4 + 0.55, 0.12, g, 8);
}
if (A.k === "school")
shkBox(g, 0.2, 0.25, 0.08, stone, 0.25, 1.4 + 0.5, 0);
if (A.k === "pantaloon")
wCyl(0.025, 0.025, 1.2, stone, 0.35, 1.4 + 0.6, 0.2, g, 4);
var sg = wSign([A.n, (i + 1) + " of 7"], 1.3, 0.5, "#D8D0C0", "#3A2E22");
sg.position.set(0, 0.8, 0.82);
g.add(sg);
shkSolid({ x: x, z: z, r: 1.2 });
shkSpot(x, z + 2, 2.8, "A carved figure: " + A.n, "read it", function () { shkAgeFound(i); });
});
},
function (i) {
var A = SHK_AGES[i], d = shkData(), had = d.ages.indexOf(A.k) >= 0;
if (!had) {
d.ages.push(A.k);
shkSave();
}
var n = d.ages.length, h = shkT("✦ " + A.n, "The Seven Ages of Man · " + n + " of 7 found") + "<div style='font:italic 13.5px/1.6 var(--serif,Georgia);margin:8px 0'>\"" + esc(A.line) + "\"</div><div style='font-size:12px;opacity:.8'>Jaques, in As You Like It: \"All the world's a stage... and one man in his time plays many parts, his acts being seven ages.\"</div>";
h += shkHead("Where the others are") + SHK_AGES.map(function (B) { return "<div style='font-size:12px'>" + (d.ages.indexOf(B.k) >= 0 ? "✅ " : "▫️ ") + esc(B.n) + " <span style='opacity:.65'>· " + esc(B.where) + "</span></div>"; }).join("");
worldCard(h, {});
if (!had && n === 7)
shkReward("ages", "🏅 <b>All seven ages found</b>: the whole of a life, from the infant to second childishness.");
else if (!had)
setStatus("✦ <b>" + esc(A.n) + "</b> (" + n + " of 7). " + shkPayLine("ages"));
},
function (q) {
var cats = [["@plays", "The 37 plays"], ["@poems", "Poems and sonnets"], ["@lost", "Lost plays"], ["@words", "Words he gave us"], ["@life", "His life"], ["@house", "The playhouse"]];
var h = shkT("📚 The Folio Library", "Search any word: a play, a character, a line, a year.") + "<div style='display:flex;gap:6px'><input id='shk-q' value='" + esc(q && q[0] !== "@" ? q : "") + "' placeholder='e.g. ghost, Verona, 1599, bear' style='flex:1;min-width:0;background:rgba(255,255,255,.06);border:1px solid rgba(143,180,232,.4);color:inherit;border-radius:3px;padding:5px 7px'><span data-w='go' role='button' style='padding:5px 10px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>Search</span></div>";
h += "<div style='display:flex;flex-wrap:wrap;gap:4px;margin:6px 0'>" + cats.map(function (c) { return "<span data-w='" + c[0].slice(1) + "' role='button' style='font-size:11.5px;padding:3px 7px;border:1px solid rgba(216,168,104,.5);border-radius:10px;" + (q === c[0] ? "background:rgba(216,168,104,.25)" : "") + "'>" + c[1] + "</span>"; }).join("") + "</div>";
h += worldBtn("folio", "📖 Read every word he wrote", "The complete works, unabridged: 38 plays, 154 sonnets and the poems");
var out = shkLibFind(q || "");
h += "<div style='font-size:12.5px'>" + (out.length ? out.slice(0, 60).join("") : (q ? "<div style='opacity:.7;margin:8px 0'>Nothing found for that. Try another word.</div>" : "<div style='opacity:.75;margin:8px 0'>Every play, poem and lost play; his life in the records; the words and sayings first found in his writing; and how a playhouse worked.</div>")) + "</div>";
var fns = { go: function () { var v = (document.getElementById("shk-q") || {}).value || ""; shkLibrary(v.trim()); } };
cats.forEach(function (c) { fns[c[0].slice(1)] = function () { shkLibrary(c[0]); }; });
fns.folio = function () { shkFolio(); };
worldCard(h, fns);
var inp = document.getElementById("shk-q");
if (inp) {
inp.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter")
fns.go(); });
}
},
function (q) {
var out = [], s = q.toLowerCase(), all = s === "" || s[0] === "@", cat = all ? s : null;
function hit() { if (cat)
return false; for (var i = 0; i < arguments.length; i++)
if (String(arguments[i]).toLowerCase().indexOf(s) >= 0)
return true; return false; }
function row(t, sub, body) { return "<div style='margin:8px 0;padding-bottom:6px;border-bottom:1px solid rgba(143,180,232,.15)'><b>" + t + "</b>" + (sub ? " <span style='opacity:.65'>· " + sub + "</span>" : "") + (body ? "<div style='opacity:.9'>" + body + "</div>" : "") + "</div>"; }
SHK_PLAYS.forEach(function (P) { if (cat === "@plays" || (!cat && hit(P[0], P[1], P[2], P[3], P[4])))
out.push(row(esc(P[0]), esc(P[1]) + ", " + esc(P[2]), esc(P[3]) + "<br><i>" + esc(P[4]) + "</i>" + (P[5] ? "<br><span style='color:#CFE8C0'>🚪 Its own world is through the Hall of Plays, under the Globe's stage.</span>" : ""))); });
SHK_POEMS.forEach(function (P) { if (cat === "@poems" || (!cat && hit(P[0], P[1], P[2], P[3])))
out.push(row(esc(P[0]), esc(P[1]) + ", " + esc(P[2]), esc(P[3]))); });
if (cat === "@poems")
SHK_SONNETS.forEach(function (S) { out.push(row("Sonnet " + S[0], "in the Sonnet Garden", "<i>" + esc(S[1][0]) + "</i> " + esc(SHK_SONNET_NOTES[S[0]] || ""))); });
else if (!cat)
SHK_SONNETS.forEach(function (S) { if (hit(S[1].join(" ")))
out.push(row("Sonnet " + S[0], "", S[1].map(esc).join("<br>"))); });
SHK_LOST.forEach(function (P) { if (cat === "@lost" || (!cat && hit(P[0], P[1], P[2])))
out.push(row(esc(P[0]), esc(P[1]), esc(P[2]))); });
if (cat === "@words")
out.push("<div style='margin:6px 0;opacity:.8'>The first time each is found written down, as far as anyone knows. Some he surely heard; some he made.</div>");
SHK_WORDS.forEach(function (W) { if (cat === "@words" || (!cat && hit(W[0], W[1])))
out.push(row("\"" + esc(W[0]) + "\"", esc(W[1]), "")); });
SHK_LIFE.forEach(function (L) { if (cat === "@life" || (!cat && hit(L[0], L[1])))
out.push(row(esc(L[0]), "", esc(L[1]))); });
SHK_HOUSE.forEach(function (H) { if (cat === "@house" || (!cat && hit(H[0], H[1])))
out.push(row(esc(H[0]), "", esc(H[1]))); });
if (!cat)
SHK_SPEECH.forEach(function (S) { if (hit(S.lines.join(" ")))
out.push(row(esc(S.who), esc(S.play), "<i>" + S.lines.map(esc).join("<br>") + "</i>")); });
return out;
},
function (id) {
var T = CT_BY_ID[id], Wd = typeof CT_W !== "undefined" ? CT_W[id] : null;
if (!T)
return;
var fns = {}, nc = Wd ? Wd.ch.length : 0, pr = typeof ctsProg === "function" ? Math.min(ctsProg(id), nc) : 0, P = SHK_PLAYS.filter(function (p) { return p[5] === id; })[0];
var h = shkT("🎭 " + esc(T.t), esc(T.by));
if (P)
h += "<div style='font-size:12.5px;margin:4px 0 6px'>" + esc(P[3]) + "</div>";
if (typeof ctOff === "function" && ctOff(id))
h += "<div style='margin:8px 0;color:#E8C8A0'>The Keeper has closed this play for now.</div>";
else if (Wd) {
var D = typeof ctData === "function" ? ctData() : { done: {} }, pay = D.done && D.done[id] === (typeof ctToday === "function" ? ctToday() : "") ? "Played today: you can play again, but it pays once a day." : "Pays " + (typeof ctGold === "function" ? ctGold(T) : T.gold) + " gold once a day (dues-payers) and gives " + T.keep[1] + " " + esc(T.keep[0]) + ".";
h += worldBtn("enter", "🚪 Step into the play's world", nc + " scenes, the whole play from first to last, through a land of its own; then three questions on the real play. " + (pr > 0 && pr < nc ? "You're at scene " + (pr + 1) + ". " : "") + pay);
fns.enter = function () { worldCard(null); if (typeof ctsEnter === "function")
ctsEnter(id); };
}
h += shkHead("Who is in it") + "<div style='font-size:12.5px;opacity:.9'>" + T.who.map(function (W) { return "<b>" + esc(W.n) + "</b>"; }).join(", ") + ". You'll meet them all inside.</div>";
var cs = typeof ctCostumesOf === "function" ? ctCostumesOf(id) : [];
if (cs.length) {
h += worldBtn("cos", "👗 Costumes from this play", cs.length + " to try on and buy, as the Lord Chamberlain's Men dressed them");
fns.cos = function () { ctCostumeCard(id); };
}
h += worldBtn("read", "📖 Read the whole play", "Every word, complete and unabridged, act by act and scene by scene");
fns.read = function () { shkFolio(T.t); };
h += worldBtn("lib", "📚 About the play", "In the Folio Library");
fns.lib = function () { shkLibrary(T.t.split(" ")[0] === "The" ? T.t.split(" ").slice(1, 3).join(" ") : T.t.split(" ")[0]); };
worldCard(h, fns);
},
function () {
var D = typeof ctData === "function" ? ctData() : { done: {}, ch: {} }, h = shkT("📖 The great book of plays", "Sixteen plays, each a world of its own");
h += SHK_PLAY_IDS.map(function (id) {
var T = CT_BY_ID[id];
if (!T)
return "";
var nc = CT_W[id] ? CT_W[id].ch.length : 0, pr = typeof ctsProg === "function" ? Math.min(ctsProg(id), nc) : 0;
return "<div style='font-size:12.5px;margin:3px 0'>" + (pr >= nc && nc ? "✅ " : pr ? "📖 " : "▫️ ") + esc(T.t) + " <span style='opacity:.6'>· " + (pr >= nc ? "played through" : pr ? "scene " + (pr + 1) + " of " + nc : nc + " scenes") + "</span></div>";
}).join("");
var fns = {}, rest = SHK_PLAYS.filter(function (p) { return !p[5]; });
h += shkHead("Every other play, to read whole") + "<div style='font-size:12px;opacity:.8;margin-bottom:4px'>All " + SHK_PLAYS.length + " plays are in the Folio, word for word. These " + rest.length + " have no world of their own yet: read them here.</div><div style='display:flex;flex-wrap:wrap;gap:4px'>" +
rest.map(function (p, i) { fns["r" + i] = function () { shkFolio(p[0]); }; return "<span data-w='r" + i + "' role='button' style='font-size:12px;padding:3px 8px;border:1px solid rgba(216,168,104,.5);border-radius:10px;cursor:pointer'>📖 " + esc(p[0]) + "</span>"; }).join("") + "</div>";
h += worldBtn("folio", "📖 Open the whole Folio", "Every play, sonnet and poem");
fns.folio = function () { shkFolio(); };
worldCard(h, fns);
},
function () {
worldCard(worldFacts("SI QUIS", "Notices on the door in Paul's Walk", [], [
"SI QUIS: if any gentleman want a servingman who can ride, write a fair hand, and speak a little French, let him inquire at the third pillar on the north side.",
"SI QUIS: a boy with a sweet voice and a good memory is wanted by a company of players. Inquire at the Globe on Bankside.",
"SI QUIS: lost, near Paul's Cross, a pair of gloves of Spanish kid, perfumed. A reward to whoever brings them to the Green Dragon.",
"SI QUIS: a schoolmaster of good learning, Latin and Greek, is sought for a grammar school in Warwickshire.",
"SI QUIS: if any have seen a play called Cardenio, or know where its book lies, let him speak with the printer at the Green Dragon. (Somebody has written underneath: \"try the Mermaid\".)"
]), {});
},
function (G) {
SHK.G = G;
SHK.lite = typeof LITE !== "undefined" && !!LITE;
SHK.solids = [];
SHK.grid = {};
SHK.floors = [];
SHK.spots = [];
SHK.walkIn = [];
SHK.talk = [];
SHK.people = [];
SHK.anim = [];
SHK.boats = [];
SHK.dist = [];
SHK.rooms = {};
SHK_NO.length = 0;
var live = new THREE.Group();
live.name = "shk-live";
G.add(live);
SHK.live = live;
var S = SHK_STRAT, F = 1e9;
SHK.D = { river: shkDist("river", -150, 0, F), paul: shkDist("paul", -285, -450, 200), cityW: shkDist("cityW", -300, -420, 360), cityM: shkDist("cityM", 110, -420, 380), cityE: shkDist("cityE", 470, -420, 320),
tower: shkDist("tower", 780, -240, 130), west: shkDist("west", -850, -320, 450), bankW: shkDist("bankW", -750, 280, 330), bankE: shkDist("bankE", -180, 260, 330), borough: shkDist("borough", 255, 380, 320),
fields: shkDist("fields", -150, 0, F), strat: shkDist("strat", S.x, S.z, 720) };
var R = wRand(1600);
var steps = [["ground", function () { shkGroundBuild(G); }], ["river", function () { shkRiver(G, R); }], ["bridge", function () { shkBridge(SHK.D.river, R); }], ["city", function () { shkCity(R); }],
["west", function () { shkWest(SHK.D.west, R); }], ["south", function () { shkSouth(R); }], ["ages", function () { shkAgesBuild(SHK.D.river); }], ["stratford", function () { shkStratford(SHK.D.strat, R); }],
["people", function () { shkLondonFolk(R); }]];
steps.forEach(function (s) { try {
s[1]();
}
catch (e) {
if (window.console)
console.warn("[shakespeare] build " + s[0], e);
} });
SHK.dist.forEach(function (D) { try {
ctnMerge(D.g);
D.g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[shakespeare] join " + D.n, e);
} });
shkFlatPeople();
SHK.built = true;
},
function (R) {
var free = function (x, z) { return !shkSolidAt(x, z, 0) && Math.abs(z) > SHK_RIV + 3; };
[[-350, 320, 30, 10], [-300, -470, 50, 12], [100, -450, 120, 12], [SHK_BRIDGE, -40, 4, 6], [-355, 140, 120, 8], [255, 300, 6, 8], [-1110, -300, 30, 5], [-600, 350, 30, 5], [600, -300, 80, 6]].forEach(function (c) {
shkCrowd(c[3], c[0], c[1], c[2], R, { wr: Math.min(16, c[2]), ok: c[0] === SHK_BRIDGE ? function (x, z) { return Math.abs(x - SHK_BRIDGE) < 2.6; } : free });
});
shkPerson("waterman", SHK_PLACES.bankStairs.x + 3, SHK_PLACES.bankStairs.z + 3, Math.PI);
},
function (x, z, feet) {
if (SHK.ride)
return false;
if (x > SHK_IN_X - 400) {
var k = shkRoomAtX(x, z), Rm = k && SHK.rooms[k];
if (!Rm)
return true;
if (Math.abs(x - Rm.x) > Rm.hw - 0.3 || Math.abs(z - Rm.z) > Rm.hd - 0.3)
return true;
if (Rm.ringR) {
var d = Math.hypot(x - Rm.cx, z - Rm.cz), T = Rm.tiring, inT = T && x > T.x0 && x < T.x1 && z > T.z0 && z < T.z1;
if (!inT && d > Rm.ringR - 0.5 && !(Math.abs(x - Rm.cx) < 2.6 && z > Rm.cz))
return true;
}
return shkSolidAt(x, z, feet);
}
if (x > SHK_STRAT.x - 2000) {
var S = SHK_STRAT, lx = x - S.x, lz = z - S.z;
if (Math.abs(lx) > 680 || Math.abs(lz) > 560)
return true;
if (lx > 248 && lx < 292 && !(Math.abs(lz + 120) < 2.8))
return true;
return shkSolidAt(x, z, feet);
}
if (x < -1420 || x > 1150 || z < -880 || z > 720)
return true;
if (Math.abs(z) < SHK_RIV + 0.4) {
if (!(Math.abs(x - SHK_BRIDGE) < 2.9 && Math.abs(z) < SHK_RIV + 2))
return true;
}
return shkSolidAt(x, z, feet);
},
function (dt) {
var L = worldLocal();
SHK.t += dt;
if (SHK.moving)
return;
SHK.zone = shkZoneAt(L.x, L.z);
SHK.inside = SHK.zone === "inside" ? shkRoomAtX(L.x, L.z) : null;
if (SHK.inside && !SHK.rooms[SHK.inside])
shkRoomBuild(SHK.inside);
if (SHK.ride) {
var Rd = SHK.ride;
Rd.t += dt;
var u = Math.min(1, Rd.t / Rd.dur), e = u * u * (3 - 2 * u), z = Rd.z0 + (Rd.z1 - Rd.z0) * e;
camera.position.set(SHK.base + Rd.x, SHK_WATER + 0.55 + 1.72, z);
if (Rd.boat)
Rd.boat.position.set(Rd.x, SHK_WATER + 0.1, z + (Rd.z1 > Rd.z0 ? -1 : 1) * 1.2);
if (u >= 1) {
SHK.ride = null;
var land = Rd.z1 > 0 ? SHK_RIV + 4 : -SHK_RIV - 4;
camera.position.set(SHK.base + Rd.x, 1.72, land);
setStatus(Rd.z1 > 0 ? "🛶 <b>Bankside.</b> Up the stairs: the Globe is straight ahead." : "🛶 <b>Paul's Wharf.</b> Up the hill to St Paul's; Bread Street and the Mermaid are to the east.");
if (Rd.boat) {
Rd.boat.visible = false;
}
}
worldBanner("<b>🎭 Shakespeare's London</b> · on the Thames, in a wherry");
return;
}
if (SHK.water) {
SHK.water.offset.x = (SHK.water.offset.x + dt * 0.004) % 1;
}
SHK.anim.forEach(function (a) {
if (a.k === "flag") {
var p = a.m.geometry.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i) + 1.3;
p.setZ(i, Math.sin(SHK.t * 2 + x * 1.6) * 0.12 * x);
}
p.needsUpdate = true;
}
else if (a.k === "sails")
a.m.rotation.z -= dt * 0.35;
});
SHK.boats.forEach(function (b) {
var r = b.userData.run, s = b.userData.swim;
if (r) {
b.position.x += r.sp * dt;
b.rotation.y = r.sp > 0 ? Math.PI / 2 : -Math.PI / 2;
if (b.position.x > r.x1)
b.position.x = r.x0;
if (b.position.x < r.x0)
b.position.x = r.x1;
if (Math.abs(b.position.x - SHK_BRIDGE) < 16)
b.position.x += r.sp > 0 ? 32 : -32;
}
else if (s) {
s.a += dt * 0.08;
b.position.x += Math.cos(s.a) * s.sp * dt;
b.position.z = Math.max(-SHK_RIV + 8, Math.min(SHK_RIV - 8, b.position.z + Math.sin(s.a) * s.sp * dt));
b.rotation.y = Math.atan2(Math.cos(s.a), Math.sin(s.a));
}
});
SHK.wt = (SHK.wt || 0) + dt;
if (SHK.wt > 0.05) {
var wdt = SHK.wt;
SHK.wt = 0;
SHK.people.forEach(function (P) { if (P.wander && P.g.visible) {
var y0 = P.ground || 0;
wWander(P.g, wdt, function () { return y0; }, P.wander);
if (!P.key && shkSolidAt(P.g.position.x, P.g.position.z, y0)) {
var u2 = P.g.userData.wan;
if (u2) {
u2.tx = u2.hx;
u2.tz = u2.hz;
}
}
} });
}
SHK.vt += dt;
if (SHK.vt > 0.4) {
SHK.vt = 0;
var far = SHK.lite ? 620 : 1150;
SHK.dist.forEach(function (D) { D.g.visible = Math.hypot(L.x - D.x, L.z - D.z) - D.r < far; });
SHK.live.visible = SHK.zone !== "inside";
var pr = SHK.lite ? 50 : 90;
SHK.people.forEach(function (P) { var p = P.g.position, dx = p.x - L.x, dz = p.z - L.z, r = P.vr || pr; P.g.visible = dx * dx + dz * dz < r * r; });
for (var k in SHK.rooms) {
var Rm = SHK.rooms[k];
Rm.g.visible = SHK.inside === k;
}
shkRulesFetch(false);
}
var where = SHK.zone === "inside" ? SHK_ROOMS[SHK.inside] ? SHK_ROOMS[SHK.inside].name : "" : shkPlaceName(L.x, L.z);
worldBanner("<b>🎭 Shakespeare's London</b> · " + esc(where) + (SHK.zone === "stratford" ? "" : " · summer, 1600"));
SHK.pt = (SHK.pt || 0) + dt;
if (SHK.pt < 0.15)
return;
SHK.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
SHK.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || !g.parent.visible && g.parent !== SHK.live)
return;
var wx = g.position.x, wz = g.position.z;
if (Math.abs((T.p.ground || 0) - feet) > 2.5)
return;
cand(wx, wz, T.r, T.fn ? T.fn : function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to " + (T.verb || "talk"));
});
SHK.spots.forEach(function (s) { if (s.y !== undefined && Math.abs(s.y - feet) > 2.2)
return; if (s.y === undefined && feet > 2.6)
return; cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb)); });
var A = SHK_PLACES.arrive;
if (SHK.zone === "bankside")
cand(A.x, A.z + 4, 3, shkHome, "<b>The way home</b> · <b>press E</b> to go back to Somnucor");
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (x, z) {
var best = null, bd = 1e9;
for (var k in SHK_PLACES) {
var p = SHK_PLACES[k];
if (k === "arrive")
continue;
var d = Math.hypot(x - p.x, z - p.z);
if (d < bd) {
bd = d;
best = p.name;
}
}
var zn = shkZoneAt(x, z);
if (zn === "stratford")
return "Stratford-upon-Avon";
if (zn === "bridge")
return "London Bridge";
if (bd < 90)
return best;
return zn === "city" ? "the City of London" : zn === "west" ? "the Strand" : zn === "borough" ? "Southwark" : "Bankside";
},
function (fromSide) {
var S = fromSide > 0 ? SHK_PLACES.bankStairs : SHK_PLACES.paulStairs, b = shkBoat(S.x, fromSide * (SHK_RIV - 3), 0, wRand(5), false);
SHK.ride = { x: S.x, z0: fromSide * (SHK_RIV - 3), z1: -fromSide * (SHK_RIV - 3), t: 0, dur: SHK.lite ? 9 : 14, boat: b };
yaw = fromSide > 0 ? 0 : Math.PI;
pitch = 0;
worldPrompt(null);
setStatus("🛶 <i>\"Oars! Oars!\"</i> You step down into a wherry, and the waterman pulls out into the stream. Swans, tall ships below the bridge, and the whole of London along the water.");
},
function (opt) {
opt = opt || {};
SHK.ride = null;
SHK.moving = false;
shkRulesFetch(true);
if (opt.keepFrom)
return;
if (opt.at === "globe") {
shkGoIn("globe");
return;
}
if (opt.at === "stratford") {
var S = SHK_STRAT;
camera.position.set(SHK.base + S.x + 134, 1.72, S.z - 104);
yaw = shkYawTo(-1, 0);
pitch = 0;
return;
}
var A = SHK_PLACES.arrive;
camera.position.set(SHK.base + A.x, 1.72, A.z + 2);
yaw = 0;
pitch = 0;
SHK.zone = "bankside";
setStatus("<b>Shakespeare's London</b>, a summer afternoon in 1600. Before you, the Globe, new-built: the flag is up, so there is a play today. Over the Thames lies the City and St Paul's; down the river, London Bridge with its houses on it. <b>Look round, press E at doors and people</b>, and find the trapdoor in the Globe's stage: under it, the Hall of Plays.");
},
function () {
for (var k in SHK.mats) {
var m = SHK.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in SHK.tex) {
var x = SHK.tex[t];
if (x && x.dispose && SHK_CANVAS[t])
try {
x.dispose();
}
catch (e) { }
}
["G", "live", "water", "D"].forEach(function (k) { SHK[k] = null; });
SHK.mats = {};
SHK.tex = {};
SHK.solids = [];
SHK.grid = {};
SHK.floors = [];
SHK.spots = [];
SHK.walkIn = [];
SHK.talk = [];
SHK.people = [];
SHK.anim = [];
SHK.boats = [];
SHK.dist = [];
SHK.rooms = {};
SHK.built = false;
},
function () {
var keeper = typeof amKeeper === "function" && amKeeper(), b = "", fns = {};
var rows = [["When", "A summer afternoon in 1600: the Globe is a year old, and Shakespeare, 36, is writing Hamlet"],
["London", "The Thames and London Bridge; the City, St Paul's, Cheapside, the Mermaid, the Tower; the Strand and Whitehall Palace; Bankside's playhouses (the Globe, the Rose, the Swan), the Sonnet Garden, the School of Defence"],
["Stratford", "His home town: the house on Henley Street, the grammar school, Holy Trinity, Anne Hathaway's cottage (by the carrier's wagon from the Tabard)"],
["The plays", "Sixteen of them, each a world of its own, played scene by scene: through the trapdoor in the Globe's stage"],
["To do", "Tread the boards, play before the Queen, write a sonnet, out-insult Ben Jonson, print a quarto, learn the rapier, make gloves, find the Seven Ages, search the Folio Library"],
["Danger", "Safe everywhere"], ["The way in", "Its door in the Hall of Doors (a red door under a little thatched hut)"]];
if (WLD.on === SHK_KEY) {
b += worldBtn("folio", "📖 The complete works", "Read every play, sonnet and poem, unabridged (from anywhere here)");
fns.folio = function () { shkFolio(); };
b += worldBtn("lib", "📚 The Folio Library", "Search all his plays, poems, words and life (from anywhere here)");
fns.lib = function () { shkLibrary(""); };
b += worldBtn("ages", "✦ The Seven Ages of Man", shkData().ages.length + " of 7 found");
fns.ages = function () { var d = shkData(); worldCard(shkT("✦ The Seven Ages of Man", "Seven carved figures across London") + SHK_AGES.map(function (B) { return "<div style='font-size:12.5px;margin:3px 0'>" + (d.ages.indexOf(B.k) >= 0 ? "✅ " : "▫️ ") + esc(B.n) + " <span style='opacity:.65'>· " + esc(B.where) + "</span></div>"; }).join(""), {}); };
b += worldBtn("globe", "To the Globe", "Back to its door on Bankside");
fns.globe = function () { var G = SHK_PLACES.globe; worldCard(null); shkMove(G.x, G.z + G.r + 5, 0, "Before the Globe."); };
b += worldBtn("home", "Leave Shakespeare's London", "Back to where you came from");
fns.home = function () { worldCard(null); shkHome(); };
}
else {
if (!WLD.on && typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Its door is near the Labyrinth's and Leonardo's, under a little thatched hut");
fns.hall = function () { worldCard(null); toHall(); setStatus("<b>The Hall of Doors.</b> Shakespeare's London is the red door under a little thatched hut, near the Labyrinth's."); };
}
if (keeper) {
b += worldBtn("go", "Go now", "The Keeper's way: straight to Bankside");
fns.go = function () { worldCard(null); shkGo({}); };
}
}
worldCard(worldFacts("🎭 Shakespeare's London", "London in 1600, the Globe, and Stratford-upon-Avon", rows, []) + b, fns);
},
function (title) {
var N = { "1": "first", "2": "second", "3": "third", "i": "first", "ii": "second", "iii": "third", "iv": "fourth", "v": "fifth", "vi": "sixth", "viii": "eighth" };
function toks(t) {
return String(t).toLowerCase().replace(/[’']/g, "").replace(/\b(the|of|and|a|an|or|tragedy|life|history|comedy|king|part|prince|what|you|will)\b/g, " ")
.split(/[^a-z0-9]+/).filter(Boolean).map(function (w) { return N[w] || w; });
}
var want = toks(title), best = null, bs = 0;
(SHKF.idx || []).forEach(function (w) { var have = toks(w.title), s = 0; want.forEach(function (x) { if (have.indexOf(x) >= 0)
s++; }); s = s / Math.max(want.length, 1) - Math.abs(have.length - want.length) * 0.01; if (s > bs) {
bs = s;
best = w;
} });
return bs >= 0.6 ? best : null;
},
function (title, part) {
SHKF.open = true;
SHKF.view = "book";
if (store.shkFolio && store.shkFolio.size)
SHKF.size = store.shkFolio.size;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
try {
if (typeof worldCard === "function")
worldCard(null);
}
catch (e) { }
shkfPaint("<p style='text-align:center;margin-top:20vh'>The great book is opened…</p>");
shkfIndex().then(function () {
var w = title ? shkfMatch(title) : null;
if (!w && !title && store.shkFolio && store.shkFolio.id)
w = SHKF.idx.filter(function (x) { return x.id === store.shkFolio.id; })[0];
if (w)
shkfLoad(w.id, part != null ? part : (store.shkFolio && store.shkFolio.id === w.id ? store.shkFolio.p : 0));
else {
SHKF.view = "contents";
shkfDraw();
}
}).catch(function () { shkfPaint("<p style='text-align:center;margin-top:20vh'>The Folio could not be fetched just now. Try again in a moment.</p>"); });
},
function (id, p) {
SHKF.busy = true;
SHKF.find = "";
SHKF.hit = -1;
return fetch(SHKF_BASE + id + ".txt").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.text(); }).then(function (t) {
SHKF.busy = false;
SHKF.id = id;
SHKF.text = t;
SHKF.lines = t.split("\n");
SHKF.view = "book";
var W = shkfWork();
SHKF.p = Math.max(0, Math.min(+p || 0, shkfParts(W).length - 1));
shkfDraw();
shkfKeep();
}).catch(function () { SHKF.busy = false; shkfPaint("<p style='text-align:center;margin-top:20vh'>That work could not be fetched just now. Try again in a moment.</p>"); });
},
function (W) {
if (!W || !SHKF.lines)
return [];
var L = SHKF.lines.length, P = [], m = W.parts || [];
if (m.length) {
if (m[0][0] > 0)
P.push([0, W.kind === "poems" ? "The opening" : "The persons of the play"]);
m.forEach(function (x) { P.push([x[0], x[1]]); });
}
else
for (var i = 0; i < L; i += 220)
P.push([i, "Lines " + (i + 1) + "–" + Math.min(L, i + 220)]);
return P;
},
function (lines, find) {
var out = [], re = null;
if (find)
try {
re = new RegExp("(" + find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
}
catch (e) { }
lines.forEach(function (l) {
var t = l.trim(), h = esc(l);
if (re)
h = h.replace(re, "<mark>$1</mark>");
if (t.length < 90 && (/^(ACT [IVXL]+|SCENE [IVXL\d]+)\b/i.test(t) && /^[A-Z]{3}/.test(t) || /^(PROLOGUE|EPILOGUE|INDUCTION|THE SONNETS|\d{1,3})\b/.test(t) && t === t.toUpperCase()))
out.push("<span class='hh'>" + h.trim() + "</span>");
else if (/^[A-Z][A-Z’' ,&\-]{1,40}\.$/.test(t))
out.push("<span class='sp'>" + h.trim() + "</span>");
else if (/^(Enter|Exit|Exeunt|Re-enter|Flourish|Alarum|Sennet|Music|Thunder|Trumpets|Dies|They fight|Manet|Manent)\b/.test(t) || /^\[.*\]$/.test(t))
out.push("<span class='sd'>" + h.trim() + "</span>");
else
out.push(h);
});
return out.join("\n").replace(/\n{3,}/g, "\n\n");
},
function () {
var W = shkfWork(), h = "";
if (SHKF.view === "contents" || !W) {
h += "<div class='ttl'><b>Mr. William Shakespeares Comedies, Histories, & Tragedies</b><small>with his Poems and Sonnets · complete and unabridged</small></div><div class='cont'>";
SHKF_KINDS.forEach(function (k) { h += "<div><h4>" + k[1] + "</h4>" + (SHKF.idx || []).filter(function (w) { return w.kind === k[0]; }).map(function (w) { return "<a data-f='open' data-id='" + w.id + "'>" + esc(w.title) + " <small>· " + (w.parts && w.parts.length ? w.parts.length + (w.kind === "poems" ? " poems" : " scenes") : Math.ceil(w.lines / 220) + " pages") + "</small></a>"; }).join("") + "</div>"; });
h += "</div><p style='text-align:center;font-size:12.5px;color:#6A4A2A;margin-top:18px'>Every play, every sonnet and every poem, word for word, as Project Gutenberg keeps them (EBook #100, free to all). Choose one to read; your place is kept.</p>";
return shkfPaint(h, true);
}
var P = shkfParts(W), cur = P[SHKF.p] || [0, ""], end = P[SHKF.p + 1] ? P[SHKF.p + 1][0] : SHKF.lines.length;
h += "<div class='tx' style='font-size:" + SHKF.size + "px'>" + shkfFmt(SHKF.lines.slice(cur[0], end), SHKF.find) + "</div>";
shkfPaint(h, false, W, P);
},
function (body, contents, W, P) {
var el = SHKF.el;
if (!el) {
el = SHKF.el = document.createElement("div");
el.id = "shkf";
["keydown", "keyup", "keypress"].forEach(function (t) { el.addEventListener(t, function (e) { e.stopPropagation(); if (t === "keydown" && e.key === "Enter" && e.target && e.target.id === "shkf-q")
shkfSearch(true); if (t === "keydown" && e.key === "Escape")
shkfClose(); }); });
el.addEventListener("wheel", function (e) { e.stopPropagation(); }, { passive: true });
el.addEventListener("click", function (e) {
if (e.target === el)
return shkfClose();
var t = e.target.closest ? e.target.closest("[data-f]") : null;
if (!t)
return;
var w = t.getAttribute("data-f");
if (w === "close")
return shkfClose();
if (w === "contents") {
SHKF.view = "contents";
return shkfDraw();
}
if (w === "open")
return shkfLoad(t.getAttribute("data-id"), 0);
if (w === "prev" || w === "next") {
var n = SHKF.p + (w === "next" ? 1 : -1), Pp = shkfParts(shkfWork());
if (n >= 0 && n < Pp.length) {
SHKF.p = n;
shkfDraw();
shkfKeep();
var pg = el.querySelector(".pg");
if (pg)
pg.scrollTop = 0;
}
return;
}
if (w === "big" || w === "small") {
SHKF.size = Math.max(13, Math.min(28, SHKF.size + (w === "big" ? 2 : -2)));
shkfDraw();
shkfKeep();
return;
}
if (w === "find")
return shkfSearch(true);
});
el.addEventListener("change", function (e) { if (e.target && e.target.id === "shkf-part") {
SHKF.p = +e.target.value;
shkfDraw();
shkfKeep();
var pg = el.querySelector(".pg");
if (pg)
pg.scrollTop = 0;
} });
document.body.appendChild(el);
}
el.style.display = "flex";
var hd = "<div class='hd'><div class='ti'><small>The Folio · complete and unabridged</small><b>" + (W ? esc(W.title) : "The Complete Works") + "</b></div>";
if (W && !contents) {
hd += "<select id='shkf-part' aria-label='Act and scene'>" + P.map(function (x, i) { return "<option value='" + i + "'" + (i === SHKF.p ? " selected" : "") + ">" + esc(x[1]) + "</option>"; }).join("") + "</select>" +
"<input id='shkf-q' placeholder='Find a word…' value='" + esc(SHKF.find) + "' aria-label='Find a word'><button data-f='find'>Find</button>" +
"<button data-f='small' aria-label='Smaller letters'>A−</button><button data-f='big' aria-label='Bigger letters'>A+</button><button data-f='contents'>All works</button>";
}
hd += "<button class='rd' data-f='close'>Close</button></div>";
var ft = W && !contents ? "<div class='ft'><button data-f='prev'" + (SHKF.p <= 0 ? " disabled" : "") + ">◀ Before</button><span>" + esc((P[SHKF.p] || [0, ""])[1]) + " · " + (SHKF.p + 1) + " of " + P.length + "</span><button data-f='next'" + (SHKF.p >= P.length - 1 ? " disabled" : "") + ">After ▶</button></div>" : "";
el.innerHTML = "<div class='bk'>" + hd + "<div class='pg'>" + body + "</div>" + ft + "</div>";
var m = el.querySelector(".tx mark");
if (m && SHKF.hit >= 0)
try {
m.scrollIntoView({ block: "center" });
}
catch (e) { }
},
function (next) {
var q = ((document.getElementById("shkf-q") || {}).value || "").trim();
SHKF.find = q;
if (!q || !SHKF.lines)
return shkfDraw();
var W = shkfWork(), P = shkfParts(W), lq = q.toLowerCase(), n = P.length;
function has(i) { var a = P[i][0], b = P[i + 1] ? P[i + 1][0] : SHKF.lines.length; for (var k = a; k < b; k++)
if (SHKF.lines[k].toLowerCase().indexOf(lq) >= 0)
return true; return false; }
var start = SHKF.hit === SHKF.p && next ? SHKF.p + 1 : SHKF.p;
for (var j = 0; j < n; j++) {
var i = (start + j) % n;
if (has(i)) {
SHKF.p = i;
SHKF.hit = i;
shkfDraw();
shkfKeep();
return;
}
}
SHKF.hit = -1;
shkfDraw();
if (typeof setStatus === "function")
setStatus("“" + esc(q) + "” is not in " + esc(W.title) + ".");
},
function (kind, R) {
var M = { apples: [0xB8302A, 0x8AA03A, 0xC8502A], bread: [0xC8945A, 0xB07A44, 0xD8A868], cloth: [0x7A1F2A, 0x2A3A6A, 0x3A6A3A, 0xC8A040], ballads: [0xEDE2C4, 0xE6D8B4], pies: [0xB8844A, 0xA8743A], ale: [0x6A4A2A, 0x5A3A20], gloves: [0x8A6A44, 0x5A3A22, 0xEDE2C4], pots: [0x9A5A3A, 0x7A4A2E] };
return M[kind] || M.apples;
},
function (P, x, z, ry, R, o) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wood = shkS("wood", 0x6A4E32), w = o.w || 3.4, d = o.d || 1.8;
[[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(function (c, i) { shkBox(g, 0.12, i < 2 ? 2.6 : 2.2, 0.12, wood, c[0], i < 2 ? 1.3 : 1.1, c[1]); });
shkBox(g, w + 0.2, 0.1, d * 0.6, shkS("wood", 0x7A5A3A), 0, 0.95, d * 0.15);
shkBox(g, w, 0.85, 0.08, shkS("wood", 0x5A4028), 0, 0.45, d * 0.45);
var aw = new THREE.MeshLambertMaterial({ map: o.tex, side: THREE.DoubleSide });
aw.userData.ctn = 1;
var a = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.6, d + 0.9), aw);
a.rotation.x = -Math.PI / 2 + 0.32;
a.position.set(0, 2.45, 0.1);
g.add(a);
var val = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.6, 0.3), aw);
val.position.set(0, 2.08, d / 2 + 0.48);
g.add(val);
var cols = shkWares(o.wares, R), n = SHK.lite ? 6 : 14;
for (var i = 0; i < n; i++) {
var c = cols[i % cols.length], px = -w / 2 + 0.3 + R() * (w - 0.6), pz = -d * 0.1 + R() * d * 0.45;
if (o.wares === "cloth")
shkBox(g, 0.5, 0.22, 0.35, shkC(c), px, 1.12 + (i % 3) * 0.22, pz);
else if (o.wares === "ballads") {
var s = shkBox(g, 0.32, 0.02, 0.44, shkC(c), px, 1.02, pz);
s.rotation.y = (R() - 0.5) * 0.6;
}
else if (o.wares === "ale" || o.wares === "pots")
shkCyl(g, 0.1, 0.12, 0.26, shkC(c), px, 1.13, pz, 8);
else
wSph(o.wares === "bread" || o.wares === "pies" ? 0.13 : 0.08, shkC(c), px, 1.06, pz, g, 8);
}
if (o.wares === "ballads") {
for (var b = 0; b < 5; b++) {
var sh = shkBox(g, 0.36, 0.5, 0.01, shkC(0xEDE2C4), -w / 2 + 0.5 + b * (w - 1) / 4, 1.85, d / 2 - 0.1);
}
shkBox(g, w, 0.02, 0.02, shkC(0x3A2A1A), 0, 2.12, d / 2 - 0.1);
}
if (o.sign) {
var sg = wSign([o.sign], 2.2, 0.5, "#2A1E14", "#E8D0A0");
sg.position.set(0, 2.35, d / 2 + 0.62);
g.add(sg);
}
shkSolidBox(x, z, w + 0.2, d, ry || 0);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
P.add(g);
var wd = shkS("wood", 0x6A4E32);
shkBox(g, 1.6, 0.1, 3, wd, 0, 0.85, 0);
[-0.8, 0.8].forEach(function (k) { shkBox(g, 0.08, 0.4, 3, wd, k, 1.1, 0); });
shkBox(g, 1.6, 0.4, 0.08, wd, 0, 1.1, -1.5);
[-0.88, 0.88].forEach(function (k) { var wh = shkCyl(g, 0.62, 0.62, 0.12, shkS("wood", 0x4A3420), k, 0.62, 0.2, 14); wh.rotation.z = Math.PI / 2; var hb = shkCyl(g, 0.12, 0.12, 0.18, shkC(0x2A2A2A), k, 0.62, 0.2, 8); hb.rotation.z = Math.PI / 2; });
[-0.4, 0.4].forEach(function (k) { var sh = shkBox(g, 0.08, 0.08, 2.6, wd, k, 0.75, 2.6); sh.rotation.x = 0.12; });
for (var s = 0; s < 3; s++)
shkBox(g, 0.5, 0.4, 0.6, shkC(0xC8B48A), -0.4 + s * 0.4, 1.12, -0.6 + s * 0.5);
shkSolidBox(x, z, 1.8, 3.2, ry);
},
function (P, x, z) {
var st = shkS("stone", 0xA8A090);
shkCyl(P, 1.1, 1.2, 0.9, st, x, 0.45, z, 14);
shkCyl(P, 0.9, 0.9, 0.05, shkC(0x2A3A3A), x, 0.85, z, 14);
[-1, 1].forEach(function (k) { shkBox(P, 0.15, 2.2, 0.15, shkS("wood", 0x5A4028), x + k * 0.95, 1.1, z); });
shkBox(P, 2.2, 0.12, 0.12, shkS("wood", 0x5A4028), x, 2.2, z);
shkRoof(P, 1.4, 2.6, 0.8, shkS("thatch", 0xC8A878), shkS("wood", 0x5A4028), x, 2.25, z);
shkSolid({ x: x, z: z, r: 1.25 });
},
function (P, x0, z0, x1, z1, y, R) {
var n = Math.max(4, Math.round(Math.hypot(x1 - x0, z1 - z0) / 1.2)), cols = [0xB8302A, 0xE8C850, 0x2A4A8A, 0xF0ECE4, 0x2A6A3A];
var line = shkBox(P, Math.hypot(x1 - x0, z1 - z0), 0.03, 0.03, shkC(0x3A2A1A), (x0 + x1) / 2, y, (z0 + z1) / 2);
line.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute([-0.25, 0, 0, 0.25, 0, 0, 0, -0.55, 0], 3));
geo.computeVertexNormals();
for (var i = 1; i < n; i++) {
var t = i / n, m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: cols[i % cols.length], side: THREE.DoubleSide }));
m.position.set(x0 + (x1 - x0) * t, y - Math.sin(t * Math.PI) * 0.6, z0 + (z1 - z0) * t);
m.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
P.add(m);
}
},
function (P, x, z, h, seed) {
if (typeof ctuTree !== "function")
return shkTrees(P, [{ x: x, z: z, h: h }], wRand(seed));
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
try {
ctuTree(g, { h: h, crown: 0x3E6A2E, crown2: 0x5A7E3A, trunk: 0x5A4632, seed: seed, limbs: SHK.lite ? 4 : 7, roots: SHK.lite ? 3 : 6 });
if (typeof ctuLeaves === "function")
ctuLeaves(g);
}
catch (e) { }
shkSolid({ x: x, z: z, r: h * 0.06 + 0.3 });
},
function (P, R) {
var G = SHK_PLACES.globe, cx = G.x, lite = SHK.lite;
var L0 = G.z + G.r - 1, L1 = 377, cob = shkPlane(P, 7, L1 - L0, shkS("paving", 0x9A948A).clone(), cx, 0.06, (L0 + L1) / 2);
cob.material.polygonOffset = true;
cob.material.polygonOffsetFactor = -6;
cob.material.polygonOffsetUnits = -24;
cob.userData.keep = 1;
[-1, 1].forEach(function (k) { var gr = shkPlane(P, 40, L1 - L0 - 6, shkS("grass", 0x7E9A5A).clone(), cx + k * 38, 0.04, (L0 + L1) / 2); gr.material.polygonOffset = true; gr.material.polygonOffsetFactor = -4; gr.material.polygonOffsetUnits = -16; gr.userData.keep = 1; });
var stalls = [["apples", "Fruit of Kent", ["#B8302A", "#EDE2C4"]], ["bread", "Bread and pies", ["#2A4A8A", "#EDE2C4"]], ["ballads", "Ballads, new printed", ["#2A6A3A", "#E8C850"]], ["cloth", "Silks and ribbons", ["#7A1F2A", "#E8C850"]],
["ale", "Small ale", ["#5A3A22", "#E8D0A0"]], ["gloves", "Gloves of Stratford", ["#3A3A5A", "#E8D0A0"]], ["pies", "Hot pies", ["#B8302A", "#E8C850"]], ["pots", "Pots and pipkins", ["#2A4A8A", "#E8C850"]]];
var n = lite ? 4 : stalls.length;
for (var i = 0; i < n; i++) {
var s = stalls[i], side = i % 2 ? 1 : -1, row = Math.floor(i / 2), x = cx + side * (9 + row % 2 * 0.5), z = G.z + G.r + 16 + row * 11;
shkStall(P, x, z, side > 0 ? -Math.PI / 2 : Math.PI / 2, R, { wares: s[0], sign: s[1], tex: shkAwningTex(s[2][0], s[2][1]) });
shkBarrel(P, x + side * 1.8, z + 1.6, R);
if (!lite)
shkBarrel(P, x + side * 2.4, z + 2.2, R);
}
for (var c = 0; c < (lite ? 4 : 10); c++) {
var cxp = cx + (c % 2 ? 1 : -1) * (13 + R() * 4), czp = G.z + G.r + 12 + R() * 48;
shkBox(P, 0.8, 0.6, 0.8, shkS("wood", 0x8A6A44), cxp, 0.3, czp, R() * 0.8);
shkSolidBox(cxp, czp, 0.9, 0.9, 0);
}
shkCart(P, cx + 18, G.z + G.r + 58, 0.5);
shkWell(P, cx - 17, G.z + G.r + 40);
if (!lite)
for (var p = 0; p < 3; p++) {
var pz = G.z + G.r + 20 + p * 16;
[-1, 1].forEach(function (k) { shkBox(P, 0.14, 4.4, 0.14, shkS("wood", 0x5A4028), cx + k * 13.5, 2.2, pz); shkSolid({ x: cx + k * 13.5, z: pz, r: 0.2 }); });
shkPennants(P, cx - 13.5, pz, cx + 13.5, pz, 4.2, R);
}
[[-26, 24], [26, 30], [-28, 62], [28, 70], [-22, 92], [24, 96]].slice(0, lite ? 3 : 6).forEach(function (t, k) { shkElm(P, cx + t[0], G.z + G.r + t[1], 14 + k % 3 * 3, 700 + k); });
shkPerson("ballad", cx - 9, G.z + G.r + 27, Math.PI / 2, { verb: "buy a ballad (or talk)", fn: function () { shkSongCard(-1); } });
shkPerson("orange", cx + 4, G.z + G.r + 10, Math.PI * 0.9, { wander: { r: 4, sp: 0.5 } });
shkPerson("crier", cx - 3, G.z + G.r + 64, Math.PI);
shkSpot(cx - 7.2, G.z + G.r + 27, 2.6, "The ballad-seller's stall", "buy a ballad, or hear him sing one", function () { shkSongCard(-1); });
shkSpot(cx + 9.5, G.z + G.r + 38, 2.6, "The bookseller's quartos", "buy a play in quarto (read it whole)", function () { shkQuartoCard(); });
shkSpot(cx + 4, G.z + G.r + 10, 2.4, "Oranges and nuts", "an orange, and a Shakespearean insult", function () { shkInsultCard(); });
shkSpot(cx - 3, G.z + G.r + 62.5, 2.6, "The town crier", "hear the news of London, 1600", function () { shkNewsCard(); });
shkCrowd(lite ? 6 : 16, cx, G.z + G.r + 40, 22, R, { wr: 6, ok: function (x, z) { return Math.abs(x - cx) < 16; } });
},
function (i, sure) {
if (i == null || i < 0)
i = Math.floor(Math.random() * SHK_SONGS.length);
if (!sure && typeof shkgBoxFetch === "function" && !(SHKG.box && SHKG.boxAt))
shkgBoxFetch(function () { if (WLD.card && WLD.card.style.display === "block" && SHKG.box && !SHKG.box.missing)
shkSongCard(i); });
var S = SHK_SONGS[i], fns = {}, own = shkBalladOwned(i);
var pr = typeof SHKG !== "undefined" && SHKG.box && SHKG.box.ballad != null ? +SHKG.box.ballad : SHK_BALLAD_PRICE;
var h = shkT("🎶 " + esc(S[0]), esc(S[1])) + "<div style='font-style:italic;line-height:1.55;margin:8px 0'>" + S[2].map(esc).join("<br>") + "</div>";
h += "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>“A penny a sheet, new printed, and I sing it for nothing!” Every word is Shakespeare’s, from the play named.</div>";
h += worldBtn("sing", "🔊 Hear Nick sing it", "Sung out over the fair");
fns.sing = function () { shkBalladSing(i); };
if (own)
h += "<div style='margin:6px 0;font-size:12.5px;color:#9FE0A8'>✓ The sheet is yours: it is in your Backpack.</div>";
else {
h += worldBtn("buy", (sure ? "Tap to confirm: " : "🧾 Buy the broadside · ") + gold(pr), "A printed ballad sheet, to keep in your Backpack");
fns.buy = function () { if (!sure)
return shkSongCard(i, true); shkBalladBuy(i); };
}
h += shkHead("Every song on his line") + "<div style='display:flex;flex-wrap:wrap;gap:4px'>" + SHK_SONGS.map(function (T, k) {
fns["g" + k] = function () { shkSongCard(k); };
return "<span data-w='g" + k + "' role='button' style='font-size:12px;padding:3px 8px;border:1px solid rgba(216,168,104," + (k === i ? ".95" : ".45") + ");border-radius:10px;cursor:pointer'>" + (shkBalladOwned(k) ? "✓ " : "") + esc(T[0]) + "</span>";
}).join("") + "</div>";
var F = SHK_FOLK.ballad;
if (F) {
h += worldBtn("talk", "💬 Talk with Nick", "");
fns.talk = function () { worldCard(null); wTalk({ name: F.name, persona: F.persona, greet: F.greet }); };
}
worldCard(h, fns);
},
function (i) {
var S = SHK_SONGS[i], who = { name: "bard:Nick Bottomley, ballad-seller", ftkSex: "m", ftkAge: 34 };
setStatus("🎶 Nick Bottomley sings <i>" + esc(S[0]) + "</i>…");
if (typeof fvoSpeak === "function" && (typeof fvoOn !== "function" || fvoOn())) {
try {
fvoSpeak(who, S[2].join(" "));
}
catch (e) { }
}
else
setStatus("🎶 Nick sings <i>" + esc(S[0]) + "</i> (turn on people's voices in Settings to hear him).");
},
function (i) {
var S = SHK_SONGS[i], keep = function (msg) {
var d = shkData();
if (!Array.isArray(d.ballads))
d.ballads = [];
if (d.ballads.indexOf(i) < 0)
d.ballads.push(i);
shkSave();
worldCard(shkT("🧾 " + esc(S[0]), "A broadside, new printed") + "<div style='margin:8px 0'>Nick rolls the sheet and ties it with a thread. “Sing it at home, and think of Bankside!”<br><span style='opacity:.8'>" + esc(msg || "") + "</span></div>" + worldBtn("back", "🎶 Back to the stall", ""), { back: function () { shkSongCard(i); } });
};
if (!shkSigned()) {
worldCard(shkT("🧾 The ballad-seller", "Sign in first") + "<div style='margin:8px 0'>Sign in to buy a ballad sheet.</div>", {});
return;
}
shkRpc("bard_ballad_buy", { p_song: i, p_title: S[0] }).then(function (o) {
if (o && o.ok)
keep(o.say);
else
worldCard(shkT("🧾 The ballad-seller", "No sale") + "<div style='margin:8px 0'>" + esc(o && o.say || "Nick could not sell that sheet just now.") + "</div>" + worldBtn("back", "🎶 Back to the stall", ""), { back: function () { shkSongCard(i); } });
}).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e))
keep("(His till opens with the next update: this one he gives you free.)");
else
worldCard(shkT("🧾 The ballad-seller", "No sale") + "<div style='margin:8px 0'>The stall could not be reached just now. Try again in a moment.</div>", {});
});
},
function () {
var fns = {}, h = shkT("🍊 Oranges and nuts", "“An orange, sweeting? A ha’penny. And for nothing, I’ll call thee a name to make Master Jonson blush.”") +
"<div style='font:italic 600 20px Georgia,serif;margin:10px 0;text-align:center'>" + esc(shkInsult()) + "</div>" +
"<div style='font-size:12px;opacity:.8'>One word from each of three columns: every one of them is Shakespeare’s own (clotpole, from King Lear; canker-blossom, from A Midsummer Night’s Dream; fustilarian, from Henry IV).</div>";
h += worldBtn("again", "🍊 Another!", "");
fns.again = function () { shkInsultCard(); };
worldCard(h, fns);
},
function () {
var d = Math.floor(Date.now() / 600000), fns = {}, T = typeof shkToday === "function" ? shkToday() : null;
var h = shkT("🔔 The town crier", "Summer, 1600") + "<div style='margin:8px 0;line-height:1.5'>" + esc(SHK_NEWS[d % SHK_NEWS.length]) + "</div>" +
"<div style='margin:6px 0;line-height:1.5'>" + esc(SHK_NEWS[(d + 3) % SHK_NEWS.length]) + "</div>" +
(T ? "<div style='margin-top:8px;font-size:12.5px;opacity:.9'>🎭 <b>Today at the Globe:</b> " + esc(T[0]) + ". " + esc(T[4]) + "</div>" : "");
h += worldBtn("more", "🔔 More news", "");
fns.more = function () { var a = SHK_NEWS.slice(); worldCard(shkT("🔔 The town crier", "Summer, 1600") + a.map(function (t) { return "<div style='margin:6px 0;line-height:1.45'>" + esc(t) + "</div>"; }).join(""), {}); };
worldCard(h, fns);
},
function () {
var fns = {}, h = shkT("📕 The bookseller’s quartos", "“Quartos, new and old! Sixpence a play, and the poems for the gentlemen.” Choose one, and read it whole.");
["comedy", "history", "tragedy"].forEach(function (k) {
h += shkHead(k === "comedy" ? "Comedies" : k === "history" ? "Histories" : "Tragedies") + "<div style='display:flex;flex-wrap:wrap;gap:4px'>" +
SHK_PLAYS.filter(function (p) { return p[2].indexOf(k) === 0; }).map(function (p) {
var key = "q" + SHK_PLAYS.indexOf(p);
fns[key] = function () { shkFolio(p[0]); };
return "<span data-w='" + key + "' role='button' style='font-size:12px;padding:3px 8px;border:1px solid rgba(216,168,104,.5);border-radius:10px;cursor:pointer'>" + esc(p[0]) + "</span>";
}).join("") + "</div>";
});
h += worldBtn("all", "📖 The whole Folio", "Every play, sonnet and poem");
fns.all = function () { shkFolio(); };
worldCard(h, fns);
},
function (P, R) {
var C = SHK_PLACES.paris, x = C.x, z = C.z, lite = SHK.lite, n = lite ? 120 : 420;
var geo = new THREE.IcosahedronGeometry(0.13, 0), fl = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ color: 0xffffff }), n * 10), M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(1, 0.7, 1), p = new THREE.Vector3(), col = new THREE.Color(), k = 0;
var cols = [0xC83A4A, 0xE8C850, 0x8A4AA8, 0xF4F0E6, 0xE87AA0, 0xD86A2A, 0x6A7AD8];
for (var i = -2; i <= 2; i++)
for (var j = -1; j <= 1; j += 2) {
var bx = x + i * 20, bz = z + j * 16;
for (var f = 0; f < n / 10 * 10 / 10 && k < n * 10; f++) {
p.set(bx + (R() - 0.5) * 7.6, 0.62 + R() * 0.12, bz + (R() - 0.5) * 5.6);
M.compose(p, q, s);
fl.setMatrixAt(k, M);
col.setHex(cols[(i + j + 5 + (R() < 0.3 ? 1 : 0)) % cols.length]);
fl.setColorAt(k, col);
k++;
}
}
fl.count = k;
fl.userData.keep = 1;
P.add(fl);
[[0, -30], [0, 30], [-45, 0], [45, 0]].forEach(function (a, ai) {
var g = new THREE.Group();
g.position.set(x + a[0], 0, z + a[1]);
g.rotation.y = ai < 2 ? 0 : Math.PI / 2;
P.add(g);
[-1.6, 1.6].forEach(function (o) { shkBox(g, 0.14, 2.6, 0.14, shkS("wood", 0x4A3424), o, 1.3, 0); });
for (var b = 0; b <= 8; b++) {
var an = b / 8 * Math.PI, bb = shkBox(g, 0.5, 0.1, 0.18, shkS("wood", 0x4A3424), Math.cos(an) * 1.6, 2.6 + Math.sin(an) * 1.1, 0);
bb.rotation.z = an - Math.PI / 2;
}
for (var r = 0; r < (lite ? 10 : 26); r++) {
var an2 = R() * Math.PI, rr = 1.6 + (R() - 0.5) * 0.25;
wSph(0.09 + R() * 0.05, shkC(r % 2 ? 0xB01A2A : 0xF4F0EA), Math.cos(an2) * rr, 2.6 + Math.sin(an2) * 1.15, (R() - 0.5) * 0.4, g, 6);
wSph(0.16, shkC(0x3A6A2E), Math.cos(an2) * rr * 1.02, 2.55 + Math.sin(an2) * 1.1, (R() - 0.5) * 0.5, g, 5);
}
[-1.6, 1.6].forEach(function (o) { shkSolid({ x: x + a[0] + (ai < 2 ? o : 0), z: z + a[1] + (ai < 2 ? 0 : o), r: 0.25 }); });
});
[[-55, -35], [55, -35], [-55, 35], [55, 35]].forEach(function (c) { shkCyl(P, 0.01, 1.3, 3.6, shkC(0x2E5A2A), x + c[0], 2.2, z + c[1], 10); shkCyl(P, 1.1, 1.2, 0.6, shkC(0x2E5A2A), x + c[0], 0.3, z + c[1], 10); shkSolid({ x: x + c[0], z: z + c[1], r: 1.3 }); });
[[-20, -6], [20, -6], [-20, 6], [20, 6]].forEach(function (b) { var st = shkS("stone", 0xD8D0BC); shkBox(P, 2.4, 0.12, 0.6, st, x + b[0], 0.48, z + b[1]); [-0.9, 0.9].forEach(function (o) { shkBox(P, 0.3, 0.45, 0.5, st, x + b[0] + o, 0.22, z + b[1]); }); shkSolidBox(x + b[0], z + b[1], 2.4, 0.6, 0, 0.5); });
if (!lite)
[[-70, -50], [70, -50], [-70, 50], [70, 50]].forEach(function (t, k2) { shkElm(P, x + t[0], z + t[1], 12 + k2 * 2, 760 + k2); });
},
function (g, cx, P) {
var y = P.tiring.y, tz = P.tiring.z, lite = SHK.lite;
shkBox(g, 5, 0.05, 0.05, shkS("wood", 0x4A3424), cx + 6, y + 2.1, tz - 3.4);
[-2.5, 2.5].forEach(function (o) { shkBox(g, 0.08, 2.1, 0.08, shkS("wood", 0x4A3424), cx + 6 + o, y + 1.05, tz - 3.4); });
var gc = [0x7A1F2A, 0x2A3A7A, 0xC8A040, 0x2A5A3A, 0x5A2A6A, 0xF0ECE0, 0x1A1A1A, 0x8A4A1A];
for (var i = 0; i < (lite ? 5 : 8); i++) {
var gw = shkCyl(g, 0.12, 0.36, 1.5, shkC(gc[i]), cx + 4 + i * 0.55, y + 1.3, tz - 3.4, 8);
}
shkBox(g, 1.6, 0.8, 0.7, shkS("wood", 0x5A3E26), cx + 2, y + 0.4, tz + 2.6);
[0, 0.5].forEach(function (o, k) { shkCyl(g, 0.13, 0.13, 0.1, shkGlowM(0xE8C850), cx + 1.5 + o, y + 0.86, tz + 2.6, 10, true); });
wSph(0.11, shkC(0xE8E0CC), cx + 2.5, y + 0.9, tz + 2.6, g, 10);
for (var s = 0; s < 3; s++) {
var sw = shkBox(g, 0.04, 1.1, 0.08, shkC(0xB8BCC0), cx + 9 + s * 0.25, y + 0.9, tz + 3.3);
sw.rotation.z = 0.12;
}
for (var c = 0; c < 3; c++) {
shkCyl(g, 0.03, 0.03, 0.25, shkC(0xF0E8D0), cx + 4.5 + c * 0.3, y + 1.05, tz + 0.4, 6);
shkBox(g, 0.03, 0.06, 0.03, shkGlowM(0xFFD07A), cx + 4.5 + c * 0.3, y + 1.21, tz + 0.4);
}
shkCyl(g, 0.04, 0.06, 1.4, shkS("wood", 0x4A3424), cx - 9, y + 0.7, tz - 2);
wSph(0.16, shkC(0x8A5A2A), cx - 9, y + 1.5, tz - 2, g, 8);
shkBox(g, 0.7, 1.1, 0.05, shkC(0xC8D0D4), cx - 10, y + 1.4, tz - 3.9);
shkBox(g, 0.8, 1.2, 0.04, shkS("wood", 0x4A3424), cx - 10, y + 1.4, tz - 3.95);
},
function (g, cx, cz, Rm) {
SHK_PLAY_IDS.forEach(function (id, i) {
var T = CT_BY_ID[id];
if (!T)
return;
var k = i < 8 ? -1 : 1, z = cz + Rm.hd - 18 - (i % 8) * 16.5, x = cx + k * (Rm.hw - 0.3);
var col = parseInt((T.col && T.col[1] || T.col && T.col[0] || "#7A1F1A").slice(1), 16);
var ban = shkBox(g, 0.06, 3.2, 1.5, shkC(col), x - k * 0.25, 8.6, z);
shkBox(g, 0.08, 0.08, 1.8, shkS("wood", 0x3A2A1C), x - k * 0.25, 10.25, z);
[-3.6, 3.6].forEach(function (o) { shkCyl(g, 0.06, 0.1, 0.5, shkS("wood", 0x3A2A1C), x - k * 0.4, 3.2, z + o, 6); shkBox(g, 0.14, 0.22, 0.14, shkGlowM(0xFFB860), x - k * 0.4, 3.55, z + o); });
});
shkBox(g, 3, 0.03, Rm.hd * 1.6, shkC(0x6A1F1A), cx, 0.02, cz + Rm.hd * 0.1);
},
function (w, want) {
if (!w || !w.parts || !w.parts.length)
return 0;
if (/^prologue$/i.test(want)) {
for (var q = 0; q < w.parts.length; q++)
if (/^prologue/i.test(w.parts[q][1]))
return q;
return 0;
}
var a = shkRoman(String(want).split(".")[0]), s = +String(want).split(".")[1] || 1, best = -1, firstOfAct = -1;
w.parts.forEach(function (p, i) {
var m = /^Act ([IVXL]+|\d+)(?:, Scene ([IVXL]+|\d+))?/i.exec(p[1]);
if (!m)
return;
var pa = shkRoman(m[1]), ps = m[2] ? shkRoman(m[2]) : 0;
if (pa === a && firstOfAct < 0)
firstOfAct = i;
if (pa === a && ps && ps <= s)
best = i;
});
return best >= 0 ? best : firstOfAct >= 0 ? firstOfAct : 0;
},
function (id) {
var T0 = shksT(), title = T0 ? T0.t : id;
return shkfIndex().then(function () {
var w = shkfMatch(title);
if (!w)
throw new Error("no work");
if (SHKS.tid === w.id && SHKS.text)
return { w: w, lines: SHKS.text };
return fetch(SHKF_BASE + w.id + ".txt").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.text(); })
.then(function (t) { SHKS.tid = w.id; SHKS.text = t.split("\n"); return { w: w, lines: SHKS.text }; });
});
},
function (id, w, L) {
var sc = SHK_SCENES[id] || [], beats = SHK_ACT[id] || [], P = w.parts || [], A = [];
sc.forEach(function (s, k) {
var who = null, pi = shkScenePart(w, s), start = P[pi] ? P[pi][0] : 0, end = P[pi + 1] ? P[pi + 1][0] : L.length, shared = sc.slice(0, k).indexOf(s) >= 0;
if (shared && beats[k] && beats[k][0]) {
var want = shkNorm(beats[k][0][1]).slice(0, 26);
var sp = shksParse(L, start, end);
for (var q = 0; q < sp.length; q++) {
if (sp[q].k === "say" && shkNorm(sp[q].t.join(" ")).indexOf(want.slice(0, 18)) >= 0) {
start = sp[q].at;
who = sp[q].who;
for (var r = sp[q].at + 1; r < end; r++) {
if (shkNorm(L[r] + " " + (L[r + 1] || "")).indexOf(want.slice(0, 14)) === 0 || shkNorm(L[r]).indexOf(want.slice(0, 14)) === 0) {
start = r;
who = sp[q].who;
break;
}
if (r > sp[q].at + 400)
break;
}
break;
}
}
}
A.push({ k: k, at: start, who: who });
});
var first = P.length ? P[0][0] : 0, sorted = A.slice().sort(function (a, b) { return a.at - b.at || a.k - b.k; }), R = {};
sorted.forEach(function (a, i) {
var from = i === 0 ? Math.min(first, a.at) : a.at, to = L.length;
for (var j = i + 1; j < sorted.length; j++)
if (sorted[j].at > a.at) {
to = sorted[j].at;
break;
}
if (i > 0 && sorted[i - 1].at === a.at)
from = to;
R[a.k] = [from, to, from === a.at ? a.who : null];
});
return R;
},
function (L, from, to, who0) {
var out = [], cur = null, cont = null, lastDir = false, song = false, lastHead = null;
if (who0) {
cur = { k: "say", who: who0, t: [], at: from };
out.push(cur);
}
function dir(t, q) { t = t.replace(/^\[_|_\]$/g, "").replace(/^\[|\]$/g, "").trim(); if (!t)
return; out.push({ k: "dir", t: t, at: q }); if (/\b(Sings?|Song|Catch sung)\b/i.test(t))
song = true; if (cur)
cont = cur.who; cur = null; lastDir = true; }
for (var q = from; q < to; q++) {
var raw = (L[q] || "").replace(/\s+$/, ""), t = raw.trim(), m;
if (!t)
continue;
var wasDir = lastDir;
lastDir = false;
var hd = null;
if ((/^(ACT [IVXL]+|SCENE [IVXL\d]+|PROLOGUE|EPILOGUE|CHORUS)\b/i.test(t) && t.length < 90 && /^[A-Z]{3}/.test(t) && !/^(PROLOGUE|EPILOGUE|CHORUS)\.\s+\S/.test(t)) || /^[A-Z][A-Z’' ]+ ACT [IVXL]+\.? SCENE \d+\.?$/.test(t)) {
cur = null;
hd = { k: "head", t: t.replace(/^[A-Z][A-Z’' ]+ (ACT [IVXL]+)/, "$1"), at: q };
out.push(hd);
lastHead = hd;
continue;
}
if (lastHead && !/[a-z]/.test(lastHead.t.replace(/^.*?SCENE\s+\S+\.?\s*/i, "").slice(0, 3) || "") && /^SCENE\b|ACT [IVXL]+\.? SCENE/i.test(lastHead.t) && !/\S\s*$/.test(lastHead.t.replace(/^.*?SCENE\s+[IVXL\d]+\.?/i, "")) && !SHK_SPEAKER.test(t) && !SHK_DIR.test(t) && !/^\s{0,3}[A-Z][A-Z’' ,&\-]{1,38}[A-Z]\.\s/.test(raw)) {
lastHead.t += ". " + t;
lastHead = null;
continue;
}
lastHead = null;
var tail = null, cut = raw.search(/\S\s{8,}\S/);
if (cut > 0 && raw.search(/^\s{0,6}\S/) === 0 && (SHK_DIR.test(raw.slice(cut + 1).trim()) || /^\[/.test(raw.slice(cut + 1).trim()))) {
tail = raw.slice(cut + 1).trim();
raw = raw.slice(0, cut + 1);
t = raw.trim();
}
if (SHK_SPEAKER.test(t) && t.length < 44) {
cont = null;
song = false;
cur = { k: "say", who: shkTitleCase(t.replace(/\.$/, "")), t: [], at: q };
out.push(cur);
}
else if ((m = /^\s{0,3}([A-Z][A-Z’' ,&\-]{1,38}[A-Z])\.\s+(\S.*)$/.exec(raw)) && !/^(ACT|SCENE)\b/.test(m[1])) {
cont = null;
song = false;
cur = { k: "say", who: shkTitleCase(m[1]), t: [m[2].trim()], at: q };
out.push(cur);
}
else if (/^\s{8,}\S/.test(raw) && cur && !SHK_DIR.test(t) && !/^\[/.test(t))
cur.t.push(t);
else if (song && cont && !cur && !SHK_DIR.test(t) && !/^\[/.test(t) && /^[A-Z'"‘“]/.test(t)) {
cur = { k: "say", who: cont, t: [t], at: q };
out.push(cur);
}
else if (/^ \S/.test(raw) || /^\s{8,}\S/.test(raw) || (SHK_DIR.test(t) && !/^\s{4,7}\S/.test(raw)) || /^\[_.*_\]$/.test(t))
dir(t, q);
else if (cur)
cur.t.push(t);
else if (wasDir && /^[a-z(]/.test(t))
dir(t, q);
else if (cont) {
cur = { k: "say", who: cont, t: [t], at: q };
out.push(cur);
}
else
dir(t, q);
if (tail)
dir(tail, q);
}
return out.filter(function (x) { return x.k !== "say" || x.t.length; });
},
function (who) {
var T = shksT(), a = shksCore(who), hit = null;
((T && T.who) || []).forEach(function (w) {
if (hit)
return;
var b = shksCore(w.n);
if (!b.all)
return;
if (b.all === a.all) {
hit = w;
return;
}
if (a.lady !== b.lady)
return;
if (a.core && b.core && (a.core === b.core || (" " + b.core + " ").indexOf(" " + a.core + " ") >= 0 || (" " + a.core + " ").indexOf(" " + b.core + " ") >= 0))
hit = w;
});
return hit;
},
function (who) {
if (/^(all|both|omnes)$/i.test(who)) {
var on0 = Object.keys(SHKS.cast).filter(function (n) { return !SHKS.cast[n].leaving; });
if (on0.length)
return SHKS.cast[on0[on0.length - 1]];
}
if (/\bact [ivxl]+\b|^scene\b/i.test(who))
return null;
if (!SHKS.cast[who]) {
var Wq = shksCastFind(who);
if (Wq)
for (var K in SHKS.cast) {
if (SHKS.cast[K] && !SHKS.cast[K].leaving && shksCastFind(K) === Wq)
return SHKS.cast[K];
}
}
var A = SHKS.cast[who];
if (A && !A.leaving)
return A;
if (A && A.leaving) {
A.leaving = false;
A.tx = A.sx;
A.tz = A.sz;
return A;
}
var st = SHKS.set;
if (!st)
return null;
var on = Object.keys(SHKS.cast).filter(function (n) { return !SHKS.cast[n].leaving; });
if (on.length >= 8) {
on.sort(function (a, b) { return SHKS.cast[a].last - SHKS.cast[b].last; });
shksExit(on[0]);
}
var used = {};
Object.keys(SHKS.cast).forEach(function (n) { if (!SHKS.cast[n].leaving)
used[SHKS.cast[n].slot] = 1; });
var slot = 0;
while (used[slot] && slot < SHK_SLOTS.length - 1)
slot++;
var Wh = shksCastFind(who), P = shksPerson(who), g;
try {
g = ctPersonBody(Wh || { n: who, who: "", child: P.ftkAge < 13 ? 1 : 0, o: { sex: P.ftkSex, look: {} } }, "shk_" + SHKS.id + "_" + (Wh ? Wh.n : who));
}
catch (e) {
return null;
}
var lx = SHK_SLOTS[slot] * (SHKS.globe ? 0.72 : 1), lz = -Math.abs(lx) * 0.32, home = shksLocal(st, lx, lz), side = lx < 0 || (lx === 0 && shksHash(who) % 2) ? -1 : 1, from = SHKS.globe ? shkgDoorPt(side) : shksLocal(st, side * Math.min(Math.abs(lx) + 6, 11.5), -1.5);
g.position.set(from.x, st.y, from.z);
SHKS.castG.add(g);
A = SHKS.cast[who] = { g: g, who: who, slot: slot, sx: home.x, sz: home.z, tx: home.x, tz: home.z, last: SHKS.clock, leaving: false, ph: Math.random() * 6, amp: 0, talk: 0, ox: from.x, oz: from.z };
if (SHKS.globe ? (SHKS.globe.aboveNext || (Wh && SHKS.globe.above && SHKS.globe.above[Wh.n])) : (SHKS.balcony && /juliet/i.test(who))) {
var Bq = SHKS.globe ? SHKS.globe.balc : null, bp = Bq ? { x: Bq.x + SHK_SLOTS[slot] * 0.45, z: Bq.z } : shksLocal(st, 0, -8.45), by = Bq ? Bq.ty : 3.4;
A.sx = A.tx = A.ox = bp.x;
A.sz = A.tz = A.oz = bp.z;
A.ty = by;
g.position.set(bp.x, st.y + by, bp.z);
}
return A;
},
function (t, n) {
var T = shkWords(t), b = shksCore(n), last = b.all.split(" ").pop();
if (!last)
return false;
if (b.lady || b.all.indexOf(" ") > 0)
return (" " + T + " ").indexOf(" " + b.all + " ") >= 0 || (!b.lady && new RegExp("\\b" + last + "(e?s)?\\b").test(T) && b.core === last);
var re = new RegExp("(\\S+\\s+)?\\b" + last.replace(/[^a-z]/g, "") + "(e?s)?\\b", "g"), m;
while ((m = re.exec(T)))
if (!/^(lady|queen|duchess|princess|countess|mistress)\s+$/.test(m[1] || ""))
return true;
return false;
},
function (t) {
var names = Object.keys(SHKS.cast).filter(function (n) { return !SHKS.cast[n].leaving; });
if (/^\[?_?Exeunt\b/i.test(t)) {
var but = /but\s+(.+)$/i.exec(t);
if (but) {
names.forEach(function (n) { if (!shksNamed(but[1], n))
shksExit(n); });
}
else
shksExitAll();
}
else if (/^\[?_?Exit\b/i.test(t)) {
var rest = t.replace(/^\[?_?Exit\.?\s*/i, ""), hit = false;
names.forEach(function (n) { if (rest && shksNamed(rest, n)) {
shksExit(n);
hit = true;
} });
if (!hit && SHKS.lastWho && !rest)
shksExit(SHKS.lastWho);
}
else if (/\bEnter\b/i.test(t)) {
((shksT() && shksT().who) || []).forEach(function (w) { if (shksNamed(t, w.n))
shksActor(w.n); });
}
},
function (kind, who) {
var st = SHKS.set, A = who ? SHKS.cast[who] : null, sh = { t: 0, dur: 9 };
var aud = { x: st.s, z: st.c };
if (!A || kind === "wide") {
var e = shksLocal(st, 0, 9), e2 = shksLocal(st, (SHKS.shotN % 2 ? -1.6 : 1.6), 7.6);
sh.a = { x: e.x, y: st.y + 2.5, z: e.z };
sh.b = { x: e2.x, y: st.y + 2.2, z: e2.z };
sh.look = { x: st.x, y: st.y + 1.3, z: st.z };
return sh;
}
var hx = A.leaving ? A.g.position.x : A.tx, hz = A.leaving ? A.g.position.z : A.tz, fy = Math.atan2(st.s, st.c) + (A.tx - st.x) * 0, fx = Math.sin(fy), fz = Math.cos(fy), rx = fz, rz = -fx;
var others = Object.keys(SHKS.cast).filter(function (n) { return n !== who && !SHKS.cast[n].leaving; }), L = others.length ? SHKS.cast[others[SHKS.shotN % others.length]] : null;
var gy = A.g.position.y, head = gy + 1.58 * (A.g.scale.y || 1);
if (kind === "close") {
var sd = (SHKS.shotN % 2 ? 0.5 : -0.5);
sh.a = { x: hx + fx * 2.1 + rx * sd, y: head + 0.02, z: hz + fz * 2.1 + rz * sd };
sh.b = { x: hx + fx * 1.7 + rx * sd * 0.8, y: head, z: hz + fz * 1.7 + rz * sd * 0.8 };
sh.look = { x: hx, y: head - 0.04, z: hz };
}
else if (kind === "over" && L) {
var lx = L.g.position.x, lz = L.g.position.z, dx = hx - lx, dz = hz - lz, d = Math.hypot(dx, dz) || 1;
dx /= d;
dz /= d;
var px = -dz, pz = dx;
sh.a = { x: lx - dx * 1.1 + px * 0.55, y: L.g.position.y + 1.72, z: lz - dz * 1.1 + pz * 0.55 };
sh.b = { x: lx - dx * 0.8 + px * 0.5, y: L.g.position.y + 1.7, z: lz - dz * 0.8 + pz * 0.5 };
sh.look = { x: hx, y: head - 0.05, z: hz };
}
else {
var sd2 = (SHKS.shotN % 2 ? 1.4 : -1.4);
sh.a = { x: hx + aud.x * 4.2 + rx * sd2, y: gy + 1.45, z: hz + aud.z * 4.2 + rz * sd2 };
sh.b = { x: hx + aud.x * 3.4 + rx * sd2 * 0.7, y: gy + 1.5, z: hz + aud.z * 3.4 + rz * sd2 * 0.7 };
sh.look = { x: hx, y: gy + 1.3, z: hz };
}
return sh;
},
function (dt) {
if (!SHKS.on || !SHKS.set || !SHKS.castG)
return;
if (!SHKS.paused)
SHKS.clock += dt;
var speaker = SHKS.speaking ? SHKS.cast[SHKS.speaking] : null;
Object.keys(SHKS.cast).forEach(function (n) {
var A = SHKS.cast[n], g = A.g, dx = A.tx - g.position.x, dz = A.tz - g.position.z, d = Math.hypot(dx, dz), moving = d > 0.06, Lm = g.userData.limbs;
if (moving) {
var stp = Math.min(d, 2.1 * dt);
g.position.x += dx / d * stp;
g.position.z += dz / d * stp;
g.position.y = SHKS.set.y + (A.ty || 0);
}
else if (A.leaving) {
SHKS.castG.remove(g);
try {
ctsFree(g);
}
catch (e) { }
delete SHKS.cast[n];
return;
}
var want;
if (moving)
want = Math.atan2(dx, dz);
else if (speaker && speaker !== A)
want = Math.atan2(speaker.g.position.x - g.position.x, speaker.g.position.z - g.position.z);
else if (speaker === A) {
var cx = 0, cz = 0, m = 0;
Object.keys(SHKS.cast).forEach(function (o) { var B = SHKS.cast[o]; if (B !== A && !B.leaving) {
cx += B.g.position.x;
cz += B.g.position.z;
m++;
} });
var ax = SHKS.set.s, az = SHKS.set.c;
if (m) {
cx /= m;
cz /= m;
var ox = cx - g.position.x, oz = cz - g.position.z, ol = Math.hypot(ox, oz) || 1;
ax = ax * 0.55 + ox / ol * 0.45;
az = az * 0.55 + oz / ol * 0.45;
}
want = Math.atan2(ax, az);
}
else
want = Math.atan2(SHKS.set.s, SHKS.set.c);
var diff = Math.atan2(Math.sin(want - g.rotation.y), Math.cos(want - g.rotation.y));
g.rotation.y += diff * Math.min(1, dt * 3.2);
A.ph += dt * (moving ? 5.5 : 2.2);
A.amp += ((moving ? 0.42 : 0) - A.amp) * Math.min(1, dt * 6);
A.talk += ((speaker === A && !SHKS.paused ? 1 : 0) - A.talk) * Math.min(1, dt * 3);
if (Lm) {
var sw = Math.sin(A.ph) * A.amp;
Lm.ll.rotation.x = sw;
Lm.rl.rotation.x = -sw;
var gest = A.talk * (0.55 + 0.35 * Math.sin(A.ph * 0.9)), gest2 = A.talk * (0.25 + 0.3 * Math.sin(A.ph * 0.7 + 1.3));
Lm.ra.rotation.x = -sw * 0.75 - gest;
Lm.la.rotation.x = sw * 0.75 - gest2;
Lm.ra.rotation.z = -A.talk * 0.25;
Lm.la.rotation.z = A.talk * 0.12;
}
g.rotation.z = A.talk * Math.sin(A.ph * 0.6) * 0.025;
});
if (SHKS.globe && SHKS.globe.view === "seat") {
shkgSeatCam(dt, speaker);
return;
}
var S = SHKS.shot;
if (!S)
return;
if (!SHKS.paused)
S.t += dt;
var u = Math.min(1, S.t / S.dur), e = u * u * (3 - 2 * u);
if (S.who && SHKS.cast[S.who] && S.kind !== "wide") {
var A2 = SHKS.cast[S.who];
S.look.x = A2.g.position.x;
S.look.z = A2.g.position.z;
}
var px = S.a.x + (S.b.x - S.a.x) * e, py = S.a.y + (S.b.y - S.a.y) * e, pz = S.a.z + (S.b.z - S.a.z) * e;
var W = shksRoot().localToWorld(shksV(px, py, pz));
camera.position.copy(W);
var T = shksRoot().localToWorld(shksV(S.look.x, S.look.y, S.look.z)), dx2 = T.x - camera.position.x, dy2 = T.y - camera.position.y, dz2 = T.z - camera.position.z;
yaw = Math.atan2(-dx2, -dz2);
pitch = Math.atan2(dy2, Math.hypot(dx2, dz2));
},
function () {
if (SHKS.el)
return SHKS.el;
var st = document.createElement("style");
st.textContent = "body.shk-cine>*:not(#world):not(#shk-cine){visibility:hidden!important}" +
"#shk-cine{position:fixed;inset:0;z-index:9000;pointer-events:none;font-family:Georgia,'Times New Roman',serif}" +
"#shk-cine .bar{position:absolute;left:0;right:0;background:#000;transition:transform 1s ease}#shk-cine .bt{top:0;height:12vh}#shk-cine .bb{bottom:0;height:22vh}" +
"#shk-cine .ttl{position:absolute;left:16px;top:3.4vh;color:#C8B080;font-size:14px;letter-spacing:.06em;max-width:58vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
"#shk-cine .ctl{position:absolute;right:12px;top:2.6vh;pointer-events:auto;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;max-width:44vw}" +
"#shk-cine .ctl span{color:#E8D8B0;border:1px solid rgba(232,216,176,.45);border-radius:6px;padding:5px 10px;font-size:13px;cursor:pointer;background:rgba(40,30,20,.6);touch-action:manipulation}" +
"#shk-cine .ctl span.on{background:#5A1A2A}" +
"#shk-cine .sub{position:absolute;left:50%;transform:translateX(-50%);bottom:2.4vh;width:min(920px,calc(100vw - 32px));text-align:center;color:#FFF;text-shadow:0 2px 4px #000,0 0 2px #000}" +
"#shk-cine .who{color:#E8C060;font-variant:small-caps;letter-spacing:.1em;font-size:16px;margin-bottom:3px}" +
"#shk-cine .say{font-size:clamp(17px,2.3vw,23px);line-height:1.35;white-space:pre-line}#shk-cine .say.dir{font-style:italic;color:#D8C8A8}" +
"#shk-cine .pl{font-family:system-ui,sans-serif;font-size:clamp(13px,1.6vw,15px);color:#A8D0F0;margin-top:6px;font-style:italic}" +
"#shk-cine .card{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);text-align:center;color:#F0E0C0;text-shadow:0 2px 8px #000;transition:opacity 1s;width:min(820px,90vw)}" +
"#shk-cine .card .a{font-size:clamp(22px,3.4vw,36px);letter-spacing:.12em}#shk-cine .card .b{font-family:system-ui,sans-serif;font-size:clamp(14px,1.8vw,17px);margin-top:10px;line-height:1.45;color:#E8E0D0}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "shk-cine";
d.innerHTML = "<div class='bar bt'><div class='ttl'></div><div class='ctl'></div></div><div class='bar bb'></div><div class='card' style='opacity:0'><div class='a'></div><div class='b'></div></div><div class='sub'><div class='who'></div><div class='pl' style='display:none'></div><div class='say'></div></div>";
d.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-sk]"); if (b) {
e.stopPropagation();
shksDo(b.getAttribute("data-sk"));
} });
document.body.appendChild(d);
SHKS.el = d;
return d;
},
function () {
var d = shksUi(), c = d.querySelector(".ctl");
c.innerHTML = "<span data-sk='back'>◀</span><span data-sk='pause'>" + (SHKS.paused ? "▶ Play" : "⏸ Pause") + "</span><span data-sk='next'>⏭</span>" +
(typeof fvoSpeak === "function" && window.speechSynthesis ? "<span data-sk='voice' class='" + (SHKS.voice ? "on" : "") + "'>🔊 " + (SHKS.voice ? "On" : "Off") + "</span>" : "") +
(SHKS.globe ? "<span data-sk='view'>" + (SHKS.globe.view === "seat" ? "🎥 Close-ups" : "🪑 My seat") + "</span>" : "") +
"<span data-sk='plain'>" + (SHKS.busy ? "✨ …" : "✨ Plain words") + "</span><span data-sk='book'>📜 Book</span><span data-sk='x'>✕</span>";
},
function (who, text, plain, dir) {
var d = shksUi();
d.querySelector(".who").textContent = who || "";
var s = d.querySelector(".say");
s.textContent = String(text || "").replace(/\[_([^\]]*?)_\]/g, "($1)").replace(/\[_|_\]/g, "");
s.className = "say" + (dir ? " dir" : "");
var p = d.querySelector(".pl");
p.style.display = plain ? "block" : "none";
p.textContent = plain ? "In plain words: " + plain : "";
},
function (id, k) {
if (SHKS.on)
shksStop();
SHKS.on = true;
SHKS.id = id;
SHKS.k = k;
SHKS.i = 0;
SHKS.list = [];
SHKS.paused = false;
SHKS.cast = {};
SHKS.clock = 0;
SHKS.shotN = 0;
SHKS.gen = (SHKS.gen || 0) + 1;
SHKS.lastWho = null;
SHKS.speaking = null;
try {
SHKS.voice = store.shkVoice !== false && !!window.speechSynthesis;
}
catch (e) { }
try {
worldCard(null);
worldPrompt(null);
}
catch (e) { }
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
SHKS.set = shksSet();
if (!SHKS.set) {
SHKS.on = false;
return;
}
SHKS.back = { x: camera.position.x, y: camera.position.y, z: camera.position.z, yaw: yaw, pitch: pitch };
var p = SHKS.set.p;
if (p.pg)
p.pg.visible = false;
try {
if (typeof CT !== "undefined") {
SHKS.talk0 = CT.talkers;
CT.talkers = [];
CT.near = null;
}
}
catch (e) { }
SHKS.castG = new THREE.Group();
SHKS.castG.name = "shk-cast";
CTS.root.add(SHKS.castG);
try {
if (typeof shkpSet === "function") {
shkpSet("");
shkpHideWorld();
}
}
catch (e) { }
shksQuietGreeters();
var d = shksUi();
document.body.classList.add("shk-cine");
d.style.display = "block";
var C = CTS.W.ch[k];
d.querySelector(".ttl").textContent = "🎭 " + (CTS.T ? CTS.T.t : "") + " · " + (shkSceneName(id, k) || "") + " · " + (C ? C[0] : "");
shksControls();
shksSub("", "", null, false);
shksCut("wide", null, 10);
shksCard(C ? C[0] : "", C ? C[1] : "", true);
var gen = SHKS.gen;
Promise.all([shksText(id), new Promise(function (ok) { shksSay(SHK_NARRATOR, C ? C[1] : "", ok); setTimeout(ok, SHKS.voice ? 60000 : 4200); })]).then(function (R) {
if (!SHKS.on || SHKS.gen !== gen)
return;
var D = R[0], Rg = shksRanges(id, D.w, D.lines)[k] || [0, 0];
SHKS.list = shksParse(D.lines, Rg[0], Rg[1], Rg[2]);
shksCard("", "", false);
if (!SHKS.list.length) {
shksSub("", "This chapter's lines are played with the chapter before it.", null, true);
return;
}
shksPlay();
}).catch(function () { shksCard("The players' book could not be fetched just now.", "Try again in a moment.", true); });
},
function () {
if (!SHKS.on)
return;
SHKS.on = false;
SHKS.gen = (SHKS.gen || 0) + 1;
clearTimeout(SHKS.timer);
try {
if (window.speechSynthesis)
speechSynthesis.cancel();
}
catch (e) { }
if (SHKS.castG) {
try {
SHKS.castG.parent.remove(SHKS.castG);
ctsFree(SHKS.castG);
}
catch (e) { }
SHKS.castG = null;
}
SHKS.cast = {};
SHKS.shot = null;
try {
if (typeof shkpClear === "function") {
shkpClear();
if (!SHKS.globe)
shkpShowWorld();
}
}
catch (e) { }
if (SHKS.set && SHKS.set.p && SHKS.set.p.pg)
SHKS.set.p.pg.visible = true;
try {
if (!SHKS.globe && typeof ctsTalkers === "function")
ctsTalkers();
}
catch (e) { }
if (SHKS.back) {
camera.position.set(SHKS.back.x, SHKS.back.y, SHKS.back.z);
yaw = SHKS.back.yaw;
pitch = SHKS.back.pitch;
}
document.body.classList.remove("shk-cine");
if (SHKS.el)
SHKS.el.style.display = "none";
if (SHKS.globe) {
var Gs = SHKS.globe;
SHKS.globe = null;
try {
shkgAfter(Gs);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] globe", e);
}
}
},
function () {
clearTimeout(SHKS.timer);
try {
if (window.speechSynthesis)
speechSynthesis.cancel();
}
catch (e) { }
var gen = ++SHKS.gen, s = SHKS.list[SHKS.i];
if (!s) {
shksEnd();
return;
}
var alive = function () { return SHKS.on && SHKS.gen === gen; };
var wait = function (ms, fn) { SHKS.timer = setTimeout(function () { if (!alive())
return; if (SHKS.paused) {
SHKS.resume = function () { wait(300, fn); };
return;
} fn(); }, ms); };
var next = function () { if (!alive())
return; if (SHKS.paused) {
SHKS.resume = next;
return;
} SHKS.i++; shksPlay(); };
SHKS.speaking = null;
if (s.k === "head") {
shksExitAll();
try {
if (typeof shkpSet === "function")
shkpSet(s.t);
}
catch (e) { }
if (SHKS.globe) {
SHKS.globe.at = s.t;
SHKS.globe.above = {};
}
shksCut("wide", null, 6);
shksSub("", s.t, null, true);
shksSay(SHK_NARRATOR, s.t.replace(/\bSC\b/, "Scene"), function () { wait(900, next); });
if (!SHKS.voice)
wait(2600, next);
return;
}
if (s.k === "dir") {
if (SHKS.globe) {
var up = /\b(above|aloft|at a window|on the walls)\b/i.test(s.t);
SHKS.globe.aboveNext = up && /\bEnter\b/i.test(s.t);
if (up) {
SHKS.globe.above = SHKS.globe.above || {};
((shksT() && shksT().who) || []).forEach(function (w) { if (shksNamed(s.t, w.n))
SHKS.globe.above[w.n] = 1; });
}
}
shksDirect(s.t);
if (SHKS.globe)
SHKS.globe.aboveNext = false;
if (SHKS.shot && SHKS.shot.kind !== "wide" && /Enter|Exeunt|Exit/i.test(s.t))
shksCut("wide", null, 6);
shksSub("", s.t, null, true);
if (SHKS.voice)
shksSay(SHK_NARRATOR, s.t, function () { wait(500, next); });
else
wait(Math.min(5000, 1400 + s.t.length * 45), next);
return;
}
if (SHKS.globe)
try {
shkgMark();
}
catch (e) { }
var A = shksActor(s.who);
SHKS.speaking = s.who;
SHKS.lastWho = s.who;
if (A)
A.last = SHKS.clock;
var text = s.t.join(" ").replace(/\s+/g, " "), parts = shksPieces(text), gl = shksGloss(SHKS.id, s) || SHKS.plain[SHKS.tid + ":" + s.at];
var est = parts.reduce(function (a, p) { return a + 1.2 + p.length * 0.06; }, 0);
var kinds = ["close", "over", "medium", "close", "medium", "over"], kind = A ? (text.length > 360 ? "medium" : kinds[SHKS.shotN % kinds.length]) : "wide";
if (!(SHKS.shot && SHKS.shot.who === s.who && SHKS.shot.t < SHKS.shot.dur * 0.5))
shksCut(kind, A ? s.who : null, est + 1);
var who = shksPerson(s.who);
(function piece(i) {
if (!alive())
return;
if (i >= parts.length) {
if (gl && !/^\(/.test(gl) && SHKS.voice) {
shksSay(SHK_NARRATOR, "In plain words: " + gl, function () { wait(350, next); });
}
else
wait(gl ? 1600 : 500, next);
return;
}
shksSub(s.who, parts[i], gl && !/^\(/.test(gl) ? gl : null, false);
if (SHKS.voice)
shksSay(who, parts[i].replace(/\[_[^\]]*_\]/g, " "), function () { if (!alive())
return; if (SHKS.paused) {
SHKS.resume = function () { piece(i + 1); };
return;
} piece(i + 1); });
else
wait(1300 + parts[i].length * 60, function () { piece(i + 1); });
})(0);
},
function () {
if (SHKS.globe) {
shkgEnd();
return;
}
var k = SHKS.k, id = SHKS.id;
SHKS.speaking = null;
shksExitAll();
shksCut("wide", null, 8);
shksSub("", "", null, false);
var nx = CTS.W.ch[k + 1];
shksCard("End of the scene", "That is all of this part of the play, every word of it." + (nx ? " Next: " + nx[0] + "." : ""), true);
SHKS.timer = setTimeout(function () {
if (!SHKS.on)
return;
shksStop();
if (typeof worldCard === "function")
worldCard(ctTitle("🎭 " + ctE(CTS.W.ch[k][0]) + ": the scene is played") + "<div style='margin:8px 0'>Now play the chapter yourself, watch it again, or read it in the book.</div>" +
worldBtn("go", "▶ Play the chapter", null) + worldBtn("again", "🎭 Watch it again", null) + worldBtn("book", "📜 Read it in the book", null), { go: function () { worldCard(null); ctsChapter(k); }, again: function () { shksStart(id, k); }, book: function () { shkReadChapter(id, k); } });
}, 5000);
},
function (a) {
if (a === "x") {
shksStop();
return;
}
if (a === "next") {
SHKS.paused = false;
SHKS.i++;
shksPlay();
shksControls();
return;
}
if (a === "back") {
SHKS.paused = false;
SHKS.i = Math.max(0, SHKS.i - 1);
shksPlay();
shksControls();
return;
}
if (a === "pause") {
SHKS.paused = !SHKS.paused;
if (SHKS.paused) {
try {
speechSynthesis.pause();
}
catch (e) { }
}
else {
try {
speechSynthesis.resume();
}
catch (e) { }
var r = SHKS.resume;
SHKS.resume = null;
if (r)
r();
}
shksControls();
return;
}
if (a === "voice") {
SHKS.voice = !SHKS.voice;
try {
store.shkVoice = SHKS.voice;
}
catch (e) { }
if (!SHKS.voice) {
try {
speechSynthesis.cancel();
}
catch (e) { }
}
shksControls();
shksPlay();
return;
}
if (a === "book") {
if (SHKS.globe) {
var tt = SHKS.globe.T.t;
shksStop();
shkFolio(tt);
return;
}
var id = SHKS.id, k = SHKS.k;
shksStop();
shkReadChapter(id, k);
return;
}
if (a === "view" && SHKS.globe) {
SHKS.globe.view = SHKS.globe.view === "seat" ? "film" : "seat";
try {
store.shkView = SHKS.globe.view;
}
catch (e) { }
if (SHKS.globe.view === "film") {
try {
shkgFovBack(SHKS.globe);
}
catch (e) { }
shksCut("wide", null, 8);
}
shksControls();
return;
}
if (a === "plain")
shksPlain();
},
function (who) {
var T = shksT(), last = shkNorm(String(who).split(" ").pop()), hit = null;
((T && T.who) || []).forEach(function (w) { var nm = shkNorm(w.n); if (!hit && nm && (nm.indexOf(last) >= 0 || last.indexOf(nm) >= 0))
hit = w; });
var name = hit ? (T.id + ":" + hit.n) : ((T ? T.id : "bard") + ":" + who.replace(/^(First|Second|Third|1|2|3) /i, function (m) { return m; }));
var sx = hit && hit.o && hit.o.sex ? hit.o.sex : SHK_SHE.test(who) ? "f" : "m";
var age = SHK_CHILD.test(who) ? 11 : SHK_OLD.test(who) || (hit && /\b(old|aged|eighty|elderly)\b/i.test(hit.who || "")) ? 68 : 35;
if (/^(ghost|apparition|time|chorus|hymen|ariel|puck|oberon|spirit)/i.test(who))
age = age === 35 ? 45 : age;
return { name: name, ftkSex: sx, ftkAge: age };
},
function () {
var s = SHKS.list[SHKS.i];
if (!s || s.k !== "say" || SHKS.busy)
return;
var key = SHKS.tid + ":" + s.at, C = SHKS.globe ? [SHKS.globe.at || "", SHKS.globe.at || ""] : CTS && CTS.W && CTS.W.ch[SHKS.k];
var show = function (t) { if (!SHKS.on || SHKS.list[SHKS.i] !== s)
return; var p = SHKS.el && SHKS.el.querySelector(".pl"); if (p) {
p.style.display = "block";
p.textContent = /^\(/.test(t) ? t : "In plain words: " + t;
} };
if (SHKS.plain[key] || shksGloss(SHKS.id, s)) {
show(SHKS.plain[key] || shksGloss(SHKS.id, s));
return;
}
var cf = typeof cfg === "function" ? cfg() : { mode: "off" };
if (cf.mode === "off" || typeof llmTarget !== "function" || !(typeof aiBought !== "function" || aiBought())) {
show("(The city's AI is not reachable just now.)");
return;
}
SHKS.busy = true;
shksControls();
var msgs = [{ role: "system", content: "You explain Shakespeare to a modern reader of any age. Reply with one to three short, plain English sentences saying what the speaker means and why it matters in the story. Do not quote the speech back. No preamble." },
{ role: "user", content: "Play: " + (shksT() ? shksT().t : "") + ". What is happening: " + (C ? C[1] : "") + "\nSpeaker: " + s.who + "\nSpeech: " + s.t.join(" ").slice(0, 1400) }];
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
ready.then(function () { var T = llmTarget(cf); return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 0.3, max_tokens: 220, messages: msgs })) }); })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) { var c = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || ""; SHKS.plain[key] = c.trim().slice(0, 600) || "(No answer came.)"; })
.catch(function () { SHKS.plain[key] = "(The city's AI did not answer just now. Try again in a moment.)"; })
.then(function () { SHKS.busy = false; if (SHKS.on)
shksControls(); show(SHKS.plain[key]); });
},
function (L, o) {
var r = L._shkRole || "noble", h = shksHash((L._shkSeed || "") + r), dye = SHK_DYE[h % SHK_DYE.length], dye2 = SHK_DYE[(h >>> 4) % SHK_DYE.length], home = SHK_HOME[(h >>> 3) % SHK_HOME.length];
var top = L.top != null && L.top !== 0xE8E0D0 ? L.top : dye, lay = L.layerColor != null ? L.layerColor : dye2, bot = L.bottom != null ? L.bottom : 0x1E1A18;
var f = o.f;
switch (r) {
case "ghost": return ozwFromLook(L, o, { coat: "military", coatCol: 0xA8B0B8, trou: 0x9AA2AA, stock: 0xB8C0C8, back: "cloak", backColor: 0x8A929A });
case "witch": return ozwFromLook(L, { f: 1 }, { dress: 0x24221E, skirt: 0x24221E, sl: "long", len: "ankle", flare: 0.2, apron: 0x3A342A, pelerine: 0x2E2A24, trim: 0x3A3430, shoes: 0x1A1410 });
case "fairy": return f ? ozwFromLook(L, o, { dress: 0x6A9A5A, skirt: 0x8ABA6A, sl: "puff", len: "calf", flare: 0.18, stuff: "satin", trim: 0xE8E0B0, sash: 0xD8A8C8, stock: 0xD8E8C8 }) :
ozwFromLook(L, o, { coat: "jacket", coatCol: 0x4A7A3A, coatTrim: "gold", vest: 0x8ABA6A, trou: 0x3A5A2A, breeches: true, stock: 0x7A9A5A, collar: "low", tie: "soft", tieCol: 0xC8D8A0 });
case "fool": return ozwFromLook(L, o, { coat: "jacket", coatCol: 0xC8A020, vest: 0x2A6A3A, trou: 0x8A1A2A, breeches: true, stock: 0x2A6A3A, collar: "low", tie: "soft", tieCol: 0xC83A2A });
case "friar": return f ? ozwFromLook(L, o, { dress: 0x2A2420, skirt: 0x2A2420, sl: "long", len: "ankle", pelerine: 0xE8E4DC, trim: 0xE8E4DC }) :
ozwFromLook(L, o, { coat: "long", coatCol: /doctor|soothsayer/.test(L._shkName || "") ? 0x2A2420 : /cardinal/.test(L._shkName || "") ? 0x8A1A1A : 0x5A4430, coatTrim: "plain", trou: 0x3A2E22, breeches: false, collar: "low", tie: "soft", tieCol: 0x3A2E22 });
case "king": return f ? ozwFromLook(L, o, { dress: top, skirt: top, sl: "long", len: "ankle", flare: 0.24, stuff: "velvet", trim: 0xE8C860, pelerine: lay, back: "cloak", backColor: lay }) :
ozwFromLook(L, o, { coat: "long", coatCol: top, coatStuff: "velvet", coatTrim: "gold", vest: 0xE8C860, vestStuff: "satin", trou: bot, trouStuff: "velvet", breeches: true, stock: 0xF0E8D8, collar: "high", tie: "soft", tieCol: 0xF4F0E6, back: "cloak", backColor: lay });
case "soldier": return ozwFromLook(L, o, { coat: "military", coatCol: top, trou: bot, breeches: true, stock: 0x5A4A3A, back: /captain|general|othello|macbeth|macduff|lieutenant/.test(L._shkName || "") ? "cloak" : null, backColor: lay });
case "common": return f ? ozwFromLook(L, o, { dress: home, skirt: ozMix(home, 0x000000, 0.15), sl: "elbow", len: "ankle", apron: 0xE8E0D0, trim: 0xD8D0C0 }) :
ozwFromLook(L, o, { shirt: 0xE8E0CC, vest: home, trou: ozMix(home, 0x000000, 0.25), breeches: true, stock: 0x8A7A64, collar: "low", tie: "soft", tieCol: 0x6A5A44 });
default: return f ? ozwFromLook(L, o, { dress: top, skirt: top, sl: "long", len: "ankle", flare: 0.22, stuff: "velvet", trim: 0xE8D8A0, pelerine: L.back ? lay : undefined }) :
ozwFromLook(L, o, { coat: "jacket", coatCol: top, coatStuff: "velvet", coatTrim: "gold", vest: lay, trou: lay, trouStuff: "velvet", breeches: true, stock: 0xE8E0D0, collar: "high", tie: "soft", tieCol: 0xF4F0E6, back: L.back ? "cloak" : null, backColor: lay });
}
},
function (add, E) {
var L = (E && E.spec && E.spec.look) || {}, r = L._shkRole || "noble", f = L.sex === "f", nm = L._shkName || "";
var gold = wdrMat(0xE0B840, { r: 0.3, m: 0.85 });
if (/king|noble/.test(r) && !/witch/.test(nm)) {
var ruff = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.034, 8, 28), wdrMat(0xF8F6F0, { r: 0.9 }));
ruff.rotation.x = Math.PI / 2;
ruff.scale.set(1, 1, 0.55);
add("neck_01", [0, 0.035, 0.0], ruff);
}
var g = new THREE.Group();
if (r === "king" && !/caesar|antony|octavius/.test(nm)) {
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.108, 0.06, 20, 1, true), gold);
band.material.side = THREE.DoubleSide;
g.add(band);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, pt = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.06, 6), gold);
pt.position.set(Math.cos(a) * 0.11, 0.055, Math.sin(a) * 0.11);
g.add(pt);
var gem = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), wdrMat([0xC81A2A, 0x1A6AC8, 0x1AA84A][i % 3], { r: 0.2, m: 0.3 }));
gem.position.set(Math.cos(a) * 0.113, 0.0, Math.sin(a) * 0.113);
g.add(gem);
}
if (!f) {
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), wdrMat(0x8A1A2A, { r: 0.8 }));
cap.position.y = 0.01;
g.add(cap);
}
add("Head", [0, 0.14, -0.01], g);
return;
}
if (r === "king" && /caesar|antony|octavius/.test(nm)) {
for (var l = 0; l < 14; l++) {
var a2 = l / 14 * Math.PI * 1.6 + Math.PI * 1.2, lf = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 4), wdrMat(0xC8A030, { r: 0.35, m: 0.7 }));
lf.scale.set(1.6, 0.6, 0.7);
lf.position.set(Math.cos(a2) * 0.105, 0, Math.sin(a2) * 0.105);
g.add(lf);
}
add("Head", [0, 0.1, -0.01], g);
return;
}
if (r === "noble" && f && /queen|princess|duchess|countess|lady|olivia|portia|hermione|cleopatra/.test(nm + " " + (L._shkDesc || ""))) {
var co = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.008, 6, 24, Math.PI), gold);
co.rotation.x = -Math.PI / 2 + 0.25;
g.add(co);
var pk = new THREE.Mesh(new THREE.OctahedronGeometry(0.02, 0), wdrMat(0xF0F0FF, { r: 0.1, m: 0.4 }));
pk.position.set(0, 0.02, 0.1);
g.add(pk);
add("Head", [0, 0.11, 0], g);
return;
}
if (r === "noble" && !f && shksHash(nm) % 2 === 0) {
var bon = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.035, 22), wdrMat(0x1A1A1A, { r: 0.85 }));
g.add(bon);
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.05, 18), wdrMat(0x1A1A1A, { r: 0.85 }));
cr.position.y = 0.03;
g.add(cr);
var fe = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.16, 6), wdrMat(0xF4F0E8, { r: 0.9 }));
fe.position.set(0.09, 0.08, -0.02);
fe.rotation.z = -0.7;
g.add(fe);
g.rotation.z = 0.12;
add("Head", [0, 0.15, 0], g);
return;
}
if (r === "soldier" && !/othello|iago|cassio|dogberry|verges/.test(nm)) {
var hm = wdrMat(0x9A9CA0, { r: 0.35, m: 0.8 });
var dome = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), hm);
g.add(dome);
var brim = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.016, 6, 24), hm);
brim.rotation.x = Math.PI / 2;
brim.scale.set(1, 1.25, 1);
g.add(brim);
var comb = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.012, 20, 1, false, 0, Math.PI), hm);
comb.rotation.z = Math.PI / 2;
comb.rotation.y = Math.PI / 2;
comb.position.y = 0.1;
comb.scale.set(1, 1, 0.6);
g.add(comb);
g.scale.setScalar(0.92);
add("Head", [0, 0.165, -0.015], g);
return;
}
if (r === "friar" || r === "witch") {
var hood = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 10, Math.PI * 0.15, Math.PI * 1.7, 0, Math.PI * 0.62), wdrMat(r === "witch" ? 0x24221E : 0x5A4430, { r: 0.95 }));
hood.material.side = THREE.DoubleSide;
hood.rotation.y = Math.PI / 2;
g.add(hood);
if (r === "friar" && /doctor|soothsayer/.test(nm)) {
g.remove(hood);
var dc = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 18), wdrMat(0x1A1A1A, { r: 0.9 }));
g.add(dc);
}
add("Head", [0, 0.07, -0.02], g);
return;
}
if (r === "fool" && typeof ozCostHat === "function") {
ozCostHat(add, 0xC83A2A, true);
return;
}
if (r === "fairy") {
for (var b = 0; b < 12; b++) {
var a3 = b / 12 * Math.PI * 2, fl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), wdrMat([0xF0E0F0, 0xE8C8E0, 0xF8F0B0][b % 3], { r: 0.8 }));
fl.position.set(Math.cos(a3) * 0.105, 0, Math.sin(a3) * 0.105);
g.add(fl);
}
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.008, 6, 24), wdrMat(0x4A7A3A, { r: 0.9 }));
ring.rotation.x = Math.PI / 2;
g.add(ring);
add("Head", [0, 0.1, 0], g);
return;
}
if (r === "common" && !f && shksHash(nm) % 3) {
var fc = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.04, 18), wdrMat(0x4A3E30, { r: 0.95 }));
fc.scale.z = 0.95;
g.add(fc);
add("Head", [0, 0.15, 0], g);
return;
}
if (r === "common" && f) {
var coif = new THREE.Mesh(new THREE.SphereGeometry(0.125, 14, 8, Math.PI * 0.2, Math.PI * 1.6, 0, Math.PI * 0.55), wdrMat(0xF0ECE4, { r: 0.95 }));
coif.material.side = THREE.DoubleSide;
coif.rotation.y = Math.PI / 2;
g.add(coif);
add("Head", [0, 0.09, -0.015], g);
return;
}
},
function () {
if (SHKS.wearOk !== undefined)
return SHKS.wearOk;
SHKS.wearOk = false;
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined" || typeof ozwFromLook !== "function" || typeof wdrMat !== "function")
return false;
WDR_COST.oz_shk = { rb: 1, look: { hat: "none", role: "" }, ozKey: "shk", props: function (add, c, E) { try {
shkHeadwear(add, E);
}
catch (e) { } } };
OZ_WEAR.oz_shk = function (L, o) { return shkWear(L, o); };
SHKS.wearOk = true;
return true;
},
function (G, x, z, h) {
h = h || 2.2;
shkpC(G, 0.05, 0.06, h, "wood", 0x4A3420, x, 0, z, 8);
var b = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.22, 8, 1, true), shkS("lead", 0x3A3A3A));
b.rotation.x = Math.PI;
b.position.set(x, h + 0.05, z);
G.add(b);
var f = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 8), shkpGlow(0xFF9A30));
f.position.set(x, h + 0.3, z);
G.add(f);
},
function (G, x, z, col, h) {
h = h || 3.4;
shkpC(G, 0.04, 0.04, h, "wood", 0x5A4026, x, 0, z, 6);
var cl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
cl.position.set(x, h - 0.95, z + 0.03);
G.add(cl);
var tr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.12), new THREE.MeshLambertMaterial({ color: 0xE0B840, side: THREE.DoubleSide }));
tr.position.set(x, h - 1.72, z + 0.035);
G.add(tr);
shkpB(G, 1.0, 0.04, 0.04, "wood", 0x5A4026, x, h - 0.16, z);
},
function (G, x, z, s, col, fl) {
var b = new THREE.Mesh(new THREE.SphereGeometry(s, 12, 8), shkS("foliage", col || 0x3E6A2E));
b.scale.y = 0.75;
b.position.set(x, s * 0.6, z);
G.add(b);
if (fl)
for (var i = 0; i < 7; i++) {
var a = i * 0.9, f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), shkpGlow(fl));
f.position.set(x + Math.cos(a) * s * 0.85, s * 0.7 + Math.sin(i * 1.7) * s * 0.3, z + Math.sin(a) * s * 0.85);
G.add(f);
}
},
function (G, x, z, ry, col, tall) {
var c = new THREE.Group();
shkpB(c, 0.55, 0.08, 0.5, "wood", col, 0, 0.45, 0);
[-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { shkpB(c, 0.06, 0.45, 0.06, "wood", col, a * 0.22, 0, b * 0.2); }); });
shkpB(c, 0.55, tall ? 1.3 : 0.6, 0.07, "wood", col, 0, 0.53, -0.22);
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
G.add(c);
return c;
},
function (G, x, z, len, laid) {
shkpB(G, len, 0.08, 1.1, "wood", 0x6A4A2A, x, 0.74, z);
[-1, 1].forEach(function (a) { shkpB(G, 0.12, 0.74, 0.9, "wood", 0x5A3E22, x + a * (len / 2 - 0.4), 0, z); });
if (laid) {
var cl = new THREE.Mesh(new THREE.BoxGeometry(len + 0.1, 0.02, 1.2), new THREE.MeshLambertMaterial({ color: 0xF2ECDC }));
cl.position.set(x, 0.83, z);
G.add(cl);
for (var i = 0; i < Math.floor(len / 0.9); i++) {
var px = x - len / 2 + 0.5 + i * 0.9;
[-0.32, 0.32].forEach(function (zz) {
var pl = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.02, 14), shkS("lead", 0xB8B8B0));
pl.position.set(px, 0.85, z + zz);
G.add(pl);
var gb = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.02, 0.14, 8), shkS("lead", 0xD8B048));
gb.position.set(px + 0.18, 0.92, z + zz * 0.7);
G.add(gb);
});
if (i % 2 === 0)
shkpCandle(G, px + 0.45, 0.84, z);
else {
var fr = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), shkpGlow([0xB83A2A, 0xD8A040, 0x7A9A3A][i % 3]));
fr.scale.y = 0.6;
fr.position.set(px + 0.45, 0.9, z);
G.add(fr);
}
}
var pig = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), new THREE.MeshLambertMaterial({ color: 0xA8602A }));
pig.scale.set(1.6, 0.7, 0.8);
pig.position.set(x, 1.0, z);
G.add(pig);
}
},
function (G, x, z, col) {
var t = new THREE.Mesh(new THREE.ConeGeometry(2.2, 3.2, 10, 1, true), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
t.position.set(x, 1.6, z);
G.add(t);
shkpC(G, 0.05, 0.05, 3.6, "wood", 0x5A4026, x, 0, z, 6);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.35), new THREE.MeshLambertMaterial({ color: 0xC81A2A, side: THREE.DoubleSide }));
fl.position.set(x + 0.3, 3.45, z);
G.add(fl);
},
function (G, x, z, big) {
for (var i = 0; i < 6; i++) {
var lg = shkpC(G, 0.06, 0.06, 0.9, "wood", 0x4A3420, x, 0.05, z, 6);
lg.rotation.z = 1.2;
lg.rotation.y = i;
lg.position.y = 0.1;
}
var f = new THREE.Mesh(new THREE.ConeGeometry(big ? 0.5 : 0.3, big ? 1.1 : 0.7, 8), shkpGlow(0xFF8A20));
f.position.set(x, big ? 0.6 : 0.4, z);
G.add(f);
var f2 = new THREE.Mesh(new THREE.ConeGeometry(big ? 0.3 : 0.18, big ? 0.8 : 0.5, 8), shkpGlow(0xFFD060));
f2.position.set(x, big ? 0.5 : 0.32, z);
G.add(f2);
},
function (G, kind, col, heading) {
var lite = ctLite(), h = String(heading || "").toLowerCase();
switch (kind) {
case "feast":
shkpTable(G, 0, -5.2, lite ? 5 : 7, true);
for (var i = -3; i <= 3; i += lite ? 2 : 1)
shkpB(G, 0.9, 0.45, 0.35, "wood", 0x5A3E22, i * 0.95, 0, -4.25);
shkpChair(G, -3.9, -5.6, 0.4, 0x6A3A1E, true);
shkpChair(G, 3.9, -5.6, -0.4, 0x6A3A1E, true);
[-6.5, 6.5].forEach(function (x) { shkpBanner(G, x, -7, col); shkpTorch(G, x * 0.75, -6.8); });
if (!lite) {
shkpB(G, 9, 0.02, 2.6, "plaster", 0x7A1A2A, 0, 0, -1.8);
[-5.5, 5.5].forEach(function (x) { var cs = shkpC(G, 0.05, 0.05, 1.4, "lead", 0xC8A040, x, 0, -3.6, 8); shkpCandle(G, x, 1.4, -3.6); });
}
break;
case "throne":
shkpB(G, 4.2, 0.25, 3, "stone", 0xB8B0A0, 0, 0, -6.4);
shkpB(G, 3, 0.25, 2.2, "stone", 0xC8C0B0, 0, 0.25, -6.6);
var th = shkpChair(G, 0, -6.9, 0, 0x8A6A20, true);
th.position.y = 0.5;
th.scale.setScalar(1.35);
var cu = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.55), new THREE.MeshLambertMaterial({ color: 0x8A1A2A }));
cu.position.set(0, 0.5 + 0.72, -6.85);
G.add(cu);
var cp = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.6), new THREE.MeshLambertMaterial({ color: col }));
cp.position.set(0, 4.1, -6.8);
G.add(cp);
[-1.2, 1.2].forEach(function (x) { shkpC(G, 0.06, 0.07, 3.6, "wood", 0xC8A040, x, 0.5, -6.1, 8); });
var vl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), new THREE.MeshLambertMaterial({ color: 0xC8A040, side: THREE.DoubleSide }));
vl.position.set(0, 3.85, -6.0);
G.add(vl);
var bk = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.6), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
bk.position.set(0, 2.3, -7.58);
G.add(bk);
shkpB(G, 1.2, 0.02, 7, "plaster", 0x8A1A2A, 0, 0, -2.6);
[-4.5, 4.5].forEach(function (x) { shkpBanner(G, x, -7, col, 4); shkpTorch(G, x * 0.6, -5.2); });
break;
case "church":
shkpB(G, 3, 0.3, 1.4, "stone", 0xC8C0B0, 0, 0, -8);
shkpB(G, 2.2, 1.0, 0.9, "marble", 0xE8E4DC, 0, 0.3, -8.2);
var alc = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.5), new THREE.MeshLambertMaterial({ color: 0xF2ECDC }));
alc.position.set(0, 1.0, -7.74);
G.add(alc);
shkpB(G, 0.08, 1.1, 0.08, "lead", 0xC8A040, 0, 1.3, -8.3);
shkpB(G, 0.6, 0.08, 0.08, "lead", 0xC8A040, 0, 2.0, -8.3);
shkpCandle(G, -0.8, 1.3, -8.2);
shkpCandle(G, 0.8, 1.3, -8.2);
for (var pw2 = 0; pw2 < (ctLite() ? 3 : 5); pw2++)
[-1, 1].forEach(function (sd) { shkpB(G, 3.2, 0.45, 0.45, "wood", 0x5A3A1E, sd * 6.5, 0, 6 + pw2 * 1.8); shkpB(G, 3.2, 0.5, 0.08, "wood", 0x5A3A1E, sd * 6.5, 0.45, 6.22 + pw2 * 1.8); });
[-3, 3].forEach(function (x) { shkpC(G, 0.06, 0.08, 1.6, "lead", 0x8A7A50, x, 0, -6.5, 8); shkpCandle(G, x, 1.6, -6.5); });
break;
case "cell":
shkpTable(G, -2.8, -5.5, 2.4, false);
shkpChair(G, -2.8, -4.7, Math.PI, 0x5A3E22, false);
for (var b = 0; b < 5; b++)
shkpB(G, 0.22, 0.06 + b * 0.01, 0.32, "plaster", [0x6A2A1A, 0x2A3A5A, 0x4A3A1A, 0x2A4A2A, 0x5A1A2A][b], -3.4 + b * 0.05, 0.82 + b * 0.065, -5.5, b * 0.2);
shkpCandle(G, -2.2, 0.82, -5.4);
shkpCandle(G, -1.9, 0.82, -5.7);
for (var j = 0; j < 6; j++) {
var jr = shkpC(G, 0.09, 0.08, 0.22, "plaster", [0x8A6A4A, 0x6A7A5A, 0xA88A6A][j % 3], -3.6 + j * 0.32, 0.82, -5.85, 10);
}
shkpB(G, 0.12, 2.2, 0.12, "wood", 0x4A3420, 2.8, 0, -6.2);
shkpB(G, 1.1, 0.12, 0.12, "wood", 0x4A3420, 2.8, 1.6, -6.2);
for (var hb = 0; hb < 5; hb++)
shkpBush(G, 2 + hb * 0.5, -4.8 + hb * 0.2, 0.3, 0x4A7A3A, [0xE8E0F0, 0xC8A8E0, 0xF0D860][hb % 3]);
break;
case "chamber":
var bed = new THREE.Group();
shkpB(bed, 2.2, 0.5, 1.7, "wood", 0x5A3A1E, 0, 0, 0);
var qu = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.14, 1.6), new THREE.MeshLambertMaterial({ color: col }));
qu.position.set(0, 0.57, 0);
bed.add(qu);
var pw = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 1.4), new THREE.MeshLambertMaterial({ color: 0xF2ECDC }));
pw.position.set(-0.85, 0.68, 0);
bed.add(pw);
[[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (q) { shkpB(bed, 0.1, 2.4, 0.1, "wood", 0x4A2A14, q[0] * 1.05, 0, q[1] * 0.8); });
shkpB(bed, 2.3, 0.12, 1.8, "wood", 0x4A2A14, 0, 2.4, 0);
var cur = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
cur.position.set(0, 1.2, -0.85);
bed.add(cur);
bed.rotation.y = Math.PI / 2;
bed.position.set(0, 0, -6.6);
G.add(bed);
shkpB(G, 1.2, 0.9, 0.6, "wood", 0x5A3A1E, 2.6, 0, -7.2);
shkpCandle(G, 2.4, 0.9, -7.1);
shkpChair(G, 1.6, -5.4, -0.6, 0x5A3A1E, false);
shkpB(G, 3, 0.02, 2.2, "plaster", 0x6A3A2A, 0, 0, -2.4);
break;
case "garden":
shkpTree(G, -5.2, -6.4, 7.5, 3);
shkpTree(G, 5.6, -6.8, 7, 9);
for (var r = 0; r < (lite ? 3 : 6); r++)
shkpBush(G, -3.6 + r * 1.45, -7.6, 0.55, 0x2E5A2A, [0xC82A3A, 0xF0E8F0, 0xE87AA0][r % 3]);
var bench = new THREE.Group();
shkpB(bench, 1.8, 0.1, 0.5, "stone", 0xC8C0B0, 0, 0.42, 0);
shkpB(bench, 0.3, 0.42, 0.4, "stone", 0xB8B0A0, -0.7, 0, 0);
shkpB(bench, 0.3, 0.42, 0.4, "stone", 0xB8B0A0, 0.7, 0, 0);
bench.position.set(3.4, 0, -4.6);
bench.rotation.y = -0.4;
G.add(bench);
if (/balcony|orchard|capulet/.test(h) && !SHKS.globe) {
shkpB(G, 5, 5.2, 0.5, "stone", 0xD8C8A8, 0, 0, -9.2);
shkpB(G, 2.2, 0.2, 1.1, "stone", 0xC8B898, 0, 3.2, -8.6);
for (var bl = 0; bl < 9; bl++)
shkpC(G, 0.05, 0.06, 0.7, "stone", 0xE0D4B8, -1 + bl * 0.25, 3.4, -8.15, 6);
shkpB(G, 2.2, 0.08, 0.12, "stone", 0xE0D4B8, 0, 4.1, -8.12);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.7), shkpGlow(0xF8D890));
win.position.set(0, 4.4, -8.94);
G.add(win);
SHKS.balcony = true;
}
break;
case "tomb":
var tb = shkpB(G, 2.4, 1.0, 1.1, "marble", 0xD8D4CC, 0, 0, -5.6);
var lid = shkpB(G, 2.6, 0.12, 1.3, "marble", 0xE8E4DC, 0, 1.0, -5.6);
var eff = new THREE.Mesh(THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(0.2, 1.3, 4, 8) : new THREE.CylinderGeometry(0.2, 0.2, 1.6, 8), shkS("marble", 0xF0ECE4));
eff.rotation.z = Math.PI / 2;
eff.position.set(0, 1.32, -5.6);
G.add(eff);
[-1.6, 1.6].forEach(function (x) { shkpC(G, 0.06, 0.08, 1.2, "lead", 0x8A7A50, x, 0, -5.6, 8); shkpCandle(G, x, 1.2, -5.6); });
for (var gs = 0; gs < (lite ? 3 : 6); gs++) {
var gx = -6 + gs * 2.4;
if (Math.abs(gx) < 2)
continue;
var st = shkpB(G, 0.7, 1.0, 0.16, "stone", 0x8A8478, gx, 0, -7.6 - (gs % 2) * 0.8);
st.rotation.z = (gs % 3 - 1) * 0.05;
}
if (/church|grave/.test(h)) {
var ch = new THREE.Group();
shkpB(ch, 12, 8, 7, "stone", 0x8A8478, 0, 0, 0);
var crf = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 4.6, 3.6, 4, 1), shkS("slate", 0x4A4A52));
crf.rotation.y = Math.PI / 4;
crf.scale.set(1.85, 1, 1.05);
crf.position.set(0, 9.8, 0);
ch.add(crf);
shkpB(ch, 3, 15, 3, "stone", 0x8A8478, -4.5, 0, 4.6);
var csp = new THREE.Mesh(new THREE.ConeGeometry(2, 6, 4), shkS("slate", 0x4A4A52));
csp.rotation.y = Math.PI / 4;
csp.position.set(-4.5, 18, 4.6);
ch.add(csp);
for (var cw = 0; cw < 3; cw++) {
var lw = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.8), shkpGlow(0xC8A050));
lw.position.set(-1 + cw * 2.8, 3.6, 3.52);
ch.add(lw);
}
var cd2 = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.6), shkS("wood", 0x3A2614));
cd2.position.set(-4.5, 1.3, 6.12);
ch.add(cd2);
ch.position.set(3, 0, -16);
G.add(ch);
shkpB(G, 26, 1.1, 0.5, "stone", 0x7A766C, 0, 0, -10.5);
for (var yt = 0; yt < 3; yt++)
shkpPine(G, -9 + yt * 2.2, -12, 8, 0x1E3A24);
var pit = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 2.0), shkS("earth", 0x3A2A1A));
pit.position.set(-3.4, 0.02, -4.4);
G.add(pit);
shkpRock(G, -2.6, -4.4, 0.4, 0x5A4A3A);
}
break;
case "cave":
for (var k = 0; k < 11; k++) {
var a = Math.PI * (0.08 + k * 0.084);
shkpRock(G, Math.cos(a) * -10, -Math.sin(a) * 6 - 3, 1.0 + (k % 3) * 0.45, 0x4A4640);
}
var cd = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 10, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65), shkS("lead", 0x1E1E1E));
cd.material.side = THREE.DoubleSide;
cd.scale.setScalar(0.7);
cd.position.set(0, 0.75, -5.6);
G.add(cd);
var br = new THREE.Mesh(new THREE.CircleGeometry(0.75, 18), shkpGlow(0x6AC84A));
br.rotation.x = -Math.PI / 2;
br.scale.setScalar(0.7);
br.position.set(0, 0.94, -5.6);
G.add(br);
shkpFire(G, 0, -5.6, false);
break;
case "camp":
shkpTent(G, -5.5, -7, 0xE8DCC0);
shkpTent(G, 5.8, -7.5, 0xD8C8A8);
if (!lite)
shkpTent(G, 0.4, -9.5, 0xC8B898);
shkpFire(G, -2.4, -4.6);
[-7, 7].forEach(function (x) { shkpBanner(G, x, -4.8, col, 4); });
var rack = new THREE.Group();
shkpB(rack, 1.6, 0.08, 0.08, "wood", 0x5A4026, 0, 1.2, 0);
for (var sp = 0; sp < 5; sp++) {
shkpC(rack, 0.02, 0.02, 2.2, "wood", 0x6A4A2A, -0.6 + sp * 0.3, 0, 0, 5);
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 4), shkS("lead", 0xB8B8B8));
tip.position.set(-0.6 + sp * 0.3, 2.3, 0);
rack.add(tip);
}
rack.position.set(3, 0, -4.6);
G.add(rack);
break;
case "walls":
for (var m = -4; m <= 4; m++) {
shkpB(G, 1.9, 2.6, 1.0, "stone", 0x8A8478, m * 2, 0, -6.5);
if (m % 2 === 0)
shkpB(G, 0.9, 0.6, 1.0, "stone", 0x8A8478, m * 2, 2.6, -6.5);
}
[-5, 5].forEach(function (x) { shkpTorch(G, x, -5.6, 2.4); });
shkpB(G, 18, 0.05, 6, "stone", 0x6A6458, 0, 0, -3.5);
break;
case "heath":
for (var q = 0; q < (lite ? 4 : 8); q++)
shkpRock(G, -7 + q * 2 - (q % 2) * 0.6, -6.5 - (q % 3) * 1.4, 0.5 + (q % 3) * 0.35, 0x6A665A);
for (var gh = 0; gh < (lite ? 5 : 10); gh++)
shkpBush(G, -8 + gh * 1.7, -4.6 - (gh % 4) * 1.2, 0.35, 0x5A5A3A, /heath/.test(h) ? 0x9A6A9A : null);
var dt = new THREE.Group();
shkpC(dt, 0.12, 0.22, 4.2, "bark", 0x3A3024, 0, 0, 0, 7);
[0.9, -0.7, 1.4].forEach(function (a, i) { var lb = shkpC(dt, 0.04, 0.08, 1.6, "bark", 0x3A3024, 0, 2.2 + i * 0.6, 0, 6); lb.rotation.z = a; });
dt.position.set(5.2, 0, -7.4);
G.add(dt);
if (/hovel/.test(h)) {
shkpB(G, 3, 1.8, 2.4, "wood", 0x5A4A36, -4.6, 0, -7);
var rf = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.3, 4), shkS("thatch", 0x9A8A5A));
rf.rotation.y = Math.PI / 4;
rf.position.set(-4.6, 2.45, -7);
G.add(rf);
}
break;
case "wood":
for (var w = 0; w < (lite ? 4 : 7); w++)
shkpTree(G, -8 + w * 2.7, -7.2 - (w % 2) * 2.2, 6 + (w % 3) * 1.6, w * 7 + 1);
for (var lg2 = 0; lg2 < 3; lg2++) {
var lg3 = shkpC(G, 0.25, 0.25, 2.4, "bark", 0x5A4632, -4 + lg2 * 4, 0.2, -4.8, 10);
lg3.rotation.z = Math.PI / 2;
lg3.rotation.y = lg2;
}
for (var fb = 0; fb < (lite ? 3 : 6); fb++)
shkpBush(G, -6 + fb * 2.4, -5.4, 0.5, 0x3E6A2E, fb % 2 ? 0xF0E8F0 : 0xE8C850);
if (/shore|coast|sea|island/.test(h))
for (var rk = 0; rk < 5; rk++)
shkpRock(G, -6 + rk * 3, -9, 0.9, 0xA89878);
break;
case "ship":
shkpB(G, 12, 0.3, 6, "wood", 0x6A4A2A, 0, 0, -5.5);
for (var rl = -5; rl <= 5; rl++)
shkpC(G, 0.05, 0.05, 1, "wood", 0x5A3E22, rl, 0.3, -2.6, 6);
shkpB(G, 11, 0.1, 0.12, "wood", 0x5A3E22, 0, 1.3, -2.6);
shkpC(G, 0.18, 0.22, 9, "wood", 0x5A3E22, 0, 0.3, -6);
var sail = new THREE.Mesh(new THREE.PlaneGeometry(5, 4, 6, 4), new THREE.MeshLambertMaterial({ color: 0xE8E0C8, side: THREE.DoubleSide }));
sail.position.set(0, 5.8, -5.8);
G.add(sail);
shkpB(G, 5.6, 0.12, 0.12, "wood", 0x5A3E22, 0, 7.9, -5.85);
shkpB(G, 1.6, 1.0, 1.0, "wood", 0x6A4A2A, -3.6, 0.3, -6.6);
shkpC(G, 0.35, 0.35, 0.9, "wood", 0x7A5A34, 3.4, 0.3, -6.4, 10);
break;
default:
shkpB(G, 2.4, 0.08, 1.2, "wood", 0x6A4A2A, -4.4, 0.9, -5.4);
[-5.4, -3.4].forEach(function (x) { shkpC(G, 0.05, 0.05, 2.4, "wood", 0x5A3E22, x, 0, -5.9, 6); shkpC(G, 0.05, 0.05, 0.9, "wood", 0x5A3E22, x, 0, -4.9, 6); });
var aw = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.4), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
aw.rotation.x = -1.1;
aw.position.set(-4.4, 2.3, -5.3);
G.add(aw);
for (var ap = 0; ap < 8; ap++) {
var fr2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), shkpGlow([0xC83A2A, 0xE8A030, 0x8AAA3A][ap % 3]));
fr2.position.set(-5.3 + ap * 0.26, 1.06, -5.4 + (ap % 2) * 0.25);
G.add(fr2);
}
for (var bb = 0; bb < 3; bb++)
shkpC(G, 0.32, 0.36, 0.85, "wood", 0x6A4A2A, 3.2 + bb * 0.75, 0, -5.6 + (bb % 2) * 0.5, 12);
var wl = new THREE.Group();
shkpC(wl, 0.8, 0.85, 0.8, "stone", 0x9A9488, 0, 0, 0, 16);
[-0.6, 0.6].forEach(function (x) { shkpB(wl, 0.1, 1.6, 0.1, "wood", 0x5A3E22, x, 0.8, 0); });
shkpB(wl, 1.4, 0.1, 0.1, "wood", 0x5A3E22, 0, 2.35, 0);
wl.position.set(5.6, 0, -7.4);
G.add(wl);
}
},
function (G, kind, h) {
var mat = { feast: ["paving", 0x8A7A64], church: ["paving", 0x9A9488], throne: ["marble", 0xD8D0C0], cell: ["stone", 0x7A7064], chamber: ["wood", 0x6A4A2E], tomb: /church|grave/.test(h) ? ["grass", 0x4A6A34] : ["stone", 0x6A665E],
cave: ["earth", 0x3A3228], camp: ["earth", 0x6A5A3A], walls: ["stone", 0x6A6458], heath: ["earth", 0x5A5A3A], wood: ["grass", 0x3E5A2A], garden: ["grass", 0x5A8A3A], ship: ["wood", 0x6A4A2A], street: ["paving", 0x9A8C74] }[kind] || ["grass", 0x5A7A3A];
var f = new THREE.Mesh(new THREE.CircleGeometry(kind === "ship" ? 30 : 140, 40), shkS(mat[0], mat[1]));
f.rotation.x = -Math.PI / 2;
f.position.y = 0.01;
G.add(f);
if (kind === "ship" || /shore|coast|sea\b|island|beach/.test(h)) {
var sea = new THREE.Mesh(new THREE.CircleGeometry(600, 48), new THREE.MeshLambertMaterial({ color: 0x2A5A7A }));
sea.rotation.x = -Math.PI / 2;
sea.position.y = kind === "ship" ? -1.2 : -0.05;
if (kind !== "ship")
sea.position.z = -40;
G.add(sea);
}
},
function (G, kind, col, h) {
var wallK = kind === "cell" || kind === "tomb" || kind === "church" ? "stone" : "plaster", wallC = kind === "cell" ? 0x8A8274 : kind === "tomb" || kind === "church" ? 0x9A9488 : kind === "throne" ? 0xD8CCB0 : 0xC8B898;
var W = 12, D0 = kind === "cell" || kind === "chamber" ? -8.5 : -10, D1 = 15, H = kind === "throne" || kind === "feast" || kind === "church" ? 8 : 5.5;
shkpB(G, W * 2, H, 0.6, wallK, wallC, 0, 0, D0 - 0.3);
shkpB(G, 0.6, H, D1 - D0, wallK, wallC, -W - 0.3, 0, (D0 + D1) / 2);
shkpB(G, 0.6, H, D1 - D0, wallK, wallC, W + 0.3, 0, (D0 + D1) / 2);
shkpB(G, W * 2, H, 0.6, wallK, wallC, 0, 0, D1 + 0.3);
[-1, 1].forEach(function (sd) {
var dw = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.8), shkpGlow(0x1A140E));
dw.position.set(sd * (W - 0.03), 1.4, -1.5);
dw.rotation.y = -sd * Math.PI / 2;
G.add(dw);
shkpB(G, 0.2, 3.1, 0.25, "wood", 0x4A2E18, sd * (W - 0.1), 0, -2.5);
shkpB(G, 0.2, 3.1, 0.25, "wood", 0x4A2E18, sd * (W - 0.1), 0, -0.5);
shkpB(G, 0.2, 0.25, 2.25, "wood", 0x4A2E18, sd * (W - 0.1), 2.9, -1.5);
});
shkpB(G, W * 2 + 1.2, 0.4, D1 - D0, "wood", 0x4A3420, 0, H, (D0 + D1) / 2);
for (var bz = D0 + 2; bz < D1; bz += 3)
shkpB(G, W * 2, 0.35, 0.3, "wood", 0x3A2814, 0, H - 0.35, bz);
if (kind !== "tomb" && kind !== "cell") {
shkpB(G, W * 2, 1.2, 0.08, "wood", 0x5A3A1E, 0, 0, D0 + 0.02);
shkpB(G, 0.08, 1.2, D1 - D0, "wood", 0x5A3A1E, -W + 0.02, 0, (D0 + D1) / 2);
shkpB(G, 0.08, 1.2, D1 - D0, "wood", 0x5A3A1E, W - 0.02, 0, (D0 + D1) / 2);
}
var wn = kind === "cell" ? 1 : 3;
for (var i = 0; i < wn; i++) {
var wx = wn === 1 ? 2.5 : (i - 1) * 6, w = new THREE.Mesh(new THREE.PlaneGeometry(1.3, kind === "cell" ? 1.1 : 2.6), shkpGlow(kind === "tomb" ? 0x8A9AB8 : kind === "church" ? 0xB8C8F0 : 0xF0E0B0));
w.position.set(wx, H * 0.55, D0 + 0.02);
G.add(w);
var ar = new THREE.Mesh(new THREE.CircleGeometry(0.65, 12, 0, Math.PI), w.material);
ar.position.set(wx, H * 0.55 + (kind === "cell" ? 0.55 : 1.3), D0 + 0.021);
G.add(ar);
shkpB(G, 0.08, kind === "cell" ? 1.1 : 2.6, 0.06, "lead", 0x2A2A2A, wx, H * 0.55 - (kind === "cell" ? 0.55 : 1.3), D0 + 0.05);
}
[-1, 1].forEach(function (sd) { for (var z2 = D0 + 3; z2 < D1 - 2; z2 += 6) {
var sw = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.4), shkpGlow(0xF0E0B0));
sw.position.set(sd * (W - 0.02), H * 0.55, z2);
sw.rotation.y = -sd * Math.PI / 2;
G.add(sw);
} });
if (kind === "feast" || kind === "throne" || kind === "chamber") {
[-W * 0.62, W * 0.62].forEach(function (tx) {
var tp = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.4), new THREE.MeshLambertMaterial({ color: col }));
tp.position.set(tx, H * 0.45, D0 + 0.03);
G.add(tp);
var bd = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.0), new THREE.MeshLambertMaterial({ color: ozMixSafe(col, 0xE0B840, 0.35) }));
bd.position.set(tx, H * 0.45, D0 + 0.035);
G.add(bd);
var ct = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.6), new THREE.MeshLambertMaterial({ color: col }));
ct.position.set(tx, H * 0.45, D0 + 0.04);
G.add(ct);
});
[-1, 1].forEach(function (sd) { for (var z3 = D0 + 6; z3 < D1 - 1; z3 += 6)
shkpTorchWall(G, sd * (W - 0.1), z3, sd); });
}
else
[-1, 1].forEach(function (sd) { shkpTorchWall(G, sd * (W - 0.1), D0 + 3, sd); });
if (kind === "tomb" || kind === "church") {
for (var ax = -W + 2; ax < W; ax += 4) {
shkpC(G, 0.35, 0.4, H, "stone", 0x8A867C, ax, 0, D0 + 1.2, 10);
}
}
},
function (G, col) {
var cols = [0xE0C8A0, 0xD8B088, 0xC8A078, 0xE8D4B0, 0xD0B898], roofs = [0xB0502A, 0x9A4628, 0xA85A34];
[-1, 1].forEach(function (sd) {
for (var i = 0; i < 6; i++) {
var z = -12 + i * 5, h = 6 + (i * 37 % 3) * 1.6, c = cols[(i + (sd > 0 ? 2 : 0)) % 5];
shkpB(G, 4, h, 4.6, "plaster", c, sd * 11, 0, z);
var rf = new THREE.Mesh(new THREE.ConeGeometry(3.4, 1.8, 4), shkS("tile", roofs[i % 3]));
rf.rotation.y = Math.PI / 4;
rf.scale.z = 1.2;
rf.position.set(sd * 11, h + 0.9, z);
G.add(rf);
var dr = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.1), shkS("wood", 0x4A2E18));
dr.position.set(sd * (9 - 0.01), 1.05, z);
dr.rotation.y = -sd * Math.PI / 2;
G.add(dr);
for (var f = 1; f < h / 2.6; f++) {
var wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.1), shkpGlow(0x3A3020));
wn.position.set(sd * (9 - 0.01), f * 2.6 + 0.6, z + (f % 2 ? 1.2 : -1.2));
wn.rotation.y = -sd * Math.PI / 2;
G.add(wn);
}
}
});
for (var j = 0; j < 5; j++) {
var bh = 7 + (j % 3) * 2;
shkpB(G, 4.4, bh, 4, "plaster", cols[j], -9 + j * 4.5, 0, -16);
var rf2 = new THREE.Mesh(new THREE.ConeGeometry(3.4, 1.8, 4), shkS("tile", roofs[j % 3]));
rf2.rotation.y = Math.PI / 4;
rf2.position.set(-9 + j * 4.5, bh + 0.9, -16);
G.add(rf2);
}
shkpB(G, 1.6, 14, 1.6, "stone", 0xC8B898, 6, 0, -22);
var sp = new THREE.Mesh(new THREE.ConeGeometry(1.3, 4, 4), shkS("tile", 0x9A4628));
sp.position.set(6, 16, -22);
sp.rotation.y = Math.PI / 4;
G.add(sp);
},
function (G, kind, h) {
var lite = ctLite(), n = lite ? 14 : 28;
for (var i = 0; i < (lite ? 6 : 10); i++) {
var a = i / (lite ? 6 : 10) * Math.PI * 2 + 0.3, r = 95 + (i % 3) * 12;
shkpHill(G, Math.cos(a) * r, Math.sin(a) * r, 30 + (i % 4) * 8, kind === "heath" ? 14 + (i % 3) * 6 : 9 + (i % 3) * 4, kind === "heath" ? 0x5A5A44 : 0x5A7A40);
}
if (kind === "ship")
return;
var dense = kind === "wood" || kind === "garden";
for (var t = 0; t < n; t++) {
var a2 = t / n * Math.PI * 2, rr = (dense ? 16 : 28) + (t * 53 % 7) * (dense ? 2.4 : 4), x = Math.cos(a2) * rr, z = Math.sin(a2) * rr - 2;
if (z > 4 && Math.abs(x) < 8)
continue;
if (kind === "heath") {
if (t % 3)
continue;
var dt = new THREE.Group();
shkpC(dt, 0.1, 0.18, 3.2, "bark", 0x3A3024, 0, 0, 0, 6);
var lb = shkpC(dt, 0.03, 0.06, 1.3, "bark", 0x3A3024, 0, 1.8, 0, 5);
lb.rotation.z = 0.9;
dt.position.set(x, 0, z);
G.add(dt);
}
else if (t % 2)
shkpPine(G, x, z, 7 + (t % 4) * 1.5, kind === "camp" ? 0x34502C : 0x2E4A2A);
else
shkpOak(G, x, z, 6 + (t % 3) * 1.6);
}
if (kind === "garden") {
[-1, 1].forEach(function (sd) { shkpB(G, 0.9, 2.2, 24, "foliage", 0x2E5A2A, sd * 12, 0, 1); });
shkpB(G, 24, 2.2, 0.9, "foliage", 0x2E5A2A, 0, 0, -11);
for (var u = -1; u <= 1; u += 2) {
var urn = shkpC(G, 0.3, 0.2, 0.8, "stone", 0xD8D0C0, u * 5, 0, -10, 10);
shkpBush(G, u * 5, -10, 0.35, 0x3E6A2E, 0xC82A3A);
urn.position.y += 0;
}
}
},
function (heading) {
if (SHKS.on && SHKS.globe && SHKS.set)
return shkpGlobeSet(heading);
if (!SHKS.on || !SHKS.set || !CTS.root)
return;
shkpClear();
SHKS.balcony = false;
var st = SHKS.set, C = CTS.W.ch[SHKS.k], text = String(heading || "") + " " + (C ? C[2] : ""), kind = heading ? shkpKind(heading) : "street";
if (kind === "street" && !/street|public|square|market|rialto|road|town|city/i.test(heading || ""))
kind = shkpKind((heading || "") + " " + (C ? C[2] + " " + C[0] : ""));
var G = new THREE.Group();
G.name = "shk-set";
G.position.set(st.x, st.y, st.z);
G.rotation.y = st.face;
var col = (CTS.T && CTS.T.col && CTS.T.col[0]) ? parseInt(String(CTS.T.col[0]).replace("#", ""), 16) : 0x7A1A2A, hl = text.toLowerCase();
try {
shkpFloor(G, kind, hl);
var inside = kind === "church" || kind === "feast" || kind === "throne" || kind === "cell" || kind === "chamber" || (kind === "tomb" && !/church|grave/.test(hl));
if (inside)
shkpRoom(G, kind, col, hl);
else if (kind === "street") {
shkpStreet(G, col);
shkpCountry(G, "street_far", hl);
}
else
shkpCountry(G, kind, hl);
shkpDress(G, kind, col, hl);
}
catch (e) {
if (window.console)
console.warn("[shk set]", e);
}
CTS.root.add(G);
SHKS.setG = G;
SHKS.setKind = kind;
},
function (heading) {
shkpClear();
SHKS.balcony = false;
var st = SHKS.set, T = shksT(), hl = String(heading || "").toLowerCase(), kind = heading ? shkpKind(heading) : "street";
var G = new THREE.Group();
G.name = "shk-set";
G.position.set(st.x, st.y, st.z);
var col = (T && T.col && T.col[0]) ? parseInt(String(T.col[0]).replace("#", ""), 16) : 0x7A1A2A;
try {
shkpDress(G, kind, col, hl);
}
catch (e) {
if (window.console)
console.warn("[shk set]", e);
}
var trg = /hamlet|macbeth|lear|othello|romeo|caesar|antony/.test(SHKS.globe.id || "");
try {
if (typeof shkgDress === "function")
shkgDress(G, kind, col, hl, trg);
}
catch (e) {
if (window.console)
console.warn("[shk stage dress]", e);
}
var off = [];
G.children.forEach(function (c) {
var p = c.position;
if (Math.abs(p.x) > 7.9 || p.z < -10.1 || p.z > 6.2)
off.push(c);
else if (kind === "cave" && c.geometry && c.geometry.type === "DodecahedronGeometry" && Math.abs(p.x) < 3.2)
off.push(c);
});
off.forEach(function (c) { G.remove(c); c.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); }); });
try {
if (typeof shkgArras === "function")
shkgArras(G, kind, trg);
}
catch (e) {
if (window.console)
console.warn("[shk stage dress]", e);
}
SHK.G.add(G);
SHKS.setG = G;
SHKS.setKind = kind;
},
function () {
if (!CTS.root)
return;
SHKS.hid = [];
var keep = function (o) { return o === SHKS.castG || o === SHKS.setG || (o.name === "shk-set") || (o.name === "shk-cast"); };
CTS.root.children.forEach(function (o) { if (!keep(o) && o.visible) {
o.visible = false;
SHKS.hid.push(o);
} });
var par = CTS.root.parent;
if (par)
par.children.forEach(function (o) { if (o !== CTS.root && o.visible) {
o.visible = false;
SHKS.hid.push(o);
} });
},
function (n) {
var now = Date.now(), out = [], d0 = new Date();
d0.setHours(0, 0, 0, 0);
for (var dd = 0; dd < 3 && out.length < n; dd++) {
var day = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + dd), dn = Math.round((day.getTime() - day.getTimezoneOffset() * 60000) / 86400000);
SHKG_TIMES.forEach(function (T, k) {
if (out.length >= n)
return;
var at = new Date(day.getFullYear(), day.getMonth(), day.getDate(), T[0], T[1]).getTime(), id = shkgPlayAt(dn * 4 + k);
if (!id || at + shkgRun(id) <= now)
return;
out.push({ q: dn * 4 + k, at: at, id: id, now: at <= now, end: at + shkgRun(id), today: dd === 0 });
});
}
return out;
},
function (then) {
if (!shkSigned() || Date.now() - SHKG.boxAt < 120000) {
if (then)
then();
return;
}
SHKG.boxAt = Date.now();
shkRpc("bard_box_state").then(function (o) {
if (o && o.ok !== false) {
SHKG.box = { open: o.open !== false, prices: o.prices || {}, ballad: o.ballad, mine: o.mine || [] };
if (Array.isArray(o.ballads) && o.ballads.length) {
var d = shkData();
if (!Array.isArray(d.ballads))
d.ballads = [];
o.ballads.forEach(function (k) { if (d.ballads.indexOf(k) < 0)
d.ballads.push(k); });
}
}
})
.catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
SHKG.box = { missing: true, open: true, prices: {} }; })
.then(function () { if (then)
then(); });
},
function (sel) {
var fns = {}, shows = shkgShows(6), mine = shkgMine(), B = SHKG.box || {};
var h = shkT("🎟️ The Globe: playbill and box office", "Four showings a day, a different play each time: the whole play, every word");
if (mine.length) {
h += shkHead("Your tickets");
mine.forEach(function (t, i) {
var T = CT_BY_ID[t.id];
if (!T)
return;
var S = shkgSeat(t.seat);
h += worldBtn("t" + i, "🪑 Take your seat: " + esc(T.t), shkgTime(t.at) + " · " + esc(S.n) + (t.no ? " · " + esc(t.no) : "") + (shkgResumeAt(t.id) ? " · goes on where you left" : ""));
fns["t" + i] = function () { shkgSit(t); };
});
}
if (B.open === false) {
h += "<div style='margin:8px 0;color:#E8C8A0'>The Keeper has closed the box office for now.</div>";
worldCard(h, fns);
return;
}
h += shkHead("Show times");
var pick = sel.at || shows[0].at;
h += "<div style='display:flex;flex-direction:column;gap:3px'>" + shows.map(function (S, i) {
var T = CT_BY_ID[S.id], on = S.at === pick;
fns["s" + i] = function () { shkgBoxDraw({ at: S.at, seat: sel.seat }); };
return "<div data-w='s" + i + "' role='button' tabindex='0' style='display:flex;justify-content:space-between;gap:8px;padding:5px 8px;border:1px solid " + (on ? "rgba(232,200,120,.9)" : "rgba(216,168,104,.35)") + ";border-radius:6px;cursor:pointer;font-size:12.5px;background:" + (on ? "rgba(120,80,30,.35)" : "transparent") + "'>" +
"<span><b>" + (S.today ? "" : "Tomorrow ") + shkgTime(S.at) + "</b>" + (S.now ? " <span style='color:#9FE0A8'>· on now, come in</span>" : "") + "</span><span>" + esc(T.t) + " <span style='opacity:.65'>· " + esc(shkgKind(S.id)) + " · " + shkgRunText(S.id) + "</span></span></div>";
}).join("") + "</div>";
var show = shows.filter(function (S) { return S.at === pick; })[0] || shows[0], T = CT_BY_ID[show.id];
h += shkHead("A ticket for " + esc(T.t) + ", " + (show.today ? "" : "tomorrow ") + shkgTime(show.at) + " to about " + shkgTime(show.end));
SHK_SEATS.forEach(function (S) {
var pr = shkgPrice(S.k), conf = sel.seat === S.k && sel.at === show.at;
h += worldBtn("b_" + S.k, (conf ? "Tap to confirm: " : "") + esc(S.n) + " · " + (pr > 0 ? gold(pr) : "free"), esc(S.d) + " (in 1600, " + S.old + ")");
fns["b_" + S.k] = function () { if (!conf)
return shkgBoxDraw({ at: show.at, seat: S.k }); shkgBuy(show, S.k); };
});
h += "<div style='font-size:11.5px;opacity:.75;margin-top:6px'>Tickets are paid in gold. Under eighteens stand in the yard free. Come in late and you join the play where it has reached; leave and come back before it ends and it goes on where you left it.</div>";
h += worldBtn("how", "🎭 How the Globe works", "The flag, the yard, the galleries, the players");
fns.how = function () { shkGlobeHow(); };
var F = SHK_FOLK.gatherer;
if (F) {
h += worldBtn("talk", "💬 Talk with " + esc(F.name.split(",")[0]), "");
fns.talk = function () { worldCard(null); wTalk({ name: F.name, persona: F.persona, greet: F.greet }); };
}
worldCard(h, fns);
},
function (show, seat) {
var T = CT_BY_ID[show.id], keep = function (o) {
var t = { at: show.at, id: show.id, seat: o && o.seat || seat, no: o && o.no || "" }, L = shkgTix();
if (!L.some(function (x) { return x.at === t.at; }))
L.push(t);
shkSave();
var h = shkT("🎟️ Your ticket", "Mistress Alice drops your money in her clay box") +
"<div style='margin:8px 0;line-height:1.5'><b>" + esc(T.t) + "</b>, " + shkgTime(show.at) + "<br>" + esc(shkgSeat(t.seat).n) + (t.no ? ", " + esc(t.no) : "") + "<br><span style='opacity:.8'>" + esc(o && o.say || "") + "</span></div>";
worldCard(h + worldBtn("sit", "🪑 Take your seat now", "The players begin when the trumpet sounds"), { sit: function () { shkgSit(t); } });
};
if (!shkSigned()) {
worldCard(shkT("🎟️ The box office", "Sign in first") + "<div style='margin:8px 0'>Sign in to buy a ticket.</div>", {});
return;
}
worldCard(shkT("🎟️ The box office", "…") + "<div style='margin:8px 0'>Mistress Alice counts your money…</div>", {});
shkRpc("bard_ticket_buy", { p_show: new Date(show.at).toISOString(), p_play: show.id, p_seat: seat }).then(function (o) {
if (o && o.ok) {
SHKG.boxAt = 0;
keep(o);
}
else
worldCard(shkT("🎟️ The box office", "No ticket") + "<div style='margin:8px 0'>" + esc(o && o.say || "The box office could not sell that seat.") + "</div>" + worldBtn("back", "◂ Back to the playbill", ""), { back: function () { shkgBoxCard({ at: show.at }); } });
}).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e))
keep({ say: "(The box office's till opens with the next update: today you go in free.)" });
else
worldCard(shkT("🎟️ The box office", "No ticket") + "<div style='margin:8px 0'>The box office could not be reached just now. Try again in a moment.</div>", {});
});
},
function () {
var P = shkToday();
worldCard(worldFacts("The Globe, Bankside, 1600", "In 1600 the day's play began at two o'clock: today, " + P[0] + " (" + P[2] + ")", SHK_HOUSE.slice(0, 8).map(function (h) { return [h[0], h[1]]; }), ["The flag on the hut tells all London what is on: black for a tragedy, white for a comedy, red for a history.", "The Globe's motto, painted over the door: Totus mundus agit histrionem, 'all the world plays the actor'.", "In 1600 you paid a penny at the door to stand in the yard, another to climb to the galleries, another for a cushion. A craftsman earned about a shilling (twelve pence) a day."]) + worldBtn("back", "◂ Back to the playbill", ""), { back: function () { shkgBoxCard(); } });
},
function (k, id) {
var cx = shkRoomX("globe"), r = 26, th = 3.6, h = shksHash(id || "x") % 100 / 100;
if (k === "yard")
return { x: cx + (h - 0.5) * 6, z: -9.5, floor: 0, eye: 1.66 };
if (k === "gentle") {
var a = -Math.PI / 2 + 0.66;
return { x: cx + Math.cos(a) * (r + 3.8), z: Math.sin(a) * (r + 3.8), floor: 0.72, eye: 0.72 + 1.95 };
}
if (k === "lords") {
var a2 = -Math.PI / 2 - 0.6;
return { x: cx + Math.cos(a2) * (r + 1.9), z: Math.sin(a2) * (r + 1.9), floor: 0.72 + th, eye: 0.72 + th + 1.6 };
}
var a3 = Math.PI / 2 - 0.42 - h * 0.2;
return { x: cx + Math.cos(a3) * (r + 3.8), z: Math.sin(a3) * (r + 3.8), floor: 0.72 + th, eye: 0.72 + th + 1.95 };
},
function (t) {
var T = CT_BY_ID[t.id];
if (!T)
return;
worldCard(null);
if (t.at + shkgRun(t.id) < Date.now()) {
worldCard(shkT("🎟️ That play is over", "The players have gone home. The playbill has the next showings."), {});
return;
}
if (t.at > Date.now() + SHKG_SLOT * 48) {
worldCard(shkT("🎟️ Too early", "That showing is not for a long while yet."), {});
return;
}
var P = shkgSeatPt(t.seat, t.id), cx = shkRoomX("globe"), yawTo = Math.atan2(-(cx - P.x), -(-22 - P.z));
shkMove(P.x, P.z, yawTo, "🪑 <b>Your seat</b> (" + esc(shkgSeat(t.seat).n) + ") for <b>" + esc(T.t) + "</b>.", function () { shkgWait(t); }, P.floor);
},
function (t) {
SHKG.wait = t;
var T = CT_BY_ID[t.id], left = t.at - Date.now();
if (left <= 0) {
shkgStart(t);
return;
}
var m = Math.ceil(left / 60000);
worldCard(shkT("🎺 " + esc(T.t), "The trumpet sounds at " + shkgTime(t.at) + ", in " + m + " minute" + (m === 1 ? "" : "s")) +
"<div style='margin:8px 0;font-size:12.5px;line-height:1.5'>The yard is filling; the orange-sellers are calling; up on the hut the flag is flying. Stay here and the play begins on its own when the trumpet sounds three times (" + esc(T.t) + " runs " + shkgRunText(t.id) + "). Or, this being a dream, the players will begin a performance just for you now.</div>" +
worldBtn("now", "🎺 Begin now, just for me", "The players are dressed and ready") + worldBtn("wait", "⏳ Wait for the trumpet", "Look round the playhouse; come back to your seat any time from the playbill"), { now: function () { shkgStart(t, true); }, wait: function () { worldCard(null); } });
},
function (t, fromTop, joinAt) {
var T = CT_BY_ID[t.id];
if (!T)
return;
if (typeof SHKS === "undefined")
return;
var at = fromTop ? 0 : shkgResumeAt(t.id), late = Date.now() - t.at, frac = late > 60000 && late < shkgRun(t.id) ? late / shkgRun(t.id) : 0;
if (at === 0 && frac > 0 && fromTop == null) {
worldCard(shkT("🎭 " + esc(T.t), "The play began at " + shkgTime(t.at) + ": they are about " + Math.round(frac * 100) + "% of the way through") +
worldBtn("join", "▶ Slip in where they have reached", "As a latecomer would, on tiptoe") + worldBtn("top", "⏮ From the beginning, just for me", "This being a dream, the players begin again for you"), { join: function () { shkgStart(t, false, frac); }, top: function () { shkgStart(t, true); } });
return;
}
if (at > 0 && fromTop == null) {
worldCard(shkT("🎭 " + esc(T.t), "You were part way through") + worldBtn("on", "▶ Go on where you left", null) + worldBtn("top", "⏮ From the beginning", null), { on: function () { shkgStart(t, false); }, top: function () { shkgStart(t, true); } });
return;
}
SHKG.wait = null;
if (SHKS.on)
shksStop();
var S0 = shkgSet(), P = shkgSeatPt(t.seat, t.id);
SHKS.on = true;
SHKS.id = t.id;
SHKS.k = 0;
SHKS.i = 0;
SHKS.list = [];
SHKS.paused = false;
SHKS.cast = {};
SHKS.clock = 0;
SHKS.shotN = 0;
SHKS.gen = (SHKS.gen || 0) + 1;
SHKS.lastWho = null;
SHKS.speaking = null;
SHKS.balcony = false;
var view = "seat";
try {
if (store.shkView === "film")
view = "film";
}
catch (e) { }
SHKS.globe = { T: T, id: t.id, t: t, set: S0.set, doors: S0.doors, balc: S0.balc, view: view, eye: { x: P.x, y: P.eye, z: P.z }, yaw: yaw, pitch: pitch, at: "", aboveNext: false };
try {
SHKS.voice = !!window.speechSynthesis;
}
catch (e) { }
try {
worldCard(null);
worldPrompt(null);
}
catch (e) { }
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
SHKS.set = S0.set;
SHKS.back = { x: SHK.base + P.x, y: P.floor + 1.72, z: P.z, yaw: yaw, pitch: pitch };
SHKS.castG = new THREE.Group();
SHKS.castG.name = "shk-cast";
SHK.G.add(SHKS.castG);
shkgHouse(true);
shksQuietGreeters();
var d = shksUi();
document.body.classList.add("shk-cine");
d.style.display = "block";
d.querySelector(".ttl").textContent = "🎭 " + T.t + " · the Globe, " + shkgTime(t.at) + " · " + shkgSeat(t.seat).n;
shksControls();
shksSub("", "", null, false);
shksCut("wide", null, 10);
shksCard(T.t, "The trumpet sounds three times from the hut. The yard falls quiet. The Lord Chamberlain's Men present " + T.t + ".", true);
shkgTrumpet();
var gen = SHKS.gen;
Promise.all([shksText(t.id), new Promise(function (ok) { setTimeout(ok, 4200); })]).then(function (R) {
if (!SHKS.on || SHKS.gen !== gen || !SHKS.globe)
return;
var D = R[0], parts = D.w.parts || [], from = parts.length ? parts[0][0] : 0;
SHKS.list = shksParse(D.lines, from, D.lines.length, null);
SHKS.i = Math.max(0, Math.min(at, SHKS.list.length - 1));
if (SHKS.i > 0) {
for (var q = SHKS.i; q >= 0; q--)
if (SHKS.list[q].k === "head") {
SHKS.i = q;
break;
}
}
else if (joinAt > 0) {
var j = Math.min(SHKS.list.length - 1, Math.floor(joinAt * SHKS.list.length));
while (j > 0 && SHKS.list[j].k !== "say")
j--;
SHKS.i = j;
}
shksCard("", "", false);
if (!SHKS.list.length) {
shksSub("", "The players' book could not be read just now.", null, true);
return;
}
shksPlay();
}).catch(function () { shksCard("The players' book could not be fetched just now.", "Try again in a moment.", true); });
},
function (on) {
var Rm = SHK.rooms && SHK.rooms.globe;
if (!Rm)
return;
var cx = Rm.cx;
SHK.people.forEach(function (P) {
if (!P.g || P.g.parent !== Rm.live)
return;
if (P.key === "burbage" || P.key === "armin" || P.key === "will" || P.key === "bookkeeper") {
if (on) {
P.hid = P.g.visible;
P.g.visible = false;
}
else
P.g.visible = true;
return;
}
if (on && !P.key) {
P.ry0 = P.g.rotation.y;
P.g.rotation.y = Math.atan2(cx - P.g.position.x, -22 - P.g.position.z);
}
else if (!on && P.ry0 != null) {
P.g.rotation.y = P.ry0;
P.ry0 = null;
}
});
if (on) {
var g = new THREE.Group();
g.name = "shk-audience";
SHK.G.add(g);
SHKG.aud = g;
var R = wRand(Math.floor(Date.now() / SHKG_SLOT)), n = SHK.lite ? 8 : 22, m = SHK.lite ? 6 : 18;
for (var i = 0; i < n; i++) {
var a = Math.PI / 2 + (R() - 0.5) * 2.6, d = 6 + R() * 17, x = cx + Math.cos(a) * d, z = Math.sin(a) * d * 0.85 - 2;
if (z < -13)
continue;
var p = wPerson("shkaud_" + i, { look: shkFolkLook(R) });
p.position.set(x, 0, z);
p.rotation.y = Math.atan2(cx - x, -22 - z);
g.add(p);
}
for (var j = 0; j < m; j++) {
var side = j % 2 ? 1 : -1, a2 = -Math.PI / 2 + side * (0.75 + R() * 2.0), t = (R() * 2) | 0, rr = 26 + 1.9 * (1 + ((R() * 3) | 0)), x2 = cx + Math.cos(a2) * rr, z2 = Math.sin(a2) * rr;
if (Math.sin(a2) > 0 && Math.abs(x2 - cx) < 3.4)
continue;
var p2 = wPerson("shkaudg_" + j, { look: shkFolkLook(R) });
p2.position.set(x2, 0.72 + t * 3.6, z2);
p2.rotation.y = Math.atan2(cx - x2, -22 - z2);
g.add(p2);
}
try {
g.children.forEach(function (c) { ctnMerge(c); });
}
catch (e) { }
}
else if (SHKG.aud) {
try {
SHKG.aud.parent.remove(SHKG.aud);
ctsFree(SHKG.aud);
}
catch (e) { }
SHKG.aud = null;
}
},
function (dt, speaker) {
var G = SHKS.globe, E = G.eye, W = SHK.G.localToWorld(shksV(E.x, E.y, E.z));
camera.position.copy(W);
var tx = G.set.x, ty = G.set.y + 1.4, tz = G.set.z - 1;
if (speaker && speaker.g) {
tx = speaker.g.position.x;
tz = speaker.g.position.z;
ty = speaker.g.position.y + 1.5;
}
var dx = tx - E.x, dy = ty - E.y, dz = tz - E.z, wy = Math.atan2(-dx, -dz), wp = Math.atan2(dy, Math.hypot(dx, dz));
var k = Math.min(1, dt * 1.8), dyaw = Math.atan2(Math.sin(wy - yaw), Math.cos(wy - yaw));
yaw += dyaw * k;
pitch += (wp - pitch) * k;
if (!(typeof renderer !== "undefined" && renderer.xr && renderer.xr.isPresenting)) {
if (G.fov0 == null)
G.fov0 = camera.fov;
var want = Math.max(22, Math.min(G.fov0, 2 * Math.atan(8 / Math.max(4, Math.hypot(G.set.x - E.x, G.set.z - E.z))) * 180 / Math.PI));
if (Math.abs(camera.fov - want) > 0.05) {
camera.fov += (want - camera.fov) * Math.min(1, dt * 2.5);
camera.updateProjectionMatrix();
}
}
},
function () {
var G = SHKS.globe;
if (!G)
return;
SHKS.speaking = null;
shksExitAll();
shksCut("wide", null, 8);
shksSub("", "", null, false);
try {
var d = shkData();
if (d.watch)
delete d.watch[G.id];
shkSave();
}
catch (e) { }
shksCard("Finis", "The players come down to the front of the stage and bow. The groundlings roar, hats go up in the galleries, and Will Kemp's old jig ends the afternoon, as it ends every play at the Globe.", true);
if (typeof playTone === "function")
[0, 300, 600, 900].forEach(function (ms, i) { setTimeout(function () { try {
playTone([392, 523, 659, 784][i], 0.25);
}
catch (e) { } }, ms); });
var T = G.T, t = G.t;
SHKS.timer = setTimeout(function () {
if (!SHKS.on)
return;
shksStop();
worldCard(shkT("🎭 " + esc(T.t), "The play is done") + "<div style='margin:8px 0'>Every word of it, as the Lord Chamberlain's Men played it.</div>" +
worldBtn("again", "🎭 Watch it again", null) + worldBtn("world", "🚪 Step into the play's own world", "Through the trapdoor, in the Hall of Plays") + worldBtn("bill", "🎟️ The playbill", "Another play, another time"), { again: function () { shkgStart(t, true); }, world: function () { worldCard(null); if (typeof shkPlayCard === "function")
shkPlayCard(T.id);
else
shkGoIn("plays"); }, bill: function () { shkgBoxCard(); } });
}, 7000);
},
function () {
if (SHK.moving || (typeof SHKS !== "undefined" && SHKS.on))
return;
var L = worldLocal(), hit = null;
if (SHK.zone === "inside") {
var Rm = SHK.inside && SHK.rooms[SHK.inside], w = Rm && Rm.walkOut;
if (w && Math.abs(L.x - w.x) < w.w && L.z > w.z)
hit = function () { shkGoOut(Rm.k); };
}
else
(SHK.walkIn || []).forEach(function (d) { if (!hit && Math.hypot(L.x - d.x, L.z - d.z) < 1.5)
hit = function () { shkGoIn(d.room); }; });
if (!hit) {
SHKG.armed = true;
return;
}
if (!SHKG.armed)
return;
SHKG.armed = false;
hit();
},
function (G, w, d, col, x, z, edge) {
var r = new THREE.Mesh(new THREE.BoxGeometry(w, 0.02, d), new THREE.MeshLambertMaterial({ color: col }));
r.position.set(x, 0.012, z);
G.add(r);
if (edge != null) {
var e = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, 0.015, d + 0.16), new THREE.MeshLambertMaterial({ color: edge }));
e.position.set(x, 0.006, z);
G.add(e);
}
return r;
},
function (G, x, z) {
[0, 2.1, 4.2].forEach(function (a) { var l = shkpC(G, 0.025, 0.025, 0.95, "lead", 0x2A2A2A, x + Math.cos(a) * 0.22, 0, z + Math.sin(a) * 0.22, 5); l.rotation.z = Math.cos(a) * 0.18; l.rotation.x = -Math.sin(a) * 0.18; });
var b = shkpC(G, 0.34, 0.2, 0.24, "lead", 0x3A3430, x, 0.88, z, 12);
var c = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), shkpGlow(0xE86A20));
c.scale.y = 0.45;
c.position.set(x, 1.1, z);
G.add(c);
},
function (G, x, z, ry, col) {
var c = new THREE.Group();
shkpB(c, 1.0, 0.5, 0.55, "wood", col || 0x5A3418, 0, 0, 0);
var lid = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.0, 10, 1, false, 0, Math.PI), shkS("wood", col || 0x5A3418));
lid.rotation.z = Math.PI / 2;
lid.position.y = 0.5;
c.add(lid);
[-0.38, 0, 0.38].forEach(function (o) { shkpB(c, 0.05, 0.52, 0.57, "lead", 0x3A3A3A, o, 0, 0); });
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
G.add(c);
},
function (G, x, z, h, seed) {
shkpC(G, 0.42, 0.34, 0.6, "wood", 0x6A4A2A, x, 0, z, 12);
[0.1, 0.45].forEach(function (f) { shkpC(G, 0.43, 0.43, 0.04, "lead", 0x3A3A3A, x, f, z, 12); });
var t = new THREE.Group();
t.position.set(0, 0.6, 0);
var g2 = new THREE.Group();
g2.position.set(x, 0, z);
g2.add(t);
G.add(g2);
shkpOak(t, 0, 0, h || 2.6, [0x3E6A2E, 0x4A7A34, 0x355A2A][(seed || 0) % 3]);
},
function (G, x, y, z) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), shkS("plaster", 0xE8E0C8));
s.scale.set(1, 0.9, 1.15);
s.position.set(x, y + 0.09, z);
G.add(s);
[-0.035, 0.035].forEach(function (o) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), new THREE.MeshBasicMaterial({ color: 0x1A1410 })); e.position.set(x + o, y + 0.1, z + 0.1); G.add(e); });
},
function (G, x, z, col, ry) {
var s = new THREE.Group();
shkpB(s, 2.0, 0.08, 0.9, "wood", 0x6A4A2A, 0, 0.85, 0);
[-0.9, 0.9].forEach(function (a) { shkpC(s, 0.04, 0.04, 2.2, "wood", 0x5A3E22, a, 0, -0.4, 6); shkpC(s, 0.04, 0.04, 0.85, "wood", 0x5A3E22, a, 0, 0.4, 6); });
var aw = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }));
aw.rotation.x = -1.1;
aw.position.set(0, 2.1, 0.1);
s.add(aw);
for (var i = 0; i < 6; i++) {
var w = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), shkS("plaster", [0xC83A2A, 0xE8A030, 0x8AAA3A, 0xD8C070][i % 4]));
w.position.set(-0.7 + i * 0.28, 0.98, (i % 2) * 0.2 - 0.1);
s.add(w);
}
s.position.set(x, 0, z);
s.rotation.y = ry || 0;
G.add(s);
},
function (G, kind, col, h, tr) {
var lite = ctLite(), gold = 0xC8A040, deep = tr ? 0x2A1418 : col;
for (var r = 0; r < (lite ? 4 : 9); r++) {
var rx = -7 + ((r * 5.3) % 14), rz = -8 + ((r * 3.7) % 12);
if (shkgClear(rx, rz))
continue;
var ru = new THREE.Mesh(new THREE.CircleGeometry(0.7 + (r % 3) * 0.25, 10), new THREE.MeshLambertMaterial({ color: 0xB8A060 }));
ru.rotation.x = -Math.PI / 2;
ru.position.set(rx, 0.008, rz);
ru.scale.y = 0.6;
G.add(ru);
}
[-6.5, 6.5].forEach(function (x) {
var sw = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.6, 1.1, 16, 1, true), new THREE.MeshLambertMaterial({ color: deep, side: THREE.DoubleSide }));
sw.position.set(x, 7.2, 3.6);
G.add(sw);
var bd = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.05, 6, 20), shkS("lead", gold));
bd.rotation.x = Math.PI / 2;
bd.position.set(x, 6.65, 3.6);
G.add(bd);
shkpTorchWall(G, x * 0.95, -10.2, x < 0 ? -1 : 1);
});
if (!tr && !/tomb|cave|heath/.test(kind))
shkgGarland(G, -6.5, 6.5, 6.6, 3.6, 0xE8C850);
switch (kind) {
case "throne":
shkgRug(G, 2.2, 8.6, 0x8A1A2A, 0, -2.6, gold);
[-1, 1].forEach(function (sd) {
shkgHalberd(G, sd * 2.4, -7.4);
shkgHalberd(G, sd * 5.2, -4.2);
shkgBrazier(G, sd * 4.4, -8.2);
shkgCandelabrum(G, sd * 2.0, -6.2, 1.7);
shkpBanner(G, sd * 7.4, -6, deep, 4.2);
shkgShield(G, sd * 7.4, 2.0, -9.95, gold);
shkgStool(G, sd * 3.2, -5.6, 0x6A3A1E);
});
if (!lite) {
[-1, 1].forEach(function (sd) {
var tb = shkpB(G, 1.6, 0.08, 0.7, "wood", 0x5A3418, sd * 6.2, 0.82, -2.6);
[-0.7, 0.7].forEach(function (o) { shkpC(G, 0.04, 0.05, 0.82, "wood", 0x5A3418, sd * 6.2 + o, 0, -2.6 + 0.28, 6); shkpC(G, 0.04, 0.05, 0.82, "wood", 0x5A3418, sd * 6.2 + o, 0, -2.6 - 0.28, 6); });
shkgCloth(G, 1.7, 0.5, deep, sd * 6.2, 0.62, -2.6 + 0.36);
for (var q = 0; q < 3; q++)
shkgGoblet(G, sd * 6.2 - 0.5 + q * 0.5, 0.9, -2.6);
});
shkgChest(G, -5.6, -8.4, 0.2, 0x6A3A18);
shkgChest(G, 5.6, -8.4, -0.2, 0x6A3A18);
}
break;
case "feast":
shkgRug(G, 12, 3.2, 0x6A1A2A, 0, -5.6, gold);
for (var f = 0; f < (lite ? 4 : 9); f++) {
var fx = -3 + f * 0.75;
shkgGoblet(G, fx, 0.92, -5.0);
var pl = shkpC(G, 0.16, 0.16, 0.02, "lead", 0xC8C8C8, fx + 0.3, 0.9, -5.35, 12);
}
[-1, 1].forEach(function (sd) {
shkgCandelabrum(G, sd * 5.4, -7.6, 1.8);
shkgBarrel(G, sd * 7.2, -8.6);
shkgBarrel(G, sd * 7.6, -7.7, 0.8);
shkgStool(G, sd * 6.6, -4.4);
shkgStool(G, sd * 6.0, -3.4);
var sb = shkpB(G, 2.0, 1.0, 0.6, "wood", 0x5A3418, sd * 6.6, 0, -9.4);
for (var p = 0; p < 4; p++)
shkgGoblet(G, sd * 6.6 - 0.7 + p * 0.45, 1.0, -9.4, p % 2 ? 0xC8C8C8 : gold);
});
if (!lite) {
var roast = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), shkS("plaster", 0x8A4A1A));
roast.scale.set(1.5, 0.8, 1);
roast.position.set(0, 1.08, -5.2);
G.add(roast);
shkpC(G, 0.5, 0.5, 0.04, "lead", 0xC8C8C8, 0, 0.9, -5.2, 16);
for (var b2 = 0; b2 < 6; b2++) {
var fr = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), shkpGlow([0xC83A2A, 0xE8A030, 0x8AAA3A][b2 % 3]));
fr.position.set(1.4 + b2 * 0.14, 0.98, -5.1 + (b2 % 2) * 0.1);
G.add(fr);
}
[-6.8, -5.9].forEach(function (x, i) { shkgStool(G, x, 1.6 + i * 0.5); });
var lute = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), shkS("wood", 0xA8743A));
lute.scale.set(1, 1.4, 0.5);
lute.position.set(-6.8, 0.75, 1.6);
G.add(lute);
}
shkgGarland(G, -6, 6, 3.4, -9.9, 0xC82A3A);
break;
case "chamber":
shkgRug(G, 4.2, 3, 0x3A2A5A, 0, -6.4, gold);
shkgChest(G, -3.4, -8.6, 0.15, 0x5A3418);
shkgCandelabrum(G, -2.2, -7.8, 1.4);
shkgStool(G, 2.2, -4.8);
if (!lite) {
var pd = new THREE.Group();
shkpB(pd, 0.7, 0.16, 0.5, "wood", 0x4A2A14, 0, 0, 0.2);
shkpB(pd, 0.7, 0.9, 0.1, "wood", 0x4A2A14, 0, 0, -0.1);
shkpB(pd, 0.75, 0.06, 0.3, "wood", 0x4A2A14, 0, 0.9, -0.05);
pd.position.set(-5.8, 0, -6.4);
pd.rotation.y = 0.5;
G.add(pd);
shkgBook(G, -5.8, 0.97, -6.4, 0x6A1A1A, 0.5);
var ws = shkpC(G, 0.25, 0.18, 0.8, "wood", 0x5A3418, 5.8, 0, -7.6, 10);
var bw = shkpC(G, 0.3, 0.2, 0.12, "lead", 0xC8C8C8, 5.8, 0.8, -7.6, 12);
var mir = new THREE.Mesh(new THREE.CircleGeometry(0.3, 16), new THREE.MeshLambertMaterial({ color: 0xC8D0D8, emissive: 0x222630 }));
mir.position.set(5.8, 2.0, -9.98);
G.add(mir);
}
break;
case "cell":
shkgRug(G, 3.4, 2.4, 0x4A3A2A, -2.6, -5.6);
var sh = new THREE.Group();
shkpB(sh, 2.4, 2.6, 0.4, "wood", 0x4A2A14, 0, 0, 0);
for (var s = 0; s < 3; s++) {
shkpB(sh, 2.3, 0.04, 0.36, "wood", 0x5A3418, 0, 0.5 + s * 0.75, 0.02);
for (var bk = 0; bk < (lite ? 5 : 9); bk++)
shkpB(sh, 0.12, 0.45 - (bk % 3) * 0.06, 0.28, "plaster", [0x6A1A1A, 0x1A2A5A, 0x5A4A1A, 0x1A4A2A][bk % 4], -1.0 + bk * 0.24, 0.54 + s * 0.75, 0.04);
}
sh.position.set(-5.4, 0, -9.6);
G.add(sh);
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), shkS("plaster", 0x8AA8C0));
gl.position.set(5.0, 1.3, -7.0);
G.add(gl);
shkpC(G, 0.04, 0.12, 0.96, "wood", 0x5A3418, 5.0, 0, -7.0, 8);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.02, 6, 24), shkS("lead", gold));
ring.position.set(5.0, 1.3, -7.0);
G.add(ring);
shkgSkull(G, -2.0, 0.82, -5.2);
var hg = shkpC(G, 0.06, 0.02, 0.12, "plaster", 0xE8D8A8, -1.5, 0.82, -5.6, 8);
shkpC(G, 0.02, 0.06, 0.12, "plaster", 0xE8D8A8, -1.5, 0.94, -5.6, 8);
var lect = new THREE.Group();
shkpC(lect, 0.05, 0.07, 1.1, "wood", 0x4A2A14, 0, 0, 0, 8);
var top = shkpB(lect, 0.6, 0.05, 0.45, "wood", 0x4A2A14, 0, 1.1, 0);
top.rotation.x = -0.4;
lect.position.set(3.6, 0, -8.4);
G.add(lect);
shkgBook(G, 3.6, 1.22, -8.4, 0xE8DCC0);
break;
case "tomb":
[-1, 1].forEach(function (sd) {
shkgCandelabrum(G, sd * 2.6, -6.6, 1.5);
for (var rl = 0; rl < 5; rl++)
shkpC(G, 0.025, 0.025, 1.0, "lead", 0x2A2A2A, sd * (1.6 + rl * 0.3), 0, -4.6, 5);
shkpB(G, 1.6, 0.04, 0.04, "lead", 0x2A2A2A, sd * 2.2, 0.98, -4.6);
shkgTub(G, sd * 7.0, -8.4, 3.4, 1);
var urn = shkpC(G, 0.22, 0.12, 0.5, "marble", 0xD8D4CC, sd * 4.2, 0, -8.8, 12);
var wr = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 6, 16), shkS("foliage", 0x2E4A2A));
wr.position.set(sd * 1.0, 1.3, -5.0);
G.add(wr);
});
if (/church|grave/.test(h)) {
var spade = shkpC(G, 0.025, 0.025, 1.3, "wood", 0x5A3E22, -4.2, 0, -3.6, 6);
spade.rotation.z = 0.3;
shkpB(G, 0.25, 0.32, 0.03, "lead", 0x6A6A6A, -4.4, 0, -3.6);
shkgSkull(G, -3.8, 0.02, -3.2);
var mound = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), shkS("earth", 0x4A3A2A));
mound.scale.y = 0.35;
mound.position.set(-5.4, 0, -4.6);
G.add(mound);
}
break;
case "cave":
for (var k = 0; k < (lite ? 4 : 8); k++) {
var a = k / 8 * Math.PI;
shkgRock(G, Math.cos(a) * 7.2, -6 - Math.sin(a) * 3.4, 0.7 + (k % 3) * 0.3, 0x3A3632);
}
[-1, 1].forEach(function (sd) { for (var bn = 0; bn < 4; bn++) {
var bo = shkpC(G, 0.03, 0.03, 0.4, "plaster", 0xE8E0C8, sd * (3.4 + bn * 0.3), 0.02, -7.2 + bn * 0.2, 5);
bo.rotation.z = Math.PI / 2;
bo.rotation.y = bn;
} shkgSkull(G, sd * 4.6, 0, -6.8); shkpCandle(G, sd * 2.0, 0, -6.4); shkpCandle(G, sd * 2.4, 0, -6.0); });
var mist = new THREE.Mesh(new THREE.CircleGeometry(2.2, 20), new THREE.MeshBasicMaterial({ color: 0x6A8A5A, transparent: true, opacity: 0.22, depthWrite: false }));
mist.rotation.x = -Math.PI / 2;
mist.position.set(0, 0.05, -5.6);
G.add(mist);
break;
case "camp":
shkgRug(G, 3, 2, 0x5A4A2A, 0, -6.4);
var ct = new THREE.Group();
shkpB(ct, 1.8, 0.06, 1.0, "wood", 0x5A3E22, 0, 0.8, 0);
[-0.8, 0.8].forEach(function (o) { shkpB(ct, 0.06, 0.8, 0.9, "wood", 0x5A3E22, o, 0, 0); });
var map = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.8), new THREE.MeshLambertMaterial({ color: 0xE8DCB0 }));
map.rotation.x = -Math.PI / 2;
map.position.set(0, 0.84, 0);
ct.add(map);
ct.position.set(0, 0, -6.4);
G.add(ct);
shkpCandle(G, 0.6, 0.84, -6.2);
[-1, 1].forEach(function (sd) {
var dr = shkpC(G, 0.32, 0.32, 0.5, "wood", 0x8A2A1A, sd * 3.4, 0, -4.6, 14);
var hd = shkpC(G, 0.33, 0.33, 0.02, "plaster", 0xE8DCC0, sd * 3.4, 0.5, -4.6, 14);
for (var sp = 0; sp < 3; sp++)
shkgShield(G, sd * (5.6 + sp * 0.75), 0.6, -8.9, [deep, 0x6A6A6A, gold][sp]);
shkgBrazier(G, sd * 6.6, -3.4);
shkgHalberd(G, sd * 2.0, -8.8);
shkgBarrel(G, sd * 7.4, -6.4, 0.8);
});
break;
case "garden":
var ar = new THREE.Group();
[-1.2, 1.2].forEach(function (o) { shkpC(ar, 0.05, 0.05, 2.6, "wood", 0x5A3E22, o, 0, 0, 6); });
var arc = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 6, 16, Math.PI), shkS("wood", 0x5A3E22));
arc.position.y = 2.6;
ar.add(arc);
for (var fl = 0; fl < (lite ? 8 : 16); fl++) {
var an = fl / 15 * Math.PI, bl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), shkS("foliage", fl % 3 ? 0x3E6A2E : [0xE87AA0, 0xF0E8F0, 0xC82A3A][fl % 3]));
bl.position.set(Math.cos(an) * 1.2, 2.6 + Math.sin(an) * 1.2, 0);
ar.add(bl);
}
ar.position.set(0, 0, -8.8);
G.add(ar);
[-1, 1].forEach(function (sd) { shkgTub(G, sd * 7.0, -3.6, 2.4, 2); shkgTub(G, sd * 2.6, -9.0, 2.0, 0); });
var ft = shkpC(G, 0.9, 1.0, 0.5, "stone", 0xC8C0B0, -6.4, 0, -7.8, 16);
var wt = new THREE.Mesh(new THREE.CircleGeometry(0.82, 16), new THREE.MeshLambertMaterial({ color: 0x4A7A9A }));
wt.rotation.x = -Math.PI / 2;
wt.position.set(-6.4, 0.48, -7.8);
G.add(wt);
shkpC(G, 0.08, 0.12, 1.1, "stone", 0xC8C0B0, -6.4, 0.5, -7.8, 8);
break;
case "walls":
[-1, 1].forEach(function (sd) {
var cn = shkpC(G, 0.18, 0.24, 1.8, "lead", 0x2A2A2A, sd * 5.6, 0.5, -4.4, 10);
cn.rotation.x = Math.PI / 2 - 0.15;
[-0.35, 0.35].forEach(function (o) { var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 12), shkS("wood", 0x5A3E22)); wh.rotation.z = Math.PI / 2; wh.position.set(sd * 5.6 + o, 0.42, -4.6); G.add(wh); });
for (var cb = 0; cb < 3; cb++) {
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), shkS("lead", 0x2A2A2A));
ball.position.set(sd * 6.6 + (cb % 2) * 0.24, 0.12 + (cb > 1 ? 0.2 : 0), -3.6);
G.add(ball);
}
shkpBanner(G, sd * 7.6, -9, deep, 5);
shkgHalberd(G, sd * 3.4, -7.4);
});
break;
case "heath":
var st = shkpB(G, 1.0, 3.0, 0.6, "stone", 0x6A665A, -4.6, 0, -8.8);
st.rotation.z = 0.06;
var st2 = shkpB(G, 0.8, 2.2, 0.5, "stone", 0x6A665A, -3.4, 0, -9.2);
st2.rotation.z = -0.08;
for (var gr = 0; gr < (lite ? 4 : 8); gr++)
shkpBush(G, -7 + gr * 2, 2.5 + (gr % 2) * 1.6, 0.32, 0x5A5A3A, 0x9A6A9A);
break;
case "wood":
[-1, 1].forEach(function (sd) { shkgTub(G, sd * 7.2, -2.8, 3.0, 1); shkgTub(G, sd * 5.8, 1.6, 2.4, 2); var bank = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), shkS("foliage", 0x4A7A34)); bank.scale.set(1.4, 0.35, 0.8); bank.position.set(sd * 4.6, 0, -4.0); G.add(bank); });
for (var ts = 0; ts < (lite ? 4 : 9); ts++) {
var tx = -6 + ts * 1.5, tz = -3.6 + (ts % 3) * 0.5;
if (shkgClear(tx, tz))
continue;
shkpC(G, 0.02, 0.03, 0.12, "plaster", 0xE8E0D0, tx, 0, tz, 6);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2), shkS("plaster", ts % 2 ? 0xC83A2A : 0xD8B888));
cap.position.set(tx, 0.12, tz);
G.add(cap);
}
if (/shore|coast|sea|island/.test(h)) {
var sea = new THREE.Mesh(new THREE.PlaneGeometry(12, 1.2), new THREE.MeshLambertMaterial({ color: 0x2A5A7A, side: THREE.DoubleSide }));
sea.position.set(0, 0.6, -9.6);
G.add(sea);
}
break;
case "church":
[-1, 1].forEach(function (sd) { shkgCandelabrum(G, sd * 4.6, -8.6, 1.8); shkpBanner(G, sd * 7.2, -8, deep, 4.4); });
shkgRug(G, 1.6, 6, 0x5A1A2A, 0, -4.6, gold);
break;
case "ship":
[-1, 1].forEach(function (sd) { shkgBarrel(G, sd * 6.6, -3.6); shkgBarrel(G, sd * 7.3, -4.2, 0.8); var co = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 6, 16), shkS("thatch", 0xB89A6A)); co.rotation.x = Math.PI / 2; co.position.set(sd * 5.4, 0.08, -3.2); G.add(co); });
var lan = shkpC(G, 0.12, 0.12, 0.3, "lead", 0x3A3A3A, 0, 6.4, -6, 6);
var lg = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 4), shkpGlow(0xFFC860));
lg.position.set(0, 6.55, -6);
G.add(lg);
break;
default:
[-1, 1].forEach(function (sd) {
shkgStall(G, sd * 6.4, -6.6, sd < 0 ? deep : 0x2A4A6A, sd * 0.25);
shkgBarrel(G, sd * 7.6, -3.2);
shkgBarrel(G, sd * 7.0, -2.6, 0.8);
var sg = shkpB(G, 0.9, 0.6, 0.05, "wood", 0x6A4A2A, sd * 4.1, 3.4, -10.1);
shkpB(G, 0.04, 0.04, 0.9, "lead", 0x2A2A2A, sd * 4.1, 4.0, -9.7);
});
if (!lite) {
var cart = new THREE.Group();
shkpB(cart, 1.8, 0.5, 1.0, "wood", 0x6A4A2A, 0, 0.5, 0);
[-0.6, 0.6].forEach(function (o) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 14), shkS("wood", 0x4A3420)); w.rotation.x = Math.PI / 2; w.position.set(0, 0.45, o); cart.add(w); });
for (var cb2 = 0; cb2 < 4; cb2++)
shkpB(cart, 0.4, 0.3, 0.4, "wood", 0x8A6A3A, -0.5 + cb2 * 0.33, 1.0, (cb2 % 2) * 0.2 - 0.1);
cart.position.set(4.6, 0, -9.0);
cart.rotation.y = -0.3;
G.add(cart);
}
}
},
function (kind, tr) {
var key = "arras_" + kind + (tr ? "_t" : ""), lite = ctLite();
if (SHK.tex[key])
return SHK.tex[key];
return (SHK.tex[key] = wTex(lite ? 256 : 512, lite ? 128 : 256, function (x, W, H) {
var R = wRand(kind.length * 31 + (tr ? 7 : 0)), i, j;
function bg(a, b) { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, W, H); }
function border(c) { x.strokeStyle = c; x.lineWidth = W / 40; x.strokeRect(x.lineWidth / 2, x.lineWidth / 2, W - x.lineWidth, H - x.lineWidth); x.lineWidth = W / 160; x.strokeRect(W / 28, W / 28, W - W / 14, H - W / 14); }
function tree(tx, ty, s, c) { x.fillStyle = "#4A3424"; x.fillRect(tx - s * 0.08, ty - s * 0.9, s * 0.16, s * 0.9); x.fillStyle = c; for (var q = 0; q < 5; q++) {
x.beginPath();
x.arc(tx + (R() - 0.5) * s * 0.7, ty - s * (0.9 + R() * 0.5), s * (0.28 + R() * 0.14), 0, Math.PI * 2);
x.fill();
} }
function house(hx, hw, hh, c) {
x.fillStyle = c;
x.fillRect(hx, H - hh, hw, hh);
x.fillStyle = "#3A2A1A";
for (i = 0; i < 4; i++)
x.fillRect(hx + i * hw / 3 - 2, H - hh, 4, hh);
x.fillRect(hx, H - hh * 0.55, hw, 4);
x.beginPath();
x.moveTo(hx - 6, H - hh);
x.lineTo(hx + hw / 2, H - hh - hw * 0.45);
x.lineTo(hx + hw + 6, H - hh);
x.fillStyle = "#6A3A2A";
x.fill();
x.fillStyle = "#E8D898";
x.fillRect(hx + hw * 0.3, H - hh * 0.85, hw * 0.14, hh * 0.2);
x.fillRect(hx + hw * 0.6, H - hh * 0.85, hw * 0.14, hh * 0.2);
}
if (tr && !/wood|garden|heath|street|camp/.test(kind)) {
bg("#141216", "#0A080A");
x.fillStyle = "#C8C8D0";
for (i = 0; i < 40; i++) {
x.globalAlpha = 0.35 + R() * 0.4;
x.beginPath();
x.arc(R() * W, R() * H, 1 + R() * 2, 0, Math.PI * 2);
x.fill();
}
x.globalAlpha = 1;
border("#3A3640");
return;
}
switch (kind) {
case "throne":
case "feast":
case "church":
bg(kind === "feast" ? "#7A2A1A" : kind === "church" ? "#4A4A5A" : "#7A1424", kind === "feast" ? "#4A1A10" : kind === "church" ? "#2A2A36" : "#4A0A14");
x.fillStyle = kind === "church" ? "#C8C0A8" : "#D8B040";
for (j = 0; j < 5; j++)
for (i = 0; i < 9; i++) {
var px = (i + 0.5 + (j % 2) * 0.5) * W / 9, py = (j + 0.6) * H / 5, s = W / 60;
x.beginPath();
x.moveTo(px, py - s * 1.6);
x.quadraticCurveTo(px + s * 1.3, py - s * 0.3, px, py + s * 1.2);
x.quadraticCurveTo(px - s * 1.3, py - s * 0.3, px, py - s * 1.6);
x.fill();
x.fillRect(px - s * 1.2, py + s * 0.2, s * 2.4, s * 0.4);
}
if (kind === "feast") {
x.strokeStyle = "#3E6A2E";
x.lineWidth = 4;
for (i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(0, H * 0.12 + i * 3);
x.bezierCurveTo(W * 0.3, H * 0.25, W * 0.6, 0, W, H * 0.12 + i * 3);
x.stroke();
}
x.fillStyle = "#5A2A6A";
for (i = 0; i < 22; i++) {
x.beginPath();
x.arc(R() * W, H * 0.12 + R() * H * 0.1, 4, 0, Math.PI * 2);
x.fill();
}
}
if (kind === "church") {
x.strokeStyle = "#E8E0C8";
x.lineWidth = 5;
for (i = 0; i < 4; i++) {
var ax = (i + 0.5) * W / 4;
x.beginPath();
x.moveTo(ax - W / 12, H);
x.lineTo(ax - W / 12, H * 0.45);
x.quadraticCurveTo(ax, H * 0.1, ax + W / 12, H * 0.45);
x.lineTo(ax + W / 12, H);
x.stroke();
}
}
border("#D8B040");
break;
case "chamber":
case "cell":
bg(kind === "cell" ? "#4A3420" : "#2A4A4A", kind === "cell" ? "#2A1A10" : "#1A2E30");
if (kind === "cell") {
x.strokeStyle = "#2A1A0A";
x.lineWidth = 3;
for (i = 0; i < 8; i++)
for (j = 0; j < 2; j++) {
var lx = i * W / 8 + 8, ly = j * H / 2 + 8;
x.strokeRect(lx, ly, W / 8 - 16, H / 2 - 16);
for (var f = 0; f < 3; f++) {
x.beginPath();
x.moveTo(lx + 12 + f * 10, ly + 14);
x.lineTo(lx + 12 + f * 10, ly + H / 2 - 30);
x.stroke();
}
}
}
else {
for (i = 0; i < 70; i++) {
x.fillStyle = ["#3E6A3E", "#5A8A4A", "#2E5A3A"][i % 3];
x.beginPath();
x.ellipse(R() * W, R() * H, 10, 5, R() * 3, 0, Math.PI * 2);
x.fill();
}
for (i = 0; i < 30; i++) {
x.fillStyle = ["#E8D8E8", "#E8B840", "#C84A5A"][i % 3];
x.beginPath();
x.arc(R() * W, R() * H, 4, 0, Math.PI * 2);
x.fill();
}
border("#C8A040");
}
break;
case "tomb":
case "cave":
bg(kind === "cave" ? "#2A2622" : "#1E1C22", "#0E0C0E");
for (i = 0; i < 60; i++) {
x.fillStyle = "rgba(90,84,74," + (0.2 + R() * 0.3) + ")";
x.beginPath();
x.ellipse(R() * W, R() * H, 10 + R() * 30, 6 + R() * 16, R() * 3, 0, Math.PI * 2);
x.fill();
}
if (kind === "tomb") {
x.strokeStyle = "#6A6670";
x.lineWidth = 4;
for (i = 0; i < 5; i++) {
var cx2 = (i + 0.5) * W / 5;
x.beginPath();
x.moveTo(cx2 - W / 16, H);
x.lineTo(cx2 - W / 16, H * 0.5);
x.arc(cx2, H * 0.5, W / 16, Math.PI, 0);
x.lineTo(cx2 + W / 16, H);
x.stroke();
}
}
break;
case "camp":
for (i = 0; i < 16; i++) {
x.fillStyle = i % 2 ? "#E8DCC0" : (tr ? "#2A2A2A" : "#8A2A1A");
x.fillRect(i * W / 16, 0, W / 16, H);
}
for (i = 0; i < 3; i++) {
var sx = (i + 0.5) * W / 3, sy = H * 0.45;
x.fillStyle = "#C8A040";
x.beginPath();
x.moveTo(sx - W / 14, sy - H / 4);
x.lineTo(sx + W / 14, sy - H / 4);
x.lineTo(sx + W / 14, sy + H / 10);
x.quadraticCurveTo(sx, sy + H / 3.2, sx - W / 14, sy + H / 10);
x.fill();
x.fillStyle = "#1A2A5A";
x.fillRect(sx - W / 60, sy - H / 5, W / 30, H * 0.4);
}
border("#5A3A1A");
break;
case "walls":
bg("#7A8AA0", "#9AA0A8");
x.fillStyle = "#8A8478";
x.fillRect(0, H * 0.3, W, H * 0.7);
for (i = 0; i < 16; i++)
x.fillRect(i * W / 16, H * 0.22, W / 32, H * 0.1);
x.strokeStyle = "#5A564C";
x.lineWidth = 2;
for (j = 0; j < 7; j++) {
x.beginPath();
x.moveTo(0, H * 0.3 + j * H * 0.1);
x.lineTo(W, H * 0.3 + j * H * 0.1);
x.stroke();
for (i = 0; i < 12; i++) {
var bx = (i + (j % 2) * 0.5) * W / 12;
x.beginPath();
x.moveTo(bx, H * 0.3 + j * H * 0.1);
x.lineTo(bx, H * 0.4 + j * H * 0.1);
x.stroke();
}
}
break;
case "heath":
bg("#3A3E4A", "#6A6A5A");
for (i = 0; i < 14; i++) {
x.fillStyle = "rgba(30,32,40,0.45)";
x.beginPath();
x.ellipse(R() * W, R() * H * 0.45, 60 + R() * 60, 18 + R() * 12, 0, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#4A4A36";
x.beginPath();
x.moveTo(0, H);
for (i = 0; i <= 8; i++)
x.lineTo(i * W / 8, H * 0.72 - R() * H * 0.12);
x.lineTo(W, H);
x.fill();
break;
case "ship":
bg("#7AA0C0", "#B8C8D8");
x.fillStyle = "#2A5A7A";
x.fillRect(0, H * 0.55, W, H * 0.45);
x.strokeStyle = "#E8F0F8";
x.lineWidth = 2;
for (i = 0; i < 20; i++) {
var wx = R() * W, wy = H * 0.6 + R() * H * 0.35;
x.beginPath();
x.arc(wx, wy, 8, Math.PI * 1.1, Math.PI * 1.9);
x.stroke();
}
break;
case "wood":
case "garden":
bg(kind === "garden" ? "#8AB0D0" : "#6A8A6A", kind === "garden" ? "#C8D8A0" : "#2E4A2A");
for (i = 0; i < (kind === "wood" ? 14 : 7); i++)
tree(R() * W, H * (0.85 + R() * 0.15), H * (0.5 + R() * 0.25), ["#3E6A2E", "#4A7A34", "#2E5A2A"][i % 3]);
if (kind === "garden") {
x.fillStyle = "#2E5A2A";
x.fillRect(0, H * 0.8, W, H * 0.2);
for (i = 0; i < 40; i++) {
x.fillStyle = ["#C82A3A", "#F0E8F0", "#E87AA0", "#E8C850"][i % 4];
x.beginPath();
x.arc(R() * W, H * 0.8 + R() * H * 0.18, 3, 0, Math.PI * 2);
x.fill();
}
}
border("#5A3A1A");
break;
default:
bg("#9AB0C8", "#D8D0B8");
var hx2 = 0;
while (hx2 < W) {
var hw2 = W / 9 + R() * W / 12;
house(hx2, hw2 - 6, H * (0.55 + R() * 0.25), ["#E8DCC0", "#D8C8A8", "#E0D0B0"][Math.floor(R() * 3)]);
hx2 += hw2;
}
}
}));
},
function (G, kind, tr) {
var t = shkgArrasTex(kind, tr), m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
[[-6.8, 3.2], [0, 6.0], [6.8, 3.2]].forEach(function (p) {
var g = new THREE.PlaneGeometry(p[1], 4.2), uv = g.attributes.uv;
var u0 = (p[0] - p[1] / 2 + 8.4) / 16.8, u1 = (p[0] + p[1] / 2 + 8.4) / 16.8;
for (var i = 0; i < uv.count; i++)
uv.setX(i, uv.getX(i) < 0.5 ? u0 : u1);
var c = new THREE.Mesh(g, m);
c.position.set(p[0], 2.1, -10.08);
G.add(c);
var rod = shkpC(G, 0.035, 0.035, p[1] + 0.2, "lead", 0xB89038, p[0], 4.22, -10.02, 6);
rod.rotation.z = Math.PI / 2;
rod.position.y = 4.24;
});
},
function () {
var o = [];
(SHK.spots || []).forEach(function (s) { if (isFinite(s.x) && isFinite(s.z) && Math.abs(s.x) < 5000)
o.push([s.x, s.z, Math.max(4, (s.r || 0) + 1.5)]); });
(SHK.talk || []).forEach(function (t) { var g = t.p && t.p.g; if (g && Math.abs(g.position.x) < 5000)
o.push([g.position.x, g.position.z, 4]); });
for (var k in SHK_PLACES) {
var A = SHK_PLACES[k];
if (A && isFinite(A.x))
o.push([A.x, A.z, (A.r || 0) + 8]);
}
try {
if (typeof SBK_CH !== "undefined" && typeof SBK_PLACE === "function")
SBK_CH.forEach(function (C) {
[C.start && C.start.at ? C.start : null].concat((C.cast || []).map(function (c) { return c.at; })).forEach(function (at) {
var P = at && at.at && SBK_PLACE(at.at);
if (P)
o.push([P.x + (at.dx || 0), P.z + (at.dz || 0), 8]);
});
});
}
catch (e) { }
SHKST_VIEWS.forEach(function (v) { o.push([v[0], v[1], v[2]]); });
return o;
},
function (x, z, pad, noDoors, doorPad) {
var L = SHKST.avoid, i, dp = doorPad === undefined ? (pad || 0) : doorPad;
for (i = 0; i < L.length; i++) {
if (Math.hypot(x - L[i][0], z - L[i][1]) < L[i][2] + (pad || 0))
return true;
}
var D = !noDoors && typeof EVB_WD !== "undefined" && EVB_WD[SHK_KEY];
if (D)
for (i = 0; i < D.length; i++) {
if (Math.abs(D[i].x - x) < 3 + dp && Math.abs(D[i].z - z) < 3 + dp)
return true;
}
return false;
},
function (g, kind, w, y, z, R, n) {
var T = SHKST_TRADE[kind] || SHKST_TRADE.fruit, cols = T.c;
for (var i = 0; i < n; i++) {
var c = shkC(cols[(R() * cols.length) | 0]), px = -w / 2 + 0.25 + (i + 0.5) * (w - 0.5) / n + (R() - 0.5) * 0.08, pz = z + (R() - 0.5) * 0.3;
if (kind === "books") {
var h = 0.05 + R() * 0.2;
shkBox(g, 0.26, h, 0.34, c, px, y + h / 2, pz, (R() - 0.5) * 0.4);
if (R() < 0.4)
shkBox(g, 0.3, 0.015, 0.4, shkC(0xEDE2C4), px, y + h + 0.01, pz, (R() - 0.5) * 0.6);
}
else if (kind === "cloth") {
var b = shkCyl(g, 0.12, 0.12, 0.5, c, px, y + 0.13 + (i % 2) * 0.2, pz, 8);
b.rotation.x = Math.PI / 2;
}
else if (kind === "pots") {
shkCyl(g, 0.09 + R() * 0.06, 0.11, 0.18 + R() * 0.16, c, px, y + 0.14, pz, 8);
}
else if (kind === "ale") {
shkCyl(g, 0.07, 0.07, 0.16, c, px, y + 0.08, pz, 7);
}
else if (kind === "gloves") {
shkBox(g, 0.2, 0.06, 0.28, c, px, y + 0.03, pz, (R() - 0.5) * 0.8);
}
else if (kind === "fish") {
var f = wSph(0.12, c, px, y + 0.05, pz, g, 6);
f.scale.set(1.6, 0.35, 0.6);
}
else if (kind === "bread") {
var l = wSph(0.12, c, px, y + 0.07, pz, g, 7);
l.scale.set(1.3, 0.6, 0.8);
}
else {
for (var k = 0; k < 3; k++)
wSph(0.075, shkC(cols[(R() * cols.length) | 0]), px + (k - 1) * 0.1, y + 0.07, pz + (k % 2) * 0.08, g, 6);
}
}
},
function () {
if (typeof wfScan !== "function" || wfScan.shkst)
return;
var w0 = wfScan;
wfScan = function (W, R) {
var r = w0.apply(this, arguments);
try {
if (W && W.key === SHK_KEY && r && r.spots && SHKST.pass)
r.spots = r.spots.filter(function (sp) {
var x = sp.x, z = sp.z;
for (var i = 0; i < SHKST.pass.length; i++) {
var q = SHKST.pass[i];
if (Math.abs(q[0] - x) < 24 && Math.abs(q[1] - z) < 24)
return false;
}
return true;
});
}
catch (e) { }
return r;
};
wfScan.shkst = 1;
},
function (P, x, z, ry, R, o) {
SHKST.n.booth++;
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var lite = SHK.lite, w = o.w || (2.8 + R() * 0.8), d = o.lean ? 3.2 : 1.9, hb = o.lean ? 3.7 : 2.9, hf = 2.5, kind = o.kind || "fruit";
var wood = shkS("wood", 0x7A5A3A), dark = shkS("wood", 0x5A4028), pale = shkS("wood", 0x9A7A54);
[-1, 1].forEach(function (k) { shkBox(g, 0.14, hf, 0.14, dark, k * w / 2, hf / 2, d / 2); if (!o.lean)
shkBox(g, 0.14, hb, 0.14, dark, k * w / 2, hb / 2, -d / 2); });
shkBox(g, w + 0.1, 0.14, 0.14, dark, 0, hf - 0.07, d / 2);
if (!o.lean)
shkBox(g, w, hb - 0.1, 0.06, wood, 0, (hb - 0.1) / 2, -d / 2);
[-1, 1].forEach(function (k) { shkBox(g, 0.06, hf - 0.2, d, pale, k * w / 2, (hf - 0.2) / 2, 0); });
var sl = Math.atan2(hb - hf, d), L = Math.hypot(hb - hf, d) + 0.5, rf = shkBox(g, w + 0.5, 0.1, L, shkS("tile", R() < 0.5 ? 0xA86A4A : 0x9A5A3E), 0, (hb + hf) / 2 + 0.08, 0);
rf.rotation.x = sl;
var aw = shkstAwning(o.awn != null ? o.awn : (R() * SHKST_AWN.length) | 0), a = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.3, 1.3), aw);
a.rotation.x = -Math.PI / 2 + 0.42;
a.position.set(0, hf - 0.28, d / 2 + 0.6);
g.add(a);
var v = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.3, 0.28), aw);
v.position.set(0, hf - 0.68, d / 2 + 1.18);
g.add(v);
if (!lite)
[-1, 1].forEach(function (k) { var st = shkBox(g, 0.05, 0.05, 1.3, dark, k * (w / 2 + 0.1), hf - 0.45, d / 2 + 0.62); st.rotation.x = -0.42; });
shkBox(g, w - 0.1, 0.07, 0.75, pale, 0, 0.92, d / 2 + 0.3);
shkBox(g, w - 0.1, 0.85, 0.06, wood, 0, 0.45, d / 2 - 0.06);
if (!lite)
[-1, 1].forEach(function (k) { var br = shkBox(g, 0.06, 0.5, 0.06, dark, k * (w / 2 - 0.3), 0.68, d / 2 + 0.3); br.rotation.x = 0.6; });
shkstGoods(g, kind, w - 0.1, 0.96, d / 2 + 0.3, R, lite ? 5 : Math.round(w * 3.4));
var ns = lite ? 1 : 2;
for (var s = 0; s < ns; s++) {
var sy = 1.15 + s * 0.62;
shkBox(g, w - 0.2, 0.05, 0.38, wood, 0, sy, -d / 2 + 0.25);
shkstGoods(g, kind, w - 0.3, sy + 0.03, -d / 2 + 0.25, R, lite ? 3 : Math.round(w * 2.6));
}
if (!lite)
for (var h = 0; h < 4; h++) {
var hx = -w / 2 + 0.4 + h * (w - 0.8) / 3, T = SHKST_TRADE[kind] || SHKST_TRADE.fruit;
if (kind === "cloth")
shkBox(g, 0.36, 0.9, 0.02, shkC(T.c[(R() * T.c.length) | 0]), hx, hf - 0.65, d / 2 - 0.05);
else if (kind === "books")
shkBox(g, 0.34, 0.46, 0.01, shkC(0xEDE2C4), hx, hf - 0.5, d / 2 - 0.05);
else {
shkCyl(g, 0.16, 0.12, 0.22, shkS("wood", 0xA8844A), hx, hf - 0.55, d / 2 - 0.05, 8);
shkBox(g, 0.02, 0.3, 0.02, dark, hx, hf - 0.3, d / 2 - 0.05);
}
}
if (!lite)
shkBox(g, Math.min(1.4, w * 0.5), 0.42, 0.05, shkC([0x2A4A2A, 0x6A1A1A, 0x2A3A6A, 0x3A2A1A][(R() * 4) | 0]), 0, hf + 0.3, d / 2 + 0.02);
shkSolidBox(x, z, w + 0.3, d + 0.8, ry || 0);
if (o.keeper === true || (o.keeper !== false && R() < (lite ? 0.25 : 0.35))) {
var c = Math.cos(ry || 0), s = Math.sin(ry || 0), kz = d / 2 - 0.55;
shkstStand(x + kz * s, z + kz * c, ry || 0, null, R);
}
return g;
},
function (P, x, z, ry, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var col = shkC([0x5A3A22, 0x6A4A2A, 0x3A2A1C, 0x9A948A][(R() * 4) | 0]), dk = shkC(0x2A1E16);
var b = shkCyl(g, 0.38, 0.4, 1.5, col, 0, 1.25, 0, 10);
b.rotation.x = Math.PI / 2;
wSph(0.4, col, 0, 1.27, 0.72, g, 8);
wSph(0.42, col, 0, 1.25, -0.7, g, 8);
var n = shkBox(g, 0.3, 0.85, 0.42, col, 0, 1.65, 0.95);
n.rotation.x = 0.55;
var h = shkBox(g, 0.24, 0.26, 0.62, col, 0, 2.0, 1.38);
h.rotation.x = 0.35;
shkBox(g, 0.08, 0.5, 0.12, dk, 0, 1.86, 0.98).rotation.x = 0.55;
[[-0.2, 0.6], [0.2, 0.6], [-0.2, -0.6], [0.2, -0.6]].forEach(function (l) { shkCyl(g, 0.07, 0.06, 1.05, col, l[0], 0.52, l[1], 6); shkCyl(g, 0.08, 0.08, 0.1, dk, l[0], 0.05, l[1], 6); });
var t = shkBox(g, 0.08, 0.7, 0.08, dk, 0, 0.95, -1.15);
t.rotation.x = -0.3;
shkBox(g, 0.84, 0.12, 0.5, shkC(0x3A2A1A), 0, 1.62, 0.15);
shkSolidBox(x, z, 0.9, 2.6, ry || 0);
return g;
},
function (P, x, z, ry, R, kind) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = shkS("wood", 0x7A5A3A), dk = shkS("wood", 0x4A3424);
shkBox(g, 1.0, 0.08, 1.6, wd, 0, 0.72, 0);
[-0.5, 0.5].forEach(function (k) { shkBox(g, 0.05, 0.22, 1.6, wd, k, 0.84, 0); shkBox(g, 0.05, 0.05, 1.1, dk, k * 0.8, 0.7, 1.25); shkBox(g, 0.06, 0.7, 0.06, dk, k * 0.45, 0.35, 0.6); });
var wh = shkCyl(g, 0.34, 0.34, 0.08, dk, 0, 0.34, -0.55, 10);
wh.rotation.z = Math.PI / 2;
shkstGoods(g, kind || "fruit", 0.9, 0.78, 0, R, SHK.lite ? 3 : 6);
shkSolidBox(x, z, 1.1, 2.2, ry || 0);
return g;
},
function (P, x, z, R) {
var n = 1 + ((R() * 3) | 0);
for (var i = 0; i < n; i++) {
var px = x + (R() - 0.5) * 1.4, pz = z + (R() - 0.5) * 0.8, k = R();
if (k < 0.4)
shkBarrel(P, px, pz, R);
else if (k < 0.7)
shkBox(P, 0.7, 0.55, 0.6, shkS("wood", 0x8A6A44), px, 0.28, pz, R() * 0.6);
else {
var s = wSph(0.32, shkC(0xB8A07A), px, 0.26, pz, P, 7);
s.scale.set(1, 0.8, 0.8);
}
}
shkSolidBox(x, z, 1.6, 1.0, 0);
},
function () {
if (!SHK.mats.shkstMud) {
var m = new THREE.MeshLambertMaterial({ color: 0x7A664C, map: shkTexOf("earth") || null });
m.polygonOffset = true;
m.polygonOffsetFactor = -5;
m.polygonOffsetUnits = -20;
SHK.mats.shkstMud = m;
var w = new THREE.MeshPhongMaterial({ color: 0x2A3030, shininess: 14, specular: 0x141818 });
w.polygonOffset = true;
w.polygonOffsetFactor = -7;
w.polygonOffsetUnits = -28;
SHK.mats.shkstWet = w;
}
return { mud: SHK.mats.shkstMud, wet: SHK.mats.shkstWet };
},
function (list, y) {
var pos = [], nor = [], uv = [], seg = 10;
list.forEach(function (b) {
var c = Math.cos(b[4] || 0), s = Math.sin(b[4] || 0), R = wRand(Math.round(b[0] * 7 + b[1] * 13)), rad = [];
for (var i = 0; i < seg; i++)
rad.push(0.75 + R() * 0.4);
for (var j = 0; j < seg; j++) {
var a0 = j / seg * 6.2832, a1 = (j + 1) / seg * 6.2832, r0 = rad[j], r1 = rad[(j + 1) % seg];
var p = [[0, 0], [Math.cos(a1) * b[2] * r1, Math.sin(a1) * b[3] * r1], [Math.cos(a0) * b[2] * r0, Math.sin(a0) * b[3] * r0]];
p.forEach(function (q) { var X = b[0] + q[0] * c + q[1] * s, Z = b[1] - q[0] * s + q[1] * c; pos.push(X, y, Z); nor.push(0, 1, 0); uv.push(X / 3, Z / 3); });
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeBoundingSphere();
return g;
},
function (P, x0, z0, x1, z1, w, R, paved) {
var L = Math.hypot(x1 - x0, z1 - z0), ux = (x1 - x0) / L, uz = (z1 - z0) / L, ang = Math.atan2(-uz, ux), mud = [], wet = [], n = Math.round(L / (SHK.lite ? 6 : 3.2)), k = paved ? 0.45 : 1;
for (var i = 0; i < n; i++) {
var t = R() * L, off = (R() - 0.5) * w * 0.7, x = x0 + ux * t - uz * off, z = z0 + uz * t + ux * off;
mud.push([x, z, (1.2 + R() * 2.2) * k, (0.7 + R() * 1.2) * k, ang + (R() - 0.5) * 0.5]);
}
[-0.6, 0.6].forEach(function (k) { for (var t = 0; t < L; t += 5) {
var x = x0 + ux * (t + 2.5) - uz * k, z = z0 + uz * (t + 2.5) + ux * k;
mud.push([x, z, 2.8, 0.22, ang]);
} });
var nw = Math.round(L / (SHK.lite ? 18 : 9));
for (var j = 0; j < nw; j++) {
var t2 = R() * L, o2 = (R() - 0.5) * w * 0.5, xw = x0 + ux * t2 - uz * o2, zw = z0 + uz * t2 + ux * o2;
wet.push([xw, zw, 0.5 + R() * 1.0, 0.35 + R() * 0.6, R() * 3]);
}
(SHKST.mud[P.name] || (SHKST.mud[P.name] = { P: P, mud: [], wet: [] })).mud.push.apply(SHKST.mud[P.name].mud, mud);
SHKST.mud[P.name].wet.push.apply(SHKST.mud[P.name].wet, wet);
},
function () {
var M = shkstMudMats();
Object.keys(SHKST.mud).forEach(function (k) {
var D = SHKST.mud[k];
if (D.mud.length) {
var m = new THREE.Mesh(shkstBlobs(D.mud, 0.05), M.mud);
m.userData.keep = 1;
D.P.add(m);
}
if (D.wet.length) {
var w = new THREE.Mesh(shkstBlobs(D.wet, 0.065), M.wet);
w.userData.keep = 1;
D.P.add(w);
}
});
},
function (P, x, z, ry, w, d, st, R, o) {
o = o || {};
if (!shkstFree(x, z, w, d, ry, 0.3))
return null;
if (shkstNear(x, z, Math.max(w, d) / 2 + 2, true))
return null;
var D = typeof EVB_WD !== "undefined" && EVB_WD[SHK_KEY], c = Math.cos(ry), s = Math.sin(ry);
if (D)
for (var i = 0; i < D.length; i++) {
var dx = D[i].x - x, dz = D[i].z - z;
if (Math.abs(dx) > 20 || Math.abs(dz) > 20)
continue;
var lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < w / 2 + 1.5 && Math.abs(lz) < d / 2 + 1.5)
return null;
}
SHKST.n.house++;
var h = shkHouse(P, Object.assign({ x: x, z: z, ry: ry, w: w, d: d, st: st, roof: R() < 0.2 ? "thatch" : "tile", jetty: 0.5 }, o), R);
return h;
},
function (P, x0, z0, x1, z1, side, R, o) {
o = o || {};
var L = Math.hypot(x1 - x0, z1 - z0), ux = (x1 - x0) / L, uz = (z1 - z0) / L, nx = -uz * side, nz = ux * side, t = 0, n = 0, ry = Math.atan2(-nx, -nz);
while (t < L) {
var w = (o.wMin || 5) + R() * ((o.wMax || 8) - (o.wMin || 5)), d = (o.dMin || 8) + R() * ((o.dMax || 11) - (o.dMin || 8));
if (t + w > L)
break;
var cx = x0 + ux * (t + w / 2) + nx * ((o.back || 3) + d / 2), cz = z0 + uz * (t + w / 2) + nz * ((o.back || 3) + d / 2);
var st = (o.stMin || 2) + Math.floor(R() * ((o.stMax || 3) - (o.stMin || 2) + 1)), sg = o.signs && R() < (o.signP || 0.35) ? [o.signs[(R() * o.signs.length) | 0]] : null;
var h = (o.no && o.no(cx, cz, w / 2)) ? null : shkstHouse(typeof P === "function" ? P(cx, cz) : P, cx, cz, ry + (R() - 0.5) * 0.03, w, d, st, R, { shop: R() < (o.shop || 0.5), sign: sg, brick: o.brick && R() < o.brick });
if (h) {
n++;
var fx = cx - nx * (d / 2 + 0.9), fz = cz - nz * (d / 2 + 0.9);
if (o.fronts !== false && R() < (SHK.lite ? 0.25 : 0.55) && !shkstNear(fx, fz, 1) && shkstFree(fx, fz, 1.6, 1, 0, 0.2))
shkstHeap(typeof P === "function" ? P(fx, fz) : P, fx, fz, R);
t += w + 0.05;
}
else
t += 1.5;
}
return n;
},
function (n, x, z, r, R, o) {
o = o || {};
if (SHK.lite)
n = Math.ceil(n * 0.4);
for (var i = 0, got = 0; i < n * 8 && got < n; i++) {
var a = R() * Math.PI * 2, d = Math.sqrt(R()) * r, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (shkSolidAt(px, pz, 0) || shkSolidAt(px + 0.4, pz, 0) || shkSolidAt(px, pz + 0.4, 0) || !(o.bridge || Math.abs(pz) > SHK_RIV + 2) || (o.ok && !o.ok(px, pz)))
continue;
var p = wPerson("shkf_" + SHK.people.length + "_" + i, { look: shkFolkLook(R) });
p.position.set(px, 0, pz);
p.rotation.y = o.face != null ? o.face + (R() - 0.5) * 1.2 : R() * 6.28;
SHK.live.add(p);
shkstPasser(p);
SHK.people.push({ g: p, wander: o.still ? null : { r: o.wr || 4, sp: 0.6 + R() * 0.6 }, ground: 0, vr: SHKST_VR() });
got++;
}
},
function (P, cx, cz, yaw, R, o) {
o = o || {};
var dx = -Math.sin(yaw), dz = -Math.cos(yaw), mud = [], wet = [], lite = SHK.lite;
function at(d, s) { var a = (R() - 0.5) * (o.spread || 1.4); return [cx + (dx * Math.cos(a) - dz * Math.sin(a)) * d, cz + (dz * Math.cos(a) + dx * Math.sin(a)) * d]; }
for (var i = 0; i < (lite ? 25 : 70); i++) {
var q = at(3 + R() * 20);
if (shkSolidAt(q[0], q[1], 0))
continue;
var st = shkBox(P, 0.25 + R() * 0.35, 0.02, 0.04, shkC([0xD8C080, 0xC8B070, 0xB8A060][(R() * 3) | 0]), q[0], 0.075, q[1], R() * 3);
}
if (o.paper)
for (var j = 0; j < (lite ? 4 : 12); j++) {
var q2 = at(3 + R() * 18);
if (shkSolidAt(q2[0], q2[1], 0))
continue;
shkBox(P, 0.3, 0.012, 0.4, shkC(0xEDE2C4), q2[0], 0.07, q2[1], R() * 3);
}
for (var k = 0; k < (lite ? 3 : 8); k++) {
var q3 = at(4 + R() * 18);
mud.push([q3[0], q3[1], 0.5 + R() * 1.2, 0.3 + R() * 0.7, R() * 3]);
}
for (var w = 0; w < (lite ? 1 : 3); w++) {
var q4 = at(6 + R() * 14);
wet.push([q4[0], q4[1], 0.4 + R() * 0.7, 0.3 + R() * 0.4, R() * 3]);
}
var D = SHKST.mud[P.name] || (SHKST.mud[P.name] = { P: P, mud: [], wet: [] });
D.mud.push.apply(D.mud, mud);
D.wet.push.apply(D.wet, wet);
var groups = o.groups == null ? 2 : o.groups;
if (lite)
groups = Math.min(1, groups);
else
groups = Math.min(2, groups);
for (var g = 0; g < groups; g++) {
var q5 = at(7 + R() * 9);
shkstFolk(2 + ((R() * 2) | 0), q5[0], q5[1], 1.6, R, { still: true, ok: function (x, z) { return Math.hypot(x - cx, z - cz) > 5 && !shkstNear(x, z, 0, true); } });
}
},
function (P, x, z, w, d, ry, kind, col) {
var k = "shkstSurf:" + kind + ":" + col, m = SHK.mats[k];
if (!m) {
m = new THREE.MeshLambertMaterial({ color: col, map: shkTexOf(kind) || null });
SHK.mats[k] = m;
}
var g = new THREE.PlaneGeometry(w, d, Math.max(1, Math.ceil(w / 40)), Math.max(1, Math.ceil(d / 40)));
g.rotateX(-Math.PI / 2);
if (m.map && typeof metreUVs === "function")
metreUVs(g, "pln", [w, d]);
var me = new THREE.Mesh(g, m);
me.position.set(x, 0.026, z);
me.rotation.y = ry || 0;
me.userData.keep = 1;
P.add(me);
return me;
},
function (P, x, z, R) {
var st = shkS("stone", 0xC8C0AC), dk = shkS("stone", 0x9A9282), lead = shkC(0x5A6068), gold = shkC(0xC8A040), seg = SHK.lite ? 8 : 8;
shkCyl(P, 2.3, 2.4, 0.25, dk, x, 0.12, z, seg);
shkCyl(P, 2.0, 2.05, 0.85, st, x, 0.65, z, seg);
shkCyl(P, 1.85, 1.85, 0.06, shkC(0x3A4A4E), x, 1.0, z, seg);
shkCyl(P, 0.42, 0.5, 2.6, st, x, 2.2, z, seg);
shkCyl(P, 0.9, 0.6, 0.35, dk, x, 3.55, z, seg);
shkCyl(P, 0.25, 0.3, 0.8, st, x, 4.1, z, seg);
wSph(0.32, gold, x, 4.75, z, P, 8);
if (!SHK.lite)
for (var i = 0; i < 4; i++) {
var a = i * Math.PI / 2 + 0.4, sx = Math.cos(a), sz = Math.sin(a);
var sp = shkBox(P, 0.12, 0.12, 0.8, lead, x + sx * 0.75, 2.7, z + sz * 0.75, -a + Math.PI / 2);
sp.rotation.x = 0.35 * 0;
shkBox(P, 0.05, 1.6, 0.05, shkC(0x8AA0A8), x + sx * 1.15, 1.9, z + sz * 1.15);
}
shkSolidBox(x, z, 4.8, 4.8, 0);
},
function (P, x0, z0, x1, z1, y, R) {
var L = Math.hypot(x1 - x0, z1 - z0), ang = Math.atan2(-(z1 - z0), x1 - x0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
shkBox(P, L, 0.025, 0.025, shkC(0x8A7A5A), cx, y, cz, ang);
var cols = [0xEDE6D6, 0xE0D8C4, 0xC8B898, 0x8A9AB0, 0xB88A7A, 0xE8E0CC, 0x9AA07A], n = SHK.lite ? 3 : Math.max(3, Math.round(L / 1.1)), c = Math.cos(ang), s = Math.sin(ang);
for (var i = 0; i < n; i++) {
var t = -L / 2 + 0.5 + (i + 0.3 + R() * 0.4) * (L - 1) / n, w = 0.45 + R() * 0.5, h = 0.5 + R() * 0.6;
shkBox(P, w, h, 0.02, shkC(cols[(R() * cols.length) | 0]), cx + t * c, y - h / 2 - 0.02, cz - t * s, ang + (R() - 0.5) * 0.15);
}
},
function (P, x, z, out, R, y) {
y = y || 3.4;
var ox = Math.sin(out), oz = Math.cos(out), iron = shkC(0x26221E);
shkBox(P, 0.05, 0.05, 1.25, iron, x + ox * 0.62, y + 0.05, z + oz * 0.62, out);
var br = shkBox(P, 0.04, 0.04, 0.9, iron, x + ox * 0.4, y - 0.25, z + oz * 0.4, out);
br.rotation.x = 0.75;
var col = [0x6A1A1A, 0x2A4A2A, 0x2A3A6A, 0xC8A040, 0x3A2A1A, 0x8A5A2A][(R() * 6) | 0];
shkBox(P, 0.06, 0.62, 0.72, shkC(0x3A2A1A), x + ox * 0.95, y - 0.38, z + oz * 0.95, out + Math.PI / 2 * 0);
shkBox(P, 0.07, 0.52, 0.62, shkC(col), x + ox * 0.95, y - 0.38, z + oz * 0.95, out);
if (!SHK.lite) {
var em = wSph(0.13, shkC([0xC8A040, 0xE8E0CC, 0xB8302A][(R() * 3) | 0]), x + ox * 0.95, y - 0.38, z + oz * 0.95, P, 6);
em.scale.set(1.6, 1, 1.6);
}
},
function (P, x, z, ry, kind, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = shkS("wood", 0x8A6A44), dk = shkS("wood", 0x5A4028);
shkBox(g, 1.5, 0.06, 0.6, wd, 0, 0.72, 0);
[-0.6, 0.6].forEach(function (k) { var t = shkBox(g, 0.05, 0.72, 0.5, dk, k, 0.36, 0); });
shkstGoods(g, kind, 1.4, 0.75, 0, R, SHK.lite ? 3 : 6);
var bk = shkCyl(g, 0.26, 0.2, 0.32, shkS("wood", 0xA8844A), 0.95, 0.16, 0.35, 8);
shkstGoods(g, kind, 0.3, 0.3, 0.35, R, 1);
if (!SHK.lite) {
shkBox(g, 0.55, 0.4, 0.45, wd, -0.95, 0.2, 0.25, 0.3);
var sk = wSph(0.28, shkC(0xB8A07A), -0.3, 0.22, 0.55, g, 7);
sk.scale.set(1, 0.8, 0.8);
}
shkSolidBox(x, z, 2.2, 1.1, ry || 0);
return g;
},
function (P, x, z, ry, R, n) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
for (var i = 0; i < (n || 4); i++) {
var px = (i % 3 - 1) * 1.0 + (R() - 0.5) * 0.3, pz = Math.floor(i / 3) * 0.9 + (R() - 0.5) * 0.2, k = R(), c = shkC([0x5A3A22, 0x3A2418, 0x6A1A1A, 0x2A3A2A][(R() * 4) | 0]);
if (k < 0.6) {
var w = 0.9 + R() * 0.3, h = 0.5 + R() * 0.15;
shkBox(g, w, h, 0.55, c, px, h / 2, pz, (R() - 0.5) * 0.3);
shkBox(g, w + 0.02, 0.06, 0.57, shkC(0x26221E), px, h * 0.25, pz, 0);
shkBox(g, w + 0.02, 0.06, 0.57, shkC(0x26221E), px, h * 0.8, pz, 0);
if (R() < 0.4) {
shkBox(g, 0.7, 0.35, 0.45, shkC(0x7A5A3A), px, h + 0.18, pz, (R() - 0.5) * 0.4);
}
}
else {
var b = wSph(0.38, shkC([0xB8A07A, 0x8A7A5A, 0x6A5A44][(R() * 3) | 0]), px, 0.3, pz, g, 7);
b.scale.set(1.2, 0.75, 0.9);
}
}
shkSolidBox(x, z, 3.4, 2.0, ry || 0);
return g;
},
function (R) {
var P = function (x, z) { return shkSouthPart(x, z); }, lite = SHK.lite, sw = SHK_PLACES.globe;
shkstRow(P, -700, 380, -398, 380, -1, R, { signs: SHKST_INNS, stMin: 2, stMax: 3, shop: 0.55, no: shkstMaidNo });
shkstRow(P, -302, 380, -120, 380, -1, R, { signs: SHKST_INNS, stMin: 2, stMax: 3, shop: 0.55, no: shkstMaidNo });
shkstRow(P, -720, 380, -356, 380, 1, R, { signs: SHKST_INNS, stMin: 2, stMax: 3, shop: 0.6, no: shkstMaidNo });
shkstRow(P, -344, 380, -100, 380, 1, R, { signs: SHKST_INNS, stMin: 2, stMax: 3, shop: 0.6, no: shkstMaidNo });
shkstRow(P, -353, 386, -353, 470, 1, R, { signs: SHKST_INNS, stMin: 2, stMax: 4, shop: 0.6, dMin: 8, dMax: 10 });
shkstRow(P, -347, 386, -347, 470, -1, R, { signs: SHKST_INNS, stMin: 2, stMax: 4, shop: 0.6, dMin: 8, dMax: 10 });
shkstHouse(P(-350, 480), -350, 480, Math.PI, 9, 9, 3, R, { shop: true, sign: ["The Falcon"] });
shkstRow(P, -547, 345, -420, 345, 1, R, { stMin: 2, stMax: 3, shop: 0.3, dMin: 7, dMax: 9, no: shkstMaidNo });
shkstRow(P, -547, 345, -420, 345, -1, R, { stMin: 2, stMax: 3, shop: 0.3, dMin: 8, dMax: 10, no: shkstMaidNo });
shkstMud(SHK.D.bankW, -547, 345, -420, 345, 5, R);
shkstRow(P, -173, 368, -173, 330, -1, R, { stMin: 2, stMax: 3, shop: 0.5, dMin: 8, dMax: 10 });
shkstRow(P, -167, 330, -167, 368, -1, R, { stMin: 2, stMax: 3, shop: 0.5, dMin: 8, dMax: 10 });
var Rr = wRand(16021);
shkstFolk(lite ? 3 : 7, -176, 356, 8, Rr, { wr: 4, ok: function (x, z) { return Math.hypot(x + 194, z - 377) > 8 && !shkstNear(x, z, 0, true); } });
shkstFolk(lite ? 2 : 5, -184, 364, 3.5, Rr, { still: true, ok: function (x, z) { return Math.hypot(x + 194, z - 377) > 8 && !shkstNear(x, z, 0, true); } });
var kinds = ["fruit", "bread", "ale", "cloth", "pots", "gloves", "books", "fish"], bi = 0;
[[-366, 369, Math.PI / 2], [-334, 369, -Math.PI / 2], [-395, 381.4, Math.PI], [-312, 381.4, Math.PI], [-430, 378.6, 0], [-275, 378.6, 0], [-345.4, 410, -Math.PI / 2], [-354.6, 432, Math.PI / 2],
[-497, 381.4, Math.PI], [-545, 381.4, Math.PI], [-575, 381.4, Math.PI], [-470, 378.6, 0], [-171.6, 358, Math.PI / 2], [-168.4, 345, -Math.PI / 2], [-212, 381.4, Math.PI], [-232, 378.6, 0],
[-410, 381.4, Math.PI], [-292, 381.4, Math.PI], [-640, 381.4, Math.PI], [-455, 381.4, Math.PI], [-531, 365, Math.PI / 2], [-540, 358, Math.PI / 2], [-200, 366, 0.5], [-388, 372, Math.PI / 2], [-312, 372, -Math.PI / 2]].forEach(function (b, i) {
if (lite && i % 2)
return;
if (!shkstBoothOk(b[0], b[1], b[2], 3.4, 1.5, -0.4))
return;
shkstBooth(P(b[0], b[1]), b[0], b[1], b[2], R, { kind: kinds[bi++ % kinds.length] });
});
var nb = 0;
for (var mx = -690; mx < -110 && nb < (lite ? 4 : 22); mx += 4.4) {
var sd = R() < 0.5 ? 1 : -1, mz = sd > 0 ? 381.4 : 378.6, mry = sd > 0 ? Math.PI : 0;
if (Math.abs(mx + 350) < 10 || Math.abs(mx + 170) < 6 || R() < 0.35)
continue;
if (!shkstBoothOk(mx, mz, mry, 3.2, 1.5, -0.4))
continue;
shkstBooth(P(mx, mz), mx, mz, mry, R, { kind: kinds[bi++ % kinds.length], w: 3.2 });
nb++;
mx += 4;
}
[[-385, 381, Math.PI / 2], [-470, 382, -Math.PI / 2], [-350, 445, Math.PI], [-560, 380, Math.PI / 2], [-536, 374, Math.PI / 2], [-207, 371, 1.2]].forEach(function (c, i) { if (lite && i > 1)
return; if (shkstNear(c[0], c[1], 3) || !shkstFree(c[0], c[1], 2, 7, c[2], 0.3))
return; shkstCartHorse(P(c[0], c[1]), c[0], c[1], c[2], R); });
[[-322, 382, 0.4], [-352, 398, 2.8], [-188, 372, 1.2], [-528, 383, -1.1]].forEach(function (b, i) { if (lite && i > 1)
return; if (shkstNear(b[0], b[1], 1.5) || !shkstFree(b[0], b[1], 1.2, 2.2, b[2], 0.2))
return; shkstBarrow(P(b[0], b[1]), b[0], b[1], b[2], R, i % 2 ? "fish" : "fruit"); });
shkstMud(SHK.D.bankE, -470, 380, -120, 380, 6, R);
shkstMud(SHK.D.bankW, -720, 380, -470, 380, 6, R);
shkstMud(SHK.D.bankE, -350, 384, -350, 470, 5, R);
shkstMud(SHK.D.bankE, -170, 372, -170, 330, 5, R);
shkstMud(SHK.D.bankE, -372, 356, -372, 378, 9, R);
shkstMud(SHK.D.bankE, -328, 356, -328, 378, 9, R);
shkstMud(SHK.D.bankW, -540, 377, -505, 368, 8, R);
shkstMud(SHK.D.bankE, -200, 378, -178, 350, 8, R);
if (typeof shkElm === "function")
[[-660, 362], [-643, 361], [-578, 361], [-561, 360], [-557, 345], [-557, 300]].forEach(function (t, i) { if (lite && i % 2)
return; if (shkstNear(t[0], t[1], -2) || !shkstFree(t[0], t[1], 1.5, 1.5, 0, 0.2))
return; shkElm(SHK.D.bankW, t[0], t[1], 10 + i % 3 * 2.5, 880 + i); });
shkstSurface(SHK.D.bankE, -350, 365, 44, 26, 0, "paving", 0x8E887C);
[[-343.4, 358.5, -Math.PI / 2, "fruit"], [-343.4, 365.2, -Math.PI / 2, "bread"], [-357.6, 365, Math.PI / 2, "ale"], [-357.6, 371.5, Math.PI / 2, "cloth"], [-343.4, 371.8, -Math.PI / 2, "pots"]].forEach(function (b, i) {
if (lite && i % 2)
return;
if (!shkstBoothOk(b[0], b[1], b[2], 3.2, 1, -0.4))
return;
shkstBooth(SHK.D.bankE, b[0], b[1], b[2], R, { kind: b[3], w: 3.2, keeper: i < 2 ? true : undefined });
});
if (shkstFree(-354.8, 360.5, 1.2, 2.2, 2.9, 0.1) && !shkstNear(-354.8, 360.5, 0))
shkstBarrow(SHK.D.bankE, -354.8, 360.5, 2.9, R, "fruit");
shkstMud(SHK.D.bankE, -350, 354, -350, 378, 6, R, true);
shkstFolk(lite ? 2 : 6, -348.5, 362, 4.5, R, { still: true, ok: function (x, z) { return Math.hypot(x + 351, z - 352) > 5.5 && !shkstNear(x, z, -1, true); } });
shkstSurface(SHK.D.bankW, -516.5, 365, 22, 30, 0, "paving", 0x8A8478);
if (shkstFree(-521, 370.5, 2, 7, Math.PI + 0.3, 0.2) && !shkstNear(-521, 370.5, 2))
shkstCartHorse(SHK.D.bankW, -521, 370.5, Math.PI + 0.3, R);
var b2 = 0;
[[-526.8, 372, Math.PI / 2], [-509, 363, -Math.PI / 2], [-526.8, 364.5, Math.PI / 2], [-514, 357, 0]].forEach(function (b, i) { if (b2 >= (lite ? 1 : 2))
return; if (!shkstBoothOk(b[0], b[1], b[2], 3.2, 1, -0.4))
return; shkstBooth(SHK.D.bankW, b[0], b[1], b[2], R, { kind: i ? "pots" : "fish", w: 3.2, keeper: true }); b2++; });
[[-510.5, 368], [-524.5, 377.6]].forEach(function (h) { if (shkstFree(h[0], h[1], 1.6, 1, 0, 0.1) && !shkstNear(h[0], h[1], 0))
shkstHeap(SHK.D.bankW, h[0], h[1], R); });
shkstMud(SHK.D.bankW, -516, 380, -516, 352, 5, R, true);
shkstFolk(lite ? 2 : 5, -520, 375.5, 4.5, R, { still: true, ok: function (x, z) { return Math.hypot(x + 513, z - 377) > 5; } });
shkstFolk(lite ? 4 : 9, -350, 392, 26, R, { wr: 5, ok: function (x, z) { return z > 374; } });
shkstFolk(lite ? 3 : 7, -350, 368, 12, R, { wr: 3, ok: function (x, z) { return z > 358 && Math.hypot(x + 351, z - 352) > 4; } });
shkstFolk(lite ? 2 : 5, -350, 366, 6, R, { still: true, ok: function (x, z) { return z > 359; } });
shkstFolk(lite ? 1 : 2, -528, 368, 9, R, { still: true, ok: function (x, z) { return Math.hypot(x + 513, z - 377) > 5; } });
shkstFolk(lite ? 2 : 6, -192, 366, 7, R, { still: true, ok: function (x, z) { return Math.hypot(x + 194, z - 377) > 5; } });
shkstFolk(lite ? 2 : 6, -350, 440, 14, R, { wr: 4 });
shkstFolk(lite ? 2 : 3, -560, 384, 40, R, { wr: 6, ok: function (x, z) { return z > 372; } });
shkstFolk(lite ? 3 : 8, -185, 360, 16, R, { wr: 4 });
},
function (R) {
var P = SHK.D.paul, lite = SHK.lite, kinds = ["books", "books", "books", "cloth", "books", "gloves"], k = 0;
for (var x = -389; x <= -309; x += 10) {
if (lite && ((x + 389) / 10) % 2)
continue;
if (shkstNear(x, -449, 0))
continue;
shkstBooth(P, x, -448.75, Math.PI, R, { lean: true, w: 8.2, kind: kinds[k++ % kinds.length] });
}
[-294, -285, -276].forEach(function (x, i) { if (lite && i === 1)
return; if (shkstNear(x, -482, 0))
return; shkstBooth(P, x, -481.7, Math.PI, R, { lean: true, w: 8.0, kind: "books" }); });
for (var b = 0; b < (lite ? 3 : 7); b++) {
var bx = -386 + b * (lite ? 22 : 10.5);
[[-472, 0], [-461, 5]].forEach(function (r, j) {
var bz = r[0], xx = bx + r[1];
if (!shkstBoothOk(xx, bz, Math.PI, 3.2, 1))
return;
shkstBooth(P, xx, bz, Math.PI, R, { kind: b % 3 === 2 ? "gloves" : "books", w: 3.2 });
});
}
[[-312, -485, Math.PI], [-323, -485, Math.PI], [-334, -486, Math.PI], [-301, -487.5, Math.PI]].forEach(function (b, i) { if (lite && i)
return; if (!shkstBoothOk(b[0], b[1], b[2], 3.2, 1))
return; shkstBooth(P, b[0], b[1], b[2], R, { kind: i === 1 ? "gloves" : "books", w: 3.2 }); });
if (!shkstNear(-345, -490, 2) && shkstFree(-345, -490, 2, 7, Math.PI / 2, 0.3))
shkstCartHorse(P, -345, -490, Math.PI / 2, R);
shkstLitter(P, -330, -475, 30, lite ? 30 : 90, R);
shkstFolk(lite ? 2 : 4, -299, -486.5, 3.5, R, { still: true, ok: function (x, z) { return Math.hypot(x + 294, z + 497) > 6; } });
shkstFolk(lite ? 2 : 5, -345, -470, 30, R, { wr: 4 });
shkstFolk(lite ? 2 : 4, -300, -482, 8, R, { still: true, ok: function (x, z) { return Math.hypot(x + 294, z + 497) > 6 && z > -490; } });
shkstFolk(lite ? 2 : 4, -250, -466, 11, R, { still: true, ok: function (x, z) { return Math.hypot(x + 250, z + 482) > 5; } });
},
function (R) {
var P = SHK.D.cityM, lite = SHK.lite, kinds = ["fruit", "cloth", "bread", "pots", "fish", "gloves", "ale"], k = 0;
var cno = function (cx, cz, hw) { return Math.abs(cx + 80) < hw + 3.5 || Math.abs(cx - 100) < hw + 3.5 || Math.abs(cx - 255) < hw + 3.5; };
[1, -1].forEach(function (sd) {
shkstRow(function (x, z) { return shkCityPart(x, z); }, -140, -450, 260, -450, sd, R, { back: 11, stMin: 3, stMax: 4, shop: 0.9, no: cno, wMin: 5, wMax: 7,
signs: ["The Goldsmiths", "The Mercers", "The Golden Key", "The Angel", "The Cross Keys", "The Black Bull", "The Three Cranes"], signP: 0.45 });
});
for (var x = 66; x <= 190; x += (lite ? 14 : 6.5)) {
[[-454.6, 0], [-445.4, Math.PI]].forEach(function (r, j) {
var bx = x + j * 3, bz = r[0];
if (j === 0 && x < 78)
return;
if (!shkstBoothOk(bx, bz, r[1], 3.4, 1))
return;
shkstBooth(P, bx, bz, r[1], R, { kind: kinds[k++ % kinds.length] });
});
}
for (var x2 = 63.5; x2 <= 160; x2 += (lite ? 16 : 6.5)) {
if (!shkstBoothOk(x2, -441.9, Math.PI, 3.2, 1.5, -1.6))
continue;
shkstBooth(P, x2, -441.9, Math.PI, R, { kind: kinds[k++ % kinds.length], w: 3.2 });
}
[[110, -450, Math.PI / 2], [160, -452, -Math.PI / 2]].forEach(function (c, i) { if (lite && i)
return; if (shkstNear(c[0], c[1], 2) || !shkstFree(c[0], c[1], 2, 7, c[2], 0.3))
return; shkstCartHorse(P, c[0], c[1], c[2], R); });
[[92, -447, 1.4], [138, -453, -1.7], [176, -448, 1.6]].forEach(function (b, i) { if (lite && i)
return; if (!shkstFree(b[0], b[1], 1.2, 2.2, b[2], 0.2))
return; shkstBarrow(P, b[0], b[1], b[2], R, i % 2 ? "bread" : "fruit"); });
shkstMud(P, 72, -450, 240, -450, 8, R, true);
shkstLitter(P, 130, -450, 60, lite ? 20 : 60, R);
shkstFolk(lite ? 6 : 16, 125, -450, 50, R, { wr: 4, ok: function (x, z) { return Math.abs(z + 450) < 4; } });
shkstFolk(lite ? 3 : 10, 76, -446, 12, R, { wr: 2, ok: function (x, z) { return z > -452 && z < -440 && x > 62; } });
[[51.9, -443.3, "fruit"], [65.7, -443.3, "cloth"], [72.8, -443.3, "bread"], [45.2, -443.3, "pots"]].forEach(function (b, i) {
if (lite && i % 2)
return;
if (!shkstBoothOk(b[0], b[1], Math.PI, 3.2, -1, -1.6))
return;
shkstBooth(P, b[0], b[1], Math.PI, R, { kind: b[2], w: 3.2, keeper: i < 2 ? true : undefined });
});
if (shkstFree(58.6, -441.4, 1.2, 2.2, 1.5, 0.1))
shkstBarrow(P, 58.6, -441.4, 1.5, R, "fruit");
shkstFolk(lite ? 3 : 8, 51, -446.2, 5, R, { still: true, ok: function (x, z) { return z > -448.5 && z < -444.6 && Math.hypot(x - 42, z + 449) > 5 && !shkstNear(x, z, -3, true); } });
shkstMud(P, 44, -444, 80, -444, 4, R, true);
var Rc = wRand(16032), kc = 0;
[[34.5, -462], [12, -471], [18.5, -471], [25, -471.5], [5.5, -471]].forEach(function (b, i) { if (lite && i % 2)
return; if (!shkstBoothOk(b[0], b[1], 0, 3.2, 1))
return; shkstBooth(P, b[0], b[1], 0, Rc, { kind: ["cloth", "pots", "fish", "gloves"][kc++ % 4], w: 3.2 }); });
SHKST.n.cheapN = kc;
if (shkstFree(84, -458, 2, 7, Math.PI / 2, 0.3) && !shkstNear(84, -458, 2))
shkstCartHorse(P, 84, -458, Math.PI / 2, Rc);
[[30, -466, 0.6], [21, -466.5, -0.8]].forEach(function (b, i) { if (lite && i)
return; if (!shkstFree(b[0], b[1], 1.2, 2.2, b[2], 0.2) || shkstNear(b[0], b[1], 1))
return; shkstBarrow(P, b[0], b[1], b[2], Rc, i ? "bread" : "fruit"); });
[[15, -467], [28, -468.5]].forEach(function (h, i) { if (lite && i)
return; if (shkstFree(h[0], h[1], 1.6, 1, 0, 0) && !shkstNear(h[0], h[1], 1))
shkstHeap(P, h[0], h[1], Rc); });
shkstFolk(lite ? 3 : 8, 20, -468, 6, Rc, { still: true, ok: function (x, z) { return Math.hypot(x - 42, z + 449) > 6 && !shkstNear(x, z, 0, true); } });
shkstFolk(lite ? 2 : 6, 24, -464, 9, Rc, { wr: 3, ok: function (x, z) { return Math.hypot(x - 42, z + 449) > 6 && !shkstNear(x, z, 0, true); } });
shkstMud(P, 4, -466, 36, -466, 3, Rc, true);
shkstLitter(P, 20, -467, 10, lite ? 6 : 18, Rc);
if (shkstFree(0, -460, 2, 7, Math.PI / 2, 0.3) && !shkstNear(0, -460, 2))
shkstCartHorse(P, 0, -460, Math.PI / 2, Rc);
},
function (R) {
var P = SHK.D.river, lite = SHK.lite, bx = SHK_BRIDGE;
[[bx - 8.6, -32.5], [bx - 8.6, -27.5]].forEach(function (b, i) { if (lite && i)
return; if (!shkstFree(b[0], b[1], 3.4, 1.9, Math.PI / 2, 0.02))
return; shkstBooth(P, b[0], b[1], Math.PI / 2, R, { kind: i ? "fish" : "fruit", w: 3.4 }); });
shkstHeap(P, bx + 7.5, -33, R);
if (!lite)
shkstHeap(P, bx + 8.2, -26, R);
shkstCartHorse(P, bx - 1.6, -14, Math.PI, R);
if (!lite)
shkstBarrow(P, bx + 1.8, -52, 0.1, R, "fish");
shkstMud(P, bx, -108, bx, 108, 4, R, true);
shkstFolk(lite ? 2 : 4, bx - 4, -34, 2.6, R, { still: true, bridge: 1, ok: function (x, z) { return Math.hypot(x - 257, z + 39) > 4.5; } });
shkstFolk(lite ? 3 : 6, bx - 3, -30, 7, R, { still: true, bridge: 1, ok: function (x, z) { return Math.abs(x - bx) < 10 && z > -36 && z < -24; } });
shkstFolk(lite ? 2 : 6, bx, -60, 40, R, { wr: 3, bridge: 1, ok: function (x, z) { return Math.abs(x - bx) < 2.4; } });
},
function (R) {
var P = SHK.D.borough, lite = SHK.lite;
shkstMud(P, 255, 115, 255, 640, 4.5, R, true);
var D = (typeof EVB_WD !== "undefined" && EVB_WD[SHK_KEY]) || [];
function clearOfDoor(x, z, r) { for (var i = 0; i < D.length; i++) {
if (Math.abs(D[i].x - x) < 2.5 && Math.abs(D[i].z - z) < r)
return false;
} return true; }
[[291.5, 4.8], [284.2, 5.2], [276.4, 4.7], [268.2, 5.1], [259.5, 4.9]].forEach(function (w, i) { if (lite && i % 2)
return; shkstWashing(P, 252.75, w[0], 257.25, w[0] + (R() - 0.5) * 0.8, w[1], R); });
[[252.6, 292.6, Math.PI / 2], [257.4, 285.6, -Math.PI / 2], [252.6, 279.2, Math.PI / 2], [257.4, 273.8, -Math.PI / 2], [252.6, 266.2, Math.PI / 2], [257.4, 260.4, -Math.PI / 2]].forEach(function (g, i) { if (lite && i % 2)
return; shkstHangSign(P, g[0], g[1], g[2], R, 3.05); });
[[253.35, 291.6, Math.PI / 2, "cloth"], [256.65, 285.5, -Math.PI / 2, "pots"], [253.35, 278.6, Math.PI / 2, "bread"], [256.65, 268.0, -Math.PI / 2, "fruit"], [253.35, 272.6, Math.PI / 2, "gloves"]].forEach(function (g, i) {
if (lite && i > 1)
return;
if (!clearOfDoor(g[0], g[1], 1.7) || !shkstFree(g[0], g[1], 1.6, 0.6, g[2], 0.02))
return;
shkstSpill(P, g[0], g[1], g[2], g[3], R);
});
if (shkstFree(255.3, 281.5, 1.2, 2.2, 0.12, 0.05))
shkstBarrow(P, 255.3, 281.5, 0.12, R, "fish");
shkstMud(P, 255, 300, 255, 258, 2.6, R);
shkstFolk(lite ? 2 : 6, 255, 282, 12, R, { wr: 2, ok: function (x, z) { return Math.abs(x - 255) < 1.8 && z > 266 && z < 294; } });
shkstFolk(lite ? 1 : 3, 255, 287, 4, R, { still: true, ok: function (x, z) { return Math.abs(x - 255) < 1.7 && z < 293; } });
if (shkstFree(254.5, 262, 2, 7, Math.PI, 0.1))
shkstCartHorse(P, 254.5, 262, Math.PI, R);
[[256.8, 238, 0.1], [253.5, 206, 3.0]].forEach(function (b, i) { if (lite && i)
return; if (!shkstFree(b[0], b[1], 1.2, 2.2, b[2], 0.1))
return; shkstBarrow(P, b[0], b[1], b[2], R, i ? "bread" : "fruit"); });
for (var z = 150; z < 290; z += (lite ? 22 : 9)) {
[-1, 1].forEach(function (k) { var x = 255 + k * 2.4, zz = z + (R() - 0.5) * 4; if (shkstNear(x, zz, 0) || !shkstFree(x, zz, 1.4, 1, 0, 0))
return; shkstHeap(P, x, zz, R); });
}
shkstFolk(lite ? 3 : 8, 255, 215, 40, R, { wr: 4, ok: function (x, z) { return Math.abs(x - 255) < 2.6 && z < 262; } });
},
function (R) {
var P = SHK.D.west, lite = SHK.lite, W = SHK_PLACES.whitehall, brick = shkS("brick", 0xB86A4A), stone = shkS("stone", 0xD0C8B4), glass = shkC(0x3A4654);
var pv = shkPlane(P, 96, 74, shkS("paving", 0xA8A090).clone(), -1090, 0.05, -262);
var pg = new THREE.PlaneGeometry(96, 74, 8, 6);
pg.rotateX(-Math.PI / 2);
if (typeof metreUVs === "function")
metreUVs(pg, "pln", [96, 74]);
pv.geometry.dispose();
pv.geometry = pg;
pv.material.polygonOffset = true;
pv.material.polygonOffsetFactor = -3;
pv.material.polygonOffsetUnits = -12;
pv.userData.keep = 1;
function range(cx, cz, w, d, h, ry, name) {
shkBox(P, w, h, d, brick, cx, h / 2, cz, ry);
var rf = shkRoof(P, d, w, 5, shkS("tile", 0xA05A3E), brick, cx, h, cz, (ry || 0) + Math.PI / 2, 0.3);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
for (var i = -w / 2 + 3; i < w / 2 - 1; i += 4.5)
for (var f = 0; f < (h > 9 ? 2 : 1); f++) {
var px = cx + i * c + (d / 2 + 0.05) * s, pz = cz - i * s + (d / 2 + 0.05) * c;
shkBox(P, 1.6, 2.2, 0.2, glass, px, 3 + f * 4.2, pz, ry);
shkBox(P, 2, 0.25, 0.3, stone, px, 1.75 + f * 4.2, pz, ry);
}
shkSolidBox(cx, cz, w, d, ry || 0);
if (name)
shkEvbDoor(cx, cz, ry || 0, d / 2, "tudorpalace", "Whitehall Palace: " + name);
}
if (shkstFree(-1052, -262, 10, 52, 0, 0))
range(-1052, -262, 52, 10, 11, -Math.PI / 2, "the Tiltyard gallery");
if (shkstFree(-1107, -306, 20, 9, 0, 0))
range(-1107, -306, 20, 9, 10, 0, null);
var cx = -1122, cz = -264, cg = new THREE.Group();
cg.position.set(cx, 0, cz);
cg.rotation.y = Math.PI / 2;
P.add(cg);
shkBox(cg, 1.6, 1.3, 2.6, shkS("wood", 0x3A2418), 0, 1.6, 0);
shkBox(cg, 1.7, 0.1, 2.8, shkC(0xC8A040), 0, 2.3, 0);
shkBox(cg, 1.5, 0.5, 2.4, shkC(0x6A1A1A), 0, 2.55, 0);
[[-0.85, -0.9, 0.7], [0.85, -0.9, 0.7], [-0.85, 1.0, 0.5], [0.85, 1.0, 0.5]].forEach(function (w) { var wh = shkCyl(cg, w[2], w[2], 0.1, shkS("wood", 0x4A3420), w[0], w[2], w[1], 12); wh.rotation.z = Math.PI / 2; });
shkBox(cg, 0.1, 0.1, 2.6, shkS("wood", 0x4A3420), -0.35, 0.75, 2.4);
shkBox(cg, 0.1, 0.1, 2.6, shkS("wood", 0x4A3420), 0.35, 0.75, 2.4);
shkSolidBox(cx, cz, 3, 2.2, Math.PI / 2);
shkstHorse(P, cx + 4.6, cz - 0.7, Math.PI / 2, R);
shkstHorse(P, cx + 4.6, cz + 0.7, Math.PI / 2, R);
var groom = { layer: "tunic", layerColor: 0x2A3A2A, top: 0xD8D0B8, bottom: 0x3A2A1A, shoeKind: "boots" }, yeoman = { layer: "tunic", layerColor: 0xA82A2A, top: 0xA82A2A, bottom: 0x1A1A1A, hat: "beret", hatColor: 0x1A1A1A };
shkstStand(cx + 6.6, cz - 2.2, -Math.PI / 2, groom, R);
shkstStand(cx - 1.5, cz + 2.2, 0, groom, R);
[[-1083, -292], [-1083, -308], [-1096, -292]].forEach(function (p, i) { if (lite && i)
return; shkstStand(p[0], p[1], -Math.PI / 2, yeoman, R); });
if (!lite) {
shkstHorse(P, -1061, -240, Math.PI, R);
shkstHorse(P, -1064, -280, 0.2, R);
shkBox(P, 1.4, 0.9, 1.4, stone, -1064, 0.45, -272);
shkSolidBox(-1064, -272, 1.4, 1.4, 0);
}
if (shkstFree(-1080, -232, 2, 7, Math.PI, 0.3))
shkstCartHorse(P, -1080, -232, Math.PI, R);
SHKST.n.conduit = "none";
[[-1108, -268.5], [-1106, -271], [-1110, -266], [-1104, -268]].some(function (c) { if (!shkstFree(c[0], c[1], 4.8, 4.8, 0, 0.2) || shkstNear(c[0], c[1], 2))
return false; shkstConduit(P, c[0], c[1], R); SHKST.n.conduit = c.join(","); return true; });
[[-1110, -273.2], [-1107.6, -273.6], [-1100, -276]].forEach(function (p, i) { if (lite && i > 1)
return; shkstStand(p[0], p[1], -Math.PI / 2 + 0.25, yeoman, R); });
shkstFolk(lite ? 2 : 4, -1116, -268.5, 2.6, R, { still: true, ok: function (x, z) { return !shkstNear(x, z, 0); } });
shkstFolk(lite ? 2 : 4, -1098, -281, 3, R, { still: true, face: -2.2, ok: function (x, z) { return !shkstNear(x, z, 0); } });
if (shkstFree(-1117, -261.5, 3.4, 2, 0.35, 0.1))
shkstTrunks(P, -1117, -261.5, 0.35, R, lite ? 3 : 5);
if (!lite && shkstFree(-1093, -266, 2, 7, Math.PI / 2, 0.2)) {
shkstCartHorse(P, -1093, -266, Math.PI / 2, R);
shkstTrunks(P, -1093.4, -266, Math.PI / 2, R, 3).position.y = 1.0;
}
if (shkstFree(-1112, -257, 3, 1, 0, 0.1)) {
shkBox(P, 2.8, 0.6, 0.9, shkS("stone", 0xB0A894), -1112, 0.3, -257);
shkBox(P, 2.6, 0.05, 0.7, shkC(0x3A4A4E), -1112, 0.58, -257);
shkSolidBox(-1112, -257, 2.8, 0.9, 0);
}
if (shkstFree(-1124, -272.5, 3.4, 2, -0.4, 0.1) && !shkstNear(-1124, -272.5, 0))
shkstTrunks(P, -1124, -272.5, -0.4, R, lite ? 2 : 4);
shkstFolk(lite ? 2 : 4, -1127.5, -268.5, 2.2, R, { still: true, face: 1.6, ok: function (x, z) { return Math.hypot(x + 1139, z + 268) > 6 && !shkstNear(x, z, 0); } });
shkstFolk(lite ? 2 : 4, -1106, -276, 14, R, { wr: 5, ok: function (x, z) { return x > -1128 && x < -1062 && z > -298 && z < -232 && !shkstNear(x, z, 0); } });
shkstFolk(lite ? 1 : 2, -1120, -276, 5, R, { still: true, ok: function (x, z) { return !shkstNear(x, z, 0); } });
},
function () {
SHKST.R = wRand(16001);
SHKST.mud = {};
SHKST.pass = [];
try {
shkstWfWrap();
}
catch (e) { }
SHKST.avoid = shkstAvoidList();
SHKST.n = { booth: 0, house: 0, nearNo: 0, solidNo: 0, people: SHK.people.length };
var R = SHKST.R;
[["bankside", shkstBankside], ["pauls", shkstPauls], ["cheapside", shkstCheapside], ["bridge", shkstBridge], ["borough", shkstBorough], ["whitehall", shkstWhitehall]].forEach(function (s) {
try {
s[1](R);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] streets " + s[0], e);
}
});
try {
[[SHK.D.bankE, -351, 352, 3.534, { groups: 2 }], [SHK.D.bankW, -513, 377, 1.178, { groups: 1 }], [SHK.D.bankE, -194, 377, 5.890, { groups: 2 }], [SHK.D.paul, -294, -497, 2.749, { groups: 2, paper: 1 }],
[SHK.D.cityM, 42, -449, 4.320, { groups: 3 }], [SHK.D.river, 257, -39, 2.356, { groups: 0, spread: 0.8 }], [SHK.D.borough, 255, 298, 0, { groups: 1, spread: 0.3 }], [SHK.D.west, -1139, -268, 5.105, { groups: 1 }]].forEach(function (v) {
shkstViewDress(v[0], v[1], v[2], v[3], SHKST.R, v[4]);
});
}
catch (e) {
if (window.console)
console.warn("[shakespeare] standpoints", e);
}
try {
shkstMudBuild();
}
catch (e) {
if (window.console)
console.warn("[shakespeare] mud", e);
}
SHKST.n.people = SHK.people.length - SHKST.n.people;
}
];
});
