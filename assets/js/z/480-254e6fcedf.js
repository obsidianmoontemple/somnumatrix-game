/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(480, function () {
return [
function (grp, x, z, ry, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = vrnSurf("wood", 0x4A2A16, 1);
vrnBoxM(2.4, 0.9, 0.7, wood, 0, 0.45, 0, g);
vrnBoxM(2.4, 1.3, 0.5, wood, 0, 1.55, -0.1, g);
var gl = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.2), vceMat(0xC8D8E0, { op: 0.25 }));
gl.position.set(0, 1.55, 0.16);
g.add(gl);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 7; c++) {
var col = [0xC8B898, 0x6A8A9A, 0xE8D8C8, 0x8A3A2A, 0x3A3A3A, 0xD8C048, 0x9A6AB8, 0xF0F0F0][(R() * 8) | 0];
var m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06 + R() * 0.05, 0), vceMat(col, { shine: 60 }));
m.position.set(-1 + c * 0.33, 1.05 + r * 0.38, -0.05);
g.add(m);
}
vrnSolid({ x: x, z: z, hw: 1.3, hd: 0.5 });
return g;
},
function (G) {
var H = VCE_HOME, y = VRN_TOWN.y, g = new THREE.Group();
g.position.set(H.x, y, H.z);
G.add(g);
var brick = vrnSurf("brick", 0x9A5A40, 1.5), stone = vrnSurf("stone", 0xD8D0C0, 2), wood = vrnSurf("wood", 0x3A2A1E, 1.5), white = vceMat(0xEDE6D6);
vrnBoxM(16, 16, 14, brick, 0, 8, 0, g);
for (var s = 0; s < 6; s++)
vrnBoxM(16 - s * 2.6, 1.6, 14.2, brick, 0, 16.8 + s * 1.6, 0, g);
[-1, 1].forEach(function (k) { wBox(0.5, 26, 0.5, stone, k * 8, 13, 7.1, g); });
for (var f = 0; f < 4; f++)
wBox(16.2, 0.3, 0.2, stone, 0, 4 + f * 4, 7.1, g);
for (var r = 0; r < 4; r++)
for (var c = 0; c < 3; c++) {
if (r === 0 && c === 1)
continue;
var wx = -5 + c * 5, wy = 2 + r * 4 + 0.4;
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.4), vceMat(0x3A4A58, { e: r === 0 ? 0x2A1A08 : 0x000000, ei: 0.4, shine: 80 }));
w.position.set(wx, wy, 7.06);
g.add(w);
wBox(1.9, 0.18, 0.25, white, wx, wy - 1.3, 7.1, g);
wBox(1.9, 0.18, 0.25, white, wx, wy + 1.3, 7.1, g);
wBox(0.1, 2.4, 0.08, white, wx, wy, 7.08, g);
}
vrnBoxM(2.2, 3.2, 0.3, wood, 0, 1.9, 7.05, g);
wBox(2.8, 0.3, 0.4, stone, 0, 3.6, 7.15, g);
for (var st = 0; st < 3; st++)
vrnBoxM(3.6 - st * 0.4, 0.18, 1.4 - st * 0.35, stone, 0, 0.09 + st * 0.18, 7.7 - st * 0.18, g);
wSph(0.08, vrnBrass(), 0.7, 1.8, 7.25, g, 8);
var pl = wSign(["No. 19", "Prof. Otto Lidenbrock"], 1.4, 0.5, "#B8902A", "#1A1208");
pl.position.set(-1.6, 2, 7.12);
g.add(pl);
var sn = wSign(["KÖNIGSTRASSE"], 4, 0.6, "#1E2A3A", "#E8E0C8");
sn.position.set(6, 4.6, 7.15);
g.add(sn);
vrnSolid({ x: H.x, z: H.z, hw: 8, hd: 7, h: 30, b: y });
var lp = wGlow(0xFFE0A0, 3, 0.35);
lp.position.set(0, 3.6, 7.6);
g.add(lp);
vrnSpot(H.door.x, H.door.z + 0.6, 3, "No. 19 Königstrasse, the Professor's house", "go in", function () {
var S = store.vcentre;
if (VBK_BK !== "earth" || !S || !S.started || S.done) {
vbkOpen("earth");
return;
}
vrnEnter("vce_house");
}, y);
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1863), wall = vrnSurf("plaster", 0xE2D6B8, 2), pan = vrnSurf("wood", 0x5A3A22, 2), floor = vrnSurf("wood", 0x7A5432, 3), tile = vrnSurf("stone", 0xC8BCA8, 2);
vrnInFloor(grp, X, Z, 48, 32, 0, floor);
vrnBoxM(48, 0.2, 32, vceMat(0xEDE6D4), X, 4.2, Z, grp);
vceWallP(grp, X - 24, Z - 16, X + 24, Z - 16, 4.2, wall);
vceWallP(grp, X - 24, Z + 16, X + 24, Z + 16, 4.2, wall, [[24, 2, 2.8]]);
vceWallP(grp, X - 24, Z - 16, X - 24, Z + 16, 4.2, wall);
vceWallP(grp, X + 24, Z - 16, X + 24, Z + 16, 4.2, wall);
vceWallP(grp, X - 5, Z - 16, X - 5, Z + 16, 4.2, wall, [[8, 1.8, 2.6], [24, 1.8, 2.6]]);
vceWallP(grp, X + 5, Z - 16, X + 5, Z + 16, 4.2, wall, [[8, 1.8, 2.6], [24, 1.8, 2.6]]);
vceWallP(grp, X - 24, Z, X - 5, Z, 4.2, wall, [[10, 1.8, 2.6]]);
vceWallP(grp, X + 5, Z, X + 24, Z, 4.2, wall, [[10, 1.8, 2.6]]);
[[-24, -16, 24, -16], [-24, 16, 24, 16], [-24, -16, -24, 16], [24, -16, 24, 16]].forEach(function (w) { var l = Math.hypot(w[2] - w[0], w[3] - w[1]), a = Math.atan2(w[3] - w[1], w[2] - w[0]), m = vrnBoxM(l, 1.1, 0.06, pan, X + (w[0] + w[2]) / 2, 0.55, Z + (w[1] + w[3]) / 2, grp); m.rotation.y = -a; });
[-18, -11, 11, 18].forEach(function (wx) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.4), vceMat(0xB8C8D8, { e: 0x8A9AB0, ei: 0.6 }));
w.position.set(X + wx, 2.2, Z + 15.84);
w.rotation.y = Math.PI;
grp.add(w);
vrnBoxM(2.2, 0.3, 0.4, pan, X + wx, 0.95, Z + 15.7, grp);
for (var p = 0; p < 3; p++) {
wCyl(0.14, 0.11, 0.24, vceMat(0xA85A3A), X + wx - 0.6 + p * 0.6, 1.22, Z + 15.6, grp, 8);
wSph(0.18, vceMat([0xE84A6A, 0xF0E040, 0xC86AE8][p]), X + wx - 0.6 + p * 0.6, 1.48, Z + 15.6, grp, 6);
}
});
var lamps = [[-14, -8], [-14, 8], [0, 0], [14, -8], [14, 8]];
lamps.forEach(function (l) { var g = wGlow(0xFFE8B8, 5, 0.3); g.position.set(X + l[0], 3.8, Z + l[1]); grp.add(g); wCyl(0.25, 0.1, 0.4, vrnBrass(), X + l[0], 3.9, Z + l[1], grp, 8); });
for (var s = 0; s < 12; s++)
vrnBoxM(3, 0.2, 0.5, pan, X, 0.1 + s * 0.33, Z - 14 + s * 0.5, grp);
vrnSolid({ x: X, z: Z - 11, hw: 1.6, hd: 3 });
wCyl(0.04, 0.05, 1.9, pan, X + 3.8, 0.95, Z + 14.2, grp, 6);
var st = wCyl(0.025, 0.025, 1.1, vrnSurf("wood", 0x8A6A3A, 1), X + 4.4, 0.55, Z + 15.2, grp, 5);
st.rotation.z = 0.15;
vrnRug(grp, X, Z + 4, 3.4, 16, 0x6A2A2A);
vrnRug(grp, X + 14, Z + 8, 12, 8, 0x3A4A6A);
for (var c = 0; c < 5; c++)
vceCase(grp, X + 7 + c * 3.4, Z + 15.2, Math.PI, R);
for (var c2 = 0; c2 < 3; c2++)
vceCase(grp, X + 23.2, Z + 3 + c2 * 3.6, -Math.PI / 2, R);
vrnTable(grp, X + 14, Z + 7, 3.2, 1.6, 0, 0x4A2A16);
vrnChair(grp, X + 14, Z + 5.6, 0, 0x5A2A1A);
for (var n = 0; n < 6; n++) {
var pp = wBox(0.42, 0.01, 0.3, vceMat(0xEDE6D4), X + 13 + n * 0.4, 0.86, Z + 7 + (n % 2) * 0.2, grp);
pp.rotation.y = n * 0.4;
}
var bk = wBox(0.5, 0.12, 0.36, vceMat(0x6A3A1E), X + 15, 0.92, Z + 7.2, grp);
var inkw = wCyl(0.06, 0.07, 0.1, vceMat(0x141414), X + 12.8, 0.92, Z + 7.4, grp, 8);
vrnShelf(grp, X + 12, Z + 0.6, 5, Math.PI, 3.6);
vrnShelf(grp, X + 19, Z + 0.6, 5, Math.PI, 3.6);
var globe = wSph(0.45, vceMat(0x8AA8B8), X + 21, 1.5, Z + 12, grp, 16);
wCyl(0.05, 0.08, 1, pan, X + 21, 0.5, Z + 12, grp, 6);
vrnSpot(X + 14, Z + 8.4, 2.6, "The Professor's desk", "look at what is on the desk", function () { setStatus("📚 Papers in heaps, a lens, an ink-well, the hammer; and a little old book in brown calf, its corners worn, that the Professor bought this very morning from Hevelius the Jew."); }, 0);
vrnSpot(X + 12, Z + 14, 2.6, "The cases of minerals", "look at the minerals", function () { worldCard(VRN_H + "💎 The study</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>" + QE("That study of his was a museum, and nothing else. Specimens of everything known in mineralogy lay there in their places in perfect order, and correctly named, divided into inflammable, metallic, and lithoid minerals.") + "</div>", {}); }, 0);
vrnTable(grp, X - 14, Z + 8, 4, 2, 0, 0x5A3420);
[[-15.5, 6.4, 0], [-12.5, 6.4, 0], [-15.5, 9.6, Math.PI], [-12.5, 9.6, Math.PI], [-17.4, 8, Math.PI / 2]].forEach(function (c) { vrnChair(grp, X + c[0], Z + c[1], c[2], 0x4A2A1A); });
for (var d = 0; d < 4; d++) {
wCyl(0.2, 0.2, 0.02, vceMat(0xF2EEE4), X - 15.2 + d * 0.9, 0.86, Z + 8, grp, 12);
}
wCyl(0.12, 0.16, 0.36, vceMat(0xD8D0C0), X - 14, 1.02, Z + 8, grp, 10);
vrnShelf(grp, X - 14, Z + 0.6, 6, Math.PI, 2.4);
var clk = wBox(0.8, 2.2, 0.5, pan, X - 23.4, 1.1, Z + 12, grp);
var cf = new THREE.Mesh(new THREE.CircleGeometry(0.3, 16), vceMat(0xF2EEE4));
cf.position.set(X - 23.12, 1.7, Z + 12);
cf.rotation.y = Math.PI / 2;
grp.add(cf);
vrnSpot(X - 14, Z + 9.6, 2.6, "The dining table", "sit down to dinner", function () { setStatus("🍽️ The table is laid for three: the Professor, Axel and Gräuben. Martha's soup, her veal, her prunes. When the Professor is hungry, he is terrible."); }, 0);
vrnInFloor(grp, X - 14.5, Z - 8, 19, 16, 0.01, tile);
vrnBoxM(4, 1, 1.2, vrnMetal(0x2A2A2A), X - 20, 0.5, Z - 15, grp);
var fire = wGlow(0xFF9A4A, 3, 0.4);
fire.position.set(X - 20, 0.7, Z - 14.2);
grp.add(fire);
wCyl(0.25, 0.25, 3, vrnMetal(0x2A2A2A), X - 21, 2.6, Z - 15.4, grp, 8);
for (var cp = 0; cp < 6; cp++) {
var pan2 = wCyl(0.2 + cp * 0.03, 0.2 + cp * 0.03, 0.18, vceMat(0xC87A3A, { shine: 90, spec: 0xFFC080 }), X - 17 + cp * 0.7, 2.6, Z - 15.7, grp, 12);
pan2.rotation.x = Math.PI / 2;
}
vrnTable(grp, X - 14, Z - 9, 3, 1.4, 0, 0xB89A6A);
for (var v = 0; v < 5; v++)
wSph(0.1, vceMat([0xE8A040, 0x8AB84A, 0xD84A3A, 0xE8D8A8, 0x6A3A8A][v]), X - 15 + v * 0.5, 0.92, Z - 9, grp, 6);
vrnBoxM(1, 1, 0.6, vceMat(0x6A6A6A), X - 9, 0.5, Z - 15.3, grp);
var pump = wCyl(0.08, 0.08, 1, vrnMetal(0x3A3A3A), X - 9, 1.4, Z - 15.3, grp, 6);
vrnSpot(X - 14, Z - 7.4, 2.6, "Martha's kitchen", "see what is cooking", function () { setStatus("🥘 The range is hot; the copper shines; Martha's dinner waits, as it always waits, for the Professor."); }, 0);
vrnSpot(X - 9, Z - 14.2, 2.2, "The kitchen door to the street", "try the door", function () { setStatus("🚪 Locked. And the big key is gone."); }, 0);
vrnBoxM(1.8, 0.6, 3.6, vceMat(0xF0EAE0), X + 21, 0.6, Z - 12, grp);
vrnBoxM(2, 1.2, 0.2, pan, X + 21, 0.9, Z - 14, grp);
vrnTable(grp, X + 14, Z - 14.6, 2.2, 1, 0, 0x5A3A22);
vrnChair(grp, X + 14, Z - 13.4, Math.PI, 0x4A2A1A);
vrnShelf(grp, X + 9, Z - 15.6, 3, 0, 2.6);
var fr = vrnBoxM(0.8, 1, 0.06, vrnBrass(), X + 17, 2.2, Z - 15.86, grp);
wBox(0.62, 0.82, 0.02, vceMat(0xD8C8A8), X + 17, 2.2, Z - 15.82, grp);
vrnSpot(X + 17, Z - 14.4, 2.4, "Axel's room", "rest a while", function () { setStatus("🛏️ Axel's room: his books of mineralogy, a little bed, and Gräuben's portrait. Through the wall, his uncle's pacing never stops."); }, 0);
vrnSpot(X, Z + 15, 2.6, "The front door", "go out into the Königstrasse", function () { vrnLeave("vce_house"); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1752), brick = vrnSurf("brick", 0x9A5A40, 2), stone = vrnSurf("stone", 0xD8D0C0, 2), dark = vceMat(0x2A2A2E, { shine: 40 }), gold = vceMat(0xD8B040, { shine: 90, spec: 0xFFE080, e: 0x3A2A00, ei: 0.3 });
vrnInFloor(grp, X, Z, 400, 400, 0, vrnSurf("stone", 0xB8B0A4, 6));
for (var h = 0; h < (VRN.lite ? 60 : 140); h++) {
var a = R() * 6.28, r = 40 + R() * 150, hx = X + Math.cos(a) * r, hz = Z + Math.sin(a) * r;
if (Math.abs(hz - Z - 60) < 10)
continue;
var hw = 6 + R() * 8, hh = 8 + R() * 8;
vrnBoxM(hw, hh, 6 + R() * 5, vceMat([0xC8B8A0, 0xD8C8A8, 0xB86A4A, 0xE8D8B8, 0xA8B8A8][h % 5]), hx, hh / 2, hz, grp);
var rf = wCone(hw * 0.72, 4, vceMat(h % 4 ? 0x8A3A2A : 0x5A9A8A), hx, hh + 2, hz, grp, 4);
rf.rotation.y = Math.PI / 4;
}
var canal = new THREE.Mesh(new THREE.PlaneGeometry(400, 12), vrnWaterMat(0x3A5A6A, 0.95));
canal.rotation.x = -Math.PI / 2;
canal.position.set(X, 0.05, Z + 60);
grp.add(canal);
var sound = new THREE.Mesh(new THREE.PlaneGeometry(400, 120), vrnWaterMat(0x2A4A62, 0.95));
sound.rotation.x = -Math.PI / 2;
sound.position.set(X, 0.04, Z - 190);
grp.add(sound);
vrnBoxM(12, 40, 12, brick, X, 20, Z, grp);
vrnSolid({ x: X, z: Z, hw: 6, hd: 6, h: 40 });
for (var b = 0; b < 5; b++)
wBox(12.4, 0.4, 12.4, stone, X, 6 + b * 8, Z, grp);
[[0, 6.05, 0], [6.05, 0, Math.PI / 2], [0, -6.05, Math.PI], [-6.05, 0, -Math.PI / 2]].forEach(function (s) { for (var k = 0; k < 3; k++) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3), vceMat(0x1A2A34));
w.position.set(X + s[0] + (s[2] === 0 || s[2] === Math.PI ? (k - 1) * 3 : 0), 12 + k * 9, Z + s[1] + (s[2] === Math.PI / 2 || s[2] === -Math.PI / 2 ? (k - 1) * 3 : 0));
w.rotation.y = s[2];
grp.add(w);
} });
var door = vrnBoxM(2.4, 4, 0.2, vrnSurf("wood", 0x3A2A1E, 1), X, 2, Z + 6.1, grp);
vrnBoxM(16, 0.4, 16, stone, X, 40, Z, grp);
vrnFloor(X, Z, 8, 8, 40.2, { inside: 1 });
[[-8, -8, 8, -8], [-8, 8, 8, 8], [-8, -8, -8, 8], [8, -8, 8, 8]].forEach(function (w) { vlgRail(grp, X + w[0], Z + w[1], X + w[2], Z + w[3], 40.2, 1.1, gold); });
var spire = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 5, 46, VRN.lite ? 8 : 16), dark);
spire.position.set(X, 40 + 23, Z);
grp.add(spire);
var top = wSph(0.9, gold, X, 86.6, Z, grp, 12);
var fig = wCyl(0.25, 0.4, 2.6, gold, X, 88.4, Z, grp, 8);
var N = VRN.lite ? 60 : 150;
for (var k = 0; k < N; k++) {
var t = k / N, ang = t * Math.PI * 7, y = 41 + t * 44, rr = 5.4 - t * 4.4 + 0.9, sx = X + Math.cos(ang) * rr, sz = Z + Math.sin(ang) * rr;
var stp = wBox(1.1, 0.1, 0.5, gold, sx, y, sz, grp);
stp.rotation.y = -ang;
if (k % 3 === 0)
wCyl(0.03, 0.03, 1, gold, X + Math.cos(ang) * (rr + 0.55), y + 0.5, Z + Math.sin(ang) * (rr + 0.55), grp, 4);
}
[[48, 6.6], [62, 4.6], [75, 3], [85.4, 1.4]].forEach(function (p, i) { vrnFloor(X + p[1] + 0.4, Z, 1.2, 1.2, p[0], { inside: 1 }); wBox(1.6, 0.12, 1.6, gold, X + p[1] + 0.4, p[0] - 0.06, Z, grp); });
vrnSpot(X, Z + 7, 3, "The door of the tower", "climb the stair inside the tower", function () { vrnMove(X + 5, Z + 6.6, 0, "🗼 <b>The gallery of the tower</b>, forty metres up. Over it, the spire, and the stair winding round the outside of it.", 40.2); }, 0);
vrnSpot(X + 5, Z + 7.2, 2.2, "The stair down inside the tower", "go down", function () { vrnMove(X, Z + 9, Math.PI, null, 0); }, 40.2);
vrnSpot(X + 6.6, Z + 1.2, 2.2, "The foot of the outside stair", "begin the climb round the spire", function () { vceClimb(0); }, 40.2);
VCE.spire = { x: X, z: Z, stops: [[48, 6.6], [62, 4.6], [75, 3], [85.4, 1.4]] };
var flp = wCyl(0.05, 0.05, 5, vceMat(0xF2F2F2), X + 7.6, 42.5, Z + 7.6, grp, 5);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), vceDannebrog());
fl.position.set(X + 8.8, 44.2, Z + 7.6);
grp.add(fl);
},
function () {
if (VCE.flag)
return VCE.flag;
var c = document.createElement("canvas");
c.width = 74;
c.height = 56;
var x = c.getContext("2d");
x.fillStyle = "#C8102E";
x.fillRect(0, 0, 74, 56);
x.fillStyle = "#FFFFFF";
x.fillRect(22, 0, 8, 56);
x.fillRect(0, 24, 74, 8);
VCE.flag = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.DoubleSide });
return VCE.flag;
},
function (i) {
var S = VCE.spire;
if (!S)
return;
var p = S.stops[i];
if (!p) {
vrnMove(S.x + 5, S.z + 6.6, 0, "🗼 Back on the gallery of the tower. Solid stone under your feet again.", 40.2);
return;
}
vrnMove(S.x + p[1] + 0.4, S.z, null, ["🌀 The first turn. The rail is the only thing between you and the roofs.", "🌀 The second turn. The spire narrows; the wind pulls at your coat.", "🌀 The third turn. The stair is hardly wider than a foot.", "🌟 <b>The top.</b> The golden ball by your hand, the whole of Copenhagen and the Sound under you, and Sweden over the water."][i], p[0]);
VCE.climb = i;
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1863);
vlgSea(grp, X, Z, -2.4, 400);
var sk = vlgShipModel({ L: 32, B: 8, D: 4, funnel: false, ports: false, masts: [6, -7], mh: 22, flag: false, hull: 0x2A2018, band: 0x8A7A5A });
sk.position.set(X, -1.2, Z);
grp.add(sk);
I.ship = sk;
vrnFloor(X, Z, 14, 3.3, 0, { inside: 1 });
var canvas = vceMat(0xEDE4CC, { ds: true });
[[6, 14], [-7, 15]].forEach(function (m) { var sl = new THREE.Mesh(new THREE.PlaneGeometry(9, m[1]), canvas); sl.position.set(X + m[0] - 4.6, m[1] / 2 + 2, Z); grp.add(sl); });
var jib = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(X + 7, 20, Z), new THREE.Vector3(X + 22, 3, Z), new THREE.Vector3(X + 8, 2.5, Z)]), canvas);
jib.geometry.computeVertexNormals();
grp.add(jib);
vrnBoxM(5, 1.6, 4, vrnSurf("wood", 0x6A4A2A, 2), X - 11, 0.8, Z, grp);
vrnSolid({ x: X - 11, z: Z, hw: 2.6, hd: 2.1 });
for (var s = 0; s < 8; s++)
vrnBoxM(0.9, 0.6, 0.7, vceMat(0x3A3A34), X + 2 + (s % 4) * 1.1, 0.3, Z - 2 + ((s / 4) | 0) * 1.2, grp);
var wh = new THREE.Group();
wh.position.set(X - 14, 1.3, Z);
grp.add(wh);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 5, 18), vrnSurf("wood", 0x6A4A2A, 1));
rim.rotation.y = Math.PI / 2;
wh.add(rim);
vrnSpot(X - 11, Z + 2.6, 2.4, "The narrow cabin", "go below", function () { setStatus("🛏️ " + QE("On the 2nd, at six in the evening, all our precious baggage being safely on board the _Valkyria,_ the captain took us into a very narrow cabin.")); }, 0);
vrnSpot(X - 14, Z + 1.2, 2.2, "The schooner's wheel", "look at the compass", function () { setStatus("🧭 North-north-west for the Faroes, and on to Iceland."); }, 0);
I.coast = new THREE.Group();
grp.add(I.coast);
for (var c = 0; c < 9; c++) {
var hl = vlgHill(20 + R() * 30, 14 + R() * 20, R);
hl.position.set(X - 60 + c * 18, -2.4, Z - 170 - R() * 10);
I.coast.add(hl);
}
var sn = new THREE.Mesh(new THREE.ConeGeometry(36, 40, VRN.lite ? 10 : 20), vceMat(0x6A6A6A));
sn.position.set(X + 60, 16, Z - 180);
I.coast.add(sn);
var cap = new THREE.Mesh(new THREE.ConeGeometry(14, 15, VRN.lite ? 10 : 20), vceMat(0xF4F4F8, { shine: 30 }));
cap.position.set(X + 60, 30.5, Z - 180);
I.coast.add(cap);
I.coast.visible = false;
I.coast.userData.keep = 1;
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1863);
vrnInFloor(grp, X, Z, 300, 200, 0, vrnSurf("stone", 0x5A5650, 5));
vlgSea(grp, X, Z + 150, -1, 300);
var grass = vceMat(0x5A7A3A);
vrnBoxM(80, 1.2, 6, vrnSurf("stone", 0x4A4640, 2), X, -0.5, Z + 66, grp);
for (var b = 0; b < 4; b++) {
var bt = vrnBoxM(6, 0.8, 2, vrnSurf("wood", 0x6A4A2A, 1), X - 30 + b * 14, -0.6, Z + 74, grp);
}
function house(hx, hz, w, d, col, ry, turf) {
var g = new THREE.Group();
g.position.set(X + hx, 0, Z + hz);
g.rotation.y = ry || 0;
grp.add(g);
vrnBoxM(w, 3.2, d, vrnSurf("wood", col, 1.5), 0, 1.6, 0, g);
var rf = new THREE.Mesh(vrnPitchGeo(w, d, 2, 0.4), turf ? grass : vceMat(0x3A3A3A));
rf.position.y = 3.2;
g.add(rf);
for (var k = 0; k < Math.max(1, (w / 3) | 0); k++) {
var wn = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), vceMat(0xE8E0C8, { e: 0x3A3020, ei: 0.3 }));
wn.position.set(-w / 2 + 1.5 + k * 3, 1.9, d / 2 + 0.02);
g.add(wn);
}
vrnBoxM(1, 2, 0.1, vceMat(0x2A2A2A), w / 2 - 1.2, 1, d / 2 + 0.03, g);
vrnSolid({ x: X + hx, z: Z + hz, hw: (Math.abs(Math.cos(ry || 0)) > 0.5 ? w : d) / 2, hd: (Math.abs(Math.cos(ry || 0)) > 0.5 ? d : w) / 2 });
return g;
}
for (var i = 0; i < 12; i++) {
var cols = [0x2A2420, 0xC8B8A0, 0x8A3A2A, 0x3A5A6A, 0xE8E0C8, 0x6A6A3A];
house(-70 + i * 12, 30, 9, 6, cols[i % 6], 0, i % 3 === 0);
house(-70 + i * 12, 10, 9, 6, cols[(i + 3) % 6], Math.PI, i % 2 === 0);
}
for (var j = 0; j < 6; j++)
house(-60 + j * 16, -40, 10, 6, [0x2A2420, 0xC8B8A0, 0x8A3A2A][j % 3], 0, 1);
vrnBoxM(22, 7, 11, vrnSurf("plaster", 0xE8E4DA, 2), X + 40, 3.5, Z - 12, grp);
var cr = new THREE.Mesh(vrnPitchGeo(22, 11, 4, 0.4), vceMat(0x5A3A2A));
cr.position.set(X + 40, 7, Z - 12);
grp.add(cr);
vrnBoxM(4, 8, 4, vrnSurf("plaster", 0xE8E4DA, 2), X + 29, 9, Z - 12, grp);
wCone(3.2, 4, vceMat(0x3A3A3A), X + 29, 15, Z - 12, grp, 4);
vrnSolid({ x: X + 38, z: Z - 12, hw: 12, hd: 6 });
vrnSpot(X + 40, Z - 5.6, 3, "The cathedral", "look at it", function () { setStatus("⛪ The cathedral of Reykjavik: a plain stone church, whitewashed, with a red-tiled roof the wind has been at. On Sundays the whole town comes."); }, 0);
var FX = X - 40, FZ = Z - 70;
vrnInFloor(grp, FX, FZ, 20, 14, 0.02, vrnSurf("wood", 0x7A5432, 2));
var pw = vrnSurf("wood", 0x6A4A2A, 1.5);
vceWallP(grp, FX - 10, FZ - 7, FX + 10, FZ - 7, 3.4, pw);
vceWallP(grp, FX - 10, FZ + 7, FX + 10, FZ + 7, 3.4, pw, [[6, 1.6, 2.4]]);
vceWallP(grp, FX - 10, FZ - 7, FX - 10, FZ + 7, 3.4, pw);
vceWallP(grp, FX + 10, FZ - 7, FX + 10, FZ + 7, 3.4, pw);
vceWallP(grp, FX, FZ - 7, FX, FZ + 7, 3.4, pw, [[7, 1.6, 2.4]]);
var rf2 = new THREE.Mesh(vrnPitchGeo(20, 14, 3, 0.5), grass);
rf2.position.set(FX, 3.4, FZ);
grp.add(rf2);
vrnTable(grp, FX - 5, FZ, 3, 1.6, 0, 0x5A3A22);
[[-6.4, -1.2, 0], [-3.6, -1.2, 0], [-6.4, 1.2, Math.PI], [-3.6, 1.2, Math.PI]].forEach(function (c) { vrnChair(grp, FX + c[0], FZ + c[1], c[2], 0x4A2A1A); });
for (var d = 0; d < 4; d++)
wCyl(0.18, 0.18, 0.02, vceMat(0xF2EEE4), FX - 6 + d * 0.7, 0.86, FZ, grp, 10);
var lmp = wGlow(0xFFE0A0, 4, 0.35);
lmp.position.set(FX - 5, 3, FZ);
grp.add(lmp);
vrnSpot(FX - 5, FZ + 1.6, 2.6, "Mr Fridriksson's table", "sit down to dinner", function () { setStatus("🍽️ Fish, a little mutton, and long talk in Latin: Mr Fridriksson, teacher of natural science, is the kindest of hosts."); }, 0);
for (var sh = 0; sh < 4; sh++) {
vrnShelf(grp, FX + 3 + sh * 1.6, FZ - 6.6, 1.5, 0, 2.6);
}
vrnSpot(FX + 5, FZ - 4, 2.6, "The shelves of the library", "look for Saknussemm's books", function () { setStatus("📚 Old books, Icelandic and Danish, mostly in a sad state; most of the thousands the library owns are lent out round the island. Saknussemm's? Not one."); }, 0);
var snf = new THREE.Mesh(new THREE.ConeGeometry(40, 46, VRN.lite ? 10 : 20), vceMat(0x5A5A60));
snf.position.set(X - 60, 20, Z + 290);
grp.add(snf);
var cap = new THREE.Mesh(new THREE.ConeGeometry(16, 18, VRN.lite ? 10 : 20), vceMat(0xF4F4F8));
cap.position.set(X - 60, 36, Z + 290);
grp.add(cap);
for (var m = 0; m < 7; m++) {
var hl = vlgHill(30 + R() * 30, 20 + R() * 25, R);
hl.position.set(X - 140 + m * 45, 0, Z - 140);
grp.add(hl);
}
vrnSpot(X, Z + 62, 3, "The landing-place", "look out over the bay", function () { setStatus("🌊 Faxa Bay, grey and calm. Far to the north, across the water: a white cone. Snaefell."); }, 0);
vrnSpot(X + 120, Z, 3, "The road north", "set out for Snaefell", function () { var O = VRN_IN.vce_reyk.out; vrnMove(O[0], O[1], O[2], O[3]); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(64), turf = vrnSurf("stone", 0x4A5A34, 3), lava = vrnSurf("stone", 0x2A2826, 2), wood = vrnSurf("wood", 0x6A4A2A, 2), dark = vrnSurf("wood", 0x3A2A1A, 2);
vrnInFloor(grp, X, Z, 240, 80, 0, vrnSurf("stone", 0x3A3428, 4));
function home(hx, smith) {
var cx = X + hx;
vceWallP(grp, cx - 18, Z - 10, cx + 18, Z - 10, 3, lava);
vceWallP(grp, cx - 18, Z + 10, cx + 18, Z + 10, 3, lava, [[18, 1.6, 2.2]]);
vceWallP(grp, cx - 18, Z - 10, cx - 18, Z + 10, 3, lava);
vceWallP(grp, cx + 18, Z - 10, cx + 18, Z + 10, 3, lava);
vceWallP(grp, cx - 6, Z - 10, cx - 6, Z + 10, 3, dark, [[14, 1.4, 2.1]]);
vceWallP(grp, cx + 6, Z - 10, cx + 6, Z + 10, 3, dark, [[14, 1.4, 2.1]]);
var rf = new THREE.Mesh(vrnPitchGeo(37, 21, 2.6, 0.6), turf);
rf.position.set(cx, 3, Z);
grp.add(rf);
for (var t = 0; t < 8; t++)
wBox(0.2, 0.2, 21, dark, cx - 16 + t * 4.5, 3.1, Z, grp);
for (var b = 0; b < 6; b++) {
[-1, 1].forEach(function (s) { vrnBoxM(1.6, 0.6, 3.2, vceMat(0xA89A7A), cx - 17 + b * 1.9, 0.5, Z + s * 8.2, grp); wBox(1.5, 0.12, 3, vceMat([0x6A2A2A, 0x3A4A6A, 0x5A6A3A][b % 3]), cx - 17 + b * 1.9, 0.86, Z + s * 8.2, grp); });
}
var hearth = vrnBoxM(2, 0.6, 2, lava, cx, 0.3, Z, grp);
var fire = wGlow(0xFF8A3A, 4, 0.45);
fire.position.set(cx, 0.9, Z);
grp.add(fire);
vrnSolid({ x: cx, z: Z, hw: 1, hd: 1 });
var smoke = wCyl(0.6, 0.6, 0.4, vceMat(0x8A8A88, { op: 0.3 }), cx, 2.9, Z, grp, 8);
vrnBoxM(1.8, 0.6, 3.4, vceMat(0xD8D0C0), cx + 10, 0.5, Z - 6, grp);
vrnBoxM(1.8, 0.6, 3.4, vceMat(0xD8D0C0), cx + 14, 0.5, Z - 6, grp);
vrnTable(grp, cx + 12, Z + 4, 2, 1, 0, 0x5A3A22);
for (var f = 0; f < 10; f++)
wBox(0.15, 0.8, 0.3, vceMat(0xC8B890), cx - 12 + f * 0.6, 2.2, Z - 9.6, grp);
wCyl(0.3, 0.36, 1, wood, cx - 14, 0.5, Z + 3, grp, 10);
if (smith) {
var anvil = vrnBoxM(0.6, 0.5, 1.1, vrnMetal(0x2A2A2A), cx + 12, 0.9, Z + 12.6, grp);
wCyl(0.3, 0.36, 0.7, wood, cx + 12, 0.35, Z + 12.6, grp, 8);
var forge = vrnBoxM(1.8, 1, 1.6, lava, cx + 15, 0.5, Z + 13, grp);
var fg = wGlow(0xFF7A2A, 3, 0.5);
fg.position.set(cx + 15, 1.2, Z + 13);
grp.add(fg);
}
}
home(-40, false);
home(40, true);
vrnSpot(X - 40, Z + 1.6, 2.6, "The hearth at Gardär", "warm your hands", function () { setStatus("🔥 Peat and dried fish-bones burning; the smoke finds its own way out of a hole in the roof. Nineteen children, it seems, in and out of every corner."); }, 0);
vrnSpot(X + 40, Z + 1.6, 2.6, "The rector's hearth", "warm your hands", function () { setStatus("🔥 A poor house, and a cold welcome: the rector of Stapi is a smith first and a clergyman second, and his wife a terror."); }, 0);
vrnSpot(X - 40, Z + 10.4, 2.4, "The door of the farm", "go out", function () { vrnLeave("vce_turf"); }, 0);
vrnSpot(X + 40, Z + 10.4, 2.4, "The door of the rector's house", "go out", function () { vrnLeave("vce_turf"); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1863);
var rockM = VRN.lite ? vceMat(0x4A4440, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x5A5048, side: THREE.DoubleSide, map: vrnTex("stone", 4) });
function tube(z, x0, x1, r, col, dark, e0, e1) {
var L = x1 - x0, t = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, VRN.lite ? 8 : 16, VRN.lite ? 4 : 16, true), dark ? vceMat(col, { ds: true }) : rockM);
var p = t.geometry.attributes.position;
for (var i = 0; i < p.count; i++) {
var a = Math.atan2(p.getZ(i), p.getX(i)), y = p.getY(i), n = 1 + 0.12 * Math.sin(a * 5 + y * 0.21) + 0.08 * Math.sin(y * 0.53 + a * 3);
p.setXYZ(i, p.getX(i) * n, y, p.getZ(i) * n);
}
t.geometry.computeVertexNormals();
t.rotation.z = Math.PI / 2;
t.position.set(X + (x0 + x1) / 2, r * 0.55, Z + z);
grp.add(t);
vrnInFloor(grp, X + (x0 + x1) / 2, Z + z, L, r * 1.4, 0, vrnSurf("stone", col, 4));
vrnSolid({ x: X + (x0 + x1) / 2, z: Z + z - r * 0.72, hw: L / 2, hd: 0.3, h: 8 });
vrnSolid({ x: X + (x0 + x1) / 2, z: Z + z + r * 0.72, hw: L / 2, hd: 0.3, h: 8 });
if (e0 !== false)
vrnSolid({ x: X + x0 - 0.4, z: Z + z, hw: 0.3, hd: r, h: 8 });
if (e1 !== false)
vrnSolid({ x: X + x1 + 0.4, z: Z + z, hw: 0.3, hd: r, h: 8 });
}
tube(-60, -290, 140, 4.2, 0x6A6050, false, true, false);
tube(-60, 220, 290, 4.2, 0x5A5048, false, false, true);
for (var f = 0; f < (VRN.lite ? 20 : 50); f++) {
var fx = X - 200 + f * 9, sd = f % 2 ? 1 : -1;
var sp = new THREE.Mesh(new THREE.TorusGeometry(0.22 + R() * 0.2, 0.06, 5, 12, Math.PI * 1.6), vceMat(0xD8C8A8));
sp.position.set(fx, 1 + R() * 1.6, Z - 60 + sd * 3.0);
sp.rotation.y = sd > 0 ? Math.PI : 0;
grp.add(sp);
}
for (var m = 0; m < 12; m++) {
var mb = vrnBoxM(6, 3.6, 0.3, vceMat([0xE8E0D8, 0xC8B8C8, 0xD8C8B8][m % 3], { shine: 70 }), X - 60 + m * 10, 1.8, Z - 60 + (m % 2 ? 3.1 : -3.1), grp);
}
var cave = new THREE.Mesh(new THREE.SphereGeometry(30, VRN.lite ? 12 : 24, VRN.lite ? 8 : 12, 0, Math.PI * 2, 0, Math.PI / 2), VRN.lite ? vceMat(0x1E1C1A, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x2A2622, side: THREE.DoubleSide, map: vrnTex("stone", 5) }));
cave.scale.set(1.4, 0.7, 1);
cave.position.set(X + 180, 0, Z - 60);
grp.add(cave);
vrnInFloor(grp, X + 180, Z - 60, 80, 56, 0.01, vrnSurf("stone", 0x2A2826, 4));
for (var s = 0; s < 14; s++) {
var a = s / 14 * Math.PI * 2, cs = vrnBoxM(10, 1 + (s % 3), 0.6, vceMat(0x0E0E0E, { shine: 80, spec: 0x6A6A6A }), X + 180 + Math.cos(a) * 40, 2 + s % 4, Z - 60 + Math.sin(a) * 27, grp);
cs.rotation.y = -a + Math.PI / 2;
}
vrnSpot(X + 170, Z - 56, 4, "The coal seams", "look at the coal", function () { setStatus("⚫ " + QE("When I removed my hand it was black. I looked nearer, and found we were in a coal formation.")); }, 0);
vrnSpot(X + 286, Z - 60, 3, "The end of the eastern tunnel", "feel the wall", function () { setStatus("🧱 Solid rock across the tunnel, floor to roof. No way on. The eastern tunnel goes nowhere."); }, 0);
vrnSpot(X - 286, Z - 60, 3, "Back up the eastern tunnel", "go back to the fork", function () { var O = VRN_IN.vce_gal.out; vrnMove(O[0], O[1], O[2], O[3], O[4]); }, 0);
for (var l = 0; l < 8; l++) {
var gl = wGlow(0xFFF0C8, 6, 0.25);
gl.position.set(X - 260 + l * 70, 3, Z - 60);
grp.add(gl);
}
tube(60, -290, 200, 3.4, 0x3A3634, true);
for (var g = 0; g < 40; g++) {
var gr = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + R() * 0.9, 0), vceMat(0x4A4440));
gr.position.set(X - 260 + g * 11, 0.3, Z + 60 + (g % 2 ? 2.2 : -2.2));
grp.add(gr);
}
I.lamp = wGlow(0xFFF0C8, 5, 0.3);
I.lamp.position.set(X - 280, 1.8, Z + 60);
I.lamp.userData.keep = 1;
grp.add(I.lamp);
vrnSpot(X + 196, Z + 60, 3, "The curving wall", "put your ear to the rock", function () { setStatus("👂 Sounds... far, far off. Voices? Through the rock?"); }, 0);
},
function (G) {
var grp = G.getObjectByName("vrn-under") || G, X = VRN_UG_X, U = VRN_UG, R = wRand(1877), rock = vrnSurf("stone", 0x3A342C, 3), dark = vrnC(0x0A0806);
var P = U.gal[1], mx = X + P[0] + 30, mz = P[1] - 30, my = vrnLand(mx, mz), mouth = new THREE.Group();
mouth.position.set(mx, my, mz);
mouth.rotation.y = -Math.PI * 0.25;
grp.add(mouth);
var lava = vrnSurf("stone", 0x4A3E32, 2), wood = vrnSurf("wood", 0x5A4430, 1);
vrnBoxM(22, 16, 6, lava, 0, 7, -3.2, mouth);
var hole = new THREE.Mesh(new THREE.PlaneGeometry(7, 7.4), dark);
hole.position.set(0, 3.4, -0.15);
mouth.add(hole);
var arc = new THREE.Mesh(new THREE.CircleGeometry(3.5, 18, 0, Math.PI), dark);
arc.position.set(0, 7.1, -0.14);
mouth.add(arc);
for (var a = 0; a < 13; a++) {
var t = a / 12 * Math.PI, bk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9 + R() * 0.5, 0), rock);
bk.position.set(Math.cos(t) * 4.3, 7 + Math.sin(t) * 4.3, 0.2);
mouth.add(bk);
}
for (var sd = 0; sd < 5; sd++) {
[-1, 1].forEach(function (k) { var bk2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9 + R() * 0.5, 0), rock); bk2.position.set(k * 4.3, sd * 1.5, 0.2); mouth.add(bk2); });
}
[-1, 1].forEach(function (k) { wBox(0.35, 7, 0.35, wood, k * 3.2, 3.5, 0.4, mouth); });
wBox(7.2, 0.4, 0.4, wood, 0, 7.1, 0.4, mouth);
for (var rb = 0; rb < 8; rb++) {
var rk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + R() * 0.5, 0), rock);
rk.position.set((R() - 0.5) * 9, 0.2, 1 + R() * 3);
mouth.add(rk);
}
[-2.4, 2.6].forEach(function (lx2, i) { var lp = new THREE.Group(); lp.position.set(lx2, 0, 1.6); mouth.add(lp); wCyl(0.14, 0.18, 0.3, vrnBrass(), 0, 0.15, 0, lp, 8); wCyl(0.11, 0.11, 0.32, new THREE.MeshBasicMaterial({ color: 0xF0F4FF }), 0, 0.46, 0, lp, 8); var g2 = wGlow(0xE8F0FF, 18, 0.55); g2.position.y = 0.8; lp.add(g2); });
var cs = wSign(["→ EAST"], 1.6, 0.5, "#2A241C", "#E8E0C8");
cs.position.set(-4.6, 2.6, 0.6);
cs.rotation.y = 0.3;
mouth.add(cs);
vrnSpot(mx + Math.sin(-Math.PI / 4) * 3, mz + Math.cos(-Math.PI / 4) * 3, 6, "The eastern tunnel", "go into the eastern tunnel", function () { vrnEnter("vce_gal"); }, my);
var C = U.camp, cap = vrnSurf("stone", 0xE4DCCC, 2), stalk = vrnC(0xEDE6D8), gill = vrnC(0xB8A890);
for (var m = 0; m < (VRN.lite ? 14 : 34); m++) {
var x = C.x - 60 + (R() - 0.5) * 160, z = C.z + 170 + (R() - 0.5) * 150, y = vrnLand(X + x, z), sc = 2.2 + R() * 1.6;
if (y < 1)
continue;
wCyl(0.5 * sc, 0.7 * sc, 4.6 * sc, stalk, X + x, y + 2.3 * sc, z, grp, 8);
var c = new THREE.Mesh(new THREE.SphereGeometry(3.2 * sc, VRN.lite ? 8 : 14, 6, 0, Math.PI * 2, 0, Math.PI / 2), cap);
c.scale.y = 0.42;
c.position.set(X + x, y + 4.5 * sc, z);
grp.add(c);
var u = new THREE.Mesh(new THREE.CircleGeometry(3.1 * sc, VRN.lite ? 8 : 14), gill);
u.rotation.x = Math.PI / 2;
u.position.set(X + x, y + 4.5 * sc - 0.02, z);
grp.add(u);
vrnSolid({ x: X + x, z: z, r: 0.7 * sc });
}
vrnSpot(X + C.x - 10, C.z + 110, 14, "The forest of mushrooms", "walk under the mushrooms", function () { setStatus("🍄 White mushrooms thirty and forty feet high, their caps meeting overhead like a roof. Under them it is dark, and still, and cold."); }, vrnLand(X + C.x - 10, C.z + 110));
var B = U.bones, fx = X + B.x + 24, fz = B.z + 14, fy = vrnLand(fx, fz), man = new THREE.Group();
man.position.set(fx, fy + 0.15, fz);
man.rotation.y = 0.4;
grp.add(man);
var skin = vrnC(0x8A6A48), bone = vrnC(0xE0D6C0);
wBox(0.42, 0.18, 0.7, skin, 0, 0, 0, man);
wSph(0.13, skin, 0, 0.04, 0.5, man, 8);
[-1, 1].forEach(function (k) { wBox(0.1, 0.1, 0.8, skin, k * 0.12, -0.02, -0.72, man); wBox(0.09, 0.09, 0.6, skin, k * 0.28, -0.02, 0.02, man); });
for (var q = 0; q < 10; q++) {
var bn = wCyl(0.05, 0.06, 0.5 + R() * 0.6, bone, (R() - 0.5) * 3, 0, (R() - 0.5) * 3, man, 5);
bn.rotation.set(Math.PI / 2, R() * 3, 0);
}
vrnSpot(fx - 2, fz, 4, "The fossil man", "look closer", function () { setStatus("🧍 A man, lying among the bones of the mastodons, dried like parchment; here since the world was young."); }, fy);
var H = 420, sh = new THREE.CylinderGeometry(9, 9, H, VRN.lite ? 10 : 18, VRN.lite ? 12 : 30, true), p = sh.attributes.position, cols = new Float32Array(p.count * 3);
for (var i = 0; i < p.count; i++) {
var yy = p.getY(i) + H / 2, n = wFbm(p.getX(i) / 4 + p.getZ(i) / 5, yy / 6, 51, 2), hot = Math.max(0, (yy - 180) / 240), vein = n > 0.62 ? 1 : 0;
p.setX(i, p.getX(i) * (0.85 + n * 0.3));
p.setZ(i, p.getZ(i) * (0.85 + n * 0.3));
cols[i * 3] = 0.16 + n * 0.12 + hot * (0.5 + vein * 0.4);
cols[i * 3 + 1] = 0.13 + n * 0.1 + hot * (0.12 + vein * 0.2);
cols[i * 3 + 2] = 0.11 + n * 0.08;
}
sh.setAttribute("color", new THREE.BufferAttribute(cols, 3));
sh.computeVertexNormals();
var shaft = new THREE.Mesh(sh, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: true }));
shaft.position.set(X + U.chimney.x, -60 + H / 2, U.chimney.z);
shaft.visible = false;
shaft.userData.keep = 1;
grp.add(shaft);
VCE.shaft = shaft;
},
function (on) {
if (on && !VCE.ball) {
var g = new THREE.Group();
var c = wSph(0.5, new THREE.MeshBasicMaterial({ color: 0xD8E8FF }), 0, 0, 0, g, 12);
var h = wSph(0.52, new THREE.MeshBasicMaterial({ color: 0x4A7AE8, transparent: true, opacity: 0.6 }), 0, 0, 0, g, 12);
h.scale.set(1, 1, 0.5);
var gl = wGlow(0xA8C8FF, 6, 0.6);
g.add(gl);
g.userData.keep = 1;
VRN.G.add(g);
VCE.ball = g;
}
if (!on && VCE.ball) {
if (VCE.ball.parent)
VCE.ball.parent.remove(VCE.ball);
VCE.ball = null;
}
},
function (G) {
var S = VRN_STROM, grp = new THREE.Group();
grp.name = "vce-strom";
G.add(grp);
var R = wRand(1864);
var bark = vrnSurf("wood", 0x5A4A3A, 1), olive = vrnC(0x6A7A4A), olive2 = vrnC(0x7A8A58), white = vrnSurf("plaster", 0xF0EAE0, 2), roof = vrnC(0xB86A48), lava = new THREE.MeshBasicMaterial({ color: 0xE8582A }), crust = vrnC(0x2A2420);
function at(a, r) { var x = S.x + Math.sin(a) * r, z = S.z + Math.cos(a) * r; return { x: x, z: z, y: vrnLand(x, z) }; }
for (var i = 0; i < (VRN.lite ? 30 : 90); i++) {
var P = at(-1.1 + R() * 2.0, 135 + R() * 100);
if (P.y < 1.5)
continue;
var t = new THREE.Group();
t.position.set(P.x, P.y, P.z);
t.rotation.y = R() * 6;
var ts = 1.6 + R() * 0.9;
t.scale.setScalar(ts);
grp.add(t);
var tr = wCyl(0.24, 0.4, 2.4, bark, 0, 1.2, 0, t, 7);
tr.rotation.z = (R() - 0.5) * 0.35;
var tr2 = wCyl(0.14, 0.2, 1.6, bark, 0.4, 2.4, 0, t, 6);
tr2.rotation.z = -0.6;
for (var k = 0; k < 5; k++) {
var c = wSph(1.1 + R() * 0.6, k % 2 ? olive : olive2, (R() - 0.5) * 2.6, 2.8 + R() * 1.1, (R() - 0.5) * 2.6, t, 8);
c.scale.y = 0.62;
}
vrnSolid({ x: P.x, z: P.z, r: 0.6 * ts });
}
var dry = vrnSurf("stone", 0x9A9080, 2);
for (var tr3 = 0; tr3 < 5; tr3++) {
var rr = 140 + tr3 * 20;
for (var sgm = 0; sgm < 16; sgm++) {
var a1 = -1.1 + sgm * 0.13, A1 = at(a1, rr), A2 = at(a1 + 0.13, rr);
if (A1.y < 1.5 || A2.y < 1.5)
continue;
var ln = Math.hypot(A2.x - A1.x, A2.z - A1.z), wl = vrnBoxM(ln + 0.4, 1.2, 0.8, dry, (A1.x + A2.x) / 2, (A1.y + A2.y) / 2 + 0.3, (A1.z + A2.z) / 2, grp);
wl.rotation.y = -Math.atan2(A2.z - A1.z, A2.x - A1.x);
}
}
for (var v = 0; v < (VRN.lite ? 4 : 9); v++) {
var Q = at(0.7 + v * 0.06, 170);
if (Q.y < 1.5)
continue;
for (var w = 0; w < 6; w++) {
wCyl(0.05, 0.05, 1.2, bark, Q.x + w * 1.6 - 4, Q.y + 0.6, Q.z, grp, 4);
wSph(0.4, vrnC(0x4A6A2A), Q.x + w * 1.6 - 4, Q.y + 1.2, Q.z, grp, 6);
}
}
var Wp = at(-0.25, 190);
if (Wp.y > 1) {
var b = wCyl(1.2, 1.4, 0.6, vrnSurf("stone", 0xC8C0B0, 2), Wp.x, Wp.y + 0.3, Wp.z, grp, 12);
var wtr = wCyl(1.05, 1.05, 0.05, vrnWaterMat(0x5A9AB0, 0.85), Wp.x, Wp.y + 0.58, Wp.z, grp, 12);
vrnSpot(Wp.x, Wp.z + 1.6, 3, "The spring under the olives", "drink", function () { setStatus("💧 Cold, clear water. After the shaft of the volcano, the best thing you have ever tasted."); }, Wp.y);
}
for (var h = 0; h < (VRN.lite ? 7 : 16); h++) {
var Hp = at(Math.PI * 0.5 + (h - 7.5) * 0.06, 222 - ((h % 3) * 12));
if (Hp.y < 1)
continue;
var hs = new THREE.Group();
hs.position.set(Hp.x, Hp.y, Hp.z);
hs.rotation.y = Math.atan2(Hp.x - S.x, Hp.z - S.z);
grp.add(hs);
var hw = 7 + R() * 3, hd = 8 + R() * 3, hh = 5 + R() * 3;
vrnBoxM(hw, hh, hd, white, 0, hh / 2, 0, hs);
vrnBoxM(hw + 0.6, 5, hd + 0.6, vrnSurf("stone", 0xB8B0A0, 2), 0, -2.3, 0, hs);
vrnBoxM(hw + 0.4, 0.3, hd + 0.4, roof, 0, hh + 0.15, 0, hs);
wBox(1.2, 2.2, 0.1, vrnC(0x3A6A8A), 0, 1.1, hd / 2 + 0.02, hs);
wBox(1, 1.1, 0.1, vrnC(0x3A6A8A), hw / 4, hh * 0.66, hd / 2 + 0.02, hs);
wBox(1, 1.1, 0.1, vrnC(0x3A6A8A), -hw / 4, hh * 0.66, hd / 2 + 0.02, hs);
if (h % 2) {
wBox(hw * 0.5, 0.15, 1.4, vrnC(0x6A4A2A), 0, hh * 0.5, hd / 2 + 0.7, hs);
for (var vp = 0; vp < 4; vp++)
wSph(0.35, vrnC(0x4A7A2A), -hw * 0.2 + vp * hw * 0.13, hh * 0.5 + 0.3, hd / 2 + 1.1, hs, 6);
}
vrnSolid({ x: Hp.x, z: Hp.z, r: Math.max(hw, hd) / 2 + 0.3 });
}
var Cp = at(Math.PI * 0.5, 205);
if (Cp.y > 1) {
var ch = new THREE.Group();
ch.position.set(Cp.x, Cp.y, Cp.z);
ch.rotation.y = -Math.PI / 2;
grp.add(ch);
vrnBoxM(5, 5, 8, white, 0, 2.5, 0, ch);
vrnBoxM(1.8, 4, 1.8, white, 0, 7, -3, ch);
wSph(1, roof, 0, 9.4, -3, ch, 8);
vrnSolid({ x: Cp.x, z: Cp.z, r: 4.4 });
}
var Pt = at(Math.PI * 0.5, 245);
for (var bt = 0; bt < (VRN.lite ? 2 : 5); bt++) {
var bx = Pt.x + (bt - 2) * 4, bz = Pt.z + (bt % 2) * 3, boat = new THREE.Group();
boat.position.set(bx, Math.max(vrnLand(bx, bz), 0) + 0.3, bz);
boat.rotation.y = 0.3 * bt;
grp.add(boat);
var hull = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 5, 8, 1, false, 0, Math.PI), vrnC([0x2A5A8A, 0xE8E0D0, 0x8A2A22][bt % 3]));
hull.rotation.set(0, 0, Math.PI);
hull.rotation.x = Math.PI / 2;
boat.add(hull);
}
vrnSign(["SAN VICENZO", "Stromboli"], 4, 1, Pt.x - 14, Math.max(vrnLand(Pt.x - 14, Pt.z), 0) + 2.2, Pt.z, -Math.PI / 2, grp);
for (var l = 0; l < 3; l++) {
var a0 = Math.PI + (l - 1) * 0.2;
for (var sg = 0; sg < 10; sg++) {
var A = at(a0 + Math.sin(sg * 0.7 + l) * 0.05, 40 + sg * 18);
var st = wBox(2.4, 0.3, 18, sg % 3 ? lava : crust, A.x, A.y + 0.12, A.z, grp);
st.rotation.y = a0;
}
}
if (typeof gwBake === "function")
try {
gwBake(grp);
}
catch (e) { }
VRN.districts.push({ g: grp, x: S.x, z: S.z, r: 900 });
},
function (n) {
if (typeof vlgSailEnd === "function" && VLG.sail)
vlgSailEnd(true);
if (typeof vlgAimEnd === "function")
vlgAimEnd(true);
vceBeastsClear();
vceFireball(false);
VRN.hansbach = n >= 22 || !!vrnData().cWater;
if (VRN.ugStream)
VRN.ugStream.visible = VRN.hansbach;
var blasted = n >= 41;
if (VRN.ugRock) {
VRN.ugRock.visible = !blasted;
if (blasted && VRN.ugRockS)
vrnSolidOff(VRN.ugRockS);
}
vceShaft(false);
if (VRN.envOver === "gallery" || VRN.envOver === "ugstorm")
VRN.envOver = null;
if (VRN.ride && VRN.ride.k === "raft") {
VRN.ride = null;
vrnRidePanel(false);
}
if (n < 31)
vceRaftHome();
}
];
});
