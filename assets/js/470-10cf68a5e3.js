/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var QST = { on: null, v: null, panel: null, chip: null, off: null, hideIn: 0, last: 0 };
var QST_LOOK = {
night: { bd: "#E8C870", ac: "#FFE6A8", bg: "rgba(10,14,34,.94)", ft: "Georgia,serif" },
wood: { bd: "#8AAA62", ac: "#E4D8A0", bg: "rgba(16,22,12,.94)", ft: "Georgia,serif" },
ember: { bd: "#D8743A", ac: "#FFC890", bg: "rgba(26,10,8,.94)", ft: "Georgia,serif" },
brass: { bd: "#C8A050", ac: "#F4DCA0", bg: "rgba(14,20,26,.94)", ft: "Georgia,serif" },
sepia: { bd: "#B89868", ac: "#F0E0C0", bg: "rgba(26,20,14,.94)", ft: "Georgia,serif" },
emerald: { bd: "#3EC878", ac: "#C8F8D8", bg: "rgba(6,26,16,.94)", ft: "Georgia,serif" },
sea: { bd: "#5AB0C0", ac: "#F0E2B8", bg: "rgba(6,18,26,.94)", ft: "Georgia,serif" },
star: { bd: "#9A8AF0", ac: "#E0DAFF", bg: "rgba(8,8,24,.94)", ft: "system-ui,sans-serif" },
ink: { bd: "#C89A58", ac: "#F4E2B8", bg: "rgba(20,16,10,.94)", ft: "Georgia,serif" },
stone: { bd: "#9AA8B8", ac: "#E8ECF4", bg: "rgba(14,16,22,.94)", ft: "Georgia,serif" }
};
function qstEsc(t) { return typeof esc === "function" ? esc(t) : String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function qstFn(n) { return typeof window[n] === "function" ? window[n] : null; }
function qstKey(k) { return typeof k === "function" ? k() : k; }
function qstBook(p) {
return function () {
var S = qstFn(p + "S"), St = qstFn(p + "Step");
if (!S)
return null;
var s = S() || {};
if (s.done)
return { st: 2 };
if (!s.started)
return { st: 0 };
var b = St ? St() : null;
return { st: 1, h: b && b.h || "" };
};
}
var QST_LIST = [
{ id: "nvb", w: "neverland", icon: "🧚", t: "Peter and Wendy", look: "night", open: "nvbOpen", state: qstBook("nvb"),
start: "The story begins in the night nursery in London. Open the book and press Begin: it takes you there." },
{ id: "gbk", w: "grimm", icon: "📖", t: "The Tales of Kassel", look: "wood", open: "gbkOpen", state: qstBook("gbk"),
start: "The tales begin at the inn at Kassel, October 1812. Open the book and press Begin." },
{ id: "ebk", w: function () { return typeof EBS_KEY !== "undefined" ? EBS_KEY : "erebos"; }, icon: "📜", t: "The Descents", look: "ember", open: "ebkOpen", state: qstBook("ebk"),
start: "The old stories begin with the Sibyl at the Vestibule, at the top of the long stair down. Open the book and press Begin." },
{ id: "vbk", w: function () { return typeof VRN_KEY !== "undefined" ? VRN_KEY : "verne"; }, icon: "📕", t: "The Extraordinary Voyages", look: "brass", open: "vbkOpen", state: qstBook("vbk"),
start: "Verne's own stories, walked. Open the book and press Begin: it takes you to the first one." },
{ id: "sbk", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🪶", t: "The Player's Life", look: "sepia", open: "sbkOpen", state: qstBook("sbk"),
start: "Shakespeare's own life. Begins at the Folio Library, Stationers' Hall, by St Paul's." },
{ id: "kgb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🍃", t: "Peter Pan in Kensington Gardens", look: "sepia", open: "kgbOpen", state: qstBook("kgb"),
start: "Begins at the Black Lion Gate, Bayswater Road, a summer afternoon in 1912." },
{ id: "wsb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🕰️", t: "Westminster and the Second Stain", look: "sepia", open: "wsbOpen", state: qstBook("wsb"),
start: "Begins on Westminster Bridge at dawn." },
{ id: "bsb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🔎", t: "221B Baker Street", look: "sepia", open: "bsbOpen", state: qstBook("bsb"),
start: "Begins in the rooms at 221B." },
{ id: "pmb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🎩", t: "Seven, Saville Row", look: "sepia", open: "pmbOpen", state: qstBook("pmb"),
start: "Begins at No. 7, Saville Row, Mr. Phileas Fogg's house, 1872." },
{ id: "lwb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🦕", t: "Challenger's London", look: "sepia", open: "lwbOpen", state: qstBook("lwb"),
start: "Begins at the Chestnuts, Streatham." },
{ id: "wcb", w: function () { return typeof SHK_KEY !== "undefined" ? SHK_KEY : "bard"; }, icon: "🕯️", t: "Whitechapel, 1888", look: "sepia", open: "wcbOpen", state: qstBook("wcb"),
start: "Begins with a stranger in Spitalfields, Friday 31 August 1888." },
{ id: "lsb", w: function () { return typeof LSW_KEY !== "undefined" ? LSW_KEY : "lostworld"; }, icon: "🦕", t: "The Lost World", look: "wood", open: "lsbOpen", state: qstBook("lsb"),
start: "The journey begins at Manaos, on the Rio Negro. Open the book and press Begin." },
{ id: "poe", w: function () { return typeof POE_KEY !== "undefined" ? POE_KEY : "poe"; }, icon: "🐦‍⬛", t: "Poe's Tales", look: "night", open: "poeOpen",
state: function () { if (typeof poeBS !== "function")
return null; var S = poeBS() || {}; if (S.done)
return { st: 2 }; if (!S.started)
return { st: 0 }; var b = typeof poeStep === "function" ? poeStep() : null; return { st: 1, h: b && b.h || "" }; },
start: "The tales begin with The Raven: midnight, in bleak December. Open the book and press Begin." },
{ id: "oz", w: function () { return typeof OZ_KEY !== "undefined" ? OZ_KEY : "oz"; }, icon: "🌈", t: "The Land of Oz", look: "emerald", open: "ozMenu",
busy: function () { return typeof OZ !== "undefined" && !!(OZ.fly || OZ.lift || OZ.moving || OZ.run); },
state: function () {
if (typeof ozData !== "function")
return null;
var d = ozData(), n = typeof ozBookNo === "function" ? ozBookNo() : 1, C = n === 1 && typeof OZ_CH !== "undefined" ? OZ_CH[d.ch] : null;
return { st: 1, h: C && C[2] ? C[2] : "Open 📖 The chapters to see where you are in the book and what to do next." };
},
start: "Your story is already under way. Open the Oz card and press 📖 The chapters: it says where you are and what to do next." },
{ id: "ti", w: "sea", icon: "🏴‍☠️", t: "Treasure Island", look: "sea", open: "tiMenuCard",
state: function () { if (typeof tiS !== "function")
return null; var T = tiS(); if (T.done)
return { st: 2 }; if (!T.started)
return { st: 0 }; var b = typeof tiStep === "function" ? tiStep() : null; return { st: 1, h: b && (b.t || b.h) || "" }; },
start: "Stevenson's whole book begins at the Admiral Benbow inn, with the old sea-dog. Open the book and press Begin. (Your ship and the open sea are yours to sail too.)" },
{ id: "gx", w: ["space", "station", "surface"], icon: "✦", t: "The Hollow", look: "star", open: "frLogCard",
state: function () { return __ZC(470, 0, this, arguments, new.target); },
start: "The story starts in the Far Reach, out past Hoon: scan the raider wreck there. Your Star Log always shows where to go next." },
{ id: "dav", w: function () { return typeof DAV_KEY !== "undefined" ? DAV_KEY : "davinci"; }, icon: "🎨", t: "Leonardo's World", look: "ink", open: "davMenu", state: null,
start: "You arrive in Florence. The card lists the lessons, the riddles and the machines, and where each one is." },
{ id: "lby", w: function () { return typeof LBY_KEY !== "undefined" ? LBY_KEY : "maze"; }, icon: "🌀", t: "The Labyrinth", look: "stone", open: "lbyMenu", state: null,
start: "Start in the Gatehouse Court, where you came in (it is safe). The card shows the maze's halls, the Deep and what to look for." },
{ id: "ct", w: "ctale", icon: "📖", t: "The Classic Tale", look: "ink", open: "ctsMenu",
state: function () { if (typeof CTS === "undefined" || !CTS.W || !CTS.W.ch)
return null; var n = CTS.W.ch.length; if (CTS.prog >= n)
return { st: 2 }; var C = CTS.W.ch[CTS.prog]; return { st: CTS.prog > 0 ? 1 : 0, h: C ? "Chapter " + (CTS.prog + 1) + ": " + C[0] : "" }; },
start: "The tale goes chapter by chapter. Open its card: the arrow shows the chapter to play now." }
];
function qstAdd(E) { if (!E || !E.id)
return; QST_LIST = QST_LIST.filter(function (o) { return o.id !== E.id; }); QST_LIST.push(E); }
function qstHere(k) { return __ZC(470, 1, this, arguments, new.target); }
function qstOff() { if (QST.off)
return QST.off; try {
QST.off = JSON.parse(localStorage.getItem("qst.off") || "{}") || {};
}
catch (e) {
QST.off = {};
} return QST.off; }
function qstSetOff(k, v) { var o = qstOff(); if (v)
o[k] = 1;
else
delete o[k]; try {
localStorage.setItem("qst.off", JSON.stringify(o));
}
catch (e) { } }
function qstEls() {
if (QST.panel)
return;
var p = document.createElement("div");
p.id = "qst-card";
p.setAttribute("role", "status");
p.style.cssText = "position:fixed;left:50%;top:calc(76px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:45;display:none;width:min(420px,calc(100vw - 24px));" +
"border-radius:10px;padding:10px 14px 10px;font:13px/1.5 system-ui,sans-serif;color:#EEF0F6;box-shadow:0 6px 24px rgba(0,0,0,.45);transition:opacity .5s";
document.body.appendChild(p);
QST.panel = p;
try {
if (typeof VO_KEEP_ALL !== "undefined")
VO_KEEP_ALL["qst-card"] = 1;
}
catch (e) { }
var c = document.createElement("div");
c.id = "qst-chip";
c.setAttribute("role", "button");
c.tabIndex = 0;
c.title = "Where to start, and what to do next";
c.style.cssText = "position:fixed;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(374px + env(safe-area-inset-bottom,0px));z-index:44;display:none;cursor:pointer;border-radius:16px;padding:5px 11px;" +
"font:600 12.5px system-ui,sans-serif;color:#F4F0E4;box-shadow:0 2px 10px rgba(0,0,0,.4);user-select:none";
c.textContent = "📖 Where to start";
c.onclick = function (ev) { ev.stopPropagation(); qstShow("ask"); };
c.onkeydown = function (ev) { if (ev.key === "Enter" || ev.key === " ") {
ev.preventDefault();
c.onclick(ev);
} };
["pointerdown", "mousedown", "touchstart"].forEach(function (n) { c.addEventListener(n, function (ev) { ev.stopPropagation(); }, { passive: true }); });
document.body.appendChild(c);
QST.chip = c;
}
function qstPlace() { return __ZC(470, 2, this, arguments, new.target); }
function qstPaint(el, L) { el.style.background = L.bg; el.style.border = "1px solid " + L.bd; }
function qstHide() { if (QST.panel)
QST.panel.style.display = "none"; QST.hideIn = 0; }
function qstShow(why) { return __ZC(470, 3, this, arguments, new.target); }
function qstOpen(E) { var f = qstFn(E.open); if (!f)
return; try {
f();
}
catch (e) {
if (window.console)
console.warn("[qst] open", E.id, e);
} if (QST.v)
QST.v.opened = 1; }
function qstShelf(H, L) { return __ZC(470, 4, this, arguments, new.target); }
function qstTick() {
var k = typeof WLD !== "undefined" ? WLD.on : null, now = Date.now(), smooth = QST.last && now - QST.last < 5000;
QST.last = now;
if (k !== QST.on) {
QST.on = k;
QST.v = k ? { t: 0, still: 0, sig: null, n: 0, shown: 0, opened: 0, next: 120 } : null;
qstHide();
}
var H = k ? qstHere(k) : [];
var left = H.filter(function (h) { return h.s.st !== 2; });
qstEls();
var cardOpen = typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block";
var busy = cardOpen || H.some(function (h) { try {
return h.E.busy && h.E.busy();
}
catch (e) {
return false;
} });
if (!H.length) {
QST.chip.style.display = "none";
qstHide();
return;
}
QST.chip.style.display = (left.length && QST.panel.style.display !== "block" && !cardOpen) ? "block" : "none";
var L = QST_LOOK[(left[0] || H[0]).E.look] || QST_LOOK.stone;
qstPaint(QST.chip, L);
if (cardOpen && QST.panel.style.display === "block") {
if (QST.v && QST.why === "arrive" && !QST.v.opened)
QST.v.shown = 0;
qstHide();
}
if (QST.panel.style.display === "block")
qstPlace();
if (QST.hideIn && smooth && !document.hidden && --QST.hideIn <= 0)
qstHide();
var V = QST.v;
if (!V || document.hidden || !smooth)
return;
V.t++;
if (!left.length || qstOff()[k])
return;
var going = left.filter(function (h) { return h.s.st === 1; }), sig = going.map(function (h) { return h.E.id + ":" + (h.s.h || ""); }).join("|");
if (sig !== V.sig) {
if (going.length) {
V.n = 0;
V.next = 300;
}
V.sig = sig;
V.still = 0;
}
else
V.still++;
if (busy || QST.panel.style.display === "block")
return;
if (!V.shown && V.t >= 4) {
qstShow("arrive");
return;
}
if (V.n >= 3)
return;
if (!going.length && V.t >= V.next) {
V.n++;
V.next = [120, 360, 900, 1e9][V.n];
qstShow("lost");
}
else if (going.length && V.still >= V.next) {
V.n++;
V.next = [300, 600, 1200, 1e9][V.n];
qstShow("still");
}
}
setInterval(function () { try {
qstTick();
}
catch (e) {
if (!QST.e1) {
QST.e1 = 1;
if (window.console)
console.warn("[qst] tick", e);
}
} }, 1000);
