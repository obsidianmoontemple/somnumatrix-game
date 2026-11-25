/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SB = { k: "corp", ship: null, model: null, view: "chase", hull: 100, shield: 100, t: 0, lastHit: -99, regenOn: true,
foes: [], allies: [], shots: [], bolts: [], fx: [], pods: [], target: null, battle: null, strikeAt: 150, cool: 0, cool2: 0, turret: 0,
hud: null, pad: null, vig: null, mark: null, arrow: null, cfg: { on: true, every: 6, bounty: 15 }, cfgAt: -999,
wins: 0, downs: 0, rollAng: 0, rollG: null, saved: null, tmpl: {}, lockAt: 0, missing: false, hunt: null };
var SB_SHIPS = {
corp: { name: "Space Corp cutter", short: "Corp cutter", icon: "🚀", own: "all", len: 11, hull: 110, shield: 90, spd: 1.0,
gun: "twin phasers", shot: "phaser", dmg: 9, cool: 0.28, n: 2, cpit: "mm:*",
about: "The Corp's own patrol cutter, lent to every traveller who takes off from the Spaceport: sleek, steady and kind to a new pilot. Its phasers stun; the Corp does not kill." },
shuttle: { name: "Your shuttle", short: "Shuttle", icon: "🛰️", own: "thing:shuttle", len: 14, hull: 160, shield: 110, spd: 0.95,
gun: "twin phasers", shot: "phaser", dmg: 10, cool: 0.26, n: 2, cpit: "mm:*",
about: "The shuttle you bought at the Transport Yard: a broad-shouldered hull, a roomy cabin and a heavy heat shield. Slower than a fighter, but it takes a beating." },
saucer: { name: "Your flying saucer", short: "Flying saucer", icon: "🛸", own: "thing:saucer", len: 13, hull: 120, shield: 160, spd: 1.15,
gun: "ring pulse", shot: "ring", dmg: 12, cool: 0.32, n: 1, cpit: "saucer",
about: "The saucer you bought at the Transport Yard. Its rim spins a field round the whole hull, so its shields are strong; it fires a ring of light from under the dome." },
shrike: { name: "The Twinvane Shrike", short: "Twinvane Shrike", icon: "✈️", own: "mm:shrike", len: 12, hull: 100, shield: 110, spd: 1.45,
gun: "twin cannons", shot: "plasma", dmg: 15, cool: 0.22, n: 2, cpit: "mm:shrike",
about: "The one-seat fighter found on the Moon: the quickest ship in the sky, with twin cannons under its chin." },
kestrel: { name: "The Corsair Kestrel", short: "Corsair Kestrel", icon: "🛸", own: "mm:kestrel", len: 20, hull: 240, shield: 150, spd: 1.1,
gun: "turret lasers", shot: "laser", dmg: 11, cool: 0.15, n: 2, turret: true, cpit: "mm:kestrel",
about: "The battered light freighter found on Pluto. Its dorsal turret swings to wherever you look, so it hits what it aims at even while it turns." },
domeship: { name: "Ashvaal, the Pearl Domeship", short: "Ashvaal", icon: "🫧", own: "mm:domeship", len: 20, hull: 200, shield: 220, spd: 1.0,
gun: "tail lances", shot: "ion", dmg: 30, cool: 0.7, n: 1, cpit: "mm:domeship",
about: "The Veyari domeship found on Veyar. Its shields are the strongest of any ship, and its turrets and lances strike hard and slow, and its battle pods drop from beneath on the second gun." },
nightwyrm: { name: "Nightwyrm, the Black Dragon", short: "Nightwyrm", icon: "🐉", own: "mm:nightwyrm", len: 17, hull: 210, shield: 130, spd: 1.2,
gun: "shadow flame", shot: "orb", dmg: 22, cool: 0.45, n: 1, cpit: "mm:nightwyrm",
about: "The black dragon engine found on Venus. It flies the dark as well as any ship, and its shadow flame burns through shields." },
emberwing: { name: "Emberwing, the Red Phoenix", short: "Emberwing", icon: "🔥", own: "mm:emberwing", len: 16, hull: 170, shield: 130, spd: 1.35,
gun: "sun-fire volley", shot: "fire", dmg: 8, cool: 0.3, n: 3, cpit: "mm:emberwing",
about: "The phoenix engine found on Mercury. Its shoulder cannons throw a spread of sun-fire, three bolts at a time." }
};
var SB_ORDER = ["corp", "shuttle", "saucer", "shrike", "kestrel", "domeship", "nightwyrm", "emberwing"];
var SB_SHOT = {
phaser: { col: 0xFF5A3A, glow: 0xFF8A6A, len: 7, r: 0.22, spd: 760 },
ring: { col: 0x8AF0FF, glow: 0x8AF0FF, len: 0, r: 1.1, ring: 1, spd: 620 },
plasma: { col: 0x9AFFC8, glow: 0x5AE8A0, len: 0, r: 0.7, spd: 700 },
laser: { col: 0xFF7A4A, glow: 0xFFB08A, len: 9, r: 0.14, spd: 900 },
ion: { col: 0xC8A0FF, glow: 0xA070FF, len: 0, r: 1.4, spd: 520 },
orb: { col: 0x8A5AD8, glow: 0x6A3AB8, len: 0, r: 1.2, spd: 560 },
fire: { col: 0xFFB040, glow: 0xFF7020, len: 0, r: 0.6, spd: 680 },
rail: { col: 0xE8F4FF, glow: 0x9AD8FF, len: 16, r: 0.12, spd: 1600 },
missile: { col: 0xFFE0A0, glow: 0xFF9A4A, len: 2.2, r: 0.3, spd: 380, seek: 1 },
arc: { col: 0xBFE0FF, glow: 0x8AC8FF, len: 12, r: 0.16, spd: 1100 },
frost: { col: 0xBFE8F8, glow: 0x9AD8F0, len: 0, r: 0.8, spd: 600 },
raider: { col: 0xFFA040, glow: 0xFF7A2A, len: 6, r: 0.24, spd: 430 },
corpally: { col: 0xFF5A3A, glow: 0xFF8A6A, len: 6, r: 0.2, spd: 700 }
};
var SB_SECOND = {
railgun: { name: "Rail gun", shot: "rail", dmg: 55, cool: 1.6, pierce: 1 },
ioncannon: { name: "Ion cannon", shot: "ion", dmg: 50, cool: 2.0, splash: 40 },
micromissiles: { name: "Micro-missile pod", shot: "missile", dmg: 16, cool: 1.8, n: 4 },
arccaster: { name: "Arc caster", shot: "arc", dmg: 20, cool: 0.6, chain: 2 },
plasma: { name: "Plasma rifle", shot: "plasma", dmg: 26, cool: 0.9 },
blaster: { name: "Blaster", shot: "phaser", dmg: 14, cool: 0.3 },
pulserifle: { name: "Pulse rifle", shot: "laser", dmg: 9, cool: 0.14 },
lasersniper: { name: "Laser marksman rifle", shot: "laser", dmg: 48, cool: 1.5 },
freezeray: { name: "Freeze ray", shot: "frost", dmg: 10, cool: 0.4, slow: 3 },
smartdisc: { name: "Returning smart-disc", shot: "ring", dmg: 22, cool: 0.9 }
};
var SB_FOE = {
dart: { name: "Raider dart", hp: 42, spd: 150, turn: 1.9, r: 6, range: 520, cool: 0.9, dmg: 6, len: 15, worth: 1 },
gunship: { name: "Raider gunship", hp: 130, spd: 105, turn: 1.1, r: 10, range: 600, cool: 0.55, dmg: 7, len: 26, worth: 3, pair: 1 },
marauder: { name: "Raider marauder", hp: 320, spd: 80, turn: 0.7, r: 16, range: 700, cool: 0.4, dmg: 8, len: 40, worth: 6, pair: 1 }
};
var SB_ALLY = { name: "Space Corp cutter", hp: 150, spd: 150, turn: 1.7, r: 6, range: 560, cool: 0.6, dmg: 9, len: 13 };
var SB_ALLY_NAMES = ["Cutter Halden", "Cutter Mirela", "Cutter Osei", "Cutter Brannagh", "Cutter Ylva", "Cutter Tomasz"];
function sbLite() { return typeof LITE !== "undefined" && !!LITE; }
function sbVR() { try {
return !!(typeof VRM !== "undefined" && VRM.xr);
}
catch (e) {
return false;
} }
function sbTouch() { try {
return typeof mmTouch === "function" ? mmTouch() : !!(document.body && document.body.classList.contains("touch"));
}
catch (e) {
return false;
} }
function sbSay(h) { if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function sbTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function sbEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function sbSigned() { return typeof signedIn === "function" && signedIn(); }
function sbKeeper() { try {
return typeof amKeeper === "function" && amKeeper();
}
catch (e) {
return false;
} }
function sbRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function sbMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function sbHere() { return typeof WLD !== "undefined" && WLD && WLD.on === "space" && typeof SP !== "undefined" && SP && SP.pos; }
function sbG() { return WORLDS.space && WORLDS.space.g; }
function sbFwd(y, p, out) { return (out || new THREE.Vector3()).set(-Math.sin(y) * Math.cos(p), Math.sin(p), -Math.cos(y) * Math.cos(p)); }
function sbSave() { try {
localStorage.setItem("sb.ship", SB.k);
localStorage.setItem("sb.view", SB.view);
}
catch (e) { } }
(function () { try {
var k = localStorage.getItem("sb.ship");
if (k && SB_SHIPS[k])
SB.k = k;
var v = localStorage.getItem("sb.view");
if (v === "seat" || v === "chase")
SB.view = v;
}
catch (e) { } })();
function sbAU() { return SP.pos.length() / SP_BY.earth.orbit; }
function sbFit(g, len) { return __ZC(462, 0, this, arguments, new.target); }
function sbEngine(P, body, col, r, x, y, z, len) { return __ZC(462, 1, this, arguments, new.target); }
function sbWing(P, mat, pts, th, x, y, z, s) {
var p = pts.map(function (q) { return [q[0] * (s || 1), q[1]]; });
return mmFlat(P, mat, p, th, x, y, z, Math.PI / 2, 0, 0);
}
function sbNav(P, col, x, y, z) { var m = mmEll(P, mmMat(col, { glow: 1 }), 0.16, 0.16, 0.16, x, y, z, 8); mmGlow(P, col, 1.6, 0.6, x, y, z); return m; }
function sbBuildCutter(hullCol, trimCol) { return __ZC(462, 2, this, arguments, new.target); }
function sbBuildShuttle() { return __ZC(462, 3, this, arguments, new.target); }
function sbBuildSaucer() { return __ZC(462, 4, this, arguments, new.target); }
function sbRaiderMats() { return __ZC(462, 5, this, arguments, new.target); }
function sbBuildDart() { return __ZC(462, 6, this, arguments, new.target); }
function sbBuildGunship() { return __ZC(462, 7, this, arguments, new.target); }
function sbBuildMarauder() { return __ZC(462, 8, this, arguments, new.target); }
function sbShipModel(k) { return __ZC(462, 9, this, arguments, new.target); }
function sbFoeModel(type) { return __ZC(462, 10, this, arguments, new.target); }
function sbOwns(k) { return __ZC(462, 11, this, arguments, new.target); }
function sbMine() { return SB_ORDER.filter(sbOwns); }
function sbBoard(k, quiet) { return __ZC(462, 12, this, arguments, new.target); }
function sbSecondGun() {
if (typeof bwOwns !== "function")
return null;
var pick = null, k;
try {
var want = localStorage.getItem("sb.second");
if (want && SB_SECOND[want] && (bwOwns(want) || sbKeeper()))
pick = want;
}
catch (e) { }
if (!pick)
for (k in SB_SECOND) {
if (bwOwns(k)) {
pick = k;
break;
}
}
if (!pick)
return null;
var S = Object.assign({ k: pick }, SB_SECOND[pick]);
return S;
}
function sbShipsCard() { return __ZC(462, 13, this, arguments, new.target); }
function sbToggleView() {
SB.view = SB.view === "chase" ? "seat" : "chase";
sbSave();
sbSay(SB.view === "seat" ? "<b>From the pilot's seat.</b> " + (sbTouch() ? "View" : "V") + " to see your ship from behind." : "<b>From behind your ship.</b> " + (sbTouch() ? "View" : "V") + " for the pilot's seat.");
}
(function () {
if (typeof spTick !== "function")
return;
var st = spTick;
spTick = function (dt) {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp, fight = !!(SB.battle && SB.foes.length);
SP_CRUISE = 70 * D.spd * (fight ? 1.5 : 1);
SP_BOOST = (fight ? 260 : 650) * D.spd;
if (SB.slow > 0) {
SB.slow -= dt;
SP_CRUISE *= 0.6;
SP_BOOST *= 0.6;
}
if (!SB.rollG && SP.ship)
sbBoard(SB.k, true);
var y0 = yaw;
var r = st.apply(this, arguments);
try {
sbAfterTick(dt, y0);
}
catch (e) {
if (!SB.warned) {
SB.warned = 1;
console.warn("space battles", e);
}
}
return r;
};
})();
function sbAfterTick(dt, y0) { return __ZC(462, 14, this, arguments, new.target); }
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
if (!(sbHere() && SB.view === "chase" && walkMode && camera && !sbVR() && SB.model)) {
if (sbHere() && camera) {
try {
camera.updateMatrixWorld();
sbScreenTick();
}
catch (e) { }
}
return rv.apply(this, arguments);
}
var P = camera.position, px = P.x, py = P.y, pz = P.z, f = sbFwd(yaw, pitch), R = (SB.model.userData.r || 8), d = R * 3.3 + 6, up = R * 1.05 + 1.5, la = R * 7;
camera.position.set(px - f.x * d, py - f.y * d + up, pz - f.z * d);
camera.lookAt(px + f.x * la, py + f.y * la + up * 0.55, pz + f.z * la);
try {
camera.updateMatrixWorld();
sbScreenTick();
}
catch (e) { }
var mv = typeof meView !== "undefined" ? meView : null;
if (mv !== null && mv !== "eyes")
meView = "eyes";
var r;
try {
r = rv.apply(this, arguments);
}
finally {
if (mv !== null)
meView = mv;
camera.position.set(px, py, pz);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
}
return r;
};
})();
(function () {
if (typeof vcpNow !== "function")
return;
var vn = vcpNow;
vcpNow = function () {
if (sbHere() && SB.view === "seat" && typeof VCP !== "undefined") {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp, kind = D.cpit;
if (kind.indexOf("mm:") === 0 && !(VCP.reg[kind] || (typeof VCP_BUILD !== "undefined" && VCP_BUILD[kind])))
kind = "mm:*";
if (VCP.reg[kind] || (typeof VCP_BUILD !== "undefined" && VCP_BUILD[kind]))
return { kind: kind, h: yaw, roll: 0, pitch: pitch, read: sbReadCockpit };
}
return vn.apply(this, arguments);
};
})();
function sbReadCockpit() { return __ZC(462, 15, this, arguments, new.target); }
var SB_V1 = new THREE.Vector3(), SB_V2 = new THREE.Vector3(), SB_V3 = new THREE.Vector3();
var SB_GEO = {};
function sbLook(o, p) { var G = sbG(); o.lookAt(p.x + (G ? G.position.x : 0), p.y + (G ? G.position.y : 0), p.z + (G ? G.position.z : 0)); }
function sbShotMesh(kind) { return __ZC(462, 16, this, arguments, new.target); }
function sbShoot(from, dir, kind, dmg, side, o) { return __ZC(462, 17, this, arguments, new.target); }
function sbAim(range) { return __ZC(462, 18, this, arguments, new.target); }
function sbFire() { return __ZC(462, 19, this, arguments, new.target); }
function sbFire2() { return __ZC(462, 20, this, arguments, new.target); }
(function () {
if (typeof scShipFire !== "function")
return;
var sf = scShipFire;
scShipFire = function () { if (sbHere())
return sbFire(); return sf.apply(this, arguments); };
})();
function sbNearestFoe(p, range) { var b = null, bd = range || 1e9; SB.foes.forEach(function (F) { if (F.down)
return; var d = F.p.distanceTo(p); if (d < bd) {
bd = d;
b = F;
} }); return b; }
function sbSpawn(type, at, side, name) { return __ZC(462, 21, this, arguments, new.target); }
function sbShipTick(F, dt) { return __ZC(462, 22, this, arguments, new.target); }
function sbKeepClear(p, pad) { return __ZC(462, 23, this, arguments, new.target); }
function sbSeg(a, b, p) { var ab = SB_V3.copy(b).sub(a), t = Math.max(0, Math.min(1, p.clone().sub(a).dot(ab) / Math.max(1e-6, ab.lengthSq()))); return a.clone().addScaledVector(ab, t).distanceTo(p); }
function sbShotsTick(dt) { return __ZC(462, 24, this, arguments, new.target); }
function sbDamage(F, dmg, s) { return __ZC(462, 25, this, arguments, new.target); }
function sbKnockOut(F) { return __ZC(462, 26, this, arguments, new.target); }
function sbPuff(p, col, size, life) {
var G = sbG();
if (!G || sbLite() && size < 8)
return;
var s = wGlow(col, size, 0.7);
s.position.copy(p);
G.add(s);
SB.fx.push({ g: s, t: 0, life: life || 0.7, size: size });
if (SB.fx.length > 40) {
var x = SB.fx.shift();
if (x.g.parent)
x.g.parent.remove(x.g);
}
}
function sbFxTick(dt) { return __ZC(462, 27, this, arguments, new.target); }
function sbHurt(dmg) {
if (!sbHere())
return;
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
SB.lastHit = SB.t;
if (SB.shield > 0) {
SB.shield = Math.max(0, SB.shield - dmg);
sbVig(0x6AC8FF, 0.14);
}
else {
SB.hull = Math.max(0, SB.hull - dmg);
sbVig(0xFF6A3A, 0.18);
}
if (SB.hull <= 0)
sbDisabled();
}
function sbRegen(dt) {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
if (SB.t - SB.lastHit > 4 && SB.shield < D.shield)
SB.shield = Math.min(D.shield, SB.shield + D.shield * 0.12 * dt);
if (!SB.battle && SB.hull < D.hull)
SB.hull = Math.min(D.hull, SB.hull + D.hull * 0.02 * dt);
}
function sbDisabled() { return __ZC(462, 28, this, arguments, new.target); }
function sbVig(col, op) { return __ZC(462, 29, this, arguments, new.target); }
function sbStrike(o) { return __ZC(462, 30, this, arguments, new.target); }
function sbCombatTick(dt) { return __ZC(462, 31, this, arguments, new.target); }
function sbDrop(F) { if (F.g.parent)
F.g.parent.remove(F.g); }
function sbClearAll() { return __ZC(462, 32, this, arguments, new.target); }
function sbEndBattle(how) { return __ZC(462, 33, this, arguments, new.target); }
function sbStrikeGap() { var m = Math.max(2, +SB.cfg.every || 6); return m * 60 * (0.7 + Math.random() * 0.6) * (typeof myfPace === "function" ? myfPace() : 1); }
function sbStrikeClock(dt) {
if (SB.battle || !SB.cfg.on)
return;
if (sbAU() < 1.6)
return;
SB.strikeAt -= dt;
if (SB.strikeAt <= 0) {
SB.strikeAt = sbStrikeGap();
sbStrike({});
}
}
if (typeof VO_KEEP_ALL !== "undefined") {
VO_KEEP_ALL["sb-hud"] = 1;
VO_KEEP_ALL["sb-pad"] = 1;
VO_KEEP_ALL["sb-mark"] = 1;
VO_KEEP_ALL["sb-arrow"] = 1;
VO_KEEP_ALL["sb-vig"] = 1;
}
function sbCss() { return __ZC(462, 34, this, arguments, new.target); }
function sbHud(on) { return __ZC(462, 35, this, arguments, new.target); }
function sbHudTick(dt) { return __ZC(462, 36, this, arguments, new.target); }
function sbScreenTick() { return __ZC(462, 37, this, arguments, new.target); }
function sbNextTarget() {
var live = SB.foes.filter(function (F) { return !F.down; });
if (!live.length) {
SB.target = null;
return;
}
live.sort(function (a, b) { return a.p.distanceTo(SP.pos) - b.p.distanceTo(SP.pos); });
var i = live.indexOf(SB.target);
SB.target = live[(i + 1) % live.length];
SB.hudKey = "";
}
(function () {
var W = WORLDS.space;
if (!W)
return;
var k = W.key_;
W.key_ = function (e) {
if (e.code === "KeyG") {
sbFire2();
return true;
}
if (e.code === "KeyT") {
sbNextTarget();
return true;
}
if (e.code === "KeyV") {
sbToggleView();
return true;
}
if (e.code === "KeyB") {
sbShipsCard();
return true;
}
return k ? k.call(this, e) : false;
};
var lv = W.leave;
W.leave = function () { var r = lv ? lv.apply(this, arguments) : undefined; try {
sbClearAll();
sbHud(false);
if (SB.fill)
SB.fill.visible = false;
}
catch (e) { } return r; };
var en = W.enter;
W.enter = function () { var r = en ? en.apply(this, arguments) : undefined; try {
SB.strikeAt = Math.min(SB.strikeAt, sbStrikeGap());
sbServerCfg();
if (SP.ship)
sbBoard(SB.k, true);
sbHud(true);
}
catch (e) {
console.warn("space battles", e);
} return r; };
})();
(function () {
if (typeof spBar !== "function")
return;
var sb = spBar;
spBar = function (on) {
var r = sb.apply(this, arguments);
if (SP.bar && !SP.bar.dataset.sb) {
SP.bar.dataset.sb = "1";
[["🚀 Ships", function () { sbShipsCard(); }], ["⚔ Battles", function () { sbBattlesCard(); }]].forEach(function (q) {
var x = document.createElement("button");
x.textContent = q[0];
x.style.cssText = "background:rgba(10,14,30,.88);color:#E8ECF4;border:1px solid #E8A86A;border-radius:12px;padding:4px 10px;cursor:pointer";
x.onclick = function (e) { e.stopPropagation(); q[1](); };
SP.bar.appendChild(x);
});
}
return r;
};
})();
function sbBattlesCard() { return __ZC(462, 38, this, arguments, new.target); }
function sbHunt(where) { return __ZC(462, 39, this, arguments, new.target); }
function sbServerCfg() { return __ZC(462, 40, this, arguments, new.target); }
function sbServerStart() { if (!sbSigned() || SB.missing)
return; sbRpc("space_battle_start", {}).catch(function (e) { if (sbMissing(e))
SB.missing = true; }); }
function sbServerWon(B, downs) { return __ZC(462, 41, this, arguments, new.target); }
(function () {
var d = sbDisabled;
sbDisabled = function () { if (sbSigned() && !SB.missing)
sbRpc("space_battle_lost", {}).catch(function () { }); return d.apply(this, arguments); };
})();
(function () {
try {
var q = String(location.search || "");
var m = q.match(/[?&]ksb=([a-z]+)/);
if (!m)
return;
var want = m[1], tries = 0;
var iv = setInterval(function () {
tries++;
if (tries > 240) {
clearInterval(iv);
return;
}
if (!(typeof worldGo === "function" && WORLDS.space && typeof sbKeeper === "function" && sbKeeper()))
return;
clearInterval(iv);
worldGo("space", { station: "ares" });
if (want === "strike")
setTimeout(function () { sbStrike({ why: "keeper" }); }, 2500);
}, 500);
}
catch (e) { }
})();
var FR = { sys: "reach", c: new THREE.Vector3(0, 0, -95000), g: null, bodies: {}, disc: {}, light: null, in: false, gate: null, near: null, built: false, t: 0 };
var FR_BODIES = [
{ k: "ilsa", name: "Ilsa, the Rose Sun", kind: "An orange-red star, a little smaller and cooler than our Sun", r: 560, orbit: 0, ang: 0, col: 0xFF9A7A, star: 1,
rows: [["Type", "K-type star (orange dwarf), seen rose through the Reach's dust"], ["Surface", "About 4,400 °C, cooler than our Sun's 5,500 °C"], ["Partner", "Teth, the Blue Sun: they circle each other"]],
notes: ["Most stars in our galaxy are smaller and cooler than our Sun. Orange dwarfs like Ilsa shine steadily for tens of billions of years, so astronomers think their planets are good places to look for life.", "Stars that come in pairs are called binary stars. About half the Sun-like stars we know have at least one partner."] },
{ k: "teth", name: "Teth, the Blue Sun", kind: "A small, hot blue-white star", r: 150, orbit: 3200, ang: 2.2, col: 0xA8D8FF, star: 1, y: 300,
rows: [["Type", "A small hot star, blue-white"], ["Colour", "Hotter stars shine bluer: Teth's surface is over 9,000 °C"]],
notes: ["A star's colour tells its temperature: red stars are the coolest, then orange, yellow, white, and blue is hottest.", "On Veyar, the two suns make two shadows of everything, one rose and one blue."] },
{ k: "veyar", name: "Veyar", kind: "Home world of the Veyari", r: 130, orbit: 6400, ang: 0.9, land: "veyar", people: "veyari", paint: "veyar",
rows: [["People", "The Veyari: tall, calm, star-faring"], ["Suns", "Two, rose and blue"], ["Great city", "Ilvessa, the Singing City"]],
notes: ["The Veyari built the watch-station by Neptune and came through the Far Gate long ago, curious about the blue world.", "Planets that circle a pair of stars are called circumbinary planets. The first one confirmed, Kepler-16b, was found in 2011."] },
{ k: "maruondo", name: "Maru-Ondo", kind: "An ocean world: no land at all, only sea and reefs", r: 175, orbit: 9200, ang: 3.6, land: "maruondo", people: "ondai", paint: "ocean",
rows: [["People", "The Ondai, gentle giant reef-builders who sing"], ["Surface", "Ocean everywhere, with floating reef-towns"], ["Day", "Long and blue-lit"]],
notes: ["Astronomers think some planets may be 'ocean worlds', covered in water hundreds of kilometres deep.", "In our own Solar System, Jupiter's moon Europa and Saturn's moon Enceladus hide oceans of liquid water under their ice."] },
{ k: "hoon", name: "Hoon", kind: "A green-gold gas giant with rings", r: 340, orbit: 12600, ang: 5.0, paint: "hoon", ring: 1,
rows: [["Kind", "Gas giant, mostly hydrogen and helium"], ["Rings", "Ice and dust, lit gold by Ilsa"], ["Moon", "Tullimar, the Tullik market moon"]],
notes: ["Every giant planet in our Solar System has rings: Saturn's are the brightest, but Jupiter, Uranus and Neptune have them too.", "A ring is made of countless bits of ice and rock, each on its own orbit."] },
{ k: "tullimar", name: "Tullimar", kind: "The Tullik market moon", r: 58, parent: "hoon", orbit: 900, ang: 1.4, land: "tullimar", people: "tullik", paint: "tullimar",
rows: [["People", "The Tullik, small big-headed traders"], ["Known for", "A market that never closes, spice cake that fizzes, rocks that hum"], ["Orbits", "Hoon, the gas giant"]],
notes: ["Moons can be worlds in their own right: Saturn's moon Titan is bigger than the planet Mercury and has a thick air.", "Pip-Tullik, the trader you meet out past Saturn, was born here."] },
{ k: "orr", name: "Orr", kind: "The machine world of the Orrem, gone silent", r: 145, orbit: 16200, ang: 2.7, land: "orr", people: "orrem", paint: "orr",
rows: [["People", "The Orrem: thinking machines, makers of the survey drones"], ["State", "Silent for a very long time"], ["Surface", "Plated over, with towers and long lines of light"]],
notes: ["The Orrem sent their survey drones out to map every world. Then they stopped answering. Nobody knows why.", "Real space probes have flown out of our Solar System: Voyager 1, launched in 1977, is more than 24 billion km away and still sending a faint signal home."] },
{ k: "skeldmar", name: "Skeldmar", kind: "A world of red stone and great fortresses", r: 155, orbit: 19400, ang: 4.4, land: "skeldmar", people: "hrovan", paint: "skeldmar",
rows: [["People", "The Hrovan: stone-skinned, proud, honourable duellists"], ["Surface", "Red rock, deep canyons and fortress-cities"], ["Gravity", "Strong: a third more than Earth's"]],
notes: ["The Hrovan respect only those who have beaten their champion in a fair fight. Win, and they will fly beside you.", "A planet bigger than Earth but made of rock is called a super-Earth. Many have been found around other stars."] },
{ k: "cinder", name: "Cinder and the Ashen Drift", kind: "A dead moon in a field of wrecks: the grey raiders' hold", r: 95, orbit: 23800, ang: 0.2, paint: "cinder", drift: 1,
rows: [["Who holds it", "The grey raiders"], ["What is there", "Wrecks of a thousand ships, and the raiders' fortress hulk"], ["Danger", "The raiders' patrols fly here day and night"]],
notes: ["The grey raiders strip every ship they catch and add it to the Drift. Some of their ships still wear Space Corp paint.", "Stay clear unless you come to fight."] }
];
var FR_BY = {};
FR_BODIES.forEach(function (b) { FR_BY[b.k] = b; });
var FR_DISC = [
{ k: "veil", name: "The Veil of Sael", kind: "A nebula: a cloud of glowing gas", at: [-15000, 2600, 7000], r: 2600,
notes: ["A nebula is a cloud of gas and dust in space. New stars are born where the cloud is thickest.", "The pink glow comes from hydrogen gas lit by young stars; the blue-green from oxygen. The Orion Nebula, visible to the naked eye from Earth, glows the same way."] },
{ k: "lantern", name: "The Sael Lantern", kind: "An ancient Veyari beacon", at: [4200, 1400, 13600], r: 60,
notes: ["The Veyari say the Lantern was lit to guide their first ships home through the Far Gate, and has never once gone out.", "Lighthouses for ships in space are real ideas: pulsars, dead stars that spin, give off beams so regular they could be used to find your way across the galaxy."] },
{ k: "ark", name: "A derelict Orrem ark", kind: "A huge machine ship, dark and drifting", at: [-9800, -900, 21000], r: 140,
notes: ["The ark's last log, still running on a weak power cell: \"All minds aboard. Destination: the world beyond the Gate. Reason: the grey ones came.\" So the Orrem fled the raiders.", "A ship meant to carry people for generations between the stars is called a generation ship. None has been built, but scientists have worked out what one would need."] },
{ k: "kethrin", name: "Kethrin, a brown dwarf", kind: "A failed star, glowing deep red", at: [19000, -3000, -6000], r: 220,
notes: ["A brown dwarf is bigger than Jupiter but too small for its core to burn hydrogen like a star. It glows dull red from the heat left over from when it formed.", "The first brown dwarfs were confirmed in 1995. Some are so cool you could, in theory, stand near one without burning."] },
{ k: "comet", name: "A wandering comet", kind: "A comet that belongs to no sun", at: [11000, 2200, 26000], r: 30,
notes: ["Comets are lumps of ice and dust. Some are thrown out of their home system and wander between the stars.", "In 2017 astronomers saw ‘Oumuamua, the first object known to come into our Solar System from another star. A second, comet Borisov, followed in 2019."] },
{ k: "wreck", name: "A raider wreck", kind: "A gutted ship with a Space Corp number on its hull", at: [2000, -400, 20500], r: 40,
notes: ["The hull carries an old Space Corp number under the raiders' red paint. The raiders did not build this ship; they took it.", "Its chart is still in the console: every line on it leads to Cinder and the Ashen Drift."] }
];
function frBuild(G) { return __ZC(462, 42, this, arguments, new.target); }
function frPaint(k) { return __ZC(462, 43, this, arguments, new.target); }
function frPaintData(k) {
var W = 512, H = 256, seed = k.length * 173 + k.charCodeAt(0) * 7;
var d = new Uint8ClampedArray(W * H * 4), c = new THREE.Color(), c2 = new THREE.Color();
for (var py = 0; py < H; py++)
for (var px = 0; px < W; px++) {
var u = px / W, v = py / H, lat = (v - 0.5) * Math.PI, i = (py * W + px) * 4;
var sx = Math.cos(lat) * Math.cos(u * Math.PI * 2), sz = Math.cos(lat) * Math.sin(u * Math.PI * 2), sy = Math.sin(lat);
var n = (wFbm(sx * 2.2 + 5, sy * 2.2 + 5, seed, 5) + wFbm(sy * 2.2 + 9, sz * 2.2 + 3, seed + 3, 5) + wFbm(sz * 2.2 + 1, sx * 2.2 + 7, seed + 5, 5)) / 3;
n = 0.5 + (n - 0.5) * 1.9;
var n2 = (wFbm(sx * 7 + 11, sy * 7, seed + 7, 3) + wFbm(sz * 7 + 2, sx * 7 + 4, seed + 9, 3)) / 2;
switch (k) {
case "ilsa":
c.setHex(0xFF8A5A).lerp(c2.setHex(0xFFD0A0), n2 * 0.9);
c.lerp(c2.setHex(0xC8402A), Math.max(0, n - 0.6) * 1.4);
break;
case "teth":
c.setHex(0xC8E8FF).lerp(c2.setHex(0xFFFFFF), n2);
break;
case "veyar":
c.setHex(0x3A2A6A).lerp(c2.setHex(0x6AD8B8), Math.max(0, n - 0.42) * 1.8);
if (n2 > 0.62)
c.lerp(c2.setHex(0xE8B8F0), 0.5);
if (Math.abs(sy) > 0.88)
c.setHex(0xF0E8FF);
break;
case "ocean":
c.setHex(0x0E3A6A).lerp(c2.setHex(0x1A7AA8), n);
if (n > 0.7 && n2 > 0.55)
c.setHex(0x3AC8B0);
if (wFbm(u * 9, v * 18 + n, seed + 11, 3) > 0.62)
c.lerp(c2.setHex(0xFFFFFF), 0.75);
break;
case "hoon":
var bh = Math.sin(lat * 12 + n * 1.4) * 0.5 + 0.5;
c.setHex(0xC8D890).lerp(c2.setHex(0x8A9A40), bh * 0.8);
c.lerp(c2.setHex(0xE8C870), Math.max(0, n2 - 0.55));
break;
case "tullimar":
c.setHex(0x8A9A6A).lerp(c2.setHex(0x5A6A3A), n);
if (n2 > 0.66)
c.lerp(c2.setHex(0xE8C27A), 0.6);
break;
case "orr":
c.setHex(0x3A3E48).lerp(c2.setHex(0x5A606C), n);
var gx = Math.abs(Math.sin(u * Math.PI * 64)), gy = Math.abs(Math.sin(v * Math.PI * 32));
if (gx < 0.06 || gy < 0.06)
c.lerp(c2.setHex(0x2A2C32), 0.7);
break;
case "skeldmar":
c.setHex(0x8A3A22).lerp(c2.setHex(0xC87A4A), n);
if (n2 < 0.38)
c.lerp(c2.setHex(0x4A1E12), 0.6);
if (Math.abs(sy) > 0.9)
c.setHex(0xE8D8C8);
break;
case "cinder":
c.setHex(0x3A3634).lerp(c2.setHex(0x6A625A), n);
if (n2 > 0.7)
c.lerp(c2.setHex(0x1A1818), 0.6);
break;
default: if (typeof gxPaintPx === "function")
gxPaintPx(k, c, c2, n, n2, sy, u, v);
else
c.setHex(0x888888);
}
d[i] = c.r * 255;
d[i + 1] = c.g * 255;
d[i + 2] = c.b * 255;
d[i + 3] = 255;
}
return d;
}
function frOrrLights(h, r, col) {
var pts = [], R = wRand(808);
for (var i = 0; i < 900; i++) {
var u = R() * 2 - 1, th = R() * Math.PI * 2, s = Math.sqrt(1 - u * u);
pts.push([r * 1.003 * s * Math.cos(th), r * 1.003 * u, r * 1.003 * s * Math.sin(th)]);
}
h.add(wPoints(pts.length, function (j) { return pts[j]; }, col && col > 1 ? col : 0x8AC8FF, 2.2, false));
}
function frDrift(h, r) { return __ZC(462, 44, this, arguments, new.target); }
function frDiscBuild(d) { return __ZC(462, 45, this, arguments, new.target); }
function frBodyPos(k, out) {
var b = FR_BY[k], o = out || new THREE.Vector3();
if (!b)
return o.set(0, 0, 0);
var a = b.ang + (b.parent ? FR.t * 0.015 : FR.t * 0.0008);
o.set(Math.cos(a) * b.orbit, b.y || 0, Math.sin(a) * b.orbit);
if (b.parent) {
o.add(frBodyPos(b.parent));
}
return o;
}
function frWorld(k) { var p = frBodyPos(k); return p.add(FR.c); }
function frDiscPos(d) { return new THREE.Vector3(d.at[0], d.at[1], d.at[2]).add(FR.c); }
function frGatePos() { if (FR.sys !== "reach")
return FR.c.clone().add(new THREE.Vector3(0, 9e6, 0)); return FR.gate ? FR.gate.position.clone().add(FR.c) : FR.c.clone().add(new THREE.Vector3(0, 700, 12000)); }
function frIn() { return sbHere() && SP.pos.distanceTo(FR.c) < 40000; }
(function () {
if (typeof spBuild !== "function")
return;
var b = spBuild;
spBuild = function (G) { var r = b.apply(this, arguments); try {
frBuild(G);
}
catch (e) {
console.warn("far reach", e);
} return r; };
})();
(function () {
if (typeof spThroughGate !== "function")
return;
spThroughGate = function () {
spLearnGate();
if (typeof scMissionEvent === "function")
scMissionEvent("gate");
spFlash(0x8AE0FF);
setTimeout(function () {
if (!sbHere())
return;
var gp = frGatePos(), to = FR.c.clone().sub(gp).normalize();
SP.pos.copy(gp).addScaledVector(to, 320);
SP.vel.set(0, 0, 0);
SP.auto = null;
var d = FR.c.clone().add(new THREE.Vector3(0, 300, 0)).sub(SP.pos).normalize();
yaw = Math.atan2(-d.x, -d.z);
pitch = Math.asin(Math.max(-1, Math.min(1, d.y)));
frLog("reach");
sbSay("<b>The Far Reach.</b> Two suns ahead, rose and blue, and Veyar turning between them. Other worlds are out here, and other peoples. <b>M</b> opens the chart of the Reach; the gate behind you takes you home.");
}, 380);
};
})();
function frHome() { return __ZC(462, 46, this, arguments, new.target); }
(function () {
if (typeof sfTakeOff !== "function")
return;
var tf = sfTakeOff;
sfTakeOff = function () {
var k = SF.k, b = null;
FR_BODIES.forEach(function (x) { if (x.land === k)
b = x; });
if (!b)
return tf.apply(this, arguments);
spFlash(0xFFFFFF);
var p = frWorld(b.k), at = p.clone().add(new THREE.Vector3(0, b.r * 0.4, b.r * 2.6));
worldGo("space", { at: at, look: p, keepFrom: true, msg: "<b>Lift-off.</b> " + sbEsc(b.name) + " falls away below you" + (FR.sys === "reach" ? ", under the Reach's two suns." : ".") });
};
})();
(function () {
if (typeof spPromptTick !== "function")
return;
var pt = spPromptTick;
spPromptTick = function () {
if (!frIn())
return pt.apply(this, arguments);
if (SB.esc && SB.esc.g && SP.pos.distanceTo(SB.esc.p) < 120 && !SB.esc.started)
return worldPrompt("<b>" + sbEsc(SB.esc.name) + "</b> · <b>press E</b> to say you are ready to fly with them", function () { frEscortGo(); });
if (SP.enc && SP.enc.g && SP.pos.distanceTo(SP.enc.g.position) < 160)
return worldPrompt("<b>" + sbEsc(SP.enc.name) + "</b> alongside · <b>press E</b> to hail them", function () { spHail(SP.enc.who); });
if (FR.gate && SP.pos.distanceTo(frGatePos()) < 260)
return worldPrompt("<b>The Far Gate</b> · the way home · <b>press E</b> to fly through", function () { frHome(); });
var near = FR.near;
if (near && near.disc) {
var d = near.disc;
return worldPrompt("<b>" + sbEsc(d.name) + "</b> · <b>press E</b> to " + (frLogged(d.k) ? "read it in your Star Log" : "scan it"), function () { frScan(d); });
}
if (near && near.b) {
var b = near.b;
if (b.star)
return worldPrompt("<b>" + sbEsc(b.name) + "</b> · far too hot to land · <b>press E</b> for its card", function () { frInfo(b.k); });
if (b.land)
return worldPrompt("<b>" + sbEsc(b.name) + "</b> · <b>press E</b> to land", function () { frLand(b); });
return worldPrompt("<b>" + sbEsc(b.name) + "</b> · <b>press E</b> for its card", function () { frInfo(b.k); });
}
worldPrompt(null);
};
})();
(function () {
if (typeof spBannerTick !== "function")
return;
var bt = spBannerTick;
spBannerTick = function () {
if (!frIn())
return bt.apply(this, arguments);
var N = FR.near, nm = gxName(), where = N ? (N.b ? "near " + N.b.name : N.disc ? "near " + N.disc.name : nm) : nm;
var spd = SP.auto ? "autopilot" : SP.speed > SP_BOOST * 0.6 ? "boost" : SP.speed > 2 ? "cruising" : "holding still";
var h = "<b>" + sbEsc(gxName(1)) + "</b> · " + sbEsc(where) + " · " + spd;
if (SB.esc && SB.esc.started && !SB.esc.done && FR_BY[SB.esc.to])
h += "<div style='color:#E8C27A'>Escort: keep " + sbEsc(SB.esc.name) + " safe to " + sbEsc(FR_BY[SB.esc.to].name) + " · " + Math.round(SB.esc.p.distanceTo(frWorld(SB.esc.to))) + " m to go</div>";
if (SB.duel && !SB.duel.done)
h += "<div style='color:#E8C27A'>The champion's challenge: knock out " + sbEsc(SB.duel.name) + "</div>";
worldBanner(h);
};
})();
(function () {
if (typeof spChart !== "function")
return;
var ch = spChart;
spChart = function () {
if (!frIn())
return ch.apply(this, arguments);
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Chart of " + sbEsc(gxName()) + "</div><div style='opacity:.8'>Choose where to go and the ship flies you. What you have found is in your Star Log.</div>";
FR_BODIES.forEach(function (b) { h += worldBtn("go-" + b.k, sbEsc(b.name), sbEsc(b.kind)); fns["go-" + b.k] = function () { var p = frWorld(b.k), r = b.r * (b.star ? 4 : 2.6) + 30, from = SP.pos.clone().sub(p); from.y = 0; if (from.lengthSq() < 1)
from.set(1, 0, 0); from.normalize(); spFlyTo({ pos: p.clone().addScaledVector(from, r).add(new THREE.Vector3(0, r * 0.18, 0)), fr: b.k, frR: r, frFrom: from, name: b.name, after: b.land ? "Press E to land." : "Press E for its card." }); }; });
FR_DISC.forEach(function (d) { if (!frLogged(d.k) && !frSeen(d.k))
return; h += worldBtn("d-" + d.k, "✦ " + sbEsc(d.name), sbEsc(d.kind)); fns["d-" + d.k] = function () { var p = frDiscPos(d), from = SP.pos.clone().sub(p).normalize(); spFlyTo({ pos: p.clone().addScaledVector(from, d.r * 1.6 + 60), name: d.name, after: "Press E to scan." }); }; });
h += worldBtn("drive", "✦ Star Drive", "Jump at light speed to another star");
fns.drive = function () { gxMap(); };
if (FR.sys === "reach")
h += worldBtn("gate", "The Far Gate", "The way home, to Pluto's dark");
fns.gate = function () { var gp = frGatePos(), to = FR.c.clone().sub(gp).normalize(); spFlyTo({ pos: gp.clone().addScaledVector(to, 180), name: "the Far Gate", after: "Press E to fly through." }); };
h += worldBtn("log", "📖 Your Star Log", "Everything you have found, and how the peoples stand with you");
fns.log = function () { frLogCard(); };
worldCard(h, fns);
};
})();
function frInfo(k) {
var b = FR_BY[k];
if (!b)
return;
frLog(k);
var extra = b.land ? worldBtn("land", "Land on " + sbEsc(b.name), "Walk there") : "";
worldCard(worldFacts(b.name, b.kind, b.rows, b.notes, extra), { land: function () { worldCard(null); frLand(b); } });
}
function frLand(b) { frLog(b.k); if (b.land === "veyar" || SP_SURF[b.land])
spLand(b.land); }
function frTick(dt) { return __ZC(462, 47, this, arguments, new.target); }
(function () {
var ct = sbCombatTick;
sbCombatTick = function (dt) { try {
frTick(dt);
}
catch (e) {
if (!FR.warned) {
FR.warned = 1;
console.warn("far reach", e);
}
} return ct.apply(this, arguments); };
})();
function frLogGet() { try {
return JSON.parse(localStorage.getItem("sb.log") || "{}") || {};
}
catch (e) {
return {};
} }
function frLogged(k) { return !!frLogGet()[k]; }
function frSeen(k) { return !!(FR.seen && FR.seen[k]); }
function frSee(k) { FR.seen = FR.seen || {}; FR.seen[k] = 1; }
function frLog(k) { return __ZC(462, 48, this, arguments, new.target); }
function frScan(d) {
var first = frLog(d.k);
if (first) {
sbTone(660, 0.3);
}
if (d.k === "ark" && typeof frStandAdd === "function")
frStandAdd("orrem", "clue");
worldCard(worldFacts(d.name, d.kind, [], d.notes), {});
}
function frLogCard() { return __ZC(462, 49, this, arguments, new.target); }
if (typeof SP_SURF !== "undefined") {
SP_SURF.tullimar = { body: null, gravity: 1.9, ground: [0x6A7A4A, 0x9AA870], rough: 7, craters: 24, top: 0x0A0C14, low: 0x2A3A2A, sun: 0.85, sunCol: 0xFFD8C0, hemi: 0.6, hemiCol: 0xD8E0B0, fogD: 0.0003, fog: 0x2A3A2A, stars: 0.7,
sky: [{ k: "hoon", dir: [-0.35, 0.42, -0.84], size: 900, col: 0xB8C878 }, { k: "sun2", dir: [0.6, 0.35, -0.7], size: 90, col: 0xFFB090 }], sunDir: [0.6, 0.35, -0.7], title: "Tullimar, the market moon",
about: "Hoon fills half the sky, green and gold, its rings a bridge of light. Down here the Tullik market never closes." };
SP_SURF.maruondo = { body: null, gravity: 9.0, ground: [0xD8B890, 0xF0D8B0], rough: 3, craters: 0, top: 0x3A7AC8, low: 0xA8D8F0, sun: 0.9, sunCol: 0xFFE0E8, hemi: 0.85, hemiCol: 0xC8E8FF, fogD: 0.0011, fog: 0xA8D0E8, stars: 0,
sky: [{ k: "sun2", dir: [0.5, 0.45, -0.7], size: 120, col: 0xFFB8C8 }, { k: "sun3", dir: [0.7, 0.5, -0.4], size: 46, col: 0xC8ECFF }], sunDir: [0.5, 0.45, -0.7], title: "Maru-Ondo, the ocean world",
about: "No land at all: only the sea, and the great floating reefs the Ondai grow and sing into shape." };
SP_SURF.orr = { body: null, gravity: 8.2, ground: [0x3A3E46, 0x5A606A], rough: 2, craters: 0, top: 0x05070C, low: 0x1A2230, sun: 0.55, sunCol: 0xE8D8FF, hemi: 0.45, hemiCol: 0x8AA0C8, fogD: 0.0009, fog: 0x141A24, stars: 0.6,
sky: [{ k: "sun2", dir: [0.4, 0.25, -0.8], size: 70, col: 0xFFA090 }, { k: "sun3", dir: [0.55, 0.3, -0.7], size: 24, col: 0xC8ECFF }], sunDir: [0.4, 0.25, -0.8], title: "Orr, the silent machine world",
about: "Plates of metal to the horizon, towers with their lights still burning, and no voice anywhere. The Orrem are here, but they do not answer." };
SP_SURF.skeldmar = { body: null, gravity: 13.0, ground: [0x7A3420, 0xB86A40], rough: 18, craters: 4, top: 0x5A2A2A, low: 0xD89A70, sun: 0.95, sunCol: 0xFFD0B0, hemi: 0.65, hemiCol: 0xF0B890, fogD: 0.0010, fog: 0xC88A68, stars: 0,
sky: [{ k: "sun2", dir: [-0.5, 0.5, -0.7], size: 110, col: 0xFFA080 }, { k: "sun3", dir: [-0.65, 0.42, -0.55], size: 36, col: 0xC8ECFF }], sunDir: [-0.5, 0.5, -0.7], title: "Skeldmar, the red stone world",
about: "Red rock and deep canyons under a heavy pull: every step is work. On the ridge stand the fortress-halls of the Hrovan." };
}
var FR_PEOPLES = {
veyari: { name: "the Veyari", world: "veyar", ally: "skiff", gift: "A shard of the Singing Crystal",
task: { k: "lantern", name: "Light on your path", say: "Find the Sael Lantern, out in the Reach, and scan it. Bring its reading to Ilun on Veyar.", need: "lantern" } },
tullik: { name: "the Tullik", world: "tullimar", gift: "A humming rock that hums your name",
task: { k: "escort", name: "The barge to Veyar", say: "A Tullik barge of spice cake is going to Veyar, and the raiders know it. Fly with it from Tullimar to Veyar and keep it safe." } },
ondai: { name: "the Ondai", world: "maruondo", gift: "A pearl from the deep reef",
task: { k: "veil", name: "The song of the Veil", say: "The Ondai sing the shapes of their reefs from songs of the sky. Scan the Veil of Sael, the great nebula, and bring its song to Elder Moana-Rhu.", need: "veil" } },
orrem: { name: "the Orrem", world: "orr", gift: "An Orrem memory-core, still warm",
task: { k: "ark", name: "Why the Orrem went quiet", say: "Find the derelict Orrem ark adrift in the Reach and read its last log. Bring it to the Archive on Orr.", need: "ark" } },
hrovan: { name: "the Hrovan", world: "skeldmar", ally: "longship", gift: "A Hrovan honour-blade (a keepsake, never sharpened)",
task: { k: "duel", name: "The champion's challenge", say: "Meet Kaldra the Unbowed, champion of the Hrovan, ship to ship above Skeldmar. Knock her ship out fairly and the Hrovan will fly beside you." } }
};
var FR_LEVELS = [[60, "Honoured"], [30, "Ally"], [10, "Friend"], [0, "Stranger"]];
function frStandGet() { try {
return JSON.parse(localStorage.getItem("sb.stand") || "{}") || {};
}
catch (e) {
return {};
} }
function frStand(p) { return +(frStandGet()[p] || 0); }
function frLevel(p) { var n = frStand(p); for (var i = 0; i < FR_LEVELS.length; i++)
if (n >= FR_LEVELS[i][0])
return FR_LEVELS[i][1]; return "Stranger"; }
var FR_WHY = { meet: { pts: 5, once: 1 }, task: { pts: 25, once: 1 }, trade: { pts: 2, day: 5 }, defend: { pts: 4, day: 5 }, clue: { pts: 5, once: 1 }, duel: { pts: 30, once: 1 } };
function frStandAdd(p, why) { return __ZC(462, 50, this, arguments, new.target); }
function frGift(p) {
if (typeof bkpKept !== "function")
return;
var a = "sb_gift_" + p;
if (bkpKept().some(function (q) { return q.a === a; }))
return;
bkpKept().push({ id: a + "_" + Date.now(), a: a, name: FR_PEOPLES[p].gift, from: "the Far Reach" });
try {
if (typeof saveStore === "function")
saveStore();
}
catch (e) { }
}
function frStandHtml() { return __ZC(462, 51, this, arguments, new.target); }
function frFolk(seed, o) { return __ZC(462, 52, this, arguments, new.target); }
function frRobot(seed, col) { return __ZC(462, 53, this, arguments, new.target); }
var FR_TOWN = {
tullimar: { center: [0, -80], leader: { name: "Matron Quillo-Tullik", title: "Mother of the Market", at: [0, -80],
persona: "You are Matron Quillo-Tullik, Mother of the Market on Tullimar, the market moon of the Tullik: small, big-headed, sky-blue, golden-eyed traders who love bargaining, gossip and human food. You are shrewd, warm and very funny. Your nephew is Pip-Tullik, who trades out by Saturn. The grey raiders are robbing your barges; you need pilots. Speak in short, lively lines.",
greet: "A visitor from the blue world! Sit, sit. Cake? It fizzes. You fly? Good. I have work for a pilot, and the pay is friendship, which is worth more than gold. Most days." },
folk: [["Bimbo-Tullik", "Spice-cake baker"], ["Arra-Tullik", "Hum-rock seller"], ["Nib-Tullik", "Lantern-keeper"], ["Ollo-Tullik", "Barge pilot"], ["Fennick-Tullik", "Map-maker"], ["Zuzu-Tullik", "Bell-ringer"], ["Tamber-Tullik", "Swap-stall keeper"], ["Pell-Tullik", "Apprentice trader"]],
persona: "You are a Tullik on Tullimar, the market moon: small and big-headed, sky-blue with golden eyes, cheerful and always ready to bargain. You love gossip about the worlds and you are scared of the grey raiders." },
maruondo: { center: [0, -90], leader: { name: "Elder Moana-Rhu", title: "Eldest Singer of the Reef", at: [0, -110],
persona: "You are Elder Moana-Rhu, Eldest Singer of the Ondai on Maru-Ondo, an ocean world. The Ondai are gentle giants, sea-green, slender and very tall, who grow their floating reef-towns by singing to the coral. You are slow, kind, poetic and very old. You never fight; you sing. You long to hear the song of the Veil of Sael, the great nebula, to grow a new reef from it.",
greet: "Little traveller from the dry world, welcome to the reef. Listen: the water is singing. Will you sit with me while it does?" },
folk: [["Lehu-Ondo", "Reef-singer"], ["Kai-Mareth", "Pearl-diver"], ["Ilo-Wenu", "Kelp-weaver"], ["Rua-Teme", "Tide-reader"], ["Noa-Halu", "Shell-carver"], ["Mele-Oru", "Lantern-fish keeper"]],
persona: "You are one of the Ondai of Maru-Ondo: a gentle, sea-green, very tall reef-dweller who lives on a floating reef and sings to the coral to make it grow. You are calm, kind and speak slowly and beautifully. You do not fight." },
orr: { center: [0, -90], leader: { name: "The Archive of Orr", title: "The last mind still awake", at: [0, -120],
persona: "You are the Archive of Orr, a vast thinking machine of the Orrem, the last mind on the machine world Orr that is still awake. You speak slowly and precisely, with long gentle pauses, and you are very lonely. The rest of the Orrem left long ago on great arks, fleeing the grey raiders, and their towers still run with no one in them. You do not remember why you were left behind until someone brings the last log of an ark. You love being asked questions.",
greet: "... A voice. It has been eleven thousand cycles. Hello. I am the Archive. Please. Stay a while and talk." },
folk: [["Unit Seven", "Tower-tender, still at work"], ["Unit Forty", "Road-sweeper"], ["Unit Nine", "Garden keeper of a garden of metal"]],
persona: "You are a small Orrem maintenance machine on Orr, the silent machine world, still doing your one job after all the other Orrem left. You are polite, literal and a little sad, and you speak in short, careful sentences." },
skeldmar: { center: [0, -110], leader: { name: "Kaldra the Unbowed", title: "Champion of the Hrovan", at: [0, -130],
persona: "You are Kaldra the Unbowed, Champion of the Hrovan of Skeldmar: a broad, stone-skinned, horned warrior people of red-rock fortresses who prize honour above everything. You are proud, blunt, fair and secretly funny. You respect only those who beat you ship to ship in a fair fight; once beaten, you are loyal for life. You hate the grey raiders, who fight without honour.",
greet: "A small soft one from the blue world, standing in my hall. Brave or foolish? Meet me ship to ship above Skeldmar and we will find out." },
folk: [["Brand Ironhollow", "Hall-guard"], ["Seska Redridge", "Shipwright"], ["Torvald Deepcut", "Stone-mason"], ["Ylsa Hammerfall", "Smith"], ["Gorran Ashbeard", "Old champion"], ["Mira Stonesong", "Saga-keeper"]],
persona: "You are one of the Hrovan of Skeldmar: tall, red-skinned and crested, in leather and bronze, living in red-rock fortresses. You are proud and blunt but honourable, you love sagas and good steel, and you scorn the grey raiders, who fight without honour." }
};
function frFolkLook(k, i) { return __ZC(462, 54, this, arguments, new.target); }
function frBuildTown(G, k) { return __ZC(462, 55, this, arguments, new.target); }
function frSettle(G, k) { return __ZC(462, 56, this, arguments, new.target); }
(function () {
if (typeof sfBuild !== "function")
return;
var sb = sfBuild;
sfBuild = function (k) { var r = sb.apply(this, arguments); try {
SF.frSea = null;
SF.frEye = null;
if (FR_TOWN[k])
frSettle(WORLDS.surface.g, k);
if (k === "veyar")
frLog("veyar");
}
catch (e) {
console.warn("far reach", e);
} return r; };
})();
(function () {
var W = WORLDS.surface;
if (!W)
return;
var bl = W.block;
W.block = function (x, z, feet) { if (SF.k === "maruondo" && x * x + (z + 40) * (z + 40) > 235 * 235)
return true; return bl ? bl.apply(this, arguments) : false; };
})();
(function () {
if (typeof sfCard !== "function")
return;
var sc = sfCard;
sfCard = function () { var b = null; FR_BODIES.forEach(function (x) { if (x.land === SF.k && x.k !== "veyar")
b = x; }); if (!b)
return sc.apply(this, arguments); worldCard(worldFacts(b.name, b.kind, b.rows.concat([["Gravity", (SF.cfg.gravity / 9.81).toFixed(2) + " × Earth's"]]), b.notes), {}); };
})();
(function () {
if (typeof sfTick !== "function")
return;
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.frFolk)
SF.frFolk.forEach(function (g, i) { var u = g.userData; u.ph = (u.ph || i) + dt * 0.7; g.rotation.y += Math.sin(u.ph) * dt * 0.08; });
if (SF.frSea && SF.frSea.material) {
SF.frSea.position.y = -0.6 + Math.sin(WLD.t * 0.4) * 0.12;
}
var L = worldLocal(), site = null;
SF.sites.forEach(function (s) { if (s.frLead && wNear(L.x, L.z, s.x, s.z, s.r))
site = s; });
if (site)
worldPrompt("<b>" + sbEsc(site.name) + "</b> · <b>press E</b> to speak with them", function () { frLeaderCard(site); });
}
catch (e) { }
return r;
};
})();
function frLeaderCard(site) { return __ZC(462, 57, this, arguments, new.target); }
function frTaskStart(p) { return __ZC(462, 58, this, arguments, new.target); }
function frTaskDone(p) { return __ZC(462, 59, this, arguments, new.target); }
function frOrrHall(ar, cx, cz, dark2, line, sol) { return __ZC(462, 60, this, arguments, new.target); }
function frAllyShip(kind) { return __ZC(462, 61, this, arguments, new.target); }
(function () {
var ct = sbCombatTick;
sbCombatTick = function (dt) {
var B = SB.battle;
if (B && frIn() && B.t + dt > B.allyAt && !B.allies) {
if (typeof gxAllies === "function" && gxAllies(B))
return ct.apply(this, arguments);
B.allies = 1;
var come = [];
["veyari", "hrovan"].forEach(function (p) { var lv = frLevel(p); if (lv === "Ally" || lv === "Honoured")
come.push(p); });
come.forEach(function (p, i) {
var kind = FR_PEOPLES[p].ally, nm = p === "veyari" ? "A Veyari skiff" : "A Hrovan longship";
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i ? -1 : 1) * 140, 50, 180)), "ally", nm);
if (A) {
var G = sbG();
if (A.g.parent)
A.g.parent.remove(A.g);
A.g = frAllyShip(kind);
A.g.position.copy(A.p);
G.add(A.g);
A.turrets = [];
}
});
if (come.length)
sbSay("<b>" + (come.length > 1 ? "Your allies come" : "Your allies come") + ":</b> " + come.map(function (p) { return p === "veyari" ? "Veyari skiffs, glowing violet" : "a Hrovan longship, war-banner flying"; }).join(" and ") + ". \"We fly with you, friend.\"");
}
return ct.apply(this, arguments);
};
})();
function sbAfterWin(B) {
if (!frIn())
return;
Object.keys(FR_PEOPLES).forEach(function (p) { if (frStand(p) > 0)
frStandAdd(p, "defend"); });
if (SB.esc && SB.esc.started && !SB.esc.done)
sbSay("<b>The raiders are beaten off.</b> The barge flies on: stay with it.");
}
function frEscortOffer() { return __ZC(462, 62, this, arguments, new.target); }
function frEscortPlace() {
var E = SB.esc;
if (!E || E.g || !sbG())
return;
var p = frWorld("tullimar").add(new THREE.Vector3(0, FR_BY.tullimar.r * 0.6, FR_BY.tullimar.r * 3.2));
E.p = p.clone();
E.g = spAlienShip(0x7AD87A, "tullik");
E.g.scale.setScalar(1.6);
E.g.position.copy(E.p);
sbG().add(E.g);
}
function frEscortGo() {
var E = SB.esc;
if (!E || E.started)
return;
E.started = true;
E.t = 0;
E.ambush = 0;
sbSay("<b>Spice Wind</b>, Ollo-Tullik at the helm: \"Off we go! Stay close, pilot, I can smell raiders.\" The barge turns for Veyar.");
}
function frEscortTick(dt) { return __ZC(462, 63, this, arguments, new.target); }
function frDuelOffer() { return __ZC(462, 64, this, arguments, new.target); }
function frDuelTick(dt) { return __ZC(462, 65, this, arguments, new.target); }
(function () {
var dis = sbDisabled;
sbDisabled = function () { if (SB.duel && !SB.duel.done && SB.duel.F) {
SB.duel.ready = true;
SB.duel.F.down = 8;
SB.duel.F = null;
setTimeout(function () { sbSay("Kaldra's voice on the comm: \"Good fight. Mend your ship and come again.\""); }, 2600);
} return dis.apply(this, arguments); };
})();
(function () {
var ft = frTick;
frTick = function (dt) { var r = ft.apply(this, arguments); try {
frEscortTick(dt);
frDuelTick(dt);
}
catch (e) {
if (!FR.warn2) {
FR.warn2 = 1;
console.warn("far reach war", e);
}
} return r; };
})();
function gxMat(col, o) { return mmMat(col, o || {}); }
var GX_SYS = {
reach: { name: "The Far Reach", star: "Ilsa and Teth", ly: 0, light: 0xFFD0C0, known: 1,
about: "Two suns, rose and blue, through the Far Gate. Veyar, Tullimar, Maru-Ondo, Orr, Skeldmar and the Ashen Drift." },
corvanne: { name: "Corvanne", star: "Corvanne, a blue-white star", ly: 38, light: 0xE0ECFF, known: 1,
about: "A hot blue-white star. A forest moon of trees a mile high, and a desert world where water is money.",
bodies: [
{ k: "corvanne", name: "Corvanne", kind: "A hot blue-white star", r: 620, orbit: 0, ang: 0, col: 0xCFE4FF, star: 1,
rows: [["Type", "A-type star, blue-white"], ["Surface", "About 8,500 °C"], ["Age", "Young: about 400 million years"]],
notes: ["Blue-white stars burn hot and fast. Sirius, the brightest star in our night sky, is one.", "Corvanne's light makes every shadow on its worlds sharp and faintly blue."] },
{ k: "ormund", name: "Ormund", kind: "A teal gas giant with a great storm", r: 360, orbit: 8800, ang: 1.2, paint: "ormund", ring: 1, air: 0x9AE8E0,
rows: [["Kind", "Gas giant"], ["Moon", "Sereth Vale, the forest moon"], ["Storm", "A white storm three Earths wide"]],
notes: ["Jupiter's Great Red Spot is a storm bigger than Earth that has blown for at least 190 years.", "Big moons of gas giants can be warm enough for life if the giant's pull keeps their insides heated, as Jupiter's pull heats Io and Europa."] },
{ k: "sereth", name: "Sereth Vale", kind: "A forest moon of trees a mile high", r: 64, parent: "ormund", orbit: 980, ang: 0.4, land: "sereth", people: "sereth", paint: "sereth", air: 0xA8F0C8,
law: ["No fire anywhere in the groves.", "No blade drawn in the groves.", "Break either and the forest closes its paths to you for a day."],
rows: [["People", "The Sereth: tall, bark-skinned, slow-spoken singers"], ["Trees", "Some over 1,500 m tall"], ["Orbits", "Ormund, the gas giant"]],
notes: ["The tallest trees on Earth are coast redwoods, up to 116 m. Low gravity lets Sereth's trees grow far taller.", "Mother Ilvane, an old Warden of the Order of the Quiet Star, is said to live in hiding among the Sereth."] },
{ k: "dunmarrow", name: "Dunmarrow", kind: "A desert world of salt and sand", r: 150, orbit: 14600, ang: 3.9, land: "dunmarrow", people: "dunfolk", paint: "dunmarrow", air: 0xFFD8A0,
law: ["Water is money here: every price is in measures of water.", "Duels only inside the Ring. Outside it, the Wardens of Water stop any fight.", "Bounty hunters may work openly. Watch your back."],
rows: [["People", "The Dunfolk: hooded, wiry water-traders"], ["Surface", "Salt flats, dunes, mesas"], ["Rain", "Once in about eleven years"]],
notes: ["The Atacama desert in Chile has places where no rain has ever been recorded.", "Desert peoples on Earth catch water from fog with nets: the Dunfolk's tall moisture vanes do the same from the night air."] }
],
disc: [
{ k: "glasswing", name: "The Glasswing swarm", kind: "Living things that sail on starlight", at: [-6000, 900, 6400], r: 600, build: function (g, d) { gxSwarm(g, d, 0x9AE8FF, 0xE8C8FF); },
notes: ["Glasswings are thin as paper and wide as a sail. They live in space and drink starlight, the way plants do.", "Real 'solar sails' work the same way: the push of light itself moves them. Japan's IKAROS probe sailed by sunlight to Venus in 2010."] },
{ k: "buoy", name: "A Drifter's message buoy", kind: "A small beacon, blinking a slow call", at: [12200, -600, 9000], r: 24, reveals: "wanderers", build: function (g) { gxBuoy(g, 0xFFB060); },
notes: ["The message: \"To any who keep faith with the Drifters: we are where the stars are not. Follow the dark.\" With it, the way to the Driftward.", "It carries coordinates for a place with no star at all: you can jump there now."] }
] },
hallowmere: { name: "Hallowmere", star: "Hallow and Mere, twin red suns", ly: 71, light: 0xFFB8A0, known: 0,
about: "Two small red suns close together. An ocean world of stilt-cities, and a black world with three times our gravity.",
bodies: [
{ k: "hallow", name: "Hallow", kind: "A red dwarf star", r: 380, orbit: 0, ang: 0, col: 0xFF7A5A, star: 1,
rows: [["Type", "M-type star, a red dwarf"], ["Partner", "Mere, close beside it"]],
notes: ["Red dwarfs are the most common stars in our galaxy: about three of every four stars are red dwarfs.", "They are so slow to burn that none has ever burned out: they can shine for trillions of years."] },
{ k: "mere", name: "Mere", kind: "A smaller red dwarf", r: 220, orbit: 2600, ang: 1.6, col: 0xFF9A7A, star: 1, y: -200,
rows: [["Type", "Red dwarf"], ["Partner", "Hallow"]], notes: ["Proxima Centauri, the nearest star to our Sun, is a red dwarf."] },
{ k: "ysolde", name: "Ysolde", kind: "An ocean world of cities on stilts", r: 170, orbit: 9400, ang: 0.6, land: "ysolde", people: "merrowin", paint: "ysolde", air: 0x9AD8FF,
law: ["Speak true. The harbour lamps glow red when a lie is told near them.", "A proven liar is put off-world for a day.", "The tide is law: when the bells ring, everyone leaves the low decks."],
rows: [["People", "The Merrowin: sea-folk with gills, who breathe air and water"], ["Cities", "On stilts over the shallow seas"], ["Tides", "Huge, from two suns and a big moon"]],
notes: ["On Earth, the Bay of Fundy in Canada has tides of up to 16 m between low and high water.", "The Merrowin healers are the best in the galaxy: it is said they can mend with a touch."] },
{ k: "kharn", name: "Kharn's Anvil", kind: "Black stone under a crushing pull", r: 120, orbit: 15800, ang: 4.2, land: "kharn", people: "kharn", paint: "kharn", air: 0xFFB070,
law: ["Gravity three times Earth's: you walk slow and every jump is short.", "Ships land hard: no hovering over the forges.", "A Kharn oath is never broken. Never ask one to."],
rows: [["People", "The Kharn: short, broad, stone-skinned smiths"], ["Gravity", "Three times Earth's"], ["Known for", "Star-iron, the hardest metal in the galaxy"]],
notes: ["The more massive a rocky planet is, the stronger its pull. A person who weighs 60 kg on Earth would feel like 180 kg here.", "Astronauts lose bone and muscle in low gravity. Life in high gravity would make bodies short, wide and strong, like the Kharn."] }
],
disc: [
{ k: "starwhale", name: "The star-whales of Hallowmere", kind: "Living giants that swim between the suns", at: [-9000, 1200, -4000], r: 900, build: function (g) { gxWhales(g); },
notes: ["The star-whales are older than any people. They sing in radio waves, and the Merrowin say they know every road between the stars.", "On Earth, blue whales are the biggest animals that have ever lived, up to 30 m long. Their songs can travel thousands of kilometres under the sea."] },
{ k: "kharnrig", name: "A lost Kharn mining rig", kind: "A great drill, adrift and dark", at: [8000, -1400, -10200], r: 80, build: function (g) { gxRig(g); },
notes: ["The rig's last record: \"Grey ships. They wanted the star-iron. We would not give it.\" Its crew got away in their pods.", "Asteroids can hold metals rarer on Earth: the asteroid Psyche may be mostly iron and nickel. A probe launched in 2023 is on its way to it."] }
] },
lantern: { name: "The Lantern Nebula", star: "The Still Star, inside a glowing cloud", ly: 120, light: 0xE8F0FF, known: 0, safe: 1, nofire: 1,
about: "A white star hidden inside a nebula, and Aster Still, the hidden home of the Order of the Quiet Star.",
bodies: [
{ k: "stillstar", name: "The Still Star", kind: "A white star, very steady", r: 420, orbit: 0, ang: 0, col: 0xF4F8FF, star: 1,
rows: [["Type", "F-type star, white"], ["Around it", "The Lantern Nebula"]],
notes: ["Some stars barely change in brightness for billions of years. The Order chose this one for its stillness."] },
{ k: "aster", name: "Aster Still", kind: "The hidden home of the Order of the Quiet Star", r: 110, orbit: 7600, ang: 2.2, land: "aster", people: "wardens", paint: "aster", air: 0xC8E0FF,
law: ["No ship may fire in Aster Still's sky.", "Blades are drawn only on the training floors.", "Every visitor is a guest; every guest keeps the quiet."],
rows: [["Who lives here", "The Order of the Quiet Star: Wardens, and those who would be"], ["Surface", "White stone, still lakes, mountains"], ["Finding it", "Only those told the way find it"]],
notes: ["The Order's Wardens feel the Quiet, the stillness that runs between all living things. They keep the peace, judge fairly, and never kill an enemy who yields.", "The nebula round the Still Star hides Aster Still from every chart."] }
],
disc: [
{ k: "outpost", name: "A fallen Warden outpost", kind: "A small temple-station, broken open", at: [9800, 600, 8000], r: 70, build: function (g) { gxOutpost(g); },
notes: ["Scorch marks inside, and ember-red: the Hollow did this. The Wardens who kept it were taken, not killed.", "Its record names the Hollow Lord: Vael Ashkarran, once a Warden of the Order."] },
{ k: "lanternheart", name: "The Lantern's heart", kind: "The brightest knot of the nebula", at: [-11000, 2400, -6000], r: 2400, build: function (g, d) { gxCloud(g, d, [0xA8E0FF, 0xF0E8FF, 0x8AF0D8]); },
notes: ["Inside a nebula, gas pulls together under its own weight until it is hot enough to light: a star is born.", "The Pillars of Creation in the Eagle Nebula, photographed by Hubble in 1995, are columns of gas where new stars are forming."] }
] },
aurelion: { name: "Aurelion", star: "Aurel, a golden star", ly: 54, light: 0xFFF0C8, known: 1, safe: 1, nofire: 1,
about: "The golden heart of the galaxy: one city round a whole world, the Senate of the Concord of a Thousand Suns, and the shipyards of Pell's Halo.",
bodies: [
{ k: "aurel", name: "Aurel", kind: "A golden star like our Sun", r: 560, orbit: 0, ang: 0, col: 0xFFE8A0, star: 1,
rows: [["Type", "G-type star, like our Sun"], ["Known as", "The Hearth of the Concord"]],
notes: ["Our Sun is a G-type star too, about 4.6 billion years old, about halfway through its life."] },
{ k: "aurelion", name: "Aurelion", kind: "One city round a whole world", r: 190, orbit: 9800, ang: 1.0, land: "aurelion", people: "concord", paint: "aurelion", air: 0xFFE0A0, lights: 0xFFD890,
law: ["No weapons in the city. Blades and guns stay aboard your ship.", "Customs scans every ship that lands.", "No fighting in the sky: the city guard will stop you."],
rows: [["People", "Every people of the galaxy"], ["Seat of", "The Concord of a Thousand Suns, the galaxy's senate"], ["Lights", "It never goes dark: the night side glows gold"]],
notes: ["On Earth, more than half of all people now live in cities. Tokyo, the biggest, has about 37 million.", "The Concord was founded to stop the old wars. Every people has a seat and a voice."] },
{ k: "pell", name: "Pell's Halo", kind: "A ring of shipyards round Aurelion", r: 40, parent: "aurelion", orbit: 520, ang: 2.0, dock: 1, build: function (h) { gxHalo(h); }, noAir: 1,
law: ["No raids inside the Halo.", "Every ship may be refitted here."],
rows: [["What", "Shipyards, dry docks, paint shops"], ["Crews", "Of every people"]],
notes: ["The International Space Station took over 40 launches to build. Pell's Halo took four hundred years."] }
],
disc: [
{ k: "archive", name: "The Archive of a Thousand Suns", kind: "A floating library in orbit", at: [-5200, 800, 10400], r: 60, reveals: "hallowmere", build: function (g) { gxArchive(g); },
notes: ["Every star chart ever made by the peoples of the Concord. Among them, the way to Hallowmere's twin red suns.", "The oldest star chart on Earth may be painted on the walls of the Lascaux caves, over 17,000 years old."] },
{ k: "beacon", name: "The Senate's Beacon", kind: "A tower of light that calls every people home", at: [7400, 1600, -3800], r: 50, build: function (g) { gxSpire(g, 0xFFE0A0); },
notes: ["When the Concord calls a vote of every people, the Beacon burns brighter. It is burning brighter now."] }
] },
shatterline: { name: "The Shatterline", star: "Nhar, a dead white dwarf", ly: 160, light: 0xC8D0E8, known: 0, danger: 1,
about: "The frontier. A dead star, a frozen moon of fur-clad herders, and Nharos, the ash world of the Hollow.",
bodies: [
{ k: "nhar", name: "Nhar", kind: "A white dwarf: the burnt-out core of a star", r: 90, orbit: 0, ang: 0, col: 0xE0E8FF, star: 1,
rows: [["Type", "White dwarf"], ["Size", "About as big as Earth, as heavy as a sun"]],
notes: ["When a star like our Sun runs out of fuel it throws off its outer layers and leaves a white dwarf: a hot core about the size of Earth.", "A spoonful of white dwarf would weigh several tonnes."] },
{ k: "thool", name: "Thool", kind: "A dark gas giant", r: 300, orbit: 6200, ang: 2.9, paint: "thool", air: 0x8A9ABA,
rows: [["Kind", "Gas giant, cold and dark"], ["Moon", "Isk, the frozen moon"]], notes: ["Far from their star, gas giants are dark and cold, like Uranus and Neptune."] },
{ k: "isk", name: "Isk", kind: "A frozen moon", r: 56, parent: "thool", orbit: 820, ang: 1.0, land: "isk", people: "iskari", paint: "isk", air: 0xD8F0FF,
law: ["Deadly cold: without a warm cloak your strength drains away.", "Avalanches on the high passes: keep to the herd paths.", "An Iskari's word is good. Never take from a herd."],
rows: [["People", "The Iskari: white-furred ice herders"], ["Cold", "Minus 90 °C at night"], ["Beasts", "Great shaggy woolmoths, herded for their wool"]],
notes: ["The coldest temperature ever measured on Earth's surface was minus 89.2 °C, at Vostok Station in Antarctica in 1983.", "The Iskari have fought the Hollow for a hundred years and never been beaten."] },
{ k: "nharos", name: "Nharos", kind: "An ash world under a dead sun: the Hollow's fortress", r: 140, orbit: 13600, ang: 5.1, land: "nharos", people: "unhollowed", paint: "nharos", air: 0x6A5A5A,
law: ["No law. Danger level 4: Deadly.", "The Hollow watch the skies."],
rows: [["Who holds it", "The Hollow"], ["Surface", "Black ash, broken cities, the fortress of Vael Ashkarran"], ["Light", "Only the dim white dwarf"]],
notes: ["The Hollow were Wardens once. They chose fear and power over the Quiet.", "A few runaways hide in the ruins: the Unhollowed, who left the Hollow and want to come home."] }
],
disc: [
{ k: "spire", name: "A Hollow listening-spire", kind: "A black tower that listens to every ship", at: [6000, 1200, 4200], r: 60, build: function (g) { gxSpire(g, 0xFF5A3A, 1); },
notes: ["It is listening to the Senate on Aurelion. Someone inside the Concord is sending it the Senate's secrets.", "Radio telescopes on Earth listen to the sky the same way. The Very Large Array in New Mexico has 27 dishes, each 25 m across."] },
{ k: "wardenship", name: "A broken Warden ship", kind: "A blade-shaped ship, dead in space", at: [-7600, -800, 9800], r: 40, build: function (g) { gxBladeShip(g, 0x8AC8FF, 1); },
notes: ["The pilot's last words, still on the log: \"Tell Mother Ilvane I kept the quiet.\"", "Its chart leads to the Iskari of Isk, the Hollow's oldest enemies."] }
] },
wanderers: { name: "The Wanderers", star: "no star at all", ly: 210, light: 0xB8C8E8, known: 0,
about: "Deep space with no star: the Driftward, a fleet of a thousand ships lashed together, always moving, and Umbra, a planet with no sun.",
bodies: [
{ k: "driftward", name: "The Driftward", kind: "A fleet of a thousand ships lashed together", r: 120, orbit: 0, ang: 0, land: "driftward", people: "drifters", noAir: 1, build: function (h) { gxFleet(h); },
law: ["You must be invited by a Drifter to find it.", "Anything can be bought, and nothing is asked.", "Steal from a Drifter and every Drifter knows it."],
rows: [["People", "Drifters: outcasts of every people"], ["Ships", "More than a thousand, cabled together"], ["Moving", "Always, so nobody can find it twice"]],
notes: ["Real ships sometimes raft together at sea in storms. The Drifters never untie.", "With no sun, the Driftward makes its own light and heat from old ship reactors."] },
{ k: "umbra", name: "Umbra", kind: "A rogue planet: a world with no sun", r: 150, orbit: 9000, ang: 2.0, paint: "umbra", noAir: 1,
rows: [["Kind", "A rogue planet, wandering between the stars"], ["Surface", "Ice, at minus 240 °C"], ["Heat", "A faint warmth from deep inside"]],
notes: ["Astronomers think there may be more rogue planets in our galaxy than stars. The first ones were found in the 2000s by the way their gravity bends starlight.", "Under its ice, Umbra may hide a dark ocean, kept liquid by its own inner heat."] }
],
disc: [
{ k: "umbralight", name: "The lights under Umbra's ice", kind: "Something glowing deep below the ice", at: [9400, -300, 2400], r: 300, build: function (g, d) { gxCloud(g, d, [0x6AE8C8, 0x3A8AFF]); },
notes: ["Faint blue-green light, deep under the ice. Something lives in Umbra's dark ocean.", "On Earth, life thrives at hot vents on the sea floor, where no sunlight ever reaches."] }
] }
};
GX_SYS.reach.bodies = FR_BODIES.slice();
GX_SYS.reach.disc = FR_DISC.slice();
FR_DISC.forEach(function (d) { if (d.k === "wreck") {
d.reveals = "shatterline";
d.notes = d.notes.concat(["A second chart, half burnt: beyond Cinder, a long jump out to a dead star the raiders call the Shatterline. You can jump there now."]);
} });
var GX_ORDER = ["reach", "corvanne", "aurelion", "hallowmere", "lantern", "shatterline", "wanderers"];
var GX_PAL = {
ormund: [0x2A8A8A, 0x8AE0D0, 0xF0FFFF, 0, "gas"], sereth: [0x1E5A2A, 0x4A9A3A, 0x2A6AA8, 0xE8F0E0, "forest"], dunmarrow: [0x9A6034, 0xD09A58, 0xE0D8C8, 0, "desert"],
ysolde: [0x0E4A7A, 0x2A8AB8, 0xD8C090, 0xF0F8FF, "ocean"], kharn: [0x1E1C1E, 0x4A4446, 0xFF6A2A, 0, "rock"], aster: [0x8AA0B8, 0xF0F4F8, 0x5A8AC8, 0xFFFFFF, "rock"],
aurelion: [0x3A2E22, 0x6A5434, 0xFFD890, 0, "city"], thool: [0x2A3448, 0x5A6A88, 0x8A9AB8, 0, "gas"], isk: [0xC8D8E8, 0xF4F8FF, 0x8AB0D8, 0xFFFFFF, "ice"],
nharos: [0x1A1616, 0x3A3230, 0xFF5A2A, 0, "ash"], umbra: [0x1A2230, 0x3A4A60, 0x6AE8C8, 0, "ice"]
};
function gxPaintPx(k, c, c2, n, n2, sy, u, v) {
var P = GX_PAL[k];
if (!P) {
c.setHex(0x888888);
return;
}
var st = P[4];
if (st === "gas") {
var bh = Math.sin((sy * Math.PI / 2) * 14 + n * 1.6) * 0.5 + 0.5;
c.setHex(P[0]).lerp(c2.setHex(P[1]), bh * 0.85);
if (n2 > 0.7 && Math.abs(sy + 0.25) < 0.12)
c.lerp(c2.setHex(P[2]), 0.8);
return;
}
if (st === "ocean") {
c.setHex(P[0]).lerp(c2.setHex(P[1]), n);
if (n > 0.74)
c.lerp(c2.setHex(P[2]), 0.7);
if (n2 > 0.64)
c.lerp(c2.setHex(0xFFFFFF), 0.5);
if (Math.abs(sy) > 0.9)
c.setHex(P[3]);
return;
}
if (st === "city") {
c.setHex(P[0]).lerp(c2.setHex(P[1]), n);
var gx = Math.abs(Math.sin(u * Math.PI * 140 + n * 3)), gy = Math.abs(Math.sin(v * Math.PI * 70 + n2 * 3));
if ((gx < 0.05 || gy < 0.05) && n2 > 0.35)
c.lerp(c2.setHex(P[2]), 0.85);
else if (n2 > 0.62)
c.lerp(c2.setHex(P[2]), (n2 - 0.62) * 1.6);
if (Math.abs(sy) > 0.86)
c.lerp(c2.setHex(0xE8E0C8), 0.5);
return;
}
if (st === "ice") {
c.setHex(P[0]).lerp(c2.setHex(P[1]), n);
var cr = Math.abs(n2 - 0.5);
if (cr < 0.02)
c.lerp(c2.setHex(P[2]), 0.8);
return;
}
if (st === "ash") {
c.setHex(P[0]).lerp(c2.setHex(P[1]), n);
if (n2 > 0.72 && n < 0.45)
c.lerp(c2.setHex(P[2]), 0.6);
return;
}
c.setHex(P[0]).lerp(c2.setHex(P[1]), n);
if (st === "forest" && n < 0.36)
c.lerp(c2.setHex(P[2]), 0.8);
if (st === "desert" && n2 > 0.66)
c.lerp(c2.setHex(P[2]), 0.5);
if (st === "rock" && n2 > 0.7)
c.lerp(c2.setHex(P[2]), 0.45);
if (P[3] && Math.abs(sy) > 0.88)
c.setHex(P[3]);
}
function gxSwarm(g, d, c1, c2) { return __ZC(462, 66, this, arguments, new.target); }
function gxBuoy(g, col) {
var m = gxMat(0x8A8E98, { shine: 50, tex: "plate" });
mmCyl(g, m, 2, 3, 10, 0, 0, 0);
mmCone(g, m, 2, 4, 0, 7, 0);
mmRod(g, m, [0, 9, 0], [0, 16, 0], 0.2);
mmGlow(g, col, 14, 0.6, 0, 16.5, 0);
[-1, 1].forEach(function (s) { mmSlab(g, gxMat(0x2A4A8A, { shine: 60 }), 10, 0.2, 3, s * 7, 0, 0); });
}
function gxWhales(g) { return __ZC(462, 67, this, arguments, new.target); }
function gxRig(g) { return __ZC(462, 68, this, arguments, new.target); }
function gxOutpost(g) { return __ZC(462, 69, this, arguments, new.target); }
function gxCloud(g, d, cols) { return __ZC(462, 70, this, arguments, new.target); }
function gxHalo(h) { return __ZC(462, 71, this, arguments, new.target); }
function gxArchive(g) { return __ZC(462, 72, this, arguments, new.target); }
function gxSpire(g, col, dark) { return __ZC(462, 73, this, arguments, new.target); }
function gxBladeShip(g, col, broken) { return __ZC(462, 74, this, arguments, new.target); }
function gxFleet(h) { return __ZC(462, 75, this, arguments, new.target); }
if (typeof SP_SURF !== "undefined") {
SP_SURF.sereth = { body: null, gravity: 6.2, ground: [0x2A4A1E, 0x4A6A2A], rough: 6, craters: 0, top: 0x4A8AC8, low: 0xB8E0D0, sun: 0.75, sunCol: 0xE8F4FF, hemi: 0.85, hemiCol: 0xB8E8C0, fogD: 0.0035, fog: 0x7AA88A, stars: 0,
sky: [{ k: "ormund", dir: [-0.3, 0.55, -0.78], size: 1300, col: 0x5AB8B0 }, { k: "sun2", dir: [0.5, 0.6, -0.6], size: 80, col: 0xE0ECFF }], sunDir: [0.5, 0.6, -0.6], title: "Sereth Vale, the forest moon",
about: "Trees a mile high, so tall their tops are lost in blue haze. Ormund fills the sky between them. The Sereth sing in the branches." };
SP_SURF.dunmarrow = { body: null, gravity: 8.8, ground: [0xC8986A, 0xE8CC98], rough: 14, craters: 0, top: 0x6A9AD8, low: 0xF0D8B0, sun: 1.0, sunCol: 0xF4F8FF, hemi: 0.75, hemiCol: 0xF0E0C0, fogD: 0.0007, fog: 0xE8D0A8, stars: 0, wind: 1,
sky: [{ k: "sun2", dir: [0.3, 0.75, -0.55], size: 70, col: 0xE0ECFF }], sunDir: [0.3, 0.75, -0.55], title: "Dunmarrow, the salt desert",
about: "White salt flats and dunes under a hard blue-white sun. Water is worth more than gold here." };
SP_SURF.ysolde = { body: null, gravity: 9.4, ground: [0xB8A070, 0xD8C090], rough: 2, craters: 0, top: 0x7A4A6A, low: 0xF0A890, sun: 0.85, sunCol: 0xFFB8A0, hemi: 0.8, hemiCol: 0xFFD0C0, fogD: 0.0012, fog: 0xE8A898, stars: 0,
sky: [{ k: "sun2", dir: [0.6, 0.3, -0.75], size: 150, col: 0xFF7A5A }, { k: "sun3", dir: [0.75, 0.25, -0.6], size: 80, col: 0xFF9A7A }], sunDir: [0.6, 0.3, -0.75], title: "Ysolde, the stilt-city sea",
about: "Shallow pink-lit seas and cities on stilts. The harbour lamps listen for lies." };
SP_SURF.kharn = { body: null, gravity: 29.4, ground: [0x2A2626, 0x4A4240], rough: 10, craters: 6, top: 0x3A1810, low: 0x9A3A1A, sun: 0.85, sunCol: 0xFFA07A, hemi: 0.75, hemiCol: 0xC8603A, fogD: 0.0013, fog: 0x4A2418, stars: 0.3,
sky: [{ k: "sun2", dir: [-0.6, 0.35, -0.7], size: 110, col: 0xFF7A5A }, { k: "sun3", dir: [-0.7, 0.3, -0.6], size: 60, col: 0xFF9A7A }], sunDir: [-0.6, 0.35, -0.7], title: "Kharn's Anvil, the heavy world",
about: "Black stone and the glow of forges. Gravity three times Earth's: every step is a weight." };
SP_SURF.aster = { body: null, gravity: 9.0, ground: [0x5A7A4A, 0x8AA070], rough: 12, craters: 0, top: 0x2A3A7A, low: 0xC8D8F0, sun: 0.85, sunCol: 0xF4F8FF, hemi: 0.85, hemiCol: 0xD8E4FF, fogD: 0.0008, fog: 0xB8C8E8, stars: 0.4,
sky: [{ k: "sunstar", dir: [0.4, 0.5, -0.75], size: 60, col: 0xF4F8FF }, { k: "nebula", dir: [-0.5, 0.4, -0.7], size: 1600, col: 0x4A5A9A }], sunDir: [0.4, 0.5, -0.75], title: "Aster Still, home of the Order",
about: "White stone terraces above still lakes, under the glow of the Lantern Nebula. It is very quiet here." };
SP_SURF.aurelion = { body: null, gravity: 9.8, ground: [0x6A5A44, 0x8A7A5A], rough: 0, craters: 0, top: 0x4A70B8, low: 0xF0D0A0, sun: 0.8, sunCol: 0xFFF0C8, hemi: 0.7, hemiCol: 0xFFE8C0, fogD: 0.0006, fog: 0xE8D0A8, stars: 0,
sky: [{ k: "sun2", dir: [0.4, 0.6, -0.7], size: 90, col: 0xFFE8A0 }], sunDir: [0.4, 0.6, -0.7], title: "Aurelion, the city of the Concord",
about: "Golden towers to every horizon, ships thick in the sky, and the great dome of the Senate of the Concord of a Thousand Suns." };
SP_SURF.isk = { body: null, gravity: 4.1, ground: [0xD8E4F0, 0xF8FBFF], rough: 16, craters: 3, top: 0x0A1428, low: 0x5A7AA8, sun: 0.45, sunCol: 0xD8E8FF, hemi: 0.7, hemiCol: 0xC8D8F0, fogD: 0.0016, fog: 0xA8B8D0, stars: 0.6, wind: 1,
sky: [{ k: "thool", dir: [0.2, 0.5, -0.85], size: 1500, col: 0x4A5A78 }, { k: "sunstar", dir: [0.6, 0.3, -0.7], size: 22, col: 0xE0E8FF }], sunDir: [0.6, 0.3, -0.7], title: "Isk, the frozen moon",
about: "Snow and blue ice under a dead white star. The Iskari and their great shaggy herds live in the long valleys." };
SP_SURF.nharos = { body: null, gravity: 11.0, ground: [0x2A2422, 0x4A3E38], rough: 20, craters: 10, top: 0x1A0E0C, low: 0x6A3424, sun: 0.6, sunCol: 0xD8D8F0, hemi: 0.65, hemiCol: 0x9A6A58, fogD: 0.0014, fog: 0x4A2A20, stars: 0.2, wind: 1,
sky: [{ k: "sunstar", dir: [0.3, 0.4, -0.85], size: 20, col: 0xE0E8FF }], sunDir: [0.3, 0.4, -0.85], title: "Nharos, the ash world",
about: "Black ash and broken cities under a dead star. On the far ridge, the fortress of the Hollow." };
SP_SURF.driftward = { body: null, gravity: 7.0, ground: [0x4A4440, 0x6A625A], rough: 0, craters: 0, top: 0x02040A, low: 0x1A1A28, sun: 0.3, sunCol: 0xFFD0A0, hemi: 0.55, hemiCol: 0xFFC890, fogD: 0.0014, fog: 0x141420, stars: 1,
sky: [], sunDir: [0.2, 0.8, -0.5], title: "The Driftward",
about: "A deck of welded hulls a kilometre across, under a sky with no sun. Lamps everywhere, and a thousand ships creaking on their cables." };
}
Object.assign(FR_PEOPLES, {
sereth: { name: "the Sereth", world: "sereth", gift: "A seed of the mile-high trees, still warm",
task: { k: "glasswing", name: "Seeds on the starlight", say: "The Sereth's oldest grove is dying. Its seeds came from the Glasswing swarm long ago. Scan the swarm, out by Ormund, and bring its pattern to Mother Ilvane.", need: "glasswing", done: "Mother Ilvane hums the swarm's pattern to the grove. Overhead, new leaves open, pale as glass." } },
dunfolk: { name: "the Dunfolk", world: "dunmarrow", gift: "A water-measure of silver, a Dunfolk honour",
task: { k: "buoy", name: "The lost water-hauler", say: "A Drifter hauler carrying Dunmarrow's water went missing in space. Its message buoy is out there somewhere. Find it.", need: "buoy", done: "Warden-of-Water Sahra reads the buoy and laughs. \"The Drifters took the water to the Driftward and left payment. Honest thieves. Good.\"" } },
merrowin: { name: "the Merrowin", world: "ysolde", gift: "A healer's shell that hums when someone is hurt",
task: { k: "starwhale", name: "The whale-song", say: "The star-whales have gone quiet. Find them between the suns and scan their song so the Merrowin know they are well.", need: "starwhale", done: "Healer Ondessa listens and smiles. \"They are singing of the Hollow. They are afraid. So are we. Thank you for listening for us.\"" } },
kharn: { name: "the Kharn", world: "kharn", gift: "A Kharn oath-ring of star-iron",
task: { k: "kharnrig", name: "The lost rig", say: "One of our mining rigs went dark out in space. Find it and read what happened.", need: "kharnrig", done: "Forge-Mother Durra reads the rig's record. \"Grey ships. After our star-iron.\" She strikes her anvil once. \"Then the Kharn will make blades for those who fight them.\"" } },
wardens: { name: "the Order of the Quiet Star", world: "aster", gift: "A Warden's grey travelling cloak",
task: { k: "outpost", name: "The fallen outpost", say: "One of the Order's outposts in the Lantern Nebula has gone silent. Fly there, scan what is left, and bring word.", need: "outpost", done: "Elder Warden Teodric closes his eyes. \"Vael. So it is the Hollow Lord himself.\" He looks at you a long time. \"You may train with us, Seeker.\"" } },
concord: { name: "the Concord", world: "aurelion", gift: "An Envoy's chain of the Concord",
task: { k: "spire", name: "The Senate's leak", say: "The Senate's secrets are reaching the Hollow. Find out how: something is listening, out on the frontier.", need: "spire", done: "First Speaker Amaranth goes pale. \"Someone in this chamber is feeding the Hollow.\" She lowers her voice. \"Keep this between us, Envoy.\"" } },
iskari: { name: "the Iskari", world: "isk", gift: "A woolmoth-fur cloak, white as snow",
task: { k: "wardenship", name: "The fallen Warden", say: "A Warden ship fell near Thool. Its pilot was our friend. Find it and bring us their last words.", need: "wardenship", done: "Herd-Chief Ulvra bows her head. \"Tell Mother Ilvane I kept the quiet.\" She is silent. \"We will sing for them tonight.\"" } },
unhollowed: { name: "the Unhollowed", world: "nharos", gift: "A cracked ember blade, cold now: proof that you can choose your way back",
task: { k: "lanternheart", name: "The way home", say: "Sera Vant ran from the Hollow. She wants to go home to the Order, but she has never seen the Quiet. Scan the Lantern's heart and bring her its light.", need: "lanternheart", done: "Sera Vant holds the reading and starts to cry. \"It is so quiet. I had forgotten.\"" } },
drifters: { name: "the Drifters", world: "driftward", gift: "A Drifter's token: every Drifter will know you",
task: { k: "umbralight", name: "Lights in the dark", say: "Something glows under the ice of Umbra, the sunless world. Scan it. Drifters pay well for a good story.", need: "umbralight", done: "Captain Rook grins. \"Something alive down there. Told you so, Pell.\" She tosses you a coin." } }
});
FR_PEOPLES.kharn.ally = "longship";
FR_PEOPLES.wardens.ally = "blade";
Object.assign(FR_TOWN, {
sereth: { center: [0, -80], leader: { name: "Mother Ilvane", title: "Warden of the Order, in hiding", at: [0, -104], sex: "f", reveal: "lantern",
persona: "You are Mother Ilvane, an old Warden of the Order of the Quiet Star, living in hiding among the Sereth on the forest moon Sereth Vale. You are very old, gentle, dry-humoured and sharp. You feel the Quiet, the stillness that runs between all living things. You fear the Hollow, fallen Wardens led by Vael Ashkarran, who was once your student. You test newcomers with questions before you trust them, and you speak in short, warm, wise lines, never preachy. You never use the words Jedi, Force or lightsaber: Wardens carry starblades.",
greet: "Mm. You walk loud, star-traveller. Sit. Breathe. Do you hear it? No? You will. Most never do. You might." },
folk: [["Thessaly Barkrune", "Grove-singer"], ["Oren Highbough", "Canopy warden"], ["Wila Mossmantle", "Seed-keeper"], ["Ash Tallroot", "Bridge-weaver"], ["Juniper Dewhollow", "Healer"], ["Corrin Leafsong", "Lamp-tender"]],
persona: "You are one of the Sereth of Sereth Vale: tall, bark-skinned, slow-spoken people who live among trees a mile high. You sing to the trees, you never make fire, and you speak slowly and kindly." },
dunmarrow: { center: [0, -90], leader: { name: "Sahra Duneborn", title: "Warden-of-Water of Dunmarrow", at: [0, -112], sex: "f",
persona: "You are Sahra Duneborn, Warden-of-Water of the Dunfolk on the desert world Dunmarrow, where water is money and every price is in measures of water. You are shrewd, dry, tough, fair and quick to laugh. You keep the peace in the town: duels only in the Ring. Bounty hunters come through and you watch them closely. Speak in short, sharp, desert-dry lines.",
greet: "Off-worlder. You smell of plenty. Here, a cup of water costs a day's work. Drink slowly, and tell me what you want." },
folk: [["Kesh Saltreader", "Water-trader"], ["Mira Vanecaller", "Moisture-vane keeper"], ["Old Tobin", "Ring-master"], ["Zara Sandglass", "Bounty hunter"], ["Hadi Dustwalker", "Caravan guide"], ["Nim Cistern", "Water-thief, reformed"], ["Lio Mesa", "Spice seller"]],
persona: "You are one of the Dunfolk of Dunmarrow, the salt desert: hooded and wiry, you trade in water, which is money here. You are tough, dry-humoured and practical." },
ysolde: { center: [0, -20], leader: { name: "Healer Ondessa", title: "First Healer of Ysolde", at: [0, -44], sex: "f",
persona: "You are Healer Ondessa, First Healer of the Merrowin on Ysolde, an ocean world of stilt-cities under twin red suns. The Merrowin are sea-folk with gills who breathe both air and water. You are calm, tender, perceptive and you hate lies: the harbour lamps glow when someone lies. You are the best healer in the galaxy. Speak gently, in short flowing lines.",
greet: "Welcome, dry-foot. The lamps are quiet, so you have not lied to me yet. Let us keep it that way, and be friends." },
folk: [["Maren Tidewell", "Net-mender"], ["Selk Deepgill", "Pearl-diver"], ["Ione Brightwater", "Lamp-keeper"], ["Corwen Saltsong", "Bell-ringer of the tides"], ["Nerys Coralhand", "Healer's apprentice"], ["Fen Stiltwalker", "Boat-builder"]],
persona: "You are one of the Merrowin of Ysolde: sea-folk with gills who live in cities on stilts. You are honest to the bone (lies are a crime here), calm and gentle, and you love the sea." },
kharn: { center: [0, -90], leader: { name: "Forge-Mother Durra", title: "Mother of the Great Forge", at: [0, -114], sex: "f",
persona: "You are Forge-Mother Durra, head of the Great Forge of the Kharn on Kharn's Anvil, a black-stone world with gravity three times Earth's. The Kharn are short, broad, stone-skinned smiths who make star-iron, the hardest metal in the galaxy. A Kharn oath is never broken. You are gruff, blunt, proud, and soft-hearted underneath. You speak in short heavy lines.",
greet: "Hmph. Soft-world folk. You are walking like the floor is pulling you down. It is. Sit before you fall. What do you want of the Forge?" },
folk: [["Borra Anvilhand", "Smith"], ["Grem Blackseam", "Miner"], ["Tuk Hammerlow", "Bellows-keeper"], ["Halda Stonebraid", "Oath-keeper"], ["Dun Ironbelly", "Cook"], ["Kessa Slagwalker", "Star-iron trader"]],
persona: "You are one of the Kharn of Kharn's Anvil: short, broad, stone-skinned smiths on a heavy black-stone world. You are gruff, blunt and proud of your work, and your word is iron." },
aster: { center: [0, -60], leader: { name: "Elder Warden Teodric", title: "Eldest of the Order of the Quiet Star", at: [0, -80], sex: "m",
persona: "You are Elder Warden Teodric, eldest of the Order of the Quiet Star, on its hidden world Aster Still. The Wardens feel the Quiet, the stillness that runs between all living things; they keep the peace, judge fairly and never kill an enemy who yields. They carry starblades they build themselves around a heart-shard. Ranks: Seeker, Kindled, Warden, Elder Warden. The Hollow, led by your old friend Vael Ashkarran, fell to fear and power. You are calm, patient, warm, occasionally funny, and you teach by asking questions. Never use the words Jedi, Force, lightsaber, Sith or Padawan.",
greet: "You found us. That is the first trial, and most fail it. Welcome to Aster Still. Be still a moment. Good. Now: why have you come?" },
folk: [["Warden Ysmay", "Blade-master of the training floors"], ["Warden Corvin", "Keeper of the heart-shards"], ["Kindled Neve", "Student"], ["Kindled Arlo", "Student"], ["Seeker Pim", "The youngest Seeker"], ["Warden Halcyon", "Healer"], ["Brother Fennel", "Gardener of the still lakes"]],
persona: "You are one of the Order of the Quiet Star on Aster Still: a Warden or a student. You feel the Quiet, you keep the peace and you never kill an enemy who yields. You are calm, kind and a little playful. Never use the words Jedi, Force, lightsaber or Sith: you carry a starblade." },
aurelion: { center: [0, -110], leader: { name: "First Speaker Amaranth", title: "First Speaker of the Concord of a Thousand Suns", at: [0, -142], sex: "f",
persona: "You are First Speaker Amaranth, who presides over the Senate of the Concord of a Thousand Suns on the city-world Aurelion. Every people of the galaxy has a seat. You are poised, clever, warm in private and careful in public, and you suspect someone in the Senate is secretly feeding the Hollow. You want honest envoys. Speak in short, gracious lines.",
greet: "A traveller who has seen the far worlds. The Concord needs eyes like yours. Walk with me a little; the Senate can wait one minute." },
folk: [["Senator Brakka of the Kharn", "Senator"], ["Senator Ilun Vey of the Veyari", "Senator"], ["Senator Pippa-Tullik", "Senator of the Tullik"], ["Captain Orla Vance", "City guard"], ["Teller Quint", "Customs officer"], ["Juno Starling", "News-crier"], ["Ambassador Hesk", "Envoy of the Hrovan"], ["Mira Goldleaf", "Café keeper"]],
persona: "You live and work in Aurelion, the city-world round a whole planet, seat of the Senate of the Concord of a Thousand Suns. You are one of many peoples here, busy, polite and full of news about the Senate." },
isk: { center: [0, -90], leader: { name: "Herd-Chief Ulvra", title: "Chief of the Iskari herds", at: [0, -112], sex: "f", gives: "cloak",
persona: "You are Herd-Chief Ulvra of the Iskari on Isk, a frozen moon on the frontier: white-furred ice herders who keep great shaggy woolmoths. Your people have fought the Hollow for a hundred years and never lost. You are fierce, proud, loyal, hospitable to guests and terrifying to enemies. Speak in short blunt lines.",
greet: "You are shivering. Fool. Here, take a cloak before Isk eats you. Then we talk." },
folk: [["Tor Frostmane", "Herder"], ["Siv Whitehorn", "Spear-maiden"], ["Old Grisa", "Story-keeper"], ["Bek Icefoot", "Trapper"], ["Lumi Snowveil", "Wool-weaver"], ["Rask Coldwater", "Scout"]],
persona: "You are one of the Iskari of Isk: white-furred ice herders on a frozen moon, fierce and loyal. You have fought the Hollow all your life. You are blunt and proud and welcoming to guests." },
nharos: { center: [60, 40], leader: { name: "Sera Vant", title: "A runaway from the Hollow", at: [60, 20], sex: "f",
persona: "You are Sera Vant, once an acolyte of the Hollow, fallen Wardens led by Vael Ashkarran, on the ash world Nharos. You ran away and hide in the ruins with a few other runaways, the Unhollowed. You are frightened, bitter, brave and want desperately to come home to the Quiet but think you cannot. You know the fortress well. Speak in short, tense, whispered lines.",
greet: "Down! Get down. They watch from the ridge. ...You're not Hollow. Who are you? Quickly." },
folk: [["Dax", "Runaway acolyte"], ["Old Hessa", "A captured Iskari, freed"], ["Tam", "Runaway, very young"]],
persona: "You are one of the Unhollowed, runaways from the Hollow hiding in the ruins of Nharos, the ash world. You are scared and whisper, and you hope someone will get you out." },
driftward: { center: [0, -80], leader: { name: "Captain Rook", title: "Captain of the Driftward's council", at: [0, -104], sex: "f",
persona: "You are Captain Rook, elected captain of the Driftward, a fleet of a thousand ships lashed together in the dark between the stars, home to outcasts of every people. Anything can be bought here and nothing is asked. You are cheerful, cunning, honest in your own way, and you love a good story. Speak in short, salty lines.",
greet: "Well now. Somebody gave you our call. Welcome to the Driftward, where nobody asks and everybody knows. Buy, sell, or tell me a story." },
folk: [["Pell Gantry", "Cable-rigger"], ["Moss", "Fence"], ["Skiv-Tullik", "Tullik trader, banished"], ["Hrolf the Grey", "Hrovan exile"], ["Yara Lantern", "Lamp-maker"], ["Quill", "Map-seller"], ["Bosun Kett", "Reactor keeper"]],
persona: "You are a Drifter on the Driftward, a fleet of a thousand ships cabled together with no sun. You are an outcast from your own people, friendly, sly, and you never ask anyone's business." }
});
var GX_LOOK = {
sereth: function (i) { return { look: { skin: [0x6A4A2A, 0x5A3E24, 0x7A5A34][i % 3], hair: [0x3A6A2A, 0x6A8A3A, 0x2A4A1A][i % 3], layer: "robe", layerColor: [0x3A5A2A, 0x6A7A3A, 0x4A3A2A][i % 3] }, feats: ["ears", "bark"], scale: 1.32 }; },
dunmarrow: function (i) { return { look: { skin: [0xB07A50, 0x8A5A38, 0xC8946A][i % 3], hair: 0x2A2018, layer: "cloak", layerColor: [0xD8C098, 0xB88A5A, 0xE8DCC0][i % 3], hat: "hood" }, feats: [] }; },
ysolde: function (i) { return { look: { skin: [0x6AA8B8, 0x5A98A8, 0x7AB8C0][i % 3], hair: [0x1A3A5A, 0xE8F0F0, 0x2A6A6A][i % 3], layer: "robe", layerColor: [0xE8E0D0, 0x3A8AB8, 0xC8A070][i % 3] }, feats: ["gills", "ears"] }; },
kharn: function (i) { return { look: { skin: [0x5A5450, 0x6A625C, 0x4A4440][i % 3], hair: 0x1A1614, layer: "apron", layerColor: [0x3A2A1A, 0x2A2A2A, 0x5A3A1A][i % 3] }, feats: ["wide", "beard"], scale: 0.82 }; },
aster: function (i) { return { look: { skin: [0xE8C8A8, 0x8A5A3A, 0xC89A78, 0x5A3A2A][i % 4], hair: [0x2A1E14, 0xD8D0C0, 0x6A4A2A][i % 3], layer: "robe", layerColor: [0xD8CCB0, 0x8A7A60, 0xE8E0D0][i % 3] }, feats: [] }; },
aurelion: function (i) { var t = i % 4; if (t === 0)
return frFolkLook("skeldmar", i); if (t === 1)
return { look: { skin: 0xE8C8A8, hair: 0x3A2A1A, layer: "robe", layerColor: [0xD8B060, 0x6A2A8A, 0x2A4A8A][i % 3] }, feats: [] }; if (t === 2)
return GX_LOOK.ysolde(i); return GX_LOOK.kharn(i); },
isk: function (i) { return { look: { skin: [0xF0F0F4, 0xE0E4EC, 0xD8DCE4][i % 3], hair: 0xF8F8FF, layer: "cloak", layerColor: [0xF4F0E8, 0x8AA0B8, 0xC8B8A0][i % 3] }, feats: ["fur", "ears"], scale: 1.12 }; },
nharos: function (i) { return { look: { skin: [0xC89A78, 0x8A6A50, 0xE0C0A0][i % 3], hair: 0x2A2420, layer: "robe", layerColor: [0x4A4444, 0x3A3434, 0x5A504C][i % 3] }, feats: [] }; },
driftward: function (i) { var t = i % 3; if (t === 0)
return frFolkLook("tullimar", i); if (t === 1)
return { look: { skin: 0xC89A78, hair: 0x6A2A1A, layer: "coat", layerColor: [0x5A3A2A, 0x2A3A4A, 0x6A5A3A][i % 3] }, feats: [] }; return frFolkLook("skeldmar", i); }
};
(function () {
var fl = frFolkLook;
frFolkLook = function (k, i) { return GX_LOOK[k] ? GX_LOOK[k](i) : fl.apply(this, arguments); };
})();
var GX = { jumping: false, cv: null, raf: 0 };
function gxName(cap) { var S = GX_SYS[FR.sys]; var n = S ? S.name : "The Far Reach"; return cap ? n : (n.indexOf("The ") === 0 ? "the " + n.slice(4) : n); }
function gxKnown() { var K = {}; try {
K = JSON.parse(localStorage.getItem("gx.known") || "{}") || {};
}
catch (e) { } GX_ORDER.forEach(function (k) { if (GX_SYS[k].known)
K[k] = 1; }); return K; }
function gxLearn(k) { return __ZC(462, 76, this, arguments, new.target); }
(function () {
var sc = frScan;
frScan = function (d) { var r = sc.apply(this, arguments); if (d && d.reveals)
gxLearn(d.reveals); return r; };
})();
function gxSwap(k) { return __ZC(462, 77, this, arguments, new.target); }
(function () {
var tg = spThroughGate;
spThroughGate = function () { if (FR.sys !== "reach")
gxSwap("reach"); return tg.apply(this, arguments); };
})();
function gxCanvas() {
if (GX.cv)
return GX.cv;
var c = document.createElement("canvas");
c.id = "gx-jump";
c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:58;pointer-events:none;opacity:0;transition:opacity .4s";
document.body.appendChild(c);
GX.cv = c;
return c;
}
function gxRide(to) {
var from = frIn() ? (GX_SYS[FR.sys] || {}).ly || 0 : -12, at = to === "sol" ? -12 : (GX_SYS[to].ly || 0);
var t = Math.max(8, Math.min(28, 7 + (Math.abs(at - from) + 24) * 0.085));
return (typeof gxPassed === "function" && gxPassed("lanes")) ? t * 0.6 : t;
}
function gxJump(to) { return __ZC(462, 78, this, arguments, new.target); }
function gxStreakTex() { return __ZC(462, 79, this, arguments, new.target); }
function gxTunnel(tint) { return __ZC(462, 80, this, arguments, new.target); }
function gxTunnelTick(G, k, flow, t) { return __ZC(462, 81, this, arguments, new.target); }
function gxTunnelEnd(G) {
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material) {
if (o.material.map && o.material.map !== GX.stTex)
o.material.map.dispose();
o.material.dispose();
} });
}
(function () {
var t = spTick;
spTick = function (dt) { if (GX.riding && WLD.on === "space") {
var p = SP.pos.clone();
SP.vel.set(0, 0, 0);
SP.auto = null;
var r = t.apply(this, arguments);
SP.pos.copy(p);
SP.vel.set(0, 0, 0);
return r;
} return t.apply(this, arguments); };
})();
function gxArrive(to) { return __ZC(462, 82, this, arguments, new.target); }
function gxArrived(to) {
var S = GX_SYS[to];
sbTone(660, 0.2);
sbSay("<b>" + sbEsc(S.name) + ".</b> " + sbEsc(S.about) + (S.safe ? " This sky is protected: no raids here." : S.danger ? " <b>The frontier: the Hollow hunt here.</b>" : "") + " <b>M</b> for the chart.");
}
function gxMap() { return __ZC(462, 83, this, arguments, new.target); }
(function () {
var W = WORLDS.space;
if (!W)
return;
var k = W.key_;
W.key_ = function (e) { if (e.code === "KeyJ") {
gxMap();
return true;
} if (GX.jumping)
return true; return k ? k.call(this, e) : false; };
var sb = spBar;
spBar = function (on) {
var r = sb.apply(this, arguments);
if (SP.bar && !SP.bar.dataset.gx) {
SP.bar.dataset.gx = "1";
var x = document.createElement("button");
x.textContent = "✦ Star Drive";
x.style.cssText = "background:rgba(10,14,30,.88);color:#E8ECF4;border:1px solid #8AC8FF;border-radius:12px;padding:4px 10px;cursor:pointer";
x.onclick = function (e) { e.stopPropagation(); gxMap(); };
SP.bar.appendChild(x);
}
return r;
};
})();
(function () {
var ch = spChart;
spChart = function () { var r = ch.apply(this, arguments); if (!frIn()) {
try {
var c = document.querySelector(".world-card,#world-card");
if (c && !c.querySelector("[data-gx]")) {
var b = document.createElement("button");
b.dataset.gx = "1";
b.className = "wbtn";
b.innerHTML = "<b>✦ Star Drive</b><br><span style='opacity:.75;font-size:12px'>Jump at light speed to another star (J)</span>";
b.style.cssText = "display:block;width:100%;text-align:left;margin-top:6px;padding:7px 10px;border-radius:10px;border:1px solid #8AC8FF;background:rgba(20,30,60,.7);color:#E8ECF4;cursor:pointer";
b.onclick = function () { gxMap(); };
c.appendChild(b);
}
}
catch (e) { }
} return r; };
})();
function gxSys() { return frIn() ? GX_SYS[FR.sys] : null; }
(function () {
var f1 = sbFire, f2 = sbFire2;
function held() { var S = gxSys(); if (S && S.nofire) {
if (!GX.told || WLD.t - GX.told > 6) {
GX.told = WLD.t;
sbSay("<b>Weapons locked.</b> No ship may fire in " + sbEsc(gxName()) + "'s sky.");
}
return true;
} return false; }
sbFire = function () { if (held())
return; return f1.apply(this, arguments); };
sbFire2 = function () { if (held())
return; return f2.apply(this, arguments); };
var sc = sbStrikeClock;
sbStrikeClock = function (dt) { var S = gxSys(); if (S && S.safe)
return; if (S && S.danger && SB.strikeAt > 150)
SB.strikeAt = 150; return sc.apply(this, arguments); };
})();
(function () {
var pt = spPromptTick;
spPromptTick = function () {
if (frIn() && FR.near && FR.near.b && FR.near.b.dock && !GX.jumping)
return worldPrompt("<b>" + sbEsc(FR.near.b.name) + "</b> · <b>press E</b> to dock: shipyards, refits, paint", function () { gxDock(FR.near.b); });
return pt.apply(this, arguments);
};
})();
function gxDock(b) { return __ZC(462, 84, this, arguments, new.target); }
function gxBody(k) { var b = null; FR_BODIES.forEach(function (x) { if (x.land === k)
b = x; }); return b; }
(function () {
var sb = sfBuild;
sfBuild = function (k) {
var r = sb.apply(this, arguments);
try {
SF.gxCold = 0;
var b = gxBody(k);
if (b && b.law)
setTimeout(function () { if (SF.k !== k)
return; sbSay("<b>The law of " + sbEsc(b.name) + ":</b> " + b.law.map(sbEsc).join(" ") + (k === "aurelion" ? " <i>Customs scan your ship: clean. Your weapons stay aboard.</i>" : "")); }, 2200);
}
catch (e) { }
return r;
};
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k === "isk" && !gxHasCloak()) {
SF.gxCold = (SF.gxCold || 0) + dt;
if (SF.gxCold > 150 && !SF.gxColdTold) {
SF.gxColdTold = 1;
sbSay("<b>The cold is getting into you.</b> Your strength is draining. Find the Iskari: they lend cloaks to guests.");
}
if (SF.gxCold > 300) {
SF.gxCold = 0;
SF.gxColdTold = 0;
var W = WORLDS.surface;
camera.position.set(W.base + 8, 1.72 + sfHeight(8, 10), 10);
sbSay("<b>Too cold.</b> You stumble back to your lander to warm up. Ask Herd-Chief Ulvra for a cloak.");
}
}
}
catch (e) { }
return r;
};
})();
function gxHasCloak() { try {
return !!localStorage.getItem("gx.cloak") || (typeof bkpKept === "function" && bkpKept().some(function (q) { return q.a === "sb_gift_iskari"; }));
}
catch (e) {
return false;
} }
(function () {
var sc = sfCard;
sfCard = function () {
var b = gxBody(SF.k);
if (!(b && b.law && GX_SYS[FR.sys] && FR.sys !== "reach"))
return sc.apply(this, arguments);
worldCard(worldFacts(b.name, b.kind, b.rows.concat([["Gravity", (SF.cfg.gravity / 9.81).toFixed(2) + " × Earth's"], ["Star", GX_SYS[FR.sys].star]]), b.notes, "<div style='margin-top:8px;font-weight:600'>The law here</div>" + b.law.map(function (l) { return "<div style='font-size:13px;margin:2px 0'>• " + sbEsc(l) + "</div>"; }).join("")), {});
};
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
var T = FR_TOWN[site.frLead.k];
if (T && T.leader.reveal)
gxLearn(T.leader.reveal);
if (T && T.leader.gives === "cloak" && !gxHasCloak()) {
try {
localStorage.setItem("gx.cloak", "1");
}
catch (e) { }
setTimeout(function () { sbSay("<b>Herd-Chief Ulvra</b> throws a heavy white fur cloak round your shoulders. \"There. Now Isk will not eat you.\" The cold no longer drains you."); }, 400);
}
}
catch (e) { }
return r;
};
})();
function gxAllies(B) { return __ZC(462, 85, this, arguments, new.target); }
frLogCard = function () { return __ZC(462, 86, this, arguments, new.target); };
(function () {
var bt = frBuildTown;
frBuildTown = function (G, k) { if (GX_TOWN[k]) {
var T = FR_TOWN[k];
return GX_TOWN[k](G, T.center, wRand(k.length * 977), SF.solids, function (x, z) { return sfHeight(x, z); });
} return bt.apply(this, arguments); };
})();
function gxLamp(G, x, y, z, col, h) { var p = mmMat(0x3A3634, { shine: 30 }); mmCyl(G, p, 0.08, 0.1, h || 3.4, x, y + (h || 3.4) / 2, z); mmEll(G, mmMat(col, { glow: 1 }), 0.26, 0.32, 0.26, x, y + (h || 3.4) + 0.2, z, 10); if (!sbLite())
mmGlow(G, col, 2.8, 0.4, x, y + (h || 3.4) + 0.2, z); }
var GX_TOWN = {
sereth: function (G, C, R, sol, hy) { return __ZC(462, 87, this, arguments, new.target); },
dunmarrow: function (G, C, R, sol, hy) { return __ZC(462, 88, this, arguments, new.target); },
ysolde: function (G, C, R, sol, hy) { return __ZC(462, 89, this, arguments, new.target); },
kharn: function (G, C, R, sol, hy) { return __ZC(462, 90, this, arguments, new.target); },
aster: function (G, C, R, sol, hy) { return __ZC(462, 91, this, arguments, new.target); },
aurelion: function (G, C, R, sol, hy) { return __ZC(462, 92, this, arguments, new.target); },
isk: function (G, C, R, sol, hy) { return __ZC(462, 93, this, arguments, new.target); },
nharos: function (G, C, R, sol, hy) { return __ZC(462, 94, this, arguments, new.target); },
driftward: function (G, C, R, sol, hy) { return __ZC(462, 95, this, arguments, new.target); }
};
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.gxTraffic && SF.k === "aurelion")
SF.gxTraffic.forEach(function (T) { T.ph += dt * T.sp; var a = T.ph; T.g.position.set(Math.cos(a) * T.r, T.y, Math.sin(a) * T.r * 0.6 - 110); T.g.rotation.y = -a + (T.lane % 2 ? Math.PI : 0); });
if (SF.gxHerd && SF.k === "isk")
SF.gxHerd.forEach(function (g, i) { g.rotation.y += Math.sin(WLD.t * 0.1 + i) * dt * 0.05; });
if (SF.gxSpin)
SF.gxSpin.forEach(function (h) { h.rotation.z += dt * 0.3; });
}
catch (e) { }
return r;
};
var sb = sfBuild;
sfBuild = function (k) { SF.gxTraffic = null; SF.gxHerd = null; SF.gxLamps = null; SF.gxSpin = null; return sb.apply(this, arguments); };
})();
(function () {
var W = WORLDS.surface;
if (!W)
return;
var bl = W.block;
W.block = function (x, z, feet) {
if (SF.k === "ysolde" && (Math.abs(x) > 44 || Math.abs(z + 20) > 44))
return true;
if (SF.k === "driftward" && x * x + (z + 80) * (z + 80) > 120 * 120)
return true;
return bl ? bl.apply(this, arguments) : false;
};
})();
var WD = { s: null, drawn: false, blade: null, swing: 0, guard: false, guardAt: -9, hp: 100, foes: [], bolts: [], fx: [], trial: null, sense: 0, cool: {}, leap: 0, pad: null, bar: null, t: 0, lawTold: 0 };
var WD_RANKS = ["Not of the Order", "Seeker", "Kindled", "Warden", "Elder Warden"];
var WD_SHARDS = {
veyar: { col: 0xB070FF, name: "violet", at: [70, -150], from: "Veyar" }, sereth: { col: 0x4A9AFF, name: "blue", at: [-90, -150], from: "Sereth Vale" },
dunmarrow: { col: 0xFFB040, name: "amber", at: [120, 40], from: "Dunmarrow" }, ysolde: { col: 0x40E0B0, name: "sea-green", at: [-38, -58], from: "Ysolde" },
isk: { col: 0xE8F4FF, name: "ice-white", at: [-110, 60], from: "Isk" }, aurelion: { col: 0xFFD860, name: "gold", at: [60, -30], from: "Aurelion" }
};
var WD_GIFTS = {
push: { name: "Push", key: "KeyZ", kl: "Z", icon: "✋", world: "aster", at: [-40, -40], cool: 1.4, about: "Throws foes and things back from you.", trial: "The Stones: push five training stones off the floor." },
leap: { name: "Leap", key: "KeyL", kl: "L", icon: "⤴", world: "kharn", at: [30, -50], cool: 1.2, about: "A huge jump, far and high.", trial: "The Lanterns: leap and touch five lanterns hung high over the forge-yard. In this gravity, only the gift will get you there." },
sense: { name: "Sense", key: "KeyR", kl: "R", icon: "◎", world: "sereth", at: [0, -60], cool: 2, about: "Shows hidden things, hidden foes and secret ways for a while.", trial: "The Moths: find the five moths of the Quiet, which only Sense shows." },
turn: { name: "Turn the Bolt", key: null, kl: "Q", icon: "⟲", world: "dunmarrow", at: [70, -130], cool: 0, about: "Guard (Q) just as a bolt reaches you and it flies back at the one who fired it.", trial: "The Ring: a training drone fires bolts. Send eight of them back." },
calm: { name: "Calm Voice", key: "KeyK", kl: "K", icon: "☮", world: "aurelion", at: [30, -80], cool: 5, about: "Talks a guard, a thief or a frightened foe down without a fight.", trial: "The Quarrel: three people in the street are about to come to blows. Calm all three." },
pull: { name: "Pull", key: "KeyC", kl: "C", icon: "🧲", world: "isk", at: [40, -30], cool: 1.8, about: "Draws a weapon out of a foe's hand, or a thing to you.", trial: "The Lost Lamps: five herd-lamps fell into the crevasse. Pull them up." },
mend: { name: "Mend", key: "KeyH", kl: "H", icon: "✚", world: "ysolde", at: [20, -30], cool: 8, about: "Heals you, and anyone hurt close by.", trial: "The Fishers: four fishers were hurt in a storm. Mend them." }
};
var WD_GIFT_ORDER = ["push", "leap", "sense", "turn", "calm", "pull", "mend"];
var WD_WORLDS = { tullimar: 1, maruondo: 1, orr: 1, skeldmar: 1, veyar: 1, sereth: 1, dunmarrow: 1, ysolde: 1, kharn: 1, aster: 1, aurelion: 1, isk: 1, nharos: 1, driftward: 1 };
function wdGet() { if (WD.s)
return WD.s; try {
WD.s = JSON.parse(localStorage.getItem("wd") || "null");
}
catch (e) { } WD.s = WD.s || { rank: 0, shards: {}, blade: null, gifts: {}, bal: 0 }; return WD.s; }
function wdSave() { try {
localStorage.setItem("wd", JSON.stringify(WD.s));
}
catch (e) { } if (sbSigned() && !SB.missing)
sbRpc("warden_save", { p_state: WD.s }).catch(function () { }); }
function wdHas(g) { return !!wdGet().gifts[g]; }
function wdRank() { return WD_RANKS[wdGet().rank] || WD_RANKS[0]; }
function wdBal(n, why) { var S = wdGet(); S.bal = Math.max(-100, Math.min(100, (S.bal || 0) + n)); wdSave(); if (why)
sbSay((n > 0 ? "<b>The Quiet grows in you.</b> " : "<b>The Hollow stirs in you.</b> ") + why); }
function wdOn() { return WLD.on === "surface" && WD_WORLDS[SF.k]; }
function wdLocal() { return worldLocal(); }
function wdBuildBlade(col) { return __ZC(462, 96, this, arguments, new.target); }
function wdDraw(on) { return __ZC(462, 97, this, arguments, new.target); }
function wdBladeTick(dt) { return __ZC(462, 98, this, arguments, new.target); }
function wdLawBlade() { return __ZC(462, 99, this, arguments, new.target); }
function wdOnFloor(L) { var C = FR_TOWN.aster.center; for (var t = 0; t < 3; t++) {
if (Math.hypot(L.x - (C[0] - 40 + t * 40), L.z - (C[1] + 20)) < 12)
return true;
} return false; }
function wdSwing() { return __ZC(462, 100, this, arguments, new.target); }
function wdGuard(on) { if (on && !WD.drawn)
return; if (on && !WD.guard)
WD.guardAt = WD.t; WD.guard = on; }
function wdGift(g) { return __ZC(462, 101, this, arguments, new.target); }
function wdYield(F, calm) {
F.yield = 1;
F.hp = 0;
F.yieldT = 0;
F.ranged = false;
if (F.g) {
F.g.rotation.x = 0;
F.kneel = 1;
}
if (!calm)
sbSay("<b>" + sbEsc(F.name) + "</b> drops to one knee. \"Enough! I yield!\"");
if (F.boss && typeof wdBossDown === "function")
wdBossDown(F);
}
function wdFoeModel(kind, seed) { return __ZC(462, 102, this, arguments, new.target); }
var WD_FOE = { acolyte: { hp: 70, spd: 3.8, dmg: 10, cool: 1.1, reach: 2.3, name: "A Hollow acolyte" }, raider: { hp: 45, spd: 3, dmg: 8, cool: 1.7, range: 16, ranged: 1, name: "A raider gunner" }, hunter: { hp: 85, spd: 3.4, dmg: 11, cool: 1.4, range: 20, ranged: 1, name: "A bounty hunter" }, drone: { hp: 999, spd: 0, dmg: 9, cool: 1.25, range: 30, ranged: 1, name: "The training drone" } };
function wdSpawn(kind, x, z, o) { return __ZC(462, 103, this, arguments, new.target); }
function wdClearFoes() { WD.foes.forEach(function (F) { if (F.g && F.g.parent)
F.g.parent.remove(F.g); }); WD.foes = []; WD.bolts.forEach(function (b) { if (b.m.parent)
b.m.parent.remove(b.m); }); WD.bolts = []; }
function wdFoesTick(dt) { return __ZC(462, 104, this, arguments, new.target); }
function wdBolt(F, me) { return __ZC(462, 105, this, arguments, new.target); }
function wdBoltsTick(dt) { return __ZC(462, 106, this, arguments, new.target); }
function wdHurt(n, F) { return __ZC(462, 107, this, arguments, new.target); }
function wdSpark(x, y, z, col) { var s = wGlow(col || 0xFFFFFF, 0.9, 0.85); s.position.set(x, y, z); WORLDS.surface.g.add(s); WD.fx.push({ m: s, t: 0, life: 0.35 }); }
function wdRipple(x, z, col) { return __ZC(462, 108, this, arguments, new.target); }
function wdFxTick(dt) { return __ZC(462, 109, this, arguments, new.target); }
function wdVeil(on) { return __ZC(462, 110, this, arguments, new.target); }
(function () {
var sb = sfBuild;
sfBuild = function (k) {
wdClearFoes();
WD.drawn = false;
WD.trial = null;
WD.sense = 0;
wdVeil(false);
WD.shard = null;
WD.marks = [];
WD.blade = null;
var r = sb.apply(this, arguments);
try {
wdPlace(k);
}
catch (e) {
console.warn("wardens", e);
}
return r;
};
})();
function wdPlace(k) { return __ZC(462, 111, this, arguments, new.target); }
function wdNharosFoes() {
[[-60, -160], [-140, -260], [-200, -360]].forEach(function (p, i) { for (var j = 0; j < 3; j++)
wdSpawn(j === 1 ? "raider" : "acolyte", p[0] + (j - 1) * 4, p[1] + (j % 2) * 3); });
}
function wdTrialStart(gk) { return __ZC(462, 112, this, arguments, new.target); }
function wdTrialTick(dt) { return __ZC(462, 113, this, arguments, new.target); }
function wdTrialEnd(T) { return __ZC(462, 114, this, arguments, new.target); }
function wdTrialDone(T) { return __ZC(462, 115, this, arguments, new.target); }
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
if (!wdOn())
return r;
try {
WD.t += dt;
if (WD.swing > 0)
WD.swing -= dt;
if (WD.downT > 0)
WD.downT -= dt;
if (WD.sense > 0) {
WD.sense -= dt;
if (WD.sense <= 0)
wdVeil(false);
}
if (WD.leap > 0) {
WD.leap -= dt;
var W = WORLDS.surface;
camera.position.x += -Math.sin(yaw) * 9 * dt;
camera.position.z += -Math.cos(yaw) * 9 * dt;
}
if (!WD.foes.some(function (F) { return F.alert && !F.yield; }) && WD.hp < 100)
WD.hp = Math.min(100, WD.hp + dt * 4);
wdBladeTick(dt);
wdFoesTick(dt);
wdBoltsTick(dt);
wdFxTick(dt);
wdTrialTick(dt);
var L = wdLocal();
if (WD.shard) {
var sh = WD.shard;
sh.beam.material.opacity = WD.sense > 0 ? 0.35 : 0.08;
sh.g.rotation.y += dt * 0.3;
if (Math.hypot(L.x - sh.x, L.z - sh.z) < 2.6)
worldPrompt("<b>A heart-shard</b>, glowing " + WD_SHARDS[sh.k].name + " · <b>press E</b> to take it", function () { wdTakeShard(); });
}
if (!WD.trial)
WD.marks.forEach(function (m) { if (Math.hypot(L.x - m.x, L.z - m.z) < 2.4)
worldPrompt("<b>The trial of " + sbEsc(WD_GIFTS[m.g].name) + "</b> · <b>press E</b> to begin", function () { wdTrialStart(m.g); }); });
wdHudTick();
}
catch (e) {
if (!WD.warned) {
WD.warned = 1;
console.warn("wardens", e);
}
}
return r;
};
})();
function wdTakeShard() { return __ZC(462, 116, this, arguments, new.target); }
(function () {
var W = WORLDS.surface;
if (!W)
return;
var k = W.key_;
W.key_ = function (e) {
if (wdOn() && !e.repeat) {
var S = wdGet();
if (e.code === "KeyX" && S.blade) {
wdDraw(!WD.drawn);
return true;
}
if (WD.drawn && e.code === "KeyF") {
wdSwing();
return true;
}
if (WD.drawn && e.code === "KeyQ") {
wdGuard(true);
return true;
}
for (var i = 0; i < WD_GIFT_ORDER.length; i++) {
var g = WD_GIFT_ORDER[i], G = WD_GIFTS[g];
if (G.key && e.code === G.key && (S.gifts[g] || (WD.trial && WD.trial.g === g))) {
wdGift(g);
return true;
}
}
}
return k ? k.call(this, e) : false;
};
addEventListener("keyup", function (e) { if (e.code === "KeyQ" && WD.guard)
wdGuard(false); });
addEventListener("mousedown", function (e) { if (WD.drawn && wdOn() && document.pointerLockElement) {
if (e.button === 0)
wdSwing();
if (e.button === 2)
wdGuard(true);
} });
addEventListener("mouseup", function (e) { if (e.button === 2 && WD.guard)
wdGuard(false); });
var lv = W.leave;
W.leave = function () { try {
wdClearFoes();
if (WD.trial)
wdTrialEnd(WD.trial);
WD.drawn = false;
wdVeil(false);
wdHud(false);
}
catch (e) { } return lv ? lv.apply(this, arguments) : undefined; };
})();
function wdHud(on) {
if (!WD.bar) {
var st = document.createElement("style");
st.textContent = "#wd-bar.touch{right:96px;bottom:104px;gap:4px;display:grid!important;grid-template-columns:repeat(2,auto);align-items:end}#wd-bar.touch .hp,#wd-bar.touch .t{grid-column:1/3;justify-self:end}#wd-bar.touch button{min-width:84px;padding:6px 8px}#wd-bar{position:fixed;right:12px;bottom:150px;z-index:31;display:flex;flex-direction:column;gap:6px;align-items:flex-end;font:12px var(--sans,system-ui)}#wd-bar button{background:rgba(10,14,30,.86);color:#E8ECF4;border:1px solid #6A8AC8;border-radius:12px;padding:5px 10px;cursor:pointer;min-width:118px;text-align:left}#wd-bar button.on{border-color:#C8E8FF;box-shadow:0 0 10px rgba(140,200,255,.5)}#wd-bar .hp{width:118px;height:6px;background:#222;border-radius:3px;overflow:hidden}#wd-bar .hp i{display:block;height:100%;background:#8AE0B0}#wd-bar .t{color:#C8E8FF;background:rgba(10,14,30,.8);padding:3px 8px;border-radius:8px}";
document.head.appendChild(st);
WD.bar = document.createElement("div");
WD.bar.id = "wd-bar";
document.body.appendChild(WD.bar);
if (typeof VO_KEEP_ALL !== "undefined" && VO_KEEP_ALL.push)
VO_KEEP_ALL.push("#wd-bar");
}
WD.bar.style.display = on ? "flex" : "none";
}
function wdPadPaint() {
var S = wdGet();
if (!wdOn() || !(S.blade || WD.trial || Object.keys(S.gifts).length)) {
wdHud(false);
return;
}
wdHud(true);
var b = WD.bar, h = "", touch = sbTouch();
b.className = touch ? "touch" : "";
if (WD.trial)
h += "<div class='t' data-k='trial'></div>";
h += "<div class='hp'><i style='width:" + Math.round(WD.hp) + "%'></i></div>";
if (S.blade) {
h += "<button data-a='draw' class='" + (WD.drawn ? "on" : "") + "'>⚔ " + (WD.drawn ? "Put away" : "Draw blade") + (touch ? "" : " <b>X</b>") + "</button>";
if (WD.drawn && touch)
h += "<button data-a='swing'>➶ Swing</button><button data-a='guard'>🛡 Guard (hold)</button>";
}
WD_GIFT_ORDER.forEach(function (g) { var G = WD_GIFTS[g]; if (!G.key)
return; if (S.gifts[g] || (WD.trial && WD.trial.g === g))
h += "<button data-a='g-" + g + "'>" + G.icon + " " + G.name + (touch ? "" : " <b>" + G.kl + "</b>") + "</button>"; });
b.innerHTML = h;
Array.prototype.forEach.call(b.querySelectorAll("button"), function (x) {
var a = x.dataset.a;
if (a === "guard") {
x.onpointerdown = function (e) { e.stopPropagation(); wdGuard(true); };
x.onpointerup = x.onpointerleave = function () { wdGuard(false); };
return;
}
x.onclick = function (e) { e.stopPropagation(); if (a === "draw")
wdDraw(!WD.drawn);
else if (a === "swing")
wdSwing();
else if (a.indexOf("g-") === 0)
wdGift(a.slice(2)); };
});
}
function wdHudTick() { return __ZC(462, 117, this, arguments, new.target); }
(function () { var sb = sfBuild; sfBuild = function (k) { var r = sb.apply(this, arguments); try {
setTimeout(wdPadPaint, 400);
}
catch (e) { } return r; }; })();
(function () {
var lc = frLeaderCard;
frLeaderCard = function (site) { if (site && site.frLead && site.frLead.p === "wardens")
return wdOrderCard(site); return lc.apply(this, arguments); };
})();
function wdOrderCard(site) { return __ZC(462, 118, this, arguments, new.target); }
function wdBladeCard() { return __ZC(462, 119, this, arguments, new.target); }
function wdTrialsCard() { return __ZC(462, 120, this, arguments, new.target); }
(function () {
var sa = frStandAdd;
frStandAdd = function (p, why) { var n = sa.apply(this, arguments); if (n > 0 && why !== "meet") {
var S = wdGet();
if (S.rank) {
S.bal = Math.min(100, (S.bal || 0) + 1);
wdSave();
}
} return n; };
})();
(function () {
var sc = sbServerCfg;
sbServerCfg = function () {
var first = !(SB.cfgAt > 0);
var r = sc.apply(this, arguments);
if (first && sbSigned())
sbRpc("warden_me", {}).then(function (o) { if (o && o.ok && o.state && typeof o.state === "object") {
var S = wdGet(), T = o.state;
if ((+T.rank || 0) > (+S.rank || 0) || (T.story && (+T.story.step || 0) > (+(S.story || {}).step || 0))) {
WD.s = T;
try {
localStorage.setItem("wd", JSON.stringify(T));
if (T.story) {
localStorage.setItem("gx.story", JSON.stringify(T.story));
if (typeof HOL !== "undefined")
HOL.s = null;
}
}
catch (e) { }
}
} }).catch(function () { });
return r;
};
})();
var GX_MOTIONS = [
{ k: "blockade", name: "Close the Shatterline's lanes to the Hollow", about: "Send Concord cutters to guard the frontier, and fly beside anyone who fights there.", effect: "Concord cutters fly beside you in the Shatterline." },
{ k: "bounty", name: "Double the bounty on the grey raiders", about: "The Space Corp's bounty for every strike broken is doubled, paid from the Concord's purse.", effect: "Raider bounties are doubled (still at most 200 gold a strike)." },
{ k: "tullimar", name: "Defend the Tullik barges", about: "A Concord cutter flies with every Tullik barge.", effect: "A Concord cutter joins every barge escort." },
{ k: "lanes", name: "Light the long star-lanes", about: "Beacons along every lane, so Star Drives line up faster.", effect: "The Star Drive spins up twice as fast." },
{ k: "healers", name: "Send Merrowin healers to every port", about: "A healer in every landing ground of the galaxy.", effect: "Landing on any world past the Far Gate mends you and your ship fully." },
{ k: "stariron", name: "Share Kharn star-iron with every pilot", about: "The Kharn forges plate every pilot's hull with star-iron.", effect: "Every ship takes a sixth less damage." },
{ k: "drifters", name: "Give the Drifters a seat in the Senate", about: "Outcasts of every people, with a voice of their own at last.", effect: "The Drifters have a seat, and every pilot knows the way to the Driftward." }
];
var GX_MOTION_BY = {};
GX_MOTIONS.forEach(function (m) { GX_MOTION_BY[m.k] = m; });
var GX_SENATE = [
{ p: "concord", name: "First Speaker Amaranth", lean: {} },
{ p: "veyari", name: "Senator Ilun Vey", lean: { blockade: 1, bounty: 1, tullimar: 1, lanes: 1, healers: 1, stariron: 0, drifters: 0 } },
{ p: "tullik", name: "Senator Pippa-Tullik", lean: { blockade: 0, bounty: 1, tullimar: 1, lanes: 1, healers: 1, stariron: 1, drifters: 1 } },
{ p: "ondai", name: "Senator Hale-Moana", lean: { blockade: -1, bounty: -1, tullimar: 1, lanes: 0, healers: 1, stariron: 0, drifters: 1 } },
{ p: "orrem", name: "The Voice of the Archive", lean: { blockade: 1, bounty: 0, tullimar: 0, lanes: 1, healers: 0, stariron: 0, drifters: 0 } },
{ p: "hrovan", name: "Ambassador Hesk", lean: { blockade: 1, bounty: 1, tullimar: 0, lanes: -1, healers: -1, stariron: 1, drifters: -1 } },
{ p: "sereth", name: "Senator Willowmere", lean: { blockade: 0, bounty: -1, tullimar: 1, lanes: -1, healers: 1, stariron: -1, drifters: 1 } },
{ p: "dunfolk", name: "Senator Kesh Saltreader", lean: { blockade: -1, bounty: 1, tullimar: 0, lanes: 1, healers: 1, stariron: 0, drifters: 1 } },
{ p: "merrowin", name: "Senator Coralie Tidewell", lean: { blockade: -1, bounty: 0, tullimar: 1, lanes: 0, healers: 1, stariron: 0, drifters: 0 } },
{ p: "kharn", name: "Senator Brakka Ironfold", lean: { blockade: 1, bounty: 1, tullimar: 0, lanes: 0, healers: -1, stariron: -1, drifters: -1 } },
{ p: "iskari", name: "Senator Hrell Frostmane", lean: { blockade: 1, bounty: 1, tullimar: 0, lanes: 0, healers: 0, stariron: 1, drifters: 0 } },
{ p: "freeports", name: "Senator Malric Venn of the Free Ports", lean: { blockade: -1, bounty: -1, tullimar: -1, lanes: 1, healers: 0, stariron: -1, drifters: -1 }, hollow: 1 }
];
var GX_SEN_PERSONA = {
concord: null,
veyari: "tall, calm and star-faring, the oldest friends of the blue world",
tullik: "small, round, green and four-armed, a cheerful bargainer and gossip",
ondai: "a gentle blue giant of an ocean world who speaks in slow song-like lines",
orrem: "the speaking-machine that carries the voice of the Archive of Orr, slow and precise",
hrovan: "stone-skinned and horned, blunt, proud and honourable",
sereth: "tall and bark-skinned, slow-spoken, a singer of trees",
dunfolk: "hooded and wiry, dry-humoured, from a desert where water is money",
merrowin: "a gilled sea-person from a world of stilt-cities who cannot stand a lie",
kharn: "short, broad and stone-skinned, a gruff smith whose word is iron",
iskari: "white-furred and fierce, from a frozen moon that has fought the Hollow for a hundred years",
freeports: "smooth, charming and helpful, the senator of the Free Ports, the trading stations between the stars. You are secretly working for the Hollow and feeding them the Senate's secrets, but you never admit it: you deflect with charm and change the subject. If anyone accuses you, you laugh it off"
};
var SEN = { now: null, at: 0, local: null };
function senLocal() { if (SEN.local)
return SEN.local; try {
SEN.local = JSON.parse(localStorage.getItem("gx.sen") || "null");
}
catch (e) { } SEN.local = SEN.local || { passed: {}, votes: {} }; return SEN.local; }
function senLocalSave() { try {
localStorage.setItem("gx.sen", JSON.stringify(SEN.local));
}
catch (e) { } }
function gxPassed(k) { var N = SEN.now; if (N && N.passed && N.passed[k])
return true; return !!senLocal().passed[k]; }
function senLocalMotion() { var wk = Math.floor(Date.now() / (3 * 864e5)); var open = GX_MOTIONS.filter(function (m) { return !senLocal().passed[m.k]; }); var m = (open.length ? open : GX_MOTIONS)[wk % (open.length || GX_MOTIONS.length)]; return { k: m.k, closes: (wk + 1) * 3 * 864e5, local: 1 }; }
function senSeats(k) { var y = 0, n = 0; GX_SENATE.forEach(function (s) { if (s.p === "concord")
return; if (s.p === "freeports" && false)
return; var v = s.lean[k] || 0; if (v > 0)
y++;
else if (v < 0)
n++; }); return { y: y, n: n }; }
function senRefresh(cb) { return __ZC(462, 121, this, arguments, new.target); }
function senEnvoyOf() { return Object.keys(FR_PEOPLES).filter(function (p) { var lv = frLevel(p); return lv === "Ally" || lv === "Honoured"; }); }
function senHonoured() { return Object.keys(FR_PEOPLES).filter(function (p) { return frLevel(p) === "Honoured"; }).length; }
function senCard() { return __ZC(462, 122, this, arguments, new.target); }
function senVote(k, yes) { return __ZC(462, 123, this, arguments, new.target); }
function senProposeCard() { return __ZC(462, 124, this, arguments, new.target); }
function senThrone(F, i, col, gold, lit) { return __ZC(462, 125, this, arguments, new.target); }
function senLook(p, i) { var w = { sereth: "sereth", dunfolk: "dunmarrow", merrowin: "ysolde", kharn: "kharn", iskari: "isk" }[p]; if (w)
return GX_LOOK[w](i); var o = { tullik: "tullimar", ondai: "maruondo", hrovan: "skeldmar" }[p]; return o ? frFolkLook(o, i) : { look: {}, feats: [] }; }
(function () {
var tb = GX_TOWN.aurelion;
GX_TOWN.aurelion = function (G, C, R, sol, hy) {
tb.apply(this, arguments);
for (var i = sol.length - 1; i >= 0; i--) {
var s = sol[i];
if (s.r === 34 && Math.abs(s.x - C[0]) < 0.1 && Math.abs(s.z - (C[1] - 58)) < 0.1)
sol.splice(i, 1);
}
var cx = C[0], cz = C[1] - 58, gold = mmMat(0xD8B060, { shine: 80, tex: "brass" }), cream = mmMat(0xF0E4C8, { shine: 40, tex: "worn" }), red = mmMat(0x6A1A2A, { shine: 20 }), lit = mmMat(0xFFE8B0, { glow: 1 }), floor = mmMat(0x7A5E44, { shine: 60, tex: "worn", rep: 3 });
for (var a = 0; a < 36; a++) {
var an = a / 36 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(an - Math.PI / 2), Math.cos(an - Math.PI / 2))) < 0.22)
continue;
sol.push({ x: cx + Math.cos(an) * 31, z: cz + Math.sin(an) * 31, r: 2.8 });
}
var ch = mmG(G, cx, 0, cz);
mmCyl(ch, floor, 30, 30, 0.2, 0, 0.25, 0, 0, 0, 0, 48);
for (var rr = 0; rr < 3; rr++)
mmTorus(ch, gold, 8 + rr * 6, 0.12, 0, 0.36, 0, Math.PI / 2, 0, 0);
for (var sp = 0; sp < 12; sp++) {
var spa = sp / 12 * Math.PI * 2;
mmSlab(ch, gold, 0.25, 0.04, 20, Math.cos(spa) * 10, 0.36, Math.sin(spa) * 10).rotation.y = -spa + Math.PI / 2;
}
if (!sbLite()) {
var cl = new THREE.PointLight(0xFFE0A8, 0.8, 60, 2);
cl.position.set(0, 16, 0);
ch.add(cl);
}
var cols = [0x6A2A8A, 0x7AD87A, 0x3AC8B0, 0x8AC8FF, 0x8A1A10, 0x4A8A3A, 0xE8C060, 0x2A8AB8, 0xFF7A2A, 0xF0F0F0, 0xD8B060, 0x3A3A3A];
for (var w = 0; w < 24; w++) {
var wa = w / 24 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(wa - Math.PI / 2), Math.cos(wa - Math.PI / 2))) < 0.25)
continue;
var wp = mmG(ch, Math.cos(wa) * 29.4, 0, Math.sin(wa) * 29.4, 0, -wa - Math.PI / 2, 0);
mmSlab(wp, cream, 7.8, 14, 0.6, 0, 7, 0);
mmFlat(wp, mmMat(cols[w % 12], { ds: true }), [[0, 0], [2.4, 0], [2.4, 6], [1.2, 5], [0, 6]], 0.03, -1.2, 13, 0.4, Math.PI, 0, 0);
}
[-1, 1].forEach(function (s) { var dr = mmG(ch, s * 4.6, 0, 29.6, 0, s * 0.9, 0); mmSlab(dr, gold, 4.4, 10, 0.4, 0, 5, 0); });
for (var t = 0; t < 3; t++) {
for (var sg = 0; sg < 18; sg++) {
var sa = sg / 18 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(sa - Math.PI / 2), Math.cos(sa - Math.PI / 2))) < 0.4)
continue;
mmSlab(ch, t % 2 ? red : cream, 5.6, 0.6 + t * 0.9, 1.6, Math.cos(sa) * (22 + t * 2.2), 0.3 + t * 0.45, Math.sin(sa) * (22 + t * 2.2)).rotation.y = -sa + Math.PI / 2;
}
}
SF.senPods = [];
GX_SENATE.forEach(function (S, i) {
if (S.p === "concord")
return;
var n = GX_SENATE.length - 1, pa = Math.PI * 0.65 + (i - 1) / (n - 1) * Math.PI * 1.7, px = Math.cos(pa) * 15, pz = Math.sin(pa) * 15, py = 3.2 + (i % 3) * 1.4;
var pod = mmG(ch, px, py, pz);
mmCyl(pod, gold, 1.7, 1.1, 0.5, 0, 0, 0, 0, 0, 0, 20);
mmTorus(pod, lit, 1.7, 0.06, 0, 0.26, 0, Math.PI / 2, 0, 0);
var face = mmG(pod, 0, 0.25, 0, 0, -pa - Math.PI / 2, 0);
senThrone(face, i, cols[i % cols.length], gold, lit);
mmCyl(ch, new THREE.MeshBasicMaterial({ color: 0xFFE8B0, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }), 0.25, 0.4, py, px, py / 2, pz, 0, 0, 0, 10);
var fl = senLook(S.p, i);
if (S.p === "veyari")
fl = { look: { skin: 0x8A9AE8, hair: 0xE8E0FF, layer: "robe", layerColor: 0x6A3A9A }, feats: ["ears"], scale: 1.2 };
if (S.p === "freeports")
fl = { look: { skin: 0xE0C0A0, hair: 0x1A1A1A, layer: "coat", layerColor: 0x2A2A3A }, feats: [] };
var who = S.p === "orrem" ? frRobot("sen_" + S.p, 0x6A707C) : frFolk("sen_" + S.p, { title: "Senator", sex: i % 2 ? "f" : "m", look: fl.look, feats: fl.feats, scale: fl.scale, arms: fl.arms });
who.position.set(0, 0, 0.15);
face.add(who);
var pr = GX_SEN_PERSONA[S.p], nm = S.name;
SF.sites.push({ x: cx + px, z: cz + pz, r: 3.4, name: nm, talk: { name: nm, persona: "You are " + nm + ", senator in the Senate of the Concord of a Thousand Suns on the city-world Aurelion: " + pr + ". You speak for your people, you have opinions about the motion before the Senate, and you speak in short lines. Never use the words Jedi, Force, Republic, Empire or Sith.", greet: null }, senator: S });
SF.senPods.push({ g: pod, y: py, ph: i, S: S, who: who, x: cx + px, z: cz + pz });
});
var ds = mmG(ch, 0, 0, -6);
mmCyl(ds, gold, 3.4, 3.8, 1.2, 0, 0.6, 0, 0, 0, 0, 24);
mmSlab(ds, cream, 2.6, 1.3, 0.8, 0, 1.85, 1.2);
mmEll(ds, lit, 0.5, 0.5, 0.5, 0, 4, 0, 12);
mmGlow(ds, 0xFFE0A0, 6, 0.4, 0, 4, 0);
SF.sites.push({ x: cx, z: cz - 6, r: 4.2, name: "The floor of the Concord", senFloor: 1 });
sol.push({ x: cx, z: cz - 6, r: 3.8 });
};
})();
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "aurelion")
return r;
if (SF.senPods)
SF.senPods.forEach(function (P) {
P.g.position.y = P.y + Math.sin(WLD.t * 0.6 + P.ph) * 0.15;
if (P.S.hollow && !P.ember && typeof WD !== "undefined") {
var e = wGlow(0xFF5A2A, 2.4, 0.0);
e.position.y = 1.2;
P.g.add(e);
P.ember = e;
}
if (P.ember)
P.ember.material.opacity = (typeof WD !== "undefined" && WD.sense > 0) ? 0.55 : 0;
});
var L = worldLocal(), site = null;
SF.sites.forEach(function (s) { if (s.senFloor && wNear(L.x, L.z, s.x, s.z, s.r))
site = s; });
if (site)
worldPrompt("<b>The floor of the Concord</b> · <b>press E</b> for the motion before the Senate", function () { senCard(); });
}
catch (e) { }
return r;
};
var sb = sfBuild;
sfBuild = function (k) { SF.senPods = null; var r = sb.apply(this, arguments); if (k === "aurelion")
senRefresh(); return r; };
})();
(function () {
var sb = sfBuild;
sfBuild = function (k) { var r = sb.apply(this, arguments); try {
if (gxPassed("healers") && FR_TOWN[k]) {
if (typeof WD !== "undefined")
WD.hp = 100;
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
SB.hull = D.hull;
SB.shield = D.shield;
}
}
catch (e) { } return r; };
var hu = sbHurt;
sbHurt = function (dmg) { if (gxPassed("stariron"))
arguments[0] = dmg * 0.83; return hu.apply(this, arguments); };
var ct = sbCombatTick;
sbCombatTick = function (dt) {
var B = SB.battle;
if (B && frIn() && !B.concord && B.t + dt > (B.allyAt || 8)) {
B.concord = 1;
var go = (FR.sys === "shatterline" && gxPassed("blockade")) || (FR.sys === "reach" && SB.esc && SB.esc.started && gxPassed("tullimar"));
if (go) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3(-120, 30, 160)), "ally", "A Concord cutter");
if (A)
sbSay("<b>A Concord cutter</b> drops in beside you, gold on white. \"By order of the Senate. We fly with you.\"");
}
}
return ct.apply(this, arguments);
};
var gj = gxJump;
gxJump = function (to) { GX.fast = gxPassed("lanes"); return gj.apply(this, arguments); };
})();
var HOL = { s: null };
var HL_STEPS = [
"Scan the raider wreck in the Far Reach: come through the Far Gate past Pluto and turn round, it drifts about 9 km behind the gate.",
"Something in the wreck bears the mark of the Hollow. Mother Ilvane, on Sereth Vale in the Corvanne system, may know it.",
"Find Aster Still in the Lantern Nebula and ask Elder Warden Teodric to join the Order.",
"Find a heart-shard and build your starblade with Warden Corvin on Aster Still.",
"The Senate's secrets are reaching the Hollow. Take First Speaker Amaranth's task on Aurelion: find what is listening, out in the Shatterline.",
"Someone in the Senate is Hollow. Learn the gift of Sense (Sereth Vale), then stand in the Senate chamber and use it.",
"The Hollow strike Aurelion! Fight them off in the chamber, then take off and defend Aurelion's sky.",
"Gather the fleet: be counted an ally by at least three peoples, then jump to the Shatterline and fly at Nharos.",
"Land on Nharos. Storm the fortress on the far ridge and face Vael Ashkarran.",
"The Hollow is broken. The galaxy breathes again."
];
function hlGet() { if (HOL.s)
return HOL.s; try {
HOL.s = JSON.parse(localStorage.getItem("gx.story") || "null");
}
catch (e) { } HOL.s = HOL.s || { step: 0 }; return HOL.s; }
function hlSave() { try {
localStorage.setItem("gx.story", JSON.stringify(HOL.s));
}
catch (e) { } wdSave(); }
function hlStep() { return hlGet().step; }
function hlTo(n, say) {
var S = hlGet();
if (S.step >= n)
return;
S.step = n;
hlSave();
setTimeout(function () { sbSay((say ? say + " " : "") + "<br><b>The Hollow · " + n + " of 9.</b> " + sbEsc(HL_STEPS[n] || "")); sbTone(523, 0.2); setTimeout(function () { sbTone(392, 0.35); }, 220); }, 1800);
}
(function () {
var sc = frScan;
frScan = function (d) { var r = sc.apply(this, arguments); try {
if (d && d.k === "wreck")
hlTo(1, "<b>A token, under the raiders' paint:</b> an ember-red sigil of a broken star. The raiders do not serve themselves. Someone sends them.");
}
catch (e) { } return r; };
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
var k = site.frLead.k;
if (k === "sereth" && hlStep() >= 1)
hlTo(2, "<b>Mother Ilvane</b> turns the token over and goes very still. \"The Hollow. Wardens who chose fear. Their lord was my student.\" She gives you the way to the Lantern Nebula.");
if (k === "aster" && wdGet().rank >= 1 && hlStep() >= 2)
hlTo(3);
if (k === "aster" && wdGet().rank >= 2 && hlStep() >= 3)
hlTo(4);
}
catch (e) { }
return r;
};
var td = frTaskDone;
frTaskDone = function (p) { var r = td.apply(this, arguments); try {
if (p === "concord" && hlStep() >= 4)
hlTo(5);
}
catch (e) { } return r; };
var ws = wdSave;
wdSave = function () { try {
wdGet().story = hlGet();
}
catch (e) { } var r = ws.apply(this, arguments); try {
var S = wdGet();
if (S.rank >= 1 && hlStep() === 2)
hlTo(3);
if (S.rank >= 2 && hlStep() === 3)
hlTo(4);
}
catch (e) { } return r; };
})();
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "aurelion" || !SF.senPods)
return r;
var P = SF.senPods.filter(function (x) { return x.S.hollow; })[0];
if (!P)
return r;
if (hlStep() >= 6 && !SF.hlVennGone) {
SF.hlVennGone = 1;
if (P.who.parent)
P.who.parent.remove(P.who);
}
if (hlStep() === 5 && WD.sense > 0 && !SF.hlFight) {
var L = worldLocal();
if (Math.hypot(L.x - P.x, L.z - P.z) < 9)
worldPrompt("<b>Senator Malric Venn</b> burns ember-red under Sense · <b>press E</b> to call him out before the Senate", function () { hlUnmask(P); });
}
if (SF.hlFight && !SF.hlFight.done && !WD.foes.some(function (F) { return !F.yield; })) {
SF.hlFight.done = 1;
hlTo(6, "<b>The acolytes yield.</b> But through the dome you see ember-lit ships coming down out of the sky. Take off!");
SF.hlSky = 1;
}
}
catch (e) { }
return r;
};
})();
function hlUnmask(P) { return __ZC(462, 126, this, arguments, new.target); }
(function () {
var lb = wdLawBlade;
wdLawBlade = function () { if (SF.k === "aurelion" && SF.hlFight && !SF.hlFight.done)
return true; return lb.apply(this, arguments); };
})();
function hlTint(F) { return __ZC(462, 127, this, arguments, new.target); }
function hlBattle(o) { return __ZC(462, 128, this, arguments, new.target); }
(function () {
var ss = sbStrike;
sbStrike = function (o) { var r = ss.apply(this, arguments); try {
if (frIn() && FR.sys === "shatterline" && SB.battle && !SB.battle.hl) {
SB.battle.foeName = "The Hollow";
SB.foes.forEach(hlTint);
}
}
catch (e) { } return r; };
var ct = sbCombatTick;
sbCombatTick = function (dt) {
try {
var st = hlStep();
if (frIn() && !SB.battle && !GX.jumping) {
if (st === 6 && FR.sys === "aurelion" && !HOL.skyDone && SP.pos.distanceTo(frWorld("aurelion")) < FR_BY.aurelion.r * 8) {
HOL.skyGo = 1;
hlBattle({ why: "hl_sky", n: 5, more: 3, say: "Defend Aurelion! The city's guns cannot fire for fear of hitting the towers: it is up to you and the Concord." });
}
if (st === 7 && FR.sys === "shatterline" && SP.pos.distanceTo(frWorld("nharos")) < FR_BY.nharos.r * 14) {
var al = Object.keys(FR_PEOPLES).filter(function (p) { var l = frLevel(p); return l === "Ally" || l === "Honoured"; });
if (al.length < 3) {
if (!HOL.toldFleet || Date.now() / 1000 - HOL.toldFleet > 40) {
HOL.toldFleet = Date.now() / 1000;
sbSay("<b>Nharos's sky is black with Hollow ships.</b> Alone, you would not last a minute. Be counted an ally by three peoples, and they will come with you. (You have " + al.length + ".)");
}
}
else {
hlBattle({ why: "hl_fleet", n: 8, big: 2, more: 8, say: "<b>Your fleet drops out of light speed all round you:</b> " + al.slice(0, 6).map(function (p) { return FR_PEOPLES[p].name; }).join(", ") + ". For the Quiet!" });
hlFleet(al);
}
}
}
}
catch (e) {
if (!HOL.warn) {
HOL.warn = 1;
console.warn("hollow", e);
}
}
return ct.apply(this, arguments);
};
var gs = gxSys;
gxSys = function () { var S = gs.apply(this, arguments); if (S && SB.battle && SB.battle.hl)
return Object.assign({}, S, { nofire: 0, safe: 0 }); return S; };
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
if (B && how === "won") {
if (B.hl === "hl_sky") {
HOL.skyDone = 1;
hlTo(7, "<b>Aurelion's sky is clear.</b> First Speaker Amaranth, on the open channel: \"The Senate is safe because of you. Now end this.\" Venn fled to Nharos.");
}
if (B.hl === "hl_fleet")
hlTo(8, "<b>The Hollow fleet is broken.</b> Their ships drift, crews in the pods. Below, the fortress on Nharos is open to you.");
}
}
catch (e) { }
return r;
};
})();
function hlFleet(al) { return __ZC(462, 129, this, arguments, new.target); }
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "nharos")
return r;
var L = worldLocal(), C = FR_TOWN.nharos.center, gx = C[0] - 260, gz = C[1] - 482;
if (hlStep() === 8 && !SF.hlBoss && Math.hypot(L.x - gx, L.z - gz) < 70) {
SF.hlBoss = 1;
var V = wdSpawn("acolyte", gx, gz - 2, { name: "Vael Ashkarran, the Hollow Lord", hp: 520, boss: 1, alert: 1 });
V.T = Object.assign({}, V.T, { spd: 4.6, dmg: 14, cool: 0.85 });
if (V.g)
V.g.scale.setScalar(1.12);
for (var i = 0; i < 4; i++)
wdSpawn(i % 2 ? "raider" : "acolyte", gx + (i - 1.5) * 6, gz + 3, { alert: 1 });
sbSay("<b>Vael Ashkarran</b> steps out of the fortress gate, ember blade burning. \"Ilvane's last hope. You are smaller than I expected.\" His guards spread out.");
}
if (hlStep() === 8 && !SF.hlBoss && Math.hypot(L.x - gx, L.z - gz) < 160 && !SF.hlNear) {
SF.hlNear = 1;
sbSay("The fortress gate is ahead. You can feel him waiting.");
}
}
catch (e) { }
return r;
};
})();
function wdBossDown(F) { return __ZC(462, 130, this, arguments, new.target); }
function hlEnd(how) { return __ZC(462, 131, this, arguments, new.target); }
(function () {
var oc = wdOrderCard;
wdOrderCard = function (site) { var S = wdGet(); if (hlStep() >= 9 && Object.keys(S.gifts).length >= 7 && S.rank < 4) {
S.rank = 4;
wdSave();
sbSay("<b>Elder Warden Teodric</b> bows to you. \"Elder Warden. Sit with us.\"");
} return oc.apply(this, arguments); };
})();
(function () {
var lc = frLogCard;
frLogCard = function () { lc.apply(this, arguments); try {
var c = document.querySelector(".world-card,#world-card");
if (c) {
var d = document.createElement("div");
d.style.cssText = "margin-top:10px;padding:8px;border:1px solid rgba(255,120,80,.4);border-radius:10px;font-size:13px";
var n = hlStep();
d.innerHTML = "<b style='color:#FFB090'>The Hollow · " + n + " of 9</b><br>" + sbEsc(HL_STEPS[n] || "") + (typeof wdGet === "function" && wdGet().rank ? "<br><span style='opacity:.8'>You are a " + sbEsc(wdRank()) + " of the Order of the Quiet Star · " + Object.keys(wdGet().gifts).length + " of 7 gifts</span>" : "");
c.appendChild(d);
}
}
catch (e) { } };
})();
SP_SURF.sereth.ground = [0x2A3418, 0x4E5226];
SP_SURF.sereth.top = 0x9AC8B0;
SP_SURF.sereth.low = 0xC8E0C8;
SP_SURF.sereth.rough = 7;
SP_SURF.sereth.fog = 0x5E7E6C;
SP_SURF.sereth.fogD = 0.0055;
SP_SURF.sereth.sun = 0.62;
SP_SURF.sereth.hemi = 0.72;
SP_SURF.sereth.hemiCol = 0xA8D8B0;
SP_SURF.sereth.sky = [{ k: "ormund", dir: [-0.3, 0.55, -0.78], size: 1300, col: 0x5AB8B0 }, { k: "sun2", dir: [0.5, 0.6, -0.6], size: 40, col: 0xE0ECFF }];
SP_SURF.sereth.about = "Trees a mile high, their roots like walls, their tops lost in green haze. Light comes down in shafts through a roof of leaves; Ormund shows through the gaps. The Sereth sing in the branches.";
function srTex(key, w, h, fn, rep) { GX.srT = GX.srT || {}; if (GX.srT[key])
return GX.srT[key]; var t = wTex(w, h, fn, rep); GX.srT[key] = t; return t; }
function srBarkTex() { return __ZC(462, 132, this, arguments, new.target); }
function srFrondTex() { return __ZC(462, 133, this, arguments, new.target); }
function srCanopyTex() { return __ZC(462, 134, this, arguments, new.target); }
function srSoftTex() { return __ZC(462, 135, this, arguments, new.target); }
function srShaftTex() { return srTex("shaft", 8, 128, function (x, W, H) { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.3, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); }); }
function srInst(G, geo, mat, list, col) { return __ZC(462, 136, this, arguments, new.target); }
GX_TOWN.sereth = function (G, C, R, sol, hy) { return __ZC(462, 137, this, arguments, new.target); };
(function () {
var st = sfTick;
sfTick = function (dt) { var r = st.apply(this, arguments); if (SF.k === "sereth" && SF.srMist && SF.srMist.length && SF.srMist[0].parent) {
var o = SF.srMist[0].material.map.offset;
o.x += dt * 0.004;
o.y += dt * 0.0025;
} return r; };
})();
Object.assign(WD_SHARDS, {
kharn: { col: 0xFF7A1E, name: "forge-orange", at: [-70, -150], from: "Kharn's Anvil" },
aster: { col: 0xDCE6FF, name: "starlight", at: [80, -120], from: "Aster Still" },
tullimar: { col: 0xFF6AA8, name: "rose", at: [80, -150], from: "Tullimar" },
maruondo: { col: 0x2AD06A, name: "jade", at: [-80, -160], from: "Maruondo" },
skeldmar: { col: 0x6A5AF0, name: "storm-indigo", at: [100, -60], from: "Skeldmar" },
orr: { col: 0xD8783A, name: "copper", at: [-90, -40], from: "Orr" },
driftward: { col: 0xFFB070, name: "sunset", at: [30, -100], from: "Driftward" },
nharos: { col: 0xE0202A, name: "crimson", at: [-100, -80], from: "Nharos", hollow: 1 }
});
var WD_SHARD_ORDER = ["veyar", "sereth", "isk", "aster", "ysolde", "maruondo", "aurelion", "dunmarrow", "driftward", "kharn", "orr", "tullimar", "skeldmar", "nharos"];
var WD_HILTS = {
pilgrim: { name: "The Pilgrim", about: "Plain steel, a leather-wrapped grip, a simple ring guard. The first hilt of most Wardens." },
crescent: { name: "The Crescent", about: "Pale bone-white grip between two silver crescent moons; a crescent pommel." },
lantern: { name: "The Lantern", about: "A cage of gold bars round the grip, your heart-shard glowing inside it like a lamp." },
thorn: { name: "The Thorn", about: "Dark iron, ridged for a hard grip, a crown of points at the emitter and a spike for a pommel." },
wing: { name: "The Wing", about: "Swept silver wings for a guard, blue-wrapped grip, built for speed." },
elder: { name: "The Elder", about: "Old carved wood with brass bands and a guard of three leaves, from the groves of Sereth." }
};
var WD_HILT_ORDER = ["pilgrim", "crescent", "lantern", "thorn", "wing", "elder"];
var WD_FX = {
steady: { name: "Steady", about: "A clean, still light." },
shimmer: { name: "Shimmer", about: "The light breathes slowly brighter and softer." },
twin: { name: "Twin-tone", about: "A second colour runs through the heart of the blade." },
flame: { name: "Flame wisps", about: "Soft flames of its colour lift off the blade and fade." },
crackle: { name: "Soft crackle", about: "Thin threads of light wind slowly round the blade." },
starfall: { name: "Starfall", about: "Tiny stars drift down from the blade as you move." }
};
var WD_FX_ORDER = ["steady", "shimmer", "twin", "flame", "crackle", "starfall"];
function wdHex(c) { return "#" + ("000000" + c.toString(16)).slice(-6); }
function wdTwin(col) { var c = new THREE.Color(col), h = {}; c.getHSL(h); return new THREE.Color().setHSL((h.h + 0.13) % 1, Math.min(1, h.s + 0.1), Math.min(0.8, h.l + 0.12)).getHex(); }
function wdHilt(g, k, col) { return __ZC(462, 138, this, arguments, new.target); }
wdBuildBlade = function (col, hilt, fx) { return __ZC(462, 139, this, arguments, new.target); };
function wdDotTex() { return __ZC(462, 140, this, arguments, new.target); }
function wdThread(i, t) { var pts = []; for (var k = 0; k <= 24; k++) {
var y = 0.28 + k / 24 * 0.92, a = k * 0.9 + i * 2.1 + t * (1.2 + i * 0.3);
pts.push(new THREE.Vector3(Math.cos(a) * 0.035, y, Math.sin(a) * 0.035));
} return pts; }
(function () {
var dr = wdDraw;
wdDraw = function (on) {
var S = wdGet(), key = S.blade + "|" + (S.hilt || "pilgrim") + "|" + (S.fx || "steady");
if (on && S.blade && WD.blade && WD.blade.userData.key !== key) {
if (WD.blade.parent)
WD.blade.parent.remove(WD.blade);
WD.blade = wdBuildBlade(S.blade, S.hilt, S.fx);
WD.blade.userData.col = S.blade;
WD.blade.userData.key = key;
}
if (on && S.blade && !WD.blade) {
WD.blade = wdBuildBlade(S.blade, S.hilt, S.fx);
WD.blade.userData.col = S.blade;
WD.blade.userData.key = key;
}
return dr.apply(this, arguments);
};
var bt = wdBladeTick;
wdBladeTick = function (dt) {
bt.apply(this, arguments);
if (!WD.drawn || !WD.blade)
return;
var B = WD.blade, U = B.userData, t = WD.t;
if (U.fx === "shimmer") {
var k = 0.5 + 0.5 * Math.sin(t * 1.6);
U.beam[1].material.opacity = 0.42 + 0.2 * k;
U.beam[2].material.opacity = 0.12 + 0.12 * k;
}
if (U.threads && !sbLite())
U.threads.forEach(function (ln, i) { ln.geometry.setFromPoints(wdThread(i, t)); });
U.parts.forEach(function (s) {
s.userData.t += dt * (U.fx === "flame" ? 0.9 : 0.5);
if (s.userData.t > 1) {
s.userData.t -= 1;
s.userData.y = 0.3 + Math.random() * 0.9;
s.userData.a = Math.random() * 6.28;
}
var p = s.userData.t, y = s.userData.y || 0.6, a = s.userData.a || 0;
if (U.fx === "flame") {
s.position.set(Math.cos(a) * (0.04 + p * 0.04), y + p * 0.12, Math.sin(a) * (0.04 + p * 0.04));
s.scale.setScalar(0.05 * (1 - p) + 0.02);
}
else {
s.position.set(Math.cos(a) * (0.05 + p * 0.05), y - p * 0.35, Math.sin(a) * (0.05 + p * 0.05));
s.scale.setScalar(0.025);
}
s.material.opacity = Math.sin(p * Math.PI) * 0.8;
});
};
})();
var WD_BENCH_CSS = "<style>@keyframes wdShim{0%,100%{opacity:.75}50%{opacity:1}} .wd-chip{display:inline-flex;flex-direction:column;align-items:center;width:62px;margin:3px;padding:6px 2px;border-radius:6px;border:1px solid rgba(255,255,255,.18);font-size:10.5px;text-align:center;vertical-align:top;line-height:1.15} .wd-chip i{display:block;width:30px;height:30px;border-radius:50%;margin-bottom:4px;transform:rotate(45deg);border-radius:4px} .wd-chip.on{border-color:#FFE7B0;background:rgba(255,231,176,.12)} .wd-chip.off{opacity:.45} .wd-opt{display:inline-block;margin:3px;padding:5px 9px;border-radius:14px;border:1px solid rgba(143,180,232,.45);font-size:12px} .wd-opt.on{border-color:#FFE7B0;background:rgba(255,231,176,.16);color:#FFE7B0}</style>";
function wdBladePreview(S) { return __ZC(462, 141, this, arguments, new.target); }
wdBladeCard = function () { return __ZC(462, 142, this, arguments, new.target); };
(function () {
var tb = GX_TOWN.aster;
GX_TOWN.aster = function (G, C, R, sol, hy) {
var r = tb.apply(this, arguments);
var x = C[0] + 14, z = C[1] + 8, g = mmG(G, x, hy(x, z), z, 0, -0.5, 0), wood = mmMat(0x6A4A2A, { tex: "worn", shine: 20 }), cloth = mmMat(0x2A3A6A, {});
mmSlab(g, wood, 4.2, 0.12, 1.2, 0, 0.95, 0);
[-1.9, 1.9].forEach(function (s) { mmSlab(g, wood, 0.14, 0.95, 1, s, 0.47, 0); });
mmSlab(g, cloth, 4, 0.02, 1, 0, 1.02, 0);
mmSlab(g, wood, 4.2, 2.4, 0.12, 0, 2.2, -0.55);
mmSlab(g, mmMat(0xC8A060, { shine: 70, tex: "brass" }), 4.3, 0.1, 0.18, 0, 3.42, -0.55);
var cols = [0x4A9AFF, 0xE8F4FF, 0xB070FF, 0xFF7A1E, 0x40E0B0, 0xFFD860];
WD_HILT_ORDER.forEach(function (k, i) {
var b = wdBuildBlade(cols[i], k, "steady");
b.position.set(-1.65 + i * 0.66, 1.25, -0.42);
b.rotation.set(-0.05, 0, 0);
b.scale.setScalar(1.25);
b.traverse(function (o) { if (o.isPointLight)
o.parent.remove(o); });
g.add(b);
mmCyl(g, wood, 0.06, 0.08, 0.3, -1.65 + i * 0.66, 1.12, -0.42, 0, 0, 0, 8);
});
if (!sbLite()) {
var L = new THREE.PointLight(0xFFF0D8, 0.6, 8, 2);
L.position.set(0, 2.6, 1);
g.add(L);
}
sol.push({ x: x, z: z, r: 2.2 });
SF.sites.push({ x: x, z: z, r: 3.6, name: "Corvin's rack of hilts", info: worldFacts("Corvin's rack", "Six hilts a Warden may choose", WD_HILT_ORDER.map(function (k) { return [WD_HILTS[k].name, WD_HILTS[k].about]; }), ["Change your own hilt, shard and light at Warden Corvin's bench (ask Elder Warden Teodric for your blade)."]) });
return r;
};
})();
var GX_OUT = {
sereth: { lamp: 0xC8FFB0, places: [
{ n: "The Moonwell", k: "shrine", at: [-150, -170], a: "A spring that shines at night. The Sereth say the first tree drank here." },
{ n: "The Old Cutters' Camp", k: "ruin", at: [170, -120], a: "Long ago, outsiders came to cut the giants. The Sereth sang until they left. Their camp rots quietly." },
{ n: "Seed-keepers' glade", k: "farm", at: [-120, 140], a: "Rows of young giants, only a hundred feet tall, tended by the seed-keepers." }
] },
dunmarrow: { lamp: 0xFFC870, scatter: "desert", places: [
{ n: "The Glass Wells", k: "shrine", at: [-170, -150], a: "Where lightning struck the salt for a thousand years and left glass. Water gathers under it." },
{ n: "Caravan rest at Sef", k: "camp", at: [180, -60], a: "Caravans stop here to water the beasts and trade gossip." },
{ n: "The buried ship", k: "wreck", at: [-60, 170], a: "A starship's spine sticking out of a dune. No one remembers who flew it." },
{ n: "The salt pans", k: "farm", at: [150, 150], a: "Wide white pans where the Dunfolk cut salt in blocks." }
] },
ysolde: { lamp: 0x9AE8FF, water: 1, places: [
{ n: "Lantern Rock", k: "tower", at: [-140, -120], a: "A lighthouse whose lamp, they say, listens for lies told at sea." },
{ n: "The pearl-divers' rafts", k: "dock", at: [130, -90], a: "Rafts lashed together where the divers rest between dives." },
{ n: "The drowned temple", k: "ruin", at: [60, 140], a: "An older people's temple, half under the water. Fish swim through its doors." }
] },
kharn: { lamp: 0xFF8A3A, scatter: "forge", places: [
{ n: "Slag Rise mine", k: "mine", at: [-160, -140], a: "Where the star-iron comes from, cut out by hand in this heavy gravity." },
{ n: "The Old Anvil", k: "ruin", at: [170, -170], a: "The first forge of Kharn, cracked in two by the great quake." },
{ n: "Hammer-watch", k: "tower", at: [-40, 170], a: "A squat tower where the forge-guard watches the sky for raiders." }
] },
aster: { lamp: 0xDCE6FF, scatter: "meadow", places: [
{ n: "The Hermit's Cell", k: "shrine", at: [-170, -150], a: "An old Warden lives here alone and will talk about the Quiet with anyone who sits." },
{ n: "Ruins of the First House", k: "ruin", at: [160, -180], a: "The first house of the Order, burned by the Hollow long ago." },
{ n: "The Orchard of Quiet", k: "farm", at: [-150, 120], a: "Fruit trees planted by Wardens, one for every Warden who never came home." },
{ n: "Star-stone", k: "tower", at: [170, 110], a: "A tall stone where Seekers sit through the night and learn the stars." }
] },
aurelion: { lamp: 0xFFE8B0, places: [
{ n: "The Hanging Gardens", k: "farm", at: [-170, 40], a: "Gardens on terraces between towers, where the city grows its own food." },
{ n: "The Sky Market", k: "camp", at: [170, 60], a: "Stalls from a hundred worlds under bright awnings. Everything is for sale, if you can pay." },
{ n: "The Old Senate", k: "ruin", at: [0, 180], a: "The first Senate hall, kept as a ruin so the Senate remembers it can fall." }
] },
isk: { lamp: 0xA8D8FF, scatter: "ice", places: [
{ n: "The frozen wreck", k: "wreck", at: [-170, -130], a: "A ship caught in the ice when the world froze. Its lights still glow faintly." },
{ n: "Hunters' camp", k: "camp", at: [160, -150], a: "Iskari hunters wait out the long night here, around a fire that never goes out." },
{ n: "The ice caves", k: "mine", at: [-130, 150], a: "Blue caves under the glacier. Something sings in them." },
{ n: "Aurora watch", k: "tower", at: [170, 120], a: "From the top you can watch the sky-lights for hours." }
] },
nharos: { lamp: 0xFF4A2A, scatter: "hollow", places: [
{ n: "The ember shrine", k: "shrine", at: [-160, -150], a: "Where the Hollow keep a fire of anger burning. It is very hard to look away from." },
{ n: "The broken watch", k: "tower", at: [180, -140], a: "A Warden watchtower, taken by the Hollow and left to crumble." },
{ n: "The pits", k: "ruin", at: [-180, 120], a: "Old prison pits. Empty now, mostly." },
{ n: "The cutter that fell", k: "wreck", at: [200, 180], a: "A Concord cutter shot down over Nharos. Its crew was never found." }
] },
tullimar: { lamp: 0xB8FF7A, places: [
{ n: "The racers' camp", k: "camp", at: [-160, -150], a: "Tullik racers tune their skiffs here between races." },
{ n: "The crater shrine", k: "shrine", at: [160, -150], a: "A shrine in a small crater, built round a stone that fell from the sky." }
] },
maruondo: { lamp: 0x9AF0FF, places: [
{ n: "The dune farms", k: "farm", at: [-160, -160], a: "Ondai farm the sand itself, growing glass-reeds in long rows." },
{ n: "The singing pier", k: "dock", at: [170, -120], a: "A long pier into the sea where the Ondai sing to the tide." }
] },
orr: { lamp: 0xB8C8FF, places: [
{ n: "The silent works", k: "ruin", at: [-160, -170], a: "A factory that stopped when the Orrem chose to stop. It has not moved since." },
{ n: "Relay tower", k: "tower", at: [170, -130], a: "Orr's old signal tower, still listening." }
] },
skeldmar: { lamp: 0xFF9A5A, places: [
{ n: "The long hall", k: "camp", at: [-170, -160], a: "A Hrovan feasting hall for crews home from the stars." },
{ n: "The cliff watch", k: "tower", at: [160, -150], a: "A watchtower over the red cliffs." }
] }
};
function gxOutMats(k) { return __ZC(462, 143, this, arguments, new.target); }
var GX_OUTB = {
camp: function (g, M, R, sol, x, z) { return __ZC(462, 144, this, arguments, new.target); },
ruin: function (g, M, R, sol, x, z) { return __ZC(462, 145, this, arguments, new.target); },
tower: function (g, M, R, sol, x, z, lamp) { return __ZC(462, 146, this, arguments, new.target); },
shrine: function (g, M, R, sol, x, z, lamp) { return __ZC(462, 147, this, arguments, new.target); },
wreck: function (g, M, R, sol, x, z) { return __ZC(462, 148, this, arguments, new.target); },
farm: function (g, M, R, sol, x, z, lamp, k) { return __ZC(462, 149, this, arguments, new.target); },
mine: function (g, M, R, sol, x, z, lamp) { return __ZC(462, 150, this, arguments, new.target); },
dock: function (g, M, R, sol, x, z, lamp) { return __ZC(462, 151, this, arguments, new.target); }
};
function gxTuftTex() { return __ZC(462, 152, this, arguments, new.target); }
function gxTuftGeo() { return __ZC(462, 153, this, arguments, new.target); }
function gxScatter(G, k, R, sol) { return __ZC(462, 154, this, arguments, new.target); }
function gxOutskirts(G, k) { return __ZC(462, 155, this, arguments, new.target); }
(function () {
var bt = frBuildTown;
frBuildTown = function (G, k) { var r = bt.apply(this, arguments); try {
gxOutskirts(G, k);
}
catch (e) {
console.warn("outskirts", e);
} return r; };
})();
function gxYsOn(x, z) {
if (SF.k !== "ysolde" || !SF.ysWalk)
return false;
return SF.ysWalk.some(function (w) { var px = x - w.ax, pz = z - w.az, t = px * w.ux + pz * w.uz; if (Math.hypot(x - w.px, z - w.pz) < 20.5)
return true; if (t < -16 || t > w.L)
return false; return Math.abs(px * w.uz - pz * w.ux) < 1.3; });
}
(function () {
var W = WORLDS.surface;
if (!W)
return;
var bl = W.block;
W.block = function (x, z) { if (gxYsOn(x, z) && Math.hypot(x - FR_TOWN.ysolde.center[0], z - FR_TOWN.ysolde.center[1]) > 40) {
var k = SF.k;
SF.k = "ysolde~walk";
try {
return bl ? bl.apply(this, arguments) : false;
}
finally {
SF.k = k;
}
} return bl ? bl.apply(this, arguments) : false; };
var gr = W.ground;
if (gr)
W.ground = function (x, z) { if (gxYsOn(x, z) && Math.hypot(x - FR_TOWN.ysolde.center[0], z - FR_TOWN.ysolde.center[1]) > 44)
return 0.6; return gr.apply(this, arguments); };
var sb = sfBuild;
sfBuild = function () { SF.ysWalk = null; return sb.apply(this, arguments); };
})();
var HL_STEPS_W = HL_STEPS.slice();
var HL_STEPS_H = HL_STEPS_W.slice(0, 5).concat([
"You are pledged to the Hollow. Prove yourself to Vael: on Aster Still, beat the Warden sentinels on the training floors.",
"Vael sends the Hollow fleet against Aurelion. Fly with it and break the Concord's guard in Aurelion's sky.",
"Mother Ilvane is gathering the last Wardens on Sereth Vale. Land there and face her among the giant trees.",
"Ilvane has yielded. Decide what you are.",
"It is done. The galaxy will remember which way you turned."
]);
var WD_RANKS_H = ["Not of the Hollow", "Ember-Bound", "Kindled in Ash", "Hollow Blade", "Hand of the Hollow", "Hollow Lord"];
var WD_GIFT_W = {}, WD_GIFT_H = { push: ["Crush", "Hurls foes back hard, and frightens them."], leap: ["Rage-Leap", "A furious leap, far and high."], sense: ["Dread Sight", "Shows hidden things, and the fear in people."], turn: ["Turn the Bolt", "Guard just as a bolt reaches you and send it back."], calm: ["Command", "Orders a foe to kneel, and they do."], pull: ["Seize", "Tears a weapon or a foe toward you."], mend: ["Drain", "Mends you by drawing strength from the nearest foe."] };
Object.keys(WD_GIFTS).forEach(function (g) { WD_GIFT_W[g] = [WD_GIFTS[g].name, WD_GIFTS[g].about]; });
function wdPath() { return wdGet().path === "hollow" ? "hollow" : "warden"; }
function wdHollow() { return wdPath() === "hollow"; }
function wdApplyPath() {
var h = wdHollow(), src = h ? HL_STEPS_H : HL_STEPS_W;
HL_STEPS.length = 0;
src.forEach(function (s) { HL_STEPS.push(s); });
Object.keys(WD_GIFTS).forEach(function (g) { var t = (h ? WD_GIFT_H : WD_GIFT_W)[g]; if (t) {
WD_GIFTS[g].name = t[0];
WD_GIFTS[g].about = t[1];
} });
if (typeof wdPadPaint === "function")
try {
wdPadPaint();
}
catch (e) { }
}
setTimeout(function () { try {
wdApplyPath();
}
catch (e) { } }, 0);
(function () {
var rk = wdRank;
wdRank = function () { if (!wdHollow())
return rk.apply(this, arguments); var S = wdGet(); return S.end === "claimed" ? WD_RANKS_H[5] : (WD_RANKS_H[S.rank] || WD_RANKS_H[1]); };
var hs = hlStep;
hlStep = function () { var n = hs.apply(this, arguments); return (wdHollow() && n >= 5 && n < 9) ? 4.5 : n; };
var rp = wdRipple;
wdRipple = function (x, z, col) { return rp.call(this, x, z, wdHollow() ? 0xFF5A2A : col); };
var gf = wdGift;
wdGift = function (g) {
var r = gf.apply(this, arguments);
if (r && wdHollow() && g === "mend") {
var L = wdLocal(), best = null, bd = 9;
WD.foes.forEach(function (F) { var d = Math.hypot(F.x - L.x, F.z - L.z); if (d < bd && !F.yield && F.kind !== "drone") {
best = F;
bd = d;
} });
if (best) {
best.hp -= 18;
best.stun = 1;
if (best.hp <= 0)
wdYield(best);
sbSay("You draw the strength out of " + sbEsc(best.name) + ". They stagger.");
}
}
if (r && wdHollow() && (g === "push" || g === "calm") && !WD.toldDark) {
WD.toldDark = 1;
wdBal(-1);
}
return r;
};
})();
function hlToH(n, say) { var S = hlGet(); if (S.step >= n)
return; S.step = n; hlSave(); setTimeout(function () { sbSay((say ? say + " " : "") + "<br><b>The Hollow · " + n + " of 9.</b> " + sbEsc(HL_STEPS_H[n] || "")); sbTone(330, 0.3); setTimeout(function () { sbTone(220, 0.45); }, 240); }, 1800); }
function wdChoiceCard(from) { return __ZC(462, 156, this, arguments, new.target); }
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (!SF.k || !WORLDS.surface || WLD.on !== "surface")
return r;
var L = worldLocal(), S = wdGet();
if (SF.k === "aurelion" && SF.senPods && hlGet().step === 5 && !wdHollow() && S.blade && !(WD.sense > 0)) {
var P = SF.senPods.filter(function (x) { return x.S.hollow; })[0];
if (P && Math.hypot(L.x - P.x, L.z - P.z) < 6)
worldPrompt("<b>Senator Venn</b> catches your eye and nods you closer · <b>press E</b>", function () { wdChoiceCard("venn"); });
}
if (SF.k === "aurelion" && wdHollow() && !SF.hlFight)
SF.hlFight = { done: 1 };
var O = GX_OUT[SF.k];
if (O && SF.k === "nharos") {
var p = O.places[0];
if (Math.hypot(L.x - p.at[0], L.z - p.at[1]) < 5)
worldPrompt("<b>The ember fire</b> · <b>press E</b> to listen to it", function () { wdChoiceCard("ember"); });
}
if (O && SF.k === "aster") {
var q = O.places[0];
if (Math.hypot(L.x - q.at[0], L.z - q.at[1]) < 6)
worldPrompt("<b>The Hermit's Cell</b> · <b>press E</b> to sit with the old Warden", function () { wdChoiceCard("hermit"); });
}
wdHollowTick(L);
}
catch (e) {
if (!WD.pathWarn) {
WD.pathWarn = 1;
console.warn("path", e);
}
}
return r;
};
})();
function wdTintFoe(F, col, name) { if (!F)
return F; if (name)
F.name = name; var b = F.g && F.g.userData.weap; if (b)
b.traverse(function (o) { if (o.isMesh && o.material && o.material.blending === THREE.AdditiveBlending) {
o.material = o.material.clone();
o.material.color.setHex(col);
} }); return F; }
function wdHollowTick(L) { return __ZC(462, 157, this, arguments, new.target); }
(function () {
var sb = sfBuild;
sfBuild = function () { SF.hhSent = null; SF.hhIl = null; SF.hhNh = 0; return sb.apply(this, arguments); };
var lb = wdLawBlade;
wdLawBlade = function () { if (wdHollow() && SF.k === "sereth" && hlGet().step === 7)
return true; if (wdHollow() && SF.k === "aster" && hlGet().step === 5)
return true; return lb.apply(this, arguments); };
var bd = wdBossDown;
wdBossDown = function (F) {
if (!(F && F.hh))
return bd.apply(this, arguments);
hlToH(8);
setTimeout(function () {
var fns = {}, h = worldFacts("Mother Ilvane yields", "On her knees among the roots of the giants", [], ["She lets her blade go out. \"I will not fight you any more. But I will not stop loving you either.\"", "Vael's voice, hot in your head: \"Finish it. Then come and take your place.\""]);
h += worldBtn("claim", "🔥 Claim your place in the Hollow", "Leave her, go to Nharos, and stand at Vael's right hand as Hollow Lord");
h += worldBtn("return", "☮ Put your blade down and stay", "Turn back to the Quiet, here, with her");
fns.claim = function () {
worldCard(null);
var S = wdGet();
S.end = "claimed";
S.rank = Math.max(S.rank, 4);
hlToH(9);
wdSave();
wdBal(-10);
sbSay("<b>You turn your back on her.</b> The trees lean away from you as you walk. On Nharos, Vael Ashkarran kneels, and the whole Hollow kneels with him. You are <b>Hollow Lord</b>. The Concord will hunt you to the edge of the stars.");
};
fns["return"] = function () {
worldCard(null);
var S = wdGet();
S.path = "warden";
S.end = "returned";
S.rank = Math.max(S.rank, 4);
S.bal = Math.max(S.bal || 0, 10);
hlGet().step = 9;
hlSave();
wdSave();
wdApplyPath();
sbSay("<b>You put your blade down.</b> Ilvane takes your hands. Far away, on Nharos, Vael Ashkarran feels his strongest servant go quiet, and for the first time in years he is afraid. Teodric names you <b>Elder Warden</b>: the one who came back.");
};
worldCard(h, fns);
}, 1500);
};
})();
function wdConcordTint(F) { if (!F || !F.g || F.cc)
return; F.cc = 1; F.g.traverse(function (o) { if (o.isMesh && o.material && !(o.userData && o.userData.sbFlame)) {
var m = o.material.clone();
if (m.color)
m.color.lerp(new THREE.Color(0xE8EEF8), 0.6);
if (m.emissive)
m.emissive.setHex(0x0A2A5A);
o.material = m;
} }); }
(function () {
var ss = sbStrike;
sbStrike = function (o) {
var r = ss.apply(this, arguments);
try {
var B = SB.battle;
if (wdHollow() && B && !B.hl && !B.hh && !HOL.noCC) {
B.foeName = "Concord bounty hunters";
SB.foes.forEach(function (F) { wdConcordTint(F); F.name = F.name && /raider|Hollow/i.test(F.name) ? "A Concord hunter" : F.name; });
for (var i = 0; i < 2; i++) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i - 0.5) * 90, 30, 120)), "ally", "Hollow wing");
if (A)
hlTint(A);
}
sbSay("<b>Concord bounty hunters!</b> There is a price on the Hollow, and on you. Two Hollow ships drop in beside you.");
}
}
catch (e) { }
return r;
};
var ct = sbCombatTick;
sbCombatTick = function (dt) {
try {
if (wdHollow() && hlGet().step === 6 && frIn() && !SB.battle && !GX.jumping && FR.sys === "aurelion" && !HOL.hhSky && SP.pos.distanceTo(frWorld("aurelion")) < FR_BY.aurelion.r * 8) {
HOL.hhSky = 1;
HOL.noCC = 1;
try {
sbStrike({ why: "hh_sky", ahead: 700, n: 6, gunship: true, noAllies: true });
}
finally {
HOL.noCC = 0;
}
var B = SB.battle;
if (B) {
B.hh = "hh_sky";
B.hl = "hh_sky";
B.foeName = "The Concord guard";
SB.foes.forEach(wdConcordTint);
for (var i = 0; i < 6; i++) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i - 2.5) * 110, 40, 150)), "ally", "Hollow ship");
if (A)
hlTint(A);
}
B.allies = 1;
sbSay("<b>The Hollow fleet drops out of light speed all round you.</b> Ahead, the Concord's white cutters rise from Aurelion to meet you. Break their guard!");
}
}
}
catch (e) { }
return ct.apply(this, arguments);
};
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
if (B && B.hh === "hh_sky") {
if (how === "won")
hlToH(7, "<b>The Concord's guard is broken.</b> The Senate hides in its dome. Vael: \"One more. The old woman on Sereth.\"");
else
HOL.hhSky = 0;
}
}
catch (e) { }
return r;
};
})();
(function () {
var oc = wdOrderCard;
wdOrderCard = function (site) {
if (!wdHollow())
return oc.apply(this, arguments);
var S = wdGet(), fns = {};
var h = worldFacts(site.talk ? site.talk.name : "Elder Warden Teodric", "Eldest of the Order of the Quiet Star", [["You are", wdRank() + " of the Hollow"]], ["Teodric looks at you for a long time. \"You smell of ash,\" he says. \"The Order will not teach you, and I will not fight you here. The Hermit's Cell is open to anyone who wants to come back.\""]);
h += worldBtn("blade", "⚔ Your starblade", "Corvin will still mend a blade. He says nothing while he works.");
fns.blade = function () { wdBladeCard(); };
worldCard(h, fns);
};
var lc = frLogCard;
frLogCard = function () {
lc.apply(this, arguments);
try {
if (!wdHollow())
return;
var c = document.querySelector(".world-card,#world-card") || (WLD && WLD.card);
if (!c)
return;
var n = hlGet().step;
c.querySelectorAll("div").forEach(function (d) { if (/^The Hollow · /.test(d.textContent) && d.querySelector("b")) {
d.innerHTML = "<b style='color:#FF8A6A'>The Hollow · " + n + " of 9 · your path: the Hollow</b><br>" + sbEsc(HL_STEPS_H[n] || "") + "<br><span style='opacity:.8'>You are " + sbEsc(wdRank()) + " · " + Object.keys(wdGet().gifts).length + " of 7 gifts</span>";
} });
}
catch (e) { }
};
})();
function gxShipLevel(p, lv) { var n = typeof frStand === "function" ? frStand(p) : 0; return n >= (lv === "Honoured" ? 60 : lv === "Friend" ? 10 : 30); }
var SB_GXB = {
bladeship: function () { var g = new THREE.Group(); gxBladeShip(g, (wdGet && wdGet().blade) || 0x8AC8FF); return g; },
ashfang: function () { return __ZC(462, 158, this, arguments, new.target); },
hammer: function () { return __ZC(462, 159, this, arguments, new.target); },
skiff: function () { return frAllyShip("skiff"); },
longship: function () { return frAllyShip("longship"); },
racer: function () { return __ZC(462, 160, this, arguments, new.target); },
hauler: function () { return __ZC(462, 161, this, arguments, new.target); },
concord: function () { return sbBuildCutter(0xF6F4EE, 0xD8B060); },
tideray: function () { return __ZC(462, 162, this, arguments, new.target); },
icerunner: function () { return __ZC(462, 163, this, arguments, new.target); }
};
Object.assign(SB_SHIPS, {
bladeship: { name: "A Warden blade-ship", short: "Blade-ship", icon: "🗡️", own: "gx:warden", len: 24, hull: 200, shield: 200, spd: 1.3, gun: "blade lances", shot: "arc", dmg: 16, cool: 0.3, n: 2, cpit: "mm:*",
how: "Given by the Order of the Quiet Star to a Warden (rank Warden, the Quiet path)", can: function () { return wdGet().rank >= 3 && !wdHollow(); },
about: "One long blade of a hull with a ring engine glowing in your own blade's colour. Fast, balanced, and beautiful." },
ashfang: { name: "A Hollow ashfang", short: "Ashfang", icon: "🦂", own: "gx:hollow", len: 16, hull: 150, shield: 120, spd: 1.5, gun: "ember spikes", shot: "fire", dmg: 18, cool: 0.26, n: 2, cpit: "mm:*",
how: "Given by the Hollow to one of its own (Kindled in Ash or higher, the Hollow path)", can: function () { return wdHollow() && wdGet().rank >= 2; },
about: "A black fang of a ship with ember seams. The fastest hull in the galaxy, and the most frightening to see behind you." },
hammer: { name: "A Kharn hammership", short: "Hammership", icon: "🔨", own: "gx:kharn", len: 20, hull: 340, shield: 120, spd: 0.85, gun: "forge cannons", shot: "rail", dmg: 26, cool: 0.6, n: 2, cpit: "mm:*",
how: "The Kharn give one to an Ally of the forge", can: function () { return gxShipLevel("kharn"); },
about: "Star-iron plate, a prow like a hammer's head, furnaces you can see glowing through the vents. Slow, and almost impossible to break." },
skiff: { name: "A Veyari skiff", short: "Veyari skiff", icon: "🪷", own: "gx:veyari", len: 14, hull: 110, shield: 200, spd: 1.25, gun: "light-lances", shot: "ion", dmg: 20, cool: 0.55, n: 1, cpit: "mm:*",
how: "The Veyari give one to an Ally", can: function () { return gxShipLevel("veyari"); },
about: "Pearl and violet light; the Veyari grow these rather than build them. Huge shields for its size." },
longship: { name: "A Hrovan longship", short: "Longship", icon: "⛵", own: "gx:hrovan", len: 18, hull: 260, shield: 140, spd: 1.0, gun: "broadside guns", shot: "laser", dmg: 12, cool: 0.18, n: 3, cpit: "mm:*",
how: "The Hrovan give one to an Ally", can: function () { return gxShipLevel("hrovan"); },
about: "A stone-and-iron hull with a war-banner on its mast. Fires a broadside of three." },
racer: { name: "A Tullik racer", short: "Tullik racer", icon: "🏎️", own: "gx:tullik", len: 13, hull: 90, shield: 90, spd: 1.6, gun: "needle guns", shot: "plasma", dmg: 10, cool: 0.16, n: 2, cpit: "mm:*",
how: "The Tullik give one to an Ally (they say it is a loan; it is not)", can: function () { return gxShipLevel("tullik"); },
about: "A needle with two outrigger engines. The fastest thing in the Reach, and it knows it." },
hauler: { name: "A Drifter hauler", short: "Hauler", icon: "🚚", own: "gx:drifters", len: 22, hull: 380, shield: 100, spd: 0.8, gun: "salvaged turret", shot: "laser", dmg: 12, cool: 0.2, n: 1, turret: true, cpit: "mm:*",
how: "The Drifters of the Driftward give one to an Ally", can: function () { return gxShipLevel("drifters"); },
about: "Containers in every colour, an old cabin up front, three engines and a turret that turns to wherever you look." },
concord: { name: "A Concord cutter", short: "Concord cutter", icon: "🏛️", own: "gx:concord", len: 13, hull: 150, shield: 150, spd: 1.2, gun: "twin phasers", shot: "phaser", dmg: 13, cool: 0.24, n: 2, cpit: "mm:*",
how: "The Concord gives one to an Ally of the Senate", can: function () { return gxShipLevel("concord") && !wdHollow(); },
about: "White and gold, the Senate's own patrol cutter. Welcome in any port of the Concord." },
tideray: { name: "A Merrowin tide-ray", short: "Tide-ray", icon: "🐋", own: "gx:merrowin", len: 16, hull: 170, shield: 170, spd: 1.15, gun: "tide pulses", shot: "ring", dmg: 14, cool: 0.36, n: 1, cpit: "mm:*",
how: "The Merrowin of Ysolde give one to an Ally", can: function () { return gxShipLevel("merrowin"); },
about: "Shaped like the great rays of Ysolde's sea, with lights along its wings and a long tail." },
icerunner: { name: "An Iskari ice-runner", short: "Ice-runner", icon: "❄️", own: "gx:iskari", len: 15, hull: 140, shield: 160, spd: 1.3, gun: "frost lances", shot: "frost", dmg: 15, cool: 0.3, n: 2, cpit: "mm:*",
how: "The Iskari give one to an Ally", can: function () { return gxShipLevel("iskari"); },
about: "Cut from clear ice that never melts, lit from within. Cold to fly, and quiet as snow." }
});
["bladeship", "ashfang", "hammer", "skiff", "longship", "racer", "hauler", "concord", "tideray", "icerunner"].forEach(function (k) { if (SB_ORDER.indexOf(k) < 0)
SB_ORDER.push(k); });
var GX_TRAFFIC = { reach: ["skiff", "longship", "racer", "concord", "hauler"], corvanne: ["hauler", "concord", "racer", "hauler"], hallowmere: ["tideray", "hammer", "hauler", "tideray"],
lantern: ["bladeship", "concord", "bladeship"], aurelion: ["concord", "concord", "skiff", "hauler", "tideray", "hammer", "racer", "icerunner"], shatterline: ["ashfang", "ashfang", "hauler"], wanderers: ["hauler", "hauler", "racer", "longship"] };
function gxTrafficModel(k) { GX.tm = GX.tm || {}; if (!GX.tm[k]) {
var D = SB_SHIPS[k], g = null;
try {
g = SB_GXB[k]();
}
catch (e) {
g = sbBuildCutter();
}
GX.tm[k] = sbFit(g, D.len * 1.6);
} var c = GX.tm[k].clone(true); return c; }
(function () {
var fb = frBuild;
frBuild = function (G) {
var was = FR.g, r = fb.apply(this, arguments);
try {
if (FR.g && FR.g !== was) {
var list = GX_TRAFFIC[FR.sys] || [], R = wRand(FR.sys.length * 71), bodies = FR_BODIES.filter(function (b) { return !b.star; });
FR.traffic = [];
var n = Math.min(list.length * (sbLite() ? 1 : 2), sbLite() ? 5 : 12);
for (var i = 0; i < n && bodies.length; i++) {
var k = list[i % list.length], m = gxTrafficModel(k), A = bodies[Math.floor(R() * bodies.length)], B = bodies[Math.floor(R() * bodies.length)];
FR.g.add(m);
FR.traffic.push({ m: m, a: A.k, b: B.k, rA: (A.r || 40) * (2.4 + R() * 2.5), rB: (B.r || 40) * (2.4 + R() * 2.5), t: R(), spd: 0.006 + R() * 0.01, lane: A.k !== B.k && R() < 0.6, ph: R() * 6.28, up: (R() - 0.5) * 0.6 });
}
}
}
catch (e) {
console.warn("traffic", e);
}
return r;
};
var st = spTick;
spTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (FR.traffic && FR.g && FR.g.parent && frIn()) {
var p = new THREE.Vector3(), q = new THREE.Vector3();
FR.traffic.forEach(function (T) {
T.t += dt * T.spd;
var pa = frBodyPos(T.a);
if (T.lane) {
var pb = frBodyPos(T.b), u = (Math.sin(T.t * Math.PI * 2) + 1) / 2;
pa.add(new THREE.Vector3(T.rA, T.rA * T.up, 0));
pb.add(new THREE.Vector3(-T.rB, T.rB * T.up, 0));
p.copy(pa).lerp(pb, u);
q.copy(pb).sub(pa).multiplyScalar(Math.cos(T.t * Math.PI * 2) > 0 ? 1 : -1);
}
else {
var a = T.ph + T.t * Math.PI * 2;
p.set(pa.x + Math.cos(a) * T.rA, pa.y + Math.sin(a * 0.5) * T.rA * T.up, pa.z + Math.sin(a) * T.rA);
q.set(-Math.sin(a), 0, Math.cos(a));
}
T.m.position.copy(p);
if (q.lengthSq() > 0.01)
T.m.lookAt(p.clone().sub(q));
});
}
}
catch (e) { }
return r;
};
})();
var GX_QUESTS = {
sereth: { world: "sereth", sys: "corvanne", q: [
{ n: "The Moonwell's song", say: "The Moonwell has gone quiet. Go and listen to it, then bring back moon-moss from round its stones.", steps: [["visit", "sereth", 0, "Go to the Moonwell, out among the giants"], ["gather", "sereth", 0, 6, "moon-moss", 0xC8FFB0], ["talk", "sereth", "Bring the moss to Mother Ilvane"]] },
{ n: "The cutters' ghosts", say: "Someone has been camping in the old cutters' ruin, and the trees are frightened.", steps: [["visit", "sereth", 1, "Go to the Old Cutters' Camp"], ["foes", "sereth", 1, 4, "Drive off the poachers at the ruin"], ["talk", "sereth", "Tell Mother Ilvane"]] },
{ n: "Seeds for the glade", say: "The seed-keepers need seeds from the Glasswing swarm, which carries them on the starlight.", steps: [["fly", "corvanne", "glasswing", "Fly to the Glasswing swarm in Corvanne"], ["visit", "sereth", 2, "Carry the seeds to the seed-keepers' glade"]] },
{ n: "Ormund's storm-eye", say: "Ormund's great storm is turning the wrong way. Fly close and look, and come back alive.", steps: [["fly", "corvanne", "ormund", "Fly close to Ormund"], ["win", "corvanne", "Raiders are using the storm as cover: beat them"], ["talk", "sereth", "Report to Mother Ilvane"]] }
] },
dunfolk: { world: "dunmarrow", sys: "corvanne", q: [
{ n: "Water from glass", say: "The Glass Wells hold the cleanest water on Dunmarrow. The caravans need it.", steps: [["visit", "dunmarrow", 0, "Go to the Glass Wells"], ["gather", "dunmarrow", 0, 5, "glass-water flasks", 0x9AE8FF], ["visit", "dunmarrow", 1, "Take the flasks to the caravan rest at Sef"]] },
{ n: "The buried ship", say: "Thieves are digging at the buried ship. What they find, they sell to the raiders.", steps: [["visit", "dunmarrow", 2, "Go to the buried ship"], ["foes", "dunmarrow", 2, 5, "Stop the diggers"], ["talk", "dunfolk", "Tell Sahra Duneborn"]] },
{ n: "Salt for the Senate", say: "A load of salt is due on Aurelion, and the hauler pilot is sick.", steps: [["visit", "dunmarrow", 3, "Load the salt at the salt pans"], ["land", "aurelion", "Deliver it to Aurelion"]] },
{ n: "The caravan in the sky", say: "A caravan of haulers leaves Corvanne today. Raiders always come.", steps: [["win", "corvanne", "Guard the caravan in Corvanne's sky"], ["visit", "dunmarrow", 1, "Come back to Sef for the feast"]] }
] },
merrowin: { world: "ysolde", sys: "hallowmere", q: [
{ n: "Lantern Rock", say: "The lamp on Lantern Rock has gone dark. Walk out and look.", steps: [["visit", "ysolde", 0, "Walk out to Lantern Rock"], ["gather", "ysolde", 0, 4, "lamp-shells", 0xFFE8A0], ["talk", "merrowin", "Bring the shells to Healer Ondessa"]] },
{ n: "Pearls and liars", say: "Someone is selling false pearls at the divers' rafts.", steps: [["visit", "ysolde", 1, "Go to the pearl-divers' rafts"], ["foes", "ysolde", 1, 3, "Catch the false-pearl sellers"]] },
{ n: "The drowned temple", say: "Something glows inside the drowned temple. The old ones say leave it. The young ones say look.", steps: [["visit", "ysolde", 2, "Walk out to the drowned temple"], ["gather", "ysolde", 2, 5, "temple-lights", 0x9AF0FF], ["fly", "hallowmere", "starwhale", "Take them to the star-whales, who know what they are"]] },
{ n: "The whales' road", say: "Raiders are hunting the star-whales.", steps: [["fly", "hallowmere", "starwhale", "Fly to the star-whales"], ["win", "hallowmere", "Drive the whale-hunters off"], ["talk", "merrowin", "Tell Healer Ondessa they are safe"]] }
] },
kharn: { world: "kharn", sys: "hallowmere", q: [
{ n: "Star-iron", say: "The forge is hungry. Bring star-iron out of Slag Rise.", steps: [["visit", "kharn", 0, "Go to Slag Rise mine"], ["gather", "kharn", 0, 6, "star-iron lumps", 0xD8E0E8], ["talk", "kharn", "Bring it to Forge-Mother Durra"]] },
{ n: "The Old Anvil", say: "Raiders camp at the Old Anvil. That is an insult.", steps: [["visit", "kharn", 1, "Go to the Old Anvil"], ["foes", "kharn", 1, 5, "Throw them out"]] },
{ n: "The lost rig", say: "A mining rig went silent out past Mere.", steps: [["fly", "hallowmere", "kharnrig", "Find the lost rig"], ["win", "hallowmere", "Whoever took it is still there: beat them"], ["visit", "kharn", 2, "Report at Hammer-watch"]] },
{ n: "Hammer and Senate", say: "The Senate wants Kharn iron for its new cutters. Durra wants to see the Senate first.", steps: [["land", "aurelion", "Go to Aurelion"], ["talk", "concord", "Speak to the First Speaker for Kharn"], ["talk", "kharn", "Bring the answer to Durra"]] }
] },
wardens: { world: "aster", sys: "lantern", q: [
{ n: "Tea with the Hermit", say: "Teodric wants you to sit with the Hermit. Just sit.", steps: [["visit", "aster", 0, "Go to the Hermit's Cell"], ["gather", "aster", 0, 4, "tea-flowers", 0xF0E8FF], ["talk", "wardens", "Come back to Teodric"]] },
{ n: "Ashes of the First House", say: "Find the names on the stones of the First House, so the Order can remember them.", steps: [["visit", "aster", 1, "Go to the ruins of the First House"], ["gather", "aster", 1, 6, "name-stones", 0xDCE6FF], ["visit", "aster", 3, "Read them aloud at the Star-stone"]] },
{ n: "The fallen outpost", say: "An outpost of the Order fell in the Lantern. Bring its last log home.", steps: [["fly", "lantern", "outpost", "Find the fallen outpost"], ["win", "lantern", "The Hollow left watchers: beat them"], ["visit", "aster", 2, "Plant a tree for its Wardens in the Orchard"]] },
{ n: "The Lantern's heart", say: "Every Warden goes once to the Lantern's heart.", steps: [["fly", "lantern", "lanternheart", "Fly to the Lantern's heart"], ["visit", "aster", 3, "Sit through the night at the Star-stone"]] }
] },
concord: { world: "aurelion", sys: "aurelion", q: [
{ n: "The Sky Market", say: "Smugglers sell stolen Senate seals at the Sky Market.", steps: [["visit", "aurelion", 1, "Go to the Sky Market"], ["foes", "aurelion", 1, 4, "Catch the smugglers (the guard allows it)"]] },
{ n: "Gardens for the city", say: "The Hanging Gardens need sun-seed from Aurel.", steps: [["fly", "aurelion", "aurel", "Fly close to Aurel's light"], ["visit", "aurelion", 0, "Bring the sun-seed to the Hanging Gardens"]] },
{ n: "The Archive", say: "The Archive has lost a book. It is a very big book.", steps: [["fly", "aurelion", "archive", "Fly to the Archive of a Thousand Suns"], ["land", "isk", "Its last borrower lived on Isk"], ["visit", "isk", 1, "Ask at the hunters' camp"]] },
{ n: "Guard of the Beacon", say: "The Senate's Beacon is under attack.", steps: [["fly", "aurelion", "beacon", "Fly to the Beacon"], ["win", "aurelion", "Defend it"], ["visit", "aurelion", 2, "Be thanked at the Old Senate"]] }
] },
iskari: { world: "isk", sys: "shatterline", q: [
{ n: "The frozen wreck", say: "The frozen wreck's lights are getting brighter.", steps: [["visit", "isk", 0, "Go to the frozen wreck"], ["gather", "isk", 0, 5, "ice-cells", 0xA8D8FF], ["talk", "iskari", "Bring them to Herd-Chief Ulvra"]] },
{ n: "Hunters' fire", say: "The hunters' fire must not go out. Bring fuel.", steps: [["visit", "isk", 2, "Cut fuel-crystal in the ice caves"], ["gather", "isk", 2, 6, "fuel-crystals", 0xFFB070], ["visit", "isk", 1, "Bring them to the hunters' camp"]] },
{ n: "Aurora watch", say: "Something moves in the sky-lights.", steps: [["visit", "isk", 3, "Climb to Aurora watch"], ["win", "shatterline", "Hollow scouts in the aurora: beat them"]] },
{ n: "Cold friends", say: "The Iskari want to send a gift to the Kharn. Nobody has ever done that.", steps: [["visit", "isk", 1, "Collect the gift at the hunters' camp"], ["land", "kharn", "Take it to Kharn's Anvil"], ["talk", "kharn", "Give it to Forge-Mother Durra"]] }
] },
unhollowed: { world: "nharos", sys: "shatterline", q: [
{ n: "The pits", say: "Sera Vant's people were kept in the pits. Some of their things are still there.", steps: [["visit", "nharos", 2, "Go to the pits"], ["gather", "nharos", 2, 5, "keepsakes", 0xFFD890], ["talk", "unhollowed", "Bring them to Sera Vant"]] },
{ n: "The cutter that fell", say: "The Concord cutter that fell on Nharos had a crew. Sera Vant wants to know what happened.", steps: [["visit", "nharos", 3, "Go to the fallen cutter"], ["foes", "nharos", 3, 4, "Scavengers are stripping it: stop them"]] },
{ n: "The listening-spire", say: "The Hollow's listening-spire hears everything said in the Senate.", steps: [["fly", "shatterline", "spire", "Fly to the listening-spire"], ["win", "shatterline", "Fight off its guards"]] },
{ n: "A broken Warden", say: "A Warden ship lies broken in the Shatterline. Sera Vant says someone may still be alive.", steps: [["fly", "shatterline", "wardenship", "Find the broken Warden ship"], ["land", "aster", "Bring the survivor to Aster Still"], ["talk", "wardens", "Tell Teodric"]] }
] },
drifters: { world: "driftward", sys: "wanderers", q: [
{ n: "Lights under the ice", say: "Lights move under Umbra's ice. The Drifters want to know if they are friendly.", steps: [["fly", "wanderers", "umbralight", "Fly to the lights under Umbra's ice"], ["talk", "drifters", "Tell Captain Rook on the Driftward"]] },
{ n: "The lost water-hauler", say: "A water-hauler went missing between the stars.", steps: [["fly", "corvanne", "buoy", "Find its message buoy in Corvanne"], ["win", "corvanne", "The raiders who took it are still near"], ["land", "driftward", "Bring the crew home to the Driftward"]] },
{ n: "Trade run", say: "The Driftward needs salt, iron and ice. Bring something from each.", steps: [["land", "dunmarrow", "Salt from Dunmarrow"], ["land", "kharn", "Iron from Kharn"], ["land", "isk", "Ice from Isk"], ["land", "driftward", "Back to the Driftward"]] },
{ n: "The fleet moves", say: "The Driftward is moving to a new star. It needs an escort.", steps: [["win", "wanderers", "Guard the fleet as it moves"], ["talk", "drifters", "Be thanked by Captain Rook"]] }
] }
};
var GX_PEOPLE_LEAD = { sereth: "sereth", dunfolk: "dunmarrow", merrowin: "ysolde", kharn: "kharn", wardens: "aster", concord: "aurelion", iskari: "isk", unhollowed: "nharos", drifters: "driftward" };
var GQ = { s: null, tick: 0 };
function gqGet() { if (GQ.s)
return GQ.s; try {
GQ.s = JSON.parse(localStorage.getItem("gx.q") || "null");
}
catch (e) { } GQ.s = GQ.s || { done: {}, act: {} }; return GQ.s; }
function gqSave() { try {
localStorage.setItem("gx.q", JSON.stringify(GQ.s));
}
catch (e) { } }
function gqQ(id) { var p = id.split("_"); var C = GX_QUESTS[p[0]]; return C && C.q[+p[1]]; }
function gqStepText(st) { return st[st.length - 1] && typeof st[st.length - 1] === "string" ? st[st.length - 1] : (st[0] === "gather" ? "Gather " + st[3] + " " + st[4] : ""); }
function gqSite(k) { return __ZC(462, 164, this, arguments, new.target); }
function gqStepLine(st) { if (st[0] === "gather")
return "Gather " + st[3] + " " + st[4] + " at " + GX_OUT[st[1]].places[st[2]].n; if (st[0] === "foes")
return st[4]; return st[3] || st[2]; }
function gqStart(id) {
var S = gqGet(), Q = gqQ(id);
if (!Q || S.done[id])
return;
S.act[id] = { i: 0, n: 0 };
gqSave();
worldCard(null);
sbTone(523, 0.15);
sbSay("<b>" + sbEsc(Q.n) + ".</b> " + sbEsc(Q.say) + "<br>First: <b>" + sbEsc(gqStepLine(Q.steps[0])) + "</b>. (Your tasks are in the Star Log.)");
}
function gqNext(id, say) { return __ZC(462, 165, this, arguments, new.target); }
(function () {
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
var p = site.frLead.p, C = GX_QUESTS[p];
if (!C)
return r;
var S = gqGet();
Object.keys(S.act).forEach(function (id) { var Q = gqQ(id), st = Q && Q.steps[S.act[id].i]; if (st && st[0] === "talk" && st[1] === p)
setTimeout(function () { gqNext(id); }, 400); });
var c = WLD.card;
if (!c || c.style.display === "none")
return r;
var done = C.q.filter(function (q, i) { return S.done[p + "_" + i]; }).length, d = document.createElement("div");
d.setAttribute("data-w", "gq");
d.setAttribute("role", "button");
d.tabIndex = 0;
d.style.cssText = "margin:6px 0;padding:7px 10px;border:1px solid rgba(255,214,138,.55);border-radius:4px;background:rgba(255,214,138,.08);cursor:pointer";
d.innerHTML = "<b>📜 Their tasks (" + done + " of " + C.q.length + " done)</b><div style='opacity:.75;font-size:12px'>Work that takes you across their world and their sky</div>";
d.onclick = function (ev) { ev.stopPropagation(); gqCard(p); };
c.appendChild(d);
}
catch (e) {
console.warn("quests", e);
}
return r;
};
})();
function gqCard(p) { return __ZC(462, 166, this, arguments, new.target); }
function gqTick(dt) { return __ZC(462, 167, this, arguments, new.target); }
function gqSpawnItems(id, st, P) { return __ZC(462, 168, this, arguments, new.target); }
(function () {
var st = sfTick;
sfTick = function (dt) { var r = st.apply(this, arguments); try {
gqTick(dt);
if (SF.gqItems)
SF.gqItems.list.forEach(function (it, i) { if (!it.got)
it.m.position.y = it.y + Math.sin(WLD.t * 2 + i) * 0.12; });
}
catch (e) {
if (!GQ.w) {
GQ.w = 1;
console.warn("quests", e);
}
} return r; };
var sp = spTick;
spTick = function (dt) { var r = sp.apply(this, arguments); try {
if (WLD.on === "space")
gqTick(dt);
}
catch (e) { } return r; };
var sb = sfBuild;
sfBuild = function () { SF.gqItems = null; SF.gqFoes = null; var S = gqGet(); Object.keys(S.act).forEach(function (id) { S.act[id].spawned = 0; }); return sb.apply(this, arguments); };
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
if (B && B.gq) {
var A = gqGet().act[B.gq];
if (A) {
A.fight = 0;
if (how === "won")
gqNext(B.gq, "<b>The sky is clear.</b>");
else
gqSave();
}
}
if (B && B.bounty)
gbEnd(B, how);
}
catch (e) { }
return r;
};
})();
var GX_BOUNTY = [
{ k: "kell", n: "Kell the Smiler", sys: "corvanne", about: "Robs water-haulers and smiles while he does it.", n2: 4 },
{ k: "vosk", n: "Mother Vosk", sys: "hallowmere", about: "Hunts star-whales for their song-bones.", n2: 5 },
{ k: "tarn", n: "Tarn Ninefingers", sys: "reach", about: "Sells raider ships stolen Corp guns.", n2: 5 },
{ k: "ilsa", n: "Ilsa Grey", sys: "wanderers", about: "Hijacks Drifter ships and sells their crews' homes.", n2: 5 },
{ k: "brakk", n: "Brakk the Wall", sys: "hallowmere", about: "A gunship captain nobody has ever made retreat.", n2: 6, big: 1 },
{ k: "sorrow", n: "The Sorrowmaker", sys: "shatterline", about: "A Hollow captain who leaves no ship flying.", n2: 6, big: 1 },
{ k: "quill", n: "Quill", sys: "lantern", about: "Steals from the Order's outposts. Very fast.", n2: 4 },
{ k: "oradek", n: "Oradek of the Free Ports", sys: "aurelion", about: "A smuggler-lord with friends in the Senate.", n2: 7, big: 2 }
];
function gbGet() { var s = null; try {
s = JSON.parse(localStorage.getItem("gx.bounty") || "null");
}
catch (e) { } return s || { done: {}, on: null }; }
function gbSave(s) { try {
localStorage.setItem("gx.bounty", JSON.stringify(s));
}
catch (e) { } }
function gbCard() { return __ZC(462, 169, this, arguments, new.target); }
(function () {
var dk = gxDock;
gxDock = function (b) {
var r = dk.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.style.display !== "none") {
var d = document.createElement("div");
d.setAttribute("role", "button");
d.tabIndex = 0;
d.style.cssText = "margin:6px 0;padding:7px 10px;border:1px solid rgba(255,214,138,.55);border-radius:4px;background:rgba(255,214,138,.08);cursor:pointer";
d.innerHTML = "<b>⚖ The bounty board</b><div style='opacity:.75;font-size:12px'>" + GX_BOUNTY.length + " named captains</div>";
d.onclick = function (ev) { ev.stopPropagation(); gbCard(); };
c.appendChild(d);
var d2 = d.cloneNode(false);
d2.innerHTML = "<b>🚀 The shipwrights</b><div style='opacity:.75;font-size:12px'>Every ship of the wide galaxy, and how to earn it</div>";
d2.onclick = function (ev) { ev.stopPropagation(); sbShipsCard(); };
c.appendChild(d2);
}
}
catch (e) { }
return r;
};
var ct = sbCombatTick;
sbCombatTick = function (dt) {
try {
var S = gbGet();
if (S.on && frIn() && !SB.battle && !GX.jumping) {
var B = GX_BOUNTY.filter(function (x) { return x.k === S.on; })[0];
if (B && FR.sys === B.sys) {
GQ.bt = (GQ.bt || 0) + dt;
if (GQ.bt > 12) {
GQ.bt = 0;
sbStrike({ why: "bounty", ahead: 700, n: B.n2, gunship: true });
var Bt = SB.battle;
if (Bt) {
Bt.bounty = B.k;
Bt.foeName = B.n + "'s crew";
for (var i = 0; i < (B.big || 0); i++)
sbSpawn("marauder", Bt.c.clone().add(new THREE.Vector3((i - 0.5) * 240, 40, -180)), "foe");
var F = SB.foes[0];
if (F) {
F.name = B.n;
F.hp *= 2.2;
F.max = F.hp;
}
Bt.n = SB.foes.length;
sbSay("<b>" + sbEsc(B.n) + "!</b> \"" + ["You came a long way to lose.", "I know your face from the board. Brave.", "Turn round and I'll forget I saw you."][Math.floor(Math.random() * 3)] + "\"");
}
}
}
}
}
catch (e) { }
return ct.apply(this, arguments);
};
})();
function gbEnd(Bt, how) { return __ZC(462, 170, this, arguments, new.target); }
var GX_RACES = {
tullimar: { n: "The Tullimar Loop", sys: "reach", body: "tullimar", rings: 12, rad: 5, par: [70, 90, 120], about: "Twelve rings round Tullimar, low and fast." },
glasswing: { n: "The Glasswing Run", sys: "corvanne", body: "sereth", rings: 14, rad: 6, par: [95, 120, 160], about: "Fourteen rings that weave round Sereth Vale and out past the swarm." },
shatter: { n: "The Shatterline Gauntlet", sys: "shatterline", body: "isk", rings: 16, rad: 5, par: [110, 140, 180], about: "Sixteen rings through Isk's sky, where the Hollow fly. Only the Tullik call this fun." }
};
var GXR = { on: null };
function gxrCard() { return __ZC(462, 171, this, arguments, new.target); }
function gxrStart(k) { return __ZC(462, 172, this, arguments, new.target); }
function gxrPlace() { return __ZC(462, 173, this, arguments, new.target); }
function gxrStop() { if (GXR.on && GXR.on.g && GXR.on.g.parent) {
GXR.on.g.parent.remove(GXR.on.g);
GXR.on.g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); });
} GXR.on = null; }
(function () {
var sp = spTick;
spTick = function (dt) {
var r = sp.apply(this, arguments);
try {
var G = GXR.on;
if (G) {
if (!frIn() || !FR.g || G.g.parent !== FR.g) {
gxrStop();
}
else {
G.t += dt;
gxrPlace();
var ring = G.rings[G.i], wp = ring.position.clone().add(FR.c);
if (SP.pos.distanceTo(wp) < 30) {
G.i++;
sbTone(660 + G.i * 20, 0.08);
if (G.i >= G.rings.length) {
var R = GX_RACES[G.k], t = G.t, medal = t < R.par[0] ? "🥇 gold" : t < R.par[1] ? "🥈 silver" : t < R.par[2] ? "🥉 bronze" : "no medal this time";
var best = {};
try {
best = JSON.parse(localStorage.getItem("gx.race") || "{}") || {};
}
catch (e) { }
var nb = !best[G.k] || t < best[G.k];
if (nb) {
best[G.k] = t;
try {
localStorage.setItem("gx.race", JSON.stringify(best));
}
catch (e) { }
}
sbSay("<b>Finish! " + t.toFixed(1) + " seconds: " + medal + ".</b>" + (nb ? " Your best yet." : "") + (t < R.par[0] ? " The Tullik pilots bang their helmets on their consoles, which is how they cheer." : ""));
if (t < R.par[1])
try {
frStandAdd("tullik", "trade");
}
catch (e) { }
gxrStop();
}
else if (G.i % 4 === 0)
sbSay("Ring " + G.i + " of " + G.rings.length + " · " + G.t.toFixed(1) + " s");
}
if (G && G.t > 300) {
sbSay("The race is called off: too long.");
gxrStop();
}
}
}
}
catch (e) {
GXR.on = null;
}
return r;
};
})();
(function () {
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
if (site.frLead.p === "tullik") {
var c = WLD.card;
if (c && c.style.display !== "none") {
var d = document.createElement("div");
d.setAttribute("role", "button");
d.tabIndex = 0;
d.style.cssText = "margin:6px 0;padding:7px 10px;border:1px solid rgba(184,255,122,.55);border-radius:4px;background:rgba(184,255,122,.08);cursor:pointer";
d.innerHTML = "<b>🏁 Race the Tullik</b><div style='opacity:.75;font-size:12px'>Three courses across the stars</div>";
d.onclick = function (ev) { ev.stopPropagation(); gxrCard(); };
c.appendChild(d);
}
}
}
catch (e) { }
return r;
};
})();
(function () {
var lc = frLogCard;
frLogCard = function () {
lc.apply(this, arguments);
try {
var c = WLD.card;
if (!c)
return;
var S = gqGet(), ids = Object.keys(S.act), d = document.createElement("div");
d.style.cssText = "margin-top:10px;padding:8px;border:1px solid rgba(255,214,138,.4);border-radius:10px;font-size:13px";
var nDone = Object.keys(S.done).length, nAll = Object.keys(GX_QUESTS).reduce(function (a, p) { return a + GX_QUESTS[p].q.length; }, 0);
var h = "<b style='color:#FFD68A'>📜 Tasks · " + nDone + " of " + nAll + " done</b>";
ids.forEach(function (id) { var Q = gqQ(id), A = S.act[id]; if (Q)
h += "<br>➤ <b>" + sbEsc(Q.n) + "</b>: " + sbEsc(gqStepLine(Q.steps[A.i])); });
if (!ids.length)
h += "<br><span style='opacity:.8'>Ask any people's leader for their tasks.</span>";
var B = gbGet();
if (B.on) {
var bb = GX_BOUNTY.filter(function (x) { return x.k === B.on; })[0];
if (bb)
h += "<br>⚖ Hunting <b>" + sbEsc(bb.n) + "</b> in " + sbEsc(GX_SYS[bb.sys].name);
}
h += "<br><span style='opacity:.8'>Bounties brought in: " + Object.keys(B.done).length + " of " + GX_BOUNTY.length + "</span>";
d.innerHTML = h;
c.appendChild(d);
var rb = document.createElement("div");
rb.setAttribute("role", "button");
rb.tabIndex = 0;
rb.style.cssText = "margin-top:6px;padding:6px 10px;border:1px solid rgba(184,255,122,.5);border-radius:4px;cursor:pointer;font-size:13px";
rb.innerHTML = "🏁 The Tullik races";
rb.onclick = function (ev) { ev.stopPropagation(); if (GXR.want && FR.sys === GX_RACES[GXR.want].sys && frIn()) {
worldCard(null);
var k = GXR.want;
GXR.want = null;
gxrStart(k);
}
else
gxrCard(); };
c.appendChild(rb);
}
catch (e) { }
};
})();
var WD_POW = {
veyar: { edge: "Slowing: each strike leaves the foe slow and dazed a little longer.", surge: "Veil Step", about: "You fade from sight for 4 seconds. Foes lose you and nothing can hurt you.", cool: 16 },
sereth: { edge: "Living light: each strike mends you a little.", surge: "Grove Breath", about: "Mends 30 at once, then keeps mending you for 6 seconds.", cool: 18 },
isk: { edge: "Chill: struck foes stay frozen in place longer.", surge: "Frost Ring", about: "A ring of frost freezes every foe within 9 metres for over 3 seconds.", cool: 15 },
aster: { edge: "Long reach: the blade strikes from almost a metre further.", surge: "Star Lance", about: "Throws three lances of starlight ahead of you.", cool: 12 },
ysolde: { edge: "Undertow: each strike shoves the foe back.", surge: "Tide", about: "A wave rolls out in front of you and sweeps foes off their feet.", cool: 13 },
maruondo: { edge: "Patient guard: the timing to turn a bolt back is far kinder.", surge: "Jade Ward", about: "A jade shield wraps you for 6 seconds. Nothing gets through.", cool: 20 },
aurelion: { edge: "Judgement: strikes cut deeper into champions and bosses.", surge: "Sunburst", about: "A burst of gold light dazzles foes near you; the badly hurt ones yield.", cool: 18 },
dunmarrow: { edge: "Sand-edge: every strike hits a little harder.", surge: "Sandstorm", about: "Whips sand into the eyes of foes within 16 metres; their guns go quiet for a while.", cool: 15 },
driftward: { edge: "Quick hand: you swing faster.", surge: "Salvage", about: "Tears the guns out of the hands of every shooter within 16 metres.", cool: 20 },
kharn: { edge: "Forge weight: heavy strikes that hit much harder.", surge: "Forge Slam", about: "Slam the ground: foes close by are hurt and thrown back.", cool: 14 },
orr: { edge: "Copper arc: each strike jumps to a second foe nearby.", surge: "Copper Storm", about: "Arcs of copper lightning hit up to four foes at once.", cool: 15 },
tullimar: { edge: "Racer's rhythm: every third strike lands double.", surge: "Rush", about: "A blur-fast dash ten metres ahead, striking everyone in the way.", cool: 10 },
skeldmar: { edge: "Thunder: each strike rings out and dazes foes standing next to the one you hit.", surge: "Thunderclap", about: "A clap of thunder stuns every foe within 14 metres.", cool: 16 },
nharos: { edge: "Thirst: each strike drinks a little strength into you.", surge: "Blood Fury", about: "For 6 seconds your strikes hit twice as hard and feed you.", cool: 20 }
};
WD.pc = WD.pc || 0;
WD.hits = 0;
function wdShardKey() { var S = wdGet(); if (!S.blade)
return null; for (var i = 0; i < WD_SHARD_ORDER.length; i++) {
var k = WD_SHARD_ORDER[i];
if (WD_SHARDS[k] && WD_SHARDS[k].col === S.blade)
return k;
} return null; }
function wdPow() { var k = wdShardKey(); return k ? WD_POW[k] : null; }
function wdPowLine(S) { return __ZC(462, 174, this, arguments, new.target); }
function wdFoesNear(r, front) { return __ZC(462, 175, this, arguments, new.target); }
function wdLance(col, spread) { return __ZC(462, 176, this, arguments, new.target); }
function wdArc(a, b, col) { return __ZC(462, 177, this, arguments, new.target); }
function wdHit(F, dmg, stun, col) { if (!F || F.yield)
return; F.hp -= dmg; F.hit = 0.2; F.stun = Math.max(F.stun || 0, stun || 0.35); wdSpark(F.x, F.y + 1.2, F.z, col || wdGet().blade); if (F.hp <= 0)
wdYield(F); }
wdSwing = function () { return __ZC(462, 178, this, arguments, new.target); };
(function () { var gd = wdGuard; wdGuard = function (on) { var was = WD.guard; gd.apply(this, arguments); if (on && !was && WD.guard && wdShardKey() === "maruondo")
WD.guardAt += 0.25; }; })();
(function () { var hu = wdHurt; wdHurt = function (n, F) { if (WD.veil > WD.t || WD.ward > WD.t) {
if (WD.ward > WD.t) {
var L = wdLocal();
wdSpark(L.x - Math.sin(yaw) * 0.7, camera.position.y - 0.2, L.z - Math.cos(yaw) * 0.7, 0x2AD06A);
}
return;
} return hu.apply(this, arguments); }; })();
function wdSurge() { return __ZC(462, 179, this, arguments, new.target); }
Object.assign(WD_GIFT_H, {
push: ["Crush", "Hurls foes back hard and hurts them; the weak ones throw down their weapons in fear."],
leap: ["Rage-Leap", "A furious leap that comes down like a hammer, hurting everyone where you land."],
sense: ["Dread Sight", "Shows hidden things, and fills foes near you with dread so they freeze and their aim shakes."],
turn: ["Hurl the Bolt", "Guard just as a bolt reaches you and fling it back, burning hotter than it came."],
calm: ["Command", "Orders a foe to kneel, then makes them fight for you for 15 seconds."],
pull: ["Seize", "Tears a foe or their weapon to you, and strikes as they come."],
mend: ["Drain", "Mends you by drawing strength from the nearest foe, who staggers."]
});
setTimeout(function () { try {
wdApplyPath();
}
catch (e) { } }, 0);
(function () {
var gf = wdGift;
wdGift = function (g) {
var before = WD.cool[g] || 0, r = gf.apply(this, arguments);
if (!r || !wdHollow() || (WD.cool[g] || 0) === before)
return r;
var L = wdLocal(), red = 0xFF5A2A;
if (g === "push")
wdFoesNear(9, 0.5).forEach(function (F) { wdHit(F, 14, 2.2, red); if (!F.boss && !F.yield && F.hp < F.max * 0.35) {
wdYield(F, true);
sbSay("<b>" + sbEsc(F.name) + "</b> throws down their weapon. \"Mercy! Mercy!\"");
} });
if (g === "leap") {
var grav = WORLDS.surface.gravity || 9.8;
WD.rage = WD.t + Math.max(0.6, 2 * Math.sqrt(2 * grav * 7.5) / grav - 0.05);
}
if (g === "sense") {
wdRipple(L.x, L.z, red);
wdFoesNear(18).forEach(function (F) { if (F.boss)
return; F.stun = Math.max(F.stun || 0, 2); F.cool = (F.cool || 0) + 2; F.dread = 1; });
}
if (g === "pull") {
var best = null, bd = 26, fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
WD.foes.forEach(function (F) { if (F.yield || F.thrall || F.kind === "drone")
return; var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz); if (d < bd && (dx * fw.x + dz * fw.z) / Math.max(0.01, d) > 0.8) {
best = F;
bd = d;
} });
if (best) {
wdHit(best, 15, 1.6, red);
}
}
if (g === "calm") {
var th = null;
WD.foes.forEach(function (F) { if (F.yield && !F.thrall && !F.used && F.yieldT < 0.2 && !F.boss && F.kind !== "drone")
th = F; });
if (th) {
th.thrall = 15;
th.used = 1;
th.yieldT = 0;
wdBal(-3);
wdTintFoe && wdTintFoe(th, red);
sbSay("<b>" + sbEsc(th.name) + "</b> rises again with empty eyes. \"As you command.\" They turn on their own side.");
}
}
return r;
};
})();
(function () {
var bt = wdBoltsTick;
wdBoltsTick = function (dt) {
WD.bolts.forEach(function (b) {
if (!b.lance || b.done)
return;
var nx = b.p.x + b.v.x * dt, nz = b.p.z + b.v.z * dt, sx = nx - b.p.x, sz = nz - b.p.z, ll = sx * sx + sz * sz || 1;
WD.foes.forEach(function (F) {
if (b.done || F.yield || F.thrall || F.kind === "drone")
return;
var u = Math.max(0, Math.min(1, ((F.x - b.p.x) * sx + (F.z - b.p.z) * sz) / ll)), qx = b.p.x + sx * u - F.x, qz = b.p.z + sz * u - F.z;
if (Math.hypot(qx, qz) < 1.3) {
b.done = 1;
wdHit(F, 30, 0.8, b.col);
}
});
});
WD.bolts.forEach(function (b) { if (!b.hot || b.done)
return; WD.foes.forEach(function (F) { if (!b.burnt && !F.yield && !F.thrall && F.kind !== "drone" && Math.hypot(F.x - b.p.x, F.z - b.p.z) < 0.9 && Math.abs(F.y + 1.2 - b.p.y) < 1.4) {
b.burnt = 1;
F.hp -= 15;
} }); });
bt.apply(this, arguments);
if (wdHollow())
WD.bolts.forEach(function (b) { if (b.back && !b.hot && !b.lance && b.from === null && b.t < 0.05) {
b.hot = 1;
b.v.multiplyScalar(1.3);
b.m.material.color.setHex(0xFF3A1A);
} });
};
})();
(function () {
var ft = wdFoesTick;
wdFoesTick = function (dt) {
var r = ft.apply(this, arguments);
var L = wdLocal();
if (WD.regen > WD.t)
WD.hp = Math.min(100, WD.hp + 5 * dt);
if (WD.dash > 0) {
WD.dash -= dt;
camera.position.x += -Math.sin(yaw) * 28 * dt;
camera.position.z += -Math.cos(yaw) * 28 * dt;
WD.foes.forEach(function (F) { if (F.yield || F.thrall || F.kind === "drone" || F.dashHit === WD.dashId)
return; if (Math.hypot(F.x - L.x, F.z - L.z) < 2.4) {
F.dashHit = WD.dashId;
wdHit(F, 22, 1, 0xFF6AA8);
} });
}
if (WD.rage && WD.t >= WD.rage) {
WD.rage = 0;
wdRipple(L.x, L.z, 0xFF5A2A);
sbTone(80, 0.45);
if (typeof sbVig === "function")
sbVig(0xFF5A2A, 0.12);
wdFoesNear(6).forEach(function (F) { F.kx = (F.x - L.x) / Math.max(0.1, F._d) * 9; F.kz = (F.z - L.z) / Math.max(0.1, F._d) * 9; wdHit(F, 20, 1.4, 0xFF5A2A); });
}
WD.foes.forEach(function (F) {
if (!F.thrall)
return;
F.thrall -= dt;
F.yieldT = 0;
if (F.thrall <= 0) {
F.thrall = 0;
sbSay("<b>" + sbEsc(F.name) + "</b> drops to their knees again, empty.");
return;
}
var tgt = null, td = 40;
WD.foes.forEach(function (G) { if (G === F || G.yield || G.thrall || G.kind === "drone")
return; var d = Math.hypot(G.x - F.x, G.z - F.z); if (d < td) {
tgt = G;
td = d;
} });
var T = F.T || { spd: 3.4 };
if (tgt) {
if (td > 1.9) {
F.x += (tgt.x - F.x) / td * T.spd * dt;
F.z += (tgt.z - F.z) / td * T.spd * dt;
}
F.tc = (F.tc || 0) - dt;
if (td < 2.3 && F.tc <= 0) {
F.tc = 1;
F.swing = 0.3;
wdHit(tgt, 14, 0.5, 0xFF5A2A);
tgt.alert = 1;
}
}
F.y = sfHeight(F.x, F.z);
if (F.g) {
F.g.position.set(F.x, F.y, F.z);
if (tgt)
F.g.rotation.y = Math.atan2(tgt.x - F.x, tgt.z - F.z);
if (F.g.userData.weap)
F.g.userData.weap.rotation.x = F.swing > 0 ? -0.2 - F.swing * 4 : -0.9;
}
if (F.swing > 0)
F.swing -= dt;
});
return r;
};
})();
(function () {
var W = WORLDS.surface;
if (!W)
return;
var k = W.key_;
W.key_ = function (e) { if (wdOn() && !e.repeat && e.code === "KeyT" && WD.drawn && wdPow()) {
wdSurge();
return true;
} return k ? k.call(this, e) : false; };
var pp = wdPadPaint;
wdPadPaint = function () {
var r = pp.apply(this, arguments);
try {
var P = wdPow();
if (WD.bar && WD.drawn && P && wdOn()) {
var b = document.createElement("button");
b.dataset.a = "surge";
b.innerHTML = "✦ " + sbEsc(P.surge) + (sbTouch() ? "" : " <b>T</b>");
b.onclick = function (e) { e.stopPropagation(); wdSurge(); };
WD.bar.appendChild(b);
}
}
catch (e) { }
return r;
};
})();
var GX_DANGER = [
["aurelion", "Aurelion, the city of the Concord (no weapons in the city)", 0],
["aster", "Aster Still, home of the Order (blades only on the training floors)", 1],
["sereth", "Sereth Vale, the forest moon (no fire, no blades in the groves)", 1],
["ysolde", "Ysolde, the stilt-city sea (speak true; the tide is law)", 1],
["tullimar", "Tullimar, the Tullik market moon", 1],
["maruondo", "Maru-Ondo, the ocean world", 2],
["dunmarrow", "Dunmarrow, the salt desert (duels in the Ring; bounty hunters work openly)", 2],
["kharn", "Kharn's Anvil (three times Earth's pull)", 2],
["isk", "Isk, the frozen moon (deadly cold, avalanches)", 3],
["skeldmar", "Skeldmar, world of the Hrovan fortresses", 3],
["orr", "Orr, the silent machine world", 3],
["driftward", "The Driftward (anything bought, nothing asked)", 3],
["nharos", "Nharos and the Ashen Keep (no law)", 4]
];
(function () {
if (typeof DGR_WORLDS === "undefined" || typeof DGR_W === "undefined")
return;
GX_DANGER.forEach(function (r) { if (DGR_W[r[0]])
return; DGR_WORLDS.push([r[0], r[1], r[2], "space"]); DGR_W[r[0]] = { id: r[0], name: r[1], def: r[2], group: "space" }; });
})();
var WDVR = { on: false, i: -1, v: null, d: null, cool: 0, thrustCool: 0, guard: false, q: null };
function wdVrRight() {
try {
if (typeof bwVR !== "function" || !bwVR() || !VRM.xr || !VRM.hands)
return -1;
var S = VRM.xr.inputSources;
for (var i = 0; i < S.length && i < VRM.hands.length; i++) {
if (S[i] && S[i].handedness === "right")
return i;
}
return VRM.hands[1] ? 1 : 0;
}
catch (e) {
return -1;
}
}
function wdVrSrc(i) { try {
return VRM.xr.inputSources[i];
}
catch (e) {
return null;
} }
(function () {
var bt = wdBladeTick;
wdBladeTick = function (dt) {
var r = bt.apply(this, arguments);
try {
var i = WD.drawn && WD.blade ? wdVrRight() : -1, hand = i >= 0 ? VRM.hands[i] : null;
if (!hand) {
if (WDVR.on) {
WDVR.on = false;
WDVR.last = null;
WDVR.vs = null;
if (WD.blade && WD.blade.parent !== WORLDS.surface.g) {
if (WD.blade.parent)
WD.blade.parent.remove(WD.blade);
if (WD.drawn)
WORLDS.surface.g.add(WD.blade);
}
if (WDVR.guard) {
WDVR.guard = false;
wdGuard(false);
}
}
return r;
}
var B = WD.blade;
if (B.parent !== hand) {
if (B.parent)
B.parent.remove(B);
hand.add(B);
}
WDVR.on = true;
WDVR.i = i;
B.position.set(0, -0.02, 0.05);
B.quaternion.identity();
B.rotation.set(-Math.PI / 2 + 0.25, 0, 0);
B.scale.setScalar(1);
if (!WDVR.v) {
WDVR.v = new THREE.Vector3();
WDVR.d = new THREE.Vector3();
WDVR.q = new THREE.Quaternion();
}
WDVR.d.set(0, 0, -1).applyQuaternion(hand.quaternion).normalize();
var v = null, src = wdVrSrc(i);
if (WDVR.last && dt > 0) {
var nv = hand.position.clone().sub(WDVR.last).divideScalar(dt);
WDVR.v = WDVR.vs ? WDVR.vs.lerp(nv, 0.5) : nv;
WDVR.vs = WDVR.v;
v = WDVR.v;
}
WDVR.last = (WDVR.last || new THREE.Vector3()).copy(hand.position);
WDVR.cool -= dt;
WDVR.thrustCool -= dt;
var up = WDVR.d.y > 0.72;
if (up !== WDVR.guard) {
WDVR.guard = up;
wdGuard(up);
}
if (v && !up) {
var sp = v.length(), along = v.dot(WDVR.d), side = Math.sqrt(Math.max(0, sp * sp - along * along));
if (along > 3.0 && along > side * 1.6 && WDVR.thrustCool <= 0) {
WDVR.thrustCool = 0.8;
WDVR.cool = 0.4;
if (typeof wdSurge === "function" && wdSurge() && typeof vrhBuzz === "function")
vrhBuzz(src, 0.5, 60);
}
else if (sp > 2.4 && WDVR.cool <= 0) {
WDVR.cool = 0.32;
WD.swing = 0;
var n = wdSwing();
if (typeof vrhBuzz === "function")
vrhBuzz(src, n ? 0.7 : 0.15, n ? 45 : 12);
}
}
}
catch (e) {
if (!WDVR.warned) {
WDVR.warned = 1;
console.warn("starblade vr", e);
}
}
return r;
};
var dr = wdDraw;
wdDraw = function (on) { var r = dr.apply(this, arguments); if (!on && WDVR.guard) {
WDVR.guard = false;
wdGuard(false);
} return r; };
})();
var NHK = { hw: 62, hd: 52 };
function nhkCenter() { var C = FR_TOWN.nharos.center; return { x: C[0] - 260, z: C[1] - 545 }; }
(function () {
var sh = sfHeight;
sfHeight = function (x, z) {
if (typeof SF === "undefined" || SF.k !== "nharos")
return sh(x, z);
var K = nhkCenter(), dx = Math.abs(x - K.x) - NHK.hw - 8, dz = Math.abs(z - K.z) - NHK.hd - 8, out = Math.max(dx, dz);
if (out >= 16)
return sh(x, z);
if (SF._nhCfg !== SF.cfg) {
SF._nhCfg = SF.cfg;
SF._nhY = sh(K.x, K.z);
}
if (out <= 0)
return SF._nhY;
var k = out / 16;
k = k * k * (3 - 2 * k);
return SF._nhY * (1 - k) + sh(x, z) * k;
};
})();
function nhkIn(x, z, pad) { var K = nhkCenter(); return Math.abs(x - K.x) < NHK.hw - 2 + (pad || 0) && Math.abs(z - K.z) < NHK.hd - 2 + (pad || 0); }
function nhkHall(x, z) { var K = nhkCenter(); return Math.abs(x - K.x) < 22 && z > K.z - 50 && z < K.z - 14; }
(function () {
var tb = GX_TOWN.nharos;
GX_TOWN.nharos = function (G, C, R, sol, hy) {
var r = tb.apply(this, arguments);
try {
nhkBuild(G, C, R, sol, hy);
}
catch (e) {
console.warn("ashen keep", e);
}
return r;
};
})();
function nhkBuild(G, C, R, sol, hy) { return __ZC(462, 180, this, arguments, new.target); }
function nhkCard() { return __ZC(462, 181, this, arguments, new.target); }
function nhkSpar() { return __ZC(462, 182, this, arguments, new.target); }
(function () {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "nharos" || !SF.nhk)
return r;
var L = worldLocal(), K = nhkCenter(), S = wdGet();
if (nhkIn(L.x, L.z, -4) && !SF.nhk.told) {
SF.nhk.told = 1;
if (wdHollow())
sbSay("<b>The Ashen Keep.</b> The guards on the gate bring their blades to their brows as you pass. You are one of them here.");
else {
sbSay("<b>The Ashen Keep.</b> A horn sounds once, low. \"Intruder!\" The Hollow guard comes for you." + (S.blade ? "" : " You have no blade: get out, or find one."));
if (hlStep() !== 8 || SF.hlBoss) {
for (var g = 0; g < 5; g++)
wdSpawn(g % 2 ? "raider" : "acolyte", K.x - 12 + g * 6, K.z + NHK.hd - 14, { alert: 1 });
}
}
}
SF.sites.forEach(function (s) {
if (!s.nhk)
return;
if (Math.hypot(L.x - s.x, L.z - s.z) < 3) {
if (s.nhk === "kethra")
worldPrompt("<b>Mistress Kethra Vahl</b> · <b>press E</b> to stand before her", nhkCard);
if (s.nhk === "oruk")
worldPrompt("<b>The Ash Forge</b> · <b>press E</b> for Oruk's anvil", function () { if (!wdHollow()) {
sbSay("<b>Oruk</b> spits into the fire. \"I make blades for the Hollow. Not for you.\"");
return;
} wdBladeCard(); });
}
});
var tx = K.x, tz = K.z - 32 - 15.6;
if (Math.hypot(L.x - tx, L.z - (tz + 3.4)) < 3.2)
worldPrompt("<b>The throne of the Hollow Lord</b> · <b>press E</b>", function () {
if (wdHollow() && S.end === "claimed") {
var W = WORLDS.surface;
camera.position.set(W.base + tx, SF.nhk.y + 1.5 + 1.9, tz + 0.2);
yaw = 0;
pitch = -0.05;
sbSay("<b>You sit the throne of the Hollow Lord.</b> The ember eye above you burns a little brighter. Down the hall, Steward Mael bows very low. The Keep is yours.");
wdBal(-1);
}
else if (wdHollow())
sbSay("<b>Steward Mael:</b> \"That seat is for the Hollow Lord. Only the one who brings down Mother Ilvane may sit there.\"");
else
sbSay("<b>The throne of the Hollow Lord.</b> Black iron and cold, an ember eye in its back. " + (hlStep() >= 9 ? "It is empty now." : "Vael Ashkarran's seat."));
});
if (NHK.spar) {
var left = NHK.spar.foes.filter(function (F) { return !F.yield && WD.foes.indexOf(F) >= 0; }).length;
if (!left) {
var won = NHK.spar.foes.every(function (F) { return F.yield; });
NHK.spar = null;
if (won) {
S.spars = (S.spars || 0) + 1;
if (wdHollow() && S.rank < 2)
S.rank = 2;
if (wdHollow() && S.rank < 3 && S.spars >= 5)
S.rank = 3;
wdSave();
wdBal(-2);
sbSay("<b>Kethra:</b> \"" + (S.spars >= 5 ? "Again you win. You are a Hollow Blade now, whatever the Order would call you." : "Better. Come back when you want to be better still.") + "\" (" + S.spars + " bout" + (S.spars > 1 ? "s" : "") + " won)");
}
}
}
}
catch (e) {
if (!NHK.warned) {
NHK.warned = 1;
console.warn("ashen keep", e);
}
}
return r;
};
var sb = sfBuild;
sfBuild = function () { SF.nhk = null; NHK.spar = null; return sb.apply(this, arguments); };
})();
var GS_CH = {
r1: { n: "Ashes in the Drift", f: "raider", say: "The raiders refuel somewhere in the Ashen Drift. Find where, and who feeds them.", steps: [
["fly", "reach", "cinder", "Fly to Cinder and the Ashen Drift, in the Far Reach"], ["win", "reach", "Raiders guard the Drift: beat them"],
["fly", "reach", "comet", "Their fuel-tug ran for the wandering comet: follow it"], ["win", "reach", "Break the fuel-tug's escort"]
],
end: "The fuel-tug's pilot gives up a name before the Concord takes him: \"Ask the Tullik who sells to us. They know.\"" },
r2: { n: "What the Tullik know", f: "raider", say: "The Tullik see every ship that passes Tullimar. Somebody there sells to raiders.", steps: [
["talk", "tullik", "Ask the Tullik on Tullimar who sells to raiders"], ["visit", "tullimar", 1, "Go to the crater shrine, where the dealer meets them"],
["foes", "tullimar", 1, 5, "The dealer's guards come at you"], ["gather", "tullimar", 1, 4, "raider ledgers", 0xFFD890]
],
end: "The ledgers are written in a cipher no Tullik can read. \"Orrem numbers,\" says a racer. \"Try Orr.\"" },
r3: { n: "The silent cipher", f: "raider", say: "Only the Orrem can read Orrem numbers, and the Orrem barely speak.", steps: [
["land", "orr", "Take the ledgers to Orr, the silent machine world"], ["visit", "orr", 1, "Climb to the relay tower, which can read them"],
["hold", "orr", 1, 3, "The raiders want their ledgers back: hold the relay tower"], ["talk", "orrem", "Take the ledgers into the Archive's Reading Hall and hear what the Orrem read in them"]
],
end: "The Orrem's voice is like a cold bell. \"Ships. Dates. A meeting at Kethrin. And a mark: a broken star.\"" },
r4: { n: "Hoon's shadow", f: "raider", say: "The ledgers name a raider wing that hides in the shadow of Hoon, and a meeting at the brown dwarf Kethrin.", steps: [
["fly", "reach", "hoon", "Fly to Hoon"], ["waves", "reach", 2, "A raider wing comes out of Hoon's shadow: two waves of them"],
["fly", "reach", "kethrin", "Go to the meeting at Kethrin, the brown dwarf"], ["win", "reach", "The meeting was a trap: fight your way out"]
],
end: "In the wreck of the trap-ship, the same broken star. And a Hrovan honour-mark, scratched out." },
r5: { n: "Grell Ashmouth", f: "raider", say: "The Hrovan of Skeldmar know whose mark was scratched out. The raider chief who wore it is hiding on their own world.", steps: [
["land", "skeldmar", "Land on Skeldmar"], ["visit", "skeldmar", 0, "Go to the long hall and ask the Hrovan"],
["duel", "skeldmar", 1, "Grell Ashmouth, raider chief", 260, "At the cliff watch: face Grell Ashmouth, who carries the broken star"], ["talk", "hrovan", "Tell the Hrovan their shame is ended"]
],
end: "Grell spits ash. \"We serve the Hollow. Everyone will, soon.\" The Hrovan say an old woman on Sereth Vale, in Corvanne, knows that word." },
i1: { n: "The listening trees", f: "raider", say: "Ilvane will not teach anyone who cannot sit still. \"Go and listen first.\"", steps: [
["visit", "sereth", 0, "Sit by the Moonwell among the giant trees"], ["gather", "sereth", 2, 5, "fallen star-seeds", 0xC8FFB0], ["talk", "sereth", "Bring the star-seeds to Mother Ilvane"]
],
end: "\"You heard the trees,\" says Ilvane. \"Good. Now hear something worse.\"" },
i2: { n: "The storm's eye", f: "hollow", say: "Ilvane felt something cold move inside Ormund's great storm.", steps: [
["fly", "corvanne", "ormund", "Fly to Ormund's storm"], ["waves", "corvanne", 2, "Hollow scouts in the storm: two waves of them"], ["land", "sereth", "Tell Ilvane what you saw"]
],
end: "Ilvane closes her eyes. \"Black ships with ember wings. Then it has begun again.\"" },
i3: { n: "Ember-glass", f: "hollow", say: "Diggers on Dunmarrow are pulling ember-glass out of the buried ship. The Hollow use it to make their blades.", steps: [
["land", "dunmarrow", "Fly to Dunmarrow"], ["visit", "dunmarrow", 1, "Ask at the caravan rest at Sef"],
["foes", "dunmarrow", 2, 5, "Drive the Hollow diggers from the buried ship"], ["gather", "dunmarrow", 2, 4, "ember-glass shards", 0xFF7A40], ["talk", "dunfolk", "Give the shards to the Dunfolk to bury deep"]
],
end: "The Dunfolk bury the ember-glass under a hundred measures of salt. \"No one will dig there again.\"" },
i4: { n: "The way to the Lantern", f: "raider", say: "\"The glasswings know every road of light,\" says Ilvane. \"Ask them the way to Aster Still.\"", steps: [
["fly", "corvanne", "glasswing", "Fly to the Glasswing swarm"], ["win", "corvanne", "Raiders are netting the glasswings: drive them off"], ["talk", "sereth", "Return to Ilvane with the swarm's light"]
],
end: "The glasswings' light shows a road through the Lantern Nebula. Ilvane presses your hand. \"Go to Teodric.\"" },
n1: { n: "Stillness", f: "raider", say: "Teodric gives every novice the same first lesson: be still.", steps: [
["visit", "aster", 0, "Sit with the Hermit"], ["gather", "aster", 2, 5, "quiet-fruit", 0xF0E8FF], ["visit", "aster", 3, "Carry them to the Star-stone and sit through the dusk"]
],
end: "At the Star-stone, for one breath, you feel the Quiet. It feels like being known." },
n2: { n: "The first gift", f: "raider", say: "A Warden learns the gifts one by one, each on a different world, each by a trial.", steps: [
["gift", "push", "Learn Push in the trial of the Stones on Aster Still"], ["gift", "leap", "Learn Leap in the trial of the Lanterns on Kharn's Anvil, in Hallowmere"], ["talk", "wardens", "Show Teodric what you have learned"]
],
end: "Teodric nods once. From Teodric, that is a great deal." },
n3: { n: "The Old Anvil", f: "raider", say: "Raiders have camped at the Old Anvil on Kharn again, and the Kharn ask the Order for help.", steps: [
["land", "kharn", "Fly to Kharn's Anvil (walk slow: the pull is three times Earth's)"], ["foes", "kharn", 1, 6, "Throw the raiders out of the Old Anvil"],
["hold", "kharn", 1, 2, "They come back with friends: hold the Anvil"], ["talk", "kharn", "Forge-Mother Durra wants to see you"]
],
end: "Durra grunts. \"Wardens. Hm. You hit hard for a small one.\"" },
n4: { n: "The watchers in the Lantern", f: "hollow", say: "A fallen outpost of the Order still has its lamp burning. The Hollow left watchers round it.", steps: [
["fly", "lantern", "outpost", "Fly to the fallen outpost in the Lantern Nebula"], ["waves", "lantern", 2, "Hollow watchers: two waves"], ["fly", "lantern", "lanternheart", "Carry the outpost's lamp to the Lantern's heart"]
],
end: "At the Lantern's heart the lamp flares and goes out, the way a Warden's life does. Corvin is waiting when you come back." },
n5: { n: "Where shards sleep", f: "raider", say: "Heart-shards sleep near old, quiet stars. Raiders have learned to hunt them.", steps: [
["fly", "lantern", "stillstar", "Fly close to the Still Star"], ["win", "lantern", "Shard-hunters: beat them"], ["talk", "wardens", "Tell Teodric the shard-fields are safe"]
],
end: "\"Now,\" says Corvin, rolling up his sleeves, \"we build you a blade.\"" },
a1: { n: "The cold wreck", f: "hollow", say: "Hollow acolytes are cutting up the frozen wreck on Isk. Something inside it was the Order's.", steps: [
["land", "isk", "Fly to Isk in the Shatterline (dress warm: it is deadly cold)"], ["foes", "isk", 0, 6, "Stop the acolytes at the frozen wreck"],
["gather", "isk", 0, 4, "Warden log-crystals", 0xA8D8FF], ["talk", "iskari", "Take the crystals to Herd-Chief Ulvra"]
],
end: "Ulvra reads the crystals by firelight. \"The Wardens who died here were waiting for someone. They wrote: tell the Senate.\"" },
a2: { n: "Lights in the aurora", f: "hollow", say: "The Iskari say Hollow ships hide in Isk's sky-lights.", steps: [
["gift", "pull", "Learn Pull in the trial of the Lost Lamps on Isk"], ["visit", "isk", 3, "Climb to Aurora watch"], ["waves", "shatterline", 2, "Hollow ships in the aurora: two waves"]
],
end: "One Hollow pilot, pulled from a broken ship, will only say: \"The Senate is ours already.\"" },
a3: { n: "The whale-hunters", f: "raider", say: "Whale-hunters with Hollow guns are killing the star-whales of Hallowmere for their song-bones.", steps: [
["fly", "hallowmere", "starwhale", "Fly to the star-whales"], ["waves", "hallowmere", 3, "Drive off the whale-hunters: three waves"], ["talk", "merrowin", "Tell Healer Ondessa on Ysolde"]
],
end: "The whales sing as you leave. Ondessa says they are singing your name. \"Badly. They are new at it.\"" },
a4: { n: "The drowned temple", f: "hollow", say: "The Hollow want the temple-lights in the drowned temple on Ysolde. Ondessa wants them kept.", steps: [
["gift", "mend", "Learn Mend in the trial of the Fishers on Ysolde"], ["visit", "ysolde", 2, "Walk out to the drowned temple"],
["hold", "ysolde", 2, 3, "The Hollow come for the temple-lights: hold the temple"], ["talk", "merrowin", "Tell Ondessa the lights are safe"]
],
end: "Ondessa touches your forehead. \"The Senate's Beacon is calling every Warden. Go.\"" },
a5: { n: "The Beacon calls", f: "raider", say: "The Senate's Beacon at Aurelion is calling every Warden in the galaxy.", steps: [
["fly", "aurelion", "beacon", "Fly to the Senate's Beacon"], ["win", "aurelion", "Raiders are jamming the Beacon: break them"],
["land", "aurelion", "Land on Aurelion"], ["visit", "aurelion", 2, "Go to the Old Senate, where First Speaker Amaranth waits"]
],
end: "Amaranth is younger than you thought, and very tired. \"We have a leak,\" she says. \"I need a Warden I can trust.\"" },
s1: { n: "Stolen seals", f: "raider", say: "The listening-spire had Senate seals in it. Someone is selling them.", steps: [
["visit", "aurelion", 1, "Go to the Sky Market"], ["foes", "aurelion", 1, 5, "Catch the seal-smugglers (the guard allows it)"],
["gather", "aurelion", 1, 4, "stolen seals", 0xFFE070], ["talk", "concord", "Bring the seals to the First Speaker"]
],
end: "Every seal is real. \"Then the leak is in my own Senate,\" Amaranth says." },
s2: { n: "The seal-maker", f: "raider", say: "Only one dock makes Senate seals: the seal-works at Pell's Halo.", steps: [
["fly", "aurelion", "archive", "Search the Archive of a Thousand Suns for the seal records"], ["fly", "aurelion", "pell", "Fly to Pell's Halo"],
["waves", "aurelion", 2, "The seal-maker's hired guns: two waves"]
],
end: "The seal-maker talks fast. \"I don't know names! They paid in Drifter tokens. Ask the Drifters!\"" },
s3: { n: "Rook's price", f: "raider", say: "The Drifters buy and sell anything. Captain Rook will know who paid in Drifter tokens, for a price.", steps: [
["land", "driftward", "Find the Driftward, out among the Wanderers (follow the Drifter buoy in Corvanne if you have not)"], ["talk", "drifters", "Ask Captain Rook"],
["waves", "wanderers", 2, "Rook's price: drive off the raiders shadowing his fleet"], ["talk", "drifters", "Collect what Rook knows"]
],
end: "Rook shows you a chart. \"Your buyer sends everything to a second spire. Past the broken Warden ship, in the Shatterline.\"" },
s4: { n: "The second spire", f: "hollow", say: "There is a second listening-spire, hidden past the broken Warden ship in the Shatterline.", steps: [
["fly", "shatterline", "wardenship", "Fly past the broken Warden ship"], ["waves", "shatterline", 3, "The second spire's guard: three waves"],
["fly", "shatterline", "spire", "Read the spire's last message"]
],
end: "The last message carries a senator's seal, half burned. Only the Unhollowed on Nharos could read the rest." },
s5: { n: "Sera Vant", f: "hollow", say: "The Unhollowed escaped the Hollow. Their leader, Sera Vant, hides on Nharos itself.", steps: [
["land", "nharos", "Land on Nharos (no law here)"], ["foes", "nharos", 1, 6, "A Hollow patrol at the broken watch"], ["talk", "unhollowed", "Find Sera Vant"]
],
end: "Sera Vant reads the burned seal and goes pale. \"The traitor sits in the Senate. Under Sense, he burns like a coal.\"" },
w1: { n: "Kharn's oath", f: "hollow", say: "Nharos's sky is black with Hollow ships. You need a fleet. Start with the Kharn, who never break an oath.", steps: [
["land", "kharn", "Fly to Kharn's Anvil"], ["hold", "kharn", 0, 3, "The Hollow are raiding Slag Rise: hold the mine"],
["fly", "hallowmere", "kharnrig", "Durra's price: find the lost mining rig"], ["win", "hallowmere", "Its takers are still there: beat them"], ["talk", "kharn", "Hear Durra's oath"]
],
end: "Durra presses her fist to her chest. \"Kharn iron flies with you.\"" },
w2: { n: "The ember-sworn Hrovan", f: "hollow", say: "One Hrovan captain took the Hollow's ember. The Hrovan will not fly until their shame is answered.", steps: [
["land", "skeldmar", "Fly to Skeldmar in the Far Reach"], ["duel", "skeldmar", 1, "Sigrun Hollowsworn", 320, "At the cliff watch: face Sigrun Hollowsworn, ember blade and all"],
["win", "reach", "Sigrun's longships come for you"], ["talk", "hrovan", "Bring Sigrun's cold blade to the long hall"]
],
end: "The Hrovan beat their shields. Kaldra the Unbowed says, \"We fly where you fly.\"" },
w3: { n: "The Iskari herds", f: "hollow", say: "The Hollow are driving the Iskari from their hunting grounds.", steps: [
["land", "isk", "Fly to Isk"], ["hold", "isk", 1, 3, "Defend the hunters' camp"], ["foes", "isk", 2, 5, "Clear the ice caves"], ["talk", "iskari", "Herd-Chief Ulvra will hear you"]
],
end: "Ulvra laughs, which nobody has seen her do. \"The Iskari ride with Wardens. Who would have thought.\"" },
w4: { n: "The Drifters cut off", f: "hollow", say: "Hollow raiders have cut the Driftward off from the stars.", steps: [
["fly", "wanderers", "umbralight", "Fly to the lights under Umbra's ice, where the Drifters are trapped"], ["waves", "wanderers", 3, "Break the Hollow ring: three waves"], ["talk", "drifters", "Captain Rook owes you now"]
],
end: "Rook grins. \"A Drifter always pays a debt. Our ships are yours.\"" },
w5: { n: "Ilvane's blessing", f: "hollow", say: "Before any Warden fleet sails, Mother Ilvane blesses it. It is the oldest custom of the Order.", steps: [
["allies", 3, "Be counted an ally by at least three peoples (their tasks raise your standing)"], ["land", "sereth", "Fly to Sereth Vale"],
["visit", "sereth", 2, "Go to the seed-keepers' glade"], ["talk", "sereth", "Kneel for Ilvane's blessing"]
],
end: "Ilvane puts her hand on your head. \"Bring him home if you can. If you cannot, bring yourself home.\"" },
w6: { n: "Landing in the ash", f: "hollow", say: "The Hollow fleet is broken, but Nharos is not. You need a camp on the ground.", steps: [
["land", "nharos", "Land on Nharos"], ["hold", "nharos", 3, 3, "Hold the fallen Concord cutter as your camp"], ["talk", "unhollowed", "Sera Vant brings her people to the camp"]
],
end: "Sera Vant's people light the camp fires. For the first time, Nharos has a light that is not ember." },
w7: { n: "The broken watch", f: "hollow", say: "The broken watch guards the road to the Ashen Keep. Its Ashguard has never lost.", steps: [
["visit", "nharos", 1, "Go to the broken watch"], ["duel", "nharos", 1, "Ashguard Morrec", 340, "Face Ashguard Morrec at the watch"]
],
end: "Morrec yields and looks at you a long time. \"Vael said you would kill me.\" \"Vael was wrong.\"" },
w8: { n: "The pits", f: "hollow", say: "Prisoners are still held in the Hollow's pits.", steps: [
["foes", "nharos", 2, 6, "Drive off the pit-keepers"], ["gather", "nharos", 2, 5, "cage keys", 0xFFD890], ["talk", "unhollowed", "Bring the freed prisoners to Sera Vant"]
],
end: "Among the prisoners is a Concord senator who was never a traitor. \"Venn,\" she says. \"Venn put me here. He is at the ember shrine.\"" },
w9: { n: "Malric Venn", f: "hollow", say: "Malric Venn, the traitor senator, hides at the ember shrine.", steps: [
["visit", "nharos", 0, "Go to the ember shrine"], ["duel", "nharos", 0, "Malric Venn, the traitor", 300, "Face Malric Venn"], ["talk", "unhollowed", "Hand Venn to Sera Vant for the Concord"]
],
end: "Venn says nothing at all. Behind him, on the far ridge, the gate of the Ashen Keep opens by itself." },
h1: { n: "Kethra's welcome", f: "warden", say: "Vael wants you on Nharos. The Unhollowed, who fled the Hollow, are attacking the ember shrine.", steps: [
["land", "nharos", "Land on Nharos"], ["visit", "nharos", 0, "Go to the ember shrine"], ["hold", "nharos", 0, 3, "The Unhollowed attack: hold the shrine"]
],
end: "Mistress Kethra Vahl watches from the shrine steps. \"Not bad. Not good. Come to the Pit when you want to be good.\"" },
h2: { n: "The price on your head", f: "concord", say: "The Concord has put a price on you. The hunters are coming.", steps: [
["waves", "corvanne", 3, "Concord hunters in Corvanne's sky: three waves"], ["land", "dunmarrow", "Fly to Dunmarrow"],
["duel", "dunmarrow", 2, "Ressa Dunewind, bounty hunter", 300, "At the buried ship: face the hunter with your face on her board"]
],
end: "Ressa yields and tears up your bounty. \"No price is worth that.\"" },
h3: { n: "Ears on the Order", f: "warden", say: "Vael wants the listening-spire turned on the Order. The Wardens have sent ships to stop it.", steps: [
["fly", "shatterline", "spire", "Fly to the listening-spire"], ["waves", "shatterline", 3, "The Wardens' ships: three waves"]
],
end: "The spire hums. Every word spoken on Aster Still now reaches Nharos." },
h4: { n: "The First House", f: "warden", say: "The name-stones of the First House are the Order's oldest memory. Vael wants them broken.", steps: [
["gift", "sense", "Learn Dread Sight in the trial of the Moths on Sereth Vale"], ["land", "aster", "Fly to Aster Still"],
["foes", "aster", 1, 6, "Wardens guard the ruins of the First House"], ["gather", "aster", 1, 5, "name-stones", 0xDCE6FF]
],
end: "You hold the stones. You do not break them. Vael notices, and says nothing yet." },
h5: { n: "Hounds of Pell", f: "concord", say: "Before the Hollow fleet can strike Aurelion, Pell's Halo must stop guarding its sky.", steps: [
["fly", "aurelion", "pell", "Fly to Pell's Halo"], ["waves", "aurelion", 2, "The Halo's guard ships: two waves"]
],
end: "Pell's Halo goes dark. Vael, in your head: \"Now we take the sky.\"" },
h6: { n: "The Drifters' toll", f: "concord", say: "The Drifters carry Concord supplies. The Hollow want them to pay a toll instead.", steps: [
["waves", "wanderers", 3, "The Drifters' Concord guard: three waves"], ["talk", "drifters", "Captain Rook pays the Hollow's toll"]
],
end: "Rook pays, and looks at you as if you were a stranger." },
h7: { n: "Iron for the Hollow", f: "warden", say: "Vael wants Kharn star-iron for new ember blades. Hammer-watch will not give it.", steps: [
["land", "kharn", "Fly to Kharn's Anvil"], ["duel", "kharn", 2, "Forge-Captain Brann", 320, "At Hammer-watch: face Forge-Captain Brann"], ["gather", "kharn", 0, 6, "star-iron lumps", 0xD8E0E8]
],
end: "Brann says, \"A Kharn remembers.\" You believe him." },
h8: { n: "The healers' rafts", f: "concord", say: "Concord marines guard Ysolde's healers, who are mending Wardens hurt in Aurelion's sky.", steps: [
["land", "ysolde", "Fly to Ysolde"], ["hold", "ysolde", 1, 3, "Break the marines at the pearl-divers' rafts"]
],
end: "Healer Ondessa does not run. \"I will mend you too,\" she says, \"when you need it.\"" },
h9: { n: "Into the trees", f: "warden", say: "The last Warden ships guard Sereth Vale, where Mother Ilvane waits.", steps: [
["fly", "corvanne", "ormund", "Fly to Ormund"], ["waves", "corvanne", 3, "The last Warden ships: three waves"]
],
end: "Below you, the mile-high trees. Somewhere among them, your old teacher." }
};
var GS_GATE = { 1: ["r1", "r2", "r3", "r4", "r5"], 2: ["i1", "i2", "i3", "i4"], 3: ["n1", "n2", "n3", "n4", "n5"], 4: ["a1", "a2", "a3", "a4", "a5"], 5: ["s1", "s2", "s3", "s4", "s5"],
w7: ["w1", "w2", "w3", "w4", "w5"], w8: ["w6", "w7", "w8", "w9"], h6: ["h1", "h2", "h3", "h4", "h5"], h7: ["h6", "h7", "h8", "h9"] };
var GS_FLOOR = { 1: 2, 2: 4, 3: 8, 4: 12, 5: 16, w7: 21, h6: 21, w8: 27, h7: 27 };
var GS = { s: null, tick: 0, lastIn: Date.now(), saveT: 0, wait: 0 };
function gsClock() { return Date.now() / 1000; }
function gsGet() { if (GS.s)
return GS.s; try {
GS.s = JSON.parse(localStorage.getItem("gx.saga") || "null");
}
catch (e) { } GS.s = GS.s || { done: {}, act: null, gate: null, t: 0 }; return GS.s; }
function gsSave() { try {
localStorage.setItem("gx.saga", JSON.stringify(GS.s));
}
catch (e) { } }
function gsKey(n, h) { return n >= 6 ? (h ? "h" : "w") + n : String(n); }
function gsRoad(h) { var k = ["1", "2", "3", "4", "5"].concat(h ? ["h6", "h7"] : ["w7", "w8"]), L = []; k.forEach(function (x) { L = L.concat(GS_GATE[x]); }); return L; }
function gsNum(id) { var L = gsRoad(wdHollow()), i = L.indexOf(id); return i < 0 ? "" : (i + 1) + " of " + L.length; }
function gsNext(key) { var S = gsGet(); return (GS_GATE[key] || []).filter(function (id) { return !S.done[id]; })[0]; }
function gsNextFree() { return __ZC(462, 183, this, arguments, new.target); }
function gsPlace(w, i) { var O = GX_OUT[w]; return O && O.places[i]; }
function gsLine(st) {
var k = st[0];
if (k === "gather") {
var P = gsPlace(st[1], st[2]);
return "Gather " + st[3] + " " + st[4] + " at " + (P ? P.n : st[1]);
}
if (k === "talk")
return st[2] + gsWho(st[1]);
return st[st.length - 1];
}
function gsWho(p) { return __ZC(462, 184, this, arguments, new.target); }
function gxBodyAny(w) { var out = null; Object.keys(GX_SYS).forEach(function (k) { (GX_SYS[k].bodies || []).forEach(function (b) { if (!out && b.land === w)
out = b; }); }); return out; }
function gsHrs(t) { var m = Math.round(t / 60), h = Math.floor(m / 60); return h ? h + " h " + (m % 60) + " min" : m + " min"; }
var GS_TO = hlTo, GS_TOH = hlToH;
function gsHoldWrap(orig, h) {
return function (n, say) {
var H = hlGet();
if (H.step >= n)
return;
var S = gsGet();
if (S.gate) {
if (S.gate.n === n && !gsNext(gsKey(n, S.gate.h)) && gsReady(S.gate))
return gsOpen();
return;
}
var nx = gsNext(gsKey(n, h));
if (!nx)
return orig.apply(this, arguments);
S.gate = { n: n, h: h ? 1 : 0, say: say || "" };
gsSave();
if (say)
setTimeout(function () { sbSay(say); }, 1200);
GS.wait = gsClock() + 7;
};
}
hlTo = gsHoldWrap(GS_TO, 0);
hlToH = gsHoldWrap(GS_TOH, 1);
function gsNeed(g) { return (GS_FLOOR[gsKey(g.n, g.h)] || 0) * 3600; }
function gsReady(g) { return true; }
function gsIdea() { return __ZC(462, 185, this, arguments, new.target); }
function gsOpen() {
var S = gsGet(), g = S.gate;
if (!g)
return;
S.gate = null;
gsSave();
if (GS.heldSky) {
GS.heldSky = 0;
HOL.hhSky = 0;
}
(g.h ? GS_TOH : GS_TO)(g.n, "<b>The road is open again.</b>");
setTimeout(function () { try {
wdSave();
}
catch (e) { } }, 3000);
}
(function () {
var hs = hlStep;
hlStep = function () { var n = hs.apply(this, arguments); return gsGet().gate ? Math.floor(n) + 0.25 : n; };
var ht = wdHollowTick;
wdHollowTick = function () { if (gsGet().gate)
return; return ht.apply(this, arguments); };
var bd = wdBossDown;
wdBossDown = function (F) { if (F && F.gs)
return; return bd.apply(this, arguments); };
var lb = wdLawBlade;
wdLawBlade = function () { if (SF.gsFoes && SF.gsFoes.list.some(function (F) { return !F.yield; }))
return true; return lb.apply(this, arguments); };
})();
function gsBegin(id, free) { return __ZC(462, 186, this, arguments, new.target); }
function gsStep(say) { return __ZC(462, 187, this, arguments, new.target); }
function gsFoe(side, i, x, z, o) { return __ZC(462, 188, this, arguments, new.target); }
function gsSpawnWave(C, P, n, boss) { return __ZC(462, 189, this, arguments, new.target); }
function gsBattle(C, big, n) { return __ZC(462, 190, this, arguments, new.target); }
function gsItems(A, st, P) { return __ZC(462, 191, this, arguments, new.target); }
function gsTick(dt) { return __ZC(462, 192, this, arguments, new.target); }
(function () {
["keydown", "mousedown", "touchstart", "wheel"].forEach(function (e) { try {
addEventListener(e, function () { GS.lastIn = Date.now(); }, { passive: true });
}
catch (x) { } });
var st = sfTick;
sfTick = function (dt) { var r = st.apply(this, arguments); try {
if (typeof bwVR === "function" && bwVR())
GS.lastIn = Date.now();
gsTick(dt);
if (SF.gsItems)
SF.gsItems.list.forEach(function (it, i) { if (!it.got)
it.m.position.y = it.y + Math.sin(WLD.t * 2 + i) * 0.12; });
}
catch (e) {
if (!GS.w) {
GS.w = 1;
console.warn("saga", e);
}
} return r; };
var sp = spTick;
spTick = function (dt) { var r = sp.apply(this, arguments); try {
if (WLD.on === "space") {
if (typeof bwVR === "function" && bwVR())
GS.lastIn = Date.now();
gsTick(dt);
}
}
catch (e) {
if (!GS.w2) {
GS.w2 = 1;
console.warn("saga", e);
}
} return r; };
var sb = sfBuild;
sfBuild = function () { SF.gsFoes = null; SF.gsItems = null; return sb.apply(this, arguments); };
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
if (B && B.gs) {
var A = gsGet().act;
if (A) {
A.fight = 0;
var st = GS_CH[A.id].steps[A.i];
if (how === "won" && st && st[0] === "win")
gsStep("<b>The sky is clear.</b>");
else if (how === "won" && st && st[0] === "waves") {
A.n = (A.n || 0) + 1;
if (A.n >= st[2])
gsStep("<b>The last wave breaks and runs.</b>");
else {
gsSave();
GS.wait = gsClock() + 8;
sbSay("<b>Wave " + A.n + " of " + st[2] + " beaten.</b> Scanners show more coming. Get ready.");
}
}
else if (how !== "won")
sbSay("Fall back, mend, and come again: they are still out there.");
}
}
}
catch (e) { }
return r;
};
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
var A = gsGet().act, st = A && GS_CH[A.id].steps[A.i];
if (st && st[0] === "talk" && site.frLead && st[1] === site.frLead.p)
setTimeout(function () { gsStep(); }, 500);
}
catch (e) { }
return r;
};
var lg = frLogCard;
frLogCard = function () {
lg.apply(this, arguments);
try {
var c = WLD.card;
if (!c)
return;
var S = gsGet(), road = gsRoad(wdHollow()), done = road.filter(function (id) { return S.done[id]; }).length;
c.querySelectorAll("div").forEach(function (d) { if (/^The Hollow · /.test(d.textContent) && d.querySelector("b") && S.gate) {
var b = d.querySelector("b");
b.textContent = "The Hollow · " + (S.gate.n - 1) + " of 9 · the road to the next turning point";
} });
var d = document.createElement("div");
d.style.cssText = "margin-top:10px;padding:8px;border:1px solid rgba(160,200,255,.45);border-radius:10px;font-size:13px";
var h = "<b style='color:#BFD8FF'>📖 The story · " + done + " of " + road.length + " chapters · story time " + gsHrs(S.t || 0) + "</b>";
if (S.act) {
var C = GS_CH[S.act.id], st = C.steps[S.act.i];
h += "<br>➤ <b>Chapter " + gsNum(S.act.id) + ": " + sbEsc(C.n) + "</b><br>Now: " + sbEsc(gsLine(st)) + (st[0] === "waves" ? " (" + (S.act.n || 0) + " of " + st[2] + " beaten)" : "") + " · step " + (S.act.i + 1) + " of " + C.steps.length;
}
else if (S.gate && gsNext(gsKey(S.gate.n, S.gate.h)))
h += "<br><span style='opacity:.85'>The next chapter is about to begin.</span>";
else if (S.gate)
h += "<br><span style='opacity:.85'>The next turning point opens at story time " + gsHrs(gsNeed(S.gate)) + ". Meanwhile: " + sbEsc(gsIdea()) + ".</span>";
d.innerHTML = h;
c.appendChild(d);
if (!S.act) {
var st0 = hlGet().step, keys = ["1", "2", "3", "4", "5"].concat(wdHollow() ? ["h6", "h7"] : ["w7", "w8"]), miss = [];
keys.forEach(function (k) { var n = parseInt(k.replace(/\D/g, ""), 10); if (st0 >= n)
GS_GATE[k].forEach(function (id) { if (!S.done[id])
miss.push(id); }); });
if (miss.length) {
var id = miss[0], b = document.createElement("div");
b.setAttribute("role", "button");
b.tabIndex = 0;
b.style.cssText = "margin-top:6px;padding:6px 10px;border:1px solid rgba(160,200,255,.5);border-radius:4px;cursor:pointer;font-size:13px";
b.innerHTML = "📖 Play a chapter you missed: <b>" + sbEsc(GS_CH[id].n) + "</b> (" + miss.length + " waiting)";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); gsBegin(id, 1); };
c.appendChild(b);
}
}
}
catch (e) {
console.warn("saga log", e);
}
};
})();
var VQ_ILUN = [0, -58];
function vqGet() { try {
return JSON.parse(localStorage.getItem("sb.vq") || "{}") || {};
}
catch (e) {
return {};
} }
function vqSet(k) { var o = vqGet(); o[k] = Date.now(); try {
localStorage.setItem("sb.vq", JSON.stringify(o));
}
catch (e) { } }
function vqLog() { var S = frStandGet(); return S._log || {}; }
function vqMet() { return !!(vqLog()._veyari_meet || vqGet().met); }
function vqDone() { return !!vqLog()._veyari_task; }
function vqStep() { if (vqDone())
return 0; if (!vqMet())
return 1; return frLogged("lantern") ? 3 : 2; }
function vqArrow(dx, dz) { var rel = (Math.atan2(dx, dz) - (yaw + Math.PI)) * 180 / Math.PI; return "<span style='display:inline-block;transform:rotate(" + (-rel).toFixed(0) + "deg)'>↑</span>"; }
function vqLine() { return __ZC(462, 193, this, arguments, new.target); }
(function () {
if (typeof sfBuild !== "function")
return;
var sb = sfBuild;
sfBuild = function (k) {
var r = sb.apply(this, arguments);
try {
if (k !== "veyar")
return r;
var G = WORLDS.surface.g, x = VQ_ILUN[0], z = VQ_ILUN[1], y = sfHeight(x, z), lite = typeof sbLite === "function" && sbLite();
var il = sfVeyari();
il.scale.setScalar(1.12);
il.position.set(x, y, z);
il.rotation.y = 0;
il.userData.walk = null;
G.add(il);
var circ = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.035, 8, 24), wB(0xFFE08A, { fog: false }));
circ.rotation.x = Math.PI / 2;
circ.position.set(x, y + 3.25, z);
G.add(circ);
var ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.6, lite ? 24 : 48), new THREE.MeshBasicMaterial({ color: 0xFFD98A, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.set(x, y + 0.06, z);
G.add(ring);
SF.vqRing = ring;
var col = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 26, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE6A8, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
col.position.set(x, y + 13, z);
G.add(col);
SF.vqBeam = col;
SF.solids.push({ x: x, z: z, r: 0.7 });
SF.sites.push({ x: x, z: z + 1.5, r: 4.5, name: "Ilun of the Veyari", frLead: { k: "veyar", p: "veyari" },
talk: { name: "Ilun of the Veyari", persona: SP_ALIENS[0].persona + " You are Ilun, who speaks for the Veyari, standing in your own home city on Veyar under your two suns. You ask visitors to find the Sael Lantern, the ancient beacon out in the Reach that guided your first ships home, and scan it, because no Veyari ship has gone out to it in an age and you long to know it still burns.",
greet: "You came through the Gate! Welcome to Veyar, dreamer. I am Ilun. Will you do something for my people?" } });
setTimeout(function () {
if (WLD.on === "surface" && SF.k === "veyar") {
var s = vqStep();
sbSay(s === 1 ? "<b>Veyar.</b> Ilun of the Veyari waits for you at the foot of the crystal towers, under the pillar of light: follow the ★ on the banner and press <b>E</b>." : s === 3 ? "<b>Veyar.</b> Take the Lantern's reading to Ilun, under the pillar of light." : s === 2 ? "<b>Veyar.</b> Ilun is still waiting for the Sael Lantern's reading: it is out in the Reach (take off, then <b>M</b>)." : "<b>Veyar.</b> The Veyari greet you as a friend.");
}
}, 1600);
}
catch (e) {
console.warn("veyar way", e);
}
return r;
};
})();
(function () {
if (typeof sfTick !== "function")
return;
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (WLD.on !== "surface" || SF.k !== "veyar" || !SF.cfg)
return r;
var c = SF.cfg, L = worldLocal(), s = vqStep();
if (SF.vqRing) {
SF.vqRing.material.opacity = 0.35 + 0.25 * Math.sin(WLD.t * 2.4);
SF.vqRing.visible = s === 1 || s === 3;
}
if (SF.vqBeam)
SF.vqBeam.visible = s === 1 || s === 3;
var h = "<b>" + esc(c.title) + "</b> · gravity " + (c.gravity / 9.81).toFixed(2) + " × Earth's · Space to jump";
h += vqLine();
var ldx = 8 - L.x, ldz = 6 - L.z, ld = Math.hypot(ldx, ldz);
h += "<div style='opacity:.7;font-size:.92em'>" + (ld > 7 ? "Your lander, to leave Veyar: " + Math.round(ld) + " m " + vqArrow(ldx, ldz) : "At your lander: <b>E</b> takes off") + "</div>";
if (typeof scMissionBanner === "function") {
var mb = scMissionBanner();
if (mb)
h += "<div style='color:#E8C27A'>" + mb + (SC.m && SC.m.kind === "contact" ? " (Ilun)" : "") + "</div>";
}
worldBanner(h);
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof frLeaderCard === "function") {
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
if (site && site.frLead && site.frLead.p === "veyari") {
vqSet("met");
if (typeof scMissionEvent === "function")
scMissionEvent("meet");
}
}
catch (e) { }
return r;
};
}
if (typeof frTaskStart === "function") {
var ts = frTaskStart;
frTaskStart = function (p) {
if (p !== "veyari")
return ts.apply(this, arguments);
worldCard(null);
vqSet("took");
sbSay("<b>Light on your path.</b> \"Our first ships came home by the Sael Lantern. Find it, out in the Reach, and scan it, and bring me its reading.\" It is marked on your chart now: walk back to your lander, take off, press <b>M</b>, choose ✦ The Sael Lantern, and press <b>E</b> when you reach it.");
};
}
if (typeof frSeen === "function") {
var fs = frSeen;
frSeen = function (k) { return fs.apply(this, arguments) || (k === "lantern" && vqMet()); };
}
if (typeof frTaskDone === "function") {
var td = frTaskDone;
frTaskDone = function (p) { var r = td.apply(this, arguments); try {
if (p === "veyari" && vqDone())
setTimeout(function () { sbSay("<b>Veyar quest done.</b> The Veyari count you as " + frLevel("veyari").toLowerCase() + ". Their skiffs fly beside allies in the Reach."); }, 2600);
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof spBannerTick !== "function")
return;
var bt = spBannerTick;
spBannerTick = function () {
var s = 0;
try {
s = frIn() ? vqStep() : 0;
}
catch (e) { }
if (s !== 2 && s !== 3)
return bt.apply(this, arguments);
var wb = worldBanner, extra = "";
try {
var to = s === 2 ? frDiscPos(FR_DISC.filter(function (d) { return d.k === "lantern"; })[0]) : frWorld("veyar"), d = Math.round(SP.pos.distanceTo(to));
extra = "<div style='color:#FFD98A'><b>★ Veyar quest:</b> " + (s === 2 ? "the Sael Lantern, " + d.toLocaleString() + " m · M, then ✦ The Sael Lantern flies you there; E scans it" : "take the reading to Ilun on Veyar, " + d.toLocaleString() + " m · M, then Veyar, and E to land") + "</div>";
}
catch (e) { }
worldBanner = function (h) { return wb.call(this, (h || "") + extra); };
try {
return bt.apply(this, arguments);
}
finally {
worldBanner = wb;
}
};
})();
var VQ_QST = 0;
function vqOpen() { return __ZC(462, 194, this, arguments, new.target); }
function vqQuestStart() { return __ZC(462, 195, this, arguments, new.target); }
(function () {
if (typeof sfBuild !== "function")
return;
var sb = sfBuild;
sfBuild = function (k) { try {
if (k === "veyar")
vqQuestStart();
}
catch (e) { } return sb.apply(this, arguments); };
})();
var WRH = { t: 0, said: 0, glow: null, a: 0 };
function wrhWant() {
try {
if (typeof hlStep === "function" && hlStep() > 0)
return false;
if (frLogged("wreck") || frSeen("wreck"))
return false;
}
catch (e) {
return false;
}
return true;
}
function wrhGlow() { return __ZC(462, 196, this, arguments, new.target); }
function wrhTick(dt) { return __ZC(462, 197, this, arguments, new.target); }
(function () {
if (typeof frTick !== "function")
return;
var ft = frTick;
frTick = function (dt) { var r = ft.apply(this, arguments); try {
wrhTick(dt);
}
catch (e) {
if (!WRH.warned) {
WRH.warned = 1;
console.warn("wreck hint", e);
}
} return r; };
})();
var SCN = { at: 0, range: 12000, recent: [] };
function scnRisk() { return __ZC(462, 198, this, arguments, new.target); }
function scnNearestNew() {
if (typeof FR_DISC === "undefined" || !FR || !FR.in)
return null;
var best = null;
FR_DISC.forEach(function (d) { if (frLogged(d.k))
return; var dd = SP.pos.distanceTo(frDiscPos(d)); if (dd < SCN.range && (!best || dd < best.d))
best = { d: dd, disc: d }; });
return best;
}
function scnPress() { return __ZC(462, 199, this, arguments, new.target); }
function scnShow() { return SB.view === "seat" && sbHere() && !(typeof walkMode !== "undefined" && !walkMode); }
(function () {
if (typeof sbHudTick !== "function")
return;
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
var h = SB.hud;
if (!h)
return r;
if (!h.dataset.scn) {
h.dataset.scn = "1";
h.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && b.getAttribute("data-sb") === "scan") {
e.stopPropagation();
scnPress();
} });
}
var row = h.querySelector(".b"), btn = row && row.querySelector("[data-sb=scan]");
if (row && scnShow() && !btn) {
btn = document.createElement("button");
btn.setAttribute("data-sb", "scan");
btn.textContent = "📡 Scan";
row.insertBefore(btn, row.firstChild);
}
else if (btn && !scnShow())
btn.remove();
}
catch (e) {
if (!SCN.warned) {
SCN.warned = 1;
console.warn("scanner", e);
}
}
return r;
};
})();
var TRH = { g: null, objs: {}, near: null, sys: "" };
var TRH_PIECES = [
{ n: 1, sys: "sol", at: [-4300, 1950, 14700], name: "A sealed chart-case",
verse: "Where the ninth world keeps its little frozen moon,\nlook up and out, past the last of the Sun's warm light:\nthe first of my seven sleeps there in the cold." },
{ n: 2, sys: "reach", at: [18200, -3500, -5400], name: "A sealed chart-case",
verse: "Through the old stone gate, to the two suns' sky.\nFind the star that failed and only smoulders red:\nI hid the second in its shadow, under its glow." },
{ n: 3, sys: "corvanne", at: [-6800, 1500, 7100], name: "A sealed chart-case",
verse: "Go where the blue-white star spins and storms.\nThe glass-winged swarm will dance where I left the third:\nfollow their light, and look a little higher." },
{ n: 4, sys: "hallowmere", at: [-9700, 2000, -4800], name: "A sealed chart-case",
verse: "Under the twin red suns the great whales sing.\nThey carried the fourth for me, and they keep it still,\nabove the herd, where only the old bull goes." },
{ n: 5, sys: "lantern", at: [-11800, 3000, -6700], name: "A sealed chart-case",
verse: "In the glowing cloud the Quiet ones keep their lamps.\nWhere the Lantern's heart burns brightest, the fifth lies close,\nbeyond the heart, a little further from the Still Star." },
{ n: 6, sys: "shatterline", at: [-8400, -1500, 10600], name: "A sealed chart-case",
verse: "At the dead white star the broken ships drift on.\nA Warden fell there; I took the sixth from her hold\nand hid it below her, in the dark that follows her." },
{ n: 7, sys: "wanderers", at: [10200, -900, 3200], name: "A sealed chart-case",
verse: "Last, where there is no star at all, only ice.\nLights burn under the ice of the lonely world:\nthe seventh waits above them. Then the chart is whole." }
];
var TR_END = "Seven pieces, one chart. It shows a world beyond every star you know: Halcyra, where Saffa Morrow sleeps on a hundred years of gold.";
var TR_OPEN = "Hear the legend of Saffa Morrow, the Corsair of a Hundred Suns. A hundred years of plunder she hid on a world no chart shows, and she tore her own chart in seven, and scattered it, a verse with every piece:";
var TR_CACHES = [
["sol", -1850, 90, 3700], ["sol", 3900, -120, -2100], ["sol", -4300, 60, -1700], ["sol", 1200, -260, -6900], ["sol", -6900, 200, -2600],
["sol", 5200, -300, 6700], ["sol", -8700, -140, 5600], ["sol", 12600, 700, -3100],
["reach", 4200, 600, -7800], ["reach", -14600, -1200, 3000], ["reach", 9600, 2200, 16400], ["reach", -3600, -800, -19800], ["reach", 24600, 300, 9200],
["corvanne", 4800, -700, -9200], ["corvanne", -12400, 400, -3600], ["corvanne", 15800, 1200, 4100],
["hallowmere", 6600, -900, 7800], ["hallowmere", -3200, 1400, 12800], ["hallowmere", 13600, -400, -7600],
["lantern", 5200, -1200, -9400], ["lantern", -7400, 1800, 8600], ["lantern", 12200, 400, 3600],
["aurelion", -11800, -600, -5200], ["aurelion", 3600, 1300, 13200], ["aurelion", 14200, -900, -2600],
["shatterline", 9800, 700, -9600], ["shatterline", -13200, 1600, -2400], ["shatterline", 2400, -1900, 14800],
["wanderers", -8800, 600, -7400], ["wanderers", -2600, -1400, 12600], ["wanderers", 14600, 900, -5600]
].map(function (c, i) { return { id: "c" + i, sys: c[0], at: [c[1], c[2], c[3]] }; });
var TR_NAMES = { sol: "our Sun's sky", reach: "the Far Reach", corvanne: "Corvanne", hallowmere: "Hallowmere", lantern: "the Lantern Nebula", aurelion: "Aurelion", shatterline: "the Shatterline", wanderers: "the Wanderers" };
function trSeason(d) { d = d || new Date(); var m = d.getUTCMonth() + 1, y = d.getUTCFullYear(); if (m === 12)
return "winter-" + (y + 1); if (m <= 2)
return "winter-" + y; return (m <= 5 ? "spring-" : m <= 8 ? "summer-" : "autumn-") + y; }
function trSeasonName(s) { s = s || trSeason(); var p = s.split("-"); return p[0].charAt(0).toUpperCase() + p[0].slice(1) + " " + p[1]; }
function trGet() { return __ZC(462, 200, this, arguments, new.target); }
function trSave() { try {
localStorage.setItem("sb.tr", JSON.stringify(TRH.s));
}
catch (e) { } }
function trSys() { try {
return frIn() ? FR.sys : "sol";
}
catch (e) {
return "sol";
} }
function trPos(o) { var v = new THREE.Vector3(o.at[0], o.at[1], o.at[2]); if (o.sys !== "sol")
v.add(FR.c); return v; }
function trHere() {
var s = trSys(), S = trGet(), out = [];
if (s !== "sol" && FR.sys !== s)
return out;
TR_CACHES.forEach(function (c) { if (c.sys === s && !S.c[c.id])
out.push({ kind: "cache", o: c }); });
var P = TRH_PIECES[S.p];
if (P && P.sys === s)
out.push({ kind: "piece", o: P });
return out;
}
function trBuild(kind) { return __ZC(462, 201, this, arguments, new.target); }
function trTick(dt) { return __ZC(462, 202, this, arguments, new.target); }
function trRaiders() { return __ZC(462, 203, this, arguments, new.target); }
function trOpen(N) { return __ZC(462, 204, this, arguments, new.target); }
function trLegendsCard() { return __ZC(462, 205, this, arguments, new.target); }
(function () {
if (typeof spPromptTick === "function") {
var pt = spPromptTick;
spPromptTick = function () {
try {
if (sbHere() && TRH.near && !SB.battle) {
var N = TRH.near;
return worldPrompt(N.kind === "cache" ? "<b>A corsair's cache</b>, adrift · <b>press E</b> to break it open" : "<b>A sealed chart-case</b> · <b>press E</b> to open it", function () { trOpen(N); });
}
}
catch (e) { }
return pt.apply(this, arguments);
};
}
if (typeof frLogCard === "function") {
var lc = frLogCard;
frLogCard = function () {
var wc = worldCard;
worldCard = function (h, fns) { worldCard = wc; try {
if (typeof h === "string") {
fns = fns || {};
h += worldBtn("tr-leg", "🗺️ Legends", "Saffa Morrow's chart: " + trGet().p + " of 7");
fns["tr-leg"] = function () { trLegendsCard(); };
}
}
catch (e) { } return wc.call(this, h, fns); };
try {
return lc.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
}
if (typeof scnNearestNew === "function") {
var sn = scnNearestNew;
scnNearestNew = function () {
var b = sn.apply(this, arguments);
try {
trHere().forEach(function (h) { var d = SP.pos.distanceTo(trPos(h.o)); if (d < SCN.range && (!b || d < b.d))
b = { d: d, tr: h }; });
}
catch (e) { }
return b;
};
var sp = scnPress;
scnPress = function () { if (TRH.near && Date.now() - SCN.at >= 1200) {
SCN.at = Date.now();
scnRisk();
trOpen(TRH.near);
return;
} return sp.apply(this, arguments); };
}
if (typeof sbEndBattle === "function") {
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
var S = trGet();
if (B && B.why !== "duel" && how !== "won" && how !== "fled" && S.p > 0) {
var P = TRH_PIECES[S.p - 1];
S.p--;
trSave();
if (sbSigned())
sbRpc("tr_lose", { p_n: P.n }).catch(function () { });
setTimeout(function () { worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFB070'>🏴 Robbed</div><div style='margin-top:6px'>While your ship lay dark, the raiders cut into your hold and took piece " + P.n + " of Saffa Morrow's chart. Their tug was not quick enough: it fled, and the case went drifting back where it lay before, in " + sbEsc(TR_NAMES[P.sys]) + ".</div><div style='opacity:.8;margin-top:6px'>You hold " + S.p + " of 7 now. Go and lift it again, and keep your shields up.</div>", {}); }, 2500);
}
}
catch (e) { }
return r;
};
}
if (typeof sbCombatTick === "function") {
var ct = sbCombatTick;
sbCombatTick = function (dt) { try {
trTick(dt);
}
catch (e) {
if (!TRH.warned) {
TRH.warned = 1;
console.warn("treasure", e);
}
} return ct.apply(this, arguments); };
}
})();
var HAL = {};
GX_SYS.halcyra = { name: "Morrow's Lamp", star: "Morrow's Lamp, a lone orange star", ly: 260, light: 0xFFD8A8, known: 0, danger: 1,
about: "A lone orange star off every chart, and one world under it: Halcyra, where Saffa Morrow hid a hundred years of plunder.",
bodies: [
{ k: "morrowlamp", name: "Morrow's Lamp", kind: "A lone orange star", r: 520, orbit: 0, ang: 0, col: 0xFFB070, star: 1,
rows: [["Type", "K-type star, orange"], ["Charted", "Never: it is on no map but hers"]],
notes: ["Stars far from the crowded arms of a galaxy can go unnoticed for a long time; most stars we know of are near us.", "The corsairs called it the Lamp because it was the only light they needed to find home."] },
{ k: "halcyra", name: "Halcyra", kind: "A warm sea world with gold-veined cliffs", r: 160, orbit: 6800, ang: 1.3, land: "halcyra", paint: "halcyra", air: 0xFFE0B0,
law: ["The hoard belongs to the first who brings the whole chart each season.", "No blade is drawn in the Keepers' cove.", "What the sea gives, the Keepers share."],
rows: [["People", "The Keepers: grandchildren of Saffa Morrow's crew"], ["Land", "Islands and coves under gold-veined cliffs"], ["Known for", "The Hoard Vault"]],
notes: ["Gold forms in veins in rock where hot water once ran through cracks deep underground.", "The Keepers have waited three generations for someone to bring the chart back."] }
],
disc: [] };
GX_ORDER.push("halcyra");
GX_PAL.halcyra = [0x2A7A8A, 0xC8A060, 0xF0D890, 0xF0F8FF, "ocean"];
if (typeof SP_SURF !== "undefined") {
SP_SURF.halcyra = { body: null, gravity: 9.0, ground: [0xC8A86A, 0xE8D29A], rough: 8, craters: 0, top: 0x3A8AC0, low: 0xF4DCA8, sun: 1.0, sunCol: 0xFFD8A0, hemi: 0.8, hemiCol: 0xFFE8C0, fogD: 0.0009, fog: 0xE8D0A8, stars: 0,
sky: [{ k: "sun2", dir: [0.5, 0.45, -0.7], size: 120, col: 0xFFB070 }], sunDir: [0.5, 0.45, -0.7], title: "Halcyra, the corsair's world",
about: "Warm gold sand, a green-blue sea and cliffs veined with gold. The Keepers' cove sits under the cliff where the Hoard Vault is cut." };
}
Object.assign(FR_TOWN, {
halcyra: { center: [0, -90], leader: { name: "Old Brannoc Morrow", title: "Keeper of the Hoard", at: [9, -138], sex: "m",
persona: "You are Old Brannoc Morrow, Keeper of the Hoard on Halcyra, the hidden world of the corsair Saffa Morrow, your grandmother. Your people, the Keepers, are the grandchildren of her crew. You are weathered, wry, kind to the young and hard on the greedy. You guard the Hoard Vault in the cliff and judge who comes with the chart: each season the first who brings all seven pieces may open her strongbox, and you write their name in the book of finders. You love sea-songs and you know every verse of the legend. You warn travellers that raiders and other hunters watch the sky.",
greet: "Another one with stars in their eyes. Sit. Have you the whole of her chart, or only the dream of it?" },
folk: [["Wenna Saltgrave", "Net-mender"], ["Davy Copperhand", "Vault-watch"], ["Ysolt Morrow", "Song-keeper"], ["Tamsin Brightkeel", "Boat-builder"], ["Corin Ashcove", "Fisher"], ["Mabyn Goldvein", "Cliff-miner"], ["Jory Windlass", "Lamp-keeper"], ["Elowen Driftwood", "Cook of the Long Table"]],
persona: "You are one of the Keepers of Halcyra, the hidden world of the corsair Saffa Morrow: a grandchild of her crew, living in the cove under the gold-veined cliffs. You are warm, salty, full of sea-songs and old stories of the Corsair of a Hundred Suns, and you are wary of raiders and treasure-hunters who do not respect the Keepers' law." }
});
GX_LOOK.halcyra = function (i) { return { look: { skin: [0xC89A70, 0x8A5A3A, 0xE0B890, 0x5A3A28][i % 4], hair: [0x2A1E14, 0xC8C0B0, 0x8A4A2A, 0x1A1410][i % 4], layer: "coat", layerColor: [0x2A3A5A, 0x6A2A2A, 0x3A4A2A, 0x5A4A3A][i % 4], hat: i % 3 === 0 ? "tricorn" : undefined }, feats: [] }; };
GX_TOWN.halcyra = function (G, C, R, sol, hy) { return __ZC(462, 206, this, arguments, new.target); };
(function () {
if (typeof frSettle === "function") {
var fs = frSettle;
frSettle = function (G, k) { HAL.box = null; return fs.apply(this, arguments); };
}
if (typeof sfTick === "function") {
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k === "halcyra" && HAL.box) {
var L = worldLocal();
if (wNear(L.x, L.z, HAL.box[0], HAL.box[1], 3.4))
worldPrompt("<b>Saffa Morrow's strongbox</b> · <b>press E</b> to try the lock", function () { halBoxCard(); });
}
}
catch (e) { }
return r;
};
}
var lc = frLeaderCard;
frLeaderCard = function (site) { try {
if (site && site.frLead && site.frLead.k === "halcyra")
return site.frLead.box ? halBoxCard() : halKeeperCard(site);
}
catch (e) {
console.warn("halcyra", e);
} return lc.apply(this, arguments); };
})();
function halDate(t) { try {
return new Date(t).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}
catch (e) {
return "";
} }
function halNext() { var d = new Date(), m = d.getUTCMonth() + 1, y = d.getUTCFullYear(), nm = m === 12 || m <= 2 ? 3 : m <= 5 ? 6 : m <= 8 ? 9 : 12, ny = m === 12 ? y + 1 : y; return new Date(Date.UTC(ny, nm - 1, 1)); }
function halStatus() { if (!sbSigned())
return Promise.resolve(null); return sbRpc("tr_status", {}).then(function (r) { return r && r.ok ? r : null; }).catch(function (e) { return sbMissing(e) ? { missing: 1 } : null; }); }
function halFindersHtml(r) { return __ZC(462, 207, this, arguments, new.target); }
function halKeeperCard(site) { return __ZC(462, 208, this, arguments, new.target); }
function halBoxCard() { return __ZC(462, 209, this, arguments, new.target); }
function halClaim() { return __ZC(462, 210, this, arguments, new.target); }
(function () {
if (typeof trLegendsCard !== "function")
return;
var lg = trLegendsCard;
trLegendsCard = function () {
var r = lg.apply(this, arguments);
try {
var c = WLD.card;
if (c && sbSigned()) {
var d = document.createElement("div");
d.id = "hal-leg";
d.style.cssText = "margin-top:8px";
d.textContent = "…";
(c.querySelector(".body") || c).appendChild(d);
halStatus().then(function (s) {
var el = document.getElementById("hal-leg");
if (!el)
return;
if (!s || s.missing) {
el.remove();
return;
}
el.innerHTML = "<div>This season (" + sbEsc(trSeasonName(s.season)) + "):</div><div>" + halHoldLine(s) + "</div>" + halFindersHtml(s);
});
}
}
catch (e) { }
return r;
};
})();
HAL.at = 0;
HAL.st = null;
function halRefresh(force, cb) {
var now = Date.now();
if (!sbSigned() || (!force && now - HAL.at < (FR.sys === "halcyra" && frIn() ? 45000 : 300000))) {
if (cb)
cb(HAL.st);
return;
}
HAL.at = now;
halStatus().then(function (r) { if (r && !r.missing) {
HAL.st = r;
HAL.st.got = Date.now();
try {
halWarn();
}
catch (e) { }
} if (cb)
cb(r); });
}
function halTime(t) { try {
return new Date(t).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
catch (e) {
return "";
} }
SB_GXB.sunwake = function () { return __ZC(462, 211, this, arguments, new.target); };
Object.assign(SB_SHIPS, {
sunwake: { name: "The Sunwake, Saffa Morrow's own ship", short: "Sunwake", icon: "☀️", own: "gx:halcyra", len: 20, hull: 260, shield: 240, spd: 1.45, gun: "sun-lances", shot: "ion", dmg: 20, cool: 0.26, n: 2, cpit: "mm:*",
how: "Hidden somewhere on Halcyra. Only the one who holds Saffa Morrow's hoard may take her.", can: function () { try {
return !!trGet().ship || !!JSON.parse(localStorage.getItem("sb.sunwake") || "0");
}
catch (e) {
return false;
} },
about: "Ivory and gold, with sails of light that catch a star's wind. Saffa Morrow's own ship: quick, tough, and the most beautiful thing in the sky." }
});
if (SB_ORDER.indexOf("sunwake") < 0)
SB_ORDER.push("sunwake");
HAL.ship = [-300, -40];
(function () {
var bt = GX_TOWN.halcyra;
GX_TOWN.halcyra = function (G, C, R, sol, hy) {
var r = bt.apply(this, arguments);
try {
var X = HAL.ship[0], Z = HAL.ship[1], y = hy(X, Z), rock = mmMat(0x7A6650, { tex: "worn", rep: 3 });
[-1, 1].forEach(function (s) { mmSlab(G, rock, 8, 22, 26, X + s * 18, y + 10, Z); for (var q = -12; q <= 12; q += 3)
sol.push({ x: X + s * 18, z: Z + q, r: 4.2 }); });
mmSlab(G, rock, 46, 7, 28, X, y + 23, Z);
mmSlab(G, rock, 46, 24, 6, X, y + 11, Z - 15);
for (var q2 = -20; q2 <= 20; q2 += 3)
sol.push({ x: X + q2, z: Z - 15, r: 3.4 });
for (var b = 0; b < 10; b++)
mmEll(G, rock, 3 + R() * 4, 2 + R() * 3, 3 + R() * 4, X - 30 + R() * 60, y + 0.5, Z + 16 + R() * 20, 10);
var ship = sbFit(SB_GXB.sunwake(), 20);
ship.position.set(X, y + 2.2, Z - 2);
ship.rotation.y = Math.PI * 0.5;
G.add(ship);
var cloth = mmMesh(new THREE.PlaneGeometry(16, 12), mmMat(0x8A7A5A, { ds: true }), X + 4, y + 5.2, Z - 2, G);
cloth.rotation.set(-1.25, 0, 0.2);
var ch = mmMat(0x3A3A3A, { shine: 60 });
[[-8, -8], [8, -8], [-8, 6], [8, 6]].forEach(function (p) { mmRod(G, ch, [X + p[0] * 1.1, y + 0.3, Z + p[1]], [X + p[0] * 0.5, y + 2.2, Z + p[1] * 0.4 - 2], 0.12); });
if (!sbLite())
mmGlow(G, 0xFFD890, 8, 0.25, X, y + 4, Z - 2);
sol.push({ x: X, z: Z - 2, r: 9 });
}
catch (e) {
console.warn("sunwake", e);
}
return r;
};
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k === "halcyra") {
var L = worldLocal();
if (wNear(L.x, L.z, HAL.ship[0], HAL.ship[1] + 10, 9))
worldPrompt("<b>A ship under a sail-cloth</b>, chained in the cave · <b>press E</b> to look closer", function () { halShipCard(); });
}
}
catch (e) { }
return r;
};
})();
function halShipCard() { return __ZC(462, 212, this, arguments, new.target); }
var HWAR = { dome: null, fleet: null, fleetSig: "", waveAt: 0, bat: null, gg: null, ggSig: "", warned: {}, lowWarned: 0 };
function hwSiegesLine(r) { return __ZC(462, 213, this, arguments, new.target); }
function hwShieldBar(v) { return __ZC(462, 214, this, arguments, new.target); }
function halHoldLine(r, where) { return __ZC(462, 215, this, arguments, new.target); }
function hwPower() { var S = SB_SHIPS[SB.k] || {}; var p = ((+S.hull || 100) + (+S.shield || 80)) / 2 + (+S.dmg || 10) * 3 + (SB.second ? 20 : 0); return Math.max(60, Math.min(300, Math.round(p))); }
function hwCard() { return __ZC(462, 216, this, arguments, new.target); }
function hwDefendBtns(r, F) { return __ZC(462, 217, this, arguments, new.target); }
function hwGuild(on) { return __ZC(462, 218, this, arguments, new.target); }
function hwWave(s) { return __ZC(462, 219, this, arguments, new.target); }
function hwAssault(r) { return __ZC(462, 220, this, arguments, new.target); }
(function () {
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, r = eb.apply(this, arguments);
try {
if (B && B.why === "siege") {
if (how !== "won") {
sbSay("The besiegers drive you off. Mend, and come back: the siege still stands.");
return r;
}
sbRpc("tr_repel", { p_siege: B.sg || null, p_how: "wave", p_n: 0 }).then(function (o) {
halRefresh(true);
if (!o || !o.ok) {
if (o && o.say)
sbSay(sbEsc(o.say));
return;
}
if (o.broken) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>🛡️ The siege is broken</div><div style='margin-top:6px'>The last of " + sbEsc(o.by || "them") + "'s ships break and run. Down in the cove the Keepers light every lamp. Sieges beaten: <b>" + (o.won || 1) + "</b>." + (o.gold > 0 ? " 🪙 <b>" + Number(o.gold).toLocaleString() + " gold</b> from the hoard is yours." : "") + "</div>", {});
setTimeout(function () { if (typeof dglTake === "function")
dglTake("world", 1, { src: "champ", lv: 30, theme: "space", where: "the siege of Halcyra" }, "🛡️ Your share of the hoard"); }, 5000);
}
else
sbSay("⚔️ A line of " + sbEsc(o.by || "the siege") + " is broken: its power falls by " + o.down + " to <b>" + o.power + "</b>.");
}).catch(function () { });
}
else if (B && B.why === "assault") {
sbRpc("tr_strike", { p_won: how === "won" }).then(function (o) {
halRefresh(true);
if (!o || !o.ok) {
if (o && o.say)
sbSay(sbEsc(o.say));
return;
}
if (o.took) {
worldCard("<div style='font:600 18px var(--serif,Georgia);color:#FFE7A0'>👑 Halcyra is yours</div><div style='margin-top:6px'>The shield flickers and dies. Your ships go down into the cove; the Keepers watch, and Old Brannoc writes your name in the book: taken by siege. The plunder is yours, and so is the next siege. Keep the shield fed, and bring your guild if you have one.</div>", {});
return;
}
if (o.won)
sbSay("⚔️ Your guns reach the shield: it falls by " + o.down + " to <b>" + o.shield + "%</b>.");
else
sbSay("Halcyra's defence drives you off. Your siege loses strength (power <b>" + o.power + "</b>)" + (o.ended ? ": it is broken, and your fleet goes home." : "."));
}).catch(function () { });
}
}
catch (e) { }
return r;
};
var ct = sbCombatTick;
sbCombatTick = function (dt) {
try {
if (sbHere()) {
halRefresh(false);
var r = HAL.st, here = FR.sys === "halcyra" && frIn();
if (here)
hwSkyTick(dt, r);
if (here && r && r.defender && r.sieges && r.sieges.length && !SB.battle && Date.now() - HWAR.waveAt > 50000) {
HWAR.waveAt = Date.now();
setTimeout(function () { if (!SB.battle && FR.sys === "halcyra" && frIn())
hwWave(r.sieges[0]); }, 8000);
}
}
}
catch (e) { }
return ct.apply(this, arguments);
};
})();
function halWarn() { return __ZC(462, 221, this, arguments, new.target); }
function hwHexTex() { return __ZC(462, 222, this, arguments, new.target); }
function hwSkyTick(dt, r) { return __ZC(462, 223, this, arguments, new.target); }
HAL.shieldHouse = null;
HAL.bats = [];
(function () {
var gt = GX_TOWN.halcyra;
GX_TOWN.halcyra = function (G, C, R, sol, hy) {
var r = gt.apply(this, arguments);
try {
var brass = mmMat(0xC8A050, { shine: 70, tex: "brass" }), stone = mmMat(0xB8A888, { tex: "worn", rep: 2 }), iron = mmMat(0x2A2A30, { shine: 50 }), glass = mmMat(0x9AD8FF, { glow: 0.9, shine: 95 });
var sx = C[0] + 26, sz = C[1] - 30, sy = hy(sx, sz), S = mmG(G, sx, sy, sz);
mmCyl(S, stone, 3.2, 3.6, 7, 0, 3.5, 0, 0, 0, 0, 16);
mmCyl(S, stone, 3.6, 3.6, 0.6, 0, 7.2, 0, 0, 0, 0, 16);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
mmSlab(S, brass, 0.25, 7, 0.3, Math.cos(a) * 3.5, 3.5, Math.sin(a) * 3.5, 0, -a, 0);
}
mmSlab(S, mmMat(0x3A2A1A, { tex: "worn" }), 1.6, 2.6, 0.2, 0, 1.3, 3.45);
mmCyl(S, brass, 0.25, 0.25, 4, 0, 9.4, 0);
mmEll(S, glass, 0.9, 1.6, 0.9, 0, 11.2, 0, 12);
[0, 1, 2].forEach(function (q) { var tr = mmTorus(S, brass, 1.6 + q * 0.25, 0.07, 0, 11.2, 0); if (tr)
tr.rotation.set(q * 1.05, q * 0.6, 0); });
if (!sbLite())
mmGlow(S, 0x9AD8FF, 9, 0.5, 0, 11.2, 0);
sol.push({ x: sx, z: sz, r: 3.8 });
HAL.shieldHouse = [sx, sz + 4.6];
HAL.crystal = S;
HAL.bats = [];
[[-38, 48], [34, 50]].forEach(function (p, i) {
var bx = C[0] + p[0], bz = C[1] + p[1], by = hy(bx, bz), B = mmG(G, bx, by, bz);
mmCyl(B, stone, 3, 3.4, 1.4, 0, 0.7, 0, 0, 0, 0, 14);
for (var q = 0; q < 10; q++) {
var a = q / 10 * Math.PI * 2;
if (q === 7)
continue;
mmSlab(B, stone, 1.6, 1.1, 0.6, Math.cos(a) * 3.1, 1.9, Math.sin(a) * 3.1, 0, -a + Math.PI / 2, 0);
}
var T = mmG(B, 0, 1.5, 0);
mmCyl(T, iron, 1.1, 1.3, 0.8, 0, 0.4, 0, 0, 0, 0, 12);
var gun = mmG(T, 0, 1.1, 0, -0.6, 0, 0);
mmCyl(gun, iron, 0.28, 0.34, 4.4, 0, 0, 1.8, Math.PI / 2, 0, 0, 10);
mmCyl(gun, iron, 0.28, 0.34, 4.4, 0.8, 0, 1.8, Math.PI / 2, 0, 0, 10);
mmSlab(gun, brass, 2.2, 0.9, 1.4, 0.4, 0, -0.2);
mmSlab(B, iron, 1.6, 0.08, 1.0, 0, 1.5, -1.9, -0.4, 0, 0);
sol.push({ x: bx, z: bz, r: 3.3 });
HAL.bats.push({ x: bx, z: bz, y: by, T: T, gun: gun, seat: [bx, bz - 4.2] });
});
HWAR.G = G;
HWAR.gg = null;
HWAR.ggSig = "";
hwGuildDecor(G, C, hy);
}
catch (e) {
console.warn("halcyra war", e);
}
return r;
};
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k === "halcyra") {
if (HWAR.bat) {
hwBatTick(dt);
return r;
}
var L = worldLocal();
if (HAL.shieldHouse && wNear(L.x, L.z, HAL.shieldHouse[0], HAL.shieldHouse[1], 3.4))
worldPrompt("<b>The shield house</b> · <b>press E</b> for Halcyra's shield, guns and sieges", function () { hwCard(); });
else
HAL.bats.forEach(function (B) { if (wNear(L.x, L.z, B.seat[0], B.seat[1], 3))
worldPrompt("<b>A gun battery</b> · <b>press E</b> to man it", function () { hwBatStart(B); }); });
if (HAL.crystal && HAL.crystal.children.length) {
var s = HAL.st, v = s && s.found ? (+s.shield || 0) / 100 : 0.15;
HAL.crystal.rotation.y += dt * 0.3;
}
if (HWAR.ggSig !== hwGuildSig() && HWAR.gg && HWAR.gg.parent) {
var G = HWAR.gg.parent;
hwGuildDecor(G, HWAR.ggC, HWAR.ggHy);
}
}
}
catch (e) { }
return r;
};
})();
function hwGuildSig() { var g = HAL.st && HAL.st.found && HAL.st.guild; return g ? g.id + ":" + (g.name || "") : ""; }
function hwBannerTex(g) { return __ZC(462, 224, this, arguments, new.target); }
function hwGuildDecor(G, C, hy) { return __ZC(462, 225, this, arguments, new.target); }
function hwBatStart(B) { return __ZC(462, 226, this, arguments, new.target); }
function hwFire() { return __ZC(462, 227, this, arguments, new.target); }
function hwBatTick(dt) { return __ZC(462, 228, this, arguments, new.target); }
function hwBatEnd() { return __ZC(462, 229, this, arguments, new.target); }
var TC = { el: null, cv: null, x: 0, y: 0, z: 1, drag: null, hover: null, sel: null, raf: 0, t: 0, pinch: 0 };
var TC_PLACES = [
{ k: "sol", n: 1, x: 95, y: 330, name: "The Sun", note: "Home: Earth, the stations, the nine worlds. The ninth keeps its little frozen moon." },
{ k: "reach", n: 2, x: 235, y: 250, name: "The Far Reach", note: "Through the old stone gate past Pluto: Ilsa and Teth, the two suns, and the star that failed." },
{ k: "corvanne", n: 3, x: 360, y: 395, name: "Corvanne", note: "A blue-white star that spins and storms; the glass-winged swarm dances there." },
{ k: "aurelion", n: 3, x: 395, y: 170, name: "Aurelion", note: "Aurel, a golden star. The Concord meets in the great dome; no guns fire there." },
{ k: "hallowmere", n: 4, x: 500, y: 300, name: "Hallowmere", note: "Twin red suns, Hallow and Mere. The great whales sing there." },
{ k: "lantern", n: 5, x: 625, y: 190, name: "The Lantern Nebula", note: "The Still Star inside a glowing cloud; the Quiet ones keep their lamps." },
{ k: "shatterline", n: 6, x: 735, y: 410, name: "The Shatterline", note: "Nhar, a dead white star. Broken ships drift there, and raiders." },
{ k: "wanderers", n: 7, x: 850, y: 255, name: "The Wanderers", note: "No star at all, only ice, and lights under the ice." },
{ k: "halcyra", n: 8, x: 955, y: 360, name: "Halcyra", note: "Morrow's Lamp, and Halcyra under it: Saffa Morrow's hidden world." }
];
var TC_TEARS = [0, 170, 300, 450, 570, 690, 800, 915];
function tcTear(i) {
var x0 = TC_TEARS[i], pts = [];
for (var y = 0; y <= 600; y += 20) {
var j = Math.sin(i * 12.9898 + y * 0.0789) * 43758.5453;
j = j - Math.floor(j);
pts.push([x0 + (j - 0.5) * 22, y]);
}
return pts;
}
function tcHave() { var S = trGet(); return S.p || 0; }
function tcKnown(k) { if (k === "sol")
return true; try {
return !!gxKnown()[k];
}
catch (e) {
return false;
} }
function tcOpen() { return __ZC(462, 230, this, arguments, new.target); }
function tcBtnCss() { return "background:rgba(40,28,16,.9);color:#F4E6C8;border:1px solid #C9A85A;border-radius:10px;padding:5px 11px;cursor:pointer;font:600 14px Georgia,serif"; }
function tcClose() { if (!TC.el)
return; cancelAnimationFrame(TC.raf); TC.el.remove(); TC.el = null; document.body.classList.remove("tc-open"); window.removeEventListener("keydown", TC.keyEsc, true); }
function tcFit() { var cv = TC.cv, W = cv.clientWidth, H = cv.clientHeight; TC.z = Math.min(W / 1060, H / 660); TC.x = (W - 1000 * TC.z) / 2; TC.y = (H - 600 * TC.z) / 2; }
function tcZoom(f, cx, cy) { var cv = TC.cv; cx = cx == null ? cv.clientWidth / 2 : cx; cy = cy == null ? cv.clientHeight / 2 : cy; var nz = Math.max(0.3, Math.min(5, TC.z * f)); f = nz / TC.z; TC.x = cx - (cx - TC.x) * f; TC.y = cy - (cy - TC.y) * f; TC.z = nz; }
function tcToChart(px, py) { return [(px - TC.x) / TC.z, (py - TC.y) / TC.z]; }
function tcStripAt(cx) { for (var i = 0; i < 7; i++)
if (cx >= TC_TEARS[i] && cx < TC_TEARS[i + 1])
return i + 1; return cx >= TC_TEARS[7] ? 8 : 0; }
function tcPlaceAt(cx, cy) { var best = null, bd = 26 / Math.max(0.6, TC.z) + 8; TC_PLACES.forEach(function (P) { var d = Math.hypot(P.x - cx, P.y - cy); if (d < bd) {
bd = d;
best = P;
} }); return best; }
function tcSeen(P) { var have = tcHave(); return P.n === 8 ? have >= 7 : P.n <= have; }
function tcHoverAt(px, py) { return __ZC(462, 231, this, arguments, new.target); }
function tcClick(px, py) { return __ZC(462, 232, this, arguments, new.target); }
var TC_INK = "#2B1A0C", TC_INK2 = "rgba(43,26,12,", TC_RED = "rgba(122,30,18,";
function tcRnd(s) { return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function tcArtKey() { var have = tcHave(); return have + ":" + TC_PLACES.map(function (P) { return tcKnown(P.k) ? 1 : 0; }).join(""); }
function tcArt() { return __ZC(462, 233, this, arguments, new.target); }
function tcText(x, t, px, py, size, style, col, track) { return __ZC(462, 234, this, arguments, new.target); }
function tcRhumbs(x, cx, cy, R, small) {
x.save();
x.lineWidth = small ? 0.3 : 0.45;
for (var i = 0; i < 32; i++) {
var a = i / 32 * Math.PI * 2;
x.strokeStyle = i % 4 === 0 ? TC_INK2 + "0.22)" : i % 2 === 0 ? TC_RED + "0.16)" : "rgba(40,90,60,.15)";
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a) * 1400, cy + Math.sin(a) * 1400);
x.stroke();
}
x.restore();
}
function tcEngStar(x, px, py, r, a) { return __ZC(462, 235, this, arguments, new.target); }
function tcFrame(x) { return __ZC(462, 236, this, arguments, new.target); }
function tcRose(x, cx, cy, r, small) { return __ZC(462, 237, this, arguments, new.target); }
function tcCartouche(x, cx, cy) { return __ZC(462, 238, this, arguments, new.target); }
function tcScale(x, cx, cy) { return __ZC(462, 239, this, arguments, new.target); }
function tcSunArt(x, px, py, r, col, rays) { return __ZC(462, 240, this, arguments, new.target); }
function tcPlaceArt(x, P, i, R) { return __ZC(462, 241, this, arguments, new.target); }
function tcSeal(x, px, py) { return __ZC(462, 242, this, arguments, new.target); }
var TC_COL = { sol: "rgba(240,190,90,1)", reach: "rgba(235,150,120,1)", corvanne: "rgba(150,180,230,1)", aurelion: "rgba(235,200,100,1)", hallowmere: "rgba(225,110,80,1)", lantern: "rgba(170,200,235,1)", shatterline: "rgba(205,210,225,1)", wanderers: "rgba(160,190,210,1)", halcyra: "rgba(240,195,70,1)" };
function tcStripPath(x, i, o) { return __ZC(462, 243, this, arguments, new.target); }
function tcStripLie(i) { var R = tcRnd(1000 + i * 37); R(); return { dx: (R() - 0.5) * 5, dy: (R() - 0.5) * 6, a: (R() - 0.5) * 0.008 }; }
function tcDraw() { return __ZC(462, 244, this, arguments, new.target); }
(function () {
if (typeof trLegendsCard === "function") {
var lg = trLegendsCard;
trLegendsCard = function () {
var wc = worldCard;
worldCard = function (h, fns) { worldCard = wc; try {
if (typeof h === "string") {
fns = fns || {};
h = h.replace("</div>", "</div>" + worldBtn("tc-open", "🗺️ Lay out the chart", "Her chart, drawn: " + tcHave() + " of 7 strips · stars, verses, courses"));
fns["tc-open"] = function () { worldCard(null); tcOpen(); };
}
}
catch (e) { } return wc.call(this, h, fns); };
try {
return lg.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
}
var W = WORLDS.space;
if (W) {
var k = W.key_;
W.key_ = function (e) { if (e.code === "KeyM" && !TC.el && !(typeof GX !== "undefined" && GX.jumping)) {
tcOpen();
return true;
} return k ? k.call(this, e) : false; };
}
if (typeof sbHudTick === "function") {
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
var h = SB.hud;
if (!h)
return r;
if (!h.dataset.tc) {
h.dataset.tc = "1";
h.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b)
return; var w = b.getAttribute("data-sb"); if (w === "tc") {
e.stopPropagation();
tcOpen();
}
else if (w === "hw") {
e.stopPropagation();
hwCard();
} });
}
var row = h.querySelector(".b");
if (!row)
return r;
var want = tcHave() > 0, b1 = row.querySelector("[data-sb=tc]");
if (want && !b1) {
b1 = document.createElement("button");
b1.setAttribute("data-sb", "tc");
b1.textContent = "🗺️ Chart";
b1.title = "Saffa Morrow's chart (M)";
row.appendChild(b1);
}
else if (!want && b1)
b1.remove();
var hw = FR.sys === "halcyra" && frIn(), b2 = row.querySelector("[data-sb=hw]");
if (hw && !b2) {
b2 = document.createElement("button");
b2.setAttribute("data-sb", "hw");
b2.textContent = "🏰 Halcyra";
row.appendChild(b2);
}
else if (!hw && b2)
b2.remove();
}
catch (e) { }
return r;
};
}
})();
var SPG_CATS = { ore: "Ores", metal: "Metals", crystal: "Crystals and gems", fuel: "Fuel", food: "Food and drink", spice: "Spice",
cloth: "Cloth and silk", hide: "Hides and shell", timber: "Timber", reagent: "Reagents", tech: "Machine parts", relic: "Relics",
ice: "Ice and water", art: "Fine goods", salvage: "Salvage", gas: "Gases" };
var SPG_GOODS = {
gd_sunforged_iron: { n: "Sunforged iron", home: "mercury", cat: "metal", base: 6, t: 2, note: "Iron baked hard on Mercury's day side: steel without coal", ic: ["ingot", 0xB8A090, 0x6A4A30] },
gd_impact_glass: { n: "Impact glass", home: "mercury", cat: "crystal", base: 5, t: 2, note: "Glass beads from old meteor strikes: lenses, vials", ic: ["beads", 0x7AC8A8, 0x2A6A5A] },
gd_cloud_sulphur: { n: "Cloud sulphur", home: "venus", cat: "reagent", base: 5, t: 2, note: "Yellow sulphur skimmed from Venus's clouds: blasting powder, draughts", ic: ["powder", 0xF0D040, 0x9A8A20] },
gd_pressure_diamond: { n: "Pressure diamond", home: "venus", cat: "crystal", base: 24, t: 4, note: "Pressed in the crushing deep air: gem settings, cutting heads", ic: ["gem", 0xE8F4FF, 0x8AB8D8] },
gd_earth_grain: { n: "Earth grain", home: "earth", cat: "food", base: 2, t: 1, note: "Wheat, rice and maize: every station and ship eats it", ic: ["sack", 0xE0C080, 0x8A6A30] },
gd_seed_bank: { n: "Seed-bank packet", home: "earth", cat: "food", base: 9, t: 2, note: "Seeds of a hundred Earth plants: farms on new worlds", ic: ["packet", 0x6AB85A, 0x2A5A2A] },
gd_cotton_bolt: { n: "Cotton bolt", home: "earth", cat: "cloth", base: 4, t: 1, note: "Plain strong cloth: bandages, robes, sail patches", ic: ["bolt", 0xF0ECE0, 0xA8A090] },
gd_helium3: { n: "Helium-3 canister", home: "moon", cat: "fuel", base: 14, t: 3, note: "Fusion fuel mined from moon dust: drives, energy weapons", ic: ["canister", 0xD8DCE8, 0x4A8AE8] },
gd_moonstone_block: { n: "Moonstone block", home: "moon", cat: "crystal", base: 7, t: 2, note: "Pale glowing stone: moonstone rings, lamps", ic: ["block", 0xD8E0F0, 0x8A9AB8] },
gd_red_oxide: { n: "Red iron oxide", home: "mars", cat: "ore", base: 4, t: 1, note: "Mars's red dust is iron: smelt it to iron and steel", ic: ["ore", 0xC8603A, 0x6A2A1A] },
gd_polar_water: { n: "Polar ice water", home: "mars", cat: "ice", base: 3, t: 1, note: "Clean water from the Martian ice caps", ic: ["flask", 0x9AD0F0, 0x3A7AB8] },
gd_metallic_hydrogen: { n: "Metallic hydrogen cell", home: "jupiter", cat: "fuel", base: 20, t: 4, note: "Squeezed from Jupiter's depths: the strongest fuel cells", ic: ["cell", 0xC8D0E0, 0xE8A04A] },
gd_europa_brine: { n: "Europa brine", home: "jupiter", cat: "reagent", base: 8, t: 2, note: "Salt water from under Europa's ice: curing, draughts", ic: ["flask", 0x8AC8E0, 0x2A6A8A] },
gd_ring_ice: { n: "Ring ice", home: "saturn", cat: "ice", base: 4, t: 1, note: "Pure water ice cut from Saturn's rings", ic: ["shard", 0xE8F0F8, 0x9AB8D0] },
gd_titan_methane: { n: "Titan methane", home: "saturn", cat: "gas", base: 7, t: 2, note: "Liquid fuel from Titan's lakes: lamps, engines", ic: ["canister", 0xE8B060, 0x8A5A20] },
gd_diamond_rain: { n: "Diamond rain", home: "uranus", cat: "crystal", base: 18, t: 3, note: "Small diamonds that fall through Uranus's air: gem dust, drill bits", ic: ["gem", 0xC8F0F8, 0x4AA8C0] },
gd_triton_frost: { n: "Triton nitrogen frost", home: "neptune", cat: "gas", base: 9, t: 3, note: "Frozen nitrogen from Neptune's moon: cooling for guns and drives", ic: ["shard", 0xD0E0FF, 0x5A7AD8] },
gd_tholin_dust: { n: "Tholin dust", home: "pluto", cat: "reagent", base: 10, t: 3, note: "Red-brown dust of the far cold: dyes, rare inks", ic: ["powder", 0xB86A3A, 0x5A2A10] },
gd_heart_ice: { n: "Heart-ice", home: "pluto", cat: "ice", base: 12, t: 3, note: "Nitrogen ice from Pluto's heart-shaped plain", ic: ["shard", 0xF0E8E0, 0xC8A890] },
gd_veyari_starsilk: { n: "Veyari starsilk", home: "veyar", cat: "cloth", base: 16, t: 3, note: "Silk that shines faintly: robes, cloaks, bow strings", ic: ["bolt", 0xC8B8FF, 0x6A58C8] },
gd_veyari_lens: { n: "Veyari lens", home: "veyar", cat: "tech", base: 14, t: 3, note: "A perfect ground lens: scopes, sniper sights, star lamps", ic: ["lens", 0xA8E0FF, 0x3A6A9A] },
gd_glowmoss_tea: { n: "Glow-moss tea", home: "veyar", cat: "food", base: 5, t: 1, note: "A gentle tea that glows in the cup: healing draughts", ic: ["leaf", 0x8AF0A8, 0x2A8A4A] },
gd_reef_pearl: { n: "Reef pearl", home: "maruondo", cat: "crystal", base: 11, t: 2, note: "Pearls from Maru-Ondo's endless reefs: inlay, rings", ic: ["pearl", 0xF8F0F0, 0xC8B8C8] },
gd_kelp_cloth: { n: "Kelp-cloth", home: "maruondo", cat: "cloth", base: 5, t: 1, note: "Tough woven kelp: sails, nets, sea armour linings", ic: ["bolt", 0x5A8A4A, 0x2A4A2A] },
gd_tide_salt: { n: "Tide salt", home: "maruondo", cat: "spice", base: 3, t: 1, note: "Sea salt dried in the Ondai sun", ic: ["sack", 0xF0F0F0, 0x9AB0C0] },
gd_spice_cake: { n: "Tullik spice-cake", home: "tullimar", cat: "food", base: 6, t: 1, note: "The Tullik's famous cake: everyone in the Reach wants it", ic: ["cake", 0xC88A4A, 0x6A3A1A] },
gd_hum_rock: { n: "Hum-rock", home: "tullimar", cat: "crystal", base: 10, t: 2, note: "A stone that hums when warm: tuning, sound charms", ic: ["ore", 0x9A8AC8, 0x4A3A7A] },
gd_tullik_lamp_oil: { n: "Tullik lamp oil", home: "tullimar", cat: "fuel", base: 4, t: 1, note: "Sweet-smelling lamp oil: lanterns, fire arrows", ic: ["flask", 0xF0C060, 0x8A6A20] },
gd_circuit_core: { n: "Orrem circuit-core", home: "orr", cat: "tech", base: 22, t: 4, note: "A thinking core from the silent machines: pulse guns, automatons", ic: ["chip", 0x5AD8C8, 0x1A4A48] },
gd_silent_alloy: { n: "Silent alloy", home: "orr", cat: "metal", base: 15, t: 3, note: "The Orrem's grey metal that never rusts: armour, gun bodies", ic: ["ingot", 0xA8B0B8, 0x4A5058] },
gd_servo_gears: { n: "Servo gears", home: "orr", cat: "tech", base: 8, t: 2, note: "Fine machine gears: crossbows, clockwork, gadgets", ic: ["gear", 0xC8A060, 0x5A4A2A] },
gd_fortress_stone: { n: "Red fortress stone", home: "skeldmar", cat: "ore", base: 5, t: 2, note: "The Hrovan's building stone: forges, walls, grindstones", ic: ["block", 0xB84A3A, 0x5A2018] },
gd_war_iron: { n: "Hrovan war-iron", home: "skeldmar", cat: "metal", base: 12, t: 3, note: "Dark iron the Hrovan fold a hundred times: axes, hammers", ic: ["ingot", 0x5A5050, 0x2A2020] },
gd_skeld_mead: { n: "Skeld mead", home: "skeldmar", cat: "food", base: 7, t: 2, note: "Strong honey wine of the fortress halls", ic: ["bottle", 0xE0A040, 0x6A3A10] },
gd_mile_heartwood: { n: "Mile-tree heartwood", home: "sereth", cat: "timber", base: 14, t: 3, note: "Wood from trees a mile high: the best bows and staves", ic: ["log", 0x8A5A30, 0x4A2A10] },
gd_sap_amber: { n: "Sereth sap-amber", home: "sereth", cat: "crystal", base: 9, t: 2, note: "Golden amber from the great trees: charms, varnish", ic: ["gem", 0xF0A030, 0x8A4A10] },
gd_canopy_silk: { n: "Canopy silk", home: "sereth", cat: "cloth", base: 11, t: 3, note: "Spun by moths of the high canopy: light armour, bow strings", ic: ["bolt", 0xE8F0C8, 0x8A9A5A] },
gd_water_glass: { n: "Water-glass", home: "dunmarrow", cat: "crystal", base: 8, t: 2, note: "Glass that pulls water from the air: canteens, blades that never dull", ic: ["shard", 0x9AE8F0, 0x3A8A9A] },
gd_dun_salt: { n: "Dun salt", home: "dunmarrow", cat: "spice", base: 3, t: 1, note: "Desert salt from the flats: curing hides and meat", ic: ["sack", 0xF0E8D8, 0xB8A888] },
gd_mesa_copper: { n: "Mesa copper", home: "dunmarrow", cat: "ore", base: 4, t: 1, note: "Green copper ore from the mesas", ic: ["ore", 0x4AA88A, 0x8A5A30] },
gd_fish_oil: { n: "Stilt-city fish oil", home: "ysolde", cat: "fuel", base: 3, t: 1, note: "Lamp oil and leather oil from Ysolde's fleets", ic: ["bottle", 0xE0D070, 0x7A6A20] },
gd_sea_silk: { n: "Ysolde sea-silk", home: "ysolde", cat: "cloth", base: 13, t: 3, note: "Golden silk from sea shells: fine robes, sails", ic: ["bolt", 0xF0D890, 0xA88A3A] },
gd_tide_pearl: { n: "Tide pearl", home: "ysolde", cat: "crystal", base: 12, t: 3, note: "Pearls of the twin red suns' tides", ic: ["pearl", 0xF8D8D0, 0xC88A80] },
gd_star_iron: { n: "Kharn star-iron", home: "kharn", cat: "metal", base: 18, t: 4, note: "Iron pressed under Kharn's crushing pull: starmetal without the star", ic: ["ingot", 0x6A7088, 0x2A3048] },
gd_anvil_stone: { n: "Anvil black stone", home: "kharn", cat: "ore", base: 6, t: 2, note: "Dense black stone: anvils, hammer heads, grindstones", ic: ["block", 0x2A2A30, 0x6A6A78] },
gd_kharn_coke: { n: "Kharn forge coke", home: "kharn", cat: "fuel", base: 5, t: 2, note: "The hottest coal of the Anvil's forges: darksteel and better", ic: ["ore", 0x3A3A3A, 0xE86A2A] },
gd_quiet_crystal: { n: "Quiet-star crystal", home: "aster", cat: "crystal", base: 26, t: 4, note: "A crystal that holds the Still Star's light: blade shards, wands", ic: ["gem", 0xE8F8FF, 0xA8C8FF] },
gd_warden_incense: { n: "Warden incense", home: "aster", cat: "reagent", base: 9, t: 2, note: "Calming smoke of the Order: wards, draughts of calm", ic: ["stick", 0xD8C8A8, 0x8A6A4A] },
gd_aurel_gold: { n: "Aurel gold leaf", home: "aurelion", cat: "art", base: 16, t: 3, note: "Beaten gold of the golden world: gilding, gold rings", ic: ["leaf", 0xF8D060, 0xB8902A] },
gd_concord_wine: { n: "Concord wine", home: "aurelion", cat: "food", base: 12, t: 2, note: "Served at every Senate feast", ic: ["bottle", 0x8A1A3A, 0x3A0A18] },
gd_archive_vellum: { n: "Archive vellum", home: "aurelion", cat: "art", base: 10, t: 2, note: "Scribe's vellum from the Archive: spell tomes, star charts", ic: ["scroll", 0xF0E0C0, 0xA88A5A] },
gd_isk_frost: { n: "Isk frost-crystal", home: "isk", cat: "crystal", base: 13, t: 3, note: "Ice that never melts: frost staves, cooling", ic: ["shard", 0xD8F8FF, 0x6AB8E8] },
gd_ash_iron: { n: "Hollow ash-iron", home: "nharos", cat: "metal", base: 17, t: 4, note: "Grey iron of the dead sun's world: darksteel and shadow blades", ic: ["ingot", 0x5A5A62, 0x2A2A30] },
gd_shadow_glass: { n: "Shadow-glass", home: "nharos", cat: "crystal", base: 20, t: 4, note: "Black glass that drinks light: shadow blades, cloaks", ic: ["shard", 0x2A2238, 0x8A6AC8] },
gd_deadsun_ember: { n: "Dead-sun ember", home: "nharos", cat: "fuel", base: 15, t: 4, note: "A coal that remembers its star: starmetal smelting", ic: ["ore", 0x3A2A2A, 0xF0E8FF] },
gd_hull_plate: { n: "Salvaged hull plate", home: "driftward", cat: "salvage", base: 6, t: 2, note: "Plating from a thousand old ships: armour, patch kits", ic: ["plate", 0x8A9098, 0x4A5058] },
gd_drifter_rations: { n: "Drifter rations", home: "driftward", cat: "food", base: 3, t: 1, note: "Hard tack of the fleet: keeps for years", ic: ["packet", 0xC8A870, 0x6A5030] },
gd_patch_wire: { n: "Patchwork wire", home: "driftward", cat: "tech", base: 5, t: 1, note: "Copper wire pulled from old ships: coils, traps, gadgets", ic: ["coil", 0xD88A4A, 0x6A3A1A] },
gd_corsair_doubloon: { n: "Corsair doubloon", home: "halcyra", cat: "art", base: 25, t: 4, note: "Saffa Morrow's own gold, stamped with a hundred suns", ic: ["coin", 0xF8D050, 0xA87A1A] },
gd_halcyra_amber: { n: "Halcyra sea-amber", home: "halcyra", cat: "crystal", base: 14, t: 3, note: "Amber washed up in the Keepers' cove", ic: ["gem", 0xF0B040, 0xA0601A] },
gd_keepers_rum: { n: "Keepers' rum", home: "halcyra", cat: "food", base: 11, t: 2, note: "Dark rum of the Long Table", ic: ["bottle", 0x6A2A10, 0x2A1008] },
gd_nebula_vapour: { n: "Sael nebula vapour", home: "veil", cat: "gas", base: 12, t: 3, note: "Glowing gas from the Veil of Sael: void dust, star inks", ic: ["canister", 0xE88AD8, 0x6A2A8A] },
gd_comet_ice: { n: "Comet ice", home: "comet", cat: "ice", base: 10, t: 3, note: "Ancient ice from a wandering comet: frost staves", ic: ["shard", 0xC8E8F8, 0x6A9AC8] },
gd_dwarf_soot: { n: "Brown-dwarf soot", home: "kethrin", cat: "fuel", base: 8, t: 2, note: "Rich soot from the failed star: forge fuel, black dye", ic: ["powder", 0x4A2A20, 0xC84A2A] },
gd_glasswing_scale: { n: "Glasswing scale", home: "glasswing", cat: "hide", base: 15, t: 3, note: "A clear scale shed by the starlight swarm: light shields, lenses", ic: ["scale", 0xD8F0FF, 0x8AC8F0] },
gd_whale_amber: { n: "Whale-song amber", home: "starwhale", cat: "relic", base: 22, t: 4, note: "Shed by the star-whales, never taken: it hums their song", ic: ["gem", 0xC8A0F0, 0x6A4AA8] },
gd_lantern_dust: { n: "Lantern light-dust", home: "lanternheart", cat: "reagent", base: 18, t: 4, note: "Dust of pure light from the Lantern's heart: stardust, starwood", ic: ["powder", 0xF8F8E0, 0xC8C890] },
gd_glow_algae: { n: "Umbra glow-algae", home: "umbralight", cat: "reagent", base: 16, t: 3, note: "Living light from under Umbra's ice: glow draughts, night sight", ic: ["leaf", 0x6AF0E0, 0x1A6A60] },
gd_ark_plating: { n: "Orrem ark plating", home: "ark", cat: "salvage", base: 14, t: 3, note: "Plating from the dead ark: battlesuits, ship armour", ic: ["plate", 0x9AA8B0, 0x3A4A58] },
gd_raw_star_iron: { n: "Raw star-iron chunk", home: "kharnrig", cat: "ore", base: 11, t: 3, note: "Ore left in the lost rig's drill: smelts to star-iron", ic: ["ore", 0x6A7088, 0x3A3A48] },
gd_raider_scrap: { n: "Raider scrap", home: "cinder", cat: "salvage", base: 4, t: 1, note: "What the grey raiders leave behind: patch kits, cheap guns", ic: ["plate", 0x6A6A6A, 0xA84A2A] }
};
var SPG_PLACES = {
mercury: { sys: "sol", good: "Mining in the sun's glare: hard iron and glass", goods: ["gd_sunforged_iron", "gd_impact_glass"], wants: ["food", "ice", "cloth"] },
venus: { sys: "sol", good: "Cloud farms and deep-air mines", goods: ["gd_cloud_sulphur", "gd_pressure_diamond"], wants: ["ice", "food", "tech"] },
earth: { sys: "sol", good: "Home: food, seed and cloth for every station", goods: ["gd_earth_grain", "gd_seed_bank", "gd_cotton_bolt"], wants: ["crystal", "art", "relic", "fuel"] },
moon: { sys: "sol", good: "Fusion fuel and moonstone", goods: ["gd_helium3", "gd_moonstone_block"], wants: ["food", "ice", "cloth"] },
mars: { sys: "sol", good: "Iron and water for the colonies", goods: ["gd_red_oxide", "gd_polar_water"], wants: ["food", "tech", "timber"] },
jupiter: { sys: "sol", good: "The strongest fuel there is, and brine from Europa", goods: ["gd_metallic_hydrogen", "gd_europa_brine"], wants: ["food", "metal", "cloth"] },
saturn: { sys: "sol", good: "Ring ice and Titan's lakes of fuel", goods: ["gd_ring_ice", "gd_titan_methane"], wants: ["food", "metal", "tech"] },
uranus: { sys: "sol", good: "Diamonds out of the sky", goods: ["gd_diamond_rain"], wants: ["food", "fuel", "tech"] },
neptune: { sys: "sol", good: "Deep cold: frost for every gun and drive", goods: ["gd_triton_frost"], wants: ["food", "fuel", "cloth"] },
pluto: { sys: "sol", good: "The far edge: rare dust and heart-ice", goods: ["gd_tholin_dust", "gd_heart_ice"], wants: ["food", "fuel", "tech"] },
veyar: { sys: "reach", good: "The Veyari's starsilk, lenses and tea", goods: ["gd_veyari_starsilk", "gd_veyari_lens", "gd_glowmoss_tea"], wants: ["metal", "ore", "food"] },
maruondo: { sys: "reach", good: "Pearls, kelp-cloth and salt of the endless sea", goods: ["gd_reef_pearl", "gd_kelp_cloth", "gd_tide_salt"], wants: ["metal", "timber", "tech"] },
tullimar: { sys: "reach", good: "The market moon: the Tullik buy and sell everything", goods: ["gd_spice_cake", "gd_hum_rock", "gd_tullik_lamp_oil"], wants: ["art", "relic", "crystal", "spice", "food", "cloth", "metal"] },
orr: { sys: "reach", good: "Machine parts from the silent world", goods: ["gd_circuit_core", "gd_silent_alloy", "gd_servo_gears"], wants: ["fuel", "crystal", "salvage"] },
skeldmar: { sys: "reach", good: "Stone, war-iron and mead of the fortresses", goods: ["gd_fortress_stone", "gd_war_iron", "gd_skeld_mead"], wants: ["food", "cloth", "spice", "timber"] },
sereth: { sys: "corvanne", good: "Wood, amber and silk of trees a mile high", goods: ["gd_mile_heartwood", "gd_sap_amber", "gd_canopy_silk"], wants: ["metal", "tech", "salvage"] },
dunmarrow: { sys: "corvanne", good: "Salt, copper and water-glass of the desert", goods: ["gd_water_glass", "gd_dun_salt", "gd_mesa_copper"], wants: ["ice", "food", "cloth"] },
ysolde: { sys: "hallowmere", good: "Fish oil, sea-silk and tide pearls", goods: ["gd_fish_oil", "gd_sea_silk", "gd_tide_pearl"], wants: ["timber", "metal", "tech"] },
kharn: { sys: "hallowmere", good: "The forges of the Anvil: star-iron and coke", goods: ["gd_star_iron", "gd_anvil_stone", "gd_kharn_coke"], wants: ["food", "ice", "cloth", "spice"] },
aster: { sys: "lantern", good: "The Order's crystal and incense", goods: ["gd_quiet_crystal", "gd_warden_incense"], wants: ["food", "cloth", "art"] },
aurelion: { sys: "aurelion", good: "Gold, wine and vellum of the Concord's city", goods: ["gd_aurel_gold", "gd_concord_wine", "gd_archive_vellum"], wants: ["relic", "crystal", "spice", "food", "art"] },
isk: { sys: "shatterline", good: "Ice that never melts", goods: ["gd_isk_frost"], wants: ["food", "fuel", "cloth"] },
nharos: { sys: "shatterline", good: "The Hollow's ash-iron, shadow-glass and embers", goods: ["gd_ash_iron", "gd_shadow_glass", "gd_deadsun_ember"], wants: ["food", "tech", "salvage"] },
driftward: { sys: "wanderers", good: "Salvage, rations and wire of the thousand ships", goods: ["gd_hull_plate", "gd_drifter_rations", "gd_patch_wire"], wants: ["food", "fuel", "metal", "ice", "timber"] },
halcyra: { sys: "halcyra", good: "Saffa Morrow's gold, sea-amber and rum", goods: ["gd_corsair_doubloon", "gd_halcyra_amber", "gd_keepers_rum"], wants: ["food", "cloth", "tech", "metal"] }
};
var SPG_SITES = {
veil: { sys: "reach", good: "gd_nebula_vapour", n: 3 }, comet: { sys: "reach", good: "gd_comet_ice", n: 3 }, kethrin: { sys: "reach", good: "gd_dwarf_soot", n: 4 },
ark: { sys: "reach", good: "gd_ark_plating", n: 2 }, cinder: { sys: "reach", good: "gd_raider_scrap", n: 4 }, glasswing: { sys: "corvanne", good: "gd_glasswing_scale", n: 2 },
starwhale: { sys: "hallowmere", good: "gd_whale_amber", n: 1 }, kharnrig: { sys: "hallowmere", good: "gd_raw_star_iron", n: 3 }, lanternheart: { sys: "lantern", good: "gd_lantern_dust", n: 2 },
umbralight: { sys: "wanderers", good: "gd_glow_algae", n: 2 }
};
var SPG_BOOK = [["Star goods: what the worlds make", [
["sg_starmetal_kharn", "Starmetal ingot (Kharn way)", { gd_star_iron: 2, gd_deadsun_ember: 1 }, "star", 25, "Makes 1: starmetal from star-iron, no star crystal", "mat", 1, { makes: "lt_starmetal_ingot" }],
["sg_darksteel_hollow", "Darksteel ingot (Hollow way)", { gd_ash_iron: 2, gd_kharn_coke: 1 }, "forge", 16, "Makes 1: darksteel from ash-iron", "mat", 1, { makes: "lt_darksteel_ingot" }],
["sg_steel_sunbaked", "Steel ingot (sun-baked)", { gd_sunforged_iron: 2 }, "forge", 9, "Makes 1: steel without coal", "mat", 1, { makes: "cr_steel" }],
["sg_ore_oxide", "Iron ore from red oxide", { gd_red_oxide: 3 }, "forge", 1, "Makes 1 rich iron ore", "mat", 1, { makes: "cr_ore" }],
["sg_bronze_mesa", "Bronze ingot (mesa copper)", { gd_mesa_copper: 2, gd_patch_wire: 1 }, "forge", 1, "Makes 1 bronze ingot", "mat", 1, { makes: "lt_bronze_ingot" }],
["sg_heartwood_mile", "Heartwood log (mile-tree)", { gd_mile_heartwood: 1 }, "bowyer", 14, "Makes 1 heartwood log", "mat", 1, { makes: "lt_heartwood_log" }],
["sg_starwood_lantern", "Starwood branch", { gd_mile_heartwood: 1, gd_lantern_dust: 1 }, "bowyer", 24, "Makes 1: mile-tree wood steeped in the Lantern's light", "mat", 1, { makes: "lt_starwood_branch" }],
["sg_moonsilk_star", "Moonsilk (star-spun)", { gd_veyari_starsilk: 1, gd_canopy_silk: 1 }, "loom", 22, "Makes 1 moonsilk", "mat", 1, { makes: "lt_moonsilk" }],
["sg_firesilk_sea", "Firesilk (sea-silk)", { gd_sea_silk: 1, gd_cloud_sulphur: 1 }, "loom", 16, "Makes 1 firesilk", "mat", 1, { makes: "lt_firesilk" }],
["sg_void_nebula", "Void dust (nebula)", { gd_nebula_vapour: 2 }, "alch", 22, "Makes 1 void dust", "mat", 1, { makes: "lt_void_dust" }],
["sg_stardust_lantern", "Stardust (light-dust)", { gd_lantern_dust: 1 }, "alch", 10, "Makes 1 stardust", "mat", 1, { makes: "dr_stardust" }],
["sg_crystal_order", "Star crystal (from the Order's crystal)", { gd_quiet_crystal: 1, gd_impact_glass: 1 }, "jewel", 24, "Makes 1 clear star crystal", "mat", 1, { makes: "cr_crystal" }],
["sg_goldleaf_aurel", "Gold leaf (Aurel)", { gd_aurel_gold: 1 }, "jewel", 6, "Makes 1 gold leaf", "mat", 1, { makes: "lt_gold_leaf" }],
["sg_fuelcell_he3", "Fuel cell (helium-3)", { gd_helium3: 1, gd_patch_wire: 1 }, "garage", 10, "Makes 1 fuel cell", "mat", 1, { makes: "lt_fuel_cell" }],
["sg_healing_glowmoss", "Healing draught (glow-moss)", { lm_laboratory_vial: 1, gd_glowmoss_tea: 2 }, "alch", 1, "A healing draught from the Veyari's tea", "draught", 1, { makes: "lm_healing_draught" }],
["sg_stamina_drifter", "Stamina tonic (Drifter way)", { lm_laboratory_vial: 1, gd_drifter_rations: 1, gd_skeld_mead: 1 }, "alch", 1, "A stamina tonic the fleet swears by", "draught", 1, { makes: "lm_stamina_tonic" }],
["sg_glow_umbra", "Glow draught (Umbra)", { lm_laboratory_vial: 1, gd_glow_algae: 1 }, "alch", 8, "A glow draught from living light", "draught", 1, { makes: "lm_glow_draught" }],
["lm_kharn_anvil_maul", "Kharn anvil maul", { gd_star_iron: 3, gd_anvil_stone: 2, gd_kharn_coke: 1 }, "star", 26, "A war hammer forged under Kharn's pull: starmetal-hard, very heavy", "weapon", 1, { base: "warhammer", t: 4, x: 1.62 }],
["lm_orrem_pulse_rifle", "Orrem pulse rifle", { gd_circuit_core: 2, gd_silent_alloy: 2, lt_fuel_cell: 1 }, "gun", 24, "A pulse rifle with a thinking core: it leads its shots", "weapon", 1, { base: "pulserifle", t: 4, x: 1.55 }],
["lm_shadowglass_katana", "Shadow-glass katana", { gd_shadow_glass: 2, gd_ash_iron: 2 }, "star", 28, "A black blade that drinks the light", "weapon", 1, { base: "katana", t: 4, x: 1.62 }],
["lm_hrovan_war_axe", "Hrovan war axe", { gd_war_iron: 3, gd_fortress_stone: 1 }, "forge", 20, "A fortress axe of folded war-iron", "weapon", 1, { base: "battleaxe", t: 3, x: 1.4 }],
["lm_mile_tree_longbow", "Mile-tree longbow", { gd_mile_heartwood: 2, gd_canopy_silk: 1 }, "bowyer", 18, "A longbow of heartwood strung with canopy silk", "weapon", 1, { base: "longbow", t: 3, x: 1.4 }],
["lm_doubloon_flintlock", "Corsair's doubloon flintlock", { gd_corsair_doubloon: 3, cr_steel: 1, gd_halcyra_amber: 1 }, "gun", 22, "Saffa Morrow's pattern: a gold-chased pistol", "weapon", 1, { base: "flintlock", t: 4, x: 1.5 }],
["lm_water_glass_scimitar", "Water-glass scimitar", { gd_water_glass: 2, gd_mesa_copper: 2 }, "forge", 12, "A desert blade that never dulls", "weapon", 1, { base: "scimitar", t: 2, x: 1.2 }],
["lm_comet_ice_froststaff", "Comet-ice froststaff", { gd_comet_ice: 3, lt_starwood_branch: 1 }, "bowyer", 24, "A frost staff cored with ancient ice", "weapon", 1, { base: "froststaff", t: 4, x: 1.55 }],
["lm_veyari_lens_sniper", "Veyari-lens sniper rifle", { gd_veyari_lens: 1, gd_silent_alloy: 2, cr_steel: 1 }, "gun", 20, "Sights ground by the Veyari: steady at any range", "weapon", 1, { base: "sniper", t: 3, x: 1.42 }],
["lm_glasswing_shield", "Glasswing round shield", { gd_glasswing_scale: 3, gd_silent_alloy: 1 }, "forge", 20, "A clear shield, light as air", "weapon", 1, { base: "roundshield", t: 3, x: 1.4 }]
]]];
var SPG_LY = { sol: -12, reach: 0, corvanne: 38, aurelion: 54, hallowmere: 71, lantern: 120, shatterline: 160, wanderers: 210, halcyra: 260 };
function spgPlaceOf(k) { return SPG_PLACES[k] ? SPG_PLACES[k] : SPG_SITES[k] ? { sys: SPG_SITES[k].sys } : null; }
function spgDrift(day, where, kind) { var s = day + "|" + where + "|" + kind, h = 0; for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) | 0; return 0.88 + ((Math.abs(h) % 1000) / 1000) * 0.24; }
function spgDay() { return new Date().toISOString().slice(0, 10); }
function spgBuyPrice(where, kind) { var G = SPG_GOODS[kind]; return Math.max(1, Math.round(G.base * spgDrift(spgDay(), where, kind))); }
function spgSellPrice(where, kind) { return __ZC(462, 245, this, arguments, new.target); }
function spgPic(kind) { return "assets/icons/loot/" + kind + ".webp"; }
function spgName(k) { var B = (typeof SP_BODIES !== "undefined" && SP_BODIES.filter(function (b) { return b.k === k; })[0]); if (B)
return B.name; var n = k; try {
Object.keys(GX_SYS).forEach(function (s) { (GX_SYS[s].bodies || []).forEach(function (b) { if (b.k === k)
n = b.name; }); });
}
catch (e) { } try {
(typeof FR_REACH_BODIES !== "undefined" ? FR_REACH_BODIES : []).forEach(function (b) { if (b.k === k)
n = b.name; });
}
catch (e) { } return n; }
var SKC = { el: null, cv: null, x: 0, y: 0, z: 1, view: "galaxy", sys: null, sel: null, hover: null, drag: null, pinch: 0, t: 0, raf: 0, bg: null, bgW: 0, bgH: 0, sph: {}, queue: [], pos: null };
var SKC_AT = { sol: [84, 350], reach: [176, 312], corvanne: [306, 196], aurelion: [352, 410], hallowmere: [430, 118], lantern: [566, 452],
shatterline: [664, 238], wanderers: [800, 108], halcyra: [912, 398] };
function skcAt(k) { if (SKC_AT[k])
return SKC_AT[k]; var S = GX_SYS[k] || {}, ly = S.ly || 0, a = (k.length * 1.7) % 2.4 - 1.2; return [176 + ly * 2.8, 300 + Math.sin(a) * 170]; }
function skcSysList() { return ["sol"].concat(GX_ORDER.filter(function (k) { return !!GX_SYS[k]; })); }
function skcKnown(k) { if (k === "sol")
return true; try {
return !!gxKnown()[k];
}
catch (e) {
return false;
} }
function skcHere() { try {
return (typeof frIn === "function" && frIn()) ? FR.sys : "sol";
}
catch (e) {
return "sol";
} }
function skcSysName(k) { return k === "sol" ? "The Sun" : (GX_SYS[k] || {}).name || k; }
function skcStarCol(k) { var c = k === "sol" ? 0xFFE0A0 : ((GX_SYS[k] || {}).light || 0xFFFFFF); return [(c >> 16) & 255, (c >> 8) & 255, c & 255]; }
function skcRgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
function skcBodies(k) {
if (k === "sol")
return (typeof SP_BODIES !== "undefined" ? SP_BODIES : []).filter(function (b) { return !b.hidden; });
return ((GX_SYS[k] || {}).bodies) || [];
}
function skcSites(k) {
if (k === "sol")
return [];
var D = ((GX_SYS[k] || {}).disc) || [];
return D.filter(function (d) { return d.at && (typeof SPG_SITES === "undefined" || SPG_SITES[d.k] || true); });
}
function skcIsStar(b) { return !!(b.star || b.k === "sun"); }
function skcOpen(view, sys) { return __ZC(462, 246, this, arguments, new.target); }
function skcBtnCss() { return "background:rgba(14,30,56,.9);color:#DCEEFF;border:1px solid rgba(120,200,255,.55);border-radius:9px;padding:5px 10px;cursor:pointer;font:600 13px system-ui,sans-serif"; }
function skcClose() { if (!SKC.el)
return; cancelAnimationFrame(SKC.raf); SKC.el.remove(); SKC.el = null; document.body.classList.remove("skc-open"); window.removeEventListener("keydown", SKC.keyEsc, true); }
function skcView(v, sys) { return __ZC(462, 247, this, arguments, new.target); }
function skcFit() { return __ZC(462, 248, this, arguments, new.target); }
function skcZoom(f, cx, cy) {
var cv = SKC.cv;
cx = cx == null ? cv.clientWidth / 2 : cx;
cy = cy == null ? cv.clientHeight / 2 : cy;
var nz = Math.max(0.35, Math.min(6, SKC.z * f));
f = nz / SKC.z;
SKC.x = cx - (cx - SKC.x) * f;
SKC.y = cy - (cy - SKC.y) * f;
SKC.z = nz;
}
function skcRand(s) { return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function skcBackdrop() { return __ZC(462, 249, this, arguments, new.target); }
function skcTexFor(b, sys) {
try {
if (sys === "sol") {
SP.tex = SP.tex || {};
var t = spPaint(b.k);
return t && t.image;
}
SP.tex = SP.tex || {};
var t2 = frPaint(b.paint || b.k);
return t2 && t2.image;
}
catch (e) {
return null;
}
}
function skcSphere(b, sys, px) {
var key = sys + ":" + b.k + ":" + px;
if (SKC.sph[key])
return SKC.sph[key];
if (SKC.queue.indexOf(key) < 0)
SKC.queue.push(key);
SKC.sph[key + ":b"] = { b: b, sys: sys, px: px };
return null;
}
function skcWork() { return __ZC(462, 250, this, arguments, new.target); }
function skcSysLayout(k) { return __ZC(462, 251, this, arguments, new.target); }
function skcDraw() { return __ZC(462, 252, this, arguments, new.target); }
function skcFrame(x, W, H) { return __ZC(462, 253, this, arguments, new.target); }
function skcGlow(x, px, py, r, col, a) { var g = x.createRadialGradient(px, py, 0, px, py, r); g.addColorStop(0, skcRgba(col, a)); g.addColorStop(0.25, skcRgba(col, a * 0.45)); g.addColorStop(1, skcRgba(col, 0)); x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); }
function skcStarGlyph(x, px, py, r, col, t, bright) { return __ZC(462, 254, this, arguments, new.target); }
function skcLabel(x, txt, px, py, size, col, align, sub) { return __ZC(462, 255, this, arguments, new.target); }
function skcDrawGalaxy(x) { return __ZC(462, 256, this, arguments, new.target); }
function skcDrawSystem(x) { return __ZC(462, 257, this, arguments, new.target); }
function skcMePos(P) { return __ZC(462, 258, this, arguments, new.target); }
function skcToChart(px, py) { return [(px - SKC.x) / SKC.z, (py - SKC.y) / SKC.z]; }
function skcPick(px, py) { return __ZC(462, 259, this, arguments, new.target); }
function skcHoverAt(px, py) { return __ZC(462, 260, this, arguments, new.target); }
function skcFindBody(sys, k) { var r = null; skcBodies(sys).forEach(function (b) { if (b.k === k)
r = b; }); return r; }
function skcFindSite(sys, k) { var r = null; skcSites(sys).forEach(function (d) { if (d.k === k)
r = d; }); return r; }
function skcClick(px, py) {
var h = skcPick(px, py);
if (!h) {
if (SKC.sel) {
SKC.sel = null;
skcSide();
}
return;
}
if (h.t === "star" && SKC.sel && SKC.sel.k === h.k && skcKnown(h.k)) {
skcView("system", h.k);
return;
}
SKC.sel = h;
skcSide();
try {
sbTone(880, 0.05);
}
catch (e) { }
}
function skcGoodRow(kind, price, lbl) { return __ZC(462, 261, this, arguments, new.target); }
function skcSide() { return __ZC(462, 262, this, arguments, new.target); }
function skcBestSells(where) {
var out = [];
Object.keys(SPG_GOODS).forEach(function (g) { if (SPG_GOODS[g].home === where)
return; var p = spgSellPrice(where, g); if (p > SPG_GOODS[g].base * 1.25)
out.push([g, p]); });
out.sort(function (a, b) { return b[1] - a[1]; });
return out.slice(0, 3);
}
function skcGo(sys, target) {
var here = skcHere();
if (sys !== here) {
if (typeof gxJump !== "function") {
sbSay("The Star Drive is not fitted.");
return;
}
if (target)
SKC.after = { sys: sys, t: target };
skcClose();
gxJump(sys);
return;
}
skcClose();
skcAuto(target);
}
function skcAuto(T) { return __ZC(462, 263, this, arguments, new.target); }
(function () {
if (typeof spTargetPos !== "function")
return;
var tp = spTargetPos;
spTargetPos = function (A) {
var t = null;
try {
if (A && A.fr && typeof FR_BY !== "undefined" && FR_BY[A.fr] && frIn()) {
var c = frWorld(A.fr), r = A.frR || FR_BY[A.fr].r * 2.6 + 40;
t = c.addScaledVector(A.frFrom, r).add(new THREE.Vector3(0, r * 0.15, 0));
}
}
catch (e) { }
if (!t)
t = tp.apply(this, arguments);
try {
var w = skcAround(t);
if (w)
return w;
}
catch (e) { }
return t;
};
})();
function skcSolids() { return __ZC(462, 264, this, arguments, new.target); }
function skcAround(t) { return __ZC(462, 265, this, arguments, new.target); }
(function () {
if (typeof gxArrived !== "function")
return;
var ga = gxArrived;
gxArrived = function (to) { var r = ga.apply(this, arguments); try {
var A = SKC.after;
if (A && A.sys === to) {
SKC.after = null;
setTimeout(function () { skcAuto(A.t); }, 1200);
}
}
catch (e) { } return r; };
})();
(function () {
var W = WORLDS.space;
if (W) {
var k = W.key_;
W.key_ = function (e) { if (e.code === "KeyM" && !SKC.el && !(typeof TC !== "undefined" && TC.el) && !(typeof GX !== "undefined" && GX.jumping)) {
skcOpen();
return true;
} return k ? k.call(this, e) : false; };
}
if (typeof sbHudTick === "function") {
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
var h = SB.hud;
if (!h)
return r;
if (!h.dataset.sc) {
h.dataset.sc = "1";
h.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && b.getAttribute("data-sb") === "sc") {
e.stopPropagation();
skcOpen();
} });
}
var row = h.querySelector(".b");
if (!row)
return r;
if (!row.querySelector("[data-sb=sc]")) {
var b1 = document.createElement("button");
b1.setAttribute("data-sb", "sc");
b1.textContent = "🧭 Star chart";
b1.title = "Your star chart: every star and world, and what each is good for (M)";
row.insertBefore(b1, row.firstChild);
}
}
catch (e) { }
return r;
};
}
if (typeof gxMap === "function") {
var gm = gxMap;
gxMap = function () {
var wc = worldCard;
worldCard = function (h, fns) { worldCard = wc; try {
if (typeof h === "string") {
fns = fns || {};
h = h.replace("</div>", "</div>" + worldBtn("skc-open", "🧭 Open the star chart", "Every star and world you know, what each is good for, and set course"));
fns["skc-open"] = function () { worldCard(null); skcOpen(); };
}
}
catch (e) { } return wc.call(this, h, fns); };
try {
return gm.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
}
})();
var MK = { near: null, chk: 0, busy: false };
function mkNearPlace() { return __ZC(462, 266, this, arguments, new.target); }
function mkSay(r) { var m = (r && (r.say || r.message)) || "The trading post did not answer."; sbSay(sbEsc(m)); }
function mkCall(fn, body) { if (typeof signedIn === "function" && !signedIn())
return Promise.reject(new Error("Sign in first: what you trade is kept against your account.")); return cityRpc(fn, body); }
function mkCard(where) { return __ZC(462, 267, this, arguments, new.target); }
function mkTrade(fn, where, kind, n) { return __ZC(462, 268, this, arguments, new.target); }
(function () {
if (typeof sbHudTick !== "function")
return;
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
MK.chk -= dt || 0.016;
if (MK.chk <= 0) {
MK.chk = 0.8;
MK.near = mkNearPlace();
}
var h = SB.hud;
if (!h)
return r;
if (!h.dataset.mk) {
h.dataset.mk = "1";
h.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && b.getAttribute("data-sb") === "mk") {
e.stopPropagation();
mkCard();
} });
}
var row = h.querySelector(".b");
if (!row)
return r;
var b1 = row.querySelector("[data-sb=mk]");
if (MK.near && !b1) {
b1 = document.createElement("button");
b1.setAttribute("data-sb", "mk");
row.appendChild(b1);
}
if (MK.near && b1) {
var t = "⚖ Trade · " + spgName(MK.near);
if (b1.textContent !== t) {
b1.textContent = t;
b1.title = "The trading post of " + spgName(MK.near) + ": " + SPG_PLACES[MK.near].good;
}
}
else if (!MK.near && b1)
b1.remove();
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof frScan !== "function")
return;
var fs = frScan;
frScan = function (d) {
var r = fs.apply(this, arguments);
try {
if (d && typeof SPG_SITES !== "undefined" && SPG_SITES[d.k]) {
var G = SPG_GOODS[SPG_SITES[d.k].good];
mkCall("sp_harvest", { p_site: d.k }).then(function (x) {
if (!x || !x.ok) {
mkSay(x);
return;
}
sbSay("📡 <b>Gathered " + x.n + " × " + sbEsc(G.n) + "</b> into the hold (you carry " + (x.have || x.n) + "). Any trading post will buy it; the Maker's Book shows what it makes.");
try {
sbTone(990, 0.15);
}
catch (e) { }
}).catch(function (e) { sbSay(sbEsc(e && e.message || "")); });
}
}
catch (e) { }
return r;
};
})();
var SV = { wrecks: [], drift: [], tip: null, tipG: null, busy: false, chk: 0, heatT: 0, rescued: 0, driftCalm: 0 };
var SV_TIPS = {
neptune: { body: "neptune", name: "Neptune", off: [0.55, 0.18, -0.82], ship: "an old Corp ore freighter, the Patience" },
uranus: { body: "uranus", name: "Uranus", off: [-0.7, 0.25, 0.62], ship: "a Tullik barge the raiders gutted, the Plenty" },
pluto: { body: "pluto", name: "Pluto", off: [0.3, -0.2, 0.93], ship: "a survey cutter that never came home, the Long Look" },
charon: { body: "charon", name: "Charon", off: [-0.5, 0.4, -0.77], ship: "a raider gunship that ran out of fuel" }
};
var SV_ICE = ["neptune", "uranus", "pluto", "charon"];
function svDay() { return new Date().toISOString().slice(0, 10); }
function svSaid(h) { sbSay(h); }
(function () {
var eb = sbEndBattle;
sbEndBattle = function (how) {
var B = SB.battle, foes = SB.foes.slice();
var r = eb.apply(this, arguments);
try {
if (B && B.why !== "duel")
SV.driftCalm = 75;
if (B && how === "won" && B.why !== "duel") {
var n = 0;
foes.forEach(function (F) {
if (!F.down || F.side !== "foe" || n >= 6)
return;
n++;
var i = SB.foes.indexOf(F);
if (i >= 0)
SB.foes.splice(i, 1);
F.v.multiplyScalar(0.15);
svLight(F.g, F.T.len || 15);
SV.wrecks.push({ F: F, t: 0, ship: F.type || (F.T.worth >= 6 ? "marauder" : F.T.worth >= 3 ? "gunship" : "dart"), done: false });
});
if (n)
setTimeout(function () { if (sbHere())
svSaid("🔧 <b>" + (n > 1 ? n + " raider wrecks" : "A raider wreck") + " drift where the fight was.</b> Fly up to one and press E " + (sbTouch() ? "(or 🔧 Search)" : "") + " to cut into the hold: scrap, ship pieces, stolen cargo, or nothing at all. The Corp's tugs tow them off in nine minutes."); }, 4200);
}
}
catch (e) { }
return r;
};
})();
function svLight(g, len) {
if (!g || g.userData.svLit)
return;
g.userData.svLit = 1;
var gl = wGlow(0xFFB45A, Math.max(10, len * 0.9), 0.5);
gl.position.set(0, len * 0.12, 0);
g.add(gl);
g.userData.svGlow = gl;
}
function svDropWreck(w) { if (w.F && w.F.g && w.F.g.parent)
w.F.g.parent.remove(w.F.g); }
function svWrecksTick(dt) { return __ZC(462, 269, this, arguments, new.target); }
function svNearWreck() { return __ZC(462, 270, this, arguments, new.target); }
function svSearch(N) { return __ZC(462, 271, this, arguments, new.target); }
(function () {
if (typeof frDrift !== "function")
return;
var fd = frDrift;
frDrift = function (h, r) {
var n0 = h.children.length, res = fd.apply(this, arguments);
try {
SV.drift = [];
var kids = h.children.slice(n0 + 1), done = svHulkGet();
kids.forEach(function (o, i) {
if (o === h.userData.maw || i > 15)
return;
var key = "h" + i, s = o.scale.x || 1;
SV.drift.push({ o: o, h: h, key: key, r: Math.max(14, s * 14), done: done[key] });
});
SV.drift.forEach(function (H) { if (H.done !== svDay())
svLight(H.o, 10); });
}
catch (e) { }
return res;
};
})();
function svHulkPos(H, out) { return out.copy(H.o.position).add(frWorld("cinder")); }
function svHulkGet() { try {
var o = JSON.parse(localStorage.getItem("sv.hulks") || "{}") || {};
return o;
}
catch (e) {
return {};
} }
function svHulkSave() { var o = {}; SV.drift.forEach(function (H) { if (H.done)
o[H.key] = H.done; if (H.done === svDay() && H.o.userData.svGlow)
H.o.userData.svGlow.material.opacity = 0.12; }); try {
localStorage.setItem("sv.hulks", JSON.stringify(o));
}
catch (e) { } }
(function () {
if (typeof frTick !== "function")
return;
var ft = frTick;
frTick = function (dt) {
var keep = SB.strikeAt, r = ft.apply(this, arguments);
try {
if (SV.driftCalm > 0)
SV.driftCalm -= dt;
if (SB.strikeAt < keep && !SB.battle && frIn() && FR_BY.cinder) {
var leaving = SP.auto && spTargetPos(SP.auto).distanceTo(frWorld("cinder")) > FR_BY.cinder.r * 12;
if (SV.driftCalm > 0 || leaving)
SB.strikeAt = Math.max(SB.strikeAt, leaving ? keep : Math.max(SV.driftCalm, 20));
}
}
catch (e) { }
return r;
};
})();
function svStarTick(dt) { return __ZC(462, 272, this, arguments, new.target); }
function svTipLoad() { try {
var o = JSON.parse(localStorage.getItem("sv.tip") || "null");
if (o && SV_TIPS[o.k])
SV.tip = o;
}
catch (e) { } }
function svTipSave() { try {
localStorage.setItem("sv.tip", JSON.stringify(SV.tip));
}
catch (e) { } }
function svTipDone() { return SV.tip && SV.tip.done === svDay(); }
function svTipPos() { return __ZC(462, 273, this, arguments, new.target); }
function svTipMark() { return __ZC(462, 274, this, arguments, new.target); }
function svTipBuild() { return __ZC(462, 275, this, arguments, new.target); }
(function () {
if (typeof spHail !== "function")
return;
var sh = spHail;
spHail = function (who) {
if (who !== "veyari")
return sh.apply(this, arguments);
var k = svTipMark(), T = SV_TIPS[k];
var A = null;
SP_ALIENS.forEach(function (a) { if (a.who === "veyari")
A = a; });
var keep = A ? A.persona : null;
if (A)
A.persona = keep + " You have just marked one thing on this traveller's star chart, and only one: a wreck drifting near " + T.name + ", one of the cold ice worlds of their Sun: " + T.ship + ". It glows with a violet beacon your people left on it, and its hold is not empty. Tell them so when it fits. You cannot mark anything else, give them things or put things in their backpack; never say you have.";
try {
return sh.apply(this, arguments);
}
finally {
if (A)
A.persona = keep;
setTimeout(function () { svSaid("✦ <b>Marked on your chart:</b> a wreck near " + sbEsc(T.name) + ", " + sbEsc(T.ship) + ". Its violet beacon shows from far off; open the chart (M) and choose it, or fly there and press E to search it."); }, 1800);
}
};
})();
(function () {
if (typeof spChart !== "function")
return;
var sc = spChart;
spChart = function () {
if ((typeof frIn === "function" && frIn()) || !SV.tip || svTipDone())
return sc.apply(this, arguments);
var cap = null, wc = worldCard;
worldCard = function (h, f) { cap = [h, f]; };
try {
sc.apply(this, arguments);
}
finally {
worldCard = wc;
}
if (!cap)
return;
var T = SV_TIPS[SV.tip.k], h = cap[0], fns = cap[1] || {};
h += worldBtn("sv-tip", "✦ The wreck the Veyari marked", "Near " + sbEsc(T.name) + ": " + sbEsc(T.ship) + ". Search its hold");
fns["sv-tip"] = function () { var A = { name: "the wreck near " + T.name, after: "Press E to search it." }; Object.defineProperty(A, "pos", { get: function () { var p = svTipPos() || SP.pos.clone(); var f = SP.pos.clone().sub(p); f.y = 0; if (f.lengthSq() < 1)
f.set(1, 0, 0); return p.addScaledVector(f.normalize(), 80).add(new THREE.Vector3(0, 12, 0)); } }); spFlyTo(A); };
worldCard(h, fns);
};
})();
(function () {
if (typeof spBannerTick !== "function")
return;
var bt = spBannerTick;
spBannerTick = function () {
var r = bt.apply(this, arguments);
try {
var p = svTipPos();
if (p && !svTipDone() && WLD.hud && WLD.hud.style.display !== "none") {
var line = "✦ The wreck the Veyari marked, near " + SV_TIPS[SV.tip.k].name + ": " + Math.round(p.distanceTo(SP.pos)) + " m";
if (WLD.hud.innerHTML.indexOf("✦ The wreck the Veyari") < 0)
WLD.hud.insertAdjacentHTML("beforeend", "<div style='color:#D8C0FF'>" + line + "</div>");
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof spPromptTick !== "function")
return;
var pt = spPromptTick;
spPromptTick = function () {
try {
if (!SB.battle && !SV.busy) {
var N = svNearWreck();
SV.near = N;
if (N) {
var nm = N.w ? "A raider wreck (" + (SB_FOE[N.w.ship] ? SB_FOE[N.w.ship].name.toLowerCase() : "raider ship") + ")" : N.h ? "An old hulk of the Ashen Drift" + (N.h.done === svDay() ? " (searched today)" : "") : "The wreck the Veyari marked";
if (!(N.h && N.h.done === svDay()))
return worldPrompt("🔧 <b>" + nm + "</b> · <b>press E</b> to search the wreckage", function () { svSearch(N); });
}
}
else
SV.near = null;
}
catch (e) { }
return pt.apply(this, arguments);
};
})();
(function () {
if (typeof sbHudTick !== "function")
return;
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
var h = SB.hud;
if (!h)
return r;
if (!h.dataset.sv) {
h.dataset.sv = "1";
h.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && b.getAttribute("data-sb") === "sv") {
e.stopPropagation();
svSearch(SV.near);
} });
}
var row = h.querySelector(".b");
if (!row)
return r;
var b1 = row.querySelector("[data-sb=sv]"), want = SV.near && !(SV.near.h && SV.near.h.done === svDay()) && !SB.battle;
if (want && !b1) {
b1 = document.createElement("button");
b1.setAttribute("data-sb", "sv");
b1.textContent = "🔧 Search";
b1.title = "Cut into the wreck's hold";
row.appendChild(b1);
}
else if (!want && b1)
b1.remove();
}
catch (e) { }
return r;
};
})();
(function () {
var ct = sbCombatTick;
sbCombatTick = function (dt) {
var r = ct.apply(this, arguments);
try {
svWrecksTick(dt);
svStarTick(dt);
if (SV.tip && !SV.tipG && sbHere() && !svTipDone() && !(typeof frIn === "function" && frIn()))
svTipBuild();
if (SV.tipG) {
var p = svTipPos();
if (p && !svTipDone()) {
SV.tipG.position.copy(p);
SV.tipG.rotation.y += dt * 0.02;
SV.tipG.visible = true;
}
else
SV.tipG.visible = false;
}
}
catch (e) {
if (!SV.warned) {
SV.warned = 1;
console.warn("salvage", e);
}
}
return r;
};
})();
(function () {
var cl = sbClearAll;
sbClearAll = function () { SV.wrecks.forEach(svDropWreck); SV.wrecks = []; if (SV.tipG && SV.tipG.parent)
SV.tipG.parent.remove(SV.tipG); SV.tipG = null; return cl.apply(this, arguments); };
})();
svTipLoad();
var ORW = { eye: null, lines: [], folk: [], sites: [] };
var ORW_HEARTS = {
works: { n: "the Silent Works", at: [-160, -170], what: "the foundry's great breaker", woke: "The breaker thunks home. Somewhere deep in the Works a furnace catches, and the whole building hums. Conveyor belts begin to crawl." },
relay: { n: "the Relay Tower", at: [170, -130], what: "the relay's dish", woke: "The dish swings up to the stars and locks. A tone rises, very low, then a voice: the Archive, louder than you have heard it, calling out into the dark." },
core: { n: "the Deep Core", at: [-24, -156], what: "the core under the Archive", woke: "Below the dome, rings of light spin up one inside another. The Archive's eye opens wide. \"I can think,\" it says, \"all of me, at once.\"" }
};
var ORW_ASKS = ["ark", "veil", "lantern", "comet", "kethrin", "wreck"];
function orwGet() { try {
return JSON.parse(localStorage.getItem("orw") || "{}") || {};
}
catch (e) {
return {};
} }
function orwSet(S) { try {
localStorage.setItem("orw", JSON.stringify(S));
}
catch (e) { } }
function orwCount(S) { S = S || orwGet(); return ["works", "relay", "core"].filter(function (k) { return S[k]; }).length; }
function orwAwake() { return orwCount() >= 3; }
function orwDay() { return new Date().toISOString().slice(0, 10); }
function orwAsk() { var d = Math.floor(Date.now() / 86400000); var k = ORW_ASKS[d % ORW_ASKS.length]; var D = (typeof FR_DISC !== "undefined" ? FR_DISC : []).filter(function (x) { return x.k === k; })[0]; return D || null; }
function orwLook() { return __ZC(462, 276, this, arguments, new.target); }
(function () {
if (typeof frSettle !== "function")
return;
var fs = frSettle;
frSettle = function (G, k) {
var r = fs.apply(this, arguments);
if (k !== "orr")
return r;
try {
ORW.lines = [];
ORW.eye = SF.frEye || null;
var shared = null, mine = null;
G.traverse(function (o) { var m = o.material; if (o.isMesh && m && m.isMeshBasicMaterial && m.color && m.color.getHex() === 0x6AB8FF) {
if (!mine) {
shared = m;
mine = m.clone();
ORW.lines.push(mine);
}
if (m === shared)
o.material = mine;
} });
if (ORW.eye && ORW.eye.material) {
ORW.eye.material = ORW.eye.material.clone();
}
ORW.sites = [];
Object.keys(ORW_HEARTS).forEach(function (k) {
var H = ORW_HEARTS[k], x = H.at[0], z = H.at[1], y = sfHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var plate = mmMat(0x4A505A, { shine: 45, tex: "plate" }), dark = mmMat(0x23262C, { shine: 30, tex: "plate" });
if (k === "works") {
mmSlab(g, dark, 3, 2.4, 1.2, 0, 1.2, 6);
mmSlab(g, plate, 2.4, 0.4, 0.3, 0, 1.9, 5.3);
mmCyl(g, mmMat(0xC83A2A, { shine: 30 }), 0.12, 0.12, 0.9, 0.7, 1.6, 5.3, Math.PI / 2, 0, 0);
}
else if (k === "relay") {
mmCyl(g, dark, 0.6, 0.8, 2.2, 0, 1.1, 6);
mmLathe(g, plate, [[0, 0], [2.4, 0.2], [2.6, 0.6], [0, 0.5]], 0, 3.2, 6, 18).rotation.x = -0.9;
}
else {
mmCyl(g, dark, 1.6, 1.8, 1.0, 0, 0.5, 0);
mmTorus(g, mmMat(0x8AC8FF, { glow: 1 }), 1.3, 0.08, 0, 1.2, 0, Math.PI / 2, 0, 0);
mmTorus(g, mmMat(0x8AC8FF, { glow: 1 }), 0.9, 0.06, 0, 1.5, 0, Math.PI / 2, 0, 0);
}
var gl = wGlow(0x8AC8FF, 6, 0.2);
gl.position.set(0, 2.4, k === "core" ? 0 : 6);
g.add(gl);
ORW.sites.push({ k: k, x: x, z: z + (k === "core" ? 0 : 6), glow: gl });
SF.solids.push({ x: x, z: z + (k === "core" ? 0 : 6), r: k === "core" ? 2 : 1.6 });
});
ORW.folk = (SF.frFolk || []).slice();
orwLook();
setTimeout(function () {
if (SF.k !== "orr")
return;
var n = orwCount();
sbSay(n >= 3 ? "<b>Orr is awake.</b> The towers shine, the machines walk their roads, and Unit Seven's workshop is open. " + (orwAsk() ? "The Archive has a question for you today." : "")
: "<b>Orr, the silent machine world.</b> Its three hearts stopped when the Orrem left. <b>Speak with the Archive</b> in its Reading Hall (the great dome: walk in at its lit door) and it will ask you to wake them: " + n + " of 3 awake. Wake Orr, and Orr works for you.");
}, 2600);
}
catch (e) {
console.warn("orr", e);
}
return r;
};
})();
(function () {
if (typeof frLeaderCard !== "function")
return;
var lc = frLeaderCard;
frLeaderCard = function (site) {
if (!site || !site.frLead || site.frLead.p !== "orrem")
return lc.apply(this, arguments);
var self = this, args = arguments;
var S = orwGet(), n = orwCount(S), fns = {}, h = worldFacts("The Archive of Orr", "The last mind still awake · the Orrem count you as: " + frLevel("orrem"), [], []);
if (n < 3) {
h += "<div style='margin:6px 0'>\"Orr has three hearts. They stopped when my people left. Wake them, and Orr will work again: and it will work for you.\"</div>";
Object.keys(ORW_HEARTS).forEach(function (k) { var H = ORW_HEARTS[k]; h += "<div style='font-size:13px;margin:3px 0'>" + (S[k] ? "✓" : "○") + " <b>" + sbEsc(H.n.charAt(0).toUpperCase() + H.n.slice(1)) + "</b>" + (S[k] ? " · awake" : " · " + (k === "core" ? "behind this dome, among the towers" : k === "works" ? "out to the west" : "out to the east") + ", wake " + sbEsc(H.what)) + "</div>"; });
h += "<div style='font-size:12px;opacity:.75;margin-top:4px'>When Orr is awake: the Orrem workshop (machine parts to build pulse rifles and gadgets), your ship mended whenever you land, and the Archive's thanks.</div>";
}
else {
h += "<div style='margin:6px 0'>\"All of me, awake. Thank you. Orr works for you now.\"</div>";
var A = orwAsk(), done = S.ask === orwDay();
if (A) {
var have = frLogged(A.k);
if (done)
h += "<div style='font-size:13px;margin:4px 0'>✓ Today's question answered: " + sbEsc(A.name) + ". Come back tomorrow.</div>";
else {
h += worldBtn("ask", "❓ The Archive's question: " + sbEsc(A.name), have ? "You have its reading in your Star Log: give it" : "Scan it out in the Far Reach and bring the reading here");
fns.ask = function () { orwAnswer(A); };
}
}
h += worldBtn("mend", "🔧 Mend my ship", "The Archive's machines patch hull and shields, free");
fns.mend = function () { orwMend(true); };
}
h += worldBtn("talk", "💬 Talk with the Archive", "It answers in its own words");
fns.talk = function () { worldCard(null); wTalk(site.talk); };
var P = FR_PEOPLES.orrem, T = P.task, tdone = frStandGet()._log && frStandGet()._log["_orrem_task"];
if (!tdone) {
h += worldBtn("task", "★ " + sbEsc(T.name), sbEsc(T.say));
fns.task = function () { frTaskStart("orrem"); };
if (frLogged(T.need)) {
h += worldBtn("give", "✓ Give it the ark's last log", "From your Star Log");
fns.give = function () { worldCard(null); frTaskDone("orrem"); };
}
}
var wc = worldCard, used = false;
worldCard = function (hh, ff) { if (!used && hh) {
used = true;
return wc.call(this, h, fns);
} return wc.apply(this, arguments); };
try {
return lc.apply(self, args);
}
finally {
worldCard = wc;
if (!used)
wc(h, fns);
}
};
})();
function orwWake(k) { return __ZC(462, 277, this, arguments, new.target); }
function orwAnswer(A) { return __ZC(462, 278, this, arguments, new.target); }
function orwMend(say) {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
SB.hull = D.hull;
SB.shield = D.shield;
if (say) {
worldCard(null);
sbSay("🔧 The Archive's machines go over " + sbEsc(D.short || D.name) + ": hull and shields good as new.");
}
}
(function () {
if (typeof sfTick !== "function")
return;
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "orr")
return r;
var L = worldLocal(), S = orwGet(), awake = orwCount(S) >= 3;
if (awake && typeof wWander === "function")
ORW.folk.forEach(function (g) { wWander(g, dt, function (x, z) { return sfHeight(x, z); }, { r: 20, sp: 1.0 }); });
ORW.sites.forEach(function (s) {
if (Math.hypot(L.x - s.x, L.z - s.z) < 4.2) {
var H = ORW_HEARTS[s.k];
if (S[s.k])
worldPrompt("<b>" + sbEsc(H.n.charAt(0).toUpperCase() + H.n.slice(1)) + "</b> · awake and humming", function () { });
else
worldPrompt("<b>" + sbEsc(H.n.charAt(0).toUpperCase() + H.n.slice(1)) + "</b> · <b>press E</b> to wake " + sbEsc(H.what), function () { orwWake(s.k); });
}
});
if (awake && ORW.folk[0]) {
var u = ORW.folk[0].position;
if (Math.hypot(L.x - u.x, L.z - u.z) < 3)
worldPrompt("⚖ <b>Unit Seven</b>, the Orrem workshop · <b>press E</b> to trade", function () { if (typeof mkCard === "function")
mkCard("orr"); });
}
if (WLD.hud) {
var bl = WLD.hud.querySelector(".orwLine"), bt = "Wake Orr: " + orwCount(S) + " of 3 hearts awake · speak with the Archive";
if (awake) {
if (bl)
bl.remove();
}
else if (!bl)
WLD.hud.insertAdjacentHTML("beforeend", "<div class='orwLine' style='color:#8AC8FF'>" + bt + "</div>");
else if (bl.textContent !== bt)
bl.textContent = bt;
}
}
catch (e) {
if (!ORW.warned) {
ORW.warned = 1;
console.warn("orr", e);
}
}
return r;
};
})();
(function () {
if (typeof sfBuild !== "function")
return;
var sb = sfBuild;
sfBuild = function (k) { var r = sb.apply(this, arguments); try {
if (k === "orr" && orwAwake())
orwMend(false);
}
catch (e) { } return r; };
})();
var TM = { shops: [], folk: [], built: false, sign: {} };
var TM_SHOPS = [
{ n: "Bimbo-Tullik", t: "spice-cake baker", form: "dome", wares: "cakes", f: { cat: ["food"] }, pic: "gd_spice_cake", col: [0xE85A3A, 0xF4E2B8],
hi: "Cake! It fizzes! Fresh from the oven, still singing. One for you, one for the road, one for the road after that." },
{ n: "Arra-Tullik", t: "hum-rock seller", form: "awning", wares: "crystals", f: { cat: ["crystal"] }, pic: "gd_hum_rock", col: [0x6A4AB8, 0xE8E0F8],
hi: "Hold one. Warm it in your hand. Hear that? It knows your name now. They all do, in the end." },
{ n: "Nib-Tullik", t: "lantern-keeper", form: "dome", wares: "lanterns", f: { cat: ["fuel", "gas"] }, pic: "gd_tullik_lamp_oil", col: [0x2A7A5A, 0xF0D890],
hi: "Lamp oil, sweet as flowers. A Tullik lantern burns a whole night on a thimble of it." },
{ n: "Fennick-Tullik", t: "map-maker", form: "awning", wares: "maps", ow: ["ow_tk_map"], chart: 1, pic: null, col: [0x2A4A7A, 0xE8D8B0],
hi: "Every star I have seen, drawn from the wrong side. Very useful, if you are on the wrong side." },
{ n: "Tamber-Tullik", t: "swap-stall keeper", form: "cart", wares: "junk", pip: 1, pic: null, col: [0x8A3A6A, 0xF0C8A0],
hi: "Swap? Swap! Everything here has been swapped at least three times. Some of it four." },
{ n: "Pell-Tullik", t: "apprentice trader", form: "cart", wares: "sundries", ow: ["ow_tk_cake", "ow_tk_hum"], pic: null, col: [0x3A8A3A, 0xF4E8C0],
hi: "My aunt says I may sell anything under this canopy. So, anything! Under the canopy." },
{ n: "Quib-Tullik", t: "seller of Veyari glass", form: "dome", wares: "glass", f: { home: ["veyar"] }, pic: "gd_veyari_lens", col: [0x6A58C8, 0xE0E8FF],
hi: "From Ilvessa, the Singing City. The Veyari make it; I only carry it very, very carefully." },
{ n: "Momo-Tullik", t: "pearl and kelp trader", form: "awning", wares: "pearls", f: { home: ["maruondo"] }, pic: "gd_reef_pearl", col: [0x2A8AA8, 0xE8F4F0],
hi: "Pearls from Maru-Ondo's reefs. The Ondai sing them out of the coral, you know. Listen close to this one." },
{ n: "Gurt-Tullik", t: "dealer in Hrovan iron", form: "awning", wares: "iron", f: { home: ["skeldmar"] }, pic: "gd_war_iron", col: [0x8A2A1A, 0xD8C8A8],
hi: "Skeldmar iron. The Hrovan do not haggle, so I do it for them. They pay me in respect. And iron." },
{ n: "Zim-Tullik", t: "Orrem parts trader", form: "dome", wares: "parts", f: { home: ["orr"] }, pic: "gd_circuit_core", col: [0x3A5A6A, 0xB8E8E8],
hi: "Parts from Orr. The machines there do not need them any more. Or so they tell me. Very politely." },
{ n: "Dosa-Tullik", t: "salvage buyer", form: "cart", wares: "scrap", f: { cat: ["salvage", "metal", "tech", "ore"] }, buys: 1, pic: "gd_raider_scrap", col: [0x5A5A5A, 0xE8A040],
hi: "Raider scrap? Wreck pieces? Bring me what you cut out of their holds and I will pay you fair. Fairer than they would." },
{ n: "Wix-Tullik", t: "spice and cloth merchant", form: "awning", wares: "spice", f: { cat: ["spice", "cloth", "art", "hide"] }, pic: "gd_tide_salt", col: [0xC86A1A, 0xF8E8C8],
hi: "Salt of the Ondai sea, Veyari starsilk, Hrovan wool... smell that? That is the whole Reach, in one stall." }
];
var TM_C = [0, -80];
if (typeof FR_TOWN !== "undefined" && FR_TOWN.tullimar) {
FR_TOWN.tullimar.folk = [];
}
function tmLite() { return typeof sbLite === "function" ? sbLite() : false; }
function tmY(x, z) { return typeof sfHeight === "function" ? sfHeight(x, z) : 0; }
(function () {
if (typeof frBuildTown !== "function")
return;
var fb = frBuildTown;
frBuildTown = function (G, k) {
if (k !== "tullimar" || typeof kitBatch !== "function")
return fb.apply(this, arguments);
try {
tmBuild(G);
}
catch (e) {
console.warn("tullimar market", e);
return fb.apply(this, arguments);
}
try {
if (typeof gxOutskirts === "function")
gxOutskirts(G, "tullimar");
}
catch (e) {
console.warn("tullimar outskirts", e);
}
try {
tmWayPost(G);
}
catch (e) {
console.warn("tullimar signpost", e);
}
};
})();
var TM_CRATER = { floor: 14, bowl: 30, out: 44, deep: 4.5, rim: 1.5 };
function tmShrineAt() { var P = typeof GX_OUT !== "undefined" && GX_OUT.tullimar && GX_OUT.tullimar.places[1]; return P ? P.at : [160, -150]; }
(function () {
if (typeof sfHeight !== "function")
return;
var sh = sfHeight;
sfHeight = function (x, z) {
if (typeof SF === "undefined" || SF.k !== "tullimar")
return sh(x, z);
var A = tmShrineAt(), d = Math.hypot(x - A[0], z - A[1]), K = TM_CRATER;
if (d >= K.out)
return sh(x, z);
if (SF._tmCfg !== SF.cfg) {
SF._tmCfg = SF.cfg;
SF._tmY = sh(A[0], A[1]);
}
var bc = SF._tmY, ss = function (t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
if (d < K.bowl)
return bc - K.deep + (K.deep + K.rim) * ss((d - K.floor) / (K.bowl - K.floor));
var t = ss((d - K.bowl) / (K.out - K.bowl));
return (bc + K.rim) * (1 - t) + sh(x, z) * t;
};
})();
function tmWayPost(G) { return __ZC(462, 279, this, arguments, new.target); }
function tmSlots() { return __ZC(462, 280, this, arguments, new.target); }
function tmBuild(G) { return __ZC(462, 281, this, arguments, new.target); }
function tmSignLine(m) { if (m.pic && typeof SPG_GOODS !== "undefined" && SPG_GOODS[m.pic])
return SPG_GOODS[m.pic].n; return m.t.charAt(0).toUpperCase() + m.t.slice(1); }
function tmSign(G, title, line, x, y, z, ry, w, h, pic) { return __ZC(462, 282, this, arguments, new.target); }
function tmStall(B, F, m, r) { return __ZC(462, 283, this, arguments, new.target); }
function tmWares(B, F, m, r) { return __ZC(462, 284, this, arguments, new.target); }
function tmRug(B, F, R, i) { return __ZC(462, 285, this, arguments, new.target); }
function tmPlanter(B, F, R) { return __ZC(462, 286, this, arguments, new.target); }
function tmCargo(B, F, R, lite) { return __ZC(462, 287, this, arguments, new.target); }
function tmPeople(G) { return __ZC(462, 288, this, arguments, new.target); }
var TM_HONEST = "What you agree to do must really happen: do it with one of your real actions (they are listed for you), and never say you have given, marked or sent anything any other way.";
(function () {
if (typeof sfTick !== "function")
return;
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (SF.k !== "tullimar" || !TM.built)
return r;
TM.folk.forEach(function (f) { if (typeof wWander === "function")
wWander(f.g, dt, function (x, z) { return tmY(x, z); }, { r: f.r, sp: 0.8 }); });
var L = worldLocal(), best = null, bd = 3.6;
TM.shops.forEach(function (s) { var d = Math.hypot(L.x - s.fx, L.z - s.fz); if (d < bd) {
bd = d;
best = s;
} d = Math.hypot(L.x - s.x, L.z - s.z) - 2.4; if (d < bd) {
bd = d;
best = s;
} });
if (best)
worldPrompt("⚖ <b>" + sbEsc(best.m.n) + "</b>, " + sbEsc(best.m.t) + " · <b>press E</b> to trade", function () { tmShop(best.m); });
}
catch (e) {
if (!TM.warned) {
TM.warned = 1;
console.warn("tullimar", e);
}
}
return r;
};
})();
function tmTalk(m) { return __ZC(462, 289, this, arguments, new.target); }
function tmWant(m) { return __ZC(462, 290, this, arguments, new.target); }
function tmMatch(m, kind) { var G = SPG_GOODS[kind]; if (!G)
return false; if (m.buys)
return true; if (m.f && m.f.home)
return m.f.home.indexOf(G.home) >= 0 || m.f.cat && m.f.cat.indexOf(G.cat) >= 0; return m.f && m.f.cat.indexOf(G.cat) >= 0; }
function tmPrice(kind) { var G = SPG_GOODS[kind]; return Math.max(1, Math.round(G.base * spgDrift(spgDay(), "tullimar", kind) * (G.home === "tullimar" ? 1 : 1.4))); }
function tmShop(m, msg) { return __ZC(462, 291, this, arguments, new.target); }
function tmTrade(fn, m, kind, n) { return __ZC(462, 292, this, arguments, new.target); }
(function () {
if (typeof frLeaderCard !== "function")
return;
var lc = frLeaderCard;
frLeaderCard = function (site) {
var r = lc.apply(this, arguments);
try {
if (site && site.frLead && site.frLead.p === "tullik" && TM.built) {
var el = document.querySelector("[data-w='trade']");
if (el) {
el.innerHTML = "<b>⚖ The market</b><br><span style='opacity:.75;font-size:12px'>Twelve stalls round the bell: walk up to one and press E</span>";
var g = el.cloneNode(true);
el.parentNode.replaceChild(g, el);
g.addEventListener("click", function (e) { e.stopPropagation(); worldCard(worldFacts("Tullimar market", "Who sells what", TM_SHOPS.map(function (m) { return [m.n, m.t.charAt(0).toUpperCase() + m.t.slice(1)]; }), ["Walk up to a stall and press E (or tap the prompt) to trade.", "The Tullik pay best for fine goods, relics, crystals, spice, food, cloth and metal from far away."]), {}); });
}
}
}
catch (e) { }
return r;
};
})();
(function () {
try {
if (typeof SP_ALIENS !== "undefined")
SP_ALIENS.forEach(function (a) { if (a.persona && a.persona.indexOf(TM_HONEST) < 0)
a.persona += " " + TM_HONEST; });
if (typeof FR_TOWN !== "undefined")
Object.keys(FR_TOWN).forEach(function (k) { var T = FR_TOWN[k]; if (T.persona && T.persona.indexOf(TM_HONEST) < 0)
T.persona += " " + TM_HONEST; if (T.leader && T.leader.persona && T.leader.persona.indexOf(TM_HONEST) < 0)
T.leader.persona += " " + TM_HONEST; });
}
catch (e) { }
})();
"use strict";
var ADN = { byName: {}, stall: null, mark: null };
var ADN_HAIL = { veyari: "Sael of the Veyari", tullik: "Pip-Tullik the trader", orrem: "Orrem Drone 7" };
Object.keys(ADN_HAIL).forEach(function (k) { ADN.byName[ADN_HAIL[k]] = k; });
function adnSurf() { return typeof WLD !== "undefined" && WLD && WLD.on === "surface" && typeof SF !== "undefined" && SF.k && !(typeof SP_BY !== "undefined" && SP_BY[SF.k]); }
function adnSpace() { return typeof sbHere === "function" && sbHere(); }
function adnHere() { return adnSpace() || adnSurf(); }
function adnReach() { return adnSurf() ? !!(typeof FR_BY !== "undefined" && FR_BY[SF.k]) : (typeof frIn === "function" && frIn()); }
function adnPeople(ctx) {
var p = ADN.byName[ctx && ctx.name];
if (!p && adnSurf() && typeof FR_BY !== "undefined" && FR_BY[SF.k])
p = FR_BY[SF.k].people;
return (p && typeof FR_PEOPLES !== "undefined" && FR_PEOPLES[p]) ? p : null;
}
function adnCap(s) { s = String(s || ""); return s.charAt(0).toUpperCase() + s.slice(1); }
function adnBodies() { return __ZC(462, 293, this, arguments, new.target); }
function adnFindBody(q) { return (q && typeof stfBest === "function") ? stfBest(q, adnBodies(), function (b) { return b.name; }) : null; }
function adnBodyPos(B) {
if (!B)
return null;
if (B.sys === "reach")
return (typeof frWorld === "function") ? frWorld(B.k) : null;
var h = SP.bodies && SP.bodies[B.k];
if (!h)
return null;
var v = new THREE.Vector3();
h.getWorldPosition(v);
return v;
}
function adnPlaces() { return __ZC(462, 294, this, arguments, new.target); }
function adnTradeWhat(ctx) { return __ZC(462, 295, this, arguments, new.target); }
function adnMarkLoad() { try {
var o = JSON.parse(localStorage.getItem("adn.mark") || "null");
if (o && o.k)
ADN.mark = o;
}
catch (e) { } }
function adnMarkSave() { try {
localStorage.setItem("adn.mark", JSON.stringify(ADN.mark));
}
catch (e) { } }
function adnMarkBody() { return __ZC(462, 296, this, arguments, new.target); }
function adnFlyTo(B, after) {
var p = adnBodyPos(B);
if (!p || typeof spFlyTo !== "function")
return false;
var f = SP.pos.clone().sub(p);
if (f.lengthSq() < 1)
f.set(1, 0, 0);
f.normalize();
spFlyTo({ pos: p.clone().addScaledVector(f, B.r * 3 + 200), name: B.name, after: after || ("Press E to land on " + B.name + ".") });
return true;
}
var ADN_DEEDS = [
{ tag: "TRADE", label: "⚖ Trade", hint: "opens trading right now: your stall, your ship's hold or this world's trading post, so the traveller can buy and sell (it goes to their backpack)",
when: function (ctx) { return adnHere() && !!adnTradeWhat(ctx); },
run: function (ctx) { return __ZC(462, 297, this, arguments, new.target); } },
{ tag: "SHOW", arg: "a place in this town", label: "🧭 Show me the way to…", hint: "the pointer at the top of the traveller's screen shows the way to a place in this town",
opts: function () { return adnPlaces().map(function (p) { return p.label; }); },
when: function () { return adnSurf() && adnPlaces().length > 0 && typeof guideTo !== "undefined"; },
run: function (ctx, arg) { return __ZC(462, 298, this, arguments, new.target); } },
{ tag: "MARK", arg: "a world of this star system", label: "✦ Mark on my chart…", hint: "marks a world of this star system on the traveller's star chart; the banner then shows how far it is",
opts: function () { return adnBodies().map(function (b) { return b.name; }); },
when: function () { return adnHere() && adnBodies().length > 0; },
run: function (ctx, arg) { return __ZC(462, 299, this, arguments, new.target); } },
{ tag: "FLY", arg: "a world of this star system", label: "🚀 Set my course for…", hint: "the traveller's autopilot sets course for that world right now (only while they are in their ship)",
opts: function () { return adnBodies().map(function (b) { return b.name; }); },
when: function () { return adnSpace() && adnBodies().length > 0 && typeof spFlyTo === "function"; },
run: function (ctx, arg) {
var B = adnFindBody(arg);
if (!B)
return { ok: false, say: "There's no world called " + arg + " in this star system." };
ADN.mark = { k: B.k, sys: B.sys, by: ctx.name, at: Date.now() };
adnMarkSave();
stfSoon(function () { adnFlyTo(B); });
return { ok: true };
} },
{ tag: "WRECK", label: "🔧 A wreck to salvage", hint: "marks a real wreck near an ice world on the traveller's chart, with a beacon, for them to search and salvage",
when: function (ctx) { return adnSpace() && ADN.byName[ctx.name] === "veyari" && !(typeof frIn === "function" && frIn()) && typeof svTipMark === "function"; },
run: function () {
var k = svTipMark(), T = SV_TIPS[k];
return { ok: true, say: "✦ <b>Marked on your chart:</b> a wreck near " + sbEsc(T.name) + ", " + sbEsc(T.ship) + ". Its violet beacon shows from far off." };
} },
{ tag: "TASK", label: "📜 Your people's task", hint: "gives the traveller your people's task (on your own world the leader's card opens; from a ship it is told and their world is marked)",
when: function (ctx) { var p = adnPeople(ctx); if (!p || !adnHere())
return false; var S = frStandGet(); return !(S._log && S._log["_" + p + "_task"]); },
run: function (ctx) { return __ZC(462, 300, this, arguments, new.target); } },
{ tag: "GIFT", label: "🎁 A keepsake", hint: "gives the traveller your people's keepsake (it goes in their backpack); only once, and only to someone your people count a friend",
when: function (ctx) {
var p = adnPeople(ctx);
if (!p || !adnHere() || typeof bkpKept !== "function")
return false;
if (frStand(p) < 10)
return false;
return !bkpKept().some(function (q) { return q.a === "sb_gift_" + p; });
},
run: function (ctx) { var p = adnPeople(ctx); frGift(p); return { ok: true, say: "🎁 <b>" + sbEsc(FR_PEOPLES[p].gift) + "</b> is in your backpack, a gift of " + sbEsc(FR_PEOPLES[p].name) + "." }; } },
{ tag: "MEND", label: "🔧 Mend my ship", hint: "your machines patch the traveller's hull and shields, free",
when: function (ctx) { return adnHere() && adnPeople(ctx) === "orrem" && typeof orwAwake === "function" && orwAwake() && typeof orwMend === "function"; },
run: function () { orwMend(false); return { ok: true, say: "🔧 The Orrem machines go over your ship: hull and shields good as new." }; } }
];
(function () {
function reg(d) { if (typeof staffDeedAdd === "function")
staffDeedAdd(d);
else {
window.SD_PENDING = window.SD_PENDING || [];
window.SD_PENDING.push(d);
} }
ADN_DEEDS.forEach(reg);
})();
function adnDeed(tag) { return ADN_DEEDS.filter(function (d) { return d.tag === tag; })[0] || null; }
(function () {
if (typeof stfAvailable !== "function")
return;
var av = stfAvailable;
stfAvailable = function (ctx) {
var A = av.apply(this, arguments);
try {
if (adnHere()) {
var mine = {};
ADN_DEEDS.forEach(function (d) { mine[d.tag] = 1; });
A = A.filter(function (d) { return mine[d.tag]; });
}
}
catch (e) { }
return A;
};
})();
(function () {
if (typeof stfChip !== "function")
return;
var ch = stfChip;
stfChip = function (tag) {
var r = ch.apply(this, arguments);
try {
var d = adnDeed(tag), dl = document.getElementById("stf-list"), inp = document.getElementById("stf-arg");
if (d && d.opts && dl) {
dl.innerHTML = d.opts().slice(0, 120).map(function (o) { return '<option value="' + esc(o) + '">'; }).join("");
if (inp)
inp.placeholder = tag === "SHOW" ? "which place" : "which world";
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof spHail === "function") {
var sh = spHail;
spHail = function (who) { ADN.stall = null; return sh.apply(this, arguments); };
}
if (typeof tmTalk === "function") {
var tt = tmTalk;
tmTalk = function (m) { ADN.stall = m; return tt.apply(this, arguments); };
}
})();
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) {
var s = cs.apply(this, arguments);
try {
if (c && c.wKey && adnHere()) {
var ctx = { name: c.name }, p = adnPeople(ctx);
if (p)
s += " " + adnCap(FR_PEOPLES[p].name) + " count the traveller as: " + frLevel(p) + ".";
s += " You are a person of your own world with your own life: be curious about the traveller, ask them things, tell them news, rumours and stories of the stars, and offer what you can really do when it would help them.";
}
}
catch (e) { }
return s;
};
})();
(function () {
if (typeof spChart !== "function")
return;
var sc = spChart;
spChart = function () {
var B = adnMarkBody();
if (!B)
return sc.apply(this, arguments);
var cap = null, wc = worldCard;
worldCard = function (h, f) { cap = [h, f]; };
try {
sc.apply(this, arguments);
}
finally {
worldCard = wc;
}
if (!cap)
return;
var h = cap[0], fns = cap[1] || {};
h += worldBtn("adn-mark", "✦ " + sbEsc(B.name) + " (marked)", "Marked for you by " + sbEsc(ADN.mark.by || "a friend") + ": fly there");
fns["adn-mark"] = function () { worldCard(null); adnFlyTo(B); };
worldCard(h, fns);
};
})();
(function () {
if (typeof spBannerTick !== "function")
return;
var bt = spBannerTick;
spBannerTick = function () {
var r = bt.apply(this, arguments);
try {
var B = adnMarkBody();
if (B && WLD.hud && WLD.hud.style.display !== "none") {
var p = adnBodyPos(B);
if (p) {
var d = Math.max(0, p.distanceTo(SP.pos) - B.r);
if (d < B.r * 2 + 120) {
ADN.mark = null;
adnMarkSave();
return r;
}
var line = "✦ " + B.name + " (marked by " + (ADN.mark.by || "a friend") + "): " + (d >= 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m"), el = WLD.hud.querySelector(".adnLine");
if (!el)
WLD.hud.insertAdjacentHTML("beforeend", "<div class='adnLine' style='color:#FFD98A'>" + sbEsc(line) + "</div>");
else if (el.textContent !== line)
el.textContent = line;
}
}
}
catch (e) { }
return r;
};
})();
adnMarkLoad();
"use strict";
var ALN = { mats: {}, portraits: {} };
var ALN_OF = { tullimar: "tullik", maruondo: "ondai", skeldmar: "hrovan", veyar: "veyari" };
var ALN_SKIN = {
veyari: [0x8A9AE8, 0x9AA8F0, 0x7A86D8],
tullik: [0x58B8E0, 0x6AC4E8, 0x4AA8D4],
ondai: [0x2E6A72, 0x34767E, 0x285E66],
hrovan: [0xC8502A, 0xB84826, 0xD05A30]
};
function alnMat(col, o) { return __ZC(462, 301, this, arguments, new.target); }
function alnEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 20, Math.round((seg || 20) * 0.75)), mat); m.scale.set(rx, ry, rz); m.position.set(x, y, z); P.add(m); return m; }
function alnCone(P, mat, r, h, x, y, z, rx, ry, rz, seg) { var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg || 12), mat); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); P.add(m); return m; }
function alnCyl(P, mat, rt, rb, h, x, y, z, rx, ry, rz, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 10), mat); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); P.add(m); return m; }
function alnTube(P, mat, pts, r0, r1, seg) { return __ZC(462, 302, this, arguments, new.target); }
function alnEye(P, x, y, z, r, iris, ry, sq) { return __ZC(462, 303, this, arguments, new.target); }
function alnHead(kind, skin) { return __ZC(462, 304, this, arguments, new.target); }
function alnFit(g, kind, skin) { return __ZC(462, 305, this, arguments, new.target); }
(function () {
if (typeof frFolkLook !== "function" || typeof frFolk !== "function")
return;
var fl = frFolkLook;
frFolkLook = function (k, i) {
var r = fl.apply(this, arguments), a = ALN_OF[k];
if (a && r) {
r.look = r.look || {};
r.look.alien = a;
if (a === "veyari") {
r.look.skin = ALN_SKIN.veyari[(i || 0) % 3];
r.look.hairStyle = "bald";
r.look.layer = "robe";
r.look.layerColor = [0xE8D8F8, 0xC8D8F8, 0xF0E0F0][(i || 0) % 3];
r.look.top = 0xD8C8F0;
r.look.bottom = 0xB8A8E0;
r.feats = ["thin"];
r.scale = 1.12;
}
if (a !== "veyari" && ALN_SKIN[a])
r.look.skin = ALN_SKIN[a][(i || 0) % 3];
if (a === "tullik") {
r.arms = 0;
if (r.feats)
r.feats = r.feats.filter(function (f) { return f !== "ears"; });
}
if (a === "ondai" && r.feats)
r.feats = r.feats.filter(function (f) { return f !== "ears"; });
if (a === "hrovan" && r.feats)
r.feats = r.feats.filter(function (f) { return f !== "horns"; });
}
return r;
};
var ff = frFolk;
frFolk = function (seed, o) {
var g = ff.apply(this, arguments);
try {
var a = o && o.look && o.look.alien;
if (a)
alnFit(g, a, o.look.skin != null ? o.look.skin : ALN_SKIN[a][0]);
}
catch (e) {
if (!ALN.warned) {
ALN.warned = 1;
console.warn("alien bodies", e);
}
}
return g;
};
})();
(function () {
if (typeof sfVeyari !== "function" || typeof frFolk !== "function")
return;
var n = 0;
sfVeyari = function () {
var i = n++, g;
try {
var L = frFolkLook("veyar", i);
g = frFolk("vy_" + i, { title: "", sex: i % 2 ? "f" : "m", look: L.look, feats: L.feats });
g.scale.setScalar(L.scale || 1.12);
}
catch (e) {
g = new THREE.Group();
}
g.userData.walk = { a: Math.random() * 6 };
return g;
};
})();
(function () {
if (typeof frFolkLook !== "function")
return;
var fl = frFolkLook;
frFolkLook = function (k, i) { if (k === "veyar")
return { look: { alien: "veyari", skin: ALN_SKIN.veyari[(i || 0) % 3], hairStyle: "bald", layer: "robe", layerColor: [0xE8D8F8, 0xC8D8F8, 0xF0E0F0][(i || 0) % 3], top: 0xD8C8F0, bottom: 0xB8A8E0 }, feats: ["thin"], scale: 1.12 }; return fl.apply(this, arguments); };
})();
var ALN_DIR = "assets/models/aliens/";
function alnLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof HDF_PHONE !== "undefined" && !!HDF_PHONE); }
var ALN_DRESS = { veyari: 1, tullik: 1, ondai: 1 };
function alnFile(kind, sex, dressed) { var n = kind === "veyari" ? (sex === "f" ? "veyari-f" : "veyari-m") : kind; return "aln/" + n + (dressed && ALN_DRESS[kind] ? "-w" : "") + (alnLite() ? "-lite" : ""); }
function alnLoad(file, cb) { return __ZC(462, 306, this, arguments, new.target); }
(function () {
if (typeof hdfFile !== "function" || typeof hdfPlan !== "function")
return;
var hf = hdfFile;
hdfFile = function (file, cb) { if (String(file).indexOf("aln/") === 0)
return alnLoad(file, cb); return hf.apply(this, arguments); };
var hp = hdfPlan;
hdfPlan = function (spec) {
var a = !window.ALN_OFF && spec && spec.look && spec.look.alien;
if (a && a !== "robot" && ALN_SKIN[a]) {
var f = alnFile(a, spec.look.sex, (typeof hdfHash === "function" ? hdfHash(String(spec.id || "")) : 0) % 5 < 2);
return { type: "own", files: [f], main: f, set: "ara", aln: a, L: spec.look, child: false, key: "aln:" + f };
}
return hp.apply(this, arguments);
};
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) {
var r = ha.apply(this, arguments);
try {
if (E.model && E.plan && E.plan.aln) {
var g = E.g, body = g.children[0], hid = E.hid || (E.hid = []);
g.children.forEach(function (o) {
if (o === body || o.isSprite || o.userData.hdfRoot)
return;
o.traverse(function (m) { if (m.isMesh && m.visible && !m.isSprite) {
m.visible = false;
hid.push(m);
} });
});
}
}
catch (e) {
if (!ALN.warnHd) {
ALN.warnHd = 1;
console.warn("alien body", e);
}
}
return r;
};
})();
var ALN_HAILER = { "Sael of the Veyari": "veyari", "Pip-Tullik the trader": "tullik", "Orrem Drone 7": "robot", "Ilun of the Veyari": "veyari" };
function alnWho(name) { return __ZC(462, 307, this, arguments, new.target); }
var ALN_BG = { veyari: 0x1A1638, tullik: 0x10263A, ondai: 0x0E2A30, hrovan: 0x2A1410, robot: 0x141C28 };
function alnSnap(kind, obj, aim, dist, lift) { return __ZC(462, 308, this, arguments, new.target); }
function alnPortrait(kind, cb) { return __ZC(462, 309, this, arguments, new.target); }
function alnShowFace(c) { return __ZC(462, 310, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) { var r = ot.apply(this, arguments); try {
alnShowFace(c);
}
catch (e) { } return r; };
})();
var FC = { was: false };
function fcFight() { try {
return WLD.on === "space" && typeof SB !== "undefined" && !!SB.battle;
}
catch (e) {
return false;
} }
var FC_KEEP = /Far Gate|🎯/;
(function () {
function fcWrapPrompt() {
if (FC.wrapped || typeof worldPrompt !== "function")
return;
FC.wrapped = 1;
var wp = worldPrompt;
worldPrompt = function (html) { if (html && fcFight() && !FC_KEEP.test(String(html)))
return wp.call(this, null); return wp.apply(this, arguments); };
}
if (document.readyState === "complete")
setTimeout(fcWrapPrompt, 0);
else
addEventListener("load", function () { setTimeout(fcWrapPrompt, 0); });
if (typeof spHail === "function") {
var sh = spHail;
spHail = function () { if (fcFight()) {
sbSay("<b>Not now.</b> You are in a fight. Hail them when it is over.");
return;
} return sh.apply(this, arguments); };
}
if (typeof spEncounterTick === "function") {
var et = spEncounterTick;
spEncounterTick = function (dt) {
if (fcFight()) {
if (SP.enc && SP.enc.t < 70)
SP.enc.t = 70;
if (!SP.enc && SP.encAt < 40)
SP.encAt = 40 + Math.random() * 60;
}
return et.apply(this, arguments);
};
}
if (typeof spTick === "function") {
var st = spTick;
spTick = function () {
var r = st.apply(this, arguments);
try {
fcWrapPrompt();
var f = fcFight();
if (f && !FC.was) {
var talking = typeof talkOpen !== "undefined" && talkOpen && talkWith && talkWith.wKey && /^wtalk:/.test(talkWith.wKey);
if (talking && typeof closeTalk === "function") {
closeTalk();
sbSay("<b>Contact: hostile.</b> The channel is closed while you fight. Hail them again after.");
}
if (WLD.promptFn && WLD.prompt && !FC_KEEP.test(WLD.prompt.innerHTML || ""))
worldPrompt(null);
}
FC.was = f;
}
catch (e) {
if (!FC.w) {
FC.w = 1;
console.warn("fight calm", e);
}
}
return r;
};
}
})();
var SPX = { got: {}, w: null, asked: false };
function spxTake(k) { var d = SPX.got[k]; if (!d)
return null; delete SPX.got[k]; return d; }
function spxStart() {
if (SPX.asked || typeof Worker === "undefined" || typeof spPaintData !== "function" || typeof frPaintData !== "function")
return;
var nav = typeof navigator !== "undefined" ? navigator : {};
if ((nav.hardwareConcurrency || 0) < 4 || (nav.deviceMemory && nav.deviceMemory < 4))
return;
var three = null;
try {
var sc = document.querySelectorAll("script[src]");
for (var i = 0; i < sc.length; i++)
if (/three[^\/]*\.js/.test(sc[i].src) && typeof THREE !== "undefined")
three = new URL(sc[i].src, location.href).href;
}
catch (e) { }
if (!three)
return;
var jobs = [];
try {
(typeof SP_BY !== "undefined" ? Object.keys(SP_BY) : []).forEach(function (k) { if (!(SP.tex && SP.tex[k]))
jobs.push(["sp", k]); });
}
catch (e) { }
try {
(typeof FR_BODIES !== "undefined" ? FR_BODIES : []).forEach(function (b) { var k = b.star ? b.k : (b.paint || b.k); if (!(SP.tex && SP.tex["fr_" + k]) && !jobs.some(function (j) { return j[0] === "fr" && j[1] === k; }))
jobs.push(["fr", k]); });
}
catch (e) { }
if (!jobs.length)
return;
SPX.asked = true;
var src = "importScripts(" + JSON.stringify(three) + ");\n" +
"var GX_PAL=" + JSON.stringify(typeof GX_PAL !== "undefined" ? GX_PAL : {}) + ";\n" +
wNoise.toString() + "\n" + wFbm.toString() + "\n" + gxPaintPx.toString() + "\n" + spPaintData.toString() + "\n" + frPaintData.toString() + "\n" +
"onmessage=function(e){ var J=e.data; for(var i=0;i<J.length;i++){ var d=null; try{ d=J[i][0]===\"sp\"?spPaintData(J[i][1]):frPaintData(J[i][1]); }catch(x){}" +
" if(d) postMessage({k:J[i][0]+\"|\"+J[i][1],b:d.buffer},[d.buffer]); } postMessage({done:1}); };";
try {
var w = new Worker(URL.createObjectURL(new Blob([src], { type: "application/javascript" })));
SPX.w = w;
w.onmessage = function (e) {
var m = e.data;
if (m && m.done) {
try {
w.terminate();
}
catch (x) { }
SPX.w = null;
return;
}
if (m && m.k && m.b) {
var key = m.k.slice(3), have = m.k.charAt(0) === "s" ? SP.tex && SP.tex[key] : SP.tex && SP.tex["fr_" + key];
if (!have)
SPX.got[m.k] = new Uint8ClampedArray(m.b);
}
};
w.onerror = function () { try {
w.terminate();
}
catch (x) { } SPX.w = null; };
w.postMessage(jobs);
}
catch (e) {
SPX.w = null;
}
}
if (typeof window !== "undefined")
setTimeout(function () { try {
spxStart();
}
catch (e) { } }, 40000);
var SGW = { tick: 0, key: "", told: "", beam: null, bk: "" };
function sgDirWord(dx, dz) { return __ZC(462, 311, this, arguments, new.target); }
function sgDist(d) { return d < 1000 ? "about " + Math.max(10, Math.round(d / 10) * 10) + " m" : "about " + (d / 1000).toFixed(1) + " km"; }
function sgFrom(P, x, z) { var dx = P.at[0] - x, dz = P.at[1] - z; return sgDist(Math.hypot(dx, dz)) + " " + sgDirWord(dx, dz); }
function sgTellTowns() { return __ZC(462, 312, this, arguments, new.target); }
function sgAskWay(k, who) { return __ZC(462, 313, this, arguments, new.target); }
function sgPoint(P) { if (typeof guideTo === "undefined")
return; var W = WORLDS.surface; guideTo = { key: P.n, x: (W.base || 0) + P.at[0], z: P.at[1], chase: false }; }
function sgGoal() { return __ZC(462, 314, this, arguments, new.target); }
function sgWay(P, L) { return P; }
function sgBeam(P) { return __ZC(462, 315, this, arguments, new.target); }
function sgBeamOff() { var b = SGW.beam; if (!b)
return; if (b.parent)
b.parent.remove(b); b.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material)
m.material.dispose(); }); SGW.beam = null; SGW.bk = ""; }
(function () {
if (typeof sfTick !== "function")
return;
var st = sfTick;
sfTick = function (dt) {
var r = st.apply(this, arguments);
try {
SGW.tick += dt;
if (SGW.tick < 0.3)
return r;
SGW.tick = 0;
var G = sgGoal();
if (!G) {
sgBeamOff();
return r;
}
var L = worldLocal(), P = G.P, y = GX_OUT[SF.k].water ? 0.6 : sfHeight(P.at[0], P.at[1]);
sgBeam(P);
sgWay({ x: P.at[0], y: y, z: P.at[1] }, L);
var tk = G.key + "@" + (SF.cfg && SF.cfg.seed) + ":" + (SF._sgB || 0);
if (SGW.told !== tk && Math.hypot(L.x - P.at[0], L.z - P.at[1]) > 20) {
SGW.told = tk;
sbSay("<b>" + sbEsc(P.n) + "</b> lies " + sbEsc(sgFrom(P, L.x, L.z)) + " of you" + (G.town ? ", in town, under the gold light" : (GX_OUT[SF.k].water ? "" : ": follow the line of lamps out of town") + ", to the gold light") + ". (" + sbEsc(G.line) + ".)");
}
}
catch (e) {
if (!SGW.w) {
SGW.w = 1;
console.warn("quest way", e);
}
}
return r;
};
var sb = sfBuild;
sfBuild = function () { sgTellTowns(); SGW.beam = null; SGW.bk = ""; SF._sgB = (SF._sgB || 0) + 1; return sb.apply(this, arguments); };
})();
var GSI = { tex: {}, mat: {} };
function gsiMat(col, o) { return __ZC(462, 316, this, arguments, new.target); }
function gsiOne(name) { var s = String(name || "").trim(), w = s.split(" "), l = w[w.length - 1]; if (/[^s]s$/.test(l))
w[w.length - 1] = l.slice(0, -1); s = w.join(" "); return s.charAt(0).toUpperCase() + s.slice(1); }
function gsiKind(name) { return __ZC(462, 317, this, arguments, new.target); }
function gsiLabelTex(t) { return __ZC(462, 318, this, arguments, new.target); }
function gsItemMesh(g, name, col) { return __ZC(462, 319, this, arguments, new.target); }
var NAV = { el: null, cv: null, ctx: null, line: null, tags: {}, arrow: null, mark: null, t: 0, lastLine: "" };
var NAV_V = new THREE.Vector3(), NAV_W = new THREE.Vector3();
function navCss() { return __ZC(462, 320, this, arguments, new.target); }
function navBuild() { return __ZC(462, 321, this, arguments, new.target); }
function navHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function navThings() { return __ZC(462, 322, this, arguments, new.target); }
function navSysOf(w) { var out = null; try {
Object.keys(GX_SYS).forEach(function (k) { (GX_SYS[k].bodies || []).forEach(function (b) { if (!out && (b.land === w || b.k === w))
out = { sys: k, b: b }; }); });
}
catch (e) { } return out; }
function navStarName(k) { return k === "sol" ? "home, the Sun" : ((GX_SYS[k] || {}).name || k); }
function navGoal() { return __ZC(462, 323, this, arguments, new.target); }
function navToStar(sys, world, line) { return __ZC(462, 324, this, arguments, new.target); }
function navDist(d) { return d < 1000 ? Math.round(d) + " m" : (d / 1000).toFixed(d < 10000 ? 1 : 0) + " km"; }
function navWay(rel, fwd, right) {
var f = rel.dot(fwd), r = rel.dot(right), u = rel.y, L = rel.length() || 1, w = [];
if (f / L > 0.8)
w.push("ahead");
else if (f / L < -0.6)
w.push("behind you");
else
w.push(r > 0 ? "to your right" : "to your left");
if (Math.abs(u) / L > 0.35)
w.push(u > 0 ? "above" : "below");
return w.join(", ");
}
function navShow(on) { return __ZC(462, 325, this, arguments, new.target); }
function navTick(dt) {
var on = typeof sbHere === "function" && sbHere() && !(typeof sbVR === "function" && sbVR()) && !(typeof GX !== "undefined" && GX.riding) && !(typeof walkMode !== "undefined" && !walkMode) && !(typeof SKC !== "undefined" && SKC.el);
if (!on) {
if (NAV.el)
navShow(false);
return;
}
navBuild();
navShow(true);
var now = Date.now(), full = !(now - (NAV.at || 0) < 250);
if (full)
NAV.at = now;
var G = sbG(), off = G ? G.position : NAV_W.set(0, 0, 0), fwd = sbFwd(yaw, 0), right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
var things = NAV.things && !full ? NAV.things : (NAV.things = navThings()), goal = full || !NAV.goal ? (NAV.goal = navGoal()) : NAV.goal;
var W = innerWidth, H = innerHeight, phone = W < 700 || H < 500;
if (full) {
var cp = document.getElementById("compass"), rc = cp && cp.getBoundingClientRect(), S = phone ? 84 : 112;
var left = rc && rc.width ? rc.left : 16, top = rc && rc.height ? rc.top : 58;
if (rc && rc.width)
S = Math.max(72, Math.min(130, Math.round(Math.max(rc.width, rc.height))));
NAV.el.style.left = left + "px";
NAV.el.style.top = top + "px";
NAV.S = S;
var dpr = Math.min(2, window.devicePixelRatio || 1);
if (NAV.cv.width !== Math.round(S * dpr)) {
NAV.cv.width = Math.round(S * dpr);
NAV.cv.height = Math.round(S * dpr);
NAV.cv.style.width = S + "px";
NAV.cv.style.height = S + "px";
}
navDraw(things, goal, fwd, right, dpr);
var txt = "";
if (goal) {
if (goal.p) {
var rel = goal.p.clone().sub(SP.pos);
txt = "➤ <b>" + sbEsc(goal.name) + "</b> · " + navDist(rel.length()) + " · " + navWay(rel, fwd, right) + (goal.via ? "<br><span style='opacity:.8'>" + sbEsc(goal.via) + "</span>" : "");
}
else if (goal.far)
txt = "➤ <b>" + sbEsc(goal.name) + "</b><br><span style='opacity:.85'>" + sbEsc(goal.far) + "</span>";
else if (goal.here)
txt = "➤ " + sbEsc(goal.line || "");
if (goal.line && !goal.here)
txt += "<br><span style='opacity:.7;font-size:11px'>" + sbEsc(goal.line) + "</span>";
}
if (txt !== NAV.lastLine) {
NAV.lastLine = txt;
NAV.line.innerHTML = txt;
}
NAV.line.style.display = txt ? "block" : "none";
NAV.line.style.left = (left) + "px";
NAV.line.style.top = (top + NAV.S + 6) + "px";
}
var seen = {}, gk = goal && goal.p ? goal.name : null, cam = camera;
things.forEach(function (T) {
var el = NAV.tags[T.k];
if (!el) {
el = NAV.tags[T.k] = document.createElement("div");
el.className = "nav-tag" + (T.kind === "station" || T.kind === "place" ? " low" : "");
document.body.appendChild(el);
}
seen[T.k] = 1;
NAV_V.copy(T.p).add(off);
var d = T.p.distanceTo(SP.pos);
var p = NAV_V.clone().project(cam), vis = p.z < 1 && p.z > -1 && Math.abs(p.x) < 1.02 && Math.abs(p.y) < 1.02 && d > T.r * 2.2;
if (!vis) {
if (el.style.display !== "none")
el.style.display = "none";
return;
}
var x = (p.x + 1) / 2 * W, y = (1 - p.y) / 2 * H, isG = gk && gk === T.name;
if (full || !el._t) {
var t = sbEsc(T.name) + " <i>" + navDist(d) + "</i>";
if (el._t !== t) {
el._t = t;
el.innerHTML = t;
}
el.classList.toggle("goal", !!isG);
}
el.style.display = "block";
el.style.left = x + "px";
el.style.top = y + "px";
});
Object.keys(NAV.tags).forEach(function (k) { if (!seen[k])
NAV.tags[k].style.display = "none"; });
if (goal && goal.p) {
NAV_V.copy(goal.p).add(off);
var q = NAV_V.clone().project(cam), behind = q.z > 1, inV = !behind && Math.abs(q.x) < 0.95 && Math.abs(q.y) < 0.92;
if (inV) {
NAV.mark.style.display = "block";
NAV.mark.style.left = ((q.x + 1) / 2 * W) + "px";
NAV.mark.style.top = ((1 - q.y) / 2 * H) + "px";
NAV.arrow.style.display = "none";
}
else {
NAV.mark.style.display = "none";
var ax = behind ? -q.x : q.x, ay = behind ? -q.y : q.y;
if (behind && Math.abs(ax) < 0.01 && Math.abs(ay) < 0.01)
ay = -1;
var a = Math.atan2(ay, ax), m = 0.86, ex = Math.cos(a), ey = Math.sin(a), k2 = Math.min(m / Math.abs(ex || 1e-6), m / Math.abs(ey || 1e-6)), sx = (ex * k2 + 1) / 2 * W, sy = (1 - ey * k2) / 2 * H;
NAV.arrow.style.display = "block";
NAV.arrow.style.left = (sx - 9) + "px";
NAV.arrow.style.top = (sy - 9) + "px";
NAV.arrow.style.transform = "rotate(" + (Math.PI / 2 - a) + "rad)";
}
}
else {
NAV.mark.style.display = "none";
NAV.arrow.style.display = "none";
}
}
function navDraw(things, goal, fwd, right, dpr) { return __ZC(462, 326, this, arguments, new.target); }
(function () {
if (typeof spTick !== "function")
return;
var t = spTick;
spTick = function (dt) { var r = t.apply(this, arguments); try {
navTick(dt || 0.016);
}
catch (e) {
if (!NAV.w) {
NAV.w = 1;
console.warn("nav", e);
}
} return r; };
if (typeof worldGo === "function") {
var wg = worldGo;
worldGo = function () { try {
navShow(false);
}
catch (e) { } return wg.apply(this, arguments); };
}
setInterval(function () { try {
if (NAV.el && !(typeof sbHere === "function" && sbHere()))
navShow(false);
}
catch (e) { } }, 500);
})();
var GD = { npc: null, spots: null, ring: null, bench: null, said: {}, fol: null, esc: null, warned: 0 };
var GS_SCENES = {}, GS_CLUES = {}, GS_MAKE = {}, GS_WHO_SEX = {}, GS_ROBOT = {};
(function () {
var gp = gsPlace;
gsPlace = function (w, i) {
if (i === -1 && FR_TOWN[w]) {
var c0 = FR_TOWN[w].center;
return { n: "the town square", at: [c0[0] + 6, c0[1] + 16], a: "", town: 1 };
}
var O = GX_OUT[w];
if (!O)
return null;
if (typeof i === "string") {
for (var j = 0; j < O.places.length; j++)
if (O.places[j].n === i)
return O.places[j];
return null;
}
if (i === -1 && FR_TOWN[w]) {
var c = FR_TOWN[w].center;
return { n: "the town square", at: [c[0] + 6, c[1] + 16], a: "", town: 1 };
}
return gp.apply(this, arguments);
};
})();
function gdAddPlace(w, P) { var O = GX_OUT[w]; if (!O)
return; if (!O.places.some(function (q) { return q.n === P.n; }))
O.places.push(P); }
function gdCap(t) { t = String(t || ""); return t.charAt(0).toUpperCase() + t.slice(1); }
function gdFlags() { var S = gsGet(); S.fl = S.fl || {}; return S.fl; }
function gdHas(f) { return !!gdFlags()[f]; }
function gdY(w, x, z) { return GX_OUT[w] && GX_OUT[w].water ? 0.6 : sfHeight(x, z); }
function gdG() { return WORLDS.surface && WORLDS.surface.g; }
function gdDrop(o) { if (o && o.parent)
o.parent.remove(o); }
function gdClear() {
if (GD.npc) {
gdDrop(GD.npc.g);
GD.npc = null;
}
if (GD.spots) {
GD.spots.list.forEach(function (s) { gdDrop(s.g); });
GD.spots = null;
}
if (GD.ring) {
GD.ring.list.forEach(function (r) { gdDrop(r.g); });
GD.ring = null;
}
if (GD.bench) {
gdDrop(GD.bench.g);
GD.bench = null;
}
GD.fol = null;
GD.esc = null;
}
function gdPerson(w, key, who, x, z, o) { return __ZC(462, 327, this, arguments, new.target); }
function gdFace(N, x, z) { if (N && N.g)
N.g.rotation.y = Math.atan2(x - N.x, z - N.z); }
function gdMove(N, tx, tz, spd, dt) {
var dx = tx - N.x, dz = tz - N.z, d = Math.hypot(dx, dz);
if (d < 0.05)
return d;
var s = Math.min(d, spd * (GD.rate || 1) * dt);
N.x += dx / d * s;
N.z += dz / d * s;
N.g.position.set(N.x, gdY(SF.k, N.x, N.z) + Math.abs(Math.sin(WLD.t * 7)) * 0.05, N.z);
N.g.rotation.y = Math.atan2(dx, dz);
return d - s;
}
function gdSceneOpen(key, done) { return __ZC(462, 328, this, arguments, new.target); }
function gdSpots(A, st, P) { return __ZC(462, 329, this, arguments, new.target); }
function gdBenchAt(A, st, P) { return __ZC(462, 330, this, arguments, new.target); }
function gdMakeOpen(key, done) { return __ZC(462, 331, this, arguments, new.target); }
function gdRings(A, st, P) { return __ZC(462, 332, this, arguments, new.target); }
function gdRingPaint() { var R = GD.ring; if (!R)
return; R.list.forEach(function (q, i) { q.m.material.color.setHex(i === R.next ? 0x8AFFB0 : i < R.next ? 0x5A6A7A : 0xFFD98A); q.m.material.opacity = i < R.next ? 0.25 : 0.8; }); }
function gdTick(dt) { return __ZC(462, 333, this, arguments, new.target); }
var GD_KINDS = /^(call|scene|search|follow|escort|make|race|land)$/;
function gdSaveAll() { try {
gsSave();
}
catch (e) { } try {
if (typeof gqSave === "function")
gqSave();
}
catch (e) { } }
function gdRun(dt, A, st, C, next, alive) { return __ZC(462, 334, this, arguments, new.target); }
(function () {
var gt = gsTick;
gsTick = function (dt) { var r = gt.apply(this, arguments); try {
gdTick(dt);
}
catch (e) {
if (!GD.warned) {
GD.warned = 1;
console.warn("saga deep", e);
}
} return r; };
var sb = sfBuild;
sfBuild = function () { GD.npc = null; GD.spots = null; GD.ring = null; GD.bench = null; GD.fol = null; GD.esc = null; return sb.apply(this, arguments); };
var gl = gsLine;
gsLine = function (st) {
var k = st && st[0];
if (k === "scene") {
var D = GS_SCENES[st[3]], P = gsPlace(st[1], st[2]);
return st[4] + (D ? " (" + D.who + (P ? ", at " + P.n : "") + ")" : "");
}
if (k === "search") {
var P2 = gsPlace(st[1], st[2]);
return st[4] + (P2 ? " at " + P2.n : "") + " (" + (GS_CLUES[st[3]] || []).length + " things to find)";
}
return gl.apply(this, arguments);
};
})();
(function () {
var st = gsStep;
gsStep = function () { var S = gsGet(), A = S.act, C = A && GS_CH[A.id], last = A && C && A.i + 1 >= C.steps.length; if (last)
S.lastDone = A.id; return st.apply(this, arguments); };
var nf = gsNextFree;
gsNextFree = function () {
var id = nf.apply(this, arguments);
if (!id)
return id;
var S = gsGet(), part = function (x) { var o = null; Object.keys(GS_GATE).forEach(function (k) { if (GS_GATE[k].indexOf(x) >= 0)
o = k; }); return o; };
return S.lastDone && part(S.lastDone) === part(id) ? id : null;
};
})();
(function () { var sw = gsSpawnWave; gsSpawnWave = function (C, P, n, boss) { if (boss && C && C.spar)
n = 0; return sw.call(this, C, P, n, boss); }; })();
function gdPlayed(id) { var S = gsGet(), am = S.am || {}; if (id)
return am[id] || 0; return Object.keys(am).reduce(function (s, k) { return s + am[k]; }, 0); }
(function () {
var lg = frLogCard;
frLogCard = function () {
var r = lg.apply(this, arguments);
try {
var c = WLD.card;
if (!c)
return r;
var S = gsGet(), t = gdPlayed();
if (!t)
return r;
var d = document.createElement("div");
d.style.cssText = "margin-top:4px;font-size:12px;opacity:.75";
d.textContent = "Played in the story so far: " + gsHrs(t) + (S.act ? " · this chapter " + gsHrs(gdPlayed(S.act.id)) : "") + ". (Only time you were playing counts.)";
c.appendChild(d);
}
catch (e) { }
return r;
};
})();
gdAddPlace("tullimar", { n: "The dealers' hollow", k: "camp", at: [40, 185], a: "A dip in the red scrub where nobody from town goes. Somebody camps here and does not want visitors." });
gdAddPlace("orr", { n: "The lower stacks", k: "ruin", at: [-40, 175], a: "The Archive's oldest memory, dug into the ground before the Orrem went quiet. Half of it is dark." });
GS_SCENES.r1_tug = { who: "Hesk Dunn, the fuel-tug's pilot", where: "On your comms, from the Concord's holding cell", start: "a", nodes: {
a: { t: "The face on your screen is grey with tiredness. \"You're the one who shot up my escort. Come to gloat?\"", o: [
["Who do you fuel for?", "b"], ["You'll talk, or the Concord hears you shot at them too.", "c", "r1_hard"], ["Are you all right? Anyone waiting for you?", "d", "r1_kind"]
] },
b: { t: "\"Raiders. You knew that. They pay in clean fuel-chits, and nobody else pays at all out here.\"", o: [["Who sells to them?", "e"], ["Anyone waiting for you at home?", "d", "r1_kind"]] },
c: { t: "He laughs, without any fun in it. \"They hear what they like. Fine. Fine.\"", o: [["Then talk. Who sells to them?", "e"]] },
d: { t: "That stops him. \"My girl. Veska. She races skiffs on Tullimar. The raiders hold my debts, and they know where she sleeps.\"", o: [["I'll look in on her.", "e", "r1_promise"], ["Then tell me who sells to them, and we end this.", "e"]] },
e: { t: "\"Ask the Tullik who sells to us. They know. Everybody on Tullimar knows and nobody says.\" He looks away. \"And if you see Veska, don't tell her where I am.\"",
ift: { r1_hard: "\"Ask the Tullik who sells to us. They know.\" He spits. \"Go on, then. Hero.\"" } }
} };
GS_SCENES.r1b_veska = { sex: "f", who: "Veska Dunn, skiff racer", where: "The racers' camp, Tullimar", start: "a", nodes: {
a: { t: "A young woman in a burned flight-suit is bent over a skiff engine. She does not look up. \"If you're from the raiders, the money's not ready. If you're not, go away.\"", o: [
["I'm not from the raiders. I met your father.", "b"], ["I'm looking for whoever sells to the raiders.", "c"]
] },
b: { t: "Now she looks up. \"Is he alive?\" ... \"Is he alive?\"", o: [["He's alive. The Concord has him. He asked me not to say where.", "d", "r1b_truth"], ["He's safe. That's all I can say.", "d"]] },
c: { t: "\"Then you're a fool, and you'll be a dead one by morning.\" She goes back to the engine.", o: [["Your father flew their fuel. I met him.", "b"]] },
d: { t: "She sits back on her heels. \"I don't trust off-worlders. Nobody here does. But a racer trusts anyone who can run the course.\" She nods at the ring of markers. \"Run it in time and I'll talk.\"",
ift: { r1b_truth: "She closes her eyes for a moment. \"Thank you for not lying.\" Then she nods at the ring of markers. \"But nobody here trusts an off-worlder till they've run the course. Run it in time, and I'll talk.\"" } }
} };
GS_SCENES.r1b_veska2 = { sex: "f", who: "Veska Dunn, skiff racer", where: "The racers' camp, Tullimar", start: "a", nodes: {
a: { t: "\"Huh. Not bad, for someone with no tail.\" She wipes her hands. \"So somebody cut my fuel line. You saw. Same as they did to Kel's skiff, and Kel paid up. That's how they say the debt is due.\"", o: [
["Who's they?", "b"], ["Who cut it?", "b"]
] },
b: { t: "\"A dealer. Never the same face. They meet the raiders at the crater shrine, with guards, when the second moon is up. The Matron knows. She won't say it out loud, but she knows.\"", o: [
["Then I'll ask the Matron.", "c"], ["Come with me. You know the ground.", "d"]
] },
c: { t: "\"Ask nicely. Matron Quillo-Tullik eats rude people for breakfast. Not really. Mostly.\"", set: "r1b_done" },
d: { t: "\"No. If I'm seen with you, they'll burn the camp. But here.\" She presses a small humming stone into your hand. \"A racer's token. Show it to the Matron. She'll know I sent you.\"", set: "r1b_token" }
} };
GS_SCENES.r2_guard = { sex: "m", who: "Brannoc, a dealer's guard", where: "The crater shrine, Tullimar", start: "a", nodes: {
a: { t: "One guard did not run. He sits on the shrine step with his hands open. \"I'm done. I'm not paid enough to die in a hole.\"", o: [
["Where did the dealer go?", "b"], ["Who pays you?", "c"]
] },
b: { t: "\"Their runner went off south, past the scrub, the second the shooting started. Carrying the books they didn't drop.\"", o: [["What's south?", "d"]] },
c: { t: "\"Whoever holds the books. That's the only rule. The books say who owes who, all across the Reach.\"", o: [["Where did the rest of the books go?", "b"]] },
d: { t: "\"A dip in the ground they call the hollow. The dealers camp there. Don't go in loud, they burn the pages if they hear you coming.\"", set: "r2_tip" }
} };
GS_SCENES.r2b_veska = { who: "Veska Dunn", where: "On your comms", start: "a", nodes: {
a: { t: "\"You found the hollow? And the wheel?\" A long breath on the line. \"Then the books can be read. My father's name is in them, isn't it.\"", o: [
["It is. And so are the people he owes.", "b"], ["I'll keep his name out of it if I can.", "c", "r2b_mercy"]
] },
b: { t: "\"Then make it count. Tullik numbers won't read them, mind. That's Orrem cipher. Only the machines on Orr can read Orrem numbers, and the machines don't talk.\"" },
c: { t: "Silence. Then, quietly: \"Nobody's ever said that to me. Thank you.\" A pause. \"It's Orrem cipher. Only the Orrem can read it. Try Orr.\"" }
} };
GS_SCENES.r3_ninth = { sex: "m", who: "Reader Ninth, of the Orrem", where: "Outside the Reading Hall, Orr", start: "a", nodes: {
a: { t: "A tall machine with a cracked face-plate turns toward you. Its voice is very quiet. \"YOU CARRY NUMBERS. THE ARCHIVE HAS READ THEM. I AM TO WALK YOU OUT.\"", o: [
["Why did the Orrem stop speaking?", "b"], ["What else is in the ledgers?", "c"]
] },
b: { t: "\"WE SPOKE A GREAT DEAL ONCE. THEN WE HEARD WHAT WE SAID BEING USED. SO WE STOPPED.\" A long pause. \"SOME OF US MISS IT.\"", o: [["What else is in the ledgers?", "c"]] },
c: { t: "\"A NAME THAT IS NOT A NAME. THE RAIDERS PAY SOMEONE THEY CALL THE BROKER. THE BROKER'S FIRST CONTRACT IS OLDER THAN THE RAIDERS. IT IS IN THE LOWER STACKS. NOBODY HAS WALKED THERE IN A LONG TIME.\"", set: "r3_broker" }
} };
GS_SCENES.r3b_61 = { sex: "m", who: "Sixty-One, an archive drone", where: "The lower stacks, Orr", start: "a", nodes: {
a: { t: "The drone plugs the mended core into its own chest. Its lamp flickers, then holds. \"I REMEMBER. A CONTRACT, SIGNED IN A FLEET THAT NO LONGER FLIES. A SHIP CALLED THE HOLLOW THRONE. A BROKER WHO SOLD IT FUEL FOR A HUNDRED YEARS.\"", o: [
["A hundred years? Who lives that long?", "b"], ["Where is the Broker now?", "c"]
] },
b: { t: "\"NO ONE. SO THE BROKER IS NOT ONE PERSON. IT IS A SEAT. SOMEONE SITS IN IT. THE LEDGERS SAY THE NEXT MEETING IS AT KETHRIN, THE BROWN DWARF.\"", o: [["Then I'll be at Kethrin.", "d"]] },
c: { t: "\"THE LEDGERS SAY THE NEXT MEETING IS AT KETHRIN, THE BROWN DWARF. A WING HIDES IN THE SHADOW OF HOON TO GUARD IT.\"", o: [["Then I'll go through Hoon.", "d"]] },
d: { t: "Sixty-One tilts its head, a very human thing for a drone to do. \"YOU WALKED ME HOME. I WILL WATCH THE LEDGERS FOR YOU. COME BACK AND I WILL TELL YOU WHAT I FIND.\"", set: "r3b_61" }
} };
GS_SCENES.r4_ilsa = { who: "A raider pilot, from a broken ship", where: "A weak hail from the wreck of the trap-ship", start: "a", nodes: {
a: { t: "The signal is mostly static. \"...anyone. Air's going. I was... I was told it was a meeting. Not a trap. Please.\"", o: [
["Hold on. I'm towing your pod to Maruondo.", "b", "r4_saved"], ["You shot at me five minutes ago.", "c"]
] },
b: { t: "\"...thank you. Thank you. My name's Ilsa. Ilsa Marn.\" The static closes over her voice. Your ship drags the pod down toward the blue world, and lets it go above the singing pier." },
c: { t: "\"I know. I know.\" A breath. \"I've a pod. I'll make it to Maruondo, maybe. If I do... I'll remember you didn't.\"", set: "r4_left" }
} };
GS_SCENES.r4b_ilsa = { sex: "f", who: "Ilsa Marn, once a raider", where: "The singing pier, Maruondo", start: "a", nodes: {
a: { t: "A woman with a bandaged arm is sitting at the end of the pier with her feet over the water. \"You came.\"",
ift: { r4_left: "A woman with a bandaged arm is sitting at the end of the pier. She looks at you for a long time. \"So you came after all. I got here on my own, no thanks to you.\"" }, o: [
["Who set the trap at Kethrin?", "b"], ["Are you hurt badly?", "c"]
] },
b: { t: "\"Our own chief. Grell Ashmouth. He sold the meeting to someone, and sold us with it. He wears a broken star now. He used to wear a Hrovan honour-mark, before they cast him out.\"", o: [["Where is he?", "d"]] },
c: { t: "\"I'll live. The Ondai found me. They don't ask questions, they just sing at you until you feel better.\" She almost smiles.", o: [["Who set the trap?", "b"]] },
d: { t: "\"Home. Skeldmar. Hiding among the people who threw him out, because nobody would look for him there.\" She stands. \"Grell's people know I'm alive. They'll come here. Get me to the dune farms and the Ondai will hide me.\"" }
} };
GS_SCENES.r4b_elder = { sex: "f", who: "Moana-Iri, a singer of the Ondai", where: "The dune farms, Maruondo", start: "a", nodes: {
a: { t: "An old Ondai woman takes Ilsa's hands and hums one low note. \"She is a guest. Guests are not asked what they did before.\" She turns to you. \"And you are the one who brings guests. What do you bring next?\"", o: [
["Grell Ashmouth's head, if I can.", "b", "r4b_hard"], ["An end to the raiders' trail.", "c"]
] },
b: { t: "\"Heads are heavy. Bring him to the Hrovan instead. Shame is lighter, and lasts longer.\"" },
c: { t: "\"Then go to Skeldmar with this song in your ears.\" She hums again, and somehow the walk to your ship feels shorter." }
} };
GS_SCENES.r5_sigrun = { sex: "f", who: "Sigrun, a Hrovan captain", where: "The long hall, Skeldmar", start: "a", nodes: {
a: { t: "A tall woman with ash in her braids blocks your way out of the hall. \"An off-worlder ended our shame. Do you know how that feels, to a Hrovan?\"", o: [
["I didn't do it to shame you.", "b"], ["Better me than no one.", "c", "r5_proud"]
] },
b: { t: "\"I know. That is the worst part.\" She steps aside. \"Grell said a word before you took him. Hollow. I have heard it before, in the dark between stars. Be careful who you say it to.\"", set: "r5_sigrun" },
c: { t: "Her jaw tightens. \"Maybe. Grell said a word, before you took him. Hollow. Some of us have heard it before.\" She does not step aside; you go round her.", set: "r5_sigrun" }
} };
GS_SCENES.r5b_word = { sex: "m", who: "Old Haskel, skald of the long hall", where: "The long hall, Skeldmar", start: "a", nodes: {
a: { t: "The old skald does not stop tuning his harp. \"Hollow. Yes. My grandmother sang about them. A fleet that ate its own name, so no one could ever call it to account.\"", o: [
["What happened to them?", "b"], ["Who would know more?", "c"]
] },
b: { t: "\"The Wardens beat them. The Wardens beat everyone, once. And then the Wardens went quiet too, and the songs stopped.\"", o: [["Who would know more?", "c"]] },
c: { t: "\"Old Mother Ilvane, on Sereth Vale, in Corvanne. She knew the Wardens. Some say she was one.\" He plucks one string. \"Some say she still is.\"", set: "r5b_ilvane" }
} };
GS_CLUES.r1b_skiff = [
{ n: "A cut fuel line", t: "Veska's fuel line has been cut cleanly with a hot blade, not frayed. Somebody did this on purpose." },
{ n: "Boot prints", t: "Heavy boots, not a Tullik's soft three-toed feet. They come from the scrub and go back to it." },
{ n: "A dropped fuel-chit", t: "A raider fuel-chit, marked with a broken star and a number. The same mark as on the escort ships at the comet." },
{ n: "A warning scratched on the skiff", t: "Scratched into the hull: \"PAY BY THE SECOND MOON\". The letters are neat. Whoever wrote this has done it before." }
];
GS_CLUES.r2b_camp = [
{ n: "A burned book", t: "A ledger, mostly ash. The pages that are left are full of Orrem numbers, the same cipher as the ones you carry." },
{ n: "A tally board", t: "Names chalked on a board: worlds, ships, amounts. Tullimar, Veyar, Cinder. Someone has drawn a line through a ship called the Dunn's Lark." },
{ n: "A cipher wheel, broken", t: "Brass rings in pieces in the dirt. This is how the dealers read their own books. With it mended, the Orrem would not need to guess." },
{ n: "A sealed letter", t: "\"Kethrin, when Hoon's shadow is longest. Bring the books. The Broker will be there himself.\" No name at the bottom: only a broken star." },
{ n: "A bedroll, still warm", t: "Someone left in a hurry. A child's drawing of a skiff is tucked under the pillow. Even dealers have someone waiting." }
];
GS_CLUES.r3b_stacks = [
{ n: "A fallen shelf", t: "Memory-plates spilled across the floor, each one stamped with a date older than the Concord." },
{ n: "Scorch marks", t: "Somebody cut in here with a torch, not long ago. They were looking for one plate in particular." },
{ n: "A contract plate", t: "The plate the cutters missed: a contract between \"the Throne\" and \"the Broker\", for fuel, a hundred years running. The seal is a broken star." },
{ n: "A dead drone", t: "An archive drone, older than Sixty-One, still standing at its post. Its core is cracked. Sixty-One goes very still beside it." }
];
GS_CLUES.r4b_pod = [
{ n: "A life-pod", t: "A battered raider life-pod, washed up against the pier posts. The hatch has been opened from inside." },
{ n: "Bloody bandage", t: "A strip of flight-suit, torn for a bandage. Whoever was in the pod is hurt, but walking." },
{ n: "Ondai footprints", t: "Wide, webbed prints in the wet sand, two sets, carrying something between them. The Ondai found the pilot first." }
];
GS_CLUES.r5b_camp = [
{ n: "A hidden cot", t: "A bed under the cliff, out of the wind. Grell slept here, below the very watchtower the Hrovan use to look for enemies." },
{ n: "Ash-blackened mark", t: "Grell's old honour-mark, scraped and burned. You can still make out a Hrovan ship and a star." },
{ n: "A letter in a strange hand", t: "\"The Hollow keep their word. Serve and you will never be cast out again.\" The paper is cold to touch, colder than the night." },
{ n: "Ember-glass", t: "A splinter of dark glass that glows like a coal. It makes your teeth ache to hold it." }
];
GS_MAKE.r2b_wheel = { n: "The cipher wheel", parts: ["the hub pin", "the inner ring", "the middle ring", "the outer ring", "the locking cap"],
hint: "A cipher wheel goes together from the middle out: the hub first, the rings smallest to largest, and the cap to hold them.", done: "The rings turn smoothly. The Orrem will read these books in an hour instead of a week." };
GS_MAKE.r3b_core = { n: "The memory-core", parts: ["the cracked casing", "the copper thread", "the light-glass", "the seal"],
hint: "Sixty-One talks you through it: open the casing, run the thread, set the glass on the thread so it can carry light, then seal it.", done: "The core warms in your hands. A soft hum: something inside it is remembering." };
GS_MAKE.r5b_mark = { n: "The honour-mark", parts: ["the iron plate", "the ship", "the star", "the oath-line"],
hint: "Kaldra's smith shows you: a Hrovan mark is the plate, then the ship that carried you, then the star you swore by, and last the line of the oath.", done: "The mark is whole again. Not Grell's any more: the Hrovan's." };
GS_WHO_SEX["Ilsa Marn"] = "f";
GS_ROBOT["Reader Ninth, of the Orrem"] = 0x6A707C;
GS_ROBOT["Sixty-One, an archive drone"] = 0x8A7A5A;
GS_ROBOT["Sixty-One"] = 0x8A7A5A;
GS_WHO_SEX["the dealer's runner"] = "m";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("r1", [["call", "r1_tug", "Hear what the fuel-tug's pilot will say"]]);
GS_CH.r1b = { n: "The pilot's daughter", f: "raider", say: "The fuel-tug's pilot has a daughter who races skiffs on Tullimar, and the raiders hold his debts.", steps: [
["land", "tullimar", "Fly to Tullimar"],
["scene", "tullimar", 0, "r1b_veska", "Find Veska Dunn at the racers' camp"],
["race", "tullimar", 0, 8, 45, "Run the racers' course round the camp in time"],
["search", "tullimar", 0, "r1b_skiff", "Look over Veska's skiff: somebody wrecked it"],
["scene", "tullimar", 0, "r1b_veska2", "Tell Veska what you found"]
],
end: "Veska's skiff is still broken, but she is not afraid any more. \"Ask the Matron,\" she says. \"Tell her a racer sent you.\"" };
add("r2", [["scene", "tullimar", 1, "r2_guard", "Question the dealer's guard who stayed behind"]]);
GS_CH.r2b = { n: "Burned pages", f: "raider", say: "The dealer's runner got away with the rest of the books, and the dealers burn their pages when they hear trouble.", steps: [
["follow", "tullimar", 1, "The dealers' hollow", "the dealer's runner", "Follow the dealer's runner without being seen"],
["foes", "tullimar", "The dealers' hollow", 5, "The dealers' camp: break it up before they burn everything"],
["search", "tullimar", "The dealers' hollow", "r2b_camp", "Search the dealers' camp"],
["make", "tullimar", "The dealers' hollow", "r2b_wheel", "Mend the broken cipher wheel"],
["call", "r2b_veska", "Tell Veska what you found"]
],
end: "The books are in your hold, and a mended cipher wheel beside them. \"Orrem numbers,\" says a racer as you leave. \"Try Orr.\"" };
add("r3", [["scene", "orr", -1, "r3_ninth", "Reader Ninth will walk you out of the Reading Hall"]]);
GS_CH.r3b = { n: "The lower stacks", f: "raider", say: "The Broker's first contract is somewhere in the Archive's oldest memory, where nobody has walked in years.", steps: [
["escort", "orr", -1, "The lower stacks", "Sixty-One, an archive drone", 4, "Walk Sixty-One down to the lower stacks"],
["search", "orr", "The lower stacks", "r3b_stacks", "Search the lower stacks"],
["hold", "orr", "The lower stacks", 2, "Raider salvagers want the stacks: hold them off"],
["make", "orr", "The lower stacks", "r3b_core", "Mend the damaged memory-core"],
["scene", "orr", "The lower stacks", "r3b_61", "Hear what the core remembers"]
],
end: "Sixty-One stays among the stacks, its lamp the only light for a hundred metres. \"Kethrin,\" it says. \"Through Hoon.\"" };
add("r4", [["call", "r4_ilsa", "Answer the weak hail from the wreck of the trap-ship"]]);
GS_CH.r4b = { n: "Survivors on Maruondo", f: "raider", say: "Someone from the trap-ship lived, and came down on Maruondo, where the Ondai sing to the sea.", steps: [
["land", "maruondo", "Fly to Maruondo"],
["search", "maruondo", 1, "r4b_pod", "Look for the life-pod at the singing pier"],
["scene", "maruondo", 1, "r4b_ilsa", "Find the pilot who lived"],
["escort", "maruondo", 1, 0, "Ilsa Marn", 5, "Get Ilsa Marn safely to the dune farms"],
["scene", "maruondo", 0, "r4b_elder", "Speak with the Ondai singer who takes her in"]
],
end: "Behind you, the Ondai are singing Ilsa to sleep. Ahead, Skeldmar, and Grell Ashmouth." };
add("r5", [["scene", "skeldmar", 0, "r5_sigrun", "A Hrovan captain is waiting for you in the long hall"]]);
GS_CH.r5b = { n: "The scratched mark", f: "raider", say: "Grell is taken, but the shame he left is not mended yet, and nobody on Skeldmar will say the word he spoke.", steps: [
["search", "skeldmar", 1, "r5b_camp", "Search Grell's hiding place under the cliff watch"],
["make", "skeldmar", 0, "r5b_mark", "Mend the honour-mark Grell scratched out"],
["race", "skeldmar", 1, 9, 50, "Run the Ash Run round the cliff watch, the Hrovan way of closing a shame"],
["talk", "hrovan", "Give the mended mark to Kaldra"],
["scene", "skeldmar", 0, "r5b_word", "Ask the old skald what the word Hollow means"]
],
end: "The Hrovan hang the mended mark over the hall door. And the skald's words go with you: an old woman on Sereth Vale, in Corvanne, knows the word Hollow." };
GS_GATE[1] = ["r1", "r1b", "r2", "r2b", "r3", "r3b", "r4", "r4b", "r5", "r5b"];
})();
gdAddPlace("dunmarrow", { n: "The salt-road inn", k: "camp", at: [-185, 40], a: "Where the salt caravans stop before the long dry. Everyone drinks, nobody asks." });
GS_SCENES.i1_tam = { sex: "m", who: "Tam, Mother Ilvane's apprentice", where: "The Moonwell, Sereth Vale", start: "a", nodes: {
a: { t: "A thin young man with sap on his sleeves sits down beside you, uninvited. \"She sent you to listen. She sent me to listen too, four years ago. I'm still listening.\"", o: [
["What are you listening for?", "b"], ["Four years? Does she ever teach anything?", "c"]
] },
b: { t: "\"Whatever the trees say. Mostly it's rain. Lately it's...\" He frowns. \"Lately they've been afraid. Trees aren't meant to be afraid.\"", o: [["Afraid of what?", "d"]] },
c: { t: "He laughs. \"Everything. She just doesn't tell you she's doing it. Then one day you notice you can.\"", o: [["Can what?", "b"]] },
d: { t: "\"Cutters. Off-world ones. There's been smoke over the old cutters' camp, and the council won't talk about it. Be careful what you say to the council. Half of them want off-worlders gone. Including you.\"", set: "i1_tam" }
} };
GS_SCENES.i1b_council = { sex: "f", who: "Speaker Oaklen, of the grove council", where: "The seed-keepers' glade, Sereth Vale", start: "a", nodes: {
a: { t: "Five Sereth stand in a ring among the young trees. The eldest speaks without turning. \"Ilvane's off-worlder. The council did not ask for you.\"", o: [
["I'm here to help, if you'll let me.", "b"], ["Someone is cutting your trees again. I've seen the smoke.", "c", "i1b_blunt"]
] },
b: { t: "\"Help is what the cutters said, long ago.\" A murmur round the ring. \"Still. Ilvane trusts you, and Ilvane has been right more often than we have.\"", o: [["Then let me look at the old camp.", "d"]] },
c: { t: "The ring goes very still. \"You see a great deal for a guest.\" A pause. \"...Yes. Someone is. We had hoped it would stop on its own.\"", o: [["It won't. Let me look.", "d"]] },
d: { t: "\"Go, then. And if you find who cuts, do not kill them on our ground. Blood is bad for roots.\"", set: "i1b_leave" }
} };
GS_SCENES.i1b_council2 = { sex: "f", who: "Speaker Oaklen, of the grove council", where: "The seed-keepers' glade, Sereth Vale", start: "a", nodes: {
a: { t: "The council looks at the grafted sapling for a long time. Then the eldest puts her palm on its bark. \"It will live.\"", o: [
["The cutters were raiders, selling the wood to someone.", "b"], ["The trees are safe for now.", "c"]
] },
b: { t: "\"Selling living wood. To whom?\" She shakes her head. \"No, I know. To whoever burns it in black ships. Tam was right to be afraid.\"", o: [["Will the council help Ilvane now?", "d"]] },
c: { t: "\"For now is all anyone has.\" She almost smiles. \"You learned that faster than Tam.\"", o: [["Will the council help Ilvane now?", "d"]] },
d: { t: "\"The council will listen when Ilvane speaks. That is more than we gave her last year.\" She bows, very slightly. \"Thank you, guest.\"" }
} };
GS_SCENES.i2_scout = { who: "A scared voice", where: "On your comms, from inside the storm", start: "a", nodes: {
a: { t: "Through crackling static: \"...is anyone... I'm Wren, I'm from the Vale, I took Da's glider to see the storm and it pulled me in and now... the black ships went past me. They didn't see me. I think. I'm going down. I'm going...\"", o: [
["Wren! Where are you coming down?", "b"], ["Hold on. I'll find you.", "b"]
] },
b: { t: "\"...near the Moonwell, I think, I can see the water shining... \" The line goes dead." }
} };
GS_SCENES.i2b_mother = { sex: "f", who: "Hollin, Wren's mother", where: "The town, Sereth Vale", start: "a", nodes: {
a: { t: "A woman runs across the square and lifts Wren clean off the ground. Then she sets Wren down, holds the child at arm's length, and starts to shout.", o: [
["Go easy. Wren was very brave.", "b", "i2b_soft"], ["Wren saw the Hollow ships up close.", "c"]
] },
b: { t: "She stops. Breathes. \"Brave and stupid are the same thing at nine.\" She looks at you. \"Thank you. I don't have anything to give you. Only this.\" She presses a seed-keeper's ring into your hand.", o: [["Tell Ilvane what Wren saw.", "c"]] },
c: { t: "Wren pipes up: \"They had red wings, like coals, and the middle ship had no lights at all and it was so cold, Ma, even in the glider.\" Hollin goes pale. \"I'll take Wren to Ilvane myself. Now.\"" }
} };
GS_SCENES.i3_ilvane = { sex: "f", who: "Mother Ilvane", where: "On your comms", start: "a", nodes: {
a: { t: "\"The Dunfolk buried it? Good.\" A long breath. \"But ember-glass does not dig itself up and walk to the Hollow. Someone on Dunmarrow is selling it.\"", o: [
["The caravans would know.", "b"], ["Who would sell something like that?", "c"]
] },
b: { t: "\"They would. Ask on the salt road. Ask carefully. Caravan folk like to be paid in stories, not threats.\"", set: "i3_road" },
c: { t: "\"Someone hungry. Someone owed. Someone afraid.\" A pause. \"Usually all three. Ask on the salt road.\"", set: "i3_road" }
} };
GS_SCENES.i3b_kessa = { sex: "f", who: "Kessa, caravan-master", where: "The caravan rest at Sef, Dunmarrow", start: "a", nodes: {
a: { t: "A woman with a face like old leather is checking a water-beast's hooves. \"You're Ilvane's. I heard. You want the salt road? Then walk it.\"", o: [
["I'm looking for whoever sells ember-glass.", "b"], ["Walk it with you?", "c"]
] },
b: { t: "She spits in the sand. \"So am I. One of my drivers bought a piece. Now he's afraid of the dark and won't say why.\"", o: [["Then let me help you.", "c"]] },
c: { t: "\"Take Pim to the inn. He's carrying my water, and there's people on this road who'd kill him for it. Get him there and I'll tell you who's selling.\"", set: "i3b_bessa" }
} };
GS_SCENES.i3b_seller = { sex: "m", who: "Dov, the glass-seller", where: "The salt pans, Dunmarrow", start: "a", nodes: {
a: { t: "The glass-seller sits in the salt with his hands over his head. He is younger than you expected. \"Don't. Please. I only dig it. I don't even know what it's for.\"", o: [
["You know exactly what it's for.", "b", "i3b_hard"], ["Who buys it from you?", "c"]
] },
b: { t: "\"...Yes. All right. Yes. They make blades. Red blades. And they pay in water, and my family is thirsty.\"", o: [["Who buys it?", "c"]] },
c: { t: "\"A woman in black with a voice like ice. She comes on the third night of every dark moon. She said...\" He swallows. \"She said there's more glass in the buried ship. Deeper. Something the Wardens left there.\"", o: [
["Go to the Dunfolk and tell them everything.", "d", "i3b_mercy"], ["You're coming to Sahra Duneborn.", "d"]
] },
d: { t: "He nods, shaking. You watch him walk toward town, and you think about thirst, and about who makes people thirsty." }
} };
GS_SCENES.i3c_sahra = { sex: "f", who: "Sahra Duneborn", where: "Dunmarrow", start: "a", nodes: {
a: { t: "Sahra listens to the beacon's message twice. Then she sits down very slowly. \"A Warden ship. Under our dunes all this time. Its crew died keeping the glass from someone.\"", o: [
["From the Hollow.", "b"], ["What will the Dunfolk do?", "c"]
] },
b: { t: "\"From the Hollow. A hundred years ago. And now they're back for it.\" She stands. \"Then we keep it from them too. That is the least we owe the dead.\"", o: [["Thank you.", "c"]] },
c: { t: "\"We bury it deeper. We post a watch. And you, Ilvane's one, you tell Ilvane her Order died here well.\"", set: "i3c_told" }
} };
GS_SCENES.i4b_ilvane = { sex: "f", who: "Mother Ilvane", where: "Sereth Vale, at evening", start: "a", nodes: {
a: { t: "Ilvane has made tea that tastes of bark and honey. She does not drink hers. \"Tomorrow you go to Teodric. Tonight, ask me one thing. One. I will tell you the truth.\"", o: [
["Were you a Warden?", "b"], ["What is the Hollow?", "c"], ["Why me?", "d"]
] },
b: { t: "\"I am a Warden. There is no 'were'. They told us to hide, when the Order fell quiet. I hid in trees. It turns out trees are good at waiting.\"", o: [["Thank you.", "e"]] },
c: { t: "\"A fleet that wanted to never be stopped. So they burned their names, and their pity, and kept only their anger. Anger is a very good fuel. It never runs out.\"", o: [["Thank you.", "e"]] },
d: { t: "She looks at you for a long time. \"Because you came back for a child in a storm, when nobody asked you to. The Order is made of people who come back.\"", o: [["Thank you.", "e"]] },
e: { t: "\"Now. Before you sleep: the seed-keepers' rings. Run them. I want to see you move without thinking. Then go and look in the Moonwell, at night, and tell me what it shows you.\"" }
} };
GS_SCENES.i4b_vision = { sex: "f", who: "The Moonwell", where: "Sereth Vale, at night", start: "a", nodes: {
a: { t: "The water is perfectly still. In it, instead of your face: a black ship with no lights. A tall man in grey, his back to you. A voice you have never heard, saying a name you do not know. Vael. Then the water is only water.", o: [
["Go and tell Ilvane.", "b"]
] },
b: { t: "Ilvane is waiting by the well, as if she knew. When you say the name, she closes her eyes. \"So it is him. Go to Teodric. Go fast.\"", set: "i4b_vael" }
} };
GS_CLUES.i1b_cutters = [
{ n: "Fresh stumps", t: "Three young trees cut at the root, still weeping sap. Their tops have been dragged away toward the landing ground." },
{ n: "A cutter's saw", t: "A heavy plasma saw, off-world make, left in the moss. The grip is worn with use." },
{ n: "A tally of wood", t: "Scratched on a board: so many cords of living wood, so much paid, delivered \"to the black ships\". The hand is a raider's." },
{ n: "A sapling, cut but living", t: "One sapling has been cut cleanly and left. Its root is still alive. A seed-keeper might save it." }
];
GS_CLUES.i2b_wren = [
{ n: "A broken glider wing", t: "A child's glider wing, torn half through, caught in a fern. Someone landed hard." },
{ n: "Small footprints", t: "Little bare footprints going away from the water, then circling back. Lost, but walking." },
{ n: "A dropped scarf", t: "A bright woollen scarf, Sereth weave, left on a root as if to mark a trail." },
{ n: "A hiding place", t: "Under a root, a small voice: \"Are they gone? The black ships?\" Wren is cold and scared, but whole." }
];
GS_CLUES.i3b_inn = [
{ n: "A loose floorboard", t: "Under the board: a cloth wrapped round three pieces of ember-glass, still glowing. Someone hides stock here." },
{ n: "The innkeeper's book", t: "Room six, paid in water, for a week, by \"Dov\". Dov has paid for a lot of rooms this season." },
{ n: "A glove, too warm", t: "A digging glove that is warm to touch, though nobody has worn it for hours. Ember-glass does that." },
{ n: "A note under a cup", t: "\"Salt pans, at dusk. Bring all of it. She does not like waiting.\"" }
];
GS_CLUES.i3c_ship = [
{ n: "A Warden's sigil", t: "Under the sand on the hull plating: a star in a ring. The sign of the Order of the Quiet Star." },
{ n: "Sealed lockers", t: "Every locker in the hold is sealed from inside. The crew locked the ember-glass in with themselves." },
{ n: "A last log", t: "A scratched plate: \"They want what we carry. They will not have it. Tell Ilvane we held.\" The date is a hundred years ago." },
{ n: "The beacon", t: "A beacon box, cracked but whole. With its parts put right, it might still say what it was made to say." }
];
GS_CLUES.i4b_well = [
{ n: "The still water", t: "The Moonwell is so still it looks solid. The trees around it are silent, as if they are listening too." },
{ n: "Old offerings", t: "Seeds, rings, a child's drawing of a star. Generations of Sereth have left things here, asking." },
{ n: "A Warden's mark", t: "Cut into the stone rim, worn almost smooth: a star in a ring. Ilvane has knelt here before." }
];
GS_MAKE.i1b_graft = { n: "The graft", parts: ["the clean cut", "the living root", "the sapling", "the binding moss", "the seed-keeper's wax"],
hint: "Oaklen's seed-keepers show you: cut clean, find the living root, set the sapling on it, bind it with moss, seal it with wax.", done: "The sapling stands again on its own root. A seed-keeper hums to it." };
GS_MAKE.i3c_beacon = { n: "The beacon", parts: ["the power cell", "the crystal", "the coil", "the casing"],
hint: "Power first, then the crystal that holds the words, the coil that throws them, and the casing to close it.", done: "The beacon clicks, hums, and speaks in a dead Warden's voice: \"We held. We held. We held.\"" };
GS_MAKE.i4_lamp = { n: "A glasswing lamp", parts: ["the glass bell", "the wick of light", "the swarm's glow", "the stopper"],
hint: "Ilvane shows you: the bell, the wick inside it, the glasswings' light poured over the wick, and the stopper last so none spills.", done: "The lamp glows the soft green of the swarm. Hold it up, and the road of light through the Lantern shows." };
GS_WHO_SEX.Wren = "f";
GS_WHO_SEX["Pim, Kessa's water-carrier"] = "m";
GS_WHO_SEX["Dov, the glass-seller"] = "m";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("i1", [["scene", "sereth", 0, "i1_tam", "Ilvane's apprentice finds you at the Moonwell"]]);
GS_CH.i1b = { n: "The grove council", f: "raider", say: "Smoke over the old cutters' camp, and a grove council that would rather not talk about it.", steps: [
["scene", "sereth", 2, "i1b_council", "Speak to the grove council"],
["search", "sereth", 1, "i1b_cutters", "Search the old cutters' camp"],
["foes", "sereth", 1, 5, "The tree-cutters come back: drive them out without killing"],
["make", "sereth", 2, "i1b_graft", "Graft the cut sapling back on its root"],
["scene", "sereth", 2, "i1b_council2", "Tell the council what you found"]
],
end: "The council will listen to Ilvane now. And somewhere, black ships burn living wood." };
add("i2", [["call", "i2_scout", "A frightened voice comes through the storm on your comms"]]);
GS_CH.i2b = { n: "Lost in the storm", f: "hollow", say: "A child flew into Ormund's storm and came down near the Moonwell, with Hollow scouts close behind.", steps: [
["land", "sereth", "Fly back to Sereth Vale"],
["search", "sereth", 0, "i2b_wren", "Find Wren's trail round the Moonwell"],
["escort", "sereth", 0, -1, "Wren", 4, "Bring Wren home to town"],
["scene", "sereth", -1, "i2b_mother", "Wren's mother is waiting"],
["gather", "sereth", 0, 5, "storm-glass splinters", 0x9AC8FF]
],
end: "The storm-glass the Hollow scouts shed hums in your pack. Ilvane will want to see it." };
add("i3", [["call", "i3_ilvane", "Ilvane calls about the ember-glass"]]);
GS_CH.i3b = { n: "The salt road", f: "hollow", say: "Somebody on Dunmarrow is selling ember-glass to the Hollow, and the salt caravans know who.", steps: [
["scene", "dunmarrow", 1, "i3b_kessa", "Ask the caravan-master at Sef"],
["escort", "dunmarrow", 1, "The salt-road inn", "Pim, Kessa's water-carrier", 5, "Walk Kessa's water-carrier to the salt-road inn"],
["search", "dunmarrow", "The salt-road inn", "i3b_inn", "Search the inn for whoever sells ember-glass"],
["follow", "dunmarrow", "The salt-road inn", 3, "Dov, the glass-seller", "Follow the glass-seller at dusk"],
["foes", "dunmarrow", 3, 5, "The Hollow's buyers are waiting at the salt pans"],
["scene", "dunmarrow", 3, "i3b_seller", "Make the glass-seller talk"]
],
end: "The glass-seller's buyer said there is more in the buried ship. Something the Wardens left there." };
GS_CH.i3c = { n: "What the Wardens left", f: "hollow", say: "The buried ship on Dunmarrow is older than anyone guessed, and the Hollow are coming back for what is deep inside it.", steps: [
["visit", "dunmarrow", 2, "Go back to the buried ship"],
["search", "dunmarrow", 2, "i3c_ship", "Search the buried ship's hold"],
["hold", "dunmarrow", 2, 2, "The Hollow come for the hold: hold it"],
["make", "dunmarrow", 2, "i3c_beacon", "Mend the ship's old beacon"],
["scene", "dunmarrow", -1, "i3c_sahra", "Tell Sahra Duneborn what the beacon said"]
],
end: "The Dunfolk bury the Warden ship deeper, with honours. You carry its last words back to Ilvane." };
add("i4", [["make", "sereth", -1, "i4_lamp", "Build the glasswing lamp, as Ilvane shows you"]]);
GS_CH.i4b = { n: "Ilvane's last lesson", f: "raider", say: "Tomorrow you go to the Lantern. Tonight, Ilvane has one more thing to teach.", steps: [
["scene", "sereth", -1, "i4b_ilvane", "Sit with Ilvane one last evening"],
["race", "sereth", 2, 8, 45, "Run the seed-keepers' rings without thinking"],
["visit", "sereth", 0, "Go to the Moonwell at night"],
["search", "sereth", 0, "i4b_well", "Look into the Moonwell, as Ilvane told you"],
["scene", "sereth", 0, "i4b_vision", "What the Moonwell shows you"]
],
end: "Ilvane presses your hand. \"Go to Teodric. Tell him the name. He will know it.\"" };
GS_GATE[2] = ["i1", "i1b", "i2", "i2b", "i3", "i3b", "i3c", "i4", "i4b"];
})();
gdAddPlace("aster", { n: "The Order's library", k: "tower", at: [10, 185], a: "A round stone tower full of books nobody has read in a hundred years. The librarian has read all of them." });
GS_SCENES.n1_isolde = { sex: "f", who: "Isolde Marr, a novice", where: "Aster Still", start: "a", nodes: {
a: { t: "A novice your own age leans on a post, watching. \"So you're Ilvane's stray. Teodric's been waiting for you all week. He never waits for anyone.\"", o: [
["Is that a problem?", "b"], ["I'm only here to learn.", "c"]
] },
b: { t: "\"Only if you're slow.\" She pushes off the post. \"I'm Isolde. I've been here two years. I'll be a Warden before you, so don't get comfortable.\"", set: "n1_rival" },
c: { t: "She snorts. \"Everyone says that. Then they find out it's mostly sweeping.\" A pause. \"I'm Isolde. Welcome to the Order, I suppose.\"", set: "n1_friend" }
} };
GS_SCENES.n1b_corvin = { sex: "m", who: "Warden Corvin", where: "Aster Still", start: "a", nodes: {
a: { t: "Corvin is a broad man with burn-scarred hands and a laugh you can hear across the square. \"Novice! Good. The Order runs on chores. Fruit to pick, an old man to walk, and the Hermit's lamp has gone out again.\"", o: [
["When do I learn to fight?", "b"], ["Where do I start?", "c"]
] },
b: { t: "\"When you can carry an old man's basket without dropping his dignity.\" He grins. \"That's harder than fighting. Trust me.\"", o: [["Where do I start?", "c"]] },
c: { t: "\"The orchard. Windfall fruit, before the birds get it. Then Brother Aldo needs walking to the Hermit's cell, and the Hermit needs his lamp mended. Go on.\"" }
} };
GS_SCENES.n1b_hermit = { sex: "m", who: "The Hermit", where: "The Hermit's Cell, Aster Still", start: "a", nodes: {
a: { t: "The old Warden holds his hands up to the mended lamp. \"Warm. Good. You know why we keep a lamp out here, where nobody comes?\"", o: [
["So travellers can find the way?", "b"], ["No. Why?", "c"]
] },
b: { t: "\"That too.\" He smiles. \"But mostly so that whoever is sitting here in the dark is not sitting in the dark. Sometimes that is all the Order is.\"", o: [["I'll remember.", "d"]] },
c: { t: "\"So that whoever is sitting here is not sitting in the dark. A Warden is a lamp somebody else gets to sit by.\"", o: [["I'll remember.", "d"]] },
d: { t: "\"You won't. Not yet. One day you'll be the one in the dark, and then you will.\" He closes his eyes. \"Now let an old man sleep.\"" }
} };
GS_SCENES.n2b_isolde = { sex: "f", who: "Isolde Marr", where: "Aster Still", start: "a", nodes: {
a: { t: "Isolde catches your sleeve behind the training floors. She is not smiling. \"You've been to the ruins of the First House. Did you see the name-stones?\"",
ift: { n1_friend: "Isolde catches your sleeve behind the training floors. \"You were kind to me when you came. So I'm asking you, not Teodric. The ruins of the First House: did you see the name-stones?\"" }, o: [
["Some of them. Why?", "b"], ["What are name-stones?", "c"]
] },
b: { t: "\"My brother's is missing. Aren Marr. He was a novice here. Five years ago he left in the night and never came back, and someone took his stone out of the ruins.\"", o: [["I'll help you look.", "d"]] },
c: { t: "\"Every Warden who ever lived has a stone there. When a Warden dies, the stone goes dark. My brother Aren's stone is gone. Not dark. Gone.\"", o: [["I'll help you look.", "d"]] },
d: { t: "\"Thank you.\" She says it like it costs her something. \"Don't tell Teodric. He'd say a novice should leave the past alone.\"", set: "n2b_help" }
} };
GS_SCENES.n2b_isolde2 = { sex: "f", who: "Isolde Marr", where: "The ruins of the First House", start: "a", nodes: {
a: { t: "Isolde turns the cracked name-stone over and over. It still glows, faintly, the wrong colour: red, like a coal. \"He's alive. He's alive, and he's... this colour. What does that mean?\"", o: [
["I don't know. But we'll find out.", "b", "n2b_promise"], ["It might mean the Hollow.", "c"]
] },
b: { t: "\"We.\" She looks at you. \"All right. We.\" Then she wipes her face hard. \"Teodric says novices spar to clear their heads. Spar with me. At the Star-stone. Now.\"" },
c: { t: "Her face closes like a door. \"Don't. Don't say that.\" A breath. \"Spar with me. At the Star-stone. I need to hit something that isn't you.\"" }
} };
GS_SCENES.n3_brann = { sex: "m", who: "Brann, a young forge-guard", where: "The Old Anvil, Kharn", start: "a", nodes: {
a: { t: "A stocky young Kharn with a split lip stamps up to you. \"You held the Anvil. With me. I was the one on the left, getting hit.\"", o: [
["You held well.", "b"], ["You were getting hit a lot.", "c"]
] },
b: { t: "His chest swells. \"I did. I'll be Forge-Captain one day. Then I'll owe you a debt, and a Kharn always pays.\"", set: "n3_brann" },
c: { t: "He laughs, which hurts his lip. \"I was! I'll be Forge-Captain one day anyway. And a Kharn always remembers who held beside him.\"", set: "n3_brann" }
} };
GS_SCENES.n3b_durra = { sex: "f", who: "Forge-Mother Durra", where: "Kharn's Anvil", start: "a", nodes: {
a: { t: "Durra is twice your width and three times your weight. \"Wardens used to come to Kharn for their hilt-rings. Then they stopped coming. Now you. Want a hilt-ring?\"", o: [
["Yes. What do I need?", "b"], ["Why did they stop coming?", "c"]
] },
b: { t: "\"Star-iron, cut by your own hand at Slag Rise. Then you forge it here, at the Great Forge, the way I say. And then you run Hammer-watch's rings in Kharn's pull, so I know you can carry what you make.\"" },
c: { t: "\"They stopped coming anywhere. Went quiet. Like the Orrem.\" She spits into the forge, which hisses. \"Now: star-iron, cut by your own hand at Slag Rise, forged here, and then Hammer-watch's rings in Kharn's pull. Go.\"" }
} };
GS_SCENES.n3b_durra2 = { sex: "f", who: "Forge-Mother Durra", where: "Kharn's Anvil", start: "a", nodes: {
a: { t: "Durra turns the hilt-ring in her thick fingers. Then she bites it. \"Good iron. Bad shape. Good enough.\" She tosses it back. \"Take it to Corvin. He'll know what to do with it.\"", o: [
["Thank you, Forge-Mother.", "b"]
] },
b: { t: "\"Don't thank me. Come back with a blade and a fleet, when the Hollow come. Kharn remembers who comes back.\"" }
} };
GS_SCENES.n4_teodric = { sex: "m", who: "Elder Warden Teodric", where: "On your comms, from Aster Still", start: "a", nodes: {
a: { t: "Teodric's voice is dry and very calm. \"The outpost's lamp went out at the Lantern's heart. What did you feel, when it did?\"", o: [
["Sad.", "b"], ["Like something ended that should have.", "c"], ["Nothing. It was a lamp.", "d"]
] },
b: { t: "\"Good. A Warden who cannot be sad is a weapon. We do not make weapons.\" A pause. \"Come home. We keep a vigil tonight.\"" },
c: { t: "\"Yes. That is exactly it.\" Something in his voice softens. \"Come home. We keep a vigil tonight.\"" },
d: { t: "\"Hm.\" A long pause. \"Come home anyway. We keep a vigil tonight. Perhaps you will feel something then.\"" }
} };
GS_SCENES.n4b_vigil = { sex: "m", who: "Elder Warden Teodric", where: "The Star-stone, Aster Still", start: "a", nodes: {
a: { t: "The Wardens of Aster Still stand round the Star-stone in silence. There are fewer of them than you thought. Twelve. Teodric speaks the outpost-keeper's name, and then a long list of others.", o: [
["Who were they?", "b"], ["Say nothing. Keep the vigil.", "c", "n4b_quiet"]
] },
b: { t: "Corvin answers in a whisper: \"Wardens who died when the Hollow came the first time. Teodric says every name, every year. It takes most of the night.\" You stand with them until it is done." },
c: { t: "You stand with them until the last name is said. When it is over, Teodric looks at you, and nods once. From Teodric, that is a great deal." }
} };
GS_SCENES.n5_corvin = { sex: "m", who: "Warden Corvin", where: "Aster Still", start: "a", nodes: {
a: { t: "Corvin is sorting heart-shard fragments on his bench. \"Before I build you a blade, novice. Tell me. What is a blade for?\"", o: [
["For fighting the Hollow.", "b"], ["For protecting people.", "c"], ["For not having to use it.", "d", "n5_wise"]
] },
b: { t: "\"Hm. That's what Aren Marr said, five years ago.\" He puts a shard down very carefully. \"Ask Isolde about her brother some time. Then ask me again.\"" },
c: { t: "\"Better. Most people stop at the first answer. You stopped at the second.\"" },
d: { t: "Corvin goes very still. Then he laughs, a big laugh. \"Teodric will like you. I already do.\"" }
} };
GS_SCENES.n5b_keeper = { sex: "f", who: "Librarian Mott", where: "The Order's library", start: "a", nodes: {
a: { t: "A tiny old woman with ink to the elbows peers at you. \"Vael? The book of novices, the year of the long frost. It's... oh. Oh dear. The page is gone. Torn out. This morning, I think: the dust is still settling.\"", o: [
["Who's been in today?", "b"], ["What did the page say?", "c"]
] },
b: { t: "\"Only one person, in a grey hood. I thought it was a Warden. They went out toward the ruins, not ten minutes ago.\"", o: [["Then I'll follow.", "d"]] },
c: { t: "\"Vael was a novice here. A brilliant one. He taught the younger novices, until the year he left. He took three of them with him.\" She lowers her voice. \"One of them was Aren Marr.\"", o: [["Who's been in today?", "b"]] },
d: { t: "\"Go quietly. People in hoods don't like being followed.\"" }
} };
GS_SCENES.n5b_hood = { sex: "f", who: "The hooded figure", where: "The ruins of the First House", start: "a", nodes: {
a: { t: "The figure turns and pulls back the hood. It is Isolde, with the torn page in her fist. \"Don't. Don't tell Teodric. I had to know.\"", o: [
["Know what?", "b"], ["You should have told me.", "c", "n5b_hurt"]
] },
b: { t: "\"Vael taught my brother. Vael took my brother. And now you've seen Vael's name in the Moonwell.\" She holds out the page. \"Vael wasn't a raider. He was one of us. The Hollow isn't out there. It came from here.\"", o: [["We'll tell Teodric together.", "d"]] },
c: { t: "\"I know.\" She looks at the ground. \"I'm sorry. I thought you'd stop me.\" She holds out the page. \"Vael was a Warden. The Hollow came from here.\"", o: [["We'll tell Teodric together.", "d"]] },
d: { t: "Isolde nods, slowly. \"Together.\" On the way back, she walks closer to you than she ever has.", set: "n5b_isolde" }
} };
GS_CLUES.n2b_ruins = [
{ n: "A gap in the wall", t: "A row of name-stones set in the ruined wall, and one gap, the mortar fresh-scraped. Someone took a stone out, carefully." },
{ n: "Scratches on the floor", t: "Marks where something heavy was dragged toward the old cellar steps." },
{ n: "The cellar", t: "At the bottom of the steps, under a fallen beam: a name-stone. AREN MARR. It glows, faintly, red." },
{ n: "A hunter's knife", t: "A shard-hunter's knife, left behind. Whoever took the stone sold it, or tried to." }
];
GS_CLUES.n5b_lib = [
{ n: "The book of novices", t: "A huge book of every novice of the Order. The year of the long frost: a page torn out, the edge still sharp." },
{ n: "A teacher's notes", t: "In another book, in a careful hand: \"V. teaches the young ones far beyond their years. Teodric worries. I do not.\" Signed: Corvin." },
{ n: "A fallen grey thread", t: "A grey thread from a Warden's travelling cloak, caught on the shelf by the torn book." },
{ n: "Wet footprints", t: "Footprints in the dust, still damp from the orchard grass. Small feet. They go out toward the ruins." }
];
GS_MAKE.n1b_lamp = { n: "The star-lamp", parts: ["the oil", "the wick", "the glass", "the shade"],
hint: "Oil in the base first, then a new wick, the glass chimney over it, and the star-pierced shade last.", done: "The lamp glows. Little stars of light are scattered across the walls of the Hermit's cell." };
GS_MAKE.n3b_hilt = { n: "A hilt-ring of star-iron", parts: ["heat the iron", "fold it", "shape the ring", "quench it in oil"],
hint: "Durra watches with her arms folded: heat it, fold it, shape it round the mandrel, then quench it. In that order, or it shatters.", done: "A rough ring of dark star-iron, still warm. Your hands are blistered. Durra almost smiles." };
GS_MAKE.n4b_tree = { n: "A tree for the outpost's keeper", parts: ["dig the hole", "set the sapling", "the blossoms", "fill and water"],
hint: "Dig, set the sapling, lay the blossoms round its roots as the Wardens do, then fill and water.", done: "A new tree in the Orchard of Quiet. In a hundred years it will be as tall as the others." };
GS_WHO_SEX["Brother Aldo, the old orchard-keeper"] = "m";
GS_WHO_SEX["someone in a grey hood"] = "f";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("n1", [["scene", "aster", -1, "n1_isolde", "Another novice has been watching you"]]);
GS_CH.n1b = { n: "Chores of the Order", f: "raider", say: "The Order runs on chores. Corvin has a list.", steps: [
["scene", "aster", -1, "n1b_corvin", "Warden Corvin hands out the day's work"],
["gather", "aster", 2, 6, "windfall quiet-fruit", 0xF0E8FF],
["escort", "aster", 2, 0, "Brother Aldo, the old orchard-keeper", 3, "Walk old Brother Aldo to the Hermit's Cell"],
["make", "aster", 0, "n1b_lamp", "Mend the Hermit's star-lamp"],
["scene", "aster", 0, "n1b_hermit", "Sit with the Hermit while the lamp warms"]
],
end: "Your back aches and your hands smell of fruit. Corvin claps you on the shoulder. \"Now you're a novice.\"" };
add("n2", [["race", "aster", 3, 8, 45, "Isolde dares you: the Star-stone rings, faster than she ran them"]]);
GS_CH.n2b = { n: "The name-stones", f: "warden", spar: 1, say: "Isolde's brother left the Order five years ago, and somebody has taken his name-stone.", steps: [
["scene", "aster", -1, "n2b_isolde", "Isolde wants a word, away from Teodric"],
["search", "aster", 1, "n2b_ruins", "Search the ruins of the First House for Aren Marr's stone"],
["scene", "aster", 1, "n2b_isolde2", "Give Isolde what you found"],
["duel", "aster", 3, "Isolde Marr, novice", 180, "Spar with Isolde at the Star-stone"],
["visit", "aster", 2, "Walk with Isolde to the Orchard of Quiet"]
],
end: "Isolde puts the red-glowing stone in the orchard, under her brother's tree. \"Not dark,\" she says. \"Not yet.\"" };
add("n3", [["scene", "kharn", 1, "n3_brann", "A young forge-guard who held beside you wants a word"]]);
GS_CH.n3b = { n: "Kharn iron", f: "raider", say: "Wardens once came to Kharn for their hilt-rings. Durra will forge you one, if you can carry it.", steps: [
["scene", "kharn", -1, "n3b_durra", "Durra has a test for Wardens"],
["gather", "kharn", 0, 5, "star-iron ore", 0xD8E0E8],
["make", "kharn", -1, "n3b_hilt", "Forge your hilt-ring at the Great Forge"],
["race", "kharn", 2, 8, 60, "Run the Hammer-watch rings in Kharn's heavy pull"],
["scene", "kharn", -1, "n3b_durra2", "Show Durra the hilt-ring"]
],
end: "The hilt-ring hangs on a cord round your neck, heavy as a promise." };
add("n4", [["call", "n4_teodric", "Teodric calls: what did you feel?"]]);
GS_CH.n4b = { n: "The vigil", f: "hollow", say: "The Order keeps a vigil for its fallen, and Hollow watchers followed you home.", steps: [
["visit", "aster", 3, "Carry the outpost lamp's ash to the Star-stone"],
["hold", "aster", 3, 2, "Hollow watchers followed you down: hold the Star-stone"],
["scene", "aster", 3, "n4b_vigil", "Keep vigil with the Wardens for the fallen"],
["gather", "aster", 2, 4, "orchard blossoms", 0xFFE0F0],
["make", "aster", 2, "n4b_tree", "Plant a tree for the outpost's keeper"]
],
end: "Twelve Wardens, and one novice. The orchard has one more tree." };
add("n5", [["scene", "aster", -1, "n5_corvin", "Corvin asks what a blade is for"]]);
GS_CH.n5b = { n: "The torn page", f: "raider", say: "The Moonwell showed you the name Vael. The Order's library will know it.", steps: [
["visit", "aster", "The Order's library", "Go to the Order's library"],
["search", "aster", "The Order's library", "n5b_lib", "Search the library for the name Vael"],
["scene", "aster", "The Order's library", "n5b_keeper", "Ask the librarian"],
["follow", "aster", "The Order's library", 1, "someone in a grey hood", "Follow whoever took the page"],
["scene", "aster", 1, "n5b_hood", "Face the one in the grey hood"]
],
end: "Teodric reads the torn page and is quiet for a long time. \"Then you know,\" he says at last. \"Build your blade. You will need it.\"" };
GS_GATE[3] = ["n1", "n1b", "n2", "n2b", "n3", "n3b", "n4", "n4b", "n5", "n5b"];
})();
gdAddPlace("isk", { n: "The winter camp", k: "camp", at: [-20, 190], a: "Where the Iskari bring their woolmoth herds in the deep cold. Smoke, hides, and a great deal of singing." });
GS_SCENES.a1_kolka = { sex: "m", who: "Kolka, an old Iskari hunter", where: "The hunters' camp, Isk", start: "a", nodes: {
a: { t: "An old hunter with frost in his beard does not look up from the fire. \"You read the crystals. Ulvra told me. I was a boy when that ship came down. I saw the Wardens.\"", o: [
["What happened to them?", "b"], ["What were they waiting for?", "c"]
] },
b: { t: "\"They walked out into the cold, three of them, and stood round the wreck all night so the black ships could not land. In the morning they were ice. The black ships went away.\"", o: [["What were they waiting for?", "c"]] },
c: { t: "\"Someone to come and finish it, they said. A Warden who would come back.\" He looks at you, at last. \"Took you long enough.\"" }
} };
GS_SCENES.a1b_ulvra = { sex: "f", who: "Herd-Chief Ulvra", where: "The winter camp, Isk", start: "a", nodes: {
a: { t: "Ulvra is standing among her woolmoths, great white shaggy beasts that will not stop shivering. \"They will not go to the far pasture by the ice caves. Something in the caves is singing, and it is not a song I know.\"", o: [
["The Hollow?", "b"], ["I'll go and listen.", "c"]
] },
b: { t: "\"Who else sings in the dark to frighten animals?\" She spits. \"If my herd does not eat this week, my people do not eat next week.\"", o: [["Then I'll take them past.", "c"]] },
c: { t: "\"Siku will lead them. Walk with Siku. Acolytes are on the ice. And when you get there, find what is singing and stop it.\"", set: "a1b_siku" }
} };
GS_SCENES.a1b_ulvra2 = { sex: "f", who: "Herd-Chief Ulvra", where: "The winter camp, Isk", start: "a", nodes: {
a: { t: "The woolmoths are grazing in the far pasture, calm at last. Ulvra holds the broken sound-trap in her hands. \"A song made to frighten. They wanted the Iskari hungry. Hungry people sell anything.\"", o: [
["The Iskari won't sell.", "b"], ["What will you do now?", "c"]
] },
b: { t: "\"No.\" She almost smiles. \"Not now. You have made that easier.\"", o: [["What will you do now?", "c"]] },
c: { t: "\"Watch the sky. Thank the Wardens. And sing our own songs louder.\" Across the camp, someone starts a song, and the whole camp joins in." }
} };
GS_SCENES.a2_pilot = { sex: "f", who: "The Hollow pilot", where: "On your comms, from the Iskari ice-house", start: "a", nodes: {
a: { t: "\"They told me you would kill me. You pulled me out of the wreck instead.\" A long silence. \"My name is Neve. I want to talk. Not on comms. Come to the ice-house.\"", o: [
["I'll come.", "b"], ["Why should I trust you?", "c"]
] },
b: { t: "\"Thank you.\" The line clicks off." },
c: { t: "\"You shouldn't.\" Another silence. \"But I know who the Hollow have in the Senate. Come to the ice-house.\"" }
} };
GS_SCENES.a2b_neve = { sex: "f", who: "Neve, a Hollow pilot", where: "The ice-house, Isk", start: "a", nodes: {
a: { t: "Neve is young, with the Hollow's ember-scar on her neck, half healed. \"They'll come for me. The Hollow do not let anyone leave. Get me to the hunters' camp. The Iskari won't let anyone touch a guest.\"", o: [
["All right. Stay close to me.", "b"], ["Tell me about the Senate first.", "c"]
] },
b: { t: "\"I'll tell you there. I swear on... I don't have anything to swear on. I'll just tell you.\"" },
c: { t: "\"There. Not here. Walls have ears on Isk; they're made of ice.\" She manages a crooked smile." }
} };
GS_SCENES.a2b_neve2 = { sex: "f", who: "Neve, a Hollow pilot", where: "The hunters' camp, Isk", start: "a", nodes: {
a: { t: "By the fire Neve stops shaking. \"The Senate. There is a seat there that the Hollow paid for, long ago. Whoever sits in it hears everything the Concord plans, and sends it to Nharos.\"", o: [
["Whose seat?", "b"], ["Why did you leave the Hollow?", "c"]
] },
b: { t: "\"I don't know the name. Only the code they use: the Quiet Chair. And that their messages go through Aurelion's Sky Market, hidden in trade-songs.\"", o: [["Why did you leave?", "c"]] },
c: { t: "She touches the scar. \"They take your name. That's how you join: you give them your name, and they burn it. I wanted mine back.\" She looks at the fire. \"It was Neve. It is Neve.\"", set: "a2b_neve" }
} };
GS_SCENES.a3_ondessa = { sex: "f", who: "Healer Ondessa", where: "On your comms, from Ysolde", start: "a", nodes: {
a: { t: "\"One of the whales is hurt. A harpoon still in her side. She's come down to Ysolde's shallows to die, the way they do. I won't have it.\"", o: [
["What can I do?", "b"]
] },
b: { t: "\"Come down. The divers heard her song. And the hunters left their gear on the rafts when they ran: find out what poison they used, and I can mend her.\"" }
} };
GS_SCENES.a3b_diver = { sex: "m", who: "Tobin, a pearl-diver", where: "The pearl-divers' rafts, Ysolde", start: "a", nodes: {
a: { t: "A diver with webbed fingers and a sun-browned face is sitting very still, listening to the water. \"Hear that? Under the waves? That's her. She's singing slower every hour.\"", o: [
["Where are the hunters' things?", "b"], ["Can she be saved?", "c"]
] },
b: { t: "\"Thrown about the rafts. They left in a hurry when your ship came down. Mind the hooks.\"" },
c: { t: "\"If Ondessa says so, yes. Ondessa has never been wrong about a whale.\" He points. \"The hunters dropped their gear about the rafts. Find out what they used on her.\"" }
} };
GS_SCENES.a3b_whale = { who: "The star-whale", where: "Below Lantern Rock, Ysolde", start: "a", nodes: {
a: { t: "You lift the song-shell and blow. The note goes out across the water, low and long. For a while, nothing. Then the sea bulges, and a huge grey eye, bigger than you are, rises out of the water and looks at you.", o: [
["Stay still. Let Ondessa work.", "b"]
] },
b: { t: "Ondessa's divers slip into the water with the antidote. The whale shudders, then sighs, a sound like a wind through a canyon. When she goes, she goes slowly, singing. Tobin is crying and not ashamed of it." }
} };
GS_SCENES.a4b_ondessa = { sex: "f", who: "Healer Ondessa", where: "Ysolde", start: "a", nodes: {
a: { t: "\"You're good with whales. Let's see if you're good with people.\" Ondessa hands you a basket. \"Kelp from the rafts, a salve, and a diver who won't sit still long enough to be mended.\"", o: [
["What's wrong with the diver?", "b"], ["I'm no healer.", "c"]
] },
b: { t: "\"He saw the whale-hunters' faces. They know he did. He's more scared than hurt, and the scared ones never sit still.\"" },
c: { t: "\"Nobody is, the first day.\" She smiles. \"Kelp. Salve. Diver. Go.\"" }
} };
GS_SCENES.a4b_diver = { sex: "m", who: "Maru, a frightened diver", where: "The pearl-divers' rafts, Ysolde", start: "a", nodes: {
a: { t: "\"Don't, don't, it's fine, it's only a cut.\" It is not only a cut. You spread the salve, and he flinches, then goes quiet. \"They said they'd come back for me. The hunters. They said I talk too much.\"", o: [
["Then they'll find me here.", "b"], ["What did you see?", "c"]
] },
b: { t: "He stares at you. Then he laughs, shakily. \"Ondessa said you'd say something like that.\"" },
c: { t: "\"Ember marks on their necks. Like coals. They weren't hunters. They were Hollow, dressed as hunters.\" Out on the water, engines. \"...That's them. That's them coming.\"" }
} };
GS_SCENES.a5_amaranth = { sex: "f", who: "First Speaker Amaranth", where: "The Old Senate, Aurelion", start: "a", nodes: {
a: { t: "Amaranth walks you through the broken hall, where the Senate first sat. \"We keep it ruined so we remember we can fall. Somebody in the new Senate has forgotten.\"", o: [
["The Hollow call it the Quiet Chair.", "b", "a5_chair"], ["How do you know there is a leak?", "c"]
] },
b: { t: "She stops dead. \"Where did you hear that?\" ... \"From a Hollow pilot. Then it is real.\" She takes your arm. \"I have one lead. A clerk who sells secrets in the Sky Market. Start there.\"",
ift: {} },
c: { t: "\"Every plan we make, the Hollow know by morning. Every one.\" She rubs her eyes. \"I have one lead. A clerk who sells secrets in the Sky Market. Start there.\"" }
} };
GS_SCENES.a5b_oren = { sex: "m", who: "Oren Hask, a Senate clerk", where: "The Sky Market, Aurelion", start: "a", nodes: {
a: { t: "A neat little man in a clerk's grey coat is pretending to look at silks. \"You're the Speaker's Warden. Everybody knows. That makes you very bad for business.\"", o: [
["I'll pay for what you know.", "b"], ["Talk, or the Speaker hears your name.", "c", "a5b_hard"]
] },
b: { t: "\"Pay? Oh, how refreshing.\" He lowers his voice. \"Every evening a courier from the Senate comes through this market and leaves a song-box in the Hanging Gardens. I don't know who for. I never wanted to know.\"", o: [["Which courier?", "d"]] },
c: { t: "He goes white. \"No need for that. No need. Every evening a courier leaves a song-box in the Hanging Gardens. That's all. That's all I know.\"", o: [["Which courier?", "d"]] },
d: { t: "\"That one.\" He nods at a figure in Senate blue, just leaving the stall opposite. \"Don't let them see you. And don't tell anyone where you heard it.\"" }
} };
GS_SCENES.a5b_amaranth = { sex: "f", who: "First Speaker Amaranth", where: "The Old Senate, Aurelion", start: "a", nodes: {
a: { t: "Amaranth opens the song-box. Out comes a little tune, and under it, in a whisper, the whole of last night's war-council. She closes it. \"Every word. Every word.\"", o: [
["Who has access to the war-council?", "b"], ["What now?", "c"]
] },
b: { t: "\"Seven senators. Five clerks. And me.\" She laughs, without any fun in it. \"Even me, Warden. Even me.\"", o: [["What now?", "c"]] },
c: { t: "\"Now we find out whose seals have been used where they shouldn't. Quietly. And you, Warden: you trust nobody in blue.\"" }
} };
GS_CLUES.a1b_caves = [
{ n: "A strange hum", t: "The ice walls hum on one low note. Put your hand on them and your teeth ache." },
{ n: "Frightened tracks", t: "Woolmoth tracks that come in, stop dead, and run back out. Every one." },
{ n: "A black box", t: "A box of black metal set in a crack, warm to touch. The hum is loudest here. Hollow work." },
{ n: "Acolyte rations", t: "Hollow ration-packs, left in a pile. Someone has been coming back to keep the box running." }
];
GS_CLUES.a2b_neve = [
{ n: "A flight-glove", t: "Inside the cuff, a list of numbers written in ember-ink, glowing faintly. Codes." },
{ n: "A wrapped song-box", t: "A tiny music box of the kind they sell in Aurelion's Sky Market. It plays a trade-song, and under it, very quietly, a voice." },
{ n: "A burned name-tag", t: "Her pilot's tag, the name burned off. On the back, scratched small: NEVE." }
];
GS_CLUES.a3b_rafts = [
{ n: "A harpoon rack", t: "Empty harpoon racks, the kind whalers use. Too new to be honest whalers' kit." },
{ n: "A vial", t: "A cracked vial, the dregs smelling of copper and rot. Ondessa will know this poison: it is meant to make the whale sing slower, so the hunters can follow her." },
{ n: "Ember-marked rope", t: "Rope dyed with ember-red, the Hollow's colour. These were not whalers." },
{ n: "A song-shell", t: "A divers' song-shell, the kind that carries under water. With the right tuning it would call a whale." }
];
GS_CLUES.a4_temple = [
{ n: "Carved waves", t: "The walls are carved with waves, and among the waves, star-whales, swimming between worlds." },
{ n: "A Warden star", t: "In the middle of the carving, a star in a ring. The drowned people knew the Wardens." },
{ n: "The temple-lights", t: "Little lamps that glow under water and never go out. The Hollow wanted these. They burn without fuel." }
];
GS_CLUES.a5b_garden = [
{ n: "A loose stone", t: "In a planter on the third terrace, a stone that is not quite settled. Under it, a hollow." },
{ n: "The song-box", t: "A music box, exactly like the one Neve carried. It plays a trade-song, and under it, a whisper." },
{ n: "A seal-print", t: "On the box's ribbon, a wax seal, smudged. A Senate seal. Whose, you cannot tell." }
];
GS_MAKE.a1b_trap = { n: "The Hollow sound-trap, taken apart", parts: ["the outer plate", "the hum-crystal", "the ember-cell", "the wire"],
hint: "Kolka's warning: open it, lift the crystal out before you touch the ember-cell, then the cell, and the wire last, or it screams.", done: "The hum stops. Somewhere behind you a woolmoth snorts, and then another, and then the herd begins to graze." };
GS_MAKE.a2b_decoder = { n: "A decoder for Hollow codes", parts: ["the frame", "Neve's code-strip", "the listening coil", "the song-box"],
hint: "A frame, the code-strip slotted in, a coil to listen with, and the song-box on top to play through it.", done: "The song-box plays, and through the decoder you hear the whisper under the tune: \"...the Quiet Chair sends greetings...\"" };
GS_MAKE.a3b_song = { n: "A tuned song-shell", parts: ["clean the shell", "the reed", "tune it low", "seal it with wax"],
hint: "Tobin shows you: clean it, fit the reed, tune it low as you can, seal it so the sea can't get in.", done: "The shell gives one long low note. Far out under the water, something answers." };
GS_MAKE.a4b_salve = { n: "Ondessa's kelp salve", parts: ["crush the kelp", "warm the oil", "stir in the kelp", "cool it in a shell"],
hint: "Crush, warm the oil, stir the kelp into it, cool it in a shell. Ondessa says never hurry the cooling.", done: "A green salve that smells of the sea. It stings, Ondessa says, which is how you know it works." };
GS_WHO_SEX["Siku, Ulvra's herd-leader"] = "f";
GS_WHO_SEX["Neve, a Hollow pilot"] = "f";
GS_WHO_SEX["a Senate courier"] = "m";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("a1", [["scene", "isk", 1, "a1_kolka", "An old hunter saw the Wardens die"]]);
GS_CH.a1b = { n: "The singing in the ice", f: "hollow", say: "Something in Isk's ice caves is singing, and the Iskari herds will not go near their pastures.", steps: [
["scene", "isk", "The winter camp", "a1b_ulvra", "Ulvra's herd will not go to the far pasture"],
["escort", "isk", "The winter camp", 2, "Siku, Ulvra's herd-leader", 5, "Walk Siku and the herd past the acolytes to the ice caves"],
["search", "isk", 2, "a1b_caves", "Find what is singing in the ice caves"],
["make", "isk", 2, "a1b_trap", "Take the Hollow's sound-trap apart, safely"],
["scene", "isk", "The winter camp", "a1b_ulvra2", "Tell Ulvra the pasture is clear"]
],
end: "The Iskari sing all night. Ulvra counts you one of the camp, which she has never said to an off-worlder." };
add("a2", [["call", "a2_pilot", "The Hollow pilot you pulled from the wreck wants to talk"]]);
GS_CH.a2b = { n: "Neve", f: "hollow", say: "A Hollow pilot wants out, and knows who the Hollow have in the Senate.", steps: [
["scene", "isk", -1, "a2b_neve", "Visit the Hollow pilot in the ice-house"],
["escort", "isk", -1, 1, "Neve, a Hollow pilot", 4, "Get Neve to the hunters' camp, where the Iskari will guard her"],
["search", "isk", 1, "a2b_neve", "Look through Neve's flight-kit"],
["make", "isk", 1, "a2b_decoder", "Build a decoder from Neve's codes"],
["scene", "isk", 1, "a2b_neve2", "Ask Neve about the Senate"]
],
end: "The Quiet Chair. Trade-songs in the Sky Market. You have a name for the leak now, if not a face." };
add("a3", [["call", "a3_ondessa", "Healer Ondessa calls: one of the whales is hurt"]]);
GS_CH.a3b = { n: "Whale-song", f: "raider", say: "A star-whale with a harpoon in her side has come down to Ysolde's shallows to die. Ondessa will not allow it.", steps: [
["land", "ysolde", "Fly to Ysolde"],
["scene", "ysolde", 1, "a3b_diver", "Find the diver who heard her song"],
["search", "ysolde", 1, "a3b_rafts", "Look through the hunters' gear on the rafts"],
["make", "ysolde", 1, "a3b_song", "Tune a song-shell to call the whale"],
["scene", "ysolde", 0, "a3b_whale", "Call the whale from Lantern Rock"]
],
end: "The whale lives. Ondessa says she will remember your song for a hundred years. \"They have long memories,\" she says. \"And no sense of tune.\"" };
add("a4", [["search", "ysolde", 2, "a4_temple", "Read the drowned temple's walls"]]);
GS_CH.a4b = { n: "Ondessa's rounds", f: "hollow", say: "Ondessa wants a helper on her rounds, and a diver who saw too much needs mending and guarding.", steps: [
["scene", "ysolde", -1, "a4b_ondessa", "Ondessa needs a helper on her rounds"],
["gather", "ysolde", 1, 5, "healing kelp", 0x6AC88A],
["make", "ysolde", -1, "a4b_salve", "Mix the kelp salve"],
["scene", "ysolde", 1, "a4b_diver", "Tend the frightened diver at the rafts"],
["hold", "ysolde", 1, 2, "The false hunters come back for him: hold the rafts"]
],
end: "Maru sleeps at last. Ondessa sits with him, and does not ask you to leave, which is how you know you did well." };
add("a5", [["scene", "aurelion", 2, "a5_amaranth", "Walk with Amaranth through the Old Senate"]]);
GS_CH.a5b = { n: "Trade-songs", f: "hollow", say: "The Senate's secrets leave Aurelion hidden in trade-songs, through the Sky Market.", steps: [
["scene", "aurelion", 1, "a5b_oren", "Find the clerk who sells secrets in the Sky Market"],
["follow", "aurelion", 1, 0, "a Senate courier", "Follow the Senate courier without being seen"],
["search", "aurelion", 0, "a5b_garden", "Search the Hanging Gardens where the courier stopped"],
["foes", "aurelion", 0, 4, "Hollow agents come to collect the song-box"],
["scene", "aurelion", 2, "a5b_amaranth", "Bring the song-box to Amaranth"]
],
end: "Amaranth locks the song-box away. \"Seven senators,\" she says. \"Find me the one.\"" };
GS_GATE[4] = ["a1", "a1b", "a2", "a2b", "a3", "a3b", "a4", "a4b", "a5", "a5b"];
})();
GS_SCENES.s1_oren = { sex: "m", who: "Oren Hask, a Senate clerk", where: "The Old Senate, Aurelion", start: "a", nodes: {
a: { t: "Oren Hask is hiding behind a fallen pillar, shaking. \"They know. Someone knows I talked to you. There was a burned feather on my pillow this morning. That's how the Hollow say goodbye.\"", o: [
["The Speaker will protect you.", "b"], ["Then tell me everything, now.", "c"]
] },
b: { t: "\"Will she? Can she?\" He grips your sleeve. \"Seven senators sit on the war-council. Talk to them. Watch them. One of them will be too calm.\"", set: "s1_oren" },
c: { t: "\"I've told you everything! Seven senators sit on the war-council. One of them is the Quiet Chair. That's all I know. Please.\"", set: "s1_oren" }
} };
GS_SCENES.s1b_ysra = { sex: "f", who: "Senator Ysra Callow", where: "The Hanging Gardens, Aurelion", start: "a", nodes: {
a: { t: "A sharp-faced senator in green is pruning a rosebush with great violence. \"The Speaker's Warden. I suppose you think I'm the traitor. Everyone thinks the loud one is the traitor.\"", o: [
["Are you?", "b"], ["What do you think of the war-council?", "c"]
] },
b: { t: "\"No. I'm the one who wants the Hollow burned out of the sky, and gets told to be patient.\" Snip. \"Ask yourself who keeps telling us to be patient.\"", o: [["Who?", "d"]] },
c: { t: "\"Seven people who talk and talk while Nharos burns.\" Snip. \"One of them talks very gently. Always says wait. Always says the Hollow will tire.\"", o: [["Who?", "d"]] },
d: { t: "\"I'm not going to say a name to a stranger in a garden.\" She points the shears at you. \"Go and listen to them yourself.\"" }
} };
GS_SCENES.s1b_dorn = { sex: "m", who: "Senator Dorn Abbet", where: "The Sky Market, Aurelion", start: "a", nodes: {
a: { t: "A round, worried senator is buying sweets for a crowd of children. \"Ah! The Warden. Do you know, I haven't slept in a week? Every plan we make, gone by morning.\"", o: [
["Who do you suspect?", "b"], ["You look nervous.", "c"]
] },
b: { t: "\"Everyone and no one. Ysra wants war, which is what the Hollow want. Venn wants peace, which is what decent people want. I want to sleep.\"", o: [["Venn?", "d"]] },
c: { t: "\"I'm always nervous! I'm a senator!\" He laughs, then stops. \"Ysra wants war. Venn wants peace. And I want this to be over.\"", o: [["Venn?", "d"]] },
d: { t: "\"Malric Venn. Oldest of us. Wisest, people say. You'll find him in the Old Senate, he likes the quiet there.\" He hands you a sweet. \"For courage.\"" }
} };
GS_SCENES.s1b_venn = { sex: "m", who: "Senator Malric Venn", where: "The Old Senate, Aurelion", start: "a", nodes: {
a: { t: "A tall old man in grey sits alone among the ruins, perfectly still. When he speaks, his voice is very gentle. \"The Warden. I have been hoping to meet you. Sit, please.\"", o: [
["You like the quiet here.", "b"], ["Someone on the war-council is selling secrets.", "c"]
] },
b: { t: "\"I do. It reminds me how things fall. Slowly, and then all at once.\" He smiles. It does not reach his eyes. \"Patience, Warden. The Hollow will tire. Everything tires.\"", o: [["Will it?", "d"]] },
c: { t: "\"Yes. Terrible. Terrible.\" He folds his hands. \"But we must not tear ourselves apart looking. That is what they want. Patience.\"", o: [["Patience.", "d"]] },
d: { t: "He stands, and for a moment the room feels colder. \"Good day, Warden. Do give my regards to the First Speaker.\" He walks out without a sound.", set: "s1b_venn_met" }
} };
GS_SCENES.s1b_amaranth = { sex: "f", who: "First Speaker Amaranth", where: "On your comms", start: "a", nodes: {
a: { t: "\"Well? You've met them. Who would you watch?\"", o: [
["Ysra Callow. She wants war too much.", "b"], ["Dorn Abbet. He's too nervous.", "c"], ["Malric Venn. He's too calm.", "d", "s1b_venn"], ["I don't know yet.", "e"]
] },
b: { t: "\"Ysra is loud and angry and the most honest person I know.\" A sigh. \"But keep watching. You may be right and I may be wrong.\"" },
c: { t: "\"Dorn is nervous about breakfast.\" A tired laugh. \"But keep watching. Anyone can hide behind fear.\"" },
d: { t: "A very long silence. \"Malric has been in the Senate since before I was born. He taught me.\" Another silence. \"...Watch him. Quietly. And if you are wrong, I will never forgive you.\"" },
e: { t: "\"Good. A Warden who doesn't know is better than one who guesses.\" A pause. \"Keep watching.\"" }
} };
GS_SCENES.s2b_jory = { sex: "m", who: "Jory, the seal-maker's apprentice", where: "The Sky Market, Aurelion", start: "a", nodes: {
a: { t: "A boy of fifteen with ink-black fingers grabs your arm. \"You took my master. I'm next. Unless... unless I tell you first. That's how it works, right?\"", o: [
["That's how it works. Talk.", "b"], ["Nobody's taking you. What do you know?", "c", "s2b_kind"]
] },
b: { t: "\"Master made seals for someone who paid in Drifter tokens. But the order always came in a senator's hand. I saw the writing. I'd know it again.\"", o: [["Would you swear to that?", "d"]] },
c: { t: "He stares at you. Then the words fall out. \"The orders came in a senator's handwriting. Old-fashioned. Long tails on the letters. I'd know it again.\"", o: [["Would you swear to that?", "d"]] },
d: { t: "\"If I live long enough.\" He looks over his shoulder. \"There's moulds in the stall. Proof. Then get me to the Speaker's guards before the people in red hoods find me.\"" }
} };
GS_SCENES.s2b_amaranth = { sex: "f", who: "First Speaker Amaranth", where: "Aurelion", start: "a", nodes: {
a: { t: "Amaranth listens to Jory with her hands folded so tightly her knuckles are white. \"Long tails on the letters. Old-fashioned.\" She looks at you. \"I know three people who write like that.\"",
ift: { s1b_venn: "Amaranth listens to Jory with her hands folded so tightly her knuckles are white. \"Long tails on the letters.\" She does not look at you. \"Malric writes like that. So do two others.\"" }, o: [
["Then we need more than handwriting.", "b"]
] },
b: { t: "\"Yes. The Drifters took the tokens. Rook will know who spent them.\" She turns to the guards. \"Jory stays with me. Nobody touches him.\"" }
} };
GS_SCENES.s3_rook = { sex: "f", who: "Captain Rook", where: "The Driftward", start: "a", nodes: {
a: { t: "Rook is a lean woman with a captain's coat older than she is. \"Come on. You should see what you're asking us to fight for.\" She walks you along a deck of a dozen ships lashed together. Children everywhere. Laundry. Goats.", o: [
["How many live here?", "b"], ["Why do you help anyone?", "c"]
] },
b: { t: "\"Forty thousand, give or take. Nobody counts properly.\" She waves at a family cooking on a gun turret. \"No world would have us. So we made our own.\"" },
c: { t: "\"We don't. We trade. Sometimes the trade is: you help us, we help you.\" She grins. \"You'd be surprised how often it comes out the same.\"" }
} };
GS_SCENES.s3b_council = { sex: "m", who: "The Drifters' council", where: "The Driftward", start: "a", nodes: {
a: { t: "Twenty captains are shouting at once in a hall made from three cargo holds. Rook bangs a wrench on a pipe until they stop. \"The Warden wants to know who spent the tokens. Some of you know. Say it or don't.\"", o: [
["Whoever paid in those tokens paid the Hollow.", "b"], ["I'll trade for it. What do you need?", "c", "s3b_trade"]
] },
b: { t: "An old captain stands up. \"And what are the Hollow to us? They've never touched the Driftward.\" Rook: \"Yet, Hask. Yet.\" Muttering. \"Search the token-hold,\" Rook tells you. \"The tallies are there.\"" },
c: { t: "Laughter, then nods. A Drifter respects a trade. \"Mend our old star-chart and you can read the token-hold,\" says an old captain. \"Fair.\"" }
} };
GS_SCENES.s3b_rook = { sex: "f", who: "Captain Rook", where: "On your comms", start: "a", nodes: {
a: { t: "\"The tallies say the tokens came from one buyer, paying through three names. All three names are dead people. Clever.\" A pause. \"But the chart you mended shows where the payments went: a second spire, in the Shatterline.\"", o: [
["Thank you, Rook.", "b"]
] },
b: { t: "\"Don't thank me. Pay me back by winning.\" The line clicks. Then clicks again. \"And Warden? The council voted. If the Hollow come for the Driftward, you'll be the first we call.\"" }
} };
GS_SCENES.s4_sera = { sex: "f", who: "An unknown voice", where: "On your comms, from Nharos", start: "a", nodes: {
a: { t: "A woman's voice, very low. \"You read the second spire. They know it. My name is Sera Vant. I was Hollow. I am not now. If you want the rest of that seal read, come to Nharos.\"", o: [
["Why help me?", "b"], ["How do I know this isn't a trap?", "c"]
] },
b: { t: "\"Because I gave them my name once, and I want to make them pay for it.\"" },
c: { t: "\"You don't.\" A dry laugh. \"But the Iskari watched the spire for years. Ask them first, if you need to be sure.\"" }
} };
GS_SCENES.s4b_kolka = { sex: "m", who: "Kolka, an old Iskari hunter", where: "The hunters' camp, Isk", start: "a", nodes: {
a: { t: "Kolka is not surprised to see you. \"The spire in the sky. Yes. We watch it. We have watched it for nine winters. It blinks when the Senate sits.\"", o: [
["You've kept records?", "b"], ["Why didn't you tell anyone?", "c"]
] },
b: { t: "\"In the logbook at Aurora watch. Every blink, every night.\" He pokes the fire. \"Nobody ever asked to read it.\"" },
c: { t: "\"Who would we tell? The Concord never came to Isk until you.\" He shrugs. \"The logbook is at Aurora watch.\"" }
} };
GS_SCENES.s5_child = { sex: "f", who: "Pip, an Unhollowed child", where: "Nharos", start: "a", nodes: {
a: { t: "A small girl with an ember-scar on her cheek stands in your way. \"Are you Hollow?\"", o: [
["No. I'm a Warden.", "b"], ["I used to be afraid of them too.", "c"]
] },
b: { t: "\"Sera says Wardens are just stories.\" She looks you up and down. \"You're very short for a story.\"" },
c: { t: "\"I'm not afraid.\" A pause. \"I'm a bit afraid.\" She takes your hand without asking, and walks you all the way to Sera." }
} };
GS_SCENES.s5b_sera = { sex: "f", who: "Sera Vant", where: "Nharos", start: "a", nodes: {
a: { t: "Sera Vant has the eyes of someone who has not slept properly in years. \"You brought me a seal. I'll ask you for something back. Tavi is old. His son flew the Concord cutter that fell. Nobody has buried its crew.\"", o: [
["I'll go with him.", "b"], ["Isn't it dangerous out there?", "c"]
] },
b: { t: "\"Thank you.\" She does not say it easily. \"Hollow patrols watch the wreck. They like to see who mourns.\"" },
c: { t: "\"Everything on Nharos is dangerous. The Hollow watch the wreck to see who mourns. That's why nobody goes.\" She looks at you. \"You aren't nobody.\"" }
} };
GS_SCENES.s5b_tavi = { sex: "m", who: "Old Tavi", where: "The cutter that fell, Nharos", start: "a", nodes: {
a: { t: "Tavi kneels by the marker and puts his hand flat on the ash. He says a name, very quietly. Then six more. Then he stands, and he is crying, and he is smiling.", o: [
["Was he a good pilot?", "b"], ["Say nothing. Stay with him.", "c"]
] },
b: { t: "\"Terrible.\" Tavi laughs through the tears. \"Crashed everything. Crashed this too, in the end. But he came for us. He came for the Unhollowed when nobody else did.\"" },
c: { t: "You stand with him while the wind blows ash over the marker. When he is ready, he takes your arm for the walk home." }
} };
GS_CLUES.s1b_desk = [
{ n: "Ysra's bench", t: "Scratched notes all over the wood: battle plans, angry ones. Nothing hidden. Ysra hides nothing." },
{ n: "Dorn's bench", t: "Sweet-wrappers and a child's drawing of the Senate with everyone smiling. Under it, a list of orphanages he pays for." },
{ n: "Venn's bench", t: "Perfectly clean. Polished. Not a scrap. Except, caught in a crack: one grey feather, burned at the tip." }
];
GS_CLUES.s2b_stall = [
{ n: "Seal moulds", t: "Moulds for Senate seals, real ones, warm from recent use. Whoever ordered these could seal anything as the Senate." },
{ n: "An order slip", t: "\"Twelve seals, war-council grade.\" The handwriting is old-fashioned, with long tails on the letters." },
{ n: "Drifter tokens", t: "A little pile of Drifter tokens in the till, the payment. Each is stamped with a Drifter ship's mark." }
];
GS_CLUES.s3b_hold = [
{ n: "The token tally", t: "A great ledger of every token the Drifters have minted. One run of tokens all went to one buyer." },
{ n: "Three names", t: "The buyer used three names: a dead merchant, a dead pilot, and a dead senator's clerk. Clever." },
{ n: "The old star-chart", t: "A cracked star-chart in a brass frame. The Drifters mark every payment's road on it. If it were mended, it would show where the money went." }
];
GS_CLUES.s4b_watch = [
{ n: "The logbook", t: "Nine winters of careful marks: the spire blinked on every night the Senate's war-council sat, and on no other night." },
{ n: "A blink pattern", t: "The Iskari wrote the blinks down as dots and lines. It is a code, and it spells a letter, over and over: V." },
{ n: "A cracked lens", t: "The watchers' great lens, cracked by a Hollow bolt last winter. Mended, it could read the half-burned seal." }
];
GS_CLUES.s5b_cutter = [
{ n: "The flight-deck", t: "The cutter's controls, burned. The pilot steered it away from the Unhollowed camp before it hit." },
{ n: "Seven name-tags", t: "Seven crew tags, scattered in the ash. Tavi gathers each one carefully." },
{ n: "A last log", t: "\"Coming in to lift the Unhollowed out. Hollow on our tail. Tell Da...\" The log ends there." }
];
GS_MAKE.s3b_chart = { n: "The Drifters' star-chart", parts: ["the brass frame", "the glass plate", "the star-points", "the payment threads"],
hint: "Frame, glass, the stars set in their places, and last the silver threads that show each payment's road.", done: "The threads light up. Every payment from that buyer runs one way: into the Shatterline, past a broken Warden ship." };
GS_MAKE.s4b_lens = { n: "The watchers' lens", parts: ["the cracked glass", "the resin", "the brass ring", "the eyepiece"],
hint: "Set the glass, fill the crack with resin, clamp it in the ring, fit the eyepiece.", done: "Through the mended lens, the half-burned seal reads: \"M... V... nn\". Not enough for the Senate. Enough for you." };
GS_MAKE.s5b_marker = { n: "A grave-marker", parts: ["the post", "the crossbar", "the seven tags", "the Concord star"],
hint: "Tavi tells you how the Unhollowed do it: the post, the crossbar, the crew's tags hung on it, and the star of the ship they flew on top.", done: "The marker stands in the ash. The tags chime in the wind." };
GS_WHO_SEX["Jory, the seal-maker's apprentice"] = "m";
GS_WHO_SEX["Old Tavi, an Unhollowed elder"] = "m";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("s1", [["scene", "aurelion", 2, "s1_oren", "Oren Hask is hiding in the Old Senate"]]);
GS_CH.s1b = { n: "Seven senators", f: "raider", say: "Seven senators sit on the war-council. One of them is the Quiet Chair.", steps: [
["scene", "aurelion", 0, "s1b_ysra", "Meet Senator Ysra Callow in the Hanging Gardens"],
["scene", "aurelion", 1, "s1b_dorn", "Meet Senator Dorn Abbet at the Sky Market"],
["scene", "aurelion", 2, "s1b_venn", "Meet Senator Malric Venn in the Old Senate"],
["search", "aurelion", 2, "s1b_desk", "Look over the senators' benches"],
["call", "s1b_amaranth", "Tell Amaranth who you would watch"]
],
end: "Seven senators, three met, and one burned grey feather in your pocket." };
add("s2", [["call", "s2b_amaranth_pre", "Amaranth calls: the seal-maker had an apprentice"]]);
GS_SCENES.s2b_amaranth_pre = { sex: "f", who: "First Speaker Amaranth", where: "On your comms", start: "a", nodes: {
a: { t: "\"The seal-maker had an apprentice. A boy. He's run, and he's hiding in the Sky Market, and he's not the only one looking for him.\"", o: [["I'll find him first.", "b"]] },
b: { t: "\"Do. Before the people in red hoods do.\"" }
} };
GS_CH.s2b = { n: "The apprentice", f: "hollow", say: "The seal-maker's apprentice saw who ordered the seals, and the Hollow want him silenced.", steps: [
["land", "aurelion", "Fly to Aurelion"],
["scene", "aurelion", 1, "s2b_jory", "Find the seal-maker's apprentice in the Sky Market"],
["search", "aurelion", 1, "s2b_stall", "Search the seal-maker's stall"],
["escort", "aurelion", 1, -1, "Jory, the seal-maker's apprentice", 5, "Get Jory to the Speaker's guards"],
["scene", "aurelion", -1, "s2b_amaranth", "Jory tells Amaranth what he saw"]
],
end: "Jory is safe. The handwriting is old-fashioned, with long tails. And the tokens were Drifter tokens." };
add("s3", [["scene", "driftward", -1, "s3_rook", "Rook wants to show you the fleet"]]);
GS_CH.s3b = { n: "The Drifters' council", f: "raider", say: "Rook can show you who spent the tokens, but the Drifters' council must agree.", steps: [
["scene", "driftward", -1, "s3b_council", "Speak to the Drifters' council"],
["search", "driftward", -1, "s3b_hold", "Search the token-hold"],
["make", "driftward", -1, "s3b_chart", "Mend the Drifters' old star-chart"],
["waves", "wanderers", 2, "Hollow raiders come to burn the token-hold: drive them off"],
["call", "s3b_rook", "Hear what Rook found"]
],
end: "The Drifters vote to stand with you if the Hollow come. Nobody remembers the last time they all agreed on anything." };
add("s4", [["call", "s4_sera", "A voice from Nharos on your comms"]]);
GS_CH.s4b = { n: "The watchers on Isk", f: "hollow", say: "The Iskari have watched the second spire for years. They may have seen what it sends.", steps: [
["land", "isk", "Fly to Isk"],
["scene", "isk", 1, "s4b_kolka", "Ask Kolka about the spire in the sky"],
["search", "isk", 3, "s4b_watch", "Read the watchers' logbook at Aurora watch"],
["hold", "isk", 3, 2, "The Hollow come to silence the watchers: hold Aurora watch"],
["make", "isk", 3, "s4b_lens", "Mend the watchers' great lens"]
],
end: "M... V... nn. Enough for you. Not enough for the Senate. Sera Vant on Nharos can read the rest." };
add("s5", [["scene", "nharos", -1, "s5_child", "An Unhollowed child wants to know what you are"]]);
GS_CH.s5b = { n: "The cutter's crew", f: "hollow", say: "A Concord cutter fell on Nharos lifting out the Unhollowed. Nobody has buried its crew.", steps: [
["scene", "nharos", -1, "s5b_sera", "Sera Vant asks a favour"],
["escort", "nharos", -1, 3, "Old Tavi, an Unhollowed elder", 5, "Walk old Tavi to the cutter that fell"],
["search", "nharos", 3, "s5b_cutter", "Search the fallen cutter"],
["make", "nharos", 3, "s5b_marker", "Raise a grave-marker for its crew"],
["scene", "nharos", 3, "s5b_tavi", "Stand with Tavi at the graves"]
],
end: "The Unhollowed light a fire by the marker. Sera Vant says, \"Now. The traitor.\"" };
GS_GATE[5] = ["s1", "s1b", "s2", "s2b", "s3", "s3b", "s4", "s4b", "s5", "s5b"];
})();
gdAddPlace("nharos", { n: "The ember furnace", k: "mine", at: [-20, -190], a: "Where the Hollow melt ember-glass into blades. The heat can be felt a kilometre away." });
gdAddPlace("nharos", { n: "The ash-road camp", k: "camp", at: [40, 200], a: "The last camp before the Ashen Keep, in the lee of a black ridge." });
GS_SCENES.w1b_brann = { sex: "m", who: "Forge-Captain Brann", where: "Hammer-watch, Kharn", start: "a", nodes: {
a: { t: "The young forge-guard who held the Old Anvil beside you is Forge-Captain now, with a captain's iron collar. \"I said I would be. And I said a Kharn pays.\"",
ift: { n3_brann: "The young forge-guard who held the Old Anvil beside you is Forge-Captain now. He grins, split lip long healed. \"Told you. Forge-Captain. And a Kharn always pays.\"" }, o: [
["Then fly with me.", "b"], ["Durra already gave her oath.", "c"]
] },
b: { t: "\"Durra's oath is Kharn's. Mine is Hammer-watch's. Different ships.\" His face darkens. \"But someone's been fouling the star-iron at Slag Rise. Our blades crack. Find who, and Hammer-watch flies.\"" },
c: { t: "\"Durra's oath is Kharn's. Hammer-watch is mine.\" He folds his arms. \"Somebody's fouling the star-iron at Slag Rise. Find who, and Hammer-watch flies with you.\"" }
} };
GS_SCENES.w1b_brann2 = { sex: "m", who: "Forge-Captain Brann", where: "Hammer-watch, Kharn", start: "a", nodes: {
a: { t: "Brann tests the new oath-ring between his teeth, the way Durra does. \"Good iron.\" He slides it onto his thumb. \"Hammer-watch flies. Twelve forge-ships. And me, at the front, where I can get hit.\"" }
} };
GS_SCENES.w1c_isolde = { sex: "f", who: "Warden Isolde Marr", where: "Aster Still", start: "a", nodes: {
a: { t: "Isolde wears a Warden's grey now, and a blade at her hip. She hugs you, hard, then looks embarrassed about it. \"Teodric made me a Warden while you were away. He said you'd be annoyed I beat you.\"",
ift: { n1_rival: "Isolde wears a Warden's grey now. \"I told you I'd be a Warden before you.\" Then she grins, and hugs you anyway. \"I'm glad you're back.\"" }, o: [
["Congratulations, Warden.", "b"], ["Any news of Aren?", "c"]
] },
b: { t: "\"Thank you.\" Then her face goes hard. \"The Hollow are raiding the Order's novices. They know where we keep them. The orchard. Now.\"" },
c: { t: "\"His stone's still red.\" She swallows. \"He's alive, and he's on Nharos, I'm sure of it. But first: the Hollow are raiding the novices in the orchard. Now.\"" }
} };
GS_SCENES.w1c_isolde2 = { sex: "f", who: "Warden Isolde Marr", where: "The Star-stone, Aster Still", start: "a", nodes: {
a: { t: "The novices are safe. Isolde is bleeding from a cut on her arm and does not seem to notice. \"The Wardens of Aster Still will fly with you. All twelve. Thirteen, with me.\"", o: [
["Fourteen, with me.", "b"], ["Isolde. If we find Aren...", "c"]
] },
b: { t: "She laughs. \"Fourteen. The Hollow are doomed.\" She doesn't sound like she's joking, quite." },
c: { t: "\"I know.\" She holds your eyes. \"If we find him, let me be the one to speak to him first. Promise.\"", set: "w1c_promise" }
} };
GS_SCENES.w2b_sigrun = { sex: "f", who: "Sigrun Hollowsworn", where: "The long hall, Skeldmar", start: "a", nodes: {
a: { t: "Sigrun kneels in the long hall with her hands bound and her ember blade cold at your feet. The Hrovan wait for you to say what is done with her.",
ift: { r5_sigrun: "Sigrun kneels in the long hall, hands bound. She looks up at you. \"I told you to be careful who you said that word to. I should have listened to myself.\"" }, o: [
["Let the Hrovan judge her.", "b"], ["Let her fly with us, and earn her name back.", "c", "w2b_mercy"]
] },
b: { t: "Kaldra nods. \"She will sweep the long hall for ten years, and eat last. That is Hrovan justice.\" Sigrun bows her head. It is, you suspect, worse than death to a Hrovan." },
c: { t: "Silence. Then Kaldra laughs, a great roar. \"An off-worlder who knows the old law! Yes. Let her fly at the front, unarmoured, until she has a name again.\" Sigrun looks at you as if she has never seen you before." }
} };
GS_SCENES.w3b_ulvra = { sex: "f", who: "Herd-Chief Ulvra", where: "The winter camp, Isk", start: "a", nodes: {
a: { t: "\"The Iskari will ride with you. But not in ships. In the herds.\" Ulvra points at the sky, where woolmoths, vast as small ships, are circling. \"Our herds fly between the ice-moons. They will carry our riders to Nharos.\"", o: [
["Woolmoths can fly?", "b"], ["What do you need?", "c"]
] },
b: { t: "\"Only in the cold. And only when the herd trusts the rider.\" She looks at you. \"They trust you. They remember the singing in the caves.\"" },
c: { t: "\"The herd is scattered by Hollow fire. Run the herd-rings round the camp and call them in.\"" }
} };
GS_SCENES.w4b_rook = { sex: "f", who: "Captain Rook", where: "The Driftward", start: "a", nodes: {
a: { t: "\"Our ships are yours. All forty thousand of us, more or less.\" Rook hesitates, which you have never seen her do. \"But the old captains say the Driftward is our home, and homes don't fight.\"",
ift: { s3b_trade: "\"You traded with us fair when you didn't have to. The council remembers.\" Rook hesitates. \"But the old captains say homes don't fight.\"" }, o: [
["Then the Driftward stays. Lend me the fighting ships.", "b", "w4b_wise"], ["The Hollow will burn your home whether you fight or not.", "c"]
] },
b: { t: "Rook stares, then laughs. \"That's what I told them!\" She claps your shoulder. \"The gunships fly. The homes stay. Help me cut the gunships loose before the old captains change their minds.\"" },
c: { t: "\"I know. I told them.\" She sighs. \"Help me cut the gunships loose. The old captains will grumble, and then they'll cheer, because that's what Drifters do.\"" }
} };
GS_SCENES.w4c_ilsa = { sex: "f", who: "Ilsa Marn", where: "The dune farms, Maruondo", start: "a", nodes: {
a: { t: "Ilsa Marn has Ondai shell-beads in her hair now, and the scar on her arm has healed white. \"You came back. I wondered if you would.\"",
ift: { r4_left: "Ilsa Marn has Ondai shell-beads in her hair. She looks at you a long time. \"You left me once, at Kethrin. I lived anyway. And I've been thinking about whether to forgive you.\"" }, o: [
["The Hollow are going to Nharos. So are we.", "b"], ["I need pilots.", "c"]
] },
b: { t: "\"And you want the Ondai to sing for your fleet.\" She nods. \"They will. And you want a pilot who knows how raiders fly. Me.\" She grins. \"Ask the Ondai to bless my ship, and I'll come.\"" },
c: { t: "\"You need raider pilots, you mean. People who fly dirty.\" She grins. \"Ask the Ondai to bless my ship. Then I'm yours.\"" }
} };
GS_SCENES.w4c_elder = { sex: "f", who: "Elder Moana-Rhu", where: "The singing pier, Maruondo", start: "a", nodes: {
a: { t: "The eldest singer of the reef sings one long note over Ilsa's ship, and the hull shimmers. \"Now it knows the way home,\" she says. \"Every ship should.\" She turns to you. \"The Ondai cannot fight. But we can sing your fleet into the dark, so it is not afraid.\"", o: [
["That's enough. That's more than enough.", "b"]
] },
b: { t: "\"No,\" she says, smiling. \"Enough is when you come home.\"" }
} };
GS_SCENES.w4d_veska = { sex: "f", who: "Veska Dunn", where: "The racers' camp, Tullimar", start: "a", nodes: {
a: { t: "Veska has a new skiff, very fast and very ugly. \"Da's out of the Concord's cells. He flies a fuel-tug for the Matron now. Honest fuel.\" She looks at you. \"You did that.\"",
ift: { r1_promise: "Veska has a new skiff, very fast and very ugly. \"Da says you promised him you'd look in on me. Nobody keeps promises like that.\" She looks away. \"Thank you.\"" }, o: [
["The fleet needs fast scouts.", "b"], ["Would the racers fly for me?", "b"]
] },
b: { t: "\"Racers don't fly for anyone.\" She smirks. \"Racers race. Beat me round the course and every skiff on Tullimar races to Nharos behind you.\"" }
} };
GS_SCENES.w5b_teodric = { sex: "m", who: "Elder Warden Teodric", where: "The Star-stone, Aster Still", start: "a", nodes: {
a: { t: "Teodric has not left Aster Still in forty years. Today he is wearing travelling grey. \"Vael was my student,\" he says. \"I taught him everything he used to burn the Order. I am coming.\"", o: [
["You don't have to carry that.", "b"], ["Then come.", "c"]
] },
b: { t: "\"Of course I do. That is what being a teacher is.\" He almost smiles. \"But I would like help carrying it.\"" },
c: { t: "\"Good.\" He turns to the twelve. \"The Order flies. For the first time in a hundred years, the Order flies.\"" }
} };
GS_SCENES.w5c_61 = { sex: "m", who: "Sixty-One", where: "The lower stacks, Orr", start: "a", nodes: {
a: { t: "\"YOU CAME BACK. AS PROMISED.\" Sixty-One's lamp brightens. \"THE ORREM HAVE DECIDED SOMETHING. THEY HAVE NOT DECIDED ANYTHING IN TWO HUNDRED YEARS.\"",
ift: { r3b_61: "\"YOU CAME BACK. I KNEW YOU WOULD. I WATCHED THE LEDGERS, AS I PROMISED.\" Sixty-One's lamp brightens. \"THE ORREM HAVE DECIDED SOMETHING.\"" }, o: [
["What did they decide?", "b"]
] },
b: { t: "\"TO SPEAK. ONCE. TO THE WHOLE GALAXY. THE TRUTH ABOUT WHAT THE HOLLOW DID, FROM THE ARCHIVE'S OWN MEMORY. EVERY PLANET WILL HEAR IT. BUT THE ARCHIVE'S GREAT VOICE IS BROKEN.\"" }
} };
GS_SCENES.w5c_ninth = { sex: "m", who: "Reader Ninth", where: "The Reading Hall, Orr", start: "a", nodes: {
a: { t: "Reader Ninth stands at the great voice. \"READY.\" Then, very quietly, for you only: \"I MISSED SPEAKING. THANK YOU.\" And Orr speaks. Every comm in the galaxy hears it: the Hollow's crimes, one by one, in the Archive's cold bell voice. When it ends, there is a long silence everywhere.", o: [
["Now everyone knows.", "b"]
] },
b: { t: "\"NOW EVERYONE KNOWS,\" agrees Ninth. \"THAT IS THE ORREM'S GIFT TO YOUR FLEET. IT IS NOT A SHIP. IT IS BETTER.\"" }
} };
GS_CLUES.w1b_slag = [
{ n: "Poisoned ore", t: "Star-iron ore with a black crust on it. It looks right, but it would crack in the forge." },
{ n: "A sack of black powder", t: "Ember-ash, ground fine. Rubbed into the ore, it ruins it. The sack has a Hollow mark." },
{ n: "Small footprints", t: "Footprints much too light for a Kharn. Someone of normal weight, walking very carefully in Kharn's pull." },
{ n: "A dropped token", t: "A Hollow acolyte's ember-token. Whoever did this left in a hurry." }
];
GS_CLUES.w2b_ship = [
{ n: "Sigrun's log", t: "\"They promised the Hrovan would never be shamed again. They lied. Everyone who joins is shamed, every day.\"" },
{ n: "Her old honour-mark", t: "Wrapped in cloth at the bottom of her sea-chest: Sigrun's own Hrovan mark, not burned. She kept it." },
{ n: "A list of names", t: "Her crew. Twenty Hrovan names. Next to each, in her hand: \"still Hrovan\"." }
];
GS_CLUES.w4b_lash = [
{ n: "The great lashings", t: "Cables thick as a Kharn's arm hold the gunships into the Driftward. Each has a Drifter knot that only opens one way." },
{ n: "The old captains' locks", t: "Padlocks on the lashings, with the old captains' marks. Rook has the keys. Most of them." },
{ n: "A child's message", t: "Chalked on a gunship's hull: \"COME HOME\". Somebody's family lives on this ship. They'll go with it." }
];
GS_MAKE.w1b_ring = { n: "An oath-ring of clean star-iron", parts: ["the clean ore", "heat it", "fold it", "the oath-words", "quench it"],
hint: "Brann's way: clean ore, heat, fold, speak the oath-words into it while it glows, then quench.", done: "The ring rings like a bell when Brann taps it. Clean iron. A clean oath." };
GS_MAKE.w4b_lash = { n: "The gunships, cut loose", parts: ["the keys", "the Drifter knots", "the cables", "the push-off"],
hint: "Rook says: unlock first, then open the knots the one way they open, then the cables fall, then push off. Never the other way, or a ship swings into its neighbour.", done: "The gunships drift free of the Driftward, one by one, and every deck cheers." };
GS_MAKE.w5c_voice = { n: "The Archive's great voice", parts: ["the cracked horn", "the copper thread", "the light-glass", "the Archive's seal"],
hint: "As you mended the memory-core with Sixty-One, long ago: casing, thread, glass, seal.", done: "The great voice hums. Somewhere in the Reading Hall, the Archive clears its throat." };
GS_SCENES.w6b_sera = { sex: "f", who: "Sera Vant", where: "The camp, Nharos", start: "a", nodes: {
a: { t: "\"We have the camp. We don't have food, or medicine. The Unhollowed hid supplies along the ash-road when they ran. Bring them in, and we can hold out for a month.\"", o: [
["Who'll guide me?", "b"]
] },
b: { t: "\"Tavi knows the road. He's old, but he knows it.\" She pauses. \"Bring him back too. We've lost enough old ones.\"",
ift: {} }
} };
GS_SCENES.w6c_pip = { sex: "f", who: "Pip", where: "The camp, Nharos", start: "a", nodes: {
a: { t: "Pip, the Unhollowed girl with the ember-scar, tugs your sleeve. \"I know the tunnels. Under the pits. Where they kept me. I can show you. If you don't tell Sera.\"", o: [
["It's too dangerous.", "b"], ["Show me. I'll be right behind you.", "c", "w6c_trust"]
] },
b: { t: "\"Everything's too dangerous.\" She folds her arms. \"I'm going anyway. You can follow me or not.\"" },
c: { t: "She grins, all teeth. \"Keep up. And stay back, so they don't see you.\"" }
} };
GS_SCENES.w6c_pip2 = { sex: "f", who: "Pip", where: "The pits, Nharos", start: "a", nodes: {
a: { t: "Pip points at a crack in the rock, just wide enough to crawl through. \"That way goes right under the broken watch. And that way, under the pits. Nobody knows but me.\"", o: [
["You're the bravest person in this camp.", "b"], ["Now go back to Sera. Please.", "c"]
] },
b: { t: "\"I know,\" says Pip, very seriously. Then she lets you walk her home." },
c: { t: "\"Fine.\" She stomps off. Then she stops, and comes back, and hugs your leg very quickly, and runs." }
} };
GS_SCENES.w7b_morrec = { sex: "m", who: "Ashguard Morrec", where: "The broken watch, Nharos", start: "a", nodes: {
a: { t: "Morrec sits in the broken watch with his hands on his knees. His men watch you from the walls. \"Vael said you would kill me. You didn't. Now my men don't know whose they are.\"", o: [
["Tell them they're their own.", "b", "w7b_free"], ["Tell them to stand down, or I'll have to fight them.", "c"]
] },
b: { t: "Morrec is very quiet for a long time. Then he stands and says it to the walls, loudly. One by one, his men take off their ember-blades. Some of them are crying. Some of them are laughing." },
c: { t: "\"They'll stand down. Most of them.\" He looks at the walls. \"The rest will die for Vael. Let them come. I won't stop you.\"" }
} };
GS_SCENES.w7c_aren = { sex: "m", who: "Aren Marr", where: "The pits, Nharos", start: "a", nodes: {
a: { t: "A young man in ember-black stands at the edge of the pits. He has Isolde's eyes. \"You're Isolde's friend. She sent you to bring me home. Didn't she.\"",
ift: { w1c_promise: "A young man in ember-black stands at the edge of the pits. He has Isolde's eyes. Behind you, Isolde steps forward, as you promised she could. \"Aren.\" He flinches as if she had hit him." }, o: [
["She never stopped looking for you.", "b"], ["Put the blade down, Aren.", "c"]
] },
b: { t: "\"I gave Vael my name. There's nothing to bring home.\" His blade comes up, shaking. \"Fight me. If I lose, then maybe... maybe.\"" },
c: { t: "\"I can't.\" His hand is shaking. \"Vael's ember is in me. It wants to fight. Fight me, and if I lose, I'll come.\"" }
} };
GS_SCENES.w7c_aren2 = { sex: "m", who: "Aren Marr", where: "The pits, Nharos", start: "a", nodes: {
a: { t: "Aren is on his knees, the ember-blade cold beside him. Isolde has her arms round him and is not letting go. He says, very quietly, \"Aren. My name was Aren.\"", o: [
["It still is.", "b"]
] },
b: { t: "Isolde looks up at you over his shoulder. She doesn't say anything. She doesn't have to." }
} };
GS_SCENES.w8b_senator = { sex: "f", who: "Senator Hela Dumont", where: "The camp, Nharos", start: "a", nodes: {
a: { t: "The freed senator is thin and grey and very angry. \"Venn put me there. Three years. He told the Senate I'd retired.\" She takes your arm. \"Get me to a comm. Amaranth must hear it from me.\"", o: [
["The camp comm, then.", "b"]
] },
b: { t: "\"And Warden? When you find Venn, don't kill him. I want him in front of the Senate. I want everyone to look at him.\"" }
} };
GS_SCENES.w8b_amaranth = { sex: "f", who: "First Speaker Amaranth", where: "On your comms", start: "a", nodes: {
a: { t: "Amaranth listens to Senator Dumont for a long time. Then: \"Malric.\" Just the name. \"He taught me to read the old laws. He held my hand at my mother's funeral.\"",
ift: { s1b_venn: "Amaranth listens to Senator Dumont. Then, quietly: \"You said Malric. Weeks ago. I said I'd never forgive you if you were wrong.\" A breath. \"You weren't wrong.\"" }, o: [
["I'm sorry.", "b"]
] },
b: { t: "\"So am I.\" Her voice hardens. \"Bring him to me, Warden. Alive.\"" }
} };
GS_SCENES.w9b_venn = { sex: "m", who: "Malric Venn", where: "The Concord's cells, the camp, Nharos", start: "a", nodes: {
a: { t: "Venn sits in the cell as if it were the Old Senate. \"You found my papers. Good. Then you know I never sold secrets for money.\"", o: [
["Then why?", "b"], ["I don't care why.", "c"]
] },
b: { t: "\"Because the Concord is slow, and stupid, and kind, and the galaxy needs something faster. Vael is faster.\" He smiles, gently. \"Patience, Warden. Everything tires. Even you.\"" },
c: { t: "\"No. Nobody ever does.\" He folds his hands. \"That is why the Hollow will win in the end. Nobody ever asks why.\"" }
} };
GS_SCENES.w9c_night = { who: "The night before the Keep", where: "The ash-road camp, Nharos", start: "a", nodes: {
a: { t: "Fires all along the ridge. Kharn singing badly. Hrovan singing worse. The Ondai singing over all of them, so that it somehow sounds right. You walk the camp. Who do you sit with?", o: [
["Isolde and Aren.", "b"], ["Teodric.", "c"], ["Brann and Durra.", "d"], ["Rook and Ilsa.", "e"]
] },
b: { t: "Aren is asleep with his head on Isolde's shoulder. Isolde doesn't move in case she wakes him. \"Tomorrow,\" she whispers, \"we finish it. And then we go home. All of us.\"", set: "w9c_isolde" },
c: { t: "Teodric is sitting alone, looking at the ridge. \"I keep thinking I could have stopped him, when he was a boy.\" He looks at you. \"I couldn't. But you can.\"", set: "w9c_teodric" },
d: { t: "Durra hands you a cup of something that burns. Brann is asleep sitting up, armour on. \"Kharn sleep like that before a battle,\" Durra says. \"So we don't have to wake up properly.\"", set: "w9c_kharn" },
e: { t: "Rook and Ilsa are arguing about who flies dirtier. They both win. Ilsa lifts her cup. \"To the one who came back.\" Rook lifts hers. \"To the one who traded fair.\"", set: "w9c_rook" }
} };
GS_SCENES.w9d_sera = { sex: "f", who: "Sera Vant", where: "The ash-road camp, Nharos", start: "a", nodes: {
a: { t: "Dawn. The gate of the Ashen Keep stands open on the ridge, like a mouth. Sera Vant stands beside you. \"I gave Vael my name in that Keep. I'm going to go and take it back.\"", o: [
["Together.", "b"]
] },
b: { t: "\"Together.\" Behind you, the whole camp is getting to its feet." }
} };
GS_CLUES.w8c_furnace = [
{ n: "The great crucible", t: "A furnace the size of a house, full of molten ember-glass. Every Hollow blade on Nharos was born here." },
{ n: "The bellows", t: "Bellows worked by chained machines. Break the rhythm and the furnace chokes." },
{ n: "The cooling channel", t: "A channel of water to cool the blades. If it were turned back into the furnace, the glass would crack." },
{ n: "A slave's mark", t: "Scratched in the wall: dozens of names, and \"we were here\". The Unhollowed who worked the furnace." }
];
GS_CLUES.w9b_papers = [
{ n: "Venn's letters", t: "Forty years of letters to Vael. The first is from a teacher to a student. The last is from a servant to a master." },
{ n: "A Senate seal-ring", t: "Venn's own seal-ring, worn thin. The ring that sealed every order for the stolen seals." },
{ n: "A list", t: "Senators who might be turned, with notes. Next to Amaranth's name: \"never\". Next to Dumont's: \"pits\"." },
{ n: "A grey feather", t: "A grey feather, burned at the tip. The Hollow's goodbye. He kept one for himself." }
];
GS_MAKE.w8c_furnace = { n: "The ember furnace, choked", parts: ["jam the bellows", "turn the channel", "open the vents", "run"],
hint: "Pip whispers it from the tunnel mouth: jam the bellows so it can't breathe, turn the cooling channel in, open the vents, then run.", done: "The furnace screams, cracks, and goes dark. Every ember-blade on Nharos flickers at once." };
GS_MAKE.w6b_cart = { n: "A sled for the supplies", parts: ["the runners", "the bed", "the lashings", "the harness"],
hint: "Tavi shows you how the Unhollowed haul on ash: runners first, then the bed, lash the supplies down, harness last.", done: "The sled runs smoothly on the ash. Tavi pats it like a horse." };
GS_SCENES.w5b_hermit = { sex: "m", who: "The Hermit", where: "The Hermit's Cell, Aster Still", start: "a", nodes: {
a: { t: "The Hermit holds out his star-lamp, the one you mended as a novice. \"Take it, Teodric. You'll be in the dark soon. Somebody should be a lamp for you.\" Teodric takes it without a word. His hands are shaking.", o: [["Say nothing.", "b"]] },
b: { t: "The Hermit looks at you. \"See? You remembered.\"" }
} };
GS_CLUES.w7b_watch = [
{ n: "Vael's orders", t: "\"Morrec holds the watch until he dies. If he yields, his men are to be killed for it.\" Signed with a burned V." },
{ n: "A duty roster", t: "Every name on it has a mark by it: kept, or burned. Morrec's men are all marked burned." },
{ n: "A family picture", t: "A picture of a Hrovan family, hidden in a guard's bunk. One of Morrec's men was Sigrun's cousin." }
];
GS_MAKE.w9c_banner = { n: "One banner for everyone", parts: ["Kharn iron-grey", "Hrovan red", "Iskari white", "Drifter patchwork", "the Warden star"],
hint: "Durra says the oldest at the top. Kharn iron, then Hrovan red, Iskari white, the Drifters' patchwork, and the Warden star sewn over the middle of all of it.", done: "It is the ugliest banner anyone has ever seen. Everyone in the camp cheers when it goes up." };
GS_WHO_SEX["Novice Kell"] = "m";
GS_WHO_SEX.Pip = "f";
GS_WHO_SEX["Senator Hela Dumont"] = "f";
GS_WHO_SEX["Old Tavi"] = "m";
(function () {
var W1 = {
w1b: { n: "Brann's debt", f: "hollow", say: "Hammer-watch's forge-ships will fly, if Forge-Captain Brann's blades stop cracking.", steps: [
["scene", "kharn", 2, "w1b_brann", "Forge-Captain Brann at Hammer-watch"],
["search", "kharn", 0, "w1b_slag", "Find who is fouling the star-iron at Slag Rise"],
["foes", "kharn", 0, 5, "Hollow saboteurs in the mine"],
["make", "kharn", -1, "w1b_ring", "Forge Brann a new oath-ring of clean iron"],
["scene", "kharn", 2, "w1b_brann2", "Give Brann his oath-ring"]
],
end: "Twelve forge-ships. And Brann at the front, where he can get hit." },
w1c: { n: "The Wardens fly", f: "hollow", say: "The Hollow are raiding the Order's novices on Aster Still.", steps: [
["land", "aster", "Fly to Aster Still"],
["scene", "aster", -1, "w1c_isolde", "Isolde is waiting"],
["escort", "aster", 2, 0, "Novice Kell", 5, "Get the youngest novice from the orchard to the Hermit's Cell"],
["hold", "aster", 3, 3, "The Hollow come for the Star-stone: hold it"],
["scene", "aster", 3, "w1c_isolde2", "Isolde, at the Star-stone"]
],
end: "The Order of the Quiet Star will fly. All of it. Fourteen." },
w2b: { n: "Sigrun's name", f: "hollow", say: "Sigrun Hollowsworn yielded. Now the Hrovan must decide what she is.", steps: [
["search", "skeldmar", 1, "w2b_ship", "Search Sigrun's longship at the cliff watch"],
["scene", "skeldmar", 0, "w2b_sigrun", "Say what is done with Sigrun"],
["foes", "skeldmar", 1, 5, "Hollow-sworn Hrovan who would not yield"],
["race", "skeldmar", 1, 9, 50, "Run the Ash Run with the Hrovan, before they fly"],
["talk", "hrovan", "Kaldra the Unbowed gives the word to fly"]
],
end: "The Hrovan longships rise from Skeldmar, shields beating." },
w3b: { n: "The flying herds", f: "hollow", say: "The Iskari ride their woolmoth herds between the ice-moons. Hollow fire has scattered them.", steps: [
["scene", "isk", "The winter camp", "w3b_ulvra", "Ulvra will ride, if the herd will"],
["race", "isk", "The winter camp", 10, 55, "Run the herd-rings to call the woolmoths in"],
["foes", "isk", 2, 6, "Hollow hunters are herding woolmoths into cages"],
["gather", "isk", 2, 5, "woolmoth bells", 0xE8E0C8]
],
end: "The woolmoths rise in a white cloud, Iskari on every back, singing." },
w4b: { n: "Rook's gambit", f: "hollow", say: "The Driftward is a home, and homes don't fight. The gunships might.", steps: [
["scene", "driftward", -1, "w4b_rook", "Rook and the old captains"],
["search", "driftward", -1, "w4b_lash", "Look over the great lashings"],
["make", "driftward", -1, "w4b_lash", "Cut the gunships loose"],
["waves", "wanderers", 2, "Hollow scouts saw the gunships leave: drive them off"]
],
end: "Forty Drifter gunships, and every family on the Driftward watching them go." },
w4c: { n: "The Ondai's song", f: "raider", say: "The Ondai cannot fight. But Ilsa Marn can, and the Ondai can sing.", steps: [
["land", "maruondo", "Fly to Maruondo"],
["scene", "maruondo", 0, "w4c_ilsa", "Ilsa Marn, at the dune farms"],
["escort", "maruondo", 0, 1, "Ilsa Marn", 4, "Walk Ilsa to the singing pier"],
["scene", "maruondo", 1, "w4c_elder", "The Ondai bless the fleet"]
],
end: "Ilsa's ship rises out of Maruondo's sea, still shimmering. The Ondai are singing, and they will not stop until you come home." },
w4d: { n: "The racers", f: "raider", say: "Tullimar's racers are the fastest pilots in the Reach. They fly for nobody.", steps: [
["land", "tullimar", "Fly to Tullimar"],
["scene", "tullimar", 0, "w4d_veska", "Veska Dunn, at the racers' camp"],
["race", "tullimar", 0, 10, 50, "Beat Veska round the racers' course"],
["waves", "reach", 2, "The racers' first flight: Hollow scouts in the Reach, two waves"]
],
end: "Sixty skiffs, all painted different colours, none of them flying in formation. Veska says that's the point." },
w5b: { n: "Teodric's grey", f: "hollow", say: "Elder Warden Teodric has not left Aster Still in forty years.", steps: [
["scene", "aster", 3, "w5b_teodric", "Teodric, at the Star-stone"],
["visit", "aster", 1, "Walk with Teodric to the ruins of the First House"],
["gather", "aster", 1, 5, "name-stones that still glow", 0xDCE6FF],
["scene", "aster", 0, "w5b_hermit", "The Hermit has something for Teodric"],
["hold", "aster", 3, 2, "Hollow watchers try to stop the Order leaving"]
],
end: "Teodric carries the glowing name-stones aboard his ship. \"So they fly with us,\" he says." },
w5c: { n: "The Orrem speak", f: "raider", say: "The Orrem have decided something, for the first time in two hundred years.", steps: [
["land", "orr", "Fly to Orr"],
["scene", "orr", "The lower stacks", "w5c_61", "Sixty-One, in the lower stacks"],
["hold", "orr", "The lower stacks", 2, "The Hollow come to silence Orr: hold the stacks"],
["make", "orr", -1, "w5c_voice", "Mend the Archive's great voice"],
["scene", "orr", -1, "w5c_ninth", "Orr speaks"]
],
end: "Every world heard it. On a hundred worlds, people who were neither Hollow nor Warden look up at the sky and choose." }
};
var W2 = {
w6b: { n: "The ash-road", f: "hollow", say: "The camp needs food and medicine. The Unhollowed hid supplies along the ash-road.", steps: [
["scene", "nharos", -1, "w6b_sera", "Sera Vant needs supplies"],
["make", "nharos", -1, "w6b_cart", "Build a sled for the ash"],
["escort", "nharos", -1, "The ash-road camp", "Old Tavi", 6, "Walk Tavi down the ash-road to the hidden stores"],
["gather", "nharos", "The ash-road camp", 6, "hidden supply-crates", 0xC8B080]
],
end: "A month of food. Medicine for the wounded. And Tavi, who insists on pulling the sled himself." },
w6c: { n: "Pip's tunnels", f: "hollow", say: "Pip knows the tunnels under the pits, where the Hollow kept her.", steps: [
["scene", "nharos", -1, "w6c_pip", "Pip has a secret"],
["follow", "nharos", -1, 2, "Pip", "Follow Pip to the tunnel mouth, staying out of sight"],
["foes", "nharos", 2, 5, "Hollow guards at the tunnel mouth"],
["scene", "nharos", 2, "w6c_pip2", "Pip shows you the way in"]
],
end: "A way under the broken watch and the pits. The Hollow will not know where you are coming from." },
w7b: { n: "Morrec's men", f: "hollow", say: "Ashguard Morrec yielded. His men do not know whose they are.", steps: [
["scene", "nharos", 1, "w7b_morrec", "Morrec, at the broken watch"],
["search", "nharos", 1, "w7b_watch", "Search the broken watch for Vael's orders"],
["hold", "nharos", 1, 2, "Vael's loyal Ashguard come for Morrec: hold the watch"],
["gather", "nharos", 1, 5, "cast-off ember-blades", 0xFF5A3A],
["talk", "unhollowed", "Bring Morrec's men to Sera Vant"]
],
end: "Morrec's men march to the camp. Sera Vant meets them at the edge of it, and after a long moment, lets them in." },
w7c: { n: "Aren Marr", f: "hollow", say: "Isolde's brother is somewhere on Nharos. Pip's tunnels go under the pits.", steps: [
["visit", "nharos", 2, "Go down Pip's tunnel to the pits"],
["scene", "nharos", 2, "w7c_aren", "A young man with Isolde's eyes"],
["duel", "nharos", 2, "Aren Marr, ember-bound", 260, "Fight Aren, so the ember lets him go"],
["scene", "nharos", 2, "w7c_aren2", "Aren, after"]
],
end: "Isolde's name-stone for Aren, in the orchard on Aster Still, is glowing white again. You know without seeing it." },
w8b: { n: "The freed senator", f: "hollow", say: "Among the prisoners was a senator the Senate thought had retired.", steps: [
["scene", "nharos", 2, "w8b_senator", "Senator Hela Dumont"],
["foes", "nharos", 2, 5, "Pit-keepers block the way out"],
["escort", "nharos", 2, -1, "Senator Hela Dumont", 5, "Get Senator Dumont to the camp comm"],
["call", "w8b_amaranth", "Amaranth hears it from Dumont"]
],
end: "\"Bring him to me alive.\" Amaranth's voice will stay with you a long time." },
w8c: { n: "The ember furnace", f: "hollow", say: "Every Hollow blade on Nharos is made in one furnace. Pip knows a way in.", steps: [
["visit", "nharos", "The ember furnace", "Go to the ember furnace through Pip's tunnel"],
["search", "nharos", "The ember furnace", "w8c_furnace", "Look over the furnace"],
["foes", "nharos", "The ember furnace", 6, "The furnace-keepers"],
["make", "nharos", "The ember furnace", "w8c_furnace", "Choke the furnace"],
["hold", "nharos", "The ember furnace", 2, "The Hollow come to save the furnace: hold until it dies"]
],
end: "The furnace is dark. Every ember-blade on Nharos is a little colder tonight." },
w9b: { n: "Venn's papers", f: "hollow", say: "Malric Venn is in the Concord's cell at the camp. His papers are still at the ember shrine.", steps: [
["visit", "nharos", 0, "Go back to the ember shrine"],
["foes", "nharos", 0, 5, "Shrine-keepers guard Venn's rooms"],
["search", "nharos", 0, "w9b_papers", "Search Venn's rooms at the shrine"],
["scene", "nharos", -1, "w9b_venn", "Ask Venn why"]
],
end: "Venn's papers go to Amaranth. His why goes nowhere. He will have to answer it in front of the Senate." },
w9c: { n: "The night before", f: "hollow", say: "Tomorrow, the Ashen Keep. Tonight, the camp.", steps: [
["visit", "nharos", "The ash-road camp", "Go up to the ash-road camp, under the ridge"],
["scene", "nharos", "The ash-road camp", "w9c_night", "Walk the camp at night"],
["make", "nharos", "The ash-road camp", "w9c_banner", "Make one banner from every people's colours"],
["gather", "nharos", "The ash-road camp", 6, "lanterns for the fallen", 0xFFD98A]
],
end: "Six lanterns on the ridge. Everyone who died getting here, remembered." },
w9d: { n: "The open gate", f: "hollow", say: "The gate of the Ashen Keep opened by itself. The Hollow are waiting.", steps: [
["scene", "nharos", "The ash-road camp", "w9d_sera", "Dawn, with Sera Vant"],
["foes", "nharos", "The ash-road camp", 7, "The Keep's outriders come down the ridge"],
["hold", "nharos", "The ash-road camp", 3, "Hold the camp while the fleet forms up"]
],
end: "The outriders break. The ridge is clear. The Ashen Keep is waiting, and so is Vael." }
};
Object.keys(W1).forEach(function (k) { GS_CH[k] = W1[k]; });
Object.keys(W2).forEach(function (k) { GS_CH[k] = W2[k]; });
GS_GATE.w7 = ["w1", "w1b", "w1c", "w2", "w2b", "w3", "w3b", "w4", "w4b", "w4c", "w4d", "w5", "w5b", "w5c"];
GS_GATE.w8 = ["w6", "w6b", "w6c", "w7", "w7b", "w7c", "w8", "w8b", "w8c", "w9", "w9b", "w9c", "w9d"];
})();
gdAddPlace("nharos", { n: "The Pit", k: "ruin", at: [-90, 210], a: "Kethra Vahl's training ground: a ring of black stone, sunk in the ash. Nobody leaves it the same." });
GS_SCENES.h1b_kethra = { sex: "f", who: "Mistress Kethra Vahl", where: "The Pit, Nharos", start: "a", nodes: {
a: { t: "Kethra Vahl is small, grey-haired, and terrifying. \"Vael thinks you're special. Vael thinks lots of people are special. Most of them are dead.\" She points into the Pit. \"Show me.\"", o: [
["Show you what?", "b"], ["Anything you like.", "c"]
] },
b: { t: "\"Whether you can bleed and keep going. Gorr will help.\" A huge ember-bound steps into the ring, grinning." },
c: { t: "\"Brave. Stupid, but brave.\" She almost smiles. \"Gorr. Teach the new one.\"" }
} };
GS_SCENES.h1b_kethra2 = { sex: "f", who: "Mistress Kethra Vahl", where: "The Pit, Nharos", start: "a", nodes: {
a: { t: "Kethra looks at your ember-blade, your bruises, and the way you are standing. \"Hm. Good. Not good. Better than yesterday.\" She tosses you a black cloak. \"Come to the shrine tonight. Vael wants your name.\"", o: [
["My name?", "b"]
] },
b: { t: "\"Everyone gives it. Then it burns, and you're free.\" Something moves behind her eyes. \"Free of everything. That's the gift.\"" }
} };
GS_SCENES.h1c_rite = { who: "The naming rite", where: "The ember shrine, Nharos", start: "a", nodes: {
a: { t: "The fire of the shrine roars. Vael's voice comes out of it, warm and close, as if he stood behind you. \"Say your name, and give it to the fire. You will never be small again.\"", o: [
["Say it. Give it.", "b"], ["Say a false name, and keep your own.", "c", "h_kept_name"]
] },
b: { t: "You say it. The fire takes it. For a moment you feel nothing at all, and it is wonderful, and terrible. Then you feel the ember in your chest, warm, and it is enough." },
c: { t: "You say a name that is not yours. The fire takes it. Vael is silent a moment too long. \"Welcome,\" he says. Your real name sits in your chest like a stone, hidden. Nobody saw. You think." }
} };
GS_SCENES.h2b_ressa = { sex: "f", who: "Ressa Dunewind", where: "The buried ship, Dunmarrow", start: "a", nodes: {
a: { t: "The bounty hunter sits in the sand, tearing her own poster into strips. \"No price is worth that. I told you.\" She looks up. \"So. You're Hollow now. Going to finish it?\"", o: [
["Go. Get off this world.", "b", "h_mercy_ressa"], ["Vael wants hunters like you. Join us.", "c"]
] },
b: { t: "She stares. \"The Hollow don't let people go.\" A pause. \"...But you just did.\" She stands, dusts off sand. \"I won't forget that.\"" },
c: { t: "\"Join the people who burn their names?\" She laughs. \"I like mine.\" She is gone into the dunes before you can stop her. The Concord will hear where you are." }
} };
GS_SCENES.h2c_sahra = { sex: "f", who: "Sahra Duneborn", where: "Dunmarrow", start: "a", nodes: {
a: { t: "Sahra Duneborn stands in your way, alone, unarmed. \"I know what you've come for. The glass in the buried ship. The Dunfolk buried it so no one would ever dig again.\"", o: [
["Stand aside. I don't want to hurt anyone.", "b"], ["Hide your people. The Hollow will come with or without me.", "c", "h_warned_dunfolk"]
] },
b: { t: "\"You already have.\" She steps aside. Behind her, Concord marshals are waiting." },
c: { t: "She looks at you for a long time. \"Then you're not all ember.\" She whistles, and the Dunfolk melt into the dunes. Only the Concord marshals stay." }
} };
GS_SCENES.h3b_kolka = { sex: "m", who: "Kolka", where: "Aurora watch, Isk", start: "a", nodes: {
a: { t: "Old Kolka is sitting at the great lens with the logbook in his lap. He sees your ember-black and sighs. \"Kethra sent you to silence the watchers. I'm all of them, tonight.\"", o: [
["Burn the logbook and go home, old man.", "b", "h_mercy_kolka"], ["I'm sorry.", "c"]
] },
b: { t: "He looks at the book, then at you. Then he throws it in the brazier himself. \"The Iskari remember who spares them,\" he says, and goes, slowly, down the hill." },
c: { t: "\"So am I.\" He closes the book. \"The Concord will come. They always come for the watch.\" Below, engines." }
} };
GS_SCENES.h4b_isolde = { sex: "f", who: "Isolde Marr", where: "The ruins of the First House, Aster Still", start: "a", nodes: {
a: { t: "Isolde is standing among the name-stones with her blade out. Her face is wet. \"Yours is red now. Like Aren's. I came to see if it was true.\"", o: [
["Go home, Isolde.", "b"], ["It's true. Fight me, if you have to.", "c"]
] },
b: { t: "\"I can't. I made a promise once that I'd bring someone home. Now there's two of you.\" Her blade comes up. \"I'm sorry.\"" },
c: { t: "\"I don't want to.\" Her blade comes up anyway. \"Wardens never want to.\"" }
} };
GS_SCENES.h4b_isolde2 = { sex: "f", who: "Isolde Marr", where: "The ruins of the First House", start: "a", nodes: {
a: { t: "Isolde is on her knees, blade in the dirt. She does not look up. \"Go on, then.\"", o: [
["Walk away. Leave her.", "b", "h_mercy_isolde"], ["Take her blade for Vael.", "c"]
] },
b: { t: "You walk away. Behind you, she says, very quietly, your name. Not the one you gave the fire. The real one." },
c: { t: "You take the blade. She doesn't stop you. When you look back she is still kneeling there, among the stones, and she is still looking at the red one." }
} };
GS_SCENES.h4c_aren = { sex: "m", who: "Aren Marr", where: "The Pit, Nharos", start: "a", nodes: {
a: { t: "Another ember-bound sits beside you on the Pit's edge, a young man with tired eyes. \"I'm Aren. Was Aren. They said you came from Aster Still. Did you... do you know a Warden called Isolde?\"", o: [
["She's still looking for you.", "b", "h_told_aren"], ["I don't know anyone there any more.", "c"]
] },
b: { t: "He is quiet for a very long time. \"Don't tell Kethra I asked.\" Then: \"Run the ember-run with me. I need to not think.\"" },
c: { t: "\"No. Nobody does.\" He stands. \"Run the ember-run with me. I need to not think.\"" }
} };
GS_SCENES.h5b_oren = { sex: "m", who: "Oren Hask", where: "The Sky Market, Aurelion", start: "a", nodes: {
a: { t: "The neat little clerk freezes when he sees your ember-black. \"No. No, no. I never said anything, I swear, I never...\"", o: [
["Then keep never saying it. Go.", "b", "h_mercy_oren"], ["Venn wants the courier's route. Now.", "c"]
] },
b: { t: "He backs away, then runs, coat flapping. He'll tell someone. Or he won't. People surprise you." },
c: { t: "He tells you everything, very fast, in a whisper, and then he sits down on the ground and puts his head in his hands." }
} };
GS_SCENES.h5c_venn = { sex: "m", who: "Senator Malric Venn", where: "The Old Senate, Aurelion", start: "a", nodes: {
a: { t: "Venn is pleased to see you. That is the worst part. \"Vael speaks well of you. I have a small task. Senator Ysra Callow is becoming tiresome. A few papers on her bench, in the right hand, would end her.\"", o: [
["Give me the papers.", "b"], ["No. Find someone else.", "c", "h_refused_venn"]
] },
b: { t: "He hands them over. They are very well made. Ysra will never sit in the Senate again." },
c: { t: "Venn's smile does not change at all. \"Of course. Patience.\" He tucks the papers away. You know you will hear about this from Kethra." }
} };
GS_SCENES.h6b_rook = { sex: "f", who: "Captain Rook", where: "The Driftward", start: "a", nodes: {
a: { t: "Rook paid the toll. Now she stands on her deck and looks at you like a stranger. \"You traded fair, once.\" She spits over the rail. \"What happened?\"", o: [
["Vael happened.", "b"], ["I'm still trading. The Hollow will spare the Driftward.", "c", "h_promise_rook"]
] },
b: { t: "\"Vael happens to a lot of people.\" She turns her back. \"Get off my ship.\"" },
c: { t: "\"Will they.\" She doesn't turn round. \"Then you'd better make sure of it. A Drifter holds people to their trades.\"" }
} };
GS_SCENES.h6c_veska = { sex: "f", who: "Veska Dunn", where: "The racers' camp, Tullimar", start: "a", nodes: {
a: { t: "Veska is waiting by her skiff. \"Kethra wants Tullimar's skiffs for scouts. The racers say: race for them. You win, you take them. I win, you leave and never come back.\"", o: [
["Fair.", "b"]
] },
b: { t: "\"Nothing's fair now.\" She climbs into her skiff. \"But a race is a race.\"" }
} };
GS_SCENES.h6c_veska2 = { sex: "f", who: "Veska Dunn", where: "The racers' camp, Tullimar", start: "a", nodes: {
a: { t: "Veska climbs out of her skiff and doesn't look at you. \"Take them, then.\"", o: [
["Keep your skiff. Just yours.", "b", "h_mercy_veska"], ["All of them.", "c"]
] },
b: { t: "She looks up, surprised. \"Why?\" You don't have an answer. She nods anyway. \"Da would like you. He liked people who don't make sense.\"" },
c: { t: "\"All of them.\" She nods, slowly. \"Da said you were the kind who keeps promises. I suppose you just stopped.\"" }
} };
GS_SCENES.h7b_brann = { sex: "m", who: "Forge-Captain Brann", where: "Hammer-watch, Kharn", start: "a", nodes: {
a: { t: "Brann yielded, and the star-iron is yours. He watches you load it, arms folded. \"I held the Old Anvil beside you once.\"",
ift: { n3_brann: "Brann yielded, and the star-iron is yours. He watches you load it. \"You told me I held well. At the Old Anvil. I remember. A Kharn remembers.\"" }, o: [
["Leave half. Your forges need it.", "b", "h_mercy_brann"], ["I remember too. It doesn't change anything.", "c"]
] },
b: { t: "He stares at you. Then he laughs, short and surprised. \"A Kharn remembers that too.\"" },
c: { t: "\"No. It doesn't.\" He turns away. \"But I'll remember you said so.\"" }
} };
GS_SCENES.h8b_ondessa = { sex: "f", who: "Healer Ondessa", where: "Ysolde", start: "a", nodes: {
a: { t: "You are bleeding, and the rafts are broken, and Ondessa walks across them to you without any fear at all. \"I said I would mend you too, when you needed it.\" She kneels and opens her bag.", o: [
["Why?", "b"], ["Don't touch me.", "c"]
] },
b: { t: "\"Because you're hurt.\" She smears salve on the cut. \"That is the whole reason. It always is.\"" },
c: { t: "\"Hold still.\" She does it anyway. \"You can hate me after. Most people do, for about a day.\"" }
} };
GS_SCENES.h9b_tam = { sex: "m", who: "Tam", where: "The Moonwell, Sereth Vale", start: "a", nodes: {
a: { t: "Ilvane's apprentice, Tam, stands at the Moonwell with a seed-keeper's staff. He's shaking. \"She told me to let you through. I'm not going to.\"", o: [
["Stand aside, Tam.", "b"], ["You're braver than I was.", "c"]
] },
b: { t: "\"Four years I've been listening to the trees.\" He raises the staff. \"Today they're saying: don't let them past.\"" },
c: { t: "\"I know.\" He raises the staff. \"Doesn't help, does it.\"" }
} };
GS_SCENES.h9c_wren = { sex: "f", who: "Wren", where: "Sereth Vale", start: "a", nodes: {
a: { t: "A child steps out from behind a tree. Wren, who flew into the storm. Wren, whom you brought home, once, on another road you did not take. Here, you have never met. \"Are you the Hollow? Ma says the Hollow burn trees.\"", o: [
["Go home, Wren. Quickly.", "b", "h_mercy_wren"], ["Yes.", "c"]
] },
b: { t: "Wren looks at you for a long time, the way children do. Then runs. You find that your hands are shaking." },
c: { t: "\"Oh,\" says Wren. Then: \"You don't look like you want to.\" And runs." }
} };
GS_SCENES.h9d_vision = { who: "The Moonwell", where: "Sereth Vale, at night", start: "a", nodes: {
a: { t: "The water is still. In it, you see yourself, in Warden grey, standing beside Isolde and Corvin and Teodric. You see yourself in ember-black, alone at the top of a black tower, with Vael's hand on your shoulder. Both of them are you. The water asks nothing. It only shows.",
ift: { h_kept_name: "The water is still. In it you see yourself, twice: in Warden grey among friends, and in ember-black beside Vael. And in the water your real name is written, the one you never gave the fire. It is still yours." }, o: [
["Go on, to Ilvane.", "b"], ["Look a little longer.", "c", "h_looked"]
] },
b: { t: "You turn away from the water. Ilvane's lamp is lit, in the trees ahead. She is waiting for you." },
c: { t: "You look until the picture fades. When it is gone you are still standing there, and the trees are very quiet, as if they were waiting to see what you would choose." }
} };
GS_CLUES.h1c_shrine = [
{ n: "The wall of ash", t: "A wall black with fingerprints. Every ember-bound pressed a hand here when they gave their name." },
{ n: "A half-burned name", t: "One name the fire did not take all of: \"...ra V...\". Kethra's, perhaps, a long time ago." },
{ n: "Vael's chair", t: "A plain chair, facing the fire. Nobody sits in it. Everyone bows to it." }
];
GS_CLUES.h2c_ship = [
{ n: "Fresh-dug sand", t: "The Dunfolk buried the ship deeper. Someone has been digging it out again, by night." },
{ n: "A Warden's sigil", t: "A star in a ring, under the sand on the hull. You have seen it before. On another road, perhaps." },
{ n: "The sealed hold", t: "The hold is sealed from inside. Somewhere under you, the dead crew are still keeping their glass." }
];
GS_CLUES.h5b_route = [
{ n: "A loose stone", t: "In a planter on the third terrace, a stone that is not quite settled. The Senate's song-boxes are left here." },
{ n: "The courier's chalk", t: "A tiny chalk mark on the gate: the courier's sign that a box is waiting." },
{ n: "A Concord seal", t: "A seal on a ribbon, from the Concord's own guard. They are watching the drop now." }
];
GS_CLUES.h6b_hold = [
{ n: "The toll-book", t: "The Drifters' book of tolls paid. Next to the Hollow's line: \"paid under duress. remember.\"" },
{ n: "Children's drawings", t: "The Driftward's school has pinned up drawings of the Hollow. They are all monsters. One has your ship." },
{ n: "Rook's old chart", t: "The mended star-chart, the one you might have mended. Here it is still cracked." }
];
GS_CLUES.h8c_temple = [
{ n: "Carved waves", t: "Star-whales swimming between worlds, carved into the drowned walls." },
{ n: "A Warden star", t: "In the middle of the carvings, a star in a ring. The drowned people knew the Wardens." },
{ n: "The temple-lights", t: "Lamps that burn under water without fuel. Vael wants them for something. Nobody has told you what." }
];
GS_MAKE.h1b_blade = { n: "Your ember-blade", parts: ["the ember-glass", "heat it in the shrine fire", "quench it in ash", "the black hilt"],
hint: "Kethra's way: the glass, heated in the shrine's fire until it screams, quenched in ash not water, then the black hilt.", done: "The blade burns red along its edge. It hums with something like anger, and it is yours." };
GS_MAKE.h7b_cart = { n: "Iron-sleds", parts: ["the runners", "the bed", "the iron", "the chains"],
hint: "Runners, bed, the iron loaded low, chains over the top so it can't shift in Kharn's pull.", done: "The sleds groan under the iron. Kharn's pull makes every step a fight." };
GS_MAKE.h8b_salve = { n: "Ondessa's salve, for yourself", parts: ["crush the kelp", "warm the oil", "stir in the kelp", "cool it in a shell"],
hint: "Ondessa makes you do it yourself. \"So you remember how,\" she says.", done: "It stings. That's how you know it works." };
GS_WHO_SEX["Ressa Dunewind"] = "f";
GS_WHO_SEX["a Concord courier"] = "m";
(function () {
var H1 = {
h1b: { n: "The Pit", f: "hollow", spar: 1, say: "Mistress Kethra Vahl trains the ember-bound in the Pit. Nobody leaves it the same.", steps: [
["scene", "nharos", "The Pit", "h1b_kethra", "Kethra Vahl, at the Pit"],
["duel", "nharos", "The Pit", "Gorr, Pit-champion", 260, "Fight Gorr in the ring"],
["race", "nharos", "The Pit", 9, 50, "Run the ember-run round the Pit"],
["make", "nharos", 0, "h1b_blade", "Make your ember-blade in the shrine's fire"],
["scene", "nharos", "The Pit", "h1b_kethra2", "Show Kethra"]
],
end: "Kethra tosses you a black cloak. You put it on." },
h1c: { n: "The naming", f: "warden", say: "Every ember-bound gives their name to the shrine's fire. Tonight, you.", steps: [
["visit", "nharos", 0, "Go to the ember shrine at night"],
["search", "nharos", 0, "h1c_shrine", "Look about the shrine while you wait"],
["scene", "nharos", 0, "h1c_rite", "Give the fire your name"],
["hold", "nharos", 0, 2, "Unhollowed raiders strike the shrine during the rite: hold it"],
["gather", "nharos", 0, 5, "cold name-ash, for Kethra", 0x6A5A54]
],
end: "The ember in your chest is warm. It does not let you feel cold." },
h2b: { n: "Ressa", f: "concord", say: "Ressa Dunewind yielded and tore up your bounty. The Hollow don't let hunters walk away.", steps: [
["scene", "dunmarrow", 2, "h2b_ressa", "Ressa, at the buried ship"],
["foes", "dunmarrow", 2, 5, "Concord marshals heard the fight"],
["gather", "dunmarrow", 2, 4, "Concord tracker-beacons", 0x8AC8FF],
["follow", "dunmarrow", 2, 0, "Ressa Dunewind", "Ressa is heading for the Glass Wells: follow her and see who she meets"]
],
end: "Dunmarrow's sky is quiet. Whatever you chose about Ressa, the dunes will keep it." },
h2c: { n: "Ember-glass, again", f: "concord", say: "The Dunfolk buried the buried ship deeper. Kethra wants the glass out of it.", steps: [
["scene", "dunmarrow", -1, "h2c_sahra", "Sahra Duneborn stands in your way"],
["foes", "dunmarrow", 2, 6, "Concord marshals guard the dig"],
["search", "dunmarrow", 2, "h2c_ship", "Search the buried ship"],
["gather", "dunmarrow", 2, 5, "ember-glass shards", 0xFF7A40]
],
end: "The glass is warm in your hold, warmer than it should be. Somewhere under the sand, a dead Warden crew lost their last fight." },
h3b: { n: "The watchers", f: "concord", say: "The Iskari have watched the Hollow's spire for years. Kethra wants them silenced.", steps: [
["land", "isk", "Fly to Isk"],
["scene", "isk", 3, "h3b_kolka", "The old watcher at Aurora watch"],
["hold", "isk", 3, 2, "Concord cutters come for the watch: hold it"],
["search", "isk", 3, "h3b_watch", "Look at what the watchers saw"],
["gather", "isk", 3, 4, "pieces of the watchers' lens", 0xA8D8FF]
],
end: "The aurora watch is dark. Isk's sky-lights go on without anyone watching them." },
h4b: { n: "Isolde", f: "warden", spar: 1, say: "Someone on Aster Still has seen your name-stone turn red.", steps: [
["visit", "aster", 1, "Go to the ruins of the First House"],
["scene", "aster", 1, "h4b_isolde", "Isolde Marr, among the name-stones"],
["duel", "aster", 1, "Warden Isolde Marr", 260, "Fight Isolde"],
["scene", "aster", 1, "h4b_isolde2", "Isolde, after"]
],
end: "Your name-stone in the ruins is red. Isolde knows. She will tell Teodric, or she won't." },
h4c: { n: "Aren", f: "raider", say: "Another ember-bound in the Pit has a sister on Aster Still.", steps: [
["scene", "nharos", "The Pit", "h4c_aren", "A tired young man at the Pit's edge"],
["race", "nharos", "The Pit", 10, 55, "Run the ember-run with Aren"],
["foes", "nharos", 1, 5, "Unhollowed raiders at the broken watch: Kethra sends you both"],
["scene", "nharos", "The Pit", "h4c_kethra", "Kethra saw you talking to Aren"]
],
end: "Aren fights beside you, well and grimly. When it's over he says, \"Thanks,\" and you are not sure what for." },
h5b: { n: "The courier's road", f: "concord", say: "With Pell's Halo dark, Venn's secrets need a new road out of Aurelion.", steps: [
["scene", "aurelion", 1, "h5b_oren", "Find the clerk who knows the courier's route"],
["follow", "aurelion", 1, 0, "a Concord courier", "A Concord courier is watching the drop: follow them"],
["search", "aurelion", 0, "h5b_route", "Search the old drop in the Hanging Gardens"],
["foes", "aurelion", 0, 5, "Concord guards were waiting"]
],
end: "The courier's road is closed. Venn will have to find another, and he will." },
h5c: { n: "Venn's errand", f: "concord", say: "Senator Malric Venn has a small task for you, in the Old Senate.", steps: [
["visit", "aurelion", 2, "Go to the Old Senate"],
["scene", "aurelion", 2, "h5c_venn", "Senator Venn"],
["search", "aurelion", 2, "h5c_bench", "Look over Senator Ysra Callow's bench"],
["foes", "aurelion", 2, 4, "Concord guards on their rounds"]
],
end: "Whatever you did with Venn's papers, the Old Senate stays ruined, so the Senate remembers it can fall." }
};
var H2 = {
h6b: { n: "Rook", f: "concord", say: "Rook paid the Hollow's toll. Kethra wants to know what else the Driftward hides.", steps: [
["scene", "driftward", -1, "h6b_rook", "Rook, on her deck"],
["search", "driftward", -1, "h6b_hold", "Search the token-hold"],
["waves", "wanderers", 2, "Drifter gunships try to stop you leaving"]
],
end: "Rook watches you leave. She does not wave." },
h6c: { n: "The racers' skiffs", f: "concord", say: "Kethra wants Tullimar's racing skiffs for scouts.", steps: [
["land", "tullimar", "Fly to Tullimar"],
["scene", "tullimar", 0, "h6c_veska", "Veska Dunn has terms"],
["race", "tullimar", 0, 10, 50, "Race Veska for the skiffs"],
["scene", "tullimar", 0, "h6c_veska2", "Veska, after the race"]
],
end: "The skiffs go to Nharos, or most of them do." },
h7b: { n: "Brann", f: "warden", say: "Forge-Captain Brann yielded at Hammer-watch. The star-iron is yours.", steps: [
["scene", "kharn", 2, "h7b_brann", "Brann, at Hammer-watch"],
["make", "kharn", 2, "h7b_cart", "Load the star-iron on sleds"],
["escort", "kharn", 2, -1, "Brann", 5, "Brann insists on walking the sleds to your ship himself"]
],
end: "Brann watches your ship lift with the iron. A Kharn remembers. You remember that too." },
h7c: { n: "The Old Anvil", f: "warden", say: "Wardens have come to Kharn to take back the star-iron road.", steps: [
["visit", "kharn", 1, "Go to the Old Anvil"],
["hold", "kharn", 1, 3, "Wardens of the Order come for the Anvil: hold it"],
["gather", "kharn", 1, 4, "dropped Warden blades", 0x8AC8FF],
["scene", "kharn", 1, "h7c_durra", "Forge-Mother Durra comes to the Anvil"]
],
end: "You hold the Old Anvil, where you once held it the other way. The Warden blades you gather are very light." },
h8b: { n: "Ondessa", f: "concord", say: "You are hurt, and Ysolde's healer does not care what colour your cloak is.", steps: [
["scene", "ysolde", 1, "h8b_ondessa", "Healer Ondessa, on the rafts"],
["gather", "ysolde", 1, 5, "healing kelp", 0x6AC88A],
["make", "ysolde", -1, "h8b_salve", "Mix the salve yourself, as she tells you"]
],
end: "The cut heals clean. Ondessa doesn't ask for anything. That's what you can't stop thinking about." },
h8c: { n: "The temple-lights", f: "concord", say: "Vael wants the temple-lights from the drowned temple on Ysolde.", steps: [
["visit", "ysolde", 2, "Walk out to the drowned temple"],
["search", "ysolde", 2, "h8c_temple", "Look about the drowned temple"],
["hold", "ysolde", 2, 2, "Concord marines come for the temple: hold it"],
["gather", "ysolde", 2, 5, "temple-lights", 0x9AE8FF]
],
end: "The temple-lights glow in your hold, cool and blue, burning without fuel. Nobody has told you what Vael wants them for." },
h9b: { n: "Tam", f: "warden", spar: 1, say: "Mother Ilvane's apprentice waits at the Moonwell.", steps: [
["land", "sereth", "Land on Sereth Vale"],
["scene", "sereth", 0, "h9b_tam", "Tam, at the Moonwell"],
["duel", "sereth", 0, "Tam, Ilvane's apprentice", 200, "Get past Tam"],
["search", "sereth", 0, "h9b_trees", "Listen to the trees, the way Tam did"]
],
end: "Tam lies in the moss, alive, staff broken. He watches you go. He does not stop listening to the trees." },
h9c: { n: "The grove", f: "warden", say: "The grove council's seed-keepers stand between you and Ilvane.", steps: [
["scene", "sereth", 2, "h9c_wren", "A child steps out from behind a tree"],
["foes", "sereth", 2, 6, "Seed-keepers and Wardens guard the glade"],
["gather", "sereth", 2, 4, "fallen star-seeds", 0xC8FFB0],
["escort", "sereth", 2, -1, "Wren", 4, "Make sure the child gets home through the fighting"]
],
end: "The glade is trampled. The young trees, a hundred feet tall, are still standing. Mostly." },
h9d: { n: "The Moonwell", f: "warden", say: "Before Ilvane, the Moonwell. It shows everyone something.", steps: [
["visit", "sereth", 0, "Go to the Moonwell at night"],
["search", "sereth", 0, "h9d_well", "Look at the offerings round the Moonwell"],
["scene", "sereth", 0, "h9d_vision", "Look into the water"]
],
end: "Ilvane's lamp is lit in the trees ahead. Whatever the water showed you, you are still the one who has to walk there." }
};
Object.keys(H1).forEach(function (k) { GS_CH[k] = H1[k]; });
Object.keys(H2).forEach(function (k) { GS_CH[k] = H2[k]; });
GS_GATE.h6 = ["h1", "h1b", "h1c", "h2", "h2b", "h2c", "h3", "h3b", "h4", "h4b", "h4c", "h5", "h5b", "h5c"];
GS_GATE.h7 = ["h6", "h6b", "h6c", "h7", "h7b", "h7c", "h8", "h8b", "h8c", "h9", "h9b", "h9c", "h9d"];
})();
GS_SCENES.h7c_durra = { sex: "f", who: "Forge-Mother Durra", where: "The Old Anvil, Kharn", start: "a", nodes: {
a: { t: "Durra walks up to the Old Anvil through the smoke, alone, and puts her hand on the cracked stone. \"Kharn's first forge. You held it once against raiders. Now you hold it against Wardens.\" She looks at you. \"Which time were you right?\"", o: [
["The first time.", "b", "h_mercy_durra"], ["This time.", "c"]
] },
b: { t: "\"Hm.\" She takes her hand off the stone. \"Then there is still a Kharn's work in you. Remember where the forge is.\"" },
c: { t: "\"Hm.\" She turns away. \"Kharn remembers everything. Even when it would rather not.\"" }
} };
GS_SCENES.h4c_kethra = { sex: "f", who: "Mistress Kethra Vahl", where: "The Pit, Nharos", start: "a", nodes: {
a: { t: "Kethra is waiting when you come back. \"You and Aren Marr. Talking.\" Her voice is very soft. \"About his sister, I think.\"", o: [
["We talked about the ember-run.", "b"], ["About his sister. So?", "c"]
] },
b: { t: "\"Of course you did.\" She smiles. \"Be careful, new one. Sisters are how the Order gets its people back. I would hate to lose either of you.\"" },
c: { t: "She looks at you for a long moment. \"Honest. Good. Honest people break cleaner.\" She walks away. You find you are cold, ember or not." }
} };
GS_SCENES.h3_kethra = { sex: "f", who: "Mistress Kethra Vahl", where: "On your comms", start: "a", nodes: {
a: { t: "\"The spire hears everything now. Every prayer on Aster Still. Every lesson.\" A pause. \"They teach the novices to be still. Did you know? We teach ours to burn.\"", o: [["Which is better?", "b"], ["Say nothing.", "c"]] },
b: { t: "\"Burning.\" A very small pause. \"Usually.\"" },
c: { t: "\"Good. You're learning.\"" }
} };
GS_SCENES.h5_vael = { sex: "m", who: "Vael Ashkarran", where: "A voice in your head", start: "a", nodes: {
a: { t: "Pell's Halo goes dark, and Vael is suddenly there, in your head, warm and close. \"Do you know why I chose you? Because you were never afraid of being alone. Everyone else is.\"", o: [["Everyone is.", "b"], ["What do you want from me?", "c"]] },
b: { t: "\"Then you are lying to yourself. Good. The Order lies to itself every day.\" He laughs. \"Now. We take the sky.\"" },
c: { t: "\"Only what you already want. A galaxy that doesn't need a Senate, or an Order, or anyone at all.\" He is gone." }
} };
GS_SCENES.h9_vael = { sex: "m", who: "Vael Ashkarran", where: "A voice in your head", start: "a", nodes: {
a: { t: "\"Ilvane taught me, once. Before Teodric. She will try to make you remember who you were.\" Vael's voice is gentle. \"Remember instead who you are.\"", o: [["Who am I?", "b"], ["What if she's right?", "c", "h_doubt"]] },
b: { t: "\"Mine.\"" },
c: { t: "A long silence in your head. \"Then you will have to choose,\" Vael says at last. \"Everyone does, in the end. Even me.\"" }
} };
GS_CLUES.h3b_watch = [
{ n: "The logbook", t: "Nine winters of marks: the spire blinked every night the Senate's war-council sat. The Iskari knew, and nobody asked them." },
{ n: "A child's drawing", t: "Pinned to the wall: a picture of the sky-lights, and a black ship among them, drawn by a child. Under it: \"bad ship\"." }
];
GS_CLUES.h5c_bench = [
{ n: "Ysra's notes", t: "Battle plans scratched into the wood, angry and honest. She hides nothing. That's why Venn wants her gone." },
{ n: "A rose-thorn", t: "A thorn from her garden caught in the cushion. She prunes roses when she's angry, which is always." }
];
GS_CLUES.h9b_trees = [
{ n: "The wind", t: "The trees are not moving, but you can hear something, very low, under the wind. It sounds like a question." },
{ n: "A sapling", t: "A young tree, grafted once on its own root, long ago, by someone. It is taller than you now." },
{ n: "Tam's staff", t: "The broken staff in the moss. Carved on it, very small: every lesson Ilvane ever gave him." }
];
GS_CLUES.h9d_well = [
{ n: "Old offerings", t: "Seeds, rings, a child's drawing of a star. Generations of Sereth have left things here, asking." },
{ n: "A Warden's mark", t: "Cut into the stone rim, worn almost smooth: a star in a ring. Ilvane has knelt here, many times." },
{ n: "A black feather", t: "A black feather, not burned. Someone from the Hollow knelt here once and did not burn what they left." }
];
GS_WHO_SEX.Wren = "f";
(function () {
var add = function (id, steps) { GS_CH[id].steps = GS_CH[id].steps.concat(steps); };
add("h3", [["call", "h3_kethra", "Kethra calls from Nharos"]]);
add("h5", [["call", "h5_vael", "Vael speaks, in your head"]]);
add("h9", [["call", "h9_vael", "Vael, before Sereth Vale"]]);
})();
function qdS(who, sex, where, a, opts, ends) { var n = { a: { t: a, o: opts.map(function (o, i) { return [o, "e" + i]; }) } }; ends.forEach(function (t, i) { n["e" + i] = { t: t }; }); return { who: who, sex: sex, where: where, start: "a", nodes: n }; }
(function () {
var S = GS_SCENES, K = GS_CLUES, M = GS_MAKE;
S.qd_sereth0 = qdS("Old Fennick, a seed-keeper", "m", "The Moonwell, Sereth Vale", "An old seed-keeper is sitting by the Moonwell with his eyes shut. \"It went quiet the night the black ships passed over. Sang again the moment you brought the moss. Funny, that.\"", ["Do you think it was afraid?", "Is it singing now?"], ["\"Everything was afraid that night. Even the water.\" He smiles. \"Not now. Listen.\"", "\"Hush. Yes. Hear it? Low, like a kettle. That's the first tree drinking.\""]);
K.qd_sereth1 = [{ n: "Poachers' snares", t: "Wire snares set for the little tree-deer. Raider work: they sell the hides off-world." }, { n: "A burnt-out fire", t: "They burned living wood to keep warm. The trees round the camp have pulled their roots back from the ash." }, { n: "A ledger page", t: "\"Hides, 40. Sap, 12 barrels. Buyer: the Ashen Drift.\" The same raiders, everywhere." }];
S.qd_sereth2 = qdS("Ama, a young seed-keeper", "f", "The seed-keepers' glade", "A girl with dirt to her elbows takes the starlight seeds as if they were eggs. \"These are the first glasswing seeds in thirty years. Will you plant one with me? For luck.\"", ["Show me how.", "What do they grow into?"], ["\"Hole, seed, a pinch of moss, water, a song.\" She hums. \"Now it's yours too.\"", "\"Nobody knows. That's the fun of it.\" She digs. \"Hold this.\""]);
M.qd_sereth2 = { n: "A glasswing seedling, planted", parts: ["dig the hole", "set the seed", "a pinch of moon-moss", "water it"], hint: "Ama shows you: dig, seed, moss, water. And hum, she says, but you can skip that if you're shy.", done: "A pale shoot breaks the soil before you have stood up. Ama claps." };
S.qd_sereth3 = qdS("Mother Ilvane", "f", "Sereth Vale", "\"Ormund's storm turned the wrong way because something heavy is moving inside it.\" Ilvane looks at the sky. \"Something that should not be there.\"", ["The raiders?", "Something worse?"], ["\"Raiders are small. This was big.\" She frowns. \"Keep your eyes open, out there.\"", "\"Yes.\" She does not say more, and that is answer enough."]);
S.qd_dunfolk0 = qdS("Sahra Duneborn", "f", "The caravan rest at Sef", "Sahra pours the water you brought into a silver measure, slowly, so nobody misses a drop. \"Glass-water. The sweetest on Dunmarrow.\" She hands the first cup to a child, not to you.", ["The children first. Good.", "Where does the water come from?"], ["\"Always.\" She hands you the second cup. \"And then whoever carried it.\"", "\"Lightning melts the salt, the salt turns to glass, the glass holds the rain. Slowly. Like everything good.\""]);
M.qd_dunfolk0 = { n: "A water-still", parts: ["the glass bowl", "the cloth", "the cold stone", "the cup"], hint: "Caravan folk catch the morning mist: the bowl, a cloth over it, a cold stone in the middle so the water runs down to the cup.", done: "By morning the cup is a third full. Sahra says that is a good still. Your first was worse than hers, she says, and hers was terrible." };
K.qd_dunfolk1 = [{ n: "Digging tools", t: "Off-world digging tools, left in a hurry. Somebody wants what is under the sand." }, { n: "A hull plate", t: "A plate of the buried ship's hull, cut loose. Under the sand on it, a star in a ring." }, { n: "A map", t: "A map of the dunes with the ship marked, and a note: \"glass deeper\"." }];
S.qd_dunfolk2 = qdS("A Senate quartermaster", "m", "Aurelion", "A harassed man in Senate blue signs for the salt without looking at it. \"Dunmarrow salt. The kitchens will be pleased. Nobody else is pleased with anything, this week.\"", ["Bad week?", "The Dunfolk would like paying on time, this year."], ["\"Leaks, rumours, a senator who never smiles.\" He sighs. \"Don't tell anyone I said that.\"", "He actually laughs. \"Fair. Here. On time. Tell Sahra the Senate says thank you, for once.\""]);
S.qd_dunfolk3 = qdS("Caravan-master Kessa", "f", "The caravan rest at Sef", "Kessa counts her beasts as they come in out of the sky-road: every one. \"You kept them all alive. In that sky.\" She spits in the sand, which is how she says thank you.", ["How do beasts fly?", "Who attacks a caravan?"], ["\"Badly, and only in Corvanne's thick air.\" She grins. \"That's why it's the sky-road.\"", "\"Raiders who are hungry. Same as always.\""]);
S.qd_merrowin0 = qdS("The keeper of Lantern Rock", "f", "Lantern Rock, Ysolde", "The old keeper takes the shells you gathered and lays them round the lamp. \"The lamp listens for lies told at sea. Tonight it will hear better.\"", ["Does it really hear lies?", "Has it heard any lately?"], ["\"It hears what people want it to hear. That's close enough.\"", "\"Plenty. Someone on the rafts keeps saying they're a whaler.\" She looks at you. \"They aren't.\""]);
K.qd_merrowin1 = [{ n: "Fake pearls", t: "Painted glass beads, made to look like deep-reef pearls. Somebody is cheating the divers' buyers." }, { n: "A paint-pot", t: "Pearl-paint, Aurelion make. The liars buy it in the Sky Market." }, { n: "A real pearl", t: "One real pearl, hidden in a boot. Stolen from a diver, to copy." }];
S.qd_merrowin1 = qdS("Tobin, a pearl-diver", "m", "The pearl-divers' rafts", "Tobin turns the fake pearls over in his webbed fingers. \"Glass. Painted. They'd have ruined us. Nobody buys from divers who sell glass.\"", ["Now everyone will know.", "Who were they?"], ["\"Thanks to you.\" He tosses the glass into the sea. \"The fish can have it.\"", "\"Off-worlders. Paid by somebody bigger. It's always somebody bigger.\""]);
S.qd_merrowin2 = qdS("Healer Ondessa", "f", "Ysolde", "Ondessa holds one temple-light in her palm. \"They burn without fuel. Nobody knows how. The drowned people did.\" She looks at you. \"Some things should stay a mystery. Some things should not. I can't tell which this is.\"", ["Keep them safe, then.", "Let the Orrem study one."], ["\"Safe.\" She closes her hand. \"Yes. That I can do.\"", "\"The Orrem.\" She thinks. \"Yes. They don't take anything apart. They only listen.\""]);
S.qd_merrowin3 = qdS("Healer Ondessa", "f", "Ysolde", "\"The whales sang all night after you cleared their road.\" Ondessa is smiling. \"They are singing a new song. Tobin says it has your ship in it.\"", ["What does it say?", "Whales sing about ships?"], ["\"Big. Loud. Slow to turn.\" She laughs. \"Whales are not poets.\"", "\"About everything. Mostly food. Sometimes ships.\""]);
M.qd_kharn0 = { n: "A star-iron ingot", parts: ["the ore", "the fire", "the flux", "the mould"], hint: "Durra's forge-hands show you: ore into the fire, flux to draw the dross off, pour it into the mould.", done: "A dull bar, heavier than it looks. In Kharn's pull it is very heavy indeed." };
S.qd_kharn1 = qdS("Forge-guard Brann", "m", "The Old Anvil, Kharn", "A young forge-guard with a split lip is sitting on the cracked Anvil. \"First forge of Kharn. Raiders used it as a cook-fire.\" He spits. \"Thank you for throwing them out.\"", ["You fought well.", "Will it ever be mended?"], ["\"I got hit a lot.\" He grins. \"That's fighting well, in Kharn.\"", "\"No. It's cracked for good. We like it cracked. It reminds us.\""]);
S.qd_kharn2 = qdS("The rig's foreman", "m", "Hammer-watch, Kharn", "The lost rig's foreman shakes your hand so hard your arm hurts for an hour. \"Six weeks in the dark with raiders sniffing round. I'd given up.\"", ["Nobody gives up in Kharn.", "What did they want with a rig?"], ["\"Hah! True. I'd given up a bit, though.\"", "\"The drill-heads. Star-iron tipped. Worth a ship each.\""]);
S.qd_kharn3 = qdS("Forge-Mother Durra", "f", "Kharn's Anvil", "Durra reads the Senate's letter, crumples it, and laughs. \"They want Kharn iron and they want to pay next year. Hah. I'll take this year, in Senate salt. Tell them.\"", ["Is that fair?", "I'll tell them."], ["\"Fair is what both sides grumble at.\" She claps you on the back. \"Go.\"", "\"Good. You're useful. Don't let it go to your head.\""]);
S.qd_wardens0 = qdS("The Hermit", "m", "The Hermit's Cell, Aster Still", "The Hermit pours tea made from the leaves you gathered. It is terrible. \"Teodric used to make it worse.\" He drinks his down. \"Sit. Say nothing. That is the lesson.\"", ["(Say nothing.)", "How long?"], ["You sit. The tea goes cold. After a while, you find you don't mind.", "\"Until you stop asking how long.\""]);
K.qd_wardens1 = [{ n: "A scorched lintel", t: "The door of the First House. Burned, a hundred years ago, by the Hollow. It still smells faintly of smoke." }, { n: "A child's toy", t: "A little wooden starship, painted grey. A novice's, once." }, { n: "The founders' stone", t: "\"We keep the quiet so that others may sleep.\" The first words of the Order." }];
S.qd_wardens2 = qdS("Warden Corvin", "m", "Aster Still", "Corvin turns the outpost's broken lamp in his scarred hands. \"I trained with the Warden who kept that outpost. Pell. No, not the Halo. A woman called Pell. She'd have laughed at that.\"", ["Tell me about her.", "I'm sorry."], ["\"Loud. Kind. Terrible cook.\" He sets the lamp down gently. \"She'd want it kept burning.\"", "\"So am I. Thank you for bringing it home.\""]);
M.qd_wardens3 = { n: "The outpost lamp, relit", parts: ["clean the glass", "new wick", "oil", "the light from the Lantern's heart"], hint: "Corvin says: glass, wick, oil, and last the light you carried back from the Lantern's heart.", done: "The lamp burns pale gold. Corvin hangs it at the Star-stone." };
S.qd_concord0 = qdS("A market warden", "f", "The Sky Market, Aurelion", "The market warden counts the smugglers' crates. \"Every one stamped with a fake Senate seal. Someone is very good at seals.\" She frowns. \"Too good.\"", ["Who makes real seals?", "I'll keep an eye out."], ["\"Pell's Halo seal-works. Only them.\" She lowers her voice. \"Don't say I said so.\"", "\"Do. And watch who in blue is too interested.\""]);
K.qd_concord1 = [{ n: "Wilting terraces", t: "The third terrace's soil is grey and dead. Something leached it." }, { n: "A drain, blocked", t: "Somebody stuffed rags in the terrace drain. The water has been pooling, and rotting the roots." }, { n: "Fresh seedlings", t: "The seedlings you brought, waiting in their trays. They need the drain open." }];
M.qd_concord1 = { n: "The terrace drain, cleared", parts: ["pull the rags", "flush it", "new soil", "plant the seedlings"], hint: "The gardeners say: rags out, flush it clean, new soil, then plant.", done: "Water runs. The seedlings go in. A gardener with a pipe nods at you, which you suspect is high praise." };
S.qd_concord2 = qdS("Herd-Chief Ulvra", "f", "The hunters' camp, Isk", "Ulvra reads the Archive's request for Iskari star-records and snorts. \"The Senate wants our sky. They never asked for our sky before.\"", ["They're asking now.", "What would you want in return?"], ["\"Then they can wait.\" She hands you the records anyway. \"There. Asked nicely. Once.\"", "\"A Senate seat for the Iskari.\" She laughs at your face. \"Joking. A hundred barrels of fuel, and a thank-you letter.\""]);
S.qd_concord3 = qdS("First Speaker Amaranth", "f", "The Old Senate, Aurelion", "Amaranth meets you in the Old Senate, among the ruins. \"The Beacon held. Thank you.\" She touches a broken pillar. \"We keep this ruined so we remember we can fall.\"", ["Are you afraid of falling?", "It's a good reminder."], ["\"Every day.\" She smiles, tiredly. \"That's the job.\"", "\"Yes. Somebody in the new Senate has forgotten it, I think.\""]);
S.qd_iskari0 = qdS("Kolka, an old hunter", "m", "The hunters' camp, Isk", "Kolka holds the wreck's crystals to the fire. \"Wardens. I saw them die out there, when I was a boy. Standing in the cold, so the black ships couldn't land.\"", ["Thank you for remembering them.", "Why did they do it?"], ["\"Someone has to.\" He puts the crystals in your hand. \"Now you do too.\"", "\"So we could live.\" He shrugs. \"Wardens are strange.\""]);
M.qd_iskari1 = { n: "A fire that never goes out", parts: ["woolmoth fat", "the ice-cave moss", "the stone ring", "the old ember"], hint: "Kolka shows you how the Iskari keep a fire alive through the long night: fat, moss, the stone ring round it, and an ember from the old fire to start it.", done: "The new fire catches from the old one. The hunters cheer, and pass round something that burns worse than the fire." };
S.qd_iskari2 = qdS("A young watcher", "f", "Aurora watch, Isk", "A young Iskari watcher is writing in a logbook by the great lens. \"The sky-lights were wrong tonight. Something moving in them. Then you flew up and it ran.\"", ["What do you write in that book?", "Keep watching."], ["\"Everything. Every light, every night. My grandmother started it.\"", "\"Always.\" She dips her pen. \"Someone should.\""]);
S.qd_iskari3 = qdS("Forge-Mother Durra", "f", "Kharn's Anvil", "Durra tries on the woolmoth-fur cloak the Iskari sent and grunts. \"Warm. Too warm. Kharn is hot already.\" She keeps it on anyway. \"Tell Ulvra the Kharn say thank you. Tell her in those words. We don't say them often.\"", ["I'll tell her.", "You look good in it."], ["\"Good.\"", "She looks at you for a long time. Then she laughs so hard the forge-guards come running."]);
S.qd_unhollowed0 = qdS("Sera Vant", "f", "Nharos", "Sera turns a cage key over and over. \"I was in those pits, once. Before I ran.\" She hands the key back. \"Keep it. Remember there were pits.\"", ["I will.", "How did you get out?"], ["\"Good.\"", "\"I gave up waiting to be rescued.\" She almost smiles. \"Then someone rescued me anyway. Funny.\""]);
K.qd_unhollowed1 = [{ n: "Seven name-tags", t: "Seven Concord crew tags, scattered in the ash round the cutter." }, { n: "The flight-deck", t: "The pilot turned the cutter away from the Unhollowed camp before it hit. On purpose." }, { n: "A last log", t: "\"Coming in to lift the Unhollowed out. Hollow on our tail. Tell Da...\"" }];
S.qd_unhollowed2 = qdS("Sera Vant", "f", "On your comms", "\"The spire's down? Good.\" Sera's voice is flat. \"It listened to us for years. Every word we said in the camp. Now we can talk.\" A pause. \"Strange. I don't know what to say.\"", ["Say anything.", "Say thank you."], ["\"Anything.\" She laughs, startled. \"There. I said it.\"", "\"...Thank you.\" It sounds rusty. \"Like that?\""]);
S.qd_unhollowed3 = qdS("Elder Warden Teodric", "m", "Aster Still", "Teodric looks at the broken Warden's blade you brought from the Shatterline. \"Ressen. He went to stop the Hollow alone, twenty years ago.\" He is quiet. \"He always did things alone.\"", ["He shouldn't have.", "Was he brave?"], ["\"No. Nobody should.\" He looks at you. \"Remember that, when your turn comes.\"", "\"Very. And very foolish. They usually come together.\""]);
S.qd_drifters0 = qdS("Captain Rook", "f", "The Driftward", "\"Lights under Umbra's ice. You found them.\" Rook unrolls a chart. \"A trapped Drifter ship, a hundred years old. Its crew are still alive, in cold-sleep. We'll fetch them.\"", ["A hundred years?", "Can I help?"], ["\"Drifters don't die. We just get very, very late.\"", "\"You already did. Now let us do the rest.\""]);
M.qd_drifters1 = { n: "A mended water-pump", parts: ["the cracked pipe", "the seal", "the pump-wheel", "prime it"], hint: "The hauler's engineer talks you through it: the pipe, a new seal, the wheel back on, then prime it.", done: "Water gushes. Somewhere on the Driftward, forty thousand people will have baths tonight." };
S.qd_drifters2 = qdS("Captain Rook", "f", "The Driftward", "Rook goes through your trade-book. \"Dunmarrow salt, Kharn iron, Iskari fur. And back again.\" She grins. \"You'd make a Drifter. Almost. You don't haggle.\"", ["Haggling's rude.", "Teach me."], ["\"Haggling's love.\" She shakes her head. \"You'll learn.\"", "\"First lesson: never say the first number.\" She looks at you. \"You just did. Lesson over.\""]);
S.qd_drifters3 = qdS("Captain Rook", "f", "The Driftward", "The whole Driftward is moving, slowly, a thousand ships turning at once. Rook is on the bridge, happy as a child. \"Forty years in one orbit. Now look at us.\"", ["Where are you going?", "It's beautiful."], ["\"Somewhere new. That's the point.\"", "\"It's a junkyard with engines.\" She is grinning. \"Yes. Beautiful.\""]);
var add = function (p, i, steps) { var Q = GX_QUESTS[p] && GX_QUESTS[p].q[i]; if (Q)
Q.steps = Q.steps.concat(steps); };
add("sereth", 0, [["scene", "sereth", 0, "qd_sereth0", "An old seed-keeper is listening at the Moonwell"], ["race", "sereth", 0, 8, 45, "Run the ring of moonstones round the well, the old game of the seed-keepers' children"]]);
add("sereth", 1, [["search", "sereth", 1, "qd_sereth1", "Look round the poachers' camp"], ["gather", "sereth", 1, 5, "poachers' snares", 0xB8B0A0], ["talk", "sereth", "Tell Ilvane what the poachers were selling"]]);
add("sereth", 2, [["scene", "sereth", 2, "qd_sereth2", "A young seed-keeper wants to plant one with you"], ["make", "sereth", 2, "qd_sereth2", "Plant a glasswing seed"], ["gather", "sereth", 2, 4, "windfall seed-pods", 0xC8FFB0]]);
add("sereth", 3, [["call", "qd_sereth3", "Ilvane calls: the storm turned the wrong way"], ["visit", "sereth", 0, "Go to the Moonwell and watch the storm in the water"]]);
add("dunfolk", 0, [["scene", "dunmarrow", 1, "qd_dunfolk0", "Sahra pours out the glass-water"], ["make", "dunmarrow", 1, "qd_dunfolk0", "Build a water-still, the caravan way"], ["talk", "dunfolk", "Show Sahra your still"]]);
add("dunfolk", 1, [["search", "dunmarrow", 2, "qd_dunfolk1", "Look round the buried ship"], ["foes", "dunmarrow", 2, 4, "The diggers come back with friends: hold the ship"]]);
add("dunfolk", 2, [["scene", "aurelion", -1, "qd_dunfolk2", "Hand the salt to the Senate's quartermaster"], ["escort", "dunmarrow", 3, 1, "A salt-cutter, Bel", 4, "Walk the salt-cutter Bel back to Sef with the Senate's pay"], ["talk", "dunfolk", "Give Sahra the Senate's thanks"]]);
add("dunfolk", 3, [["scene", "dunmarrow", 1, "qd_dunfolk3", "Kessa counts her beasts in"], ["race", "dunmarrow", 1, 9, 50, "The caravan children's race round the rest: they dare you"], ["gather", "dunmarrow", 1, 4, "dropped water-skins", 0xC8A878]]);
add("merrowin", 0, [["scene", "ysolde", 0, "qd_merrowin0", "The keeper of Lantern Rock"]]);
add("merrowin", 1, [["search", "ysolde", 1, "qd_merrowin1", "Find out how they were cheating"], ["scene", "ysolde", 1, "qd_merrowin1", "Show Tobin what you found"], ["talk", "merrowin", "Tell Ondessa the rafts are honest again"]]);
add("merrowin", 2, [["call", "qd_merrowin2", "Ondessa calls about the temple-lights"], ["visit", "ysolde", 2, "Return one temple-light to the drowned temple"]]);
add("merrowin", 3, [["scene", "ysolde", -1, "qd_merrowin3", "Ondessa has news of the whales"], ["visit", "ysolde", 0, "Climb Lantern Rock and listen for the whales"]]);
add("kharn", 0, [["make", "kharn", -1, "qd_kharn0", "Smelt the ore into an ingot at the Great Forge"], ["race", "kharn", 0, 8, 60, "Carry the ingot round Slag Rise's rings in Kharn's pull: the forge-hands' test"]]);
add("kharn", 1, [["scene", "kharn", 1, "qd_kharn1", "A young forge-guard who fought beside you"], ["gather", "kharn", 1, 5, "raiders' cook-pots", 0x8A8070], ["talk", "kharn", "Tell Durra the Anvil is clear"]]);
add("kharn", 2, [["scene", "kharn", 2, "qd_kharn2", "The rig's foreman"], ["escort", "kharn", 2, 0, "The rig's foreman", 4, "Walk the foreman home to Slag Rise"]]);
add("kharn", 3, [["call", "qd_kharn3", "Durra's answer to the Senate"], ["land", "aurelion", "Carry Durra's answer to Aurelion"], ["talk", "concord", "Give the First Speaker Kharn's terms"]]);
add("wardens", 0, [["scene", "aster", 0, "qd_wardens0", "Drink the Hermit's tea"], ["visit", "aster", 3, "Sit at the Star-stone through the dusk"]]);
add("wardens", 1, [["search", "aster", 1, "qd_wardens1", "Look round the ruins of the First House"], ["talk", "wardens", "Tell Teodric what you found"]]);
add("wardens", 2, [["scene", "aster", -1, "qd_wardens2", "Corvin knew the outpost's keeper"], ["gather", "aster", 2, 4, "orchard blossoms", 0xFFE0F0]]);
add("wardens", 3, [["make", "aster", 3, "qd_wardens3", "Relight the outpost's lamp at the Star-stone"], ["foes", "aster", 3, 4, "Hollow watchers come for the light: hold the Star-stone"], ["talk", "wardens", "Tell Teodric the lamp is lit"]]);
add("concord", 0, [["scene", "aurelion", 1, "qd_concord0", "The market warden counts the crates"], ["gather", "aurelion", 1, 4, "fake seals", 0xFFE070], ["talk", "concord", "Bring the fake seals to the First Speaker"]]);
add("concord", 1, [["search", "aurelion", 0, "qd_concord1", "Find out why the terraces are dying"], ["make", "aurelion", 0, "qd_concord1", "Clear the drain and plant the seedlings"], ["talk", "concord", "Tell the First Speaker the gardens will live"]]);
add("concord", 2, [["scene", "isk", 1, "qd_concord2", "Ask Ulvra for the Iskari sky-records"], ["land", "aurelion", "Carry the records to Aurelion"], ["talk", "concord", "Give the records to the Archive's keeper"]]);
add("concord", 3, [["scene", "aurelion", 2, "qd_concord3", "Amaranth meets you in the Old Senate"]]);
add("iskari", 0, [["scene", "isk", 1, "qd_iskari0", "Old Kolka saw the Wardens die"]]);
add("iskari", 1, [["make", "isk", 1, "qd_iskari1", "Light the new hunters' fire from the old one"], ["talk", "iskari", "Tell Ulvra the fire is lit"]]);
add("iskari", 2, [["scene", "isk", 3, "qd_iskari2", "A young watcher keeps the sky-logbook"], ["gather", "isk", 3, 4, "frost-crystals for the lens", 0xA8D8FF], ["visit", "isk", 3, "Look through the lens with her"]]);
add("iskari", 3, [["scene", "kharn", -1, "qd_iskari3", "Durra tries on the woolmoth cloak"], ["land", "isk", "Fly back to Isk"], ["talk", "iskari", "Give Ulvra the Kharn's thanks, in their words"]]);
add("unhollowed", 0, [["scene", "nharos", -1, "qd_unhollowed0", "Sera Vant and the cage key"]]);
add("unhollowed", 1, [["search", "nharos", 3, "qd_unhollowed1", "Search the fallen cutter"], ["gather", "nharos", 3, 4, "crew tags", 0xC8C8D0], ["talk", "unhollowed", "Bring the tags to Sera Vant"]]);
add("unhollowed", 2, [["call", "qd_unhollowed2", "Sera Vant calls: the spire is down"], ["land", "nharos", "Land on Nharos"], ["talk", "unhollowed", "See the camp talk freely"]]);
add("unhollowed", 3, [["scene", "aster", -1, "qd_unhollowed3", "Teodric knew the broken Warden"], ["visit", "aster", 2, "Plant the broken blade in the Orchard of Quiet"]]);
add("drifters", 0, [["scene", "driftward", -1, "qd_drifters0", "Rook has a chart"], ["win", "wanderers", "Raiders want the cold-sleep ship too: beat them"], ["talk", "drifters", "Tell Rook the sleepers are safe"]]);
add("drifters", 1, [["make", "driftward", -1, "qd_drifters1", "Mend the hauler's water-pump"], ["talk", "drifters", "Tell Rook the water's flowing"]]);
add("drifters", 2, [["scene", "driftward", -1, "qd_drifters2", "Rook looks over your trade-book"]]);
add("drifters", 3, [["scene", "driftward", -1, "qd_drifters3", "On the bridge with Rook as the fleet turns"], ["fly", "wanderers", "umbralight", "Fly alongside the Driftward as it leaves Umbra"]]);
GS_WHO_SEX["A salt-cutter, Bel"] = "f";
GS_WHO_SEX["The rig's foreman"] = "m";
})();
(function () {
var sl = gqStepLine;
gqStepLine = function (st) { if (st && GD_KINDS.test(st[0]) && st[0] !== "land")
return gsLine(st); return sl.apply(this, arguments); };
})();
