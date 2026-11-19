/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CBT_MAX = 60;
function cbtXpFor(L) { return L <= 1 ? 0 : Math.floor(60 * Math.pow(L - 1, 1.9)); }
function cbtLevelOf(xp) { xp = Math.max(0, +xp || 0); var L = 1; while (L < CBT_MAX && cbtXpFor(L + 1) <= xp)
L++; return L; }
var CBT_SKILL_MAX = 15;
var CBT_SKILLS = [
{ k: "might", n: "Might", i: "💪", col: "#E8826A", per: "+3% damage with blades, axes, hammers, spears and fists" },
{ k: "aim", n: "Aim", i: "🎯", col: "#E8C86A", per: "+3% damage with bows, slings, thrown things and guns, and 0.3 m more range" },
{ k: "arc", n: "Arcana", i: "✨", col: "#B08AF0", per: "+3% damage with staves, wands, orbs and star weapons, and abilities ready 2% sooner" },
{ k: "guard", n: "Guard", i: "🛡️", col: "#7AA8E8", per: "2% less damage taken, and 3 more stamina" },
{ k: "agi", n: "Agility", i: "🌀", col: "#7AE0B0", per: "1.5% more chance of a critical blow, a roll costs less, and a longer lunge" }
];
var CBT_CLASSES = {
blade: { n: "Blades", i: "🗡️", col: 0xE8E4D8, about: "Swords, sabres, katanas, rapiers, scimitars", abil: [
{ id: "riposte", n: "Riposte", i: "⚔️", lv: 1, cd: 5, t: "arc", m: 1.6, ang: 1.1, rng: 3.2, d: "A wide cut through everything in front of you." },
{ id: "thrust", n: "Lunging Thrust", i: "➶", lv: 3, cd: 8, t: "dash", m: 2.2, dist: 7, d: "Rush up to seven metres and run the foe through." },
{ id: "whirl", n: "Whirlwind", i: "🌀", lv: 6, cd: 12, t: "around", m: 1.4, rad: 3.6, d: "Spin, striking every foe around you." },
{ id: "cuts", n: "Thousand Cuts", i: "✴️", lv: 10, cd: 30, t: "multi", m: 0.8, n2: 6, gap: 0.12, fury: 1, bleed: 4, d: "Six blows too quick to see, and the foe bleeds." }
] },
heavy: { n: "Axes and hammers", i: "🪓", col: 0xF0B070, about: "Axes, war hammers, maces, flails, morning stars, picks", abil: [
{ id: "crush", n: "Crushing Blow", i: "🔨", lv: 1, cd: 6, t: "hit", m: 2.4, stun: 1.2, d: "One great blow that leaves the foe reeling." },
{ id: "slam", n: "Ground Slam", i: "💥", lv: 3, cd: 10, t: "around", m: 1.5, rad: 5, push: 4, d: "Strike the ground: every foe near you is thrown back." },
{ id: "cry", n: "War Cry", i: "📯", lv: 6, cd: 20, t: "buff", buff: "might", dur: 8, v: 0.3, slowAll: 3, d: "Thirty per cent harder blows for 8 seconds; foes near you falter." },
{ id: "split", n: "Earthsplitter", i: "⛰️", lv: 10, cd: 30, t: "arc", m: 3.2, ang: 0.4, rng: 11, fury: 1, stun: 1.5, d: "A crack runs out along the ground, breaking all it reaches." }
] },
pole: { n: "Spears and pole arms", i: "🔱", col: 0xD8E0F0, about: "Spears, halberds, tridents, glaives, scythes, quarterstaffs, lances", abil: [
{ id: "sweep", n: "Sweep", i: "〰️", lv: 1, cd: 5, t: "arc", m: 1.5, ang: 1.4, rng: 3.8, push: 2, d: "A long sweep that pushes back all in front of you." },
{ id: "vault", n: "Vaulting Strike", i: "🦘", lv: 3, cd: 9, t: "leap", m: 2, rad: 2.6, dist: 10, d: "Vault to a foe up to ten metres away and come down on it." },
{ id: "impale", n: "Impale", i: "📌", lv: 6, cd: 11, t: "hit", m: 3, stun: 0.8, slow: 3, d: "Pin the foe where it stands." },
{ id: "tempest", n: "Tempest of Points", i: "🌪️", lv: 10, cd: 30, t: "around", m: 1.2, rad: 4.5, pulses: 4, gap: 0.35, fury: 1, d: "Four turning sweeps of the blade all round you." }
] },
dagger: { n: "Daggers", i: "🔪", col: 0xC8F0D8, about: "Daggers, dirks, twin knives, whips", abil: [
{ id: "fang", n: "Twin Fang", i: "🐍", lv: 1, cd: 4, t: "multi", m: 1, n2: 2, gap: 0.14, d: "Two quick cuts." },
{ id: "step", n: "Shadowstep", i: "👤", lv: 3, cd: 10, t: "blink", m: 1.8, crit: 1, d: "Step through the shadows to behind the foe; your next blow is sure to bite deep." },
{ id: "venom", n: "Venom Edge", i: "🧪", lv: 6, cd: 12, t: "hit", m: 1.2, dot: { dps: 0.6, t: 6, col: 0x8AF06A }, d: "Poison that keeps biting for six seconds." },
{ id: "blossom", n: "Death Blossom", i: "🌸", lv: 10, cd: 30, t: "around", m: 1.1, rad: 3.4, pulses: 5, gap: 0.15, fury: 1, d: "A whirl of blades that cuts everything round you five times." }
] },
bow: { n: "Bows and slings", i: "🏹", col: 0xF0E0A0, about: "Bows, crossbows, slings, javelins, shuriken, discs", abil: [
{ id: "power", n: "Power Shot", i: "➹", lv: 1, cd: 5, t: "shot", m: 2.5, spd: 55, d: "A full draw: one heavy arrow." },
{ id: "volley", n: "Volley", i: "🎆", lv: 3, cd: 9, t: "volley", m: 1.2, n2: 3, rng: 20, d: "Three at once, at up to three foes." },
{ id: "disengage", n: "Disengage", i: "↩️", lv: 6, cd: 11, t: "back", m: 1.4, dist: 6, slow: 2.5, d: "Spring back six metres and loose a shot that slows." },
{ id: "rain", n: "Rain of Arrows", i: "🌧️", lv: 10, cd: 30, t: "zone", m: 0.7, rad: 4.5, ticks: 6, gap: 0.5, fury: 1, d: "Arrows fall on the foe and all round it for three seconds." }
] },
gun: { n: "Firearms", i: "🔫", col: 0xFFD08A, about: "Pistols, rifles, muskets, shotguns, machine guns, rockets", abil: [
{ id: "aimed", n: "Aimed Shot", i: "🎯", lv: 1, cd: 6, t: "shot", m: 3, spd: 110, d: "Steady the barrel, and one shot that counts." },
{ id: "fan", n: "Fan the Hammer", i: "💨", lv: 3, cd: 9, t: "multi", m: 0.9, n2: 4, gap: 0.11, ranged: 1, d: "Four shots as fast as the hand can go." },
{ id: "smoke", n: "Smoke and Roll", i: "☁️", lv: 6, cd: 14, t: "buff", buff: "smoke", dur: 2.5, roll: 1, d: "Roll clear in a cloud of smoke: foes lose you for a moment." },
{ id: "barrage", n: "Barrage", i: "🎇", lv: 10, cd: 30, t: "zone", m: 0.8, rad: 3.5, ticks: 7, gap: 0.18, fury: 1, d: "Everything you have left, all at once." }
] },
star: { n: "Star weapons", i: "🌠", col: 0x8AD8FF, about: "Blasters, plasma, rail guns, beam blades, ion and arc weapons", abil: [
{ id: "bolt", n: "Charged Bolt", i: "⚡", lv: 1, cd: 5, t: "shot", m: 2.4, spd: 70, d: "A bolt held until it hums, then let go." },
{ id: "ion", n: "Ion Burst", i: "🔵", lv: 3, cd: 10, t: "zone", m: 1.2, rad: 3.5, ticks: 1, stun: 1.4, d: "A burst at the foe that locks up everything near it." },
{ id: "shield", n: "Shield Pulse", i: "🛡️", lv: 6, cd: 16, t: "buff", buff: "absorb", dur: 8, v: 40, d: "A field that soaks up 40 damage for 8 seconds." },
{ id: "starfall", n: "Starfall Beam", i: "🌟", lv: 10, cd: 30, t: "beam", m: 0.6, ticks: 8, gap: 0.2, fury: 1, d: "A steady beam of starlight held on the foe." }
] },
magic: { n: "Staves, wands and orbs", i: "🪄", col: 0xC8A0FF, about: "Staves, wands, rods, orbs, tomes, fans, gauntlets", abil: [
{ id: "ebolt", n: "Elemental Bolt", i: "☄️", lv: 1, cd: 4, t: "shot", m: 2.2, spd: 32, d: "A bolt of the staff's own element." },
{ id: "nova", n: "Nova", i: "💫", lv: 3, cd: 10, t: "around", m: 1.5, rad: 5.5, push: 2, d: "A ring of power bursts out from you." },
{ id: "ward", n: "Arcane Ward", i: "🔮", lv: 6, cd: 18, t: "buff", buff: "absorb", dur: 10, v: 50, mend: 15, d: "A ward that soaks up 50 damage, and mends 15 vigour." },
{ id: "cata", n: "Cataclysm", i: "🌋", lv: 10, cd: 30, t: "zone", m: 1.1, rad: 5, ticks: 5, gap: 0.45, fury: 1, d: "The element itself falls on the foe and all round it." }
] },
shield: { n: "Shields", i: "🛡️", col: 0xE8D8A8, about: "A shield, with or without a spear or sword", abil: [
{ id: "bash", n: "Shield Bash", i: "🛡️", lv: 1, cd: 6, t: "hit", m: 1.4, stun: 1.6, d: "Knock the foe senseless." },
{ id: "wall", n: "Shield Wall", i: "🧱", lv: 3, cd: 16, t: "buff", buff: "wall", dur: 6, v: 0.6, d: "Brace: blows land 60% softer for 6 seconds." },
{ id: "charge", n: "Charge", i: "🐂", lv: 6, cd: 10, t: "dash", m: 1.6, dist: 9, stun: 1, d: "Charge up to nine metres and bowl the foe over." },
{ id: "bulwark", n: "Bulwark", i: "🏰", lv: 10, cd: 30, t: "around", m: 1.6, rad: 4, push: 5, fury: 1, buffAfter: { buff: "wall", dur: 6, v: 0.75 }, d: "Throw back everything near you, then stand like a castle wall." }
] },
fist: { n: "Bare hands", i: "✊", col: 0xF0D0B8, about: "Nothing in your hands, gauntlets and knuckles", abil: [
{ id: "hay", n: "Haymaker", i: "👊", lv: 1, cd: 5, t: "hit", m: 2, stun: 0.6, d: "Everything you have, in one swing." },
{ id: "knee", n: "Flying Knee", i: "🦵", lv: 3, cd: 8, t: "dash", m: 1.8, dist: 6, d: "Close six metres in a leap, knee first." },
{ id: "iron", n: "Iron Skin", i: "🪨", lv: 6, cd: 18, t: "buff", buff: "wall", dur: 6, v: 0.5, d: "Blows land half as hard for 6 seconds." },
{ id: "hundred", n: "Hundred Fists", i: "🤜", lv: 10, cd: 30, t: "multi", m: 0.55, n2: 10, gap: 0.08, fury: 1, d: "Ten blows in under a second." }
] }
};
var CBT_CLASS_ORDER = ["blade", "heavy", "pole", "dagger", "shield", "fist", "bow", "gun", "star", "magic"];
var CBT_UNLOCK = [1, 3, 6, 10];
var CBT_ELEM = {
steel: { n: "steel", col: 0xF2E6C8, col2: 0xFFB46A },
fire: { n: "fire", col: 0xFF8A3A, col2: 0xFFD06A },
frost: { n: "frost", col: 0x9AD8FF, col2: 0xE8F8FF },
storm: { n: "storm", col: 0xA8B8FF, col2: 0xE8F0FF },
light: { n: "light", col: 0xFFE8A0, col2: 0xFFFFFF },
shadow: { n: "shadow", col: 0xA07AE0, col2: 0x5A3A8A },
nature: { n: "nature", col: 0x8AE07A, col2: 0xD8F8A0 },
star: { n: "star", col: 0x7AD8FF, col2: 0xE0F8FF },
blood: { n: "blood", col: 0xE05A5A, col2: 0xFF9A8A }
};
var CBT_WHERE = [
"The open ground of every Dangerous and Deadly world: the Underdark, Mercury, Venus, Veyar, the Underworld, the Void, the Burning Lands, the Wasteland, Pyreline's wild country, open space",
"The Labyrinth, from the Maze to the Deep",
"The dungeons under the Bell Tower (📜 Story and quests → Dungeons)",
"Fights between dreamers, wherever the Keeper's level for that world allows them (Guarded, Risky, Dangerous, Deadly)",
"The fights in the story worlds: the convicts on Verne's island, the Wardens' foes on the far worlds"
];
var CBT_SAFE = "Somnucor, your home and every home, every building, the Hall of Doors, the Kids Zone and every world the Keeper has set to Safe.";
var CBT = { t: 0, zone: null, on: false, eng: 0, fought: -99, tgt: null, lock: null, lockT: 0, cd: {}, gcd: 0, stam: 100, fury: 0, combo: 0, comboT: 0,
iframe: 0, move: null, pend: null, buffs: {}, absorb: 0, absorbT: 0, dots: [], proj: [], seq: 0, native: 0, lastW: "", warnedW: {},
hud: null, phone: null, panel: null, dmgEls: [], srv: "", saveT: 0, dirty: false, rate: 1, xpOn: true, tapAt: {}, e1: {},
vrRun: 0, lvShown: 0, lastHurtAt: -99, perfectT: 0, sayAt: 0 };
function cbtLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); }
function cbtVR() { return typeof VRM !== "undefined" && !!VRM && !!VRM.xr; }
function cbtTouch() { try {
return typeof padTouch === "function" ? !!padTouch() : (typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches);
}
catch (e) {
return false;
} }
function cbtWarn(k, e) { if (!CBT.e1[k]) {
CBT.e1[k] = 1;
if (window.console)
console.warn("[combat] " + k, e);
} }
function cbtSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function cbtTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function cbtEsc(s) { return typeof esc === "function" ? esc(s) : String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function cbtKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function cbtP() { return __ZC(494, 0, this, arguments, new.target); }
function cbtLevel() { return cbtLevelOf(cbtP().xp); }
function cbtSk(k) { return Math.max(0, Math.min(CBT_SKILL_MAX, +cbtP().sp[k] || 0)); }
function cbtPointsSpent() { var p = cbtP(), n = 0; CBT_SKILLS.forEach(function (S) { n += cbtSk(S.k); }); return n; }
function cbtPointsFree() { return Math.max(0, cbtLevel() - 1 - cbtPointsSpent()); }
function cbtSpend(k) {
if (cbtPointsFree() < 1 || cbtSk(k) >= CBT_SKILL_MAX)
return false;
cbtP().sp[k] = cbtSk(k) + 1;
cbtDirty();
return true;
}
function cbtUnlearn() { cbtP().sp = {}; cbtDirty(); }
var CBT_MS_STEP = [0, 0, 150, 400, 800, 1400, 2200, 3300, 4700, 6500, 9000];
function cbtMastery(c) { var x = +cbtP().ms[c] || 0, L = 1; while (L < 10 && x >= CBT_MS_STEP[L + 1])
L++; return L; }
function cbtMasteryXp(c, n) { if (!CBT.xpOn)
return; var p = cbtP(); p.ms[c] = (+p.ms[c] || 0) + n; cbtDirty(); }
function cbtDirty() { CBT.dirty = true; }
function cbtGain(xp, why) {
if (!CBT.xpOn || !(xp > 0))
return;
var p = cbtP(), before = cbtLevelOf(p.xp);
xp = Math.round(xp * (CBT.rate || 1));
if (xp < 1)
return;
p.xp += xp;
cbtDirty();
var after = cbtLevelOf(p.xp);
cbtFloatText("+" + xp + " XP", null, "#B8E0FF", 0.8);
if (after > before)
cbtLevelUp(after);
}
function cbtLevelUp(L) { return __ZC(494, 1, this, arguments, new.target); }
function cbtSigned() { try {
return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function";
}
catch (e) {
return false;
} }
function cbtMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function cbtLoad() { return __ZC(494, 2, this, arguments, new.target); }
function cbtSaveSoon(s) { CBT.saveT = Math.min(CBT.saveT || 30, s || 30); }
function cbtSave() { return __ZC(494, 3, this, arguments, new.target); }
var CBT_ARMS_DMG = { sword: 16, axe: 18, club: 17, spear: 16, dagger: 12, shield: 10, staff: 15, orb: 14, bow: 15, noose: 12, horn: 8, torch: 9 };
function cbtHeldKey() { try {
return typeof bwHeldKey === "function" ? bwHeldKey() : null;
}
catch (e) {
return null;
} }
function cbtWeapon() { return __ZC(494, 4, this, arguments, new.target); }
function cbtClassOf(W) { return __ZC(494, 5, this, arguments, new.target); }
function cbtElemOf(W) { return __ZC(494, 6, this, arguments, new.target); }
function cbtReqOf(W) { return __ZC(494, 7, this, arguments, new.target); }
function cbtUnder(W) { return (W || cbtWeapon()).req > cbtLevel(); }
function cbtWeaponAbil(W) { return CBT_CLASSES[(W || cbtWeapon()).cls].abil; }
function cbtSkillMult(W) {
var c = W.cls, k = /^(bow|gun)$/.test(c) ? "aim" : /^(magic|star)$/.test(c) ? "arc" : "might";
return 1 + 0.03 * cbtSk(k);
}
function cbtIndoors() { try {
return typeof dgbIndoors === "function" ? dgbIndoors() : !!(typeof store !== "undefined" && store.inside);
}
catch (e) {
return false;
} }
function cbtWhereId() { try {
return typeof dgrWhere === "function" ? dgrWhere() : "";
}
catch (e) {
return "";
} }
function cbtLevelHere(id) { try {
return typeof dgrLevelOf === "function" ? dgrLevelOf(id) : 0;
}
catch (e) {
return 0;
} }
var CBT_WORLDS = {};
function cbtRegisterWorld(key, o) { if (key)
CBT_WORLDS[key] = o || {}; }
function cbtZoneNow() { return __ZC(494, 8, this, arguments, new.target); }
function cbtFoes(range, storyOnly) { return __ZC(494, 9, this, arguments, new.target); }
var CBT_SEEN = typeof WeakMap !== "undefined" ? new WeakMap() : null, CBT_SEEN_S = {};
function cbtSeen(f) { return __ZC(494, 10, this, arguments, new.target); }
function cbtLineClear(wall, ax, az, bx, bz) {
var dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
if (d < 1.6)
return true;
var n = Math.min(90, Math.ceil(d / 0.5));
for (var i = 1; i < n; i++) {
var u = i / n;
if (u * d < 0.5 || (1 - u) * d < 0.7)
continue;
try {
if (wall(ax + dx * u, az + dz * u))
return false;
}
catch (e) {
return true;
}
}
return true;
}
function cbtFoeLv(f) {
if (f.lv)
return f.lv;
var m = +f.max || (f.ref && f.ref.max) || 60, dl = CBT.zone && CBT.zone.lv >= 4 ? 4 : 0;
return Math.max(1, Math.round(m / 12) + dl);
}
function cbtFwd() { return { x: -Math.sin(yaw), z: -Math.cos(yaw) }; }
function cbtPick(range) { return __ZC(494, 11, this, arguments, new.target); }
var CBT_FX = { pts: null, n: 0, live: [], free: [], pos: null, col: null, alp: null, siz: null, vel: null, age: null, life: null, grav: null, drag: null, s0: null,
ax: 0, ay: 0, az: 0, arcs: [], rings: [], mark: null, dirty: false };
function cbtFxCap() { return cbtVR() ? 260 : cbtLite() ? 220 : 700; }
function cbtFxInit() { return __ZC(494, 12, this, arguments, new.target); }
function cbtFxAnchor() {
var P = camera.position, F = CBT_FX;
if (F.live.length && Math.abs(P.x - F.ax) < 1500 && Math.abs(P.z - F.az) < 1500)
return;
if (F.live.length)
cbtFxClear();
F.ax = Math.round(P.x);
F.ay = Math.round(P.y);
F.az = Math.round(P.z);
F.pts.position.set(F.ax, F.ay, F.az);
}
function cbtFxClear() { var F = CBT_FX; F.live.forEach(function (i) { F.alp[i] = 0; F.free.push(i); }); F.live = []; F.dirty = true; }
function cbtSpark(x, y, z, col, vx, vy, vz, life, size, grav, drag) { return __ZC(494, 13, this, arguments, new.target); }
function cbtLess(n) { return Math.max(1, Math.round(n * (cbtVR() ? 0.35 : cbtLite() ? 0.4 : 1))); }
function cbtBurst(x, y, z, col, n, spd, life, size, o) { return __ZC(494, 14, this, arguments, new.target); }
function cbtRise(x, y, z, col, n, r, h, life, size) { return __ZC(494, 15, this, arguments, new.target); }
function cbtTrail(x, y, z, col, size, life) { if (!CBT_FX.pts)
return; cbtSpark(x, y, z, col, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, life || 0.35, size || 0.25, 0, 1); }
function cbtFxTick(dt) { return __ZC(494, 16, this, arguments, new.target); }
var CBT_POOL = { arc: [], ring: [] };
function cbtPooled(kind) { return __ZC(494, 17, this, arguments, new.target); }
function cbtSlash(col, dir, big, y) { return __ZC(494, 18, this, arguments, new.target); }
function cbtRing(x, y, z, col, r0, r1, life, op) {
if (!cbtFxInit())
return;
var m = cbtPooled("ring");
if (!m)
return;
m.material.color.setHex(col);
m.position.set(x, y + 0.06, z);
m.rotation.set(-Math.PI / 2, 0, 0);
m.scale.set(r0, r0, 1);
m.visible = true;
CBT_FX.rings.push({ m: m, t: 0, life: life || 0.6, r0: Math.max(0.05, r0), r1: r1, op: op || 0.6 });
}
function cbtImpact(x, y, z, elem, big) {
var E = CBT_ELEM[elem] || CBT_ELEM.steel;
cbtBurst(x, y, z, E.col, big ? 26 : 12, big ? 7 : 5, big ? 0.7 : 0.45, big ? 0.34 : 0.24, { col2: E.col2, grav: elem === "steel" ? 6 : 1, drag: 3 });
if (big)
cbtRing(x, y - 1.1, z, E.col, 0.3, 2.2, 0.5, 0.45);
}
function cbtFxLevel(x, y, z) {
cbtRise(x, y, z, 0xFFD47A, 60, 0.9, 3.2, 1.6, 0.3);
cbtRise(x, y, z, 0xFFF2C8, 24, 0.5, 2.4, 1.3, 0.22);
cbtRing(x, y, z, 0xFFD47A, 0.4, 3, 1.2, 0.55);
}
function cbtMarkTick(dt, f) { return __ZC(494, 19, this, arguments, new.target); }
function cbtFeetOf(f) { return (f.y !== undefined ? f.y : camera.position.y - 1.72) - (f.kind === "pvp" ? 1.1 : 0); }
function cbtChestOf(f) { return cbtFeetOf(f) + ((f.r || 0.7) > 1.1 ? 1.8 : 1.15); }
var CBT_V3 = null;
function cbtFloatText(text, at, col, scale, big) { return __ZC(494, 20, this, arguments, new.target); }
function cbtFloatTick(dt) { return __ZC(494, 21, this, arguments, new.target); }
function cbtLvMult() { return 1 + 0.02 * (cbtLevel() - 1); }
function cbtOutMult(W) {
W = W || cbtWeapon();
var m = cbtLvMult() * cbtSkillMult(W) * (1 + 0.03 * (cbtMastery(W.cls) - 1));
if (cbtUnder(W))
m *= 0.5;
var B = CBT.buffs.might;
if (B && B.until > CBT.t)
m *= 1 + B.v;
return m;
}
function cbtCritChance() { return 0.05 + 0.015 * cbtSk("agi"); }
function cbtRawDmg() {
try {
if (typeof dgbMyDmg === "function") {
CBT.raw = 1;
var d = +dgbMyDmg();
CBT.raw = 0;
if (d > 0)
return d;
}
}
catch (e) {
CBT.raw = 0;
}
var W = cbtWeapon();
return Math.round(W.dmg * (0.9 + Math.random() * 0.3));
}
function cbtRoll(mult, sure) {
var crit = sure || Math.random() < cbtCritChance(), d = cbtRawDmg() * cbtOutMult() * (mult || 1) * (crit ? 1.75 : 1);
return { d: Math.max(1, Math.round(d)), crit: crit };
}
function cbtToughBase() { return Math.min(0.3, 0.006 * (cbtLevel() - 1)) + Math.min(0.3, 0.02 * cbtSk("guard")); }
function cbtToughness() {
var t = cbtToughBase();
var B = CBT.buffs.wall;
if (B && B.until > CBT.t)
t = 1 - (1 - t) * (1 - B.v);
return Math.min(0.85, t);
}
function cbtStamMax() { return 100 + 3 * cbtSk("guard"); }
function cbtHarm(d) { return __ZC(494, 22, this, arguments, new.target); }
function cbtVig() {
try {
if (WLD.on === "delve" && typeof SGA !== "undefined" && SGA.delve)
return { hp: +SGA.delve.vig || 0, max: 100 };
}
catch (e) { }
if (typeof DGR !== "undefined")
return { hp: +DGR.hp || 0, max: +DGR.max || 100 };
return { hp: 100, max: 100 };
}
function cbtHeal(n) {
n = Math.max(0, +n || 0);
if (!n)
return;
try {
if (WLD.on === "delve" && typeof SGA !== "undefined" && SGA.delve) {
SGA.delve.vig = Math.min(100, SGA.delve.vig + n);
return;
}
}
catch (e) { }
if (typeof DGR !== "undefined" && !DGR.downT)
DGR.hp = Math.min(DGR.max, DGR.hp + n);
}
function cbtDeal(f, roll, o) { return __ZC(494, 23, this, arguments, new.target); }
function cbtInCone(rng, ang) {
var P = camera.position, F = cbtFwd();
return cbtFoes(rng + 1.5).filter(function (o) { var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz) || 0.01; if (d > rng + (o.r || 0.6))
return false; return d < 1.4 || (dx * F.x + dz * F.z) / d >= Math.cos(ang); });
}
function cbtNear(x, z, rad) { return cbtFoes(rad + 30).filter(function (o) { return Math.hypot(o.x - x, o.z - z) <= rad + (o.r || 0.6) * 0.6; }); }
function cbtYawTo(x, z) { var P = camera.position; return Math.atan2(-(x - P.x), -(z - P.z)); }
function cbtTurnTo(x, z, k) {
if (cbtVR())
return;
var want = cbtYawTo(x, z), d = Math.atan2(Math.sin(want - yaw), Math.cos(want - yaw));
yaw += d * Math.min(1, k);
}
function cbtFree(x, z) { return __ZC(494, 24, this, arguments, new.target); }
function cbtGo(kind, dx, dz, dist, dur, then, face) {
var n = Math.hypot(dx, dz) || 1;
CBT.move = { kind: kind, dx: dx / n, dz: dz / n, dist: Math.max(0, dist), done: 0, t: 0, dur: dur, then: then, face: face };
}
function cbtMoveTick(dt) { return __ZC(494, 25, this, arguments, new.target); }
function cbtDodge(f, s) { return __ZC(494, 26, this, arguments, new.target); }
function cbtStrike() { return __ZC(494, 27, this, arguments, new.target); }
function cbtLungeMax() { return (cbtVR() ? 3 : 5.5) + 0.15 * cbtSk("agi"); }
function cbtSwingFx(W, big) {
var E = CBT_ELEM[W.elem] || CBT_ELEM.steel;
if (W.ranged) {
var P = camera.position, F = cbtFwd();
cbtShotFx(P.x + F.x * 0.8, P.y - 0.35, P.z + F.z * 0.8, P.x + F.x * W.reach, P.y - 0.4, P.z + F.z * W.reach, E.col, null);
}
else
cbtSlash(E.col, CBT.combo === 2 ? -1 : 1, big);
cbtTone(W.ranged ? 420 : 240, 0.05);
}
function cbtBlow(f, W, mult, big) { return __ZC(494, 28, this, arguments, new.target); }
function cbtNextReady() { var Ab = cbtWeaponAbil(); for (var i = 0; i < 4; i++) {
if (cbtAbilState(i).ready) {
cbtAbility(i);
return;
}
} }
function cbtProj(x, y, z, f, spd, col, onHit) {
CBT.proj.push({ x: x, y: y, z: z, f: f, key: f && f.key, spd: spd, col: col, onHit: onHit, t: 0 });
}
function cbtShotFx(x0, y0, z0, x1, y1, z1, col, f) { CBT.proj.push({ x: x0, y: y0, z: z0, to: { x: x1, y: y1, z: z1 }, spd: 70, col: col, t: 0 }); }
function cbtProjTick(dt) { return __ZC(494, 29, this, arguments, new.target); }
function cbtAbilState(i) { return __ZC(494, 30, this, arguments, new.target); }
function cbtAbility(i) { return __ZC(494, 31, this, arguments, new.target); }
function cbtRun(A, W, f) { return __ZC(494, 32, this, arguments, new.target); }
function cbtDotTick(dt) { return __ZC(494, 33, this, arguments, new.target); }
function cbtKilled(o) { return __ZC(494, 34, this, arguments, new.target); }
window.cbtKilled = cbtKilled;
var CBT_CSS = "#cbt-hud{position:fixed;left:50%;transform:translateX(-50%);width:max-content;max-width:calc(100vw - 16px);bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:30;pointer-events:none;" +
"font:600 12px var(--sans,system-ui);color:#F2E8DA;display:none;flex-direction:column;align-items:center;gap:5px;text-shadow:0 1px 2px rgba(0,0,0,.8)}" +
"#cbt-hud .row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center}" +
"#cbt-hud .lv{pointer-events:auto;cursor:pointer;background:rgba(14,12,18,.86);border:1px solid #B89A6A;border-radius:14px;padding:3px 9px;white-space:nowrap}" +
"#cbt-hud .lv i{font-style:normal;color:#FFD98A}" +
"#cbt-hud .bar{width:96px;height:9px;border-radius:5px;background:rgba(255,255,255,.14);overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.5)}" +
"#cbt-hud .bar b{display:block;height:100%;transition:width .25s ease-out}" +
"#cbt-hud .xp{width:100%;max-width:520px;height:4px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden}" +
"#cbt-hud .xp b{display:block;height:100%;background:linear-gradient(90deg,#6AA8E8,#B8E0FF);transition:width .4s ease-out}" +
"#cbt-hud .ab{pointer-events:auto;cursor:pointer;position:relative;width:52px;height:52px;border-radius:12px;background:rgba(14,12,20,.86);border:1px solid rgba(255,255,255,.28);" +
"display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden}" +
"#cbt-hud .ab.rdy{border-color:#E8C27A;box-shadow:0 0 10px rgba(232,194,122,.35)}" +
"#cbt-hud .ab .k{position:absolute;left:4px;top:2px;font-size:10px;opacity:.75}" +
"#cbt-hud .ab .cd{position:absolute;inset:0;background:conic-gradient(rgba(0,0,0,.66) var(--p),rgba(0,0,0,0) 0);}" +
"#cbt-hud .ab .lk{position:absolute;inset:0;background:rgba(0,0,0,.6);font-size:10px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:3px;color:#E8D8C0}" +
"#cbt-hud .ab .s{position:absolute;bottom:2px;right:4px;font-size:11px;color:#FFE8C0}" +
"#cbt-hud .wpn{font-weight:500;opacity:.9;white-space:nowrap}" +
"#cbt-hud .chip{background:rgba(14,12,18,.78);border:1px solid rgba(232,194,122,.45);border-radius:12px;padding:3px 10px;pointer-events:auto;cursor:pointer;white-space:nowrap}" +
"#cbt-tgt{position:fixed;left:50%;transform:translateX(-50%);top:calc(94px + env(safe-area-inset-top,0px));z-index:44;pointer-events:none;display:none;" +
"font:600 12.5px var(--sans,system-ui);color:#F8EEE0;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.85)}" +
"#cbt-tgt .bar{width:200px;height:8px;margin:3px auto 0;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden}" +
"#cbt-tgt .bar b{display:block;height:100%;background:linear-gradient(90deg,#C84A3A,#F07A5A);transition:width .2s ease-out}" +
"#cbt-pad{position:fixed;right:calc(10px + env(safe-area-inset-right,0px));bottom:calc(112px + env(safe-area-inset-bottom,0px));width:210px;height:190px;z-index:45;display:none;pointer-events:none}" +
"#cbt-pad div{position:absolute;pointer-events:auto;border-radius:50%;display:flex;align-items:center;justify-content:center;touch-action:none;user-select:none;-webkit-user-select:none;" +
"background:rgba(20,14,16,.78);border:1px solid rgba(255,220,180,.45);color:#FFE8D8;font:700 20px system-ui,sans-serif;overflow:hidden}" +
"#cbt-pad .st{width:74px;height:74px;right:6px;bottom:6px;font-size:30px;background:rgba(110,30,22,.86);border-color:#F0A080}" +
"#cbt-pad .a{width:46px;height:46px}" +
"#cbt-pad .a .cd{position:absolute;inset:0;background:conic-gradient(rgba(0,0,0,.7) var(--p),rgba(0,0,0,0) 0)}" +
"#cbt-pad .a.no{opacity:.45}" +
"#cbt-pad .dg{width:50px;height:50px;right:96px;bottom:2px;background:rgba(20,40,40,.82);border-color:#8AE0C8}" +
"#cbt-pad .lk{width:40px;height:40px;right:20px;bottom:142px;font-size:17px}" +
"#cbt-pad .mg{width:40px;height:40px;right:164px;bottom:150px;font-size:17px;background:rgba(40,24,70,.85);border-color:#B89AF0}" +
"#cbt-pad .mg.on{background:rgba(110,70,200,.92);border-color:#E0D0FF;box-shadow:0 0 10px rgba(180,140,255,.6)}" +
"#cbt-pad.magic .a{border-color:#B89AF0;background:rgba(36,22,60,.82)}" +
"#cbt-toast{position:fixed;left:50%;top:calc(130px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:60;pointer-events:none;opacity:0;transition:opacity .6s ease;" +
"background:rgba(16,12,8,.9);border:1px solid #D8B070;border-radius:12px;padding:9px 14px;font:13px var(--sans,system-ui);color:#FFF1D8;max-width:min(520px,calc(100vw - 32px));text-align:center}" +
"body.cbt-on #dgb-btn,body.cbt-on #dgr-btn,body.cbt-on #sga-strike{visibility:hidden!important}" +
"body.cbt-fight #dgr-hud{visibility:hidden!important}" +
"body.cbt-on .cbt-strikep{visibility:hidden!important}" +
"body.cbt-touch #cbt-hud .abs,body.cbt-touch #cbt-hud .sps{display:none!important}" +
"#cbt-hud .ab.sp{width:40px;height:40px;font-size:19px;border-color:rgba(184,154,240,.45);background:rgba(28,18,46,.86)}" +
"#cbt-hud .ab.sp.rdy{border-color:#C8A8FF;box-shadow:0 0 9px rgba(184,140,255,.4)}" +
"#cbt-hud .ab.sp .k{font-size:9px}" +
"body.cbt-touch #pdside,body.cbt-touch #t-use{visibility:hidden!important}" +
"#cbt-book{position:fixed;inset:0;z-index:70;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.55)}" +
"#cbt-book .in{background:#16131A;border:1px solid #6A5A48;border-radius:14px;color:#EEE6DA;font:13.5px/1.45 var(--sans,system-ui);width:min(620px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow-y:auto;padding:16px 18px}" +
"#cbt-book h3{font:600 19px var(--serif,Georgia);color:#FFE7B0;margin:0 0 4px}" +
"#cbt-book h4{margin:14px 0 4px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;opacity:.75}" +
"#cbt-book .sk{display:flex;align-items:center;gap:8px;margin:4px 0}" +
"#cbt-book .sk .nm{width:92px}#cbt-book .sk .pp{flex:1;font-size:12px;opacity:.8}" +
"#cbt-book button{background:#2A2430;color:#F2E6D8;border:1px solid #6A5A48;border-radius:8px;padding:4px 10px;font:inherit;cursor:pointer}" +
"#cbt-book button:disabled{opacity:.4;cursor:default}" +
"#cbt-book .cls{display:grid;grid-template-columns:1fr;gap:6px}#cbt-book .cl{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:6px 9px}" +
"#cbt-book .cl.me{border-color:#E8C27A}#cbt-book .abl{font-size:12.5px;opacity:.9;margin:2px 0}" +
"#cbt-book .x{float:right}#cbt-book table{border-collapse:collapse;width:100%;font-size:12.5px}#cbt-book td{padding:2px 4px;border-bottom:1px solid rgba(255,255,255,.07)}" +
"@media (max-width:560px){#cbt-hud .bar{width:54px}#cbt-hud .ab{width:42px;height:42px;font-size:19px}}";
function cbtHudMake() { return __ZC(494, 35, this, arguments, new.target); }
function cbtToast(h) {
if (!cbtHudMake())
return cbtSay(h);
var t = CBT.toastEl;
t.innerHTML = h;
t.style.opacity = "1";
clearTimeout(CBT.toastTo);
CBT.toastTo = setTimeout(function () { t.style.opacity = "0"; }, 4200);
cbtSay(h);
}
function cbtSetW(el, pc) { var w = Math.round(Math.max(0, Math.min(1, pc)) * 100) + "%"; if (el.style.width !== w)
el.style.width = w; }
function cbtHudTick(dt, f) { return __ZC(494, 36, this, arguments, new.target); }
function cbtBook(open) { return __ZC(494, 37, this, arguments, new.target); }
function cbtBookPaint() { return __ZC(494, 38, this, arguments, new.target); }
(function () {
if (typeof PS_SECTIONS !== "undefined") {
var Y = PS_SECTIONS.filter(function (s) { return s.k === "you"; })[0];
if (Y && Y.ids.indexOf("me-combat") < 0) {
var i = Y.ids.indexOf("me-lvl");
Y.ids.splice(i < 0 ? Y.ids.length : i + 1, 0, "me-combat");
}
}
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-combat"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-combat";
b.title = "Your combat level, skills, and every weapon's abilities";
b.textContent = "⚔️ Combat";
b.onclick = function () { cbtBook(true); };
var pk = document.getElementById("me-lvl");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
}
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!CBT.bookOpen; }, close: function () { cbtBook(false); } });
})();
function cbtMenuPaint() { var b = document.getElementById("me-combat"); if (b) {
var t = "⚔️ Combat · Lv " + cbtLevel() + (cbtPointsFree() ? " +" : "");
if (b.textContent !== t)
b.textContent = t;
} }
(function () {
if (typeof worldPrompt !== "function")
return;
var wp = worldPrompt;
worldPrompt = function (html) {
var r = wp.apply(this, arguments);
try {
var p = WLD.prompt;
if (p)
p.classList.toggle("cbt-strikep", !!html && /to strike/.test(String(html)));
}
catch (e) { }
return r;
};
})();
function cbtTyping(e) { return /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable); }
function cbtCanStrike() { if (!CBT.on)
return false; var W = cbtWeapon(), f = cbtPick(W.ranged ? W.reach + 4 : W.reach + cbtLungeMax() + 1); return !!f || CBT.eng > 0 && CBT.t - CBT.fought < 4; }
function cbtLockNext() { return __ZC(494, 39, this, arguments, new.target); }
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) {
if (!CBT.on || cbtTyping(e) || CBT.bookOpen)
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
var c = e.code || "", m = /^Digit([0-9])$/.exec(c);
if (m) {
if (e.repeat) {
e.preventDefault();
e.stopImmediatePropagation();
return;
}
var n = +m[1];
if (n >= 1 && n <= 4) {
e.preventDefault();
e.stopImmediatePropagation();
if (e.shiftKey)
cbtSpell(n - 1);
else
cbtAbility(n - 1);
return;
}
var pi = (n + 5) % 10;
try {
if (typeof PW !== "undefined" && PW.keys && PW.keys[pi] && typeof pwUse === "function") {
e.preventDefault();
e.stopImmediatePropagation();
pwUse(PW.keys[pi].n);
return;
}
}
catch (er) { }
e.preventDefault();
e.stopImmediatePropagation();
return;
}
if ((c === "AltLeft" || c === "AltRight") && !e.repeat) {
e.preventDefault();
e.stopImmediatePropagation();
cbtDodge();
return;
}
if (/^Key[WASD]$/.test(c) && !e.repeat && CBT.eng > 0 && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
var last = CBT.tapAt[c] || -9;
CBT.tapAt[c] = CBT.t;
if (CBT.t - last < 0.26) {
CBT.tapAt[c] = -9;
var f = c === "KeyW" ? 1 : c === "KeyS" ? -1 : 0, s = c === "KeyD" ? 1 : c === "KeyA" ? -1 : 0;
cbtDodge(f, s);
}
return;
}
if (c === "KeyF" && !e.repeat && !e.ctrlKey && !e.metaKey && cbtCanStrike()) {
e.preventDefault();
e.stopImmediatePropagation();
cbtStrike();
return;
}
if (c === "KeyF" && e.repeat && cbtCanStrike()) {
e.preventDefault();
e.stopImmediatePropagation();
return;
}
if (c === "KeyG" && cbtVR() && CBT.eng > 0) {
e.preventDefault();
e.stopImmediatePropagation();
cbtDodge();
return;
}
}, true);
addEventListener("keyup", function (e) { if (CBT.on && (e.code === "AltLeft" || e.code === "AltRight"))
e.preventDefault(); }, true);
addEventListener("mousedown", function (e) {
if (!CBT.on || CBT.bookOpen || typeof walkMode !== "undefined" && !walkMode)
return;
if (!document.pointerLockElement)
return;
if (e.button === 0 && typeof window.cbtNativeFire === "function" && window.cbtNativeFire())
return;
if (e.button === 1) {
e.preventDefault();
e.stopImmediatePropagation();
cbtLockNext();
return;
}
if (e.button === 0 && CBT.eng > 0) {
e.preventDefault();
e.stopImmediatePropagation();
cbtStrike();
}
}, true);
addEventListener("auxclick", function (e) { if (CBT.on && e.button === 1)
e.preventDefault(); }, true);
}
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () { try {
if (cbtCanStrike()) {
cbtStrike();
return;
}
}
catch (e) { } return uc.apply(this, arguments); };
})();
function cbtPadHeld(act) {
try {
if (typeof gpdBtnOf !== "function" || !navigator.getGamepads)
return false;
var b = gpdBtnOf(act), L = navigator.getGamepads();
for (var i = 0; i < L.length; i++) {
var g = L[i];
if (g && g.connected && g.buttons && g.buttons[b] && g.buttons[b].pressed)
return true;
}
}
catch (e) { }
return false;
}
(function () {
if (typeof gpdAct !== "function")
return;
var ga = gpdAct, MAP = { phone: 0, journal: 1, ward: 2, ride: 3 };
gpdAct = function (act, down) {
try {
if (down && CBT.on && CBT.eng > 0) {
if (act === "take")
return;
if (MAP[act] !== undefined) {
if (cbtPadHeld("take"))
cbtSpell(MAP[act]);
else
cbtAbility(MAP[act]);
return;
}
if (act === "inspect") {
cbtDodge();
return;
}
}
}
catch (e) { }
return ga.apply(this, arguments);
};
})();
(function () {
if (typeof pwBarTick !== "function")
return;
var pbt = pwBarTick;
pwBarTick = function (dt) {
if (CBT.pwOn !== CBT.on) {
CBT.pwOn = CBT.on;
try {
pwBarSig = "";
pwBarAt = 0;
}
catch (e) { }
}
var r = pbt.apply(this, arguments);
if (CBT.on) {
try {
var b = document.getElementById("pw-bar");
if (b) {
var s = b.querySelectorAll("sup");
for (var i = 0; i < s.length; i++) {
var t = i < 6 ? String((i + 5) % 10) : "";
if (s[i].textContent !== t)
s[i].textContent = t;
}
}
}
catch (e) { }
}
return r;
};
})();
var CBT_V = null;
function cbtWP(g) { if (!CBT_V)
CBT_V = new THREE.Vector3(); try {
g.getWorldPosition(CBT_V);
return { x: CBT_V.x, y: CBT_V.y, z: CBT_V.z };
}
catch (e) {
return null;
} }
(function () {
if (typeof dgbMyDmg === "function") {
var md = dgbMyDmg;
dgbMyDmg = function () {
var d = md.apply(this, arguments);
if (CBT.raw || !CBT.on)
return d;
try {
var crit = Math.random() < cbtCritChance();
CBT.lastCrit = crit;
return Math.max(1, Math.round(d * cbtOutMult() * (CBT.comboMult || 1) * (crit ? 1.75 : 1)));
}
catch (e) {
return d;
}
};
}
var sh = typeof spellHarm === "function" ? spellHarm : null;
window.spellHarm = function (d) { var r = sh ? sh.apply(this, arguments) : d; try {
return cbtHarm(+r);
}
catch (e) {
return r;
} };
if (typeof dgrHurt === "function") {
var dh = dgrHurt;
dgrHurt = function () { CBT.pvpIn = 1; try {
return dh.apply(this, arguments);
}
finally {
CBT.pvpIn = 0;
} };
}
if (typeof dgbStrike === "function") {
var ds = dgbStrike;
dgbStrike = function (B) { if (!CBT.native && CBT.on) {
try {
cbtStrike();
return;
}
catch (e) { }
} return ds.apply(this, arguments); };
}
if (typeof dgbFell === "function") {
var df = dgbFell;
dgbFell = function (B) {
var r = df.apply(this, arguments);
try {
var lv = Math.max(1, Math.round((B.max || B.k.hp || 60) / 12)) + (typeof dgbLevel === "function" && dgbLevel() >= 4 ? 3 : 0), W = WLD.w;
cbtKilled({ name: B.k.name, lv: lv, boss: !!B.k.big, at: W ? { x: W.base + B.x, y: B.y + 1.1, z: B.z } : null });
}
catch (e) { }
return r;
};
}
if (typeof dgbBeaten === "function") {
var db = dgbBeaten;
dgbBeaten = function () { try {
cbtP().falls++;
CBT.fury = 0;
CBT.lock = null;
CBT.move = null;
cbtDirty();
}
catch (e) { } return db.apply(this, arguments); };
}
if (typeof sgaDlvStrike === "function") {
var ss = sgaDlvStrike;
sgaDlvStrike = function () { if (!CBT.native && CBT.on) {
try {
cbtStrike();
return;
}
catch (e) { }
} return ss.apply(this, arguments); };
}
if (typeof sgaDlvAttack === "function") {
var sa = sgaDlvAttack;
sgaDlvAttack = function () { if (!CBT.native && CBT.on) {
try {
cbtStrike();
return;
}
catch (e) { }
} return sa.apply(this, arguments); };
}
if (typeof fgProt === "function") {
var fp = fgProt;
fgProt = function () {
try {
if (typeof fgWornMap !== "function" || typeof FG_RB === "undefined" || typeof FG_DB === "undefined" || typeof fgQ !== "function")
return fp.apply(this, arguments);
var M = fgWornMap(), p = 0, L = cbtLevel();
Object.keys(M).forEach(function (w) {
var it = FG.byId[M[w]];
if (!it || (typeof fgWorn === "function" && !fgWorn(it)))
return;
var R = FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D || !D.x)
return;
var v = (+D.x.prot || 0) * (R.mult || 1) * fgQ(it.quality);
if (cbtArmourReq(R) > L)
v *= 0.5;
p += v;
});
return Math.min(0.45, p);
}
catch (e) {
return fp.apply(this, arguments);
}
};
}
})();
function cbtArmourReq(R) { return Math.max(1, Math.round((((R && R.mult) || 1) - 1) * 50)); }
(function () {
if (typeof window === "undefined")
return;
if (!Array.isArray(window.SPELL_FOES))
window.SPELL_FOES = [];
window.SPELL_FOES.push(function () {
if (typeof WLD === "undefined" || WLD.on !== "delve" || typeof sgaFoes !== "function" || typeof SGA === "undefined" || !SGA.delve)
return [];
var S = SGA.delve, D = (typeof SGA_DUNGEONS !== "undefined" && SGA_DUNGEONS[S.d]) || null;
return sgaFoes().map(function (M) {
var boss = M === S.boss, w = cbtWP(M.g);
if (!w)
return null;
return { kind: "beast", story: false, delve: true, ref: M, x: w.x, y: w.y, z: w.z, r: boss ? 1.6 : 0.75, name: boss && D ? D.boss.n : M.name || (M.K && M.K.name) || "a foe",
lv: boss ? (((D && D.tier) || {}).lv || 12) + 6 : M.lv || Math.max(1, Math.round(((M.K && M.K.hp) || 40) / 12)),
max: boss ? (M.localMax || M.maxHp || null) : (M.max || (M.K && M.K.hp) || null),
hp: function () { return boss ? (M.localHp !== undefined && !S.run ? M.localHp : null) : M.hp; },
dead: function () { return M.st === "dead" || !!M.fallen; },
hit: function (d) { sgaDlvDamage(M, d); },
hold: function (s) { M.cool = Math.max(M.cool || 0, +s || 0); },
calm: function (s) { if (!boss) {
M.st = "idle";
M.cool = Math.max(M.cool || 0, +s || 0);
} },
push: function (dx, dz, m) {
if (boss)
return;
var n = Math.hypot(dx, dz) || 1, B = WORLDS.delve.base, nx = M.g.position.x + dx / n * m * 0.6, nz = M.g.position.z + dz / n * m * 0.6;
if (typeof sgaDlvBlocked !== "function" || !sgaDlvBlocked(nx, nz)) {
M.g.position.x = nx;
M.g.position.z = nz;
}
} };
}).filter(Boolean);
});
window.SPELL_FOES.push(function () {
if (typeof VRN === "undefined" || !VRN || !VRN.foes || !VRN.foes.list)
return [];
var F = VRN.foes;
return F.list.filter(function (E) { return E.hp > 0 && E.g; }).map(function (E) {
var w = cbtWP(E.g);
if (!w)
return null;
return { kind: "beast", story: true, ref: E, x: w.x, y: w.y, z: w.z, r: 0.6, name: "a convict", lv: 3, max: 2, hp: function () { return E.hp; }, dead: function () { return E.hp <= 0; },
hit: function () {
if (E.hp <= 0)
return;
E.hp--;
E.cd = Math.max(E.cd || 0, 0.8);
if (E.hp <= 0) {
E.g.visible = false;
if (E.g.parent)
E.g.parent.remove(E.g);
cbtKilled({ name: "convict", lv: 3 });
var left = F.list.filter(function (Q) { return Q.hp > 0; }).length;
if (!left && VRN.foes === F) {
VRN.foes = null;
try {
if (typeof vrnRidePanel === "function")
vrnRidePanel(false);
}
catch (e) { }
if (F.win)
try {
F.win();
}
catch (e) { }
}
else
cbtSay("⚔️ <b>That one runs for the jungle!</b> " + left + " left.");
}
},
hold: function (s) { E.cd = Math.max(E.cd || 0, +s || 0); }, calm: function (s) { E.cd = Math.max(E.cd || 0, +s || 0); }, push: function () { } };
}).filter(Boolean);
});
window.SPELL_FOES.push(function () {
if (typeof WD === "undefined" || !WD || !Array.isArray(WD.foes) || !WD.foes.length || typeof wdOn !== "function" || !wdOn())
return [];
var P = camera.position, Lc = typeof wdLocal === "function" ? wdLocal() : null;
if (!Lc)
return [];
var ox = P.x - Lc.x, oz = P.z - Lc.z;
return WD.foes.filter(function (F) { return !F.yield && !F.gone && F.kind !== "drone" && F.hp > 0; }).map(function (F) {
return { kind: "beast", story: true, ref: F, x: ox + F.x, y: F.y, z: oz + F.z, r: F.boss ? 1.2 : 0.6, name: F.name || "a foe", lv: Math.max(1, Math.round((F.max || 40) / 12)), max: F.max,
hp: function () { return F.hp; }, dead: function () { return !!F.yield || !!F.gone || F.hp <= 0; },
hit: function (d) {
if (F.yield)
return;
F.hp -= d;
F.hit = 0.2;
F.stun = Math.max(F.stun || 0, 0.35);
F.alert = 1;
if (F.hp <= 0) {
try {
if (typeof wdYield === "function")
wdYield(F);
}
catch (e) { }
cbtKilled({ name: F.name, lv: Math.max(1, Math.round((F.max || 40) / 12)), boss: !!F.boss });
}
},
hold: function (s) { F.stun = Math.max(F.stun || 0, +s || 0); }, calm: function (s) { F.stun = Math.max(F.stun || 0, +s || 0); },
push: function (dx, dz, m) { var n = Math.hypot(dx, dz) || 1; F.kx = dx / n * (+m || 0) * 3; F.kz = dz / n * (+m || 0) * 3; } };
});
});
})();
function cbtZoneChange(on) {
CBT.lock = null;
CBT.proj = [];
CBT.dots = [];
if (!on) {
CBT.move = null;
CBT.eng = 0;
if (CBT.bookOpen)
cbtBookPaint();
}
else {
var W = cbtWeapon();
CBT.lastW = "";
}
}
function cbtTick(dt) { return __ZC(494, 40, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
cbtTick(dt);
}
catch (e) {
if (!CBT.e2) {
CBT.e2 = 1;
if (window.console)
console.warn("[combat] tick", e);
}
} };
})();
if (typeof addEventListener === "function")
addEventListener("pagehide", function () { try {
if (CBT.dirty)
cbtSave();
}
catch (e) { } });
var CBT_SCHOOLS = { fire: { n: "Fire", i: "🔥", elem: "fire" }, frost: { n: "Frost", i: "❄️", elem: "frost" }, storm: { n: "Storm", i: "⚡", elem: "storm" },
light: { n: "Light", i: "✨", elem: "light" }, shadow: { n: "Shadow", i: "🌑", elem: "shadow" }, nature: { n: "Nature", i: "🌿", elem: "nature" }, world: { n: "Of the worlds", i: "🌍", elem: "star" } };
var CBT_MAGIC = [
{ id: "m_firebolt", sch: "fire", n: "Firebolt", i: "🔥", lv: 1, mana: 12, cd: 2.5, t: "shot", m: 1.4, spd: 38, dot: { dps: 0.25, t: 4 }, d: "A bolt of fire that sets the foe burning." },
{ id: "m_flamewave", sch: "fire", n: "Flame Wave", i: "🌊", lv: 7, mana: 24, cd: 9, t: "arc", m: 1.3, rng: 9, ang: 0.7, dot: { dps: 0.2, t: 4 }, d: "A wall of flame rolls out in front of you, nine metres, burning all it touches." },
{ id: "m_fireball", sch: "fire", n: "Fireball", i: "🟠", lv: 13, mana: 34, cd: 12, t: "zone", m: 2, rad: 3.5, ticks: 1, push: 2, d: "A ball of fire bursts on the foe and everything near it." },
{ id: "m_meteor", sch: "fire", n: "Meteor", i: "☄️", lv: 24, mana: 55, cd: 30, t: "zone", m: 2.8, rad: 5, ticks: 1, stun: 1.5, push: 3, d: "A falling star on the foe and all round it: it hits hard, throws them back and leaves them dazed." },
{ id: "m_iceshard", sch: "frost", n: "Ice Shard", i: "🧊", lv: 3, mana: 12, cd: 3, t: "shot", m: 1.3, spd: 46, slow: 2, d: "A shard of ice: it hurts, and the foe is slowed." },
{ id: "m_frostnova", sch: "frost", n: "Frost Nova", i: "❄️", lv: 6, mana: 24, cd: 12, t: "around", m: 0.9, rad: 6, slow: 3, d: "Ice bursts out round you: everything near is hurt and slowed." },
{ id: "m_glacial", sch: "frost", n: "Glacial Armour", i: "🥶", lv: 15, mana: 30, cd: 30, t: "buff", buff: "wall", dur: 10, v: 0.4, d: "Ice over your skin: blows land 40% softer for 10 seconds." },
{ id: "m_blizzard", sch: "frost", n: "Blizzard", i: "🌨️", lv: 28, mana: 62, cd: 40, t: "zone", m: 0.6, rad: 7, ticks: 8, gap: 0.35, slow: 2, d: "A blizzard on the foe for three seconds: everything in it is cut and slowed." },
{ id: "m_spark", sch: "storm", n: "Spark", i: "💥", lv: 1, mana: 8, cd: 1.6, t: "shot", m: 1, spd: 80, stun: 0.3, d: "A quick crack of lightning." },
{ id: "m_chain", sch: "storm", n: "Chain Lightning", i: "⚡", lv: 8, mana: 28, cd: 9, t: "volley", m: 1.2, rng: 22, n2: 4, stun: 0.6, d: "Lightning leaps to four foes in front of you, jolting each." },
{ id: "m_thunder", sch: "storm", n: "Thunderclap", i: "🌩️", lv: 17, mana: 36, cd: 16, t: "around", m: 1.4, rad: 6, push: 4, stun: 1, d: "Thunder breaks round you: foes are thrown back and dazed." },
{ id: "m_tempest", sch: "storm", n: "Tempest", i: "🌪️", lv: 32, mana: 70, cd: 45, t: "zone", m: 0.9, rad: 7, ticks: 6, gap: 0.4, slow: 1.5, d: "A storm on the foe for two and a half seconds: lightning and wind on everything in it." },
{ id: "m_heal", sch: "light", n: "Healing Light", i: "💛", lv: 4, mana: 30, cd: 20, t: "buff", buff: "regen", dur: 8, v: 3, mend: 25, d: "Light mends 25 vigour at once, and 3 more every second for 8 seconds." },
{ id: "m_smite", sch: "light", n: "Smite", i: "🔆", lv: 10, mana: 22, cd: 6, t: "shot", m: 2, spd: 90, d: "A spear of light thrown straight at the foe." },
{ id: "m_aegis", sch: "light", n: "Aegis", i: "🛡️", lv: 14, mana: 30, cd: 28, t: "buff", buff: "absorb", dur: 10, v: 60, d: "A shell of light soaks up 60 damage for 10 seconds." },
{ id: "m_radiance", sch: "light", n: "Radiance", i: "🌞", lv: 26, mana: 58, cd: 36, t: "around", m: 1.6, rad: 8, pulses: 3, gap: 0.4, mend: 30, d: "You blaze like the sun three times over: foes near you burn, and you mend 30." },
{ id: "m_shadowbolt", sch: "shadow", n: "Shadow Bolt", i: "🟣", lv: 2, mana: 12, cd: 2.8, t: "shot", m: 1.4, spd: 34, bleed: 3, d: "A bolt of darkness that keeps eating at the foe." },
{ id: "m_drain", sch: "shadow", n: "Life Drain", i: "🩸", lv: 12, mana: 30, cd: 14, t: "beam", m: 0.55, ticks: 6, gap: 0.25, drain: 0.5, d: "Draw the life out of the foe: half of what you take comes back to you." },
{ id: "m_shadowstep", sch: "shadow", n: "Shadow Step", i: "👤", lv: 19, mana: 26, cd: 12, t: "blink", m: 2.2, d: "Step through the dark to the foe's back and strike, a sure critical." },
{ id: "m_dread", sch: "shadow", n: "Veil of Dread", i: "😱", lv: 30, mana: 48, cd: 40, t: "buff", buff: "smoke", dur: 6, d: "Terror pours out of you: every foe near you forgets the fight for six seconds, and you slip away." },
{ id: "m_thorns", sch: "nature", n: "Thorn Volley", i: "🌵", lv: 5, mana: 18, cd: 6, t: "volley", m: 0.9, rng: 18, n2: 3, bleed: 3, d: "Thorns fly at three foes in front of you and stick." },
{ id: "m_entangle", sch: "nature", n: "Entangle", i: "🌿", lv: 11, mana: 26, cd: 16, t: "zone", m: 0.4, rad: 4, ticks: 1, stun: 2.5, d: "Roots burst up round the foe and hold everything there fast." },
{ id: "m_rejuv", sch: "nature", n: "Rejuvenation", i: "🍃", lv: 20, mana: 40, cd: 30, t: "buff", buff: "regen", dur: 10, v: 5, mend: 15, d: "Green life runs through you: 15 at once, and 5 every second for 10 seconds." },
{ id: "m_quake", sch: "nature", n: "Earthquake", i: "🌋", lv: 36, mana: 75, cd: 50, t: "around", m: 1.1, rad: 9, pulses: 4, gap: 0.5, stun: 0.6, d: "The ground heaves four times round you: everything standing near is thrown about." },
{ id: "w_deepshade", sch: "world", w: "underdark", wn: "the Underdark", elem: "shadow", n: "Deepshade Veil", i: "🕳️", lv: 14, mana: 36, cd: 30, t: "buff", buff: "smoke", dur: 5, d: "The Underdark's own darkness: you vanish into it, and the foes near you lose you." },
{ id: "w_solarflare", sch: "world", w: "mercury", wn: "Mercury", elem: "fire", n: "Solar Flare", i: "🌞", lv: 15, mana: 40, cd: 22, t: "around", m: 1.8, rad: 7, stun: 1.2, d: "Mercury's sun, let loose round you: blinding and burning." },
{ id: "w_acidrain", sch: "world", w: "venus", wn: "Venus", elem: "nature", n: "Acid Rain", i: "🌧️", lv: 16, mana: 40, cd: 24, t: "zone", m: 0.5, rad: 5, ticks: 6, gap: 0.4, dot: { dps: 0.2, t: 4 }, d: "Venus's clouds open over the foe: everything under them burns." },
{ id: "w_singing", sch: "world", w: "veyar", wn: "Veyar", elem: "star", n: "Singing Shards", i: "🎶", lv: 17, mana: 34, cd: 14, t: "volley", m: 1.3, rng: 24, n2: 5, d: "Crystal shards from Ilvessa sing their way to five foes." },
{ id: "w_starfall", sch: "world", w: "space", wn: "open space", elem: "star", n: "Starfall", i: "🌠", lv: 26, mana: 60, cd: 34, t: "zone", m: 1, rad: 6, ticks: 5, gap: 0.3, d: "Stars of the Far Reach rain down on the foe and all round it." },
{ id: "w_dust", sch: "world", w: "mars", wn: "Mars", elem: "fire", n: "Red Dust Storm", i: "🟥", lv: 9, mana: 28, cd: 20, t: "zone", m: 0.5, rad: 6, ticks: 5, gap: 0.4, slow: 2, d: "A Martian dust storm on the foe: they are scoured and slowed." },
{ id: "w_zero", sch: "world", w: "pluto", wn: "Pluto", elem: "frost", n: "Absolute Zero", i: "🧊", lv: 10, mana: 32, cd: 24, t: "around", m: 0.8, rad: 6, stun: 2, d: "Pluto's cold, out from you: everything near is frozen still for two seconds." },
{ id: "w_moonbeam", sch: "world", w: "moon", wn: "the Moon", elem: "light", n: "Moonbeam", i: "🌙", lv: 6, mana: 24, cd: 12, t: "beam", m: 0.5, ticks: 6, gap: 0.22, d: "A cold beam of moonlight held on the foe." },
{ id: "w_tidal", sch: "world", w: "sea", wn: "the Endless Sea", elem: "frost", n: "Tidal Wave", i: "🌊", lv: 9, mana: 30, cd: 18, t: "arc", m: 1.2, rng: 10, ang: 0.8, push: 6, d: "A wave of the Endless Sea crashes out in front of you and sweeps foes away." },
{ id: "w_pixie", sch: "world", w: "neverland", wn: "Neverland", elem: "light", n: "Pixie Dash", i: "🧚", lv: 7, mana: 20, cd: 10, t: "dash", m: 1.5, dist: 10, d: "Fairy dust and a happy thought: you fly ten metres at the foe and strike." },
{ id: "w_hellfire", sch: "world", w: "underworld", wn: "the Underworld", elem: "fire", n: "Hellfire", i: "👹", lv: 18, mana: 46, cd: 26, t: "zone", m: 0.8, rad: 5, ticks: 5, gap: 0.35, dot: { dps: 0.25, t: 5 }, d: "The fires under the Underworld rise round the foe and will not go out." },
{ id: "w_voidrift", sch: "world", w: "void", wn: "the Void", elem: "shadow", n: "Void Rift", i: "🌀", lv: 20, mana: 50, cd: 28, t: "zone", m: 1.2, rad: 4.5, ticks: 3, gap: 0.5, stun: 1, d: "A rift into nothing opens on the foe and tears at all near it." },
{ id: "w_magma", sch: "world", w: "fire", wn: "the Burning Lands", elem: "fire", n: "Magma Burst", i: "🌋", lv: 16, mana: 42, cd: 20, t: "around", m: 1.6, rad: 6, dot: { dps: 0.2, t: 4 }, d: "The Burning Lands' rock bursts molten round you." },
{ id: "w_ashfall", sch: "world", w: "wasteland", wn: "the Wasteland", elem: "nature", n: "Ashfall", i: "🌫️", lv: 15, mana: 38, cd: 22, t: "zone", m: 0.5, rad: 6, ticks: 6, gap: 0.4, bleed: 3, d: "The Wasteland's poisoned ash falls on the foe and chokes everything there." },
{ id: "w_comet", sch: "world", w: "frozen", wn: "the Frozen Realm", elem: "frost", n: "Ice Comet", i: "☄️", lv: 12, mana: 32, cd: 14, t: "shot", m: 2.6, spd: 30, slow: 3, d: "A comet of Isvarden ice: one great blow, and the foe slowed for three seconds." },
{ id: "w_soulrend", sch: "world", w: "dead", wn: "the Land of the Dead", elem: "shadow", n: "Soul Rend", i: "👻", lv: 12, mana: 32, cd: 16, t: "beam", m: 0.6, ticks: 6, gap: 0.25, drain: 0.4, d: "Pull at the foe's very soul: some of it comes to you." },
{ id: "w_riptide", sch: "world", w: "depths", wn: "the Deep", elem: "frost", n: "Riptide", i: "🫧", lv: 10, mana: 28, cd: 12, t: "volley", m: 1.1, rng: 18, n2: 3, slow: 1.5, d: "Coils of the deep's current lash three foes and drag at them." },
{ id: "w_sandstorm", sch: "world", w: "desert", wn: "the Endless Desert", elem: "fire", n: "Sandstorm", i: "🏜️", lv: 9, mana: 28, cd: 20, t: "zone", m: 0.45, rad: 6, ticks: 6, gap: 0.4, slow: 2, d: "The desert's sand, whirling on the foe: scoured and slowed." },
{ id: "w_bell", sch: "world", w: "delve", wn: "the dungeons under the Bell Tower", elem: "storm", n: "Bell of the Dead", i: "🔔", lv: 8, mana: 30, cd: 20, t: "around", m: 1.2, rad: 7, stun: 1.6, d: "The great bell tolls through you: every foe near is struck and stunned." },
{ id: "w_lantern", sch: "world", w: "dmk", wn: "the dreamers' own dungeons", elem: "light", n: "Delver's Lantern", i: "🏮", lv: 6, mana: 24, cd: 30, t: "buff", buff: "might", dur: 12, v: 0.25, d: "A lantern of the deep places lights your blows: a quarter harder for 12 seconds." }
];
CBT_MAGIC.forEach(function (S) { if (!S.elem)
S.elem = CBT_SCHOOLS[S.sch].elem; });
var CBT_MAGIC_BY = {};
CBT_MAGIC.forEach(function (S) { CBT_MAGIC_BY[S.id] = S; });
function cbtManaMax() { return Math.round(100 + 6 * cbtSk("arc") + Math.min(60, cbtLevel())); }
function cbtMagicKnown() { var p = cbtP(); if (!Array.isArray(p.mk))
p.mk = []; return p.mk; }
function cbtMagicKnows(id) { return cbtMagicKnown().indexOf(id) >= 0; }
function cbtMagicChosen() { return __ZC(494, 41, this, arguments, new.target); }
function cbtMagicPut(id, slot) { return __ZC(494, 42, this, arguments, new.target); }
function cbtMagicPick(id) {
if (!CBT_MAGIC_BY[id] || !cbtMagicKnows(id))
return;
var cur = cbtMagicChosen().filter(Boolean);
if (cur.indexOf(id) >= 0)
return;
if (cur.length >= 4)
cur.shift();
cur.push(id);
cbtP().sl = cur;
if (typeof save === "function")
try {
save();
}
catch (e) { }
}
function cbtLearnSpell(id, how) { return __ZC(494, 43, this, arguments, new.target); }
var CBT_TOME = { on: [], findT: 0, next: 420, dropped: 0 };
function cbtTomeChoices(foeLv, here) { return __ZC(494, 44, this, arguments, new.target); }
function cbtTomePick(foeLv) {
var list = cbtTomeChoices(foeLv, cbtTomeHere());
if (!list.length)
return null;
var sum = list.reduce(function (a, o) { return a + o.wt; }, 0), r = Math.random() * sum;
for (var i = 0; i < list.length; i++) {
r -= list[i].wt;
if (r <= 0)
return list[i].S;
}
return list[list.length - 1].S;
}
function cbtTomeHere() { try {
if (typeof WLD !== "undefined" && WLD.on && (WLD.on === "delve" || WLD.on === "dmk"))
return WLD.on;
}
catch (e) { } return cbtWhereId(); }
function cbtTomeMesh(col) { return __ZC(494, 45, this, arguments, new.target); }
function cbtTomeDrop(S, x, y, z, how) { return __ZC(494, 46, this, arguments, new.target); }
function cbtTomeGone(T) { try {
if (T.m.parent)
T.m.parent.remove(T.m);
T.m.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material)
o.material.dispose(); });
}
catch (e) { } }
function cbtTomeTick(dt) { return __ZC(494, 47, this, arguments, new.target); }
function cbtTomeFind() { return __ZC(494, 48, this, arguments, new.target); }
(function () {
var ck = cbtKilled;
cbtKilled = function (o) {
var r = ck.apply(this, arguments);
try {
o = o || {};
var ch = o.boss || !cbtMagicKnown().length ? 1 : (0.07 + Math.min(0.08, (+o.lv || 1) * 0.004));
if (Math.random() < ch) {
var S = cbtTomePick(+o.lv || 1);
if (S) {
var P = camera.position, F = cbtFwd(), f = CBT.pick, gy = P.y - 1.72, at;
if (o.at)
at = { x: o.at.x, z: o.at.z, y: o.at.y - 1.1 };
else if (f)
at = { x: f.x, z: f.z, y: cbtFeetOf(f) };
else
at = { x: P.x + F.x * 2, z: P.z + F.z * 2, y: gy };
if (!(Math.abs(at.y - gy) < 3))
at.y = gy;
cbtTomeDrop(S, at.x, at.y, at.z, o.boss ? "The " + String(o.name || "boss") + " leaves a tome" : "Won from " + String(o.name || "a foe"));
cbtFloatText("📖 Spell tome", { x: at.x, y: at.y + 1.4, z: at.z }, "#D8C0FF", 1.1, true);
}
}
}
catch (e) {
cbtWarn("tome drop", e);
}
return r;
};
window.cbtKilled = cbtKilled;
})();
function cbtSpellRoll(m) { return __ZC(494, 49, this, arguments, new.target); }
function cbtSpellState(i) { return __ZC(494, 50, this, arguments, new.target); }
function cbtSpell(i) { return __ZC(494, 51, this, arguments, new.target); }
function cbtPadMagic(on) { return __ZC(494, 52, this, arguments, new.target); }
(function () {
if (typeof cbtNextReady !== "function")
return;
var nr = cbtNextReady, flip = 0;
cbtNextReady = function () { flip ^= 1; if (flip) {
for (var i = 0; i < 4; i++) {
var q = cbtSpellState(i);
if (q.ready && q.A.t !== "buff") {
cbtSpell(i);
return;
}
}
} return nr.apply(this, arguments); };
})();
(function () {
var ct = cbtTick;
cbtTick = function (dt) {
var r = ct.apply(this, arguments);
try {
var mx = cbtManaMax();
if (CBT.mana == null)
CBT.mana = mx;
if (!CBT.on)
CBT.mana = mx;
else {
var rate = CBT.eng > 0 ? (5 + 0.5 * cbtSk("arc")) : 25;
if (CBT.t - (CBT.manaT || -9) < 1.2)
rate *= 0.25;
CBT.mana = Math.min(mx, CBT.mana + rate * dt);
}
var R = CBT.buffs.regen;
if (R && R.until > CBT.t) {
CBT.regenAcc = (CBT.regenAcc || 0) + R.v * dt;
if (CBT.regenAcc >= 1) {
var n = Math.floor(CBT.regenAcc);
CBT.regenAcc -= n;
cbtHeal(n);
}
}
cbtTomeTick(dt);
cbtMagicHud();
}
catch (e) {
cbtWarn("magic tick", e);
}
return r;
};
})();
function cbtMagicHudMake() { return __ZC(494, 53, this, arguments, new.target); }
function cbtMagicHud() { return __ZC(494, 54, this, arguments, new.target); }
(function () {
if (typeof cbtHudTick !== "function")
return;
var ht = cbtHudTick;
cbtHudTick = function (dt) { var r = ht.apply(this, arguments); try {
if (CBT.padMagic) {
CBT.mgT = 0;
cbtMagicHud();
}
if (!CBT.on && CBT.padMagic)
cbtPadMagic(false);
}
catch (e) { } return r; };
})();
function cbtMagicBookHtml() { return __ZC(494, 55, this, arguments, new.target); }
"use strict";
var CBT_AM_FAMS = {
arrow: { n: "Arrows", one: "arrow", i: "🏹", pack: 12, price: 96, need: { cr_wood: 1, cr_ore: 1, cr_cloth: 1 }, for: "bows: the longbow, the horse bow, the Wyrmbone Longbow" },
bolt: { n: "Crossbow bolts", one: "bolt", i: "➶", pack: 10, price: 100, need: { cr_wood: 1, cr_ore: 1 }, for: "crossbows and the arbalest" },
sling: { n: "Sling shot", one: "sling bullet", i: "🪨", pack: 20, price: 20, need: { cr_ore: 1 }, for: "the shepherd's sling" },
javelin: { n: "Javelins", one: "javelin", i: "🔱", pack: 3, price: 90, need: { cr_wood: 2, cr_ore: 1 }, for: "the atlatl javelin and the legion pilum" },
star: { n: "Throwing stars", one: "star", i: "✴️", pack: 10, price: 50, need: { cr_ore: 2 }, for: "throwing stars and darts" },
ball: { n: "Powder and ball", one: "ball", i: "⚫", pack: 20, price: 40, need: { cr_ore: 1, cr_coal: 2 }, for: "flintlocks, muskets, the blunderbuss and the hand cannon" },
cart: { n: "Cartridges", one: "round", i: "🔸", pack: 50, price: 50, need: { cr_ore: 2, cr_coal: 2 }, for: "revolvers, rifles, submachine guns, assault rifles, the sniper's rifle and the Gatling" },
shell: { n: "Shotgun shells", one: "shell", i: "🔴", pack: 25, price: 30, need: { cr_ore: 1, cr_coal: 1, cr_cloth: 1 }, for: "shotguns" },
blast: { n: "Rockets, grenades and shells", one: "round", i: "🚀", pack: 4, price: 180, need: { cr_parts: 1, cr_ember: 1, cr_steel: 1 }, for: "grenades, the rocket and grenade launchers, the field mortar, the flare pistol and the Greek-fire pot" },
cell: { n: "Power cells", one: "charge", i: "🔋", pack: 10, price: 60, need: { cr_crystal: 1, cr_parts: 1 }, for: "blasters, plasma and pulse rifles, the rail gun, the ion cannon, the arc caster, the freeze ray and every star weapon" }
};
var CBT_AM_FAM_ORDER = ["arrow", "bolt", "sling", "javelin", "star", "ball", "cart", "shell", "blast", "cell"];
var CBT_AM_TYPES = {
std: { n: "Standard", i: "•", pm: 1, need: {}, elem: "steel", d: "Well made, nothing more: a little harder than plain rounds." },
barb: { n: "Barbed", i: "🩸", pm: 1.4, need: { cr_steel: 1 }, elem: "blood", d: "Tears as it goes in: the foe bleeds for four seconds." },
pierce: { n: "Piercing", i: "➵", pm: 1.6, need: { cr_steel: 2 }, elem: "steel", d: "Goes through one foe into the next behind it, and bites hardest on the big ones and bosses." },
fire: { n: "Fire", i: "🔥", pm: 1.8, need: { cr_ember: 1 }, elem: "fire", d: "Sets the foe burning for three seconds." },
frost: { n: "Frost", i: "❄️", pm: 1.8, need: { cr_crystal: 1 }, elem: "frost", d: "Ice where it lands: the foe is slowed." },
shock: { n: "Shock", i: "⚡", pm: 2, need: { cr_crystal: 1, cr_parts: 1 }, elem: "storm", d: "A jolt that stops the foe for a moment and jumps to one more near it." },
venom: { n: "Venom", i: "🧪", pm: 1.7, need: { cr_hide: 2 }, elem: "nature", d: "Poison that keeps biting for six seconds." },
blast: { n: "Explosive", i: "💥", pm: 2.5, need: { cr_ember: 2 }, elem: "fire", d: "Bursts where it lands, hurting everything close round the foe." },
silver: { n: "Silver", i: "🌙", pm: 4, need: { cr_crystal: 2 }, elem: "light", d: "The bane of the undead, the beasts of the night, spirits and demons: far harder on them, a little softer on anything else." }
};
var CBT_AM_TYPE_ORDER = ["std", "barb", "pierce", "fire", "frost", "shock", "venom", "blast", "silver"];
var CBT_AM_NAMES = {
arrow: ["field arrows", "broadhead arrows", "bodkin arrows", "fire arrows", "frost arrows", "thunder arrows", "venom arrows", "blasting arrows", "silver arrows"],
bolt: ["crossbow bolts", "barbed bolts", "armour-piercing quarrels", "fire bolts", "frost bolts", "thunder bolts", "venom bolts", "blasting bolts", "silver bolts"],
sling: ["lead sling bullets", "spiked sling bullets", "iron-core sling bullets", "fire pellets", "frost pellets", "thunderstones", "venom pellets", "blasting pellets", "silver sling bullets"],
javelin: ["javelins", "barbed javelins", "pila", "fire javelins", "frost javelins", "storm javelins", "venom javelins", "blasting javelins", "silver javelins"],
star: ["throwing stars", "serrated stars", "needle darts", "fire stars", "frost stars", "spark stars", "venom darts", "blasting stars", "silver stars"],
ball: ["powder and ball", "jagged shot", "steel ball", "fire shot", "frost shot", "thunder shot", "venom shot", "exploding shot", "silver ball"],
cart: ["cartridges", "hollow-point rounds", "armour-piercing rounds", "incendiary rounds", "cryo rounds", "shock rounds", "venom-tipped rounds", "explosive rounds", "silver bullets"],
shell: ["buckshot shells", "flechette shells", "slug shells", "dragon's-breath shells", "frost shells", "shock shells", "venom shells", "explosive shells", "silver shells"],
blast: ["high-explosive rounds", "shrapnel rounds", "shaped-charge rounds", "incendiary rounds", "cryo rounds", "EMP rounds", "gas rounds", "thermobaric rounds", "silver-shot rounds"],
cell: ["power cells", "scatter cells", "overcharged cells", "plasma-fire cells", "cryo cells", "ion cells", "toxin cells", "fusion cells", "argent cells"]
};
var CBT_AM_GRADES = [
{ k: "crude", n: "Crude", lv: 1, dm: 1.04, g: 0.6, pm: 0.5, sold: true, col: "#B8B0A4", need: {} },
{ k: "common", n: "Common", lv: 1, dm: 1.1, g: 0.8, pm: 1, sold: true, col: "#F2EDE4", need: { cr_coal: 1 } },
{ k: "fine", n: "Fine", lv: 8, dm: 1.2, g: 1, pm: 2, sold: true, col: "#8FE09A", need: { cr_steel: 1 } },
{ k: "superior", n: "Superior", lv: 18, dm: 1.34, g: 1.25, pm: 4, sold: true, col: "#8AB8FF", need: { cr_steel: 2, cr_crystal: 1 } },
{ k: "masterwork", n: "Masterwork", lv: 28, dm: 1.5, g: 1.55, pm: 9, sold: false, col: "#C89AFF", need: { cr_steel: 3, cr_crystal: 2, cr_ember: 1 } },
{ k: "legendary", n: "Legendary", lv: 40, dm: 1.75, g: 2, pm: 25, sold: false, col: "#FFB45A", need: { cr_scale: 1, cr_crystal: 3, cr_ember: 2 } }
];
var CBT_AM_STATIONS = {
warforge: CBT_AM_FAM_ORDER.slice(),
volcano: CBT_AM_FAM_ORDER.slice(),
smithy: ["arrow", "bolt", "sling", "javelin", "star", "ball", "cart", "shell"],
joinery: ["arrow", "bolt", "javelin"],
engineer: ["cart", "shell", "blast", "cell"],
garage: ["cart", "shell", "blast", "cell"]
};
var CBT_AM_GREAT = ["warforge", "volcano"];
function cbtAmKey(fam, type, g) { return fam + "." + type + "." + g; }
function cbtAmParse(k) {
var m = /^([a-z]+)\.([a-z]+)\.([0-5])$/.exec(String(k || ""));
if (!m || !CBT_AM_FAMS[m[1]] || !CBT_AM_TYPES[m[2]])
return null;
return { k: m[0], fam: m[1], type: m[2], g: +m[3], F: CBT_AM_FAMS[m[1]], T: CBT_AM_TYPES[m[2]], G: CBT_AM_GRADES[+m[3]] };
}
function cbtAmName(k) {
var a = cbtAmParse(k);
if (!a)
return String(k || "");
return a.G.n + " " + CBT_AM_NAMES[a.fam][CBT_AM_TYPE_ORDER.indexOf(a.type)];
}
function cbtAmPrice(k) {
var a = cbtAmParse(k);
if (!a)
return 0;
return Math.max(1, Math.round(a.F.price * a.T.pm * a.G.pm));
}
function cbtAmWorth(k) { var a = cbtAmParse(k); return a ? a.F.price * a.T.pm / a.F.pack : 0; }
function cbtAmNeed(k) {
var a = cbtAmParse(k);
if (!a)
return {};
var out = {};
[a.F.need, a.T.need, a.G.need].forEach(function (o) { Object.keys(o).forEach(function (m) { out[m] = (out[m] || 0) + o[m]; }); });
return out;
}
function cbtAmAllKinds() {
var out = [];
CBT_AM_FAM_ORDER.forEach(function (f) { CBT_AM_TYPE_ORDER.forEach(function (t) { for (var g = 0; g < CBT_AM_GRADES.length; g++)
out.push(cbtAmKey(f, t, g)); }); });
return out;
}
function cbtAmFamOf(W) { return __ZC(494, 56, this, arguments, new.target); }
var CBT_AM_BANE = /skelet|zombie|ghoul|ghost|wraith|spectre|specter|vampire|were|lich|undead|revenant|banshee|shade|spirit|demon|devil|fiend|\bimp\b|wight|mummy|bone|hellhound|hound of|witch|hag|nightmare|barrow|draugr|shadow|phantom|spook|haunt|corpse|grave|cerberus|harpy|fury|gorgon/i;
var CBT_AM = { srv: "", retryAt: 0, used: {}, flushT: 20, live: null, cur: null, curF: null, inDeal: 0, inX: 0, warned: {}, el: null,
on: true, use: true, price: 1, drop: 1, saveT: 0, buyFam: null, buyG: 1, busy: false, outSaid: {} };
function cbtAmP() {
var p = cbtP();
if (!p.am || typeof p.am !== "object")
p.am = {};
if (!p.am.s || typeof p.am.s !== "object")
p.am.s = {};
if (!p.am.ld || typeof p.am.ld !== "object")
p.am.ld = {};
return p.am;
}
function cbtAmHave(k) { return Math.max(0, +cbtAmP().s[k] || 0); }
function cbtAmSet(k, n) { var S = cbtAmP().s; n = Math.max(0, Math.floor(+n || 0)); if (n > 0)
S[k] = n;
else
delete S[k]; CBT_AM.saveT = Math.min(CBT_AM.saveT || 20, 20); }
function cbtAmCanLoad(k) { var a = cbtAmParse(k); return !!a && cbtLevel() >= a.G.lv; }
function cbtAmOwned(fam) {
var S = cbtAmP().s, out = [];
Object.keys(S).forEach(function (k) { var a = cbtAmParse(k); if (a && a.fam === fam && S[k] > 0)
out.push(k); });
return out.sort(function (x, y) { var a = cbtAmParse(x), b = cbtAmParse(y); return b.g - a.g || CBT_AM_TYPE_ORDER.indexOf(a.type) - CBT_AM_TYPE_ORDER.indexOf(b.type); });
}
function cbtAmLoaded(fam) { return __ZC(494, 57, this, arguments, new.target); }
function cbtAmLoad(fam, k) {
if (!CBT_AM_FAMS[fam])
return false;
if (k && !cbtAmCanLoad(k)) {
var a = cbtAmParse(k);
cbtSay("<b>" + cbtEsc(cbtAmName(k)) + "</b> needs combat level " + (a ? a.G.lv : "?") + " (you are " + cbtLevel() + ").");
return false;
}
cbtAmP().ld[fam] = k || "";
CBT_AM.saveT = Math.min(CBT_AM.saveT || 20, 5);
return true;
}
function cbtAmCycle() { return __ZC(494, 58, this, arguments, new.target); }
function cbtAmFire(W, n) { return __ZC(494, 59, this, arguments, new.target); }
function cbtAmMult(a, f) { return __ZC(494, 60, this, arguments, new.target); }
function cbtAmSplash(o, d, col) {
if (!o || !(d > 0))
return;
d = Math.max(1, Math.round(d));
CBT_AM.inX = 1;
try {
o.hit(d);
var cy = cbtChestOf(o);
cbtBurst(o.x, cy, o.z, col, 5, 2, 0.4, 0.2);
cbtFloatText(String(d), { x: o.x, y: cy, z: o.z }, "#FFE0B0", 0.8);
}
catch (e) {
cbtWarn("ammo splash", e);
}
CBT_AM.inX = 0;
}
function cbtAmAfter(a, f, d) { return __ZC(494, 61, this, arguments, new.target); }
(function () {
var dl = cbtDeal;
cbtDeal = function (f, roll, o) {
o = o || {};
var L = CBT_AM.live, a = null;
if (!CBT_AM.inX && L && roll && o.W && o.W.key !== "spell" && o.W.ranged && L.wk === o.W.key && CBT.t <= L.until)
a = L.a;
if (a) {
roll = { d: Math.max(1, Math.round(roll.d * cbtAmMult(a, f))), crit: roll.crit };
if (a.type !== "std" && !o.elem)
o.elem = a.T.elem;
}
CBT_AM.inDeal++;
var d;
try {
d = dl.call(this, f, roll, o);
}
finally {
CBT_AM.inDeal--;
}
if (a && d > 0)
cbtAmAfter(a, f, d);
return d;
};
var bl = cbtBlow;
cbtBlow = function (f, W, mult, big) {
var a = null, nat = false;
try {
if (W && W.ranged) {
a = cbtAmFire(W, 1);
if (a && f) {
nat = !!(f.ref && typeof DGB !== "undefined" && DGB.on.indexOf(f.ref) >= 0) || (WLD.on === "delve" && !!f.delve);
if (nat) {
CBT_AM.live.native = true;
CBT_AM.cur = a;
CBT_AM.curF = f;
}
}
}
}
catch (e) {
cbtWarn("ammo shot", e);
}
var hp0 = null;
try {
if (nat && f)
hp0 = f.hp ? f.hp() : (f.ref && f.ref.hp);
}
catch (e) { }
var r;
try {
r = bl.apply(this, arguments);
}
finally {
CBT_AM.cur = null;
CBT_AM.curF = null;
}
try {
if (a && nat && hp0 != null && !(WLD.on === "delve")) {
var h1 = f.hp ? f.hp() : (f.ref && f.ref.hp);
if (h1 != null && h1 < hp0) {
CBT_AM.live.native = false;
cbtAmAfter(a, f, hp0 - h1);
}
}
}
catch (e) { }
return r;
};
var rn = cbtRun;
cbtRun = function (A, W, f) {
try {
if (A && !A.spell && W && W.ranged && cbtAmFamOf(W)) {
var n = A.t === "volley" || A.t === "multi" ? (A.n2 || 1) : A.t === "zone" ? (A.ticks || 1) : A.t === "beam" ? Math.ceil((A.ticks || 2) / 2) : (A.t === "shot" || A.t === "back") ? 1 : 0;
if (n > 0)
cbtAmFire(W, n);
}
}
catch (e) {
cbtWarn("ammo ability", e);
}
return rn.apply(this, arguments);
};
if (typeof dgbMyDmg === "function") {
var md = dgbMyDmg;
dgbMyDmg = function () {
var d = md.apply(this, arguments);
try {
if (CBT_AM.cur && !CBT.raw)
d = Math.max(1, Math.round(d * cbtAmMult(CBT_AM.cur, CBT_AM.curF)));
}
catch (e) { }
return d;
};
}
if (typeof sgaDlvDamage === "function") {
var sd = sgaDlvDamage;
sgaDlvDamage = function (M, dmg, knock, byComp) {
var L = CBT_AM.live, a = null;
if (!byComp && !CBT_AM.inDeal && !CBT_AM.inX && L && L.native && CBT.t <= L.until && typeof WLD !== "undefined" && WLD.on === "delve") {
a = L.a;
L.native = false;
dmg = Math.max(1, Math.round((+dmg || 0) * cbtAmMult(a, null)));
}
var r = sd.call(this, M, dmg, knock, byComp);
if (a) {
try {
var f = cbtFoes(60).filter(function (q) { return q.ref === M; })[0];
if (f)
cbtAmAfter(a, f, dmg);
}
catch (e) { }
}
return r;
};
}
})();
function cbtAmFamsYouUse() { return __ZC(494, 62, this, arguments, new.target); }
function cbtAmRollDrop(lv, boss, deep) { return __ZC(494, 63, this, arguments, new.target); }
function cbtAmGain(k, n, why, at) { return __ZC(494, 64, this, arguments, new.target); }
(function () {
var ck = cbtKilled;
cbtKilled = function (o) {
var r = ck.apply(this, arguments);
try {
o = o || {};
if (!CBT_AM.on)
return r;
var deep = typeof WLD !== "undefined" && (WLD.on === "delve" || WLD.on === "dmk");
var ch = o.boss ? 1 : Math.min(0.9, (deep ? 0.32 : 0.22) * (CBT_AM.drop >= 0 ? CBT_AM.drop : 1));
if (CBT_AM.drop > 0 && Math.random() < ch) {
var D = cbtAmRollDrop(o.lv, o.boss, deep);
cbtAmGain(D.k, D.n, o.boss ? "from the " + String(o.name || "boss") : "from " + String(o.name || "a foe"), o.at ? { x: o.at.x, y: o.at.y + 0.4, z: o.at.z } : null);
}
}
catch (e) {
cbtWarn("ammo drop", e);
}
return r;
};
window.cbtKilled = cbtKilled;
if (typeof sgaDlvWon === "function") {
var sw = sgaDlvWon;
sgaDlvWon = function () {
var r = sw.apply(this, arguments);
try {
if (CBT_AM.on && CBT_AM.drop > 0) {
var D = cbtAmRollDrop(Math.max(20, cbtLevel() + 4), true, true);
cbtAmGain(D.k, D.n, "in the dungeon's hoard");
}
}
catch (e) { }
return r;
};
}
})();
function cbtAmSync() { return __ZC(494, 65, this, arguments, new.target); }
function cbtAmRules(r) {
if (!r)
return;
if (r.on != null)
CBT_AM.on = r.on !== false;
if (r.use != null)
CBT_AM.use = r.use !== false;
if (+r.price >= 0 && r.price != null)
CBT_AM.price = +r.price;
if (+r.drop >= 0 && r.drop != null)
CBT_AM.drop = +r.drop;
}
function cbtAmTake(r) {
if (!r || !r.stock || typeof r.stock !== "object")
return;
var A = cbtAmP(), S = {};
Object.keys(r.stock).forEach(function (k) { if (cbtAmParse(k)) {
var n = Math.max(0, (+r.stock[k] || 0) - (CBT_AM.used[k] || 0));
if (n > 0)
S[k] = n;
} });
A.s = S;
cbtAmHudPaint(true);
}
function cbtAmFlush() { return __ZC(494, 66, this, arguments, new.target); }
(function () {
var ct = cbtTick;
cbtTick = function (dt) {
var r = ct.apply(this, arguments);
try {
if (CBT_AM.srv === "" || (CBT_AM.srv === "later" && CBT.t > (CBT_AM.retryAt || 0)))
cbtAmSync();
CBT_AM.flushT -= Math.min(0.1, Math.max(0, dt || 0));
if (CBT_AM.flushT <= 0)
cbtAmFlush();
CBT_AM.ht = (CBT_AM.ht || 0) - (dt || 0);
if (CBT_AM.ht <= 0) {
CBT_AM.ht = 0.25;
cbtAmHudPaint(false);
}
}
catch (e) {
cbtWarn("ammo tick", e);
}
return r;
};
if (typeof addEventListener === "function")
addEventListener("pagehide", function () { try {
cbtAmFlush();
}
catch (e) { } });
})();
function cbtAmHudPaint(force) { return __ZC(494, 67, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyT" || e.repeat || !CBT.on || CBT.bookOpen || cbtTyping(e) || e.ctrlKey || e.metaKey || e.altKey)
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
if (!cbtAmFamOf(cbtWeapon()))
return;
e.preventDefault();
e.stopImmediatePropagation();
cbtAmCycle();
}, true);
function cbtAmBookHtml() { return __ZC(494, 68, this, arguments, new.target); }
(function () {
if (typeof cbtMagicBookHtml === "function") {
var mb = cbtMagicBookHtml;
cbtMagicBookHtml = function () { var h = mb.apply(this, arguments); try {
h += cbtAmBookHtml();
}
catch (e) {
cbtWarn("ammo book", e);
} return h; };
}
var bk = cbtBook;
cbtBook = function (open) {
var r = bk.apply(this, arguments);
try {
var B = CBT.panel;
if (B && !B.amHooked) {
B.amHooked = 1;
B.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-cb]");
if (!t)
return;
var k = t.getAttribute("data-cb");
if (!/^am:ld:/.test(k))
return;
var p = k.split(":");
cbtAmLoad(p[2], p.slice(3).join(":"));
CBT_AM.outSaid[p[2]] = 0;
cbtBookPaint();
});
}
}
catch (e) { }
return r;
};
})();
function cbtAmStationFams(st) { return CBT_AM_STATIONS[st] || []; }
function cbtAmPriceNow(k) { return Math.max(0, Math.round(cbtAmPrice(k) * (CBT_AM.price >= 0 ? CBT_AM.price : 1))); }
function cbtAmForgeHtml() { return __ZC(494, 69, this, arguments, new.target); }
function cbtAmForgeAct(act, k, packs) { return __ZC(494, 70, this, arguments, new.target); }
(function () {
if (typeof fgPaint !== "function" || typeof fgClick !== "function")
return;
var fp = fgPaint;
fgPaint = function () {
var r = fp.apply(this, arguments);
try {
if (!FG.open || !FG.el || !cbtAmStationFams(FG.st).length)
return r;
var tb = FG.el.querySelector("[data-fg='tab:make']"), row = tb && tb.parentNode;
if (!row)
return r;
if (row && !row.querySelector("[data-fg='tab:ammo']")) {
var b = document.createElement("span");
b.innerHTML = fgB("tab:ammo", "🏹 Ammunition", FG.tab === "ammo");
row.appendChild(b.firstChild);
}
if (FG.tab === "ammo" && !FG.work && typeof signedIn === "function" && signedIn() && !FG.missing) {
while (row.nextSibling)
FG.el.removeChild(row.nextSibling);
var box = document.createElement("div");
box.innerHTML = (FG.msg ? "<div style='margin:6px 0;padding:6px 9px;border-radius:4px;background:rgba(232,198,106,.10);border:1px solid rgba(232,198,106,.35)'>" + FG.msg + "</div>" : "") + cbtAmForgeHtml();
FG.el.appendChild(box);
}
}
catch (e) {
cbtWarn("ammo counter", e);
}
return r;
};
var fc = fgClick;
fgClick = function (a, t) {
var p = String(a || "").split(":");
if (p[0] === "am") {
if (p[1] === "fam") {
CBT_AM.buyFam = p[2];
FG.msg = "";
fgPaint();
return;
}
if (p[1] === "g") {
CBT_AM.buyG = +p[2] || 0;
FG.msg = "";
fgPaint();
return;
}
if (p[1] === "buy" || p[1] === "make") {
cbtAmForgeAct(p[1], p[2], +p[3] || 1);
return;
}
return;
}
return fc.apply(this, arguments);
};
})();
var DGL = { stack: [], el: null, srv: "", warned: 0 };
var DGL_COL = { c: "#E6E0D4", u: "#8FDCA4", r: "#7AB0FF", e: "#C89AFF", l: "#FFB45A" };
function dglEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function dglShow(title, rows, note) { return __ZC(494, 71, this, arguments, new.target); }
function dglWeaponPick(lv, boss) { return __ZC(494, 72, this, arguments, new.target); }
function dglWeaponGive(k, from) { return __ZC(494, 73, this, arguments, new.target); }
function dglLocal(o) { return __ZC(494, 74, this, arguments, new.target); }
function dglServer(where, run, o) { return __ZC(494, 75, this, arguments, new.target); }
function dglTake(where, run, o, title) { return __ZC(494, 76, this, arguments, new.target); }
var DGN_LEAVE = { on: "", btn: null, t: 0 };
function dgnWorld() { var w = (typeof WLD !== "undefined" && WLD.on) || ""; return w === "dmk" || w === "delve" ? w : ""; }
function dgnWon() {
var w = dgnWorld();
try {
if (w === "dmk")
return !!(typeof DMK !== "undefined" && DMK.run && DMK.run.won);
if (w === "delve")
return !!(typeof SGA !== "undefined" && SGA.delve && SGA.delve.won);
}
catch (e) { }
return false;
}
function dgnOut() {
var w = dgnWorld();
try {
if (w === "dmk" && typeof dmkOut === "function")
return dmkOut();
if (w === "delve")
return worldHome("<b>You climb back up into the daylight.</b>");
}
catch (e) { }
try {
worldHome();
}
catch (e2) { }
}
function dgnLeaveAsk(out) { return __ZC(494, 77, this, arguments, new.target); }
(function () {
function css() {
if (document.getElementById("dgn-leave-css") || !document.head)
return;
var st = document.createElement("style");
st.id = "dgn-leave-css";
st.textContent = "body.dgn-in #t-back{position:fixed!important;left:calc(12px + env(safe-area-inset-left,0px))!important;right:auto!important;" +
"top:calc(118px + env(safe-area-inset-top,0px))!important;bottom:auto!important;margin:0!important;z-index:46}" +
"#dgn-leave{position:fixed;z-index:46;left:50%;transform:translateX(-50%);top:calc(150px + env(safe-area-inset-top,0px));display:none;" +
"background:rgba(28,22,14,.92);color:#FFE7B0;border:1px solid #C9A868;border-radius:20px;padding:9px 18px;font:600 14px var(--sans,system-ui);cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.45)}";
document.head.appendChild(st);
}
function tick() {
css();
var w = dgnWorld(), won = w && dgnWon();
if (document.body) {
var has = document.body.classList.contains("dgn-in");
if (!!w !== has)
document.body.classList.toggle("dgn-in", !!w);
}
var b = DGN_LEAVE.btn;
if (won && !b && document.body) {
b = DGN_LEAVE.btn = document.createElement("button");
b.id = "dgn-leave";
b.type = "button";
b.textContent = "⬆ Leave the dungeon";
b.onclick = function (e) { e.stopPropagation(); b.style.display = "none"; dgnOut(); };
document.body.appendChild(b);
}
if (b) {
var show = !!won && !(typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block");
if ((b.style.display !== "none") !== show)
b.style.display = show ? "block" : "none";
}
}
setInterval(tick, 400);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["dgn-leave"] = 1;
})();
function dgnSceneBack(W, own) { return __ZC(494, 78, this, arguments, new.target); }
(function () {
function wrap(W) {
if (!W || W.dgnWrapped || typeof W.back !== "function")
return;
W.dgnWrapped = 1;
var src = "";
try {
src = String(W.back);
}
catch (e) { }
if (!/\.start\b/.test(src))
return;
var own = W.back;
W.back = function () { dgnSceneBack(W, own); };
}
function sweep() { try {
if (typeof WORLDS !== "undefined")
Object.keys(WORLDS).forEach(function (k) { wrap(WORLDS[k]); });
}
catch (e) { } }
if (typeof worldDef === "function") {
var wd = worldDef;
worldDef = function (k, d) { var r = wd.apply(this, arguments); setTimeout(function () { wrap(r); }, 0); return r; };
}
sweep();
if (typeof addEventListener === "function")
addEventListener("load", sweep);
setTimeout(sweep, 4000);
})();
var CBT_RL = { cool: 0, btn: null, line: null, lastTxt: "" };
var CBT_RL_EL = { fire: "fire", water: "frost", earth: "nature", air: "storm", storm: "storm", life: "light" };
function cbtRelicKey() { return __ZC(494, 79, this, arguments, new.target); }
function cbtRelicName(k) { var R = (typeof RL_BY !== "undefined" && RL_BY[k]) || null; return R ? String(R.name).split(",")[0] : "Your relic"; }
function cbtRelicWorn() {
try {
if (typeof RL === "undefined" || !RL.worn)
return [];
return Object.keys(RL.worn).filter(function (k) { return RL.worn[k] && typeof RL_BY !== "undefined" && RL_BY[k] && RL_BY[k].kind !== "weapon"; });
}
catch (e) {
return [];
}
}
function cbtRelicPlate() { var w = cbtRelicWorn(); return w.indexOf("frostplate") >= 0 || w.some(function (k) { return /plate/.test(k); }); }
function cbtRelicElem(k) {
try {
if (typeof EL_R !== "undefined" && EL_R[k])
return CBT_RL_EL[EL_R[k].el] || "light";
}
catch (e) { }
return /aurora/.test(k) ? "light" : "frost";
}
function cbtRelicPower() { return __ZC(494, 80, this, arguments, new.target); }
(function () {
if (typeof cbtToughBase === "function") {
var tb = cbtToughBase;
cbtToughBase = function () { var t = tb.apply(this, arguments); var n = cbtRelicWorn().length; return n ? t + Math.min(0.16, 0.04 * n) : t; };
}
if (typeof cbtOutMult === "function") {
var om = cbtOutMult;
cbtOutMult = function (W) { var m = om.apply(this, arguments); try {
W = W || cbtWeapon();
if (/^(bw_rl|relic_)/.test(String(W.key || "")) && cbtRelicWorn().indexOf("frostplate") >= 0)
m *= 2;
}
catch (e) { } return m; };
}
})();
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyR" || e.repeat || e.ctrlKey || e.metaKey || !CBT.on || cbtTyping(e) || CBT.bookOpen)
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
if (!cbtRelicKey())
return;
e.preventDefault();
e.stopImmediatePropagation();
cbtRelicPower();
}, true);
function cbtRelicTick(dt) { return __ZC(494, 81, this, arguments, new.target); }
(function () { if (typeof cbtHudTick !== "function")
return; var ht = cbtHudTick; cbtHudTick = function (dt, f) { var r = ht.apply(this, arguments); try {
cbtRelicTick(dt || 0);
}
catch (e) { } return r; }; })();
