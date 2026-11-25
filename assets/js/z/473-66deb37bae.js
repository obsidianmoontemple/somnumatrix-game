/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(473, function () {
return [
function () {
if (typeof hlGet !== "function" || typeof HL_STEPS === "undefined")
return null;
var A = typeof gsGet === "function" ? gsGet().act : null;
if (A && typeof GS_CH !== "undefined" && GS_CH[A.id] && typeof gsLine === "function") {
var st = GS_CH[A.id].steps[A.i];
if (st)
return { st: 1, h: gsLine(st) };
}
var n = Math.floor(hlGet().step || 0);
if (n >= HL_STEPS.length - 1)
return { st: 2 };
return { st: n > 0 ? 1 : 0, h: HL_STEPS[n] };
},
function (k) {
var out = [];
if (!k)
return out;
QST_LIST.forEach(function (E) {
var w = qstKey(E.w);
if (Array.isArray(w) ? w.indexOf(k) < 0 : w !== k)
return;
if (!qstFn(E.open))
return;
var s = null;
try {
s = E.state ? E.state() : { st: 0 };
}
catch (e) {
s = null;
}
if (E.state && !s)
return;
out.push({ E: E, s: s || { st: 0 } });
});
return out;
},
function () {
var P = QST.panel, H = typeof WLD !== "undefined" && WLD.hud;
if (!P)
return;
var top = 76;
if (H && H.style.display !== "none") {
var r = H.getBoundingClientRect();
if (r.height)
top = Math.max(top, Math.round(r.bottom + 10));
}
top = Math.min(top, Math.max(76, innerHeight - 260));
var t = top + "px";
if (P.style.top !== t)
P.style.top = t;
},
function (why) {
qstEls();
var k = typeof WLD !== "undefined" ? WLD.on : null, H = qstHere(k);
if (!H.length)
return;
var going = H.filter(function (h) { return h.s.st === 1; }), fresh = H.filter(function (h) { return h.s.st === 0; });
var main = going[0] || fresh[0] || H[0], E = main.E, L = QST_LOOK[E.look] || QST_LOOK.stone, many = H.length > 1;
var head, body;
if (many && !going.length) {
head = "Where to start";
body = "There are " + H.length + " books to walk here: " + H.map(function (h) { return h.E.icon + " " + qstEsc(h.E.t); }).join(", ") + ". Choose one to begin; each keeps your place.";
}
else if (main.s.st === 1) {
head = why === "still" ? "Still looking?" : "Where you are";
body = "<b>" + qstEsc(E.t) + "</b>" + (main.s.h ? ": " + qstEsc(main.s.h) : "") + (E.id === "oz" || E.id === "gx" ? "" : " Follow the soft gold light; the banner at the top says which way.");
if (why === "still")
body += " <span style='opacity:.8'>Open the book to read where you are again.</span>";
}
else if (main.s.st === 2) {
head = "The end";
body = "You have played <b>" + qstEsc(E.t) + "</b> to the end. You can read it again from its card.";
}
else {
head = why === "lost" ? "Not sure where to begin?" : "Where to start";
body = "<b>" + qstEsc(E.t) + "</b>. " + qstEsc(E.start);
}
var btn = many && !(going.length === 1 && why !== "ask") ? "📚 Choose a book" : main.s.st === 1 ? (E.id === "oz" ? "🌈 The Oz card" : E.id === "gx" ? "📖 Your Star Log" : "▶ Carry on") : main.s.st === 2 ? "📖 The book" : (E.id === "gx" ? "📖 Your Star Log" : "▶ Open and begin");
var off = !!qstOff()[k];
var h = "<div style='display:flex;align-items:flex-start;gap:10px'><div style='font-size:26px;line-height:1.1'>" + (many && !going.length ? "📚" : E.icon) + "</div><div style='flex:1'>" +
"<div style='font:600 15px " + L.ft + ";color:" + L.ac + ";margin-bottom:2px'>🧭 " + head + "</div><div>" + body + "</div>" +
"<div style='display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;align-items:center'>" +
"<span data-q='go' role='button' tabindex='0' style='cursor:pointer;padding:6px 12px;border-radius:6px;border:1px solid " + L.bd + ";background:rgba(255,255,255,.08);font-weight:600;color:" + L.ac + "'>" + btn + "</span>" +
"<span data-q='ok' role='button' tabindex='0' style='cursor:pointer;padding:6px 10px;opacity:.85'>Got it</span>" +
"<span data-q='off' role='button' tabindex='0' style='cursor:pointer;padding:6px 4px;opacity:.6;font-size:11.5px;margin-left:auto'>" + (off ? "Show these hints here again" : "Don't show these here") + "</span>" +
"</div></div></div>";
QST.why = why;
var P = QST.panel;
P.innerHTML = h;
qstPlace();
qstPaint(P, L);
P.style.fontFamily = "system-ui,sans-serif";
P.style.opacity = "1";
P.style.display = "block";
QST.hideIn = why === "ask" ? 0 : (why === "arrive" ? 20 : 15);
P.querySelectorAll("[data-q]").forEach(function (b) {
var f = function (ev) {
ev.stopPropagation();
var q = b.getAttribute("data-q");
qstHide();
if (q === "go") {
if (many && !(going.length === 1 && why !== "ask"))
qstShelf(H, L);
else
qstOpen(E);
}
else if (q === "off") {
qstSetOff(k, !off);
}
};
b.onclick = f;
b.onkeydown = function (ev) { if (ev.key === "Enter" || ev.key === " ") {
ev.preventDefault();
f(ev);
} };
["pointerdown", "mousedown", "touchstart"].forEach(function (n) { b.addEventListener(n, function (ev) { ev.stopPropagation(); }, { passive: true }); });
});
if (QST.v)
QST.v.shown = 1;
},
function (H, L) {
if (typeof worldCard !== "function")
return;
var fns = {}, b = "<div style='font:600 17px " + L.ft + ";color:" + L.ac + "'>📚 The books to walk here</div><div style='opacity:.8;margin-bottom:6px'>Each one keeps your place. Choose any to begin.</div>";
H.forEach(function (h, i) {
var E = h.E, s = h.s, sub = s.st === 2 ? "✅ Played to the end" : s.st === 1 ? "👉 You are here: " + qstEsc(s.h || "carry on") : qstEsc(E.start);
b += worldBtn("q" + i, E.icon + " " + qstEsc(E.t), sub);
fns["q" + i] = function () { worldCard(null); qstOpen(E); };
});
worldCard(b, fns);
if (QST.v)
QST.v.opened = 1;
}
];
});
