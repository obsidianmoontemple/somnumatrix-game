/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(474, function () {
return [
function () {
var C = HHS_DOG, h = C.coat, b = C.belly, r = C.ruff;
var P = [hhsE([0, 0.74, 0.24], [0.25, 0.28, 0.4], h), hhsE([0, 0.52, 0.42], [0.16, 0.13, 0.2], b, null, 0.08), hhsE([0, 0.92, 0.3], [0.17, 0.09, 0.24], h),
hhsC([0, 0.82, -0.06], [0, 0.8, -0.42], 0.19, 0.18, h, 0.08), hhsE([0, 0.6, -0.16], [0.15, 0.09, 0.26], b, null, 0.08), hhsE([0, 0.8, -0.52], [0.21, 0.19, 0.21], h),
hhsE([0, 0.92, 0.5], [0.31, 0.24, 0.22], r, null, 0.09), hhsE([0, 1.0, 0.36], [0.2, 0.12, 0.2], r, null, 0.07),
hhsC([0, 0.84, -0.66], [0, 0.86, -0.78], 0.075, 0.06, h, 0.05)];
for (var q = 0; q < 9; q++) {
var z = 0.28 - q * 0.1, y = 0.98 - q * 0.012;
P.push(hhsC([0, y, z], [0, y + 0.06, z - 0.06], 0.05, 0.008, r, 0.03));
}
P = P.concat(hhsMir([
hhsE([0.17, 0.78, 0.4], [0.09, 0.22, 0.15], h, [0.3, 0, 0]), hhsC([0.17, 0.62, 0.45], [0.17, 0.36, 0.38], 0.09, 0.068, h, 0.05),
hhsC([0.17, 0.36, 0.38], [0.16, 0.1, 0.4], 0.064, 0.05, h, 0.04), hhsC([0.16, 0.1, 0.4], [0.16, 0.045, 0.45], 0.05, 0.046, h, 0.03),
hhsE([0.16, 0.038, 0.5], [0.072, 0.04, 0.09], h, null, 0.03),
hhsE([0.12, 0.03, 0.575], [0.024, 0.024, 0.032], h, null, 0.012), hhsE([0.15, 0.03, 0.585], [0.024, 0.024, 0.032], h, null, 0.012), hhsE([0.18, 0.03, 0.585], [0.024, 0.024, 0.032], h, null, 0.012), hhsE([0.205, 0.03, 0.57], [0.024, 0.024, 0.032], h, null, 0.012),
hhsC([0.12, 0.03, 0.6], [0.12, 0.008, 0.635], 0.012, 0.003, C.claw, 0.006), hhsC([0.15, 0.03, 0.61], [0.15, 0.008, 0.645], 0.012, 0.003, C.claw, 0.006), hhsC([0.18, 0.03, 0.61], [0.18, 0.008, 0.645], 0.012, 0.003, C.claw, 0.006), hhsC([0.205, 0.03, 0.595], [0.21, 0.008, 0.63], 0.012, 0.003, C.claw, 0.006),
hhsE([0.17, 0.68, -0.5], [0.11, 0.22, 0.17], h, [0.25, 0, 0]), hhsC([0.18, 0.52, -0.52], [0.18, 0.3, -0.68], 0.085, 0.055, h, 0.05),
hhsC([0.18, 0.3, -0.68], [0.17, 0.06, -0.62], 0.046, 0.042, h, 0.03), hhsE([0.17, 0.036, -0.57], [0.066, 0.04, 0.085], h, null, 0.03),
hhsE([0.14, 0.03, -0.5], [0.022, 0.022, 0.03], h, null, 0.012), hhsE([0.2, 0.03, -0.5], [0.022, 0.022, 0.03], h, null, 0.012),
hhsC([0.14, 0.03, -0.48], [0.14, 0.008, -0.45], 0.011, 0.003, C.claw, 0.006), hhsC([0.2, 0.03, -0.48], [0.2, 0.008, -0.45], 0.011, 0.003, C.claw, 0.006)
]));
return P;
},
function () {
var C = HHS_DOG, h = C.coat, m = C.muzzle;
var P = [hhsE([0, 0.03, -0.02], [0.1, 0.09, 0.12], h), hhsE([0, 0.06, -0.08], [0.09, 0.08, 0.08], C.ruff, null, 0.04),
hhsC([0, 0.0, 0.07], [0, -0.02, 0.29], 0.066, 0.046, m, 0.05), hhsE([0, 0.035, 0.18], [0.048, 0.028, 0.12], h, null, 0.04),
hhsE([0, 0.008, 0.31], [0.032, 0.026, 0.022], C.nose, null, 0.015), hhsE([0, 0.075, 0.06], [0.07, 0.025, 0.05], h, [0.35, 0, 0], 0.03)];
P = P.concat(hhsMir([hhsE([0.064, -0.03, 0.035], [0.05, 0.055, 0.07], h, null, 0.04), hhsE([0.04, -0.05, 0.2], [0.032, 0.04, 0.095], m, null, 0.04),
hhsE([0.068, 0.13, -0.05], [0.032, 0.078, 0.016], h, [-0.25, 0, -0.35], 0.02), hhsE([0.045, 0.07, 0.075], [0.03, 0.018, 0.035], h, null, 0.02)]));
[[0.032, 0.27, 0.055], [0.038, 0.23, 0.03], [0.042, 0.19, 0.026], [0.045, 0.15, 0.024]].forEach(function (q) { [-1, 1].forEach(function (sd) { P.push(hhsC([sd * q[0], -0.06, q[1]], [sd * q[0], -0.06 - q[2], q[1] + 0.004], 0.011, 0.0025, C.tooth, 0.004)); }); });
return P;
},
function () {
var C = HHS_DOG, P = [hhsC([0, 0, 0], [0, -0.012, 0.24], 0.044, 0.03, C.muzzle, 0.04), hhsE([0, 0.012, 0.13], [0.03, 0.01, 0.09], C.gum, null, 0.01)];
[[0.029, 0.22, 0.04], [0.033, 0.17, 0.022], [0.035, 0.12, 0.02]].forEach(function (q) { [-1, 1].forEach(function (sd) { P.push(hhsC([sd * q[0], 0.01, q[1]], [sd * q[0], 0.01 + q[2], q[1] - 0.004], 0.01, 0.0025, C.tooth, 0.004)); }); });
return P;
},
function () {
var C = HHS_DOG, pts = [[0, 0, 0], [0, 0.07, -0.14], [0.03, 0.04, -0.3], [0.02, -0.08, -0.42], [-0.02, -0.18, -0.46], [-0.04, -0.12, -0.56]];
var P = [];
for (var i = 0; i < pts.length - 1; i++)
P.push(hhsC(pts[i], pts[i + 1], 0.06 - i * 0.008, 0.052 - i * 0.008, i < 2 ? C.coat : C.snake, 0.03));
P.push(hhsE([-0.045, -0.1, -0.61], [0.032, 0.022, 0.055], C.snake, [0.3, 0, 0], 0.02), hhsE([-0.045, -0.115, -0.6], [0.026, 0.012, 0.045], C.snakeBelly, null, 0.01));
return P;
},
function (kind) {
var lite = hhsLite(), k = "fur|" + kind + (lite ? "L" : "");
if (HHS.mats[k])
return HHS.mats[k];
var m = lite ? new THREE.MeshLambertMaterial({ vertexColors: true }) : new THREE.MeshStandardMaterial({ vertexColors: true, roughness: kind === "wet" ? 0.3 : 0.84, metalness: 0 });
if (!lite) {
var fq = kind === "wet" ? 90 : 56, st = kind === "wet" ? 0.15 : 1.0;
m.extensions = { derivatives: true };
m.onBeforeCompile = function (sh) {
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vBkPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvBkPos=position;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\n" + HHS_NOISE)
.replace("#include <color_fragment>", "#include <color_fragment>\nfloat bkC=hhsFbm(vBkPos*vec3(" + (fq * 0.5).toFixed(1) + "," + (fq * 0.2).toFixed(1) + "," + (fq * 0.5).toFixed(1) + "));\ndiffuseColor.rgb*=0.66+0.56*bkC;")
.replace("#include <normal_fragment_maps>", "#include <normal_fragment_maps>\n{ float bh=hhsFbm(vBkPos*vec3(" + fq + ".0," + (fq * 0.35).toFixed(1) + "," + fq + ".0))*" + (st * 0.018).toFixed(4) + "; vec3 sp=-vViewPosition; vec3 sx=dFdx(sp), sy=dFdy(sp); vec3 r1=cross(sy,normal), r2=cross(normal,sx); float det=dot(sx,r1); vec3 gr=sign(det)*(dFdx(bh)*r1+dFdy(bh)*r2); normal=normalize(abs(det)*normal-gr); }");
};
m.customProgramCacheKey = function () { return "hhsfur" + kind; };
}
m.userData.realSoft = 1;
m.userData.ldShared = 1;
return (HHS.mats[k] = m);
},
function (key, prims, cell, K, mat) {
var lite = hhsLite(), k = key + (lite ? "L" : ""), geo = HHS.geo[k];
if (!geo) {
geo = rbkBuild(prims, cell * (lite ? 1.8 : 1), K);
geo.userData.shared = 1;
geo.userData.rbkShared = 1;
HHS.geo[k] = geo;
}
var m = new THREE.Mesh(geo, mat);
m.raycast = function () { };
m.userData.noSit = 1;
m.castShadow = !lite;
m.receiveShadow = true;
return m;
},
function () {
if (typeof rbkBuild !== "function")
return null;
var hide = hhsFur("fur"), wet = hhsFur("wet"), root = new THREE.Group(), body = hhsNode(root, 0, 0, 0);
body.add(hhsSculpt("hhs_cerb_body", hhsDogBody(), 0.02, 0.05, hide));
var heads = [];
[-1, 0, 1].forEach(function (o, i) {
var nr = hhsNode(body, o * 0.17, 0.9, 0.55);
nr.rotation.y = o * 0.5;
nr.rotation.z = -o * 0.22;
nr.add(hhsSculpt("hhs_cerb_neck", hhsDogNeck(), 0.016, 0.06, hide));
var hd = hhsNode(nr, 0, 0.27, 0.24);
hd.add(hhsSculpt("hhs_cerb_skull", hhsDogSkull(), 0.0065, 0.03, hide));
[-1, 1].forEach(function (sd) { hhsEye(hd, sd * 0.052, 0.048, 0.1, 0.014); });
var jw = hhsNode(hd, 0, -0.055, 0.045);
jw.add(hhsSculpt("hhs_cerb_jaw", hhsDogJaw(), 0.006, 0.02, wet));
heads.push({ n: nr, h: hd, j: jw, o: o, ph: i * 2.3, yaw0: o * 0.5 });
});
var tl = hhsNode(body, 0, 0.86, -0.78);
tl.add(hhsSculpt("hhs_cerb_tail", hhsDogTail(), 0.012, 0.03, hide));
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(new THREE.SphereGeometry(1, 6, 5), hhsGlowMat(0xE8C040)); e.scale.setScalar(0.008); e.position.set(-0.045 + sd * 0.02, -0.09, -0.6); tl.add(e); });
root.userData.hhsDog = { body: body, heads: heads, tail: tl };
return root;
},
function (g, t, sleep) {
var D = g.userData.hhsDog;
if (!D)
return;
var P = camera.position, wp = g.getWorldPosition(new THREE.Vector3()), dx = P.x - wp.x, dz = P.z - wp.z, near = !sleep && Math.hypot(dx, dz) < 55;
var ry = 0;
for (var o = g; o; o = o.parent)
ry += o.rotation.y;
var look = Math.atan2(dx, dz) - ry;
while (look > Math.PI)
look -= 2 * Math.PI;
while (look < -Math.PI)
look += 2 * Math.PI;
look = Math.max(-1, Math.min(1, look));
var br = sleep ? 0.7 : 1.3;
D.body.scale.set(1, 1 + 0.008 * Math.sin(t * br), 1 + 0.004 * Math.sin(t * br));
D.body.position.y = 0.004 * Math.sin(t * br);
D.heads.forEach(function (H) {
var want = near ? look * 0.75 + H.yaw0 * 0.45 : H.yaw0 + (sleep ? 0.05 : 0.2) * Math.sin(t * 0.4 + H.ph);
H.n.rotation.y += (want - H.n.rotation.y) * 0.04;
var cyc = (t * 0.32 + H.ph * 0.4) % 4, sn = near && cyc < 0.9 ? Math.sin(cyc / 0.9 * Math.PI) : 0;
var nx = sleep ? 0.55 : -0.05 + 0.05 * Math.sin(t * 0.9 + H.ph) - 0.18 * sn;
H.n.rotation.x += (nx - H.n.rotation.x) * 0.05;
H.h.rotation.x = sleep ? 0.35 : 0.15 + (near ? 0.1 : 0) + 0.12 * sn + 0.04 * Math.sin(t * 1.7 + H.ph);
H.j.rotation.x = sleep ? 0.02 : 0.06 + 0.55 * sn + 0.04 * Math.max(0, Math.sin(t * 2.6 + H.ph));
});
D.tail.rotation.y = (sleep ? 0.15 : 0.45) * Math.sin(t * 0.8);
D.tail.rotation.x = 0.1 * Math.sin(t * 0.6 + 1);
},
function () {
var hr = typeof hallRealm === "function" ? hallRealm() : null;
if (hr && typeof store !== "undefined")
for (var i = 0; i < store.objects.length; i++) {
var q = store.objects[i];
if (q.archetype !== "hubdoor" || q.leadsTo !== "underworld" || (q.realm || 0) !== hr.id)
continue;
var r = q.rot || 0, s = (q.attrs && q.attrs.s) || 1, d = 0.6 * s + 3.2;
return { here: hr.id, x: q.x - Math.sin(r) * d, y: 1.72, z: q.z - Math.cos(r) * d, yaw: r, name: "the Hall of Doors" };
}
if (typeof heartOf === "function") {
var h = heartOf(0);
return { here: 0, x: h.x, y: 1.72, z: h.z + 24, yaw: 0, name: "your own town" };
}
return null;
},
function () {
if (HHS.going || typeof ebsGo !== "function")
return false;
if (typeof WLD !== "undefined" && WLD.on)
return false;
var F = hhsHallSpot();
if (!F)
return false;
HHS.going = 1;
try {
ebsGo({ from: F });
}
catch (e) {
if (window.console)
console.warn("[hades-house] erebos", e);
}
HHS.going = 0;
if (!(typeof WLD !== "undefined" && WLD.on === EBS_KEY))
return false;
try {
var L = dqLocal();
if (L && L.stamps && !L.stamps.underworld) {
L.stamps.underworld = dqToday();
if (typeof save === "function")
save();
}
}
catch (e) { }
return true;
}
];
});
