/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof PAINT === "undefined")
return;
function trRand(seed) { var s = (seed >>> 0) || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; }; }
function trNoise(seed) {
var R = trRand(seed), N = 256, g = new Float32Array(N * N);
for (var i = 0; i < g.length; i++)
g[i] = R();
return function (x, y, P) {
var xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
fx = fx * fx * (3 - 2 * fx);
fy = fy * fy * (3 - 2 * fy);
var x0 = ((xi % P) + P) % P, y0 = ((yi % P) + P) % P, x1 = (x0 + 1) % P, y1 = (y0 + 1) % P;
var a = g[(y0 % N) * N + (x0 % N)], b = g[(y0 % N) * N + (x1 % N)], c = g[(y1 % N) * N + (x0 % N)], d = g[(y1 % N) * N + (x1 % N)];
return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};
}
function fbm(n, u, v, P, oct) { var s = 0, a = 0.5, f = 1, t = 0; for (var o = 0; o < oct; o++) {
s += a * n(u * P * f, v * P * f, P * f);
t += a;
a *= 0.5;
f *= 2;
} return s / t; }
function sm(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function cells(R, C) { var p = []; for (var j = 0; j < C; j++)
for (var i = 0; i < C; i++)
p.push([(i + 0.15 + R() * 0.7) / C, (j + 0.15 + R() * 0.7) / C, R()]); return p; }
function voro(pts, C, u, v, out) {
var ci = Math.floor(u * C), cj = Math.floor(v * C), d1 = 9, d2 = 9, id = 0;
for (var dj = -2; dj <= 2; dj++)
for (var di = -2; di <= 2; di++) {
var ii = ((ci + di) % C + C) % C, jj = ((cj + dj) % C + C) % C, q = pts[jj * C + ii];
var px = q[0] + Math.floor((ci + di) / C) * 1, py = q[1] + Math.floor((cj + dj) / C) * 1;
var dx = u - px, dy = v - py, d = Math.sqrt(dx * dx + dy * dy);
if (d < d1) {
d2 = d1;
d1 = d;
id = q[2];
}
else if (d < d2)
d2 = d;
}
out[0] = d1;
out[1] = d2;
out[2] = id;
}
function paint(x, N, seed, mean, fn, prep) {
var n = trNoise(seed * 7 + 1), n2 = trNoise(seed * 13 + 5), R = trRand(seed * 31 + 9), ctx = prep ? prep(R) : null;
var v = new Float32Array(N * N), sum = 0;
for (var yy = 0; yy < N; yy++)
for (var xx = 0; xx < N; xx++) {
var b = fn(xx / N, yy / N, n, n2, ctx, N);
v[yy * N + xx] = b;
sum += b;
}
var k = (mean / 255) / (sum / (N * N) || 1), im = x.createImageData(N, N), D = im.data;
for (var p = 0; p < N * N; p++) {
var g = Math.max(0, Math.min(255, v[p] * k * 255));
D[p * 4] = D[p * 4 + 1] = D[p * 4 + 2] = g;
D[p * 4 + 3] = 255;
}
x.putImageData(im, 0, 0);
}
var tmp = [0, 0, 0];
var REAL = {
paving: function (x, N) {
paint(x, N, 11, 170, function (u, v, n, n2) {
var rows = 16, r = Math.floor(v * rows), lv = v * rows - r, off = ((r * 37) % 5) / 5, cols = 12, cu = u * cols + off, c = Math.floor(cu), lu = cu - c;
var id = (((r * 131 + ((c % cols) + cols) % cols * 71) % 97) / 97), w = fbm(n, u, v, 24, 3);
var ex = Math.min(lu, 1 - lu) * cols / rows * 1.2, ey = Math.min(lv, 1 - lv), e = Math.min(ex, ey) + (w - 0.5) * 0.05;
var stone = sm(0.03, 0.12, e), dome = Math.sqrt(Math.max(0, Math.min(1, e * 4)));
var grain = 0.82 + 0.18 * fbm(n2, u, v, 64, 3), tone = 0.78 + id * 0.3, wear = 0.9 + dome * 0.12;
var joint = 0.6 + 0.1 * fbm(n2, u, v, 32, 2);
return joint * (1 - stone) + tone * grain * wear * stone;
});
},
brick: function (x, N) {
paint(x, N, 12, 196, function (u, v, n, n2) {
var rows = 8, r = Math.floor(v * rows), lv = v * rows - r, off = (r % 2) * 0.5, cols = 4, cu = u * cols + off, c = Math.floor(cu), lu = cu - c;
var id = ((r * 31 + ((c % cols) + cols) % cols * 7) * 7919 % 997) / 997, chip = fbm(n, u, v, 24, 3);
var e = Math.min(Math.min(lu, 1 - lu) * 2, Math.min(lv, 1 - lv)), body = sm(0.05, 0.12 + chip * 0.06, e);
var g = 0.84 + 0.16 * fbm(n2, u, v, 48, 3), tone = id < 0.12 ? 0.78 : id < 0.4 ? 0.9 : 1;
var mortar = 0.7 + 0.1 * fbm(n2, u, v, 64, 2), soot = 0.9 + 0.1 * fbm(n, u, v, 4, 3);
return (mortar * (1 - body) + tone * g * body) * soot;
});
},
stone: function (x, N) {
paint(x, N, 13, 196, function (u, v, n, n2, rows) {
var nr = rows.length, r = Math.floor(v * nr), lv = v * nr - r, s = rows[r], k = 0;
while (k < s.length - 2 && u >= s[k + 1])
k++;
var a = s[k], b = s[k + 1], lu = (u - a) / (b - a), wid = (b - a) * nr;
var e = Math.min(Math.min(lu, 1 - lu) * wid, Math.min(lv, 1 - lv)) + (fbm(n, u, v, 20, 3) - 0.5) * 0.05, body = sm(0.02, 0.08, e);
var id = ((r * 17 + k * 29) % 23) / 23, f = fbm(n2, u, v, 40, 4), tone = 0.8 + id * 0.22;
return 0.6 * (1 - body) + tone * (0.82 + f * 0.22) * body;
}, function (R) {
var rows = [];
for (var r = 0; r < 5; r++) {
var s = [0], x = 0;
while (x < 1) {
x += 0.22 + R() * 0.3;
s.push(Math.min(1, x));
}
if (s.length > 2 && 1 - s[s.length - 2] < 0.12)
s.splice(s.length - 2, 1);
rows.push(s);
}
return rows;
});
},
wood: function (x, N) {
paint(x, N, 14, 196, function (u, v, n, n2) {
var planks = 6, p = Math.floor(v * planks), lv = v * planks - p, id = ((p * 53) % 17) / 17;
var gap = sm(0, 0.05, Math.min(lv, 1 - lv)), gr = fbm(n, u * 0.12 + id, v, 16, 4);
var ring = 0.5 + 0.5 * Math.sin((lv * 7 + gr * 8 + id * 5) * Math.PI * 2), fine = fbm(n2, u * 0.25, v * 2, 64, 2);
var b = (0.86 + id * 0.12 - ring * 0.08) * (0.9 + fine * 0.12);
return b * (0.45 + 0.55 * gap);
});
},
siding: function (x, N) {
paint(x, N, 15, 214, function (u, v, n, n2) {
var rows = 10, r = Math.floor(v * rows), lv = v * rows - r, f = fbm(n, u * 0.2, v, 24, 3);
var lap = lv < 0.12 ? 0.62 + lv * 2.5 : 1 - lv * 0.12;
return lap * (0.9 + f * 0.12);
});
},
plaster: function (x, N) {
paint(x, N, 16, 220, function (u, v, n, n2) {
var f = fbm(n, u, v, 48, 4), st = fbm(n2, u, v, 4, 3), crack = sm(0.975, 0.995, 1 - Math.abs(fbm(n2, u + 0.37, v, 6, 4) * 2 - 1));
return (0.86 + f * 0.12) * (0.88 + st * 0.12) * (1 - crack * 0.03);
});
},
concrete: function (x, N) {
paint(x, N, 17, 205, function (u, v, n, n2, c, S) {
var f = fbm(n, u, v, 32, 5), st = fbm(n2, u, v, 3, 3), pit = n2(u * S * 0.4, v * S * 0.4, Math.round(S * 0.4)) > 0.93 ? 1 : 0;
var seam = (Math.abs(v - 0.5) < 0.003 || Math.abs(u - 0.5) < 0.003) ? 1 : 0;
return (0.8 + f * 0.16) * (0.84 + st * 0.16) * (1 - pit * 0.3) * (1 - seam * 0.35);
});
},
marble: function (x, N) {
paint(x, N, 18, 232, function (u, v, n, n2) {
var t = fbm(n, u, v, 4, 5), vein = 1 - Math.abs(Math.sin((u * 2 + v * 3 + t * 3.2) * Math.PI));
var veins = sm(0.93, 0.995, vein) * 0.22, cloud = fbm(n2, u, v, 8, 4);
return (0.92 + cloud * 0.08) * (1 - veins);
});
},
metal: function (x, N) {
paint(x, N, 19, 206, function (u, v, n, n2, c, S) {
var brush = n(u * 4, v * S * 0.5, 4) * 0.5 + n2(u * 8, v * S, 8) * 0.5, f = fbm(n2, u, v, 6, 3);
return 0.8 + brush * 0.12 + f * 0.08;
});
},
metalroof: function (x, N) {
paint(x, N, 20, 205, function (u, v, n, n2) {
var rib = Math.cos(u * Math.PI * 2 * 8), f = fbm(n, u, v, 12, 3), streak = fbm(n2, u * 6, v * 0.3, 8, 3);
return (0.86 + rib * 0.1) * (0.9 + f * 0.06) * (0.92 + streak * 0.08);
});
},
shingle: function (x, N) {
paint(x, N, 21, 178, function (u, v, n, n2) {
var rows = 8, r = Math.floor(v * rows), lv = v * rows - r, off = (r % 2) * 0.5, cols = 6, cu = u * cols + off + ((r * 13) % 7) * 0.03, c = Math.floor(cu), lu = cu - c;
var id = (((r * 41 + ((c % cols) + cols) % cols * 23) % 31) / 31), gap = sm(0, 0.06, Math.min(lu, 1 - lu));
var shadow = lv > 0.78 ? 0.6 : 1, f = fbm(n, u, v, 48, 3);
return (0.78 + id * 0.2) * (0.85 + f * 0.18) * (0.5 + 0.5 * gap) * shadow * (0.9 + lv * 0.1);
});
},
slate: function (x, N) {
paint(x, N, 22, 170, function (u, v, n, n2) {
var rows = 9, r = Math.floor(v * rows), lv = v * rows - r, off = (r % 2) * 0.5, cols = 6, cu = u * cols + off, c = Math.floor(cu), lu = cu - c;
var id = (((r * 29 + ((c % cols) + cols) % cols * 17) % 23) / 23), gap = sm(0, 0.05, Math.min(lu, 1 - lu));
var layer = fbm(n, u * 0.5, v * 3, 16, 4), shadow = lv > 0.82 ? 0.55 : 1;
return (0.74 + id * 0.22) * (0.82 + layer * 0.24) * (0.45 + 0.55 * gap) * shadow;
});
},
tile: function (x, N) {
paint(x, N, 23, 196, function (u, v, n, n2) {
var rows = 8, r = Math.floor(v * rows), lv = v * rows - r, off = (r % 2) * 0.5, cols = 8, cu = u * cols + off, c = Math.floor(cu), lu = cu - c;
var round = Math.sin(lu * Math.PI), id = (((r * 7 + ((c % cols) + cols) % cols * 3) % 11) / 11), f = fbm(n, u, v, 32, 3);
return (0.78 + round * 0.22) * (0.88 + id * 0.12) * (0.9 + f * 0.1) * (lv > 0.85 ? 0.82 : 1);
});
},
floortile: function (x, N) {
paint(x, N, 24, 206, function (u, v, n, n2) {
var t = 4, lu = u * t - Math.floor(u * t), lv = v * t - Math.floor(v * t), id = ((Math.floor(u * t) * 5 + Math.floor(v * t) * 11) % 7) / 7;
var grout = sm(0, 0.025, Math.min(Math.min(lu, 1 - lu), Math.min(lv, 1 - lv))), f = fbm(n, u, v, 16, 3);
return (0.66 * (1 - grout)) + grout * (0.94 + id * 0.05) * (0.95 + f * 0.06);
});
},
thatch: function (x, N) {
paint(x, N, 25, 170, function (u, v, n, n2, c, S) {
var straw = n(u * S * 0.35, v * 12, Math.round(S * 0.35)), bunch = fbm(n2, u, v, 6, 3), course = (v * 6) % 1;
return (0.6 + straw * 0.35) * (0.85 + bunch * 0.2) * (course > 0.9 ? 0.75 : 1);
});
},
foliage: function (x, N) {
paint(x, N, 26, 185, function (u, v, n, n2, pts) {
voro(pts, 10, u, v, tmp);
var leaf = 1 - sm(0.02, 0.07, tmp[0]), f = fbm(n, u, v, 40, 3);
return (0.55 + leaf * 0.35 + tmp[2] * 0.15) * (0.8 + f * 0.25);
}, function (R) { return cells(R, 10); });
},
bark: function (x, N) {
paint(x, N, 27, 175, function (u, v, n, n2) {
var fur = 1 - Math.abs(fbm(n, u, v * 0.12, 14, 4) * 2 - 1), f = fbm(n2, u, v, 40, 3);
return (0.55 + fur * 0.4) * (0.85 + f * 0.2);
});
},
asphalt: function (x, N) {
paint(x, N, 28, 190, function (u, v, n, n2, c, S) {
var grit = n(u * S * 0.5, v * S * 0.5, Math.round(S * 0.5)), stone = grit > 0.86 ? 0.25 : grit < 0.1 ? -0.18 : 0;
var wear = fbm(n2, u, v, 6, 3);
return (0.82 + stone * 0.4 + fbm(n, u, v, 64, 2) * 0.1) * (0.93 + wear * 0.08);
});
},
grass: function (x, N) {
paint(x, N, 29, 194, function (u, v, n, n2, c, S) {
var blade = n(u * S * 0.45, v * S * 0.18, Math.round(S * 0.45)), tuft = fbm(n2, u, v, 10, 4), clump = fbm(n, u, v, 4, 3);
var bare = sm(0.7, 0.78, fbm(n2, u + 0.2, v + 0.6, 8, 3)) * 0.05;
return (0.7 + blade * 0.28) * (0.82 + tuft * 0.22) * (0.92 + clump * 0.1) - bare;
});
},
earth: function (x, N) {
paint(x, N, 30, 196, function (u, v, n, n2, c, S) {
var f = fbm(n, u, v, 24, 5), pebble = n2(u * S * 0.3, v * S * 0.3, Math.round(S * 0.3)) > 0.9 ? 0.2 : 0, clod = fbm(n2, u, v, 6, 3);
return (0.78 + f * 0.2) * (0.86 + clod * 0.16) + pebble;
});
},
sand: function (x, N) {
paint(x, N, 31, 220, function (u, v, n, n2, c, S) {
var ripple = 0.5 + 0.5 * Math.sin((v * 14 + fbm(n, u, v, 4, 3) * 2.2) * Math.PI * 2), grain = n2(u * S * 0.5, v * S * 0.5, Math.round(S * 0.5));
return 0.88 + ripple * 0.06 + grain * 0.06;
});
},
snow: function (x, N) {
paint(x, N, 32, 238, function (u, v, n, n2) {
return 0.95 + fbm(n, u, v, 8, 4) * 0.05 + fbm(n2, u, v, 48, 2) * 0.02;
});
}
};
var size = function () { return (typeof LITE !== "undefined" && LITE) ? 256 : 512; };
Object.keys(REAL).forEach(function (k) { PAINT[k] = REAL[k]; });
if (typeof texOf === "function") {
texOf = function (kind) {
if (TEXCACHE[kind])
return TEXCACHE[kind];
if (!PAINT[kind] || typeof document === "undefined")
return null;
var N = REAL[kind] && !(typeof PHOTO_TEX !== "undefined" && PHOTO_TEX.kinds[kind]) ? size() : 256;
var c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
if (!x)
return null;
try {
PAINT[kind](x, N, rng(hash(kind)));
}
catch (e) {
if (window.console)
console.warn("[textures]", kind, e);
return null;
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var tile = TILE[kind] || 2;
if (t.repeat && t.repeat.set)
t.repeat.set(1 / tile, 1 / tile);
t.anisotropy = (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 4;
TEXCACHE[kind] = t;
return t;
};
}
})();
