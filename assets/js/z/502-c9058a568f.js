/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(502, function () {
return [
function (x, z) {
var ang = Math.atan2(z, x), u = (ang - IFG_A0) / IFG_STEP;
u = ((u % 8) + 8) % 8;
var i = Math.round(u) % 8, d = u - Math.round(u), b = 0.17;
var W = IFG_W;
W.a = IFG_ORDER[i];
W.b = null;
W.wa = 1;
W.wb = 0;
if (Math.abs(d) > 0.5 - b) {
var j = (i + (d > 0 ? 1 : 7)) % 8, t = ifgSm(0.5 - b, 0.5, Math.abs(d));
W.b = IFG_ORDER[j];
W.wb = t * 0.5;
W.wa = 1 - W.wb;
}
return W;
},
function (x, z, r, S, k) {
var rr = r + (ifgN(x, z, 11, 0.004) - 0.5) * 110;
var top = 9 + (ifgF(x, z, 12, 0.006, 3) - 0.5) * 10 + ifgSm(500, 800, r) * 4;
var cliff = ifgSm(1078, 1094, rr), beach = 1.6 - Math.max(0, rr - 1094) * 0.028, h = top + (Math.max(-2.3, beach) - top) * cliff;
if (rr > 1180)
h = Math.max(-2.3, beach) - Math.min(1, (rr - 1180) / 60) * 0.6;
S.h += h * k;
if (!S.full)
return;
var sand = cliff > 0.6 && h < 2.4 ? 1 : 0;
S.s += sand * k;
S.g += (1 - sand) * 0.75 * k;
ifgTint(S, sand ? 0xD6C8A6 : (ifgN(x, z, 13, 0.02) > 0.55 ? 0x8A9058 : 0x7A8A4E), k);
},
function (x, z, r, S, k) {
var h = 12 + (ifgF(x, z, 21, 0.004, 4) - 0.5) * 16;
var c = ifgRidge(ifgF(x, z, 22, 0.011, 3));
if (c > 0.8)
h += (c - 0.8) * 85 * ifgSm(600, 700, r);
var L = IFG_LANDS.frost.lake, dl = Math.hypot(x - L.x, z - L.z), lk = 0;
if (dl < L.r + 45) {
lk = 1 - ifgSm(L.r, L.r + 45, dl);
h = h + (7.6 - h) * lk;
}
S.h += h * k;
if (!S.full)
return;
var bare = ifgSm(0.58, 0.72, ifgN(x, z, 24, 0.018)), tun = ifgSm(0.6, 0.75, ifgN(x, z, 25, 0.007)) * (1 - ifgSm(700, 900, r));
S.n += k * (1 - bare * 0.6 - tun * 0.5);
S.r += k * bare * 0.55;
S.g += k * tun * 0.45;
ifgTint(S, lk > 0.96 ? 0xA8BCCC : bare > 0.5 ? 0x8E9096 : tun > 0.5 ? 0x9A9A7A : (ifgN(x, z, 23, 0.015) > 0.6 ? 0xAAB0BA : 0xB8BEC6), k);
},
function (x, z, r, S, k) {
var h = 0.8 + (ifgF(x, z, 51, 0.008, 3) - 0.5) * 2.6, p = ifgF(x, z, 52, 0.012, 3), pool = ifgSm(0.54, 0.6, p);
var keep = ifgFenDry(x, z);
pool *= 1 - keep;
h = h + (-0.7 - h) * pool;
S.h += h * k;
if (!S.full)
return;
S.g += (0.5 - pool * 0.4) * k;
ifgTint(S, pool > 0.5 ? 0x3A3828 : (ifgN(x, z, 53, 0.02) > 0.5 ? 0x56683A : 0x4A4C30), k);
},
function (x, z, r, S, k) {
var h = 9 + (ifgF(x, z, 61, 0.005, 4) - 0.5) * 14, E = IFG_LANDS.ember, cone = 0;
for (var i = 0; i < E.cones.length; i++) {
var C = E.cones[i], d = Math.hypot(x - C.x, z - C.z);
if (d < C.r) {
var u = 1 - d / C.r, cr = 0.22;
var hc = C.h * Math.pow(u, 1.3);
if (u > 1 - cr) {
hc = C.h * Math.pow(1 - cr, 1.3) - ((u - (1 - cr)) / cr) * C.h * 0.28;
}
h += hc;
cone = Math.max(cone, u);
}
}
var lava = ifgLavaK(x, z);
if (lava > 0)
h = h + (0.6 - h) * lava;
S.h += h * k;
if (!S.full)
return;
var ash = ifgSm(0.55, 0.7, ifgN(x, z, 64, 0.009)), cin = ifgSm(0.6, 0.72, ifgN(x, z, 65, 0.02));
S.r += (0.75 - lava * 0.5) * (1 - ash * 0.6) * k;
S.s += ash * 0.45 * k;
ifgTint(S, lava > 0.5 ? 0x3A2218 : ash > 0.5 ? 0x7A746C : cin > 0.5 ? 0x7A4A34 : (ifgN(x, z, 63, 0.02) > 0.5 ? 0x5A544E : 0x625A52), k);
},
function (x, z, r, S, k) {
var h = 5 + (ifgF(x, z, 71, 0.006, 3) - 0.5) * 6, m = ifgF(x, z, 72, 0.0042, 4);
h += 26 * ifgSm(0.6, 0.62, m) * ifgSm(620, 700, r) + 10 * ifgSm(0.69, 0.705, m);
var cv = Math.abs(ifgF(x, z, 73, 0.0035, 2) - 0.5);
if (cv < 0.02)
h -= 9 * (1 - cv / 0.02);
S.h += h * k;
if (!S.full)
return;
S.s += 0.6 * k;
ifgTint(S, ifgN(x, z, 74, 0.012) > 0.5 ? 0xB8683A : 0xC88A50, k);
},
function (x, z, r, S, k) {
var s = (x * 0.8 + z * 0.6) / 52 + ifgN(x, z, 81, 0.006) * 3.2, f = s - Math.floor(s), rid = f < 0.72 ? f / 0.72 : (1 - f) / 0.28;
var h = 3.5 + 7.5 * Math.pow(rid, 1.5) * (0.5 + 0.9 * ifgN(x, z, 82, 0.004)) + (ifgN(x, z, 83, 0.02) - 0.5) * 1.2;
var D = IFG_LANDS.dune, T = D.temple, dt = Math.hypot(x - T.x, z - T.z);
if (dt < 75) {
var tk = 1 - ifgSm(48, 75, dt);
h = h + (4 - h) * tk;
}
var O = D.oasis, dO = Math.hypot(x - O.x, z - O.z);
if (dO < O.r + 60) {
var ok = 1 - ifgSm(O.r + 8, O.r + 60, dO);
h = h + (2.8 - h) * ok;
if (dO < O.r)
h = Math.min(h, 0.6 + dO / O.r * 2);
}
var P = D.postAt, dp = Math.hypot(x - P.x, z - P.z);
if (dp < 60) {
var pk = 1 - ifgSm(36, 60, dp);
h = h + (3 - h) * pk;
}
S.h += h * k;
if (!S.full)
return;
var wet = dO < O.r + 6 ? 1 : 0;
S.s += (1 - wet) * k;
S.g += wet * 0.6 * k;
ifgTint(S, wet ? 0x6A7A40 : 0xE0C08A, k);
},
function (x, z) {
var L = IFG_LANDS.ember, v = Math.abs(ifgF(x, z, 62, 0.0042, 2) - 0.5);
if (v > 0.03)
return 0;
var keep = 0;
[L.postAt, L.warAt, L.wildAt, L.lair].forEach(function (p) { var d = Math.hypot(x - p.x, z - p.z); keep = Math.max(keep, 1 - ifgSm(40, 70, d)); });
for (var i = 0; i < L.cones.length; i++) {
var C = L.cones[i];
if (Math.hypot(x - C.x, z - C.z) < C.r * 0.9)
return 0;
}
var r = Math.hypot(x, z);
if (r < IFG.R.full + 30)
return 0;
return (1 - ifgSm(0.012, 0.03, v)) * (1 - keep);
},
function (x, z, full) {
var S = IFG_S;
S.h = 0;
S.s = 0;
S.g = 0;
S.r = 0;
S.n = 0;
S.cr = 0;
S.cg = 0;
S.cb = 0;
S.full = !!full;
var r = Math.hypot(x, z), R = IFG.R;
if (r <= 400) {
S.h = IFG_H0(x, z);
if (full)
ifgOldMade(x, z, S, 1);
return S;
}
var t = ifgSm(R.inner, R.full, r);
var inner = 0;
if (t < 1) {
inner = IFG_H0(x, z) - ifgOldRise(x, z, r);
}
if (t > 0) {
var W = ifgWhich(x, z), h0 = S.h;
IFG_LAND_FN[W.a](x, z, r, S, W.wa * t);
if (W.b)
IFG_LAND_FN[W.b](x, z, r, S, W.wb * t);
}
if (t < 1) {
S.h += inner * (1 - t);
if (full)
ifgOldMade(x, z, S, 1 - t);
}
if (r > R.inner && r < R.full + 40) {
var u = (r - R.inner) / (R.full + 40 - R.inner);
S.h += Math.pow(Math.sin(u * Math.PI), 2) * 7 * (0.5 + ifgN(x, z, 91, 0.012));
}
if (r > R.edge) {
var W2 = ifgWhich(x, z), sea = (W2.a === "coast" ? W2.wa : 0) + (W2.b === "coast" ? W2.wb : 0);
S.h += Math.pow((r - R.edge) / 70, 2) * 20 * (0.7 + wNoise(x * 0.008, z * 0.008, 95) * 0.6) * Math.max(0, 1 - sea * 1.6);
}
if (full && t > 0 && typeof ifgOnPath === "function" && ifgOnPath(x, z, 3.6)) {
var k = ifgOnPath(x, z, 2.2) ? 0.8 : 0.4;
S.g *= 1 - k;
S.s *= 1 - k * 0.6;
S.r *= 1 - k * 0.7;
S.n *= 1 - k;
S.cr += (0.42 - S.cr) * k;
S.cg += (0.34 - S.cg) * k;
S.cb += (0.25 - S.cb) * k;
}
return S;
},
function (x, z, S, k) {
var c = IFG_C0(x, z);
var w = { 0x6A6040: [0.3, 0, 0], 0x5A5E3A: [0, 0.6, 0], 0x5E6A3A: [0, 0.7, 0], 0x5A4632: [0, 0, 0], 0x5A5A5E: [0, 0, 0.5], 0xC8A878: [1, 0, 0], 0x7A6A50: [0.6, 0, 0.1],
0x3A3236: [0, 0, 0.45], 0x6A7A4A: [0, 0.8, 0], 0x4A6A3A: [0, 0.7, 0.1], 0x3A6A72: [0, 0, 0.8], 0x4A4A3A: [0, 0.4, 0.2], 0x6A6460: [0, 0, 0.6] }[c] || [0, 0.4, 0];
S.s += w[0] * k;
S.g += w[1] * k;
S.r += w[2] * k;
ifgTint(S, c, k * 1.15);
},
function (name) {
var lite = ifgLite(), key = name;
if (IFG.tex[key])
return IFG.tex[key];
var t = new THREE.TextureLoader().load("assets/textures/photo/" + name + (lite ? "" : "-1k") + ".jpg");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
try {
t.anisotropy = Math.min(lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
t.encoding = THREE.LinearEncoding;
return (IFG.tex[key] = t);
},
function () {
if (IFG.mats.ground)
return IFG.mats.ground;
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true });
var U = { tS: { value: ifgTex("sand") }, tG: { value: ifgTex("grass") }, tR: { value: ifgTex("stone") }, tN: { value: ifgTex("snow") }, tE: { value: ifgTex("earth") } };
var lin = THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding;
m.onBeforeCompile = function (sh) {
for (var k in U)
sh.uniforms[k] = U[k];
sh.vertexShader = IFG_GROUND_VS + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n vIfgW=ifgW; vIfgP=position.xz;");
sh.fragmentShader = "uniform sampler2D tS; uniform sampler2D tG; uniform sampler2D tR; uniform sampler2D tN; uniform sampler2D tE;\nvarying vec4 vIfgW;\nvarying vec2 vIfgP;\n" +
"vec3 ifgL(vec3 c){ " + (lin ? "return pow(c,vec3(2.2));" : "return c;") + " }\n" + sh.fragmentShader.replace("#include <color_fragment>", "#include <color_fragment>\n" +
" vec2 P=vIfgP;\n" +
" vec3 cs=mix(ifgL(texture2D(tS,P/5.0).rgb),ifgL(texture2D(tS,P/19.0+0.31).rgb),0.4);\n" +
" vec3 cg=mix(ifgL(texture2D(tG,P/4.0).rgb),ifgL(texture2D(tG,P/17.0+0.37).rgb),0.45);\n" +
" vec3 cr=mix(ifgL(texture2D(tR,P/7.0).rgb),ifgL(texture2D(tR,P/23.0).rgb),0.4);\n" +
" vec3 cn=mix(ifgL(texture2D(tN,P/6.0).rgb),ifgL(texture2D(tN,P/21.0+0.2).rgb),0.35)*0.82;\n" +
" vec3 ce=mix(ifgL(texture2D(tE,P/5.0).rgb),ifgL(texture2D(tE,P/18.0+0.53).rgb),0.4);\n" +
" float se=max(0.0,1.0-vIfgW.x-vIfgW.y-vIfgW.z-vIfgW.w);\n" +
" vec3 cm=cs*vIfgW.x+cg*vIfgW.y+cr*vIfgW.z+cn*vIfgW.w+ce*se;\n" +
" diffuseColor.rgb*=cm*" + (lin ? "1.6" : "1.25") + ";\n");
};
m.customProgramCacheKey = function () { return "ifgGround" + (lin ? 1 : 0); };
m.userData.noReal = 1;
return (IFG.mats.ground = m);
},
function (G) {
var lite = ifgLite(), mat = ifgGroundMat(), made = 0;
IFG.tiles.forEach(function (T) { if (T.m.parent)
T.m.parent.remove(T.m); T.m.geometry.dispose(); });
IFG.tiles = [];
for (var tz = -IFG_EXT; tz < IFG_EXT; tz += IFG_TILE)
for (var tx = -IFG_EXT; tx < IFG_EXT; tx += IFG_TILE) {
var cx = tx + IFG_TILE / 2, cz = tz + IFG_TILE / 2, near = Math.hypot(Math.max(0, Math.abs(cx) - IFG_TILE / 2), Math.max(0, Math.abs(cz) - IFG_TILE / 2));
if (near > IFG_EXT + 20)
continue;
var fine = Math.hypot(cx, cz) < 760, n = fine ? (lite ? 26 : 40) : (lite ? 12 : 20);
var m = new THREE.Mesh(ifgTileGeo(tx, tz, IFG_TILE, n), mat);
m.receiveShadow = true;
m.userData.keep = 1;
m.name = "ifg-ground";
G.add(m);
IFG.tiles.push({ m: m, cx: cx, cz: cz });
made++;
}
return made;
},
function (x0, z0, size, n) {
var st = size / n, W = n + 3, H = [], i, j;
for (j = 0; j < W; j++)
for (i = 0; i < W; i++) {
H.push(ifgGround(x0 + (i - 1) * st, z0 + (j - 1) * st, false).h);
}
var nv = (n + 1) * (n + 1), skirt = 4 * n + 4, pos = new Float32Array((nv + skirt) * 3), nor = new Float32Array((nv + skirt) * 3), col = new Float32Array((nv + skirt) * 3), wt = new Float32Array((nv + skirt) * 4);
var idx = [], v = 0;
for (j = 0; j <= n; j++)
for (i = 0; i <= n; i++) {
var x = x0 + i * st, z = z0 + j * st, S = ifgGround(x, z, true), h = S.h;
var hl = H[(j + 1) * W + i], hr = H[(j + 1) * W + i + 2], hd = H[j * W + i + 1], hu = H[(j + 2) * W + i + 1];
var gx = (hr - hl) / (2 * st), gz = (hu - hd) / (2 * st), sl = Math.hypot(gx, gz), ln = Math.sqrt(gx * gx + gz * gz + 1);
pos[v * 3] = x;
pos[v * 3 + 1] = h;
pos[v * 3 + 2] = z;
nor[v * 3] = -gx / ln;
nor[v * 3 + 1] = 1 / ln;
nor[v * 3 + 2] = -gz / ln;
var rk = ifgSm(0.55, 1.05, sl), keep = 1 - rk, s = S.s * keep, g = S.g * keep, r = S.r * keep + rk * 0.85, sn = S.n * (1 - rk * 0.7), tot = s + g + r + sn;
if (tot > 1) {
s /= tot;
g /= tot;
r /= tot;
sn /= tot;
}
wt[v * 4] = s;
wt[v * 4 + 1] = g;
wt[v * 4 + 2] = r;
wt[v * 4 + 3] = sn;
var cr = S.cr, cg = S.cg, cb = S.cb;
if (rk > 0) {
var rc = S.n > 0.5 ? 0.6 : 0.58, rq = rk * 0.8;
cr += (rc - cr) * rq;
cg += (rc * 0.97 - cg) * rq;
cb += (rc * 0.95 - cb) * rq;
}
col[v * 3] = cr;
col[v * 3 + 1] = cg;
col[v * 3 + 2] = cb;
v++;
}
for (j = 0; j < n; j++)
for (i = 0; i < n; i++) {
var a = j * (n + 1) + i, b = a + 1, c = a + (n + 1), d = c + 1;
idx.push(a, c, b, b, c, d);
}
var edge = [];
for (i = 0; i <= n; i++)
edge.push(i);
for (j = 1; j <= n; j++)
edge.push(j * (n + 1) + n);
for (i = n - 1; i >= 0; i--)
edge.push(n * (n + 1) + i);
for (j = n - 1; j >= 1; j--)
edge.push(j * (n + 1));
var s0 = v;
edge.forEach(function (e) {
pos[v * 3] = pos[e * 3];
pos[v * 3 + 1] = pos[e * 3 + 1] - 2.5;
pos[v * 3 + 2] = pos[e * 3 + 2];
for (var q = 0; q < 3; q++) {
nor[v * 3 + q] = nor[e * 3 + q];
col[v * 3 + q] = col[e * 3 + q];
}
for (var q2 = 0; q2 < 4; q2++)
wt[v * 4 + q2] = wt[e * 4 + q2];
v++;
});
for (var k = 0; k < edge.length; k++) {
var e0 = edge[k], e1 = edge[(k + 1) % edge.length], s1 = s0 + k, s2 = s0 + (k + 1) % edge.length;
idx.push(e0, s1, e1, e1, s1, s2, e0, e1, s1, e1, s2, s1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos.subarray(0, v * 3), 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor.subarray(0, v * 3), 3));
g.setAttribute("color", new THREE.BufferAttribute(col.subarray(0, v * 3), 3));
g.setAttribute("ifgW", new THREE.BufferAttribute(wt.subarray(0, v * 4), 4));
g.setIndex(idx);
g.computeBoundingSphere();
return g;
},
function () {
if (IFG.tex.lava)
return IFG.tex.lava;
var t = wTex(256, 256, function (x, w, h) {
var g = x.createLinearGradient(0, 0, w, h);
g.addColorStop(0, "#E8601A");
g.addColorStop(0.5, "#FF8A2A");
g.addColorStop(1, "#D84A12");
x.fillStyle = g;
x.fillRect(0, 0, w, h);
var R = wRand(661);
for (var i = 0; i < 70; i++) {
var cx = R() * w, cy = R() * h, r = 8 + R() * 26;
x.fillStyle = "rgba(" + (30 + R() * 30 | 0) + "," + (14 + R() * 12 | 0) + ",10," + (0.55 + R() * 0.35) + ")";
x.beginPath();
for (var a = 0; a < 7; a++) {
var an = a / 7 * Math.PI * 2, rr = r * (0.7 + R() * 0.5);
x.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr);
}
x.closePath();
x.fill();
}
for (var j = 0; j < 40; j++) {
x.strokeStyle = "rgba(255,200,90," + (0.25 + R() * 0.3) + ")";
x.lineWidth = 1 + R() * 2;
x.beginPath();
x.moveTo(R() * w, R() * h);
x.lineTo(R() * w, R() * h);
x.stroke();
}
}, [1, 1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(60, 60);
return (IFG.tex.lava = t);
},
function (G) {
var lite = ifgLite();
IFG.water = [];
var fen = ifgSheetRing(575, 1395, "fen", 19.5, IFG_FEN_Y, ifgWaterMat(0x2E3A2A, 0.86, 40));
G.add(fen);
IFG.water.push(fen);
var sea = ifgSheetRing(1060, 2350, "coast", 23.5, IFG_SEA_Y, ifgWaterMat(0x2C4C5C, 0.9, 90), 64);
G.add(sea);
IFG.water.push(sea);
var Lk = IFG_LANDS.frost.lake, ice = ifgSheetDisc(Lk.x, Lk.z, Lk.r + 6, 7.66, lite ? new THREE.MeshLambertMaterial({ color: 0xD8E8F2 }) : new THREE.MeshPhongMaterial({ color: 0xD0E2EE, shininess: 110, specular: 0x9AB0C0, transparent: true, opacity: 0.94 }));
G.add(ice);
IFG.water.push(ice);
var O = IFG_LANDS.dune.oasis, oa = ifgSheetDisc(O.x, O.z, O.r + 3, 1.4, ifgWaterMat(0x2E5A5A, 0.85, 90));
G.add(oa);
IFG.water.push(oa);
var lm = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: ifgLavaTex() });
lm.userData.noReal = 1;
var lava = ifgSheetRing(600, 1395, "ember", 19.5, IFG_LAVA_Y, lm, 56);
G.add(lava);
IFG.lava = lava;
IFG.water.push(lava);
if (!lite && typeof wGlow === "function") { }
},
function (list) {
var np = 0, ni = 0;
list.forEach(function (e) { var g = e[0].index ? e[0] : e[0]; np += g.attributes.position.count; ni += g.index ? g.index.count : g.attributes.position.count; });
var pos = new Float32Array(np * 3), nor = new Float32Array(np * 3), uv = new Float32Array(np * 2), idx = new Uint32Array(ni), o = 0, oi = 0, v = new THREE.Vector3(), nm = new THREE.Matrix3();
list.forEach(function (e) {
var g = e[0], M = e[1], P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv;
nm.getNormalMatrix(M);
for (var i = 0; i < P.count; i++) {
v.set(P.getX(i), P.getY(i), P.getZ(i)).applyMatrix4(M);
pos[(o + i) * 3] = v.x;
pos[(o + i) * 3 + 1] = v.y;
pos[(o + i) * 3 + 2] = v.z;
v.set(N.getX(i), N.getY(i), N.getZ(i)).applyMatrix3(nm).normalize();
nor[(o + i) * 3] = v.x;
nor[(o + i) * 3 + 1] = v.y;
nor[(o + i) * 3 + 2] = v.z;
if (U) {
uv[(o + i) * 2] = U.getX(i);
uv[(o + i) * 2 + 1] = U.getY(i);
}
}
if (g.index) {
for (var j = 0; j < g.index.count; j++)
idx[oi + j] = g.index.getX(j) + o;
oi += g.index.count;
}
else {
for (var k = 0; k < P.count; k++)
idx[oi + k] = o + k;
oi += P.count;
}
o += P.count;
});
var out = new THREE.BufferGeometry();
out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
out.setIndex(new THREE.BufferAttribute(idx, 1));
out.computeBoundingSphere();
return out;
},
function () {
if (IFG.kinds)
return IFG.kinds;
var lite = ifgLite(), s8 = lite ? 6 : 8, bark = bwSurfMat("bark", { col: 0x8A7460 }), dark = bwSurfMat("bark", { col: 0x5A4A3E }), pale = bwSurfMat("bark", { col: 0xB8B0A0 });
var leaf = function (c) { return bwSurfMat("leaf", { col: c }); }, rock = function (c) { return bwSurfMat("rock", { col: c }); };
var snow = lite ? new THREE.MeshLambertMaterial({ color: 0xF4F6FA }) : new THREE.MeshStandardMaterial({ color: 0xF4F6FA, roughness: 0.85 });
var K = {};
K.pine = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.16, 0.34, 6, 6), ifgM4(0, 3, 0)]]), m: bark },
{ g: ifgMerge([[new THREE.ConeGeometry(2.5, 4.2, s8), ifgM4(0, 4.4, 0)], [new THREE.ConeGeometry(2, 3.6, s8), ifgM4(0, 6.5, 0, 0, 0.4)], [new THREE.ConeGeometry(1.3, 3, s8), ifgM4(0, 8.5, 0, 0, 0.8)]]), m: leaf(0x3E5E34) }];
K.snowpine = [K.pine[0], { g: K.pine[1].g, m: leaf(0x34503A) },
{ g: ifgMerge([[new THREE.ConeGeometry(2.1, 1.3, s8), ifgM4(0, 5.3, 0)], [new THREE.ConeGeometry(1.6, 1.2, s8), ifgM4(0, 7.4, 0)], [new THREE.ConeGeometry(0.9, 1.4, s8), ifgM4(0, 9.4, 0)]]), m: snow }];
K.broad = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.3, 0.55, 7, 7), ifgM4(0, 3.5, 0)], [new THREE.CylinderGeometry(0.1, 0.2, 3.6, 5), ifgM4(0.9, 6, 0, 0, 0, -0.7)], [new THREE.CylinderGeometry(0.1, 0.2, 3.2, 5), ifgM4(-0.8, 6.2, 0.3, 0.3, 0, 0.7)]]), m: bark },
{ g: ifgMerge([[ifgLump(3.4, 11), ifgM4(0, 9, 0)], [ifgLump(2.6, 12), ifgM4(2.2, 7.6, 0.8)], [ifgLump(2.4, 13), ifgM4(-2, 7.8, -0.9)], [ifgLump(2.2, 14), ifgM4(0.3, 7.4, 2)]]), m: leaf(0x48682E) }];
K.giant = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.6, 1.2, 14, 8), ifgM4(0, 7, 0)]]), m: dark },
{ g: ifgMerge([[ifgLump(5.2, 21), ifgM4(0, 16, 0)], [ifgLump(4, 22), ifgM4(3.2, 13.5, 1)], [ifgLump(3.6, 23), ifgM4(-3, 14, -1.4)]]), m: leaf(0x3A5A28) }];
K.giantcrown = [K.giant[1]];
K.dead = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.12, 0.38, 6, 6), ifgM4(0, 3, 0)], [new THREE.CylinderGeometry(0.05, 0.12, 2.6, 5), ifgM4(0.7, 4.4, 0, 0, 0, -0.9)], [new THREE.CylinderGeometry(0.05, 0.12, 2.2, 5), ifgM4(-0.6, 5, 0.2, 0.4, 0, 0.9)], [new THREE.CylinderGeometry(0.04, 0.1, 1.8, 5), ifgM4(0, 5.4, -0.6, -0.9, 0, 0)]]), m: dark }];
var frond = [];
for (var f = 0; f < 7; f++) {
var a = f / 7 * Math.PI * 2;
frond.push([new THREE.BoxGeometry(0.5, 0.04, 3.4), ifgM4(Math.sin(a) * 1.5, 8.2, Math.cos(a) * 1.5, 0.35, a, 0)]);
}
K.palm = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.22, 0.3, 4.4, 6), ifgM4(0, 2.2, 0, 0, 0, 0.06)], [new THREE.CylinderGeometry(0.18, 0.22, 4, 6), ifgM4(0.3, 6.1, 0, 0, 0, 0.12)]]), m: pale }, { g: ifgMerge(frond), m: leaf(0x5A8A3A) }];
var blades = function (n, h, w, seed) { var R = wRand(seed), L = []; for (var i = 0; i < n; i++) {
var a = R() * 6.28, d = R() * 0.45, hh = h * (0.7 + R() * 0.5);
L.push([new THREE.ConeGeometry(w, hh, 3), ifgM4(Math.cos(a) * d, hh / 2, Math.sin(a) * d, (R() - 0.5) * 0.4, R() * 3, (R() - 0.5) * 0.4)]);
} return ifgMerge(L); };
K.reeds = [{ g: blades(lite ? 6 : 9, 2.4, 0.05, 31), m: leaf(0x7A8A4A) }];
K.tallgrass = [{ g: blades(lite ? 7 : 11, 1.35, 0.06, 32), m: leaf(0x9AA058) }];
K.heather = [{ g: ifgMerge([[ifgLump(0.7, 41, 7, 5, 0.55), ifgM4(0, 0.3, 0)]]), m: leaf(0x6A4A62) }];
var fronds = [];
for (var q = 0; q < 6; q++) {
var b = q / 6 * Math.PI * 2;
fronds.push([new THREE.ConeGeometry(0.28, 1.6, 3), ifgM4(Math.sin(b) * 0.5, 0.5, Math.cos(b) * 0.5, Math.cos(b) * 1.0, 0, -Math.sin(b) * 1.0, 1, 1, 0.25)]);
}
K.fern = [{ g: ifgMerge(fronds), m: leaf(0x4A7A34) }];
K.bush = [{ g: ifgMerge([[ifgLump(1.2, 51, 7, 5, 0.8), ifgM4(0, 0.8, 0)], [ifgLump(0.9, 52, 7, 5, 0.8), ifgM4(0.8, 0.6, 0.3)]]), m: leaf(0x55703A) }];
K.cactus = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.32, 0.38, 4.2, 8), ifgM4(0, 2.1, 0)], [new THREE.CylinderGeometry(0.2, 0.22, 1.4, 7), ifgM4(0.6, 2.2, 0, 0, 0, Math.PI / 2)], [new THREE.CylinderGeometry(0.2, 0.22, 1.6, 7), ifgM4(0.95, 2.9, 0)], [new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7), ifgM4(-0.5, 2.6, 0, 0, 0, Math.PI / 2)], [new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7), ifgM4(-0.8, 3.1, 0)]]), m: leaf(0x5A7A4A) }];
var cols = [];
var RB = wRand(61);
for (var c = 0; c < 7; c++) {
var a2 = c / 7 * Math.PI * 2, d2 = c ? 1.05 : 0, hh2 = 3 + RB() * 5;
cols.push([new THREE.CylinderGeometry(0.55, 0.58, hh2, 6), ifgM4(Math.cos(a2) * d2, hh2 / 2, Math.sin(a2) * d2)]);
}
K.basalt = [{ g: ifgMerge(cols), m: rock(0x4A4644) }];
K.hoodoo = [{ g: ifgMerge([[new THREE.CylinderGeometry(0.9, 1.6, 4, 7), ifgM4(0, 2, 0)], [new THREE.CylinderGeometry(0.7, 0.95, 3.4, 7), ifgM4(0, 5.6, 0)], [new THREE.CylinderGeometry(0.5, 0.7, 2.6, 7), ifgM4(0, 8.5, 0)], [ifgLump(1.5, 71, 7, 5, 0.45), ifgM4(0, 10.1, 0)]]), m: rock(0xB86A44) }];
K.crag = [{ g: ifgMerge([[new THREE.ConeGeometry(2.4, 11, 5), ifgM4(0, 5, 0)], [new THREE.ConeGeometry(1.4, 6, 5), ifgM4(1.8, 2.6, 0.6, 0, 0, -0.25)]]), m: lite ? new THREE.MeshLambertMaterial({ color: 0xBFDCEC }) : new THREE.MeshStandardMaterial({ color: 0xBFDCEC, roughness: 0.25, metalness: 0.05, transparent: true, opacity: 0.92 }) }];
K.boulder = [{ g: ifgMerge([[ifgLump(1.8, 81, 7, 5, 0.7), ifgM4(0, 0.8, 0)]]), m: rock(0x9A948C) }];
K.dark = [{ g: K.boulder[0].g, m: rock(0x3A3634) }];
K.redrock = [{ g: K.boulder[0].g, m: rock(0xB0704A) }];
K.snowrock = [{ g: K.boulder[0].g, m: rock(0xD8DCE2) }];
K.stack = [{ g: ifgMerge([[new THREE.CylinderGeometry(4, 7, 26, 9), ifgM4(0, 10, 0)], [ifgLump(4.4, 91, 8, 6, 0.6), ifgM4(0, 23, 0)]]), m: rock(0x8A847A) }];
return (IFG.kinds = K);
},
function (G) {
var K = ifgKinds(), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(), c = new THREE.Color(), lite = ifgLite();
Object.keys(IFG.plant || {}).forEach(function (key) {
var T = IFG.plant[key], ab = key.split(","), grp = ifgTileGroup(G, (+ab[0] + 0.5) * IFG_FT, (+ab[1] + 0.5) * IFG_FT);
Object.keys(T).forEach(function (k) {
var list = T[k], parts = K[k];
if (!parts)
return;
parts.forEach(function (part) {
var mesh = new THREE.InstancedMesh(part.g, part.m, list.length);
list.forEach(function (t, i) {
e.set(0, t[4], 0);
q.setFromEuler(e);
v.set(t[0], t[1], t[2]);
sc.set(t[3], t[3] * (0.92 + ((i * 7) % 5) * 0.04), t[3]);
m4.compose(v, q, sc);
mesh.setMatrixAt(i, m4);
var hh = ((i * 2654435761) >>> 0) % 100 / 100;
c.setRGB(0.84 + hh * 0.22, 0.86 + hh * 0.18, 0.82 + hh * 0.18);
mesh.setColorAt(i, c);
});
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
mesh.castShadow = !lite && /pine|broad|giant|palm|hoodoo|stack|basalt/.test(k);
mesh.receiveShadow = true;
mesh.userData.keep = 1;
grp.add(mesh);
});
});
});
IFG.plant = {};
},
function (x, z) {
for (var i = 0; i < IFG_ORDER.length; i++) {
var L = IFG_LANDS[IFG_ORDER[i]];
if (Math.hypot(x - L.postAt.x, z - L.postAt.z) < 42)
return true;
if (Math.hypot(x - L.lair.x, z - L.lair.z) < 16)
return true;
var Z = BW_Z["ifw_" + L.k];
if (Z) {
for (var t in Z.sp)
if (Math.hypot(x - Z.sp[t].x, z - Z.sp[t].z) < 9)
return true;
}
}
return ifgOnPath(x, z, 4);
},
function (x, z, rot, w, d, h, tex, col, roofTex, roofCol, y0) {
var y = y0 === undefined ? Math.min(bwH(x, z), bwH(x + w / 2, z), bwH(x - w / 2, z), bwH(x, z + d / 2), bwH(x, z - d / 2)) - 0.3 : y0, t = 0.3, H = h + 0.3, door = 1.5;
var put = function (lx, lz, ww, dd, hh, yy, c, tx) { var p = ifgW2(x, z, rot, lx, lz); ifgBox(tx || tex, ww, hh, dd, p.x, yy === undefined ? y : yy, p.z, rot, c === undefined ? col : c, true); };
put(0, -d / 2, w, t, H);
put(-w / 2, 0, t, d, H);
put(w / 2, 0, t, d, H);
var side = (w - door) / 2;
put(-(door / 2 + side / 2), d / 2, side, t, H);
put(door / 2 + side / 2, d / 2, side, t, H);
var lin = ifgW2(x, z, rot, 0, d / 2);
bwPut(tex, new THREE.BoxGeometry(door, 0.5, t), lin.x, y + H - 0.25, lin.z, 0, rot, 0, col);
var fl = ifgW2(x, z, rot, 0, 0);
bwPut("wood", new THREE.BoxGeometry(w - 0.2, 0.12, d - 0.2), fl.x, y + 0.36, fl.z, 0, rot, 0, 0x8A6A4A);
var pitch = 0.5, half = w / 2 + 0.4, rl = half / Math.cos(pitch);
[-1, 1].forEach(function (k) { var p = ifgW2(x, z, rot, k * half / 2, 0); bwPut(roofTex || "wood", new THREE.BoxGeometry(rl, 0.2, d + 0.8), p.x, y + H + Math.tan(pitch) * half / 2, p.z, 0, rot, -k * pitch, roofCol === undefined ? 0x6A4A30 : roofCol); });
var gab = ifgW2(x, z, rot, 0, -d / 2), gab2 = ifgW2(x, z, rot, 0, d / 2);
[gab, gab2].forEach(function (p) { var g = new THREE.CylinderGeometry(0.01, half, Math.tan(pitch) * half, 3, 1); g.rotateY(Math.PI / 6 + Math.PI / 2); bwPut(tex, g, p.x, y + H + Math.tan(pitch) * half / 2, p.z, 0, rot, 0, col, 1, 1, 0.05); });
var tb = ifgW2(x, z, rot, 0, -d * 0.15);
ifgBox("wood", 1.4, 0.08, 0.8, tb.x, y + 1.1, tb.z, rot, 0x7A5A3A, false);
ifgBox("wood", 0.12, 0.75, 0.12, tb.x, y + 0.36, tb.z, rot, 0x6A4A2A, false);
var s1 = ifgW2(x, z, rot, -0.9, -d * 0.15);
ifgBox("wood", 0.4, 0.5, 0.4, s1.x, y + 0.36, s1.z, rot, 0x6A4A2A, false);
var bd = ifgW2(x, z, rot, w / 2 - 0.8, -d / 2 + 1.1);
ifgBox("canvas", 1.1, 0.45, 2, bd.x, y + 0.36, bd.z, rot, 0xC8B898, false);
return { x: x, z: z, y: y, door: ifgW2(x, z, rot, 0, d / 2 + 1.2) };
},
function (x, z, rot, w, d, col) {
var y = bwH(x, z), c = Math.cos(rot), s = Math.sin(rot);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var p = ifgW2(x, z, rot, q[0] * w / 2, q[1] * d / 2); bwPut("wood", new THREE.CylinderGeometry(0.06, 0.06, 2.6, 5), p.x, y + 1.3, p.z, 0, 0, 0, 0x6A4A2A); });
[-1, 1].forEach(function (k) { var p = ifgW2(x, z, rot, k * w / 4, 0); bwPut("canvas", new THREE.BoxGeometry(w / 2 / Math.cos(0.45) + 0.2, 0.06, d + 0.3), p.x, y + 2.6 + Math.tan(0.45) * w / 4, p.z, 0, rot, -k * 0.45, col); });
var back = ifgW2(x, z, rot, 0, -d / 2);
bwPut("canvas", new THREE.BoxGeometry(w, 2.6, 0.06), back.x, y + 1.3, back.z, 0, rot, 0, col);
bwSolid({ x: back.x, z: back.z, hw: w / 2, hd: 0.15, rot: rot, h: 2.6, b: y });
},
function (G, x, z, face, r, h, col, name, frame) {
var y = bwH(x, z) - 0.6, gap = 1.25;
var g = new THREE.SphereGeometry(r, ifgLite() ? 12 : 18, ifgLite() ? 6 : 9, face - Math.PI + gap / 2, Math.PI * 2 - gap, 0, Math.PI / 2), P = g.attributes.position;
for (var i = 0; i < P.count; i++) {
var px = P.getX(i), py = P.getY(i), pz = P.getZ(i), k = 0.85 + 0.3 * wNoise(px * 0.4 + x, pz * 0.4 + py * 0.6, 7);
P.setXYZ(i, px * k, py * k * h / r, pz * k);
}
g.computeVertexNormals();
bwPlanarUV(g, BW_TILE.rock || 3.2, null);
var m = new THREE.Mesh(g, bwSurfMat("rock", { col: col, ds: true }));
m.position.set(x, y, z);
m.castShadow = !ifgLite();
m.receiveShadow = true;
ifgTileGroup(G, x, z).add(m);
for (var a = 0; a < Math.PI * 2; a += 0.42) {
var d = Math.atan2(Math.sin(a - face), Math.cos(a - face));
if (Math.abs(d) < gap / 2 + 0.12)
continue;
bwSolid({ x: x + Math.cos(a) * r, z: z - Math.sin(a) * r, r: 1.1, h: h, b: y });
}
if (frame) {
var mx = x + Math.cos(face) * r, mz = z - Math.sin(face) * r, rot = face + Math.PI / 2;
[-1, 1].forEach(function (k) { var p = ifgW2(mx, mz, rot, k * 1.6, 0); bwPut("wood", new THREE.BoxGeometry(0.3, 3, 0.3), p.x, y + 0.6 + 1.5, p.z, 0, rot, 0, 0x6A4A2A); });
bwPut("wood", new THREE.BoxGeometry(3.6, 0.3, 0.35), mx, y + 0.6 + 3.1, mz, 0, rot, 0, 0x5A3A22);
}
ifgDeepAdd(x, z, r * 0.8, name, false);
},
function (ax, az, bx, bz, h, col) {
var L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.round(L / 4)), rot = Math.atan2(-(bz - az), bx - ax);
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = bwH(x, z) - 0.2, hh = (h || 1.2) * (0.85 + 0.3 * wNoise(x, z, 3));
if (wNoise(x * 0.3, z * 0.3, 9) < 0.18)
continue;
ifgBox("stone", L / n + 0.15, hh, 0.8, x, y, z, rot, col || 0xA8A296);
}
},
function (L) {
var lv = typeof cbtLevel === "function" ? cbtLevel() : null, chief = BW_KINDS[L.wild.chief];
var html = worldFacts(L.name, L.post.name + ", its outpost", [["Combat level", L.lv + " (the wild ground " + (L.lv + 3) + ")" + (lv ? " · you are " + lv : "")], ["The war", L.war.name], ["The wild", L.wild.name], ["Its chief", chief ? chief.name : ""]], [L.about, ifgHideTip(L.k), "Bring down " + (chief ? chief.name : "the chief") + " and it may leave something rare: one of Ironfray's artifacts."]);
worldCard(html, {});
},
function (k) {
return { coast: "To hide: the sea caves under the cliffs, the wreck's hull, the rocks of the shore.",
frost: "To hide: the snow caves, crouch among the snow-bowed scrub, keep a crag between you and them.",
moor: "To hide: crouch in the long grass or the heather, behind the stone walls, inside the abbey's walls.",
weald: "To hide: crouch in the ferns, crawl into a hollow log, the bears' caves in the ravine.",
fen: "To hide: crouch in the reeds; the stilt huts; the sunken boats.",
ember: "To hide: the lava tubes, behind the basalt columns. Keep out of the lava: it burns.",
bad: "To hide: the old mine adits, behind the hoodoos, up on the mesas.",
dune: "To hide: behind the dune crests, among the temple's fallen stones, in the oasis reeds." }[k];
},
function (G, L, R) {
var lh = ifgP(L, 1050, -60), y = bwH(lh.x, lh.z) - 0.3, n = 14;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
if (i === 0)
continue;
var x = lh.x + Math.cos(a) * 3.4, z = lh.z + Math.sin(a) * 3.4;
ifgBox("stone", 1.6, 15, 0.7, x, y, z, -a + Math.PI / 2, 0xE8E4DA);
}
bwPut("rust", new THREE.CylinderGeometry(2.4, 2.4, 2.2, 12, 1, true), lh.x, y + 16, lh.z, 0, 0, 0, 0x3A3A3A);
if (typeof wGlow === "function") {
var gl = wGlow(0xFFE0A0, 9, 0.5);
gl.position.set(lh.x, y + 16.5, lh.z);
G.add(gl);
}
ifgDeepAdd(lh.x, lh.z, 3, "the lighthouse", false);
var wr = ifgP(L, 1150, 40), wy = bwH(wr.x, wr.z) - 0.4, wrot = L.a + 0.6;
[-1, 1].forEach(function (k) { var p = ifgW2(wr.x, wr.z, wrot, k * 2.2, 0); ifgBox("wood", 0.4, 3.2, 16, p.x, wy, p.z, wrot, 0x5A4232, true, 0, k * 0.25); });
var bow = ifgW2(wr.x, wr.z, wrot, 0, 8.4);
ifgBox("wood", 4, 3.4, 0.5, bow.x, wy, bow.z, wrot, 0x5A4232, true);
var mast = ifgW2(wr.x, wr.z, wrot, 0, 2);
bwPut("wood", new THREE.CylinderGeometry(0.2, 0.25, 9, 6), mast.x, wy + 4, mast.z, 0.5, wrot, 0.2, 0x4A3828);
ifgDeepAdd(wr.x, wr.z, 3.4, "the wreck's hull", false);
[-130, 10, 150].forEach(function (s, i) { var p = ifgP(L, 1100, s); ifgDen(G, p.x, p.z, -L.a, 6.5, 4.6, 0x8A847A, "a sea cave"); });
for (var j = 0; j < 9; j++) {
var q = ifgP(L, 1240 + R() * 120, (R() - 0.5) * 700);
ifgPlant("stack", q.x, q.z, 0.6 + R() * 0.6, R() * 6, -2.4);
}
ifgScatter("coast", ifgLite() ? 60 : 120, function (x, z, R) {
var h = bwH(x, z);
if (h < 1)
return false;
var r = Math.hypot(x, z);
if (r > 1060 && r < 1100)
return false;
ifgPlant(h < 2.6 ? "boulder" : R() < 0.5 ? "bush" : "boulder", x, z, 0.6 + R() * 0.8, R() * 6);
}, R);
for (var k = 0; k < (ifgLite() ? 10 : 18); k++) {
var hp = ifgP(L, 700 + R() * 330, (R() - 0.5) * 600);
if (ifgBusy(hp.x, hp.z))
continue;
ifgHidePatch(hp.x, hp.z, 3 + R() * 2, "tallgrass", R);
}
},
function (G, L, R) {
var W = L.warAt, U = ifgU(L);
for (var i = -6; i <= 6; i++) {
if (i % 3 === 0)
continue;
var x = W.x + U.ux * 20 + U.tx * i * 9, z = W.z + U.uz * 20 + U.tz * i * 9;
ifgBox("concrete", 8.6, 4.2, 2.2, x, bwH(x, z) - 0.4, z, -L.a, 0xC8E0EC);
}
ifgScatter("frost", ifgLite() ? 260 : 560, function (x, z, R) {
var lk = IFG_LANDS.frost.lake;
if (Math.hypot(x - lk.x, z - lk.z) < lk.r + 8)
return false;
var n = ifgN(x, z, 24, 0.01);
if (n < 0.48)
return false;
ifgPlant("snowpine", x, z, 0.8 + R() * 0.6, R() * 6);
}, R);
ifgScatter("frost", ifgLite() ? 24 : 46, function (x, z, R) { ifgPlant("crag", x, z, 0.7 + R() * 0.9, R() * 6); }, R);
ifgScatter("frost", ifgLite() ? 40 : 80, function (x, z, R) { ifgPlant("snowrock", x, z, 0.6 + R() * 0.9, R() * 6); }, R);
for (var k = 0; k < 4; k++) {
var p = ifgP(L, 760 + k * 170, (k % 2 ? 1 : -1) * (120 + R() * 120));
if (ifgBusy(p.x, p.z))
continue;
ifgDen(G, p.x, p.z, R() * 6.28, 6, 4.2, 0xE4E8EE, "a snow cave");
}
for (var h = 0; h < (ifgLite() ? 10 : 18); h++) {
var hp = ifgP(L, 650 + R() * 600, (R() - 0.5) * 700);
if (ifgBusy(hp.x, hp.z))
continue;
ifgHidePatch(hp.x, hp.z, 2.6 + R() * 2, "bush", R);
}
},
function (G, L, R) {
for (var i = 0; i < (ifgLite() ? 7 : 12); i++) {
var a = ifgP(L, 620 + R() * 650, (R() - 0.5) * 700), ang = R() * Math.PI, len = 40 + R() * 70;
if (ifgBusy(a.x, a.z))
continue;
ifgStoneWall(a.x, a.z, a.x + Math.cos(ang) * len, a.z + Math.sin(ang) * len, 1.2);
}
var ab = ifgP(L, 880, 70), ar = -L.a, ay = bwH(ab.x, ab.z) - 0.3;
[-1, 1].forEach(function (k) { for (var s = -3; s <= 3; s++) {
var p = ifgW2(ab.x, ab.z, ar, k * 6, s * 4);
ifgBox("stone", 0.9, s % 2 ? 6 : 9, 3.2, p.x, ay, p.z, ar, 0xB8B0A0);
} });
var e = ifgW2(ab.x, ab.z, ar, 0, -14);
ifgBox("stone", 13, 11, 0.9, e.x, ay, e.z, ar, 0xB0A898);
[-1, 1].forEach(function (k) { var p = ifgW2(ab.x, ab.z, ar, k * 4.2, 14); ifgBox("stone", 4.4, 7, 0.9, p.x, ay, p.z, ar, 0xB0A898); });
ifgDeepAdd(ab.x, ab.z, 5, "the abbey's nave", true);
var ss = ifgP(L, 1000, -140);
for (var j = 0; j < 12; j++) {
var a2 = j / 12 * Math.PI * 2, x = ss.x + Math.cos(a2) * 11, z = ss.z + Math.sin(a2) * 11;
ifgBox("stone", 1.3, 3.2 + R() * 1.4, 0.8, x, bwH(x, z) - 0.3, z, -a2, 0x9A968C);
}
for (var k2 = 0; k2 < (ifgLite() ? 18 : 34); k2++) {
var hp = ifgP(L, 620 + R() * 700, (R() - 0.5) * 750);
if (ifgBusy(hp.x, hp.z))
continue;
ifgHidePatch(hp.x, hp.z, 3 + R() * 3, R() < 0.35 ? "heather" : "tallgrass", R);
}
ifgScatter("moor", ifgLite() ? 30 : 60, function (x, z, R) { ifgPlant(R() < 0.6 ? "boulder" : "broad", x, z, 0.6 + R() * 0.6, R() * 6); }, R);
},
function (G, L, R) {
ifgScatter("weald", ifgLite() ? 700 : 1500, function (x, z, R) {
var dense = ifgN(x, z, 44, 0.008);
if (dense < 0.32)
return false;
ifgPlant(R() < 0.12 ? "giant" : R() < 0.62 ? "broad" : R() < 0.85 ? "pine" : "dead", x, z, 0.75 + R() * 0.5, R() * 6);
}, R);
for (var k = 0; k < (ifgLite() ? 18 : 34); k++) {
var hp = ifgP(L, 600 + R() * 720, (R() - 0.5) * 760);
if (ifgBusy(hp.x, hp.z))
continue;
ifgHidePatch(hp.x, hp.z, 3 + R() * 2.5, "fern", R);
}
for (var j = 0; j < (ifgLite() ? 7 : 12); j++) {
var p = ifgP(L, 640 + R() * 680, (R() - 0.5) * 700);
if (ifgBusy(p.x, p.z))
continue;
var a = R() * Math.PI, y = bwH(p.x, p.z) + 0.75, g = new THREE.CylinderGeometry(1.15, 1.3, 9, ifgLite() ? 10 : 14, 1, true);
g.rotateZ(Math.PI / 2);
var m = new THREE.Mesh(g, bwSurfMat("bark", { col: 0x6A5442, ds: true }));
m.position.set(p.x, y, p.z);
m.rotation.y = a;
m.castShadow = !ifgLite();
ifgTileGroup(G, p.x, p.z).add(m);
[-1, 1].forEach(function (s) { var w = ifgW2(p.x, p.z, a, 0, s * 1.25); bwSolid({ x: w.x, z: w.z, hw: 4.5, hd: 0.2, rot: a, h: 2.2, b: y - 1 }); });
ifgDeepAdd(p.x, p.z, 3.6, "a hollow log", true);
}
var go = ifgP(L, 1000, -60), gf = -L.a + Math.PI, gy = bwH(go.x, go.z) - 0.5, gap = 1.0;
var tg = new THREE.CylinderGeometry(2.6, 3.4, 15, ifgLite() ? 12 : 18, 4, true, Math.PI / 2 + gf + gap / 2, Math.PI * 2 - gap);
bwPlanarUV(tg, 1.4, null);
var tm = new THREE.Mesh(tg, bwSurfMat("bark", { col: 0x5A4838, ds: true }));
tm.position.set(go.x, gy + 7.5, go.z);
tm.castShadow = !ifgLite();
ifgTileGroup(G, go.x, go.z).add(tm);
for (var a3 = 0; a3 < Math.PI * 2; a3 += 0.5) {
var d3 = Math.atan2(Math.sin(a3 - gf), Math.cos(a3 - gf));
if (Math.abs(d3) < gap / 2 + 0.15)
continue;
bwSolid({ x: go.x + Math.cos(a3) * 3.2, z: go.z - Math.sin(a3) * 3.2, r: 0.9 });
}
ifgPlant("giantcrown", go.x, go.z, 1.3, 0, gy - 2);
ifgDeepAdd(go.x, go.z, 2.4, "the Grandmother Oak's hollow", false);
for (var c = 0; c < 3; c++) {
var cp = ifgP(L, 1080 + c * 40, 60 + c * 35);
ifgDen(G, cp.x, cp.z, R() * 6.28, 5.5, 3.8, 0x6A6458, "a bear's cave");
}
},
function (G, L, R) {
ifgScatter("fen", ifgLite() ? 120 : 260, function (x, z, R) { if (bwH(x, z) < 0)
return false; ifgPlant(R() < 0.6 ? "dead" : "broad", x, z, 0.6 + R() * 0.4, R() * 6); }, R);
for (var k = 0; k < (ifgLite() ? 24 : 46); k++) {
var hp = ifgP(L, 600 + R() * 740, (R() - 0.5) * 780);
if (ifgBusy(hp.x, hp.z))
continue;
ifgHidePatch(hp.x, hp.z, 3 + R() * 3, "reeds", R);
}
var pts = [L.postAt, ifgP(L, 720, 30), L.warAt, ifgP(L, 990, -20), L.wildAt];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], ya = 0.85, len = Math.hypot(b.x - a.x, b.z - a.z), rot = Math.atan2(-(b.z - a.z), b.x - a.x);
BW.bridges.push({ a: { x: a.x, y: ya, z: a.z }, b: { x: b.x, y: ya, z: b.z } });
for (var s = 0; s < len; s += 3) {
var t = s / len, x = a.x + (b.x - a.x) * t, z = a.z + (b.z - a.z) * t;
bwPut("wood", new THREE.BoxGeometry(3.1, 0.12, 1.9), x, ya - 0.06, z, 0, rot, 0, 0x6A5A44);
if (Math.floor(s / 3) % 3 === 0) {
bwPut("wood", new THREE.CylinderGeometry(0.1, 0.1, 2.2, 5), x, ya - 1.1, z, 0, 0, 0, 0x4A3A2A);
}
}
}
for (var j = 0; j < 6; j++) {
var p = ifgP(L, 700 + R() * 600, (R() - 0.5) * 600);
if (ifgBusy(p.x, p.z))
continue;
var br = R() * 6.28, y = bwH(p.x, p.z) - 0.3;
[-1, 1].forEach(function (s) { var w = ifgW2(p.x, p.z, br, s * 1.1, 0); ifgBox("wood", 0.25, 1.3, 6, w.x, y, w.z, br, 0x4A3A2C, true, 0.15, s * 0.2); });
ifgDeepAdd(p.x, p.z, 1.6, "a sunken boat", true);
}
},
function (G, L, R) {
ifgScatter("ember", ifgLite() ? 50 : 110, function (x, z, R) { if (ifgLavaK(x, z) > 0 || bwH(x, z) < IFG_LAVA_Y + 0.3)
return false; ifgPlant("basalt", x, z, 0.7 + R() * 0.8, R() * 6); }, R);
ifgScatter("ember", ifgLite() ? 70 : 150, function (x, z, R) { if (ifgLavaK(x, z) > 0)
return false; ifgPlant(R() < 0.3 ? "dead" : "dark", x, z, 0.5 + R() * 0.9, R() * 6); }, R);
ifgScatter("ember", ifgLite() ? 14 : 26, function (x, z, R) { if (ifgLavaK(x, z) > 0)
return false; BW_CV.shard(x, z, R); }, R);
for (var k = 0; k < 5; k++) {
var p = ifgP(L, 720 + k * 150, (k % 2 ? 1 : -1) * (90 + R() * 140));
if (ifgBusy(p.x, p.z) || ifgLavaK(p.x, p.z) > 0)
continue;
ifgDen(G, p.x, p.z, R() * 6.28, 6.5, 4.4, 0x2E2A28, "a lava tube");
}
},
function (G, L, R) {
ifgScatter("bad", ifgLite() ? 40 : 90, function (x, z, R) { var h = bwH(x, z); if (h > 18)
return false; ifgPlant("hoodoo", x, z, 0.6 + R() * 0.8, R() * 6); }, R);
ifgScatter("bad", ifgLite() ? 60 : 130, function (x, z, R) { ifgPlant(R() < 0.2 ? "cactus" : R() < 0.4 ? "dead" : "redrock", x, z, 0.5 + R() * 0.8, R() * 6); }, R);
var made = 0;
for (var t = 0; t < 300 && made < 6; t++) {
var p = ifgP(L, 650 + R() * 700, (R() - 0.5) * 700);
if (ifgBusy(p.x, p.z))
continue;
var h = bwH(p.x, p.z), up = -1, best = 0;
for (var a = 0; a < 8; a++) {
var dx = Math.cos(a / 8 * 6.28), dz = Math.sin(a / 8 * 6.28), d = bwH(p.x + dx * 12, p.z + dz * 12) - h;
if (d > best) {
best = d;
up = a;
}
}
if (best < 10)
continue;
var fa = up / 8 * 6.28;
ifgDen(G, p.x + Math.cos(fa) * 3, p.z + Math.sin(fa) * 3, -fa + Math.PI, 5.2, 3.8, 0x9A6448, "an old mine adit", true);
made++;
}
var W = L.warAt;
for (var i = 0; i < 4; i++)
BW_CV.wreck(W.x + (R() - 0.5) * 80, W.z + (R() - 0.5) * 80, R);
},
function (G, L, R) {
var T = L.temple, tr = -L.a, ty = bwH(T.x, T.z) - 0.2;
ifgBox("stone", 26, 1.4, 20, T.x, ty - 0.6, T.z, tr, 0xD8C49A, false);
for (var c = -2; c <= 2; c++)
[-1, 1].forEach(function (k) { var p = ifgW2(T.x, T.z, tr, c * 5, k * 8); var hh = c % 2 ? 3 : 5.5; ifgBox("stone", 1.4, hh, 1.4, p.x, ty, p.z, tr, 0xE0CCA0); });
var sh = ifgW2(T.x, T.z, tr, 0, -9);
ifgBox("stone", 9, 6, 4, sh.x, ty, sh.z, tr, 0xD0BC90);
var dr = ifgW2(T.x, T.z, tr, 0, -6.6);
ifgDen(G, dr.x, dr.z, tr + Math.PI / 2, 4.2, 3.4, 0xC8B488, "the temple's sunken door");
var fl = ifgW2(T.x, T.z, tr, 6, 4);
ifgBox("stone", 7, 1.2, 1.4, fl.x, ty, fl.z, tr + 0.4, 0xD8C49A);
for (var i = 0; i < 4; i++) {
var p = ifgP(L, 950 + R() * 350, (R() - 0.5) * 600);
if (ifgBusy(p.x, p.z))
continue;
var ar = R() * 3, y = bwH(p.x, p.z) - 0.5;
[-1, 1].forEach(function (k) { var w = ifgW2(p.x, p.z, ar, k * 5, 0); ifgBox("stone", 2.4, 9, 2.6, w.x, y, w.z, ar, 0xC8885A); });
bwPut("stone", new THREE.BoxGeometry(13, 2.2, 2.6), p.x, y + 9.8, p.z, 0, ar, 0, 0xC07A50);
}
var O = L.oasis;
for (var j = 0; j < (ifgLite() ? 14 : 24); j++) {
var a = R() * 6.28, d = O.r + 3 + R() * 16;
ifgPlant("palm", O.x + Math.cos(a) * d, O.z + Math.sin(a) * d, 0.8 + R() * 0.5, R() * 6);
}
for (var k = 0; k < 6; k++) {
var a2 = k / 6 * 6.28 + R() * 0.4;
ifgHidePatch(O.x + Math.cos(a2) * (O.r + 2), O.z + Math.sin(a2) * (O.r + 2), 3, "reeds", R);
}
ifgScatter("dune", ifgLite() ? 30 : 60, function (x, z, R) { ifgPlant(R() < 0.4 ? "cactus" : R() < 0.6 ? "dead" : "redrock", x, z, 0.5 + R() * 0.6, R() * 6); }, R);
},
function (G, L, R) {
var P = L.postAt, S = IFG_POST[L.k], face = -L.a + Math.PI;
var spots = [[0, -12], [-12, -4], [12, -4], [-8, 10], [9, 11]], first = null;
spots.forEach(function (q, i) {
var p = ifgW2(P.x, P.z, face, q[0], q[1]), rot = Math.atan2(P.x - p.x, P.z - p.z);
if (S.tents) {
ifgTent(p.x, p.z, rot, 5, 4, [0xE0D0A8, 0xC8784A, 0x8A4A3A][i % 3]);
if (!first)
first = { x: p.x, z: p.z, door: ifgW2(p.x, p.z, rot, 0, 3.4) };
return;
}
if (S.stilt) {
var top = 1.55;
BW.plat.push({ x: p.x, z: p.z, r: 4.4, top: top });
for (var k = 0; k < 6; k++) {
var a = k / 6 * 6.28;
bwPut("wood", new THREE.CylinderGeometry(0.15, 0.15, 3, 6), p.x + Math.cos(a) * 3.6, top - 1.5, p.z + Math.sin(a) * 3.6, 0, 0, 0, 0x4A3A2A);
}
bwPut("wood", new THREE.CylinderGeometry(4.4, 4.4, 0.3, 12), p.x, top - 0.15, p.z, 0, 0, 0, 0x6A5A44);
BW.bridges.push({ a: { x: p.x, y: top, z: p.z }, b: { x: P.x, y: 0.85, z: P.z } });
var hu = ifgHut(p.x, p.z, rot, 5, 4.4, 2.6, S.tex, S.col, S.roof, S.rc, top - 0.3);
if (!first)
first = hu;
return;
}
var h = ifgHut(p.x, p.z, rot, 6, 5, 2.8, S.tex, S.col, S.roof, S.rc);
if (!first)
first = h;
});
var y = bwH(P.x, P.z);
for (var s = 0; s < 8; s++) {
var a = s / 8 * 6.28;
bwPut("stone", new THREE.DodecahedronGeometry(0.32, 0), P.x + Math.cos(a) * 0.9, y + 0.15, P.z + Math.sin(a) * 0.9, 0, a, 0, 0x6A6460);
}
try {
bwFire(G, P.x, y + 0.2, P.z, 0.9);
}
catch (e) { }
ifgBox("wood", 1.2, 0.9, 1.2, P.x + 4, y, P.z + 2, 0, 0xA87A50);
ifgBox("wood", 1.2, 0.9, 1.2, P.x + 4.4, y, P.z + 3.3, 0.4, 0xB89060);
var sg = wSign([L.post.name, L.name.replace(/^The /, "the ")], 4.6, 1.4, "#2A2018", "#E8D8A8");
var sp = ifgW2(P.x, P.z, face, 0, -20);
sg.position.set(sp.x, bwH(sp.x, sp.z) + 2.4, sp.z);
sg.rotation.y = Math.atan2(-sp.x, -sp.z);
G.add(sg);
if (first && first.door)
ifgKeeper(G, L, first.door, Math.atan2(P.x - first.door.x, P.z - first.door.z), S.title);
},
function (G) {
IFG_ORDER.forEach(function (k) {
var L = IFG_LANDS[k], p = ifgP(L, 500, 6), s = wSign([L.name.replace(/^The /, ""), "Combat level " + L.lv], 3.6, 1.4, "#2A2018", "#E8D8A8");
s.position.set(p.x, bwH(p.x, p.z) + 2.3, p.z);
s.rotation.y = Math.atan2(-p.x, -p.z);
G.add(s);
bwPut("wood", new THREE.CylinderGeometry(0.1, 0.12, 2.4, 6), p.x, bwH(p.x, p.z) + 1.0, p.z, 0, 0, 0, 0x6A4A2A);
});
},
function (L, R) {
var Z = BW_Z["ifw_" + L.k], lite = ifgLite();
(IFG_COVER[L.k] || []).forEach(function (e) {
var want = Math.max(1, Math.round(e[1] * (lite ? 0.5 : 1))), got = 0;
for (var t = 0; t < want * 12 && got < want; t++) {
var a = R() * 6.28, d = Math.sqrt(R()) * Z.r, x = Z.x + Math.cos(a) * d, z = Z.z + Math.sin(a) * d;
if (ifgBusy(x, z) || bwSolidAt(x, z, 0.5) || (L.k === "ember" && ifgLavaK(x, z) > 0) || (L.k === "fen" && bwH(x, z) < 0))
continue;
BW_CV[e[0]](x, z, R, e[2]);
got++;
}
});
},
function (G) {
var t0 = performance.now();
IFG.deep = [];
IFG.ftiles = [];
IFG.tg = {};
IFG.plant = {};
ifgBuildWaters(G);
IFG_ORDER.forEach(function (k, i) {
var L = IFG_LANDS[k], R = wRand(7100 + i * 977);
try {
ifgOutpost(G, L, R);
}
catch (e) {
ifgWarn("outpost " + k, e);
}
try {
IFG_BUILD[k](G, L, R);
}
catch (e) {
ifgWarn("land " + k, e);
}
try {
ifgCover(L, R);
}
catch (e) {
ifgWarn("cover " + k, e);
}
});
try {
ifgSignposts(G);
}
catch (e) {
ifgWarn("signs", e);
}
try {
ifgMorePeaks(G);
}
catch (e) {
ifgWarn("peaks", e);
}
try {
ifgMeadows(G);
}
catch (e) {
ifgWarn("meadows", e);
}
ifgPlantFlush(G);
bwFlush(G);
IFG.built = true;
IFG.buildMs = Math.round(performance.now() - t0);
},
function (G) {
if (typeof aupMeadow !== "function")
return;
var lite = ifgLite(), base = WORLDS.battle.base || BW.base;
IFG_MEADOWS.forEach(function (Md, i) {
var grow = function (x, z) {
var r = Math.hypot(x, z);
if (r < IFG.R.inner + 15 || r > IFG.R.edge + 30)
return false;
var W = ifgWhich(x, z), k = W.wa >= W.wb ? W.a : W.b;
if (!Md.lands[k])
return false;
if (ifgOnPath(x, z, 2.4))
return false;
if (k === "ember" && ifgLavaK(x, z) > 0)
return false;
var h = bwH(x, z);
if ((k === "coast" || k === "fen") && h < IFG_FEN_Y + 0.25)
return false;
if (k === "ember" && h < IFG_LAVA_Y + 0.3)
return false;
if (k === "dune" && ifgN(x, z, 71, 0.02) < 0.45)
return false;
return true;
};
try {
var m = aupMeadow(G, { lite: lite, origin: base, start: [0, 0], height: function (x, z) { return bwH(x, z); }, grow: grow, hMin: Md.hMin, hVar: Md.hVar, dens: Md.dens, seed: 811 + i * 37, cols: Md.cols });
if (m) {
m.name = "ifg-meadow";
if (!m.instanceColor) {
var n0 = m.count;
m.count = m.instanceMatrix.count;
m.setColorAt(0, new THREE.Color(Md.cols.base));
m.count = n0;
m.instanceColor.needsUpdate = true;
}
}
}
catch (e) {
ifgWarn("meadow", e);
}
});
},
function (dt) {
if (!IFG.built || WLD.on !== "battle")
return;
IFG.t += dt;
var L = worldLocal(), lite = ifgLite();
IFG.ct = (IFG.ct || 0) - dt;
if (IFG.ct <= 0) {
IFG.ct = 0.5;
try {
ifgHudPlace();
}
catch (e) { }
IFG.tiles.forEach(function (T) { var v = Math.hypot(T.cx - L.x, T.cz - L.z) < (lite ? 1150 : 1450); if (T.m.visible !== v)
T.m.visible = v; });
var far = (lite ? 560 : 820) + IFG_FT * 0.71;
IFG.ftiles.forEach(function (T) { var v = Math.hypot(T.x - L.x, T.z - L.z) < far; if (T.g.visible !== v)
T.g.visible = v; });
BW.f.forEach(function (F) {
if (F.team !== "folk" || F.st === "dead")
return;
if (!F.wT || BW.t > F.wT) {
F.wT = BW.t + 6 + Math.random() * 12;
var Z = BW_Z[F.zone];
if (!Z)
return;
var a = Math.random() * 6.28, d = Math.random() * Z.r * 0.7;
F.home = { x: Z.x + Math.cos(a) * d, z: Z.z + Math.sin(a) * d };
}
});
}
if (IFG.lava && IFG.lava.material.map) {
var M = IFG.lava.material.map;
M.offset.x = (M.offset.x + dt * 0.006) % 1;
M.offset.y = (M.offset.y + dt * 0.0025) % 1;
}
if (!BW.downT && !BW.ride && ifgInLava(L.x, L.z, L.y - 1.72)) {
IFG.hurtT -= dt;
if (IFG.hurtT <= 0) {
IFG.hurtT = 0.5;
bwHurtMe(9, null, true);
if (!IFG.toldLava || IFG.t - IFG.toldLava > 8) {
IFG.toldLava = IFG.t;
bwSay("<b>The lava burns!</b> Get out of it.");
}
}
}
var land = ifgLandAt(L.x, L.z);
if (land && !BW.zoneAt && !BW.ride)
worldBanner("<b>⚔️ Ironfray</b> · " + esc(land.name) + " · combat level " + land.lv);
if (land !== IFG.lastLand) {
IFG.lastLand = land;
if (land)
bwSay("<b>" + esc(land.name) + ".</b> " + esc(land.about) + " (Combat level " + land.lv + ".)");
}
},
function (o) {
var F = o.F, M = o.M, q = o.pvp;
if (F && (F.team === "folk" || F.team === "dummy"))
return null;
var f = { kind: q ? "pvp" : M ? "machine" : "bw", ref: F || M || q, x: o.x, y: o.y, z: o.z, r: o.r || 0.7,
name: F ? F.k.name : M ? ("the " + (M.T && M.T.name || "machine")) : (q.name || "a dreamer"),
lv: F ? ifgFoeLv(F) : M ? 18 : null, max: F ? F.max : M ? M.max : null,
hp: function () { return F ? F.hp : M ? M.hp : null; },
dead: function () { return F ? F.st === "dead" : M ? !M.alive : false; },
hit: function (d) { IFG.inCbt = 1; try {
bwStrikeFoe(o, d, {});
}
finally {
IFG.inCbt = 0;
} },
hold: function (s) { if (!F || F.k.chief || F.k.boss) {
if (F)
F.slow = Math.max(F.slow || 0, s);
return;
} F.spbHold = Math.max(F.spbHold || 0, s); F.slow = Math.max(F.slow || 0, s); F.cool = Math.max(F.cool || 0, s); },
calm: function (s) { if (!F || F.k.chief || F.k.boss)
return false; F.tgt = null; F.spbCalm = s; F.tAt = BW.t + s; return true; },
push: function (dx, dz, m) { if (!F || F.k.chief || F.k.boss || F.k.big)
return; var n = Math.hypot(dx, dz) || 1, nx = F.x + dx / n * m * 0.6, nz = F.z + dz / n * m * 0.6; if (!bwSolidAt(nx, nz, F.y + 0.3)) {
F.x = nx;
F.z = nz;
} } };
f.key = f.ref;
return f;
},
function () {
var bar = document.getElementById("bw-bar"), pad = document.getElementById("bw-pad");
var h = document.getElementById("cbt-hud"), on = !!(h && h.style.display !== "none" && typeof CBT !== "undefined" && CBT.on), top = null;
if (on) {
var R = h.getBoundingClientRect();
if (R.height > 0)
top = R.top;
}
var padRow = pad && pad.style.display !== "none" && pad.style.flexDirection === "row";
if (padRow && top != null) {
var pb = Math.round(innerHeight - top + 6) + "px";
if (pad.style.bottom !== pb)
pad.style.bottom = pb;
}
if (!bar)
return;
var want = "";
if (top != null) {
var lim = top;
if (padRow) {
var P = pad.getBoundingClientRect(), B = bar.getBoundingClientRect();
if (P.height && P.left < B.right && P.right > B.left)
lim = Math.min(lim, P.top);
}
want = Math.round(innerHeight - lim + 6) + "px";
}
if (bar.style.bottom !== want)
bar.style.bottom = want;
},
function (ARMS, CLASSES, MACHN) {
var out = [], wp = {};
Object.keys(ARMS).forEach(function (k) {
var A = ARMS[k];
if (!A || A.crafted || A.bought || A.relic || /^(cr\d|rl|bw_)/.test(k))
return;
var p = ifgWeaponPrice(A);
if (p == null)
return;
if (k === "longsword")
p = 0;
wp[k] = p;
out.push({ item: "w_" + k, name: A.name, kind: "weapon", price: p });
});
Object.keys(IFG_ARMOUR).forEach(function (k) { var A = IFG_ARMOUR[k]; out.push({ item: "a_" + k, name: A.name, kind: "armour", price: A.price }); });
Object.keys(IFG_SHIELDS).forEach(function (k) { var S = IFG_SHIELDS[k]; out.push({ item: "s_" + k, name: S.name, kind: "shield", price: S.price }); });
Object.keys(CLASSES).forEach(function (k) {
var C = CLASSES[k], sum = 0, parts = [];
(C.arms || []).forEach(function (a) { if (wp[a] != null) {
sum += wp[a];
parts.push("w_" + a);
} });
if (!parts.length)
return;
var fee = 200 + Math.round((C.armor || 0) * 6000) + Math.max(0, (C.hp || 100) - 100) * 15;
out.push({ item: "k_" + k, name: C.name + "'s kit", kind: "kit", price: Math.round((sum * 0.85 + fee) / 10) * 10, parts: parts });
});
Object.keys(IFG_MACH).forEach(function (t) {
var M = IFG_MACH[t], nm = (MACHN && MACHN[t]) || M.name || t;
out.push({ item: "m_" + t, name: nm, kind: "machine", price: M.price });
IFG_PARTS.forEach(function (p) { out.push({ item: "p_" + t + "_" + p[0], name: nm + ": " + p[1].toLowerCase(), kind: "part", price: Math.round(M.price / 4), machine: "m_" + t }); });
});
return out;
},
function (item) {
if (ifgIsKeeper())
return true;
ifgOwnedLoad();
ifgShopGoods();
if (IFG_SHOP.owned[item])
return true;
if (item === "w_longsword")
return true;
var m = /^w_(.+)$/.exec(item);
if (m && typeof bwOwns === "function" && bwOwns(m[1]) && (!IFG_SHOP.by[item] || ifgWonKept(m[1])))
return true;
var k = /^k_(.+)$/.exec(item);
if (k && !IFG_SHOP.by[item] && BW_CLASSES[k[1]])
return (BW_CLASSES[k[1]].arms || []).every(function (a) { return bwOwns(a); });
return false;
},
function () {
if (!ifgOpenShop() || ifgIsKeeper())
return 0;
var d = bwData(), K = bkpKept(), back = [];
for (var i = K.length - 1; i >= 0; i--) {
var q = K[i], m = /^bw_(.+)$/.exec(String(q.a || ""));
if (!m)
continue;
var it = "w_" + m[1], G = IFG_SHOP.by[it];
if (!G || !G.price || IFG_SHOP.owned[it] || q.got === "won")
continue;
if (typeof carrying !== "undefined" && carrying && carrying.archetype === q.a) {
try {
bkpStow(true);
}
catch (e) { }
}
K.splice(i, 1);
back.push(G.name);
}
if (d.cls && !ifgOwns("k_" + d.cls)) {
back.push((BW_CLASSES[d.cls] || {}).name + "'s kit");
d.cls = "";
}
if (d.arm && !ifgOwns("a_" + d.arm)) {
back.push((IFG_ARMOUR[d.arm] || {}).name);
d.arm = "";
}
if (d.sh && !ifgOwns("s_" + d.sh)) {
back.push((IFG_SHIELDS[d.sh] || {}).name);
d.sh = "";
}
if (back.length) {
try {
ifgArmourApply();
bwSave(true);
}
catch (e) { }
IFG_SHOP.back = back;
if (typeof bwSay === "function" && typeof WLD !== "undefined" && WLD.on === "battle")
bwSay("<b>The quartermaster has taken back " + back.length + " thing" + (back.length > 1 ? "s" : "") + " handed out free before the Armoury sold.</b> Buy them at the Armoury, or win them from foes: what you buy is yours on every device.", true);
}
return back.length;
},
function () {
if (IFG_SHOP.srv === "busy" || IFG_SHOP.srv === "ok" || IFG_SHOP.srv === "missing" || !ifgSigned())
return;
IFG_SHOP.srv = "busy";
cityRpc("battle_shop_me", {}).then(function (r) {
if (!r || r.ok === false) {
IFG_SHOP.srv = "later";
return;
}
IFG_SHOP.srv = "ok";
IFG_SHOP.keeper = !!r.keeper;
IFG_SHOP.owned = {};
(r.owned || []).forEach(function (i) { IFG_SHOP.owned[i] = 1; });
try {
bwData().own = Object.keys(IFG_SHOP.owned);
}
catch (e) { }
ifgShopGoods();
ifgShopSync();
ifgShopTidy();
}).catch(function (e) { var m = String((e && e.message) || e || ""); IFG_SHOP.srv = /PGRST202|Could not find the function|does not exist|schema cache/i.test(m) ? "missing" : "later"; });
},
function (item, then) {
var G = IFG_SHOP.by[item];
if (!G)
return;
if (!ifgSigned()) {
IFG_SHOP.msg = "Sign in to buy.";
then && then();
return;
}
IFG_SHOP.msg = "…";
cityRpc("battle_shop_buy", { p_item: item }).then(function (r) {
if (!r || !r.ok) {
IFG_SHOP.msg = esc((r && r.say) || "The clerk shakes his head.");
then && then();
return;
}
(r.owned || [item]).forEach(function (i) { IFG_SHOP.owned[i] = 1; });
try {
bwData().own = Object.keys(IFG_SHOP.owned);
bwSave(true);
}
catch (e) { }
ifgShopSync();
IFG_SHOP.msg = "<b>" + esc(r.say || ("Bought: " + G.name)) + "</b>";
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (typeof playTone === "function")
playTone(660, 0.12);
then && then(r);
}).catch(function (e) { IFG_SHOP.msg = esc((e && e.message) || String(e)); then && then(); });
},
function () {
ifgShopGoods();
ifgShopLoad();
var d = bwData(), fns = {}, S = IFG_SHOP, open = ifgOpenShop(), tab = S.tab, kp = ifgIsKeeper();
if (!open && S.srv === "later" && !S.retry) {
S.retry = 1;
setTimeout(function () { S.retry = 0; if (S.srv === "later") {
S.srv = "";
ifgShopLoad();
} }, 4000);
}
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Armoury</div>";
html += "<div style='opacity:.85;margin:4px 0'>Everything here is for sale, and yours on every device once bought. Weapons you win, make or find cost nothing." + (ifgPurse() ? " Your purse: <b>" + ifgPurse() + "</b>." : "") + "</div>";
if (kp)
html += "<div style='margin:4px 0;color:#9AFFA0'>Keeper: you pay nothing here. Every other dreamer pays the price shown.</div>";
else if (!open)
html += "<div style='margin:4px 0;color:#FFB86A'>" + (!ifgSigned() ? "Sign in to buy. Until you do, you can use only what you already own." : S.srv === "missing" ? "The Armoury's till is shut: nothing can be bought, and nothing is given away." : "The quartermaster is counting the stock… tap a tab in a moment.") + "</div>";
if (S.msg)
html += "<div style='margin:4px 0;color:#FFE7B0'>" + S.msg + "</div>";
html += "<div style='margin:6px 0'>" + [["kit", "Fighters' kits"], ["weapon", "Weapons"], ["armour", "Armour"], ["shield", "Shields"]].map(function (t) {
fns["t-" + t[0]] = function () { S.tab = t[0]; S.sure = null; S.msg = ""; ifgArmoury(); };
return "<span data-w='t-" + t[0] + "' style='display:inline-block;margin:2px;padding:5px 11px;border-radius:12px;border:1px solid " + (tab === t[0] ? "#E8C66A" : "rgba(143,180,232,.4)") + ";color:" + (tab === t[0] ? "#FFE7B0" : "#E8ECF4") + "'>" + t[1] + "</span>";
}).join("") + "</div>";
var buyRow = function (G, label, sub, use) {
var own = ifgOwns(G.item), key = "g-" + G.item;
if (own) {
html += worldBtn(key, label, kp && G.price ? "Keeper: free (players pay " + ifgPrice(G) + "). " + sub : sub);
fns[key] = use;
return;
}
if (!open) {
html += worldBtn(key, label + " · " + ifgPrice(G), sub);
fns[key] = function () { S.msg = ifgSigned() ? "The till is not answering yet: try again in a moment." : "Sign in to buy: what you buy is kept on your account."; if (ifgSigned() && S.srv !== "busy") {
S.srv = "";
ifgShopLoad();
} ifgArmoury(); };
return;
}
if (S.sure === G.item) {
html += worldBtn(key, "Buy " + label + " for " + ifgPrice(G) + "?", "Tap again to buy. " + sub);
fns[key] = function () { S.sure = null; ifgBuy(G.item, function (r) { if (r && r.ok)
use();
else
ifgArmoury(); }); };
}
else {
html += worldBtn(key, label + " · " + ifgPrice(G), sub);
fns[key] = function () { S.sure = G.item; ifgArmoury(); };
}
};
if (tab === "kit") {
html += "<div style='opacity:.75;font-size:12px'>A kit is a whole fighter: its weapons, its armour and its vigour, cheaper than buying them one by one. Fight as any kit you own.</div>";
Object.keys(BW_CLASSES).forEach(function (k) {
var C = BW_CLASSES[k], G = S.by["k_" + k];
if (!G) {
if (d.cls === k)
html += worldBtn("g-k_" + k, "✓ " + C.name, "Yours. Its artifacts are won, never sold.");
return;
}
buyRow(G, (d.cls === k ? "✓ " : "") + C.name, C.about + " Vigour " + C.hp + (C.armor ? ", armour " + Math.round(C.armor * 100) + "%" : "") + ". " + C.arms.map(function (a) { return (BW_ARMS[a] ? BW_ARMS[a].name : a) + (G.parts.indexOf("w_" + a) < 0 ? " (an artifact: won, not in the kit)" : ""); }).join(", ") + ".", function () {
d.cls = k;
var gave = C.arms.filter(function (a) { return BW_ARMS[a] && (bwOwns(a) || G.parts.indexOf("w_" + a) > -1); });
gave.forEach(function (a) { bwGive(a, true); });
if (gave[0])
bwEquip(gave[0]);
var Cn = bwClass();
BW.max = Cn.hp;
BW.hp = Math.min(BW.max, Math.max(BW.hp, Cn.hp));
bwSave(true);
worldCard(null);
bwSay("<b>You fight as a " + esc(C.name) + ".</b> Your kit is in your backpack.", true);
});
});
}
else if (tab === "weapon") {
BW_ERAS.forEach(function (era) {
var list = Object.keys(BW_ARMS).filter(function (k) { return BW_ARMS[k].era === era; });
if (!list.length)
return;
html += "<div style='margin:10px 0 2px;opacity:.75;font-size:12px;letter-spacing:.06em;text-transform:uppercase'>" + esc(era) + (era === "Artifacts" ? " · won, never sold" : "") + "</div>";
list.forEach(function (k) {
var A = BW_ARMS[k], G = S.by["w_" + k], own = G ? ifgOwns(G.item) : bwOwns(k), hands = ifgTwoHanded(k, A) ? "two hands" : "one hand";
var lbl = (own ? "✓ " : "") + esc(A.name) + (G && (!own || kp) && G.price ? " · " + ifgPrice(G) : "") + (!G && !own ? " · won only" : "");
var sure = S.sure === "w_" + k;
html += "<span data-w='w-" + k + "' title='" + hands + "' style='display:inline-block;margin:3px;padding:5px 10px;border-radius:12px;border:1px solid " + (own ? "#E8C66A" : sure ? "#FFB86A" : "rgba(143,180,232,.5)") + ";color:" + (own ? "#FFE7B0" : "#E8ECF4") + "'>" + (sure ? "Buy for " + ifgPrice(G) + "? tap again" : lbl) + " <small style='opacity:.6'>" + hands + "</small></span>";
fns["w-" + k] = function () {
if (own) {
bwGive(k);
worldCard(null);
bwSay("<b>" + esc(A.name) + "</b> in hand.");
return;
}
if (!G) {
S.msg = esc(A.name) + " is never sold: Ironfray's artifacts are won from the chiefs of the wild lands and the greatest foes.";
ifgArmoury();
return;
}
if (!open) {
S.msg = ifgSigned() ? "The till is not answering yet: try again in a moment." : "Sign in to buy: what you buy is kept on your account.";
if (ifgSigned() && S.srv !== "busy") {
S.srv = "";
ifgShopLoad();
}
ifgArmoury();
return;
}
if (!sure) {
S.sure = "w_" + k;
ifgArmoury();
return;
}
S.sure = null;
ifgBuy("w_" + k, function (r) { if (r && r.ok) {
bwGive(k);
worldCard(null);
bwSay("<b>" + esc(A.name) + "</b> bought: in hand, and in your backpack.", true);
}
else
ifgArmoury(); });
};
});
});
}
else if (tab === "armour") {
var wear = d.arm || "";
html += "<div style='opacity:.75;font-size:12px'>Worn over whatever kit you fight as: you take the better of the two.</div>";
html += worldBtn("g-none", (wear ? "" : "✓ ") + "No armour", "Only your kit's own.");
fns["g-none"] = function () { d.arm = ""; ifgArmourApply(); bwSave(true); ifgArmoury(); };
Object.keys(IFG_ARMOUR).forEach(function (k) {
var A = IFG_ARMOUR[k], G = S.by["a_" + k];
buyRow(G, (wear === k ? "✓ " : "") + A.name, A.about + " Armour " + Math.round(A.armor * 100) + "%, vigour +" + A.hp + ".", function () { d.arm = k; ifgArmourApply(); bwSave(true); worldCard(null); bwSay("<b>" + esc(A.name) + "</b>: you buckle it on.", true); });
});
}
else {
var sh = d.sh || "";
html += "<div style='opacity:.75;font-size:12px'>A shield goes on your other arm with a one-handed weapon (a sword, a spear, a pistol, a wand): it turns blows from in front, and holding block (V, the right button) behind it stops nearly all. A weapon that needs both hands puts the shield on your back.</div>";
html += worldBtn("g-nosh", (sh ? "" : "✓ ") + "No shield", "");
fns["g-nosh"] = function () { d.sh = ""; bwSave(true); ifgArmoury(); };
Object.keys(IFG_SHIELDS).forEach(function (k) {
var A = IFG_SHIELDS[k], G = S.by["s_" + k];
buyRow(G, (sh === k ? "✓ " : "") + A.name, A.about + " Turns " + Math.round(A.front * 100) + "% of a blow from in front; blocking, " + Math.round(A.block * 100) + "%.", function () { d.sh = k; bwSave(true); worldCard(null); bwSay("<b>" + esc(A.name) + "</b> on your arm.", true); });
});
}
worldCard(html, fns);
},
function (dt) {
var S = ifgShieldNow(), want = S && BW.vm && (typeof meView === "undefined" || meView === "eyes") ? (bwData().sh) : null;
if (IFG.shKey !== want) {
if (IFG.shM) {
scene.remove(IFG.shM);
IFG.shM = null;
}
IFG.shKey = want;
if (want) {
var g = new THREE.Group(), col = { buckler: 0x8A6A3A, round: 0x7A4A2A, heater: 0x8A8E96, tower: 0x6A5A44, riot: 0xBFD8E4, energy: 0x8AD8FF }[want] || 0x8A6A3A;
var lite = ifgLite(), mat = want === "riot" || want === "energy" ? new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: want === "energy" ? 0.45 : 0.5, depthWrite: false }) : (lite ? new THREE.MeshLambertMaterial({ color: col }) : new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, metalness: want === "heater" ? 0.7 : 0.2 }));
var m = want === "heater" || want === "tower" || want === "riot" ? new THREE.Mesh(new THREE.BoxGeometry(want === "tower" ? 0.7 : 0.5, want === "tower" ? 1.1 : 0.7, 0.05), mat) : new THREE.Mesh(new THREE.CylinderGeometry(want === "buckler" ? 0.22 : 0.36, want === "buckler" ? 0.22 : 0.36, 0.05, 20).rotateX(Math.PI / 2), mat);
g.add(m);
if (want !== "riot" && want !== "energy") {
var boss = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), lite ? new THREE.MeshLambertMaterial({ color: 0xB8B0A0 }) : new THREE.MeshStandardMaterial({ color: 0xB8B0A0, metalness: 0.8, roughness: 0.3 }));
boss.position.z = 0.04;
g.add(boss);
}
g.traverse(function (o) { if (o.isMesh) {
o.renderOrder = 20;
o.frustumCulled = false;
} });
scene.add(g);
IFG.shM = g;
}
}
if (!IFG.shM)
return;
IFG.shUp = (IFG.shUp || 0) + ((BW.block ? 1 : 0) - (IFG.shUp || 0)) * Math.min(1, dt * 10);
IFG.shHit = Math.max(0, (IFG.shHit || 0) - dt * 3);
var g = IFG.shM;
g.position.copy(camera.position);
g.quaternion.copy(camera.quaternion);
var off = new THREE.Vector3(-0.38 + IFG.shUp * 0.2, -0.42 + IFG.shUp * 0.22, -0.62 + IFG.shHit * 0.05).applyQuaternion(camera.quaternion);
g.position.add(off);
g.rotateY(0.5 - IFG.shUp * 0.4);
},
function (msg) {
ifgShopGoods();
ifgShopLoad();
var S = IFG_SHOP, open = ifgOpenShop(), fns = {};
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Motor Pool</div><div style='opacity:.85;margin:4px 0'>" +
(open ? "Stock war machines, bought whole, or built here a part at a time as you can afford them: frame, engine, armour, weapons. When all four are fitted, the machine is yours and rolls out whenever you ask." + (ifgPurse() ? " Your purse: <b>" + ifgPurse() + "</b>." : "") :
!ifgSigned() ? "Sign in to buy or build a war machine." : "The clerk is opening the books… try again in a moment.") +
" The Mechanic still builds machines of your own design from materials, at the bench.</div>";
if (msg || S.msg)
html += "<div style='margin:4px 0;color:#FFE7B0'>" + (msg || S.msg) + "</div>";
Object.keys(IFG_MACH).forEach(function (t) {
var T = IFG_MACH[t];
if (!BW_MACH[t])
return;
var G = S.by["m_" + t], own = ifgOwnsMach(t);
html += "<div style='margin:10px 0 2px;font-weight:600;color:#F4E2B0'>" + (own ? "✓ " : "") + esc(T.name) + (own ? " · yours" : " · " + ifgPrice(G)) + "</div>";
if (own || !open)
return;
var have = IFG_PARTS.filter(function (p) { return S.owned["p_" + t + "_" + p[0]]; }).length;
var kW = "m-" + t;
html += worldBtn(kW, S.sure === "m_" + t ? "Buy the whole " + T.name + " for " + ifgPrice(G) + "? Tap again" : "Buy it whole · " + ifgPrice(G), "Ready to drive at once.");
fns[kW] = function () { if (S.sure !== "m_" + t) {
S.sure = "m_" + t;
ifgMotorPool();
return;
} S.sure = null; ifgBuy("m_" + t, function () { ifgMotorPool(); }); };
html += "<div style='font-size:12.5px;opacity:.85'>Or build it: " + have + " of 4 parts fitted.</div>";
IFG_PARTS.forEach(function (p) {
var it = "p_" + t + "_" + p[0], P = S.by[it], got = S.owned[it];
html += "<span data-w='p-" + it + "' style='display:inline-block;margin:3px;padding:5px 10px;border-radius:12px;border:1px solid " + (got ? "#E8C66A" : "rgba(143,180,232,.5)") + ";color:" + (got ? "#FFE7B0" : "#E8ECF4") + "'>" + (got ? "✓ " + p[1] : S.sure === it ? "Fit the " + p[1].toLowerCase() + " for " + ifgPrice(P) + "? tap again" : p[1] + " · " + ifgPrice(P)) + "</span>";
if (!got)
fns["p-" + it] = function () { if (S.sure !== it) {
S.sure = it;
ifgMotorPool();
return;
} S.sure = null; ifgBuy(it, function () { ifgMotorPool(); }); };
});
});
worldCard(html, fns);
},
function () {
if (IFG_WH.el)
return IFG_WH.el;
var st = document.createElement("style");
st.id = "ifg-wh-css";
st.textContent = "body.ifg-wh #bw-bar,body.ifg-wh #bw-swap,body.ifg-wh #cbt-pad .st{display:none!important}" +
"#ifg-wh{position:fixed;inset:0;z-index:60;display:none;pointer-events:none}" +
"#ifg-wh .ring{position:absolute;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;background:radial-gradient(circle,rgba(14,10,8,.7) 0,rgba(14,10,8,.92) 64%,rgba(14,10,8,.0) 72%);box-shadow:0 0 0 2px rgba(232,198,106,.35) inset}" +
"#ifg-wh .w{position:absolute;width:66px;height:66px;margin:-33px 0 0 -33px;border-radius:50%;background:rgba(20,16,8,.9);border:2px solid rgba(200,138,90,.6);color:#F4E8D8;font:600 9.5px/1.1 var(--sans,system-ui);text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px;box-sizing:border-box;overflow:hidden}" +
"#ifg-wh .w em{font-style:normal;font-size:22px;line-height:1.1}" +
"#ifg-wh .w.on{border-color:#FFD27A;box-shadow:0 0 0 2px #FFD27A}#ifg-wh .w.hl{background:rgba(201,160,64,.95);color:#17120A;transform:scale(1.14)}" +
"#ifg-wh .mid{position:absolute;width:92px;height:92px;margin:-46px 0 0 -46px;border-radius:50%;background:rgba(14,10,8,.9);border:1px solid rgba(232,198,106,.5);color:#FFE7B0;font:600 11px/1.2 var(--sans,system-ui);display:flex;align-items:center;justify-content:center;text-align:center;padding:6px;box-sizing:border-box}" +
"#ifg-wh .pg{position:absolute;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(20,16,8,.9);border:1px solid #E8C66A;color:#FFE7B0;font:700 18px/38px system-ui;text-align:center}" +
"#t-arm.ifg-wh-b::after{content:'hold: weapons';position:absolute;left:0;right:0;bottom:7px;font-size:8.5px;font-weight:600;opacity:.7;letter-spacing:.02em}#t-arm.ifg-wh-b{position:relative}";
document.head.appendChild(st);
var el = document.createElement("div");
el.id = "ifg-wh";
document.body.appendChild(el);
IFG_WH.el = el;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ifg-wh"] = 1;
var down = function (e) {
var b = e.target && e.target.closest && e.target.closest("#t-arm");
if (!b || !ifgWhOn())
return;
e.preventDefault();
e.stopImmediatePropagation();
e.stopPropagation();
if (IFG_WH.held)
return;
IFG_WH.held = true;
b.classList.add("on");
var t = e.touches ? e.touches[0] : e, R = b.getBoundingClientRect();
IFG_WH.bx = R.left + R.width / 2;
IFG_WH.by = R.top + R.height / 2;
IFG_WH.downT = performance.now();
clearTimeout(IFG_WH.timer);
IFG_WH.timer = setTimeout(function () { if (IFG_WH.held)
ifgWhOpen(); }, 330);
};
var move = function (e) { if (!IFG_WH.open)
return; var t = e.touches ? e.touches[0] : e; e.preventDefault(); ifgWhHover(t.clientX, t.clientY); };
var up = function (e) {
if (!IFG_WH.held)
return;
IFG_WH.held = false;
clearTimeout(IFG_WH.timer);
clearInterval(IFG_WH.rep);
var b = document.getElementById("t-arm");
if (b)
b.classList.remove("on");
if (IFG_WH.open) {
var t = e.changedTouches ? e.changedTouches[0] : e;
if (t)
ifgWhHover(t.clientX, t.clientY);
ifgWhChoose();
}
else
ifgWhStrike();
};
document.addEventListener("touchstart", down, { capture: true, passive: false });
document.addEventListener("pointerdown", function (e) { if (e.pointerType !== "touch")
down(e); }, true);
document.addEventListener("touchmove", move, { capture: true, passive: false });
document.addEventListener("pointermove", function (e) { if (e.pointerType !== "touch")
move(e); }, true);
["touchend", "touchcancel"].forEach(function (n) { document.addEventListener(n, up, true); });
document.addEventListener("pointerup", function (e) { if (e.pointerType !== "touch")
up(e); }, true);
el.addEventListener("pointerdown", function (e) {
var w = e.target.closest && e.target.closest("[data-wk],[data-pg]");
if (!w) {
ifgWhClose();
return;
}
e.preventDefault();
e.stopPropagation();
if (w.hasAttribute("data-pg")) {
IFG_WH.page += +w.getAttribute("data-pg");
ifgWhPaint();
return;
}
IFG_WH.pick = w.getAttribute("data-wk");
ifgWhChoose();
});
return el;
},
function () {
var el = ifgWhBuild();
IFG_WH.list = (typeof bwOwned === "function" ? bwOwned() : []).map(function (q) { return q.a.slice(3); }).filter(function (k) { return BW_ARMS[k]; });
if (!IFG_WH.list.length)
return;
IFG_WH.open = true;
IFG_WH.pick = null;
var cur = bwHeldKey(), i = IFG_WH.list.indexOf(cur);
IFG_WH.page = i >= 0 ? Math.floor(i / IFG_WH_N) : 0;
IFG_WH.cx = Math.max(160, Math.min(innerWidth - 160, IFG_WH.bx - 150));
IFG_WH.cy = Math.max(160, Math.min(innerHeight - 150, IFG_WH.by - 120));
if (innerHeight < 330)
IFG_WH.cy = innerHeight / 2;
el.style.display = "block";
el.style.pointerEvents = "auto";
ifgWhPaint();
if (typeof playTone === "function")
playTone(520, 0.04);
},
function () {
var L = IFG_WH.list, pages = Math.max(1, Math.ceil(L.length / IFG_WH_N));
IFG_WH.page = ((IFG_WH.page % pages) + pages) % pages;
var show = L.slice(IFG_WH.page * IFG_WH_N, IFG_WH.page * IFG_WH_N + IFG_WH_N), cx = IFG_WH.cx, cy = IFG_WH.cy, R = 112, cur = bwHeldKey();
var h = "<div class='ring' style='left:" + cx + "px;top:" + cy + "px'></div>";
IFG_WH.spots = [];
show.forEach(function (k, i) {
var a = -Math.PI / 2 + i / show.length * Math.PI * 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, A = BW_ARMS[k];
IFG_WH.spots.push({ k: k, x: x, y: y });
h += "<div class='w" + (k === cur ? " on" : "") + (k === IFG_WH.pick ? " hl" : "") + "' data-wk='" + k + "' style='left:" + x + "px;top:" + y + "px'><em>" + (BW_ERA_ICON[A.era] || "⚔️") + "</em>" + esc(A.name.replace(/^(Twin |Gladiator's |Bolt-action |Trench |Flame |Staff of |Flanged )/, "")).slice(0, 18) + "</div>";
});
var P = IFG_WH.pick && BW_ARMS[IFG_WH.pick];
h += "<div class='mid' style='left:" + cx + "px;top:" + cy + "px'>" + (P ? esc(P.name) : cur && BW_ARMS[cur] ? "In hand: " + esc(BW_ARMS[cur].name) : "Choose a weapon") + "</div>";
if (pages > 1) {
h += "<div class='pg' data-pg='-1' style='left:" + (cx - 150) + "px;top:" + (cy + 128) + "px'>‹</div><div class='pg' data-pg='1' style='left:" + (cx + 150) + "px;top:" + (cy + 128) + "px'>›</div>";
}
IFG_WH.el.innerHTML = h;
},
function (x, z) {
var r = Math.hypot(x, z);
if (r > IFG.R.inner + 15)
return "";
if (r < 46) {
if (Math.abs(x) < 3.5 || Math.abs(z) < 3.5 || r < 14)
return "";
return "camp";
}
if (r < 52)
return "";
for (var i = 0; i < BW_ZONES.length; i++) {
var Z = BW_ZONES[i];
if (Z.land || Z.post)
continue;
var d = Math.hypot(x - Z.x, z - Z.z);
if (d > Z.r + 10)
continue;
if (Z.k === "arena")
return d > 54 ? "arena" : "";
if (Z.k === "crater")
return d > 58 ? "crater" : "";
if (Z.k === "ruins" && Math.abs(z - Z.z) < 6)
return "";
if (Z.k === "pass" && Math.abs(z) < 5)
return "";
if (Z.k === "siege" && Math.abs(x - Z.x) < 37 && Math.abs(z - (Z.z - 40)) < 37)
return "";
return Z.k;
}
return "open";
},
function (x, z, R) {
var y = bwH(x, z);
bwPut("wood", ifsG("barrel", function () { return new THREE.CylinderGeometry(0.36, 0.33, 0.95, 10); }), x, y + 0.47, z, 0, R() * 6, 0, [0x6A4A2A, 0x5A3E24, 0x7A5A34][Math.floor(R() * 3)]);
bwPut("rust", ifsG("hoop", function () { return new THREE.CylinderGeometry(0.37, 0.37, 0.05, 10, 1, true); }), x, y + 0.75, z, 0, 0, 0, 0x3A3430);
ifsSolid({ x: x, z: z, r: 0.4, h: 1.0 });
},
function (x, z, R, ry) {
var y = bwH(x, z), c = Math.cos(ry), s = Math.sin(ry), L = 3.2;
for (var row = 0; row < 3; row++)
for (var i = 0; i < 5; i++) {
var o = -L / 2 + 0.32 + i * 0.64 + (row % 2 ? 0.32 : 0);
if (o > L / 2 - 0.2)
continue;
bwPut("canvas", ifsG("bag", function () { return new THREE.BoxGeometry(0.62, 0.28, 0.4); }), x + o * c, y + 0.14 + row * 0.27, z - o * s, 0, ry + (R() - 0.5) * 0.15, 0, [0xA89870, 0x988A64, 0xB0A07A][(i + row) % 3]);
}
ifsSolid({ x: x, z: z, hw: L / 2, hd: 0.25, rot: ry, h: 0.85 });
},
function (x, z, R, col) {
var y = bwH(x, z), s = 0.6 + R() * 0.6;
bwPut("leaf", ifsG("bush", function () { return new THREE.IcosahedronGeometry(1, 1); }), x, y + s * 0.55, z, 0, R() * 6, 0, col || [0x3E5A2A, 0x4A6A30, 0x34502A][Math.floor(R() * 3)], s * 1.2, s * 0.8, s * 1.1);
bwPut("leaf", ifsG("bush", function () { return new THREE.IcosahedronGeometry(1, 1); }), x + s * 0.7, y + s * 0.4, z + s * 0.3, 0, R() * 6, 0, col || 0x46622C, s * 0.7, s * 0.6, s * 0.7);
ifsSolid({ x: x, z: z, r: s * 0.9, h: 1.2 });
},
function (x, z, R) {
var y = bwH(x, z), h = 4 + R() * 3, ry = R() * 6;
var bark = 0x3A3430;
bwPut("bark", ifsG("trunk", function () { return new THREE.CylinderGeometry(0.12, 0.3, 1, 7); }), x, y + h / 2, z, 0, ry, (R() - 0.5) * 0.15, bark, 1, h, 1);
for (var b = 0; b < 3; b++) {
var a = ry + b * 2.1, bl = 1.2 + R() * 1.2, bh = h * (0.5 + b * 0.14);
bwPut("bark", ifsG("limb", function () { return new THREE.CylinderGeometry(0.04, 0.1, 1, 5); }), x + Math.cos(a) * bl * 0.4, y + bh + bl * 0.3, z + Math.sin(a) * bl * 0.4, Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9, bark, 1, bl, 1);
}
ifsSolid({ x: x, z: z, r: 0.35 });
},
function (x, z, R) {
var y = bwH(x, z), ry = R() * 6, c = Math.cos(ry), s = Math.sin(ry), tilt = (R() - 0.5) * 0.3;
bwPut("wood", ifsG("bed", function () { return new THREE.BoxGeometry(2.4, 0.5, 1.3); }), x, y + 0.75, z, 0, ry, tilt, 0x6A4A2A);
bwPut("wood", ifsG("shaft", function () { return new THREE.BoxGeometry(1.8, 0.08, 0.08); }), x + c * 2.0, y + 0.45, z - s * 2.0, 0, ry, 0.25, 0x5A3E24);
[-1, 1].forEach(function (sd) { if (sd > 0 && R() < 0.5)
return; bwPut("wood", ifsG("wheel", function () { return new THREE.CylinderGeometry(0.55, 0.55, 0.1, 12); }), x + s * sd * 0.72, y + 0.55, z + c * sd * 0.72, Math.PI / 2, ry, 0, 0x4A3420); });
ifsSolid({ x: x, z: z, hw: 1.25, hd: 0.75, rot: ry, h: 1.1 });
},
function (x, z, R, ry) {
var y = bwH(x, z), c = Math.cos(ry), s = Math.sin(ry);
for (var i = 0; i < 4; i++) {
var o = -2.4 + i * 1.6;
if (R() < 0.2)
continue;
bwPut("wood", ifsG("post", function () { return new THREE.BoxGeometry(0.14, 1.3, 0.14); }), x + o * c, y + 0.6, z - o * s, (R() - 0.5) * 0.2, 0, (R() - 0.5) * 0.2, 0x5A4630);
}
[0.45, 0.95].forEach(function (h) { if (R() < 0.3)
return; bwPut("wood", ifsG("rail", function () { return new THREE.BoxGeometry(4.8, 0.1, 0.06); }), x, y + h, z, 0, ry, (R() - 0.5) * 0.1, 0x6A5438); });
ifsSolid({ x: x, z: z, hw: 2.4, hd: 0.12, rot: ry, h: 1.2 });
},
function (x, z, R) {
var y = bwH(x, z);
for (var i = 0; i < 5; i++)
bwPut("stone", ifsG("bone", function () { return new THREE.CylinderGeometry(0.05, 0.06, 1, 5); }), x + (R() - 0.5) * 1.6, y + 0.06, z + (R() - 0.5) * 1.6, Math.PI / 2, R() * 6, 0, 0xD8D0B8, 1, 0.5 + R() * 0.6, 1);
bwPut("stone", ifsG("skull", function () { return new THREE.SphereGeometry(0.16, 8, 6); }), x, y + 0.14, z, 0, R() * 6, 0, 0xD8D0B8);
},
function (x, z, R) {
var y = bwH(x, z), ry = R() * 6, c = Math.cos(ry), s = Math.sin(ry);
for (var row = 0; row < 3; row++)
for (var i = 0; i < 5 - row; i++) {
var o = -0.9 + i * 0.4 + row * 0.2;
bwPut("bark", ifsG("log", function () { return new THREE.CylinderGeometry(0.18, 0.18, 1.6, 8); }), x + o * c, y + 0.18 + row * 0.32, z - o * s, Math.PI / 2, ry + Math.PI / 2, 0, 0x6A5034);
}
ifsSolid({ x: x, z: z, hw: 1.1, hd: 0.85, rot: ry, h: 1.0 });
},
function (x, z, R) {
var y = bwH(x, z);
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283;
bwPut("rock", ifsG("stone1", function () { return new THREE.DodecahedronGeometry(0.2, 0); }), x + Math.cos(a) * 0.8, y + 0.1, z + Math.sin(a) * 0.8, R(), R(), 0, 0x6A665C);
}
for (var j = 0; j < 3; j++)
bwPut("bark", ifsG("log", function () { return new THREE.CylinderGeometry(0.18, 0.18, 1.6, 8); }), x, y + 0.15, z, Math.PI / 2, j * 1.05, 0, 0x2A2018, 0.6, 0.7, 0.6);
ifsSolid({ x: x, z: z, r: 0.9, h: 0.4 });
},
function (x, z, R) {
var y = bwH(x, z), ry = R() * 6, c = Math.cos(ry), s = Math.sin(ry);
[-1, 1].forEach(function (sd) { bwPut("wood", ifsG("post", function () { return new THREE.BoxGeometry(0.14, 1.3, 0.14); }), x + sd * 1.0 * c, y + 0.75, z - sd * 1.0 * s, 0, ry, 0, 0x4A3420, 1, 1.15, 1); });
bwPut("wood", ifsG("rail", function () { return new THREE.BoxGeometry(4.8, 0.1, 0.06); }), x, y + 1.35, z, 0, ry, 0, 0x4A3420, 0.45, 1, 1);
for (var i = 0; i < 5; i++) {
var o = -0.8 + i * 0.4;
bwPut("wood", ifsG("haft", function () { return new THREE.CylinderGeometry(0.03, 0.03, 2.2, 5); }), x + o * c, y + 1.1, z - o * s, 0.18, ry, 0, 0x5A4028);
bwPut("rust", ifsG("blade", function () { return new THREE.BoxGeometry(0.05, 0.35, 0.12); }), x + o * c, y + 2.25, z - o * s, 0, ry, 0, 0x9A9AA0);
}
ifsSolid({ x: x, z: z, hw: 1.1, hd: 0.3, rot: ry, h: 2.3 });
},
function (G) {
var lite = bwLite(), R = wRand(18112026), n = 0;
BW_ZONES.forEach(function (Z, zi) {
if (Z.land || Z.post || !IFS_LITTER[Z.k])
return;
var want = Math.round((lite ? 28 : 60) * (Z.k === "arena" ? 0.5 : 1)), tries = 0, got = 0;
while (got < want && tries < want * 8) {
tries++;
var a = R() * 6.283, d = Math.sqrt(R()) * (Z.r + 8), x = Z.x + Math.cos(a) * d, z = Z.z + Math.sin(a) * d;
if (!ifsKind(x, z))
continue;
if (!bwCoverOK(x, z, 2.6, Z))
continue;
try {
IFS_PUT[ifsPick(IFS_LITTER[Z.k], R)](x, z, R);
got++;
n++;
}
catch (e) { }
}
});
for (var i = 0, tries2 = 0; i < (lite ? 40 : 90) && tries2 < 900; tries2++) {
var a2 = R() * 6.283, d2 = 60 + R() * 350, x2 = Math.cos(a2) * d2, z2 = Math.sin(a2) * d2;
if (ifsKind(x2, z2) !== "open" || !bwCoverOK(x2, z2, 2.6, null))
continue;
try {
IFS_PUT[ifsPick(IFS_LITTER.open, R)](x2, z2, R);
i++;
n++;
}
catch (e) { }
}
var camp = [["crates", 3], ["barrel", 3], ["hay", 2], ["woodpile", 2], ["rack", 2], ["firering", 1], ["cart", 1]];
for (var c = 0, tries3 = 0; c < (lite ? 14 : 30) && tries3 < 600; tries3++) {
var a3 = R() * 6.283, d3 = 16 + R() * 27, x3 = Math.cos(a3) * d3, z3 = Math.sin(a3) * d3;
if (ifsKind(x3, z3) !== "camp")
continue;
var ok = true;
for (var dx = -1; dx <= 1 && ok; dx++)
for (var dz = -1; dz <= 1 && ok; dz++)
if (bwSolidAt(x3 + dx * 2.4, z3 + dz * 2.4, 0.5))
ok = false;
if (!ok)
continue;
for (var t = 0; t < BW.talk.length && ok; t++)
if (Math.hypot(x3 - BW.talk[t].x, z3 - BW.talk[t].z) < 5)
ok = false;
if (!ok)
continue;
try {
IFS_PUT[ifsPick(camp, R)](x3, z3, R);
c++;
n++;
}
catch (e) { }
}
IFG.litter = n;
},
function (x, z, key) {
var W = ifgWhich(x, z);
if (W.a !== key || W.wb > 0.1)
return false;
if (key === "ember" && ifgLavaK(x, z) > 0.15)
return false;
if (bwH(x, z) < -0.8)
return false;
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++)
if (bwSolidAt(x + dx * 2.4, z + dz * 2.4, 0.5))
return false;
for (var t = 0; t < BW.talk.length; t++)
if (Math.hypot(x - BW.talk[t].x, z - BW.talk[t].z) < 7)
return false;
for (var i = 0; i < BW_ZONES.length; i++) {
var Z = BW_ZONES[i];
if (Z.post && Math.hypot(x - Z.x, z - Z.z) < (Z.r || 30) + 6)
return false;
var sp = Z.sp;
if (sp)
for (var s in sp)
if (Math.hypot(x - sp[s].x, z - sp[s].z) < 8)
return false;
}
return true;
},
function (G) {
var lite = bwLite(), R = wRand(23112026), n = 0, A0 = IFG.R.full + 10, A1 = IFG.R.edge - 60;
IFG_ORDER.forEach(function (key, li) {
var list = IFS_LAND_LITTER[key] || IFS_LITTER.open, want = lite ? 14 : 32, got = 0, tries = 0;
while (got < want && tries < want * 30) {
tries++;
var a = IFG_A0 + (li + (R() - 0.5) * 0.8) * IFG_STEP, d = A0 + Math.sqrt(R()) * (A1 - A0), x = Math.cos(a) * d, z = Math.sin(a) * d;
if (!ifsLandOK(x, z, key))
continue;
var k = 2 + Math.floor(R() * 3), put = 0;
for (var j = 0; j < k; j++) {
var x2 = x + (R() - 0.5) * 7, z2 = z + (R() - 0.5) * 7;
if (j && !ifsLandOK(x2, z2, key))
continue;
try {
var kind = ifsPick(list, R);
if (kind === "shrub" && key === "frost")
kind = "rock";
IFS_PUT[kind](x2, z2, R);
put++;
n++;
}
catch (e) { }
}
if (put)
got++;
}
});
IFS_NEAR.forEach(function (q) {
for (var c = 0, tr = 0; c < (lite ? 3 : 7) && tr < 200; tr++) {
var a = R() * 6.283, d = 8 + R() * 40, x = q[0] + Math.cos(a) * d, z = q[1] + Math.sin(a) * d, r = Math.hypot(x, z), list, ok;
if (r > IFG.R.full + 10) {
var W = ifgWhich(x, z);
list = IFS_LAND_LITTER[W.a];
ok = ifsLandOK(x, z, W.a);
if (W.a === "frost")
list = IFS_LAND_LITTER.frost;
}
else {
var kd = ifsKind(x, z);
list = IFS_LITTER[kd];
ok = !!list && kd !== "camp" && bwCoverOK(x, z, 2.6, null);
}
if (!ok || !list)
continue;
for (var j = 0; j < 3; j++) {
try {
var kind = ifsPick(list, R);
if (kind === "shrub" && r > IFG.R.full && ifgWhich(x, z).a === "frost")
kind = "rock";
IFS_PUT[kind](x + (R() - 0.5) * 6, z + (R() - 0.5) * 6, R);
n++;
}
catch (e) { }
}
c++;
}
});
IFG.landLitter = n;
}
];
});
