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
function cbtP() {
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
}
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
function cbtLevelUp(L) { return __ZC(499, 0, this, arguments, new.target); }
function cbtSigned() { try {
return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function";
}
catch (e) {
return false;
} }
function cbtMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function cbtLoad() {
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
}
function cbtSaveSoon(s) { CBT.saveT = Math.min(CBT.saveT || 30, s || 30); }
function cbtSave() { return __ZC(499, 1, this, arguments, new.target); }
var CBT_ARMS_DMG = { sword: 16, axe: 18, club: 17, spear: 16, dagger: 12, shield: 10, staff: 15, orb: 14, bow: 15, noose: 12, horn: 8, torch: 9 };
function cbtHeldKey() { try {
return typeof bwHeldKey === "function" ? bwHeldKey() : null;
}
catch (e) {
return null;
} }
function cbtWeapon() {
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
}
function cbtClassOf(W) {
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
}
function cbtElemOf(W) {
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
}
function cbtReqOf(W) {
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
}
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
function cbtZoneNow() {
if (typeof WLD === "undefined" || !WLD || !WLD.on)
return null;
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return null;
var on = WLD.on;
if (on === "battle")
return null;
if ((on === "drakkyn" || on === "winters-heart") && !(typeof cbtBookFree === "function" && cbtBookFree(on)))
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
var id = cbtWhereId();
if (id === "kidszone")
return null;
var lv = cbtLevelHere(id);
if (cbtIndoors())
return cbtFoes(35, true).length ? { k: "story", n: id, lv: 0 } : null;
if (lv >= 1)
return { k: lv >= 3 ? "wild" : "pvp", n: id, lv: lv };
if (/^(city|hall|dream|mall)$/.test(id))
return null;
if (cbtFoes(35, true).length)
return { k: "story", n: id, lv: 0 };
return null;
}
function cbtFoes(range, storyOnly) { return __ZC(499, 2, this, arguments, new.target); }
var CBT_SEEN = typeof WeakMap !== "undefined" ? new WeakMap() : null, CBT_SEEN_S = {};
function cbtSeen(f) { return __ZC(499, 3, this, arguments, new.target); }
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
function cbtPick(range) { return __ZC(499, 4, this, arguments, new.target); }
var CBT_FX = { pts: null, n: 0, live: [], free: [], pos: null, col: null, alp: null, siz: null, vel: null, age: null, life: null, grav: null, drag: null, s0: null,
ax: 0, ay: 0, az: 0, arcs: [], rings: [], mark: null, dirty: false };
function cbtFxCap() { return cbtVR() ? 260 : cbtLite() ? 220 : 700; }
function cbtFxInit() {
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
}
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
function cbtSpark(x, y, z, col, vx, vy, vz, life, size, grav, drag) { return __ZC(499, 5, this, arguments, new.target); }
function cbtLess(n) { return Math.max(1, Math.round(n * (cbtVR() ? 0.35 : cbtLite() ? 0.4 : 1))); }
function cbtBurst(x, y, z, col, n, spd, life, size, o) { return __ZC(499, 6, this, arguments, new.target); }
function cbtRise(x, y, z, col, n, r, h, life, size) { return __ZC(499, 7, this, arguments, new.target); }
function cbtTrail(x, y, z, col, size, life) { if (!CBT_FX.pts)
return; cbtSpark(x, y, z, col, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, life || 0.35, size || 0.25, 0, 1); }
function cbtFxTick(dt) {
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
}
var CBT_POOL = { arc: [], ring: [] };
function cbtPooled(kind) { return __ZC(499, 8, this, arguments, new.target); }
function cbtSlash(col, dir, big, y) { return __ZC(499, 9, this, arguments, new.target); }
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
function cbtMarkTick(dt, f) {
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
}
function cbtFeetOf(f) { return (f.y !== undefined ? f.y : camera.position.y - 1.72) - (f.kind === "pvp" ? 1.1 : 0); }
function cbtChestOf(f) { return cbtFeetOf(f) + ((f.r || 0.7) > 1.1 ? 1.8 : 1.15); }
var CBT_V3 = null;
function cbtFloatText(text, at, col, scale, big) { return __ZC(499, 10, this, arguments, new.target); }
function cbtFloatTick(dt) {
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
}
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
function cbtHarm(d) { return __ZC(499, 11, this, arguments, new.target); }
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
function cbtDeal(f, roll, o) { return __ZC(499, 12, this, arguments, new.target); }
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
function cbtFree(x, z) { return __ZC(499, 13, this, arguments, new.target); }
function cbtGo(kind, dx, dz, dist, dur, then, face) {
var n = Math.hypot(dx, dz) || 1;
CBT.move = { kind: kind, dx: dx / n, dz: dz / n, dist: Math.max(0, dist), done: 0, t: 0, dur: dur, then: then, face: face };
}
function cbtMoveTick(dt) {
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
}
function cbtDodge(f, s) { return __ZC(499, 14, this, arguments, new.target); }
function cbtStrike() { return __ZC(499, 15, this, arguments, new.target); }
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
function cbtBlow(f, W, mult, big) { return __ZC(499, 16, this, arguments, new.target); }
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
function cbtProjTick(dt) {
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
}
function cbtAbilState(i) { return __ZC(499, 17, this, arguments, new.target); }
function cbtAbility(i) { return __ZC(499, 18, this, arguments, new.target); }
function cbtRun(A, W, f) { return __ZC(499, 19, this, arguments, new.target); }
function cbtDotTick(dt) {
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
}
function cbtKilled(o) { return __ZC(499, 20, this, arguments, new.target); }
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
function cbtHudMake() {
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
}
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
function cbtHudTick(dt, f) {
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
}
function cbtBook(open) { return __ZC(499, 21, this, arguments, new.target); }
function cbtBookPaint() { return __ZC(499, 22, this, arguments, new.target); }
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
function cbtLockNext() { return __ZC(499, 23, this, arguments, new.target); }
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
function cbtTick(dt) {
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
}
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
light: { n: "Light", i: "✨", elem: "light" }, shadow: { n: "Shadow", i: "🌑", elem: "shadow" }, nature: { n: "Nature", i: "🌿", elem: "nature" }, world: { n: "Of the worlds", i: "🌍", elem: "star" },
story: { n: "Marks of your travels (earned by finishing stories)", i: "🏅", elem: "light" } };
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
function cbtMagicChosen() { return __ZC(499, 24, this, arguments, new.target); }
function cbtMagicPut(id, slot) { return __ZC(499, 25, this, arguments, new.target); }
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
function cbtLearnSpell(id, how) { return __ZC(499, 26, this, arguments, new.target); }
var CBT_TOME = { on: [], findT: 0, next: 420, dropped: 0 };
function cbtTomeChoices(foeLv, here) { return __ZC(499, 27, this, arguments, new.target); }
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
function cbtTomeMesh(col) { return __ZC(499, 28, this, arguments, new.target); }
function cbtTomeDrop(S, x, y, z, how) { return __ZC(499, 29, this, arguments, new.target); }
function cbtTomeGone(T) { try {
if (T.m.parent)
T.m.parent.remove(T.m);
T.m.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material)
o.material.dispose(); });
}
catch (e) { } }
function cbtTomeTick(dt) {
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
if (CBT.on && !(CBT.eng > 0) && CBT.zone && CBT.zone.k !== "story") {
CBT_TOME.findT += dt;
if (CBT_TOME.findT >= CBT_TOME.next) {
CBT_TOME.findT = 0;
CBT_TOME.next = 360 + Math.random() * 360;
cbtTomeFind();
}
}
}
function cbtTomeFind() { return __ZC(499, 30, this, arguments, new.target); }
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
function cbtSpellRoll(m) { return __ZC(499, 31, this, arguments, new.target); }
function cbtSpellState(i) { return __ZC(499, 32, this, arguments, new.target); }
function cbtSpell(i) { return __ZC(499, 33, this, arguments, new.target); }
function cbtPadMagic(on) { return __ZC(499, 34, this, arguments, new.target); }
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
function cbtMagicHudMake() { return __ZC(499, 35, this, arguments, new.target); }
function cbtMagicHud() {
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
}
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
function cbtMagicBookHtml() { return __ZC(499, 36, this, arguments, new.target); }
var CBT_TPL = {
bolt: { t: "shot", m: 1.5, spd: 40 }, burn: { t: "shot", m: 1.2, spd: 38, dot: { dps: 0.22, t: 4 } }, lance: { t: "shot", m: 2.3, spd: 75 }, hex: { t: "shot", m: 1.2, spd: 34, bleed: 3 },
freeze: { t: "shot", m: 1.3, spd: 46, slow: 2.5 }, stun: { t: "shot", m: 1.1, spd: 60, stun: 1.2 },
volley: { t: "volley", m: 1, rng: 20, n2: 3 }, chain: { t: "volley", m: 1.1, rng: 22, n2: 4, stun: 0.6 },
storm: { t: "zone", m: 0.5, rad: 5, ticks: 5, gap: 0.35 }, blast: { t: "zone", m: 2, rad: 3.5, ticks: 1, push: 2 }, snare: { t: "zone", m: 0.4, rad: 4, ticks: 1, stun: 2.5 },
nova: { t: "around", m: 1.2, rad: 6, push: 3 }, daze: { t: "around", m: 0.8, rad: 7, stun: 1.5 }, chill: { t: "around", m: 0.8, rad: 6, slow: 3 },
wave: { t: "arc", m: 1.2, rng: 10, ang: 0.8, push: 5 }, drain: { t: "beam", m: 0.55, ticks: 6, gap: 0.25, drain: 0.5 }, ray: { t: "beam", m: 0.6, ticks: 6, gap: 0.22 },
dash: { t: "dash", m: 1.5, dist: 10 }, step: { t: "blink", m: 2.2 },
ward: { t: "buff", buff: "absorb", dur: 10, v: 60 }, mend: { t: "buff", buff: "regen", dur: 8, v: 3, mend: 25 }, vanish: { t: "buff", buff: "smoke", dur: 5 }, might: { t: "buff", buff: "might", dur: 10, v: 0.3 }
};
var CBT_CD = { bolt: 3, burn: 4, lance: 8, hex: 4, freeze: 4, stun: 6, volley: 7, chain: 9, storm: 20, blast: 12, snare: 16, nova: 12, daze: 16, chill: 14, wave: 12, drain: 14, ray: 10, dash: 9, step: 12, ward: 26, mend: 22, vanish: 30, might: 28 };
function cbtGrMake(id, o) {
var T = CBT_TPL[o.tpl] || CBT_TPL.bolt, S = Object.assign({}, T, { id: id, sch: "world", n: o.n, i: o.i || "✨", elem: o.e || "star", lv: o.lv || 8, d: o.d });
S.cd = o.cd || CBT_CD[o.tpl] || 8;
S.mana = o.mana || Math.round(10 + S.lv * 1.2 + (S.t === "zone" || S.t === "around" ? 10 : 0));
if (o.w) {
S.w = o.w;
S.wn = o.wn;
}
if (o.from) {
S.grant = 1;
S.from = o.from;
S.sch = "story";
}
return S;
}
function cbtGrAdd(S) { if (CBT_MAGIC_BY[S.id])
return; CBT_MAGIC.push(S); CBT_MAGIC_BY[S.id] = S; }
var CBT_BOOK_SPELLS = [
["oz1", "The Silver Shoes", "👠", "light", "dash", 8, "Click the heels three times: the shoes carry you to the foe in a blink and you strike."],
["oz2", "Powder of Life", "✨", "nature", "mend", 9, "A pinch of Mombi's powder: what is hurt in you quickens and mends."],
["oz3", "The Nome King's Belt", "👑", "storm", "daze", 14, "The magic belt flashes: every foe near you is held in wonder for a moment."],
["oz4", "The Wizard's Nine Tiny Piglets", "🐷", "star", "volley", 10, "Nine tiny piglets tumble out of nowhere and confound three foes."],
["oz5", "The Love Magnet", "🧲", "light", "vanish", 12, "Hold up the Love Magnet: every foe near you forgets why it wanted to fight."],
["oz6", "The Magic Picture", "🖼️", "light", "stun", 11, "The Magic Picture shows the foe's own danger, and it freezes in fright."],
["oz7", "The Liquid of Petrifaction", "🗿", "nature", "snare", 15, "A splash of the Crooked Magician's liquid: everything in it turns stiff as marble for a while."],
["oz8", "Tik-Tok's Thinking Gear", "⚙️", "steel", "might", 12, "Tik-Tok's clockwork thinking, wound tight: your blows land true and hard."],
["oz9", "The Scarecrow's Straw Storm", "🌾", "nature", "storm", 12, "The Scarecrow's own straw whirls round the foe and stings everything there."],
["oz10", "Rinkitink's Pearls", "🫧", "light", "ward", 16, "The white pearl's voice, the pink pearl's guard, the blue pearl's strength: nothing gets through for a while."],
["oz11", "Ugu's Magic Dishpan", "🍳", "star", "step", 17, "Ugu the Shoemaker's dishpan carries you behind the foe, and you strike."],
["oz12", "The Tin Woodman's Axe Swing", "🪓", "steel", "wave", 13, "A great sweep of the tin axe clears everything in front of you."],
["oz13", "Pyrzqxgl", "🔀", "star", "snare", 18, "Say the magic word right: the foe and all near it are turned rooted and still."],
["oz14", "Glinda's Great Book of Records", "📖", "light", "daze", 20, "Glinda's book has already written the foe's next move: you strike first, and they falter."],
["neverland", "Happy Thought", "🧚", "light", "dash", 7, "Think a lovely wonderful thought, and fly at the foe."],
["kassel", "The Seven-League Boots", "🥾", "nature", "dash", 12, "Seven leagues in one stride: you are on the foe before it sees you come."],
["erebos", "Fire of Tartarus", "🔥", "fire", "storm", 22, "The fires under the Underworld rise and do not let go."],
["playerslife", "Exit, Pursued by a Bear", "🐻", "nature", "dash", 12, "A bear crashes through with you, straight at the foe."],
["voyages", "Nautilus Current", "⚡", "storm", "ray", 14, "Captain Nemo's electric current, held on the foe."],
["leagues", "The Electric Gun", "🔫", "storm", "lance", 16, "A glass ball of electricity from the Nautilus's gun, one great blow."],
["eighty", "Fogg's Punctuality", "⏱️", "star", "might", 10, "Exactly to the second: for a while every blow arrives just on time."],
["centre", "The Fire Within the Earth", "🌋", "fire", "nova", 18, "The heat of the earth's centre bursts up round you."],
["island", "Nitroglycerine", "💥", "fire", "blast", 18, "Cyrus Harding's own nitroglycerine, thrown: a terrible blast round the foe."],
["balloon", "Ballast Drop", "🎈", "star", "blast", 10, "Up goes the Victoria, down comes the ballast, right on the foe."],
["robur", "The Albatross Dives", "✈️", "storm", "dash", 18, "Robur's flying ship stoops, and you go with it at the foe."],
["whitechapel", "The Fog of Whitechapel", "🌫️", "shadow", "vanish", 14, "The yellow fog comes down. They lose you in it."],
["jekyll", "Hyde's Draught", "⚗️", "blood", "might", 16, "Drink, and the other self rises: savage strength for a while."],
["hound", "Phosphorus Glow", "🐕", "light", "daze", 14, "The hound's ghastly glow, bursting out round you: every foe recoils."],
["scarlet", "The Science of Deduction", "🔎", "star", "stun", 8, "You see exactly where the foe will step, and strike there first."],
["signfour", "Tonga's Dart", "🎯", "nature", "hex", 12, "A little poisoned thorn from the blowpipe, and it works."],
["kensington", "Lock-Out Time", "🍃", "nature", "snare", 9, "The fairies' hour: the gardens close round the foe and hold it."],
["westminster", "Big Ben's Toll", "🕰️", "storm", "daze", 13, "The great bell sounds through you: every foe near is shaken."],
["carbuncle", "The Blue Carbuncle's Fire", "💙", "frost", "lance", 12, "The stone's blue light, thrown like a spear."],
["savillerow", "Bespoke Armour", "🎩", "steel", "ward", 10, "Cut to measure: a suit that turns blows."],
["poe", "The Raven's Nevermore", "🐦‍⬛", "shadow", "daze", 14, "Nevermore! Every foe near you hears it, and falters."],
["notredame", "The Bells of Notre-Dame", "🔔", "storm", "nova", 15, "Quasimodo's great bell, Marie, swings: the sound throws foes back."],
["tormance", "Muspel-Light", "🌟", "light", "ray", 20, "The strange light of Muspel, held on the foe."],
["gulliver", "Laputan Lodestone", "🧲", "star", "blast", 15, "The flying island drops on the foe from a great height."],
["timemachine", "Time Slip", "⏳", "star", "step", 16, "The Time Machine lurches: you are behind the foe a moment before you left."],
["lostworld", "Pterodactyl Swoop", "🦕", "nature", "dash", 14, "A great winged shape drops out of the sky with you."],
["treasureisland", "Pieces of Eight", "🦜", "steel", "volley", 9, "Captain Flint screams it, and three foes are pelted with silver."],
["odyssey", "The Bag of the Winds", "🌬️", "storm", "wave", 16, "Untie Aeolus's bag: the winds tear out in front of you and sweep foes away."],
["iliad", "Achilles' Wrath", "🛡️", "fire", "might", 22, "Sing, goddess, the wrath: every blow you strike is terrible for a while."],
["theseus", "Ariadne's Thread", "🧶", "light", "step", 12, "Follow the thread through the dark to the foe's back, and strike."],
["heracles", "The Nemean Hide", "🦁", "nature", "ward", 18, "The lion's hide that no weapon could pierce, over your shoulders."],
["dracula", "Holy Wafer", "✝️", "light", "ward", 14, "Van Helsing's wafer, crumbled round you: no evil passes."],
["alice", "Drink Me", "🍾", "star", "vanish", 8, "You shrink to ten inches high, and the foes lose you entirely."],
["lookingglass", "The Red Queen's Run", "♟️", "star", "dash", 10, "Running as fast as you can to stay in the same place, and then twice as fast: you are on the foe."],
["tirnanog", "Manannán's Wave-Horse", "🌊", "frost", "wave", 14, "The white horse of the sea breaks in front of you like a wave."],
["perseus", "Medusa's Gaze", "🐍", "nature", "snare", 20, "Uncover the head: everything that looks is turned to stone for a while."],
["jason", "The Dragon's Teeth", "🐲", "steel", "volley", 16, "Sow the teeth: armed men spring up and strike three foes."],
["mermaid", "The Sea-Witch's Voice", "🧜", "frost", "drain", 12, "The voice the sea-witch took, turned on the foe: it gives you its strength."],
["cthulhu", "Dreams of R'lyeh", "🐙", "shadow", "daze", 24, "The sunken city's dream spills out of you; every foe near goes mad for a moment."],
["invisible", "Griffin's Vanishing", "🕶️", "shadow", "vanish", 14, "You are simply not there."],
["sleepyhollow", "The Headless Horseman's Pumpkin", "🎃", "fire", "burn", 10, "The flaming head, hurled."],
["thor", "Mjölnir", "🔨", "storm", "chain", 20, "The hammer's lightning leaps to four foes."],
["odin", "Mimir's Wisdom", "👁️", "light", "might", 18, "An eye's worth of wisdom: you see every opening."],
["frankenstein", "Galvanic Spark", "⚡", "storm", "stun", 12, "The spark of being, at full strength, on the foe."],
["wukong", "The Ruyi Jingu Bang", "🐒", "steel", "wave", 18, "The Monkey King's staff grows huge and sweeps everything in front of you."],
["martians", "The Heat-Ray", "🛸", "fire", "ray", 24, "The Martians' invisible heat, held on the foe."],
["arabian", "The Genie of the Lamp", "🪔", "star", "blast", 18, "Rub the lamp, and the genie strikes at the foe."],
["gilgamesh", "Strength of Enkidu", "🦁", "nature", "might", 16, "The wild man's strength, by your side."],
["columbiad", "The Columbiad", "🚀", "fire", "lance", 18, "A shot from the great Florida gun."],
["roundmoon", "The Lunar Night", "🌖", "frost", "chill", 16, "The cold of the moon's long night falls round you."],
["egypt", "The Feather of Ma'at", "⚖️", "light", "drain", 18, "The foe's heart weighed against the feather, and found heavy: its life is yours."],
["yokai", "Fox-Fire", "🏮", "fire", "volley", 12, "Kitsune-bi: little foxfires drift at three foes and burn."],
["robinhood", "Robin's Arrow", "🏹", "nature", "lance", 10, "An arrow split down the middle of another: one great shot."],
["arthur", "Excalibur's Light", "🗡️", "light", "wave", 20, "The sword drawn: its light cuts a wide sweep before you."],
["quixote", "Charge the Giants", "🛡️", "steel", "dash", 8, "Tilt at them as if they were giants, and so they are."],
["mothergoose", "The Cow Jumped Over the Moon", "🪿", "star", "dash", 6, "Hey diddle diddle: you leap straight at the foe."],
["pinocchio", "The Blue Fairy's Grace", "🤥", "light", "mend", 8, "The Blue Fairy's kindness mends you."],
["threepigs", "The Big Bad Breath", "🐷", "storm", "wave", 8, "Huff and puff, and blow the foes down."],
["lilliput", "A Hundred Tiny Arrows", "🏰", "steel", "storm", 10, "The Lilliputian army looses on the foe and everything near."],
["beowulf", "Grendel's Grip", "🐉", "blood", "drain", 20, "The grip that tore the monster's arm: you take its strength."],
["phantom", "The Punjab Lasso", "🎭", "shadow", "snare", 16, "The Phantom's cord drops out of the dark and holds the foe fast."],
["cavor", "Cavorite", "🌑", "star", "daze", 16, "A shutter of Cavorite opens: the foes lose the ground under them."],
["lowell", "The Canals' Water", "🔭", "frost", "wave", 12, "Water from the Martian canals, sweeping out before you."],
["tarzan", "The Call of the Ape", "🌴", "nature", "daze", 14, "Tarzan's victory cry: every foe near you falters."]
];
var CBT_BOOK_MORE = [
["oz1", "Brave as the Lion", "🦁", "steel", "might", 8, "The courage the Wizard poured for him: you fight without fear for a while.", "a"],
["oz1", "The Wicked Witch's Bucket", "🪣", "frost", "blast", 12, "A bucket of water, thrown: some foes melt clean away.", "s"],
["oz2", "Jack Pumpkinhead's Stride", "🎃", "nature", "dash", 8, "Long wooden legs carry you to the foe.", "a"],
["oz2", "The Wishing Pills", "💊", "light", "mend", 12, "Count seventeen by odd numbers, swallow, and wish yourself whole.", "s"],
["oz3", "Billina's Peck", "🐔", "steel", "bolt", 7, "Billina's sharp beak, right where it hurts.", "a"],
["oz3", "The Nome King's Transformations", "🪨", "shadow", "snare", 16, "The foe becomes an ornament for a while.", "s"],
["oz4", "Jim the Cab-Horse's Kick", "🐴", "steel", "nova", 9, "A cab-horse's kick throws them back.", "a"],
["oz4", "The Wizard's Lantern", "🏮", "light", "ray", 11, "The humbug's lantern, held on the foe: it burns.", "s"],
["oz5", "The Fox King's Trick", "🦊", "nature", "step", 10, "Foxville cunning: you are behind the foe.", "a"],
["oz5", "The Shaggy Man's Kindness", "💗", "light", "ward", 12, "No one can hurt someone they have come to love.", "s"],
["oz6", "The Growleywogs' Strength", "💪", "steel", "might", 14, "The strength of the giants who march on Oz.", "a"],
["oz6", "The Forbidden Fountain", "⛲", "frost", "daze", 16, "The water of oblivion, splashed round you: the foes forget the fight.", "s"],
["oz7", "Scraps' Somersault", "🧵", "star", "dash", 9, "The Patchwork Girl cartwheels you straight at the foe.", "a"],
["oz7", "The Glass Cat's Pink Brains", "🐈", "light", "stun", 11, "You can see them think, and stop them.", "s"],
["oz8", "Tik-Tok's Wound Fist", "⚙️", "steel", "lance", 12, "A fully wound clockwork punch.", "a"],
["oz8", "The Love Magnet's Pull", "🧲", "light", "vanish", 14, "Every foe near you would rather be your friend.", "s"],
["oz9", "Cap'n Bill's Wooden Leg", "🦵", "steel", "stun", 9, "One good thump with the peg leg.", "a"],
["oz9", "The Scarecrow's Clever Brain", "🧠", "star", "might", 12, "The Wizard's bran-new brains: you think every blow through.", "s"],
["oz10", "Bilbil's Kick", "🐐", "steel", "nova", 10, "The grumpy goat's kick throws them back.", "a"],
["oz10", "The Pink Pearl", "🩷", "light", "ward", 14, "The pink pearl guards you: nothing can harm you while it does.", "s"],
["oz11", "Woot the Wanderer's Climb", "🧗", "nature", "dash", 10, "Up and over, onto the foe.", "a"],
["oz11", "The Magic Dishpan's Flight", "🍳", "star", "step", 16, "Into the dishpan, and out again behind the foe.", "s"],
["oz12", "The Tin Soldier's March", "💂", "steel", "might", 12, "Captain Fyter's steady tin courage.", "a"],
["oz12", "Mrs Yoop's Transformation", "🦉", "shadow", "snare", 16, "The giantess's spell: the foe is something small and helpless for a while.", "s"],
["oz13", "Kiki Aru's Change", "🐦", "star", "dash", 12, "Say Pyrzqxgl and become a hawk, then yourself again on the foe.", "a"],
["oz13", "The Magic Flower", "🌺", "nature", "mend", 14, "Its blossoms change and change, and so does every wound.", "s"],
["oz14", "Ozma's Silver Wand", "🪄", "light", "nova", 18, "The fairy wand's light throws foes back.", "a"],
["oz14", "The Raising of the Glass Dome", "🏝️", "frost", "ward", 18, "The island's glass dome rises round you.", "s"],
["neverland", "Hook's Iron Claw", "🪝", "steel", "lance", 10, "One terrible stroke with the hook.", "a"],
["neverland", "Fairy Dust", "✨", "light", "vanish", 8, "A pinch of fairy dust, and the foes see only a little light.", "s"],
["kassel", "The Huntsman's Knife", "🔪", "steel", "step", 10, "The huntsman, behind the wolf, at last.", "a"],
["kassel", "The Seven Ravens' Wings", "🐦‍⬛", "shadow", "volley", 12, "Seven ravens dive on three foes.", "s"],
["erebos", "Heracles' Labour", "💪", "steel", "might", 20, "The strength that dragged Cerberus into the daylight.", "a"],
["erebos", "Persephone's Pomegranate", "🍎", "blood", "drain", 22, "Six seeds: what the foe has becomes yours.", "s"],
["playerslife", "Hamlet's Rapier", "🤺", "steel", "lance", 12, "An envenomed touch.", "a"],
["playerslife", "The Witches' Cauldron", "🧪", "shadow", "storm", 16, "Double, double, toil and trouble, on the foe and all round it.", "s"],
["voyages", "The Harpoon", "🔱", "steel", "lance", 12, "Ned Land's harpoon, thrown true.", "a"],
["voyages", "Verne's Wonder", "📕", "star", "might", 14, "Every machine that could be imagined, behind your blows.", "s"],
["leagues", "Ned Land's Throw", "🔱", "steel", "lance", 14, "The Canadian's harpoon, at its best.", "a"],
["leagues", "The Squid's Ink", "🦑", "shadow", "vanish", 14, "A black cloud, and the foes are lost in it.", "s"],
["eighty", "Passepartout's Leap", "🤸", "steel", "dash", 8, "The circus acrobat's leap, onto the foe.", "a"],
["eighty", "The Elephant Charge", "🐘", "nature", "wave", 12, "Kiouni's charge sweeps all before it.", "s"],
["centre", "Hans's Pickaxe", "⛏️", "steel", "stun", 12, "One steady blow of the guide's pick.", "a"],
["centre", "The Lidenbrock Sea's Geyser", "♨️", "frost", "nova", 16, "Boiling water bursts up round you.", "s"],
["island", "The Colonists' Rifles", "🔫", "steel", "volley", 14, "The settlers fire together on three foes.", "a"],
["island", "Captain Nemo's Secret Help", "⚡", "storm", "chain", 18, "Unseen help strikes four foes at once.", "s"],
["balloon", "Joe's Rope", "🪢", "steel", "stun", 8, "A lasso from the basket, and the foe is down.", "a"],
["balloon", "The Hydrogen Blowpipe", "🔥", "fire", "burn", 12, "Dr Fergusson's burner, turned on the foe.", "s"],
["robur", "The Weldon Institute's Mob", "👥", "steel", "nova", 12, "The members of the Institute pile in round you.", "a"],
["robur", "The Albatross's Propellers", "🌀", "storm", "storm", 18, "The flying ship's screws whip the air round the foe.", "s"],
["whitechapel", "The Constable's Truncheon", "🔦", "steel", "stun", 10, "A good knock with the lamp and the truncheon.", "a"],
["whitechapel", "The Lodger's Shadow", "🕵️", "shadow", "step", 16, "Out of the fog, behind the foe.", "s"],
["jekyll", "Hyde's Trampling", "👞", "blood", "dash", 14, "He trampled calmly over her: you are on the foe the same way.", "a"],
["jekyll", "The White Salt", "🧂", "shadow", "vanish", 16, "The other self takes your place, and the foes lose you.", "s"],
["hound", "Sherlock's Revolver", "🔫", "steel", "lance", 12, "Five barrels, emptied into the brute's flank.", "a"],
["hound", "The Grimpen Mire", "🌫️", "nature", "snare", 14, "The great mire takes the foe's legs.", "s"],
["scarlet", "Baritsu", "🥋", "steel", "stun", 10, "The Japanese system of wrestling.", "a"],
["scarlet", "RACHE", "🩸", "blood", "hex", 12, "Written on the wall, and on the foe.", "s"],
["signfour", "Toby's Nose", "🐕", "nature", "step", 10, "Toby follows the creosote straight to the foe.", "a"],
["signfour", "The Agra Treasure", "💰", "light", "ward", 14, "Jewels enough to turn any blow.", "s"],
["kensington", "Peter's Pipes", "🎶", "nature", "daze", 9, "Peter plays, and the foes stop to listen.", "a"],
["kensington", "Solomon Caw's Birds", "🐦", "nature", "volley", 10, "The birds of the island dive at three foes.", "s"],
["westminster", "The Ministerial Red Box", "🧳", "steel", "ward", 10, "A despatch box held up like a shield.", "a"],
["westminster", "The Thames Fog", "🌫️", "shadow", "vanish", 12, "The river fog comes up, and you are gone.", "s"],
["carbuncle", "Peterson's Goose", "🪿", "nature", "dash", 8, "A furious goose, flung at the foe.", "a"],
["carbuncle", "Holmes's Lens", "🔍", "light", "ray", 10, "Sunlight through the lens, held on the foe.", "s"],
["savillerow", "The Tailor's Shears", "✂️", "steel", "lance", 10, "One clean cut.", "a"],
["savillerow", "Gentleman's Composure", "🎩", "star", "might", 12, "Perfectly composed: every blow lands as it should.", "s"],
["poe", "The Pit's Pendulum", "🪓", "steel", "wave", 16, "The great blade swings across in front of you.", "a"],
["poe", "The Tell-Tale Heart", "❤️", "blood", "drain", 16, "Louder, louder: the foe's heartbeat is yours.", "s"],
["notredame", "Quasimodo's Strength", "🔔", "steel", "might", 16, "The bell-ringer's terrible strength.", "a"],
["notredame", "Molten Lead from the Towers", "🫗", "fire", "storm", 18, "Molten lead pours from the gutters on the foe and all round it.", "s"],
["tormance", "Krag's Blow", "👊", "steel", "stun", 18, "The blow that is pain itself.", "a"],
["tormance", "The Sorgs", "🔮", "star", "might", 16, "The new sense-organ opens: you see what the foe will do.", "s"],
["gulliver", "Brobdingnag Stride", "🦶", "steel", "nova", 14, "A giant's stamp throws them all back.", "a"],
["gulliver", "The Struldbrugs' Endurance", "♾️", "light", "mend", 16, "Those who never die: their long endurance mends you.", "s"],
["timemachine", "The Iron Bar", "🔩", "steel", "stun", 12, "The Time Traveller's lever, swung at the Morlocks.", "a"],
["timemachine", "Matches in the Dark", "🔥", "fire", "daze", 12, "Strike a match: the Morlocks fall back from the flame.", "s"],
["lostworld", "Lord John's Express Rifle", "🔫", "steel", "lance", 16, "A heavy-bore shot that stops a charging beast.", "a"],
["lostworld", "Professor Challenger's Fury", "🧔", "fire", "nova", 14, "The Professor's temper, exploding round you.", "s"],
["treasureisland", "Long John's Crutch", "🦯", "steel", "stun", 10, "The crutch flung like a missile.", "a"],
["treasureisland", "The Black Spot", "⚫", "shadow", "hex", 12, "Tipped, and the foe is doomed.", "s"],
["odyssey", "The Bow of Odysseus", "🏹", "steel", "lance", 18, "Only he could string it: one arrow through twelve axe-heads.", "a"],
["odyssey", "Moly", "🌿", "nature", "ward", 14, "Hermes's herb: Circe's magic cannot touch you.", "s"],
["iliad", "Ajax's Great Shield", "🛡️", "steel", "ward", 18, "The tower shield of seven ox-hides.", "a"],
["iliad", "Athena's Aegis", "⚡", "light", "daze", 20, "The goddess shakes the aegis, and the foes fall back in panic.", "s"],
["theseus", "Theseus's Club", "🏏", "steel", "stun", 12, "Periphetes's club, turned on its owner.", "a"],
["theseus", "Ariadne's Crown", "👑", "light", "ray", 14, "The crown of stars, shining on the foe.", "s"],
["heracles", "The Club of Olive Wood", "🏏", "steel", "nova", 16, "Heracles's club throws them back.", "a"],
["heracles", "The Hydra's Venom", "🐍", "nature", "hex", 18, "Arrows dipped in the Hydra's blood.", "s"],
["dracula", "Stake and Mallet", "🪵", "steel", "lance", 14, "One sure stroke through the heart.", "a"],
["dracula", "Garlic Blossom", "🧄", "light", "daze", 12, "The foes shrink back from the flowers.", "s"],
["alice", "Eat Me", "🍰", "star", "might", 8, "Nine feet tall: your blows land like a giant's.", "a"],
["alice", "Off With Their Heads", "♥️", "blood", "hex", 12, "The Queen's sentence, carried out.", "s"],
["lookingglass", "The Vorpal Blade", "⚔️", "steel", "lance", 14, "One, two! One, two! And through and through.", "a"],
["lookingglass", "The White Queen's Memory", "👑", "star", "step", 12, "Living backwards: you are already where the foe is going.", "s"],
["tirnanog", "Oisín's Spear", "🔱", "steel", "lance", 14, "The Fianna's spear, thrown.", "a"],
["tirnanog", "Niamh's Youth", "🌸", "light", "mend", 14, "In the Land of Youth no wound stays.", "s"],
["perseus", "Hermes's Winged Sandals", "🪽", "star", "dash", 14, "The sandals carry you to the foe.", "a"],
["perseus", "The Cap of Darkness", "🎩", "shadow", "vanish", 16, "Hades's cap: you cannot be seen.", "s"],
["jason", "Heracles's Oar", "🚣", "steel", "wave", 14, "An oar swept like a great club.", "a"],
["jason", "Medea's Ointment", "🧴", "light", "ward", 16, "Fire and bronze cannot hurt you today.", "s"],
["mermaid", "The Mermaid's Tail", "🧜", "frost", "dash", 10, "A sweep of the tail through the water to the foe.", "a"],
["mermaid", "Sea-Foam", "🫧", "frost", "vanish", 14, "You become foam on the sea, and they lose you.", "s"],
["cthulhu", "Johansen's Ram", "⛵", "steel", "dash", 18, "The Alert rams the thing at full steam.", "a"],
["cthulhu", "The Elder Sign", "✳️", "star", "ward", 22, "The sign that holds the Old Ones back.", "s"],
["invisible", "The Unseen Fist", "👊", "steel", "stun", 12, "A blow from nowhere.", "a"],
["invisible", "The Bandaged Fury", "🌀", "storm", "nova", 14, "Griffin's rage throws everything near you back.", "s"],
["sleepyhollow", "Brom Bones's Gallop", "🐎", "steel", "dash", 10, "Hell for leather, straight at the foe.", "a"],
["sleepyhollow", "The Hollow's Spell", "🌙", "shadow", "daze", 12, "The drowsy, dreamy influence: the foes forget themselves.", "s"],
["thor", "Megingjörð", "💪", "steel", "might", 18, "The belt of strength doubles yours.", "a"],
["thor", "Utgard-Loki's Illusion", "🌫️", "shadow", "vanish", 16, "Nothing here is as it seems, least of all where you are.", "s"],
["odin", "Gungnir", "🔱", "steel", "lance", 20, "The spear that never misses.", "a"],
["odin", "Huginn and Muninn", "🐦‍⬛", "shadow", "volley", 16, "Thought and Memory dive at three foes.", "s"],
["frankenstein", "The Creature's Strength", "💪", "steel", "might", 14, "Stronger than any man, and faster.", "a"],
["frankenstein", "The Arctic Cold", "❄️", "frost", "chill", 14, "The ice where it all ended spreads round you.", "s"],
["wukong", "Somersault Cloud", "☁️", "storm", "dash", 16, "One somersault, a hundred and eight thousand li, and you are on the foe.", "a"],
["wukong", "Seventy-Two Transformations", "🐒", "star", "vanish", 18, "Turn into a fly, a bird, a temple: they lose you.", "s"],
["martians", "The Black Smoke", "💨", "shadow", "storm", 20, "The Martians' poison smoke rolls over the foe and all near it.", "s"],
["martians", "The Thunder Child's Ram", "⚓", "steel", "dash", 18, "The ironclad drives at the tripod at full speed.", "a"],
["arabian", "Sindbad's Roc", "🦅", "nature", "dash", 14, "Tied to the roc's leg, you drop on the foe.", "a"],
["arabian", "Open Sesame", "🚪", "star", "step", 14, "The rock opens, and you step out behind the foe.", "s"],
["gilgamesh", "The Axe of Gilgamesh", "🪓", "steel", "wave", 16, "The great axe that felled the cedars.", "a"],
["gilgamesh", "The Plant of Youth", "🌿", "nature", "mend", 16, "The plant from the bottom of the sea: the old made young.", "s"],
["columbiad", "Barbicane's Calculation", "📐", "star", "might", 14, "Every blow worked out to the decimal.", "a"],
["columbiad", "Gun Club Salvo", "💥", "fire", "blast", 16, "The Gun Club's guns, all at once.", "s"],
["roundmoon", "Ardan's Daring", "🎩", "steel", "dash", 12, "Michel Ardan never hesitates.", "a"],
["roundmoon", "Zero Gravity", "🌑", "star", "daze", 14, "For a moment nothing weighs anything: the foes float helpless.", "s"],
["egypt", "Khopesh of Horus", "🗡️", "steel", "lance", 16, "The falcon god's sickle-sword.", "a"],
["egypt", "Words of Power", "📜", "light", "ward", 18, "The spells from the Book of Coming Forth by Day.", "s"],
["yokai", "Tengu's Fan", "🪭", "storm", "wave", 14, "The long-nosed goblin's fan blows the foes away.", "a"],
["yokai", "Ofuda Seal", "📜", "light", "snare", 14, "A paper charm slapped on the foe binds it.", "s"],
["robinhood", "Little John's Quarterstaff", "🪵", "steel", "nova", 10, "The staff that knocked Robin into the brook.", "a"],
["robinhood", "Sherwood's Green", "🌳", "nature", "vanish", 12, "Into the greenwood, and gone.", "s"],
["arthur", "Lancelot's Charge", "🐎", "steel", "dash", 18, "The best knight in the world, at full gallop.", "a"],
["arthur", "Merlin's Enchantment", "🧙", "star", "snare", 20, "Merlin's spell holds the foe fast.", "s"],
["quixote", "Sancho's Common Sense", "🫏", "nature", "ward", 8, "Sancho's good sense keeps you out of the worst of it.", "a"],
["quixote", "Mambrino's Helmet", "🪖", "light", "might", 10, "The golden helmet, which is a barber's basin: you are invincible, you believe.", "s"],
["mothergoose", "Jack Be Nimble", "🕯️", "star", "step", 6, "Jack be quick: over the candlestick and behind the foe.", "a"],
["mothergoose", "Humpty Dumpty's Fall", "🥚", "star", "blast", 8, "A great fall, on the foe.", "s"],
["pinocchio", "The Growing Nose", "🤥", "steel", "lance", 8, "One lie, and it shoots out at the foe.", "a"],
["pinocchio", "The Whale's Belly", "🐋", "frost", "vanish", 10, "Swallowed whole, out of the fight, and out again.", "s"],
["threepigs", "The Brick House", "🧱", "steel", "ward", 8, "He huffed and he puffed, and he could not blow it down.", "a"],
["threepigs", "Just Right", "🥣", "light", "mend", 6, "Not too hot, not too cold: just right, and you feel better.", "s"],
["lilliput", "Gulliver's Stamp", "🦶", "steel", "nova", 10, "A giant among them: one stamp throws them back.", "a"],
["lilliput", "The Fleet of Blefuscu", "⛵", "frost", "wave", 12, "You drag the whole enemy fleet through the foes.", "s"],
["beowulf", "Hrunting", "🗡️", "steel", "lance", 18, "Unferth's sword, that had never failed.", "a"],
["beowulf", "The Dragon's Fire", "🐉", "fire", "storm", 22, "The old dragon's flame pours over the foe.", "s"],
["phantom", "The Trapdoor", "🚪", "shadow", "step", 14, "Through a trapdoor and up behind the foe.", "a"],
["phantom", "The Chandelier Falls", "💡", "steel", "blast", 18, "The great chandelier comes down on the foe.", "s"],
["cavor", "The Selenite Goad", "🔱", "steel", "stun", 14, "A moon-calf goad, on the foe.", "a"],
["cavor", "The Moon's Low Pull", "🌑", "star", "dash", 14, "One bound, twenty feet, onto the foe.", "s"],
["lowell", "The Great Refractor", "🔭", "light", "lance", 12, "Lowell's telescope, focused: a burning point of light.", "a"],
["lowell", "Martian Dust", "🟥", "fire", "storm", 14, "Red dust from the canals, blown on the foe.", "s"],
["tarzan", "Tarzan's Knife", "🔪", "steel", "step", 14, "His father's hunting knife, from behind.", "a"],
["tarzan", "Tantor the Elephant", "🐘", "nature", "wave", 16, "Tantor tramples everything in front of you.", "s"]
];
var CBT_WORLD_MORE = [
["gr_jupiter", "Vellamar", "Storm of the Great Red Spot", "🌀", "storm", "storm", 14, "Jupiter's endless storm, wheeling on the foe."],
["gr_saturn", "Halcyra", "Ring-Shard Hail", "💍", "frost", "volley", 14, "Shards of Saturn's rings rain on three foes."],
["gr_uranus", "Celadine", "Methane Frost", "🧊", "frost", "chill", 14, "Uranus's blue cold, out from you."],
["gr_neptune", "Saphirel", "Diamond Rain", "💎", "star", "storm", 16, "Neptune's diamond rain, falling on the foe."],
["race", "Pyreline", "Nitro Burst", "🏎️", "fire", "dash", 12, "Pyreline's nitro, in your legs: you are on the foe before it blinks."],
["mmin", "a mythic machine", "Clockwork Spark", "⚙️", "storm", "chain", 10, "The machine's own sparks jump to four foes."],
["battle", "Ironfray", "Bastion's Barrage", "💣", "fire", "blast", 16, "Bastion Varr's guns, called down on the foe."],
["faerie", "Faerie", "Glamour", "🧚", "light", "vanish", 8, "A faerie glamour: the foes see only leaves."],
["future", "the City to Come", "Hard Light", "🔷", "star", "ward", 10, "A shell of hard light from Brightwater's towers."],
["mirror", "the Mirror World", "Reflection", "🪞", "light", "step", 12, "You step out of the foe's own reflection, behind it."],
["elsewhere", "Another World", "Otherwhere", "🌌", "star", "step", 12, "Elsewhere for a heartbeat, then behind the foe."],
["stars", "Among the Stars", "Constellation", "✨", "star", "chain", 14, "The stars draw lines between four foes, and strike along them."],
["maze", "the Labyrinth", "Minotaur's Rush", "🐂", "steel", "dash", 14, "The bull of the maze charges with you."],
["davinci", "Leonardo's Florence", "Leonardo's Engine", "🛠️", "steel", "blast", 14, "One of Leonardo's war machines, fired on the foe."],
["outbreak", "the Outbreak", "Quarantine", "☣️", "nature", "snare", 14, "Seal it in: the foe and all near it are held."],
["thefall", "The Fall", "Falling Star", "🌠", "fire", "blast", 22, "What fell burns where it lands."],
["storms", "Tornado Alley", "Twister", "🌪️", "storm", "storm", 12, "A twister drops on the foe."],
["aster", "Aster Still", "Order Kata", "⭐", "steel", "might", 12, "The Wardens' training floors in your arms: cleaner, harder blows."],
["sereth", "Sereth Vale", "Moth-Light", "🦋", "light", "mend", 10, "The moths of the Quiet settle on you and mend."],
["ysolde", "Ysolde", "High Tide", "🌊", "frost", "wave", 12, "The tide is law: it sweeps the foes away."],
["tullimar", "Tullimar", "Market Haggle", "💰", "star", "vanish", 10, "Talk fast enough and they forget they meant to fight."],
["maruondo", "Maru-Ondo", "Deep Current", "🫧", "frost", "drain", 14, "The ocean world's current pulls the strength from the foe to you."],
["dunmarrow", "Dunmarrow", "Salt Storm", "🧂", "nature", "storm", 14, "Salt whipped off the desert into the foe's eyes."],
["kharn", "Kharn's Anvil", "Triple Gravity", "⚓", "steel", "snare", 16, "Kharn's weight, three times over, on the foe: it cannot lift its feet."],
["isk", "Isk", "Avalanche", "🏔️", "frost", "blast", 16, "The mountain comes down on the foe."],
["skeldmar", "Skeldmar", "Hrovan War-Drum", "🥁", "storm", "daze", 16, "The fortresses' war-drum: every foe near is shaken."],
["orr", "Orr", "Machine Pulse", "🤖", "storm", "chain", 18, "The silent world's pulse arcs through four foes."],
["driftward", "the Driftward", "Grapple-Line", "🪝", "steel", "stun", 14, "A salvager's grapple: the foe is yanked off its feet."],
["nharos", "Nharos", "Ashen Keep's Ember", "🔥", "fire", "burn", 20, "An ember from the Keep that will not go out."]
];
var CBT_HOLLOW_GIFT = { push: ["nova", "storm", 8], leap: ["dash", "star", 8], sense: ["might", "light", 10], turn: ["ward", "light", 10], calm: ["vanish", "light", 12], pull: ["stun", "steel", 9], mend: ["mend", "light", 10] };
var CBT_HOLLOW_SURGE = { veyar: ["vanish", "shadow"], sereth: ["mend", "nature"], isk: ["chill", "frost"], aster: ["volley", "star"], ysolde: ["wave", "frost"], maruondo: ["ward", "nature"],
aurelion: ["daze", "light"], dunmarrow: ["storm", "nature"], driftward: ["daze", "steel"], kharn: ["nova", "steel"], orr: ["chain", "storm"], tullimar: ["dash", "star"], skeldmar: ["daze", "storm"], nharos: ["might", "blood"] };
var CBT_GR_BOOK_ELEM = { fire: "fire", gold: "light", flight: "fire", ice: "frost", storm: "storm", spirit: "light", smoke: "shadow", veve: "shadow", blade: "shadow",
stealth: "shadow", herb: "nature", heal: "light", charm: "star", arcane: "star", portal: "star", claw: "shadow", shadow: "shadow", blood: "blood", void: "shadow",
science: "storm", water: "frost", swim: "frost", wall: "frost", thread: "frost", ember: "fire", maul: "nature", roar: "storm", wind: "nature", flame: "fire",
veil: "nature", thorn: "nature", vine: "nature", sun: "light", heat: "fire" };
var CBT_GR_PLAIN = /^(Strike with your blade|Strike with your staff|The rune bow|Your wits|The storm staff)$/;
function cbtGrHeroTpl(p) {
if (p.heal)
return "mend";
if (p.guard)
return /stealth|shadow|smoke|swim|veil/.test(p.k) ? "vanish" : "ward";
if (/claw|blade|maul/.test(p.k))
return "dash";
if (/storm|void|veve/.test(p.k))
return "storm";
if (/portal|vine/.test(p.k))
return "snare";
if (/gold|flight|sun|wind|water/.test(p.k))
return "nova";
if (/spirit|thorn|ice/.test(p.k))
return "volley";
if (/fire|flame|ember|heat/.test(p.k))
return "burn";
if (p.k === "blood")
return "drain";
if (p.k === "roar")
return "stun";
return "bolt";
}
var CBT_GR_BOOKS = {
drakkyn: { n: "Heart of the Drakkyn", pre: "dk_", done: function () { try {
return !!(store.dkbook && store.dkbook.done);
}
catch (e) {
return false;
} }, H: function () { return typeof DKX_HEROES !== "undefined" ? DKX_HEROES : null; } },
"winters-heart": { n: "Winter's Heart", pre: "wq_", done: function () { try {
return !!(store.wqbook && store.wqbook.done);
}
catch (e) {
return false;
} }, H: function () { return typeof WQX_HEROES !== "undefined" ? WQX_HEROES : null; } }
};
function cbtBookFree(w) { var B = CBT_GR_BOOKS[w]; return !!(B && B.done()); }
function cbtHollowDone() { try {
return typeof hlStep === "function" && hlStep() >= 9;
}
catch (e) {
return false;
} }
function cbtBookDone(k) { try {
if (CBT_GR_BOOKS[k] && CBT_GR_BOOKS[k].done())
return true;
return !!(typeof bhnData === "function" && bhnData().fin && bhnData().fin[k]);
}
catch (e) {
return false;
} }
function cbtGrBuild() {
if (typeof CBT_MAGIC === "undefined")
return;
CBT_BOOK_SPELLS.forEach(function (r) {
var B = typeof BHN_BOOKS !== "undefined" && BHN_BOOKS[r[0]], t = B ? B.t : r[0];
cbtGrAdd(cbtGrMake("bk_" + r[0] + "_1", { n: r[1], i: r[2], e: r[3], tpl: r[4], lv: r[5], d: r[6] + " Yours for finishing " + t + ".", from: "book:" + r[0] }));
});
var nth = {};
CBT_BOOK_MORE.forEach(function (r) {
var B = typeof BHN_BOOKS !== "undefined" && BHN_BOOKS[r[0]], t = B ? B.t : r[0];
nth[r[0]] = (nth[r[0]] || 1) + 1;
var S = cbtGrMake("bk_" + r[0] + "_" + nth[r[0]], { n: r[1], i: r[2], e: r[3], tpl: r[4], lv: r[5], d: (r[7] === "a" ? "Ability. " : "") + r[6] + " Yours for finishing " + t + ".", from: "book:" + r[0] });
if (r[7] === "a") {
S.ab = 1;
S.mana = Math.round(S.mana * 0.6);
}
cbtGrAdd(S);
});
CBT_WORLD_MORE.forEach(function (r) {
cbtGrAdd(cbtGrMake("w2_" + r[0], { n: r[2], i: r[3], e: r[4], tpl: r[5], lv: r[6], d: r[7], w: r[0], wn: r[1] }));
});
Object.keys(CBT_GR_BOOKS).forEach(function (w) {
var B = CBT_GR_BOOKS[w], HS = B.H();
if (!HS)
return;
Object.keys(HS).forEach(function (hk) {
var H = HS[hk];
(H.pow || []).forEach(function (p, i) {
if (CBT_GR_PLAIN.test(p.n))
return;
var d = +p.d || 0, lv = Math.max(2, Math.min(40, Math.round((p.heal || d) * 1.7)));
cbtGrAdd(cbtGrMake(B.pre + hk + "_" + i, { n: p.n, i: H.icon, e: CBT_GR_BOOK_ELEM[p.k] || "star", tpl: cbtGrHeroTpl(p), lv: lv,
d: H.name + ": " + (p.say || p.n) + " Yours for finishing " + B.n + ".", from: "book:" + w }));
});
});
});
if (typeof WD_GIFTS !== "undefined")
Object.keys(CBT_HOLLOW_GIFT).forEach(function (g) {
var G = WD_GIFTS[g], r = CBT_HOLLOW_GIFT[g];
if (!G)
return;
cbtGrAdd(cbtGrMake("hl_g_" + g, { n: "Warden's " + G.name, i: G.icon, e: r[1], tpl: r[0], lv: r[2], d: G.about + " (The Warden's gift, from the Hollow.)", from: "gift:" + g }));
});
if (typeof WD_POW !== "undefined")
Object.keys(CBT_HOLLOW_SURGE).forEach(function (k) {
var P = WD_POW[k], r = CBT_HOLLOW_SURGE[k];
if (!P)
return;
cbtGrAdd(cbtGrMake("hl_s_" + k, { n: P.surge, i: "🗡️", e: r[1], tpl: r[0], lv: 14, d: P.about + " (The surge of the " + k[0].toUpperCase() + k.slice(1) + " heart-shard, from the Hollow.)", from: "shard:" + k }));
});
}
function cbtGrEarned(S) {
var f = S.from || "", i = f.indexOf(":"), kind = f.slice(0, i), k = f.slice(i + 1);
if (kind === "book")
return cbtBookDone(k);
if (kind === "gift" || kind === "shard") {
if (!cbtHollowDone())
return false;
try {
var W = wdGet();
return kind === "gift" ? !!(W.gifts && W.gifts[k]) : !!(W.shards && W.shards[k]);
}
catch (e) {
return false;
}
}
return false;
}
var CBT_GR = { built: false };
function cbtGrCheck() {
if (typeof cbtMagicKnown !== "function")
return;
if (!CBT_GR.built) {
cbtGrBuild();
CBT_GR.built = typeof DKX_HEROES !== "undefined" && typeof WQX_HEROES !== "undefined" && typeof WD_GIFTS !== "undefined" && typeof WD_POW !== "undefined" && typeof BHN_BOOKS !== "undefined";
}
var got = {}, n = 0;
CBT_MAGIC.forEach(function (S) {
if (!S.grant || cbtMagicKnows(S.id) || !cbtGrEarned(S))
return;
cbtMagicKnown().push(S.id);
n++;
var src = /^(gift|shard):/.test(S.from) ? "the Hollow" : (S.from === "book:drakkyn" ? "Heart of the Drakkyn" : S.from === "book:winters-heart" ? "Winter's Heart" :
((typeof BHN_BOOKS !== "undefined" && BHN_BOOKS[S.from.slice(5)] || {}).t || "a story"));
(got[src] = got[src] || []).push(S);
});
if (!n)
return;
var p = cbtP();
if (!Array.isArray(p.sl))
p.sl = [];
cbtDirty();
cbtSaveSoon(3);
if (typeof save === "function")
try {
save();
}
catch (e) { }
var lines = Object.keys(got).map(function (src) { var L = got[src]; return "<b>" + cbtEsc(src) + "</b>: " + L.slice(0, 4).map(function (S) { return S.i + " " + cbtEsc(S.n); }).join(", ") + (L.length > 4 ? " and " + (L.length - 4) + " more" : ""); });
cbtToast("🏅 <b>Marks of your travels.</b> New battle spells, yours for good: " + lines.join("; ") + ". Ready them in the ⚔️ Combat book.");
}
cbtGrBuild();
addEventListener("load", function () { setTimeout(function () { cbtGrBuild(); cbtGrCheck(); }, 3000); });
setInterval(function () { try {
cbtGrCheck();
}
catch (e) { } }, 5000);
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
function cbtAmFamOf(W) { return __ZC(499, 37, this, arguments, new.target); }
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
function cbtAmLoaded(fam) { return __ZC(499, 38, this, arguments, new.target); }
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
function cbtAmCycle() { return __ZC(499, 39, this, arguments, new.target); }
function cbtAmFire(W, n) { return __ZC(499, 40, this, arguments, new.target); }
function cbtAmMult(a, f) { return __ZC(499, 41, this, arguments, new.target); }
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
function cbtAmAfter(a, f, d) { return __ZC(499, 42, this, arguments, new.target); }
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
function cbtAmFamsYouUse() { return __ZC(499, 43, this, arguments, new.target); }
function cbtAmRollDrop(lv, boss, deep) { return __ZC(499, 44, this, arguments, new.target); }
function cbtAmGain(k, n, why, at) { return __ZC(499, 45, this, arguments, new.target); }
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
function cbtAmSync() {
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
}
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
function cbtAmFlush() { return __ZC(499, 46, this, arguments, new.target); }
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
function cbtAmHudPaint(force) {
if (!CBT.hud)
return;
var el = CBT_AM.el;
if (!el) {
var w = CBT.hud.querySelector(".wpn");
if (!w)
return;
var st = document.createElement("style");
st.textContent = "#cbt-hud .amo{pointer-events:auto;cursor:pointer;background:rgba(14,12,18,.8);border:1px solid rgba(232,194,122,.4);border-radius:11px;padding:0;font-weight:500;white-space:nowrap;display:none;overflow:hidden}" +
"#cbt-hud .amo.on{display:flex!important;align-items:stretch}#cbt-hud .amo>span.am-sw,#cbt-hud .amo>span.am-ls{position:static;display:block;padding:3px 9px}#cbt-hud .amo>span.am-ls{border-left:1px solid rgba(232,194,122,.35);background:rgba(232,194,122,.1)}" +
"#cbt-hud .amo b{font-weight:600}#cbt-hud .amo .am-t{opacity:.65;font-size:11px}#cbt-hud .amo.low{border-color:#E89A6A}" +
"body.cbt-coarse #cbt-hud .amo>span.am-sw,body.cbt-coarse #cbt-hud .amo>span.am-ls{padding:8px 12px;font-size:13px}";
document.head.appendChild(st);
el = CBT_AM.el = document.createElement("div");
el.className = "amo";
el.title = "Your ammunition: T (or a tap) loads the next kind you carry; 🎒 (or Shift+T) shows all you carry";
el.addEventListener("pointerdown", function (e) {
e.preventDefault();
e.stopPropagation();
var all = e.target.closest && e.target.closest(".am-ls"), fam = cbtAmFamOf(cbtWeapon());
if (all || !fam || !cbtAmOwned(fam).filter(cbtAmCanLoad).length)
cbtAmPouch();
else
cbtAmCycle();
});
w.parentNode.insertBefore(el, w.nextSibling);
}
var W = CBT.on ? cbtWeapon() : null, fam = CBT_AM.on && W ? cbtAmFamOf(W) : null;
if (!fam) {
if (el.style.display !== "none")
el.style.display = "none";
el.classList.remove("on");
return;
}
var touch = cbtTouch() || cbtVR(), k = cbtAmLoaded(fam), n = k ? cbtAmHave(k) : 0, a = k && cbtAmParse(k), more = cbtAmOwned(fam).filter(cbtAmCanLoad).length;
document.body.classList.toggle("cbt-coarse", !!touch);
var h = "<span class='am-sw'>" + CBT_AM_FAMS[fam].i + " " + (k ? "<b style='color:" + a.G.col + "'>" + cbtEsc(cbtAmName(k)) + "</b> ×" + (CBT_AM.use ? n : "∞") : "Plain " + cbtEsc(CBT_AM_FAMS[fam].n.toLowerCase())) +
(more ? (touch ? " <span class='am-t'>· tap to switch</span>" : " <span class='am-t'>· T to switch</span>") : " <span class='am-t'>· none carried</span>") + "</span>" +
"<span class='am-ls'>🎒" + (touch ? "" : " <span class='am-t'>Shift+T</span>") + "</span>";
if (force || el.innerHTML !== h) {
el.innerHTML = h;
}
el.classList.toggle("low", !!k && CBT_AM.use && n <= Math.max(3, Math.round(CBT_AM_FAMS[fam].pack / 4)));
if (el.style.display !== "block")
el.style.display = "block";
el.classList.add("on");
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyT" || e.repeat || !CBT.on || CBT.bookOpen || cbtTyping(e) || e.ctrlKey || e.metaKey || e.altKey)
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
if (e.shiftKey) {
e.preventDefault();
e.stopImmediatePropagation();
cbtAmPouch();
return;
}
if (!cbtAmFamOf(cbtWeapon()))
return;
e.preventDefault();
e.stopImmediatePropagation();
cbtAmCycle();
}, true);
function cbtAmPouch() {
if (typeof bkpOpen !== "function" || typeof BKP === "undefined") {
cbtBook(true);
cbtAmBookJump();
return;
}
BKP.tab = "ammo";
try {
localStorage.setItem("somnu.bkp.tab", "ammo");
}
catch (e) { }
if (BKP.open)
bkpPaint();
else
bkpOpen();
}
function cbtAmPackHtml() { return __ZC(499, 47, this, arguments, new.target); }
(function () {
if (typeof BKP_TABS !== "undefined" && !BKP_TABS.some(function (T) { return T[0] === "ammo"; }))
BKP_TABS.splice(1, 0, ["ammo", "🏹 Ammo"]);
if (typeof bkpTabOf === "function") {
var to = bkpTabOf;
bkpTabOf = function (t) { return /ammunition/i.test(String(t || "")) ? "ammo" : to.apply(this, arguments); };
}
if (typeof bkpHtml === "function") {
var bh = bkpHtml;
bkpHtml = function () { var h = bh.apply(this, arguments); try {
h += cbtAmPackHtml();
}
catch (e) {
cbtWarn("ammo backpack", e);
} return h; };
}
if (typeof document !== "undefined")
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bkam]") : null;
if (!t)
return;
e.stopPropagation();
var v = t.getAttribute("data-bkam"), i = v.indexOf(":"), fam = v.slice(0, i);
if (cbtAmLoad(fam, v.slice(i + 1))) {
CBT_AM.outSaid[fam] = 0;
cbtTone(500, 0.05);
cbtAmHudPaint(true);
}
var el = document.getElementById("bkp-box"), y = el ? el.scrollTop : 0;
if (typeof bkpPaint === "function")
bkpPaint();
if (el)
el.scrollTop = y;
}, true);
})();
function cbtAmBookHtml() { return __ZC(499, 48, this, arguments, new.target); }
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
function cbtAmBookJump() { try {
var s = document.getElementById("cbt-am-sec");
if (s && s.scrollIntoView)
s.scrollIntoView({ block: "start" });
}
catch (e) { } }
(function () {
var bp = cbtBookPaint;
cbtBookPaint = function () {
var r = bp.apply(this, arguments);
try {
var B = CBT.panel, h3 = B && B.querySelector(".in h3");
if (h3 && CBT_AM.on && !B.querySelector(".in [data-am-jump]")) {
var b = document.createElement("button");
b.setAttribute("data-am-jump", "1");
b.textContent = "🏹 Your ammunition";
b.style.cssText = "margin:0 0 6px";
b.onclick = function (e) { e.stopPropagation(); cbtAmBookJump(); };
h3.parentNode.insertBefore(b, h3.nextSibling);
}
}
catch (e) { }
return r;
};
})();
function cbtAmStationFams(st) { return CBT_AM_STATIONS[st] || []; }
function cbtAmPriceNow(k) { return Math.max(0, Math.round(cbtAmPrice(k) * (CBT_AM.price >= 0 ? CBT_AM.price : 1))); }
function cbtAmForgeHtml() { return __ZC(499, 49, this, arguments, new.target); }
function cbtAmForgeAct(act, k, packs) { return __ZC(499, 50, this, arguments, new.target); }
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
function dglShow(title, rows, note) { return __ZC(499, 51, this, arguments, new.target); }
function dglWeaponPick(lv, boss) { return __ZC(499, 52, this, arguments, new.target); }
function dglWeaponGive(k, from) { return __ZC(499, 53, this, arguments, new.target); }
function dglLocal(o) { return __ZC(499, 54, this, arguments, new.target); }
function dglServer(where, run, o) { return __ZC(499, 55, this, arguments, new.target); }
function dglTake(where, run, o, title) { return __ZC(499, 56, this, arguments, new.target); }
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
function dgnLeaveAsk(out) { return __ZC(499, 57, this, arguments, new.target); }
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
function dgnSceneBack(W, own) { return __ZC(499, 58, this, arguments, new.target); }
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
function cbtRelicKey() { return __ZC(499, 59, this, arguments, new.target); }
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
function cbtRelicPower() { return __ZC(499, 60, this, arguments, new.target); }
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
function cbtRelicTick(dt) {
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
(function () { if (typeof cbtHudTick !== "function")
return; var ht = cbtHudTick; cbtHudTick = function (dt, f) { var r = ht.apply(this, arguments); try {
cbtRelicTick(dt || 0);
}
catch (e) { } return r; }; })();
