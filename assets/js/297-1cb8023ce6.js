/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function ppConcierge() { return __ZC(297, 0, this, arguments, new.target); }
function ppWristband() { return __ZC(297, 1, this, arguments, new.target); }
function ppTonightCard() { return __ZC(297, 2, this, arguments, new.target); }
function ppMapCard() { ppConcierge(); }
function ppStageCard(which) { return __ZC(297, 3, this, arguments, new.target); }
function ppCoatCheck() {
PP.coat = PP.coat || (100 + Math.floor(Math.random() * 400));
setStatus("<b>Your coat is hung up.</b> Ticket No. " + PP.coat + ". It is free; pick it up on the way out.");
}
function ppClubDesk() { return __ZC(297, 4, this, arguments, new.target); }
function ppSecurity() { return __ZC(297, 5, this, arguments, new.target); }
function ppLightDesk() { return __ZC(297, 6, this, arguments, new.target); }
function ppDjCard(where) { return __ZC(297, 7, this, arguments, new.target); }
function ppRestock() {
if (!ppStaff())
return setStatus("Staff only.");
var J = ppMyJobs();
setStatus("<b>You restock the shelves.</b>" + (J.length ? " Your shift's tasks are on your work card: open it to clock in and work your post." : " The Keeper's hands are always welcome."));
}
function ppOfficeCard(which) {
var k = which === "echo" ? PP_KEYS.echo : PP_KEYS.club;
worldCard(ppHead("The office", "The rota, the takings and the openings.") + worldBtn("open", "See the openings here", "Apply on the spot"), { open: function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(k); } });
}
function ppEchoDesk() { return __ZC(297, 8, this, arguments, new.target); }
function ppBalloon() { ppShopCard("balloon"); }
function ppPlanner() { return __ZC(297, 9, this, arguments, new.target); }
function ppFirstAid() { return __ZC(297, 10, this, arguments, new.target); }
function ppRest(where) {
ppDanceSet(false);
if (typeof togEmote === "function" && typeof TOG !== "undefined")
try {
togEmote("sit");
}
catch (e) { }
setStatus("<b>You rest in " + esc(where) + ".</b> The music drifts over; the lanterns rise from the beach.");
}
function ppVolley() {
var rally = 3 + Math.floor(Math.random() * 18);
worldCard(ppHead("Beach volleyball", "A friendly game: no score kept but the rally.") + "<div>You keep a rally going for <b>" + rally + "</b> hits" + (rally > 15 ? ". The bonfires cheer." : ".") + "</div>" + worldBtn("again", "Serve again", ""), { again: ppVolley });
}
function ppGatherCard() { return __ZC(297, 11, this, arguments, new.target); }
function ppGatherSet() { return __ZC(297, 12, this, arguments, new.target); }
function ppGuestBook() { return __ZC(297, 13, this, arguments, new.target); }
if (typeof ORB_LINES !== "undefined") {
ORB_LINES.push({ k: "party", name: "Party Line", col: "#FF8AD8", off: 37, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "jubilee", name: "Jubilee: the Party Planet", kind: "surface", host: "jubilee",
facts: ["Jubilee is a world of SomnuMatrix's own: it is not in any star atlas, and it is always night there.", "The ringed giant over Jubilee's sky is its neighbour, not its moon; Jubilee has two moons of its own.", "The Party Line runs on the same timetable as the Lunar and Mars Lines, and it is free."] }
] });
}
(function () {
if (typeof orbArrive === "function") {
var oa = orbArrive;
orbArrive = function (stop) { if (stop && stop.k === "jubilee") {
worldGo("party", { keepFrom: true });
return;
} return oa.apply(this, arguments); };
}
if (typeof orbStage === "function") {
var os = orbStage;
orbStage = function () { var r = os.apply(this, arguments); try {
var R = ORB.ride, O = ORB.out;
if (R && O && O.surf && (R.from.k === "jubilee" || R.to.k === "jubilee"))
O.surf.material.color.setHex(0x5A3A7A);
}
catch (e) { } return r; };
}
})();
if (typeof SP_BODIES !== "undefined") {
var PP_BODY = { k: "jubilee", name: "Jubilee, the Party Planet", kind: "A world of SomnuMatrix's own, always at night", orbit: 2700, ang: 2.9, y: 60, r: 40, col: 0xB86AD8, spin: 0.02,
rows: [["Where", "Between Earth and Mars, in SomnuMatrix's own sky"], ["A day", "Always night: the party never stops"], ["Moons", "Two, and a ringed giant for a neighbour"], ["Air", "Warm and breathable"]],
notes: ["Land and walk there: the Starport is by the landing pad.", "The Party Line flies there from Launch Pad 1, free."] };
SP_BODIES.push(PP_BODY);
if (typeof SP_BY !== "undefined")
SP_BY.jubilee = PP_BODY;
}
(function () {
if (typeof spPaint === "function") {
var sp = spPaint;
spPaint = function (k) {
if (k !== "jubilee")
return sp.apply(this, arguments);
if (SP.tex.jubilee)
return SP.tex.jubilee;
SP.tex.jubilee = wTex(512, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#5A2A8A");
g.addColorStop(0.5, "#B86AD8");
g.addColorStop(1, "#4A2070");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 14; i++) {
x.fillStyle = "hsla(" + (280 + i * 9) + ",70%," + (40 + i % 4 * 8) + "%,.35)";
x.fillRect(0, i * H / 14, W, H / 30);
}
for (var j = 0; j < 260; j++) {
x.fillStyle = "hsla(" + (j * 37 % 360) + ",90%,75%,.8)";
x.fillRect((j * 97) % W, (j * 53) % H, 2, 2);
}
});
return SP.tex.jubilee;
};
}
if (typeof spPromptTick === "function") {
var pt = spPromptTick;
spPromptTick = function () {
var r = pt.apply(this, arguments), N = SP.near;
if (N && N.k === "jubilee" && N.d < N.b.r * 3.4 + 30)
worldPrompt("<b>Jubilee, the Party Planet</b> · <b>press E</b> to land at the Starport", function () { worldGo("party", { keepFrom: true }); });
return r;
};
}
if (typeof spInfo === "function") {
var si = spInfo;
spInfo = function (k) {
if (k !== "jubilee")
return si.apply(this, arguments);
var b = PP_BODY;
worldCard(worldFacts(b.name, b.kind, b.rows, b.notes, worldBtn("land", "Land at the Starport", "Walk Jubilee") + (WLD.on === "space" ? worldBtn("fly", "Fly there", "The shuttle takes you") : "")), { land: function () { worldGo("party", { keepFrom: true }); }, fly: function () { spFlyTo({ k: "jubilee", name: b.name, after: "Press E to land." }); } });
};
}
})();
(function () {
if (typeof ktPane !== "function")
return;
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-party]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-party", "1");
b.textContent = "🎉 Jubilee, the Party Planet";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } worldGo("party"); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
})();
function ppIsKey(k) { for (var n in PP_KEYS)
if (PP_KEYS[n] === k)
return true; return false; }
(function () {
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && ppIsKey(job.workplace) && !(typeof amKeeper === "function" && amKeeper()))
return typeof WLD !== "undefined" && WLD.on === "party"; return os.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
if (!ppIsKey(key))
return sw.apply(this, arguments);
if (WLD.on === "party") {
var m = {};
m[PP_KEYS.club] = "club";
m[PP_KEYS.echo] = "echo";
m[PP_KEYS.fest] = "fest";
m[PP_KEYS.beach] = "beach";
m[PP_KEYS.port] = "port";
m[PP_KEYS.shop] = "shop";
m[PP_KEYS.hall] = "hall";
return ppShowWay(m[key]);
}
sw.call(this, typeof SPACEPORT_KEY !== "undefined" ? SPACEPORT_KEY : key);
setStatus("<b>" + esc(key) + "</b> is on Jubilee, the Party Planet. Follow the pointer to the Space Corp Spaceport and take the <b>Party Line</b> from Launch Pad 1: it is free.");
};
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (typeof WLD !== "undefined" && WLD.on === "party") {
var k = ppHereKey();
return k ? { key: k, inside: true } : null;
} return aw.apply(this, arguments); };
}
})();
(function () {
if (typeof worldPromptCity !== "function")
return;
var wp = worldPromptCity;
worldPromptCity = function (html, fn) { if (html && /the stations, the Moon or Mars/.test(html))
html = html.replace("the stations, the Moon or Mars", "the stations, the Moon, Mars or Jubilee, the Party Planet"); return wp.call(this, html, fn); };
})();
