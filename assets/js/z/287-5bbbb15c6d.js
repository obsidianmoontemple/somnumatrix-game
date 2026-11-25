/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(287, function () {
"use strict";
return [
function (p, s) {
if (ODL.cur !== s.k) {
ODL.cur = s.k;
ODL.pick = null;
ODL.ans = {};
ODL.msg = "";
ODL.t0 = Date.now();
if (typeof signedIn === "function" && signedIn())
cityRpc("school_begin", { p_course: "world-odyssey", p_unit: s.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,231,176,.25)'><b style='color:#FFE7B0'>🎓 Learn here</b> <span style='opacity:.7;font-size:12px'>· stop " + s.n + " of " + ODL_STOPS.length + " · " + esc(s.book) + (odlDone(s.n) ? " · ✓ stamped" : "") + "</span>" +
"<div style='margin:6px 0'><b>The real place.</b> " + esc(s.real) + "</div><div style='margin:6px 0'><b>The science.</b> " + esc(s.science) + "</div>" +
"<div style='margin:6px 0'><b>A word from here: " + esc(s.word[0]) + "</b>, " + esc(s.word[1]) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Your choice.</b> " + esc(s.choice.q) + "</div>";
s.choice.o.forEach(function (o, i) {
var on = ODL.pick === i;
b += worldBtn("ch" + i, (on ? "➤ " : "") + esc(o), on ? (i === s.choice.did ? "The same as Odysseus." : "Not what he did.") : "");
fns["ch" + i] = function () { ODL.pick = i; odlCheck(s); odlCard(p, s); };
});
if (ODL.pick != null)
b += "<div style='margin:4px 0 8px;opacity:.9'>" + esc(s.choice.tell) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for the voyage log stamp</div>";
s.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
odlOpt(s, k).forEach(function (o, j) {
var on = ODL.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { ODL.ans[k] = o; odlCheck(s); odlCard(p, s); };
});
});
if (ODL.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + ODL.msg + "</div>";
b += worldBtn("log", "The voyage log", "Every stop of the Odyssey, and your stamps: " + odlCount() + " of " + ODL_STOPS.length);
fns.log = odlLogCard;
worldCard(worldFacts(p.name, p.card, [], p.about, b), fns);
},
function (s) {
var L = odlLog();
if (L[s.n])
return;
L[s.n] = new Date().toISOString();
if (typeof save === "function")
save();
var n = odlCount();
ODL.msg = "⚓ Stamped: " + esc(s.k === "atlantis" ? "Atlantis" : SEA_BY[s.k] ? SEA_BY[s.k].name : s.k) + ". " + n + " of " + ODL_STOPS.length + " in the log." + (n === ODL_STOPS.length ? " <b>Odyssey Scholar!</b> The certificate is in your backpack." : "");
setStatus("<b>Voyage log stamped</b> (" + n + " of " + ODL_STOPS.length + ")." + (n === ODL_STOPS.length ? " <b>You are an Odyssey Scholar.</b>" : ""));
if (typeof signedIn === "function" && signedIn()) {
var wait = Math.max(0, 21000 - (Date.now() - ODL.t0));
setTimeout(function () { cityRpc("school_pass", { p_course: "world-odyssey", p_unit: s.n }).catch(function () { }); }, wait);
}
},
function () {
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The voyage log</div><div style='opacity:.8'>The Department of Education · World Learning. Learn at every stop in the order Odysseus met them; get both questions right for a stamp. " + odlCount() + " of " + ODL_STOPS.length + " stamped.</div>", fns = {};
ODL_STOPS.forEach(function (s) {
var p = SEA_BY[s.k];
if (!p)
return;
html += worldBtn("go-" + s.k, (odlDone(s.n) ? "⚓ " : "○ ") + s.n + ". " + esc(p.name), esc(s.book) + " · " + esc(s.word[0]) + (SEA.aboard ? " · tap to set course" : ""));
fns["go-" + s.k] = function () {
if (!SEA.aboard) {
odlCard(p, s);
return;
}
SEA.auto = { x: p.dock ? p.dock.x : p.x + (SEA.sx - p.x) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250), z: p.dock ? p.dock.z : p.z + (SEA.sz - p.z) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250), name: p.name, after: p.dock ? "Press E to go ashore." : "Press E for its story." };
worldCard(null);
setStatus("<b>Course set</b> for " + esc(p.name) + ".");
};
});
if (odlCount() === ODL_STOPS.length)
html += "<div style='margin-top:8px;color:#FFE7B0'>⚓ <b>Odyssey Scholar.</b> Every stop learned.</div>";
worldCard(html, fns);
}
];
});
