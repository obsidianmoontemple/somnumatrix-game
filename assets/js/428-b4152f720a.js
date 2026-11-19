/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var VRH = { ready: false, on: [], ctl: [], bare: [], held: [], near: [], grip: [], trig: [], vel: [], last: [], noE: false, busyRight: false,
m4: new THREE.Matrix4(), q: new THREE.Quaternion(), q2: new THREE.Quaternion(), v: new THREE.Vector3(), v2: new THREE.Vector3(),
v3: new THREE.Vector3(), s: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0), skin: null, mat: null };
function vrhSkin() {
var c = 0xE0B090;
try {
var L = typeof meLook === "function" ? meLook() : null;
if (L && L.skin != null)
c = L.skin;
}
catch (e) { }
if (typeof c === "string")
c = parseInt(c.replace("#", ""), 16) || 0xE0B090;
return c;
}
function vrhMaterial() { return __ZC(428, 0, this, arguments, new.target); }
var VRH_BONE = new THREE.CylinderGeometry(1, 0.9, 1, 8, 1, true), VRH_KNUCK = new THREE.SphereGeometry(1, 8, 6);
function vrhPiece(n) {
var b = new THREE.InstancedMesh(VRH_BONE, vrhMaterial(), n), k = new THREE.InstancedMesh(VRH_KNUCK, vrhMaterial(), n + 6);
b.frustumCulled = false;
k.frustumCulled = false;
b.count = 0;
k.count = 0;
b.renderOrder = k.renderOrder = 20;
return { bones: b, knuck: k, nb: 0, nk: 0 };
}
function vrhBone(H, a, b, r) {
var L = VRH.v3.subVectors(b, a).length();
if (L < 1e-4)
return;
VRH.q.setFromUnitVectors(VRH.up, VRH.v3.normalize());
VRH.s.set(r, L, r);
VRH.v2.addVectors(a, b).multiplyScalar(0.5);
VRH.m4.compose(VRH.v2, VRH.q, VRH.s);
H.bones.setMatrixAt(H.nb++, VRH.m4);
}
function vrhKnuck(H, p, r) { VRH.q.identity(); VRH.s.set(r, r, r); VRH.m4.compose(p, VRH.q, VRH.s); H.knuck.setMatrixAt(H.nk++, VRH.m4); }
function vrhDone(H) {
H.bones.count = H.nb;
H.knuck.count = H.nk;
H.bones.instanceMatrix.needsUpdate = true;
H.knuck.instanceMatrix.needsUpdate = true;
H.nb = 0;
H.nk = 0;
}
var VRH_FINGERS = [
{ y: 0.012, len: [0.042, 0.026, 0.022], r: 0.0095 },
{ y: -0.006, len: [0.046, 0.029, 0.023], r: 0.0098 },
{ y: -0.023, len: [0.043, 0.027, 0.022], r: 0.0093 },
{ y: -0.038, len: [0.034, 0.021, 0.019], r: 0.0083 }
];
function vrhCtlMake(i) { return __ZC(428, 1, this, arguments, new.target); }
function vrhCtlPose(H, src) { return __ZC(428, 2, this, arguments, new.target); }
var VRH_CHAINS = [
["wrist", "thumb-metacarpal", "thumb-phalanx-proximal", "thumb-phalanx-distal", "thumb-tip"],
["wrist", "index-finger-metacarpal", "index-finger-phalanx-proximal", "index-finger-phalanx-intermediate", "index-finger-phalanx-distal", "index-finger-tip"],
["wrist", "middle-finger-metacarpal", "middle-finger-phalanx-proximal", "middle-finger-phalanx-intermediate", "middle-finger-phalanx-distal", "middle-finger-tip"],
["wrist", "ring-finger-metacarpal", "ring-finger-phalanx-proximal", "ring-finger-phalanx-intermediate", "ring-finger-phalanx-distal", "ring-finger-tip"],
["wrist", "pinky-finger-metacarpal", "pinky-finger-phalanx-proximal", "pinky-finger-phalanx-intermediate", "pinky-finger-phalanx-distal", "pinky-finger-tip"]
];
var VRH_WEB = [["index-finger-phalanx-proximal", "middle-finger-phalanx-proximal"], ["middle-finger-phalanx-proximal", "ring-finger-phalanx-proximal"],
["ring-finger-phalanx-proximal", "pinky-finger-phalanx-proximal"], ["thumb-metacarpal", "index-finger-phalanx-proximal"],
["index-finger-metacarpal", "pinky-finger-metacarpal"]];
function vrhBareMake(i) { return __ZC(428, 3, this, arguments, new.target); }
function vrhBarePose(H, hand) { return __ZC(428, 4, this, arguments, new.target); }
function vrhFist(hand) { return __ZC(428, 5, this, arguments, new.target); }
function vrhBuzz(src, v, ms) {
try {
var a = src && src.gamepad && src.gamepad.hapticActuators && src.gamepad.hapticActuators[0];
if (a && a.pulse)
a.pulse(v, ms);
else if (a && a.playEffect)
a.playEffect("dual-rumble", { duration: ms, strongMagnitude: v, weakMagnitude: v });
}
catch (e) { }
}
function vrhHandWorld(i, out) {
var H = VRH.bare[i] && VRH.bare[i].g.visible ? VRH.bare[i] : VRH.ctl[i];
if (!H)
return null;
(H.hold || H.g).getWorldPosition(out);
return out;
}
function vrhReach(p) { return __ZC(428, 6, this, arguments, new.target); }
function vrhShowHeld(H, spec) { return __ZC(428, 7, this, arguments, new.target); }
function vrhGrab(i, src, spec) {
if (typeof pickUp !== "function" || !pickUp(spec))
return false;
VRH.held[i] = spec;
vrhBuzz(src, 0.6, 45);
return true;
}
function vrhLetGo(i, src) { return __ZC(428, 8, this, arguments, new.target); }
function vrhUse(i) { return __ZC(428, 9, this, arguments, new.target); }
function vrhTick(dt) { return __ZC(428, 10, this, arguments, new.target); }
function vrhClear() {
for (var i = 0; i < VRH.held.length; i++)
VRH.held[i] = null;
VRH.on.forEach(function (o) { if (o)
vrhShowHeld(o.H, null); });
VRH.on = [];
VRH.grip = [];
VRH.trig = [];
VRH.last = [];
VRH.vel = [];
VRH.near = [];
}
(function () {
if (typeof vrmXrInput !== "function")
return;
var inp = vrmXrInput;
vrmXrInput = function (dt) {
try {
vrhTick(dt);
}
catch (e) {
if (!VRH.said) {
VRH.said = 1;
console.warn("vr hands", e);
}
}
return inp.apply(this, arguments);
};
if (typeof vrmTap === "function") {
var tap = vrmTap;
vrmTap = function (code) { if (code === "KeyE" && VRH.noE) {
VRH.noE = false;
return;
} return tap.apply(this, arguments); };
}
if (typeof vrmXrEnded === "function") {
var end = vrmXrEnded;
vrmXrEnded = function () { try {
vrhClear();
}
catch (e) { } return end.apply(this, arguments); };
}
if (typeof togxVrPoll === "function") {
var pt = togxVrPoll;
togxVrPoll = function () {
var r = pt.apply(this, arguments);
if (VRH.busyRight && typeof VCX !== "undefined" && VCX.vrHeld) {
VCX.vrHeld = false;
if (typeof vcxGate === "function")
vcxGate();
}
return r;
};
}
})();
"use strict";
var VRW = { on: false, w: [null, null], at: 0, near: [false, false], tipW: new THREE.Vector3(), pW: new THREE.Vector3(), nW: new THREE.Vector3(), q: new THREE.Quaternion(),
shownMin: -1, shownMsg: -1 };
function vrwFace(kind) { return __ZC(428, 11, this, arguments, new.target); }
function vrwRoundRect(w, h, r) { return __ZC(428, 12, this, arguments, new.target); }
function vrwMake(kind) { return __ZC(428, 13, this, arguments, new.target); }
function vrwMsgs() {
var b = document.getElementById("ph-btn"), t = b ? b.textContent : "", m = /\d+/.exec(t || "");
return m ? +m[0] : 0;
}
function vrwPaint(W, force) { return __ZC(428, 14, this, arguments, new.target); }
function vrwPhoneOpen() { return typeof PH !== "undefined" && !!PH.open; }
function vrwPress(W) { return __ZC(428, 15, this, arguments, new.target); }
function vrwTip(i, out) { return __ZC(428, 16, this, arguments, new.target); }
function vrwPlace(W, i, side) { return __ZC(428, 17, this, arguments, new.target); }
function vrwTick() { return __ZC(428, 18, this, arguments, new.target); }
(function () {
if (typeof vrhTick !== "function")
return;
var t = vrhTick;
vrhTick = function () { var r = t.apply(this, arguments); try {
vrwTick();
}
catch (e) {
if (!VRW.said) {
VRW.said = 1;
console.warn("vr watches", e);
}
} return r; };
if (typeof vrpTagTick === "function") {
var tt = vrpTagTick;
vrpTagTick = function () { if (VRW.on) {
if (VRP.tag)
VRP.tag.mesh.visible = false;
return;
} return tt.apply(this, arguments); };
}
})();
