/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var CW = { wings: [], locks: [], doors: [], guide: null, badgeAt: 0, badge: false, wheel: null, busy: false };
var CW_WHEEL = [40, 1, 2, 5, 1, 1, 10, 2, 1, 1, 5, 2, 1, 20, 1, 2, 1, 5, 1, 2, 10, 1, 1, 2, 5, 1, 1, 1, 2, 1, 1, 5, 2, 1, 10, 1, 2, 1, 5, 1, 20, 2, 1, 1, 2, 1, 1, 10, 2, 1, 2, 5, 2, 2];
var CW_DICE = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
var CW_KEY = "The Hidden Crescent";
if (typeof NEEDS_PLACES !== "undefined")
NEEDS_PLACES["The Earthrise Room"] = "Fine dining under Earthrise, for gold";
function cwBadge() {
var now = Date.now();
if (now - CW.badgeAt < 1500)
return CW.badge;
CW.badgeAt = now;
CW.badge = typeof wgBadge === "function" ? !!wgBadge(CW_KEY) : (typeof isKeeperNow === "function" && isKeeperNow());
return CW.badge;
}
function cwWing(G, o) { return __ZC(326, 0, this, arguments, new.target); }
function cwCutWall(G) { return __ZC(326, 1, this, arguments, new.target); }
function cwBuild(G) { return __ZC(326, 2, this, arguments, new.target); }
function cwStaffOnly(what) { return __ZC(326, 3, this, arguments, new.target); }
function cwRoomCard(title, text, post) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(title) + "</div><div style='opacity:.85;margin-top:6px'>" + esc(text) + "</div>" +
(post ? "<div style='opacity:.7;margin-top:6px'>The post here: " + esc(post) + ".</div>" : ""));
}
function cwGuideCard() { return __ZC(326, 4, this, arguments, new.target); }
function cwCrapsLocal(kind, bet) { return __ZC(326, 5, this, arguments, new.target); }
function cwCraps(i) { return __ZC(326, 6, this, arguments, new.target); }
function cwRoll(i, kind) { return __ZC(326, 7, this, arguments, new.target); }
function cwBacLocal(side, bet) { return __ZC(326, 8, this, arguments, new.target); }
function cwBaccarat() { return __ZC(326, 9, this, arguments, new.target); }
function cwDeal(side) { return __ZC(326, 10, this, arguments, new.target); }
function cwWheelLocal(pick, bet) {
var seg = Math.floor(Math.random() * 54), val = CW_WHEEL[seg], pay = val === pick ? bet * (pick + 1) : 0;
CAS.pchips += -bet + pay;
return { ok: true, seg: seg, value: val, win: pay > 0, payout: pay };
}
function cwWheel() { return __ZC(326, 11, this, arguments, new.target); }
function cwSpinWheel(pick) { return __ZC(326, 12, this, arguments, new.target); }
function cwTick(dt) { return __ZC(326, 13, this, arguments, new.target); }
function cwKeep(v, d) {
if (!v || d > 3 || typeof v !== "object")
return;
if (v.isObject3D) {
v.userData.keep = 1;
return;
}
if (Array.isArray(v))
v.forEach(function (x) { cwKeep(x, d + 1); });
else
Object.keys(v).forEach(function (k) { cwKeep(v[k], d + 1); });
}
function cwLiteBake(G) { return __ZC(326, 14, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.casino)
return;
var C = WORLDS.casino, b0 = C.build, k0 = C.tick, bl0 = C.block;
C.build = function (G) {
b0.apply(this, arguments);
try {
cwBuild(G);
}
catch (e) {
if (window.console)
console.warn("[casino-wings]", e);
}
try {
cwLiteBake(G);
}
catch (e) {
if (window.console)
console.warn("[casino-wings] bake", e);
}
};
C.tick = function (dt) { k0.apply(this, arguments); try {
cwTick(dt);
}
catch (e) { } };
C.bound = 80;
C.block = function (x, z, feet) {
if (x * x + z * z > 30.5 * 30.5) {
var inn = false;
for (var i = 0; i < CW.wings.length; i++) {
var W = CW.wings[i];
if (W.inside(x, z) || W.door(x, z)) {
inn = true;
break;
}
}
if (!inn)
return true;
}
if (CW.locks.length && !cwBadge() && worldSolidAt(CW.locks, x, z, feet))
return true;
return bl0.apply(this, arguments);
};
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (h) {
var G = CW.guide;
if (G && WLD.on === "casino" && h) {
var L = worldLocal(), dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 3) {
CW.guide = null;
setStatus("<b>" + esc(G.name) + ".</b> You are here.");
}
else {
var arrow = "➜";
try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
arrow = pfindArrow(bearingOf(dx, dz));
}
catch (e) { }
h += "<div>" + arrow + " <b>" + esc(G.name) + "</b> · " + Math.round(d) + " m</div>";
}
}
return wb.apply(this, [h].concat([].slice.call(arguments, 1)));
};
}
})();
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.casino)
return;
var C = WORLDS.casino, b0 = C.build;
C.build = function (G) { b0.apply(this, arguments); try {
cwdDress(G);
}
catch (e) {
if (window.console)
console.warn("[casino-dress]", e);
} };
})();
function cwdPanels(base, line, rep) { return __ZC(326, 15, this, arguments, new.target); }
function cwdPicture(kind) { return __ZC(326, 16, this, arguments, new.target); }
function cwdPlant(W, lx, lz, sc) { return __ZC(326, 17, this, arguments, new.target); }
function cwdDress(G) { return __ZC(326, 18, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.casino)
return;
var C = WORLDS.casino, b0 = C.build;
C.build = function (G) { b0.apply(this, arguments); try {
cwlLight(G);
}
catch (e) {
if (window.console)
console.warn("[casino-lights]", e);
} };
})();
var CWL_TEX = null;
function cwlWashTex() { return __ZC(326, 19, this, arguments, new.target); }
function cwlLight(G) { return __ZC(326, 20, this, arguments, new.target); }
var CAS_LINES = [[3, 4, 5], [0, 1, 2], [6, 7, 8], [0, 4, 8], [6, 4, 2]];
CAS.lines = 1;
CAS.hands = 1;
function casSymOne() { var r = Math.floor(Math.random() * 35); return r < 6 ? "cherry" : r < 16 ? "lemon" : r < 24 ? "bell" : r < 30 ? "star" : r < 33 ? "seven" : "moon"; }
function casLinePay(a, b, c) { if (a === b && b === c)
return { moon: 200, seven: 80, star: 30, bell: 16, lemon: 10, cherry: 10 }[a]; return [a, b, c].filter(function (x) { return x === "cherry"; }).length === 2 ? 3 : 0; }
function casSlotsLinesLocal(bet, n) { return __ZC(326, 21, this, arguments, new.target); }
function casPicker(name, opts, cur, unit) { return __ZC(326, 22, this, arguments, new.target); }
function casGridHtml(g, lit) { return __ZC(326, 23, this, arguments, new.target); }
(function () {
if (typeof casSlots !== "function" || typeof casPoker !== "function")
return;
var slots0 = casSlots, pull0 = casPull, poker0 = casPoker, deal0 = casVpDeal, draw0 = casVpDraw;
casSlots = function (last) {
if (CAS.lines === 1 && !last) {
slots0();
casSlotsPicker();
return;
}
var n = CAS.lines, html = casHead("A slot machine", "Three moons pay 200 to 1; three sevens 80; three stars 30; three bells 16; three lemons or cherries 10; two cherries 3. " +
(n > 1 ? n + " lines: the middle, top and bottom rows" + (n === 5 ? " and both diagonals" : "") + "; each line costs the bet." : ""));
var g = last && last.grid || ["moon", "star", "cherry", "bell", "seven", "lemon", "star", "moon", "bell"], lit = {};
if (last && last.wins)
last.wins.forEach(function (w) { CAS_LINES[w.line - 1].forEach(function (k) { lit[k] = 1; }); });
if (n === 1)
html += "<div id='cas-reels' style='font-size:40px;text-align:center;margin:6px 0'>" + [3, 4, 5].map(function (k) { return CAS_SYM[g[k]] || "?"; }).join("") + "</div>";
else
html += casGridHtml(g, lit);
html += casPicker("Lines", [1, 3, 5], n, "ln") + casBetInput("cas-bet", CAS.lastBet || CAS.min) + (n > 1 ? "<div style='text-align:center;font-size:12px;opacity:.8'>chips a line · " + n + " lines</div>" : "") +
worldBtn("spin", "Pull the lever", "") + "<div id='cas-msg'></div>";
var fns = { spin: casPull };
[1, 3, 5].forEach(function (k) { fns["ln" + k] = function () { CAS.lines = k; casSlots(); }; });
worldCard(html, fns);
};
function casSlotsPicker() {
try {
var c = WLD.card, b = c && c.querySelector("[data-w='spin']");
if (!b || c.querySelector(".cas-pick"))
return;
var d = document.createElement("div");
d.innerHTML = casPicker("Lines", [1, 3, 5], 1, "ln");
var p = d.firstChild;
b.parentNode.insertBefore(p, b);
p.querySelectorAll("[data-w]").forEach(function (s) { s.style.cursor = "pointer"; s.onclick = function (ev) { ev.stopPropagation(); CAS.lines = +s.getAttribute("data-w").slice(2); casSlots(); }; });
}
catch (e) { }
}
casPull = function () {
var n = CAS.lines;
if (n === 1)
return pull0.apply(this, arguments);
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
var have = CAS.practice ? CAS.pchips : CAS.chips;
if (have != null && bet * n > have)
return casMsg("That is " + bet * n + " chips for " + n + " lines; you have " + have + ".");
CAS.lastBet = bet;
CAS.busy = true;
var keys = Object.keys(CAS_SYM), roll = setInterval(function () { var gEl = document.getElementById("cas-grid"); if (gEl)
gEl.querySelectorAll("i").forEach(function (c) { c.textContent = CAS_SYM[keys[Math.floor(Math.random() * keys.length)]]; }); }, 90);
var p = CAS.practice ? Promise.resolve(casSlotsLinesLocal(bet, n)) : casRpc("casino_slots_lines", { p_bet: bet, p_lines: n });
p.then(function (o) {
setTimeout(function () {
clearInterval(roll);
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The machine will not take that."));
casPaid(o);
casSlots(o);
casMsg(o.win ? "<b style='color:#FFE7B0'>" + o.wins.map(function (w) { return "Line " + w.line + ": " + w.pay; }).join(" · ") + " · you win " + o.payout + " chips!</b>" : "No luck this time.");
}, 1100);
}).catch(function (e) { clearInterval(roll); CAS.busy = false; casMsg(/function|schema cache|not find/i.test(String(e && e.message)) ? "Multi-line play opens with the casino's next update. One line plays now." : esc(e.message)); });
};
casPoker = function () {
var H = CAS.hand && CAS.hand.game === "vpm" ? CAS.hand : null;
if (!H && CAS.hands === 1) {
poker0();
casPokerPicker();
return;
}
if (!H && CAS.hand && CAS.hand.game === "vp" && CAS.hand.status === "open") {
poker0();
return;
}
var n = H ? H.n : CAS.hands, html = casHead("Video poker: Jacks or Better", n + " hands at once: one hand is dealt, the cards you hold go to every hand, and each draws the rest from its own deck. " +
CAS_VP_PAY.map(function (p) { return p[0] + " " + p[1] + "×"; }).join(" · ") + ".");
if (H) {
html += "<div style='text-align:center'>" + H.cards.map(function (c, k) {
return "<span data-w='h" + k + "' style='display:inline-block;margin:2px;padding:2px;border:2px solid " + (H.hold[k] ? "#FFE7B0" : "transparent") + ";border-radius:6px'>" + casCard(c) +
"<div style='font-size:10px;opacity:.85'>" + (H.status === "open" ? (H.hold[k] ? "HELD" : "tap to hold") : "") + "</div></span>";
}).join("") + "</div>";
if (H.status === "open")
html += worldBtn("draw", "Draw", "Every hand draws the cards you did not hold");
else {
html += "<div style='margin:8px 0;max-height:220px;overflow:auto'>" + H.res.map(function (r, i) {
return "<div style='display:flex;gap:6px;align-items:center;justify-content:center;margin:2px 0;font-size:12px;" + (r.payout ? "color:#FFE38A" : "opacity:.75") + "'>" +
"<span style='width:18px;text-align:right'>" + (i + 1) + "</span>" + r.cards.map(function (c) { return casCard(c); }).join("") + "<span style='min-width:110px'>" + esc(r.result) + (r.payout ? " · " + r.payout : "") + "</span></div>";
}).join("") + "</div>" +
"<div style='text-align:center;font-size:15px'><b style='color:#FFE7B0'>" + (H.payout ? "You win " + H.payout + " chips" : "No winning hands") + "</b></div>" +
casPicker("Hands", [1, 3, 5, 10], CAS.hands, "hn") + casBetInput("cas-bet", H.bet) + worldBtn("deal", "Deal again", "");
}
}
else
html += casPicker("Hands", [1, 3, 5, 10], n, "hn") + casBetInput("cas-bet", CAS.lastBet || CAS.min) + "<div style='text-align:center;font-size:12px;opacity:.8'>chips a hand · " + n + " hands</div>" + worldBtn("deal", "Deal", "");
html += "<div id='cas-msg' style='margin-top:6px'></div>";
var fns = { deal: casVpDeal, draw: casVpDraw };
[0, 1, 2, 3, 4].forEach(function (k) { fns["h" + k] = function () { if (H && H.status === "open") {
H.hold[k] = !H.hold[k];
casPoker();
} }; });
[1, 3, 5, 10].forEach(function (k) { fns["hn" + k] = function () { CAS.hands = k; if (CAS.hand && CAS.hand.status !== "open")
CAS.hand = null; casPoker(); }; });
worldCard(html, fns);
};
function casPokerPicker() {
try {
var c = WLD.card, b = c && c.querySelector("[data-w='deal']");
if (!b || c.querySelector(".cas-pick"))
return;
var d = document.createElement("div");
d.innerHTML = casPicker("Hands", [1, 3, 5, 10], 1, "hn");
var p = d.firstChild;
b.parentNode.insertBefore(p, b);
p.querySelectorAll("[data-w]").forEach(function (s) { s.style.cursor = "pointer"; s.onclick = function (ev) { ev.stopPropagation(); CAS.hands = +s.getAttribute("data-w").slice(2); if (CAS.hand && CAS.hand.status !== "open")
CAS.hand = null; casPoker(); }; });
}
catch (e) { }
}
casVpDeal = function () {
var n = CAS.hands;
if (n === 1)
return deal0.apply(this, arguments);
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
CAS.lastBet = bet;
var have = CAS.practice ? CAS.pchips : CAS.chips;
if (have != null && bet * n > have)
return casMsg("That is " + bet * n + " chips for " + n + " hands; you have " + have + ".");
if (CAS.practice) {
var d = casDeck();
CAS.pchips -= bet * n;
CAS.hand = { game: "vpm", local: true, n: n, cards: d.slice(0, 5), hold: [false, false, false, false, false], status: "open", bet: bet };
casPoker();
return;
}
CAS.busy = true;
casRpc("casino_vp_multi_deal", { p_bet: bet, p_hands: n }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The machine will not deal."));
casPaid(o);
CAS.hand = { game: "vpm", hand: o.hand, n: n, cards: o.cards, hold: [false, false, false, false, false], status: "open", bet: bet };
casPoker();
})
.catch(function (e) { CAS.busy = false; casMsg(/function|schema cache|not find/i.test(String(e && e.message)) ? "More than one hand opens with the casino's next update. One hand plays now." : esc(e.message)); });
};
casVpDraw = function () {
var H = CAS.hand;
if (!H || H.game !== "vpm")
return draw0.apply(this, arguments);
if (H.status !== "open" || CAS.busy)
return;
if (H.local) {
var res = [], pay = 0;
for (var j = 0; j < H.n; j++) {
var deck = casDeck().filter(function (c) { return H.cards.indexOf(c) < 0; }), cs = H.cards.slice(), k = 0;
for (var i = 0; i < 5; i++)
if (!H.hold[i])
cs[i] = deck[k++];
var r = casVpRank(cs);
res.push({ cards: cs, result: r[0], payout: H.bet * r[1] });
pay += H.bet * r[1];
}
CAS.pchips += pay;
H.res = res;
H.payout = pay;
H.status = "done";
casPoker();
return;
}
CAS.busy = true;
casRpc("casino_vp_multi_draw", { p_hand: H.hand, p_hold: H.hold }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "Not now."));
casPaid(o);
H.res = o.hands;
H.payout = o.payout;
H.status = "done";
casPoker();
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
};
})();
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.casino)
return;
var C = WORLDS.casino, b0 = C.build;
C.build = function (G) { b0.apply(this, arguments); try {
casBanks(G);
}
catch (e) {
if (window.console)
console.warn("[casino-banks]", e);
} };
})();
var CAS_SCREEN = {};
function casScreenTex(kind) { return __ZC(326, 24, this, arguments, new.target); }
function casBanks(G) { return __ZC(326, 25, this, arguments, new.target); }
(function () {
if (typeof casHead !== "function" || typeof worldCard !== "function")
return;
var css = document.createElement("style");
css.id = "cas-neo-css";
css.textContent =
"@keyframes casNeoRun{from{background-position:0% 50%}to{background-position:200% 50%}}" +
".cas-neo{position:relative;background:linear-gradient(160deg,rgba(14,6,36,.96),rgba(10,10,34,.96) 55%,rgba(4,20,40,.96))!important;color:#E6F4FF!important;" +
"border:1px solid rgba(64,232,255,.75)!important;border-radius:14px!important;box-shadow:0 0 22px rgba(64,232,255,.35),0 0 46px rgba(255,46,196,.18),inset 0 0 30px rgba(255,46,196,.10)!important;" +
"font-family:'Segoe UI',system-ui,sans-serif!important;overflow:hidden}" +
".cas-neo::before{content:'';position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#40E8FF,#FF2EC4,#FFD24A,#40E8FF,#FF2EC4);background-size:200% 100%;animation:casNeoRun 6s linear infinite;opacity:.9}" +
".cas-neo::after{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#FF2EC4,#40E8FF,#FF2EC4);background-size:200% 100%;animation:casNeoRun 9s linear infinite reverse;opacity:.7}" +
".cas-neo .cas-neo-title{font:700 19px 'Segoe UI',system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;background:linear-gradient(90deg,#7AF4FF,#FF7ADC,#FFE38A);-webkit-background-clip:text;background-clip:text;color:transparent;" +
"filter:drop-shadow(0 0 6px rgba(64,232,255,.55))}" +
".cas-neo .cas-neo-sub{opacity:.85;margin:4px 0 8px;font-size:13px;line-height:1.45;color:#C8DCF0}" +
".cas-neo .cas-neo-led{display:flex;gap:14px;align-items:baseline;margin:6px 0 10px;padding:8px 12px;border-radius:8px;background:rgba(0,0,0,.55);border:1px solid rgba(255,46,196,.6);box-shadow:inset 0 0 14px rgba(255,46,196,.25),0 0 10px rgba(255,46,196,.25)}" +
".cas-neo .cas-neo-led b{font:700 22px 'Consolas','Courier New',monospace;color:#FFE38A;text-shadow:0 0 8px rgba(255,210,74,.9),0 0 18px rgba(255,140,0,.5);letter-spacing:.06em}" +
".cas-neo .cas-neo-led span{font-size:12px;opacity:.8;color:#9FE8FF;text-transform:uppercase;letter-spacing:.12em}" +
".cas-neo [data-w]:not([data-w=close]){border:1px solid rgba(64,232,255,.7)!important;border-radius:9px!important;background:linear-gradient(180deg,rgba(64,232,255,.16),rgba(255,46,196,.10))!important;" +
"box-shadow:0 0 10px rgba(64,232,255,.25),inset 0 0 10px rgba(64,232,255,.12);transition:box-shadow .25s,transform .12s,border-color .25s;color:#F2FAFF}" +
".cas-neo [data-w]:not([data-w=close]):hover{border-color:#FF7ADC!important;box-shadow:0 0 16px rgba(255,46,196,.55),inset 0 0 14px rgba(255,46,196,.2);transform:translateY(-1px)}" +
".cas-neo [data-w]:not([data-w=close]) b{text-shadow:0 0 6px rgba(64,232,255,.6)}" +
".cas-neo span[data-w^='b-']{display:inline-block;min-width:54px;text-align:center;font-weight:700}" +
".cas-neo span[data-w='b-red'][style]{background:radial-gradient(circle at 50% 35%,#FF4A5A,#8A0A1C)!important;border-color:#FF6A7A!important;box-shadow:0 0 12px rgba(255,60,80,.6)!important}" +
".cas-neo span[data-w='b-black'][style]{background:radial-gradient(circle at 50% 35%,#3A3A4A,#08080C)!important;border-color:#9FE8FF!important}" +
".cas-neo input{background:rgba(0,0,0,.6)!important;border:1px solid #40E8FF!important;color:#FFE38A!important;border-radius:6px;font:700 15px 'Consolas',monospace!important;box-shadow:0 0 8px rgba(64,232,255,.35)}" +
".cas-neo #cas-reels{background:linear-gradient(180deg,#05020E,#1A0A30 50%,#05020E);border:2px solid #FF2EC4;border-radius:12px;padding:10px 0;box-shadow:inset 0 0 22px rgba(255,46,196,.45),0 0 18px rgba(255,46,196,.35)}" +
".cas-neo span[style*='F8F4EA']{box-shadow:0 0 12px rgba(160,230,255,.55),0 2px 0 rgba(0,0,0,.4);border:1px solid #9FE8FF}" +
".cas-neo #cas-msg b{color:#FFE38A!important;text-shadow:0 0 10px rgba(255,210,74,.8)}" +
".cas-neo [data-w=close]{color:#7AF4FF;opacity:.9!important;text-shadow:0 0 6px rgba(64,232,255,.8)}";
document.head.appendChild(css);
casHead = function (title, sub) {
var led = CAS.practice ? "<b>" + (CAS.pchips || 0).toLocaleString() + "</b><span>practice chips · they win nothing</span>"
: "<b>" + (CAS.chips || 0).toLocaleString() + "</b><span>chips</span><b style='font-size:16px;color:#7AF4FF;text-shadow:0 0 8px rgba(64,232,255,.9)'>" + (CAS.gold || 0).toLocaleString() + "</b><span>gold</span>";
return "<span class='cas-neo-mark' style='display:none'></span><div class='cas-neo-title'>" + esc(title) + "</div>" + (sub ? "<div class='cas-neo-sub'>" + sub + "</div>" : "") + "<div class='cas-neo-led'>" + led + "</div>";
};
var wc0 = worldCard;
worldCard = function (html, fns) {
var r = wc0.apply(this, arguments);
try {
var c = WLD.card;
if (c)
c.classList.toggle("cas-neo", !!(html && html.indexOf("cas-neo-mark") >= 0));
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof casHead !== "function" || typeof worldCard !== "function")
return;
var css = document.createElement("style");
css.id = "cas-neo2-css";
css.textContent =
"#wld-card.cas-neo{left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%);width:min(600px,calc(100vw - 20px))!important;" +
"max-height:calc(100vh - 40px)!important;padding:14px 20px 18px!important;font-size:14px!important;" +
"box-shadow:0 0 0 100vmax rgba(3,0,12,.55),0 0 26px rgba(64,232,255,.45),0 0 60px rgba(255,46,196,.25),inset 0 0 40px rgba(255,46,196,.10)!important}" +
"#wld-card.cas-neo .cas-neo-title{font-size:24px;text-align:center}" +
"#wld-card.cas-neo .cas-neo-sub{text-align:center}" +
"#wld-card.cas-neo .cas-neo-led{justify-content:center}" +
".cas-art{display:block;margin:2px auto 6px;width:100%;max-width:520px;height:auto;filter:drop-shadow(0 0 10px rgba(255,46,196,.35))}" +
"@keyframes casArtTurn{from{transform:rotate(0)}to{transform:rotate(360deg)}}" +
".cas-art .turn{transform-origin:260px 80px;animation:casArtTurn 40s linear infinite}" +
".cas-busy .cas-art .turn{animation-duration:3s}" +
"#wld-card.cas-neo [data-w]:not([data-w=close]){padding:8px 12px!important;font-size:14px}" +
"#wld-card.cas-neo div[style*='flex-wrap']{justify-content:center}" +
".cas-board{display:grid;grid-template-columns:34px repeat(12,1fr);grid-template-rows:repeat(3,28px);gap:2px;margin:10px 0 4px;padding:6px;border-radius:8px;" +
"background:linear-gradient(180deg,#0B4A30,#06301F);border:1px solid #C9A868;box-shadow:inset 0 0 16px rgba(0,0,0,.6),0 0 12px rgba(201,168,104,.3)}" +
".cas-board span{display:flex;align-items:center;justify-content:center;font:700 12px 'Segoe UI',system-ui,sans-serif;color:#fff;border-radius:3px;cursor:pointer;" +
"border:1px solid rgba(232,224,208,.5);transition:box-shadow .2s,transform .1s}" +
".cas-board span:hover{box-shadow:0 0 10px #FFE38A;transform:translateY(-1px)}" +
".cas-board .r{background:radial-gradient(circle at 50% 35%,#E0303E,#8A0A1C)}.cas-board .k{background:radial-gradient(circle at 50% 35%,#3A3A44,#0A0A10)}" +
".cas-board .z{grid-row:1 / span 3;background:radial-gradient(circle at 50% 35%,#2ABA6A,#0A5A2A)}" +
".cas-board .on{box-shadow:0 0 0 2px #FFE38A,0 0 12px #FFE38A}" +
"#wld-card.cas-neo #cas-reels{display:flex;justify-content:center;gap:10px;letter-spacing:0!important;padding:12px 10px!important}" +
"#wld-card.cas-neo #cas-reels i{font-style:normal;display:flex;align-items:center;justify-content:center;width:96px;height:96px;font-size:58px;border-radius:10px;" +
"background:linear-gradient(180deg,#B8B0C8 0%,#FFFFFF 22%,#FFFFFF 78%,#B8B0C8 100%);box-shadow:inset 0 8px 14px rgba(0,0,0,.35),inset 0 -8px 14px rgba(0,0,0,.35),0 0 14px rgba(255,210,74,.5);border:2px solid #FFD24A}" +
"#wld-card.cas-neo span[style*='F8F4EA']{font-size:20px!important;min-width:34px;padding:8px 6px!important;border-radius:6px!important;display:inline-block;text-align:center}";
document.head.appendChild(css);
var REDS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
var ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
function wedge(cx, cy, r0, r1, a0, a1, fill) {
var p = function (r, a) { return (cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1); };
return "<path d='M" + p(r0, a0) + " L" + p(r1, a0) + " A" + r1 + "," + r1 + " 0 0 1 " + p(r1, a1) + " L" + p(r0, a1) + " A" + r0 + "," + r0 + " 0 0 0 " + p(r0, a0) + "Z' fill='" + fill + "'/>";
}
function defs() {
return "<defs><radialGradient id='casG' cx='50%' cy='40%'><stop offset='0' stop-color='#FFE9A8'/><stop offset='1' stop-color='#9A7428'/></radialGradient>" +
"<radialGradient id='casF' cx='50%' cy='30%' r='75%'><stop offset='0' stop-color='#138A55'/><stop offset='1' stop-color='#063A22'/></radialGradient>" +
"<linearGradient id='casS' x1='0' x2='1'><stop offset='0' stop-color='#40E8FF'/><stop offset='.5' stop-color='#FF2EC4'/><stop offset='1' stop-color='#FFD24A'/></linearGradient></defs>";
}
function wheelSvg() {
var s = "", n = 37, cx = 260, cy = 80;
for (var i = 0; i < n; i++) {
var a0 = i / n * 6.2832 - 1.5708, a1 = (i + 1) / n * 6.2832 - 1.5708, v = ORDER[i];
s += wedge(cx, cy, 44, 70, a0, a1, v === 0 ? "#1E9A55" : REDS.indexOf(v) >= 0 ? "#B01E2C" : "#121216");
var am = (a0 + a1) / 2, tx = cx + Math.cos(am) * 62, ty = cy + Math.sin(am) * 62;
s += "<text x='" + tx.toFixed(1) + "' y='" + ty.toFixed(1) + "' fill='#F4ECD8' font-size='6.5' font-weight='700' text-anchor='middle' dominant-baseline='middle' transform='rotate(" + ((am * 57.3) + 90).toFixed(1) + " " + tx.toFixed(1) + " " + ty.toFixed(1) + ")'>" + v + "</text>";
}
for (var k = 0; k < 8; k++) {
var a = k / 8 * 6.2832;
s += "<line x1='" + cx + "' y1='" + cy + "' x2='" + (cx + Math.cos(a) * 38).toFixed(1) + "' y2='" + (cy + Math.sin(a) * 38).toFixed(1) + "' stroke='url(#casG)' stroke-width='3'/>";
}
return "<svg class='cas-art' viewBox='0 0 520 160'>" + defs() +
"<ellipse cx='260' cy='80' rx='250' ry='74' fill='url(#casF)' stroke='#C9A868' stroke-width='2'/>" +
"<circle cx='260' cy='80' r='79' fill='#3A1A0C' stroke='url(#casG)' stroke-width='5'/>" +
"<g class='turn'>" + s + "<circle cx='260' cy='80' r='44' fill='#5A2A12' stroke='url(#casG)' stroke-width='2'/><circle cx='260' cy='80' r='9' fill='url(#casG)'/></g>" +
"<circle cx='260' cy='13' r='4' fill='#FFFFFF' stroke='#CCC'/>" +
"</svg>";
}
function bigSixSvg() {
var segs = [1, 2, 1, 5, 1, 2, 1, 10, 1, 2, 1, 5, 1, 20, 1, 2, 1, 5, 1, 2, 1, 10, 1, 40], s = "", cx = 260, cy = 80, cols = { 1: "#E8D8A8", 2: "#40A8E8", 5: "#E83A8A", 10: "#8A4AE8", 20: "#E8A030", 40: "#30C870" };
for (var i = 0; i < segs.length; i++) {
var a0 = i / segs.length * 6.2832, a1 = (i + 1) / segs.length * 6.2832;
s += wedge(cx, cy, 24, 72, a0, a1, cols[segs[i]]);
var am = (a0 + a1) / 2, tx = cx + Math.cos(am) * 56, ty = cy + Math.sin(am) * 56;
s += "<text x='" + tx.toFixed(1) + "' y='" + ty.toFixed(1) + "' fill='#141018' font-size='10' font-weight='800' text-anchor='middle' dominant-baseline='middle' transform='rotate(" + ((am * 57.3) + 90).toFixed(1) + " " + tx.toFixed(1) + " " + ty.toFixed(1) + ")'>" + segs[i] + "</text>";
}
return "<svg class='cas-art' viewBox='0 0 520 160'>" + defs() + "<rect x='40' y='4' width='440' height='152' rx='16' fill='#14081E' stroke='url(#casS)' stroke-width='2'/>" +
"<circle cx='260' cy='80' r='77' fill='#2A1408' stroke='url(#casG)' stroke-width='5'/><g class='turn'>" + s + "</g><circle cx='260' cy='80' r='22' fill='url(#casG)'/>" +
"<path d='M252 0 L268 0 L260 16 Z' fill='#FFD24A'/></svg>";
}
function bulbs(x0, x1, y, n) { var s = ""; for (var i = 0; i < n; i++) {
var x = x0 + (x1 - x0) * i / (n - 1);
s += "<circle cx='" + x.toFixed(1) + "' cy='" + y + "' r='3.2' fill='#FFF2B0'/><circle cx='" + x.toFixed(1) + "' cy='" + y + "' r='6' fill='#FFD24A' opacity='.25'/>";
} return s; }
function slotSvg() {
return "<svg class='cas-art' viewBox='0 0 520 110'>" + defs() +
"<path d='M70 100 Q70 12 260 10 Q450 12 450 100 Z' fill='#4A0A2A' stroke='url(#casG)' stroke-width='4'/>" +
"<path d='M100 100 Q100 34 260 32 Q420 34 420 100 Z' fill='#1A0618' stroke='url(#casS)' stroke-width='2'/>" +
bulbs(110, 410, 22, 19) +
"<text x='260' y='78' fill='url(#casG)' font-size='34' font-weight='800' text-anchor='middle' font-family='Georgia,serif' letter-spacing='3'>MOONSHOT</text>" +
"<text x='260' y='96' fill='#9FE8FF' font-size='11' text-anchor='middle' letter-spacing='4'>THREE MOONS PAY 200 TO 1</text></svg>";
}
function card(x, y, rot, txt, red) {
return "<g transform='translate(" + x + " " + y + ") rotate(" + rot + ")'><rect x='-22' y='-32' width='44' height='64' rx='5' fill='#FBF8F0' stroke='#9FE8FF' stroke-width='1.2'/>" +
"<text x='0' y='8' font-size='22' font-weight='700' text-anchor='middle' fill='" + (red ? "#C01E2C" : "#141418") + "'>" + txt + "</text></g>";
}
function feltSvg(cards, label) {
var s = "", n = cards.length;
for (var i = 0; i < n; i++) {
var t = n > 1 ? (i / (n - 1)) - 0.5 : 0;
s += card(260 + t * (n > 3 ? 230 : 120), 96 + Math.abs(t) * 12, t * (n > 3 ? 28 : 30), cards[i][0], cards[i][1]);
}
return "<svg class='cas-art' viewBox='0 0 520 150'>" + defs() +
"<path d='M20 8 L500 8 L500 60 Q260 175 20 60 Z' fill='url(#casF)' stroke='url(#casG)' stroke-width='4'/>" +
"<path id='casArc' d='M70 24 Q260 66 450 24' fill='none'/>" +
"<text fill='#E8D8A0' font-size='12' letter-spacing='3' font-weight='700'><textPath href='#casArc' startOffset='50%' text-anchor='middle'>" + label + "</textPath></text>" +
"<circle cx='60' cy='30' r='11' fill='#C0303A' stroke='#fff' stroke-dasharray='4 3'/><circle cx='460' cy='30' r='11' fill='#2A6AC8' stroke='#fff' stroke-dasharray='4 3'/>" + s + "</svg>";
}
function diceSvg() {
function die(x, y, r, n) {
var p = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[n], s = "";
p.forEach(function (q) { s += "<circle cx='" + (q[0] * 11) + "' cy='" + (q[1] * 11) + "' r='4' fill='#FFF'/>"; });
return "<g transform='translate(" + x + " " + y + ") rotate(" + r + ")'><rect x='-21' y='-21' width='42' height='42' rx='7' fill='#C0101E' stroke='#FF8A9A'/>" + s + "</g>";
}
return "<svg class='cas-art' viewBox='0 0 520 120'>" + defs() + "<rect x='20' y='6' width='480' height='108' rx='18' fill='url(#casF)' stroke='url(#casG)' stroke-width='4'/>" +
"<text x='120' y='66' fill='#E8D8A0' font-size='22' font-weight='800' text-anchor='middle' letter-spacing='3'>PASS LINE</text>" +
"<text x='400' y='66' fill='#E8D8A0' font-size='16' font-weight='700' text-anchor='middle' letter-spacing='2'>COME · FIELD</text>" + die(240, 60, -14, 5) + die(290, 66, 10, 2) + "</svg>";
}
function chipsSvg() {
var s = "", cols = ["#C0303A", "#2A6AC8", "#2A8A4A", "#141418", "#E8E0D0", "#8A4AE8"];
for (var c = 0; c < 6; c++) {
var x = 95 + c * 66, h = 4 + ((c * 7) % 5) * 2;
for (var k = 0; k < h; k++) {
var y = 96 - k * 6;
s += "<ellipse cx='" + x + "' cy='" + y + "' rx='24' ry='8' fill='" + cols[c] + "' stroke='#FFF' stroke-width='1' stroke-dasharray='5 4'/>";
}
}
return "<svg class='cas-art' viewBox='0 0 520 120'>" + defs() + "<rect x='40' y='100' width='440' height='14' rx='4' fill='url(#casG)'/>" + s + "</svg>";
}
var ART = { "Roulette": wheelSvg, "The Big Six wheel": bigSixSvg, "A slot machine": slotSvg, "Craps": diceSvg, "The cage": chipsSvg,
"Blackjack": function () { return feltSvg([["A♠", 0], ["K♥", 1]], "BLACKJACK PAYS 3 TO 2"); },
"Baccarat": function () { return feltSvg([["9♦", 1], ["8♣", 0], ["5♥", 1]], "PLAYER · BANKER · TIE"); },
"Video poker: Jacks or Better": function () { return feltSvg([["J♠", 0], ["J♥", 1], ["7♦", 1], ["7♣", 0], ["A♠", 0]], "JACKS OR BETTER"); } };
var CACHE = {};
var h0 = casHead;
casHead = function (title, sub) {
var r = h0.apply(this, arguments), f = ART[title];
if (f)
try {
var a = CACHE[title] || (CACHE[title] = f());
r = r.replace("<div class='cas-neo-title'>", a + "<div class='cas-neo-title'>");
}
catch (e) { }
return r;
};
function board(card) {
var num = card.querySelector("#cas-num"), go = card.querySelector("[data-w='b-straight']");
if (!num || !go || card.querySelector(".cas-board"))
return;
var b = document.createElement("div");
b.className = "cas-board";
var h = "<span class='z' data-n='0'>0</span>";
for (var row = 0; row < 3; row++)
for (var c = 0; c < 12; c++) {
var n = c * 3 + 3 - row;
h += "<span class='" + (REDS.indexOf(n) >= 0 ? "r" : "k") + "' data-n='" + n + "' style='grid-row:" + (row + 1) + ";grid-column:" + (c + 2) + "'>" + n + "</span>";
}
b.innerHTML = h;
var lab = num.closest("label") || num;
lab.parentNode.insertBefore(b, lab);
var mark = function () { var v = +num.value; b.querySelectorAll("span").forEach(function (s) { s.classList.toggle("on", +s.getAttribute("data-n") === v); }); };
b.querySelectorAll("span").forEach(function (s) { s.onclick = function (ev) { ev.stopPropagation(); num.value = s.getAttribute("data-n"); mark(); go.click(); }; });
num.addEventListener("input", mark);
mark();
}
function reels(card) {
var el = card.querySelector("#cas-reels");
if (!el)
return;
var draw = function () {
if (el.querySelector("i"))
return;
var t = Array.from(el.textContent || "");
if (!t.length)
return;
var cells = [], cur = "";
t.forEach(function (ch) { if (/[️‍]/.test(ch) || (cur && /[\u{1F3FB}-\u{1F3FF}]/u.test(ch))) {
cur += ch;
return;
} if (cur)
cells.push(cur); cur = ch; });
if (cur)
cells.push(cur);
el.innerHTML = cells.map(function (c) { return "<i>" + c + "</i>"; }).join("");
};
draw();
if (!el.__casObs && typeof MutationObserver !== "undefined") {
el.__casObs = new MutationObserver(draw);
el.__casObs.observe(el, { childList: true, characterData: true, subtree: true });
}
}
var wc0 = worldCard;
worldCard = function (html, fns) {
var r = wc0.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.classList.contains("cas-neo")) {
board(c);
reels(c);
}
}
catch (e) { }
return r;
};
setInterval(function () { try {
var c = WLD.card;
if (c && c.classList.contains("cas-neo"))
c.classList.toggle("cas-busy", !!(typeof CAS !== "undefined" && CAS.busy));
}
catch (e) { } }, 300);
})();
