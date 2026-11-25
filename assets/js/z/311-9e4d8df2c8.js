/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(311, function () {
"use strict";
return [
function () {
var g = new Set(), t = new Set();
var addMat = function (m) {
if (!m)
return;
for (var k in m) {
var v = m[k];
if (v && v.isTexture)
t.add(v);
}
if (m.uniforms)
for (var u in m.uniforms) {
var uv = m.uniforms[u] && m.uniforms[u].value;
if (uv && uv.isTexture)
t.add(uv);
}
};
(function walk(o) {
if (!o.visible)
return;
if (o.geometry)
g.add(o.geometry);
if (o.material) {
if (Array.isArray(o.material))
o.material.forEach(addMat);
else
addMat(o.material);
}
if (o.isSkinnedMesh && o.skeleton && o.skeleton.boneTexture)
t.add(o.skeleton.boneTexture);
for (var i = 0; i < o.children.length; i++)
walk(o.children[i]);
})(scene);
if (scene.background && scene.background.isTexture)
t.add(scene.background);
if (scene.environment && scene.environment.isTexture)
t.add(scene.environment);
return { g: g, t: t };
},
function (key) {
var W = typeof WORLDS !== "undefined" && WORLDS[key];
if (!W || !W.g || W.g.visible || WLD.on === key)
return 0;
var use = wfreeInUse(), gs = new Set(), ts = new Set();
var addMat = function (m) { if (!m)
return; for (var k in m) {
var v = m[k];
if (v && v.isTexture)
ts.add(v);
} };
W.g.traverse(function (o) {
if (o.geometry)
gs.add(o.geometry);
if (o.material) {
if (Array.isArray(o.material))
o.material.forEach(addMat);
else
addMat(o.material);
}
});
var n = 0;
gs.forEach(function (g) { if (!use.g.has(g)) {
try {
g.dispose();
n++;
}
catch (e) { }
} });
ts.forEach(function (t) { if (!use.t.has(t) && !(t.isRenderTargetTexture) && !(t.isVideoTexture)) {
try {
t.dispose();
n++;
}
catch (e) { }
} });
WFREE.freed[key] = (WFREE.freed[key] || 0) + 1;
WFREE.last = { key: key, n: n, at: Date.now() };
return n;
}
];
});
