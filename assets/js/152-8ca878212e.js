/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UGB = { kiosk: null, staff: null, near: false, toldPay: 0, figs: {} };
var UGB_WIN = { x: -39, z: -2.4 };
(function () {
if (typeof UG2 === "undefined" || typeof ugBuild !== "function")
return;
if (typeof ugjKiosks === "function") {
ugjKiosks = function () { if (typeof UGJ !== "undefined" && UGJ.kiosks && typeof scene !== "undefined") {
scene.remove(UGJ.kiosks);
UGJ.kiosks = null;
} };
}
function M(c) { return new THREE.MeshLambertMaterial({ color: c }); }
function staffFig(id, col) {
var look = (typeof randomLook === "function") ? randomLook(id, "human") : {};
if (typeof csLookFill === "function")
try {
csLookFill(look, id);
}
catch (e) { }
look.top = col;
look.coat = col;
if (typeof jobDress === "function")
jobDress(look, { clerk: "Ticket clerk", master: "Station master", guard: "Platform guard", guard2: "Platform guard" }[id] || "Railway porter", "The Underground");
var g = buildFigure({ id: "__ugs_" + id, archetype: "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
var ub = ugBuild;
ugBuild = function () {
var fresh = !UG2.g;
ub.apply(this, arguments);
if (!fresh || !UG2.g || UGB.kiosk)
return;
var k = new THREE.Group(), wood = M(0x6A4A30), red = M(typeof UG_LINECOL !== "undefined" ? UG_LINECOL : 0xC03A2E), dark = M(0x1C1D22);
var glass = new THREE.MeshBasicMaterial({ color: 0xFFE9B0, transparent: true, opacity: 0.3, depthWrite: false });
function bx(w, h, d, px, py, pz, m) { var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(px, py, pz); k.add(me); return me; }
bx(1.4, 1.05, 2.2, 0, 0.52, 0, wood);
bx(1.4, 1.25, 0.12, 0, 1.68, 1.04, wood);
bx(0.12, 1.25, 2.2, 0.64, 1.68, 0, wood);
bx(1.4, 0.22, 0.12, 0, 2.2, -1.04, wood);
bx(1.3, 1.0, 0.05, 0, 1.62, -1.04, glass);
bx(0.9, 0.06, 0.35, 0, 1.08, -1.22, wood);
bx(0.05, 1.0, 1.95, -0.68, 1.62, 0, glass);
bx(0.35, 0.06, 0.9, -0.86, 1.08, 0, wood);
bx(1.6, 0.16, 2.4, 0, 2.38, 0, red);
bx(1.7, 0.1, 2.5, 0, 2.5, 0, dark);
var sign = new THREE.MeshBasicMaterial({ map: ugTex("Tickets", "Booking office", 256, 96, "#1E2F6E", "#FFFFFF") });
var sg = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.74), sign);
sg.position.set(-0.82, 2.95, 0);
sg.rotation.y = -Math.PI / 2;
k.add(sg);
var sg2 = sg.clone();
sg2.position.x = 0.82;
sg2.rotation.y = Math.PI / 2;
k.add(sg2);
k.position.set(UGB_WIN.x, 0, UGB_WIN.z);
k.rotation.y = Math.PI / 2;
k.traverse(function (m) { m.raycast = function () { }; });
UG2.g.add(k);
UGB.kiosk = k;
UGB.figs.clerk = staffFig("clerk", 0x1E2F6E);
UGB.figs.clerk.position.set(UGB_WIN.x, 0, UGB_WIN.z - 0.25);
UGB.figs.clerk.rotation.y = 0;
UG2.g.add(UGB.figs.clerk);
UGB.figs.master = staffFig("master", 0x1E2F6E);
UGB.figs.master.position.set(2.6, 0, 1.4);
UGB.figs.master.rotation.y = -Math.PI / 2;
UG2.g.add(UGB.figs.master);
UGB.figs.guard = staffFig("guard", 0x2A2A30);
UGB.figs.guard.position.set(16, 0, (typeof UG_PLAT !== "undefined" ? UG_PLAT : 3.9) - 1.2);
UGB.figs.guard.rotation.y = Math.PI / 2;
UG2.g.add(UGB.figs.guard);
UGB.figs.guard2 = staffFig("guard2", 0x2A2A30);
UGB.figs.guard2.position.set(-16, 0, -(typeof UG_PLAT !== "undefined" ? UG_PLAT : 3.9) + 1.2);
UGB.figs.guard2.rotation.y = -Math.PI / 2;
UG2.g.add(UGB.figs.guard2);
};
function onShift(role) {
var h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
if (role === "clerk")
return true;
if (role === "master" || role === "guard" || role === "guard2")
return h >= 5.5 && h < 24;
return true;
}
function staffTick() {
if (!UGB.kiosk)
return;
var mine = typeof UGJ !== "undefined" && UGJ.window && UGJ.window.under && UGJ.window.i === UG2.at;
Object.keys(UGB.figs).forEach(function (r) { var g = UGB.figs[r]; g.visible = onShift(r) && !(r === "clerk" && mine); });
var cl = UGB.figs.clerk;
if (cl) {
var want = atSide() ? -Math.PI / 2 : 0;
cl.rotation.y += (want - cl.rotation.y) * 0.15;
}
var t = performance.now() / 1000;
Object.keys(UGB.figs).forEach(function (r, i) { var L = UGB.figs[r].userData.limbs; if (L && L.ra)
L.ra.rotation.x = (r === "clerk" ? Math.sin(t * 1.6) * 0.35 : Math.sin(t * 0.8 + i) * 0.08); });
}
ugShow = function (from) {
if (UG2.on)
return;
var i = ugIndexOf(from);
if (i < 0)
return setStatus("That station is not on the line.");
UG2.paid = false;
UG2.staffPass = false;
ug2Down(i);
setStatus("<b>" + esc(ugName(i)) + "</b> — down the stairs. Buy your ticket at the <b>booking office</b> just ahead (press <b>U</b> at the window), then wait for your train.");
};
function stationHere() { var L = ugLine().list; return L[UG2.at]; }
function atSide() { if (!UG2.on || UG2.ride || !UGB.kiosk)
return false; var P = camera.position; return Math.hypot(P.x - (UG2.cx + UGB_WIN.x - 2.3), P.z - (UG2.cz + UGB_WIN.z)) < 1.6; }
function atWindow() { if (!UG2.on || UG2.ride || !UGB.kiosk)
return false; var P = camera.position; return Math.hypot(P.x - (UG2.cx + UGB_WIN.x), P.z - (UG2.cz + UGB_WIN.z + 1.5)) < 1.8 || atSide(); }
function openWindow() { var st = stationHere(); if (st && typeof ugBooking === "function")
ugBooking(st); }
if (typeof ug2Tick === "function") {
var ut = ug2Tick;
ug2Tick = function (dt) {
var r = ut.apply(this, arguments);
try {
if (UG2.on && !UG2.ride && atWindow() && !(typeof ugOpen !== "undefined" && ugOpen) && UG2.prompt && UG2.prompt.style.display !== "block")
ugPrompt("<b>The booking office</b> · buy your ticket from the clerk · <b>press U</b> or tap", openWindow);
}
catch (e) { }
return r;
};
}
if (typeof ugbDown === "function") {
var bd = ugbDown;
ugbDown = function () { if (UG2.on) {
UG2.paid = true;
if (typeof ugbClose === "function")
ugbClose();
setStatus("<b>Ticket in hand.</b> Wait for your train: the board shows when it is due.");
return;
} return bd.apply(this, arguments); };
}
if (typeof ugbPass === "function") {
ugbPass = function () {
var B = UGJ.book;
if (!B)
return;
ugbMsg("Showing your pass…");
ugjRpc("ug_staff_pass", { p_station: B.key }).then(function (o) {
if (UGJ.book !== B)
return;
if (!o || !o.ok) {
ugbMsg(esc((o && o.say) || "Your pass was not taken."));
return;
}
UG2.paid = true;
UG2.staffPass = true;
ugbClose();
if (!UG2.on)
ug2Down(B.i);
if (typeof ugjStaffPaint === "function")
ugjStaffPaint(true);
});
};
}
if (typeof ugjWindowTake === "function") {
var wt = ugjWindowTake;
ugjWindowTake = function () { var r = wt.apply(this, arguments); setTimeout(function () { if (UGJ.window && UG2.on) {
UGJ.window.under = true;
UGJ.window.i = UG2.at;
} }, 1200); return r; };
}
if (typeof ugjWindowTick === "function") {
var wk = ugjWindowTick;
ugjWindowTick = function (dt) {
var W = UGJ.window;
if (W && !W.under && UG2.on) {
W.under = true;
W.i = UG2.at;
}
if (W && W.under) {
if (!UG2.on || UG2.at !== W.i || !atWindow() && Math.hypot(camera.position.x - (UG2.cx + UGB_WIN.x), camera.position.z - (UG2.cz + UGB_WIN.z)) > 7) {
ugjWindowClose(true);
return;
}
var on = UG2.on;
UG2.on = false;
var sx = W.x, sz = W.z;
W.x = camera.position.x;
W.z = camera.position.z;
try {
wk.call(this, dt);
}
finally {
UG2.on = on;
if (UGJ.window) {
UGJ.window.x = sx;
UGJ.window.z = sz;
}
}
return;
}
return wk.apply(this, arguments);
};
}
if (typeof ug2Board === "function") {
var b0 = ug2Board;
ug2Board = function (d, cab) {
var free = UG2.paid || UG2.staffPass || (typeof UGJ !== "undefined" && UGJ.test) || cab;
if (!free) {
var now = performance.now();
if (now - UGB.toldPay > 4000) {
UGB.toldPay = now;
setStatus("<b>No ticket.</b> Buy one at the booking office at the end of the platform (press <b>U</b> at the window).");
}
return false;
}
return b0.apply(this, arguments);
};
}
if (typeof ug2Off === "function") {
var off = ug2Off;
ug2Off = function () { UG2.paid = false; UG2.staffPass = false; return off.apply(this, arguments); };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (UG2.on && !UG2.ride && UGB.kiosk && Math.abs(x - (UG2.cx + UGB_WIN.x)) < 1.35 && Math.abs(z - (UG2.cz + UGB_WIN.z)) < 0.95)
return true;
return ba.apply(this, arguments);
};
}
addEventListener("keydown", function (e) {
if (document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName))
return;
if ((e.code === "KeyU" || e.code === "KeyE") && atWindow() && !(typeof ugOpen !== "undefined" && ugOpen)) {
e.preventDefault();
e.stopImmediatePropagation();
openWindow();
}
}, true);
(function loop() {
try {
if (UG2.on) {
staffTick();
var n = atWindow();
if (n && !UGB.near)
setStatus("<b>The booking office.</b> Press <b>U</b> to buy a ticket" + (typeof UGJ !== "undefined" && UGJ.test ? "" : ", show your staff pass, or take the window") + ".");
UGB.near = n;
}
}
catch (e) { }
requestAnimationFrame(loop);
})();
})();
var UGO = { g: null, door: null, inside: false, x0: 49, x1: 61, zh: 3.5, figs: [], panel: null, panelAt: 0, rota: null, rotaAt: 0, near: false, from: null, told: false };
var UGO_DOOR = { x: 46.2, z: 3.05 };
function ugoHome() { if (typeof UNDERGROUND === "undefined" || !UNDERGROUND.length || typeof ugIndexOf !== "function")
return -1; return ugIndexOf(UNDERGROUND[0]); }
function ugoHere() { return typeof UG2 !== "undefined" && UG2.on && UG2.at === ugoHome() && UG2.at >= 0; }
function ugoBuild() { return __ZC(152, 0, this, arguments, new.target); }
function ugoName(title, seed, sex) { return __ZC(152, 1, this, arguments, new.target); }
function ugoPaintPanel() { return __ZC(152, 2, this, arguments, new.target); }
function ugoPaintRota() { return __ZC(152, 3, this, arguments, new.target); }
function ugoOnShift(f) { var h = (typeof cityHourNow === "function") ? cityHourNow() : 12; var a = f.hours[0], b = f.hours[1]; return b > 24 ? (h >= a || h < b - 24) : (h >= a && h < b); }
function ugoEnter() { return __ZC(152, 4, this, arguments, new.target); }
function ugoLeave() {
UGO.inside = false;
camera.position.set(UG2.cx + UGO_DOOR.x - 0.6, 1.72, UG2.cz + UGO_DOOR.z);
yaw = Math.PI / 2;
pitch = 0;
setStatus("Back on the platform.");
}
(function () {
if (typeof UG2 === "undefined" || typeof ugBuild !== "function")
return;
var ub = ugBuild;
ugBuild = function () { ub.apply(this, arguments); try {
ugoBuild();
}
catch (e) {
if (window.console)
console.warn("[ug office]", e);
} };
if (typeof ugPrompt === "function") {
var up = ugPrompt;
ugPrompt = function (html, fn) { if ((UGO.inside || UGO.claim) && !UGO.mine)
return; return up.apply(this, arguments); };
}
if (typeof ug2Off === "function") {
var of = ug2Off;
ug2Off = function () { UGO.inside = false; return of.apply(this, arguments); };
}
if (typeof ug2Down === "function") {
var dn = ug2Down;
ug2Down = function (i) { UGO.inside = false; UGO.told = false; return dn.apply(this, arguments); };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (UGO.inside && UG2.on && !UG2.ride) {
var lx = x - UG2.cx, lz = z - UG2.cz, x0 = UGO.x0, x1 = UGO.x1, zh = UGO.zh, cx = (x0 + x1) / 2;
if (lx < x0 + 0.35 || lx > x1 - 0.35 || Math.abs(lz) > zh - 0.35)
return true;
var B = [[x0 + 3, -zh + 0.9, 1.1, 0.6], [x1 - 0.3, -0.4, 0.55, 2.9], [cx + 0.8, zh - 0.75, 1.2, 0.6], [cx + 2.6, zh - 0.4, 0.6, 0.55], [x0 + 0.4, -zh + 3.35, 0.45, 1.5], [x1 - 2.6, zh - 1.4, 0.85, 0.65], [x1 - 0.9, zh - 0.3, 0.75, 0.45]];
for (var k = 0; k < B.length; k++)
if (Math.abs(lx - B[k][0]) < B[k][2] && Math.abs(lz - B[k][1]) < B[k][3])
return true;
return false;
}
return ba.apply(this, arguments);
};
}
(function loop() {
try {
if (typeof UG2 !== "undefined" && UG2.on && UGO.g) {
var home = ugoHere();
UGO.g.visible = home;
UGO.door.visible = home;
if (!home && UGO.inside)
ugoLeave();
if (home && !UGO.told && !UG2.ride) {
UGO.told = true;
setTimeout(function () { if (ugoHere() && !UGO.inside)
setStatus("<b>" + esc(ugName(UG2.at)) + "</b> is the line's home station: <b>the Underground Office</b> is through the green staff door at the far end of the platform, beside the Way Out."); }, 6000);
}
var P = camera.position, lx = P.x - UG2.cx, lz = P.z - UG2.cz, h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
UGO.claim = false;
if (home && !UG2.ride) {
UGO.mine = true;
if (UGO.inside) {
if (lx < UGO.x0 + 1.6 && lz > UGO.zh - 2.0)
ugPrompt("<b>Back to the platforms</b> · <b>press E</b> or tap", ugoLeave);
else
ugPrompt(null);
}
else if (lx > 44 && lz > 2.4 && lz < 3.9) {
UGO.claim = true;
ugPrompt("<b>The Underground Office</b> (staff door) · <b>press E</b> or tap", ugoEnter);
}
else if (UGO.wasNear)
ugPrompt(null);
UGO.wasNear = UGO.claim;
UGO.mine = false;
}
var now = performance.now() / 1000;
if (UGO.inside) {
if (now - UGO.panelAt > 1) {
UGO.panelAt = now;
ugoPaintPanel();
}
if (now - UGO.rotaAt > 20) {
UGO.rotaAt = now;
ugoPaintRota();
}
if (UGO.hand)
UGO.hand.rotation.z = -(h % 12) / 12 * 6.283;
UGO.figs.forEach(function (f, i) { f.g.visible = ugoOnShift(f); var L = f.g.userData.limbs; if (L && L.ra)
L.ra.rotation.x = Math.sin(now * (f.title === "Booking clerk" ? 1.8 : 0.7) + i) * 0.25; });
(UGO.lamps || []).forEach(function (m, i) { m.visible = !(h >= 23.5 || h < 5.5) || i > 1; });
}
}
}
catch (e) { }
requestAnimationFrame(loop);
})();
})();
