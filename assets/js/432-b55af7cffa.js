/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var WRM = { herds: [], geese: [], skein: null, by: {}, at: 0, migrate: true, scarce: true, season: null, mats: [], geos: [], G: null, t: 0, ft: 0, board: null };
var WRM_SEASONS = ["winter", "spring", "summer", "autumn"];
var WRM_HERDS = [
{ k: "reddeer", name: "The red deer", arch: "deer", lead: "stag", n: 9, lite: 5, len: 1.9, lenLead: 2.15, sp: 1.3, run: 7.5, fear: 26, spread: 13, ground: "hunt_3",
at: { summer: [430, -470, "the north-east woods, by the deer trails"], autumn: [230, -330, "the edge of the Greatwood, for the rut"],
winter: [330, 250, "the sheltered low fields south of Anvilmere"], spring: [380, -140, "the meadows east of the Greatwood road"] } },
{ k: "elk", name: "The elk", arch: "stag", n: 6, lite: 3, len: 2.85, sp: 1.5, run: 8, fear: 34, spread: 16, ground: "hunt_5",
at: { summer: [1030, 440, "the far High Moor"], autumn: [985, 500, "the High Moor, for the rut"],
winter: [560, 190, "the sheltered ground below Hollowfell"], spring: [800, 320, "the lower slopes of the moor"] } },
{ k: "ponies", name: "The moorland ponies", arch: "horse", n: 6, lite: 3, len: 2.1, sp: 1.2, run: 6.5, fear: 20, spread: 11, ground: null,
at: { summer: [880, 690, "the High Moor's tops"], autumn: [760, 560, "the middle of the moor"],
winter: [620, 420, "the low moor, out of the wind"], spring: [760, 560, "the middle of the moor"] } }
];
var WRM_PATCH_MS = 25 * 60000;
var WRM_MOVE_DAYS = 14;
function wrmLite() { return !!(typeof HND !== "undefined" && HND.lite); }
function wrmSeasonAt(t) { var m = new Date(t).getUTCMonth(); return m === 11 || m < 2 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "autumn"; }
function wrmNextStart(t) {
var d = new Date(t), y = d.getUTCFullYear(), m = d.getUTCMonth(), n = [2, 5, 8, 11].filter(function (k) { return k > m; })[0];
return n === undefined ? Date.UTC(y + 1, 2, 1) : Date.UTC(y, n, 1);
}
function wrmSmooth(f) { f = Math.max(0, Math.min(1, f)); return f * f * (3 - 2 * f); }
function wrmRange(H, t) { return __ZC(432, 0, this, arguments, new.target); }
function wrmHash(s) { var h = 0; s = String(s); for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function wrmDry(x, z) { try {
return hndWaterAt(x, z) === null && hndLakeD(x, z) > 1.1 && hndRiverD(x, z) > 14 && Math.abs(x) < 1120 && Math.abs(z) < 1120 && z < hndCoast(x) - 30 && Math.hypot(x, z) > 190;
}
catch (e) {
return true;
} }
function wrmPatch(H, t) {
var R = wrmRange(H, t), slot = Math.floor(t / WRM_PATCH_MS), h = wrmHash(H.k + ":" + slot), a = (h % 628) / 100, r = 25 + (h >>> 10) % 60;
for (var k = 0; k < 6; k++) {
var x = R.x + Math.cos(a) * r, z = R.z + Math.sin(a) * r;
if (wrmDry(x, z))
return { x: x, z: z, R: R, slot: slot };
r *= 0.6;
a += 1.3;
}
return { x: R.x, z: R.z, R: R, slot: slot };
}
function wrmIdFor(base, want, len) { for (var i = 0; i < 60; i++) {
var id = base + "_" + i;
if (wrmHash(id) % len === want)
return id;
} return base; }
function wrmBeast(H, i) { return __ZC(432, 1, this, arguments, new.target); }
function wrmHerds(G) { return __ZC(432, 2, this, arguments, new.target); }
function wrmHerdTick(dt, L) { return __ZC(432, 3, this, arguments, new.target); }
var WRM_GOOSE_COL = { body: 0x6E6252, breast: 0xC9BFAE, white: 0xEDE9E1, black: 0x161616, wing: 0x564A3E };
var WRM_SWIM = [["s", "body", 0, 0.18, 0, 0, 0, 0, 0.2, 0.16, 0.42], ["s", "breast", 0, 0.17, 0.17, 0, 0, 0, 0.17, 0.14, 0.2],
["s", "white", 0, 0.23, -0.36, 0, 0, 0, 0.12, 0.08, 0.11], ["s", "black", 0, 0.25, -0.45, 0.2, 0, 0, 0.09, 0.04, 0.08],
["c", "black", 0, 0.42, 0.29, 0.28, 0, 0, 0.042, 0.36, 0.042], ["s", "black", 0, 0.61, 0.35, 0, 0, 0, 0.058, 0.058, 0.09],
["s", "white", 0, 0.595, 0.335, 0, 0, 0, 0.063, 0.035, 0.05], ["k", "black", 0, 0.6, 0.45, 1.5708, 0, 0, 0.024, 0.08, 0.024]];
var WRM_FLY = [["s", "body", 0, 0, 0, 0, 0, 0, 0.19, 0.15, 0.42], ["s", "breast", 0, -0.02, 0.14, 0, 0, 0, 0.16, 0.13, 0.2],
["s", "white", 0, 0.02, -0.37, 0, 0, 0, 0.11, 0.07, 0.1], ["s", "black", 0, 0.03, -0.46, 0, 0, 0, 0.09, 0.035, 0.09],
["c", "black", 0, 0.03, 0.52, 1.5708, 0, 0, 0.04, 0.34, 0.04], ["s", "black", 0, 0.04, 0.74, 0, 0, 0, 0.055, 0.055, 0.09],
["s", "white", 0, 0.025, 0.725, 0, 0, 0, 0.06, 0.033, 0.05], ["k", "black", 0, 0.04, 0.84, 1.5708, 0, 0, 0.022, 0.08, 0.022]];
var WRM_WING = ["s", "wing", 0.42, 0, 0, 0, 0, 0, 0.45, 0.025, 0.16];
function wrmGeo(kind) {
var lite = wrmLite();
var g = kind === "s" ? new THREE.SphereGeometry(1, lite ? 8 : 14, lite ? 6 : 10) : kind === "c" ? new THREE.CylinderGeometry(1, 1, 1, lite ? 6 : 10) : new THREE.ConeGeometry(1, 1, 6);
WRM.geos.push(g);
return g;
}
function wrmMat(col) { var m = new THREE.MeshStandardMaterial({ color: col, roughness: 0.88, metalness: 0 }); WRM.mats.push(m); return m; }
function wrmLocal(p) { return new THREE.Matrix4().compose(new THREE.Vector3(p[2], p[3], p[4]), new THREE.Quaternion().setFromEuler(new THREE.Euler(p[5], p[6], p[7])), new THREE.Vector3(p[8], p[9], p[10])); }
function wrmFlock(G, parts, n, wings) { return __ZC(432, 4, this, arguments, new.target); }
var WRM_M = new THREE.Matrix4(), WRM_M2 = new THREE.Matrix4(), WRM_Q = new THREE.Quaternion(), WRM_E = new THREE.Euler(), WRM_V = new THREE.Vector3(), WRM_S = new THREE.Vector3(1, 1, 1), WRM_SH = new THREE.Matrix4(), WRM_SB = new THREE.Matrix4(), WRM_R = new THREE.Matrix4();
function wrmPut(F, i, x, y, z, yaw, pitch, flap) { return __ZC(432, 5, this, arguments, new.target); }
function wrmCount(F, n) { F.parts.concat(F.wings).forEach(function (P) { P.I.count = n; P.I.instanceMatrix.needsUpdate = true; }); }
function wrmGeeseOnLake(s) { var n = { winter: 18, spring: 10, summer: 4, autumn: 12 }[s] || 8; return wrmLite() ? Math.ceil(n / 2) : n; }
function wrmGeese(G) { return __ZC(432, 6, this, arguments, new.target); }
function wrmGeeseTick(dt, L) { return __ZC(432, 7, this, arguments, new.target); }
var WRM_SKEIN_MS = 6 * 60000, WRM_SKEIN_SP = 15;
function wrmSkeinTick(dt, L) { return __ZC(432, 8, this, arguments, new.target); }
var WRM_BOARD = { x: 8, z: 69 };
function wrmRegionOf(N) { return N && (N.s === "hunt" || N.s === "fish") ? N.s + "_" + (N.t + 1) : null; }
function wrmGround(r) { var g = WRM.by[r]; if (!g)
return null; var lv = Math.max(0, (+g.level || 0) - (Date.now() - (g.t || WRM.at)) / 60000 / Math.max(0.1, +g.recover || 4)); return { level: lv, cap: +g.cap || 1, g: g }; }
function wrmOut(r) { var g = WRM.scarce && r && wrmGround(r); return !!(g && g.level >= g.cap); }
function wrmThin(r) { var g = WRM.scarce && r && wrmGround(r); return !!(g && g.level >= g.cap * 0.6); }
function wrmFetch() { return __ZC(432, 9, this, arguments, new.target); }
function wrmNote(o) {
var w = o && (o.wild || (o.scarce && o.region ? o : null));
if (!w || !w.region)
return;
var g = WRM.by[w.region] || (WRM.by[w.region] = { region: w.region, recover: 4 });
g.level = +w.level || 0;
g.cap = +w.cap || g.cap || 1;
g.t = Date.now();
wrmShowNodes();
}
function wrmShowNodes() { if (typeof HND === "undefined" || !HND.nodes)
return; HND.nodes.forEach(function (N) { var r = wrmRegionOf(N); if (r && N.parts)
hndNodeShow(N, !(HND.picked[N.id] > Date.now())); }); }
function wrmPlaceName(H, R) { return R.to ? "on the move from " + R.name + " to " + R.toName : R.name; }
function wrmBoardCard() { return __ZC(432, 10, this, arguments, new.target); }
function wrmBoardBuild(G) { return __ZC(432, 11, this, arguments, new.target); }
function wrmBuild(G) { return __ZC(432, 12, this, arguments, new.target); }
function wrmTick(dt) {
if (!WRM.G)
return;
var L = worldLocal();
WRM.t += dt;
if (WRM.t < 0.05)
return;
var d = WRM.t;
WRM.t = 0;
d = Math.min(d, 0.5);
try {
wrmHerdTick(d, L);
}
catch (e) { }
try {
wrmGeeseTick(d, L);
}
catch (e) { }
if (Date.now() - WRM.ft > 90000 && !document.hidden)
wrmFetch();
}
function wrmForget() { return __ZC(432, 13, this, arguments, new.target); }
(function () {
if (typeof hndBuild === "function") {
var b = hndBuild;
hndBuild = function (G) { var r = b.apply(this, arguments); try {
wrmBuild(G);
}
catch (e) {
if (window.console)
console.warn("[wild]", e);
} return r; };
}
if (typeof hndTick === "function") {
var t = hndTick;
hndTick = function (dt) { var r = t.apply(this, arguments); try {
if (HND.built)
wrmTick(dt);
}
catch (e) { } return r; };
}
if (typeof hndForget === "function") {
var f = hndForget;
hndForget = function () { try {
wrmForget();
}
catch (e) { } return f.apply(this, arguments); };
}
if (typeof hndNodeShow === "function") {
var s = hndNodeShow;
hndNodeShow = function (N, full) { return s.call(this, N, full && !wrmOut(wrmRegionOf(N))); };
}
if (typeof hndNodeWord === "function") {
var w = hndNodeWord;
hndNodeWord = function (N) {
var h = w.apply(this, arguments), r = wrmRegionOf(N);
if (!r)
return h;
var G = wrmGround(r);
if (!G || !WRM.scarce)
return h;
var fish = N.s === "fish";
if (G.level >= G.cap)
return h + " · <span style='color:#E8A070'>" + (fish ? "fished" : "hunted") + " out for now</span>";
if (G.level >= G.cap * 0.6)
return h + " · <span style='color:#E8D070'>getting scarce</span>";
return h;
};
}
if (typeof cityRpc === "function") {
var c = cityRpc;
cityRpc = function (name) {
var p = c.apply(this, arguments);
if (name === "skill_gather" || name === "gap_fish")
p = p.then(function (o) { try {
wrmNote(o);
}
catch (e) { } return o; });
return p;
};
}
})();
function wrmTest() { return { WRM: WRM, range: wrmRange, patch: wrmPatch, board: wrmBoardCard, fetch: wrmFetch, ground: wrmGround, season: wrmSeasonAt }; }
