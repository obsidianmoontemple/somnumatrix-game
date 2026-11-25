/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(196, function () {
"use strict";
return [
function () {
return wTex(256, 256, function (x, W, H) {
x.fillStyle = "#DCE6F0";
x.fillRect(0, 0, W, H);
var R = wRand(31);
for (var r = 0; r < 8; r++) {
var off = (r % 2) * 32;
for (var c = -1; c < 5; c++) {
var l = Math.round(214 + R() * 26);
x.fillStyle = "rgb(" + (l - 10) + "," + (l) + "," + Math.min(255, l + 12) + ")";
x.fillRect(c * 64 + off + 2, r * 32 + 2, 60, 28);
}
}
x.strokeStyle = "rgba(120,140,170,0.55)";
x.lineWidth = 2;
for (var r2 = 0; r2 <= 8; r2++) {
x.beginPath();
x.moveTo(0, r2 * 32);
x.lineTo(W, r2 * 32);
x.stroke();
}
for (var r3 = 0; r3 < 8; r3++) {
var o = (r3 % 2) * 32;
for (var c2 = 0; c2 <= 4; c2++) {
x.beginPath();
x.moveTo(c2 * 64 + o, r3 * 32);
x.lineTo(c2 * 64 + o, r3 * 32 + 32);
x.stroke();
}
}
for (var i = 0; i < 500; i++) {
x.fillStyle = "rgba(255,255,255," + (R() * 0.35) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
}
}, [1, 1]);
},
function () {
return wTex(256, 256, function (x, W, H) {
x.fillStyle = "#EEF4FA";
x.fillRect(0, 0, W, H);
var R = wRand(57);
x.strokeStyle = "rgba(150,175,205,0.35)";
for (var i = 0; i < 14; i++) {
x.lineWidth = 0.6 + R() * 1.6;
x.beginPath();
var px = R() * W, py = R() * H;
x.moveTo(px, py);
for (var k = 0; k < 6; k++) {
px += (R() - 0.5) * 90;
py += (R() - 0.3) * 60;
x.lineTo(px, py);
}
x.stroke();
}
x.strokeStyle = "rgba(200,170,90,0.6)";
x.lineWidth = 2;
x.strokeRect(1, 1, W - 2, H - 2);
}, [1, 1]);
},
function () {
return wTex(64, 256, function (x, W, H) {
x.fillStyle = "#1C2E6E";
x.fillRect(0, 0, W, H);
x.fillStyle = "#D8B650";
x.fillRect(3, 0, 3, H);
x.fillRect(W - 6, 0, 3, H);
x.fillStyle = "rgba(216,182,80,0.8)";
for (var y = 16; y < H; y += 32) {
x.beginPath();
x.moveTo(W / 2, y - 8);
x.lineTo(W / 2 + 7, y);
x.lineTo(W / 2, y + 8);
x.lineTo(W / 2 - 7, y);
x.fill();
}
}, [1, 1]);
},
function () {
return wTex(256, 128, function (x, W, H) {
x.fillStyle = "#3A2618";
x.fillRect(0, 0, W, H);
var R = wRand(77), cols = ["#7A1E22", "#1E3A6A", "#2A5A3A", "#6A4A1A", "#4A2A5A", "#8A6A2A", "#2A2A3A"];
for (var s = 0; s < 4; s++) {
var y = s * 32 + 4, xx = 2;
while (xx < W - 6) {
var w = 4 + R() * 7 | 0, h = 20 + R() * 7 | 0;
x.fillStyle = cols[(R() * cols.length) | 0];
x.fillRect(xx, y + 26 - h, w, h);
x.fillStyle = "rgba(230,200,120,0.6)";
x.fillRect(xx, y + 26 - h + 4, w, 1);
xx += w + 1;
}
x.fillStyle = "#2A1A10";
x.fillRect(0, y + 26, W, 4);
}
}, [1, 1]);
},
function () {
return wTex(128, 128, function (x, W, H) { x.fillStyle = "#1C4A2E"; x.fillRect(0, 0, W, H); var R = wRand(13); for (var i = 0; i < 900; i++) {
var g = 40 + R() * 70 | 0;
x.fillStyle = "rgb(" + (g * 0.35 | 0) + "," + g + "," + (g * 0.55 | 0) + ")";
x.beginPath();
x.ellipse(R() * W, R() * H, 2 + R() * 3, 1 + R() * 2, R() * 3, 0, 6.283);
x.fill();
} for (var j = 0; j < 60; j++) {
x.fillStyle = "rgba(240,248,255," + (0.4 + R() * 0.5) + ")";
x.fillRect(R() * W, R() * H * 0.3, 2 + R() * 4, 1 + R() * 2);
} }, [1, 1]);
},
function () {
if (IPM)
return IPM;
var st = ipTexStone(), mb = ipTexMarble();
IPM = {
stone: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: st }),
stoneB: new THREE.MeshLambertMaterial({ color: 0xB8C8DC, map: st }),
wallIn: new THREE.MeshLambertMaterial({ color: 0xA8B8CE, map: st }),
navy: new THREE.MeshLambertMaterial({ color: 0x16224A }),
leaf: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: ipTexLeaf() }),
trim: new THREE.MeshLambertMaterial({ color: 0xF2F6FA }),
floor: new THREE.MeshPhongMaterial({ color: 0xB8C8DA, map: mb, shininess: 70, specular: 0x8899AA }),
ice: new THREE.MeshPhongMaterial({ color: 0xBFE6FF, transparent: true, opacity: 0.86, shininess: 100, specular: 0xFFFFFF, emissive: 0x16324E }),
iceDeep: new THREE.MeshPhongMaterial({ color: 0x8CC4F0, shininess: 90, specular: 0xFFFFFF, emissive: 0x0E2A48 }),
crystal: new THREE.MeshPhongMaterial({ color: 0xC8EAFF, transparent: true, opacity: 0.9, shininess: 120, specular: 0xFFFFFF, emissive: 0x3A78B0, fog: false }),
gold: new THREE.MeshPhongMaterial({ color: 0xC8962A, shininess: 90, specular: 0xFFE8A0, emissive: 0x2A1800 }),
silver: new THREE.MeshPhongMaterial({ color: 0xD8DEE8, shininess: 90, specular: 0xFFFFFF }),
snow: new THREE.MeshLambertMaterial({ color: 0xF6FAFF }),
hedge: new THREE.MeshLambertMaterial({ color: 0x1F4A30 }),
hedgeD: new THREE.MeshLambertMaterial({ color: 0x173A26 }),
carpet: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: ipTexCarpet() }),
velvet: new THREE.MeshLambertMaterial({ color: 0x22347E }),
velvetR: new THREE.MeshLambertMaterial({ color: 0x5A1A2A }),
fur: new THREE.MeshLambertMaterial({ color: 0xF4F2EC }),
wood: new THREE.MeshLambertMaterial({ color: 0x6A4A32 }),
woodD: new THREE.MeshLambertMaterial({ color: 0x3E2A1C }),
books: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: ipTexBooks() }),
linen: new THREE.MeshLambertMaterial({ color: 0xF4F0E6 }),
water: new THREE.MeshPhongMaterial({ color: 0x5AB8D8, transparent: true, opacity: 0.8, shininess: 100, specular: 0xFFFFFF }),
rock: new THREE.MeshLambertMaterial({ color: 0x6A7E96 }),
rockD: new THREE.MeshLambertMaterial({ color: 0x4A5A70 }),
glowW: new THREE.MeshBasicMaterial({ color: 0xFFE8B8 }),
glowB: new THREE.MeshBasicMaterial({ color: 0x8FDCFF, fog: false }),
glowWin: new THREE.MeshBasicMaterial({ color: 0xFFDCA0 }),
glowWinB: new THREE.MeshBasicMaterial({ color: 0xA8DCFF }),
banner: new THREE.MeshLambertMaterial({ color: 0x1E3478, side: THREE.DoubleSide }),
black: new THREE.MeshLambertMaterial({ color: 0x1A2230 })
};
return IPM;
},
function (S, along, c, a0, a1, y0, h, t, mat, gaps, solid) {
gaps = (gaps || []).slice().sort(function (p, q) { return p[0] - q[0]; });
var cuts = [a0];
(gaps || []).forEach(function (g) { cuts.push(g[0], g[1]); });
cuts.push(a1);
for (var i = 0; i < cuts.length; i += 2) {
var s0 = cuts[i], s1 = cuts[i + 1];
if (s1 - s0 < 0.05)
continue;
var mid = (s0 + s1) / 2, L = s1 - s0;
if (along === "x") {
ipB(S, L, h, t, mat, mid, y0 + h / 2, c);
if (solid !== false)
ipBox(mid, c, L / 2, t / 2, y0, h + 0.5);
}
else {
ipB(S, t, h, L, mat, c, y0 + h / 2, mid);
if (solid !== false)
ipBox(c, mid, t / 2, L / 2, y0, h + 0.5);
}
}
(gaps || []).forEach(function (g) {
var gh = g[2] || 3.2;
if (gh >= h)
return;
var mid = (g[0] + g[1]) / 2, L = g[1] - g[0];
if (along === "x")
ipB(S, L, h - gh, t, mat, mid, y0 + gh + (h - gh) / 2, c);
else
ipB(S, t, h - gh, L, mat, c, y0 + gh + (h - gh) / 2, mid);
var M = ipMats().gold;
if (along === "x") {
ipB(S, L + 0.5, 0.3, t + 0.12, M, mid, y0 + gh + 0.15, c);
ipB(S, 0.25, gh, t + 0.12, M, g[0] - 0.12, y0 + gh / 2, c);
ipB(S, 0.25, gh, t + 0.12, M, g[1] + 0.12, y0 + gh / 2, c);
}
else {
ipB(S, t + 0.12, 0.3, L + 0.5, M, c, y0 + gh + 0.15, mid);
ipB(S, t + 0.12, gh, 0.25, M, c, y0 + gh / 2, g[0] - 0.12);
ipB(S, t + 0.12, gh, 0.25, M, c, y0 + gh / 2, g[1] + 0.12);
}
});
},
function (S, px, pz, r, h, y0, spire) {
var M = ipMats();
ipC(S, r, r * 1.08, h, M.stone, px, y0 + h / 2, pz, 16);
ipC(S, r * 1.12, r * 1.12, 0.8, M.trim, px, y0 + h * 0.62, pz, 16);
ipC(S, r * 1.18, r * 1.18, 1.2, M.trim, px, y0 + h + 0.6, pz, 16);
for (var k = 0; k < 12; k++) {
var a = k / 12 * 6.283;
ipB(S, 1.1, 1.4, 1.1, M.trim, px + Math.cos(a) * r * 1.1, y0 + h + 1.9, pz + Math.sin(a) * r * 1.1);
}
for (var w = 0; w < 4; w++) {
var a2 = w / 4 * 6.283 + 0.4;
var wn = ipB(S, 0.9, 2.4, 0.2, M.glowWinB, px + Math.cos(a2) * (r * 1.03 + 0.05), y0 + h * 0.78, pz + Math.sin(a2) * (r * 1.03 + 0.05));
wn.rotation.y = -a2 + Math.PI / 2;
}
var sh = spire || h * 0.9;
ipK(S, r * 1.02, sh, M.crystal, px, y0 + h + 1.2 + sh / 2, pz, 12);
ipS(S, 0.6, M.gold, px, y0 + h + 1.2 + sh + 0.3, pz, 10);
ipK(S, 0.25, 2.2, M.gold, px, y0 + h + 1.2 + sh + 1.5, pz, 6);
ipRound(px, pz, r * 1.1, IP.GL - 2, h + 4);
},
function (S, D) {
var M = ipMats(), GL = IP.GL;
var X = 140, Z0 = -150, Z1 = 230, wh = 10, wt = 3;
ipWall(S, "x", Z1, -X, X, GL - 1, wh + 1, wt, M.stone, [[-7, 7, 9]]);
ipWall(S, "x", Z0, -X, X, GL - 1, wh + 1, wt, M.stone, null);
ipWall(S, "z", -X, Z0, Z1, GL - 1, wh + 1, wt, M.stone, null);
ipWall(S, "z", X, Z0, Z1, GL - 1, wh + 1, wt, M.stone, null);
[[-X, X, Z1, "x"], [-X, X, Z0, "x"], [Z0, Z1, -X, "z"], [Z0, Z1, X, "z"]].forEach(function (q) {
for (var a = q[0] + 1.5; a < q[1] - 1; a += 3) {
if (q[3] === "x" && q[2] === Z1 && Math.abs(a) < 8)
continue;
if (q[3] === "x")
ipB(S, 1.5, 1.4, wt + 0.2, M.trim, a, GL + wh + 0.7, q[2]);
else
ipB(S, wt + 0.2, 1.4, 1.5, M.trim, q[2], GL + wh + 0.7, a);
}
});
[[-X, Z0], [X, Z0], [-X, Z1], [X, Z1], [-X, 40], [X, 40], [0, Z0], [-X, -55], [X, -55], [-X, 135], [X, 135], [-70, Z0], [70, Z0]].forEach(function (q) { ipTower(S, q[0], q[1], 5.5, 20, GL - 1, 16); });
[-13, 13].forEach(function (s) { ipTower(S, s, Z1, 7.5, 30, GL - 1, 26); });
ipB(S, 14, 4, 4, M.stone, 0, GL + 11, Z1);
ipB(S, 15, 0.8, 4.6, M.gold, 0, GL + 9.2, Z1);
for (var pb = -6; pb <= 6; pb += 1.2)
ipB(S, 0.16, 2.2, 0.16, M.gold, pb, GL + 10.1, Z1 + 1.9);
var crest = wSign(["THE PALACE OF THE NORTH KING"], 12, 1.4, "#14244E", "#F0D890");
crest.position.set(0, GL + 12.2, Z1 + 2.15);
D.add(crest);
var back = wSign(["THE PALACE OF THE NORTH KING"], 12, 1.4, "#14244E", "#F0D890");
back.position.set(0, GL + 12.2, Z1 - 2.15);
back.rotation.y = Math.PI;
D.add(back);
[-13, 13].forEach(function (s) { ipBanner(D, s, Z1 + 7.9, GL + 18, 0); });
ipB(S, 14, 0.06, 186, M.stoneB, 0, GL + 0.03, 137, 4);
ipB(S, 0.4, 0.25, 186, M.gold, -7.2, GL + 0.1, 137);
ipB(S, 0.4, 0.25, 186, M.gold, 7.2, GL + 0.1, 137);
for (var lz = 58; lz < 228; lz += 14) {
[-9, 9].forEach(function (s) { ipLantern(S, D, s, lz); });
}
(function () {
var fz = 140;
ipC(S, 9, 9.4, 1.1, M.stone, 0, GL + 0.55, fz, 32);
ipC(S, 8.4, 8.4, 0.1, M.iceDeep, 0, GL + 1.0, fz, 32);
var rim = new THREE.Mesh(new THREE.TorusGeometry(9, 0.45, 8, 40), M.trim);
rim.rotation.x = Math.PI / 2;
rim.position.set(0, GL + 1.1, fz);
S.add(rim);
ipC(S, 1.3, 1.8, 3.2, M.stone, 0, GL + 2.6, fz, 16);
ipC(S, 4.2, 3.4, 0.7, M.trim, 0, GL + 4.5, fz, 24);
ipC(S, 3.9, 3.9, 0.08, M.iceDeep, 0, GL + 4.86, fz, 24);
ipC(S, 0.8, 1.1, 2.4, M.stone, 0, GL + 6, fz, 12);
ipC(S, 2.4, 1.9, 0.5, M.trim, 0, GL + 7.4, fz, 20);
ipC(S, 2.2, 2.2, 0.06, M.iceDeep, 0, GL + 7.66, fz, 20);
for (var j = 0; j < 20; j++) {
var a = j / 20 * 6.283;
var c = ipK(S, 0.18, 1.6, M.crystal, Math.cos(a) * 4.1, GL + 3.85, fz + Math.sin(a) * 4.1, 5);
c.rotation.x = Math.PI;
}
for (var j2 = 0; j2 < 12; j2++) {
var a2 = j2 / 12 * 6.283;
var c2 = ipK(S, 0.14, 1.4, M.crystal, Math.cos(a2) * 2.3, GL + 6.75, fz + Math.sin(a2) * 2.3, 5);
c2.rotation.x = Math.PI;
}
ipK(S, 0.45, 3.4, M.crystal, 0, GL + 9.4, fz, 6);
ipS(S, 0.35, M.glowB, 0, GL + 11.2, fz, 10);
var gl = wGlow(0x8FDCFF, 6, 0.5);
gl.position.set(0, GL + 11.2, fz);
D.add(gl);
ipRound(0, fz, 9.6, GL - 2, 4);
})();
var kinds = ["bear", "stag", "owl", "wolf", "crown", "flake"];
[-1, 1].forEach(function (s) { [-30, -5, 20].forEach(function (z, i) { ipSculpture(S, kinds[(i + (s > 0 ? 3 : 0)) % 6], s * 88, z); ipSculpture(S, kinds[(i + (s > 0 ? 0 : 3) + 1) % 6], s * 112, z + 12); }); });
(function () {
var lake = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshPhongMaterial({ color: 0xBFE4F4, shininess: 110, specular: 0xFFFFFF }));
lake.scale.set(46, 26, 1);
lake.rotation.x = -Math.PI / 2;
lake.position.set(0, GL + 0.06, -118);
S.add(lake);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.02, 6, 48), M.snow);
rim.scale.set(46, 26, 20);
rim.rotation.x = Math.PI / 2;
rim.position.set(0, GL + 0.1, -118);
S.add(rim);
var sg = wSign(["The King's Lake", "Skating every day"], 3.4, 0.9, "#14244E", "#F0D890");
var w = ipW(48, -118);
sg.position.set(48, GL + 1.8, -118);
sg.rotation.y = Math.PI / 2;
D.add(sg);
ipB(S, 0.15, 1.8, 0.15, M.wood, 48, GL + 0.9, -118);
})();
for (var hz = -40; hz <= 40; hz += 8) {
[-1, 1].forEach(function (s) { ipB(S, 2, 1.4, 6, M.hedge, s * 58.5, GL + 0.7, hz); ipB(S, 2.2, 0.4, 6.2, M.snow, s * 58.5, GL + 1.5, hz); });
}
},
function (D, px, pz, y, rot) {
var t = wTex(128, 384, function (x, W, H) {
x.fillStyle = "#1E3478";
x.fillRect(0, 0, W, H);
x.fillStyle = "#D8B650";
x.fillRect(0, 0, W, 10);
x.fillRect(0, 0, 8, H);
x.fillRect(W - 8, 0, 8, H);
x.beginPath();
x.moveTo(0, H);
x.lineTo(W / 2, H - 50);
x.lineTo(W, H);
x.fillStyle = "rgba(0,0,0,0)";
x.globalCompositeOperation = "destination-out";
x.fill();
x.globalCompositeOperation = "source-over";
ipSigil(x, W / 2, 150, 46, "#F0F6FF", "#D8B650");
});
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide, transparent: true, alphaTest: 0.5 });
var b = new THREE.Mesh(new THREE.PlaneGeometry(3, 9), m);
b.position.set(px, y, pz);
b.rotation.y = rot || 0;
D.add(b);
return b;
},
function (x, cx, cy, r, col, crown) {
x.save();
x.translate(cx, cy);
x.strokeStyle = col;
x.lineCap = "round";
x.lineWidth = Math.max(2, r * 0.09);
for (var k = 0; k < 6; k++) {
x.save();
x.rotate(k * Math.PI / 3);
x.beginPath();
x.moveTo(0, 0);
x.lineTo(0, -r);
x.moveTo(0, -r * 0.55);
x.lineTo(-r * 0.22, -r * 0.75);
x.moveTo(0, -r * 0.55);
x.lineTo(r * 0.22, -r * 0.75);
x.moveTo(0, -r * 0.3);
x.lineTo(-r * 0.15, -r * 0.42);
x.moveTo(0, -r * 0.3);
x.lineTo(r * 0.15, -r * 0.42);
x.stroke();
x.restore();
}
x.fillStyle = crown || col;
x.beginPath();
var cw = r * 0.9, cyy = -r * 1.2;
x.moveTo(-cw / 2, cyy + r * 0.35);
x.lineTo(-cw / 2, cyy);
x.lineTo(-cw / 4, cyy + r * 0.18);
x.lineTo(0, cyy - r * 0.12);
x.lineTo(cw / 4, cyy + r * 0.18);
x.lineTo(cw / 2, cyy);
x.lineTo(cw / 2, cyy + r * 0.35);
x.closePath();
x.fill();
x.restore();
},
function (S, D, px, pz) {
var M = ipMats(), GL = IP.GL;
ipC(S, 0.32, 0.4, 0.5, M.stoneB, px, GL + 0.25, pz, 10);
ipC(S, 0.13, 0.16, 3.6, M.ice, px, GL + 2.3, pz, 8);
ipC(S, 0.38, 0.3, 0.25, M.gold, px, GL + 4.2, pz, 10);
ipS(S, 0.34, M.glowB, px, GL + 4.65, pz, 10);
ipK(S, 0.42, 0.6, M.gold, px, GL + 5.15, pz, 8);
var g = wGlow(0xCFF0FF, 3.4, 0.6);
g.position.set(px, GL + 4.65, pz);
D.add(g);
ipRound(px, pz, 0.45, GL - 1, 6);
},
function (S, kind, px, pz) {
var M = ipMats(), GL = IP.GL, y = GL + 1.2, I = M.ice, C = M.crystal;
ipB(S, 3.2, 1.2, 3.2, M.stone, px, GL + 0.6, pz);
ipB(S, 3.4, 0.2, 3.4, M.trim, px, GL + 1.25, pz);
var g = new THREE.Group();
g.position.set(px, y + 0.15, pz);
g.rotation.y = (px > 0 ? -1 : 1) * Math.PI / 2;
S.add(g);
function sp(r, x, yy, z, sx, sy, sz, m) { var s = ipS(g, r, m || I, x, yy, z, 12); if (sx)
s.scale.set(sx, sy, sz); return s; }
if (kind === "bear") {
sp(1, 0, 1.1, 0, 1.4, 0.9, 0.9);
sp(0.55, 0, 1.5, 1.25);
sp(0.18, -0.32, 1.95, 1.2);
sp(0.18, 0.32, 1.95, 1.2);
sp(0.22, 0, 1.38, 1.75, 1, 0.8, 1);
[[-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].forEach(function (q) { ipC(g, 0.28, 0.3, 1, I, q[0], 0.5, q[1], 8); });
}
else if (kind === "stag") {
sp(0.8, 0, 1.6, 0, 1.5, 0.8, 0.7);
sp(0.36, 0, 2.4, 1.1, 0.8, 1, 1.3);
var nk = ipC(g, 0.25, 0.35, 0.9, I, 0, 2.0, 0.8, 8);
nk.rotation.x = 0.7;
[[-0.5, 0.7], [0.5, 0.7], [-0.5, -0.7], [0.5, -0.7]].forEach(function (q) { ipC(g, 0.1, 0.12, 1.2, I, q[0], 0.6, q[1], 6); });
[-1, 1].forEach(function (s) { for (var k = 0; k < 4; k++) {
var a = ipC(g, 0.04, 0.06, 0.9 - k * 0.12, C, s * (0.25 + k * 0.18), 2.9 + k * 0.25, 0.95 - k * 0.1, 5);
a.rotation.z = s * (0.5 + k * 0.15);
} });
}
else if (kind === "owl") {
sp(0.9, 0, 1.2, 0, 1, 1.3, 0.9);
sp(0.6, 0, 2.5, 0.05);
[-1, 1].forEach(function (s) { sp(0.2, s * 0.25, 2.6, 0.5, 1, 1, 0.4, M.glowB); var e = ipK(g, 0.15, 0.4, I, s * 0.35, 3.05, 0, 6); e.rotation.z = -s * 0.3; var w = sp(0.5, s * 0.85, 1.3, -0.05, 0.35, 1.2, 0.8); });
var bk = ipK(g, 0.1, 0.3, M.gold, 0, 2.35, 0.6, 6);
bk.rotation.x = Math.PI;
}
else if (kind === "wolf") {
sp(0.7, 0, 1.2, 0, 0.9, 0.85, 1.5);
sp(0.45, 0, 1.75, 1.2);
var sn = ipK(g, 0.25, 0.7, I, 0, 1.65, 1.75, 8);
sn.rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { ipK(g, 0.13, 0.4, I, s * 0.22, 2.25, 1.15, 6); });
[[-0.35, 0.7], [0.35, 0.7], [-0.35, -0.7], [0.35, -0.7]].forEach(function (q) { ipC(g, 0.12, 0.14, 0.9, I, q[0], 0.45, q[1], 6); });
var tl = ipC(g, 0.12, 0.2, 1, I, 0, 1.2, -1.4, 6);
tl.rotation.x = -0.9;
var hd = ipK(g, 0.2, 0.8, I, 0, 2.4, 1.5, 6);
hd.rotation.x = -0.6;
}
else if (kind === "crown") {
ipC(g, 1.1, 1.1, 0.7, M.gold, 0, 0.5, 0, 24);
for (var k = 0; k < 8; k++) {
var a = k / 8 * 6.283;
ipK(g, 0.25, 1.2, C, Math.cos(a), 1.4, Math.sin(a), 6);
ipS(g, 0.13, M.glowB, Math.cos(a), 2.05, Math.sin(a), 8);
}
ipC(g, 0.9, 0.9, 0.3, M.velvet, 0, 0.95, 0, 20);
}
else {
for (var k2 = 0; k2 < 6; k2++) {
var arm = new THREE.Group();
arm.rotation.z = k2 * Math.PI / 3;
arm.position.y = 2;
g.add(arm);
ipB(arm, 0.18, 3, 0.18, C, 0, 0.75, 0);
[-1, 1].forEach(function (s) { var b = ipB(arm, 0.12, 0.8, 0.12, C, s * 0.25, 1.6, 0); b.rotation.z = -s * 0.7; });
}
ipS(g, 0.3, M.glowB, 0, 2, 0, 10);
}
ipBox(px, pz, 1.7, 1.7, GL - 1, 5);
},
function (D, x0, z0, nx, nz, C, seed, doorSide) {
var R = wRand(seed), M = ipMats(), GL = IP.GL, H = 3.4;
var v = [], h = [], seen = [];
for (var i = 0; i <= nx; i++) {
v[i] = [];
for (var j = 0; j < nz; j++)
v[i][j] = 1;
}
for (var i2 = 0; i2 < nx; i2++) {
h[i2] = [];
seen[i2] = [];
for (var j2 = 0; j2 <= nz; j2++) {
h[i2][j2] = 1;
}
}
var hi = Math.floor(nx / 2) - 2, hj = Math.floor(nz / 2) - 2;
function inHeart(i, j) { return i >= hi && i < hi + 4 && j >= hj && j < hj + 4; }
var stack = [[0, 0]];
seen[0][0] = 1;
while (stack.length) {
var c = stack[stack.length - 1], ci = c[0], cj = c[1], nb = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var a = ci + d[0], b = cj + d[1]; if (a >= 0 && a < nx && b >= 0 && b < nz && !seen[a][b] && !inHeart(a, b))
nb.push([a, b, d]); });
if (!nb.length) {
stack.pop();
continue;
}
var n = nb[(R() * nb.length) | 0], d = n[2];
if (d[0] === 1)
v[ci + 1][cj] = 0;
else if (d[0] === -1)
v[ci][cj] = 0;
else if (d[1] === 1)
h[ci][cj + 1] = 0;
else
h[ci][cj] = 0;
seen[n[0]][n[1]] = 1;
stack.push([n[0], n[1]]);
}
for (var a = hi; a < hi + 4; a++)
for (var b = hj; b < hj + 4; b++) {
if (a > hi)
v[a][b] = 0;
if (b > hj)
h[a][b] = 0;
}
h[hi + 1][hj] = 0;
var door = Math.floor(nz * 0.15);
if (doorSide < 0)
v[0][door] = 0;
else
v[nx][door] = 0;
if (doorSide < 0)
v[nx][nz - 2] = 0;
else
v[0][nz - 2] = 0;
var list = [];
for (var i3 = 0; i3 <= nx; i3++)
for (var j3 = 0; j3 < nz; j3++)
if (v[i3][j3])
list.push([x0 + i3 * C, z0 + (j3 + 0.5) * C, 0]);
for (var i4 = 0; i4 < nx; i4++)
for (var j4 = 0; j4 <= nz; j4++)
if (h[i4][j4])
list.push([x0 + (i4 + 0.5) * C, z0 + j4 * C, 1]);
var geo = ipGeo(0.95, H, C + 0.5, 1.6), cap = new THREE.BoxGeometry(1.15, 0.35, C + 0.7), base = new THREE.BoxGeometry(1.1, 0.3, C + 0.6);
var hm = new THREE.InstancedMesh(geo, M.leaf, list.length), cm = new THREE.InstancedMesh(cap, M.snow, list.length), bm = new THREE.InstancedMesh(base, M.hedgeD, list.length);
var o = new THREE.Object3D();
list.forEach(function (q, k) {
o.position.set(q[0], GL + H / 2, q[1]);
o.rotation.set(0, q[2] ? Math.PI / 2 : 0, 0);
o.scale.set(1, 1, 1);
o.updateMatrix();
hm.setMatrixAt(k, o.matrix);
o.position.y = GL + H + 0.1;
o.updateMatrix();
cm.setMatrixAt(k, o.matrix);
o.position.y = GL + 0.15;
o.updateMatrix();
bm.setMatrixAt(k, o.matrix);
});
[hm, cm, bm].forEach(function (m) { m.instanceMatrix.needsUpdate = true; m.receiveShadow = true; D.add(m); });
var mz = { x0: x0, z0: z0, nx: nx, nz: nz, C: C, v: v, h: h };
IP.mazes.push(mz);
var cx = x0 + (hi + 2) * C, cz = z0 + (hj + 2) * C, S2 = new THREE.Group();
ipC(S2, 6.5, 6.8, 0.5, M.stone, cx, GL + 0.25, cz, 8);
for (var k = 0; k < 8; k++) {
var an = k / 8 * 6.283 + 0.39;
ipC(S2, 0.3, 0.36, 5, M.ice, cx + Math.cos(an) * 5.6, GL + 3, cz + Math.sin(an) * 5.6, 10);
}
ipC(S2, 6.4, 6.4, 0.5, M.trim, cx, GL + 5.6, cz, 8);
ipK(S2, 7, 4.5, M.crystal, cx, GL + 8.1, cz, 8);
ipS(S2, 0.5, M.gold, cx, GL + 10.5, cz, 10);
ipC(S2, 1.1, 1.3, 1, M.stone, cx, GL + 1, cz, 16);
var rose = ipS(S2, 0.45, M.crystal, cx, GL + 1.95, cz, 12);
rose.scale.set(1, 0.8, 1);
for (var p = 0; p < 8; p++) {
var pa = p / 8 * 6.283;
var pt = ipS(S2, 0.3, M.glowB, cx + Math.cos(pa) * 0.38, GL + 1.85, cz + Math.sin(pa) * 0.38, 8);
pt.scale.set(0.6, 0.4, 1);
pt.rotation.y = -pa;
}
ipRound(cx, cz, 1.4, GL - 1, 3);
D.add(psMerge(S2));
var gl = wGlow(0xBFEFFF, 4, 0.6);
gl.position.set(cx, GL + 2, cz);
D.add(gl);
var w = ipW(cx, cz);
IP.spots.push({ x: w.x, z: w.z, y: GL, r: 3, name: "The Frost Rose, at the heart of the labyrinth", verb: "look", fn: function () { ipHeart(); } });
var dx = doorSide < 0 ? x0 - 1.5 : x0 + nx * C + 1.5, dz = z0 + (door + 0.5) * C;
var sg = wSign([seed % 2 ? "The Winter Labyrinth" : "The Starlight Labyrinth", "Find the Frost Rose at its heart"], 3.6, 1, "#14244E", "#F0D890");
sg.position.set(dx, GL + 2.2, dz + C * 0.9);
sg.rotation.y = doorSide < 0 ? -Math.PI / 2 : Math.PI / 2;
D.add(sg);
return mz;
},
function (px, pz) {
for (var k = 0; k < IP.mazes.length; k++) {
var m = IP.mazes[k], C = m.C, rr = 0.48 + 0.35;
var fx = (px - m.x0) / C, fz = (pz - m.z0) / C;
if (fx < -0.3 || fz < -0.3 || fx > m.nx + 0.3 || fz > m.nz + 0.3)
continue;
var i = Math.round(fx), j = Math.floor(fz);
if (Math.abs(px - (m.x0 + i * C)) < rr && i >= 0 && i <= m.nx) {
for (var dj = -1; dj <= 1; dj++) {
var jj = j + dj;
if (jj < 0 || jj >= m.nz)
continue;
var lo = m.z0 + jj * C - 0.25, hi = m.z0 + (jj + 1) * C + 0.25;
if (pz > lo - 0.35 && pz < hi + 0.35 && m.v[i][jj])
return true;
}
}
var j2 = Math.round(fz), i2 = Math.floor(fx);
if (Math.abs(pz - (m.z0 + j2 * C)) < rr && j2 >= 0 && j2 <= m.nz) {
for (var di = -1; di <= 1; di++) {
var ii = i2 + di;
if (ii < 0 || ii >= m.nx)
continue;
var lo2 = m.x0 + ii * C - 0.25, hi2 = m.x0 + (ii + 1) * C + 0.25;
if (px > lo2 - 0.35 && px < hi2 + 0.35 && m.h[ii][j2])
return true;
}
}
}
return false;
},
function () {
worldCard(worldFacts("The Frost Rose", "at the heart of the labyrinth", [], ["A rose of living ice grows here, and never melts. They say the first King of the North planted it the night the palace was raised.", "You found your way to the heart. Few do on their first try."]) +
worldBtn("close", "Back to the hedges", "Find your way out again"), { close: function () { worldCard(null); } });
},
function (S, D) {
var M = ipMats(), GL = IP.GL, F = IP.F;
ipB(S, 110, 1, 74, M.floor, 0, F - 0.5, 8, 4);
ipB(S, 53, 1, 16, M.floor, -28.5, F - 0.5, -37, 4);
ipB(S, 53, 1, 16, M.floor, 28.5, F - 0.5, -37, 4);
ipB(S, 4, 1, 5, M.floor, 0, F - 0.5, -42.5, 4);
ipB(S, 8, 1, 35, M.floor, -36, F - 0.5, -62.5, 4);
ipB(S, 48, 1, 35, M.floor, 16, F - 0.5, -62.5, 4);
ipB(S, 24, 1, 8.5, M.floor, -20, F - 0.5, -75.75, 4);
ipB(S, 24, 1, 9.5, M.floor, -20, F - 0.5, -49.75, 4);
var KH = F + 22 - (GL - 1);
ipWall(S, "x", 45, -55, 55, GL - 1, KH, 2, M.stone, [[-5, 5, 11]]);
ipWall(S, "x", -45, -55, 55, GL - 1, KH, 2, M.stone, [[-16, -12, 5.6], [12, 16, 5.6]]);
ipWall(S, "z", -55, -45, 45, GL - 1, KH, 2, M.stone, null);
ipWall(S, "z", 55, -45, 45, GL - 1, KH, 2, M.stone, null);
var top = F + 22;
[[45, 1], [-45, -1]].forEach(function (q) { for (var x = -50; x <= 50; x += 10) {
if (q[0] > 0 && Math.abs(x) < 8)
continue;
ipB(S, 1.4, KH, 0.8, M.trim, x, GL - 1 + KH / 2, q[0] + q[1] * 1.3);
} });
[[-55, -1], [55, 1]].forEach(function (q) { for (var z = -40; z <= 40; z += 10)
ipB(S, 0.8, KH, 1.4, M.trim, q[0] + q[1] * 1.3, GL - 1 + KH / 2, z); });
[F + 10.5, F + 21.4].forEach(function (y) { ipB(S, 113, 0.7, 0.8, M.trim, 0, y, 46.1); ipB(S, 113, 0.7, 0.8, M.trim, 0, y, -46.1); ipB(S, 0.8, 0.7, 93, M.trim, -56.1, y, 0); ipB(S, 0.8, 0.7, 93, M.trim, 56.1, y, 0); });
for (var cx = -53.5; cx <= 54; cx += 3) {
ipB(S, 1.6, 1.5, 2.4, M.trim, cx, top + 0.75, 44.6);
ipB(S, 1.6, 1.5, 2.4, M.trim, cx, top + 0.75, -44.6);
}
for (var cz = -43.5; cz <= 44; cz += 3) {
ipB(S, 2.4, 1.5, 1.6, M.trim, -54.6, top + 0.75, cz);
ipB(S, 2.4, 1.5, 1.6, M.trim, 54.6, top + 0.75, cz);
}
ipB(S, 110, 0.6, 90, M.stoneB, 0, top + 0.3, 0, 6);
function win(px, pz, y, w, h, face) { var m = face === "x" ? ipB(S, 0.12, h, w, M.glowWin, px, y, pz) : ipB(S, w, h, 0.12, M.glowWin, px, y, pz); var fr = face === "x" ? ipB(S, 0.3, h + 0.6, w + 0.6, M.trim, px - (px > 0 ? 0.1 : -0.1), y, pz) : ipB(S, w + 0.6, h + 0.6, 0.3, M.trim, px, y, pz - (pz > 0 ? 0.1 : -0.1)); var arch = face === "x" ? ipC(S, w / 2 + 0.3, w / 2 + 0.3, 0.3, M.trim, px - (px > 0 ? 0.1 : -0.1), y + h / 2, pz, 12) : ipC(S, w / 2 + 0.3, w / 2 + 0.3, 0.3, M.trim, px, y + h / 2, pz - (pz > 0 ? 0.1 : -0.1), 12); if (face === "x")
arch.rotation.z = Math.PI / 2;
else
arch.rotation.x = Math.PI / 2; }
for (var wx = -45; wx <= 45; wx += 10) {
if (Math.abs(wx) < 8)
continue;
win(wx, 46.05, F + 5, 2.2, 5, "z");
win(wx, 46.05, F + 15.5, 2.2, 4.5, "z");
win(wx, -46.05, F + 15.5, 2.2, 4.5, "z");
}
for (var wz = -35; wz <= 35; wz += 10) {
win(-56.05, wz, F + 5, 2.2, 5, "x");
win(56.05, wz, F + 5, 2.2, 5, "x");
win(-56.05, wz, F + 15.5, 2.2, 4.5, "x");
win(56.05, wz, F + 15.5, 2.2, 4.5, "x");
}
var rw = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#0E2A5A";
x.fillRect(0, 0, W, H);
var cx2 = W / 2, cy = H / 2;
for (var r = 0; r < 5; r++) {
x.strokeStyle = ["#A8DCFF", "#F0D890", "#CFF4FF", "#7AB8F0", "#F0D890"][r];
x.lineWidth = 6;
x.beginPath();
x.arc(cx2, cy, 120 - r * 22, 0, 6.283);
x.stroke();
}
for (var k = 0; k < 12; k++) {
x.save();
x.translate(cx2, cy);
x.rotate(k * Math.PI / 6);
x.fillStyle = k % 2 ? "#A8DCFF" : "#5A9AE0";
x.beginPath();
x.ellipse(0, -70, 14, 40, 0, 0, 6.283);
x.fill();
x.restore();
}
ipSigil(x, cx2, cy + 10, 34, "#FFFFFF", "#F0D890");
});
var rose = new THREE.Mesh(new THREE.CircleGeometry(5.5, 40), new THREE.MeshBasicMaterial({ map: rw }));
rose.position.set(0, F + 16, 46.2);
S.add(rose);
var rr = new THREE.Mesh(new THREE.TorusGeometry(5.8, 0.45, 8, 40), M.gold);
rr.position.set(0, F + 16, 46.25);
S.add(rr);
[[-62.5, -52.5], [62.5, -52.5], [-62.5, 52.5], [62.5, 52.5]].forEach(function (q) { ipTower(S, q[0], q[1], 8.5, 48, GL - 1, 32); });
[[-60.5, 0], [60.5, 0]].forEach(function (q) { ipTower(S, q[0], q[1], 5.5, 36, GL - 1, 20); });
[[-21, 47.5], [21, 47.5]].forEach(function (q) { ipTower(S, q[0], q[1], 3.6, 30, GL - 1, 14); });
ipC(S, 18, 18, 5, M.stone, 0, top + 2.5, -5, 32);
ipC(S, 18.6, 18.6, 0.8, M.trim, 0, top + 5.2, -5, 32);
for (var dw = 0; dw < 16; dw++) {
var a = dw / 16 * 6.283;
var p = ipB(S, 1.4, 3, 0.2, M.glowWinB, Math.cos(a) * 18.05, top + 2.6, -5 + Math.sin(a) * 18.05);
p.rotation.y = -a + Math.PI / 2;
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(17.6, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), M.crystal);
dome.position.set(0, top + 5.4, -5);
S.add(dome);
for (var rb = 0; rb < 12; rb++) {
var ra = rb / 12 * 6.283;
var rib = new THREE.Mesh(new THREE.TorusGeometry(17.7, 0.3, 6, 24, Math.PI / 2), M.gold);
rib.position.set(0, top + 5.4, -5);
rib.rotation.set(0, ra, 0);
S.add(rib);
}
ipC(S, 3.6, 4.4, 4, M.gold, 0, top + 5.4 + 17.6 + 1.6, -5, 16);
for (var cp = 0; cp < 10; cp++) {
var ca = cp / 10 * 6.283;
ipK(S, 0.5, 2.6, M.gold, Math.cos(ca) * 3.9, top + 5.4 + 17.6 + 4.6, -5 + Math.sin(ca) * 3.9, 6);
ipS(S, 0.35, M.glowB, Math.cos(ca) * 3.9, top + 5.4 + 17.6 + 6, -5 + Math.sin(ca) * 3.9, 8);
}
var spTop = top + 5.4 + 17.6 + 3.6 + 52;
ipK(S, 3.2, 52, M.crystal, 0, top + 5.4 + 17.6 + 3.6 + 26, -5, 12);
ipS(S, 1.4, M.glowB, 0, spTop + 1, -5, 12);
var star = wGlow(0xCFF4FF, 26, 0.75);
star.position.set(0, spTop + 1, -5);
D.add(star);
for (var c = -14; c <= 14; c += 5.6) {
ipC(S, 0.85, 0.95, 14, M.ice, c, F + 7, 52, 14);
ipC(S, 1.2, 1.2, 0.6, M.gold, c, F + 0.3, 52, 14);
ipC(S, 1.25, 1.1, 0.8, M.gold, c, F + 14.2, 52, 14);
ipRound(c, 52, 1, GL - 1, 16);
}
ipB(S, 32, 2, 8, M.trim, 0, F + 15.5, 50);
ipB(S, 32.6, 0.4, 8.6, M.gold, 0, F + 14.6, 50);
var ped = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 8, 3), M.trim);
ped.scale.set(16.5, 1, 4);
ped.rotation.set(-Math.PI / 2, 0, 0);
ped.position.set(0, F + 18.3, 50);
S.add(ped);
ipB(S, 30, 0.15, 10, M.stoneB, 0, F, 51, 3);
ipB(S, 34, 0.3, 1.6, M.trim, 0, GL + 0.15, 56.6);
[-1, 1].forEach(function (s) {
var g = new THREE.Group();
g.position.set(s * 5, F, 44.4);
g.rotation.y = -s * 1.2;
S.add(g);
ipB(g, 5, 10.6, 0.4, M.iceDeep, -s * 2.5, 5.3, 0);
ipB(g, 5.1, 0.3, 0.5, M.gold, -s * 2.5, 10.5, 0);
ipB(g, 5.1, 0.3, 0.5, M.gold, -s * 2.5, 5, 0);
ipS(g, 0.25, M.gold, -s * 4.4, 5, 0.3, 8);
for (var k = 0; k < 3; k++)
ipB(g, 0.2, 10.6, 0.5, M.gold, -s * (0.2 + k * 2.3), 5.3, 0);
});
[-1, 1].forEach(function (s) { ipBanner(D, s * 7.3, 52.9, F + 9, 0); });
},
function (S, D, px, y, pz, r) {
var M = ipMats();
ipC(S, 0.06, 0.06, 21.5 + IP.F - y, M.gold, px, (y + IP.F + 21) / 2, pz, 6);
var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.12, 6, 28), M.gold);
ring.rotation.x = Math.PI / 2;
ring.position.set(px, y, pz);
S.add(ring);
var ring2 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.55, 0.1, 6, 20), M.gold);
ring2.rotation.x = Math.PI / 2;
ring2.position.set(px, y + 1.1, pz);
S.add(ring2);
for (var k = 0; k < 14; k++) {
var a = k / 14 * 6.283;
var c = ipK(S, 0.12, 0.7, M.crystal, px + Math.cos(a) * r, y - 0.45, pz + Math.sin(a) * r, 6);
c.rotation.x = Math.PI;
ipS(S, 0.13, M.glowW, px + Math.cos(a) * r, y + 0.2, pz + Math.sin(a) * r, 8);
}
for (var k2 = 0; k2 < 8; k2++) {
var a2 = k2 / 8 * 6.283;
ipS(S, 0.11, M.glowW, px + Math.cos(a2) * r * 0.55, y + 1.3, pz + Math.sin(a2) * r * 0.55, 8);
}
var ck = ipK(S, 0.5, 1.6, M.crystal, px, y - 0.9, pz, 10);
ck.rotation.x = Math.PI;
var g = wGlow(0xFFE8C0, r * 3.4, 0.45);
g.position.set(px, y + 0.3, pz);
D.add(g);
},
function (S, px, pz, rot, mat) {
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.position.set(px, F, pz);
g.rotation.y = rot;
S.add(g);
ipB(g, 0.6, 0.1, 0.6, mat || M.velvet, 0, 0.5, 0);
[[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].forEach(function (q) { ipB(g, 0.07, 0.5, 0.07, M.gold, q[0], 0.25, q[1]); });
ipB(g, 0.6, 1.1, 0.08, M.gold, 0, 1.05, -0.28);
ipB(g, 0.48, 0.9, 0.05, mat || M.velvet, 0, 1.05, -0.24);
},
function (S, px, pz, w, h, rot) {
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.position.set(px, F, pz);
g.rotation.y = rot;
S.add(g);
ipB(g, w, h, 0.6, M.woodD, 0, h / 2, 0);
var tx = M.books.map.clone();
tx.needsUpdate = true;
tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
tx.repeat.set(Math.max(1, Math.round(w / 3)), Math.max(1, Math.round(h / 1.6)));
var b = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.3, h - 0.4), new THREE.MeshLambertMaterial({ map: tx }));
b.position.set(0, h / 2, 0.31);
g.add(b);
ipB(g, w + 0.2, 0.25, 0.75, M.gold, 0, h + 0.1, 0);
},
function (S, px, pz, r) {
var M = ipMats(), F = IP.F, R = wRand((px * 31 + pz * 17) | 0);
var h = ipS(S, r, M.gold, px, F, pz, 16);
h.scale.set(1, 0.45, 1);
for (var k = 0; k < 14; k++) {
var a = R() * 6.283, d = R() * r * 0.9;
var cn = ipC(S, 0.16, 0.16, 0.04, M.gold, px + Math.cos(a) * d, F + 0.3 + R() * r * 0.35, pz + Math.sin(a) * d, 10);
cn.rotation.set(R() * 1.2, 0, R() * 1.2);
}
for (var g2 = 0; g2 < 5; g2++) {
var a2 = R() * 6.283, d2 = R() * r * 0.7;
var gm = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), new THREE.MeshPhongMaterial({ color: [0xE83A5A, 0x3A8AF0, 0x3AE07A, 0xB86AF0, 0xF0F4FF][g2], shininess: 120, specular: 0xFFFFFF, emissive: [0x3A0A14, 0x0A1E3A, 0x0A3A1A, 0x2A143A, 0x2A2E3A][g2] }));
gm.position.set(px + Math.cos(a2) * d2, F + r * 0.38 + 0.1, pz + Math.sin(a2) * d2);
S.add(gm);
}
},
function (S, px, pz, rot, open) {
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.position.set(px, F, pz);
g.rotation.y = rot || 0;
S.add(g);
ipB(g, 1.4, 0.8, 0.9, M.wood, 0, 0.4, 0);
ipB(g, 1.45, 0.1, 0.95, M.gold, 0, 0.8, 0);
[-0.5, 0.5].forEach(function (x) { ipB(g, 0.08, 0.82, 0.96, M.gold, x, 0.41, 0); });
if (open) {
var lid = ipB(g, 1.4, 0.12, 0.9, M.wood, 0, 1.15, -0.45);
lid.rotation.x = -1.2;
lid.position.set(0, 1.2, -0.62);
var gh = ipS(g, 0.6, M.gold, 0, 0.78, 0, 12);
gh.scale.set(1.1, 0.35, 0.7);
}
else {
var top = ipC(g, 0.45, 0.45, 1.4, M.wood, 0, 0.82, 0, 12);
top.rotation.z = Math.PI / 2;
top.scale.set(1, 1, 1);
}
ipS(g, 0.07, M.gold, 0, 0.62, 0.47, 8);
},
function (S, px, pz, rot, o) {
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.position.set(px, F, pz);
g.rotation.y = rot || 0;
S.add(g);
o = o || {};
var A = o.mat || M.silver;
ipC(g, 0.5, 0.6, 0.3, M.stoneB, 0, 0.15, 0, 12);
ipC(g, 0.05, 0.05, 0.9, M.woodD, 0, 0.75, 0, 6);
[-0.12, 0.12].forEach(function (x) { ipC(g, 0.09, 0.1, 0.85, A, x, 0.62, 0, 8); });
var t = ipC(g, 0.27, 0.2, 0.75, A, 0, 1.45, 0, 12);
t.scale.z = 0.7;
[-1, 1].forEach(function (s) { var p = ipS(g, 0.16, A, s * 0.32, 1.78, 0, 10); p.scale.set(1, 0.75, 1); ipC(g, 0.07, 0.07, 0.65, A, s * 0.36, 1.4, 0, 8); });
ipS(g, 0.15, A, 0, 2.05, 0, 12);
if (o.helm !== false) {
ipC(g, 0.17, 0.17, 0.06, M.gold, 0, 2.05, 0, 12);
ipK(g, 0.06, 0.25, M.gold, 0, 2.28, 0, 6);
}
if (o.trim)
ipB(g, 0.06, 0.6, 0.32, o.trim, 0, 1.45, 0.14);
if (o.cape) {
var cp = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.55, 1.6, 14, 1, true, Math.PI * 0.6, Math.PI * 0.8), o.cape);
cp.material.side = THREE.DoubleSide;
cp.position.set(0, 1.1, -0.03);
g.add(cp);
}
return g;
},
function (S, px, pz, rot, n) {
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.position.set(px, F, pz);
g.rotation.y = rot;
S.add(g);
var w = n * 0.9 + 0.6;
ipB(g, w, 0.2, 0.6, M.woodD, 0, 0.1, 0);
ipB(g, w, 0.12, 0.25, M.woodD, 0, 1.6, -0.15);
ipB(g, 0.15, 2, 0.15, M.woodD, -w / 2, 1, -0.15);
ipB(g, 0.15, 2, 0.15, M.woodD, w / 2, 1, -0.15);
for (var k = 0; k < n; k++) {
var x = -w / 2 + 0.75 + k * 0.9;
if (k % 3 === 0) {
ipB(g, 0.09, 1.6, 0.03, M.silver, x, 1.05, 0);
ipB(g, 0.36, 0.07, 0.08, M.gold, x, 0.22, 0);
ipC(g, 0.03, 0.03, 0.25, M.wood, x, 0.08, 0, 6);
}
else if (k % 3 === 1) {
ipC(g, 0.025, 0.025, 2.4, M.wood, x, 1.2, 0, 6);
ipK(g, 0.06, 0.3, M.silver, x, 2.55, 0, 5);
}
else {
ipC(g, 0.03, 0.03, 1.2, M.wood, x, 0.7, 0, 6);
var ax = ipB(g, 0.32, 0.28, 0.05, M.silver, x + 0.12, 1.3, 0);
}
}
},
function (S, px, y, pz, rot) {
var M = ipMats();
var g = new THREE.Group();
g.position.set(px, y, pz);
g.rotation.y = rot;
S.add(g);
var d = ipC(g, 0.75, 0.75, 0.1, M.velvet, 0, 0, 0, 20);
d.rotation.x = Math.PI / 2;
var r = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.06, 6, 20), M.silver);
g.add(r);
for (var k = 0; k < 6; k++) {
var b = ipB(g, 0.06, 0.65, 0.04, M.silver, 0, 0, 0.06);
b.rotation.z = k * Math.PI / 3;
}
ipS(g, 0.1, M.gold, 0, 0, 0.06, 8);
},
function (S, D) {
var M = ipMats(), F = IP.F;
ipWall(S, "z", -20, -44, 44, F, 21, 1, M.wallIn, [[26, 31, 6]]);
ipWall(S, "z", 20, -44, 44, F, 21, 1, M.wallIn, [[26, 31, 6], [-6, -1, 5], [-36, -32, 5]]);
ipWall(S, "x", 10, -54, -20, F, 10, 1, M.wallIn, [[-40, -36, 3.4]]);
ipWall(S, "x", -17, -54, -20, F, 10, 1, M.wallIn, [[-40, -36, 3.4]]);
ipWall(S, "x", 10, 20, 54, F, 10, 1, M.wallIn, null);
ipWall(S, "x", -17, 20, 54, F, 10, 1, M.wallIn, null);
[[-53.9, 1], [53.9, -1]].forEach(function (q) { ipB(S, 0.1, 10, 88, M.wallIn, q[0], F + 5, 0); });
ipB(S, 108, 21, 0.1, M.wallIn, 0, F + 10.5, 43.9);
ipB(S, 108, 21, 0.1, M.wallIn, 0, F + 10.5, -43.9);
ipB(S, 34, 0.5, 88, M.trim, -37, F + 10.25, 0);
ipB(S, 34, 0.5, 88, M.trim, 37, F + 10.25, 0);
ipB(S, 40, 0.6, 88, M.trim, 0, F + 21.3, 0);
[[-19.45, 1], [19.45, -1]].forEach(function (q) { ipB(S, 0.1, 3, 88, M.trim, q[0] + q[1] * 0.05, F + 1.5, 0); ipB(S, 0.14, 0.18, 88, M.gold, q[0] + q[1] * 0.08, F + 3, 0); });
for (var cz = -35; cz <= 35; cz += 10) {
[-14, 14].forEach(function (s) { ipC(S, 0.85, 0.95, 20, M.ice, s, F + 10, cz, 14); ipC(S, 1.25, 1.25, 0.6, M.gold, s, F + 0.3, cz, 14); ipC(S, 1.3, 0.95, 1, M.gold, s, F + 20.5, cz, 14); ipRound(s, cz, 1, F - 1, 22); });
ipB(S, 40, 0.7, 0.7, M.gold, 0, F + 20.65, cz);
}
for (var bz = -30; bz <= 30; bz += 10) {
[-1, 1].forEach(function (s) { var b = ipBanner(D, s * 19.3, bz, F + 13, s * -Math.PI / 2); b.scale.set(0.8, 0.8, 1); ipB(S, 0.1, 5, 2.2, M.glowWinB, s * 19.45, F + 16.5, bz + 5); });
}
ipB(S, 5, 0.04, 61, M.carpet, 0, F + 0.02, 13.5);
ipChandelier(S, D, 0, F + 14, -5, 2.8);
ipChandelier(S, D, 0, F + 14, 15, 2.8);
ipChandelier(S, D, 0, F + 14, 33, 2.4);
ipB(S, 16, 0.4, 9, M.trim, 0, F + 0.2, -21.5);
ipB(S, 14, 0.4, 7.6, M.trim, 0, F + 0.6, -22);
ipB(S, 12, 0.4, 6.4, M.trim, 0, F + 1, -22.4);
ipB(S, 16.1, 0.08, 9.1, M.gold, 0, F + 0.41, -21.5);
ipB(S, 5, 0.03, 3, M.carpet, 0, F + 1.215, -19.6);
ipThrone(S, D, -2.4, -23.4, 1);
ipThrone(S, D, 2.6, -23.2, 0.82);
[-7, 7].forEach(function (s) { ipC(S, 0.6, 0.35, 1.4, M.gold, s, F + 1.9, -18.6, 10); for (var k = 0; k < 5; k++) {
var a = k / 5 * 6.283;
ipK(S, 0.18, 0.9, M.crystal, s + Math.cos(a) * 0.25, F + 3, -18.6 + Math.sin(a) * 0.25, 6);
} ipS(S, 0.4, M.glowB, s, F + 2.8, -18.6, 10); var g = wGlow(0xBFEFFF, 4, 0.55); g.position.set(s, F + 3.1, -18.6); D.add(g); ipRound(s, -18.6, 0.7, F, 3); });
ipBox(-2.4, -24, 1.5, 1.2, F, 4);
ipBox(2.6, -23.8, 1.3, 1, F, 4);
var sig = wTex(512, 512, function (x, W, H) { x.fillStyle = "#14244E"; x.fillRect(0, 0, W, H); x.strokeStyle = "#D8B650"; x.lineWidth = 12; x.strokeRect(14, 14, W - 28, H - 28); ipSigil(x, W / 2, H / 2 + 40, 150, "#E8F4FF", "#D8B650"); });
var sm = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ map: sig }));
sm.position.set(0, F + 11, -43.9);
S.add(sm);
ipB(S, 15, 15, 0.2, M.gold, 0, F + 11, -44);
ipWestWing(S, D);
ipEastWing(S, D);
[[0, F + 15, -2, 0xE8F0FF, 0.9, 75], [0, F + 10, -28, 0xCFE4FF, 0.6, 40], [-37, F + 8, 27, 0xFFE6C0, 0.7, 40], [-37, F + 7, -16, 0xFFE2B0, 0.9, 42], [37, F + 8, 27, 0xFFE2B8, 0.7, 40], [37, F + 8, -17, 0xFFE6C8, 0.7, 44]].forEach(function (q) { var l = new THREE.PointLight(q[3], q[4], q[5], 1.3); l.position.set(q[0], q[1], q[2]); D.add(l); });
},
function (S, D, px, pz, k) {
var M = ipMats(), F = IP.F + 1.2, g = new THREE.Group();
g.position.set(px, F, pz);
g.scale.setScalar(k);
S.add(g);
ipB(g, 2.6, 0.9, 2.2, M.iceDeep, 0, 0.45, 0);
ipB(g, 2.2, 0.25, 1.8, M.velvet, 0, 1.0, 0.1);
ipB(g, 2.7, 0.12, 2.3, M.gold, 0, 0.9, 0);
[-1, 1].forEach(function (s) { ipB(g, 0.35, 1, 2, M.iceDeep, s * 1.2, 1.4, 0.05); ipS(g, 0.25, M.gold, s * 1.2, 1.95, 0.95, 10); });
ipB(g, 2.6, 4.6, 0.5, M.iceDeep, 0, 3, -1);
ipB(g, 2.1, 3.6, 0.1, M.velvet, 0, 2.6, -0.72);
for (var k2 = -3; k2 <= 3; k2++) {
var h = 2.2 + (3 - Math.abs(k2)) * 0.9;
ipK(g, 0.32, h, M.crystal, k2 * 0.42, 5.2 + h / 2, -1, 6);
}
ipS(g, 0.35, M.glowB, 0, 5.7, -0.7, 10);
ipC(g, 0.55, 0.55, 0.12, M.gold, 0, 5.7, -0.75, 16).rotation.x = Math.PI / 2;
var fur = ipB(g, 1.8, 0.08, 2.8, M.fur, 0.1, 1.17, 0.3);
fur.rotation.x = 0.08;
},
function (S, D) {
var M = ipMats(), F = IP.F;
ipRack(S, -37, 43.4, Math.PI, 14);
ipRack(S, -53.4, 30, Math.PI / 2, 10);
ipRack(S, -53.4, 17, Math.PI / 2, 6);
ipBox(-37, 43.4, 7, 0.5, F, 2.6);
ipBox(-53.4, 30, 0.5, 5, F, 2.6);
ipBox(-53.4, 17, 0.5, 3, F, 2.6);
for (var k = 0; k < 6; k++) {
var x = -46 + (k % 3) * 6, z = k < 3 ? 36 : 20;
ipMannequin(S, x, z, 0);
ipRound(x, z, 0.6, F, 2.3);
}
ipB(S, 6, 0.2, 3.4, M.wood, -37, F + 0.95, 28);
[[-39.6, 26.6], [-34.4, 26.6], [-39.6, 29.4], [-34.4, 29.4]].forEach(function (q) { ipB(S, 0.25, 0.9, 0.25, M.woodD, q[0], F + 0.45, q[1]); });
var map = wTex(256, 160, function (x, W, H) { x.fillStyle = "#E8DCB8"; x.fillRect(0, 0, W, H); x.strokeStyle = "#6A4A2A"; x.lineWidth = 2; x.strokeRect(6, 6, W - 12, H - 12); x.fillStyle = "#8AB0D0"; x.beginPath(); x.ellipse(W / 2, H / 2, 70, 45, 0, 0, 6.283); x.fill(); x.fillStyle = "#F4F8FF"; x.beginPath(); x.arc(W / 2, H / 2, 16, 0, 6.283); x.fill(); x.fillStyle = "#6A4A2A"; x.font = "bold 12px Georgia"; x.textAlign = "center"; x.fillText("THE NORTH", W / 2, 22); });
var mp = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.1), new THREE.MeshLambertMaterial({ map: map }));
mp.rotation.x = -Math.PI / 2;
mp.position.set(-37, F + 1.07, 28);
S.add(mp);
ipBox(-37, 28, 3, 1.7, F, 1.1);
ipB(S, 3, 0.9, 1.2, M.woodD, -24, F + 0.45, 38);
var gs = ipC(S, 0.55, 0.55, 0.18, M.stoneB, -24, F + 1.45, 38, 18);
gs.rotation.z = Math.PI / 2;
ipB(S, 0.1, 0.6, 0.1, M.woodD, -24.1, F + 1.2, 38);
ipBox(-24, 38, 1.6, 0.7, F, 1.4);
for (var k3 = 0; k3 < 6; k3++) {
var x3 = -46 + (k3 % 3) * 6, z3 = k3 < 3 ? 28 : 13.5;
if (z3 === 28 && x3 > -44)
continue;
ipMannequin(S, x3, z3, Math.PI);
ipRound(x3, z3, 0.6, F, 2.3);
}
ipRack(S, -37, 20, 0, 10);
ipRack(S, -37, 20.6, Math.PI, 10);
ipBox(-37, 20.3, 5, 0.7, F, 2.6);
[[-46, 43.6], [-28, 43.6]].forEach(function (q) { ipBanner(D, q[0], q[1], F + 6.5, Math.PI).scale.set(0.7, 0.6, 1); });
for (var sz = 14; sz <= 40; sz += 6.5)
ipShield(S, -20.7, F + 5.5, sz, -Math.PI / 2);
for (var sx = -50; sx <= -24; sx += 6.5)
ipShield(S, sx, F + 5.5, 10.6, 0);
ipSigilPanel(D, "blades", -38, 10, F);
ipSigilPanel(D, "armour", -38, -17, F);
ipB(S, 33.6, 9.5, 0.1, M.navy, -37, F + 4.75, 9.4);
ipB(S, 33.6, 9.5, 0.1, M.navy, -37, F + 4.75, -16.4);
ipB(S, 0.1, 9.5, 26.6, M.navy, -53.9, F + 4.75, -3.5);
[[-37, 9.3, 33.6, "x"], [-37, -16.3, 33.6, "x"], [-37, -17.5, 33.6, "x"], [-37, -43.8, 33.6, "x"]].forEach(function (q) { ipB(S, q[2], 0.25, 0.14, M.gold, q[0], F + 9.2, q[1]); ipB(S, q[2], 0.25, 0.14, M.gold, q[0], F + 1, q[1]); });
for (var vz = -41; vz <= 7; vz += 6) {
ipB(S, 0.14, 8, 0.25, M.gold, -53.8, F + 5, vz);
}
var plin = [[-46, 3], [-37, 3], [-28, 3], [-46, -9], [-37, -9], [-28, -9]];
plin.forEach(function (q) { ipPlinth(S, D, q[0], q[1]); });
[[-51, 6.5], [-51, -13], [-23.5, -13], [-23.5, 6.5], [-41.5, -3], [-32.5, -3]].forEach(function (q, i) { ipGoldHeap(S, q[0], q[1], i < 4 ? 2.2 : 1.2); });
[[-52, 0, Math.PI / 2], [-52, -7, Math.PI / 2], [-30, -15.5, 0]].forEach(function (q) { ipChest(S, q[0], q[1], q[2], true); });
ipB(S, 33.6, 9.5, 0.1, M.navy, -37, F + 4.75, -17.6);
ipB(S, 33.6, 9.5, 0.1, M.navy, -37, F + 4.75, -43.9);
ipB(S, 0.1, 9.5, 26.4, M.navy, -53.9, F + 4.75, -30.5);
[[-47, -24], [-27, -24], [-47, -37], [-27, -37]].forEach(function (q) { ipC(S, 1.3, 1.4, 0.5, M.crystal, q[0], F + 0.25, q[1], 16); });
[[-37, -30, 0]].forEach(function (q) { ipC(S, 1.6, 1.7, 0.6, M.crystal, q[0], F + 0.3, q[1], 16); });
[[-51.5, -41.5], [-22.5, -41.5], [-51.5, -20], [-22.5, -20]].forEach(function (q) { ipGoldHeap(S, q[0], q[1], 1.8); });
ipChest(S, -37, -42.6, 0, true);
ipChest(S, -33, -42.6, 0, false);
ipChest(S, -41, -42.6, 0, false);
},
function (D, key, px, pz, F) {
var M = ipMats();
var t = wTex(256, 256, function (x, W, H) { x.fillStyle = "#9AB2CC"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(90,110,140,0.6)"; x.lineWidth = 3; for (var y = 0; y < H; y += 42) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
} ipSigil(x, W / 2, H / 2 + 20, 62, "rgba(225,245,255,0.95)", "rgba(240,216,144,0.95)"); });
var g = new THREE.Group();
g.position.set(px, F, pz);
D.add(g);
var slab = new THREE.Mesh(new THREE.BoxGeometry(4, 3.4, 0.9), [M.stoneB, M.stoneB, M.stoneB, M.stoneB, new THREE.MeshLambertMaterial({ map: t }), new THREE.MeshLambertMaterial({ map: t })]);
slab.position.y = 1.7;
g.add(slab);
var w = ipW(px, pz);
IP.doors[key] = { g: slab, open: false, k: 0, solid: { x: w.x, z: w.z, hw: 0.5, hd: 2, b: F, h: 3.6 } };
IP.spots.push({ x: w.x, z: w.z, y: F, r: 3.2, name: key === "blades" ? "A frost sigil in the stone" : "Another frost sigil", verb: "touch it", fn: function () { ipOpenDoor(key); } });
},
function (key) {
var d = IP.doors[key];
if (!d)
return;
d.open = !d.open;
if (key === "stair")
setStatus(d.open ? "<b>The sigil wakes under your hand.</b> The floor behind the throne slides away: a stair of ice goes down into the cold, lit blue from below." : "The slab slides back over the stair.");
else if (key === "blades")
setStatus(d.open ? "<b>The sigil glows, and the stone slides into the wall.</b> Beyond: the Vault of Blades." : "The stone slides back.");
else
setStatus(d.open ? "<b>The second sigil opens:</b> the Vault of Armour." : "The stone slides back.");
if (typeof playTone === "function") {
playTone(220, 0.3);
setTimeout(function () { playTone(330, 0.4); }, 180);
}
},
function (S, D, px, pz) {
var M = ipMats(), F = IP.F;
ipC(S, 0.9, 1.1, 1.1, M.crystal, px, F + 0.55, pz, 8);
ipC(S, 1.05, 1.05, 0.12, M.gold, px, F + 1.16, pz, 8);
ipC(S, 1.15, 1.25, 0.15, M.gold, px, F + 0.07, pz, 8);
ipRound(px, pz, 1.2, F, 1.4);
var g = wGlow(0xCFF0FF, 3.2, 0.5);
g.position.set(px, F + 2.1, pz);
D.add(g);
IP.plinths = IP.plinths || [];
IP.plinths.push({ px: px, pz: pz });
},
function (S, D) {
var M = ipMats(), F = IP.F;
ipB(S, 3.4, 0.2, 27, M.linen, 37, F + 0.95, 27);
ipB(S, 3.2, 0.75, 26.6, M.woodD, 37, F + 0.45, 27);
ipBox(37, 27, 1.9, 13.6, F, 1.1);
for (var k = 0; k < 12; k++) {
var z = 15 + k * 2.2;
ipChair(S, 34.6, z, Math.PI / 2);
ipChair(S, 39.4, z, -Math.PI / 2);
[-1, 1].forEach(function (s) { ipC(S, 0.28, 0.24, 0.03, M.gold, 37 + s * 1.15, F + 1.07, z, 16); var gb = ipC(S, 0.05, 0.07, 0.22, M.crystal, 37 + s * 1.45, F + 1.17, z + 0.5, 8); });
}
[16, 27, 38].forEach(function (z) { ipC(S, 0.12, 0.2, 0.7, M.gold, 37, F + 1.4, z, 8); for (var a = 0; a < 5; a++) {
var aa = a / 5 * 6.283;
ipC(S, 0.04, 0.04, 0.4, M.linen, 37 + Math.cos(aa) * 0.35, F + 1.95, z + Math.sin(aa) * 0.35, 6);
ipS(S, 0.06, M.glowW, 37 + Math.cos(aa) * 0.35, F + 2.2, z + Math.sin(aa) * 0.35, 6);
} var g = wGlow(0xFFE0A8, 2.4, 0.55); g.position.set(37, F + 2.2, z); D.add(g); });
[21, 33].forEach(function (z) { var pl = ipC(S, 0.7, 0.5, 0.15, M.gold, 37, F + 1.1, z, 16); var roast = ipS(S, 0.4, new THREE.MeshLambertMaterial({ color: 0x9A5A2A }), 37, F + 1.35, z, 12); roast.scale.set(1.4, 0.8, 1); ipS(S, 0.18, new THREE.MeshLambertMaterial({ color: 0xC83A3A }), 37.5, F + 1.3, z + 0.5, 8); ipS(S, 0.18, new THREE.MeshLambertMaterial({ color: 0x6AA83A }), 36.5, F + 1.3, z - 0.4, 8); });
ipThroneChair(S, 37, 13);
ipThroneChair(S, 37, 41.2, Math.PI);
ipB(S, 1.2, 4, 5, M.stone, 53.6, F + 2, 27);
ipB(S, 0.5, 2.6, 3.4, M.black, 53, F + 1.3, 27);
for (var fl = 0; fl < 6; fl++) {
ipK(S, 0.3, 1.2 + (fl % 3) * 0.35, M.crystal, 52.9, F + 0.7 + (fl % 3) * 0.17, 25.8 + fl * 0.48, 6);
}
ipS(S, 0.6, M.glowB, 52.9, F + 0.9, 27, 10);
var hg = wGlow(0xBFEFFF, 5, 0.55);
hg.position.set(52.6, F + 1.4, 27);
D.add(hg);
ipB(S, 1.8, 0.3, 6, M.gold, 53.4, F + 4.1, 27);
[[21, 43.5], [53.5, 15], [53.5, 39]].forEach(function (q, i) { ipB(S, i ? 0.6 : 5, 1, i ? 3.2 : 0.6, M.woodD, q[0] + (i ? 0 : 10), F + 0.5, q[1]); });
ipChandelier(S, D, 37, F + 8, 21, 1.8);
ipChandelier(S, D, 37, F + 8, 33, 1.8);
ipShelf(S, 53.6, -3.5, 24, 9, -Math.PI / 2);
ipShelf(S, 37, 9.3, 30, 9, Math.PI);
ipShelf(S, 37, -16.3, 30, 9, 0);
ipBox(53.6, -3.5, 0.5, 12, F, 9);
ipBox(37, 9.3, 15, 0.5, F, 9);
ipBox(37, -16.3, 15, 0.5, F, 9);
[[52.6, -9], [52.6, 3]].forEach(function (q) { var l = ipB(S, 0.9, 8.6, 0.1, M.wood, q[0], F + 4.3, q[1]); l.rotation.y = Math.PI / 2; l.rotation.z = 0.12; });
[[33, -8], [33, 1]].forEach(function (q) {
ipB(S, 4, 0.15, 2, M.wood, q[0], F + 0.9, q[1]);
[[-1.8, -0.8], [1.8, -0.8], [-1.8, 0.8], [1.8, 0.8]].forEach(function (r) { ipB(S, 0.15, 0.85, 0.15, M.woodD, q[0] + r[0], F + 0.43, q[1] + r[1]); });
ipChair(S, q[0] - 1, q[1] - 1.6, 0, M.velvetR);
ipChair(S, q[0] + 1, q[1] + 1.6, Math.PI, M.velvetR);
ipBox(q[0], q[1], 2, 1, F, 1);
for (var b = 0; b < 3; b++)
ipB(S, 0.5, 0.12, 0.35, [M.velvet, M.velvetR, M.wood][b], q[0] - 1 + b * 0.8, F + 1.03, q[1]);
ipC(S, 0.08, 0.12, 0.5, M.gold, q[0] + 1.4, F + 1.2, q[1], 8);
ipS(S, 0.15, M.glowW, q[0] + 1.4, F + 1.55, q[1], 8);
});
ipC(S, 0.12, 0.4, 1, M.gold, 45, F + 0.5, -12);
var gl = ipS(S, 0.75, new THREE.MeshLambertMaterial({ color: 0x4A8AC8 }), 45, F + 1.8, -12, 20);
var gr = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.04, 6, 24), M.gold);
gr.position.set(45, F + 1.8, -12);
gr.rotation.y = 0.4;
S.add(gr);
ipRound(45, -12, 0.9, F, 2.5);
ipB(S, 3.6, 1.1, 1.6, M.woodD, 26.5, F + 0.55, -9);
ipChair(S, 26.5, -10.4, Math.PI * 0, M.velvet);
ipBox(26.5, -9, 1.8, 0.8, F, 1.2);
ipB(S, 6, 0.7, 7, M.woodD, 46, F + 0.35, -31);
ipB(S, 5.8, 0.5, 6.8, M.linen, 46, F + 0.95, -31);
ipB(S, 5.9, 0.2, 5, M.fur, 46, F + 1.25, -30);
[-1.8, 0, 1.8].forEach(function (x) { ipB(S, 1.4, 0.4, 0.8, M.linen, 46 + x, F + 1.4, -34); });
[[-2.9, -3.4], [2.9, -3.4], [-2.9, 3.4], [2.9, 3.4]].forEach(function (q) { ipC(S, 0.14, 0.16, 6, M.gold, 46 + q[0], F + 3, -31 + q[1], 8); });
ipB(S, 6.2, 0.3, 7.2, M.velvet, 46, F + 6.1, -31);
ipB(S, 6.4, 0.5, 7.4, M.gold, 46, F + 6.45, -31);
[[-2.9, -3.4], [2.9, -3.4], [-2.9, 3.4], [2.9, 3.4]].forEach(function (q) { var cu = ipC(S, 0.35, 0.22, 4.6, M.velvet, 46 + q[0] * 1.03, F + 3.6, -31 + q[1] * 1.02, 10); });
ipB(S, 6.6, 4, 0.4, M.velvet, 46, F + 2.4, -34.6);
var hs = ipS(S, 0.5, M.gold, 46, F + 4.6, -34.5, 10);
ipBox(46, -31, 3.1, 3.6, F, 2);
ipB(S, 4, 5.5, 1.2, M.woodD, 30, F + 2.75, -43.3);
ipB(S, 0.08, 5, 0.04, M.gold, 30, F + 2.75, -42.68);
ipBox(30, -43.3, 2, 0.7, F, 5.5);
ipB(S, 2.6, 1, 1, M.wood, 53.4, F + 0.5, -23);
var mir = ipB(S, 0.06, 1.8, 1.4, new THREE.MeshPhongMaterial({ color: 0xD8E8F4, shininess: 140, specular: 0xFFFFFF }), 53.85, F + 2.1, -23);
ipBox(53.4, -23, 0.6, 1.4, F, 2);
var rug = new THREE.Mesh(new THREE.CircleGeometry(3, 24), M.fur);
rug.rotation.x = -Math.PI / 2;
rug.position.set(40, F + 0.02, -24);
S.add(rug);
ipChest(S, 46, -26.2, 0, false);
ipB(S, 1.2, 4, 5, M.stone, 21.2, F + 2, -24);
ipB(S, 0.5, 2.4, 3.2, M.black, 21.7, F + 1.2, -24);
for (var bf = 0; bf < 5; bf++)
ipK(S, 0.28, 1 + (bf % 2) * 0.4, M.crystal, 21.9, F + 0.6, -25.2 + bf * 0.6, 6);
ipS(S, 0.5, M.glowB, 21.9, F + 0.7, -24, 10);
ipB(S, 1.6, 0.3, 6, M.gold, 21.4, F + 4.1, -24);
ipBox(21.2, -24, 0.6, 2.5, F, 4);
var bg = wGlow(0x8FDCFF, 4.5, 0.5);
bg.position.set(22.2, F + 1.2, -24);
D.add(bg);
ipB(S, 1.2, 0.5, 4, M.fur, 26.5, F + 0.5, -24);
ipB(S, 0.4, 0.9, 4, M.fur, 27, F + 1.1, -24);
ipBox(26.6, -24, 0.7, 2, F, 1.2);
var rug2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 7), M.velvet);
rug2.rotation.x = -Math.PI / 2;
rug2.position.set(24.5, F + 0.02, -24);
S.add(rug2);
ipB(S, 3, 0.12, 1.4, M.wood, 50, F + 0.95, -41.5);
[[-1.3, -0.5], [1.3, -0.5], [-1.3, 0.5], [1.3, 0.5]].forEach(function (q) { ipB(S, 0.12, 0.9, 0.12, M.woodD, 50 + q[0], F + 0.45, -41.5 + q[1]); });
ipChair(S, 50, -40.2, Math.PI, M.velvet);
ipBox(50, -41.5, 1.5, 0.7, F, 1.1);
ipShelf(S, 37, -43.4, 8, 5, 0);
ipBox(37, -43.4, 4, 0.4, F, 5);
ipChandelier(S, D, 42, F + 8, -30, 1.6);
},
function (S, D) {
var M = ipMats(), F = IP.F, GL = IP.GL;
ipWall(S, "x", -80, -40, 40, GL - 1, 12, 1.5, M.stone, [[18, 22, 5]]);
ipB(S, 5.2, 0.5, 1.9, M.gold, 20, GL + 4.25, -80);
ipB(S, 0.5, 5, 1.9, M.gold, 17.75, GL + 1.5, -80);
ipB(S, 0.5, 5, 1.9, M.gold, 22.25, GL + 1.5, -80);
ipB(S, 4, 0.3, 8, M.stoneB, 20, GL + 0.15, -84.6);
ipWall(S, "z", -40, -80, -45, GL - 1, 12, 1.5, M.stone, null);
ipWall(S, "z", 40, -80, -45, GL - 1, 12, 1.5, M.stone, null);
ipWall(S, "z", 0, -80, -45, F, 10.7, 0.8, M.stone, [[-64, -60, 4]]);
ipB(S, 82, 0.4, 37, M.crystal, 0, GL + 11.2, -62.5);
for (var rx = -36; rx <= 36; rx += 8)
ipB(S, 0.4, 0.6, 37, M.gold, rx, GL + 11.1, -62.5);
for (var w = -35; w <= 35; w += 10) {
if (Math.abs(w) < 3)
continue;
ipB(S, 2.4, 5, 0.12, M.glowWinB, w, F + 4.5, -80.8);
}
var pool = new THREE.Mesh(new THREE.PlaneGeometry(24, 17), M.water);
pool.rotation.x = -Math.PI / 2;
pool.position.set(-20, F - 0.45, -63);
S.add(pool);
ipB(S, 24, 0.2, 17, new THREE.MeshLambertMaterial({ color: 0x2A6A8A }), -20, F - 1.3, -63);
var warm = new THREE.MeshLambertMaterial({ color: 0xB8A890 });
ipB(S, 24.6, 1.3, 0.3, warm, -20, F - 0.6, -71.65);
ipB(S, 24.6, 1.3, 0.3, warm, -20, F - 0.6, -54.35);
ipB(S, 0.3, 1.3, 17, warm, -32.15, F - 0.6, -63);
ipB(S, 0.3, 1.3, 17, warm, -7.85, F - 0.6, -63);
ipB(S, 25, 0.18, 0.9, warm, -20, F + 0.09, -72.1);
ipB(S, 25, 0.18, 0.9, warm, -20, F + 0.09, -53.9);
ipB(S, 0.9, 0.18, 18.8, warm, -32.6, F + 0.09, -63);
ipB(S, 0.9, 0.18, 18.8, warm, -7.4, F + 0.09, -63);
for (var r = 0; r < 10; r++) {
var st = ipS(S, 0.8, new THREE.MeshLambertMaterial({ color: [0xA89880, 0x988870, 0xB8A890][r % 3] }), -31 + r * 2.4, F + 0.15, -72.6, 8);
st.scale.set(1.3, 0.45, 1);
}
ipB(S, 4, 0.4, 1.2, warm, -20, F - 0.6, -55.2);
IP.drift.push({ kind: "steam", cx: -20, cz: -63, rx: 11, rz: 7.5, y: F - 0.4, n: 16 });
[[-36, -50], [-36, -56], [-36, -70], [-36, -76]].forEach(function (q) { ipB(S, 1.2, 0.4, 2.4, M.woodD, q[0], F + 0.45, q[1]); ipB(S, 1.1, 0.12, 2.2, M.linen, q[0], F + 0.7, q[1]); var bk = ipB(S, 1.1, 0.9, 0.12, M.woodD, q[0], F + 0.9, q[1] - 1.15); bk.rotation.x = -0.4; ipBox(q[0], q[1], 0.6, 1.2, F, 0.9); });
for (var t = 0; t < 3; t++) {
for (var k = 0; k < 4; k++)
ipB(S, 0.7, 0.14, 0.5, [M.linen, M.fur, M.velvet][k % 3], -4, F + 0.07 + k * 0.15, -47 + t * 0.0 - t * 1.2);
}
ipB(S, 1.6, 0.03, 34, M.stoneB, 20, F + 0.02, -62.5);
ipB(S, 38, 0.03, 1.6, M.stoneB, 20, F + 0.02, -62.5);
[[10, -53], [30, -53], [10, -72], [30, -72]].forEach(function (q, i) {
ipB(S, 14, 0.5, 12, M.woodD, q[0], F + 0.25, q[1]);
ipB(S, 13.4, 0.1, 11.4, new THREE.MeshLambertMaterial({ color: 0x2A4A3A }), q[0], F + 0.52, q[1]);
var R = wRand(500 + i);
var roses = [M.linen, new THREE.MeshLambertMaterial({ color: 0xA8D4FF }), new THREE.MeshLambertMaterial({ color: 0xC8B8F0 })];
for (var f = 0; f < 18; f++) {
var x = q[0] + (R() - 0.5) * 11.5, z = q[1] + (R() - 0.5) * 9.5;
var bu = ipS(S, 0.55, M.leaf, x, F + 0.85, z, 8);
bu.scale.set(1, 0.75, 1);
for (var bl = 0; bl < 4; bl++) {
var ba2 = R() * 6.283;
var fl = ipS(S, 0.14, roses[(f + bl) % 3], x + Math.cos(ba2) * 0.4, F + 1.1 + R() * 0.25, z + Math.sin(ba2) * 0.4, 8);
fl.scale.set(1, 0.7, 1);
}
}
ipBox(q[0], q[1], 7, 6, F, 0.6);
var tx = q[0] + (i % 2 ? -4 : 4), tz = q[1] + (i < 2 ? 3 : -3);
ipC(S, 0.25, 0.45, 4, M.crystal, tx, F + 2.5, tz, 8);
for (var b = 0; b < 5; b++) {
var ba = b / 5 * 6.283;
var br = ipC(S, 0.08, 0.14, 2.4, M.crystal, tx + Math.cos(ba) * 0.7, F + 4.6, tz + Math.sin(ba) * 0.7, 6);
br.rotation.z = Math.cos(ba) * 0.7;
br.rotation.x = -Math.sin(ba) * 0.7;
}
for (var fr = 0; fr < 12; fr++) {
var fa = fr / 12 * 6.283, fd = 1 + (fr % 3) * 0.5;
ipS(S, 0.16, M.glowB, tx + Math.cos(fa) * fd, F + 4.6 + (fr % 4) * 0.4, tz + Math.sin(fa) * fd, 8);
}
var g = wGlow(0xBFEFFF, 4, 0.4);
g.position.set(tx, F + 5, tz);
D.add(g);
ipRound(tx, tz, 0.6, F, 5);
});
ipC(S, 3, 3.2, 0.5, M.stone, 20, F + 0.25, -62.5, 24);
ipC(S, 2.6, 2.6, 0.05, M.ice, 20, F + 0.52, -62.5, 24);
ipK(S, 0.4, 2.4, M.crystal, 20, F + 1.7, -62.5, 8);
ipRound(20, -62.5, 3.2, F, 1);
[[20, -48], [4, -62.5], [36, -62.5]].forEach(function (q, i) { var g2 = new THREE.Group(); g2.position.set(q[0], F, q[1]); g2.rotation.y = [0, Math.PI / 2, -Math.PI / 2][i]; S.add(g2); ipB(g2, 2.4, 0.12, 0.6, M.wood, 0, 0.55, 0); ipB(g2, 2.4, 0.6, 0.08, M.wood, 0, 0.9, -0.28); [-1, 1].forEach(function (s) { ipB(g2, 0.1, 0.55, 0.6, M.gold, s * 1.1, 0.27, 0); }); ipBox(q[0], q[1], 1.2, 0.4, F, 1); });
var l1 = new THREE.PointLight(0xE6F4FF, 1, 50, 1.3);
l1.position.set(0, F + 8, -62);
D.add(l1);
},
function (S, D) {
var M = ipMats(), F = IP.F, z0 = IP_ST.z0, z1 = IP_ST.z1, L = z0 - z1, drop = F - IP.FY, n = Math.round(drop / 0.3), run = L / n;
for (var i = 0; i < n; i++) {
var zf = z0 - i * run, y = F - (i + 1) * (drop / n);
ipB(S, 4.4, 0.3, run + 0.02, M.iceDeep, 0, y + 0.15, zf - run / 2, 2);
ipB(S, 4.4, 0.04, 0.12, M.crystal, 0, y + 0.31, zf - run + 0.06);
}
for (var i2 = 0; i2 < n; i2++) {
var za = z0 - i2 * run, zm = za - run / 2, yb = F - (i2 + 1) * (drop / n) - 0.8, yt = Math.min(F - (i2 + 1) * (drop / n) + 4.2, F - 1.02), h = yt - yb;
if (h > 0.2)
[-1, 1].forEach(function (s) { ipB(S, 0.6, h, run + 0.05, M.rock, s * 2.5, yb + h / 2, zm, 3); });
var cy = F - (i2 + 1) * (drop / n) + 4.2;
if (cy < F - 1.05)
ipB(S, 5.6, 0.4, run + 0.05, M.rock, 0, cy + 0.2, zm, 3);
}
for (var k = 1; k < 8; k++) {
var z = z0 - k * L / 8, y = ipStairY(z);
[-1, 1].forEach(function (s) { var cr = ipK(S, 0.18, 0.9, M.crystal, s * 2.1, y + 2.5, z, 6); cr.rotation.z = s * 0.5; ipS(S, 0.18, M.glowB, s * 2.05, y + 2.4, z, 8); });
var g = wGlow(0xBFEFFF, 3, 0.5);
g.position.set(0, y + 2.8, z);
D.add(g);
}
[-1, 1].forEach(function (s) { ipB(S, 0.1, 0.1, 11, M.gold, s * 2.35, F + 1.05, (z0 - 11 + z0) / 2); for (var rp = 0; rp <= 11; rp += 2.2)
ipC(S, 0.05, 0.05, 1.05, M.gold, s * 2.35, F + 0.52, z0 - rp, 6); ipBox(s * 2.35, (z0 - 11 + z0) / 2, 0.1, 5.5, F - 0.1, 1.3); });
var t = wTex(256, 512, function (x, W, H) { x.fillStyle = "#E4EEF6"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(150,175,205,0.4)"; x.strokeRect(2, 2, W - 4, H - 4); ipSigil(x, W / 2, H / 2 + 30, 80, "rgba(150,200,240,0.85)", "rgba(216,182,80,0.9)"); });
var slab = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.3, 11), [M.floor, M.floor, new THREE.MeshPhongMaterial({ map: t, shininess: 70, specular: 0x8899AA }), M.floor, M.floor, M.floor]);
slab.position.set(0, F - 0.15, z0 - 5.5);
D.add(slab);
IP.doors.stair = { g: slab, open: false, k: 0, stair: 1 };
var w = ipW(0, z0 - 2);
IP.spots.push({ x: w.x, z: w.z, y: F, r: 2.6, name: "The frost sigil in the floor behind the throne", verb: "touch it", fn: function () { ipOpenDoor("stair"); }, when: function () { return !IP.doors.stair.open; } });
var w2 = ipW(0, z0 - 2);
IP.spots.push({ x: w2.x, z: w2.z, y: F, r: 2.6, name: "The sigil behind the throne", verb: "close the stair", fn: function () { ipOpenDoor("stair"); }, when: function () { return IP.doors.stair.open; } });
},
function (S, D) {
var M = ipMats(), Y = IP.FY, cz = IP_FG.cz, R = IP_FG.r;
var rt = wTex(256, 256, function (x, W, H) { x.fillStyle = "#3E4C60"; x.fillRect(0, 0, W, H); var Rr = wRand(9); for (var i = 0; i < 180; i++) {
var l = 55 + Rr() * 40 | 0;
x.fillStyle = "rgba(" + (l - 10) + "," + (l) + "," + (l + 22) + ",0.5)";
x.beginPath();
x.ellipse(Rr() * W, Rr() * H, 8 + Rr() * 20, 5 + Rr() * 10, Rr() * 3, 0, 6.283);
x.fill();
} for (var j = 0; j < 40; j++) {
x.fillStyle = "rgba(170,215,245," + (0.2 + Rr() * 0.3) + ")";
x.fillRect(Rr() * W, Rr() * H, 2, 4 + Rr() * 8);
} }, [10, 4]);
var cave = new THREE.Mesh(new THREE.SphereGeometry(R, 40, 18, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ map: rt, side: THREE.BackSide, color: 0xB8C8DC }));
cave.scale.set(1, 0.65, 1);
cave.position.set(0, Y, cz);
S.add(cave);
var fl = new THREE.Mesh(new THREE.CircleGeometry(R, 40), new THREE.MeshPhongMaterial({ color: 0x6A86A4, shininess: 80, specular: 0xCFE8FF }));
fl.rotation.x = -Math.PI / 2;
fl.position.set(0, Y, cz);
S.add(fl);
var Rn = wRand(321);
for (var c = 0; c < 40; c++) {
var a = Rn() * 6.283, d = R * (0.78 + Rn() * 0.16), h = 2 + Rn() * 6;
var cr = ipK(S, 0.5 + Rn() * 0.8, h, c % 3 ? M.crystal : M.iceDeep, Math.cos(a) * d, Y + h / 2 - 0.2, cz + Math.sin(a) * d, 6);
cr.rotation.z = (Rn() - 0.5) * 0.5;
}
for (var c2 = 0; c2 < 24; c2++) {
var a2 = Rn() * 6.283, d2 = R * (0.2 + Rn() * 0.6);
var y2 = Y + 20.8 * Math.sqrt(Math.max(0, 1 - d2 * d2 / (R * R))) - 0.5;
var ic = ipK(S, 0.3 + Rn() * 0.5, 1.5 + Rn() * 3, M.crystal, Math.cos(a2) * d2, y2 - 1, cz + Math.sin(a2) * d2, 6);
ic.rotation.x = Math.PI;
}
[[-20, -108], [20, -108], [-18, -138], [18, -138]].forEach(function (q) { var g = wGlow(0xA8E4FF, 8, 0.5); g.position.set(q[0], Y + 5, q[1]); D.add(g); });
ipC(S, 5, 5.6, 0.8, M.stoneB, 0, Y + 0.4, cz, 24);
ipC(S, 4.6, 4.6, 0.1, M.gold, 0, Y + 0.85, cz, 24);
ipC(S, 1.2, 1.8, 3, M.iceDeep, 0, Y + 2.3, cz, 12);
ipC(S, 2.2, 1.4, 0.6, M.gold, 0, Y + 4, cz, 16);
ipRound(0, cz, 5.6, Y - 1, 1.2);
var core = new THREE.Group();
core.position.set(0, Y + 7, cz);
D.add(core);
core.add(new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 16), new THREE.MeshBasicMaterial({ color: 0xF4FCFF })));
var halo = wGlow(0xCFF4FF, 9, 0.7);
core.add(halo);
[2.2, 2.8, 3.4].forEach(function (r, i) { var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.12, 8, 48), i === 1 ? M.gold : M.crystal); ring.rotation.set(i * 1.0, i * 0.6, 0); core.add(ring); IP.spin.push({ o: ring, ax: ["x", "y", "z"][i], sp: 0.25 + i * 0.08 }); });
IP.core = core;
var an = new THREE.Group();
an.position.set(-9, Y, cz + 6);
an.rotation.y = 0.4;
S.add(an);
ipB(an, 1.4, 1, 1, M.iceDeep, 0, 0.5, 0);
ipB(an, 2.4, 0.5, 0.9, M.iceDeep, 0, 1.25, 0);
var hn = ipK(an, 0.45, 1, M.iceDeep, 1.6, 1.25, 0, 6);
hn.rotation.z = -Math.PI / 2;
ipRound(-9, cz + 6, 1.3, Y - 1, 1.6);
var qp = new THREE.Mesh(new THREE.CircleGeometry(2.2, 28), new THREE.MeshBasicMaterial({ color: 0x9ADCFF }));
qp.rotation.x = -Math.PI / 2;
qp.position.set(9, Y + 0.75, cz + 6);
S.add(qp);
ipC(S, 2.5, 2.6, 0.75, M.stoneB, 9, Y + 0.37, cz + 6, 24);
ipRound(9, cz + 6, 2.6, Y - 1, 0.9);
var qg = wGlow(0x9ADCFF, 5, 0.4);
qg.position.set(9, Y + 1.2, cz + 6);
D.add(qg);
[[-16, cz - 6, 0.6], [16, cz - 6, -0.6]].forEach(function (q) {
var b = new THREE.Group();
b.position.set(q[0], Y, q[1]);
b.rotation.y = q[2];
S.add(b);
ipB(b, 4, 0.2, 1.6, M.iceDeep, 0, 1, 0);
[[-1.8, -0.6], [1.8, -0.6], [-1.8, 0.6], [1.8, 0.6]].forEach(function (r) { ipB(b, 0.2, 1, 0.2, M.iceDeep, r[0], 0.5, r[1]); });
ipB(b, 0.6, 0.05, 1.2, M.silver, -1, 1.13, 0);
ipB(b, 0.1, 0.06, 1.4, M.crystal, 0.6, 1.13, 0);
ipS(b, 0.2, M.glowB, 1.4, 1.25, 0.2, 8);
ipBox(q[0], q[1], 2, 0.9, Y - 1, 1.2);
});
ipRack(S, -22, cz - 14, 0.9, 7);
ipRack(S, 22, cz - 14, -0.9, 7);
var led = new THREE.Mesh(new THREE.CylinderGeometry(9, 12, 1.6, 10), M.rock);
led.position.set(0, Y + 0.8, cz - 20);
led.scale.set(1.4, 1, 0.8);
S.add(led);
ipRound(0, cz - 20, 12, Y - 1, 2.2);
var fl2 = new THREE.PointLight(0xBFE8FF, 1.6, 70, 1.2);
fl2.position.set(0, Y + 9, cz);
D.add(fl2);
var fl3 = new THREE.PointLight(0xA8D8FF, 0.9, 50, 1.3);
fl3.position.set(0, Y + 12, cz - 18);
D.add(fl3);
var w = ipW(0, cz);
IP.spots.push({ x: w.x, z: w.z, y: Y, r: 7, name: "The cold-fusion crucible", verb: "look", fn: function () { ipForgeCard(); } });
},
function (key) {
var M = ipMats(), g = new THREE.Group(), glow = new THREE.MeshBasicMaterial({ color: 0xCFF4FF });
function b(w, h, d, m, x, y, z) { var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); g.add(o); return o; }
function c(rt, rb, h, m, x, y, z, s) { var o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s || 8), m); o.position.set(x, y, z); g.add(o); return o; }
function k(r, h, m, x, y, z, s) { var o = new THREE.Mesh(new THREE.ConeGeometry(r, h, s || 6), m); o.position.set(x, y, z); g.add(o); return o; }
if (key === "frostbrand") {
c(.02, .025, .22, M.velvet, 0, 0, 0);
b(.3, .04, .06, M.gold, 0, .12, 0);
b(.07, .95, .02, M.crystal, 0, .62, 0);
b(.025, .92, .03, glow, 0, .62, 0);
k(.035, .12, M.crystal, 0, 1.15, 0, 4);
}
else if (key === "hoarfang") {
c(.018, .018, 2, M.silver, 0, .4, 0);
c(.03, .03, .1, M.gold, 0, 1.4, 0);
k(.06, .42, M.crystal, 0, 1.66, 0, 4);
k(.025, .38, glow, 0, 1.66, 0, 4);
}
else if (key === "aurorabow") {
var arc = new THREE.Mesh(new THREE.TorusGeometry(.5, .02, 6, 20, Math.PI * 0.9), M.crystal);
arc.rotation.z = Math.PI * 0.55;
arc.position.y = .25;
g.add(arc);
var st = c(.004, .004, .95, glow, -.1, .25, 0);
}
else if (key === "glacierfall") {
c(.025, .025, .7, M.woodD, 0, .15, 0);
b(.34, .2, .2, M.iceDeep, 0, .55, 0);
b(.36, .04, .22, M.gold, 0, .55, 0);
}
else if (key === "longnight") {
c(.02, .025, 1.6, M.woodD, 0, .4, 0);
var o = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 8), glow);
o.position.y = 1.28;
g.add(o);
for (var i = 0; i < 4; i++) {
var p = k(.02, .22, M.crystal, Math.cos(i * 1.57) * .09, 1.28, Math.sin(i * 1.57) * .09, 4);
p.rotation.z = Math.cos(i * 1.57) * .6;
p.rotation.x = -Math.sin(i * 1.57) * .6;
}
}
else if (key === "dragontooth") {
c(.02, .02, .14, M.fur, 0, 0, 0);
b(.14, .03, .05, M.gold, 0, .08, 0);
k(.035, .32, M.linen, 0, .26, 0, 5);
}
else if (key === "dragonshield") {
var d = c(.32, .32, .04, M.iceDeep, 0, .2, .06, 16);
d.rotation.x = Math.PI / 2;
var r = new THREE.Mesh(new THREE.TorusGeometry(.32, .025, 6, 16), M.gold);
r.position.set(0, .2, .08);
g.add(r);
var e = new THREE.Mesh(new THREE.SphereGeometry(.06, 8, 6), glow);
e.position.set(0, .2, .1);
g.add(e);
}
return g;
},
function (key) {
var R = RL_BY[key];
if (!R)
return;
if (!rlOwned(key))
return setStatus("<b>" + esc(R.name) + "</b> is the King's. Only the King, or one he has given it to, may take it up.");
if (R.kind === "weapon") {
var spec = { id: "relic_" + key + "_" + (typeof uid === "function" ? uid() : Date.now()), archetype: "relic_" + key, label: R.name, attrs: {}, x: camera.position.x, z: camera.position.z, solid: false, detail: 3, nights: [store.session], issued: true, relic: true };
if (typeof pickUp === "function")
pickUp(spec);
setStatus("<b>You take up " + esc(R.name) + ".</b> " + esc(R.does) + " <b>G</b> puts it down.");
}
else
rlWear(key, !RL.worn[key]);
},
function (key, on) {
var R = RL_BY[key];
if (!R)
return;
if (on && !rlOwned(key))
return setStatus("That is the King's.");
if (on)
RL.worn[key] = 1;
else
delete RL.worn[key];
try {
localStorage.setItem("sm.relics.worn", JSON.stringify(RL.worn));
}
catch (e) { }
var L = meLook();
L.relics = Object.keys(RL.worn);
if (!L.relics.length)
delete L.relics;
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
rlEffects();
setStatus(on ? "<b>You put on " + esc(R.name) + ".</b> " + esc(R.does.replace(/^Worn: /, "")) : "You take off " + esc(R.name) + ".");
},
function (g, keys) {
var M = ipMats(), glow = new THREE.MeshBasicMaterial({ color: 0xCFF4FF }), set = { g: g, parts: [] };
function part(bone, fb, build) { var p = new THREE.Group(); build(p); g.add(p); set.parts.push({ o: p, bone: bone, fb: fb, b: null }); (g.userData.rlParts = g.userData.rlParts || []).push(p); }
g.userData.rlKeys = keys.slice();
function m(geo, mat, x, y, z, p) { var o = new THREE.Mesh(geo, mat); o.position.set(x || 0, y || 0, z || 0); p.add(o); return o; }
keys.forEach(function (k) {
if (k === "polecrown")
part(/^head$/i, [0, 1.62, 0], function (p) { var r = m(new THREE.CylinderGeometry(.115, .12, .06, 16, 1, true), M.gold, 0, .13, 0, p); r.material = M.gold; for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
m(new THREE.ConeGeometry(.018, .12 + (i === 0 ? .06 : 0), 4), M.crystal, Math.sin(a) * .115, .21 + (i === 0 ? .03 : 0), Math.cos(a) * .115, p);
} m(new THREE.OctahedronGeometry(.03, 0), glow, 0, .15, .12, p); });
if (k === "frostplate") {
part(/^spine_03$/i, [0, 1.32, 0], function (p) { var bp = m(new THREE.CylinderGeometry(.2, .17, .42, 14, 1, false, -Math.PI * 0.62, Math.PI * 1.24), M.silver, 0, -.02, .0, p); bp.scale.z = .78; var tr = m(new THREE.BoxGeometry(.04, .36, .02), M.gold, 0, 0, .15, p); var em = m(new THREE.OctahedronGeometry(.04, 0), glow, 0, .06, .165, p); m(new THREE.TorusGeometry(.18, .018, 5, 16), M.gold, 0, -.22, 0, p).rotation.x = Math.PI / 2; });
[["l", 1], ["r", -1]].forEach(function (q) { part(new RegExp("^upperarm_" + q[0] + "$", "i"), [q[1] * .22, 1.45, 0], function (p) { var s = m(new THREE.SphereGeometry(.085, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55), M.iceDeep, 0, .02, 0, p); m(new THREE.ConeGeometry(.02, .1, 4), M.crystal, 0, .1, 0, p); }); });
}
if (k === "auroramantle")
part(/^spine_03$/i, [0, 1.32, 0], function (p) {
var t = wTex(64, 256, function (x, W, H) { var gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#2A6A8A"); gr.addColorStop(0.4, "#3AB88A"); gr.addColorStop(0.8, "#6A4AB8"); gr.addColorStop(1, "#2A2A6A"); x.fillStyle = gr; x.fillRect(0, 0, W, H); x.fillStyle = "#D8B650"; x.fillRect(0, 0, W, 6); });
var cp = m(new THREE.CylinderGeometry(.2, .42, 1.25, 14, 1, true, Math.PI * 0.62, Math.PI * 0.76), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }), 0, -.55, -.04, p);
m(new THREE.TorusGeometry(.17, .03, 5, 14, Math.PI), M.fur, 0, .08, -.02, p).rotation.set(Math.PI / 2, 0, Math.PI);
});
if (k === "longsnowboots")
[["l", 1], ["r", -1]].forEach(function (q) { part(new RegExp("^calf_" + q[0] + "$", "i"), [q[1] * .1, .32, 0], function (p) { m(new THREE.CylinderGeometry(.075, .065, .32, 10), M.iceDeep, 0, -.1, 0, p); m(new THREE.TorusGeometry(.078, .03, 5, 12), M.fur, 0, .07, 0, p).rotation.x = Math.PI / 2; m(new THREE.OctahedronGeometry(.02, 0), glow, 0, -.08, .07, p); }); });
});
RL.dressed.push(set);
},
function (key) {
var R = RL_BY[key], own = rlOwned(key), K = typeof amKeeper === "function" && amKeeper();
var html = worldFacts(R.name, R.kind === "weapon" ? "a weapon of the North King" : "armour of the North King", [], [R.does, own ? (K ? "It is yours, King of the North." : "It is yours to bear: the King gave it to you.") : "It is the King's. Only he, or one he gives it to, may take it up."]);
var fns = {};
if (own) {
if (R.kind === "weapon") {
html += worldBtn("take", "Take it up", "It goes to your hand");
fns.take = function () { worldCard(null); rlTake(key); };
}
else {
html += worldBtn("wear", RL.worn[key] ? "Take it off" : "Put it on", RL.worn[key] ? "" : "You wear it from now on, wherever you go");
fns.wear = function () { worldCard(null); rlWear(key, !RL.worn[key]); };
}
}
if (K) {
html += worldBtn("forge", "Forge a copy to give", "It goes into your things; give it to anyone from the Street's trade window");
fns.forge = function () { rlForge(key); };
}
worldCard(html, fns);
},
function (key) {
var R = RL_BY[key];
if (typeof cityRpc !== "function")
return;
cityRpc("relic_forge", { p_key: key }).then(function (o) {
var ok = o && o.ok, say = (o && o.say) || String(o);
worldCard(worldFacts(R.name, ok ? "forged" : "not forged", [], [say]));
if (ok && typeof loadThings === "function")
loadThings();
})
.catch(function (e) { worldCard(worldFacts(R.name, "not forged", [], ["The forge answers soon. (" + (e && e.message || "no reply") + ")"])); });
},
function (G) {
if (typeof hdfUtils !== "function" || typeof hdfFile !== "function")
return;
var cz = IP_FG.cz, w = ipW(0, cz - 17);
hdfUtils(function (U) {
hdfFile("creatures/dragon-evolved.glb", function (F) {
if (!F || !F.scene || IP.dragon)
return;
var d = U.clone(F.scene);
var mats = { Dragon_Main: new THREE.MeshPhongMaterial({ color: 0x4A86C0, shininess: 70, specular: 0xCFE8FF, emissive: 0x0A1A30, skinning: true }),
Dragon_Secondary: new THREE.MeshPhongMaterial({ color: 0xD8ECFA, shininess: 60, specular: 0xFFFFFF, emissive: 0x16304A, skinning: true }),
Dragon_Horn: new THREE.MeshPhongMaterial({ color: 0x9AD4FF, shininess: 120, specular: 0xFFFFFF, emissive: 0x2A5A88, skinning: true }),
Eye_White: new THREE.MeshBasicMaterial({ color: 0xCFF4FF, skinning: true }), Eye_Black: new THREE.MeshBasicMaterial({ color: 0x1A3A6A, skinning: true }) };
d.traverse(function (o) { if (!o.isMesh)
return; var conv = function (m) { return mats[(m && m.name) || ""] || mats.Dragon_Main; }; o.material = Array.isArray(o.material) ? o.material.map(conv) : conv(o.material); o.frustumCulled = false; });
d.scale.setScalar(6.5);
d.position.set(w.x, IP.FY + 1.6, w.z);
d.rotation.y = -Math.PI / 2;
G.add(d);
IP.dragon = d;
var clip = (F.clips || []).filter(function (c) { return c.name === "Flying_Idle"; })[0];
if (clip) {
IP.mixer = new THREE.AnimationMixer(d);
var act = IP.mixer.clipAction(clip);
act.timeScale = 0.35;
act.play();
}
var bones = {};
d.traverse(function (o) { if (o.isBone)
bones[o.name] = o; });
IP.dspikes = [];
["Neck", "Torso", "Body1", "Body2", "Body3", "Body4"].forEach(function (n, i) { var b = bones[n]; if (!b)
return; var k = new THREE.Mesh(new THREE.ConeGeometry(0.9 - i * 0.08, 3.2 - i * 0.3, 5), ipMats().crystal); G.add(k); IP.dspikes.push({ b: b, o: k, up: 1.4 - i * 0.12 }); });
IP.dhead = bones.Head || null;
var bm = new THREE.MeshBasicMaterial({ color: 0xCFF4FF, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending });
IP.breath = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 1.4, 1, 14, 1, true), bm);
G.add(IP.breath);
});
});
},
function (dt) {
if (IP.mixer)
IP.mixer.update(dt);
if (!IP.dragon)
return;
IP.dragon.updateMatrixWorld(true);
var G = WORLDS.northpole.g;
if (!IP_V1) {
IP_V1 = new THREE.Vector3();
IP_V2 = new THREE.Vector3();
}
(IP.dspikes || []).forEach(function (s) { s.b.getWorldPosition(IP_V1); G.worldToLocal(IP_V1); s.o.position.set(IP_V1.x, IP_V1.y + s.up, IP_V1.z); });
if (IP.dhead && IP.breath && IP.core) {
IP.dhead.getWorldPosition(IP_V1);
G.worldToLocal(IP_V1);
IP.core.getWorldPosition(IP_V2);
G.worldToLocal(IP_V2);
var dir = IP_V2.clone().sub(IP_V1), L = dir.length();
IP.breath.position.copy(IP_V1).add(IP_V2).multiplyScalar(0.5);
IP.breath.scale.set(1, Math.max(0.1, L - 1), 1);
IP.breath.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.normalize());
}
},
function (G) {
var F = IP.F, FY = IP.FY;
function put(seed, o, px, pz, y, rot, talk) { var g = wPerson(seed, o); var w = ipW(px, pz); g.position.set(w.x, y, w.z); g.rotation.y = (rot || 0) - Math.PI / 2; G.add(g); var P = { g: g, y: y, name: talk && talk.name, t: talk || null, skate: o.skate || null }; IP.people.push(P); return P; }
var guard = { sex: "m", title: "guard", look: { top: 0x1E3478, topKind: "shirt", bottom: 0x2A3A5A, shoes: 0x1A1A22, layer: "armor", layerColor: 0xD8DEE8, hat: "helmet", hatColor: 0xD8DEE8, back: "cloak", backColor: 0x1E3478 } };
var gp = { name: "A Frost Guard", persona: IP_CTX + " You are one of the Frost Guard, the King of the North's household guard: steady, dry-humoured, polite, watchful. You guard the gate, the doors and the throne. Weapons stay sheathed unless there is need; the Frost Guard has never had to draw on a guest.", greet: "Welcome to the Palace of the North King. Mind the ice on the steps." };
[[-5, 233, 0], [5, 233, 0]].forEach(function (q, i) { var o = Object.assign({}, guard, { sex: i ? "f" : "m" }); put("ipg" + i, o, q[0], q[1], IP.GL, q[2], gp); });
[[-7, 56, 0], [7, 56, 0], [-6.5, -17.5, 0], [6.5, -17.5, 0]].forEach(function (q, i) { var o = Object.assign({}, guard, { sex: i % 2 ? "f" : "m" }); put("ipgk" + i, o, q[0], q[1], q[1] > 50 ? F : F + 0.4, q[2], gp); });
put("ip_chamb", { sex: "m", look: { top: 0x1E3478, topKind: "shirt", bottom: 0x1E2A4A, layer: "longcoat", layerColor: 0x1E3478, hair: 0xE8E8EC, hairStyle: "short", beard: "short", shoes: 0x1A1A22 } }, 9, -13, F, 0.4, { name: "Halvard, the Royal Chamberlain", persona: IP_CTX + " You are Halvard, the Royal Chamberlain: dignified, precise, quietly funny, the keeper of the palace's order. You know every room and every ceremony, and you love to show guests round the Throne Hall.", greet: "Good day. I am Halvard, the King's Chamberlain. May I show you the Throne Hall?" });
put("ip_arm", { sex: "f", look: { top: 0x5A5A62, topKind: "shirt", bottom: 0x3A3A42, layer: "apron", layerColor: 0x6A4A2A, hair: 0xC8A060, hairStyle: "braids", shoes: 0x2A1A10 } }, -24, 36.4, F, 0, { name: "Sigrun Ironfrost, the Armourer", persona: IP_CTX + " You are Sigrun Ironfrost, the King's armourer: strong, blunt, kind underneath, proud of every blade on these racks. You keep the Frost Guard's arms sharp at your grindstone and talk happily about steel, ice-steel and care of armour.", greet: "Mind your fingers near the grindstone. What can I do for you?" });
put("ip_table", { sex: "f", look: { top: 0xF4F0E6, topKind: "dress", bottom: 0x1E3478, layer: "apron", layerColor: 0xF4F4F4, hair: 0x3A2A1A, hairStyle: "bun", shoes: 0x1A1A22 } }, 33, 12.5, F, 0, { name: "Edda, Mistress of the King's Table", persona: IP_CTX + " You are Edda, Mistress of the King's Table: brisk, warm, a superb host. You lay the banquet table for thirty, plan every feast (roasts, cloudberry tarts, hot spiced cider) and remember what every guest likes.", greet: "Thirty places, all laid. Are you here for supper?" });
put("ip_lib", { sex: "m", look: { top: 0x4A2A5A, topKind: "robe", bottom: 0x2A1A3A, hair: 0xD8D8D8, hairStyle: "long", beard: "full", shoes: 0x2A1A10 } }, 26.5, -10.7, F, 0, { name: "Old Tormund, Keeper of the King's Books", persona: IP_CTX + " You are Old Tormund, keeper of the King's library: gentle, scholarly, a little absent-minded, delighted by anyone who loves books. You know the histories of the North, its stars and its old songs.", greet: "Ah, a reader? Sit, sit. The histories of the North are on the left." });
put("ip_maid", { sex: "f", look: { top: 0x1E3478, topKind: "dress", bottom: 0x1E3478, layer: "apron", layerColor: 0xF4F4F4, hair: 0x8A4A2A, hairStyle: "ponytail", shoes: 0x1A1A22 } }, 41.6, -31, F, Math.PI / 2, { name: "Ingrid, Maid of the Chamber", persona: IP_CTX + " You are Ingrid, who keeps the King's Bedchamber: quiet, cheerful, very particular about furs being aired and linen being crisp.", greet: "Oh! I'm just turning down the furs for the King." });
put("ip_spa", { sex: "f", look: { top: 0xF4F4F4, topKind: "shirt", bottom: 0xF4F4F4, hair: 0x1A1A1A, hairStyle: "bun", shoes: 0xF4F4F4 } }, -6, -48.5, F, Math.PI / 2, { name: "Liv, Attendant of the Hot Springs", persona: IP_CTX + " You are Liv, attendant of the palace hot springs: calm, soothing, kind. The springs rise warm from deep under the hill even here in the frozen North; you keep the towels warm and the loungers ready.", greet: "The water is perfect tonight. A warm towel?" });
put("ip_gard", { sex: "m", look: { top: 0x2A5A3A, topKind: "shirt", bottom: 0x3A2A1A, layer: "apron", layerColor: 0x6A4A2A, hair: 0x6A4A2A, hairStyle: "short", hat: "cap", hatColor: 0x2A5A3A, shoes: 0x2A1A10 } }, 10, -59.6, F, Math.PI, { name: "Bjarke, the Winter Gardener", persona: IP_CTX + " You are Bjarke, the winter gardener: patient, earthy, quietly amazed by your own garden. You grow frost roses that bloom in the cold and ice trees whose fruit is light.", greet: "Careful of the frost roses. They bloom colder than snow." });
put("ip_keeper", { sex: "f", look: { top: 0xF4F2EC, topKind: "shirt", bottom: 0x5A6A7A, layer: "longcoat", layerColor: 0xEDEAE2, hair: 0xE8EEF4, hairStyle: "braids", shoes: 0x3A2A1A } }, 5, IP_FG.cz - 5, FY, Math.PI, { name: "Brynja Snowmantle, Keeper of the Elder Dragon", persona: IP_CTX + " You are Brynja Snowmantle, who cares for Isvarr, the Elder Ice Dragon, whenever the King is away. You are brave, gentle, practical and devoted to the dragon. You brush the frost from his scales, bring him glacier fish and sing him the old songs. Here, at the ice forge under the palace, you may speak freely of the forge and the dragon: the King makes his relics here by cold fusion, Isvarr's breath lighting the crucible.", greet: "Softly, now. He's dozing. Have you come to help me tend him?" });
put("ip_smith", { sex: "m", look: { top: 0x3A4A5A, topKind: "shirt", bottom: 0x2A2A32, layer: "apron", layerColor: 0x4A3A2A, hair: 0xB8C8D8, hairStyle: "short", beard: "full", shoes: 0x1A1A22 } }, -9, IP_FG.cz + 8, FY, Math.PI, { name: "Eirik Coldhand, the Forge's Smith", persona: IP_CTX + " You are Eirik Coldhand, the smith who keeps the ice forge ready for the King: gruff, proud, kind. You explain cold fusion as the King's own magic: Isvarr's breath and the crucible's three rings bind starlight into ice-steel colder than anything, and from it the King makes his relics. Here at the forge you may speak of it.", greet: "The anvil's cold and ready. The King's work, or yours?" });
put("ip_warden", { sex: "f", elf: 1, child: true, look: { top: 0x1E3478, topKind: "shirt", bottom: 0xF4F0E8, hat: "beanie", hatColor: 0x1E3478, shoes: 0x3A2A1A } }, 12, 72, IP.GL, Math.PI / 2, { name: "Pell, Warden of the Labyrinths", persona: IP_CTX + " You are Pell, a quick, teasing elf who looks after the two hedge labyrinths. You never give the way straight out, only riddling hints (keep a hand on one hedge; the heart is where the stars point).", greet: "Two labyrinths, one Frost Rose at each heart. Fancy your chances?" });
for (var k = 0; k < 3; k++) {
var p = put("ip_sk" + k, { sex: k % 2 ? "f" : "m", skate: { a: k * 2.1, r: 16 + k * 6, sp: 0.3 + k * 0.06 } }, 0, -118, IP.GL + 0.06, 0, null);
}
var dw = ipW(0, IP_FG.cz - 12);
IP.people.push({ g: null, x: dw.x, z: dw.z, y: FY, r: 9, name: "Isvarr, the Elder Ice Dragon", t: { name: "Isvarr, the Elder Ice Dragon", persona: "You are Isvarr, the Elder Ice Dragon, older than the North Pole village, who lives in the ice forge beneath the Palace of the North King in SomnuMatrix. Your cold breath lights the forge and powers the King's cold fusion. You love the King of the North, who cares for you; Brynja tends you when he is away. You speak slowly and kindly, with great age and dry humour, in few words, like snow settling. You are vast, gentle, and protective of those the King trusts.", greet: "Mmm. A small warm one. Come closer; I do not bite those the King lets in." }, dragon: 1 });
},
function () {
var K = typeof amKeeper === "function" && amKeeper();
var html = worldFacts("The cold-fusion crucible", "the ice forge, beneath the palace", [], ["Three rings of ice turn round a heart of white light. Isvarr's breath feeds it; the cold it makes binds starlight into ice-steel, colder than anything in the world.", "Here the King of the North makes his relics."]);
var fns = {};
if (K) {
html += "<div style='margin-top:8px;opacity:.8'>Forge a relic (it goes into your things, to give or share):</div>";
RELICS.forEach(function (r) { html += worldBtn("f_" + r.key, r.name, r.does); fns["f_" + r.key] = function () { rlForge(r.key); }; });
}
else
html += "<div style='margin-top:8px;opacity:.8'>Only the King works the crucible.</div>";
worldCard(html, fns);
},
function () {
var K = typeof amKeeper === "function" && amKeeper();
var rows = [["Kind", "Elder Ice Dragon, the last of the old line"], ["Cared for by", "the King of the North, and Brynja Snowmantle in his absence"]];
var html = worldFacts("Isvarr", "who lights the ice forge", rows, ["Tending him: brush the frost from his scales, bring him a glacier fish, sing him the old song.", "Those the King appoints as his dragon keepers are paid for each tending, from the Treasury."], "<div id='ip-care' style='opacity:.8;margin-top:6px'>…</div>");
html += worldBtn("talk", "Speak with Isvarr", "") + worldBtn("tend", "Tend Isvarr", "Brush, feed, sing: about a quarter of a minute");
if (K)
html += worldBtn("appoint", "Appoint a dragon keeper", "A dreamer who cares for him when you are away; paid for each tending");
worldCard(html, { talk: function () { worldCard(null); var d = IP.people.filter(function (p) { return p.dragon; })[0]; if (d)
wTalk(d.t); }, tend: function () { worldCard(null); ipTend(); }, appoint: function () { ipAppointCard(); } });
if (typeof cityRpc === "function")
cityRpc("dragon_care_state").then(function (o) { var el = document.getElementById("ip-care"); if (!el || !o)
return; el.textContent = o.last ? ("Last tended " + o.ago + " by " + (o.by || "someone") + ". Keepers appointed: " + (o.keepers || 0) + ".") : "No one has tended him yet."; }).catch(function () { var el = document.getElementById("ip-care"); if (el)
el.textContent = "Brynja is with him."; });
},
function () {
if (IP.tending)
return;
IP.tending = 1;
var steps = ["You brush the frost from Isvarr's scales; he rumbles, pleased.", "You bring him a glacier fish from the cold store; he takes it delicately.", "You sing him the old song of the North; his great eyes close, and the forge glows steady."];
var i = 0;
(function next() {
if (i < steps.length) {
setStatus("<b>Tending Isvarr (" + (i + 1) + " of 3).</b> " + steps[i]);
i++;
IP.tendT = setTimeout(next, 5000);
return;
}
IP.tending = 0;
if (typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn())) {
setStatus("<b>Isvarr is tended.</b> He sleeps easier for it.");
return;
}
cityRpc("dragon_tend").then(function (o) { setStatus("<b>Isvarr is tended.</b> " + esc((o && o.say) || "")); if (o && o.paid && typeof refreshStanding === "function")
refreshStanding(); })
.catch(function () { setStatus("<b>Isvarr is tended.</b> He sleeps easier for it."); });
})();
},
function () {
worldCard(worldFacts("Appoint a dragon keeper", "for Isvarr", [], ["Type a dreamer's name, pick them and appoint them. A keeper is paid for each tending (dues-paying members only, the city's rule)."]) +
"<div style='display:flex;gap:6px;margin-top:8px'><input id='ip-dk' placeholder='a name' style='flex:1'><button class='btn' id='ip-dkf'>Find</button></div><div id='ip-dko' style='margin-top:6px'></div>" +
worldBtn("go", "Appoint the one chosen", "") + worldBtn("off", "Stand the one chosen down", ""), { go: function () { ipAppoint(true); }, off: function () { ipAppoint(false); } });
var inp = document.getElementById("ip-dk"), b = document.getElementById("ip-dkf"), out = document.getElementById("ip-dko");
if (inp && typeof dreamerPicker === "function")
dreamerPicker(inp, b, out);
},
function (on) {
var r = document.querySelector("#ip-dko input[name=dp]:checked");
if (!r)
return setStatus("Find and pick someone first.");
cityRpc("dragon_appoint", { p_user: r.value, p_on: on }).then(function (o) { setStatus(esc((o && o.say) || String(o))); worldCard(null); }).catch(function (e) { setStatus("The forge answers soon. (" + esc(e && e.message || "") + ")"); });
},
function (L) {
var l = ipL(L.x, L.z), px = l.px, pz = l.pz, feet = L.y - 1.72, F = IP.F;
if (feet < F - 2.5 && Math.hypot(px, pz - IP_FG.cz) < IP_FG.r + 1)
return { name: "the ice forge, beneath the palace", roof: 1 };
if (feet < F - 0.3 && Math.abs(px) < 3 && pz < IP_ST.z0 + 0.5 && pz > IP_ST.z1 - 1)
return { name: "the secret stair", roof: 1 };
if (Math.abs(px) < 55 && Math.abs(pz) < 45 && feet > F - 1.5) {
if (Math.abs(px) < 20)
return { name: "the Throne Hall", roof: 1 };
if (px < 0)
return { name: pz > 10 ? "the Armoury" : pz > -17 ? "the Vault of Blades" : "the Vault of Armour", roof: 1 };
return { name: pz > 10 ? "the Banquet Hall" : pz > -17 ? "the Library" : "the King's Bedchamber", roof: 1 };
}
if (Math.abs(px) < 40 && pz < -45 && pz > -80 && feet > F - 1.5)
return { name: px < 0 ? "the Hot Springs" : "the Winter Garden", roof: 1 };
if (Math.abs(px) < 141 && pz > -151 && pz < 231) {
for (var k = 0; k < IP.mazes.length; k++) {
var m = IP.mazes[k];
if (px > m.x0 && px < m.x0 + m.nx * m.C && pz > m.z0 && pz < m.z0 + m.nz * m.C)
return { name: k ? "the Starlight Labyrinth" : "the Winter Labyrinth" };
}
return { name: "the palace grounds" };
}
if (pz > 230 && pz < 330 && Math.abs(px) < 60)
return { name: "the road up to the palace" };
return null;
},
function (x, z, feet) {
if (!IP.built)
return null;
var l = ipL(x, z), px = l.px, pz = l.pz, F = IP.F;
if (feet < F - 2.2 && Math.hypot(px, pz - IP_FG.cz) < IP_FG.r - 0.6) {
if (Math.hypot(px, pz - IP_FG.cz) < 5.6)
return IP.FY + 0.8;
return IP.FY;
}
var onStair = Math.abs(px) < 2.3 && pz < IP_ST.z0 && pz > IP_ST.z1 - 0.5;
if (onStair) {
var sy = ipStairY(pz);
if (feet < F - 0.4 || (IP.doors.stair && IP.doors.stair.k > 0.6 && pz > IP_ST.z0 - 11))
return sy;
}
if (feet < F - 2.2 && pz < IP_ST.z1 && pz > IP_ST.z1 - 4 && Math.abs(px) < 2.3)
return IP.FY;
if (Math.abs(px) < 55 && Math.abs(pz) < 45 && feet > F - 1.6) {
if (Math.abs(px) < 8 && pz > -26 && pz < -17) {
if (Math.abs(px) < 6 && pz > -25.6 && pz < -19.2)
return F + 1.2;
if (Math.abs(px) < 7 && pz > -25.8 && pz < -18.2)
return F + 0.8;
return F + 0.4;
}
return F;
}
if (Math.abs(px) < 40 && pz < -45 && pz > -80 && feet > F - 1.6) {
if (px > -32 && px < -8 && pz > -71.5 && pz < -54.5)
return pz > -56 ? F - 0.4 : F - 0.9;
return F;
}
if (pz > 44 && pz < 58 && Math.abs(px) < 17)
return F;
return null;
},
function (x, z, feet) {
if (!IP.built)
return false;
if (worldSolidAt(IP.solids, x, z, feet))
return true;
for (var k in IP.doors) {
var d = IP.doors[k];
if (d.solid && d.k < 0.7 && worldSolidAt([d.solid], x, z, feet))
return true;
}
var l = ipL(x, z);
if (feet < IP.GL + 3.1 && feet > IP.GL - 3 && ipMazeBlock(l.px, l.pz))
return true;
if (feet < IP.F - 0.4 && l.pz < IP_ST.z0 + 0.3 && l.pz > IP_ST.z1 - 0.5 && Math.abs(l.px) > 2.3 && Math.abs(l.px) < 3.2)
return true;
if (feet < IP.F - 2.2) {
var dc = Math.hypot(l.px, l.pz - IP_FG.cz);
if (dc > IP_FG.r - 0.8 && dc < IP_FG.r + 8 && !(Math.abs(l.px) < 2.3 && l.pz > IP_FG.cz))
return true;
}
return false;
},
function (dt) {
if (!IP.built)
return;
var L = worldLocal(), t = WLD.t;
IP.t += dt;
for (var k in IP.doors) {
var d = IP.doors[k], want = d.open ? 1 : 0;
if (d.k !== want) {
d.k += (want > d.k ? 1 : -1) * Math.min(Math.abs(want - d.k), dt * 0.5);
if (d.stair)
d.g.position.x = -d.k * 4.8;
else
d.g.position.x = -d.k * 4;
}
}
IP.spin.forEach(function (s) { s.o.rotation[s.ax] += dt * s.sp; });
if (IP.core)
IP.core.position.y = IP.FY + 7 + Math.sin(t * 0.5) * 0.15;
IP.people.forEach(function (P) { if (!P.skate || !P.g)
return; var s = P.skate; s.a += dt * s.sp * 0.5; var w = ipW(Math.cos(s.a) * s.r * 1.4, -118 + Math.sin(s.a) * s.r * 0.8); P.g.position.set(w.x, IP.GL + 0.06, w.z); P.g.rotation.y = -s.a - Math.PI / 2; });
IP.drift.forEach(function (D) {
if (!D.list) {
D.list = [];
for (var i = 0; i < D.n; i++) {
var s = wGlow(0xF4F8FF, 3, 0.0);
s.material.blending = THREE.NormalBlending;
IP.pg.add(s);
D.list.push({ s: s, t: i / D.n * 8 });
}
}
D.list.forEach(function (p, i) { p.t += dt; if (p.t > 8) {
p.t -= 8;
} var a = i * 2.4, k = p.t / 8; p.s.position.set(D.cx + Math.cos(a) * D.rx * 0.7 * ((i % 3 + 1) / 3), D.y + k * 5, D.cz + Math.sin(a) * D.rz * 0.7 * ((i % 3 + 1) / 3)); p.s.material.opacity = 0.22 * Math.sin(k * Math.PI); p.s.scale.setScalar(2.5 + k * 3); });
});
ipDragonTick(dt);
var Z = ipZone(L);
IP.zoneKind = !Z ? "" : /forge|stair/.test(Z.name) ? "forge" : Z.roof ? "in" : "";
if (!Z)
return;
if (Z.roof && NP.snow)
NP.snow.visible = false;
worldBanner("<b>The Palace of the North King</b> · " + Z.name);
var feet = L.y - 1.72, best = null, bd = 1e9;
IP.spots.forEach(function (s) { if (s.when && !s.when())
return; if (Math.abs(feet - s.y) > 3)
return; var d = Math.hypot(L.x - s.x, L.z - s.z); if (d < s.r && d < bd) {
bd = d;
best = s;
} });
IP.people.forEach(function (P) { if (!P.t)
return; var x = P.g ? P.g.position.x : P.x, z = P.g ? P.g.position.z : P.z; if (Math.abs(feet - P.y) > 3)
return; var d = Math.hypot(L.x - x, L.z - z), r = P.r || 3.2; if (d < r && d + 0.5 < bd) {
bd = d;
best = { name: P.t.name, verb: P.dragon ? "be with him" : "talk", fn: P.dragon ? ipDragonCard : function () { wTalk(P.t); } };
} });
(IP.relicSpots || []).forEach(function (s) { if (Math.abs(feet - IP.F) > 3)
return; if (IP.doors[s.vault] && IP.doors[s.vault].k < 0.7 && !s.inside)
return; var d = Math.hypot(L.x - s.x, L.z - s.z); if (d < 2.2 && d < bd) {
bd = d;
best = { name: RL_BY[s.key].name, verb: "look", fn: function () { rlCard(s.key); } };
} });
if (best)
worldPrompt("<b>" + esc(best.name) + "</b> · <b>press E</b> to " + best.verb, best.fn);
else if (Z.roof)
worldPrompt(null);
},
function (D) {
var F = IP.F;
IP.relicSpots = [];
var weapons = RELICS.filter(function (r) { return r.vault === "blades"; });
(IP.plinths || []).forEach(function (p, i) {
var r = weapons[i];
if (!r)
return;
var g = rlHeld(r.key);
g.traverse(function (o) { if (o.isMesh && o.material === ipMats().crystal)
o.material = ipMats().iceDeep; });
g.scale.setScalar(r.key === "hoarfang" || r.key === "longnight" ? 1.6 : 2.8);
g.position.set(p.px, F + 1.5, p.pz);
D.add(g);
IP.spin.push({ o: g, ax: "y", sp: 0.3 });
var w = ipW(p.px, p.pz);
IP.relicSpots.push({ x: w.x, z: w.z, key: r.key, vault: "blades", inside: true });
});
var stands = [[-47, -24, "frostplate"], [-27, -24, "polecrown"], [-47, -37, "auroramantle"], [-27, -37, "longsnowboots"], [-37, -30, "dragonshield"]];
var M = ipMats();
stands.forEach(function (q) {
var key = q[2], S2 = new THREE.Group();
if (key === "dragonshield") {
var sg = rlHeld("dragonshield");
sg.scale.setScalar(3.4);
sg.position.set(q[0], F + 0.9, q[1]);
D.add(sg);
IP.spin.push({ o: sg, ax: "y", sp: 0.2 });
}
else {
var mq = ipMannequin(S2, q[0], q[1], Math.PI / 2, { mat: key === "frostplate" ? M.iceDeep : M.silver, helm: key !== "polecrown", cape: key === "auroramantle" ? new THREE.MeshLambertMaterial({ color: 0x3AA88A, side: THREE.DoubleSide }) : null, trim: M.gold });
mq.position.y = F + 0.5;
if (key === "polecrown") {
var cr = new THREE.Group();
cr.position.set(0, 2.18, 0);
mq.add(cr);
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.18, 0.08, 16, 1, true), M.gold);
band.material.side = THREE.DoubleSide;
cr.add(band);
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.2, 4), M.crystal);
sp.position.set(Math.sin(a) * 0.17, 0.12, Math.cos(a) * 0.17);
cr.add(sp);
}
}
if (key === "longsnowboots")
[-0.12, 0.12].forEach(function (x) { var bt = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.5, 10), M.iceDeep); bt.position.set(x, 0.4, 0); mq.add(bt); var cf = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.04, 5, 12), M.fur); cf.rotation.x = Math.PI / 2; cf.position.set(x, 0.66, 0); mq.add(cf); });
D.add(S2);
}
var gl = wGlow(0xCFF0FF, 4, 0.45);
gl.position.set(q[0], F + 2.5, q[1]);
D.add(gl);
var w = ipW(q[0], q[1]);
IP.relicSpots.push({ x: w.x, z: w.z, key: key, vault: "armour", inside: true });
});
},
function (G) {
if (IP.built)
return;
var t0 = performance.now();
var keep = [];
G.children.forEach(function (c) { var l = ipL(c.position.x, c.position.z); if (c.isGroup && Math.abs(l.px) < 146 && l.pz > -156 && l.pz < 236)
keep.push(c); });
keep.forEach(function (c) { G.remove(c); });
for (var i = NP.solids.length - 1; i >= 0; i--) {
var s = NP.solids[i], l2 = ipL(s.x, s.z);
if (Math.abs(l2.px) < 146 && l2.pz > -156 && l2.pz < 236)
NP.solids.splice(i, 1);
}
G.children.forEach(function (m) {
if (!m.isMesh || !m.geometry || !m.geometry.parameters || m.geometry.parameters.width !== 1600 || !m.geometry.index)
return;
var pos = m.geometry.attributes.position, idx = m.geometry.index.array, out = [];
for (var t = 0; t < idx.length; t += 3) {
var cx = 0, cz = 0;
for (var q = 0; q < 3; q++) {
cx += pos.getX(idx[t + q]);
cz += pos.getZ(idx[t + q]);
}
cx /= 3;
cz /= 3;
var l3 = ipL(cx, cz);
var hole = (Math.abs(l3.px) < 46 && l3.pz > -39 && l3.pz < 36) || (Math.abs(l3.px) < 32 && l3.pz > -72 && l3.pz <= -39);
if (!hole)
out.push(idx[t], idx[t + 1], idx[t + 2]);
}
m.geometry.setIndex(out);
});
var PG = new THREE.Group();
PG.position.set(IP.PC.x, 0, IP.PC.z);
PG.rotation.y = -Math.PI / 2;
G.add(PG);
IP.pg = PG;
var S = new THREE.Group();
ipGrounds(S, PG);
ipKeep(S, PG);
ipInside(S, PG);
ipAnnex(S, PG);
ipStair(S, PG);
ipForge(S, PG);
PG.add(psMerge(S));
ipMaze(PG, -134, 60, 22, 32, 5, 7, 1);
ipMaze(PG, 24, 60, 22, 32, 5, 8, -1);
ipRelicsShow(PG);
PG.updateMatrixWorld(true);
ipPeople(G);
ipDragon(G);
ipRoad(G);
IP.built = true;
if (window.console)
console.log("[ice palace] built in", Math.round(performance.now() - t0), "ms;", IP.solids.length, "solids");
},
function (G) {
var M = ipMats();
for (var k = 0; k < 9; k++) {
var x = 96 + k * 10, z = 30;
[-6, 6].forEach(function (s) { var y = npHeight(x, z + s); var g = new THREE.Group(); g.position.set(x, y, z + s); G.add(g); ipC(g, 0.12, 0.15, 3.4, M.ice, 0, 1.7, 0, 8); ipS(g, 0.3, M.glowB, 0, 3.6, 0, 10); var gl = wGlow(0xCFF0FF, 3, 0.55); gl.position.y = 3.6; g.add(gl); NP.solids.push({ x: x, z: z + s, r: 0.3 }); });
}
var sg = wSign(["To the Palace of the North King", "Up the hill · or take the sleigh"], 4.4, 1.2, "#14244E", "#F0D890");
sg.position.set(70, npHeight(70, 22) + 2.2, 22);
sg.rotation.y = -Math.PI / 2;
G.add(sg);
var low = { x: 72, z: 30 }, gate = ipW(0, 246);
IP.stops = [{ x: low.x, z: low.z, to: { x: gate.x, z: gate.z, yaw: -Math.PI / 2 }, name: "The palace sleigh", verb: "ride up to the palace gate" },
{ x: gate.x, z: gate.z + 8, to: { x: low.x - 6, z: low.z, yaw: Math.PI / 2 }, name: "The palace sleigh", verb: "ride down to the village" }];
IP.stops.forEach(function (s) {
var g = new THREE.Group();
g.position.set(s.x, npHeight(s.x, s.z), s.z);
G.add(g);
ipB(g, 1.8, 0.5, 3.2, M.velvetR, 0, 0.6, 0);
ipB(g, 1.9, 1, 0.3, M.gold, 0, 1.1, -1.5);
[-0.8, 0.8].forEach(function (x) { var r = ipB(g, 0.12, 0.12, 3.8, M.gold, x, 0.12, 0.2); });
ipB(g, 1.6, 0.25, 1.2, M.fur, 0, 0.95, -0.6);
var y = npHeight(s.x, s.z);
IP.spots.push({ x: s.x, z: s.z, y: y, r: 3, name: s.name, verb: s.verb, fn: function () { camera.position.x = NP.base + s.to.x; camera.position.z = s.to.z; yaw = s.to.yaw; setStatus("<b>The sleigh glides over the snow.</b> " + (s.to.x > 200 ? "The palace rises ahead of you, spires and dome." : "Down in the village, the lights are warm.")); } });
NP.solids.push({ x: s.x, z: s.z, r: 1.4 });
});
}
];
});
