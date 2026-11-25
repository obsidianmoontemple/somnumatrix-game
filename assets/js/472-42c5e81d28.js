/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EDS = { rid: null, ox: 0, oz: 0, half: 630, step: 4.5, n: 0, h: null, ohalf: 1530, ostep: 30, on: 0, oh: null, sig: "", t: 0, mesh: null, life: null };
var EDS_FLAT = [], EDS_ROADS = [], EDS_DIPS = [];
function edsLite() { return typeof LITE !== "undefined" && !!LITE; }
function edsSm(t) { return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t); }
function edsDune(x, z) { return __ZC(472, 0, this, arguments, new.target); }
function edsSegD(px, pz, ax, az, bx, bz) {
var dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz, t = L ? ((px - ax) * dx + (pz - az) * dz) / L : 0;
t = t < 0 ? 0 : t > 1 ? 1 : t;
var qx = ax + dx * t - px, qz = az + dz * t - pz;
return Math.sqrt(qx * qx + qz * qz);
}
function edsMask(x, z, keep, segs) { return __ZC(472, 1, this, arguments, new.target); }
function edsRawH(x, z, keep, segs) { return __ZC(472, 2, this, arguments, new.target); }
function edsGridH(g, n, half, step, x, z) { return __ZC(472, 3, this, arguments, new.target); }
function edsH(x, z) {
if (!EDS.h)
return 0;
var H = EDS.half;
if (x >= -H && x <= H && z >= -H && z <= H)
return edsGridH(EDS.h, EDS.n, H, EDS.step, x, z);
var O = EDS.ohalf;
if (x < -O || x > O || z < -O || z > O)
return 0;
return edsGridH(EDS.oh, EDS.on, O, EDS.ostep, x, z);
}
function edsOrigin(r) { return (typeof blockOrigin === "function" && typeof PITCH !== "undefined") ? blockOrigin(Math.round(r.x0 / PITCH), 0) : { x: r.x0, z: 0 }; }
function edsSigOf(r) { var n = 0, sx = 0; (store.objects || []).forEach(function (o) { if ((o.realm || 0) === r.id) {
n++;
sx += Math.round(o.x) + Math.round(o.z);
} }); return n + ":" + sx + ":" + (edsLite() ? 1 : 0); }
function edsSheet(g, n, half, step, skipInside, tintFn) { return __ZC(472, 4, this, arguments, new.target); }
function edsGround(r) { return __ZC(472, 5, this, arguments, new.target); }
(function () {
if (typeof terrainY !== "function" || typeof realmGround !== "function" || typeof ldBuild !== "function")
return;
var ty = terrainY;
terrainY = function (x, z) {
if (EDS.h && EDS.rid !== null && typeof store !== "undefined" && store.here === EDS.rid) {
var lx = x - EDS.ox, lz = z - EDS.oz;
if (lx > -1530 && lx < 1530 && lz > -1530 && lz < 1530)
return edsH(lx, lz);
}
return ty(x, z);
};
var rg = realmGround;
realmGround = function (r) {
if (r && r.kind === "desert") {
try {
if (!realmGrounds[r.id])
edsGround(r);
return;
}
catch (e) {
if (window.console)
console.warn("[endless-desert] ground", e);
}
}
return rg.apply(this, arguments);
};
var lb = ldBuild;
ldBuild = function (r) {
if (r && r.kind === "desert") {
try {
edsGround(r);
}
catch (e) {
if (window.console)
console.warn("[endless-desert] ground", e);
}
}
return lb.apply(this, arguments);
};
if (typeof REALM_SCENERY !== "undefined")
REALM_SCENERY.desert = ["sandpillars", "rock", "cactus", "rock"];
})();
"use strict";
var EDS_TEX = {};
function edsCanvasTex(key, W, H, tile, fn, o) { return __ZC(472, 6, this, arguments, new.target); }
var EDS_INK = { blue: "#2447A8", green: "#2F8558", red: "#B8372A", gold: "#D9A93A", black: "#1C1612", white: "#F6EEDC", skin: "#A8512E", skinF: "#D9A45C", sky: "#3F7FBF", tur: "#2FA3A0" };
function edsRnd(seed) { var s = (seed >>> 0) || 9; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
var EDS_SIGNS = [
function (c) { c.beginPath(); c.ellipse(0, -0.2, 0.13, 0.2, 0, 0, 6.283); c.stroke(); c.fillRect(-0.045, -0.02, 0.09, 0.48); c.fillRect(-0.25, 0.0, 0.5, 0.085); },
function (c) { return __ZC(472, 7, this, arguments, new.target); },
function (c) { c.fillRect(-0.07, -0.1, 0.14, 0.52); c.fillRect(-0.16, 0.36, 0.32, 0.07); for (var i = 0; i < 4; i++)
c.fillRect(-0.2, -0.42 + i * 0.1, 0.4, 0.055); },
function (c) { c.beginPath(); c.moveTo(0.02, -0.28); c.lineTo(0.02, 0.36); c.moveTo(0.02, 0.36); c.lineTo(-0.08, 0.44); c.moveTo(0.02, 0.36); c.lineTo(0.12, 0.44); c.moveTo(0.02, -0.28); c.lineTo(-0.22, -0.4); c.lineTo(-0.2, -0.26); c.moveTo(0.02, -0.3); c.lineTo(0.14, -0.42); c.stroke(); },
function (c) { c.beginPath(); c.moveTo(-0.02, 0.44); c.lineTo(0, -0.1); c.stroke(); c.beginPath(); c.moveTo(0, 0.14); c.quadraticCurveTo(-0.24, -0.1, 0.02, -0.44); c.quadraticCurveTo(0.2, -0.12, 0, 0.14); c.fill(); },
function (c) { return __ZC(472, 8, this, arguments, new.target); },
function (c) { return __ZC(472, 9, this, arguments, new.target); },
function (c) { c.beginPath(); c.moveTo(-0.42, 0.04); for (var i = 0; i < 7; i++)
c.lineTo(-0.42 + (i + 0.5) * 0.12, i % 2 ? 0.06 : -0.08); c.lineTo(0.42, 0.04); c.stroke(); },
function (c) { c.beginPath(); c.moveTo(-0.38, 0); c.quadraticCurveTo(0, -0.2, 0.38, 0); c.quadraticCurveTo(0, 0.2, -0.38, 0); c.fill(); },
function (c) { c.beginPath(); c.moveTo(-0.14, -0.42); c.lineTo(0.02, -0.42); c.lineTo(0.02, 0.24); c.lineTo(0.32, 0.3); c.lineTo(0.32, 0.42); c.lineTo(-0.14, 0.42); c.closePath(); c.fill(); },
function (c) {
c.beginPath();
c.moveTo(-0.42, 0.14);
c.quadraticCurveTo(-0.2, -0.08, 0, 0.1);
c.quadraticCurveTo(0.16, 0.22, 0.3, 0.0);
c.lineTo(0.4, -0.06);
c.stroke();
c.beginPath();
c.moveTo(0.3, -0.02);
c.lineTo(0.26, -0.2);
c.moveTo(0.36, -0.04);
c.lineTo(0.38, -0.2);
c.stroke();
},
function (c) {
c.beginPath();
c.moveTo(-0.34, 0.4);
c.lineTo(0.1, 0.4);
c.quadraticCurveTo(0.3, 0.3, 0.06, 0.12);
c.quadraticCurveTo(-0.12, -0.04, 0.04, -0.3);
c.stroke();
c.beginPath();
c.ellipse(0.06, -0.26, 0.12, 0.17, 0.2, 0, 6.283);
c.fill();
},
function (c) { c.beginPath(); c.moveTo(-0.38, -0.08); c.lineTo(0.38, -0.08); c.quadraticCurveTo(0.3, 0.26, 0, 0.26); c.quadraticCurveTo(-0.3, 0.26, -0.38, -0.08); c.fill(); },
function (c) { c.beginPath(); c.moveTo(-0.24, 0.16); c.quadraticCurveTo(-0.22, -0.2, 0, -0.2); c.quadraticCurveTo(0.22, -0.2, 0.24, 0.16); c.closePath(); c.fill(); },
function (c) { c.beginPath(); c.arc(0, 0, 0.27, 0, 6.283); c.stroke(); c.beginPath(); c.arc(0, 0, 0.08, 0, 6.283); c.fill(); },
function (c) { return __ZC(472, 10, this, arguments, new.target); },
function (c) { c.beginPath(); c.moveTo(-0.06, 0.44); c.lineTo(-0.02, -0.2); c.quadraticCurveTo(0.04, -0.48, 0.2, -0.36); c.quadraticCurveTo(0.26, -0.1, 0.08, 0.3); c.lineTo(0.02, 0.44); c.closePath(); c.fill(); },
function (c) { return __ZC(472, 11, this, arguments, new.target); },
function (c) { c.beginPath(); c.moveTo(0, 0.44); c.lineTo(0, 0.04); c.stroke(); c.beginPath(); c.moveTo(0, 0.08); c.lineTo(-0.3, -0.3); c.lineTo(-0.12, -0.16); c.lineTo(0, -0.42); c.lineTo(0.12, -0.16); c.lineTo(0.3, -0.3); c.closePath(); c.fill(); },
function (c) { c.beginPath(); c.moveTo(-0.1, 0.44); c.lineTo(-0.1, -0.3); c.quadraticCurveTo(-0.1, -0.44, 0.04, -0.44); c.quadraticCurveTo(0.16, -0.44, 0.16, -0.3); c.lineTo(0.16, -0.04); c.stroke(); },
function (c) { c.fillRect(-0.42, -0.035, 0.84, 0.07); c.fillRect(-0.12, -0.12, 0.06, 0.24); c.fillRect(0.06, -0.12, 0.06, 0.24); },
function (c) { c.strokeRect(-0.2, -0.2, 0.4, 0.4); c.beginPath(); c.moveTo(-0.2, -0.07); c.lineTo(0.2, -0.07); c.moveTo(-0.2, 0.07); c.lineTo(0.2, 0.07); c.stroke(); },
function (c) { c.beginPath(); c.moveTo(-0.08, 0.2); c.lineTo(-0.34, 0.2); c.lineTo(-0.34, -0.2); c.lineTo(0.34, -0.2); c.lineTo(0.34, 0.2); c.lineTo(0.08, 0.2); c.stroke(); },
function (c) { c.beginPath(); c.moveTo(-0.42, 0.08); c.lineTo(0.2, 0.08); c.lineTo(0.42, -0.02); c.lineTo(0.4, -0.1); c.lineTo(0.18, -0.04); c.lineTo(-0.3, -0.04); c.lineTo(-0.42, -0.16); c.closePath(); c.fill(); },
function (c) { c.beginPath(); for (var i = 0; i < 10; i++) {
var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.1 : 0.36;
c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
} c.closePath(); c.fill(); },
function (c) { c.beginPath(); c.arc(0, -0.06, 0.24, 0, 6.283); c.stroke(); c.fillRect(-0.32, 0.2, 0.64, 0.07); },
function (c) { c.beginPath(); for (var i = 0; i < 3; i++) {
c.ellipse(0, -0.28 + i * 0.27, 0.1, 0.14, 0, 0, 6.283);
} c.stroke(); },
function (c) { c.beginPath(); c.moveTo(-0.36, 0.2); c.lineTo(0.1, -0.26); c.lineTo(0.36, -0.26); c.lineTo(0.36, 0.2); c.closePath(); c.fill(); },
function (c) { return __ZC(472, 12, this, arguments, new.target); },
function (c) { c.beginPath(); c.moveTo(0, 0.44); c.lineTo(0, -0.42); c.moveTo(0, 0.1); c.quadraticCurveTo(-0.2, 0.0, -0.28, -0.22); c.moveTo(0, 0.1); c.quadraticCurveTo(0.2, 0.0, 0.28, -0.22); c.moveTo(0, 0.3); c.lineTo(-0.2, 0.2); c.moveTo(0, 0.3); c.lineTo(0.2, 0.2); c.stroke(); },
function (c) { c.fillRect(-0.24, -0.2, 0.08, 0.4); c.fillRect(-0.04, -0.2, 0.08, 0.4); c.fillRect(0.16, -0.2, 0.08, 0.4); },
function (c) { c.beginPath(); c.moveTo(-0.1, -0.34); c.lineTo(0.1, -0.34); c.lineTo(0.08, -0.2); c.quadraticCurveTo(0.34, 0.0, 0.16, 0.3); c.quadraticCurveTo(0, 0.42, -0.16, 0.3); c.quadraticCurveTo(-0.34, 0.0, -0.08, -0.2); c.closePath(); c.fill(); c.fillRect(-0.24, -0.12, 0.08, 0.06); c.fillRect(0.16, -0.12, 0.08, 0.06); }
];
var EDS_SIGNCOL = ["black", "blue", "green", "red", "green", "gold", "gold", "blue", "red", "skin", "gold", "green", "green", "black", "red", "blue", "green", "black", "blue", "black", "black", "green", "blue", "skin", "gold", "blue", "green", "red", "gold", "green", "black", "red"];
function edsSign(c, k, x, y, s, mono) { return __ZC(472, 13, this, arguments, new.target); }
function edsCartouche(c, x, y, w, h, R, mono) { return __ZC(472, 14, this, arguments, new.target); }
function edsColumn(c, x, y, w, h, R, mono) { return __ZC(472, 15, this, arguments, new.target); }
function edsFigure(c, kind, x, y, H, dir, o) { return __ZC(472, 16, this, arguments, new.target); }
function edsOfferings(c, x, y, s, mono) { return __ZC(472, 17, this, arguments, new.target); }
function edsGround2d(c, W, H, base, R, grain) {
c.fillStyle = base;
c.fillRect(0, 0, W, H);
for (var i = 0; i < W * H / ((grain || 1) * 26); i++) {
var a = R();
c.fillStyle = a < 0.5 ? "rgba(90,60,30," + (0.03 + R() * 0.05) + ")" : "rgba(255,246,220," + (0.04 + R() * 0.06) + ")";
c.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2);
}
}
function edsBand(c, y, W, h, cols) { var n = Math.round(W / (h * 1.6)), w = W / n; for (var i = 0; i < n; i++) {
c.fillStyle = cols[i % cols.length];
c.fillRect(i * w, y, w + 0.5, h);
} c.strokeStyle = "rgba(28,22,18,.9)"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, y + 0.5); c.lineTo(W, y + 0.5); c.moveTo(0, y + h - 0.5); c.lineTo(W, y + h - 0.5); c.stroke(); }
function edsWallPaint(c, W, H, o) { return __ZC(472, 18, this, arguments, new.target); }
function edsSurf(name) { return __ZC(472, 19, this, arguments, new.target); }
function edsMural(name) { return __ZC(472, 20, this, arguments, new.target); }
"use strict";
var EDS_MAT = {}, EDS_GEO = {};
function edsM(col, tex, o) { return __ZC(472, 21, this, arguments, new.target); }
function edsPut(G, geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); G.add(m); return m; }
function edsBox(G, mat, w, h, d, x, y, z, ry, rx, rz) { var g = new THREE.BoxGeometry(w, h, d); if (mat.map && typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]); return edsPut(G, g, mat, x, y, z, rx, ry, rz); }
function edsCyl(G, mat, rt, rb, h, x, y, z, seg, open) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 10, 1, !!open); if (mat.map && mat.map.repeat.x !== 1 && typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]); return edsPut(G, g, mat, x, y, z); }
function edsCone(G, mat, r, h, x, y, z, seg) { return edsPut(G, new THREE.ConeGeometry(r, h, seg || 8), mat, x, y, z); }
function edsSph(G, mat, r, x, y, z, sx, sy, sz, seg) { var m = edsPut(G, new THREE.SphereGeometry(r, seg || 12, Math.max(6, Math.round((seg || 12) * 0.7))), mat, x, y, z); if (sx)
m.scale.set(sx, sy || sx, sz || sx); return m; }
function edsLathe(G, mat, prof, x, y, z, seg) { return edsPut(G, new THREE.LatheGeometry(prof.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg || 12), mat, x, y, z); }
function edsSolid(X, Z, rot, lx, lz, hw, hd, h, lrot) { if (typeof LD === "undefined" || !LD.solids)
return; var c = Math.cos(rot), s = Math.sin(rot); LD.solids.push({ x: X + lx * c + lz * s, z: Z - lx * s + lz * c, rot: rot + (lrot || 0), hw: hw, hd: hd, h: h || 4 }); }
function edsSolidR(X, Z, rot, lx, lz, r, h) { if (typeof LD === "undefined" || !LD.solids)
return; var c = Math.cos(rot), s = Math.sin(rot); LD.solids.push({ x: X + lx * c + lz * s, z: Z - lx * s + lz * c, r: r, h: h || 4 }); }
function edsFrondGeo(L, droop) { return __ZC(472, 22, this, arguments, new.target); }
function edsPalm(G, x, y, z, h, seed, lite) { return __ZC(472, 23, this, arguments, new.target); }
function edsBush(G, x, y, z, s, col) { var m = edsM(col || 0x7A8A4A); edsPut(G, new THREE.IcosahedronGeometry(0.7 * s, 1), m, x, y + 0.45 * s, z).scale.set(1.3, 0.8, 1.2); edsPut(G, new THREE.IcosahedronGeometry(0.5 * s, 1), m, x + 0.6 * s, y + 0.35 * s, z + 0.3 * s); }
function edsAcacia(G, x, y, z, s, seed) { return __ZC(472, 24, this, arguments, new.target); }
function edsRock(G, x, y, z, s, seed, col, tex) { return __ZC(472, 25, this, arguments, new.target); }
function edsSphinx(G, o) { return __ZC(472, 26, this, arguments, new.target); }
function edsLittleSphinx(G, x, z, ry, ram) { return __ZC(472, 27, this, arguments, new.target); }
function edsPyrBand(a, H, t0, t1) { return __ZC(472, 28, this, arguments, new.target); }
function edsPyramid(G, R, H, o) { return __ZC(472, 29, this, arguments, new.target); }
function edsObelisk(G, x, z, h, ry) { return __ZC(472, 30, this, arguments, new.target); }
function edsPylonTower(G, x, z, w, h, d) { return __ZC(472, 31, this, arguments, new.target); }
function edsPylon(G, x, z, W, H, D, gate) { return __ZC(472, 32, this, arguments, new.target); }
function edsColumn3(G, x, z, h, r, lite) { return __ZC(472, 33, this, arguments, new.target); }
function edsColossus(G, x, z, ry, s, o) { return __ZC(472, 34, this, arguments, new.target); }
function edsRoom(G, X, Z, rot, lx, lz, w, d, h, o) { return __ZC(472, 35, this, arguments, new.target); }
function edsRug(G, x, z, w, d, ry, col) { var m = edsPut(G, new THREE.PlaneGeometry(w, d), edsM(col || 0xFFFFFF, "kilim"), x, 0.04, z, -Math.PI / 2, 0, ry || 0); m.rotation.order = "YXZ"; m.rotation.set(-Math.PI / 2, ry || 0, 0); return m; }
function edsCushion(G, x, z, col, s) { edsSph(G, edsM(col), 0.36 * (s || 1), x, 0.16, z, 1.2, 0.42, 1.2, 8); }
var EDS_JARS = [[[0, 0], [0.2, 0], [0.34, 0.22], [0.36, 0.5], [0.24, 0.78], [0.14, 0.86], [0.17, 0.98], [0.2, 1.0]],
[[0, 0], [0.14, 0], [0.3, 0.3], [0.2, 0.7], [0.09, 0.9], [0.09, 1.2], [0.14, 1.24]],
[[0, 0], [0.24, 0], [0.3, 0.1], [0.3, 0.36], [0.34, 0.4], [0, 0.4]],
[[0, 0], [0.1, 0], [0.14, 0.12], [0.34, 0.2], [0.4, 0.36], [0.26, 0.48], [0.3, 0.56]],
[[0, 0], [0.3, 0], [0.42, 0.3], [0.46, 0.7], [0.34, 1.0], [0.22, 1.1], [0.26, 1.3], [0.32, 1.34]]];
function edsJar(G, x, y, z, k, s, col) { var m = edsLathe(G, edsM(col || [0xB8683A, 0xC8884A, 0x8A5A3A, 0xD8A868, 0xA85A30][k % 5], null, { ds: 1 }), EDS_JARS[k % EDS_JARS.length], x, y, z, 10); m.scale.setScalar(s || 1); return m; }
function edsLamp(G, x, y, z, s) {
s = s || 1;
var br = edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.4 });
edsLathe(G, br, [[0, 0], [0.1, 0], [0.05, 0.06], [0.16, 0.14], [0.2, 0.3], [0.08, 0.42], [0.03, 0.56], [0, 0.6]], x, y, z, 8).scale.setScalar(s);
edsSph(G, edsM(0xFFD070, null, { basic: 1 }), 0.07 * s, x, y + 0.25 * s, z, 1, 1.3, 1, 6);
}
function edsFire(G, x, z, s) { return __ZC(472, 36, this, arguments, new.target); }
function edsTent(G, X, Z, rot, lx, lz, w, d, ry, seed, lite) { return __ZC(472, 37, this, arguments, new.target); }
var EDS_FRUIT = {
melon: function (G, x, y, z, s) { edsSph(G, edsM(0x2E6A30), 0.26 * s, x, y + 0.2 * s, z, 1.25, 0.95, 1, 10); for (var i = 0; i < 4; i++) {
var st = edsPut(G, new THREE.TorusGeometry(0.262 * s, 0.012 * s, 3, 12), edsM(0x8AB85A), x, y + 0.2 * s, z, 0, i * 0.8, Math.PI / 2);
st.scale.set(0.95, 1, 1.25);
} },
melonCut: function (G, x, y, z, s) { var m = edsPut(G, new THREE.SphereGeometry(0.26 * s, 10, 6, 0, Math.PI), edsM(0x2E6A30), x, y + 0.02, z, -Math.PI / 2, 0, 0); m.scale.set(1.25, 1, 0.95); edsCyl(G, edsM(0xD83A3A), 0.24 * s, 0.24 * s, 0.02, x, y + 0.03, z, 12).scale.set(1.25, 1, 0.95); },
pomegranate: function (G, x, y, z, s) { edsSph(G, edsM(0xA82838), 0.11 * s, x, y + 0.11 * s, z, 1, 0.95, 1, 8); edsPut(G, new THREE.CylinderGeometry(0.05 * s, 0.025 * s, 0.06 * s, 6, 1, true), edsM(0x8A2030, null, { ds: 1 }), x, y + 0.235 * s, z); },
fig: function (G, x, y, z, s) { edsLathe(G, edsM(0x5A2E5A), [[0, 0], [0.07, 0.02], [0.09, 0.08], [0.06, 0.15], [0.02, 0.2], [0, 0.21]], x, y, z, 7).scale.setScalar(s); },
orange: function (G, x, y, z, s) { edsSph(G, edsM(0xE8882A), 0.085 * s, x, y + 0.085 * s, z, 1, 0.95, 1, 8); edsSph(G, edsM(0x3A6A2A), 0.015 * s, x, y + 0.165 * s, z); },
lemon: function (G, x, y, z, s) { var m = edsSph(G, edsM(0xE8D040), 0.07 * s, x, y + 0.07 * s, z, 1.45, 1, 1, 8); edsCone(G, edsM(0xE8D040), 0.025 * s, 0.05 * s, x + 0.11 * s, y + 0.07 * s, z, 5).rotation.z = -Math.PI / 2; },
dates: function (G, x, y, z, s) { var R = edsRnd(Math.round(x * 31 + z * 17) + 5); edsCyl(G, edsM(0xB8A050), 0.012 * s, 0.012 * s, 0.3 * s, x, y + 0.05 * s, z, 4).rotation.z = Math.PI / 2; for (var i = 0; i < 9; i++)
edsSph(G, edsM(i % 3 ? 0x6A3A1A : 0x8A4E22), 0.028 * s, x - 0.13 * s + i * 0.032 * s, y + 0.03 * s + R() * 0.04 * s, z + (R() - 0.5) * 0.1 * s, 1, 1, 1.9, 6).rotation.y = R() * 3; },
grapes: function (G, x, y, z, s) { var k = 0; for (var r = 0; r < 4; r++)
for (var i = 0; i < 4 - r; i++, k++)
edsSph(G, edsM(k % 2 ? 0x5A2A6A : 0x6E3A80), 0.035 * s, x + (i - (3 - r) / 2) * 0.06 * s, y + 0.04 * s + (r % 2) * 0.03 * s, z + r * 0.055 * s, 1, 1, 1, 6); edsBox(G, edsM(0x4A7A3A), 0.1 * s, 0.01, 0.08 * s, x, y + 0.09 * s, z - 0.04 * s); },
banana: function (G, x, y, z, s) { for (var i = 0; i < 4; i++) {
var b = edsPut(G, new THREE.TorusGeometry(0.16 * s, 0.026 * s, 5, 8, Math.PI * 0.55), edsM(0xE8C838), x + (i - 1.5) * 0.045 * s, y + 0.03 * s, z, Math.PI / 2 - 0.3, 0, 0.5);
} edsBox(G, edsM(0x5A4A2A), 0.16 * s, 0.03 * s, 0.03 * s, x, y + 0.05 * s, z - 0.1 * s); },
onion: function (G, x, y, z, s) { edsLathe(G, edsM(0xC89A5A), [[0, 0], [0.06, 0.01], [0.085, 0.07], [0.05, 0.13], [0.012, 0.17], [0.012, 0.26]], x, y, z, 7).scale.setScalar(s); },
garlic: function (G, x, y, z, s) { edsLathe(G, edsM(0xF0E8D8), [[0, 0], [0.05, 0.01], [0.065, 0.05], [0.03, 0.1], [0.01, 0.15]], x, y, z, 6).scale.setScalar(s); },
carrot: function (G, x, y, z, s) { var c = edsCone(G, edsM(0xE87A2A), 0.035 * s, 0.26 * s, x, y + 0.035 * s, z, 6); c.rotation.z = Math.PI / 2; var t = edsCone(G, edsM(0x4A8A3A), 0.04 * s, 0.14 * s, x - 0.19 * s, y + 0.04 * s, z, 4); t.rotation.z = Math.PI / 2; },
cucumber: function (G, x, y, z, s) { var c = edsPut(G, new THREE.CylinderGeometry(0.035 * s, 0.035 * s, 0.26 * s, 7), edsM(0x3A7A34), x, y + 0.035 * s, z, 0, 0, Math.PI / 2); edsSph(G, edsM(0x3A7A34), 0.035 * s, x + 0.13 * s, y + 0.035 * s, z); edsSph(G, edsM(0x3A7A34), 0.035 * s, x - 0.13 * s, y + 0.035 * s, z); },
aubergine: function (G, x, y, z, s) { var a = edsLathe(G, edsM(0x3A1E4A), [[0, 0], [0.06, 0.02], [0.085, 0.1], [0.06, 0.2], [0.035, 0.27], [0, 0.28]], x, y + 0.08 * s, z, 7); a.scale.setScalar(s); a.rotation.z = Math.PI / 2.2; edsCone(G, edsM(0x3A6A2A), 0.05 * s, 0.05 * s, x - 0.25 * s, y + 0.11 * s, z, 5).rotation.z = Math.PI / 2; },
pepper: function (G, x, y, z, s) { var c = edsCone(G, edsM(0xC82A1E), 0.03 * s, 0.2 * s, x, y + 0.03 * s, z, 5); c.rotation.z = Math.PI / 2 + 0.2; edsCyl(G, edsM(0x3A6A2A), 0.008 * s, 0.008 * s, 0.06 * s, x - 0.12 * s, y + 0.05 * s, z, 3); },
pumpkin: function (G, x, y, z, s) { for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283;
edsSph(G, edsM(i % 2 ? 0xD8822A : 0xE0902E), 0.16 * s, x + Math.cos(a) * 0.09 * s, y + 0.15 * s, z + Math.sin(a) * 0.09 * s, 0.7, 0.95, 0.7, 7);
} edsCyl(G, edsM(0x5A6A2A), 0.02 * s, 0.03 * s, 0.1 * s, x, y + 0.33 * s, z, 5); },
cabbage: function (G, x, y, z, s) { edsSph(G, edsM(0x8AB85A), 0.15 * s, x, y + 0.13 * s, z, 1, 0.85, 1, 8); for (var i = 0; i < 5; i++) {
var a = i / 5 * 6.283, l = edsPut(G, new THREE.SphereGeometry(0.16 * s, 6, 4, 0, Math.PI, 0, Math.PI / 2), edsM(0x5A9A44, null, { ds: 1 }), x + Math.cos(a) * 0.06 * s, y + 0.04 * s, z + Math.sin(a) * 0.06 * s, 0.6, -a + Math.PI / 2, 0);
l.rotation.order = "YXZ";
} },
wheat: function (G, x, y, z, s) { for (var i = 0; i < 7; i++) {
var a = i * 0.9, st = edsCyl(G, edsM(0xD8B85A), 0.006 * s, 0.006 * s, 0.5 * s, x + Math.cos(a) * 0.03 * s, y + 0.25 * s, z + Math.sin(a) * 0.03 * s, 3);
st.rotation.set(Math.sin(a) * 0.15, 0, Math.cos(a) * 0.15);
edsSph(G, edsM(0xC8A040), 0.018 * s, x + Math.cos(a) * 0.07 * s, y + 0.52 * s, z + Math.sin(a) * 0.07 * s, 1, 3, 1, 5);
} },
bread: function (G, x, y, z, s) { edsCyl(G, edsM(0xD8A860), 0.16 * s, 0.17 * s, 0.03 * s, x, y + 0.015 * s, z, 10); },
pear: function (G, x, y, z, s) { edsLathe(G, edsM(0xB8C050), [[0, 0], [0.05, 0.01], [0.075, 0.06], [0.06, 0.12], [0.035, 0.17], [0.02, 0.2], [0, 0.21]], x, y, z, 7).scale.setScalar(s); edsCyl(G, edsM(0x5A4A2A), 0.005 * s, 0.005 * s, 0.05 * s, x, y + 0.23 * s, z, 3); },
apricot: function (G, x, y, z, s) { edsSph(G, edsM(0xF0A040), 0.055 * s, x, y + 0.055 * s, z, 1, 0.95, 0.9, 7); },
olive: function (G, x, y, z, s) { for (var i = 0; i < 7; i++)
edsSph(G, edsM(i % 2 ? 0x4A5A2A : 0x2A2A1E), 0.022 * s, x + Math.cos(i) * 0.05 * s, y + 0.022 * s, z + Math.sin(i * 1.7) * 0.05 * s, 1, 1.4, 1, 5); }
};
function edsHeap(G, kind, x, y, z, n, s, spread) { return __ZC(472, 38, this, arguments, new.target); }
function edsCrate(G, x, y, z, w, d, ry) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; G.add(g); var m = edsM(0xA88454, "wood"); edsBox(g, m, w, 0.04, d, 0, 0.02, 0); edsBox(g, m, w, 0.22, 0.03, 0, 0.13, -d / 2); edsBox(g, m, w, 0.22, 0.03, 0, 0.13, d / 2); edsBox(g, m, 0.03, 0.22, d, -w / 2, 0.13, 0); edsBox(g, m, 0.03, 0.22, d, w / 2, 0.13, 0); return g; }
function edsBasket(G, x, y, z, s) { return edsLathe(G, edsM(0xC8A060, null, { ds: 1 }), [[0, 0], [0.22, 0], [0.3, 0.12], [0.32, 0.26], [0.3, 0.28], [0.28, 0.14], [0.2, 0.03], [0, 0.03]], x, y, z, 10).scale.setScalar(s || 1); }
function edsStall(G, X, Z, rot, lx, lz, ry, kind, seed, lite) { return __ZC(472, 39, this, arguments, new.target); }
function edsIbis(G, x, y, z, ry, white) { return __ZC(472, 40, this, arguments, new.target); }
function edsRib(G, x, y, z, r, ry, tilt, col) { var m = edsPut(G, new THREE.TorusGeometry(r, r * 0.07, 5, 10, Math.PI * 0.9), edsM(col || 0xE8E0CC), x, y, z, 0, ry, 0); m.rotation.order = "YXZ"; m.rotation.set(tilt || 0, ry, 0.15); return m; }
"use strict";
(function () {
[[0, -50, 128, 56], [-152, -238, 50, 40], [-220, -300, 112, 50], [-330, -90, 74, 40], [232, -332, 34, 34], [296, -170, 66, 40], [160, -160, 26, 30], [330, 60, 58, 40], [200, 250, 46, 36], [-60, 230, 34, 30],
[-300, 170, 60, 40], [60, -430, 40, 36], [-130, -415, 44, 36], [10, 462, 70, 50], [150, -45, 36, 30]].forEach(function (f) { EDS_FLAT.push(f); });
[[[0, 6], [0, -70]], [[0, -50], [-80, -40]], [[0, -50], [80, -30]], [[-90, -50], [-110, -120], [-135, -190], [-147, -216]], [[-147, -216], [-196, -224]], [[-120, -30], [-200, -60], [-288, -90]],
[[110, -50], [160, -110], [230, -150], [268, -166]], [[236, -190], [234, -304]], [[110, -10], [220, 30], [300, 56]], [[20, 20], [110, 130], [186, 228]], [[-10, 30], [-50, 130], [-60, 196]],
[[-110, 0], [-200, 90], [-268, 150]], [[10, -150], [40, -300], [60, -400]], [[-190, -350], [-150, -395]], [[10, 40], [10, 360]]].forEach(function (p) { EDS_ROADS.push({ pts: p, hw: 4, f: 26 }); });
EDS_DIPS.push([0, -110, 24, 1.7, 16], [60, -430, 12, 1.3, 10], [-60, 230, 44, -6, 0]);
})();
function edsRobe(i, sex, o) { return __ZC(472, 41, this, arguments, new.target); }
function edsFolk(P, list) { return __ZC(472, 42, this, arguments, new.target); }
function edsRoadD(x, z) { var best = 1e9; EDS_ROADS.forEach(function (R) { for (var i = 1; i < R.pts.length; i++) {
var a = R.pts[i - 1], b = R.pts[i], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz || 1))), d = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t);
if (d < best)
best = d;
} }); return best; }
function edsAt(P, X, Z, rot, fn, r) { return P.make(X, Z, rot, r || 2, function (G, H) { return fn(G, H, X, Z, rot); }); }
function edsOasis(P, cx, cz, rad, nPalm, seed, big) { return __ZC(472, 43, this, arguments, new.target); }
function edsGardens(P, cx, cz, rot) { return __ZC(472, 44, this, arguments, new.target); }
function edsCamp(P, cx, cz) { return __ZC(472, 45, this, arguments, new.target); }
function edsBazaar(P, cx, cz) { return __ZC(472, 46, this, arguments, new.target); }
function edsGiza(P) { return __ZC(472, 47, this, arguments, new.target); }
function edsTempleSun(P, cx, cz, rot0) { return __ZC(472, 48, this, arguments, new.target); }
function edsFar(P) { return __ZC(472, 49, this, arguments, new.target); }
function edsStrew(P) { return __ZC(472, 50, this, arguments, new.target); }
function edsRecipe(P) { return __ZC(472, 51, this, arguments, new.target); }
"use strict";
function edsPathAt(pts, cum, s) {
var L = cum[cum.length - 1];
s = Math.max(0, Math.min(L - 0.01, s));
for (var i = 1; i < pts.length; i++)
if (s <= cum[i]) {
var a = pts[i - 1], b = pts[i], t = (s - cum[i - 1]) / (cum[i] - cum[i - 1]);
return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, Math.atan2(b[0] - a[0], b[1] - a[1])];
}
return [pts[0][0], pts[0][1], 0];
}
function edsLife(P) { return __ZC(472, 52, this, arguments, new.target); }
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined" || typeof ES_PAT === "undefined")
return;
ES_PAT.edshiero = function () { return edsSurf("hiero"); };
ES_PAT.edshiero2 = function () { return edsSurf("hiero2"); };
ES_PAT.edsgold = function () { return edsSurf("hierogold"); };
ES_PAT.edsstars = function () { return edsSurf("stars"); };
ES_PAT.edsgranite = function () { return edsSurf("granite"); };
var G = function () { return new THREE.Group(); }, gold = function () { return edsM(0xF0C040, null, { e: 0x8A6410, ei: 0.5 }); }, n = 0;
var P = {};
P.evb_hieros = function () {
var g = G(), k = ["judgement", "sunboat", "offering", "fields"][n++ % 4];
edsBox(g, gold(), 2.24, 1.2, 0.06, 0, 1.75, 0.0);
var p = new THREE.Mesh(new THREE.PlaneGeometry(2.12, 1.06), edsM(0xFFFFFF, "m:" + k));
p.position.set(0, 1.75, 0.04);
g.add(p);
edsBox(g, edsM(0x2447A8), 2.24, 0.07, 0.08, 0, 2.38, 0.0);
edsBox(g, edsM(0xB8372A), 2.24, 0.07, 0.08, 0, 1.12, 0.0);
return g;
};
P.evb_coffin = function () {
var g = G(), gd = gold(), nm = edsM(0xFFFFFF, "nemes"), bl = edsM(0x2447A8), i;
edsBox(g, edsM(0xFFFFFF, "granite"), 1.5, 0.75, 2.9, 0, 0.375, 0);
edsBox(g, edsM(0xE8D4A0, "carved"), 1.52, 0.4, 2.92, 0, 0.5, 0);
edsBox(g, edsM(0x1A1412), 1.2, 0.05, 2.6, 0, 0.76, 0);
edsSph(g, gd, 1, 0, 0.92, -0.25, 0.42, 0.3, 1.0, 12);
edsSph(g, gd, 1, 0, 0.95, -1.05, 0.3, 0.24, 0.34, 10);
edsSph(g, gd, 1, 0, 1.0, 0.78, 0.3, 0.3, 0.32, 12);
var hd = edsPut(g, new THREE.CylinderGeometry(0.3, 0.52, 0.7, 4, 1), nm, 0, 0.92, 0.62, Math.PI / 2, 0, 0);
hd.rotation.set(-Math.PI / 2 + 0.25, Math.PI / 4, 0, "XYZ");
hd.scale.set(1, 1, 0.6);
edsSph(g, nm, 0.31, 0, 1.02, 0.84, 1, 0.7, 0.9, 10);
edsBox(g, nm, 0.09, 0.09, 0.3, 0, 1.0, 0.42, 0, 0.3);
[-1, 1].forEach(function (sd) { edsSph(g, edsM(0xF4EEE0), 0.05, sd * 0.11, 1.27, 0.86, 1, 0.2, 0.6); edsSph(g, edsM(0x1A1412), 0.025, sd * 0.11, 1.275, 0.86); var a = edsCyl(g, gd, 0.022, 0.022, 0.62, sd * 0.08, 1.24, 0.22, 6); a.rotation.set(Math.PI / 2, 0, sd * 0.6); });
edsPut(g, new THREE.TorusGeometry(0.07, 0.018, 4, 8, Math.PI), gd, -0.26, 1.24, 0.44, Math.PI / 2, 0, 0);
for (i = 0; i < 7; i++)
edsBox(g, i % 2 ? bl : edsM(0xB8372A), 0.86 - Math.abs(i - 2) * 0.06, 0.03, 0.07, 0, 1.2 - i * 0.012, -0.1 - i * 0.16);
edsCyl(g, gd, 0.04, 0.02, 0.2, 0, 1.32, 0.98, 5);
return g;
};
P.evb_pycolumn = function () { var g = G(); edsColumn3(g, 0, 0, 5.1, 0.42, typeof LITE !== "undefined" && LITE); return g; };
P.evb_pharaoh = function () { var g = G(); edsColossus(g, 0, 0, 0, 0.24, { col: 0xE8CC8C }); return g; };
P.evb_godstatue = function () {
var g = G(), k = n++ % 4, bl = edsM(k % 2 ? 0x1A1412 : 0xD8A838, null, k % 2 ? {} : { e: 0x6A4A10, ei: 0.4 }), gd = gold();
edsBox(g, edsM(0xFFFFFF, "granite"), 0.7, 0.3, 0.9, 0, 0.15, 0);
[-0.11, 0.11].forEach(function (x, i) { edsBox(g, bl, 0.14, 0.85, 0.16, x, 0.72, i ? 0.12 : -0.06); edsBox(g, bl, 0.14, 0.07, 0.3, x, 0.33, i ? 0.2 : 0.02); });
edsBox(g, edsM(0xF0E8D8), 0.4, 0.3, 0.26, 0, 1.05, 0.02);
edsBox(g, gd, 0.12, 0.3, 0.03, 0, 1.02, 0.16);
var t = edsPut(g, new THREE.CylinderGeometry(0.24, 0.16, 0.55, 4, 1), bl, 0, 1.45, 0, 0, Math.PI / 4, 0);
t.scale.z = 0.6;
edsBox(g, gd, 0.44, 0.1, 0.2, 0, 1.68, 0.02);
[-1, 1].forEach(function (sd) { edsBox(g, bl, 0.09, 0.6, 0.1, sd * 0.26, 1.4, 0.0); });
edsCyl(g, gd, 0.015, 0.015, 1.7, 0.3, 1.0, 0.22, 5);
edsCyl(g, bl, 0.07, 0.08, 0.12, 0, 1.78, 0, 8);
if (k === 0) {
edsSph(g, bl, 0.13, 0, 1.94, 0.0);
edsCone(g, gd, 0.05, 0.16, 0, 1.92, 0.16, 5).rotation.x = Math.PI / 1.7;
edsCyl(g, edsM(0xB8372A), 0.1, 0.13, 0.2, 0, 2.14, -0.02, 8);
edsCyl(g, edsM(0xF0E8D8), 0.05, 0.09, 0.3, 0, 2.22, -0.03, 8);
}
else if (k === 1) {
edsSph(g, bl, 0.12, 0, 1.93, 0.0);
edsBox(g, bl, 0.09, 0.09, 0.26, 0, 1.9, 0.2);
[-0.06, 0.06].forEach(function (x) { edsCone(g, bl, 0.04, 0.22, x, 2.12, -0.02, 4); });
}
else if (k === 2) {
edsSph(g, bl, 0.11, 0, 1.93, 0.0);
edsPut(g, new THREE.TorusGeometry(0.16, 0.014, 4, 8, Math.PI * 0.5), gd, 0, 1.82, 0.1, 0, -Math.PI / 2, -0.3);
edsSph(g, edsM(0xF0E8D8), 0.1, 0, 2.12, 0, 1, 1, 0.3);
}
else {
edsSph(g, bl, 0.14, 0, 1.94, 0.0);
edsBox(g, bl, 0.1, 0.08, 0.12, 0, 1.9, 0.14);
[-0.09, 0.09].forEach(function (x) { edsSph(g, bl, 0.04, x, 2.06, 0); });
edsSph(g, edsM(0xD8372A, null, { e: 0xA81808, ei: 0.6 }), 0.12, 0, 2.2, 0, 1, 1, 0.3);
}
var blue = edsM(0x2447A8);
edsBox(g, blue, 0.1, 0.34, 0.06, -0.15, 1.72, 0.0);
edsBox(g, blue, 0.1, 0.34, 0.06, 0.15, 1.72, 0.0);
return g;
};
P.evb_falsedoor = function () {
var g = G(), cv = edsM(0xE8D4A0, "carved");
edsBox(g, cv, 1.9, 2.7, 0.16, 0, 1.35, 0);
edsBox(g, edsM(0xB8372A), 1.3, 2.2, 0.2, 0, 1.1, 0.02);
edsBox(g, cv, 0.9, 1.8, 0.24, 0, 0.9, 0.04);
edsBox(g, edsM(0x1A1412), 0.36, 1.5, 0.26, 0, 0.75, 0.06);
edsCyl(g, gold(), 0.1, 0.1, 0.92, 0, 1.72, 0.14, 8).rotation.z = Math.PI / 2;
edsBox(g, edsM(0x2447A8), 1.9, 0.14, 0.2, 0, 2.74, 0.02);
edsBox(g, gold(), 2.0, 0.08, 0.24, 0, 2.85, 0.02);
return g;
};
P.evb_offer = function () {
var g = G();
edsBox(g, edsM(0xE8D4A0, "carved"), 1.5, 0.75, 0.8, 0, 0.375, 0);
edsBox(g, gold(), 1.6, 0.06, 0.9, 0, 0.78, 0);
edsHeap(g, "bread", -0.5, 0.81, 0.1, 4, 1, 0.03);
edsHeap(g, "pomegranate", 0.05, 0.81, 0.2, 5, 1, 0.12);
edsHeap(g, "fig", 0.45, 0.81, 0.22, 6, 1, 0.1);
edsHeap(g, "grapes", 0.1, 0.81, -0.2, 2, 1.2, 0.1);
edsHeap(g, "dates", 0.5, 0.81, -0.18, 2, 1.2, 0.06);
edsHeap(g, "onion", -0.45, 0.81, -0.24, 4, 1, 0.08);
edsJar(g, -0.62, 0.81, -0.2, 1, 0.3);
edsLathe(g, edsM(0x2FA3A0, null, { e: 0x0E4A4A, ei: 0.3 }), [[0, 0], [0.06, 0], [0.03, 0.05], [0.1, 0.16], [0.11, 0.2]], 0.64, 0.81, 0.0, 8);
return g;
};
P.evb_shabti = function () {
var g = G(), bl = edsM(0x2FA3A0, null, { e: 0x0E4A4A, ei: 0.3 }), i;
edsBox(g, edsM(0x6A4A2A, "wood"), 1.5, 0.9, 0.4, 0, 0.45, 0);
edsBox(g, gold(), 1.54, 0.04, 0.44, 0, 0.92, 0);
for (i = 0; i < 9; i++) {
var x = -0.6 + i * 0.15;
edsCyl(g, bl, 0.045, 0.035, 0.24, x, 1.06, 0, 6);
edsSph(g, bl, 0.045, x, 1.21, 0);
edsBox(g, edsM(0x1A1412), 0.1, 0.05, 0.04, x, 1.2, -0.03);
}
return g;
};
P.evb_bastet = function () {
var g = G(), bl = edsM(0x1A1412), gd = gold();
edsBox(g, edsM(0xFFFFFF, "granite"), 0.5, 0.5, 0.6, 0, 0.25, 0);
edsSph(g, bl, 0.16, 0, 0.72, -0.04, 1, 1.5, 1.1, 10);
edsCyl(g, bl, 0.06, 0.09, 0.36, 0, 0.98, 0.1, 7);
edsSph(g, bl, 0.11, 0, 1.2, 0.12, 1, 1, 1.1, 8);
[-0.06, 0.06].forEach(function (x) { edsCone(g, bl, 0.04, 0.12, x, 1.34, 0.1, 4); edsCyl(g, bl, 0.03, 0.035, 0.44, x, 0.72, 0.14, 5); });
edsPut(g, new THREE.TorusGeometry(0.025, 0.007, 4, 8), gd, 0.09, 1.3, 0.1);
edsPut(g, new THREE.TorusGeometry(0.075, 0.014, 4, 10), gd, 0, 1.02, 0.1, Math.PI / 2.3, 0, 0);
return g;
};
P.evb_pythrone = function () {
var g = G(), gd = gold();
edsBox(g, edsM(0xFFFFFF, "granite"), 1.3, 0.24, 1.3, 0, 0.12, 0);
edsBox(g, gd, 0.8, 0.1, 0.8, 0, 0.8, 0);
edsBox(g, gd, 0.8, 1.2, 0.08, 0, 1.4, -0.38);
edsBox(g, edsM(0xFFFFFF, "m:offering"), 0.66, 0.5, 0.02, 0, 1.6, -0.33);
[[-0.34, -0.34], [0.34, -0.34], [-0.34, 0.34], [0.34, 0.34]].forEach(function (p) { edsCyl(g, gd, 0.05, 0.07, 0.56, p[0], 0.52, p[1], 6); edsSph(g, gd, 0.08, p[0], 0.28, p[1] + 0.03); });
[-1, 1].forEach(function (sd) { edsBox(g, gd, 0.07, 0.3, 0.7, sd * 0.38, 1.0, 0); edsSph(g, gd, 0.1, sd * 0.38, 1.18, 0.36); });
edsBox(g, edsM(0xB8372A), 0.7, 0.06, 0.7, 0, 0.87, 0);
return g;
};
P.evb_papyri = function () {
var g = G(), wd = edsM(0x8A6A4A, "wood"), i;
edsBox(g, wd, 1.5, 1.7, 0.42, 0, 0.85, 0);
for (i = 0; i < 3; i++)
edsBox(g, edsM(0x3A2A1A), 1.36, 0.4, 0.36, 0, 0.36 + i * 0.5, 0.04);
for (i = 0; i < 21; i++) {
var r = edsCyl(g, edsM(i % 4 ? 0xE8D8A8 : 0xD8C088), 0.055, 0.055, 0.34, -0.6 + (i % 7) * 0.2, 0.26 + Math.floor(i / 7) * 0.5 + (i % 2) * 0.06, 0.06, 7);
r.rotation.x = Math.PI / 2;
}
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
Object.keys(P).forEach(function (k) { if (k !== "evb_hieros")
SOLIDFURN[k] = 1; });
if (typeof EVB_THEMES !== "undefined" && EVB_THEMES.pyramid) {
EVB_THEMES.pyramid.remap = { "D6D0C6|plaster": [0xFFFFFF, "edsstars"], "D8D0C0|coffer": [0xFFFFFF, "edsstars"] };
EVB_THEMES.pyramid.corner = "evb_pycolumn";
}
if (typeof evbFins === "function")
evbFins({
pyentry: ["stone", 0xC8B088, 0xFFFFFF, "edshiero", 0xD8B040], pygallery: ["stone", 0xC0A880, 0xFFFFFF, "edshiero2", 0xD8B040], pyfalse: ["stone", 0xA89070, 0xE8D8C0, "edshiero", 0x8A7A5A],
pyking: ["stone", 0x9A7A6A, 0xFFFFFF, "edsgold", 0xD8B040, "coffer"], pyqueen: ["stone", 0xC0A880, 0xFFFFFF, "edshiero2", 0xD8B040], pytreasury: ["stone", 0xC0A880, 0xFFF0C8, "edsgold", 0xD8B040],
pyembalm: ["stone", 0xA89070, 0xFFFFFF, "edshiero", 0x2F8558], pycanopic: ["stone", 0xC0A880, 0xFFFFFF, "edshiero2", 0x2447A8], pyscribe: ["stone", 0xC0A880, 0xFFFFFF, "edshiero", 0xB8372A],
pyboat: ["stone", 0xC0A880, 0xE0ECFF, "edshiero2", 0xD8B040], pyjudge: ["stone", 0xA89070, 0xFFFFFF, "edsgold", 0x1A1412], pygods: ["stone", 0xC0A880, 0xFFFFFF, "edshiero", 0xD8B040],
pybuilders: ["stone", 0xA89070, 0xF0E4D0, "edshiero2", 0x8A7A5A], pystars: ["stone", 0x8A7A6A, 0xC8D4FF, "edshiero", 0xE8D860], pygames: ["stone", 0xC0A880, 0xFFFFFF, "edshiero2", 0x2447A8],
pyfood: ["stone", 0xC0A880, 0xFFFFFF, "edshiero", 0x2F8558]
});
if (typeof evbRooms === "function" && typeof evbPyEntry !== "undefined")
evbRooms({
pyentry: { sides: ["evb_godstatue", "brazier", "evb_hieros", "brazier"], far: ["evb_obelisk", "evb_obelisk"], gap: 3.6, acts: [[0.35, 0, 2.0, "The pyramid", "read", evbPyEntry]] },
pygallery: { sides: ["evb_hieros", "brazier", "evb_pharaoh", "brazier"], acts: [[0.5, 0, 2.0, "The Grand Gallery", "read", evbPyGallery]] },
pyfalse: { far: ["boulder", "evb_falsedoor", "boulder"], sides: ["evb_hieros", "brazier"] },
pyking: { far: ["evb_pharaoh", "evb_hieros", "evb_falsedoor", "evb_hieros"], mid: [["evb_coffin", 0.6, 0], ["redrunner", 0.3, 0, "+u"]], grid: ["brazier", 2, 6, "-u", 0.2, 0.85], sides: ["evb_anubis", "evb_godstatue", "evb_hieros", "evb_pharaoh", "evb_shabti", "evb_godstatue"],
acts: [[0.6, 0, 2.4, "The King's Chamber", "look", evbPyKing]] },
pyqueen: { mid: [["evb_pythrone", 0.6, 0]], sides: ["evb_hieros", "brazier", "evb_bastet", "evb_offer"], acts: [[0.45, 0, 1.8, "The Queen's Chamber", "read", evbPyQueen]] },
pytreasury: { grid: ["goldpile", 2, 2], sides: ["treasurechest", "evb_godstatue", "evb_pythrone", "crownstand", "evb_shabti", "treasurechest"], acts: [[0.5, 0, 1.8, "The treasure", "read", evbPyTreasury]] },
pyembalm: { mid: [["butcherblock", 0.5, 0]], sides: ["herbrack", "evb_canopic", "evb_anubis", "evb_hieros"], acts: [[0.5, 0, 1.8, "The embalmers", "read", evbPyEmbalm]] },
pycanopic: { mid: [["evb_canopic", 0.55, 0]], sides: ["evb_canopic", "evb_hieros", "evb_canopic", "evb_godstatue"], acts: [[0.45, 0, 1.8, "The canopic jars", "read", evbPyCanopic]] },
pyscribe: { grid: ["schooldesk", 2, 2], far: ["evb_hieros", "evb_papyri"], sides: ["evb_papyri", "evb_hieros", "lectern", "evb_godstatue"], acts: [[0.5, 0, 1.8, "The scribe", "learn a sign", evbPyScribe]] },
pyboat: { mid: [["evb_sunboat", 0.55, 0]], sides: ["evb_hieros", "brazier", "evb_hieros", "evb_godstatue"], acts: [[0.4, 0, 1.8, "The sun boat", "read", evbPyBoat]] },
pyjudge: { mid: [["evb_scales", 0.55, 0]], sides: ["evb_anubis", "evb_hieros", "evb_godstatue", "evb_hieros"], acts: [[0.45, 0, 1.8, "The scales of Ma'at", "weigh your heart", evbPyJudge]] },
pygods: { far: ["evb_godstatue", "evb_pharaoh", "evb_godstatue"], sides: ["evb_godstatue", "evb_hieros", "evb_bastet", "evb_anubis"], acts: [[0.5, 0, 1.8, "The gods", "meet one", evbPyGods]] },
pybuilders: { sides: ["boulder", "workbench", "evb_hieros", "crates"], mid: [["maptable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The builders", "read", evbPyBuilders]] },
pystars: { far: ["estelescope"], sides: ["evb_hieros", "maptable", "evb_godstatue", "evb_hieros"], acts: [[0.5, 0, 1.8, "The star shafts", "read", evbPyStars]] },
pygames: { grid: ["escardtable", 1, 2], sides: ["chair", "evb_hieros", "chair", "evb_bastet"], acts: [[0.5, 0, 1.8, "Senet", "play", evbPyGame]] },
pyfood: { far: ["evb_offer", "evb_offer"], sides: ["barrel", "evb_offer", "evb_hieros", "evb_shabti"], mid: [["feasttable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The offerings", "read", evbPyFood]] }
});
})();
