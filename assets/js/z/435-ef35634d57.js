/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(435, function () {
return [
function (H, t) {
var s = wrmSeasonAt(t), A = H.at[s];
if (!WRM.migrate)
return { x: H.at.summer[0], z: H.at.summer[1], f: 0, s: "summer", to: null, name: H.at.summer[2] };
var left = (wrmNextStart(t) - t) / 86400000;
if (left > WRM_MOVE_DAYS)
return { x: A[0], z: A[1], f: 0, s: s, to: null, name: A[2] };
var s2 = WRM_SEASONS[(WRM_SEASONS.indexOf(s) + 1) % 4], B = H.at[s2], f = wrmSmooth((WRM_MOVE_DAYS - left) / WRM_MOVE_DAYS);
return { x: A[0] + (B[0] - A[0]) * f, z: A[1] + (B[1] - A[1]) * f, f: f, s: s, to: s2, name: A[2], toName: B[2] };
},
function (H, i) {
var lead = i === 0 && H.lead, arch = lead ? H.lead : H.arch, id = H.arch === "deer" ? wrmIdFor("wrm_" + H.k + "_" + i, lead ? 1 : 0, 2) : "wrm_" + H.k + "_" + i, g = null;
try {
g = build({ id: id, archetype: arch, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
}
catch (e) {
g = null;
}
if (!g)
return null;
var B = new THREE.Box3().setFromObject(g), V = new THREE.Vector3();
B.getSize(V);
var R = wRand(wrmHash(id)), want = (lead ? H.lenLead || H.len : H.len) * (0.86 + R() * 0.22);
g.scale.multiplyScalar(want / (Math.max(V.x, V.z) || 1));
var W = new THREE.Group();
W.add(g);
W.userData.keep = 1;
W.name = "wrm-" + H.k;
var a = R() * 6.283, r = (0.35 + R() * 0.65) * H.spread;
return { W: W, g: g, i: i, ox: Math.cos(a) * r, oz: Math.sin(a) * r, x: 0, z: 0, tx: 0, tz: 0, wait: R() * 6, ph: R() * 6, v: 0, run: 0, rx: 0, rz: 0, head: 0, delay: i * 1.6 + R() * 1.5 };
},
function (G) {
WRM.herds = [];
var lite = wrmLite(), now = Date.now();
WRM_HERDS.forEach(function (H) {
var n = lite ? H.lite : H.n, P = wrmPatch(H, now), herd = { H: H, list: [], slot: P.slot, px: P.x, pz: P.z, alarm: 0, show: n };
for (var i = 0; i < n; i++) {
var A = wrmBeast(H, i);
if (!A)
continue;
A.x = P.x + A.ox;
A.z = P.z + A.oz;
if (!wrmDry(A.x, A.z)) {
A.x = P.x;
A.z = P.z;
}
A.tx = A.x;
A.tz = A.z;
A.W.position.set(A.x, hndLand(A.x, A.z), A.z);
A.W.rotation.y = Math.random() * 6.283;
G.add(A.W);
herd.list.push(A);
}
WRM.herds.push(herd);
});
},
function (dt, L) {
var far = wrmLite() ? 330 : 560, now = Date.now();
WRM.herds.forEach(function (h) {
var H = h.H, P = null;
if (Math.floor(now / WRM_PATCH_MS) !== h.slot) {
P = wrmPatch(H, now);
h.slot = P.slot;
h.px = P.x;
h.pz = P.z;
h.list.forEach(function (A) { A.delay = A.i * 1.6 + Math.random() * 2; });
}
var cx = h.px, cz = h.pz, dHerd = Math.hypot(cx - L.x, cz - L.z);
var show = h.list.length;
if (H.ground && WRM.scarce) {
var gr = wrmGround(H.ground);
if (gr)
show = Math.max(1, h.list.length - Math.floor(h.list.length * 0.7 * Math.min(1, gr.level / Math.max(1, gr.cap))));
}
h.show = show;
var near = dHerd < far + H.spread * 2;
h.list.forEach(function (A, j) {
var on = near && j < show;
if (A.W.visible !== on)
A.W.visible = on;
if (!on) {
if (!near) {
A.x = cx + A.ox;
A.z = cz + A.oz;
A.tx = A.x;
A.tz = A.z;
A.run = 0;
}
return;
}
var dp = Math.hypot(A.x - L.x, A.z - L.z);
if (dp < H.fear && A.run <= 0)
h.alarm = now;
if (h.alarm && now - h.alarm < 400 && A.run <= 0 && dp < H.fear * 2.2) {
var ax = A.x - L.x, az = A.z - L.z, al = Math.hypot(ax, az) || 1;
A.run = 3 + Math.random() * 2.5;
A.rx = ax / al;
A.rz = az / al;
if (j === 0 && typeof hndTone === "function" && dp < 60)
hndTone(180, 0.06);
}
var sp = 0, gx, gz;
if (A.run > 0) {
A.run -= dt;
sp = H.run * (A.run > 1 ? 1 : A.run);
gx = A.x + A.rx * sp * dt;
gz = A.z + A.rz * sp * dt;
if (!wrmDry(gx, gz)) {
var t2 = A.rx;
A.rx = -A.rz;
A.rz = t2;
gx = A.x;
gz = A.z;
}
A.tx = gx;
A.tz = gz;
A.wait = 1 + Math.random() * 3;
}
else {
var hx = cx + A.ox, hz = cz + A.oz, dh = Math.hypot(hx - A.x, hz - A.z);
if (A.delay > 0)
A.delay -= dt;
if (dh > H.spread * 1.6 && A.delay <= 0) {
A.tx = hx;
A.tz = hz;
A.wait = 0;
A.walk = 1;
}
else if (A.walk && dh < 3)
A.walk = 0;
if (A.wait > 0) {
A.wait -= dt;
}
else {
var dx = A.tx - A.x, dz = A.tz - A.z, d = Math.hypot(dx, dz);
if (d < 0.4) {
A.wait = 4 + Math.random() * 10;
var a = Math.random() * 6.283, r = Math.random() * H.spread * 0.5;
A.tx = hx + Math.cos(a) * r;
A.tz = hz + Math.sin(a) * r;
if (!wrmDry(A.tx, A.tz)) {
A.tx = A.x;
A.tz = A.z;
}
}
else {
sp = A.walk ? H.sp : H.sp * 0.35;
var st = Math.min(d, sp * dt);
gx = A.x + dx / d * st;
gz = A.z + dz / d * st;
}
}
}
if (gx !== undefined) {
var mdx = gx - A.x, mdz = gz - A.z;
if (mdx || mdz) {
var want = Math.atan2(mdx, mdz), cur = A.W.rotation.y, df = Math.atan2(Math.sin(want - cur), Math.cos(want - cur));
A.W.rotation.y = cur + df * Math.min(1, dt * (A.run > 0 ? 8 : 3));
}
A.x = gx;
A.z = gz;
}
A.v += (sp - A.v) * Math.min(1, dt * 4);
A.ph += dt * (1.6 + A.v * 1.9);
var bob = A.v > 0.05 ? Math.abs(Math.sin(A.ph)) * Math.min(0.12, 0.03 + A.v * 0.012) : 0;
var graze = A.v < 0.05 && A.wait > 1.5 ? 1 : 0;
A.head += (graze - A.head) * Math.min(1, dt * 1.5);
A.W.position.set(A.x, hndLand(A.x, A.z) + bob, A.z);
A.g.rotation.x = A.head * 0.09 + (A.v > 3 ? Math.sin(A.ph * 2) * 0.04 : 0);
});
});
},
function (G, parts, n, wings) {
var geo = {}, mat = {}, out = { parts: [], n: n, wings: [] };
function part(p) {
var gk = geo[p[0]] || (geo[p[0]] = wrmGeo(p[0])), mk = mat[p[1]] || (mat[p[1]] = WRM.mats.filter(function (m) { return m.userData.k === p[1]; })[0]);
if (!mk) {
mk = wrmMat(WRM_GOOSE_COL[p[1]]);
mk.userData.k = p[1];
mat[p[1]] = mk;
}
var I = new THREE.InstancedMesh(gk, mk, n);
I.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
I.frustumCulled = false;
I.castShadow = false;
I.receiveShadow = false;
I.count = 0;
G.add(I);
return I;
}
parts.forEach(function (p) { out.parts.push({ I: part(p), L: wrmLocal(p) }); });
if (wings)
[-1, 1].forEach(function (sd) { var p = WRM_WING.slice(); p[2] *= sd; out.wings.push({ I: part(p), sd: sd, L: wrmLocal(p) }); });
return out;
},
function (F, i, x, y, z, yaw, pitch, flap) {
WRM_E.set(pitch || 0, yaw, 0, "YXZ");
WRM_Q.setFromEuler(WRM_E);
WRM_V.set(x, y, z);
WRM_M.compose(WRM_V, WRM_Q, WRM_S);
F.parts.forEach(function (P) { WRM_M2.multiplyMatrices(WRM_M, P.L); P.I.setMatrixAt(i, WRM_M2); });
F.wings.forEach(function (Wg) {
WRM_SH.makeTranslation(Wg.sd * 0.12, 0.04, 0.02);
WRM_R.makeRotationZ(-Wg.sd * (flap || 0));
WRM_SB.makeTranslation(-Wg.sd * 0.12, -0.04, -0.02);
WRM_M2.multiplyMatrices(WRM_M, WRM_SH).multiply(WRM_R).multiply(WRM_SB).multiply(Wg.L);
Wg.I.setMatrixAt(i, WRM_M2);
});
},
function (G) {
var s = wrmSeasonAt(Date.now()), n = wrmGeeseOnLake(s), Lk = HND_LAKE, R = wRand(2042);
WRM.swim = wrmFlock(G, WRM_SWIM, 18, false);
WRM.geese = [];
var rafts = [[-0.25, -0.2], [0.3, 0.15], [-0.05, 0.4]];
for (var i = 0; i < n; i++) {
var r = rafts[i % rafts.length], x = Lk.x + Lk.rx * (r[0] + (R() - 0.5) * 0.12), z = Lk.z + Lk.rz * (r[1] + (R() - 0.5) * 0.12);
WRM.geese.push({ x: x, z: z, hx: x, hz: z, tx: x, tz: z, yaw: R() * 6.283, wait: R() * 8, ph: R() * 6, dip: 0 });
}
WRM.sky = wrmFlock(G, WRM_FLY, 15, true);
WRM.skein = null;
wrmCount(WRM.swim, 0);
wrmCount(WRM.sky, 0);
},
function (dt, L) {
if (!WRM.swim)
return;
var far = wrmLite() ? 380 : 700, dl = Math.hypot(L.x - HND_LAKE.x, L.z - HND_LAKE.z), on = dl < far + HND_LAKE.rx;
if (!on) {
if (WRM.swim.shown) {
wrmCount(WRM.swim, 0);
WRM.swim.shown = 0;
}
}
else {
WRM.geese.forEach(function (Gs, i) {
var dp = Math.hypot(Gs.x - L.x, Gs.z - L.z);
if (dp < 14) {
var ax = Gs.x - L.x, az = Gs.z - L.z, al = dp || 1;
Gs.tx = Gs.x + ax / al * 12;
Gs.tz = Gs.z + az / al * 12;
Gs.wait = 0;
}
if (Gs.wait > 0)
Gs.wait -= dt;
else {
var dx = Gs.tx - Gs.x, dz = Gs.tz - Gs.z, d = Math.hypot(dx, dz);
if (d < 0.2) {
Gs.wait = 3 + Math.random() * 9;
if (Math.random() < 0.3)
Gs.dip = 2.2;
var a = Math.random() * 6.283, r = Math.random() * 9;
Gs.tx = Gs.hx + Math.cos(a) * r;
Gs.tz = Gs.hz + Math.sin(a) * r;
if (hndLakeD(Gs.tx, Gs.tz) > 0.92) {
Gs.tx = Gs.hx;
Gs.tz = Gs.hz;
}
}
else {
var st = Math.min(d, (dp < 14 ? 1.4 : 0.45) * dt), want = Math.atan2(dx, dz);
Gs.yaw += Math.atan2(Math.sin(want - Gs.yaw), Math.cos(want - Gs.yaw)) * Math.min(1, dt * 2);
Gs.x += dx / d * st;
Gs.z += dz / d * st;
}
}
Gs.ph += dt * 1.3;
if (Gs.dip > 0)
Gs.dip -= dt;
var dip = Gs.dip > 0 ? Math.sin(Math.min(1, Gs.dip / 2.2) * Math.PI) : 0;
wrmPut(WRM.swim, i, Gs.x, HND_W - 0.13 + Math.sin(Gs.ph) * 0.015 - dip * 0.12, Gs.z, Gs.yaw, dip * 1.2, 0);
});
wrmCount(WRM.swim, WRM.geese.length);
WRM.swim.shown = 1;
}
wrmSkeinTick(dt, L);
},
function (dt, L) {
var now = Date.now(), s = wrmSeasonAt(now), F = WRM.sky;
if (!(s === "spring" || s === "autumn")) {
if (F.shown) {
wrmCount(F, 0);
F.shown = 0;
}
return;
}
var slot = Math.floor(now / WRM_SKEIN_MS), h = wrmHash("skein:" + slot), tau = (now - slot * WRM_SKEIN_MS) / 1000, dur = 3200 / WRM_SKEIN_SP;
if (h % 3 === 0 || tau > dur) {
if (F.shown) {
wrmCount(F, 0);
F.shown = 0;
}
return;
}
var north = s === "spring", ang = ((h >>> 4) % 60 - 30) / 100, dx = Math.sin(ang) * (north ? 1 : -1), dz = north ? -Math.cos(ang) : Math.cos(ang);
var x0 = ((h >>> 9) % 1400) - 700 - dx * 1600, z0 = -dz * 1600, lx = x0 + dx * WRM_SKEIN_SP * tau, lz = z0 + dz * WRM_SKEIN_SP * tau, yaw = Math.atan2(dx, dz);
var n = Math.min(15, (wrmLite() ? 7 : 9) + (h >>> 14) % 7), alt = hndLand(lx, lz) + 78 + ((h >>> 18) % 30), t = now / 1000;
for (var k = 0; k < n; k++) {
var side = k === 0 ? 0 : (k % 2 ? 1 : -1), rank = Math.ceil(k / 2), lat = side * rank * 2.7 + Math.sin(t * 0.7 + k) * 0.25, back = rank * 2.5 + Math.sin(t * 0.5 + k * 1.7) * 0.3;
var px = lx - dx * back - dz * lat, pz = lz - dz * back + dx * lat;
wrmPut(F, k, px, alt + rank * 0.4 + Math.sin(t * 1.1 + k) * 0.3, pz, yaw, 0, Math.sin(t * 2 * Math.PI * 2.4 + k * 0.5) * 0.55);
}
wrmCount(F, n);
F.shown = 1;
var dh = Math.hypot(lx - L.x, lz - L.z);
if (dh < 260 && WRM.honked !== slot) {
WRM.honked = slot;
if (typeof hndTone === "function") {
hndTone(392, 0.09);
setTimeout(function () { hndTone(349, 0.1); }, 170);
setTimeout(function () { hndTone(392, 0.08); }, 520);
}
if (!(typeof HND !== "undefined" && HND.busy) && typeof setStatus === "function")
setStatus("🪿 A skein of wild geese goes over, honking, " + (north ? "flying north for the summer." : "come south for the winter. Some will stay on Mirrormere."));
}
},
function () {
if (typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return;
WRM.ft = Date.now();
cityRpc("wild_state", {}).then(function (o) {
if (!o || !o.ok)
return;
WRM.at = Date.now();
WRM.scarce = o.scarce !== false;
WRM.migrate = o.migrate !== false;
WRM.season = o.season;
WRM.by = {};
(o.grounds || []).forEach(function (g) { g.t = WRM.at; WRM.by[g.region] = g; });
wrmShowNodes();
}).catch(function () { });
},
function () {
var now = Date.now(), s = WRM.season || wrmSeasonAt(now), h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🦌 The Wildwatch board</div>" +
"<div style='opacity:.85;margin:4px 0 8px'>It is " + s + ". Where the wild animals of the Guildlands are now, and how the hunting and fishing grounds stand.</div>";
h += "<div style='font-size:12px;opacity:.8;margin-top:6px'>THE HERDS</div>";
WRM_HERDS.forEach(function (H) { var R = wrmRange(H, now); h += "<div style='font-size:12.5px;margin:3px 0'><b>" + esc(H.name) + "</b>: " + esc(wrmPlaceName(H, R)) + (R.to ? " (they will be there by " + R.to + ")" : "") + ".</div>"; });
h += "<div style='font-size:12.5px;margin:3px 0'><b>The wild geese</b>: " + (s === "winter" ? "wintering on Mirrormere." : s === "summer" ? "most gone north; a few pairs stay on Mirrormere." : s === "spring" ? "leaving: skeins go over northward, and the rest are on Mirrormere." : "coming back: skeins go over southward, and more settle on Mirrormere each week.") + "</div>";
if (!WRM.migrate)
h += "<div style='font-size:12px;opacity:.8;margin:3px 0'>The Keeper is keeping the herds on their summer grounds for now.</div>";
h += "<div style='font-size:12px;opacity:.8;margin-top:10px'>THE GROUNDS</div>";
var rows = Object.keys(WRM.by).sort().map(function (r) {
var G = wrmGround(r), g = G.g, pct = G.level / G.cap, word, mins = 0;
if (!WRM.scarce)
word = "Plenty";
else if (pct >= 1) {
mins = Math.ceil((G.level - G.cap * 0.85) * (+g.recover || 4));
word = "<span style='color:#E8A070'>Worked out</span>, back in about " + mins + " min";
}
else if (pct >= 0.6)
word = "<span style='color:#E8D070'>Thinning</span>";
else
word = "Plenty";
return "<div style='font-size:12.5px;margin:3px 0'><b>" + esc(g.name || r) + "</b>: " + word + (g.note ? "<div style='opacity:.75;font-size:12px'>" + esc(g.note) + "</div>" : "") + "</div>";
});
h += rows.length ? rows.join("") : "<div style='font-size:12.5px;opacity:.8'>" + (typeof signedIn === "function" && signedIn() ? "The wildwarden has not posted the grounds yet." : "Sign in to read the grounds.") + "</div>";
h += "<div style='font-size:12px;opacity:.75;margin-top:8px'>Every catch anyone makes takes from a ground; worked too hard, it gives nothing until the animals come back. Try another ground, or come back later.</div>";
worldCard(h, {});
},
function (G) {
var x = WRM_BOARD.x, z = WRM_BOARD.z, y = hndLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
var wd = hndSurf("wood", 0x6A4A30, 1);
[-0.9, 0.9].forEach(function (sx) { hndBox(0.12, 2.2, 0.12, wd, sx, 1.1, 0, g); });
hndBox(2.1, 1.3, 0.08, hndSurf("wood", 0x8A6A48, 1), 0, 1.55, 0, g);
hndBox(2.3, 0.1, 0.3, wd, 0, 2.25, 0, g);
var c = document.createElement("canvas");
c.width = 256;
c.height = 160;
var k = c.getContext("2d");
k.fillStyle = "#E8DCC0";
k.fillRect(0, 0, 256, 160);
k.fillStyle = "#3A2A1A";
k.font = "bold 22px Georgia,serif";
k.textAlign = "center";
k.fillText("The Wildwatch", 128, 34);
k.font = "15px Georgia,serif";
k.fillText("Where the herds are,", 128, 68);
k.fillText("and how the hunting and", 128, 90);
k.fillText("fishing grounds stand", 128, 112);
k.font = "italic 13px Georgia,serif";
k.fillText("press E to read", 128, 142);
var tx = new THREE.CanvasTexture(c);
WRM.texs = [tx];
var pm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.9 });
WRM.mats.push(pm);
var pg = new THREE.PlaneGeometry(1.9, 1.15);
WRM.geos.push(pg);
var p = new THREE.Mesh(pg, pm);
p.position.set(0, 1.55, 0.05);
g.add(p);
HND.solids.push({ c: 1, x: x, z: z, r: 1.2, y0: -1e3, y1: 1e3 });
G.add(g);
WRM.board = g;
hndSpot(x, z + 1.4, 3, "The Wildwatch board", "read where the herds are and how the grounds stand", wrmBoardCard);
},
function (G) {
WRM.G = G;
WRM.mats = [];
WRM.geos = [];
WRM.texs = [];
HND.beasts = HND.beasts.filter(function (Bs) { var id = String(Bs.g.userData.id || ""); if (/^hnd_(deer|stag)_/.test(id)) {
if (Bs.g.parent)
Bs.g.parent.remove(Bs.g);
return false;
} return true; });
try {
wrmHerds(G);
}
catch (e) {
if (window.console)
console.warn("[wild] herds", e);
}
try {
wrmGeese(G);
}
catch (e) {
if (window.console)
console.warn("[wild] geese", e);
}
try {
wrmBoardBuild(G);
}
catch (e) {
if (window.console)
console.warn("[wild] board", e);
}
wrmFetch();
},
function () {
WRM.mats.forEach(function (m) { try {
m.dispose();
}
catch (e) { } });
WRM.geos.forEach(function (g) { try {
g.dispose();
}
catch (e) { } });
(WRM.texs || []).forEach(function (t) { try {
t.dispose();
}
catch (e) { } });
WRM.mats = [];
WRM.geos = [];
WRM.texs = [];
WRM.herds = [];
WRM.geese = [];
WRM.swim = null;
WRM.sky = null;
WRM.board = null;
WRM.G = null;
}
];
});
