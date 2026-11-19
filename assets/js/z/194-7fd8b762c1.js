/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(194, function () {
"use strict";
return [
function (c, tex, opt) {
var key = c + "|" + (tex || "") + "|" + (opt || "");
if (TR_MAT[key])
return TR_MAT[key];
var m;
if (opt === "glass")
m = new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.45, shininess: 90, depthWrite: false });
else if (opt === "shine")
m = new THREE.MeshPhongMaterial({ color: c, shininess: 70 });
else if (opt === "glow")
m = new THREE.MeshBasicMaterial({ color: c });
else
m = new THREE.MeshLambertMaterial({ color: c, map: (tex && typeof texOf === "function") ? texOf(tex) : null });
return (TR_MAT[key] = m);
},
function (W, D, put, spots) {
var K = { W: W, D: D, put: put, spots: spots, L: -W / 2, R: W / 2, B: -D / 2, Fz: D / 2 };
K.wallX = function (z, x0, x1, gaps) {
var at = x0;
(gaps || []).slice().sort(function (a, b) { return a - b; }).concat([null]).forEach(function (c) {
var end = c === null ? x1 : c - 0.75;
while (end - at > 0.24) {
var len = Math.min(6, end - at), n = Math.max(1, Math.round(len / 0.5));
len = n * 0.5;
if (at + len > end + 0.26) {
n = Math.max(1, n - 1);
len = n * 0.5;
}
put("trw" + n, at + len / 2, z, 0);
at += len;
}
if (c !== null) {
put("trdoorframe", c, z, 0);
at = c + 0.75;
}
});
};
K.wallZ = function (x, z0, z1, gaps) {
var at = z0;
(gaps || []).slice().sort(function (a, b) { return a - b; }).concat([null]).forEach(function (c) {
var end = c === null ? z1 : c - 0.75;
while (end - at > 0.24) {
var len = Math.min(6, end - at), n = Math.max(1, Math.round(len / 0.5));
len = n * 0.5;
if (at + len > end + 0.26) {
n = Math.max(1, n - 1);
len = n * 0.5;
}
put("trw" + n, x, at + len / 2, Math.PI / 2);
at += len;
}
if (c !== null) {
put("trdoorframe", x, c, Math.PI / 2);
at = c + 0.75;
}
});
};
K.rowBack = function (k, z, x0, x1, step, rot) { for (var x = x0; x <= x1 + 0.01; x += step)
put(k, x, z, rot || 0); };
K.rowLeft = function (k, z0, z1, step, inset) { for (var z = z0; z <= z1 + 0.01; z += step)
put(k, -W / 2 + (inset || 0.4), z, Math.PI / 2); };
K.rowRight = function (k, z0, z1, step, inset) { for (var z = z0; z <= z1 + 0.01; z += step)
put(k, W / 2 - (inset || 0.4), z, -Math.PI / 2); };
K.grid = function (kinds, x0, x1, z0, z1, sx, sz, rot) { var i = 0; for (var z = z0; z <= z1 + 0.01; z += sz)
for (var x = x0; x <= x1 + 0.01; x += sx) {
put(kinds[i % kinds.length], x, z, rot || 0);
i++;
} };
K.big = W * D > 300;
K.spot = function (x, z, room) { spots.push({ x: x, z: z, room: room, level: 0 }); };
return K;
},
function (K, o) {
var W = K.W, D = K.D, put = K.put, back = (D >= 11 && o.work) ? Math.min(5.2, Math.max(3.6, D * 0.3)) : 0;
var zp = K.B + back;
var zc = zp + (back ? 1.9 : 2.2);
if (back) {
K.wallX(zp, K.L, K.R, [K.R - 1.6]);
}
var behind = o.behind || "shelfgoods";
for (var x = K.L + 1.6; x < K.R - 2.6; x += 2.5)
put(behind, x, zp + 0.35, 0);
var cx0 = K.L + 1.6, cx1 = K.R - 2.4;
put(o.till || "trtill", (cx0 + cx1) / 2, zc, 0);
for (var x2 = (cx0 + cx1) / 2 - 2.4; x2 >= cx0 - 0.2; x2 -= 2.4)
put("trcounter", x2, zc, 0);
for (var x3 = (cx0 + cx1) / 2 + 2.4; x3 <= cx1 + 0.2; x3 += 2.4)
put("trcounter", x3, zc, 0);
var z0 = zc + 1.6, z1 = K.Fz - 2.2, side = o.side || "shelfgoods";
for (var z = z0; z <= z1; z += 2.6) {
put(side, K.L + 0.4, z, Math.PI / 2);
put(o.side2 || side, K.R - 0.4, z, -Math.PI / 2);
}
if (o.mid) {
var mz = (z0 + K.Fz - 3) / 2;
if (W >= 9) {
put(o.mid, -W / 6, mz, 0);
put(o.mid2 || o.mid, W / 6, mz, 0);
}
else
put(o.mid, 0, mz, 0);
}
if (o.floor)
o.floor(K, zc, z0, z1);
put("chandelier", 0, (zc + K.Fz) / 2, 0);
K.spot(0, zc + 1.2, "the shop");
K.spot(-W / 4, (zc + K.Fz) / 2, "the shop");
K.spot(W / 4, (zc + K.Fz) / 2 + 1, "the shop");
if (back && o.work)
o.work(K, K.B, zp);
if (back)
K.spot(0, (K.B + zp) / 2, "the workroom");
},
function (K, o) {
var W = K.W, D = K.D, put = K.put, back = D >= 13 ? Math.min(5, D * 0.28) : 0, zp = K.B + back, zc = K.Fz - Math.max(4.2, D * 0.35);
if (back) {
K.wallX(zp, K.L, K.R, [0]);
}
put(o.counter || "trcounter", -1.3, zc, 0);
put(o.till || "trtill", 1.3, zc, 0);
if (W >= 10) {
put("trcounter", -3.7, zc, 0);
put("trcounter", 3.7, zc, 0);
}
put("benchin", K.L + 1.6, K.Fz - 2.2, Math.PI / 2);
if (W >= 9)
put("benchin", K.R - 1.6, K.Fz - 2.2, -Math.PI / 2);
put("noticeboard", K.L + 0.15, zc + 1.6, Math.PI / 2);
put("clock", K.R - 0.15, zc + 1.6, -Math.PI / 2);
var dz = (zp + zc) / 2;
(o.desks || ["desk", "desk"]).forEach(function (k, i, a) { var x = (a.length === 1) ? 0 : -W / 3 + i * (2 * W / 3) / (a.length - 1); put(k, x, dz, Math.PI); put("chair", x, dz - 0.85, 0); });
(o.wall || ["filecabinet", "filecabinet", "filecabinet"]).forEach(function (k, i) { put(k, K.L + 0.45, zp + 1 + i * 1.1, Math.PI / 2); });
if (o.right)
o.right.forEach(function (k, i) { put(k, K.R - 0.6, zp + 1.2 + i * 1.8, -Math.PI / 2); });
put("chandelier", 0, dz, 0);
put("chandelier", 0, (zc + K.Fz) / 2, 0);
if (K.big && o.bigFill)
o.bigFill(K, zc);
else if (K.big) {
for (var bz = zc + 2.6; bz < K.Fz - 3; bz += 2.2) {
put("benchin", -W / 4, bz, 0);
put("benchin", W / 4, bz, 0);
}
put("plant", K.L + 1, K.Fz - 1.2, 0);
put("plant", K.R - 1, K.Fz - 1.2, 0);
}
K.spot(0, zc + 1.4, "the public counter");
K.spot(-W / 4, K.Fz - 3, "the waiting room");
K.spot(W / 4, dz, "the clerks' room");
if (back) {
if (o.records)
o.records(K, K.B, zp);
else {
K.rowBack("filecabinet", K.B + 0.45, K.L + 0.8, K.R - 0.8, 0.9, 0);
put("table", 0, (K.B + zp) / 2, 0);
put("chair", 0.9, (K.B + zp) / 2, -Math.PI / 2);
}
K.spot(0, (K.B + zp) / 2 + 0.6, "the records room");
}
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(3.6, D * 0.32), zp = K.B + back;
K.wallX(zp, K.L, K.R, [K.L + 1.6]);
var zd = zp + Math.max(2.2, (K.Fz - zp) * 0.38);
put("trdutydesk", 0, zd, 0);
put("chair", 0, zd - 0.9, 0);
put("keyrack", -1.6, zp + 0.12, 0);
put("noticeboard", 1.6, zp + 0.12, 0);
put("trwallmap", K.R - 0.1, zd, -Math.PI / 2);
put("trwinch", K.L + 1.2, zd + 1.2, Math.PI / 2);
if (FURN.weaponrack)
put("weaponrack", K.L + 0.3, K.Fz - 3.2, Math.PI / 2);
put("benchin", K.R - 1.4, K.Fz - 2.4, -Math.PI / 2);
put("trhearth", K.R - 0.45, zd + 3, -Math.PI / 2);
put("chandelier", 0, zd + 1.5, 0);
if (W >= 16) {
var ax = K.L + W / 6;
if (FURN.weaponrack) {
put("weaponrack", K.L + 0.3, zd + 3.4, Math.PI / 2);
put("weaponrack", ax - 1.4, zp + 0.35, 0);
put("weaponrack", ax + 1.4, zp + 0.35, 0);
}
if (FURN.armourstand) {
put("armourstand", ax - 1.2, zd + 2.6, 0);
put("armourstand", ax, zd + 2.6, 0);
put("armourstand", ax + 1.2, zd + 2.6, 0);
}
put("trlockers", ax, K.Fz - 1.6, Math.PI);
K.spot(ax, zd + 3.8, "the armoury");
var tx = K.R - W / 6;
put("benchin", tx, K.Fz - 4.2, 0);
put("benchin", tx, K.Fz - 6, 0);
put("trbenchtable", tx, zd + 1.2, 0);
put("trcrates", tx + 2.2, zd + 1.2, 0);
put("trsacks", tx - 2.4, zd + 0.6, 0);
put("trtimetable", tx, zp + 0.12, 0);
put("clock", tx + 2.6, zp + 0.12, 0);
K.spot(tx, zd + 2.4, "baggage");
K.spot(tx, K.Fz - 5, "waiting");
put("rug", 0, zd + 3.4, 0);
put("chandelier", ax, zd + 2.4, 0);
put("chandelier", tx, zd + 2.4, 0);
}
K.spot(0, zd + 1.3, "the duty desk");
K.spot(K.L + 2.4, zd + 1.4, "the gate winch");
K.spot(K.R - 2.2, K.Fz - 2.8, "the travellers' bench");
K.spot(-1.2, K.Fz - 3.5, "the guard room");
put("bunk", K.R - 0.7, K.B + 1.2, 0);
if (W >= 8)
put("bunk", K.R - 1.8, K.B + 1.2, 0);
put("trlockers", (K.L + K.R) / 2 - 0.3, K.B + 0.3, 0);
put("trbenchtable", K.L + 1.9, (K.B + zp) / 2 + 0.2, 0);
if (W >= 16) {
for (var bx = K.R - 3; bx > 0; bx -= 1.2)
put("bunk", bx, K.B + 1.2, 0);
put("trlockers", -W / 4, K.B + 0.3, 0);
put("trhearth", K.L + W / 4, zp - 0.45, Math.PI);
put("chandelier", K.R - W / 4, (K.B + zp) / 2, 0);
}
K.spot(K.L + 1.9, (K.B + zp) / 2 + 1.2, "the watch room");
},
function (K) {
trShop(K, { behind: "trsort", side: "noticeboard", side2: "keyrack", mid: "weighscale", till: "trtill",
floor: function (K, zc) { K.put("table", -K.W / 4, K.Fz - 3, 0); K.put("trwallmap", K.R - 0.1, K.Fz - 4.5, -Math.PI / 2); },
work: function (K, B, zp) { K.rowBack("trsort", B + 0.3, K.L + 1.4, K.R - 1.4, 2.4, 0); K.put("trcrates", K.L + 1.4, zp - 1.2, 0); K.put("trsacks", 0, zp - 1.4, 0); K.put("table", K.R - 1.6, zp - 1.5, 0); } });
},
function (K) {
trOffice(K, { bigFill: function (K, zc) {
var W = K.W;
for (var z = zc + 3; z < K.Fz - 3; z += 3) {
K.put("trcrates", K.L + 2, z, 0);
K.put("trcrates", K.L + 4.4, z, 0);
K.put("barrel", K.R - 2, z, 0);
K.put("barrel", K.R - 3, z, 0);
K.put("trsacks", K.R - 5, z, 0);
}
K.put("trassay", -1.6, zc + 3, 0);
K.put("troars", K.L + 0.2, zc + 2, Math.PI / 2);
K.put("trnets", K.R - 0.2, zc + 2, -Math.PI / 2);
},
desks: ["desk", "trassay"], wall: ["filecabinet", "filecabinet"], right: ["trwallmap", "trtimetable"],
records: function (K, B, zp) { K.rowBack("trcrates", B + 0.7, K.L + 1.4, K.R - 1.4, 2.4, 0); K.put("trsacks", 0, zp - 1.4, 0); } });
},
function (K) {
trOffice(K, { bigFill: function (K, zc) {
var W = K.W;
for (var z = zc + 2.8; z < K.Fz - 3; z += 2.2) {
K.put("benchin", -W / 5, z, 0);
K.put("benchin", W / 5, z, 0);
}
K.put("trwheelstand", K.L + 2.4, zc + 3, 0);
K.put("trsaddles", K.L + 0.6, zc + 6, Math.PI / 2);
K.put("trcrates", K.R - 2.4, zc + 3, 0);
K.put("trsacks", K.R - 2.4, zc + 5.4, 0);
K.put("trtimetable", K.R - 0.1, K.Fz - 4, -Math.PI / 2);
K.put("trwallmap", K.L + 0.1, K.Fz - 4, Math.PI / 2);
},
desks: ["desk", "desk", "desk"], wall: ["keyrack", "filecabinet"], right: ["trtimetable", "trwallmap"],
records: function (K, B, zp) { K.put("trlockers", K.L + 1.6, B + 0.3, 0); K.put("trtoolwall", K.R - 1.4, B + 0.1, 0); K.put("workbench", K.R - 1.4, B + 0.9, 0); K.put("trwheelstand", 0, (B + zp) / 2, 0); } });
},
function (K) {
trShop(K, { behind: "cask", side: "shelfgoods", mid: "barrel", floor: function (K, zc, z0, z1) { K.put("table", 0, z1 - 0.6, 0); K.put("chair", -0.9, z1 - 0.6, Math.PI / 2); K.put("chair", 0.9, z1 - 0.6, -Math.PI / 2); },
work: function (K, B, zp) { K.put("trcopper", K.L + 1.6, (B + zp) / 2, 0); K.put("cask", K.R - 1.6, B + 0.9, 0); K.put("cask", K.R - 1.6, zp - 1.1, 0); K.put("trsacks", 0, B + 0.8, 0); } });
},
function (K) {
var W = K.W, D = K.D, put = K.put, zb = K.B + 0.3, n = Math.max(2, Math.min(4, Math.floor((W - 2) / 2.4)));
for (var i = 0; i < n; i++) {
var x = -((n - 1) * 2.4) / 2 + i * 2.4;
put("barberchair", x, K.B + 1.9, Math.PI);
}
put("trbarberwall", 0, zb, 0);
if (W >= 10) {
put("trbarberwall", -2.4, zb, 0);
put("trbarberwall", 2.4, zb, 0);
}
put("trtill", K.R - 2, K.Fz - 3.6, 0);
put("sofa", K.L + 0.7, K.Fz - 4, Math.PI / 2);
put("armchair", K.L + 1.2, K.Fz - 6, Math.PI / 2);
put("table", K.L + 1.4, K.Fz - 5, 0);
put("plant", K.R - 0.8, K.Fz - 1.4, 0);
put("wallmirror", K.L + 0.12, K.B + 5, Math.PI / 2);
put("shelfgoods", K.R - 0.4, K.B + 4.6, -Math.PI / 2);
put("chandelier", 0, 0, 0);
for (var j = 0; j < n; j++)
K.spot(-((n - 1) * 2.4) / 2 + j * 2.4, K.B + 3, "the chairs");
K.spot(K.L + 2, K.Fz - 4, "waiting");
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(3.8, Math.min(5, D * 0.3)), zp = K.B + back;
K.wallX(zp, K.L, K.R, [K.R - 1.6]);
put("trcounter", -2.4, zp + 0.75, 0);
put("trtill", 0, zp + 0.75, 0);
put("trcounter", 2.4, zp + 0.75, 0);
for (var z = zp + 3; z < K.Fz - 2.4; z += 2.6)
for (var x = -W / 2 + 2.2; x < W / 2 - 1.6; x += 3.4) {
put("table", x, z, 0);
put("chair", x, z - 0.9, 0);
put("chair", x, z + 0.9, Math.PI);
}
put("trhearth", K.L + 0.45, K.Fz - 4, Math.PI / 2);
put("chandelier", 0, (zp + K.Fz) / 2, 0);
put("painting", K.R - 0.12, K.Fz - 4, -Math.PI / 2);
put("oven", K.L + 1.4, K.B + 1, 0);
put("stove", 0, K.B + 0.6, 0);
put("stove", 0.9, K.B + 0.6, 0);
put("sink", K.R - 1.2, K.B + 0.6, 0);
put("trcounter", K.R - 1.6, zp - 1.1, Math.PI);
put("trsacks", -2, zp - 1.3, 0);
K.spot(0, zp + 1.8, "the hatch");
K.spot(0, (zp + K.Fz) / 2, "the tables");
K.spot(-1, (K.B + zp) / 2, "the kitchen");
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = D >= 12 ? Math.max(3.6, Math.min(4.6, D * 0.28)) : 0, zp = K.B + back;
if (back)
K.wallX(zp, K.L, K.R, [K.R - 1.4]);
var zb = zp + 1.7;
for (var x = K.L + 1.6; x < K.R - 2.2; x += 2.4)
put("trcounter", x, zb, 0);
put("cask", K.L + 1.4, zp + 0.6, 0);
put("cask", K.L + 3.2, zp + 0.6, 0);
put("shelfgoods", K.R - 3.4, zp + 0.35, 0);
for (var z = zb + 2.6; z < K.Fz - 2.4; z += 2.8)
for (var x2 = -W / 2 + 2.2; x2 < W / 2 - 1.6; x2 += 3.6) {
put("table", x2, z, 0);
put("chair", x2 - 0.9, z, Math.PI / 2);
put("chair", x2 + 0.9, z, -Math.PI / 2);
}
put("trhearth", K.R - 0.45, K.Fz - 4.4, -Math.PI / 2);
put("rug", K.R - 2.6, K.Fz - 4.4, 0);
put("chandelier", 0, (zb + K.Fz) / 2, 0);
if (back) {
put("stove", K.L + 1.2, K.B + 0.6, 0);
put("oven", K.L + 3.2, K.B + 1, 0);
put("barrel", K.R - 1, K.B + 0.9, 0);
put("trsacks", K.R - 1.6, zp - 1.2, 0);
K.spot(0, (K.B + zp) / 2, "the kitchen");
}
K.spot(0, zb - 0.6, "behind the bar");
K.spot(0, (zb + K.Fz) / 2, "the tables");
K.spot(K.R - 2.6, K.Fz - 4.4, "by the fire");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("forge", K.L + 1.4, K.B + 1.1, 0);
if (W >= 9)
put("forge", K.R - 1.4, K.B + 1.1, 0);
put("anvil", K.L + 1.4, K.B + 3.2, 0);
if (W >= 9)
put("anvil", K.R - 1.4, K.B + 3.2, 0);
put("trquench", K.L + 2.8, K.B + 2.6, 0);
put("trtoolwall", 0, K.B + 0.1, 0);
put("workbench", K.L + 0.6, K.B + 5.5, Math.PI / 2);
if (FURN.weaponrack) {
put("weaponrack", K.R - 0.3, K.B + 6, -Math.PI / 2);
put("weaponrack", K.R - 0.3, K.B + 8, -Math.PI / 2);
}
put("trcrates", K.L + 1.2, K.Fz - 2.6, 0);
put("barrel", K.R - 1, K.Fz - 2.2, 0);
put("trcounter", 0, K.Fz - 4.2, 0);
K.spot(-1, K.B + 4, "the forge");
K.spot(1, K.Fz - 5, "the shop");
},
function (K) {
trShop(K, { mid: "dressform", mid2: "dressform", floor: function (K, zc, z0, z1) { K.put("wallmirror", K.L + 0.12, z1 - 1, Math.PI / 2); K.put("armchair", K.R - 1.4, z1 - 0.6, -Math.PI / 2); },
work: function (K, B, zp) { K.put("trcuttable", 0, (B + zp) / 2, 0); K.put("loom", K.L + 1.4, B + 0.9, 0); K.put("dressform", K.R - 1.2, B + 0.8, 0); K.put("dressform", K.R - 2.2, B + 0.8, 0); } });
},
function (K) {
var W = K.W, D = K.D, put = K.put;
for (var z = K.B + 1.6; z < K.Fz - 4; z += 2.6) {
put("loom", -W / 4, z, 0);
put("loom", W / 4, z, 0);
}
K.rowLeft("shelfgoods", K.B + 1.4, K.Fz - 4, 2.6);
put("trsacks", K.R - 1.2, K.Fz - 3, 0);
put("trcounter", 0, K.Fz - 3.6, 0);
put("chandelier", 0, 0, 0);
K.spot(0, 0, "the looms");
K.spot(-1, K.Fz - 4.6, "the counter");
},
function (K) {
trShop(K, { side: "flowerbucket", side2: "shelfgoods", mid: "flowerbucket", floor: function (K, zc, z0, z1) { K.put("plant", K.L + 1.4, z1, 0); K.put("plant", K.R - 1.4, z1, 0); K.put("flowerbucket", 0, z1 - 0.6, 0); },
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("sink", K.R - 1.2, B + 0.5, 0); K.put("flowerbucket", 0, B + 0.8, 0); K.put("flowerbucket", 0.8, B + 0.8, 0); } });
},
function (K) {
trShop(K, { behind: "trdrapes", side: "trcase", side2: "benchin", till: "desk", floor: function (K, zc, z0, z1) { K.put("candles", 0, z1 - 0.4, 0); K.put("plant", K.L + 1.2, z1, 0); },
work: function (K, B, zp) { K.put("trbier", 0, (B + zp) / 2, 0); K.put("coffin", K.L + 1.2, B + 1.3, 0); K.put("workbench", K.R - 1.6, B + 0.6, 0); K.put("candles", K.R - 1.2, zp - 0.9, 0); } });
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trsaw", -W / 4, K.B + 3, 0);
put("trlathe", W / 4, K.B + 2.6, 0);
K.rowBack("trtoolwall", K.B + 0.1, K.L + 2, K.R - 2, 4, 0);
K.rowLeft("workbench", K.B + 5, K.Fz - 5, 3, 0.6);
put("trlogs", K.R - 1.5, K.Fz - 4.5, -Math.PI / 2);
put("trcrates", K.R - 1.4, 0, -Math.PI / 2);
if (K.big) {
K.grid(["workbench", "workbench", "trlathe"], -W / 4, W / 4, K.B + 7, K.Fz - 8, W / 4, 3.4);
K.rowRight("trlogs", K.B + 5, K.Fz - 8, 3.2, 1.4);
put("trsaw", W / 4, K.B + 3, 0);
put("trlathe", -W / 4 + 0.2, K.B + 6, 0);
}
else
put("trwheelstand", 0, 0, 0);
K.spot(0, K.B + 4.4, "the saw");
K.spot(-W / 4, 0, "the benches");
K.spot(W / 4, K.Fz - 4, "the timber");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trbanker", -W / 4, K.B + 3, 0);
put("trbanker", 0, K.B + 3, 0);
put("trbanker", W / 4, K.B + 3, 0);
put("trstones", K.L + 2, K.Fz - 4, 0);
put("trstones", K.R - 2, K.Fz - 4, 0);
put("trstones", K.R - 2, 0, 0);
put("trtoolwall", 0, K.B + 0.1, 0);
put("trdraft", K.L + 1.6, 0, Math.PI / 2);
if (K.big) {
put("trbanker", -W / 4, K.B + 8, 0);
put("trbanker", W / 4, K.B + 8, 0);
put("trstones", 0, K.B + 9, 0);
K.rowLeft("trstones", K.B + 6, K.Fz - 8, 4.4, 1.4);
put("trbenchtable", W / 4, K.Fz - 8, 0);
}
K.spot(0, K.B + 4.6, "the bankers");
K.spot(0, K.Fz - 5, "the stone");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trglassfurnace", 0, K.B + 3, 0);
put("trglassbench", -W / 4, K.B + 5.5, 0);
put("trglassbench", W / 4, K.B + 5.5, 0);
if (K.big) {
put("trglassfurnace", -W / 3, K.B + 3, 0);
put("trglassfurnace", W / 3, K.B + 3, 0);
put("trglassbench", -W / 3, K.B + 6, 0);
put("trglassbench", W / 3, K.B + 6, 0);
put("trglassbench", 0, K.B + 6, 0);
K.grid(["trcuttable", "trcase"], -W / 4, W / 4, K.B + 9.5, K.Fz - 7, W / 4, 3.4);
K.rowBack("trsacks", K.B + 0.9, K.L + 2, K.L + 5, 2, 0);
}
K.rowLeft("shelfgoods", 0, K.Fz - 4, 2.6);
K.rowRight("shelfgoods", 0, K.Fz - 4, 2.6);
put("trcounter", 0, K.Fz - 4, 0);
put("trsacks", K.L + 1.6, K.B + 1.4, 0);
K.spot(0, K.B + 6.6, "the furnace");
K.spot(0, K.Fz - 5, "the counter");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
if (FURN.boiler)
put("boiler", -W / 4, K.B + 2.6, 0);
else
put("machine", -W / 4, K.B + 2.6, 0);
if (FURN.engine)
put("engine", W / 4, K.B + 3, 0);
else
put("machine", W / 4, K.B + 3, 0);
if (FURN.flywheel)
put("flywheel", 0, 0, 0);
else
put("trpump", 0, 0, 0);
if (FURN.pipes) {
put("pipes", K.L + 0.3, 0, Math.PI / 2);
put("pipes", K.R - 0.3, 0, -Math.PI / 2);
}
put("trtoolwall", 0, K.B + 0.1, 0);
put("workbench", K.L + 0.6, K.Fz - 5, Math.PI / 2);
put("trcrates", K.R - 1.4, K.Fz - 4, 0);
put("barrel", K.R - 1, K.Fz - 2.4, 0);
if (K.big) {
K.grid(["trpump", "machine"], -W / 4, W / 4, K.B + 8, K.Fz - 8, W / 2, 4.5);
K.rowRight("workbench", K.B + 6, K.Fz - 7, 3, 0.6);
}
K.spot(0, K.B + 5, "the engines");
K.spot(-W / 4, K.Fz - 5, "the bench");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trpump", -W / 4, K.B + 2.6, 0);
put("trpump", W / 4, K.B + 2.6, 0);
if (FURN.pipes) {
put("pipes", K.L + 0.3, 0, Math.PI / 2);
put("pipes", K.R - 0.3, 0, -Math.PI / 2);
}
put("trtrough", 0, 0, 0);
put("trtrough", 0, 2, 0);
put("trtoolwall", 0, K.B + 0.1, 0);
if (K.big) {
put("trpump", -W / 4, K.B + 7, 0);
put("trpump", W / 4, K.B + 7, 0);
K.rowRight("trtrough", K.B + 5, K.Fz - 6, 2.6, 0.5);
K.grid(["trpump", "trtrough"], -W / 4, W / 4, K.B + 11, K.Fz - 6, W / 2, 4.5);
if (FURN.boiler)
put("boiler", 0, K.B + 3, 0);
}
put("desk", K.L + 2, K.Fz - 4, 0);
put("filecabinet", K.L + 0.5, K.Fz - 5.4, Math.PI / 2);
K.spot(0, K.B + 4.6, "the pumps");
K.spot(K.L + 2, K.Fz - 5, "the office");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
for (var z = K.B + 1.4; z < K.Fz - 5; z += 3) {
put("trcrates", K.L + 1.4, z, 0);
put("trcrates", K.L + 3.6, z, 0);
put("trcrates", K.R - 1.4, z, 0);
put("trcrates", K.R - 3.6, z, 0);
}
put("trsacks", 0, K.B + 1.4, 0);
put("barrel", 0.8, K.B + 3.4, 0);
put("barrel", -0.8, K.B + 3.4, 0);
put("desk", -W / 4, K.Fz - 3.8, 0);
put("noticeboard", K.L + 0.15, K.Fz - 4, Math.PI / 2);
put("trassay", W / 4, K.Fz - 3.8, 0);
K.spot(0, 0, "the aisles");
K.spot(-W / 4, K.Fz - 4.8, "the office");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trsaw", 0, K.B + 3.2, 0);
put("trlogs", K.L + 1.6, K.B + 1.2, 0);
put("trlogs", K.R - 1.6, K.B + 1.2, 0);
put("trlogs", K.L + 1.6, K.Fz - 3, 0);
K.rowRight("trlogs", 0, K.Fz - 4, 2.8, 1.4);
put("trtoolwall", K.L + 0.1, 0, Math.PI / 2);
put("workbench", K.L + 0.6, 2.6, Math.PI / 2);
if (K.big) {
K.grid(["trlogs", "trlogs", "trsaw"], -W / 4, W / 4, K.B + 7, K.Fz - 7, W / 4, 4);
}
K.spot(0, K.B + 4.6, "the saw");
K.spot(0, K.Fz - 4, "the yard");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
for (var z = K.B + 3; z < K.Fz - 3; z += 3) {
put("trstall", K.L + 1.5, z, 0);
put("trstall", K.R - 1.5, z, 0);
}
for (var z2 = K.B + 1.5; z2 < K.Fz - 3; z2 += 3) {
put("trtrough", K.L + 0.4, z2, Math.PI / 2);
put("trtrough", K.R - 0.4, z2, -Math.PI / 2);
}
put("trhay", 0, K.B + 1, 0);
put("trhay", -2.4, K.B + 1, 0);
put("trsaddles", K.L + 1.4, K.Fz - 1.6, Math.PI / 2);
put("trsaddles", K.R - 1.4, K.Fz - 1.6, -Math.PI / 2);
put("trtoolwall", K.R - 0.1, K.Fz - 2.2, -Math.PI / 2);
put("trsacks", 2.4, K.B + 1, 0);
K.spot(0, 0, "the stalls");
K.spot(0, K.Fz - 3, "the tack");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
for (var z = K.B + 3; z < K.Fz - 5; z += 3)
put("trstall", K.L + 1.5, z, 0);
for (var z2 = K.B + 1.5; z2 < K.Fz - 5; z2 += 3)
put("trtrough", K.L + 0.4, z2, Math.PI / 2);
put("trchurns", K.R - 1.4, K.B + 0.8, 0);
put("trchurns", K.R - 1.4, K.B + 2.2, 0);
put("cask", K.R - 1.6, 0, -Math.PI / 2);
put("workbench", K.R - 0.6, 2.8, -Math.PI / 2);
put("trhay", 0, K.Fz - 2.8, 0);
K.spot(W / 4, K.B + 3, "the churns");
K.spot(-W / 4, 0, "the stalls");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trstall", K.L + 1.5, 0, 0);
put("trstall", K.R - 1.5, 0, 0);
put("trstall", K.L + 1.5, K.B + 4, 0);
put("trstall", K.R - 1.5, K.B + 4, 0);
put("trtrough", K.L + 0.4, K.B + 2, Math.PI / 2);
put("trtrough", K.R - 0.4, K.B + 2, -Math.PI / 2);
put("trhay", 0, K.B + 1, 0);
put("trsacks", 0, K.Fz - 3, 0);
put("workbench", K.L + 0.6, K.Fz - 3.4, Math.PI / 2);
K.spot(0, 0, "the pens");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trfishtable", -W / 4, K.B + 2.6, 0);
put("trfishtable", W / 4, K.B + 2.6, 0);
put("tricecrates", -W / 4, K.B + 0.7, 0);
put("tricecrates", W / 4, K.B + 0.7, 0);
put("trnets", K.L + 0.2, 0, Math.PI / 2);
put("trnets", K.R - 0.2, 0, -Math.PI / 2);
put("troars", K.L + 0.2, K.Fz - 4, Math.PI / 2);
put("barrel", K.R - 1, K.Fz - 3, 0);
put("barrel", K.R - 2, K.Fz - 3, 0);
put("trcounter", 0, K.Fz - 4.4, 0);
put("trassay", 0, 0, 0);
K.spot(0, K.B + 4, "the tables");
K.spot(0, K.Fz - 5.4, "the counter");
},
function (K) {
var put = K.put;
if (FURN.minecart)
put("minecart", 0, K.B + 1.6, 0);
if (FURN.oreheap)
put("oreheap", K.L + 1.4, K.B + 1.4, 0);
put("trlockers", K.R - 0.35, K.Fz - 2.4, -Math.PI / 2);
put("trtoolwall", K.R - 0.1, K.B + 1.6, -Math.PI / 2);
put("lantern", K.L + 0.5, 0, 0);
put("trassay", K.L + 0.9, K.Fz - 2.6, Math.PI / 2);
K.spot(0.8, 0, "the shaft");
},
function (K, o) {
var W = K.W, D = K.D, put = K.put;
put("trhearth", 0, K.B + 0.45, 0);
put("rug", 0, K.B + 2.6, 0);
put("armchair", -1.4, K.B + 2.4, 0.6);
put("trbenchtable", (o.tableX || K.L + 1.8), 0.6, 0);
(o.walls || []).forEach(function (k, i) { put(k, K.R - 0.3, K.B + 1.6 + i * 2.6, -Math.PI / 2); });
(o.left || []).forEach(function (k, i) { put(k, K.L + 0.3, K.Fz - 2.4 - i * 2.6, Math.PI / 2); });
if (D >= 8)
put("bunk", K.R - 0.7, K.Fz - 1.8, Math.PI);
K.spot(0, K.B + 3.4, "by the fire");
K.spot(K.L + 1.8, 1.6, "the table");
},
function (K) {
var put = K.put;
put("trhearth", 0, K.B + 0.45, 0);
put("stove", K.L + 1.2, K.B + 0.6, 0);
put("sink", K.L + 2.2, K.B + 0.6, 0);
put("trbenchtable", 0, 0, 0);
put("trsacks", K.R - 1.2, K.B + 1, 0);
put("trchurns", K.R - 1, K.Fz - 2, 0);
put("shelfgoods", K.L + 0.4, K.Fz - 3, Math.PI / 2);
put("rug", 0, K.Fz - 3.2, 0);
K.spot(0, 1.2, "the kitchen");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
for (var z = K.B + 2.4; z < K.Fz - 3.6; z += 3) {
put("trplinth", -W / 4, z, 0);
put("trplinth", W / 4, z, 0);
}
K.rowLeft("trcase", K.B + 2, K.Fz - 4, 3, 0.5);
K.rowRight("trcase", K.B + 2, K.Fz - 4, 3, 0.5);
put("painting", 0, K.B + 0.12, 0);
put("lectern", 0, K.Fz - 3.4, 0);
put("redrunner" in FURN ? "redrunner" : "runner", 0, 0, 0);
put("chandelier", 0, -D / 6, 0);
put("chandelier", 0, D / 6, 0);
K.spot(0, K.Fz - 4.2, "the front desk");
K.spot(0, 0, "the galleries");
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(4, D * 0.4), zp = K.B + back;
K.wallX(zp, K.L, K.R, [0]);
for (var x = K.L + 1.6; x < K.R - 1; x += 3) {
put("filecabinet", x - 0.4, K.B + 0.45, 0);
put("filecabinet", x + 0.4, K.B + 0.45, 0);
}
for (var z = K.B + 2.4; z < zp - 1; z += 2.2) {
put("trplanchest", -W / 4, z, 0);
put("trplanchest", W / 4, z, 0);
}
put("trcounter", 0, zp + 1.6, 0);
put("chair", 0, zp + 0.8, 0);
for (var z2 = zp + 3.8; z2 < K.Fz - 2.6; z2 += 2.8) {
put("table", -W / 4, z2, 0);
put("chair", -W / 4, z2 + 0.8, Math.PI);
put("lamp", -W / 4 + 0.4, z2, 0);
put("table", W / 4, z2, 0);
put("chair", W / 4, z2 + 0.8, Math.PI);
put("lamp", W / 4 + 0.4, z2, 0);
}
put("lectern", 0, K.Fz - 3.2, 0);
K.rowLeft("bookshelf", zp + 2, K.Fz - 3, 2.2);
K.rowRight("filecabinet", zp + 2, K.Fz - 3, 1.1, 0.45);
put("chandelier", 0, (zp + K.Fz) / 2, 0);
K.spot(0, zp + 0.8, "the desk");
K.spot(0, (K.B + zp) / 2, "the stacks");
K.spot(-W / 4, K.Fz - 4, "the reading room");
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(4, D * 0.32), zp = K.B + back;
K.wallX(zp, K.L, K.R, [0]);
put("vaultround", 0, K.B + 0.25, 0);
put("trassay", K.L + 1.6, K.B + 1.2, 0);
if (FURN.goldpile)
put("goldpile", K.R - 1.8, K.B + 1.6, 0);
else
put("trcrates", K.R - 1.8, K.B + 1.2, 0);
var zc = zp + Math.max(3, (K.Fz - zp) * 0.4);
put("trcounter", -2.4, zc, 0);
put("trtill", 0, zc, 0);
put("trcounter", 2.4, zc, 0);
put("desk", -W / 4, zp + 1.4, Math.PI);
put("desk", W / 4, zp + 1.4, Math.PI);
put("trassay", 0, zp + 1.2, 0);
put("filecabinet", K.L + 0.45, zp + 1, Math.PI / 2);
put("filecabinet", K.R - 0.45, zp + 1, -Math.PI / 2);
put("benchin", K.L + 1.6, K.Fz - 2.4, Math.PI / 2);
put("benchin", K.R - 1.6, K.Fz - 2.4, -Math.PI / 2);
put("clock", K.R - 0.15, zc + 1.4, -Math.PI / 2);
put("chandelier", 0, zc + 1.6, 0);
K.spot(0, zc - 0.9, "the counter");
K.spot(0, (K.B + zp) / 2 + 0.8, "the vault");
K.spot(0, K.Fz - 3, "the hall");
},
function (K) {
var W = K.W, D = K.D, put = K.put, zp = K.Fz - Math.max(5, D * 0.3);
K.wallX(zp, K.L, K.R, [0]);
for (var z = K.B + 1.6; z < zp - 1.4; z += 2.6) {
put("hospitalbed", K.L + 1.2, z, Math.PI / 2);
put("hospitalbed", K.R - 1.2, z, -Math.PI / 2);
}
put("table", 0, K.B + 2, 0);
put("chair", 0.8, K.B + 2, -Math.PI / 2);
put("trherbs", 0, K.B + 0.3, 0);
if (W >= 20) {
for (var z3 = K.B + 4; z3 < zp - 2; z3 += 2.6) {
put("hospitalbed", -W / 5, z3, Math.PI / 2);
put("hospitalbed", W / 5, z3, -Math.PI / 2);
}
put("trherbs", -W / 3, K.B + 0.3, 0);
put("trherbs", W / 3, K.B + 0.3, 0);
put("table", 0, (K.B + zp) / 2, 0);
put("chair", 0.8, (K.B + zp) / 2, -Math.PI / 2);
put("chandelier", -W / 4, (K.B + zp) / 2, 0);
put("chandelier", W / 4, (K.B + zp) / 2, 0);
put("plant", K.L + 1, K.Fz - 1.2, 0);
put("plant", K.R - 1, K.Fz - 1.2, 0);
K.spot(-W / 5 + 1, (K.B + zp) / 2, "the ward");
K.spot(W / 5 - 1, (K.B + zp) / 2 + 2, "the ward");
}
put("trcounter", -1.2, zp + 1.6, 0);
put("trtill", 1.2, zp + 1.6, 0);
put("benchin", K.L + 1.4, K.Fz - 2.2, Math.PI / 2);
put("benchin", K.R - 1.4, K.Fz - 2.2, -Math.PI / 2);
put("plant", K.L + 0.8, zp + 0.8, 0);
put("chandelier", 0, (K.B + zp) / 2, 0);
K.spot(0, zp + 0.8, "reception");
K.spot(0, (K.B + zp) / 2, "the ward");
K.spot(-W / 4, K.Fz - 3, "waiting");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
var n = Math.max(1, Math.min(4, Math.floor(W / 10))), cw = W / n, zc = K.Fz - 3.4;
for (var i = 1; i < n; i++)
K.wallZ(K.L + i * cw, K.B, zc, []);
if (n > 1)
K.wallX(zc, K.L, K.R, (function () { var g = []; for (var j = 0; j < n; j++)
g.push(K.L + j * cw + cw / 2); return g; })());
for (var r = 0; r < n; r++) {
var x0 = K.L + r * cw, xc = x0 + cw / 2;
put("blackboard", xc, K.B + 0.2, 0);
put("desk", xc, K.B + 2, Math.PI);
put("chair", xc, K.B + 1.2, 0);
var cols = Math.max(2, Math.min(5, Math.floor((cw - 2.4) / 1.9)));
for (var z = K.B + 4; z < zc - 1.4; z += 1.9)
for (var c = 0; c < cols; c++)
put("schooldesk", xc - ((cols - 1) * 1.9) / 2 + c * 1.9, z, Math.PI);
put("bookshelf", x0 + 0.9, K.B + 0.4, 0);
put("clock", x0 + cw - 0.9, K.B + 0.12, 0);
if (r === 0)
put("trwallmap", K.L + 0.1, (K.B + zc) / 2, Math.PI / 2);
if (r === n - 1)
put("noticeboard", K.R - 0.15, (K.B + zc) / 2, -Math.PI / 2);
put("chandelier", xc, (K.B + zc) / 2, 0);
K.spot(xc, K.B + 2.8, "classroom " + (r + 1));
}
put("benchin", K.L + 2, K.Fz - 1.6, 0);
put("benchin", K.R - 2, K.Fz - 1.6, 0);
K.spot(0, K.Fz - 2, "the corridor");
},
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(4, D * 0.32), zp = K.B + back;
K.wallX(zp, K.L, K.R, [K.L + 1.6, K.R - 1.6]);
var zd = zp + Math.max(2.2, (K.Fz - zp) * 0.35);
put("trdutydesk", 0, zd, 0);
put("chair", 0, zd - 0.9, 0);
put("trwallmap", 0, zp + 0.1, 0);
put("noticeboard", -2.8, zp + 0.12, 0);
put("keyrack", 2.8, zp + 0.12, 0);
if (FURN.weaponrack) {
put("weaponrack", K.L + 0.3, zd, Math.PI / 2);
put("weaponrack", K.L + 0.3, zd + 2, Math.PI / 2);
}
if (FURN.armourstand) {
put("armourstand", K.R - 1, zd, 0);
put("armourstand", K.R - 1, zd + 1.4, 0);
}
put("trsaddles", K.R - 0.6, K.Fz - 3, -Math.PI / 2);
put("benchin", K.L + 1.6, K.Fz - 2.4, Math.PI / 2);
put("chandelier", 0, zd + 1.2, 0);
if (W >= 20) {
var bx = K.L + W / 4;
put("trwallmap", bx, zp + 0.1, 0);
put("trwallmap", bx - 2.6, zp + 0.1, 0);
for (var bz = zp + 2.4; bz < K.Fz - 3; bz += 1.8) {
put("benchin", bx - 1.6, bz, 0);
put("benchin", bx + 1.6, bz, 0);
}
put("maptable", K.R - W / 4, zd, 0);
put("trsaddles", K.R - W / 4 - 2, zp + 0.5, 0);
put("trsaddles", K.R - W / 4 + 2, zp + 0.5, 0);
if (FURN.weaponrack) {
put("weaponrack", K.R - 0.3, zd + 3, -Math.PI / 2);
}
put("trhay", K.R - 2, K.Fz - 2, 0);
put("chandelier", bx, (zp + K.Fz) / 2, 0);
put("chandelier", K.R - W / 4, (zp + K.Fz) / 2, 0);
K.spot(bx, zp + 3.4, "the briefing room");
K.spot(K.R - W / 4, zd + 1.4, "the map table");
}
put("bunk", K.L + 0.7, K.B + 1.2, 0);
put("bunk", K.L + 1.8, K.B + 1.2, 0);
put("trlockers", K.L + W / 4 + 1, K.B + 0.3, 0);
for (var bx2 = K.R - 0.7; bx2 > K.R - W / 3; bx2 -= 1.2)
put("bunk", bx2, K.B + 1.2, 0);
put("trbenchtable", K.R - W / 6, zp - 1.6, 0);
put("trlockers", K.R - W / 3 - 1.4, K.B + 0.3, 0);
K.spot(0, zd + 1.2, "the duty desk");
K.spot(K.L + 2, (K.B + zp) / 2, "the bunk room");
K.spot(-W / 4, K.Fz - 3, "the hall");
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("trcounter", -1.2, K.B + 2.2, 0);
put("trtill", 1.2, K.B + 2.2, 0);
put("keyrack", 0, K.B + 0.12, 0);
put("clock", 2.4, K.B + 0.12, 0);
put("trsort", -2.6, K.B + 0.3, 0);
put("trhearth", K.L + 0.45, 0, Math.PI / 2);
put("sofa", K.L + 2.6, 0, Math.PI / 2);
put("armchair", K.L + 3.2, -1.8, 1.2);
put("armchair", K.L + 3.2, 1.8, 1.9);
put("rug", K.L + 2.6, 0, 0);
for (var z = K.B + 4.5; z < K.Fz - 2.6; z += 2.8) {
put("table", W / 4, z, 0);
put("chair", W / 4 - 0.9, z, Math.PI / 2);
put("chair", W / 4 + 0.9, z, -Math.PI / 2);
}
put("plant", K.R - 1, K.Fz - 1.2, 0);
put("plant", K.L + 1, K.Fz - 1.2, 0);
put("chandelier", 0, 0, 0);
put("painting", K.R - 0.12, 0, -Math.PI / 2);
K.spot(0, K.B + 1.3, "the desk");
K.spot(K.L + 3, 0, "the lounge");
K.spot(W / 4, 0, "the dining room");
}
];
});
