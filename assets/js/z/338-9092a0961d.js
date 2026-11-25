/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(338, function () {
"use strict";
return [
function (cells, cl, Mp, lab, feet, px, pz, fx, fz) {
var N = Mp.N, C = SOF.C, top = Mp.top, any = Mp.any, n = cells.length;
if (n < 5 || n > 460)
return null;
var tmin = 1e9, tmax = -1e9, sx = 0, sz = 0, sy = 0;
cells.forEach(function (c) { var t = top[c]; tmin = Math.min(tmin, t); tmax = Math.max(tmax, t); sx += c % N; sz += Math.floor(c / N); sy += t; });
if (tmax - tmin > 0.08)
return null;
var ci = sx / n, ck = sz / n, y = sy / n, h = y - feet;
var xx = 0, zz = 0, xz = 0;
cells.forEach(function (c) { var i = c % N - ci, k = Math.floor(c / N) - ck; xx += i * i; zz += k * k; xz += i * k; });
var ang = 0.5 * Math.atan2(2 * xz, xx - zz), ax = Math.cos(ang), az = Math.sin(ang), l0 = 1e9, l1 = -1e9, w0 = 1e9, w1 = -1e9;
cells.forEach(function (c) { var i = c % N - ci, k = Math.floor(c / N) - ck, a = i * ax + k * az, b = -i * az + k * ax; l0 = Math.min(l0, a); l1 = Math.max(l1, a); w0 = Math.min(w0, b); w1 = Math.max(w1, b); });
var len = (l1 - l0 + 1) * C, wid = (w1 - w0 + 1) * C;
if (wid > len) {
var tw = wid;
wid = len;
len = tw;
var tx = ax;
ax = -az;
az = tx;
}
if (wid < 0.24)
return null;
function inC(i, k) { return i >= 0 && k >= 0 && i < N && k < N && lab[k * N + i] === cl; }
var best = null, bd = 1e9;
if (len >= 1.0)
cells.forEach(function (c) {
var i = c % N, k = Math.floor(c / N);
for (var a = -1; a <= 1; a++)
for (var b = -1; b <= 1; b++)
if (!inC(i + a, k + b))
return;
var X = Mp.x0 + (i + 0.5) * C, Z = Mp.z0 + (k + 0.5) * C, d = Math.hypot(X - px, Z - pz);
if (d < bd) {
bd = d;
best = { x: X, z: Z };
}
});
if (!best) {
var md = 1e9;
cells.forEach(function (c) { var i = c % N, k = Math.floor(c / N), q = Math.hypot(i - ci, k - ck); if (q < md) {
md = q;
best = { x: Mp.x0 + (i + 0.5) * C, z: Mp.z0 + (k + 0.5) * C };
} });
if (md < 0.75)
best = { x: Mp.x0 + (ci + 0.5) * C, z: Mp.z0 + (ck + 0.5) * C };
}
var d = Math.hypot(best.x - px, best.z - pz);
if (d > 1.45)
return null;
var rx = len < 1.2 ? Mp.x0 + (ci + 0.5) * C : best.x, rz = len < 1.2 ? Mp.z0 + (ck + 0.5) * C : best.z;
var bins = new Float32Array(16), bv = [], si = Math.floor((rx - Mp.x0) / C), sk = Math.floor((rz - Mp.z0) / C);
for (var a = -7; a <= 7; a++)
for (var b = -7; b <= 7; b++) {
var i3 = si + a, k3 = sk + b;
if (i3 < 0 || k3 < 0 || i3 >= N || k3 >= N)
continue;
var c3 = k3 * N + i3;
if (lab[c3] === cl || any[c3] < y + 0.38)
continue;
var X3 = Mp.x0 + (i3 + 0.5) * C - rx, Z3 = Mp.z0 + (k3 + 0.5) * C - rz, d3 = Math.hypot(X3, Z3);
if (d3 > 0.65 || d3 < 0.05)
continue;
var bi = ((Math.round(Math.atan2(X3, Z3) / (Math.PI / 8)) % 16) + 16) % 16, w = (any[c3] - y - 0.3) / (d3 * d3);
bins[bi] += w;
bv.push([bi, X3 / d3 * w, Z3 / d3 * w, c3, w]);
}
var top3 = 0;
for (var q3 = 1; q3 < 16; q3++)
if (bins[q3] > bins[top3])
top3 = q3;
var bx = 0, bz = 0, bn = 0, gx = 0, gz = 0;
bv.forEach(function (v) {
var dd = Math.abs(v[0] - top3);
if (dd > 8)
dd = 16 - dd;
if (dd > 1)
return;
bx += v[1];
bz += v[2];
bn++;
gx += Mp.wnx[v[3]] * v[4];
gz += Mp.wnz[v[3]] * v[4];
});
var bl = Math.hypot(bx, bz), back = bn >= 2 && bl > 0.3 ? { x: bx / bl, z: bz / bl } : null;
if (back && Math.hypot(gx, gz) > 1e-6) {
var ph = 0.5 * Math.atan2(gz, gx), qx = Math.cos(ph), qz = Math.sin(ph);
if (qx * back.x + qz * back.z < 0) {
qx = -qx;
qz = -qz;
}
if (qx * back.x + qz * back.z > 0.7) {
back.x = qx;
back.z = qz;
}
}
var tall = h > 0.72;
if (tall) {
var edge = 0, skirt = 0;
cells.forEach(function (c) {
var i = c % N, k = Math.floor(c / N), out = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { if (!inC(i + d[0], k + d[1]) && i + d[0] >= 0 && k + d[1] >= 0 && i + d[0] < N && k + d[1] < N)
out.push((k + d[1]) * N + i + d[0]); });
if (!out.length)
return;
edge++;
var m = Mp.low[c];
out.forEach(function (o) { m = Math.min(m, Mp.low[o]); });
if (m < top[c] - 0.2)
skirt++;
});
var bedLike = len >= 1.6 && len <= 2.6 && wid >= 0.8 && edge > 0 && skirt >= edge * 0.5;
if (!bedLike && !(back && wid >= 0.45 && len < 1.3))
return null;
}
var fcx, fcz;
if (back) {
fcx = -back.x;
fcz = -back.z;
}
else {
fcx = px - best.x;
fcz = pz - best.z;
var fl = Math.hypot(fcx, fcz);
if (fl < 0.05) {
fcx = -fx;
fcz = -fz;
fl = Math.hypot(fcx, fcz) || 1;
}
fcx /= fl;
fcz /= fl;
}
var lie = null;
if (len >= 1.6 && wid >= 0.5) {
var cxw = Mp.x0 + (ci + 0.5) * C, czw = Mp.z0 + (ck + 0.5) * C;
var endSum = function (dx, dz) {
var e = -1e9, w0 = 1e9, w1 = -1e9;
cells.forEach(function (c) { var X = (c % N) - ci, Z = Math.floor(c / N) - ck, q = X * dx + Z * dz, r = -X * dz + Z * dx; e = Math.max(e, q); w0 = Math.min(w0, r); w1 = Math.max(w1, r); });
var sum = 0;
for (var u = 0.05; u <= 0.6; u += 0.1)
for (var v = w0 * C + 0.05; v <= w1 * C - 0.05; v += 0.1) {
var X = cxw + dx * (e * C + u) - dz * v, Z = czw + dz * (e * C + u) + dx * v, i = Math.floor((X - Mp.x0) / C), k = Math.floor((Z - Mp.z0) / C);
if (i < 0 || k < 0 || i >= N || k >= N)
continue;
var c = k * N + i;
sum += Math.max(0, Math.max(any[c], top[c]) - y);
}
return sum;
};
var dirs = [[ax, az], [-ax, -az]];
if (len < wid * 1.25)
dirs.push([-az, ax], [az, -ax]);
var sums = dirs.map(function (d) { return endSum(d[0], d[1]); }), bi2 = 0;
for (var q4 = 1; q4 < sums.length; q4++)
if (sums[q4] > sums[bi2])
bi2 = q4;
var second = 0;
sums.forEach(function (v, j) { if (j !== bi2)
second = Math.max(second, v); });
var hx = ax, hz = az;
if (sums[bi2] > 0.3 && sums[bi2] > 1.2 * second) {
hx = dirs[bi2][0];
hz = dirs[bi2][1];
}
else if ((px - cxw) * ax + (pz - czw) * az > 0) {
hx = -ax;
hz = -az;
}
lie = { x: cxw, z: czw, hx: hx, hz: hz };
}
var kind;
if (lie)
kind = back ? (Math.abs(back.x * ax + back.z * az) > 0.6 ? "bed" : "sofa") : (wid >= 0.85 ? "bed" : "bench");
else if (back)
kind = h > 0.62 ? "throne" : len > 1.2 ? "bench" : "chair";
else
kind = len > 1.1 ? "bench" : "seat";
if (kind === "sofa" && !(typeof store !== "undefined" && store.inside))
kind = "bench";
return { x: best.x, z: best.z, y: y, h: h, fx: fcx, fz: fcz, back: !!back, len: len, wid: wid, lie: lie, d: d, kind: kind };
},
function (s, how) {
if (!s || !sofCanSit())
return false;
how = how === "lie" && s.lie ? "lie" : "sit";
var P = camera.position;
var fig = Math.atan2(s.fx, s.fz);
var S = { s: s, how: how, back: { x: P.x, y: P.y, z: P.z }, feet: sofFeet(), fig: fig, at: performance.now() };
if (how === "lie") {
S.x = s.lie.x;
S.z = s.lie.z;
S.fig = Math.atan2(-s.lie.hx, -s.lie.hz);
}
else {
S.x = s.x;
S.z = s.z;
}
var inXr = typeof VRM !== "undefined" && VRM.xr;
if (how === "lie" && !inXr) {
yaw = Math.atan2(-s.lie.hx, -s.lie.hz);
pitch = -0.3;
}
if (inXr && how !== "lie")
yaw = S.fig + Math.PI;
SOF.seated = S;
SOF.near = null;
sofChip();
P.x = S.x;
P.z = S.z;
if (!(typeof VRM !== "undefined" && (VRM.xr || VRM.card)) && typeof meView !== "undefined" && meView === "eyes" && typeof setView === "function" && !(typeof TOG !== "undefined" && TOG.pm)) {
SOF.viewWas = "eyes";
try {
setView("behind");
}
catch (e) { }
}
else
SOF.viewWas = null;
if (typeof meG !== "undefined" && meG) {
meG.userData.pose = "sit";
meG.userData.sofSeat = 1;
}
if (typeof TOG !== "undefined" && TOG.emo && TOG.emo.me && TOG.emo.me.kind === "sit")
try {
togEmoteOff("me");
}
catch (e) { }
sofSay();
sofBar();
var word = SOF_WORD[s.kind] || "a seat";
if (typeof setStatus === "function")
setStatus(how === "lie" ? "🛏️ <b>You lie down on " + word + ".</b> Walk, or tap <b>Stand up</b>, to get up." : "🪑 <b>You sit on " + word + ".</b> Walk, or tap <b>Stand up</b>, to get up.");
if (typeof VRM !== "undefined" && VRM.xr && typeof setStatus === "function")
setStatus(how === "lie" ? "🛏️ You lie down. Pull the trigger, or walk, to get up." : "🪑 You sit. Pull the trigger, or walk, to stand.");
return true;
},
function (how) {
var S = SOF.seated;
if (!S)
return;
SOF.seated = null;
if (how !== "gone" && camera) {
camera.position.set(S.back.x, S.back.y, S.back.z);
}
if (typeof meG !== "undefined" && meG) {
if (meG.userData.sofSeat) {
meG.userData.pose = undefined;
meG.userData.sofSeat = 0;
}
sofUnpose(meG);
}
if (SOF.viewWas && typeof setView === "function" && typeof meView !== "undefined" && meView === "behind" && !(typeof TOG !== "undefined" && TOG.pm))
try {
setView(SOF.viewWas);
}
catch (e) { }
SOF.viewWas = null;
SOF.scanAt = 0;
SOF.told = null;
sofSend("seat.0");
sofBar();
},
function (g, how, x, z, floorY, h, fig) {
if (!g)
return;
var b = g.children[0], L = g.userData.limbs, sc = (g.scale.y || 1) * ((b && b.scale.y) || 1);
var hd = typeof togHD === "function" && togHD(g);
g.rotation.y = fig;
g.rotation.x = 0;
g.userData.pose = "sit";
if (how === "lie") {
var len = 0.85 * sc;
g.position.set(x + Math.sin(fig) * len, floorY + h, z + Math.cos(fig) * len);
if (b) {
b.rotation.set(-Math.PI / 2, 0, 0);
b.position.set(0, 0.13 * sc, 0);
}
if (L) {
L.ll.rotation.x = 0;
L.rl.rotation.x = 0;
L.la.rotation.x = 0;
L.ra.rotation.x = 0;
L.la.rotation.z = -0.12;
L.ra.rotation.z = 0.12;
}
if (hd) {
g.userData.pose = undefined;
var B = hd.sofLegs;
if (!B || B.m !== hd.model) {
B = hd.sofLegs = { m: hd.model };
hd.model.traverse(function (o) { if (o.isBone && /^(thigh|calf|foot)_[lr]$/.test(o.name))
B[o.name] = o; });
}
if (B.thigh_l && B.calf_l && B.foot_l && B.thigh_r && B.calf_r && B.foot_r && typeof togAim === "function") {
g.updateMatrixWorld(true);
var dl = new THREE.Vector3(Math.sin(fig), -0.04, Math.cos(fig));
["l", "r"].forEach(function (sd) { togAim(B["thigh_" + sd], B["calf_" + sd], dl, 1); togAim(B["calf_" + sd], B["foot_" + sd], dl, 1); });
}
}
return;
}
g.position.set(x, floorY + h - SOF.OFF * sc, z);
if (b) {
b.rotation.x = 0;
b.rotation.z = 0;
b.position.x = 0;
b.position.z = 0;
b.position.y = hd ? 0 : -0.42;
}
if (L && !hd) {
L.ll.rotation.x = -1.45;
L.rl.rotation.x = -1.45;
if (Math.abs(L.la.rotation.z + 0.07) < 0.01 && Math.abs(L.ra.rotation.z - 0.07) < 0.01) {
L.la.rotation.x = -0.5;
L.ra.rotation.x = -0.5;
}
}
},
function (id, kind) {
var m = /^seat\.([sl0])(?:\.(\d{1,3})\.(\d{1,2}))?$/.exec(kind);
if (!m)
return false;
if (m[1] === "0" || !m[2]) {
sofOtherUp(id);
return true;
}
var O = SOF.others[id] || (SOF.others[id] = {});
var was = O.how;
O.how = m[1] === "l" ? "lie" : "sit";
O.fig = (+m[2]) * Math.PI / 180;
O.h = (+m[3]) / 100;
O.at = performance.now();
if (!was) {
O.since = O.at;
O.tx = null;
}
return true;
},
function () {
if (!document.body)
return;
sofCss();
var el = document.getElementById("sof-bar"), S = SOF.seated;
if (!S) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sof-bar";
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-sofb]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var a = t.getAttribute("data-sofb"), Q = SOF.seated;
if (a === "up")
sofStand();
else if (a === "lie" && Q) {
var s = Q.s, bk = Q.back;
sofStand("swap");
camera.position.set(bk.x, bk.y, bk.z);
sofSit(s, "lie");
}
else if (a === "sit" && Q) {
var s2 = Q.s, bk2 = Q.back;
sofStand("swap");
camera.position.set(bk2.x, bk2.y, bk2.z);
sofSit(s2, "sit");
}
else if (a === "photo" && typeof pmOpen === "function")
pmOpen();
else if (a === "emotes" && typeof togxOpen === "function")
togxOpen(true);
});
document.body.appendChild(el);
}
el.innerHTML = '<span>' + (S.how === "lie" ? "🛏️ Lying down" : "🪑 Sitting") + '</span>' +
'<button type="button" data-sofb="up">Stand up</button>' +
(S.s.lie ? (S.how === "lie" ? '<button type="button" data-sofb="sit">🪑 Sit up</button>' : '<button type="button" data-sofb="lie">🛏️ Lie down</button>') : '') +
(typeof togxOpen === "function" ? '<button type="button" data-sofb="emotes">😊 Emotes</button>' : '') +
(typeof pmOpen === "function" ? '<button type="button" data-sofb="photo">📸 Photo</button>' : '');
el.style.display = "flex";
},
function () {
if (typeof keys !== "undefined" && keys && (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD || keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight || keys.Space))
return true;
try {
if (typeof joyInput === "function" && joyInput())
return true;
}
catch (e) { }
try {
if (typeof padInput === "function" && padInput())
return true;
}
catch (e) { }
return false;
}
];
});
