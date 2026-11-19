/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BSH_KEYS = [
["h", "Height", "shorter", "taller"],
["sh", "Shoulders", "narrow", "broad"],
["ch", "Chest", "smaller", "fuller"],
["wa", "Waist and belly", "slim", "full"],
["hp", "Hips", "narrow", "wide"],
["mu", "Arms and legs", "slender", "muscular"],
["lg", "Leg length", "shorter", "longer"],
["hd", "Head", "smaller", "larger"]
];
function bshClamp(v) { v = +v; return isFinite(v) ? Math.max(-1, Math.min(1, v)) : 0; }
function bshFor(spec, L) {
L = L || (spec && spec.look) || {};
var s = L.shape, o = {}, any = false;
if (s && typeof s === "object") {
BSH_KEYS.forEach(function (k) { o[k[0]] = bshClamp(s[k[0]]); if (o[k[0]])
any = true; });
return any ? o : null;
}
var id = String((spec && spec.id) || "");
if (!spec || id === "__me" || id.indexOf("presence_") === 0 || !(spec.city || spec.hub))
return null;
var arch = spec.archetype || "human";
if (arch !== "human" && arch !== "child")
return null;
var h = (typeof hdfHash === "function") ? hdfHash(id + ":shape") : 0;
function r(n) { return (((h >>> n) & 15) / 15 - 0.5) * 2; }
o = { h: r(0) * 0.7, sh: r(4) * 0.5, ch: r(8) * 0.5, wa: r(12) * 0.6, hp: r(16) * 0.5, mu: r(20) * 0.4, lg: r(24) * 0.3, hd: 0 };
return o;
}
function bshFac(S) {
return {
h: 1 + 0.09 * S.h,
sh: 1 + 0.16 * S.sh,
ch: 1 + 0.18 * S.ch,
waX: 1 + (S.wa < 0 ? 0.10 : 0.20) * S.wa, waZ: 1 + (S.wa < 0 ? 0.12 : 0.38) * S.wa,
hpX: 1 + 0.20 * S.hp, hpZ: 1 + 0.12 * S.hp,
mu: 1 + 0.20 * S.mu,
lg: 1 + 0.06 * S.lg,
hd: 1 + 0.08 * S.hd
};
}
function bshBindScales(F) {
var T = {};
T.spine_03 = [F.ch, 1, F.ch];
T.spine_02 = [(F.ch + F.waX) / 2, 1, (F.ch + F.waZ) / 2];
T.spine_01 = [F.waX, 1, F.waZ];
T.pelvis = [F.hpX, 1, F.hpZ];
["l", "r"].forEach(function (s) {
T["upperarm_" + s] = [F.mu, 1, F.mu];
T["lowerarm_" + s] = [1 + (F.mu - 1) * 0.8, 1, 1 + (F.mu - 1) * 0.8];
T["thigh_" + s] = [F.mu * (1 + (F.hpX - 1) * 0.4), 1, F.mu * (1 + (F.hpX - 1) * 0.4)];
T["calf_" + s] = [1 + (F.mu - 1) * 0.8, 1, 1 + (F.mu - 1) * 0.8];
});
T.Head = [F.hd, F.hd, F.hd];
return T;
}
var BSH_M = new THREE.Matrix4();
function bshBind(root, F) { return __ZC(308, 0, this, arguments, new.target); }
function bshJoints(E) {
var J = E.bshJ;
if (!J || J.m !== E.model) {
J = { m: E.model, b: {} };
E.model.traverse(function (b) { if (b.isBone && /^(upperarm_[lr]|calf_[lr]|foot_[lr]|pelvis)$/.test(b.name))
J.b[b.name] = b; });
E.bshJ = J;
}
return J;
}
var BSH_V = new THREE.Vector3(), BSH_Q = new THREE.Quaternion();
function bshUnmove(E) {
var J = E.bshJ, K = E.bshBase;
if (!J || !K)
return;
Object.keys(K).forEach(function (n) { var b = J.b[n]; if (b)
b.position.copy(K[n]); });
}
function bshMove(E) {
var F = E.bshF;
if (!F || !E.model)
return;
var J = bshJoints(E), B = J.b, K = E.bshBase || (E.bshBase = {});
Object.keys(B).forEach(function (n) { (K[n] || (K[n] = new THREE.Vector3())).copy(B[n].position); });
if (F.sh !== 1) {
if (B.upperarm_l)
B.upperarm_l.position.multiplyScalar(F.sh);
if (B.upperarm_r)
B.upperarm_r.position.multiplyScalar(F.sh);
}
if (F.lg !== 1 && B.calf_l && B.foot_l && B.pelvis && B.pelvis.parent) {
var add = (B.calf_l.position.length() + B.foot_l.position.length()) * (F.lg - 1);
["calf_l", "calf_r", "foot_l", "foot_r"].forEach(function (n) { if (B[n])
B[n].position.multiplyScalar(F.lg); });
B.pelvis.parent.getWorldQuaternion(BSH_Q).invert();
BSH_V.set(0, 1, 0).applyQuaternion(BSH_Q);
B.pelvis.position.addScaledVector(BSH_V, add);
}
}
function bshApply(E) {
if (!E || !E.model || !E.plan || E.plan.type !== "human")
return;
var S = bshFor(E.spec, E.plan.L);
var F = S ? bshFac(S) : null;
bshBind(E.model, F);
if (E.bshF)
try {
bshUnmove(E);
}
catch (e) { }
E.bshBase = null;
E.bshF = F && (F.sh !== 1 || F.lg !== 1) ? F : null;
if (E.mixer && !E.mixer.bshWrapped) {
var mu = E.mixer.update;
E.mixer.bshWrapped = 1;
E.mixer.update = function (t) { try {
if (E.bshF)
bshUnmove(E);
}
catch (e) { } var r = mu.call(this, t); try {
bshMove(E);
}
catch (e) { } return r; };
}
}
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) { var r = ha.apply(this, arguments); try {
bshApply(E);
}
catch (e) {
if (window.console)
console.warn("[body shape]", e);
} return r; };
})();
(function () {
if (typeof whMeasure !== "function")
return;
var wm = whMeasure;
whMeasure = function (root) {
var swapped = [];
try {
root.traverse(function (m) { if (m.isSkinnedMesh && m.skeleton && m.skeleton.bshInv0 && swapped.indexOf(m.skeleton) < 0) {
var sk = m.skeleton;
sk.bshNow = sk.boneInverses;
sk.boneInverses = sk.bshInv0;
swapped.push(sk);
} });
}
catch (e) { }
try {
return wm.apply(this, arguments);
}
finally {
swapped.forEach(function (sk) { sk.boneInverses = sk.bshNow; sk.bshNow = null; });
}
};
})();
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) {
var g = bf.apply(this, arguments);
try {
var L = (typeof lookOf === "function") ? lookOf(spec) : spec.look, S = bshFor(spec, L);
if (S && g && g.children[0]) {
var F = bshFac(S), body = g.children[0], Lm = g.userData.limbs;
body.scale.multiplyScalar(F.h);
if (Lm) {
[Lm.la, Lm.ra].forEach(function (a) { if (!a)
return; a.position.x *= F.sh; a.scale.x *= F.mu; a.scale.z *= F.mu; });
[Lm.ll, Lm.rl].forEach(function (l) { if (!l)
return; l.position.x *= F.hpX; l.scale.x *= F.mu; l.scale.z *= F.mu; });
}
}
}
catch (e) { }
return g;
};
})();
function bshRows(L) { return __ZC(308, 1, this, arguments, new.target); }
function bshWord(k, v) { if (!v)
return "average"; var a = Math.abs(v); return (a < 35 ? "a little " : a < 75 ? "" : "very ") + (v < 0 ? k[2] : k[3]); }
function bshPreview(L) {
if (typeof meG === "undefined" || !meG || typeof HDF === "undefined")
return;
for (var i = 0; i < HDF.list.length; i++) {
var E = HDF.list[i];
if (E.g === meG && E.model) {
E.plan.L = L;
bshApply(E);
return;
}
}
}
(function () {
if (typeof wardBodyExtra === "function") {
var wb = wardBodyExtra;
wardBodyExtra = function (L, S, set) { var h = wb.apply(this, arguments) || ""; try {
h += bshRows(L);
}
catch (e) { } return h; };
}
else
wardBodyExtra = function (L) { return bshRows(L); };
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
var r = rw.apply(this, arguments);
try {
var w = document.getElementById("me-ward");
if (!w)
return r;
var L = meLook();
function keep() {
L.src = L.src || {};
L.src.shape = "chosen";
try {
var od = dreamer().offDuty;
if (od && od.look)
od.look.shape = L.shape;
}
catch (e) { }
rebuildMe();
save();
}
Array.prototype.forEach.call(w.querySelectorAll("[data-bsh]"), function (inp) {
var k = inp.getAttribute("data-bsh");
inp.oninput = function () {
L.shape = (L.shape && typeof L.shape === "object") ? L.shape : {};
L.shape[k] = Math.round(+inp.value) / 100;
var lab = w.querySelector('[data-bshv="' + k + '"]'), key = BSH_KEYS.filter(function (q) { return q[0] === k; })[0];
if (lab && key)
lab.textContent = bshWord(key, +inp.value);
bshPreview(L);
};
inp.onchange = function () { inp.oninput(); keep(); };
inp.onkeydown = function (e) { e.stopPropagation(); };
});
var rb = w.querySelector("[data-bshreset]");
if (rb)
rb.onclick = function () { delete L.shape; keep(); renderWardrobe(); };
}
catch (e) { }
return r;
};
})();
