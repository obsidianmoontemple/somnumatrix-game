/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SSW = { off: /[?&]nossw\b/.test(location.search), done: new WeakSet(), skip: { wonders: 1, space: 1, sim: 1, surface: 0 }, added: {}, run: 0 };
var SSW_PRIM = { BoxGeometry: "box", BoxBufferGeometry: "box", CylinderGeometry: "cyl", CylinderBufferGeometry: "cyl", ConeGeometry: "cone", ConeBufferGeometry: "cone",
SphereGeometry: "ball", SphereBufferGeometry: "ball", IcosahedronGeometry: "rock", IcosahedronBufferGeometry: "rock", DodecahedronGeometry: "rock",
DodecahedronBufferGeometry: "rock", OctahedronGeometry: "rock", OctahedronBufferGeometry: "rock", TetrahedronGeometry: "rock", CapsuleGeometry: "cyl" };
var SSW_MOVES = /ship|boat|wayfarer|galleon|raft|barge|canoe|cart|\bcar\b|cars|train|tram|\bbus\b|wagon|coach|carriage|plane|balloon|airship|sled|sleigh|vehicle|mount|horse|bird|fish|whale|cloud|creature|beast|monster|npc|person|folk|crowd|dancer|animal|dragon|drone|wing|flag|banner|sail|rope|smoke|fire|flame|spark|water|wave|lava|door|gate|portal|curtain|hatch|lift|elevator|platform/i;
var SSW_UMOVE = ["limbs", "wTitle", "svo", "vel", "speed", "path", "bob", "sway", "spin", "walk", "move", "sail", "anim", "fly", "ride", "keep_moving", "drive", "npc", "beast", "folk"];
function sswKind(m) { var g = m.geometry; return g ? SSW_PRIM[g.type] || null : null; }
function sswOk(m, stop) { return __ZC(475, 0, this, arguments, new.target); }
function sswNote(m, rel) {
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
return { k: sswKind(m), bb: g.boundingBox.clone(), rel: rel.clone(), p: g.parameters || {} };
}
(function () {
if (typeof gwBake !== "function")
return;
var gb = gwBake;
gwBake = function (root) {
if (!SSW.off && root && root.traverse) {
try {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), L = root.userData.sswC || (root.userData.sswC = []), rel = new THREE.Matrix4();
root.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh)
return;
for (var q = m; q && q !== root; q = q.parent)
if (q.userData && q.userData.keep)
return;
if (!sswOk(m, root))
return;
rel.multiplyMatrices(inv, m.matrixWorld);
L.push(sswNote(m, rel));
});
if (L.length > 6000)
L.length = 6000;
}
catch (e) { }
}
return gb.apply(this, arguments);
};
})();
var SSW_V = null;
function sswPlace(n, mw) { return __ZC(475, 1, this, arguments, new.target); }
function sswGround(W, lx, z, feet) { try {
var h = W.ground ? W.ground(lx, z, feet) : null;
if (h != null)
return h;
}
catch (e) { } return 0; }
function sswBlocked(W, lx, z, feet) {
try {
if (W.solids && typeof worldSolidAt === "function" && worldSolidAt(W.solids, lx, z, feet))
return true;
}
catch (e) { }
try {
if (W.sswBlock0 && W.sswBlock0(lx, z, feet))
return true;
}
catch (e) { }
return false;
}
function sswSolid(W, S, arr) { return __ZC(475, 2, this, arguments, new.target); }
function sswCell(x, z) { return Math.floor(x / 16) + "," + Math.floor(z / 16); }
function sswAdd(W, s) { return __ZC(475, 3, this, arguments, new.target); }
function sswAt(W, lx, z, feet) { return __ZC(475, 4, this, arguments, new.target); }
function sswHook(W) {
if (W.sswHooked)
return;
W.sswHooked = true;
W.sswBlock0 = W.block || null;
W.block = function (lx, z, feet) { if (W.sswBlock0 && W.sswBlock0.apply(this, arguments))
return true; return !SSW.off && sswAt(W, lx, z, feet); };
}
function sswLook(key) { return __ZC(475, 5, this, arguments, new.target); }
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key) {
var r = wg.apply(this, arguments);
try {
if (r && !SSW.off) {
var W = WORLDS[key];
setTimeout(function () { sswLook(key); }, 1500);
SSW.sig = null;
}
}
catch (e) { }
return r;
};
setInterval(function () {
try {
if (SSW.off || !WLD.on || !WLD.w || !WLD.w.g || store.inside)
return;
var G = WLD.w.g, sig = WLD.on + ":" + G.children.length;
for (var i = 0; i < G.children.length && i < 400; i++) {
var c = G.children[i];
sig += "," + c.children.length + (c.visible ? "v" : "h");
}
if (sig !== SSW.sig) {
SSW.sig = sig;
sswLook(WLD.on);
}
}
catch (e) { }
}, 5000);
})();
function sswReport() { var W = WLD.w; if (!W || !W.sswGrid)
return "nothing added here"; var seen = new Set(), out = []; W.sswGrid.forEach(function (L) { L.forEach(function (s) { if (!seen.has(s)) {
seen.add(s);
out.push(s);
} }); }); return out; }
