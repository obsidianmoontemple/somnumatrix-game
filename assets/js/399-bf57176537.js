/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MTG = { KEY: "somnu.meetings", list: null, objs: {}, root: null, tickAt: 0, actAt: 0, near: null, form: null };
var MTG_WAIT = 30;
function mtgStore() {
if (!MTG.list) {
try {
MTG.list = JSON.parse(localStorage.getItem(MTG.KEY) || "[]");
}
catch (e) {
MTG.list = [];
}
if (!Array.isArray(MTG.list))
MTG.list = [];
}
return MTG.list;
}
function mtgSave() { try {
localStorage.setItem(MTG.KEY, JSON.stringify(mtgStore().slice(-60)));
}
catch (e) { } }
function mtgHour() {
if (typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null && typeof cityHourNow === "function")
return cityHourNow();
var d = new Date();
return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
}
function mtgClock(at) { var h = mtgHour() + (at - Date.now() + 30000) / 3600000; h = ((h % 24) + 24) % 24; return typeof hhmm === "function" ? hhmm(h) : String(Math.floor(h)); }
function mtgDay(at) { var d = Math.floor((mtgHour() + (at - Date.now()) / 3600000) / 24); return d <= 0 ? "" : d === 1 ? " tomorrow" : " in " + d + " days"; }
function mtgPlaces() { return typeof WP_BY_KEY !== "undefined" ? Object.keys(WP_BY_KEY) : []; }
function mtgPlace(s, fallback) { return __ZC(399, 0, this, arguments, new.target); }
function mtgWhen(s) { return __ZC(399, 1, this, arguments, new.target); }
function mtgWho(c) { return __ZC(399, 2, this, arguments, new.target); }
function mtgOpen(name) { return mtgStore().filter(function (m) { return m.name === name && (m.state === "set" || m.state === "met"); })[0] || null; }
function mtgPt(p) {
var dx = p.x - ATLC.x, dz = p.z - ATLC.z, r = Math.hypot(dx, dz) || 1, ux = dx / r, uz = dz / r;
return { x: p.x, z: p.z, street: r, fx: ux, fz: uz, sx: -uz, sz: ux, face: Math.atan2(ux, uz), real: true };
}
function mtgFrom(m) { if (m.from)
return m.from; return m.rk && typeof twhFrom === "function" ? twhFrom(m.name) : null; }
function mtgWalk(m) { return __ZC(399, 3, this, arguments, new.target); }
function mtgMake(c, arg, via) { return __ZC(399, 4, this, arguments, new.target); }
var MTG_TAG = /\[\[?\s*MEET\s*:?\s*([^\]\n]*?)\s*\]\]?/i;
function mtgFromReply(c, raw, via) {
if (MTG.asking)
return null;
try {
var x = MTG_TAG.exec(String(raw || ""));
if (x)
return mtgMake(c, x[1], via);
}
catch (e) {
if (window.console)
console.warn("[meetings]", e);
}
return null;
}
function mtgRule(c, voice) { return __ZC(399, 5, this, arguments, new.target); }
(function () {
var def = { tag: "MEET", arg: "place | time | what it is about", label: "📅 Meet up later…",
hint: "you agree to meet the dreamer in person later, at a real place in Somnucor, at a time on the city clock; you will really walk there and wait for them",
when: function (ctx) { return !!(ctx && ctx.c && !ctx.c.deity && ctx.c.archetype !== "deity" && mtgPlaces().length); },
run: function (ctx, arg) { var m = mtgMake(ctx.c, arg, "talk"); return m ? { ok: true, say: "📅 " + esc(ctx.c.name) + ": <b>" + esc(m.place) + "</b> at " + mtgClock(m.at) + mtgDay(m.at) + "." } : { ok: false, say: "(Where in the city, and when?)" }; } };
if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else
(window.SD_PENDING = window.SD_PENDING || []).push(def);
})();
function mtgText(m, t) { return __ZC(399, 6, this, arguments, new.target); }
function mtgStage(m) { return __ZC(399, 7, this, arguments, new.target); }
function mtgTick() {
var now = Date.now(), L = mtgStore(), changed = false;
L.forEach(function (m) {
var st = mtgStage(m);
if (st === "walking" && m.rk && !m.from) {
var f0 = typeof twhFrom === "function" ? twhFrom(m.name) : null;
if (f0) {
m.from = { x: f0.x, z: f0.z };
changed = true;
}
}
if (st === "walking" && !m.told.go && m.at - m.made > 12 * 60000) {
m.told.go = 1;
changed = true;
mtgText(m, ["On my way to " + m.place + " now.", "Heading over to " + m.place + ". See you there!", "Just leaving, I'll be at " + m.place + " by " + mtgClock(m.at) + "."][Math.floor(Math.random() * 3)]);
}
if (st === "waiting" && !m.told.here) {
m.told.here = 1;
changed = true;
if (!mtgNearMe(m, 40))
mtgText(m, "I'm at " + m.place + ", by the door.");
}
if (st === "missed" && m.state === "set") {
m.state = "missed";
changed = true;
mtgText(m, "I waited at " + m.place + " till " + mtgClock(m.at + MTG_WAIT * 60000) + ". Maybe another time?");
}
if (st === "done" && m.state === "met") {
m.state = "done";
changed = true;
}
});
var keep = L.filter(function (m) { return (m.state === "set" || m.state === "met") || now - m.at < 24 * 3600000; });
if (keep.length !== L.length) {
MTG.list = keep;
changed = true;
}
if (changed)
mtgSave();
}
function mtgFig(m) { return __ZC(399, 8, this, arguments, new.target); }
function mtgPos(m, st) { return __ZC(399, 9, this, arguments, new.target); }
function mtgNearMe(m, r) {
if (typeof camera === "undefined" || !(typeof walkMode !== "undefined" && walkMode) || store.inside)
return false;
var p = mtgPos(m, mtgStage(m));
if (!p)
return false;
var P = camera.position;
return (p.x - P.x) * (p.x - P.x) + (p.z - P.z) * (p.z - P.z) < r * r;
}
function mtgDraw(dt) {
MTG.n = (MTG.n || 0) + 1;
var realm = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!realm || typeof ATLC === "undefined" || !ATLC || typeof scene === "undefined")
return;
if (!MTG.root) {
MTG.root = new THREE.Group();
MTG.root.name = "meetings";
scene.add(MTG.root);
}
var inCity = (store.here || 0) === realm.id && !store.inside;
MTG.root.visible = inCity;
var P = camera.position, t = performance.now() / 1000, keep = {}, best = null, bd = 1e9;
if (inCity)
mtgStore().forEach(function (m) {
var st = mtgStage(m);
if (st !== "walking" && st !== "waiting" && st !== "met")
return;
var p = mtgPos(m, st);
if (!p)
return;
var dx = p.x - P.x, dz = p.z - P.z, d2 = dx * dx + dz * dz;
if (d2 > 260 * 260)
return;
keep[m.id] = 1;
var o = MTG.objs[m.id];
if (!o) {
var g = mtgFig(m);
if (!g)
return;
MTG.root.add(g);
o = MTG.objs[m.id] = { g: g };
}
var talking = typeof talkOpen !== "undefined" && talkOpen && typeof talkWith !== "undefined" && talkWith && talkWith.name === m.name;
if (talking && st === "met") {
m.lastTalk = Date.now();
}
o.g.position.set(p.x, terrainY(p.x, p.z) + 0.12, p.z);
if (talking || (st !== "walking" && d2 < 6 * 6))
o.g.rotation.y = Math.atan2(P.x - p.x, P.z - p.z);
else
o.g.rotation.y = p.face + (st === "waiting" ? Math.sin(t * 0.35 + m.at % 7) * 0.5 : 0);
if (p.walk && !talking && typeof lcySwing === "function")
lcySwing(o.g, t, 0.6, 6);
else if (typeof lcyStill === "function")
lcyStill(o.g);
if ((st === "waiting" || st === "met") && d2 < bd && d2 < 5 * 5) {
bd = d2;
best = m;
}
});
Object.keys(MTG.objs).forEach(function (id) { if (!keep[id]) {
var o = MTG.objs[id];
if (o.g.parent)
o.g.parent.remove(o.g);
delete MTG.objs[id];
} });
MTG.actAt -= dt || 0.016;
if (MTG.actAt <= 0) {
MTG.actAt = 0.4;
mtgButton(inCity ? best : null);
}
}
function mtgButton(m) {
var el = document.getElementById("mtg-act");
var talking = typeof talkOpen !== "undefined" && talkOpen;
if (!m || talking) {
if (el)
el.style.display = "none";
MTG.near = null;
return;
}
if (!el) {
el = document.createElement("button");
el.id = "mtg-act";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(250px + env(safe-area-inset-bottom,0px));z-index:41;padding:11px 18px;border-radius:999px;border:1px solid #E8C66A;background:rgba(20,14,30,.92);color:#F6EED8;font:600 14px system-ui,sans-serif;cursor:pointer;max-width:92vw";
el.onclick = function (ev) { ev.stopPropagation(); if (MTG.near)
mtgMeet(MTG.near); };
document.body.appendChild(el);
}
MTG.near = m;
var label = "💬 Meet " + m.name.split(" ")[0] + (m.what ? " (" + m.what.slice(0, 40) + ")" : "");
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
if (typeof PS_KEEP !== "undefined")
PS_KEEP["mtg-act"] = 1;
function mtgMeet(m) { return __ZC(399, 10, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
try {
return tt.apply(this, arguments);
}
finally {
try {
mtgDraw(dt);
}
catch (e) {
if (!MTG.warned) {
MTG.warned = true;
if (window.console)
console.warn("[meetings]", e);
}
}
}
};
})();
setInterval(function () { try {
mtgTick();
}
catch (e) { } }, 5000);
function mtgState(m) { return __ZC(399, 11, this, arguments, new.target); }
function mtgAsk(name, place, at, what) { return __ZC(399, 12, this, arguments, new.target); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
if (typeof PH === "undefined" || PH.tab !== "town" || typeof FPS === "undefined")
return r;
var box = document.getElementById("ph-box"), body = box && box.querySelector(".body");
if (!body)
return r;
var B = "padding:5px 10px;border-radius:8px;border:1px solid #6A5FA0;background:#221E38;color:#EDE8F8;font-size:12.5px;cursor:pointer;margin:4px 6px 0 0";
if (FPS.with) {
var m = mtgOpen(FPS.with), h = "<div id='mtg-chat' style='margin:0 0 6px'>";
if (m)
h += "<div class='row'><div class='s'>📅 Meeting: <b style='color:#EDE8F8'>" + esc(m.place) + "</b> at " + mtgClock(m.at) + mtgDay(m.at) + (m.what ? " · " + esc(m.what) : "") + "</div><div style='font-size:12.5px'>" + esc(mtgState(m)) + "</div>" +
"<div><button style='" + B + "' data-mtgway='" + esc(m.place) + "'>📍 Show me the way</button><button style='" + B + "' data-mtgoff='" + m.id + "'>✖️ Call it off</button></div></div>";
else if (MTG.form === FPS.with) {
var opts = mtgPlaces().slice().sort().map(function (p) { return "<option" + (p === (fpsChar(FPS.with).stfPlace || "") ? " selected" : "") + ">" + esc(p) + "</option>"; }).join("");
var times = [[15, "In 15 minutes"], [30, "In half an hour"], [60, "In an hour"], [120, "In two hours"]].map(function (x) { return "<option value='" + x[0] + "'>" + x[1] + " (" + mtgClock(Date.now() + x[0] * 60000) + ")</option>"; }).join("");
h += "<div class='row' style='display:flex;flex-direction:column;gap:5px'><div class='s'>Meet " + esc(FPS.with.split(" ")[0]) + " in person:</div>" +
"<select data-mtgf='place' style='padding:4px;border-radius:6px'>" + opts + "</select><select data-mtgf='when' style='padding:4px;border-radius:6px'>" + times + "</select>" +
"<input data-mtgf='what' maxlength='120' placeholder='What about? (flour, a delivery, a chat…)' style='padding:5px;border-radius:6px'>" +
"<div><button style='" + B + "' data-mtgdo='ask'>📅 Ask to meet</button><button style='" + B + "' data-mtgdo='no'>Not now</button></div></div>";
}
else
h += "<div><button style='" + B + "' data-mtgdo='form'>📅 Arrange to meet</button></div>";
h += "</div>";
var head = body.firstElementChild;
if (head)
head.insertAdjacentHTML("afterend", h);
else
body.insertAdjacentHTML("afterbegin", h);
}
else {
var L = mtgStore().filter(function (m) { var st = mtgStage(m); return st !== "done" || Date.now() - m.at < 6 * 3600000; }).sort(function (a, b) { return a.at - b.at; }).slice(0, 8);
if (L.length) {
var h2 = "<div id='mtg-town'><div class='s' style='margin:4px 2px 0;font-weight:600'>Meetings</div>";
L.forEach(function (m) {
var st = mtgStage(m);
h2 += "<div class='row'><div class='s'>📅 " + mtgClock(m.at) + mtgDay(m.at) + " · <b style='color:#EDE8F8'>" + esc(m.name) + "</b> at " + esc(m.place) + (m.what ? " · " + esc(m.what) : "") + "</div>" +
"<div style='font-size:13px;margin-top:2px'>" + esc(mtgState(m)) + "</div>" +
((st === "before" || st === "walking" || st === "waiting") ? "<div><button style='" + B + "' data-mtgway='" + esc(m.place) + "'>📍 Show me the way</button><button style='" + B + "' data-mtgoff='" + m.id + "'>✖️ Call it off</button></div>" : "") + "</div>";
});
h2 += "</div>";
body.insertAdjacentHTML("afterbegin", h2);
}
}
body.querySelectorAll("[data-mtgway]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); if (typeof showTheWay === "function")
showTheWay(el.getAttribute("data-mtgway")); }; });
body.querySelectorAll("[data-mtgoff]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); mtgOff(el.getAttribute("data-mtgoff")); }; });
body.querySelectorAll("[data-mtgdo]").forEach(function (el) {
el.onclick = function (ev) {
ev.stopPropagation();
var a = el.getAttribute("data-mtgdo");
if (a === "form") {
MTG.form = FPS.with;
phPaint();
}
else if (a === "no") {
MTG.form = null;
phPaint();
}
else if (a === "ask") {
var q = function (k) { var x = body.querySelector("[data-mtgf='" + k + "']"); return x ? x.value : ""; };
var n = FPS.with;
MTG.form = null;
mtgAsk(n, q("place"), Date.now() + (+q("when") || 30) * 60000, q("what"));
}
};
});
body.querySelectorAll("[data-mtgf]").forEach(function (el) { el.onkeydown = function (ev) { ev.stopPropagation(); }; el.onclick = function (ev) { ev.stopPropagation(); }; });
}
catch (e) {
if (window.console)
console.warn("[meetings]", e);
}
return r;
};
})();
function mtgOff(id) { return __ZC(399, 13, this, arguments, new.target); }
