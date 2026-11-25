/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(494, function () {
"use strict";
return [
function (kind, col, o) {
o = o || {};
var key = "s:" + kind + ":" + col + ":" + (o.e || "");
if (AMS.mats[key])
return AMS.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
var t = typeof texOf === "function" ? texOf(kind) : null;
if (t)
m.map = t;
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.4;
}
m.userData.ldShared = 1;
return (AMS.mats[key] = m);
},
function (col, o) {
o = o || {};
var key = "f:" + col + ":" + (o.e || "") + ":" + (o.op || "") + ":" + (o.ds ? 1 : 0) + ":" + (o.bs ? 1 : 0);
if (AMS.mats[key])
return AMS.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
if (o.bs)
m.side = THREE.BackSide;
m.userData.ldShared = 1;
return (AMS.mats[key] = m);
},
function (P) {
var key = "pt:" + P.k;
if (AMS.views[key])
return AMS.views[key];
var t = amsCanvasTex(256, 128, function (x, w, h) {
var R = amsRand(P.k.length * 977 + P.r * 100);
x.fillStyle = P.c[0];
x.fillRect(0, 0, w, h);
if (P.k === "jupiter" || P.k === "saturn") {
for (var y = 0; y < h; y += 2) {
var b = Math.sin(y * 0.21) + Math.sin(y * 0.07 + 1) * 0.7;
x.fillStyle = P.c[b > 0.6 ? 2 : b > -0.2 ? 0 : 1];
x.globalAlpha = 0.55;
x.fillRect(0, y, w, 2);
}
x.globalAlpha = 1;
if (P.k === "jupiter") {
x.fillStyle = P.c[3];
x.beginPath();
x.ellipse(w * 0.62, h * 0.64, 14, 7, 0, 0, 6.3);
x.fill();
}
}
else if (P.k === "earth") {
x.fillStyle = P.c[1];
for (var i = 0; i < 22; i++) {
x.beginPath();
x.ellipse(R() * w, h * 0.2 + R() * h * 0.6, 10 + R() * 30, 6 + R() * 16, R() * 3, 0, 6.3);
x.fill();
}
x.fillStyle = "#F4F4F4";
x.fillRect(0, 0, w, 8);
x.fillRect(0, h - 8, w, 8);
x.globalAlpha = 0.6;
for (i = 0; i < 40; i++) {
x.beginPath();
x.ellipse(R() * w, R() * h, 8 + R() * 24, 2 + R() * 4, R() * 0.4, 0, 6.3);
x.fill();
}
x.globalAlpha = 1;
}
else {
for (var j = 0; j < 260; j++) {
x.fillStyle = P.c[1 + Math.floor(R() * (P.c.length - 1))];
x.globalAlpha = 0.25 + R() * 0.35;
x.beginPath();
x.arc(R() * w, R() * h, 1 + R() * (P.k === "mercury" ? 5 : 10), 0, 6.3);
x.fill();
}
x.globalAlpha = 1;
if (P.k === "mars") {
x.fillStyle = "#F2EEE8";
x.fillRect(0, 0, w, 5);
x.fillRect(0, h - 4, w, 4);
}
}
});
return (AMS.views[key] = t);
},
function (P, scale) {
var g = new THREE.Group();
var m = new THREE.MeshLambertMaterial({ map: amsPlanetTex(P) });
m.userData.ldShared = 1;
var s = new THREE.Mesh(new THREE.SphereGeometry(P.r * (scale || 1), 32, 18), m);
g.add(s);
if (P.ring) {
var rg = new THREE.RingGeometry(P.r * 1.25 * (scale || 1), P.r * 2.2 * (scale || 1), 64, 1);
var rm = new THREE.MeshLambertMaterial({ map: amsCanvasTex(256, 8, function (x, w, h) { for (var i = 0; i < w; i++) {
var v = 0.55 + 0.35 * Math.sin(i * 0.31) + 0.1 * Math.sin(i * 1.7);
x.fillStyle = "rgba(232,216,176," + Math.max(0, Math.min(1, v)).toFixed(2) + ")";
if (i > w * 0.62 && i < w * 0.66)
x.fillStyle = "rgba(0,0,0,0)";
x.fillRect(i, 0, 1, h);
} }), transparent: true, side: THREE.DoubleSide, depthWrite: false });
var uv = rg.attributes.uv, pos = rg.attributes.position, r0 = P.r * 1.25 * (scale || 1), r1 = P.r * 2.2 * (scale || 1);
for (var i = 0; i < uv.count; i++) {
var rr = Math.hypot(pos.getX(i), pos.getY(i));
uv.setXY(i, (rr - r0) / (r1 - r0), 0.5);
}
var ring = new THREE.Mesh(rg, rm);
ring.rotation.x = -Math.PI / 2 + 0.42;
g.add(ring);
}
return g;
},
function (k) {
if (AMS.views["v:" + k])
return AMS.views["v:" + k];
var c = document.createElement("canvas");
c.width = c.height = 300;
var x = c.getContext("2d"), R = amsRand(k.length * 131 + 7), W = 300, H = 300;
x.fillStyle = "#000";
x.fillRect(0, 0, W, H);
var star = function (n, b) { for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(255,255,255," + (0.25 + R() * 0.6) + ")";
var r = R() * (b || 1.1);
x.beginPath();
x.arc(R() * W, R() * H, r, 0, 6.3);
x.fill();
} };
var blob = function (cx, cy, rx, ry, col, a) { var g = x.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry)); g.addColorStop(0, col.replace("A", a)); g.addColorStop(1, col.replace("A", 0)); x.save(); x.translate(cx, cy); x.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry)); x.translate(-cx, -cy); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, Math.max(rx, ry), 0, 6.3); x.fill(); x.restore(); };
if (k === "saturn") {
star(40);
x.save();
x.translate(150, 150);
x.rotate(-0.35);
x.strokeStyle = "rgba(226,208,160,0.85)";
x.lineWidth = 10;
x.beginPath();
x.ellipse(0, 0, 108, 30, 0, 0, 6.3);
x.stroke();
x.strokeStyle = "rgba(196,176,128,0.6)";
x.lineWidth = 6;
x.beginPath();
x.ellipse(0, 0, 88, 24, 0, 0, 6.3);
x.stroke();
var g = x.createLinearGradient(0, -52, 0, 52);
g.addColorStop(0, "#C8B07A");
g.addColorStop(0.5, "#EAD8A8");
g.addColorStop(1, "#B89A68");
x.fillStyle = g;
x.beginPath();
x.ellipse(0, 0, 58, 52, 0, 0, 6.3);
x.fill();
x.fillStyle = "rgba(150,120,80,0.35)";
for (var i = -3; i <= 3; i++)
x.fillRect(-58, i * 12, 116, 4);
x.strokeStyle = "rgba(232,214,168,0.95)";
x.lineWidth = 10;
x.beginPath();
x.ellipse(0, 0, 108, 30, 0, 0.05, Math.PI - 0.05);
x.stroke();
x.restore();
x.fillStyle = "#E8C890";
x.beginPath();
x.arc(262, 96, 3, 0, 6.3);
x.fill();
}
else if (k === "jupiter") {
star(30);
var gj = x.createLinearGradient(0, 96, 0, 204);
["#C8A07A", "#EAD8B8", "#B07A50", "#F0E2C8", "#C08860", "#E8D4B0", "#B88A62"].forEach(function (c, i, a) { gj.addColorStop(i / (a.length - 1), c); });
x.fillStyle = gj;
x.beginPath();
x.arc(150, 150, 54, 0, 6.3);
x.fill();
x.fillStyle = "#C0603A";
x.beginPath();
x.ellipse(170, 168, 10, 6, 0, 0, 6.3);
x.fill();
[[40, 152], [78, 149], [226, 151], [268, 148]].forEach(function (p) { x.fillStyle = "#F2EAD8"; x.beginPath(); x.arc(p[0], p[1], 3.2, 0, 6.3); x.fill(); });
}
else if (k === "moon") {
x.fillStyle = "#000";
x.fillRect(0, 0, W, H);
var gm = x.createRadialGradient(130, 150, 10, 150, 150, 140);
gm.addColorStop(0, "#E8E6E0");
gm.addColorStop(1, "#9A9890");
x.fillStyle = gm;
x.beginPath();
x.arc(150, 150, 140, 0, 6.3);
x.fill();
for (var i2 = 0; i2 < 9; i2++) {
x.fillStyle = "rgba(90,90,96,0.35)";
x.beginPath();
x.ellipse(60 + R() * 160, 60 + R() * 180, 20 + R() * 40, 14 + R() * 28, R() * 3, 0, 6.3);
x.fill();
}
for (i2 = 0; i2 < 160; i2++) {
var cx = 20 + R() * 260, cy = 20 + R() * 260;
if (Math.hypot(cx - 150, cy - 150) > 136)
continue;
var r = 1 + R() * R() * 12;
x.strokeStyle = "rgba(60,60,64,0.5)";
x.lineWidth = 1;
x.beginPath();
x.arc(cx, cy, r, 0, 6.3);
x.stroke();
x.fillStyle = "rgba(255,255,255,0.18)";
x.beginPath();
x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.7, 0, 6.3);
x.fill();
}
var sh = x.createLinearGradient(190, 0, 260, 0);
sh.addColorStop(0, "rgba(0,0,0,0)");
sh.addColorStop(1, "rgba(0,0,0,0.96)");
x.fillStyle = sh;
x.fillRect(190, 0, 110, 300);
}
else if (k === "orion") {
star(120);
blob(150, 150, 120, 100, "rgba(200,80,110,A)", 0.55);
blob(140, 140, 80, 60, "rgba(120,170,220,A)", 0.45);
blob(150, 148, 36, 28, "rgba(255,240,220,A)", 0.9);
[[146, 146], [152, 150], [148, 154], [155, 145]].forEach(function (p) { x.fillStyle = "#fff"; x.beginPath(); x.arc(p[0], p[1], 2, 0, 6.3); x.fill(); });
}
else if (k === "andromeda") {
star(140);
x.save();
x.translate(150, 150);
x.rotate(-0.6);
blob(0, 0, 140, 34, "rgba(200,190,170,A)", 0.6);
blob(0, 0, 60, 16, "rgba(255,244,220,A)", 0.9);
x.strokeStyle = "rgba(40,30,30,0.5)";
x.lineWidth = 2;
x.beginPath();
x.ellipse(0, 0, 100, 22, 0, 3.6, 6);
x.stroke();
x.restore();
blob(190, 110, 8, 8, "rgba(255,240,220,A)", 0.8);
blob(112, 196, 10, 7, "rgba(255,240,220,A)", 0.7);
}
else if (k === "pleiades") {
star(160);
[[120, 120], [160, 110], [175, 140], [140, 150], [110, 160], [190, 170], [150, 185]].forEach(function (p) { blob(p[0], p[1], 34, 34, "rgba(120,160,255,A)", 0.35); x.fillStyle = "#EAF0FF"; x.beginPath(); x.arc(p[0], p[1], 3.6, 0, 6.3); x.fill(); });
}
x.globalCompositeOperation = "destination-in";
x.beginPath();
x.arc(150, 150, 146, 0, 6.3);
x.fill();
x.globalCompositeOperation = "source-over";
return (AMS.views["v:" + k] = c.toDataURL("image/jpeg", 0.86));
},
function (k) {
var V = AMS_VIEWS[k];
if (!V || typeof worldCard !== "function")
return;
var img = "<div style='text-align:center;margin:6px 0'><img src='" + amsViewImg(k) + "' style='width:240px;height:240px;border-radius:50%;background:#000;box-shadow:0 0 0 6px #111,0 0 0 8px #444'></div>";
worldCard(worldFacts(V.t, V.s, [], V.n, "") + img);
},
function () {
if (AMS.views.sky)
return AMS.views.sky;
var c = document.createElement("canvas");
c.width = 300;
c.height = 260;
var x = c.getContext("2d"), R = amsRand(4242);
var g = x.createRadialGradient(150, 130, 10, 150, 130, 200);
g.addColorStop(0, "#0C1430");
g.addColorStop(1, "#02030A");
x.fillStyle = g;
x.fillRect(0, 0, 300, 260);
x.fillStyle = "rgba(200,210,255,0.06)";
x.save();
x.translate(150, 130);
x.rotate(0.6);
x.fillRect(-200, -24, 400, 48);
x.restore();
for (var i = 0; i < 380; i++) {
x.fillStyle = "rgba(255,255,255," + (0.2 + R() * 0.6) + ")";
x.beginPath();
x.arc(R() * 300, R() * 260, R() * 1.1, 0, 6.3);
x.fill();
}
AMS_CONST.forEach(function (C) {
x.strokeStyle = "rgba(140,180,255,0.55)";
x.lineWidth = 1;
C.l.forEach(function (l) { x.beginPath(); x.moveTo(C.p[l[0]][0], C.p[l[0]][1]); x.lineTo(C.p[l[1]][0], C.p[l[1]][1]); x.stroke(); });
C.p.forEach(function (p, i) { x.fillStyle = i === 0 && C.n.indexOf("Orion") === 0 ? "#FFB080" : "#F4F6FF"; x.beginPath(); x.arc(p[0], p[1], 2.4, 0, 6.3); x.fill(); });
x.fillStyle = "rgba(200,220,255,0.85)";
x.font = "10px Georgia";
x.fillText(C.n.split(",")[0].replace(/ \(.*\)/, ""), C.p[0][0] - 10, C.p[0][1] - 8);
});
return (AMS.views.sky = c.toDataURL("image/jpeg", 0.88));
},
function () {
if (typeof worldCard !== "function")
return;
worldCard(worldFacts("The Planetarium", "tonight's show: the constellations", [], AMS_CONST.map(function (C) { return C.n + ": " + C.f; }).concat(["A constellation is a pattern people drew; the stars in it are usually at very different distances from us, and only line up from where we stand."]), "<div style='text-align:center;margin:6px 0'><img src='" + amsSkyImg() + "' style='width:280px;border-radius:8px'></div>"));
},
function (G) {
var wall = amsSurf("plaster", 0xE8E8EC), base = amsSurf("stone", 0x9A9AA2), dome = amsSurf("metal", 0xC8CCD4), dark = amsFlat(0x14161C);
var R = 9, H = 8;
amsCyl(G, R + 0.6, R + 0.9, 1.2, base, 0, 0, 0, 40);
var drum = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 40, 1, true), wall);
drum.position.y = 1.2 + H / 2;
drum.material.side = THREE.DoubleSide;
G.add(drum);
amsCyl(G, R + 0.25, R + 0.25, 0.4, base, 0, 1.2 + H - 0.2, 0, 40);
var gap = 0.34, d1 = new THREE.Mesh(new THREE.SphereGeometry(R + 0.2, 40, 16, -Math.PI / 2 + gap / 2, Math.PI * 2 - gap, 0, Math.PI / 2), dome);
d1.position.y = 1.2 + H;
G.add(d1);
[-1, 1].forEach(function (s) { var rib = new THREE.Mesh(new THREE.TorusGeometry(R + 0.25, 0.12, 6, 24, Math.PI / 2), dark); rib.rotation.y = Math.PI / 2 + s * gap / 2; rib.position.y = 1.2 + H; G.add(rib); });
var tg = new THREE.Group();
tg.position.set(0, 1.2 + H - 2, 0);
G.add(tg);
amsCyl(tg, 0.9, 1.3, 2.4, base, 0, -2.4, 0, 16);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 12, 24), amsSurf("metal", 0xF2F2F4));
tube.position.set(0, 3.2, -3.6);
tube.rotation.x = -0.75;
tg.add(tube);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.1, 8, 24), dark);
ring.position.set(0, 7.4, -8.0);
ring.rotation.x = -0.75 + Math.PI / 2;
tg.add(ring);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
if (Math.abs(Math.sin(a)) < 0.2 && Math.cos(a) > 0)
continue;
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.6), amsFlat(0xF2D8A0, { e: 0xF2C880, ei: 0.9 }));
w.position.set(Math.sin(a) * (R + 0.03), 1.2 + 4.6, Math.cos(a) * (R + 0.03));
w.rotation.y = a;
G.add(w);
}
amsBox(G, 4.2, 4.2, 2.4, wall, 0, 1.2, R + 0.6);
amsBox(G, 4.6, 0.4, 2.8, base, 0, 5.4, R + 0.6);
amsBox(G, 2.0, 3.0, 0.12, amsSurf("wood", 0x3A2A1E), 0, 1.2, R + 1.82);
amsBox(G, 2.3, 0.3, 0.3, amsFlat(0xD8B060, { e: 0x6A4A10, ei: 0.5 }), 0, 4.25, R + 1.85);
for (var s = 0; s < 4; s++)
amsBox(G, 5 - s * 0.2, 0.3, 0.6, base, 0, s * 0.3, R + 3.6 - s * 0.6);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.6), new THREE.MeshBasicMaterial({ map: amsCanvasTex(512, 80, function (x, w, h) { x.fillStyle = "#1A1C24"; x.fillRect(0, 0, w, h); x.fillStyle = "#E8C87A"; x.font = "bold 40px Georgia"; x.textAlign = "center"; x.fillText("THE GREAT OBSERVATORY", w / 2, 54); }) }));
sg.position.set(0, 4.9, R + 1.82);
G.add(sg);
},
function (G, len, col) {
var dark = amsFlat(0x1E2026), st = amsSurf("metal", col || 0xF2F2F4);
amsCyl(G, 0.3, 0.4, 1.0, amsSurf("stone", 0x8A8A92), 0, 0, 0, 10);
amsCyl(G, 0.08, 0.1, 0.5, dark, 0, 1.0, 0, 8);
var t = new THREE.Group();
t.position.y = 1.55;
G.add(t);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, len || 2.2, 16), st);
tube.rotation.x = -1.0;
tube.position.set(0, 0.55, -0.35);
t.add(tube);
var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16), dark);
cap.rotation.x = -1.0;
cap.position.set(0, 0.55 + Math.cos(1.0) * (len || 2.2) / 2, -0.35 - Math.sin(1.0) * (len || 2.2) / 2);
t.add(cap);
var ep = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8), dark);
ep.position.set(0.2, 0.1, 0.2);
ep.rotation.z = Math.PI / 2;
t.add(ep);
return G;
},
function (G) {
var R = 12, shell = amsSurf("concrete", 0xD8DCE4), dark = amsFlat(0x22242C);
var gap = 0.34, ph0 = Math.PI / 2 + gap / 2;
var out = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 20, ph0, Math.PI * 2 - gap, 0, Math.PI / 2), shell);
out.castShadow = true;
G.add(out);
var capTh = Math.acos(3.6 / R), cap = new THREE.Mesh(new THREE.SphereGeometry(R, 8, 12, ph0 - gap, gap, 0, capTh), shell);
G.add(cap);
var skyT = amsCanvasTex(1024, 512, function (x, w, h) {
var r = amsRand(91);
x.fillStyle = "#04060E";
x.fillRect(0, 0, w, h);
x.fillStyle = "rgba(170,180,255,0.07)";
for (var i = 0; i < w; i += 2) {
var y = h * 0.55 + Math.sin(i / w * 6.28) * h * 0.2;
x.fillRect(i, y - 30, 2, 60);
}
for (i = 0; i < 2600; i++) {
x.fillStyle = "rgba(255,255,255," + (0.25 + r() * 0.7) + ")";
x.beginPath();
x.arc(r() * w, r() * h * 0.98, r() * r() * 2.2, 0, 6.3);
x.fill();
}
AMS_CONST.forEach(function (C, k) {
var ox = k * 190 + 40, oy = 40 + (k % 2) * 60;
x.strokeStyle = "rgba(120,170,255,0.45)";
x.lineWidth = 1.5;
C.l.forEach(function (l) { x.beginPath(); x.moveTo(ox + C.p[l[0]][0] * 0.7, oy + C.p[l[0]][1] * 0.7); x.lineTo(ox + C.p[l[1]][0] * 0.7, oy + C.p[l[1]][1] * 0.7); x.stroke(); });
C.p.forEach(function (p) { x.fillStyle = "#F4F6FF"; x.beginPath(); x.arc(ox + p[0] * 0.7, oy + p[1] * 0.7, 2.6, 0, 6.3); x.fill(); });
});
});
var inM = new THREE.MeshBasicMaterial({ map: skyT, side: THREE.BackSide });
inM.userData.ldShared = 1;
var inner = new THREE.Mesh(new THREE.SphereGeometry(R - 0.25, 48, 20, ph0, Math.PI * 2 - gap, 0, Math.PI / 2), inM);
G.add(inner);
var innerCap = new THREE.Mesh(new THREE.SphereGeometry(R - 0.25, 8, 12, ph0 - gap, gap, 0, capTh), inM);
G.add(innerCap);
var fl = new THREE.Mesh(new THREE.CircleGeometry(R - 0.3, 48), amsFlat(0x2A2438));
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.03;
G.add(fl);
[6.5, 9].forEach(function (rr, k) {
var n = k ? 18 : 12;
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.5)
continue;
var s = new THREE.Group();
s.position.set(Math.sin(a) * rr, 0, Math.cos(a) * rr);
s.rotation.y = a + Math.PI;
G.add(s);
amsBox(s, 0.7, 0.45, 0.7, amsFlat(0x6A2A3A), 0, 0, 0);
var bk = amsBox(s, 0.7, 0.8, 0.12, amsFlat(0x6A2A3A), 0, 0.4, 0.36);
bk.rotation.x = 0.5;
}
});
var pj = new THREE.Group();
pj.position.y = 0;
G.add(pj);
amsCyl(pj, 0.3, 0.5, 1.4, dark, 0, 0, 0, 12);
[-1, 1].forEach(function (s) { var b = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 10), amsSurf("metal", 0x3A3E48)); b.position.set(s * 0.7, 1.9, 0); pj.add(b); });
amsBox(pj, 1.6, 0.25, 0.25, dark, 0, 1.8, 0);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.5), new THREE.MeshBasicMaterial({ map: amsCanvasTex(512, 80, function (x, w, h) { x.fillStyle = "#141A30"; x.fillRect(0, 0, w, h); x.fillStyle = "#A8C8FF"; x.font = "bold 44px Georgia"; x.textAlign = "center"; x.fillText("PLANETARIUM", w / 2, 56); }) }));
sg.position.set(0, 4.3, R * Math.cos(Math.asin(4.3 / R)) + 0.05);
G.add(sg);
},
function (G, r, hue) {
var wall = amsSurf("concrete", 0xE8E8EC), trim = amsSurf("metal", hue || 0x3A6AA8);
amsCyl(G, r, r + 0.2, 1.8, wall, 0, 0, 0, 32);
var d = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), wall);
d.position.y = 1.8;
d.castShadow = true;
G.add(d);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2 + 0.5;
var rib = new THREE.Mesh(new THREE.TorusGeometry(r + 0.05, 0.06, 4, 16, Math.PI / 2), trim);
rib.position.y = 1.8;
rib.rotation.y = a;
rib.rotation.z = 0;
G.add(rib);
}
for (i = 0; i < 5; i++) {
var b = i / 5 * Math.PI * 2 + 0.6;
var w = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), amsFlat(0xF2E0B0, { e: 0xF2C880, ei: 0.85 }));
w.position.set(Math.sin(b) * (r + 0.03), 1.6, Math.cos(b) * (r + 0.03));
w.rotation.y = b;
G.add(w);
}
amsBox(G, 2.2, 2.6, 2.2, wall, 0, 0, r + 0.6);
amsBox(G, 1.2, 2.1, 0.1, trim, 0, 0, r + 1.72);
amsBox(G, 2.4, 0.2, 2.4, trim, 0, 2.6, r + 0.6);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), amsGlow(0xFFE8B0));
lamp.position.set(0.8, 2.3, r + 1.75);
G.add(lamp);
},
function (G, r) {
var fr = amsSurf("metal", 0xE8ECEE);
amsCyl(G, r, r, 0.6, amsSurf("concrete", 0xC8CCD0), 0, 0, 0, 32);
var gl = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), amsFlat(0xC8F0E0, { op: 0.28, e: 0x2A6A4A, ei: 0.3 }));
gl.position.y = 0.6;
G.add(gl);
var fw = new THREE.Mesh(new THREE.SphereGeometry(r + 0.02, 12, 5, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xE8ECEE, wireframe: true }));
fw.position.y = 0.6;
G.add(fw);
var R = amsRand(717), leaf = amsSurf("grass", 0x4A8A3A), soil = amsSurf("earth", 0x4A3424);
for (var i = 0; i < 5; i++) {
var z = -r * 0.6 + i * r * 0.3;
amsBox(G, r * 1.3, 0.5, 1.2, soil, 0, 0.6, z);
for (var k = 0; k < 7; k++) {
var p = new THREE.Mesh(new THREE.SphereGeometry(0.35 + R() * 0.2, 8, 6), leaf);
p.position.set(-r * 0.55 + k * r * 0.18, 1.3, z);
G.add(p);
}
}
[[-r * 0.4, -r * 0.45], [r * 0.4, -r * 0.45]].forEach(function (q) {
amsCyl(G, 0.12, 0.16, 2.2, amsSurf("bark", 0x5A3A22), q[0], 0.6, q[1], 8);
var c = new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 8), leaf);
c.position.set(q[0], 3.4, q[1]);
G.add(c);
for (var j = 0; j < 6; j++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), amsFlat(0xE87A2A));
f.position.set(q[0] + Math.sin(j) * 1.1, 3.1 + Math.cos(j * 2) * 0.4, q[1] + Math.cos(j) * 1.1);
G.add(f);
}
});
amsBox(G, 2.0, 2.4, 1.6, fr, 0, 0, r + 0.5);
amsBox(G, 1.1, 2.0, 0.1, amsSurf("metal", 0x3A8A5A), 0, 0, r + 1.32);
},
function (G) {
var wall = amsSurf("concrete", 0xD8D8DC), roof = amsSurf("metal", 0xA8ACB4);
amsBox(G, 16, 3.4, 8, wall, 0, 0, 0);
var rf = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 16.4, 24, 1, false, 0, Math.PI), roof);
rf.rotation.z = Math.PI / 2;
rf.scale.set(0.3, 1, 1);
rf.position.y = 3.4;
G.add(rf);
amsBox(G, 13, 1.4, 0.08, amsFlat(0xF2D8A0, { e: 0xF2C070, ei: 0.9 }), 0, 1.2, 4.02);
amsBox(G, 1.4, 2.4, 0.1, amsSurf("metal", 0xC86A2A), 5.4, 0, 4.06);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.6), new THREE.MeshBasicMaterial({ map: amsCanvasTex(512, 80, function (x, w, h) { x.fillStyle = "#2A1A14"; x.fillRect(0, 0, w, h); x.fillStyle = "#F2C070"; x.font = "bold 42px Georgia"; x.textAlign = "center"; x.fillText("THE STARFALL CANTEEN", w / 2, 56); }) }));
sg.position.set(0, 3.0, 4.06);
G.add(sg);
},
function (G) {
var R = amsRand(3131), rock = amsSurf("rock", 0x3A3634, {}), ice = amsFlat(0xA8D8F2, { e: 0x2A6A9A, ei: 0.45 });
var geo = new THREE.IcosahedronGeometry(16, 3), p = geo.attributes.position;
for (var i = 0; i < p.count; i++) {
var v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
var n = 1 + 0.22 * Math.sin(v.x * 0.3) * Math.cos(v.z * 0.27) + 0.12 * Math.sin(v.y * 0.5 + v.x * 0.2);
v.multiplyScalar(n);
p.setXYZ(i, v.x, v.y * 0.62, v.z);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, rock);
m.position.y = 4;
m.castShadow = true;
m.receiveShadow = true;
G.add(m);
for (i = 0; i < (amsLite() ? 10 : 24); i++) {
var a = R() * 6.28, h = 2 + R() * 12;
var c = new THREE.Mesh(new THREE.OctahedronGeometry(0.6 + R() * 1.4, 0), ice);
var rr = 14.5 - h * 0.4;
c.position.set(Math.sin(a) * rr, h, Math.cos(a) * rr);
c.rotation.set(R() * 3, R() * 3, R() * 3);
c.scale.y = 1.6;
G.add(c);
}
var tim = amsSurf("wood", 0x6A4A2A);
var mz = 15.6;
amsBox(G, 0.5, 4.2, 0.5, tim, -2.2, 0, mz);
amsBox(G, 0.5, 4.2, 0.5, tim, 2.2, 0, mz);
amsBox(G, 5.2, 0.6, 0.7, tim, 0, 4.2, mz);
amsBox(G, 4, 4, 0.1, amsFlat(0x050506), 0, 0, mz - 0.4);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), amsGlow(0xFFD890));
lamp.position.set(0, 3.8, mz + 0.5);
G.add(lamp);
for (var z = mz; z < mz + 22; z += 0.9) {
amsBox(G, 1.8, 0.08, 0.22, tim, 0, 0.02, z);
}
[-0.6, 0.6].forEach(function (x) { amsBox(G, 0.08, 0.1, 22, amsSurf("metal", 0x8A8A92), x, 0.1, mz + 11); });
[mz + 6, mz + 14].forEach(function (z, k) {
var cart = new THREE.Group();
cart.position.set(0, 0.2, z);
G.add(cart);
amsBox(cart, 1.4, 0.8, 2, amsSurf("metal", 0x6A5A4A), 0, 0.3, 0);
for (var j = 0; j < 4; j++) {
var c = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), ice);
c.position.set(-0.4 + (j % 2) * 0.8, 1.2, -0.5 + Math.floor(j / 2));
G.add(c);
c.position.add(cart.position);
}
[-0.7, 0.7].forEach(function (x) { [-0.6, 0.6].forEach(function (zz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 10), amsFlat(0x2A2A2E)); w.rotation.z = Math.PI / 2; w.position.set(x, 0.15, zz); cart.add(w); }); });
});
for (i = 0; i < 12; i++) {
var b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), ice);
b.position.set(4 + (i % 4) * 1.3, 0.6 + Math.floor(i / 8) * 1.2, mz + 18 + Math.floor((i % 8) / 4) * 1.3);
G.add(b);
}
},
function (G) {
var st = amsSurf("stone", 0xA8A8B0);
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
var g = new THREE.Group();
g.position.set(Math.sin(a) * 8, 0, Math.cos(a) * 8);
g.rotation.y = a;
G.add(g);
amsBox(g, 2.6, 0.5, 0.9, st, 0, 0, 0);
var bk = amsBox(g, 2.6, 0.7, 0.15, st, 0, 0.35, 0.45);
bk.rotation.x = -0.6;
}
for (i = 0; i < 16; i++) {
var b = i / 16 * Math.PI * 2;
var l = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 4), amsGlow(0x8AB8FF));
l.position.set(Math.sin(b) * 4, 0.08, Math.cos(b) * 4);
G.add(l);
}
var sg = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), new THREE.MeshBasicMaterial({ map: amsCanvasTex(512, 96, function (x, w, h) { x.fillStyle = "#10142A"; x.fillRect(0, 0, w, h); x.fillStyle = "#C8D8FF"; x.font = "bold 48px Georgia"; x.textAlign = "center"; x.fillText("METEOR WATCH", w / 2, 66); }) }));
amsBox(G, 0.12, 1.4, 0.12, st, -1.0, 0, 11);
amsBox(G, 0.12, 1.4, 0.12, st, 1.0, 0, 11);
sg.position.set(0, 1.6, 11.07);
G.add(sg);
},
function (G) {
var g = new THREE.Group();
G.add(g);
var n = amsLite() ? 3 : 6;
for (var i = 0; i < n; i++) {
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.35, 26, 6, 1, true), new THREE.MeshBasicMaterial({ color: 0xE8F0FF, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
m.userData.k = i;
g.add(m);
}
return g;
},
function (G) {
var P = AMS_PLANETS[2];
var m = new THREE.MeshBasicMaterial({ map: amsPlanetTex(P), color: 0xD8E0EA });
m.userData.ldShared = 1;
var e = new THREE.Mesh(new THREE.SphereGeometry(24, 40, 24), m);
G.add(e);
var atm = new THREE.Mesh(new THREE.SphereGeometry(25, 40, 24), new THREE.MeshBasicMaterial({ color: 0x6AA8FF, transparent: true, opacity: 0.18, side: THREE.BackSide, depthWrite: false }));
G.add(atm);
return e;
},
function (G) {
var s = new THREE.Mesh(new THREE.SphereGeometry(2.6, 32, 18), new THREE.MeshBasicMaterial({ map: amsCanvasTex(256, 128, function (x, w, h) { var r = amsRand(55); x.fillStyle = "#FFB030"; x.fillRect(0, 0, w, h); for (var i = 0; i < 600; i++) {
x.fillStyle = "rgba(255," + (160 + Math.floor(r() * 90)) + ",40,0.5)";
x.beginPath();
x.arc(r() * w, r() * h, 1 + r() * 3, 0, 6.3);
x.fill();
} }) }));
s.position.y = 4.4;
G.add(s);
var glow = new THREE.Mesh(new THREE.SphereGeometry(3.4, 24, 14), new THREE.MeshBasicMaterial({ color: 0xFFC860, transparent: true, opacity: 0.22, depthWrite: false }));
glow.position.y = 4.4;
G.add(glow);
amsCyl(G, 1.2, 1.6, 1.4, amsSurf("stone", 0x8A8A92), 0, 0, 0, 16);
return s;
},
function (P) {
var L = AMS_L, lite = P.lite, R = ldRand(7171), A = AMS_AT;
AMS.doors.length = 0;
P.path([[0, 6], [0, -116]], 4, 0xA8A8B0, "lanternpost", 15);
P.path([[0, -40], [-70, -40]], 3, 0xA8A8B0);
P.path([[0, -40], [70, -60]], 3, 0xA8A8B0);
P.path([[-70, -40], [-82, -96]], 3, 0xA8A8B0, "lanternpost", 18);
P.path([[0, 22], [26, 30], [276, 30]], 3, 0xB8B4A8, "lanternpost", 22);
P.path([[-70, -40], [-120, -10], [-150, 10]], 3, 0xA8A8B0, "lanternpost", 18);
P.path([[70, -60], [120, -150], [150, -170]], 3, 0xA8A8B0, "lanternpost", 20);
P.path([[-82, -124], [-150, -165]], 2.5, 0xA8A8B0);
P.path([[0, -116], [-40, -186]], 2.5, 0xA8A8B0, "lanternpost", 16);
P.make(A.obs[0], A.obs[1], 0, 12, function (G) { amsObservatory(G); }, { r: 9.6, h: 14 });
amsDoor(A.obs[0], A.obs[1], 0, "researchlab", "The Great Observatory", 11.6);
P.make(20, -90, 0, 3, function (G) {
var m = ldMat(0xD8D8E0), d = ldMat(0x2A2A34);
var base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 1.2, 10), d);
base.position.y = 0.6;
G.add(base);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 5, 14), m);
tube.position.set(0, 2.6, -0.6);
tube.rotation.x = 0.7;
G.add(tube);
var lens = new THREE.Mesh(new THREE.CircleGeometry(0.44, 14), ldGlowMat(0x8AB8FF, 0.8));
lens.position.set(0, 4.5, -2.2);
lens.rotation.x = -0.87;
G.add(lens);
}, { r: 1.1, h: 4 });
P.person("astronomer", 16, -88, 0.4, { sex: "f", look: { top: 0xF4F4F4, topKind: "coat", bottom: 0x2A2A3A, shoes: 0x2A2A2A, skin: 0x8A5A3A, hair: 0x1A1010, hairStyle: "bun", layer: "labcoat" } }, ldWho("Dr. Amara Osei, astronomer", L, "Dr. Amara Osei, the astronomer who keeps the Great Observatory and its terrace of telescopes among the stars", "Look up: that light left some of those stars before there were people on Earth. Try the telescopes on the terrace: each one is set on something wonderful. Saturn first, I always say."));
P.make(A.terrace[0], A.terrace[1] - 4, 0, 0.5, function (G) { var rg = new THREE.RingGeometry(1, 30, 48, 1, Math.PI * 1.08, Math.PI * 0.84), ps = rg.attributes.position, uv = rg.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, ps.getX(i) / 3, ps.getY(i) / 3); var pv = new THREE.Mesh(rg, amsSurf("paving", 0xB8B8C0)); pv.rotation.x = -Math.PI / 2; pv.position.y = 0.03; G.add(pv); });
AMS_SCOPES.forEach(function (q, i) { P.make(q[1], q[2], Math.atan2(q[1], q[2] + 66) + Math.PI, 0.9, function (G) { amsScope(G, 2 + ((i * 7) % 3) * 0.3, [0xF2F2F4, 0xE8E0C8, 0x3A4A6A][i % 3]); }, { r: 0.45, h: 2 }); });
P.make(A.plan[0], A.plan[1], 0, 13, function (G) { amsPlanetarium(G); return true; });
P.make(A.plan[0], A.plan[1] + 17, 0, 4.5, function () { });
P.k("orrery", -70, -40, 0, 1.4);
P.k("satdish", 50, -130, 0, 1.2);
P.k("satdish", -50, -130, 0, 1);
P.k("landinglights", 70, -60, 0, 1);
P.k("shuttle", 70, -60, 0.4, 1);
P.person("pilot", 62, -52, -0.8, { sex: "f", look: { top: 0x2A3A5A, topKind: "shirt", bottom: 0x2A3A5A, shoes: 0x1A1A1A, skin: 0xD8B898, hair: 0x3A2A1A, hat: "cap", hatColor: 0x2A3A5A } }, ldWho("Captain Lena Sørensen, shuttle pilot", L, "Captain Lena Sørensen, a shuttle pilot resting between flights among the stars, who flies the ice from the comet mine", "She's a sweet ship. From here you can see the whole Milky Way edge-on: that bright band is the disc of our own galaxy, a hundred thousand light years across."));
P.k("hangar", 118, -96, -Math.PI / 2, 1);
amsDoor(118, -96, -Math.PI / 2, "hangar", "The shuttle hangar", 12);
P.k("controltower", 112, -34, -Math.PI / 2, 0.9);
amsDoor(112, -34, -Math.PI / 2, "controltower", "The control tower", 6);
P.person("controller", 100, -34, Math.PI / 2, { sex: "m", look: { top: 0xE8E8EC, topKind: "shirt", bottom: 0x2A3A5A, shoes: 0x1A1A1A, skin: 0x6A4A2A, hair: 0x1A1010, layer: "jacket", layerColor: 0x2A3A5A } }, ldWho("Kofi Mensah, flight controller", L, "Kofi Mensah, who runs the control tower of the little spaceport Among the Stars", "Two flights today: the ice run from the comet and a sightseeing hop round the Earth. No wind up here, so no delays. Only meteors, and we track every one."));
P.person("mechanic", 108, -88, -1.2, { sex: "f", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x3A3A40, shoes: 0x2A2A2A, skin: 0xE8C8A8, hair: 0x6A3A1A, hat: "cap", hatColor: 0xE8A030 } }, ldWho("Rosa Delgado, shuttle mechanic", L, "Rosa Delgado, who keeps the shuttles flying from the hangar", "Heat shield tiles, every one checked by hand before each flight. Coming back into air is the hot part: the air in front of the ship squeezes and heats up to over a thousand degrees."), { r: 8, sp: 0.5 });
P.make(A.sun[0], A.sun[1] - 12, 0, 2, function (G) { amsSun(G); return true; }, { r: 1.8, h: 6 });
P.fact(A.sun[0] + 3, A.sun[1] - 8, 3, "The Sun", "read the plate", ["The Sun", "The start of the Solar System Walk", ["The Sun holds 99.8% of all the mass in the Solar System.", "Here the distances between the planets are true to scale: one step of 8 metres is the distance from the Sun to the Earth (about 150 million km). The planets' sizes are not to scale: at this scale the Earth would be a grain of sand.", "Walk east along the path to Neptune, 30 times farther out than the Earth."]]);
AMS_PLANETS.forEach(function (Pl, i) {
var x = A.sun[0] + 4 + Pl.au * 8, z = A.sun[1] - 12;
P.make(x, z, 0, 0.8, function (G) { amsCyl(G, 0.35, 0.5, 1.4, amsSurf("stone", 0x8A8A92), 0, 0, 0, 10); var g = amsPlanetMesh(Pl, Math.min(1, 0.45 + Pl.r * 0.15)); g.position.y = 1.9 + Pl.r * 0.5; g.userData.amsSpin = 1; G.add(g); g.userData.amsPl = Pl.k; return true; }, { r: 0.5, h: 2 });
P.fact(x + 1.4, z + 2, 2.4, Pl.n, "read the plate", [Pl.n, (Pl.au < 1 ? Pl.au.toFixed(2) : Pl.au) + " times as far from the Sun as the Earth", [Pl.f]]);
});
P.person("guide_solar", 40, 36, Math.PI, { sex: "m", look: { top: 0xF2F2EE, topKind: "shirt", bottom: 0x3A3E48, shoes: 0x2A2A30, skin: 0xC89068, hair: 0x5A4A3A, layer: "jacket", layerColor: 0xE8B030 } }, ldWho("Mateo Ruiz, guide of the Solar System Walk", L, "Mateo Ruiz, who leads walks down the Solar System Walk and loves showing how empty space really is", "The first four planets are all crowded round the Sun, see? Then it's a long walk to Jupiter. And Neptune is right out there by the last lamp. Space is mostly space!"), { r: 30, sp: 0.5 });
P.make(A.town[0], A.town[1], 0, 0.5, function (G) { var lawn = new THREE.Mesh(new THREE.CircleGeometry(18, 40), amsSurf("grass", 0x5A8A4A)); lawn.rotation.x = -Math.PI / 2; lawn.position.y = 0.04; G.add(lawn); });
AMS_HAB.forEach(function (h, i) { P.make(h.x, h.z, h.rot, 6.4, function (G) { amsHabitat(G, 5, [0x3A6AA8, 0xC86A3A, 0x3A9A7A, 0x8A5AC8, 0xE8B030, 0xC83A5A, 0x4A8AB8][i]); }, { r: 5.2, h: 7 }); amsDoor(h.x, h.z, h.rot, "habitat", h.n + ", Starfall", 7.6); });
P.make(A.town[0], A.town[1] - 8, 0, 6, function (G) { amsGreenhouse(G, 7); }, { r: 7.2, h: 8 });
amsDoor(A.town[0], A.town[1] - 8, 0, "biodome", "The greenhouse of Starfall", 8.6);
P.make(A.town[0] + 1, A.town[1] + 10, Math.PI, 5, function (G) { amsCanteen(G); }, { hw: 8, hd: 4, h: 5 });
amsDoor(A.town[0] + 1, A.town[1] + 10, Math.PI, "habitat", "The Starfall Canteen", 4.4);
var town = [["Ama Owusu, mayor of Starfall", "the mayor of Starfall, the settlement Among the Stars, who knows every one of its two hundred people", "Welcome to Starfall! Seven houses, one greenhouse, one canteen, and the best view in creation. The greenhouse feeds us; the comet gives us water. Ice is water, you know, once you melt it.", "f", 0xC86A3A],
["Wei Chen, greenhouse keeper", "the keeper of the Starfall greenhouse", "Tomatoes, beans, lettuces, and two orange trees that think they're in Spain. Plants need light, water, warmth and air: we make all four here.", "m", 0x3A9A7A],
["Isla MacLeod, canteen cook", "the cook of the Starfall Canteen", "Soup of the day is greenhouse tomato. Bread's fresh. Sit anywhere: people come in from the mine at six and it gets loud.", "f", 0xE8E0D0],
["Dr. Yusuf Haddad, settlement doctor", "the doctor of Starfall", "Low gravity is lovely, but bones and muscles get lazy without work. Everyone here exercises two hours a day, like real astronauts do.", "m", 0xF2F2F4],
["Nia Brooks, schoolteacher", "the teacher of Starfall's little school", "Today's lesson: why is the sky black here, even by day? Because there is no air to scatter the sunlight. On Earth, the air turns it blue.", "f", 0x8A5AC8]];
town.forEach(function (t, i) {
var a = i / town.length * Math.PI * 2, x = A.town[0] + Math.sin(a) * 12, z = A.town[1] + Math.cos(a) * 12;
P.person("town" + i, x, z, a + Math.PI, { sex: t[3], look: { top: t[4], topKind: "shirt", bottom: 0x3A3E48, shoes: 0x2A2A30, skin: [0x6A4A2A, 0xE8C8A8, 0xF2D8C0, 0xC89068, 0x5A3A22][i], hair: [0x1A1010, 0x1A1010, 0xC86A2A, 0x2A2A2A, 0x1A1010][i], layer: "jacket", layerColor: t[4] } }, ldWho(t[0], L, t[1], t[2]), { r: 10, sp: 0.4 });
});
for (var ki = 0; ki < (lite ? 2 : 6); ki++)
P.person("star_kid" + ki, A.town[0] - 6 + ki * 2.4, A.town[1] + 2 + (ki % 2) * 3, ki, { child: 1, sex: ki % 2 ? "m" : "f", look: { top: [0xE87AA8, 0x3AA88A, 0xE8B030, 0x2A7ACA, 0xC83A5A, 0x8A5AC8][ki], topKind: "shirt", bottom: 0x2A2E38, shoes: 0xF4F4F4 } }, null, { r: 12, sp: 1.1 });
P.make(A.comet[0], A.comet[1], 0, 18, function (G) { amsComet(G); }, { r: 15, h: 14 });
amsDoor(A.comet[0], A.comet[1], 0, "cave", "The comet-ice mine", 16.2);
P.person("miner0", A.comet[0] + 3, A.comet[1] + 20, Math.PI, { sex: "m", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x3A3A40, shoes: 0x2A2018, skin: 0x8A5A3A, hair: 0x1A1010, beard: "short", hat: "cap", hatColor: 0xE8C040 } }, ldWho("Big Tomas, foreman of the ice mine", L, "Big Tomas, foreman of the comet-ice mine, where a fallen comet is mined for its ice", "A comet is a dirty snowball: ice and dust left over from when the planets were made, four and a half billion years ago. We dig the ice, melt it, and that's Starfall's water. Mind the carts!"));
for (var mi = 1; mi < (lite ? 3 : 6); mi++)
P.person("miner" + mi, A.comet[0] - 4 + mi * 2, A.comet[1] + 24 + (mi % 2) * 4, R() * 6, { sex: mi % 2 ? "f" : "m", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x3A3A40, shoes: 0x2A2018, skin: [0xE8C8A8, 0x6A4A2A, 0xC89068, 0xF2D8C0, 0x8A5A3A][mi % 5], hair: 0x2A1A10, hat: "cap", hatColor: 0xE8C040 } }, null, { r: 8, sp: 0.6 });
P.make(A.watch[0], A.watch[1], 0, 9, function (G) { amsMeteorWatch(G); });
P.fact(A.watch[0], A.watch[1] + 10, 3, "Meteor Watch", "read the board", ["Meteor Watch", "Shooting stars", ["A shooting star is a grain of dust, often no bigger than sand, burning up as it hits air at tens of kilometres a second.", "Meteor showers come on the same nights every year, when the Earth passes through the dust a comet has left behind: the Perseids in August, the Geminids in December.", "A meteor that reaches the ground is a meteorite."]]);
for (var wi = 0; wi < (lite ? 2 : 4); wi++) {
var wa = wi / 4 * Math.PI * 2 + 0.3;
P.person("watcher" + wi, A.watch[0] + Math.sin(wa) * 8, A.watch[1] + Math.cos(wa) * 8, wa + Math.PI, { sex: wi % 2 ? "m" : "f", look: { top: [0x2A4A7A, 0x6A2A3A, 0x3A6A4A, 0x4A3A6A][wi], topKind: "coat", bottom: 0x2A2A30, shoes: 0x2A2A30, skin: [0xF2D8C0, 0x6A4A2A, 0xC89068, 0xE8C8A8][wi], hair: 0x3A2A1A } }, wi === 0 ? ldWho("Priya Nair, meteor counter", L, "Priya Nair, who counts shooting stars at Meteor Watch every night for a science project", "Forty-one so far tonight! Lie back and don't look anywhere in particular: your eyes catch them better from the side.") : null);
}
P.being("spacewalker", -30, -60, 0, 1, null, { r: 18, sp: 0.4 });
P.being("spacewalker", 40, 30, 2, 1, null, { r: 18, sp: 0.4 });
if (!lite) {
P.being("spacewalker", 120, -160, 1, 1, null, { r: 20, sp: 0.4 });
P.being("spacewalker", -120, -60, 1, 1, null, { r: 20, sp: 0.4 });
P.being("android", -150, -10, 0, 1, null, { r: 14, sp: 0.5 });
P.being("drone", 90, -120, 0, 1, null, { r: 30, sp: 1 });
}
var spots = [[0, -30, 14], [0, -90, 12], [-40, -40, 14], [40, -50, 14], [-82, -90, 10], [60, 30, 20], [140, 30, 20], [-150, 30, 16], [-120, -20, 14], [110, -60, 14], [-40, -160, 12], [0, -60, 10]];
var hue = [0x2A7ACA, 0xD86A3A, 0x3AA88A, 0x8A5AC8, 0xE8B030, 0xC83A5A, 0x4A8AB8, 0x6AA848];
for (var i = 0; i < (lite ? 10 : 30); i++) {
var s = spots[i % spots.length], sex = R() < 0.5 ? "m" : "f", h = hue[Math.floor(R() * hue.length)];
P.person("star_walk" + i, s[0] + (R() - 0.5) * s[2], s[1] + (R() - 0.5) * s[2], R() * 6.28, { sex: sex, child: R() < 0.1 ? 1 : 0, look: { top: R() < 0.5 ? 0xF2F2EE : h, topKind: R() < 0.4 ? "coat" : "shirt", bottom: R() < 0.5 ? 0x2E3440 : 0x4A4E58, shoes: 0x2A2A30, layer: R() < 0.6 ? "jacket" : undefined, layerColor: h, skin: [0xF2D8C0, 0xE8C8A8, 0xC89068, 0x8A5A3A, 0x6A4A2A][Math.floor(R() * 5)], hair: [0x1A1010, 0x3A2A1A, 0x6A3A1A, 0xC8A060, 0x8A8A8A][Math.floor(R() * 5)] } }, null, { r: s[2], sp: 0.4 + R() * 0.5 });
}
P.make(A.seat[0], A.seat[1], 0, 1.2, function (G) { return true; }, { r: 0.8, h: 2 });
P.sign(A.seat[0] + 3, A.seat[1] + 3, 0.3, ["The chain from Laputa", "Press E to read"], ["The flying island", "Gulliver's Travels, Part III (Jonathan Swift, 1726)", ["High above floats Laputa, the flying island, held up and steered by a great loadstone.", "Lemuel Gulliver was drawn up to it on a seat at the end of a chain. The seat waits here. Sit on it, and the island will draw you up.", "The whole third voyage is there to play: Laputa, Balnibarbi and its Academy, the island of sorcerers, Luggnagg and its immortals, and Japan."]]);
P.sign(-8, -14, 0.3, ["Among the Stars", "Press E to read"], ["The stars", "What is real", ["Sunlight takes about 8 minutes 20 seconds to reach the Earth.", "The nearest star after the Sun is Proxima Centauri, about 4.2 light years away: its light set out over four years ago.", "A light year is how far light goes in a year: about 9.5 trillion km.", "Most of the stars you see are bigger and brighter than the Sun; the faint small ones are too dim to see without a telescope.", "The Milky Way is our own galaxy, seen from inside: a disc of a few hundred billion stars."]]);
P.k("planet", -260, -420, 0, 1, { y: 140, solid: false });
P.k("planet", 320, -380, 0, 0.6, { y: 90, solid: false });
P.k("floatingisland", 160, -60, 0, 1, { y: 34, solid: false });
P.strew("crater", 14, 60, 300, 1501, 1, 1.8);
P.strew("moonrock", 36, 20, 290, 1502, 0.8, 1.6);
P.strew("starcrystal", 26, 20, 260, 1503, 1, 1.4);
P.strew("rock", 22, 30, 290, 1504, 0.8, 1.8);
},
function () {
if (typeof EVB === "undefined" || !EVB.doors || typeof LD === "undefined")
return;
EVB.doors = EVB.doors.filter(function (q) { return !(q.spec && q.spec.ams); });
AMS.doors.forEach(function (D, i) {
if (typeof PLANS === "undefined" || !PLANS[D.arch])
return;
var X = LD.ox + D.x, Z = LD.oz + D.z, s = Math.sin(D.rot), c = Math.cos(D.rot);
var spec = { id: "ams_door_" + i + "_" + D.arch, archetype: D.arch, attrs: {}, x: X - s * 4, z: Z - c * 4, rot: D.rot, realm: store.here || 0, label: D.name, inside: {}, ams: 1,
evb: { theme: null, src: "ld", land: LD.kind }, evbDoor: { x: X, z: Z, out: { x: s, z: c } } };
EVB.doors.push({ spec: spec, src: "ld", info: { theme: null, name: D.name, doors: 1 } });
});
},
function () {
var G = new THREE.Group();
G.userData.ldKeep = 1;
LD.g.add(G);
AMS.sky = G;
var e = new THREE.Group();
e.position.set(150, 110, -360);
G.add(e);
AMS.earth = amsEarth(e);
AMS.meteors = amsMeteors(G);
AMS.meteors.children.forEach(function (m, i) { m.userData.t = i * 3.1; });
AMS.float = [];
var R = amsRand(808), rock = amsSurf("rock", 0x5A5650);
for (var i = 0; i < (amsLite() ? 6 : 14); i++) {
var geo = new THREE.DodecahedronGeometry(1.2 + R() * 3.4, 1), p = geo.attributes.position;
for (var k = 0; k < p.count; k++) {
var f = 0.8 + R() * 0.35;
p.setXYZ(k, p.getX(k) * f, p.getY(k) * f * 0.8, p.getZ(k) * f);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, rock);
m.position.set(70 + R() * 90, 14 + R() * 30, -160 - R() * 110);
m.userData.sp = (R() - 0.5) * 0.3;
m.userData.y0 = m.position.y;
m.userData.ph = R() * 6;
G.add(m);
AMS.float.push(m);
}
AMS.isle = null;
if (typeof gvwIslandModel === "function") {
try {
var A = AMS_AT, ig = new THREE.Group();
ig.position.set(A.isle[0], A.isle[2], A.isle[1]);
G.add(ig);
var isl = gvwIslandModel(90);
ig.add(isl);
var lift = {};
isl.traverse(function (o) { if (!o.material || Array.isArray(o.material))
return; var k = o.material.uuid; if (!lift[k]) {
var c = o.material.clone();
if (c.emissive) {
c.emissive = new THREE.Color(0x3E4458);
c.emissiveIntensity = 0.7;
if (!c.map && typeof texOf === "function") {
var tx = texOf("rock");
if (tx)
c.map = tx;
}
}
c.fog = false;
c.userData.ldShared = 1;
lift[k] = c;
} o.material = lift[k]; });
for (var li = 0; li < (amsLite() ? 16 : 40); li++) {
var la = li / (amsLite() ? 16 : 40) * Math.PI * 2, lr = 91.2 - (li % 4) * 3.6;
var lp = new THREE.Mesh(new THREE.SphereGeometry(1.1, 6, 4), amsGlow(0xFFD890));
lp.position.set(Math.cos(la) * lr, -(li % 4) * 2.5 + 0.6, Math.sin(la) * lr);
ig.add(lp);
}
var ch = new THREE.Group();
ch.position.set(A.seat[0], 0, A.seat[1]);
G.add(ch);
gvwChainSeat(ch, 0, 0, 0, A.isle[2] - 1.2);
AMS.isle = { g: ig, ch: ch };
}
catch (err) {
if (window.console)
console.warn("[among the stars] laputa", err);
}
}
G.traverse(function (o) { if (o.material && !Array.isArray(o.material))
o.material.fog = false; });
AMS.spin = [];
LD.g.traverse(function (o) { if (o.userData && o.userData.amsSpin)
AMS.spin.push(o); });
},
function () {
AMS_SCOPES.forEach(function (q) { var V = AMS_VIEWS[q[0]]; LD.talkers.push({ x: q[1], z: q[2], r: 1.8, name: "A telescope set on " + V.t.replace(/ and four moons/, ""), verb: "look through it", amsView: q[0] }); });
LD.talkers.push({ x: AMS_AT.plan[0], z: AMS_AT.plan[1] + 2, r: 4, name: "The Planetarium", verb: "watch the show", amsSky: 1 });
LD.talkers.push({ x: AMS_AT.seat[0], z: AMS_AT.seat[1], r: 2.4, name: "The seat on the chain from Laputa", verb: "sit on it, and be drawn up (Gulliver's Travels, Part III)", amsChain: 1 });
}
];
});
