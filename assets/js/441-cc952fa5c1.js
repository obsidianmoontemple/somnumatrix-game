/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var FLG = { kit: new WeakMap(), on: 0, hollow: 0, made: 0, at: 0, dummy: null, ph: null };
function flgDummy() {
if (!FLG.dummy) {
var o = function () { return new THREE.Object3D(); };
FLG.dummy = { ll: o(), rl: o(), la: o(), ra: o() };
}
return FLG.dummy;
}
function flgCount(o) { var n = 0; o.traverse(function () { n++; }); return n; }
function flgSig(g) {
var h = 0, i = 0;
g.traverse(function (o) {
if (o === g)
return;
i++;
var p = o.position, r = o.rotation, s = o.scale;
h += i * (p.x * 3.1 + p.y * 5.3 + p.z * 7.7 + r.x * 11.3 + r.y * 13.7 + r.z * 17.9 + s.x * 19.1 + s.y * 23.3 + s.z * 29.9 + (o.visible ? 31 : 0) + (o.castShadow ? 37 : 0) + (o.receiveShadow ? 41 : 0) + (o.material && o.material.id || 0) * 0.013);
});
return Math.round(h * 1e4);
}
function flgFolk(spec) {
return !!(spec && (spec.archetype === "human" || spec.archetype === "child") && !spec.deity && !spec.statue && spec.id !== "__me" && !spec.user_id);
}
if (typeof buildFigure === "function") {
var flgFig0 = buildFigure;
buildFigure = function (spec, f) {
var g = flgFig0.apply(this, arguments);
try {
if (g && flgFolk(spec))
FLG.kit.set(g, { via: "fig", f: f, kids: g.children.length, keys: Object.keys(g.userData), n: flgCount(g), sig: flgSig(g) });
}
catch (e) { }
return g;
};
}
if (typeof build === "function") {
var flgBuild0 = build;
build = function (spec) {
var g = flgBuild0.apply(this, arguments);
try {
if (g && flgFolk(spec))
FLG.kit.set(g, { via: "build", kids: g.children.length, keys: Object.keys(g.userData), n: flgCount(g), sig: flgSig(g) });
}
catch (e) { }
return g;
};
}
function flgFar() {
var H = (renderer && renderer.domElement && renderer.domElement.height) || 1080, fov = (camera && camera.fov) || 70;
var dot = 1.9 * H / (2 * Math.tan(fov * Math.PI / 360));
var far = dot;
if (scene && scene.fog && scene.fog.isFogExp2 && scene.fog.density > 0)
far = Math.min(far, 2.15 / scene.fog.density);
else if (scene && scene.fog && scene.fog.far)
far = Math.min(far, scene.fog.far);
if (camera && camera.far)
far = Math.min(far, camera.far);
var hd = (typeof HDF !== "undefined" && HDF.radius) ? HDF.radius * 1.5 : 0;
return Math.max(far, hd, 120);
}
function flgHollow(g, K) {
var kit = g.children.slice(0, K.kids);
kit.forEach(function (c) { g.remove(c); });
var ph = new THREE.Group();
ph.name = "flg-away";
g.children.unshift(ph);
ph.parent = g;
K.keys.forEach(function (k) { if (k !== "id")
delete g.userData[k]; });
g.userData.limbs = flgDummy();
g.userData.flgAway = 1;
FLG.hollow++;
}
function flgRestore(g, spec, K) {
var t = K.via === "fig" ? buildFigure(spec, K.f) : build(spec);
if (typeof HDF !== "undefined" && HDF.list)
for (var i = HDF.list.length - 1; i >= 0; i--)
if (HDF.list[i].g === t)
HDF.list.splice(i, 1);
var ph = g.children[0];
if (ph && ph.name === "flg-away") {
g.remove(ph);
}
var kids = t.children.slice();
kids.forEach(function (c) { t.remove(c); });
kids.forEach(function (c) { c.parent = g; });
g.children = kids.concat(g.children);
delete g.userData.flgAway;
delete g.userData.limbs;
Object.keys(t.userData).forEach(function (k) { if (k !== "id")
g.userData[k] = t.userData[k]; });
var K2 = FLG.kit.get(t);
if (K2) {
FLG.kit.set(g, { via: K.via, f: K.f, kids: K2.kids, keys: K2.keys, n: flgCount(g), sig: K.sig });
}
FLG.kit.delete(t);
g.updateMatrixWorld(true);
FLG.made++;
}
var FLG_V = null;
function flgTick() {
if (window.FLG_OFF || typeof HDF === "undefined" || !HDF.list || !camera || !scene)
return;
if (typeof WLD !== "undefined" && WLD.on)
return;
var far = flgFar(), cam = camera.position, back = far, away = far + 40, v = FLG_V || (FLG_V = new THREE.Vector3());
for (var i = 0; i < HDF.list.length; i++) {
var E = HDF.list[i], g = E.g, K = g && FLG.kit.get(g);
if (!K || !E.spec)
continue;
var top = typeof meshes !== "undefined" && meshes[E.spec.id] === g;
g.getWorldPosition(v);
var dx = v.x - cam.x, dz = v.z - cam.z, d = Math.sqrt(dx * dx + dz * dz);
if (g.userData.flgAway) {
if (d < back) {
try {
flgRestore(g, E.spec, K);
}
catch (e) {
if (window.console)
console.warn("[townsfolk] back", e);
}
}
continue;
}
if (d < away)
continue;
var o = g;
while (o.parent)
o = o.parent;
if (o !== scene)
continue;
if (E.model || (E.hid && E.hid.length) || g.children.length < K.kids)
continue;
if (flgCount(g) !== K.n)
continue;
if (!top && flgSig(g) !== K.sig)
continue;
try {
flgHollow(g, K);
}
catch (e) {
if (window.console)
console.warn("[townsfolk] away", e);
}
}
}
setInterval(function () { try {
flgTick();
}
catch (e) { } }, 1000);
function flgBackAll() {
if (typeof HDF === "undefined")
return;
HDF.list.forEach(function (E) { var g = E.g, K = g && FLG.kit.get(g); if (K && g.userData.flgAway && E.spec)
flgRestore(g, E.spec, K); });
}
