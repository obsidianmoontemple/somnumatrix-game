/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FMY_TALK = "Talk the way a real person talks out loud: everyday words, contractions, short sentences, a half-finished thought now and then, small talk, a joke or a grumble when it fits your mood. " +
"Never sound like a robot, a help desk or a brochure: no \u201cHow may I assist you\u201d, no \u201cCertainly!\u201d, no lists, no summing up, no offering a menu of options. " +
"Most replies are one to three sentences.";
var FMY = { mem: {}, loaded: 0, loading: null, open: null, LKEY: "somnu.folkmem" };
function fmyIsFolk(c) {
return !!(c && typeof c.wKey === "string" && c.wKey.indexOf("wtalk:") === 0 && !c.deity && c.archetype !== "deity");
}
function fmyKey(c) { return String(c.wKey).slice(0, 120); }
function fmyOnline() { return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG && !!DW_CONFIG.supabaseUrl; }
function fmyLocalRead() {
try {
var d = JSON.parse(localStorage.getItem(FMY.LKEY) || "{}");
return d && typeof d === "object" ? d : {};
}
catch (e) {
return {};
}
}
function fmyLocalWrite() { return __ZC(369, 0, this, arguments, new.target); }
(function () { var d = fmyLocalRead(); Object.keys(d).forEach(function (k) { FMY.mem[k] = d[k]; }); })();
function fmyFromRow(r) {
return { met: r.met || 1, first: Date.parse(r.first_at) || Date.now(), last: Date.parse(r.last_at) || Date.now(),
notes: (r.notes || []).map(function (n) { return { at: Date.parse(n.at) || 0, t: String(n.t || "") }; }) };
}
function fmyLoad(force) { return __ZC(369, 1, this, arguments, new.target); }
function fmyRole() {
var keeper = typeof isKeeperNow === "function" && isKeeperNow();
if (keeper)
return "keeper";
if (!(typeof signedIn === "function" && signedIn()))
return "passer";
return (typeof hasAccess === "function" && hasAccess()) ? "citizen" : "visitor";
}
function fmyName() {
var n = "";
try {
n = (typeof dreamer === "function" && dreamer().name) || "";
}
catch (e) { }
return String(n).trim().slice(0, 40);
}
function fmyAgo(t) { return __ZC(369, 2, this, arguments, new.target); }
function fmyWhoBrief(c) { return __ZC(369, 3, this, arguments, new.target); }
function fmyReframe(s, c) { return __ZC(369, 4, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) {
var s = cs.apply(this, arguments);
try {
if (fmyIsFolk(c))
s = fmyReframe(s, c) + " " + fmyWhoBrief(c);
}
catch (e) {
if (window.console)
console.warn("[folk-memory]", e);
}
return s;
};
})();
function fmyGreet(c) { return __ZC(369, 5, this, arguments, new.target); }
function fmyFixGreet(c) {
if (!c || !c.log || c.log.length !== 1 || c.log[0].who !== "them" || c.fmyGreeted)
return false;
var g = fmyGreet(c);
if (!g)
return false;
c.log[0] = { who: "them", text: g };
c.fmyGreeted = 1;
return true;
}
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
try {
if (fmyIsFolk(c)) {
fmyFixGreet(c);
FMY.open = { c: c, from: (c.log || []).length };
}
else
FMY.open = null;
}
catch (e) { }
var r = ot.apply(this, arguments);
try {
if (fmyIsFolk(c))
fmyLoad().then(function () {
if (talkWith !== c)
return;
if (fmyFixGreet(c) && typeof renderLog === "function")
renderLog();
if (typeof talkMeta === "function")
talkMeta(c);
});
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof talkMeta !== "function")
return;
var tm = talkMeta;
talkMeta = function (c) {
var r = tm.apply(this, arguments);
try {
if (fmyIsFolk(c) && c.awake) {
var m = FMY.mem[fmyKey(c)], el = document.getElementById("t-meta");
if (el)
el.textContent = (fmyRole() === "keeper" ? "knows you are the Keeper · " : "") +
(m && m.met ? ("met " + (m.met === 1 ? "once" : m.met + " times") + " · last " + fmyAgo(m.last || Date.now())) : "first meeting");
}
}
catch (e) { }
return r;
};
})();
function fmyPlainNote(lines, nm) { return __ZC(369, 6, this, arguments, new.target); }
function fmySummary(c, lines) { return __ZC(369, 7, this, arguments, new.target); }
function fmyRemember(c, lines) { return __ZC(369, 8, this, arguments, new.target); }
(function () {
if (typeof closeTalk !== "function")
return;
var ct = closeTalk;
closeTalk = function () {
var o = FMY.open;
FMY.open = null;
var r = ct.apply(this, arguments);
try {
if (o && o.c && o.c.log) {
var lines = o.c.log.slice(o.from).filter(function (t) { return t && t.text && t.text !== "…"; });
if (lines.some(function (t) { return t.who === "me"; }))
fmyRemember(o.c, lines);
}
}
catch (e) {
if (window.console)
console.warn("[folk-memory]", e);
}
return r;
};
})();
document.addEventListener("visibilitychange", function () {
try {
var o = FMY.open;
if (document.visibilityState !== "hidden" || !o || !o.c || !o.c.log)
return;
var lines = o.c.log.slice(o.from).filter(function (t) { return t && t.text && t.text !== "\u2026"; });
if (!lines.some(function (t) { return t.who === "me"; }))
return;
o.from = o.c.log.length;
fmyRemember(o.c, lines);
}
catch (e) { }
});
