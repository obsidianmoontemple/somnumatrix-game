/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(530, function () {
return [
function (W, x, z) {
var y = sheGround(W, x, z);
if (!isFinite(y) || y < -500)
return null;
if (typeof dkDry === "function" && !dkDry(W, x, z))
return null;
for (var j = 0; j < 9; j++) {
var a = j * Math.PI / 4, d = j === 8 ? 0 : 1.1, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, py = sheGround(W, px, pz);
if (!isFinite(py) || Math.abs(py - y) > 0.6)
return null;
if (W.block) {
try {
if (W.block(px, pz, y))
return null;
}
catch (e) { }
}
}
return y;
},
function (W, ax, az, x, z) {
var d = Math.hypot(x - ax, z - az), n = Math.ceil(d / 0.8), py = sheGround(W, ax, az);
for (var i = 1; i <= n; i++) {
var t = i / n, px = ax + (x - ax) * t, pz = az + (z - az) * t, y = sheGround(W, px, pz);
if (!isFinite(y) || (isFinite(py) && Math.abs(y - py) > 1.0))
return false;
if (typeof dkDry === "function" && !dkDry(W, px, pz))
return false;
if (W.block) {
try {
if (W.block(px, pz, y))
return false;
}
catch (e) { }
}
py = y;
}
return true;
},
function (k) {
var W = WLD.w, C = { x: wlx(camera.position.x), z: camera.position.z }, A = WLD.arrive || C;
if (Math.hypot(A.x - C.x, A.z - C.z) > 300)
A = C;
var a0 = (dkHash("she-" + k + ":" + dkSeason()) % 360) * Math.PI / 180;
for (var pass = 0; pass < 2; pass++) {
for (var r = 14; r <= 45; r += 3) {
for (var q = 0; q < 16; q++) {
var a = a0 + q * Math.PI / 8, x = A.x + Math.cos(a) * r, z = A.z + Math.sin(a) * r, y = sheOpen(W, x, z);
if (y === null)
continue;
if (pass === 0 && !sheWalk(W, A.x, A.z, x, z))
continue;
return { x: x, y: y, z: z };
}
}
}
var y0 = sheGround(W, A.x + 3, A.z);
return { x: A.x + 3, y: isFinite(y0) ? y0 : camera.position.y - 1.72, z: A.z };
}
];
});
