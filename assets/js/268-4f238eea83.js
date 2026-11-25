/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SFX = { list: [], breaths: [], dot: null, mats: {}, v: new THREE.Vector3(), v2: new THREE.Vector3(), wingL: null, cool: 0, phone: (typeof HDF_PHONE !== "undefined" && HDF_PHONE) || (typeof LITE !== "undefined" && LITE) };
function sfxDot() { return __ZC(268, 0, this, arguments, new.target); }
function sfxPointsMat(size, add) {
var k = size + ":" + (add ? 1 : 0);
if (SFX.mats[k])
return SFX.mats[k];
return (SFX.mats[k] = new THREE.PointsMaterial({ size: size, map: sfxDot(), vertexColors: true, transparent: true, depthWrite: false, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending, sizeAttenuation: true }));
}
var SFX_AIR = {
ember: { m: "rise", n: 26, s: 0.09, v: 0.55, add: 1 }, frost: { m: "fall", n: 24, s: 0.08, v: 0.3, add: 1 }, star: { m: "orbit", n: 22, s: 0.075, v: 0.35, add: 1 },
moon: { m: "orbit", n: 20, s: 0.06, v: 0.25, add: 1 }, gild: { m: "float", n: 20, s: 0.07, v: 0.18, add: 1 }, shimmer: { m: "orbit", n: 20, s: 0.07, v: 0.45, add: 1 },
woad: { m: "float", n: 14, s: 0.06, v: 0.12, add: 0 }, bark: { m: "fall", n: 12, s: 0.07, v: 0.22, add: 0 }, stone: { m: "float", n: 12, s: 0.05, v: 0.08, add: 0 },
rough: { m: "rise", n: 16, s: 0.06, v: 0.3, add: 1 }, spots: { m: "float", n: 14, s: 0.05, v: 0.12, add: 0 }, dots: { m: "rise", n: 18, s: 0.05, v: 0.2, add: 1 },
freckles: { m: "float", n: 14, s: 0.05, v: 0.14, add: 1 }
};
function sfxAirCols(S) { return __ZC(268, 1, this, arguments, new.target); }
function sfxAir(g, S) { return __ZC(268, 2, this, arguments, new.target); }
function sfxAirTick(dt) {
var cam = typeof camera !== "undefined" ? camera : null;
if (!cam)
return;
var keep = [];
for (var i = 0; i < SFX.list.length; i++) {
var o = SFX.list[i];
if (!o.g.parent) {
if (++o.gone > 300) {
o.P.geometry.dispose();
continue;
}
keep.push(o);
continue;
}
o.gone = 0;
keep.push(o);
var vis = o.g.visible;
if (vis) {
o.g.getWorldPosition(SFX.v);
vis = SFX.v.distanceToSquared(cam.position) < 45 * 45;
}
o.P.visible = vis;
if (!vis)
continue;
var a = o.P.geometry.attributes.position.array, c = o.P.geometry.attributes.color.array, A = o.A;
for (var k = 0; k < o.st.length; k++) {
var s = o.st[k];
s.life += dt / s.span;
if (s.life >= 1) {
s.life -= 1;
s.a = Math.random() * 6.283;
s.r = 0.28 + Math.random() * 0.32;
s.y = A.m === "fall" ? 1.7 + Math.random() * 0.4 : A.m === "rise" ? 0.1 + Math.random() * 0.6 : 0.3 + Math.random() * 1.5;
s.dx = s.dz = 0;
}
var x, y, z;
if (A.m === "rise") {
s.y += A.v * s.sp * dt;
s.a += 0.3 * dt;
x = Math.cos(s.a) * s.r;
z = Math.sin(s.a) * s.r;
y = s.y;
}
else if (A.m === "fall") {
s.y -= A.v * s.sp * dt;
s.a += 0.5 * dt;
x = Math.cos(s.a) * s.r + Math.sin(s.y * 3) * 0.05;
z = Math.sin(s.a) * s.r;
y = s.y;
}
else if (A.m === "orbit") {
s.a += A.v * s.sp * dt * 2;
x = Math.cos(s.a) * (s.r + 0.15);
z = Math.sin(s.a) * (s.r + 0.15);
y = s.y + Math.sin(s.a * 0.7) * 0.08;
}
else {
s.dx += (Math.random() - 0.5) * A.v * dt;
s.dz += (Math.random() - 0.5) * A.v * dt;
s.y += Math.sin(s.life * 6.283 + k) * A.v * 0.2 * dt;
x = Math.cos(s.a) * s.r + s.dx;
z = Math.sin(s.a) * s.r + s.dz;
y = s.y;
}
a[k * 3] = x;
a[k * 3 + 1] = y;
a[k * 3 + 2] = z;
var f = Math.sin(Math.PI * Math.min(1, Math.max(0, s.life))), b = o.add ? f * 0.9 : 1;
c[k * 3] = s.c.r * b;
c[k * 3 + 1] = s.c.g * b;
c[k * 3 + 2] = s.c.b * b;
if (!o.add) {
if (f < 0.15) {
a[k * 3 + 1] = -10;
}
}
}
o.P.geometry.attributes.position.needsUpdate = true;
o.P.geometry.attributes.color.needsUpdate = true;
}
SFX.list = keep;
}
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) {
var g = bf.apply(this, arguments);
try {
var L = lookOf(spec), S = typeof atSkinOf === "function" ? atSkinOf(L) : null;
if (S && g)
sfxAir(g, S);
}
catch (e) { }
return g;
};
})();
(function () {
if (typeof spDress !== "function")
return;
var sd = spDress;
spDress = function (g, spec, o, sp) {
var L = null;
try {
L = lookOf(spec);
}
catch (e) { }
SFX.wingL = L;
try {
sd.apply(this, arguments);
}
finally {
SFX.wingL = null;
}
try {
var live = null;
for (var i = SP_LIVE.length - 1; i >= 0; i--)
if (SP_LIVE[i].g === g) {
live = SP_LIVE[i];
break;
}
var S = L && typeof atSkinOf === "function" ? atSkinOf(L) : null;
if (live && S && S.glow) {
var em = new THREE.Color(S.glow).multiplyScalar(0.32);
[live.head, live.back].forEach(function (G) { if (G)
G.traverse(function (m) { if (m.isMesh && m.material && m.material.emissive && !m.material.userData.sfxGlow) {
m.material = m.material.clone();
m.material.emissive = em.clone();
m.material.userData.sfxGlow = 1;
} }); });
}
if (sp === "fairy" && L) {
var wc = L.wingColor != null ? L.wingColor : null;
g.traverse(function (m) {
if (m.isMesh && m.geometry && m.geometry.type === "PlaneGeometry" && m.material && m.material.color && m.material.color.getHex() === 0xFFE8B0 && m.material.opacity < 0.5) {
if (L.wingGlow === false)
m.visible = false;
else if (wc != null) {
m.material = m.material.clone();
m.material.color.setHex(new THREE.Color(wc).lerp(new THREE.Color(0xFFFFFF), 0.35).getHex());
}
}
});
}
}
catch (e) { }
};
})();
var SFX_WSTYLE = ["bubble", "butterfly", "moth", "dragonfly", "petal", "leaf", "crystal"], SFX_WSTYLE_L = ["Soap-bubble", "Butterfly", "Moth", "Dragonfly", "Petal", "Leaf", "Crystal"];
var SFX_WCOL = [0xFFB8E8, 0xC8A8FF, 0x9AF0FF, 0xA8FFD0, 0xFFF0A8, 0xFF9A5A, 0x6A9AFF, 0xE84A6A, 0x4AC88A, 0xF4F4F4, 0x3A2A5A, 0x1A1A22];
var SFX_WSIZE = ["0.8", "1", "1.25", "1.5"], SFX_WSIZE_L = ["small", "regular", "large", "grand"];
function sfxWingTex(style, col) { return __ZC(268, 3, this, arguments, new.target); }
var SFX_WSHAPE = { bubble: [[0.62, 0.7, 0.05, 0.02], [0.42, 0.42, -1.35, 0]], crystal: [[0.66, 0.74, 0.08, 0.02], [0.44, 0.44, -1.3, 0]],
butterfly: [[0.8, 0.85, 0.12, 0.02], [0.58, 0.58, -1.2, 0]], moth: [[0.85, 0.62, 0.22, 0.02], [0.56, 0.46, -1.05, 0]],
dragonfly: [[1.0, 0.2, 0.16, 0.04], [0.9, 0.19, -0.18, -0.02]], petal: [[0.62, 0.78, 0.0, 0.02], [0.48, 0.52, -1.1, 0]], leaf: [[0.7, 0.46, 0.3, 0.02], [0.5, 0.34, -0.7, 0]] };
(function () {
if (typeof spFairyWing !== "function")
return;
var old = spFairyWing;
spFairyWing = function (sd) {
var L = SFX.wingL;
if (!L || (!L.wingStyle && L.wingColor == null && !L.wingSize))
return old.apply(this, arguments);
var style = SFX_WSTYLE.indexOf(L.wingStyle) >= 0 ? L.wingStyle : "bubble", col = L.wingColor != null ? L.wingColor : null, size = parseFloat(L.wingSize) || 1;
var see = style === "dragonfly" ? 0.45 : style === "bubble" || style === "crystal" ? 0.6 : 0.88;
var mk = "wm:" + style + ":" + col, mat = SFX.mats[mk] || (SFX.mats[mk] = new THREE.MeshBasicMaterial({ map: sfxWingTex(style, col), transparent: true, opacity: see, side: THREE.DoubleSide, depthWrite: false,
blending: (style === "bubble" || style === "crystal") ? THREE.AdditiveBlending : THREE.NormalBlending }));
var g = new THREE.Group();
(SFX_WSHAPE[style] || SFX_WSHAPE.bubble).forEach(function (q) {
var w = q[0], h = q[1], sh = new THREE.Shape();
if (style === "leaf") {
sh.moveTo(0, 0);
sh.quadraticCurveTo(w * 0.5, h * 1.1, w, h);
sh.quadraticCurveTo(w * 0.7, h * 0.1, 0, 0);
}
else if (style === "crystal") {
sh.moveTo(0, 0);
sh.lineTo(w * 0.35, h * 0.95);
sh.lineTo(w, h * 0.7);
sh.lineTo(w * 0.8, h * 0.15);
sh.lineTo(0, 0);
}
else {
sh.moveTo(0, 0);
sh.bezierCurveTo(w * 0.3, h * 0.9, w * 1.1, h * 1.05, w, h * 0.55);
sh.bezierCurveTo(w * 0.95, h * 0.15, w * 0.4, 0, 0, 0);
}
var geo = new THREE.ShapeGeometry(sh, 16), uv = geo.attributes.uv, ps = geo.attributes.position;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, ps.getX(i) / w, ps.getY(i) / h);
var m = new THREE.Mesh(geo, mat);
m.rotation.z = q[2];
m.position.y = q[3];
g.add(m);
});
g.scale.set(sd * size, size, size);
return g;
};
})();
var SFX_BREATH = {
fire: { name: "fire", c: [0xFFE6A0, 0xFF8A2A, 0x8A2A10], v: 5.2, spread: 0.24, lift: 0.7, add: 1, size: 0.34 },
frost: { name: "frost", c: [0xFFFFFF, 0xBFEFFF, 0x6A9ACC], v: 4.2, spread: 0.26, lift: -0.25, add: 1, size: 0.3 },
lightning: { name: "lightning", c: [0xF0FAFF, 0x8AD0FF, 0x3A5AD8], v: 6.5, spread: 0.14, lift: 0, add: 1, size: 0.22 },
poison: { name: "poison gas", c: [0xC8F0A0, 0x7AB84A, 0x2A4A1A], v: 3.2, spread: 0.34, lift: 0.15, add: 1, size: 0.4 },
acid: { name: "acid", c: [0xF4FF9A, 0xA8D02A, 0x4A5A12], v: 4.6, spread: 0.16, lift: -0.9, add: 1, size: 0.24 },
radiant: { name: "radiant light", c: [0xFFFBE8, 0xFFE08A, 0xC8962A], v: 5, spread: 0.2, lift: 0.3, add: 1, size: 0.28 },
arcane: { name: "arcane mist", c: [0xF4E6FF, 0xB884F4, 0x5A2A9A], v: 3.8, spread: 0.3, lift: 0.2, add: 1, size: 0.36 }
};
function sfxBreathKind(L) { return __ZC(268, 4, this, arguments, new.target); }
function sfxBreathe(g, L, fromCam) { return __ZC(268, 5, this, arguments, new.target); }
function sfxMouth(b, o, d) { return __ZC(268, 6, this, arguments, new.target); }
function sfxBreathTick(dt) {
var keep = [];
for (var i = 0; i < SFX.breaths.length; i++) {
var b = SFX.breaths[i];
b.t += dt;
var o = SFX.v, d = SFX.v2, ok = sfxMouth(b, o, d), a = b.P.geometry.attributes.position.array, c = b.P.geometry.attributes.color.array, K = b.K, alive = false;
for (var k = 0; k < b.st.length; k++) {
var s = b.st[k], age = b.t - s.t0;
if (age < 0 || age > s.life) {
a[k * 3 + 1] = -1e4;
c[k * 3] = c[k * 3 + 1] = c[k * 3 + 2] = 0;
if (age < 0)
alive = true;
continue;
}
alive = true;
if (!s.o) {
if (!ok) {
continue;
}
s.o = o.clone();
s.d = d.clone();
}
var f = age / s.life, dist = K.v * age * (1 - 0.35 * f), sp = K.spread * dist;
var side = new THREE.Vector3(-s.d.z, 0, s.d.x).normalize();
a[k * 3] = s.o.x + s.d.x * dist + side.x * s.rx * sp;
a[k * 3 + 1] = s.o.y + s.d.y * dist + s.ry * sp * 0.6 + K.lift * age * age;
a[k * 3 + 2] = s.o.z + s.d.z * dist + side.z * s.rx * sp;
var col2 = f < 0.4 ? b.cols[0].clone().lerp(b.cols[1], f / 0.4) : b.cols[1].clone().lerp(b.cols[2], (f - 0.4) / 0.6), env = Math.min(1, f / 0.15) * Math.pow(1 - f, 1.3) * 0.55;
c[k * 3] = col2.r * env;
c[k * 3 + 1] = col2.g * env;
c[k * 3 + 2] = col2.b * env;
}
b.P.geometry.attributes.position.needsUpdate = true;
b.P.geometry.attributes.color.needsUpdate = true;
if (alive)
keep.push(b);
else {
if (b.P.parent)
b.P.parent.remove(b.P);
b.P.geometry.dispose();
}
}
SFX.breaths = keep;
}
function sfxMyBreath() { return __ZC(268, 7, this, arguments, new.target); }
function sfxLookKey(look) { if (!look || !look.breath)
return look || {}; var o = {}; for (var k in look)
if (k !== "breath")
o[k] = look[k]; return o; }
function sfxPresenceBreath(p, row) {
var n = row && row.look && row.look.breath && row.look.breath.n || 0;
if (p.breathN == null) {
p.breathN = n;
return;
}
if (n !== p.breathN) {
p.breathN = n;
if (p.group && row.look.species === "dragonborn")
sfxBreathe(p.group, row.look, false);
}
}
addEventListener("keydown", function (e) {
if (e.code !== "KeyZ" || e.repeat || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (typeof walkMode === "undefined" || !walkMode)
return;
try {
if (meLook().species === "dragonborn")
sfxMyBreath();
}
catch (err) { }
});
setInterval(function () {
try {
var bar = document.getElementById("me-bar");
if (!bar)
return;
var b = document.getElementById("me-breath");
if (!b) {
b = document.createElement("button");
b.className = "btn";
b.id = "me-breath";
b.title = "Breathe (Z)";
b.onclick = function (e) { e.preventDefault(); sfxMyBreath(); };
bar.appendChild(b);
}
var L = meLook(), on = L.species === "dragonborn";
b.style.display = on ? "" : "none";
if (on) {
var t = "Breathe " + SFX_BREATH[sfxBreathKind(L)].name + " (Z)";
if (b.textContent !== t)
b.textContent = t;
}
}
catch (e) { }
}, 1000);
function wardBodyExtra(L, S, set) { return __ZC(268, 8, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
var d = Math.min(0.1, dt || 1 / 60);
sfxAirTick(d);
sfxBreathTick(d);
}
catch (e) {
if (window.console)
console.warn("skin fx:", e);
} };
})();
