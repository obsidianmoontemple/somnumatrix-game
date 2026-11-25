/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HHS = { on: !(typeof window !== "undefined" && window.HHS_OFF), mats: {}, geo: {}, going: 0 };
function hhsLite() { return typeof LITE !== "undefined" && !!LITE; }
function hhsGlowMat(col, op) {
var k = "g" + col + "|" + op;
if (HHS.mats[k])
return HHS.mats[k];
var m = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined });
m.userData.ldShared = 1;
return (HHS.mats[k] = m);
}
var HHS_DOG = { coat: 0x3A3029, belly: 0x4A3E34, ruff: 0x16120F, muzzle: 0x161210, nose: 0x080606, gum: 0x5A1416, tooth: 0xE6DABE, claw: 0x0E0C0B, snake: 0x1C2620, snakeBelly: 0x3A4232 };
function hhsE(c, r, col, rot, k) { return { t: "e", c: c, r: r, col: col, rot: rot || null, k: k }; }
function hhsC(a, b, r0, r1, col, k) { return { t: "c", a: a, b: b, r0: r0, r1: r1, col: col, k: k }; }
function hhsMir(L) { return typeof rbkMirror === "function" ? rbkMirror(L) : L; }
function hhsDogBody() { return __ZC(477, 0, this, arguments, new.target); }
function hhsDogNeck() { var C = HHS_DOG; return [hhsC([0, 0, 0], [0, 0.25, 0.22], 0.15, 0.11, C.coat, 0.07), hhsE([0, 0.1, -0.02], [0.15, 0.16, 0.15], C.ruff, null, 0.07), hhsE([0, 0.06, 0.13], [0.11, 0.11, 0.1], C.belly, null, 0.06)]; }
function hhsDogSkull() { return __ZC(477, 1, this, arguments, new.target); }
function hhsDogJaw() { return __ZC(477, 2, this, arguments, new.target); }
function hhsDogTail() { return __ZC(477, 3, this, arguments, new.target); }
var HHS_NOISE = "varying vec3 vBkPos;\nfloat hhsHash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }\n" +
"float hhsNoise(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f); return mix(mix(mix(hhsHash(i),hhsHash(i+vec3(1,0,0)),f.x),mix(hhsHash(i+vec3(0,1,0)),hhsHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hhsHash(i+vec3(0,0,1)),hhsHash(i+vec3(1,0,1)),f.x),mix(hhsHash(i+vec3(0,1,1)),hhsHash(i+vec3(1,1,1)),f.x),f.y),f.z); }\n" +
"float hhsFbm(vec3 p){ return 0.55*hhsNoise(p)+0.3*hhsNoise(p*2.13+3.1)+0.15*hhsNoise(p*4.37+7.7); }\n";
function hhsFur(kind) { return __ZC(477, 4, this, arguments, new.target); }
function hhsSculpt(key, prims, cell, K, mat) { return __ZC(477, 5, this, arguments, new.target); }
function hhsKeep(geo) { geo.userData.shared = 1; geo.userData.rbkShared = 1; return geo; }
var HHS_PARTS = { hhs_cerb_body: [hhsDogBody, 0.02, 0.05], hhs_cerb_neck: [hhsDogNeck, 0.016, 0.06], hhs_cerb_skull: [hhsDogSkull, 0.0065, 0.03],
hhs_cerb_jaw: [hhsDogJaw, 0.006, 0.02], hhs_cerb_tail: [hhsDogTail, 0.012, 0.03] };
function hhsPart(key, mat) { var P = HHS_PARTS[key]; return hhsSculpt(key, P[0](), P[1], P[2], mat); }
function hhsWarm() { return __ZC(477, 6, this, arguments, new.target); }
function hhsNode(par, x, y, z) { var o = new THREE.Group(); o.position.set(x, y, z); par.add(o); return o; }
function hhsEye(par, x, y, z, r) {
var e = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), hhsGlowMat(0xFF4A12));
e.scale.setScalar(r);
e.position.set(x, y, z);
par.add(e);
if (typeof wGlow === "function") {
var g = wGlow(0xFF5A1A, r * 9, 0.45);
g.position.set(x, y, z + r);
par.add(g);
}
return e;
}
function hhsCerberus() { return __ZC(477, 7, this, arguments, new.target); }
function hhsDogTick(g, t, sleep) { return __ZC(477, 8, this, arguments, new.target); }
var HHS_EBS_DOG = 4.6;
(function () {
if (!HHS.on || typeof ebsCerberus !== "function")
return;
var mk = ebsCerberus;
ebsCerberus = function () {
var dog = null;
try {
dog = hhsCerberus();
}
catch (e) {
if (window.console)
console.warn("[hades-house] cerberus", e);
}
if (!dog)
return mk.apply(this, arguments);
var g = new THREE.Group();
dog.scale.setScalar(HHS_EBS_DOG);
g.add(dog);
if (typeof wGlow === "function") {
var gl = wGlow(0x8A2A10, 10, 0.22);
gl.position.set(0, 1, 3.2);
g.add(gl);
}
g.userData.hhsDog0 = dog;
g.userData.hhsT = 0;
return g;
};
if (typeof ebsCerbTick === "function") {
var tk = ebsCerbTick;
ebsCerbTick = function (g, dt, awake) {
if (!g || !g.userData.hhsDog0)
return tk.apply(this, arguments);
g.userData.hhsT += dt || 0;
try {
hhsDogTick(g.userData.hhsDog0, g.userData.hhsT, !awake);
}
catch (e) { }
};
}
})();
function hhsHallSpot() {
var hr = typeof hallRealm === "function" ? hallRealm() : null;
if (hr && typeof store !== "undefined")
for (var i = 0; i < store.objects.length; i++) {
var q = store.objects[i];
if (q.archetype !== "hubdoor" || q.leadsTo !== "underworld" || (q.realm || 0) !== hr.id)
continue;
var r = q.rot || 0, s = (q.attrs && q.attrs.s) || 1, d = 0.6 * s + 3.2;
return { here: hr.id, x: q.x - Math.sin(r) * d, y: 1.72, z: q.z - Math.cos(r) * d, yaw: r, name: "the Hall of Doors" };
}
if (typeof heartOf === "function") {
var h = heartOf(0);
return { here: 0, x: h.x, y: 1.72, z: h.z + 24, yaw: 0, name: "your own town" };
}
return null;
}
var HHS_NEAR = { at: null, t: 0, raf: 0 };
function hhsNearTick() { return __ZC(477, 9, this, arguments, new.target); }
if (HHS.on && typeof window !== "undefined")
setInterval(function () {
if (HHS.crxAsked || HHS_NEAR.raf || typeof camera === "undefined" || typeof store === "undefined")
return;
if (typeof WLD !== "undefined" && WLD.on)
return;
var now = Date.now();
if (!HHS_NEAR.at || HHS_NEAR.at.here !== (store.here || 0) || now - HHS_NEAR.t > 15000) {
HHS_NEAR.t = now;
try {
HHS_NEAR.at = hhsHallSpot();
}
catch (e) {
HHS_NEAR.at = null;
}
}
var A = HHS_NEAR.at;
if (!A || A.name !== "the Hall of Doors")
return;
if (A.here === (store.here || 0))
HHS_NEAR.raf = requestAnimationFrame(hhsNearTick);
}, 1000);
function hhsToErebos() { return __ZC(477, 10, this, arguments, new.target); }
(function () {
if (!HHS.on)
return;
if (typeof ldBuild === "function") {
var lb = ldBuild;
ldBuild = function (r) {
if (r && r.kind === "underworld") {
if (hhsToErebos())
return;
}
return lb.apply(this, arguments);
};
}
try {
if (typeof GR !== "undefined" && GR.list)
GR.list.forEach(function (R) {
if (R.id !== "underworld" || !R.parent || R.parent.w !== "land")
return;
R.parent = { w: EBS_KEY };
R.parentName = EBS_NAME;
R.gate = Object.assign({}, R.gate || {}, { at: [70, 2060, -Math.PI / 2], reach: 6 });
if (typeof WORLDS !== "undefined" && WORLDS[EBS_KEY] && typeof grHookWorld === "function")
grHookWorld(EBS_KEY);
});
}
catch (e) {
if (window.console)
console.warn("[hades-house] hearthdeep", e);
}
try {
if (typeof CT_TALES !== "undefined") {
for (var i = CT_TALES.length - 1; i >= 0; i--)
if (CT_TALES[i].id === "orpheus")
CT_TALES.splice(i, 1);
if (typeof CT_BY_HOST !== "undefined" && CT_BY_HOST["land:underworld"])
CT_BY_HOST["land:underworld"] = CT_BY_HOST["land:underworld"].filter(function (T) { return T.id !== "orpheus"; });
}
}
catch (e) { }
})();
