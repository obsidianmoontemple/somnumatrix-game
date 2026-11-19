/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(277, function () {
"use strict";
return [
function (K) {
var W = K.W, D = K.D, put = K.put;
put("wgreception", 0, K.B + 4.4, 0);
K.staff("Receptionist", -0.5, K.B + 3.7, 0);
K.staff("Receptionist", 1.0, K.B + 3.7, 0);
put("trwallmap", 0, K.B + 0.1, 0);
put("noticeboard", -3, K.B + 0.12, 0);
put("noticeboard", 3, K.B + 0.12, 0);
for (var x = 2.2; x < W / 2 - 7; x += (x < 3 ? 4.8 : 3.4))
for (var z = K.B + 7; z < K.Fz - 3.5; z += 2.2) {
put("wgchairrow", -x, z, Math.PI);
put("wgchairrow", x, z, Math.PI);
}
if (W > 30) {
put("trwallmap", -W / 4, K.B + 0.1, 0);
put("trwallmap", W / 4, K.B + 0.1, 0);
put("plant", -W / 4, K.Fz - 1.4, 0);
put("plant", W / 4, K.Fz - 1.4, 0);
put("wgnursedesk", -W / 4, K.B + 3.2, 0);
K.staff("Patient liaison officer", -W / 4, K.B + 2.5, 0);
put("wgworkstation", W / 4, K.B + 1.0, Math.PI);
K.staff("Admissions clerk", W / 4, K.B + 1.9, Math.PI);
}
put("wgcoffeebar", K.L + 0.4, K.B + 3.2, Math.PI / 2);
K.staff("Barista", K.L + 1.2, K.B + 3.2, -Math.PI / 2);
for (var z2 = K.B + 6.4; z2 < K.Fz - 3; z2 += 2.6) {
put("table", K.L + 3.2, z2, 0);
put("chair", K.L + 2.3, z2, Math.PI / 2);
put("chair", K.L + 4.1, z2, -Math.PI / 2);
}
put("shelfgoods", K.R - 0.4, K.B + 2.6, -Math.PI / 2);
put("shelfgoods", K.R - 0.4, K.B + 5.2, -Math.PI / 2);
put("flowerbucket", K.R - 1.6, K.B + 7.2, 0);
put("displaycase", K.R - 3.4, K.B + 3.6, 0);
put("trtill", K.R - 3.4, K.B + 6.2, Math.PI / 2);
K.staff("Shop assistant", K.R - 2.6, K.B + 6.2, -Math.PI / 2);
put("wgvending", K.L + 0.5, K.Fz - 2.2, Math.PI / 2);
put("wgwatercooler", K.R - 0.5, K.Fz - 2.4, -Math.PI / 2);
put("wgwheelchair", K.R - 1.2, K.Fz - 1.2, -Math.PI / 2);
put("wgwheelchair", K.R - 2.1, K.Fz - 1.2, -Math.PI / 2);
put("plant", K.L + 1, K.Fz - 1, 0);
put("plant", K.R - 1, K.B + 1, 0);
put("plant", K.L + 1, K.B + 1, 0);
K.spot(0, K.B + 6, "reception");
K.spot(-4, K.B + 9, "waiting");
K.spot(K.L + 3, K.B + 6, "the café");
}
];
});
