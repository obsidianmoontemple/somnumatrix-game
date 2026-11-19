/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(494, function () {
"use strict";
return [
function () {
var s = (typeof store !== "undefined" && store) || (window.__cbtStore || (window.__cbtStore = {}));
var p = s.cbt;
if (!p || typeof p !== "object")
p = s.cbt = {};
if (!(+p.xp >= 0))
p.xp = 0;
if (!p.sp || typeof p.sp !== "object")
p.sp = {};
if (!p.ms || typeof p.ms !== "object")
p.ms = {};
if (!(+p.kills >= 0))
p.kills = 0;
if (!(+p.falls >= 0))
p.falls = 0;
return p;
},
function (L) {
var P = camera.position;
cbtFxLevel(P.x, P.y - 1.72, P.z);
cbtTone(523, 0.18);
setTimeout(function () { cbtTone(659, 0.18); }, 140);
setTimeout(function () { cbtTone(784, 0.3); }, 280);
var opens = [];
CBT_CLASS_ORDER.forEach(function (c) { CBT_CLASSES[c].abil.forEach(function (A) { if (A.lv === L)
opens.push(A.n); }); });
var held = cbtWeapon();
cbtToast("⚔️ <b>Combat level " + L + "</b> · a skill point to spend (⚔️ Combat in the Menu)" +
(held.req === L ? " · you can now use your <b>" + cbtEsc(held.name) + "</b> fully" : "") +
(CBT_UNLOCK.indexOf(L) >= 0 ? " · new abilities open: " + cbtEsc(cbtWeaponAbil(held)[CBT_UNLOCK.indexOf(L)].n) : ""));
cbtSaveSoon(2);
},
function () {
if (CBT.srv === "busy" || CBT.srv === "ok" || CBT.srv === "missing" || !cbtSigned())
return;
CBT.srv = "busy";
cityRpc("combat_me", {}).then(function (r) {
if (!r || r.ok === false) {
CBT.srv = "later";
CBT.retryAt = CBT.t + 120;
return;
}
CBT.srv = "ok";
CBT.rate = +r.rate > 0 ? +r.rate : 1;
CBT.xpOn = r.on !== false;
var p = cbtP(), d = r.data || {};
if (+r.xp > 0 || d.sp) {
var local = p.xp;
p.xp = +r.xp || 0;
if (d.sp && typeof d.sp === "object")
p.sp = d.sp;
if (d.ms && typeof d.ms === "object")
p.ms = d.ms;
p.kills = Math.max(+d.kills || 0, 0);
p.falls = Math.max(+d.falls || 0, 0);
if (Array.isArray(d.mk)) {
var mk = Array.isArray(p.mk) ? p.mk : [];
d.mk.forEach(function (id) { if (mk.indexOf(id) < 0)
mk.push(id); });
p.mk = mk;
if (mk.length > d.mk.length)
cbtDirty();
}
if (local > p.xp) {
p.pendXp = local - p.xp;
cbtDirty();
}
}
else if (p.xp > 0)
cbtDirty();
CBT.lvShown = cbtLevel();
}).catch(function (e) { CBT.srv = cbtMissing(e) ? "missing" : "later"; CBT.retryAt = CBT.t + 120; });
},
function () {
CBT.dirty = false;
CBT.saveT = 30;
try {
if (typeof save === "function")
save();
}
catch (e) { }
if (CBT.srv !== "ok" || !cbtSigned())
return;
var p = cbtP(), want = p.xp + (+p.pendXp || 0), sent = JSON.stringify(p.sp || {});
cityRpc("combat_save", { p_xp: Math.round(want), p_data: { sp: p.sp, ms: p.ms, kills: p.kills, falls: p.falls, mk: Array.isArray(p.mk) ? p.mk : [] } }).then(function (r) {
if (!r || r.ok === false)
return;
if (+r.xp >= 0) {
p.xp = +r.xp;
p.pendXp = Math.max(0, Math.round(want - p.xp));
if (p.pendXp < 1)
delete p.pendXp;
}
if (r.sp && typeof r.sp === "object") {
if (JSON.stringify(p.sp || {}) === sent)
p.sp = r.sp;
else
CBT.dirty = true;
}
if (+r.rate > 0)
CBT.rate = +r.rate;
if (r.on === false)
CBT.xpOn = false;
else if (r.on === true)
CBT.xpOn = true;
}).catch(function () { CBT.dirty = true; });
},
function () {
var k = cbtHeldKey(), A = k && typeof BW_ARMS !== "undefined" ? BW_ARMS[k] : null, W;
if (A) {
W = { key: "bw_" + k, name: A.name || k, dmg: +A.dmg || (A.heal ? 12 : 10), cool: +A.cool || 0.6, kind: A.kind || "melee", held: String(A.held || ""), p: String(A.p || ""),
reach: +A.reach || 0, A: A, era: A.era || "", gift: A.wgGift || "" };
}
else {
var c = (typeof carrying !== "undefined" && carrying) ? String(carrying.archetype || "") : "", a = c && typeof ARMS !== "undefined" ? ARMS[c] : null;
if (a)
W = { key: c, name: a.name || c, dmg: CBT_ARMS_DMG[a.held] || 14, cool: 0.55, kind: a.shot ? "shot" : "melee", held: String(a.held || ""), p: String(a.shot || ""), reach: 0, A: null, era: "", gift: "" };
else
W = { key: "", name: "Bare hands", dmg: 9, cool: 0.42, kind: "melee", held: "", p: "", reach: 0, A: null, era: "", gift: "", bare: true };
}
W.cls = cbtClassOf(W);
W.ranged = /^(bow|gun|star|magic)$/.test(W.cls) && W.kind !== "melee";
W.elem = cbtElemOf(W);
W.req = cbtReqOf(W);
if (!W.reach)
W.reach = W.ranged ? (W.cls === "magic" ? 16 : W.cls === "bow" ? 20 : 22) : (W.cls === "pole" ? 3.2 : W.cls === "dagger" ? 2 : W.cls === "fist" ? 1.9 : 2.5);
return W;
},
function (W) {
var h = W.held.toLowerCase(), n = (W.name + " " + W.key).toLowerCase(), p = W.p.toLowerCase(), A = W.A;
if (W.bare)
return "fist";
if (/shield|aegis/.test(h) || (A && (A.shield || (A.ward && /shield|aegis/.test(n)))))
return "shield";
if (W.kind === "melee") {
if (/dagger|knife|dirk|stiletto|whip/.test(h + " " + n))
return "dagger";
if (/gauntlet|fist|knuckle|cestus/.test(h + " " + n))
return "fist";
if (/axe|hammer|maul|mace|club|flail|morning|pick|macuahuitl|cudgel|torch/.test(h + " " + n))
return "heavy";
if (/spear|glaive|halberd|trident|scythe|staff|lance|pike|pole|billhook/.test(h + " " + n))
return "pole";
return "blade";
}
if (W.kind === "cone")
return /fan/.test(h) ? "magic" : "star";
if (W.kind === "beam")
return /wand|staff|orb|tome|crown/.test(h) ? "magic" : "star";
if (W.kind === "self" || W.kind === "summon" || W.kind === "nova")
return "magic";
if (/^(laser|plasma|rail|ion|sdisc)$/.test(p))
return "star";
if (/^(ball|bullet|shot|flare|rocket|grenade|shell)$/.test(p))
return "gun";
if (/^(fire|frost|spark|orb|thorn|arcane|boulder|wave|star2|light|ice|lightning|sound)$/.test(p))
return "magic";
if (/^(arrow|bolt|stone|javelin|star|disc|wyrm|firepot)$/.test(p))
return "bow";
if (/\b(blaster|railgun|rail|plasma|pulse|ion)\b/.test(h + " " + n))
return "star";
if (/staff|wand|orb|tome|gauntlet|fan|horn/.test(h))
return "magic";
if (/pistol|rifle|shotgun|smg|assault|gatling|launcher|sniper|gun|musket|cannon/.test(h + " " + n))
return "gun";
return "bow";
},
function (W) {
var s = (W.p + " " + W.name + " " + W.held + " " + W.gift).toLowerCase();
if (/fire|ember|flame|burn|phoenix|sun|brand|firepot|cinder/.test(s))
return /sun/.test(s) ? "light" : "fire";
if (/frost|ice|freeze|snow|icicle|cold/.test(s))
return "frost";
if (/spark|storm|thunder|lightning|arc|tempest|ion/.test(s))
return "storm";
if (/light|dawn|holy|mend|halo|radiant/.test(s))
return "light";
if (/shadow|void|bone|barrow|moon|night|dark|grave/.test(s))
return "shadow";
if (/thorn|stone|wind|leaf|root|wave|tide|nature|boulder/.test(s))
return "nature";
if (/drain|blood/.test(s))
return "blood";
if (/laser|plasma|rail|blaster|beam|pulse|star|disc|sonic/.test(s))
return "star";
return "steel";
},
function (W) {
if (W.bare)
return 1;
var A = W.A;
if (!A)
return 1;
if (+A.reqLv > 0)
return Math.min(CBT_MAX, +A.reqLv | 0);
var score = A.heal ? 20 : A.kind === "summon" ? 40 : (+A.dmg || 10) * (A.kind === "cone" ? 3 : 1) / Math.sqrt(Math.max(0.05, +A.cool || 0.6));
var r = Math.round((score - 14) * 0.9);
if (/Artifacts|Relics/.test(W.era))
r = Math.max(r, 15);
try {
if (A.crafted && typeof FG !== "undefined" && FG.byId[A.crafted] && typeof FG_RB !== "undefined") {
var R = FG_RB[FG.byId[A.crafted].recipe];
if (R && R.mult)
r = Math.max(r, Math.round((R.mult - 1) * 50));
}
}
catch (e) { }
return Math.max(1, Math.min(45, r));
},
function () {
if (typeof WLD === "undefined" || !WLD || !WLD.on)
return null;
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return null;
var on = WLD.on;
if (on === "battle")
return null;
if (on === "delve")
return { k: "delve", n: "the dungeon" };
if (CBT_WORLDS[on]) {
var R = CBT_WORLDS[on];
try {
if (R.safe && R.safe())
return null;
}
catch (e) { }
return { k: "dungeon", n: R.name || on, lv: R.lv || 3 };
}
try {
if (typeof WD !== "undefined" && WD && WD.drawn && typeof wdOn === "function" && wdOn())
return null;
}
catch (e) { }
if (cbtIndoors())
return null;
var id = cbtWhereId();
if (id === "kidszone" || id === "city" || id === "hall" || id === "dream" || id === "mall")
return null;
var lv = cbtLevelHere(id);
if (lv >= 1)
return { k: lv >= 3 ? "wild" : "pvp", n: id, lv: lv };
if (cbtFoes(35, true).length)
return { k: "story", n: id, lv: 0 };
return null;
},
function (range, storyOnly) {
var out = [], P = camera.position;
try {
var list;
if (!storyOnly && typeof spbFoes === "function")
list = spbFoes(range);
else {
list = [];
(window.SPELL_FOES || []).forEach(function (fn) { try {
(fn() || []).forEach(function (f) { if (f && f.x !== undefined) {
f.d = Math.hypot(f.x - P.x, f.z - P.z);
if (f.d <= range)
list.push(f);
} });
}
catch (e) { } });
}
list.forEach(function (f) {
if (!f || f.kind === "dummy" || f.kind === "bw" || f.kind === "machine" || f.kind === "pvp-bw")
return;
if (storyOnly && !f.story)
return;
if (f.dead && f.dead())
return;
if (f.d === undefined)
f.d = Math.hypot(f.x - P.x, f.z - P.z);
if (f.d > range)
return;
f.key = f.ref || f.o || (f.kind + ":" + f.name);
if (!cbtSeen(f))
return;
out.push(f);
});
}
catch (e) {
cbtWarn("foes", e);
}
return out.sort(function (a, b) { return a.d - b.d; });
},
function (f) {
try {
if (typeof WLD === "undefined" || !WLD.on || !WLD.w)
return true;
var W = WLD.w, P = camera.position, B = W.base || 0;
if (!W.sight)
return true;
if (f.d < 1.6)
return true;
var k = f.key, now = CBT.t, c = k && typeof k === "object" && CBT_SEEN ? CBT_SEEN.get(k) : CBT_SEEN_S[k];
if (c && now - c.t < 0.2 && Math.abs(c.x - f.x) + Math.abs(c.z - f.z) < 0.6 && Math.abs(c.px - P.x) + Math.abs(c.pz - P.z) < 0.6)
return c.ok;
var ok = !!W.sight(P.x - B, P.z, f.x - B, f.z);
var e = { t: now, ok: ok, x: f.x, z: f.z, px: P.x, pz: P.z };
if (k && typeof k === "object" && CBT_SEEN)
CBT_SEEN.set(k, e);
else if (k)
CBT_SEEN_S[k] = e;
return ok;
}
catch (e) {
return true;
}
},
function (range) {
var W = cbtWeapon(), list = cbtFoes(range || Math.max(W.reach + 6, 14)), f = cbtFwd(), P = camera.position, best = null, bs = 1e9;
if (CBT.lock) {
for (var i = 0; i < list.length; i++)
if (list[i].key === CBT.lock)
return list[i];
CBT.lock = null;
}
list.forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz) || 0.01, c = (dx * f.x + dz * f.z) / d;
if (d > 2.4 && c < 0.55)
return;
if (Math.abs(o.y - (P.y - 1.0)) > 4.5)
return;
var s = d * (1.6 - c);
if (s < bs) {
bs = s;
best = o;
}
});
return best;
},
function () {
if (CBT_FX.pts || typeof THREE === "undefined" || typeof scene === "undefined" || !scene)
return !!CBT_FX.pts;
var N = cbtFxCap(), G = new THREE.BufferGeometry();
CBT_FX.n = N;
CBT_FX.pos = new Float32Array(N * 3);
CBT_FX.col = new Float32Array(N * 3);
CBT_FX.alp = new Float32Array(N);
CBT_FX.siz = new Float32Array(N);
CBT_FX.vel = new Float32Array(N * 3);
CBT_FX.age = new Float32Array(N);
CBT_FX.life = new Float32Array(N);
CBT_FX.grav = new Float32Array(N);
CBT_FX.drag = new Float32Array(N);
CBT_FX.s0 = new Float32Array(N);
for (var i = N - 1; i >= 0; i--)
CBT_FX.free.push(i);
G.setAttribute("position", new THREE.BufferAttribute(CBT_FX.pos, 3));
G.setAttribute("color", new THREE.BufferAttribute(CBT_FX.col, 3));
G.setAttribute("alpha", new THREE.BufferAttribute(CBT_FX.alp, 1));
G.setAttribute("size", new THREE.BufferAttribute(CBT_FX.siz, 1));
var M = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
uniforms: { scale: { value: (typeof innerHeight !== "undefined" ? innerHeight : 720) * 0.5 } },
vertexShader: "attribute float alpha; attribute float size; attribute vec3 color; varying float vA; varying vec3 vC; uniform float scale;" +
"void main(){ vC=color; vec4 mv=modelViewMatrix*vec4(position,1.0); float z=-mv.z; vA=alpha*smoothstep(0.7,2.2,z); gl_PointSize=clamp(size*scale/max(0.5,z),1.0,40.0); gl_Position=projectionMatrix*mv; }",
fragmentShader: "varying float vA; varying vec3 vC; void main(){ vec2 q=gl_PointCoord-vec2(0.5); float d=length(q); float a=(exp(-d*d*22.0)*0.85+(1.0-smoothstep(0.0,0.14,d))*0.35)*vA; if(a<0.01) discard; gl_FragColor=vec4(vC*a,a); }" });
var P = new THREE.Points(G, M);
P.frustumCulled = false;
P.renderOrder = 20;
P.name = "cbt-sparks";
CBT_FX.pts = P;
scene.add(P);
return true;
},
function (x, y, z, col, vx, vy, vz, life, size, grav, drag) {
var F = CBT_FX;
if (!F.free.length)
return;
var i = F.free.pop();
F.live.push(i);
F.pos[i * 3] = x - F.ax;
F.pos[i * 3 + 1] = y - F.ay;
F.pos[i * 3 + 2] = z - F.az;
F.vel[i * 3] = vx;
F.vel[i * 3 + 1] = vy;
F.vel[i * 3 + 2] = vz;
var c = new THREE.Color(col);
F.col[i * 3] = c.r;
F.col[i * 3 + 1] = c.g;
F.col[i * 3 + 2] = c.b;
F.age[i] = 0;
F.life[i] = Math.max(0.25, life);
F.s0[i] = size;
F.siz[i] = size;
F.alp[i] = 0;
F.grav[i] = grav || 0;
F.drag[i] = drag || 0;
F.dirty = true;
},
function (x, y, z, col, n, spd, life, size, o) {
if (!cbtFxInit())
return;
cbtFxAnchor();
o = o || {};
n = cbtLess(n);
for (var k = 0; k < n; k++) {
var a = Math.random() * Math.PI * 2, e = (o.flat ? 0.15 : 1) * (Math.random() * 2 - 1), s = spd * (0.35 + Math.random() * 0.65), h = Math.sqrt(1 - Math.min(1, e * e));
cbtSpark(x, y, z, (o.col2 && Math.random() < 0.35) ? o.col2 : col, Math.cos(a) * h * s, e * s + (o.up || 0), Math.sin(a) * h * s, life * (0.6 + Math.random() * 0.5), size * (0.6 + Math.random() * 0.6), o.grav || 0, o.drag || 2.5);
}
},
function (x, y, z, col, n, r, h, life, size) {
if (!cbtFxInit())
return;
cbtFxAnchor();
n = cbtLess(n);
for (var k = 0; k < n; k++) {
var a = Math.random() * Math.PI * 2, rr = r * Math.sqrt(Math.random());
cbtSpark(x + Math.cos(a) * rr, y + Math.random() * 0.4, z + Math.sin(a) * rr, col, Math.cos(a) * 0.2, h / life * (0.5 + Math.random() * 0.6), Math.sin(a) * 0.2, life * (0.7 + Math.random() * 0.5), size, 0, 0.4);
}
},
function (dt) {
var F = CBT_FX;
if (!F.pts)
return;
for (var j = F.live.length - 1; j >= 0; j--) {
var i = F.live[j];
F.age[i] += dt;
var k = F.age[i] / F.life[i];
if (k >= 1) {
F.alp[i] = 0;
F.live.splice(j, 1);
F.free.push(i);
continue;
}
var dr = Math.max(0, 1 - F.drag[i] * dt);
F.vel[i * 3] *= dr;
F.vel[i * 3 + 1] = F.vel[i * 3 + 1] * dr - F.grav[i] * dt;
F.vel[i * 3 + 2] *= dr;
F.pos[i * 3] += F.vel[i * 3] * dt;
F.pos[i * 3 + 1] += F.vel[i * 3 + 1] * dt;
F.pos[i * 3 + 2] += F.vel[i * 3 + 2] * dt;
F.alp[i] = (k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8) * 0.85;
F.siz[i] = F.s0[i] * (1 - k * 0.45);
}
if (F.dirty || F.live.length) {
var g = F.pts.geometry;
g.attributes.position.needsUpdate = true;
g.attributes.alpha.needsUpdate = true;
g.attributes.size.needsUpdate = true;
g.attributes.color.needsUpdate = true;
F.dirty = false;
}
F.pts.visible = F.live.length > 0;
for (var a = F.arcs.length - 1; a >= 0; a--) {
var A = F.arcs[a];
A.t += dt;
var u = A.t / A.life;
if (u >= 1) {
A.m.visible = false;
F.arcs.splice(a, 1);
continue;
}
A.m.material.opacity = (u < 0.25 ? u / 0.25 : 1 - (u - 0.25) / 0.75) * A.op;
var sc = A.s0 + (A.s1 - A.s0) * Math.min(1, u * 1.6);
A.m.scale.set(sc, sc, sc);
if (A.spin)
A.m.rotation.z += A.spin * dt;
}
for (var r = F.rings.length - 1; r >= 0; r--) {
var R = F.rings[r];
R.t += dt;
var v = R.t / R.life;
if (v >= 1) {
R.m.visible = false;
F.rings.splice(r, 1);
continue;
}
var s2 = R.r0 + (R.r1 - R.r0) * (1 - Math.pow(1 - Math.min(1, v * 1.3), 2));
R.m.scale.set(s2, s2, 1);
R.m.material.opacity = (v < 0.2 ? v / 0.2 : 1 - (v - 0.2) / 0.8) * R.op;
}
},
function (kind) {
var L = CBT_POOL[kind];
for (var i = 0; i < L.length; i++)
if (!L[i].visible)
return L[i];
if (L.length >= (kind === "arc" ? 6 : 8))
return null;
var arc = kind === "arc", geo = arc ? new THREE.RingGeometry(0.55, 1, 48, 4, -0.9, 1.8) : new THREE.RingGeometry(0.8, 1, 64, 3);
var pos = geo.attributes.position, cols = new Float32Array(pos.count * 3);
for (var v = 0; v < pos.count; v++) {
var x = pos.getX(v), y = pos.getY(v), r = Math.hypot(x, y), a = Math.atan2(y, x), k;
if (arc) {
var rr = (r - 0.55) / 0.45, u = (a + 0.9) / 1.8;
k = Math.pow(Math.max(0, rr), 1.6) * Math.sin(Math.PI * Math.min(1, Math.max(0, u))) * (0.35 + 0.65 * u);
}
else {
var q = (r - 0.8) / 0.2;
k = Math.max(0, Math.sin(Math.PI * q));
}
cols[v * 3] = cols[v * 3 + 1] = cols[v * 3 + 2] = k;
}
geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false }));
m.renderOrder = 19;
m.frustumCulled = false;
m.visible = false;
scene.add(m);
L.push(m);
return m;
},
function (col, dir, big, y) {
if (!cbtFxInit())
return;
var m = cbtPooled("arc");
if (!m)
return;
var P = camera.position, f = cbtFwd(), h = (y !== undefined ? y : P.y - 0.55), d = dir || 1;
m.material.color.setHex(col);
m.position.set(P.x + f.x * 0.2, h, P.z + f.z * 0.2);
m.rotation.set(-Math.PI / 2 + d * 0.3, yaw + Math.PI / 2, -d * 0.7, "YXZ");
m.visible = true;
CBT_FX.arcs.push({ m: m, t: 0, life: big ? 0.42 : 0.3, op: big ? 1 : 0.85, s0: big ? 1.7 : 1.4, s1: big ? 2.8 : 2.1, spin: d * (big ? 4.2 : 3) });
},
function (dt, f) {
if (!cbtFxInit())
return;
var M = CBT_FX.mark;
if (!M) {
M = CBT_FX.mark = new THREE.Mesh(new THREE.RingGeometry(0.82, 1, 48, 1, 0, Math.PI * 1.7), new THREE.MeshBasicMaterial({ color: 0xFFE0A0, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
M.rotation.x = -Math.PI / 2;
M.renderOrder = 18;
M.frustumCulled = false;
scene.add(M);
M.userData.op = 0;
}
var want = f ? 0.55 : 0;
M.userData.op += (want - M.userData.op) * Math.min(1, dt * 6);
M.material.opacity = M.userData.op;
M.visible = M.userData.op > 0.01;
if (!f)
return;
var r = (f.r || 0.7) + 0.5;
M.scale.set(r, r, 1);
M.position.set(f.x, cbtFeetOf(f) + 0.05, f.z);
M.rotation.z += dt * 0.6;
M.material.color.setHex(CBT.lock ? 0xFF9A6A : 0xFFE0A0);
},
function (text, at, col, scale, big) {
if (typeof document === "undefined" || !document.body)
return;
var el = null;
for (var i = 0; i < CBT.dmgEls.length; i++)
if (!CBT.dmgEls[i].on) {
el = CBT.dmgEls[i];
break;
}
if (!el) {
if (CBT.dmgEls.length >= 14)
el = CBT.dmgEls[0];
else {
var d = document.createElement("div");
d.style.cssText = "position:fixed;left:0;top:0;z-index:46;pointer-events:none;font:800 18px var(--sans,system-ui);text-shadow:0 1px 3px rgba(0,0,0,.85),0 0 8px rgba(0,0,0,.5);white-space:nowrap;will-change:transform,opacity;opacity:0";
document.body.appendChild(d);
el = { d: d, on: false };
CBT.dmgEls.push(el);
}
}
var P = camera.position;
el.on = true;
el.t = 0;
el.life = big ? 1.2 : 0.95;
el.d.textContent = text;
el.d.style.color = col || "#FFF";
el.d.style.fontSize = Math.round((big ? 26 : 18) * (scale || 1)) + "px";
el.at = at ? { x: at.x, y: at.y, z: at.z } : { x: P.x - Math.sin(yaw) * 2, y: P.y - 0.2, z: P.z - Math.cos(yaw) * 2 };
el.dx = (Math.random() - 0.5) * 30;
},
function (dt) {
if (!CBT.dmgEls.length)
return;
if (!CBT_V3)
CBT_V3 = new THREE.Vector3();
var W = innerWidth, H = innerHeight;
CBT.dmgEls.forEach(function (e) {
if (!e.on)
return;
e.t += dt;
var k = e.t / e.life;
if (k >= 1) {
e.on = false;
e.d.style.opacity = "0";
return;
}
CBT_V3.set(e.at.x, e.at.y + 0.6 + k * 1.1, e.at.z).project(camera);
if (CBT_V3.z > 1 || cbtVR()) {
e.d.style.opacity = "0";
return;
}
var x = (CBT_V3.x * 0.5 + 0.5) * W + e.dx * k, y = (-CBT_V3.y * 0.5 + 0.5) * H;
e.d.style.transform = "translate(" + Math.round(x) + "px," + Math.round(y) + "px) translate(-50%,-50%) scale(" + (k < 0.15 ? 0.7 + k * 2 : 1).toFixed(2) + ")";
e.d.style.opacity = (k < 0.15 ? k / 0.15 : k > 0.6 ? 1 - (k - 0.6) / 0.4 : 1).toFixed(2);
});
},
function (d) {
if (!CBT.on || !(d > 0))
return d;
CBT.fought = CBT.t;
CBT.lastHurtAt = CBT.t;
if (CBT.iframe > 0) {
if (!CBT.perfect) {
CBT.perfect = 1;
CBT.fury = Math.min(100, CBT.fury + 20);
CBT.stam = Math.min(cbtStamMax(), CBT.stam + 15);
cbtFloatText("Perfect dodge", null, "#9AF0D0", 1, true);
cbtTone(880, 0.12);
}
return 0;
}
if (!CBT.pvpIn)
d = d * (1 - cbtToughness());
if (CBT.absorb > 0 && CBT.absorbT > CBT.t) {
var a = Math.min(CBT.absorb, d);
CBT.absorb -= a;
d -= a;
if (a > 0) {
var P = camera.position;
cbtBurst(P.x, P.y - 0.6, P.z, 0x9AC8FF, 6, 2.5, 0.5, 0.22);
}
}
CBT.fury = Math.min(100, CBT.fury + 4);
return Math.max(0, Math.round(d));
},
function (f, roll, o) {
if (!f || !roll)
return 0;
o = o || {};
var d = roll.d;
if (f.kind === "pvp") {
d = Math.min(25, Math.round(d / cbtLvMult()));
}
try {
f.hit(d);
}
catch (e) {
cbtWarn("hit", e);
return 0;
}
var W = o.W || cbtWeapon(), E = CBT_ELEM[o.elem || W.elem] || CBT_ELEM.steel, cy = cbtChestOf(f);
cbtImpact(f.x, cy, f.z, o.elem || W.elem, roll.crit || o.big);
cbtFloatText(String(d), { x: f.x, y: cy, z: f.z }, roll.crit ? "#FFD86A" : (o.col || "#FFFFFF"), roll.crit ? 1.25 : 1, roll.crit);
CBT.fury = Math.min(100, CBT.fury + (o.ab ? 3 : 6));
CBT.fought = CBT.t;
try {
if (o.stun && f.hold)
f.hold(o.stun);
if (o.slow && f.hold)
f.hold(Math.min(0.9, o.slow * 0.3));
if (o.push && f.push) {
var P = camera.position, dx = f.x - P.x, dz = f.z - P.z;
f.push(dx, dz, o.push);
}
if (o.dot)
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d * o.dot.dps), t: o.dot.t, tick: 0, col: o.dot.col || E.col });
if (o.bleed)
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d * 0.25), t: o.bleed, tick: 0, col: 0xE05A5A });
var g = W.gift;
if (g === "burn")
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d / 6), t: 3, tick: 0, col: 0xFF8A3A });
else if (g === "frost" && f.hold)
f.hold(0.5);
else if (g === "stagger" && f.hold)
f.hold(0.4);
else if (g === "drain")
cbtHeal(d * 0.2);
}
catch (e) {
cbtWarn("after", e);
}
return d;
},
function (x, z) {
var feet = camera.position.y - 1.72;
try {
if (typeof blockedAt === "function" && blockedAt(x, z, feet))
return false;
}
catch (e) { }
try {
if (WLD.on === "delve" && typeof sgaDlvBlocked === "function" && typeof WORLDS !== "undefined" && WORLDS.delve && sgaDlvBlocked(x - WORLDS.delve.base, z))
return false;
}
catch (e) { }
try {
if (WLD.w && WLD.w.block && WLD.w.block(x - WLD.w.base, z, feet))
return false;
}
catch (e) { }
return true;
},
function (dt) {
var M = CBT.move;
if (!M)
return;
M.t += dt;
var u = Math.min(1, M.t / M.dur), e = 1 - Math.pow(1 - u, 3), want = M.dist * e, step = want - M.done;
if (step > 0) {
var P = camera.position, n = Math.max(1, Math.ceil(step / 0.35)), sx = M.dx * step / n, sz = M.dz * step / n;
for (var i = 0; i < n; i++) {
if (!cbtFree(P.x + sx, P.z + sz)) {
if (cbtFree(P.x + sx, P.z))
P.x += sx;
else if (cbtFree(P.x, P.z + sz))
P.z += sz;
else {
u = 1;
break;
}
}
else if (typeof walkBy === "function") {
var bx = P.x, bz = P.z;
walkBy(sx, sz);
if (Math.abs(P.x - bx) + Math.abs(P.z - bz) < 1e-4) {
u = 1;
break;
}
}
else {
P.x += sx;
P.z += sz;
}
}
M.done = want;
if (M.kind === "dodge" && Math.random() < 0.5)
cbtBurst(P.x, P.y - 1.65, P.z, 0xC8B8A0, 2, 1.2, 0.5, 0.22, { flat: 1, drag: 3 });
}
if (M.face)
cbtTurnTo(M.face.x, M.face.z, dt * 14);
if (u >= 1) {
CBT.move = null;
if (M.then)
try {
M.then();
}
catch (e) {
cbtWarn("move end", e);
}
}
},
function (f, s) {
if (!CBT.on || CBT.move && CBT.move.kind === "dodge")
return;
var cost = Math.max(12, 30 - 1.5 * cbtSk("agi"));
if (CBT.stam < cost) {
cbtFloatText("Too tired to roll", null, "#F0C08A", 0.8);
return;
}
CBT.stam -= cost;
if (f === undefined) {
f = 0;
s = 0;
try {
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyA"] || keys["ArrowLeft"])
s -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
s += 1;
}
catch (e) { }
if (!f && !s) {
var jv = null;
try {
jv = (typeof joyInput === "function" && joyInput()) || (typeof padInput === "function" && padInput());
}
catch (e) { }
if (jv && (jv.f || jv.s)) {
f = jv.f;
s = jv.s;
}
}
}
if (!f && !s)
f = -1;
var wx = Math.sin(yaw) * -f + Math.cos(yaw) * s, wz = Math.cos(yaw) * -f - Math.sin(yaw) * s;
CBT.iframe = 0.42;
CBT.perfect = 0;
cbtGo("dodge", wx, wz, cbtVR() ? 3 : 5, 0.3, null, null);
cbtTone(330, 0.06);
try {
if (typeof DGB !== "undefined") {
var P = camera.position, L = WLD.w ? { x: P.x - WLD.w.base, z: P.z } : null;
if (L && DGB.on.some(function (B) { return B.st !== "dead" && B.wind > 0 && Math.hypot(B.x - L.x, B.z - L.z) < B.k.reach + 2; }))
cbtHarm(1);
}
}
catch (e) { }
},
function () {
if (!CBT.on)
return false;
if (CBT.gcd > 0 || CBT.move && CBT.move.kind !== "dodge")
return true;
var W = cbtWeapon(), f = cbtPick(W.ranged ? W.reach + 4 : W.reach + cbtLungeMax() + 1);
var cool = W.ranged ? Math.max(0.3, Math.min(1.6, W.cool)) : Math.max(0.38, Math.min(1.1, W.cool * 0.9));
CBT.gcd = cool;
if (CBT.t - CBT.comboT < 1.3)
CBT.combo = CBT.combo % 3 + 1;
else
CBT.combo = 1;
CBT.comboT = CBT.t;
var mult = CBT.combo === 3 ? 1.5 : 1, big = CBT.combo === 3;
if (!f) {
cbtSwingFx(W, big);
return true;
}
var P = camera.position, dx = f.x - P.x, dz = f.z - P.z, d = Math.hypot(dx, dz);
var go = function () { cbtTurnTo(f.x, f.z, 1); cbtBlow(f, W, mult, big); };
if (!W.ranged && d > W.reach * 0.9 + (f.r || 0.6) * 0.5) {
var dist = d - (W.reach * 0.7 + (f.r || 0.6) * 0.5);
if (dist > cbtLungeMax()) {
cbtSwingFx(W, big);
cbtTurnTo(f.x, f.z, 0.5);
return true;
}
cbtGo("lunge", dx, dz, dist, Math.max(0.12, Math.min(0.3, dist / 22)), go, f);
cbtBurst(P.x, P.y - 1.6, P.z, 0xD8C8B0, 4, 1.5, 0.4, 0.22, { flat: 1 });
}
else
go();
return true;
},
function (f, W, mult, big) {
var E = CBT_ELEM[W.elem] || CBT_ELEM.steel;
cbtSwingFx(W, big);
CBT.comboMult = mult;
CBT.native = 1;
try {
var B = f.ref, done = false;
if (B && typeof DGB !== "undefined" && DGB.on.indexOf(B) >= 0 && typeof dgbStrike === "function") {
var hp0 = B.hp;
DGB.cool = 0;
dgbStrike(B);
done = true;
var dealt = Math.round(hp0 - B.hp);
if (dealt > 0) {
cbtImpact(f.x, cbtChestOf(f), f.z, W.elem, big || CBT.lastCrit);
cbtFloatText(String(dealt), { x: f.x, y: cbtChestOf(f), z: f.z }, CBT.lastCrit ? "#FFD86A" : "#FFFFFF", CBT.lastCrit ? 1.25 : 1, CBT.lastCrit);
CBT.fury = Math.min(100, CBT.fury + (big ? 10 : 6));
}
}
else if (WLD.on === "delve" && f.delve) {
try {
if (SGA.delve)
SGA.delve.cool = 0;
}
catch (e) { }
var hpD = f.hp ? f.hp() : 0;
if (typeof sgaDlvAttack === "function")
sgaDlvAttack();
else if (typeof sgaDlvStrike === "function")
sgaDlvStrike();
var lost = hpD - (f.hp ? f.hp() : 0);
done = true;
if (lost > 0) {
cbtImpact(f.x, cbtChestOf(f), f.z, W.elem, big || CBT.lastCrit);
CBT.fury = Math.min(100, CBT.fury + (big ? 10 : 6));
}
}
if (!done) {
var r = cbtRoll(mult);
if (W.ranged) {
var P = camera.position, F = cbtFwd();
cbtProj(P.x + F.x * 0.6, P.y - 0.35, P.z + F.z * 0.6, f, W.cls === "gun" ? 90 : W.cls === "star" ? 70 : 45, E.col, function () { cbtDeal(f, r, { W: W }); });
}
else
cbtDeal(f, r, { W: W, big: big });
}
}
catch (e) {
cbtWarn("blow", e);
}
CBT.native = 0;
CBT.comboMult = 1;
cbtMasteryXp(W.cls, 1);
if (cbtVR() && CBT.combo === 3)
setTimeout(function () { cbtNextReady(); }, 180);
},
function (dt) {
for (var i = CBT.proj.length - 1; i >= 0; i--) {
var p = CBT.proj[i];
p.t += dt;
var tx, ty, tz;
if (p.f) {
tx = p.f.x;
ty = cbtChestOf(p.f);
tz = p.f.z;
if (p.t > 0.05 && p.key) {
var L = cbtFoes(60);
var g = null;
for (var j = 0; j < L.length; j++)
if (L[j].key === p.key) {
g = L[j];
break;
}
if (g) {
p.f = g;
tx = g.x;
ty = cbtChestOf(g);
tz = g.z;
}
else if (p.f.dead && p.f.dead()) {
CBT.proj.splice(i, 1);
continue;
}
}
}
else {
tx = p.to.x;
ty = p.to.y;
tz = p.to.z;
}
var dx = tx - p.x, dy = ty - p.y, dz = tz - p.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001, s = p.spd * dt;
if (d <= Math.max(0.6, s) || p.t > 2.5) {
CBT.proj.splice(i, 1);
if (p.onHit)
try {
p.onHit();
}
catch (e) {
cbtWarn("missile", e);
}
else
cbtBurst(tx, ty, tz, p.col, 5, 2, 0.35, 0.2);
continue;
}
p.x += dx / d * s;
p.y += dy / d * s;
p.z += dz / d * s;
if (CBT_FX.pts) {
cbtTrail(p.x, p.y, p.z, p.col, 0.42, 0.18);
if (!cbtLite())
cbtTrail(p.x - dx / d * s * 0.5, p.y - dy / d * s * 0.5, p.z - dz / d * s * 0.5, p.col, 0.28, 0.3);
}
}
},
function (i) {
var W = cbtWeapon(), A = CBT_CLASSES[W.cls].abil[i], L = cbtLevel(), cd = Math.max(0, (CBT.cd[A.id] || 0) - CBT.t);
var under = cbtUnder(W) && !W.bare;
return { W: W, A: A, lockLv: L < A.lv ? A.lv : 0, under: under, cd: cd, cdMax: A.cd * (1 - 0.02 * cbtSk("arc")), fury: !!A.fury && CBT.fury < 100,
ready: L >= A.lv && !under && cd <= 0 && !(A.fury && CBT.fury < 100) };
},
function (i) {
if (!CBT.on)
return false;
var S = cbtAbilState(i), A = S.A, W = S.W;
if (S.lockLv) {
cbtSay("<b>" + cbtEsc(A.n) + "</b> opens at combat level " + A.lv + " (you are " + cbtLevel() + ").");
return true;
}
if (S.under) {
cbtSay("Your <b>" + cbtEsc(W.name) + "</b> needs combat level " + W.req + ": until then its abilities stay locked.");
return true;
}
if (S.cd > 0)
return true;
if (S.fury) {
cbtFloatText("Fury not full", null, "#F0A08A", 0.8);
return true;
}
if (CBT.move && CBT.move.kind !== "dodge")
return true;
var needs = /^(hit|multi|shot|blink|beam|volley)$/.test(A.t), f = cbtPick(A.t === "volley" || A.t === "shot" || A.t === "beam" || A.t === "zone" || A.ranged ? (A.rng || W.reach + 6) : Math.max(W.reach + cbtLungeMax() + 1, (A.dist || 0) + 2));
if (needs && !f) {
cbtFloatText("No foe in front of you", null, "#F0D0A0", 0.8);
return true;
}
CBT.cd[A.id] = CBT.t + S.cdMax;
if (A.fury)
CBT.fury = 0;
CBT.gcd = Math.max(CBT.gcd, 0.35);
cbtMasteryXp(W.cls, 3);
cbtTone(300 + i * 90, 0.08);
try {
cbtRun(A, W, f);
}
catch (e) {
cbtWarn("ability " + A.id, e);
}
return true;
},
function (A, W, f) {
var P = camera.position, F = cbtFwd(), E = CBT_ELEM[W.elem] || CBT_ELEM.steel, col = E.col, feet = P.y - 1.72;
var opt = { W: W, ab: 1, stun: A.stun, slow: A.slow, push: A.push, dot: A.dot, bleed: A.bleed };
var deal = function (o, m, sure) { var d = cbtDeal(o, A.spell ? cbtSpellRoll(m || A.m) : cbtRoll(m || A.m, sure), opt); if (A.drain && d > 0)
cbtHeal(Math.round(d * A.drain)); return d; };
var melee = function (o, go) {
var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz), want = W.reach * 0.85 + (o.r || 0.6) * 0.5;
if (!W.ranged && d > want) {
var dist = Math.min(d - want * 0.8, cbtLungeMax() + 1);
cbtGo("lunge", dx, dz, dist, Math.max(0.12, Math.min(0.3, dist / 22)), function () { cbtTurnTo(o.x, o.z, 1); go(); }, o);
}
else {
cbtTurnTo(o.x, o.z, 1);
go();
}
};
var pulse = function (n, gap, fn) { for (var k = 0; k < n; k++)
(function (k) { setTimeout(function () { if (CBT.on)
try {
fn(k);
}
catch (e) { } }, k * gap * 1000); })(k); };
if (A.t === "hit")
melee(f, function () { cbtSlash(col, 1, true); deal(f); });
else if (A.t === "arc") {
cbtSlash(col, 1, true);
if (A.rng > 6) {
for (var s = 1; s <= Math.round(A.rng / 1.5); s++)
(function (s) { setTimeout(function () { cbtBurst(P.x + F.x * s * 1.5, feet + 0.1, P.z + F.z * s * 1.5, col, 6, 3, 0.5, 0.28, { up: 2, col2: E.col2 }); }, s * 35); })(s);
}
cbtInCone(A.rng || W.reach + 0.8, A.ang || 1).forEach(function (o) { deal(o); });
}
else if (A.t === "around") {
pulse(A.pulses || 1, A.gap || 0.2, function (k) {
var Q = camera.position;
cbtRing(Q.x, Q.y - 1.72, Q.z, col, 0.4, A.rad, 0.5, 0.6);
cbtBurst(Q.x, Q.y - 1.2, Q.z, col, 16, A.rad * 2, 0.45, 0.28, { flat: 1, col2: E.col2 });
if (k % 2 === 0)
cbtSlash(col, k % 4 ? -1 : 1, true);
cbtNear(Q.x, Q.z, A.rad).forEach(function (o) { deal(o); });
});
}
else if (A.t === "dash" || A.t === "leap") {
var dx = F.x, dz = F.z, dist = A.dist || 6;
if (f) {
dx = f.x - P.x;
dz = f.z - P.z;
dist = Math.min(A.dist || 6, Math.max(0, Math.hypot(dx, dz) - (W.reach * 0.7 + (f.r || 0.6) * 0.5)));
}
cbtBurst(P.x, feet + 0.1, P.z, 0xD8C8B0, 8, 2, 0.5, 0.25, { flat: 1 });
cbtGo("dash", dx, dz, dist, Math.max(0.14, Math.min(0.35, dist / 26)), function () {
var Q = camera.position;
if (A.t === "leap") {
cbtRing(Q.x, Q.y - 1.72, Q.z, col, 0.3, A.rad, 0.5, 0.6);
cbtBurst(Q.x, Q.y - 1.5, Q.z, col, 20, 6, 0.5, 0.3, { flat: 1, col2: E.col2 });
cbtNear(Q.x, Q.z, A.rad).forEach(function (o) { deal(o); });
}
else {
cbtSlash(col, 1, true);
var hit = cbtInCone(W.reach + 1, 0.9);
if (f && hit.indexOf(f) < 0 && Math.hypot(f.x - Q.x, f.z - Q.z) < W.reach + 2)
hit.push(f);
hit.forEach(function (o) { deal(o); });
}
}, f);
}
else if (A.t === "multi") {
var go = function () {
pulse(A.n2, A.gap, function (k) {
if (f.dead && f.dead())
return;
if (A.ranged || W.ranged) {
var Q = camera.position, G = cbtFwd();
cbtProj(Q.x + G.x * 0.6, Q.y - 0.35, Q.z + G.z * 0.6, f, 90, col, function () { deal(f); });
}
else {
cbtSlash(col, k % 2 ? -1 : 1, k === A.n2 - 1);
deal(f);
}
});
};
if (A.ranged || W.ranged) {
cbtTurnTo(f.x, f.z, 1);
go();
}
else
melee(f, go);
}
else if (A.t === "shot") {
cbtTurnTo(f.x, f.z, 1);
cbtProj(P.x + F.x * 0.6, P.y - 0.35, P.z + F.z * 0.6, f, A.spd || 50, col, function () { deal(f); cbtBurst(f.x, cbtChestOf(f), f.z, E.col2, 10, 4, 0.5, 0.3); });
}
else if (A.t === "volley") {
var list = cbtInCone(A.rng || 20, 0.8).slice(0, A.n2 || 3);
if (!list.length && f)
list = [f];
list.forEach(function (o, k) { setTimeout(function () { var Q = camera.position, G = cbtFwd(); cbtProj(Q.x + G.x * 0.6, Q.y - 0.3, Q.z + G.z * 0.6, o, 48, col, function () { deal(o); }); }, k * 70); });
}
else if (A.t === "zone") {
var at = f ? { x: f.x, z: f.z, y: cbtFeetOf(f) } : { x: P.x + F.x * 7, z: P.z + F.z * 7, y: feet };
cbtRing(at.x, at.y, at.z, col, A.rad, A.rad, (A.ticks || 1) * (A.gap || 0.3) + 0.4, 0.35);
pulse(A.ticks || 1, A.gap || 0.3, function () {
for (var q = 0; q < (cbtLite() ? 3 : 7); q++) {
var a = Math.random() * Math.PI * 2, r = A.rad * Math.sqrt(Math.random());
cbtSpark(at.x + Math.cos(a) * r, at.y + 6, at.z + Math.sin(a) * r, col, 0, -18, 0, 0.4, 0.32, 0, 0);
}
cbtBurst(at.x, at.y + 0.3, at.z, col, 10, A.rad, 0.45, 0.26, { flat: 1, col2: E.col2 });
cbtNear(at.x, at.z, A.rad).forEach(function (o) { deal(o); });
});
}
else if (A.t === "buff") {
var dur = A.dur || 6;
if (A.buff === "absorb") {
CBT.absorb = A.v;
CBT.absorbT = CBT.t + dur;
}
else if (A.buff === "smoke") {
cbtFoes(14).forEach(function (o) { try {
if (o.calm)
o.calm(dur);
}
catch (e) { } });
cbtBurst(P.x, feet + 0.8, P.z, 0xB8B8B8, 30, 2, 1.6, 0.6, { drag: 1.5 });
cbtDodge(-1, 0);
}
else
CBT.buffs[A.buff] = { until: CBT.t + dur, v: A.v };
if (A.mend)
cbtHeal(A.mend);
if (A.slowAll)
cbtFoes(6).forEach(function (o) { try {
if (o.hold)
o.hold(0.8);
}
catch (e) { } });
cbtRise(P.x, feet, P.z, col, 30, 0.7, 2.4, 1.1, 0.26);
cbtRing(P.x, feet, P.z, col, 0.3, 1.8, 0.7, 0.5);
if (A.roll && A.buff !== "smoke")
cbtDodge();
}
else if (A.t === "blink") {
var bx = f.x - P.x, bz = f.z - P.z, bd = Math.hypot(bx, bz) || 1, nx = f.x + bx / bd * 1.3, nz = f.z + bz / bd * 1.3;
cbtBurst(P.x, P.y - 0.9, P.z, 0x6A4A9A, 18, 2, 0.6, 0.3);
if (cbtFree(nx, nz) && bd < 12) {
P.x = nx;
P.z = nz;
cbtBurst(nx, P.y - 0.9, nz, 0x6A4A9A, 18, 2, 0.6, 0.3);
cbtTurnTo(f.x, f.z, 1);
deal(f, A.m, true);
}
else
melee(f, function () { deal(f, A.m, true); });
}
else if (A.t === "back") {
var tx = f ? f.x : P.x + F.x * 10, tz = f ? f.z : P.z + F.z * 10;
cbtGo("dodge", P.x - tx, P.z - tz, A.dist || 6, 0.3, function () { if (f) {
var Q = camera.position, G = cbtFwd();
cbtTurnTo(f.x, f.z, 1);
cbtProj(Q.x + G.x * 0.6, Q.y - 0.35, Q.z + G.z * 0.6, f, 55, col, function () { deal(f); });
} }, f);
CBT.iframe = 0.35;
CBT.perfect = 0;
}
else if (A.t === "beam") {
pulse(A.ticks || 6, A.gap || 0.2, function () {
if (f.dead && f.dead())
return;
var Q = camera.position, d = Math.hypot(f.x - Q.x, f.z - Q.z);
if (d > 24)
return;
var y0 = Q.y - 0.35, y1 = cbtChestOf(f), n = cbtLite() ? 6 : 14;
for (var k = 0; k < n; k++) {
var u = k / n;
cbtSpark(Q.x + (f.x - Q.x) * u, y0 + (y1 - y0) * u, Q.z + (f.z - Q.z) * u, k % 3 ? col : E.col2, 0, 0.2, 0, 0.35, 0.34, 0, 1);
}
deal(f);
});
}
if (A.buffAfter)
CBT.buffs[A.buffAfter.buff] = { until: CBT.t + A.buffAfter.dur, v: A.buffAfter.v };
},
function (dt) {
for (var i = CBT.dots.length - 1; i >= 0; i--) {
var D = CBT.dots[i];
D.t -= dt;
D.tick -= dt;
if (D.t <= 0 || (D.f.dead && D.f.dead())) {
CBT.dots.splice(i, 1);
continue;
}
if (D.tick <= 0) {
D.tick = 0.5;
var L = cbtFoes(80), g = null;
for (var j = 0; j < L.length; j++)
if (L[j].key === D.key) {
g = L[j];
break;
}
if (!g) {
CBT.dots.splice(i, 1);
continue;
}
var d = Math.max(1, Math.round(D.dps * 0.5));
try {
g.hit(d);
}
catch (e) { }
var cy = cbtChestOf(g);
cbtBurst(g.x, cy, g.z, D.col, 4, 1.4, 0.5, 0.2, { up: 1 });
cbtFloatText(String(d), { x: g.x, y: cy, z: g.z }, "#C8F0A0", 0.75);
}
}
},
function (o) {
try {
o = o || {};
var L = cbtLevel(), lv = Math.max(1, +o.lv || 1);
var k = lv < L - 8 ? 0.25 : lv < L - 4 ? 0.6 : lv > L + 3 ? 1.3 : 1;
var xp = (lv * 14 + 10) * (o.boss ? 4 : 1) * k;
var p = cbtP();
p.kills++;
cbtMasteryXp(cbtWeapon().cls, o.boss ? 40 : 10);
if (o.at) {
cbtImpact(o.at.x, o.at.y, o.at.z, cbtWeapon().elem, true);
}
cbtGain(xp, "kill");
CBT.fury = Math.min(100, CBT.fury + 8);
}
catch (e) {
cbtWarn("killed", e);
}
},
function () {
if (CBT.hud || typeof document === "undefined" || !document.body)
return !!CBT.hud;
var st = document.createElement("style");
st.textContent = CBT_CSS;
document.head.appendChild(st);
var h = document.createElement("div");
h.id = "cbt-hud";
h.innerHTML = "<div class='row'><span class='lv' data-cbt='book'>⚔️ Lv <i>1</i></span>" +
"<span title='Vigour'>❤</span><span class='bar vg'><b style='background:#8FDCA4'></b></span>" +
"<span title='Stamina: a roll, and a long fight'>⚡</span><span class='bar sm'><b style='background:#E8D27A'></b></span>" +
"<span title='Fury: a full bar lets loose the fourth ability'>🔥</span><span class='bar fy'><b style='background:#F08A5A'></b></span></div>" +
"<div class='row abs'></div><div class='wpn'></div><div class='xp'><b></b></div>" +
"<div class='chip' data-cbt='book' style='display:none'></div>";
document.body.appendChild(h);
CBT.hud = h;
var abs = h.querySelector(".abs");
for (var i = 0; i < 4; i++) {
var b = document.createElement("div");
b.className = "ab";
b.setAttribute("data-cbt", "a" + i);
b.innerHTML = "<span class='k'>" + (i + 1) + "</span><span class='i'></span><span class='cd' style='--p:0%'></span><span class='lk' style='display:none'></span><span class='s'></span>";
abs.appendChild(b);
}
h.addEventListener("pointerdown", function (e) {
var t = e.target.closest && e.target.closest("[data-cbt]");
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var k = t.getAttribute("data-cbt");
if (k === "book")
cbtBook(true);
else if (k.charAt(0) === "s")
cbtSpell(+k.slice(1));
else
cbtAbility(+k.slice(1));
});
var tg = document.createElement("div");
tg.id = "cbt-tgt";
tg.innerHTML = "<div class='nm'></div><div class='bar'><b></b></div>";
document.body.appendChild(tg);
CBT.tgtEl = tg;
var t = document.createElement("div");
t.id = "cbt-toast";
document.body.appendChild(t);
CBT.toastEl = t;
var pd = document.createElement("div");
pd.id = "cbt-pad";
var at = [[86, 92], [134, 128], [150, 76], [104, 42]];
var html = "<div class='st' data-cbt='st'>⚔️</div><div class='dg' data-cbt='dg'>🌀</div><div class='lk' data-cbt='lk'>🎯</div><div class='mg' data-cbt='mg' title='Battle magic'>✨</div>";
for (var j = 0; j < 4; j++)
html += "<div class='a' data-cbt='a" + j + "' style='right:" + at[j][0] + "px;bottom:" + at[j][1] + "px'><span class='i'></span><span class='cd' style='--p:0%'></span></div>";
pd.innerHTML = html;
document.body.appendChild(pd);
CBT.phone = pd;
pd.addEventListener("pointerdown", function (e) {
var t = e.target.closest && e.target.closest("[data-cbt]");
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var k = t.getAttribute("data-cbt");
if (k === "st")
cbtStrike();
else if (k === "dg")
cbtDodge();
else if (k === "lk")
cbtLockNext();
else if (k === "mg")
cbtPadMagic(!CBT.padMagic);
else {
var n = +k.slice(1);
if (CBT.padMagic)
cbtSpell(n);
else
cbtAbility(n);
}
});
if (typeof PS_KEEP !== "undefined") {
PS_KEEP["cbt-pad"] = 1;
PS_KEEP["cbt-hud"] = 1;
}
return true;
},
function (dt, f) {
if (!cbtHudMake())
return;
var H = CBT.hud, fight = CBT.on && CBT.eng > 0, show = CBT.on;
var disp = show ? "flex" : "none";
if (H.style.display !== disp)
H.style.display = disp;
document.body.classList.toggle("cbt-on", CBT.on);
document.body.classList.toggle("cbt-fight", fight);
var pd = CBT.phone, pshow = CBT.on && fight && cbtTouch() && !cbtVR() ? "block" : "none";
if (pd.style.display !== pshow) {
pd.style.display = pshow;
document.body.classList.toggle("cbt-touch", pshow === "block");
}
if (!show) {
if (CBT.tgtEl.style.display !== "none")
CBT.tgtEl.style.display = "none";
return;
}
CBT.hudT = (CBT.hudT || 0) - dt;
if (CBT.hudT > 0)
return;
CBT.hudT = 0.1;
var L = cbtLevel(), p = cbtP(), W = cbtWeapon();
var rows = H.querySelectorAll(".row"), chip = H.querySelector(".chip");
var rd = fight ? "flex" : "none";
for (var r = 0; r < rows.length; r++)
if (rows[r].style.display !== rd)
rows[r].style.display = rd;
var wp = H.querySelector(".wpn"), xp = H.querySelector(".xp");
wp.style.display = fight ? "block" : "none";
xp.style.display = fight ? "block" : "none";
chip.style.display = fight ? "none" : "block";
var free = cbtPointsFree();
var ch = "⚔️ Combat Lv " + L + (free ? " · " + free + " point" + (free > 1 ? "s" : "") + " to spend" : "") + " · danger here";
if (chip.textContent !== ch)
chip.textContent = ch;
if (!fight) {
if (CBT.tgtEl.style.display !== "none")
CBT.tgtEl.style.display = "none";
return;
}
var lv = H.querySelector(".lv i");
if (lv.textContent !== String(L) + (free ? " +" : ""))
lv.textContent = String(L) + (free ? " +" : "");
var V = cbtVig();
cbtSetW(H.querySelector(".vg b"), V.hp / V.max);
H.querySelector(".vg b").style.background = V.hp / V.max > 0.5 ? "#8FDCA4" : V.hp / V.max > 0.25 ? "#F2D684" : "#F28A84";
cbtSetW(H.querySelector(".sm b"), CBT.stam / cbtStamMax());
cbtSetW(H.querySelector(".fy b"), CBT.fury / 100);
var x0 = cbtXpFor(L), x1 = cbtXpFor(Math.min(CBT_MAX, L + 1));
cbtSetW(H.querySelector(".xp b"), L >= CBT_MAX ? 1 : (p.xp - x0) / Math.max(1, x1 - x0));
var C = CBT_CLASSES[W.cls], wl = C.i + " " + W.name + " · " + C.n + (cbtUnder(W) && !W.bare ? " · <span style='color:#F0A08A'>needs combat level " + W.req + ": half strength, abilities locked</span>" : W.req > 1 ? " · level " + W.req : "") +
(CBT.combo > 1 && CBT.t - CBT.comboT < 1.3 ? " · <span style='color:#FFD98A'>combo " + CBT.combo + "</span>" : "");
if (wp.dataset.h !== wl) {
wp.dataset.h = wl;
wp.innerHTML = wl;
}
var abs = H.querySelectorAll(".ab"), pads = CBT.phone.querySelectorAll(".a");
for (var i = 0; i < 4; i++) {
var S = cbtAbilState(i), b = abs[i], A = S.A;
var ik = A.i;
if (b.dataset.i !== ik) {
b.dataset.i = ik;
b.querySelector(".i").textContent = ik;
pads[i].querySelector(".i").textContent = ik;
b.title = A.n + " (" + (i + 1) + "): " + A.d;
}
var pc = S.cd > 0 ? Math.round(S.cd / S.cdMax * 100) + "%" : "0%";
b.querySelector(".cd").style.setProperty("--p", pc);
pads[i].querySelector(".cd").style.setProperty("--p", pc);
var lk = b.querySelector(".lk"), lt = S.lockLv ? "Lv " + S.lockLv : S.under ? "🔒" : S.fury ? "Fury" : "";
if (lk.textContent !== lt) {
lk.textContent = lt;
lk.style.display = lt ? "flex" : "none";
}
var sec = S.cd > 0 ? String(Math.ceil(S.cd)) : "";
var se = b.querySelector(".s");
if (se.textContent !== sec)
se.textContent = sec;
b.classList.toggle("rdy", S.ready);
pads[i].classList.toggle("no", !S.ready);
}
var T = CBT.tgtEl;
if (f) {
var hp = f.hp ? f.hp() : (f.ref && f.ref.hp !== undefined ? f.ref.hp : null), mx = +f.max || (f.ref && f.ref.max) || null;
var nm = (CBT.lock ? "🎯 " : "") + cbtEsc(String(f.name || "A foe").replace(/^(a|an|the) /i, function (s) { return s.charAt(0).toUpperCase() + s.slice(1); })) + (f.kind === "pvp" ? "" : " · Lv " + cbtFoeLv(f));
var ne = T.querySelector(".nm");
if (ne.innerHTML !== nm)
ne.innerHTML = nm;
var bb = T.querySelector(".bar");
if (hp != null && mx) {
bb.style.display = "block";
cbtSetW(bb.querySelector("b"), hp / mx);
}
else
bb.style.display = "none";
if (T.style.display !== "block")
T.style.display = "block";
}
else if (T.style.display !== "none")
T.style.display = "none";
},
function (open) {
if (!cbtHudMake())
return;
var B = CBT.panel;
if (!B) {
B = CBT.panel = document.createElement("div");
B.id = "cbt-book";
B.innerHTML = "<div class='in'></div>";
document.body.appendChild(B);
B.addEventListener("click", function (e) {
if (e.target === B) {
cbtBook(false);
return;
}
var t = e.target.closest && e.target.closest("[data-cb]");
if (!t)
return;
var k = t.getAttribute("data-cb");
if (k === "x")
cbtBook(false);
else if (k === "reset") {
cbtUnlearn();
cbtBookPaint();
}
else if (/^sp:/.test(k)) {
cbtSpend(k.slice(3));
cbtBookPaint();
cbtSaveSoon(3);
}
else if (/^mg:/.test(k)) {
cbtMagicPick(k.slice(3));
cbtBookPaint();
}
else if (/^mp:/.test(k)) {
var mp = k.split(":");
cbtMagicPut(mp.slice(2).join(":"), mp[1]);
cbtBookPaint();
}
else if (/^mx:/.test(k)) {
cbtMagicPut(null, k.slice(3));
cbtBookPaint();
}
});
B.addEventListener("keydown", function (e) { e.stopPropagation(); });
}
CBT.bookOpen = !!open;
B.style.display = open ? "flex" : "none";
if (open) {
cbtBookPaint();
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
}
},
function () {
var B = CBT.panel;
if (!B)
return;
var p = cbtP(), L = cbtLevel(), W = cbtWeapon(), free = cbtPointsFree(), x0 = cbtXpFor(L), x1 = cbtXpFor(Math.min(CBT_MAX, L + 1));
var h = "<button class='x' data-cb='x'>✕</button><h3>⚔️ Combat</h3>";
h += "<div>Combat level <b>" + L + "</b> of " + CBT_MAX + " · " + p.xp.toLocaleString() + " XP" + (L < CBT_MAX ? " · " + (x1 - p.xp).toLocaleString() + " to level " + (L + 1) : "") + "</div>";
h += "<div style='opacity:.8;font-size:12.5px'>Foes beaten: " + p.kills.toLocaleString() + ". Your blows land " + Math.round((cbtLvMult() - 1) * 100) + "% harder from your level; you shrug off " + Math.round(cbtToughBase() * 100) + "% of every blow.</div>";
if (CBT.srv === "missing")
h += "<div style='opacity:.7;font-size:12px;margin-top:4px'>Kept on this device for now: once the city's next update is in, it is kept on your account.</div>";
if (!CBT.xpOn)
h += "<div style='color:#F0C08A;font-size:12px;margin-top:4px'>The Keeper has paused combat experience for now. Fighting works as ever.</div>";
h += "<h4>Skills · " + (free ? "<b style='color:#FFD98A'>" + free + " point" + (free > 1 ? "s" : "") + " to spend</b>" : "a point at every level") + "</h4>";
CBT_SKILLS.forEach(function (S) {
var n = cbtSk(S.k);
h += "<div class='sk'><span class='nm'>" + S.i + " " + S.n + "</span><b style='width:42px'>" + n + "/" + CBT_SKILL_MAX + "</b><span class='pp'>" + cbtEsc(S.per) + "</span><button data-cb='sp:" + S.k + "'" + (free && n < CBT_SKILL_MAX ? "" : " disabled") + ">+</button></div>";
});
h += "<div style='margin-top:4px'><button data-cb='reset'" + (cbtPointsSpent() ? "" : " disabled") + ">Take all points back</button> <span style='opacity:.7;font-size:12px'>(free, any time)</span></div>";
h += "<h4>In your hand</h4><div>" + CBT_CLASSES[W.cls].i + " <b>" + cbtEsc(W.name) + "</b> · " + CBT_CLASSES[W.cls].n + " · " + (CBT_ELEM[W.elem] || CBT_ELEM.steel).n +
" · needs combat level " + W.req + (cbtUnder(W) && !W.bare ? " <span style='color:#F0A08A'>(you are " + L + ": half strength, abilities locked)</span>" : "") + "</div>";
var own = [];
try {
if (typeof bwOwned === "function")
own = bwOwned();
}
catch (e) { }
if (own.length) {
h += "<h4>Your weapons and what they need</h4><table>" + own.slice(0, 60).map(function (q) {
var k = q.a.slice(3), A = BW_ARMS[k];
if (!A)
return "";
var w = { key: q.a, name: A.name, dmg: +A.dmg || 10, cool: +A.cool || 0.6, kind: A.kind || "melee", held: String(A.held || ""), p: String(A.p || ""), A: A, era: A.era || "", gift: A.wgGift || "" };
w.cls = cbtClassOf(w);
var rq = cbtReqOf(w);
return "<tr><td>" + CBT_CLASSES[w.cls].i + " " + cbtEsc(A.name) + "</td><td>" + CBT_CLASSES[w.cls].n + "</td><td style='color:" + (rq > L ? "#F0A08A" : "#9AE0A8") + "'>Lv " + rq + "</td></tr>";
}).join("") + "</table>";
}
h += "<h4>Every kind of weapon, and its abilities (keys 1 to 4)</h4><div class='cls'>";
CBT_CLASS_ORDER.forEach(function (c) {
var C = CBT_CLASSES[c];
h += "<div class='cl" + (c === W.cls ? " me" : "") + "'><b>" + C.i + " " + C.n + "</b> <span style='opacity:.7;font-size:12px'>· " + cbtEsc(C.about) + " · mastery " + cbtMastery(c) + "/10</span>" +
C.abil.map(function (A, i) { return "<div class='abl'>" + (i + 1) + ". " + A.i + " <b>" + cbtEsc(A.n) + "</b> <span style='opacity:.65'>(level " + A.lv + (A.fury ? ", full Fury" : "") + ", " + A.cd + " s)</span> " + cbtEsc(A.d) + (L < A.lv ? " 🔒" : "") + "</div>"; }).join("") + "</div>";
});
h += "</div>";
try {
h += cbtMagicBookHtml();
}
catch (e) {
cbtWarn("magic book", e);
}
h += "<h4>How to fight</h4><div style='font-size:12.5px'>" +
"<b>Computer:</b> left click, F or E strikes (three in a row, and the third lands harder). A foe a few steps off: strike and you lunge to it. " +
"1 2 3 4 your weapon's abilities, and Shift with 1 2 3 4 your four battle spells (your powers move to 5 to 0 while a fight is on). Alt, or a quick double-tap of W A S D, rolls you clear: for a moment nothing touches you, " +
"and a roll just as a beast winds up is a perfect dodge (Fury and stamina back). The middle mouse button locks on to a foe, and again to the next.<br>" +
"<b>Phone:</b> ⚔️ strike, the four round buttons are your abilities (✨ turns them to your battle spells and back), 🌀 rolls, 🎯 locks on.<br>" +
"<b>Controller:</b> Y strikes, the d-pad's four ways are the four abilities (hold LB and they are your battle spells), RT rolls.<br>" +
"<b>Quest:</b> the trigger strikes, the grip rolls, and every third blow in a run lets loose your next ready ability (or, with mana to spare, your next battle spell).</div>";
h += "<h4>Where it is on</h4><div style='font-size:12.5px'>" + CBT_WHERE.map(function (s) { return "• " + cbtEsc(s); }).join("<br>") +
"<br><b>Off</b> (nothing shown, nothing taken from your keys): " + cbtEsc(CBT_SAFE) + "</div>";
B.querySelector(".in").innerHTML = h;
},
function () {
if (!CBT.on)
return;
var list = cbtFoes(30);
if (!list.length) {
CBT.lock = null;
return;
}
var i = -1;
for (var j = 0; j < list.length; j++)
if (list[j].key === CBT.lock) {
i = j;
break;
}
if (i >= 0 && list.length === 1) {
CBT.lock = null;
cbtFloatText("Lock off", null, "#E8D8C0", 0.8);
return;
}
var f = list[(i + 1) % list.length];
CBT.lock = f.key;
cbtTurnTo(f.x, f.z, 1);
cbtFloatText("🎯 " + String(f.name || "foe"), null, "#FFC89A", 0.9);
},
function (dt) {
dt = Math.min(Math.max(dt || 0, 0), 0.1);
CBT.t += dt;
if (CBT.srv === "" || (CBT.srv === "later" && CBT.t > (CBT.retryAt || 0)))
cbtLoad();
CBT.zt = (CBT.zt || 0) - dt;
if (CBT.zt <= 0) {
CBT.zt = 0.25;
var z = null;
try {
z = cbtZoneNow();
}
catch (e) {
cbtWarn("zone", e);
}
var on = !!z;
CBT.zone = z;
if (on !== CBT.on) {
CBT.on = on;
cbtZoneChange(on);
}
}
if (CBT.gcd > 0)
CBT.gcd -= dt;
if (CBT.iframe > 0)
CBT.iframe -= dt;
var sm = cbtStamMax();
if (CBT.stam < sm && !(CBT.move && CBT.move.kind === "dodge"))
CBT.stam = Math.min(sm, CBT.stam + dt * (CBT.eng ? 18 : 30));
if (!CBT.eng && CBT.fury > 0)
CBT.fury = Math.max(0, CBT.fury - dt * 4);
cbtMoveTick(dt);
cbtProjTick(dt);
cbtDotTick(dt);
cbtFxTick(dt);
cbtFloatTick(dt);
var f = null;
if (CBT.on) {
CBT.pt = (CBT.pt || 0) - dt;
if (CBT.pt <= 0) {
CBT.pt = 0.08;
CBT.near = cbtFoes(25).length;
CBT.pick = cbtPick();
}
f = CBT.pick;
CBT.eng = (CBT.near > 0 || CBT.t - CBT.fought < 8) ? 1 : 0;
var W = cbtWeapon();
if (W.key !== CBT.lastW) {
CBT.lastW = W.key;
if (cbtUnder(W) && !W.bare && !CBT.warnedW[W.key]) {
CBT.warnedW[W.key] = 1;
cbtToast("Your <b>" + cbtEsc(W.name) + "</b> needs combat level <b>" + W.req + "</b> (you are " + cbtLevel() + "). Until then it strikes at half strength, and its abilities stay locked.");
}
}
try {
if (typeof DGB !== "undefined" && WLD.w) {
var base = WLD.w.base;
DGB.on.forEach(function (B) {
if (B.st === "dead")
return;
if (B.wind > 0 && !B.cbtTel) {
B.cbtTel = 1;
cbtRing(base + B.x, B.y, B.z, 0xE85A4A, 0.3, B.k.reach + (B.k.big ? 0.6 : 0), 0.55, 0.5);
}
else if (B.wind <= 0)
B.cbtTel = 0;
});
}
}
catch (e) { }
}
else
CBT.eng = 0;
cbtMarkTick(dt, CBT.on && CBT.eng ? f : null);
if (CBT.dirty) {
CBT.saveT = (CBT.saveT || 30) - dt;
if (CBT.saveT <= 0)
cbtSave();
}
CBT.mt = (CBT.mt || 0) - dt;
if (CBT.mt <= 0) {
CBT.mt = 1;
cbtMenuPaint();
}
cbtHudTick(dt, f);
},
function () {
var p = cbtP(), known = cbtMagicKnown();
if (!Array.isArray(p.sl))
p.sl = [];
if (p.slFix) {
var fx = [];
for (var q = 0; q < 4; q++) {
var sid = p.sl[q];
fx.push(sid && CBT_MAGIC_BY[sid] && known.indexOf(sid) >= 0 && fx.indexOf(sid) < 0 ? sid : null);
}
return fx;
}
var out = p.sl.filter(function (id, i, a) { return !!CBT_MAGIC_BY[id] && known.indexOf(id) >= 0 && a.indexOf(id) === i; }).slice(0, 4);
for (var i = known.length - 1; i >= 0 && out.length < 4; i--)
if (CBT_MAGIC_BY[known[i]] && out.indexOf(known[i]) < 0)
out.push(known[i]);
while (out.length < 4)
out.push(null);
return out;
},
function (id, slot) {
slot = +slot;
if (!(slot >= 0 && slot < 4))
return;
if (id && (!CBT_MAGIC_BY[id] || !cbtMagicKnows(id)))
return;
var cur = cbtMagicChosen().slice(), j = id ? cur.indexOf(id) : -1;
if (j >= 0)
cur[j] = null;
cur[slot] = id || null;
var p = cbtP();
p.sl = cur;
p.slFix = true;
if (typeof save === "function")
try {
save();
}
catch (e) { }
},
function (id, how) {
var S = CBT_MAGIC_BY[id];
if (!S || cbtMagicKnows(id))
return false;
cbtMagicKnown().push(id);
var p = cbtP();
if (!Array.isArray(p.sl))
p.sl = [];
if (p.slFix) {
var ch0 = cbtMagicChosen(), e0 = ch0.indexOf(null);
if (e0 >= 0) {
ch0[e0] = id;
p.sl = ch0;
}
}
else if (p.sl.length < 4)
p.sl.push(id);
var P = camera.position, E = CBT_ELEM[S.elem] || CBT_ELEM.light;
try {
cbtRise(P.x, P.y - 1.7, P.z, E.col, cbtLite() ? 14 : 34, 0.8, 2.6, 1.2, 0.28);
cbtRing(P.x, P.y - 1.72, P.z, E.col, 0.3, 2.4, 0.8, 0.5);
}
catch (e) { }
cbtTone(660, 0.18);
setTimeout(function () { cbtTone(880, 0.22); }, 160);
cbtToast("📖 <b>" + cbtEsc(how || "A spell tome") + "</b>: you learn <b>" + S.i + " " + cbtEsc(S.n) + "</b>" + (cbtLevel() < S.lv ? " (cast from combat level " + S.lv + ")" : "") + ". " + cbtEsc(S.d) +
(cbtMagicChosen().indexOf(id) >= 0 ? (cbtTouch() ? " Ready under ✨." : " Ready on Shift+" + (cbtMagicChosen().indexOf(id) + 1) + ".") : " Ready it in the Combat book."));
cbtDirty();
cbtSaveSoon(3);
if (typeof save === "function")
try {
save();
}
catch (e) { }
return true;
},
function (foeLv, here) {
var L = cbtLevel(), cap = Math.max(4, Math.max(foeLv || 1, L) + 5), out = [];
CBT_MAGIC.forEach(function (S) {
if (cbtMagicKnows(S.id))
return;
if (CBT_TOME.on.some(function (T) { return T.id === S.id; }))
return;
if (S.w) {
if (S.w !== here)
return;
out.push({ S: S, wt: 4 });
return;
}
if (S.lv > cap)
return;
out.push({ S: S, wt: S.lv <= L + 1 ? 3 : 1 });
});
return out;
},
function (col) {
var g = new THREE.Group();
var cover = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.32), new THREE.MeshStandardMaterial({ color: 0x3A2418, roughness: 0.6, metalness: 0.1, emissive: col, emissiveIntensity: 0.18 }));
var pages = new THREE.Mesh(new THREE.BoxGeometry(0.39, 0.05, 0.29), new THREE.MeshStandardMaterial({ color: 0xEDE2C8, roughness: 0.9 }));
pages.position.y = 0.065;
g.add(cover);
g.add(pages);
var halo = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.62, 40), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
halo.rotation.x = -Math.PI / 2;
halo.position.y = -0.03;
g.add(halo);
g.userData.halo = halo;
return g;
},
function (S, x, y, z, how) {
if (!S || typeof THREE === "undefined" || typeof scene === "undefined")
return;
var E = CBT_ELEM[S.elem] || CBT_ELEM.light, m = cbtTomeMesh(E.col);
m.position.set(x, y + 0.35, z);
scene.add(m);
CBT_TOME.on.push({ id: S.id, m: m, x: x, y: y, z: z, t: 0, col: E.col, how: how, world: (typeof WLD !== "undefined" && WLD.on) || "" });
cbtBurst(x, y + 0.6, z, E.col, cbtLite() ? 10 : 22, 3, 0.7, 0.3, { up: 3 });
},
function (dt) {
var P = camera.position, w = (typeof WLD !== "undefined" && WLD.on) || "";
for (var i = CBT_TOME.on.length - 1; i >= 0; i--) {
var T = CBT_TOME.on[i];
T.t += dt;
if (T.world !== w || T.t > 240) {
cbtTomeGone(T);
CBT_TOME.on.splice(i, 1);
continue;
}
T.m.position.y = T.y + 0.35 + Math.sin(T.t * 2) * 0.06;
T.m.rotation.y += dt * 0.8;
var h = T.m.userData.halo;
if (h)
h.material.opacity = 0.25 + 0.12 * Math.sin(T.t * 1.6);
if (Math.random() < dt * (cbtLite() ? 2 : 5))
cbtSpark(T.x + (Math.random() - 0.5) * 0.5, T.y + 0.4, T.z + (Math.random() - 0.5) * 0.5, T.col, 0, 0.9, 0, 1.2, 0.16, 0, 0);
if (Math.hypot(P.x - T.x, P.z - T.z) < 1.8 && Math.abs(P.y - 1.72 - T.y) < 2.5) {
var S = CBT_MAGIC_BY[T.id];
cbtTomeGone(T);
CBT_TOME.on.splice(i, 1);
cbtLearnSpell(S.id, T.how);
}
}
if (CBT.on && !(CBT.eng > 0) && CBT.zone && CBT.zone.k !== "pvp") {
CBT_TOME.findT += dt;
if (CBT_TOME.findT >= CBT_TOME.next) {
CBT_TOME.findT = 0;
CBT_TOME.next = 360 + Math.random() * 360;
cbtTomeFind();
}
}
},
function () {
var S = cbtTomePick(cbtLevel() + 2);
if (!S)
return;
var P = camera.position, F = cbtFwd(), W = typeof WLD !== "undefined" && WLD.w;
for (var tries = 0; tries < 10; tries++) {
var a = Math.atan2(F.z, F.x) + (Math.random() - 0.5) * 1.4, r = 14 + Math.random() * 14, x = P.x + Math.cos(a) * r, z = P.z + Math.sin(a) * r, y = P.y - 1.72;
try {
if (W && W.ground) {
var gy = W.ground(x - W.base, z, P.y - 1.72);
if (gy == null || !isFinite(gy) || Math.abs(gy - (P.y - 1.72)) > 4)
continue;
y = gy;
}
}
catch (e) {
continue;
}
if (typeof cbtFree === "function" && !cbtFree(x, z))
continue;
cbtTomeDrop(S, x, y, z, S.w ? "A tome of " + S.wn : "A spell tome, found");
cbtToast("📖 Something glows on the ground ahead: <b>a spell tome</b>.");
return;
}
},
function (m) {
var L = cbtLevel(), base = 10 + 0.85 * (L - 1), crit = Math.random() < cbtCritChance() * 0.8;
var d = base * cbtLvMult() * (1 + 0.04 * cbtSk("arc")) * (m || 1) * (crit ? 1.6 : 1);
var B = CBT.buffs.might;
if (B && B.until > CBT.t)
d *= 1 + B.v * 0.5;
return { d: Math.max(1, Math.round(d)), crit: crit };
},
function (i) {
var id = cbtMagicChosen()[i], S = id && CBT_MAGIC_BY[id];
if (!S)
return { A: null, none: true, cd: 0, cdMax: 1, ready: false };
var L = cbtLevel(), cd = Math.max(0, (CBT.cd[S.id] || 0) - CBT.t), mana = CBT.mana == null ? cbtManaMax() : CBT.mana;
var cdMax = S.cd * (1 - 0.02 * cbtSk("arc"));
return { A: S, lockLv: L < S.lv ? S.lv : 0, cd: cd, cdMax: cdMax, low: mana < S.mana, ready: L >= S.lv && cd <= 0 && mana >= S.mana };
},
function (i) {
if (!CBT.on)
return false;
var St = cbtSpellState(i), S = St.A;
if (St.none) {
cbtFloatText(cbtMagicKnown().length ? "No spell readied there" : "No spells yet: find a tome", null, "#C8B0FF", 0.9);
return true;
}
if (St.lockLv) {
cbtSay("<b>" + cbtEsc(S.n) + "</b> opens at combat level " + S.lv + " (you are " + cbtLevel() + ").");
cbtFloatText("Lv " + S.lv, null, "#C8B0FF", 0.8);
return true;
}
if (St.cd > 0)
return true;
if (St.low) {
cbtFloatText("Not enough mana", null, "#9AB8FF", 0.8);
return true;
}
if (CBT.move && CBT.move.kind !== "dodge")
return true;
var W = { key: "spell", name: S.n, cls: "magic", elem: S.elem, reach: 22, ranged: true, dmg: 10, cool: 0.6, bare: false, req: 1 };
var needs = /^(shot|beam|multi)$/.test(S.t), f = cbtPick(S.t === "around" || S.t === "buff" ? 8 : 26);
if (needs && !f) {
cbtFloatText("No foe in front of you", null, "#F0D0A0", 0.8);
return true;
}
CBT.mana -= S.mana;
CBT.manaT = CBT.t;
CBT.cd[S.id] = CBT.t + St.cdMax;
CBT.gcd = Math.max(CBT.gcd, 0.3);
var P = camera.position, E = CBT_ELEM[S.elem] || CBT_ELEM.light;
cbtRise(P.x, P.y - 1.5, P.z, E.col, cbtLite() ? 8 : 16, 0.5, 1.6, 0.6, 0.2);
cbtTone(520 + i * 70, 0.09);
cbtFloatText(S.i + " " + S.n, null, "#D8C8FF", 0.9);
var A = Object.assign({ spell: 1, rng: S.rng || 24 }, S);
try {
cbtRun(A, W, f);
}
catch (e) {
cbtWarn("spell " + S.id, e);
}
return true;
},
function (on) {
CBT.padMagic = !!on;
if (CBT.phone) {
CBT.phone.classList.toggle("magic", CBT.padMagic);
var m = CBT.phone.querySelector(".mg");
if (m)
m.classList.toggle("on", CBT.padMagic);
}
try {
CBT.hud.querySelectorAll(".abs .ab").forEach(function (b) { b.dataset.i = ""; });
}
catch (e) { }
},
function () {
var H = CBT.hud;
if (!H)
return false;
if (CBT.mgHud)
return true;
var row = H.querySelector(".row");
if (!row)
return false;
var a = document.createElement("span");
a.title = "Mana: your battle spells";
a.textContent = "🔷";
row.appendChild(a);
var b = document.createElement("span");
b.className = "bar mn";
b.innerHTML = "<b style='background:linear-gradient(90deg,#5A7AF0,#9AC0FF)'></b>";
row.appendChild(b);
var sps = document.createElement("div");
sps.className = "row sps";
for (var i = 0; i < 4; i++) {
var s = document.createElement("div");
s.className = "ab sp";
s.setAttribute("data-cbt", "s" + i);
s.innerHTML = "<span class='k'>⇧" + (i + 1) + "</span><span class='i'></span><span class='cd' style='--p:0%'></span><span class='lk' style='display:none'></span><span class='s'></span>";
sps.appendChild(s);
}
var abs = H.querySelector(".abs");
if (abs && abs.nextSibling)
H.insertBefore(sps, abs.nextSibling);
else
H.appendChild(sps);
CBT.mgHud = { bar: b.firstChild, slots: sps.querySelectorAll(".ab"), row: sps };
return true;
},
function () {
if (!CBT.hud || !CBT.on || !(CBT.eng > 0))
return;
CBT.mgT = (CBT.mgT || 0) - 0.016;
if (CBT.mgT > 0)
return;
CBT.mgT = 0.1;
if (!cbtMagicHudMake())
return;
var M = CBT.mgHud;
cbtSetW(M.bar, (CBT.mana || 0) / cbtManaMax());
var pads = CBT.phone ? CBT.phone.querySelectorAll(".a") : [];
for (var i = 0; i < 4; i++) {
var S = cbtSpellState(i), A = S.A || { id: "none", i: "📖", n: "No spell", mana: 0, d: "Spell tomes drop from beaten foes, and lie glowing in dangerous places." }, b = M.slots[i];
if (b.dataset.i !== A.id) {
b.dataset.i = A.id;
b.querySelector(".i").textContent = A.i;
b.title = A.n + " (Shift+" + (i + 1) + (A.mana ? ", " + A.mana + " mana" : "") + "): " + A.d;
b.style.opacity = S.none ? "0.45" : "";
}
var pc = S.cd > 0 ? Math.round(S.cd / S.cdMax * 100) + "%" : "0%";
b.querySelector(".cd").style.setProperty("--p", pc);
var lk = b.querySelector(".lk"), lt = S.none ? "" : S.lockLv ? "Lv " + S.lockLv : S.low ? "mana" : "";
if (lk.textContent !== lt) {
lk.textContent = lt;
lk.style.display = lt ? "flex" : "none";
}
var sec = S.cd > 0 ? String(Math.ceil(S.cd)) : "";
var se = b.querySelector(".s");
if (se.textContent !== sec)
se.textContent = sec;
b.classList.toggle("rdy", !!S.ready);
if (CBT.padMagic && pads[i]) {
var pi = pads[i].querySelector(".i");
if (pi.textContent !== A.i)
pi.textContent = A.i;
pads[i].querySelector(".cd").style.setProperty("--p", pc);
pads[i].classList.toggle("no", !S.ready);
}
}
},
function () {
var L = cbtLevel(), ch = cbtMagicChosen(), known = cbtMagicKnown();
var h = "<h4>✨ Battle magic · " + known.length + " of " + CBT_MAGIC.length + " spells learned · " + Math.round(CBT.mana == null ? cbtManaMax() : CBT.mana) + "/" + cbtManaMax() + " mana</h4>" +
"<div style='font-size:12.5px;opacity:.85;margin-bottom:4px'>Spells are learned from tomes, won and found like weapons: a beaten foe sometimes leaves one where it fell (a boss always does, while there are any left for you), " +
"and out in a dangerous place one now and then lies glowing on the ground ahead. Walk to it to read it. Each world below keeps its own spell, found only there. " +
"Cast with anything in your hand; four are ready at a time (Shift + 1 to 4; ✨ on a phone; LB held on a controller). Spells grow with your level and Arcana.</div>";
h += "<div class='cl'><b>Your four spell slots</b> <span style='opacity:.7;font-size:12px'>· each cast uses mana, and the spell then waits out its own cooldown</span>" +
"<div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px;margin-top:4px'>";
for (var si = 0; si < 4; si++) {
var SS = ch[si] ? CBT_MAGIC_BY[ch[si]] : null;
h += "<div style='border:1px solid rgba(200,176,255,.45);border-radius:6px;padding:6px;min-height:44px'><div style='font-size:11px;opacity:.7'>Slot ⇧" + (si + 1) + "</div>" +
(SS ? "<div>" + SS.i + " <b>" + cbtEsc(SS.n) + "</b> <button data-cb='mx:" + si + "' title='Empty this slot' style='float:right'>✕</button></div><div style='font-size:11.5px;opacity:.75'>" + SS.mana + " mana · " + SS.cd + " s</div>"
: "<div style='opacity:.6'><i>Empty</i></div>") + "</div>";
}
h += "</div></div>";
Object.keys(CBT_SCHOOLS).forEach(function (k) {
var C = CBT_SCHOOLS[k], list = CBT_MAGIC.filter(function (S) { return S.sch === k; });
var n = list.filter(function (S) { return known.indexOf(S.id) >= 0; }).length;
h += "<div class='cl'><b>" + C.i + " " + C.n + "</b> <span style='opacity:.7;font-size:12px'>· " + n + " of " + list.length + "</span>";
list.forEach(function (S) {
var kn = known.indexOf(S.id) >= 0, on = ch.indexOf(S.id), lock = L < S.lv;
h += "<div class='abl' style='display:flex;gap:8px;align-items:flex-start'><span style='flex:1" + (kn ? "" : ";opacity:.6") + "'>" + (kn ? S.i : "📕") + " <b>" + cbtEsc(S.n) + "</b> <span style='opacity:.65'>(level " + S.lv + ", " + S.mana + " mana, " + S.cd + " s" + (S.w ? ", found in " + cbtEsc(S.wn) : "") + ")</span> " +
(kn ? cbtEsc(S.d) + (lock ? " 🔒" : "") : "<i>Not found yet.</i>") + "</span>" +
(!kn ? "" : "<span style='white-space:nowrap'>" + [0, 1, 2, 3].map(function (q) {
return on === q ? "<button disabled style='border-color:#C8B0FF;color:#C8B0FF' title='In slot " + (q + 1) + "'>⇧" + (q + 1) + " ✓</button>"
: "<button data-cb='mp:" + q + ":" + S.id + "' title='Put it in slot " + (q + 1) + "'>⇧" + (q + 1) + "</button>";
}).join(" ") + "</span>") + "</div>";
});
h += "</div>";
});
return h;
},
function (W) {
if (!W || W.bare || W.key === "spell" || !W.ranged)
return null;
var A = W.A || null, p = String(W.p || "").toLowerCase();
if (A && A.back)
return null;
if (W.cls === "magic")
return null;
if (p === "arrow" || p === "wyrm")
return "arrow";
if (p === "bolt")
return "bolt";
if (p === "stone")
return "sling";
if (p === "javelin")
return "javelin";
if (p === "star")
return "star";
if (p === "ball")
return "ball";
if (p === "bullet")
return A && +A.pellets > 1 ? "shell" : "cart";
if (/^(grenade|shell|rocket|firepot|flare)$/.test(p))
return "blast";
if (/^(laser|plasma|ion|rail)$/.test(p))
return "cell";
if (W.cls === "star")
return "cell";
if (W.cls === "gun")
return "cart";
if (W.cls === "bow")
return "arrow";
return null;
},
function (fam) {
if (!fam || !CBT_AM.on)
return null;
var A = cbtAmP(), k = A.ld[fam];
if (k === "" && Object.prototype.hasOwnProperty.call(A.ld, fam))
return null;
if (k && cbtAmHave(k) > 0 && cbtAmCanLoad(k))
return k;
var list = cbtAmOwned(fam).filter(cbtAmCanLoad);
if (k) {
var a = cbtAmParse(k);
if (a) {
var same = list.filter(function (q) { return cbtAmParse(q).type === a.type; });
if (same.length)
list = same;
}
}
var n = list[0] || null;
if (n && n !== A.ld[fam]) {
A.ld[fam] = n;
}
return n;
},
function () {
var W = cbtWeapon(), fam = cbtAmFamOf(W);
if (!fam)
return false;
var list = cbtAmOwned(fam).filter(cbtAmCanLoad), cur = cbtAmLoaded(fam), i = list.indexOf(cur);
var next = list.length ? (i < 0 ? list[0] : (i + 1 < list.length ? list[i + 1] : "")) : "";
cbtAmLoad(fam, next);
CBT_AM.outSaid[fam] = 0;
cbtFloatText(next ? cbtAmName(next) + " ×" + cbtAmHave(next) : "Plain " + CBT_AM_FAMS[fam].n.toLowerCase(), null, next ? cbtAmParse(next).G.col : "#E8DCC8", 0.9);
cbtTone(500, 0.05);
cbtAmHudPaint(true);
return true;
},
function (W, n) {
if (!CBT_AM.on)
return null;
var fam = cbtAmFamOf(W);
if (!fam)
return null;
var k = cbtAmLoaded(fam);
if (!k) {
CBT_AM.live = null;
return null;
}
var a = cbtAmParse(k), have = cbtAmHave(k);
n = Math.max(1, Math.round(+n || 1));
if (CBT_AM.use && !cbtKeeper()) {
var take = Math.min(n, have);
cbtAmSet(k, have - take);
if (CBT_AM.srv === "ok")
CBT_AM.used[k] = (CBT_AM.used[k] || 0) + take;
if (have - take <= 0) {
var nx = cbtAmLoaded(fam);
if (!CBT_AM.outSaid[fam]) {
CBT_AM.outSaid[fam] = 1;
cbtToast("🏹 Out of <b>" + cbtEsc(cbtAmName(k)) + "</b>. " + (nx ? "Loading <b>" + cbtEsc(cbtAmName(nx)) + "</b>." : "Shooting plain " + cbtEsc(CBT_AM_FAMS[fam].n.toLowerCase()) + " now: buy or make more at a forge counter."));
}
}
}
CBT_AM.live = { a: a, wk: W.key, until: CBT.t + 6, native: false };
return a;
},
function (a, f) {
var m = a.G.dm * (a.type === "std" ? 1.06 : 1);
try {
if (a.type === "pierce" && f && (f.boss || (f.r || 0) > 1.1 || (typeof cbtFoeLv === "function" && cbtFoeLv(f) > cbtLevel() + 2) || (f.ref && f.ref.k && f.ref.k.big)))
m *= 1 + 0.2 * a.G.g;
if (a.type === "silver" && f)
m *= CBT_AM_BANE.test(String(f.name || "") + " " + String((f.ref && f.ref.k && f.ref.k.name) || "")) ? 1 + 0.45 * a.G.g : 0.95;
}
catch (e) { }
return m;
},
function (a, f, d) {
if (!a || !f || !(d > 0) || CBT_AM.inX)
return;
var g = a.G.g, E = CBT_ELEM[a.T.elem] || CBT_ELEM.steel, col = E.col, cy = cbtChestOf(f);
try {
if (a.type !== "std")
cbtBurst(f.x, cy, f.z, col, cbtLite() ? 4 : 8, 2.2, 0.45, 0.22, { col2: E.col2 });
if (a.type === "barb")
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d * 0.16 * g), t: 4, tick: 0.5, col: 0xE05A5A });
else if (a.type === "fire")
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d * 0.18 * g), t: 3, tick: 0.5, col: 0xFF8A3A });
else if (a.type === "venom")
CBT.dots.push({ f: f, key: f.key, dps: Math.max(1, d * 0.11 * g), t: 6, tick: 0.5, col: 0x8AF06A });
else if (a.type === "frost") {
if (f.hold)
f.hold(0.25 + 0.3 * g);
}
else if (a.type === "shock") {
if (f.hold)
f.hold(0.2 + 0.2 * g);
var o = cbtNear(f.x, f.z, 5).filter(function (q) { return q.key !== f.key; })[0];
if (o) {
var n = cbtLite() ? 4 : 9;
for (var i = 0; i < n; i++) {
var u = i / n;
cbtSpark(f.x + (o.x - f.x) * u, cy + (cbtChestOf(o) - cy) * u, f.z + (o.z - f.z) * u, i % 2 ? col : E.col2, 0, 0.2, 0, 0.35, 0.26, 0, 1);
}
cbtAmSplash(o, d * 0.3 * g, col);
try {
if (o.hold)
o.hold(0.2);
}
catch (e) { }
}
}
else if (a.type === "blast") {
var rad = 1.6 + 0.5 * g;
cbtRing(f.x, cbtFeetOf(f) + 0.05, f.z, col, 0.3, rad, 0.5, 0.45);
cbtNear(f.x, f.z, rad).forEach(function (q) { if (q.key !== f.key)
cbtAmSplash(q, d * (0.3 + 0.15 * g), col); });
}
else if (a.type === "pierce") {
var P = camera.position, dx = f.x - P.x, dz = f.z - P.z, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L;
var behind = cbtFoes(L + 9).filter(function (q) { if (q.key === f.key)
return false; var rx = q.x - f.x, rz = q.z - f.z, along = rx * ux + rz * uz, side = Math.abs(rx * uz - rz * ux); return along > 0.2 && along < 7 && side < 1.3; })
.sort(function (p, q) { return Math.hypot(p.x - f.x, p.z - f.z) - Math.hypot(q.x - f.x, q.z - f.z); })[0];
if (behind)
cbtAmSplash(behind, d * (0.35 + 0.2 * g), col);
}
}
catch (e) {
cbtWarn("ammo after", e);
}
},
function () {
var out = [], W = cbtWeapon(), f = cbtAmFamOf(W);
if (f)
out.push(f);
try {
if (typeof bwOwned === "function")
bwOwned().forEach(function (q) {
var k = q.a.slice(3), A = BW_ARMS[k];
if (!A)
return;
var w = { key: q.a, name: A.name, dmg: +A.dmg || 10, cool: +A.cool || 0.6, kind: A.kind || "melee", held: String(A.held || ""), p: String(A.p || ""), A: A, era: A.era || "", gift: "" };
w.cls = cbtClassOf(w);
w.ranged = /^(bow|gun|star|magic)$/.test(w.cls) && w.kind !== "melee";
var ff = cbtAmFamOf(w);
if (ff && out.indexOf(ff) < 0)
out.push(ff);
});
}
catch (e) { }
return out;
},
function (lv, boss, deep) {
var fams = cbtAmFamsYouUse(), fam;
if (fams.length && Math.random() < 0.8)
fam = Math.random() < 0.6 ? fams[0] : fams[Math.floor(Math.random() * fams.length)];
else
fam = CBT_AM_FAM_ORDER[Math.floor(Math.random() * CBT_AM_FAM_ORDER.length)];
lv = Math.max(1, +lv || 1);
var g = lv < 6 ? 0 : lv < 14 ? 1 : lv < 24 ? 2 : lv < 36 ? 3 : 4, r = Math.random();
g += r < 0.25 ? -1 : r > 0.8 ? 1 : 0;
if (deep && Math.random() < 0.35)
g++;
if (boss)
g++;
g = Math.max(0, Math.min(4, g));
if (boss && (deep || lv >= 30) && Math.random() < (deep ? 0.2 : 0.12))
g = 5;
var type = Math.random() < 0.35 ? "std" : CBT_AM_TYPE_ORDER[1 + Math.floor(Math.random() * (CBT_AM_TYPE_ORDER.length - 1))];
var F = CBT_AM_FAMS[fam], n = boss ? Math.round(F.pack * (1 + Math.random())) : Math.round(F.pack * (0.3 + Math.random() * 0.5));
return { k: cbtAmKey(fam, type, g), n: Math.max(1, n) };
},
function (k, n, why, at) {
var a = cbtAmParse(k);
if (!a || !(n > 0))
return;
cbtAmSet(k, cbtAmHave(k) + n);
var P = camera.position, col = a.G.col;
try {
cbtFloatText(a.F.i + " +" + n + " " + cbtAmName(k), at || { x: P.x, y: P.y - 0.4, z: P.z }, col, a.g >= 4 ? 1.15 : 0.95, a.g >= 4);
}
catch (e) { }
if (a.g >= 4)
cbtToast(a.F.i + " <b style='color:" + col + "'>" + n + " " + cbtEsc(cbtAmName(k)) + "</b> " + cbtEsc(why || "") + ". " + (cbtAmCanLoad(k) ? "" : "(Loaded from combat level " + a.G.lv + ".)"));
if (CBT_AM.srv === "ok") {
cityRpc("ammo_found", { p_kind: k, p_n: n, p_why: a.g >= 5 ? "boss" : (WLD.on === "delve" || WLD.on === "dmk") ? "dungeon" : "foe" }).then(function (r) {
if (r && r.ok && +r.have >= 0)
cbtAmSet(k, Math.max(0, +r.have - (CBT_AM.used[k] || 0)));
else if (r && r.ok === false) {
cbtAmSet(k, Math.max(0, cbtAmHave(k) - n));
if (r.say)
cbtSay(cbtEsc(r.say));
}
}).catch(function () { });
}
else
cbtAmP().dev = 1;
},
function () {
if (CBT_AM.srv === "busy" || CBT_AM.srv === "ok" || CBT_AM.srv === "missing" || !cbtSigned())
return;
CBT_AM.srv = "busy";
cityRpc("ammo_me", {}).then(function (r) {
if (!r || r.ok === false) {
CBT_AM.srv = "later";
CBT_AM.retryAt = CBT.t + 120;
return;
}
cbtAmRules(r);
var A = cbtAmP();
if (A.dev && !r.carried && Object.keys(A.s).length) {
var keep = A.s;
return cityRpc("ammo_carry", { p_stock: keep }).then(function (c) { A.dev = 0; CBT_AM.srv = "ok"; cbtAmTake(c && c.stock ? c : r); }).catch(function () { CBT_AM.srv = "ok"; cbtAmTake(r); });
}
A.dev = 0;
CBT_AM.srv = "ok";
cbtAmTake(r);
}).catch(function (e) { CBT_AM.srv = cbtMissing(e) ? "missing" : "later"; CBT_AM.retryAt = CBT.t + 120; });
},
function () {
CBT_AM.flushT = 20;
if (CBT_AM.saveT > 0) {
CBT_AM.saveT = 0;
try {
if (typeof save === "function")
save();
}
catch (e) { }
}
if (CBT_AM.srv !== "ok" || !Object.keys(CBT_AM.used).length)
return;
var u = CBT_AM.used;
CBT_AM.used = {};
cityRpc("ammo_use", { p_used: u }).then(function (r) { if (r && r.ok)
cbtAmTake(r); }).catch(function () {
Object.keys(u).forEach(function (k) { CBT_AM.used[k] = (CBT_AM.used[k] || 0) + u[k]; });
});
},
function (force) {
if (!CBT.hud)
return;
var el = CBT_AM.el;
if (!el) {
var w = CBT.hud.querySelector(".wpn");
if (!w)
return;
var st = document.createElement("style");
st.textContent = "#cbt-hud .amo{pointer-events:auto;cursor:pointer;background:rgba(14,12,18,.8);border:1px solid rgba(232,194,122,.4);border-radius:11px;padding:2px 9px;font-weight:500;white-space:nowrap;display:none}" +
"#cbt-hud .amo b{font-weight:600}#cbt-hud .amo .t{opacity:.6;font-size:11px}#cbt-hud .amo.low{border-color:#E89A6A}";
document.head.appendChild(st);
el = CBT_AM.el = document.createElement("div");
el.className = "amo";
el.title = "What is loaded: T, or a tap, changes it";
el.addEventListener("pointerdown", function (e) { e.preventDefault(); e.stopPropagation(); cbtAmCycle(); });
w.parentNode.insertBefore(el, w.nextSibling);
}
var W = CBT.on && CBT.eng > 0 ? cbtWeapon() : null, fam = CBT_AM.on && W ? cbtAmFamOf(W) : null;
if (!fam) {
if (el.style.display !== "none")
el.style.display = "none";
return;
}
var k = cbtAmLoaded(fam), n = k ? cbtAmHave(k) : 0, a = k && cbtAmParse(k);
var h = CBT_AM_FAMS[fam].i + " " + (k ? "<b style='color:" + a.G.col + "'>" + cbtEsc(cbtAmName(k)) + "</b> ×" + (CBT_AM.use ? n : "∞") : "Plain " + cbtEsc(CBT_AM_FAMS[fam].n.toLowerCase())) +
(cbtTouch() || cbtVR() ? "" : " <span class='t'>· T</span>");
if (force || el.innerHTML !== h) {
el.innerHTML = h;
}
el.classList.toggle("low", !!k && CBT_AM.use && n <= Math.max(3, Math.round(CBT_AM_FAMS[fam].pack / 4)));
if (el.style.display !== "block")
el.style.display = "block";
},
function () {
var L = cbtLevel(), A = cbtAmP(), mine = cbtAmFamsYouUse();
var h = "<h4>🏹 Ammunition</h4><div style='font-size:12.5px;opacity:.85;margin-bottom:4px'>Every weapon that shoots something shoots its own family of rounds; staves, wands and orbs, and returning discs, need none. " +
"With nothing loaded a weapon shoots plain rounds, as ever. Loaded rounds hit harder and carry their type's effect, and " + (CBT_AM.use ? "are used up one a shot" : "(the Keeper says so) are never used up") + ". " +
"In a fight <b>T</b> (or a tap on what is loaded, under your weapon) changes to the next kind you carry. " +
"Buy them by the pack at the forge counters (the Smithy and the Joinery in Somnucor, the Transport Yard's workshop, the War Forge and the Motor Pool in Ironfray, Hephaestus's forge), make them there from your materials, " +
"or win them: beaten foes leave some, a boss always does, and the dungeons hold the best.</div>";
if (!CBT_AM.on)
h += "<div style='color:#F0C08A;font-size:12px'>The Keeper has put ammunition away for now: every weapon shoots plain rounds.</div>";
if (CBT_AM.srv === "missing")
h += "<div style='opacity:.7;font-size:12px'>What you win is kept on this device for now; once the city's next update is in, it goes onto your account.</div>";
CBT_AM_FAM_ORDER.forEach(function (fam) {
var F = CBT_AM_FAMS[fam], own = cbtAmOwned(fam), cur = cbtAmLoaded(fam), uses = mine.indexOf(fam) >= 0;
if (!own.length && !uses)
return;
h += "<div class='cl'><b>" + F.i + " " + cbtEsc(F.n) + "</b> <span style='opacity:.7;font-size:12px'>· for " + cbtEsc(F.for) + "</span>";
h += "<div class='abl'>Loaded: <b>" + (cur ? "<span style='color:" + cbtAmParse(cur).G.col + "'>" + cbtEsc(cbtAmName(cur)) + "</span>" : "plain") + "</b>" + (cur ? " <button data-cb='am:ld:" + fam + ":'>Shoot plain</button>" : "") + "</div>";
if (!own.length)
h += "<div class='abl' style='opacity:.7'>None carried yet.</div>";
own.forEach(function (k) {
var a = cbtAmParse(k), lock = L < a.G.lv;
h += "<div class='abl' style='display:flex;gap:8px;align-items:center'><span style='flex:1'>" + a.T.i + " <b style='color:" + a.G.col + "'>" + cbtEsc(cbtAmName(k)) + "</b> ×" + cbtAmHave(k) +
" <span style='opacity:.65'>(" + cbtEsc(a.T.d) + (lock ? " Loaded from combat level " + a.G.lv + "." : "") + ")</span></span>" +
(k === cur ? "<span style='color:#E8C27A;white-space:nowrap'>Loaded</span>" : "<button data-cb='am:ld:" + fam + ":" + k + "'" + (lock ? " disabled" : "") + ">Load</button>") + "</div>";
});
h += "</div>";
});
h += "<div class='cl'><b>The nine types</b>" + CBT_AM_TYPE_ORDER.map(function (t) { var T = CBT_AM_TYPES[t]; return "<div class='abl'>" + T.i + " <b>" + T.n + "</b>: " + cbtEsc(T.d) + "</div>"; }).join("") + "</div>";
h += "<div class='cl'><b>The six grades</b>" + CBT_AM_GRADES.map(function (G) {
return "<div class='abl'><b style='color:" + G.col + "'>" + G.n + "</b>: " + Math.round((G.dm - 1) * 100) + "% harder than plain, effect ×" + G.g +
", combat level " + G.lv + (G.sold ? ", sold at the counters" : G.k === "legendary" ? ", only from bosses, or made with a dragon scale" : ", made or won only") + "</div>";
}).join("") + "</div>";
return h;
},
function () {
var st = FG.st, fams = cbtAmStationFams(st), great = CBT_AM_GREAT.indexOf(st) >= 0, h = "";
if (!fams.length)
return fgDim("This counter has no ammunition.");
if (!CBT_AM.buyFam || fams.indexOf(CBT_AM.buyFam) < 0) {
var mine = cbtAmFamsYouUse().filter(function (f) { return fams.indexOf(f) >= 0; });
CBT_AM.buyFam = mine[0] || fams[0];
}
var fam = CBT_AM.buyFam, F = CBT_AM_FAMS[fam], gi = Math.max(0, Math.min(5, CBT_AM.buyG | 0)), G = CBT_AM_GRADES[gi];
h += "<div style='margin-top:6px'>" + fgDim("By the pack: a pack of " + F.pack + " " + cbtEsc(F.n.toLowerCase()) + " is for " + cbtEsc(F.for) + ". Crude to Superior is sold here; every grade can be made from your materials" +
(great ? "" : " (Masterwork and Legendary only at the War Forge in Ironfray and Hephaestus's forge)") + ". In a fight, T changes what is loaded.") + "</div>";
if (CBT_AM.srv === "missing")
h += "<div style='margin-top:6px;color:#F0C08A'>The ammunition counter opens with the city's next update (240). Until then, beaten foes still leave rounds, kept on this device.</div>";
if (!CBT_AM.on)
h += "<div style='margin-top:6px;color:#F0C08A'>The Keeper has put ammunition away for now.</div>";
h += fgHead("Family") + "<div>" + fams.map(function (f) {
var n = 0;
cbtAmOwned(f).forEach(function (k) { n += cbtAmHave(k); });
return fgB("am:fam:" + f, CBT_AM_FAMS[f].i + " " + cbtEsc(CBT_AM_FAMS[f].n) + (n ? " (" + n + ")" : ""), f === fam);
}).join("") + "</div>";
h += fgHead("Grade") + "<div>" + CBT_AM_GRADES.map(function (Q, i) { return fgB("am:g:" + i, "<span style='color:" + Q.col + "'>" + Q.n + "</span>", i === gi, "Combat level " + Q.lv); }).join("") + "</div>";
h += fgHead(cbtEsc(G.n) + " " + cbtEsc(F.n.toLowerCase()) + " · loaded from combat level " + G.lv);
var canMake = gi < 4 || great;
CBT_AM_TYPE_ORDER.forEach(function (t) {
var k = cbtAmKey(fam, t, gi), T = CBT_AM_TYPES[t], need = cbtAmNeed(k), price = cbtAmPriceNow(k);
var needTxt = Object.keys(need).map(function (m) {
var M = typeof FG_MB !== "undefined" && FG_MB[m], have = +(FG.stock && FG.stock[m]) || 0;
return "<span style='color:" + (have >= need[m] ? "#9AE0A8" : "#F0A08A") + "'>" + need[m] + " " + cbtEsc(M ? M.name.toLowerCase() : m) + "</span>";
}).join(", ");
h += "<div style='padding:6px 0;border-bottom:1px solid rgba(255,255,255,.07)'><div><b>" + T.i + " <span style='color:" + G.col + "'>" + cbtEsc(cbtAmName(k)) + "</span></b> " +
fgDim("· pack of " + F.pack + (cbtAmHave(k) ? " · you carry " + cbtAmHave(k) : "")) + "</div>" +
"<div style='font-size:12px;opacity:.8'>" + cbtEsc(T.d) + "</div><div>" +
(G.sold ? fgB("am:buy:" + k + ":1", "Buy a pack · " + (price ? price.toLocaleString() + " gold" : "free")) + fgB("am:buy:" + k + ":5", "5 packs · " + (price ? (price * 5).toLocaleString() + " gold" : "free")) : fgDim("Not sold: made or won only. ")) +
(canMake ? fgB("am:make:" + k + ":1", "Make a pack") + " <span style='font-size:12px'>" + needTxt + "</span>" : "") + "</div></div>";
});
return h;
},
function (act, k, packs) {
if (CBT_AM.busy)
return;
if (!(typeof signedIn === "function" && signedIn())) {
FG.msg = "Sign in first: ammunition is kept against your account.";
fgPaint();
return;
}
if (CBT_AM.srv === "missing") {
FG.msg = "The ammunition counter opens with the city's next update.";
fgPaint();
return;
}
CBT_AM.busy = true;
FG.msg = "…";
fgPaint();
cityRpc(act === "buy" ? "ammo_buy" : "ammo_make", { p_kind: k, p_packs: packs, p_station: FG.st }).then(function (r) {
CBT_AM.busy = false;
FG.msg = cbtEsc((r && r.say) || "The counter is shut.");
if (r && r.ok) {
if (+r.have >= 0)
cbtAmSet(k, Math.max(0, +r.have - (CBT_AM.used[k] || 0)));
var fam = cbtAmParse(k).fam;
if (!cbtAmP().ld[fam] && cbtAmCanLoad(k))
cbtAmLoad(fam, k);
if (act === "make" && typeof fgLoad === "function")
try {
fgLoad();
}
catch (e) { }
if (typeof refreshGold === "function")
try {
refreshGold();
}
catch (e) { }
}
fgPaint();
}).catch(function (e) { CBT_AM.busy = false; if (cbtMissing(e)) {
CBT_AM.srv = "missing";
FG.msg = "The ammunition counter opens with the city's next update.";
}
else
FG.msg = cbtEsc((e && e.message) || String(e)); fgPaint(); });
},
function (title, rows, note) {
if (typeof document === "undefined" || !document.body)
return;
if (!DGL.el) {
var st = document.createElement("style");
st.textContent = "#dgl-box{position:fixed;right:calc(12px + env(safe-area-inset-right,0px));top:calc(120px + env(safe-area-inset-top,0px));z-index:58;display:flex;flex-direction:column;gap:6px;pointer-events:none;width:min(290px,calc(100vw - 24px))}" +
"#dgl-box .c{background:rgba(18,14,10,.92);border:1px solid #C9A868;border-radius:10px;padding:8px 11px;color:#F4EAD6;font:12.5px/1.4 var(--sans,system-ui);box-shadow:0 6px 18px rgba(0,0,0,.45);transition:opacity .6s ease,transform .6s ease}" +
"#dgl-box .c b.t{display:block;font:600 13.5px var(--serif,Georgia);color:#FFE7B0;margin-bottom:3px}#dgl-box .c .r{display:flex;gap:6px;align-items:baseline}#dgl-box .c .n{opacity:.75;font-size:11.5px;margin-top:3px}" +
"@media (max-height:520px){#dgl-box{top:calc(64px + env(safe-area-inset-top,0px));width:min(250px,calc(100vw - 24px))}}";
document.head.appendChild(st);
DGL.el = document.createElement("div");
DGL.el.id = "dgl-box";
document.body.appendChild(DGL.el);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["dgl-box"] = 1;
}
var c = document.createElement("div");
c.className = "c";
c.innerHTML = "<b class='t'>" + title + "</b>" + (rows.length ? rows.map(function (r) { return "<div class='r'><span>" + (r.i || "•") + "</span><span style='color:" + (DGL_COL[r.q || "c"] || r.q) + "'>" + r.t + "</span></div>"; }).join("") : "<div class='r'>Nothing this time.</div>") + (note ? "<div class='n'>" + note + "</div>" : "");
DGL.el.insertBefore(c, DGL.el.firstChild);
while (DGL.el.children.length > 3)
DGL.el.removeChild(DGL.el.lastChild);
setTimeout(function () { c.style.opacity = "0"; c.style.transform = "translateX(20px)"; setTimeout(function () { if (c.parentNode)
c.parentNode.removeChild(c); }, 700); }, 6500);
try {
if (typeof setStatus === "function")
setStatus(title.replace(/<[^>]+>/g, "") + ": " + (rows.map(function (r) { return r.t.replace(/<[^>]+>/g, ""); }).join(", ") || "nothing"));
}
catch (e) { }
},
function (lv, boss) {
if (typeof BW_ARMS === "undefined")
return null;
var top = 12 + lv * 1.1 + (boss ? 10 : 0), low = Math.max(0, top - 22), out = [];
Object.keys(BW_ARMS).forEach(function (k) {
var A = BW_ARMS[k];
if (!A || !A.name || /^bh|^sg|^el|^rl/.test(k) || A.bhnBook || A.story || A.robot || A.mount)
return;
var d = (+A.dmg || 10) * (A.cool ? Math.min(2.5, Math.max(0.6, 0.7 / A.cool)) : 1) * (A.pellets ? A.pellets * 0.6 : 1);
if (!(d <= top && d >= low * 0.6))
return;
var own = typeof bkpKept === "function" && bkpKept().some(function (q) { return q.a === "bw_" + k; });
out.push({ k: k, w: own ? 0.25 : 1 });
});
if (!out.length)
return null;
var sum = out.reduce(function (a, o) { return a + o.w; }, 0), r = Math.random() * sum;
for (var i = 0; i < out.length; i++) {
r -= out[i].w;
if (r <= 0)
return out[i].k;
}
return out[out.length - 1].k;
},
function (k, from) {
var A = typeof BW_ARMS !== "undefined" && BW_ARMS[k];
if (!A || typeof bkpKept !== "function")
return null;
var had = bkpKept().some(function (q) { return q.a === "bw_" + k; });
if (!had) {
bkpKept().push({ id: "bw_" + k + "_" + (typeof uid === "function" ? uid() : Date.now()), a: "bw_" + k, name: A.name, from: from || "a dungeon", got: "won" });
try {
if (typeof save === "function")
save();
}
catch (e) { }
}
return { n: A.name, had: had };
},
function (o) {
var rows = [], lv = Math.max(1, +o.lv || 1), src = o.src || "beast", chest = /chest|armoury|treasure|secret/.test(src), boss = src === "boss", champ = src === "champ";
var wc = boss ? 0.4 + Math.min(0.3, lv * 0.008) : champ ? 0.1 : src === "secret" ? 0.16 : src === "armoury" ? 0.2 : src === "treasure" ? 0.08 : chest ? 0.035 : 0.01 + lv * 0.0005;
if (Math.random() < wc) {
var k = dglWeaponPick(lv, boss || src === "secret");
var g = k && dglWeaponGive(k, o.where);
if (g)
rows.push({ i: "⚔️", t: "<b>" + dglEsc(g.n) + "</b>" + (g.had ? " (you have one already)" : " · in your 🎒 Backpack"), q: boss ? "e" : "r" });
}
try {
if (chest && typeof CBT_AM !== "undefined" && CBT_AM.on && typeof cbtAmRollDrop === "function" && Math.random() < (src === "armoury" ? 0.9 : 0.45)) {
var D = cbtAmRollDrop(lv, false, true);
cbtAmGain(D.k, D.n, "from a chest", o.at);
var a = cbtAmParse(D.k);
rows.push({ i: a.F.i, t: D.n + " " + dglEsc(cbtAmName(D.k)), q: a.g >= 4 ? "e" : a.g >= 2 ? "u" : "c" });
}
}
catch (e) { }
try {
if (chest && typeof cbtTomePick === "function" && Math.random() < (src === "secret" ? 0.3 : src === "treasure" ? 0.16 : 0.05)) {
var S = cbtTomePick(lv + 2);
if (S && o.at) {
cbtTomeDrop(S, o.at.x, o.at.y, o.at.z, "Found in a chest");
rows.push({ i: "📖", t: "a spell tome (step onto it to read it)", q: "r" });
}
}
}
catch (e) { }
if (chest && Math.random() < 0.4) {
var n = 20 + Math.round(Math.random() * 30);
try {
if (typeof cbtHeal === "function")
cbtHeal(n);
if (o.heal)
o.heal(n);
}
catch (e) { }
rows.push({ i: "🧪", t: "a healing draught, drunk at once (+" + n + " vigour)", q: "u" });
}
if (!chest && o.K && o.K.spoil && typeof dgbData === "function" && Math.random() < (boss ? 1 : champ ? 0.7 : 0.35)) {
try {
var T = dgbData();
T.trophies.push({ n: o.K.spoil[0], i: o.K.spoil[1], f: o.K.name, w: o.where || "a dungeon", at: Date.now() });
if (T.trophies.length > 300)
T.trophies.splice(0, T.trophies.length - 300);
if (typeof save === "function")
save();
rows.push({ i: o.K.spoil[1], t: dglEsc(o.K.spoil[0]) + " (a trophy)", q: "c" });
}
catch (e) { }
}
return rows;
},
function (where, run, o) {
if (!run || typeof cityRpc !== "function")
return Promise.resolve(null);
var src = o.src || "beast", lv = Math.max(1, Math.round(+o.lv || 1));
var old = function () {
return where === "dmk" ? cityRpc("dmk_drop", { p_run: run, p_foe: /chest|armoury|treasure|secret/.test(src) ? "chest" : String(o.kind || "beast").slice(0, 40) }).then(function (r) { if (r && r.ok && !r.items && r.mats)
r.items = r.mats; return r; })
: cityRpc("saga_drop", { p_run: run, p_foe: String(o.kind || "beast").slice(0, 40) }).then(function (r) { if (r && r.ok)
r.items = r.mats || []; return r; });
};
if (DGL.srv === "old")
return old().catch(function () { return null; });
return cityRpc("dgn_loot", { p_where: where, p_run: run, p_src: src, p_lv: lv, p_theme: String(o.theme || "").slice(0, 20) }).then(function (r) { DGL.srv = "new"; return r; })
.catch(function (e) { if ((typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find|schema cache/i.test(String(e && e.message || e)))) {
DGL.srv = "old";
return old().catch(function () { return null; });
} return null; });
},
function (where, run, o, title) {
var rows = dglLocal(o);
var show = function (r, note) {
var all = rows.slice();
if (r && r.ok) {
if (r.gold > 0) {
all.unshift({ i: "🪙", t: "<b>" + r.gold + " gold</b>", q: "l" });
try {
if (typeof refreshStanding === "function")
refreshStanding();
}
catch (e) { }
}
(r.items || []).forEach(function (m) {
all.push({ i: m.icon || "⛏️", t: (m.n > 1 ? m.n + " " : "") + dglEsc(String(m.name || m.kind).toLowerCase()), q: /crystal|ember|deepsilver|star/.test(m.kind || "") ? "r" : "c" });
try {
if (typeof FG !== "undefined" && FG.stock && m.kind)
FG.stock[m.kind] = (+FG.stock[m.kind] || 0) + (+m.n || 0);
}
catch (e) { }
});
if (!note && r.why) {
note = r.why === "visitors are not paid in gold" ? "Gold goes only to grown-ups who pay their dues." : r.why === "no gold from your own dungeon" ? "No gold from a dungeon of your own making: materials, weapons and the rest are yours." : r.why === "gold comes only in the Crawlers' Hall dungeons" ? "Gold comes in the Crawlers' Hall's dungeons and the four under the Bell Tower; the rest is yours." : r.why === "the day's gold is all paid" ? "You have had all the gold the dungeons pay in a day; the rest still comes." : r.why === "too quick" ? "" : null;
}
}
else if (r && r.say)
note = dglEsc(r.say);
dglShow(title, all, note);
};
if (!run) {
show(null, (typeof signedIn === "function" && signedIn()) ? "Materials and gold are kept on the city's server; it is not answering just now." : "Sign in, and materials and gold are kept as well.");
return;
}
dglServer(where, run, o).then(function (r) { show(r, null); }).catch(function () { show(null, null); });
},
function (out) {
out = out || dgnOut;
if (dgnWon()) {
out();
return;
}
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⬆ Leave the dungeon?</div>" +
"<p style='opacity:.88;margin:6px 0'>Its boss still stands. If you climb out now, this run ends: next time you go down, it starts again from the stair.</p>" +
worldBtn("stay", "⚔️ Stay and fight on", "Or press Back again") + worldBtn("go", "⬆ Leave the dungeon", "Climb back up now");
worldCard(h, { stay: function () { worldCard(null); }, go: function () { worldCard(null); out(); } });
},
function (W, own) {
var nm = (W && (W.title || W.name)) || "this world";
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Where to?</div>" +
worldBtn("home", "⬆ Leave " + (nm === "this world" ? nm : esc(nm)), "Home to where you came from") +
worldBtn("start", "↩ Back to the start of this place", "Where you came into this part") +
worldBtn("stay", "Stay here", "Or press Back again");
worldCard(h, { home: function () { worldCard(null); worldHome(); }, start: function () { worldCard(null); try {
own.call(W);
}
catch (e) {
worldHome();
} }, stay: function () { worldCard(null); } });
},
function () {
try {
if (typeof carrying !== "undefined" && carrying) {
var a = String(carrying.archetype || "");
if (/^relic_/.test(a))
return a.slice(6);
if (/^bw_rl/.test(a))
return a.slice(5);
}
var h = cbtHeldKey();
if (h && /^rl/.test(h) && typeof RL_BY !== "undefined" && RL_BY[h.slice(2)])
return h.slice(2);
}
catch (e) { }
return null;
},
function () {
if (!CBT.on)
return false;
var k = cbtRelicKey();
if (!k)
return false;
if (CBT_RL.cool > 0) {
cbtFloatText("💠 " + Math.ceil(CBT_RL.cool) + "s", null, "#B8E0FF", 0.8);
return true;
}
CBT_RL.cool = 8;
try {
if (typeof EL_R !== "undefined" && EL_R[k] && typeof elUse === "function") {
if (typeof RL !== "undefined")
RL.cool = 0;
elUse(k);
}
}
catch (e) {
cbtWarn("relic use", e);
}
var P = camera.position, F = cbtFwd(), el = cbtRelicElem(k), E = CBT_ELEM[el] || CBT_ELEM.frost, feet = P.y - 1.6;
try {
cbtRing(P.x, feet, P.z, E.col, 0.4, 4.2, 0.7, 0.6);
cbtRing(P.x + F.x * 4, feet, P.z + F.z * 4, E.col2, 0.3, 3.2, 0.8, 0.55);
cbtBurst(P.x + F.x * 3, feet + 1.1, P.z + F.z * 3, E.col, cbtLite() ? 10 : 22, 5, 0.8, 0.14);
}
catch (e) { }
cbtTone(el === "fire" ? 300 : el === "storm" ? 180 : 620, 0.3);
var hit = {}, list = cbtInCone(8, 0.75).concat(cbtNear(P.x, P.z, 3.2)), n = 0, mult = 2.5 * (cbtRelicPlate() ? 2 : 1);
list.forEach(function (f) { if (hit[f.key])
return; hit[f.key] = 1; n++; cbtDeal(f, cbtRoll(mult), { elem: el, big: true, ab: true }); });
if (/aurora|evergreen|life/.test(k) || el === "light") {
try {
cbtHeal(15);
}
catch (e) { }
}
cbtFloatText("💠 " + cbtRelicName(k) + (n ? " · " + n + " struck" : ""), null, "#B8E0FF", 1, true);
return true;
},
function (dt) {
if (CBT_RL.cool > 0)
CBT_RL.cool = Math.max(0, CBT_RL.cool - dt);
var k = CBT.on ? cbtRelicKey() : null, worn = CBT.on ? cbtRelicWorn() : [];
var pd = CBT.phone;
if (pd && !CBT_RL.btn) {
var b = document.createElement("div");
b.className = "rl";
b.setAttribute("data-cbt", "rl");
b.title = "Relic power";
b.style.cssText = "width:40px;height:40px;right:70px;bottom:150px;font-size:18px;background:rgba(20,50,80,.88);border-color:#9AD8FF;display:none";
b.innerHTML = "💠<span class='cd' style='position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(0,0,0,.7) var(--p),rgba(0,0,0,0) 0);--p:0%'></span>";
b.addEventListener("pointerdown", function (e) { e.preventDefault(); e.stopPropagation(); cbtRelicPower(); });
pd.appendChild(b);
CBT_RL.btn = b;
}
if (CBT_RL.btn) {
var sh = k ? "flex" : "none";
if (CBT_RL.btn.style.display !== sh)
CBT_RL.btn.style.display = sh;
var cd = CBT_RL.btn.querySelector(".cd");
if (cd)
cd.style.setProperty("--p", Math.round(CBT_RL.cool / 8 * 100) + "%");
}
if (!CBT_RL.line && document.body) {
var l = document.createElement("div");
l.id = "cbt-relic";
l.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:30;pointer-events:none;" +
"font:600 12px var(--sans,system-ui);color:#CFEAFF;background:rgba(10,20,34,.78);border:1px solid rgba(154,216,255,.45);border-radius:12px;padding:3px 10px;display:none;max-width:calc(100vw - 24px);text-align:center";
document.body.appendChild(l);
CBT_RL.line = l;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["cbt-relic"] = 1;
}
var L = CBT_RL.line;
if (!L)
return;
var parts = [];
if (k)
parts.push("💠 " + cbtEsc(cbtRelicName(k)) + ": <b>" + (cbtTouch() ? "💠 button" : "R") + "</b>" + (CBT_RL.cool > 0 ? " (" + Math.ceil(CBT_RL.cool) + "s)" : " ready"));
if (worn.length)
parts.push("🛡️ " + worn.map(function (w) { return cbtEsc(cbtRelicName(w)); }).join(", ") + ": blows land " + Math.round(Math.min(0.16, 0.04 * worn.length) * 100) + "% softer" + (worn.indexOf("frostplate") >= 0 && k ? ", relic strikes doubled" : ""));
var txt = parts.join(" · "), show = !!(CBT.on && txt);
if (txt !== CBT_RL.lastTxt) {
CBT_RL.lastTxt = txt;
L.innerHTML = txt;
}
var d = show ? "block" : "none";
if (L.style.display !== d)
L.style.display = d;
}
];
});
