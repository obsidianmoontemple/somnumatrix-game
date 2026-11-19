/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(416, function () {
"use strict";
return [
function (root) {
var L = root.querySelectorAll("button,a[href],select,input:not([type=hidden]),textarea,[role=button],[tabindex]:not([tabindex='-1']),summary,.jn,.rc"), out = [], vw = innerWidth, vh = innerHeight;
for (var i = 0; i < L.length; i++) {
var el = L[i];
if (el.disabled)
continue;
var r = el.getBoundingClientRect();
if (r.width < 4 || r.height < 4)
continue;
if (r.bottom < -2000 || r.top > vh + 2000 || r.right < 0 || r.left > vw)
continue;
if (!gpdVisible(el))
continue;
out.push({ el: el, r: r });
}
return out;
},
function (el) {
if (GPD.focus && GPD.focus !== el)
GPD.focus.classList.remove("gpd-ring");
if (!el) {
var old = document.querySelectorAll(".gpd-ring");
for (var i = 0; i < old.length; i++)
old[i].classList.remove("gpd-ring");
}
GPD.focus = el;
if (!el)
return;
el.classList.add("gpd-ring");
if (!/INPUT|TEXTAREA|SELECT/.test(el.tagName)) {
try {
el.focus({ preventScroll: true });
}
catch (e) { }
}
else if (document.activeElement && document.activeElement !== el && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
try {
document.activeElement.blur();
}
catch (e) { }
}
try {
el.scrollIntoView({ block: "nearest", inline: "nearest" });
}
catch (e) { }
},
function (dx, dy) {
var root = gpdPanel();
if (!root)
return;
var T = gpdTargets(root);
if (!T.length)
return;
var cur = GPD.focus && root.contains(GPD.focus) && gpdVisible(GPD.focus) ? GPD.focus : null;
if (!cur) {
T.sort(function (a, b) { return (a.r.top - b.r.top) || (a.r.left - b.r.left); });
var inView = T.filter(function (t) { return t.r.top >= 0 && t.r.top < innerHeight && t.el.tagName !== "TEXTAREA"; });
var first = inView.filter(function (t) { return t.el.classList.contains("primary"); })[0] || inView[0] || T[0];
return gpdRing(first.el);
}
var c = cur.getBoundingClientRect(), cx = c.left + c.width / 2, cy = c.top + c.height / 2, best = null, bs = 1e12;
T.forEach(function (t) {
if (t.el === cur || cur.contains(t.el) || t.el.contains(cur))
return;
var x = t.r.left + t.r.width / 2, y = t.r.top + t.r.height / 2, ax = x - cx, ay = y - cy;
var along = dx ? ax * dx : ay * dy;
if (along <= 2)
return;
var off = dx ? Math.max(0, Math.max(t.r.top, c.top) - Math.min(t.r.bottom, c.bottom)) : Math.max(0, Math.max(t.r.left, c.left) - Math.min(t.r.right, c.right));
var side = dx ? Math.abs(ay) : Math.abs(ax), sc = along + off * 4 + side * (dx ? 0.6 : 0.25);
if (sc < bs) {
bs = sc;
best = t.el;
}
});
if (best)
gpdRing(best);
else if (dy) {
var sb = gpdScroller(cur) || gpdScroller(root);
if (sb)
sb.scrollBy(0, dy * 160);
}
},
function (dir) {
var el = GPD.focus;
if (!el || !document.contains(el))
return false;
if (el.tagName === "SELECT") {
var n = el.options.length, i = el.selectedIndex;
for (var k = 0; k < n; k++) {
i = (i + dir + n) % n;
if (!el.options[i].disabled)
break;
}
el.selectedIndex = i;
el.dispatchEvent(new Event("input", { bubbles: true }));
el.dispatchEvent(new Event("change", { bubbles: true }));
return true;
}
if (el.tagName === "INPUT" && el.type === "range") {
var st = +el.step || ((+el.max - +el.min) / 20) || 1;
el.value = Math.max(+el.min, Math.min(+el.max, +el.value + dir * st));
el.dispatchEvent(new Event("input", { bubbles: true }));
el.dispatchEvent(new Event("change", { bubbles: true }));
return true;
}
return false;
},
function () {
var el = GPD.focus;
if (!el || !document.contains(el) || !gpdVisible(el)) {
gpdNav(0, 1);
return;
}
if (el.tagName === "INPUT" && /checkbox|radio/.test(el.type)) {
el.click();
return;
}
if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
el.focus();
return;
}
if (el.tagName === "SELECT") {
gpdAdjust(1);
return;
}
el.click();
},
function (act, down) {
var k = GPD_KEYS[act];
if (!k)
return;
var t = document.activeElement && document.activeElement !== document.body && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) ? document.activeElement : document.body;
var ev = null;
try {
ev = new KeyboardEvent(down ? "keydown" : "keyup", { code: k[0], key: k[1], bubbles: true, cancelable: true });
t.dispatchEvent(ev);
}
catch (e) { }
if (typeof keys !== "undefined")
keys[k[0]] = !!down;
return !!(ev && ev.defaultPrevented);
},
function (act, down) {
if (!down) {
if (GPD_HOLD[act])
gpdKey(act, false);
return;
}
GPD.used = true;
var walking = typeof walkMode !== "undefined" && walkMode;
if (act === "back") {
gpdRing(null);
if (typeof PSTD !== "undefined" && PSTD.sheet && PSTD.sheet.classList.contains("on") && typeof psClose === "function") {
psClose();
return;
}
var inWorld = typeof WLD !== "undefined" && !!WLD.on;
if (typeof goBack === "function")
goBack(inWorld ? true : undefined);
else if (typeof backOneStep === "function")
backOneStep();
return;
}
if (act === "menu") {
if (walking && typeof psOpen === "function" && typeof PSTD !== "undefined" && PSTD.sheet) {
if (PSTD.sheet.classList.contains("on"))
psClose();
else
psOpen();
}
else {
var p = document.getElementById("panel");
if (p)
p.classList.toggle("open");
}
gpdRing(null);
return;
}
if (act === "phone") {
var pb = document.getElementById("ph-btn");
if (pb)
pb.click();
gpdRing(null);
return;
}
if (act === "journal") {
if (typeof openJournal === "function")
openJournal();
gpdRing(null);
return;
}
if (act === "run") {
GPD.run = !GPD.run;
gpdToast(GPD.run ? "Running" : "Walking");
return;
}
if (act === "inspect") {
if (walking && typeof pick === "function")
pick();
else if (typeof tapAt === "function")
tapAt(innerWidth / 2, innerHeight / 2);
return;
}
if (act === "pack") {
if (typeof BKP !== "undefined" && typeof bkpOpen === "function") {
BKP.open ? bkpClose() : bkpOpen();
gpdRing(null);
return;
}
}
if (act === "talk") {
var before = gpdTopLayer(), took = gpdKey("talk", true);
setTimeout(function () { gpdKey("talk", false); }, 60);
if (!took && walking && gpdTopLayer() === before && !(typeof nearChar !== "undefined" && nearChar) && typeof armsReach === "function")
armsReach();
return;
}
gpdKey(act, true);
if (!GPD_HOLD[act])
setTimeout(function () { gpdKey(act, false); }, 60);
},
function () {
var p = gpdPad(), c = gpdCfg();
if (!p) {
clearInterval(GPD.raf);
GPD.raf = 0;
GPD.on = false;
GPD.prev = [];
return;
}
if (gpdInXR() || !c.on && !GPD.listen) {
GPD.prev = p.buttons.map(function (b) { return b.pressed; });
return;
}
var now = performance.now(), dt = Math.min(0.05, (now - (GPD.t || now)) / 1000);
GPD.t = now;
if (GPD.name !== p.id) {
GPD.name = p.id;
gpdPaintSet();
}
var B = p.buttons.map(function (b, i) { return gpdPressed(p, i); });
if (GPD.listen) {
for (var i = 0; i < B.length; i++)
if (B[i] && !GPD.prev[i]) {
c.map[GPD.listen] = i;
GPD.listen = null;
gpdSave();
gpdPaintSet();
break;
}
GPD.prev = B;
gpdLive(p, B);
return;
}
var walking = typeof walkMode !== "undefined" && walkMode, panel;
if (now - (GPD.pAt || 0) > 200 || GPD.pWalk !== walking || B.some(function (x, i) { return x && !GPD.prev[i]; })) {
GPD.pAt = now;
GPD.pWalk = walking;
GPD.pEl = walking ? gpdTopLayer() : gpdPanel();
}
panel = GPD.pEl;
GPD.menu = !!panel;
if (GPD.pAt === now) {
var pr = panel && panel.getBoundingClientRect();
GPD.big = !walking || !!pr && pr.width * pr.height >= innerWidth * innerHeight * 0.08;
}
GPD.stickMenu = GPD.menu && GPD.big;
if (GPD.stickMenu && walking) {
["jump", "down", "cityview"].forEach(function (a) { if (GPD.held[a]) {
GPD.held[a] = 0;
gpdKey(a, false);
} });
}
var map = {};
GPD_ACTS.forEach(function (a) { map[gpdBtnOf(a[0])] = a[0]; });
var a0 = gpdBtnOf("jump"), b0 = gpdBtnOf("back");
for (var i = 0; i < B.length; i++) {
var dn = B[i] && !GPD.prev[i], up = !B[i] && GPD.prev[i];
if (!dn && !up)
continue;
if (GPD.menu) {
if (!dn)
continue;
if (i === 12 || i === 13 || i === 14 || i === 15) {
gpdDir(i);
GPD.rep = { i: i, at: now + 380 };
continue;
}
if (i === a0) {
gpdPress();
continue;
}
if (i === b0) {
gpdAct("back", true);
continue;
}
if (i === 4 || i === 5) {
var sc = gpdScroller(GPD.focus) || gpdScroller(panel);
if (sc)
sc.scrollBy(0, (i === 5 ? 1 : -1) * sc.clientHeight * 0.8);
continue;
}
var ma = map[i];
if (ma === "menu" || ma === "pack" || ma === "phone") {
gpdAct(ma, true);
continue;
}
if (!GPD.stickMenu && ma && walking && !GPD_HOLD[ma])
gpdAct(ma, true);
continue;
}
var act = map[i];
if (!act)
continue;
if (!walking && (act === "jump" || act === "down"))
continue;
GPD.held[act] = dn ? 1 : 0;
gpdAct(act, dn);
}
if (GPD.menu && GPD.rep.i !== undefined) {
if (!B[GPD.rep.i])
GPD.rep = {};
else if (now > GPD.rep.at) {
gpdDir(GPD.rep.i);
GPD.rep.at = now + 120;
}
}
var L = gpdStick(p, 0, 1), R = gpdStick(p, 2, 3);
if (GPD.stickMenu) {
var dir = Math.abs(L.x) > Math.abs(L.y) ? (L.x > 0.5 ? 15 : L.x < -0.5 ? 14 : -1) : (L.y > 0.5 ? 13 : L.y < -0.5 ? 12 : -1);
if (dir < 0)
GPD.sdir = -1;
else if (dir !== GPD.sdir || now > GPD.snext) {
gpdDir(dir);
GPD.snext = now + (dir !== GPD.sdir ? 380 : 140);
GPD.sdir = dir;
}
if (R.m) {
var sc2 = gpdScroller(GPD.focus) || gpdScroller(panel);
if (sc2)
sc2.scrollBy(0, R.y * 900 * dt);
}
if (L.m || R.m || B.some(Boolean))
GPD.used = true;
}
else if (walking) {
var inv = c.invert ? -1 : 1;
if (R.m) {
yaw -= R.x * 2.6 * c.look * dt;
pitch = Math.max(-1.35, Math.min(1.35, pitch - R.y * 1.9 * c.look * inv * dt));
GPD.used = true;
}
if (L.m)
GPD.used = true;
}
else if (typeof orb !== "undefined") {
if (L.m && typeof panOrbit === "function")
panOrbit(-L.x * 600 * dt, -L.y * 600 * dt);
if (R.m) {
orb.t -= R.x * 2.2 * c.look * dt;
orb.p = Math.max(0.12, Math.min(1.5, orb.p + R.y * 1.4 * c.look * dt));
}
var zt = (p.buttons[7] ? p.buttons[7].value : 0) - (p.buttons[6] ? p.buttons[6].value : 0);
if (Math.abs(zt) > 0.1)
orb.r = Math.max(25, Math.min(1400, orb.r * (1 + zt * 1.4 * dt)));
if (L.m || R.m || Math.abs(zt) > 0.1) {
if (typeof idle !== "undefined")
idle = 0;
}
}
if (B.some(Boolean) || L.m || R.m)
GPD.padAt = Date.now();
GPD.prev = B;
gpdLive(p, B);
},
function (h) {
var el = document.getElementById("gpd-toast");
if (!el) {
el = document.createElement("div");
el.id = "gpd-toast";
document.body.appendChild(el);
}
el.innerHTML = h;
el.classList.add("on");
clearTimeout(GPD.toastT);
GPD.toastT = setTimeout(function () { el.classList.remove("on"); }, h.length > 60 ? 6500 : 2200);
},
function (e) {
var t = e.target, c = gpdCfg();
var gb = t.closest && t.closest("[data-gb]");
if (gb) {
var a = gb.getAttribute("data-gb");
GPD.listen = GPD.listen === a ? null : a;
gpdPaintSet();
if (GPD.listen && !gpdPad())
gpdToast("Plug a controller in and press any button on it first.");
return;
}
if (t.closest && t.closest("[data-gr]")) {
c.map = gpdDefaults().map;
c.swap = false;
GPD.listen = null;
gpdSave();
gpdPaintSet();
}
},
function (e) {
var t = e.target, k = t.getAttribute && t.getAttribute("data-g");
if (!k)
return;
var c = gpdCfg();
if (t.type === "checkbox")
c[k] = !!t.checked;
else
c[k] = +t.value;
gpdSave();
var v = document.getElementById("gpd-" + (k === "mouse" ? "ms" : k) + "-v");
if (v)
v.textContent = k === "dead" ? Math.round(c.dead * 100) + "%" : (+c[k]).toFixed(1);
},
function (p, B) {
var el = document.getElementById("gpd-live");
if (!el)
return;
var pan = document.getElementById("panel");
if (!pan || !pan.classList.contains("open"))
return;
var on = [];
B.forEach(function (x, i) { if (x)
on.push(GPD_BTN[i] || ("Button " + i)); });
var L = gpdStick(p, 0, 1), R = gpdStick(p, 2, 3);
if (L.m)
on.push("left stick");
if (R.m)
on.push("right stick");
var s = on.length ? "Pressing: " + on.join(", ") : "Press a button to test it.";
if (el.textContent !== s)
el.textContent = s;
},
function () {
var cv = typeof renderer !== "undefined" && renderer && renderer.domElement;
if (cv)
cv.addEventListener("contextmenu", function (e) { if (typeof walkMode !== "undefined" && walkMode) {
e.preventDefault();
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
} });
document.addEventListener("contextmenu", function (e) { if (document.pointerLockElement) {
e.preventDefault();
document.exitPointerLock();
} }, true);
addEventListener("mouseup", function (e) { if (e.button === 3 && typeof goBack === "function") {
e.preventDefault();
goBack();
} });
addEventListener("mousedown", function (e) { if (e.button === 3 || e.button === 4)
e.preventDefault(); });
setInterval(function () { if (!document.pointerLockElement || document.hidden)
return; if (gpdTopLayer() && document.exitPointerLock)
document.exitPointerLock(); }, 700);
}
];
});
