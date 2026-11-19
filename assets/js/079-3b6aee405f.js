/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WP_DECOR = {}, WP_MINE = {}, wpBoardAt = 0, wpDraft = null, wpEditing = null;
function workplaceKeyOf(spec) { return (spec && spec.workplace && WP_BY_KEY[spec.workplace]) ? spec.workplace : null; }
function workplaceDecor(key) {
if (wpEditing === key && wpDraft)
return wpDraft;
var d = WP_DECOR[key];
return (d && d.length) ? d : null;
}
function loadWorkplaces(force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
if (!force && Date.now() - wpBoardAt < 120000)
return Promise.resolve(WP_DECOR);
wpBoardAt = Date.now();
return cityRpc("workplace_board").then(function (rows) {
var changed = false;
(rows || []).forEach(function (r) {
var before = JSON.stringify(WP_DECOR[r.key] || null);
WP_DECOR[r.key] = Array.isArray(r.decor) ? r.decor : null;
WP_MINE[r.key] = !!r.mine;
if (before !== JSON.stringify(WP_DECOR[r.key] || null))
changed = true;
});
if (changed && INT && INT.wpKey && !wpEditing)
rebuildHere();
paintWorkButton();
return WP_DECOR;
}).catch(function () { return null; });
}
function workplaceFit(key, W, D, asBuilt) { return __ZC(79, 0, this, arguments, new.target); }
function rebuildHere() { return __ZC(79, 1, this, arguments, new.target); }
function canArrange(key) {
if (!key)
return false;
if (typeof heldNow === "function" && heldNow())
return false;
if (WP_MINE[key])
return true;
return typeof mayArrangeAny === "function" && mayArrangeAny();
}
function wpEl() {
var el = document.getElementById("wp-edit");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "wp-edit";
el.style.cssText = "position:fixed;left:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:47;display:none;width:min(320px,calc(100vw - 24px));" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:12px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
var b = document.createElement("button");
b.id = "wp-btn";
b.type = "button";
b.style.cssText = "position:fixed;left:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:46;display:none;" +
"background:rgba(10,12,18,.92);color:var(--bone);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:8px 12px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { startArranging(); };
document.body.appendChild(b);
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
return el;
}
function paintWorkButton() {
wpEl();
var b = document.getElementById("wp-btn");
if (!b)
return;
var key = INT && INT.wpKey;
var show = walkMode && key && !wpEditing && canArrange(key);
b.style.display = show ? "block" : "none";
if (show)
b.textContent = /^lot:/.test(key) ? "Rearrange your house" : ("Rearrange " + key);
}
var FURN_NAMES = null;
function furnList() {
if (FURN_NAMES)
return FURN_NAMES;
FURN_NAMES = Object.keys(FURN).filter(function (k) { return k !== "stairs" && k !== "spiralstair"; }).sort();
return FURN_NAMES;
}
function startArranging() { return __ZC(79, 2, this, arguments, new.target); }
function paintArranger(msg) { return __ZC(79, 3, this, arguments, new.target); }
function wpHere() {
var fx = -Math.sin(yaw), fz = -Math.cos(yaw);
return { x: +(camera.position.x - INT.ox + fx * 1.6).toFixed(2), z: +(camera.position.z - INT.oz + fz * 1.6).toFixed(2), l: INT.level || 0,
r: +(Math.atan2(-fx, -fz)).toFixed(3) };
}
function wpPlace(k) {
if (!FURN[k])
return;
if (wpDraft.length >= 300)
return paintArranger("That is as much as one building can hold.");
var h = wpHere();
wpDraft.push({ k: k, x: h.x, z: h.z, r: h.r, l: h.l });
rebuildHere();
paintArranger(k + " placed.");
}
function wpNearest(fn) {
var h = wpHere(), best = -1, bd = 3.2;
wpDraft.forEach(function (p, i) { if ((p.l || 0) !== h.l)
return; var d = Math.hypot(p.x - h.x, p.z - h.z); if (d < bd) {
bd = d;
best = i;
} });
if (best < 0)
return paintArranger("Nothing close enough — stand right by it.");
var m = fn(best);
rebuildHere();
paintArranger(m);
}
function wpSave() { return __ZC(79, 4, this, arguments, new.target); }
var guideTo = null;
function wayKey(key) { return __ZC(79, 5, this, arguments, new.target); }
function showTheWay(key) { return __ZC(79, 6, this, arguments, new.target); }
function homeGuideFind(only) { return __ZC(79, 7, this, arguments, new.target); }
function showTheWayHome(name) { return __ZC(79, 8, this, arguments, new.target); }
function guideEl() {
var el = document.getElementById("guide");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "guide";
el.style.cssText = "position:fixed;left:50%;top:calc(52px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:44;display:none;" +
"background:rgba(10,12,18,.9);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:6px 12px;font:13px var(--sans);color:var(--bone);cursor:pointer";
el.title = "Click to stop";
el.onclick = function () { guideTo = null; el.style.display = "none"; };
document.body.appendChild(el);
return el;
}
function guideTick() {
var el = guideEl();
if (!el)
return;
if (!guideTo || !walkMode) {
el.style.display = "none";
return;
}
if (store.inside) {
if (INT && (guideTo.home ? (INT.spec && INT.spec.id === guideTo.home) : INT.wpKey === guideTo.key)) {
var hm0 = !!guideTo.home;
guideTo = null;
setStatus(hm0 ? "<b>You are home.</b>" : "<b>You are at work.</b>");
}
el.style.display = "none";
return;
}
var P = camera.position, dx = guideTo.x - P.x, dz = guideTo.z - P.z, d = Math.hypot(dx, dz);
if (guideTo.chase && d < 14) {
el.style.display = "none";
return;
}
if (d < (guideTo.home ? 6 : 14)) {
var hm1 = !!guideTo.home;
guideTo = null;
el.style.display = "none";
setStatus(hm1 ? "<b>Home.</b> Your door is right here." : "<b>Here it is.</b> Walk in through the door.");
return;
}
var want = Math.atan2(-dx, -dz), turn = atlWrap(want - yaw);
var arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
var ai = Math.round(((-turn / (Math.PI * 2)) * 8 + 8)) % 8;
var lvl = "";
if (typeof atlRingAt === "function") {
var here = atlRingAt(P.x, P.z), there = atlRingAt(guideTo.x, guideTo.z);
if (here && there && here !== there)
lvl = " · " + (there.H > here.H ? "up" : "down") + " to " + there.name;
}
el.style.display = "block";
el.innerHTML = '<b style="font-size:16px">' + arrows[ai] + '</b> ' + (guideTo.home ? "🏠 Home · " : "") + esc(guideTo.key) + ' · ' + Math.round(d) + ' m' + esc(lvl);
}
var gaolCool = 0, gaolLastSay = 0;
function heldNow() {
return !!(typeof standing !== "undefined" && standing && standing.prison && (!standing.prison.until || new Date(standing.prison.until) > new Date()));
}
function gaolSpec() {
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.workplace === "The Gaol")
return o;
}
return null;
}
function inYard(x, z) {
var y = store.gaolYard;
if (!y)
return false;
var dx = x - y.cx, dz = z - y.cz, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
return r > y.r0 - 1 && r < y.r1 + 1 && Math.abs(atlWrap(a - y.a)) * r < y.half + 1;
}
function toYard(msg) {
var y = store.gaolYard;
if (!y)
return;
if (INT)
exitInterior(true);
camera.position.set(y.x, terrainY(y.x, y.z) + 1.72, y.z);
if (typeof flyY !== "undefined")
flyY = 0;
setStatus(msg || "<b>You are held in the Gaol yard.</b>");
}
function toCell(msg, where) { return __ZC(79, 9, this, arguments, new.target); }
function prisonWords(p) { return __ZC(79, 10, this, arguments, new.target); }
function gaolTick(dt) {
gaolCool -= dt;
if (!walkMode || !heldNow())
return;
var r = somnucorRealm();
if (!r || (store.here || 0) !== r.id)
return;
if (typeof dreamerHurt === "function" && dreamerHurt().state === "down")
return;
if (typeof courtHoldsMe === "function" && courtHoldsMe())
return;
var P = camera.position;
var insideGaol = store.inside && INT && INT.spec && INT.spec.workplace === "The Gaol";
if (!insideGaol && !inYard(P.x, P.z)) {
toCell(prisonWords(standing.prison));
}
else if (!insideGaol) {
var y = store.gaolYard;
if (y) {
var bx = y.cx + Math.cos(y.a) * (y.r0 + 3), bz = y.cz + Math.sin(y.a) * (y.r0 + 3);
if (Math.hypot(P.x - bx, P.z - bz) < 5)
toCell("<b>Back inside.</b> The cell block.", "the cell block");
}
}
if (gaolCool <= 0) {
gaolCool = 45;
var p2 = standing.prison;
if (typeof presenceSendNow === "function")
try {
presenceSendNow();
}
catch (e) { }
if (p2 && typeof cityRpc === "function" && standing.prison.id)
cityRpc("work_off", { p_sentence: p2.id, p_hours: 0 }).catch(function () { });
if (typeof refreshStanding === "function")
refreshStanding().then(function (s) {
if (s && !s.prison)
setStatus("<b>Your time is served.</b> The gate is open — you are free to go.");
else if (s && s.prison && Date.now() - gaolLastSay > 120000) {
gaolLastSay = Date.now();
setStatus(prisonWords(s.prison));
}
});
}
}
(function () {
if (typeof exitInterior !== "function")
return;
var orig = exitInterior;
exitInterior = function (quiet) {
var wasGaol = INT && INT.spec && INT.spec.workplace === "The Gaol";
if (wasGaol && heldNow() && !quiet) {
toYard("<b>The door opens only onto the yard.</b> Walk back to the Gaol's back wall to go in again.");
return;
}
return orig.apply(this, arguments);
};
})();
var wildsBeaten = {}, wildsCool = 0, wildsNight = -1;
function nightNumber() { return Math.floor((Date.now() / 3600000 + (typeof scrubOffset !== "undefined" ? scrubOffset : 0) + 4) / 24); }
function myNightmareKinds() {
var k = {};
(store.characters || []).forEach(function (c) { if (typeof isNightmare === "function" && isNightmare(c) && c.archetype)
k[c.archetype] = c; });
return k;
}
function wildCreatureName(kind) {
var w = (typeof MORE_VOCAB !== "undefined" && MORE_VOCAB[kind]) || [];
var n = (w[0] || kind).replace(/^(a|an|the) /, "");
return "The " + n;
}
function wildsTick(dt) {
var list = store.wildsNightmares;
if (!list || !list.length || !ATLC)
return;
var r = somnucorRealm();
if (!r || (store.here || 0) !== r.id)
return;
var night = typeof isNightHour === "function" && isNightHour(dreamHour());
var nn = nightNumber();
if (nn !== wildsNight) {
wildsNight = nn;
wildsBeaten = {};
list.forEach(function (w) { var g = meshes[w.id]; if (g) {
g.userData.nmGone = false;
g.visible = true;
g.scale.set(1, 1, 1);
} });
}
wildsCool -= dt;
var re = wildsCool <= 0;
if (re)
wildsCool = 1.1;
var P = camera.position, mine = myNightmareKinds(), walking = walkMode && !store.inside;
var W = atlRing("wilds");
list.forEach(function (w) {
var g = meshes[w.id];
if (!g)
return;
if (wildsBeaten[w.id]) {
g.visible = false;
g.userData.nmGone = true;
return;
}
var u = g.userData;
var dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.hypot(dx, dz);
var tier = (typeof nhTier === "function") ? nhTier(w.kind) : 1;
var hunts = walking && d < (night ? 54 + tier * 6 : 22 + tier * 4) && !nmOpen;
var pr = Math.hypot(P.x - ATLC.x, P.z - ATLC.z);
if (pr < W.S + ATL_STAIR_RUN)
hunts = false;
u.hunt = hunts ? 1 : 0;
if (hunts) {
u.target = { x: P.x - dx / d * 1.2, z: P.z - dz / d * 1.2 };
u.path = null;
if (d < NM_REACH + 0.4 && nmCool <= 0)
openEncounter(wildChar(w, mine[w.kind]));
}
else if (walking && d < 26 && d > 0.1) {
u.target = { x: g.position.x - dx / d * 0.6, z: g.position.z - dz / d * 0.6 };
g.rotation.y = Math.atan2(dx, dz);
}
else if (re && (!u.target || Math.random() < 0.18)) {
var a = Math.random() * Math.PI * 2, rr = Math.random() * 34;
u.target = { x: w.home.x + Math.cos(a) * rr, z: w.home.z + Math.sin(a) * rr };
}
});
}
function wildChar(w, dreamt) {
return { wild: true, id: "wild_" + w.id, objId: w.id, kind: w.kind, name: dreamt && dreamt.name && dreamt.name !== "someone" ? dreamt.name : wildCreatureName(w.kind),
defeat: (dreamt && dreamt.defeat) ? dreamt.defeat.slice() : [], sessions: [] };
}
(function () {
if (typeof defeatNightmare !== "function" || typeof caught !== "function")
return;
var origDefeat = defeatNightmare, origCaught = caught;
defeatNightmare = function (c, way) {
if (!c || !c.wild)
return origDefeat.apply(this, arguments);
var label = way.indexOf("ability:") === 0 ? ("with " + way.slice(8)) : (DEFEAT_LABEL[way] || way);
wildsBeaten[c.objId] = true;
var g = meshes[c.objId];
if (g) {
var burst = particles(80, [1.5, 3, 1.5], way === "light" || way === "prayer" || way === "song" ? 0xFFF2D6 : way === "fire" ? 0xFF8A3A : 0xB8C4D8, 1.4, .9);
burst.position.set(g.position.x, g.position.y, g.position.z);
scene.add(burst);
var t0 = 0, s0 = g.scale.x || 1;
nmFades.push(function (dt) {
t0 += dt;
var k = Math.max(0, 1 - t0 / 1.6);
g.scale.set(s0 * k, s0 * k, s0 * k);
rise(burst, dt, 3, 0);
if (t0 >= 1.6) {
g.visible = false;
g.userData.nmGone = true;
g.scale.set(s0, s0, s0);
scene.remove(burst);
return true;
}
return false;
});
}
nmCool = 4;
setStatus("<b>" + esc(c.name) + " is gone</b> — defeated " + esc(label) + ". The Wilds will not send it for you again tonight.");
};
caught = function (c) {
if (!c || !c.wild)
return origCaught.apply(this, arguments);
closeEncounter();
nmCool = 6;
backToMyDoor("<b>" + esc(c.name) + " took you.</b> You wake at your own door.");
};
})();
function backToMyDoor(msg) { return __ZC(79, 11, this, arguments, new.target); }
var lifeCool = 0;
function atlLifeTick(dt) {
guideTick();
gaolTick(dt);
wildsTick(dt);
if (typeof cityShapeTick === "function")
cityShapeTick(dt);
lifeCool -= dt;
if (lifeCool <= 0) {
lifeCool = 1;
paintWorkButton();
var r = somnucorRealm();
if (r && (store.here || 0) === r.id && typeof signedIn === "function" && signedIn())
loadWorkplaces(false);
}
}
