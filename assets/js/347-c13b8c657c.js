/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DGB_KINDS = {
cavespider: { name: "Giant cave spider", body: "kit", arch: "spider", scale: 3.2, hp: 70, spd: 4.6, dmg: 9, reach: 3.1, spoil: ["Deep spider's silk", "🕸️"], growl: 180 },
renegade: { name: "Renegade of a fallen House", body: "person", species: "elf", arm: "dagger", hp: 55, spd: 4.4, dmg: 10, reach: 1.9,
look: { skin: 0x4E4A5E, hair: 0xE8E4F0, hairStyle: "long", top: 0x1E1A26, bottom: 0x16141C, hat: "hood", hatColor: 0x14121A, back: "cloak", backColor: 0x2A1A3A, shoes: 0x101014 }, spoil: ["Fallen House signet", "💍"], growl: 240 },
deeptroll: { name: "Deep troll", body: "kit", arch: "troll", hp: 170, spd: 2.9, dmg: 16, reach: 2.8, big: 1, spoil: ["Deep troll's knuckle-stone", "🪨"], growl: 110 },
tunnelgob: { name: "Tunnel goblin", body: "person", species: "goblin", arm: "dagger", scale: 0.8, hp: 35, spd: 4.6, dmg: 7, reach: 1.7, spoil: ["Goblin's stolen lamp-wick", "🕯️"], growl: 300 },
deepshade: { name: "Shade of the deep", body: "kit", arch: "wraith", glow: 0x8A6AE0, hp: 50, spd: 3.6, dmg: 9, reach: 2, shot: { r: 14, c: 0x9A6AE0 }, spoil: ["Shade's cold ember", "🌑"], growl: 150 },
rockcrawler: { name: "Caloris rock-crawler", body: "kit", arch: "scorpion", scale: 2.6, hp: 80, spd: 4.0, dmg: 11, reach: 3.1, spoil: ["Rock-crawler's sting", "🦂"], growl: 170 },
slaggolem: { name: "Slag ogre", body: "kit", arch: "ogre", hp: 180, spd: 2.4, dmg: 17, reach: 2.8, big: 1, spoil: ["Ogre's cooled-slag tooth", "🦷"], growl: 90 },
sunwisp: { name: "Sunflare wisp", body: "kit", arch: "fireelemental", hp: 45, spd: 3.8, dmg: 8, reach: 2, shot: { r: 15, c: 0xFFB24A }, spoil: ["Spark of the Sun", "☀️"], growl: 420 },
sulphraider: { name: "Sulphur-scale raider", body: "person", species: "lizardfolk", arm: "spear", hp: 60, spd: 3.9, dmg: 11, reach: 3, spoil: ["Sulphur-scale", "🦎"], growl: 200 },
brimcrawler: { name: "Brimstone crawler", body: "kit", arch: "scorpion", scale: 2.2, hp: 65, spd: 4.2, dmg: 9, reach: 3.1, spoil: ["Brimstone claw", "🦂"], growl: 190 },
acidwraith: { name: "Acid-cloud wraith", body: "kit", arch: "airelemental", hp: 45, spd: 3.6, dmg: 8, reach: 2, shot: { r: 14, c: 0xC8E04A }, spoil: ["Bottled cloud", "🌫️"], growl: 360 },
glassstalker: { name: "Glass-legged stalker", body: "kit", arch: "spider", scale: 2.8, hp: 65, spd: 4.8, dmg: 9, reach: 3.1, spoil: ["Singing glass shard", "🔮"], growl: 520 },
songbreaker: { name: "Songbreaker", body: "person", species: "alien", arm: "blaster", hp: 50, spd: 3.8, dmg: 9, reach: 2, shot: { r: 18, c: 0xF08AD8 }, spoil: ["Broken tuning-crystal", "💎"], growl: 330 },
discord: { name: "Discord shade", body: "kit", arch: "banshee", hp: 45, spd: 3.8, dmg: 8, reach: 2, shot: { r: 13, c: 0xC8A0F0 }, spoil: ["A sour note, kept in glass", "🎐"], growl: 470 },
emberhound: { name: "Ember hound", body: "kit", arch: "hellhound", hp: 75, spd: 5.2, dmg: 11, reach: 2.2, spoil: ["Ember hound's fang", "🦷"], growl: 130 },
cinderimp: { name: "Cinder imp", body: "kit", arch: "imp", hp: 35, spd: 4.6, dmg: 7, reach: 1.6, shot: { r: 13, c: 0xFF7A3A }, spoil: ["Imp's horn-tip", "😈"], growl: 380 },
brimfiend: { name: "Brimstone fiend", body: "kit", arch: "demon", hp: 190, spd: 3.2, dmg: 17, reach: 2.6, big: 1, spoil: ["Fiend's brimstone heart", "🔥"], growl: 95 },
restless: { name: "Restless bones", body: "person", species: "skeleton", arm: "longsword", hp: 40, spd: 3.2, dmg: 10, reach: 2.3, spoil: ["Old bone token", "🦴"], growl: 260 },
watcher: { name: "Watcher in the dark", body: "kit", arch: "floatingeye", hp: 55, spd: 3.0, dmg: 8, reach: 2, shot: { r: 16, c: 0xA8C8FF }, spoil: ["The Watcher's glassy lens", "👁️"], growl: 280 },
hollowshade: { name: "Hollow shade", body: "kit", arch: "wraith", glow: 0x8A9AE8, hp: 50, spd: 3.8, dmg: 10, reach: 2, spoil: ["A scrap of the dark", "🌑"], growl: 140 },
faceless: { name: "The Faceless Walker", body: "kit", arch: "tallman", hp: 120, spd: 3.0, dmg: 14, reach: 2.6, big: 1, spoil: ["The Walker's blank mask", "🎭"], growl: 100 },
emberel: { name: "Ember elemental", body: "kit", arch: "fireelemental", hp: 70, spd: 3.4, dmg: 10, reach: 2.2, shot: { r: 15, c: 0xFF8A3A }, spoil: ["Ever-warm ember", "🔥"], growl: 160 },
ashhound: { name: "Ash hound", body: "kit", arch: "hellhound", hp: 75, spd: 5.2, dmg: 11, reach: 2.2, spoil: ["Ash hound's fang", "🦷"], growl: 130 },
kilnimp: { name: "Kiln imp", body: "kit", arch: "imp", hp: 35, spd: 4.6, dmg: 7, reach: 1.6, shot: { r: 13, c: 0xFF9A4A }, spoil: ["Imp's soot-black tail-tip", "😈"], growl: 390 },
magmagolem: { name: "Magma brute", body: "kit", arch: "oni", hp: 200, spd: 2.4, dmg: 18, reach: 2.8, big: 1, spoil: ["Magma brute's horn", "🌋"], growl: 85 },
dustscorp: { name: "Dust scorpion", body: "kit", arch: "scorpion", scale: 2.4, hp: 70, spd: 4.2, dmg: 10, reach: 3.1, spoil: ["Dust scorpion's sting", "🦂"], growl: 200 },
scavhog: { name: "Tusked scavenger hog", body: "kit", arch: "boar", scale: 1.6, hp: 80, spd: 5.0, dmg: 10, reach: 2, spoil: ["Scavenger hog's tusk", "🐗"], growl: 150 },
ashhusk: { name: "Ash husk", body: "kit", arch: "zombie", hp: 55, spd: 2.6, dmg: 9, reach: 1.9, spoil: ["Husk's rusted tag", "🏷️"], growl: 120 },
roadraider: { name: "Road raider", body: "person", arm: "revolver", hp: 55, spd: 3.8, dmg: 8, reach: 2, shot: { r: 20, c: 0xFFE08A },
look: { layer: "longcoat", layerColor: 0x5A4632, hat: "brimmed", hatColor: 0x3A2E22, top: 0x8A6A4A, bottom: 0x3A3A3A, shoes: 0x2A2018 }, spoil: ["Raider's bent hubcap badge", "🛞"], growl: 230 },
canyonscorp: { name: "Sunscour scorpion", body: "kit", arch: "scorpion", scale: 2.4, hp: 70, spd: 4.3, dmg: 10, reach: 3.1, spoil: ["Sunscour sting", "🦂"], growl: 200 },
rimeyeti: { name: "Rimeglass yeti", body: "person", species: "yeti", arm: "fists", scale: 1.25, hp: 130, spd: 3.4, dmg: 14, reach: 2.4, big: 1, spoil: ["Tuft of rimeglass fur", "🐾"], growl: 100 },
snowbear: { name: "Snow bear", body: "kit", arch: "bear", hp: 120, spd: 4.4, dmg: 13, reach: 2.3, big: 1, spoil: ["Snow bear's claw", "🐻"], growl: 110 },
lavawisp: { name: "Caldera wisp", body: "kit", arch: "fireelemental", hp: 55, spd: 3.8, dmg: 9, reach: 2, shot: { r: 15, c: 0xFF7A2A }, spoil: ["Caldera cinder", "🌋"], growl: 410 },
mirespider: { name: "Mirewild spider", body: "kit", arch: "spider", scale: 2.8, hp: 65, spd: 4.6, dmg: 9, reach: 3.1, spoil: ["Mire silk", "🕸️"], growl: 190 },
mirelizard: { name: "Mirewild lizard-kin", body: "person", species: "lizardfolk", arm: "spear", hp: 60, spd: 3.9, dmg: 11, reach: 3, spoil: ["Shed lizard-kin scale", "🦎"], growl: 210 },
trackdrone: { name: "Rogue track drone", body: "drone", fly: 2.6, hp: 40, spd: 4.4, dmg: 7, reach: 2, shot: { r: 18, c: 0x6AC8FF }, spoil: ["Drone's power cell", "🔋"], growl: 600 },
wildbear: { name: "Wild bear", body: "kit", arch: "bear", hp: 120, spd: 4.4, dmg: 13, reach: 2.3, big: 1, spoil: ["Bear's claw", "🐻"], growl: 110 },
wildboar: { name: "Wild boar", body: "kit", arch: "boar", scale: 1.4, hp: 70, spd: 5.0, dmg: 9, reach: 2, spoil: ["Boar's tusk", "🐗"], growl: 150 },
werewolf: { name: "Werewolf", body: "kit", arch: "werewolf", hp: 110, spd: 5.0, dmg: 12, reach: 2.2, spoil: ["Werewolf's claw", "🐺"], growl: 140 },
bandit: { name: "Bandit", body: "person", arm: "cutlass", hp: 55, spd: 3.9, dmg: 9, reach: 2.1,
look: { hat: "hood", hatColor: 0x3A2E22, top: 0x5A4A3A, bottom: 0x3A3028, back: "cloak", backColor: 0x4A3A2A }, spoil: ["Bandit's lucky coin", "🪙"], growl: 240 }
};
var DGB_WHERE = {
underdark: ["cavespider", "cavespider", "renegade", "deeptroll", "tunnelgob", "deepshade"],
mercury: ["rockcrawler", "rockcrawler", "slaggolem", "sunwisp"],
venus: ["sulphraider", "brimcrawler", "acidwraith", "sulphraider"],
veyar: ["glassstalker", "songbreaker", "discord", "glassstalker"],
underworld: ["emberhound", "cinderimp", "brimfiend", "restless", "emberhound"],
void: ["watcher", "hollowshade", "faceless", "watcher"],
fire: ["emberel", "ashhound", "kilnimp", "magmagolem", "ashhound"],
wasteland: ["dustscorp", "scavhog", "ashhusk", "roadraider", "dustscorp"],
race: ["canyonscorp", "lavawisp", "trackdrone"],
"race:canyon": ["canyonscorp", "canyonscorp", "bandit"],
"race:tundra": ["rimeyeti", "snowbear"],
"race:ice": ["rimeyeti", "snowbear"],
"race:lava": ["lavawisp", "ashhound", "lavawisp"],
"race:jungle": ["mirespider", "mirelizard", "wildboar"],
"race:sky": ["trackdrone", "trackdrone"],
other: ["wildbear", "wildboar", "werewolf", "bandit"]
};
var DGB_PACE = { 3: { first: [45, 90], next: [70, 150], n: [1, 2] }, 4: { first: [25, 55], next: [40, 95], n: [2, 3] } };
var DGB = { on: [], orbs: [], t: 0, next: -1, here: null, said: 0, engaged: 0, quiet: 99, cool: 0, hud: null, btn: null, myFn: null, seq: 0, force: false, e1: 0 };
var DGB_RING = 30, DGB_GIVEUP = 75;
function dgbLite() { return typeof LITE !== "undefined" && !!LITE; }
function dgbCap() { return dgbLite() ? 2 : (typeof GFX_PHONE !== "undefined" && GFX_PHONE) ? 3 : 4; }
function dgbRand(a) { return a[0] + Math.random() * (a[1] - a[0]); }
function dgbKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function dgbLevel() { try {
var id = dgrWhere();
if (id === "battle")
return 0;
return dgrLevelOf(id);
}
catch (e) {
return 0;
} }
function dgbList() {
var id = dgrWhere();
if (id === "race" && typeof PY !== "undefined" && PY.zone && DGB_WHERE["race:" + PY.zone])
return DGB_WHERE["race:" + PY.zone];
return DGB_WHERE[id] || DGB_WHERE.other;
}
function dgbIndoors() {
if (store.inside)
return true;
if (typeof GR !== "undefined" && GR.inside && WLD.on && /^gr_/.test(WLD.on))
return true;
if (WLD.on === "underdark" && typeof UDX !== "undefined" && UDX.here && (UDX.here.kind === "inside" || UDX.here.kind === "mine"))
return true;
return false;
}
function dgbBarred(x, z, feet) { return __ZC(347, 0, this, arguments, new.target); }
function dgbOpen() { return __ZC(347, 1, this, arguments, new.target); }
function dgbBody(K, seed) { return __ZC(347, 2, this, arguments, new.target); }
function dgbGround(x, z, feet) {
var W = WLD.w;
if (!W)
return null;
var h = 0;
try {
h = W.ground ? W.ground(x, z, feet) : 0;
}
catch (e) {
return null;
}
if (h == null || !isFinite(h) || h < -60)
return null;
return +h;
}
function dgbBlocked(x, z, feet) { var W = WLD.w; try {
return !!(W.block && W.block(x, z, feet));
}
catch (e) {
return true;
} }
function dgbSpot(feet) { return __ZC(347, 3, this, arguments, new.target); }
function dgbMeet() { return __ZC(347, 4, this, arguments, new.target); }
function dgbSpell(n) { try {
return typeof window[n] === "function" ? window[n]() : null;
}
catch (e) {
return null;
} }
function dgbUp(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function dgbA(n) { return /^the /i.test(n) ? n : (/^[aeiou]/i.test(n) ? "an " : "a ") + n; }
function dgbArrow(B) {
var L = dgrMeLocal(), rel = Math.atan2(-(B.x - L.x), -(B.z - L.z)) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
return Math.abs(rel) < 0.6 ? "ahead of you" : Math.abs(rel) > 2.5 ? "behind you" : rel > 0 ? "on your left" : "on your right";
}
function dgbTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function dgbRemove(B) { if (B.g && B.g.parent)
B.g.parent.remove(B.g); var i = DGB.on.indexOf(B); if (i > -1)
DGB.on.splice(i, 1); }
function dgbClear() { DGB.on.slice().forEach(dgbRemove); DGB.orbs.slice().forEach(dgbOrbOff); DGB.engaged = 0; }
function dgbTurn(a, b, k) { var d = Math.atan2(Math.sin(b - a), Math.cos(b - a)); return a + Math.max(-k, Math.min(k, d)); }
function dgbHover(K) { if (K.hover !== undefined)
return K.hover; K.hover = K.body === "drone" || !!(K.arch && typeof CREATURE !== "undefined" && CREATURE[K.arch] && CREATURE[K.arch].kind === "float"); return K.hover; }
function dgbStep(B, mx, mz, sp, dt) { return __ZC(347, 5, this, arguments, new.target); }
function dgbTick1(B, dt, open, L, feet) { return __ZC(347, 6, this, arguments, new.target); }
function dgbBlow(B, d, dy) {
var K = B.k;
if (d > K.reach + (K.big ? 1.4 : 0.9) || dy > 2.5)
return;
B.cool = (K.big ? 2.2 : 1.5) * (0.85 + Math.random() * 0.5);
dgbHurt(Math.round(K.dmg * (0.85 + Math.random() * 0.3)), K.name);
}
function dgbThrow(B, L, feet) { return __ZC(347, 7, this, arguments, new.target); }
function dgbOrbOff(o) { if (o.m.parent)
o.m.parent.remove(o.m); o.m.geometry.dispose(); o.m.material.dispose(); var i = DGB.orbs.indexOf(o); if (i > -1)
DGB.orbs.splice(i, 1); }
function dgbOrbsTick(dt, L, feet) { return __ZC(347, 8, this, arguments, new.target); }
function dgbHurt(d, name) { return __ZC(347, 9, this, arguments, new.target); }
function dgbBeaten(name) { return __ZC(347, 10, this, arguments, new.target); }
function dgbTarget() { return __ZC(347, 11, this, arguments, new.target); }
function dgbMyDmg() {
var base = 11;
try {
if (carrying) {
base = 16;
var k = String(carrying.archetype || "");
if (/^bw_/.test(k) && BW_ARMS[k.slice(3)])
base = Math.max(base, BW_ARMS[k.slice(3)].dmg);
}
}
catch (e) { }
return Math.round(base * (0.9 + Math.random() * 0.3));
}
function dgbStrike(B) { return __ZC(347, 12, this, arguments, new.target); }
function dgbSpellHit(B, dmg) {
if (!B || B.st === "dead")
return;
dmg = Math.max(0, +dmg || 0);
if (!dmg)
return;
B.hp -= dmg;
DGB.engaged = 8;
if (B.st === "leave" && !(B.calm > 0))
B.st = "come";
if (B.hp <= 0)
dgbFell(B);
}
function dgbFell(B) { return __ZC(347, 13, this, arguments, new.target); }
function dgbData() { var d = store.dgb; if (!d || typeof d !== "object")
d = store.dgb = {}; if (!Array.isArray(d.trophies))
d.trophies = []; return d; }
function dgbTick(dt) {
dt = Math.min(dt, 0.1);
DGB.t += dt;
if (DGB.cool > 0)
DGB.cool -= dt;
if (DGB.engaged > 0)
DGB.engaged -= dt;
var inW = typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.w.g;
var here = inW ? WLD.on + ":" + dgrWhere() : null;
if (here !== DGB.here) {
DGB.here = here;
dgbClear();
DGB.next = -1;
}
if (!inW) {
dgbHudTick(dt, null, false);
return;
}
if (DGB.on.length && DGB.on[0].wg !== WLD.w.g)
dgbClear();
var open = dgbOpen(), L = dgrMeLocal(), feet = camera.position.y - 1.72;
if (open) {
var lv = dgbLevel(), P = DGB_PACE[lv >= 4 ? 4 : 3];
if (DGB.next < 0)
DGB.next = dgbRand(P.first);
if (!DGB.on.length) {
DGB.next -= dt;
if (DGB.next <= 0) {
DGB.next = dgbMeet() ? dgbRand(P.next) : 8;
}
}
}
for (var i = DGB.on.length - 1; i >= 0; i--) {
var B = DGB.on[i];
try {
dgbTick1(B, dt, open, L, feet);
}
catch (e) {
dgbRemove(B);
if (!DGB.e1) {
DGB.e1 = 1;
if (window.console)
console.warn("[beasts]", e);
}
}
}
dgbOrbsTick(dt, L, feet);
DGB.quiet += dt;
if (DGB.quiet > 8 && DGR.hp < DGR.max && !DGR.downT && !(typeof dgrFightHere === "function" && dgrFightHere()))
DGR.hp = Math.min(DGR.max, DGR.hp + dt * 5);
var tgt = open ? dgbTarget() : null;
var mine = !!WLD.promptFn && WLD.promptFn === DGB.myFn;
if (tgt && (!WLD.promptFn || mine || WLD.promptFn === DGR.myFn)) {
var fn = function () { dgbStrike(tgt); };
worldPrompt("⚔️ <b>" + esc(tgt.k.name) + "</b> · <b>press E</b> to strike", fn);
DGB.myFn = fn;
}
else if (mine) {
worldPrompt(null);
DGB.myFn = null;
}
dgbHudTick(dt, tgt, open);
}
function dgbHudTick(dt, tgt, open) {
if (!DGB.btn && document.body) {
var b = document.createElement("button");
b.id = "dgb-btn";
b.type = "button";
b.textContent = "⚔️ Strike";
b.style.cssText = "position:fixed;z-index:45;display:none;right:calc(12px + env(safe-area-inset-right,0px));bottom:calc(296px + env(safe-area-inset-bottom,0px));" +
"background:rgba(40,14,12,.92);color:#FFE0D0;border:1px solid #C86A5A;border-radius:18px;padding:9px 16px;font:600 14px system-ui,sans-serif";
b.onclick = function (ev) { ev.stopPropagation(); var B = dgbTarget(); if (B)
dgbStrike(B); };
document.body.appendChild(b);
DGB.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["dgb-btn"] = 1;
}
if (DGB.btn) {
var touch = typeof padTouch === "function" ? padTouch() : (typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches);
var bs = (tgt && touch) ? "block" : "none";
if (DGB.btn.style.display !== bs)
DGB.btn.style.display = bs;
}
if (!DGR.hud || (typeof dgrFightHere === "function" && dgrFightHere()))
return;
var show = open && (DGB.on.length > 0 || DGR.hp < DGR.max);
if (show) {
var pc = Math.max(0, DGR.hp / DGR.max), col = pc > 0.5 ? "#8FDCA4" : pc > 0.25 ? "#F2D684" : "#F28A84";
var h = "Vigour <span style='display:inline-block;vertical-align:middle;width:110px;height:8px;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden'><span style='display:block;height:100%;width:" + Math.round(pc * 100) + "%;background:" + col + "'></span></span> " + Math.round(DGR.hp);
if (DGR.hud.dataset.h !== h) {
DGR.hud.dataset.h = h;
DGR.hud.innerHTML = h;
}
if (DGR.hud.style.display !== "block")
DGR.hud.style.display = "block";
if (DGR.veil && !DGR.downT) {
var want = Math.min(0.45, DGR.hurt * 0.6), cur = +DGR.veil.style.opacity || 0, nx = cur + (want - cur) * Math.min(1, dt * 4);
DGR.veil.style.opacity = nx < 0.003 ? "0" : nx.toFixed(3);
}
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
dgbTick(dt);
}
catch (e) {
if (!DGB.e2) {
DGB.e2 = 1;
if (window.console)
console.warn("[beasts] tick", e);
}
} };
})();
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () { try {
var B = dgbTarget();
if (B) {
dgbStrike(B);
return;
}
}
catch (e) { } return uc.apply(this, arguments); };
})();
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyF" || e.repeat || carrying || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
try {
var B = dgbTarget();
if (B) {
e.preventDefault();
e.stopImmediatePropagation();
dgbStrike(B);
}
}
catch (er) { }
}, true);
(function () {
if (typeof window === "undefined")
return;
if (!Array.isArray(window.SPELL_FOES))
window.SPELL_FOES = [];
window.SPELL_FOES.push(function () {
if (!(typeof WLD !== "undefined" && WLD.w))
return [];
var base = WLD.w.base;
return DGB.on.filter(function (B) { return B.st !== "dead"; }).map(function (B) {
return {
x: base + B.x, y: B.y + (B.k.fly || 0), z: B.z, r: B.k.big ? 1.4 : 0.8, name: B.k.name,
ref: B, max: B.max, hp: function () { return B.hp; }, dead: function () { return B.st === "dead"; },
hit: function (dmg) { dgbSpellHit(B, dmg); },
hold: function (sec) { B.hold = Math.max(B.hold || 0, +sec || 0); },
calm: function (sec) { B.calm = Math.max(B.calm || 0, +sec || 0); B.st = "leave"; B.leaveT = 0; },
push: function (dx, dz, m) { var n = Math.hypot(dx, dz) || 1, k = +m || 0; for (var i = 0; i < 8; i++)
dgbStep(B, dx / n, dz / n, k / 0.4, 0.05); }
};
});
});
if (!Array.isArray(window.SPELL_MEND))
window.SPELL_MEND = [];
window.SPELL_MEND.push(function (n) { if (typeof DGR !== "undefined" && !DGR.downT)
DGR.hp = Math.min(DGR.max, DGR.hp + Math.max(0, +n || 0)); });
})();
(function () {
if (typeof DGR_RULE === "undefined")
return;
[3, 4].forEach(function (i) { if (DGR_RULE[i].indexOf("beasts") < 0)
DGR_RULE[i] += " Beasts and other beings of the world may attack you out in the open; a beast takes nothing."; });
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.dgb;
if (d && Array.isArray(d.trophies) && d.trophies.length) {
var by = {};
d.trophies.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Trophies from the wild places") + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("") +
bkpRow(bkpDim("Beasts and beings beaten: " + (d.beaten || 0)), "");
}
}
catch (e) { }
return h;
};
})();
setTimeout(function () {
try {
if (!/[?&]kbeast=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 60) {
clearInterval(iv);
return;
}
if (!dgbKeeper() || !(typeof WLD !== "undefined" && WLD.on))
return;
clearInterval(iv);
DGB.force = true;
DGB.next = 0.5;
setStatus("<b>Keeper:</b> the beasts of this world will come for you now (for you alone, until you reload). Set a world's level in admin.html to change where they come.");
}, 1000);
}
catch (e) { }
}, 5000);
