/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NLT_COLS = 32, NLT_ROWS = 96, NLT_ASPECT = 1.95;
var NLT_PRESETS = {
somnucor: { name: "Somnucor blue and violet", beams: ["#4AE8FF", "#C050FF", "#C8D8FF", "#6AF0C4"], motion: "sweep", drift: false, bright: 2, pic: "none", text: "", wc: ["#9FE8FF", "#C050FF", "#FFFFFF"] },
samhain: { name: "Samhain orange and purple", beams: ["#FF7A1A", "#8A3AFF", "#FF9A30", "#A050FF"], motion: "sweep", drift: true, bright: 2, pic: "pumpkin", text: "BOO", wc: ["#FF8A1E", "#3A9A2A", "#FFD24A"] },
yule: { name: "Yule red, green and gold", beams: ["#FF3030", "#30D060", "#FFF4E0", "#FFD040"], motion: "fan", drift: true, bright: 2, pic: "tree", text: "JOY", wc: ["#2AC050", "#FFD040", "#FF3030"] },
newyear: { name: "New Year gold and white", beams: ["#FFD040", "#FFFFFF", "#FFE8A0", "#C8D8FF"], motion: "cross", drift: true, bright: 3, pic: "star", text: "2027", wc: ["#FFD040", "#FFFFFF", "#FFE8A0"] },
hearts: { name: "Hearts pink and red", beams: ["#FF6AB0", "#FF3050", "#FFB0D0", "#FF5080"], motion: "sweep", drift: true, bright: 2, pic: "heart", text: "LOVE", wc: ["#FF3050", "#FF9AC8", "#FFFFFF"] },
spring: { name: "Spring pastels", beams: ["#A0F0B0", "#FFD0F0", "#C0E0FF", "#FFF0A0"], motion: "still", drift: true, bright: 2, pic: "flower", text: "", wc: ["#FF9AC8", "#FFE060", "#6AD070"] },
carnival: { name: "Carnival rainbow", beams: ["#FF4040", "#FFD040", "#40D0FF", "#C060FF"], motion: "cross", drift: true, bright: 3, pic: "star", text: "FAIR", wc: ["#FFD040", "#FF4040", "#40D0FF"] },
moonlight: { name: "Moonlight white and blue", beams: ["#FFFFFF", "#A8C8FF", "#E0ECFF", "#8AB0FF"], motion: "still", drift: false, bright: 1, pic: "moon", text: "", wc: ["#F4F0D8", "#A8C8FF", "#FFFFFF"] },
dream: { name: "The dreaming eye", beams: ["#6AF0C4", "#C050FF", "#4AE8FF", "#FFFFFF"], motion: "fan", drift: true, bright: 2, pic: "eye", text: "", wc: ["#6AF0C4", "#C050FF", "#FFFFFF"] }
};
var NLT_PIC_NAMES = { none: "No picture (ordinary lit windows)", pumpkin: "Jack-o'-lantern", bat: "Bat", ghost: "Ghost", moon: "Crescent moon", cat: "Black cat on the moon",
tree: "Yule tree", star: "Star", snow: "Snowflake", heart: "Heart", flower: "Flower", eye: "The dreaming eye", paint: "My own painting (paint it below)" };
var NLT_MOTIONS = { sweep: "Slow sweep across the sky", still: "Standing still, straight up", cross: "Slowly crossing each other", fan: "Turning slowly round the Tower" };
function nltDefaultCalendar() {
function L(k, o) { var p = JSON.parse(JSON.stringify(NLT_PRESETS[k])); delete p.name; return Object.assign(p, o || {}); }
return [
Object.assign({ name: "Samhain", when: "samhain", from: "10-24", to: "11-02" }, L("samhain")),
Object.assign({ name: "New Year", when: "dates", from: "12-31", to: "01-01" }, L("newyear")),
Object.assign({ name: "Yule", when: "dates", from: "12-10", to: "01-06" }, L("yule")),
Object.assign({ name: "Hearts Day", when: "dates", from: "02-10", to: "02-14" }, L("hearts")),
Object.assign({ name: "Every other night", when: "always", from: "", to: "" }, L("somnucor"))
];
}
function nltDefaults() { return { off: false, force: "", fest: true, faces: "all", office: true, looks: nltDefaultCalendar() }; }
function nltHex(s, d) { var m = /^#?([0-9a-fA-F]{6})$/.exec(String(s || "")); return m ? parseInt(m[1], 16) : (d === undefined ? 0xFFFFFF : d); }
var NLT_FONT = { A: "01110100011000111111100011000110001", B: "11110100011000111110100011000111110", C: "01110100011000010000100001000101110", D: "11110100011000110001100011000111110",
E: "11111100001000011110100001000011111", F: "11111100001000011110100001000010000", G: "01110100011000010111100011000101111", H: "10001100011000111111100011000110001",
I: "01110001000010000100001000010001110", J: "00111000100001000010000101001001100", K: "10001100101010011000101001001010001", L: "10000100001000010000100001000011111",
M: "10001110111010110101100011000110001", N: "10001100011100110101100111000110001", O: "01110100011000110001100011000101110", P: "11110100011000111110100001000010000",
Q: "01110100011000110001101011001001101", R: "11110100011000111110101001001010001", S: "01111100001000001110000010000111110", T: "11111001000010000100001000010000100",
U: "10001100011000110001100011000101110", V: "10001100011000110001100010101000100", W: "10001100011000110101101011010101010", X: "10001100010101000100010101000110001",
Y: "10001100010101000100001000010000100", Z: "11111000010001000100010001000011111", 0: "01110100011001110101110011000101110", 1: "00100011000010000100001000010001110",
2: "01110100010000100010001000100011111", 3: "11111000100010000010000011000101110", 4: "00010001100101010010111110001000010", 5: "11111100001111000001000011000101110",
6: "00110010001000011110100011000101110", 7: "11111000010001000100010000100001000", 8: "01110100011000101110100011000101110", 9: "01110100011000101111000010001001100",
"!": "00100001000010000100001000000000100", "?": "01110100010000100010001000000000100", "♥": "00000010101111111111011100010000000", "*": "00000001001010101110101010010000000", "-": "00000000000000011111000000000000000" };
function nltText(s) { return String(s || "").toUpperCase().replace(/[^A-Z0-9!?♥*\- ]/g, "").slice(0, 6); }
var NLT_ICON = {
pumpkin: function (u, v) { return __ZC(389, 0, this, arguments, new.target); },
bat: function (u, v) {
var au = Math.abs(u);
if (au < 0.18 && v > -0.35 && v < 0.25)
return 1;
if (au < 0.2 && v >= 0.25 && v < 0.42 && au > 0.05)
return 1;
if (au >= 0.18 && au < 0.98 && v < 0.3 - au * 0.15 && v > -0.35 + (Math.sin(au * 9) * 0.12) + au * 0.25)
return 1;
if (au < 0.12 && v > 0.05 && v < 0.13)
return 3;
return 0;
},
ghost: function (u, v) {
var au = Math.abs(u);
var top = v > 0.2 ? (u * u + (v - 0.2) * (v - 0.2) < 0.6 * 0.6) : true, hem = -0.8 + 0.12 * Math.cos(u * 12);
if (au < 0.6 && top && v > hem) {
if ((Math.abs(au - 0.24) < 0.09 && v > 0.15 && v < 0.42) || (au < 0.12 && v > -0.25 && v < -0.05))
return 0;
return 1;
}
return 0;
},
moon: function (u, v) { var a = u * u + v * v < 0.8 * 0.8, b = (u - 0.35) * (u - 0.35) + (v - 0.15) * (v - 0.15) < 0.62 * 0.62; return a && !b ? 1 : 0; },
cat: function (u, v) { return __ZC(389, 1, this, arguments, new.target); },
tree: function (u, v) { return __ZC(389, 2, this, arguments, new.target); },
star: function (u, v) { var a = Math.atan2(u, v), r = Math.hypot(u, v), k = Math.cos(5 * a) * 0.5 + 0.5, R = 0.42 + 0.53 * Math.pow(k, 3); return r < R ? (r < 0.3 ? 2 : 1) : 0; },
snow: function (u, v) {
var r = Math.hypot(u, v), a = Math.atan2(v, u);
if (r > 0.95)
return 0;
for (var i = 0; i < 6; i++) {
var b = i * Math.PI / 3, x = Math.cos(a - b) * r, y = Math.sin(a - b) * r;
if (x > 0 && Math.abs(y) < 0.07)
return 1;
if (x > 0.45 && x < 0.75 && Math.abs(Math.abs(y) - (x - 0.45)) < 0.06)
return 1;
}
return r < 0.12 ? 2 : 0;
},
heart: function (u, v) { var x = u * 1.15, y = v * 1.15 + 0.15, q = x * x + y * y - 1; return q * q * q - x * x * y * y * y < 0 ? ((u + 0.35) * (u + 0.35) + (v - 0.3) * (v - 0.3) < 0.04 ? 2 : 1) : 0; },
flower: function (u, v) {
var r = Math.hypot(u, v - 0.15), a = Math.atan2(v - 0.15, u);
if (Math.abs(u) < 0.05 && v < -0.25 && v > -0.95)
return 3;
if (v < -0.5 && v > -0.72 && Math.abs(u - 0.18 - (v + 0.5) * -0.5) < 0.12 && u > 0)
return 3;
if (r < 0.2)
return 2;
return r < 0.55 + 0.18 * Math.cos(a * 5) ? 1 : 0;
},
eye: function (u, v) {
var lid = Math.abs(v) < 0.55 * (1 - u * u) && Math.abs(u) < 0.98, r = Math.hypot(u, v);
if (!lid)
return (Math.abs(v) < 0.6 * (1 - u * u) + 0.06 && Math.abs(u) < 1) ? 1 : 0;
if (r < 0.14)
return 0;
if (r < 0.38)
return 2;
return 3;
}
};
function nltGrid(look) { return __ZC(389, 3, this, arguments, new.target); }
function nltPaint(cv, look, office, px) { return __ZC(389, 4, this, arguments, new.target); }
var NLT = { g: null, beams: [], wins: [], tex: null, lookKey: "", look: null, cfg: null, cfgAt: 0, push: {}, spec: null, fade: 0, warned: false, fr: 0 };
function nltCfg() {
var c = (typeof cloudSetting === "function") ? cloudSetting("night_lights") : null;
if (!c || typeof c !== "object")
c = nltDefaults();
if (!Array.isArray(c.looks) || !c.looks.length)
c = Object.assign({}, c, { looks: nltDefaultCalendar() });
return c;
}
function nltPush(key, look) { if (look)
NLT.push[key] = look;
else
delete NLT.push[key]; }
var nightLightsPush = nltPush;
function nltInDates(from, to, d) {
var m = /^(\d\d)-(\d\d)$/, a = m.exec(from || ""), b = m.exec(to || "");
if (!a || !b)
return false;
var n = (d.getMonth() + 1) * 100 + d.getDate(), A = +a[1] * 100 + +a[2], B = +b[1] * 100 + +b[2];
return A <= B ? (n >= A && n <= B) : (n >= A || n <= B);
}
function nltMatch(L, d) {
if (!L)
return false;
if (L.when === "always")
return true;
if (L.when === "samhain")
return typeof shnOn === "function" ? shnOn() : nltInDates(L.from || "10-24", L.to || "11-02", d);
if (L.when === "fest")
return typeof festOn === "function" && typeof FEST !== "undefined" && !!FEST.start && festOn();
if (L.when === "jubilee")
return typeof jbxOn === "function" && jbxOn();
return nltInDates(L.from, L.to, d);
}
function nltPick() {
var c = nltCfg(), looks = c.looks, d = new Date();
if (c.force) {
for (var i = 0; i < looks.length; i++)
if (looks[i].name === c.force)
return looks[i];
if (NLT_PRESETS[c.force])
return NLT_PRESETS[c.force];
}
var pk = Object.keys(NLT.push);
if (pk.length)
return NLT.push[pk[pk.length - 1]];
for (var j = 0; j < looks.length; j++)
if (nltMatch(looks[j], d))
return looks[j];
return looks[looks.length - 1];
}
function nltTowerSpec() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || typeof store === "undefined")
return null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.archetype === "somnucortower" && o.realm === r.id)
return o;
}
return null;
}
function nltSmall() { return (typeof LITE !== "undefined" && LITE) || (typeof LOOK_PHONE !== "undefined" && LOOK_PHONE); }
function nltBuild() {
var T = nltTowerSpec();
if (!T || typeof ATLC === "undefined" || !ATLC)
return false;
var G = new THREE.Group();
G.name = "night lights";
NLT.g = G;
NLT.spec = T;
scene.add(G);
var x = T.x, z = T.z, y = terrainY(x, z) + (T.y || 0), s = T.s || T.scale || 1, ry = T.rot || 0, small = nltSmall();
var geo = new THREE.CylinderGeometry(small ? 7 : 8, 0.5, small ? 260 : 340, small ? 10 : 18, 1, true);
geo.translate(0, small ? 130 : 170, 0);
var lampGeo = new THREE.CylinderGeometry(0.9, 1.2, 1.4, 12), lampMat = new THREE.MeshLambertMaterial({ color: 0x2E3036 });
var lensGeo = new THREE.CircleGeometry(0.85, 16);
function beam(px, py, pz, ph, ring) {
var mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var b = new THREE.Mesh(geo, mat);
b.raycast = function () { };
b.frustumCulled = false;
var piv = new THREE.Group();
piv.position.set(px, py, pz);
piv.add(b);
G.add(piv);
var lens = null;
if (!ring) {
var lp = new THREE.Mesh(lampGeo, lampMat);
lp.position.set(px, py - 0.7, pz);
G.add(lp);
lens = new THREE.Mesh(lensGeo, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
lens.rotation.x = -Math.PI / 2;
lens.position.set(px, py + 0.02, pz);
G.add(lens);
}
NLT.beams.push({ piv: piv, m: mat, lens: lens, ph: ph, i: NLT.beams.length, ring: !!ring, a: Math.atan2(pz - z, px - x) });
}
var n = small ? 4 : 8;
for (var k = 0; k < n; k++) {
var st = (typeof ATL_STAIRS !== "undefined") ? ATL_STAIRS.filter(function (q) { return q.main; }) : null;
var a = st && st.length ? st[(k * (st.length / n)) | 0].a + Math.PI / 16 : k / n * Math.PI * 2, R = 126, bx = ATLC.x + Math.cos(a) * R, bz = ATLC.z + Math.sin(a) * R;
beam(bx, terrainY(bx, bz) + 1.4, bz, k * 1.3, false);
}
if (!small)
for (var c = 0; c < 4; c++) {
var ca = c / 4 * Math.PI * 2 + Math.PI / 4;
beam(x + Math.cos(ca) * 15 * s, y + 165 * s, z + Math.sin(ca) * 15 * s, c * 1.7 + 0.5, true);
}
NLT.pot = document.createElement("canvas");
NLT.pot.width = small ? 128 : 256;
NLT.pot.height = small ? 1024 : 2048;
NLT.tex = new THREE.CanvasTexture(NLT.pot);
NLT.tex.magFilter = THREE.LinearFilter;
NLT.tex.minFilter = THREE.LinearMipMapLinearFilter;
var wm = new THREE.MeshBasicMaterial({ map: NLT.tex, transparent: true, opacity: 0, fog: false, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
var pg = new THREE.PlaneGeometry(24 * s, 140 * s);
[[0, 1], [Math.PI, 1], [Math.PI / 2, 0], [-Math.PI / 2, 0]].forEach(function (f, i) {
var m = new THREE.Mesh(pg, wm);
m.raycast = function () { };
var lx = Math.sin(f[0]) * 15.62 * s, lz = Math.cos(f[0]) * 15.62 * s, cr = Math.cos(ry), sr = Math.sin(ry);
m.position.set(x + lx * cr + lz * sr, y + 80 * s, z - lx * sr + lz * cr);
m.rotation.y = ry + f[0];
m.renderOrder = 3;
G.add(m);
NLT.wins.push({ m: m, front: i === 0, back: i === 1 });
});
NLT.winMat = wm;
return true;
}
function nltApplyLook(L, c) {
var key = JSON.stringify([L, c.faces, c.office]);
if (key === NLT.lookKey)
return;
NLT.lookKey = key;
NLT.look = L;
var pic = L && L.pic && L.pic !== "none";
if (pic) {
var cv = nltPaint(document.createElement("canvas"), L, c.office !== false, nltSmall() ? 4 : 8), px = NLT.pot.getContext("2d");
px.imageSmoothingEnabled = true;
px.drawImage(cv, 0, 0, NLT.pot.width, NLT.pot.height);
NLT.tex.needsUpdate = true;
}
NLT.wins.forEach(function (w) { w.show = pic && (c.faces === "front" ? w.front : c.faces === "frontback" ? (w.front || w.back) : true); });
}
function nltCol(L, i, t) {
var cs = ((L && L.beams) || []).map(function (h) { return nltHex(h, 0xFFFFFF); });
if (!cs.length)
cs = [0xFFFFFF];
if (!L.drift)
return cs[i % cs.length];
var f = t / 20 + i * 0.5, a = cs[Math.floor(f) % cs.length], b = cs[(Math.floor(f) + 1) % cs.length], k = f - Math.floor(f);
k = k * k * (3 - 2 * k);
return (typeof blend === "function") ? blend(a, b, k) : a;
}
function nltTick(dt) {
NLT.fr++;
var rt = performance.now() / 1000, rdt = Math.min(0.5, NLT.rt ? rt - NLT.rt : 0);
NLT.rt = rt;
var where = (typeof inSomnucorNow === "function") && inSomnucorNow() && !(typeof WLD !== "undefined" && WLD.on);
var c = nltCfg();
var now = Date.now();
if (where && now - NLT.cfgAt > 180000 && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl && typeof cloudHeaders === "function") {
NLT.cfgAt = now;
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/app_config?select=value&key=eq.night_lights", { headers: cloudHeaders() })
.then(function (r) { return r.ok ? r.json() : null; })
.then(function (rows) { if (rows && rows[0] && typeof DW_CLOUD !== "undefined" && DW_CLOUD.config)
DW_CLOUD.config.night_lights = rows[0].value; }).catch(function () { });
}
var dark = (typeof festNight === "function") ? festNight() : (function () { var h = dreamHour(); return h > 19 || h < 6; })();
var want = where && dark && !c.off;
if (!NLT.g) {
if (!want)
return;
if (!nltBuild())
return;
}
NLT.fade = Math.max(0, Math.min(1, NLT.fade + (want ? rdt : -rdt) / 4));
NLT.g.visible = NLT.fade > 0.001;
if (!NLT.g.visible)
return;
var L = nltPick();
nltApplyLook(L, c);
var t = performance.now() / 1000, br = [0.05, 0.08, 0.11][Math.max(0, Math.min(2, (L.bright | 0) - 1))] * NLT.fade;
for (var i = 0; i < NLT.beams.length; i++) {
var B = NLT.beams[i], col = nltCol(L, i, t);
B.m.color.setHex(col);
B.m.opacity = br;
if (B.lens)
B.lens.material.color.setHex(col);
var p = B.piv, ph = B.ph, out = B.ring ? 0.35 : 0.12;
if (L.motion === "still") {
p.rotation.set(0, 0, 0);
p.rotation.order = "YXZ";
p.rotation.y = -B.a + Math.PI / 2;
p.rotation.x = out;
}
else if (L.motion === "cross") {
p.rotation.order = "YXZ";
p.rotation.y = -B.a + Math.PI / 2 + (i % 2 ? 1 : -1) * Math.sin(t * 0.18 + ph) * 0.9;
p.rotation.x = out + 0.25 + Math.sin(t * 0.11 + ph) * 0.12;
}
else if (L.motion === "fan") {
p.rotation.order = "YXZ";
p.rotation.y = t * 0.12 + B.i * 0.4;
p.rotation.x = out + 0.3;
}
else {
p.rotation.order = "XYZ";
p.rotation.y = 0;
p.rotation.z = Math.sin(t * 0.25 + ph) * 0.45;
p.rotation.x = Math.cos(t * 0.19 + ph) * 0.35;
}
}
NLT.winMat.opacity = 0.96 * NLT.fade;
NLT.wins.forEach(function (w) { w.m.visible = !!w.show; });
if (c.fest !== false && typeof FEST !== "undefined" && FEST.search && NLT.fr % 6 === 0)
FEST.search.forEach(function (s, k) { if (s.beam && s.beam.material)
s.beam.material.color.setHex(nltCol(L, k, t)); });
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
nltTick(dt || 0.016);
}
catch (e) {
if (window.console && !NLT.warned) {
NLT.warned = true;
console.warn("night-lights:", e);
}
} };
})();
