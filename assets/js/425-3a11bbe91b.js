/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CCN = { talks: {}, order: [], heard: {}, busy: false, playing: null, lastOver: 0, MAX: 30 };
var CCN_HEADS = [
{ k: "corp", re: /dragon corp|dragon roost|eyrie|roost/i, name: "Ysolde Varn", sex: "f", age: 48, post: "Commander of the Dragon Corp", place: "The Dragon Corp" },
{ k: "hospital", re: /hospital/i, name: "Maren Osei", sex: "f", age: 39, post: "doctor in charge at the City Hospital", place: "The City Hospital" },
{ k: "water", re: /waterworks/i, name: "Ennis Marlow", sex: "m", age: 57, post: "chief engineer at the Waterworks", place: "The Waterworks" },
{ k: "engine", re: /engine house/i, name: "Hal Brennock", sex: "m", age: 44, post: "shift boss at the Engine House", place: "The Engine House" },
{ k: "dock", re: /dock office|harbour/i, name: "Agnes Tull", sex: "f", age: 63, post: "harbourmaster at the Dock Office", place: "The Dock Office" },
{ k: "masons", re: /masons/i, name: "Tobiah Crane", sex: "m", age: 66, post: "master mason at the Masons' Yard", place: "The Masons' Yard" },
{ k: "mine", re: /mine head|pit/i, name: "Gus Fennick", sex: "m", age: 52, post: "pit boss at the Mine Head", place: "The Mine Head" }
];
function ccnHead(key) { for (var i = 0; i < CCN_HEADS.length; i++) {
var h = CCN_HEADS[i];
if (h.k === key || h.post === key || h.re.test(String(key || "")))
return h;
} return null; }
function ccnCommander() { return ccnHead("corp"); }
function ccnFirst(n) { return String(n || "").split(" ")[0]; }
function ccnHash(s) { return typeof fpsHash === "function" ? fpsHash(s) : 0; }
function ccnPerson(seed) {
if (typeof cinPerson === "function")
return cinPerson(seed);
var h = ccnHash(seed);
return { first: "Sam", name: "Sam Hale", sex: h % 2 ? "f" : "m", age: 24 + (h >>> 15) % 38 };
}
function ccnManager(place) { var h = ccnHead(place); if (h && h.place === place)
return h; var p = ccnPerson("ccnmgr" + place); return { name: p.name, sex: p.sex, age: Math.max(30, p.age), post: "the manager at " + place, place: place }; }
function ccnSister() { var p = ccnPerson("ccnsister"); return { name: p.name, sex: p.sex, age: Math.max(34, p.age), post: "the ward sister at the City Hospital", place: "The City Hospital" }; }
function ccnDispatch() { var p = ccnPerson("cindisp" + Math.floor((typeof incdNow === "function" ? incdNow() : Date.now()) / 86400000)); return { name: p.name, sex: p.sex, age: p.age, post: "Dragon Corp dispatch", place: "The Dragon Corp" }; }
var CCN_ROUTES = {
d: { what: "a crime reported, dispatch asks for a rider", to: "riders of the Dragon Corp; the commander if nobody takes it in 3 minutes", ai: "a city rider on duty", keeper: "stuck" },
w: { what: "a witness on a case", to: "the rider on the case", ai: "the city rider on it", keeper: "never" },
l: { what: "suspect located (tracker drones)", to: "the rider on the case and the Corp's commander", ai: "the officer on duty", keeper: "never" },
k: { what: "a rider reports how a case ended", to: "the Corp's commander", ai: "the officer on duty", keeper: "never" },
m: { what: "a major emergency", to: "the Corp's commander (rung by the head of the service there)", ai: "the officer on duty", keeper: "stuck" },
a: { what: "a major emergency: keep the streets clear", to: "riders of the Dragon Corp", ai: "the city riders", keeper: "never" },
o: { what: "something has happened at a place", to: "its owner and the people who work there (the manager rings them)", ai: "the manager on duty", keeper: "own" },
e: { what: "how a case ended at a place", to: "the owner (the rider tells them) and the staff (their manager tells them)", ai: "the manager", keeper: "own" },
x: { what: "a building mended", to: "the owner and the staff", ai: "the manager", keeper: "own" },
f: { what: "a repair job card", to: "the yard whose trade mends it", ai: "the yard's own crew", keeper: "own" },
h: { what: "casualties coming in", to: "the City Hospital's staff", ai: "the ward sister on duty", keeper: "own" },
s: { what: "a call for a service", to: "the place that does it", ai: "its manager", keeper: "own" },
r: { what: "an order", to: "the supplier and the place ordering", ai: "their managers", keeper: "own" },
b: { what: "a call-back the Keeper asked for (hospital check, news of a case)", to: "the Keeper", ai: "", keeper: "asked" },
esc: { what: "a case out of hand", to: "the Keeper", ai: "", keeper: "stuck" }
};
function ccnHour() { try {
if (typeof cityHourNow === "function") {
var h = +cityHourNow();
if (isFinite(h))
return h;
}
}
catch (e) { } return new Date().getHours(); }
function ccnOnDuty(svc) { return __ZC(425, 0, this, arguments, new.target); }
function ccnFixRow(r) { return __ZC(425, 1, this, arguments, new.target); }
function ccnMe() { return __ZC(425, 2, this, arguments, new.target); }
function ccnEv(e, who, post, why, line) {
return Object.assign({}, e, { name: who.name, sex: who.sex || "m", age: who.age || 40, first: ccnFirst(who.name), post: post || who.post, why: why || e.why, line: line || e.line });
}
function ccnCase(e) {
var id = e.act && e.act.id, m = /^[a-z](\d+)/.exec(String(e.slot || ""));
if (!id && m)
id = +m[1];
var r = null;
if (id && typeof INCD !== "undefined")
(INCD.rows || []).forEach(function (x) { if (x.id === id)
r = x; });
return r;
}
function ccnRoute(evs, me) { return __ZC(425, 3, this, arguments, new.target); }
(function () {
if (typeof cinWorkEvents !== "function")
return;
var cw = cinWorkEvents;
cinWorkEvents = function (jobs) {
try {
if (typeof INCD !== "undefined")
(INCD.rows || []).forEach(ccnFixRow);
}
catch (e) { }
var evs = cw.apply(this, arguments);
try {
return ccnRoute(evs, ccnMe());
}
catch (e) {
if (window.console)
console.warn("[call-chain]", e);
return evs;
}
};
})();
(function () {
if (typeof cinTownEntry !== "function")
return;
var ct = cinTownEntry;
cinTownEntry = function (r) { return ct.call(this, ccnFixRow(r)); };
})();
function ccnParties(e) { return __ZC(425, 4, this, arguments, new.target); }
function ccnChar(p) { return { id: "ccn-" + ccnHash(p.name), name: p.name, archetype: "human", ftkSex: p.sex || undefined, ftkAge: p.age || undefined, primary: false, src: { name: "stated" } }; }
function ccnAI() { return typeof wkcAI === "function" ? wkcAI() : false; }
function ccnFacts(e) { return __ZC(425, 5, this, arguments, new.target); }
function ccnPlain(e, P) { return __ZC(425, 6, this, arguments, new.target); }
function ccnModel(e, P) { return __ZC(425, 7, this, arguments, new.target); }
function ccnParse(raw) { return __ZC(425, 8, this, arguments, new.target); }
function ccnKeep(slot, v) { if (!CCN.talks[slot])
CCN.order.push(slot); CCN.talks[slot] = v; while (CCN.order.length > CCN.MAX) {
delete CCN.talks[CCN.order.shift()];
} }
function ccnTalk(e) { return __ZC(425, 9, this, arguments, new.target); }
function ccnPlay(o, side, each, done) { return __ZC(425, 10, this, arguments, new.target); }
function ccnStop() { CCN.playing = null; if (typeof fvoHush === "function")
fvoHush(); }
var CCN_ICON = { order: "📦", call: "📞", text: "💬", crime: "🚨", major: "🆘" };
function ccnRow(e) { return __ZC(425, 11, this, arguments, new.target); }
(function () {
if (typeof fpsTownHtml !== "function")
return;
var fh = fpsTownHtml, MARK = "<div class='s' style='margin:12px 2px 0;font-weight:600'>Around town</div>";
fpsTownHtml = function () {
var r = fh.apply(this, arguments);
try {
if (typeof FPS !== "undefined" && FPS.with)
return r;
var i = r.body.indexOf(MARK);
if (i < 0)
return r;
var L = fpsTownOrders(2).slice(0, 24);
CCN.shown = L;
r.body = r.body.slice(0, i) + MARK + (L.length ? "" : "<div class='row'><div class='s'>Nobody's on the phone just now.</div></div>") + L.map(ccnRow).join("");
}
catch (e) {
if (window.console)
console.warn("[call-chain]", e);
}
return r;
};
})();
function ccnFind(slot) { var e = null; (CCN.shown || []).forEach(function (x) { if (String(x.slot) === slot)
e = x; }); return e; }
function ccnRepaint() { if (typeof PH !== "undefined" && PH.open && PH.tab === "town" && typeof FPS !== "undefined" && !FPS.with && typeof phPaint === "function")
phPaint(); }
function ccnHear(slot) { return __ZC(425, 12, this, arguments, new.target); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
document.querySelectorAll("#ph-box [data-ccnhear]").forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); ccnHear(b.getAttribute("data-ccnhear")); }; });
}
catch (e) { }
return r;
};
})();
function ccnNear(place, R) {
var w = typeof wpAt === "function" && wpAt(place);
if (!w || typeof camera === "undefined" || !camera)
return false;
var dx = camera.position.x - w.x, dz = camera.position.z - w.z;
return dx * dx + dz * dz < R * R;
}
function ccnOverhear() {
try {
if (document.visibilityState === "hidden" || CCN.playing || Date.now() - CCN.lastOver < 90000)
return;
if (!(typeof inSomnucorNow === "function" && inSomnucorNow()) || typeof fpsTownOrders !== "function")
return;
if ((typeof fvoBusy === "function" && fvoBusy()) || (typeof talkOpen !== "undefined" && talkOpen) || (typeof PH !== "undefined" && PH.open))
return;
var now = Date.now(), pick = null, side = "a";
fpsTownOrders(0.2).forEach(function (e) {
if (pick || CCN.heard[e.slot] || now - e.at > 150000 || e.kind === "major")
return;
if (ccnNear(e.from, 26)) {
pick = e;
side = "a";
}
else if (e.kind !== "crime" && ccnNear(e.to, 26)) {
pick = e;
side = "b";
}
});
if (!pick)
return;
CCN.heard[pick.slot] = 1;
CCN.lastOver = now;
var K = Object.keys(CCN.heard);
if (K.length > 60)
K.slice(0, K.length - 60).forEach(function (k) { delete CCN.heard[k]; });
ccnTalk(pick).then(function (o) {
if (CCN.playing || (typeof fvoBusy === "function" && fvoBusy()))
return;
var me = side === "a" ? o.P.a : o.P.b, them = side === "a" ? o.P.b : o.P.a, at = side === "a" ? pick.from : pick.to;
CCN.playingSlot = null;
ccnPlay(o, side, function (x) { if (typeof setStatus === "function")
setStatus("📞 <b>" + esc(me.name) + "</b> at " + esc(at) + ", on the phone to " + esc(them ? them.name : "someone") + ": “" + esc(x.t) + "”"); });
});
}
catch (err) { }
}
setInterval(ccnOverhear, 15000);
