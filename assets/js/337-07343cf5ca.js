/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SOF = { seated: null, near: null, scanAt: 0, scanX: 1e9, scanZ: 1e9, still: 0, lastX: 0, lastZ: 0, others: {}, ghosts: {}, sendAt: 0, viewWas: null,
told: null, ms: 0, scans: 0, R: 2.2, C: 0.1,
OFF: 0.39,
EYE: 0.78 };
var SOF_V = new THREE.Vector3(), SOF_M = new THREE.Matrix4(), SOF_I = new THREE.Matrix4(), SOF_IM = new THREE.Matrix4(), SOF_S = new THREE.Sphere();
function sofSkip(o) {
var u = o.userData;
return !!(u && (u.limbs || u.hdfRoot || u.hdf || u.presence || u.me || u.bakedChunk || u.noSit)) || o.isSprite || o.isPoints || o.isLine;
}
function sofPieces(x0, x1, y0, y1, z0, z1) {
var out = [];
function box(c, r) { return c.x + r > x0 && c.x - r < x1 && c.y + r > y0 && c.y - r < y1 && c.z + r > z0 && c.z - r < z1; }
function walk(o) {
if (sofSkip(o))
return;
var baked = o.isMesh && o.userData.baked;
if (o.visible === false && !baked)
return;
if (o.isMesh && o.geometry && o.geometry.attributes && o.geometry.attributes.position) {
var g = o.geometry;
if (!g.boundingSphere)
g.computeBoundingSphere();
var bs = g.boundingSphere;
if (o.isInstancedMesh) {
if (!g.boundingBox)
g.computeBoundingBox();
var bb = g.boundingBox, lc = bb.getCenter(new THREE.Vector3()), lr = bb.getSize(SOF_V).length() / 2;
for (var i = 0; i < o.count; i++) {
o.getMatrixAt(i, SOF_IM);
SOF_M.multiplyMatrices(o.matrixWorld, SOF_IM);
SOF_S.center.copy(lc).applyMatrix4(SOF_M);
SOF_S.radius = lr * SOF_M.getMaxScaleOnAxis();
if (box(SOF_S.center, SOF_S.radius))
out.push({ g: g, M: SOF_M.clone(), mat: o.material });
}
}
else {
SOF_S.copy(bs).applyMatrix4(o.matrixWorld);
if (isFinite(SOF_S.radius) && box(SOF_S.center, SOF_S.radius))
out.push({ g: g, M: o.matrixWorld, mat: o.material });
}
}
var k = o.children;
for (var j = 0; j < k.length; j++)
walk(k[j]);
}
walk(scene);
var L = (typeof store !== "undefined" && store.objects) || [], M2 = typeof meshes !== "undefined" ? meshes : null;
if (M2 && typeof build === "function") {
for (var i = 0; i < L.length; i++) {
var o = L[i];
if (!o || o.x < x0 - 3 || o.x > x1 + 3 || o.z < z0 - 3 || o.z > z1 + 3)
continue;
var m = M2[o.id];
if (!m || !m.userData.liteStripped || m.visible === false)
continue;
var gh = SOF.ghosts[o.id];
if (!gh) {
try {
gh = build(o);
}
catch (e) {
gh = null;
}
if (!gh)
continue;
var ks = Object.keys(SOF.ghosts);
if (ks.length > 24)
SOF.ghosts = {};
SOF.ghosts[o.id] = gh;
}
gh.position.copy(m.position);
gh.rotation.copy(m.rotation);
gh.scale.copy(m.scale);
gh.updateMatrixWorld(true);
walk(gh);
}
}
return out;
}
function sofMaps(px, pz, feet) {
var R = SOF.R, C = SOF.C, N = Math.round(2 * R / C), x0 = px - R, z0 = pz - R, yLo = feet + 0.18, yHi = feet + 1.4;
var top = new Float32Array(N * N).fill(-1e9), any = new Float32Array(N * N).fill(-1e9), over = new Float32Array(N * N).fill(-1e9);
var low = new Float32Array(N * N).fill(1e9);
var wnx = new Float32Array(N * N), wnz = new Float32Array(N * N);
var list = sofPieces(x0, x0 + 2 * R, yLo, yHi, z0, z0 + 2 * R), tris = 0;
var A = new THREE.Vector3(), B = new THREE.Vector3(), Cc = new THREE.Vector3(), lo = new THREE.Vector3(), hi = new THREE.Vector3(), q = new THREE.Vector3();
list.forEach(function (it) {
var g = it.g, P = g.attributes.position, ix = g.index, M = it.M, e = M.elements;
var two = it.mat && (Array.isArray(it.mat) ? it.mat.some(function (m) { return m && m.side === THREE.DoubleSide; }) : it.mat.side === THREE.DoubleSide);
if (it.mat && !Array.isArray(it.mat) && it.mat.transparent && it.mat.opacity < 0.25)
return;
var flip = M.determinant() < 0;
SOF_I.copy(M).invert();
lo.set(1e9, 1e9, 1e9);
hi.set(-1e9, -1e9, -1e9);
for (var c = 0; c < 8; c++) {
q.set(c & 1 ? x0 + 2 * R : x0, c & 2 ? yHi : yLo, c & 4 ? z0 + 2 * R : z0).applyMatrix4(SOF_I);
lo.min(q);
hi.max(q);
}
var arr = P.isInterleavedBufferAttribute ? P.data.array : P.array, st = P.isInterleavedBufferAttribute ? P.data.stride : P.itemSize, of = P.isInterleavedBufferAttribute ? P.offset : 0;
var n = ix ? ix.count : P.count, ia = ix ? ix.array : null;
if (!arr || (ix && !ia))
return;
for (var t = 0; t + 2 < n; t += 3) {
var a = (ia ? ia[t] : t) * st + of, b = (ia ? ia[t + 1] : t + 1) * st + of, d = (ia ? ia[t + 2] : t + 2) * st + of;
var ax = arr[a], ay = arr[a + 1], az = arr[a + 2], bx = arr[b], by = arr[b + 1], bz = arr[b + 2], cx = arr[d], cy = arr[d + 1], cz = arr[d + 2];
if ((ax < lo.x && bx < lo.x && cx < lo.x) || (ax > hi.x && bx > hi.x && cx > hi.x) || (ay < lo.y && by < lo.y && cy < lo.y) || (ay > hi.y && by > hi.y && cy > hi.y) ||
(az < lo.z && bz < lo.z && cz < lo.z) || (az > hi.z && bz > hi.z && cz > hi.z))
continue;
tris++;
A.set(e[0] * ax + e[4] * ay + e[8] * az + e[12], e[1] * ax + e[5] * ay + e[9] * az + e[13], e[2] * ax + e[6] * ay + e[10] * az + e[14]);
B.set(e[0] * bx + e[4] * by + e[8] * bz + e[12], e[1] * bx + e[5] * by + e[9] * bz + e[13], e[2] * bx + e[6] * by + e[10] * bz + e[14]);
Cc.set(e[0] * cx + e[4] * cy + e[8] * cz + e[12], e[1] * cx + e[5] * cy + e[9] * cz + e[13], e[2] * cx + e[6] * cy + e[10] * cz + e[14]);
var ux = B.x - A.x, uy = B.y - A.y, uz = B.z - A.z, vx = Cc.x - A.x, vy = Cc.y - A.y, vz = Cc.z - A.z;
var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
if (nl < 1e-9)
continue;
nx /= nl;
nz /= nl;
ny /= nl;
if (flip)
ny = -ny;
var nyS = ny;
if (two)
ny = Math.abs(ny);
if (ny > 0.8) {
var mnx = Math.min(A.x, B.x, Cc.x), mxx = Math.max(A.x, B.x, Cc.x), mnz = Math.min(A.z, B.z, Cc.z), mxz = Math.max(A.z, B.z, Cc.z);
var i0 = Math.max(0, Math.ceil((mnx - x0) / C - 0.5)), i1 = Math.min(N - 1, Math.floor((mxx - x0) / C - 0.5));
var k0 = Math.max(0, Math.ceil((mnz - z0) / C - 0.5)), k1 = Math.min(N - 1, Math.floor((mxz - z0) / C - 0.5));
var den = (B.z - Cc.z) * (A.x - Cc.x) + (Cc.x - B.x) * (A.z - Cc.z);
if (Math.abs(den) < 1e-12)
continue;
for (var i = i0; i <= i1; i++)
for (var k = k0; k <= k1; k++) {
var X = x0 + (i + 0.5) * C, Z = z0 + (k + 0.5) * C;
var w1 = ((B.z - Cc.z) * (X - Cc.x) + (Cc.x - B.x) * (Z - Cc.z)) / den, w2 = ((Cc.z - A.z) * (X - Cc.x) + (A.x - Cc.x) * (Z - Cc.z)) / den, w3 = 1 - w1 - w2;
if (w1 < -1e-4 || w2 < -1e-4 || w3 < -1e-4)
continue;
var Y = w1 * A.y + w2 * B.y + w3 * Cc.y;
if (Y < yLo || Y > yHi)
continue;
var ci = k * N + i;
if (Y > top[ci])
top[ci] = Y;
if (Y > any[ci])
any[ci] = Y;
if (Y > over[ci])
over[ci] = Y;
}
}
else {
var flatish = two ? Math.abs(nyS) > 0.8 : nyS <= -0.3, hl = Math.hypot(nx, nz) || 1, hc = (nx * nx - nz * nz) / (hl * hl), hsn = 2 * nx * nz / (hl * hl);
var m = Math.min(40, Math.ceil(Math.max(Math.hypot(ux, uy, uz), Math.hypot(vx, vy, vz), Math.hypot(Cc.x - B.x, Cc.y - B.y, Cc.z - B.z)) / 0.07));
for (var s = 0; s <= m; s++)
for (var r = 0; r <= m - s; r++) {
var X2 = A.x + (ux * s + vx * r) / m, Y2 = A.y + (uy * s + vy * r) / m, Z2 = A.z + (uz * s + vz * r) / m;
if (Y2 < yLo || Y2 > yHi)
continue;
var ii = Math.floor((X2 - x0) / C), kk = Math.floor((Z2 - z0) / C);
if (ii < 0 || kk < 0 || ii >= N || kk >= N)
continue;
var cj = kk * N + ii;
if (Y2 > any[cj])
any[cj] = Y2;
if (flatish && Y2 > over[cj])
over[cj] = Y2;
if (!flatish) {
wnx[cj] += hc;
wnz[cj] += hsn;
}
if (!flatish && Y2 < low[cj])
low[cj] = Y2;
}
}
}
});
return { N: N, x0: x0, z0: z0, top: top, any: any, over: over, low: low, wnx: wnx, wnz: wnz, pieces: list.length, tris: tris };
}
function sofFind(px, pz, feet, fx, fz) {
var t0 = performance.now(), Mp = sofMaps(px, pz, feet), N = Mp.N, C = SOF.C, top = Mp.top, any = Mp.any;
var ok = new Uint8Array(N * N), lab = new Int32Array(N * N).fill(-1), out = [];
var over = Mp.over;
for (var c = 0; c < N * N; c++) {
var h = top[c] - feet;
if (h >= 0.25 && h <= 0.88 && over[c] <= top[c] + 0.04)
ok[c] = 1;
}
var cl = 0, stack = [];
for (var s = 0; s < N * N; s++) {
if (!ok[s] || lab[s] >= 0)
continue;
var cells = [];
lab[s] = cl;
stack.push(s);
while (stack.length) {
var u = stack.pop();
cells.push(u);
var ui = u % N, uk = (u - ui) / N;
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
var i = ui + d[0], k = uk + d[1];
if (i < 0 || k < 0 || i >= N || k >= N)
return;
var v = k * N + i;
if (ok[v] && lab[v] < 0 && Math.abs(top[v] - top[u]) < 0.05) {
lab[v] = cl;
stack.push(v);
}
});
}
var seat = sofSeatOf(cells, cl, Mp, lab, feet, px, pz, fx, fz);
if (seat)
out.push(seat);
cl++;
}
out.sort(function (a, b) { return a.d - b.d; });
SOF.ms = performance.now() - t0;
SOF.scans++;
SOF.last = { pieces: Mp.pieces, tris: Mp.tris, seats: out.length, ms: SOF.ms };
return out;
}
function sofSeatOf(cells, cl, Mp, lab, feet, px, pz, fx, fz) { return __ZC(337, 0, this, arguments, new.target); }
function sofCanSit() {
if (typeof walkMode === "undefined" || !walkMode || !camera)
return false;
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return false;
if (typeof rideArch !== "undefined" && rideArch)
return false;
if (typeof cityView !== "undefined" && cityView)
return false;
if (typeof meView !== "undefined" && meView === "mirror" && !(typeof TOG !== "undefined" && TOG.pm))
return false;
return true;
}
function sofOtherAsks() {
if (typeof nearChar !== "undefined" && nearChar)
return 2;
if (typeof talkOpen !== "undefined" && talkOpen)
return 2;
var kids = document.body ? document.body.children : [], r = 0;
for (var i = 0; i < kids.length; i++) {
var el = kids[i];
if (el.id === "sof-chip" || el.id === "sof-bar" || el.id === "walkhint" || el.id === "scrim" || el.id === "tbtns")
continue;
var tx = el.textContent;
if (!tx || tx.length > 400 || !/press\s*e\b/i.test(tx))
continue;
if (!(typeof pfShown === "function" ? pfShown(el) : el.offsetParent))
continue;
if (el.id === "wld-prompt" && sofHouseWide()) {
r = 1;
continue;
}
return 2;
}
return r;
}
function sofHouseWide() {
return !!(typeof TS !== "undefined" && TS.prompted && typeof INT !== "undefined" && INT && store.inside && !(typeof WLD !== "undefined" && WLD && WLD.on));
}
function sofQuiet() { return !!(SOF.seated || (SOF.near && SOF.near.d <= 0.9 && typeof INT !== "undefined" && INT && store.inside)); }
(function () {
if (typeof tsPrompt === "function") {
var tp = tsPrompt;
tsPrompt = function (html) { if (html && sofQuiet())
return tp(null); return tp.apply(this, arguments); };
}
if (typeof worldPrompt === "function") {
var wp = worldPrompt;
worldPrompt = function (html) { if (html && SOF.seated)
return wp(null); return wp.apply(this, arguments); };
}
})();
function sofFeet() { return camera.position.y - 1.72; }
function sofScanNow() {
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw);
var list = sofFind(P.x, P.z, sofFeet(), fx, fz);
SOF.scanAt = performance.now();
SOF.scanX = P.x;
SOF.scanZ = P.z;
list.forEach(function (s) { var dx = s.x - P.x, dz = s.z - P.z, dl = Math.hypot(dx, dz) || 1; s.score = s.d - 0.35 * ((dx * fx + dz * fz) / dl); });
list.sort(function (a, b) { return a.score - b.score; });
return list[0] || null;
}
var SOF_WORD = { chair: "a chair", throne: "a throne", bench: "a bench", seat: "a seat", sofa: "a sofa", bed: "a bed" };
function sofSit(s, how) { return __ZC(337, 1, this, arguments, new.target); }
function sofStand(how) { return __ZC(337, 2, this, arguments, new.target); }
function sofPose(g, how, x, z, floorY, h, fig) { return __ZC(337, 3, this, arguments, new.target); }
function sofUnpose(g) {
var b = g && g.children[0];
if (!b)
return;
b.rotation.x = 0;
b.position.y = 0;
b.position.z = 0;
if (typeof togPoseReset === "function")
try {
togPoseReset(g);
}
catch (e) { }
}
function sofSend(e) {
if (!(typeof togLive === "function" && togLive()) || typeof cityRpc !== "function")
return;
SOF.sendAt = performance.now();
cityRpc("live_send", { p_kind: "emote", p_to: null, p_place: togPlace(), p_body: { e: e } }).catch(function () { });
}
function sofCode() {
var S = SOF.seated;
if (!S)
return "seat.0";
var deg = Math.round(((S.fig * 180 / Math.PI) % 360 + 360) % 360) % 360, cm = Math.max(0, Math.min(99, Math.round(S.s.y - S.feet > 0 ? (S.s.y - S.feet) * 100 : 0)));
return "seat." + (S.how === "lie" ? "l" : "s") + "." + deg + "." + cm;
}
function sofSay() { if (SOF.seated)
sofSend(sofCode()); }
function sofHeard(id, kind) { return __ZC(337, 4, this, arguments, new.target); }
function sofOtherUp(id) {
var O = SOF.others[id];
if (!O)
return;
delete SOF.others[id];
var p = typeof presenceOthers !== "undefined" && presenceOthers[id], G = p && p.group;
if (G) {
G.userData.pose = undefined;
sofUnpose(G);
}
}
(function () {
if (typeof togEmoteOn !== "function")
return;
var on = togEmoteOn;
togEmoteOn = function (id, kind, name) {
if (/^seat\./.test(String(kind || ""))) {
if (id !== "me")
try {
sofHeard(id, String(kind));
}
catch (e) { }
return;
}
return on.apply(this, arguments);
};
})();
function sofCss() {
if (document.getElementById("sof-css"))
return;
var st = document.createElement("style");
st.id = "sof-css";
st.textContent = "#sof-chip,#sof-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(112px + env(safe-area-inset-bottom,0px));z-index:44;display:none;align-items:center;gap:6px;" +
"flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 32px);box-sizing:border-box;background:rgba(14,12,20,.86);border:1px solid #C9A868;border-radius:22px;padding:5px 7px 5px 12px;" +
"font:13px var(--sans,system-ui);color:#EDE4D0;box-shadow:0 6px 22px rgba(0,0,0,.45);transition:opacity .35s ease}" +
"#sof-chip button,#sof-bar button{background:#2A2234;color:#F2E6C8;border:1px solid #8A7A5A;border-radius:16px;padding:7px 12px;font:600 13px var(--sans,system-ui);cursor:pointer;min-height:34px}" +
"#sof-chip button:hover,#sof-bar button:hover{border-color:#E0C27A}" +
"#sof-chip .sof-k,#sof-bar .sof-k{color:#B9AE96;font-size:12px}" +
"body.touch #sof-chip .sof-k,body.touch #sof-bar .sof-k{display:none}" +
"body.touch #sof-chip{bottom:calc(258px + env(safe-area-inset-bottom,0px))}" +
"body.touch #sof-bar{bottom:auto;top:calc(204px + env(safe-area-inset-top,0px));flex-wrap:nowrap;padding:4px 6px;gap:4px}" +
"body.touch #sof-bar>span{display:none}body.touch #sof-bar button{padding:6px 9px;font-size:12.5px;white-space:nowrap}" +
"@media (max-height:500px){#sof-chip,#sof-bar{bottom:calc(10px + env(safe-area-inset-bottom,0px))}}";
document.head.appendChild(st);
}
function sofChip() {
if (!document.body)
return;
sofCss();
var el = document.getElementById("sof-chip"), s = SOF.near;
if (!s || SOF.seated) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sof-chip";
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-sof]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var n = SOF.near;
if (n)
sofSit(n, t.getAttribute("data-sof"));
});
document.body.appendChild(el);
}
var key = s.kind + "|" + (s.lie ? 1 : 0);
if (el.getAttribute("data-k") !== key) {
el.setAttribute("data-k", key);
el.innerHTML = '<span>' + (s.lie ? "🛏️" : "🪑") + ' ' + esc((SOF_WORD[s.kind] || "a seat").replace(/^a /, "A ")) + '</span>' +
'<button type="button" data-sof="sit">🪑 Sit</button>' + (s.lie ? '<button type="button" data-sof="lie">🛏️ Lie down</button>' : '') +
'<span class="sof-k">press E</span>';
}
el.style.display = "flex";
}
function sofBar() { return __ZC(337, 5, this, arguments, new.target); }
function sofIntent() { return __ZC(337, 6, this, arguments, new.target); }
function sofTickBefore(dt) {
var S = SOF.seated;
if (!S)
return;
var P = camera.position;
if (!sofCanSit()) {
sofStand("gone");
return;
}
if (Math.hypot(P.x - S.x, P.z - S.z) > 2.5) {
sofStand("gone");
return;
}
if (sofIntent() && performance.now() - S.at > 350) {
sofStand();
return;
}
P.x = S.x;
P.z = S.z;
}
function sofTickAfter(dt) {
var S = SOF.seated;
if (S) {
if (typeof meG !== "undefined" && meG) {
sofPose(meG, S.how, S.x, S.z, S.feet, S.s.y - S.feet, S.fig);
meG.userData.sofSeat = 1;
}
if (performance.now() - SOF.sendAt > 10000)
sofSay();
return;
}
if (typeof meG !== "undefined" && meG && meG.userData.sofSeat) {
meG.userData.sofSeat = 0;
meG.userData.pose = undefined;
sofUnpose(meG);
}
if (!sofCanSit()) {
if (SOF.near) {
SOF.near = null;
sofChip();
}
return;
}
var P = camera.position, mv = Math.hypot(P.x - SOF.lastX, P.z - SOF.lastZ);
SOF.lastX = P.x;
SOF.lastZ = P.z;
SOF.still = mv < 0.02 ? SOF.still + (dt || 0.016) : 0;
if (SOF.near && Math.hypot(P.x - SOF.near.x, P.z - SOF.near.z) > 1.6) {
SOF.near = null;
sofChip();
}
if (SOF.still < 0.3)
return;
var now = performance.now(), far = Math.hypot(P.x - SOF.scanX, P.z - SOF.scanZ) > 0.3;
if (!far && now - SOF.scanAt < 5000)
return;
var s = null;
try {
var ask = sofOtherAsks();
s = ask > 1 ? null : sofScanNow();
if (s && ask === 1 && s.d > 0.9)
s = null;
}
catch (e) {
s = null;
SOF.scanAt = now;
SOF.scanX = P.x;
SOF.scanZ = P.z;
if (window.console && !SOF.warned) {
SOF.warned = 1;
console.warn("[sit]", e);
}
}
if (!s) {
SOF.scanAt = now;
SOF.scanX = P.x;
SOF.scanZ = P.z;
}
SOF.near = s;
sofChip();
if (s && typeof VRM !== "undefined" && VRM.xr && typeof setStatus === "function" && SOF.told !== s.kind + Math.round(s.x * 2) + Math.round(s.z * 2)) {
SOF.told = s.kind + Math.round(s.x * 2) + Math.round(s.z * 2);
setStatus((s.lie ? "🛏️" : "🪑") + " " + (SOF_WORD[s.kind] || "a seat").replace(/^a /, "A ") + ". Pull the trigger to sit.");
}
}
function sofOthersTick() {
var now = performance.now();
Object.keys(SOF.others).forEach(function (id) {
var O = SOF.others[id], p = typeof presenceOthers !== "undefined" && presenceOthers[id], G = p && p.group;
if (!p || !G || now - O.at > 26000) {
sofOtherUp(id);
return;
}
var T = p.target;
if (O.tx === null && now - O.since > 4500) {
O.tx = T.x;
O.tz = T.z;
}
if (O.tx !== null && Math.hypot(T.x - O.tx, T.z - O.tz) > 0.8) {
sofOtherUp(id);
return;
}
sofPose(G, O.how, T.x, T.z, T.y || 0, O.h, O.fig);
});
}
(function () {
if (typeof avatarTick === "function") {
var at = avatarTick;
avatarTick = function (dt) {
try {
sofTickBefore(dt);
}
catch (e) { }
var r = at.apply(this, arguments);
try {
sofTickAfter(dt);
}
catch (e) {
if (window.console && !SOF.warned2) {
SOF.warned2 = 1;
console.warn("[sit]", e);
}
}
return r;
};
}
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function () { var r = pt.apply(this, arguments); try {
sofOthersTick();
}
catch (e) { } return r; };
}
if (typeof renderView === "function") {
var rv = renderView;
renderView = function () {
var S = SOF.seated;
if (!S || !camera || (typeof VRM !== "undefined" && VRM.xr))
return rv.apply(this, arguments);
var P = camera.position, x = P.x, y = P.y, z = P.z, ey;
if (S.how === "lie")
ey = S.s.y + (meView === "eyes" ? 0.3 : 1.0);
else
ey = S.s.y + SOF.EYE * (meG ? ((meG.scale.y || 1) * ((meG.children[0] && meG.children[0].scale.y) || 1)) : 1);
var ex = S.x, ez = S.z;
if (S.how === "lie" && S.s.lie && meView === "eyes") {
ex = S.x + S.s.lie.hx * 0.72;
ez = S.z + S.s.lie.hz * 0.72;
}
P.set(ex, ey, ez);
try {
return rv.apply(this, arguments);
}
finally {
P.set(x, y, z);
}
};
}
if (typeof togEmote === "function") {
var te = togEmote;
togEmote = function (kind) {
if (kind === "sit") {
if (SOF.seated)
return;
if (sofCanSit()) {
var s = null;
try {
s = sofScanNow();
}
catch (e) { }
if (s && sofSit(s, "sit"))
return;
}
}
return te.apply(this, arguments);
};
}
if (typeof pmBar === "function") {
var pb = pmBar;
pmBar = function () {
var r = pb.apply(this, arguments);
try {
var b = document.getElementById("pm-bar");
if (!b)
return r;
if (!b.getAttribute("data-sof")) {
b.setAttribute("data-sof", "1");
b.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-sofpm]") : null;
if (!t)
return;
if (SOF.seated)
sofStand();
else {
var s = SOF.near || sofScanNow();
if (s)
sofSit(s, "sit");
else if (typeof setStatus === "function")
setStatus("🪑 Nothing to sit on within reach here.");
}
setTimeout(function () { try {
pmBar();
}
catch (er) { } }, 0);
});
}
var x = b.querySelector("[data-sofpm]");
if (x)
x.remove();
var btn = document.createElement("button");
btn.className = "btn";
btn.setAttribute("data-sofpm", "1");
btn.textContent = SOF.seated ? "🧍 Stand up" : "🪑 Sit";
var done = b.querySelector('[data-pm="done"]');
b.insertBefore(btn, done || null);
}
catch (e) { }
return r;
};
}
})();
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || e.repeat || !SOF.seated)
return;
if (document.activeElement && /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName))
return;
e.preventDefault();
e.stopImmediatePropagation();
sofStand();
}, true);
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || e.repeat || SOF.seated)
return;
if (document.activeElement && /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName))
return;
if (e.defaultPrevented || !SOF.near || !sofCanSit())
return;
var el = document.getElementById("sof-chip");
if (!el || el.style.display === "none")
return;
if (sofOtherAsks() > 1)
return;
e.preventDefault();
sofSit(SOF.near, "sit");
});
