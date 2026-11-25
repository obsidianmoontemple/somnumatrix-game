/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var OF = { g: null, lock: null, prompt: false, purged: 0, arrive: null };
var OF_OFF = new THREE.Vector3(-150, 46, 140);
var OF_R = 92, OF_TUBE = 8;
function ofPanelTex() { return __ZC(488, 0, this, arguments, new.target); }
function ofModel(G) { return __ZC(488, 1, this, arguments, new.target); }
function ofHookSpace() {
if (typeof spBuild !== "function" || spBuild.ofHooked)
return;
var b0 = spBuild;
spBuild = function (G) { var r = b0.apply(this, arguments); try {
SP.stations.orbital = ofModel(G);
}
catch (e) {
if (window.console)
console.warn("[orbital] build", e);
} return r; };
spBuild.ofHooked = 1;
var p0 = spPlace;
spPlace = function () { var r = p0.apply(this, arguments); try {
var s = SP.stations.orbital, h = SP.bodies && SP.bodies.earth;
if (s && h)
s.position.copy(h.position).add(OF_OFF);
}
catch (e) { } return r; };
var t0 = spTick;
spTick = function (dt) { var r = t0.apply(this, arguments); try {
ofSpaceTick(dt);
}
catch (e) {
if (window.console && !OF.warned) {
OF.warned = 1;
console.warn("[orbital] tick", e);
}
} return r; };
var q0 = spPromptTick;
spPromptTick = function () {
var s = SP.stations && SP.stations.orbital;
if (s && SP.pos && SP.pos.distanceTo(s.position) < OF_R + 170) {
return worldPrompt("<b>The Orbital: Meridian Ring</b> · <b>press E</b> to dock and go aboard", function () { ofDock("space"); });
}
return q0.apply(this, arguments);
};
if (typeof spTargetPos === "function") {
var g0 = spTargetPos;
spTargetPos = function (A) { if (A && A.station === "orbital" && SP.stations.orbital) {
var c = SP.stations.orbital.position.clone(), from = SP.pos.clone().sub(c);
from.y = 0;
if (from.lengthSq() < 1)
from.set(1, 0, 0);
from.normalize();
return c.addScaledVector(from, OF_R + 150).add(new THREE.Vector3(0, 40, 0));
} return g0.apply(this, arguments); };
}
}
function ofSpaceTick(dt) { return __ZC(488, 2, this, arguments, new.target); }
function ofRealm() { return realms().filter(function (r) { return r.kind === "station"; })[0] || null; }
function ofDock(how) { return __ZC(488, 3, this, arguments, new.target); }
function ofUndock() { return __ZC(488, 4, this, arguments, new.target); }
function ofLockCard() { return __ZC(488, 5, this, arguments, new.target); }
function ofLockBuild() { return __ZC(488, 6, this, arguments, new.target); }
function ofLockPrompt(on) {
if (on && !OF.prompt) {
OF.prompt = true;
worldPromptCity("🛰️ <b>The docking airlock</b> · <b>press E</b> to undock, or take the Ring Line shuttle", ofLockCard);
}
else if (!on && OF.prompt) {
OF.prompt = false;
worldPromptCity(null);
}
}
function ofTick(dt) {
var here = typeof LD !== "undefined" && LD.kind === "station" && LD.g && store.here === LD.rid && !(typeof WLD !== "undefined" && WLD.on);
if (!here) {
if (OF.lock) {
if (OF.lock.parent)
OF.lock.parent.remove(OF.lock);
OF.lock = null;
}
ofLockPrompt(false);
return;
}
if (!OF.lock) {
OF.lock = ofLockBuild();
OF.lock.position.set(LD.ox, (typeof ldY === "function" ? ldY(0, 12) : 0), LD.oz + 12);
OF.lock.rotation.y = Math.PI;
scene.add(OF.lock);
}
if (OF.lock.userData.beacon)
OF.lock.userData.beacon.material.opacity = 0.4 + 0.2 * Math.sin(performance.now() / 900);
var P = camera.position, d = Math.hypot(P.x - LD.ox, P.z - (LD.oz + 11.2));
if (d < 3.6 && walkMode && !LD.near && !store.inside)
ofLockPrompt(true);
else
ofLockPrompt(false);
if (Math.abs(P.x - LD.ox) < 4.6 && P.z > LD.oz + 11.2 && P.z < LD.oz + 13.4)
P.z = LD.oz + 11.2;
}
function ofPurgeHall() {
var hall = typeof hallRealm === "function" ? hallRealm() : null;
if (!hall)
return;
var gone = [];
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if ((o.realm || 0) !== hall.id || o.archetype !== "hubdoor" || o.leadsTo !== "station")
continue;
gone.push(o);
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
if (!gone.length)
return;
var ids = {};
gone.forEach(function (o) { ids[o.id] = 1; });
if (store.passages)
store.passages = store.passages.filter(function (p) { return !ids[p.from] && !ids[p.to]; });
gone.forEach(function (o) {
var spec = { id: uid(), archetype: KIT.signboard ? "signboard" : "plinth", label: "The Orbital", attrs: {}, x: o.x, z: o.z, rot: o.rot || 0, solid: true, detail: 4, nights: [store.session], realm: hall.id, hub: true, peopled: true, addr: null, name: "The Orbital", named: "stated", ofPlate: 1 };
spec.sign = "The Orbital";
spec.note = "The Orbital is not behind a door any more: it is a station over Earth, in Open Space. Take the Ring Line shuttle from Launch Pad 1 at the Space Corp Spaceport, or fly your own ship up to the ring and dock. Meridian Ring, its homes, shops and the Academy of Flight are all there as before.";
store.objects.push(spec);
if (typeof addMesh === "function" && typeof scene !== "undefined" && scene)
try {
addMesh(spec);
}
catch (e) { }
});
if (typeof save === "function")
try {
save();
}
catch (e) { }
}
(function () {
if (typeof ORB_LINES === "undefined" || ORB_LINES.some(function (l) { return l.k === "ring"; }))
return;
ORB_LINES.push({ k: "ring", name: "Ring Line", col: "#9AE8FF", off: 40, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "meridian", name: "The Orbital: Meridian Ring", kind: "station", host: "earth",
facts: ["The Orbital is a ring station: it spins so that the floor of Meridian Ring pushes up on your feet, as a fairground ride pins you to its wall. That push stands in for gravity.",
"A ring 180 metres across has to turn about once every 19 seconds to give a full Earth weight at the rim. The idea goes back to Konstantin Tsiolkovsky in 1903, and Wernher von Braun drew one in 1952.",
"Like the real space station, the Orbital goes round the Earth about once every 92 minutes: sixteen sunrises a day."] }
] });
})();
function ofHookAll() {
if (OF.hooked)
return;
OF.hooked = 1;
try {
ofHookSpace();
}
catch (e) {
if (window.console)
console.warn("[orbital] space", e);
}
if (typeof orbArrive === "function") {
var a0 = orbArrive;
orbArrive = function (stop) { if (stop && stop.k === "meridian")
return ofDock("shuttle"); return a0.apply(this, arguments); };
}
if (typeof dqGoLand === "function") {
var d0 = dqGoLand;
dqGoLand = function (k) { if (k === "station") {
worldCard(null);
return ofDock("shuttle");
} return d0.apply(this, arguments); };
}
if (typeof buildHall === "function") {
var b0 = buildHall;
buildHall = function () { var r = b0.apply(this, arguments); try {
ofPurgeHall();
}
catch (e) { } return r; };
}
if (typeof toHall === "function") {
var h0 = toHall;
toHall = function () { var r = h0.apply(this, arguments); try {
ofPurgeHall();
}
catch (e) { } return r; };
}
if (typeof hubDoorLabel === "function") {
var l0 = hubDoorLabel;
hubDoorLabel = function (o) { if (o && o.leadsTo === "station")
return "🛰️ <b>The Orbital</b> is in Open Space now · by the Ring Line shuttle from the Spaceport"; return l0.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var t0 = transitTick;
transitTick = function (dt) { var r = t0.apply(this, arguments); try {
ofTick(dt);
}
catch (e) {
if (window.console && !OF.tw) {
OF.tw = 1;
console.warn("[orbital] lock", e);
}
} return r; };
}
try {
ofPurgeHall();
}
catch (e) { }
}
if (document.readyState === "complete")
setTimeout(ofHookAll, 0);
else
addEventListener("load", function () { setTimeout(ofHookAll, 0); });
