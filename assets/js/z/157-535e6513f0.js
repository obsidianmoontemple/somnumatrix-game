/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(157, function () {
"use strict";
return [
function (col, s, kind) {
var g = new THREE.Group(), m = mL(col), dark = mL(typeof blend === "function" ? blend(col, 0x000000, 0.3) : col);
var body = P(sph(.07 * s, 12, 10), m, 0, 0, 0);
body.scale.set(0.85, 1.15, 1);
g.add(body);
var head = P(sph(.048 * s, 12, 10), m, 0, .095 * s, .02 * s);
g.add(head);
[-1, 1].forEach(function (sd) {
var w = P(sph(.06 * s, 10, 8), dark, sd * .05 * s, .005 * s, -.01 * s);
w.scale.set(0.35, 1.05, 1.15);
w.rotation.x = 0.25;
g.add(w);
});
var tail = P(box(.06 * s, .012 * s, .09 * s), dark, 0, -.055 * s, -.07 * s);
tail.rotation.x = 0.6;
g.add(tail);
var eyeM = mL(kind === "owl" ? 0xF2C230 : 0x141414);
if (kind === "owl") {
var face = P(new THREE.CircleGeometry(.04 * s, 14), mL(typeof blend === "function" ? blend(col, 0xFFFFFF, 0.45) : 0xC8B090), 0, .1 * s, .065 * s);
g.add(face);
[-1, 1].forEach(function (sd) {
g.add(P(sph(.013 * s, 8, 6), eyeM, sd * .017 * s, .106 * s, .068 * s));
g.add(P(sph(.006 * s, 6, 5), mL(0x111111), sd * .017 * s, .106 * s, .078 * s));
var tuft = P(cone(.012 * s, .035 * s, 4), dark, sd * .028 * s, .145 * s, .01 * s);
tuft.rotation.z = -sd * 0.35;
g.add(tuft);
});
g.add(P(cone(.008 * s, .018 * s, 4), mL(0x3A3020), 0, .09 * s, .075 * s, Math.PI / 2 + 0.4));
}
else {
[-1, 1].forEach(function (sd) { g.add(P(sph(.008 * s, 6, 5), eyeM, sd * .03 * s, .105 * s, .045 * s)); g.add(P(sph(.003 * s, 4, 3), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), sd * .033 * s, .108 * s, .051 * s)); });
g.add(P(cone(.012 * s, .05 * s, 5), mL(kind === "raven" ? 0x1A1A1E : 0xD8A030), 0, .095 * s, .085 * s, Math.PI / 2));
}
[-1, 1].forEach(function (sd) { g.add(P(cyl(.004 * s, .004 * s, .04 * s, 4), mL(0x3A3020), sd * .02 * s, -.085 * s, .01 * s)); });
g.userData.dpBird = 1;
return g;
}
];
});
