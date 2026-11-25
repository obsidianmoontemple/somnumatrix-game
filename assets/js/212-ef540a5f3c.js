/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var VRM = { xrOk: false, xr: null, card: false, open: false, turn: 0, setYaw: null, inLoop: false, lastRun: 0,
dolly: null, cam: null, hud: null, hudC: null, hudTex: null, hudText: "", hudAt: 0, hudA: 0, hands: [], held: {}, btn: {}, stick: null,
fov0: null, pr0: null, stText: "", stAt: 0, ori: null, oriBase: null, touchAt: 0, touchId: null, walkHeld: false, st: null };
function vrmCheck() {
try {
if (navigator.xr && navigator.xr.isSessionSupported)
navigator.xr.isSessionSupported("immersive-vr").then(function (ok) { VRM.xrOk = !!ok; if (VRM.open)
vrmPaint(); }).catch(function () { });
}
catch (e) { }
}
vrmCheck();
function vrmHeadset() { return /OculusBrowser|Quest|Pico|Wolvic|\bVR\b/.test(navigator.userAgent || ""); }
function vrmOpen() { VRM.open = true; vrmCheck(); vrmPaint(); }
function vrmPaint() { return __ZC(212, 0, this, arguments, new.target); }
(function () {
if (typeof animate !== "function")
return;
var draw = animate;
VRM.draw = draw;
animate = function () {
if (VRM.xr && !VRM.inLoop)
return;
VRM.lastRun = performance.now();
if (VRM.card)
vrmCardPre();
return draw.apply(this, arguments);
};
})();
(function () {
if (typeof renderView !== "function")
return;
var plain = renderView;
renderView = function () {
if (VRM.xr) {
vrmXrRender();
return;
}
if (VRM.card) {
vrmCardRender();
return;
}
return plain.apply(this, arguments);
};
})();
(function () {
var raf = window.requestAnimationFrame;
if (typeof raf !== "function")
return;
window.requestAnimationFrame = function (cb) { if (VRM.inLoop && cb === animate)
return 0; return raf.apply(window, arguments); };
})();
(function () {
if (typeof padInput !== "function")
return;
var pad = padInput;
padInput = function () { if ((VRM.xr || VRM.card) && VRM.stick)
return VRM.stick; return pad.apply(this, arguments); };
})();
function vrmKey(code, down) {
var key = code === "Escape" ? "Escape" : code === "Space" ? " " : code.replace(/^Key/, "").toLowerCase();
dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", { code: code, key: key, bubbles: true }));
}
function vrmTap(code) { vrmKey(code, true); setTimeout(function () { vrmKey(code, false); }, 70); }
function vrmHold(code, on) {
if (!!VRM.held[code] === !!on)
return;
VRM.held[code] = !!on;
keys[code] = !!on;
vrmKey(code, !!on);
}
function vrmLetGo() { Object.keys(VRM.held).forEach(function (k) { if (VRM.held[k])
vrmHold(k, false); }); VRM.stick = null; }
function vrmKeepGameTurn() { if (VRM.setYaw !== null && Math.abs(yaw - VRM.setYaw) > 1e-6)
VRM.turn += yaw - VRM.setYaw; }
function vrmTidyHeading() {
var tp = Math.PI * 2;
if (VRM.turn > tp || VRM.turn < -tp) {
var k = Math.round(VRM.turn / tp) * tp;
VRM.turn -= k;
if (typeof yaw === "number")
yaw -= k;
if (VRM.oriBase !== null)
VRM.oriBase -= k;
}
}
function vrmScreenText() { return __ZC(212, 1, this, arguments, new.target); }
function vrmLog(t) {
var L = VRM.log || (VRM.log = []);
L.push(Math.round((performance.now() - (VRM.logT0 || 0)) / 100) / 10 + "s " + t);
if (L.length > 14)
L.splice(1, 1);
try {
localStorage.setItem("somnu.vrlog", L.join(" · "));
}
catch (e) { }
}
function vrmXrStart() { return __ZC(212, 2, this, arguments, new.target); }
function vrmXrEnded() { return __ZC(212, 3, this, arguments, new.target); }
var VRM_E = new THREE.Euler(0, 0, 0, "YXZ"), VRM_V = new THREE.Vector3();
function vrmXrFrame() { return __ZC(212, 4, this, arguments, new.target); }
function vrmXrRender() { return __ZC(212, 5, this, arguments, new.target); }
function vrmThroughGfx(draw) { return __ZC(212, 6, this, arguments, new.target); }
function vrmXrInput(dt) { return __ZC(212, 7, this, arguments, new.target); }
var VRP = { el: null, mode: "", menu: [], pick: null, page: 0, at: 0, sig: "", place: false, dirty: false,
main: null, kb: null, tag: null, s: 1, R: null, kbFor: null, shift: false, hot: null,
hit: [], down: [], poke: [], fist: [], cur: [], walkHand: null, hotAt: [], hotWas: [], pic: null, hoverDirty: false,
ray: new THREE.Raycaster(), q: new THREE.Quaternion(), o: new THREE.Vector3(), d: new THREE.Vector3(), v: new THREE.Vector3() };
var VRP_SKIP = /^(vrm-|dpad$|pdside$|pd-|pdview$|tbtns$|joy$|status$|world$|scrim$|walkhint$|place$|pf-tip$|hud$|plotbar$)/;
var VRP_PX = 0.95 / 1024;
function vrpBoard(name, w, h) { return __ZC(212, 8, this, arguments, new.target); }
function vrpSize(b, w, h, mw, mh) { return __ZC(212, 9, this, arguments, new.target); }
function vrpRayAt(b, o, d) {
if (!b || !b.mesh.visible)
return null;
VRP.ray.set(o, d);
var hit = VRP.ray.intersectObject(b.mesh, false)[0];
if (!hit || !hit.uv)
return null;
return { b: b, x: hit.uv.x * b.c.width, y: (1 - hit.uv.y) * b.c.height, p: hit.point.clone(), dist: hit.distance };
}
function vrpTipAt(b, p) {
if (!b || !b.mesh.visible)
return null;
var l = b.mesh.worldToLocal(VRP.v.copy(p));
if (Math.abs(l.x) > 0.5 || Math.abs(l.y) > 0.5)
return null;
return { b: b, x: (l.x + 0.5) * b.c.width, y: (0.5 - l.y) * b.c.height, z: l.z, p: p.clone() };
}
function vrpRound(x, X, Y, W, H, r) {
x.beginPath();
if (x.roundRect)
x.roundRect(X, Y, W, H, r);
else
x.rect(X, Y, W, H);
}
function vrpColour(c) { return c && c !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(c); }
function vrmPanelFind() { return __ZC(212, 10, this, arguments, new.target); }
function vrpPaintWin(b, el) { return __ZC(212, 11, this, arguments, new.target); }
function vrpPaintList(b, title, items) { return __ZC(212, 12, this, arguments, new.target); }
function vrpMenuItems() { return __ZC(212, 13, this, arguments, new.target); }
function vrpMenuSection(sec) {
VRP.sec = sec;
VRP.page = 0;
VRP.dirty = true;
VRP.menu = sec ? sec.items : vrpMenuItems();
}
var VRK_ROWS = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"], ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "'"], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "-", "?"], ["⇧", "z", "x", "c", "v", "b", "n", "m", ",", ".", "!"], ["Space", "Enter", "Done"]];
var VRK_URL = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"], ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "/"], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "-", "_"], ["⇧", "z", "x", "c", "v", "b", "n", "m", ":", ".", "="], ["Space", "Enter", "Done"]];
function vrpPaintKb(b) { return __ZC(212, 14, this, arguments, new.target); }
function vrpType(k) { return __ZC(212, 15, this, arguments, new.target); }
function vrpKbOpen(f) { return __ZC(212, 16, this, arguments, new.target); }
function vrpKbClose() {
if (VRP.kbFor)
try {
VRP.kbFor.dispatchEvent(new Event("change", { bubbles: true }));
VRP.kbFor.blur();
}
catch (e) { }
VRP.kbFor = null;
VRP.shift = false;
if (VRP.kb)
VRP.kb.mesh.visible = false;
VRP.sig = "";
}
function vrpClient(h) { return { x: VRP.R.l + h.x / VRP.s, y: VRP.R.t + h.y / VRP.s }; }
function vrpMouse(type, t, c) { return __ZC(212, 17, this, arguments, new.target); }
function vrpIsClose(b, h) { return b.close && Math.hypot(h.x - b.close.x, h.y - b.close.y) < b.close.r + 10; }
function vrpDown(h) { return __ZC(212, 18, this, arguments, new.target); }
function vrpMove(g, h) { return __ZC(212, 19, this, arguments, new.target); }
function vrpUp(g) { return __ZC(212, 20, this, arguments, new.target); }
function vrpBack() { return __ZC(212, 21, this, arguments, new.target); }
function vrpMenuToggle(on) {
if (on === undefined)
on = VRP.mode !== "menu";
if (VRP.kbFor)
vrpKbClose();
VRP.mode = on ? "menu" : "";
VRP.pick = null;
VRP.page = 0;
VRP.sig = "";
VRP.dirty = true;
VRP.sec = null;
if (on) {
VRP.menu = vrpMenuItems();
VRP.place = true;
}
}
function vrmBoardsTick() {
try {
vrmPanelTick();
}
catch (e) {
if (!VRP.errSaid) {
VRP.errSaid = 1;
console.warn("vr board", e);
vrmLog("board error: " + String(e && e.message || e).slice(0, 120));
}
}
}
function vrmPanelTick() { return __ZC(212, 22, this, arguments, new.target); }
function vrpHandsTick() { return __ZC(212, 23, this, arguments, new.target); }
function vrpTagTick() { return __ZC(212, 24, this, arguments, new.target); }
var VRQ = { ask: null, yes: null, ans: null };
(function () {
var oc = window.confirm, op = window.prompt, oa = window.alert;
window.confirm = function (m) {
if (!(window.VRM && VRM.xr))
return oc.apply(window, arguments);
m = String(m == null ? "" : m);
if (VRQ.yes === m) {
VRQ.yes = null;
return true;
}
vrqAsk({ kind: "confirm", msg: m });
return false;
};
window.prompt = function (m, d) {
if (!(window.VRM && VRM.xr))
return op.apply(window, arguments);
m = String(m == null ? "" : m);
if (VRQ.ans && VRQ.ans.m === m) {
var a = VRQ.ans.v;
VRQ.ans = null;
return a;
}
vrqAsk({ kind: "prompt", msg: m, val: d == null ? "" : String(d) });
return null;
};
window.alert = function (m) {
if (!(window.VRM && VRM.xr))
return oa.apply(window, arguments);
vrqAsk({ kind: "alert", msg: String(m == null ? "" : m) });
};
})();
function vrqAsk(q) { return __ZC(212, 25, this, arguments, new.target); }
function vrqAnswer(yes) { return __ZC(212, 26, this, arguments, new.target); }
function vrqPaint(b) { return __ZC(212, 27, this, arguments, new.target); }
function vrpScroll(h, dy) { return __ZC(212, 28, this, arguments, new.target); }
function vrpLetGo() { return __ZC(212, 29, this, arguments, new.target); }
function vrmHudMake() { return __ZC(212, 30, this, arguments, new.target); }
function vrmHudDraw(text) { return __ZC(212, 31, this, arguments, new.target); }
function vrmHudTick() { return __ZC(212, 32, this, arguments, new.target); }
function vrmCardStart() { return __ZC(212, 33, this, arguments, new.target); }
function vrmCardStop() { return __ZC(212, 34, this, arguments, new.target); }
function vrmOrient(e) { if (e.alpha === null && e.beta === null)
return; VRM.ori = { a: e.alpha || 0, b: e.beta || 0, g: e.gamma || 0 }; }
var VRM_Q = new THREE.Quaternion(), VRM_Q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), VRM_Q0 = new THREE.Quaternion(), VRM_Z = new THREE.Vector3(0, 0, 1), VRM_OE = new THREE.Euler();
function vrmCardPre() { return __ZC(212, 35, this, arguments, new.target); }
(function () {
var keep = vrmKeepGameTurn;
vrmKeepGameTurn = function () { var t0 = VRM.turn; keep(); if (VRM.card && VRM.oriBase !== null)
VRM.oriBase += VRM.turn - t0; };
})();
function vrmCardRender() { return __ZC(212, 36, this, arguments, new.target); }
var VRM_V2 = new THREE.Vector2();
function vrmCardUi(on) { return __ZC(212, 37, this, arguments, new.target); }
(function () {
var st = document.createElement("style");
st.textContent = "body.vrm-on>*:not(#world):not(#vrm-card):not(canvas):not(script):not(style){visibility:hidden!important}body.vrm-on #world{visibility:visible!important}";
document.head.appendChild(st);
})();
document.addEventListener("fullscreenchange", function () {
if (VRM.card && !document.fullscreenElement && VRM.fsWas)
vrmCardStop();
VRM.fsWas = !!document.fullscreenElement;
});
if (typeof backRegister === "function") {
backRegister({ order: 0, open: function () { return VRM.card; }, close: vrmCardStop });
backRegister({ order: 2, open: function () { return VRM.open; }, close: function () { VRM.open = false; vrmPaint(); } });
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-vr"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-vr";
b.textContent = "🥽 VR";
b.title = "VR mode: a headset, or your phone in a viewer";
b.onclick = vrmOpen;
var pk = document.getElementById("me-photo");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
try {
if (new URLSearchParams(location.search).has("vr")) {
var go = function () { setTimeout(function () { if (!VRM.xr && !VRM.open)
vrmOpen(); }, 2500); };
if (document.readyState === "complete")
go();
else
addEventListener("load", go);
}
}
catch (e) { }
})();
