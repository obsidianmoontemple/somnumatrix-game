/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(365, function () {
return [
function (u, v) {
var au = Math.abs(u);
if (au < 0.05 && v < -0.55 && v > -0.98)
return 3;
var a = Math.atan2(au, v + 0.15), r = Math.hypot(au, v + 0.15);
var lobes = 0.62 + 0.3 * Math.pow(Math.abs(Math.cos(a * 2.5)), 3) + 0.12 * Math.abs(Math.cos(a * 7.5));
if (v < -0.55)
return 0;
if (r < lobes) {
if (au < 0.035 || Math.abs(au - (v + 0.15) * 0.85) < 0.03 && v > -0.15)
return 2;
return 1;
}
return 0;
},
function (i) {
var g = new THREE.Group(), gm = tgvGold(), m;
if (i <= 3) {
m = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 8), gm);
}
else if (i === 4) {
m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.24, 8), new THREE.MeshLambertMaterial({ color: 0xD8B860 }));
}
else if (i === 5 || i === 6) {
m = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshPhongMaterial({ map: tgvLeafTex(), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, color: 0xFFD070, specular: 0xFFFFFF, shininess: 80 }));
}
else if (i === 7) {
m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6).scale(1, 2.6, 1), gm);
}
else if (i === 8) {
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8).scale(1, 1.25, 1), new THREE.MeshPhongMaterial({ color: 0xC8701A, transparent: true, opacity: 0.88, shininess: 100, emissive: 0x3A1800 }));
}
else if (i === 9 || i === 10) {
m = new THREE.Mesh(new THREE.TorusGeometry(i === 9 ? 0.09 : 0.14, 0.018, 6, 18), gm);
}
else {
m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), new THREE.MeshPhongMaterial({ color: 0xFF8A2A, emissive: 0x5A2000, shininess: 110, specular: 0xFFE0B0 }));
}
g.add(m);
var gl = wGlow(0xFFD070, 1.6, 0.42);
g.add(gl);
g.userData.glow = gl;
g.traverse(function (o) { o.raycast = function () { }; });
g.name = "scepter part";
return g;
},
function (s) {
var mine = tgvData();
if (mine.got.indexOf(s.i) >= 0)
return;
mine.got.push(s.i);
if (!mine.first)
mine.first = Date.now();
tgvSave();
var n = mine.got.length, H = TGV.hunt, g = H && H.m[s.i];
if (g) {
tgvHuntLose(g);
delete H.m[s.i];
}
if (typeof playTone === "function")
try {
playTone(520 + n * 24, 0.3);
}
catch (e) { }
try {
if (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn())
cityRpc("thanksgiving_piece", { p_i: s.i }).catch(function () { });
}
catch (e) { }
var P = TGV_PIECES[s.i];
if (n >= TGV_HUNT_N)
setStatus("🌾 <b>" + esc(P[0]) + "!</b> That's all twelve parts of the Thanksgiving Scepter. Take them to the Harvest Keeper by the Great Cornucopia in the Tower Plaza and she'll make it whole.");
else
setStatus("🌾 <b>" + esc(P[0]) + "</b>: " + esc(P[1]) + ". " + n + " of " + TGV_HUNT_N + " parts of the Thanksgiving Scepter. The Harvest Keeper by the Great Cornucopia knows where the others lie.");
},
function () {
var H = tgvHuntSpots(), mine = tgvData(), P = camera.position, left = H.L.filter(function (s) { return mine.got.indexOf(s.i) < 0; }), b = "", fns = {};
left.sort(function (a, c) { return Math.hypot(P.x - a.x, P.z - a.z) - Math.hypot(P.x - c.x, P.z - c.z); });
var rows = [["Parts found", mine.got.length + " of " + TGV_HUNT_N]], notes;
if (mine.scepter) {
rows = [["The Scepter", "Yours, made whole on " + new Date(mine.scepter).toLocaleDateString() + ". It's in your 🎒 Backpack with your weapons: hold it from there."]];
notes = ["There is one Scepter for each dreamer, and you have yours. Happy Thanksgiving."];
}
else {
notes = ["The Thanksgiving Scepter was taken apart and its twelve parts hidden all over Somnucor, from the Civic Ring out to the Harvest Ring. They stay where they are all through the holiday, so you can hunt at your own pace.",
"Each part glints gold when you are within a few dozen metres. Walk up to it and press E. Bring all twelve back to me and I'll make the Scepter whole. It's yours to keep, and there's only ever one for each dreamer."];
if (left.length) {
var s = left[0], d = Math.round(Math.hypot(P.x - s.x, P.z - s.z)), dt = Math.round(Math.hypot(s.x - ATLC.x, s.z - ATLC.z));
rows.push(["The nearest", "<b>" + esc(TGV_PIECES[s.i][0]) + "</b>, in " + tgvRingName(s.r) + ", " + tgvWay(s.x - ATLC.x, s.z - ATLC.z) + " of the Tower (" + dt + " m out). From here it's " + tgvWay(s.x - P.x, s.z - P.z) + ", about " + (d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(1) + " km") + " away."]);
rows.push(["Still to find", left.map(function (q) { return esc(TGV_PIECES[q.i][0]); }).join(", ")]);
}
else {
rows.push(["All twelve", "You have every part. Shall I make the Scepter whole?"]);
b += worldBtn("make", "🌾 Make the Scepter whole", "It goes into your Backpack, yours to keep");
fns.make = function () { tgvMakeScepter(); };
}
}
if (typeof isKeeperNow === "function" && isKeeperNow()) {
b += worldBtn("prev", TGV.prev ? "👁️ Keeper preview: on (turn off)" : "👁️ Keeper preview: off (turn on)", "See the city dressed for Thanksgiving out of season (only you see it)");
fns.prev = function () { TGV.prev = !TGV.prev; TGV.cell = null; tgvKeeperCard(); };
}
worldCard(worldFacts("🌾 The Harvest Keeper", "The Scepter Hunt", rows, notes) + b, fns);
},
function () {
var mine = tgvData();
if (mine.scepter) {
tgvKeeperCard();
return;
}
if (mine.got.length < TGV_HUNT_N) {
tgvKeeperCard();
return;
}
if (TGV.making)
return;
TGV.making = true;
function give(say) {
TGV.making = false;
mine.scepter = Date.now();
tgvSave();
tgvScepterGive();
worldCard(worldFacts("🌾 The Thanksgiving Scepter", "Made whole", [["The Scepter", "Gold staff, plaited wheat grip, a crown of oak and maple leaves round an amber acorn and the harvest moon stone"], ["Where", "In your 🎒 Backpack with your weapons: press Hold to carry it"]], [say || "Twelve parts, one Scepter. There is only ever one for each dreamer, and this one is yours. Happy Thanksgiving."]), {});
tgvHuntDrop();
}
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("thanksgiving_scepter", {}) : Promise.resolve(null);
p.then(function (o) {
if (o && o.ok === false && o.wait) {
TGV.making = false;
setStatus("🌾 " + esc(o.say || "Not quite yet."));
return;
}
give(o && o.say ? o.say : null);
}).catch(function () { give(null); });
},
function () {
var g = new THREE.Group(), gm = tgvGold();
function P(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
P(new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.02, 0.62, 10), gm), 0, 0.06, 0);
P(new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), gm), 0, -0.26, 0);
P(new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.16, 10), new THREE.MeshLambertMaterial({ color: 0xD8B860 })), 0, -0.08, 0);
for (var i = 0; i < 3; i++)
P(new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.006, 5, 12), gm), 0, 0.08 + i * 0.08, 0).rotation.x = Math.PI / 2;
P(new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.008, 6, 18), gm), 0, 0.44, 0);
var lm = new THREE.MeshPhongMaterial({ map: tgvLeafTex(), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, color: 0xFFD070, shininess: 70 }), lg = new THREE.PlaneGeometry(0.1, 0.1);
for (var l = 0; l < 6; l++) {
var a = l / 6 * Math.PI * 2, m = P(new THREE.Mesh(lg, lm), Math.cos(a) * 0.07, 0.47, Math.sin(a) * 0.07);
m.rotation.y = -a + Math.PI / 2;
m.rotation.x = -0.3;
}
P(new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8).scale(1, 1.25, 1), new THREE.MeshPhongMaterial({ color: 0xC8701A, transparent: true, opacity: 0.9, shininess: 100 })), 0, 0.45, 0);
P(new THREE.Mesh(new THREE.SphereGeometry(0.045, 14, 10), new THREE.MeshPhongMaterial({ color: 0xFF8A2A, emissive: 0x6A2800, shininess: 120, specular: 0xFFE0B0 })), 0, 0.53, 0);
try {
if (typeof softGlow === "function") {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: softGlow(), color: 0xFFB050, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
sp.scale.set(0.2, 0.2, 1);
sp.position.set(0, 0.53, 0);
g.add(sp);
}
}
catch (e) { }
return g;
}
];
});
