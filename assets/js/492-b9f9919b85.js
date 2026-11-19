/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CRX = { geo: {}, mat: {}, made: 0, live: [], t0: 0, frame: 0 };
try {
if (/[?&]crxoff=1/.test(location.search))
window.CRX_OFF = 1;
}
catch (e) { }
function crxLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); }
function crxOn() { return !window.CRX_OFF && typeof THREE !== "undefined"; }
function crxRot(v, r) { if (!r)
return v; return v.applyEuler(new THREE.Euler(-r[0], -r[1], -r[2], "ZYX")); }
var CRX_T = new THREE.Vector3();
function crxSd(P, x, y, z) { return __ZC(492, 0, this, arguments, new.target); }
function crxSmin(a, b, k) { if (k <= 0)
return Math.min(a, b); var h = Math.max(0, Math.min(1, 0.5 + 0.5 * (b - a) / k)); return b + (a - b) * h - k * h * (1 - h); }
function crxBounds(P) { return __ZC(492, 1, this, arguments, new.target); }
function crxPath(pts, r0, r1, o) { var out = [], n = pts.length - 1; for (var i = 0; i < n; i++) {
var P = { t: "c", a: pts[i], b: pts[i + 1], r0: r0 + (r1 - r0) * i / n, r1: r0 + (r1 - r0) * (i + 1) / n };
for (var k in o)
P[k] = Array.isArray(o[k]) ? o[k][Math.min(i, o[k].length - 1)] : o[k];
out.push(P);
} return out; }
function crxMirror(list) { return __ZC(492, 2, this, arguments, new.target); }
function crxBonesMirror(list) { var out = []; list.forEach(function (B) { out.push(B); if (/^L_/.test(B[0]))
out.push(["R_" + B[0].slice(2), B[1] && /^L_/.test(B[1]) ? "R_" + B[1].slice(2) : B[1], [-B[2][0], B[2][1], B[2][2]]]); }); return out; }
function crxMeshGen(plan) { return __ZC(492, 3, this, arguments, new.target); }
function crxMesh(plan) { var it = crxMeshGen(plan), r; do {
r = it.next();
} while (!r.done); return r.value; }
CRX.queue = [];
CRX.job = null;
function crxWarm(keys) {
if (!crxOn())
return;
(keys || []).forEach(function (k) { if (k && !CRX.geo[k] && typeof crxPlan === "function" && crxPlan(k) && CRX.queue.indexOf(k) < 0)
CRX.queue.push(k); });
if (!CRX.job && CRX.queue.length)
crxWork();
}
function crxWork() { return __ZC(492, 4, this, arguments, new.target); }
var CRX_SURF = {
fur: { rough: 0.92, metal: 0, bump: 0.55, sheen: 0.35 },
hide: { rough: 0.78, metal: 0, bump: 0.5, sheen: 0.12 },
scale: { rough: 0.55, metal: 0, bump: 0.85, sheen: 0.18 },
chitin: { rough: 0.32, metal: 0.05, bump: 0.35, sheen: 0.25 },
flesh: { rough: 0.42, metal: 0, bump: 0.6, sheen: 0.2 },
stone: { rough: 0.95, metal: 0, bump: 1.1, sheen: 0 },
metal: { rough: 0.38, metal: 0.85, bump: 0.7, sheen: 0 },
brass: { rough: 0.3, metal: 0.95, bump: 0.6, sheen: 0 },
ecto: { rough: 0.4, metal: 0, bump: 0.2, sheen: 0.6, ghost: 1 },
fire: { rough: 1, metal: 0, bump: 0.3, sheen: 0, fire: 1 }
};
var CRX_GLSL_NOISE = [
"float crxH(vec3 p){ p=fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }",
"float crxN(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);",
"  return mix(mix(mix(crxH(i),crxH(i+vec3(1,0,0)),f.x),mix(crxH(i+vec3(0,1,0)),crxH(i+vec3(1,1,0)),f.x),f.y),",
"             mix(mix(crxH(i+vec3(0,0,1)),crxH(i+vec3(1,0,1)),f.x),mix(crxH(i+vec3(0,1,1)),crxH(i+vec3(1,1,1)),f.x),f.y),f.z); }",
"float crxF(vec3 p){ return crxN(p)*0.5+crxN(p*2.03)*0.25+crxN(p*4.01)*0.125; }",
"float crxCell(vec3 p){ vec3 i=floor(p), f=fract(p); float d=1.0; for(int a=-1;a<=1;a++) for(int b=-1;b<=1;b++) for(int c=-1;c<=1;c++){ vec3 o=vec3(float(a),float(b),float(c)); vec3 r=o+vec3(crxH(i+o),crxH(i+o+3.1),crxH(i+o+7.7))-f; d=min(d,dot(r,r)); } return sqrt(d); }"
].join("\n");
var CRX_RELIEF = {
fur: "float s1=crxN(vec3(q.x*90.0,q.y*90.0,q.z*24.0)+crxN(q*6.0)*3.0); float s2=crxN(vec3(q.x*180.0,q.y*60.0,q.z*180.0)); h=s1*0.7+s2*0.3+crxF(q*7.0)*0.6; ao=mix(0.78,1.06,s1);",
hide: "float w=crxF(q*14.0); float pores=crxN(q*160.0); h=w*0.8+abs(sin(q.y*70.0+w*9.0))*0.25+pores*0.18; ao=mix(0.85,1.05,w);",
scale: "float d=crxCell(vec3(q.x*38.0,q.y*38.0,q.z*30.0)); h=1.0-d*d*1.2+crxN(q*90.0)*0.1; ao=mix(0.62,1.08,smoothstep(0.0,0.75,1.0-d));",
chitin: "float w=crxF(q*9.0); float band=smoothstep(0.92,1.0,abs(sin(q.z*26.0+w*2.0))); h=w*0.5-band*0.6+crxN(q*120.0)*0.08; ao=1.0-band*0.35;",
flesh: "float w=crxF(q*11.0); float vein=1.0-smoothstep(0.0,0.06,abs(crxN(q*7.0)-0.5)); h=w*0.7+vein*0.35+crxN(q*140.0)*0.12; ao=mix(0.8,1.05,w)-vein*0.12;",
stone: "float w=crxF(q*5.0); float cr=crxCell(q*9.0); h=w*1.2+cr*0.6+crxN(q*70.0)*0.25; ao=mix(0.8,1.05,smoothstep(0.05,0.5,cr))*mix(0.82,1.05,w);",
metal: "vec3 g=abs(fract(q*vec3(4.0,5.0,4.0)+0.5)-0.5); float seam=1.0-smoothstep(0.0,0.018,min(g.x,min(g.y,g.z))); float wear=crxF(q*22.0); h=-seam*0.9+crxN(q*260.0)*0.06+wear*0.15; ao=1.0-seam*0.55;",
brass: "vec3 g=abs(fract(q*vec3(3.0,4.0,3.0)+0.5)-0.5); float seam=1.0-smoothstep(0.0,0.02,min(g.x,min(g.y,g.z))); float rv=1.0-smoothstep(0.0,0.03,length(fract(q*vec3(12.0,12.0,12.0))-0.5)-0.06); h=-seam*0.7+rv*0.5+crxF(q*30.0)*0.2; ao=1.0-seam*0.4;",
ecto: "float w=crxF(q*4.0+vec3(0.0,-crxTime*0.6,0.0)); h=w; ao=1.0;",
fire: "float w=crxF(q*5.0+vec3(0.0,-crxTime*2.2,0.0)); h=w; ao=1.0;"
};
function crxMat(surf, opt) { return __ZC(492, 5, this, arguments, new.target); }
CRX.timeU = { value: 0 };
var CRX_EYE = {};
function crxEye(r, iris, pupil, glow) { return __ZC(492, 6, this, arguments, new.target); }
var CRX_PLANS = {};
var CRX_PLAN = {};
function crxPlan(key) {
if (CRX_PLAN[key])
return CRX_PLAN[key];
var f = CRX_PLANS[key];
if (!f)
return null;
var p = f();
p.key = key;
CRX_PLAN[key] = p;
return p;
}
function crxHas(key) { return !!CRX_PLANS[key]; }
function crxBuild(key, opt) { return __ZC(492, 7, this, arguments, new.target); }
function crxSdfAt(plan, x, y, z) {
var d = 1e9, first = true, K = plan.k || 0.06;
for (var q = 0; q < plan.prims.length; q++) {
var P = plan.prims[q], s = crxSd(P, x, y, z);
if (P.cut) {
d = Math.max(d, -s);
continue;
}
if (first) {
d = s;
first = false;
}
else
d = crxSmin(d, s, P.k !== undefined ? P.k : K);
}
return d;
}
function crxEyeFit(plan, at, r) { return __ZC(492, 8, this, arguments, new.target); }
var CRX_V = new THREE.Vector3(), CRX_C = new THREE.Vector3();
function crxR(I, n, x, y, z) { var b = I.bones[n]; if (!b)
return; var r = I.base[n]; b.rotation.set(r[0] + (x || 0), r[1] + (y || 0), r[2] + (z || 0)); }
function crxTick(I) { return __ZC(492, 9, this, arguments, new.target); }
function crxStrike(I) { if (I.act !== "strike")
return 0; var t = I.actT; return t < 0.35 ? -t / 0.35 : t < 0.5 ? -1 + (t - 0.35) / 0.15 * 2 : 1 - (t - 0.5) / 0.25; }
function crxHurt(I) { return I.act === "hurt" ? Math.sin(I.actT / 0.35 * Math.PI) : 0; }
var CRX_ANIM = {
quad: function (I, dt) { return __ZC(492, 10, this, arguments, new.target); },
biped: function (I, dt) { return __ZC(492, 11, this, arguments, new.target); },
spider: function (I, dt) {
var P = I.plan, s = I.spd, stride = P.stride || 0.9;
I.ph += dt * Math.max(0, s) / stride;
var amp = Math.min(1, s / 0.8) * 0.38, w = I.ph * Math.PI * 2, st = crxStrike(I), hu = crxHurt(I);
for (var i = 1; i <= 4; i++)
["L", "R"].forEach(function (sd, j) {
var grp = (i + j) % 2, a = w + grp * Math.PI, sg = sd === "L" ? 1 : -1;
crxR(I, sd + "_" + i + "u", 0, Math.sin(a) * amp * sg, -Math.max(0, Math.cos(a)) * amp * 0.8 * sg);
crxR(I, sd + "_" + i + "l", 0, 0, Math.max(0, Math.cos(a)) * amp * 0.5 * sg);
});
var root = I.bones.body;
root.position.y = I.at.body[1] + Math.abs(Math.sin(w * 2)) * 0.02 * Math.min(1, s);
crxR(I, "body", st * 0.25, 0, hu * 0.12);
if (P.front) {
crxR(I, "L_1u", st * 0.9, 0, 0);
crxR(I, "R_1u", st * 0.9, 0, 0);
}
crxR(I, "abdomen", Math.sin(I.t * 1.4) * 0.03, Math.sin(I.t * 0.8) * 0.05, 0);
var tw = Math.sin(I.t * 1.3 + I.seed) * 0.12;
for (var k = 1; k <= 6; k++)
crxR(I, "tail" + k, (I.act === "strike" ? (st < 0 ? 0.25 * (-st) : -0.6 * st) : Math.sin(I.t * 1.1 + k * 0.5) * 0.05), tw, 0);
var pin = Math.max(0, Math.sin(I.t * 1.7 + I.seed)) * 0.3 + (I.act === "strike" ? 0.5 : 0);
crxR(I, "L_claw", 0, -pin, 0);
crxR(I, "R_claw", 0, pin, 0);
crxR(I, "L_palp", 0, I.look * 0.2 + Math.sin(I.t * 1.1) * 0.1, 0);
crxR(I, "R_palp", 0, I.look * 0.2 - Math.sin(I.t * 1.3) * 0.1, 0);
crxR(I, "head", 0, I.look * 0.25, 0);
crxDie(I, root, dt);
},
float: function (I, dt) { return __ZC(492, 12, this, arguments, new.target); },
tripod: function (I, dt) { return __ZC(492, 13, this, arguments, new.target); }
};
function crxDie(I, root, dt) {
if (!I.dead)
return;
I.dead = Math.min(1, I.dead + dt * 1.6);
var r = I.base[root.name];
root.rotation.z = r[2] + I.dead * Math.PI * 0.48 * (I.plan.anim === "float" ? 0.3 : 1);
}
function crxQuad(p) { return __ZC(492, 14, this, arguments, new.target); }
function crxMirrorFix(list) { return list; }
function crxHead(kind, E, hs, p, eyes, bones, boneName) { return __ZC(492, 15, this, arguments, new.target); }
function crxWings(w, root, G) { return __ZC(492, 16, this, arguments, new.target); }
CRX_PLANS.wolf = function () {
return crxQuad({ L: 0.72, H: 0.62, G: 0.22, W: 0.85, legR: 0.045, head: "wolf", hs: 1.05, col: 0x6E655A, belly: 0xD8D0C2, back: 0x3A342E, muzzle: 0xB8AC98,
tail: { l: 0.5, r: 0.06, up: -1.1, bushy: 1, tip: 0x2A2622 }, neck: { l: 0.3, up: 0.55 }, fangs: 1, eyeCol: 0xC8962A, stride: 1.15 });
};
CRX_PLANS.hellhound = function () { return __ZC(492, 17, this, arguments, new.target); };
CRX_PLANS.cerberus = function () {
var p = CRX_PLANS.hellhound();
return crxQuad({ L: 0.82, H: 0.7, G: 0.28, W: 0.95, legR: 0.055, head: "dog", hs: 1.05, heads: 3, col: 0x1E1A1A, back: 0x0E0C0C, belly: 0x3A2A26, muzzle: 0x2A2020,
tail: { l: 0.6, r: 0.06, up: -0.8 }, neck: { l: 0.28, up: 0.5 }, fangs: 1, eyeCol: 0xFF4A1E, glowEyes: 1, claws: 1, surf: "hide", stride: 1.3 });
};
CRX_PLANS.fox = function () {
return crxQuad({ L: 0.62, H: 0.5, G: 0.19, W: 0.8, legR: 0.036, head: "fox", hs: 0.9, col: 0xC0602A, belly: 0xF0E8DA, back: 0x9A4A22, muzzle: 0xF0E8DA,
tail: { l: 0.55, r: 0.07, up: -1.2, bushy: 1, tip: 0xF2EEE6 }, neck: { l: 0.24, up: 0.6 }, eyeCol: 0xC89A2A, stride: 0.95, pose: { L_ear: [0, 0, 0] } });
};
CRX_PLANS.kitsune = function () { return __ZC(492, 18, this, arguments, new.target); };
CRX_PLANS.lion = function () {
return crxQuad({ L: 1.0, H: 0.82, G: 0.3, W: 0.85, legR: 0.06, head: "lion", hs: 1.3, col: 0xC0924A, belly: 0xE8D2A8, back: 0xA87A3A, muzzle: 0xE8D8B8, maneCol: 0x7A4A22, maneCol2: 0x5A3418,
tail: { l: 0.85, r: 0.035, up: -1.2, tuft: 0x4A2A14 }, neck: { l: 0.3, up: 0.4 }, fangs: 1, eyeCol: 0xC8902A, claws: 1, stride: 1.6 });
};
CRX_PLANS.tiger = function () {
return crxQuad({ L: 1.1, H: 0.8, G: 0.3, W: 0.82, legR: 0.062, head: "cat", hs: 1.25, col: 0xD8782A, belly: 0xF4EEE2, muzzle: 0xF4EEE2,
stripes: [22, 0.55, 0x1A1210], tail: { l: 0.9, r: 0.04, up: -1.1, tip: 0x1A1210 }, neck: { l: 0.28, up: 0.4 }, fangs: 1, eyeCol: 0xD8B03A, claws: 1, stride: 1.6 });
};
CRX_PLANS.bear = function () {
return crxQuad({ L: 0.9, H: 0.72, G: 0.42, W: 0.95, legR: 0.09, head: "bear", hs: 1.3, col: 0x4A3020, back: 0x3A2418, belly: 0x3A2618, muzzle: 0x7A5A3A,
tail: { l: 0.12, r: 0.06, up: -0.5 }, neck: { l: 0.3, up: 0.25 }, neckR0: 0.7, neckR1: 0.55, claws: 1, stride: 1.4, runAt: 3.4, hump: 0 });
};
CRX_PLANS.snowbear = function () {
return crxQuad({ L: 0.95, H: 0.75, G: 0.44, W: 0.95, legR: 0.095, head: "bear", hs: 1.3, col: 0xEDE8DC, back: 0xF8F4EC, belly: 0xD8D0BE, muzzle: 0xE0D8C8, hump: 0,
tail: { l: 0.12, r: 0.06, up: -0.5 }, neck: { l: 0.4, up: 0.2 }, neckR0: 0.7, neckR1: 0.5, claws: 1, stride: 1.4, runAt: 3.4 });
};
CRX_PLANS.boar = function () { return __ZC(492, 19, this, arguments, new.target); };
CRX_PLANS.horse = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x6A3E22, back: 0x5A321A, muzzle: 0x3A2A22, mane: 0x1A1210, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x1A1210 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 });
};
CRX_PLANS.unicorn = function () { return __ZC(492, 20, this, arguments, new.target); };
CRX_PLANS.pegasus = function () { return __ZC(492, 21, this, arguments, new.target); };
CRX_PLANS.nightmare = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x141214, back: 0x0A0A0C, muzzle: 0x1E1A1A, mane: 0x3A1410, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x3A1410 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, eyeCol: 0xFF3A1E, glowEyes: 1, surf: "hide" });
};
CRX_PLANS.kelpie = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x3E5A54, back: 0x2E4440, muzzle: 0x2A3A36, mane: 0x2F5A3A, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x2F5A3A }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, surf: "flesh" });
};
CRX_PLANS.griffin = function () { return __ZC(492, 22, this, arguments, new.target); };
CRX_PLANS.hippogriff = function () {
return crxQuad({ L: 1.05, H: 0.95, G: 0.32, W: 0.8, legR: 0.05, head: "eagle", hs: 1.4, col: 0x8A6A4A, headCol: 0xD8CCB8, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x4A3A2A }, neck: { l: 0.45, up: 0.85 }, neckR1: 0.45, stride: 1.9, wings: { col: 0x7A5A3A, col2: 0x9A7A54, s: 1.4 } });
};
CRX_PLANS.manticore = function () { return __ZC(492, 23, this, arguments, new.target); };
CRX_PLANS.chimera = function () { return __ZC(492, 24, this, arguments, new.target); };
CRX_PLANS.fenrir = function () {
return crxQuad({ L: 0.72, H: 0.62, G: 0.22, W: 0.85, legR: 0.045, head: "wolf", hs: 1.05, col: 0x5E5A58, belly: 0xA8A49E, back: 0x3A3836, muzzle: 0x8A8680,
tail: { l: 0.5, r: 0.06, up: -1.1, bushy: 1 }, neck: { l: 0.3, up: 0.55 }, fangs: 1, eyeCol: 0xE8B23A, glowEyes: 1, stride: 1.15 });
};
CRX_PLANS.elephant = function () {
return crxQuad({ L: 1.1, H: 1.25, G: 0.62, W: 0.9, legR: 0.15, head: "elephant", hs: 1.5, col: 0x7A7676, back: 0x6A6666, belly: 0x8A8684,
tail: { l: 0.7, r: 0.03, up: -1.4, tuft: 0x2A2622 }, neck: { l: 0.12, up: 0.3 }, neckR0: 0.8, neckR1: 0.7, foot: "paw", footCol: 0x8A8482, surf: "hide", stride: 1.8, runAt: 4.5, tailSway: 0.15 });
};
CRX_PLANS.mammoth = function () {
return crxQuad({ L: 1.1, H: 1.25, G: 0.66, W: 0.95, legR: 0.16, head: "elephant", hs: 1.55, col: 0x5A3A26, back: 0x4A2E1E, belly: 0x6A4A32, tusks: 1, hump: 1,
tail: { l: 0.4, r: 0.04, up: -1.4, tuft: 0x2A1A10 }, neck: { l: 0.12, up: 0.3 }, neckR0: 0.8, neckR1: 0.7, stride: 1.8, runAt: 4.5, tailSway: 0.15 });
};
CRX_PLANS.rabbit = function () {
return crxQuad({ L: 0.22, H: 0.14, G: 0.11, W: 1, legR: 0.022, head: "rabbit", hs: 0.65, col: 0xA8987E, belly: 0xF0E8DC,
tail: { l: 0.04, r: 0.035, up: 0.2, col: 0xF4F0EA }, neck: { l: 0.06, up: 0.9 }, stride: 0.3, fine: 70 });
};
CRX_PLANS.rat = function () {
return crxQuad({ L: 0.22, H: 0.1, G: 0.08, W: 1, legR: 0.014, head: "rat", hs: 0.55, col: 0x5E5650, belly: 0xA89E94,
tail: { l: 0.35, r: 0.012, up: -0.3, col: 0xC89A94 }, neck: { l: 0.06, up: 0.4 }, stride: 0.22, fine: 70 });
};
CRX_PLANS.giantrat = function () {
return crxQuad({ L: 0.75, H: 0.36, G: 0.26, W: 0.9, legR: 0.04, head: "rat", hs: 1.8, col: 0x4A423C, back: 0x2E2824, belly: 0x8A8076,
tail: { l: 1.1, r: 0.035, up: -0.3, col: 0xB08A84 }, neck: { l: 0.18, up: 0.3 }, fangs: 1, eyeCol: 0xE83A2A, glowEyes: 1, claws: 1, stride: 0.8, surf: "fur" });
};
CRX_PLANS.stag = function () { return __ZC(492, 25, this, arguments, new.target); };
function crxBiped(p) { return __ZC(492, 26, this, arguments, new.target); }
function crxFace(kind, E, s, p, eyes, bones) { return __ZC(492, 27, this, arguments, new.target); }
CRX_PLANS.troll = function () { return __ZC(492, 28, this, arguments, new.target); };
CRX_PLANS.deeptroll = function () {
var p = crxBiped({ h: 2.9, b: 1.4, hunch: 0.75, arm: 1.3, gut: 0.5, head: "brute", hs: 1.5, col: 0x5A6268, skin: 0x5A6268, col2: 0x2E2A26, legCol: 0x4E565C, hand: 0x4E5258,
claws: 1, tusks: 1, ears: "long", nose: 0.05, eyeCol: 0xC8D8FF, glowEyes: 1, back: 1, surf: "stone", fingers: 3, stride: 2.0 });
return p;
};
CRX_PLANS.ogre = function () {
return crxBiped({ h: 3.0, b: 1.55, hunch: 0.35, arm: 1.1, gut: 1.4, head: "brute", hs: 1.5, col: 0x8A9A5A, skin: 0x8A9A5A, col2: 0x5A4028, legCol: 0x5A4028, hand: 0x7A8A50,
tusks: 1, ears: "round", nose: 0.045, hair: 0x2A1E14, eyeCol: 0x8A6A2A, surf: "hide", fingers: 4, stride: 2.1 });
};
CRX_PLANS.oni = function () {
return crxBiped({ h: 2.8, b: 1.4, hunch: 0.25, arm: 1.1, gut: 0.4, head: "brute", hs: 1.5, col: 0x3E5EA8, skin: 0x3E5EA8, col2: 0xC7A043, legCol: 0x3E5EA8, hand: 0x3A5498,
tusks: 1, ears: "long", horns: "short", hornCol: 0xE8DCC2, hair: 0x1A1A1E, eyeCol: 0xFFD24A, glowEyes: 1, claws: 1, surf: "hide", fingers: 3, stride: 2.0 });
};
CRX_PLANS.magmabrute = function () {
return crxBiped({ h: 3.0, b: 1.5, hunch: 0.35, arm: 1.15, gut: 0.4, head: "brute", hs: 1.4, col: 0x2A2220, skin: 0x2A2220, col2: 0x3A1A10, legCol: 0x2A2220, hand: 0x3A2420,
tusks: 1, ears: false, horns: "long", hornCol: 0x1A1414, eyeCol: 0xFFA040, glowEyes: 1, claws: 1, surf: "stone", fingers: 3, stride: 2.0, matOpt: { emit: 0x5A1A06 } });
};
CRX_PLANS.demon = function () { return __ZC(492, 29, this, arguments, new.target); };
CRX_PLANS.brimfiend = function () { return __ZC(492, 30, this, arguments, new.target); };
CRX_PLANS.imp = function () { return __ZC(492, 31, this, arguments, new.target); };
CRX_PLANS.werewolf = function () {
return crxBiped({ h: 2.25, b: 1.15, hunch: 0.55, arm: 1.2, head: "wolf", hs: 1.2, col: 0x4A3E32, skin: 0x4A3E32, col2: 0x3A2E24, legCol: 0x4A3E32, hand: 0x3A302A, muzzle: 0x6A5E50, ruff: 0x5A4E40,
claws: 1, digi: 1, tail: 1, tailCol: 0x3A2E24, eyeCol: 0xE8B23A, glowEyes: 1, surf: "fur", back: 1, stride: 1.8 });
};
CRX_PLANS.minotaur = function () {
return crxBiped({ h: 2.6, b: 1.35, hunch: 0.2, arm: 1.05, head: "bull", hs: 1.15, col: 0x4A3022, skin: 0x4A3022, col2: 0x5A3A22, legCol: 0x3A261A, hand: 0x4A3022, muzzle: 0x2A1E1A,
hooves: 1, digi: 1, tail: 1, tailCol: 0x2A1A12, eyeCol: 0x3A1A10, surf: "fur", back: 1, stride: 1.9 });
};
CRX_PLANS.golem = function () { return __ZC(492, 32, this, arguments, new.target); };
CRX_PLANS.earthelemental = function () {
return crxBiped({ h: 3.4, b: 1.7, hunch: 0.35, arm: 1.25, head: "golem", hs: 0.9, col: 0x6B5A48, skin: 0x6B5A48, col2: 0x5A4A38, legCol: 0x5A4A38, hand: 0x6B5A48,
eyeCol: 0x8AE85A, surf: "stone", fingers: 3, stride: 2.2, back: 1, k: 0.03 });
};
CRX_PLANS.fireelemental = function () { return __ZC(492, 33, this, arguments, new.target); };
CRX_PLANS.yeti = function () { return __ZC(492, 34, this, arguments, new.target); };
CRX_PLANS.zombie = null;
CRX_PLANS.sentinel = function () { return __ZC(492, 35, this, arguments, new.target); };
CRX_PLANS.automaton = function () { return __ZC(492, 36, this, arguments, new.target); };
CRX_PLANS.grey = function () {
return crxBiped({ h: 1.35, b: 0.7, hunch: 0.05, arm: 1.2, head: "grey", hs: 1.25, col: 0x9AA6A0, skin: 0x9AA6A0, col2: 0x9AA6A0, legCol: 0x929E98, hand: 0x9AA6A0,
surf: "flesh", fingers: 3, stride: 1.0, runAt: 2.6, fine: 100 });
};
CRX_PLANS.selenite = function () { return __ZC(492, 37, this, arguments, new.target); };
function crxLamp(I, bone, at, col, r) {
var b = I.bones[bone];
if (!b)
return;
var m = new THREE.Mesh(CRX.lampGeo || (CRX.lampGeo = new THREE.SphereGeometry(1, 10, 8)), new THREE.MeshBasicMaterial({ color: col }));
m.scale.setScalar(r);
var o = I.at[bone];
m.position.set(at[0] - o[0], at[1] - o[1], at[2] - o[2]);
b.add(m);
}
function crxBug(p) { return __ZC(492, 38, this, arguments, new.target); }
CRX_PLANS.spider = function () { return crxBug({ kind: "spider", s: 1, col: 0x221C1A, abdCol: 0x2A2220, legCol: 0x1E1816, mark: 0x6A1E14, hair: 0x2E2622, surf: "chitin", eyeCol: 0x3A0A0A, glowEyes: 0, spots: [16, 0.75, 0x4A3A2A] }); };
CRX_PLANS.cavespider = function () { return crxBug({ kind: "spider", s: 1, col: 0x2A2632, abdCol: 0x3A3048, legCol: 0x24202C, mark: 0x8A6AE0, hair: 0x3A3444, surf: "chitin", eyeCol: 0xB08AFF, glowEyes: 1 }); };
CRX_PLANS.glassstalker = function () { return crxBug({ kind: "spider", s: 1, col: 0xB8C8E0, abdCol: 0xD8E4F4, legCol: 0xA8B8D8, mark: 0xF08AD8, surf: "chitin", eyeCol: 0xF08AD8, glowEyes: 1, legW: 0.7, hi: 0.55 }); };
CRX_PLANS.scorpion = function () { return crxBug({ kind: "scorpion", s: 1, col: 0x3A2A1E, legCol: 0x4A3626, tipCol: 0x1E140E, surf: "chitin", hi: 0.2, belly: 0x6A5440 }); };
CRX_PLANS.dustscorp = function () { return crxBug({ kind: "scorpion", s: 1, col: 0xB89A6A, legCol: 0xC8AA7A, tipCol: 0x4A3626, surf: "chitin", hi: 0.2, belly: 0xE0CCA8 }); };
CRX_PLANS.rockcrawler = function () { return crxBug({ kind: "scorpion", s: 1, col: 0x5A5048, legCol: 0x4A423C, tipCol: 0xC84A1A, surf: "stone", hi: 0.2, eyeCol: 0xFF8A3A, glowEyes: 1 }); };
CRX_PLANS.crab = function () { return crxBug({ kind: "crab", s: 1, col: 0xA8322B, legCol: 0xB84232, tipCol: 0x2A1410, surf: "chitin", hi: 0.22, belly: 0xE8C8A8 }); };
CRX_PLANS.spiderbot = function () { return __ZC(492, 39, this, arguments, new.target); };
CRX_PLANS.hullcrawler = function () { return __ZC(492, 40, this, arguments, new.target); };
function crxShade(p) { return __ZC(492, 41, this, arguments, new.target); }
CRX_PLANS.ghost = function () { return crxShade({ col: 0xDCE6F0, face: 0xE8EEF4, eyeCol: 0x8AA8D8, tint: 0x9AB8E0 }); };
CRX_PLANS.wraith = function () { return crxShade({ col: 0x2A2E38, face: 0x1A1C22, hood: 1, eyeCol: 0x9A7AE0, tint: 0x3A3060 }); };
CRX_PLANS.deepshade = function () { return crxShade({ col: 0x2A2440, face: 0x14121E, hood: 1, eyeCol: 0xB08AFF, tint: 0x5A4AA0 }); };
CRX_PLANS.hollowshade = function () { return crxShade({ col: 0x262A3A, face: 0x12141C, hood: 1, eyeCol: 0x8A9AE8, tint: 0x3A4280 }); };
CRX_PLANS.banshee = function () { return crxShade({ col: 0xDCE4F0, face: 0xE8EEF4, hair: 0xEDF2F8, eyeCol: 0xC8D8FF, tint: 0xA8B8E0 }); };
CRX_PLANS.discord = function () { return crxShade({ col: 0xB89AD8, face: 0xD8C8F0, hair: 0xE0D0F4, eyeCol: 0xF08AD8, tint: 0xC8A0F0 }); };
CRX_PLANS.acidwraith = function () { return crxShade({ col: 0xB8C84A, face: 0xD8E080, hood: 1, eyeCol: 0xE8F04A, tint: 0xA8C83A }); };
CRX_PLANS.airelemental = function () { return crxShade({ col: 0xDCE8F0, face: 0xEAF2F8, eyeCol: 0xFFFFFF, tint: 0xC8DCF0 }); };
CRX_PLANS.floatingeye = function () { return __ZC(492, 42, this, arguments, new.target); };
CRX_PLANS.martian = function () { return __ZC(492, 43, this, arguments, new.target); };
CRX_PLANS.tripod = function () { return __ZC(492, 44, this, arguments, new.target); };
var CRX_ARCH = {
unicorn: ["unicorn", 1], pegasus: ["pegasus", 1], nightmare: ["nightmare", 1], kelpie: ["kelpie", 1], griffin: ["griffin", 1.15], hippogriff: ["hippogriff", 1],
manticore: ["manticore", 1.15], chimera: ["chimera", 1.15], cerberus: ["cerberus", 2], hellhound: ["hellhound", 1.1], fenrir: ["fenrir", 3.4], kitsune: ["kitsune", 1.3],
fox: ["fox", 1], bear: ["bear", 1.1], lion: ["lion", 1], tiger: ["tiger", 1], elephant: ["elephant", 1.15], mammoth: ["mammoth", 1.3], boar: ["boar", 1], rabbit: ["rabbit", 1], rat: ["rat", 1],
wolf: ["wolf", 1], stag: ["stag", 1],
troll: ["troll", 1.1], ogre: ["ogre", 1.1], oni: ["oni", 1], demon: ["demon", 1], imp: ["imp", 1], werewolf: ["werewolf", 1], minotaur: ["minotaur", 1], golem: ["golem", 1.15],
earthelemental: ["earthelemental", 1], fireelemental: ["fireelemental", 1], robot: ["robot", 0.85], grey: ["grey", 1], alien: ["alien", 1],
ghost: ["ghost", 1], wraith: ["wraith", 1], banshee: ["banshee", 1], airelemental: ["airelemental", 1.1], floatingeye: ["floatingeye", 1],
spider: ["spider", 0.5], scorpion: ["scorpion", 0.5], crab: ["crab", 0.4], xeno: ["hullcrawler", 0.8],
martian: ["martian", 1], selenite: ["selenite", 1], tripod: ["tripod", 1], sentinel: ["sentinel", 1], spiderbot: ["spiderbot", 1], automaton: ["automaton", 1], giantrat: ["giantrat", 1]
};
CRX_PLANS.robot = function () { var p = CRX_PLANS.sentinel(); p.eyes.forEach(function (e) { e.iris = 0x6AD8FF; }); p.extras = function (I) { crxLamp(I, "chest", [0, I.at.chest[1] + 0.12, I.at.chest[2] + 0.2], 0x6AD8FF, 0.05); }; return p; };
CRX_PLANS.alien = function () { return crxBiped({ h: 1.75, b: 0.72, hunch: 0.05, arm: 1.2, head: "grey", hs: 1.15, col: 0x7AA890, skin: 0x7AA890, col2: 0x3A5A6A, legCol: 0x3A5A6A, hand: 0x7AA890, surf: "flesh", fingers: 3, stride: 1.2, fine: 100 }); };
function crxMake(key, f, o) { return __ZC(492, 45, this, arguments, new.target); }
var crxOldBuildCreature = typeof buildCreature === "function" ? buildCreature : null;
if (crxOldBuildCreature)
buildCreature = function (spec, f) { return __ZC(492, 46, this, arguments, new.target); };
(function () {
if (typeof C !== "function" || typeof CREATURE === "undefined")
return;
var add = function (k, w, kind, o) { if (CREATURE[k])
return; try {
C(k, w, kind, o);
}
catch (e) { } };
add("wolf", ["wolf", "wolves", "grey wolf", "timber wolf", "pack of wolves"], "beast", { col: 0x6E655A, head: "dog", roam: 1, night: 1 });
add("stag", ["stag", "deer", "red deer", "hart"], "beast", { col: 0x8A5A34, head: "horse", roam: 1 });
add("martian", ["martian", "martians", "a martian", "the martians", "a thing from mars"], "float", { col: 0x7A7470, night: 1, realm: "stars" });
add("selenite", ["selenite", "selenites", "moon man", "man in the moon", "moon people"], "folk", { skin: 0x7A6A52, top: 0x7A6A52, realm: "stars" });
add("tripod", ["tripod", "fighting machine", "fighting-machine", "martian machine", "war machine on three legs", "heat-ray"], "float", { col: 0x9AA0A8, big: 1, night: 1 });
add("sentinel", ["sentinel", "sentinel robot", "security robot", "war robot", "killer robot"], "folk", { skin: 0x8A949E, top: 0x8A949E, night: 1 });
add("spiderbot", ["spider robot", "robot spider", "spider-bot", "spiderbot", "mechanical spider", "scuttler"], "crawl", { col: 0x5A626C, body: "spider", night: 1 });
add("automaton", ["clockwork man", "brass man", "clockwork robot", "brass automaton", "steam man", "tin man"], "folk", { skin: 0xB8883A, top: 0xB8883A });
add("giantrat", ["giant rat", "giant rats", "rat the size of a dog", "sewer rat"], "beast", { col: 0x4A423C, head: "rat", night: 1, roam: 1 });
try {
if (MORE_VOCAB.xeno)
MORE_VOCAB.xeno = MORE_VOCAB.xeno.filter(function (w) { return !/xenomorph|creature from the ship/.test(w); }).concat(["hull crawler", "hull-crawler", "crawling alien"]);
}
catch (e) { }
})();
var CRX_KIND_PLAN = { cavespider: "cavespider", glassstalker: "glassstalker", mirespider: "spider", rockcrawler: "rockcrawler", brimcrawler: "scorpion", dustscorp: "dustscorp", canyonscorp: "dustscorp",
deeptroll: "deeptroll", slaggolem: "ogre", magmagolem: "magmabrute", brimfiend: "brimfiend", emberhound: "hellhound", ashhound: "hellhound", cinderimp: "imp", kilnimp: "imp",
deepshade: "deepshade", hollowshade: "hollowshade", discord: "discord", acidwraith: "acidwraith", watcher: "floatingeye", faceless: null,
sunwisp: "fireelemental", emberel: "fireelemental", lavawisp: "fireelemental", snowbear: "snowbear", wildbear: "bear", wildboar: "boar", scavhog: "boar", werewolf: "werewolf", rimeyeti: "yeti" };
var CRX_KIND_SIZE = { sunwisp: 0.6, lavawisp: 0.6, emberel: 1, slaggolem: 1.05, scavhog: 1.45, wildboar: 1.3, rockcrawler: 0.5, brimcrawler: 0.45, dustscorp: 0.5, canyonscorp: 0.5, cavespider: 0.5, mirespider: 0.55, glassstalker: 0.5 };
var CRX_NEW_KINDS = {
sentinel: { name: "Rogue sentinel", body: "crx", plan: "sentinel", hp: 130, spd: 3.2, dmg: 13, reach: 2.4, big: 1, shot: { r: 18, c: 0xFF4A3A }, spoil: ["Sentinel's cracked red lens", "🔴"], growl: 90 },
spiderbot: { name: "Scuttler", body: "crx", plan: "spiderbot", scale: 0.7, hp: 60, spd: 5.2, dmg: 8, reach: 2.4, spoil: ["Scuttler's leg servo", "⚙️"], growl: 700 },
chromeraider: { name: "Chrome raider", body: "person", cyborg: 1, arm: "cutlass", hp: 70, spd: 3.9, dmg: 10, reach: 2.1,
look: { layer: "longcoat", layerColor: 0x2A2E34, top: 0x3A3E44, bottom: 0x22262A, shoes: 0x16181A }, spoil: ["Raider's chrome knuckle", "🦾"], growl: 250 },
automaton: { name: "Runaway brass automaton", body: "crx", plan: "automaton", hp: 150, spd: 2.6, dmg: 14, reach: 2.3, big: 1, spoil: ["Automaton's mainspring", "🌀"], growl: 120 },
martian: { name: "Martian", body: "crx", plan: "martian", hp: 95, spd: 1.9, dmg: 11, reach: 2.6, spoil: ["A Martian's tentacle-tip", "🐙"], growl: 70 },
tripod: { name: "Martian fighting-machine", body: "crx", plan: "tripod", scale: 0.75, hp: 420, spd: 2.4, dmg: 22, reach: 5, big: 1, shot: { r: 30, c: 0xFFE8A0 }, spoil: ["A heat-ray's cracked lens", "🔆"], growl: 60 },
selenite: { name: "Selenite of the Moon", body: "crx", plan: "selenite", hp: 50, spd: 4.0, dmg: 8, reach: 2, spoil: ["Selenite's goad", "🔱"], growl: 520 },
greywatcher: { name: "Little grey", body: "crx", plan: "grey", hp: 40, spd: 3.4, dmg: 7, reach: 1.8, shot: { r: 15, c: 0x8AFFB0 }, spoil: ["A grey's humming probe", "🛸"], growl: 640 },
hullcrawler: { name: "Hull crawler", body: "crx", plan: "hullcrawler", scale: 0.8, hp: 75, spd: 5.0, dmg: 10, reach: 2.6, spoil: ["Hull crawler's spine", "🦴"], growl: 160 },
timberwolf: { name: "Timber wolf", body: "crx", plan: "wolf", hp: 60, spd: 6.0, dmg: 9, reach: 2.0, spoil: ["Wolf's fang", "🐺"], growl: 200 },
giantrat: { name: "Giant rat", body: "crx", plan: "giantrat", hp: 35, spd: 5.0, dmg: 6, reach: 1.7, spoil: ["Rat's yellow tooth", "🐀"], growl: 900 },
hilltroll: { name: "Hill troll", body: "crx", plan: "troll", hp: 170, spd: 2.9, dmg: 16, reach: 2.8, big: 1, spoil: ["Troll's knuckle-bone", "🦴"], growl: 100 },
ghost: { name: "Restless ghost", body: "crx", plan: "ghost", hp: 45, spd: 3.4, dmg: 8, reach: 2, shot: { r: 13, c: 0xA8C8FF }, spoil: ["A cold breath, kept in glass", "👻"], growl: 440 },
stonegolem: { name: "Stone golem", body: "crx", plan: "golem", scale: 0.8, hp: 200, spd: 2.2, dmg: 18, reach: 2.8, big: 1, spoil: ["Golem's rune-stone", "🪨"], growl: 80 },
minotaur: { name: "The bull of the maze", body: "crx", plan: "minotaur", hp: 220, spd: 3.6, dmg: 18, reach: 2.6, big: 1, spoil: ["The bull's broken horn", "🐂"], growl: 90 }
};
var CRX_NEW_WHERE = {
wasteland: ["chromeraider", "spiderbot"], future: ["sentinel", "spiderbot", "chromeraider", "sentinel"], mars: ["martian", "martian", "tripod", "martian"],
moon: ["selenite", "selenite", "greywatcher"], space: ["hullcrawler", "greywatcher", "hullcrawler"], mmin: ["automaton", "spiderbot", "automaton"],
underground: ["giantrat", "giantrat", "ghost"], dead: ["ghost", "ghost", "wraith"], frozen: ["timberwolf", "timberwolf", "rimeyeti"], other: ["timberwolf", "hilltroll"],
veyar: ["greywatcher"], desert: ["dustscorp", "martian"], faerie: ["timberwolf", "hilltroll"], elsewhere: ["stonegolem", "timberwolf"], stars: ["greywatcher", "hullcrawler"],
underdark: ["stonegolem"]
};
var CRX_NEW_DUNGEON = { belfry: ["ghost"], barrow: ["ghost"], foundry: ["automaton", "spiderbot"], silk: ["giantrat"] };
(function () {
if (typeof DGB_KINDS === "undefined")
return;
Object.keys(CRX_NEW_KINDS).forEach(function (k) { if (!DGB_KINDS[k])
DGB_KINDS[k] = CRX_NEW_KINDS[k]; });
if (!DGB_KINDS.wraith)
DGB_KINDS.wraith = { name: "Wraith", body: "crx", plan: "wraith", hp: 55, spd: 3.6, dmg: 10, reach: 2, spoil: ["A wraith's tatter", "🌑"], growl: 150 };
Object.keys(DGB_KINDS).forEach(function (k) { DGB_KINDS[k].key = DGB_KINDS[k].key || k; });
if (typeof DGB_WHERE !== "undefined")
Object.keys(CRX_NEW_WHERE).forEach(function (w) {
var have = DGB_WHERE[w];
DGB_WHERE[w] = (have || []).concat(CRX_NEW_WHERE[w]).filter(function (k) { return !!DGB_KINDS[k]; });
});
if (typeof SGA_DUNGEONS !== "undefined")
Object.keys(CRX_NEW_DUNGEON).forEach(function (d) {
var D = SGA_DUNGEONS[d];
if (!D)
return;
CRX_NEW_DUNGEON[d].forEach(function (k) { if (D.mobs.indexOf(k) < 0 && DGB_KINDS[k])
D.mobs.push(k); });
});
})();
function crxPlanOfKind(K) {
if (!K)
return null;
var key = K.body === "crx" ? K.plan : (K.key && CRX_KIND_PLAN[K.key] !== undefined ? CRX_KIND_PLAN[K.key] : null);
if (!key && K.body === "kit" && K.arch && CRX_ARCH[K.arch])
key = CRX_ARCH[K.arch][0];
return key;
}
setInterval(function () {
if (!crxOn() || typeof DGB_KINDS === "undefined")
return;
try {
var list = [];
if (typeof SGA !== "undefined" && SGA.delve && typeof SGA_DUNGEONS !== "undefined") {
var D = SGA_DUNGEONS[SGA.delve.d];
if (D)
list = D.mobs.concat([D.boss.kind]);
}
else if (typeof dgbLevel === "function" && dgbLevel() >= 3 && typeof dgbList === "function")
list = dgbList();
if (list.length)
crxWarm(list.map(function (k) { return crxPlanOfKind(DGB_KINDS[k]); }));
}
catch (e) { }
}, 4000);
var crxOldDgbBody = typeof dgbBody === "function" ? dgbBody : null;
if (crxOldDgbBody)
dgbBody = function (K, seed) { return __ZC(492, 47, this, arguments, new.target); };
function crxActOn(g, what) { try {
if (g && g.userData && g.userData.crxAct)
g.userData.crxAct(what);
}
catch (e) { } }
(function () {
var wrap = function (n, f) { var old = window[n]; if (typeof old !== "function")
return; window[n] = function () { var r = old.apply(this, arguments); try {
f.apply(this, arguments);
}
catch (e) { } return r; }; };
wrap("dgbBlow", function (B) { if (B && B.cool > 1)
crxActOn(B.g, "strike"); });
wrap("dgbThrow", function (B) { crxActOn(B && B.g, "strike"); });
wrap("dgbStrike", function (B) { crxActOn(B && B.g, "hurt"); });
wrap("dgbSpellHit", function (B) { crxActOn(B && B.g, "hurt"); });
wrap("sgaDlvDamage", function (M) { crxActOn(M && M.g, "hurt"); });
wrap("sgaVigHurt", function (d, name) {
var S = typeof SGA !== "undefined" && SGA.delve;
if (!S)
return;
var best = null, bd = 1e9, P = camera.position;
(S.mobs || []).concat(S.boss ? [S.boss] : []).forEach(function (M) { if (!M.g || !(M.K && M.K.name === name || (S.boss === M)))
return; var w = new THREE.Vector3(); M.g.getWorldPosition(w); var dd = w.distanceTo(P); if (dd < bd) {
bd = dd;
best = M;
} });
if (best)
crxActOn(best.g, "strike");
});
})();
function crxCyborg(g) { return __ZC(492, 48, this, arguments, new.target); }
function crxDrop(o) { setTimeout(function () { if (o.parent)
o.parent.remove(o); }, 0); }
function crxCyborgFit(g) { return __ZC(492, 49, this, arguments, new.target); }
function crxRigid(M) { if (M.userData.rigid)
return M.userData.rigid; var R = M.clone(); R.skinning = false; R.vertexColors = false; R.color = new THREE.Color(0x9AA2AC); R.onBeforeCompile = function () { }; R.customProgramCacheKey = function () { return "crx-rigid"; }; M.userData.rigid = R; return R; }
