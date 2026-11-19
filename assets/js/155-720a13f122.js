/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PW = { applied: 0, size: 0, eye: 0, pace: 1, unseen: false, lucid: false, frozen: 0, under: false, walls: true,
bar: null, fx: [], keys: [], aura: [], ghost: null, home: null, splash: 0, ripple: 0, wade: 0 };
var PW_USE = [
{ n: "passing through walls", i: "▦", t: "Walls", on: function () { return PW.walls; } },
{ n: "breathing underwater", i: "≈", t: "Dive", on: function () { return PW.under; } },
{ n: "becoming unseen", i: "◌", t: "Unseen", on: function () { return PW.unseen; } },
{ n: "changing shape", i: "✵", t: "Shape" },
{ n: "summoning", i: "✦", t: "Summon" },
{ n: "stopping time", i: "⧗", t: "Stop time", on: function () { return PW.frozen > 0; } },
{ n: "moving without walking", i: "➾", t: "Blink" },
{ n: "changing size", i: "⇳", t: "Size", on: function () { return PW.size !== 0; } },
{ n: "speaking with the dead", i: "☠", t: "The dead" },
{ n: "knowing it was a dream", i: "◉", t: "Lucid", on: function () { return PW.lucid; } },
{ n: "changing the dream", i: "↻", t: "Remake" },
{ n: "seeing what was hidden", i: "◎", t: "Reveal" },
{ n: "healing", i: "✚", t: "Heal" }
];
function pwHas(n) { return typeof hasAbility === "function" && hasAbility(n); }
function pwSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function pwInCity() { return typeof inCityNow === "function" && inCityNow(); }
function pwFwd() { return { x: -Math.sin(yaw), z: -Math.cos(yaw) }; }
function pwBurst(x, y, z, col, n, spread, life, kind, size) {
if (typeof particles !== "function" || typeof scene === "undefined")
return null;
var p = particles(n || 60, spread || [1.4, 2.4, 1.4], col, size || 0.9, 0.95);
p.position.set(x, y, z);
scene.add(p);
PW.fx.push({ p: p, t: 0, life: life || 1.6, kind: kind || "rise" });
return p;
}
function pwRing(x, y, z, col, r1, life) { return __ZC(155, 0, this, arguments, new.target); }
function pwFxTick(dt) {
for (var i = PW.fx.length - 1; i >= 0; i--) {
var F = PW.fx[i];
F.t += dt;
var k = F.t / F.life;
if (k >= 1) {
if (F.p.parent)
F.p.parent.remove(F.p);
if (F.p.geometry)
F.p.geometry.dispose();
PW.fx.splice(i, 1);
continue;
}
if (F.kind === "ring") {
var s = 0.3 + k * F.r1;
F.p.scale.set(s, s, s);
F.p.material.opacity = 0.9 * (1 - k);
continue;
}
if (F.p.material)
F.p.material.opacity = 0.95 * (1 - k * k);
if (F.kind === "rise" && typeof rise === "function")
rise(F.p, dt, 2.2, 0);
else if (F.kind === "swirl" && typeof swirl === "function")
swirl(F.p, dt, 3, 1.2, true);
else if (F.kind === "fall" && typeof fall === "function")
fall(F.p, dt, 1.5, 0);
else if (F.kind === "burst") {
var s2 = 1 + k * 2.2;
F.p.scale.set(s2, s2, s2);
}
}
}
function pwFlash(col, ms) { return __ZC(155, 1, this, arguments, new.target); }
function pwTint() {
if (typeof document === "undefined")
return;
var d = document.getElementById("pw-tint");
if (!d) {
d = document.createElement("div");
d.id = "pw-tint";
d.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:24;transition:background .6s,box-shadow .6s";
document.body.appendChild(d);
}
var bg = "transparent", sh = "none";
if (PW.under) {
bg = "rgba(20,90,120,.38)";
sh = "inset 0 0 160px rgba(0,30,50,.8)";
}
else if (PW.frozen > 0) {
bg = "rgba(150,170,210,.18)";
sh = "inset 0 0 140px rgba(60,80,140,.55)";
}
else if (PW.unseen) {
sh = "inset 0 0 120px rgba(150,120,220,.45)";
}
else if (PW.lucid) {
sh = "inset 0 0 90px rgba(255,220,140,.25)";
}
d.style.background = bg;
d.style.boxShadow = sh;
var c = (typeof renderer !== "undefined" && renderer && renderer.domElement) || null;
if (c) {
var f = PW.frozen > 0 ? "saturate(.2) brightness(1.05)" : PW.lucid ? "saturate(1.45) contrast(1.06)" : "";
if (c.style.filter !== f)
c.style.filter = f;
}
}
function pwBar() {
if (typeof document === "undefined" || !document.body)
return null;
if (!PW.bar) {
PW.bar = document.createElement("div");
PW.bar.id = "pw-bar";
PW.bar.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:29;display:none;gap:5px;flex-wrap:wrap;max-width:min(520px,calc(100vw - 24px))";
document.body.appendChild(PW.bar);
PW.bar.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-pw]");
if (!b)
return;
e.preventDefault();
e.stopPropagation();
pwUse(b.getAttribute("data-pw"));
});
}
return PW.bar;
}
var pwBarAt = 0, pwBarSig = "";
function pwBarTick(dt) {
pwBarAt -= dt;
if (pwBarAt > 0)
return;
pwBarAt = 0.4;
var b = pwBar();
if (!b)
return;
var show = typeof walkMode !== "undefined" && walkMode && !(typeof talkOpen !== "undefined" && talkOpen);
PW.keys = PW_USE.filter(function (u) { return pwHas(u.n); });
if (!show || !PW.keys.length) {
b.style.display = "none";
return;
}
var sig = PW.keys.map(function (u) { return u.n + (u.on && u.on() ? 1 : 0); }).join("|");
if (sig !== pwBarSig) {
pwBarSig = sig;
b.innerHTML = PW.keys.map(function (u, i) {
var on = u.on && u.on();
return '<button data-pw="' + esc(u.n) + '" title="' + esc(u.n) + ' (' + ((i + 1) % 10) + ')" style="min-width:44px;height:44px;padding:2px 7px;' +
'border-radius:22px;border:1px solid ' + (on ? '#E8C27A' : 'rgba(255,255,255,.25)') + ';background:' + (on ? 'rgba(232,194,122,.28)' : 'rgba(9,11,16,.72)') +
';color:#EEE;font:12px/1.1 inherit;cursor:pointer"><span style="font-size:17px">' + u.i + '</span> ' +
'<span style="opacity:.8">' + esc(u.t) + '</span><sup style="opacity:.5;margin-left:2px">' + ((i + 1) % 10) + '</sup></button>';
}).join("");
}
b.style.display = "flex";
}
function pwUse(n) { return __ZC(155, 2, this, arguments, new.target); }
function pwShimmer(col) { var P = camera.position; pwBurst(P.x, P.y - 1.7, P.z, col, 70, [1, 2.2, 1], 1.4, "swirl", 0.22); }
function pwFeet() { var P = camera.position; return { x: P.x, y: P.y - 1.72 - PW.applied, z: P.z }; }
function pwUnseen(on) {
PW.unseen = on;
pwShimmer(0xC8B8F0);
pwSay(on ? "<b>You are unseen.</b> The figures of the dream look straight through you." : "You are seen again.");
pwMeFade();
}
function pwMeFade() { return __ZC(155, 3, this, arguments, new.target); }
var PW_FORMS = [["elf", "Elf"], ["fairy", "Fairy"], ["giant", "Giant"], ["gnome", "Gnome"], ["angel", "Angel"], ["dragonborn", "Dragonborn"],
["orc", "Orc"], ["goblin", "Goblin"], ["yeti", "Yeti"], ["frogfolk", "Frog"], ["lizardfolk", "Lizard"], ["skeleton", "Skeleton"],
["ghost", "Ghost"], ["alien", "Alien"], ["dragonbeast", "Dragon"], ["dinosaur", "Dinosaur"]];
function pwShapes() { return __ZC(155, 4, this, arguments, new.target); }
function pwShape(form) { return __ZC(155, 5, this, arguments, new.target); }
var PW_SUMMON = ["dog", "fox", "stag", "horse", "owl", "cat", "bear", "dragon", "unicorn", "phoenix", "griffin", "pegasus"];
function pwSummon() { return __ZC(155, 6, this, arguments, new.target); }
function pwStopTime() {
if (PW.frozen > 0) {
PW.frozen = 0.01;
return;
}
PW.frozen = 10;
pwFlash("rgba(200,215,255,.7)", 700);
pwSay("<b>Time stops.</b> Nothing moves but you.");
if (typeof audio !== "undefined" && audio.on && typeof chime === "function")
try {
chime();
}
catch (e) { }
}
function pwHold(fn) { return function (dt) { if (PW.frozen > 0) {
arguments[0] = 0;
} return fn.apply(this, arguments); }; }
(function () {
["stepFigures", "animateEffects", "cityLifeTick", "transitTick", "atlLifeTick", "liveFigs", "liveCrit", "liveBuildings", "realmSkyTick", "armsTick", "nightTick"].forEach(function (n) {
try {
var f = window[n];
if (typeof f === "function")
window[n] = pwHold(f);
}
catch (e) { }
});
})();
function pwBlink() { return __ZC(155, 7, this, arguments, new.target); }
function pwSize() { return __ZC(155, 8, this, arguments, new.target); }
(function () {
if (typeof groundTick === "function") {
var gt = groundTick;
groundTick = function (dt) {
var P = camera.position;
P.y -= PW.applied;
var r = gt.apply(this, arguments);
PW.applied = pwWorld();
P.y += PW.applied;
return r;
};
}
if (typeof walkBy === "function") {
var wb = walkBy;
walkBy = function (mx, mz) {
var P = camera.position, off = PW.applied, k = PW.pace * (PW.wade > 0.2 && !PW.under ? 0.55 : 1);
P.y -= off;
var r = wb.call(this, mx * k, mz * k);
P.y += off;
return r;
};
}
if (typeof throughWalls === "function") {
var tw = throughWalls;
throughWalls = function () { return tw.apply(this, arguments) && PW.walls; };
}
if (typeof proximity === "function") {
var px = proximity;
proximity = function (dt) {
if (!PW.unseen)
return px.apply(this, arguments);
var keep = [];
store.characters.forEach(function (c) { if (c.awake) {
keep.push(c);
c.awake = false;
} });
try {
return px.apply(this, arguments);
}
finally {
keep.forEach(function (c) { c.awake = true; });
}
};
}
})();
function pwWorld() { return PW.eye - PW.wade; }
var PW_WATERY = { lake: 1, pond: 1, sea: 1, ocean: 1, water: 1, river: 1, lagoon: 1, pool: 1, moat: 1, bay: 1 };
function pwWaterAt(x, z) { return __ZC(155, 9, this, arguments, new.target); }
function pwWaterSheet(K) {
if (K._wsheet !== undefined)
return K._wsheet;
var w = null;
(K.parts || []).forEach(function (q) { if (!w && q.c === "water" && q.g === "pln" && q.s)
w = { x: (q.p && q.p[0]) || 0, z: (q.p && q.p[2]) || 0, hw: q.s[0] / 2, hd: q.s[1] / 2 }; });
K._wsheet = w;
return w;
}
function pwDive() { return __ZC(155, 10, this, arguments, new.target); }
var pwWaterAtT = 0, pwW = null;
function pwWaterTick(dt) {
var P = camera.position;
pwWaterAtT -= dt;
if (pwWaterAtT <= 0) {
pwWaterAtT = 0.15;
pwW = (typeof walkMode !== "undefined" && walkMode && !(typeof flyY !== "undefined" && flyY > 0.4)) ? pwWaterAt(P.x, P.z) : null;
}
var on = pwHas("walking on water"), want = 0;
if (pwW) {
if (PW.under && pwHas("breathing underwater"))
want = 0.35;
else if (!on)
want = Math.min(1.15, pwW.deep * 0.5);
}
else if (PW.under) {
PW.under = false;
pwSay("You come out of the water.");
}
pwSurface();
PW.wade += (want - PW.wade) * Math.min(1, dt * 3);
if (!pwW)
return;
PW.ripple -= dt;
if (PW.ripple <= 0) {
PW.ripple = PW.under ? 0.35 : on ? 0.45 : 0.7;
if (PW.under)
pwBurst(P.x + (Math.random() - .5), P.y - 1, P.z + (Math.random() - .5), 0xE8F8FF, 14, [0.3, 2, 0.3], 1.6, "rise", 0.09);
else
pwRing(P.x, pwW.y + 0.05, P.z, on ? 0xCFF0FF : 0xE6F2F8, on ? 2.2 : 1.4, on ? 1.2 : 0.9);
}
}
var pwLifted = null;
function pwSurface() {
var want = PW.under && pwW ? pwW.mesh : null;
if (pwLifted && pwLifted.m !== want) {
pwLifted.m.position.y = pwLifted.y;
pwLifted.mats.forEach(function (r) { r[0].side = r[1]; r[0].needsUpdate = true; });
pwLifted = null;
}
if (want && !pwLifted) {
var mats = [];
want.traverse(function (o) { if (o.material)
[].concat(o.material).forEach(function (m) { mats.push([m, m.side]); m.side = THREE.DoubleSide; m.needsUpdate = true; }); });
pwLifted = { m: want, y: want.position.y, mats: mats };
want.position.y += 3.4;
}
}
var pwFogWas = null;
function pwUnderSky() {
if (typeof scene === "undefined" || !scene.fog)
return;
if (PW.under && !pwFogWas) {
pwFogWas = { c: scene.fog.color.getHex(), n: scene.fog.near, f: scene.fog.far, d: scene.fog.density };
scene.fog.color.setHex(0x1E6A80);
if (scene.fog.near !== undefined) {
scene.fog.near = 2;
scene.fog.far = 60;
}
if (scene.fog.density !== undefined)
scene.fog.density = 0.035;
}
else if (PW.under && pwFogWas) {
scene.fog.color.setHex(0x1E6A80);
}
else if (!PW.under && pwFogWas) {
scene.fog.color.setHex(pwFogWas.c);
if (pwFogWas.n !== undefined) {
scene.fog.near = pwFogWas.n;
scene.fog.far = pwFogWas.f;
}
if (pwFogWas.d !== undefined)
scene.fog.density = pwFogWas.d;
pwFogWas = null;
}
}
var PW_DEAD_NAMES = ["a spirit", "the drowned woman", "the old soldier", "a grandmother long gone", "the lost child", "the lantern-bearer", "the first dreamer"];
function pwDead() { return __ZC(155, 11, this, arguments, new.target); }
function pwGhostTick() {
var G = PW.ghost;
if (!G)
return;
var P = camera.position, g = meshes[G.spec.id];
if (g) {
g.position.y = (g.userData.pwBase === undefined ? (g.userData.pwBase = g.position.y) : g.userData.pwBase) + 0.25 + Math.sin(performance.now() / 700) * 0.12;
}
if (Math.hypot(P.x - G.spec.x, P.z - G.spec.z) > 45 || (G.spec.realm || 0) !== (store.here || 0)) {
pwBurst(G.spec.x, 0.5, G.spec.z, 0xCFE8F0, 60, [0.8, 2.4, 0.8], 1.4, "rise", 0.5);
var k = store.objects.indexOf(G.spec);
if (k > -1)
store.objects.splice(k, 1);
var j = store.characters.indexOf(G.c);
if (j > -1)
store.characters.splice(j, 1);
if (g) {
scene.remove(g);
delete meshes[G.spec.id];
}
PW.ghost = null;
}
}
function pwLucid(on) {
PW.lucid = on;
pwSay(on ? "<b>You know you are dreaming.</b> The colours sharpen; the dream is listening." : "The dream softens again.");
pwFlash("rgba(255,236,190,.5)", 700);
}
var pwLucidAt = 0;
function pwLucidTick(dt) {
if (!PW.lucid)
return;
pwLucidAt -= dt;
if (pwLucidAt > 0)
return;
pwLucidAt = 0.8;
var P = camera.position;
pwBurst(P.x, P.y - 2.2, P.z, 0xFFE8B0, 26, [7, 4, 7], 2.6, "rise", 0.18);
}
function pwRemake() { return __ZC(155, 12, this, arguments, new.target); }
function pwReveal() { return __ZC(155, 13, this, arguments, new.target); }
function pwAuraClear() { PW.aura.forEach(function (s) { if (s.parent)
s.parent.remove(s); }); PW.aura = []; }
function pwAuraTick(dt) {
if (!PW.aura.length)
return;
PW.auraT -= dt;
var k = Math.max(0, Math.min(1, PW.auraT / 2));
PW.aura.forEach(function (s, i) { s.material.opacity = (0.6 + 0.25 * Math.sin(performance.now() / 300 + i)) * k; });
if (PW.auraT <= 0)
pwAuraClear();
}
function pwHeal() { return __ZC(155, 14, this, arguments, new.target); }
var pwTrailAt = 0;
function pwFlyTick(dt) {
if (typeof flyY === "undefined" || flyY < 1 || !walkMode)
return;
pwTrailAt -= dt;
if (pwTrailAt > 0)
return;
pwTrailAt = 0.25;
var P = camera.position, fl = pwHas("floating") && !pwHas("flying");
pwBurst(P.x, P.y - 2, P.z, fl ? 0xFFF0D0 : 0xE8F2FF, 12, [0.6, 1.4, 0.6], 1.2, fl ? "rise" : "fall", 0.14);
}
function pwTick(dt) {
if (PW.frozen > 0) {
PW.frozen -= dt;
if (PW.frozen <= 0) {
PW.frozen = 0;
pwSay("Time moves again.");
pwBarSig = "";
}
}
if (store.inside && PW.size !== 0) {
PW.size = 0;
PW.eye = 0;
PW.pace = 1;
}
pwFxTick(dt);
pwBarTick(dt);
pwWaterTick(dt);
pwGhostTick();
pwLucidTick(dt);
pwAuraTick(dt);
pwFlyTick(dt);
pwUnderSky();
pwTint();
if (PW.unseen && typeof meG !== "undefined" && meG && !meG.userData.pwFaded) {
meG.userData.pwFaded = 1;
pwMeFade();
}
}
(function () {
if (typeof avatarTick === "function") {
var at = avatarTick;
avatarTick = function (dt) { var r = at.apply(this, arguments); try {
pwTick(dt);
}
catch (e) {
if (window.console && !PW.warned) {
PW.warned = 1;
console.warn("[powers]", e);
}
} return r; };
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!walkMode || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var m = /^Digit([0-9])$/.exec(e.code || "");
if (!m)
return;
var i = (+m[1] + 9) % 10, u = PW.keys[i];
if (!u)
return;
e.preventDefault();
pwUse(u.n);
});
})();
(function () {
if (typeof KIT === "undefined" || typeof S !== "function")
return;
if (!KIT.stormcall)
S("stormcall", "infra", [8, 14, 8], [
{ g: "sph", s: [3.2], p: [0, 12, 0], c: 0x3A4250, opa: .92 },
{ g: "sph", s: [2.4], p: [2.4, 11.6, .8], c: 0x434B5A, opa: .92 },
{ g: "sph", s: [2.2], p: [-2.2, 11.8, -.6], c: 0x434B5A, opa: .92 },
{ g: "box", s: [.16, 5.5, .16], p: [.6, 6.5, 0], r: [0, 0, .18], c: 0xE8F0FF, glow: 1 },
{ g: "box", s: [.12, 4, .12], p: [1.2, 3, .2], r: [0, 0, -.3], c: 0xE8F0FF, glow: 1 }
], ["storm call", "i called a storm", "a storm i called down", "the storm came at my call", "stormcall"]);
if (!KIT.veilspell)
S("veilspell", "infra", [6, 5, 6], [
{ g: "sph", s: [2.6], p: [0, 1.4, 0], c: 0xC8BCE8, glow: 1, opa: .22, pulse: 1 },
{ g: "tor", s: [2.6, .04], p: [0, 1.4, 0], r: [Math.PI / 2, 0, 0], c: 0xE8DFFF, glow: 1 },
{ g: "tor", s: [2.2, .03], p: [0, 2.4, 0], r: [Math.PI / 2, 0, 0], c: 0xE8DFFF, glow: 1 }
], ["a veil", "veil of mist", "glamour", "a veiling spell", "hidden behind a veil"]);
if (typeof WORKING !== "undefined" && WORKING.lightning && !WORKING.lightningbolt)
WORKING.lightningbolt = WORKING.lightning;
if (typeof EFFECTS === "undefined" || typeof particles !== "function")
return;
if (!EFFECTS.iceblast)
EFFECTS.iceblast = function (g) {
var p = particles(70, [2, 1.6, 2], 0xE8F8FF, 0.7, 0.8);
g.add(p);
return function (t, dt) { fall(p, dt, 0.6, 0); g.children.forEach(function (m, i) { if (m.isMesh)
m.scale.y = 1 + Math.sin(t * 2 + i) * 0.04; }); };
};
if (!EFFECTS.blessing)
EFFECTS.blessing = function (g) {
var p = particles(60, [1.4, 4.2, 1.4], 0xFFE8B0, 0.9, 0.85);
g.add(p);
return function (t, dt) { rise(p, dt, 1, 0); if (g.children[0])
g.children[0].rotation.y = t * 0.3; };
};
if (!EFFECTS.banishing)
EFFECTS.banishing = function (g) {
var p = particles(80, [2.2, 3.4, 2.2], 0xF4F0E6, 0.8, 0.8);
g.add(p);
return function (t, dt) {
swirl(p, dt, 2.2, 1.6, true);
if (g.children[0]) {
var s = 1 + ((t * 0.6) % 1) * 0.6;
g.children[0].scale.set(s, s, s);
}
g.children.forEach(function (m, i) { if (i > 0 && m.isMesh)
m.rotation.y = t * 0.8; });
};
};
if (!EFFECTS.stormcall)
EFFECTS.stormcall = function (g) {
var rain = particles(220, [3.6, 10, 3.6], 0xA8B8D0, 0.35, 0.7);
rain.position.y = 1;
g.add(rain);
return function (t, dt) {
fall(rain, dt, 14, 0.4);
var on = true;
g.children.forEach(function (m, i) { if (i === 3 || i === 4)
m.visible = on; });
};
};
if (!EFFECTS.veilspell)
EFFECTS.veilspell = function (g) {
var p = particles(70, [2.4, 2.8, 2.4], 0xE8DFFF, 0.6, 0.6);
g.add(p);
return function (t, dt) { swirl(p, dt, 0.6, 0.4, false); if (g.children[1])
g.children[1].rotation.z = t * 0.5; if (g.children[2])
g.children[2].rotation.z = -t * 0.4; };
};
if (typeof attachEffect === "function") {
var ae = attachEffect;
attachEffect = function (g, spec) {
ae.apply(this, arguments);
if (g.userData.anim)
return;
var mats = [];
g.traverse(function (c) { if (c.material && c.material.userData && c.material.userData.pulse)
mats.push(c.material); });
if (!mats.length)
return;
mats.forEach(function (m) { m.userData.pwBase = m.opacity; });
var ph = Math.random() * 6;
g.userData.anim = function (t) { var k = 0.72 + 0.28 * Math.sin(t * 2.4 + ph); mats.forEach(function (m) { m.opacity = m.userData.pwBase * k; }); };
};
}
})();
if (typeof HELD !== "undefined" && !HELD.orb)
HELD.orb = function () {
var g = new THREE.Group();
g.add(P(sph(.11), new THREE.MeshBasicMaterial({ color: 0xC8A0FF, transparent: true, opacity: .9 }), 0, .16, 0));
g.add(P(cyl(.07, .09, .08, 10), mL(0x4A4238), 0, .03, 0));
return g;
};
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried, swing = 0;
useCarried = function () {
if (!carrying || shotCool > 0)
return uc.apply(this, arguments);
var A = ARMS[carrying.archetype];
if (A && !A.shot && A.held !== "torch") {
shotCool = 0.45;
swing = 0.35;
var P = camera.position, f = pwFwd(), hx = P.x + f.x * 1.6, hz = P.z + f.z * 1.6, hy = P.y - 0.5;
if (A.held === "shield") {
pwRing(P.x, P.y - 1.2, P.z, 0x9FD8FF, 2.2, 0.6);
pwSay("You raise the shield.");
return;
}
var arc = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.04, 4, 24, Math.PI * 0.9), new THREE.MeshBasicMaterial({ color: 0xF2F6FF, transparent: true, opacity: 0.8, depthWrite: false }));
arc.position.set(hx - f.x * 0.6, hy, hz - f.z * 0.6);
arc.rotation.set(-Math.PI / 2 + 0.35, 0, -yaw - Math.PI * 0.45);
scene.add(arc);
PW.fx.push({ p: arc, t: 0, life: 0.28, kind: "arc" });
var hit = false;
if (typeof blockedAt === "function" && blockedAt(hx, hz, P.y - 1.72))
hit = true;
store.objects.forEach(function (o) { if (!hit && (o.realm || 0) === (store.here || 0) && !o.carried && Math.hypot(o.x - hx, o.z - hz) < 1.4 && meshes[o.id])
hit = true; });
if (hit) {
pwBurst(hx, hy, hz, 0xFFD890, 26, [0.3, 0.4, 0.3], 0.45, "burst", 0.12);
pwSay("The " + esc(carriedName()) + " strikes home.");
}
else
pwSay("You swing the " + esc(carriedName()) + ".");
return;
}
var r = uc.apply(this, arguments);
if (A && A.shot === "shot") {
var P2 = camera.position, f2 = pwFwd();
pwBurst(P2.x + f2.x * 1.4, P2.y - 0.3, P2.z + f2.z * 1.4, 0xFFE0A0, 18, [0.12, 0.12, 0.12], 0.18, "burst", 0.1);
}
if (A && A.shot === "sound") {
var P3 = camera.position;
pwRing(P3.x, P3.y - 0.5, P3.z, 0xE6DCC2, 14, 1.2);
}
if (A && /fire|lightning|ice|light/.test(A.shot)) {
var P4 = camera.position, f4 = pwFwd(), c4 = (SHOT[A.shot] || {}).col || 0xFFFFFF;
pwBurst(P4.x + f4.x * 1.5, P4.y - 0.35, P4.z + f4.z * 1.5, c4, 24, [0.2, 0.25, 0.2], 0.35, "burst", 0.12);
}
return r;
};
if (typeof showCarried === "function" && typeof armsTick === "function") {
var atk = armsTick;
armsTick = function (dt) {
var r = atk.apply(this, arguments);
if (carryMesh) {
if (swing > 0) {
swing -= dt;
var k = Math.sin((1 - swing / 0.35) * Math.PI);
carryMesh.rotation.x = -k * 1.6;
}
else
carryMesh.rotation.x = 0;
}
if (shots.length && typeof particles === "function") {
shots.forEach(function (s) {
if (!s.lands)
return;
s.tr = (s.tr || 0) - dt;
if (s.tr > 0)
return;
s.tr = 0.05;
var p = s.g.position;
pwBurst(p.x, p.y, p.z, (SHOT[(ARMS[(carrying || {}).archetype] || {}).shot] || {}).trail || 0xFFFFFF, 6, [0.15, 0.15, 0.15], 0.35, "burst", 0.16);
});
}
return r;
};
}
})();
(function () {
if (typeof defeatNightmare !== "function")
return;
var WAYFX = { light: "healinglight", embrace: "healinglight", fire: "fireball", prayer: "blessing", command: "banishing", name: "banishing",
face: "shieldspell", strike: "lightningbolt" };
var ABFX = { "summoning": "summoning", "healing": "healinglight", "changing the dream": "transmute", "becoming unseen": "veilspell",
"stopping time": "iceblast", "speaking with the dead": "banishing", "knowing it was a dream": "blessing", "changing shape": "transmute" };
var dn = defeatNightmare;
defeatNightmare = function (c, way) {
try {
var g = c && meshes[c.objId], w = String(way || "");
if (g) {
var x = g.position.x, z = g.position.z, k = w.indexOf("ability:") === 0 ? (ABFX[w.slice(8)] || "banishing") : WAYFX[w];
if (k && KIT[k] && typeof landWorking === "function")
landWorking(k, x, 0, z);
if (w === "song" || w === "laugh")
pwRing(x, 0.4, z, 0xE6DCC2, 9, 1.4);
if (w === "strike")
pwBurst(x, 1.2, z, 0xFFD890, 40, [0.6, 0.8, 0.6], 0.6, "burst", 0.2);
if (w.indexOf("ability:") === 0)
pwFlash("rgba(255,240,210,.35)", 600);
}
}
catch (e) { }
return dn.apply(this, arguments);
};
})();
(function () {
if (typeof tlFigTick !== "function")
return;
var ft = tlFigTick, TS = { step: -1, smoke: null, beam: null, at: 0 };
function clear() { [TS.smoke, TS.beam].forEach(function (o) { if (o && o.parent)
o.parent.remove(o); }); TS.smoke = TS.beam = null; TS.step = -1; }
tlFigTick = function (dt, n) {
var r = ft.apply(this, arguments);
try {
var live = n && (n.kind === "standin" || n.kind === "local" || n.kind === "server") && typeof INT !== "undefined" && INT && INT.temple && INT.root;
if (!live) {
if (TS.step > -1)
clear();
return r;
}
var T = INT.temple, root = INT.root, st = n.step | 0, off = T.offerAt || T.priestAt, img = T.imgAt;
if (TS.root !== root) {
clear();
TS.root = root;
}
if (!TS.smoke && typeof particles === "function") {
TS.smoke = particles(110, [0.4, 5, 0.4], 0xE2DCD2, 0.5, 0.55);
TS.smoke.position.set(off.x, (off.y || 0) + 0.9, off.z);
root.add(TS.smoke);
}
if (!TS.beam && img) {
TS.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.6, 7, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFF0C8, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
TS.beam.position.set(img.x, (img.y || 0) + 3.5, img.z);
root.add(TS.beam);
}
if (TS.smoke) {
TS.smoke.visible = st >= 1 && st <= 3;
if (TS.smoke.visible)
rise(TS.smoke, dt, 0.5, 0.05);
}
if (TS.beam) {
var want = st === 2 ? 0.3 : st === 3 ? 0.12 : 0;
TS.beam.material.opacity += (want - TS.beam.material.opacity) * Math.min(1, dt * 1.5);
}
if (st !== TS.step) {
TS.step = st;
var wp = new THREE.Vector3();
if (st === 0) {
root.localToWorld(wp.set(img.x, (img.y || 0) + 1, img.z));
pwBurst(wp.x, wp.y, wp.z, 0xFFC870, 60, [1.6, 1.4, 1.6], 2, "rise", 0.25);
}
if (st === 3) {
root.localToWorld(wp.set(off.x, (off.y || 0) + 1, off.z));
pwBurst(wp.x, wp.y, wp.z, 0xFFE8A8, 50, [0.6, 1, 0.6], 1.6, "rise", 0.22);
}
if (st === 4) {
root.localToWorld(wp.set(T.priestAt.x, (T.priestAt.y || 0) + 2.5, T.priestAt.z + 3));
pwBurst(wp.x, wp.y, wp.z, 0xFFF4D8, 160, [6, 3, 6], 3.5, "fall", 0.3);
}
}
}
catch (e) {
if (window.console && !TS.warned) {
TS.warned = 1;
console.warn("[temple fx]", e);
}
}
return r;
};
})();
