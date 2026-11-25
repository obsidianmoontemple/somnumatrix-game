/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(318, function () {
"use strict";
return [
function (K) {
var W = K.W, D = K.D, put = K.put;
var zc = K.B + 4.4, x = K.L, end = K.R - 1.5;
while (x + 5 <= end + 0.01) {
put("counterbank", x + 2.5, zc, 0);
x += 5;
}
while (x + 2.4 <= end + 0.01) {
put("trcounter", x + 1.2, zc, 0);
x += 2.4;
}
if (end - x > 0.24)
K.wallX(zc, x, end, []);
put("wgsecdoor", K.R - 0.75, zc, 0);
for (var tx = K.L + 2.5, n = 0; tx < end - 1; tx += 5, n++) {
K.staff(n === 0 ? "Head cashier" : "Bank teller", tx - 1.2, zc - 0.8, 0);
if (n < 3)
K.staff("Bank teller", tx + 1.2, zc - 0.8, 0);
}
[-W / 2 + 2.2, -W / 2 + 5.4, W / 2 - 5.4, W / 2 - 2.2].forEach(function (bx, i) { if (Math.abs(bx) < 2.6)
return; put("wgworkstation", bx, K.B + 0.5, 0); if (i === 0)
K.staff("Bank clerk", bx, K.B + 1.3, Math.PI); });
put("filecabinet", K.L + 0.4, K.B + 2.4, Math.PI / 2);
put("filecabinet", K.L + 0.4, K.B + 3.1, Math.PI / 2);
put("bkqueue", -2.4, zc + 3.2, 0);
put("bkqueue", 2.4, zc + 3.2, 0);
put("bkqueue", -W / 2 + 4.2, zc + 1.8, Math.PI / 2);
put("bkrates", 0, K.B + 0.08, 0);
put("wgreception", -W / 4 + 1, K.Fz - 4.2, 0);
K.staff("Bank greeter", -W / 4 + 1, K.Fz - 4.9, 0);
K.staff("Bank security officer", K.R - 2.2, K.Fz - 1.6, -Math.PI / 2);
for (var z = zc + 5, i = 0; z < K.Fz - 6.5 && i < 3; z += 3.6, i++) {
put("desk", K.L + 1.6, z, Math.PI / 2);
put("sg_kf_computerscreen", K.L + 1.4, z - 0.3, Math.PI / 2);
K.staff("Personal banker", K.L + 0.9, z, Math.PI / 2);
put("chair", K.L + 2.8, z - 0.5, -Math.PI / 2);
put("chair", K.L + 2.8, z + 0.5, -Math.PI / 2);
put("desk", K.R - 1.6, z, -Math.PI / 2);
put("sg_kf_computerscreen", K.R - 1.4, z + 0.3, -Math.PI / 2);
K.staff(i === 0 ? "Loan officer" : "Personal banker", K.R - 0.9, z, -Math.PI / 2);
put("chair", K.R - 2.8, z - 0.5, Math.PI / 2);
put("chair", K.R - 2.8, z + 0.5, Math.PI / 2);
}
put("bkatm", -W / 2 + 3, K.Fz - 0.3, Math.PI);
put("bkatm", -W / 2 + 4.2, K.Fz - 0.3, Math.PI);
put("bkatm", W / 2 - 4.2, K.Fz - 0.3, Math.PI);
put("table", -3.2, zc + 6.6, 0);
put("table", 3.2, zc + 6.6, 0);
put("wgchairrow", -4, K.Fz - 2.6, 0);
put("wgchairrow", 4, K.Fz - 2.6, 0);
put("clock", K.R - 0.15, zc + 1.8, -Math.PI / 2);
put("painting", K.L + 0.08, zc + 2.2, Math.PI / 2);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
put("plant", -W / 4 - 1.4, K.Fz - 4.2, 0);
put("rug", 0, (zc + K.Fz) / 2, 0);
put("chandelier", -W / 4, (zc + K.Fz) / 2, 0);
put("chandelier", W / 4, (zc + K.Fz) / 2, 0);
K.spot(0, zc + 1.4, "the counter");
K.spot(0, K.Fz - 3, "the hall");
K.spot(K.L + 3, zc + 6, "personal banking");
K.spot(K.R - 3, zc + 6, "loans");
}
];
});
