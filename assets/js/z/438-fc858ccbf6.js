/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(438, function () {
return [
function (key, cb) {
var lite = typeof LITE !== "undefined" && LITE, W = WORN[key];
if (!W)
return;
var file = WORN_DIR + key + (lite && W.lite !== false ? "-lite" : "") + ".glb", F = WORNF[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = WORNF[file] = { scene: null, bad: false, wait: [cb] };
modelsLoader(function (Ld) {
Ld.load(file, function (gl) {
var s = gl.scene;
s.updateMatrixWorld(true);
s.traverse(function (m) {
if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = false;
m.frustumCulled = false;
m.raycast = function () { };
var ms = Array.isArray(m.material) ? m.material : [m.material];
ms.forEach(function (M) { if (M && M.map)
M.map.anisotropy = 4; if (M && M.transparent && M.opacity >= 0.99) {
M.transparent = false;
M.alphaTest = 0.4;
} });
}
});
F.box = new THREE.Box3().setFromObject(s);
F.scene = s;
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[worn]", key, e);
} });
}, undefined, function () { F.bad = true; F.wait = []; });
});
},
function (E, key) {
var W = WORN[key], S = W && WORN_SLOT[W.slot];
if (!S)
return;
wornFile(key, function (F) {
if (!E.model || !E.g)
return;
var bone = null;
E.model.traverse(function (b) { if (!bone && b.isBone && S.bone.test(b.name))
bone = b; });
if (!bone)
return;
if (E.mixer)
E.mixer.update(0);
E.g.updateMatrixWorld(true);
var m = F.scene.clone(true), box = F.box, sz = box.getSize(new THREE.Vector3()), mid = box.getCenter(new THREE.Vector3());
var want = (W.size || S.size), dim = W.dim || S.dim, k = want / Math.max(1e-4, dim === "y" ? sz.y : dim === "z" ? sz.z : sz.x);
var inner = new THREE.Group();
inner.add(m);
m.position.set(-mid.x, -(S.hang ? box.max.y : mid.y), -mid.z);
var holder = new THREE.Group();
holder.add(inner);
inner.scale.setScalar(k);
var dp = W.depth != null ? W.depth : S.depth;
if (dp)
inner.scale.z = k * dp;
inner.rotation.order = "YXZ";
inner.rotation.y = W.turn != null ? W.turn : S.turn;
inner.rotation.x = (W.tilt != null ? W.tilt : S.tilt);
var at = W.at || S.at, bp = new THREE.Vector3();
bone.getWorldPosition(bp);
E.g.worldToLocal(bp);
holder.position.set(bp.x + at[0], bp.y + at[1], bp.z + at[2]);
holder.name = "worn " + key;
holder.userData.worn = key;
holder.userData.hdf = 1;
holder.traverse(function (o) { o.userData.hdf = 1; });
E.g.add(holder);
holder.updateMatrixWorld(true);
bone.attach(holder);
(E.worn = E.worn || []).push(holder);
if (W.slot === "wings") {
var t0 = hdfHash(E.id) % 1000 / 100, r0 = inner.rotation.x;
var any = null;
holder.traverse(function (o) { if (!any && o.isMesh)
any = o; });
if (any)
any.onBeforeRender = function () { var t = performance.now() / 1000 + t0; inner.rotation.x = r0 + 0.035 * Math.sin(t * 0.9); inner.updateMatrixWorld(true); };
}
});
},
function () {
var r = wornWard0.apply(this, arguments);
try {
if (typeof WARD_TAB === "undefined" || WARD_TAB !== "extras")
return r;
var w = document.getElementById("me-ward");
if (!w)
return r;
var L = meLook(), h = "";
WORN_ROWS.forEach(function (sr) {
var cur = L[sr[0]] || "";
h += '<div class="lk-row"><div class="lk-h">' + sr[1] + '</div><select data-worn="' + sr[0] + '"><option value="">none</option>';
Object.keys(WORN).filter(function (k) { return WORN[k].slot === sr[0]; }).forEach(function (k) {
var own = wearOwned(k);
h += '<option value="' + k + '"' + (k === cur ? " selected" : "") + '>' + WORN[k].label + (own ? "" : " — " + wearShownPrice(k) + " gold at the tailor's") + '</option>';
});
h += '</select></div>';
});
var box = document.createElement("div");
box.innerHTML = h;
var p = w.querySelector("p");
if (p)
w.insertBefore(box, p);
else
w.appendChild(box);
Array.prototype.forEach.call(box.querySelectorAll("[data-worn]"), function (sel) {
sel.onchange = function () {
var v = sel.value, sl = sel.getAttribute("data-worn");
if (v && !wearOwned(v)) {
wearBuy(v);
renderWardrobe();
return;
}
var M = meLook();
M[sl] = v || null;
M.src = M.src || {};
M.src[sl] = "chosen";
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
renderWardrobe();
};
});
}
catch (e) {
if (window.console)
console.warn("[worn] wardrobe", e);
}
return r;
},
function (d) {
var f = {};
(d.icons || []).forEach(function (t) {
var k = t.split(":")[0], v = t.split(":")[1];
if (k === "head" && v)
f.head = v;
else if (RBG_FACES[k])
f.faces = RBG_FACES[k];
else if (k === "arms4")
f.arms = Math.max(f.arms || 0, 1);
else if (k === "arms8")
f.arms = Math.max(f.arms || 0, 3);
else if (k === "arms10")
f.arms = Math.max(f.arms || 0, 4);
else if (k === "skull" && RBG_SKULLFACE[d.key])
f.skull = 1;
else if (k === "halfface")
f.half = 1;
else if (k === "onehand")
f.onehand = 1;
else if (k === "serpenttail")
f.tail = 1;
else if (k === "formless")
f.formless = 1;
});
return f;
},
function (spec) {
if (rbgOK0.apply(this, arguments))
return true;
try {
if (typeof rbWanted !== "function" || !rbWanted() || !spec || spec.archetype !== "deity" || !spec.deity || typeof DEITY === "undefined")
return false;
var d = DEITY[spec.deity];
if (!d || d.dragon)
return false;
return !rbgForms(d).formless;
}
catch (e) {
return false;
}
},
function (m, names, key) {
var g = m.geometry, K = g.uuid + ":" + key;
if (RBG.geo[K] !== undefined)
return RBG.geo[K];
var SI = g.attributes.skinIndex, SW = g.attributes.skinWeight, bones = m.skeleton.bones, ok = {};
bones.forEach(function (b, i) { if (b && names[b.name])
ok[i] = 1; });
var dom = new Uint8Array(SI.count);
for (var i = 0; i < SI.count; i++) {
var bi = 0, bw = -1;
for (var k = 0; k < 4; k++) {
var w = rlC(SW, i, k);
if (w > bw) {
bw = w;
bi = rlC(SI, i, k);
}
}
dom[i] = ok[bi] ? 1 : 0;
}
var src = g.index ? g.index.array : null, n = src ? src.length : SI.count, idx = [];
for (var t = 0; t < n; t += 3) {
var a = src ? src[t] : t, b2 = src ? src[t + 1] : t + 1, c = src ? src[t + 2] : t + 2;
if (dom[a] && dom[b2] && dom[c])
idx.push(a, b2, c);
}
if (idx.length < 30) {
RBG.geo[K] = null;
return null;
}
var G = new THREE.BufferGeometry();
for (var nm in g.attributes)
G.setAttribute(nm, g.attributes[nm]);
G.setIndex(SI.count > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
G.boundingSphere = g.boundingSphere;
G.userData.rbgShared = 1;
RBG.geo[K] = G;
return G;
},
function (E, root, tag, rotW, shiftW) {
var par = root.parent;
if (!par)
return null;
var names = {};
rbgChain(root).forEach(function (b) { names[b.name] = 1; });
var map = [], R = rbgBoneCopy(root, tag, map);
par.add(R);
var byName = {};
map.forEach(function (p) { byName[p[0].name] = p[1]; });
var meshes = [];
E.model.traverse(function (m) { if (m.isSkinnedMesh && m.skeleton && m.visible && m.material && m.material.userData && m.material.userData.rb && !m.userData.rbgCopy)
meshes.push(m); });
meshes.forEach(function (m) {
var G = rbgPartGeo(m, names, root.name);
if (!G)
return;
var bones = m.skeleton.bones.map(function (b) { return b && byName[b.name] ? byName[b.name] : b; });
var S = new THREE.Skeleton(bones, m.skeleton.boneInverses.map(function (q) { return q.clone(); }));
var c = new THREE.SkinnedMesh(G, m.material);
c.name = m.name + "~" + tag;
c.userData.rbgCopy = 1;
c.userData.hdf = 1;
c.position.copy(m.position);
c.quaternion.copy(m.quaternion);
c.scale.copy(m.scale);
c.frustumCulled = false;
c.castShadow = true;
c.receiveShadow = true;
c.raycast = function () { };
m.parent.add(c);
c.bind(S, m.bindMatrix);
});
var body = E.g.children[0];
body.updateMatrixWorld(true);
par.updateMatrixWorld(true);
var Bq = body.getWorldQuaternion(new THREE.Quaternion()), Pq = par.getWorldQuaternion(new THREE.Quaternion()), Pi = Pq.clone().invert();
var Qw = Bq.clone().multiply(rotW).multiply(Bq.clone().invert());
var off = Pi.clone().multiply(Qw).multiply(Pq);
var sh = shiftW ? shiftW.clone().applyQuaternion(Bq) : new THREE.Vector3();
var bs = body.getWorldScale(new THREE.Vector3()).y, ps = par.getWorldScale(new THREE.Vector3()).y;
sh.multiplyScalar(bs / Math.max(1e-6, ps)).applyQuaternion(Pi);
return { root: R, orig: root, map: map, off: off, shift: sh };
},
function (E) {
var C = E.rbg;
if (!C)
return;
(C.parts || []).forEach(function (P) {
for (var i = 0; i < P.map.length; i++) {
var o = P.map[i][0], c = P.map[i][1];
c.position.copy(o.position);
c.quaternion.copy(o.quaternion);
c.scale.copy(o.scale);
}
P.root.quaternion.premultiply(P.off);
P.root.position.add(P.shift);
(P.subs || []).forEach(function (q) { q.b.quaternion.premultiply(q.off); });
});
(C.shrink || []).forEach(function (b) { b.scale.setScalar(0.01); });
},
function (E) {
var body = E.g.children[0], kit = E.g.userData.hdfKit, out = [], seen = new Set();
(E.icons || []).forEach(function (r) { if (r.parent === body) {
out.push({ o: r.o, pos: r.pos, rec: r });
seen.add(r.o);
} });
body.children.forEach(function (o) { if (seen.has(o) || (kit && kit.has(o)) || o.userData.hdfRoot || o.userData.rbg)
return; out.push({ o: o, pos: o.position.clone(), rec: null }); });
return out;
},
function (E) {
var H = typeof hfHead === "function" ? hfHead(E) : null;
if (!H)
return null;
var body = E.g.children[0], v = new THREE.Vector3(), b = new THREE.Box3();
try {
H.G.updateMatrixWorld(true);
H.pts.forEach(function (p) { v.copy(p); H.G.localToWorld(v); body.worldToLocal(v); b.expandByPoint(v); });
}
finally {
if (H.G.parent)
H.G.parent.remove(H.G);
}
return b.isEmpty() ? null : b;
},
function (body, kit) {
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert(), b = new THREE.Box3();
body.children.forEach(function (m) { if (kit && kit.has(m) && m.userData && m.userData.part === "head") {
var x = new THREE.Box3().setFromObject(m).applyMatrix4(inv);
b.union(x);
} });
if (b.isEmpty()) {
b.min.set(-0.118, 1.72 - 0.118, -0.118);
b.max.set(0.118, 1.72 + 0.118, 0.118);
}
return b;
},
function (E) {
var body = E.g.children[0], kit = E.g.userData.hdfKit, hb = rbgBone(E, /^head$/i);
if (!hb)
return;
if (E.dgxFit && typeof dgxHdOff === "function")
dgxHdOff(E);
var rb = rbgHeadBox(E);
body.updateMatrixWorld(true);
var kb = rbgKitHeadBox(body, kit), kc = kb.getCenter(new THREE.Vector3()), rc = rb ? rb.getCenter(new THREE.Vector3()) : kc.clone();
var s = rb ? Math.max(0.85, Math.min(1.2, (rb.max.y - rb.min.y) / Math.max(0.05, kb.max.y - kb.min.y) * 1.05)) : 1;
if (rb)
rc.z = Math.max(rc.z, kc.z);
rbgKitPieces(E).forEach(function (q) {
var o = q.o, p = q.pos, beast = o.isGroup && !o.userData.dl && Math.abs(p.x) < 0.1 && p.y > 1.6 && p.y < 1.85 && o.name !== "dgx-headwear";
var hw = o.name === "dgx-headwear" || (o.userData && o.userData.dgxKitHw);
if (!beast && !hw)
return;
rbgHome(E, q);
o.position.sub(kc).multiplyScalar(s).add(rc);
o.scale.multiplyScalar(s);
rbgOnto(E, q, hb);
});
E.model.traverse(function (m) { var u = m.isSkinnedMesh && m.material && m.material.userData && m.material.userData.rb; if (u && (u.kind === "head" || u.kind === "opacity") && m.visible) {
m.visible = false;
(E.rbgHid = E.rbgHid || []).push(m);
} });
},
function (E, angs) {
var hb = rbgBone(E, /^head$/i);
if (!hb)
return;
rbgKitPieces(E).forEach(function (q) {
var o = q.o, p = q.pos;
if (o.isMesh && o.geometry && o.geometry.type === "SphereGeometry" && p.y > 1.6 && p.y < 1.85 && Math.abs(p.x) < 0.25 && !(o.userData && o.userData.dgxKitHw))
rbgHideObj(E, o);
});
angs.forEach(function (a, i) {
var rot = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a);
var P = rbgCopyPart(E, hb, "f" + i, rot, new THREE.Vector3(Math.sin(a), 0, Math.cos(a)).multiplyScalar(0.012));
if (P)
E.rbg.parts.push(P);
});
},
function (E, extra) {
var body = E.g.children[0];
var items = rbgKitPieces(E).filter(function (q) { return !q.rec && !(q.o.userData && (q.o.userData.wing || q.o.userData.dgxKitHw)); });
for (var k = 1; k <= extra; k++)
[-1, 1].forEach(function (sd) {
var ub = rbgBone(E, sd < 0 ? /^upperarm_r$/ : /^upperarm_l$/);
if (!ub)
return;
var t = extra > 1 ? (k - 1) / (extra - 1) : 0, ang = sd * (0.42 + t * 0.75);
var rot = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.25 - 0.15 * t, 0, ang, "ZXY"));
var P = rbgCopyPart(E, ub, "a" + k + (sd < 0 ? "r" : "l"), rot, new THREE.Vector3(0, -0.012 * k, -0.03 * k));
if (!P)
return;
E.rbg.parts.push(P);
rbgSync(E);
E.model.updateMatrixWorld(true);
var lo = null, hand = null;
P.map.forEach(function (p) { if (/^lowerarm_[lr]$/.test(p[0].name))
lo = p[1]; if (/^hand_[lr]$/.test(p[0].name))
hand = p[1]; });
if (lo && lo.parent) {
var Bq = body.getWorldQuaternion(new THREE.Quaternion()), Pq = lo.parent.getWorldQuaternion(new THREE.Quaternion());
var bend = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.45 + 0.35 * t, 0, -sd * (0.5 + 0.4 * t), "ZXY"));
var Qw = Bq.clone().multiply(bend).multiply(Bq.clone().invert());
P.subs = [{ b: lo, off: Pq.clone().invert().multiply(Qw).multiply(Pq) }];
}
if (!hand)
return;
var hx = sd * .2 + Math.sin(sd * (.55 + k * .28)) * .6, hy = 1.47 - k * .03 - Math.cos(.55 + k * .28) * .6 * Math.cos(.35), hz = -.02 + .6 * Math.sin(.35);
items.forEach(function (q) {
if (q.done || Math.hypot(q.pos.x - hx, q.pos.y - hy, q.pos.z - hz) > 0.08)
return;
q.done = 1;
E.rbg.held.push({ q: q, hand: hand });
});
});
},
function (E) {
var body = E.g.children[0];
(E.rbg.held || []).forEach(function (h) {
var q = h.q;
body.updateMatrixWorld(true);
var w = h.hand.getWorldPosition(new THREE.Vector3());
var off = new THREE.Vector3(0, 0, 0.05).applyQuaternion(body.getWorldQuaternion(new THREE.Quaternion()));
w.add(off);
rbgOnto(E, q, h.hand);
q.o.parent.worldToLocal(w);
q.o.position.copy(w);
});
},
function (E) {
var root = E.model, ref = null;
root.traverse(function (m) { if (!ref && m.isSkinnedMesh && m.skeleton)
ref = m; });
if (!ref)
return;
var ax = new THREE.Vector3(1, 0, 0), mid = new THREE.Vector3();
var dead = new THREE.Color(0x2A3040);
dead.convertSRGBToLinear();
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.material || !m.material.userData || !m.material.userData.rb || m.userData.rbgCopy)
return;
var M = m.material, prev = M.onBeforeCompile, pk = M.customProgramCacheKey;
var U = { rbgAx: { value: ax }, rbgMid: { value: mid }, rbgDead: { value: new THREE.Vector3(dead.r, dead.g, dead.b) } };
M.onBeforeCompile = function (sh, r) {
if (prev)
prev.call(this, sh, r);
Object.assign(sh.uniforms, U);
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform vec3 rbgAx; uniform vec3 rbgMid; varying float vRbgSide;")
.replace("#include <begin_vertex>", "#include <begin_vertex>\nvRbgSide=dot(position-rbgMid,rbgAx);");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform vec3 rbgDead; varying float vRbgSide;")
.replace("#include <alphamap_fragment>", "{ float rbgK=smoothstep(-0.004,0.004,vRbgSide); float rbgL=dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)); diffuseColor.rgb=mix(diffuseColor.rgb,rbgDead*(0.55+rbgL*1.6),rbgK); }\n#include <alphamap_fragment>");
};
M.customProgramCacheKey = function () { return (pk ? pk.call(this) : "") + "rbghalf"; };
M.needsUpdate = true;
});
},
function () {
if (RBG.tex)
return RBG.tex;
var c = document.createElement("canvas");
c.width = 128;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#FFFFFF";
x.fillRect(0, 0, 128, 128);
for (var j = -1; j < 9; j++)
for (var i = -1; i < 9; i++) {
var cx = i * 16 + (j % 2 ? 8 : 0), cy = j * 16;
var g = x.createRadialGradient(cx, cy + 4, 1, cx, cy + 2, 11);
g.addColorStop(0, "rgba(255,255,255,0)");
g.addColorStop(0.75, "rgba(0,0,0,0.10)");
g.addColorStop(1, "rgba(0,0,0,0.42)");
x.fillStyle = g;
x.beginPath();
x.moveTo(cx - 8, cy);
x.quadraticCurveTo(cx - 8, cy + 12, cx, cy + 15);
x.quadraticCurveTo(cx + 8, cy + 12, cx + 8, cy);
x.closePath();
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
RBG.tex = t;
return t;
},
function (hipY) {
var K = Math.round(hipY * 50);
if (RBG.tail[K])
return RBG.tail[K];
var P = [[0, hipY, 0.0], [0, hipY - 0.25, 0.04], [0.02, hipY - 0.55, 0.08], [0.06, 0.22, 0.1], [0.14, 0.09, 0.02], [0.32, 0.08, -0.22], [0.26, 0.07, -0.52], [-0.04, 0.06, -0.66], [-0.36, 0.05, -0.52], [-0.46, 0.045, -0.22], [-0.34, 0.04, 0.06], [-0.1, 0.035, 0.16]];
var curve = new THREE.CatmullRomCurve3(P.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
var N = 96, S = 14, pos = [], uv = [], idx = [], fr = curve.computeFrenetFrames(N, false), len = curve.getLength();
for (var i = 0; i <= N; i++) {
var t = i / N, c = curve.getPointAt(t), n = fr.normals[i], b = fr.binormals[i];
var r = t < 0.06 ? 0.15 + 0.03 * (t / 0.06) : 0.18 * Math.pow(1 - t, 0.7) + 0.012;
for (var j = 0; j <= S; j++) {
var a = j / S * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
pos.push(c.x + r * (ca * n.x + sa * b.x), Math.max(0.004, c.y + r * (ca * n.y + sa * b.y) * (t > 0.35 ? 0.8 : 1)), c.z + r * (ca * n.z + sa * b.z));
uv.push(j / S * 2, t * len * 3);
}
}
for (var i2 = 0; i2 < N; i2++)
for (var j2 = 0; j2 < S; j2++) {
var a0 = i2 * (S + 1) + j2, b0 = a0 + S + 1;
idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return (RBG.tail[K] = g);
},
function (E) {
var body = E.g.children[0], d = DEITY[E.spec.deity], L = E.plan.L || {};
["thigh_l", "thigh_r"].forEach(function (n) { var b = rbgBone(E, new RegExp("^" + n + "$")); if (b)
E.rbg.shrink.push(b); });
var pv = rbgBone(E, /^pelvis$/), hipY = 0.95;
if (pv) {
body.updateMatrixWorld(true);
var v = pv.getWorldPosition(new THREE.Vector3());
body.worldToLocal(v);
hipY = Math.max(0.6, Math.min(1.15, v.y));
}
var col = L.top != null ? L.top : 0x3F7A3A;
if (d && d.key === "echidna")
col = 0x2E5A3A;
var T = new THREE.Mesh(rbgTailGeo(hipY), rbgTailMat(col));
T.name = "serpent-tail";
T.userData.rbg = 1;
T.userData.hdf = 1;
T.castShadow = true;
T.receiveShadow = true;
T.raycast = function () { };
body.add(T);
E.rbg.tail = T;
},
function (m, re) {
var sk = m.skeleton, ix = -1;
for (var i = 0; i < sk.bones.length; i++)
if (sk.bones[i] && re.test(sk.bones[i].name)) {
ix = i;
break;
}
if (ix < 0)
return null;
var g = m.geometry, P = g.attributes.position, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight, c = new THREE.Vector3(), n = 0;
for (var v = 0; v < P.count; v++) {
var bi = 0, bw = -1;
for (var k = 0; k < 4; k++) {
var w = rlC(SW, v, k);
if (w > bw) {
bw = w;
bi = rlC(SI, v, k);
}
}
if (bi === ix) {
c.x += P.getX(v);
c.y += P.getY(v);
c.z += P.getZ(v);
n++;
}
}
return n ? c.multiplyScalar(1 / n) : null;
},
function (E) {
rbgKitPieces(E).forEach(function (q) { var o = q.o, p = q.pos; if (o.isGroup && !o.userData.dl && !(o.userData && o.userData.dgxKitHw) && o.name !== "dgx-headwear" && Math.abs(p.x) < 0.1 && p.y > 1.6 && p.y < 1.85)
rbgHideObj(E, o); });
var bone = new THREE.Color(0xE6DFCF);
bone.convertSRGBToLinear();
E.model.traverse(function (m) {
var u = m.isSkinnedMesh && m.material && m.material.userData && m.material.userData.rb;
if (!u || u.kind !== "head" || m.userData.rbgCopy)
return;
var le = rbgBindAt(m, /^Bip01_LEye$/), re = rbgBindAt(m, /^Bip01_REye$/), no = rbgBindAt(m, /^Bip01_MNose$/), ul = rbgBindAt(m, /^Bip01_MUpperLip$/), bl = rbgBindAt(m, /^Bip01_MBottomLip$/);
if (!le || !re || !no)
return;
var unit = le.distanceTo(re), mouth = ul && bl ? ul.clone().add(bl).multiplyScalar(0.5) : no.clone().lerp(le.clone().add(re).multiplyScalar(0.5), -0.8);
var side = le.clone().sub(re).normalize();
var M = m.material, prev = M.onBeforeCompile, pk = M.customProgramCacheKey;
var U = { rbgLE: { value: le }, rbgRE: { value: re }, rbgNo: { value: no }, rbgMo: { value: mouth }, rbgSd: { value: side }, rbgU: { value: unit }, rbgBone: { value: new THREE.Vector3(bone.r, bone.g, bone.b) } };
M.onBeforeCompile = function (sh, r) {
if (prev)
prev.call(this, sh, r);
Object.assign(sh.uniforms, U);
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vRbgP;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvRbgP=position;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform vec3 rbgLE; uniform vec3 rbgRE; uniform vec3 rbgNo; uniform vec3 rbgMo; uniform vec3 rbgSd; uniform float rbgU; uniform vec3 rbgBone; varying vec3 vRbgP;")
.replace("#include <alphamap_fragment>", "{ float l=dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)); vec3 c=rbgBone*(0.62+l*1.1);" +
" float e=min(distance(vRbgP,rbgLE),distance(vRbgP,rbgRE))/rbgU; c=mix(c,vec3(0.012),1.0-smoothstep(0.36,0.46,e));" +
" float n=distance(vRbgP,rbgNo)/rbgU; c=mix(c,vec3(0.012),1.0-smoothstep(0.15,0.21,n));" +
" vec3 d=vRbgP-rbgMo; float x=dot(d,rbgSd)/rbgU; float y=length(d-rbgSd*dot(d,rbgSd))/rbgU;" +
" if(abs(x)<0.62&&y<0.16){ float t=abs(fract(x*7.0)-0.5); c=mix(c,vec3(0.02),(1.0-smoothstep(0.06,0.12,t))*0.9); if(y<0.035) c=mix(c,vec3(0.02),0.85); }" +
" diffuseColor.rgb=c; }\n#include <alphamap_fragment>");
};
M.customProgramCacheKey = function () { return (pk ? pk.call(this) : "") + "rbgskull"; };
M.needsUpdate = true;
});
},
function () {
var G = new THREE.Group(), f = dgxMat("fur", 0x3A2218), h = dgxMat("horn", 0xE2D6BC);
dgxEgg(G, f, new THREE.Vector3(0, 0.02, -0.01), 0.13, 0.13, 0.14);
dgxEgg(G, f, new THREE.Vector3(0, -0.04, 0.1), 0.1, 0.09, 0.12, 0.25);
dgxEgg(G, dgxMat("leaf", 0x2A1A16), new THREE.Vector3(0, -0.07, 0.205), 0.075, 0.055, 0.04);
[-1, 1].forEach(function (sd) {
dgxBall(G, dgxMat("lacquer", 0x050505), new THREE.Vector3(sd * 0.03, -0.065, 0.24), 0.012, 1, 0.7, 0.5);
G.add(dgxTaper([new THREE.Vector3(sd * 0.1, 0.09, -0.02), new THREE.Vector3(sd * 0.22, 0.11, 0.0), new THREE.Vector3(sd * 0.3, 0.2, 0.04), new THREE.Vector3(sd * 0.28, 0.3, 0.07)], 0.035, 0.004, h, 10));
dgxEgg(G, f, new THREE.Vector3(sd * 0.15, 0.04, -0.03), 0.06, 0.022, 0.035).rotation.z = sd * -0.4;
dgxEye(G, new THREE.Vector3(sd * 0.075, 0.05, 0.085), 0x8A2A10);
});
dgxEgg(G, f, new THREE.Vector3(0, 0.12, 0.0), 0.08, 0.04, 0.07);
return G;
},
function () {
var G = new THREE.Group(), f = dgxMat("fur", 0x1C1A1A), h = dgxMat("horn", 0x2A2622);
dgxEgg(G, f, new THREE.Vector3(0, 0.03, -0.01), 0.1, 0.12, 0.12);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.05), new THREE.Vector3(0, -0.05, 0.15), new THREE.Vector3(0, -0.09, 0.21)], 0.06, 0.035, f, 10));
dgxBall(G, dgxMat("lacquer", 0x0A0808), new THREE.Vector3(0, -0.085, 0.235), 0.02, 1.4, 0.8, 0.6);
G.add(dgxTaper([new THREE.Vector3(0, -0.11, 0.16), new THREE.Vector3(0, -0.2, 0.15), new THREE.Vector3(0, -0.27, 0.12)], 0.03, 0.004, f, 6));
[-1, 1].forEach(function (sd) {
G.add(dgxTaper([new THREE.Vector3(sd * 0.045, 0.12, 0.02), new THREE.Vector3(sd * 0.07, 0.22, -0.06), new THREE.Vector3(sd * 0.1, 0.25, -0.18), new THREE.Vector3(sd * 0.12, 0.18, -0.26)], 0.03, 0.005, h, 10));
dgxEgg(G, f, new THREE.Vector3(sd * 0.13, 0.03, -0.02), 0.07, 0.018, 0.03).rotation.z = sd * 0.35;
dgxEye(G, new THREE.Vector3(sd * 0.06, 0.06, 0.075), 0xD8A020);
});
return G;
},
function () {
var G = new THREE.Group(), c = dgxMat("lacquer", 0x141418), eye = RBG.mat.flyeye || (RBG.mat.flyeye = new THREE.MeshPhongMaterial({ color: 0x8A1810, shininess: 120, specular: 0xFF9070, flatShading: true }));
dgxEgg(G, c, new THREE.Vector3(0, 0.0, 0), 0.1, 0.11, 0.1);
[-1, 1].forEach(function (sd) {
var e = new THREE.Mesh(RBG.ico || (RBG.ico = new THREE.IcosahedronGeometry(1, 2)), eye);
e.position.set(sd * 0.075, 0.02, 0.05);
e.scale.set(0.075, 0.09, 0.075);
G.add(e);
G.add(dgxTaper([new THREE.Vector3(sd * 0.02, 0.09, 0.07), new THREE.Vector3(sd * 0.04, 0.15, 0.11), new THREE.Vector3(sd * 0.08, 0.19, 0.1)], 0.007, 0.002, c, 5));
});
G.add(dgxTaper([new THREE.Vector3(0, -0.05, 0.07), new THREE.Vector3(0, -0.12, 0.1), new THREE.Vector3(0, -0.17, 0.08)], 0.025, 0.012, c, 8));
dgxEgg(G, dgxMat("lacquer", 0x2A1A10), new THREE.Vector3(0, -0.18, 0.08), 0.028, 0.012, 0.028);
return G;
},
function () {
var G = new THREE.Group(), f = dgxMat("fur", 0x8A6A3A), sk = dgxMat("leaf", 0xC8A07A);
dgxEgg(G, f, new THREE.Vector3(0, 0.02, -0.01), 0.115, 0.12, 0.115);
dgxEgg(G, sk, new THREE.Vector3(0, -0.005, 0.065), 0.085, 0.09, 0.06);
dgxEgg(G, sk, new THREE.Vector3(0, -0.055, 0.1), 0.06, 0.045, 0.05);
dgxEgg(G, f, new THREE.Vector3(0, 0.06, 0.085), 0.085, 0.022, 0.03);
dgxBall(G, dgxMat("lacquer", 0x2A1A12), new THREE.Vector3(0, -0.035, 0.148), 0.008, 1.6, 0.8, 0.6);
[-1, 1].forEach(function (sd) { dgxEgg(G, sk, new THREE.Vector3(sd * 0.115, 0.01, -0.005), 0.03, 0.042, 0.014); dgxEye(G, new THREE.Vector3(sd * 0.035, 0.035, 0.11), 0x6A4A1A); });
return G;
},
function () {
var G = new THREE.Group(), g = dgxMat("leaf", 0x8A8684), t = dgxMat("horn", 0xF0EAD8);
dgxEgg(G, g, new THREE.Vector3(0, 0.03, 0), 0.15, 0.15, 0.14);
dgxEgg(G, g, new THREE.Vector3(0, 0.12, 0.0), 0.11, 0.06, 0.1);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.11), new THREE.Vector3(0, -0.12, 0.17), new THREE.Vector3(0, -0.27, 0.17), new THREE.Vector3(0.03, -0.4, 0.12), new THREE.Vector3(0.09, -0.45, 0.16)], 0.06, 0.018, g, 10));
[-1, 1].forEach(function (sd) {
var e = dgxEgg(G, g, new THREE.Vector3(sd * 0.17, -0.01, -0.03), 0.025, 0.16, 0.13);
e.rotation.y = sd * -0.5;
dgxEye(G, new THREE.Vector3(sd * 0.075, 0.04, 0.115), 0x2A1A10);
});
G.add(dgxTaper([new THREE.Vector3(-0.055, -0.07, 0.12), new THREE.Vector3(-0.07, -0.13, 0.2), new THREE.Vector3(-0.05, -0.15, 0.26)], 0.018, 0.004, t, 6));
G.add(dgxTaper([new THREE.Vector3(0.055, -0.07, 0.12), new THREE.Vector3(0.068, -0.11, 0.17)], 0.018, 0.014, t, 6));
return G;
},
function (E) {
if (!E)
return;
(E.rbgHid || []).forEach(function (m) { m.visible = true; });
E.rbgHid = null;
var C = E.rbg;
if (!C)
return;
if (C.tail && C.tail.parent)
C.tail.parent.remove(C.tail);
C.parts.forEach(function (P) { if (P.root.parent)
P.root.parent.remove(P.root); });
E.rbg = null;
},
function (spec, d) {
try {
var L = lookOf(spec), S = L.src || {};
if (S.hat !== "tradition" && S.hat !== "stated")
L.hat = "none";
if (S.face !== "stated")
L.face = null;
if (S.back !== "stated")
L.back = null;
if (S.neck !== "stated")
L.neck = null;
if (S.waist !== "stated")
L.waist = null;
if (S.layer !== "stated")
L.layer = null;
}
catch (e) { }
return rbgDL0.apply(this, arguments);
},
function () {
if (RBF.mat)
return RBF.mat;
var U = { uT: { value: 0 } };
var m = new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
vertexShader: "varying vec2 vUv; varying float vSeed; void main(){ vUv=uv; vSeed=fract(dot(modelMatrix[3].xyz,vec3(0.137,0.291,0.173)))*40.0; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
fragmentShader: [
"uniform float uT; varying vec2 vUv; varying float vSeed;",
"float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }",
"float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }",
"float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<4;i++){ v+=a*n2(p); p*=2.03; a*=0.5; } return v; }",
"void main(){",
"  float y=vUv.y, x=(vUv.x-0.5)*2.0, t=uT+vSeed;",
"  float n=fbm(vec2(vUv.x*3.2+vSeed, y*2.6-t*2.4));",
"  float m=fbm(vec2(vUv.x*6.0-vSeed, y*5.0-t*3.6));",
"  float w=0.62*sqrt(max(0.0,1.0-y))*smoothstep(0.0,0.12,y+0.04);",
"  float d=w-abs(x+(n-0.5)*0.9*y);",
"  float body=smoothstep(-0.02,0.22,d+(m-0.5)*0.35*y-y*0.18);",
"  float core=smoothstep(0.12,0.42,d)*(1.0-y*1.1);",
"  vec3 c=mix(vec3(0.75,0.12,0.02),vec3(1.0,0.48,0.08),smoothstep(0.0,0.6,body));",
"  c=mix(c,vec3(1.0,0.86,0.5),clamp(core*1.4,0.0,1.0));",
"  float a=body*(1.0-smoothstep(0.62,1.0,y))*0.95;",
"  if(a<0.01) discard;",
"  gl_FragColor=vec4(c*1.25,a);",
"}"
].join("\n") });
m.userData.rbFire = 1;
return (RBF.mat = m);
},
function () {
if (RBF.geo.f)
return RBF.geo.f;
var parts = [0, 1, 2].map(function (i) { var p = new THREE.PlaneGeometry(1, 1, 1, 1); p.translate(0, 0.5, 0); p.rotateY(i * Math.PI / 3); return p; });
var pos = [], uv = [], idx = [], o = 0;
parts.forEach(function (p) { var P = p.attributes.position, T = p.attributes.uv; for (var i = 0; i < P.count; i++) {
pos.push(P.getX(i), P.getY(i), P.getZ(i));
uv.push(T.getX(i), T.getY(i));
} p.index.array.forEach(function (k) { idx.push(k + o); }); o += P.count; p.dispose(); });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
return (RBF.geo.f = g);
},
function () {
if (RBF.wood)
return;
RBF.wood = new THREE.MeshStandardMaterial({ color: 0x5A3A22, roughness: 0.85 });
RBF.pitch = new THREE.MeshStandardMaterial({ color: 0x1E1610, roughness: 0.6, metalness: 0.0, emissive: 0x3A1404, emissiveIntensity: 0.6 });
RBF.cord = new THREE.MeshStandardMaterial({ color: 0x8A6A44, roughness: 0.95 });
RBF.hGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.62, 10);
RBF.hGeo.translate(0, 0.06, 0);
RBF.kGeo = new THREE.CylinderGeometry(0.05, 0.034, 0.14, 12);
RBF.kGeo.translate(0, 0.43, 0);
RBF.bGeo = new THREE.TorusGeometry(0.046, 0.007, 5, 16);
RBF.bGeo.rotateX(Math.PI / 2);
},
function () {
rbfTorchMats();
var g = new THREE.Group();
g.add(new THREE.Mesh(RBF.hGeo, RBF.wood));
g.add(new THREE.Mesh(RBF.kGeo, RBF.pitch));
[0.38, 0.44, 0.48].forEach(function (y) { var b = new THREE.Mesh(RBF.bGeo, RBF.cord); b.position.y = y; b.scale.setScalar(y > 0.45 ? 1.05 : 0.95); g.add(b); });
var f = rbFire(0.2, 0.46);
f.position.y = 0.47;
g.add(f);
g.position.y = 0;
g.userData.rbTorch = 1;
return g;
},
function (P, p, tmp) {
if (P.t === "e") {
tmp.set(p.x - P.c[0], p.y - P.c[1], p.z - P.c[2]);
rbkRot(tmp, P.rot);
var a = tmp.x / P.r[0], b = tmp.y / P.r[1], c = tmp.z / P.r[2], k0 = Math.sqrt(a * a + b * b + c * c), k1 = Math.sqrt(a * a / (P.r[0] * P.r[0]) + b * b / (P.r[1] * P.r[1]) + c * c / (P.r[2] * P.r[2]));
return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(P.r[0], P.r[1], P.r[2]);
}
var ax = P.b[0] - P.a[0], ay = P.b[1] - P.a[1], az = P.b[2] - P.a[2], px = p.x - P.a[0], py = p.y - P.a[1], pz = p.z - P.a[2];
var h = Math.max(0, Math.min(1, (px * ax + py * ay + pz * az) / (ax * ax + ay * ay + az * az)));
return Math.hypot(px - ax * h, py - ay * h, pz - az * h) - (P.r0 + (P.r1 - P.r0) * h);
},
function (prims, cell, K) {
K = K || 0.022;
cell = cell || 0.006;
var lo = new THREE.Vector3(1e9, 1e9, 1e9), hi = new THREE.Vector3(-1e9, -1e9, -1e9);
prims.forEach(function (P) {
var R = P.t === "e" ? Math.max(P.r[0], P.r[1], P.r[2]) : Math.max(P.r0, P.r1);
(P.t === "e" ? [P.c] : [P.a, P.b]).forEach(function (c) { lo.min(new THREE.Vector3(c[0] - R, c[1] - R, c[2] - R)); hi.max(new THREE.Vector3(c[0] + R, c[1] + R, c[2] + R)); });
});
lo.addScalar(-cell * 3);
hi.addScalar(cell * 3);
var nx = Math.ceil((hi.x - lo.x) / cell) + 1, ny = Math.ceil((hi.y - lo.y) / cell) + 1, nz = Math.ceil((hi.z - lo.z) / cell) + 1;
var F = new Float32Array(nx * ny * nz), p = new THREE.Vector3(), tmp = new THREE.Vector3();
var sdf = function (x, y, z) { p.set(x, y, z); var d = 1e9; for (var i = 0; i < prims.length; i++) {
var P = prims[i], q = rbkSd(P, p, tmp);
if (P.cut)
d = Math.max(d, -q);
else
d = (d >= 1e8) ? q : rbkSmin(d, q, P.k || K);
} return d; };
for (var k = 0; k < nz; k++)
for (var j = 0; j < ny; j++)
for (var i = 0; i < nx; i++)
F[i + nx * (j + ny * k)] = sdf(lo.x + i * cell, lo.y + j * cell, lo.z + k * cell);
var V = new Int32Array(nx * ny * nz).fill(-1), pos = [], idx = [];
var at = function (i, j, k) { return F[i + nx * (j + ny * k)]; };
for (var k2 = 0; k2 < nz - 1; k2++)
for (var j2 = 0; j2 < ny - 1; j2++)
for (var i2 = 0; i2 < nx - 1; i2++) {
var c = [], inside = 0;
for (var q = 0; q < 8; q++) {
var v = at(i2 + (q & 1), j2 + ((q >> 1) & 1), k2 + ((q >> 2) & 1));
c.push(v);
if (v < 0)
inside++;
}
if (inside === 0 || inside === 8)
continue;
var sx = 0, sy = 0, sz = 0, n = 0;
for (var e = 0; e < 8; e++)
for (var b = 0; b < 3; b++) {
var f = e ^ (1 << b);
if (f < e)
continue;
var a0 = c[e], a1 = c[f];
if ((a0 < 0) === (a1 < 0))
continue;
var t = a0 / (a0 - a1);
sx += ((e & 1) + ((f & 1) - (e & 1)) * t);
sy += (((e >> 1) & 1) + (((f >> 1) & 1) - ((e >> 1) & 1)) * t);
sz += (((e >> 2) & 1) + (((f >> 2) & 1) - ((e >> 2) & 1)) * t);
n++;
}
V[i2 + nx * (j2 + ny * k2)] = pos.length / 3;
pos.push(lo.x + (i2 + sx / n) * cell, lo.y + (j2 + sy / n) * cell, lo.z + (k2 + sz / n) * cell);
}
var cid = function (i, j, k) { return V[i + nx * (j + ny * k)]; };
for (var k3 = 1; k3 < nz - 1; k3++)
for (var j3 = 1; j3 < ny - 1; j3++)
for (var i3 = 1; i3 < nx - 1; i3++) {
var v0 = at(i3, j3, k3) < 0;
if (i3 < nx - 1 && (at(i3 + 1, j3, k3) < 0) !== v0) {
var A = cid(i3, j3 - 1, k3 - 1), B = cid(i3, j3, k3 - 1), C = cid(i3, j3, k3), D = cid(i3, j3 - 1, k3);
if (A >= 0 && B >= 0 && C >= 0 && D >= 0) {
if (v0)
idx.push(A, B, C, A, C, D);
else
idx.push(A, C, B, A, D, C);
}
}
if (j3 < ny - 1 && (at(i3, j3 + 1, k3) < 0) !== v0) {
var A2 = cid(i3 - 1, j3, k3 - 1), B2 = cid(i3, j3, k3 - 1), C2 = cid(i3, j3, k3), D2 = cid(i3 - 1, j3, k3);
if (A2 >= 0 && B2 >= 0 && C2 >= 0 && D2 >= 0) {
if (v0)
idx.push(A2, C2, B2, A2, D2, C2);
else
idx.push(A2, B2, C2, A2, C2, D2);
}
}
if (k3 < nz - 1 && (at(i3, j3, k3 + 1) < 0) !== v0) {
var A3 = cid(i3 - 1, j3 - 1, k3), B3 = cid(i3, j3 - 1, k3), C3 = cid(i3, j3, k3), D3 = cid(i3 - 1, j3, k3);
if (A3 >= 0 && B3 >= 0 && C3 >= 0 && D3 >= 0) {
if (v0)
idx.push(A3, B3, C3, A3, C3, D3);
else
idx.push(A3, C3, B3, A3, D3, C3);
}
}
}
var N = pos.length / 3, nor = new Float32Array(pos.length), col = new Float32Array(pos.length), h = cell * 0.5, cc = new THREE.Color();
for (var vi = 0; vi < N; vi++) {
var x = pos[vi * 3], y = pos[vi * 3 + 1], z = pos[vi * 3 + 2];
var gx = sdf(x + h, y, z) - sdf(x - h, y, z), gy = sdf(x, y + h, z) - sdf(x, y - h, z), gz = sdf(x, y, z + h) - sdf(x, y, z - h), gl = Math.hypot(gx, gy, gz) || 1;
nor[vi * 3] = gx / gl;
nor[vi * 3 + 1] = gy / gl;
nor[vi * 3 + 2] = gz / gl;
var wr = 0, wg = 0, wb = 0, ws = 0;
p.set(x, y, z);
prims.forEach(function (P) { if (P.cut)
return; var d = Math.max(-0.01, rbkSd(P, p, tmp)), w = Math.exp(-d * 220); cc.setHex(P.col); wr += cc.r * w; wg += cc.g * w; wb += cc.b * w; ws += w; });
var m = 0.9 + 0.2 * (Math.sin(x * 917 + y * 313) * Math.sin(z * 733 - y * 271) * 0.5 + 0.5);
col[vi * 3] = wr / ws * m;
col[vi * 3 + 1] = wg / ws * m;
col[vi * 3 + 2] = wb / ws * m;
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.setIndex(N > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
G.computeBoundingSphere();
G.userData.rbkShared = 1;
return G;
},
function (iris, pupil) {
var key = iris + ":" + pupil;
if (RBK.eye[key])
return RBK.eye[key];
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#2A2018";
x.fillRect(0, 0, 128, 128);
var ic = new THREE.Color(iris), hx = "#" + ic.getHexString(), dk = "#" + ic.clone().multiplyScalar(0.45).getHexString();
var g = x.createRadialGradient(64, 64, 8, 64, 64, 60);
g.addColorStop(0, hx);
g.addColorStop(0.8, hx);
g.addColorStop(1, dk);
x.fillStyle = g;
x.beginPath();
x.arc(64, 64, 60, 0, 7);
x.fill();
x.strokeStyle = "rgba(0,0,0,0.25)";
x.lineWidth = 1.5;
for (var i = 0; i < 40; i++) {
var a = i / 40 * Math.PI * 2;
x.beginPath();
x.moveTo(64 + Math.cos(a) * 18, 64 + Math.sin(a) * 18);
x.lineTo(64 + Math.cos(a) * 58, 64 + Math.sin(a) * 58);
x.stroke();
}
x.fillStyle = "#050404";
x.beginPath();
if (pupil === "slit")
x.ellipse(64, 64, 7, 46, 0, 0, 7);
else if (pupil === "bar")
x.ellipse(64, 64, 40, 9, 0, 0, 7);
else
x.arc(64, 64, pupil === "big" ? 34 : 22, 0, 7);
x.fill();
var t = new THREE.CanvasTexture(c);
var m = new THREE.MeshPhysicalMaterial ? new THREE.MeshPhysicalMaterial({ map: t, roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04 }) : new THREE.MeshStandardMaterial({ map: t, roughness: 0.08 });
return (RBK.eye[key] = m);
},
function (G, p, r, dir, iris, pupil) {
if (!RBK.eyeGeo) {
var eg = new THREE.SphereGeometry(1, 20, 14), P = eg.attributes.position, U = eg.attributes.uv;
for (var i = 0; i < P.count; i++)
U.setXY(i, P.getX(i) * 0.5 + 0.5, P.getY(i) * 0.5 + 0.5);
RBK.eyeGeo = eg;
}
var e = new THREE.Mesh(RBK.eyeGeo, rbkEyeMat(iris, pupil));
e.position.set(p[0], p[1], p[2]);
e.scale.setScalar(r);
e.lookAt(e.position.clone().add(new THREE.Vector3(dir[0], dir[1], dir[2])));
e.raycast = function () { };
G.add(e);
return e;
},
function (key, prims, kind, eyes, more) {
var G = new THREE.Group();
if (key !== "eagle" && key !== "sitcat")
prims = prims.concat(rbkPath([[0, -0.06, -0.02], [0, -0.21, -0.03]], 0.064, 0.076, prims[0].col));
var geo = RBK.geo[key] || (RBK.geo[key] = rbkBuild(prims));
var m = new THREE.Mesh(geo, rbkSkin(kind));
m.castShadow = true;
m.raycast = function () { };
G.add(m);
(eyes || []).forEach(function (e) { rbkEye(G, e.p, e.r, e.d, e.iris, e.pupil); });
if (more)
more(G);
G.userData.dgxBrow = 0.065;
G.userData.rbkHead = key;
return G;
},
function () {
var cap = 0x3A2C20, br = 0x6A4E36, cr = 0xEDE2CC, dk = 0x1E1812, yl = 0xE0B830;
return rbkHead("falcon", [{ t: "e", c: [0, 0.025, -0.01], r: [0.085, 0.075, 0.115], col: cap }, { t: "e", c: [0, -0.035, 0.03], r: [0.074, 0.062, 0.08], col: cr },
{ t: "e", c: [0, -0.005, -0.06], r: [0.08, 0.08, 0.07], col: br }].concat(rbkMirror([{ t: "e", c: [0.058, -0.03, 0.062], r: [0.013, 0.042, 0.018], rot: [0.25, 0, 0], col: dk, k: 0.006 },
{ t: "e", c: [0.042, 0.048, 0.072], r: [0.032, 0.011, 0.03], rot: [0, 0.35, 0], col: cap, k: 0.01 },
{ t: "e", c: [0.05, 0.022, 0.074], r: [0.024, 0.024, 0.012], rot: [0, 0.75, 0], col: yl, k: 0.004 }]), [{ t: "e", c: [0, 0.014, 0.102], r: [0.022, 0.016, 0.02], col: yl, k: 0.008 }], rbkPath([[0, 0.012, 0.108], [0, 0.002, 0.134], [0, -0.016, 0.152], [0, -0.04, 0.15]], 0.022, 0.004, 0x24242A), rbkPath([[0, -0.012, 0.1], [0, -0.022, 0.128]], 0.014, 0.005, 0x34343A)), "fur", [{ p: [0.054, 0.022, 0.079], r: 0.019, d: [0.72, 0.02, 0.7], iris: 0x140C06, pupil: "big" }, { p: [-0.054, 0.022, 0.079], r: 0.019, d: [-0.72, 0.02, 0.7], iris: 0x140C06, pupil: "big" }]);
},
function () {
var b = 0x1A1A1E;
return rbkHead("ibis", [{ t: "e", c: [0, 0.01, 0], r: [0.085, 0.09, 0.1], col: b }, { t: "e", c: [0, -0.01, 0.06], r: [0.05, 0.05, 0.05], col: 0x2A2226 }].concat(rbkPath([[0, -0.005, 0.08], [0, -0.03, 0.17], [0, -0.09, 0.25], [0, -0.17, 0.3], [0, -0.24, 0.31]], 0.022, 0.005, 0x1E1E22)), "skin", [{ p: [0.05, 0.025, 0.07], r: 0.016, d: [0.7, 0.05, 0.7], iris: 0x7A2A1A, pupil: "round" }, { p: [-0.05, 0.025, 0.07], r: 0.016, d: [-0.7, 0.05, 0.7], iris: 0x7A2A1A, pupil: "round" }]);
},
function () {
var k = 0x141416;
return rbkHead("jackal", [{ t: "e", c: [0, 0.02, -0.01], r: [0.09, 0.09, 0.105], col: k }, { t: "e", c: [0, 0.04, 0.06], r: [0.06, 0.03, 0.05], col: k }].concat(rbkPath([[0, -0.005, 0.05], [0, -0.025, 0.15], [0, -0.04, 0.225]], 0.05, 0.02, k), [{ t: "e", c: [0, -0.032, 0.236], r: [0.017, 0.012, 0.012], col: 0x050505, k: 0.006 }, { t: "e", c: [0, -0.06, 0.12], r: [0.035, 0.02, 0.07], col: k }], rbkMirror([{ t: "e", c: [0.055, 0.15, -0.025], r: [0.036, 0.085, 0.012], rot: [0, -0.35, -0.18], col: k, k: 0.012 }])), "fur", [{ p: [0.045, 0.04, 0.075], r: 0.016, d: [0.55, 0.1, 0.85], iris: 0xC8901A, pupil: "round" }, { p: [-0.045, 0.04, 0.075], r: 0.016, d: [-0.55, 0.1, 0.85], iris: 0xC8901A, pupil: "round" }]);
},
function () {
var f = 0xC08C48, mz = 0xE2C08C, wh = 0xF0E2C6, nose = 0x6A3424, dk = 0x2A1A12, ruff = 0xA8743A;
return rbkHead("lion", [{ t: "e", c: [0, 0.03, -0.015], r: [0.1, 0.082, 0.112], col: f }, { t: "e", c: [0, 0.052, 0.066], r: [0.078, 0.024, 0.036], col: f },
{ t: "e", c: [0, -0.012, 0.105], r: [0.058, 0.044, 0.058], col: f }, { t: "e", c: [0, -0.07, 0.098], r: [0.04, 0.022, 0.045], col: wh },
{ t: "e", c: [0, 0.0, 0.178], r: [0.026, 0.016, 0.012], rot: [-0.3, 0, 0], col: nose, k: 0.008 }, { t: "e", c: [0, -0.03, -0.04], r: [0.122, 0.115, 0.095], col: ruff, k: 0.035 }].concat(rbkPath([[0, 0.042, 0.085], [0, 0.02, 0.16]], 0.034, 0.03, f), rbkPath([[0, -0.013, 0.176], [0, -0.032, 0.166]], 0.004, 0.004, dk), rbkMirror([{ t: "e", c: [0.03, -0.028, 0.14], r: [0.036, 0.032, 0.036], col: mz }, { t: "e", c: [0.068, -0.012, 0.055], r: [0.038, 0.052, 0.05], col: f },
{ t: "e", c: [0.043, 0.01, 0.102], r: [0.02, 0.008, 0.012], col: wh, k: 0.006 }, { t: "e", c: [0.075, 0.082, -0.035], r: [0.026, 0.028, 0.01], rot: [0, 0.3, -0.5], col: f, k: 0.012 }])), "fur", [{ p: [0.042, 0.03, 0.098], r: 0.0145, d: [0.35, 0.05, 0.94], iris: 0xD8961E, pupil: "round" }, { p: [-0.042, 0.03, 0.098], r: 0.0145, d: [-0.35, 0.05, 0.94], iris: 0xD8961E, pupil: "round" }]);
},
function () {
var c = 0x1A1A1E;
return rbkHead("cat", [{ t: "e", c: [0, 0.01, 0], r: [0.092, 0.085, 0.088], col: c }, { t: "e", c: [0, -0.03, 0.07], r: [0.045, 0.035, 0.04], col: c }, { t: "e", c: [0, -0.012, 0.105], r: [0.012, 0.008, 0.008], col: 0x3A2A2A, k: 0.005 }].concat(rbkMirror([{ t: "e", c: [0.05, 0.1, -0.005], r: [0.032, 0.058, 0.012], rot: [0, -0.25, -0.3], col: c, k: 0.012 }, { t: "e", c: [0.03, -0.035, 0.08], r: [0.03, 0.025, 0.03], col: c }])), "fur", [{ p: [0.038, 0.018, 0.078], r: 0.018, d: [0.45, 0.05, 0.9], iris: 0x7AB040, pupil: "slit" }, { p: [-0.038, 0.018, 0.078], r: 0.018, d: [-0.45, 0.05, 0.9], iris: 0x7AB040, pupil: "slit" }]);
},
function () {
var g = 0x4A5A32;
return rbkHead("croc", [{ t: "e", c: [0, 0.02, -0.02], r: [0.088, 0.075, 0.1], col: g }, { t: "e", c: [0, -0.012, 0.17], r: [0.055, 0.032, 0.16], col: g }, { t: "e", c: [0, -0.035, 0.15], r: [0.05, 0.02, 0.15], col: 0x6A7044 },
{ t: "e", c: [0, 0.012, 0.31], r: [0.026, 0.016, 0.022], col: g }].concat(rbkMirror([{ t: "e", c: [0.04, 0.058, 0.03], r: [0.026, 0.022, 0.028], col: g }])), "scales", [{ p: [0.04, 0.068, 0.045], r: 0.014, d: [0.5, 0.4, 0.75], iris: 0xC8A020, pupil: "slit" }, { p: [-0.04, 0.068, 0.045], r: 0.014, d: [-0.5, 0.4, 0.75], iris: 0xC8A020, pupil: "slit" }]);
},
function () {
var h = 0x7A6A6A;
return rbkHead("hippo", [{ t: "e", c: [0, 0, 0], r: [0.12, 0.11, 0.12], col: h }, { t: "e", c: [0, -0.045, 0.11], r: [0.115, 0.075, 0.09], col: 0x8A7672 }].concat(rbkMirror([{ t: "e", c: [0.04, 0.0, 0.18], r: [0.028, 0.022, 0.022], col: h }, { t: "e", c: [0.07, 0.1, -0.03], r: [0.02, 0.026, 0.012], col: h }, { t: "e", c: [0.058, 0.06, 0.06], r: [0.03, 0.026, 0.03], col: h }])), "skin", [{ p: [0.058, 0.072, 0.078], r: 0.014, d: [0.5, 0.3, 0.8], iris: 0x3A2A1A, pupil: "round" }, { p: [-0.058, 0.072, 0.078], r: 0.014, d: [-0.5, 0.3, 0.8], iris: 0x3A2A1A, pupil: "round" }]);
},
function () {
var r = 0x8A3A2A;
return rbkHead("setanimal", [{ t: "e", c: [0, 0.01, 0], r: [0.085, 0.09, 0.1], col: r }].concat(rbkPath([[0, 0, 0.06], [0, -0.03, 0.15], [0, -0.075, 0.21]], 0.038, 0.016, r), rbkMirror([{ t: "e", c: [0.04, 0.15, -0.03], r: [0.02, 0.08, 0.01], col: r, k: 0.01 }, { t: "e", c: [0.04, 0.225, -0.03], r: [0.03, 0.012, 0.012], col: r, k: 0.01 }])), "fur", [{ p: [0.045, 0.035, 0.075], r: 0.015, d: [0.5, 0.1, 0.85], iris: 0xB06A1A, pupil: "round" }, { p: [-0.045, 0.035, 0.075], r: 0.015, d: [-0.5, 0.1, 0.85], iris: 0xB06A1A, pupil: "round" }]);
},
function () {
var f = 0x3A2218, mz = 0x4A3020, iv = 0xE2D6BC;
return rbkHead("bull", [{ t: "e", c: [0, 0.02, -0.01], r: [0.125, 0.125, 0.135], col: f }, { t: "e", c: [0, -0.05, 0.11], r: [0.095, 0.08, 0.09], col: mz }, { t: "e", c: [0, -0.065, 0.19], r: [0.068, 0.045, 0.03], col: 0x2A1A16, k: 0.012 },
{ t: "e", c: [0, 0.12, 0.03], r: [0.065, 0.03, 0.045], col: f }].concat(rbkMirror(rbkPath([[0.1, 0.09, 0], [0.2, 0.11, 0.02], [0.27, 0.18, 0.05], [0.27, 0.28, 0.07]], 0.034, 0.008, iv)), rbkMirror([{ t: "e", c: [0.14, 0.04, -0.02], r: [0.055, 0.022, 0.032], rot: [0, 0, -0.35], col: f }])), "fur", [{ p: [0.075, 0.045, 0.088], r: 0.018, d: [0.7, 0.05, 0.7], iris: 0x2A1610, pupil: "bar" }, { p: [-0.075, 0.045, 0.088], r: 0.018, d: [-0.7, 0.05, 0.7], iris: 0x2A1610, pupil: "bar" }]);
},
function () {
var f = 0x1C1A1A, h = 0x2E2A24;
return rbkHead("goat", [{ t: "e", c: [0, 0.03, -0.01], r: [0.09, 0.1, 0.1], col: f }].concat(rbkPath([[0, 0, 0.05], [0, -0.045, 0.14], [0, -0.075, 0.2]], 0.055, 0.032, f), [{ t: "e", c: [0, -0.075, 0.22], r: [0.025, 0.015, 0.015], col: 0x0A0808, k: 0.008 }], rbkPath([[0, -0.1, 0.15], [0, -0.19, 0.15], [0, -0.27, 0.12]], 0.03, 0.004, f), rbkMirror(rbkPath([[0.045, 0.11, 0.03], [0.07, 0.21, -0.05], [0.1, 0.23, -0.16], [0.12, 0.16, -0.23]], 0.03, 0.006, h)), rbkMirror([{ t: "e", c: [0.12, 0.03, -0.01], r: [0.07, 0.02, 0.032], rot: [0, 0, -0.3], col: f }])), "fur", [{ p: [0.058, 0.06, 0.072], r: 0.017, d: [0.7, 0.1, 0.7], iris: 0xD8A020, pupil: "bar" }, { p: [-0.058, 0.06, 0.072], r: 0.017, d: [-0.7, 0.1, 0.7], iris: 0xD8A020, pupil: "bar" }]);
},
function () {
var f = 0x9A6A34, sk = 0xC89A7A;
return rbkHead("monkey", [{ t: "e", c: [0, 0.02, -0.012], r: [0.105, 0.11, 0.105], col: f }, { t: "e", c: [0, -0.005, 0.055], r: [0.072, 0.082, 0.058], col: sk }, { t: "e", c: [0, 0.048, 0.088], r: [0.068, 0.018, 0.026], col: f, k: 0.012 },
{ t: "e", c: [0, -0.05, 0.095], r: [0.052, 0.04, 0.045], col: sk }, { t: "e", c: [0, -0.088, 0.07], r: [0.035, 0.02, 0.03], col: sk }].concat(rbkMirror([{ t: "e", c: [0.108, 0.01, 0], r: [0.014, 0.034, 0.03], col: sk }, { t: "e", c: [0.075, -0.04, 0.04], r: [0.04, 0.05, 0.04], col: f }])), "fur", [{ p: [0.032, 0.02, 0.1], r: 0.015, d: [0.3, 0.05, 0.95], iris: 0x6A4418, pupil: "round" }, { p: [-0.032, 0.02, 0.1], r: 0.015, d: [-0.3, 0.05, 0.95], iris: 0x6A4418, pupil: "round" }]);
},
function () {
var g = 0x8A8684, iv = 0xF0EAD8;
return rbkHead("elephant", [{ t: "e", c: [0, 0.04, 0], r: [0.145, 0.145, 0.135], col: g }, { t: "e", c: [0.06, 0.12, 0.04], r: [0.07, 0.06, 0.07], col: g }, { t: "e", c: [-0.06, 0.12, 0.04], r: [0.07, 0.06, 0.07], col: g }].concat(rbkPath([[0, 0, 0.12], [0, -0.12, 0.17], [0, -0.26, 0.17], [0.03, -0.38, 0.13], [0.08, -0.44, 0.16]], 0.056, 0.02, g), rbkMirror([{ t: "e", c: [0.19, 0, -0.04], r: [0.018, 0.15, 0.125], rot: [0, 0.45, 0], col: 0x948C8A, k: 0.03 }]), rbkPath([[-0.055, -0.06, 0.115], [-0.068, -0.12, 0.19], [-0.05, -0.15, 0.255]], 0.019, 0.006, iv), rbkPath([[0.055, -0.06, 0.115], [0.066, -0.1, 0.16]], 0.019, 0.015, iv)), "skin", [{ p: [0.075, 0.04, 0.11], r: 0.014, d: [0.75, 0.05, 0.65], iris: 0x3A2414, pupil: "round" }, { p: [-0.075, 0.04, 0.11], r: 0.014, d: [-0.75, 0.05, 0.65], iris: 0x3A2414, pupil: "round" }]);
},
function () {
var c = 0x141418;
return rbkHead("fly", [{ t: "e", c: [0, 0, 0], r: [0.09, 0.085, 0.07], col: c }, { t: "e", c: [0, -0.06, 0.05], r: [0.035, 0.04, 0.03], col: c }].concat(rbkPath([[0, -0.08, 0.06], [0, -0.14, 0.09], [0, -0.18, 0.08]], 0.022, 0.014, 0x2A1A10), rbkMirror(rbkPath([[0.02, 0.06, 0.06], [0.04, 0.13, 0.1], [0.08, 0.17, 0.1]], 0.008, 0.003, c))), "horn", [], function (G) {
var m = RBK.mat.flyeye || (RBK.mat.flyeye = new THREE.MeshPhysicalMaterial({ color: 0x8A1810, roughness: 0.15, clearcoat: 1, flatShading: true }));
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(RBK.ico || (RBK.ico = new THREE.IcosahedronGeometry(1, 3)), m); e.position.set(sd * 0.075, 0.015, 0.04); e.scale.set(0.068, 0.085, 0.07); e.raycast = function () { }; G.add(e); });
});
},
function () {
var dk = 0x3E2A1A, br = 0x5A3C22, gd = 0xA8742E, yl = 0xD8A830;
var prims = [{ t: "e", c: [0, 0.15, 0], r: [0.068, 0.11, 0.075], rot: [-0.25, 0, 0], col: br }, { t: "e", c: [0, 0.13, 0.035], r: [0.058, 0.085, 0.045], rot: [-0.2, 0, 0], col: dk },
{ t: "e", c: [0, 0.27, 0.045], r: [0.045, 0.046, 0.052], col: gd }, { t: "e", c: [0, 0.235, 0.04], r: [0.04, 0.04, 0.04], col: gd },
{ t: "e", c: [0, 0.285, 0.075], r: [0.03, 0.012, 0.022], col: gd, k: 0.01 }]
.concat(rbkPath([[0, 0.268, 0.09], [0, 0.262, 0.115], [0, 0.246, 0.128], [0, 0.226, 0.118]], 0.017, 0.004, 0x2A2A2C))
.concat([{ t: "e", c: [0, 0.272, 0.09], r: [0.02, 0.014, 0.014], col: yl, k: 0.006 }])
.concat(rbkMirror([{ t: "e", c: [0.06, 0.15, -0.03], r: [0.028, 0.12, 0.085], rot: [-0.35, 0, 0.05], col: dk, k: 0.015 }, { t: "e", c: [0.024, 0.03, 0.02], r: [0.024, 0.04, 0.024], col: br }]))
.concat([{ t: "e", c: [0, 0.03, -0.11], r: [0.045, 0.014, 0.1], rot: [0.6, 0, 0], col: dk, k: 0.02 }])
.concat(rbkMirror(rbkPath([[0.025, 0.0, 0.03], [0.03, -0.012, 0.06]], 0.007, 0.004, yl).concat(rbkPath([[0.02, -0.005, 0.025], [0.005, -0.012, 0.055]], 0.006, 0.003, yl))));
return rbkHead("eagle", prims, "fur", [{ p: [0.032, 0.278, 0.078], r: 0.011, d: [0.75, 0, 0.65], iris: 0xC88A20, pupil: "round" }, { p: [-0.032, 0.278, 0.078], r: 0.011, d: [-0.75, 0, 0.65], iris: 0xC88A20, pupil: "round" }]);
},
function () {
var c = 0x1C1C20, prims = [{ t: "e", c: [0, 0.12, 0], r: [0.06, 0.1, 0.07], rot: [-0.2, 0, 0], col: c }, { t: "e", c: [0, 0.27, 0.04], r: [0.045, 0.04, 0.042], col: c },
{ t: "e", c: [0, 0.255, 0.075], r: [0.022, 0.018, 0.02], col: 0x2A2A2E }].concat(rbkMirror([{ t: "e", c: [0.045, 0.06, -0.04], r: [0.04, 0.06, 0.07], col: c }, { t: "e", c: [0.025, 0.008, 0.065], r: [0.017, 0.01, 0.022], col: c },
{ t: "e", c: [0.026, 0.315, 0.03], r: [0.016, 0.03, 0.007], rot: [0, 0.3, -0.3], col: c, k: 0.01 }]), rbkMirror(rbkPath([[0.025, 0.12, 0.04], [0.025, 0.01, 0.055]], 0.016, 0.013, c)), rbkPath([[0, 0.18, 0.01], [0, 0.24, 0.03]], 0.04, 0.035, c), rbkPath([[0, 0.03, -0.09], [0.05, 0.012, -0.05], [0.065, 0.006, 0.03]], 0.012, 0.009, c));
var G = rbkHead("sitcat", prims, "fur", [{ p: [0.018, 0.279, 0.074], r: 0.009, d: [0.3, 0, 0.95], iris: 0x8AB830, pupil: "slit" }, { p: [-0.018, 0.279, 0.074], r: 0.009, d: [-0.3, 0, 0.95], iris: 0x8AB830, pupil: "slit" }]);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.007, 0.0018, 6, 14), new THREE.MeshStandardMaterial({ color: 0xD8B040, metalness: 0.9, roughness: 0.3 }));
ring.position.set(0.03, 0.3, 0.035);
G.add(ring);
G.userData.dgxBrow = null;
G.scale.setScalar(1.25);
return G;
},
function () {
var g = new THREE.Group(), up = new THREE.Group();
g.add(up);
var gold = RBK.mat.gold || (RBK.mat.gold = new THREE.MeshStandardMaterial({ color: 0xD0A040, metalness: 0.85, roughness: 0.32 }));
var cord = RBK.mat.cord || (RBK.mat.cord = new THREE.MeshStandardMaterial({ color: 0x8A6A30, metalness: 0.4, roughness: 0.6 }));
function M(geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.raycast = function () { }; up.add(m); return m; }
var ring = M(new THREE.TorusGeometry(0.022, 0.005, 6, 16), gold, 0, 0, 0);
M(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 8), gold, 0, -0.045, 0);
var beam = M(new THREE.CylinderGeometry(0.007, 0.007, 0.36, 8), gold, 0, -0.075, 0);
beam.rotation.z = Math.PI / 2;
[-0.18, 0.18].forEach(function (x) {
M(new THREE.SphereGeometry(0.011, 8, 6), gold, x, -0.075, 0);
[[0.04, 0], [-0.02, 0.035], [-0.02, -0.035]].forEach(function (o) { var c = M(new THREE.CylinderGeometry(0.0015, 0.0015, 0.16, 4), cord, x + o[0] / 2, -0.155, o[1] / 2); c.rotation.z = -o[0] * 1.5; c.rotation.x = o[1] * 1.5; });
var pan = M(new THREE.SphereGeometry(0.055, 16, 8, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), gold, x, -0.19, 0);
});
M(new THREE.SphereGeometry(0.018, 10, 8), new THREE.MeshStandardMaterial({ color: 0x8A1A1A, roughness: 0.5 }), -0.18, -0.225, 0);
var fe = M(new THREE.ConeGeometry(0.012, 0.07, 6), new THREE.MeshStandardMaterial({ color: 0xF2EEE0, roughness: 0.8 }), 0.18, -0.2, 0);
var q = new THREE.Quaternion();
ring.onBeforeRender = function () { if (!g.parent)
return; g.parent.getWorldQuaternion(q); var e = new THREE.Euler().setFromQuaternion(q, "YXZ"); q.setFromEuler(new THREE.Euler(0, e.y, 0, "YXZ")).premultiply(g.getWorldQuaternion(new THREE.Quaternion()).invert()); up.quaternion.copy(q); };
return g;
},
function (x) {
x.lineWidth = 14;
x.beginPath();
x.moveTo(128, 40);
x.lineTo(128, 236);
x.moveTo(72, 40);
x.quadraticCurveTo(72, 120, 128, 120);
x.quadraticCurveTo(184, 120, 184, 40);
x.stroke();
[[72, 22], [128, 20], [184, 22]].forEach(function (p) { x.beginPath(); x.moveTo(p[0] - 14, p[1] + 26); x.lineTo(p[0], p[1]); x.lineTo(p[0] + 14, p[1] + 26); x.fill(); });
},
function (x) {
x.beginPath();
x.moveTo(128, 20);
x.bezierCurveTo(170, 80, 206, 120, 190, 170);
x.bezierCurveTo(178, 214, 150, 232, 128, 232);
x.bezierCurveTo(100, 232, 70, 212, 66, 172);
x.bezierCurveTo(62, 130, 100, 110, 104, 70);
x.bezierCurveTo(118, 96, 126, 110, 128, 20);
x.fill();
x.globalCompositeOperation = "destination-out";
x.beginPath();
x.moveTo(128, 120);
x.bezierCurveTo(150, 150, 160, 176, 150, 198);
x.bezierCurveTo(140, 214, 116, 214, 106, 198);
x.bezierCurveTo(98, 180, 116, 160, 128, 120);
x.fill();
x.globalCompositeOperation = "source-over";
},
function (x) {
x.lineWidth = 11;
x.beginPath();
x.moveTo(40, 112);
x.quadraticCurveTo(128, 40, 216, 112);
x.quadraticCurveTo(128, 160, 40, 112);
x.stroke();
x.beginPath();
x.arc(126, 108, 22, 0, 7);
x.fill();
x.beginPath();
x.moveTo(40, 70);
x.quadraticCurveTo(128, 30, 214, 72);
x.stroke();
x.beginPath();
x.moveTo(108, 140);
x.lineTo(96, 214);
x.moveTo(150, 138);
x.quadraticCurveTo(170, 200, 206, 196);
x.quadraticCurveTo(222, 186, 208, 172);
x.stroke();
},
function (x) {
x.beginPath();
x.moveTo(128, 18);
x.bezierCurveTo(196, 70, 190, 170, 136, 214);
x.lineTo(120, 214);
x.bezierCurveTo(66, 170, 60, 70, 128, 18);
x.fill();
x.lineWidth = 8;
x.beginPath();
x.moveTo(128, 40);
x.lineTo(128, 240);
x.stroke();
x.globalCompositeOperation = "destination-out";
x.lineWidth = 4;
for (var i = 0; i < 9; i++) {
x.beginPath();
x.moveTo(128, 60 + i * 16);
x.lineTo(84, 80 + i * 16);
x.moveTo(128, 60 + i * 16);
x.lineTo(172, 80 + i * 16);
x.stroke();
}
x.globalCompositeOperation = "source-over";
},
function (x) { x.beginPath(); x.ellipse(128, 148, 44, 60, 0, 0, 7); x.fill(); x.beginPath(); x.arc(128, 78, 24, 0, 7); x.fill(); x.beginPath(); x.arc(128, 46, 22, 0, 7); x.fill(); x.lineWidth = 10; [-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(128 + s * 40, 120); x.lineTo(128 + s * 86, 96); x.moveTo(128 + s * 42, 170); x.lineTo(128 + s * 88, 196); x.stroke(); }); },
function (x) { [[0, 0, 92], [-0.62, -20, 78], [0.62, 20, 78], [-1.15, -34, 62], [1.15, 34, 62]].forEach(function (p) { x.save(); x.translate(128, 200); x.rotate(p[0]); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(-34, -30, -26, -p[2] - 40, 0, -p[2] - 60); x.bezierCurveTo(26, -p[2] - 40, 34, -30, 0, 0); x.fill(); x.restore(); }); x.fillRect(60, 204, 136, 10); },
function (x) {
x.beginPath();
x.arc(128, 128, 96, 0, 7);
x.lineWidth = 8;
x.stroke();
x.beginPath();
x.arc(128, 128, 96, -Math.PI / 2, Math.PI / 2);
x.arc(128, 176, 48, Math.PI / 2, -Math.PI / 2, true);
x.arc(128, 80, 48, Math.PI / 2, -Math.PI / 2);
x.fill();
x.beginPath();
x.arc(128, 80, 14, 0, 7);
x.fill();
x.globalCompositeOperation = "destination-out";
x.beginPath();
x.arc(128, 176, 14, 0, 7);
x.fill();
x.globalCompositeOperation = "source-over";
},
function (x) { x.lineWidth = 10; for (var i = 0; i < 3; i++) {
var cx = 128 + Math.cos(i / 3 * Math.PI * 2 - Math.PI / 2) * 30, cy = 136 + Math.sin(i / 3 * Math.PI * 2 - Math.PI / 2) * 30;
x.beginPath();
for (var j = 0; j < 3; j++) {
var a = j / 3 * Math.PI * 2 - Math.PI / 2 + Math.PI;
var px = cx + Math.cos(a) * 74, py = cy + Math.sin(a) * 74;
if (j)
x.lineTo(px, py);
else
x.moveTo(px, py);
}
x.closePath();
x.stroke();
} },
function (x) { x.beginPath(); x.moveTo(128, 80); x.bezierCurveTo(60, 40, 30, 140, 74, 196); x.bezierCurveTo(100, 230, 118, 214, 128, 206); x.bezierCurveTo(138, 214, 156, 230, 182, 196); x.bezierCurveTo(226, 140, 196, 40, 128, 80); x.fill(); x.lineWidth = 8; x.beginPath(); x.moveTo(128, 80); x.lineTo(136, 36); x.stroke(); x.beginPath(); x.ellipse(160, 46, 22, 10, -0.4, 0, 7); x.fill(); },
function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(82, 220); x.quadraticCurveTo(40, 120, 74, 40); x.moveTo(174, 220); x.quadraticCurveTo(216, 120, 182, 40); x.moveTo(70, 74); x.lineTo(186, 74); x.stroke(); x.fillRect(70, 206, 116, 22); x.lineWidth = 4; for (var i = 0; i < 5; i++) {
x.beginPath();
x.moveTo(100 + i * 14, 74);
x.lineTo(100 + i * 14, 208);
x.stroke();
} },
function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(70, 30); x.quadraticCurveTo(220, 128, 70, 226); x.stroke(); x.lineWidth = 4; x.beginPath(); x.moveTo(70, 30); x.lineTo(70, 226); x.stroke(); x.lineWidth = 8; x.beginPath(); x.moveTo(40, 128); x.lineTo(216, 128); x.stroke(); x.beginPath(); x.moveTo(230, 128); x.lineTo(200, 112); x.lineTo(200, 144); x.fill(); },
function (x) { x.lineWidth = 8; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 30); x.stroke(); for (var i = 0; i < 6; i++) {
[-1, 1].forEach(function (s) { x.save(); x.translate(128 + s * 6, 50 + i * 24); x.rotate(s * 0.5); x.beginPath(); x.ellipse(0, 0, 10, 20, 0, 0, 7); x.fill(); x.restore(); });
} x.beginPath(); x.ellipse(128, 24, 8, 18, 0, 0, 7); x.fill(); },
function (x) { x.lineWidth = 8; x.beginPath(); x.moveTo(60, 226); x.quadraticCurveTo(120, 140, 190, 30); x.stroke(); for (var i = 0; i < 6; i++) {
var t = i / 6, px = 60 + t * 120, py = 226 - t * 190;
[-1, 1].forEach(function (s) { x.save(); x.translate(px + s * 14, py); x.rotate(0.6 * s + 0.5); x.beginPath(); x.ellipse(0, 0, 8, 24, 0, 0, 7); x.fill(); x.restore(); });
} },
function (x) {
x.lineWidth = 10;
x.beginPath();
x.moveTo(128, 30);
x.lineTo(128, 236);
x.stroke();
[-1, 1].forEach(function (s) {
x.beginPath();
for (var t = 0; t <= 1; t += 0.02) {
var y = 210 - t * 150, px = 128 + s * Math.sin(t * Math.PI * 3) * 40;
if (t)
x.lineTo(px, y);
else
x.moveTo(px, y);
}
x.stroke();
x.beginPath();
x.moveTo(128, 44);
x.quadraticCurveTo(128 + s * 60, 10, 128 + s * 96, 40);
x.quadraticCurveTo(128 + s * 60, 40, 128, 62);
x.fill();
});
x.beginPath();
x.arc(128, 28, 12, 0, 7);
x.fill();
},
function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(128, 24); x.lineTo(128, 236); x.stroke(); x.lineWidth = 12; x.beginPath(); for (var t = 0; t <= 1; t += 0.02) {
var y = 212 - t * 160, px = 128 + Math.sin(t * Math.PI * 3.5) * 38;
if (t)
x.lineTo(px, y);
else
x.moveTo(px, y);
} x.stroke(); x.beginPath(); x.ellipse(154, 48, 18, 12, 0.3, 0, 7); x.fill(); },
function (x) { x.lineWidth = 8; x.beginPath(); x.moveTo(128, 62); x.lineTo(128, 24); x.stroke(); x.beginPath(); x.ellipse(160, 44, 30, 14, -0.3, 0, 7); x.fill(); [[0, 0, 4], [1, 0, 3], [2, 0, 2], [3, 0, 1]].forEach(function (r, i) { for (var j = 0; j < r[2]; j++) {
x.beginPath();
x.arc(128 + (j - (r[2] - 1) / 2) * 36, 84 + i * 36, 17, 0, 7);
x.fill();
} }); x.beginPath(); x.arc(128, 226, 15, 0, 7); x.fill(); },
function (x) { for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + Math.PI / 4;
x.beginPath();
x.ellipse(128 + Math.cos(a) * 36, 96 + Math.sin(a) * 36, 38, 30, a, 0, 7);
x.fill();
} x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(128, 96, 14, 0, 7); x.fill(); x.globalCompositeOperation = "source-over"; x.lineWidth = 8; x.beginPath(); x.moveTo(128, 140); x.quadraticCurveTo(110, 190, 128, 236); x.stroke(); },
function (x) {
x.lineWidth = 10;
x.beginPath();
x.moveTo(128, 30);
x.lineTo(128, 226);
x.moveTo(80, 226);
x.lineTo(176, 226);
x.moveTo(44, 70);
x.lineTo(212, 70);
x.moveTo(60, 70);
x.lineTo(36, 150);
x.moveTo(60, 70);
x.lineTo(84, 150);
x.moveTo(196, 70);
x.lineTo(172, 150);
x.moveTo(196, 70);
x.lineTo(220, 150);
x.stroke();
[60, 196].forEach(function (cx) { x.beginPath(); x.arc(cx, 150, 30, 0, Math.PI); x.fill(); });
},
function (x) { x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 90, 0, 7); x.stroke(); for (var i = 0; i < 4; i++) {
x.save();
x.translate(128, 128);
x.rotate(i / 4 * Math.PI * 2);
x.beginPath();
x.moveTo(0, 0);
x.lineTo(-16, -80);
x.lineTo(0, -86);
x.lineTo(16, -80);
x.fill();
x.lineWidth = 5;
x.beginPath();
for (var t = 0; t <= 1; t += 0.05) {
x.lineTo(Math.sin(t * 12) * 8 + 46 * Math.cos(Math.PI / 4), -t * 80 * Math.cos(Math.PI / 4) - 0);
}
x.restore();
} },
function (x) { x.beginPath(); x.moveTo(70, 226); x.lineTo(84, 60); x.quadraticCurveTo(128, 20, 172, 60); x.lineTo(186, 226); x.closePath(); x.fill(); x.globalCompositeOperation = "destination-out"; x.lineWidth = 8; for (var i = 0; i < 4; i++) {
x.beginPath();
x.moveTo(78, 200 - i * 40);
x.quadraticCurveTo(128, 180 - i * 40, 178, 200 - i * 40);
x.stroke();
} x.globalCompositeOperation = "source-over"; },
function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(128, 30); x.lineTo(220, 128); x.lineTo(128, 226); x.lineTo(36, 128); x.closePath(); x.stroke(); x.beginPath(); x.moveTo(128, 128 - 44); x.lineTo(128, 128 + 44); x.moveTo(84, 128); x.lineTo(172, 128); x.stroke(); [[106, 106], [150, 106], [106, 150], [150, 150]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 8, 0, 7); x.fill(); }); },
function (x) { x.beginPath(); x.moveTo(128, 220); x.arc(128, 220, 170, -Math.PI * 0.8, -Math.PI * 0.2); x.closePath(); x.fill(); x.globalCompositeOperation = "destination-out"; x.lineWidth = 4; for (var i = 1; i < 8; i++) {
var a = -Math.PI * 0.8 + i / 8 * Math.PI * 0.6;
x.beginPath();
x.moveTo(128, 220);
x.lineTo(128 + Math.cos(a) * 170, 220 + Math.sin(a) * 170);
x.stroke();
} x.globalCompositeOperation = "source-over"; },
function (x) { x.lineWidth = 12; x.beginPath(); x.arc(128, 110, 70, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 110, 40, 0, 7); x.fill(); x.lineWidth = 8; x.beginPath(); x.moveTo(170, 60); x.bezierCurveTo(220, 40, 200, 10, 236, 14); x.moveTo(190, 90); x.bezierCurveTo(236, 80, 220, 50, 246, 52); x.stroke(); x.fillRect(118, 180, 20, 56); },
function (x) { x.beginPath(); x.arc(128, 104, 74, Math.PI * 0.8, Math.PI * 0.2); x.lineTo(166, 190); x.lineTo(90, 190); x.closePath(); x.fill(); x.fillRect(96, 186, 64, 36); x.globalCompositeOperation = "destination-out"; x.beginPath(); x.ellipse(98, 110, 20, 24, 0, 0, 7); x.ellipse(158, 110, 20, 24, 0, 0, 7); x.fill(); x.beginPath(); x.moveTo(128, 140); x.lineTo(116, 166); x.lineTo(140, 166); x.fill(); for (var i = 0; i < 4; i++)
x.fillRect(102 + i * 16, 196, 6, 26); x.globalCompositeOperation = "source-over"; },
function (x) { x.lineWidth = 10; x.beginPath(); x.arc(128, 118, 26, 0, 7); x.stroke(); [-1, 1].forEach(function (s) { for (var i = 0; i < 3; i++) {
x.beginPath();
x.moveTo(128 + s * 28, 106 + i * 14);
x.lineTo(128 + s * (110 - i * 12), 96 + i * 18);
x.lineTo(128 + s * (100 - i * 12), 114 + i * 18);
x.lineTo(128 + s * 28, 120 + i * 14);
x.fill();
} }); x.beginPath(); x.moveTo(108, 146); x.lineTo(148, 146); x.lineTo(160, 220); x.lineTo(96, 220); x.fill(); x.beginPath(); x.arc(128, 62, 22, 0, 7); x.fill(); x.fillRect(110, 80, 36, 14); },
function (kind) {
if (RBS.tex[kind])
return RBS.tex[kind];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
x.fillStyle = x.strokeStyle = "#FFFFFF";
x.lineCap = "round";
x.lineJoin = "round";
try {
RBS_DRAW[kind](x);
}
catch (e) { }
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
return (RBS.tex[kind] = t);
},
function (kind, col, glow) {
if (String(kind).indexOf("sym:") !== 0)
return rbsSS0.apply(this, arguments);
var k = kind.slice(4), key = k + ":" + col + ":" + (glow ? 1 : 0);
var m = RBS.mat[key] || (RBS.mat[key] = new THREE.MeshBasicMaterial({ map: rbsTex(k), color: col, transparent: true, opacity: glow ? 0.95 : 1, depthWrite: false, side: THREE.DoubleSide, alphaTest: 0.02 }));
var g = new THREE.Group(), p = new THREE.Mesh(RBS.geo || (RBS.geo = new THREE.PlaneGeometry(0.92, 0.92)), m);
p.userData.role = "m";
g.add(p);
return g;
},
function (H, o) {
var NA = 48, NR = 12, pos = [], uv = [], idx = [], top = H.ymax, apexY = top + (o.vol || 0) * 0.95 + (o.rise || 0);
var front = top - (o.front || 0.075), side = top - (o.side || 0.13), back = top - (o.back || 0.17);
var hl = function (a) { var f = (1 + Math.sin(a)) / 2, s = Math.abs(Math.cos(a)); return f > 0.5 ? side + (front - side) * Math.pow((f - 0.5) * 2, 1.4) : back + (side - back) * Math.pow(f * 2, 0.8) + 0 * s; };
var seed = 3, noise = [];
for (var q = 0; q < 64; q++) {
seed = (seed * 16807) % 2147483647;
noise.push(seed / 2147483647);
}
var nz = function (a, t) { return 0.5 + 0.25 * Math.sin(a * 11 + t * 9 + noise[3] * 6) * Math.sin(a * 7 - t * 13 + noise[5] * 6) + 0.25 * Math.sin(a * 23 + t * 17) * Math.sin(t * 21 - a * 5); };
var rings = {};
var ringAt = function (y) { var k = Math.round(y * 200); return rings[k] || (rings[k] = H.ring(Math.min(top - 0.004, y))); };
for (var i = 0; i <= NR; i++) {
var t = i / NR;
for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, y0 = hl(a), ang = t * Math.PI / 2, y = y0 + (apexY - y0) * Math.sin(ang);
var Rb = ringAt(y0 + 0.004), base = H.at(Rb, a), Rm = ringAt(y), meas = H.at(Rm, a);
if (o.ball) {
var Cy = top - (o.cy || 0.07), Rs = Math.max(0.05, H.at(ringAt(Cy), a)) + o.vol, Rv = Math.max(0.05, H.at(ringAt(Cy), RBH_BACK)) + o.vol, el0 = Math.asin(Math.max(-1, Math.min(1, (y0 - Cy) / Rv))), el = el0 + (Math.PI / 2 - el0) * t;
var yb = Cy + Rv * Math.sin(el), rs = Rs * Math.cos(el) + (o.bump || 0) * (nz(a, t) - 0.5), w = Math.min(1, t * 6), hr = H.at(ringAt(yb), a) + (o.gap || 0.004);
var rb = yb > top - 0.012 ? rs : Math.max(hr, hr + (rs - hr) * w);
pos.push(H.cx + Math.cos(a) * rb, yb, H.cz + Math.sin(a) * rb - (o.backward || 0) * Math.sin(el));
uv.push(j / NA * (o.ur || 4), t * (o.vr || 1.5));
continue;
}
var k0 = (o.base || 0) * Math.pow(1 - (1 + Math.sin(a)) / 2, 0.7), v = (o.vol || 0) * (k0 + (1 - k0) * Math.sin(Math.min(1, t * (o.edge || 3) + 0.15) * Math.PI / 2)), r = Math.max((base + v + (o.gap || 0.004)) * Math.cos(ang), y < top - 0.01 ? meas + (o.gap || 0.004) + v * (1 - 0.3 * t) : 0);
r += (o.bump || 0) * (nz(a, t) - 0.5) * Math.sin(Math.min(1, t * 3) * Math.PI / 2);
pos.push(H.cx + Math.cos(a) * r, y, H.cz + Math.sin(a) * r);
uv.push(j / NA * (o.ur || 4), t * (o.vr || 1.5));
}
}
for (var i2 = 0; i2 < NR; i2++)
for (var j2 = 0; j2 < NA; j2++) {
var a0 = i2 * (NA + 1) + j2, c0 = a0 + NA + 1;
idx.push(a0, c0, a0 + 1, a0 + 1, c0, c0 + 1);
}
if (o.ball) {
var Rt = Math.max(0.05, H.at(ringAt(top - (o.cy || 0.07)), RBH_BACK)) + o.vol;
apexY = top - (o.cy || 0.07) + Rt;
}
var ai = pos.length / 3;
pos.push(H.cx, apexY, H.cz - (o.backward || 0));
uv.push(0.5, o.vr || 1.5);
var l = NR * (NA + 1);
for (var j3 = 0; j3 < NA; j3++)
idx.push(l + j3, ai, l + j3 + 1);
return hfGeo(pos, idx, uv);
},
function (pts, r, seg, rad) {
var cv = new THREE.CatmullRomCurve3(pts), g = new THREE.TubeGeometry(cv, seg || 24, 1, rad || 8, false), P = g.attributes.position, n = new THREE.Vector3(), c = new THREE.Vector3();
var NR = (rad || 8) + 1;
for (var i = 0; i <= (seg || 24); i++) {
var t = i / (seg || 24), p = cv.getPointAt(t), s = r(t);
for (var j = 0; j < NR; j++) {
var k = i * NR + j;
n.fromBufferAttribute(P, k).sub(p);
P.setXYZ(k, p.x + n.x * s, p.y + n.y * s, p.z + n.z * s);
}
}
g.computeVertexNormals();
return g;
},
function (pts, r0, r1) {
var cv = new THREE.CatmullRomCurve3(pts), out = [];
for (var s = 0; s < 3; s++) {
var P = [], N = 40;
for (var i = 0; i <= N; i++) {
var t = i / N, p = cv.getPointAt(t), tg = cv.getTangentAt(t), side = new THREE.Vector3(1, 0, 0).cross(tg).normalize(), up = tg.clone().cross(side).normalize();
var ph = t * Math.PI * 2 * 7 + s * Math.PI * 2 / 3, rr = (r0 + (r1 - r0) * t) * 0.55;
P.push(p.clone().addScaledVector(side, Math.cos(ph) * rr).addScaledVector(up, Math.sin(ph) * rr * 0.6));
}
out.push(rbHairTube(P, function (t) { return (r0 + (r1 - r0) * t) * 0.55; }, 60, 6));
}
return out;
},
function (E) {
if (!E)
return;
if (E.rbHair) {
var G = E.rbHair;
if (G.parent)
G.parent.remove(G);
G.traverse(function (o) { if (o.isMesh && o.geometry)
o.geometry.dispose(); });
E.rbHair = null;
}
if (E.rbHairHid) {
E.rbHairHid.forEach(function (m) { m.visible = true; });
E.rbHairHid = null;
}
if (E.rbHeadGeo) {
E.rbHeadGeo[0].geometry = E.rbHeadGeo[1];
E.rbHeadGeo = null;
}
E.rbHairDone = 0;
E.rbHairTry = 0;
},
function (m) {
var G = m.geometry;
if (G.attributes.rbHand)
return;
var SI = G.attributes.skinIndex, SW = G.attributes.skinWeight, n = G.attributes.position.count, a = new Float32Array(n), B = m.skeleton.bones;
var hand = B.map(function (b) { return /^(hand|index|middle|ring|pinky|thumb)/i.test(b ? b.name : "") ? 1 : 0; });
for (var i = 0; i < n; i++) {
var w = 0;
for (var k = 0; k < 4; k++) {
var wk = rlC(SW, i, k);
if (wk && hand[rlC(SI, i, k)])
w += wk;
}
a[i] = w > 0.5 ? 1 : 0;
}
G.setAttribute("rbHand", new THREE.BufferAttribute(a, 1));
},
function (E, u) {
var sex = rbdSex(E), w = u.dance, list;
if (!RBD.clips[sex]) {
rbdLoad(sex);
return E.acts.dance ? "dance" : null;
}
if (typeof w === "string" && RBD.KEY[w])
list = [RBD.KEY[w]];
else if (typeof w === "string" && /^dance/.test(w))
list = [w];
else
list = RBD.MOOD[typeof w === "string" && RBD.MOOD[w] ? w : "any"];
list = list.filter(function (n) { return !!E.acts[n]; });
if (!list.length)
return E.acts.dance ? "dance" : null;
var h = (typeof hdfHash === "function" ? hdfHash(String(E.id)) : 7) + (u.danceN | 0) * 7;
return list[h % list.length];
},
function (E) {
if (typeof togBones !== "function" || typeof togAim !== "function" || typeof togFwd !== "function")
return;
var B = togBones(E);
if (!B.upperarm_l || !B.upperarm_r)
return;
E.model.updateMatrixWorld(true);
var F = togFwd(E.g, B), U = new THREE.Vector3(0, 1, 0), Lf = new THREE.Vector3();
var a = B.upperarm_l.getWorldPosition(new THREE.Vector3()), b = B.upperarm_r.getWorldPosition(new THREE.Vector3());
Lf.subVectors(a, b);
Lf.y = 0;
if (Lf.lengthSq() < 1e-6)
Lf.crossVectors(U, F);
Lf.normalize();
function dir(f, u, l) { return new THREE.Vector3().addScaledVector(F, f).addScaledVector(U, u).addScaledVector(Lf, l); }
var he = rbdSex(E) === "m";
var up = [dir(0.45, -0.05, 0.9), dir(0.35, 0.95, 0.1)];
var round = he ? [dir(0.85, -0.45, -0.3), dir(0.55, 0.05, 0.85)] : [dir(0.9, -0.2, 0.35), dir(0.75, 0.45, -0.5)];
var P = he ? { l: up, r: round } : { l: round, r: [dir(0.45, -0.05, -0.9), dir(0.35, 0.95, -0.1)] };
["l", "r"].forEach(function (sd) {
var q = P[sd];
togAim(B["upperarm_" + sd], B["lowerarm_" + sd], q[0], 1);
togAim(B["lowerarm_" + sd], B["hand_" + sd], q[1], 1);
});
},
function (buffer, layout) {
Object.keys(layout).forEach(function (k) {
var q = layout[k], off = q[0], count = q[1], flag = q[3];
if (flag !== "planes" && flag !== "xyz")
return;
var u8 = new Uint8Array(buffer, off, count * 2), c = u8.slice();
if (flag === "planes")
for (var i = 0; i < count; i++) {
u8[i * 2] = c[i];
u8[i * 2 + 1] = c[count + i];
}
else {
var n = count / 3;
for (var k2 = 0; k2 < 3; k2++)
for (var j = 0; j < n; j++) {
var from = k2 * n + j, to = (j * 3 + k2) * 2;
u8[to] = c[from];
u8[to + 1] = c[count + from];
}
}
});
},
function () {
if (MHW.baseP)
return MHW.baseP;
MHW.baseP = (async function () {
var bi = await (await fetch(MHW.dir + "base.json")).json(), rig = await (await fetch(MHW.dir + "rig.json")).json();
var bb = await mhwBin(MHW.dir + "base.bin"), sb = await mhwBin(MHW.dir + "skin.bin");
mhwUnplane(bb, bi.layout);
mhwUnplane(sb, rig.layout);
var B = { N: bi.vertexCount, upm: bi.unitsPerMeter, rest: mhwView(bb, bi.layout.positions), source: mhwView(bb, bi.layout.source), uv: mhwView(bb, bi.layout.uv), indices: mhwView(bb, bi.layout.indices),
joints: mhwView(sb, rig.layout.joints), weights: mhwView(sb, rig.layout.weights), bones: rig.bones, cubes: rig.cubes };
var P = new Float32Array(B.N * 3);
for (var i = 0; i < P.length; i++)
P[i] = B.rest[i] / B.upm;
B.P = P;
var avg = function (list) { var v = [0, 0, 0]; list.forEach(function (i) { for (var k = 0; k < 3; k++)
v[k] += P[i * 3 + k]; }); return v.map(function (x) { return x / list.length; }); };
B.bones.forEach(function (b) { var s = b.head; b.h = s ? (s.cube ? avg(B.cubes[s.cube]) : s.mean ? avg(s.mean) : null) : null; });
MHW.base = B;
return B;
})();
MHW.baseP.catch(function () { MHW.baseP = null; });
return MHW.baseP;
},
function (id) {
if (MHW.itemsP[id])
return MHW.itemsP[id];
MHW.itemsP[id] = (async function () {
var info = await (await fetch(MHW.dir + "items/" + id + ".json")).json(), b = await mhwBin(MHW.dir + "items/" + id + ".bin");
mhwUnplane(b, info.layout);
var L = info.layout, it = { id: id, info: info, source: mhwView(b, L.source), uv: new Float32Array(mhwView(b, L.uv)), indices: new Uint32Array(mhwView(b, L.indices)), refs: mhwView(b, L.refs), weights: mhwView(b, L.weights), offsets: mhwView(b, L.offsets), hides: mhwView(b, L.delete) };
MHW.items[id] = it;
return it;
})();
MHW.itemsP[id].catch(function () { MHW.itemsP[id] = null; });
return MHW.itemsP[id];
},
function (spec, L) {
var h = rbMix(hdfHash("mhw:" + (spec.id || spec.name || "x"))), pick = function (a, s) { return a[(h >>> s) % a.length]; };
var f = L.sex !== "m", tk = String(L.topKind || ""), bk = String(L.bottomKind || ""), lay = String(L.layer || ""), out = [];
var hat = L.hat && L.hat !== "none" ? String(L.hat) : null, sp = String((spec.id || "") + " " + (spec.world || "") + " " + (L.role || ""));
if (lay === "armor" || /knight|warrior|soldier|fighter/.test(L.role || "") && lay !== "uniform") {
out.push(pick(f ? MHW_SETS.fArmor : MHW_SETS.mArmor, 3), pick(f ? MHW_SETS.fBoots : MHW_SETS.mBoots, 11));
if (!hat && h % 3 === 0)
out.push("culturalibre_warrior_helmet");
return out;
}
if (lay === "cloak" || /wizard|mage|sorcer|witch/.test(L.role || "")) {
var robe = pick(MHW_SETS.mage, 3);
out.push(robe, pick(f ? MHW_SETS.fShoesDress : MHW_SETS.mShoes, 11));
if (!hat || hat === "hood")
out.push(robe === "ours_wizard_robe" ? "ours_wizard_hood" : "ours_sorcerer_hood");
return out;
}
if (L.eva || (hat === "helmet" && tk === "shirt" && L.top != null && L.top === L.bottom && !lay) || (hat === "helmet" && lay === "jacket" && L.top === L.bottom && tk === "shirt")) {
out.push(pick(MHW_SETS.eva, 3), pick(f ? MHW_SETS.fBoots : MHW_SETS.mBoots, 11));
return out;
}
if (/veyar|far.?gate|open.?space|starship|orbit|spacer|astronaut/i.test(sp)) {
out.push(pick(MHW_SETS.stars, 3), pick(f ? MHW_SETS.fBoots : MHW_SETS.mBoots, 11));
return out;
}
if (lay === "tunic" && !f) {
out.push("rehmanpolanski_viking_tunic", "rehmanpolanski_viking_pants", "rehmanpolanski_viking_boots");
return out;
}
if (tk === "robe") {
out.push(pick(MHW_SETS.robe, 3), pick(f ? MHW_SETS.fShoesDress : MHW_SETS.mShoes, 11));
return out;
}
else if (f) {
if (tk === "dress")
out.push(pick(MHW_SETS.fDress, 3));
else if (/coat|jacket|blazer|suit/.test(lay))
out.push(pick(MHW_SETS.fSmart, 3));
else if (bk === "skirt" || bk === "kilt")
out.push(pick(MHW_SETS.fTop, 3), pick(MHW_SETS.fSkirt, 7));
else if (bk === "shorts")
out.push(pick(MHW_SETS.fTop, 3), pick(MHW_SETS.fPants, 7));
else if (h % 3 === 0)
out.push(pick(MHW_SETS.fTop, 3), pick(MHW_SETS.fPants, 7));
else
out.push(pick(MHW_SETS.fSuit, 3));
out.push(pick(MHW_SETS.skirted.test(out.join(",")) ? MHW_SETS.fShoesDress : MHW_SETS.fShoes, 11));
}
else {
if (/coat|jacket|blazer|suit|uniform/.test(lay))
out.push(pick(MHW_SETS.mSmart, 3));
else if (bk === "shorts")
out.push(pick(MHW_SETS.mTop, 3), "cortu_cargo_pants");
else if (h % 4 === 0)
out.push(pick(MHW_SETS.mTop, 3), pick(MHW_SETS.mPants, 7));
else
out.push(pick(MHW_SETS.mSuit, 3));
out.push(pick(MHW_SETS.mShoes, 11));
}
if (!f && out[0] && /^(toigo_|female_|joepal_)/.test(out[0]))
out[0] = "male_casualsuit01";
return out;
},
function (spec, L) {
var h = rbMix(hdfHash("mhw:" + (spec.id || spec.name || "x"))), pick = function (a, s) { return a[(h >>> s) % a.length]; };
var f = L.sex !== "m", tk = String(L.topKind || "shirt"), bk = String(L.bottomKind || "trousers"), lay = L.layer && L.layer !== "none" ? String(L.layer) : "", out = [], whole = false;
if (lay === "armor")
return null;
if (tk === "dress") {
out.push(pick(MHW_SETS.fDress, 3));
whole = true;
}
else if (tk === "robe") {
out.push(pick(MHW_SETS.robe, 3));
whole = true;
}
else if (lay === "kimono") {
out.push("mindfront_kimono");
whole = true;
}
else if (lay === "suit" || lay === "uniform") {
out.push(f ? "female_elegantsuit01" : "male_elegantsuit01");
whole = true;
}
else if (lay === "jacket" || lay === "longcoat" || lay === "labcoat") {
out.push(f ? "female_elegantsuit01" : "male_casualsuit05");
whole = true;
}
else if (lay === "sweater" || lay === "hoodie")
out.push("toigo_fisherman_sweater");
else if (lay === "tunic")
out.push("rehmanpolanski_viking_tunic");
else if (f)
out.push(pick(["toigo_basic_tucked_t-shirt", "toigo_keyhole_tank_top", "toigo_bodice-style_top", "toigo_turtleneck_halter_top", "joepal_crude_t-shirt_female"], 3));
else if (bk === "jeans")
out.push(pick(["male_casualsuit02", "male_casualsuit04", "male_casualsuit01"], 3)), whole = true;
else
out.push("namuhekam_male_polo_shirt");
if (!whole) {
if (bk === "skirt")
out.push(pick(MHW_SETS.fSkirt, 7));
else if (bk === "kilt")
out.push("toigo_tiered_skirt");
else if (bk === "jeans" || bk === "shorts")
out.push("cortu_cargo_pants");
else
out.push(pick(["toigo_wool_pants", "toigo_wool_pants", "cortu_cargo_pants"], 7));
}
var sk = String(L.shoeKind || "shoes"), S = MHW_SHOE[f ? "f" : "m"], sl = S[sk] || S.shoes;
if (MHW_SETS.skirted.test(out.join(",")) && sk === "shoes")
sl = MHW_SETS.fShoesDress;
out.push(pick(sl, 11));
return out;
},
function (B, fig) {
MHW.shapes = MHW.shapes || {};
if (MHW.shapes[fig])
return MHW.shapes[fig];
var S = MHW_FIG[fig] || {}, fat = S.fat || 0, mus = S.mus || 0, belly = S.belly || 0, hip = S.hip || 0, bust = S.bust || 0, sag = S.sag || 0;
var V = THREE.Vector3, find = function (n) { for (var i = 0; i < B.bones.length; i++)
if (B.bones[i].name === n)
return i; return -1; };
var hd = function (n) { var k = find(n); return k >= 0 && B.bones[k].h ? new V().fromArray(B.bones[k].h) : null; };
var fwd = hd("ball_l").sub(hd("foot_l"));
var upv = hd("neck_01").sub(hd("pelvis")).normalize();
fwd.addScaledVector(upv, -fwd.dot(upv)).normalize();
var seg = B.bones.map(function (b) { var kid = MHW_CH[b.name]; if (!b.h || !kid)
return null; var a = new V().fromArray(b.h), c = hd(kid); return c ? [a, c] : null; });
var P = new Float32Array(B.P.length), p = new V(), q = new V(), d = new V(), tot = new V(), pel = hd("pelvis"), chest = hd("spine_03"), sp1 = hd("spine_01");
for (var i = 0; i < B.N; i++) {
p.fromArray(B.P, i * 3);
tot.set(0, 0, 0);
for (var k = 0; k < 4; k++) {
var w = B.weights[i * 4 + k];
if (!(w > 0))
continue;
var bi = B.joints[i * 4 + k], sg = seg[bi], nm = B.bones[bi].name;
if (!sg)
continue;
var amt = fat * (MHW_FAT[nm] || 0) * (fat < 0 ? 0.55 : 1) + mus * (MHW_MUS[nm] || 0);
if (!amt && !belly && !hip && !bust)
continue;
var ab = q.copy(sg[1]).sub(sg[0]), t = Math.max(0, Math.min(1, d.copy(p).sub(sg[0]).dot(ab) / ab.lengthSq()));
d.copy(sg[0]).addScaledVector(ab, t);
var r = d.subVectors(p, d);
var len = r.length();
if (len < 1e-5)
continue;
r.multiplyScalar(1 / len);
var fr = r.dot(fwd), extra = 0;
if (nm === "spine_01" || nm === "pelvis") {
extra += belly * 0.05 * Math.max(0, fr) * Math.max(0, fr) * (nm === "spine_01" ? 1 : 0.6);
extra += hip * 0.03 * (Math.max(0, -fr) + 0.6 * Math.abs(r.dot(new V().crossVectors(fwd, upv))));
}
if (nm === "thigh_l" || nm === "thigh_r")
extra += hip * 0.022 * (1 - t);
if (nm === "spine_03" || nm === "spine_02")
extra += bust * 0.03 * Math.max(0, fr - 0.35) * (nm === "spine_03" ? 1 : 0.4);
tot.addScaledVector(r, w * (amt + extra));
}
if (sag) {
var hy = p.clone().sub(pel).dot(upv), cy = chest.clone().sub(pel).dot(upv);
if (hy > 0 && hy < cy * 1.1)
tot.addScaledVector(upv, -0.012 * sag * Math.sin(Math.PI * hy / (cy * 1.1)));
}
P[i * 3] = p.x + tot.x;
P[i * 3 + 1] = p.y + tot.y;
P[i * 3 + 2] = p.z + tot.z;
}
MHW.shapes[fig] = P;
return P;
},
function (host) {
var bones = host.skeleton.bones, J = {};
bones.forEach(function (b, i) { var n = b.name.toLowerCase(); if (J[n])
return; var M = new THREE.Matrix4().copy(host.skeleton.boneInverses[i]).invert(); J[n] = new THREE.Vector3().setFromMatrixPosition(M).applyMatrix4(host.bindMatrix); });
if (!J.thigh_l || !J.thigh_r || !J.neck_01 || !J.pelvis || !J.head)
return null;
var X = J.thigh_l.clone().sub(J.thigh_r).normalize(), Y = J.neck_01.clone().sub(J.pelvis);
Y.addScaledVector(X, -Y.dot(X)).normalize();
var Z = new THREE.Vector3().crossVectors(X, Y);
var R = new THREE.Matrix4().makeBasis(X, Y, Z).invert(), o = J.pelvis.clone(), JU = {};
Object.keys(J).forEach(function (k) { JU[k] = J[k].clone().sub(o).applyMatrix4(R); });
var foot = Math.min(JU.foot_l ? JU.foot_l.y : -0.9, JU.foot_r ? JU.foot_r.y : -0.9);
var names = bones.map(function (b) { return b.name.toLowerCase(); }), idx = {};
names.forEach(function (nm, i) { if (idx[nm] == null)
idx[nm] = i; });
return { J: JU, R: R, Rinv: new THREE.Matrix4().copy(R).invert(), o: o, sc: (JU.head.y - foot) / 1.55, names: names, idx: idx };
},
function (B, F, PS) {
var BP = PS || B.P;
var J = F.J, V3 = THREE.Vector3, find = function (n) { for (var i = 0; i < B.bones.length; i++)
if (B.bones[i].name === n)
return i; return -1; };
var sg = (J.head.y - Math.min(J.foot_l ? J.foot_l.y : -0.9, J.foot_r ? J.foot_r.y : -0.9)) / (B.bones[find("head")].h[1] - B.bones[find("foot_l")].h[1]);
var M = B.bones.map(function (b) {
var kid = MHW_CH[b.name] ? find(MHW_CH[b.name]) : -1;
if (!b.h || !J[b.name] || kid < 0 || !B.bones[kid].h || !J[B.bones[kid].name])
return null;
var mh0 = new V3().fromArray(b.h), dm = new V3().fromArray(B.bones[kid].h).sub(mh0), r0 = J[b.name], dr = J[B.bones[kid].name].clone().sub(r0), lm = dm.length(), lr = dr.length();
if (lm < 1e-4 || lr < 1e-4)
return null;
dm.normalize();
dr.normalize();
var q = new THREE.Quaternion().setFromUnitVectors(dm, dr), S = new THREE.Matrix3().set(sg, 0, 0, 0, sg, 0, 0, 0, sg), e = S.elements, k = lr / lm - sg, D = [dm.x, dm.y, dm.z];
for (var a = 0; a < 3; a++)
for (var c = 0; c < 3; c++)
e[c * 3 + a] += k * D[a] * D[c];
return new THREE.Matrix4().makeTranslation(r0.x, r0.y, r0.z).multiply(new THREE.Matrix4().makeRotationFromQuaternion(q)).multiply(new THREE.Matrix4().setFromMatrix3(S)).multiply(new THREE.Matrix4().makeTranslation(-mh0.x, -mh0.y, -mh0.z));
});
B.bones.forEach(function (b, i) { if (!M[i]) {
var p = b.parent;
while (p >= 0 && !M[p])
p = B.bones[p].parent;
M[i] = p >= 0 ? M[p] : new THREE.Matrix4().makeScale(sg, sg, sg);
} });
var N = B.N, Q = new Float32Array(N * 3), v = new V3(), acc = new V3(), tmp = new V3();
for (var i = 0; i < N; i++) {
v.fromArray(BP, i * 3);
acc.set(0, 0, 0);
var ws = 0;
for (var k2 = 0; k2 < 4; k2++) {
var w = B.weights[i * 4 + k2];
if (!(w > 0))
continue;
tmp.copy(v).applyMatrix4(M[B.joints[i * 4 + k2]]);
acc.addScaledVector(tmp, w);
ws += w;
}
if (ws > 0)
acc.multiplyScalar(1 / ws);
else
acc.copy(v).multiplyScalar(sg);
Q[i * 3] = acc.x;
Q[i * 3 + 1] = acc.y;
Q[i * 3 + 2] = acc.z;
}
var map = B.bones.map(function (b) { var n = b.name.toLowerCase(); while (F.idx[n] == null && b.parent >= 0) {
b = B.bones[b.parent];
n = b.name.toLowerCase();
} return F.idx[n] != null ? F.idx[n] : F.idx.pelvis; });
var QH = Q, le = J.bip01_leye, re = J.bip01_reye, el = find("eye_l"), er = find("eye_r");
if (le && re && el >= 0 && er >= 0 && B.bones[el].h && B.bones[er].h) {
var m0 = new V3().fromArray(B.bones[el].h).add(new V3().fromArray(B.bones[er].h)).multiplyScalar(0.5), m1 = le.clone().add(re).multiplyScalar(0.5);
var hs = 1.06 * le.distanceTo(re) / new V3().fromArray(B.bones[el].h).distanceTo(new V3().fromArray(B.bones[er].h)), hI = find("head");
QH = new Float32Array(N * 3);
for (var i3 = 0; i3 < N; i3++) {
var hw = 0;
for (var k3 = 0; k3 < 4; k3++) {
var j3 = B.joints[i3 * 4 + k3];
if (j3 === hI || j3 === el || j3 === er)
hw += B.weights[i3 * 4 + k3];
}
for (var c3 = 0; c3 < 3; c3++) {
var hp = (B.P[i3 * 3 + c3] - m0.getComponent(c3)) * hs + m1.getComponent(c3);
QH[i3 * 3 + c3] = Q[i3 * 3 + c3] * (1 - hw) + hp * hw;
}
}
}
return { Q: Q, QH: QH, map: map };
},
function (B, F, Rg) {
var src = B.source, m = src.length, pos = new Float32Array(m * 3), si = new Uint16Array(m * 4), sw = new Float32Array(m * 4), V = new THREE.Vector3(), Q = Rg.Q;
for (var r = 0; r < m; r++) {
var f = src[r];
V.set(Q[f * 3], Q[f * 3 + 1], Q[f * 3 + 2]).applyMatrix4(F.Rinv).add(F.o);
pos[r * 3] = V.x;
pos[r * 3 + 1] = V.y;
pos[r * 3 + 2] = V.z;
for (var k = 0; k < 4; k++) {
si[r * 4 + k] = Rg.map[B.joints[f * 4 + k]];
sw[r * 4 + k] = B.weights[f * 4 + k];
}
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(B.uv), 2));
G.setAttribute("skinIndex", new THREE.BufferAttribute(si, 4));
G.setAttribute("skinWeight", new THREE.BufferAttribute(sw, 4));
G.setIndex(new THREE.BufferAttribute(new Uint32Array(B.indices), 1));
G.computeVertexNormals();
var headI = -1, eyes = [];
B.bones.forEach(function (b, i) { if (b.name === "head")
headI = i; if (/^eye_/.test(b.name))
eyes.push(i); });
var cut = new Uint8Array(B.N);
for (var i = 0; i < B.N; i++) {
var hw = 0;
for (var k2 = 0; k2 < 4; k2++) {
var j = B.joints[i * 4 + k2];
if (j === headI || eyes.indexOf(j) >= 0)
hw += B.weights[i * 4 + k2];
}
if (hw > 0.35)
cut[i] = 1;
}
return { G: G, cut: cut, parts: {} };
},
function (B, BG, items) {
var key = items.map(function (it) { return it.id; }).sort().join(",");
if (BG.parts[key])
return BG.parts[key];
var hid = new Uint8Array(B.N);
items.forEach(function (it) { for (var i = 0; i < it.hides.length; i++)
hid[it.hides[i]] = 1; });
var src = B.source, I = [];
for (var t = 0; t < B.indices.length; t += 3) {
var fa = src[B.indices[t]], fb = src[B.indices[t + 1]], fc = src[B.indices[t + 2]];
if (BG.cut[fa] || BG.cut[fb] || BG.cut[fc])
continue;
if (hid[fa] && hid[fb] && hid[fc])
continue;
I.push(B.indices[t], B.indices[t + 1], B.indices[t + 2]);
}
var G = new THREE.BufferGeometry();
["position", "normal", "uv", "skinIndex", "skinWeight"].forEach(function (a) { G.setAttribute(a, BG.G.attributes[a]); });
G.setIndex(new THREE.BufferAttribute(new Uint32Array(I), 1));
BG.parts[key] = G;
return G;
},
function (B, F, Rg, it) {
var info = it.info, n = info.vertexCount, sc = info.scale, Q = /^(hair|hat|glasses)$/.test(info.kind) ? Rg.QH : Rg.Q, U = F.sc;
var axis = function (ax, k) { return sc && sc[ax] ? Math.abs(Q[sc[ax][0] * 3 + k] - Q[sc[ax][1] * 3 + k]) / sc[ax][2] : 0.1; }, s = [axis("x", 0), axis("y", 1), axis("z", 2)];
var out = new Float32Array(n * 3), rf = it.refs, w = it.weights, o = it.offsets;
for (var i = 0; i < n; i++) {
var r0 = rf[i * 3] * 3, r1 = rf[i * 3 + 1] * 3, r2 = rf[i * 3 + 2] * 3, w0 = w[i * 3], w1 = w[i * 3 + 1], w2 = w[i * 3 + 2];
for (var k = 0; k < 3; k++)
out[i * 3 + k] = w0 * Q[r0 + k] + w1 * Q[r1 + k] + w2 * Q[r2 + k] + o[i * 3 + k] * s[k];
}
var Jh = F.J, hipY0 = (Jh.thigh_l.y + Jh.thigh_r.y) / 2, two = /casualsuit|worksuit|elegantsuit/.test(it.id);
if (info.kind === "bottom" || two)
for (var i5 = 0; i5 < n; i5++) {
var y5 = out[i5 * 3 + 1];
if (y5 < hipY0 - 0.08 * U)
continue;
if (two) {
var lw = 0;
for (var k7 = 0; k7 < 3; k7++) {
var f7 = rf[i5 * 3 + k7];
for (var q7 = 0; q7 < 4; q7++) {
var bn7 = B.bones[B.joints[f7 * 4 + q7]];
if (bn7 && /^(thigh|calf)_/.test(bn7.name))
lw += B.weights[f7 * 4 + q7] * w[i5 * 3 + k7];
}
}
if (lw < 0.25)
continue;
}
var t5 = 0.75 * mhwSmooth(hipY0 - 0.08 * U, hipY0 - 0.02 * U, y5);
for (var k8 = 0; k8 < 3; k8++) {
var b5 = w[i5 * 3] * Q[rf[i5 * 3] * 3 + k8] + w[i5 * 3 + 1] * Q[rf[i5 * 3 + 1] * 3 + k8] + w[i5 * 3 + 2] * Q[rf[i5 * 3 + 2] * 3 + k8];
out[i5 * 3 + k8] -= (out[i5 * 3 + k8] - b5) * t5;
}
}
var J = F.J, hipY = (J.thigh_l.y + J.thigh_r.y) / 2, cx = (J.thigh_l.x + J.thigh_r.x) / 2, kneeY = J.calf_l && J.calf_r ? (J.calf_l.y + J.calf_r.y) / 2 : hipY - 0.45 * U;
var lowest = 1e9;
for (var i2 = 0; i2 < n; i2++)
lowest = Math.min(lowest, out[i2 * 3 + 1]);
var skirt = MHW_SKIRT.test(it.id), long = lowest < kneeY - 0.25 * U, id = F.idx, armRe = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)_/;
var SI = new Uint16Array(n * 4), SW = new Float32Array(n * 4);
for (var v = 0; v < n; v++) {
var mix = {};
for (var k3 = 0; k3 < 3; k3++) {
var f = rf[v * 3 + k3], ww = w[v * 3 + k3];
if (!(ww > 0))
continue;
for (var q = 0; q < 4; q++) {
var bw = B.weights[f * 4 + q];
if (bw > 0) {
var bi = Rg.map[B.joints[f * 4 + q]];
mix[bi] = (mix[bi] || 0) + bw * ww;
}
}
}
var x = out[v * 3], y = out[v * 3 + 1];
if (skirt && y < hipY + 0.06 * U) {
var onArm = 0, tot = 0;
Object.keys(mix).forEach(function (b) { tot += mix[b]; if (armRe.test(F.names[b]))
onArm += mix[b]; });
if (onArm / (tot || 1) < 0.3) {
var a = mhwSmooth(hipY + 0.06 * U, hipY + 0.01 * U, y), leg = mhwSmooth(hipY + 0.01 * U, hipY - 0.07 * U, y), left = mhwSmooth(-0.05 * U, 0.05 * U, x - cx);
var c = long ? mhwSmooth(kneeY - 0.05 * U, kneeY - 0.2 * U, y) : 0.5 * mhwSmooth(kneeY + 0.1 * U, kneeY - 0.02 * U, y);
Object.keys(mix).forEach(function (b) { mix[b] *= (1 - a); });
[[id.pelvis, 1 - leg], [id.thigh_l, leg * left * (1 - c)], [id.thigh_r, leg * (1 - left) * (1 - c)], [id.calf_l, leg * left * c], [id.calf_r, leg * (1 - left) * c]].forEach(function (p) { if (p[0] != null)
mix[p[0]] = (mix[p[0]] || 0) + a * p[1]; });
}
}
var best = Object.keys(mix).map(function (b) { return [+b, mix[b]]; }).filter(function (p) { return p[1] > 0.001; }).sort(function (p, q2) { return q2[1] - p[1]; }).slice(0, 4), tt = 0;
best.forEach(function (p) { tt += p[1]; });
if (!best.length) {
best = [[id.pelvis || 0, 1]];
tt = 1;
}
for (var k4 = 0; k4 < 4; k4++) {
SI[v * 4 + k4] = best[k4] ? best[k4][0] : 0;
SW[v * 4 + k4] = best[k4] ? best[k4][1] / tt : 0;
}
}
var src = it.source, m = src.length, pos = new Float32Array(m * 3), si = new Uint16Array(m * 4), sw = new Float32Array(m * 4), V = new THREE.Vector3();
for (var r = 0; r < m; r++) {
var f2 = src[r];
V.set(out[f2 * 3], out[f2 * 3 + 1], out[f2 * 3 + 2]).applyMatrix4(F.Rinv).add(F.o);
pos[r * 3] = V.x;
pos[r * 3 + 1] = V.y;
pos[r * 3 + 2] = V.z;
for (var k5 = 0; k5 < 4; k5++) {
si[r * 4 + k5] = SI[f2 * 4 + k5];
sw[r * 4 + k5] = SW[f2 * 4 + k5];
}
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("uv", new THREE.BufferAttribute(it.uv, 2));
G.setAttribute("skinIndex", new THREE.BufferAttribute(si, 4));
G.setAttribute("skinWeight", new THREE.BufferAttribute(sw, 4));
G.setIndex(new THREE.BufferAttribute(it.indices, 1));
G.computeVertexNormals();
var ZN = new Float32Array(m), one = MHW_ONEZONE.test(it.id) && !/casualsuit|worksuit|elegantsuit/.test(it.id);
if (!one) {
var par = new Int32Array(n);
for (var z0 = 0; z0 < n; z0++)
par[z0] = z0;
var root = function (a) { while (par[a] !== a) {
par[a] = par[par[a]];
a = par[a];
} return a; };
var IX = it.indices;
for (var t0 = 0; t0 < IX.length; t0 += 3) {
var ra = root(src[IX[t0]]), rb = root(src[IX[t0 + 1]]), rc = root(src[IX[t0 + 2]]);
par[rb] = ra;
par[root(rc)] = root(ra);
}
var vote = {};
for (var z1 = 0; z1 < n; z1++) {
var yy = out[z1 * 3 + 1], legw = 0;
for (var k6 = 0; k6 < 4; k6++) {
var bn = F.names[SI[z1 * 4 + k6]] || "";
if (/^(thigh|calf|foot|ball)_/.test(bn))
legw += SW[z1 * 4 + k6];
}
var r1 = root(z1), vv = vote[r1] || (vote[r1] = [0, 0]);
vv[((yy < hipY - 0.07 * U && legw > 0.5) || yy < hipY - 0.16 * U) ? 1 : 0]++;
}
for (var z = 0; z < m; z++) {
var vt = vote[root(src[z])];
ZN[z] = vt && vt[1] > vt[0] ? 1 : 0;
}
}
G.setAttribute("mhZone", new THREE.BufferAttribute(ZN, 1));
var NP = G.attributes.normal, PP = G.attributes.position, pu = (MHW_PUSH_ID[it.id] || MHW_PUSH[info.kind] || 0.008) * U, accN = {}, ZA = G.attributes.mhZone;
var key = function (a) { return Math.round(PP.getX(a) * 1e4) + "," + Math.round(PP.getY(a) * 1e4) + "," + Math.round(PP.getZ(a) * 1e4); };
for (var a1 = 0; a1 < PP.count; a1++) {
var e = accN[key(a1)] || (accN[key(a1)] = [0, 0, 0]);
e[0] += NP.getX(a1);
e[1] += NP.getY(a1);
e[2] += NP.getZ(a1);
}
for (var a2 = 0; a2 < PP.count; a2++) {
var e2 = accN[key(a2)], l = Math.hypot(e2[0], e2[1], e2[2]) || 1, pa = pu + (two && ZA && ZA.getX(a2) < 0.5 ? 0.005 * U : 0);
PP.setXYZ(a2, PP.getX(a2) + e2[0] / l * pa, PP.getY(a2) + e2[1] / l * pa, PP.getZ(a2) + e2[2] / l * pa);
}
G.computeVertexNormals();
return G;
},
function (it, dye) {
var key = it.id + (dye ? ":" + dye.join(",") : "");
if (MHW.mats[key])
return MHW.mats[key];
var M = new THREE.MeshStandardMaterial({ map: mhwTex(it.info.texture), roughness: 0.9, metalness: 0, side: THREE.DoubleSide, alphaTest: it.info.cutout ? 0.5 : 0 });
M.skinning = true;
if (dye)
mhwDyeMat(M, it, dye);
MHW.mats[key] = M;
return M;
},
function (it, G, tex, U) {
var img = tex && tex.image;
if (!img || !img.width)
return false;
if (!MHW_CANVAS) {
MHW_CANVAS = document.createElement("canvas");
MHW_CANVAS.width = MHW_CANVAS.height = 128;
}
var cx = MHW_CANVAS.getContext("2d");
cx.clearRect(0, 0, 128, 128);
cx.drawImage(img, 0, 0, 128, 128);
var px = cx.getImageData(0, 0, 128, 128).data, uv = G.attributes.uv, zn = G.attributes.mhZone, s = [0, 0, 0, 0];
var lin = function (c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
for (var i = 0; i < uv.count; i++) {
var u = uv.getX(i) - Math.floor(uv.getX(i)), v = uv.getY(i) - Math.floor(uv.getY(i));
var x = Math.min(127, Math.floor(u * 128)), y = Math.min(127, Math.floor((1 - v) * 128)), o = (y * 128 + x) * 4;
if (px[o + 3] < 128)
continue;
var l = 0.2126 * lin(px[o]) + 0.7152 * lin(px[o + 1]) + 0.0722 * lin(px[o + 2]), z = zn ? zn.getX(i) : 0, b = z > 0.5 ? 2 : 0;
s[b] += l;
s[b + 1]++;
}
U.mA.value = Math.max(0.01, s[1] ? s[0] / s[1] : 0.2);
U.mB.value = Math.max(0.01, s[3] ? s[2] / s[3] : U.mA.value);
return true;
},
function (M, it, dye) {
var A = new THREE.Color(dye[0]).convertSRGBToLinear(), B = new THREE.Color(dye[1] != null ? dye[1] : dye[0]).convertSRGBToLinear();
var U = MHW.dyeU[it.id] || (MHW.dyeU[it.id] = { mA: { value: 0.2 }, mB: { value: 0.2 }, ok: false });
M.userData.mhwDye = it.id;
M.onBeforeCompile = function (sh) {
sh.uniforms.mhA = { value: A };
sh.uniforms.mhB = { value: B };
sh.uniforms.mhMA = U.mA;
sh.uniforms.mhMB = U.mB;
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nattribute float mhZone;\nvarying float vMhZ;").replace("#include <uv_vertex>", "#include <uv_vertex>\nvMhZ=mhZone;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform vec3 mhA;\nuniform vec3 mhB;\nuniform float mhMA;\nuniform float mhMB;\nvarying float vMhZ;")
.replace("#include <map_fragment>", "#include <map_fragment>\n{ vec3 t=diffuseColor.rgb; float l=dot(t,vec3(0.2126,0.7152,0.0722)); float m=mix(mhMA,mhMB,step(0.5,vMhZ));" +
" vec3 d=mix(mhA,mhB,step(0.5,vMhZ))*clamp(pow(l/m,0.7),0.0,2.2); float keep=smoothstep(2.4*m,3.6*m,l)*step(0.3,l); diffuseColor.rgb=mix(d,t,keep); }");
};
M.customProgramCacheKey = function () { return "mhwdye"; };
},
function (id, L) {
if (MHW_NODYE.test(id) || !L)
return null;
var top = L.top, lay = L.layer && L.layer !== "none" && L.layerColor != null ? L.layerColor : null, bot = L.bottom, kind = MHW.items[id] && MHW.items[id].info.kind;
if (kind === "shoes")
return L.shoes != null ? [L.shoes] : null;
if (kind === "bottom")
return bot != null ? [bot] : null;
if (kind === "top")
return /sweater|tunic/.test(id) && lay != null ? [lay] : top != null ? [top] : null;
if (/dress|robe|kimono/.test(id))
return top != null ? [/kimono/.test(id) && lay != null ? lay : top] : null;
var up = /suit/.test(id) && lay != null ? lay : top;
return up != null ? [up, bot != null ? bot : up] : null;
},
function (it, col) {
var c = new THREE.Color(col != null ? col : 0x3A2A1A), key = "hair:" + it.id + ":" + c.getHexString();
if (MHW.mats[key])
return MHW.mats[key];
var M = new THREE.MeshStandardMaterial({ map: mhwTex(it.info.texture), color: c, roughness: 0.55, metalness: 0, side: THREE.DoubleSide, alphaTest: 0.45 });
M.skinning = true;
var ml = Math.pow(Math.max(0.03, MHW_HAIRL[it.id] || 0.25), 2.2);
M.onBeforeCompile = function (sh) {
sh.fragmentShader = sh.fragmentShader.replace("#include <map_fragment>", "#include <map_fragment>\n{ float hl=dot(diffuseColor.rgb/max(diffuse,vec3(0.001)),vec3(0.2126,0.7152,0.0722)); diffuseColor.rgb=diffuse*(0.5+0.5*clamp(hl/" + ml.toFixed(4) + ",0.2,1.8)); }");
};
M.customProgramCacheKey = function () { return "mhwhair" + ml.toFixed(4); };
MHW.mats[key] = M;
return M;
},
function (E, sex) {
var own = null;
E.model.traverse(function (q) { var M = q.material; if (!own && M && M.userData && M.userData.rb && M.userData.rb.file)
own = rbOwnSkin(M.userData.rb.file); });
own = own || new THREE.Vector3(0.43, 0.25, 0.17);
var Ls = E.plan && E.plan.L && E.plan.L.skin;
if (Ls != null) {
var lc = new THREE.Color(Ls).convertSRGBToLinear();
own = own.clone().lerp(new THREE.Vector3(lc.r, lc.g, lc.b), 0.55);
}
var lum = 0.2126 * own.x + 0.7152 * own.y + 0.0722 * own.z, eth = lum < 0.12 ? "african" : lum < 0.3 ? "asian" : "caucasian", mn = MHW_SKINMEAN[eth + (sex === "m" ? "m" : "f")];
var tint = new THREE.Color(Math.min(1.6, own.x / mn[0]), Math.min(1.6, own.y / mn[1]), Math.min(1.6, own.z / mn[2])), key = eth + sex + tint.getHexString();
if (MHW.mats[key])
return MHW.mats[key];
var M = new THREE.MeshStandardMaterial({ map: mhwTex("skin_young_" + eth + "_" + (sex === "m" ? "male" : "female") + ".jpg"), roughness: 0.6, metalness: 0, color: tint });
M.skinning = true;
MHW.mats[key] = M;
return M;
},
async function (E) {
var plan = E.plan, model = E.model;
if (!model || !plan || !plan.mh)
return;
var B = await mhwBase(), items = [];
for (var i = 0; i < plan.mh.length; i++)
items.push(await mhwItem(plan.mh[i]));
var hairIt = plan.mhHair ? await mhwItem(plan.mhHair) : null;
if (E.model !== model)
return;
var host = mhwHost(E);
if (!host)
throw new Error("no body");
var fig = MHW_FIG[plan.mhFig] ? plan.mhFig : "average", file = plan.main + (fig !== "average" ? "|" + fig : ""), R = MHW.reg[file];
if (!R) {
var F = mhwFrame(host);
if (!F)
throw new Error("no skeleton");
var Rg = mhwRegister(B, F, fig !== "average" ? mhwShapeP(B, fig) : null);
R = MHW.reg[file] = { F: F, Rg: Rg, body: null, items: {} };
}
if (!R.body)
R.body = mhwBodyGeo(B, R.F, R.Rg);
var list = [], sex = plan.rb && plan.rb.sex === "m" ? "m" : "f";
var body = new THREE.SkinnedMesh(mhwBodyPart(B, R.body, items), mhwSkinMat(E, sex));
body.name = "mh body";
list.push(body);
items.forEach(function (it) {
var G = R.items[it.id] || (R.items[it.id] = mhwItemGeo(B, R.F, R.Rg, it)), dye = mhwDyeOf(it.id, plan.L), M = mhwItemMat(it, dye);
if (dye) {
var DU = MHW.dyeU[it.id];
if (DU && !DU.ok) {
var tx = M.map;
if (!(DU.ok = mhwDyeMeans(it, G, tx, DU)) && tx) {
var g0 = G;
(function wait(n) { setTimeout(function () { if (!DU.ok && !(DU.ok = mhwDyeMeans(it, g0, tx, DU)) && n < 60)
wait(n + 1); }, 500); })(0);
}
}
}
var S = new THREE.SkinnedMesh(G, M);
S.name = "mh " + it.id;
list.push(S);
});
mhwHemCut(R, list, items);
if (hairIt) {
var HG = R.items[hairIt.id] || (R.items[hairIt.id] = mhwItemGeo(B, R.F, R.Rg, hairIt));
var HS = new THREE.SkinnedMesh(HG, mhwHairMat(hairIt, (plan.L || {}).hair));
HS.name = "mh " + hairIt.id;
list.push(HS);
}
list.forEach(function (S) { S.frustumCulled = false; S.castShadow = true; S.receiveShadow = true; S.raycast = function () { }; S.userData.hdf = 1; S.userData.mhw = 1; host.parent.add(S); S.bind(host.skeleton, host.bindMatrix); });
model.traverse(function (q) { if (q.isSkinnedMesh && !q.userData.mhw) {
var u = q.material && q.material.userData && q.material.userData.rb;
if (u && u.kind === "body")
q.visible = false;
} });
E.mhw = list;
MHW.n++;
if (hairIt || plan.mh.some(function (id) { return /hood|helmet/.test(id); }))
mhwFlat(E, 0);
},
function (R, list, items) {
var F = R.F, U = F.sc, P = new THREE.Vector3(), up = function (G, i) { P.fromBufferAttribute(G.attributes.position, i).sub(F.o).applyMatrix4(F.R); return P; };
var NB = 24, ang = function (p) { return Math.floor((Math.atan2(p.x, p.z) / (2 * Math.PI) + 0.5) * NB) % NB; };
var hipY = (F.J.thigh_l.y + F.J.thigh_r.y) / 2, armRe = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky|clavicle)_/;
var hem = null, add = function (G, zone) {
var Z = G.attributes.mhZone, si = G.attributes.skinIndex, sw = G.attributes.skinWeight;
for (var i = 0; i < G.attributes.position.count; i++) {
if (Z && Z.getX(i) !== zone)
continue;
var arm = 0, gs = ["getX", "getY", "getZ", "getW"];
for (var k = 0; k < 4; k++)
if (armRe.test(F.names[si[gs[k]](i)] || ""))
arm += sw[gs[k]](i);
if (arm > 0.3)
continue;
var p = up(G, i);
if (p.y > hipY + 0.35 * U || Math.hypot(p.x, p.z) > 0.3 * U)
continue;
hem = hem || new Float32Array(NB).fill(1e9);
var b = ang(p);
if (p.y < hem[b])
hem[b] = p.y;
}
};
var tops = [], bots = [];
list.forEach(function (S) {
var id = S.name.slice(3), it = MHW.items[id];
if (!it)
return;
var kd = it.info.kind;
if (kd === "top" || (kd === "outfit" && !/dress|robe|kimono|skirt/.test(id)))
tops.push(S);
if (kd === "bottom" || (kd === "outfit" && /casualsuit|worksuit|elegantsuit/.test(id)))
bots.push(S);
});
tops.forEach(function (S) { add(S.geometry, 0); });
if (!hem)
return;
for (var b0 = 0; b0 < NB; b0++)
if (hem[b0] > 1e8) {
var a1 = hem[(b0 + NB - 1) % NB], a2 = hem[(b0 + 1) % NB];
hem[b0] = Math.min(a1, a2);
}
bots.forEach(function (S) {
var G = S.geometry, base = G.userData.mhwFull || G, id = S.name.slice(3), Z = base.attributes.mhZone, two = MHW.items[id].info.kind === "outfit";
var key = "hem:" + Array.prototype.map.call(hem, function (v) { return Math.round(v * 200); }).join(","), C = base.userData.mhwCuts || (base.userData.mhwCuts = {});
if (!C[key]) {
var I = base.index, out = [], hi = function (v) { if (two && Z.getX(v) < 0.5)
return false; var p = up(base, v), h = hem[ang(p)]; return h < 1e8 && p.y > h + 0.012 * U; };
for (var t = 0; t < I.count; t += 3) {
var a = I.getX(t), b = I.getX(t + 1), c = I.getX(t + 2);
if (hi(a) && hi(b) && hi(c))
continue;
out.push(a, b, c);
}
var NG = new THREE.BufferGeometry();
Object.keys(base.attributes).forEach(function (k) { NG.setAttribute(k, base.attributes[k]); });
NG.setIndex(out);
NG.userData.mhwFull = base;
C[key] = NG;
}
S.geometry = C[key];
});
},
function (E, n) {
if (!E.model)
return;
if (E.rbHair) {
var G = E.rbHair;
if (G.parent)
G.parent.remove(G);
G.traverse(function (o) { if (o.isMesh && o.geometry)
o.geometry.dispose(); });
E.rbHair = null;
}
if (E.rbHeadGeo || typeof rbScalp !== "function")
return;
var L = E.plan.L || {}, ok = false;
try {
ok = rbScalp(E, "short", L);
}
catch (e) { }
if (!ok && n < 40)
setTimeout(function () { mhwFlat(E, n + 1); }, 250);
},
function () {
if (MHW.busy)
return;
for (var i = MHW.q.length - 1; i >= 0; i--) {
var Q = MHW.q[i];
if (!Q || !Q.model || !Q.model.parent)
MHW.q.splice(i, 1);
}
if (!MHW.q.length)
return;
var bi = 0, bd = 1e9;
MHW.q.forEach(function (Q, i) { var d = Q.d != null ? Q.d : 500; if (d < bd) {
bd = d;
bi = i;
} });
var E = MHW.q.splice(bi, 1)[0];
MHW.busy = true;
var done = false, tid = 0;
var fin = function () { if (done)
return; done = true; clearTimeout(tid); if (E.model && E.mhwWait) {
E.model.visible = true;
E.mhwWait = 0;
} MHW.busy = false; setTimeout(mhwPump, 40); };
tid = setTimeout(function () { if (window.console)
console.warn("[real clothes] slow, moving on"); fin(); }, 30000);
mhwDress(E).catch(function (e) { if (window.console)
console.warn("[real clothes]", e && e.message || e); E.mhwBad = 1; }).then(fin);
},
function (E) {
if (typeof mhwHost !== "function" || typeof mhwFrame !== "function")
return null;
var host = mhwHost(E);
if (!host)
return null;
var F = mhwFrame(host);
if (!F)
return null;
var S = host.skeleton, bones = S.bones, by = {};
bones.forEach(function (b, i) { var n = b.name.toLowerCase(); if (by[n] == null)
by[n] = i; });
var V3 = THREE.Vector3, rUp = new THREE.Quaternion().setFromRotationMatrix(F.R), rUpInv = rUp.clone().invert();
var bindOf = function (i) { return new THREE.Matrix4().copy(host.bindMatrix).multiply(new THREE.Matrix4().copy(S.boneInverses[i]).invert()); };
var mk = function (i) {
var b = bones[i], p = bones.indexOf(b.parent);
if (p < 0)
return null;
var PW = bindOf(p), PWinv = new THREE.Matrix4().copy(PW).invert(), pq = new THREE.Quaternion(), ps = new V3(), pp = new V3();
PW.decompose(pp, pq, ps);
return { b: b, i: i, toLocal: new THREE.Matrix3().setFromMatrix4(PWinv), pq: pq, pqInv: pq.clone().invert(), rest: b.position.clone(), restQ: b.quaternion.clone(), last: null, lastQ: null };
};
var R = { F: F, sc: F.sc, parts: {}, jaw: null };
["l", "r", "m"].forEach(function (side) {
["EyeBlinkBottom", "EyeBlinkTop", "Upperlip", "MouthCorner", "Cheek", "InnerEyebrow", "OuterEyebrow", "MouthBottom", "MiddleEyebrow", "UpperLip", "BottomLip"].forEach(function (n) {
var key = "bip01_" + side + n.toLowerCase();
if (by[key] == null)
return;
var P = mk(by[key]);
if (!P)
return;
P.side = side;
R.parts[side.toUpperCase() + ":" + n] = P;
});
});
if (by.bip01_mjaw != null)
R.jaw = mk(by.bip01_mjaw);
if (!R.jaw && !Object.keys(R.parts).length)
return null;
var J = F.J;
R.lid = {};
["l", "r"].forEach(function (s) { var t = J["bip01_" + s + "eyeblinktop"], u = J["bip01_" + s + "eyeblinkbottom"]; R.lid[s] = t && u ? Math.max(0.002, (t.y - u.y) * 0.8) : 0.006 * F.sc; });
return R;
},
function (E, now) {
var g = E.g, u = g && g.userData || {}, f = u.rbFace;
if (f && f.until > now)
return [f.mood, f.k];
if (u.dance) {
var h = (hdfHash(String(E.id)) % 7) / 7, w = Math.sin(now / 1000 * 0.5 + h * 6.28);
return [w > 0.55 ? "laugh" : "happy", 0.75 + 0.25 * Math.abs(w)];
}
var st = E.state;
if (st === "hurt" || st === "fall")
return ["hurt", 1];
if (st === "attack")
return ["angry", 0.9];
if (st === "cast")
return ["angry", 0.4];
var hh = hdfHash("face:" + E.id) % 10;
return hh < 3 ? ["happy", 0.3] : hh < 4 ? ["sad", 0.25] : ["calm", 0];
},
function (E, R, now, dt) {
var st = E.rbFace || (E.rbFace = { cur: {}, k: 0, mood: "calm", blinkAt: now + 1500 + hdfHash(E.id) % 3000, blink: 0, talk: 0 });
var mk = rbfaceMood(E, now), want = RBFACE_MOODS[mk[0]] || RBFACE_MOODS.calm, ease = 1 - Math.exp(-dt * 6);
var target = {}, jaw = (want.jaw || 0) * mk[1];
want.b.forEach(function (q) {
var name = q[0], sides = name.indexOf(":") > 0 ? [name.split(":")[0]] : ["L", "R", "M"], n = name.indexOf(":") > 0 ? name.split(":")[1] : name;
if (/^M/.test(n) && n !== "MouthCorner" && n !== "MouthBottom") {
sides = ["M"];
n = n.slice(1);
}
sides.forEach(function (s) { var key = s + ":" + n; if (!R.parts[key])
return; var o = s === "L" ? 1 : s === "R" ? -1 : 0; target[key] = [q[1] * o * mk[1], q[2] * mk[1], q[3] * mk[1]]; });
});
Object.keys(R.parts).forEach(function (k) { var c = st.cur[k] || (st.cur[k] = [0, 0, 0]), t = target[k] || [0, 0, 0]; for (var a = 0; a < 3; a++)
c[a] += (t[a] - c[a]) * ease; });
var talking = rbfaceTalking(E, now);
st.talk += (((talking ? 1 : 0)) - st.talk) * Math.min(1, dt * 8);
var t = now / 1000, syl = st.talk > 0.01 ? st.talk * (0.06 + 0.07 * Math.abs(Math.sin(t * 9.3 + Math.sin(t * 3.1) * 2)) * (0.6 + 0.4 * Math.sin(t * 1.7))) : 0;
st.jaw = (st.jaw || 0) + (jaw - (st.jaw || 0)) * ease;
var mm = 0.001 * R.sc * RBFACE.gain, F = R.F;
Object.keys(R.parts).forEach(function (k) {
var P = R.parts[k], c = st.cur[k], g2 = /EyeBlink/.test(k) ? mm / RBFACE.gain * 0.8 : mm, v = new THREE.Vector3(c[0] * g2, c[1] * g2, c[2] * g2);
if (st.talk > 0.01 && /:(MouthCorner)$/.test(k))
v.x += (P.side === "l" ? -1 : 1) * syl * 0.012 * R.sc;
var d = rbfaceLocal(P, F, v), b = P.b;
if (P.last && b.position.equals(P.lastSet))
b.position.sub(P.last);
b.position.add(d);
P.last = d;
P.lastSet = b.position.clone();
});
if (R.jaw) {
var P = R.jaw, b = P.b, ang = st.jaw + syl;
var qd = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), ang), rb = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().extractRotation(F.Rinv)), rbi = rb.clone().invert();
var qb = rb.clone().multiply(qd).multiply(rbi), ql = P.pqInv.clone().multiply(qb).multiply(P.pq);
if (P.lastQ && b.quaternion.equals(P.lastQSet))
b.quaternion.copy(P.base);
else
P.base = b.quaternion.clone();
b.quaternion.premultiply(ql);
P.lastQ = ql;
P.lastQSet = b.quaternion.clone();
}
},
function (id, kind, name) {
var r = rbfaceEmo0.apply(this, arguments);
try {
var g = typeof togFigure === "function" ? togFigure(id) : null, m = { laugh: "laugh", cheer: "happy", clap: "happy", wave: "happy", heart: "happy", bow: "happy", shrug: "puzzled", dance: "happy" }[kind];
if (g && m)
rbFace(g, m, (TOG_EMO[kind] && TOG_EMO[kind].len) || 3, kind === "bow" ? 0.5 : 1);
}
catch (e) { }
return r;
}
];
});
