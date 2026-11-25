/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(479, function () {
return [
function () {
var c = document.createElement("canvas");
c.width = c.height = 64;
var g = c.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
r.addColorStop(0, "rgba(255,240,190,1)");
r.addColorStop(0.42, "rgba(255,206,110,.9)");
r.addColorStop(0.68, "rgba(110,70,18,.4)");
r.addColorStop(1, "rgba(0,0,0,0)");
g.fillStyle = r;
g.fillRect(0, 0, 64, 64);
var t = new THREE.CanvasTexture(c);
if (renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return t;
},
function () {
if (MMP.dots)
return MMP.dots;
var geo = new THREE.PlaneGeometry(1, 1);
geo.rotateX(-Math.PI / 2);
var m = new THREE.MeshBasicMaterial({ map: mmpDotTex(), color: 0xFFFFFF, transparent: true, opacity: 0.62, depthWrite: false, fog: true,
polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
var I = new THREE.InstancedMesh(geo, m, MMP_DOTS);
I.frustumCulled = false;
I.renderOrder = 3;
I.name = "mmp-trail";
var c = new THREE.Color(1, 1, 1);
for (var i = 0; i < MMP_DOTS; i++)
I.setColorAt(i, c);
I.count = 0;
scene.add(I);
MMP.dots = I;
MMP.dotP = [];
return I;
},
function (G) {
var I = mmpDotsMake(), P = camera.position, dx = G.x - P.x, dz = G.z - P.z, d = Math.hypot(dx, dz);
var feet = mmpFeet(), ux = dx / d, uz = dz / d, M = MMP.mat || (MMP.mat = new THREE.Matrix4()), n = 0, last = feet;
var ox = Math.round(P.x), oz = Math.round(P.z);
I.position.set(ox, 0, oz);
var g0 = typeof supportAt === "function" ? supportAt(P.x, P.z, feet + 0.5) : feet;
if (!(isFinite(g0)) || feet - g0 > 5) {
mmpDotsHide();
return;
}
for (var i = 0; i < MMP_DOTS; i++) {
var s = MMP_FROM + i * MMP_GAP;
if (s > d - 1.2)
break;
var x = P.x + ux * s, z = P.z + uz * s;
try {
if (typeof blockedAt === "function" && blockedAt(x, z, last))
break;
}
catch (e) {
break;
}
var y = last;
try {
var h = supportAt(x, z, last + 0.9);
if (isFinite(h))
y = h;
}
catch (e) { }
if (Math.abs(y - last) > 2.2)
break;
var q = s / (MMP_FROM + MMP_DOTS * MMP_GAP), sz = (mmpPhone() ? 0.3 : 0.26) * (1 - 0.6 * q * q);
last = y;
M.makeScale(sz, 1, sz);
M.setPosition(x - ox, y + 0.05, z - oz);
I.setMatrixAt(n, M);
MMP.dotP[n] = s;
n++;
}
I.count = n;
I.visible = n > 0;
I.instanceMatrix.needsUpdate = true;
MMP.dotN = n;
},
function (k, v) {
MMP[k] = v ? 1 : 0;
mmpSave();
mmpApply();
if (k === "map" && v) {
MMP.tile = null;
MMP.tAt = 0;
}
if (typeof setStatus === "function")
setStatus(k === "map" ? (v ? "🗺️ <b>Mini map on.</b> It sits in the compass at the top left; tap it for places by distance." : "🧭 <b>Mini map off.</b> The plain compass is back.") :
(v ? "✨ <b>Quest trail on.</b> Faint dots on the ground lead toward your next step." : "<b>Quest trail off.</b> The story's light and banner still show the way."));
},
function () {
if (typeof worldCard !== "function" || typeof worldBtn !== "function") {
mmpSet("map", !MMP.map);
return;
}
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🗺️ Mini map and trail</div><div style='opacity:.8;font-size:12.5px;margin:2px 0 8px'>Both kept on this device.</div>", fns = {};
h += worldBtn("m", MMP.map ? "🗺️ Mini map: on (turn off)" : "🗺️ Mini map: off (turn on)", "A small round map in the compass at the top left, turned the way you face");
h += worldBtn("t", MMP.trail ? "✨ Quest trail: on (turn off)" : "✨ Quest trail: off (turn on)", "Faint gold dots on the ground toward your next story step, or the place you asked the way to");
if (typeof wmMapsCard === "function")
h += worldBtn("big", "🌍 The big maps", "The Atlas of All Worlds, and the map of Somnucor");
fns.m = function () { mmpSet("map", !MMP.map); mmpCard(); };
fns.t = function () { mmpSet("trail", !MMP.trail); mmpCard(); };
fns.big = function () { worldCard(null); wmMapsCard(); };
worldCard(h, fns);
},
function (key) {
var M = QLG.map || (QLG.map = {});
if (M[key] !== undefined)
return M[key];
var r = null;
try {
if (key === "poebook")
r = { ch: function () { return typeof POE_CH_POE !== "undefined" ? POE_CH_POE : (typeof POE_CH !== "undefined" ? POE_CH : null); }, open: "poeOpen" };
else if (key === "ndbook")
r = { ch: function () { return typeof ND_CH !== "undefined" ? ND_CH : null; }, open: "poeOpen" };
else if (typeof VBK_BOOKS !== "undefined") {
Object.keys(VBK_BOOKS).forEach(function (k) { var B = VBK_BOOKS[k]; if (B && B.store === key)
r = { ch: function () { return B.ch; }, open: "vbkOpen" }; });
}
if (!r) {
var re = new RegExp("store\\." + key + "\\b");
Object.getOwnPropertyNames(window).some(function (n) {
if (!/^[a-z]{2,6}S$/.test(n))
return false;
var f = window[n];
if (typeof f !== "function")
return false;
var src = "";
try {
src = Function.prototype.toString.call(f);
}
catch (e) { }
if (!re.test(src))
return false;
var p = n.slice(0, -1), P = p.toUpperCase() + "_CH";
r = { ch: function () { return window[P]; }, open: p + "Open" };
return true;
});
}
}
catch (e) {
r = null;
}
M[key] = r;
return r;
},
function (B) {
var h = B.how || "";
if (typeof bhnIsDone === "function") {
try {
if (bhnIsDone(B))
return { st: 2 };
}
catch (e) { }
}
if (h.indexOf("st:") === 0) {
var key = h.slice(3), S = store[key];
if (!S || !S.started)
return { st: 0 };
if (S.done)
return { st: 2 };
var F = qlgFind(key), CH = F && F.ch(), C = CH && CH[S.ch];
return { st: 1, ch: (S.ch | 0) + 1, n: CH ? CH.length : 0, chT: C && C.t || "", step: qlgStepText(C && C.steps && C.steps[S.s]), open: F && F.open };
}
if (h.indexOf("ct:") === 0) {
var id = h.slice(3), W = typeof CT_W !== "undefined" && CT_W[id], T = store.tales, n = T && T.ch && +T.ch[id] || 0;
if (!W || !W.ch || !n)
return { st: 0 };
if (n >= W.ch.length)
return { st: 2 };
var Cn = W.ch[n];
return { st: 1, ch: n + 1, n: W.ch.length, chT: Cn && (Cn[0] || Cn.t) || "", step: Cn && typeof Cn[1] === "string" ? Cn[1] : "", open: "ctsMenu", ct: id };
}
if (h.indexOf("oz:") === 0) {
var b = +h.slice(3), O = store.oz;
if (!O)
return { st: 0 };
var L = window[b === 1 ? "OZ_CH" : "OZ_CH" + b], ch = b === 1 ? O.ch : (O["b" + b] && O["b" + b].ch);
if (ch == null || (b !== 1 && !O["b" + b]))
return { st: 0 };
ch = +ch || 0;
if (L && ch >= L.length)
return { st: 2 };
var C2 = L && L[ch];
return { st: 1, ch: ch + 1, n: L ? L.length : 0, chT: C2 && C2[0] || "", step: C2 && typeof C2[2] === "string" ? C2[2] : "", open: "ozMenu" };
}
if (h.indexOf("hg:") === 0) {
var k = h.slice(3), HG = store.hgbook, S2 = HG && HG.b && HG.b[k];
if (!S2 || !S2.started)
return { st: 0 };
if (S2.done)
return { st: 2 };
var BK = typeof HGB_BOOKS !== "undefined" && HGB_BOOKS[k], C3 = BK && BK.ch && BK.ch[S2.ch];
return { st: 1, ch: (S2.ch | 0) + 1, n: BK && BK.ch ? BK.ch.length : 0, chT: C3 && C3.t || "", step: qlgStepText(C3 && C3.steps && C3.steps[S2.s]), open: "hgbOpen" };
}
if (h === "ti") {
var P = store.prw, T2 = P && P.ti;
if (!T2 || !T2.started)
return { st: 0 };
if (T2.done)
return { st: 2 };
var C4 = typeof TI_BOOK !== "undefined" && TI_BOOK[T2.ch];
return { st: 1, ch: (T2.ch | 0) + 1, n: typeof TI_BOOK !== "undefined" ? TI_BOOK.length : 0, chT: C4 && C4.t || "", step: qlgStepText(C4 && C4.steps && C4.steps[T2.s]), open: "tiMenuCard" };
}
return { st: 0 };
},
function () {
try {
if (typeof QST_LIST === "undefined")
return null;
var E = QST_LIST.filter(function (e) { return e.id === "gx"; })[0];
if (!E || !E.state)
return null;
var s = E.state();
if (!s || !s.st)
return null;
return { B: { k: "hollow", t: E.t, i: E.icon }, s: { st: s.st, step: s.h || "", open: E.open } };
}
catch (e) {
return null;
}
},
function () {
var go = [], done = [], left = 0;
(typeof BHN_ORDER !== "undefined" ? BHN_ORDER : []).forEach(function (k) {
var B = BHN_BOOKS[k], s;
try {
s = qlgState(B);
}
catch (e) {
s = { st: 0 };
}
if (s.st === 1)
go.push({ B: B, s: s });
else if (s.st === 2)
done.push({ B: B, s: s });
else
left++;
});
var H = qlgHollow();
if (H) {
if (H.s.st === 1)
go.unshift(H);
else if (H.s.st === 2)
done.push(H);
}
return { go: go, done: done, left: left };
},
function () {
var A = qlgAll(), h = "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>📚 Your books</div>";
h += sgaDim("Where you are in every book you have begun, read from each book's own place this moment.");
if (!A.go.length)
h += sgaBox(sgaDim("No book under way. Every world with a story has a 📖 Where to start chip on the left; the 📚 Book Store and the Atlas list them all."));
A.go.forEach(function (x, i) {
var s = x.s, B = x.B, inner = "<b>" + qlgEsc((B.i ? B.i + " " : "") + B.t) + "</b>";
if (s.ch)
inner += "<div style='font-size:12px;opacity:.8;margin-top:2px'>Chapter " + s.ch + (s.n ? " of " + s.n : "") + (s.chT ? ": " + qlgEsc(String(s.chT).replace(/<[^>]+>/g, "")) : "") + "</div>";
if (s.step)
inner += "<div style='font-size:12.5px;margin:4px 0'>➜ " + qlgEsc(s.step) + "</div>";
if (s.open && typeof window[s.open] === "function")
inner += "<button class='btn' data-ql='" + i + "' style='margin:3px 0 0'>▶ Carry on</button>";
h += sgaBox(inner, "#C9A85A");
});
if (A.done.length)
h += "<div style='margin-top:10px'><b>Finished</b> <span style='opacity:.7;font-size:12px'>" + A.done.length + "</span></div>" +
A.done.map(function (x) { return "<div style='font-size:12.5px;color:#9AD08A;margin:2px 0'>✓ " + qlgEsc((x.B.i ? x.B.i + " " : "") + x.B.t) + "</div>"; }).join("");
if (A.left)
h += sgaDim("<div style='margin-top:8px'>" + A.left + " more books still to begin.</div>");
QLG.list = A.go;
return h;
}
];
});
