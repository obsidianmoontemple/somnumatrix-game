/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(211, function () {
return [
function () {
var el = document.getElementById("vrm-box");
if (!VRM.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "vrm-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));max-height:min(82vh,680px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #6A7A9A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-vr]") : null;
if (!t)
return;
var a = t.getAttribute("data-vr");
if (a === "close") {
VRM.open = false;
vrmPaint();
}
else if (a === "xr") {
VRM.open = false;
vrmPaint();
vrmXrStart();
}
else if (a === "card") {
VRM.open = false;
vrmPaint();
vrmCardStart();
}
});
document.body.appendChild(el);
}
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🥽 VR mode</b><button class="btn" data-vr="close">Close</button></div>';
h += '<div style="border:1px solid #39435A;border-radius:6px;padding:9px 10px;margin-bottom:9px">' +
'<b>With a headset</b><div style="margin:4px 0 7px;color:#B9B2A2">Meta Quest, Pico, Apple Vision Pro or a PC with SteamVR. Open SomnuMatrix in the headset\'s own browser, then press this.</div>';
if (VRM.xrOk)
h += '<button class="btn" data-vr="xr" style="font-weight:600">🥽 Step in with the headset</button>';
else
h += '<div style="color:#E8C67A">No headset found on this device. In a headset\'s browser this button wakes up.</div>';
var last = "";
try {
last = localStorage.getItem("somnu.vrlog") || "";
}
catch (e) { }
if (navigator.xr)
h += '<div style="margin-top:7px;color:#9AA3B5;font-size:12px">Headset check: ' + (VRM.xrOk ? "ready" : "not ready") + (last ? '<br>Last try: ' + String(last).replace(/[<>&]/g, "") + '</div>' : '</div>');
h += '<div style="margin-top:7px;color:#9AA3B5;font-size:12px">Left stick walks (push it right in to run). Right stick turns you, and up or down rises and falls where you can fly. Trigger: use what is in front of you, like E. A or X: wave. B or Y: back out.</div></div>';
if (!vrmHeadset())
h += '<div style="border:1px solid #39435A;border-radius:6px;padding:9px 10px;margin-bottom:9px">' +
'<b>With your phone in a viewer</b><div style="margin:4px 0 7px;color:#B9B2A2">Any cardboard-style viewer. Turn your phone sideways and slip it in.</div>' +
'<button class="btn" data-vr="card" style="font-weight:600">📱 Start the viewer</button>' +
'<div style="margin-top:7px;color:#9AA3B5;font-size:12px">Turn your head to look around. Hold a finger on the screen to walk where you look; a quick tap uses what is in front of you. The ✕ at the top takes you back.</div></div>';
h += '<div style="color:#9AA3B5;font-size:12px">Nothing in VR flashes, and turning is always smooth. If you feel unwell, take the headset off and rest.</div>';
el.innerHTML = h;
el.style.display = "block";
},
function () {
var lines = [], seen = {};
var kids = document.body ? document.body.children : [];
for (var i = 0; i < kids.length; i++) {
var el = kids[i];
if (!el.id || el.id === "status" || /^(vrm-|tog-box|tn-)/.test(el.id))
continue;
if (!el.getClientRects().length)
continue;
var cs = getComputedStyle(el);
if (cs.visibility === "hidden" || cs.display === "none" || cs.position !== "fixed" && cs.position !== "absolute" || +cs.opacity === 0)
continue;
var t = (el.innerText || "").replace(/\s+/g, " ").trim();
if (!t || t.length > 160 || !/\bpress\b/i.test(t) || seen[t])
continue;
seen[t] = 1;
lines.push(t);
if (lines.length >= 2)
break;
}
var st = document.getElementById("status");
var s = st ? (st.textContent || "").replace(/\s+/g, " ").trim() : "", now = performance.now();
if (s !== VRM.stText) {
VRM.stText = s;
VRM.stAt = now;
}
if (s && !seen[s] && now - VRM.stAt < 9000)
lines.push(s.length > 170 ? s.slice(0, 167) + "…" : s);
return lines.join("\n");
},
function () {
VRM.log = [];
VRM.logT0 = performance.now();
VRM.fN = 0;
VRM.fMs = 0;
vrmLog("asked" + (/Quest 2/.test(navigator.userAgent || "") ? " (Quest 2)" : ""));
if (!navigator.xr || !renderer || !renderer.xr) {
vrmLog("no headset support");
setStatus("This browser cannot open a headset view.");
return;
}
if (VRM.xr)
return;
var opened = null;
navigator.xr.requestSession("immersive-vr", { optionalFeatures: ["local-floor", "hand-tracking"] }).then(function (session) {
opened = session;
vrmLog("headset opened");
if (!walkMode && typeof setWalk === "function")
try {
setWalk(true);
}
catch (e) {
vrmLog("walk: " + e.message);
}
VRM.xr = session;
VRM.turn = yaw;
VRM.setYaw = null;
if (!document.getElementById("vrm-still")) {
var st = document.createElement("style");
st.id = "vrm-still";
st.textContent = "html.vrm-on *,html.vrm-on *::before,html.vrm-on *::after{transition:none!important}";
document.head.appendChild(st);
}
document.documentElement.classList.add("vrm-on");
if (!VRM.dolly) {
VRM.dolly = new THREE.Group();
VRM.dolly.name = "vrm-dolly";
VRM.cam = new THREE.PerspectiveCamera(70, 1, camera.near, camera.far);
VRM.dolly.add(VRM.cam);
for (var i = 0; i < 2; i++) {
var c = renderer.xr.getController(i);
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 8), new THREE.MeshBasicMaterial({ color: 0xBFD6FF, transparent: true, opacity: 0.85 }));
var ray = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1.6)]), new THREE.LineBasicMaterial({ color: 0xBFD6FF, transparent: true, opacity: 0.35 }));
c.add(ball);
c.add(ray);
VRM.dolly.add(c);
VRM.hands.push(c);
}
VRM.handsXr = [];
for (var hi = 0; hi < 2; hi++) {
try {
var hd = renderer.xr.getHand(hi);
VRM.dolly.add(hd);
VRM.handsXr.push(hd);
}
catch (e) { }
}
vrmHudMake();
VRM.dolly.add(VRM.hud);
}
VRM.cam.near = camera.near;
VRM.cam.far = camera.far;
scene.add(VRM.dolly);
VRM.fov0 = camera.fov;
camera.fov = Math.max(camera.fov, 105);
camera.updateProjectionMatrix();
VRM.view0 = typeof meView !== "undefined" ? meView : null;
if (VRM.view0 && VRM.view0 !== "eyes")
meView = "eyes";
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local");
try {
var ua = navigator.userAgent || "";
renderer.xr.setFramebufferScaleFactor(/Quest 3|Quest Pro|Vision/.test(ua) ? 1 : /OculusBrowser|Quest|Pico|Wolvic/.test(ua) ? 0.8 : 1);
}
catch (e) { }
session.addEventListener("end", vrmXrEnded);
vrmLog("joining the picture");
return renderer.xr.setSession(session).then(function () {
vrmLog("picture joined");
renderer.xr.enabled = true;
try {
var bl = session.renderState && session.renderState.baseLayer;
if (bl && "fixedFoveation" in bl)
bl.fixedFoveation = 1;
}
catch (e) { }
renderer.setAnimationLoop(vrmXrFrame);
setStatus("🥽 You are in VR. Take the headset off or press the headset's menu button to leave.");
});
}).catch(function (e) {
vrmLog("stopped: " + (e && (e.name || "") + " " + (e.message || e) || "unknown").slice(0, 140));
var S = opened || VRM.xr;
VRM.xr = null;
renderer.xr.enabled = false;
if (S)
try {
S.end();
}
catch (e2) { }
setStatus("The headset did not open" + (e && e.message ? ": " + String(e.message).slice(0, 120) : "") + ".");
});
},
function () {
vrpLetGo();
document.documentElement.classList.remove("vrm-on");
vrmLog("closed after " + (VRM.fN || 0) + " pictures" + (VRM.fN ? ", about " + Math.round(VRM.fMs / VRM.fN) + " ms each" : ""));
vrmLetGo();
renderer.setAnimationLoop(null);
renderer.xr.enabled = false;
VRM.xr = null;
if (VRM.dolly && VRM.dolly.parent)
VRM.dolly.parent.remove(VRM.dolly);
if (VRM.fov0) {
camera.fov = VRM.fov0;
camera.updateProjectionMatrix();
VRM.fov0 = null;
}
if (VRM.view0 && typeof meView !== "undefined")
meView = VRM.view0;
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
try {
renderer.setSize(innerWidth, innerHeight);
}
catch (e) { }
setTimeout(function () { if (performance.now() - VRM.lastRun > 250)
requestAnimationFrame(animate); }, 300);
setStatus("Back from VR.");
},
function () {
var dt = Math.min(Math.max((performance.now() - (VRM.tPrev || performance.now())) / 1000, 0), 0.1);
VRM.tPrev = performance.now();
vrmKeepGameTurn();
vrmXrInput(dt);
vrmTidyHeading();
VRM_E.setFromQuaternion(VRM.cam.quaternion, "YXZ");
yaw = VRM.turn + VRM_E.y;
pitch = Math.max(-1.35, Math.min(1.35, VRM_E.x));
VRM.setYaw = yaw;
if (VRM.slow && !VRM.rest) {
VRM.rest = true;
try {
vrmXrRender();
}
catch (e) { }
vrmBoardsTick();
return;
}
VRM.rest = false;
VRM.inLoop = true;
var t0 = performance.now();
try {
VRM.draw();
}
catch (e) {
if (!VRM.errSaid) {
VRM.errSaid = 1;
console.warn("vr frame", e);
vrmLog("picture error: " + String(e && e.message || e).slice(0, 120));
}
}
VRM.inLoop = false;
var took = performance.now() - t0;
VRM.slow = took > 12;
vrmBoardsTick();
VRM.fN = (VRM.fN || 0) + 1;
VRM.fMs = (VRM.fMs || 0) + took;
if (VRM.fN === 1)
vrmLog("first picture drawn (" + Math.round(performance.now() - t0) + " ms)");
if (VRM.fN === 300)
vrmLog("300 pictures, about " + Math.round(VRM.fMs / 300) + " ms each");
},
function () {
VRM.dolly.position.copy(camera.position);
VRM.dolly.rotation.set(0, VRM.turn, 0);
VRM.cam.near = (typeof INT !== "undefined" && INT) ? Math.min(0.1, camera.near) : camera.near;
VRM.dolly.updateMatrixWorld(true);
vrmHudTick();
vrmThroughGfx(function () { renderer.render(scene, VRM.cam); });
},
function (draw) {
if (typeof gfxRender !== "function") {
draw();
return;
}
var rr = renderer.render, mode = typeof GFX !== "undefined" && GFX ? GFX.mode : null, done = false;
if (mode !== null)
GFX.mode = "standard";
renderer.render = function () { renderer.render = rr; done = true; draw(); };
try {
gfxRender();
}
catch (e) {
if (!VRM.gfxSaid) {
VRM.gfxSaid = 1;
console.warn("vr draw", e);
}
}
finally {
renderer.render = rr;
if (mode !== null)
GFX.mode = mode;
}
if (!done)
draw();
},
function (dt) {
var S = VRM.xr;
if (!S)
return;
var move = null, run = false, turn = 0, rise = 0, a = false, b = false, grip = false, right = -1;
VRM.trigWas = VRM.trigWas || [];
for (var i = 0; i < S.inputSources.length; i++) {
var src = S.inputSources[i], gp = src.gamepad, hand = VRM.handsXr && VRM.handsXr[i], trig = false;
if (src.handedness === "right")
right = i;
if (src.hand) {
trig = !!(hand && hand.inputState && hand.inputState.pinching);
var j = hand && hand.joints, w = j && j["wrist"], mt = j && j["middle-finger-tip"], rt = j && j["ring-finger-tip"], it = j && j["index-finger-tip"];
if (src.handedness === "right" && w && mt && rt && it && w.visible) {
var dm = mt.position.distanceTo(w.position), dr = rt.position.distanceTo(w.position), di = it.position.distanceTo(w.position);
if (!VRP.fist[i] && dm < 0.075 && dr < 0.075 && di < 0.085) {
VRP.fist[i] = true;
vrmTap("KeyG");
}
else if (VRP.fist[i] && dm > 0.11)
VRP.fist[i] = false;
}
}
else if (gp) {
var ax = gp.axes || [], bt = gp.buttons || [];
var x = ax.length >= 4 ? ax[2] : (ax[0] || 0), y = ax.length >= 4 ? ax[3] : (ax[1] || 0);
var pressed = function (n) { return !!(bt[n] && bt[n].pressed); };
if (src.handedness === "right") {
turn = x;
rise = -y;
}
else {
if (Math.hypot(x, y) > 0.15)
move = { x: x, y: y };
if (pressed(1))
run = true;
if (pressed(3))
grip = true;
}
trig = pressed(0);
if (pressed(4))
a = true;
if (pressed(5))
b = true;
}
else
continue;
var h = VRP.hit[i];
if (trig && !VRM.trigWas[i]) {
if (h)
VRP.down[i] = vrpDown(h) || {};
else if (src.hand && src.handedness === "left")
VRP.walkHand = i;
else {
VRP.act = { t: performance.now(), run: function () { vrmTap("KeyE"); } };
vrmTap("KeyE");
}
}
else if (!trig && VRM.trigWas[i]) {
if (VRP.down[i]) {
vrpUp(VRP.down[i]);
VRP.down[i] = null;
}
if (VRP.walkHand === i)
VRP.walkHand = null;
}
VRM.trigWas[i] = trig;
}
if (VRP.walkHand !== null && VRM.hands[VRP.walkHand]) {
VRM.hands[VRP.walkHand].getWorldQuaternion(VRP.q);
VRP.d.set(0, 0, -1).applyQuaternion(VRP.q);
VRM.cam.getWorldQuaternion(VRP.q);
VRP.v.set(0, 0, -1).applyQuaternion(VRP.q);
var rel = Math.atan2(-VRP.d.x, -VRP.d.z) - Math.atan2(-VRP.v.x, -VRP.v.z);
move = { x: -Math.sin(rel), y: -Math.cos(rel) };
}
if (move) {
var m = Math.min(1, Math.hypot(move.x, move.y));
VRM.stick = { f: -move.y, s: move.x, mag: m, run: run || m > 0.97 };
}
else
VRM.stick = null;
if (Math.abs(turn) > 0.2)
VRM.turn -= turn * Math.min(1, (Math.abs(turn) - 0.2) / 0.7) * 1.7 * dt;
var rh = right >= 0 ? VRP.hit[right] : null, onBoard = !!(rh && rh.b === VRP.main);
if (onBoard && Math.abs(rise) > 0.2) {
if (VRP.mode === "" && VRP.el)
vrpScroll(rh, -rise * 900 * dt);
else if (Math.abs(rise) > 0.6 && performance.now() - (VRP.pageAt || 0) > 450) {
VRP.pageAt = performance.now();
VRP.page = Math.max(0, VRP.page + (rise < 0 ? 1 : -1));
VRP.dirty = true;
}
}
vrmHold("Space", !onBoard && rise > 0.6);
vrmHold("KeyC", !onBoard && rise < -0.6);
if (grip && !VRM.btn.g)
vrmTap("KeyG");
if (a && !VRM.btn.a)
vrpMenuToggle();
if (b && !VRM.btn.b) {
if (VRP.kbFor || VRP.mode || VRP.el)
vrpBack();
else
vrmTap("Escape");
}
VRM.btn = { a: a, b: b, g: grip };
},
function (name, w, h) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var tex = new THREE.CanvasTexture(c);
var m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
m.renderOrder = 10000;
m.frustumCulled = false;
m.name = name;
m.visible = false;
m.rotation.order = "YXZ";
m.scale.set(w * VRP_PX, h * VRP_PX, 1);
var b = { mesh: m, c: c, tex: tex, rects: [] };
VRM.dolly.add(m);
return b;
},
function (b, w, h, mw, mh) {
w = Math.max(64, Math.round(w));
h = Math.max(64, Math.round(h));
if (b.c.width !== w || b.c.height !== h) {
b.c.width = w;
b.c.height = h;
b.tex.dispose();
b.tex = new THREE.CanvasTexture(b.c);
b.mesh.material.map = b.tex;
b.mesh.material.needsUpdate = true;
}
b.mesh.scale.set(mw || w * VRP_PX, mh || h * VRP_PX, 1);
},
function () {
var W = innerWidth, H = innerHeight, best = null, bz = -Infinity;
var list = document.querySelectorAll("body>*,body>*>*");
for (var i = 0; i < list.length; i++) {
var el = list[i];
if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || (el.id && VRP_SKIP.test(el.id)))
continue;
if (el.getAttribute("role") === "status" || !el.getClientRects().length)
continue;
if (el.hasAttribute("data-webxr_runtime") || (renderer && el.contains(renderer.domElement)))
continue;
var r = el.getBoundingClientRect();
if (r.width < 160 || r.height < 60 || r.width * r.height < W * H * 0.03)
continue;
var ow = Math.min(r.right, W) - Math.max(r.left, 0), oh = Math.min(r.bottom, H) - Math.max(r.top, 0);
if (ow <= 0 || oh <= 0 || ow * oh < r.width * r.height * 0.5)
continue;
var cs = getComputedStyle(el);
if (cs.visibility === "hidden" || +cs.opacity < 0.05 || (cs.position !== "fixed" && cs.position !== "absolute"))
continue;
if (!el.querySelector("button,a[href],[role=button],input,select,textarea,canvas"))
continue;
var z = parseInt(cs.zIndex, 10);
if (isNaN(z))
z = 0;
if (z >= bz) {
bz = z;
best = el;
}
}
return best;
},
function (b, el) {
var W = innerWidth, H = innerHeight, r = el.getBoundingClientRect();
var R = { l: Math.max(0, r.left), t: Math.max(0, r.top), r: Math.min(W, r.right), b: Math.min(H, r.bottom) };
R.w = R.r - R.l;
R.h = R.b - R.t;
var s = Math.min(1.6, 1536 / R.w, 1536 / R.h), mpp = Math.min(0.00105, 1.3 / R.w, 1.0 / R.h);
VRP.s = s;
VRP.R = R;
vrpSize(b, R.w * s, R.h * s, R.w * mpp, R.h * mpp);
var x = b.c.getContext("2d");
x.setTransform(1, 0, 0, 1, 0, 0);
x.clearRect(0, 0, b.c.width, b.c.height);
x.fillStyle = "rgba(14,14,26,0.94)";
vrpRound(x, 0, 0, b.c.width, b.c.height, 22);
x.fill();
x.setTransform(s, 0, 0, s, -R.l * s, -R.t * s);
x.textBaseline = "middle";
var rg = document.createRange();
(function walk(node, depth) {
for (var n = node.firstChild; n; n = n.nextSibling) {
if (n.nodeType === 3) {
var raw = n.textContent;
if (!/\S/.test(raw))
continue;
var pcs = getComputedStyle(n.parentNode);
x.font = pcs.fontStyle + " " + pcs.fontWeight + " " + pcs.fontSize + " " + pcs.fontFamily;
x.fillStyle = pcs.color;
rg.selectNodeContents(n);
var rs = rg.getClientRects();
if (rs.length === 1) {
var q = rs[0];
if (q.bottom > R.t && q.top < R.b)
x.fillText(raw.replace(/\s+/g, " ").trim(), q.left, q.top + q.height / 2, q.width + 2);
continue;
}
var re = /\S+/g, m;
while ((m = re.exec(raw))) {
rg.setStart(n, m.index);
rg.setEnd(n, m.index + m[0].length);
var wr = rg.getBoundingClientRect();
if (wr.width && wr.bottom > R.t && wr.top < R.b)
x.fillText(m[0], wr.left, wr.top + wr.height / 2);
}
continue;
}
if (n.nodeType !== 1 || depth > 40)
continue;
var e = n, cs = getComputedStyle(e);
if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0)
continue;
var er = e.getBoundingClientRect();
if (er.bottom < R.t || er.top > R.b || er.right < R.l || er.left > R.r) {
if (cs.overflow !== "visible")
continue;
}
var rad = parseFloat(cs.borderTopLeftRadius) || 0;
if (er.width && er.height) {
if (vrpColour(cs.backgroundColor)) {
x.fillStyle = cs.backgroundColor;
vrpRound(x, er.left, er.top, er.width, er.height, Math.min(rad, er.height / 2));
x.fill();
}
else if (/gradient/.test(cs.backgroundImage)) {
x.fillStyle = "rgba(60,52,90,0.85)";
vrpRound(x, er.left, er.top, er.width, er.height, Math.min(rad, er.height / 2));
x.fill();
}
var bw = parseFloat(cs.borderTopWidth) || 0;
if (bw > 0 && vrpColour(cs.borderTopColor)) {
x.strokeStyle = cs.borderTopColor;
x.lineWidth = bw;
vrpRound(x, er.left + bw / 2, er.top + bw / 2, er.width - bw, er.height - bw, Math.min(rad, er.height / 2));
x.stroke();
}
}
var tag = e.tagName;
if (tag === "IMG" || tag === "CANVAS" || tag === "VIDEO") {
try {
if (tag !== "IMG" || e.complete)
x.drawImage(e, er.left, er.top, er.width, er.height);
}
catch (err) { }
continue;
}
if (tag === "svg" || tag === "SVG")
continue;
if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
x.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
if (e.type === "checkbox" || e.type === "radio") {
x.strokeStyle = "#C9C2B2";
x.lineWidth = 2;
x.strokeRect(er.left + 1, er.top + 1, er.width - 2, er.height - 2);
if (e.checked) {
x.fillStyle = "#E8C67A";
x.fillRect(er.left + 4, er.top + 4, er.width - 8, er.height - 8);
}
}
else if (e.type === "range") {
var f = ((+e.value) - (+e.min || 0)) / (((+e.max) || 100) - (+e.min || 0));
x.fillStyle = "rgba(150,160,190,0.6)";
x.fillRect(er.left, er.top + er.height / 2 - 2, er.width, 4);
x.fillStyle = "#E8C67A";
x.beginPath();
x.arc(er.left + er.width * f, er.top + er.height / 2, Math.min(9, er.height / 2), 0, 6.283);
x.fill();
}
else {
if (!vrpColour(cs.backgroundColor)) {
x.fillStyle = "rgba(20,22,34,0.9)";
x.fillRect(er.left, er.top, er.width, er.height);
}
x.strokeStyle = e === VRP.kbFor ? "#E8C67A" : "rgba(160,170,200,0.7)";
x.lineWidth = e === VRP.kbFor ? 3 : 1;
x.strokeRect(er.left, er.top, er.width, er.height);
var v = tag === "SELECT" ? ((e.options[e.selectedIndex] || {}).text || "") : (e.type === "password" ? e.value.replace(/./g, "•") : e.value);
x.fillStyle = v ? cs.color : "rgba(170,165,180,0.8)";
if (!v)
v = e.placeholder || "";
x.save();
x.beginPath();
x.rect(er.left, er.top, er.width, er.height);
x.clip();
var lh = parseFloat(cs.fontSize) * 1.3, lines = String(v).split("\n"), y0 = er.top + (tag === "TEXTAREA" ? lh / 2 + 4 : er.height / 2);
for (var li = Math.max(0, lines.length - Math.floor(er.height / lh)); li < lines.length; li++, y0 += lh)
x.fillText(lines[li] + (e === VRP.kbFor && li === lines.length - 1 ? "|" : ""), er.left + 6, y0);
if (tag === "SELECT")
x.fillText("▾", er.right - 18, er.top + er.height / 2);
x.restore();
}
continue;
}
if (cs.overflow !== "visible" && e !== el) {
x.save();
x.beginPath();
x.rect(er.left, er.top, er.width, er.height);
x.clip();
walk(e, depth + 1);
x.restore();
}
else
walk(e, depth + 1);
}
})(el, 0);
x.setTransform(1, 0, 0, 1, 0, 0);
b.close = { x: b.c.width - 44, y: 44, r: 34 };
},
function (b, title, items) {
var per = 12, pages = Math.max(1, Math.ceil(items.length / per));
VRP.page = Math.max(0, Math.min(pages - 1, VRP.page | 0));
var W = 1024, rowH = 78, first = VRP.page * per, n = Math.min(per, items.length - first), rows = Math.ceil(n / 2);
vrpSize(b, W, 150 + rows * (rowH + 12) + (pages > 1 ? 150 : 70));
var x = b.c.getContext("2d");
x.setTransform(1, 0, 0, 1, 0, 0);
x.clearRect(0, 0, W, b.c.height);
x.fillStyle = "rgba(12,14,24,0.95)";
x.strokeStyle = "rgba(150,170,210,0.8)";
x.lineWidth = 5;
vrpRound(x, 4, 4, W - 8, b.c.height - 8, 28);
x.fill();
x.stroke();
x.textBaseline = "middle";
x.fillStyle = "#EDE6D6";
x.font = "600 40px system-ui,sans-serif";
x.fillText(title, 36, 64);
b.rects = [];
for (var k = 0; k < n; k++) {
var it = items[first + k], col = k % 2, row = Math.floor(k / 2), bx = 30 + col * 487, by = 130 + row * (rowH + 12);
x.fillStyle = "rgba(52,60,84,0.95)";
vrpRound(x, bx, by, 470, rowH, 14);
x.fill();
x.fillStyle = "#EDE6D6";
x.font = "600 32px system-ui,sans-serif";
var t = it.t;
while (x.measureText(t).width > 430 && t.length > 4)
t = t.slice(0, -2);
x.fillText(t === it.t ? t : t + "…", bx + 20, by + rowH / 2);
b.rects.push({ x0: bx, y0: by, x1: bx + 470, y1: by + rowH, run: it.run, t: it.t, keep: !!it.keep });
}
var fy = b.c.height - 56;
if (pages > 1) {
var py = b.c.height - 150;
[["◀ Back a page", -1, 30], ["Next page ▶", 1, 544]].forEach(function (p) {
x.fillStyle = "rgba(80,70,120,0.95)";
vrpRound(x, p[2], py, 450, 70, 14);
x.fill();
x.fillStyle = "#E8C67A";
x.font = "600 30px system-ui,sans-serif";
x.fillText(p[0], p[2] + 24, py + 35);
b.rects.push({ x0: p[2], y0: py, x1: p[2] + 450, y1: py + 70, keep: true, run: function () { VRP.page = Math.max(0, Math.min(pages - 1, VRP.page + p[1])); VRP.dirty = true; } });
});
}
x.fillStyle = "#9AA3B5";
x.font = "400 26px system-ui,sans-serif";
x.fillText((pages > 1 ? "Page " + (VRP.page + 1) + " of " + pages + " · " : "") + "point and pull the trigger, or pinch · B or Y closes", 36, fy);
b.close = { x: W - 44, y: 44, r: 34 };
},
function () {
var items = [], seen = {};
function add(btn, label) {
if (!btn || btn.id === "me-vr" || getComputedStyle(btn).display === "none" || btn.hidden)
return;
label = (label || btn.title || btn.innerText || btn.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().split(/[:(]/)[0].trim();
if (!label || seen[label])
return;
seen[label] = 1;
items.push({ t: label, run: function () { btn.click(); } });
}
var pd = { "pd-take": "Take or drop (G)", "pd-use": "Use", "pd-desk": "Your desk", "pd-abil": "Your powers", "pd-back": "Back" };
Object.keys(pd).forEach(function (id) { add(document.getElementById(id), pd[id]); });
items.push({ t: "👋 Wave", run: function () { if (typeof togEmote === "function")
try {
togEmote("wave");
}
catch (e) { } } });
if (typeof psMenuSections === "function") {
var secs = [];
try {
secs = psMenuSections(false, { skip: { "me-vr": 1, "pd-fold": 1, "ps-time": 1 } });
}
catch (e) { }
secs.forEach(function (sc) {
var sub = sc.items.map(function (it) { return { t: it.label, run: it.run }; });
sub.unshift({ t: "◀ All of the menu", keep: true, run: function () { vrpMenuSection(null); } });
items.push({ t: sc.t + " ▸", keep: true, run: function () { vrpMenuSection({ t: sc.t, items: sub }); } });
});
}
else {
var bar = document.getElementById("me-bar");
if (bar)
Array.prototype.forEach.call(bar.querySelectorAll("button"), function (btn) { add(btn); });
}
items.push({ t: "🚪 Leave VR", run: function () { try {
VRM.xr.end();
}
catch (e) { } } });
return items;
},
function (b) {
var W = 1024, kh = 78, x;
vrpSize(b, W, 40 + 5 * (kh + 10) + 20);
x = b.c.getContext("2d");
x.setTransform(1, 0, 0, 1, 0, 0);
x.clearRect(0, 0, W, b.c.height);
x.fillStyle = "rgba(12,14,24,0.95)";
vrpRound(x, 4, 4, W - 8, b.c.height - 8, 24);
x.fill();
x.textBaseline = "middle";
b.rects = [];
(VRP.kbFor && VRP.kbFor.type === "url" ? VRK_URL : VRK_ROWS).forEach(function (row, ri) {
var y = 30 + ri * (kh + 10), widths = row.map(function (k) { return k === "Space" ? 520 : k.length > 1 && k !== "⌫" ? 200 : 82; });
var tot = widths.reduce(function (a, c) { return a + c + 8; }, -8), bx = (W - tot) / 2;
row.forEach(function (k, ki) {
var w = widths[ki], on = k === "⇧" && VRP.shift;
x.fillStyle = on ? "rgba(232,198,122,0.95)" : "rgba(52,60,84,0.95)";
vrpRound(x, bx, y, w, kh, 12);
x.fill();
x.fillStyle = on ? "#1A1720" : "#EDE6D6";
x.font = "600 34px system-ui,sans-serif";
var lab = k.length === 1 && VRP.shift ? k.toUpperCase() : k, tw = x.measureText(lab).width;
x.fillText(lab, bx + (w - tw) / 2, y + kh / 2);
b.rects.push({ x0: bx, y0: y, x1: bx + w, y1: y + kh, key: k });
bx += w + 8;
});
});
},
function (k) {
var f = VRP.kbFor;
if (!f)
return;
if (k === "Done") {
vrpKbClose();
return;
}
if (k === "⇧") {
VRP.shift = !VRP.shift;
VRP.kb.dirty = true;
return;
}
if (k === "Enter") {
if (f.id === "vrq-in") {
vrqAnswer(true);
return;
}
VRP.act = { t: performance.now(), run: function () { VRP.kbFor = f; vrpType("Enter"); } };
var ev = new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true });
f.dispatchEvent(ev);
if (!ev.defaultPrevented) {
if (f.tagName === "TEXTAREA") {
f.value += "\n";
f.dispatchEvent(new Event("input", { bubbles: true }));
}
else {
f.dispatchEvent(new Event("change", { bubbles: true }));
if (f.form && f.form.requestSubmit)
try {
f.form.requestSubmit();
}
catch (e) { }
}
}
f.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true }));
VRP.sig = "";
return;
}
if (k === "⌫")
f.value = f.value.slice(0, -1);
else {
var ch = k === "Space" ? " " : VRP.shift ? k.toUpperCase() : k;
if (!(f.maxLength > 0 && f.value.length >= f.maxLength))
f.value += ch;
if (VRP.shift) {
VRP.shift = false;
VRP.kb.dirty = true;
}
}
f.dispatchEvent(new Event("input", { bubbles: true }));
VRP.sig = "";
if (VRP.mode === "ask")
VRP.dirty = true;
},
function (f) {
VRP.kbFor = f;
try {
f.focus({ preventScroll: true });
}
catch (e) { }
if (!VRP.kb)
VRP.kb = vrpBoard("vrm-keys", 1024, 500);
vrpPaintKb(VRP.kb);
VRP.kb.tex.needsUpdate = true;
VRP.kb.mesh.visible = true;
var m = VRP.main.mesh, k = VRP.kb.mesh;
k.rotation.set(-0.55, m.rotation.y, 0);
var down = m.scale.y / 2 + 0.06 + k.scale.y / 2 * Math.cos(0.55);
k.position.set(m.position.x + Math.sin(m.rotation.y) * 0.12, m.position.y - down, m.position.z + Math.cos(m.rotation.y) * 0.12);
VRP.sig = "";
},
function (type, t, c) {
var o = { bubbles: true, cancelable: true, composed: true, clientX: c.x, clientY: c.y, screenX: c.x, screenY: c.y, button: 0, buttons: type === "up" ? 0 : 1, view: window, pointerId: 7, pointerType: "mouse", isPrimary: true };
if (type === "down") {
t.dispatchEvent(new PointerEvent("pointerdown", o));
t.dispatchEvent(new MouseEvent("mousedown", o));
}
else if (type === "move") {
t.dispatchEvent(new PointerEvent("pointermove", o));
t.dispatchEvent(new MouseEvent("mousemove", o));
}
else {
t.dispatchEvent(new PointerEvent("pointerup", o));
t.dispatchEvent(new MouseEvent("mouseup", o));
}
},
function (h) {
var b = h.b;
if (b === VRP.tag) {
vrpMenuToggle();
return null;
}
if (b === VRP.kb) {
var kr = b.rects.filter(function (r) { return h.x >= r.x0 && h.x <= r.x1 && h.y >= r.y0 && h.y <= r.y1; })[0];
if (kr)
vrpType(kr.key);
return null;
}
if (vrpIsClose(b, h)) {
vrpBack();
return null;
}
if (VRP.mode === "ask") {
var ar = b.rects.filter(function (r) { return h.x >= r.x0 && h.x <= r.x1 && h.y >= r.y0 && h.y <= r.y1; })[0];
if (ar)
ar.run();
return null;
}
if (VRP.mode === "menu" || VRP.mode === "pick") {
var r = b.rects.filter(function (r) { return h.x >= r.x0 && h.x <= r.x1 && h.y >= r.y0 && h.y <= r.y1; })[0];
if (r) {
if (VRP.mode === "menu" && !r.keep)
vrpMenuToggle(false);
else if (!r.keep) {
VRP.mode = "";
VRP.sig = "";
}
VRP.act = { t: performance.now(), run: r.run };
r.run();
if (!r.keep)
VRP.pick = null;
}
return null;
}
if (!VRP.el || !VRP.R)
return null;
var c = vrpClient(h), t = document.elementFromPoint(c.x, c.y);
if (!t || !VRP.el.contains(t))
return null;
var f = t.closest("input,select,textarea");
if (f && !f.disabled) {
if (f.tagName === "SELECT") {
VRP.pick = f;
VRP.mode = "pick";
VRP.page = Math.floor(f.selectedIndex / 12) || 0;
VRP.dirty = true;
return null;
}
if (f.type === "range") {
var fr = f.getBoundingClientRect(), lo = +f.min || 0, hi = f.max !== "" ? +f.max : 100;
f.value = lo + (hi - lo) * Math.max(0, Math.min(1, (c.x - fr.left) / fr.width));
f.dispatchEvent(new Event("input", { bubbles: true }));
f.dispatchEvent(new Event("change", { bubbles: true }));
VRP.sig = "";
return { range: f };
}
if (f.tagName === "TEXTAREA" || /^(text|search|email|password|number|tel|url)$/.test(f.type || "text")) {
vrpKbOpen(f);
return null;
}
}
vrpMouse("down", t, c);
return { t: t, c: c, moved: 0 };
},
function (g, h) {
if (!g || !h || h.b !== VRP.main)
return;
var c = vrpClient(h);
if (g.range) {
var fr = g.range.getBoundingClientRect(), lo = +g.range.min || 0, hi = g.range.max !== "" ? +g.range.max : 100;
g.range.value = lo + (hi - lo) * Math.max(0, Math.min(1, (c.x - fr.left) / fr.width));
g.range.dispatchEvent(new Event("input", { bubbles: true }));
VRP.sig = "";
return;
}
g.moved = Math.max(g.moved, Math.hypot(c.x - g.c.x, c.y - g.c.y));
var t = document.elementFromPoint(c.x, c.y) || g.t;
g.last = c;
vrpMouse("move", t, c);
},
function (g) {
if (!g || (!g.t && !g.range))
return;
if (g.range) {
g.range.dispatchEvent(new Event("change", { bubbles: true }));
return;
}
var c = g.last || g.c, t = document.elementFromPoint(c.x, c.y) || g.t;
vrpMouse("up", t, c);
if (g.moved < 12) {
var k = g.t.closest("button,a[href],label,summary,input,[role=button]") || g.t;
VRP.act = { t: performance.now(), run: function () { if (k.click)
k.click(); } };
try {
if (k.click)
k.click();
else
k.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, clientX: c.x, clientY: c.y, view: window }));
}
catch (e) { }
}
VRP.at = 0;
VRP.sig = "";
},
function () {
if (VRP.mode === "ask") {
vrqAnswer(false);
return;
}
if (VRP.kbFor) {
vrpKbClose();
return;
}
if (VRP.mode === "pick") {
VRP.mode = "";
VRP.pick = null;
VRP.sig = "";
return;
}
if (VRP.mode === "menu" && VRP.sec) {
vrpMenuSection(null);
return;
}
if (VRP.mode === "menu") {
vrpMenuToggle(false);
return;
}
vrmTap("Escape");
var el = VRP.el;
setTimeout(function () {
if (el && VRP.el === el && vrmPanelFind() === el) {
var c = [].filter.call(el.querySelectorAll("button,[role=button]"), function (x) { return x.getClientRects().length && /^(✕|×|x|close|done|back|cancel|leave|not now|no thanks|got it)$/i.test((x.innerText || x.getAttribute("aria-label") || x.title || "").trim()); })[0];
if (c)
c.click();
}
VRP.at = 0;
}, 160);
},
function () {
if (!VRM.xr || !VRM.dolly)
return;
if (!VRP.main) {
VRP.main = vrpBoard("vrm-board", 1024, 1024);
var dg = new THREE.SphereGeometry(0.009, 10, 8), dm = new THREE.MeshBasicMaterial({ color: 0xFFE2A0, depthTest: false, transparent: true });
for (var ci = 0; ci < 4; ci++) {
var dot = new THREE.Mesh(dg, dm);
dot.renderOrder = 10002;
dot.visible = false;
dot.frustumCulled = false;
VRM.dolly.add(dot);
VRP.cur.push(dot);
}
}
var now = performance.now(), B = VRP.main;
if (now - VRP.at > 400) {
VRP.at = now;
var el = vrmPanelFind();
if (el !== VRP.el) {
if (VRP.kbFor && (!el || !el.contains(VRP.kbFor)))
vrpKbClose();
if (VRP.mode === "pick") {
VRP.mode = "";
VRP.pick = null;
}
VRP.el = el;
VRP.sig = "";
if (el && VRP.mode !== "menu")
VRP.place = true;
}
if (el && VRP.mode === "") {
var cv = el.querySelector("canvas"), live = cv && cv.getClientRects().length && cv.width > 0 && getComputedStyle(cv).visibility !== "hidden";
var sig = el.innerText.length + "|" + el.innerText.slice(0, 400) + "|" + [].map.call(el.querySelectorAll("input,textarea,select"), function (f) { return f.type === "checkbox" ? f.checked : f.value; }).join("|") + "|" + (live ? Math.floor(now / 500) : "");
var sc = [].map.call(el.querySelectorAll("*"), function (n) { return n.scrollTop; }).join(",") + el.scrollTop;
sig += sc;
if (sig !== VRP.sig) {
VRP.sig = sig;
VRP.dirty = true;
}
}
}
var showing = VRP.mode === "menu" || VRP.mode === "pick" || VRP.mode === "ask" || !!VRP.el;
if ((VRP.dirty || VRP.hoverDirty) && showing) {
var full = VRP.dirty || !VRP.pic || VRP.mode !== "";
VRP.dirty = false;
VRP.hoverDirty = false;
if (!full) {
var bx = B.c.getContext("2d");
bx.setTransform(1, 0, 0, 1, 0, 0);
bx.clearRect(0, 0, B.c.width, B.c.height);
bx.drawImage(VRP.pic, 0, 0);
}
else if (VRP.mode === "ask")
vrqPaint(B);
else if (VRP.mode === "menu")
vrpPaintList(B, VRP.sec ? VRP.sec.t : "VR menu", VRP.menu);
else if (VRP.mode === "pick")
vrpPaintList(B, "Choose", [].map.call(VRP.pick.options, function (o, i) { return { t: (i === VRP.pick.selectedIndex ? "● " : "") + o.text, run: function () { VRP.pick.selectedIndex = i; VRP.pick.dispatchEvent(new Event("input", { bubbles: true })); VRP.pick.dispatchEvent(new Event("change", { bubbles: true })); } }; }));
else {
vrpPaintWin(B, VRP.el);
if (!VRP.pic)
VRP.pic = document.createElement("canvas");
VRP.pic.width = B.c.width;
VRP.pic.height = B.c.height;
VRP.pic.getContext("2d").drawImage(B.c, 0, 0);
}
if (VRP.mode !== "")
VRP.pic = null;
if (VRP.hot && VRP.mode === "" && VRP.el) {
var x = B.c.getContext("2d"), hr = VRP.hot.getBoundingClientRect();
x.strokeStyle = "#FFD27A";
x.lineWidth = 4;
vrpRound(x, (hr.left - VRP.R.l) * VRP.s - 2, (hr.top - VRP.R.t) * VRP.s - 2, hr.width * VRP.s + 4, hr.height * VRP.s + 4, 10);
x.stroke();
}
if (B.close) {
var cx = B.c.getContext("2d");
cx.fillStyle = "rgba(120,40,50,0.92)";
cx.beginPath();
cx.arc(B.close.x, B.close.y, B.close.r, 0, 6.283);
cx.fill();
cx.fillStyle = "#FFF4E8";
cx.font = "600 40px system-ui,sans-serif";
cx.textBaseline = "middle";
cx.fillText("✕", B.close.x - 14, B.close.y + 2);
}
B.tex.needsUpdate = true;
}
if (VRP.kb && VRP.kb.dirty) {
VRP.kb.dirty = false;
vrpPaintKb(VRP.kb);
VRP.kb.tex.needsUpdate = true;
}
B.mesh.visible = showing;
if (!showing && VRP.kbFor)
vrpKbClose();
if (VRP.place && showing) {
VRP.place = false;
VRM_E.setFromQuaternion(VRM.cam.quaternion, "YXZ");
var hy = VRM_E.y, p = VRM.cam.position, d = VRP.mode === "menu" ? 1.05 : 1.2;
B.mesh.position.set(p.x - Math.sin(hy) * d, p.y + 0.02, p.z - Math.cos(hy) * d);
B.mesh.rotation.set(0, hy, 0);
if (VRP.kbFor)
vrpKbOpen(VRP.kbFor);
else if (VRQ.kbLater && VRQ.f) {
VRQ.kbLater = false;
vrpKbOpen(VRQ.f);
}
}
vrpHandsTick();
},
function () {
var S = VRM.xr, boards = [VRP.kb, VRP.main, VRP.tag], hot = null;
VRM.dolly.updateMatrixWorld(true);
for (var i = 0; i < VRM.hands.length; i++) {
var c = VRM.hands[i], src = S.inputSources[i], h = null, dot = VRP.cur[i];
if (c && c.visible) {
c.getWorldPosition(VRP.o);
c.getWorldQuaternion(VRP.q);
VRP.d.set(0, 0, -1).applyQuaternion(VRP.q);
for (var k = 0; k < boards.length && !h; k++)
h = vrpRayAt(boards[k], VRP.o, VRP.d);
}
VRP.hit[i] = h;
if (dot) {
dot.visible = !!h;
if (h)
dot.position.copy(VRM.dolly.worldToLocal(h.p.clone()));
}
if (h && h.b === VRP.main && VRP.mode === "" && VRP.el && VRP.R) {
if (performance.now() - (VRP.hotAt[i] || 0) > 120) {
VRP.hotAt[i] = performance.now();
var cc = vrpClient(h), t = document.elementFromPoint(cc.x, cc.y);
VRP.hotWas[i] = t && VRP.el.contains(t) ? t.closest("button,a[href],input,select,textarea,label,summary,[role=button],[onclick],canvas") || null : null;
}
hot = hot || VRP.hotWas[i] || null;
}
if (VRP.down[i] && VRP.down[i].t !== undefined)
vrpMove(VRP.down[i], h);
var hand = VRM.handsXr && VRM.handsXr[i];
if (hand)
for (var jn in hand.joints) {
var jo = hand.joints[jn];
if (!jo.userData.ball) {
jo.userData.ball = 1;
jo.add(new THREE.Mesh(VRP.jg || (VRP.jg = new THREE.SphereGeometry(0.007, 8, 6)), VRP.jm || (VRP.jm = new THREE.MeshBasicMaterial({ color: 0xD8E4FF, transparent: true, opacity: 0.75 }))));
}
}
if (hand && hand.visible && src && src.hand && hand.joints["index-finger-tip"]) {
var tip = hand.joints["index-finger-tip"];
tip.getWorldPosition(VRP.v);
var tp = VRP.v.clone(), touch = null;
for (var kb = 0; kb < boards.length && !touch; kb++) {
var tt = vrpTipAt(boards[kb], tp);
if (tt && tt.z < 0.012 && tt.z > -0.06)
touch = tt;
}
var was = VRP.poke[i];
if (touch && !was)
VRP.poke[i] = { g: vrpDown(touch) };
else if (!touch && was) {
var near = null;
for (var kc = 0; kc < boards.length && !near; kc++) {
var t2 = vrpTipAt(boards[kc], tp);
if (t2 && t2.z < 0.035)
near = t2;
}
if (!near) {
vrpUp(was.g);
VRP.poke[i] = null;
}
}
}
}
if (VRP.hot !== hot) {
VRP.hot = hot;
VRP.hoverDirty = true;
}
vrpTagTick();
},
function () {
var S = VRM.xr, left = -1;
for (var i = 0; i < S.inputSources.length; i++)
if (S.inputSources[i].hand && S.inputSources[i].handedness === "left")
left = i;
var hand = left >= 0 && VRM.handsXr ? VRM.handsXr[left] : null, wr = hand && hand.visible && hand.joints["wrist"];
if (!wr || !wr.visible) {
if (VRP.tag)
VRP.tag.mesh.visible = false;
return;
}
if (!VRP.tag) {
VRP.tag = vrpBoard("vrm-tag", 256, 96);
var x = VRP.tag.c.getContext("2d");
x.fillStyle = "rgba(40,34,72,0.95)";
vrpRound(x, 2, 2, 252, 92, 30);
x.fill();
x.fillStyle = "#F2D27A";
x.font = "600 44px system-ui,sans-serif";
x.textBaseline = "middle";
x.fillText("☰ Menu", 30, 50);
VRP.tag.tex.needsUpdate = true;
VRP.tag.mesh.scale.set(0.12, 0.045, 1);
}
wr.getWorldPosition(VRP.v);
var p = VRM.dolly.worldToLocal(VRP.v.clone());
p.y += 0.07;
VRP.tag.mesh.position.copy(p);
VRM_E.setFromQuaternion(VRM.cam.quaternion, "YXZ");
VRP.tag.mesh.rotation.set(0, VRM_E.y, 0);
VRP.tag.mesh.visible = true;
},
function (q) {
var a = VRP.act;
q.act = a && performance.now() - a.t < 2000 ? a.run : null;
VRQ.ask = q;
if (VRP.kbFor)
vrpKbClose();
VRP.mode = "ask";
VRP.place = true;
VRP.dirty = true;
VRP.sig = "";
if (q.kind === "prompt") {
var f = document.getElementById("vrq-in");
if (!f) {
f = document.createElement("input");
f.id = "vrq-in";
f.type = "text";
f.style.cssText = "position:fixed;left:-9999px;top:0;width:10px;opacity:0";
f.setAttribute("aria-hidden", "true");
document.body.appendChild(f);
}
f.value = q.val || "";
VRQ.f = f;
if (VRP.main)
vrpKbOpen(f);
else
VRQ.kbLater = true;
}
},
function (yes) {
var q = VRQ.ask;
if (!q)
return;
var val = q.kind === "prompt" && VRQ.f ? VRQ.f.value : null;
VRQ.ask = null;
VRP.mode = "";
VRP.sig = "";
VRP.dirty = true;
if (VRP.kbFor) {
VRP.kbFor = null;
VRP.shift = false;
if (VRP.kb)
VRP.kb.mesh.visible = false;
}
if (!yes || q.kind === "alert")
return;
if (q.kind === "confirm")
VRQ.yes = q.msg;
else
VRQ.ans = { m: q.msg, v: val };
if (q.act)
setTimeout(function () { try {
q.act();
}
catch (e) { } setTimeout(function () { VRQ.yes = null; VRQ.ans = null; }, 1500); }, 60);
},
function (b) {
var q = VRQ.ask, W = 1024, x = b.c.getContext("2d");
x.font = "500 34px system-ui,sans-serif";
var lines = [];
String(q.msg).split("\n").forEach(function (par) {
var ws = par.split(" "), ln = "";
ws.forEach(function (w) { var t = ln ? ln + " " + w : w; if (x.measureText(t).width > W - 90 && ln) {
lines.push(ln);
ln = w;
}
else
ln = t; });
lines.push(ln);
});
if (lines.length > 14)
lines = lines.slice(0, 13).concat(["…"]);
var hgt = 60 + lines.length * 44 + (q.kind === "prompt" ? 100 : 0) + 130;
vrpSize(b, W, hgt);
x = b.c.getContext("2d");
x.setTransform(1, 0, 0, 1, 0, 0);
x.clearRect(0, 0, W, hgt);
x.fillStyle = "rgba(12,14,24,0.96)";
x.strokeStyle = "rgba(232,198,122,0.9)";
x.lineWidth = 5;
vrpRound(x, 4, 4, W - 8, hgt - 8, 28);
x.fill();
x.stroke();
x.textBaseline = "middle";
x.fillStyle = "#EDE6D6";
x.font = "500 34px system-ui,sans-serif";
var y = 56;
lines.forEach(function (l) { x.fillText(l, 44, y); y += 44; });
if (q.kind === "prompt") {
y += 10;
x.fillStyle = "rgba(20,22,34,0.95)";
x.fillRect(40, y, W - 80, 70);
x.strokeStyle = "#E8C67A";
x.lineWidth = 3;
x.strokeRect(40, y, W - 80, 70);
x.fillStyle = "#F4EEDD";
x.font = "500 34px system-ui,sans-serif";
var v = (VRQ.f && VRQ.f.value) || "";
while (x.measureText(v).width > W - 130 && v.length)
v = v.slice(1);
x.fillText(v + "|", 56, y + 35);
y += 90;
}
b.rects = [];
var opts = q.kind === "alert" ? [["OK", true]] : q.kind === "confirm" ? [["Yes", true], ["No", false]] : [["OK", true], ["Cancel", false]];
var bw = 280, gap = 40, bx = (W - (opts.length * bw + (opts.length - 1) * gap)) / 2, by = hgt - 110;
opts.forEach(function (o) {
x.fillStyle = o[1] ? "rgba(232,198,122,0.95)" : "rgba(52,60,84,0.95)";
vrpRound(x, bx, by, bw, 76, 16);
x.fill();
x.fillStyle = o[1] ? "#1A1720" : "#EDE6D6";
x.font = "600 36px system-ui,sans-serif";
var tw = x.measureText(o[0]).width;
x.fillText(o[0], bx + (bw - tw) / 2, by + 38);
b.rects.push({ x0: bx, y0: by, x1: bx + bw, y1: by + 76, t: o[0], run: function () { vrqAnswer(o[1]); } });
bx += bw + gap;
});
b.close = { x: W - 44, y: 44, r: 34 };
},
function (h, dy) {
var c = vrpClient(h), t = document.elementFromPoint(c.x, c.y);
while (t && t !== document.body) {
var cs = getComputedStyle(t);
if (t.scrollHeight > t.clientHeight + 2 && /(auto|scroll)/.test(cs.overflowY)) {
t.scrollTop += dy;
VRP.at = 0;
return;
}
if (t === VRP.el)
break;
t = t.parentElement;
}
if (VRP.el) {
VRP.el.scrollTop += dy;
VRP.at = 0;
}
},
function () {
VRQ.ask = null;
VRQ.yes = null;
VRQ.ans = null;
VRP.mode = "";
VRP.el = null;
VRP.pick = null;
VRP.walkHand = null;
VRP.down = [];
VRP.poke = [];
VRP.hit = [];
if (VRP.kbFor)
vrpKbClose();
[VRP.main, VRP.kb, VRP.tag].forEach(function (b) { if (b)
b.mesh.visible = false; });
VRP.cur.forEach(function (d) { d.visible = false; });
},
function () {
var c = document.createElement("canvas");
c.width = 1024;
c.height = 256;
VRM.hudC = c;
VRM.hudTex = new THREE.CanvasTexture(c);
var m = new THREE.MeshBasicMaterial({ map: VRM.hudTex, transparent: true, opacity: 0, depthTest: false, depthWrite: false });
VRM.hud = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), m);
VRM.hud.renderOrder = 9999;
VRM.hud.frustumCulled = false;
VRM.hud.position.set(0, -0.35, -1.5);
},
function (text) {
var c = VRM.hudC, x = c.getContext("2d");
x.clearRect(0, 0, c.width, c.height);
if (!text)
return;
x.fillStyle = "rgba(10,12,22,0.82)";
x.strokeStyle = "rgba(150,170,210,0.7)";
x.lineWidth = 4;
if (x.roundRect) {
x.beginPath();
x.roundRect(6, 6, c.width - 12, c.height - 12, 26);
x.fill();
x.stroke();
}
else {
x.fillRect(6, 6, c.width - 12, c.height - 12);
x.strokeRect(6, 6, c.width - 12, c.height - 12);
}
x.fillStyle = "#EDE6D6";
x.font = "600 40px system-ui,sans-serif";
x.textBaseline = "top";
var y = 26, lines = text.split("\n");
for (var i = 0; i < lines.length && y < c.height - 40; i++) {
var words = lines[i].split(" "), ln = "";
for (var w = 0; w < words.length; w++) {
var t = ln ? ln + " " + words[w] : words[w];
if (x.measureText(t).width > c.width - 60 && ln) {
x.fillText(ln, 30, y);
y += 48;
ln = words[w];
if (y > c.height - 40)
break;
}
else
ln = t;
}
if (y <= c.height - 40 && ln) {
x.fillText(ln, 30, y);
y += 52;
}
x.font = "400 34px system-ui,sans-serif";
x.fillStyle = "#C9C2B2";
}
},
function () {
var H = VRM.hud;
if (!H)
return;
var now = performance.now();
if (now - VRM.hudAt > 500) {
VRM.hudAt = now;
var t = vrmScreenText();
if (t !== VRM.hudText) {
VRM.hudText = t;
if (t)
vrmHudDraw(t);
VRM.hudTex.needsUpdate = true;
}
}
var want = VRM.hudText ? 1 : 0, m = H.material;
m.opacity += (want - m.opacity) * 0.08;
if (m.opacity < 0.01 && !want)
m.opacity = 0;
H.visible = m.opacity > 0.01;
var q = VRM.cam.quaternion;
VRM_E.setFromQuaternion(q, "YXZ");
var hy = VRM_E.y, p = VRM.cam.position;
VRM_V.set(p.x - Math.sin(hy) * 1.5, p.y - 0.38, p.z - Math.cos(hy) * 1.5);
if (H.position.distanceTo(VRM_V) > 3)
H.position.copy(VRM_V);
else
H.position.lerp(VRM_V, 0.05);
var dy = hy - H.rotation.y;
dy = Math.atan2(Math.sin(dy), Math.cos(dy));
H.rotation.set(0, H.rotation.y + dy * 0.05, 0);
},
function () {
if (VRM.card)
return;
var begin = function () {
if (!walkMode && typeof setWalk === "function")
try {
setWalk(true);
}
catch (e) { }
VRM.card = true;
VRM.ori = null;
VRM.oriBase = null;
VRM.setYaw = null;
if (!VRM.st) {
VRM.st = new THREE.StereoCamera();
VRM.st.eyeSep = 0.064;
}
VRM.view0 = typeof meView !== "undefined" ? meView : null;
if (VRM.view0 && VRM.view0 !== "eyes")
meView = "eyes";
VRM.pr0 = renderer.getPixelRatio();
var pr = Math.min(VRM.pr0, 1.25);
if (pr !== VRM.pr0) {
renderer.setPixelRatio(pr);
renderer.setSize(innerWidth, innerHeight);
}
document.body.classList.add("vrm-on");
vrmCardUi(true);
window.addEventListener("deviceorientation", vrmOrient, true);
try {
var d = document.documentElement;
(d.requestFullscreen || d.webkitRequestFullscreen || function () { }).call(d);
}
catch (e) { }
setTimeout(function () { try {
screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape").catch(function () { });
}
catch (e) { } }, 300);
};
if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
DeviceOrientationEvent.requestPermission().then(function (r) {
if (r !== "granted")
setStatus("Without motion access the viewer cannot follow your head. You can still drag to look.");
begin();
}).catch(begin);
}
else
begin();
},
function () {
if (!VRM.card)
return;
VRM.card = false;
vrmLetGo();
VRM.walkHeld = false;
window.removeEventListener("deviceorientation", vrmOrient, true);
document.body.classList.remove("vrm-on");
vrmCardUi(false);
if (VRM.view0 && typeof meView !== "undefined")
meView = VRM.view0;
if (VRM.pr0 && renderer.getPixelRatio() !== VRM.pr0) {
renderer.setPixelRatio(VRM.pr0);
}
renderer.setScissorTest(false);
try {
renderer.setSize(innerWidth, innerHeight);
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
}
catch (e) { }
try {
if (document.fullscreenElement && document.exitFullscreen)
document.exitFullscreen();
}
catch (e) { }
try {
screen.orientation && screen.orientation.unlock && screen.orientation.unlock();
}
catch (e) { }
},
function () {
vrmKeepGameTurn();
var o = VRM.ori;
if (o) {
var d = Math.PI / 180, sa = (screen.orientation && typeof screen.orientation.angle === "number") ? screen.orientation.angle : (window.orientation || 0);
VRM_OE.set(o.b * d, o.a * d, -o.g * d, "YXZ");
VRM_Q.setFromEuler(VRM_OE);
VRM_Q.multiply(VRM_Q1);
VRM_Q.multiply(VRM_Q0.setFromAxisAngle(VRM_Z, -sa * d));
VRM_E.setFromQuaternion(VRM_Q, "YXZ");
if (VRM.oriBase === null)
VRM.oriBase = yaw - VRM_E.y;
VRM.turn = VRM.oriBase;
vrmTidyHeading();
yaw = VRM.oriBase + VRM_E.y;
pitch = Math.max(-1.35, Math.min(1.35, VRM_E.x));
}
VRM.stick = VRM.walkHeld ? { f: 1, s: 0, mag: 0.62, run: false } : null;
VRM.setYaw = yaw;
},
function () {
var s = renderer.getSize(VRM_V2), w = s.x, h = s.y;
var a0 = camera.aspect;
camera.aspect = (w / 2) / h;
camera.updateProjectionMatrix();
camera.updateMatrixWorld();
VRM.st.update(camera);
vrmThroughGfx(function () {
renderer.setScissorTest(true);
renderer.setScissor(0, 0, w / 2, h);
renderer.setViewport(0, 0, w / 2, h);
renderer.render(scene, VRM.st.cameraL);
renderer.setScissor(w / 2, 0, w / 2, h);
renderer.setViewport(w / 2, 0, w / 2, h);
renderer.render(scene, VRM.st.cameraR);
renderer.setScissorTest(false);
renderer.setViewport(0, 0, w, h);
});
camera.aspect = a0;
camera.updateProjectionMatrix();
var now = performance.now();
if (now - VRM.hudAt > 500) {
VRM.hudAt = now;
var t = vrmScreenText();
if (t !== VRM.hudText) {
VRM.hudText = t;
["vrm-say-l", "vrm-say-r"].forEach(function (id) { var el = document.getElementById(id); if (el) {
if (t)
el.textContent = t;
el.style.opacity = t ? "1" : "0";
} });
}
}
},
function (on) {
var el = document.getElementById("vrm-card");
if (!on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "vrm-card";
el.style.cssText = "position:fixed;inset:0;z-index:90;touch-action:none;-webkit-user-select:none;user-select:none";
var say = "position:absolute;bottom:22%;width:38%;transform:translateX(-50%);text-align:center;font:600 13px system-ui,sans-serif;color:#EDE6D6;" +
"background:rgba(10,12,22,.78);border:1px solid rgba(150,170,210,.6);border-radius:8px;padding:6px 8px;white-space:pre-line;opacity:0;transition:opacity .6s;pointer-events:none";
el.innerHTML = '<div style="position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:rgba(0,0,0,.55);pointer-events:none"></div>' +
'<div id="vrm-say-l" style="' + say + ';left:25%"></div><div id="vrm-say-r" style="' + say + ';left:75%"></div>' +
'<button id="vrm-x" type="button" aria-label="Leave the viewer" style="position:absolute;left:50%;top:8px;transform:translateX(-50%);width:40px;height:40px;border-radius:20px;' +
'border:1px solid rgba(200,210,230,.6);background:rgba(10,12,22,.75);color:#EDE6D6;font:600 18px system-ui;z-index:2">✕</button>';
el.querySelector("#vrm-x").addEventListener("click", function (e) { e.stopPropagation(); vrmCardStop(); });
var hold = null;
el.addEventListener("touchstart", function (e) {
if (e.target && e.target.id === "vrm-x")
return;
e.preventDefault();
VRM.touchAt = performance.now();
clearTimeout(hold);
hold = setTimeout(function () { VRM.walkHeld = true; }, 260);
}, { passive: false });
var up = function (e) {
if (e.target && e.target.id === "vrm-x")
return;
clearTimeout(hold);
if (!VRM.walkHeld && performance.now() - VRM.touchAt < 260)
vrmTap("KeyE");
VRM.walkHeld = false;
};
el.addEventListener("touchend", up, { passive: true });
el.addEventListener("touchcancel", up, { passive: true });
el.addEventListener("mousedown", function (e) { if (e.target && e.target.id === "vrm-x")
return; VRM.touchAt = performance.now(); clearTimeout(hold); hold = setTimeout(function () { VRM.walkHeld = true; }, 260); });
el.addEventListener("mouseup", up);
document.body.appendChild(el);
}
el.style.display = "block";
}
];
});
