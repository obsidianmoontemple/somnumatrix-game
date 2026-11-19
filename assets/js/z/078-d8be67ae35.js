/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(78, function () {
"use strict";
return [
function (C) {
ATL_SEQ.forEach(function (q, i) {
var fn = window[q[0]];
if (typeof fn !== "function")
return;
C.seq = q[1];
C.lim = (i + 1 < ATL_SEQ.length) ? ATL_SEQ[i + 1][1] : ATL_SEQ_END;
C.sec = q[0].replace(/^atl/, "").toLowerCase();
C.over = 0;
try {
fn(C);
}
finally {
C.lim = null;
C.sec = null;
}
});
C.seq = ATL_SEQ_END;
},
function (done, progress) {
if (ATL_JOB) {
(ATL_JOB.after || (ATL_JOB.after = [])).push(done);
return;
}
var J = atlCityJob();
if (!J.steps) {
var r0 = buildSomnucorCity();
if (done)
done(r0);
return;
}
ATL_JOB = J;
J.after = [done];
J.staged = true;
var budget = (typeof LITE !== "undefined" && LITE) ? 24 : 40;
(function slice() {
if (ATL_JOB !== J)
return;
var t0 = performance.now();
var bud = (typeof LCITY !== "undefined" && LCITY.on && typeof TGATE !== "undefined" && TGATE && !TGATE.entered) ? 90 : budget;
while (J.i < J.steps.length && performance.now() - t0 < bud)
atlJobStep(J);
if (progress)
try {
progress(J.i / J.steps.length);
}
catch (e) { }
if (J.i < J.steps.length) {
setTimeout(slice, 16);
return;
}
ATL_JOB = null;
var r = buildSomnucorCity();
if (typeof save === "function")
save();
J.after.forEach(function (f) { if (f)
try {
f(r);
}
catch (e) {
if (window.console)
console.warn("after Somnucor:", e);
} });
})();
},
function (f, words) {
var pc = Math.round(Math.max(0, Math.min(1, f)) * 100);
setStatus("<b>" + (words || "Building Somnucor\u2026") + "</b> " + pc + "%" +
"<span style='display:block;height:3px;margin-top:5px;background:rgba(201,190,168,.18);border-radius:2px;overflow:hidden'>" +
"<span style='display:block;height:100%;width:" + pc + "%;background:#C9BEA8'></span></span>");
},
function () {
if (CG.geo)
return CG.geo;
CG.geo = {
bar: new THREE.CylinderGeometry(.06, .06, 4.4, 6),
tip: new THREE.ConeGeometry(.13, .42, 6),
rail: new THREE.BoxGeometry(5.9, .22, .22),
stile: new THREE.BoxGeometry(.24, 5.2, .24),
arc: new THREE.TorusGeometry(2.6, .1, 6, 20, Math.PI / 2),
boss: new THREE.SphereGeometry(.22, 10, 8),
iron: new THREE.MeshStandardMaterial({ color: 0x1A1A22, metalness: .6, roughness: .45 }),
gold: new THREE.MeshStandardMaterial({ color: typeof ATL_GOLD !== "undefined" ? ATL_GOLD : 0xD4AF37, metalness: .8, roughness: .3 })
};
return CG.geo;
},
function (sd) {
var G = atlCrownGeo(), hinge = new THREE.Group(), leaf = new THREE.Group();
hinge.position.set(sd * 6.05, 0, 0);
hinge.add(leaf);
var nb = 11, bars = new THREE.InstancedMesh(G.bar, G.iron, nb), tips = new THREE.InstancedMesh(G.tip, G.gold, nb), m = new THREE.Matrix4();
for (var i = 0; i < nb; i++) {
var x = -sd * (0.45 + i * 0.5), top = 4.6 + (i / (nb - 1)) * 0.6;
m.makeScale(1, (top - 0.4) / 4.4, 1);
m.setPosition(x, 0.4 + (top - 0.4) / 2, 0);
bars.setMatrixAt(i, m);
m.makeTranslation(x, top + 0.2, 0);
tips.setMatrixAt(i, m);
}
leaf.add(bars);
leaf.add(tips);
[0.6, 2.2, 4.4].forEach(function (y) { var r = new THREE.Mesh(G.rail, G.iron); r.position.set(-sd * 2.95, y, 0); leaf.add(r); });
var st = new THREE.Mesh(G.stile, G.iron);
st.position.set(-sd * 0.1, 2.6, 0);
leaf.add(st);
var st2 = new THREE.Mesh(G.stile, G.iron);
st2.position.set(-sd * 5.85, 2.6, 0);
leaf.add(st2);
var arc = new THREE.Mesh(G.arc, G.gold);
arc.position.set(-sd * 5.9, 2.4, 0);
arc.rotation.z = sd > 0 ? 0 : Math.PI / 2;
leaf.add(arc);
var bo = new THREE.Mesh(G.boss, G.gold);
bo.position.set(-sd * 2.95, 2.2, 0.15);
leaf.add(bo);
hinge.userData.sd = sd;
return hinge;
}
];
});
