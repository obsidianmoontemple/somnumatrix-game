/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var meView = "eyes";
var meG = null, meLast = null, meBar = null, meClock = 0;
var cityView = false;
var VIEWS = ["eyes", "behind"];
var VIEW_LABEL = { eyes: "Your eyes", behind: "Behind you", mirror: "Mirror" };
var SPECIES = ["human", "elf", "dwarf", "fairy", "dragonborn", "gnome", "halfling", "orc", "goblin", "angel", "tiefling", "giant"];
var SPECIES_LABEL = ["Human", "Elf", "Dwarf", "Fairy", "Dragonborn", "Gnome", "Halfling", "Orc", "Goblin", "Angel", "Tiefling", "Giant"];
var SPECIES_FEATS = {
elf: { feats: ["ears", "thin"], s: 1.06 },
dwarf: { feats: ["beard", "wide"], s: .72 },
fairy: { feats: ["ears", "wings:fairy", "glow"], s: .55, hover: .22 },
dragonborn: { feats: ["horns", "tail:dragon", "scales", "wings:dragon"], s: 1.05 },
gnome: { feats: ["beard", "ears"], s: .48 },
halfling: { feats: ["ears"], s: .64 },
orc: { feats: ["wide", "tusks"], s: 1.08 },
goblin: { feats: ["ears", "hunched", "thin"], s: .66 },
angel: { feats: ["wings:feather:0xF2EEE6", "glow", "halo"], s: 1.08 },
tiefling: { feats: ["horns", "tail:devil"], s: 1.02 },
giant: { feats: ["wide", "beard"], s: 1.5 }
};
function meLook() {
var d = dreamer();
if (!d.look) {
d.look = blankLook("human");
d.look.src = {};
}
fillLook(d.look, (typeof myUserId === "function" && myUserId()) || d.seed || (d.seed = String(Math.random()).slice(2)));
return d.look;
}
function fillLook(L, seed) {
var R = randomLook(seed, "human");
["sex", "skin", "hair", "hairStyle", "top", "topKind", "bottom", "bottomKind", "shoes", "hat", "build"].forEach(function (k) {
if (L[k] === null || L[k] === undefined)
L[k] = R[k];
});
return L;
}
function meSpec() { return { id: "__me", archetype: "human", attrs: {}, look: meLook(), solid: true, detail: 4, nights: [store.session] }; }
function rebuildMe() {
if (meG && scene)
scene.remove(meG);
var spec = meSpec(), sp = meLook().species, o = sp && SPECIES_FEATS[sp];
meG = buildFigure(spec, 1);
if (o) {
dressFolk(meG, spec, 1, o);
if (o.hover)
meG.children[0].position.y += o.hover;
}
meG.userData.me = 1;
shadowsFor(meG, true);
if (typeof showCarried === "function")
setTimeout(showCarried, 0);
if (scene)
scene.add(meG);
meG.visible = false;
if (typeof publishMyLook === "function")
publishMyLook();
}
function onLookoutFloor() { return !!(INT && INT.locked && (INT.level || 0) > 0); }
function meButtons() {
if (meBar || typeof document === "undefined" || !document.body)
return;
meBar = document.createElement("div");
meBar.id = "me-bar";
meBar.style.cssText = "position:fixed;top:64px;left:12px;z-index:30;display:none;gap:6px;flex-direction:column";
meBar.innerHTML = '<button class="btn" id="me-view" title="Change view (V)">View: Your eyes</button>' +
'<button class="btn" id="me-dress" title="Your wardrobe (B)">Wardrobe</button>' +
'<button class="btn" id="me-cityview" title="Hold to look out over the city (L)" ' +
'style="display:none">Look down on the city</button>';
document.body.appendChild(meBar);
document.getElementById("me-view").onclick = cycleView;
document.getElementById("me-dress").onclick = openWardrobe;
var cvBtn = document.getElementById("me-cityview");
var press = function (e) { e.preventDefault && e.preventDefault(); if (onLookoutFloor())
cityView = true; };
var release = function () { cityView = false; };
cvBtn.onmousedown = press;
cvBtn.onmouseup = release;
cvBtn.onmouseleave = release;
cvBtn.ontouchstart = press;
cvBtn.ontouchend = release;
cvBtn.ontouchcancel = release;
addEventListener("keydown", function (e) {
if (!walkMode || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyV")
cycleView();
if (e.code === "KeyB")
openWardrobe();
if (e.code === "KeyL" && onLookoutFloor())
cityView = true;
});
addEventListener("keyup", function (e) { if (e.code === "KeyL")
cityView = false; });
}
function setView(v) {
meView = v;
var b = document.getElementById("me-view");
if (b)
b.textContent = "View: " + VIEW_LABEL[v];
}
function cycleView() { if (meView === "mirror")
closeWardrobe(); setView(VIEWS[(VIEWS.indexOf(meView) + 1) % VIEWS.length]); }
var meBefore = "eyes";
function openWardrobe() { return __ZC(72, 0, this, arguments, new.target); }
function closeWardrobe() { var w = document.getElementById("me-ward"); if (w)
w.style.display = "none"; if (meView === "mirror")
setView(meBefore || "eyes"); }
function renderWardrobe() { return __ZC(72, 1, this, arguments, new.target); }
function avatarTick(dt) {
meButtons();
if (meBar)
meBar.style.display = walkMode ? "flex" : "none";
var cvBtn = document.getElementById("me-cityview");
if (cvBtn)
cvBtn.style.display = (walkMode && onLookoutFloor()) ? "block" : "none";
if (!walkMode || !onLookoutFloor())
cityView = false;
if (!walkMode) {
if (meG)
meG.visible = false;
closeWardrobeIfOpen();
return;
}
if (!meG)
rebuildMe();
var P = camera.position, feet = P.y - 1.72;
meG.visible = meView !== "eyes";
meG.position.set(P.x, feet, P.z);
meG.rotation.y = yaw + Math.PI;
var moved = meLast ? Math.hypot(P.x - meLast.x, P.z - meLast.z) : 0;
meLast = { x: P.x, z: P.z };
var L = meG.userData.limbs, u = meG.userData;
if (L) {
var mv = moved > 0.01;
u.amp = (u.amp || 0) + ((mv ? 0.55 : 0) - (u.amp || 0)) * Math.min(dt * 6, 1);
u.phase = (u.phase || 0) + dt * (mv ? (moved / dt > 12 ? 11 : 7.2) : 0);
var s = Math.sin(u.phase) * u.amp;
L.ll.rotation.x = s;
L.rl.rotation.x = -s;
L.la.rotation.x = -s * .75;
L.ra.rotation.x = s * .75;
}
meFlyPose(meG, dt, feet, moved);
if (typeof rideArch !== "undefined" && rideArch === "broomstick" && L)
meBroomPose(meG, L, dt);
else if (u.broomed && L) {
u.broomed = false;
[L.ll, L.rl, L.la, L.ra].forEach(function (l) { l.rotation.z = 0; });
}
meClock += dt;
if (u.anim)
u.anim(meClock, dt);
}
function meFlyPose(g, dt, feet, moved) {
var u = g.userData, L = u.limbs, P = camera.position, air = false;
if (typeof canFly !== "undefined" && canFly && !(typeof rideArch !== "undefined" && rideArch) && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
try {
var sup = store.inside ? insideSupport(P, feet) : supportAt(P.x, P.z, feet);
if (!store.inside && typeof rideSeatNow === "function")
sup += rideSeatNow();
air = feet - sup > 0.6;
}
catch (e) { }
}
var dy = u.flyLastY === undefined ? 0 : feet - u.flyLastY;
u.flyLastY = feet;
u.fly = (u.fly || 0) + ((air ? 1 : 0) - (u.fly || 0)) * Math.min(dt * 4, 1);
if (u.fly < 0.01) {
if (u.fly !== 0 || g.rotation.x) {
u.fly = 0;
g.rotation.x = 0;
}
return;
}
var k = u.fly, sp = dt > 0 ? moved / dt : 0, vs = dt > 0 ? dy / dt : 0;
u.flySp = (u.flySp || 0) + (Math.min(sp, 14) - (u.flySp || 0)) * Math.min(dt * 3, 1);
var go = Math.min(1, u.flySp / 6);
var lean = (0.18 + go * 1.0 - Math.max(-0.35, Math.min(0.35, vs * 0.04)) * go) * k;
u.flyT = (u.flyT || 0) + dt;
var bob = Math.sin(u.flyT * 1.6) * 0.06 * k * (1 - go * 0.7);
g.rotation.order = "YXZ";
g.rotation.x = lean;
var fx = -Math.sin(yaw), fz = -Math.cos(yaw), sl = Math.sin(lean);
g.position.x -= fx * sl;
g.position.z -= fz * sl;
g.position.y += (1 - Math.cos(lean)) + bob;
if (L) {
var fl = Math.sin(u.flyT * 1.3) * 0.05 * (1 - go * 0.5), mix = function (a, b) { return a + (b - a) * k; };
L.ll.rotation.x = mix(L.ll.rotation.x, 0.12 + go * 0.12 + fl);
L.rl.rotation.x = mix(L.rl.rotation.x, 0.04 + go * 0.14 - fl);
L.ra.rotation.x = mix(L.ra.rotation.x, -0.35 - go * 2.45);
L.la.rotation.x = mix(L.la.rotation.x, 0.15 + go * 0.2 + Math.sin(u.flyT * 1.1) * 0.05);
}
}
function meBroomPose(g, L, dt) {
var u = g.userData;
u.flyT = (u.flyT || 0) + dt;
var sw = Math.sin(u.flyT * 1.2) * 0.04;
L.ll.rotation.x = -0.3 + sw;
L.rl.rotation.x = -0.3 - sw;
L.ll.rotation.z = -0.22;
L.rl.rotation.z = 0.22;
L.la.rotation.x = -0.85;
L.ra.rotation.x = -0.85;
L.la.rotation.z = 0.12;
L.ra.rotation.z = -0.12;
u.broomed = true;
}
function closeWardrobeIfOpen() { var w = document.getElementById("me-ward"); if (w && w.style.display !== "none")
closeWardrobe(); }
function renderView() {
if (walkMode && cityView && onLookoutFloor() && INT) {
var spec = INT.spec, P0 = camera.position, px0 = P0.x, py0 = P0.y, pz0 = P0.z;
var def = (typeof KIT !== "undefined") ? KIT[spec.archetype] : null;
var sc = (spec.attrs && spec.attrs.s) || 1;
var towerH = (def && def.size ? def.size[1] * sc : 210);
camera.position.set(spec.x, towerH + 60, spec.z + 80);
camera.lookAt(spec.x, towerH * 0.25, spec.z);
(typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera));
camera.position.set(px0, py0, pz0);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
return;
}
if (!walkMode || meView === "eyes" || !meG) {
(typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera));
return;
}
var P = camera.position, px = P.x, py = P.y, pz = P.z;
var fx = -Math.sin(yaw), fz = -Math.cos(yaw);
if (meView === "behind") {
var dist = 4.4;
while (dist > 1.2 && blockedAt(px - fx * dist, pz - fz * dist, py - 1.72))
dist -= 0.4;
if (typeof vwlView === "function")
dist = vwlView("behind", px, py, pz, -fx, 0.55 / 4.4, -fz, 4.4);
camera.position.set(px - fx * dist, py + dist * 0.125, pz - fz * dist);
camera.lookAt(px + fx * 2, py - 0.25 + Math.sin(pitch) * 2, pz + fz * 2);
}
else {
var fd = 2.6;
if (typeof vwlView === "function")
fd = vwlView("front", px, py, pz, fx, -0.35 / 2.6, fz, 2.6);
camera.position.set(px + fx * fd, py - fd * 0.135, pz + fz * fd);
camera.lookAt(px, py - 0.55, pz);
}
var vwlHide = typeof vwlHideMe === "function" && vwlHideMe();
if (vwlHide)
meG.visible = false;
(typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera));
if (vwlHide)
meG.visible = true;
camera.position.set(px, py, pz);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
}
