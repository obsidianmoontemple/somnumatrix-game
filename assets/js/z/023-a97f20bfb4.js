/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(23, function () {
"use strict";
return [
function (x, text, maxW, maxLines, big, small, weight, face) {
var size = big, lines = [text];
for (; size >= small; size -= 2) {
x.font = weight + " " + size + "px " + face;
lines = [];
var line = "";
String(text).split(/\s+/).forEach(function (w) {
var t = line ? line + " " + w : w;
if (x.measureText(t).width > maxW && line) {
lines.push(line);
line = w;
}
else
line = t;
});
if (line)
lines.push(line);
if (lines.length <= maxLines && lines.every(function (l) { return x.measureText(l).width <= maxW; }))
break;
}
if (lines.length > maxLines) {
lines = lines.slice(0, maxLines);
lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, "…");
}
return { size: Math.max(size, small), lines: lines };
},
function (text) {
var key = "s|" + text;
if (SIGN_TEX[key])
return SIGN_TEX[key];
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#15161B";
x.fillRect(0, 0, 512, 128);
x.strokeStyle = "#4A463C";
x.lineWidth = 6;
x.strokeRect(3, 3, 506, 122);
x.fillStyle = "#E2D6BC";
var F = fitLines(x, String(text), 480, 2, 64, 24, "400", "Georgia, serif");
x.font = "400 " + F.size + "px Georgia, serif";
x.textAlign = "center";
x.textBaseline = "middle";
var lh = F.size * 1.08, y0 = 66 - (F.lines.length - 1) * lh / 2;
F.lines.forEach(function (l, i) { x.fillText(l, 256, y0 + i * lh); });
var tex = new THREE.CanvasTexture(c);
tex.anisotropy = 4;
SIGN_TEX[key] = tex;
return tex;
},
function (title, note) {
var key = "b|" + title + "|" + (note || "");
if (SIGN_TEX[key])
return SIGN_TEX[key];
var c = document.createElement("canvas");
c.width = 384;
c.height = 160;
var x = c.getContext("2d");
x.fillStyle = "#EAE2CC";
x.fillRect(0, 0, 384, 160);
x.strokeStyle = "#6A5A40";
x.lineWidth = 5;
x.strokeRect(4, 4, 376, 152);
x.fillStyle = "#2A2018";
x.textAlign = "center";
x.textBaseline = "middle";
var hasNote = !!(note && String(note).trim());
var T = fitLines(x, String(title), 350, hasNote ? 1 : 3, hasNote ? 40 : 48, hasNote ? 16 : 18, "700", "Georgia, serif");
if (hasNote && T.lines[0].slice(-1) === "\u2026")
T = fitLines(x, String(title), 350, 2, 30, 16, "700", "Georgia, serif");
x.font = "700 " + T.size + "px Georgia, serif";
var lh = T.size * 1.1, top = hasNote ? 14 + lh / 2 : 80 - (T.lines.length - 1) * lh / 2;
T.lines.forEach(function (l, i) { x.fillText(l, 192, top + i * lh); });
if (hasNote) {
var y = top + T.lines.length * lh + 2;
x.fillStyle = "#7A6A50";
x.fillRect(60, y - 4, 264, 2);
var room = Math.max(1, Math.floor((150 - y) / 17));
var N = fitLines(x, String(note), 356, room, 17, 11, "400", "Georgia, serif");
x.font = "400 " + N.size + "px Georgia, serif";
x.fillStyle = "#3A3024";
N.lines.forEach(function (l, i) { x.fillText(l, 192, y + 8 + N.size / 2 + i * N.size * 1.2); });
}
var tex = new THREE.CanvasTexture(c);
tex.anisotropy = 4;
SIGN_TEX[key] = tex;
return tex;
},
function (ax, az, bx2, bz2) {
var k1 = [ax, az, bx2, bz2].map(Math.round).join(","), k2 = [bx2, bz2, ax, az].map(Math.round).join(",");
if (drawnEdges[k1] || drawnEdges[k2])
return;
drawnEdges[k1] = 1;
var dx = bx2 - ax, dz = bz2 - az, len = Math.sqrt(dx * dx + dz * dz);
if (len < 1)
return;
var ns = Math.abs(dz) > Math.abs(dx);
if (ns)
len = Math.max(1, len - STREET);
var sg = new THREE.PlaneGeometry(STREET, len);
metreUVs(sg, "pln", [STREET, len]);
var inRealm = typeof realmAtX === "function" ? realmAtX(ax) : null, rt = inRealm ? realmTemplate(inRealm) : null;
var detail = landOpt("detail"), at = detail && !rt ? texOf("asphalt") : (detail && rt ? texOf(rt.kind === "mirror" ? "paving" : (rt.tex || "paving")) : null);
var m = new THREE.Mesh(sg, new THREE.MeshLambertMaterial({ color: rt ? rt.path : (at ? 0x55575C : ROLE.road), map: at || null }));
m.rotation.x = -Math.PI / 2;
m.rotation.z = -Math.atan2(dx, dz);
m.position.set(ax + dx / 2, 0.02, az + dz / 2);
m.receiveShadow = true;
m.userData.street = 1;
m.userData.realmPath = !!rt;
scene.add(m);
var dash = detail && !rt ? texOf("dash") : null;
if (dash) {
var lg = new THREE.PlaneGeometry(0.28, len);
metreUVs(lg, "pln", [0.28, len]);
var line = new THREE.Mesh(lg, new THREE.MeshLambertMaterial({ map: dash, transparent: true, alphaTest: 0.4,
color: 0xE8E0C0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }));
line.rotation.copy ? line.rotation.copy(m.rotation) : null;
line.position.set(ax + dx / 2, 0.05, az + dz / 2);
line.renderOrder = 1;
line.userData.street = 1;
line.userData.dash = 1;
scene.add(line);
}
}
];
});
