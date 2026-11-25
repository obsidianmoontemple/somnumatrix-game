/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var THREAT = /\b(chased|chasing|chase me|hunted|hunting me|stalked|stalking|pursued|pursuing|attacked|attacking|haunted|haunting|came after me|was after me|were after me|followed me|coming for me|came for me|grabbed me|tried to kill|wanted to kill|crept toward|crawled toward|terrified me|attacked me|lunged at|ran at me|tore at|was hunting)\b/;
var FRIENDLY = /\b(friendly|kind|gentle|helped me|my friend|protected me|guided me|smiled at me|comforted me|was harmless|meant no harm|tame)\b/;
var DEFEAT = [
["light", /\b(light|lamp|torch|flashlight|sunlight|shone|shining|glowed|lantern)\b/, "with light"],
["face", /\b(faced it|faced them|faced him|faced her|turned and faced|turned to face|stood my ground|looked it in the eye|stared it down|stopped running)\b/, "by facing it"],
["name", /\b(named it|said its name|called it by (its )?name|knew its name|its true name|spoke its name)\b/, "by naming it"],
["command", /\b(told it to (go|leave)|commanded it|shouted at it|banished|ordered it|told them to leave|told it no)\b/, "by commanding it to go"],
["strike", /\b(killed|stabbed|struck|shot|slew|slain|fought (it|them|him|her|back)|punched|kicked|beat it|cut it|cut off)\b/, "by striking it down"],
["song", /\b(sang|singing|sung|hummed|chanted)\b/, "with a song"],
["prayer", /\b(prayed|prayer|invoked|called on|called upon|recited)\b/, "with a prayer"],
["laugh", /\b(laughed at it|laughed at them|laughed)\b/, "by laughing at it"],
["embrace", /\b(hugged|embraced|held it|forgave|comforted it|made friends)\b/, "by embracing it"],
["fire", /\b(burned it|set it on fire|burned them|with fire)\b/, "with fire"],
["wake", /\b(woke up|i woke|awoke|jolted awake)\b/, "by waking"]
];
var DEFEAT_LABEL = {};
DEFEAT.forEach(function (d) { DEFEAT_LABEL[d[0]] = d[2]; });
var GENERIC_WAYS = ["face", "light", "command", "name", "strike", "song", "prayer", "embrace"];
var WAY_BUTTON = { face: "Face it", light: "Bring light", command: "Command it to go", name: "Name it", strike: "Strike it down",
song: "Sing", prayer: "Pray", laugh: "Laugh at it", embrace: "Embrace it", fire: "Burn it", wake: "Wake up" };
function isNightmare(c) { return !!(c && c.nightmare); }
function lastDreamt(c) { return (c.sessions || []).reduce(function (m, s) { return Math.max(m, s); }, 0); }
function beaten(c) { return c.beaten !== undefined && c.beaten >= lastDreamt(c); }
function nightmareScan(text) { return __ZC(73, 0, this, arguments, new.target); }
var nmOpen = null, nmTimer = 0, nmCool = 0, NM_RANGE = 70, NM_REACH = 2.6, NM_WAIT = 10;
function isNightHour(h) { return h >= 20.5 || h < 5.5; }
function nightTick(dt) {
if (nmCool > 0)
nmCool -= dt;
if (!walkMode || cfg().nightmares === false) {
if (nmOpen)
closeEncounter();
return;
}
var night = isNightHour(dreamHour());
var P = camera.position, here = store.here || 0;
store.characters.forEach(function (c) {
if (!isNightmare(c) || !c.objId)
return;
var sp = specById(c.objId), g = meshes[c.objId];
if (!sp || !g)
return;
g.userData.hunt = 0;
if (!night || beaten(c) || (sp.realm || 0) !== here || g.visible === false)
return;
var dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.sqrt(dx * dx + dz * dz);
if (d > NM_RANGE)
return;
if (store.inside)
return;
if (nmOpen) {
g.userData.target = { x: g.position.x, z: g.position.z };
g.userData.path = null;
return;
}
g.userData.hunt = 1;
g.userData.target = { x: P.x - dx / d * 1.2, z: P.z - dz / d * 1.2 };
g.userData.repath = (g.userData.repath || 0) - dt;
if (g.userData.repath <= 0) {
g.userData.repath = 1.2;
g.userData.path = null;
if (walksOnGround(g, sp))
wantPath(c.objId);
}
if (d < NM_REACH && nmCool <= 0)
openEncounter(c);
});
if (nmOpen) {
nmTimer -= dt;
var bar = document.getElementById("nm-bar");
if (bar)
bar.style.width = Math.max(0, nmTimer / NM_WAIT * 100) + "%";
if (nmTimer <= 0)
caught(nmOpen);
}
}
function encounterWays(c) {
var dreamt = (c.defeat || []).slice();
var abil = (dreamer().abilities || []).map(function (a) { return "ability:" + a.name; });
var rest = GENERIC_WAYS.filter(function (w) { return dreamt.indexOf(w) === -1; });
return { dreamt: dreamt, abilities: abil, rest: rest };
}
function openEncounter(c) { return __ZC(73, 1, this, arguments, new.target); }
function closeEncounter() { nmOpen = null; var el = document.getElementById("nm-panel"); if (el)
el.style.display = "none"; }
function chooseWay(c, way) { return __ZC(73, 2, this, arguments, new.target); }
function defeatNightmare(c, way) { return __ZC(73, 3, this, arguments, new.target); }
var nmFades = [];
function nightFades(dt) { nmFades = nmFades.filter(function (f) { return !f(dt); }); }
function caught(c) {
closeEncounter();
addDetail(c, "caught the dreamer at night");
if (cfg().nightmareCatch === "none") {
nmCool = 6;
setStatus("It has you \u2014 and it only waits. Face it when you are ready.");
save();
return;
}
wakeAtDawn("It caught you. You woke.");
}
function wakeAtDawn(msg) {
if (store.here && typeof leaveRealm === "function")
leaveRealm();
var h = heartOf(0);
camera.position.set(h.x, 1.72, h.z + 30);
if (typeof flyY !== "undefined")
flyY = 0;
scrubOffset = 6.2;
tickClock(true);
nmCool = 3;
setStatus("<b>" + msg + "</b> It is dawn, and you are back in the town.");
}
