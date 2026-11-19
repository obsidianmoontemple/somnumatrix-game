/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(468, function () {
"use strict";
return [
function (force) {
if (!rmpSigned())
return Promise.resolve(null);
if (RMP.busy || (!force && RMP.st && Date.now() - RMP.stAt < 60000))
return Promise.resolve(RMP.st);
RMP.busy = true;
return rmpRpc("rumple_state", {}).then(function (o) { RMP.busy = false; RMP.missing = false; RMP.stAt = Date.now(); if (o && o.ok)
RMP.st = o; rmpGlimpseShow(); return RMP.st; })
.catch(function (e) { RMP.busy = false; RMP.stAt = Date.now(); if (typeof rpcMissing === "function" && rpcMissing(e))
RMP.missing = true; return RMP.st; });
},
function () {
if (RMP_TEX.wood)
return RMP_TEX.wood;
var c = document.createElement("canvas");
c.width = 256;
c.height = 64;
var x = c.getContext("2d");
x.fillStyle = "#9A6A3A";
x.fillRect(0, 0, 256, 64);
for (var i = 0; i < 46; i++) {
var y = Math.random() * 64, a = 0.08 + Math.random() * 0.16;
x.strokeStyle = "rgba(" + (60 + Math.random() * 30 | 0) + "," + (34 + Math.random() * 16 | 0) + ",16," + a + ")";
x.lineWidth = 0.6 + Math.random() * 1.6;
x.beginPath();
x.moveTo(0, y);
for (var u = 0; u <= 256; u += 16)
x.lineTo(u, y + Math.sin(u * 0.03 + i) * 2.2);
x.stroke();
}
for (var j = 0; j < 70; j++) {
x.fillStyle = "rgba(70,40,18," + (0.15 + Math.random() * 0.2) + ")";
x.fillRect(Math.random() * 256, Math.random() * 64, 2 + Math.random() * 5, 0.8);
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(3, 1);
if (THREE.SRGBColorSpace && "colorSpace" in t)
t.colorSpace = THREE.SRGBColorSpace;
return (RMP_TEX.wood = t);
},
function (col, o) {
o = o || {};
var k = col + JSON.stringify(o);
RMP_TEX.m = RMP_TEX.m || {};
if (RMP_TEX.m[k])
return RMP_TEX.m[k];
var m = rmpLite() ? new THREE.MeshLambertMaterial({ color: col, map: o.wood ? rmpWoodTex() : null })
: new THREE.MeshPhongMaterial({ color: col, map: o.wood ? rmpWoodTex() : null, shininess: o.shine || 10, specular: o.spec || 0x221A10 });
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.5;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
m.userData.ldShared = 1;
return (RMP_TEX.m[k] = m);
},
function () {
var lite = rmpLite(), seg = lite ? 8 : 14;
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var wood = rmpMat(0xD8B088, { wood: 1, shine: 14 }), dark = rmpMat(0x6A4424, { wood: 1 }), gold = rmpMat(0xD8A838, { shine: 60, spec: 0x8A6A20, e: 0x3A2A08, ei: 0.4 }), straw = rmpMat(0xF0C850, { e: 0x8A6010, ei: 0.55 }), iron = rmpMat(0x3A3634, { shine: 30 }), skin = rmpMat(0xC89A70, { wood: 1 }), cap = rmpMat(0x8A2A1A, { wood: 1 });
var pts = [], L = 3.6;
for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(0.07 + 0.05 * Math.sin(t * Math.PI) * (1 - t * 0.3) + (t > 0.92 ? 0.03 : 0), t * L));
}
var hg = new THREE.LatheGeometry(pts, seg);
hg.rotateX(Math.PI / 2);
hg.translate(0, 0, -2.55);
var handle = rmpMesh(body, hg, wood, 0, 0.62, 0);
var groove = [];
for (var s = 0; s <= 60; s++) {
var u = s / 60, z = -2.4 + u * 2.9, a = u * Math.PI * 14;
groove.push(new THREE.Vector3(Math.cos(a) * 0.112, 0.62 + Math.sin(a) * 0.112, z));
}
rmpMesh(body, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(groove), lite ? 60 : 140, 0.012, 4, false), dark);
[-2.2, -0.9, 0.35].forEach(function (z) { var b = rmpMesh(body, new THREE.TorusGeometry(0.125, 0.022, 6, seg + 4), gold, 0, 0.62, z); });
rmpMesh(body, new THREE.CylinderGeometry(0.15, 0.15, 0.75, seg, 1, true), rmpMat(0x4A2A16, { shine: 20, ds: true }), 0, 0.62, -0.6).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (sd) {
var cord = rmpMesh(body, new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4), dark, sd * 0.15, 0.38, -0.45);
cord.rotation.z = sd * 0.12;
rmpMesh(body, new THREE.TorusGeometry(0.06, 0.012, 4, 10), iron, sd * 0.18, 0.13, -0.45).rotation.y = Math.PI / 2;
});
var bowl = new THREE.Group();
bowl.position.set(0, 0.66, 1.55);
body.add(bowl);
var bg = new THREE.SphereGeometry(0.78, seg + 6, lite ? 7 : 12, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55);
bg.scale(1, 0.6, 1.35);
rmpMesh(bowl, bg, rmpMat(0xE0B890, { ds: true, shine: 22 }), 0, 0.3, 0);
rmpMesh(bowl, new THREE.TorusGeometry(0.6, 0.035, 6, seg + 8), dark, 0, 0.24, 0).scale.set(1, 1.36, 1);
bowl.children[1].rotation.x = Math.PI / 2;
var heap = new THREE.SphereGeometry(0.56, seg, 7, 0, Math.PI * 2, 0, Math.PI * 0.5);
heap.scale(1, 0.55, 1.3);
rmpMesh(bowl, heap, straw, 0, 0.2, 0);
var stalks = [], ns = lite ? 16 : 48;
for (var k = 0; k < ns; k++) {
var st = rmpMesh(bowl, new THREE.CylinderGeometry(0.009, 0.009, 0.45 + Math.random() * 0.35, 3), straw, (Math.random() - 0.5) * 0.75, 0.42, (Math.random() - 0.5) * 1.1);
st.rotation.set((Math.random() - 0.5) * 1.4, Math.random() * 3, (Math.random() - 0.5) * 1.4);
stalks.push(st);
}
var wheelPost = new THREE.Group();
wheelPost.position.set(0, 0.82, 0.62);
body.add(wheelPost);
rmpMesh(wheelPost, new THREE.BoxGeometry(0.05, 0.36, 0.05), dark, 0, 0.14, -0.05);
var wheel = new THREE.Group();
wheel.position.set(0, 0.34, -0.05);
wheelPost.add(wheel);
rmpMesh(wheel, new THREE.TorusGeometry(0.24, 0.018, 6, lite ? 18 : 28), dark).rotation.y = Math.PI / 2;
for (var sp = 0; sp < 8; sp++) {
var spk = rmpMesh(wheel, new THREE.CylinderGeometry(0.008, 0.008, 0.46, 4), wood);
spk.rotation.x = sp / 8 * Math.PI;
}
rmpMesh(wheel, new THREE.CylinderGeometry(0.035, 0.035, 0.08, 8), gold).rotation.z = Math.PI / 2;
var bob = rmpMesh(wheelPost, new THREE.CylinderGeometry(0.035, 0.035, 0.12, 8), gold, 0, 0.08, 0.18);
bob.rotation.x = Math.PI / 2;
var tn = lite ? 10 : 18, thrPts = [];
for (var q = 0; q <= tn; q++)
thrPts.push(new THREE.Vector3(0, 0, 0));
var thrGeo = new THREE.BufferGeometry().setFromPoints(thrPts), thread = new THREE.Line(thrGeo, new THREE.LineBasicMaterial({ color: 0xFFD860, transparent: true, opacity: 0.85 }));
thread.frustumCulled = false;
body.add(thread);
var head = new THREE.Group();
head.position.set(0, 0.68, -2.66);
head.scale.setScalar(1.45);
body.add(head);
var hs = new THREE.SphereGeometry(0.15, seg, lite ? 6 : 10);
hs.scale(0.95, 1.05, 1);
rmpMesh(head, hs, skin, 0, 0, 0);
var nose = rmpMesh(head, new THREE.ConeGeometry(0.04, 0.16, 6), skin, 0, 0.0, -0.17);
nose.rotation.x = -Math.PI / 2 - 0.25;
var chin = rmpMesh(head, new THREE.ConeGeometry(0.06, 0.14, 6), skin, 0, -0.15, -0.08);
chin.rotation.x = Math.PI + 0.5;
[-1, 1].forEach(function (sd) {
rmpMesh(head, new THREE.SphereGeometry(0.022, 6, 6), rmpMat(0x1A1008, { e: 0xFFB030, ei: 0.35 }), sd * 0.055, 0.05, -0.13);
var ear = rmpMesh(head, new THREE.ConeGeometry(0.035, 0.12, 5), skin, sd * 0.15, 0.04, 0);
ear.rotation.z = -sd * 1.2;
});
var grin = rmpMesh(head, new THREE.TorusGeometry(0.06, 0.01, 4, 10, Math.PI), rmpMat(0x2A1408), 0, -0.04, -0.135);
grin.rotation.z = Math.PI;
var beard = rmpMesh(head, new THREE.ConeGeometry(0.07, 0.2, 7), rmpMat(0xA8A098, { wood: 1 }), 0, -0.2, -0.04);
beard.rotation.x = Math.PI + 0.3;
var hat = rmpMesh(head, new THREE.ConeGeometry(0.15, 0.42, seg), cap, 0, 0.27, 0.02);
hat.rotation.x = 0.35;
rmpMesh(head, new THREE.TorusGeometry(0.135, 0.022, 5, seg), cap, 0, 0.11, 0).rotation.x = Math.PI / 2;
rmpMesh(head, new THREE.SphereGeometry(0.03, 6, 6), gold, 0, 0.46, 0.1);
for (var tz = 0; tz < (lite ? 8 : 16); tz++) {
var a2 = tz / (lite ? 8 : 16) * Math.PI * 2, ts = rmpMesh(body, new THREE.CylinderGeometry(0.007, 0.007, 0.3, 3), straw, Math.cos(a2) * 0.12, 0.66 + Math.sin(a2) * 0.12, -2.36);
ts.rotation.x = Math.PI / 2 + 0.5 * Math.sin(a2);
ts.rotation.z = 0.5 * Math.cos(a2);
}
[-1, 1].forEach(function (sd) {
rmpMesh(body, new THREE.CylinderGeometry(0.005, 0.005, 0.22, 3), dark, sd * 0.09, 0.47, -2.3);
var bell = rmpMesh(body, new THREE.SphereGeometry(0.045, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6), gold, sd * 0.09, 0.33, -2.3);
bell.rotation.x = Math.PI;
});
if (!lite) {
var gl = new THREE.PointLight(0xFFC060, 0.55, 5, 2);
gl.position.set(0, 1.1, 1.55);
body.add(gl);
}
var T0 = Math.random() * 10;
g.userData.rmp = { body: body, wheel: wheel, head: head, stalks: stalks, thread: thread, thrPts: thrPts, bowl: bowl };
g.userData.anim = function (t, dt) {
t += T0;
var spin = (RMP.spinUntil > Date.now()) ? 14 : 3.2;
body.position.y = Math.sin(t * 1.7) * 0.07 + Math.sin(t * 0.6) * 0.04;
body.rotation.z = Math.sin(t * 1.1) * 0.06;
body.rotation.x = Math.sin(t * 0.9) * 0.03;
wheel.rotation.x -= (dt || 0.016) * spin;
head.rotation.y = Math.sin(t * 0.8) * 0.35;
head.rotation.z = Math.sin(t * 2.3) * 0.05;
for (var i = 0; i < stalks.length; i += 2)
stalks[i].rotation.z += Math.sin(t * 3 + i) * 0.004;
var p = thread.geometry.attributes.position;
for (var j = 0; j <= tn; j++) {
var u = j / tn;
p.setXYZ(j, Math.sin(t * 2.4 - u * 5) * 0.18 * u, 0.9 + u * 0.25 + Math.sin(t * 1.9 - u * 4) * 0.1 * u, 0.8 - u * 3.9);
}
p.needsUpdate = true;
};
return g;
},
function () {
if (!rmpMine() && !rmpKeeper()) {
rmpSay("The spoon is not yours. There is only one, and it is hidden behind a fire in Poe's Dream-Land.");
return;
}
if (store.inside) {
rmpSay("🥄 It will not come indoors. Step outside first, then ride.");
return;
}
if (typeof DRIVE !== "undefined" && DRIVE.on) {
rmpSay("Get out of what you are driving first.");
return;
}
if (typeof riding !== "undefined" && riding && !rmpOn() && typeof ride === "function")
try {
ride(null);
}
catch (e) { }
riding = RMP_NAME;
rideSpeed = RMP.speed;
rideArch = RMP_ARCH;
if (typeof canFly !== "undefined")
canFly = true;
if (typeof rideG !== "undefined" && rideG) {
scene.remove(rideG);
rideG = null;
}
try {
var L = meLook();
L.ride = RMP_ARCH;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
rmpSay("🥄 <b>Up on the spoon.</b> It rises and flies (Space to climb, C to come down). " + RMP.power.icon + " <b>J</b> or its button to stamp; 🧶 the wheel spins straw into gold once a day.");
},
function () {
if (!rmpOn() || store.inside)
return;
var now = performance.now() / 1000, Pw = RMP.power;
if (RMP.cool > now) {
rmpSay(Pw.icon + " <b>" + Pw.name + "</b>: the little man is getting his breath back. " + Math.ceil(RMP.cool - now) + " s.");
return;
}
RMP.cool = now + Pw.cool;
var P = camera.position, hit = 0, foes = [];
try {
foes = typeof spbFoes === "function" ? spbFoes(Pw.r + 4) : [];
}
catch (e) {
foes = [];
}
foes.forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z;
if (Math.hypot(dx, dz) > Pw.r)
return;
var pvp = /^pvp/.test(o.kind || "");
try {
o.hit(pvp ? Pw.pvp : Pw.npc);
if (!pvp && o.hold)
o.hold(Pw.hold);
if (o.push)
o.push(dx, dz, 2.5);
hit++;
}
catch (e) { }
});
rmpRing(P);
if (typeof bdlTone === "function")
try {
bdlTone(120, 0.45);
setTimeout(function () { bdlTone(90, 0.35); }, 160);
}
catch (e) { }
rmpSay(Pw.icon + " <b>" + Pw.name + "!</b> <i>“He stamped so hard with his right foot that it went into the ground.”</i> " + (hit ? "<b>" + hit + "</b> struck." : "Nothing was in reach."));
},
function (P) {
var gy = P.y - 1.72 - RMP.seat - 0.6;
try {
if (typeof supportAt === "function") {
var s = supportAt(P.x, P.z, P.y - 1.72);
if (isFinite(s) && s > P.y - 40)
gy = s;
}
}
catch (e) { }
var m1 = new THREE.MeshBasicMaterial({ color: 0x5A3A1A, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide }), m2 = new THREE.MeshBasicMaterial({ color: 0xFFD060, transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide });
var g = new THREE.Group();
g.position.set(P.x, gy + 0.06, P.z);
var r1 = new THREE.Mesh(new THREE.RingGeometry(0.6, 1.1, 48), m1);
r1.rotation.x = -Math.PI / 2;
g.add(r1);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2 + Math.random() * 0.2, cr = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 1), m1);
cr.rotation.x = -Math.PI / 2;
cr.rotation.z = -a;
cr.position.set(Math.cos(a) * 0.9, 0.01, Math.sin(a) * 0.9);
g.add(cr);
}
var r2 = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.5, 40), m2);
r2.rotation.x = -Math.PI / 2;
r2.position.y = 0.02;
g.add(r2);
scene.add(g);
RMP.fx.push({ g: g, m: [m1, m2], t: 0, r: RMP.power.r });
},
function () {
if (!rmpOn())
return;
if (RMP.spinUntil > Date.now())
return;
RMP.spinUntil = Date.now() + 3500;
rmpRpc("rumple_spin", {}).then(function (o) {
var say = (o && o.say) || "The wheel spins.";
if (o && o.gold > 0) {
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
rmpSay("🧶 <b>Straw into gold.</b> The little wheel whirrs and the straw runs off it as gold: <b>" + o.gold + " gold</b> is yours.");
}
else
rmpSay("🧶 " + rmpEsc(say));
if (RMP.st && o && o.ok)
RMP.st.spin_ready = false;
}).catch(function (e) { rmpSay(typeof rpcMissing === "function" && rpcMissing(e) ? "🧶 The wheel spins, but its gold waits for the Keeper's next update." : "🧶 The wheel spins, but nothing comes of it just now."); });
},
function (dt) {
dt = Math.min(0.1, dt || 0.016);
for (var i = RMP.fx.length - 1; i >= 0; i--) {
var f = RMP.fx[i];
f.t += dt;
var k = f.t / 1.1;
f.g.scale.setScalar(1 + k * f.r);
f.m[0].opacity = 0.5 * (1 - k);
f.m[1].opacity = 0.4 * (1 - k);
if (k >= 1) {
scene.remove(f.g);
f.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
f.m.forEach(function (m) { m.dispose(); });
RMP.fx.splice(i, 1);
}
}
var P = camera.position, on = rmpOn() && walkMode && !store.inside, max = rmpLite() ? 10 : 26;
if (on) {
RMP.trailT -= dt;
var mv = RMP.last ? Math.hypot(P.x - RMP.last.x, P.z - RMP.last.z, P.y - RMP.last.y) / dt : 0;
if (RMP.trailT <= 0 && mv > 1.2 && RMP.trail.length < max) {
RMP.trailT = rmpLite() ? 0.22 : 0.09;
if (!RMP.strawMat)
RMP.strawMat = new THREE.MeshBasicMaterial({ color: 0xFFCC50, transparent: true, opacity: 0.9, depthWrite: false });
var w = new THREE.Mesh(RMP.strawGeo || (RMP.strawGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 3)), RMP.strawMat.clone());
var fx = -Math.sin(yaw), fz = -Math.cos(yaw);
w.position.set(P.x - fx * 0.6 + (Math.random() - 0.5) * 0.5, P.y - 1.72 - RMP.seat + 0.8, P.z - fz * 0.6 + (Math.random() - 0.5) * 0.5);
w.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
scene.add(w);
RMP.trail.push({ m: w, t: 0, vx: (Math.random() - 0.5) * 0.4, vz: (Math.random() - 0.5) * 0.4, sp: (Math.random() - 0.5) * 2 });
}
RMP.last = { x: P.x, y: P.y, z: P.z };
}
else
RMP.last = null;
for (var j = RMP.trail.length - 1; j >= 0; j--) {
var s = RMP.trail[j];
s.t += dt;
s.m.position.y -= dt * 0.35;
s.m.position.x += s.vx * dt;
s.m.position.z += s.vz * dt;
s.m.rotation.z += s.sp * dt;
s.m.material.opacity = 0.9 * Math.max(0, 1 - s.t / 2.4);
if (s.t >= 2.4) {
scene.remove(s.m);
s.m.material.dispose();
RMP.trail.splice(j, 1);
}
}
},
function () {
var show = rmpOn() && !store.inside && (typeof walkMode === "undefined" || walkMode);
if (!RMP.btn && show) {
var box = document.createElement("div");
box.id = "rmp-power";
box.style.cssText = "position:fixed;right:10px;top:164px;z-index:30;display:flex;flex-direction:column;gap:6px;align-items:flex-end";
var css = "padding:8px 12px;border-radius:12px;border:1px solid #D8A838;background:rgba(30,20,10,.88);color:#FFE7A8;font:600 14px system-ui,sans-serif;cursor:pointer";
var a = document.createElement("button");
a.type = "button";
a.style.cssText = css;
a.textContent = RMP.power.icon + " " + RMP.power.name + " (J)";
a.addEventListener("click", function () { rmpStamp(); });
var b = document.createElement("button");
b.type = "button";
b.style.cssText = css;
b.textContent = "🧶 Straw into gold";
b.addEventListener("click", function () { rmpSpin(); });
box.appendChild(a);
box.appendChild(b);
document.body.appendChild(box);
RMP.btn = box;
}
if (RMP.btn)
RMP.btn.style.display = show ? "flex" : "none";
},
function (R, g) {
var fx = -R.w / 2 + 0.3, fz = 0.5;
var G = new THREE.Group();
G.position.set(fx + 0.31, 0, fz);
G.name = "rmp-glimpse";
var s = rmpBuild();
s.userData.anim = null;
s.scale.setScalar(0.27);
s.traverse(function (m) { if (m.isLight || m.isLine)
m.visible = false; });
s.rotation.order = "YXZ";
s.rotation.set(-0.62, -0.35, 0);
s.position.set(0, 0.4, 0.02);
G.add(s);
var sm = rmpMat(0xF0C850, { e: 0x8A6010, ei: 0.6 });
for (var i = 0; i < 7; i++) {
var st = rmpMesh(G, new THREE.CylinderGeometry(0.006, 0.006, 0.22, 3), sm, 0.05 + Math.random() * 0.3, 0.03, -0.45 + Math.random() * 0.9);
st.rotation.set(Math.PI / 2, Math.random() * 3, 0);
}
g.add(G);
RMP.glimpse = G;
rmpGlimpseShow();
var S = poeSpot(R.x + fx + 0.75, fz, 0.95, "Behind the fire", "reach in behind the dying embers", function () { rmpReach(); }, 0);
S.hide = function () { return !!(RMP.st && RMP.st.found && !rmpKeeper()); };
if (rmpSigned())
rmpLoad(true);
},
function () {
var top = "<p><i>“A maid of the queen's went out by night into the forest, and there she saw him riding round a great fire on a cooking spoon … and at the last the little man flew out of the window on the cooking spoon.”</i></p>" +
"<p style='font-size:12px;opacity:.75'>The Grimms' notes to Rumpelstiltskin, first edition, 1812</p>";
function card(html, btns) { if (typeof poeCard === "function")
poeCard("Behind the fire", top + html, btns); }
if (!rmpSigned()) {
card("<p>Something long and carved leans in the back of the hearth, behind the embers. It will not come loose for someone who has not signed in.</p>");
return;
}
rmpLoad(true).then(function (st) {
if (RMP.missing && !rmpKeeper()) {
card("<p>Something long and carved leans in the back of the hearth. It is stuck fast in the soot: it will come loose after the Keeper's next update.</p>");
return;
}
if (rmpKeeper()) {
card("<p>The spoon of the little man himself, where he left it when he flew down Poe's chimney. " + (st && st.found ? "<b>" + rmpEsc(st.owner_name || "A dreamer") + "</b> found it first and keeps it." : "Nobody has found it yet.") + " The Keeper leaves it for a dreamer to find, but may take it for a ride.</p>", [["🥄 Ride it (the Keeper)", "It stays where it is for a dreamer", function () { RMP.keeperRide = true; rmpSay("🥄 Step outside into the Dream-Land and choose <b>Ride Rumpelstiltskin's spoon</b> in the Menu."); }],
["Leave it", ""]]);
return;
}
if (st && st.mine) {
card("<p>Only ashes now: the spoon is yours already. Ride it from your Backpack, or the Menu, anywhere out of doors.</p>");
return;
}
if (st && st.found) {
card("<p>Only ashes, and a long scrape in the soot where something was drawn out. Someone reached in before you. There is only one, and it is theirs.</p>");
return;
}
card("<p>You reach in past the embers. They do not burn. Your hand closes on a carved handle, warm as a loaf, and out it comes: a cooking spoon longer than you are tall, its bowl heaped with straw that glows like gold, a little spinning wheel lashed to its neck, and on the end of the handle a grinning carved face in a pointed cap.</p>" +
"<p>There is only one in all the worlds.</p>", [["🥄 Take it", "It is yours for good, and can never be sold or traded", function () { rmpClaim(); }], ["Leave it in the fire", "Someone else may find it"]]);
});
},
function () {
rmpRpc("rumple_claim", {}).then(function (o) {
if (o && o.ok) {
RMP.st = RMP.st || {};
RMP.st.found = true;
RMP.st.mine = true;
RMP.stAt = Date.now();
rmpGlimpseShow();
if (typeof poeCard === "function")
poeCard("Rumpelstiltskin's spoon", "<p><b>It is yours, and there is no other.</b></p><p>Ride it anywhere out of doors: from your Backpack, or the Menu. It flies, faster than anything that can be bought.</p><p>" + RMP.power.icon + " <b>" + RMP.power.name + "</b> (J or its button) strikes every foe within 11 m. 🧶 <b>Straw into gold</b>: once a day its wheel spins you 40 gold.</p>", [["Wonderful", ""]]);
if (typeof bkpLoad === "function" && typeof BKP !== "undefined" && BKP.open)
try {
bkpLoad();
}
catch (e) { }
}
else
rmpSay("🥄 " + rmpEsc((o && o.say) || "It will not come loose."));
}).catch(function (e) { rmpSay(typeof rpcMissing === "function" && rpcMissing(e) ? "🥄 It is stuck fast in the soot: it will come loose after the Keeper's next update." : "🥄 It will not come loose just now. Try again."); });
},
function () {
var st = RMP.st;
if (!st)
return "";
var b = function (fn, t) { return '<button class="btn" onclick="' + fn + '">' + t + '</button>'; };
var row = function (inner, btns) { return '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;flex-wrap:wrap"><span style="flex:1 1 180px">' + inner + '</span>' + (btns || "") + '</div>'; };
if (st.mine)
return '<div style="margin-top:8px"><b>🥄 Rumpelstiltskin\'s spoon</b> <span style="opacity:.7">one of a kind, never sold</span></div>' +
row("It flies, 4.2 times a walk" + (st.spin_ready ? " · 🧶 the wheel is ready to spin" : ""), (rmpOn() ? b("rmpOff()", "Get off") : b("rmpRide()", "Ride")) + b("rmpAbout()", "About"));
if (st.keeper)
return '<div style="margin-top:8px"><b>🥄 Rumpelstiltskin\'s spoon</b> <span style="opacity:.7">the Keeper: ' + (st.found ? rmpEsc(st.owner_name || "a dreamer") + " has it" : "still hidden behind the fire in the Raven's chamber") + '</span></div>' +
row("One in the whole game", (rmpOn() ? b("rmpOff()", "Get off") : b("RMP.keeperRide=true;rmpRide()", "Ride it")) + (st.found ? b("rmpKeeperHide()", "Send it back behind the fire") : "") + b("rmpAbout()", "About"));
return "";
},
function () {
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
var html = "<p>A great carved beechwood cooking spoon, longer than a man, its bowl heaped with straw that glows like gold. A little spinning wheel turns at its neck and streams a gold thread behind; the knob of its handle is the little man's own grinning face. In the Grimms' first edition (1812) he rides it round a great fire in the forest, and at the last flies out of the window on it.</p>" +
"<p><b>Pace</b> 4.2 times a walk, and it flies.<br><b>" + RMP.power.icon + " " + RMP.power.name + "</b>: every foe within 11 m is struck, held and thrown back (every 12 s).<br><b>🧶 Straw into gold</b>: once a day, 40 gold.</p>" +
"<p style='opacity:.75'>There is only one. It can never be sold, traded or given.</p>";
if (typeof worldCard === "function" && typeof worldBtn === "function")
worldCard("<h3 style='margin:4px 0;font-family:Georgia,serif'>🥄 Rumpelstiltskin's spoon</h3><div style='font-family:Georgia,serif;line-height:1.5'>" + html + "</div>" + worldBtn("x", "Close", ""), { x: function () { worldCard(null); } });
},
function () {
if (!rmpKeeper())
return;
rmpRpc("rumple_keeper", { p_act: "hide" }).then(function (o) { rmpSay("🥄 " + rmpEsc((o && o.say) || "Done.")); return rmpLoad(true); }).then(function () { if (typeof bkpPaint === "function")
try {
bkpPaint();
}
catch (e) { } })
.catch(function (e) { rmpSay("🥄 " + rmpEsc((e && e.message) || String(e))); });
}
];
});
