/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GPD = { on: false, raf: 0, idx: -1, name: "", prev: [], held: {}, rep: {}, focus: null, lastNav: 0, listen: null, toastT: 0, used: false, menu: false,
KEY: "dreamwalker.gamepad", cfg: null };
var GPD_ACTS = [
["jump", "Jump / rise", 0], ["back", "Back", 1], ["talk", "Action: pick up, talk, open (E)", 2], ["use", "Use what you carry (F)", 3],
["take", "Take (G)", 4], ["view", "Change view (V)", 5], ["down", "Crouch / fall (C)", 6], ["inspect", "Inspect / click", 7],
["pack", "Backpack", 8], ["menu", "Menu", 9], ["run", "Run on / off", 10], ["cityview", "Look out (L)", 11],
["phone", "Phone", 12], ["ward", "Wardrobe", 13], ["ride", "Get in / out (Q)", 14], ["journal", "Dream journal", 15]
];
var GPD_BTN = ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start", "L3", "R3", "D-pad up", "D-pad down", "D-pad left", "D-pad right", "Home"];
var GPD_KEYS = { jump: ["Space", " "], talk: ["KeyE", "e"], use: ["KeyF", "f"], take: ["KeyG", "g"], view: ["KeyV", "v"], down: ["KeyC", "c"],
cityview: ["KeyL", "l"], ride: ["KeyQ", "q"], ward: ["KeyB", "b"], pack: ["KeyI", "i"] };
var GPD_HOLD = { jump: 1, down: 1, cityview: 1 };
function gpdDefaults() {
var m = {};
GPD_ACTS.forEach(function (a) { m[a[0]] = a[2]; });
return { on: true, look: 1, dead: 0.18, invert: false, swap: false, map: m, mouse: 1, minv: false };
}
function gpdCfg() {
if (GPD.cfg)
return GPD.cfg;
var c = gpdDefaults();
try {
var s = JSON.parse(localStorage.getItem(GPD.KEY) || "null");
if (s && typeof s === "object") {
var m = Object.assign({}, c.map, s.map || {});
c = Object.assign(c, s);
c.map = m;
}
}
catch (e) { }
c.look = Math.max(0.2, Math.min(3, +c.look || 1));
c.dead = Math.max(0.05, Math.min(0.45, +c.dead || 0.18));
c.mouse = Math.max(0.2, Math.min(3, +c.mouse || 1));
return GPD.cfg = c;
}
function gpdSave() { try {
localStorage.setItem(GPD.KEY, JSON.stringify(GPD.cfg));
}
catch (e) { } }
function gpdMouse() { return { k: 0.0022, inv: 1 }; }
function gpdBtnOf(act) { var b = gpdCfg().map[act]; if (gpdCfg().swap) {
if (b === 0)
return 1;
if (b === 1)
return 0;
} return b; }
function gpdPad() {
if (!navigator.getGamepads)
return null;
var L;
try {
L = navigator.getGamepads();
}
catch (e) {
return null;
}
for (var i = 0; i < (L ? L.length : 0); i++) {
var p = L[i];
if (!p || !p.connected)
continue;
if (/Oculus|Quest|OpenXR|Touch|Pico|Vive|Index|Knuckles|Windows Mixed/i.test(p.id || ""))
continue;
if (p.buttons && p.buttons.length >= 4 && p.axes && p.axes.length >= 2)
return p;
}
return null;
}
function gpdInXR() { return typeof VRM !== "undefined" && VRM && (VRM.xr || VRM.card); }
function gpdDz(v) { var d = gpdCfg().dead; if (Math.abs(v) < d)
return 0; return (v - (v > 0 ? d : -d)) / (1 - d); }
function gpdStick(p, a, b) {
var x = p.axes[a] || 0, y = p.axes[b] || 0, m = Math.sqrt(x * x + y * y), d = gpdCfg().dead;
if (m < d)
return { x: 0, y: 0, m: 0 };
var k = Math.min(1, (m - d) / (1 - d)) / m;
return { x: x * k, y: y * k, m: Math.min(1, (m - d) / (1 - d)) };
}
function gpdPressed(p, i) { var b = p.buttons[i]; return !!b && (b.pressed || b.value > 0.5); }
var GPD_HUD = /^(hud|recticle|realmname|compass|timebar|place|walkhint|me-bar|ps-menu|ps-phone|ph-btn|dpad|pdside|pdview|pd-fold|joy|tbtns|gpd-toast|count|clock|title)$/;
var GPD_TIP = /^(pf-tip|gpd-toast)$/;
function gpdVisible(el) {
if (!el || !el.getClientRects || !el.getClientRects().length)
return false;
var s = getComputedStyle(el);
if (s.visibility === "hidden" || s.display === "none" || +s.opacity < 0.05)
return false;
return true;
}
function gpdPanel() {
if (typeof walkMode !== "undefined" && !walkMode) {
var top = gpdTopLayer();
return top || document.getElementById("scrim") || document.body;
}
return gpdTopLayer();
}
function gpdTopLayer() {
var best = null, bz = -1, vw = innerWidth, vh = innerHeight, kids = document.body.children;
for (var i = 0; i < kids.length; i++) {
var el = kids[i];
if (el.tagName === "SCRIPT" || el.tagName === "CANVAS" || el.tagName === "STYLE")
continue;
if (GPD_HUD.test(el.id || ""))
continue;
if (el.id === "scrim" && typeof walkMode !== "undefined" && walkMode)
continue;
var s = getComputedStyle(el);
if (s.position !== "fixed" && s.position !== "absolute")
continue;
if (s.display === "none" || s.visibility === "hidden" || +s.opacity < 0.05)
continue;
var r = el.getBoundingClientRect();
if (r.width < 120 || r.height < 80 || r.right < 12 || r.bottom < 12 || r.left > vw - 12 || r.top > vh - 12)
continue;
if (r.width * r.height < 24000 || GPD_TIP.test(el.id || ""))
continue;
if (s.pointerEvents === "none")
continue;
if (!el.querySelector("button,a[href],select,input,[role=button],[tabindex],.jn,.rc,summary"))
continue;
var z = parseInt(s.zIndex, 10);
if (isNaN(z))
z = 0;
z = z * 1000 + i;
if (z > bz) {
bz = z;
best = el;
}
}
return best;
}
function gpdTargets(root) { return __ZC(416, 0, this, arguments, new.target); }
function gpdRing(el) { return __ZC(416, 1, this, arguments, new.target); }
function gpdNav(dx, dy) { return __ZC(416, 2, this, arguments, new.target); }
function gpdScroller(el) { while (el && el !== document.body) {
var s = getComputedStyle(el);
if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 2)
return el;
el = el.parentElement;
} return null; }
function gpdAdjust(dir) { return __ZC(416, 3, this, arguments, new.target); }
function gpdPress() { return __ZC(416, 4, this, arguments, new.target); }
function gpdKey(act, down) { return __ZC(416, 5, this, arguments, new.target); }
function gpdAct(act, down) { return __ZC(416, 6, this, arguments, new.target); }
function gpdMove() {
if (!GPD.on || GPD.stickMenu || !gpdCfg().on || gpdInXR())
return null;
var p = gpdPad();
if (!p)
return null;
var s = gpdStick(p, 0, 1);
if (!s.m)
return null;
return { f: -s.y, s: s.x, mag: GPD.run ? 1 : Math.max(0.25, s.m), run: !!GPD.run, pad: true, gp: true };
}
function gpdFrame() { return __ZC(416, 7, this, arguments, new.target); }
function gpdDir(i) { if (i === 12)
gpdNav(0, -1);
else if (i === 13)
gpdNav(0, 1);
else if (i === 14) {
if (!gpdAdjust(-1))
gpdNav(-1, 0);
}
else if (i === 15) {
if (!gpdAdjust(1))
gpdNav(1, 0);
} }
function gpdStart() { if (GPD.raf)
return; GPD.on = true; GPD.t = 0; GPD.raf = setInterval(gpdFrame, 16); }
function gpdToast(h) { return __ZC(416, 8, this, arguments, new.target); }
function gpdName() { var p = gpdPad(); if (!p)
return ""; return String(p.id || "A controller").replace(/\(.*?Vendor.*?\)/i, "").replace(/\s+/g, " ").trim().slice(0, 60) || "A controller"; }
function gpdBuildSet() {
var panel = document.getElementById("panel");
if (!panel || document.getElementById("gpd-set"))
return;
var hint = document.getElementById("padmode"), at = hint;
while (at && at.nextElementSibling && at.nextElementSibling.tagName === "P") {
at = at.nextElementSibling;
}
var box = document.createElement("div");
box.id = "gpd-set";
box.innerHTML = '<h3 class="set-h">Game controller</h3><div id="gpd-body"></div>';
if (at && at.parentNode === panel)
panel.insertBefore(box, at.nextSibling);
else
panel.appendChild(box);
box.addEventListener("click", gpdSetClick);
box.addEventListener("input", gpdSetInput);
box.addEventListener("change", gpdSetInput);
gpdPaintSet();
}
function gpdPaintSet() {
var b = document.getElementById("gpd-body");
if (!b)
return;
var c = gpdCfg(), nm = gpdName();
var h = '<p class="gpd-st">' + (nm ? '<b>Connected:</b> ' + esc(nm) : 'No controller found yet. Plug a USB controller in (or pair one by Bluetooth) and press any button on it.') + '</p>' +
'<label class="gpd-row"><input type="checkbox" data-g="on"' + (c.on ? " checked" : "") + '> Use the controller</label>' +
'<label for="gpd-look">Look speed <span id="gpd-look-v">' + c.look.toFixed(1) + '</span></label><input type="range" id="gpd-look" data-g="look" min="0.2" max="3" step="0.1" value="' + c.look + '">' +
'<label for="gpd-dead">Dead zone (how far a stick moves before it counts) <span id="gpd-dead-v">' + Math.round(c.dead * 100) + '%</span></label><input type="range" id="gpd-dead" data-g="dead" min="0.05" max="0.45" step="0.01" value="' + c.dead + '">' +
'<label class="gpd-row"><input type="checkbox" data-g="invert"' + (c.invert ? " checked" : "") + '> Invert looking up and down</label>' +
'<label class="gpd-row"><input type="checkbox" data-g="swap"' + (c.swap ? " checked" : "") + '> Swap A and B (Nintendo-style pads)</label>' +
'<p class="gpd-st" id="gpd-live">' + (nm ? 'Press a button to test it.' : '') + '</p>' +
'<details class="gpd-map"><summary>The buttons (press Change, then the button you want)</summary><div>';
GPD_ACTS.forEach(function (a) {
var bi = c.map[a[0]], lis = GPD.listen === a[0];
h += '<div class="gpd-b"><span>' + esc(a[1]) + '</span><b>' + (lis ? 'press a button…' : esc(GPD_BTN[bi] || ("Button " + bi))) + '</b><button class="btn" type="button" data-gb="' + a[0] + '">' + (lis ? 'Waiting' : 'Change') + '</button></div>';
});
h += '<div class="row" style="gap:8px;margin-top:8px"><button class="btn" type="button" data-gr="1">Back to the standard buttons</button></div>' +
'<p class="gpd-st">In any menu: the d-pad or left stick moves the gold ring, A presses, B goes back, the right stick scrolls, LB and RB turn a page. On a list or a slider, left and right change it.</p></div></details>';
b.innerHTML = h;
var m = document.getElementById("gpd-mouse");
if (m)
m.innerHTML = '<label for="gpd-ms">Mouse look speed <span id="gpd-ms-v">' + c.mouse.toFixed(1) + '</span></label><input type="range" id="gpd-ms" data-g="mouse" min="0.2" max="3" step="0.1" value="' + c.mouse + '">' +
'<label class="gpd-row"><input type="checkbox" data-g="minv"' + (c.minv ? " checked" : "") + '> Invert the mouse up and down</label>' +
'<p class="gpd-st">While walking: click the world to look around with the mouse; <b>right-click</b> frees the pointer to click menus; the mouse&rsquo;s side <b>Back</b> button goes back one step.</p>';
}
function gpdSetClick(e) { return __ZC(416, 9, this, arguments, new.target); }
function gpdSetInput(e) { return __ZC(416, 10, this, arguments, new.target); }
function gpdLive(p, B) { return __ZC(416, 11, this, arguments, new.target); }
function gpdMouseSetup() { return __ZC(416, 12, this, arguments, new.target); }
(function () {
if (typeof document === "undefined")
return;
var st = document.createElement("style");
st.textContent =
"html body .gpd-ring.gpd-ring{outline:3px solid #E8C66A!important;outline-offset:2px!important;box-shadow:0 0 0 5px rgba(232,198,106,.28)!important}" +
"#gpd-toast{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:60;background:rgba(9,11,16,.92);color:#EDE6D6;border:1px solid #C9A868;" +
"border-radius:4px;padding:9px 14px;font:13px/1.45 var(--sans,system-ui,sans-serif);max-width:min(560px,92vw);opacity:0;pointer-events:none;transition:opacity .35s}" +
"#gpd-toast.on{opacity:1}" +
"#gpd-set .gpd-st{font-size:12px;color:var(--dim);line-height:1.55;margin:6px 0}" +
"#gpd-set .gpd-row{display:flex;align-items:center;gap:8px;margin-top:10px;cursor:pointer}#gpd-set .gpd-row input{width:auto;margin:0}" +
"#gpd-set details.gpd-map{margin-top:10px}#gpd-set details.gpd-map>summary{font-size:13px;color:var(--dim);cursor:pointer}" +
"#gpd-set .gpd-b{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line)}#gpd-set .gpd-b span{flex:1;font-size:13px}" +
"#gpd-set .gpd-b b{font-weight:500;color:var(--gold,#C9A868);font-size:12.5px;min-width:86px;text-align:right}" +
"";
document.head.appendChild(st);
addEventListener("gamepadconnected", function (e) {
if (/Oculus|Quest|OpenXR|Touch|Pico|Vive|Index|Knuckles|Windows Mixed/i.test((e.gamepad && e.gamepad.id) || ""))
return;
gpdStart();
gpdPaintSet();
if (gpdCfg().on)
gpdToast("<b>Controller ready.</b> Left stick walks, right stick looks, A jumps, X is Action (pick up, talk, open), B goes back, Start opens the Menu. Settings &rsaquo; Game controller to change it.");
});
addEventListener("gamepaddisconnected", function () { setTimeout(function () { if (!gpdPad()) {
GPD.name = "";
gpdPaintSet();
if (GPD.focus)
GPD.focus.classList.remove("gpd-ring");
GPD.focus = null;
gpdToast("Controller unplugged.");
} }, 50); });
if (typeof padInput === "function") {
var pi = padInput;
padInput = function () { var g = gpdMove(); return g || pi.apply(this, arguments); };
}
function gpdTouchRig(on) {
if (typeof touchRig === "undefined" || !!touchRig === on)
return;
if (/Android|iPhone|iPad|Mobile|OculusBrowser|Quest|Pico|Wolvic|\bVR\b/i.test(navigator.userAgent || ""))
return;
touchRig = on;
document.body.classList.toggle("touch", on);
if (!on) {
["joy", "tbtns"].forEach(function (id) { var e = document.getElementById(id); if (e)
e.classList.add("gone"); });
if (typeof joy !== "undefined") {
joy.id = null;
joy.dx = 0;
joy.dy = 0;
}
}
}
addEventListener("pointerdown", function (e) { if (e.pointerType === "mouse")
gpdTouchRig(false);
else if (e.pointerType === "touch" && typeof isTouch !== "undefined" && isTouch)
gpdTouchRig(true); }, true);
addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" && (e.movementX || e.movementY) && typeof touchRig !== "undefined" && touchRig)
gpdTouchRig(false); }, { capture: true, passive: true });
function ready() { gpdBuildSet(); if (gpdPad())
gpdStart(); }
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", ready);
else
ready();
})();
(function () {
if (typeof document === "undefined")
return;
var kbAt = 0, SEL = '#prompt,[id$="-prompt"]';
var st = document.createElement("style");
st.textContent = "body.gpd-typing #prompt,body.gpd-typing [id$='-prompt']{display:none!important}";
document.head.appendChild(st);
function kb(e) { if (e && e.isTrusted === false)
return; kbAt = Date.now(); }
addEventListener("keydown", kb, true);
addEventListener("pointerdown", kb, true);
addEventListener("pointermove", function (e) { if (e.isTrusted && (e.movementX || e.movementY))
kbAt = Date.now(); }, { capture: true, passive: true });
addEventListener("wheel", kb, { capture: true, passive: true });
function typing() {
if (typeof talkOpen !== "undefined" && talkOpen)
return true;
var t = document.getElementById("talk");
if (t && t.classList.contains("open"))
return true;
var a = document.activeElement;
if (!a || a === document.body)
return false;
if (a.closest && a.closest("#talk"))
return false;
var r = a.getBoundingClientRect && a.getBoundingClientRect();
if (!r || !r.width || !r.height || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth)
return false;
if (a.isContentEditable)
return true;
if (a.tagName === "TEXTAREA")
return true;
return a.tagName === "INPUT" && !/^(button|submit|reset|checkbox|radio|range|color|file|image)$/i.test(a.type || "");
}
function padLabel() { var b = gpdBtnOf("talk"); return GPD_BTN[b] || "X"; }
var RX = /(\b[Pp]ress\s+(?:<b>)?\s*)[Ee](?=\s*(?:<\/b>)?(?:[\s.,;:\u00b7)!]|<|$))/g;
function swap(el, pad) {
var cur = el.innerHTML;
if (pad) {
if (cur === el._gpdOut)
return;
var lab = padLabel(), out = cur.replace(RX, "$1" + lab);
if (out === cur) {
el._gpdOut = null;
return;
}
el._gpdSrc = cur;
el.innerHTML = out;
el._gpdOut = el.innerHTML;
}
else if (el._gpdOut) {
if (cur === el._gpdOut)
el.innerHTML = el._gpdSrc;
el._gpdOut = null;
el._gpdSrc = null;
}
}
function tick() {
if (!document.body)
return;
var t = typing();
if (document.body.classList.contains("gpd-typing") !== t)
document.body.classList.toggle("gpd-typing", t);
var pad = !!GPD.on && gpdCfg().on && (GPD.padAt || 0) > kbAt;
if (!pad && !GPD.swapped)
return;
GPD.swapped = pad;
var list = document.querySelectorAll(SEL);
for (var i = 0; i < list.length; i++)
swap(list[i], pad);
}
setInterval(tick, 150);
})();
