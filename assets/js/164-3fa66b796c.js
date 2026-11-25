/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CAS = { base: -250000, hatch: { x: 430, z: -380 }, solids: [], spots: [], people: [], wheels: [], machines: [], lights: [], chips: null, gold: null, rate: 10, min: 5, max: 5000, prizes: [], practice: false, pchips: 1000, hand: null, busy: false, singer: null };
var CAS_SUIT = ["♠", "♥", "♦", "♣"], CAS_RANK = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var CAS_SYM = { cherry: "🍒", lemon: "🍋", bell: "🔔", star: "⭐", seven: "7️⃣", moon: "🌙" };
var CAS_REDS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
(function () {
if (typeof sfBuild !== "function")
return;
var fb = sfBuild;
sfBuild = function (k) {
fb(k);
if (k !== "moon")
return;
var G = WORLDS.surface.g, h = CAS.hatch, y = sfHeight(h.x, h.z);
var g = new THREE.Group();
g.position.set(h.x, y, h.z);
G.add(g);
var rk = wMesh(new THREE.DodecahedronGeometry(6, 1), wM(0x6A6760), 0, 1.2, -7.5, g);
rk.scale.set(1.6, 0.6, 1);
wBox(2.6, 2.8, 0.4, wM(0x4A4A50), 0, 1.4, 1.2, g);
var door = wBox(2, 2.3, 0.12, wM(0x8A8E98), 0, 1.2, 1.45, g);
CAS.door = door;
var cr = wMesh(new THREE.TorusGeometry(0.32, 0.05, 8, 24, Math.PI * 1.3), wB(0xE0E4EC, { fog: false }), 0, 1.8, 1.53, g);
cr.rotation.z = 0.6;
var beacon = wSph(0.12, wB(0xFF3030, { fog: false }), 0, 3.4, 1.2, g, 8);
wCyl(0.03, 0.03, 0.8, wM(0x666666), 0, 3, 1.2, g, 5);
var bg = wGlow(0xFF3030, 3, 0.8);
bg.position.set(0, 3.4, 1.2);
g.add(bg);
CAS.beacon = { m: beacon, g: bg };
SF.solids.push({ x: h.x, z: h.z - 7.5, r: 7 }, { x: h.x, z: h.z + 1.2, hw: 1.3, hd: 0.3 });
};
if (typeof sfTick === "function") {
var ft = sfTick;
sfTick = function (dt) {
ft(dt);
if (SF.k !== "moon")
return;
if (CAS.beacon) {
var on = (WLD.t % 2) < 0.25;
CAS.beacon.m.visible = CAS.beacon.g.visible = on;
}
var L = worldLocal();
if (wNear(L.x, L.z, CAS.hatch.x, CAS.hatch.z + 2.6, 2.6))
worldPrompt("<b>A hatch in the rock</b>, a silver crescent on it · <b>press E</b> to knock", casKnock);
};
}
})();
function casKnock() { return __ZC(164, 0, this, arguments, new.target); }
worldDef("casino", {
base: CAS.base, far: 3000, ownSky: true, tone: 480,
env: { top: 0x05040A, low: 0x0A0810, fog: 0x0A0810, fogD: 0.0004, sun: 0.35, sunCol: 0xFFE8C8, sunDir: [0.3, 0.9, -0.3], hemi: 0.95, hemiCol: 0xFFE8D0, hemiGround: 0x2A1A20, stars: 0 },
build: function (G) { casBuild(G); },
enter: function () { casEnter(); },
leave: function () { worldCard(null); },
ground: function () { return 0; },
bound: 31,
block: function (x, z, feet) { return worldSolidAt(CAS.solids, x, z, feet); },
tick: function (dt) { casTick(dt); },
back: function () { casLeave(); }
});
function casFloorTex() { return __ZC(164, 1, this, arguments, new.target); }
function casBuild(G) { return __ZC(164, 2, this, arguments, new.target); }
function casName(title, i) {
var h = hash("cas-" + title + "-" + (i || 0)), f = (h >>> 3) % 2 === 0, given = typeof TEMP_GIVEN_F !== "undefined" ? (f ? TEMP_GIVEN_F : TEMP_GIVEN_M) : ["Ada", "Sam"];
return given[(h >>> 5) % given.length] + " " + (typeof SURNAME !== "undefined" ? SURNAME[(h >>> 10) % SURNAME.length] : "Vance");
}
function casStaff(G) { return __ZC(164, 3, this, arguments, new.target); }
function casAgeNote() { return __ZC(164, 4, this, arguments, new.target); }
function casEnter() { return __ZC(164, 5, this, arguments, new.target); }
function casLeave() { return __ZC(164, 6, this, arguments, new.target); }
function casTick(dt) { return __ZC(164, 7, this, arguments, new.target); }
function casSigned() { return typeof signedIn === "function" && signedIn(); }
function casRpc(name, args) { return cityRpc(name, args || {}); }
function casLoad() { return __ZC(164, 8, this, arguments, new.target); }
function casHead(title, sub) { return __ZC(164, 9, this, arguments, new.target); }
function casBetInput(id, v) { return "<label style='display:block;margin:6px 0'>Bet <input id='" + id + "' type='number' min='" + CAS.min + "' max='" + CAS.max + "' value='" + (v || Math.max(CAS.min, 10)) + "' style='width:90px;background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px 6px'> chips</label>"; }
function casBet(id) { var e = document.getElementById(id); return Math.floor(+(e && e.value) || 0); }
function casMsg(t) { var e = document.getElementById("cas-msg"); if (e)
e.innerHTML = t;
else
setStatus(t); }
function casCheckBet(b) { return __ZC(164, 10, this, arguments, new.target); }
function casCage() { return __ZC(164, 11, this, arguments, new.target); }
function casPaid(o, fallback) { if (o && o.chips != null) {
CAS.chips = +o.chips;
} }
function casRoulette(i) { return __ZC(164, 12, this, arguments, new.target); }
function casSpinLocal(kind, pick, bet) { return __ZC(164, 13, this, arguments, new.target); }
function casSpin(i, kind, pick) { return __ZC(164, 14, this, arguments, new.target); }
function casSlotLocal(bet) { return __ZC(164, 15, this, arguments, new.target); }
function casSlots() { return __ZC(164, 16, this, arguments, new.target); }
function casPull() { return __ZC(164, 17, this, arguments, new.target); }
function casCard(n) {
var s = Math.floor(n / 13), r = n % 13, red = s === 1 || s === 2;
return "<span style='display:inline-block;min-width:34px;padding:6px 4px;margin:2px;background:#F8F4EA;color:" + (red ? "#B01E28" : "#141414") + ";border-radius:4px;text-align:center;font:600 16px Georgia'>" + CAS_RANK[r] + CAS_SUIT[s] + "</span>";
}
function casDeck() { var d = []; for (var i = 0; i < 52; i++)
d.push(i); for (var j = 51; j > 0; j--) {
var k = Math.floor(Math.random() * (j + 1)), t = d[j];
d[j] = d[k];
d[k] = t;
} return d; }
function casBjTotal(cs) { var t = 0, a = 0; cs.forEach(function (c) { var r = c % 13; if (r === 0) {
a++;
t += 11;
}
else
t += r >= 9 ? 10 : r + 1; }); while (t > 21 && a > 0) {
t -= 10;
a--;
} return t; }
function casBlackjack(i) { return __ZC(164, 18, this, arguments, new.target); }
function casBjLocalView(L, reveal) {
return { game: "bj", local: L, status: L.done ? "done" : "open", player: L.p.slice(), dealer: reveal ? L.d.slice() : [L.d[0]], ptotal: casBjTotal(L.p), dtotal: reveal ? casBjTotal(L.d) : casBjTotal([L.d[0]]), outcome: L.outcome, payout: L.payout || 0, baseBet: L.base };
}
function casBjLocalSettle(L) { return __ZC(164, 19, this, arguments, new.target); }
function casBjDeal(i) { return __ZC(164, 20, this, arguments, new.target); }
function casBjAct(i, act) { return __ZC(164, 21, this, arguments, new.target); }
var CAS_VP_PAY = [["Royal flush", 250], ["Straight flush", 50], ["Four of a kind", 25], ["Full house", 9], ["Flush", 6], ["Straight", 4], ["Three of a kind", 3], ["Two pair", 2], ["Jacks or better", 1]];
function casVpRank(cs) { return __ZC(164, 22, this, arguments, new.target); }
function casPoker() { return __ZC(164, 23, this, arguments, new.target); }
function casVpDeal() { return __ZC(164, 24, this, arguments, new.target); }
function casVpDraw() { return __ZC(164, 25, this, arguments, new.target); }
function casPrizeList() { return __ZC(164, 26, this, arguments, new.target); }
function casShop(title, sub, filter) { return __ZC(164, 27, this, arguments, new.target); }
function casRedeem(p, title, sub, filter) { return __ZC(164, 28, this, arguments, new.target); }
function casBar() { casShop("The bar", "Under the window on Earthrise. Drinks and plates for chips.", function (p) { return p.chips < 200; }); }
function casPrizes() { casShop("The prize counter", "Chips buy prizes: keepsakes of the Moon you can find nowhere else, and they go to your things.", function (p) { return p.chips >= 200; }); }
