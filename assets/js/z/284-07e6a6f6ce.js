/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(284, function () {
"use strict";
return [
function (S, a, x, z, rot, s, y) {
if (!KIT[a])
return null;
var m = build({ id: "pd_" + a + "_" + Math.round(x) + "_" + Math.round(z), archetype: a, label: null, attrs: s !== 1 ? { s: s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
m.position.set(x, y, z);
m.rotation.y = rot || 0;
S.add(m);
var d = KIT[a], hw = d.size[0] * s / 2, hd = d.size[2] * s / 2;
if (d.cat !== "being" && !/^(landinglights|solarfarm)$/.test(a))
SF.solids.push({ x: x, z: z, rot: rot || 0, hw: hw, hd: hd, h: d.size[1] * s });
return m;
},
function (S, x, z, y) {
var g = new THREE.Group(), w = new THREE.MeshLambertMaterial({ color: 0xC8C4B8 }), d = new THREE.MeshLambertMaterial({ color: 0x5A5650 });
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.25, 8, 20), d);
ring.rotation.x = Math.PI / 2;
ring.position.y = 0.25;
g.add(ring);
var body = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), w);
body.position.y = 1.3;
g.add(body);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.1, 18), w);
disc.position.y = 2.6;
g.add(disc);
var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 6), d);
mast.position.y = 3.2;
g.add(mast);
for (var i = 0; i < 6; i++) {
var p = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.9), d);
var a = i / 6 * Math.PI * 2;
p.position.set(Math.cos(a) * 1.9, 0.08, Math.sin(a) * 1.9);
p.rotation.y = -a + Math.PI / 2;
g.add(p);
}
g.position.set(x, y, z);
S.add(g);
SF.solids.push({ x: x, z: z, r: 1.6, h: 3 });
},
function (S, x, z, y) {
var g = new THREE.Group(), w = new THREE.MeshLambertMaterial({ color: 0xF0F0EC }), l = new THREE.MeshLambertMaterial({ color: 0x8A8E96 });
var top = new THREE.Mesh(new THREE.BoxGeometry(46, 0.4, 30), w);
top.position.y = 12;
g.add(top);
[[-21, -13], [21, -13], [-21, 13], [21, 13]].forEach(function (q) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 12, 8), l); p.position.set(q[0], 6, q[1]); g.add(p); SF.solids.push({ x: x + q[0], z: z + q[1], r: 0.6, h: 12 }); });
g.position.set(x, y, z);
S.add(g);
},
function (S, x, z, y) {
var st = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.5), new THREE.MeshLambertMaterial({ color: 0x5A5E66 }));
st.position.set(x, y + 1.2, z);
S.add(st);
if (typeof wSign === "function") {
var sg = wSign(["New Horizons", "flew past here", "14 July 2015"], 1.1, 1, "#2A2E36", "#E8E0C8");
sg.position.set(x, y + 1.6, z + 0.27);
S.add(sg);
}
SF.solids.push({ x: x, z: z, r: 0.8, h: 2.4 });
SF.sites.push({ x: x, z: z, r: 3, name: "The New Horizons marker", info: worldFacts("New Horizons", "The first visit to Pluto", [["Launched", "19 January 2006"], ["Flew past Pluto", "14 July 2015, 12,500 km above the surface"], ["Speed", "about 50,000 km/h"]], ["It was the fastest spacecraft ever launched from Earth.", "After Pluto it flew on to Arrokoth, a small icy world, on 1 January 2019: the most distant object ever visited."]) });
},
function (k) {
var B = PD_BASES[k], G = WORLDS.surface.g;
if (!B || !G)
return;
var S = new THREE.Group(), L = new THREE.Group(), cx = B.at[0], cz = B.at[1];
B.items.forEach(function (it) {
try {
if (Array.isArray(it)) {
var x = cx + it[1], z = cz + it[2];
pdPiece(S, it[0], x, z, it[3], it[4], sfHeight(x, z));
return;
}
var x2 = cx + it.x, z2 = cz + it.z, y2 = sfHeight(x2, z2);
if (it.shade)
return pdShade(S, x2, z2, y2);
if (it.lander)
return pdLander(S, x2, z2, y2);
if (it.obelisk)
return pdMarker(S, x2, z2, y2);
if (it.s) {
var sg = new THREE.Group();
sg.position.set(x2, y2, z2);
sg.rotation.y = it.rot || 0;
var post = new THREE.MeshLambertMaterial({ color: 0x8A8E96 });
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), post); p.position.set(s * 1.3, 0.95, 0); sg.add(p); });
var b = wSign(it.s, 2.8, 1.1, "#101820", "#E8E0C8");
b.position.set(0, 1.55, 0.07);
sg.add(b);
S.add(sg);
SF.solids.push({ x: x2, z: z2, hw: 1.4, hd: 0.2 });
SF.sites.push({ x: x2, z: z2, r: 3, name: it.s[0], info: worldFacts(it.f[0], it.f[1], [], it.f[2]) });
return;
}
var g;
if (it.p) {
g = wPerson("pd_" + it.p, it.o);
}
else if (it.b) {
g = build({ id: "pd_" + it.b + x2, archetype: it.b, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
}
if (!g)
return;
g.position.set(x2, y2, z2);
g.rotation.y = it.rot || 0;
L.add(g);
if (it.w)
PD.movers.push({ g: g, w: it.w });
if (it.t)
PD.talk.push({ g: g, name: it.t[0], talk: pdWho(it.t[0], B.name, it.t[1], it.t[2]) });
}
catch (e) {
if (window.console)
console.warn("planet-dress:", k, e);
}
});
G.add(typeof ldPress === "function" ? ldPress(S) : S);
G.add(L);
},
function (k) {
var C = PD_CLOUD[k], G = WORLDS.surface.g;
if (!C || !G)
return;
var S = new THREE.Group(), L = new THREE.Group();
function piece(a, x, z, rot, s) { return pdPiece(S, a, x, z, rot, s || 1, 0); }
[[-40, 8], [-46, 18], [-34, 22]].forEach(function (q, i) { piece("diningtable", q[0], q[1], i * 0.6, 0.8); piece("chair", q[0] + 1.4, q[1], -Math.PI / 2 + i * 0.6, 1); piece("chair", q[0] - 1.4, q[1], Math.PI / 2 + i * 0.6, 1); });
piece("barcounter", -44, 32, 0.6, 1);
piece("coffeemachine", -45.5, 31, 0.6, 1);
piece("vendingmachine", -30, 32, 0.3, 1);
piece("pottedplant", -50, 4, 0, 1.2);
piece("pottedplant", -26, 30, 0, 1.2);
piece("pottedplant", -52, 26, 0, 1.2);
[[0.15, "t"], [-0.35, "t"], [0.6, "b"], [-0.75, "b"], [1.0, "b"]].forEach(function (q) {
var a = q[0], x = Math.cos(a) * 53, z = Math.sin(a) * 53;
if (q[1] === "t") {
var t = new THREE.Group(), m = new THREE.MeshLambertMaterial({ color: 0xD8D8E0 }), d = new THREE.MeshLambertMaterial({ color: 0x3A3E46 });
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.25, 1.2, 8), d);
st.position.y = 0.6;
t.add(st);
var tb = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.4, 10), m);
tb.position.set(0.3, 1.4, 0);
tb.rotation.z = -1.2;
t.add(tb);
t.position.set(x, 0, z);
t.rotation.y = -a;
S.add(t);
SF.solids.push({ x: x, z: z, r: 0.4 });
SF.sites.push({ x: x, z: z, r: 2.2, name: "A telescope at the rail", info: worldFacts(C.facts[0], C.facts[1], [], C.facts[2]) });
}
else
piece("bench", x, z, -a - Math.PI / 2, 1);
});
var mast = new THREE.Group(), mm = new THREE.MeshLambertMaterial({ color: 0x8A8E98 });
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 14, 8), mm);
pole.position.y = 7;
mast.add(pole);
for (var i = 0; i < 3; i++) {
var arm = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.08), mm);
arm.position.y = 10 + i * 1.4;
arm.rotation.y = i * 1.05;
mast.add(arm);
var cup = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshLambertMaterial({ color: 0xE8E8F0 }));
cup.position.set(1.2, 10 + i * 1.4, 0);
cup.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), i * 1.05);
mast.add(cup);
}
mast.position.set(10, 0, -48);
S.add(mast);
SF.solids.push({ x: 10, z: -48, r: 0.4 });
var bal = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 12), new THREE.MeshLambertMaterial({ color: 0xF4F0E8 }));
bal.position.set(10, 22, -48);
bal.userData.pdBob = 22;
L.add(bal);
PD.bob.push(bal);
piece("console", 14, -14, -0.3, 1);
piece("console", 19, -12, -0.6, 1);
piece("console", 9, -15, 0, 1);
piece("crates", 36, -36, 0.4, 1);
piece("barrel", 38, -32, 0, 1);
piece("habitat", -6, 44, 0, 0.8);
piece("shuttle", -30, -34, 0.8, 0.8);
piece("landinglights", -30, -34, 0.8, 0.8);
[[6, 30], [12, 36], [-14, 34], [40, -6], [42, 6]].forEach(function (q) { piece("pottedplant", q[0], q[1], 0, 1.3); });
[[-20, 10], [0, -28], [30, -10], [-36, -10]].forEach(function (q) { piece("lanternpost", q[0], q[1], 0, 1); });
function who(seed, x, z, rot, look, t, w) { var g = wPerson("pd_" + k + seed, { sex: look.sex, look: look }); g.position.set(x, 0, z); g.rotation.y = rot; L.add(g); if (w)
PD.movers.push({ g: g, w: w }); if (t)
PD.talk.push({ g: g, name: t[0], talk: pdWho(t[0], C.name, t[1], t[2]) }); }
var uni = { topKind: "shirt", top: 0x2A3A5A, bottom: 0x2A3A5A, shoes: 0x1A1A1A };
who("chief", 14, -10, Math.PI, Object.assign({ sex: "f", skin: 0xC89870, hair: 0x1A1010, hairStyle: "bun" }, uni), [C.chief[0], "the manager of " + C.chief[1], "Welcome aboard " + C.name + ". We float on the sky itself: there is no ground down there at all, only cloud getting thicker and hotter all the way down."]);
who("met", 18, -9, Math.PI, Object.assign({ sex: "m", skin: 0xE8C8A8, hair: 0x6A3A1A }, uni), ["The station meteorologist", "the meteorologist who watches the weather of the giant planet below", "Storm cell building to the west. Nothing like home: storms here can last for years. I launch a balloon every hour."]);
who("cook", -44, 34, 0.6 + Math.PI, { sex: "m", skin: 0x8A5A3A, hair: 0x1A1010, topKind: "shirt", top: 0xF4F4F4, bottom: 0x2A2A2A, layer: "apron", layerColor: 0xF4F4F4 }, ["The lounge cook", "the cook who runs the lounge on " + C.name, "Soup? It's the best view in the Solar System and the second-best soup. Sit by the window."]);
who("crew1", -20, -40, 0, Object.assign({ sex: "f", skin: 0xE8C8A8, hair: 0xC8A060 }, uni), null, { r: 14, sp: 0.6 });
who("crew2", 30, 30, 2, Object.assign({ sex: "m", skin: 0x6A4A3A, hair: 0x1A1010 }, uni), null, { r: 14, sp: 0.6 });
G.add(typeof ldPress === "function" ? ldPress(S) : S);
G.add(L);
}
];
});
