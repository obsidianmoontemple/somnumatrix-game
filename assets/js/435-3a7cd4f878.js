/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TLV = { d: null, at: 0, busy: false, bySlot: {}, seedAt: 0, seeding: false, ring: {}, hist: null, hAt: 0, hBusy: false, open: false, tab: "news", q: "", say: "",
frames: [], texs: {}, photoAt: 0, photos: 0, fun: null, funAt: 0, stones: null, stonesN: -1, heard: {} };
var TLV_ORIG = { name: typeof cfkName === "function" ? cfkName : null, age: typeof cfkAge === "function" ? cfkAge : null, persona: typeof cfkPersona === "function" ? cfkPersona : null };
function tlvSigned() { return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function"; }
function tlvInCity() { return typeof cfkInCity === "function" && cfkInCity(); }
function tlvYears(t) { var D = TLV.d, yd = (D && +D.year_days) || 7; return Math.max(0, (Date.now() - new Date(t).getTime()) / (yd * 86400000)); }
function tlvAgo(t) {
var y = tlvYears(t);
if (y < 0.08)
return "just lately";
if (y < 0.6)
return "a few months ago";
if (y < 1.5)
return "about a year ago";
if (y < 12)
return Math.round(y) + " years ago";
return "many years ago";
}
function tlvDay(t) { try {
var d = new Date(t);
return d.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
}
catch (e) {
return "";
} }
function tlvRingName(k) { var r = typeof atlRing === "function" ? atlRing(k) : null; return r ? r.name : (k ? "the " + k : "the city"); }
function tlvRingAt(spec) {
try {
if (!spec || typeof ATLC === "undefined" || !ATLC)
return "";
var d = Math.hypot(spec.x - ATLC.x, spec.z - ATLC.z);
for (var i = 0; i < ATL_RINGS.length; i++)
if (d >= ATL_RINGS[i].S - 12 && d <= ATL_RINGS[i].E + 12)
return ATL_RINGS[i].k;
}
catch (e) { }
return "";
}
function tlvLoad(force) {
if (TLV.busy || !tlvSigned() || (!force && Date.now() - TLV.at < 10 * 60000))
return Promise.resolve(TLV.d);
TLV.busy = true;
TLV.at = Date.now();
return cityRpc("town_lives", {}).then(function (o) {
if (o && o.ok) {
TLV.d = o;
var m = {};
(o.people || []).forEach(function (p) { if (p.k && p.st !== "gone" && p.st !== "left")
m[p.k] = p; });
TLV.bySlot = m;
TLV.stonesN = -1;
if (typeof CFK !== "undefined")
CFK.n = -1;
}
return TLV.d;
}).catch(function () { return TLV.d; }).then(function (d) { TLV.busy = false; if (TLV.open)
tlvPaint(); return d; });
}
function tlvSeed() {
if (TLV.seeding || !TLV.d || !tlvSigned() || !tlvInCity() || Date.now() - TLV.seedAt < 5 * 60000)
return;
var all = (store.characters || []).filter(function (c) { return c.primary === false && c.src && c.src.role === "belongs"; });
if (all.length < 5)
return;
TLV.seedAt = Date.now();
var dyed = typeof CFK_DYED !== "undefined" ? CFK_DYED : {}, out = [];
all.forEach(function (c) {
var k = cfkKey(c);
if (TLV.bySlot[k])
return;
var s = null;
try {
s = specById(c.objId);
}
catch (e) { }
var age = TLV_ORIG.age ? TLV_ORIG.age(c) : 30, home = c.home ? specById(c.home) : null, work = c.work ? specById(c.work) : null;
out.push({ k: k, n: TLV_ORIG.name ? TLV_ORIG.name(c) : "", sx: cfkSex(c), age: age, kid: age < 13, dyed: !!(s && s.look && dyed[s.look.hair]),
ring: tlvRingAt(home || work || { x: c.x, z: c.z }), job: /^(patient|guest)$/.test(cfkJob(c.role)) ? "" : cfkJob(c.role), work: cfkPlace(c.work), home: cfkPlace(c.home) });
});
if (!out.length)
return;
TLV.seeding = true;
cityRpc("town_seed", { p_slots: out.slice(0, 600) }).then(function (o) { if (o && o.ok && o.added)
return tlvLoad(true); })
.catch(function () { }).then(function () { TLV.seeding = false; });
}
function tlvWho(c) { try {
return c && TLV.bySlot[cfkKey(c)] || null;
}
catch (e) {
return null;
} }
if (TLV_ORIG.name)
cfkName = function (c) { var p = tlvWho(c); return p ? p.n : TLV_ORIG.name.apply(this, arguments); };
if (TLV_ORIG.age)
cfkAge = function (c) { var p = tlvWho(c); return p ? Math.max(0, +p.age || 0) : TLV_ORIG.age.apply(this, arguments); };
function tlvStory(p) { return __ZC(435, 0, this, arguments, new.target); }
if (TLV_ORIG.persona)
cfkPersona = function (c) {
var s = TLV_ORIG.persona.apply(this, arguments), p = tlvWho(c);
if (p)
try {
s += " " + tlvStory(p);
}
catch (e) { }
return s;
};
"use strict";
var TLV_TABS = [["museum", "🏛️ Museum"], ["news", "📜 Town news"], ["people", "👪 Townsfolk"], ["remembered", "🕯️ Remembered"]];
var TLV_KIND = { born: "👶", grown: "🎓", school: "🏫", married: "💍", moved: "🚚", job: "🧰", retired: "🪑", passed: "🕯️", arrived: "🧳", left: "🧭" };
function tlvHistLoad(force) {
if (TLV.hBusy || !tlvSigned() || (!force && Date.now() - TLV.hAt < 5 * 60000))
return Promise.resolve(TLV.hist);
TLV.hBusy = true;
TLV.hAt = Date.now();
return cityRpc("history_all", {}).then(function (o) { if (o && o.ok) {
TLV.hist = o;
tlvFramesPaint();
} return TLV.hist; })
.catch(function () { return TLV.hist; }).then(function (h) { TLV.hBusy = false; if (TLV.open)
tlvPaint(); return h; });
}
function tlvPhotoUrl(p) { if (!p)
return ""; return DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/storage/v1/object/public/museum/" + String(p).split("/").map(encodeURIComponent).join("/"); }
function tlvOpen(tab) {
TLV.open = true;
TLV.say = "";
if (tab)
TLV.tab = tab;
tlvPaint();
tlvLoad(true);
tlvHistLoad(true);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
}
function tlvClose() { TLV.open = false; tlvPaint(); }
function tlvBtn(act, label, attrs, on) { return '<button class="btn" data-tlv="' + act + '"' + (attrs || "") + ' style="margin:3px 4px 3px 0;' + (on ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + label + '</button>'; }
function tlvDim(s) { return '<div style="color:#9AA3B5;margin:4px 0">' + s + '</div>'; }
function tlvMuseumHtml() { return __ZC(435, 1, this, arguments, new.target); }
function tlvNewsHtml() { return __ZC(435, 2, this, arguments, new.target); }
function tlvPeopleHtml() { return __ZC(435, 3, this, arguments, new.target); }
function tlvRememberedHtml() { return __ZC(435, 4, this, arguments, new.target); }
function tlvHtml() { return __ZC(435, 5, this, arguments, new.target); }
function tlvPaint() { return __ZC(435, 6, this, arguments, new.target); }
function tlvClick(e) { return __ZC(435, 7, this, arguments, new.target); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return TLV.open; }, close: tlvClose });
"use strict";
var TLV_FW = 384, TLV_FH = 288, TLV_FRAMES = 16;
function tlvFrameTex(i) { return __ZC(435, 8, this, arguments, new.target); }
function tlvFramePaint(i) { return __ZC(435, 9, this, arguments, new.target); }
function tlvFramesPaint() { Object.keys(TLV.texs).forEach(function (i) { tlvFramePaint(+i); }); }
var TLV_FRAME_M = null;
FURN.tlvframe = function () { return __ZC(435, 10, this, arguments, new.target); };
(function () {
if (typeof TR === "undefined" || !TR["The City Museum"])
return;
var orig = TR["The City Museum"];
TR["The City Museum"] = function (K) {
orig(K);
TLV.frameN = 0;
TLV.frames = [];
try {
K.rowLeft("tlvframe", K.B + 2.4, K.Fz - 4.2, 2.6, 0.06);
K.rowRight("tlvframe", K.B + 2.4, K.Fz - 4.2, 2.6, 0.06);
}
catch (e) {
if (window.console)
console.warn("[museum]", e);
}
tlvHistLoad(false);
};
})();
function tlvInMuseum() { try {
return typeof INT !== "undefined" && INT && INT.spec && placeName(INT.spec) === "The City Museum";
}
catch (e) {
return false;
} }
function tlvFramesLetGo() {
var live = TLV.frames.some(function (g) { var p = g; while (p.parent)
p = p.parent; return p === scene; });
if (live) {
Object.keys(TLV.texs).forEach(function (i) { TLV.texs[i].used = Date.now(); });
return;
}
Object.keys(TLV.texs).forEach(function (i) { var T = TLV.texs[i]; if (Date.now() - T.used > 60000) {
try {
T.tex.dispose();
}
catch (e) { }
T.img = null;
delete TLV.texs[i];
} });
if (!Object.keys(TLV.texs).length)
TLV.frames = [];
}
function tlvPlaceSpec(name) {
if (!name)
return null;
try {
var sp = byName(name);
if (sp && meshes[sp.id])
return sp;
if (/everbloom|wedding|chapel|rose room|garden/i.test(name)) {
sp = byName("The Everbloom Wedding House");
if (sp && meshes[sp.id])
return sp;
}
}
catch (e) { }
return null;
}
function tlvPhotoTick() {
if (!TLV.hist || !tlvSigned() || !tlvInCity() || TLV.photos >= 4 || Date.now() - TLV.photoAt < 90000)
return;
if (typeof INT !== "undefined" && INT)
return;
if (typeof renderer === "undefined" || !renderer || !scene || renderer.xr && renderer.xr.isPresenting)
return;
var want = null, sp = null;
(TLV.hist.rows || []).some(function (r) { if (r.photo || !r.place || TLV.heard["ph" + r.id])
return false; var s = tlvPlaceSpec(r.place); if (!s)
return false; want = r; sp = s; return true; });
if (!want)
return;
TLV.photoAt = Date.now();
TLV.heard["ph" + want.id] = 1;
try {
var W = 480, H = 320, box = new THREE.Box3().setFromObject(meshes[sp.id]), sz = new THREE.Vector3();
box.getSize(sz);
var hgt = Math.min(60, Math.max(4, sz.y)), wid = Math.min(80, Math.max(6, sz.x, sz.z)), gy = typeof terrainY === "function" ? terrainY(sp.x, sp.z) : 0;
var D = typeof doorWorld === "function" ? doorWorld(sp) : null, ox = D && D.out ? D.out.x : 0, oz = D && D.out ? D.out.z : 1, R = Math.max(wid, hgt) * 1.15 + 6;
var bx = D ? D.x : sp.x, bz = D ? D.z : sp.z;
var cam = new THREE.PerspectiveCamera(55, W / H, 0.5, 3000);
cam.position.set(bx + ox * R, gy + Math.max(2.2, hgt * 0.3), bz + oz * R);
cam.lookAt(sp.x, gy + hgt * 0.4, sp.z);
var rt = new THREE.WebGLRenderTarget(W, H), was = renderer.getRenderTarget(), px = new Uint8Array(W * H * 4);
renderer.setRenderTarget(rt);
renderer.render(scene, cam);
renderer.readRenderTargetPixels(rt, 0, 0, W, H, px);
renderer.setRenderTarget(was);
rt.dispose();
var cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var cx2 = cv.getContext("2d"), img = cx2.createImageData(W, H);
for (var y = 0; y < H; y++)
img.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
var lit = 0;
for (var p = 0; p < px.length; p += 4 * 97)
lit += px[p] + px[p + 1] + px[p + 2];
if (lit / (px.length / (4 * 97)) < 30)
return;
cx2.putImageData(img, 0, 0);
cv.toBlob(function (b) { if (!b)
return; tlvPhotoSend(want, b); }, "image/jpeg", 0.8);
}
catch (e) {
if (window.console)
console.warn("[museum photo]", e);
}
}
function tlvPhotoSend(r, blob) { return __ZC(435, 11, this, arguments, new.target); }
"use strict";
var TLV_TUNES = [
{ k: "grace", n: "Amazing Grace", by: "New Britain, an American folk hymn (1829)", bpm: 84,
m: "G3:1 C4:2 E4:.5 C4:.5 E4:2 D4:1 C4:2 A3:1 G3:2 G3:1 C4:2 E4:.5 C4:.5 E4:2 D4:1 G4:3 R:1 E4:1 G4:1.5 E4:.5 G4:.5 E4:.5 C4:2 G3:1 A3:1.5 C4:.5 C4:.5 A3:.5 G3:2 G3:1 C4:2 E4:.5 C4:.5 E4:2 D4:1 C4:3" },
{ k: "home", n: "Going Home", by: "from Dvořák's New World Symphony (1893)", bpm: 56,
m: "E4:1 G4:.5 G4:1.5 E4:1 D4:.5 C4:1.5 D4:.5 E4:.5 G4:.5 E4:.5 D4:2 R:.5 E4:1 G4:.5 G4:1.5 E4:1 D4:.5 C4:1.5 D4:.5 E4:.5 D4:.5 C4:.5 C4:2" },
{ k: "taps", n: "Taps", by: "the bugle call for the end of the day (1862)", bpm: 52,
m: "G3:.75 G3:.25 C4:3 G3:.75 C4:.25 E4:3 G3:.5 C4:.5 E4:1 G3:.5 C4:.5 E4:1 G3:.5 C4:.5 E4:3 C4:.75 E4:.25 G4:2 E4:1 C4:2 G3:1 G3:.75 G3:.25 C4:4" },
{ k: "auld", n: "Auld Lang Syne", by: "a Scottish air (1788)", bpm: 76,
m: "G3:1 C4:1.5 C4:.5 C4:1 E4:1 D4:1.5 C4:.5 D4:1 E4:.5 D4:.5 C4:1.5 C4:.5 E4:1 G4:1 A4:3 A4:1 G4:1.5 E4:.5 E4:1 C4:1 D4:1.5 C4:.5 D4:1 E4:.5 D4:.5 C4:1.5 A3:.5 A3:1 G3:1 C4:3" },
{ k: "green", n: "Greensleeves", by: "an English air (1580)", bpm: 96,
m: "A3:1 C4:2 D4:1 E4:1.5 F4:.5 E4:1 D4:2 B3:1 G3:1.5 A3:.5 B3:1 C4:2 A3:1 A3:1.5 G#3:.5 A3:1 B3:2 G#3:1 E3:2 A3:1 C4:2 D4:1 E4:1.5 F4:.5 E4:1 D4:2 B3:1 G3:1.5 A3:.5 B3:1 C4:1.5 B3:.5 A3:1 G#3:1.5 F#3:.5 G#3:1 A3:3" },
{ k: "joy", n: "Hymn to Joy", by: "Beethoven's Ninth Symphony (1824)", bpm: 84,
m: "E4:1 E4:1 F4:1 G4:1 G4:1 F4:1 E4:1 D4:1 C4:1 C4:1 D4:1 E4:1 E4:1.5 D4:.5 D4:2 E4:1 E4:1 F4:1 G4:1 G4:1 F4:1 E4:1 D4:1 C4:1 C4:1 D4:1 E4:1 D4:1.5 C4:.5 C4:2" },
{ k: "lullaby", n: "Brahms' Lullaby", by: "Wiegenlied, Brahms (1868)", bpm: 80,
m: "E4:.5 E4:.5 G4:2 E4:.5 E4:.5 G4:2 E4:.5 G4:.5 C5:1 B4:1.5 A4:.5 A4:1 G4:1 D4:.5 E4:.5 F4:1 D4:1 D4:.5 E4:.5 F4:2 D4:.5 F4:.5 B4:.5 A4:.5 G4:1 B4:1 C5:2" }
];
function tlvNoteHz(s) {
var m = /^([A-G])(#|b)?(-?\d)$/.exec(s);
if (!m)
return 0;
var n = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (+m[3] + 1) * 12;
return 440 * Math.pow(2, (n - 69) / 12);
}
function tlvOrgan(f, at, dur) { return __ZC(435, 12, this, arguments, new.target); }
function tlvTunePlay(k) { return __ZC(435, 13, this, arguments, new.target); }
function tlvTunesHtml() {
return '<div style="margin-top:6px"><b>🎵 Play a hymn</b>' + tlvDim("Old tunes, played on the organ (you hear them on your own device).") +
TLV_TUNES.map(function (t) { return tlvBtn("tune", t.n, ' data-k="' + t.k + '" title="' + esc(t.by) + '"'); }).join("") + '</div>';
}
function tlvStones() {
var n = (store.objects || []).length;
if (TLV.stones && TLV.stonesN === n)
return TLV.stones;
TLV.stonesN = n;
TLV.stones = null;
var sign = (store.objects || []).filter(function (o) { return o.sign === "The Cemetery"; })[0];
if (!sign)
return null;
var st = (store.objects || []).filter(function (o) { return o.archetype === "gravestone" && Math.hypot(o.x - sign.x, o.z - sign.z) < 90; });
var vault = (store.objects || []).filter(function (o) { return o.name === "The Cemetery Vault"; })[0] || null;
if (!st.length)
return null;
var cx = 0, cz = 0;
st.forEach(function (o) { cx += o.x; cz += o.z; });
cx /= st.length;
cz /= st.length;
TLV.stones = { list: st, vault: vault, x: cx, z: cz };
return TLV.stones;
}
function tlvGraveAt(i) { var G = (TLV.d && TLV.d.graves) || []; return G.filter(function (g) { return g.g === i + 1; })[0] || null; }
function tlvStoneCard(i) { return __ZC(435, 14, this, arguments, new.target); }
function tlvVaultCard() { return __ZC(435, 15, this, arguments, new.target); }
function tlvFunNow() {
var F = (TLV.d && TLV.d.funerals) || [], now = Date.now();
return F.filter(function (f) { var t = new Date(f.at).getTime(); return now >= t - 10 * 60000 && now <= t + 45 * 60000; })[0] || null;
}
function tlvEulogy(f) { return __ZC(435, 16, this, arguments, new.target); }
function tlvFuneralRow(f) { return __ZC(435, 17, this, arguments, new.target); }
function tlvFuneralCard(f) { return __ZC(435, 18, this, arguments, new.target); }
function tlvFlower(id) { return __ZC(435, 19, this, arguments, new.target); }
var TLV_BLACK = [{ sex: "m", layer: "suit", layerColor: 0x121216, top: 0xF2F2F0, bottom: 0x121216 }, { sex: "f", layer: "jacket", layerColor: 0x141418, top: 0x1E1E22, bottom: 0x141418, hat: "brimmed", hatColor: 0x141418 },
{ sex: "m", layer: "jacket", layerColor: 0x1E1E24, top: 0x2A2A30, bottom: 0x18181C }, { sex: "f", layer: "jacket", layerColor: 0x1E1E26, top: 0x2A2A30, bottom: 0x1E1E26 },
{ sex: "m", layer: "suit", layerColor: 0x1A1C22, top: 0xEDEDEA, bottom: 0x1A1C22 }, { sex: "f", layer: "jacket", layerColor: 0x18181C, top: 0x2A2A30, bottom: 0x18181C },
{ sex: "m", layer: "suit", layerColor: 0x101012, top: 0xFFFFFF, bottom: 0x101012 }, { sex: "f", layer: "suit", layerColor: 0x16161A, top: 0xEDEDEA, bottom: 0x16161A }];
function tlvFunMax() { return (typeof LITE !== "undefined" && LITE) ? 4 : 8; }
function tlvFunBuild(f, S) { return __ZC(435, 20, this, arguments, new.target); }
function tlvFunFlower() {
var F = TLV.fun;
if (!F)
return;
var n = TLV.flowers || 1;
var m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshStandardMaterial({ color: 0xC8283A, roughness: 0.6 }));
m.userData.scpMine = true;
m.position.set(0.5 - ((n * 0.23) % 1), 0.06, 0.4);
F.g.add(m);
}
function tlvFunPeople(f) { return __ZC(435, 21, this, arguments, new.target); }
function tlvFunDrop() {
var F = TLV.fun;
if (!F)
return;
TLV.fun = null;
try {
if (typeof scpDrop === "function")
scpDrop(F.g);
else if (F.g.parent)
F.g.parent.remove(F.g);
}
catch (e) { }
try {
F.g.traverse(function (m) { if (m.userData && m.userData.scpMine && m.material)
m.material.dispose(); });
}
catch (e) { }
}
function tlvFunTick() {
var f = tlvFunNow(), S = f && tlvInCity() ? tlvStones() : null, P = camera.position;
var near = S && Math.hypot(P.x - S.x, P.z - S.z) < 180 && !(typeof INT !== "undefined" && INT);
if (!f || !near) {
if (TLV.fun)
tlvFunDrop();
return;
}
if (TLV.fun && TLV.fun.id !== f.id)
tlvFunDrop();
if (!TLV.fun)
tlvFunBuild(f, S);
tlvFunPeople(f);
}
"use strict";
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && tlvSigned()) {
if (tlvInMuseum()) {
tsPrompt("<b>The City Museum</b> · <b>press E</b> (or tap here) to see every exhibit, the town's news and its people", function () { tlvOpen("museum"); });
return;
}
if (tlvInCity() && !(typeof INT !== "undefined" && INT) && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
var S = tlvStones(), P = camera.position;
if (S && Math.hypot(P.x - S.x, P.z - S.z) < 70) {
var f = tlvFunNow();
if (f && TLV.fun && Math.hypot(P.x - TLV.fun.g.position.x, P.z - TLV.fun.g.position.z) < 9) {
tsPrompt("<b>The funeral of " + esc(f.n) + "</b> · <b>press E</b> (or tap here) to hear the words, lay a flower or play a hymn", function () { tlvFuneralCard(f); });
return;
}
if (S.vault && Math.hypot(P.x - S.vault.x, P.z - S.vault.z) < 7) {
tsPrompt("<b>The Cemetery Vault</b> · <b>press E</b> (or tap here) for the roll of the remembered", tlvVaultCard);
return;
}
var best = -1, bd = 2.4;
S.list.forEach(function (o, i) { var d = Math.hypot(P.x - o.x, P.z - o.z); if (d < bd) {
bd = d;
best = i;
} });
if (best >= 0) {
var g = tlvGraveAt(best), i = best;
tsPrompt(g ? "<b>Here lies " + esc(g.n) + "</b> · <b>press E</b> (or tap here) to read the headstone" : "<b>An old headstone</b> · <b>press E</b> (or tap here) to read it", function () { tlvStoneCard(i); });
return;
}
}
}
}
}
catch (e) { }
return tt.apply(this, arguments);
};
})();
(function () {
if (typeof ctyHtml !== "function")
return;
var ch = ctyHtml;
ctyHtml = function () {
var h = ch.apply(this, arguments);
return h.replace('<button class="btn" data-cty="close">Close</button>', '<button class="btn" data-tlvcity="1" title="The City Museum, the town news, its people and those remembered">🏛️ Museum</button><button class="btn" data-cty="close">Close</button>');
};
document.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-tlvcity]");
if (!t)
return;
e.stopPropagation();
if (typeof CTY !== "undefined") {
CTY.open = false;
if (typeof ctyPaint === "function")
ctyPaint();
}
tlvOpen("museum");
}, true);
})();
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
((TLV.d && TLV.d.funerals) || []).forEach(function (f) {
var t = new Date(f.at).getTime();
if (t - Date.now() > 24 * 3600000 || Date.now() - t > 45 * 60000)
return;
rows.push(["⚱️", "<b>The funeral of " + esc(f.n) + "</b> · the Cemetery on Temple Row, behind the Undertaker's · " + (Date.now() >= t - 600000 ? "now" : new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), Date.now() >= t - 600000]);
});
}
catch (e) { }
return rows;
};
})();
setInterval(function () {
try {
if (tlvInCity() || tlvInMuseum()) {
tlvLoad(false);
tlvSeed();
}
if (tlvInCity() || tlvInMuseum())
tlvHistLoad(false);
tlvPhotoTick();
tlvFramesLetGo();
if (!tlvInCity() && TLV.fun)
tlvFunDrop();
}
catch (e) {
if (window.console)
console.warn("[town-lives]", e);
}
}, 5000);
setInterval(function () { try {
tlvFunTick();
}
catch (e) {
if (window.console)
console.warn("[funeral]", e);
} }, 400);
