/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(428, function () {
"use strict";
return [
function () {
var sk = vrhSkin();
if (!VRH.mat || VRH.skin !== sk) {
if (VRH.mat)
VRH.mat.dispose();
VRH.skin = sk;
VRH.mat = new THREE.MeshStandardMaterial({ color: sk, roughness: 0.62, metalness: 0 });
VRH.ctl.concat(VRH.bare).forEach(function (H) { if (!H)
return; H.bones.material = VRH.mat; H.knuck.material = VRH.mat; if (H.palm)
H.palm.material = VRH.mat; });
}
return VRH.mat;
},
function (i) {
var g = new THREE.Group();
g.name = "vrh-hand-" + i;
var H = vrhPiece(20);
H.g = g;
H.curl = [0, 0, 0, 0, 0];
H.side = 1;
g.add(H.bones);
g.add(H.knuck);
H.palm = new THREE.Mesh(VRH_KNUCK, vrhMaterial());
H.palm.scale.set(0.017, 0.042, 0.05);
H.palm.renderOrder = 20;
g.add(H.palm);
H.hold = new THREE.Group();
g.add(H.hold);
VRM.hands[i].add(g);
return H;
},
function (H, src) {
var gp = src.gamepad, bt = (gp && gp.buttons) || [], val = function (n) { return bt[n] ? (bt[n].value || (bt[n].pressed ? 1 : 0)) : 0; };
var touch = function (n) { return !!(bt[n] && (bt[n].touched || bt[n].pressed)); };
var side = src.handedness === "left" ? -1 : 1;
H.side = side;
var holding = !!H.hold.children.length;
var want = [touch(3) || touch(4) || touch(5) ? 0.7 : 0.25, Math.max(val(0), holding ? 0.85 : 0), Math.max(val(1), holding ? 0.95 : 0)];
if (!touch(0) && !holding)
want[1] = 0;
H.curl[0] += (want[0] - H.curl[0]) * 0.35;
H.curl[1] += (want[1] - H.curl[1]) * 0.35;
for (var f = 2; f < 5; f++)
H.curl[f] += (want[2] - H.curl[f]) * 0.35;
var ox = 0, oy = -0.035, oz = 0.075;
H.palm.position.set(ox + side * 0.006, oy - 0.012, oz + 0.005);
for (var k = 0; k < 4; k++) {
var F = VRH_FINGERS[k], c = H.curl[k + 1];
var p = new THREE.Vector3(ox, oy + F.y, oz - 0.045), ang = 0;
vrhKnuck(H, p, F.r * 1.05);
for (var s = 0; s < 3; s++) {
ang += c * (s === 0 ? 1.25 : 1.35);
var dx = -Math.sin(ang) * side, dz = -Math.cos(ang);
var q = p.clone().add(new THREE.Vector3(dx * F.len[s], 0, dz * F.len[s]));
vrhBone(H, p, q, F.r * (1 - s * 0.1));
vrhKnuck(H, q, F.r * (1 - s * 0.1));
p = q;
}
if (k === 0)
H.tip = p.clone();
}
var t = new THREE.Vector3(ox - side * 0.012, oy + 0.016, oz + 0.012), ta = 0.5, tc = H.curl[0], tl = [0.035, 0.03, 0.025];
vrhKnuck(H, t, 0.012);
for (var u = 0; u < 3; u++) {
var dy = 0.35 - tc * 0.55 * u, dir = new THREE.Vector3(-Math.sin(ta) * side * 0.55, dy, -Math.cos(ta)).normalize();
var tq = t.clone().addScaledVector(dir, tl[u]);
vrhBone(H, t, tq, 0.0105 - u * 0.0008);
vrhKnuck(H, tq, 0.0105 - u * 0.0008);
t = tq;
ta += 0.15;
}
vrhDone(H);
H.hold.position.set(ox + side * 0.005, oy - 0.01, oz - 0.01);
},
function (i) {
var H = vrhPiece(32);
H.g = new THREE.Group();
H.g.name = "vrh-bare-" + i;
H.g.add(H.bones);
H.g.add(H.knuck);
H.hold = new THREE.Group();
H.g.add(H.hold);
H.palm = new THREE.Mesh(VRH_KNUCK, vrhMaterial());
H.palm.renderOrder = 20;
H.g.add(H.palm);
VRM.dolly.add(H.g);
return H;
},
function (H, hand) {
var J = hand.joints, P = {};
function at(n) {
if (P[n])
return P[n];
var j = J[n];
if (!j || !j.visible)
return null;
j.userData.ball = 1;
P[n] = VRM.dolly.worldToLocal(j.getWorldPosition(new THREE.Vector3()));
return P[n];
}
function rad(n, d) { var j = J[n]; return Math.max(0.0085, Math.min(0.014, ((j && j.jointRadius) || d) * 1.2)); }
if (!at("wrist")) {
H.g.visible = false;
return;
}
H.g.visible = true;
VRH_CHAINS.forEach(function (ch, ci) {
for (var k = 1; k < ch.length; k++) {
var a = at(ch[k - 1]), b = at(ch[k]);
if (!a || !b)
break;
var r = k === 1 ? (ci === 0 ? 0.016 : 0.013) : rad(ch[k], 0.009);
vrhBone(H, a, b, r);
vrhKnuck(H, b, r);
}
});
VRH_WEB.forEach(function (w) { var a = at(w[0]), b = at(w[1]); if (a && b)
vrhBone(H, a, b, 0.012); });
vrhKnuck(H, at("wrist"), 0.022);
vrhDone(H);
var wr = at("wrist"), ip = at("index-finger-phalanx-proximal"), pp = at("pinky-finger-phalanx-proximal"), mp = at("middle-finger-phalanx-proximal");
if (wr && ip && pp && mp && J["wrist"]) {
H.palm.visible = true;
H.palm.position.copy(wr).lerp(mp, 0.5);
J["wrist"].getWorldQuaternion(VRH.q2);
VRM.dolly.getWorldQuaternion(VRH.q);
H.palm.quaternion.copy(VRH.q.invert().multiply(VRH.q2));
H.palm.scale.set(Math.max(0.03, ip.distanceTo(pp) * 0.62), 0.017, Math.max(0.035, wr.distanceTo(mp) * 0.5));
}
else
H.palm.visible = false;
var mid = at("middle-finger-metacarpal") || at("wrist"), w = J["wrist"];
H.hold.position.copy(mid);
if (w) {
w.getWorldQuaternion(VRH.q2);
VRM.dolly.getWorldQuaternion(VRH.q);
H.hold.quaternion.copy(VRH.q.invert().multiply(VRH.q2));
}
},
function (hand) {
var j = hand && hand.joints, w = j && j["wrist"], mt = j && j["middle-finger-tip"], rt = j && j["ring-finger-tip"], it = j && j["index-finger-tip"];
if (!(w && mt && rt && it && w.visible))
return null;
var dm = mt.position.distanceTo(w.position), dr = rt.position.distanceTo(w.position), di = it.position.distanceTo(w.position);
if (dm < 0.075 && dr < 0.075 && di < 0.085)
return true;
if (dm > 0.11)
return false;
return null;
},
function (p) {
if (typeof ARMS === "undefined" || !store || !store.objects)
return null;
var best = null, bd = 0.62 * 0.62;
for (var k = 0; k < store.objects.length; k++) {
var o = store.objects[k];
if (!ARMS[o.archetype] || o.carried)
continue;
if ((o.realm || 0) !== (store.here || 0))
continue;
var m = meshes[o.id];
if (!m || !m.visible)
continue;
m.getWorldPosition(VRH.v2);
var dx = VRH.v2.x - p.x, dz = VRH.v2.z - p.z, d = dx * dx + dz * dz;
if (d >= bd)
continue;
if (p.y < VRH.v2.y - 0.3 || p.y > VRH.v2.y + 2.2)
continue;
bd = d;
best = o;
}
return best;
},
function (H, spec) {
while (H.hold.children.length) {
var c = H.hold.children[0];
H.hold.remove(c);
if (c.userData.vrhOwn)
c.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material && !Array.isArray(o.material))
o.material.dispose(); });
}
if (!spec)
return;
var A = ARMS[spec.archetype] || {}, m = null;
try {
if (A.held && typeof HELD !== "undefined" && HELD[A.held]) {
m = HELD[A.held]();
m.userData.vrhOwn = true;
}
}
catch (e) {
m = null;
}
if (!m && meshes[spec.id]) {
m = meshes[spec.id].clone();
m.visible = true;
m.position.set(0, 0, 0);
m.rotation.set(0, 0, 0);
var bb = new THREE.Box3().setFromObject(meshes[spec.id]), sz = bb.getSize(VRH.v2), mx = Math.max(sz.x, sz.y, sz.z) || 1;
m.scale.multiplyScalar(Math.min(1, 0.32 / mx));
}
if (!m)
return;
m.rotation.x = -Math.PI / 2;
H.hold.add(m);
},
function (i, src) {
var spec = VRH.held[i];
VRH.held[i] = null;
if (!spec || carrying !== spec)
return;
var p = vrhHandWorld(i, new THREE.Vector3()), v = VRH.vel[i] || new THREE.Vector3(), sp = Math.hypot(v.x, v.z);
dropCarried(true);
var g = meshes[spec.id];
if (!g || !p) {
save();
return;
}
var x = p.x, z = p.z, said = "You set it down.";
if (sp > 2.2) {
var h = Math.max(0.2, p.y - (g.position.y || 0)), t = (Math.max(0, v.y) + Math.sqrt(Math.max(0, v.y) * Math.max(0, v.y) + 2 * 9.8 * h)) / 9.8;
var k = Math.min(1, 12 / (sp * t)), tx = x + v.x * t * k, tz = z + v.z * t * k;
if (!(typeof blockedAt === "function" && blockedAt(tx, tz, 0.5))) {
x = tx;
z = tz;
said = "Thrown.";
}
}
g.position.x = x;
g.position.z = z;
spec.x = x;
spec.z = z;
vrhBuzz(src, 0.3, 25);
setStatus(said);
save();
},
function (i) {
if (typeof useCarried !== "function" || !carrying)
return;
var c = VRM.hands[i];
if (!c)
return;
c.getWorldQuaternion(VRH.q);
VRH.v.set(0, 0, -1).applyQuaternion(VRH.q);
var y0 = yaw, p0 = pitch;
yaw = Math.atan2(-VRH.v.x, -VRH.v.z);
pitch = Math.asin(Math.max(-1, Math.min(1, VRH.v.y)));
try {
useCarried();
}
finally {
yaw = y0;
pitch = p0;
}
},
function (dt) {
var S = VRM.xr;
if (!S || !VRM.dolly)
return;
vrhMaterial();
VRH.noE = false;
VRH.busyRight = false;
var rightI = -1;
for (var i = 0; i < S.inputSources.length && i < VRM.hands.length; i++) {
var src = S.inputSources[i];
if (!src)
continue;
if (src.handedness === "right")
rightI = i;
if (!VRH.ctl[i])
VRH.ctl[i] = vrhCtlMake(i);
var hand = VRM.handsXr && VRM.handsXr[i], bareOn = !!(src.hand && hand && hand.joints && hand.joints["wrist"] && hand.joints["wrist"].visible);
if (bareOn && !VRH.bare[i])
VRH.bare[i] = vrhBareMake(i);
var C = VRH.ctl[i], B = VRH.bare[i];
var ball = VRM.hands[i].children[0];
if (ball && ball.isMesh && ball.geometry && ball.geometry.type === "SphereGeometry")
ball.visible = false;
C.g.visible = !src.hand && !!src.gamepad;
if (C.g.visible)
vrhCtlPose(C, src);
if (B) {
if (bareOn)
vrhBarePose(B, hand);
else
B.g.visible = false;
}
var H = bareOn ? B : C;
var p = vrhHandWorld(i, new THREE.Vector3());
if (p) {
var l = VRH.last[i];
if (l && dt > 0) {
var nv = p.clone().sub(l).divideScalar(dt);
VRH.vel[i] = (VRH.vel[i] || nv.clone()).lerp(nv, 0.5);
}
VRH.last[i] = p;
}
var gripNow;
if (bareOn) {
var f = vrhFist(hand);
gripNow = f === null ? !!VRH.grip[i] : f;
}
else {
var bt = (src.gamepad && src.gamepad.buttons) || [];
gripNow = !!(bt[1] && (bt[1].value > 0.6 || bt[1].pressed));
}
if (VRH.held[i] && carrying !== VRH.held[i]) {
VRH.held[i] = null;
}
if (gripNow && !VRH.grip[i] && !VRH.held[i] && p) {
var spec = vrhReach(p);
if (spec && vrhGrab(i, src, spec)) {
if (bareOn && typeof VRP !== "undefined")
VRP.fist[i] = true;
}
}
else if (!gripNow && VRH.grip[i] && VRH.held[i])
vrhLetGo(i, src);
if (bareOn && gripNow && VRH.held[i] && typeof VRP !== "undefined")
VRP.fist[i] = true;
VRH.grip[i] = gripNow;
if (!VRH.held[i] && p && !carrying) {
var nr = vrhReach(p);
if (nr && VRH.near[i] !== nr.id) {
vrhBuzz(src, 0.15, 15);
setStatus("Squeeze the grip (or close your hand) to take the " + esc((ARMS[nr.archetype] || {}).name || "thing") + ".");
}
VRH.near[i] = nr ? nr.id : null;
}
var trig = false;
if (src.gamepad) {
var b0 = src.gamepad.buttons && src.gamepad.buttons[0];
trig = !!(b0 && b0.pressed);
}
if (src.hand && hand && hand.inputState)
trig = !!hand.inputState.pinching;
if (trig && !VRH.trig[i]) {
if (VRH.held[i] && !(typeof VRP !== "undefined" && VRP.hit[i])) {
VRH.noE = true;
vrhUse(i);
}
else if (typeof VRP !== "undefined" && VRP.hit[i])
vrhBuzz(src, 0.35, 20);
}
VRH.trig[i] = trig;
if (src.handedness === "right" && VRH.held[i])
VRH.busyRight = true;
var want = VRH.held[i] || null;
var on = VRH.on[i];
if (!on || on.H !== H || on.spec !== want) {
if (on)
vrhShowHeld(on.H, null);
vrhShowHeld(H, want);
VRH.on[i] = { H: H, spec: want };
}
}
if (rightI >= 0 && carrying && VRH.held.indexOf(carrying) < 0) {
VRH.held[rightI] = carrying;
}
},
function (kind) {
var c = document.createElement("canvas");
c.width = c.height = 256;
var tex = new THREE.CanvasTexture(c);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.026, 40), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
if (kind === "phone") {
face.geometry.dispose();
face.geometry = vrwRoundRect(0.038, 0.05, 0.008);
}
face.renderOrder = 21;
return { c: c, tex: tex, face: face };
},
function (w, h, r) {
var s = new THREE.Shape(), x = -w / 2, y = -h / 2;
s.moveTo(x + r, y);
s.lineTo(x + w - r, y);
s.quadraticCurveTo(x + w, y, x + w, y + r);
s.lineTo(x + w, y + h - r);
s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
s.lineTo(x + r, y + h);
s.quadraticCurveTo(x, y + h, x, y + h - r);
s.lineTo(x, y + r);
s.quadraticCurveTo(x, y, x + r, y);
var g = new THREE.ShapeGeometry(s, 6), uv = g.attributes.uv, p = g.attributes.position;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
return g;
},
function (kind) {
var g = new THREE.Group();
g.name = "vrw-" + kind;
var F = vrwFace(kind);
var caseMat = new THREE.MeshStandardMaterial({ color: kind === "menu" ? 0xC9A868 : 0x2B2838, metalness: 0.85, roughness: 0.28, emissive: kind === "menu" ? 0x2A1E08 : 0x120E22 });
var body = kind === "menu" ? new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.031, 0.009, 40), caseMat) : new THREE.Mesh(new THREE.BoxGeometry(0.043, 0.009, 0.055), caseMat);
body.position.y = -0.004;
g.add(body);
F.face.rotation.x = -Math.PI / 2;
F.face.position.y = 0.0007;
g.add(F.face);
var band = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.0065, 8, 28), new THREE.MeshStandardMaterial({ color: kind === "menu" ? 0x3A2A1A : 0x1C1A26, roughness: 0.75 }));
band.position.y = -0.036;
band.scale.set(1, 0.75, 1);
g.add(band);
var halo = new THREE.Mesh(new THREE.RingGeometry(0.032, 0.037, 40), new THREE.MeshBasicMaterial({ color: kind === "menu" ? 0xF2D27A : 0xB49BFF, transparent: true, opacity: 0, depthWrite: false }));
halo.rotation.x = -Math.PI / 2;
halo.position.y = 0.0012;
halo.renderOrder = 22;
g.add(halo);
g.traverse(function (o) { o.frustumCulled = false; });
var W = { kind: kind, g: g, F: F, halo: halo, glow: 0, pressT: 0, sig: "" };
vrwPaint(W, true);
return W;
},
function (W, force) {
var d = new Date(), hh = d.getHours(), mm = d.getMinutes(), n = W.kind === "phone" ? vrwMsgs() : 0;
var open = W.kind === "menu" ? (typeof VRP !== "undefined" && VRP.mode === "menu") : vrwPhoneOpen();
var sig = hh + ":" + mm + "/" + n + "/" + open + "/" + Math.round(W.glow * 4);
if (!force && sig === W.sig)
return;
W.sig = sig;
var c = W.F.c, x = c.getContext("2d"), C = 128;
x.clearRect(0, 0, 256, 256);
var tm = (hh % 12 || 12) + ":" + (mm < 10 ? "0" : "") + mm;
if (W.kind === "menu") {
var gr = x.createRadialGradient(C, C * 0.8, 10, C, C, 128);
gr.addColorStop(0, open ? "#6A55B8" : "#4E3F92");
gr.addColorStop(0.75, "#231C48");
gr.addColorStop(1, "#120E26");
x.fillStyle = gr;
x.beginPath();
x.arc(C, C, 127, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#C9A868";
x.lineCap = "round";
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, r0 = i % 3 ? 108 : 100;
x.lineWidth = i % 3 ? 3 : 6;
x.beginPath();
x.moveTo(C + Math.sin(a) * r0, C - Math.cos(a) * r0);
x.lineTo(C + Math.sin(a) * 118, C - Math.cos(a) * 118);
x.stroke();
}
x.fillStyle = "#F2D27A";
x.textAlign = "center";
x.textBaseline = "middle";
x.font = "700 78px system-ui,sans-serif";
x.fillText("☰", C, C - 16);
x.font = "700 36px system-ui,sans-serif";
x.fillText(open ? "Close" : "Menu", C, C + 40);
x.fillStyle = "rgba(242,210,122,.75)";
x.font = "500 22px system-ui,sans-serif";
x.fillText(tm, C, C + 70);
}
else {
var g2 = x.createLinearGradient(0, 0, 0, 256);
g2.addColorStop(0, open ? "#7A5CE0" : "#5B44B8");
g2.addColorStop(1, "#1A1236");
x.fillStyle = g2;
x.fillRect(0, 0, 256, 256);
x.fillStyle = "#E8E0FF";
x.textAlign = "center";
x.textBaseline = "middle";
x.font = "500 26px system-ui,sans-serif";
x.fillText(tm, C, 34);
x.font = "700 84px system-ui,sans-serif";
x.fillText("📱", C, C - 6);
x.font = "700 38px system-ui,sans-serif";
x.fillText(open ? "Close" : "Phone", C, C + 76);
if (n > 0) {
x.fillStyle = "#E8574A";
x.beginPath();
x.arc(196, 72, 26, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#fff";
x.font = "700 26px system-ui,sans-serif";
x.fillText(String(Math.min(n, 99)), 196, 73);
}
}
W.F.tex.needsUpdate = true;
},
function (W) {
if (W.kind === "menu") {
if (typeof vrpMenuToggle === "function")
vrpMenuToggle();
}
else if (vrwPhoneOpen()) {
try {
if (typeof vrpBack === "function" && VRP.el)
vrpBack();
else
PH.open = false;
if (typeof phPaint === "function")
phPaint();
}
catch (e) { }
}
else {
if (typeof VRP !== "undefined" && VRP.mode === "menu")
vrpMenuToggle(false);
var b = document.getElementById("ph-btn");
if (b)
b.click();
else
try {
PH.open = true;
if (typeof phEls === "function")
phEls();
if (typeof phLoad === "function")
phLoad();
phPaint();
}
catch (e) { }
}
vrwPaint(W, true);
},
function (i, out) {
var B = VRH.bare[i], C = VRH.ctl[i], S = VRM.xr, src = S && S.inputSources[i], hand = VRM.handsXr && VRM.handsXr[i];
if (B && B.g.visible && hand && hand.joints["index-finger-tip"]) {
hand.joints["index-finger-tip"].getWorldPosition(out);
return out;
}
if (C && C.g.visible && C.tip) {
out.copy(C.tip);
C.g.localToWorld(out);
return out;
}
return null;
},
function (W, i, side) {
var B = VRH.bare[i], C = VRH.ctl[i], hand = VRM.handsXr && VRM.handsXr[i], par;
if (B && B.g.visible && hand && hand.joints["wrist"] && hand.joints["wrist"].visible) {
var J = hand.joints, w = J["wrist"], m = J["middle-finger-metacarpal"], ip = J["index-finger-phalanx-proximal"], pp = J["pinky-finger-phalanx-proximal"];
if (!(m && ip && pp)) {
if (W.g.parent)
W.g.parent.remove(W.g);
return false;
}
par = VRM.dolly;
var P = function (j) { return VRM.dolly.worldToLocal(j.getWorldPosition(new THREE.Vector3())); };
var pw = P(w), f = P(m).sub(pw).normalize(), a = P(ip).sub(P(pp)), up = new THREE.Vector3().crossVectors(f, a).normalize();
w.getWorldQuaternion(VRW.q);
var wy = new THREE.Vector3(0, 1, 0).applyQuaternion(VRW.q).applyQuaternion(VRM.dolly.getWorldQuaternion(new THREE.Quaternion()).invert());
if (up.dot(wy) < 0)
up.negate();
var z = f.clone().negate(), x = new THREE.Vector3().crossVectors(up, z).normalize();
z.crossVectors(x, up).normalize();
W.g.matrixAutoUpdate = true;
W.g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, up, z));
W.g.position.copy(pw).addScaledVector(up, 0.024).addScaledVector(f, -0.035);
}
else if (C && C.g.visible) {
par = C.g;
W.g.quaternion.identity();
W.g.position.set(side * 0.02, -0.004, 0.125);
W.g.rotation.set(0, 0, -side * 0.7);
}
else {
if (W.g.parent)
W.g.parent.remove(W.g);
return false;
}
if (W.g.parent !== par)
par.add(W.g);
return true;
},
function () {
var S = VRM.xr;
if (!S)
return;
var L = -1, R = -1;
for (var i = 0; i < S.inputSources.length; i++) {
var h = S.inputSources[i].handedness;
if (h === "left")
L = i;
else if (h === "right")
R = i;
}
if (!VRW.w[0])
VRW.w[0] = vrwMake("menu");
if (!VRW.w[1])
VRW.w[1] = vrwMake("phone");
VRW.on = false;
var pairs = [[VRW.w[0], L, R, -1], [VRW.w[1], R, L, 1]], now = performance.now();
pairs.forEach(function (p) {
var W = p[0], wi = p[1], fi = p[2];
if (wi < 0 || !vrwPlace(W, wi, p[3])) {
W.glow = 0;
return;
}
VRW.on = true;
var tip = fi >= 0 ? vrwTip(fi, VRW.tipW) : null, d = 1;
if (tip) {
W.F.face.getWorldPosition(VRW.pW);
d = tip.distanceTo(VRW.pW);
}
var want = d < 0.09 ? Math.min(1, (0.09 - d) / 0.06) : 0;
W.glow += (want - W.glow) * 0.3;
W.halo.material.opacity = 0.22 + W.glow * 0.75;
var near = d < 0.022;
if (near && !W.down && now - W.pressT > 900) {
W.down = true;
W.pressT = now;
W.F.face.position.y = -0.0015;
vrwPress(W);
if (typeof vrhBuzz === "function") {
vrhBuzz(S.inputSources[wi], 0.5, 35);
if (fi >= 0)
vrhBuzz(S.inputSources[fi], 0.5, 35);
}
}
else if (!near && d > 0.035 && W.down) {
W.down = false;
W.F.face.position.y = 0.0007;
}
vrwPaint(W, false);
});
}
];
});
