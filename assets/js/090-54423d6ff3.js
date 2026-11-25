/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PRESENCE_INTERVAL = 3.0, PRESENCE_STALE = 20000, PRESENCE_GRACE = 12000, presenceTotal = 1;
var presenceCool = 0, presenceOthers = {}, presencePublished = false, presenceNew = true;
function inSomnucorRealm() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
return !!(r && store.here === r.id);
}
function inHallRealm() {
var r = (typeof hallRealm === "function") ? hallRealm() : null;
return !!(r && store.here === r.id);
}
function presenceSharedHere() {
if (inSomnucorRealm() || inHallRealm())
return true;
return !!(typeof WLD !== "undefined" && WLD && WLD.on && WLD.w);
}
function hallMiddle() {
var r = (typeof hallRealm === "function") ? hallRealm() : null;
if (!r || !r.grid || typeof blockOrigin !== "function")
return null;
return blockOrigin(r.grid.bx, r.grid.bz);
}
function myUserId() { return (typeof session !== "undefined" && session && session.user) ? session.user.id : null; }
function myPlace() {
if (store.inside && INT && INT.spec) {
var s = INT.spec;
return { place: String(s.archetype || "building") + ":" + String(s.label || s.name || ""),
level: INT.level || 0, x: camera.position.x - INT.ox, z: camera.position.z - INT.oz };
}
var u = undergroundSpot();
if (u)
return { place: u.place, level: 0, x: camera.position.x - u.x, z: camera.position.z - u.z };
if (typeof MALL !== "undefined" && MALL && MALL.on)
return { place: "mall:World Mall", level: typeof mdLevel === "function" ? mdLevel(camera.position.y - 1.72) : 0, x: camera.position.x - MALL.cx, z: camera.position.z - MALL.cz };
if (inHallRealm()) {
var hm = hallMiddle();
if (hm)
return { place: "hall:Hall of Doors", level: 0, x: camera.position.x - hm.x, z: camera.position.z - hm.z };
}
if (typeof ATLC !== "undefined" && ATLC)
return { place: "out", level: 0, x: camera.position.x - ATLC.x, z: camera.position.z - ATLC.z };
return { place: "out", level: 0, x: camera.position.x, z: camera.position.z };
}
function placeToWorld(row) { return __ZC(90, 0, this, arguments, new.target); }
function undergroundSpot() {
if (typeof UG2 === "undefined" || !UG2 || !UG2.on)
return null;
try {
var R = UG2.ride;
if (UG2.mode === "riding" && R && UG2.train && UG2.train[R.d]) {
var T = UG2.train[R.d].position, off = R.d ? UG_HEAD / 2 : 0;
var k = Math.round((R.t0 - ugPos(R.from, R.d) * UG_SEG - off) / UG_HEAD);
return { place: "underground:train:" + R.d + ":" + k, x: T.x, z: T.z };
}
var st = ugLine().list[UG2.at];
return { place: "underground:" + String((st && (st.key || st.name)) || UG2.at).slice(0, 60), x: UG2.cx, z: UG2.cz };
}
catch (e) {
return null;
}
}
var PUB_LOOK = { busy: 0, look: "", at: 0, name: "" };
var LOOK_PULL = { uid: null, busy: 0 };
function lookOwnCount(L) { var n = 0; if (L && L.src)
for (var k in L.src)
if (L.src[k])
n++; return n; }
function pullMyLook() {
var uid = myUserId();
if (!uid || LOOK_PULL.uid === uid)
return true;
if (LOOK_PULL.busy && Date.now() - LOOK_PULL.busy < 15000)
return false;
if (typeof restGet !== "function" || typeof fetch !== "function") {
LOOK_PULL.uid = uid;
return true;
}
LOOK_PULL.busy = Date.now();
restGet("dreamer_public?select=look,name&user_id=eq." + encodeURIComponent(uid)).then(function (rows) {
LOOK_PULL.busy = 0;
if (rows === null)
return;
LOOK_PULL.uid = uid;
var row = rows && rows[0];
if (!row || myUserId() !== uid)
return;
var d = dreamer(), changed = false;
if (row.look && typeof row.look === "object" && !Array.isArray(row.look) && !lookOwnCount(d.look)) {
var L = JSON.parse(JSON.stringify(row.look));
if (!L.src)
L.src = {};
d.look = L;
changed = true;
}
if (row.name && !(d.name || "").trim()) {
d.name = String(row.name).slice(0, 60);
changed = true;
}
if (changed) {
save();
try {
if (typeof rebuildMe === "function")
rebuildMe();
}
catch (e) { }
}
}).catch(function () { LOOK_PULL.busy = 0; })
.then(function () { if (LOOK_PULL.uid === uid)
publishMyLook(); });
return false;
}
function publishMyLook() {
if (!(typeof signedIn === "function" && signedIn()) || !(typeof joinedSomnucor === "function" && joinedSomnucor()))
return;
if (!pullMyLook())
return;
presencePublished = false;
if (PUB_LOOK.busy && Date.now() - PUB_LOOK.busy < 20000)
return;
var lk = meLook(), js = JSON.stringify(lk), nm = (dreamer().name || "").trim();
if (js === PUB_LOOK.look && Date.now() - PUB_LOOK.at < 300000)
presencePublished = true;
else {
PUB_LOOK.busy = Date.now();
cityRpc("set_public_look", { p_look: lk }).then(function () { presencePublished = true; PUB_LOOK.look = js; PUB_LOOK.at = Date.now(); }).catch(function () { })
.then(function () { PUB_LOOK.busy = 0; });
}
if (nm && nm !== PUB_LOOK.name)
cityRpc("set_public_name", { p_name: nm }).then(function () { PUB_LOOK.name = nm; }).catch(function () { });
}
function tagCanvas(text, bubble) {
var c = document.createElement("canvas"), x = c.getContext("2d");
var W = bubble ? 640 : 512, lines = [text];
x.font = (bubble ? "30px " : "bold 34px ") + "ui-sans-serif,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
if (bubble) {
lines = [];
var line = "";
String(text).split(/\s+/).forEach(function (w) {
var t = line ? line + " " + w : w;
if (x.measureText(t).width > W - 48 && line) {
lines.push(line);
line = w;
}
else
line = t;
});
if (line)
lines.push(line);
if (lines.length > 4) {
lines = lines.slice(0, 4);
lines[3] = lines[3].replace(/.{0,2}$/, "…");
}
}
var lh = bubble ? 38 : 44, H = bubble ? (lines.length * lh + 34) : 64;
c.width = W;
c.height = H;
x = c.getContext("2d");
x.font = (bubble ? "30px " : "bold 34px ") + "ui-sans-serif,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
if (!bubble && x.measureText(text).width > W - 48) {
var fs = Math.max(18, Math.floor(34 * (W - 48) / x.measureText(text).width));
x.font = "bold " + fs + "px ui-sans-serif,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
if (x.measureText(text).width > W - 48) {
var t2 = String(text);
while (t2.length > 4 && x.measureText(t2 + "…").width > W - 48)
t2 = t2.slice(0, -1);
lines = [t2 + "…"];
text = lines[0];
}
}
var tw = bubble ? W - 8 : Math.min(W - 8, x.measureText(text).width + 40);
x.fillStyle = bubble ? "rgba(236,228,210,0.95)" : "rgba(10,12,18,0.72)";
var bx = (W - tw) / 2, r = bubble ? 18 : 26;
x.beginPath();
x.moveTo(bx + r, 4);
x.lineTo(bx + tw - r, 4);
x.quadraticCurveTo(bx + tw, 4, bx + tw, 4 + r);
x.lineTo(bx + tw, H - 4 - r);
x.quadraticCurveTo(bx + tw, H - 4, bx + tw - r, H - 4);
x.lineTo(bx + r, H - 4);
x.quadraticCurveTo(bx, H - 4, bx, H - 4 - r);
x.lineTo(bx, 4 + r);
x.quadraticCurveTo(bx, 4, bx + r, 4);
x.closePath();
x.fill();
if (!bubble) {
x.strokeStyle = "rgba(201,168,104,0.8)";
x.lineWidth = 2;
x.stroke();
}
x.fillStyle = bubble ? "#1A1712" : "#E8DFC8";
lines.forEach(function (l, i) { x.fillText(l, W / 2, bubble ? (17 + lh / 2 + i * lh) : H / 2 + 1); });
return c;
}
function makeTag(text, bubble) {
var c = tagCanvas(text, bubble);
var tex = new THREE.CanvasTexture(c);
var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
var sp = new THREE.Sprite(mat);
var w = bubble ? 3.0 : 2.6;
sp.scale.set(w, w * c.height / c.width, 1);
sp.renderOrder = 10;
return sp;
}
function dropTag(sp) {
if (!sp)
return;
if (sp.parent)
sp.parent.remove(sp);
if (sp.material) {
if (sp.material.map)
sp.material.map.dispose();
sp.material.dispose();
}
}
function sayOver(id, text) {
var p = presenceOthers[id];
if (!p || !p.group)
return;
dropTag(p.bubble);
p.bubble = makeTag(text, true);
p.bubble.position.y = 2.02 + p.bubble.scale.y / 2 + 0.28;
p.group.add(p.bubble);
p.bubbleLeft = 7;
}
function presenceGroupFor(row) { return __ZC(90, 1, this, arguments, new.target); }
function presenceGroupSafe(row) {
try {
return presenceGroupFor(row);
}
catch (e) {
if (window.console)
console.warn("[presence] look", e);
}
try {
var r2 = {};
for (var k in row)
r2[k] = row[k];
r2.look = null;
return presenceGroupFor(r2);
}
catch (e) {
return null;
}
}
function removePresence(id) {
var p = presenceOthers[id];
if (!p)
return;
dropTag(p.bubble);
if (p.group) {
dropTag(p.group.userData.tag);
if (scene)
scene.remove(p.group);
if (typeof hdfForget === "function")
hdfForget(p.group);
}
delete presenceOthers[id];
}
function clearAllPresence() {
Object.keys(presenceOthers).forEach(removePresence);
}
function presenceList() {
var P = camera.position;
return Object.keys(presenceOthers).map(function (id) {
var p = presenceOthers[id], g = p.group;
return { id: id, name: p.name || "a dreamer", dist: g ? Math.hypot(g.position.x - P.x, g.position.z - P.z) : 0 };
}).sort(function (a, b) { return a.dist - b.dist; });
}
var presenceLastPoll = 0, presenceBusy = { tell: 0, ask: 0 };
function presenceRot() {
try {
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on && isFinite(DRIVE.h))
return DRIVE.h;
}
catch (e) { }
return yaw;
}
var presenceTold = null, presenceAsked = { at: 0, pk: "" };
function presenceStill(at, now) {
var t = presenceTold;
if (!t || now - t.at >= 7500)
return false;
if (t.place !== at.place || t.level !== at.level)
return false;
if (Math.abs(t.x - at.x) > 0.3 || Math.abs(t.z - at.z) > 0.3)
return false;
var r = presenceRot(), d = ((r - t.rot) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
return Math.abs(d) < 0.15;
}
function presenceAskLater(at, now) {
var pk = at.place + "#" + at.level;
if (presenceNew || pk !== presenceAsked.pk)
return false;
var gap = (typeof dbcalmResting === "function" && dbcalmResting()) ? 10000 : (presenceCrowd() ? 0 : 6000);
return now - presenceAsked.at < gap;
}
function pollPresence() {
presenceLastPoll = performance.now();
var at = myPlace(), now = Date.now();
if (!(presenceBusy.tell && now - presenceBusy.tell < 15000) && !presenceStill(at, now)) {
presenceBusy.tell = now;
presenceTold = { at: now, x: at.x, z: at.z, place: at.place, level: at.level, rot: presenceRot() };
cityRpc("upsert_presence_at", { p_x: at.x, p_z: at.z, p_rot: presenceRot(), p_realm: "somnucor", p_place: at.place, p_level: at.level })
.catch(function () {
if (at.place === "out")
cityRpc("upsert_presence", { p_x: at.x, p_z: at.z, p_rot: presenceRot(), p_realm: "somnucor" }).catch(function () { });
}).then(function () { presenceBusy.tell = 0; });
}
if (!presencePublished)
publishMyLook();
if (presenceBusy.ask && now - presenceBusy.ask < 15000)
return;
if (presenceAskLater(at, now))
return;
presenceBusy.ask = now;
presenceAsked = { at: now, pk: at.place + "#" + at.level };
(typeof cwsAsk === "function" ? cwsAsk() : cityRpc("list_presence", { p_realm: "somnucor" })).then(function (rows) {
presenceBusy.ask = 0;
if (typeof cwsKeep === "function")
rows = cwsKeep(rows);
var seen = {}, me = myUserId(), arrived = [];
var others = {};
(rows || []).forEach(function (r) { if (r && r.user_id && r.user_id !== me && !r.away)
others[r.user_id] = 1; });
presenceTotal = Object.keys(others).length + 1;
if (typeof cwsTotal === "function")
presenceTotal = cwsTotal(presenceTotal);
(rows || []).forEach(function (row) {
try {
if (!row || row.user_id === me)
return;
var w = placeToWorld(row);
var face = (+row.rot || 0);
if (!w)
return;
seen[row.user_id] = 1;
var p = presenceOthers[row.user_id];
if (p)
p.lastSeen = performance.now();
var lk = JSON.stringify(typeof sfxLookKey === "function" ? sfxLookKey(row.look) : (row.look || {})), nm = (row.name || "a dreamer") + (row.away ? " \u00b7 " + (typeof awayWord === "function" ? awayWord(row) : "away") : "");
if (!p) {
var g = presenceGroupSafe(row);
if (!g)
return;
g.position.set(w.x, w.y, w.z);
g.rotation.y = face;
if (scene)
scene.add(g);
p = presenceOthers[row.user_id] = { group: g, target: { x: w.x, y: w.y, z: w.z, rot: face }, lastLook: lk, name: nm, away: !!row.away, spd: 0, gap: PRESENCE_INTERVAL, tMoved: performance.now(), lastSeen: performance.now() };
if (!row.away)
arrived.push(nm);
}
else {
presenceHeard(p, w, face);
p.target.x = w.x;
p.target.y = w.y;
p.target.z = w.z;
p.target.rot = face;
if (lk !== p.lastLook || nm !== p.name) {
var g2 = presenceGroupSafe(row);
if (!g2)
return;
var bub = p.bubble;
p.bubble = null;
if (p.group) {
dropTag(p.group.userData.tag);
if (scene)
scene.remove(p.group);
if (typeof hdfForget === "function")
hdfForget(p.group);
}
g2.position.set(w.x, w.y, w.z);
g2.rotation.y = face;
if (scene)
scene.add(g2);
p.group = g2;
p.lastLook = lk;
p.name = nm;
if (bub) {
g2.add(bub);
p.bubble = bub;
}
}
}
if (typeof sfxPresenceBreath === "function")
try {
sfxPresenceBreath(p, row);
}
catch (e) { }
}
catch (e) {
if (!pollPresence.warned) {
pollPresence.warned = true;
if (window.console)
console.warn("[presence] row", e);
}
}
});
var nowT = performance.now(), live = {};
(rows || []).forEach(function (r) { if (r && r.user_id && !r.away)
live[r.user_id] = r; });
Object.keys(presenceOthers).forEach(function (id) {
if (seen[id])
return;
var p = presenceOthers[id], elsewhere = !!live[id];
if (elsewhere || p.away || nowT - (p.lastSeen || 0) > PRESENCE_GRACE)
removePresence(id);
});
if (arrived.length && !presenceNew)
streetNote(arrived.length === 1 ? ("<b>" + esc(arrived[0]) + "</b> is here.") : ("<b>" + arrived.length + " dreamers</b> are here now."));
presenceNew = false;
paintStreetButton();
if (streetOpen && streetTab === "people")
paintStreet();
}).catch(function () { presenceBusy.ask = 0; });
}
function presenceHeard(p, w, rot) { return __ZC(90, 2, this, arguments, new.target); }
var PRESENCE_CROWD = { n: 0, at: 0 };
function presenceCrowd() {
var now = performance.now();
if (now - PRESENCE_CROWD.at < 500)
return PRESENCE_CROWD.n;
PRESENCE_CROWD.at = now;
if (typeof camera === "undefined" || !camera)
return 0;
var P = camera.position, n = 0;
for (var id in presenceOthers) {
var p = presenceOthers[id], g = p && p.group;
if (!g || p.away)
continue;
if (Math.hypot(g.position.x - P.x, g.position.z - P.z) < 40)
n++;
}
return (PRESENCE_CROWD.n = n);
}
function presenceEvery(base, quick, per) {
var n = presenceCrowd();
return n ? Math.min(base, quick + per * n) : base;
}
var presenceActive = false, presenceWall = 0;
function presenceTick(dt) {
var wall = performance.now();
dt = presenceWall ? Math.min(1, Math.max(dt || 0, (wall - presenceWall) / 1000)) : (dt || 0.016);
presenceWall = wall;
var active = walkMode && (typeof signedIn === "function" && signedIn()) && (typeof joinedSomnucor === "function" && joinedSomnucor()) && presenceSharedHere() && !(typeof amVisiting === "function" && amVisiting());
if (active && typeof ageHold === "function" && ageHold()) {
active = false;
if (AGE.blocked || AGE.deleting)
ageBlockedCard();
else
ageAsk(false);
}
if (!active) {
if (Object.keys(presenceOthers).length)
clearAllPresence();
if (presenceActive) {
if (typeof signedIn === "function" && signedIn())
cityRpc("clear_presence").catch(function () { });
presenceActive = false;
presenceNew = true;
presenceTold = null;
PUB_LOOK.look = "";
PUB_LOOK.name = "";
}
showStreet(false);
updateDeskButton();
return;
}
if (!presenceActive) {
presenceActive = true;
presenceCool = 0;
showStreet(true);
}
var pk = myPlace();
pk = pk.place + "#" + pk.level;
if (pk !== presenceTick.lastPlace) {
var lp0 = String(presenceTick.lastPlace || ""), samePlace = lp0 && lp0.slice(0, lp0.lastIndexOf("#")) === pk.slice(0, pk.lastIndexOf("#"));
presenceTick.lastPlace = pk;
presenceCool = Math.min(presenceCool, 0.25);
if (!samePlace) {
clearAllPresence();
presenceNew = true;
}
}
if (presenceCool <= 0) {
presenceCool = presenceEvery(PRESENCE_INTERVAL, 2, 0.05);
pollPresence();
}
else
presenceCool -= dt;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], G = p.group;
if (!G)
return;
var gp = G.position, dx = p.target.x - gp.x, dz = p.target.z - gp.z, d = Math.sqrt(dx * dx + dz * dz);
if (d > 40) {
gp.x = p.target.x;
gp.z = p.target.z;
}
else if (d > 0.001) {
var st = Math.min(d, Math.max(p.spd || 0, 0.8) * dt);
gp.x += dx / d * st;
gp.z += dz / d * st;
}
var ty = p.target.y || 0;
gp.y = Math.abs(ty - gp.y) > 3 ? ty : gp.y + (ty - gp.y) * Math.min(1, dt * 8);
var dr = ((p.target.rot - G.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
G.rotation.y += dr * Math.min(1, dt * 5);
if (p.bubble) {
p.bubbleLeft -= dt;
if (p.bubbleLeft <= 0) {
dropTag(p.bubble);
p.bubble = null;
}
}
});
streetTick(dt);
updateDeskButton();
}
setInterval(function () {
try {
if (!presenceActive || document.visibilityState === "hidden")
return;
if (performance.now() - presenceLastPoll > 6000 && presenceSharedHere() && signedIn())
pollPresence();
}
catch (e) { }
}, 3000);
var streetOpen = false, streetTab = "talk", streetChan = "near";
var chatAfter = 0, chatLines = [], chatCool = 0, tradeCool = 0, myTradeRows = [], seenTrades = {};
var besideId = null, streetMaterials = null;
function streetEl() {
var el = document.getElementById("street");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent =
"#street-btn{position:fixed;right:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:45;display:none;" +
"background:rgba(10,12,18,.92);color:var(--bone);border:1px solid var(--gold,#C9A868);border-radius:3px;" +
"padding:8px 12px;font:13px var(--sans);cursor:pointer}" +
"#street-btn .badge{display:inline-block;min-width:18px;padding:0 5px;margin-left:6px;border-radius:9px;background:#B8724A;color:#fff;font-size:11px;text-align:center}" +
"#street{position:fixed;right:12px;top:calc(136px + env(safe-area-inset-top,0px));z-index:46;display:none;" +
"width:min(380px,calc(100vw - 24px));max-height:min(62vh,560px);flex-direction:column;" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;font:13px var(--sans);color:var(--bone)}" +
"#street .st-tabs{display:flex;border-bottom:1px solid var(--line)}" +
"#street .st-tabs button{flex:1;background:none;border:0;color:var(--dim);padding:9px 4px;font:13px var(--sans);cursor:pointer}" +
"#street .st-tabs button.on{color:var(--bone);box-shadow:inset 0 -2px 0 var(--gold,#C9A868)}" +
"#street .st-body{overflow-y:auto;padding:10px 12px;flex:1;min-height:120px}" +
"#street .st-foot{border-top:1px solid var(--line);padding:8px;display:flex;gap:6px}" +
"#street input,#street select,#street textarea{background:var(--void);border:1px solid var(--line);color:var(--bone);padding:6px 8px;font:13px var(--sans);border-radius:2px}" +
"#street .st-line{margin:0 0 6px;line-height:1.45;word-wrap:break-word}" +
"#street .st-who{color:var(--gold,#C9A868)}" +
"#street .st-city{color:#7C93B8;font-size:11px;margin-right:4px}" +
"#street .st-row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}" +
"#street .st-dim{color:var(--dim)}" +
"#street .btn{padding:4px 9px;font-size:12px}" +
"#desk-btn{position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:44;display:none;" +
"background:rgba(10,12,18,.94);color:var(--gold,#C9A868);border:1px solid var(--gold,#C9A868);border-radius:3px;" +
"padding:10px 18px;font:15px var(--serif);cursor:pointer;letter-spacing:.02em}";
document.head.appendChild(css);
var b = document.createElement("button");
b.id = "street-btn";
b.type = "button";
b.onclick = function () { streetOpen = !streetOpen; paintStreetButton(); paintStreet(); };
document.body.appendChild(b);
el = document.createElement("div");
el.id = "street";
el.innerHTML = '<div class="st-tabs"><button data-st="talk">Talk</button><button data-st="people">People</button><button data-st="trades">Trades</button></div>' +
'<div class="st-body" id="st-body"></div>' +
'<div class="st-foot" id="st-foot">' +
'<select id="st-chan" title="who hears you"><option value="near">Nearby</option><option value="city">Whole city</option></select>' +
'<input id="st-say" maxlength="240" placeholder="Say something…" style="flex:1;min-width:0" autocomplete="off">' +
'<button class="btn" id="st-send">Say</button></div>';
document.body.appendChild(el);
Array.prototype.forEach.call(el.querySelectorAll("[data-st]"), function (t) {
t.onclick = function () { streetTab = t.getAttribute("data-st"); if (streetTab === "trades")
loadTrades(); paintStreet(); };
});
["keydown", "keyup", "keypress"].forEach(function (k) {
el.addEventListener(k, function (e) {
if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
e.stopPropagation();
if (k === "keydown" && e.key === "Enter" && e.target.id === "st-say") {
e.preventDefault();
sendSay();
}
if (k === "keydown" && e.key === "Escape") {
e.target.blur();
}
}
});
});
document.getElementById("st-send").onclick = sendSay;
document.getElementById("st-chan").onchange = function () { streetChan = this.value; };
var d = document.createElement("button");
d.id = "desk-btn";
d.type = "button";
d.onclick = function () {
if (typeof deskNear !== "undefined" && deskNear)
openDesk();
else if (typeof officeDeskNear !== "undefined" && officeDeskNear)
openOfficeDesk();
};
document.body.appendChild(d);
return el;
}
function showStreet(on) {
var el = streetEl();
if (!el)
return;
var b = document.getElementById("street-btn");
if (b)
b.style.display = on ? "block" : "none";
el.style.display = (on && streetOpen) ? "flex" : "none";
if (on)
paintStreetButton();
}
function incomingOpen() { return myTradeRows.filter(function (t) { return t.incoming && t.state === "open"; }).length; }
function paintStreetButton() {
var b = document.getElementById("street-btn");
if (!b)
return;
var n = Object.keys(presenceOthers).filter(function (id) { return !presenceOthers[id].away; }).length, inc = incomingOpen(), all = Math.max(presenceTotal || 1, n + 1);
b.innerHTML = (streetOpen ? "Close" : "The street") + " <span class='st-dim'>· " + all + " in the city" + (n ? ", " + n + " near you" : "") + (typeof cwsCopyWord === "function" ? cwsCopyWord() : "") + "</span>" + (inc ? "<span class='badge'>" + inc + "</span>" : "");
var el = document.getElementById("street");
if (el)
el.style.display = (presenceActive && streetOpen) ? "flex" : "none";
}
function updateDeskButton() {
var d = document.getElementById("desk-btn");
if (!d) {
if (!((typeof deskNear !== "undefined" && deskNear) || (typeof officeDeskNear !== "undefined" && officeDeskNear)))
return;
streetEl();
d = document.getElementById("desk-btn");
if (!d)
return;
}
var dn = typeof deskNear !== "undefined" && deskNear, on = typeof officeDeskNear !== "undefined" && officeDeskNear;
var open = typeof deskOpen !== "undefined" && deskOpen;
var show = walkMode && (dn || on) && !open;
d.style.display = show ? "block" : "none";
if (show) {
var want = dn ? "Sit at the Keeper’s Desk" : "Sit at the desk";
if (d.textContent !== want)
d.textContent = want;
}
}
function streetNote(html) {
chatLines.push({ sys: true, html: html });
if (chatLines.length > 80)
chatLines.shift();
if (streetOpen && streetTab === "talk")
paintStreet();
}
function paintStreet() { return __ZC(90, 3, this, arguments, new.target); }
function tradeWords(t, giving) { return __ZC(90, 4, this, arguments, new.target); }
function sendSay() { return __ZC(90, 5, this, arguments, new.target); }
var chatBusy = 0;
function pollChat() {
if (chatBusy && Date.now() - chatBusy < 15000)
return;
chatBusy = Date.now();
cityRpc("city_chat_since", { p_after: chatAfter }).then(function (rows) {
chatBusy = 0;
(rows || []).forEach(function (r) {
chatAfter = Math.max(chatAfter, +r.id || 0);
chatLines.push({ id: r.id, user_id: r.user_id, name: r.name || "a dreamer", body: r.body, channel: r.channel, mine: !!r.mine });
if (!r.mine && presenceOthers[r.user_id])
sayOver(r.user_id, r.body);
if (!r.mine && !streetOpen)
streetUnread++;
});
if (chatLines.length > 80)
chatLines.splice(0, chatLines.length - 80);
if ((rows || []).length && streetOpen && streetTab === "talk")
paintStreet();
if ((rows || []).length && !streetOpen) {
var last = rows[rows.length - 1];
if (!last.mine)
setStatus("<b>" + esc(last.name || "Somebody") + "</b>" + (last.channel === "city" ? " (to the city)" : "") + ": " + esc(last.body));
}
}).catch(function () { chatBusy = 0; });
}
var streetUnread = 0;
function loadTrades() {
return cityRpc("my_trades").then(function (rows) {
myTradeRows = rows || [];
myTradeRows.forEach(function (t) {
if (t.incoming && t.state === "open" && !seenTrades[t.trade_id]) {
seenTrades[t.trade_id] = 1;
setStatus("<b>" + esc(t.other_name) + "</b> offers you " + tradeWords(t, true) + ". Open <b>The street</b> → Trades to answer.");
}
if (!t.incoming && t.state !== "open" && !seenTrades["s" + t.trade_id]) {
seenTrades["s" + t.trade_id] = 1;
if (t.state === "done") {
setStatus("<b>" + esc(t.other_name) + " accepted your trade.</b>");
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof loadStock === "function")
loadStock();
if (typeof loadThings === "function")
loadThings();
}
else if (t.state === "declined")
setStatus(esc(t.other_name) + " turned your offer down.");
}
});
paintStreetButton();
if (streetOpen && streetTab === "trades")
paintStreet();
return myTradeRows;
}).catch(function () { return myTradeRows; });
}
function answerTrade(fn, id) { return __ZC(90, 6, this, arguments, new.target); }
function loadMaterials() {
if (streetMaterials)
return Promise.resolve(streetMaterials);
return restGet("materials?select=kind,name&order=name").then(function (rows) { streetMaterials = rows || []; return streetMaterials; })
.catch(function () { return []; });
}
function tradeForm(toId) { return __ZC(90, 7, this, arguments, new.target); }
function streetTick(dt) {
chatCool -= dt;
tradeCool -= dt;
if (chatCool <= 0) {
chatCool = presenceEvery(2.5, 1.2, 0.04);
pollChat();
}
if (tradeCool <= 0) {
tradeCool = streetOpen ? 6 : 15;
loadTrades();
}
var near = presenceList()[0];
if (near && near.dist < 3.2) {
if (besideId !== near.id) {
besideId = near.id;
if (!streetOpen)
setStatus("<b>" + esc(near.name) + "</b> is beside you. Open <b>The street</b> to talk or trade.");
}
}
else
besideId = null;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.key !== "Enter" || !presenceActive)
return;
var t = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT|BUTTON/.test(t))
return;
if (typeof deskOpen !== "undefined" && deskOpen)
return;
e.preventDefault();
streetOpen = true;
streetTab = "talk";
paintStreet();
var inp = document.getElementById("st-say");
if (inp)
setTimeout(function () { inp.focus(); }, 0);
});
