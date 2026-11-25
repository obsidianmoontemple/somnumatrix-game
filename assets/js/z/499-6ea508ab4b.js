/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(499, function () {
"use strict";
return [
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
if (S.grant)
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
var n = list.filter(function (S) { return known.indexOf(S.id) >= 0; }).length, all = list.length;
if (k === "story")
list = list.filter(function (S) { return known.indexOf(S.id) >= 0; });
h += "<div class='cl'><b>" + C.i + " " + C.n + "</b> <span style='opacity:.7;font-size:12px'>· " + n + " of " + all + "</span>" +
(k === "story" ? "<div style='opacity:.7;font-size:12px'>Every book you finish leaves at least three spells and abilities; Heart of the Drakkyn and Winter's Heart leave every power their people use; finishing the Hollow turns your Warden's gifts and shard surges into battle spells.</div>" : "");
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
function () {
if (typeof bkpHead !== "function" || typeof bkpRow !== "function" || typeof bkpDim !== "function")
return "";
var W = null;
try {
W = cbtWeapon();
}
catch (e) { }
var hand = W ? cbtAmFamOf(W) : null, mine = cbtAmFamsYouUse(), any = 0, h = bkpHead("🏹 Ammunition");
if (!CBT_AM.on)
return h + bkpDim("The Keeper has put ammunition away for now: every weapon shoots plain rounds.");
var fams = CBT_AM_FAM_ORDER.filter(function (f) { return cbtAmOwned(f).length || mine.indexOf(f) >= 0 || f === hand; });
if (hand) {
fams.splice(fams.indexOf(hand), 1);
fams.unshift(hand);
}
fams.forEach(function (fam) {
var F = CBT_AM_FAMS[fam], own = cbtAmOwned(fam), cur = cbtAmLoaded(fam), L = cbtLevel();
h += '<div style="padding-top:8px">' + F.i + " <b>" + cbtEsc(F.n) + "</b> " + bkpDim("· for " + cbtEsc(F.for) + (fam === hand ? " · the weapon in your hand" : "")) + '</div>';
h += bkpRow(bkpDim("Loaded"), cur ? "<b style='color:" + cbtAmParse(cur).G.col + "'>" + cbtEsc(cbtAmName(cur)) + "</b> <button class='btn' data-bkam='" + fam + ":'>Shoot plain</button>" : "plain " + cbtEsc(F.n.toLowerCase()));
if (!own.length)
h += bkpRow(bkpDim("None carried yet"), "");
own.forEach(function (k) {
var a = cbtAmParse(k), lock = L < a.G.lv;
any++;
h += bkpRow(a.T.i + " <b style='color:" + a.G.col + "'>" + cbtEsc(cbtAmName(k)) + "</b> × " + cbtAmHave(k).toLocaleString() + "<br>" + bkpDim(cbtEsc(a.T.d) + (lock ? " Loads from combat level " + a.G.lv + "." : "")), k === cur ? "<span style='color:#E8C27A'>Loaded</span>" : "<button class='btn' data-bkam='" + fam + ":" + k + "'" + (lock ? " disabled" : "") + ">Load</button>");
});
});
if (!fams.length)
h += bkpDim("None yet. Hold a bow, a crossbow, a sling, a gun or the like, and its rounds show here.");
h += '<div style="padding-top:8px;font-size:12px;color:var(--dim,#999)">' + (cbtTouch() ? "In a fight, a tap on what is loaded (under your weapon) switches to the next kind; 🎒 beside it opens this list." :
"In a fight, <b>T</b> switches to the next kind you carry, and <b>Shift+T</b> opens this list.") +
" Buy more by the pack at the forge counters (the Smithy and the Joinery in Somnucor, the Transport Yard's workshop, the War Forge and the Motor Pool in Ironfray, Hephaestus's forge), make them there, or win them from foes" + (any ? "" : ": a boss always leaves some") + ".</div>";
return h;
},
function () {
var L = cbtLevel(), A = cbtAmP(), mine = cbtAmFamsYouUse();
var h = "<h4 id='cbt-am-sec'>🏹 Ammunition</h4><div style='font-size:12.5px;opacity:.85;margin-bottom:4px'>Every weapon that shoots something shoots its own family of rounds; staves, wands and orbs, and returning discs, need none. " +
"With nothing loaded a weapon shoots plain rounds, as ever. Loaded rounds hit harder and carry their type's effect, and " + (CBT_AM.use ? "are used up one a shot" : "(the Keeper says so) are never used up") + ". " +
"In a fight <b>T</b> (or a tap on what is loaded, under your weapon) changes to the next kind you carry; <b>Shift+T</b>, the chip's 🎒, or the Backpack's 🏹 Ammo tab shows all you carry. " +
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
all.push({ kind: m.kind, i: m.icon || "⛏️", t: (m.n > 1 ? m.n + " " : "") + dglEsc(String(m.name || m.kind).toLowerCase()) + (m.boss ? " (the boss's trophy)" : ""), q: m.boss ? "e" : /crystal|ember|deepsilver|star/.test(m.kind || "") ? "r" : "c" });
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
}
];
});
