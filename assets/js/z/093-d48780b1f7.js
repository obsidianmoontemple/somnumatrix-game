/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(93, function () {
"use strict";
return [
function () {
Object.keys(meshes).forEach(function (id) { scene.remove(meshes[id]); delete meshes[id]; });
store.streets = [];
store.blocks = {};
var awaitingCustom = [];
store.objects.forEach(function (s) {
if (!KIT[s.archetype])
awaitingCustom.push(s);
if (!s.addr)
s.addr = addressOf(Math.round(s.x / PITCH), Math.round(s.z / PITCH), 0);
if (!s.name)
s.name = nameFor(s, s.addr);
ensureStreets(Math.round(s.x / PITCH), Math.round(s.z / PITCH));
addMesh(s);
});
store.characters.forEach(assignLife);
buildTerrain();
applyShadows();
realmGroundsAll();
populate();
tickClock(true);
updateCount();
renderTranscript(store.transcript || "", "");
if (awaitingCustom.length && typeof loadCustomArchetypes === "function") {
loadCustomArchetypes().then(function () {
awaitingCustom.forEach(function (s) { if (KIT[s.archetype])
refresh(s); });
});
}
}
];
});
