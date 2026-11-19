/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(50, function () {
"use strict";
return [
function (b, seed) {
var inRealm = realmAtX(blockOrigin(b.bx, b.bz).x);
var mix = inRealm ? realmTemplate(inRealm).mix : (MIX[b.flavour] || MIX.res);
var k = mix[seed % mix.length];
var g = store.grid, keep = { bx: g.bx, bz: g.bz, lot: g.lot };
store.grid = { bx: b.bx, bz: b.bz, lot: (seed % LOTS) };
var s;
if (k === "crowd") {
k = (seed % 6 === 0) ? "child" : "human";
if (!b.gather)
b.gather = spotFor("human");
var ga = (seed % 628) / 100, gr = 1 + ((seed >>> 4) % 30) / 10;
s = { x: b.gather.x + Math.cos(ga) * gr, z: b.gather.z + Math.sin(ga) * gr, addr: b.gather.addr };
}
else
s = spotFor(k);
store.grid = keep;
var spec = { id: uid(), archetype: k, label: null, attrs: {}, x: s.x, z: s.z,
rot: Math.random() * 6.283, sign: null, note: null, solid: false, detail: 0,
addr: s.addr || null, name: null, named: null, filler: true, block: b.bx + ":" + b.bz };
var c = { id: uid(), archetype: k, name: "someone", aka: [], details: [], sessions: [],
awake: false, log: [], objId: spec.id, x: spec.x, z: spec.z, primary: false,
src: {}, role: null, shift: null, routine: null, home: null, work: null,
anchor: { x: spec.x, z: spec.z }, born: "" };
spec.charId = c.id;
store.objects.push(spec);
store.characters.push(c);
addMesh(spec);
b.ids.push(spec.id);
return spec;
},
function (id, b) {
if (meshes[id]) {
scene.remove(meshes[id]);
delete meshes[id];
}
for (var i = store.objects.length - 1; i >= 0; i--)
if (store.objects[i].id === id) {
store.objects.splice(i, 1);
break;
}
for (var j = store.characters.length - 1; j >= 0; j--)
if (store.characters[j].objId === id) {
store.characters.splice(j, 1);
break;
}
if (b) {
var k = b.ids.indexOf(id);
if (k > -1)
b.ids.splice(k, 1);
}
}
];
});
