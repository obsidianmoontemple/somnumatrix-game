/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var MMP = { map: 1, trail: 1, el: null, cv: null, ctx: null, svgC: null, tile: null, tc: null, tx: 0, tz: 0, ty: 0, tw: "", tin: -1, tAt: 0, tLum: 1,
rt: null, cam: null, px: null, img: null, busy: 0, goal: null, last: 0, lastB: -999, lastX: 1e9, lastZ: 1e9, lastG: "", shown: false,
dots: null, dotN: 0, dotAt: 0, dotKey: "", phone: false };
var MMP_COLS = { goal: "#FFD98A", me: "#F4F0E4" };
function mmpPhone() { return document.body && document.body.classList.contains("ps-phone") || (typeof LITE !== "undefined" && !!LITE); }
function mmpLoad() { try {
var o = JSON.parse(localStorage.getItem("mmp.prefs") || "{}") || {};
if (o.map === 0)
MMP.map = 0;
if (o.trail === 0)
MMP.trail = 0;
}
catch (e) { } }
function mmpSave() { try {
localStorage.setItem("mmp.prefs", JSON.stringify({ map: MMP.map, trail: MMP.trail }));
}
catch (e) { } }
var MMP_WAYS = ["arbWay", "bsbWay", "cvbWay", "dkbWay", "drbWay", "ebkWay", "fkbWay", "gbkWay", "gvbWay", "hbbWay", "hgbWay", "imbWay", "jkbWay",
"kgbWay", "lkbWay", "lsbWay", "lwbWay", "mrbWay", "nvbWay", "phbWay", "pmbWay", "poeWay", "sbkWay", "sxbWay", "szbWay", "tmbWay", "tzbWay",
"vbkWay", "wcbWay", "wdbWay", "wqbWay", "wsbWay", "sgWay"];
function mmpHookWays() {
MMP_WAYS.forEach(function (n) {
var f = window[n];
if (typeof f !== "function" || f.__mmp)
return;
var w = function (P, L) {
try {
if (P && L && isFinite(P.x) && isFinite(P.z)) {
var C = camera.position, ox = C.x - L.x, oz = C.z - L.z;
MMP.goal = { x: P.x + ox, y: isFinite(P.y) ? P.y : null, z: P.z + oz, t: performance.now(), src: n };
}
}
catch (e) { }
return f.apply(this, arguments);
};
w.__mmp = 1;
window[n] = w;
});
}
function mmpGoal() {
var now = performance.now(), G = MMP.goal;
if (G && now - G.t < 1500 && typeof WLD !== "undefined" && WLD.on)
return G;
try {
if (typeof CTS !== "undefined" && CTS.beam && CTS.beam.visible && CTS.beam.parent && typeof WLD !== "undefined" && WLD.on === "ctale") {
var v = MMP.v3 || (MMP.v3 = new THREE.Vector3());
CTS.beam.getWorldPosition(v);
return { x: v.x, y: null, z: v.z, src: "cts" };
}
}
catch (e) { }
if (typeof guideTo !== "undefined" && guideTo && isFinite(guideTo.x) && isFinite(guideTo.z) && !store.inside)
return { x: guideTo.x, y: null, z: guideTo.z, src: "guide" };
return null;
}
function mmpCss() {
if (document.getElementById("mmp-css"))
return;
var s = document.createElement("style");
s.id = "mmp-css";
s.textContent =
"#compass .mmp-wrap,body.ps-phone.ps-walk #compass>.mmp-wrap{position:relative;display:inline-block!important;line-height:0}" +
"#compass canvas.mmp-cv{position:absolute;left:0;top:0;border-radius:50%;pointer-events:none;display:none}" +
"#compass.mmp-on canvas.mmp-cv{display:block}" +
"body #compass.mmp-on svg{width:120px!important;height:120px!important}" +
"body #compass.mmp-on #c-read,body #compass.mmp-on #pfind-tip{display:none!important}" +
"body.mmp-big #me-bar{top:calc(182px + env(safe-area-inset-top,0px))!important}" +
"body.ps-phone #compass.mmp-on svg,body.ps-phone.ps-walk #compass.mmp-on svg{width:92px!important;height:92px!important}" +
"@media (max-width:760px){body #compass.mmp-on svg{width:92px!important;height:92px!important}}";
document.head.appendChild(s);
}
function mmpEls() {
if (MMP.el)
return MMP.el;
var el = document.getElementById("compass");
if (!el)
return null;
var svg = el.querySelector("svg");
if (!svg)
return null;
mmpCss();
var wrap = document.createElement("div");
wrap.className = "mmp-wrap";
svg.parentNode.insertBefore(wrap, svg);
var cv = document.createElement("canvas");
cv.className = "mmp-cv";
wrap.appendChild(cv);
wrap.appendChild(svg);
MMP.el = el;
MMP.cv = cv;
MMP.ctx = cv.getContext("2d");
MMP.svgC = svg.querySelector("circle");
return el;
}
function mmpApply() {
var el = mmpEls();
if (!el)
return;
el.classList.toggle("mmp-on", !!MMP.map);
if (MMP.svgC)
MMP.svgC.setAttribute("fill", MMP.map ? "rgba(7,8,11,0)" : "rgba(7,8,11,.62)");
if (MMP.svgC)
MMP.svgC.setAttribute("stroke", MMP.map ? "rgba(232,214,170,.55)" : "rgba(201,190,168,.25)");
document.body.classList.toggle("mmp-big", !!MMP.map && !mmpPhone() && innerWidth > 760);
MMP.lastB = -999;
if (!MMP.trail)
mmpDotsHide();
mmpMenuPaint();
}
function mmpTileSize() { return mmpPhone() ? 192 : 256; }
function mmpSpan(inside) { return inside ? (mmpPhone() ? 16 : 18) : (mmpPhone() ? 100 : 110); }
function mmpView(inside) { return inside ? (mmpPhone() ? 8 : 9.5) : (mmpPhone() ? 36 : 44); }
function mmpInside() { try {
return typeof cfxIndoorsNow === "function" ? cfxIndoorsNow() : (store.inside ? 1 : 0);
}
catch (e) {
return store.inside ? 1 : 0;
} }
function mmpEnc() {
try {
if (typeof GFX !== "undefined" && GFX.mode !== "standard" && GFX.composer && GFX.composer.renderTarget1)
return GFX.composer.renderTarget1.texture.encoding;
}
catch (e) { }
return renderer.outputEncoding;
}
function mmpSnap() {
if (typeof renderer === "undefined" || !renderer || !scene || !camera)
return false;
if (renderer.xr && renderer.xr.isPresenting)
return false;
if (MMP.wait)
return false;
var N = mmpTileSize(), enc = mmpEnc(), inside = mmpInside(), T = mmpSpan(inside), gl = renderer.getContext(), gl2 = !!renderer.capabilities.isWebGL2 && typeof gl.fenceSync === "function";
if (!MMP.rt || MMP.rt.width !== N || MMP.rt.texture.encoding !== enc) {
if (MMP.rt)
MMP.rt.dispose();
MMP.rt = new THREE.WebGLRenderTarget(N, N, { depthBuffer: true });
MMP.rt.texture.encoding = enc;
MMP.rt.texture.generateMipmaps = false;
MMP.px = new Uint8Array(N * N * 4);
MMP.tc = document.createElement("canvas");
MMP.tc.width = MMP.tc.height = N;
MMP.img = MMP.tc.getContext("2d").createImageData(N, N);
if (MMP.pbo) {
try {
gl.deleteBuffer(MMP.pbo);
}
catch (e) { }
MMP.pbo = null;
}
}
var P = camera.position, fov = 46, H = T / Math.tan(fov * Math.PI / 360);
if (!MMP.cam)
MMP.cam = new THREE.PerspectiveCamera(fov, 1, 1, 1000);
var C = MMP.cam;
C.fov = fov;
C.aspect = 1;
C.position.set(P.x, P.y + H, P.z);
C.up.set(0, 0, -1);
C.lookAt(P.x, P.y, P.z);
C.near = Math.max(1, H - (inside ? 1.1 : 40));
C.far = Math.max(camera.far || 5000, H + 400);
C.updateProjectionMatrix();
C.updateMatrixWorld(true);
var F = scene.fog, fN, fF, fD, sm = renderer.shadowMap, sa = sm && sm.autoUpdate, was = renderer.getRenderTarget(), ac = renderer.autoClear;
var bg = scene.background, cc = MMP.cc || (MMP.cc = new THREE.Color()), ca = renderer.getClearAlpha();
renderer.getClearColor(cc);
cc = cc.clone();
var meta = { x: P.x, z: P.z, y: P.y, w: mmpWhere(), inside: inside, enc: enc, N: N };
try {
if (F) {
if (F.isFogExp2) {
fD = F.density;
F.density = 0;
}
else {
fN = F.near;
fF = F.far;
F.near = 1e7;
F.far = 2e7;
}
}
if (sm)
sm.autoUpdate = false;
if (bg && bg.isColor)
scene.background = null;
renderer.setClearColor(0x0B0D12, 1);
renderer.autoClear = true;
renderer.setRenderTarget(MMP.rt);
renderer.clear();
renderer.render(scene, C);
if (gl2) {
if (!MMP.pbo) {
MMP.pbo = gl.createBuffer();
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, MMP.pbo);
gl.bufferData(gl.PIXEL_PACK_BUFFER, N * N * 4, gl.STREAM_READ);
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
}
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, MMP.pbo);
gl.readPixels(0, 0, N, N, gl.RGBA, gl.UNSIGNED_BYTE, 0);
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
MMP.fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
gl.flush();
MMP.wait = meta;
MMP.waitAt = performance.now();
}
else
renderer.readRenderTargetPixels(MMP.rt, 0, 0, N, N, MMP.px);
}
catch (e) {
if (window.console)
console.warn("[mmp] snap", e);
MMP.wait = null;
return false;
}
finally {
renderer.setRenderTarget(was);
renderer.autoClear = ac;
if (sm)
sm.autoUpdate = sa;
scene.background = bg;
renderer.setClearColor(cc, ca);
if (F) {
if (F.isFogExp2)
F.density = fD;
else {
F.near = fN;
F.far = fF;
}
}
}
MMP.tAt = performance.now();
if (!gl2)
mmpTake(meta);
return !gl2;
}
function mmpPick() {
var M = MMP.wait;
if (!M)
return false;
var gl = renderer.getContext();
try {
var st = gl.getSyncParameter(MMP.fence, gl.SYNC_STATUS);
if (st !== gl.SIGNALED) {
if (performance.now() - MMP.waitAt < 8000)
return false;
gl.deleteSync(MMP.fence);
MMP.fence = null;
MMP.wait = null;
return false;
}
gl.deleteSync(MMP.fence);
MMP.fence = null;
MMP.wait = null;
if (M.N !== mmpTileSize())
return false;
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, MMP.pbo);
gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, MMP.px);
gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
}
catch (e) {
MMP.wait = null;
MMP.fence = null;
if (window.console)
console.warn("[mmp] pick", e);
return false;
}
mmpTake(M);
return true;
}
function mmpTake(M) {
var N = M.N, D = MMP.img.data, S = MMP.px, row = N * 4, lum = 0, n = 0, lin = M.enc !== THREE.sRGBEncoding;
for (var y = 0; y < N; y++) {
var a = (N - 1 - y) * row, b = y * row;
for (var i = 0; i < row; i += 4) {
var r = S[a + i], g = S[a + i + 1], bl = S[a + i + 2];
if (lin) {
r = Math.sqrt(r / 255) * 255;
g = Math.sqrt(g / 255) * 255;
bl = Math.sqrt(bl / 255) * 255;
}
D[b + i] = r;
D[b + i + 1] = g;
D[b + i + 2] = bl;
D[b + i + 3] = 255;
if ((i & 60) === 0 && (y & 7) === 0 && r + g + bl > 48) {
lum += r * 0.3 + g * 0.59 + bl * 0.11;
n++;
}
}
}
MMP.tc.getContext("2d").putImageData(MMP.img, 0, 0);
var m = n ? lum / n : 128;
MMP.tLum = Math.max(1, Math.min(2.6, 95 / Math.max(8, m)));
MMP.tEmpty = n < (N / 8) * (N / 16) * 0.08;
MMP.tx = M.x;
MMP.tz = M.z;
MMP.ty = M.y;
MMP.tw = M.w;
MMP.tin = M.inside;
MMP.tile = MMP.tc;
}
function mmpWhere() { return (typeof WLD !== "undefined" && WLD.on || "") + "|" + (store.here || 0) + "|" + (store.inside ? (typeof INT !== "undefined" && INT && (INT.wpKey || INT.spec && INT.spec.id) || 1) : 0); }
function mmpNeedSnap() {
var P = camera.position, now = performance.now(), gap = mmpPhone() ? 4000 : 1500;
if (Math.hypot(P.x - (MMP.sx || 0), P.z - (MMP.sz || 0)) > 0.3) {
MMP.sx = P.x;
MMP.sz = P.z;
MMP.sAt = now;
}
var still = now - (MMP.sAt || now) > 450;
var w = mmpWhere();
if (w !== MMP.wNow) {
MMP.wNow = w;
MMP.wAt = now;
}
if (MMP.busy || MMP.wait)
return false;
if (!MMP.tile)
return now - MMP.tAt > 800;
if (now - MMP.tAt < gap)
return false;
if (MMP.tw !== w || MMP.tin !== mmpInside())
return true;
if (now - MMP.wAt < 12000 && now - MMP.tAt > 4500)
return true;
if (MMP.tEmpty && now - MMP.wAt < 90000)
return true;
var d = Math.hypot(P.x - MMP.tx, P.z - MMP.tz), edge = mmpSpan(MMP.tin) - mmpView(MMP.tin) - (MMP.tin ? 2 : 8);
if (d > edge)
return true;
if (MMP.slow > 45)
return false;
if (still && d > (MMP.tin ? 3 : 14))
return true;
if (Math.abs(P.y - MMP.ty) > (MMP.tin ? 2.6 : 12))
return true;
return still && now - MMP.tAt > 60000;
}
function mmpShown() {
var el = MMP.el;
if (!el || !MMP.map || el.classList.contains("gone"))
return false;
if (document.hidden || document.body.classList.contains("drive-on"))
return false;
if (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting)
return false;
return el.offsetParent !== null || getComputedStyle(el).display !== "none";
}
function mmpDraw(force) {
var el = MMP.el, cv = MMP.cv, g = MMP.ctx;
if (!el || !cv)
return;
var svg = el.querySelector("svg"), px = svg ? svg.getBoundingClientRect().width : 0;
if (!px)
return;
var dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(px * dpr);
if (cv.width !== W) {
cv.width = cv.height = W;
cv.style.width = cv.style.height = px + "px";
force = true;
}
var P = camera.position, b = typeof cameraBearing === "function" ? cameraBearing() : 0, G = mmpGoal(), gk = G ? Math.round(G.x) + "," + Math.round(G.z) : "";
if (!force && Math.abs(b - MMP.lastB) < 1 && Math.hypot(P.x - MMP.lastX, P.z - MMP.lastZ) < 0.4 && gk === MMP.lastG)
return;
MMP.lastB = b;
MMP.lastX = P.x;
MMP.lastZ = P.z;
MMP.lastG = gk;
var R = W / 2, rr = R * 0.92, sc = rr / mmpView(MMP.tile ? MMP.tin : mmpInside());
g.setTransform(1, 0, 0, 1, 0, 0);
g.clearRect(0, 0, W, W);
g.save();
g.beginPath();
g.arc(R, R, rr, 0, Math.PI * 2);
g.clip();
g.fillStyle = "rgba(10,12,16,.82)";
g.fillRect(0, 0, W, W);
g.translate(R, R);
g.rotate(-b * Math.PI / 180);
if (MMP.tile) {
var N = MMP.tile.width, mpp = 2 * mmpSpan(MMP.tin) / N, s = sc * mpp, ox = (MMP.tx - P.x) * sc, oz = (MMP.tz - P.z) * sc;
g.globalAlpha = 0.9;
if ("filter" in g)
g.filter = "brightness(" + MMP.tLum.toFixed(2) + ") saturate(.85)";
g.drawImage(MMP.tile, ox - N * s / 2, oz - N * s / 2, N * s, N * s);
if ("filter" in g)
g.filter = "none";
g.globalAlpha = 1;
}
if (G) {
var dx = (G.x - P.x) * sc, dz = (G.z - P.z) * sc, d = Math.hypot(dx, dz), lim = rr - 5 * dpr, far = d > lim;
var ex = far ? dx * lim / d : dx, ez = far ? dz * lim / d : dz;
g.strokeStyle = "rgba(255,217,138,.55)";
g.lineWidth = 1.4 * dpr;
g.setLineDash([2 * dpr, 4 * dpr]);
g.beginPath();
g.moveTo(0, 0);
g.lineTo(ex, ez);
g.stroke();
g.setLineDash([]);
g.fillStyle = MMP_COLS.goal;
g.strokeStyle = "rgba(40,26,6,.8)";
g.lineWidth = 1 * dpr;
g.beginPath();
g.arc(ex, ez, (far ? 2.6 : 3.4) * dpr, 0, Math.PI * 2);
g.fill();
g.stroke();
}
g.restore();
g.setTransform(1, 0, 0, 1, R, R);
g.fillStyle = MMP_COLS.me;
g.strokeStyle = "rgba(0,0,0,.7)";
g.lineWidth = 1 * dpr;
var a = 5.5 * dpr;
g.beginPath();
g.moveTo(0, -a);
g.lineTo(a * 0.72, a * 0.8);
g.lineTo(0, a * 0.38);
g.lineTo(-a * 0.72, a * 0.8);
g.closePath();
g.fill();
g.stroke();
g.setTransform(1, 0, 0, 1, 0, 0);
}
var MMP_DOTS = 14, MMP_GAP = 1.8, MMP_FROM = 2.2;
function mmpDotTex() { return __ZC(479, 0, this, arguments, new.target); }
function mmpDotsMake() { return __ZC(479, 1, this, arguments, new.target); }
function mmpDotsHide() { MMP.dotN = 0; MMP.dotKey = ""; if (MMP.dots) {
MMP.dots.count = 0;
MMP.dots.visible = false;
} }
function mmpFeet() { return camera.position.y - 1.72; }
function mmpDotsPlace(G) { return __ZC(479, 2, this, arguments, new.target); }
function mmpDotsGlow(t) {
var I = MMP.dots;
if (!I || !I.visible || !MMP.dotN)
return;
var c = MMP.col || (MMP.col = new THREE.Color());
for (var i = 0; i < MMP.dotN; i++) {
var s = MMP.dotP[i], k = 0.8 + 0.2 * Math.sin(t * 2.2 - s * 0.55);
c.setRGB(k, k, k);
I.setColorAt(i, c);
}
if (I.instanceColor)
I.instanceColor.needsUpdate = true;
}
function mmpTrail(now) {
if (!MMP.trail || typeof walkMode === "undefined" || !walkMode) {
mmpDotsHide();
return;
}
if (renderer && renderer.xr && renderer.xr.isPresenting) {
mmpDotsHide();
return;
}
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on) {
mmpDotsHide();
return;
}
var G = mmpGoal();
if (!G) {
mmpDotsHide();
return;
}
var P = camera.position, d = Math.hypot(G.x - P.x, G.z - P.z);
if (d < 3.4) {
mmpDotsHide();
return;
}
var key = Math.round(P.x * 3) + "," + Math.round(P.z * 3) + "," + Math.round(P.y * 2) + "|" + Math.round(G.x) + "," + Math.round(G.z);
if (key !== MMP.dotKey && now - MMP.dotAt > 90) {
MMP.dotKey = key;
MMP.dotAt = now;
mmpDotsPlace(G);
}
mmpDotsGlow(now / 1000);
}
function mmpFrame() {
var now = performance.now();
if (MMP.fAt) {
var fd = Math.min(250, now - MMP.fAt);
MMP.slow = (MMP.slow || 16) * 0.95 + fd * 0.05;
}
MMP.fAt = now;
try {
mmpTrail(now);
}
catch (e) {
if (!MMP.errT) {
MMP.errT = 1;
if (window.console)
console.warn("[mmp] trail", e);
}
mmpDotsHide();
}
if (!MMP.map)
return;
if (now - MMP.last < (mmpPhone() ? 100 : 66))
return;
MMP.last = now;
try {
if (!mmpEls())
return;
var on = mmpShown();
if (!on) {
MMP.shown = false;
return;
}
var snapped = MMP.wait ? mmpPick() : false;
if (mmpNeedSnap()) {
MMP.busy = 1;
snapped = mmpSnap() || snapped;
MMP.busy = 0;
}
mmpDraw(snapped || !MMP.shown);
MMP.shown = true;
}
catch (e) {
MMP.busy = 0;
if (!MMP.errM) {
MMP.errM = 1;
if (window.console)
console.warn("[mmp] map", e);
}
}
}
function mmpSet(k, v) { return __ZC(479, 3, this, arguments, new.target); }
function mmpMenuPaint() {
var b = document.getElementById("me-minimap");
if (b)
b.textContent = MMP.map ? "🗺️ Mini map: on" : "🗺️ Mini map: off";
var t = document.getElementById("me-trail");
if (t)
t.textContent = MMP.trail ? "✨ Quest trail: on" : "✨ Quest trail: off";
}
function mmpCard() { return __ZC(479, 4, this, arguments, new.target); }
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-minimap")) {
var b = document.createElement("button");
b.className = "btn";
b.id = "me-minimap";
b.title = "The mini map in the compass, and the quest trail";
b.onclick = function () { if (typeof closeMenu === "function")
try {
closeMenu();
}
catch (e) { } mmpCard(); };
var mp = document.getElementById("me-maps");
if (mp && mp.parentNode === bar)
bar.insertBefore(b, mp.nextSibling);
else
bar.appendChild(b);
}
try {
if (typeof PS_SECTIONS !== "undefined") {
var sec = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (sec && sec.ids.indexOf("me-minimap") < 0) {
var at = sec.ids.indexOf("me-maps");
sec.ids.splice(at >= 0 ? at + 1 : 0, 0, "me-minimap");
}
}
}
catch (e) { }
mmpMenuPaint();
})();
(function () {
if (typeof wmMapsCard !== "function")
return;
var wc = wmMapsCard;
wmMapsCard = function () {
var r = wc.apply(this, arguments);
try {
var C = typeof WLD !== "undefined" && WLD.card;
if (C && C.style.display === "block" && !C.querySelector("[data-mmp]")) {
var d = document.createElement("div");
d.setAttribute("data-mmp", "1");
d.style.cssText = "margin-top:6px";
var b = document.createElement("button");
b.className = "btn";
b.style.cssText = "width:100%;text-align:left";
b.textContent = (MMP.map ? "🗺️ Mini map: on" : "🗺️ Mini map: off") + " · " + (MMP.trail ? "✨ trail on" : "✨ trail off");
b.onclick = function (ev) { ev.stopPropagation(); mmpCard(); };
d.appendChild(b);
C.appendChild(d);
}
}
catch (e) { }
return r;
};
})();
(function start() {
if (typeof updateCompass !== "function" || typeof THREE === "undefined") {
return setTimeout(start, 700);
}
mmpLoad();
mmpHookWays();
var uc = updateCompass;
updateCompass = function () { var r = uc.apply(this, arguments); mmpFrame(); return r; };
function ready() { if (!mmpEls())
return setTimeout(ready, 800); mmpApply(); }
ready();
})();
var QLG = { map: null };
function qlgEsc(t) { return typeof esc === "function" ? esc(t) : String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function qlgFind(key) { return __ZC(479, 5, this, arguments, new.target); }
function qlgStepText(st) { if (!st)
return ""; var h = st.h || st.t || st.goal || ""; return String(h).replace(/<[^>]+>/g, ""); }
function qlgState(B) { return __ZC(479, 6, this, arguments, new.target); }
function qlgHollow() { return __ZC(479, 7, this, arguments, new.target); }
function qlgAll() { return __ZC(479, 8, this, arguments, new.target); }
function qlgHtml() { return __ZC(479, 9, this, arguments, new.target); }
(function () {
if (typeof SGA_TABS === "undefined" || typeof sgaTabStory !== "function")
return;
if (!SGA_TABS.some(function (t) { return t[0] === "books"; })) {
var i = SGA_TABS.map(function (t) { return t[0]; }).indexOf("quests");
SGA_TABS.splice(i < 0 ? 1 : i + 1, 0, ["books", "📚 Books"]);
}
var st = sgaTabStory;
sgaTabStory = function () { if (typeof SGA !== "undefined" && SGA.tab === "books")
return qlgHtml(); return st.apply(this, arguments); };
document.addEventListener("click", function (e) {
var b = e.target && e.target.closest && e.target.closest("#sga-box [data-ql]");
if (!b)
return;
var x = (QLG.list || [])[+b.getAttribute("data-ql")];
if (!x)
return;
var fn = window[x.s.open];
if (typeof fn !== "function")
return;
SGA.open = false;
if (typeof sgaPaint === "function")
sgaPaint();
try {
if (x.s.ct && typeof ctsMenu === "function") {
ctsMenu();
return;
}
fn();
}
catch (err) {
if (window.console)
console.warn("[mmp] quest log open", err);
}
});
})();
