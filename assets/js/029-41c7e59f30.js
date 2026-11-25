/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WINSTYLES = ["square", "arched", "round", "tall", "shuttered", "stained", "barred", "boarded", "none"];
var DOORSTYLES = ["plain", "arched", "double", "round", "barn", "iron", "glass"];
var FRAME_DEFAULT = 0xE6E0D2, DOOR_DEFAULT = 0x5A3A22, SHUTTER_DEFAULT = 0x2F5A3A;
var JEWEL = [0xA8322B, 0x2F5E9E, 0xC7A043, 0x3F7A3A, 0x5E3A7E, 0xC8662A];
function bodyOf(parts) {
var best = null, bv = 0;
parts.forEach(function (pt) {
if (pt.g !== "box" || pt.glow || pt.rep)
return;
var s = pt.s;
if (pt.p[1] - s[1] / 2 > 0.6)
return;
var v = s[0] * s[1] * s[2];
if (v > bv) {
bv = v;
best = pt;
}
});
if (!best)
return null;
return { w: best.s[0], h: best.s[1], d: best.s[2], x: best.p[0], z: best.p[2] };
}
function hasWindows(def) { return def.parts.some(function (pt) { return pt.c === "glass" && !pt.glow; }); }
function doorLike(pt) { return pt.c === "dark" && pt.g === "box" && !pt.rep && pt.p[1] - pt.s[1] / 2 < 0.3 && pt.s[1] < 9 && pt.s[0] < 6 && pt.s[2] <= 0.6 && pt.s[1] > 1.2; }
function frontDoorOf(parts) { var best = null; parts.forEach(function (pt) { if (doorLike(pt) && (!best || pt.p[2] > best.p[2]))
best = pt; }); return best; }
function isFrontDoor(pt, B, parts) { return doorLike(pt) && (!parts || frontDoorOf(parts) === pt); }
function redrawsFront(spec) { var a = spec.attrs || {}; return a.ws !== undefined; }
function restylesDoor(spec) { var a = spec.attrs || {}; return a.ds !== undefined || a.dc !== undefined; }
var OP_DUMMY = null;
function instanced(geom, mat, list) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geom, mat, list.length);
OP_DUMMY = OP_DUMMY || new THREE.Object3D();
OP_DUMMY.rotation.order = "YXZ";
list.forEach(function (t, i) {
OP_DUMMY.position.set(t[0], t[1], t[2]);
OP_DUMMY.rotation.set(t[4] || 0, t[3] || 0, t[5] || 0);
OP_DUMMY.scale.set(1, 1, 1);
OP_DUMMY.updateMatrix();
im.setMatrixAt(i, OP_DUMMY.matrix);
if (t[6] !== undefined && im.setColorAt)
im.setColorAt(i, new THREE.Color(t[6]));
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
return im;
}
function addOpenings(g, spec, def, parts, f, opa) {
if (def.cat !== "structure")
return;
var a = spec.attrs || {}, B = bodyOf(parts);
if (!B)
return;
var style = a.ws || "square";
var wantWin = style !== "none" && (hasWindows(def) || a.ws !== undefined);
var door = frontDoorOf(parts);
var doorX = door ? door.p[0] : B.x, doorW = door ? door.s[0] : 1.1, doorH = door ? door.s[1] : 2.2, doorZ = door ? door.p[2] + door.s[2] / 2 : B.z + B.d / 2;
if (wantWin) {
var faces = [];
if (a.ws !== undefined)
faces.push({ n: "front" });
if (a.sw !== false)
faces.push({ n: "back" }, { n: "left" }, { n: "right" });
var W = style === "tall" ? 1 : 1.2, H = style === "tall" ? 2.4 : style === "round" ? 1.2 : 1.4;
var rowsAt = [];
var storey = 3.2;
if (B.h < 4.2)
rowsAt.push(Math.min(B.h * 0.55, B.h - 1));
else
for (var y = 1.8; y < B.h - 1.1 && rowsAt.length < 40; y += storey)
rowsAt.push(y);
var spots = [];
faces.forEach(function (F) {
var along = (F.n === "front" || F.n === "back") ? B.w : B.d;
var cols = Math.max(1, Math.min(12, Math.floor((along - 2.4) / 3.2) + 1));
var span = (cols - 1) * 3.2;
for (var c = 0; c < cols; c++) {
var u = -span / 2 + c * 3.2;
rowsAt.forEach(function (ry, ri) {
if (F.n === "front" && ri === 0 && Math.abs((B.x + u) - doorX) < doorW / 2 + 0.75)
return;
var x, z, ry2;
if (F.n === "front") {
x = B.x + u;
z = B.z + B.d / 2;
ry2 = 0;
}
else if (F.n === "back") {
x = B.x - u;
z = B.z - B.d / 2;
ry2 = Math.PI;
}
else if (F.n === "left") {
x = B.x - B.w / 2;
z = B.z + u;
ry2 = -Math.PI / 2;
}
else {
x = B.x + B.w / 2;
z = B.z - u;
ry2 = Math.PI / 2;
}
spots.push({ x: x, y: ry, z: z, r: ry2 });
});
}
});
function at(sp, out, upY) {
return [sp.x + Math.sin(sp.r) * out, sp.y + (upY || 0), sp.z + Math.cos(sp.r) * out, sp.r];
}
var frameCol = a.wf !== undefined ? a.wf : FRAME_DEFAULT;
var frameMat = new THREE.MeshLambertMaterial({ color: frameCol, transparent: opa < 0.99, opacity: opa });
var lit = style !== "boarded";
var glassMat = new THREE.MeshBasicMaterial({ color: style === "boarded" ? 0x15171B : 0x3A4654, transparent: true, opacity: 0.94, side: THREE.DoubleSide, map: (style !== "boarded" && typeof winPaneTex === "function") ? winPaneTex(style === "stained") : null });
if (lit) {
if (!g.userData.glass)
g.userData.glass = [];
g.userData.glass.push(glassMat);
}
var fr = [], gl = [], top = [], topFr = [], sh = [], bars = [], planks = [];
spots.forEach(function (sp, i) {
if (style === "round") {
fr.push(at(sp, .03).concat([0]));
gl.push(at(sp, .07));
return;
}
fr.push(at(sp, .03));
gl.push(style === "stained" ? at(sp, .07).concat([0, 0, JEWEL[i % JEWEL.length]]) : at(sp, .07));
if (style === "arched" || style === "stained") {
topFr.push(at(sp, .03, H / 2));
top.push(style === "stained" ? at(sp, .07, H / 2).concat([0, 0, JEWEL[(i + 2) % JEWEL.length]]) : at(sp, .07, H / 2));
}
if (style === "shuttered") {
[-1, 1].forEach(function (sd) { var p = at(sp, .06); p[0] += Math.cos(sp.r) * sd * (W / 2 + .34); p[2] -= Math.sin(sp.r) * sd * (W / 2 + .34); sh.push(p); });
}
if (style === "barred") {
[-.35, 0, .35].forEach(function (o) { var p = at(sp, .12); p[0] += Math.cos(sp.r) * o * W; p[2] -= Math.sin(sp.r) * o * W; bars.push(p); });
}
if (style === "boarded") {
[.5, -.5].forEach(function (t) { var p = at(sp, .13); p.push(0, t); planks.push(p); });
}
});
var parts2 = [];
if (style === "round") {
parts2.push(instanced(new THREE.CylinderGeometry(H / 2 + .12, H / 2 + .12, .06, 18), frameMat, fr.map(function (p) { return [p[0], p[1], p[2], p[3], Math.PI / 2]; })));
parts2.push(instanced(new THREE.CylinderGeometry(H / 2, H / 2, .05, 18), glassMat, gl.map(function (p) { return [p[0], p[1], p[2], p[3], Math.PI / 2]; })));
}
else {
parts2.push(instanced(new THREE.BoxGeometry(W + .22, H + .22, .06), frameMat, fr));
parts2.push(instanced(new THREE.BoxGeometry(W, H, .05), glassMat, gl));
if (top.length) {
parts2.push(instanced(new THREE.CylinderGeometry(W / 2 + .11, W / 2 + .11, .06, 16, 1, false, Math.PI / 2, Math.PI), frameMat, topFr.map(function (p) { return [p[0], p[1], p[2], p[3], Math.PI / 2]; })));
parts2.push(instanced(new THREE.CylinderGeometry(W / 2, W / 2, .05, 16, 1, false, Math.PI / 2, Math.PI), glassMat, top.map(function (p) { return [p[0], p[1], p[2], p[3], Math.PI / 2, 0, p[6]]; })));
}
if (sh.length)
parts2.push(instanced(new THREE.BoxGeometry(.6, H + .1, .06), new THREE.MeshLambertMaterial({ color: a.wf !== undefined ? a.wf : SHUTTER_DEFAULT }), sh));
if (bars.length)
parts2.push(instanced(new THREE.BoxGeometry(.05, H, .05), new THREE.MeshLambertMaterial({ color: 0x2A2C30 }), bars));
if (planks.length)
parts2.push(instanced(new THREE.BoxGeometry(W * 1.15, .18, .05), new THREE.MeshLambertMaterial({ color: 0x7A5A3A }), planks));
}
parts2.forEach(function (m) { if (m) {
m.userData.openings = 1;
g.add(m);
} });
}
var dcol = a.dc !== undefined ? a.dc : DOOR_DEFAULT, dstyle = a.ds || "plain";
function makeDoor(x, z, ry, w, h) {
var dg = new THREE.Group();
dg.position.set(x, 0, z);
dg.rotation.y = ry;
dg.userData.openings = 1;
var mat = new THREE.MeshLambertMaterial({ color: dstyle === "iron" && a.dc === undefined ? 0x2E3036 : dcol });
if (dstyle === "double")
w = Math.max(w * 1.7, 2);
if (dstyle === "barn") {
w = Math.max(w * 2.2, 2.6);
h = Math.max(h * 1.3, 2.8);
}
if (dstyle === "round") {
var r = Math.max(w, h) * 0.5;
dg.add(P(new THREE.CylinderGeometry(r, r, .12, 24), mat, 0, r, .08, Math.PI / 2));
dg.add(P(new THREE.SphereGeometry(.07, 8, 6), mL(GOLD), 0, r, .18));
return dg;
}
if (dstyle === "glass") {
var gm = new THREE.MeshBasicMaterial({ color: 0x3A4654, transparent: true, opacity: .9 });
if (!g.userData.glass)
g.userData.glass = [];
g.userData.glass.push(gm);
dg.add(P(new THREE.BoxGeometry(w + .14, h + .08, .1), mat, 0, h / 2, .06));
dg.add(P(new THREE.BoxGeometry(w - .1, h - .12, .06), gm, 0, h / 2, .12));
return dg;
}
dg.add(P(new THREE.BoxGeometry(w, h, .12), mat, 0, h / 2, .08));
if (dstyle === "arched")
dg.add(P(new THREE.CylinderGeometry(w / 2, w / 2, .12, 16, 1, false, Math.PI / 2, Math.PI), mat, 0, h, .08, Math.PI / 2));
if (dstyle === "double")
dg.add(P(new THREE.BoxGeometry(.04, h, .02), mL(0x1A1A1E), 0, h / 2, .15));
if (dstyle === "barn") {
dg.add(P(new THREE.BoxGeometry(Math.hypot(w, h) * .92, .14, .03), mL(shade(dcol, .2)), 0, h / 2, .16, 0, 0, Math.atan2(h, w)));
dg.add(P(new THREE.BoxGeometry(Math.hypot(w, h) * .92, .14, .03), mL(shade(dcol, .2)), 0, h / 2, .16, 0, 0, -Math.atan2(h, w)));
}
if (dstyle === "iron")
for (var r2 = 0; r2 < 4; r2++)
for (var c2 = 0; c2 < 3; c2++)
dg.add(P(new THREE.SphereGeometry(.035, 6, 4), mL(0x6A6C72), (c2 - 1) * w * .3, h * (.2 + r2 * .2), .16));
dg.add(P(new THREE.SphereGeometry(.06, 8, 6), mL(GOLD), w * .32, h * .48, .18));
return dg;
}
if (door && restylesDoor(spec))
g.add(makeDoor(doorX, doorZ, 0, doorW, doorH));
(a.doors || []).forEach(function (side) {
var dw = doorW, dh = Math.min(doorH, B.h - .4);
if (side === "back")
g.add(makeDoor(B.x, B.z - B.d / 2, Math.PI, dw, dh));
if (side === "left")
g.add(makeDoor(B.x - B.w / 2, B.z, -Math.PI / 2, dw, dh));
if (side === "right")
g.add(makeDoor(B.x + B.w / 2, B.z, Math.PI / 2, dw, dh));
if (side === "front" && !door)
g.add(makeDoor(B.x, B.z + B.d / 2, 0, dw, dh));
});
}
function openingsFrom(seg) { return __ZC(29, 0, this, arguments, new.target); }
var PART_KEY = { tower: "tc", towers: "tc", turret: "tc", turrets: "tc", spire: "tc", spires: "tc", steeple: "tc", steeples: "tc",
minaret: "tc", minarets: "tc", dome: "mc", domes: "mc", roof: "rc", roofs: "rc", rooftops: "rc", wall: "c", walls: "c",
door: "dc", doors: "dc", gate: "dc", gates: "dc" };
var PART_ALONE = { tower: "tower", towers: "tower", turret: "tower", turrets: "tower", spire: "tower", spires: "tower", steeple: "tower", steeples: "tower", minaret: "tower", minarets: "tower" };
function partColoursIn(low) { return __ZC(29, 1, this, arguments, new.target); }
var OWNED_DOOR = /\b(with|its|their|has|had|front|back|side|double|arched|round|iron|steel|glass|barn|oak|wooden|studded|a|an)\s+([a-z]+\s+){0,2}$/;
function facadeFrom(seg, inside) { return __ZC(29, 2, this, arguments, new.target); }
