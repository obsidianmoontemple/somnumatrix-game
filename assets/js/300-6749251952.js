/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
(function () {
if (typeof HELD === "undefined" || typeof THREE === "undefined")
return;
var lite = function () { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); };
var V2 = THREE.Vector2;
function mt(c, m, r) { return lite() ? new THREE.MeshLambertMaterial({ color: c }) : new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r }); }
var STEEL = function () { return mt(0x4A4C52, 0.85, 0.38); }, BLUED = function () { return mt(0x24262C, 0.8, 0.32); }, POLY = function (c) { return mt(c || 0x1E2022, 0.05, 0.72); };
var WOOD = function (c) { return mt(c || 0x5A3A22, 0, 0.55); }, OLIVE = function () { return mt(0x4A5638, 0.35, 0.6); }, BRASS = function () { return mt(0xB8923A, 0.9, 0.3); };
var GLASS = function (c) { return lite() ? new THREE.MeshLambertMaterial({ color: c || 0x3A6A8A }) : new THREE.MeshStandardMaterial({ color: c || 0x22445A, metalness: 0.2, roughness: 0.08, emissive: 0x0A1A2A }); };
var GLOW = function (c, o) { return new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o == null ? 0.9 : o, depthWrite: false }); };
function M(geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function tube(r1, r2, len, mat, x, y, z, s) { return M(new THREE.CylinderGeometry(r2, r1, len, s || (lite() ? 10 : 18)), mat, x, y, z, Math.PI / 2, 0, 0); }
function bx(w, h, d, mat, x, y, z, rx, ry, rz) { return M(new THREE.BoxGeometry(w, h, d), mat, x, y, z, rx, ry, rz); }
function lathe(pts, mat, x, y, z, s) { var g = new THREE.LatheGeometry(pts.map(function (p) { return new V2(p[0], p[1]); }), s || (lite() ? 10 : 20)); var m = M(g, mat, x, y, z, Math.PI / 2, 0, 0); return m; }
function ring(r, t, mat, x, y, z) { return M(new THREE.TorusGeometry(r, t, 6, lite() ? 12 : 20), mat, x, y, z); }
function grip(g, z, y, mat, h) {
h = h || 0.12;
g.add(bx(0.034, h, 0.05, mat, 0, y - h / 2, z - 0.012, -0.28, 0, 0));
var gd = M(new THREE.TorusGeometry(0.03, 0.005, 5, 12, Math.PI), BLUED(), 0, y - 0.012, z + 0.035, 0, Math.PI / 2, Math.PI);
g.add(gd);
g.add(bx(0.006, 0.03, 0.008, BLUED(), 0, y - 0.02, z + 0.032, 0.3, 0, 0));
}
function mag(g, z, y, len, mat) { var n = lite() ? 2 : 4; for (var i = 0; i < n; i++) {
var a = i * 0.1;
g.add(bx(0.028, len / n + 0.004, 0.05, mat, 0, y - len / n * (i + 0.5), z + Math.sin(a) * 0.04 * i, a, 0, 0));
} }
function scope(g, z, y, len, r) {
g.add(tube(r, r, len, BLUED(), 0, y, z));
g.add(tube(r * 1.35, r, 0.06, BLUED(), 0, y, z + len / 2 - 0.03));
g.add(tube(r, r * 1.25, 0.05, BLUED(), 0, y, z - len / 2 + 0.025));
g.add(M(new THREE.CircleGeometry(r * 1.25, 14), GLASS(), 0, y, z + len / 2 + 0.001));
var b = M(new THREE.CircleGeometry(r * 1.1, 14), GLASS(), 0, y, z - len / 2 - 0.001, 0, Math.PI, 0);
g.add(b);
g.add(bx(0.018, 0.03, 0.02, BLUED(), 0, y - r - 0.012, z - len * 0.25));
g.add(bx(0.018, 0.03, 0.02, BLUED(), 0, y - r - 0.012, z + len * 0.25));
g.add(tube(0.012, 0.012, 0.03, BLUED(), 0, y + r + 0.012, z, 8));
}
HELD.bwLauncher = function () {
var g = new THREE.Group(), body = OLIVE();
g.add(tube(0.042, 0.042, 0.98, body, 0, 0.1, 0.2));
g.add(lathe([[0.042, 0], [0.05, 0.03], [0.076, 0.17], [0.078, 0.19], [0.07, 0.19]], STEEL(), 0, 0.1, -0.29));
g.add(tube(0.056, 0.056, 0.3, WOOD(0x7A5232), 0, 0.1, 0.06));
[-0.08, 0.2].forEach(function (z) { g.add(ring(0.057, 0.006, STEEL(), 0, 0.1, z)); });
g.add(lathe([[0.012, 0], [0.03, 0.02], [0.07, 0.1], [0.074, 0.15], [0.06, 0.22], [0.02, 0.33], [0.004, 0.36]], mt(0x56653E, 0.3, 0.55), 0, 0.1, 0.69));
g.add(tube(0.022, 0.022, 0.08, STEEL(), 0, 0.1, 0.7));
grip(g, 0.08, 0.055, POLY(0x2A2620));
grip(g, 0.3, 0.055, WOOD(0x6A4428), 0.1);
g.add(bx(0.012, 0.05, 0.05, STEEL(), 0.05, 0.15, 0.18));
g.add(tube(0.018, 0.018, 0.11, BLUED(), 0.062, 0.18, 0.18));
g.add(M(new THREE.CircleGeometry(0.018, 12), GLASS(), 0.062, 0.18, 0.236));
g.add(bx(0.006, 0.035, 0.008, STEEL(), 0, 0.155, 0.62));
g.add(bx(0.03, 0.025, 0.006, STEEL(), 0, 0.152, -0.14));
g.add(ring(0.016, 0.004, STEEL(), 0, 0.044, -0.2));
return g;
};
HELD.bwRifle = function () {
var g = new THREE.Group(), w = WOOD();
g.add(tube(0.011, 0.009, 0.62, BLUED(), 0, 0.07, 0.55));
g.add(tube(0.02, 0.02, 0.24, BLUED(), 0, 0.065, 0.12));
g.add(bx(0.04, 0.045, 0.52, w, 0, 0.04, 0.28));
g.add(bx(0.036, 0.03, 0.28, w, 0, 0.022, 0.66));
g.add(bx(0.042, 0.09, 0.34, w, 0, 0.0, -0.15, 0.14, 0, 0));
g.add(bx(0.044, 0.12, 0.025, POLY(0x1A1A1A), 0, -0.024, -0.32, 0.14, 0, 0));
g.add(tube(0.006, 0.006, 0.06, BLUED(), 0.04, 0.075, 0.06, 8));
g.add(M(new THREE.SphereGeometry(0.012, 8, 6), BLUED(), 0.07, 0.075, 0.06));
g.add(M(new THREE.TorusGeometry(0.025, 0.004, 5, 12, Math.PI), BLUED(), 0, 0.02, 0.08, 0, Math.PI / 2, Math.PI));
g.add(bx(0.005, 0.025, 0.006, BLUED(), 0, 0.022, 0.07, 0.3, 0, 0));
g.add(bx(0.008, 0.02, 0.01, BLUED(), 0, 0.088, 0.84));
g.add(bx(0.02, 0.012, 0.02, BLUED(), 0, 0.09, 0.24));
g.add(ring(0.012, 0.003, STEEL(), 0, 0.02, 0.5));
g.add(ring(0.012, 0.003, STEEL(), 0, -0.02, -0.3));
return g;
};
HELD.bwPistol = function () {
var g = new THREE.Group();
g.add(bx(0.03, 0.032, 0.2, BLUED(), 0, 0.075, 0.12));
g.add(bx(0.026, 0.022, 0.17, STEEL(), 0, 0.05, 0.115));
for (var i = 0; i < (lite() ? 3 : 6); i++)
g.add(bx(0.031, 0.026, 0.004, POLY(0x111111), 0, 0.076, 0.04 + i * 0.01));
g.add(tube(0.008, 0.008, 0.012, POLY(0x0A0A0A), 0, 0.074, 0.225, 10));
g.add(bx(0.03, 0.12, 0.045, POLY(0x2A2622), 0, -0.015, 0.01, -0.3, 0, 0));
g.add(M(new THREE.TorusGeometry(0.022, 0.004, 5, 12, Math.PI), BLUED(), 0, 0.042, 0.075, 0, Math.PI / 2, Math.PI));
g.add(bx(0.005, 0.02, 0.006, BLUED(), 0, 0.042, 0.068, 0.25, 0, 0));
g.add(bx(0.008, 0.01, 0.01, BLUED(), 0, 0.095, 0.21));
g.add(bx(0.024, 0.01, 0.01, BLUED(), 0, 0.095, 0.03));
g.add(bx(0.01, 0.018, 0.02, BLUED(), 0, 0.09, 0.015, -0.5, 0, 0));
return g;
};
HELD.bwShotgun = function () {
var g = new THREE.Group(), w = WOOD(0x5E3E26);
[-0.016, 0.016].forEach(function (x) { g.add(tube(0.016, 0.015, 0.66, BLUED(), x, 0.075, 0.43)); g.add(M(new THREE.CircleGeometry(0.012, 10), POLY(0x050505), x, 0.075, 0.761)); });
g.add(bx(0.012, 0.006, 0.62, STEEL(), 0, 0.094, 0.43));
g.add(bx(0.05, 0.05, 0.12, STEEL(), 0, 0.06, 0.07));
g.add(bx(0.044, 0.035, 0.24, w, 0, 0.045, 0.28));
g.add(bx(0.044, 0.085, 0.36, w, 0, -0.005, -0.16, 0.16, 0, 0));
g.add(bx(0.046, 0.12, 0.02, POLY(0x241812), 0, -0.03, -0.34, 0.16, 0, 0));
g.add(M(new THREE.TorusGeometry(0.024, 0.004, 5, 12, Math.PI), BLUED(), 0, 0.03, 0.05, 0, Math.PI / 2, Math.PI));
[-0.012, 0.012].forEach(function (x) { g.add(bx(0.008, 0.02, 0.012, STEEL(), x, 0.095, 0.04, -0.4, 0, 0)); });
g.add(M(new THREE.SphereGeometry(0.005, 6, 4), BRASS(), 0, 0.1, 0.75));
return g;
};
HELD.bwSmg = function () {
var g = new THREE.Group(), p = POLY(0x1C1E20);
g.add(bx(0.04, 0.055, 0.3, BLUED(), 0, 0.06, 0.12));
g.add(tube(0.016, 0.016, 0.18, BLUED(), 0, 0.06, 0.33));
for (var i = 0; i < (lite() ? 2 : 5); i++)
g.add(ring(0.017, 0.003, POLY(0x0A0A0A), 0, 0.06, 0.27 + i * 0.025));
mag(g, 0.1, 0.035, 0.17, STEEL());
grip(g, -0.01, 0.035, p);
g.add(bx(0.006, 0.03, 0.18, STEEL(), 0.017, 0.055, -0.15));
g.add(bx(0.006, 0.03, 0.18, STEEL(), -0.017, 0.055, -0.15));
g.add(bx(0.04, 0.06, 0.012, STEEL(), 0, 0.045, -0.24));
g.add(bx(0.01, 0.025, 0.01, BLUED(), 0, 0.1, 0.25));
g.add(bx(0.024, 0.02, 0.012, BLUED(), 0, 0.1, 0.0));
g.add(tube(0.006, 0.006, 0.04, BLUED(), 0.025, 0.075, 0.14, 6));
return g;
};
HELD.bwAssault = function () {
var g = new THREE.Group(), p = POLY(0x26282A), tan = POLY(0x5A5040);
g.add(bx(0.044, 0.065, 0.3, BLUED(), 0, 0.06, 0.1));
g.add(bx(0.05, 0.055, 0.26, tan, 0, 0.058, 0.38));
for (var i = 0; i < (lite() ? 2 : 6); i++)
g.add(bx(0.052, 0.008, 0.016, POLY(0x111111), 0, 0.088, 0.28 + i * 0.04));
g.add(tube(0.01, 0.01, 0.2, BLUED(), 0, 0.06, 0.6));
g.add(tube(0.016, 0.014, 0.05, BLUED(), 0, 0.06, 0.72));
mag(g, 0.1, 0.03, 0.2, p);
grip(g, -0.02, 0.03, p);
g.add(bx(0.04, 0.06, 0.24, tan, 0, 0.04, -0.17, 0.08, 0, 0));
g.add(bx(0.044, 0.1, 0.02, POLY(0x111111), 0, 0.02, -0.3, 0.08, 0, 0));
g.add(bx(0.03, 0.012, 0.22, BLUED(), 0, 0.1, 0.12));
g.add(tube(0.02, 0.02, 0.09, BLUED(), 0, 0.13, 0.1));
g.add(M(new THREE.CircleGeometry(0.019, 12), GLASS(0x5A2A1A), 0, 0.13, 0.146));
g.add(bx(0.02, 0.025, 0.03, BLUED(), 0, 0.112, 0.1));
return g;
};
HELD.bwSniper = function () {
var g = new THREE.Group(), p = POLY(0x2E3428);
g.add(tube(0.012, 0.01, 0.85, BLUED(), 0, 0.07, 0.72));
g.add(tube(0.02, 0.018, 0.07, BLUED(), 0, 0.07, 1.16));
g.add(bx(0.044, 0.05, 0.3, BLUED(), 0, 0.06, 0.13));
g.add(bx(0.05, 0.05, 0.42, p, 0, 0.035, 0.34));
g.add(bx(0.05, 0.11, 0.36, p, 0, -0.01, -0.2, 0.12, 0, 0));
g.add(bx(0.052, 0.13, 0.022, POLY(0x111111), 0, -0.03, -0.38, 0.12, 0, 0));
g.add(bx(0.03, 0.04, 0.14, p, 0, 0.085, -0.12));
mag(g, 0.12, 0.03, 0.08, BLUED());
grip(g, 0.0, 0.03, p);
scope(g, 0.15, 0.14, 0.36, 0.024);
g.add(tube(0.006, 0.006, 0.07, BLUED(), 0.04, 0.075, 0.04, 6));
g.add(M(new THREE.SphereGeometry(0.012, 8, 6), BLUED(), 0.075, 0.075, 0.04));
[-0.018, 0.018].forEach(function (x) { g.add(bx(0.008, 0.008, 0.22, STEEL(), x, 0.01, 0.62)); });
g.add(bx(0.05, 0.02, 0.02, STEEL(), 0, 0.02, 0.52));
return g;
};
HELD.bwGatling = function () {
var g = new THREE.Group(), n = lite() ? 4 : 6;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283;
g.add(tube(0.013, 0.013, 0.82, BLUED(), Math.cos(a) * 0.05, 0.06 + Math.sin(a) * 0.05, 0.38));
}
[0.08, 0.42, 0.76].forEach(function (z, k) { g.add(tube(0.075, 0.075, k === 2 ? 0.05 : 0.03, STEEL(), 0, 0.06, z)); });
g.add(tube(0.02, 0.02, 0.86, STEEL(), 0, 0.06, 0.38));
g.add(bx(0.17, 0.17, 0.24, mt(0x4A4A40, 0.6, 0.5), 0, 0.06, -0.08));
g.add(bx(0.14, 0.12, 0.16, OLIVE(), 0.13, 0.0, -0.06));
g.add(bx(0.05, 0.03, 0.12, BRASS(), 0.08, 0.06, -0.04));
g.add(bx(0.03, 0.12, 0.04, POLY(0x2A2622), 0, -0.08, -0.1, -0.2, 0, 0));
g.add(bx(0.03, 0.1, 0.04, POLY(0x2A2622), 0, 0.17, 0.02));
g.add(tube(0.012, 0.012, 0.18, STEEL(), -0.09, 0.06, -0.08, 8));
return g;
};
HELD.bwFlamer = function () {
var g = new THREE.Group();
g.add(tube(0.022, 0.022, 0.6, STEEL(), 0, 0.07, 0.28));
g.add(lathe([[0.022, 0], [0.03, 0.05], [0.034, 0.08]], BLUED(), 0, 0.07, 0.58));
g.add(tube(0.008, 0.008, 0.5, BRASS(), 0, 0.04, 0.3, 8));
g.add(tube(0.075, 0.075, 0.32, mt(0x8A2A1E, 0.4, 0.5), 0, -0.02, -0.12));
[-0.12, 0.0].forEach(function (z) { g.add(ring(0.076, 0.006, STEEL(), 0, -0.02, z + 0.04)); });
g.add(tube(0.03, 0.03, 0.08, BRASS(), 0, 0.08, -0.24));
grip(g, 0.02, 0.05, POLY(0x2A2622));
grip(g, 0.32, 0.05, POLY(0x2A2622), 0.09);
g.add(M(new THREE.SphereGeometry(0.012, 8, 6), GLOW(0x6AB0FF, 0.8), 0, 0.05, 0.62));
return g;
};
HELD.bwBlaster = function () {
var g = new THREE.Group(), w = mt(0xD8DCE4, 0.5, 0.35), d = mt(0x3A3A44, 0.7, 0.35);
g.add(bx(0.05, 0.07, 0.26, w, 0, 0.065, 0.1));
g.add(bx(0.044, 0.04, 0.12, d, 0, 0.11, 0.06));
g.add(tube(0.022, 0.018, 0.2, d, 0, 0.06, 0.3));
for (var i = 0; i < (lite() ? 2 : 4); i++)
g.add(ring(0.026, 0.005, mt(0xB87333, 0.9, 0.3), 0, 0.06, 0.24 + i * 0.035));
g.add(tube(0.03, 0.026, 0.04, d, 0, 0.06, 0.41));
g.add(M(new THREE.CircleGeometry(0.014, 12), GLOW(0x6AE0FF), 0, 0.06, 0.432));
g.add(bx(0.006, 0.02, 0.18, GLOW(0x6AE0FF, 0.75), 0.027, 0.07, 0.1));
g.add(bx(0.006, 0.02, 0.18, GLOW(0x6AE0FF, 0.75), -0.027, 0.07, 0.1));
g.add(bx(0.034, 0.12, 0.05, d, 0, -0.02, -0.0, -0.28, 0, 0));
g.add(M(new THREE.TorusGeometry(0.022, 0.004, 5, 12, Math.PI), d, 0, 0.03, 0.05, 0, Math.PI / 2, Math.PI));
g.add(bx(0.03, 0.06, 0.04, mt(0x2A2A30, 0.6, 0.4), 0, 0.0, 0.12));
return g;
};
HELD.bwRail = function () {
var g = new THREE.Group(), w = mt(0xC8CCD4, 0.8, 0.3), d = mt(0x2E3038, 0.7, 0.35);
[0.035, -0.035].forEach(function (x) { g.add(bx(0.022, 0.05, 0.82, w, x, 0.06, 0.36)); });
g.add(bx(0.02, 0.02, 0.78, GLOW(0x6AC8FF, 0.7), 0, 0.06, 0.38));
for (var i = 0; i < (lite() ? 3 : 7); i++)
g.add(bx(0.11, 0.07, 0.018, d, 0, 0.06, 0.06 + i * 0.11));
g.add(bx(0.07, 0.1, 0.26, d, 0, 0.03, -0.12));
g.add(bx(0.07, 0.09, 0.02, mt(0x111111, 0.1, 0.7), 0, 0.02, -0.26));
grip(g, -0.02, 0.0, mt(0x2A2A30, 0.2, 0.6));
scope(g, 0.02, 0.13, 0.2, 0.016);
g.add(tube(0.03, 0.03, 0.12, d, 0.06, 0.0, -0.06));
g.add(M(new THREE.CircleGeometry(0.02, 12), GLOW(0x6AC8FF), 0.06, 0.0, 0.001));
return g;
};
HELD.bwArc = function () {
var g = new THREE.Group(), body = mt(0x8A8E96, 0.75, 0.35);
g.add(bx(0.07, 0.09, 0.32, body, 0, 0.06, 0.06));
g.add(bx(0.034, 0.12, 0.05, mt(0x2A2A30, 0.2, 0.6), 0, -0.03, -0.02, -0.28, 0, 0));
for (var i = 0; i < (lite() ? 3 : 5); i++)
g.add(ring(0.05 - i * 0.004, 0.008, mt(0xB87333, 0.95, 0.25), 0, 0.06, 0.24 + i * 0.05));
g.add(tube(0.014, 0.014, 0.26, body, 0, 0.06, 0.33));
g.add(M(new THREE.SphereGeometry(0.035, 12, 10), GLOW(0xBFE0FF, 0.85), 0, 0.06, 0.48));
g.add(tube(0.02, 0.02, 0.1, GLASS(0x4A7AA8), 0, 0.12, 0.02));
return g;
};
HELD.bwGrenade = function () {
var g = new THREE.Group(), o = OLIVE();
var b = M(new THREE.SphereGeometry(0.06, lite() ? 10 : 16, lite() ? 8 : 12), o, 0, 0.06, 0);
b.scale.set(1, 1.25, 1);
g.add(b);
for (var i = 0; i < (lite() ? 2 : 4); i++) {
var rg = ring(0.06 - Math.abs(i - 1.5) * 0.006, 0.004, o, 0, 0.03 + i * 0.02, 0);
rg.rotation.x = Math.PI / 2;
g.add(rg);
}
g.add(M(new THREE.CylinderGeometry(0.016, 0.016, 0.03, 8), STEEL(), 0, 0.14, 0));
g.add(bx(0.012, 0.09, 0.012, STEEL(), 0.03, 0.1, 0, 0, 0, -0.2));
g.add(ring(0.014, 0.003, STEEL(), -0.02, 0.16, 0));
return g;
};
HELD.bwCrossbow = function () {
var g = new THREE.Group(), w = WOOD();
g.add(bx(0.05, 0.05, 0.62, w, 0, 0.05, 0.15));
g.add(bx(0.03, 0.01, 0.5, STEEL(), 0, 0.08, 0.2));
g.add(M(new THREE.TorusGeometry(0.32, 0.013, 6, lite() ? 16 : 28, Math.PI * 0.9), STEEL(), 0, 0.07, 0.36, Math.PI / 2, 0, Math.PI * 0.05));
var s = M(new THREE.CylinderGeometry(0.002, 0.002, 0.6, 4), mt(0xE8E0C8, 0, 0.8), 0, 0.075, 0.22, 0, 0, Math.PI / 2);
g.add(s);
g.add(tube(0.004, 0.004, 0.36, WOOD(0x8A6A4A), 0, 0.09, 0.32, 6));
g.add(lathe([[0.002, 0], [0.012, 0.01], [0, 0.05]], STEEL(), 0, 0.09, 0.5));
g.add(bx(0.044, 0.09, 0.2, w, 0, -0.01, -0.2, 0.2, 0, 0));
g.add(bx(0.01, 0.05, 0.012, STEEL(), 0, 0.02, 0.02, 0.4, 0, 0));
g.add(M(new THREE.TorusGeometry(0.04, 0.006, 5, 14), STEEL(), 0, 0.06, 0.5));
return g;
};
})();
