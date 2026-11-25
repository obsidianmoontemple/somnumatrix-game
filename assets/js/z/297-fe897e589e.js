/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(297, function () {
"use strict";
return [
function (k, title) {
var list = k === "truck" ? (PP_TRUCKS[title] || []) : (PP_MENU[k] || []), fns = {}, adult = ppAdult(), free = k === "hall" && ppInvited();
var h = ppHead(k === "truck" ? title : (title || "The bar"), k === "hall" ? (free ? "For the twenty, everything here is on the house." : "For the Golden Invitation guests.") : "Everything is paid in gold, and it feeds you as the city's food does.");
list.forEach(function (m) {
var fx = [];
if (m[3])
fx.push("food +" + m[3]);
if (m[4])
fx.push("drink +" + m[4]);
if (m[5] && !adult) {
h += "<div style='margin:6px 0;padding:7px 10px;border:1px dashed rgba(143,180,232,.35);border-radius:4px;opacity:.55'><b>" + esc(m[0] === "x" ? "" : m[1]) + "</b><div style='font-size:12px'>18 and over only</div></div>";
return;
}
h += worldBtn("b:" + m[0], esc(m[1]) + " · " + (free || !m[2] ? "free" : m[2] + " gold") + (m[5] ? " · 18+" : ""), fx.join(" · "));
fns["b:" + m[0]] = function () { ppBuy(k, title, m); };
});
h += "<div id='pp-msg' style='margin-top:6px'></div>";
if (!ppSigned())
h += "<div style='opacity:.75;font-size:12px'>Sign in to buy food and drink.</div>";
worldCard(h, fns);
},
function (k, title, m) {
if (!ppSigned())
return ppMsg("Sign in to buy food and drink.");
if (PP.buying)
return;
PP.buying = true;
cityRpc("party_buy", { p_item: m[0] }).then(function (o) {
PP.buying = false;
if (!o || o.ok === false)
return ppMsg(esc((o && o.say) || "Not now."));
if (typeof needsGot === "function")
try {
needsGot(o);
}
catch (e) { }
ppMsg("<b>" + esc(o.say || "Enjoy.") + "</b>" + (o.price ? " (" + o.price + " gold)" : ""));
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { PP.buying = false; ppMsg(ppMissing(e) ? "The bars open soon." : esc(e.message)); });
},
function (kind, msg) {
var S = PP_SHOPS[kind];
if (!S)
return;
worldCard(ppHead(S.title, S.sub) + "<div style='opacity:.7'>Opening the drawers…</div>");
ppCat().then(function (rows) {
var list = rows.filter(function (r) { return S.wear ? S.wear.test(r.archetype || "") : S.pre.indexOf(r.archetype) >= 0; });
if (S.wear)
list = list.slice(0, 40);
else
list.sort(function (a, b) { return S.pre.indexOf(a.archetype) - S.pre.indexOf(b.archetype); });
var fns = {}, h = ppHead(S.title, S.sub);
if (!list.length)
h += "<div style='opacity:.8'>" + (S.wear ? "The rail is empty tonight." : "The shelves are being filled: they open soon.") + "</div>";
list.forEach(function (r) {
var have = ppHasThing(r.archetype);
h += worldBtn("i" + r.id, esc(r.name) + " · " + (+r.price).toLocaleString() + " gold" + (have ? " · you have one" : ""), esc(r.note || ""));
fns["i" + r.id] = function () { ppBuyThing(kind, r); };
});
h += "<div id='pp-msg' style='margin-top:6px'>" + (msg || "") + "</div>";
if (!ppSigned())
h += "<div style='opacity:.75;font-size:12px'>Sign in to buy.</div>";
worldCard(h, fns);
});
},
function (kind, r) {
if (!ppSigned())
return ppMsg("Sign in to buy.");
if (PP.buying)
return;
PP.buying = true;
ppMsg("…");
buyItem(r.id).then(function (o) {
PP.buying = false;
var ok = o === "ok";
ppShopCard(kind, ok ? "<b>" + esc(r.name) + "</b> is in your backpack." + (r.archetype === "pp_vip_card" ? " Show it at the VIP Lounge in the Glowworm." : "") : esc(String(o || "Not now.")));
});
},
function (id, title, sub) {
if (PP.playing)
return;
var say = PP_GAME_SAY[id] || ["You win!", "Not this time."];
if (!ppSigned()) {
var w = Math.random() < 0.4;
ppMsg((w ? say[0] : say[1]) + " <span style='opacity:.7'>(practice: sign in to win prizes)</span>");
return;
}
PP.playing = true;
ppMsg("…");
cityRpc("party_play", { p_game: id }).then(function (o) {
PP.playing = false;
if (!o || o.ok === false)
return ppMsg(esc((o && o.say) || "Not now."));
if (o.won && typeof loadThings === "function")
loadThings();
if (typeof playTone === "function") {
playTone(o.won ? 880 : 330, 0.3);
if (o.won)
setTimeout(function () { playTone(1100, 0.3); }, 220);
}
ppMsg((o.won ? say[0] : say[1]) + " <b>" + esc(o.say || "") + "</b>");
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { PP.playing = false; ppMsg(ppMissing(e) ? "The games open soon." : esc(e.message)); });
},
function (n) {
var B = PP.bowl;
if (!B || B.lane !== n || B.done) {
B = PP.bowl = ppBowlNew(n);
ppPinsUp(n);
}
var fns = { roll: function () { ppBowlRoll(); }, fresh: function () { PP.bowl = null; ppBowl(n); } };
worldCard(ppHead("Lane " + (n + 1), "Ten frames, the real scoring: strikes and spares count the next balls. Free, all night.") +
"<div style='margin:6px 0'>Frame <b>" + Math.min(10, B.frame) + "</b> · ball " + B.ball + " · pins standing: <b>" + B.pins + "</b> · score <b>" + ppBowlScore(B.rolls) + "</b></div>" +
worldBtn("roll", "Bowl", "Aim, step, swing") + worldBtn("fresh", "Start a new game", "") + "<div id='pp-msg' style='margin-top:6px'>" + (B.say || "") + "</div>", fns);
},
function () {
var B = PP.bowl;
if (!B || B.done)
return;
var skill = Math.random(), down = Math.min(B.pins, Math.round(B.pins * (0.35 + skill * 0.75)));
if (B.ball === 1 && skill > 0.82)
down = B.pins;
B.rolls.push(down);
B.pins -= down;
var L = PP.lanes && PP.lanes[B.lane];
if (L) {
var standing = L.pins.filter(function (p) { return p.rotation.z === 0; });
for (var k = 0; k < down && k < standing.length; k++) {
standing[k].rotation.z = 1.4;
}
}
if (typeof playTone === "function")
playTone(down === 10 ? 660 : 180 + down * 30, 0.4);
var tenth = B.frame === 10;
B.say = down === 10 && B.ball === 1 ? "<b>Strike!</b>" : B.pins === 0 ? "<b>Spare!</b>" : down + " down.";
if (!tenth) {
if (B.ball === 1 && B.pins > 0) {
B.ball = 2;
}
else {
B.frame++;
B.ball = 1;
B.pins = 10;
setTimeout(function () { ppPinsUp(B.lane); }, 900);
}
}
else {
var fr = B.rolls.length, r10 = B.rolls.slice(ppTenthStart(B.rolls));
if (B.pins === 0) {
B.pins = 10;
setTimeout(function () { ppPinsUp(B.lane); }, 900);
}
B.ball++;
var bonus = r10[0] === 10 || (r10[0] + (r10[1] || 0) === 10);
if ((B.ball > 2 && !bonus) || B.ball > 3) {
B.done = true;
B.score = ppBowlScore(B.rolls);
B.say += " <b>Game over: " + B.score + ".</b>" + (B.score >= 200 ? " The whole alley claps." : "");
}
}
B.score = ppBowlScore(B.rolls);
ppBowl(B.lane);
},
function () {
var t = 0, s = [];
for (var i = 0; i < 3; i++) {
var r = Math.random(), v = r < 0.05 ? 50 : r < 0.12 ? 25 : Math.ceil(Math.random() * 20) * (r > 0.9 ? 3 : r > 0.8 ? 2 : 1);
s.push(v);
t += v;
}
PP.dartBest = Math.max(PP.dartBest || 0, t);
worldCard(ppHead("Darts", "Three darts, free to play.") + "<div>Your darts: <b>" + s.join(", ") + "</b> · total <b>" + t + "</b>" + (t >= 100 ? " · a ton!" : "") + "</div><div style='opacity:.75'>Your best tonight: " + PP.dartBest + "</div>" + worldBtn("again", "Throw again", ""), { again: ppDarts });
if (typeof playTone === "function")
playTone(500, 0.15);
},
function () {
var potted = Math.floor(Math.random() * 4), black = Math.random() < 0.12;
worldCard(ppHead("Pool", "Rack them up. Free to play.") + "<div>" + (black ? "You clip the black and it rolls, rolls… and drops. <b>Game won.</b>" : "You break and pot <b>" + potted + "</b> " + (potted === 1 ? "ball" : "balls") + ". Your turn again.") + "</div>" + worldBtn("again", "Take another shot", ""), { again: ppPool });
},
function (room, song) {
worldCard(null);
if (PP.kar && PP.kar.timer)
clearInterval(PP.kar.timer);
var K = PP.kar = { room: room, song: song, line: 0 };
setStatus("🎤 <b>" + esc(song.t) + "</b>: sing along with the screen.");
var notes = [523, 587, 659, 698, 784, 659, 587, 523];
K.timer = setInterval(function () {
if (typeof playTone === "function")
playTone(notes[(K.line * 2) % notes.length], 0.5);
K.line++;
if (K.line >= song.l.length) {
clearInterval(K.timer);
var sc = 70 + Math.floor(Math.random() * 31);
setStatus("🎤 <b>" + esc(song.t) + "</b>: the screen gives you <b>" + sc + "</b>. " + (sc >= 95 ? "A standing ovation!" : sc >= 85 ? "The room cheers." : "A warm round of applause."));
setTimeout(function () { if (PP.kar === K)
PP.kar = null; }, 4000);
}
}, 3000);
}
];
});
