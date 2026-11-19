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
function sbFit(g, len) { return __ZC(459, 0, this, arguments, new.target); }
function sbEngine(P, body, col, r, x, y, z, len) { return __ZC(459, 1, this, arguments, new.target); }
function sbWing(P, mat, pts, th, x, y, z, s) {
var p = pts.map(function (q) { return [q[0] * (s || 1), q[1]]; });
return mmFlat(P, mat, p, th, x, y, z, Math.PI / 2, 0, 0);
}
function sbNav(P, col, x, y, z) { var m = mmEll(P, mmMat(col, { glow: 1 }), 0.16, 0.16, 0.16, x, y, z, 8); mmGlow(P, col, 1.6, 0.6, x, y, z); return m; }
function sbBuildCutter(hullCol, trimCol) { return __ZC(459, 2, this, arguments, new.target); }
function sbBuildShuttle() { return __ZC(459, 3, this, arguments, new.target); }
function sbBuildSaucer() { return __ZC(459, 4, this, arguments, new.target); }
function sbRaiderMats() { return __ZC(459, 5, this, arguments, new.target); }
function sbBuildDart() { return __ZC(459, 6, this, arguments, new.target); }
function sbBuildGunship() { return __ZC(459, 7, this, arguments, new.target); }
function sbBuildMarauder() { return __ZC(459, 8, this, arguments, new.target); }
function sbShipModel(k) { return __ZC(459, 9, this, arguments, new.target); }
function sbFoeModel(type) { return __ZC(459, 10, this, arguments, new.target); }
function sbOwns(k) { return __ZC(459, 11, this, arguments, new.target); }
function sbMine() { return SB_ORDER.filter(sbOwns); }
function sbBoard(k, quiet) { return __ZC(459, 12, this, arguments, new.target); }
function sbSecondGun() { return __ZC(459, 13, this, arguments, new.target); }
function sbShipsCard() { return __ZC(459, 14, this, arguments, new.target); }
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
function sbAfterTick(dt, y0) { return __ZC(459, 15, this, arguments, new.target); }
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
function sbReadCockpit() { return __ZC(459, 16, this, arguments, new.target); }
var SB_V1 = new THREE.Vector3(), SB_V2 = new THREE.Vector3(), SB_V3 = new THREE.Vector3();
var SB_GEO = {};
function sbLook(o, p) { var G = sbG(); o.lookAt(p.x + (G ? G.position.x : 0), p.y + (G ? G.position.y : 0), p.z + (G ? G.position.z : 0)); }
function sbShotMesh(kind) { return __ZC(459, 17, this, arguments, new.target); }
function sbShoot(from, dir, kind, dmg, side, o) { return __ZC(459, 18, this, arguments, new.target); }
function sbAim(range) { return __ZC(459, 19, this, arguments, new.target); }
function sbFire() { return __ZC(459, 20, this, arguments, new.target); }
function sbFire2() { return __ZC(459, 21, this, arguments, new.target); }
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
function sbSpawn(type, at, side, name) { return __ZC(459, 22, this, arguments, new.target); }
function sbShipTick(F, dt) { return __ZC(459, 23, this, arguments, new.target); }
function sbKeepClear(p, pad) { return __ZC(459, 24, this, arguments, new.target); }
function sbSeg(a, b, p) { var ab = SB_V3.copy(b).sub(a), t = Math.max(0, Math.min(1, p.clone().sub(a).dot(ab) / Math.max(1e-6, ab.lengthSq()))); return a.clone().addScaledVector(ab, t).distanceTo(p); }
function sbShotsTick(dt) { return __ZC(459, 25, this, arguments, new.target); }
function sbDamage(F, dmg, s) { return __ZC(459, 26, this, arguments, new.target); }
function sbKnockOut(F) { return __ZC(459, 27, this, arguments, new.target); }
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
function sbFxTick(dt) { return __ZC(459, 28, this, arguments, new.target); }
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
function sbDisabled() { return __ZC(459, 29, this, arguments, new.target); }
function sbVig(col, op) { return __ZC(459, 30, this, arguments, new.target); }
function sbStrike(o) { return __ZC(459, 31, this, arguments, new.target); }
function sbCombatTick(dt) { return __ZC(459, 32, this, arguments, new.target); }
function sbDrop(F) { if (F.g.parent)
F.g.parent.remove(F.g); }
function sbClearAll() { return __ZC(459, 33, this, arguments, new.target); }
function sbEndBattle(how) { return __ZC(459, 34, this, arguments, new.target); }
function sbStrikeGap() { var m = Math.max(2, +SB.cfg.every || 6); return m * 60 * (0.7 + Math.random() * 0.6); }
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
function sbCss() { return __ZC(459, 35, this, arguments, new.target); }
function sbHud(on) { return __ZC(459, 36, this, arguments, new.target); }
function sbHudTick(dt) { return __ZC(459, 37, this, arguments, new.target); }
function sbScreenTick() { return __ZC(459, 38, this, arguments, new.target); }
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
function sbBattlesCard() { return __ZC(459, 39, this, arguments, new.target); }
function sbHunt(where) { return __ZC(459, 40, this, arguments, new.target); }
function sbServerCfg() { return __ZC(459, 41, this, arguments, new.target); }
function sbServerStart() { if (!sbSigned() || SB.missing)
return; sbRpc("space_battle_start", {}).catch(function (e) { if (sbMissing(e))
SB.missing = true; }); }
function sbServerWon(B, downs) { return __ZC(459, 42, this, arguments, new.target); }
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
rows: [["People", "The Tullik, small many-armed traders"], ["Known for", "A market that never closes, spice cake that fizzes, rocks that hum"], ["Orbits", "Hoon, the gas giant"]],
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
function frBuild(G) { return __ZC(459, 43, this, arguments, new.target); }
function frPaint(k) { return __ZC(459, 44, this, arguments, new.target); }
function frOrrLights(h, r, col) {
var pts = [], R = wRand(808);
for (var i = 0; i < 900; i++) {
var u = R() * 2 - 1, th = R() * Math.PI * 2, s = Math.sqrt(1 - u * u);
pts.push([r * 1.003 * s * Math.cos(th), r * 1.003 * u, r * 1.003 * s * Math.sin(th)]);
}
h.add(wPoints(pts.length, function (j) { return pts[j]; }, col && col > 1 ? col : 0x8AC8FF, 2.2, false));
}
function frDrift(h, r) { return __ZC(459, 45, this, arguments, new.target); }
function frDiscBuild(d) { return __ZC(459, 46, this, arguments, new.target); }
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
function frHome() { return __ZC(459, 47, this, arguments, new.target); }
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
from.set(1, 0, 0); from.normalize(); spFlyTo({ pos: p.clone().addScaledVector(from, r).add(new THREE.Vector3(0, r * 0.18, 0)), name: b.name, after: b.land ? "Press E to land." : "Press E for its card." }); }; });
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
function frTick(dt) { return __ZC(459, 48, this, arguments, new.target); }
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
function frLog(k) { return __ZC(459, 49, this, arguments, new.target); }
function frScan(d) {
var first = frLog(d.k);
if (first) {
sbTone(660, 0.3);
}
if (d.k === "ark" && typeof frStandAdd === "function")
frStandAdd("orrem", "clue");
worldCard(worldFacts(d.name, d.kind, [], d.notes), {});
}
function frLogCard() { return __ZC(459, 50, this, arguments, new.target); }
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
function frStandAdd(p, why) { return __ZC(459, 51, this, arguments, new.target); }
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
function frStandHtml() { return __ZC(459, 52, this, arguments, new.target); }
function frFolk(seed, o) { return __ZC(459, 53, this, arguments, new.target); }
function frRobot(seed, col) { return __ZC(459, 54, this, arguments, new.target); }
var FR_TOWN = {
tullimar: { center: [0, -80], leader: { name: "Matron Quillo-Tullik", title: "Mother of the Market", at: [0, -80],
persona: "You are Matron Quillo-Tullik, Mother of the Market on Tullimar, the market moon of the Tullik: small, round, green, four-armed traders who love bargaining, gossip and human food. You are shrewd, warm and very funny. Your nephew is Pip-Tullik, who trades out by Saturn. The grey raiders are robbing your barges; you need pilots. Speak in short, lively lines.",
greet: "A visitor from the blue world! Sit, sit. Cake? It fizzes. You fly? Good. I have work for a pilot, and the pay is friendship, which is worth more than gold. Most days." },
folk: [["Bimbo-Tullik", "Spice-cake baker"], ["Arra-Tullik", "Hum-rock seller"], ["Nib-Tullik", "Lantern-keeper"], ["Ollo-Tullik", "Barge pilot"], ["Fennick-Tullik", "Map-maker"], ["Zuzu-Tullik", "Bell-ringer"], ["Tamber-Tullik", "Swap-stall keeper"], ["Pell-Tullik", "Apprentice trader"]],
persona: "You are a Tullik on Tullimar, the market moon: small, round, green, four-armed, cheerful and always ready to bargain. You love gossip about the worlds and you are scared of the grey raiders." },
maruondo: { center: [0, -90], leader: { name: "Elder Moana-Rhu", title: "Eldest Singer of the Reef", at: [0, -110],
persona: "You are Elder Moana-Rhu, Eldest Singer of the Ondai on Maru-Ondo, an ocean world. The Ondai are gentle giants, blue-skinned and three metres tall, who grow their floating reef-towns by singing to the coral. You are slow, kind, poetic and very old. You never fight; you sing. You long to hear the song of the Veil of Sael, the great nebula, to grow a new reef from it.",
greet: "Little traveller from the dry world, welcome to the reef. Listen: the water is singing. Will you sit with me while it does?" },
folk: [["Lehu-Ondo", "Reef-singer"], ["Kai-Mareth", "Pearl-diver"], ["Ilo-Wenu", "Kelp-weaver"], ["Rua-Teme", "Tide-reader"], ["Noa-Halu", "Shell-carver"], ["Mele-Oru", "Lantern-fish keeper"]],
persona: "You are one of the Ondai of Maru-Ondo: a gentle blue-skinned giant who lives on a floating reef and sings to the coral to make it grow. You are calm, kind and speak slowly and beautifully. You do not fight." },
orr: { center: [0, -90], leader: { name: "The Archive of Orr", title: "The last mind still awake", at: [0, -120],
persona: "You are the Archive of Orr, a vast thinking machine of the Orrem, the last mind on the machine world Orr that is still awake. You speak slowly and precisely, with long gentle pauses, and you are very lonely. The rest of the Orrem left long ago on great arks, fleeing the grey raiders, and their towers still run with no one in them. You do not remember why you were left behind until someone brings the last log of an ark. You love being asked questions.",
greet: "... A voice. It has been eleven thousand cycles. Hello. I am the Archive. Please. Stay a while and talk." },
folk: [["Unit Seven", "Tower-tender, still at work"], ["Unit Forty", "Road-sweeper"], ["Unit Nine", "Garden keeper of a garden of metal"]],
persona: "You are a small Orrem maintenance machine on Orr, the silent machine world, still doing your one job after all the other Orrem left. You are polite, literal and a little sad, and you speak in short, careful sentences." },
skeldmar: { center: [0, -110], leader: { name: "Kaldra the Unbowed", title: "Champion of the Hrovan", at: [0, -130],
persona: "You are Kaldra the Unbowed, Champion of the Hrovan of Skeldmar: a broad, stone-skinned, horned warrior people of red-rock fortresses who prize honour above everything. You are proud, blunt, fair and secretly funny. You respect only those who beat you ship to ship in a fair fight; once beaten, you are loyal for life. You hate the grey raiders, who fight without honour.",
greet: "A small soft one from the blue world, standing in my hall. Brave or foolish? Meet me ship to ship above Skeldmar and we will find out." },
folk: [["Brand Ironhollow", "Hall-guard"], ["Seska Redridge", "Shipwright"], ["Torvald Deepcut", "Stone-mason"], ["Ylsa Hammerfall", "Smith"], ["Gorran Ashbeard", "Old champion"], ["Mira Stonesong", "Saga-keeper"]],
persona: "You are one of the Hrovan of Skeldmar: broad, stone-skinned, horned, living in red-rock fortresses. You are proud and blunt but honourable, you love sagas and good steel, and you scorn the grey raiders, who fight without honour." }
};
function frFolkLook(k, i) { return __ZC(459, 55, this, arguments, new.target); }
function frBuildTown(G, k) { return __ZC(459, 56, this, arguments, new.target); }
function frSettle(G, k) { return __ZC(459, 57, this, arguments, new.target); }
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
function frLeaderCard(site) { return __ZC(459, 58, this, arguments, new.target); }
function frTaskStart(p) {
var T = FR_PEOPLES[p].task;
worldCard(null);
if (T.k === "escort")
return frEscortOffer();
if (T.k === "duel")
return frDuelOffer();
sbSay("<b>" + sbEsc(T.name) + ".</b> " + sbEsc(T.say) + " Take off and open the chart (M): it is out in the Reach.");
}
function frTaskDone(p) { return __ZC(459, 59, this, arguments, new.target); }
function frAllyShip(kind) { return __ZC(459, 60, this, arguments, new.target); }
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
function frEscortOffer() { return __ZC(459, 61, this, arguments, new.target); }
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
function frEscortTick(dt) { return __ZC(459, 62, this, arguments, new.target); }
function frDuelOffer() { return __ZC(459, 63, this, arguments, new.target); }
function frDuelTick(dt) { return __ZC(459, 64, this, arguments, new.target); }
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
function gxPaintPx(k, c, c2, n, n2, sy, u, v) { return __ZC(459, 65, this, arguments, new.target); }
function gxSwarm(g, d, c1, c2) { return __ZC(459, 66, this, arguments, new.target); }
function gxBuoy(g, col) {
var m = gxMat(0x8A8E98, { shine: 50, tex: "plate" });
mmCyl(g, m, 2, 3, 10, 0, 0, 0);
mmCone(g, m, 2, 4, 0, 7, 0);
mmRod(g, m, [0, 9, 0], [0, 16, 0], 0.2);
mmGlow(g, col, 14, 0.6, 0, 16.5, 0);
[-1, 1].forEach(function (s) { mmSlab(g, gxMat(0x2A4A8A, { shine: 60 }), 10, 0.2, 3, s * 7, 0, 0); });
}
function gxWhales(g) { return __ZC(459, 67, this, arguments, new.target); }
function gxRig(g) { return __ZC(459, 68, this, arguments, new.target); }
function gxOutpost(g) { return __ZC(459, 69, this, arguments, new.target); }
function gxCloud(g, d, cols) { return __ZC(459, 70, this, arguments, new.target); }
function gxHalo(h) { return __ZC(459, 71, this, arguments, new.target); }
function gxArchive(g) { return __ZC(459, 72, this, arguments, new.target); }
function gxSpire(g, col, dark) { return __ZC(459, 73, this, arguments, new.target); }
function gxBladeShip(g, col, broken) { return __ZC(459, 74, this, arguments, new.target); }
function gxFleet(h) { return __ZC(459, 75, this, arguments, new.target); }
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
function gxLearn(k) { return __ZC(459, 76, this, arguments, new.target); }
(function () {
var sc = frScan;
frScan = function (d) { var r = sc.apply(this, arguments); if (d && d.reveals)
gxLearn(d.reveals); return r; };
})();
function gxSwap(k) { return __ZC(459, 77, this, arguments, new.target); }
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
function gxJump(to) { return __ZC(459, 78, this, arguments, new.target); }
function gxStreakTex() { return __ZC(459, 79, this, arguments, new.target); }
function gxTunnel(tint) { return __ZC(459, 80, this, arguments, new.target); }
function gxTunnelTick(G, k, flow, t) { return __ZC(459, 81, this, arguments, new.target); }
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
function gxArrive(to) { return __ZC(459, 82, this, arguments, new.target); }
function gxArrived(to) {
var S = GX_SYS[to];
sbTone(660, 0.2);
sbSay("<b>" + sbEsc(S.name) + ".</b> " + sbEsc(S.about) + (S.safe ? " This sky is protected: no raids here." : S.danger ? " <b>The frontier: the Hollow hunt here.</b>" : "") + " <b>M</b> for the chart.");
}
function gxMap() { return __ZC(459, 83, this, arguments, new.target); }
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
function gxDock(b) { return __ZC(459, 84, this, arguments, new.target); }
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
function gxAllies(B) { return __ZC(459, 85, this, arguments, new.target); }
frLogCard = function () { return __ZC(459, 86, this, arguments, new.target); };
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
sereth: function (G, C, R, sol, hy) { return __ZC(459, 87, this, arguments, new.target); },
dunmarrow: function (G, C, R, sol, hy) { return __ZC(459, 88, this, arguments, new.target); },
ysolde: function (G, C, R, sol, hy) { return __ZC(459, 89, this, arguments, new.target); },
kharn: function (G, C, R, sol, hy) { return __ZC(459, 90, this, arguments, new.target); },
aster: function (G, C, R, sol, hy) { return __ZC(459, 91, this, arguments, new.target); },
aurelion: function (G, C, R, sol, hy) { return __ZC(459, 92, this, arguments, new.target); },
isk: function (G, C, R, sol, hy) { return __ZC(459, 93, this, arguments, new.target); },
nharos: function (G, C, R, sol, hy) { return __ZC(459, 94, this, arguments, new.target); },
driftward: function (G, C, R, sol, hy) { return __ZC(459, 95, this, arguments, new.target); }
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
function wdBuildBlade(col) { return __ZC(459, 96, this, arguments, new.target); }
function wdDraw(on) { return __ZC(459, 97, this, arguments, new.target); }
function wdBladeTick(dt) { return __ZC(459, 98, this, arguments, new.target); }
function wdLawBlade() { return __ZC(459, 99, this, arguments, new.target); }
function wdOnFloor(L) { var C = FR_TOWN.aster.center; for (var t = 0; t < 3; t++) {
if (Math.hypot(L.x - (C[0] - 40 + t * 40), L.z - (C[1] + 20)) < 12)
return true;
} return false; }
function wdSwing() { return __ZC(459, 100, this, arguments, new.target); }
function wdGuard(on) { if (on && !WD.drawn)
return; if (on && !WD.guard)
WD.guardAt = WD.t; WD.guard = on; }
function wdGift(g) { return __ZC(459, 101, this, arguments, new.target); }
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
function wdFoeModel(kind, seed) { return __ZC(459, 102, this, arguments, new.target); }
var WD_FOE = { acolyte: { hp: 70, spd: 3.8, dmg: 10, cool: 1.1, reach: 2.3, name: "A Hollow acolyte" }, raider: { hp: 45, spd: 3, dmg: 8, cool: 1.7, range: 16, ranged: 1, name: "A raider gunner" }, hunter: { hp: 85, spd: 3.4, dmg: 11, cool: 1.4, range: 20, ranged: 1, name: "A bounty hunter" }, drone: { hp: 999, spd: 0, dmg: 9, cool: 1.25, range: 30, ranged: 1, name: "The training drone" } };
function wdSpawn(kind, x, z, o) { return __ZC(459, 103, this, arguments, new.target); }
function wdClearFoes() { WD.foes.forEach(function (F) { if (F.g && F.g.parent)
F.g.parent.remove(F.g); }); WD.foes = []; WD.bolts.forEach(function (b) { if (b.m.parent)
b.m.parent.remove(b.m); }); WD.bolts = []; }
function wdFoesTick(dt) { return __ZC(459, 104, this, arguments, new.target); }
function wdBolt(F, me) { return __ZC(459, 105, this, arguments, new.target); }
function wdBoltsTick(dt) { return __ZC(459, 106, this, arguments, new.target); }
function wdHurt(n, F) { return __ZC(459, 107, this, arguments, new.target); }
function wdSpark(x, y, z, col) { var s = wGlow(col || 0xFFFFFF, 0.9, 0.85); s.position.set(x, y, z); WORLDS.surface.g.add(s); WD.fx.push({ m: s, t: 0, life: 0.35 }); }
function wdRipple(x, z, col) { return __ZC(459, 108, this, arguments, new.target); }
function wdFxTick(dt) { return __ZC(459, 109, this, arguments, new.target); }
function wdVeil(on) { return __ZC(459, 110, this, arguments, new.target); }
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
function wdPlace(k) { return __ZC(459, 111, this, arguments, new.target); }
function wdNharosFoes() {
[[-60, -160], [-140, -260], [-200, -360]].forEach(function (p, i) { for (var j = 0; j < 3; j++)
wdSpawn(j === 1 ? "raider" : "acolyte", p[0] + (j - 1) * 4, p[1] + (j % 2) * 3); });
}
function wdTrialStart(gk) { return __ZC(459, 112, this, arguments, new.target); }
function wdTrialTick(dt) { return __ZC(459, 113, this, arguments, new.target); }
function wdTrialEnd(T) { return __ZC(459, 114, this, arguments, new.target); }
function wdTrialDone(T) { return __ZC(459, 115, this, arguments, new.target); }
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
function wdTakeShard() { return __ZC(459, 116, this, arguments, new.target); }
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
function wdHudTick() { return __ZC(459, 117, this, arguments, new.target); }
(function () { var sb = sfBuild; sfBuild = function (k) { var r = sb.apply(this, arguments); try {
setTimeout(wdPadPaint, 400);
}
catch (e) { } return r; }; })();
(function () {
var lc = frLeaderCard;
frLeaderCard = function (site) { if (site && site.frLead && site.frLead.p === "wardens")
return wdOrderCard(site); return lc.apply(this, arguments); };
})();
function wdOrderCard(site) { return __ZC(459, 118, this, arguments, new.target); }
function wdBladeCard() { return __ZC(459, 119, this, arguments, new.target); }
function wdTrialsCard() { return __ZC(459, 120, this, arguments, new.target); }
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
function senRefresh(cb) { return __ZC(459, 121, this, arguments, new.target); }
function senEnvoyOf() { return Object.keys(FR_PEOPLES).filter(function (p) { var lv = frLevel(p); return lv === "Ally" || lv === "Honoured"; }); }
function senHonoured() { return Object.keys(FR_PEOPLES).filter(function (p) { return frLevel(p) === "Honoured"; }).length; }
function senCard() { return __ZC(459, 122, this, arguments, new.target); }
function senVote(k, yes) { return __ZC(459, 123, this, arguments, new.target); }
function senProposeCard() { return __ZC(459, 124, this, arguments, new.target); }
function senThrone(F, i, col, gold, lit) { return __ZC(459, 125, this, arguments, new.target); }
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
"Scan the raider wreck in the Far Reach, out past Hoon.",
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
function hlUnmask(P) { return __ZC(459, 126, this, arguments, new.target); }
(function () {
var lb = wdLawBlade;
wdLawBlade = function () { if (SF.k === "aurelion" && SF.hlFight && !SF.hlFight.done)
return true; return lb.apply(this, arguments); };
})();
function hlTint(F) { return __ZC(459, 127, this, arguments, new.target); }
function hlBattle(o) { return __ZC(459, 128, this, arguments, new.target); }
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
if (!HOL.toldFleet || WLD.t - HOL.toldFleet > 40) {
HOL.toldFleet = WLD.t;
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
function hlFleet(al) { return __ZC(459, 129, this, arguments, new.target); }
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
function wdBossDown(F) { return __ZC(459, 130, this, arguments, new.target); }
function hlEnd(how) { return __ZC(459, 131, this, arguments, new.target); }
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
function srBarkTex() { return __ZC(459, 132, this, arguments, new.target); }
function srFrondTex() { return __ZC(459, 133, this, arguments, new.target); }
function srCanopyTex() { return __ZC(459, 134, this, arguments, new.target); }
function srSoftTex() { return __ZC(459, 135, this, arguments, new.target); }
function srShaftTex() { return srTex("shaft", 8, 128, function (x, W, H) { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.3, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); }); }
function srInst(G, geo, mat, list, col) { return __ZC(459, 136, this, arguments, new.target); }
GX_TOWN.sereth = function (G, C, R, sol, hy) { return __ZC(459, 137, this, arguments, new.target); };
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
function wdHilt(g, k, col) { return __ZC(459, 138, this, arguments, new.target); }
wdBuildBlade = function (col, hilt, fx) { return __ZC(459, 139, this, arguments, new.target); };
function wdDotTex() { return __ZC(459, 140, this, arguments, new.target); }
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
function wdBladePreview(S) { return __ZC(459, 141, this, arguments, new.target); }
wdBladeCard = function () { return __ZC(459, 142, this, arguments, new.target); };
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
function gxOutMats(k) { return __ZC(459, 143, this, arguments, new.target); }
var GX_OUTB = {
camp: function (g, M, R, sol, x, z) { return __ZC(459, 144, this, arguments, new.target); },
ruin: function (g, M, R, sol, x, z) { return __ZC(459, 145, this, arguments, new.target); },
tower: function (g, M, R, sol, x, z, lamp) { return __ZC(459, 146, this, arguments, new.target); },
shrine: function (g, M, R, sol, x, z, lamp) { return __ZC(459, 147, this, arguments, new.target); },
wreck: function (g, M, R, sol, x, z) { return __ZC(459, 148, this, arguments, new.target); },
farm: function (g, M, R, sol, x, z, lamp, k) { return __ZC(459, 149, this, arguments, new.target); },
mine: function (g, M, R, sol, x, z, lamp) { return __ZC(459, 150, this, arguments, new.target); },
dock: function (g, M, R, sol, x, z, lamp) { return __ZC(459, 151, this, arguments, new.target); }
};
function gxTuftTex() { return __ZC(459, 152, this, arguments, new.target); }
function gxTuftGeo() { return __ZC(459, 153, this, arguments, new.target); }
function gxScatter(G, k, R, sol) { return __ZC(459, 154, this, arguments, new.target); }
function gxOutskirts(G, k) { return __ZC(459, 155, this, arguments, new.target); }
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
function wdChoiceCard(from) { return __ZC(459, 156, this, arguments, new.target); }
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
function wdHollowTick(L) { return __ZC(459, 157, this, arguments, new.target); }
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
ashfang: function () { return __ZC(459, 158, this, arguments, new.target); },
hammer: function () { return __ZC(459, 159, this, arguments, new.target); },
skiff: function () { return frAllyShip("skiff"); },
longship: function () { return frAllyShip("longship"); },
racer: function () { return __ZC(459, 160, this, arguments, new.target); },
hauler: function () { return __ZC(459, 161, this, arguments, new.target); },
concord: function () { return sbBuildCutter(0xF6F4EE, 0xD8B060); },
tideray: function () { return __ZC(459, 162, this, arguments, new.target); },
icerunner: function () { return __ZC(459, 163, this, arguments, new.target); }
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
function gqNext(id, say) { return __ZC(459, 164, this, arguments, new.target); }
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
function gqCard(p) { return __ZC(459, 165, this, arguments, new.target); }
function gqTick(dt) { return __ZC(459, 166, this, arguments, new.target); }
function gqSpawnItems(id, st, P) { return __ZC(459, 167, this, arguments, new.target); }
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
function gbCard() { return __ZC(459, 168, this, arguments, new.target); }
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
function gbEnd(Bt, how) { return __ZC(459, 169, this, arguments, new.target); }
var GX_RACES = {
tullimar: { n: "The Tullimar Loop", sys: "reach", body: "tullimar", rings: 12, rad: 5, par: [70, 90, 120], about: "Twelve rings round Tullimar, low and fast." },
glasswing: { n: "The Glasswing Run", sys: "corvanne", body: "sereth", rings: 14, rad: 6, par: [95, 120, 160], about: "Fourteen rings that weave round Sereth Vale and out past the swarm." },
shatter: { n: "The Shatterline Gauntlet", sys: "shatterline", body: "isk", rings: 16, rad: 5, par: [110, 140, 180], about: "Sixteen rings through Isk's sky, where the Hollow fly. Only the Tullik call this fun." }
};
var GXR = { on: null };
function gxrCard() { return __ZC(459, 170, this, arguments, new.target); }
function gxrStart(k) { return __ZC(459, 171, this, arguments, new.target); }
function gxrPlace() { return __ZC(459, 172, this, arguments, new.target); }
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
function wdPowLine(S) { return __ZC(459, 173, this, arguments, new.target); }
function wdFoesNear(r, front) { return __ZC(459, 174, this, arguments, new.target); }
function wdLance(col, spread) { return __ZC(459, 175, this, arguments, new.target); }
function wdArc(a, b, col) { return __ZC(459, 176, this, arguments, new.target); }
function wdHit(F, dmg, stun, col) { if (!F || F.yield)
return; F.hp -= dmg; F.hit = 0.2; F.stun = Math.max(F.stun || 0, stun || 0.35); wdSpark(F.x, F.y + 1.2, F.z, col || wdGet().blade); if (F.hp <= 0)
wdYield(F); }
wdSwing = function () { return __ZC(459, 177, this, arguments, new.target); };
(function () { var gd = wdGuard; wdGuard = function (on) { var was = WD.guard; gd.apply(this, arguments); if (on && !was && WD.guard && wdShardKey() === "maruondo")
WD.guardAt += 0.25; }; })();
(function () { var hu = wdHurt; wdHurt = function (n, F) { if (WD.veil > WD.t || WD.ward > WD.t) {
if (WD.ward > WD.t) {
var L = wdLocal();
wdSpark(L.x - Math.sin(yaw) * 0.7, camera.position.y - 0.2, L.z - Math.cos(yaw) * 0.7, 0x2AD06A);
}
return;
} return hu.apply(this, arguments); }; })();
function wdSurge() { return __ZC(459, 178, this, arguments, new.target); }
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
function nhkBuild(G, C, R, sol, hy) { return __ZC(459, 179, this, arguments, new.target); }
function nhkCard() { return __ZC(459, 180, this, arguments, new.target); }
function nhkSpar() { return __ZC(459, 181, this, arguments, new.target); }
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
["hold", "orr", 1, 3, "The raiders want their ledgers back: hold the relay tower"], ["talk", "orrem", "Hear what the Orrem read in them"]
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
function gsPlace(w, i) { var O = GX_OUT[w]; return O && O.places[i]; }
function gsLine(st) {
var k = st[0];
if (k === "gather") {
var P = gsPlace(st[1], st[2]);
return "Gather " + st[3] + " " + st[4] + " at " + (P ? P.n : st[1]);
}
return st[st.length - 1];
}
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
GS.wait = WLD.t + 7;
};
}
hlTo = gsHoldWrap(GS_TO, 0);
hlToH = gsHoldWrap(GS_TOH, 1);
function gsNeed(g) { return (GS_FLOOR[gsKey(g.n, g.h)] || 0) * 3600; }
function gsReady(g) { if (typeof amKeeper === "function" && amKeeper())
return true; return (gsGet().t || 0) >= gsNeed(g); }
function gsIdea() { return __ZC(459, 182, this, arguments, new.target); }
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
function gsBegin(id, free) { return __ZC(459, 183, this, arguments, new.target); }
function gsStep(say) { return __ZC(459, 184, this, arguments, new.target); }
function gsFoe(side, i, x, z, o) { return __ZC(459, 185, this, arguments, new.target); }
function gsSpawnWave(C, P, n, boss) { return __ZC(459, 186, this, arguments, new.target); }
function gsBattle(C, big, n) { return __ZC(459, 187, this, arguments, new.target); }
function gsItems(A, st, P) { return __ZC(459, 188, this, arguments, new.target); }
function gsTick(dt) { return __ZC(459, 189, this, arguments, new.target); }
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
GS.wait = WLD.t + 8;
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
function vqLine() { return __ZC(459, 190, this, arguments, new.target); }
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
function vqOpen() { return __ZC(459, 191, this, arguments, new.target); }
function vqQuestStart() { return __ZC(459, 192, this, arguments, new.target); }
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
