/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(497, function () {
"use strict";
return [
function () {
if (!CRX.job) {
var k = CRX.queue.shift();
while (k && CRX.geo[k])
k = CRX.queue.shift();
if (!k)
return;
CRX.job = { k: k, it: crxMeshGen(crxPlan(k)) };
}
var t0 = performance.now(), J = CRX.job;
while (performance.now() - t0 < (crxLite() ? 5 : 7)) {
var r = J.it.next();
if (r.done) {
if (!CRX.geo[J.k])
CRX.geo[J.k] = r.value;
CRX.job = null;
break;
}
}
setTimeout(crxWork, CRX.job || CRX.queue.length ? 16 : 0);
if (!CRX.job && !CRX.queue.length)
return;
},
function (I) {
var now = performance.now();
if (now - I.lastT < 4)
return;
var dt = Math.min(0.1, (now - (I.lastT || now)) / 1000);
I.lastT = now;
if (CRX.frame !== now) {
CRX.timeU.value = now / 1000 % 1000;
}
var g = I.g;
g.getWorldPosition(CRX_V);
var sc = g.getWorldScale(CRX_C).y || 1;
if (I.last && dt > 0) {
var d = Math.hypot(CRX_V.x - I.last.x, CRX_V.z - I.last.z) / dt / sc;
if (d > 40)
d = 0;
I.spd += (d - I.spd) * Math.min(1, dt * 6);
}
I.last = I.last || new THREE.Vector3();
I.last.copy(CRX_V);
I.t += dt;
var look = 0;
if (typeof camera !== "undefined" && camera) {
var dx = camera.position.x - CRX_V.x, dz = camera.position.z - CRX_V.z, dist = Math.hypot(dx, dz);
if (dist < 28 * Math.max(1, sc) && !I.dead) {
var gy = 0;
var q = g;
while (q) {
gy += q.rotation ? q.rotation.y : 0;
q = q.parent;
if (q && q.type === "Scene")
break;
}
var a = Math.atan2(dx, dz) - gy;
a = Math.atan2(Math.sin(a), Math.cos(a));
look = Math.max(-0.9, Math.min(0.9, a));
}
}
I.look += (look - I.look) * Math.min(1, dt * 3);
if (I.act) {
I.actT += dt;
if (I.actT > (I.act === "die" ? 99 : I.act === "strike" ? 0.75 : 0.35))
I.act = null;
}
var F = CRX_ANIM[I.plan.anim] || CRX_ANIM.quad;
try {
F(I, dt);
}
catch (e) { }
},
function (I, dt) {
var P = I.plan, s = I.spd, stride = P.stride || 1.4, run = s > (P.runAt || 3.2);
I.ph += dt * Math.max(0, s) / stride * (run ? 0.75 : 1);
var amp = Math.min(1, s / 1.2) * (run ? 0.62 : 0.42), w = I.ph * Math.PI * 2, br = Math.sin(I.t * 1.6) * 0.012;
var off = run ? { L_f: 0.5, R_f: 0.6, L_b: 0, R_b: 0.1 } : { L_b: 0, L_f: 0.25, R_b: 0.5, R_f: 0.75 };
["L_f", "R_f", "L_b", "R_b"].forEach(function (L) {
var a = w + off[L] * Math.PI * 2, sw = Math.sin(a), lift = Math.max(0, Math.cos(a));
var front = L.charAt(2) === "f";
crxR(I, L + "u", -sw * amp, 0, 0);
crxR(I, L + "l", front ? lift * amp * 1.3 : -lift * amp * 0.9, 0, 0);
});
var st = crxStrike(I), hu = crxHurt(I);
var bob = (run ? Math.abs(Math.sin(w)) * 0.06 : Math.abs(Math.sin(w * 2)) * 0.015) * Math.min(1, s);
var root = I.bones[P.bones[0][0]];
root.position.y = I.at[P.bones[0][0]][1] + bob - (I.dead ? 0 : 0);
crxR(I, P.bones[0][0], (run ? Math.sin(w) * 0.06 : 0) + st * 0.12, 0, hu * 0.12);
crxR(I, "chest", br * 3 - st * 0.1, 0, 0);
var idleLook = s < 0.3 ? Math.sin(I.t * 0.35 + I.seed) * 0.35 : 0;
crxR(I, "neck", -st * 0.35 + (run ? 0.1 : 0), I.look * 0.45 + idleLook * 0.4, 0);
crxR(I, "head", -st * 0.25 + Math.sin(w * 2) * 0.03 * Math.min(1, s), I.look * 0.5 + idleLook * 0.4, 0);
crxR(I, "jaw", Math.max(0, -st) * 0.45 + (st > 0 ? 0.5 * st : 0), 0, 0);
if (P.heads)
["head2", "head3"].forEach(function (n, i) { crxR(I, n, -st * 0.2, I.look * 0.3 + Math.sin(I.t * 0.8 + i * 2) * 0.25, 0); });
var tw = Math.sin(I.t * (s > 0.3 ? 3 : 1.2) + I.seed) * (P.tailSway || 0.25);
crxR(I, "tail1", (P.tailUp || 0) + (run ? -0.25 : 0), tw, 0);
crxR(I, "tail2", 0, tw * 1.3, 0);
crxR(I, "tail3", 0, tw * 1.6, 0);
crxR(I, "trunk1", Math.sin(I.t * 0.9) * 0.12 - st * 0.6, Math.sin(I.t * 0.6) * 0.1, 0);
crxR(I, "trunk2", Math.sin(I.t * 0.9 + 1) * 0.2 - st * 0.5, 0, 0);
var fl = P.flap ? (s > 2 || I.act ? Math.sin(I.t * 7) * 0.9 : Math.sin(I.t * 0.8) * 0.05) : 0;
crxR(I, "L_wing", 0, 0, fl);
crxR(I, "R_wing", 0, 0, -fl);
crxR(I, "L_ear", 0, 0, Math.sin(I.t * 0.7 + I.seed) * 0.08);
crxR(I, "R_ear", 0, 0, -Math.sin(I.t * 0.9 + I.seed) * 0.08);
crxDie(I, root, dt);
},
function (I, dt) {
var P = I.plan, s = I.spd, stride = P.stride || 1.5, run = s > (P.runAt || 3.4);
I.ph += dt * Math.max(0, s) / stride;
var amp = Math.min(1, s / 1.1) * (run ? 0.75 : 0.48), w = I.ph * Math.PI * 2, sw = Math.sin(w), br = Math.sin(I.t * 1.5);
var st = crxStrike(I), hu = crxHurt(I);
crxR(I, "L_thigh", -sw * amp, 0, 0);
crxR(I, "R_thigh", sw * amp, 0, 0);
crxR(I, "L_shin", Math.max(0, Math.cos(w)) * amp * 1.4, 0, 0);
crxR(I, "R_shin", Math.max(0, -Math.cos(w)) * amp * 1.4, 0, 0);
crxR(I, "L_foot", -Math.max(0, Math.cos(w)) * amp * 0.4, 0, 0);
crxR(I, "R_foot", -Math.max(0, -Math.cos(w)) * amp * 0.4, 0, 0);
var root = I.bones.hips;
root.position.y = I.at.hips[1] + Math.abs(Math.cos(w)) * 0.035 * Math.min(1, s) - (1 - Math.min(1, s)) * 0 + br * 0.005;
crxR(I, "hips", st * 0.05, sw * 0.08 * Math.min(1, s), hu * 0.1);
crxR(I, "spine", br * 0.02 + (run ? 0.12 : 0), -sw * 0.06 * Math.min(1, s), 0);
crxR(I, "chest", br * 0.025 - st * 0.18, -sw * 0.08 * Math.min(1, s) + st * 0.25, 0);
var idleLook = s < 0.3 ? Math.sin(I.t * 0.3 + I.seed) * 0.4 : 0;
crxR(I, "neck", -st * 0.1, I.look * 0.4 + idleLook * 0.3, 0);
crxR(I, "head", -st * 0.1, I.look * 0.45 + idleLook * 0.4, 0);
crxR(I, "jaw", Math.max(0, -st) * 0.35 + (I.act === "strike" ? 0.15 : 0), 0, 0);
var ar = amp * 0.8, idle = Math.sin(I.t * 1.2 + I.seed) * 0.03;
crxR(I, "L_arm", sw * ar + idle, 0, 0);
crxR(I, "L_fore", -0.25 - Math.max(0, sw) * ar * 0.6, 0, 0);
var up = st < 0 ? -2.6 * (-st) : -2.6 + (st) * 2.2;
if (I.act === "strike") {
crxR(I, "R_arm", up, 0, 0);
crxR(I, "R_fore", st < 0 ? -0.8 * (-st) : -0.8 + st * 0.8, 0, 0);
crxR(I, "L_arm", up * 0.6, 0, 0);
}
else {
crxR(I, "R_arm", -sw * ar + idle, 0, 0);
crxR(I, "R_fore", -0.25 - Math.max(0, -sw) * ar * 0.6, 0, 0);
}
crxR(I, "L_hand", 0, 0, 0);
crxR(I, "R_hand", 0, 0, 0);
var tw = Math.sin(I.t * 2 + I.seed) * 0.25;
crxR(I, "tail1", 0, tw, 0);
crxR(I, "tail2", 0, tw * 1.4, 0);
var fl = P.flap ? (s > 0.5 || I.act ? Math.sin(I.t * 6) * 0.7 : Math.sin(I.t * 0.9) * 0.08) : 0;
crxR(I, "L_wing", 0, 0, fl);
crxR(I, "R_wing", 0, 0, -fl);
crxR(I, "L_ant", Math.sin(I.t * 2.3) * 0.2, 0, 0);
crxR(I, "R_ant", Math.sin(I.t * 2.1 + 1) * 0.2, 0, 0);
crxDie(I, root, dt);
},
function (I, dt) {
var P = I.plan, s = I.spd, st = crxStrike(I), hu = crxHurt(I), root = I.bones[P.bones[0][0]];
root.position.y = I.at[P.bones[0][0]][1] + Math.sin(I.t * 1.3 + I.seed) * 0.12;
crxR(I, P.bones[0][0], Math.min(0.3, s * 0.06) + st * 0.2, 0, hu * 0.15 + Math.sin(I.t * 0.7) * 0.04);
crxR(I, "head", -st * 0.2, I.look * 0.6, 0);
crxR(I, "eyeball", 0, I.look * 0.9, 0);
for (var k = 1; k <= 8; k++)
for (var j = 1; j <= 3; j++)
crxR(I, "st" + k + "_" + j, Math.sin(I.t * 1.4 + k * 0.9 + j * 0.7) * 0.28, Math.cos(I.t * 1.1 + k * 1.3 + j) * 0.22, 0);
for (var h = 1; h <= 4; h++)
crxR(I, "hem" + h, Math.sin(I.t * 1.7 + h * 1.3) * 0.18 - Math.min(0.4, s * 0.1), 0, Math.cos(I.t * 1.2 + h) * 0.12);
var up = I.act === "strike" ? (st < 0 ? -1.6 * (-st) : -1.6 + st * 1.4) : 0;
crxR(I, "L_arm", -0.35 + Math.sin(I.t * 1.1) * 0.1 + up, 0, 0);
crxR(I, "R_arm", -0.35 + Math.sin(I.t * 1.3 + 1) * 0.1 + up, 0, 0);
crxR(I, "L_fore", -0.3, 0, 0);
crxR(I, "R_fore", -0.3, 0, 0);
for (var t = 1; t <= 16; t++)
crxR(I, "tn" + t, Math.sin(I.t * 1.6 + t * 0.8) * 0.25 + 0.1, Math.cos(I.t * 1.2 + t) * 0.2, 0);
crxDie(I, root, dt);
},
function (I, dt) {
var P = I.plan, s = I.spd, stride = P.stride || 5;
I.ph += dt * Math.max(0, s) / stride;
var amp = Math.min(1, s / 1.5) * 0.3, w = I.ph * Math.PI * 2, st = crxStrike(I);
[0, 1, 2].forEach(function (i) {
var a = w + i * Math.PI * 2 / 3, sw = Math.sin(a), lift = Math.max(0, Math.cos(a));
crxR(I, "leg" + i + "u", -sw * amp * Math.cos(i * 2.094), 0, -sw * amp * Math.sin(i * 2.094));
crxR(I, "leg" + i + "l", lift * amp * 0.8, 0, 0);
});
var root = I.bones.hull;
root.position.y = I.at.hull[1] + Math.sin(w * 3) * 0.15 * Math.min(1, s);
crxR(I, "hull", Math.sin(I.t * 0.5) * 0.03, I.look * 0.6 + Math.sin(I.t * 0.2) * 0.2, Math.sin(w) * 0.04 * Math.min(1, s));
crxR(I, "ray", -0.2 - st * 0.3 + Math.sin(I.t * 0.7) * 0.1, Math.sin(I.t * 0.4) * 0.3, 0);
for (var k = 1; k <= 4; k++)
for (var j = 1; j <= 3; j++)
crxR(I, "st" + k + "_" + j, Math.sin(I.t * 1.0 + k * 1.7 + j * 0.6) * 0.18, Math.cos(I.t * 0.8 + k + j) * 0.15, 0);
crxDie(I, root, dt);
},
function (w, root, G) {
var prims = [], bones = [], c = w.col, s = w.s || 1, feather = w.kind !== "bat";
var sh = [root[0] + G * 0.35, root[1], root[2]];
if (feather) {
var el = [sh[0] + 0.1 * s, sh[1] + 0.12 * s, sh[2] - 0.3 * s], tip = [sh[0] + 0.14 * s, sh[1] + 0.0 * s, sh[2] - 1.05 * s];
prims.push({ t: "c", a: sh, b: el, r0: 0.07 * s, r1: 0.055 * s, bone: "L_wing", col: c }, { t: "c", a: el, b: tip, r0: 0.05 * s, r1: 0.02 * s, bone: "L_wing", col: c });
prims.push({ t: "e", c: [sh[0] + 0.08 * s, sh[1] - 0.05 * s, sh[2] - 0.32 * s], r: [0.045 * s, 0.2 * s, 0.34 * s], rot: [0.15, 0.05, 0], bone: "L_wing", col: c, k: 0.04 * s });
for (var i = 0; i < 5; i++) {
var u = i / 4;
prims.push({ t: "e", c: [sh[0] + 0.11 * s, sh[1] - 0.12 * s - u * 0.02 * s, sh[2] - 0.55 * s - u * 0.18 * s], r: [0.028 * s, 0.17 * s - u * 0.03 * s, 0.36 * s], rot: [0.12 + u * 0.12, 0.06, 0], bone: "L_wing", col: i % 2 ? c : (w.col2 !== undefined ? w.col2 : c), k: 0.015 * s });
}
}
else {
var el2 = [sh[0] + 0.12 * s, sh[1] + 0.38 * s, sh[2] - 0.2 * s], tp = [sh[0] + 0.16 * s, sh[1] + 0.78 * s, sh[2] - 0.5 * s];
prims.push({ t: "c", a: sh, b: el2, r0: 0.05 * s, r1: 0.035 * s, bone: "L_wing", col: c }, { t: "c", a: el2, b: tp, r0: 0.035 * s, r1: 0.012 * s, bone: "L_wing", col: c });
prims.push({ t: "c", a: tp, b: [tp[0], tp[1] + 0.08 * s, tp[2] + 0.06 * s], r0: 0.016 * s, r1: 0.003 * s, bone: "L_wing", col: 0x1A1210, g: 0.6, k: 0.008 * s });
var fs = [[sh[0] + 0.14 * s, sh[1] - 0.35 * s, sh[2] - 0.55 * s], [sh[0] + 0.14 * s, sh[1] - 0.05 * s, sh[2] - 0.85 * s], [sh[0] + 0.15 * s, sh[1] + 0.35 * s, sh[2] - 0.85 * s]];
fs.forEach(function (ft, f) {
prims.push({ t: "c", a: tp, b: ft, r0: 0.022 * s, r1: 0.01 * s, bone: "L_wing", col: c, k: 0.01 * s });
var prev = f ? fs[f - 1] : [sh[0] + 0.05 * s, sh[1] - 0.25 * s, sh[2] - 0.1 * s], mx = (tp[0] + ft[0] + prev[0]) / 3, my = (tp[1] + ft[1] + prev[1]) / 3, mz = (tp[2] + ft[2] + prev[2]) / 3;
var ln = Math.hypot(ft[1] - prev[1], ft[2] - prev[2]);
prims.push({ t: "e", c: [mx, my, mz], r: [0.02 * s, Math.max(0.12 * s, ln * 0.42), 0.26 * s], rot: [Math.atan2(ft[2] - prev[2], ft[1] - prev[1]) * 0.5, 0, 0], bone: "L_wing", col: w.skin !== undefined ? w.skin : c, k: 0.05 * s });
});
}
bones.push(["L_wing", "chest", sh]);
return { prims: crxMirror(prims), bones: bones };
},
function () {
return crxQuad({ L: 0.82, H: 0.7, G: 0.26, W: 0.9, legR: 0.052, head: "dog", hs: 1.15, col: 0x1E1A1A, back: 0x0E0C0C, belly: 0x3A2A26, muzzle: 0x2A2020,
tail: { l: 0.55, r: 0.05, up: -0.8 }, neck: { l: 0.32, up: 0.5 }, fangs: 1, eyeCol: 0xFF4A1E, glowEyes: 1, claws: 1, surf: "hide", stride: 1.3,
more: function (E, yb, L, G) { return crxPath([[0, yb + G * 0.92, L * 0.42], [0, yb + G * 0.95, L * 0.1], [0, yb + G * 0.82, -L * 0.3]], 0.03, 0.018, { bone: "chest", col: 0x3A1410, k: 0.04 }); } });
},
function () {
return crxQuad({ L: 0.62, H: 0.5, G: 0.19, W: 0.8, legR: 0.036, head: "fox", hs: 0.9, col: 0xEDE6DA, belly: 0xFFFFFF, back: 0xD8CCB8, muzzle: 0xFFFFFF,
tail: { l: 0.65, r: 0.08, up: -0.3, bushy: 1, tip: 0xC0602A }, neck: { l: 0.24, up: 0.6 }, eyeCol: 0xE8A83A, glowEyes: 1, stride: 0.95,
more: function (E, yb, L, G) { var out = []; for (var i = 0; i < 8; i++) {
var a = (i - 3.5) * 0.32;
out = out.concat(crxPath([[0, yb + G * 0.35, -L * 0.5 - G * 0.85], [Math.sin(a) * 0.25, yb + G * 0.6, -L * 0.5 - G * 0.85 - 0.2], [Math.sin(a) * 0.45, yb + G * 1.1 + Math.cos(a) * 0.2, -L * 0.5 - G * 0.85 - 0.35]], 0.06, 0.035, { bone: "tail1", col: i % 3 ? 0xEDE6DA : 0xF8F4EC, k: 0.03 }));
} return out; } });
},
function () {
return crxQuad({ L: 0.7, H: 0.45, G: 0.3, W: 0.8, legR: 0.045, head: "boar", hs: 1.15, col: 0x3E3028, back: 0x2A201A, belly: 0x5A4A3E,
tail: { l: 0.25, r: 0.02, up: -1.3, tuft: 0x1A1410 }, neck: { l: 0.12, up: 0.1 }, neckR0: 0.85, neckR1: 0.7, foot: "hoof", stride: 0.9, surf: "fur",
more: function (E, yb, L, G) { return crxPath([[0, yb + G * 1.0, L * 0.5], [0, yb + G * 1.08, L * 0.1], [0, yb + G * 0.9, -L * 0.35]], 0.05, 0.02, { bone: "chest", col: 0x1A1410, k: 0.05 }); } });
},
function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.33, W: 0.78, legR: 0.048, head: "horse", hs: 1.2, col: 0xF4F0EA, back: 0xFFFFFF, belly: 0xE8E2DA, muzzle: 0xD8D0D0, mane: 0xE8DCF4, horn: 0xEADCA8, foot: "hoof", footCol: 0xC8B890,
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0xE8DCF4 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, eyeCol: 0x4A6AB0 });
},
function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.33, W: 0.78, legR: 0.048, head: "horse", hs: 1.2, col: 0xF4F0EA, back: 0xFFFFFF, belly: 0xE8E2DA, muzzle: 0xD8D0D0, mane: 0xE6E0D2, foot: "hoof", footCol: 0xC8B890,
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0xE6E0D2 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, wings: { col: 0xF4F0EA, col2: 0xE6E2DA, s: 1.15 } });
},
function () {
return crxQuad({ L: 1.0, H: 0.82, G: 0.3, W: 0.85, legR: 0.06, head: "eagle", hs: 1.5, col: 0xB8883A, belly: 0xE0C08A, headCol: 0xF2EEE6,
tail: { l: 0.8, r: 0.035, up: -1.0, tuft: 0x6A4A2A }, neck: { l: 0.32, up: 0.8 }, neckR1: 0.5, claws: 1, stride: 1.6, wings: { col: 0x6A4A2A, col2: 0x8A6A44, s: 1.5 },
more: function (E, yb, L, G) { return [{ t: "e", c: [0, yb + G * 0.6, L * 0.5], r: [G * 0.7, G * 0.75, G * 0.7], bone: "chest", col: 0xF2EEE6, k: 0.08 }]; } });
},
function () {
return crxQuad({ L: 1.0, H: 0.82, G: 0.3, W: 0.85, legR: 0.06, head: "lion", hs: 1.3, col: 0xA8583A, belly: 0xD89A6A, muzzle: 0xD8A888, maneCol: 0x5A2414,
tail: { l: 0, r: 0.04 }, neck: { l: 0.3, up: 0.4 }, fangs: 1, eyeCol: 0xE8402A, claws: 1, stride: 1.6, wings: { kind: "bat", col: 0x6A2A22, skin: 0x8A3A2A, s: 1.3 },
more: function (E, yb, L, G) {
var b = -L * 0.5 - G * 0.8, y = yb + G * 0.4;
return crxPath([[0, y, b], [0, y + 0.35, b - 0.3], [0, y + 0.85, b - 0.25], [0, y + 1.15, b + 0.05], [0, y + 1.05, b + 0.3]], 0.06, 0.03, { bone: ["tail1", "tail1", "tail2", "tail3"], col: 0x3A2A1E, surf: "chitin" })
.concat([{ t: "c", a: [0, y + 1.05, b + 0.3], b: [0, y + 0.85, b + 0.45], r0: 0.035, r1: 0.004, bone: "tail3", col: 0x1A1210, g: 0.8, k: 0.01 }]);
}, pose: { tail1: [0, 0, 0] } });
},
function () {
return crxQuad({ L: 1.0, H: 0.82, G: 0.3, W: 0.85, legR: 0.06, head: "lion", hs: 1.3, col: 0xB8883A, belly: 0xE0C08A, muzzle: 0xE8D8B8, maneCol: 0x6A3A1A,
tail: { l: 1.0, r: 0.05, up: -0.6, col: 0x3F6A3A, tip: 0x2F5A2A }, neck: { l: 0.3, up: 0.4 }, fangs: 1, eyeCol: 0xE8902A, claws: 1, stride: 1.6,
more: function (E, yb, L, G) {
return [{ t: "e", c: [0, yb + G * 1.1, 0], r: [0.09, 0.11, 0.13], bone: "chest", col: 0x8A7A62 }, { t: "c", a: [0, yb + G * 1.0, 0], b: [0, yb + G * 1.4, 0.18], r0: 0.07, r1: 0.05, bone: "chest", col: 0x8A7A62 }]
.concat(crxMirror(crxPath([[0.06, yb + G * 1.5, 0.1], [0.14, yb + G * 1.7, 0.0], [0.12, yb + G * 1.6, -0.12]], 0.025, 0.006, { bone: "chest", col: 0x4A3A2A, g: 0.4 })));
} });
},
function () {
return crxQuad({ L: 0.85, H: 0.95, G: 0.27, W: 0.78, legR: 0.038, head: "horse", hs: 0.85, col: 0x8A5A34, belly: 0xE8DCC8, back: 0x6A4426, muzzle: 0x3A2A22, foot: "hoof",
tail: { l: 0.15, r: 0.04, up: -1.2, col: 0xF2EEE6 }, neck: { l: 0.45, up: 1.0 }, neckR0: 0.5, neckR1: 0.4, stride: 1.8, runAt: 4.0,
more: function (E) {
var a = function (x, y, z) { return [E[0] + x, E[1] + y, E[2] + z]; };
var out = [];
[1, -1].forEach(function (sd) {
out = out.concat(crxPath([a(0.05 * sd, 0.2, 0.04), a(0.2 * sd, 0.42, -0.04), a(0.32 * sd, 0.66, -0.12), a(0.38 * sd, 0.9, -0.08)], 0.025, 0.008, { bone: "head", col: 0x8A7458, g: 0.2, k: 0.01 }));
out = out.concat(crxPath([a(0.14 * sd, 0.34, -0.0), a(0.18 * sd, 0.52, 0.14)], 0.016, 0.005, { bone: "head", col: 0x8A7458, k: 0.01 }));
out = out.concat(crxPath([a(0.29 * sd, 0.6, -0.1), a(0.26 * sd, 0.82, 0.02)], 0.014, 0.004, { bone: "head", col: 0x8A7458, k: 0.01 }));
});
return out;
} });
},
function (p) {
var Hh = p.h || 1.85, b = p.b || 1, hn = p.hunch || 0, col = p.col, prims = [], bones = [], eyes = [], hs = p.hs || 1, am = p.arm || 1;
var leg = Hh * (p.legs || 0.47), hipY = leg + 0.04 * Hh / 1.85;
var u = Hh / 1.85;
var zc = hn * 0.16 * u, zn = hn * 0.3 * u, yn = hipY + (0.62 - hn * 0.08) * u, E = [0, yn + 0.12 * u, zn + 0.06 * u + hn * 0.06 * u];
var sY = hipY + 0.53 * u - hn * 0.05 * u, sX = (0.21 * b + 0.02) * u;
var c2 = p.col2 !== undefined ? p.col2 : col, cs = p.skin !== undefined ? p.skin : col;
prims.push({ t: "e", c: [0, hipY + 0.03 * u, 0], r: [0.17 * b * u, 0.13 * u, 0.12 * b * u], bone: "hips", col: c2 });
prims.push({ t: "e", c: [0, hipY + 0.2 * u, zc * 0.4 + (p.gut || 0) * 0.04 * u], r: [0.165 * b * u, 0.17 * u, (0.12 + (p.gut || 0) * 0.06) * b * u], bone: "spine", col: col });
prims.push({ t: "e", c: [0, hipY + 0.4 * u, zc], r: [0.215 * b * u, 0.19 * u, 0.14 * b * u], rot: [hn * 0.3, 0, 0], bone: "chest", col: col });
prims = prims.concat(crxMirror([
{ t: "e", c: [0.09 * b * u, hipY + 0.43 * u, zc + 0.07 * b * u], r: [0.1 * b * u, 0.085 * u, 0.06 * b * u], bone: "chest", col: col },
{ t: "e", c: [0.13 * b * u, sY + 0.02 * u, zc - 0.03 * u], r: [0.12 * b * u, 0.07 * u + hn * 0.05 * u, 0.08 * b * u], bone: "chest", col: col },
{ t: "e", c: [sX, sY - 0.02 * u, zc], r: [0.085 * b * u, 0.09 * u, 0.085 * b * u], bone: "L_arm", col: col }
]));
if (p.back)
prims.push({ t: "e", c: [0, sY - 0.04 * u, zc - 0.08 * u], r: [0.2 * b * u, 0.16 * u, 0.1 * b * u], bone: "chest", col: col, k: 0.08 });
var el = [sX + 0.05 * b * u, sY - 0.29 * u * am, zc - 0.02 * u], wr = [sX + 0.07 * b * u, sY - 0.56 * u * am, zc + 0.05 * u], hd = [wr[0] + 0.01 * u, wr[1] - 0.09 * u, wr[2] + 0.01 * u];
var arm = [
{ t: "c", a: [sX, sY - 0.02 * u, zc], b: el, r0: 0.072 * b * u, r1: 0.052 * b * u, bone: "L_arm", col: col },
{ t: "e", c: [sX + 0.02 * u, sY - 0.12 * u * am, zc + 0.03 * u], r: [0.055 * b * u, 0.1 * u * am, 0.055 * b * u], bone: "L_arm", col: col },
{ t: "c", a: el, b: wr, r0: 0.058 * b * u, r1: 0.04 * b * u, bone: "L_fore", col: cs },
{ t: "e", c: [el[0], el[1] - 0.08 * u * am, el[2] + 0.01 * u], r: [0.055 * b * u, 0.09 * u * am, 0.05 * b * u], bone: "L_fore", col: cs },
{ t: "e", c: hd, r: [0.032 * b * u, 0.065 * u, 0.05 * b * u], bone: "L_hand", col: p.hand !== undefined ? p.hand : cs }
];
for (var f = 0; f < (p.fingers || 3); f++) {
var fz = (f - 1) * 0.028 * b * u;
var tipC = p.claws ? 0x1E1814 : (p.hand !== undefined ? p.hand : cs);
arm.push({ t: "c", a: [hd[0], hd[1] - 0.04 * u, hd[2] + fz], b: [hd[0] + 0.005 * u, hd[1] - (0.1 + (p.claws ? 0.03 : 0)) * u, hd[2] + fz + 0.015 * u], r0: 0.016 * b * u, r1: p.claws ? 0.003 * u : 0.011 * b * u, bone: "L_hand", col: f === 0 && !p.claws ? (p.hand !== undefined ? p.hand : cs) : tipC, g: p.claws ? 0.5 : 0, k: 0.012 });
}
arm.push({ t: "c", a: [hd[0] - 0.015 * u, hd[1] + 0.01 * u, hd[2] + 0.04 * u], b: [hd[0] - 0.01 * u, hd[1] - 0.05 * u, hd[2] + 0.06 * u], r0: 0.016 * b * u, r1: 0.01 * u, bone: "L_hand", col: p.hand !== undefined ? p.hand : cs, k: 0.012 });
var hx = 0.1 * b * u, kn, an, toe;
if (p.digi) {
kn = [hx + 0.01 * u, leg * 0.6, 0.1 * u];
an = [hx + 0.01 * u, leg * 0.22, -0.12 * u];
toe = [hx + 0.01 * u, 0.04 * u, 0.12 * u];
}
else {
kn = [hx + 0.01 * u, leg * 0.52, 0.04 * u];
an = [hx + 0.01 * u, 0.09 * u, -0.02 * u];
toe = [hx + 0.01 * u, 0.035 * u, 0.15 * u];
}
var lc = p.legCol !== undefined ? p.legCol : c2;
var legs = [
{ t: "c", a: [hx, hipY - 0.04 * u, 0], b: kn, r0: 0.1 * b * u, r1: 0.065 * b * u, bone: "L_thigh", col: lc },
{ t: "e", c: [hx + 0.01 * u, hipY - 0.18 * u, 0.03 * u], r: [0.085 * b * u, 0.17 * u, 0.085 * b * u], bone: "L_thigh", col: lc },
{ t: "c", a: kn, b: an, r0: 0.062 * b * u, r1: 0.042 * b * u, bone: "L_shin", col: lc },
{ t: "e", c: [kn[0], kn[1] - 0.12 * u, kn[2] - 0.04 * u], r: [0.055 * b * u, 0.1 * u, 0.055 * b * u], bone: "L_shin", col: lc },
{ t: "c", a: an, b: toe, r0: 0.045 * b * u, r1: 0.04 * b * u, bone: "L_foot", col: p.foot !== undefined ? p.foot : lc },
{ t: "e", c: [toe[0], 0.035 * u, toe[2] - 0.02 * u], r: [0.05 * b * u, 0.035 * u, 0.075 * u], bone: "L_foot", col: p.foot !== undefined ? p.foot : lc }
];
if (p.digi)
legs.push({ t: "c", a: an, b: [an[0], 0.06 * u, -0.03 * u], r0: 0.04 * b * u, r1: 0.035 * u, bone: "L_foot", col: lc });
if (p.claws)
[-1, 0, 1].forEach(function (i) { legs.push({ t: "c", a: [toe[0] + i * 0.03 * u, 0.03 * u, toe[2] + 0.05 * u], b: [toe[0] + i * 0.035 * u, 0.01 * u, toe[2] + 0.1 * u], r0: 0.012 * u, r1: 0.003 * u, bone: "L_foot", col: 0x1E1814, g: 0.5, k: 0.008 }); });
if (p.hooves)
legs.push({ t: "e", c: [toe[0], 0.04 * u, toe[2] - 0.02 * u], r: [0.055 * b * u, 0.045 * u, 0.06 * u], bone: "L_foot", col: 0x1E1814, g: 0.4, k: 0.01 });
prims = prims.concat(crxMirror(arm.concat(legs)));
prims.push({ t: "c", a: [0, sY - 0.04 * u, zc - 0.01 * u], b: [0, E[1] - 0.03 * u, E[2] - 0.02 * u], r0: (0.085 + hn * 0.04) * b * u, r1: 0.06 * u * hs, bone: "neck", col: cs });
bones.push(["hips", null, [0, hipY, 0]], ["spine", "hips", [0, hipY + 0.12 * u, zc * 0.3]], ["chest", "spine", [0, hipY + 0.3 * u, zc]], ["neck", "chest", [0, sY - 0.02 * u, zc - 0.01 * u]], ["head", "neck", E], ["L_arm", "chest", [sX, sY - 0.02 * u, zc]], ["L_fore", "L_arm", el], ["L_hand", "L_fore", wr], ["L_thigh", "hips", [hx, hipY - 0.04 * u, 0]], ["L_shin", "L_thigh", kn], ["L_foot", "L_shin", an]);
prims = prims.concat(crxFace(p.head || "brute", E, hs * u, p, eyes, bones));
if (p.horns)
prims = prims.concat(crxMirror(crxPath([[E[0] + 0.07 * hs * u, E[1] + 0.15 * hs * u, E[2] + 0.02 * u], [E[0] + 0.14 * hs * u, E[1] + 0.24 * hs * u, E[2] - 0.04 * u], [E[0] + 0.17 * hs * u, E[1] + 0.34 * hs * u, E[2] - 0.14 * u], [E[0] + 0.14 * hs * u, E[1] + 0.4 * hs * u, E[2] - 0.24 * u]].slice(0, p.horns === "short" ? 3 : 4), 0.035 * hs * u, 0.005 * u, { bone: "head", col: p.hornCol !== undefined ? p.hornCol : 0x2A2420, g: 0.45, k: 0.012 })));
if (p.tail) {
var t0 = [0, hipY, -0.12 * u], t1 = [0, hipY - 0.25 * u, -0.45 * u], t2 = [0, hipY - 0.32 * u, -0.85 * u];
prims.push({ t: "c", a: t0, b: t1, r0: 0.04 * u, r1: 0.025 * u, bone: "tail1", col: p.tailCol !== undefined ? p.tailCol : c2 }, { t: "c", a: t1, b: t2, r0: 0.025 * u, r1: 0.01 * u, bone: "tail2", col: p.tailCol !== undefined ? p.tailCol : c2 });
if (p.tail === "devil")
prims.push({ t: "e", c: [0, t2[1] - 0.01 * u, t2[2] - 0.04 * u], r: [0.05 * u, 0.012 * u, 0.07 * u], bone: "tail2", col: p.tailCol !== undefined ? p.tailCol : c2, k: 0.01 });
bones.push(["tail1", "hips", t0], ["tail2", "tail1", t1]);
}
if (p.wings) {
var Wn = crxWings(p.wings, [0, sY + 0.04 * u, zc - 0.12 * u], 0.15 * u);
prims = prims.concat(Wn.prims);
bones = bones.concat(Wn.bones);
}
if (p.more)
prims = prims.concat(p.more({ E: E, sY: sY, sX: sX, zc: zc, hipY: hipY, u: u, b: b, el: el, wr: wr, kn: kn, an: an }));
var pose = { L_arm: [0, 0, -0.12 - hn * 0.05], R_arm: [0, 0, 0.12 + hn * 0.05], L_fore: [-0.25, 0, 0], R_fore: [-0.25, 0, 0], head: [-hn * 0.25, 0, 0] };
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: p.surf || "hide", anim: "biped", k: p.k || 0.045 * u, stride: p.stride || 1.4 * u, runAt: p.runAt || 3.5 * u,
fine: p.fine || 110, flap: !!p.wings, belly: p.belly, back: p.backCol, matOpt: p.matOpt, stripes: p.stripes, spots: p.spots, pose: Object.assign(pose, p.pose || {}), extrasOf: p.extras, extras: p.extras };
},
function (kind, E, s, p, eyes, bones) {
var out = [], c = p.headCol !== undefined ? p.headCol : (p.skin !== undefined ? p.skin : p.col);
var at = function (x, y, z) { return [E[0] + x * s, E[1] + y * s, E[2] + z * s]; };
var eye = function (x, y, z, r, iris, pupil, glow, extra) { var e = { bone: "head", at: at(x, y, z), r: r * s, iris: iris, pupil: pupil, glow: glow, turn: 0.25 }; for (var k in extra || {})
e[k] = extra[k]; eyes.push(e); };
bones.push(["jaw", "head", at(0, 0.0, 0.03)]);
var iris = p.eyeCol || 0xC89A2A, glow = !!p.glowEyes;
if (kind === "brute") {
out.push({ t: "e", c: at(0, 0.1, -0.01), r: [0.1, 0.105, 0.115].map(function (v) { return v * s; }), bone: "head", col: c });
out.push({ t: "c", a: at(-0.07, 0.11, 0.08), b: at(0.07, 0.11, 0.08), r0: 0.028 * s, r1: 0.028 * s, bone: "head", col: c, k: 0.025 });
out.push({ t: "e", c: at(0, 0.05, 0.1), r: [0.07 * s, 0.06 * s, 0.06 * s], bone: "head", col: c });
out.push({ t: "c", a: at(0, 0.08, 0.11), b: at(0, 0.025, 0.16), r0: 0.025 * s, r1: p.nose || 0.035 * s, bone: "head", col: c, k: 0.02 });
out.push({ t: "e", c: at(0, -0.025, 0.07), r: [0.085 * s, 0.055 * s, 0.075 * s], bone: "jaw", col: c });
out = out.concat(crxMirror([{ t: "e", c: at(0.075, 0.0, 0.06), r: [0.035 * s, 0.045 * s, 0.04 * s], bone: "head", col: c }]));
if (p.tusks)
out = out.concat(crxMirror([{ t: "c", a: at(0.04, -0.02, 0.12), b: at(0.05, 0.05, 0.135), r0: 0.014 * s, r1: 0.003 * s, bone: "jaw", col: 0xE8DCC0, g: 0.6, k: 0.006 }]));
if (p.ears !== false)
out = out.concat(crxMirror([p.ears === "long" ? { t: "c", a: at(0.09, 0.09, 0.0), b: at(0.2, 0.14, -0.05), r0: 0.03 * s, r1: 0.004 * s, bone: "head", col: c, k: 0.015 } : { t: "e", c: at(0.1, 0.07, 0.0), r: [0.015 * s, 0.04 * s, 0.03 * s], bone: "head", col: c, k: 0.015 }]));
if (p.hair)
out.push({ t: "e", c: at(0, 0.16, -0.03), r: [0.11 * s, 0.07 * s, 0.11 * s], bone: "head", col: p.hair, k: 0.03 });
if (p.beard)
out.push({ t: "e", c: at(0, -0.08, 0.08), r: [0.07 * s, 0.08 * s, 0.05 * s], bone: "jaw", col: p.beard, k: 0.03 });
eye(0.038, 0.075, 0.105, 0.014, iris, "r", glow);
}
else if (kind === "demon" || kind === "imp") {
out.push({ t: "e", c: at(0, 0.1, 0.0), r: [0.085 * s, 0.105 * s, 0.1 * s], bone: "head", col: c });
out = out.concat(crxMirror([{ t: "e", c: at(0.055, 0.04, 0.07), r: [0.03 * s, 0.035 * s, 0.035 * s], bone: "head", col: c, k: 0.02 }]));
out.push({ t: "c", a: at(-0.06, 0.12, 0.075), b: at(0.06, 0.12, 0.075), r0: 0.02 * s, r1: 0.02 * s, bone: "head", col: c, k: 0.02 });
out.push({ t: "c", a: at(0, 0.09, 0.1), b: at(0, 0.04, 0.13), r0: 0.017 * s, r1: 0.02 * s, bone: "head", col: c, k: 0.015 });
out.push({ t: "c", a: at(0, -0.01, 0.03), b: at(0, -0.06, 0.1), r0: 0.055 * s, r1: 0.022 * s, bone: "jaw", col: c });
out = out.concat(crxMirror([{ t: "c", a: at(0.08, 0.08, 0.0), b: at(0.17, 0.15, -0.06), r0: 0.025 * s, r1: 0.003 * s, bone: "head", col: c, k: 0.012 },
{ t: "c", a: at(0.025, 0.02, 0.105), b: at(0.025, -0.02, 0.108), r0: 0.008 * s, r1: 0.002 * s, bone: "head", col: 0xEDE4D0, g: 0.6, k: 0.004 }]));
eye(0.036, 0.08, 0.09, 0.013, iris, "slit", true);
}
else if (kind === "wolf" || kind === "bull") {
out = out.concat(crxHead(kind === "wolf" ? "wolf" : "bull", [E[0], E[1] + 0.02 * s, E[2] - 0.03 * s], s * 1.25, { col: c, muzzle: p.muzzle, fangs: 1, eyeCol: iris, glowEyes: glow }, eyes, null, "head"));
if (kind === "wolf")
out.push({ t: "e", c: at(0, 0.02, -0.06), r: [0.12 * s, 0.12 * s, 0.11 * s], bone: "neck", col: p.ruff !== undefined ? p.ruff : c, k: 0.05 });
}
else if (kind === "golem") {
out.push({ t: "b", c: at(0, 0.08, 0.01), h: [0.1 * s, 0.1 * s, 0.1 * s], rad: 0.03 * s, rot: [0.05, 0.1, 0], bone: "head", col: c });
out.push({ t: "b", c: at(0, 0.12, 0.1), h: [0.09 * s, 0.025 * s, 0.02 * s], rad: 0.01 * s, bone: "head", col: c, k: 0.02 });
out.push({ t: "b", c: at(0, -0.02, 0.06), h: [0.07 * s, 0.035 * s, 0.06 * s], rad: 0.015 * s, bone: "jaw", col: c });
eye(0.04, 0.08, 0.1, 0.016, p.eyeCol || 0xFFB24A, "none", true);
}
else if (kind === "flame") {
out.push({ t: "e", c: at(0, 0.1, 0.0), r: [0.09 * s, 0.11 * s, 0.1 * s], bone: "head", col: c });
out = out.concat(crxPath([at(0, 0.16, -0.02), at(0, 0.3, -0.08), at(0, 0.42, -0.04)], 0.07 * s, 0.01 * s, { bone: "head", col: c, k: 0.05 }));
out = out.concat(crxMirror(crxPath([at(0.06, 0.14, -0.03), at(0.1, 0.27, -0.08), at(0.08, 0.36, -0.05)], 0.04 * s, 0.008 * s, { bone: "head", col: c, k: 0.04 })));
eye(0.04, 0.09, 0.085, 0.018, 0xFFF2C0, "none", true);
}
else if (kind === "grey") {
out.push({ t: "e", c: at(0, 0.16, -0.01), r: [0.12 * s, 0.13 * s, 0.13 * s], bone: "head", col: c });
out.push({ t: "e", c: at(0, 0.06, 0.04), r: [0.075 * s, 0.09 * s, 0.07 * s], bone: "head", col: c });
out.push({ t: "c", a: at(0, 0.02, 0.06), b: at(0, -0.04, 0.07), r0: 0.04 * s, r1: 0.015 * s, bone: "jaw", col: c });
out.push({ t: "e", c: at(0, 0.035, 0.105), r: [0.014 * s, 0.0025 * s, 0.01 * s], bone: "head", col: 0x2A2826, k: 0.004 });
eye(0.042, 0.1, 0.09, 0.03, 0x050508, "full", false, { sx: 1.5, pitch: -0.1, turn: 0.55 });
}
else if (kind === "selenite") {
out.push({ t: "e", c: at(0, 0.12, 0.0), r: [0.11 * s, 0.12 * s, 0.12 * s], bone: "head", col: c });
out.push({ t: "c", a: at(-0.08, 0.2, 0.02), b: at(0.08, 0.2, 0.02), r0: 0.05 * s, r1: 0.05 * s, bone: "head", col: c, k: 0.04 });
out.push({ t: "e", c: at(0, 0.04, 0.08), r: [0.05 * s, 0.06 * s, 0.06 * s], bone: "head", col: c });
out = out.concat(crxMirror([{ t: "c", a: at(0.03, 0.0, 0.1), b: at(0.012, -0.04, 0.15), r0: 0.016 * s, r1: 0.004 * s, bone: "jaw", col: 0x2A2016, g: 0.5, k: 0.008 }]));
eye(0.11, 0.14, 0.02, 0.045, 0x1A1410, "none", false, { turn: 1.3 });
bones.push(["L_ant", "head", at(0.04, 0.22, 0.06)]);
out = out.concat(crxMirror(crxPath([at(0.04, 0.22, 0.06), at(0.09, 0.36, 0.14), at(0.14, 0.44, 0.26)], 0.008 * s, 0.003 * s, { bone: "L_ant", col: 0x2A2016, k: 0.006 })));
}
else if (kind === "robot") {
out.push({ t: "b", c: at(0, 0.1, 0.0), h: [0.1 * s, 0.09 * s, 0.1 * s], rad: 0.025 * s, bone: "head", col: c });
out.push({ t: "b", c: at(0, 0.08, 0.09), h: [0.085 * s, 0.03 * s, 0.02 * s], rad: 0.012 * s, bone: "head", col: 0x14161A, g: 0.95, k: 0.004 });
out = out.concat(crxMirror([{ t: "c", a: at(0.1, 0.1, 0.0), b: at(0.12, 0.1, 0.0), r0: 0.035 * s, r1: 0.03 * s, bone: "head", col: 0x2A2E34, k: 0.004 }]));
out.push({ t: "c", a: at(0.06, 0.18, -0.04), b: at(0.07, 0.32, -0.05), r0: 0.008 * s, r1: 0.006 * s, bone: "head", col: 0x2A2E34, k: 0.004 });
out.push({ t: "b", c: at(0, -0.01, 0.04), h: [0.06 * s, 0.03 * s, 0.06 * s], rad: 0.012 * s, bone: "jaw", col: c, k: 0.005 });
eye(0.045, 0.08, 0.105, 0.016, p.eyeCol || 0x6AD8FF, "none", true, { turn: 0 });
}
else if (kind === "automaton") {
out.push({ t: "e", c: at(0, 0.1, 0.0), r: [0.1 * s, 0.11 * s, 0.1 * s], bone: "head", col: c });
out.push({ t: "c", a: at(0, 0.2, 0.0), b: at(0, 0.27, 0.0), r0: 0.02 * s, r1: 0.012 * s, bone: "head", col: c, k: 0.01 });
out.push({ t: "e", c: at(0, 0.29, 0.0), r: [0.022 * s, 0.022 * s, 0.022 * s], bone: "head", col: 0xE8C24A, g: 0.9, k: 0.006 });
out.push({ t: "b", c: at(0, 0.02, 0.085), h: [0.05 * s, 0.02 * s, 0.015 * s], rad: 0.006 * s, bone: "jaw", col: 0x3A2A1A, k: 0.008 });
out = out.concat(crxMirror([{ t: "c", a: at(0.045, 0.1, 0.07), b: at(0.045, 0.1, 0.1), r0: 0.03 * s, r1: 0.03 * s, bone: "head", col: c, k: 0.006 }]));
eye(0.045, 0.1, 0.1, 0.022, p.eyeCol || 0xFFD27A, "none", true, { turn: 0 });
}
else if (kind === "martian") {
}
return out;
},
function () {
return crxBiped({ h: 2.8, b: 1.35, hunch: 0.7, arm: 1.25, gut: 0.6, head: "brute", hs: 1.5, col: 0x6A7A5E, skin: 0x6A7A5E, col2: 0x4A3A28, legCol: 0x5E6E54, hand: 0x5E6E52,
claws: 1, tusks: 1, ears: "long", nose: 0.05, hair: 0x2A2A22, eyeCol: 0xD8C24A, back: 1, surf: "hide", fingers: 3, stride: 2.0,
more: function (Q) { return [{ t: "e", c: [0, Q.hipY - 0.02 * Q.u, 0], r: [0.2 * Q.b * Q.u, 0.12 * Q.u, 0.15 * Q.b * Q.u], bone: "hips", col: 0x4A3A28, k: 0.02 }]; } });
},
function () {
return crxBiped({ h: 2.3, b: 1.15, hunch: 0.2, arm: 1.1, head: "demon", hs: 1.3, col: 0x8A2A22, skin: 0x8A2A22, col2: 0x2A1210, legCol: 0x5A1A14, hand: 0x6A1E18,
claws: 1, horns: "long", hornCol: 0x1E1614, digi: 1, hooves: 1, tail: "devil", tailCol: 0x5A1A14, wings: { kind: "bat", col: 0x3A1410, skin: 0x5A1E16, s: 1.4 }, eyeCol: 0xFFB43A, surf: "hide", stride: 1.7 });
},
function () {
return crxBiped({ h: 2.6, b: 1.3, hunch: 0.3, arm: 1.15, head: "demon", hs: 1.3, col: 0x3A1E18, skin: 0x3A1E18, col2: 0x1A0E0A, legCol: 0x2A1410, hand: 0x2A1410,
claws: 1, horns: "long", hornCol: 0x0E0A08, digi: 1, hooves: 1, tail: "devil", tailCol: 0x2A1410, wings: { kind: "bat", col: 0x1A0E0A, skin: 0x3A1610, s: 1.6 }, eyeCol: 0xFFB43A, surf: "stone", matOpt: { emit: 0x3A0A02 }, stride: 1.8 });
},
function () {
return crxBiped({ h: 0.95, b: 0.95, hunch: 0.35, arm: 1.1, head: "imp", hs: 1.5, col: 0xB0503A, skin: 0xB0503A, col2: 0x2A1E1C, legCol: 0x8A3A2A, hand: 0x9A4030,
claws: 1, horns: "short", hornCol: 0x2A1E1C, digi: 1, tail: "devil", tailCol: 0x8A3A2A, wings: { kind: "bat", col: 0x4A1E16, skin: 0x7A3022, s: 0.65 }, eyeCol: 0xFFD24A, surf: "hide", fine: 90, stride: 0.8, runAt: 2.4 });
},
function () {
return crxBiped({ h: 3.2, b: 1.6, hunch: 0.25, arm: 1.2, head: "golem", hs: 1.35, col: 0x8A8478, skin: 0x8A8478, col2: 0x7A7468, legCol: 0x7A7468, hand: 0x8A8478,
eyeCol: 0xFFB24A, surf: "stone", fingers: 3, stride: 2.2, back: 1, k: 0.025,
more: function (Q) { var u = Q.u, out = []; for (var i = 0; i < 7; i++) {
var a = i * 1.7;
out.push({ t: "b", c: [Math.sin(a) * 0.18 * Q.b * u, Q.hipY + (0.15 + i * 0.05) * u, Math.cos(a) * 0.12 * u], h: [0.06 * u, 0.05 * u, 0.05 * u], rad: 0.01 * u, rot: [a, a * 0.5, 0], bone: i < 3 ? "spine" : "chest", col: 0x6A6458, k: 0.02 });
} return out; } });
},
function () {
return crxBiped({ h: 2.4, b: 1.15, hunch: 0.1, arm: 1.1, head: "flame", hs: 1.0, col: 0xFF7A1E, skin: 0xFF7A1E, col2: 0xFFA040, legCol: 0xFF6A14, hand: 0xFFB050, surf: "fire", fingers: 3, stride: 1.7, k: 0.07,
more: function (Q) { var out = [], u = Q.u; for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
out = out.concat(crxPath([[Math.sin(a) * 0.12 * u, Q.sY - 0.05 * u, Q.zc + Math.cos(a) * 0.08 * u], [Math.sin(a) * 0.18 * u, Q.sY + 0.18 * u, Q.zc + Math.cos(a) * 0.1 * u - 0.05 * u], [Math.sin(a) * 0.1 * u, Q.sY + 0.38 * u, Q.zc - 0.1 * u]], 0.06 * u, 0.005 * u, { bone: "chest", col: 0xFFC060, k: 0.06 }));
} return out; } });
},
function () {
return crxBiped({ h: 2.5, b: 1.35, hunch: 0.35, arm: 1.2, gut: 0.4, head: "brute", hs: 1.4, col: 0xE8E4DC, skin: 0xE8E4DC, col2: 0xE0DCD2, legCol: 0xE0DCD2, hand: 0x8A9AA8, headCol: 0xEAE6DE,
ears: "round", nose: 0.03, eyeCol: 0x4A7AB0, claws: 1, surf: "fur", back: 1, stride: 1.9,
more: function (Q) { return [{ t: "e", c: [0, Q.E[1] + 0.05 * Q.u, Q.E[2] + 0.1 * Q.u], r: [0.06 * Q.u, 0.055 * Q.u, 0.03 * Q.u], bone: "head", col: 0x8A9AA8, k: 0.02 }]; } });
},
function () {
return crxBiped({ h: 2.4, b: 1.2, hunch: 0.1, arm: 1.0, head: "robot", hs: 1.0, col: 0x8A949E, skin: 0x6A747E, col2: 0x3A4048, legCol: 0x5A646E, hand: 0x3A4048, foot: 0x2A3036,
surf: "metal", fingers: 3, eyeCol: 0xFF4A3A, stride: 1.8, k: 0.012,
more: function (Q) {
var u = Q.u, b = Q.b, out = [];
out.push({ t: "b", c: [0, Q.hipY + 0.42 * u, Q.zc + 0.02 * u], h: [0.24 * b * u, 0.2 * u, 0.15 * b * u], rad: 0.04 * u, bone: "chest", col: 0x8A949E, k: 0.01 });
out.push({ t: "b", c: [0, Q.hipY + 0.42 * u, Q.zc + 0.165 * b * u], h: [0.06 * u, 0.06 * u, 0.01 * u], rad: 0.01 * u, bone: "chest", col: 0x1A1E22, g: 0.9, k: 0.004 });
out = out.concat(crxMirror([
{ t: "b", c: [Q.sX + 0.02 * u, Q.sY + 0.02 * u, Q.zc], h: [0.11 * u, 0.07 * u, 0.11 * u], rad: 0.03 * u, rot: [0, 0, -0.25], bone: "L_arm", col: 0x8A949E, k: 0.008 },
{ t: "b", c: [Q.el[0], Q.el[1] - 0.12 * u, Q.el[2] + 0.02 * u], h: [0.06 * u, 0.1 * u, 0.06 * u], rad: 0.02 * u, bone: "L_fore", col: 0x8A949E, k: 0.008 },
{ t: "b", c: [Q.kn[0], Q.kn[1] + 0.14 * u, Q.kn[2] + 0.02 * u], h: [0.075 * u, 0.13 * u, 0.07 * u], rad: 0.025 * u, bone: "L_thigh", col: 0x8A949E, k: 0.008 },
{ t: "b", c: [Q.kn[0], Q.kn[1] - 0.17 * u, Q.kn[2] + 0.0 * u], h: [0.06 * u, 0.14 * u, 0.065 * u], rad: 0.02 * u, bone: "L_shin", col: 0x8A949E, k: 0.008 },
{ t: "e", c: [Q.kn[0], Q.kn[1], Q.kn[2] + 0.03 * u], r: [0.05 * u, 0.05 * u, 0.05 * u], bone: "L_shin", col: 0x2A3036, g: 0.6, k: 0.004 }
]));
out.push({ t: "b", c: [0, Q.hipY + 0.42 * u, Q.zc - 0.18 * u], h: [0.14 * u, 0.16 * u, 0.06 * u], rad: 0.02 * u, bone: "chest", col: 0x3A4048, k: 0.01 });
return out;
},
extras: function (I) { crxLamp(I, "chest", [0, I.at.chest[1] + 0.12, I.at.chest[2] + 0.2], 0xFF4A3A, 0.05); } });
},
function () {
return crxBiped({ h: 2.1, b: 1.15, hunch: 0.0, arm: 1.0, gut: 1.0, head: "automaton", hs: 1.0, col: 0xB8883A, skin: 0x8A6A3A, col2: 0x6A4A2A, legCol: 0x8A6A3A, hand: 0x6A4A2A, foot: 0x4A3420,
surf: "brass", fingers: 3, eyeCol: 0xFFD27A, stride: 1.3, runAt: 2.6, k: 0.012,
more: function (Q) {
var u = Q.u, out = [];
out.push({ t: "e", c: [0, Q.hipY + 0.33 * u, Q.zc + 0.02 * u], r: [0.25 * u, 0.27 * u, 0.21 * u], bone: "chest", col: 0xB8883A, k: 0.01 });
for (var i = 0; i < 3; i++)
out.push({ t: "c", a: [-0.22 * u, Q.hipY + (0.2 + i * 0.12) * u, Q.zc + 0.11 * u], b: [0.22 * u, Q.hipY + (0.2 + i * 0.12) * u, Q.zc + 0.11 * u], r0: 0.012 * u, r1: 0.012 * u, bone: "chest", col: 0x6A4A2A, k: 0.01 });
out.push({ t: "c", a: [0, Q.hipY + 0.33 * u, Q.zc + 0.2 * u], b: [0, Q.hipY + 0.33 * u, Q.zc + 0.23 * u], r0: 0.05 * u, r1: 0.05 * u, bone: "chest", col: 0x2A1E14, k: 0.004 });
out = out.concat(crxMirror([crxPath([[0.1 * u, Q.hipY + 0.5 * u, Q.zc - 0.18 * u], [0.12 * u, Q.hipY + 0.75 * u, Q.zc - 0.22 * u], [0.12 * u, Q.hipY + 0.82 * u, Q.zc - 0.2 * u]], 0.03 * u, 0.03 * u, { bone: "chest", col: 0x4A3420, k: 0.01 })].reduce(function (a, b) { return a.concat(b); }, [])));
return out;
},
extras: function (I) { crxLamp(I, "chest", [0, I.at.chest[1] + 0.03, I.at.chest[2] + 0.24], 0xFFB24A, 0.045); } });
},
function () {
var p = crxBiped({ h: 1.6, b: 0.62, hunch: 0.35, arm: 1.15, head: "selenite", hs: 1.25, col: 0x5A4A36, skin: 0x4E402E, col2: 0x3E3224, legCol: 0x4E402E, hand: 0x2E241A, headCol: 0x6A5A42,
surf: "chitin", fingers: 2, claws: 1, stride: 1.2, runAt: 2.8, fine: 110, belly: 0x8A7A5E, k: 0.02,
more: function (Q) {
var u = Q.u, out = [];
out.push({ t: "e", c: [0, Q.hipY + 0.05 * u, -0.2 * u], r: [0.15 * u, 0.16 * u, 0.24 * u], rot: [0.7, 0, 0], bone: "hips", col: 0x3E3224, k: 0.03 * u });
for (var i = 0; i < 4; i++)
out.push({ t: "c", a: [-0.14 * u, Q.hipY + (0.12 - i * 0.07) * u, (-0.12 - i * 0.07) * u], b: [0.14 * u, Q.hipY + (0.12 - i * 0.07) * u, (-0.12 - i * 0.07) * u], r0: 0.018 * u, r1: 0.018 * u, bone: "hips", col: 0x2E241A, k: 0.02 * u });
out.push({ t: "c", a: [0, Q.hipY + 0.05 * u, 0], b: [0, Q.hipY + 0.2 * u, Q.zc * 0.7], r0: 0.045 * u, r1: 0.05 * u, bone: "spine", col: 0x3E3224, k: 0.015 * u });
out.push({ t: "e", c: [0, Q.hipY + 0.38 * u, Q.zc + 0.02 * u], r: [0.16 * u, 0.17 * u, 0.13 * u], bone: "chest", col: 0x5A4A36, k: 0.03 * u });
return out;
} });
p.prims = p.prims.filter(function (P) { return !(P.bone === "spine" && P.t === "e") && !(P.bone === "hips" && P.t === "e" && P.r && P.r[0] > 0.1 && P.c[2] === 0); });
return p;
},
function (p) {
var s = p.s || 1, col = p.col, lc = p.legCol !== undefined ? p.legCol : col, prims = [], bones = [], eyes = [];
var by = (p.hi || 0.42) * s;
var spider = p.kind === "spider", scorp = p.kind === "scorpion", crab = p.kind === "crab";
bones.push(["body", null, [0, by, 0]], ["head", "body", [0, by, 0.25 * s]]);
if (spider) {
prims.push({ t: "e", c: [0, by, 0.12 * s], r: [0.2 * s, 0.13 * s, 0.24 * s], bone: "body", col: col, g: p.gloss || 0.3 });
prims.push({ t: "e", c: [0, by + 0.02 * s, 0.3 * s], r: [0.12 * s, 0.1 * s, 0.1 * s], bone: "head", col: col, g: p.gloss || 0.3 });
prims.push({ t: "e", c: [0, by + 0.13 * s, -0.36 * s], r: [0.3 * s, 0.27 * s, 0.38 * s], rot: [0.25, 0, 0], bone: "abdomen", col: p.abdCol !== undefined ? p.abdCol : col, k: 0.03 * s });
if (p.mark !== undefined)
prims.push({ t: "e", c: [0, by + 0.36 * s, -0.32 * s], r: [0.09 * s, 0.04 * s, 0.14 * s], rot: [0.2, 0, 0], bone: "abdomen", col: p.mark, k: 0.04 * s });
prims.push({ t: "c", a: [0, by + 0.02 * s, 0.2 * s], b: [0, by + 0.06 * s, -0.06 * s], r0: 0.06 * s, r1: 0.05 * s, bone: "abdomen", col: col, k: 0.04 * s });
bones.push(["abdomen", "body", [0, by + 0.02 * s, -0.02 * s]]);
prims = prims.concat(crxMirror([{ t: "c", a: [0.04 * s, by - 0.02 * s, 0.36 * s], b: [0.035 * s, by - 0.12 * s, 0.4 * s], r0: 0.035 * s, r1: 0.008 * s, bone: "head", col: 0x0E0A0A, g: 0.85, k: 0.012 * s },
{ t: "c", a: [0.08 * s, by, 0.34 * s], b: [0.13 * s, by - 0.06 * s, 0.45 * s], r0: 0.022 * s, r1: 0.012 * s, bone: "L_palp", col: lc, k: 0.012 * s }]));
bones.push(["L_palp", "head", [0.08 * s, by, 0.34 * s]]);
[[0.03, 0.07, 0.39, 0.026], [0.065, 0.06, 0.375, 0.018], [0.05, 0.1, 0.36, 0.014], [0.085, 0.09, 0.34, 0.012]].forEach(function (e) { eyes.push({ bone: "head", at: [e[0] * s, by + e[1] * s, e[2] * s], r: e[3] * s, iris: p.eyeCol || 0x0A0606, pupil: "full", glow: !!p.glowEyes, turn: 0.4 }); });
}
else if (scorp || crab) {
var segs = scorp ? 5 : 1;
if (crab)
prims.push({ t: "e", c: [0, by, 0], r: [0.42 * s, 0.15 * s, 0.3 * s], bone: "body", col: col, g: 0.35 });
else
for (var i = 0; i < segs; i++)
prims.push({ t: "e", c: [0, by + 0.02 * s, (0.25 - i * 0.13) * s], r: [(0.2 - i * 0.012) * s, 0.1 * s, 0.1 * s], bone: "body", col: col, g: 0.35, k: 0.03 * s });
prims.push({ t: "e", c: [0, by, (crab ? 0.22 : 0.33) * s], r: [0.13 * s, 0.08 * s, 0.1 * s], bone: "head", col: col, g: 0.35 });
eyes.push({ bone: "head", at: [0.04 * s, by + 0.08 * s, (crab ? 0.3 : 0.38) * s], r: 0.018 * s, iris: p.eyeCol || 0x0A0606, pupil: "full", glow: !!p.glowEyes, turn: 0.2 });
var sh = [0.14 * s, by, (crab ? 0.26 : 0.36) * s], el = [0.32 * s, by + 0.03 * s, (crab ? 0.42 : 0.58) * s], wr = [0.3 * s, by + 0.04 * s, (crab ? 0.58 : 0.78) * s];
prims = prims.concat(crxMirror([{ t: "c", a: sh, b: el, r0: 0.04 * s, r1: 0.035 * s, bone: "L_palp", col: col, g: 0.35 },
{ t: "c", a: el, b: wr, r0: 0.035 * s, r1: 0.05 * s, bone: "L_palp", col: col, g: 0.35 },
{ t: "e", c: [wr[0], wr[1], wr[2] + 0.06 * s], r: [0.08 * s, 0.055 * s, 0.12 * s], bone: "L_palp", col: col, g: 0.4 },
{ t: "c", a: [wr[0] + 0.03 * s, wr[1], wr[2] + 0.14 * s], b: [wr[0] + 0.02 * s, wr[1], wr[2] + 0.28 * s], r0: 0.03 * s, r1: 0.008 * s, bone: "L_palp", col: p.tipCol !== undefined ? p.tipCol : col, g: 0.5, k: 0.01 * s },
{ t: "c", a: [wr[0] - 0.04 * s, wr[1], wr[2] + 0.12 * s], b: [wr[0] - 0.03 * s, wr[1], wr[2] + 0.26 * s], r0: 0.022 * s, r1: 0.006 * s, bone: "L_claw", col: p.tipCol !== undefined ? p.tipCol : col, g: 0.5, k: 0.01 * s }]));
bones.push(["L_palp", "head", sh], ["L_claw", "L_palp", [wr[0] - 0.04 * s, wr[1], wr[2] + 0.1 * s]]);
if (scorp) {
var tp = [[0, by + 0.03 * s, -0.32 * s], [0, by + 0.16 * s, -0.52 * s], [0, by + 0.4 * s, -0.62 * s], [0, by + 0.62 * s, -0.56 * s], [0, by + 0.76 * s, -0.38 * s], [0, by + 0.74 * s, -0.2 * s]];
for (var t = 0; t < 5; t++) {
prims.push({ t: "c", a: tp[t], b: tp[t + 1], r0: (0.075 - t * 0.008) * s, r1: (0.068 - t * 0.008) * s, bone: "tail" + (t + 1), col: col, g: 0.35, k: 0.012 * s });
prims.push({ t: "e", c: [(tp[t][0] + tp[t + 1][0]) / 2, (tp[t][1] + tp[t + 1][1]) / 2, (tp[t][2] + tp[t + 1][2]) / 2], r: [(0.08 - t * 0.008) * s, (0.07 - t * 0.008) * s, (0.07 - t * 0.008) * s], bone: "tail" + (t + 1), col: col, g: 0.35, k: 0.015 * s });
bones.push(["tail" + (t + 1), t ? "tail" + t : "body", tp[t]]);
}
prims.push({ t: "e", c: [0, by + 0.72 * s, -0.16 * s], r: [0.06 * s, 0.05 * s, 0.08 * s], bone: "tail5", col: p.tipCol !== undefined ? p.tipCol : col, g: 0.5 });
prims.push({ t: "c", a: [0, by + 0.71 * s, -0.1 * s], b: [0, by + 0.6 * s, -0.02 * s], r0: 0.022 * s, r1: 0.003 * s, bone: "tail5", col: 0x0E0A06, g: 0.9, k: 0.008 * s });
}
}
var n = crab ? 4 : 4;
for (var j = 1; j <= 4; j++) {
var z = ((spider ? 0.24 : crab ? 0.12 : 0.2) - (j - 1) * (spider ? 0.09 : crab ? 0.1 : 0.11)) * s, sp = (spider ? 0.85 : 0.6) * (1 + (j === 1 || j === 4 ? 0.12 : 0)), ang = (spider ? (2.5 - j) * 0.42 : (2.5 - j) * 0.3);
var hip = [(spider ? 0.14 : crab ? 0.3 : 0.16) * s, by - 0.02 * s, z], knee = [hip[0] + Math.cos(ang) * 0.3 * sp * s, by + (spider ? 0.32 : 0.16) * s, z + Math.sin(ang) * 0.3 * sp * s], foot = [hip[0] + Math.cos(ang) * 0.62 * sp * s, 0.015 * s, z + Math.sin(ang) * 0.66 * sp * s];
var lr = (spider ? 0.032 : 0.03) * s * (p.legW || 1);
prims = prims.concat(crxMirror([{ t: "c", a: hip, b: knee, r0: lr * 1.2, r1: lr, bone: "L_" + j + "u", col: lc, g: spider ? 0.25 : 0.35, k: 0.012 * s },
{ t: "c", a: knee, b: foot, r0: lr, r1: lr * 0.4, bone: "L_" + j + "l", col: p.tipCol !== undefined && !spider ? p.tipCol : lc, g: spider ? 0.25 : 0.35, k: 0.008 * s },
{ t: "e", c: knee, r: [lr * 1.25, lr * 1.25, lr * 1.25], bone: "L_" + j + "l", col: lc, k: 0.01 * s }]));
if (p.hair && p.beads)
for (var hh = 0; hh < 3; hh++) {
var u = (hh + 1) / 4;
prims = prims.concat(crxMirror([{ t: "e", c: [knee[0] + (foot[0] - knee[0]) * u, knee[1] + (foot[1] - knee[1]) * u, knee[2] + (foot[2] - knee[2]) * u], r: [lr * 1.15, lr * 1.15, lr * 1.15], bone: "L_" + j + "l", col: p.hair, k: 0.012 * s }]));
}
bones.push(["L_" + j + "u", "body", hip], ["L_" + j + "l", "L_" + j + "u", knee]);
}
if (p.more)
prims = prims.concat(p.more(s, by));
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: p.surf || "chitin", anim: "spider", k: p.k || 0.035 * s, stride: p.stride || 0.7 * s, fine: p.fine || 110, matOpt: p.matOpt,
front: spider, belly: p.belly, spots: p.spots, pose: {} };
},
function () {
return crxBug({ kind: "spider", s: 1, col: 0x5A626C, abdCol: 0x3A4048, legCol: 0x8A949E, surf: "metal", eyeCol: 0xFF3A2A, glowEyes: 1, legW: 1.1, hi: 0.5, k: 0.012,
more: function (s, by) {
return [{ t: "b", c: [0, by + 0.12 * s, -0.3 * s], h: [0.24 * s, 0.12 * s, 0.3 * s], rad: 0.06 * s, bone: "abdomen", col: 0x3A4048, k: 0.01 * s },
{ t: "b", c: [0, by + 0.26 * s, -0.3 * s], h: [0.1 * s, 0.03 * s, 0.16 * s], rad: 0.02 * s, bone: "abdomen", col: 0x8A949E, k: 0.006 * s }];
} });
},
function () {
return crxBug({ kind: "spider", s: 1, col: 0x1E2026, abdCol: 0x262A32, legCol: 0x16181C, surf: "chitin", eyeCol: 0x6AE8B0, glowEyes: 1, legW: 0.8, hi: 0.55,
more: function (s, by) {
return crxPath([[0, by + 0.02 * s, 0.3 * s], [0, by + 0.1 * s, 0.5 * s], [0, by + 0.14 * s, 0.72 * s]], 0.08 * s, 0.03 * s, { bone: "head", col: 0x262A32, g: 0.6, k: 0.03 * s })
.concat(crxPath([[0, by + 0.15 * s, -0.6 * s], [0, by + 0.3 * s, -0.95 * s], [0, by + 0.5 * s, -1.2 * s], [0, by + 0.62 * s, -1.35 * s]], 0.05 * s, 0.01 * s, { bone: "abdomen", col: 0x1E2026, g: 0.5, k: 0.02 * s }));
} });
},
function (p) {
var s = p.s || 1, col = p.col, prims = [], bones = [], eyes = [], y0 = 0.35 * s;
bones.push(["root", null, [0, y0 + 0.9 * s, 0]], ["head", "root", [0, y0 + 1.32 * s, 0.02 * s]]);
prims.push({ t: "e", c: [0, y0 + 1.5 * s, 0.03 * s], r: [0.1 * s, 0.125 * s, 0.11 * s], bone: "head", col: p.face !== undefined ? p.face : col, k: 0.03 * s });
prims.push({ t: "c", a: [0, y0 + 1.3 * s, 0], b: [0, y0 + 1.42 * s, 0.02 * s], r0: 0.06 * s, r1: 0.05 * s, bone: "head", col: col, k: 0.03 * s });
if (p.hood)
prims.push({ t: "e", c: [0, y0 + 1.53 * s, -0.02 * s], r: [0.15 * s, 0.17 * s, 0.16 * s], bone: "head", col: col }, { t: "e", c: [0, y0 + 1.5 * s, 0.13 * s], r: [0.1 * s, 0.12 * s, 0.1 * s], bone: "head", col: col, cut: true });
prims.push({ t: "e", c: [0, y0 + 1.12 * s, 0], r: [0.2 * s, 0.22 * s, 0.13 * s], bone: "root", col: col, k: 0.05 * s });
prims = prims.concat(crxMirror([{ t: "e", c: [0.15 * s, y0 + 1.24 * s, -0.01 * s], r: [0.08 * s, 0.06 * s, 0.08 * s], bone: "root", col: col, k: 0.04 * s }]));
prims.push({ t: "c", a: [0, y0 + 1.0 * s, 0], b: [0, y0 + 0.3 * s, 0], r0: 0.2 * s, r1: 0.3 * s, bone: "root", col: col });
for (var h = 1; h <= 8; h++) {
var a = (h - 0.5) / 8 * Math.PI * 2, x = Math.sin(a) * 0.24 * s, z = Math.cos(a) * 0.2 * s, bn = "hem" + (1 + (h - 1) % 4), ln = 0.25 + ((h * 37) % 10) / 40;
prims.push({ t: "c", a: [x * 0.9, y0 + 0.45 * s, z * 0.9], b: [x * 1.35, y0 - ln * s, z * 1.35], r0: 0.13 * s, r1: 0.015 * s, bone: bn, col: col, k: 0.05 * s });
}
for (var hb = 1; hb <= 4; hb++) {
var ab = (hb - 0.5) / 4 * Math.PI * 2;
bones.push(["hem" + hb, "root", [Math.sin(ab) * 0.2 * s, y0 + 0.5 * s, Math.cos(ab) * 0.16 * s]]);
}
var sh = [0.2 * s, y0 + 1.22 * s, 0.0], el = [0.3 * s, y0 + 0.95 * s, 0.12 * s], wr = [0.3 * s, y0 + 0.78 * s, 0.32 * s];
prims = prims.concat(crxMirror([{ t: "c", a: sh, b: el, r0: 0.06 * s, r1: 0.07 * s, bone: "L_arm", col: col }, { t: "c", a: el, b: wr, r0: 0.07 * s, r1: 0.09 * s, bone: "L_fore", col: col },
{ t: "e", c: [wr[0], wr[1] - 0.02 * s, wr[2] + 0.08 * s], r: [0.025 * s, 0.03 * s, 0.07 * s], bone: "L_fore", col: p.face !== undefined ? p.face : col, k: 0.02 * s }]));
bones.push(["L_arm", "root", sh], ["L_fore", "L_arm", el]);
if (p.hair)
prims.push({ t: "c", a: [0, y0 + 1.5 * s, -0.05 * s], b: [0, y0 + 0.9 * s, -0.2 * s], r0: 0.12 * s, r1: 0.06 * s, bone: "head", col: p.hair, k: 0.05 * s });
eyes.push({ bone: "head", at: [0.04 * s, y0 + 1.52 * s, 0.12 * s], r: 0.018 * s, iris: p.eyeCol || 0xA8C8FF, pupil: "none", glow: true, turn: 0.2 });
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: p.surf || "ecto", matOpt: { tint: p.tint || col }, anim: "float", k: 0.05 * s, fine: 90, pose: { L_arm: [-0.4, 0, -0.15], R_arm: [-0.4, 0, 0.15] } };
},
function () {
var prims = [], bones = [["root", null, [0, 2.8, 0]], ["eyeball", "root", [0, 2.8, 0.05]]], s = 1;
prims.push({ t: "e", c: [0, 2.8, -0.1], r: [0.92, 0.9, 0.85], bone: "root", col: 0x5A3A3E });
prims.push({ t: "e", c: [0, 3.15, 0.42], r: [0.78, 0.4, 0.42], rot: [-0.3, 0, 0], bone: "root", col: 0x6A4246, k: 0.08 });
prims.push({ t: "e", c: [0, 2.45, 0.42], r: [0.74, 0.36, 0.4], rot: [0.3, 0, 0], bone: "root", col: 0x6A4246, k: 0.08 });
prims.push({ t: "e", c: [0, 2.8, 0.6], r: [0.62, 0.5, 0.5], bone: "root", col: 0x6A4246, cut: true });
for (var k = 1; k <= 8; k++) {
var a = k / 8 * Math.PI * 2, d = [Math.sin(a), Math.cos(a) * 0.8 - 0.3, -0.6];
var p0 = [d[0] * 0.7, 2.8 + d[1] * 0.7, -0.3], p1 = [d[0] * 1.2, 2.8 + d[1] * 1.1, -0.8], p2 = [d[0] * 1.5, 2.8 + d[1] * 1.35 + 0.1, -1.3], p3 = [d[0] * 1.6, 2.8 + d[1] * 1.4 + 0.3, -1.8];
prims.push({ t: "c", a: p0, b: p1, r0: 0.12, r1: 0.08, bone: "st" + k + "_1", col: 0x5A3A3E }, { t: "c", a: p1, b: p2, r0: 0.08, r1: 0.05, bone: "st" + k + "_2", col: 0x5A3A3E }, { t: "c", a: p2, b: p3, r0: 0.05, r1: 0.03, bone: "st" + k + "_3", col: 0x7A4A4E }, { t: "e", c: p3, r: [0.08, 0.08, 0.08], bone: "st" + k + "_3", col: 0xE8E0D0, g: 0.9, k: 0.02 });
bones.push(["st" + k + "_1", "root", p0], ["st" + k + "_2", "st" + k + "_1", p1], ["st" + k + "_3", "st" + k + "_2", p2]);
}
return { prims: prims, bones: bones, eyes: [{ bone: "eyeball", at: [0, 2.8, 0.05], r: 0.7, iris: 0xB0401E, pupil: "slit", glow: false, one: 1 }], col: 0x5A3A3E, surf: "flesh", anim: "float", k: 0.12, fine: 80, pose: {},
extras: function (I) { I.bones.eyeball.children.forEach(function (e) { e.material = e.material.clone(); e.material.emissive = new THREE.Color(0x6A1A0A); e.material.emissiveIntensity = 0.25; e.material.emissiveMap = e.material.map; }); } };
},
function () {
var prims = [], bones = [["root", null, [0, 1.0, 0]], ["head", "root", [0, 1.0, 0.2]], ["jaw", "head", [0, 0.75, 0.65]]];
prims.push({ t: "e", c: [0, 1.05, 0], r: [0.68, 0.62, 0.72], bone: "root", col: 0x8E8278 });
prims.push({ t: "e", c: [0, 0.85, 0.5], r: [0.5, 0.42, 0.3], bone: "head", col: 0x928680 });
prims.push({ t: "c", a: [0, 0.82, 0.72], b: [0, 0.66, 0.86], r0: 0.1, r1: 0.03, bone: "head", col: 0x5A4E4A, g: 0.4 });
prims.push({ t: "e", c: [0, 0.64, 0.7], r: [0.16, 0.06, 0.12], bone: "jaw", col: 0x4A3A3A, g: 0.5 });
var tn = 0;
[-1, 1].forEach(function (sd) {
for (var i = 0; i < 8; i++) {
tn++;
var a = (i - 3.5) * 0.22 + sd * 0.55, b0 = [sd * 0.14 + Math.sin(a) * 0.18, 0.58, 0.62 + Math.cos(a) * 0.06], b1 = [b0[0] + Math.sin(a) * 0.25, 0.32, b0[2] + 0.15], b2 = [b0[0] + Math.sin(a) * 0.45, 0.05, b0[2] + 0.3 + Math.cos(i) * 0.08];
prims.push({ t: "c", a: b0, b: b1, r0: 0.035, r1: 0.025, bone: "tn" + tn, col: 0x7E746E, k: 0.02 }, { t: "c", a: b1, b: b2, r0: 0.025, r1: 0.008, bone: "tn" + tn, col: 0x7E746E, k: 0.015 });
bones.push(["tn" + tn, "head", b0]);
}
});
return { prims: prims, bones: bones, eyes: [{ bone: "head", at: [0.28, 1.12, 0.52], r: 0.15, iris: 0x1A120E, pupil: "full", glow: false, turn: 0.45 }], col: 0x8E8278, surf: "flesh", anim: "float", k: 0.08, fine: 90, pose: {}, belly: 0x5A524E };
},
function () {
var prims = [], H = 9, bones = [["hull", null, [0, H, 0]], ["ray", "hull", [0.9, H - 0.3, 0.9]]], c = 0x9AA0A8;
prims.push({ t: "e", c: [0, H + 0.3, 0], r: [1.6, 0.9, 1.7], bone: "hull", col: c, g: 0.5 });
prims.push({ t: "e", c: [0, H + 1.0, -0.2], r: [1.1, 0.8, 1.2], bone: "hull", col: 0xB0B6BE, g: 0.6 });
prims.push({ t: "e", c: [0, H - 0.4, 0], r: [1.0, 0.45, 1.0], bone: "hull", col: 0x6A7078 });
prims.push({ t: "b", c: [0, H + 0.55, 1.45], h: [0.55, 0.12, 0.12], rad: 0.06, bone: "hull", col: 0x1A1E22, g: 0.95, k: 0.02 });
prims.push({ t: "c", a: [0.9, H - 0.3, 0.9], b: [1.4, H - 0.6, 1.9], r0: 0.14, r1: 0.1, bone: "ray", col: 0x6A7078, k: 0.03 });
prims.push({ t: "b", c: [1.4, H - 0.62, 2.15], h: [0.18, 0.18, 0.35], rad: 0.06, bone: "ray", col: 0x3A3E44, k: 0.02 });
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2, d = [Math.sin(a), Math.cos(a)];
var hp = [d[0] * 0.9, H - 0.4, d[1] * 0.9], kn = [d[0] * 3.2, H + 0.8, d[1] * 3.2], ft = [d[0] * 4.2, 0.15, d[1] * 4.2];
prims.push({ t: "c", a: hp, b: kn, r0: 0.22, r1: 0.16, bone: "leg" + i + "u", col: c, k: 0.05 }, { t: "e", c: kn, r: [0.28, 0.28, 0.28], bone: "leg" + i + "l", col: 0x6A7078, k: 0.03 }, { t: "c", a: kn, b: ft, r0: 0.16, r1: 0.1, bone: "leg" + i + "l", col: c, k: 0.04 }, { t: "e", c: [ft[0], 0.12, ft[2]], r: [0.3, 0.12, 0.3], bone: "leg" + i + "l", col: 0x5A6068, k: 0.03 });
bones.push(["leg" + i + "u", "hull", hp], ["leg" + i + "l", "leg" + i + "u", kn]);
}
for (var k = 1; k <= 4; k++) {
var b = k / 4 * Math.PI * 2 + 0.4, p0 = [Math.sin(b) * 0.8, H - 0.6, Math.cos(b) * 0.8], p1 = [Math.sin(b) * 1.0, H - 2.2, Math.cos(b) * 1.0], p2 = [Math.sin(b) * 0.9, H - 3.8, Math.cos(b) * 0.9], p3 = [Math.sin(b) * 1.1, H - 5.0, Math.cos(b) * 1.1];
prims.push({ t: "c", a: p0, b: p1, r0: 0.06, r1: 0.05, bone: "st" + k + "_1", col: 0x8A9098, k: 0.02 }, { t: "c", a: p1, b: p2, r0: 0.05, r1: 0.04, bone: "st" + k + "_2", col: 0x8A9098, k: 0.02 }, { t: "c", a: p2, b: p3, r0: 0.04, r1: 0.02, bone: "st" + k + "_3", col: 0x8A9098, k: 0.02 });
bones.push(["st" + k + "_1", "hull", p0], ["st" + k + "_2", "st" + k + "_1", p1], ["st" + k + "_3", "st" + k + "_2", p2]);
}
return { prims: prims, bones: bones, eyes: [], col: c, surf: "metal", anim: "tripod", k: 0.1, fine: 110, stride: 6, pose: {},
extras: function (I) { crxLamp(I, "ray", [1.4, H - 0.62, 2.52], 0xFFE8A0, 0.12); crxLamp(I, "hull", [0, H + 0.55, 1.6], 0x8AE8FF, 0.09); } };
},
function (spec, f) {
if (crxOn())
try {
var o = creatureOf(spec), m = o && CRX_ARCH[o.key];
if (o && o.key === "cyborg") {
var cy = crxOldBuildCreature.apply(this, arguments);
crxCyborg(cy);
return cy;
}
if (m && crxHas(m[0])) {
var g = crxMake(m[0], m[1] * (m[2] || 1), o);
if (g)
return g;
}
}
catch (e) {
if (window.CRX_DEBUG)
console.warn("[creature-real]", e);
}
return crxOldBuildCreature.apply(this, arguments);
},
function (K, seed) {
if (crxOn())
try {
var key = crxPlanOfKind(K);
if (key && crxHas(key)) {
var size = K.body === "crx" ? 1 : (CRX_KIND_SIZE[K.key] || (CRX_ARCH[K.arch] ? CRX_ARCH[K.arch][1] : 1));
var c = crxBuild(key), g = new THREE.Group();
g.name = "dgb_crx_" + key;
g.add(c);
c.scale.multiplyScalar(size);
if (K.scale)
g.scale.multiplyScalar(K.scale);
if (K.glow && typeof wGlow === "function")
try {
var gl = wGlow(K.glow, 3.2, 0.3);
gl.position.y = 1.2;
g.add(gl);
}
catch (e) { }
g.userData.dgb = 1;
g.userData.crxAct = c.userData.crxAct;
g.userData.crx = c.userData.crx;
return g;
}
if (K.cyborg) {
var p = crxOldDgbBody.apply(this, arguments);
crxCyborg(p);
return p;
}
}
catch (e) {
if (window.CRX_DEBUG)
console.warn("[creature-real]", e);
}
return crxOldDgbBody.apply(this, arguments);
},
function (g) {
if (!g || g.userData.crxCy)
return;
g.userData.crxCy = 1;
var probe = new THREE.Mesh(new THREE.BoxGeometry(0.001, 0.001, 0.001), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
probe.frustumCulled = false;
var tries = 0;
probe.onBeforeRender = function () { if (++tries > 2000) {
crxDrop(probe);
return;
} if (tries % 15)
return; if (crxCyborgFit(g))
crxDrop(probe); };
g.add(probe);
},
function (g) {
var head = null, fore = null, hand = null, spine = null;
g.traverse(function (o) {
if (!o.isBone)
return;
var n = o.name;
if (!head && /head$/i.test(n) && !/headtop|end/i.test(n))
head = o;
if (!fore && /r(ight)?[ _.]*fore ?arm$/i.test(n))
fore = o;
if (!hand && /r(ight)?[ _.]*hand$/i.test(n))
hand = o;
if (!spine && /spine2|spine1|chest|upperchest/i.test(n))
spine = o;
});
if (!head || !fore || !hand)
return false;
g.updateMatrixWorld(true);
var M = crxMat("metal", { rigid: 1 }), E = new THREE.MeshBasicMaterial({ color: 0xFF3A2A });
var wp = function (o) { return new THREE.Vector3().setFromMatrixPosition(o.matrixWorld); };
var place = function (mesh, bone, pos, quat) {
var inv = new THREE.Matrix4().copy(bone.matrixWorld).invert ? new THREE.Matrix4().copy(bone.matrixWorld).invert() : new THREE.Matrix4().getInverse(bone.matrixWorld);
var m = new THREE.Matrix4().compose(pos, quat || new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
m.premultiply(inv);
m.decompose(mesh.position, mesh.quaternion, mesh.scale);
bone.add(mesh);
};
var a = wp(fore), b = wp(hand), len = a.distanceTo(b), gs = g.getWorldScale(new THREE.Vector3()).y || 1;
var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.042 * gs, 0.05 * gs, len * 1.02, crxLite() ? 8 : 16, 1), crxRigid(M));
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
place(arm, fore, a.clone().lerp(b, 0.5), q);
for (var i = 0; i < 3; i++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.05 * gs, 0.007 * gs, 6, crxLite() ? 10 : 18), crxRigid(M));
place(ring, fore, a.clone().lerp(b, 0.25 + i * 0.25), q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))));
}
var fist = new THREE.Mesh(new THREE.SphereGeometry(0.05 * gs, crxLite() ? 8 : 14, crxLite() ? 6 : 10), crxRigid(M));
fist.scale.set(1, 1.35, 0.8);
place(fist, hand, b.clone().add(b.clone().sub(a).normalize().multiplyScalar(0.06 * gs)), q);
var h = wp(head), fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(g.getWorldQuaternion(new THREE.Quaternion())), side = new THREE.Vector3(1, 0, 0).applyQuaternion(g.getWorldQuaternion(new THREE.Quaternion()));
var ep = h.clone().add(fwd.clone().multiplyScalar(0.085 * gs)).add(side.clone().multiplyScalar(-0.032 * gs)).add(new THREE.Vector3(0, 0.065 * gs, 0));
var rim = new THREE.Mesh(new THREE.CylinderGeometry(0.024 * gs, 0.026 * gs, 0.03 * gs, crxLite() ? 8 : 16), crxRigid(M));
var rq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), fwd);
place(rim, head, ep, rq);
var lens = new THREE.Mesh(new THREE.CircleGeometry(0.017 * gs, crxLite() ? 8 : 16), E);
place(lens, head, ep.clone().add(fwd.clone().multiplyScalar(0.016 * gs)), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), fwd));
var plate = new THREE.Mesh(new THREE.SphereGeometry(0.06 * gs, crxLite() ? 8 : 14, crxLite() ? 6 : 10, 0, Math.PI * 0.9, 0.2, Math.PI * 0.5), crxRigid(M));
plate.material.side = THREE.DoubleSide;
place(plate, head, h.clone().add(side.clone().multiplyScalar(-0.05 * gs)).add(new THREE.Vector3(0, 0.07 * gs, 0)), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), side.clone().negate()));
if (spine) {
var lamp = new THREE.Mesh(new THREE.CircleGeometry(0.02 * gs, 12), new THREE.MeshBasicMaterial({ color: 0x6AD8FF }));
var sp = wp(spine).add(fwd.clone().multiplyScalar(0.13 * gs)).add(new THREE.Vector3(0, 0.06 * gs, 0));
place(lamp, spine, sp, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), fwd));
}
return true;
},
function () {
return crxQuad({ L: 1.05, H: 0.85, G: 0.48, W: 0.82, legR: 0.07, head: "bull", hs: 1.15, col: 0xF2EEE6, back: 0xF8F4EE, belly: 0xE8E0D6, muzzle: 0xE8B8B0, foot: "hoof", footCol: 0x2A2420,
spots: [9, 0.5, 0x1E1A18], tail: { l: 0.75, r: 0.03, up: -1.45, tuft: 0x1E1A18 }, neck: { l: 0.3, up: 0.35 }, neckR0: 0.75, neckR1: 0.55, eyeCol: 0x2A1A12, stride: 1.4, runAt: 3.0, surf: "fur" });
},
function () {
return crxQuad({ L: 0.58, H: 0.5, G: 0.36, W: 0.9, legR: 0.03, head: "horse", hs: 0.5, col: 0xEEE8DA, back: 0xF6F2E8, belly: 0xE0D8C8, muzzle: 0x2A2420, foot: "hoof", footCol: 0x2A2420,
tail: { l: 0.16, r: 0.06, up: -1.3, col: 0xEEE8DA }, neck: { l: 0.16, up: 0.4 }, neckR0: 0.9, neckR1: 0.6, eyeCol: 0x8A6A2A, stride: 0.8, runAt: 2.6, surf: "fur",
more: function (E, yb, L, G) { var out = []; for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283;
out.push({ t: "e", c: [Math.cos(a) * G * 0.55, yb + G * (0.95 + 0.12 * Math.sin(a * 2)), Math.sin(a) * L * 0.55], r: [G * 0.42, G * 0.38, G * 0.42], bone: "chest", col: 0xF4F0E4, k: 0.08 });
} return out; } });
},
function () {
return crxQuad({ L: 0.55, H: 0.6, G: 0.2, W: 0.8, legR: 0.03, head: "horse", hs: 0.6, col: 0xC8B8A0, back: 0x8A7A64, belly: 0xE8E0D2, muzzle: 0x4A4036, foot: "hoof", footCol: 0x2A2420,
tail: { l: 0.12, r: 0.03, up: 0.7, col: 0x8A7A64 }, neck: { l: 0.3, up: 0.9 }, neckR0: 0.55, neckR1: 0.4, eyeCol: 0xC8962A, stride: 0.95, runAt: 3.0, surf: "fur",
more: function (E) {
var a = function (x, y, z) { return [E[0] + x, E[1] + y, E[2] + z]; }, out = [];
[1, -1].forEach(function (sd) { out = out.concat(crxPath([a(0.04 * sd, 0.12, 0.0), a(0.08 * sd, 0.24, -0.08), a(0.1 * sd, 0.28, -0.2)], 0.022, 0.006, { bone: "head", col: 0x5A5040, g: 0.3, k: 0.01 })); });
out = out.concat(crxPath([a(0, -0.12, 0.16), a(0, -0.24, 0.14)], 0.02, 0.008, { bone: "head", col: 0x8A7A64, k: 0.01 }));
return out;
} });
},
function () {
return crxQuad({ L: 1.1, H: 1.25, G: 0.36, W: 0.75, legR: 0.05, head: "horse", hs: 1.0, col: 0xC8A070, back: 0xB88E5E, belly: 0xD8B888, muzzle: 0x8A6A48, foot: "hoof", footCol: 0x6A5038,
hump: 1, humpCol: 0xB88E5E, tail: { l: 0.5, r: 0.03, up: -1.4, tuft: 0x6A5038 }, neck: { l: 0.85, up: 0.75 }, neckR0: 0.45, neckR1: 0.3, eyeCol: 0x2A1A12, stride: 2.0, runAt: 3.6, surf: "fur" });
},
function (name, cb) {
var k = name + (crxLite() ? "-lite" : ""), F = WMESH.files[k];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = WMESH.files[k] = { scene: null, clips: null, meas: null, bad: false, wait: [cb] };
modelsLoader(function (L) {
L.load(WMESH.dir + k + ".glb", function (gl) {
var inGame = typeof REAL !== "undefined";
gl.scene.traverse(function (o) {
if (!o.isMesh)
return;
var s = o.material, opt = { map: s.map || null, skinning: !!o.isSkinnedMesh, color: 0xffffff, transparent: !!s.transparent, alphaTest: s.alphaTest || 0, side: s.side };
var m = inGame ? new THREE.MeshLambertMaterial(opt) : new THREE.MeshStandardMaterial(Object.assign(opt, { normalMap: s.normalMap || null, roughness: 0.85, metalness: 0 }));
if (m.map)
m.map.encoding = THREE.sRGBEncoding;
m.userData.realRough = 0.85;
o.material = m;
o.frustumCulled = false;
});
F.scene = gl.scene;
F.clips = {};
(gl.animations || []).forEach(function (c) { F.clips[c.name] = c; });
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) { } });
}, undefined, function () { F.bad = true; F.wait = []; });
});
},
function (body, mix, F) {
var a = F.clips.idle && mix.clipAction(F.clips.idle);
if (a) {
a.play();
mix.update(0);
}
body.updateMatrixWorld(true);
var B = new THREE.Box3(), v = new THREE.Vector3(), head = null, hips = null;
body.traverse(function (o) {
if (!o.isBone)
return;
if (!head && /head/i.test(o.name))
head = o;
if (!hips && /pelvis/i.test(o.name))
hips = o;
if (/root|^_|CG_|reins|tongue|jaw|eyelid|ear/i.test(o.name))
return;
o.getWorldPosition(v);
B.expandByPoint(v);
});
if (a) {
a.stop();
}
var S = new THREE.Vector3();
B.getSize(S);
var h = new THREE.Vector3(0, B.max.y, 0), c = new THREE.Vector3();
if (head)
head.getWorldPosition(h);
if (hips)
hips.getWorldPosition(c);
else
B.getCenter(c);
var dx = h.x - c.x, dz = h.z - c.z, turn = Math.abs(dx) > Math.abs(dz) ? (dx > 0 ? Math.PI / 2 : -Math.PI / 2) : (dz > 0 ? 0 : Math.PI);
return { h: h.y - B.min.y, minY: B.min.y, turn: turn };
},
function (g, kind, realH) {
var W = WMESH.of[kind];
if (!W || typeof hdfUtils !== "function")
return;
wmFile(W[0], function (F) {
hdfUtils(function (U) {
var I = g.userData.crx;
if (!I || I.wm || !I.mesh || !I.mesh.parent)
return;
var old = I.mesh, body = U.clone(F.scene), hold = new THREE.Group();
hold.name = "wm-" + kind;
var mix = new THREE.AnimationMixer(body);
if (!F.meas)
F.meas = wmMeasure(body, mix, F);
var E = F.meas, k = (realH || W[2]) / (E.h || 1);
hold.scale.setScalar(k);
body.rotation.y = W[3] !== undefined ? W[3] : E.turn;
hold.position.copy(old.position);
hold.position.y += -E.minY * k;
hold.add(body);
var first = null;
body.traverse(function (o) { if (o.isSkinnedMesh && !first)
first = o; if (o.isMesh) {
o.castShadow = old.castShadow;
o.receiveShadow = false;
} });
if (!first)
return;
first.onBeforeRender = old.onBeforeRender;
old.parent.add(hold);
old.parent.remove(old);
var acts = {};
Object.keys(F.clips).forEach(function (n) { var a = mix.clipAction(F.clips[n]); if (n === "die" || n === "hit" || n === "attack") {
a.setLoop(THREE.LoopOnce, 1);
a.clampWhenFinished = n === "die";
} acts[n] = a; });
I.mesh = first;
I.g3d = "wm-" + kind;
I.wm = { mix: mix, acts: acts, cur: null, t: performance.now(), graze: Math.random() * 8, hold: hold };
wmPlay(I, "idle", 0);
});
});
},
function (I) {
var M = I.wm, now = performance.now(), dt = Math.min(0.1, (now - M.t) / 1000);
M.t = now;
if (dt <= 0)
return;
var s = I.spd || 0, P = I.plan || {}, n;
if (I.dead)
n = "die";
else if (I.act === "hurt")
n = M.acts.hit ? "hit" : M.cur;
else if (I.act === "strike")
n = M.acts.attack ? "attack" : M.acts.hit ? "hit" : M.cur;
else if (s > (P.runAt || 3.2) * 1.15)
n = "run";
else if (s > 1.7)
n = "trot";
else if (s > 0.25)
n = "walk";
else {
M.graze -= dt;
if (M.graze < 0) {
M.graze = 6 + Math.random() * 10;
M.idleAs = Math.random() < 0.4 && M.acts.eat ? "eat" : Math.random() < 0.5 && M.acts.idle2 ? "idle2" : "idle";
}
n = M.idleAs || "idle";
}
wmPlay(I, n, n === "die" ? 0.15 : 0.3);
var a = M.acts[M.cur];
if (a)
a.timeScale = M.cur === "walk" ? Math.max(0.6, Math.min(1.6, s / 1.2)) : M.cur === "trot" ? Math.max(0.8, Math.min(1.5, s / 2.6)) : M.cur === "run" ? Math.max(0.8, Math.min(1.5, s / (P.runAt || 3.2) / 1.4)) : 1;
M.mix.update(dt);
}
];
});
