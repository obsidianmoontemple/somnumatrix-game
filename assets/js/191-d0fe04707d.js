/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SP_OUTDOOR = /stall|market|street|gate ?keep|gatekeeper|\bguard\b|sentry|doorman|bouncer|dock|quay|ferry|harbour|lamp|sweep|garden|groundskeep|stable|groom|herd|shepherd|farm|field|orchard|fisher|forest|lumber|quarr|\bmine\b|miner|pit\b|kennel|menagerie|park|valet|crossing|traffic|road crew|courier|carrier|post rider|driver/i;
function tempIndoors(t) {
if (!t || !t.post || t.mode !== "desk")
return false;
var w = String(t.post.title || "") + " " + String(t.post.workplace || "");
if (SP_OUTDOOR.test(w))
return false;
return true;
}
(function () {
if (typeof interiorTick !== "function")
return;
var it = interiorTick;
interiorTick = function (dt) {
it.apply(this, arguments);
try {
if (typeof INT === "undefined" || !INT || !INT.tw)
return;
Object.keys(INT.tw).forEach(function (id) {
var g = INT.tw[id], W = g.userData.twPatrol;
if (!W)
return;
var lm = g.userData.limbs;
W.ph += dt;
if (!W.to) {
W.wait -= dt;
if (lm) {
var sw = Math.sin(W.ph * 3.2) * 0.45;
lm.la.rotation.x = -0.9 + sw;
lm.ra.rotation.x = -0.7 + sw;
lm.ll.rotation.x = 0;
lm.rl.rotation.x = 0;
}
if (W.wait <= 0) {
var a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 2.5;
W.to = { x: W.home.x + Math.cos(a) * r, z: W.home.z + Math.sin(a) * r };
}
return;
}
var dx = W.to.x - g.position.x, dz = W.to.z - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.15) {
W.to = null;
W.wait = 3 + Math.random() * 4;
return;
}
var sp = Math.min(d, 0.9 * dt);
g.position.x += dx / d * sp;
g.position.z += dz / d * sp;
var want = Math.atan2(dx, dz), dr = ((want - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += dr * Math.min(1, dt * 5);
if (lm) {
var s = Math.sin(W.ph * 7) * 0.5;
lm.ll.rotation.x = s;
lm.rl.rotation.x = -s;
lm.la.rotation.x = -s * 0.6;
lm.ra.rotation.x = s * 0.6;
}
});
}
catch (e) { }
};
})();
var SP_SHOP = null;
var SP_TRADES = [
[/apothecar|herbal|alchem|potion|chemist|physic garden|remed/i, "jars"],
[/tailor|seamstress|draper|cloth|weaver|dressmak|haberdash|textile|wool|silk|mercer/i, "cloth"],
[/cobbler|shoe|boot|leather|saddler/i, "shoes"],
[/book|bind|scribe|stationer|print|paper|press|map ?shop|cartograph/i, "books"],
[/candle|chandler|wax/i, "candles"],
[/wine|vint|spirit|brew|cellar|cider|distill/i, "bottles"],
[/jewel|goldsmith|silversmith|gem|watchmak|clockmak/i, "gems"],
[/toy|game|puzzle/i, "toys"],
[/pot|ceramic|china|glass/i, "pots"],
[/hardware|ironmonger|tool|smith|cutler|lock/i, "tools"],
[/hat|milliner/i, "hats"],
[/tea|spice|coffee|sweet|confection|chocolat/i, "tins"],
[/flower|florist|seed|nursery/i, "flowers"]
];
var SP_GROCER = /grocer|market|general|provision|store|pantry|food|baker|dairy|butcher|fishmonger|mall|supermarket|corner/i;
function spTradeOf(spec) {
if (!spec)
return null;
var w = String(spec.workplace || "") + " " + String(spec.label || spec.name || "");
for (var i = 0; i < SP_TRADES.length; i++)
if (SP_TRADES[i][0].test(w))
return SP_TRADES[i][1];
if (SP_GROCER.test(w))
return null;
return "mixed";
}
var SP_MAT = {};
function spM(c, k) {
var key = c + "|" + (k || "");
if (SP_MAT[key])
return SP_MAT[key];
var m = k === "glass" ? new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.72, shininess: 80 }) : k === "shine" ? new THREE.MeshPhongMaterial({ color: c, shininess: 90 }) : new THREE.MeshLambertMaterial({ color: c });
return (SP_MAT[key] = m);
}
function spShelf(kind) { return __ZC(191, 0, this, arguments, new.target); }
(function () {
if (typeof FURN !== "object" || !FURN || !FURN.shelfgoods)
return;
var sg = FURN.shelfgoods;
FURN.shelfgoods = function () {
var kind = SP_SHOP ? spTradeOf(SP_SHOP) : null;
if (!kind)
return sg.apply(this, arguments);
var g = new THREE.Group();
g.add(spShelf(kind));
return g;
};
})();
var SP_SURFMAT = {};
function spSurfKind(c, role) { return __ZC(191, 1, this, arguments, new.target); }
function spSurfMat(mat, kind) { return __ZC(191, 2, this, arguments, new.target); }
function spFinish(I) { return __ZC(191, 3, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var was = SP_SHOP;
SP_SHOP = spec;
var I;
try {
I = mi.apply(this, arguments);
}
finally {
SP_SHOP = was;
}
try {
spFinish(I);
}
catch (e) {
if (window.console)
console.warn("[surfaces]", e);
}
return I;
};
})();
function spPanelWalls(I, opt) { return __ZC(191, 4, this, arguments, new.target); }
function spAcademyDress(I) { return __ZC(191, 5, this, arguments, new.target); }
function spAcademyTick() {
var G = INT && INT.spAcGlow;
if (!G)
return;
var a = G.P.geometry.attributes.position;
for (var i = 0; i < G.cand.count; i++) {
G.cand.getMatrixAt(i, G.m);
G.v.setFromMatrixPosition(G.m);
a.setXYZ(i, G.v.x, G.v.y + 0.3, G.v.z);
}
a.needsUpdate = true;
}
(function () {
if (typeof makeAcademyInterior === "function") {
var ma = makeAcademyInterior;
makeAcademyInterior = function (spec) { var I = ma.apply(this, arguments); try {
spAcademyDress(I);
}
catch (e) {
if (window.console)
console.warn("[academy dress]", e);
} return I; };
}
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) { it.apply(this, arguments); try {
if (typeof INT !== "undefined" && INT && INT.spAcGlow)
spAcademyTick();
}
catch (e) { } };
}
})();
function spChandelier(root, x, z, y, H) { return __ZC(191, 6, this, arguments, new.target); }
function spDesk(C, w, d, x, z) { return __ZC(191, 7, this, arguments, new.target); }
(function () {
if (typeof acRoomDress !== "function")
return;
var ard = acRoomDress;
acRoomDress = function (C, r, A, F) {
var ob = C.block;
C.block = function (w, h, d, mat, x, y, z) { if (Math.abs(h - 0.75) < 0.01 && (Math.abs(w - 0.8) < 0.01 || Math.abs(w - 1.6) < 0.01))
return spDesk(C, w, d, x, z); return ob.apply(this, arguments); };
try {
ard.apply(this, arguments);
}
finally {
C.block = ob;
}
try {
var west = r.x1 <= -22 && !r.down, east = r.x0 >= 22 && !r.up, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, H = r.up || r.down ? AC_H * 0.6 : AC_H;
var col = new THREE.Color(r.col || 0x8A6A3A), dk = col.clone().multiplyScalar(0.45).getHex();
if (F.rug)
F.rug(cx, cz, Math.max(4, (r.x1 - r.x0) - 8), Math.max(4, (r.z1 - r.z0) - 7), dk);
if (west || east) {
var wx = west ? r.x0 + 0.3 : r.x1 - 0.3, ry = west ? Math.PI / 2 : -Math.PI / 2;
[-6, 6].forEach(function (o) {
var gl = new THREE.Mesh(new THREE.PlaneGeometry(2, 4.6), new THREE.MeshBasicMaterial({ color: col.clone().lerp(new THREE.Color(0xFFFFFF), 0.35), transparent: true, opacity: 0.85 }));
gl.position.set(wx + (west ? 0.02 : -0.02), 5, cz + o);
gl.rotation.y = ry;
gl.raycast = function () { };
C.root.add(gl);
var fr = new THREE.Mesh(new THREE.TorusGeometry(1, 0.1, 6, 16, Math.PI), tlm(0x6E675C));
fr.position.set(wx + (west ? 0.04 : -0.04), 7.3, cz + o);
fr.rotation.y = ry;
C.root.add(fr);
[-1, 1].forEach(function (s) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.6, 0.2), tlm(0x6E675C)); m.position.set(wx, 5, cz + o + s * 1.05); C.root.add(m); });
var mull = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.6, 0.06), tlm(0x2A2A2E));
mull.position.set(wx + (west ? 0.05 : -0.05), 5, cz + o);
C.root.add(mull);
});
[r.z0 + 0.35, r.z1 - 0.35].forEach(function (z, k) {
var b = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3.6), tlm(r.col || 0x8A2A2A, "ds"));
b.position.set(cx + (west ? 2 : -2), H - 3.4, z);
b.rotation.y = k ? Math.PI : 0;
C.root.add(b);
if (typeof FURN === "object" && FURN.bookshelf) {
var bs = FURN.bookshelf();
bs.position.set(cx + (west ? 6 : -6), 0, z + (k ? -0.4 : 0.4));
bs.rotation.y = k ? Math.PI : 0;
C.root.add(bs);
C.solid(cx + (west ? 6 : -6), z + (k ? -0.4 : 0.4), 1, 0.4, 2);
}
});
}
spChandelier(C.root, cx, cz, H - 2.8, H);
}
catch (e) {
if (window.console)
console.warn("[classroom dress]", e);
}
};
})();
(function () {
if (typeof FURN !== "object" || !FURN || !FURN.oven)
return;
FURN.oven = function () {
var g = new THREE.Group(), brick = new THREE.MeshLambertMaterial({ color: 0xB8735A, map: (typeof texOf === "function") ? texOf("brick") : null }), dark = spM(0x2A1A14), iron = spM(0x2A2A2E), wood = spM(0x6A4428);
function P(geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
var b = P(new THREE.BoxGeometry(2, 1.0, 1.6), brick, 0, 0.5, 0);
if (typeof metreUVs === "function")
metreUVs(b.geometry, "box", [2, 1, 1.6]);
var dome = P(new THREE.SphereGeometry(0.95, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), brick, 0, 1.0, 0);
dome.scale.set(1.02, 0.62, 0.82);
P(new THREE.BoxGeometry(2.08, 0.1, 1.68), spM(0x8A5A44), 0, 1.02, 0);
var mouth = new THREE.Shape();
mouth.moveTo(-0.38, 0);
mouth.lineTo(0.38, 0);
mouth.lineTo(0.38, 0.3);
mouth.absarc(0, 0.3, 0.38, 0, Math.PI, false);
mouth.lineTo(-0.38, 0);
P(new THREE.ShapeGeometry(mouth), dark, 0, 0.95, 0.805);
P(new THREE.ShapeGeometry(mouth), new THREE.MeshBasicMaterial({ color: 0xFF8A3A, transparent: true, opacity: 0.55 }), 0, 0.98, 0.79).scale.set(0.8, 0.6, 1);
P(new THREE.BoxGeometry(0.9, 0.08, 0.3), spM(0x8A5A44), 0, 0.9, 0.95);
var ch = P(new THREE.BoxGeometry(0.42, 1.3, 0.42), brick, 0.55, 1.85, -0.45);
if (typeof metreUVs === "function")
metreUVs(ch.geometry, "box", [0.42, 1.3, 0.42]);
P(new THREE.BoxGeometry(0.5, 0.08, 0.5), spM(0x8A5A44), 0.55, 2.52, -0.45);
P(new THREE.CylinderGeometry(0.025, 0.025, 1.6, 6), wood, -1.1, 0.8, 0.7, 0, 0, 0.25);
P(new THREE.BoxGeometry(0.3, 0.02, 0.36), wood, -1.3, 0.04, 0.72, 0, 0, 0.25);
P(new THREE.BoxGeometry(0.5, 0.3, 0.3), iron, 0.8, 0.15, 0.95);
for (var i = 0; i < 5; i++)
P(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), wood, 0.62 + i * 0.08, 0.06 + (i % 2) * 0.1, 0.95, 0, 0, Math.PI / 2);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
};
})();
