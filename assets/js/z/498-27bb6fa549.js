/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(498, function () {
return [
function () {
if (HGR.mats)
return HGR.mats;
var st = typeof hwdMat === "function" ? hwdMat(0x5E574B, "stone") : new THREE.MeshLambertMaterial({ color: 0x5E574B });
var pave = st.clone();
if (pave.map) {
pave.map = pave.map.clone();
pave.map.wrapS = pave.map.wrapT = THREE.RepeatWrapping;
pave.map.needsUpdate = true;
}
pave.polygonOffset = true;
pave.polygonOffsetFactor = -2;
pave.polygonOffsetUnits = -2;
var brass = typeof hwdMat === "function" ? hwdMat(0xC9A04A, "metal", { shine: 70 }) : new THREE.MeshPhongMaterial({ color: 0xC9A04A, shininess: 70 });
var inlay = brass.clone();
inlay.polygonOffset = true;
inlay.polygonOffsetFactor = -4;
inlay.polygonOffsetUnits = -4;
HGR.mats = { pave: pave, inlay: inlay, stone: typeof hwdMat === "function" ? hwdMat(0x6A6458, "stone") : st };
return HGR.mats;
},
function (g, r0, r1, a0, y, mat) {
var geo = new THREE.RingGeometry(r0, r1, Math.max(24, Math.round(r1 * 0.9)), 1, -a0 - Math.PI, Math.PI);
var p = geo.attributes.position, uv = geo.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, p.getX(i) / 3, p.getY(i) / 3);
geo.rotateX(-Math.PI / 2);
var m = new THREE.Mesh(geo, mat);
m.position.y = y;
m.receiveShadow = true;
g.add(m);
return m;
},
function (g, h, a, r, y, name, sub) {
var s = new THREE.Group(), M = hgrMats();
if (typeof hwdBox === "function") {
hwdBox(s, 3.4, 0.9, 0.5, 0, 0.45, 0, M.stone);
hwdBox(s, 3.6, 0.12, 0.62, 0, 0.95, 0, M.inlay);
}
if (typeof hwdPlate === "function")
hwdPlate(s, name, 1.55, 0.0, "#1A1612", "#F0DCA0", sub, 3.2);
s.position.set(h.x + Math.cos(a) * r, y, h.z + Math.sin(a) * r);
s.rotation.y = -a - Math.PI / 2;
g.add(s);
return s;
},
function (h, nd, nw) {
var g = new THREE.Group();
g.name = "hall-galleries";
var M = hgrMats(), y = 0;
try {
y = (typeof terrainY === "function" ? terrainY(h.x, h.z) : 0) + 0.03;
}
catch (e) { }
function ring(k, side) {
var r = HALL_R0 + k * HALL_GAP, a0 = side ? Math.PI : 0;
var f = new THREE.Group();
f.position.set(h.x, 0, h.z);
g.add(f);
hgrHalfRing(f, r - 2.6, r + 2.6, a0, y, M.pave);
hgrHalfRing(f, r - 2.75, r - 2.6, a0, y + 0.01, M.inlay);
hgrHalfRing(f, r + 2.6, r + 2.75, a0, y + 0.01, M.inlay);
var roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][k] || String(k + 1);
hgrStone(g, h, a0 + Math.PI / 2, r - 4.2, y, side ? "The Gallery of Worlds" : "The Dreamers' Gallery", (side ? "new worlds, each with its own place" : "a door for every dreamer") + " · ring " + roman);
}
for (var k = 0; k < nd; k++)
ring(k, 0);
for (var j = 0; j < nw; j++)
ring(j, 1);
if (typeof shadowsFor === "function")
try {
shadowsFor(g, false);
}
catch (e) { }
g.traverse(function (o) { o.castShadow = false; });
return g;
},
function () {
var h = (typeof walkMode !== "undefined" && walkMode && !store.inside && !(typeof WLD !== "undefined" && WLD.on) && typeof hallHere === "function") ? hallHere() : null;
if (!h) {
if (HGR.g)
HGR.g.visible = false;
return;
}
var c = hgrCounts(), key = c[0] + "/" + c[1] + "@" + Math.round(h.x) + "," + Math.round(h.z);
if (key !== HGR.key) {
if (HGR.g) {
scene.remove(HGR.g);
HGR.g.traverse(function (o) { if (o.geometry && o.geometry.type === "RingGeometry")
o.geometry.dispose(); });
}
HGR.g = hgrBuild(h, c[0], c[1]);
scene.add(HGR.g);
HGR.key = key;
}
HGR.g.visible = true;
}
];
});
