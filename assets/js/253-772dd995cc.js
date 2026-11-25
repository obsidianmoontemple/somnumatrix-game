/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RMAP = { list: null, of: null, group: null, near: null, open: false, pick: null, base: null, tex: 0, mats: null, geos: null, at: 0 };
var RMAP_ABOUT = {
plaza: "The crown of the city: Somnucor Tower, the Needle and the Hall of Doors gate.",
civic: "Courts, treasury, archive, hospital, post, the Licensing Office and the Dragon Roost.",
estates: "The High Ring: the great estates of the Crescent and Backers Street.",
temples: "Temple Row: a house for every power, of every tradition, churches and all.",
markets: "Bazaars, guild shops, inns, the night market and the transport yard.",
commons: "Homes, schools, workshops, the Old Quarter and the menagerie.",
warrens: "The poorest streets, the Gaol and its yard.",
harvest: "Quarry, gem pits, timber, fields, the Spaceport and the docks.",
wilds: "Beyond the Outer Moat: the Nightmare Wilds, where what we dreamt in the dark lives."
};
var RMAP_RINGS = 8;
function rmapCityReady() {
return typeof ATLC !== "undefined" && ATLC && typeof atlGroup !== "undefined" && atlGroup && typeof ATL_RINGS !== "undefined" &&
!(typeof ATL_JOB !== "undefined" && ATL_JOB) &&
typeof somnucorRealm === "function" && !!somnucorRealm();
}
function rmapRingAt(x, z) {
if (typeof ATLC === "undefined" || !ATLC)
return null;
var r = Math.hypot(x - ATLC.x, z - ATLC.z), R = ATL_RINGS;
for (var i = 0; i < R.length; i++)
if (r >= R[i].S - 10 && r <= R[i].E + 10)
return i;
return null;
}
function rmapPad() {
try {
if (typeof HP !== "undefined" && HP.pads && HP.pads.city && typeof hpWorldPos === "function")
return hpWorldPos(HP.pads.city);
}
catch (e) { }
return null;
}
function rmapFree(x, z, cityId) {
var dx = x - ATLC.x, dz = z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
if (typeof atlNearStair === "function" && atlNearStair(r, a))
return false;
if (typeof blockedAt === "function") {
var feet = (typeof terrainY === "function") ? terrainY(x, z) : 0;
for (var k = 0; k < 5; k++) {
var ox = k === 1 ? 1 : k === 2 ? -1 : 0, oz = k === 3 ? 1 : k === 4 ? -1 : 0;
try {
if (blockedAt(x + ox * 1.2, z + oz * 1.2, feet))
return false;
}
catch (e) { }
}
}
var hp = rmapPad();
if (hp && Math.hypot(hp.x - x, hp.z - z) < HP_PAD_R + 8)
return false;
var O = store.objects;
for (var i = 0; i < O.length; i++) {
var o = O[i];
if (o.realm !== cityId)
continue;
if (Math.abs(o.x - x) < 3.5 && Math.abs(o.z - z) < 3.5)
return false;
}
if (typeof terrainY === "function") {
var y0 = terrainY(x, z);
if (Math.abs(terrainY(x + 2, z) - y0) > 0.3 || Math.abs(terrainY(x, z + 2) - y0) > 0.3 || Math.abs(terrainY(x - 2, z) - y0) > 0.3 || Math.abs(terrainY(x, z - 2) - y0) > 0.3)
return false;
}
return true;
}
function rmapPlace() {
var city = somnucorRealm(), out = [];
var mains = ATL_STAIRS.filter(function (s) { return s.main; });
for (var ri = 0; ri < RMAP_RINGS && ri < ATL_RINGS.length; ri++) {
var ring = ATL_RINGS[ri], streets = (typeof ATL_STREETS !== "undefined" && ATL_STREETS[ring.k]) || null;
var radii = [];
if (streets && streets.length) {
var rs = streets[0];
radii = [rs + 9.3, rs - 9.3, rs + 8.6, rs - 8.6];
}
else
radii = [ring.E - 24, ring.E - 30, ring.E - 36];
mains.forEach(function (s, si) {
var done = null;
for (var q = 0; q < radii.length && !done; q++) {
var rad = radii[q];
[13, 17, 22, 28, 36, 46].some(function (lat) {
return [1, -1].some(function (sd) {
var a = s.a + sd * lat / rad, x = ATLC.x + Math.cos(a) * rad, z = ATLC.z + Math.sin(a) * rad;
if (!rmapFree(x, z, city.id))
return false;
done = { x: x, z: z, a: a, rad: rad, ring: ri, stair: si };
return true;
});
});
}
if (done)
out.push(done);
});
}
return out;
}
var RMAP_INK = "#2A2418", RMAP_PAPER = "#EFE6CC";
function rmapHex(c, k) {
var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255;
k = k || 0;
r = Math.round(r + (255 - r) * k);
g = Math.round(g + (255 - g) * k);
b = Math.round(b + (255 - b) * k);
return "rgb(" + r + "," + g + "," + b + ")";
}
function rmapDrawCity(g, ox, oy, S, opt) {
opt = opt || {};
var R = ATL_RINGS, outer = R[R.length - 1].S + 120, sc = (S / 2 - 8) / outer, cx = ox + S / 2, cy = oy + S / 2;
g.save();
g.fillStyle = "#3A3040";
g.beginPath();
g.arc(cx, cy, outer * sc, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#5C8FB8";
g.beginPath();
g.arc(cx, cy, R[R.length - 1].S * sc, 0, Math.PI * 2);
g.fill();
for (var i = R.length - 2; i >= 0; i--) {
g.fillStyle = rmapHex(R[i].col, 0.12);
g.beginPath();
g.arc(cx, cy, R[i].E * sc, 0, Math.PI * 2);
g.fill();
if (i > 0) {
g.fillStyle = "#5C8FB8";
g.beginPath();
g.arc(cx, cy, R[i].S * sc, 0, Math.PI * 2);
g.fill();
}
}
if (opt.hi !== undefined && opt.hi !== null && R[opt.hi]) {
var H = R[opt.hi];
g.strokeStyle = "rgba(255,236,170,0.95)";
g.lineWidth = Math.max(2, S / 260);
g.beginPath();
g.arc(cx, cy, H.E * sc, 0, Math.PI * 2);
g.stroke();
if (H.S > 0) {
g.beginPath();
g.arc(cx, cy, H.S * sc, 0, Math.PI * 2);
g.stroke();
}
}
ATL_STAIRS.forEach(function (s) {
g.strokeStyle = s.main ? "rgba(250,244,226,0.95)" : "rgba(250,244,226,0.6)";
g.lineWidth = s.main ? Math.max(2, S / 190) : Math.max(1, S / 420);
g.beginPath();
g.moveTo(cx + Math.cos(s.a) * R[0].E * 0.6 * sc, cy + Math.sin(s.a) * R[0].E * 0.6 * sc);
g.lineTo(cx + Math.cos(s.a) * R[R.length - 2].E * sc, cy + Math.sin(s.a) * R[R.length - 2].E * sc);
g.stroke();
});
g.fillStyle = "#D9B45A";
g.beginPath();
g.arc(cx, cy, Math.max(3, S / 80), 0, Math.PI * 2);
g.fill();
g.strokeStyle = RMAP_INK;
g.lineWidth = 1;
g.stroke();
var fs = Math.max(9, Math.round(S / 36));
g.font = "bold " + fs + "px Georgia, serif";
g.textAlign = "center";
g.textBaseline = "middle";
for (var j = 1; j < R.length; j++) {
var mid = (R[j].S + R[j].E) / 2 * sc, ang = -Math.PI / 2 - 0.2;
var tx = cx + Math.cos(ang) * mid, ty = cy + Math.sin(ang) * mid;
g.lineWidth = 3;
g.strokeStyle = "rgba(20,16,10,0.75)";
g.strokeText(String(j), tx, ty);
g.fillStyle = j === R.length - 1 ? "#E8D8F8" : "#FFFDF4";
g.fillText(String(j), tx, ty);
}
var nx = ox + S - fs * 1.4, ny = oy + fs * 1.6;
g.fillStyle = RMAP_INK;
g.beginPath();
g.moveTo(nx, ny - fs * 1.1);
g.lineTo(nx - fs * 0.5, ny + fs * 0.3);
g.lineTo(nx + fs * 0.5, ny + fs * 0.3);
g.closePath();
g.fill();
g.font = "bold " + fs + "px Georgia, serif";
g.fillText("N", nx, ny + fs * 1.0);
g.restore();
return { cx: cx, cy: cy, sc: sc };
}
function rmapDot(g, M, x, z, col, r, label, fs) {
var px = M.cx + (x - ATLC.x) * M.sc, py = M.cy + (z - ATLC.z) * M.sc;
g.fillStyle = "#FFFFFF";
g.beginPath();
g.arc(px, py, r + 3, 0, Math.PI * 2);
g.fill();
g.fillStyle = col;
g.beginPath();
g.arc(px, py, r, 0, Math.PI * 2);
g.fill();
if (label) {
g.font = "bold " + fs + "px Georgia, serif";
g.textAlign = px > M.cx ? "right" : "left";
g.textBaseline = "middle";
var lx = px + (px > M.cx ? -(r + 6) : (r + 6));
g.lineWidth = 4;
g.strokeStyle = "rgba(255,255,255,0.95)";
g.strokeText(label, lx, py);
g.fillStyle = col;
g.fillText(label, lx, py);
}
}
function rmapPaint(K) {
var W = 1024, Hh = 640, cv = document.createElement("canvas");
cv.width = W;
cv.height = Hh;
var g = cv.getContext("2d");
g.fillStyle = RMAP_PAPER;
g.fillRect(0, 0, W, Hh);
g.strokeStyle = "#8A6A3A";
g.lineWidth = 10;
g.strokeRect(5, 5, W - 10, Hh - 10);
g.strokeStyle = "#C8A868";
g.lineWidth = 2;
g.strokeRect(16, 16, W - 32, Hh - 32);
var M = rmapDrawCity(g, 24, 24, Hh - 48, { hi: K.ring });
rmapDot(g, M, K.x, K.z, "#C8202A", 9, "You are here", 24);
var x0 = Hh + 4, y = 48;
g.textAlign = "left";
g.textBaseline = "alphabetic";
g.fillStyle = RMAP_INK;
g.font = "bold 30px Georgia, serif";
g.fillText("Somnucor", x0, y);
y += 24;
g.font = "italic 17px Georgia, serif";
g.fillStyle = "#6A5A3A";
g.fillText("You are on " + ATL_RINGS[K.ring].name, x0, y);
y += 20;
g.fillText("Press E for every place, ring by ring", x0, y);
y += 18;
ATL_RINGS.forEach(function (R, i) {
y += 14;
var here = i === K.ring;
if (here) {
g.fillStyle = "rgba(200,32,42,0.12)";
g.fillRect(x0 - 8, y - 4, W - x0 - 24, 54);
}
g.fillStyle = rmapHex(R.col, 0.1);
g.fillRect(x0 - 2, y + 2, 14, 14);
g.strokeStyle = RMAP_INK;
g.lineWidth = 1;
g.strokeRect(x0 - 2, y + 2, 14, 14);
g.fillStyle = here ? "#A0141C" : RMAP_INK;
g.font = "bold 19px Georgia, serif";
g.fillText((i ? i + "  " : "") + R.name, x0 + 20, y + 16);
g.font = "14px Georgia, serif";
g.fillStyle = "#4A3E28";
rmapWrap(g, RMAP_ABOUT[R.k] || "", x0 + 20, y + 34, W - x0 - 50, 15, 2);
y += 40;
});
var t = new THREE.CanvasTexture(cv);
if (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy)
t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
return t;
}
function rmapWrap(g, txt, x, y, w, lh, max) {
var words = txt.split(" "), line = "", n = 0;
for (var i = 0; i < words.length; i++) {
var tl = line ? line + " " + words[i] : words[i];
if (g.measureText(tl).width > w && line) {
if (++n >= max) {
g.fillText(line + "…", x, y);
return;
}
g.fillText(line, x, y);
y += lh;
line = words[i];
}
else
line = tl;
}
if (line)
g.fillText(line, x, y);
}
function rmapKit() {
if (RMAP.mats)
return;
RMAP.mats = {
stone: new THREE.MeshLambertMaterial({ color: 0xBFB6A2 }),
bronze: new THREE.MeshLambertMaterial({ color: 0x8A6A3A, emissive: 0x1A1206 }),
frame: new THREE.MeshLambertMaterial({ color: 0x4A3420 }),
blank: new THREE.MeshBasicMaterial({ color: 0xE6DCC0 }),
lamp: new THREE.MeshBasicMaterial({ color: 0xFFE6B0 })
};
RMAP.geos = {
plinth: new THREE.BoxGeometry(1.7, 0.3, 1.0),
step: new THREE.BoxGeometry(2.0, 0.12, 1.3),
post: new THREE.CylinderGeometry(0.07, 0.09, 1.15, 10),
frame: new THREE.BoxGeometry(1.72, 0.06, 1.1),
board: new THREE.PlaneGeometry(1.6, 1.0),
cap: new THREE.BoxGeometry(1.84, 0.05, 0.18),
finial: new THREE.SphereGeometry(0.07, 10, 8)
};
}
function rmapBuild(K) {
rmapKit();
var G = RMAP.geos, M = RMAP.mats, g = new THREE.Group(), y = (typeof terrainY === "function") ? terrainY(K.x, K.z) : 0;
g.position.set(K.x, y, K.z);
var streets = ATL_STREETS[ATL_RINGS[K.ring].k], rs = streets && streets.length ? streets[0] : null;
var inward = rs === null ? true : (K.rad > rs);
var dx = Math.cos(K.a) * (inward ? -1 : 1), dz = Math.sin(K.a) * (inward ? -1 : 1);
g.rotation.y = Math.atan2(dx, dz);
function put(geo, mat, x, yy, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x, yy, z); g.add(m); return m; }
put(G.step, M.stone, 0, 0.06, 0);
put(G.plinth, M.stone, 0, 0.27, 0);
put(G.post, M.bronze, -0.72, 0.98, -0.25);
put(G.post, M.bronze, 0.72, 0.98, -0.25);
put(G.finial, M.bronze, -0.72, 1.6, -0.25);
put(G.finial, M.bronze, 0.72, 1.6, -0.25);
var tilt = new THREE.Group();
tilt.position.set(0, 1.32, -0.05);
tilt.rotation.x = -0.62;
g.add(tilt);
var fr = new THREE.Mesh(G.frame, M.frame);
fr.rotation.x = Math.PI / 2;
fr.position.z = -0.035;
tilt.add(fr);
var bd = new THREE.Mesh(G.board, M.blank);
bd.position.z = 0.001;
tilt.add(bd);
var cap = new THREE.Mesh(G.cap, M.bronze);
cap.position.set(0, 0.56, 0);
tilt.add(cap);
g.userData.rmapBoard = bd;
g.userData.rmap = K;
g.name = "rmap-kiosk";
return g;
}
var RMAP_SKIP = { signboard: 1, deity: 1, altarseasonal: 1, imbolccandles: 1, incenseburner: 1, car: 1, broomstick: 1, lamp: 1, streetlamp: 1, bench: 1 };
function rmapOf() {
if (RMAP.of && RMAP.of.n === store.objects.length && performance.now() - RMAP.of.at < 30000)
return RMAP.of;
var city = somnucorRealm(), rings = ATL_RINGS.map(function (R, i) { return { i: i, R: R, work: {}, land: {}, area: {}, temples: {}, n: 0 }; });
var wpNames = {};
(typeof WORKPLACES !== "undefined" ? WORKPLACES : []).forEach(function (w) { wpNames[w.key] = 1; });
var ringNames = {};
ATL_RINGS.forEach(function (R) { ringNames[R.name] = 1; });
store.objects.forEach(function (o) {
if (!city || o.realm !== city.id || o.filler)
return;
var nm = o.name || o.label;
if (!nm || typeof nm !== "string")
return;
var ri = rmapRingAt(o.x, o.z);
if (ri === null)
return;
var B = rings[ri], it = { name: nm, x: o.x, z: o.z, id: o.id };
if (o.templerow && o.deity && !RMAP_SKIP[o.archetype] && typeof DEITY !== "undefined" && DEITY[o.deity] && /'s house$/.test(nm)) {
var tr = DEITY[o.deity].trad || "Other";
(B.temples[tr] || (B.temples[tr] = {}))[nm] = it;
return;
}
if (o.workplace) {
B.work[nm] = it;
return;
}
if (/\s\d+$/.test(nm) || ringNames[nm])
return;
if (o.archetype === "signboard") {
if (wpNames[nm] || o.workplace)
return;
if (/^The |Street|Quarter|Market|Row|Yard|Lane|Square|Garden|Court|Souk|Bazaar|Docks?|Pits?|Fields?|Stand/.test(nm))
B.area[nm] = it;
return;
}
if (RMAP_SKIP[o.archetype])
return;
var d = typeof KIT !== "undefined" && KIT[o.archetype];
if (d && d.size && Math.max(d.size[0], d.size[2]) * ((o.attrs && o.attrs.s) || 1) >= 5)
B.land[nm] = it;
});
rings.forEach(function (B) {
Object.keys(B.work).forEach(function (k) { delete B.land[k]; delete B.area[k]; });
Object.keys(B.land).forEach(function (k) { delete B.area[k]; });
});
RMAP.of = { at: performance.now(), n: store.objects.length, rings: rings };
return RMAP.of;
}
function rmapCss() {
if (document.getElementById("rmap-css"))
return;
var s = document.createElement("style");
s.id = "rmap-css";
s.textContent =
"#rmap-prompt{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;" +
"background:rgba(10,12,18,.92);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:9px 14px;font:13px var(--sans,sans-serif);color:var(--bone,#EEE);cursor:pointer}" +
"#rmap{position:fixed;inset:max(12px,env(safe-area-inset-top,0px)) 12px 12px 12px;z-index:60;display:none;background:rgba(12,13,18,.97);" +
"border:1px solid var(--gold,#C9A868);border-radius:6px;color:var(--bone,#EEE);font:14px var(--sans,sans-serif);overflow:hidden}" +
"#rmap .rm-in{display:flex;gap:14px;height:100%;padding:14px;box-sizing:border-box}" +
"#rmap .rm-map{flex:0 0 auto;display:flex;flex-direction:column;gap:6px}" +
"#rmap canvas{width:min(62vh,52vw);height:min(62vh,52vw);border-radius:4px;background:#EFE6CC}" +
"#rmap .rm-list{flex:1 1 auto;overflow:auto;padding-right:6px}" +
"#rmap h2{font:20px Georgia,serif;margin:0 0 4px;color:#F2E6C8}" +
"#rmap .rm-sub{color:var(--dim,#9A9AA6);font-size:13px}" +
"#rmap details{border-top:1px solid #2A2C34;padding:6px 0}" +
"#rmap summary{cursor:pointer;font:16px Georgia,serif;color:#F2E6C8;list-style:none}" +
"#rmap summary::-webkit-details-marker{display:none}" +
"#rmap summary .sw{display:inline-block;width:12px;height:12px;border:1px solid #000;margin-right:8px;vertical-align:-1px}" +
"#rmap summary .hr{color:#FF9A9A;font-size:12px;margin-left:8px}" +
"#rmap .rm-h{color:var(--gold,#C9A868);font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin:8px 0 3px}" +
"#rmap .rm-p{display:inline-block;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #33363F;border-radius:3px;cursor:pointer;font-size:13px;background:#171920;color:#E8E4DA}" +
"#rmap .rm-p.on{border-color:#E8C878;background:#3A2E14}" +
"#rmap .rm-x{position:absolute;right:10px;top:8px;background:#15161a;border:1px solid #666;z-index:2;color:#DDD;border-radius:3px;padding:4px 10px;cursor:pointer}" +
"#rmap .rm-where{min-height:18px;color:#F2E6C8;font-size:13px}" +
"@media (max-width:700px),(max-height:500px){#rmap .rm-in{flex-direction:column;overflow:auto}#rmap canvas{width:min(86vw,46vh);height:min(86vw,46vh)}#rmap .rm-list{overflow:visible}#rmap .rm-in{padding-top:34px}}";
document.head.appendChild(s);
}
function rmapPrompt() {
var p = document.getElementById("rmap-prompt");
if (!p) {
rmapCss();
p = document.createElement("div");
p.id = "rmap-prompt";
p.innerHTML = "<b>Map of Somnucor</b> · press <b>E</b> or tap";
p.addEventListener("click", function () { if (RMAP.near)
rmapOpen(RMAP.near); });
document.body.appendChild(p);
}
return p;
}
function rmapTrad(t) { return t; }
function rmapOpen(K) { return __ZC(253, 0, this, arguments, new.target); }
function rmapPanelPaint() { return __ZC(253, 1, this, arguments, new.target); }
function rmapClose() {
var el = document.getElementById("rmap");
if (el)
el.style.display = "none";
RMAP.open = false;
RMAP.pick = null;
}
function rmapTick() {
if (!RMAP.list) {
if (performance.now() - RMAP.at < 1500 || !rmapCityReady())
return;
RMAP.at = performance.now();
RMAP.list = rmapPlace();
RMAP.of = null;
var G = new THREE.Group();
G.name = "rmap-kiosks";
RMAP.list.forEach(function (K) { K.g = rmapBuild(K); K.g.visible = false; G.add(K.g); });
scene.add(G);
RMAP.group = G;
RMAP.city = atlGroup;
}
if (!RMAP.hp) {
var hp = rmapPad();
if (hp) {
RMAP.hp = 1;
if (RMAP.list.some(function (K) { return Math.hypot(hp.x - K.x, hp.z - K.z) < HP_PAD_R + 8; })) {
rmapDrop();
RMAP.at = 0;
return;
}
}
}
if (RMAP.city !== atlGroup || !rmapCityReady() && !(typeof atlGroup !== "undefined" && atlGroup)) {
rmapDrop();
return;
}
var cityShown = !!(atlGroup && atlGroup.visible && atlGroup.parent) && !store.inside && (store.here || 0) === ((somnucorRealm() || {}).id);
RMAP.group.visible = cityShown;
var P = camera.position, near = null, nd = 1e9;
RMAP.list.forEach(function (K) {
var d = Math.hypot(K.x - P.x, K.z - P.z);
K.g.visible = cityShown && d < 170;
var bd = K.g.userData.rmapBoard;
if (cityShown && d < 80 && !K.tex) {
K.tex = rmapPaint(K);
bd.material = new THREE.MeshBasicMaterial({ map: K.tex });
RMAP.tex++;
}
else if (K.tex && (d > 140 || !cityShown)) {
bd.material.dispose();
K.tex.dispose();
K.tex = null;
bd.material = RMAP.mats.blank;
RMAP.tex--;
}
if (cityShown && walkMode && d < 2.8 && d < nd) {
nd = d;
near = K;
}
});
RMAP.near = near;
var pr = rmapPrompt(), show = !!near && !RMAP.open && !(typeof nearChar !== "undefined" && nearChar);
if ((pr.style.display === "block") !== show)
pr.style.display = show ? "block" : "none";
if (RMAP.open) {
var o = RMAP.openAt;
if (!walkMode || Math.hypot(o.x - P.x, o.z - P.z) > 6 || store.inside)
rmapClose();
}
}
function rmapDrop() {
if (RMAP.group && RMAP.group.parent)
RMAP.group.parent.remove(RMAP.group);
(RMAP.list || []).forEach(function (K) { if (K.tex) {
K.g.userData.rmapBoard.material.dispose();
K.tex.dispose();
K.tex = null;
} });
RMAP.list = null;
RMAP.group = null;
RMAP.near = null;
RMAP.tex = 0;
RMAP.at = performance.now();
var pr = document.getElementById("rmap-prompt");
if (pr)
pr.style.display = "none";
if (RMAP.open)
rmapClose();
}
(function () {
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || !RMAP.near || RMAP.open || !walkMode)
return;
if (document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName))
return;
if (typeof nearChar !== "undefined" && nearChar)
return;
e.preventDefault();
e.stopImmediatePropagation();
rmapOpen(RMAP.near);
}, true);
if (typeof backRegister === "function")
backRegister({ order: 20, open: function () { return RMAP.open; }, close: rmapClose });
if (typeof backOneStep === "function") {
var bo = backOneStep;
backOneStep = function () { if (RMAP.open) {
rmapClose();
return true;
} return bo.apply(this, arguments); };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (RMAP.list && RMAP.group && RMAP.group.visible && !store.inside) {
for (var i = 0; i < RMAP.list.length; i++) {
var K = RMAP.list[i];
if (!K.g.visible)
continue;
if (Math.abs(x - K.x) < 1.05 && Math.abs(z - K.z) < 1.05)
return true;
}
}
return ba.apply(this, arguments);
};
}
(function loop() {
try {
if (typeof scene !== "undefined" && scene && typeof camera !== "undefined" && camera)
rmapTick();
}
catch (e) {
if (window.console && !RMAP.warned) {
RMAP.warned = 1;
console.warn("ring maps:", e);
}
}
requestAnimationFrame(loop);
})();
})();
