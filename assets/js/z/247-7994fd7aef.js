/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(247, function () {
"use strict";
return [
function (g, upper, toward) {
var s = liftStair(g), rs = liftStreet(g, upper);
if (!s || rs === null)
return null;
var rL = upper ? g.ru : g.rl, sg = rs > rL ? 1 : -1, r3 = rs - sg * (ATL_ROAD + 2);
var o = sg * (-ROAD_SIDE) * LIFT_AVE_OFF * (toward ? -1 : 1), pts, r1;
var B = liftBeside(g, upper, s, rs);
if (B) {
pts = B.pts.slice();
r1 = B.rf;
if (!B.street)
pts.push(tglXZ(s.a + o / r1, r1));
}
else {
r1 = rL + sg * liftSpurAt(g, upper, s, rL, sg);
pts = [tglXZ(g.a, r1), tglXZ(s.a + o / r1, r1)];
}
if (!B || !B.street) {
var n = Math.max(1, Math.ceil(Math.abs(r3 - r1) / 20));
for (var k = 1; k <= n; k++) {
var r = r1 + (r3 - r1) * k / n;
pts.push(tglXZ(s.a + o / r, r));
}
}
if (toward) {
pts.reverse();
pts.push(tglXZ(g.a, rL));
}
return pts;
}
];
});
