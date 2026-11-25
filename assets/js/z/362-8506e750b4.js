/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(362, function () {
"use strict";
return [
function (name, mpt, nrm) {
var k = name + ":" + mpt + (nrm ? ":n" : "");
if (BDL_TEX[k])
return BDL_TEX[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name;
var url = own ? "assets/textures/bundles/" + nm + (nrm ? "_n" : (bdlLite() ? "" : "-1k")) + ".jpg" : "assets/textures/photo/" + nm + (bdlLite() ? "" : "-1k") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(bdlLite() ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (!nrm && THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (BDL_TEX[k] = t);
},
function (col, tex, mpt, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (BDL_MAT[k])
return BDL_MAT[k];
var m, map = tex ? bdlTex(tex, mpt || 2) : null, own = tex && tex.slice(0, 2) === "b:";
if (bdlLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 14 : 6), specular: o.spec || (own ? 0x2A2620 : 0x141210) });
if (own) {
m.normalMap = bdlTex(tex, mpt || 2, true);
var nn = o.n === undefined ? 1 : o.n;
m.normalScale = new THREE.Vector2(nn, nn);
}
}
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
m.userData.noPhoto = 1;
m.userData.ldShared = 1;
return (BDL_MAT[k] = m);
},
function (g) {
var p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
if (!uv || !n)
return g;
for (var i = 0; i < uv.count; i++) {
var nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i)), X = p.getX(i), Y = p.getY(i), Z = p.getZ(i);
if (ny > 0.5)
uv.setXY(i, X, Z);
else if (nx > 0.5)
uv.setXY(i, Z, Y);
else
uv.setXY(i, X, Y);
}
uv.needsUpdate = true;
return g;
},
function (par, w, d, h, mat, x, y, z) {
var g = new THREE.BufferGeometry(), hw = w / 2, hd = d / 2, r = Math.min(hw, hd) * 0.9;
var v = [-hw, 0, -hd, hw, 0, -hd, hw, 0, hd, -hw, 0, hd, -(hw - r), h, 0, (hw - r), h, 0];
if (d > w) {
v[12] = 0;
v[14] = -(hd - r);
v[15] = 0;
v[17] = (hd - r);
}
var idx = d > w ? [0, 1, 4, 1, 2, 5, 1, 5, 4, 2, 3, 5, 3, 0, 4, 3, 4, 5] : [0, 1, 5, 0, 5, 4, 1, 2, 5, 2, 3, 4, 2, 4, 5, 3, 0, 4];
g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
g.setIndex(idx);
var uv = [];
for (var i = 0; i < 6; i++)
uv.push(v[i * 3] / 2, (v[i * 3 + 2] + v[i * 3 + 1]) / 2);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
par.add(m);
return m;
},
function (lines, w, h, bg, fg) {
var c = document.createElement("canvas");
c.width = 512;
c.height = Math.round(512 * h / w);
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, c.width, c.height);
x.strokeStyle = fg;
x.lineWidth = 6;
x.strokeRect(8, 8, c.width - 16, c.height - 16);
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
lines.forEach(function (t, i) {
var sz = i === 0 ? Math.round(c.height * 0.3) : Math.round(c.height * 0.2);
x.font = (i === 0 ? "600 " : "") + sz + "px Georgia,serif";
x.fillText(String(t).slice(0, 34), c.width / 2, c.height * (lines.length === 1 ? 0.5 : (i === 0 ? 0.38 : 0.72)));
});
var t = new THREE.CanvasTexture(c);
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t }));
m.userData.bdlOwnTex = t;
return m;
},
function (L, lx, lz) {
for (var i = 0; i < L.parts.length; i++) {
var p = L.parts[i], r = Math.hypot(lx, lz);
if (p.ann && r > p.ann[0] && r < p.ann[1])
return true;
if (p.box && lx > p.box[0] && lx < p.box[1] && lz > p.box[2] && lz < p.box[3])
return true;
if (p.circ && Math.hypot(lx - p.circ[0], lz - p.circ[1]) < p.circ[2])
return true;
if (p.sec && r > p.sec[0] && r < p.sec[1] && Math.abs(Math.atan2(lx, lz)) < p.sec[2])
return true;
}
return false;
},
function (par, r0, r1, mat, y, half, seg) {
var g = half ? new THREE.RingGeometry(r0, r1, seg || (bdlLite() ? 24 : 56), 1, -half - Math.PI / 2, half * 2) : new THREE.RingGeometry(r0, r1, seg || (bdlLite() ? 32 : 72), 1);
var p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, p.getX(i), p.getY(i));
uv.needsUpdate = true;
var m = new THREE.Mesh(g, mat);
m.rotation.x = -Math.PI / 2;
m.position.y = y;
par.add(m);
return m;
},
function (par, r, y, half, mat, step) {
var arc = half ? half * 2 : Math.PI * 2, w = new THREE.Group();
w.rotation.y = half ? half - Math.PI / 2 : 0;
par.add(w);
var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.055, 5, bdlLite() ? 24 : 64, arc), mat);
t.rotation.x = Math.PI / 2;
t.position.y = y + 1.08;
w.add(t);
var t2 = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 4, bdlLite() ? 24 : 64, arc), mat);
t2.rotation.x = Math.PI / 2;
t2.position.y = y + 0.55;
if (!bdlLite())
w.add(t2);
var n = Math.max(3, Math.round(arc * r / (step || 1.4)));
for (var i = 0; i <= n; i++) {
if (!half && i === n)
break;
var th = (half ? -half : 0) + i / n * arc;
bdlCyl(par, 0.045, 0.05, 1.1, mat, Math.sin(th) * r, y + 0.55, Math.cos(th) * r, 5);
}
},
function (par, x0, z0, x1, z1, y, mat) {
var L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / 1.5));
var top = bdlCyl(par, 0.05, 0.05, L, mat, (x0 + x1) / 2, y + 1.08, (z0 + z1) / 2, 5);
top.rotation.x = Math.PI / 2;
top.rotation.order = "YXZ";
top.rotation.y = a;
for (var i = 0; i <= n; i++) {
var t = i / n;
bdlCyl(par, 0.045, 0.05, 1.1, mat, x0 + (x1 - x0) * t, y + 0.55, z0 + (z1 - z0) * t, 5);
}
},
function () {
return bdlCanvasTex("udbanner", function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2C1E44");
g.addColorStop(1, "#120C1C");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#B8A8E8";
x.lineWidth = 6;
x.strokeRect(14, 14, W - 28, H - 28);
x.lineWidth = 2;
x.strokeRect(26, 26, W - 52, H - 52);
var cx = W / 2, cy = H * 0.32;
x.strokeStyle = "#D8D0FF";
x.lineWidth = 7;
x.beginPath();
for (var p = 0; p <= 10; p++) {
var A = p / 10 * 6.283 - 1.571, rr = p % 2 ? W * 0.13 : W * 0.33;
x[p ? "lineTo" : "moveTo"](cx + Math.cos(A) * rr, cy + Math.sin(A) * rr);
}
x.stroke();
x.strokeStyle = "rgba(200,190,240,.45)";
x.lineWidth = 2;
for (var a = 0; a < 8; a++) {
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a / 8 * 6.283) * W * 0.45, cy + Math.sin(a / 8 * 6.283) * W * 0.45);
x.stroke();
}
for (var r = W * 0.12; r < W * 0.46; r += W * 0.07) {
x.beginPath();
for (var b = 0; b <= 8; b++) {
var A2 = b / 8 * 6.283;
x[b ? "lineTo" : "moveTo"](cx + Math.cos(A2) * r, cy + Math.sin(A2) * r);
}
x.stroke();
}
x.fillStyle = "#C8B8F0";
x.font = "italic 600 34px Georgia,serif";
x.textAlign = "center";
x.fillText("Light from stone", W / 2, H * 0.7);
x.fillStyle = "#8A7AB8";
x.beginPath();
x.moveTo(30, H - 30);
x.lineTo(W / 2, H - 110);
x.lineTo(W - 30, H - 30);
x.fill();
}, 256, 768);
},
function () {
var lite = bdlLite(), g = new THREE.Group();
var glowE = { e: 0x2A2240, ei: 0.55 }, stone = bdlS("cave", 0xB8AED0, 5, glowE), dark = bdlS("cave", 0x7E7494, 5, glowE), tile = bdlS("darktile", 0xD0C8E0, 2.4, { e: 0x241E34, ei: 0.5 }), strata = bdlS("strata", 0x9A90A8, 4, glowE), silver = bdlMetal(0xD8DEF0), win = bdlGlow(0xB89AF8, 0.92), warm = bdlGlow(0xFFD0A0, 0.9), ring = bdlGlow(0xA888F0, 0.72), cap = bdlM(0x7A5AE0, null, 0, { e: 0x6A48D0, ei: 0.7 }), cap2 = bdlM(0x3AC8B8, null, 0, { e: 0x2AB0A0, ei: 0.7 }), stem = bdlS("marble", 0xD8D0E8, 1), silk = new THREE.LineBasicMaterial({ color: 0xD8D0F0, transparent: true, opacity: 0.55 });
var body = bdlLathe(g, BDL_UD_PROF, stone, 0, 0, 0, lite ? 20 : 44);
var bp = body.geometry.attributes.position, buv = body.geometry.attributes.uv;
for (var i = 0; i < buv.count; i++)
buv.setXY(i, buv.getX(i) * 70, bp.getY(i));
buv.needsUpdate = true;
var nr = lite ? 6 : 12;
for (var k = 0; k < nr; k++) {
var th = (k + 0.5) / nr * Math.PI * 2, pts = [];
for (var y = -31; y <= 42; y += lite ? 6 : 3) {
var r = bdlUdR(y) + 0.3;
pts.push(new THREE.Vector3(Math.sin(th) * r, y, Math.cos(th) * r));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), lite ? 14 : 40, 0.55, lite ? 4 : 6, false), dark));
}
[3.8, 14.5, 25.5, -6.5, -17].forEach(function (y, i) {
var r = bdlUdR(y) + 0.45, t = bdlTor(g, r, 0.2, ring, 0, y, 0);
t.rotation.x = Math.PI / 2;
if (i > 0) {
var led = bdlCyl(g, r + 0.9, r + 0.2, 0.5, dark, 0, y - 0.45, 0, lite ? 20 : 48);
}
});
[[6.2, 9], [10.4, 10], [17.5, 11], [23.8, 11], [31, 12], [-3.5, 9], [-9.5, 8], [-15, 6], [-21, 4]].forEach(function (row, ri) {
var r = bdlUdR(row[0]) + 0.08, n = lite ? Math.ceil(row[1] * 0.6) : row[1];
for (var j = 0; j < n; j++) {
var th = (j + (ri % 2 ? 0.5 : 0)) / n * Math.PI * 2;
if (row[0] === 6.2 && Math.abs(Math.atan2(Math.sin(th), Math.cos(th))) < 0.5)
continue;
if ((row[0] === 10.4 || row[0] === 23.8) && Math.abs(Math.atan2(Math.sin(th), Math.cos(th))) < 0.9)
continue;
var w = bdlArch(g, 0.95, 1.6, (j + ri) % 3 ? win : warm, Math.sin(th) * r, row[0] - 0.9, Math.cos(th) * r, th);
}
});
bdlRingTop(g, 10.9, 16.95, tile, 0.02);
var lip = bdlLathe(g, [[16.95, 0], [17.2, -0.35], [16.6, -1.0], [14, -1.6], [11.2, -2.2], [10.9, -2.25]], strata, 0, 0, 0, lite ? 24 : 64);
for (var c = 0; c < (lite ? 8 : 16); c++) {
var ca = (c + 0.5) / (lite ? 8 : 16) * Math.PI * 2, cr = new THREE.Mesh(new THREE.ConeGeometry(1.0, 5.5, lite ? 5 : 7), dark);
cr.rotation.z = Math.PI;
cr.position.set(Math.sin(ca) * 14.6, -4, Math.cos(ca) * 14.6);
cr.rotation.x = Math.cos(ca) * 0.45;
cr.rotation.z = Math.PI - Math.sin(ca) * 0.45;
g.add(cr);
}
(function () {
var r = 16.65, m = silver;
[[-Math.PI / 2 + 0.1, Math.PI / 2 - 0.1], [Math.PI / 2 + 0.1, 3 * Math.PI / 2 - 0.08]].forEach(function (arc) {
var mid = (arc[0] + arc[1]) / 2, half = (arc[1] - arc[0]) / 2, w = new THREE.Group();
w.rotation.y = mid;
g.add(w);
bdlRail(w, r, 0, half, m, 1.3);
});
})();
var dz = bdlUdR(1.5) + 0.06;
bdlArch(g, 2.7, 3.0, bdlS("planks", 0x5A4870, 1), 0, 0.02, dz);
var fr = bdlTor(g, 1.45, 0.16, silver, 0, 3.05, dz + 0.08, Math.PI);
bdlBox(g, 0.3, 3.1, 0.4, silver, -1.45, 1.55, dz + 0.05);
bdlBox(g, 0.3, 3.1, 0.4, silver, 1.45, 1.55, dz + 0.05);
[-2.3, 2.3].forEach(function (x) { bdlCyl(g, 0.05, 0.05, 0.9, silver, x, 3.4, dz + 0.35, 5); bdlSph(g, 0.26, bdlGlow(0xC8B0FF, 0.92), x, 2.85, dz + 0.35); bdlCyl(g, 0.32, 0.22, 0.12, silver, x, 3.12, dz + 0.35, 8); });
bdlBox(g, 4.2, 0.12, 1.4, bdlS("marble", 0x8A82A0, 1.5), 0, 0.06, dz + 0.7);
var sa = 0.45, sr = bdlUdR(1.2) + 0.05;
bdlArch(g, 1.3, 2.1, bdlS("planks", 0x4A3A5E, 1), Math.sin(sa) * sr, 0.02, Math.cos(sa) * sr, sa);
bdlSph(g, 0.16, warm, Math.sin(sa) * (sr + 0.3), 2.75, Math.cos(sa) * (sr + 0.3));
var bm = bdlStarBanner();
bm.side = THREE.DoubleSide;
[0.55, -0.55, Math.PI - 0.5, Math.PI + 0.5, 2.1, -2.1].forEach(function (a, i) { if (lite && i > 3)
return; var b = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 6.6), bm); b.position.set(Math.sin(a) * 17.25, -3.6, Math.cos(a) * 17.25); b.rotation.y = a; g.add(b); });
[0.9, -0.9, 2.4, -2.4].forEach(function (a, i) {
var px = Math.sin(a) * 14.6, pz = Math.cos(a) * 14.6, pl = bdlCyl(g, 1.25, 1.05, 0.7, strata, px, 0.35, pz, lite ? 8 : 16);
for (var q = 0; q < (lite ? 3 : 6); q++) {
var qa = q / (lite ? 3 : 6) * 6.283, h = 0.4 + (q % 3) * 0.3;
bdlCyl(g, 0.06, 0.09, h, stem, px + Math.cos(qa) * 0.6, 0.7 + h / 2, pz + Math.sin(qa) * 0.6, 5);
bdlSph(g, 0.24 + (q % 3) * 0.09, (q + i) % 2 ? cap : cap2, px + Math.cos(qa) * 0.6, 0.7 + h, pz + Math.sin(qa) * 0.6, 1, 0.45, 1, lite ? 8 : 12);
}
});
for (var l = 0; l < (lite ? 6 : 12); l++) {
var la = (l + 0.25) / (lite ? 6 : 12) * Math.PI * 2, lx = Math.sin(la) * 15.8, lz = Math.cos(la) * 15.8, len = 2 + (l % 3) * 1.4;
bdlCyl(g, 0.02, 0.02, len, silver, lx, -2.2 - len / 2, lz, 3);
bdlCyl(g, 0.2, 0.16, 0.42, silver, lx, -2.4 - len, lz, 6);
bdlSph(g, 0.15, l % 2 ? warm : win, lx, -2.42 - len, lz, 1, 1.3, 1, 8);
}
var arm = bdlBox(g, 19, 0.6, 3.0, tile, 25.3, -0.28, 0);
bdlBox(g, 19, 1.4, 3.4, strata, 25.3, -1.25, 0);
var keel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.6, 19, lite ? 5 : 8, 1), dark);
keel.rotation.z = Math.PI / 2;
keel.position.set(25.3, -2.6, 0);
keel.scale.z = 0.7;
g.add(keel);
bdlRailLine(g, 16.2, -1.45, 34.4, -1.45, 0, silver);
bdlRailLine(g, 16.2, 1.45, 34.4, 1.45, 0, silver);
bdlRingTop(g, 0, 3.95, tile, 0.02).position.x = 37.4;
var pp = bdlLathe(g, [[3.95, 0], [4.2, -0.4], [3.2, -1.6], [1.2, -4.5], [0.2, -6.5], [0, -6.6]], strata, 37.4, 0, 0, lite ? 14 : 32);
(function () { var w = new THREE.Group(); w.position.x = 37.4; g.add(w); w.rotation.y = Math.PI; bdlRail(w, 3.85, 0, Math.PI * 0.62, silver, 1.2); })();
var bar = bdlCyl(g, 0.32, 0.32, 5.2, bdlS("planks", 0x3A2E40, 1), 37.4, 2.5, 0, lite ? 8 : 14);
bar.rotation.x = Math.PI / 2;
[-2.4, 2.4].forEach(function (z) { var t = bdlTor(g, 1.4, 0.36, dark, 37.4, 1.6, z, Math.PI * 1.25); t.rotation.z = -Math.PI * 0.12; bdlTor(g, 0.36, 0.06, silver, 37.4, 2.5, z * 0.8).rotation.y = Math.PI / 2; });
[[39.6, 1.8], [39.6, -1.8]].forEach(function (b) { bdlCyl(g, 0.3, 0.42, 0.9, silver, b[0], 0.45, b[1], 8); bdlSph(g, 0.36, bdlGlow(0xC8A0FF, 0.9), b[0], 1.05, b[1], 1, 0.8, 1, 10); });
bdlBox(g, 2.6, 0.35, 2.3, tile, -17.3, -0.15, 0);
var crane = bdlCyl(g, 0.12, 0.12, 4.2, silver, -18.4, 2.1, 0, 6);
var jib = bdlCyl(g, 0.1, 0.1, 2.8, silver, -19.6, 4.1, 0, 6);
jib.rotation.z = Math.PI / 2;
bdlTor(g, 0.4, 0.08, silver, -20.8, 3.8, 0).rotation.y = Math.PI / 2;
var bk = bdlCyl(g, 1.0, 0.8, 1.0, bdlS("planks", 0x6A5038, 0.6), -20.8, -2.6, 0, lite ? 10 : 16);
bdlTor(g, 1.0, 0.07, silver, -20.8, -2.1, 0).rotation.x = Math.PI / 2;
g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-20.8, 3.8, 0), new THREE.Vector3(-20.8, -2.1, 0)]), silk));
[[10, 12.15, 16.9, 0.95], [21, 13.35, 17.4, 0.62], [-12, 9.0, 13.3, 0.8]].forEach(function (B) {
bdlRingTop(g, B[1] - 0.4, B[2], tile, B[0] + 0.02, B[3]);
var lp = new THREE.Mesh(new THREE.CylinderGeometry(B[2] + 0.1, B[1] + 0.4, 1.2, lite ? 16 : 40, 1, false, -B[3], B[3] * 2), strata);
lp.position.y = B[0] - 0.6;
lp.rotation.y = 0;
g.add(lp);
bdlRail(g, B[2] - 0.12, B[0], B[3], silver, 1.3);
var sa2 = B[3] * 0.82, sr2 = bdlUdR(B[0] + 1) + 0.05;
bdlArch(g, 1.2, 2.0, bdlS("planks", 0x4A3A5E, 1), Math.sin(sa2) * sr2, B[0] + 0.02, Math.cos(sa2) * sr2, sa2);
bdlSph(g, 0.15, warm, Math.sin(sa2) * (sr2 + 0.3), B[0] + 2.6, Math.cos(sa2) * (sr2 + 0.3));
});
var sp = lite ? [[0.3, 30, 26], [2.0, 27, 20], [3.6, 31, 24], [5.0, 26, 18]] : [[0.3, 30, 26], [1.2, 34, 16], [2.0, 27, 20], [2.8, 36, 14], [3.6, 31, 24], [4.4, 35, 12], [5.0, 26, 18], [5.8, 33, 15]];
sp.forEach(function (S, i) {
var a = S[0], x = Math.sin(a) * S[1], z = Math.cos(a) * S[1];
if (Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) < 0.35)
z += 12;
var L = S[2], c = bdlLathe(g, [[0, 44 - L * 1.6], [1.2, 44 - L * 1.4], [2.6, 44 - L], [3.4, 44 - L * 0.5], [4.2, 44], [4.6, 46]], i % 2 ? dark : stone, x, 0, z, lite ? 8 : 14);
for (var w2 = 0; w2 < (lite ? 2 : 4); w2++) {
var wy = 44 - L * 0.25 - w2 * L * 0.18, rr = 2.8 + 0.6 * (1 - w2 / 4);
bdlArch(g, 0.6, 0.9, w2 % 2 ? warm : win, x + Math.sin(a + w2) * rr, wy, z + Math.cos(a + w2) * rr, a + w2);
}
bdlSph(g, 0.4, bdlGlow(i % 2 ? 0xC8A0FF : 0x8AE8E0, 0.85), x, 44 - L * 1.6 - 0.2, z, 1, 1.4, 1, 8);
if (!lite || i % 2 === 0)
g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.sin(a) * (bdlUdR(30) + 0.4), 30, Math.cos(a) * (bdlUdR(30) + 0.4)), new THREE.Vector3(x, 44 - L * 0.7, z)]), silk));
});
bdlLathe(g, [[17, 40], [24, 44], [34, 47.5], [44, 49], [46, 52]], dark, 0, 0, 0, lite ? 16 : 40);
var cr = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), bdlGlow(0xD0C0FF, 0.85));
cr.position.set(0, -36.4, 0);
cr.scale.y = 2.0;
g.add(cr);
return { g: g, solids: [], door: { x: 0, z: dz + 1.4 }, plate: { x: 0, y: 3.95, z: dz + 0.3, w: 2.6, h: 0.6, bg: "#1A1424", fg: "#D0C8F0" },
hang: { levels: BDL_UD_LEVELS, R: bdlUdR, stair: { a: 0.45 }, lift: { x: -20.8, z: 0 }, perch: { x: 37.4, z: 0 } } };
},
function (par, x, y, z, ry, w, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
par.add(g);
bdlBox(g, w, h, 0.06, o.glow || bdlGlow(0xFFD8A0, 0.82), 0, 0, 0);
var fr = o.frame || bdlS("stucco", 0xF4F0E8, 2);
bdlBox(g, w + 0.24, 0.14, 0.16, fr, 0, h / 2 + 0.07, 0.05);
bdlBox(g, w + 0.34, 0.16, 0.3, fr, 0, -h / 2 - 0.08, 0.1);
bdlBox(g, 0.12, h, 0.14, fr, -w / 2 - 0.06, 0, 0.05);
bdlBox(g, 0.12, h, 0.14, fr, w / 2 + 0.06, 0, 0.05);
bdlBox(g, w, 0.06, 0.08, fr, 0, h * 0.15, 0.05);
bdlBox(g, 0.06, h, 0.08, fr, 0, 0, 0.05);
if (o.shut) {
[-1, 1].forEach(function (sd) { var s = bdlBox(g, w * 0.52, h * 1.02, 0.06, o.shut, sd * (w * 0.78), 0, 0.1); });
}
return g;
},
function () {
var lite = bdlLite(), g = new THREE.Group();
var lime = bdlS("limestone", 0xDAD4C8, 3), ashlar = bdlS("ashlar", 0xD4CCBC, 3), slate = bdlS("slate", 0xA8AEB8, 2.2, { ds: true }), white = bdlS("stucco", 0xCFC9BF, 3), red = bdlS("stucco", 0xC0402E, 3), deck = bdlS("deck", 0xD0C0A6, 1.6), rock = bdlS("strata", 0xB8B0A0, 3), dark = bdlS("cave", 0x8A8478, 4), moss = bdlS("moss", 0xD8E0C0, 3), navy = bdlS("planks", 0x6A80A8, 1), brass = bdlMetal(0xE8C068), iron = bdlMetal(0x4A4E56, "iron"), glass = bdlM(0xCFE6F2, null, 0, { op: 0.3, shine: 100, spec: 0xFFFFFF }), win = bdlGlow(0xFFD8A0, 0.82), lamp = bdlGlow(0xFFF0C8, 0.95);
bdlBox(g, 32, 1.2, 27, ashlar, 0, -0.6, -1.5);
bdlBox(g, 32.6, 10, 27.6, dark, 0, -6.2, -1.5);
bdlBox(g, 32.4, 0.3, 0.6, ashlar, 0, 0.15, 11.9);
for (var r = 0; r < (lite ? 10 : 24); r++) {
var R = bdlRand(r * 31 + 5), a = r / (lite ? 10 : 24) * Math.PI * 2, rx = Math.sin(a) * 19 + (R() - 0.5) * 5, rz = Math.cos(a) * 16 - 1.5 + (R() - 0.5) * 4;
bdlRock(g, r % 3 ? rock : dark, rx, -1.6 - R() * 2.5, rz, 2.2 + R() * 2.6, r * 13 + 1);
}
for (var r2 = 0; r2 < (lite ? 5 : 12); r2++) {
var Q = bdlRand(r2 * 17 + 3);
bdlRock(g, rock, -24 + Q() * 48, -3.5 - Q() * 2, 15 + Q() * 12, 1.2 + Q() * 2.4, r2 * 7 + 2);
}
bdlBox(g, 30, 0.08, 10, moss, 0, 0.04, 6.4);
for (var f = 0; f < 5; f++)
bdlBox(g, 1.9, 0.1, 1.2, ashlar, -4.5, 0.1, 7.3 + f * 1.3);
[[-12, 8, 0xC83A5A], [-12, 4, 0xE8C83A], [3.5, 9.5, 0x8A5AC8], [11, 9.5, 0xE86A3A]].forEach(function (b, i) {
bdlBox(g, 4, 0.4, 2, ashlar, b[0], 0.2, b[1]);
for (var k = 0; k < (lite ? 3 : 7); k++) {
var R = bdlRand(i * 11 + k);
bdlSph(g, 0.35 + R() * 0.2, bdlS("moss", 0x7AA060, 1), b[0] - 1.6 + k * (3.2 / (lite ? 3 : 7)), 0.65, b[1] + (R() - 0.5) * 0.8, 1, 0.8, 1, 6);
bdlSph(g, 0.12, bdlM(b[2]), b[0] - 1.5 + k * (3.2 / (lite ? 3 : 7)), 0.95, b[1] + (R() - 0.5) * 0.8, 1, 1, 1, 5);
}
});
[[-15.8, -1.5, 0.5, 26], [15.8, -1.5, 0.5, 26], [-9.5, 11.6, 12, 0.5], [9.5, 11.6, 12, 0.5]].forEach(function (w) { bdlBox(g, w[2], 0.9, w[3], ashlar, w[0], 0.45, w[1]); bdlBox(g, w[2] + 0.15, 0.12, w[3] + 0.15, lime, w[0], 0.96, w[1]); });
var hx = -4.5, hz = -3.5;
bdlBox(g, 15, 7.6, 11, lime, hx, 3.8, hz);
bdlBox(g, 15.3, 0.8, 11.3, ashlar, hx, 0.4, hz);
bdlBox(g, 15.4, 0.3, 11.4, ashlar, hx, 3.75, hz);
bdlBox(g, 15.8, 0.45, 11.8, ashlar, hx, 7.65, hz);
[-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) { bdlBox(g, 0.5, 7.6, 0.5, ashlar, hx + sx * 7.4, 3.8, hz + sz * 5.4); }); });
bdlHip(g, 16.6, 12.6, 4.6, slate, hx, 7.85, hz);
[-8.4, -0.6].forEach(function (x) { bdlBox(g, 1.3, 3.6, 1.3, ashlar, x, 11.2, hz - 2.6); bdlBox(g, 1.6, 0.3, 1.6, lime, x, 13.1, hz - 2.6); bdlCyl(g, 0.22, 0.22, 0.6, red, x - 0.3, 13.5, hz - 2.6, 8); bdlCyl(g, 0.22, 0.22, 0.6, red, x + 0.3, 13.5, hz - 2.6, 8); });
[-8.5, -4.5, -0.5].forEach(function (x) { var dz = hz + 3.6; bdlBox(g, 1.8, 1.9, 1.6, lime, x, 9.25, dz); bdlHip(g, 2.2, 2.0, 1.0, slate, x, 10.2, dz); bdlWindow(g, x, 9.2, dz + 0.82, 0, 0.9, 1.1, { glow: win }); });
[-10, -7, -2, 1].forEach(function (x) { [2.2, 5.7].forEach(function (y) { bdlWindow(g, x, y, hz + 5.53, 0, 1.0, 1.6, { glow: win, shut: navy }); }); });
[-7.5, -1.5].forEach(function (z) { [2.2, 5.7].forEach(function (y) { bdlWindow(g, hx - 7.53, y, hz + z + 3.5, -Math.PI / 2, 1.0, 1.6, { glow: win, shut: navy }); }); });
var dz = hz + 5.52;
bdlBox(g, 1.9, 2.8, 0.14, bdlS("planks", 0x2A3A5A, 1), hx, 1.4 + 0.4, dz);
bdlBox(g, 2.4, 0.2, 0.3, ashlar, hx, 3.25, dz + 0.06);
bdlBox(g, 3.6, 0.2, 2.2, slate, hx, 3.55, dz + 1.1).rotation.x = -0.18;
[-1.6, 1.6].forEach(function (x) { bdlCyl(g, 0.09, 0.11, 3.0, white, hx + x, 1.9, dz + 2.0, 8); });
[-1.25, 1.25].forEach(function (x) { bdlCyl(g, 0.14, 0.18, 0.34, brass, hx + x, 2.7, dz + 0.25, 6); bdlSph(g, 0.14, lamp, hx + x, 2.5, dz + 0.25, 1, 1.4, 1, 8); });
bdlBox(g, 2.6, 0.4, 1.4, ashlar, hx, 0.6, dz + 0.75);
bdlBox(g, 2.6, 0.2, 0.8, ashlar, hx, 0.1, dz + 1.6);
var tx = 7, tz = -4, th = 26;
bdlCyl(g, 4.6, 5.0, 3.2, ashlar, tx, 1.6, tz, lite ? 14 : 32);
bdlLathe(g, [[4.1, 0], [3.95, 6], [3.7, 13], [3.45, 20], [3.25, th]], white, tx, 3.2, tz, lite ? 14 : 36);
bdlCyl(g, 3.42, 3.5, 2.2, red, tx, 3.2 + th - 5, tz, lite ? 14 : 36, true);
for (var w = 0; w < (lite ? 4 : 7); w++) {
var wa = w * 0.9 + 0.6, wy = 6 + w * 3.1, wr = 4.0 - w * 0.11;
bdlWindow(g, tx + Math.sin(wa) * wr, wy, tz + Math.cos(wa) * wr, wa, 0.6, 1.1, { glow: win });
}
var gy = 3.2 + th;
bdlCyl(g, 4.6, 3.6, 0.6, ashlar, tx, gy, tz, lite ? 14 : 32);
for (var c = 0; c < (lite ? 6 : 12); c++) {
var ca = c / (lite ? 6 : 12) * Math.PI * 2;
var br = bdlBox(g, 0.3, 1.0, 1.1, ashlar, tx + Math.sin(ca) * 3.7, gy - 0.7, tz + Math.cos(ca) * 3.7);
br.rotation.y = ca;
}
bdlTor(g, 4.45, 0.06, iron, tx, gy + 1.25, tz).rotation.x = Math.PI / 2;
bdlTor(g, 4.45, 0.04, iron, tx, gy + 0.75, tz).rotation.x = Math.PI / 2;
for (var p = 0; p < (lite ? 12 : 28); p++) {
var pa = p / (lite ? 12 : 28) * Math.PI * 2;
bdlCyl(g, 0.035, 0.035, 1.0, iron, tx + Math.sin(pa) * 4.45, gy + 0.8, tz + Math.cos(pa) * 4.45, 4);
}
bdlCyl(g, 2.5, 2.5, 0.9, red, tx, gy + 0.75, tz, lite ? 12 : 24);
bdlCyl(g, 2.4, 2.4, 3.0, glass, tx, gy + 2.7, tz, lite ? 10 : 24, true);
for (var q = 0; q < (lite ? 6 : 12); q++) {
var qa = q / (lite ? 6 : 12) * Math.PI * 2;
bdlCyl(g, 0.05, 0.05, 3.0, brass, tx + Math.sin(qa) * 2.42, gy + 2.7, tz + Math.cos(qa) * 2.42, 4);
}
[gy + 1.7, gy + 2.7, gy + 3.7].forEach(function (y) { bdlTor(g, 2.42, 0.04, brass, tx, y, tz).rotation.x = Math.PI / 2; });
for (var L = 0; L < (lite ? 3 : 7); L++) {
var ly = gy + 1.6 + L * 0.36, lr = 0.95 - Math.abs(L - 3) * 0.12;
bdlTor(g, lr, 0.09, bdlGlow(0xFFE8B0, 0.6 + L % 2 * 0.2), tx, ly, tz).rotation.x = Math.PI / 2;
}
bdlSph(g, 0.55, lamp, tx, gy + 2.65, tz, 1, 1.5, 1, lite ? 10 : 16);
bdlSph(g, 2.6, bdlMetal(0x5A6A5A, "iron"), tx, gy + 4.2, tz, 1, 0.55, 1, lite ? 12 : 24);
bdlSph(g, 0.35, brass, tx, gy + 5.8, tz, 1, 1, 1, 10);
bdlCyl(g, 0.04, 0.04, 2.2, iron, tx, gy + 7, tz, 4);
var beam = new THREE.Group();
beam.position.set(tx, gy + 2.65, tz);
g.add(beam);
var bm = new THREE.MeshBasicMaterial({ color: 0xFFF0C8, transparent: true, opacity: lite ? 0.04 : 0.05, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
bm.userData.ldShared = 1;
[0, Math.PI].forEach(function (a) { var cn = new THREE.Mesh(new THREE.ConeGeometry(4.5, 60, lite ? 8 : 16, 1, true), bm); cn.rotation.z = Math.PI / 2; cn.position.x = 30; var arm = new THREE.Group(); arm.rotation.y = a; arm.add(cn); beam.add(arm); });
beam.children[0].children[0].onBeforeRender = function () { beam.rotation.y = (performance.now() / 1000 * 0.32) % (Math.PI * 2); };
var jz0 = 12, jz1 = 36;
bdlBox(g, 3.2, 0.24, jz1 - jz0, deck, 1.5, -0.25, (jz0 + jz1) / 2);
for (var j = jz0 + 1; j <= jz1; j += 3) {
[-0.1, 3.1].forEach(function (x) { bdlCyl(g, 0.16, 0.18, 7, bdlS("planks", 0x6A5A48, 1), x, -3.6, j, 6); });
}
[-0.1, 3.1].forEach(function (x) { bdlBox(g, 0.1, 0.1, jz1 - jz0, bdlS("planks", 0x8A7258, 1), x, 0.75, (jz0 + jz1) / 2); for (var k = jz0 + 1; k < jz1; k += 2.4)
bdlCyl(g, 0.05, 0.05, 1.0, bdlS("planks", 0x8A7258, 1), x, 0.25, k, 4); });
[jz0 + 6, jz1 - 1].forEach(function (z) { bdlCyl(g, 0.06, 0.08, 3.2, iron, 3.3, 1.5, z, 6); bdlSph(g, 0.22, lamp, 3.3, 3.2, z, 1, 1.3, 1, 8); });
var boat = new THREE.Group();
boat.position.set(5.6, -1.6, jz1 - 6);
boat.rotation.y = 0.08;
g.add(boat);
var hull = bdlSph(boat, 1, bdlS("planks", 0xE8E0D0, 0.8), 0, 0, 0, 1.1, 0.5, 3.2);
bdlSph(boat, 1, bdlS("planks", 0x2A4A6A, 0.8), 0, 0.05, 0, 1.06, 0.36, 3.1);
bdlBox(boat, 1.9, 0.08, 0.4, bdlS("planks", 0x8A6A48, 1), 0, 0.38, 0.6);
bdlBox(boat, 1.9, 0.08, 0.4, bdlS("planks", 0x8A6A48, 1), 0, 0.38, -1.2);
var oar = bdlCyl(boat, 0.04, 0.04, 3.2, bdlS("planks", 0xA88A62, 1), 0.7, 0.5, 0, 4);
oar.rotation.x = Math.PI / 2;
oar.rotation.z = 0.2;
[jz1 - 3, jz1 - 9].forEach(function (z) { bdlCyl(g, 0.22, 0.26, 0.6, iron, 3.0, 0.1, z, 8); });
var bx = -12, bz = 13;
bdlBox(g, 7, 4.2, 8, bdlS("planks", 0x7A6A5A, 1.2), bx, 1.6, bz);
bdlHip(g, 7.8, 8.8, 2.6, slate, bx, 3.7, bz);
bdlBox(g, 4, 3, 0.1, bdlS("planks", 0x2A3A5A, 1), bx, 1.4, bz + 4.05);
bdlWindow(g, bx - 3.53, 2.2, bz, -Math.PI / 2, 0.8, 0.9, { glow: win });
bdlCyl(g, 0.08, 0.1, 11, white, 13, 5.5, 8, 6);
bdlSph(g, 0.18, brass, 13, 11.1, 8, 1, 1, 1, 8);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), bdlCanvasTex("vrnflag", function (x, W, H) { x.fillStyle = "#1E2A4A"; x.fillRect(0, 0, W, H); x.fillStyle = "#C8A04A"; x.font = "bold 150px Georgia"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("N", W / 2, H / 2 + 8); x.strokeStyle = "#C8A04A"; x.lineWidth = 10; x.strokeRect(14, 14, W - 28, H - 28); }, 256, 160));
fl.material.side = THREE.DoubleSide;
fl.position.set(14.25, 10, 8);
g.add(fl);
var an = new THREE.Group();
an.position.set(7, 0, 8.5);
an.rotation.y = -0.4;
g.add(an);
bdlCyl(an, 0.12, 0.12, 2.6, iron, 0, 1.3, 0, 8);
var arc = bdlTor(an, 0.95, 0.11, iron, 0, 0.5, 0, Math.PI);
arc.rotation.z = Math.PI;
bdlTor(an, 0.28, 0.08, iron, 0, 2.7, 0);
bdlBox(an, 1.6, 0.14, 0.14, iron, 0, 2.2, 0);
[[-1, 9.5], [9.5, 5.5]].forEach(function (b, i) { var bg = new THREE.Group(); bg.position.set(b[0], 0, b[1]); bg.rotation.y = i ? -Math.PI / 2 : 0; g.add(bg); bdlBox(bg, 2.2, 0.1, 0.55, bdlS("planks", 0x8A6A48, 1), 0, 0.5, 0); bdlBox(bg, 2.2, 0.5, 0.08, bdlS("planks", 0x8A6A48, 1), 0, 0.85, -0.26); [-0.95, 0.95].forEach(function (x) { bdlBox(bg, 0.08, 0.5, 0.5, iron, x, 0.25, 0); }); });
[[-15.8, -12], [-15.8, 4], [15.8, -12], [15.8, 4], [-4, 11.6], [6, 11.6]].forEach(function (l) { bdlCyl(g, 0.06, 0.09, 2.4, iron, l[0], 2.1, l[1], 6); bdlSph(g, 0.2, lamp, l[0], 3.4, l[1], 1, 1.3, 1, 8); bdlCyl(g, 0.24, 0.06, 0.3, iron, l[0], 3.7, l[1], 6); });
var walk = [{ x: hx, z: hz, hw: 7.7, hd: 5.7 }, { x: tx, z: tz, r: 4.9 }, { x: bx, z: bz, hw: 3.6, hd: 4.1 }];
[[-15.8, -1.5, 0.5, 26], [15.8, -1.5, 0.5, 26], [-9.5, 11.6, 12, 0.5], [9.5, 11.6, 12, 0.5]].forEach(function (w) { walk.push({ x: w[0], z: w[1], hw: w[2] / 2, hd: w[3] / 2, b: -0.5, h: 1.4 }); });
[-0.1, 3.1].forEach(function (x) { walk.push({ x: x, z: (jz0 + jz1) / 2 + 0.3, hw: 0.06, hd: (jz1 - jz0) / 2 - 0.3, b: -0.6, h: 1.6 }); });
walk.push({ x: 1.5, z: jz1 + 0.05, hw: 1.7, hd: 0.06, b: -0.6, h: 1.6 });
bdlBox(g, 3.3, 0.1, 0.1, bdlS("planks", 0x8A7258, 1), 1.5, 0.75, jz1 - 0.05);
[0.6, 2.4].forEach(function (x) { bdlCyl(g, 0.05, 0.05, 1.0, bdlS("planks", 0x8A7258, 1), x, 0.25, jz1 - 0.05, 4); });
return { g: g, solids: walk, door: { x: hx, z: dz + 1.8 }, plate: { x: hx, y: 3.45, z: dz + 0.24, w: 2.2, h: 0.46, bg: "#1E2A3A", fg: "#E8D49A" },
extra: function (H, W) { bdlVrnExtra(H, jz0, jz1); } };
},
function (H, jz0, jz1) {
if (typeof vrnFloor !== "function" || typeof VRN === "undefined")
return;
var at = H.at, add = function (lx, lz, hw, hd, y) { var p = bdlLocal(lx, lz, at), f = vrnFloor(p.x, p.z, hw, hd, at.y + y, { rot: at.rot, bdl: 1 }); H.undo = H.undo || []; H.undo.push(function () { var i = VRN.floors.indexOf(f); if (i >= 0)
VRN.floors.splice(i, 1); }); };
add(0, -1.5, 16, 13.5, 0);
add(1.5, (jz0 + jz1) / 2, 1.6, (jz1 - jz0) / 2, -0.13);
var end = bdlLocal(1.5, jz1 - 1.5, at);
H.spots.push({ x: end.x, z: end.z, y: at.y - 0.13, r: 2.6, name: "The end of the jetty", verb: "look out to sea", fn: function () {
bdlSay("🌊 <b>The end of the jetty.</b> The sea runs all the way to the south, over the Deep where the Nautilus sails; Stromboli smokes far out in the bay, and behind you the lamp turns slowly in its tower.");
} });
},
function (par, kind, x, y, z, s, ry) {
if (typeof davTreeKinds !== "function")
return null;
var K = davTreeKinds()[kind];
if (!K)
return null;
var t = new THREE.Group();
t.position.set(x, y, z);
t.scale.setScalar(s || 1);
t.rotation.y = ry || 0;
par.add(t);
K.forEach(function (p) { var m = new THREE.Mesh(p.g, p.m); m.userData.bdlKeepGeo = 1; t.add(m); });
return t;
},
function (par, x, z, seed) {
var R = bdlRand(seed * 29 + 11), t = new THREE.Group();
t.position.set(x, 0, z);
par.add(t);
var bark = bdlS("strata", 0x8A7E70, 1.2), leaf = bdlS("moss", 0xB8C8A0, 1.4);
var pts = [];
for (var i = 0; i <= 6; i++) {
var y = i * 0.55;
pts.push(new THREE.Vector3(Math.sin(i * 1.3 + seed) * 0.35, y, Math.cos(i * 1.1 + seed) * 0.3));
}
t.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), bdlLite() ? 6 : 12, 0.32, bdlLite() ? 5 : 8, false), bark));
for (var c = 0; c < (bdlLite() ? 4 : 9); c++) {
var a = c / 9 * Math.PI * 2 + R();
bdlSph(t, 0.9 + R() * 0.6, leaf, Math.sin(a) * (0.6 + R() * 1.3), 3.0 + R() * 1.4, Math.cos(a) * (0.6 + R() * 1.3), 1, 0.7, 1, bdlLite() ? 6 : 10);
}
return t;
},
function () {
var lite = bdlLite(), g = new THREE.Group();
var ochre = bdlS("stucco", 0xDCAA6A, 3), pale = bdlS("stucco", 0xE2D2B2, 3), stone = bdlS("ashlar", 0xE8DCC4, 2.6), roof = bdlS("terracotta", 0xF0C0A0, 1.8, { ds: true }), cotto = bdlS("cotto", 0xF0D0B8, 1.4), moss = bdlS("moss", 0xD8E0B8, 3), green = bdlS("planks", 0x6A9A6A, 1), wood = bdlS("planks", 0x9A7050, 1.2), iron = bdlMetal(0x6A6058, "iron"), win = bdlGlow(0xFFE0A8, 0.78), lamp = bdlGlow(0xFFE8B8, 0.92);
bdlBox(g, 32, 1.2, 30, stone, 0, -0.6, 0);
bdlBox(g, 32.6, 12, 30.6, stone, 0, -7.2, 0);
bdlBox(g, 32.6, 0.25, 0.7, pale, 0, 0.12, 15.2);
bdlBox(g, 30, 0.06, 10.4, moss, 0, 0.03, 9.6);
bdlBox(g, 3.6, 0.08, 10.4, cotto, 0, 0.05, 9.6);
bdlBox(g, 24, 0.08, 3.6, cotto, 0, 0.06, 5.8);
var Hh = 8.6;
bdlBox(g, 22, Hh - 4.3, 5, ochre, 0, 4.3 + (Hh - 4.3) / 2, 1.5);
bdlBox(g, 22, 4.3, 0.4, ochre, 0, 2.15, -0.8);
bdlBox(g, 22, Hh, 5, ochre, 0, Hh / 2, -11.5);
[-1, 1].forEach(function (sx) { bdlBox(g, 6, Hh, 8, ochre, sx * 8, Hh / 2, -5); });
[[-11, 4], [11, 4], [-11, -14], [11, -14]].forEach(function (c) { for (var q = 0; q < 7; q++)
bdlBox(g, q % 2 ? 0.9 : 1.3, 0.62, q % 2 ? 1.3 : 0.9, stone, c[0] - Math.sign(c[0]) * 0.35, 0.4 + q * 1.25, c[1] - Math.sign(c[1] + 5) * 0.35); });
bdlBox(g, 22.6, 0.4, 0.7, pale, 0, Hh + 0.1, 4.1);
bdlBox(g, 22.6, 0.4, 0.7, pale, 0, Hh + 0.1, -14.1);
bdlBox(g, 0.7, 0.4, 18.6, pale, -11.1, Hh + 0.1, -5);
bdlBox(g, 0.7, 0.4, 18.6, pale, 11.1, Hh + 0.1, -5);
bdlBox(g, 22.4, 0.22, 0.3, pale, 0, 4.35, 4.08);
bdlHip(g, 23.6, 6.6, 2.8, roof, 0, Hh + 0.3, 1.5);
bdlHip(g, 23.6, 6.6, 2.8, roof, 0, Hh + 0.3, -11.5);
[-1, 1].forEach(function (sx) { bdlHip(g, 7.6, 12, 2.6, roof, sx * 8, Hh + 0.3, -5); });
bdlBox(g, 22, 0.12, 4.6, cotto, 0, 0.06, 1.6);
for (var i = 0; i < 6; i++) {
var x = -10 + i * 4;
bdlCyl(g, 0.3, 0.36, 3.4, pale, x, 1.7, 3.7, lite ? 8 : 16);
bdlBox(g, 0.9, 0.3, 0.9, pale, x, 3.5, 3.7);
bdlBox(g, 0.9, 0.25, 0.9, stone, x, 0.13, 3.7);
}
for (var a = 0; a < 5; a++) {
var ax = -8 + a * 4;
var t = bdlTor(g, 1.7, 0.24, pale, ax, 3.6, 3.7, Math.PI);
}
bdlBox(g, 22, 0.7, 0.6, ochre, 0, 4.0, 3.7);
bdlBox(g, 22, 0.2, 4.6, bdlS("planks", 0xB08860, 1.2), 0, 4.2, 1.6);
bdlArch(g, 2.0, 2.4, bdlS("planks", 0x6A4428, 1), 0, 0.12, -0.58);
bdlTor(g, 1.1, 0.12, stone, 0, 2.52, -0.55, Math.PI);
bdlCyl(g, 0.04, 0.04, 0.6, iron, 0, 3.8, 0.2, 4);
bdlCyl(g, 0.22, 0.18, 0.4, iron, 0, 3.35, 0.2, 6);
bdlSph(g, 0.15, lamp, 0, 3.3, 0.2, 1, 1.3, 1, 8);
for (var w = 0; w < 6; w++) {
var wx = -9 + w * 3.6;
bdlWindow(g, wx, 6.4, 4.05, 0, 1.0, 1.7, { glow: win, shut: green, frame: pale });
bdlWindow(g, wx, 6.4, -14.05, Math.PI, 1.0, 1.7, { glow: win, shut: green, frame: pale });
bdlWindow(g, wx, 2.3, -14.05, Math.PI, 0.9, 1.4, { glow: win, frame: pale });
}
[-1, 1].forEach(function (sx) { for (var w2 = 0; w2 < 4; w2++) {
var wz = -12 + w2 * 3.4;
bdlWindow(g, sx * 11.05, 6.4, wz, sx * Math.PI / 2, 1.0, 1.7, { glow: win, shut: green, frame: pale });
bdlWindow(g, sx * 11.05, 2.3, wz, sx * Math.PI / 2, 0.9, 1.4, { glow: win, frame: pale });
} });
var tx = -8, tz = -11.5;
bdlBox(g, 5.2, 4.6, 5.2, ochre, tx, Hh + 2.3, tz);
bdlBox(g, 5.6, 0.35, 5.6, pale, tx, Hh + 4.7, tz);
[[0, 2.62, 0], [0, -2.62, Math.PI], [2.62, 0, Math.PI / 2], [-2.62, 0, -Math.PI / 2]].forEach(function (s) {
bdlArch(g, 1.6, 1.2, win, tx + s[0], Hh + 5.0, tz + s[1], s[2]);
[-1, 1].forEach(function (k) { var px = tx + s[0] + (s[2] % Math.PI === 0 ? k * 1.6 : 0), pz = tz + s[1] + (s[2] % Math.PI !== 0 ? k * 1.6 : 0); bdlBox(g, 0.5, 2.4, 0.5, ochre, px, Hh + 6.1, pz); });
});
bdlBox(g, 5.6, 0.4, 5.6, pale, tx, Hh + 7.4, tz);
bdlHip(g, 6.4, 6.4, 2.2, roof, tx, Hh + 7.6, tz);
bdlBox(g, 10, 0.08, 8, cotto, 0, 0.05, -5);
bdlCyl(g, 1.1, 1.2, 1.0, stone, 0, 0.5, -5, lite ? 10 : 20);
bdlCyl(g, 0.95, 0.95, 0.06, bdlM(0x3A5A6A, null, 0, { shine: 80 }), 0, 0.95, -5, lite ? 10 : 20);
[-1, 1].forEach(function (k) { bdlCyl(g, 0.06, 0.06, 2.2, iron, k * 0.9, 2, -5, 4); });
var lnt = bdlCyl(g, 0.05, 0.05, 2, iron, 0, 3.1, -5, 4);
lnt.rotation.z = Math.PI / 2;
var pots = [[-4, -2], [4, -2], [-4, -8], [4, -8], [-5, 6.2], [5, 6.2], [-9, 6.2], [9, 6.2]];
pots.forEach(function (c, i) {
if (lite && i % 2)
return;
bdlCyl(g, 0.5, 0.36, 0.75, bdlS("terracotta", 0xE8A080, 0.8), c[0], 0.38, c[1], lite ? 8 : 14);
bdlSph(g, 0.85, bdlS("moss", 0x7AA060, 1.2), c[0], 1.6, c[1], 1, 1.05, 1, lite ? 8 : 12);
for (var f = 0; f < (lite ? 3 : 7); f++)
bdlSph(g, 0.11, bdlM(0xF0D040), c[0] + Math.sin(f * 1.7) * 0.75, 1.3 + (f % 3) * 0.35, c[1] + Math.cos(f * 1.7) * 0.75, 1, 1.1, 1, 6);
});
for (var cy = 0; cy < 4; cy++)
[-2.8, 2.8].forEach(function (x) { bdlTree(g, "cypress", x, 0, 7.2 + cy * 2.2, 0.62, cy); });
[[-14, 13], [14, 13], [-14.2, -13], [14.2, -13]].forEach(function (o, i) { bdlOlive(g, o[0], o[1], i); });
[-1, 1].forEach(function (sx) {
for (var row = 0; row < 2; row++) {
var rx = sx * (13.2 + row * 1.6);
for (var v = 0; v < (lite ? 4 : 8); v++) {
var vz = -11 + v * (lite ? 5 : 2.6);
bdlVine(g, rx, vz, v + row * 9);
}
bdlBox(g, 0.04, 0.04, 22, wood, rx, 1.4, -1);
[-12, -1, 10].forEach(function (z) { bdlBox(g, 0.1, 1.6, 0.1, wood, rx, 0.8, z); });
}
});
var pg = new THREE.Group();
pg.position.set(9.5, 0, 10.5);
g.add(pg);
[[-2.5, -2], [2.5, -2], [-2.5, 2], [2.5, 2]].forEach(function (p) { bdlCyl(pg, 0.16, 0.18, 2.8, pale, p[0], 1.4, p[1], 8); });
for (var b = 0; b < 5; b++)
bdlBox(pg, 5.6, 0.12, 0.14, wood, 0, 2.85, -2 + b);
bdlBox(pg, 0.14, 0.14, 4.6, wood, -2.5, 2.75, 0);
bdlBox(pg, 0.14, 0.14, 4.6, wood, 2.5, 2.75, 0);
for (var vv = 0; vv < (lite ? 4 : 9); vv++) {
var R = bdlRand(vv * 7 + 3);
bdlSph(pg, 0.6 + R() * 0.3, bdlS("moss", 0x6A9A48, 1), -2.2 + R() * 4.4, 3.0, -1.8 + R() * 3.6, 1, 0.4, 1, lite ? 6 : 10);
}
var bench = function (par, x, z, ry) { var bg = new THREE.Group(); bg.position.set(x, 0, z); bg.rotation.y = ry || 0; par.add(bg); bdlBox(bg, 2.2, 0.18, 0.6, stone, 0, 0.5, 0); [-0.8, 0.8].forEach(function (k) { bdlBox(bg, 0.3, 0.42, 0.5, stone, k, 0.21, 0); }); };
bench(pg, 0, 0, 0);
bench(g, -9, 10, 0);
bench(g, -5.5, 13.8, 0);
var fx = -9, fz = 7;
bdlCyl(g, 2.0, 2.2, 0.6, stone, fx, 0.3, fz, lite ? 12 : 24);
bdlCyl(g, 1.8, 1.8, 0.08, bdlM(0x6A9AB8, null, 0, { op: 0.82, shine: 90 }), fx, 0.58, fz, lite ? 12 : 24);
bdlCyl(g, 0.3, 0.42, 1.4, stone, fx, 1.0, fz, 10);
bdlCyl(g, 0.9, 0.4, 0.3, stone, fx, 1.8, fz, lite ? 10 : 18);
bdlSph(g, 0.28, bdlS("marble", 0xF0ECE4, 1), fx, 2.35, fz);
bdlCyl(g, 0.12, 0.16, 0.6, bdlS("marble", 0xF0ECE4, 1), fx, 2.0, fz, 8);
[-14, -7, 7, 14].forEach(function (x) { bdlCyl(g, 0.35, 0.22, 0.6, bdlS("terracotta", 0xE8A080, 0.8), x, 0.55, 15.1, 10); bdlSph(g, 0.42, bdlS("moss", 0x5A8A40, 1), x, 1.05, 15.1, 1, 0.7, 1, 8); });
[-2, 2].forEach(function (x) { bdlBox(g, 0.7, 1.6, 0.7, stone, x, 0.8, 15); bdlCyl(g, 0.05, 0.05, 0.7, iron, x, 1.95, 15, 4); bdlSph(g, 0.18, lamp, x, 2.35, 15, 1, 1.3, 1, 8); });
return { g: g, solids: [{ x: 0, z: -7.3, hw: 11.3, hd: 7.1 }, { x: fx, z: fz, r: 2.2 }].concat([-10, -6, -2, 2, 6, 10].map(function (x) { return { x: x, z: 3.7, r: 0.4 }; })),
door: { x: 0, z: 0.6 }, plate: { x: 2.4, y: 2.2, z: -0.55, w: 2.2, h: 0.5, bg: "#F2E2C0", fg: "#5A3A22" } };
},
function (force) {
if (BDL.busy || !bdlSigned())
return Promise.resolve(BDL.board);
if (!force && BDL.board && Date.now() - BDL.at < 60000)
return Promise.resolve(BDL.board);
BDL.busy = true;
return BDL.wait = bdlRpc("bundle_board", {}).then(function (o) { BDL.busy = false; BDL.at = Date.now(); if (o && o.bundles) {
BDL.board = o;
BDL.missing = false;
} return BDL.board; })
.catch(function (e) { BDL.busy = false; BDL.at = Date.now(); BDL.missing = true; return BDL.board; });
},
function (D) {
var B = BDL.board, out = [], plots = BDL_PLOTS[D.world] || [];
((B && B.houses) || []).forEach(function (h) { if (h.bundle === D.key && plots[h.plot])
out.push({ plot: h.plot, owner: h.owner, name: h.name }); });
if (bdlKeeper() && !out.some(function (h) { return h.owner === bdlMe(); })) {
var used = {};
out.forEach(function (h) { used[h.plot] = 1; });
var p = 0;
while (used[p])
p++;
if (plots[p])
out.push({ plot: p, owner: bdlMe(), name: "The Keeper", keeper: true });
}
return out;
},
function (D, n) {
var P = (BDL_PLOTS[D.world] || [])[n];
if (!P)
return null;
var W = WORLDS[D.world], g = P[2] !== undefined ? P[2] : 3;
if (D.world === "underdark")
return { x: P[0], z: P[1], y: P[2], rot: Math.atan2(D.face.x - P[0], D.face.z - P[1]), hang: true };
try {
if (W && W.ground) {
var gd = W.ground(P[0], P[1] + (D.world === "verne" ? 0 : 12), 0);
if (gd != null && gd > -500)
g = gd;
}
}
catch (e) { }
if (D.world === "verne")
g = Math.max(g, 2.4);
var rot = Math.atan2(D.face.x - P[0], D.face.z - P[1]);
if (D.world === "verne")
rot = 0;
return { x: P[0], z: P[1], y: g, rot: rot };
},
function () {
var key = typeof WLD !== "undefined" && WLD && WLD.on, D = key && bdlDefOfWorld(key), W = D && WORLDS[key];
if (!D || !W || !W.g)
return;
var want = bdlWanted(D), sig = W.g.uuid + "|" + want.map(function (h) { return h.plot + ":" + h.owner + ":" + h.name; }).sort().join(",");
if (BDL.built[key] && BDL.built[key].sig === sig)
return;
bdlTakeDown(key);
var list = [], solids = [];
want.forEach(function (h) {
var at = bdlPlotAt(D, h.plot);
if (!at)
return;
var B;
try {
B = BDL_OUT[D.key]();
}
catch (e) {
if (window.console)
console.warn("[bundles] house", e);
return;
}
B.g.position.set(at.x, at.y, at.z);
B.g.rotation.y = at.rot;
B.g.name = "bdl-house-" + D.key + "-" + h.plot;
W.g.add(B.g);
if (B.plate) {
var pl = bdlPlate([D.house, h.name || "a dreamer"], B.plate.w, B.plate.h, B.plate.bg, B.plate.fg);
pl.position.set(B.plate.x, B.plate.y, B.plate.z);
B.g.add(pl);
}
B.solids.forEach(function (s) {
var p = bdlLocal(s.x, s.z, at), o = { x: p.x, z: p.z, b: at.y - 20, h: 80, bdl: 1 };
if (s.h !== undefined) {
o.b = at.y + (s.b || 0);
o.h = s.h;
}
if (s.r)
o.r = s.r;
else {
o.hw = s.hw;
o.hd = s.hd;
o.rot = at.rot;
}
solids.push(o);
});
var dp = bdlLocal(B.door.x, B.door.z, at), H = { D: D, plot: h.plot, owner: h.owner, name: h.name, at: at, g: B.g, door: { x: dp.x, z: dp.z, y: at.y }, keeper: !!h.keeper, spots: [], hang: B.hang || null, parts: [] };
try {
if (B.hang)
bdlHangDress(H, W);
if (B.extra)
B.extra(H, W);
}
catch (e) {
if (window.console)
console.warn("[bundles] dress outside", e);
}
list.push(H);
});
BDL.built[key] = { sig: sig, list: list, solids: solids };
},
function (key) {
var b = BDL.built[key];
if (!b)
return;
b.list.forEach(function (h) {
(h.undo || []).forEach(function (f) { try {
f();
}
catch (e) { } });
(h.parts || []).forEach(function (p) { if (p.parent)
p.parent.remove(p); p.traverse(function (m) { if (m.geometry && !m.userData.bdlKeepGeo)
m.geometry.dispose(); }); });
if (h.g.parent)
h.g.parent.remove(h.g);
h.g.traverse(function (m) { if (m.geometry && !m.userData.bdlKeepGeo)
m.geometry.dispose(); if (m.userData && m.userData.bdlOwnTex)
m.userData.bdlOwnTex.dispose(); });
});
delete BDL.built[key];
},
function () {
var key = WLD.on, b = BDL.built[key];
if (!b || !b.list.length)
return null;
var P = camera.position, lx = P.x - WLD.w.base, lz = P.z, feet = P.y - 1.72, best = null, bd = 1e9;
b.list.forEach(function (h) { (h.spots || []).forEach(function (s) { var d = Math.hypot(lx - s.x, lz - s.z); if (d < s.r && d < bd && Math.abs(feet - s.y) < 2.6) {
bd = d;
best = { s: s, h: h };
} }); });
return best;
},
function (h, x, z, feet, slack) {
var at = h.at, c = Math.cos(at.rot), s = Math.sin(at.rot), dx = x - at.x, dz = z - at.z, lx = dx * c - dz * s, lz = dx * s + dz * c;
if (lx * lx + lz * lz > 48 * 48)
return null;
var L = h.hang.levels;
for (var i = 0; i < L.length; i++) {
var y = at.y + L[i].y;
if (feet > y - (slack || 1.6) && feet < y + 2.6 && bdlUdOn(L[i], lx, lz))
return { L: L[i], y: y };
}
return { L: null, lx: lx, lz: lz };
},
function (H, W) {
var at = H.at, hg = H.hang, lite = bdlLite();
var top = bdlLocal(hg.lift.x, hg.lift.z, at), fl = bdlLocal(hg.lift.x - 3, hg.lift.z, at), p = [fl.x, fl.z];
try {
if (typeof udsClear === "function")
p = udsClear(fl.x, fl.z, 2.8);
}
catch (e) { }
var fy = -60;
try {
var gy = udHeight(p[0], p[1]);
if (gy > -900)
fy = gy;
}
catch (e) { }
var G = new THREE.Group();
G.position.set(p[0], fy, p[1]);
G.name = "bdl-lift-" + H.plot;
W.g.add(G);
H.parts.push(G);
var silver = bdlMetal(0xD8DEF0), wick = bdlS("planks", 0x7A5A3C, 0.6), silk = new THREE.LineBasicMaterial({ color: 0xD8D0F0, transparent: true, opacity: 0.6 });
bdlCyl(G, 1.15, 0.95, 1.1, wick, 0, 0.55, 0, lite ? 10 : 16);
bdlTor(G, 1.15, 0.07, silver, 0, 1.12, 0).rotation.x = Math.PI / 2;
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2; G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.cos(a) * 1.1, 1.12, Math.sin(a) * 1.1), new THREE.Vector3(0, 3.4, 0)]), silk)); });
var ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p[0], fy + 3.4, p[1]), new THREE.Vector3(top.x, at.y + 3.8, top.z)]), silk);
W.g.add(ln);
H.parts.push(ln);
var pl = bdlPlate([H.D.house, "silk lift to " + (H.name || "a dreamer") + "'s manor"], 2.8, 0.62, "#140E1C", "#C8B8F0");
pl.position.set(0, 2.5, 1.3);
G.add(pl);
var pl2 = pl.clone();
pl2.position.z = -1.3;
pl2.rotation.y = Math.PI;
G.add(pl2);
for (var k = 0; k < (lite ? 8 : 18); k++) {
var a = k / (lite ? 8 : 18) * Math.PI * 2 + 0.3, rr = 3.2 + (k % 3) * 0.8, hh = 0.5 + (k % 4) * 0.4;
bdlCyl(G, 0.08, 0.12, hh, bdlS("marble", 0xD8D0E8, 1), Math.sin(a) * rr, hh / 2, Math.cos(a) * rr, 5);
bdlSph(G, 0.3 + (k % 3) * 0.14, bdlM([0x7A5AE0, 0x3AC8B8, 0xE0D8FF][k % 3], null, 0, { e: [0x6A48D0, 0x2AB0A0, 0xC8C0F0][k % 3], ei: 0.65 }), Math.sin(a) * rr, hh, Math.cos(a) * rr, 1, 0.45, 1, lite ? 8 : 12);
}
[-1, 1].forEach(function (sd) { bdlCyl(G, 0.07, 0.1, 3.2, silver, sd * 2.2, 1.6, 0, 6); bdlSph(G, 0.24, bdlGlow(0xC8B0FF, 0.9), sd * 2.2, 3.3, 0, 1, 1.2, 1, 10); });
var mine = function () { return bdlMayEnter(H); }, liftAt = { x: p[0], z: p[1] };
var land = bdlLocal(-17.3, 0, at), faceIn = Math.atan2(-Math.sin(at.rot + Math.PI / 2), -Math.cos(at.rot + Math.PI / 2));
H.spots.push({ x: liftAt.x, z: liftAt.z, y: fy, r: 3, name: "The silk lift up to " + H.D.house, verb: "ride up", fn: function () {
if (!mine()) {
bdlSay("The lift belongs to " + bdlEsc(H.name || "a dreamer") + "'s manor. Only they (and the Keeper) ride it.");
return;
}
bdlTone(300, 0.4);
bdlTo(land.x, land.z, at.y, Math.atan2(at.x - land.x, at.z - land.z) + Math.PI, "🕸️ <b>Up the silk lift.</b> The basket rises smoothly into the dark, past the city's lamps, and swings in to the terrace of " + bdlEsc(H.D.house) + ".");
} });
H.spots.push({ x: land.x, z: land.z, y: at.y, r: 2.4, name: "The silk lift down", verb: "ride down", fn: function () {
bdlTone(240, 0.4);
bdlTo(liftAt.x + 2.4, liftAt.z, fy, undefined, "🕸️ <b>Down the silk lift.</b> The basket settles on the floor of the cavern.");
} });
hg.levels.forEach(function (L, i) {
var a = i === 0 ? hg.stair.a : (L.parts[0].sec ? L.parts[0].sec[2] * 0.82 : 0.45), r = hg.R(L.y + 1) + 1.3, sp = bdlLocal(Math.sin(a) * r, Math.cos(a) * r, at);
H.spots.push({ x: sp.x, z: sp.z, y: at.y + L.y, r: 1.9, name: "The stair in the stone", verb: "climb or go down", fn: function () { bdlHangStair(H, i); } });
});
var pr = bdlLocal(hg.perch.x, hg.perch.z, at);
H.spots.push({ x: pr.x, z: pr.z, y: at.y, r: 3.2, name: "The great wyvern perch", verb: "call your wyvern", fn: function () { bdlPerch(H); } });
},
function (H, from) {
var fns = {}, h = bdlHead("🪜 The stair in the stone") + "<div style='opacity:.85;margin:4px 0 8px'>A narrow stair climbs inside the wall of " + bdlEsc(H.D.house) + ", from the gallery under the terrace to the high balcony.</div>";
H.hang.levels.slice().sort(function (a, b) { return b.y - a.y; }).forEach(function (L) {
var i = H.hang.levels.indexOf(L);
if (i === from)
return;
fns["l" + i] = function () {
worldCard(null);
var a = i === 0 ? H.hang.stair.a : (L.parts[0].sec ? L.parts[0].sec[2] * 0.6 : 0.3), r = H.hang.R(L.y + 1) + 2.2, q = bdlLocal(Math.sin(a) * r, Math.cos(a) * r, H.at);
bdlTone(280 + i * 30, 0.3);
bdlTo(q.x, q.z, H.at.y + L.y, Math.atan2(-(H.at.x - q.x), -(H.at.z - q.z)), "🪜 <b>" + bdlEsc(L.name.charAt(0).toUpperCase() + L.name.slice(1)) + ".</b> Zhaelvorn's spires below you, all their windows lit.");
};
h += worldBtn("l" + i, (L.y > H.hang.levels[from].y ? "⬆️ Up to " : "⬇️ Down to ") + bdlEsc(L.name));
});
worldCard(h, fns);
},
function (H) {
var D = H.D, fns = {}, h = bdlHead("🐉 The great wyvern perch") + "<div style='line-height:1.45;margin:4px 0 8px'>A beam of black wood bound in silver, held out over the city on an arm of living rock. Cave wyverns roost on perches like this; from here you can see every spire of Zhaelvorn.</div>";
if (bdlHolds(D.mount.arch) || bdlKeeper()) {
fns.r = function () { worldCard(null); bdlRide(D.key); };
h += worldBtn("r", "🐉 Call " + bdlEsc(D.mount.name) + " and ride", "it lands on the perch; jump to rise, J for " + bdlEsc(D.mount.power.name));
}
else
h += "<div style='opacity:.75'>" + bdlEsc(D.mount.name) + " roosts here for the manor's owner.</div>";
worldCard(h, fns);
},
function (h) {
if (!h || !bdlMayEnter(h))
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
var I = BDL_IN[h.D.world];
if (!I)
return;
BDL.inside = { h: h };
BDL.secret = null;
try {
I.enter(h);
}
catch (e) {
BDL.inside = null;
if (window.console)
console.warn("[bundles] inside", e);
bdlSay("The door sticks. Try again in a moment.");
return;
}
bdlTone(330, 0.4);
},
function (quiet) {
var S = BDL.inside, h = S && S.h;
BDL.inside = null;
BDL.secret = null;
if (!h) {
var b = WLD.on && BDL.built[WLD.on];
h = b && b.list.filter(function (x) { return bdlMayEnter(x); })[0];
}
if (!h)
return;
var I = BDL_IN[h.D.world], c = Math.cos(h.at.rot), s = Math.sin(h.at.rot), x = h.door.x + s * 1.6, z = h.door.z + c * 1.6;
if (I && I.out)
I.out(h, x, z, Math.atan2(-s, -c) + Math.PI, quiet ? null : "Back outside " + bdlEsc(h.D.house) + ".");
},
function (S) {
var fns = {}, h = bdlHead(S.icon + " " + bdlEsc(S.room)) + "<div style='margin:6px 0'>" + bdlEsc(S.ask) + "</div>";
S.opts.forEach(function (o, i) {
fns["o" + i] = function () {
worldCard(null);
if (i !== S.ans) {
bdlSay("Nothing happens. Perhaps there is a clue somewhere else in the house.");
bdlTone(180, 0.3);
return;
}
var I = BDL_IN[WLD.on];
if (!I)
return;
BDL.secret = S;
bdlTone(260, 0.8);
I.toSecret(S, "<b>" + bdlEsc(S.name) + ".</b> " + bdlEsc(S.open) + " The way back is behind you.");
};
h += worldBtn("o" + i, bdlEsc(o));
});
worldCard(h, fns);
},
function () {
BDL.inside = null;
BDL.secret = null;
var A = (typeof VRN_SPOTS !== "undefined" && VRN_SPOTS.dock) || { x: 1150, z: 160 };
if (typeof vrnMove === "function")
vrnMove(A.x, A.z - 12, 0, "🫧 <b>The bathysphere.</b> The hatch closes, the water rises past the glass, and a cable draws you out under the headland. You come up beside the Nautilus dock.");
},
function (key, draw, w, h) {
if (BDL_CANVAS[key])
return BDL_CANVAS[key];
var c = document.createElement("canvas");
c.width = w || 512;
c.height = h || 384;
var x = c.getContext("2d");
try {
draw(x, c.width, c.height);
}
catch (e) { }
var t = new THREE.CanvasTexture(c);
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
var m = bdlLite() ? new THREE.MeshLambertMaterial({ map: t }) : new THREE.MeshPhongMaterial({ map: t, shininess: 4 });
m.userData.ldShared = 1;
return (BDL_CANVAS[key] = m);
},
function (n) {
return bdlCanvasTex("chart" + n, function (x, W, H) {
var R = bdlRand(n * 97 + 3);
x.fillStyle = "#E8D8B0";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(140,100,50,.18)";
for (var i = 0; i < 60; i++) {
x.beginPath();
x.arc(R() * W, R() * H, R() * 40, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(90,60,30,.35)";
x.lineWidth = 1;
var cx = W * 0.65, cy = H * 0.55;
for (var a = 0; a < 16; a++) {
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a / 16 * 6.283) * W, cy + Math.sin(a / 16 * 6.283) * W);
x.stroke();
}
x.fillStyle = "#C8B48A";
x.strokeStyle = "#5A3A1E";
x.lineWidth = 2;
x.beginPath();
x.moveTo(0, H * 0.2);
for (var k = 0; k <= 20; k++)
x.lineTo(k / 20 * W * 0.6, H * 0.2 + Math.sin(k * 1.7 + n) * 30 + R() * 20 + k * 6);
x.lineTo(0, H);
x.closePath();
x.fill();
x.stroke();
x.fillStyle = "#7A2A1E";
x.beginPath();
x.moveTo(cx, cy - 40);
x.lineTo(cx + 8, cy);
x.lineTo(cx, cy + 40);
x.lineTo(cx - 8, cy);
x.fill();
x.strokeStyle = "#3A2A1A";
x.lineWidth = 8;
x.strokeRect(4, 4, W - 8, H - 8);
});
},
function (n) {
return bdlCanvasTex("fresco" + n, function (x, W, H) {
var R = bdlRand(n * 131 + 7);
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#9AB8D0");
g.addColorStop(0.55, "#E8DCC0");
g.addColorStop(1, "#C8A878");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var l = 0; l < 3; l++) {
x.fillStyle = ["#8A9A6A", "#6A7A4A", "#5A6A3A"][l];
x.beginPath();
x.moveTo(0, H);
for (var i = 0; i <= 24; i++)
x.lineTo(i / 24 * W, H * (0.5 + l * 0.12) + Math.sin(i * 0.7 + l + n) * 18);
x.lineTo(W, H);
x.fill();
}
for (var c = 0; c < 6; c++) {
var cx = R() * W, cy = H * (0.62 + R() * 0.2);
x.fillStyle = "#2A3A1E";
x.beginPath();
x.ellipse(cx, cy - 34, 9, 38, 0, 0, 7);
x.fill();
}
x.fillStyle = ["#8A2A26", "#2A4A8A", "#C89A3A"][n % 3];
x.beginPath();
x.moveTo(W * 0.42, H * 0.9);
x.quadraticCurveTo(W * 0.5, H * 0.3, W * 0.58, H * 0.9);
x.fill();
x.fillStyle = "#E8C8A0";
x.beginPath();
x.arc(W * 0.5, H * 0.32, 16, 0, 7);
x.fill();
x.fillStyle = "rgba(255,240,210,.18)";
for (var s = 0; s < 200; s++)
x.fillRect(R() * W, R() * H, 2, 2);
x.strokeStyle = "#8A6A3A";
x.lineWidth = 14;
x.strokeRect(7, 7, W - 14, H - 14);
});
},
function (n) {
return bdlCanvasTex("web" + n, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A1E3E");
g.addColorStop(1, "#170F22");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(200,200,232,.55)";
x.lineWidth = 1.5;
var cx = W / 2, cy = H * 0.45;
for (var a = 0; a < 12; a++) {
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a / 12 * 6.283) * W * 0.6, cy + Math.sin(a / 12 * 6.283) * H * 0.6);
x.stroke();
}
for (var r = 20; r < W * 0.5; r += 22) {
x.beginPath();
for (var b = 0; b <= 12; b++) {
var A = b / 12 * 6.283;
x[b ? "lineTo" : "moveTo"](cx + Math.cos(A) * r, cy + Math.sin(A) * r * 0.8);
}
x.stroke();
}
x.strokeStyle = "#C8C0F0";
x.lineWidth = 4;
x.beginPath();
for (var p = 0; p <= 10; p++) {
var A2 = p / 10 * 6.283 - 1.571, rr = p % 2 ? 18 : 44;
x[p ? "lineTo" : "moveTo"](cx + Math.cos(A2) * rr, cy + Math.sin(A2) * rr);
}
x.stroke();
x.fillStyle = "#B8A0E8";
x.font = "italic 22px Georgia";
x.textAlign = "center";
x.fillText(["House of the Hollow Star", "Light from stone", "Every tunnel, known"][n % 3], W / 2, H * 0.92);
});
},
function () {
if (BDL_UD.th)
return BDL_UD.th;
return (BDL_UD.th = { wall: bdlS("cave", 0x8A80A4, 4, { n: 0.8 }), floor: bdlS("darktile", 0x8A84A0, 2.2), hallFloor: bdlS("marble", 0x463E5E, 3), ceil: bdlS("cave", 0x4A4262, 5),
trim: bdlMetal(0xD8DEF0), stair: bdlS("strata", 0x8A8098, 3), glow: 0xB89AF8, signBg: "#140E1C", signFg: "#D0C0FF" });
},
function (grp, x0, z0, x1, z1, y, h, o) {
o = o || {};
var T = 0.2, wall = o.wall, gp = o.gaps || {};
vrnInFloor(grp, (x0 + x1) / 2, (z0 + z1) / 2, x1 - x0, z1 - z0, y, o.floor);
var c = vrnBoxM(x1 - x0, 0.2, z1 - z0, o.ceil || bdlS("stucco", 0xF0E8DA, 3), (x0 + x1) / 2, y + h + 0.1, (z0 + z1) / 2, grp);
var conv = function (list, start) { return (list || []).map(function (g) { return [g[0] - start, g[1] || 2.4, 3.0]; }); };
vrnIWall(grp, x0, z0 + T, x1, z0 + T, h, wall, conv(gp.n, x0), y);
vrnIWall(grp, x0, z1 - T, x1, z1 - T, h, wall, conv(gp.s, x0), y);
vrnIWall(grp, x0 + T, z0, x0 + T, z1, h, wall, conv(gp.w, z0), y);
vrnIWall(grp, x1 - T, z0, x1 - T, z1, h, wall, conv(gp.e, z0), y);
if (o.panel) {
var pm = o.panel, side = function (ax, a0, a1, at, list, inn) {
var cuts = [a0];
(list || []).slice().sort(function (p, q) { return p[0] - q[0]; }).forEach(function (g) { cuts.push(g[0] - (g[1] || 2.4) / 2, g[0] + (g[1] || 2.4) / 2); });
cuts.push(a1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.1)
continue;
if (ax === "x")
vrnBoxM(b - a, 1.1, 0.06, pm, (a + b) / 2, y + 0.55, at + inn, grp);
else
vrnBoxM(0.06, 1.1, b - a, pm, at + inn, y + 0.55, (a + b) / 2, grp);
}
};
side("x", x0 + 0.4, x1 - 0.4, z0 + T, gp.n, 0.2);
side("x", x0 + 0.4, x1 - 0.4, z1 - T, gp.s, -0.2);
side("z", z0 + 0.4, z1 - 0.4, x0 + T, gp.w, 0.2);
side("z", z0 + 0.4, z1 - 0.4, x1 - T, gp.e, -0.2);
}
if (o.lamps !== false) {
var nx = Math.max(1, Math.round((x1 - x0) / 9)), nz = Math.max(1, Math.round((z1 - z0) / 9));
for (var i = 0; i < nx; i++)
for (var j = 0; j < nz; j++) {
var lx = x0 + (i + 0.5) * (x1 - x0) / nx, lz = z0 + (j + 0.5) * (z1 - z0) / nz;
wCyl(0.02, 0.02, 0.7, bdlMetal(0xC8A04A), lx, y + h - 0.35, lz, grp, 4);
wCyl(0.32, 0.14, 0.36, bdlMetal(0xC8A04A), lx, y + h - 0.85, lz, grp, 10);
var gl = wSph(0.16, bdlGlow(0xFFE0A8, 0.95), lx, y + h - 1.05, lz, grp, 8);
if (!VRN.lite) {
var s = wGlow(0xFFD8A0, 3.2, 0.3);
s.position.set(lx, y + h - 1.1, lz);
grp.add(s);
}
}
}
if (o.name && o.signAt) {
vrnSign([o.name], Math.min(4.2, o.name.length * 0.13 + 0.6), 0.5, o.signAt[0], y + 3.4, o.signAt[1], o.signAt[2] || 0, grp);
}
},
function (grp, x, y, z, ry, n, w, h) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(w || 2, h || 1.4), bdlChart(n));
p.position.set(x, y, z);
p.rotation.y = ry || 0;
grp.add(p);
var f = new THREE.Mesh(new THREE.PlaneGeometry((w || 2) + 0.16, (h || 1.4) + 0.16), bdlMetal(0xC8A04A));
f.position.set(x - Math.sin(ry || 0) * 0.01, y, z - Math.cos(ry || 0) * 0.01);
f.rotation.y = ry || 0;
grp.add(f);
},
function () {
return bdlCanvasTex("vdeep", function (x, W, H) {
var R = bdlRand(77);
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A6A8A");
g.addColorStop(0.6, "#0E3A54");
g.addColorStop(1, "#06202E");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(180,230,255,.08)";
for (var r = 0; r < 7; r++) {
x.beginPath();
var a = R() * W;
x.moveTo(a, 0);
x.lineTo(a + 40 + R() * 60, 0);
x.lineTo(a - 80 + R() * 40, H);
x.lineTo(a - 140, H);
x.fill();
}
for (var s = 0; s < 3; s++) {
var cx = R() * W, cy = H * (0.3 + R() * 0.5), col = ["#E8C060", "#A8D8E8", "#E87A5A"][s];
x.fillStyle = col;
for (var f = 0; f < 26; f++) {
var fx = cx + (R() - 0.5) * 220, fy = cy + (R() - 0.5) * 90;
x.beginPath();
x.ellipse(fx, fy, 9, 4, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(fx - 8, fy);
x.lineTo(fx - 15, fy - 5);
x.lineTo(fx - 15, fy + 5);
x.fill();
}
}
x.fillStyle = "#1A3A2A";
for (var k = 0; k < 14; k++) {
var kx = R() * W, kh = 40 + R() * 120;
x.beginPath();
x.moveTo(kx, H);
x.quadraticCurveTo(kx + 20 * (R() - 0.5), H - kh / 2, kx + (R() - 0.5) * 30, H - kh);
x.lineWidth = 6;
x.strokeStyle = "#2A5A3A";
x.stroke();
}
x.fillStyle = "#C8A07A";
for (var c = 0; c < 10; c++) {
x.beginPath();
x.arc(R() * W, H - 6 - R() * 14, 6 + R() * 12, Math.PI, 0);
x.fill();
}
}, 1024, 512);
},
function () {
return bdlCanvasTex("vrose", function (x, W, H) {
x.clearRect(0, 0, W, H);
var c = W / 2;
x.strokeStyle = "#C8A04A";
x.lineWidth = 10;
x.beginPath();
x.arc(c, c, W * 0.47, 0, 7);
x.stroke();
x.lineWidth = 3;
x.beginPath();
x.arc(c, c, W * 0.41, 0, 7);
x.stroke();
for (var i = 0; i < 32; i++) {
var a = i / 32 * Math.PI * 2;
x.beginPath();
x.moveTo(c + Math.cos(a) * W * 0.41, c + Math.sin(a) * W * 0.41);
x.lineTo(c + Math.cos(a) * W * 0.47, c + Math.sin(a) * W * 0.47);
x.stroke();
}
for (var p = 0; p < 16; p++) {
var b = p / 16 * Math.PI * 2, L = p % 4 === 0 ? 0.4 : (p % 2 ? 0.18 : 0.28);
x.fillStyle = p % 2 ? "#8A6A3A" : "#2A3A5A";
x.beginPath();
x.moveTo(c + Math.cos(b) * W * L, c + Math.sin(b) * W * L);
x.lineTo(c + Math.cos(b + 0.12) * W * 0.06, c + Math.sin(b + 0.12) * W * 0.06);
x.lineTo(c + Math.cos(b - 0.12) * W * 0.06, c + Math.sin(b - 0.12) * W * 0.06);
x.fill();
}
x.fillStyle = "#C8A04A";
x.font = "bold 46px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("N", c, c - W * 0.44 + 4);
}, 512, 512);
},
function (grp, x0, z0, x1, z1, y, h, o) {
o = o || {};
var T = 0.3, gp = o.gaps || {}, wall = o.wall;
davInFloor(grp, (x0 + x1) / 2, (z0 + z1) / 2, x1 - x0, z1 - z0, y, o.floor);
var conv = function (list, start) { return (list || []).map(function (g) { var w = g[1] || 2.4; return [g[0] - w / 2 - start, g[0] + w / 2 - start]; }); };
davIWall(grp, x0, z0 + T, x1, z0 + T, h, wall, conv(gp.n, x0), y);
davIWall(grp, x0, z1 - T, x1, z1 - T, h, wall, conv(gp.s, x0), y);
davIWall(grp, x0 + T, z0, x0 + T, z1, h, wall, conv(gp.w, z0), y);
davIWall(grp, x1 - T, z0, x1 - T, z1, h, wall, conv(gp.e, z0), y);
if (!o.open) {
var c = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), o.ceil || bdlS("stucco", 0xF2E8D2, 3));
c.rotation.x = Math.PI / 2;
c.position.set((x0 + x1) / 2, y + h, (z0 + z1) / 2);
grp.add(c);
if (!DAV.lite)
for (var bx = x0 + 1.6; bx < x1 - 0.6; bx += 2.4)
davBoxM(0.3, 0.36, z1 - z0 - 0.6, bdlS("planks", 0x8A6040, 1.2), bx, y + h - 0.18, (z0 + z1) / 2, grp);
if (o.lamps !== false) {
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
davHang(grp, cx, y + h, cz);
var gl = wGlow(0xFFD8A0, 2.4, 0.16);
gl.position.set(cx, y + h - 1.4, cz);
grp.add(gl);
}
}
if (o.fresco) {
var fw = Math.min(5, (x1 - x0) * 0.5), p = new THREE.Mesh(new THREE.PlaneGeometry(fw, 2.6), bdlFresco(o.fresco));
p.position.set((x0 + x1) / 2, y + 2.7, z0 + T + 0.26);
grp.add(p);
if (z1 - z0 > 8) {
var p2 = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2), bdlFresco(o.fresco + 3));
p2.position.set(x0 + T + 0.26, y + 2.7, (z0 + z1) / 2);
p2.rotation.y = Math.PI / 2;
grp.add(p2);
var p3 = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2), bdlFresco(o.fresco + 5));
p3.position.set(x1 - T - 0.26, y + 2.7, (z0 + z1) / 2);
p3.rotation.y = -Math.PI / 2;
grp.add(p3);
}
}
if (o.name && o.signAt)
davSign([o.name], Math.min(4.4, o.name.length * 0.13 + 0.6), 0.5, o.signAt[0], y + 3.3, o.signAt[1], o.signAt[2] || 0, grp);
},
function (grp, x, y, z, ry, mat) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var w = bdlS("planks", 0x6A4428, 1);
davBoxM(0.5, 0.08, 0.5, mat || w, 0, 0.48, 0, g);
davBoxM(0.5, 0.8, 0.08, w, 0, 0.9, -0.22, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { davBoxM(0.06, 0.46, 0.06, w, k[0] * 0.2, 0.23, k[1] * 0.2, g); });
return g;
},
function (grp, x, y, z, ry, cover) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var w = bdlS("planks", 0x5A3A22, 1);
davBoxM(2.4, 0.55, 3.2, w, 0, 0.28, 0, g);
davBoxM(2.3, 0.28, 3.0, cover, 0, 0.69, 0.05, g);
davBoxM(2.0, 0.2, 0.6, bdlS("velvet", 0xF0E8D8, 0.6), 0, 0.9, -1.15, g);
[[-1.15, -1.55], [1.15, -1.55], [-1.15, 1.55], [1.15, 1.55]].forEach(function (p) { davBoxM(0.12, 2.6, 0.12, w, p[0], 1.3, p[1], g); });
davBoxM(2.5, 0.12, 3.3, cover, 0, 2.6, 0, g);
davSolid({ x: x, z: z, hw: 1.3, hd: 1.7, h: 1.2, b: y });
return g;
},
function (n) {
if (n.k === "door")
return bdlMayEnter(n.h) ? "🚪 <b>" + bdlEsc(n.h.D.house) + "</b> · <b>press E</b> (or tap here) to go in" : "🚪 <b>" + bdlEsc(n.h.D.house) + "</b>, the house of " + bdlEsc(n.h.name || "a dreamer") + " · <b>press E</b> (or tap here) to knock";
if (n.k === "spot")
return "✨ <b>" + bdlEsc(n.s.name) + "</b> · <b>press E</b> (or tap) to " + bdlEsc(n.s.verb || "use it");
return "";
},
function () {
var n = BDL.near;
if (!n)
return;
if (n.k === "door") {
if (bdlMayEnter(n.h))
bdlEnter(n.h);
else if (typeof hgBundleKnock === "function" && bdlMe())
hgBundleKnock(n.h);
else
bdlSay("<b>" + bdlEsc(n.h.D.house) + "</b> belongs to " + bdlEsc(n.h.name || "a dreamer") + ". Only they, their guests and the Keeper have the key.");
return;
}
if (n.k === "spot") {
try {
n.s.fn();
}
catch (e) {
if (window.console)
console.warn("[bundles] spot", e);
}
}
},
function () {
if (BDL.looping)
return;
BDL.looping = true;
var last = performance.now();
(function step() {
var now = performance.now(), dt = Math.min(0.1, (now - last) / 1000);
last = now;
var busy = false;
try {
if (typeof bdlFxStep === "function" && bdlFxStep(dt))
busy = true;
}
catch (e) { }
if (busy)
requestAnimationFrame(step);
else
BDL.looping = false;
})();
},
function (key) {
var D = BDL_DEFS[key];
if (!D)
return;
if (!bdlHolds(D.skin.arch)) {
bdlSay("That look comes with <b>" + bdlEsc(D.name) + "</b>.");
return;
}
var d = dreamer(), L = meLook();
if (!d.bdlLook && !d.ctCos) {
var prev = {};
BDL_LOOK_KEYS.forEach(function (k) { prev[k] = L[k] === undefined ? null : L[k]; });
d.bdlPrev = prev;
}
if (d.ctCos && typeof ctCosOff === "function") {
try {
ctCosOff();
}
catch (e) { }
var prev2 = {};
BDL_LOOK_KEYS.forEach(function (k) { prev2[k] = L[k] === undefined ? null : L[k]; });
d.bdlPrev = prev2;
}
BDL_LOOK_CLEAR.forEach(function (k) { L[k] = null; });
var o = D.skin.look;
Object.keys(o).forEach(function (k) { L[k] = o[k]; });
d.bdlLook = key;
L.src = L.src || {};
BDL_LOOK_KEYS.forEach(function (k) { if (L[k] != null)
L.src[k] = "chosen"; });
if (typeof rebuildMe === "function")
rebuildMe();
try {
save();
}
catch (e) { }
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
bdlSay("👘 You're wearing <b>" + bdlEsc(D.skin.name) + "</b>. Take it off from <b>" + D.icon + " World Bundles</b> in the Menu.");
},
function () {
var d = dreamer(), L = meLook(), P = d.bdlPrev;
if (P)
BDL_LOOK_KEYS.forEach(function (k) { L[k] = P[k]; });
d.bdlLook = null;
d.bdlPrev = null;
if (typeof rebuildMe === "function")
rebuildMe();
try {
save();
}
catch (e) { }
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
bdlSay("👘 Back in your own clothes.");
},
function (S, bone, skin, vein) {
var w = new THREE.Group(), sh = new THREE.Shape(), tips = [[1, 0.05], [0.85, -0.55], [0.55, -0.75], [0.25, -0.6]];
sh.moveTo(0, 0);
sh.lineTo(S, 0.05 * S);
for (var i = 1; i < tips.length; i++) {
var a = tips[i - 1], b = tips[i];
sh.quadraticCurveTo((a[0] + b[0]) / 2 * S * 0.9, (a[1] + b[1]) / 2 * S * 0.7, b[0] * S, b[1] * S);
}
sh.quadraticCurveTo(0.08 * S, -0.4 * S, 0, -0.15 * S);
sh.lineTo(0, 0);
var gm = new THREE.ShapeGeometry(sh, bdlLite() ? 6 : 10);
gm.rotateX(Math.PI / 2);
w.add(new THREE.Mesh(gm, bdlM(skin, null, 0, { ds: true })));
var up = new THREE.Vector3(0, 1, 0);
tips.forEach(function (t) {
var dir = new THREE.Vector3(t[0] * S, 0.01 * S, t[1] * S), len = dir.length();
dir.normalize();
[[bone, S * 0.02], [vein, S * 0.006]].forEach(function (q) {
if (!q[0])
return;
var b = new THREE.Mesh(new THREE.CylinderGeometry(q[1] * 0.6, q[1], len, 5), q[0]);
b.quaternion.setFromUnitVectors(up, dir);
b.position.copy(dir).multiplyScalar(len / 2);
b.position.y += q[0] === vein ? 0.01 * S : 0;
w.add(b);
});
});
return w;
},
function (par, pts, r0, r1, mat, seg) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
var g = new THREE.TubeGeometry(c, seg || 16, 1, bdlLite() ? 6 : 10, false), pos = g.attributes.position, n = (seg || 16) + 1, rs = (bdlLite() ? 6 : 10) + 1;
for (var i = 0; i < n; i++) {
var t = i / (n - 1), rr = r0 + (r1 - r0) * t, P = c.getPointAt(t);
for (var j = 0; j < rs; j++) {
var k = i * rs + j, x = pos.getX(k) - P.x, y = pos.getY(k) - P.y, z = pos.getZ(k) - P.z;
pos.setXYZ(k, P.x + x * rr, P.y + y * rr, P.z + z * rr);
}
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
par.add(m);
return m;
},
function () {
var g = new THREE.Group(), sc = bdlM(0x2A2236, null, 0, { shine: 40, spec: 0x3A3050 }), belly = bdlM(0x4A3E58), horn = bdlM(0xD8D0C0), vein = bdlGlow(0x9A7AE8, 0.7), eye = bdlGlow(0xD8C0FF, 0.95);
bdlSph(g, 1, sc, 0, 1.9, 0, 0.9, 0.75, 1.9);
bdlSph(g, 0.8, belly, 0, 1.6, 0.1, 0.75, 0.55, 1.5);
bdlTube(g, [[0, 2.2, 1.5], [0, 2.9, 2.4], [0, 3.5, 3.1]], 0.5, 0.28, sc);
var hd = new THREE.Group();
hd.position.set(0, 3.6, 3.4);
g.add(hd);
bdlSph(hd, 0.45, sc, 0, 0, 0.2, 0.8, 0.7, 1.4);
bdlSph(hd, 0.3, sc, 0, -0.12, 0.8, 0.7, 0.5, 1.0);
[-1, 1].forEach(function (s) { bdlSph(hd, 0.07, eye, s * 0.24, 0.12, 0.5); var h = bdlCone(hd, 0.07, 0.7, horn, s * 0.22, 0.42, -0.2, 6); h.rotation.x = -0.9; h.rotation.z = s * 0.3; });
bdlTube(g, [[0, 1.9, -1.6], [0, 1.7, -3], [0, 1.5, -4.4], [0, 1.6, -5.6]], 0.42, 0.06, sc);
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 4), sc);
sp.position.set(0, 1.6, -5.9);
sp.rotation.x = -Math.PI / 2;
sp.scale.x = 1.6;
g.add(sp);
[-1, 1].forEach(function (s) { var leg = new THREE.Group(); leg.position.set(s * 0.6, 1.5, -0.4); g.add(leg); bdlCyl(leg, 0.2, 0.14, 1.3, sc, 0, -0.65, 0, 8); bdlSph(leg, 0.18, belly, 0, -1.35, 0.15, 1, 0.6, 1.6); });
for (var r = 0; r < 7; r++)
bdlCone(g, 0.1, 0.35, horn, 0, 2.7 - r * 0.04, 1.2 - r * 0.6, 5);
var W = [];
[-1, 1].forEach(function (s) {
var hinge = new THREE.Group();
hinge.position.set(s * 0.55, 2.5, 0.6);
g.add(hinge);
var wing = bdlWing(4.2, bdlM(0x4A3C60), 0x3A2A58, vein);
if (s < 0)
wing.scale.x = -1;
hinge.add(wing);
W.push({ h: hinge, s: s });
});
g.userData.anim = function (t) { W.forEach(function (w) { w.h.rotation.z = w.s * (0.35 + Math.sin(t * 2.4) * 0.45); }); hd.rotation.y = Math.sin(t * 0.7) * 0.15; };
return g;
},
function () {
var g = new THREE.Group(), steel = bdlMetal(0x2A3038), dark = bdlMetal(0x1A1E24), brass = bdlMetal(0xC8A04A), glass = bdlM(0x9AC8E0, null, 0, { op: 0.45, shine: 90 }), tyre = bdlM(0x1A1A1A);
var hull = bdlLathe(g, [[0, -3.6], [0.5, -3.0], [0.95, -1.6], [1.05, 0], [0.95, 1.6], [0.6, 3.0], [0, 3.8]], steel, 0, 1.1, 0);
hull.rotation.x = Math.PI / 2;
bdlTor(g, 1.06, 0.05, brass, 0, 1.1, 0).rotation.y = 0;
bdlTor(g, 0.98, 0.04, brass, 0, 1.1, 1.6);
bdlTor(g, 0.98, 0.04, brass, 0, 1.1, -1.6);
var cp = bdlSph(g, 0.7, glass, 0, 1.85, 0.9, 1, 0.6, 1.5);
[[-1, 1.9], [1, 1.9], [-1, -1.9], [1, -1.9]].forEach(function (w) { var wh = bdlCyl(g, 0.48, 0.48, 0.3, tyre, w[0] * 1.05, 0.48, w[1], bdlLite() ? 12 : 20); wh.rotation.z = Math.PI / 2; var hb = bdlCyl(g, 0.22, 0.22, 0.32, brass, w[0] * 1.06, 0.48, w[1], 10); hb.rotation.z = Math.PI / 2; });
var props = [];
[-1, 1].forEach(function (s) {
var wing = bdlBox(g, 2.6, 0.06, 1.1, dark, s * 2.2, 1.2, -0.4);
wing.rotation.z = s * 0.08;
var tb = bdlCyl(g, 0.25, 0.3, 0.9, brass, s * 3.3, 1.25, -0.3, 10);
tb.rotation.x = Math.PI / 2;
var pr = new THREE.Group();
pr.position.set(s * 3.3, 1.25, 0.25);
g.add(pr);
for (var b = 0; b < 3; b++) {
var bl = bdlBox(pr, 0.08, 0.9, 0.03, brass, 0, 0, 0);
bl.rotation.z = b / 3 * Math.PI * 2;
}
props.push(pr);
});
var tail = new THREE.Group();
tail.position.set(0, 1.1, -3.7);
g.add(tail);
for (var tb2 = 0; tb2 < 4; tb2++) {
var bl2 = bdlBox(tail, 0.1, 1.2, 0.04, brass, 0, 0, 0);
bl2.rotation.z = tb2 / 4 * Math.PI * 2;
}
props.push(tail);
bdlSph(g, 0.14, bdlGlow(0xFFE0A0, 0.95), 0, 1.15, 3.75);
g.userData.anim = function (t) { props.forEach(function (p) { p.rotation.z = t * 9; }); };
return g;
},
function () {
var g = new THREE.Group(), wood = bdlM(0x8A6A3A, "wood", 1), dark = bdlM(0x5A4024, "wood", 1), canvas = bdlM(0xE8DCC0, null, 0, { ds: true }), rope = bdlM(0xC8B890);
bdlBox(g, 0.3, 0.3, 4.2, wood, 0, 1.0, 0);
bdlBox(g, 1.4, 0.12, 0.12, wood, 0, 1.0, 0.6);
bdlBox(g, 1.4, 0.12, 0.12, wood, 0, 1.0, -0.8);
bdlBox(g, 0.9, 0.08, 1.4, dark, 0, 0.85, 0.1);
var mast = bdlCyl(g, 0.06, 0.08, 1.8, wood, 0, 1.9, 0.3, 6);
[[-0.5, 0], [0.5, 0], [0, 1.6], [0, -1.6]].forEach(function (l) { var sk = bdlCyl(g, 0.04, 0.04, 1.0, wood, l[0], 0.5, l[1] + 0.1, 5); });
bdlBox(g, 1.6, 0.06, 0.2, wood, 0, 0.05, 1.3);
bdlBox(g, 1.6, 0.06, 0.2, wood, 0, 0.05, -1.1);
var W = [];
[-1, 1].forEach(function (s) {
var hinge = new THREE.Group();
hinge.position.set(s * 0.2, 2.6, 0.3);
g.add(hinge);
var wing = new THREE.Group();
if (s < 0)
wing.scale.x = -1;
hinge.add(wing);
bdlCyl(wing, 0.05, 0.03, 5.2, wood, 2.6, 0, 0, 6).rotation.z = Math.PI / 2;
for (var r = 0; r < 6; r++) {
var rx = 0.5 + r * 0.85, len = 1.8 - r * 0.18, rb = bdlCyl(wing, 0.025, 0.015, len, wood, rx, 0, -len / 2, 5);
rb.rotation.x = Math.PI / 2;
}
var sh = new THREE.Shape();
sh.moveTo(0.2, 0);
sh.lineTo(5.2, 0);
sh.quadraticCurveTo(4.6, -0.9, 3.9, -0.9);
sh.quadraticCurveTo(2.6, -2, 0.4, -1.8);
sh.lineTo(0.2, 0);
var gm = new THREE.ShapeGeometry(sh, 8);
gm.rotateX(Math.PI / 2);
wing.add(new THREE.Mesh(gm, canvas));
W.push({ h: hinge, s: s });
});
var fan = new THREE.Group();
fan.position.set(0, 1.1, -2.2);
g.add(fan);
var fs = new THREE.Shape();
fs.moveTo(0, 0);
fs.lineTo(-0.9, -1.4);
fs.quadraticCurveTo(0, -1.7, 0.9, -1.4);
fs.lineTo(0, 0);
var fg = new THREE.ShapeGeometry(fs, 6);
fg.rotateX(-Math.PI / 2);
fan.add(new THREE.Mesh(fg, canvas));
bdlCyl(fan, 0.02, 0.02, 1.6, rope, 0, 0, -0.8, 4).rotation.x = Math.PI / 2;
g.userData.anim = function (t) { W.forEach(function (w) { w.h.rotation.z = w.s * (Math.sin(t * 3.0) * 0.5 + 0.1); }); fan.rotation.x = Math.sin(t * 1.5) * 0.08; };
return g;
},
function () {
var D = bdlMountNow();
if (!D)
return;
if (store.inside)
return;
var Pw = D.mount.power, now = performance.now() / 1000;
if ((BDL.cool[Pw.key] || 0) > now) {
bdlSay(Pw.icon + " <b>" + Pw.name + "</b> is gathering itself: " + Math.ceil(BDL.cool[Pw.key] - now) + " s.");
return;
}
BDL.cool[Pw.key] = now + Pw.cool;
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw), hit = 0, foes = [];
try {
foes = typeof spbFoes === "function" ? spbFoes(Pw.r + 4) : [];
}
catch (e) {
foes = [];
}
foes.forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz), ok;
if (Pw.key === "dive")
ok = d <= Pw.r;
else {
var along = dx * fx + dz * fz, side = Math.abs(dx * fz - dz * fx);
ok = along > -1 && along <= Pw.r && side <= Pw.w;
}
if (!ok)
return;
var pvp = /^pvp/.test(o.kind || "");
try {
o.hit(pvp ? Pw.pvp : Pw.npc);
if (!pvp && o.hold)
o.hold(Pw.hold);
if (o.push)
o.push(dx, dz, Pw.key === "ram" ? 3 : 1.5);
hit++;
}
catch (e) { }
});
bdlFx(D, P, fx, fz);
bdlTone(Pw.key === "dive" ? 140 : Pw.key === "ram" ? 110 : 420, 0.5);
bdlSay(Pw.icon + " <b>" + Pw.name + ".</b> " + Pw.say + (hit ? " <b>" + hit + "</b> struck." : " Nothing was in reach."));
if (Pw.key === "ram") {
try {
var nx = P.x + fx * 6, nz = P.z + fz * 6;
if (!(typeof blockedAt === "function" && blockedAt(nx, nz, P.y - 1.72))) {
P.x = nx;
P.z = nz;
}
}
catch (e) { }
}
},
function (D, P, fx, fz) {
var Pw = D.mount.power, m = new THREE.MeshBasicMaterial({ color: Pw.col, transparent: true, opacity: 0.45, depthWrite: false, side: THREE.DoubleSide }), g;
if (Pw.key === "dive") {
g = new THREE.Mesh(new THREE.RingGeometry(0.5, 1.2, 40), m);
g.rotation.x = -Math.PI / 2;
g.position.set(P.x, P.y - 1.6, P.z);
}
else {
g = new THREE.Mesh(new THREE.PlaneGeometry(Pw.w * 2, Pw.r), m);
g.rotation.x = -Math.PI / 2;
g.rotation.z = -yaw;
g.position.set(P.x + fx * Pw.r / 2, P.y - 1.6, P.z + fz * Pw.r / 2);
}
scene.add(g);
BDL_FX.push({ g: g, m: m, t: 0, k: Pw.key, r: Pw.r });
bdlLoop();
},
function (dt) {
for (var i = BDL_FX.length - 1; i >= 0; i--) {
var f = BDL_FX[i];
f.t += dt;
var k = f.t / 0.9;
if (f.k === "dive")
f.g.scale.setScalar(1 + k * f.r);
else
f.g.scale.set(1, 0.3 + k * 0.7, 1);
f.m.opacity = 0.45 * (1 - k);
if (k >= 1) {
scene.remove(f.g);
f.g.geometry.dispose();
f.m.dispose();
BDL_FX.splice(i, 1);
}
}
return BDL_FX.length > 0;
},
function (msg, tried) {
var B = BDL.board, fns = {}, h = bdlHead("🎁 World Bundles");
h += "<div style='opacity:.85;font-size:12.5px;margin:4px 0 8px'>Each bundle is a house of your own standing in its world (everyone sees it; only you go in, and it hides two secret rooms), a pet, a look, a mount with a war ability, and <b>1,000 gold</b>. For players aged 18 and over.</div>";
if (msg)
h += "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>";
if (!bdlSigned()) {
worldCard(h + "<div>Sign in first: a bundle belongs to an account.</div>", {});
return;
}
if (!B && !BDL.missing && !tried) {
worldCard(h + "<div style='opacity:.7'>Opening the bundle shop…</div>", {});
bdlLoadDone().then(function () { bdlCard(msg, true); });
return;
}
BDL_ORDER.forEach(function (k) {
var D = BDL_DEFS[k], row = B && B.bundles ? B.bundles.filter(function (b) { return b.key === k; })[0] : null, own = bdlOwns(k), wait = B && B.waiting && B.waiting.filter(function (w) { return w.bundle === k; })[0];
h += "<div style='margin:10px 0 4px;padding:8px 10px;border:1px solid rgba(255,231,176,.25);border-radius:6px'>";
h += "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>" + D.icon + " " + bdlEsc(D.name) + (own ? " <span style='color:#9AE0A0;font-size:12px'>✓ yours</span>" : "") + "</div>";
h += "<div style='font-size:12.5px;line-height:1.45;margin-top:4px'>🏠 <b>" + bdlEsc(D.house) + "</b> on " + bdlEsc(D.where) + "<br>" +
D.pet.icon + " <b>" + bdlEsc(D.pet.name) + "</b>: " + bdlEsc(D.pet.about) + "<br>👘 <b>" + bdlEsc(D.skin.name) + "</b>: " + bdlEsc(D.skin.about) + "<br>" +
"🐉 <b>" + bdlEsc(D.mount.name) + "</b>, flies; " + D.mount.power.icon + " <b>" + bdlEsc(D.mount.power.name) + "</b> strikes every foe " + (D.mount.power.key === "dive" ? "around you" : "in a line ahead") + "<br>🪙 <b>1,000 gold</b></div>";
if (own) {
fns["go" + k] = function () { worldCard(null); bdlGoHome(k); };
h += worldBtn("go" + k, "🏠 Go to " + bdlEsc(D.house), "stand at your front door");
var worn = bdlLookWorn() === k;
fns["wear" + k] = function () { if (worn)
bdlLookOff();
else
bdlLookWear(k); bdlCard(); };
h += worldBtn("wear" + k, worn ? "👘 Take off " + bdlEsc(D.skin.name) : "👘 Wear " + bdlEsc(D.skin.name));
fns["ride" + k] = function () { worldCard(null); bdlRide(k); };
h += worldBtn("ride" + k, "🐉 Ride " + bdlEsc(D.mount.name), "outdoors; J or the button for " + bdlEsc(D.mount.power.name));
h += "<div style='font-size:12px;opacity:.75'>" + D.pet.icon + " " + bdlEsc(D.pet.name) + " is with your pets (Menu, Pets).</div>";
}
else if (wait) {
h += "<div style='font-size:12.5px;color:#FFD8A0;margin-top:6px'>Waiting for your payment of " + bdlMoney(wait.usd) + " (reference <b>GX-" + wait.id + "</b>). Everything arrives the moment it is confirmed.</div>";
fns["pay" + k] = function () { bdlBuy(k); };
h += worldBtn("pay" + k, "💳 Open the payment page again");
}
else if (row && row.on_sale === false) {
h += "<div style='font-size:12.5px;opacity:.7;margin-top:6px'>Not on sale just now.</div>";
}
else {
fns["buy" + k] = function () { bdlBuy(k); };
h += worldBtn("buy" + k, "🛒 Buy for " + bdlMoney(row ? row.usd : 29.99), "18 and over; the gold arrives with it");
}
h += "</div>";
});
if (BDL.missing)
h += "<div style='opacity:.7;font-size:12px'>The bundle shop opens with the next city update.</div>";
worldCard(h, fns);
},
function (k) {
if (typeof ageAdult === "function" && !ageAdult()) {
bdlCard("World Bundles come with gold, so they are for players aged 18 and over.");
return;
}
bdlRpc("bundle_buy_request", { p_bundle: k }).then(function (o) {
if (!o || o.ok === false) {
bdlCard(bdlEsc((o && o.say) || "That didn't go through."));
return;
}
var ref = "GX-" + o.id;
if (typeof safeUrl === "function" && safeUrl(o.pay_url)) {
try {
var u = o.pay_url + (o.pay_url.indexOf("?") > -1 ? "&" : "?") + "ref=" + encodeURIComponent(ref) + "&amount=" + encodeURIComponent(Number(o.usd).toFixed(2));
window.open(u, "_blank", "noopener");
}
catch (e) { }
}
bdlLoad(true).then(function () { bdlCard("<b>" + bdlEsc(o.name) + " for " + bdlMoney(o.usd) + ".</b> Your reference is <b>" + ref + "</b>. " + (o.pay_url ? "The payment page is opening; put the reference in the note." : "Pay with the payment button on the website and put the reference in the note.") + " Everything arrives the moment the payment is confirmed."); });
}).catch(function (e) { var m = String((e && e.message) || e || ""); bdlCard(/function|404|PGRST|does not exist|schema cache/i.test(m) ? "The bundle shop opens with the next city update." : bdlEsc(m)); });
},
function (k) {
var D = BDL_DEFS[k], mine = null;
((BDL.board && BDL.board.mine) || []).forEach(function (m) { if (m.bundle === k)
mine = m; });
var plot = mine ? mine.plot : null;
if (plot == null && bdlKeeper()) {
var b = BDL.built[D.world], kh = b && b.list.filter(function (h) { return h.keeper; })[0];
plot = kh ? kh.plot : 0;
}
if (plot == null) {
bdlSay("Your house is being raised. Try again in a moment.");
bdlLoad(true);
return;
}
var ok = k === "verne" && typeof vrnGo === "function" ? vrnGo() : k === "davinci" && typeof davGo === "function" ? davGo() : worldGo(D.world);
if (!ok && WLD.on !== D.world)
return;
var tries = 0;
function place() {
try {
var again = function () { if (++tries < 30)
setTimeout(place, 400); };
if (WLD.on !== D.world || !WLD.w)
return again();
var at = bdlPlotAt(D, plot);
if (!at)
return again();
var s = Math.sin(at.rot), c = Math.cos(at.rot), door = null;
bdlRaise();
var b = BDL.built[D.world];
if (b)
b.list.forEach(function (h) { if (h.plot === plot)
door = h.door; });
if (!door)
return again();
camera.position.set(WLD.w.base + door.x + s * 2.2, door.y + 1.72, door.z + c * 2.2);
yaw = Math.atan2(s, c);
pitch = 0;
bdlSay("🏠 <b>" + bdlEsc(D.house) + "</b>, on " + bdlEsc(D.street) + ". Your door is in front of you.");
}
catch (e) {
if (window.console)
console.warn("[bundles] home", e);
}
}
setTimeout(place, 400);
},
function (k) {
var D = BDL_DEFS[k], t = ((typeof myThings !== "undefined" && myThings) || []).filter(function (x) { return x.archetype === D.mount.arch; })[0];
if (store.inside) {
bdlSay("Mounts wait outside. Step out of doors, then ride.");
return;
}
if (!t && bdlKeeper()) {
rideArch = D.mount.arch;
riding = D.mount.name;
rideSpeed = 3.4;
if (typeof canFly !== "undefined")
canFly = true;
try {
var L = meLook();
L.ride = rideArch;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
bdlSay("<b>You ride " + bdlEsc(D.mount.name) + ".</b> J (or the button) for " + bdlEsc(D.mount.power.name) + ".");
return;
}
if (!t) {
bdlSay("Your " + bdlEsc(D.mount.name) + " arrives with " + bdlEsc(D.name) + ".");
return;
}
if (typeof ride === "function")
ride(t.name);
bdlSay("<b>You ride " + bdlEsc(D.mount.name) + ".</b> It flies (jump to rise). J (or the button) for " + bdlEsc(D.mount.power.name) + ".");
}
];
});
