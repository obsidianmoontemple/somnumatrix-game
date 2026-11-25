/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var RB_SKIN = { "business_female_01": 0x9D6742, "business_male_01": 0xB08073, "business_male_02": 0xC1906D, "chef_female_01": 0x947C6A, "construction_female_01": 0x9F8775, "construction_male_01": 0xB27158, "delivery_male_01": 0x6C4435, "female_adult_01": 0xBE8864, "female_adult_02": 0xBE876A, "female_adult_03": 0xB87B5F, "female_adult_04": 0xA98F7E, "female_adult_05": 0xBB8162, "female_adult_06": 0xD3D1CF, "female_adult_07": 0xBD8268, "female_adult_08": 0xCC7A70, "female_adult_09": 0xBC7B5C, "female_adult_10": 0xC88A5C, "female_adult_11": 0xC1895E, "female_adult_12": 0xBF8561, "female_adult_13": 0xBA8565, "female_adult_14": 0xC88262, "female_adult_15": 0x957E6F, "female_adult_16": 0x63729A, "female_adult_17": 0xC28568, "female_child_01": 0xAF7857, "female_child_02": 0x956441, "fire_female_01": 0x70402D, "fire_male_01": 0x9C654F, "gardener_male_01": 0xAA7961, "male_adult_01": 0xA98877, "male_adult_02": 0xBC876B, "male_adult_03": 0xB6745E, "male_adult_04": 0x6B4734, "male_adult_05": 0xB9756C, "male_adult_06": 0xB57E5E, "male_adult_07": 0xA7734D, "male_adult_08": 0xBA7C5B, "male_adult_09": 0xC2866B, "male_adult_10": 0xB77E58, "male_adult_11": 0xD78869, "male_adult_12": 0x4E382D, "male_adult_13": 0xBB836E, "male_adult_14": 0x917866, "male_adult_15": 0x93673A, "male_adult_16": 0xC49277, "male_adult_17": 0x7C5335, "male_adult_18": 0x43271A, "male_adult_19": 0x412E22, "male_adult_20": 0x9C7562, "male_adult_21": 0x815D3E, "male_child_01": 0xBA8062, "male_child_02": 0x4A372F, "medical_female_01": 0xC08774, "medical_male_01": 0xAB7053, "military_female_01": 0xA9765E, "military_male_01": 0x4E2E21, "pilot_female_01": 0xB4775A, "pilot_male_01": 0xAC6E57, "police_female_01": 0x262626, "police_male_01": 0x704E32, "security_female_01": 0xB6835F, "security_male_01": 0xAB7863, "sports_female_01": 0xBC8963, "sports_male_01": 0xB77863, "wood_male_01": 0x804E37 };
var RB = { dir: "rocketbox/", mask: {}, maskSrc: {}, mats: {}, tex: {}, n: 0,
list: [] };
(function () {
var A = function (sex, n) { for (var i = 1; i <= n; i++)
RB.list.push({ f: (sex === "f" ? "female" : "male") + "_adult_" + (i < 10 ? "0" : "") + i, sex: sex, child: false, job: "" }); };
A("f", 17);
A("m", 21);
["female_child_01", "female_child_02", "male_child_01", "male_child_02"].forEach(function (f) { RB.list.push({ f: f, sex: f[0] === "f" ? "f" : "m", child: true, job: "" }); });
[["business", "f", 1], ["business", "m", 2], ["chef", "f", 1], ["construction", "f", 1], ["construction", "m", 1], ["delivery", "m", 1], ["fire", "f", 1], ["fire", "m", 1],
["gardener", "m", 1], ["medical", "f", 1], ["medical", "m", 1], ["military", "f", 1], ["military", "m", 1], ["pilot", "f", 1], ["pilot", "m", 1], ["police", "f", 1], ["police", "m", 1],
["security", "f", 1], ["security", "m", 1], ["sports", "f", 1], ["sports", "m", 1], ["wood", "m", 1]].forEach(function (j) {
for (var i = 1; i <= j[2]; i++)
RB.list.push({ f: j[0] + "_" + (j[1] === "f" ? "female" : "male") + "_0" + i, sex: j[1], child: false, job: j[0] });
});
var BEARD = /^(male_adult_0[345]|male_adult_1[579]|construction_male_01|delivery_male_01|gardener_male_01|police_male_01|wood_male_01)$/;
RB.list.forEach(function (r) { r.beard = BEARD.test(r.f); });
var SKIRT = /^(female_adult_0[26]|female_adult_1[0156])$/;
RB.list.forEach(function (r) { r.skirt = SKIRT.test(r.f); r.skirtTop = r.f === "female_adult_02"; });
})();
var RB_JOBS = [[/cabin crew|flight attendant|steward|purser|shuttle captain|first officer|co-?pilot|aircrew|air crew/, "pilot"], [/police|officer|sheriff|constable|detective|cop\b/, "police"], [/guard|security|bouncer|warden/, "security"], [/fire/, "fire"],
[/doctor|nurse|medic|paramedic|surgeon|healer|hospital/, "medical"], [/chef|cook|baker/, "chef"], [/build|construct|mason|worker|road crew|repair crew|work crew|dock crew|engineer|mechanic/, "construction"],
[/pilot|aviat|flight/, "pilot"], [/soldier|military|army|marine|captain|sergeant|general/, "military"], [/garden|farmer|grower|ranger/, "gardener"],
[/deliver|courier|post|mail|driver|rider/, "delivery"], [/banker|business|clerk|office|manager|lawyer|mayor|broker|executive|ceo|director/, "business"],
[/athlete|coach|sport|player|runner/, "sports"], [/lumber|woodcutter|carpenter/, "wood"]];
function rbJob(spec, L) {
var t = [spec && spec.role, spec && spec.job, spec && spec.title, L && L.role, spec && spec.label].filter(Boolean).join(" ").toLowerCase();
if (!t)
return "";
for (var i = 0; i < RB_JOBS.length; i++)
if (RB_JOBS[i][0].test(t))
return RB_JOBS[i][1];
return "";
}
function rbWanted() { return !window.RB_OFF && typeof HDF !== "undefined"; }
function rbMix(h) { h = h >>> 0; h ^= h >>> 16; h = Math.imul(h, 0x7feb352d) >>> 0; h ^= h >>> 15; h = Math.imul(h, 0x846ca68b) >>> 0; h ^= h >>> 16; return h >>> 0; }
function rbPick(spec, L, child, beard) {
var sex = L.sex === "m" ? "m" : "f", job = (child || spec.deity) ? "" : rbJob(spec, L), h = hdfHash(spec.id || spec.name || "x");
var pool = RB.list.filter(function (r) { return r.sex === sex && r.child === !!child && r.job === job; });
if (!pool.length && job)
pool = RB.list.filter(function (r) { return r.job === job; });
if (!pool.length)
pool = RB.list.filter(function (r) { return r.sex === sex && r.child === !!child && !r.job; });
if (!child) {
var wantSkirt = L.bottomKind === "skirt" || L.topKind === "dress";
var sk = pool.filter(function (r) { return wantSkirt ? (r.skirt && !r.skirtTop) : !r.skirt; });
if (sk.length)
pool = sk;
}
var hatted = L.hat && L.hat !== "none";
var cov = pool.filter(function (r) { return !(r.f === "female_adult_16" || (hatted && r.f === "female_adult_06")); });
if (cov.length)
pool = cov;
if (sex === "m" && !child) {
var bp = pool.filter(function (r) { return r.beard === !!beard; });
if (bp.length)
pool = bp;
}
if (L.skin != null && typeof RB_SKIN !== "undefined" && pool.length > 2) {
var want = new THREE.Color(L.skin);
var d = function (r) { var c = RB_SKIN[r.f]; if (c == null)
return 9; var k = new THREE.Color(c); return Math.abs(k.r - want.r) * 0.3 + Math.abs(k.g - want.g) * 0.6 + Math.abs(k.b - want.b) * 0.1; };
pool = pool.slice().sort(function (a, b) { return d(a) - d(b); }).slice(0, Math.max(6, Math.ceil(pool.length * 0.5)));
}
if (typeof LITE !== "undefined" && LITE && pool.length > 5 && !job)
pool = pool.slice(0, 5);
return pool[rbMix(h) % pool.length];
}
var RB_CLIPS = { idle: "idle", walk: "walk", run: "run", sit: "sit", drive: "sit" };
HDF_CLIPS.rbm = Object.assign({ from: "rocketbox/anims-m.glb" }, RB_CLIPS);
HDF_CLIPS.rbf = Object.assign({ from: "rocketbox/anims-f.glb" }, RB_CLIPS);
if (typeof hdfPlan === "function") {
var rbPlan0 = hdfPlan;
hdfPlan = function (spec) {
var p = rbPlan0.apply(this, arguments);
try {
if (!rbWanted() || !p || p.type !== "human" || hdfFolk(spec) || spec.wCostume)
return p;
if (spec.deity && !(p.L && p.L.dgxDress))
return p;
var L = p.L, r = rbPick(spec, L, p.child, (p.parts || []).some(function (x) { return /beard/.test(x); }));
if (!r)
return p;
var f = RB.dir + r.f + ".glb", set = r.sex === "m" ? "rbm" : "rbf";
return { type: "own", files: [f, HDF_CLIPS[set].from], main: f, set: set, L: L, rb: r, child: p.child,
key: "rb:" + f + ":" + L.skin + ":" + L.hair + ":" + L.top + ":" + L.bottom + ":" + L.shoes + (L.dgxDress ? ":dgx:" + L.dgxDress : "") };
}
catch (e) {
return p;
}
};
}
if (typeof hdfFile === "function") {
var rbFile0 = hdfFile;
hdfFile = function (file, cb) {
if (String(file).indexOf(RB.dir) !== 0)
return rbFile0.apply(this, arguments);
var F = HDF.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = HDF.files[file] = { scene: null, clips: [], bad: false, wait: [cb] };
if (typeof modelsLoader !== "function") {
F.bad = true;
return;
}
modelsLoader(function (Ld) {
Ld.load(HDF.base + file, function (gl) {
gl.scene.traverse(function (m) {
var u = m.userData;
if (u) {
delete u.transformData;
if (u.rbMask) {
RB.maskSrc[file + ":" + (u.rbKind || "body")] = u.rbMask;
delete u.rbMask;
}
delete u.rbSkin;
}
if (!m.isMesh)
return;
if (m.userData && m.userData.rbKind === "opacity")
m.userData.hdfHair = 1;
m.material = rbBaseMat(m, file);
m.castShadow = true;
m.receiveShadow = true;
m.frustumCulled = false;
});
try {
rbUpright(gl.scene);
}
catch (e) {
if (window.console)
console.warn("[people] upright", file, e);
}
F.scene = gl.scene;
F.clips = (gl.animations || []).map(function (c) { c.tracks = c.tracks.filter(function (t) { return !/MotionExtraction/.test(t.name); }); rbInPlace(c); return c; });
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[people]", file, e);
} });
}, undefined, function () { F.bad = true; F.wait = []; });
});
};
}
function rbInPlace(c) {
(c.tracks || []).forEach(function (t) {
if (!/\.position$/.test(t.name) || !/^(Bip01|pelvis|Hips|root)$/i.test(t.name.split(".")[0]))
return;
var T = t.times, V = t.values, n = T && T.length;
if (!n || n < 2 || V.length !== n * 3)
return;
var t0 = T[0], span = (T[n - 1] - t0) || 1, dx = V[n * 3 - 3] - V[0], dy = V[n * 3 - 2] - V[1], dz = V[n * 3 - 1] - V[2];
for (var i = 0; i < n; i++) {
var f = (T[i] - t0) / span;
V[i * 3] -= dx * f;
V[i * 3 + 1] -= dy * f;
V[i * 3 + 2] -= dz * f;
}
});
}
function rbUpright(scene) {
scene.traverse(function (m) {
if (!m.isSkinnedMesh || !m.skeleton || m.geometry.userData.rbUp || m.skeleton.rbUp)
return;
var S = m.skeleton, at = {}, mt = new THREE.Matrix4();
S.bones.forEach(function (b, i) { if (!at[b.name])
at[b.name] = new THREE.Vector3().setFromMatrixPosition(mt.copy(S.boneInverses[i]).invert()); });
var hd = at.Head, pv = at.pelvis, cl = at.clavicle_l || at.upperarm_l, cr = at.clavicle_r || at.upperarm_r, fl = at.ball_l || at.foot_l, fr = at.ball_r || at.foot_r;
if (!hd || !pv || !cl || !cr || !fl)
return;
var up = hd.clone().sub(pv).normalize(), left = cl.clone().sub(cr);
left.addScaledVector(up, -left.dot(up)).normalize();
var fwd = new THREE.Vector3().crossVectors(left, up).normalize();
var R = new THREE.Matrix4().makeBasis(left, up, fwd).transpose();
var h = hd.clone().sub(fl).dot(up), s = h > 10 ? 0.01 : 1;
var foot = Math.min(fl.clone().applyMatrix4(R).y, (fr || fl).clone().applyMatrix4(R).y), mid = pv.clone().applyMatrix4(R);
var M = new THREE.Matrix4().makeScale(s, s, s).multiply(new THREE.Matrix4().makeTranslation(-mid.x, -foot, -mid.z)).multiply(R);
var Mi = M.clone().invert(), B = m.bindMatrix, Bi = m.bindMatrixInverse;
var Ml = new THREE.Matrix4().multiplyMatrices(Bi, M).multiply(B);
m.geometry.applyMatrix4(Ml);
m.geometry.userData.rbUp = 1;
S.boneInverses.forEach(function (q) { q.multiply(Mi); });
S.rbUp = 1;
});
}
function rbShrink(t, kind) {
if (!t || !t.image || t.__rbShrunk)
return t;
var lite = typeof LITE !== "undefined" && LITE, phone = typeof GFX_PHONE !== "undefined" && GFX_PHONE;
var want = kind === "normal" ? (lite || phone ? 0 : 256) : (lite ? 256 : phone ? 512 : 512);
if (!want)
return null;
var im = t.image;
if (!(im.width > want)) {
t.__rbShrunk = 1;
return t;
}
try {
var c = document.createElement("canvas");
c.width = c.height = want;
var x = c.getContext("2d");
x.imageSmoothingQuality = "high";
x.drawImage(im, 0, 0, want, want);
var n = new THREE.CanvasTexture(c);
n.flipY = t.flipY;
n.encoding = t.encoding;
n.wrapS = t.wrapS;
n.wrapT = t.wrapT;
n.anisotropy = 4;
n.__rbShrunk = 1;
if (t.dispose)
t.dispose();
if (im.close)
im.close();
return n;
}
catch (e) {
return t;
}
}
function rbBaseMat(m, file) {
var x = m.material, ud = m.userData || {}, kind = ud.rbKind || "body";
var M = new THREE.MeshStandardMaterial({ map: rbShrink(x.map, "map"), normalMap: rbShrink(x.normalMap, "normal"), roughness: kind === "head" ? 0.58 : 0.85, metalness: 0, skinning: true,
alphaTest: x.alphaTest || 0, side: kind === "opacity" ? THREE.DoubleSide : THREE.FrontSide });
if (M.normalMap)
M.normalScale = new THREE.Vector2(0.8, 0.8);
M.name = "rb-" + kind;
M.userData.realSoft = 1;
if (kind === "head")
M.userData.realSkin = 1;
M.userData.rb = { file: file, kind: kind, mean: ud.rbMean || [0, 0, 0, 0, 0, 0], all: ud.rbAll || 0, mask: RB.maskSrc[file + ":" + kind] ? file + ":" + kind : null };
return M;
}
function rbMaskTex(key) {
if (RB.mask[key])
return RB.mask[key];
var url = RB.maskSrc[key];
if (!url)
return null;
var t = new THREE.DataTexture(new Uint8Array(1), 1, 1, THREE.LuminanceFormat);
t.magFilter = t.minFilter = THREE.NearestFilter;
t.generateMipmaps = false;
t.flipY = false;
t.unpackAlignment = 1;
var im = new Image();
im.onload = function () {
try {
var w = im.width, h = im.height, c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d", { willReadFrequently: true });
x.drawImage(im, 0, 0);
var d = x.getImageData(0, 0, w, h).data, L = new Uint8Array(w * h);
for (var y = 0; y < h; y++) {
var src = (h - 1 - y) * w * 4, dst = y * w;
for (var i = 0; i < w; i++)
L[dst + i] = d[src + i * 4];
}
t.image = { data: L, width: w, height: h };
t.needsUpdate = true;
}
catch (e) {
if (window.console)
console.warn("[real people] mask", key, e);
}
};
im.src = url;
RB.mask[key] = t;
return t;
}
var RB_DYE_SRC = [
"#ifdef RB_DYE",
"#ifndef RB_SKINMIX",
"#define RB_SKINMIX 0.55",
"#endif",
"#ifndef RB_BAREN",
"#define RB_BAREN 3",
"#endif",
"{ float rbC=RB_ALL>0.5?RB_ALL:floor(texture2D(rbMask,vUv).r*255.0/40.0+0.5);",
"  #ifdef RB_SCALP",
"  if(vRbScalp>0.5) rbC=5.0;",
"  #endif",
"  #ifdef RB_BAREBODY",
"  if(rbC<0.5) rbC=1.0;",
"  #endif",
"  if(abs(rbC-2.0)<0.5&&vRbY<rbHem){ float lh=dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)); float kh=clamp(lh/max(rbM[2],0.004),0.0,2.6);",
"    diffuseColor.rgb=mix(rbS,rbT[3].a>0.5?rbT[3].rgb:rbS,RB_SKINMIX)*(0.9+0.1*kh); rbC=-9.0; }",
"  for(int i=1;i<=5;i++){ if(abs(rbC-float(i))<0.5&&rbT[i-1].a>0.5){",
"    float l=dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)); float k=clamp(l/max(rbM[i],0.004),0.0,2.6);",
"    vec3 d=rbT[i-1].rgb*k;",
"    #ifdef RB_BALD",
"    if(i==5) d=rbT[4].rgb*(0.9+0.1*min(k,1.4));",
"    #endif",
"    #ifdef RB_BARE",
"    if(i<=RB_BAREN) d=mix(rbS,rbT[3].rgb,RB_SKINMIX)*(0.92+0.08*k);",
"    #endif",
"    diffuseColor.rgb=(i==4)?mix(diffuseColor.rgb,d,RB_SKINMIX):d; } }",
"  if(vRbHand>0.5&&rbGlove.a>0.5){ float lg=dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)); diffuseColor.rgb=rbGlove.rgb*(0.7+0.5*clamp(lg/max(rbM[4],0.004),0.0,1.4)); } }",
"#endif"
].join("\n");
var RB_NOHAIR = /^(construction_male_01|fire_female_01|police_female_01|female_adult_06|female_child_02)$/;
function rbLin(h) { if (h == null)
return null; var c = new THREE.Color(h); c.convertSRGBToLinear(); return new THREE.Vector4(c.r, c.g, c.b, 1); }
function rbOwnSkin(file) {
var k = String(file || "").replace(/^.*\//, "").replace(/\.glb$/, ""), h = typeof RB_SKIN !== "undefined" ? RB_SKIN[k] : null;
var c = new THREE.Color(h != null ? h : 0xB08070);
c.convertSRGBToLinear();
return new THREE.Vector3(c.r, c.g, c.b);
}
function rbDress(root, plan) {
var L = plan.L || {}, uni = !!(plan.rb && plan.rb.job);
var bare = !!L.dgxDress || !!plan.mh;
var sc = L.skin != null ? new THREE.Color(L.skin) : null, odd = bare && sc && (sc.b > sc.r || sc.g > sc.r * 1.02 || sc.r > sc.g * 2.2);
var T = (bare ? [L.skin, L.skin, L.skin, L.skin, L.hair] : [uni ? null : L.top, uni ? null : L.bottom, uni ? null : L.shoes, L.skin, L.hair]).map(rbLin);
if (plan.rb && RB_NOHAIR.test(plan.rb.f))
T[4] = null;
var none = new THREE.Vector4(0, 0, 0, 0);
root.traverse(function (m) {
if (!m.isMesh || !m.material || !m.material.userData || !m.material.userData.rb)
return;
var B = m.material, info = B.userData.rb;
if (!T.some(Boolean))
return;
var M = B.clone();
M.userData = Object.assign({}, B.userData);
M.skinning = true;
var mean = info.mean.map(function (v) { return Math.pow(Math.max(v, 0.02), 2.2); });
var U = { rbMask: { value: info.mask ? rbMaskTex(info.mask) : null }, rbT: { value: T.map(function (v) { return v || none; }) }, rbM: { value: mean.slice(0, 6) }, rbS: { value: rbOwnSkin(info.file) },
rbHem: { value: -99 }, rbGlove: { value: new THREE.Vector4(0, 0, 0, 0) } };
M.userData.rbU = U;
M.defines = Object.assign({}, M.defines || {}, { RB_DYE: "", RB_ALL: (info.all || 0).toFixed(1) });
if (odd)
M.defines.RB_SKINMIX = "0.95";
if (bare) {
M.defines.RB_BARE = "";
if (info.kind === "body") {
M.normalMap = null;
M.defines.RB_BAREBODY = "";
}
}
M.onBeforeCompile = function (sh) {
Object.assign(sh.uniforms, U);
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nattribute float rbHand; varying float vRbY; varying float vRbHand;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvRbY=position.y; vRbHand=rbHand;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform sampler2D rbMask; uniform vec4 rbT[5]; uniform float rbM[6]; uniform vec3 rbS; uniform float rbHem; uniform vec4 rbGlove; varying float vRbY; varying float vRbHand;")
.replace("#include <color_fragment>", "#include <color_fragment>\n" + RB_DYE_SRC);
};
M.customProgramCacheKey = function () { return "rbdye" + (info.all ? "a" : "") + (bare ? (info.kind === "body" ? "bb" : "b") : "") + (odd ? "o" : ""); };
m.material = M;
RB.n++;
});
}
if (typeof hdfAssemble === "function") {
var rbAssemble0 = hdfAssemble;
hdfAssemble = function (plan, files) {
var A = rbAssemble0.apply(this, arguments);
if (plan && plan.rb) {
A.root.userData.rbBody = 1;
try {
rbDress(A.root, plan);
}
catch (e) {
if (window.console)
console.warn("[real people]", e);
}
}
return A;
};
}
if (typeof hdfFitScale === "function") {
var rbFit0 = hdfFitScale;
hdfFitScale = function (root) {
if (!root || !root.userData || !root.userData.rbBody)
return rbFit0.apply(this, arguments);
root.updateMatrixWorld(true);
var B = {};
root.traverse(function (o) { if (o.isBone && /^(Head|ball_l|ball_r|foot_l|foot_r|pelvis|neck_01)$/.test(o.name) && !B[o.name])
B[o.name] = new THREE.Vector3().setFromMatrixPosition(o.matrixWorld); });
var b = new THREE.Box3();
if (B.Head && (B.ball_l || B.foot_l) && B.pelvis && B.neck_01) {
var foot = Math.min((B.ball_l || B.foot_l).y, (B.ball_r || B.foot_r || B.ball_l || B.foot_l).y), neck = B.Head.distanceTo(B.neck_01);
var top = B.Head.y + neck * 2.4, bot = foot - neck * 0.25, w = (top - bot) * 0.12;
b.min.set(B.pelvis.x - w, bot, B.pelvis.z - w);
b.max.set(B.pelvis.x + w, top, B.pelvis.z + w);
}
return b.isEmpty() ? rbFit0.apply(this, arguments) : b;
};
}
if (typeof whDress === "function") {
var rbWh0 = whDress;
whDress = function (E) { if (window.RB_HAIR_OFF && E && E.plan && E.plan.rb && !(E.plan.L && E.plan.L.dgxDress)) {
E.wh = 1;
return;
} return rbWh0.apply(this, arguments); };
}
if (typeof hfHead === "function") {
var rbHead0 = hfHead;
hfHead = function (E) {
if (!E || !E.plan || !E.plan.rb || !E.model)
return rbHead0.apply(this, arguments);
var ren = [];
E.model.traverse(function (m) { var u = m.isSkinnedMesh && m.material && m.material.userData && m.material.userData.rb; if (u && u.kind === "body") {
ren.push([m, m.name]);
m.name = "rb-neck-cap";
} });
var H;
try {
H = rbHead0.apply(this, arguments);
}
finally {
ren.forEach(function (q) { q[0].name = q[1]; });
}
if (H && H.pts) {
var keep = H.pts.filter(function (p) { return Math.hypot(p.x - H.cx, p.z - H.cz) < 0.125; });
if (keep.length > 30) {
H.pts.length = 0;
Array.prototype.push.apply(H.pts, keep);
var fs = H.face.filter(function (p) { return Math.hypot(p.x - H.cx, p.z - H.cz) < 0.125; });
H.face.length = 0;
Array.prototype.push.apply(H.face, fs);
H.ymin = 1e9;
H.ymax = -1e9;
H.pts.forEach(function (p) { if (p.y > H.ymax)
H.ymax = p.y; if (p.y < H.ymin)
H.ymin = p.y; });
}
}
return H;
};
}
function rbEyePatch(E) {
var ic = (E.icons || []).filter(function (q) { return q.o && q.o.userData && q.o.userData.dpPatch && q.o.userData.dpBand; })[0];
if (!ic)
return;
var H = hfHead(E);
if (!H)
return;
try {
var top = H.ymax, chin = 1e9;
H.face.forEach(function (p) { if (p.y < chin)
chin = p.y; });
if (!(chin < top))
return;
var ey = chin + (top - chin) * 0.5, fz = -1e9;
H.face.forEach(function (p) { if (Math.abs(p.y - ey) < 0.015 && Math.abs(p.x - H.cx + 0.033) < 0.015 && p.z > fz)
fz = p.z; });
if (!(fz > -1e8))
return;
var hb = H.hb, w = H.G.localToWorld(new THREE.Vector3(H.cx - 0.033, ey, fz + 0.004)), o = ic.o, band = o.userData.dpBand;
hb.worldToLocal(w);
o.position.copy(w);
band.visible = false;
var cz = H.cz, R = H.ring(ey + 0.01, 40), a0 = Math.atan2(fz - cz, -0.033), a1 = Math.PI * 2.5 - 0.75, pts = [];
for (var i = 0; i <= 28; i++) {
var a = a0 + (a1 - a0) * i / 28, r = H.at(R, a) + 0.005, back = Math.max(0, -Math.sin(a));
pts.push(hb.worldToLocal(H.G.localToWorld(new THREE.Vector3(H.cx + Math.cos(a) * r, ey + 0.012 + 0.03 * back, cz + Math.sin(a) * r))));
}
if (E.rbStrap && E.rbStrap.parent)
E.rbStrap.parent.remove(E.rbStrap);
var st = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.004 / Math.max(1e-4, hb.getWorldScale(new THREE.Vector3()).y / E.g.children[0].getWorldScale(new THREE.Vector3()).y), 4, false), o.material);
st.raycast = function () { };
hb.add(st);
E.rbStrap = st;
}
finally {
if (H.G.parent)
H.G.parent.remove(H.G);
}
}
if (typeof hdfAttach === "function") {
var rbAtt0 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt0.apply(this, arguments); try {
if (E && E.model && E.plan && E.plan.rb)
rbEyePatch(E);
}
catch (e) { } return r; };
}
if (typeof hdfDetach === "function") {
var rbDet0 = hdfDetach;
hdfDetach = function (E) { try {
if (E && E.rbStrap) {
if (E.rbStrap.parent)
E.rbStrap.parent.remove(E.rbStrap);
E.rbStrap.geometry.dispose();
E.rbStrap = null;
}
}
catch (e) { } return rbDet0.apply(this, arguments); };
}
function rbGodThings(E) {
if (!E || !E.spec || !E.spec.deity || !E.hid || !E.g)
return;
var keep = new Set();
(E.icons || []).forEach(function (ic) { if (ic.o)
ic.o.traverse(function (m) { keep.add(m); }); });
var body = E.g.children[0];
if (body)
body.children.forEach(function (w) { if (w.userData && w.userData.wing)
w.traverse(function (m) { keep.add(m); }); });
E.hid = E.hid.filter(function (m) { if (keep.has(m)) {
m.visible = true;
return false;
} return true; });
}
if (typeof hdfAttach === "function") {
var rbAtt1 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt1.apply(this, arguments); try {
if (E && E.model && E.plan && E.plan.rb)
rbGodThings(E);
}
catch (e) {
if (window.console)
console.warn("[real people] god things", e);
} return r; };
}
function rbBshBind(root, F) {
var T = F ? bshBindScales(F) : null, inv = new THREE.Matrix4(), M = new THREE.Matrix4(), A = new THREE.Matrix4(), Tm = new THREE.Matrix4();
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.skeleton)
return;
var sk = m.skeleton;
if (!sk.bshInv0) {
if (!T)
return;
sk.bshInv0 = sk.boneInverses;
sk.boneInverses = sk.boneInverses.map(function (q) { return q.clone(); });
}
var I0 = sk.bshInv0, at = sk.rbBshAt;
if (!at) {
at = sk.rbBshAt = {};
sk.bones.forEach(function (b, i) { if (b && !at[b.name])
at[b.name] = new THREE.Vector3().setFromMatrixPosition(inv.copy(I0[i]).invert()); });
}
for (var i = 0; i < sk.bones.length; i++) {
var b = sk.bones[i], t = T && b && T[b.name];
sk.boneInverses[i].copy(I0[i]);
if (!t || (t[0] === 1 && t[1] === 1 && t[2] === 1))
continue;
var c = at[b.name], kid = null;
b.children.forEach(function (k) { if (!kid && k.isBone && at[k.name] && at[k.name].distanceTo(c) > 1e-4)
kid = at[k.name]; });
var u = kid ? kid.clone().sub(c).normalize() : new THREE.Vector3(0, 1, 0);
var side = new THREE.Vector3(1, 0, 0);
if (Math.abs(side.dot(u)) > 0.8)
side.set(0, 0, 1);
side.addScaledVector(u, -side.dot(u)).normalize();
var w = new THREE.Vector3().crossVectors(side, u).normalize();
var e = A.elements, S = [[side, t[0]], [u, t[1]], [w, t[2]]];
for (var r = 0; r < 3; r++)
for (var q = 0; q < 3; q++) {
var v = 0;
S.forEach(function (p) { var a = p[0].toArray(); v += a[r] * a[q] * p[1]; });
e[q * 4 + r] = v;
}
e[3] = e[7] = e[11] = e[12] = e[13] = e[14] = 0;
e[15] = 1;
M.makeTranslation(c.x, c.y, c.z).multiply(A).multiply(Tm.makeTranslation(-c.x, -c.y, -c.z));
sk.boneInverses[i].multiply(M);
}
});
}
if (typeof bshApply === "function" && typeof bshBindScales === "function") {
var rbBsh0 = bshApply;
bshApply = function (E) {
if (!E || !E.model || !E.plan || !E.plan.rb || (E.plan.L && E.plan.L.dgxDress))
return rbBsh0.apply(this, arguments);
try {
var S = bshFor(E.spec, E.plan.L), F = S ? bshFac(S) : null;
rbBshBind(E.model, F);
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
catch (e) {
if (window.console)
console.warn("[real people] shape", e);
}
};
}
function rbOverlays(E) {
var g = E.g, body = g.children[0], out = [];
g.children.forEach(function (m) {
if (m === body || !m.isMesh || !m.visible || (m.userData && m.userData.hdf))
return;
var G = m.geometry, cyl = G && G.type === "CylinderGeometry", hv = m.userData && m.userData.hiVis;
if (!hv && !(cyl && G.parameters.openEnded && m.position.y > 0.8 && m.position.y < 1.7 && Math.abs(m.position.x) < 0.3 && Math.abs(m.position.z) < 0.3))
return;
out.push(m);
});
return out;
}
function rbWearOverlays(E) {
if (!E || !E.model || !E.plan || !E.plan.rb || !E.g)
return;
var L = rbOverlays(E);
if (!L.length)
return;
var m = L[0], col = m.userData.hiVis != null ? m.userData.hiVis : (m.material && m.material.color ? m.material.color.getHex() : null);
E.hid = E.hid || [];
L.forEach(function (o) { o.visible = false; E.hid.push(o); });
if (col == null)
return;
var v = rbLin(col);
E.model.traverse(function (x) { var U = x.isMesh && x.material && x.material.userData && x.material.userData.rbU; if (U)
U.rbT.value[0] = v; });
}
if (typeof hdfAttach === "function") {
var rbAtt2 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt2.apply(this, arguments); try {
rbWearOverlays(E);
}
catch (e) {
if (window.console)
console.warn("[real people] over", e);
} return r; };
}
function rbChildHead(E) {
if (!E || !E.model || !E.plan || !E.plan.rb || !E.plan.rb.child || !E.mixer || E.mixer.rbKid)
return;
var hb = null;
E.model.traverse(function (b) { if (!hb && b.isBone && /^head$/i.test(b.name))
hb = b; });
if (!hb)
return;
var mu = E.mixer.update;
E.mixer.rbKid = 1;
E.mixer.update = function (t) { var r = mu.call(this, t); hb.scale.setScalar(1); return r; };
hb.scale.setScalar(1);
}
if (typeof hdfAttach === "function") {
var rbAtt3 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt3.apply(this, arguments); try {
rbChildHead(E);
}
catch (e) { } return r; };
}
function rbRaceThings(E) {
if (!E || !E.model || !E.plan || !E.plan.rb || !E.hid || !E.hid.length)
return;
var feat = function (m) { for (var p = m; p && p !== E.g; p = p.parent)
if (p.userData && p.userData.spFeat)
return true; return false; };
E.hid = E.hid.filter(function (m) { if (feat(m)) {
m.visible = true;
return false;
} return true; });
}
if (typeof hdfAttach === "function") {
var rbAtt4 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt4.apply(this, arguments); try {
rbRaceThings(E);
}
catch (e) {
if (window.console)
console.warn("[real people] race", e);
} return r; };
}
var WORN = {
dragonwings: { label: "Dragon Wings", slot: "wings", price: 1800, mh: 1, scale: 0.7 },
dragonflywings: { label: "Dragonfly Wings", slot: "wings", price: 1200, mh: 1 },
butterflywings: { label: "Butterfly Wings", slot: "wings", price: 1200, mh: 1 },
faunhorns: { label: "Faun Horns", slot: "horns", price: 600, mh: 1, off: [0, 0.065, 0.01], scale: 0.88 },
minotaurhorns: { label: "Minotaur Horns", slot: "horns", price: 700, mh: 1, off: [0, 0.08, 0] },
gazellehorns: { label: "Gazelle Horns", slot: "horns", price: 600, mh: 1 },
gazellehorns2: { label: "Antelope Horns", slot: "horns", price: 600, mh: 1 },
deerantlers: { label: "Deer Antlers", slot: "horns", price: 800, mh: 1, off: [0, -0.03, 0] },
mooseantlers: { label: "Moose Antlers", slot: "horns", price: 800, mh: 1, off: [0, -0.06, 0] },
longhorns: { label: "Longhorn Horns", slot: "horns", price: 700, mh: 1, off: [0, -0.05, 0] },
unicornhorn: { label: "Unicorn Horn", slot: "horns", price: 900, mh: 1, off: [0, -0.035, 0] },
deviltail: { label: "Devil Tail", slot: "tail", price: 500, mh: 1 },
foxtail: { label: "Fluffy Tail", slot: "tail", price: 600, mh: 1 },
angelwings: { label: "Angel Wings", slot: "wings", price: 1800, mh: 1 },
faewings: { label: "Fae Wings", slot: "wings", price: 1400, mh: 1 },
demonwings: { label: "Demon Wings", slot: "wings", price: 1600, mh: 1 },
batwings: { label: "Bat Wings", slot: "wings", price: 1600, mh: 1, dye: 0x3a2e34 },
fairywings: { label: "Fairy Wings", slot: "wings", price: 1200, mh: 1, dye: 0xcfeaff },
mechwings: { label: "Mechanical Wings", slot: "wings", price: 2000, mh: 1 },
bladewings: { label: "Blade Wings", slot: "wings", price: 2000, mh: 1 },
scorpiontail: { label: "Scorpion Tail", slot: "tail", price: 700, mh: 1 },
fluffytail: { label: "Fluffy Fox Tail", slot: "tail", price: 600, mh: 1 },
bluefoxtail: { label: "Fox Tail", slot: "tail", price: 600, mh: 1 },
cattail: { label: "Cat Tail", slot: "tail", price: 500, mh: 1 },
dragontail: { label: "Dragon Tail", slot: "tail", price: 700, mh: 1 }
};
var WORN_WAS = { angelic: "angelwings", demonbat: "demonwings", steamwings: "mechwings", phoenixwings: "dragonwings", frostwings: "dragonwings",
griffinwings: "dragonwings", voidwings: "batwings", insectwings: "dragonflywings", dragonfly: "dragonflywings",
ramhorns: "faunhorns", bighorn: "faunhorns", imphorns: "faunhorns", elkantlers: "deerantlers", fiendhorns: "gazellehorns",
prehensile: "deviltail", bonetail: "deviltail", curltail: "cattail", thorntail: "deviltail", feathertail: "fluffytail" };
function wornKey(k) { return WORN[k] ? k : WORN_WAS[k] || null; }
if (typeof wearOwned === "function") {
var wornOwn0 = wearOwned;
wearOwned = function (key) {
if (wornOwn0.apply(this, arguments))
return true;
if (!WORN[key])
return false;
var mine = (typeof myThings !== "undefined" && myThings) || [];
return Object.keys(WORN_WAS).some(function (o) { return WORN_WAS[o] === key && mine.some(function (t) { return t && t.archetype === "wear_" + o; }); });
};
}
var WORN_ROWS = [["wings", "Wings"], ["horns", "Horns"], ["tail", "Tail"]];
(function () {
if (typeof WEAR === "undefined")
return;
Object.keys(WORN).forEach(function (k) { var W = WORN[k]; if (!WEAR[k])
WEAR[k] = { slot: W.slot, label: W.label, price: W.price, worn: 1 }; });
})();
var WORN_SLOT = {
wings: { bone: /^(spine_03|spine2|chest|upperchest)$/i, size: 1.7, dim: "x", at: [0, 0.05, -0.2], turn: Math.PI, tilt: 0, depth: -0.7 },
horns: { bone: /^head$/i, size: 0.34, dim: "x", at: [0, 0.1, 0.03], turn: 0, tilt: 0, base: 1 },
tail: { bone: /^pelvis$/i, size: 0.8, dim: "y", at: [0, -0.02, -0.12], turn: 0, tilt: 0.9, hang: 1 }
};
var WORN_DIR = "assets/models/worn/", WORNF = {};
function wornOn() { return !window.WORN_OFF && typeof THREE !== "undefined" && typeof modelsLoader === "function"; }
function wornFile(key, cb) { return __ZC(441, 0, this, arguments, new.target); }
function wornPut(E, key, dye) { return __ZC(441, 1, this, arguments, new.target); }
var WORN_BEND = {
wings: 'uniform float uFlap,uSweep,uW; uniform vec3 uC;\n' +
'vec3 wornBend(vec3 v,bool pt){ vec3 p=position-uC; float sd=p.x<0.0?-1.0:1.0, d=abs(p.x)/uW, w=smoothstep(0.06,1.0,d);\n' +
'  float a=sd*uFlap*w, b=sd*uSweep*w*w; if(pt) v-=uC;\n' +
'  v=vec3(v.x*cos(a)-v.y*sin(a), v.x*sin(a)+v.y*cos(a), v.z);\n' +
'  v=vec3(v.x*cos(b)+v.z*sin(b), v.y, -v.x*sin(b)+v.z*cos(b));\n' +
'  if(pt) v+=uC; return v; }\n',
tail: 'uniform float uSw,uPh,uLift,uLen; uniform vec3 uC;\n' +
'vec3 wornBend(vec3 v,bool pt){ vec3 p=position-uC; float s=clamp(-p.y/uLen,0.0,1.0), w=s*s*(3.0-2.0*s);\n' +
'  float a=uSw*w*sin(uPh-s*2.6), b=uLift*w; if(pt) v-=uC;\n' +
'  v=vec3(v.x*cos(a)-v.y*sin(a), v.x*sin(a)+v.y*cos(a), v.z);\n' +
'  v=vec3(v.x, v.y*cos(b)-v.z*sin(b), v.y*sin(b)+v.z*cos(b));\n' +
'  if(pt) v+=uC; return v; }\n'
};
var WORN_COLOURS = [["", "As made"], [0x1b1b1f, "Black"], [0xf2efe8, "White"], [0x8e1b1b, "Blood red"], [0xd8452e, "Flame"], [0xd9a62e, "Gold"],
[0x9aa3ad, "Silver"], [0x8a5a2b, "Bronze"], [0x2f7d3a, "Green"], [0x2c8f8a, "Teal"], [0x2f5fbf, "Blue"], [0x6b3fb0, "Purple"], [0xd86aa8, "Pink"], [0x5a3a24, "Brown"]];
function wornBendMat(M, slot, U, dye) { return __ZC(441, 2, this, arguments, new.target); }
function wornDye(holder, m, dye) { return __ZC(441, 3, this, arguments, new.target); }
function wornLive(E, W, holder, m, box, dye) { return __ZC(441, 4, this, arguments, new.target); }
var WORN_HEADY = 1.6, WORN_MHA = { horns: [0, 0.72, 0.07], wings: [0, 0.28, 0], tail: [0, 0.02, 0] };
function wornPutMH(E, key, W, S, F, bone, dye) { return __ZC(441, 5, this, arguments, new.target); }
function wornWear(E) {
if (!wornOn() || !E || !E.model || E.worn)
return;
var L = (E.plan && E.plan.L) || (E.spec && E.spec.look) || {};
E.worn = [];
["wings", "horns", "tail"].forEach(function (sl) { var k = wornKey(L[sl]); if (k && WORN[k].slot === sl)
wornPut(E, k, +L[sl + "Color"] || WORN[k].dye || 0); });
}
function wornOff(E) { (E && E.worn || []).forEach(function (m) { if (m.parent)
m.parent.remove(m); (m.userData.wornMats || []).forEach(function (x) { x.dispose(); }); m.userData.wornMats = null; }); if (E)
E.worn = null; }
if (typeof hdfAttach === "function") {
var wornAtt0 = hdfAttach;
hdfAttach = function (E) { var r = wornAtt0.apply(this, arguments); try {
wornWear(E);
}
catch (e) {
if (window.console)
console.warn("[worn]", e);
} return r; };
}
if (typeof hdfDetach === "function") {
var wornDet0 = hdfDetach;
hdfDetach = function (E) { try {
wornOff(E);
}
catch (e) { } return wornDet0.apply(this, arguments); };
}
if (typeof renderWardrobe === "function") {
var wornWard0 = renderWardrobe;
renderWardrobe = function () { return __ZC(441, 6, this, arguments, new.target); };
}
var RBG = { geo: {}, tail: {}, mat: {}, n: 0 };
var RBG_FACES = { tripleface: [2.09, -2.09], twoface: [Math.PI], fourfaces: [Math.PI / 2, Math.PI, -Math.PI / 2] };
var RBG_SKULLFACE = { mictlantecuhtli: 1, baronsamedi: 1 };
function rbgForms(d) { return __ZC(441, 7, this, arguments, new.target); }
if (typeof hdfDeityOK === "function") {
var rbgOK0 = hdfDeityOK;
hdfDeityOK = function (spec) { return __ZC(441, 8, this, arguments, new.target); };
}
function rbgChain(b) { var out = []; b.traverse(function (x) { if (x.isBone)
out.push(x); }); return out; }
function rbgBoneCopy(b, tag, map) {
var c = new THREE.Bone();
c.name = b.name + "~" + tag;
c.position.copy(b.position);
c.quaternion.copy(b.quaternion);
c.scale.copy(b.scale);
map.push([b, c]);
b.children.forEach(function (k) { if (k.isBone)
c.add(rbgBoneCopy(k, tag, map)); });
return c;
}
function rbgPartGeo(m, names, key) { return __ZC(441, 9, this, arguments, new.target); }
function rbgCopyPart(E, root, tag, rotW, shiftW) { return __ZC(441, 10, this, arguments, new.target); }
function rbgSync(E) { return __ZC(441, 11, this, arguments, new.target); }
function rbgKitPieces(E) { return __ZC(441, 12, this, arguments, new.target); }
function rbgHome(E, q) { var body = E.g.children[0]; if (q.rec) {
body.add(q.o);
q.o.position.copy(q.rec.pos);
q.o.quaternion.copy(q.rec.quat);
q.o.scale.copy(q.rec.scale);
} }
function rbgOnto(E, q, bone) {
var body = E.g.children[0];
if (!q.rec) {
q.rec = { o: q.o, parent: body, pos: q.o.position.clone(), quat: q.o.quaternion.clone(), scale: q.o.scale.clone() };
(E.icons = E.icons || []).push(q.rec);
}
q.o.updateMatrixWorld(true);
bone.attach(q.o);
rbgShow(E, q.o);
}
function rbgShow(E, o) { var all = new Set(); o.traverse(function (m) { all.add(m); m.visible = true; }); if (E.hid)
E.hid = E.hid.filter(function (m) { return !all.has(m); }); }
function rbgHideObj(E, o) { o.traverse(function (m) { if (m.isMesh && m.visible) {
m.visible = false;
(E.rbgHid = E.rbgHid || []).push(m);
} }); }
function rbgHeadBox(E) { return __ZC(441, 13, this, arguments, new.target); }
function rbgKitHeadBox(body, kit) { return __ZC(441, 14, this, arguments, new.target); }
function rbgBone(E, re) { var hit = null; E.model.traverse(function (b) { if (!hit && b.isBone && re.test(b.name))
hit = b; }); return hit; }
function rbgBeastHead(E) { return __ZC(441, 15, this, arguments, new.target); }
function rbgFaces(E, angs) { return __ZC(441, 16, this, arguments, new.target); }
function rbgArms(E, extra) { return __ZC(441, 17, this, arguments, new.target); }
function rbgHold(E) { return __ZC(441, 18, this, arguments, new.target); }
function rbgHalf(E) { return __ZC(441, 19, this, arguments, new.target); }
function rbgTailTex() { return __ZC(441, 20, this, arguments, new.target); }
function rbgTailGeo(hipY) { return __ZC(441, 21, this, arguments, new.target); }
function rbgTailMat(col) {
var k = col >>> 0;
if (RBG.mat[k])
return RBG.mat[k];
var t = rbgTailTex();
var m = new THREE.MeshStandardMaterial({ color: col, map: t, bumpMap: t, bumpScale: 0.012, roughness: 0.45, metalness: 0.05 });
m.userData.realRough = 0.45;
return (RBG.mat[k] = m);
}
function rbgTail(E) { return __ZC(441, 22, this, arguments, new.target); }
function rbgOneHand(E) { var b = rbgBone(E, /^hand_r$/); if (b)
E.rbg.shrink.push(b); }
function rbgBindAt(m, re) { return __ZC(441, 23, this, arguments, new.target); }
function rbgSkull(E) { return __ZC(441, 24, this, arguments, new.target); }
var RBG_HEADS = {
bull: function () { return __ZC(441, 25, this, arguments, new.target); },
goat: function () { return __ZC(441, 26, this, arguments, new.target); },
fly: function () { return __ZC(441, 27, this, arguments, new.target); },
monkey: function () { return __ZC(441, 28, this, arguments, new.target); },
elephant: function () { return __ZC(441, 29, this, arguments, new.target); }
};
(function () {
if (typeof HEADS === "undefined" || typeof dgxEgg !== "function")
return;
Object.keys(RBG_HEADS).forEach(function (k) { var f = RBG_HEADS[k]; HEADS[k] = function () { var G = f(); G.userData.dgxBrow = 0.065; return G; }; });
})();
(function () {
if (typeof DGX_HW === "undefined" || !DGX_HW.kali || typeof dgxDome !== "function")
return;
var k0 = DGX_HW.kali;
DGX_HW.kali = function (H, G, o, d, L, kit) {
if (kit)
return k0.apply(this, arguments);
var hair = dgxDome(H, H.chinY - 0.06, 0.03, 0.03, dgxMat("fur", 0x0E0C10), { a0: Math.PI / 2 + 0.95, a1: Math.PI / 2 + Math.PI * 2 - 0.95, shape: function (r, a, t) { return r * (1.08 + 0.3 * (1 - t)) + 0.02 * Math.abs(Math.sin(a * 6)); } });
hair.material.side = THREE.DoubleSide;
hair.userData.dgxBand = 0;
hair.userData.dgxDrape = 1;
G.add(hair);
DGX_HW.kirita(H, G, { f: 1, low: 1 });
};
})();
(function () {
if (typeof DGX_GODS === "undefined" || typeof DGX_DRESS === "undefined")
return;
var want = { ra: "shendyt", thoth: "shendyt", set: "shendyt", sekhmet: "kalasiris", bastet: "kalasiris", sobek: "shendyt", taweret: "kalasiris", horus: "shendyt", anubis: "shendyt",
echidna: "peplos", hecate: "peplos", janus: "toga", nuwa: "hanfu", fuxi: "hanfu", sunwukong: "daopao", ganesha: "dhoti", hanuman: "dhoti", brahma: "dhoti", vishnu: "dhoti", shiva: "dhoti",
lakshmi: "sari", saraswati: "sari", durga: "sari", kali: "sari", mictlantecuhtli: "tilmatli", baronsamedi: "agbada", tyr: "mail", hel: "rubakha",
beelzebub: "infernal", bael: "infernal", moloch: "infernal", baphomet: "infernal" };
if (DGX_GODS.hel && DGX_GODS.hel.skin == null)
DGX_GODS.hel.skin = 0xE4C8B2;
var hw = { thor: "spangen", perun: "spangen", loki: "circlet", bragi: "circlet", njord: "circlet", ogma: "circlet", taranis: "circlet", prometheus: "circlet", lilith: "circlet",
anubis: "circlet", bastet: "circlet", hel: "hood", dagda: "hood", gwydion: "hood", cain: "hood", svarog: "skullcap", stribog: "furhood", maui: "feathers", tangaroa: "feathers" };
Object.keys(hw).forEach(function (k) { var g = DGX_GODS[k]; if (g && (!g.hw || !g.hw.length) && typeof DGX_HW !== "undefined" && DGX_HW[hw[k]])
g.hw = [[hw[k], {}]]; });
Object.keys(want).forEach(function (k) { if (typeof DEITY === "undefined" || !DEITY[k])
return; var g = DGX_GODS[k] || (DGX_GODS[k] = { hw: [] }); if (!g.dress && DGX_DRESS[want[k]])
g.dress = want[k]; });
})();
function rbgOn(E) {
if (!E || !E.model || !E.plan || !E.plan.rb || !E.spec || !E.spec.deity || E.rbg)
return;
var d = DEITY[E.spec.deity];
if (!d)
return;
var F = rbgForms(d);
if (!(F.head || F.faces || F.arms || F.half || F.onehand || F.tail || F.skull))
return;
E.rbg = { parts: [], shrink: [], held: [] };
if (E.mixer)
E.mixer.update(0);
E.model.updateMatrixWorld(true);
if (F.head)
rbgBeastHead(E);
if (F.faces && !F.head)
rbgFaces(E, F.faces);
if (F.arms)
rbgArms(E, F.arms);
if (F.half)
rbgHalf(E);
if (F.skull && !F.head)
rbgSkull(E);
if (F.onehand)
rbgOneHand(E);
if (F.tail)
rbgTail(E);
if (E.mixer && (E.rbg.parts.length || E.rbg.shrink.length) && !E.mixer.rbgWrapped) {
var mx = E.mixer, mu = mx.update;
mx.rbgWrapped = 1;
mx.update = function (t) { var r = mu.apply(this, arguments); try {
rbgSync(E);
}
catch (e) { } return r; };
}
rbgSync(E);
E.model.updateMatrixWorld(true);
rbgHold(E);
RBG.n++;
}
function rbgOff(E) { return __ZC(441, 30, this, arguments, new.target); }
if (typeof hdfAttach === "function") {
var rbgAtt0 = hdfAttach;
hdfAttach = function (E) { var r = rbgAtt0.apply(this, arguments); try {
rbgOn(E);
}
catch (e) {
if (window.console)
console.warn("[real people] gods' forms", e);
} return r; };
}
if (typeof hdfDetach === "function") {
var rbgDet0 = hdfDetach;
hdfDetach = function (E) { try {
rbgOff(E);
}
catch (e) { } return rbgDet0.apply(this, arguments); };
}
if (typeof deityLook === "function") {
var rbgDL0 = deityLook;
deityLook = function (spec, d) { return __ZC(441, 31, this, arguments, new.target); };
}
var RBF = { mat: null, geo: {}, t0: performance.now() };
function rbfMat() { return __ZC(441, 32, this, arguments, new.target); }
function rbfGeo() { return __ZC(441, 33, this, arguments, new.target); }
function rbFire(w, h) {
var f = new THREE.Mesh(rbfGeo(), rbfMat());
f.scale.set(w, h, w);
f.renderOrder = 3;
f.castShadow = false;
f.receiveShadow = false;
f.raycast = function () { };
f.userData.rbFire = 1;
f.onBeforeRender = function () { RBF.mat.uniforms.uT.value = (performance.now() - RBF.t0) / 1000; };
return f;
}
if (typeof flameAt === "function") {
flameAt = function (g, y, s) { var f = rbFire(0.2 * s, 0.42 * s); f.position.set(0, y - 0.1 * s, 0); g.add(f); return f; };
}
function rbfTorchMats() { return __ZC(441, 34, this, arguments, new.target); }
if (typeof HELD !== "undefined") {
HELD.torch = function () { return __ZC(441, 35, this, arguments, new.target); };
}
if (typeof addAura === "function") {
var rbfAura0 = addAura;
addAura = function (g, kind) {
if (kind !== "flames")
return rbfAura0.apply(this, arguments);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2 + 0.3, f = rbFire(0.42 + 0.1 * (i % 3), 0.6 + 0.22 * ((i * 5) % 3));
f.position.set(Math.cos(a) * 0.55, 0, Math.sin(a) * 0.55);
g.add(f);
}
return rbfAura0.call(this, g, "none");
};
}
var RBK = { geo: {}, mat: {}, eye: {}, eyeGeo: null };
var RBK_RQ = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function rbkRot(v, r) { return __ZC(441, 36, this, arguments, new.target); }
function rbkSd(P, p, tmp) { return __ZC(441, 37, this, arguments, new.target); }
function rbkSmin(a, b, k) { var h = Math.max(0, Math.min(1, 0.5 + 0.5 * (b - a) / k)); return b + (a - b) * h - k * h * (1 - h); }
function rbkPath(pts, r0, r1, col) { var out = [], n = pts.length - 1; for (var i = 0; i < n; i++)
out.push({ t: "c", a: pts[i], b: pts[i + 1], r0: r0 + (r1 - r0) * i / n, r1: r0 + (r1 - r0) * (i + 1) / n, col: col }); return out; }
function rbkMirror(list) {
var out = [];
list.forEach(function (P) {
out.push(P);
var Q = JSON.parse(JSON.stringify(P));
if (Q.c)
Q.c[0] = -Q.c[0];
if (Q.a) {
Q.a[0] = -Q.a[0];
Q.b[0] = -Q.b[0];
}
if (Q.rot) {
Q.rot[1] = -Q.rot[1];
Q.rot[2] = -Q.rot[2];
}
out.push(Q);
});
return out;
}
function rbkBuild(prims, cell, K) { var it = rbkBuildGen(prims, cell, K), r; while (!(r = it.next()).done)
; return r.value; }
function rbkBuildGen(prims, cell, K) { return __ZC(441, 38, this, arguments, new.target); }
function rbkSkin(kind) {
var k = kind || "fur";
if (RBK.mat[k])
return RBK.mat[k];
var m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: k === "horn" ? 0.45 : k === "scales" ? 0.55 : k === "skin" ? 0.62 : 0.82, metalness: 0 });
m.userData.realSoft = 1;
return (RBK.mat[k] = m);
}
function rbkEyeMat(iris, pupil) { return __ZC(441, 39, this, arguments, new.target); }
function rbkEye(G, p, r, dir, iris, pupil) { return __ZC(441, 40, this, arguments, new.target); }
function rbkHead(key, prims, kind, eyes, more) { return __ZC(441, 41, this, arguments, new.target); }
var RBK_HEADS = {
falcon: function () { return __ZC(441, 42, this, arguments, new.target); },
ibis: function () { return __ZC(441, 43, this, arguments, new.target); },
jackal: function () { return __ZC(441, 44, this, arguments, new.target); },
lion: function () { return __ZC(441, 45, this, arguments, new.target); },
cat: function () { return __ZC(441, 46, this, arguments, new.target); },
croc: function () { return __ZC(441, 47, this, arguments, new.target); },
hippo: function () { return __ZC(441, 48, this, arguments, new.target); },
setanimal: function () { return __ZC(441, 49, this, arguments, new.target); },
bull: function () { return __ZC(441, 50, this, arguments, new.target); },
goat: function () { return __ZC(441, 51, this, arguments, new.target); },
monkey: function () { return __ZC(441, 52, this, arguments, new.target); },
elephant: function () { return __ZC(441, 53, this, arguments, new.target); },
fly: function () { return __ZC(441, 54, this, arguments, new.target); }
};
var RBK_WIG = { falcon: 1, ibis: 1, jackal: 1, lion: 1, croc: 1, hippo: 1, setanimal: 1 };
(function () {
if (typeof HEADS === "undefined")
return;
Object.keys(RBK_HEADS).forEach(function (k) {
var f = RBK_HEADS[k];
HEADS[k] = function () {
var G;
try {
G = f();
}
catch (e) {
if (window.console)
console.warn("[beast heads]", k, e);
G = new THREE.Group();
}
if (RBK_WIG[k] && typeof dgxWigBack === "function")
try {
dgxWigBack(G, k === "lion" ? "#8A5A2A/#C0904A" : null);
}
catch (e) { }
return G;
};
});
})();
function rbkEagle() { return __ZC(441, 55, this, arguments, new.target); }
function rbkSitCat() { return __ZC(441, 56, this, arguments, new.target); }
if (typeof companion === "function") {
var rbkComp0 = companion;
companion = function (k) {
if (k === "cat" || k === "cats") {
var cg = new THREE.Group();
cg.add(rbkSitCat());
return cg;
}
if (k !== "eagle")
return rbkComp0.apply(this, arguments);
var g = new THREE.Group(), e = rbkEagle();
e.userData.dgxBrow = null;
e.scale.setScalar(1.05);
g.add(e);
g.userData.rbkPerch = 1;
return g;
};
}
if (typeof hdfDeityIcons === "function") {
var rbkDI0 = hdfDeityIcons;
hdfDeityIcons = function (E) {
var r = rbkDI0.apply(this, arguments);
try {
var body = E && E.g && E.g.children[0];
if (!body || !E.model)
return r;
var bones = {};
E.model.traverse(function (b) { if (b.isBone && /^(spine_03|upperarm_l|upperarm_r|clavicle_l|clavicle_r)$/.test(b.name))
bones[b.name] = b; });
if (!bones.spine_03)
return r;
E.icons = E.icons || [];
body.children.slice().forEach(function (o) {
if (!o.userData || !o.userData.rbkPerch || o === E.model)
return;
var sd = o.position.x > 0 ? "l" : "r", ua = bones["upperarm_" + sd], cl = bones["clavicle_" + sd];
if (!ua)
return;
E.icons.push({ o: o, parent: o.parent, pos: o.position.clone(), quat: o.quaternion.clone(), scale: o.scale.clone() });
body.updateMatrixWorld(true);
var a = ua.getWorldPosition(new THREE.Vector3()), c = cl ? cl.getWorldPosition(new THREE.Vector3()) : a.clone();
var w = a.clone().lerp(c, 0.35);
body.worldToLocal(w);
w.y += 0.045;
w.z -= 0.01;
o.position.set(w.x, w.y - 0.0, w.z);
o.updateMatrixWorld(true);
bones.spine_03.attach(o);
});
}
catch (e) {
if (window.console)
console.warn("[beast heads] perch", e);
}
return r;
};
}
if (typeof HELD !== "undefined") {
HELD.scales = function () { return __ZC(441, 57, this, arguments, new.target); };
}
var RBS = { tex: {}, mat: {}, geo: null };
var RBS_DRAW = {
sun: function (x) { x.beginPath(); x.arc(128, 128, 46, 0, 7); x.fill(); for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.save();
x.translate(128, 128);
x.rotate(a);
x.beginPath();
x.moveTo(-10, -58);
x.lineTo(0, -104);
x.lineTo(10, -58);
x.fill();
x.restore();
} },
moon: function (x) { x.beginPath(); x.arc(128, 128, 86, 0, 7); x.fill(); x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(160, 108, 74, 0, 7); x.fill(); x.globalCompositeOperation = "source-over"; },
blackmoon: function (x) { RBS_DRAW.moon(x); x.lineWidth = 8; x.beginPath(); x.moveTo(128, 190); x.lineTo(128, 236); x.moveTo(104, 214); x.lineTo(152, 214); x.stroke(); },
halfmoon: function (x) { x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 82, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 82, Math.PI / 2, Math.PI * 1.5); x.fill(); },
key: function (x) { x.lineWidth = 16; x.beginPath(); x.arc(128, 62, 34, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 96); x.lineTo(128, 226); x.moveTo(128, 190); x.lineTo(162, 190); x.moveTo(128, 218); x.lineTo(156, 218); x.stroke(); },
bolt: function (x) { x.beginPath(); x.moveTo(150, 18); x.lineTo(84, 132); x.lineTo(124, 132); x.lineTo(98, 238); x.lineTo(176, 108); x.lineTo(134, 108); x.lineTo(168, 18); x.closePath(); x.fill(); },
trident: function (x) { return __ZC(441, 58, this, arguments, new.target); },
bident: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(128, 110); x.lineTo(128, 236); x.moveTo(88, 40); x.quadraticCurveTo(88, 110, 128, 110); x.quadraticCurveTo(168, 110, 168, 40); x.stroke(); },
wave: function (x) { x.lineWidth = 14; for (var r = 0; r < 3; r++) {
x.beginPath();
for (var i = 0; i <= 40; i++) {
var px = 40 + i * 4.4, py = 84 + r * 44 + Math.sin(i / 40 * Math.PI * 3) * 16;
if (i)
x.lineTo(px, py);
else
x.moveTo(px, py);
}
x.stroke();
} },
flame: function (x) { return __ZC(441, 59, this, arguments, new.target); },
ankh: function (x) { x.lineWidth = 20; x.beginPath(); x.ellipse(128, 72, 30, 44, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 116); x.lineTo(128, 236); x.moveTo(62, 130); x.lineTo(194, 130); x.stroke(); },
wedjat: function (x) { return __ZC(441, 60, this, arguments, new.target); },
sundisc: function (x) { x.beginPath(); x.arc(128, 118, 66, 0, 7); x.fill(); x.lineWidth = 12; x.beginPath(); x.moveTo(70, 200); x.quadraticCurveTo(128, 240, 186, 200); x.stroke(); x.beginPath(); x.moveTo(96, 206); x.quadraticCurveTo(84, 170, 108, 170); x.stroke(); },
horndisc: function (x) { x.beginPath(); x.arc(128, 140, 46, 0, 7); x.fill(); x.lineWidth = 14; x.beginPath(); x.moveTo(128, 196); x.bezierCurveTo(40, 196, 30, 110, 62, 40); x.moveTo(128, 196); x.bezierCurveTo(216, 196, 226, 110, 194, 40); x.stroke(); },
feather: function (x) { return __ZC(441, 61, this, arguments, new.target); },
plumes: function (x) { [-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(128 + s * 6, 230); x.lineTo(128 + s * 6, 30); x.quadraticCurveTo(128 + s * 56, 40, 128 + s * 52, 230); x.fill(); }); },
djed: function (x) { x.fillRect(100, 60, 56, 176); for (var i = 0; i < 4; i++)
x.fillRect(64, 30 + i * 20, 128, 12); },
crookflail: function (x) {
x.lineWidth = 14;
x.beginPath();
x.moveTo(80, 236);
x.lineTo(170, 60);
x.arc(150, 50, 22, 0.4, Math.PI + 0.6, true);
x.stroke();
x.beginPath();
x.moveTo(176, 236);
x.lineTo(86, 60);
x.stroke();
for (var i = 0; i < 3; i++) {
x.beginPath();
x.moveTo(86, 60);
x.lineTo(40 + i * 22, 110 + i * 6);
x.stroke();
}
},
was: function (x) { x.lineWidth = 16; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 50); x.lineTo(168, 30); x.lineTo(178, 50); x.moveTo(128, 236); x.lineTo(110, 250); x.moveTo(128, 236); x.lineTo(146, 250); x.stroke(); },
sistrum: function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 150); x.stroke(); x.beginPath(); x.ellipse(128, 92, 48, 62, 0, 0, 7); x.stroke(); for (var i = 0; i < 3; i++) {
x.beginPath();
x.moveTo(70, 70 + i * 26);
x.lineTo(186, 70 + i * 26);
x.stroke();
} },
scarab: function (x) { return __ZC(441, 62, this, arguments, new.target); },
om: function (x) { x.font = "bold 190px 'Nirmala UI','Noto Sans Devanagari','Mangal',sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ॐ", 128, 140); },
lotus: function (x) { return __ZC(441, 63, this, arguments, new.target); },
chakra: function (x) { x.lineWidth = 14; x.beginPath(); x.arc(128, 128, 92, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 22, 0, 7); x.fill(); x.lineWidth = 8; for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
x.beginPath();
x.moveTo(128, 128);
x.lineTo(128 + Math.cos(a) * 92, 128 + Math.sin(a) * 92);
x.stroke();
} },
wheel6: function (x) { x.lineWidth = 16; x.beginPath(); x.arc(128, 128, 90, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 20, 0, 7); x.fill(); x.lineWidth = 12; for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
x.beginPath();
x.moveTo(128, 128);
x.lineTo(128 + Math.cos(a) * 90, 128 + Math.sin(a) * 90);
x.stroke();
} },
taiji: function (x) { return __ZC(441, 64, this, arguments, new.target); },
tomoe: function (x) { for (var i = 0; i < 3; i++) {
x.save();
x.translate(128, 128);
x.rotate(i / 3 * Math.PI * 2);
x.beginPath();
x.arc(0, -44, 34, 0, 7);
x.fill();
x.beginPath();
x.moveTo(34, -44);
x.quadraticCurveTo(40, 30, -40, 58);
x.quadraticCurveTo(10, 10, -34, -44);
x.fill();
x.restore();
} },
torii: function (x) { x.fillRect(30, 50, 196, 18); x.fillRect(50, 90, 156, 14); x.fillRect(72, 60, 18, 176); x.fillRect(166, 60, 18, 176); x.fillRect(120, 68, 16, 22); },
plum: function (x) { for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2 - Math.PI / 2;
x.beginPath();
x.arc(128 + Math.cos(a) * 50, 128 + Math.sin(a) * 50, 40, 0, 7);
x.fill();
} x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(128, 128, 16, 0, 7); x.fill(); x.globalCompositeOperation = "source-over"; },
"rune-t": function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 24); x.moveTo(60, 92); x.lineTo(128, 24); x.lineTo(196, 92); x.stroke(); },
"rune-ng": function (x) { x.lineWidth = 18; x.beginPath(); x.moveTo(128, 24); x.lineTo(212, 128); x.lineTo(128, 232); x.lineTo(44, 128); x.closePath(); x.stroke(); },
"rune-f": function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(96, 236); x.lineTo(96, 22); x.moveTo(96, 110); x.lineTo(180, 40); x.moveTo(96, 160); x.lineTo(180, 90); x.stroke(); },
"rune-b": function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(90, 236); x.lineTo(90, 22); x.lineTo(176, 76); x.lineTo(90, 128); x.lineTo(176, 182); x.lineTo(90, 236); x.stroke(); },
"rune-u": function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(80, 236); x.lineTo(80, 24); x.lineTo(176, 90); x.lineTo(176, 236); x.stroke(); },
"rune-a": function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(96, 236); x.lineTo(96, 22); x.moveTo(96, 30); x.lineTo(176, 90); x.moveTo(96, 90); x.lineTo(176, 150); x.stroke(); },
valknut: function (x) { return __ZC(441, 65, this, arguments, new.target); },
mjolnir: function (x) { x.beginPath(); x.moveTo(40, 40); x.lineTo(216, 40); x.lineTo(206, 110); x.lineTo(50, 110); x.closePath(); x.fill(); x.fillRect(112, 108, 32, 100); x.beginPath(); x.arc(128, 218, 18, 0, 7); x.fill(); },
horn: function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(40, 180); x.bezierCurveTo(70, 40, 190, 40, 220, 110); x.lineTo(196, 136); x.bezierCurveTo(176, 96, 100, 96, 76, 190); x.closePath(); x.fill(); },
apple: function (x) { return __ZC(441, 66, this, arguments, new.target); },
snowflake: function (x) { x.lineWidth = 10; for (var i = 0; i < 6; i++) {
x.save();
x.translate(128, 128);
x.rotate(i / 6 * Math.PI * 2);
x.beginPath();
x.moveTo(0, 0);
x.lineTo(0, -100);
x.moveTo(0, -56);
x.lineTo(-22, -78);
x.moveTo(0, -56);
x.lineTo(22, -78);
x.stroke();
x.restore();
} },
serpent: function (x) { x.lineWidth = 20; x.beginPath(); x.moveTo(70, 226); x.bezierCurveTo(240, 200, 20, 130, 150, 96); x.bezierCurveTo(200, 84, 180, 40, 140, 40); x.stroke(); x.beginPath(); x.ellipse(132, 38, 22, 14, 0, 0, 7); x.fill(); },
triskele: function (x) { x.lineWidth = 13; for (var i = 0; i < 3; i++) {
x.save();
x.translate(128, 128);
x.rotate(i / 3 * Math.PI * 2);
x.beginPath();
x.moveTo(0, 0);
for (var t = 0; t <= 1; t += 0.02) {
var a = -Math.PI / 2 + t * Math.PI * 2.6, r = 10 + t * 48;
x.lineTo(Math.cos(a) * r * 0.9, -58 + Math.sin(a) * r * 0.9 + (1 - t) * 0);
}
x.stroke();
x.restore();
} },
triquetra: function (x) { x.lineWidth = 12; for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2 - Math.PI / 2;
x.beginPath();
x.arc(128 + Math.cos(a) * 40, 138 + Math.sin(a) * 40, 70, a + Math.PI - 1.05, a + Math.PI + 1.05);
x.stroke();
} x.beginPath(); x.arc(128, 128, 46, 0, 7); x.stroke(); },
awen: function (x) { [[128, 236, 128, 74], [60, 226, 108, 90], [196, 226, 148, 90]].forEach(function (l) { x.lineWidth = 16; x.beginPath(); x.moveTo(l[0], l[1]); x.lineTo(l[2], l[3]); x.stroke(); }); [[128, 42], [92, 58], [164, 58]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 12, 0, 7); x.fill(); }); },
brigidcross: function (x) { x.fillRect(116, 24, 24, 208); x.fillRect(24, 116, 208, 24); x.fillRect(96, 96, 64, 64); [[116, 24], [116, 208], [24, 116], [208, 116]].forEach(function (p) { x.fillRect(p[0] - 6, p[1], 36, 24); }); },
antlers: function (x) { x.lineWidth = 12; [-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(128 + s * 20, 226); x.quadraticCurveTo(128 + s * 30, 140, 128 + s * 90, 40); x.moveTo(128 + s * 36, 170); x.lineTo(128 + s * 86, 150); x.moveTo(128 + s * 52, 120); x.lineTo(128 + s * 60, 60); x.moveTo(128 + s * 70, 90); x.lineTo(128 + s * 110, 80); x.stroke(); }); },
horseshoe: function (x) { x.lineWidth = 26; x.beginPath(); x.arc(128, 110, 70, Math.PI * 0.05, Math.PI * 0.95, true); x.stroke(); x.beginPath(); x.moveTo(66, 140); x.lineTo(70, 220); x.moveTo(190, 140); x.lineTo(186, 220); x.stroke(); },
harp: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(70, 230); x.lineTo(70, 40); x.quadraticCurveTo(150, 40, 196, 90); x.lineTo(70, 230); x.stroke(); x.lineWidth = 4; for (var i = 1; i < 6; i++) {
x.beginPath();
x.moveTo(70 + i * 20, 56 + i * 6);
x.lineTo(70 + i * 20, 230 - i * 26);
x.stroke();
} },
lyre: function (x) { return __ZC(441, 67, this, arguments, new.target); },
sword: function (x) { x.beginPath(); x.moveTo(128, 12); x.lineTo(144, 40); x.lineTo(144, 170); x.lineTo(112, 170); x.lineTo(112, 40); x.closePath(); x.fill(); x.fillRect(72, 170, 112, 18); x.fillRect(118, 188, 20, 44); x.beginPath(); x.arc(128, 236, 14, 0, 7); x.fill(); },
spear: function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 84); x.stroke(); x.beginPath(); x.moveTo(128, 14); x.bezierCurveTo(156, 50, 156, 74, 128, 96); x.bezierCurveTo(100, 74, 100, 50, 128, 14); x.fill(); },
bow: function (x) { return __ZC(441, 68, this, arguments, new.target); },
wheat: function (x) { return __ZC(441, 69, this, arguments, new.target); },
olive: function (x) { return __ZC(441, 70, this, arguments, new.target); },
venus: function (x) { x.lineWidth = 20; x.beginPath(); x.arc(128, 90, 58, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 148); x.lineTo(128, 236); x.moveTo(84, 194); x.lineTo(172, 194); x.stroke(); },
hammer: function (x) { x.beginPath(); x.moveTo(30, 170); x.lineTo(226, 170); x.lineTo(200, 196); x.lineTo(56, 196); x.closePath(); x.fill(); x.fillRect(96, 196, 64, 40); x.save(); x.translate(128, 96); x.rotate(-0.5); x.fillRect(-12, -70, 24, 120); x.fillRect(-46, -90, 92, 40); x.restore(); },
caduceus: function (x) { return __ZC(441, 71, this, arguments, new.target); },
rod: function (x) { return __ZC(441, 72, this, arguments, new.target); },
grapes: function (x) { return __ZC(441, 73, this, arguments, new.target); },
pomegranate: function (x) { x.beginPath(); x.arc(128, 140, 76, 0, 7); x.fill(); x.beginPath(); x.moveTo(98, 72); x.lineTo(108, 36); x.lineTo(118, 62); x.lineTo(128, 30); x.lineTo(138, 62); x.lineTo(148, 36); x.lineTo(158, 72); x.fill(); },
poppy: function (x) { return __ZC(441, 74, this, arguments, new.target); },
scythe: function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(150, 236); x.lineTo(100, 30); x.stroke(); x.beginPath(); x.moveTo(104, 40); x.quadraticCurveTo(170, 10, 226, 80); x.quadraticCurveTo(170, 46, 108, 60); x.fill(); },
scales: function (x) { return __ZC(441, 75, this, arguments, new.target); },
coin: function (x) { x.lineWidth = 12; x.beginPath(); x.arc(128, 128, 88, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 60, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 22, 0, 7); x.fill(); },
stars: function (x) { [[128, 70, 34], [70, 150, 26], [186, 150, 26], [128, 200, 20]].forEach(function (s) { x.beginPath(); for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? s[2] * 0.42 : s[2];
x.lineTo(s[0] + Math.cos(a) * r, s[1] + Math.sin(a) * r);
} x.fill(); }); },
star8: function (x) { x.beginPath(); for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 40 : 104;
x.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
} x.fill(); },
shamash: function (x) { return __ZC(441, 76, this, arguments, new.target); },
hornedcap: function (x) { return __ZC(441, 77, this, arguments, new.target); },
marru: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 100); x.stroke(); x.beginPath(); x.moveTo(128, 20); x.lineTo(176, 100); x.lineTo(80, 100); x.closePath(); x.fill(); },
goatfish: function (x) { RBS_DRAW.wave(x); },
thunderrose: function (x) { x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 92, 0, 7); x.stroke(); for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
x.beginPath();
x.arc(128 + Math.cos(a) * 92, 128 + Math.sin(a) * 92, 92, a + Math.PI - Math.PI / 3, a + Math.PI + Math.PI / 3);
x.stroke();
} },
spindle: function (x) { x.lineWidth = 10; x.beginPath(); x.moveTo(128, 20); x.lineTo(128, 236); x.stroke(); x.beginPath(); x.ellipse(128, 160, 52, 22, 0, 0, 7); x.fill(); x.beginPath(); x.moveTo(84, 60); x.lineTo(172, 90); x.moveTo(84, 90); x.lineTo(172, 60); x.stroke(); },
rhombus: function (x) { return __ZC(441, 78, this, arguments, new.target); },
windspiral: function (x) { x.lineWidth = 12; x.beginPath(); for (var t = 0; t <= 1; t += 0.01) {
var a = t * Math.PI * 5, r = 8 + t * 92;
if (t)
x.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
else
x.moveTo(128, 128);
} x.stroke(); },
doubleaxe: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 30); x.stroke(); [-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(128, 50); x.quadraticCurveTo(128 + s * 110, 30, 128 + s * 96, 90); x.quadraticCurveTo(128 + s * 80, 110, 128, 100); x.fill(); }); },
machete: function (x) { x.beginPath(); x.moveTo(110, 190); x.lineTo(110, 40); x.quadraticCurveTo(150, 20, 160, 60); x.lineTo(146, 190); x.closePath(); x.fill(); x.fillRect(104, 190, 48, 46); },
fan: function (x) { return __ZC(441, 79, this, arguments, new.target); },
opon: function (x) { x.lineWidth = 12; x.beginPath(); x.arc(128, 128, 92, 0, 7); x.stroke(); x.beginPath(); x.arc(128, 128, 60, 0, 7); x.stroke(); for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
x.beginPath();
x.arc(128 + Math.cos(a) * 76, 128 + Math.sin(a) * 76, 6, 0, 7);
x.fill();
} x.beginPath(); x.arc(128, 52, 14, 0, 7); x.fill(); },
broom: function (x) { x.lineWidth = 8; for (var i = 0; i < 9; i++) {
x.beginPath();
x.moveTo(128, 120);
x.lineTo(70 + i * 14.5, 236);
x.stroke();
} x.fillRect(110, 30, 36, 96); x.beginPath(); x.arc(128, 30, 22, 0, 7); x.fill(); },
cross: function (x) { x.fillRect(114, 24, 28, 212); x.fillRect(64, 70, 128, 28); },
crossroads: function (x) { x.fillRect(116, 24, 24, 208); x.fillRect(24, 116, 208, 24); x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 60, 0, 7); x.stroke(); },
mirror: function (x) { return __ZC(441, 80, this, arguments, new.target); },
flower: function (x) { RBS_DRAW.plum(x); },
skull: function (x) { return __ZC(441, 81, this, arguments, new.target); },
faravahar: function (x) { return __ZC(441, 82, this, arguments, new.target); },
morningstar: function (x) { x.beginPath(); for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 26 : (i % 4 ? 70 : 112);
x.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
} x.fill(); },
invpentagram: function (x) { x.lineWidth = 11; x.beginPath(); x.arc(128, 128, 100, 0, 7); x.stroke(); x.beginPath(); for (var i = 0; i <= 5; i++) {
var a = Math.PI / 2 + i * Math.PI * 4 / 5, px = 128 + Math.cos(a) * 96, py = 128 + Math.sin(a) * 96;
if (i)
x.lineTo(px, py);
else
x.moveTo(px, py);
} x.stroke(); },
leviathancross: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(128, 20); x.lineTo(128, 170); x.moveTo(84, 52); x.lineTo(172, 52); x.moveTo(70, 100); x.lineTo(186, 100); x.stroke(); x.beginPath(); x.ellipse(98, 200, 30, 24, 0, 0, 7); x.stroke(); x.beginPath(); x.ellipse(158, 200, 30, 24, 0, 0, 7); x.stroke(); },
eye: function (x) { x.lineWidth = 12; x.beginPath(); x.moveTo(30, 128); x.quadraticCurveTo(128, 40, 226, 128); x.quadraticCurveTo(128, 216, 30, 128); x.stroke(); x.beginPath(); x.arc(128, 128, 34, 0, 7); x.fill(); },
crown: function (x) { x.beginPath(); x.moveTo(40, 200); x.lineTo(40, 80); x.lineTo(84, 140); x.lineTo(128, 56); x.lineTo(172, 140); x.lineTo(216, 80); x.lineTo(216, 200); x.closePath(); x.fill(); },
gourd: function (x) { x.beginPath(); x.arc(128, 170, 58, 0, 7); x.fill(); x.beginPath(); x.arc(128, 84, 38, 0, 7); x.fill(); x.fillRect(120, 26, 16, 24); },
flute: function (x) { x.save(); x.translate(128, 128); x.rotate(-0.7); x.fillRect(-110, -12, 220, 24); x.globalCompositeOperation = "destination-out"; for (var i = 0; i < 6; i++) {
x.beginPath();
x.arc(-60 + i * 24, 0, 6, 0, 7);
x.fill();
} x.restore(); x.globalCompositeOperation = "source-over"; },
castanets: function (x) { [-1, 1].forEach(function (s) { x.save(); x.translate(128 + s * 30, 128); x.rotate(s * 0.25); x.fillRect(-20, -90, 40, 180); x.restore(); }); },
basket: function (x) { x.beginPath(); x.arc(128, 128, 90, 0, Math.PI); x.closePath(); x.fill(); x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 70, Math.PI, 0); x.stroke(); [90, 128, 166].forEach(function (cx) { x.beginPath(); x.arc(cx, 118, 16, 0, 7); x.fill(); }); },
drum: function (x) { x.lineWidth = 10; x.beginPath(); x.ellipse(128, 90, 74, 26, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(54, 90); x.lineTo(54, 190); x.ellipse(128, 190, 74, 26, 0, Math.PI, 0, true); x.lineTo(202, 90); x.stroke(); x.beginPath(); x.moveTo(60, 20); x.lineTo(120, 80); x.moveTo(196, 20); x.lineTo(136, 80); x.stroke(); },
mace: function (x) { x.lineWidth = 14; x.beginPath(); x.moveTo(128, 236); x.lineTo(128, 120); x.stroke(); x.beginPath(); x.ellipse(128, 80, 46, 56, 0, 0, 7); x.fill(); x.fillRect(122, 18, 12, 22); },
noose: function (x) { x.lineWidth = 12; x.beginPath(); x.ellipse(128, 100, 60, 74, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 174); x.quadraticCurveTo(100, 210, 140, 236); x.stroke(); },
pipes: function (x) { for (var i = 0; i < 7; i++)
x.fillRect(48 + i * 24, 40, 18, 110 + i * 12); x.fillRect(40, 90, 180, 14); }
};
var RBS_OF = {
zeus: "bolt", jupiter: "bolt", hera: "pomegranate", juno: "pomegranate", poseidon: "trident", neptune: "trident", demeter: "wheat", ceres: "wheat", athena: "olive", minerva: "olive",
apollo: "lyre", artemis: "moon", diana: "moon", ares: "spear", mars: "spear", aphrodite: "venus", venus: "venus", hephaestus: "hammer", vulcan: "hammer", hermes: "caduceus", mercury: "caduceus",
hestia: "flame", vesta: "flame", dionysus: "grapes", bacchus: "grapes", hades: "bident", pluto: "bident", persephone: "pomegranate", hecate: "key", nemesis: "scales", morpheus: "poppy",
hypnos: "poppy", thanatos: "scythe", nyx: "stars", selene: "moon", helios: "sun", gaia: "olive", pan: "pipes", eros: "bow", asclepius: "rod", charon: "coin", janus: "key", saturn: "scythe", fortuna: "wheel6",
odin: "valknut", frigg: "rune-b", thor: "mjolnir", sif: "wheat", loki: "serpent", baldr: "sun", tyr: "rune-t", heimdall: "horn", bragi: "harp", idunn: "apple", vidar: "rune-u", njord: "wave",
freyr: "rune-ng", freyja: "rune-f", skadi: "snowflake", hel: "halfmoon",
ra: "sundisc", amun: "plumes", ptah: "djed", thoth: "moon", maat: "feather", osiris: "crookflail", isis: "ankh", set: "was", nephthys: "ankh", horus: "wedjat", anubis: "ankh", sekhmet: "sundisc",
hathor: "horndisc", bastet: "sistrum", sobek: "was", nut: "stars", geb: "scarab", taweret: "ankh",
obatala: "opon", oduduwa: "crown", esu: "crossroads", ogun: "machete", sango: "doubleaxe", oya: "windspiral", osun: "fan", yemoja: "wave", orunmila: "opon", ososi: "bow", osanyin: "olive",
obaluaye: "broom", olokun: "wave", aganju: "flame", ibeji: "stars", osumare: "serpent",
dagda: "harp", morrigan: "triskele", brigid: "brigidcross", lugh: "spear", nuada: "sword", airmid: "olive", manannan: "wave", aengus: "triquetra", ogma: "triquetra", eriu: "triskele",
rhiannon: "horseshoe", arawn: "antlers", cerridwen: "awen", arianrhod: "wheel6", bran: "crown", gwydion: "awen", math: "triquetra", orddu: "triskele",
cernunnos: "antlers", epona: "horseshoe", taranis: "wheel6", matres: "triquetra",
pangu: "taiji", nuwa: "taiji", fuxi: "taiji", jadeemperor: "crown", xiwangmu: "apple", laojun: "taiji", shennong: "wheat", houyi: "bow", change: "moon", guanyin: "lotus", mazu: "wave", guanyu: "sword",
zaojun: "flame", yanluo: "scales", zhongkui: "sword", nezha: "wheel6", sunwukong: "mace", hexiangu: "lotus", caoguojiu: "castanets", litieguai: "gourd", lancaihe: "basket", ludongbin: "sword",
lvdongbin: "sword", hanxiangzi: "flute", zhangguolao: "drum", zhongliquan: "fan",
brahma: "lotus", vishnu: "chakra", shiva: "trident", lakshmi: "lotus", saraswati: "lotus", parvati: "lotus", durga: "trident", kali: "sword", ganesha: "om", hanuman: "mace", krishna: "flute",
rama: "bow", indra: "bolt", agni: "flame", surya: "sun", yama: "noose", kartikeya: "spear", ganga: "wave",
amaterasu: "sun", susanoo: "sword", tsukuyomi: "moon", izanagi: "spear", izanami: "spear", inari: "torii", hachiman: "tomoe", raijin: "tomoe", fujin: "windspiral", benzaiten: "lyre", ebisu: "wave", tenjin: "plum",
anu: "hornedcap", enlil: "hornedcap", enki: "goatfish", inanna: "star8", ereshkigal: "moon", marduk: "marru", nergal: "sword", shamash: "shamash", nanna: "moon", ninhursag: "olive",
tezcatlipoca: "mirror", huitzilopochtli: "sun", tlaloc: "wave", xochiquetzal: "flower", mictlantecuhtli: "skull", coatlicue: "serpent", chalchiuhtlicue: "wave", xipetotec: "wheat",
itzamna: "sun", ixchel: "moon", chaac: "bolt", kinichahau: "sun", inti: "sun", pachamama: "olive", viracocha: "sun", mamaquilla: "moon",
perun: "thunderrose", veles: "antlers", mokosh: "rhombus", svarog: "hammer", dazhbog: "sun", morana: "moon", jarilo: "sun", stribog: "windspiral", babayaga: "moon",
nyame: "sun", asaseyaa: "olive", anansi: "stars", tano: "wave", pele: "flame", maui: "sun", tangaroa: "wave", tane: "olive", hina: "moon", papatuanuku: "olive",
legba: "crossroads", erzulie: "venus", baronsamedi: "cross", damballa: "serpent", ogou: "machete", mamanbrigitte: "cross",
ahuramazda: "faravahar", mithra: "sun", anahita: "star8", ahriman: "serpent",
lucifer: "morningstar", satan: "leviathancross", lilith: "blackmoon", moloch: "flame", prometheus: "flame", cain: "eye", choronzon: "eye", samael: "sword", naamah: "blackmoon"
};
var RBS_TRAD = { Greek: "olive", Roman: "olive", Norse: "valknut", Egyptian: "ankh", Yoruba: "opon", Irish: "triskele", Welsh: "triquetra", Gaulish: "triskele", Chinese: "taiji", Hindu: "om",
Japanese: "torii", Mesopotamian: "star8", Aztec: "sun", Maya: "sun", Inca: "sun", Slavic: "sun", Akan: "sun", Polynesian: "wave", Hawaiian: "flame", Vodou: "crossroads", Persian: "faravahar",
Demonology: "invpentagram", Qliphothic: "invpentagram", Adversarial: "invpentagram", Hebrew: "star8", "Anglo-Saxon": "triskele" };
function rbsKindOf(d) { if (!d)
return null; var k = RBS_OF[d.key] || RBS_TRAD[d.trad]; return k && RBS_DRAW[k] ? k : null; }
function rbsTex(kind) { return __ZC(441, 83, this, arguments, new.target); }
if (typeof signShape === "function" && typeof deitySign === "function") {
var rbsDS0 = deitySign;
deitySign = function (d) { var s = rbsDS0.apply(this, arguments); try {
var k = rbsKindOf(d);
if (k && s)
s = { kind: "sym:" + k, col: s.col };
}
catch (e) { } return s; };
var rbsSS0 = signShape;
signShape = function (kind, col, glow) { return __ZC(441, 84, this, arguments, new.target); };
}
var RB_OWNHAIR = {
female_adult_01: "ponytail", female_adult_02: "ponytail", female_adult_03: "waves", female_adult_04: "bun", female_adult_05: "short",
female_adult_06: "headwrap", female_adult_07: "bun", female_adult_08: "long", female_adult_09: "bun", female_adult_10: "headwrap",
female_adult_11: "bun", female_adult_12: "ponytail", female_adult_13: "short", female_adult_14: "short", female_adult_15: "long",
female_adult_16: "veil", female_adult_17: "bun",
male_adult_01: "short", male_adult_02: "waves", male_adult_03: "short", male_adult_04: "curly", male_adult_05: "buzz", male_adult_06: "curly",
male_adult_07: "short", male_adult_08: "short", male_adult_09: "ponytail", male_adult_10: "short", male_adult_11: "short", male_adult_12: "short",
male_adult_13: "buzz", male_adult_14: "buzz", male_adult_15: "short", male_adult_16: "short", male_adult_17: "cap", male_adult_18: "hood",
male_adult_19: "headwrap", male_adult_20: "short", male_adult_21: "headwrap"
};
var RB_HAIROK = { short: ["short"], waves: ["waves", "curly", "short"], curly: ["curly", "waves"], coily: [], afro: [],
long: ["long"], ponytail: ["ponytail"], bun: ["bun"], braids: [], locs: [], buzz: ["buzz", "short"], bald: ["buzz", "short"], headwrap: ["headwrap"] };
var RB_HAIRBASE = ["short", "buzz", "waves", "curly", "ponytail", "bun"];
function rbHairOn() { return !window.RB_HAIR_OFF; }
function rbWantStyle(L) { return L.hairStyle || (L.sex === "f" ? "long" : "short"); }
function rbCovered(own) { return own === "headwrap" || own === "cap" || own === "hood" || own === "veil"; }
if (typeof rbPick === "function") {
var rbPick5 = rbPick;
rbPick = function (spec, L, child, beard) {
if (!rbHairOn() || child || !L)
return rbPick5.apply(this, arguments);
var list0 = RB.list, style = rbWantStyle(L), hat = L.hat && L.hat !== "none" ? L.hat : null;
var keep = function (r) {
var own = RB_OWNHAIR[r.f];
if (!own)
return true;
if (own === "cap")
return hat === "cap";
if (own === "hood")
return hat === "hood";
if (own === "headwrap")
return style === "headwrap" && !hat;
if (own === "bun" && hat && /^(cap|beanie|tophat|brimmed|cowboy|witch|wizard|helmet)$/.test(hat))
return false;
return true;
};
var ok = RB_HAIROK[style] || [], best = function (r) { return !RB_OWNHAIR[r.f] || ok.indexOf(RB_OWNHAIR[r.f]) >= 0; };
var base = function (r) { return !RB_OWNHAIR[r.f] || RB_HAIRBASE.indexOf(RB_OWNHAIR[r.f]) >= 0; };
try {
var all = list0.filter(keep);
var tries = [all.filter(best), all.filter(base), all];
for (var i = 0; i < tries.length; i++) {
if (!tries[i].length)
continue;
RB.list = tries[i];
var r = rbPick5.call(this, spec, L, child, beard);
if (r && r.sex === (L.sex === "m" ? "m" : "f"))
return r;
}
}
finally {
RB.list = list0;
}
return rbPick5.apply(this, arguments);
};
}
var RBH = { mats: {}, tex: {} };
function rbHairTex(kind) {
if (RBH.tex[kind])
return RBH.tex[kind];
var W = kind === "curl" ? 128 : 64, H = kind === "curl" ? 128 : 256, c = document.createElement("canvas");
c.width = W;
c.height = H;
var x = c.getContext("2d"), seed = 7, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
x.fillStyle = "#bdbdbd";
x.fillRect(0, 0, W, H);
if (kind === "curl") {
for (var i = 0; i < 900; i++) {
var px = rnd() * W, py = rnd() * H, r = 1.5 + rnd() * 3.2, l = 150 + rnd() * 105 | 0;
x.strokeStyle = "rgba(40,40,40,.55)";
x.lineWidth = 1.3;
x.beginPath();
x.arc(px + 0.6, py + 0.8, r, 0, 6.3);
x.stroke();
x.strokeStyle = "rgb(" + l + "," + l + "," + l + ")";
x.lineWidth = 1;
x.beginPath();
x.arc(px, py, r, rnd() * 6, rnd() * 6 + 3.5);
x.stroke();
}
}
else {
for (var j = 0; j < 520; j++) {
var sx = rnd() * W, l2 = 110 + rnd() * 145 | 0, a = 0.35 + rnd() * 0.5, wv = rnd() * 2 - 1;
x.strokeStyle = "rgba(" + l2 + "," + l2 + "," + l2 + "," + a + ")";
x.lineWidth = 0.6 + rnd() * 1.1;
x.beginPath();
x.moveTo(sx, 0);
for (var y = 0; y <= H; y += 16)
x.lineTo(sx + Math.sin(y * 0.03 + wv * 4) * wv * 3, y);
x.stroke();
}
if (kind === "braid")
for (var k = 0; k < H; k += 16) {
x.fillStyle = "rgba(0,0,0,.28)";
x.fillRect(0, k, W, 3);
}
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
if (typeof LITE !== "undefined" && LITE)
t.generateMipmaps = true;
RBH.tex[kind] = t;
return t;
}
function rbHairMat(col, kind) {
var k = (kind || "strand") + ":" + col;
if (RBH.mats[k])
return RBH.mats[k];
var tx = rbHairTex(kind || "strand"), m = new THREE.MeshStandardMaterial({ color: col, map: tx, roughness: kind === "curl" ? 0.8 : 0.55, metalness: 0, side: THREE.DoubleSide });
m.userData.realSoft = 1;
RBH.mats[k] = m;
return m;
}
function rbHairShell(H, o) { return __ZC(441, 85, this, arguments, new.target); }
function rbHairTube(pts, r, seg, rad) { return __ZC(441, 86, this, arguments, new.target); }
function rbBraid(pts, r0, r1) { return __ZC(441, 87, this, arguments, new.target); }
function rbPt(H, a, y, out) { var R = H.ring(Math.min(H.ymax - 0.004, y)), r = H.at(R, a) + (out || 0); return new THREE.Vector3(H.cx + Math.cos(a) * r, y, H.cz + Math.sin(a) * r); }
var RBH_BACK = Math.PI * 1.5, RBH_FRONT = Math.PI / 2;
function rbHairMake(H, style, col, hat, L) {
var G = new THREE.Group(), top = H.ymax, strand = rbHairMat(col, "strand"), curl = rbHairMat(col, "curl");
var add = function (g, m) { var o = new THREE.Mesh(g, m); o.castShadow = true; o.raycast = function () { }; G.add(o); return o; };
var lowY = top - 0.1;
if (style === "afro") {
if (!hat)
add(rbHairShell(H, { ball: 1, cy: 0.095, vol: 0.055, bump: 0.014, front: 0.064, side: 0.165, back: 0.2, backward: 0.012, ur: 3, vr: 3 }), curl);
}
else if (style === "coily") {
if (!hat)
add(rbHairShell(H, { ball: 1, cy: 0.09, vol: 0.032, bump: 0.01, backward: 0.006, front: 0.066, side: 0.13, back: 0.18, edge: 2.6, ur: 4, vr: 3 }), curl);
}
else if (style === "curly") {
if (!hat)
add(rbHairShell(H, { vol: 0.026, base: 0.4, bump: 0.009, front: 0.066, side: 0.13, back: 0.17, ur: 4, vr: 3 }), curl);
}
else if (style === "locs") {
var seedL = 11, rl = function () { seedL = (seedL * 16807) % 2147483647; return seedL / 2147483647; };
for (var i = 0; i < 34; i++) {
var a = Math.PI * 0.86 + i / 33 * Math.PI * 1.28 + (rl() - 0.5) * 0.08, sd = Math.sin(a), y0 = Math.min(lowY, top - 0.045 - 0.08 * Math.max(0, -sd) - 0.06 * (1 - Math.abs(sd)) + (rl() - 0.5) * 0.02);
var len = (sd > 0 ? 0.16 : 0.24) + rl() * 0.12, p0 = rbPt(H, a, y0, 0.006), out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)), sw = (rl() - 0.5) * 0.03;
add(rbHairTube([p0, p0.clone().addScaledVector(out, 0.022).add(new THREE.Vector3(sw * 0.3, -0.05, 0)), p0.clone().addScaledVector(out, 0.035).add(new THREE.Vector3(sw, -len * 0.55, -0.01)), p0.clone().addScaledVector(out, 0.03).add(new THREE.Vector3(sw * 1.4, -len, -0.02))], function (t) { return (0.0105 + rl() * 0.0 * 0) * (1 - 0.3 * t) * (t > 0.96 ? 0.7 : 1); }, 12, 6), curl);
}
}
else if (style === "braids") {
[-1, 1].forEach(function (sd) {
var a = RBH_BACK + sd * 0.75, p0 = rbPt(H, a, top - 0.1, 0.008), out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
rbBraid([p0, p0.clone().addScaledVector(out, 0.03).add(new THREE.Vector3(0, -0.1, -0.01)), p0.clone().addScaledVector(out, 0.04).add(new THREE.Vector3(0, -0.24, -0.02)), p0.clone().addScaledVector(out, 0.04).add(new THREE.Vector3(0, -0.36, -0.02))], 0.022, 0.012)
.forEach(function (g) { add(g, rbHairMat(col, "braid")); });
var tie = add(new THREE.SphereGeometry(0.012, 10, 6), strand);
tie.position.copy(p0.clone().addScaledVector(out, 0.04).add(new THREE.Vector3(0, -0.37, -0.02)));
});
}
else if (style === "ponytail" || style === "bun") {
var at = rbPt(H, RBH_BACK, style === "bun" ? top - (hat ? 0.11 : 0.05) : top - 0.1, 0.0), back = new THREE.Vector3(0, 0, -1);
if (style === "bun") {
if (!hat || true) {
var b = add(new THREE.SphereGeometry(0.048, 20, 14), strand);
b.scale.set(1, 0.85, 0.8);
b.position.copy(at).addScaledVector(back, 0.035);
}
}
else {
var p1 = at.clone().addScaledVector(back, 0.02);
add(rbHairTube([p1, p1.clone().add(new THREE.Vector3(0, -0.05, -0.05)), p1.clone().add(new THREE.Vector3(0, -0.16, -0.06)), p1.clone().add(new THREE.Vector3(0, -0.28, -0.035))], function (t) { return 0.032 * (1 - t * 0.7) * (t < 0.08 ? 0.6 + t * 5 : 1); }, 24, 10), strand);
var band = add(new THREE.TorusGeometry(0.017, 0.005, 6, 14), rbHairMat(0x1A1A1A, "strand"));
band.position.copy(p1.clone().add(new THREE.Vector3(0, -0.012, -0.012)));
band.rotation.x = Math.PI / 2.6;
}
}
else if (style === "long") {
var NA = 28, NR = 12, pos = [], uv = [], idx = [], a0 = Math.PI * 1.07, a1 = Math.PI * 1.93, yT = Math.min(top - 0.05, hat ? lowY : top - 0.05), yB = top - 0.42;
var Rt = H.ring(yT);
for (var r = 0; r <= NR; r++) {
var t = r / NR;
for (var j = 0; j <= NA; j++) {
var a = a0 + (a1 - a0) * j / NA, s = Math.sin(a), hem = yB + 0.06 * Math.max(0, s) + 0.05 * Math.pow(Math.abs(Math.cos(a)), 3) + ((j * 7919) % 13) / 13 * 0.035 * t, y = yT + (hem - yT) * t;
var rad = H.at(Rt, a) + 0.008 + t * 0.022 + 0.005 * Math.sin(j * 1.7 + t * 5) * t, back = Math.max(0, -s);
var x = H.cx + Math.cos(a) * rad * (1 + t * 0.06), z = H.cz + s * rad - back * t * 0.09 - 0.01 * t;
pos.push(x, y, z);
uv.push(j / NA * 3, t * 2);
}
}
for (var r2 = 0; r2 < NR; r2++)
for (var j2 = 0; j2 < NA; j2++) {
var q0 = r2 * (NA + 1) + j2, q1 = q0 + NA + 1;
idx.push(q0, q1, q0 + 1, q0 + 1, q1, q1 + 1);
}
add(hfGeo(pos, idx, uv), strand);
}
else if (style === "headwrap") {
if (hat)
return G;
var cc = L && L.hatColor != null ? L.hatColor : L && L.accColor != null ? L.accColor : 0x8A3A2A, cloth = hfCloth(cc, "paisley");
add(rbHairShell(H, { vol: 0.04, front: 0.055, side: 0.1, back: 0.15, rise: 0.05, edge: 2, ur: 2, vr: 1 }), cloth);
var kn = add(new THREE.SphereGeometry(0.035, 14, 10), cloth);
kn.scale.set(1.3, 0.9, 0.8);
kn.position.copy(rbPt(H, RBH_BACK, top - 0.02, 0.05));
}
return G;
}
RBH.scalp = {};
RBH.k = { m: { up: 0.06, back: 0.135, rx: 0.077, ry: 0.09, rz: 0.105 }, f: { up: 0.05, back: 0.118, rx: 0.063, ry: 0.082, rz: 0.087 } };
function rbMaskAt(D, u, v) { var w = D.width, h = D.height; u = u - Math.floor(u); v = v - Math.floor(v); return Math.round(D.data[Math.min(h - 1, Math.floor(v * h)) * w + Math.min(w - 1, Math.floor(u * w))] / 40); }
function rbScalpGeo(m, info, bald, sex) {
var key = info.file + (bald ? ':b' : '');
if (RBH.scalp[key])
return RBH.scalp[key];
var mt = info.mask && RB.mask[info.mask], D = mt && mt.image;
if (!D || !D.data || D.width < 8)
return null;
var G0 = m.geometry, P = G0.attributes.position, UV = G0.attributes.uv;
if (!P || !UV)
return null;
var B = m.bindMatrix, Bi = new THREE.Matrix4().copy(m.bindMatrix).invert(), v = new THREE.Vector3(), n = P.count, cls = new Uint8Array(n), Y = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(B);
Y[i * 3] = v.x;
Y[i * 3 + 1] = v.y;
Y[i * 3 + 2] = v.z;
cls[i] = rbMaskAt(D, UV.getX(i), UV.getY(i));
}
var iN = -1;
for (var i1 = 0; i1 < n; i1++)
if (cls[i1] === 4 && (iN < 0 || Y[i1 * 3 + 2] > Y[iN * 3 + 2]))
iN = i1;
if (iN < 0)
return null;
var xN = Y[iN * 3], yN = Y[iN * 3 + 1], zN = Y[iN * 3 + 2], yC = yN;
for (var i2 = 0; i2 < n; i2++)
if (cls[i2] === 4 && Y[i2 * 3 + 2] > zN - 0.045 && Math.abs(Y[i2 * 3] - xN) < 0.03 && Y[i2 * 3 + 1] < yC && Y[i2 * 3 + 1] > yN - 0.12)
yC = Y[i2 * 3 + 1];
var K = RBH.k[sex === "m" ? "m" : "f"], sc = Math.max(0.92, Math.min(1.08, (yN - yC) / (sex === "m" ? 0.086 : 0.064)));
var rx = K.rx * sc, ry = K.ry * sc, rz = K.rz * sc, C = new THREE.Vector3(xN, yN + K.up * sc, zN - K.back * sc);
if (window.RBH_DBG) {
var mx = -1e9, mz = 1e9, x0 = 1e9, x1 = -1e9;
for (var q = 0; q < n; q++) {
if (Y[q * 3 + 1] > mx)
mx = Y[q * 3 + 1];
if (Y[q * 3 + 2] < mz)
mz = Y[q * 3 + 2];
if (Y[q * 3] < x0)
x0 = Y[q * 3];
if (Y[q * 3] > x1)
x1 = Y[q * 3];
}
(RBH.dbg = RBH.dbg || {})[key] = { nose: [xN, yN, zN], chin: yC, top: mx, back: mz, w: [x0, x1], C: C.toArray(), r: [rx, ry, rz] };
}
var rzF = rz;
for (var f = 0; f < n; f++) {
if (cls[f] !== 4)
continue;
var fx = (Y[f * 3] - C.x) / rx, fy = (Y[f * 3 + 1] - C.y) / ry, fz = Y[f * 3 + 2] - C.z;
if (fz <= 0 || Math.abs(fx) > 0.6 || fy < 0 || fy > 0.6)
continue;
var q = 1 - fx * fx - fy * fy;
if (q > 0.05)
rzF = Math.max(rzF, fz / Math.sqrt(q) + 0.002);
}
rzF = Math.min(rzF, rz * 1.35);
var G = G0.clone(), Q = G.attributes.position, flag = new Float32Array(n), d = new THREE.Vector3();
for (var k = 0; k < n; k++) {
d.set(Y[k * 3] - C.x, Y[k * 3 + 1] - C.y, Y[k * 3 + 2] - C.z);
var ax = Math.abs(d.x);
if (d.z > rz * 0.2 && d.y < ry * 0.35 && ax < rx * 0.8 && !(cls[k] === 5 && d.y > ry * 0.08))
continue;
if (cls[k] === 4 && ax > rx * 0.7 && ax < rx * 1.32 && d.y < ry * 0.25 && d.y > -ry * 0.7 && d.z > -rz * 0.35 && d.z < rz * 0.3)
continue;
if (cls[k] === 4 && d.y < -ry * 0.5 && Math.hypot(d.x, d.z - rz * 0.15) < rx * 0.95)
continue;
var rzk = d.z < 0 ? (d.y < 0 ? rz * (1 - 0.3 * Math.min(1, -d.y / ry)) : rz) : rzF;
var e = Math.sqrt(d.x * d.x / (rx * rx) + d.y * d.y / (ry * ry) + d.z * d.z / (rzk * rzk));
if (cls[k] !== 5 && e <= (bald ? 0.93 : 1.0))
continue;
flag[k] = 1;
if (e > 1) {
d.multiplyScalar((d.y < -ry * 0.45 ? 0.6 : 1.004) / e);
v.copy(C).add(d).applyMatrix4(Bi);
Q.setXYZ(k, v.x, v.y, v.z);
}
}
G.setAttribute("rbScalp", new THREE.BufferAttribute(flag, 1));
G.computeVertexNormals();
G.userData.rbScalpOf = G0;
return RBH.scalp[key] = { g: G, C: C, r: [rx, ry, rz] };
}
function rbScalp(E, style, L) {
var ok = false;
E.model.traverse(function (m) {
var M = m.isMesh && m.material, info = M && M.userData && M.userData.rb;
if (!info)
return;
if (info.kind === "opacity") {
if (m.visible) {
m.visible = false;
(E.rbHairHid = E.rbHairHid || []).push(m);
}
return;
}
if (info.kind !== "head" || !m.isSkinnedMesh)
return;
var S = rbScalpGeo(m, info, style === 'bald' || style === 'buzz', E.plan.rb.sex);
if (!S)
return;
if (!E.rbHeadGeo) {
E.rbHeadGeo = [m, m.geometry];
m.geometry = S.g;
}
ok = true;
var U = M.userData.rbU;
if (!U)
return;
var bald = style === "bald" || style === "buzz";
if (bald) {
var col = new THREE.Color(L.skin != null ? L.skin : 0xC89878);
if (style === "buzz")
col.lerp(new THREE.Color(L.hair != null ? L.hair : 0x2A2018), 0.5);
U.rbT.value[4] = rbLin(col.getHex());
}
if (!M.defines.RB_SCALP) {
M.defines.RB_SCALP = "";
if (bald)
M.defines.RB_BALD = "";
var ck = M.customProgramCacheKey, ob = M.onBeforeCompile;
M.onBeforeCompile = function (sh) {
ob.call(this, sh);
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nattribute float rbScalp; varying float vRbScalp;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvRbScalp=rbScalp;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying float vRbScalp;");
};
M.customProgramCacheKey = function () { return ck.call(this) + "scalp" + (bald ? "b" : ""); };
M.needsUpdate = true;
}
});
return ok;
}
function rbHairCol(E, L) { return L.hair != null ? L.hair : 0x3A2A1A; }
function rbHairDo(E) {
if (!rbHairOn() || !E || !E.model || !E.plan || !E.plan.rb || E.rbHair || E.rbHairDone)
return;
var L = E.plan.L || {};
if (L.dgxDress || E.plan.rb.child)
return;
var spec = E.spec || {};
if (spec.deity)
return;
E.rbHairDone = 1;
var style = rbWantStyle(L), own = RB_OWNHAIR[E.plan.rb.f] || "short", hat = L.hat && L.hat !== "none" ? L.hat : null;
if (hat === "hood" || own === "veil")
return;
if (rbCovered(own))
return;
if ((RB_HAIROK[style] || []).indexOf(own) >= 0 && style !== "bald" && !(style === "buzz" && own !== "buzz"))
return;
var tries = E.rbHairTry = (E.rbHairTry || 0) + 1;
var mk = null;
E.model.traverse(function (m) { var i = m.isMesh && m.material && m.material.userData && m.material.userData.rb; if (i && i.kind === "head" && i.mask)
mk = RB.mask[i.mask]; });
if (!mk || !mk.image || !mk.image.data || mk.image.width < 8) {
E.rbHairDone = 0;
if (tries < 40)
setTimeout(function () { if (E.model)
rbHairDo(E); }, 250);
return;
}
var col = rbHairCol(E, L);
if (L.hair == null) {
var v = rbLin(col);
E.model.traverse(function (m) { var U = m.isMesh && m.material && m.material.userData && m.material.userData.rbU; if (U)
U.rbT.value[4] = v; });
}
try {
if (typeof hfHead === "function") {
var H0 = hfHead(E);
if (H0) {
E.rbPreTop = H0.ymax;
if (H0.G.parent)
H0.G.parent.remove(H0.G);
}
}
}
catch (e) { }
var flat = rbScalp(E, style, L);
if (flat && E.hatFit && typeof hfMake === "function") {
if (E.hatFit.parent)
E.hatFit.parent.remove(E.hatFit);
E.hatFit = null;
}
try {
if (typeof bshApply === "function")
bshApply(E);
}
catch (e) { }
if (E.mixer)
E.mixer.update(0);
E.model.updateMatrixWorld(true);
if (flat && hat && !E.hatFit && typeof HATF !== "undefined" && HATF.list[hat]) {
try {
var hg = hfMake(E, hat, L);
if (hg)
E.hatFit = hg;
}
catch (e) { }
}
if (style === "bald" || style === "buzz")
return;
E.model.updateMatrixWorld(true);
var H = hfHead(E);
if (!H)
return;
try {
var G = rbHairMake(H, style, col, hat, L);
G.traverse(function (o) { o.userData.hdf = 1; });
H.G.add(G);
E.rbHair = H.G;
H.G.name = "made hair";
}
catch (e) {
if (H.G.parent)
H.G.parent.remove(H.G);
if (window.console)
console.warn("[hair]", e);
}
}
function rbHairUndo(E) { return __ZC(441, 88, this, arguments, new.target); }
if (typeof hdfAttach === "function") {
var rbAtt5 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt5.apply(this, arguments); try {
rbHairDo(E);
}
catch (e) {
if (window.console)
console.warn("[hair]", e);
} return r; };
}
if (typeof hdfDetach === "function") {
var rbDet5 = hdfDetach;
hdfDetach = function (E) { try {
rbHairUndo(E);
}
catch (e) { } return rbDet5.apply(this, arguments); };
}
function rbBoneY(root, re) {
var y = null;
root.traverse(function (m) {
if (y != null || !m.isSkinnedMesh || !m.skeleton)
return;
var S = m.skeleton;
S.bones.forEach(function (b, i) { if (y == null && re.test(b.name))
y = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().copy(S.boneInverses[i]).invert()).applyMatrix4(new THREE.Matrix4().copy(m.bindMatrix).invert()).y; });
});
return y;
}
function rbHandsMark(m) { return __ZC(441, 89, this, arguments, new.target); }
function rbWearBody(E) {
if (!rbHairOn() || !E || !E.model || !E.plan || !E.plan.rb || (E.plan.L && E.plan.L.dgxDress))
return;
var L = E.plan.L || {}, wants = typeof whWants === "function" ? whWants(L) : [], hem = -99;
if (typeof whBareLegs === "function" && whBareLegs(L, wants) && !E.plan.rb.skirt) {
var knee = rbBoneY(E.model, /^calf_l$/i), hip = rbBoneY(E.model, /^thigh_l$/i);
if (knee != null && hip != null) {
var w = wants.indexOf("shorts") >= 0 ? 0.45 : (wants.indexOf("dress") >= 0 ? -0.05 : 0.08);
hem = knee + (hip - knee) * w;
}
}
var glove = L.hands === "gloves" && typeof whCol === "function" ? rbLin(whCol("glove", L)) : null;
E.model.traverse(function (m) {
var U = m.isMesh && m.material && m.material.userData && m.material.userData.rbU;
if (!U)
return;
if (U.rbHem)
U.rbHem.value = hem;
if (U.rbGlove) {
if (glove && m.isSkinnedMesh) {
rbHandsMark(m);
U.rbGlove.value.copy(glove);
}
else
U.rbGlove.value.set(0, 0, 0, 0);
}
});
}
if (typeof hdfAttach === "function") {
var rbAtt6 = hdfAttach;
hdfAttach = function (E) { var r = rbAtt6.apply(this, arguments); try {
rbWearBody(E);
}
catch (e) {
if (window.console)
console.warn("[wear real]", e);
} return r; };
}
function whOverOf(m) {
var M = Array.isArray(m.material) ? m.material[0] : m.material, info = M && M.userData && M.userData.rb;
if (!info || info.kind !== "body")
return null;
if (info.all)
return info.all === 1 ? function () { return 1; } : null;
var t = info.mask ? rbMaskTex(info.mask) : null, im = t && t.image, uv = m.geometry && m.geometry.attributes.uv;
if (!im || !im.data || !(im.width > 1) || !uv)
return null;
var w = im.width, h = im.height, d = im.data, norm = uv.normalized ? 1 / ((uv.array instanceof Uint16Array) ? 65535 : (uv.array instanceof Uint8Array) ? 255 : 1) : 1;
return function (i) {
var u = uv.getX(i) * norm, v = uv.getY(i) * norm;
u -= Math.floor(u);
v -= Math.floor(v);
var c = Math.round(d[Math.min(h - 1, Math.floor(v * h)) * w + Math.min(w - 1, Math.floor(u * w))] / 40);
return c === 1 || c === 0;
};
}
function rbMaskHere(E) {
var ok = true;
E.model.traverse(function (m) {
if (!m.isSkinnedMesh)
return;
var M = Array.isArray(m.material) ? m.material[0] : m.material, info = M && M.userData && M.userData.rb;
if (!info || info.kind !== "body" || info.all || !info.mask)
return;
var t = rbMaskTex(info.mask);
if (!t || !t.image || !(t.image.width > 1))
ok = false;
});
return ok;
}
if (typeof whDress === "function") {
var rbWh6 = whDress;
whDress = function (E) {
if (E && E.model && E.plan && E.plan.rb && !E.wh && !rbMaskHere(E) && (E.rbFitTry = (E.rbFitTry || 0) + 1) <= 20) {
setTimeout(function () { try {
if (E.model && !E.wh) {
if (typeof whQueue === "function")
whQueue(E);
else
whDress(E);
}
}
catch (e) {
if (window.console)
console.warn("[wear real]", e);
} }, 250);
return;
}
return rbWh6.apply(this, arguments);
};
}
var RBD = { file: { m: RB.dir + "dances-m.glb", f: RB.dir + "dances-f.glb" }, clips: {}, asked: {},
KEY: { easy: "dance", neutral: "dance", cool: "dance_cool", lively: "dance_lively", silly: "dance_silly", soft: "dance_soft" },
MOOD: { any: ["dance", "dance_cool", "dance_lively", "dance_silly", "dance_soft"],
club: ["dance_cool", "dance_lively", "dance", "dance_cool", "dance_silly"],
party: ["dance", "dance_lively", "dance_silly", "dance_cool", "dance_soft"],
wild: ["dance_lively", "dance_silly", "dance"],
gentle: ["dance_soft", "dance", "dance_cool"] },
WORD: { dance: "an easy dance", dance_cool: "a cool, smooth dance", dance_lively: "a lively dance", dance_silly: "a silly, happy dance", dance_soft: "a soft, flowing dance" },
ORDER: ["dance", "dance_cool", "dance_lively", "dance_silly", "dance_soft"] };
function rbdIs(E) { return !!(E && E.plan && (E.plan.set === "rbm" || E.plan.set === "rbf") && E.acts); }
function rbdSex(E) { return E.plan.set === "rbf" ? "f" : "m"; }
function rbdLoad(sex) {
if (RBD.asked[sex] || typeof hdfFile !== "function")
return;
RBD.asked[sex] = 1;
hdfFile(RBD.file[sex], function (F) {
RBD.clips[sex] = (F.clips || []).filter(function (c) { return /^dance/.test(c.name); });
(HDF.list || []).forEach(function (E) { try {
rbdAdd(E);
}
catch (e) { } });
});
}
function rbdAdd(E) {
if (!rbdIs(E) || !E.mixer || E.rbdHas)
return;
var cl = RBD.clips[rbdSex(E)];
if (!cl || !cl.length)
return;
cl.forEach(function (c) {
var old = E.acts[c.name];
E.acts[c.name] = E.mixer.clipAction(c);
if (old && E.cur === old)
E.state = null;
});
E.rbdHas = true;
}
function rbdPick(E, u) { return __ZC(441, 90, this, arguments, new.target); }
function rbdWaltz(E) { return E.acts.walk ? "walk" : "idle"; }
(function () {
if (typeof hdfMotion !== "function")
return;
var hm = hdfMotion;
hdfMotion = function (E, dt) {
var st = hm.apply(this, arguments);
try {
var u = E && E.g && E.g.userData;
if (!u || !u.dance || st === "sit" || !rbdIs(E))
return st;
if (E.spd > (u.danceMove ? 6 : 0.9))
return st;
if (u.dance === "waltz") {
E.rbdWaltz = 1;
return rbdWaltz(E);
}
return rbdPick(E, u) || st;
}
catch (e) {
return st;
}
};
})();
(function () {
if (typeof hdfPlay !== "function")
return;
var hp = hdfPlay;
hdfPlay = function (E, n, fade) {
var was = E && E.cur, r = hp.apply(this, arguments);
try {
if (E && E.cur && E.cur !== was && /^dance/.test(n)) {
var d = E.cur.getClip().duration || 1, h = typeof hdfHash === "function" ? hdfHash(String(E.id) + n) : 0;
E.cur.time = (h % 1000) / 1000 * d;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof hdfTick !== "function")
return;
var ht = hdfTick;
hdfTick = function (dt) {
var r = ht.apply(this, arguments);
try {
var L = HDF.list;
for (var i = 0; i < L.length; i++) {
var E = L[i];
if (!E.model || !E.cur || !E.g)
continue;
var u = E.g.userData;
if (u.dance === "waltz" && E.state === "walk" && E.spd < 0.9) {
E.cur.timeScale = 0.55;
rbdHold(E);
}
else if (u.dance && E.state && /^dance/.test(E.state)) {
var tp = u.danceTempo || 1;
E.cur.timeScale = tp * (0.94 + ((hdfHash(String(E.id)) % 13) / 100));
}
}
}
catch (e) { }
return r;
};
})();
function rbdHold(E) { return __ZC(441, 91, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E, files) {
var r = ha.apply(this, arguments);
try {
if (E && E.model && rbdIs(E)) {
E.rbdHas = false;
E.rbdWaltz = 0;
var from = HDF_CLIPS[E.plan.set] && HDF_CLIPS[E.plan.set].from, F = from && HDF.files[from];
if (F && F.clips && !E.acts.dance)
for (var i = 0; i < F.clips.length; i++)
if (F.clips[i].name === "dance") {
E.acts.dance = E.mixer.clipAction(F.clips[i]);
break;
}
rbdAdd(E);
if (E.g) {
E.g.userData.rbReal = 1;
if (E.g.userData.dance)
rbdLoad(rbdSex(E));
}
}
}
catch (e) {
if (window.console)
console.warn("[dance]", e);
}
return r;
};
var hd = hdfDetach;
hdfDetach = function (E) { try {
if (E && E.g && E.model)
E.g.userData.rbReal = 0;
if (E)
E.rbdHas = false;
}
catch (e) { } return hd.apply(this, arguments); };
})();
function rbdReal(g) { return !!(g && g.userData && g.userData.rbReal); }
var RBD_ME = { n: 0 };
(function () {
if (typeof togEmoteOn !== "function")
return;
var on = togEmoteOn;
togEmoteOn = function (id, kind) {
var r = on.apply(this, arguments);
try {
if (kind === "dance") {
var g = togFigure(id);
if (g) {
g.userData.dance = 1;
g.userData.danceN = id === "me" ? RBD_ME.n : ((g.userData.danceN | 0) + 1);
var E = togHD(g);
if (E && rbdIs(E))
rbdLoad(rbdSex(E));
}
}
}
catch (e) { }
return r;
};
var off = togEmoteOff;
togEmoteOff = function (id) {
try {
var e = TOG.emo[id];
if (e && e.kind === "dance") {
var g = togFigure(id);
if (g && g.userData.dance === 1)
g.userData.dance = 0;
}
}
catch (er) { }
return off.apply(this, arguments);
};
})();
(function () {
if (typeof togEmote !== "function")
return;
var te = togEmote;
togEmote = function (kind) {
var was = null;
try {
was = TOG.emo.me && TOG.emo.me.kind;
}
catch (e) { }
if (kind === "dance")
RBD_ME.n++;
var r = te.apply(this, arguments);
try {
if (kind === "dance") {
var g = typeof meG !== "undefined" ? meG : null;
if (g)
g.userData.danceN = RBD_ME.n;
var E = g && togHD(g), nm = E && rbdIs(E) && RBD.clips[rbdSex(E)] ? rbdPick(E, g.userData) : null;
if (was === "dance" && TOG.emo.me) {
TOG.emo.me.len = Math.max(TOG.emo.me.len, TOG.emo.me.t + TOG_EMO.dance.len);
}
if (nm && typeof setStatus === "function")
setStatus("💃 You dance " + RBD.WORD[nm] + ". Press Dance again for another.");
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof togPose !== "function")
return;
var tp = togPose;
togPose = function (g, kind, t, len) {
if (kind === "dance" && rbdReal(g)) {
var b = g.children[0];
if (b) {
b.rotation.set(0, 0, 0);
b.position.y = 0;
}
return;
}
return tp.apply(this, arguments);
};
})();
(function () {
if (typeof togHDPose !== "function")
return;
var tp = togHDPose;
togHDPose = function (g, E, kind, t, len) {
if (kind === "dance" && rbdIs(E))
return;
return tp.apply(this, arguments);
};
})();
var MHW = { dir: "assets/models/characters/makehuman/", dyeU: {}, base: null, baseP: null, items: {}, itemsP: {}, reg: {}, geo: {}, mats: {}, tex: {}, q: [], busy: false, n: 0 };
function mhwOn() { return !window.MHW_OFF && !(typeof LITE !== "undefined" && LITE) && typeof THREE !== "undefined" && typeof DecompressionStream !== "undefined"; }
var MHW_TY = { f: Float32Array, I: Uint32Array, h: Int16Array, H: Uint16Array };
function mhwView(buf, L) { return new MHW_TY[L[2]](buf, L[0], L[1]); }
async function mhwBin(url) {
var b = await (await fetch(url + ".gz")).arrayBuffer(), h = new Uint8Array(b, 0, 2);
if (h[0] !== 0x1f || h[1] !== 0x8b)
return b;
return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
}
function mhwUnplane(buffer, layout) { return __ZC(441, 92, this, arguments, new.target); }
function mhwBase() { return __ZC(441, 93, this, arguments, new.target); }
function mhwTex(file, srgb) {
if (MHW.tex[file])
return MHW.tex[file];
var t = new THREE.TextureLoader().load(MHW.dir + "textures/" + file);
t.flipY = true;
t.encoding = THREE.sRGBEncoding;
t.anisotropy = 4;
MHW.tex[file] = t;
return t;
}
function mhwItem(id) { return __ZC(441, 94, this, arguments, new.target); }
var MHW_SETS = {
fDress: ["toigo_shift_dress", "toigo_halter_dress_midi", "toigo_halter_dress_knee_length", "toigo_keyhole_neck_dress", "toigo_camisole_dress_with_full_skirt", "toigo_dress_with_tiered_skirt", "toigo_bodice_dress_with_lace_ruffle_skirt", "toigo_halter_dress_with_fluted_skirt"],
fTop: ["toigo_fisherman_sweater", "toigo_keyhole_tank_top", "toigo_bodice-style_top", "toigo_turtleneck_halter_top", "joepal_crude_t-shirt_female", "toigo_basic_tucked_t-shirt"],
fSkirt: ["toigo_long_full_skirt", "toigo_tiered_skirt", "toigo_tiered_mini_skirt", "toigo_skirt_with_lace_ruffle"],
fPants: ["toigo_wool_pants", "toigo_harem_pants", "cortu_cargo_pants"],
fSuit: ["female_casualsuit01", "female_casualsuit02"],
fSmart: ["female_elegantsuit01"],
fShoes: ["shoes05", "shoes06", "toigo_mj_cloth_shoes", "toigo_ankle_boots_female", "shoes02"],
mSuit: ["male_casualsuit01", "male_casualsuit02", "male_casualsuit03", "male_casualsuit04", "male_casualsuit05"],
mSmart: ["male_elegantsuit01", "male_worksuit01"],
mTop: ["namuhekam_male_polo_shirt"],
mPants: ["cortu_cargo_pants", "toigo_wool_pants", "rehmanpolanski_viking_pants"],
mShoes: ["shoes01", "shoes02", "shoes03", "shoes04", "toigo_ankle_boots_male", "rehmanpolanski_viking_boots"],
robe: ["donitz_monk_robe", "mindfront_kimono"],
mArmor: ["culturalibre_hero_suit_1", "culturalibre_hero_suit_2", "culturalibre_hero_suit_3", "thegreatengineer_galactic_warrior_uniform"],
fArmor: ["culturalibre_heroine_suit_2", "thegreatengineer_galactic_warrior_uniform"],
mBoots: ["culturalibre_hero_boots_1", "culturalibre_hero_boots_2", "rehmanpolanski_viking_boots"],
fBoots: ["culturalibre_heroine_boots_1", "culturalibre_heroine_boots_2", "toigo_ankle_boots_female"],
mage: ["ours_wizard_robe", "ours_sorcerer_robe"],
stars: ["ours_space_suit", "ours_space_suit", "thegreatengineer_galactic_warrior_uniform"],
eva: ["ours_space_suit"],
fShoesDress: ["toigo_mj_cloth_shoes", "toigo_ankle_boots_female", "shoes02"]
};
var MHW_HAIR = { short: { m: ["short01", "short02", "short03", "short04", "cortu_short_messy_hair"], f: ["toigo_inverted_bob", "bob01", "toigo_blunt_bob_with_bangs", "short02"] },
waves: { m: ["cortu_short_messy_hair", "short03", "cortu_shaggy_green_hair"], f: ["culturalibre_hair_05", "toigo_curled_under_bob", "faydaen_hair_1"] },
curly: { m: ["cortu_short_messy_hair", "cortu_shaggy_green_hair"], f: ["toigo_curled_under_bob_with_bangs", "culturalibre_hair_05", "faydaen_hair_1"] },
coily: { m: ["afro01"], f: ["afro01"] }, afro: { m: ["afro01"], f: ["afro01"] },
long: { m: ["long01", "cortu_straight_bangs"], f: ["long01", "faydaen_hair_1", "culturalibre_hair_05", "cortu_straight_bangs", "bob02", "toigo_blunt_bob"] },
ponytail: { m: ["ponytail01"], f: ["ponytail01"] }, braids: { m: ["braid01"], f: ["braid01"] } };
var MHW_HAIRL = { "afro01": 0.029, "bob01": 0.129, "bob02": 0.595, "braid01": 0.08, "cortu_shaggy_green_hair": 0.127, "cortu_short_messy_hair": 0.597, "cortu_straight_bangs": 0.163, "culturalibre_hair_05": 0.17, "faydaen_hair_1": 0.459, "long01": 0.128, "ponytail01": 0.247, "short01": 0.107, "short02": 0.246, "short03": 0.22, "short04": 0.142, "toigo_blunt_bob": 0.544, "toigo_blunt_bob_with_bangs": 0.245, "toigo_curled_under_bob": 0.375, "toigo_curled_under_bob_with_bangs": 0.507, "toigo_inverted_bob": 0.749, "toigo_inverted_bob_with_bangs": 0.145 };
function mhwHairOf(spec, L, out) {
if (L.hat && L.hat !== "none")
return null;
if (out.some(function (id) { return /hood|helmet/.test(id); }))
return null;
var st = L.hairStyle || (L.sex === "f" ? "long" : "short"), T = MHW_HAIR[st];
if (!T)
return null;
var a = T[L.sex === "m" ? "m" : "f"];
return a[rbMix(hdfHash("mhh:" + (spec.id || "x"))) % a.length];
}
var MHW_SKIRT = /dress|skirt|robe|kimono/;
MHW_SETS.skirted = /dress|skirt/;
function mhwOutfit(spec, L) {
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
}
var MHW_SHOE = { m: { shoes: ["shoes01", "shoes02", "shoes04"], sneakers: ["shoes03"], boots: ["toigo_ankle_boots_male", "rehmanpolanski_viking_boots"], sandals: ["toigo_mj_cloth_shoes"], heels: ["shoes02"] },
f: { shoes: ["shoes05", "shoes06", "toigo_mj_cloth_shoes"], sneakers: ["shoes03"], boots: ["toigo_ankle_boots_female"], sandals: ["toigo_mj_cloth_shoes"], heels: ["shoes05", "shoes06"] } };
function mhwWardrobe(spec, L) { return __ZC(441, 95, this, arguments, new.target); }
function mhwIsDreamer(spec) { var id = String(spec && spec.id || ""); return id === "__me" || id.indexOf("presence_") === 0; }
var MHW_FIG = {
average: {},
slim: { fat: -0.7 },
full: { fat: 0.55, belly: 0.3 },
heavy: { fat: 1, belly: 0.7, hip: 0.3 },
veryheavy: { fat: 1.6, belly: 1.2, hip: 0.5 },
muscular: { mus: 1, fat: -0.2 },
strongman: { mus: 1.5, fat: 0.5, belly: 0.3 },
curvy: { fat: 0.25, hip: 1, bust: 0.8 },
stocky: { fat: 0.6, mus: 0.5, belly: 0.4 },
older: { fat: 0.35, belly: 0.6, hip: 0.2, sag: 1 }
};
var MHW_FIG_LABEL = { average: "Average", slim: "Slim", full: "Full", heavy: "Heavy", veryheavy: "Very heavy", muscular: "Muscular", strongman: "Strongman", curvy: "Curvy", stocky: "Stocky", older: "Softer, older" };
var MHW_FAT = { pelvis: 0.035, spine_01: 0.042, spine_02: 0.032, spine_03: 0.024, clavicle_l: 0.008, clavicle_r: 0.008, upperarm_l: 0.022, upperarm_r: 0.022, lowerarm_l: 0.011, lowerarm_r: 0.011, thigh_l: 0.032, thigh_r: 0.032, calf_l: 0.014, calf_r: 0.014, neck_01: 0.016 };
var MHW_MUS = { spine_03: 0.018, spine_02: 0.008, clavicle_l: 0.016, clavicle_r: 0.016, upperarm_l: 0.02, upperarm_r: 0.02, lowerarm_l: 0.012, lowerarm_r: 0.012, thigh_l: 0.016, thigh_r: 0.016, calf_l: 0.012, calf_r: 0.012, neck_01: 0.012, spine_01: -0.006 };
function mhwShapeP(B, fig) { return __ZC(441, 96, this, arguments, new.target); }
var MHW_FIG_DEAL = { m: ["average", "average", "average", "slim", "slim", "full", "full", "heavy", "veryheavy", "muscular", "strongman", "stocky", "older", "older"],
f: ["average", "average", "average", "slim", "slim", "full", "full", "heavy", "veryheavy", "curvy", "curvy", "muscular", "stocky", "older"] };
function mhwFigOf(spec, L) {
if (L && L.figure && MHW_FIG[L.figure])
return L.figure;
if (mhwIsDreamer(spec))
return "average";
var a = MHW_FIG_DEAL[L && L.sex === "m" ? "m" : "f"];
return a[rbMix(hdfHash("fig:" + (spec.id || spec.name || "x"))) % a.length];
}
function mhwHost(E) {
var host = null;
E.model.traverse(function (m) { if (m.isSkinnedMesh && !/^mh /.test(m.name) && (!host || m.skeleton.bones.length > host.skeleton.bones.length))
host = m; });
return host;
}
function mhwFrame(host) { return __ZC(441, 97, this, arguments, new.target); }
var MHW_CH = { pelvis: "spine_01", spine_01: "spine_02", spine_02: "spine_03", spine_03: "neck_01", neck_01: "head", clavicle_l: "upperarm_l", clavicle_r: "upperarm_r", upperarm_l: "lowerarm_l", upperarm_r: "lowerarm_r", lowerarm_l: "hand_l", lowerarm_r: "hand_r", hand_l: "middle_01_l", hand_r: "middle_01_r", thigh_l: "calf_l", thigh_r: "calf_r", calf_l: "foot_l", calf_r: "foot_r", foot_l: "ball_l", foot_r: "ball_r" };
function mhwRegister(B, F, PS) { return __ZC(441, 98, this, arguments, new.target); }
function mhwSmooth(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function mhwBodyGeo(B, F, Rg) { return __ZC(441, 99, this, arguments, new.target); }
function mhwBodyPart(B, BG, items) { return __ZC(441, 100, this, arguments, new.target); }
var MHW_PUSH = { shoes: 0.004, bottom: 0.007, outfit: 0.009, top: 0.013, hair: 0.003, hat: 0.008, glasses: 0.002 };
var MHW_PUSH_ID = { ours_space_suit: 0.03 };
function mhwItemGeo(B, F, Rg, it) { return __ZC(441, 101, this, arguments, new.target); }
function mhwItemMat(it, dye) { return __ZC(441, 102, this, arguments, new.target); }
var MHW_NODYE = /^(culturalibre_|thegreatengineer_|ours_|joachip_|matcreator_|rehmanpolanski_viking_(pants|boots))|hood|helmet|horns|mask/;
var MHW_ONEZONE = /dress|skirt|robe|kimono|tunic|sweater|t-shirt|top|polo|shoes|boots|pants/;
var MHW_CANVAS = null;
function mhwDyeMeans(it, G, tex, U) { return __ZC(441, 103, this, arguments, new.target); }
function mhwDyeMat(M, it, dye) { return __ZC(441, 104, this, arguments, new.target); }
function mhwDyeOf(id, L) { return __ZC(441, 105, this, arguments, new.target); }
function mhwHairMat(it, col) { return __ZC(441, 106, this, arguments, new.target); }
var MHW_SKINMEAN = { africanm: [0.103, 0.042, 0.023], africanf: [0.136, 0.045, 0.025], asianm: [0.573, 0.329, 0.222], asianf: [0.623, 0.339, 0.21], caucasianm: [0.744, 0.393, 0.25], caucasianf: [0.619, 0.342, 0.228] };
function mhwSkinMat(E, sex) { return __ZC(441, 107, this, arguments, new.target); }
function mhwDress(E) { return __ZC(441, 108, this, arguments, new.target); }
function mhwHemCut(R, list, items) { return __ZC(441, 109, this, arguments, new.target); }
function mhwFlat(E, n) { return __ZC(441, 110, this, arguments, new.target); }
if (typeof rbHairDo === "function") {
var mhwHairDo0 = rbHairDo;
rbHairDo = function (E) { var r = mhwHairDo0.apply(this, arguments); try {
if (E && E.mhw && E.plan && (E.plan.mhHair || E.plan.mh.some(function (id) { return /hood|helmet/.test(id); })))
mhwFlat(E, 0);
}
catch (e) { } return r; };
}
function mhwPump() { return __ZC(441, 111, this, arguments, new.target); }
if (typeof hdfPlan === "function") {
var mhwPlan0 = hdfPlan;
hdfPlan = function (spec) {
var p = mhwPlan0.apply(this, arguments);
try {
if (!mhwOn() || !p || !p.rb || p.child || p.rb.job || spec.deity || spec.wCostume || spec._wcHeld || (p.L && p.L.dgxDress))
return p;
var dream = mhwIsDreamer(spec), Lw = p.L || {};
p.mh = (dream && mhwWardrobe(spec, Lw)) || mhwOutfit(spec, Lw);
p.mhHair = mhwHairOf(spec, p.L || {}, p.mh);
p.mhFig = mhwFigOf(spec, Lw);
p.key += ":mh:" + p.mh.join(",") + (p.mhHair ? ":" + p.mhHair : "") + ":" + [Lw.top, Lw.bottom, Lw.layerColor, Lw.shoes].join("/") + ":" + p.mhFig;
}
catch (e) {
p && (p.mh = null);
}
return p;
};
}
if (typeof whDress === "function") {
var mhwWh0 = whDress;
var MHW_WHKEEP = /^(back|hat|face|neck|ears|hands|waist)$/;
whDress = function (E) {
if (E && E.plan && E.plan.mh) {
if (!mhwIsDreamer(E.spec) || typeof whWants !== "function" || typeof WEAR === "undefined") {
E.wh = 1;
return;
}
var w0 = whWants;
whWants = function (L) { return w0.apply(this, arguments).filter(function (k) { return k === "cloakhood" || (WEAR[k] && MHW_WHKEEP.test(WEAR[k].slot)); }); };
try {
return mhwWh0.apply(this, arguments);
}
finally {
whWants = w0;
}
}
return mhwWh0.apply(this, arguments);
};
}
if (typeof hdfAttach === "function") {
var mhwAtt0 = hdfAttach;
hdfAttach = function (E) {
var r = mhwAtt0.apply(this, arguments);
try {
if (E && E.model && E.plan && E.plan.mh && !E.mhw) {
E.mhwWait = 0;
MHW.q.push(E);
mhwPump();
}
}
catch (e) { }
return r;
};
}
if (typeof hdfDetach === "function") {
var mhwDet0 = hdfDetach;
hdfDetach = function (E) {
if (E) {
(E.mhw || []).forEach(function (S) { if (S.parent)
S.parent.remove(S); });
E.mhw = null;
E.mhwWait = 0;
var k = MHW.q.indexOf(E);
if (k >= 0)
MHW.q.splice(k, 1);
}
return mhwDet0.apply(this, arguments);
};
}
var RBFACE = { near: 14, gain: 1.8 };
function rbfaceOn() { return !window.RBFACE_OFF; }
var RBFACE_MOODS = {
happy: { jaw: 0.02, b: [["MouthCorner", 5, 6, -3], ["MouthBottom", 3, 3, -1], ["Upperlip", 1, 1.5, 0], ["Cheek", 1.5, 3.5, 1], ["OuterEyebrow", 0, 0.6, 0]] },
laugh: { jaw: 0.2, b: [["MouthCorner", 6.5, 7, -3.5], ["MouthBottom", 3, 1, -1], ["Upperlip", 1, 2.5, 0], ["MUpperLip", 0, 2, 0], ["Cheek", 2, 4.5, 1.5], ["InnerEyebrow", 0, 1.5, 0], ["OuterEyebrow", 0, 1.5, 0]] },
sad: { jaw: 0, b: [["MouthCorner", 0.5, -4, 0], ["MouthBottom", 0, -1.5, 0], ["MBottomLip", 0, 1, 1], ["InnerEyebrow", -1, 4.5, 0], ["MMiddleEyebrow", 0, 2.5, 0], ["OuterEyebrow", 0, -1.5, 0]] },
angry: { jaw: 0.01, b: [["InnerEyebrow", -2.5, -4, 1], ["MMiddleEyebrow", 0, -3, 1], ["OuterEyebrow", 0, 0.5, 0], ["MouthCorner", -2, -2, 0], ["Upperlip", 0, 1.2, 0], ["MBottomLip", 0, 1.2, 0], ["Cheek", 0, 1, 0]] },
surprised: { jaw: 0.24, b: [["InnerEyebrow", 0, 6, 0], ["MMiddleEyebrow", 0, 5, 0], ["OuterEyebrow", 0, 5, 0], ["MouthCorner", -2, 0, 0]] },
scared: { jaw: 0.12, b: [["InnerEyebrow", -1.5, 6, 0], ["MMiddleEyebrow", 0, 4, 0], ["OuterEyebrow", 0, 2.5, 0], ["MouthCorner", 4.5, -2.5, -4], ["MouthBottom", 2, -1.5, -1]] },
puzzled: { jaw: 0.03, b: [["L:InnerEyebrow", 0, 5, 0], ["L:OuterEyebrow", 0, 6, 0], ["R:InnerEyebrow", -1, -2, 0], ["R:OuterEyebrow", 0, -1, 0], ["L:MouthCorner", 2, 2, -1], ["R:MouthCorner", 0, -1, 0]] },
hurt: { jaw: 0.08, b: [["InnerEyebrow", -2, -3, 1], ["MMiddleEyebrow", 0, -2.5, 1], ["MouthCorner", 4, -1, -2], ["Upperlip", 0, 2, 0], ["Cheek", 1, 3, 0]] },
calm: { jaw: 0, b: [] }
};
var RBFACE_NAMES = ["EyeBlinkBottom", "EyeBlinkTop", "Upperlip", "MouthCorner", "Cheek", "InnerEyebrow", "OuterEyebrow", "MouthBottom"];
function rbfaceRig(E) { return __ZC(441, 112, this, arguments, new.target); }
function rbfaceLocal(P, F, v) { var d = v.clone().applyMatrix4(new THREE.Matrix4().extractRotation(F.Rinv)); return d.applyMatrix3(P.toLocal); }
function rbfaceMood(E, now) { return __ZC(441, 113, this, arguments, new.target); }
function rbfaceTalking(E, now) {
var g = E.g;
if (!g)
return false;
for (var i = 0; i < g.children.length; i++) {
var c = g.children[i];
if (c.isSprite && c.visible && c.userData && c.userData.speech && now - c.userData.speech < c.userData.speechLen)
return true;
}
return false;
}
function rbfaceApply(E, R, now, dt) { return __ZC(441, 114, this, arguments, new.target); }
function rbFace(g, mood, secs, k) { if (!g || !g.userData)
return; g.userData.rbFace = { mood: mood, until: performance.now() + (secs || 3) * 1000, k: k == null ? 1 : k }; }
if (typeof hdfTick === "function") {
var rbfaceTick0 = hdfTick;
hdfTick = function (dt) {
var r = rbfaceTick0.apply(this, arguments);
if (!rbfaceOn())
return r;
try {
var now = performance.now();
for (var i = 0; i < HDF.list.length; i++) {
var E = HDF.list[i];
if (!E.model || !E.plan || !E.plan.rb || !E.model.visible)
continue;
if (E.d != null && E.d > RBFACE.near)
continue;
if (E.rbfaceRig === undefined) {
try {
E.rbfaceRig = rbfaceRig(E);
}
catch (e) {
E.rbfaceRig = null;
}
}
if (E.rbfaceRig)
rbfaceApply(E, E.rbfaceRig, now, Math.min(0.1, dt || 0.016));
}
}
catch (e) {
if (window.console && !RBFACE.warned) {
RBFACE.warned = 1;
console.warn("[faces]", e);
}
}
return r;
};
}
if (typeof hdfDetach === "function") {
var rbfaceDet0 = hdfDetach;
hdfDetach = function (E) { if (E) {
E.rbfaceRig = undefined;
E.rbFace = null;
} return rbfaceDet0.apply(this, arguments); };
}
if (typeof makeTag === "function") {
var rbfaceTag0 = makeTag;
makeTag = function (text, bubble) { var sp = rbfaceTag0.apply(this, arguments); try {
if (bubble && sp) {
sp.userData.speech = performance.now();
sp.userData.speechLen = Math.max(1500, Math.min(9000, String(text || "").length * 70));
}
}
catch (e) { } return sp; };
}
if (typeof togEmoteOn === "function") {
var rbfaceEmo0 = togEmoteOn;
togEmoteOn = function (id, kind, name) { return __ZC(441, 115, this, arguments, new.target); };
}
var ARA = { js: "assets/vendor/ara/ara-maker.js", data: "assets/models/characters/ara/", wait: null, q: [], busy: false, made: 0,
clips: ["idle", "walk", "run", "sit_idle", "drive_car", "sword_slash", "punch", "hit", "death_backward", "wave", "cheer", "dance_groove", "talk", "swim_freestyle"] };
HDF_CLIPS.ara = { from: null, idle: "Idle", walk: "Walk", run: "Run", sit: "Sit idle (chair)", drive: "Drive car", attack: "Sword slash", cast: "Punch", hurt: "Hit reaction", fall: "Death (fall backward)" };
function araOn() { return !window.ARA_OFF && typeof Worker !== "undefined" && typeof HDF !== "undefined" && location.protocol !== "file:"; }
function araLoad(cb) { return __ZC(441, 116, this, arguments, new.target); }
function araRecipe(L) {
var r = L && L.ara;
if (!r)
return null;
if (typeof r === "string") {
try {
r = JSON.parse(r);
}
catch (e) {
return null;
}
}
return (r && typeof r === "object" && !Array.isArray(r)) ? r : null;
}
function araHash(s) { var h = 2166136261 >>> 0; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h.toString(36); }
function araLite() { return typeof LITE !== "undefined" && !!LITE; }
function araParams(r) { return __ZC(441, 117, this, arguments, new.target); }
var ARA_GREY = {};
function araHairFix(x) { return __ZC(441, 118, this, arguments, new.target); }
function araHairMats(scene) { return __ZC(441, 119, this, arguments, new.target); }
function araMake(file, r, F) {
ARA.q.push({ file: file, r: r, F: F });
araPump();
}
function araPump() { return __ZC(441, 120, this, arguments, new.target); }
if (typeof hdfPlan === "function") {
var araPlan0 = hdfPlan;
hdfPlan = function (spec) {
var p = araPlan0.apply(this, arguments);
try {
if (!araOn() || !p || p.type === "none")
return p;
var id = String(spec && spec.id || "");
if (!(id === "__me" || id.indexOf("presence_") === 0))
return p;
if (spec.wCostume || spec.deity)
return p;
var L = (p && p.L) || spec.look || {}, r = araRecipe(L);
if (!r)
return p;
var js = JSON.stringify(r), f = "ara/" + araHash(js) + (araLite() ? "-l" : "") + "-" + js.length;
if (id !== "__me" && !(HDF.files[f] && HDF.files[f].scene) && araCount() >= araCap())
return p;
return { type: "own", files: [f], main: f, set: "ara", L: L, ara: r, key: "ara:" + f };
}
catch (e) {
return p;
}
};
}
if (typeof hdfFile === "function") {
var araFile0 = hdfFile;
hdfFile = function (file, cb) {
if (String(file).indexOf("ara/") !== 0)
return araFile0.apply(this, arguments);
var F = HDF.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = HDF.files[file] = { scene: null, clips: [], bad: false, wait: [cb] };
var r = null;
for (var i = HDF.list.length - 1; i >= 0 && !r; i--) {
var E = HDF.list[i];
if (E && E.plan && E.plan.main === file)
r = E.plan.ara;
}
if (!r) {
F.bad = true;
F.wait = [];
return;
}
araMake(file, r, F);
};
}
if (typeof hdfFitScale === "function") {
var araFit0 = hdfFitScale;
hdfFitScale = function (root) {
if (!root || !root.userData || !root.userData.araBody)
return araFit0.apply(this, arguments);
root.updateMatrixWorld(true);
var feet = Infinity, B = {};
root.traverse(function (o) { if (o.isBone) {
var v = new THREE.Vector3().setFromMatrixPosition(o.matrixWorld);
if (/^(LeftToeBase|RightToeBase|LeftFoot|RightFoot)$/.test(o.name))
feet = Math.min(feet, v.y);
if (o.name === "Hips")
B.hips = v;
} });
var hips = B.hips || new THREE.Vector3(), bot = isFinite(feet) ? feet - 0.06 : 0;
var b = new THREE.Box3();
b.min.set(hips.x - 0.2, bot, hips.z - 0.2);
b.max.set(hips.x + 0.2, bot + 1.84, hips.z + 0.2);
return b;
};
}
if (typeof hdfAttach === "function") {
var araAtt0 = hdfAttach;
hdfAttach = function (E) {
var r = araAtt0.apply(this, arguments);
try {
if (E && E.model && E.plan && E.plan.set === "ara") {
var body = E.g && E.g.children[0];
if (body && body.scale.y > 0)
E.model.scale.set(1 / (body.scale.x || 1), 1 / body.scale.y, 1 / (body.scale.z || 1));
(E.hats || []).forEach(function (m) { if (m.visible) {
m.visible = false;
(E.hid = E.hid || []).push(m);
} });
if (E.hatFit)
E.hatFit.visible = false;
if (E.glassFit)
E.glassFit.visible = false;
}
}
catch (e) { }
return r;
};
}
if (typeof whDress === "function") {
var araWh0 = whDress;
whDress = function (E) { if (E && E.plan && E.plan.set === "ara") {
E.wh = 1;
return;
} return araWh0.apply(this, arguments); };
}
if (typeof WORN_SLOT !== "undefined" && WORN_SLOT.tail)
WORN_SLOT.tail.bone = /^(pelvis|hips)$/i;
function araCap() { return araLite() ? 4 : (typeof HDF_PHONE !== "undefined" && HDF_PHONE) ? 6 : 12; }
function araCount() { var n = 0; for (var k in HDF.files)
if (k.indexOf("ara/") === 0 && !HDF.files[k].bad)
n++; return n; }
setInterval(function () {
if (typeof HDF === "undefined" || !HDF.files)
return;
var used = {};
HDF.list.forEach(function (E) { if (E && E.plan && E.plan.set === "ara")
used[E.plan.main] = 1; });
var now = performance.now();
Object.keys(HDF.files).forEach(function (k) {
if (k.indexOf("ara/") !== 0)
return;
var F = HDF.files[k];
if (used[k] || (F.wait && F.wait.length)) {
F.idle = 0;
return;
}
if (!F.scene && !F.bad)
return;
if (!F.idle) {
F.idle = now;
return;
}
if (now - F.idle < 30000)
return;
if (F.scene)
F.scene.traverse(function (o) {
if (!o.isMesh)
return;
if (o.geometry)
o.geometry.dispose();
(Array.isArray(o.material) ? o.material : [o.material]).forEach(function (x) { if (!x)
return; for (var q in x) {
if (x[q] && x[q].isTexture)
x[q].dispose();
} x.dispose(); });
});
delete HDF.files[k];
});
}, 10000);
var AMK = { wear: {}, el: null, r: null, ren: null, scene: null, cam: null, fig: null, mixer: null, raf: 0, dirty: false, busy: false, timer: 0, tab: "species", yaw: 0.35, drag: null,
cat: null, lists: null, last: 0, zoom: 0, msg: "" };
function amkFromOld(L) { return __ZC(441, 121, this, arguments, new.target); }
var AMK_SPECIES = [
{ id: "human", label: "Human", set: {} },
{ id: "elf", label: "Elf", set: { height: 0.75, weight: 0.3, muscle: 0.4, proportions: 0.9, hair: "ponytail01" }, mods: { "ears/ear-shape:pointed|triangle": 1, "ears/ear-scale-vert:decr|incr": 1, "ears/ear-rot:backward|forward": -0.8, "ears/ear-shape": 1, "ears/ear-scale-vert": 1, "ears/ear-rot": -0.8, "eyes/eye-corner1:down|up": 0.5, "eyes/eye-corner1": 0.5, "chin/chin-width": -0.4 } },
{ id: "dwarf", label: "Dwarf", set: { height: 0, weight: 0.85, muscle: 0.9, proportions: 0.2 }, beard: "full_beard" },
{ id: "halfling", label: "Halfling or gnome", set: { height: 0, weight: 0.55, muscle: 0.3, age: 0.35, proportions: 0.3 }, mods: { "ears/ear-shape:pointed|triangle": 0.6, "ears/ear-shape": 0.6, "nose/nose-scale-horiz": 0.5, "nose/nose-scale-vert": 0.4 } },
{ id: "orc", label: "Orc", set: { height: 0.75, weight: 0.7, muscle: 1, african: 0, asian: 0, caucasian: 1, skinTint: "#9cc77a" }, mods: { "chin/chin-prominent": 0.8, "chin/chin-width": 0.8, "forehead/forehead-trans": 0.5, "nose/nose-scale-horiz": 0.7, "ears/ear-shape:pointed|triangle": 0.7, "ears/ear-shape": 0.7 } },
{ id: "goblin", label: "Goblin", set: { height: 0, weight: 0.2, muscle: 0.3, african: 0, asian: 0, caucasian: 1, skinTint: "#a8c070" }, mods: { "ears/ear-scale:decr|incr": 1, "ears/ear-scale": 1, "ears/ear-shape:pointed|triangle": 1, "ears/ear-shape": 1, "nose/nose-scale-vert": 0.8, "nose/nose-point": 0.8 } },
{ id: "tiefling", label: "Tiefling", skin: "demon_red", set: { african: 0, asian: 0, caucasian: 1, eyes: "ice" }, mods: { "ears/ear-shape:pointed|triangle": 0.7, "ears/ear-shape": 0.7 } },
{ id: "dragonborn", label: "Dragonborn", skin: "dragonborn_gold", set: { height: 0.85, muscle: 0.9, african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none" }, mods: { "nose/nose-scale-depth": 0.8, "chin/chin-prognathism": 0.6, "forehead/forehead-trans": 0.4 } },
{ id: "reddragon", label: "Red dragonborn", skin: "dragonborn_red", set: { height: 0.85, muscle: 0.9, african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none" }, mods: { "nose/nose-scale-depth": 0.8, "chin/chin-prognathism": 0.6, "forehead/forehead-trans": 0.4 } },
{ id: "lizardfolk", label: "Lizardfolk", skin: "lizardfolk", set: { height: 0.6, muscle: 0.7, african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", eyes: "green" }, mods: { "nose/nose-scale-depth": 0.6, "chin/chin-prognathism": 0.4, "ears/ear-scale:decr|incr": -0.6, "ears/ear-scale": -0.6 } },
{ id: "seafolk", label: "Sea folk", skin: "seafolk", set: { height: 0.55, weight: 0.35, proportions: 0.9, african: 0, asian: 0, caucasian: 1 }, mods: { "ears/ear-shape:pointed|triangle": 0.6, "ears/ear-shape": 0.6 } },
{ id: "frost", label: "Frost folk", skin: "frost", set: { height: 0.7, weight: 0.35, african: 0, asian: 0, caucasian: 1, eyes: "ice" }, mods: { "ears/ear-shape:pointed|triangle": 0.5, "ears/ear-shape": 0.5 } },
{ id: "nightelf", label: "Night elf", skin: "night_elf", set: { height: 0.8, weight: 0.3, muscle: 0.5, proportions: 0.9, african: 0, asian: 0, caucasian: 1 }, mods: { "ears/ear-shape:pointed|triangle": 1, "ears/ear-scale-vert:decr|incr": 1, "ears/ear-rot:backward|forward": -0.8, "ears/ear-shape": 1, "ears/ear-scale-vert": 1, "ears/ear-rot": -0.8, "eyes/eye-corner1:down|up": 0.5, "eyes/eye-corner1": 0.5 } },
{ id: "ashen", label: "Ashen", skin: "ashen", set: { height: 0.6, weight: 0.3, african: 0, asian: 0, caucasian: 1 }, mods: { "ears/ear-shape:pointed|triangle": 0.5, "ears/ear-shape": 0.5 } },
{ id: "stonekin", label: "Stone-kin", skin: "stone", set: { height: 0.8, weight: 0.85, muscle: 1, african: 0, asian: 0, caucasian: 1, hair: "none" }, mods: { "chin/chin-width": 0.6, "forehead/forehead-trans": 0.4 } },
{ id: "azure", label: "Azure folk", skin: "azure", set: { height: 0.65, weight: 0.4, proportions: 0.9, african: 0, asian: 0, caucasian: 1 } },
{ id: "wolfkin", label: "Wolf folk", skin: "fur_wolf", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.75, muscle: 0.75 }, mods: { "race/jaldmic_wolf_headv3": 1 } },
{ id: "foxkin", label: "Fox folk", skin: "fur_fox", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.45, weight: 0.3 }, mods: { "race/jaldmic_fox_head_cartoon": 1 } },
{ id: "tigerkin", label: "Tiger folk", skin: "fur_tiger", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.8, muscle: 0.85 }, mods: { "race/jaldmic_tiger_head": 1 } },
{ id: "lionkin", label: "Lion folk", skin: "fur_lion", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.8, muscle: 0.85 }, mods: { "race/jaldmic_lion": 1 } },
{ id: "bearkin", label: "Bear folk", skin: "fur_bear", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.9, weight: 0.85, muscle: 0.9 }, mods: { "race/jaldmic_bear_head": 1 } },
{ id: "catkin", label: "Cat folk", skin: "fur_panther", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.5, weight: 0.3 }, mods: { "race/jaldmic_cat_head": 1 } },
{ id: "rabbitkin", label: "Rabbit folk", skin: "fur_rabbit", set: { african: 0, asian: 0, caucasian: 1, hair: "none", facialHair: "none", height: 0.35, weight: 0.35 }, mods: { "race/jaldmic_hazel_rabbit_head": 1 } },
{ id: "giant", label: "Giant", set: { height: 1, weight: 0.7, muscle: 0.9 } },
{ id: "angel", label: "Angel", set: { african: 0, asian: 0, caucasian: 1, skinTint: "#fff4e8", proportions: 1, eyes: "lightblue" } },
{ id: "fae", label: "Fae", set: { height: 0.25, weight: 0.2, proportions: 1, african: 0, asian: 0, caucasian: 1, skinTint: "#d8f0e0" }, mods: { "ears/ear-shape:pointed|triangle": 1, "ears/ear-shape": 1, "ears/ear-scale-vert:decr|incr": 0.8, "ears/ear-scale-vert": 0.8 } }
];
var AMK_SKINTINTS = ["#ffffff", "#ffe0c8", "#e8c0a0", "#9cc77a", "#a8c070", "#7da0a0", "#9cc0e0", "#b0a8e0", "#e09090", "#c06a6a", "#d8d0c0", "#f0d890"];
var AMK_HAIRCOL = ["#0b0908", "#2a1e16", "#4a3020", "#6a4428", "#8a3a1a", "#b06a30", "#c9a96a", "#e8dcb0", "#f2f0ea", "#9a9aa0", "#3a5ac8", "#a02a6a", "#2a8a5a", "#c83a3a", "#7a3ab0"];
var AMK_CLOTHCOL = ["#f2ece0", "#1a1a1e", "#3a3a42", "#7a7a80", "#2a3a5a", "#2f5e9e", "#3f6a3a", "#6a3a22", "#8a1a1a", "#c83a6a", "#c8a040", "#5a3a6a", "#e0c8a0", "#3a5a5a", "#a05a2a"];
function amkEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function amkNice(s) { s = String(s).replace(/[_-]+/g, " ").replace(/\s*\(.*?\)\s*/g, " ").trim(); return s.charAt(0).toUpperCase() + s.slice(1); }
function amkCompact(r) { return __ZC(441, 122, this, arguments, new.target); }
function amkFull(r) { return __ZC(441, 123, this, arguments, new.target); }
function amkCss() { return __ZC(441, 124, this, arguments, new.target); }
function openCharacterMaker() { return __ZC(441, 125, this, arguments, new.target); }
function amkMsg(t) { var m = AMK.el && AMK.el.querySelector(".amk-msg"); if (m) {
m.textContent = t || "";
m.style.display = t ? "block" : "none";
} }
function amkFrame() { return __ZC(441, 126, this, arguments, new.target); }
function amkChanged() { clearTimeout(AMK.timer); AMK.timer = setTimeout(amkRemake, 450); }
function amkRemake() { return __ZC(441, 127, this, arguments, new.target); }
function amkDropFig() { return __ZC(441, 128, this, arguments, new.target); }
function amkClose() {
clearTimeout(AMK.timer);
cancelAnimationFrame(AMK.raf);
amkDropFig();
if (AMK.ren) {
try {
AMK.ren.dispose();
AMK.ren.forceContextLoss();
}
catch (e) { }
AMK.ren = null;
}
if (AMK.el && AMK.el.parentNode)
AMK.el.parentNode.removeChild(AMK.el);
AMK.el = null;
AMK.scene = null;
}
function amkSave() {
var L = meLook();
L.ara = amkCompact(AMK.r);
L.src = L.src || {};
L.src.ara = "chosen";
save();
try {
rebuildMe();
}
catch (e) { }
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
amkClose();
amkToast("Saved. This is how everyone sees you now.");
}
var AMK_TABS = [["species", "Species"], ["body", "Body"], ["face", "Face"], ["skin", "Skin"], ["eyes", "Eyes"], ["hair", "Hair"], ["clothes", "Clothes"], ["acc", "Accessories"]];
function amkTabs() { return __ZC(441, 129, this, arguments, new.target); }
function amkSlider(label, key, min, max, val, step) { return '<div class="amk-row"><label>' + amkEsc(label) + '</label><input type="range" min="' + min + '" max="' + max + '" step="' + (step || 0.01) + '" value="' + val + '" data-k="' + amkEsc(key) + '"></div>'; }
function amkSwatches(key, list, cur) { return __ZC(441, 130, this, arguments, new.target); }
function amkCards(key, items, cur, thumb, none) { return __ZC(441, 131, this, arguments, new.target); }
function amkSelect(key, items, cur, none) { return '<select data-k="' + amkEsc(key) + '">' + (none ? '<option value="none">None</option>' : '') + items.map(function (it) { var id = it.id || it; return '<option value="' + amkEsc(id) + '"' + (cur === id ? ' selected' : '') + '>' + amkEsc(it.label || it.name || amkNice(id)) + '</option>'; }).join("") + '</select>'; }
function amkGroups(cat) { return __ZC(441, 132, this, arguments, new.target); }
function amkModVal(id) { var v = AMK.r.modifiers[id]; return v == null ? 0 : v; }
function amkPage() { return __ZC(441, 133, this, arguments, new.target); }
function amkGroupHtml(G) { return __ZC(441, 134, this, arguments, new.target); }
function amkPieceStyle(id) { return __ZC(441, 135, this, arguments, new.target); }
function amkWearOf(slot) { var o = []; for (var id in AMK.wear)
if (AMK.wear[id].slot === slot)
o.push({ id: id, label: AMK.wear[id].label }); return o; }
function amkWorn(slot) { var w = AMK.r.wear || []; for (var i = 0; i < w.length; i++)
if (AMK.wear[w[i]] && AMK.wear[w[i]].slot === slot)
return w[i]; return ""; }
function amkWearSet(slot, id) { var r = AMK.r; r.wear = (r.wear || []).filter(function (x) { return !(AMK.wear[x] && AMK.wear[x].slot === slot); }); if (id && id !== "none")
r.wear.push(id); }
function amkIsMH(id) { var c = AMK.cat; return !!c && (c.outfits.concat(c.hats, c.shoes)).some(function (x) { return x.id === id; }); }
function amkSet(k, v) { return __ZC(441, 136, this, arguments, new.target); }
function amkWire(b) { return __ZC(441, 137, this, arguments, new.target); }
if (typeof renderWardrobe === "function") {
var amkWard0 = renderWardrobe;
renderWardrobe = function () { return __ZC(441, 138, this, arguments, new.target); };
}
function amkToast(t) { return __ZC(441, 139, this, arguments, new.target); }
var ARAF = { dir: "folk/", files: {}, tex: {}, mats: {}, n: 0, dec: null, decWait: null,
lib: "m-casual-1:y: m-casual-2:a: m-casual-3:o:h m-casual-4:y: m-shirt-1:a: m-shirt-2:o:b m-shirt-3:y: m-shirt-4:a:b m-suit-1:a: m-suit-2:o: m-suit-3:y: m-shorts-1:y:b m-shorts-2:a: m-sweater-1:a: m-sweater-2:y:b m-sweater-3:o:b m-coat-1:a:b m-coat-2:o:bh m-work-1:a: m-work-2:y:b m-uniform-1:a:b m-uniform-2:y: m-fatigue-1:y:b m-fatigue-2:a: m-tunic-1:a: m-tunic-2:y:b m-tunic-3:o:b m-viking-1:a:b m-viking-2:o: m-robe-1:o:b m-robe-2:a: m-robe-3:y: m-thobe-1:o:bh m-thobe-2:a: m-greek-1:y:b m-greek-2:a: m-peasant-1:o: m-peasant-2:y:b m-armor-1:y:b m-armor-2:a:b m-armor-3:a: m-space-1:y: m-space-2:a: m-kimono-1:a: f-casual-1:y: f-casual-2:a: f-casual-3:o: f-casual-4:y: f-blouse-1:a: f-blouse-2:y: f-blouse-3:o: f-blouse-4:a: f-dress-1:y: f-dress-2:a: f-dress-3:o: f-dress-4:y: f-dress-5:a: f-smart-1:a: f-smart-2:o: f-smart-3:y: f-sweater-1:o: f-sweater-2:a: f-shorts-1:y: f-shorts-2:a: f-uniform-1:a: f-uniform-2:y: f-peasant-1:y: f-peasant-2:a: f-peasant-3:o: f-robe-1:o: f-robe-2:a: f-gown-1:y: f-gown-2:a: f-armor-1:y: f-armor-2:a: f-space-1:y: f-kimono-1:a: f-greek-1:y: f-greek-2:a: b-casual-1:k: b-casual-2:k: b-tunic-1:k: g-dress-1:k: g-dress-2:k: g-casual-1:k: m-god-1:o:b m-god-2:a:b m-godwar-1:a:b f-goddess-1:y: f-goddess-2:a: f-godwar-1:y:" };
(function () {
var L = [];
String(ARAF.lib).split(" ").forEach(function (s) {
if (!s || s === "FOLK_LIB")
return;
var p = s.split(":");
var q = p[0].split("-");
L.push({ id: p[0], sex: q[0], cls: q[1], age: p[1] || "a", beard: /b/.test(p[2] || ""), bald: /h/.test(p[2] || "") });
});
ARAF.list = L;
})();
function arafOn() { return !window.ARAF_OFF && typeof HDF !== "undefined" && ARAF.list.length > 0 && location.protocol !== "file:" && typeof araOn === "function"; }
function arafClass(spec, L, kid, fo) {
var f = L.sex !== "m", tk = String(L.topKind || ""), bk = String(L.bottomKind || ""), lay = String(L.layer || ""), role = String(L.role || spec.role || spec.title || "").toLowerCase();
var h = rbMix(hdfHash("araf:" + (spec.id || spec.name || "x"))), w = String((spec.world || "") + " " + (spec.id || "")).toLowerCase();
if (kid)
return f ? (tk === "dress" || h % 3 === 0 ? "dress" : "casual") : (fo || lay === "tunic" ? "tunic" : "casual");
if (spec.deity) {
var d = typeof DEITY !== "undefined" && DEITY[spec.deity], ic = d && d.icons ? d.icons.join(",") : "";
if (/\b(armor|helmet)\b/.test(ic))
return "godwar";
return f ? "goddess" : "god";
}
var job = typeof rbJob === "function" ? rbJob(spec, L) : "";
if (job === "police" || job === "security" || job === "pilot" || job === "medical" || job === "fire" || lay === "uniform")
return "uniform";
if (job === "military")
return f ? "uniform" : "fatigue";
if (job === "business")
return f ? "smart" : "suit";
if (job === "construction" || job === "wood" || job === "gardener" || job === "delivery")
return f ? "casual" : "work";
if (job === "sports")
return "shorts";
if (job === "chef")
return f ? "blouse" : "shirt";
if (L.eva || /veyar|far.?gate|open.?space|starship|orbit|spacer|astronaut/.test(w + " " + role))
return "space";
if (lay === "armor" || hdfFolkHas(fo, "armor") || (/knight|warrior|soldier|fighter|guard/.test(role) && lay !== "uniform"))
return "armor";
if (lay === "kimono")
return "kimono";
if (lay === "cloak" || lay === "robe" || tk === "robe" || /wizard|mage|sorcer|witch|priest|monk|nun|druid|sage/.test(role))
return f ? (h % 3 === 0 ? "kimono" : "robe") : (h % 3 === 0 ? "thobe" : "robe");
if (/greece|greek|erebos|heaven|olymp|troy|odysse|ithaca|athens|sparta|crete|argo/.test(w))
return "greek";
if (lay === "tunic" || fo)
return f ? (tk === "dress" ? "dress" : "peasant") : (h % 3 === 0 ? "viking" : h % 3 === 1 ? "peasant" : "tunic");
if (lay === "longcoat" || lay === "coat" || tk === "coat" || lay === "labcoat")
return f ? ["smart", "blouse", "sweater", "dress"][h % 4] : ["coat", "suit", "sweater"][h % 3];
if (lay === "suit")
return f ? "smart" : "suit";
if (lay === "jacket" || lay === "vest")
return f ? ["smart", "blouse", "casual", "dress"][h % 4] : ["suit", "coat", "shirt", "casual", "sweater"][h % 5];
if (lay === "sweater")
return "sweater";
if (lay === "apron")
return f ? (h % 2 ? "blouse" : "peasant") : "shirt";
if (f) {
if (tk === "dress")
return h % 5 === 0 ? "gown" : "dress";
if (bk === "skirt" || bk === "kilt")
return "blouse";
if (bk === "shorts")
return "shorts";
return ["casual", "blouse", "dress", "sweater", "casual"][h % 5];
}
if (bk === "shorts")
return "shorts";
return ["casual", "shirt", "sweater", "casual", "shirt"][h % 5];
}
function arafOld(spec, L) {
if (/elder|old|grand|granny|gran\b|widow|crone|hermit/.test(String((spec.id || "") + " " + (L.role || spec.role || "")).toLowerCase()))
return true;
if (L.hair == null)
return false;
var c = new THREE.Color(L.hair), mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b);
return mx > 0.45 && mx - mn < 0.12;
}
function arafCap() { return araLite() ? 8 : (typeof HDF_PHONE !== "undefined" && HDF_PHONE) ? 12 : 28; }
function arafLoaded() { var o = []; for (var k in HDF.files)
if (k.indexOf("araf/") === 0 && !HDF.files[k].bad)
o.push(k.slice(5)); return o; }
function arafPick(spec, L, kid, fo) {
var sx = kid ? (L.sex === "m" ? "b" : "g") : (L.sex === "m" ? "m" : "f"), want = arafClass(spec, L, kid, fo), old = !kid && arafOld(spec, L);
var h = rbMix(hdfHash("arafb:" + (spec.id || spec.name || "x")));
var pool = ARAF.list.filter(function (r) { return r.sex === sx && r.cls === want; });
if (!pool.length)
pool = ARAF.list.filter(function (r) { return r.sex === sx && r.cls === "casual"; });
if (!pool.length)
return null;
var ag = pool.filter(function (r) { return old ? r.age === "o" : r.age !== "o"; });
if (ag.length)
pool = ag;
var dv = spec.deity && typeof DEITY !== "undefined" && DEITY[spec.deity], wb = dv ? /beard/.test(dv.icons.join(",")) : L.beard;
var bd = wb != null && sx === "m" ? pool.filter(function (r) { return r.beard === !!wb; }) : [];
if (bd.length)
pool = bd;
var r = pool[h % pool.length];
var have = arafLoaded();
if (have.indexOf(r.id) < 0 && have.length >= arafCap()) {
var near = ARAF.list.filter(function (x) { return x.sex === sx && have.indexOf(x.id) >= 0; });
var same = near.filter(function (x) { return x.cls === want; });
if (same.length)
near = same;
if (near.length)
r = near[h % near.length];
else if (have.length >= arafCap() + 6)
return null;
}
return r;
}
var FOLK_G3D = { dir: "assets/models/grab3d/people/",
jobs: { police: { m: "police-officer" }, fire: { m: "firefighter" }, medical: { m: "doctor", f: "nurse" }, chef: { m: "chef", f: "chef-woman" },
construction: { m: "construction-worker" }, military: { m: "soldier" }, gardener: { m: "farmer", f: "farmer-woman" }, business: { m: "businessman" },
sports: { f: "female-athlete" }, wizard: { m: "wizard", f: "witch" }, astronaut: { m: "astronaut-in-spacesuit" }, knight: { m: "armored-knight" },
vampire: { m: "vampire" }, king: { m: "king" }, queen: { f: "queen" }, santa: { m: "santa-claus" } } };
function g3dKind(spec, L, p, fo) {
if (spec.deity)
return "";
var mh = (p.mh || []).join(" "), arch = String(spec.archetype || ""), role = String(L.role || spec.role || spec.title || "").toLowerCase();
if (/ours_(wizard|sorcerer)_robe/.test(mh) || arch === "wizard" || arch === "witch")
return "wizard";
if (/ours_space_suit/.test(mh))
return "astronaut";
if (arch === "knight")
return "knight";
if (arch === "vampire")
return "vampire";
if (/\bsanta\b|father christmas/.test(role))
return "santa";
if (/\bking\b/.test(role))
return "king";
if (/\bqueen\b/.test(role))
return "queen";
return p.rb && p.rb.job || "";
}
function g3dPick(spec, L, p, fo) {
if (window.G3D_FOLK_OFF)
return null;
var k = g3dKind(spec, L, p, fo), J = k && FOLK_G3D.jobs[k];
if (!J)
return null;
var n = J[L.sex === "m" ? "m" : "f"];
if (!n)
return null;
var f = "g3d/" + n + (araLite() ? "-lite" : "");
return { type: "own", files: [f], main: f, set: "ara", g3d: k, L: L, child: false, key: "g3d:" + n };
}
HDF_CLIPS.araf = HDF_CLIPS.ara;
if (typeof hdfPlan === "function") {
var arafPlan0 = hdfPlan;
hdfPlan = function (spec) {
var p = arafPlan0.apply(this, arguments);
try {
if (!arafOn() || !p || p.type === "none" || p.set === "ara")
return p;
var id = String(spec && spec.id || "");
if (id === "__me" || id.indexOf("presence_") === 0 || spec.wCostume || spec._wcHeld)
return p;
var human = p.type === "human" || (p.type === "own" && (p.set === "rbm" || p.set === "rbf"));
if (!human)
return p;
var L = p.L || spec.look || {}, fo = hdfFolk(spec), kid = !!p.child;
if (L.species && L.species !== "human")
return p;
var g3 = kid ? null : g3dPick(spec, L, p, fo);
if (g3)
return g3;
if (p.rb && p.rb.job || (p.mh || []).some(function (x) { return /^ours_/.test(x); }))
return p;
if (fo && !/^(knight|witch|wizard|selkie|vampire)$/.test(String(spec.archetype || "")))
return p;
var r = arafPick(spec, L, kid, fo);
if (!r)
return p;
var f = "araf/" + r.id;
return { type: "own", files: [f], main: f, set: "ara", araf: r, L: L, child: false,
key: "araf:" + r.id + ":" + L.skin + ":" + L.hair + ":" + L.top + ":" + L.bottom + ":" + L.shoes + ":" + (L.dgxCol ? L.dgxCol.dgc1 + "/" + L.dgxCol.dgc2 : "") };
}
catch (e) {
return p;
}
};
}
function arafDecoder(cb) {
if (ARAF.dec)
return cb(ARAF.dec);
if (ARAF.decWait) {
ARAF.decWait.push(cb);
return;
}
ARAF.decWait = [cb];
var done = function () {
var D = window.MeshoptDecoder || null;
var go = function () { ARAF.dec = D || false; var w = ARAF.decWait || []; ARAF.decWait = null; w.forEach(function (f) { try {
f(ARAF.dec);
}
catch (e) { } }); };
if (D && D.ready && D.ready.then)
D.ready.then(go, function () { D = null; go(); });
else
go();
};
var s = document.createElement("script");
s.src = "assets/vendor/meshopt/meshopt_decoder.js";
s.async = true;
s.onload = done;
s.onerror = done;
document.head.appendChild(s);
}
function arafTex(path, colour) {
var k = path + (colour ? ":c" : ""), S = ARAF.tex[k];
if (S)
return S;
S = new THREE.TextureLoader().load(ARA.data + ARAF.dir + path);
S.name = path;
S.flipY = false;
S.wrapS = S.wrapT = THREE.RepeatWrapping;
S.anisotropy = 4;
if (colour)
S.encoding = THREE.sRGBEncoding;
S.userData = { arafShared: 1 };
return (ARAF.tex[k] = S);
}
function arafMaps(x) {
var t = x && x.userData && x.userData.araTex;
if (!t)
return;
if (t.map)
x.map = arafTex(t.map, true);
if (t.emissiveMap)
x.emissiveMap = arafTex(t.emissiveMap, true);
if (t.normalMap) {
x.normalMap = arafTex(t.normalMap, false);
if (t.normalScale != null)
x.normalScale.set(t.normalScale, -t.normalScale);
}
if (t.roughnessMap) {
x.roughnessMap = x.metalnessMap = arafTex(t.roughnessMap, false);
}
if (t.aoMap)
x.aoMap = arafTex(t.aoMap, false);
x.needsUpdate = true;
}
function arafFloat(scene) {
scene.traverse(function (m) {
if (!m.isMesh || !m.geometry)
return;
var g = m.geometry;
Object.keys(g.attributes).forEach(function (n) {
if (n === "skinIndex")
return;
var A = g.attributes[n], a = A && A.array;
if (!a || a instanceof Float32Array)
return;
var k = !A.normalized ? 1 : a instanceof Int16Array ? 1 / 32767 : a instanceof Uint16Array ? 1 / 65535 : a instanceof Int8Array ? 1 / 127 : a instanceof Uint8Array ? 1 / 255 : 1;
var sz = A.itemSize, f = new Float32Array(A.count * sz);
for (var i = 0; i < A.count; i++)
for (var c = 0; c < sz; c++) {
var v = (A.isInterleavedBufferAttribute ? A.data.array[i * A.data.stride + A.offset + c] : a[i * sz + c]) * k;
f[i * sz + c] = A.normalized && k !== 1 ? Math.max(v, -1) : v;
}
g.setAttribute(n, new THREE.BufferAttribute(f, sz, false));
});
});
}
if (typeof hdfFile === "function") {
var arafFile0 = hdfFile;
hdfFile = function (file, cb) {
if (String(file).indexOf("g3d/") === 0)
return g3dFile(file, cb);
if (String(file).indexOf("araf/") !== 0)
return arafFile0.apply(this, arguments);
var F = HDF.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = HDF.files[file] = { scene: null, clips: [], bad: false, wait: [cb] };
var fail = function (e) { if (window.console)
console.warn("[folk]", file, e && e.message || e); F.bad = true; F.wait = []; };
arafDecoder(function (D) {
if (!D)
return fail("no unpacker");
modelsLoader(function (Ld) {
if (Ld.setMeshoptDecoder && !Ld.meshoptDecoder)
Ld.setMeshoptDecoder(D);
Ld.load(ARA.data + ARAF.dir + file.slice(5) + ".glb", function (gl) {
arafFloat(gl.scene);
gl.scene.traverse(function (m) {
if (!m.isMesh)
return;
m.castShadow = true;
m.receiveShadow = true;
m.frustumCulled = false;
(Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) {
if (!x)
return;
arafMaps(x);
if (/^Hair$/i.test(x.name)) {
x.transparent = false;
x.alphaTest = 0.45;
x.depthWrite = true;
x.envMapIntensity = 0.3;
x.roughness = Math.max(x.roughness || 0, 0.8);
x.normalMap = null;
}
});
});
gl.scene.userData.araBody = 1;
F.scene = gl.scene;
F.clips = gl.animations || [];
ARAF.n++;
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[folk]", e);
} });
}, undefined, fail);
});
});
};
}
function g3dFile(file, cb) { return __ZC(441, 140, this, arguments, new.target); }
function arafSkinTex(x, L, r) {
var t = x.map;
if (!t || L.skin == null)
return null;
var m = /skin_(young|middleage|old)_(african|asian|caucasian)_(male|female)/.exec(t.name || "");
if (!m)
return null;
var c = new THREE.Color(L.skin), lum = c.r * 0.3 + c.g * 0.59 + c.b * 0.11;
var anc = lum < 0.36 ? "african" : lum < 0.6 ? "asian" : "caucasian", age = r.age === "o" ? "old" : r.age === "y" || r.sex === "b" || r.sex === "g" ? "young" : "middleage";
return arafTex("../web/textures/skin_" + age + "_" + anc + "_" + m[3] + ".jpg", true);
}
var ARAF_KEEP = /^(Skin|Skin details|Eyes|Teeth|Tongue|Eyebrows|Eyelashes|Briefs)$|button|buckle|horsebit|pearls|epaulette|placket|sole|lace|midsole|outsole/i;
var ARAF_SLOT = [[/^jacket:|overcoat|jacket|coat\b/i, "coat"], [/^bottom:|jeans|trousers|pants|shorts|skirt|wrapper|creases|leggings/i, "bottom"],
[/^feet:|sneaker leather|loafer leather|oxford leather|^heels$|slide straps|flats$/i, "shoes"],
[/^top:|shirt|tee\b|tee rib|tunic|blouse|tank|thobe|gown|dress|sleeves|sweater|bodice|backing|top\b/i, "top"]];
var ARAF_DYE = /^Wear toigo_(basic_tucked_t-shirt|fisherman_sweater|bodice-style_top)$/;
function arafDress(root, plan) {
var L = plan.L || {}, r = plan.araf, god = L.dgxCol || null;
var colOf = function (n) {
if (/^(Hair|Beard)$/.test(n))
return L.hair;
if (ARAF_KEEP.test(n))
return null;
if (/^Hat$/.test(n))
return null;
var mh = /^(Wear |Outfit$|Shoes$)/.test(n);
if (mh && !ARAF_DYE.test(n))
return null;
var slot = null;
for (var i = 0; i < ARAF_SLOT.length && !slot; i++)
if (ARAF_SLOT[i][0].test(mh ? n.replace(/_/g, " ") : n))
slot = ARAF_SLOT[i][1];
if (god)
return slot === "top" || slot === "coat" ? god.dgc1 : slot === "bottom" ? god.dgc2 : null;
if (slot === "coat")
return L.layerColor != null ? L.layerColor : L.top;
if (slot === "bottom")
return L.bottom;
if (slot === "shoes")
return L.shoes;
if (slot === "top")
return L.top;
return null;
};
root.traverse(function (m) {
if (!m.isMesh)
return;
var conv = function (x) {
if (!x)
return x;
var n = String(x.name || "");
if (/^Skin$/.test(n)) {
var st = arafSkinTex(x, L, r);
if (!st || st === x.map)
return x;
var k1 = x.uuid + ":skin:" + st.name, M1 = ARAF.mats[k1];
if (M1)
return M1;
M1 = x.clone();
M1.skinning = x.skinning;
M1.map = st;
return (ARAF.mats[k1] = M1);
}
var c = colOf(n);
if (c == null)
return x;
var k = x.uuid + ":" + c, M = ARAF.mats[k];
if (M)
return M;
M = x.clone();
M.skinning = x.skinning;
M.color = new THREE.Color(c);
if (/^Beard$/.test(n) && !x.map)
M.color.multiplyScalar(0.9);
return (ARAF.mats[k] = M);
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
}
if (typeof hdfAssemble === "function") {
var arafAsm0 = hdfAssemble;
hdfAssemble = function (plan) {
var A = arafAsm0.apply(this, arguments);
try {
if (plan && plan.araf && A && A.root)
arafDress(A.root, plan);
}
catch (e) {
if (window.console)
console.warn("[folk] dress", e);
}
return A;
};
}
setInterval(function () {
if (typeof HDF === "undefined" || !HDF.files || window.ARAF_NOSWEEP)
return;
var used = {};
HDF.list.forEach(function (E) { if (E && E.plan && (E.plan.araf || E.plan.g3d))
used[E.plan.main] = 1; });
var now = performance.now();
Object.keys(HDF.files).forEach(function (k) {
var g3 = k.indexOf("g3d/") === 0;
if (k.indexOf("araf/") !== 0 && !g3)
return;
var F = HDF.files[k];
if (used[k] || (F.wait && F.wait.length)) {
F.idle = 0;
return;
}
if (!F.scene && !F.bad)
return;
if (!F.idle) {
F.idle = now;
return;
}
if (now - F.idle < 60000)
return;
var gone = {};
if (F.scene)
F.scene.traverse(function (o) {
if (!o.isMesh)
return;
if (o.geometry)
o.geometry.dispose();
(Array.isArray(o.material) ? o.material : [o.material]).forEach(function (x) {
if (!x)
return;
gone[x.uuid] = 1;
if (g3)
["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "aoMap"].forEach(function (t) { if (x[t])
x[t].dispose(); });
x.dispose();
});
});
Object.keys(ARAF.mats).forEach(function (q) { if (gone[q.split(":")[0]]) {
ARAF.mats[q].dispose();
delete ARAF.mats[q];
} });
delete HDF.files[k];
});
}, 15000);
var AMG = { st: null, E: null, sig: "", buying: 0 };
var AMG_ROWS = [["wings", "Wings"], ["tail", "Tail"]];
var AMG_GUIDE = [
["Start from a species", "The <b>Species</b> tab gives you a starting body: human, elf, dwarf, orc, tiefling, animal folk and more. Pick one, then change anything you like."],
["Work across the tabs", "Along the top: <b>Body</b> (height, weight, muscle), <b>Face</b>, <b>Skin</b>, <b>Eyes</b>, <b>Hair</b>, <b>Clothes</b>, <b>Accessories</b> (hats, horns, weapons, jewellery) and <b>Wings &amp; tail</b>."],
["Look closer", "Drag the person to turn them round, or up and down to look along them. Zoom with the mouse wheel, two fingers, or <b>+</b> and <b>\u2212</b>. <b>Whole</b>, <b>Body</b> and <b>Face</b>, top right, jump straight there."],
["Give it a moment", "Each change remakes you, which takes a second or two (it says <i>Making you…</i>). Change a few things, then look."],
["Save me", "<b>Save me</b> keeps it, and everyone sees you this way. <b>Cancel</b> throws the changes away; <b>Use my old look</b> goes back to how you were. Wings and tails cost gold the first time, then they are yours for good."]
];
function amgEsc(s) { return typeof amkEsc === "function" ? amkEsc(s) : String(s == null ? "" : s); }
function amgOwned(k) { try {
return !k || (typeof wearOwned === "function" && wearOwned(k));
}
catch (e) {
return false;
} }
function amgPrice(k) { try {
return typeof wearShownPrice === "function" ? wearShownPrice(k) : (WORN[k] && WORN[k].price) || "";
}
catch (e) {
return "";
} }
function amgList(sl) { return typeof WORN === "undefined" ? [] : Object.keys(WORN).filter(function (k) { return WORN[k].slot === sl; }); }
function amgDress() { return __ZC(441, 141, this, arguments, new.target); }
function amgUndress() { if (AMG.E) {
try {
wornOff(AMG.E);
}
catch (e) { }
AMG.E = null;
} }
function amgPage() { return __ZC(441, 142, this, arguments, new.target); }
function amgGuide(i) { return __ZC(441, 143, this, arguments, new.target); }
function amgCss() { return __ZC(441, 144, this, arguments, new.target); }
(function () {
if (typeof AMK_TABS === "undefined" || typeof openCharacterMaker !== "function")
return;
var ai = -1;
AMK_TABS.forEach(function (t, i) { if (t[0] === "acc")
ai = i; });
if (!AMK_TABS.some(function (t) { return t[0] === "worn"; }))
AMK_TABS.splice(ai >= 0 ? ai + 1 : AMK_TABS.length, 0, ["worn", "Wings & tail"]);
var op = openCharacterMaker;
openCharacterMaker = function () {
var r = op.apply(this, arguments);
try {
if (!AMK.el)
return r;
amgCss();
AMG.sig = "";
AMG.E = null;
var L = meLook();
AMG.st = {};
AMG_ROWS.forEach(function (x) { AMG.st[x[0]] = wornKey(L[x[0]]) || null; AMG.st[x[0] + "Color"] = L[x[0] + "Color"] || null; });
var z = AMK.el.querySelector(".amk-zoom");
if (z) {
var q = document.createElement("button");
q.textContent = "?";
q.title = "How the maker works";
q.setAttribute("aria-label", "How the maker works");
q.onclick = function () { amgGuide(0); };
z.appendChild(q);
}
var seen = false;
try {
seen = localStorage.getItem("amkGuided") === "1";
}
catch (e) { }
if (!seen)
amgGuide(0);
}
catch (e) {
if (window.console)
console.warn("[maker guide]", e);
}
return r;
};
var pg = amkPage;
amkPage = function () { if (AMK.tab === "worn" && AMG.st)
return amgPage(); return pg.apply(this, arguments); };
var fr = amkFrame;
amkFrame = function () { try {
amgDress();
}
catch (e) {
if (!AMG.w) {
AMG.w = 1;
if (window.console)
console.warn("[maker wings]", e);
}
} return fr.apply(this, arguments); };
var dr = amkDropFig;
amkDropFig = function () { amgUndress(); AMG.sig = ""; return dr.apply(this, arguments); };
var sv = amkSave;
amkSave = function () {
var held = [];
try {
var L = meLook(), S = AMG.st || {};
AMG_ROWS.forEach(function (x) {
var sl = x[0], k = S[sl] || null;
if (k && !amgOwned(k)) {
held.push(WORN[k].label);
return;
}
if ((wornKey(L[sl]) || null) !== k) {
L[sl] = k;
L.src = L.src || {};
L.src[sl] = "chosen";
}
L[sl + "Color"] = k ? S[sl + "Color"] || null : L[sl + "Color"];
});
}
catch (e) {
if (window.console)
console.warn("[maker wings] save", e);
}
var r = sv.apply(this, arguments);
if (held.length && typeof amkToast === "function")
setTimeout(function () { amkToast("Saved. " + held.join(" and ") + " " + (held.length > 1 ? "were" : "was") + " only tried on: buy " + (held.length > 1 ? "them" : "it") + " on the Wings & tail tab to wear " + (held.length > 1 ? "them" : "it") + "."); }, 1200);
return r;
};
})();
var AMV = { lock: false, tabWas: "", hintT: 0, dark: 0, next: 0, lights: [], scan: 0 };
var AMV_TABZOOM = { species: 2, body: 0, face: 1, skin: 1, eyes: 1, hair: 1, clothes: 0, acc: 2, worn: 2 };
var AMV_SAME = { species: {}, skins: {} };
function amvCss() { return __ZC(441, 145, this, arguments, new.target); }
function amvZoomButtons() { return __ZC(441, 146, this, arguments, new.target); }
var AMV_ZT = { 0: 0, 2: 0.5, 1: 1 };
var AMV_ZMIN = -0.3, AMV_ZMAX = 1.5;
function amvZoomTo(t) { AMV.zt = Math.max(AMV_ZMIN, Math.min(AMV_ZMAX, t)); AMV.py = 0; AMV.zWas = AMK.zoom; amvZoomMark(); }
function amvZoomBy(dt) { AMV.manualAt = performance.now(); AMV.zt = Math.max(AMV_ZMIN, Math.min(AMV_ZMAX, (AMV.zt == null ? AMV_ZT[AMK.zoom] || 0 : AMV.zt) + dt)); amvZoomMark(); }
function amvZoomMark() { var z = AMK.el && AMK.el.querySelector(".amk-zoom"); if (!z)
return; [].slice.call(z.querySelectorAll("[data-z]")).forEach(function (b) { var k = +b.getAttribute("data-z"); b.classList.toggle("on", AMV.zt != null && Math.abs(AMV_ZT[k] - AMV.zt) < 0.03); }); }
function amvFraming(t, H, narrow) { return __ZC(441, 147, this, arguments, new.target); }
function amvInput() { return __ZC(441, 148, this, arguments, new.target); }
function amvSpread(pts) { var ids = Object.keys(pts); if (ids.length < 2)
return 0; var a = pts[ids[0]], b = pts[ids[1]]; return Math.hypot(a.x - b.x, a.y - b.y); }
function amvSharp(s) { return __ZC(441, 149, this, arguments, new.target); }
function amvLights() {
var S = AMK.scene;
if (!S)
return;
var f = new THREE.SpotLight(0xfff2e6, 0.75, 0, 0.42, 0.6, 1.2);
f.name = "amvFace";
S.add(f);
S.add(f.target);
var r = new THREE.DirectionalLight(0xcfe0ff, 0.55);
r.name = "amvRim";
S.add(r);
AMV.face = f;
AMV.rim = r;
}
function amvFrame() { return __ZC(441, 150, this, arguments, new.target); }
function amvHint() { return __ZC(441, 151, this, arguments, new.target); }
function amvSurprise() { return __ZC(441, 152, this, arguments, new.target); }
(function () {
if (typeof openCharacterMaker !== "function" || typeof amkPage !== "function")
return;
var op = openCharacterMaker;
openCharacterMaker = function () {
try {
if (typeof renderer !== "undefined" && renderer && !renderer.amvSkip) {
var r0 = renderer.render;
renderer.amvSkip = 1;
renderer.render = function () { if (window.AMK && AMK.el && !window.AMV_DRAW_BEHIND)
return; return r0.apply(this, arguments); };
}
}
catch (e) { }
AMK.tab = "species";
AMK.zoom = 2;
AMV.lock = false;
AMV.tabWas = "species";
AMV.c = null;
AMV.zt = null;
AMV.py = 0;
AMV.zWas = null;
var r = op.apply(this, arguments);
try {
if (AMK.el) {
amvCss();
amvLights();
amvZoomButtons();
amvHint();
amvInput();
AMK.ren.setPixelRatio(Math.min(3, window.devicePixelRatio || 1));
}
}
catch (e) {
if (window.console)
console.warn("[maker look]", e);
}
return r;
};
amkFrame = amvFrame;
var tb = amkTabs;
amkTabs = function () {
if (AMK.tab !== AMV.tabWas) {
AMV.tabWas = AMK.tab;
AMV.lock = false;
}
if (!AMV.lock && AMV_TABZOOM[AMK.tab] != null)
AMK.zoom = AMV_TABZOOM[AMK.tab];
var r = tb.apply(this, arguments);
amvZoomMark();
return r;
};
var pg = amkPage;
amkPage = function () {
if (AMK.cat && !AMK.cat.amvTrim) {
AMK.cat.amvTrim = 1;
AMK.cat.skins = (AMK.cat.skins || []).filter(function (s) { return !AMV_SAME.skins[s.id] || s.id === AMK.r.skin; });
}
var r = pg.apply(this, arguments);
try {
if (AMK.tab !== "species")
return r;
var b = AMK.el.querySelector(".amk-body"), sp = b && b.querySelector(".amk-sp");
if (!sp)
return r;
sp.classList.add("amv-faces");
[].slice.call(sp.querySelectorAll("[data-sp]")).forEach(function (x) {
var id = x.getAttribute("data-sp");
if (AMV_SAME.species[id] && AMV.sp !== id) {
x.remove();
return;
}
var lab = x.textContent;
x.textContent = "";
var im = document.createElement("img");
im.alt = "";
im.loading = "lazy";
im.src = ARA.data + "thumbs/species_" + id + ".jpg";
im.onerror = function () { im.style.visibility = "hidden"; };
var t = document.createElement("span");
t.textContent = lab;
x.appendChild(im);
x.appendChild(t);
if (AMV.sp === id)
x.classList.add("on");
var oc = x.onclick;
x.onclick = function () { AMV.sp = id; if (oc)
oc.apply(this, arguments); };
});
var h4 = b.querySelector("h4"), p = h4 && h4.nextElementSibling;
var lead = document.createElement("div");
lead.className = "amv-lead";
lead.innerHTML = "<b>Start here.</b> A species changes your whole look at once: shape, face, skin and size. Pick one, then fine-tune anything on the other tabs.";
var go = document.createElement("button");
go.className = "amv-surprise";
go.textContent = "🎲 Surprise me";
go.onclick = amvSurprise;
if (h4) {
b.insertBefore(lead, h4);
b.insertBefore(go, h4);
}
if (p && p.tagName === "P")
p.remove();
}
catch (e) {
if (window.console)
console.warn("[maker look]", e);
}
return r;
};
})();
function amvLum(c, i) { return (c.r * 0.3 + c.g * 0.59 + c.b * 0.11) * i; }
function amvBright() {
if (typeof scene === "undefined" || !scene)
return 1;
var now = performance.now();
if (now > AMV.scan) {
AMV.scan = now + 12000;
var L = [];
scene.traverse(function (o) { if (o.isHemisphereLight || o.isAmbientLight || o.isDirectionalLight)
L.push(o); });
AMV.lights = L;
}
var B = 0;
AMV.lights.forEach(function (o) {
var v = true, q = o;
while (q) {
if (!q.visible) {
v = false;
break;
}
q = q.parent;
}
if (!v || !o.parent)
return;
if (o.isHemisphereLight)
B += amvLum(o.color, o.intensity) * 0.75 + amvLum(o.groundColor, o.intensity) * 0.25;
else if (o.isAmbientLight)
B += amvLum(o.color, o.intensity);
else
B += amvLum(o.color, o.intensity) * 0.45;
});
return B;
}
function amvFaceMats(m, list) { return __ZC(441, 153, this, arguments, new.target); }
setInterval(function () {
try {
if (window.AMV_OFF || typeof HDF === "undefined" || !HDF.list)
return;
var B = amvBright(), dark = Math.max(0, Math.min(1, (0.8 - B) / 0.6)), want = dark * 0.55;
var mats = [];
HDF.list.forEach(function (E) { if (!E || !E.model || !E.plan || E.plan.set !== "ara")
return; E.model.traverse(function (m) { if (m.isMesh)
amvFaceMats(m, mats); }); });
mats.forEach(function (x) { var v = want * x.userData.amvLit; if (Math.abs(x.emissiveIntensity - v) > 0.005)
x.emissiveIntensity = v; });
AMV.dark = dark;
}
catch (e) { }
}, 2000);
AMV.times = [];
AMV.atlas = null;
AMV.more = {};
function amvTintCol(h) { return new THREE.Color(/^#[0-9a-f]{6}$/i.test(h || "") ? h : "#ffffff"); }
function amvColourNow(k, v) { return __ZC(441, 154, this, arguments, new.target); }
AMV.wtIs = function (n, id) { var r = AMK.r; return (n === "Outfit" && r.outfit === id) || (n === "Shoes" && r.shoes === id) || (n === "Hat" && r.hat === id); };
(function () {
if (typeof amkSet !== "function" || typeof amkChanged !== "function" || typeof amkRemake !== "function")
return;
amkChanged = function () {
AMV.t0 = performance.now();
clearTimeout(AMK.timer);
clearTimeout(AMV.fineT);
clearTimeout(AMV.warmT);
if (AMV.colourHit) {
AMV.colourHit = false;
AMV.times.push({ what: "colour", ms: 0 });
AMK.timer = setTimeout(amkRemake, 1200);
return;
}
AMK.timer = setTimeout(amkRemake, 40);
};
var set0 = amkSet;
amkSet = function (k, v) {
AMV.colourHit = /^(skinTint|hairAll|hairTint|wt:.+)$/.test(k) && amvColourNow(k, v);
try {
return set0.apply(this, arguments);
}
finally {
AMV.colourHit = false;
}
};
amkRemake = function () {
if (!AMK.el || !window.AraMaker)
return;
if (AMK.busy) {
AMK.dirty = true;
return;
}
clearTimeout(AMV.fineT);
var lite = typeof araLite === "function" && araLite(), det = lite && !((AMV.zt || 0) >= 0.75) ? "low" : "medium";
AMK.busy = true;
AMK.dirty = false;
if (!AMK.fig)
amkMsg("Making you…");
else
amkMsg("");
AMV.spin(true);
var t0 = AMV.t0 || performance.now(), tg = performance.now();
var p = araParams(amkCompact(AMK.r));
window.AraMaker.make({ kind: "ara-character", version: 1, params: p }, { assetsUrl: ARA.data, animations: ["idle"], detail: det }).then(function (g) {
var tgen = performance.now() - tg;
modelsLoader(function (Ld) {
var b = g.glb, tp = performance.now();
Ld.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), "", function (gl) {
if (!AMK.el)
return;
var yaw = AMK.yaw;
var s = gl.scene;
s.traverse(function (m) { if (m.isMesh)
m.frustumCulled = false; });
araHairMats(s);
var tr = performance.now();
try {
amvReuseTex(s, AMK.fig);
}
catch (e) {
if (window.console)
console.warn("[maker reuse]", e);
}
AMV.reuseMs = Math.round(performance.now() - tr);
amkDropFig();
try {
amvSharp(s);
}
catch (e) { }
s.userData.h = g.height || 1.75;
s.userData.detail = det;
s.userData.amvMade = { skinTint: p.skinTint };
AMK.fig = s;
AMK.scene.add(s);
AMK.yaw = yaw;
AMK.mixer = new THREE.AnimationMixer(s);
if (gl.animations[0])
AMK.mixer.clipAction(gl.animations[0]).play();
AMK.busy = false;
amkMsg("");
AMV.times.push({ what: "shape", ms: Math.round(performance.now() - t0), make: Math.round(tgen), parse: Math.round(performance.now() - tp), detail: det });
if (AMK.dirty) {
amkRemake();
return;
}
clearTimeout(AMV.warmT);
AMV.warmT = setTimeout(amvWarm, 1500);
AMV.spin(false);
try {
if (typeof amgDress === "function") {
AMG.sig = "";
amgDress();
}
}
catch (e) { }
}, function (e) { AMK.busy = false; AMV.spin(false); amkMsg("That didn't work: " + (e && e.message || e)); });
});
}).catch(function (e) { AMK.busy = false; AMV.spin(false); amkMsg("That didn't work: " + (e && e.message || e)); if (AMK.dirty)
amkRemake(); });
};
})();
var AMV_SLOTS = ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap", "emissiveMap", "alphaMap", "bumpMap"];
AMV.fp = typeof WeakMap !== "undefined" ? new WeakMap() : null;
AMV.fpC = null;
AMV.canId = 0;
function amvTexKey(t) { return __ZC(441, 155, this, arguments, new.target); }
function amvMats(o, f) { o.traverse(function (m) { if (m.isMesh)
(Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) { if (x)
f(x); }); }); }
function amvReuseTex(neu, old) { return __ZC(441, 156, this, arguments, new.target); }
AMV.spin = function (on) {
var v = AMK.el && AMK.el.querySelector(".amk-view");
if (!v)
return;
var s = v.querySelector(".amv-spin");
if (!s) {
s = document.createElement("div");
s.className = "amv-spin";
s.innerHTML = "<i></i>Changing…";
v.appendChild(s);
}
s.style.display = on ? "flex" : "none";
};
function amvAtlasLoad() {
if (AMV.atlas || AMV.atlasWait)
return;
AMV.atlasWait = 1;
fetch(ARA.data + "thumbs/atlas.json").then(function (r) { return r.json(); }).then(function (j) { AMV.atlas = j; try {
if (AMK.el && !/species/.test(AMK.tab))
amkPage();
}
catch (e) { } }).catch(function () { AMV.atlas = { sheets: {}, at: {} }; });
}
function amvThumb(th) { return __ZC(441, 157, this, arguments, new.target); }
(function () {
if (typeof amkCards !== "function")
return;
amkCards = function (key, items, cur, thumb, none) {
var h = '<div class="amk-grid">';
if (none)
h += '<div class="amk-card' + (cur === "none" ? ' on' : '') + '" data-v="none" data-k="' + key + '"><i class="amv-th"></i>None</div>';
items.forEach(function (it) {
var id = it.id || it, nm = it.name || amkNice(id), th = thumb && thumb(it), a = th && amvThumb(th);
h += '<div class="amk-card' + (cur === id ? ' on' : '') + '" data-v="' + amkEsc(id) + '" data-k="' + key + '">' + (a || (th ? '<img loading="lazy" decoding="async" src="' + ARA.data + th + '" alt="">' : '<i class="amv-th"></i>')) + amkEsc(nm) + '</div>';
});
return h + '</div>';
};
})();
function amvRewire(b) { return __ZC(441, 158, this, arguments, new.target); }
var AMV_START = { top: 8, bottom: 6, jacket: 4, shoes: 5, outfit: 8, hat: 6 };
var AMV_PICK = { top: ["oversized_tee", "tank_top", "camp_shirt", "silk_blouse", "tunic", "peplum_top", "suit_shirt_tie", "cocktail_dress"],
bottom: ["trousers", "baggy_jeans", "cargo_shorts", "pencil_skirt_midi", "suit_trousers", "wrapper_knee"],
jacket: ["overcoat", "suit_jacket"], shoes: ["sneakers", "loafers", "heels", "oxfords", "combat_boots"], hat: ["baseball_cap"] };
function amvShorten(b) { return __ZC(441, 159, this, arguments, new.target); }
(function () {
if (typeof amkPage !== "function")
return;
var pg = amkPage;
amkPage = function () {
amvAtlasLoad();
var r = pg.apply(this, arguments);
try {
var b = AMK.el && AMK.el.querySelector(".amk-body");
if (b) {
if (AMK.tab !== "worn")
amvRewire(b);
if (/^(clothes|acc)$/.test(AMK.tab))
amvShorten(b);
}
}
catch (e) {
if (window.console)
console.warn("[maker quick]", e);
}
return r;
};
var css = amvCss;
amvCss = function () {
css();
var s = document.getElementById("amv-css");
if (s && !s.amvQ) {
s.amvQ = 1;
s.textContent += "#amk .amv-th{display:block;width:100%;aspect-ratio:1;border-radius:4px;background-color:#2a2436;background-repeat:no-repeat}" +
"#amk .amv-spin{position:absolute;left:50%;top:14px;transform:translateX(-50%);display:none;align-items:center;gap:8px;background:#000a;color:#fff;padding:5px 12px;border-radius:14px;font-size:13px;pointer-events:none}" +
"#amk .amv-spin i{width:14px;height:14px;border:2px solid #ffffff55;border-top-color:#ffd77a;border-radius:50%;animation:amvspin .8s linear infinite}@keyframes amvspin{to{transform:rotate(360deg)}}";
}
};
})();
AMV.warmF = null;
function amvWarmFile(r) { var js = JSON.stringify(r); return "ara/" + araHash(js) + (araLite() ? "-l" : "") + "-" + js.length; }
function amvWarm() { return __ZC(441, 160, this, arguments, new.target); }
(function () {
if (typeof amkSave !== "function")
return;
var sv = amkSave;
amkSave = function () {
try {
if (!AMV.askedBuy && typeof AMG !== "undefined" && AMG.st && typeof amgOwned === "function" && typeof WORN !== "undefined") {
var held = (typeof AMG_ROWS !== "undefined" ? AMG_ROWS : [["wings"], ["tail"]]).map(function (x) { return AMG.st[x[0]]; }).filter(function (k) { return k && WORN[k] && !amgOwned(k); });
if (held.length && AMK.el) {
amvBuyBar(held);
return;
}
}
}
catch (e) { }
AMV.askedBuy = false;
try {
var ren = AMK.ren;
if (ren && ren.forceContextLoss && !ren.amvLate) {
var fl = ren.forceContextLoss.bind(ren);
ren.amvLate = 1;
ren.forceContextLoss = function () { setTimeout(function () { try {
fl();
}
catch (e) { } }, 4000); };
}
}
catch (e) { }
AMV.savedAt = performance.now();
return sv.apply(this, arguments);
};
})();
function amvBuyBar(held) { return __ZC(441, 161, this, arguments, new.target); }
var AMV_FOCUS = [
[/^ears\//, { yaw: Math.PI / 2, zt: 1.2, hair: true }],
[/^nose\//, { yaw: 0.8, zt: 1.3 }],
[/^mouth\//, { yaw: 0.45, zt: 1.45 }],
[/^(eyes|eyebrows)\//, { yaw: 0, zt: 1.3 }],
[/^(cheek|chin|forehead)\//, { yaw: 0.35, zt: 1.05 }],
[/^(head|neck)\//, { yaw: 0.6, zt: 0.9 }],
[/^race\/.*(ears)/i, { yaw: 0.9, zt: 0.9, hair: true }],
[/^race\//, { yaw: 0.9, zt: 0.95 }],
[/^(breast|torso|stomach|buttocks|hip)\//, { yaw: 0.7, zt: 0.35 }],
[/^armslegs\/(lowerarm|upperarm|hand|wrist|forearm)/, { yaw: 1.1, zt: 0.3 }],
[/^armslegs\//, { yaw: 0.5, zt: 0 }]
];
var AMV_TINY = ["armslegs/lowerarm-muscle", "mouth/mouth-laugh-lines", "mouth/mouth-philtrum-volume", "mouth/mouth-cupidsbow"];
function amvFocusFor(k) { for (var i = 0; i < AMV_FOCUS.length; i++)
if (AMV_FOCUS[i][0].test(k))
return AMV_FOCUS[i][1]; return { yaw: 0.5, zt: null }; }
function amvFocusYaw(dt) {
var F = AMV.focus;
if (!F || performance.now() > F.until)
return false;
var d = F.yaw - AMK.yaw;
d = Math.atan2(Math.sin(d), Math.cos(d));
AMK.yaw += d * (1 - Math.exp(-dt * 5));
return true;
}
function amvHairPeek() { return __ZC(441, 162, this, arguments, new.target); }
function amvOnSlide(e) { return __ZC(441, 163, this, arguments, new.target); }
function amvNote(t) { return __ZC(441, 164, this, arguments, new.target); }
(function () {
if (typeof openCharacterMaker !== "function" || typeof amkPage !== "function")
return;
var op = openCharacterMaker;
openCharacterMaker = function () {
AMV.focus = null;
AMV.hairOff = false;
AMV.hairFig = null;
var r = op.apply(this, arguments);
try {
if (AMK.el && !AMK.el.amvSlide) {
AMK.el.amvSlide = 1;
AMK.el.addEventListener("input", amvOnSlide, true);
}
}
catch (e) { }
return r;
};
var fr = amkFrame;
amkFrame = function () { try {
amvHairPeek();
}
catch (e) { } return fr.apply(this, arguments); };
var pg = amkPage;
amkPage = function () {
var r = pg.apply(this, arguments);
try {
AMV_TINY.forEach(function (k) { var el = AMK.el.querySelector('.amk-body input[data-mod="' + k + '"]'); if (el && el.parentNode)
el.parentNode.remove(); });
if (AMK.tab === "body" && (AMK.r.gender || 0) >= 0.85) {
["breastSize", "breastFirmness"].forEach(function (k) { var el = AMK.el.querySelector('.amk-body input[data-k="' + k + '"]'); if (el && el.parentNode)
el.parentNode.remove(); });
}
}
catch (e) {
if (window.console)
console.warn("[maker sliders]", e);
}
return r;
};
})();
