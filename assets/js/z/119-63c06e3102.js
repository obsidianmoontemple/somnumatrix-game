/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(119, function () {
"use strict";
return [
function () {
if (typeof ugFind === "function")
ugFind();
if (UG2.line && UG2.line.n === UNDERGROUND.length)
return UG2.line;
var by = {};
UNDERGROUND.forEach(function (s) { (by[s.ring] = by[s.ring] || []).push(s); });
var rings = TR_RINGS.map(function (r) { return r[0]; }), out = [], back = [];
rings.forEach(function (r) { var L = by[r] || []; if (L[0])
out.push(L[0]); if (r === "markets" && typeof MALL_STOP !== "undefined")
out.push(MALL_STOP); });
rings.slice().reverse().forEach(function (r) { var L = by[r] || []; if (L[1])
back.push(L[1]); });
var list = out.concat(back);
UG2.line = { n: UNDERGROUND.length, list: list };
return UG2.line;
},
function (dt) {
UG2.liveAt -= dt;
if (UG2.liveBack > 0)
UG2.liveBack -= dt;
if (UG2.liveAt > 0 || UG2.liveBusy || UG2.liveBack > 0)
return;
UG2.liveAt = 2;
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function") {
ugFareLoad();
return;
}
UG2.liveBusy = true;
cityRpc("ug_line_state", {}).then(function (o) {
UG2.liveBusy = false;
if (!o)
return;
var now = ugNow(), live = {};
(o.services || []).forEach(function (r) {
var k = ugTrainKey(+r.d, +r.run);
live[k] = { d: +r.d, run: +r.run, from: +r.from_i, t0: +r.t0, cur: +r.cur, s: +r.s, v: +r.v, doors: !!r.doors, guard: !!r.guard, ra: (r.ra === null || r.ra === undefined) ? null : +r.ra,
recv: now - (+r.age || 0), driver: r.driver || "a dreamer", mine: !!r.mine, key: k };
});
UG2.live = live;
var holds = {};
(o.holds || []).forEach(function (h) { holds[h.station + "|" + h.d] = true; });
UG2.holds = holds;
UG2.posts = o.posts || [];
UG2.ann = o.ann || [];
if (typeof o.fare === "number") {
UG2.fare = o.fare;
UG2.fareAt = Date.now();
}
}).catch(function () { UG2.liveBusy = false; UG2.liveBack = 30; ugFareLoad(); });
},
function () {
if (Date.now() - UG2.fareAt < 300000)
return;
UG2.fareAt = Date.now();
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl || typeof fetch !== "function")
return;
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/ug_fare", { method: "POST", headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: "{}" })
.then(function (r) { return r.ok ? r.json() : null; }).then(function (f) { if (typeof f === "number")
UG2.fare = f; }).catch(function () { });
},
function (text, sub, w, h, bg, fg) {
var c = document.createElement("canvas");
c.width = w || 512;
c.height = h || 128;
var x = c.getContext("2d");
x.fillStyle = bg || "#F4F0E6";
x.fillRect(0, 0, c.width, c.height);
x.fillStyle = fg || "#1A1C22";
x.textAlign = "center";
x.textBaseline = "middle";
x.font = "bold " + Math.round(c.height * 0.42) + "px Georgia, serif";
x.fillText(text, c.width / 2, c.height * (sub ? 0.4 : 0.52));
if (sub) {
x.font = Math.round(c.height * 0.2) + "px Georgia, serif";
x.fillText(sub, c.width / 2, c.height * 0.78);
}
var t = new THREE.CanvasTexture(c);
return t;
},
function (text) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 256;
var x = c.getContext("2d");
x.clearRect(0, 0, 512, 256);
x.strokeStyle = "#C03A2E";
x.lineWidth = 40;
x.beginPath();
x.ellipse(256, 128, 200, 100, 0, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#1E2F6E";
x.fillRect(10, 98, 492, 60);
x.fillStyle = "#fff";
x.font = "bold 34px Georgia, serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text.toUpperCase(), 256, 129);
return new THREE.CanvasTexture(c);
},
function () {
if (UG2.g)
return;
var G = new THREE.Group();
function M(c, e) { var m = new THREE.MeshLambertMaterial({ color: c }); if (e) {
m.emissive = new THREE.Color(e);
m.emissiveIntensity = 0.9;
} return m; }
function box(w, h, d, x, y, z, mat, parent) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); (parent || G).add(m); return m; }
var tile = M(0xEDE6D2), band = M(UG_LINECOL), floor = M(0xA59C8C), edge = M(0xE8C23A), dark = M(0x1C1D22), rail = M(0x8A8E94), sleeper = M(0x3A2E26);
var L = 96, half = L / 2;
box(L, 0.3, UG_PLAT * 2, 0, -0.15, 0, floor);
box(L, 0.04, 0.35, 0, 0.01, UG_PLAT - 0.2, edge);
box(L, 0.04, 0.35, 0, 0.01, -UG_PLAT + 0.2, edge);
[1, -1].forEach(function (sd) {
box(L + 60, 0.2, 5, 0, -1.25, sd * UG_TRACKZ, dark);
box(L + 60, 0.15, 0.12, 0, -1.05, sd * UG_TRACKZ - 0.72, rail);
box(L + 60, 0.15, 0.12, 0, -1.05, sd * UG_TRACKZ + 0.72, rail);
for (var k = -half - 30; k < half + 30; k += 1.6)
box(0.25, 0.08, 2.2, k, -1.13, sd * UG_TRACKZ, sleeper);
box(L + 60, 0.5, 0.2, 0, -0.85, sd * (UG_PLAT + 0.1), dark);
box(L + 60, 9, 0.4, 0, 3, sd * (UG_TRACKZ + 3.1), tile);
box(L + 60, 0.6, 0.42, 0, 3.4, sd * (UG_TRACKZ + 3.08), band);
});
var ceil = new THREE.MeshLambertMaterial({ color: 0xE6DFCB, side: THREE.DoubleSide });
box(L + 64, 0.4, 2 * (UG_TRACKZ + 3.4), 0, 7.4, 0, ceil);
[1, -1].forEach(function (sd) { var c = new THREE.Mesh(new THREE.BoxGeometry(L + 64, 0.3, 3.2), ceil); c.position.set(0, 6.9, sd * (UG_TRACKZ + 1.8)); c.rotation.x = sd * 0.45; G.add(c); });
[1, -1].forEach(function (e) {
box(0.5, 9, 2 * (UG_TRACKZ - 3.2), e * (half + 32), 3, 0, dark);
[1, -1].forEach(function (sd) {
box(0.5, 3.1, 6.6, e * (half + 32), 5.95, sd * UG_TRACKZ, dark);
var arch = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.22, 6, 20, Math.PI), M(0x3A3C42));
arch.position.set(e * (half + 31.7), 1.2, sd * UG_TRACKZ);
arch.rotation.y = Math.PI / 2;
G.add(arch);
});
});
var lampM = M(0xFFF6DA, 0xFFF2C8);
for (var x = -half; x <= half; x += 8) {
box(1.6, 0.12, 0.5, x, 6.9, 0, lampM);
box(1.6, 0.12, 0.5, x, 6.4, 4.6, lampM);
box(1.6, 0.12, 0.5, x, 6.4, -4.6, lampM);
}
[1, -1].forEach(function (e) {
box(0.4, 9, UG_PLAT * 2 + 1, e * (half + 0.2), 3, 0, tile);
box(0.45, 3.2, 3.2, e * (half), 1.6, 0, dark);
var wo = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.8), new THREE.MeshBasicMaterial({ map: ugTex("Way out", "Up to the street", 512, 128, "#1E2F6E", "#FFFFFF") }));
wo.position.set(e * (half - 0.3), 3.9, 0);
wo.rotation.y = e > 0 ? -Math.PI / 2 : Math.PI / 2;
G.add(wo);
});
var wood = M(0x6A4A30);
for (var bx = -36; bx <= 36; bx += 18) {
box(3.2, 0.12, 0.6, bx, 0.48, 0, wood);
box(3.2, 0.6, 0.1, bx, 0.8, 0.28, wood);
box(0.1, 0.48, 0.5, bx - 1.5, 0.24, 0, dark);
box(0.1, 0.48, 0.5, bx + 1.5, 0.24, 0, dark);
}
UG2.signs = [];
[1, -1].forEach(function (sd) { for (var sx = -40; sx <= 40; sx += 20) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.2), new THREE.MeshBasicMaterial({ transparent: true }));
p.position.set(sx, 2.6, sd * (UG_TRACKZ + 2.85));
p.rotation.y = sd > 0 ? Math.PI : 0;
G.add(p);
UG2.signs.push(p);
} });
var bc = document.createElement("canvas");
bc.width = 1024;
bc.height = 256;
UG2.boardCtx = bc.getContext("2d");
UG2.boardTex = new THREE.CanvasTexture(bc);
var board = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.5), new THREE.MeshBasicMaterial({ map: UG2.boardTex }));
board.position.set(0, 4.4, 0.06);
G.add(board);
var board2 = board.clone();
board2.rotation.y = Math.PI;
board2.position.z = -0.06;
G.add(board2);
box(6.2, 1.7, 0.1, 0, 4.4, 0, dark);
box(0.08, 2.2, 0.08, -2.6, 6.0, 0, dark);
box(0.08, 2.2, 0.08, 2.6, 6.0, 0, dark);
G.visible = false;
scene.add(G);
UG2.g = G;
UG2.train = [ugTrainBuild(0), ugTrainBuild(1)];
UG2.tun = [ugTunnelBuild(0), ugTunnelBuild(1)];
UG2.tunnel = UG2.tun[0];
},
function (d) {
var T = new THREE.Group(), body = new THREE.MeshLambertMaterial({ color: 0xC9CCD2 }), red = new THREE.MeshLambertMaterial({ color: UG_LINECOL }), glass = new THREE.MeshLambertMaterial({ color: 0x2A3A4A, transparent: true, opacity: 0.45 }), inside = new THREE.MeshLambertMaterial({ color: 0xDCD6C6, side: THREE.BackSide }), seat = new THREE.MeshLambertMaterial({ color: 0x2E4A8A }), light = new THREE.MeshLambertMaterial({ color: 0xFFF6DA, emissive: 0xFFF0C0, emissiveIntensity: 0.9 }), pole = new THREE.MeshLambertMaterial({ color: 0xE8C23A }), hide = new THREE.MeshBasicMaterial({ visible: false }), desk = new THREE.MeshLambertMaterial({ color: 0x2A2C32 }), lamp = new THREE.MeshBasicMaterial({ color: 0xFFF4D0 });
T.userData.doors = [];
for (var c = 0; c < UG_CARS; c++) {
var cx = (c - (UG_CARS - 1) / 2) * (UG_CARLEN + 0.6), car = new THREE.Group();
car.position.x = cx;
T.add(car);
function b(w, h, dd, x, y, z, m) { var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, dd), m); me.position.set(x, y, z); car.add(me); return me; }
var shell = new THREE.Mesh(new THREE.BoxGeometry(UG_CARLEN, 2.7, 2.9), [hide, hide, inside, inside, inside, inside]);
shell.position.set(0, 1.35, 0);
car.add(shell);
b(UG_CARLEN, 0.18, 2.95, 0, 2.75, 0, body);
b(UG_CARLEN, 0.5, 2.95, 0, -0.15, 0, body);
[1, -1].forEach(function (sd) {
for (var k = 0; k < 4; k++) {
var px = -UG_CARLEN / 2 + UG_CARLEN * (k + 0.5) / 4;
b(UG_CARLEN / 4 - 1.6, 0.9, 0.08, px, 0.35, sd * 1.47, body);
b(UG_CARLEN / 4 - 1.6, 0.95, 0.06, px, 1.35, sd * 1.48, glass);
b(UG_CARLEN / 4 - 1.6, 0.6, 0.08, px, 2.3, sd * 1.47, body);
b(UG_CARLEN / 4 - 1.6, 0.16, 0.09, px, 0.9, sd * 1.49, red);
}
for (var dk = 0; dk < 4; dk++) {
var dx = -UG_CARLEN / 2 + UG_CARLEN * dk / 4 + (dk === 0 ? 0.8 : 0);
if (dk === 0)
continue;
var l = b(0.78, 2.3, 0.07, dx - 0.39, 1.15, sd * 1.47, body), r = b(0.78, 2.3, 0.07, dx + 0.39, 1.15, sd * 1.47, body);
l.userData.home = dx - 0.39;
r.userData.home = dx + 0.39;
T.userData.doors.push({ car: c, x: cx + dx, side: sd, l: l, r: r });
}
});
[1, -1].forEach(function (sd) { for (var sk = 0; sk < 3; sk++) {
b(3.2, 0.45, 0.6, -UG_CARLEN / 2 + 2.2 + sk * (UG_CARLEN / 4) + 1.6, 0.45, sd * 1.05, seat);
} });
for (var lk = -UG_CARLEN / 2 + 2; lk < UG_CARLEN / 2; lk += 3)
b(1.2, 0.06, 0.3, lk, 2.62, 0, light);
for (var pk = -UG_CARLEN / 2 + 3; pk < UG_CARLEN / 2; pk += 4.2)
b(0.06, 2.5, 0.06, pk, 1.25, 0, pole);
if (c === 0 || c === UG_CARS - 1) {
var e = c === 0 ? -1 : 1, ex = e * UG_CARLEN / 2;
b(0.3, 1.15, 2.9, ex, 0.55, 0, body);
b(0.3, 0.5, 2.9, ex, 2.48, 0, body);
b(0.3, 1.1, 0.45, ex, 1.7, 1.22, body);
b(0.3, 1.1, 0.45, ex, 1.7, -1.22, body);
b(0.08, 1.0, 2.0, ex, 1.7, 0, glass);
b(0.34, 0.5, 2.92, ex, 0.4, 0, red);
b(0.6, 0.9, 1.4, ex - e * 0.55, 0.75, 0.45, desk);
b(0.1, 0.18, 0.3, ex + e * 0.12, 0.75, 0.95, lamp);
b(0.1, 0.18, 0.3, ex + e * 0.12, 0.75, -0.95, lamp);
}
}
T.visible = false;
T.userData.d = d;
scene.add(T);
return T;
},
function (d) {
if (UG2.cab[d] !== null && UG2.cab[d] !== undefined)
return UG2.cab[d];
UG2.cab[d] = false;
try {
var id = "ugcab" + d, look = (typeof randomLook === "function") ? randomLook(id, "human") : {};
if (typeof csLookFill === "function")
try {
csLookFill(look, id);
}
catch (e) { }
look.top = 0x1E2F6E;
look.bottom = 0x1A1C22;
var g = buildFigure({ id: "__ugcab_" + d, archetype: "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
var dir = d === 0 ? 1 : -1;
g.position.set(dir * (UG_TRAINHALF - 1.5), 0, 0.45);
g.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
UG2.train[d].add(g);
UG2.cab[d] = g;
}
catch (e) {
UG2.cab[d] = false;
}
return UG2.cab[d];
},
function (d) {
var G = new THREE.Group(), L = UG_SEGLEN, tz = UG_TRACKZ;
var wall = new THREE.MeshLambertMaterial({ color: 0x2A2B30, side: THREE.BackSide }), bed = new THREE.MeshLambertMaterial({ color: 0x1C1D22 }), rail = new THREE.MeshLambertMaterial({ color: 0x8A8E94 });
var sc = document.createElement("canvas");
sc.width = 64;
sc.height = 16;
var sx = sc.getContext("2d");
sx.fillStyle = "#1C1D22";
sx.fillRect(0, 0, 64, 16);
sx.fillStyle = "#3A2E26";
sx.fillRect(0, 0, 10, 16);
var st = new THREE.CanvasTexture(sc);
st.wrapS = st.wrapT = THREE.RepeatWrapping;
[-1, 0].forEach(function (p) {
var a = p * L + 78, bnd = (p + 1) * L - 78, len = bnd - a, mid = (a + bnd) / 2;
var tube = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.3, len, 20, 1, true), wall);
tube.rotation.z = Math.PI / 2;
tube.position.set(mid, 1.2, tz);
G.add(tube);
var tx = st.clone();
tx.needsUpdate = true;
tx.repeat.set(len / 1.6, 1);
var bd = new THREE.Mesh(new THREE.BoxGeometry(len, 0.2, 3), new THREE.MeshLambertMaterial({ map: tx }));
bd.position.set(mid, -1.2, tz);
G.add(bd);
[-0.72, 0.72].forEach(function (o) { var r = new THREE.Mesh(new THREE.BoxGeometry(len, 0.15, 0.12), rail); r.position.set(mid, -1.05, tz + o); G.add(r); });
});
var n = 0, xs = [];
for (var x = -L + 90; x < L - 80; x += 20) {
if (Math.abs(x) < 80)
continue;
xs.push(x);
}
var lm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.8, 0.1, 0.1), new THREE.MeshBasicMaterial({ color: 0xFFD890 }), xs.length * 2), M4 = new THREE.Matrix4();
xs.forEach(function (x) { M4.makeTranslation(x, 2.5, tz - 2.9); lm.setMatrixAt(n++, M4); M4.makeTranslation(x, 2.5, tz + 2.9); lm.setMatrixAt(n++, M4); });
G.add(lm);
G.userData.sigs = [];
function signal(x, role, pl) {
var s = new THREE.Group();
s.position.set(x, 0, tz + 2.05);
var post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.6, 0.12), new THREE.MeshLambertMaterial({ color: 0x222428 }));
post.position.y = 0.1;
s.add(post);
var head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 0.45), new THREE.MeshLambertMaterial({ color: 0x101114 }));
head.position.y = 1.6;
s.add(head);
var lamps = [0xFF3A2A, 0xFFB43C, 0x4CE06A].map(function (c, i) {
var m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: 0x202020 }));
m.position.set(-0.17, 1.92 - i * 0.32, 0);
m.userData.on = c;
s.add(m);
return m;
});
var plate = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), new THREE.MeshBasicMaterial({ map: ugTex(role === "start" ? "S" : (role === "home" ? "H" : "B"), null, 128, 80, "#F4F0E6", "#1A1C22") }));
plate.position.set(-0.2, 0.85, 0);
plate.rotation.y = -Math.PI / 2;
s.add(plate);
G.add(s);
var o = { x: x, role: role, pl: pl, lamps: lamps, aspect: "" };
G.userData.sigs.push(o);
return o;
}
function board(x, text, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), new THREE.MeshBasicMaterial({ map: ugTex(text, null, 128, 100, col || "#F4F0E6", "#1A1C22") }));
m.position.set(x, 1.4, tz + 2.2);
m.rotation.y = -Math.PI / 2;
G.add(m);
return m;
}
[-1, 0, 1].forEach(function (pl) { signal(pl * L + 56, "start", pl); board(pl * L + UG_TRAINHALF, "STOP", "#E8C23A"); });
[0, 1].forEach(function (pl) { signal(pl * L - 160, "home", pl); signal(pl * L - L * 0.6, "block", pl); });
[-1, 0].forEach(function (p) { var o = p * L; ugZones().forEach(function (z) { if (z[0] > -1e8)
board(o + z[0], String(z[2])); }); });
G.rotation.y = d ? Math.PI : 0;
G.visible = false;
scene.add(G);
return G;
},
function () {
var t = ugNow();
UG2.tun.forEach(function (G, d) {
if (!G || !G.visible)
return;
var base = ugPos(UG2.at, d);
G.userData.sigs.forEach(function (s) {
var st = ugStationAt(base + s.pl, d), a = null;
if (typeof ugDriveAspect === "function")
a = ugDriveAspect(d, s.role, st, s.pl);
if (!a) {
if (s.role === "start") {
var since = ugSince(st, d, t);
a = (since >= UG_DWELL - 1 && since < UG_DWELL + 20 && !ugHeld(st, d)) ? "G" : "R";
}
else if (s.role === "home")
a = "Y";
else
a = "G";
}
if (a === s.aspect)
return;
s.aspect = a;
s.lamps.forEach(function (m, i) { var on = (a === "R" && i === 0) || (a === "Y" && i === 1) || (a === "G" && i === 2); m.material.color.setHex(on ? m.userData.on : 0x202020); });
});
});
},
function () {
if (!UG2.boardCtx || UG2.at < 0)
return;
var x = UG2.boardCtx, t = ugNow(), i = UG2.at;
x.fillStyle = "#0B0C10";
x.fillRect(0, 0, 1024, 256);
x.font = "bold 46px monospace";
x.textBaseline = "middle";
[0, 1].forEach(function (d, k) {
var nx = ugNextIn(i, d, t), to = ugName(ugNextStop(i, d)), y = 72 + k * 110, near = ugTrainNear(i, d, t);
if (near && near.live) {
nx = near.live.doors && Math.abs(near.x) < 6 ? 0 : Math.max(1, (Math.abs(near.x)) / Math.max(4, near.live.v || 8));
}
x.fillStyle = "#FFB43C";
x.fillText((k + 1) + " " + UG_RAIL_NAMES[d].replace(" Rail", "") + " → " + to.slice(0, 22), 24, y);
x.fillStyle = nx <= 0 ? "#8FCB8A" : "#FFB43C";
x.textAlign = "right";
x.fillText(nx <= 0 ? "At platform" : (nx < 60 ? Math.ceil(nx) + " s" : Math.ceil(nx / 60) + " min"), 1000, y);
x.textAlign = "left";
});
UG2.boardTex.needsUpdate = true;
},
function (k) {
if (UG2.pool[k])
return UG2.pool[k];
var id = "ugp" + k + "_" + ((Date.now() / 1000 | 0) % 997);
var look = (typeof randomLook === "function") ? randomLook(id, "human") : {};
if (typeof csLookFill === "function")
try {
csLookFill(look, id);
}
catch (e) { }
var g = buildFigure({ id: "__ug_" + k, archetype: "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
g.visible = false;
scene.add(g);
UG2.pool[k] = { g: g, x: 0, z: 0, tx: 0, tz: 0, state: "wait", side: k % 2, phase: k * 0.7 };
return UG2.pool[k];
},
function () {
var n = ugCrowdSize();
for (var k = 0; k < 24; k++) {
var p = k < n ? ugPerson(k) : UG2.pool[k];
if (!p)
continue;
if (k >= n) {
p.g.visible = false;
p.state = "gone";
continue;
}
p.state = "wait";
p.side = k % 2;
p.x = -40 + ((k * 37) % 80) + ((k * 13) % 7) * 0.3;
p.z = (p.side ? -1 : 1) * (1.2 + ((k * 7) % 5) * 0.45);
p.tx = p.x;
p.tz = p.z;
p.g.visible = true;
}
},
function (dt) {
var t = ugNow(), i = UG2.at, far = Math.abs(camera.position.x - UG2.cx) > 260;
UG2.pool.forEach(function (p, k) {
if (!p || p.state === "gone")
return;
if (far) {
p.g.visible = false;
return;
}
var d = p.side, sd = d === 0 ? 1 : -1, T = UG2.train[d], open = (T && T.visible && Math.abs(T.position.x - UG2.cx) < 6) ? (T.userData.open || 0) : 0, doorsOpen = open > 0.6;
if (p.state !== "aboard")
p.g.visible = true;
if (p.state === "wait" && doorsOpen && !(UG2.ride && UG2.ride.d === d && !UG2.ride.cab)) {
var dr = ugNearestDoor(p.x, d);
if (dr) {
p.state = "board";
p.tx = dr.x;
p.tz = sd * (UG_TRACKZ - 0.2);
}
}
if (p.state === "board" && !doorsOpen) {
p.state = "wait";
p.x = -40 + ((k * 37 + (t | 0)) % 80);
p.z = sd * (1.2 + (k % 5) * 0.45);
p.tx = p.x;
p.tz = p.z;
}
var dx = p.tx - p.x, dz = p.tz - p.z, dd = Math.hypot(dx, dz), sp = 1.5 * dt, walking = dd > 0.05;
if (walking) {
var f = Math.min(1, sp / dd);
p.x += dx * f;
p.z += dz * f;
}
if (p.state === "board" && dd < 0.2) {
p.state = "aboard";
p.g.visible = false;
p.at = t;
}
if (p.state === "aboard" && !doorsOpen && t - (p.at || 0) > 12) {
p.state = "wait";
p.g.visible = true;
p.x = (d ? -1 : 1) * 44;
p.z = sd * (1 + (k % 4) * 0.6);
p.tx = -40 + ((k * 53) % 80);
p.tz = p.z;
}
p.g.position.set(UG2.cx + p.x, 0, UG2.cz + p.z);
p.g.rotation.y = walking ? Math.atan2(dx, dz) : (sd > 0 ? 0 : Math.PI);
var L = p.g.userData.limbs;
if (L) {
var s = walking ? Math.sin(t * 7 + k) * 0.5 : 0;
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = -s * 0.6;
if (L.ra)
L.ra.rotation.x = s * 0.6;
}
});
},
function (i, d, t) {
var dir = d === 0 ? 1 : -1, best = null;
Object.keys(UG2.live).forEach(function (k) {
var L = UG2.live[k];
if (L.d !== d)
return;
var s = ugLiveS(L), x = null;
if (L.cur === i)
x = dir * s;
else if (ugNextStop(L.cur, d) === i)
x = -dir * (UG_SEGLEN - s);
if (x !== null && Math.abs(x) < 420 && (!best || Math.abs(x) < Math.abs(best.x)))
best = { x: x, open: L.doors ? 1 : 0, key: k, live: L };
});
if (best)
return best;
var since = ugSince(i, d, t), x = null, open = 0, tArr;
if (since < UG_SEG) {
tArr = t - since;
if (since < UG_DWELL) {
x = 0;
open = Math.max(0, Math.min(1, Math.min(since - 2, UG_DWELL - 3 - since) / 1.2));
}
else
x = dir * ugTT(since - UG_DWELL);
}
else {
tArr = t + UG_HEAD - since;
var r = UG_RUN - (UG_HEAD - since);
if (r > 0)
x = -dir * (UG_SEGLEN - ugTT(r));
}
var key = ugTrainKey(d, ugRunOf(i, d, tArr));
if (UG2.live[key])
return null;
if (x === null || Math.abs(x) > 420)
return null;
return { x: x, open: open, key: key, live: null, since: since, tArr: tArr };
},
function (dt) {
var t = ugNow(), i = UG2.at;
[0, 1].forEach(function (d) {
var T = UG2.train[d];
if (!T)
return;
if (UG2.ride && UG2.ride.d === d)
return;
if (typeof ugjPossession === "function" && ugjPossession(d)) {
T.visible = false;
return;
}
var n = ugTrainNear(i, d, t);
if (!n) {
T.visible = false;
T.userData.key = null;
return;
}
T.visible = true;
T.userData.key = n.key;
T.position.set(UG2.cx + n.x, 0, UG2.cz + (d === 0 ? 1 : -1) * UG_TRACKZ);
ugDoorsTo(T, n.live ? (n.open) : n.open, d === 0 ? -1 : 1, dt, !n.live);
var cf = ugCabFigure(d);
if (cf)
cf.visible = !n.live;
});
},
function (from) {
var i = ugIndexOf(from);
if (i < 0)
return setStatus("That station is not on the line.");
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to ride: the fare comes from your purse.");
return;
}
setStatus("Paying the fare at the barrier…");
cityRpc("ug_enter", { p_station: from.key }).then(function (o) {
if (o !== "ok") {
setStatus(esc(String(o)));
return;
}
if (typeof refreshStanding === "function")
refreshStanding();
ug2Down(i);
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (i) {
ugBuild();
if (typeof MALL !== "undefined" && MALL.on && typeof mallLeave === "function")
mallLeave();
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
UG2.on = true;
UG2.mode = "platform";
UG2.ride = null;
ugPlaceAt(i);
UG2.g.visible = true;
ugCrowdSet();
camera.position.set(UG2.cx - 44, 1.72, UG2.cz);
yaw = -Math.PI / 2;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof walkResume !== "undefined")
walkResume = null;
if (typeof playTone === "function")
playTone(660, 0.4);
UG2.liveAt = 0;
setStatus("<b>" + esc(ugName(i)) + "</b> — down on the platform. Wait for your train: the board shows when it is due.");
},
function (d, cab) {
var t = ugNow(), i = UG2.at, n = ugTrainNear(i, d, t);
if (!n || Math.abs(n.x) > 6)
return false;
var R;
if (n.live) {
if (!n.live.doors)
return false;
R = { d: d, from: n.live.from, t0: n.live.t0, key: n.key, wasLive: true, lastLive: t };
}
else {
if (n.since >= UG_DWELL - 3)
return false;
R = { d: d, from: i, t0: t - n.since, key: n.key };
}
R.seg = i;
R.base = UG2.cx;
R.lastPos = "";
R.cab = cab || null;
UG2.ride = R;
UG2.mode = "riding";
var T = UG2.train[d], P = camera.position;
if (!cab) {
camera.position.z = T.position.z;
camera.position.x = Math.max(T.position.x - UG_CARS * UG_CARLEN / 2 + 1, Math.min(T.position.x + UG_CARS * UG_CARLEN / 2 - 1, P.x));
setStatus("<b>Aboard</b> — " + UG_RAIL_NAMES[d] + (n.live ? " (driven by " + esc(n.live.driver) + ")" : "") + ". Next stop: <b>" + esc(ugName(ugNextStop(i, d))) + "</b>. When the doors open where you want, step off (or press E).");
}
if (typeof playTone === "function")
playTone(520, 0.3);
return true;
},
function (why) {
var R = UG2.ride;
if (!R)
return;
var sd = R.d === 0 ? 1 : -1;
UG2.ride = null;
UG2.mode = "platform";
camera.position.z = UG2.cz + sd * (UG_PLAT - 1.2);
camera.position.x = Math.max(UG2.cx - 44, Math.min(UG2.cx + 44, camera.position.x));
UG2.g.visible = true;
ugTunnelsAt();
ugCrowdSet();
setStatus(why || ("<b>" + esc(ugName(UG2.at)) + "</b>. Mind the gap. The Way Out is at either end of the platform."));
},
function () {
if (typeof ugDriveStop === "function")
try {
ugDriveStop(true);
}
catch (e) { }
UG2.on = false;
UG2.mode = null;
UG2.ride = null;
if (UG2.g)
UG2.g.visible = false;
UG2.tun.forEach(function (G) { if (G)
G.visible = false; });
UG2.train.forEach(function (T) { if (T)
T.visible = false; });
UG2.pool.forEach(function (p) { if (p)
p.g.visible = false; });
if (UG2.hud)
UG2.hud.style.display = "none";
if (UG2.prompt)
UG2.prompt.style.display = "none";
if (typeof tickClock === "function")
tickClock(true);
},
function (R, t) {
if (R.drive && typeof ugDriveState === "function")
return ugDriveState();
var L = UG2.live[R.key];
if (L) {
R.wasLive = true;
R.lastLive = t;
R.from = L.from;
R.t0 = L.t0;
R.last = { cur: L.cur, s: ugLiveS(L), open: L.doors ? 1 : 0, live: L };
return R.last;
}
if (R.wasLive)
return null;
var el = t - R.t0, k = Math.floor(el / UG_SEG), ph = el - k * UG_SEG, cur = ugStationAt(ugPos(R.from, R.d) + k, R.d);
return { cur: cur, s: ph < UG_DWELL ? 0 : ugTT(ph - UG_DWELL), open: ph < UG_DWELL ? Math.max(0, Math.min(1, Math.min(ph - 2, UG_DWELL - 3 - ph) / 1.2)) : 0, live: null };
},
function (dt) {
var R = UG2.ride, T = UG2.train[R.d], t = ugNow(), dir = R.d === 0 ? 1 : -1, sd = dir, N = ugN();
var st = ugRideState(R, t);
if (!st) {
var lst = R.last || { cur: R.seg, s: 0 };
if (t - (R.lastLive || t) < 6)
st = lst;
else {
var at = lst.s < UG_SEGLEN / 2 ? lst.cur : ugNextStop(lst.cur, R.d), x = lst.s < UG_SEGLEN / 2 ? R.base : R.base + dir * UG_SEGLEN;
ugPlaceAt(at, x);
T.position.set(UG2.cx, 0, UG2.cz + sd * UG_TRACKZ);
camera.position.x = UG2.cx + (camera.position.x - T.position.x);
ug2Alight("<b>" + esc(ugName(at)) + "</b>. This train is out of service here — all change, please. The next one is on the board.");
return { cur: at, s: 0, open: 0 };
}
}
var lx = camera.position.x - T.position.x, lz = camera.position.z - T.position.z;
if (R.seg !== st.cur) {
var steps = ((ugPos(st.cur, R.d) - ugPos(R.seg, R.d)) % N + N) % N;
R.base += dir * UG_SEGLEN * steps;
R.seg = st.cur;
}
var nxt = ugNextStop(st.cur, R.d);
if (st.s < UG_SEGLEN / 2) {
if (UG2.at !== st.cur || UG2.cx !== R.base) {
ugPlaceAt(st.cur, R.base);
ugCrowdSet();
}
}
else {
var nb = R.base + dir * UG_SEGLEN;
if (UG2.at !== nxt || UG2.cx !== nb) {
ugPlaceAt(nxt, nb);
ugCrowdSet();
}
}
T.position.set(R.base + dir * st.s, 0, UG2.cz + sd * UG_TRACKZ);
T.visible = true;
T.userData.key = R.key;
if (st.live && !R.drive)
ugDoorsTo(T, st.open, -sd, dt, false);
else
ugDoors(T, st.open, -sd);
var cf = ugCabFigure(R.d);
if (cf)
cf.visible = !R.drive && !st.live;
var nearPlat = Math.abs(T.position.x - UG2.cx) < 260;
UG2.g.visible = true;
if (!nearPlat)
UG2.train[1 - R.d].visible = false;
if (R.cab) {
var ce = R.cab === "rear" ? -1 : 1;
camera.position.x = T.position.x + dir * ce * (UG_TRAINHALF - 1.3);
camera.position.z = T.position.z + (R.cab === "rear" ? -0.4 : 0.4) * sd;
}
else {
camera.position.x = T.position.x + lx;
camera.position.z = T.position.z + lz;
}
if (R.sit && !R.cab && !R.drive) {
camera.position.x = T.position.x + R.sit.x;
camera.position.z = T.position.z + R.sit.z;
}
var atPlat = Math.abs(st.s) < 4 && (T.userData.open || 0) > 0.05;
var p2 = st.cur + ":" + (atPlat ? "o" : "r");
if (!R.cab && !R.drive && p2 !== R.lastPos) {
R.lastPos = p2;
if (atPlat && st.cur !== R.boardAt) {
setStatus("<b>" + esc(ugName(st.cur)) + "</b>. The doors are open — step off here, or stay on for <b>" + esc(ugName(nxt)) + "</b>.");
if (typeof playTone === "function")
playTone(740, 0.25);
}
else if (!atPlat)
setStatus("The doors are closing. Next stop: <b>" + esc(ugName(nxt)) + "</b>.");
}
if (R.boardAt === undefined)
R.boardAt = st.cur;
if (!R.cab && (T.userData.open || 0) > 0.6 && Math.abs(camera.position.z - UG2.cz) < UG_PLAT - 0.3)
ug2Alight();
return { cur: st.cur, nxt: nxt, s: st.s, open: T.userData.open || 0, atPlat: atPlat, live: st.live };
},
function () {
if (UG2.seatSpots)
return UG2.seatSpots;
var out = [];
for (var c = 0; c < UG_CARS; c++) {
var cx = (c - (UG_CARS - 1) / 2) * (UG_CARLEN + 0.6);
[1, -1].forEach(function (sd) {
for (var sk = 0; sk < 3; sk++) {
var bx = cx - UG_CARLEN / 2 + 2.2 + sk * (UG_CARLEN / 4) + 1.6;
[-0.95, 0, 0.95].forEach(function (o) { out.push({ x: bx + o, z: sd * 0.95, sd: sd }); });
}
});
}
return (UG2.seatSpots = out);
},
function () {
if (UG2.hud)
return;
var h = document.createElement("div");
h.id = "ug2-hud";
h.style.cssText = "position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:44;display:none;background:rgba(14,20,46,.92);border:2px solid #C03A2E;border-radius:18px;" +
"padding:6px 16px;font:13px var(--sans,system-ui);color:#F4F0E6;text-align:center;max-width:calc(100vw - 24px);line-height:1.5";
document.body.appendChild(h);
UG2.hud = h;
var p = document.createElement("div");
p.id = "ug2-prompt";
p.style.cssText = "position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;background:rgba(10,12,18,.92);" +
"border:1px solid #C03A2E;border-radius:3px;padding:9px 14px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);cursor:pointer";
document.body.appendChild(p);
UG2.prompt = p;
}
];
});
