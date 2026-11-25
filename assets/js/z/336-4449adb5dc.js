/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(336, function () {
"use strict";
return [
function (k) {
if (k === "stn_aurora")
return "Station Aurora";
if (k === "stn_ares")
return "the Ares Gateway";
if (/^gr_/.test(k) && typeof GR !== "undefined") {
var R = (GR.list || []).filter(function (r) { return r.key === k; })[0];
if (R)
return R.name + ", the city of " + R.parentName;
}
return typeof mmPlaceName === "function" ? mmPlaceName(k) : k;
},
function () {
if (RA.mats)
return RA.mats;
RA.mats = {
gold: mmMat(0xD8B04A, { shine: 95, spec: 0xFFF0C0 }), rgold: mmMat(0xC8784A, { shine: 85, spec: 0xFFD8B8 }),
silver: mmMat(0xD4D8E0, { shine: 110, spec: 0xFFFFFF }), brass: mmMat(0xB8873A, { shine: 70, spec: 0xE8D0A0 }), bronze: mmMat(0x8C5A2E, { shine: 60, spec: 0xD8A878 }),
wood: mmMat(0x5A3A22, { shine: 24 }), walnut: mmMat(0x3A2416, { shine: 40 }), ivory: mmMat(0xEDE4CC, { shine: 45 }), paper: mmMat(0xE8DCC0, { shine: 8, ds: 1 }),
glass: mmMat(0xD8EEF8, { shine: 140, op: 0.32, spec: 0xFFFFFF }), dark: mmMat(0x1A1A24, { shine: 60 }), white: mmMat(0xF4F4F0, { shine: 30 }),
ruby: mmMat(0xB0182A, { shine: 130, spec: 0xFFFFFF }), sapph: mmMat(0x1E48B0, { shine: 130, spec: 0xFFFFFF }), emer: mmMat(0x1E8A50, { shine: 130, spec: 0xFFFFFF }),
violet: mmMat(0x7A3AB8, { shine: 30 }), velvet: mmMat(0x6A1A2A, { shine: 10 }), pearl: mmMat(0xF0D8DC, { shine: 120, spec: 0xFFFFFF })
};
return RA.mats;
},
function () {
var M = raM(), g = new THREE.Group(), spin = [];
mmLathe(g, M.brass, [[0, 0], [0.16, 0], [0.17, 0.02], [0.12, 0.04], [0.04, 0.07], [0.03, 0.2]], 0, 0, 0, 24);
mmEll(g, M.gold, 0.05, 0.05, 0.05, 0, 0.27, 0, 18);
[0.09, 0.13, 0.17].forEach(function (R, i) {
var G = mmG(g, 0, 0.27, 0);
spin.push([G, 0.4 / (i + 1)]);
var T = mmG(G, 0, 0, 0, Math.PI / 2 + 0.15 * (i - 1), 0, 0);
mmTorus(T, M.brass, R, 0.0035, 0, 0, 0);
mmEll(T, [M.sapph, M.emer, M.ruby][i], 0.014, 0.014, 0.014, R, 0, 0, 10);
if (i === 2)
mmEll(T, M.silver, 0.01, 0.01, 0.01, -R, 0, 0, 8);
});
return { g: g, h: 0.45, anim: function (dt) { spin.forEach(function (s) { s[0].rotation.y += dt * s[1]; }); } };
},
function () {
var M = raM(), g = new THREE.Group();
mmLathe(g, M.bronze, [[0.13, 0], [0.135, 0.012], [0.11, 0.04], [0.085, 0.1], [0.075, 0.16], [0.06, 0.19], [0, 0.2]], 0, 0, 0, 28);
mmTorus(g, M.bronze, 0.12, 0.006, 0, 0.03, 0, Math.PI / 2, 0, 0);
mmCyl(g, M.wood, 0.018, 0.022, 0.12, 0, 0.26, 0, 0, 0, 0, 12);
mmEll(g, M.wood, 0.026, 0.02, 0.026, 0, 0.33, 0, 12);
return { g: g, h: 0.36 };
},
function () {
var M = raM(), g = new THREE.Group(), Q = mmG(g, 0, 0.05, 0, 0, 0, -0.9);
mmFlat(Q, M.white, [[0, 0.06], [0.03, 0.14], [0.045, 0.3], [0.03, 0.44], [0, 0.5], [-0.012, 0.36], [-0.018, 0.2], [-0.008, 0.08]], 0.004, 0, 0, 0);
mmCyl(Q, M.ivory, 0.004, 0.003, 0.5, 0.0, 0.25, 0.004, 0, 0, 0, 6);
mmCone(Q, M.dark, 0.004, 0.03, 0, -0.01, 0.004, Math.PI, 0, 0, 6);
mmLathe(g, M.silver, [[0, 0], [0.05, 0], [0.05, 0.01], [0.03, 0.02], [0.025, 0.05], [0.02, 0.06]], 0.05, 0, 0, 18);
return { g: g, h: 0.3 };
},
function () {
var M = raM(), g = new THREE.Group(), N = mmG(g, 0, 0.028, 0);
mmCyl(g, M.brass, 0.09, 0.095, 0.03, 0, 0.015, 0, 0, 0, 0, 28);
mmCyl(g, M.paper, 0.08, 0.08, 0.002, 0, 0.026, 0, 0, 0, 0, 28);
mmTorus(g, M.brass, 0.088, 0.006, 0, 0.03, 0, Math.PI / 2, 0, 0);
mmCyl(g, M.glass, 0.083, 0.083, 0.004, 0, 0.034, 0, 0, 0, 0, 28);
mmFlat(N, M.ruby, [[0, 0.07], [0.009, 0], [-0.009, 0]], 0.003, 0, 0, 0, -Math.PI / 2, 0, 0);
mmFlat(N, M.silver, [[0, -0.07], [0.009, 0], [-0.009, 0]], 0.003, 0, 0, 0, -Math.PI / 2, 0, 0);
mmTorus(g, M.brass, 0.018, 0.004, 0, 0.03, -0.1, 0, 0, 0);
return { g: g, h: 0.06, anim: function (dt) { N.rotation.y = Math.sin((RA.t || 0) * 0.35) * 1.4; } };
},
function () {
var M = raM(), g = new THREE.Group();
mmLathe(g, M.silver, [[0.034, 0], [0.036, 0.004], [0.033, 0.05], [0.028, 0.07], [0.015, 0.08], [0, 0.082]], 0, 0, 0, 24);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2;
mmCone(g, M.gold, 0.006, 0.02, Math.sin(a) * 0.034, 0.01, Math.cos(a) * 0.034, Math.PI, 0, 0, 6);
}
mmTorus(g, M.gold, 0.035, 0.0035, 0, 0.002, 0, Math.PI / 2, 0, 0);
mmEll(g, M.emer, 0.008, 0.008, 0.008, 0, 0.084, 0, 10);
return { g: g, h: 0.1 };
},
function () {
var M = raM(), g = new THREE.Group(), glass = mmMat(0x6AA8E8, { shine: 140, op: 0.42, spec: 0xFFFFFF }), sea = mmMat(0x1A5AA8, { shine: 80, op: 0.85 });
var H = mmG(g, 0, 0.13, 0, 0, 0, Math.PI);
[-1, 1].forEach(function (s) { mmEll(H, glass, 0.06, 0.06, 0.045, s * 0.045, -0.03, 0, 18); mmEll(H, sea, 0.048, 0.035, 0.035, s * 0.045, -0.005, 0, 14); });
mmCone(H, glass, 0.095, 0.12, 0, 0.06, 0, Math.PI, 0, 0, 20);
mmCone(H, sea, 0.07, 0.07, 0, 0.06, 0, Math.PI, 0, 0, 16);
mmCyl(g, M.wood, 0.014, 0.012, 0.04, 0, 0.22, 0, 0, 0, 0, 10);
return { g: g, h: 0.24 };
},
function () {
var M = raM(), g = new THREE.Group(), S = mmG(g, 0, 0.02, 0, -Math.PI / 2 + 0.4, 0, 0);
mmTorus(S, M.brass, 0.16, 0.006, 0, 0, 0, 0, 0, Math.PI * 1.25, Math.PI / 3);
mmFlat(S, M.brass, [[0, 0], [0.07, -0.15], [0.09, -0.15], [0.012, 0.01]], 0.004, 0, 0, 0);
mmFlat(S, M.brass, [[0, 0], [-0.07, -0.15], [-0.09, -0.15], [-0.012, 0.01]], 0.004, 0, 0, 0);
mmFlat(S, M.silver, [[0, 0], [0.01, -0.16], [-0.01, -0.16]], 0.004, 0, 0, 0.004, 0, 0, 0.3);
mmCyl(S, M.brass, 0.012, 0.014, 0.11, 0.0, -0.07, 0.02, 0, 0, Math.PI / 2);
mmCyl(g, M.walnut, 0.018, 0.018, 0.05, 0, 0.02, 0, 0, 0, 0, 10);
return { g: g, h: 0.2 };
},
function () {
var M = raM(), g = new THREE.Group();
mmLathe(g, M.gold, [[0.11, 0], [0.112, 0.006], [0.108, 0.05], [0.1, 0.055], [0.098, 0.006], [0.096, 0]], 0, 0, 0, 32);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, x = Math.sin(a) * 0.104, z = Math.cos(a) * 0.104;
mmCone(g, M.gold, 0.016, 0.07, x, 0.088, z, 0, 0, 0, 8);
mmEll(g, M.pearl, 0.009, 0.009, 0.009, x, 0.126, z, 8);
mmEll(g, [M.ruby, M.sapph, M.emer][i % 3], 0.011, 0.011, 0.006, Math.sin(a) * 0.112, 0.028, Math.cos(a) * 0.112, 10).rotation.y = a;
}
mmEll(g, M.velvet, 0.096, 0.05, 0.096, 0, 0.03, 0, 16);
return { g: g, h: 0.14 };
},
function () {
var M = raM(), g = new THREE.Group();
mmLathe(g, M.silver, [[0, 0], [0.05, 0], [0.052, 0.01], [0.01, 0.02], [0.008, 0.3], [0.004, 0.34], [0, 0.35]], 0, 0, 0, 20);
mmLathe(g, M.violet, [[0.01, 0.06], [0.04, 0.08], [0.046, 0.13], [0.042, 0.18], [0.014, 0.22]], 0, 0, 0, 20);
for (var i = 0; i < 5; i++)
mmTorus(g, M.violet, 0.044 - Math.abs(i - 2) * 0.004, 0.003, 0, 0.09 + i * 0.022, 0, Math.PI / 2 + 0.2, 0, 0);
return { g: g, h: 0.36 };
},
function () {
var M = raM(), g = new THREE.Group(), flakes = [], snow = mmMat(0xFFFFFF, { shine: 10 });
mmLathe(g, M.walnut, [[0, 0], [0.1, 0], [0.105, 0.01], [0.09, 0.05], [0.07, 0.06], [0, 0.06]], 0, 0, 0, 24);
mmEll(g, M.white, 0.07, 0.012, 0.07, 0, 0.062, 0, 14);
var pine = mmMat(0x1E4A2A, { shine: 8 });
[[-0.03, 0.01], [0.035, -0.02], [0, 0.035]].forEach(function (p) { mmCone(g, pine, 0.014, 0.05, p[0], 0.09, p[1], 0, 0, 0, 8); });
mmSlab(g, mmMat(0xA84A3A, { shine: 10 }), 0.028, 0.022, 0.024, 0, 0.078, -0.02);
mmCone(g, M.white, 0.022, 0.016, 0, 0.097, -0.02, 0, Math.PI / 4, 0, 4);
var R = wRand(77);
for (var i = 0; i < (mmLite() ? 10 : 24); i++) {
var f = mmEll(g, snow, 0.003, 0.003, 0.003, (R() - 0.5) * 0.11, 0.08 + R() * 0.1, (R() - 0.5) * 0.11, 4);
f.userData.s = R();
flakes.push(f);
}
mmEll(g, M.glass, 0.085, 0.085, 0.085, 0, 0.135, 0, 22);
return { g: g, h: 0.22, anim: function (dt) { flakes.forEach(function (f) { f.position.y -= dt * 0.012 * (0.6 + f.userData.s); if (f.position.y < 0.072)
f.position.y = 0.19; }); } };
},
function () {
var M = raM(), g = new THREE.Group(), drum;
mmSlab(g, M.walnut, 0.2, 0.08, 0.13, 0, 0.04, 0);
mmSlab(g, M.velvet, 0.18, 0.01, 0.11, 0, 0.081, 0);
var L = mmG(g, 0, 0.08, -0.065, -1.9, 0, 0);
mmSlab(L, M.walnut, 0.2, 0.012, 0.13, 0, 0.006, 0.065);
mmEll(L, M.gold, 0.02, 0.002, 0.02, 0, 0.013, 0.065, 10);
drum = mmCyl(g, M.brass, 0.018, 0.018, 0.11, 0, 0.1, 0.01, 0, 0, Math.PI / 2, 14);
for (var i = 0; i < 9; i++)
mmSlab(g, M.silver, 0.006, 0.003, 0.04, -0.045 + i * 0.011, 0.1, 0.04);
mmCyl(g, M.brass, 0.004, 0.004, 0.04, 0.12, 0.04, 0, 0, 0, Math.PI / 2, 6);
mmTorus(g, M.brass, 0.012, 0.003, 0.145, 0.04, 0, 0, Math.PI / 2, 0);
return { g: g, h: 0.18, anim: function (dt) { drum.rotation.x += dt * 0.8; } };
},
function () {
var M = raM(), g = new THREE.Group();
mmEll(g, M.gold, 0.04, 0.055, 0.04, 0, 0.055, 0, 18);
mmCone(g, M.gold, 0.012, 0.02, 0, 0.003, 0, Math.PI, 0, 0, 10);
var cap = mmMat(0xA8803A, { shine: 50 });
mmLathe(g, cap, [[0, 0.11], [0.03, 0.108], [0.045, 0.095], [0.046, 0.08], [0.04, 0.075]], 0, 0, 0, 20);
for (var i = 0; i < 3; i++)
mmTorus(g, cap, 0.044 - i * 0.006, 0.003, 0, 0.082 + i * 0.009, 0, Math.PI / 2, 0, 0);
mmCyl(g, cap, 0.004, 0.005, 0.025, 0.003, 0.122, 0, 0, 0, 0.2, 6);
return { g: g, h: 0.13 };
},
function () {
var M = raM(), g = new THREE.Group();
var pts = [[0.14, 0.05, 0], [0.08, 0.09, 0], [0, 0.1, 0.01], [-0.07, 0.07, 0.02], [-0.1, 0.03, 0.02], [-0.12, 0.01, 0]];
mmTube(g, M.ivory, [[0.14, 0.05, 0], [0.08, 0.09, 0], [0, 0.1, 0.01], [-0.07, 0.07, 0.02]], 0.03, 0, 0, 0, 18);
mmHorn(g, M.ivory, [[-0.07, 0.07, 0.02], [-0.1, 0.03, 0.02], [-0.12, 0.008, 0]], 0.03, 0, 0, 0);
mmLathe(mmG(g, 0.14, 0.05, 0, 0, 0, -Math.PI / 2 - 0.6), M.gold, [[0.03, 0], [0.04, 0.006], [0.05, 0.03], [0.046, 0.032]], 0, 0, 0, 18);
[[0.08, 0.09, 0], [-0.02, 0.095, 0.012]].forEach(function (p) { mmTorus(g, M.gold, 0.033, 0.004, p[0], p[1], p[2], 0, Math.PI / 2, 0); });
return { g: g, h: 0.15 };
},
function () {
var M = raM(), g = new THREE.Group(), F = mmG(g, 0, 0.13, 0);
var face = mmMesh(new THREE.SphereGeometry(1, mmSeg(24), mmSeg(14), 0, Math.PI * 2, 0, Math.PI / 2), M.gold, 0, 0, 0, F);
face.scale.set(0.09, 0.11, 0.05);
face.rotation.x = -Math.PI / 2;
face.material = mmMat(0xD8B04A, { shine: 95, spec: 0xFFF0C0, ds: 1 });
[-1, 1].forEach(function (s) {
mmEll(F, M.dark, 0.022, 0.011, 0.012, s * 0.036, 0.025, 0.038, 12).rotation.z = s * 0.25;
mmTube(F, mmMat(0x8A1A2A, { shine: 30 }), [[s * 0.085, 0.02, 0], [s * 0.12, 0.0, -0.02], [s * 0.14, -0.05, -0.03]], 0.004, 0, 0, 0, 10);
});
mmTube(F, M.dark, [[-0.03, -0.045, 0.04], [0, -0.06, 0.045], [0.03, -0.045, 0.04]], 0.004, 0, 0, 0, 10);
[-0.03, 0, 0.03].forEach(function (x, i) { mmFlat(F, [M.ruby, M.violet, M.sapph][i], [[0, 0], [0.012, 0.05], [0, 0.1], [-0.012, 0.05]], 0.002, x + 0.03, 0.08, 0, 0, 0, -0.4 + i * 0.4); });
mmCyl(g, M.walnut, 0.004, 0.005, 0.13, 0.08, 0.06, 0, 0, 0, -0.3, 6);
return { g: g, h: 0.3 };
},
function () {
var M = raM(), g = new THREE.Group(), ink = mmMat(0x0A0A2A, { shine: 120, op: 0.9, spec: 0x8888FF }), star = mmMat(0xFFF0C0, { glow: 1 });
mmLathe(g, ink, [[0, 0], [0.06, 0], [0.065, 0.01], [0.06, 0.06], [0.03, 0.08], [0.022, 0.09]], 0, 0, 0, 22);
var R = wRand(31);
for (var i = 0; i < 12; i++) {
var a = R() * 6.28, r = 0.02 + R() * 0.03;
mmEll(g, star, 0.0025, 0.0025, 0.0025, Math.sin(a) * r, 0.015 + R() * 0.04, Math.cos(a) * r, 4);
}
mmLathe(g, M.silver, [[0.024, 0.088], [0.03, 0.09], [0.03, 0.1], [0.02, 0.11], [0, 0.112]], 0, 0, 0, 18);
mmEll(g, M.silver, 0.008, 0.008, 0.008, 0, 0.118, 0, 8);
return { g: g, h: 0.13 };
},
function () {
var M = raM(), g = new THREE.Group(), water = mmMat(0xA8C8E0, { shine: 140, op: 0.75 });
mmLathe(g, M.silver, [[0, 0], [0.06, 0], [0.062, 0.008], [0.03, 0.02], [0.012, 0.05], [0.012, 0.12], [0.02, 0.13], [0.05, 0.15], [0.065, 0.2], [0.068, 0.24], [0.064, 0.24], [0.06, 0.2], [0.045, 0.155], [0, 0.15]], 0, 0, 0, 28);
mmCyl(g, water, 0.06, 0.05, 0.004, 0, 0.225, 0, 0, 0, 0, 24);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
mmEll(g, i % 2 ? M.sapph : M.pearl, 0.008, 0.008, 0.006, Math.sin(a) * 0.013, 0.085, Math.cos(a) * 0.013, 8).rotation.y = a;
}
mmTorus(g, M.gold, 0.066, 0.003, 0, 0.2, 0, Math.PI / 2, 0, 0);
return { g: g, h: 0.25 };
},
function () {
var M = raM(), g = new THREE.Group(), R = mmG(g, 0, 0.03, 0);
mmTorus(R, M.rgold, 0.022, 0.006, 0, 0, 0, 0, 0, 0);
mmCyl(R, M.rgold, 0.016, 0.018, 0.008, 0, 0.027, 0, 0, 0, 0, 18);
mmCyl(R, mmMat(0x6A2A1A, { shine: 60 }), 0.012, 0.012, 0.002, 0, 0.032, 0, 0, 0, 0, 18);
mmCone(R, M.gold, 0.006, 0.005, 0, 0.035, -0.004, 0, 0, 0, 5);
mmTorus(R, M.gold, 0.005, 0.0012, 0, 0.034, 0.004, Math.PI / 2, 0, 0);
return { g: g, h: 0.07 };
},
function () {
var M = raM(), g = new THREE.Group(), W = mmG(g, 0, 0.13, 0, 0, 0, 0);
var D = mmG(W, 0, 0, 0, Math.PI / 2, 0, 0);
mmCyl(D, M.brass, 0.1, 0.1, 0.016, 0, 0, 0, 0, 0, 0, 32);
mmCyl(D, M.gold, 0.02, 0.02, 0.03, 0, 0, 0, 0, 0, 0, 14);
for (var i = 0; i < 20; i++) {
var a = i / 20 * Math.PI * 2;
var t = mmSlab(D, M.brass, 0.022, 0.016, 0.024, Math.sin(a) * 0.108, 0, Math.cos(a) * 0.108);
t.rotation.set(Math.PI / 2, 0, 0);
t.rotation.z = 0;
t.rotation.y = a;
}
for (var j = 0; j < 5; j++) {
var b = j / 5 * Math.PI * 2;
mmCyl(D, M.dark, 0.018, 0.018, 0.018, Math.sin(b) * 0.06, 0, Math.cos(b) * 0.06, 0, 0, 0, 10);
}
mmLathe(g, M.walnut, [[0, 0], [0.05, 0], [0.05, 0.015], [0.012, 0.02], [0.01, 0.12]], 0, 0, 0, 14);
return { g: g, h: 0.24, anim: function (dt) { W.rotation.z += dt * 0.25; } };
},
function () {
var M = raM(), g = new THREE.Group(), sand = mmMat(0xD8B878, { shine: 10 });
[0, 0.2].forEach(function (y) { mmCyl(g, M.walnut, 0.07, 0.07, 0.016, 0, y + 0.008, 0, 0, 0, 0, 20); });
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2;
mmCyl(g, M.walnut, 0.006, 0.006, 0.19, Math.sin(a) * 0.058, 0.108, Math.cos(a) * 0.058, 0, 0, 0, 8);
}
mmLathe(g, M.glass, [[0, 0.016], [0.045, 0.02], [0.05, 0.05], [0.03, 0.09], [0.005, 0.108], [0.03, 0.126], [0.05, 0.166], [0.045, 0.196], [0, 0.2]], 0, 0, 0, 22);
mmCone(g, sand, 0.04, 0.045, 0, 0.04, 0, Math.PI, 0, 0, 16);
mmLathe(g, sand, [[0, 0.15], [0.045, 0.16], [0.045, 0.19], [0, 0.194]], 0, 0, 0, 16);
mmCyl(g, sand, 0.0012, 0.0012, 0.07, 0, 0.1, 0, 0, 0, 0, 4);
return { g: g, h: 0.22 };
},
function () {
var M = raM(), g = new THREE.Group(), L = mmG(g, 0, 0.05, 0, -1.2, 0, 0);
mmEll(L, M.gold, 0.035, 0.045, 0.012, 0, 0, 0, 18);
mmTorus(L, M.gold, 0.036, 0.003, 0, 0, 0.006, 0, 0, 0);
mmEll(L, M.ruby, 0.008, 0.008, 0.004, 0, 0.005, 0.01, 10);
mmTorus(L, M.gold, 0.006, 0.0018, 0, 0.05, 0, 0, Math.PI / 2, 0);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 1.6 + 0.8;
mmTorus(g, M.gold, 0.005, 0.0012, Math.sin(a) * 0.07, 0.004, Math.cos(a) * 0.06 + 0.05, Math.PI / 2, 0, a);
}
return { g: g, h: 0.07 };
},
function () {
var M = raM(), g = new THREE.Group(), F = mmG(g, 0, 0.02, 0, -1.35, 0, 0.3), glassM = mmMat(0xE8F0F8, { shine: 200, spec: 0xFFFFFF });
mmEll(F, M.silver, 0.075, 0.095, 0.01, 0, 0.1, 0, 22);
mmEll(F, glassM, 0.065, 0.085, 0.012, 0, 0.1, 0.002, 22);
mmTorus(mmG(F, 0, 0.1, 0.004), M.silver, 1, 0.08, 0, 0, 0).scale.set(0.072, 0.092, 0.1);
mmCaps(F, M.silver, 0.012, 0.009, 0.1, 0, -0.03, 0, 0, 0, 0, 12);
var veil = mmMat(0x7A3AA8, { shine: 20, op: 0.75, ds: 1 });
mmFlat(g, veil, [[-0.12, 0], [0.14, 0], [0.1, 0.06], [0.02, 0.04], [-0.08, 0.07]], 0.002, 0, 0.006, 0.03, -Math.PI / 2, 0, 0.2);
return { g: g, h: 0.1 };
},
function () {
var M = raM(), g = new THREE.Group(), ink = mmMat(0x5A3A22, { shine: 6 });
mmCyl(g, M.paper, 0.025, 0.025, 0.26, 0, 0.025, -0.07, 0, 0, Math.PI / 2, 16);
mmSlab(g, M.paper, 0.26, 0.004, 0.14, 0, 0.004, 0.0);
[[-0.08, 0.02], [0.03, -0.02], [0.06, 0.03]].forEach(function (p, i) { mmTube(g, ink, [[p[0] - 0.03, 0.0075, p[1]], [p[0], 0.0075, p[1] + 0.02], [p[0] + 0.03, 0.0075, p[1] - 0.01], [p[0] + 0.04, 0.0075, p[1] + 0.02]], 0.0015, 0, 0, 0, 10); });
[-0.14, 0.14].forEach(function (x) { mmEll(g, M.wood, 0.01, 0.03, 0.03, x, 0.025, -0.07, 8); });
mmCyl(g, M.walnut, 0.008, 0.008, 0.28, 0, 0.008, 0.075, 0, 0, Math.PI / 2, 10);
return { g: g, h: 0.06 };
},
function () {
var M = raM(), g = new THREE.Group(), pts = [], n = 18;
for (var i = 0; i <= n; i++) {
var t = i / n, a = t * Math.PI * 3.2, r = 0.012 + 0.07 * (1 - t);
pts.push([Math.cos(a) * r * 0.6, 0.02 + t * 0.11, Math.sin(a) * r * 0.6]);
}
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
for (var j = 0; j < n; j++) {
var p = c.getPoint(j / n), rr = 0.045 * (1 - j / n) + 0.006;
mmEll(g, j % 2 ? M.pearl : mmMat(0xE8A8B0, { shine: 110, spec: 0xFFFFFF }), rr, rr * 0.8, rr, p.x, p.y, p.z, 12);
}
mmEll(g, mmMat(0xF8E0D8, { shine: 120, ds: 1 }), 0.05, 0.02, 0.035, 0.035, 0.035, 0.02, 14);
return { g: g, h: 0.15 };
},
function () {
var M = raM(), g = new THREE.Group(), A = mmG(g, 0, 0.13, 0, 0.35, 0, 0.2), rete;
mmCyl(mmG(A, 0, 0, 0, Math.PI / 2, 0, 0), M.brass, 0.1, 0.1, 0.01, 0, 0, 0, 0, 0, 0, 32);
mmTorus(A, M.gold, 0.1, 0.006, 0, 0, 0.006, 0, 0, 0);
rete = mmG(A, 0, 0, 0.008);
mmTorus(rete, M.silver, 0.06, 0.0025, 0, 0, 0, 0, 0, 0);
mmTorus(rete, M.silver, 0.035, 0.0025, 0.02, 0.01, 0, 0, 0, 0);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
mmFlat(rete, M.silver, [[0, 0], [0.004, 0.07], [0, 0.085], [-0.004, 0.07]], 0.002, 0, 0, 0, 0, 0, a);
}
mmFlat(A, M.dark, [[0, -0.002], [0.09, 0], [0, 0.002]], 0.003, 0, 0, 0.012, 0, 0, 0.7);
mmTorus(A, M.gold, 0.014, 0.003, 0, 0.112, 0, 0, Math.PI / 2, 0);
mmCyl(g, M.walnut, 0.03, 0.04, 0.02, 0, 0.01, 0, 0, 0, 0, 14);
return { g: g, h: 0.26, anim: function (dt) { rete.rotation.z += dt * 0.1; } };
},
function (g, d) {
var w = mmMat(d.mark, { shine: 8 });
mmCyl(g, w, 0.32, 0.42, 0.55, 0, 0.27, 0, 0, 0, 0, 12);
mmCyl(g, mmMat(0x8A6A48, { shine: 6 }), 0.3, 0.3, 0.02, 0, 0.55, 0, 0, 0, 0, 12);
[0, 2.1, 4.2].forEach(function (a) { mmTube(g, w, [[Math.sin(a) * 0.3, 0.08, Math.cos(a) * 0.3], [Math.sin(a) * 0.55, 0.02, Math.cos(a) * 0.55], [Math.sin(a) * 0.7, -0.04, Math.cos(a) * 0.7]], 0.06, 0, 0, 0, 8); });
},
function (k) {
if (RA.busy)
return;
var d = RA.list[k];
if (!raSigned()) {
raSay("Something is hidden here. Sign in to keep what you find.");
return;
}
if (RA.missing) {
raSay("Whatever is hidden here can't be taken out just yet. Come back soon.");
return;
}
RA.busy = true;
raRpc("artifact_claim", { p_key: k, p_place: RA.place }).then(function (o) {
RA.busy = false;
if (!o || !o.ok) {
raSay(raEsc((o && o.say) || "Not now."));
RA.rowsAt = -99;
if (o && o.taken) {
RA.rows[k] = RA.rows[k] || { k: k, here: true };
RA.rows[k].claimed = true;
RA.rows[k].mine = !!o.mine;
raEmptyCard(k);
}
return;
}
var r = RA.rows[k] = RA.rows[k] || { k: k, here: true };
r.claimed = true;
r.mine = true;
RA.mineAt = -99;
mmTone(523, 0.2);
setTimeout(function () { mmTone(659, 0.2); }, 180);
setTimeout(function () { mmTone(880, 0.4); }, 360);
raSay(raEsc(d.open) + " <b>" + raEsc(d.name) + " is yours.</b> There is only one in the universe; it's in your Backpack under Rare artifacts. What becomes of it is up to you." + (RA_POW[d.k] ? " Its power: <b>" + raEsc(RA_POW[d.k].n) + "</b>. Wield it from the Backpack; it wakes where the danger is Risky or worse." : ""));
raRiseStart(k);
}).catch(function (e) { RA.busy = false; if (mmMissing(e)) {
RA.missing = true;
raSay("Whatever is hidden here can't be taken out just yet. Come back soon.");
}
else
raSay("Couldn't reach the city. Try again in a moment."); });
},
function (dt) {
var R = RA.rise;
R.t += dt;
var e = Math.min(1, R.t / 1.6), up = 1 - Math.pow(1 - e, 3);
R.g.position.y = R.y0 + 0.2 + up * 1.2;
R.g.rotation.y += dt * 0.8;
if (R.B.anim)
try {
R.B.anim(dt);
}
catch (x) { }
if (R.t > 4.6) {
var f = Math.max(0, 1 - (R.t - 4.6) / 0.6);
R.g.scale.setScalar(1.8 * f);
}
if (R.t > 5.2) {
raDispose(R.g);
RA.rise = null;
}
},
function (k) {
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
if (RA.hold)
raHoldEnd();
var B = RA_MODEL[k](), g = new THREE.Group();
g.add(B.g);
g.userData.noCull = 1;
var s = 0.32 / Math.max(0.08, B.h);
g.scale.setScalar(Math.min(4, s));
scene.add(g);
RA.hold = { k: k, g: g, B: B, t: 0, at: { x: camera.position.x, z: camera.position.z } };
raHoldTick(0);
var d = RA.list[k];
raSay("<b>" + raEsc(d.name) + "</b>. " + raEsc(d.tale) + " <span style='opacity:.75'>(Walk on to put it away.)</span>");
},
function (dt) {
var H = RA.hold;
H.t += dt;
if (H.t > 16 || Math.hypot(camera.position.x - H.at.x, camera.position.z - H.at.z) > 2.5) {
raHoldEnd();
return;
}
var f = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
H.g.position.copy(camera.position).addScaledVector(f, 0.75);
H.g.position.y -= 0.22;
H.g.rotation.y += dt * 0.5;
if (H.B.anim)
try {
H.B.anim(dt);
}
catch (e) { }
},
function (k) {
var d = RA.list[k], S = raHideSpot(d), A = (typeof WLD !== "undefined" && WLD.arrive) || { x: 0, z: 0 };
if (RA.place === "city")
A = { x: 0, z: 0 };
if (d.isle) {
var s0 = raSeed(d);
A = { x: s0[0] - d.seed[0], z: s0[1] - d.seed[1] };
}
var dx = S.x - A.x, dz = S.z - A.z, dist = Math.hypot(dx, dz), b = (Math.atan2(dx, -dz) * 180 / Math.PI + 360) % 360;
var dir = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(b / 45) % 8];
var far = dist < 250 ? "not far" : dist < 600 ? "a fair walk" : "a long walk";
return d.isle ? "On " + raIsleName(d) + ", " + dir + " of its middle." : (RA.place === "city" ? "Somewhere " + dir + " of the city's heart, " + far + " out." : dir.charAt(0).toUpperCase() + dir.slice(1) + " of where travellers arrive, " + far + ".");
},
function (place) {
var h = raHeard(), k = RA.order.filter(function (k) { var d = RA.list[k]; return d.at === place && !h[k] && !raClaimed(k) && !(RA.rows[k] && RA.rows[k].mine); })[0];
if (!k || raKeeper())
return;
var d = RA.list[k];
h[k] = { at: Date.now(), way: raRumourWay(k) };
raLSput("ra.heard", h);
mmTone(587, 0.25);
raSay("👂 <b>A traveller's rumour.</b> " + raEsc(d.rumour) + " <i>" + raEsc(h[k].way) + "</i> <span style='opacity:.75'>(Kept in your Backpack, under Rare artifacts.)</span>");
},
function (k) {
var d = RA.list[k], h = raHeard()[k] || {};
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>A traveller's rumour: " + raEsc(raWhereWords(d)) + "</div><div style='margin:8px 0;font-style:italic;line-height:1.6'>" + raEsc(d.rumour) + "</div>" +
(h.way ? "<div style='opacity:.9;margin-bottom:6px'>" + raEsc(h.way) + "</div>" : "") +
"<div style='opacity:.8;font-size:13px'>It won't be lying in plain sight. When you're close, look carefully at anything plain: you have to be right beside it to notice.</div>", {});
},
function () {
var mine = (RA.mine || []).filter(function (r) { return RA.list[r.k]; }), heard = raHeard(), have = {};
mine.forEach(function (r) { have[r.k] = 1; });
var rum = RA.order.filter(function (k) { return heard[k] && !have[k]; }), K = raKeeper() && RA.klist;
if (!mine.length && !rum.length && !K)
return "";
var row = function (inner, btns) { return '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;flex-wrap:wrap"><span style="flex:1 1 180px">' + inner + '</span>' + (btns || "") + '</div>'; };
var b = function (fn, t) { return '<button class="btn" onclick="' + fn + '">' + t + '</button>'; };
var x = '<div style="margin-top:8px"><b>🏺 Rare artifacts</b> <span style="opacity:.7">one of each in the universe</span></div>';
if (mine.length)
x += '<div style="opacity:.8">' + mine.length + ' of ' + RA_DEF.length + ' found by you</div>';
mine.forEach(function (r) {
var d = RA.list[r.k];
x += row(raEsc(d.icon) + " " + raEsc(d.name) + (r.found_at ? ' <span style="opacity:.7">found ' + raEsc(new Date(r.found_at).toLocaleDateString()) + '</span>' : ""), b("raWield('" + d.k + "')", RAP.wield === d.k ? "✨ Wielding" : "Wield its power") + b("raPowCard('" + d.k + "')", "Powers") + b("raHoldUp('" + d.k + "')", "Hold it up") + b("raAbout('" + d.k + "')", "About") + b("raGiveCard('" + d.k + "')", "Give") + b("raRehideCard('" + d.k + "')", "Hide it here"));
});
if (rum.length) {
x += '<div style="opacity:.8;margin-top:4px">Rumours you have heard</div>';
rum.forEach(function (k) { var d = RA.list[k]; x += row("👂 " + raEsc(raWhereWords(d)) + ': <span style="opacity:.8">' + raEsc(d.rumour.slice(0, 70)) + (d.rumour.length > 70 ? "…" : "") + '</span>', b("raRumourCard('" + k + "')", "Read")); });
}
if (K) {
x += '<div style="opacity:.8;margin-top:6px">The Keeper: every artifact</div>';
K.forEach(function (r) {
var d = RA.list[r.k];
if (!d)
return;
x += row(raEsc(d.icon) + " " + raEsc(d.name) + ' <span style="opacity:.7">' + raEsc(raWhereWords(d, r.place)) + (r.x != null ? " (moved)" : "") + (r.owner ? ", found by " + raEsc(r.owner_name || "a dreamer") : ", waiting") + '</span>', b("raKeeperGo('" + d.k + "')", "Go there") + b("raKeeperHere('" + d.k + "')", "Here") + b("raKeeperReset('" + d.k + "')", "Hide"));
});
}
return x;
},
function (k) {
var d = RA.list[k];
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
worldCard(worldFacts(d.icon + " " + d.name, "A rare artifact: one in the whole universe", [["First hidden in", raWhereWords(d)], ["What becomes of it", "Your choice: keep it, give it to a dreamer beside you, or hide it again"]].concat(raPowRows(k)), [d.tale]) +
(raOwns(k) ? worldBtn("wield", RAP.wield === k ? "Put its power aside" : "Wield its power", "") : "") +
worldBtn("hold", "Hold it up and look at it", "") + worldBtn("give", "Give it to a dreamer beside you", "") + worldBtn("hide", "Hide it again where you stand", "Anyone may find it then, you included"), { wield: function () { worldCard(null); raWield(k); }, hold: function () { worldCard(null); raHoldUp(k); }, give: function () { raGiveCard(k); }, hide: function () { raRehideCard(k); } });
},
function (k) {
var d = RA.list[k];
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
var near = (typeof presenceList === "function" ? presenceList() : []).filter(function (p) { return p.dist < 8; }).slice(0, 6), fns = {}, h = "";
if (!near.length) {
worldCard(worldFacts("Give " + d.name, "", [], ["Stand right beside the dreamer you want to give it to, then try again. Only another dreamer can take it: never a stand-in or a shopkeeper."]), {});
return;
}
near.forEach(function (p, i) { h += worldBtn("g" + i, "Give it to " + raEsc(p.name), Math.round(p.dist) + " m away"); fns["g" + i] = function () { worldCard(null); raGive(k, p.id, p.name); }; });
worldCard(worldFacts("Give " + d.name, "It will be theirs, to keep, give or hide as they choose", [], ["There is only one. Once it is theirs, it is not yours to ask back."]) + h, fns);
},
function (k, to, name) {
raRpc("artifact_give", { p_key: k, p_to: to }).then(function (o) {
raSay(raEsc((o && o.say) || "Not now."));
if (o && o.ok) {
RA.mineAt = -99;
RA.mine = (RA.mine || []).filter(function (r) { return r.k !== k; });
if (RA.hold && RA.hold.k === k)
raHoldEnd();
mmTone(659, 0.25);
}
}).catch(function (e) { raSay(mmMissing(e) ? "Giving it isn't open yet. Come back soon." : "Couldn't reach the city. Try again in a moment."); });
},
function (k) {
var d = RA.list[k];
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
if (!raWhere()) {
worldCard(worldFacts("Hide " + d.name, "", [], ["Stand outdoors somewhere first: in the city, a world, a planet or a world's great city."]), {});
return;
}
worldCard(worldFacts("Hide " + d.name + " here?", "", [], ["You tuck it under a plain stone a step in front of you. It stops being yours: whoever finds it first keeps it, you included."]) + worldBtn("ok", "Hide it here", ""), { ok: function () { worldCard(null); raRehide(k); } });
},
function (k) {
var place = raWhere();
if (!place)
return;
var L = mmL(), x = L.x - Math.sin(yaw) * 2, z = L.z - Math.cos(yaw) * 2, y = mmGround(x, z);
raRpc("artifact_rehide", { p_key: k, p_place: place, p_x: +x.toFixed(2), p_y: +y.toFixed(2), p_z: +z.toFixed(2) }).then(function (o) {
raSay(raEsc((o && o.say) || "Not now."));
if (o && o.ok) {
RA.mineAt = -99;
RA.mine = (RA.mine || []).filter(function (r) { return r.k !== k; });
if (RA.hold && RA.hold.k === k)
raHoldEnd();
RA.rowsAt = -99;
mmTone(330, 0.3);
}
}).catch(function (e) { raSay(mmMissing(e) ? "Hiding it again isn't open yet. Come back soon." : "Couldn't reach the city. Try again in a moment."); });
},
function (k) {
var d = RA.list[k], r = RA.rows[k] || {};
worldCard(worldFacts(d.icon + " " + d.name, "The Keeper sees it where it waits; nobody else does", [["Under", d.what], ["Found by", r.claimed ? (r.owner_name || "a dreamer") : "nobody yet"]], [d.tale]) +
worldBtn("hide", "Send it back into hiding", "Back under its own hiding spot, waiting to be found again") + worldBtn("move", "Move it", "Go where you want it, then the Backpack, then Here"), { hide: function () { worldCard(null); raKeeperReset(k); }, move: function () { worldCard(null); RA.kmove = k; raSay("<b>Moving " + raEsc(d.name) + ".</b> Go where you want it (outdoors), then open the Backpack and press <b>Here</b> beside it."); raKeeperList(); } });
},
function (k) {
if (!raKeeper())
return;
raRpc("keeper_artifact_reset", { p_key: k }).then(function (o) { raSay(raEsc((o && o.say) || "Done.")); RA.rowsAt = -99; RA.klist = null; if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { } })
.catch(function (e) { raSay(mmMissing(e) ? "The Keeper's artifact controls aren't open yet (an update to run)." : "Couldn't reach the city."); });
},
function (k) {
if (!raKeeper())
return;
var place = raWhere();
if (!place) {
raSay("Stand outdoors somewhere first: the city, a world, a planet or a world's great city.");
return;
}
var L = mmL(), x = L.x - Math.sin(yaw) * 2, z = L.z - Math.cos(yaw) * 2, y = mmGround(x, z);
raRpc("keeper_artifact_move", { p_key: k, p_place: place, p_x: +x.toFixed(2), p_y: +y.toFixed(2), p_z: +z.toFixed(2) }).then(function (o) {
raSay(raEsc((o && o.say) || "Moved."));
RA.rowsAt = -99;
RA.kmove = null;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
})
.catch(function (e) { raSay(mmMissing(e) ? "The Keeper's artifact controls aren't open yet (an update to run)." : "Couldn't reach the city."); });
},
function (k) {
if (!raKeeper())
return;
var r = (RA.klist || []).filter(function (q) { return q.k === k; })[0], d = RA.list[k], place = r ? r.place : d.at;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
var planet = typeof SP_SURF !== "undefined" && !!SP_SURF[place];
if (place === "city") {
if (typeof WLD !== "undefined" && WLD.on)
worldHome();
}
else if (planet)
worldGo("surface", { k: place });
else if (/^stn_/.test(place))
worldGo("station", { station: place.slice(4) });
else if (WORLDS[place])
worldGo(place, {});
else {
raSay("Can't go there from here.");
return;
}
RA.kgo = { k: k, place: place, r: r, t: 0 };
},
function (dt) {
var G = RA.kgo;
G.t += dt;
if (G.t > 20) {
RA.kgo = null;
return;
}
if (RA.place !== G.place || G.t < 0.8)
return;
var d = RA.list[G.k], moved = G.r && G.r.x != null;
if (G.place === "sea" && d.isle && !moved && typeof seaAshore === "function" && typeof SEA_PLACES !== "undefined") {
try {
seaAshore(SEA_PLACES.filter(function (p) { return p.k === d.isle; })[0]);
}
catch (e) { }
}
var S = moved ? { x: +G.r.x, z: +G.r.z } : raHideSpot(d), b = mmBase();
if (!b)
return;
var x = S.x + 2.4, z = S.z + 2.4, y = mmGround(x, z);
camera.position.set(b.x + x, y + 1.72, b.z + z);
yaw = Math.atan2(x - S.x, z - S.z);
pitch = -0.25;
if (typeof flyY !== "undefined")
flyY = y;
raSay("<b>" + raEsc(d.name) + "</b> waits just in front of you, under " + raEsc(d.what) + ".");
RA.kgo = null;
},
function (k) {
if (k && !raOwns(k)) {
raSay("Only the one who holds it can wield it.");
return;
}
RAP.wield = (RAP.wield === k) ? null : k;
raLSput("ra.wield", { k: RAP.wield });
var d = RAP.wield && RA.list[RAP.wield], P = d && RA_POW[RAP.wield];
if (d)
raSay("<b>You wield " + raEsc(d.name) + ".</b> " + raEsc(P.pasT) + " Call on <b>" + raEsc(P.n) + "</b> with " + raPowKeyWord() + ". Its powers wake wherever the danger is Risky or worse.");
else
raSay("You put the artifact's power aside.");
raPowBtnPaint();
if (typeof bkpPaint === "function")
try {
bkpPaint();
}
catch (e) { }
},
function (o, dmg) {
dmg = Math.max(1, Math.min(25, Math.round(dmg || 25)));
try {
dgrRpc("danger_send", { p_to: o.id, p_w: dgrWhere(), p_body: { t: "hit", d: dmg, ra: 1 } }).then(function (r) { if (r && r.ok === false && r.no)
DGR.no[o.id] = Date.now() + 60000; }).catch(function () { });
}
catch (e) { }
if (o.g && typeof harmKnock === "function")
try {
harmKnock(o.g, false);
}
catch (e) { }
},
function () {
var k = RAP.wield, P = k && RA_POW[k], d = k && RA.list[k];
if (!P) {
raSay("Wield an artifact first: open the Backpack, find it under Rare artifacts, and choose <b>Wield its power</b>.");
return;
}
if (!raPowHere()) {
raSay("<b>" + raEsc(d.name) + "</b> is quiet here. Its powers wake only where the danger is Risky (level 2) or worse.");
return;
}
var now = raPT(), left = (RAP.cd[k] || 0) - now;
if (left > 0) {
raSay("<b>" + raEsc(P.n) + "</b> is still gathering itself: " + Math.ceil(left) + " seconds.");
return;
}
if ((raBattle() && BW.downT) || (typeof DGR !== "undefined" && DGR.downT))
return;
RAP.cd[k] = now + P.cd;
var hits = 0, said = [];
P.act.forEach(function (e) { hits += raEffect(e, P, now, said) || 0; });
raRingFx(Math.min(14, (P.act[0].aoe || P.act[0].cone || 8)), P.col);
var Pp = camera.position;
raFx(Pp.x, Pp.y - 1, Pp.z, P.col, 60, "swirl");
if (typeof playTone === "function")
try {
playTone(330, 0.18);
setTimeout(function () { playTone(495, 0.22); }, 120);
}
catch (e) { }
raSay("<b>" + raEsc(d.icon + " " + P.n) + ".</b> " + raEsc(P.actT) + (hits ? " (" + hits + " struck)" : ""));
raPowBtnPaint();
},
function (e, P, now, said) {
var n = 0, P0 = camera.position;
if (e.aoe) {
raBwFoes(e.aoe).forEach(function (o) {
n++;
if (e.dmg)
raStrike(o, e.dmg, { knock: e.knock, slow: e.slow });
else if (e.knock && o.F) {
var a = Math.atan2(o.F.x - (P0.x - BW.base), o.F.z - P0.z);
o.F.x += Math.sin(a) * e.knock;
o.F.z += Math.cos(a) * e.knock;
}
var F = o.F;
if (F) {
if (e.stun)
F.raFrz = now + e.stun;
if (e.calm)
F.raCalm = now + e.calm;
if (e.slow)
F.slow = Math.max(F.slow || 0, e.slow);
if (e.lift) {
F.raLift = now + e.lift;
F.raLiftD = e.dmg || 0;
F.raLiftY = F.y;
}
if (e.dot)
RAP.dots.push({ o: o, until: now + (e.dotS || 5), dps: e.dot, t: 0 });
raFx(o.x, o.y, o.z, P.col, 24);
}
else if (o.M && e.stun) {
o.M.cool = Math.max(o.M.cool || 0, e.stun);
}
});
if (e.dmg || e.dot)
raDreamers(Math.min(e.aoe, RA_PVP_R)).forEach(function (o) { n++; raHitDreamer(o, 25); });
}
if (e.cone) {
raBwFoes(e.cone).filter(function (o) { return raFacing(o, e.arc); }).forEach(function (o) { n++; raStrike(o, e.dmg, { knock: e.knock }); raFx(o.x, o.y, o.z, P.col, 24); });
raDreamers(RA_PVP_R).filter(function (o) { return Math.abs(o.rel) < e.arc; }).forEach(function (o) { n++; raHitDreamer(o, 25); });
}
if (e.star) {
var t = raBwFoes(e.star).filter(function (o) { return raFacing(o, 0.35); })[0];
if (t) {
n++;
raStrike(t, e.dmg, { knock: 3 });
raFx(t.x, t.y + 6, t.z, P.col, 60, "fall");
raFx(t.x, t.y, t.z, P.col, 40, "burst");
}
else {
var q = raDreamers((typeof DGR_SHOT_REACH !== "undefined" ? DGR_SHOT_REACH : 16) * 2.5).filter(function (o) { return Math.abs(o.rel) < 0.35; })[0];
if (q) {
n++;
raHitDreamer(q, 25);
raFx(q.g.position.x, q.g.position.y + 6, q.g.position.z, P.col, 60, "fall");
}
}
}
if (e.next) {
RAP.next = e.next;
RAP.nextT = now + e.nextS;
}
if (e.splash) {
RAP.splash = e.splash;
RAP.splashT = now + e.splashS;
}
if (e.immune)
RAP.imm = Math.max(RAP.imm, now + e.immune);
if (e.healFull) {
var H = raHp();
if (H)
H.o.hp = H.o.max;
}
if (e.heal)
raHeal(e.heal);
if (e.healOver)
RAP.healOver = now + e.healOver;
if (e.guard) {
RAP.guard = now + e.guard;
RAP.guardM = e.guardMult;
}
if (e.unseen)
RAP.unseen = now + e.unseen;
if (e.reflectAll)
RAP.reflectAll = now + e.reflectAll;
if (e.haste) {
RAP.haste = now + e.haste;
RAP.hasteSp = e.speed || 1;
RAP.hasteFast = e.fast || 1;
}
if (e.kings) {
RAP.kings = now + e.kings;
RAP.kingsT = 0;
RAP.kingsK = e;
}
if (e.dash)
raDash(e.dash);
if (e.rewind)
raRewind(e.rewind);
return n;
},
function (dist) {
var s = dist < 0 ? -1 : 1, n = Math.ceil(Math.abs(dist) / 0.5), dx = -Math.sin(yaw) * 0.5 * s, dz = -Math.cos(yaw) * 0.5 * s, P = camera.position, x0 = P.x, z0 = P.z;
RAP.noMult = true;
try {
for (var i = 0; i < n; i++) {
var bx = P.x, bz = P.z;
walkBy(dx, dz);
if (P.x === bx && P.z === bz)
break;
}
}
catch (e) { }
finally {
RAP.noMult = false;
}
raFx(x0, P.y - 1, z0, 0xFFFFFF, 30);
raFx(P.x, P.y - 1, P.z, 0xFFFFFF, 30);
},
function (s) {
var now = raPT(), h = null;
for (var i = 0; i < RAP.hist.length; i++) {
if (now - RAP.hist[i].t >= s) {
h = RAP.hist[i];
}
}
if (!h && RAP.hist.length)
h = RAP.hist[0];
if (!h || h.w !== (WLD && WLD.on))
return;
var P = camera.position;
raFx(P.x, P.y - 1, P.z, 0xE8D8A0, 30);
P.set(h.x, h.y, h.z);
var H = raHp();
if (H && h.hp > H.o.hp)
H.o.hp = Math.min(H.o.max, h.hp);
raFx(P.x, P.y - 1, P.z, 0xE8D8A0, 40, "swirl");
},
function (d, src) {
if (!raPowHere())
return d;
var now = raPT(), P = RA_POW[RAP.wield].pas;
if (RAP.imm > now)
return 0;
if (RAP.reflectAll > now) {
raReflect(d, src);
return 0;
}
if (P.miss && Math.random() < P.miss) {
raSay("<i>The blow misses.</i>");
return 0;
}
if (P.armor)
d *= P.armor;
if (RAP.guard > now)
d *= RAP.guardM;
if (P.reflect)
raReflect(d * P.reflect, src);
var H = raHp();
if (P.cheat && H && H.o.hp - d <= 0 && now - RAP.cheatAt > P.cheat) {
RAP.cheatAt = now;
d = Math.max(0, H.o.hp - 1);
raSay("<b>The hourglass turns.</b> You stand, with 1 vigour.");
RAP.imm = now + 1.5;
}
return d;
},
function () {
var best = null, L = raMeL();
function cand(x, z, what) { var d = Math.hypot(x - L.x, z - L.z); if (!best || d < best.d)
best = { x: x, z: z, d: d, what: what }; }
try {
RA_DEF.forEach(function (d) { if (d.at !== RA.place || raClaimed(d.k))
return; var r = RA.rows[d.k]; if (r && (r.claimed || r.mine))
return; var S = (r && r.x != null) ? { x: +r.x, z: +r.z } : raHideSpot(d); cand(S.x, S.z, "something rare"); });
}
catch (e) { }
try {
if (typeof MM_DEF !== "undefined" && typeof mmHideSpot === "function" && typeof MM !== "undefined" && MM.place === RA.place)
MM_DEF.forEach(function (m) { if (m.at !== RA.place)
return; var row = MM.rows && MM.rows[m.k]; if (row && (row.claimed || row.mine || row.riding))
return; var S = mmHideSpot(m); cand(S.x, S.z, "something vast"); });
}
catch (e) { }
if (!best)
return "The needle turns slowly. Nothing is hidden here any more.";
var b = (Math.atan2(best.x - L.x, -(best.z - L.z)) * 180 / Math.PI + 360) % 360, dir = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(b / 45) % 8];
var rel = ((b - ((-yaw * 180 / Math.PI) % 360) + 540) % 360) - 180, ahead = Math.abs(rel) < 25 ? "straight ahead" : rel > 0 ? "to your right" : "to your left";
return "🧭 The needle points " + dir + " (" + ahead + "): " + best.what + ", about " + (best.d < 100 ? Math.round(best.d / 5) * 5 : Math.round(best.d / 50) * 50) + " m.";
},
function (k) {
var d = RA.list[k], P = RA_POW[k];
if (!d || !P)
return;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
var mine = raOwns(k), w = RAP.wield === k;
worldCard(worldFacts(d.icon + " " + d.name, "Its powers: there are no others like them", raPowRows(k), [mine ? "You wield one artifact at a time. On a keyboard, Z calls on its power; on a phone, the round button; in a headset, the VR menu." : "Only the one who holds it can wield it."]) +
(mine ? worldBtn("w", w ? "Put its power aside" : "Wield its power", w ? "You are wielding it now" : "Its powers wake where the danger is Risky or worse") : ""), { w: function () { worldCard(null); raWield(k); } });
}
];
});
