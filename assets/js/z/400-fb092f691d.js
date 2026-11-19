/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(400, function () {
"use strict";
return [
function (h) {
if (typeof setStatus === "function")
setStatus(h);
if (typeof document === "undefined" || !document.body)
return;
var el = document.getElementById("mng-say");
if (!el) {
el = document.createElement("div");
el.id = "mng-say";
el.setAttribute("role", "status");
el.style.cssText = "position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:41;max-width:min(92vw,560px);padding:7px 12px;border-radius:6px;" +
"background:rgba(20,16,12,.88);border:1px solid rgba(232,200,140,.4);color:#F2E2C0;font:13px/1.45 system-ui,sans-serif;pointer-events:none;transition:opacity .6s;opacity:0";
document.body.appendChild(el);
}
el.innerHTML = h;
el.style.opacity = "1";
clearTimeout(MNG.sayT);
MNG.sayT = setTimeout(function () { el.style.opacity = "0"; }, Math.min(14000, 5000 + String(h).length * 25));
},
function (k) {
var M = null;
try {
M = typeof grMatOf === "function" ? grMatOf(k) : null;
}
catch (e) { }
if (M && M.name && M.name !== k)
return M;
var H = typeof HND_MATS !== "undefined" ? HND_MATS.filter(function (x) { return x[0] === k; })[0] : null;
if (H)
return { name: H[1], icon: H[2] };
return { name: String(k || "ore").replace(/^[a-z]+_/, "").replace(/_/g, " "), icon: "🪨" };
},
function () {
var B = MNG.board;
if (!B || !B.lode || !B.on)
return;
var day = new Date().toISOString().slice(0, 10), was = null;
try {
was = localStorage.getItem("sm.mng.lode");
}
catch (e) { }
if (was === day + "|" + B.lode)
return;
try {
localStorage.setItem("sm.mng.lode", day + "|" + B.lode);
}
catch (e) { }
mngSay("⛏️ <b>The mother lode is struck today in " + esc(B.lode_name || B.lode) + "!</b> Three times the ore at its working face, and gems twice as often. The ⛏️ Mining card says how to get there.");
},
function (key, face, label) {
if (MNG.hew && MNG.hew.key === key && MNG.hew.face === face) {
if (MNG.hew.phase === "creak")
mngProp();
return;
}
if (typeof signedIn === "function" && !signedIn()) {
mngSay("Sign in to hew: what you take is kept against your account.");
return;
}
if (MNG.missing) {
mngSay("The Miners' Guild opens soon.");
return;
}
var me = mngMe(), r = me ? me.rank : 0, need = face < 0 ? 0 : mngNeed(face);
if (me && r < need && !mgKeeper()) {
mngSay("The Guild lets only a <b>" + mngRankName(need) + "</b> or better hew this deep. You are a " + mngRankName(r) + ": bank " + (MNG_RANKS[need][0] - (+me.lifetime || 0)) + " more loads to get there.");
return;
}
var c = MNG.cart;
if (c && c.loads > 0 && c.key && c.key !== key) {
mngSay("Your cart is still full from another mine. Bank it at that mine's way back first.");
return;
}
if (c && c.loads >= c.cap && !mgKeeper()) {
mngSay("🛒 <b>Your cart is full.</b> Push it back to the way back and bank it.");
return;
}
var secs = (me && +me.secs) || 60, P = camera.position;
MNG.hew = { key: key, face: face, name: label || "the face", t0: Date.now(), secs: secs, phase: "hew", x: P.x, z: P.z, swing: 0 };
var v = mngVein(key, face), d = mngDepth(key, face);
mngSay("⛏️ <b>You set to work on " + esc(label || "the face") + ".</b> " + (v ? "The vein is " + mngVeinWord(v) + ". " : "") + "A load comes off about every " + secs + " seconds while you stay; walk away and you stop. " +
(d >= 4 ? "<b>Mind the roof</b>: it creaks this deep. " : "") + (d >= 8 ? "<b>Mind the air</b> too. " : "") + "What you hew goes in your 🛒 cart.");
mngCartPaint();
mngHudPaint();
},
function () {
var H = MNG.hew;
if (!H || H.phase !== "hew")
return;
H.phase = "send";
mngHudPaint();
mngRpc("mine_hew", { p_key: H.key, p_face: H.face }).then(function (o) {
if (MNG.hew !== H)
return;
o = o || {};
if (o.ok) {
MNG.cart = Object.assign({}, MNG.cart || {}, { key: H.key, loads: +o.cart || 0, cap: +o.cap || 6 });
var k = {};
k[o.kind] = o.units;
if (o.gem)
k[o.gem] = 1;
if (o.crystal)
k.cr_crystal = 1;
var ck = MNG.cart.kinds = Object.assign({}, MNG.cart.kinds || {});
Object.keys(k).forEach(function (x) { ck[x] = (+ck[x] || 0) + (+k[x] || 0); });
var vv = MNG.board && MNG.board.veins;
if (vv) {
vv[H.key + "|" + H.face] = Object.assign({}, vv[H.key + "|" + H.face] || {}, { left: +o.left, cap: +o.vcap, shut: false, creak: !!o.creak });
}
H.secs = +o.secs || H.secs;
H.t0 = Date.now();
H.phase = "hew";
var h = "⛏️ <b>A load comes away:</b> " + mngKinds(k) + (o.lode ? " ✨ (the mother lode!)" : "") + ". 🛒 " + o.cart + " of " + o.cap + " in the cart.";
if (o.gem)
h += " <b>💎 A rough gem in the rock!</b>";
if (o.crystal)
h += " <b>A crystal came out whole!</b>";
if (o.xp && o.xp.xp)
h += " <span style='opacity:.8'>+" + o.xp.xp + " Mining XP" + (o.xp.up ? " · <b>Mining " + o.xp.level + "!</b>" : "") + "</span>";
if (o.creak) {
H.phase = "creak";
H.t0 = Date.now();
h += " <b>⚠️ The roof creaks above you.</b> Set a prop (press E at the face) before you hew again.";
if (typeof playTone === "function")
try {
playTone(70, 0.6);
}
catch (e) { }
}
if (o.air) {
MNG.air = { at: Date.now(), x: camera.position.x, z: camera.position.z };
h += " <b>🕯️ Your lamp gutters: the air is going bad.</b> Walk back towards the shaft.";
}
if (+o.cart >= +o.cap && !mgKeeper()) {
MNG.hew = null;
h += " <b>Your cart is full:</b> push it back to the way back and bank it.";
}
mngSay(h);
mngCartPaint();
mngHudPaint();
mngJobDig();
return;
}
if (o.wait) {
H.phase = "hew";
H.t0 = Date.now() - Math.max(0, H.secs - (+o.wait || 5)) * 1000;
mngHudPaint();
return;
}
if (o.creak) {
H.phase = "creak";
H.t0 = Date.now();
mngSay("⚠️ " + esc(o.say));
mngHudPaint();
return;
}
if (o.air) {
if (!MNG.air)
MNG.air = { at: Date.now(), x: camera.position.x, z: camera.position.z };
H.phase = "hew";
H.t0 = Date.now();
mngSay("🕯️ " + esc(o.say));
mngHudPaint();
return;
}
if (o.carried) {
MNG.hew = null;
MNG.air = null;
MNG.cart = Object.assign({}, MNG.cart || {}, { loads: +o.cart || 0 });
mngCarried(o.say);
return;
}
if (o.fell) {
MNG.hew = null;
mngRockfall(o.say);
return;
}
MNG.hew = null;
mngHudPaint();
mngSay(esc(o.say || "Nothing came of it."));
}).catch(function (e) {
if (MNG.hew === H) {
MNG.hew = null;
mngHudPaint();
}
if (mngMissing(e)) {
MNG.missing = true;
mngSay("The Miners' Guild opens soon.");
}
else
mngSay(esc((e && e.message) || String(e)));
});
},
function () {
var H = MNG.hew;
if (!H)
return;
mngRpc("mine_prop", { p_key: H.key, p_face: H.face }).then(function (o) {
if (MNG.hew !== H)
return;
if (o && o.ok) {
H.phase = "hew";
H.t0 = Date.now();
var vv = MNG.board && MNG.board.veins && MNG.board.veins[H.key + "|" + H.face];
if (vv)
vv.creak = false;
mngSay("🪵 <b>" + esc(o.say || "Prop set.") + "</b> Back to hewing.");
}
else {
H.phase = "prop";
H.t0 = Date.now() - 4000;
}
mngHudPaint();
}).catch(function () { H.phase = "creak"; mngHudPaint(); });
},
function (say) {
mngHudPaint();
if (typeof playTone === "function")
try {
playTone(55, 1.2);
setTimeout(function () { playTone(48, 0.9); }, 300);
}
catch (e) { }
var t0 = Date.now(), P = camera.position, y = P.y;
var iv = setInterval(function () { var k = (Date.now() - t0) / 900; if (k >= 1) {
camera.position.y = y;
clearInterval(iv);
return;
} camera.position.y = y + Math.sin(k * 40) * 0.05 * (1 - k); }, 30);
mngSay("💥 <b>" + esc(say || "The roof came in!") + "</b>");
mngLoad(true);
},
function (then) {
var c = MNG.cart;
if (!c || !(+c.loads > 0)) {
if (then)
then();
return;
}
mngHewStop(null);
mngRpc("mine_bank").then(function (o) {
if (!o || !o.ok) {
mngSay(esc((o && o.say) || "The cart did not go up."));
if (then)
then();
return;
}
MNG.cart = { key: null, loads: 0, kinds: {}, cap: +o.cap || 6, gems: 0 };
mngCartPaint();
if (typeof loadStock === "function")
try {
loadStock();
}
catch (e) { }
if (then)
then();
var h = "<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>🛒 The cart goes up</div>" +
"<p style='margin:6px 0'>" + (+o.loads) + " load" + (o.loads == 1 ? "" : "s") + " banked: " + mngKinds(o.kinds) + ". It is all in your 🎒 Backpack, under Materials: sell it to the city, or take it to a forge.</p>" +
"<p style='margin:6px 0'>Guild rank: <b>" + esc(o.rank_name) + "</b> · " + (+o.lifetime) + " loads banked in all" + (o.up ? " · <b>🎉 Promoted! Your cart holds " + o.cap + " loads now.</b>" : "") + "</p>";
(o.done || []).forEach(function (d) { h += "<p style='margin:6px 0;color:#BFE8A0'>✅ <b>Contract done:</b> " + esc(d.say) + (d.gold > 0 ? " · <b>" + d.gold + " gold</b> paid from the Treasury" : o.paid ? "" : " (gold goes to dues-payers aged 18 and over)") + "</p>"; });
var fns = { board: function () { mngBoardCard(); } };
if (typeof worldCard === "function")
worldCard(h + worldBtn("board", "⛏️ The Miners' Guild board", "contracts, the week's table, your rank"), fns);
mngLoad(true);
}).catch(function (e) { mngSay(mngMissing(e) ? "The Miners' Guild opens soon." : esc((e && e.message) || String(e))); if (then)
then(); });
},
function () {
if (MNG.cartMesh || typeof THREE === "undefined" || typeof scene === "undefined" || !scene)
return MNG.cartMesh;
var g = new THREE.Group(), iron = mgMat(0x3E3C3A, "metal"), wood = mgMat(0x5A3E26, "wood"), rim = mgMat(0x6A5A44, "metal");
mgBoxM(g, 0.9, 0.08, 1.3, iron, 0, 0.42, 0);
mgBoxM(g, 0.06, 0.5, 1.3, iron, -0.45, 0.7, 0);
mgBoxM(g, 0.06, 0.5, 1.3, iron, 0.45, 0.7, 0);
mgBoxM(g, 0.9, 0.5, 0.06, iron, 0, 0.7, -0.65);
mgBoxM(g, 0.9, 0.5, 0.06, iron, 0, 0.7, 0.65);
mgBoxM(g, 0.96, 0.05, 0.08, rim, 0, 0.96, -0.66);
mgBoxM(g, 0.96, 0.05, 0.08, rim, 0, 0.96, 0.66);
mgBoxM(g, 0.08, 0.05, 1.36, rim, -0.47, 0.96, 0);
mgBoxM(g, 0.08, 0.05, 1.36, rim, 0.47, 0.96, 0);
[[-0.38, -0.42], [0.38, -0.42], [-0.38, 0.42], [0.38, 0.42]].forEach(function (q) { var w = mgCylM(g, 0.18, 0.18, 0.08, iron, q[0], 0.19, q[1], 12); w.rotation.z = Math.PI / 2; });
mgBoxM(g, 0.7, 0.05, 0.05, wood, 0, 0.95, 0.86);
mgBoxM(g, 0.05, 0.05, 0.24, wood, -0.32, 0.95, 0.74);
mgBoxM(g, 0.05, 0.05, 0.24, wood, 0.32, 0.95, 0.74);
var ore = new THREE.Group();
g.add(ore);
g.userData.ore = ore;
g.visible = false;
g.name = "mng-cart";
scene.add(g);
MNG.cartMesh = g;
return g;
},
function () {
var g = mngCartMesh();
if (!g)
return;
var c = MNG.cart || {}, n = Math.min(16, +c.loads || 0), ore = g.userData.ore, lite = mgLite();
if (ore.userData.n === n && ore.userData.k === c.key)
return;
while (ore.children.length)
ore.remove(ore.children[0]);
var C = mgRock(c.key || (MG.cur && MG.cur.key) || ""), M = mgMat(C.ore, "stone", { e: C.glint, ei: 0.15 }), lumps = lite ? Math.min(6, n * 2) : n * 3;
for (var i = 0; i < lumps; i++) {
var f = i / Math.max(1, lumps), r = 0.12 + mgHash(i, 2, 3, 7) * 0.1;
var m = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), M);
m.position.set((mgHash(i, 1, 1, 5) - 0.5) * 0.7, 0.5 + f * 0.42 + r * 0.5, (mgHash(i, 4, 2, 9) - 0.5) * 1.1);
m.rotation.set(i, i * 2, i * 3);
ore.add(m);
}
ore.userData.n = n;
ore.userData.k = c.key;
},
function (key) {
if (key === "The Deep Workings")
return "Take the cage at the city's Mine Head down to the Deep Workings; the New Workings open off the main drift.";
if (key === "The Deepdelve Mines")
return "In Stonehallow, the Dwarven Deep: through the adit of the Deepdelve Mines to the end of the north gallery.";
var w = String(key || "").split(":")[0];
return "In " + w + ": go into the mine's Pithead Hall and take the cage down.";
},
function () {
if (typeof worldCard !== "function")
return;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>⛏️ The Miners' Guild</div><p style='opacity:.8'>Fetching the board…</p>", {});
mngLoad(true).then(function (B) {
if (!B) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>⛏️ The Miners' Guild</div><p>" + (MNG.missing ? "The Guild opens soon." : "The board could not be read just now.") + "</p>", {});
return;
}
var me = B.me, h = "<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>⛏️ The Miners' Guild</div>";
if (!B.on)
h += "<p style='color:#F0C080'>The Guild has closed the faces for now.</p>";
if (B.lode)
h += "<div style='margin:8px 0;padding:7px 9px;border:1px solid rgba(255,214,120,.55);border-radius:4px;background:rgba(255,200,90,.08)'>✨ <b>Today's mother lode: " + esc(B.lode_name || B.lode) + "</b><div style='font-size:12.5px;opacity:.9'>Three times the ore at its working face, gems twice as often, until the day is out. " + esc(mngHowTo(B.lode)) + "</div></div>";
if (me) {
var r = +me.rank || 0, nx = MNG_RANKS[r + 1], c = me.cart || {};
h += "<div style='margin:8px 0'><b>You:</b> " + esc(me.rank_name || mngRankName(r)) + " · " + (+me.lifetime || 0) + " loads banked in all · " + (+me.week || 0) + " this week" +
(nx ? mngBar(((+me.lifetime || 0) - MNG_RANKS[r][0]) / (nx[0] - MNG_RANKS[r][0])) + "<div style='font-size:12px;opacity:.8'>" + (nx[0] - (+me.lifetime || 0)) + " more to <b>" + nx[1] + "</b>: " + esc(nx[2]) + ".</div>" : "<div style='font-size:12px;opacity:.8'>The highest rank there is.</div>") +
"<div style='font-size:12px;opacity:.85;margin-top:3px'>🛒 Cart " + (+c.loads || 0) + " of " + (+c.cap || mngCap(r)) + (c.loads > 0 ? " (" + mngKinds(c.kinds) + ")" : "") + " · ⛏️ a load every " + (+me.secs || 60) + " s" + (+me.tool > 0 ? " with your pickaxe" : " with the Guild's own pick (a pickaxe of your own is quicker)") + "</div></div>";
}
else
h += "<p style='opacity:.85'>Sign in to hew, bank and be ranked.</p>";
h += "<div style='margin:10px 0 4px;font-weight:600'>Today's contracts</div>";
var mine = {};
((me && me.contracts) || []).forEach(function (x) { mine[x.n] = x; });
(B.contracts || []).forEach(function (k) {
var m = mine[k.n] || { got: 0, paid: null }, got = Math.min(+k.need, +m.got || 0);
h += "<div style='font-size:13px'>" + (MNG_CON_ICON[k.type] || "⛏️") + " " + esc(k.say) + " · <b>" + (+k.gold) + " gold</b>" + (m.paid != null ? " · ✅ done" : " · " + got + " of " + k.need) + "</div>" + mngBar(got / (+k.need || 1), m.paid != null ? "#8CC870" : "#D8B060");
});
h += "<div style='font-size:12px;opacity:.75'>Contracts count what you bank at the way back. The gold comes from the Treasury and goes to dues-payers aged 18 and over; everyone gets the tally and the rank.</div>";
h += "<div style='margin:10px 0 4px;font-weight:600'>This week's table</div>";
var pz = B.prizes || [300, 150, 75];
if ((B.week || []).length) {
h += "<table style='width:100%;font-size:13px;border-collapse:collapse'>" + B.week.map(function (w, i) { return "<tr style='" + (w.me ? "color:#FFE08A;font-weight:600" : "") + "'><td style='padding:1px 6px 1px 0'>" + (i < 3 ? ["🥇", "🥈", "🥉"][i] : (i + 1) + ".") + "</td><td>" + esc(w.name) + "</td><td style='text-align:right'>" + (+w.loads) + " loads</td></tr>"; }).join("") + "</table>";
}
else
h += "<div style='font-size:13px;opacity:.8'>Nobody has banked a load yet this week. The first cart up leads the table.</div>";
h += "<div style='font-size:12px;opacity:.75;margin-top:4px'>Prizes at the week's end: " + (+pz[0] || 0) + ", " + (+pz[1] || 0) + " and " + (+pz[2] || 0) + " gold to the top three (dues-payers aged 18 and over).</div>";
if ((B.last || []).length)
h += "<div style='font-size:12px;opacity:.85;margin-top:4px'>Last week: " + B.last.map(function (p) { return ["🥇", "🥈", "🥉"][p.place - 1] + " " + esc(p.name) + " (" + p.loads + ")"; }).join(" · ") + "</div>";
var fns = { how: function () { mngHowCard(); }, ranks: function () { mngRanksCard(); } };
h += worldBtn("how", "How mining works", "the faces, the veins, the cart, the dangers") + worldBtn("ranks", "The Guild's ranks", "what each rank opens");
worldCard(h, fns);
});
},
function () {
worldCard(worldFacts("How mining works", "The Miners' Guild", [
["Where", "The New Workings of every mine: the Deep Workings, the Deepdelve, and the mine of every world that has one"],
["Hewing", "Press E at a face or a seam and stay. A load comes off about once a minute; a pickaxe of your own is quicker"],
["Veins", "Shared by everyone: rich, fair, thin, worked out. A worked-out vein comes back a load in ten minutes"],
["Deeper", "More ore in a load, and rough gems more often (quartz near the top, ruby in the deepest seams)"],
["The cart", "What you hew goes in your cart. Push it back to the way back and it goes up the cage into your Backpack"],
["The roof", "Past the first gallery the roof creaks: set a prop (press E), or it comes in and shuts that face for 15 minutes. Anyone may set a prop for a crewmate"],
["The air", "In the deepest seams your lamp may burn low: walk back towards the shaft within a minute, or the crew carries you up and half your cart is spilt"],
["Miners on shift", "Hewing while clocked in as a miner digs your mine further too"]
], ["Nobody is ever hurt in the mines: the worst is a shut face or a lighter cart.", "Rare materials are only ever found, never sold."]), {});
},
function () {
var me = mngMe(), r = me ? +me.rank : -1;
worldCard(worldFacts("The Guild's ranks", "Loads banked in all", MNG_RANKS.map(function (R, i) { return [(i === r ? "▶ " : "") + R[1], R[0] + " loads · cart of " + mngCap(i) + " · " + R[2]]; }), ["The working face is open to everyone. The seams past the first gallery need a Hewer; the deep seams and the stope a Face-hand; the deepest seams and the great cavern a Deputy."]), {});
},
function (key) {
mngLoad(false);
var v = mngVein(key, -1), lode = mngIsLode(key), S = MG_SITES[key], d = mngDepth(key, -1);
var h = "<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>The working face" + (lode ? " · ✨ the mother lode" : "") + "</div>" +
"<p style='margin:6px 0'>" + (lode ? "The rock here is shot through with ore: today it gives three times as much." : "Fresh rock, the drill holes in it, the cart waiting.") +
" The vein is <b>" + mngVeinWord(v) + "</b>" + (v ? " (" + Math.max(0, v.left) + " of " + v.cap + " loads)" : "") + ". " + esc(mngDanger(d)) + ".</p>";
var fns = { hew: function () { worldCard(null); mngHewStart(key, -1, lode ? "the mother lode" : "the working face"); },
boss: function () { mngOrigBoss(key, true); }, board: function () { mngBoardCard(); } };
h += worldBtn("hew", "⛏️ Hew the face", "real minutes; the ore goes in your cart") + worldBtn("boss", "How far the miners have dug", "") + worldBtn("board", "⛏️ The Miners' Guild board", "");
worldCard(h, fns);
},
function (M, key) {
if (!M || !M.g)
return;
var want = mngIsLode(key), has = M.g.userData.mngLode;
if (want && !has) {
var g = new THREE.Group(), C = mgRock(key), lite = mgLite(), gold = mgMat(0xD8B058, "metal", { e: 0xFFB830, ei: 0.12 }), fz = M.L.face;
for (var i = 0; i < (lite ? 8 : 20); i++) {
var r = 0.12 + mgHash(i, 3, 1, 4) * 0.18, m = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), i % 3 ? gold : mgMat(C.ore, "stone", { e: C.glint, ei: 0.3 }));
m.position.set(-1.8 + mgHash(i, 1, 2, 3) * 3.6, 0.4 + mgHash(i, 5, 6, 7) * 3.2, fz + 0.27);
m.scale.set(1, 0.7, 0.35);
m.rotation.set(i, i * 2, i);
g.add(m);
}
if (typeof mgGlow === "function")
mgGlow(g, 0xFFC860, 2.6, 0.28, 0, 1.8, fz + 0.8);
if (!lite) {
var pl = new THREE.PointLight(0xFFC870, 0.9, 9, 1.8);
pl.position.set(0, 2.4, fz + 1.6);
g.add(pl);
}
if (typeof wSign === "function") {
var s = wSign(["✨ The mother lode", "Struck today · three times the ore"], 2.2, 0.62, "#3A2810", "#FFE6A0");
s.position.set(0.5, 2.45, fz + 0.45);
g.add(s);
}
M.g.add(g);
M.g.userData.mngLode = g;
}
else if (!want && has) {
M.g.remove(has);
M.g.userData.mngLode = null;
}
},
function (key, fns) {
if (!mgKeeper())
return "";
fns.kfill = function () { mngRpc("keeper_mine_vein_fill", { p_key: key }).then(function (o) { mngSay(esc((o && o.say) || "")); mngLoad(true); }); };
fns.klode = function () { mngRpc("keeper_mine_lode", { p_key: key }).then(function (o) { mngSay(esc((o && o.say) || "")); mngLoad(true); }); };
return worldBtn("kfill", "Keeper: fill this mine's veins", "and clear any fallen roof") + worldBtn("klode", "Keeper: strike the mother lode here today", "");
}
];
});
