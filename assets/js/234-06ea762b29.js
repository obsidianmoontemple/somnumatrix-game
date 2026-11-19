/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PF = { key: "somnu.phonefit", level: 0, lost: 0, sweepAt: 0, swept: 0, sweptMB: 0, back: 0, reg: [], off: new WeakSet(), phone: false };
PF.phone = typeof LITE !== "undefined" ? !!LITE : /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
function pfRead() { try {
return JSON.parse(localStorage.getItem(PF.key) || "{}") || {};
}
catch (e) {
return {};
} }
function pfWrite(o) { try {
localStorage.setItem(PF.key, JSON.stringify(o));
}
catch (e) { } }
(function () {
var c = pfRead(), lv = c.level | 0;
var mem = navigator.deviceMemory;
if (PF.phone && mem && mem <= 3 && lv < 1)
lv = 1;
PF.level = Math.min(2, lv);
PF.lost = c.lost | 0;
if (lv !== (c.level | 0)) {
c.level = lv;
pfWrite(c);
}
if (PF.level > 0) {
if (typeof gfxPixelRatio === "function") {
var gp = gfxPixelRatio;
gfxPixelRatio = function () { return Math.min(gp.apply(this, arguments), 1); };
}
if (typeof PCU !== "undefined") {
PCU.far = Math.min(PCU.far, PF.level > 1 ? 180 : 220);
}
if (typeof PHL !== "undefined") {
PHL.far = Math.min(PHL.far, PF.level > 1 ? 220 : 280);
}
}
})();
(function () {
if (typeof WeakRef === "undefined" || !THREE || !THREE.EventDispatcher)
return;
var ae = THREE.EventDispatcher.prototype.addEventListener;
THREE.EventDispatcher.prototype.addEventListener = function (type) {
if (type === "dispose" && !this.__pfReg && (this.isBufferGeometry || this.isTexture)) {
this.__pfReg = 1;
if (this.__pfSwept)
PF.back++;
try {
PF.reg.push(new WeakRef(this));
}
catch (e) { }
}
return ae.apply(this, arguments);
};
})();
function pfTexOk(t) {
if (!t || t.isRenderTargetTexture || t.isDataTexture || t.isVideoTexture || t.isCubeTexture || t.isCompressedTexture || t.isDepthTexture || t.isDataTexture2DArray || t.isDataTexture3D)
return false;
var im = t.image;
if (!im || !im.width)
return false;
return (typeof HTMLCanvasElement !== "undefined" && im instanceof HTMLCanvasElement) ||
(typeof HTMLImageElement !== "undefined" && im instanceof HTMLImageElement && im.complete) ||
(typeof ImageBitmap !== "undefined" && im instanceof ImageBitmap);
}
function pfGeoOk(g) {
if (!g || !g.attributes)
return false;
var a = g.attributes, n = 0;
for (var k in a) {
var A = a[k];
if (!A || A.isInterleavedBufferAttribute || !A.array || !A.array.length)
return false;
n++;
}
if (g.index && (!g.index.array || !g.index.array.length))
return false;
if (g.morphAttributes)
for (var m in g.morphAttributes) {
if (g.morphAttributes[m] && g.morphAttributes[m].length)
return false;
}
return n > 0;
}
var PF_MAPS = ["map", "alphaMap", "aoMap", "bumpMap", "displacementMap", "emissiveMap", "envMap", "lightMap", "metalnessMap", "normalMap", "roughnessMap",
"specularMap", "gradientMap", "matcap", "clearcoatMap", "clearcoatNormalMap", "clearcoatRoughnessMap", "transmissionMap", "sheenColorMap"];
function pfAddTex(set, v) { if (v && v.isTexture)
set.add(v); }
function pfInUse() {
var used = new Set();
if (typeof scene === "undefined" || !scene)
return used;
pfAddTex(used, scene.background);
pfAddTex(used, scene.environment);
var seen = new Set();
scene.traverse(function (o) {
if (o.geometry)
used.add(o.geometry);
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
if (o.customDepthMaterial)
ms = ms.concat([o.customDepthMaterial]);
if (o.customDistanceMaterial)
ms = ms.concat([o.customDistanceMaterial]);
for (var i = 0; i < ms.length; i++) {
var m = ms[i];
if (!m || seen.has(m))
continue;
seen.add(m);
for (var k = 0; k < PF_MAPS.length; k++) {
var v = m[PF_MAPS[k]];
if (v && v.isTexture)
used.add(v);
}
if (m.uniforms)
for (var u in m.uniforms) {
var uv = m.uniforms[u] && m.uniforms[u].value;
pfAddTex(used, uv);
if (Array.isArray(uv))
uv.forEach(function (x) { pfAddTex(used, x); });
}
if (m.userData)
for (var d in m.userData) {
var dv = m.userData[d];
pfAddTex(used, dv);
if (dv && typeof dv === "object" && dv.uniforms)
for (var du in dv.uniforms) {
pfAddTex(used, dv.uniforms[du] && dv.uniforms[du].value);
}
}
}
});
return used;
}
function pfSweep() {
if (typeof scene === "undefined" || !scene || !PF.reg.length)
return;
if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return;
if (typeof PERF_JOINING !== "undefined" && PERF_JOINING)
return;
var used = pfInUse(), keep = [], n = 0, bytes = 0;
for (var i = 0; i < PF.reg.length; i++) {
var o = PF.reg[i].deref();
if (!o)
continue;
if (used.has(o)) {
PF.off.delete(o);
keep.push(PF.reg[i]);
continue;
}
var ok = o.isTexture ? pfTexOk(o) : pfGeoOk(o);
if (!ok) {
keep.push(PF.reg[i]);
continue;
}
if (!PF.off.has(o)) {
PF.off.add(o);
keep.push(PF.reg[i]);
continue;
}
PF.off.delete(o);
try {
if (o.isTexture) {
var im = o.image;
bytes += (im.width * im.height * 4 * 1.33) || 0;
}
else {
for (var k in o.attributes)
bytes += o.attributes[k].array.byteLength;
if (o.index)
bytes += o.index.array.byteLength;
}
o.__pfReg = 0;
o.__pfSwept = 1;
o.dispose();
n++;
}
catch (e) {
keep.push(PF.reg[i]);
}
}
PF.reg = keep;
PF.swept += n;
PF.sweptMB += bytes / 1e6;
}
var PF_WLEFT = {};
function pfWorldSweep() {
if (!PF.phone || typeof WORLDS === "undefined" || !WORLDS)
return;
var now = Date.now(), stale = [];
Object.keys(WORLDS).forEach(function (k) {
var W = WORLDS[k];
if (!W || !W.g)
return;
if (W.g.visible) {
PF_WLEFT[k] = 0;
W.g.__pfFreed = false;
return;
}
if (!PF_WLEFT[k]) {
PF_WLEFT[k] = now;
return;
}
if (!W.g.__pfFreed && now - PF_WLEFT[k] > 30000)
stale.push(W);
});
if (!stale.length)
return;
var keep = new Set();
scene.traverseVisible(function (o) {
if (o.geometry)
keep.add(o.geometry);
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) {
if (!m)
return;
for (var i = 0; i < PF_MAPS.length; i++) {
var v = m[PF_MAPS[i]];
if (v && v.isTexture)
keep.add(v);
}
if (m.uniforms)
for (var u in m.uniforms) {
pfAddTex(keep, m.uniforms[u] && m.uniforms[u].value);
}
});
});
stale.forEach(function (W) {
var n = 0, bytes = 0, done = new Set();
W.g.traverse(function (o) {
var list = [];
if (o.geometry)
list.push(o.geometry);
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) { if (m)
for (var i = 0; i < PF_MAPS.length; i++) {
var v = m[PF_MAPS[i]];
if (v && v.isTexture)
list.push(v);
} });
list.forEach(function (x) {
if (done.has(x) || keep.has(x) || !x.__pfReg)
return;
done.add(x);
if (x.isTexture ? !pfTexOk(x) : !pfGeoOk(x))
return;
try {
if (x.isTexture)
bytes += (x.image.width * x.image.height * 4 * 1.33) || 0;
else {
for (var a in x.attributes)
bytes += x.attributes[a].array.byteLength;
if (x.index)
bytes += x.index.array.byteLength;
}
x.__pfReg = 0;
x.__pfSwept = 1;
x.dispose();
n++;
}
catch (e) { }
});
});
W.g.__pfFreed = true;
PF.swept += n;
PF.sweptMB += bytes / 1e6;
});
}
setInterval(function () {
try {
var now = Date.now();
if (now - PF.sweepAt < (PF.phone ? 8000 : 20000))
return;
PF.sweepAt = now;
pfSweep();
pfWorldSweep();
}
catch (e) {
if (window.console)
console.warn("[phone-fit] sweep", e);
}
}, 1000);
function pfOnLost() {
var c = pfRead();
c.lost = (c.lost | 0) + 1;
c.at = Date.now();
c.level = Math.min(2, (c.level | 0) + 1);
pfWrite(c);
}
function pfWatch(r) {
if (!r || !r.domElement || r.domElement.__pfWatch)
return;
r.domElement.__pfWatch = 1;
r.domElement.addEventListener("webglcontextlost", pfOnLost, false);
}
if (typeof renderer !== "undefined" && renderer)
pfWatch(renderer);
else if (typeof initWorld === "function") {
var pfIW = initWorld;
initWorld = function () { var r = pfIW.apply(this, arguments); try {
pfWatch(renderer);
}
catch (e) { } return r; };
}
(function () {
var css = "body.touch #dhud{padding:5px 9px 6px!important;width:min(520px,calc(100vw - 20px))!important}" +
"body.touch #dhud .dh-ah,body.touch #dhud .dh-gauge,body.touch #dhud .dh-hdg{display:none!important}" +
"body.touch #dhud .dh-top{margin-bottom:2px}body.touch #dhud .dh-title{font-size:13px}body.touch #dhud .dh-lic{font-size:9.5px;padding:1px 6px}" +
"body.touch #dhud .dh-tape{display:flex;gap:6px}" +
"body.touch #dhud .dh-cell{flex:1;flex-direction:column;align-items:center;gap:0;padding:1px 0;border:0}" +
"body.touch #dhud .dh-cell span{font-size:9px}body.touch #dhud .dh-cell b{font-size:15px}body.touch #dhud .dh-cell small{font-size:9px;margin-left:2px}" +
"body.touch #dhud .dh-big{font-size:22px}body.touch #dhud .dh-row{margin-top:2px}" +
"body.touch #dhud .dh-sign{width:34px;height:34px;border-width:4px;font-size:13px}body.touch #dhud .dh-sign.none:after{width:36px;height:4px}" +
"body.touch #dhud .dh-next{font-size:11.5px;margin-top:3px;padding-top:3px;min-height:0}" +
"body.touch #dhud .dh-note{font-size:11px;margin-top:2px}" +
"body.touch #dhud .dh-btns{margin-top:4px}body.touch #dhud .dh-btns .btn{min-height:30px!important;padding:3px 10px!important;font-size:11.5px!important}" +
"@media (max-height:500px){body.touch #dhud{bottom:auto!important;top:calc(4px + env(safe-area-inset-top,0px))!important;width:min(420px,calc(100vw - 360px))!important;animation:none!important}" +
"body.touch #dhud .dh-next{display:none}}" +
"body.touch.drive-on #t-speak,body.touch.drive-on #t-use{display:none!important}" +
"#dhud .dh-ind span.on{animation:none!important;color:#8FCB8A}" +
"#dhud .dh-sign.over{animation:none!important;box-shadow:0 0 0 4px rgba(192,57,43,.45),0 2px 8px rgba(0,0,0,.4)}" +
"#t-use{border-color:#C9A040!important;color:#F2D27A!important}";
var st = document.createElement("style");
st.id = "pf-style";
st.textContent = css;
document.head.appendChild(st);
})();
function pfShown(el) {
if (!el || !el.isConnected)
return false;
var cs = getComputedStyle(el);
if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0)
return false;
var r = el.getBoundingClientRect();
return r.width > 0 && r.height > 0;
}
var PF_E = /press\s*e\b/i;
function pfUseNeeded() {
if (typeof walkMode === "undefined" || !walkMode)
return false;
if (typeof nearChar !== "undefined" && nearChar)
return false;
var kids = document.body.children;
for (var i = 0; i < kids.length; i++) {
var el = kids[i];
if (el.id === "walkhint" || el.id === "scrim" || el.id === "tbtns")
continue;
var tx = el.textContent;
if (!tx || tx.length > 400 || !PF_E.test(tx))
continue;
if (pfShown(el))
return true;
}
return false;
}
function pfUseButton() {
var B = document.getElementById("tbtns");
if (!B)
return null;
var u = document.getElementById("t-use");
if (!u) {
u = document.createElement("button");
u.id = "t-use";
u.className = "gone";
u.type = "button";
u.setAttribute("aria-label", "Use");
u.textContent = "Use";
var back = document.getElementById("t-back");
B.insertBefore(u, back || null);
u.addEventListener("touchend", function (e) {
e.preventDefault();
dispatchEvent(new KeyboardEvent("keydown", { code: "KeyE", key: "e", bubbles: true }));
setTimeout(function () { dispatchEvent(new KeyboardEvent("keyup", { code: "KeyE", key: "e", bubbles: true })); }, 60);
}, { passive: false });
}
return u;
}
function pfLayout() {
var H = innerHeight;
var side = document.getElementById("pdside"), tb = document.getElementById("tbtns");
if (side) {
if (tb && pfShown(tb) && pfShown(side)) {
var tr = tb.getBoundingClientRect(), sh = side.getBoundingClientRect().height, lim = 0;
["ps-menu", "bug-btn"].forEach(function (id) { var el = document.getElementById(id); if (el && pfShown(el))
lim = Math.max(lim, el.getBoundingClientRect().bottom); });
if (tr.top - 8 - sh >= lim + 6) {
side.style.setProperty("bottom", Math.round(H - tr.top + 8) + "px", "important");
if (side.style.right)
side.style.removeProperty("right");
}
else {
side.style.setProperty("bottom", Math.round(H - tr.bottom) + "px", "important");
side.style.setProperty("right", Math.round(innerWidth - tr.left + 8) + "px", "important");
}
}
else {
if (side.style.bottom)
side.style.removeProperty("bottom");
if (side.style.right)
side.style.removeProperty("right");
}
}
var dh = document.getElementById("dhud"), on = !!(dh && pfShown(dh)), hr = null, y = 0;
if (on) {
var b = dh.getBoundingClientRect(), lay = dh.offsetTop + dh.offsetHeight;
hr = { left: b.left, right: b.right };
PF.dhBottom = Math.max(PF.dhBottom || 0, Math.round(lay > 0 ? lay : b.bottom));
y = PF.dhBottom + 6;
}
else
PF.dhBottom = 0;
["ps-menu", "bug-btn"].forEach(function (id) {
var el = document.getElementById(id);
if (!el)
return;
var r = el.getBoundingClientRect();
if (hr && r.left < hr.right && r.right > hr.left) {
var want = y + "px";
if (el.style.getPropertyValue("top") !== want)
el.style.setProperty("top", want, "important");
y += Math.round(r.height) + 6;
}
else if (el.style.top)
el.style.removeProperty("top");
});
}
function pfTick() {
if (!(typeof touchRig !== "undefined" && touchRig))
return;
pfLayout();
var u = pfUseButton();
if (u) {
var need = pfUseNeeded();
if (u.classList.contains("gone") === need)
u.classList.toggle("gone", !need);
}
}
setInterval(function () { try {
pfTick();
}
catch (e) {
if (window.console)
console.warn("[phone-fit]", e);
} }, 500);
var PF_TIP = { key: "somnu.tips", seen: null, cur: null, t: 0, gap: 0, el: null };
function pfTipSeen() { if (!PF_TIP.seen) {
try {
PF_TIP.seen = JSON.parse(localStorage.getItem(PF_TIP.key) || "{}") || {};
}
catch (e) {
PF_TIP.seen = {};
}
} return PF_TIP.seen; }
function pfTipMark(k) { var s = pfTipSeen(); s[k] = 1; try {
localStorage.setItem(PF_TIP.key, JSON.stringify(s));
}
catch (e) { } }
function pfTipBox() {
if (PF_TIP.el)
return PF_TIP.el;
var st = document.createElement("style");
st.textContent = "#pf-tip{position:fixed;z-index:47;left:calc(60px + env(safe-area-inset-left,0px));bottom:calc(178px + env(safe-area-inset-bottom,0px));" +
"width:min(330px,calc(100vw - 172px));background:rgba(12,10,22,.94);color:#EDE8F8;border:1px solid rgba(232,198,106,.55);border-radius:12px;" +
"padding:10px 12px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.45);opacity:0;transition:opacity .45s ease;pointer-events:none}" +
"body.pf-tipping #walkhint{visibility:hidden}#pf-tip.on{opacity:1;pointer-events:auto}#pf-tip b{color:#F2D27A;font-weight:600}" +
"#pf-tip .pf-tip-row{display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:8px}" +
"#pf-tip button{font:600 13px system-ui,sans-serif;border-radius:14px;padding:6px 12px;border:1px solid #C9A040;background:#2A2448;color:#F2D27A}" +
"#pf-tip button.pf-tip-off{border:0;background:none;color:#A8A0C0;font-weight:400;padding:6px 4px}" +
"body:not(.touch) #pf-tip{bottom:96px;width:min(380px,calc(100vw - 72px))}" +
"@media (max-height:500px){body.touch #pf-tip{bottom:auto;top:calc(94px + env(safe-area-inset-top,0px));width:min(360px,42vw)}}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "pf-tip";
d.setAttribute("role", "status");
d.innerHTML = "<div class='pf-tip-text'></div><div class='pf-tip-row'><button type='button' class='pf-tip-off'>No more tips</button><button type='button' class='pf-tip-ok'>Got it</button></div>";
document.body.appendChild(d);
d.querySelector(".pf-tip-ok").addEventListener("click", function () { pfTipClose(); });
d.querySelector(".pf-tip-off").addEventListener("click", function () { pfTipMark("_off"); pfTipClose(); });
PF_TIP.el = d;
return d;
}
function pfTipShow(k, html) {
var d = pfTipBox();
PF_TIP.cur = k;
PF_TIP.t = Date.now() + (k === "fly" || k === "drive" ? 14000 : 10000);
d.querySelector(".pf-tip-text").innerHTML = html;
d.classList.add("on");
pfTipMark(k);
document.body.classList.add("pf-tipping");
}
function pfTipClose() { if (PF_TIP.el)
PF_TIP.el.classList.remove("on"); document.body.classList.remove("pf-tipping"); PF_TIP.cur = null; PF_TIP.gap = Date.now() + 2500; }
var PF_TIPS = [
["fly", function () { return typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "fly"; },
"<b>Flying.</b> Push the circle up to speed up, pull it back to slow down, and let go to hover. Push left or right to turn, or swipe the screen. <b>▲</b> climbs and <b>▼</b> comes down.",
"<b>Flying.</b> <b>W</b> faster, <b>S</b> slower, <b>A</b> and <b>D</b> to bank. <b>Space</b> climbs and <b>C</b> comes down. <b>V</b> changes the view."],
["drive", function () { return typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road"; },
"<b>Driving.</b> Push the circle up to go, pull it back to brake or reverse, and left or right to steer. Mind the speed limit on the panel.",
"<b>Driving.</b> <b>W</b> to go, <b>S</b> to brake or reverse, <b>A</b> and <b>D</b> to steer, <b>Space</b> for the handbrake. Mind the speed limit."],
["walk", function () { return walkMode && !(typeof DRIVE !== "undefined" && DRIVE.on); },
"<b>Walking.</b> Put your left thumb on the circle and push to walk; push further to run. Drag anywhere else on the screen to look around.",
"<b>Walking.</b> <b>W A S D</b> to walk, <b>Shift</b> to run. Click the view and move the mouse to look around. <b>Tab</b> frees the mouse for buttons and Tab again takes it back. <b>P</b> opens your phone. <b>Esc</b> closes whatever is open."],
["speak", function () { var b = document.getElementById("t-speak"); return walkMode && typeof nearChar !== "undefined" && !!nearChar && !(typeof DRIVE !== "undefined" && DRIVE.on) && (!document.body.classList.contains("touch") || (b && !b.classList.contains("gone"))); },
"<b>Someone is near.</b> Tap <b>Speak</b> to talk with them, or tap them.",
"<b>Someone is near.</b> Press <b>E</b> to talk with them."],
["use", function () { var u = document.getElementById("t-use"); return walkMode && !!u && !u.classList.contains("gone"); },
"<b>Something to use here.</b> Tap <b>Use</b> to open it, ride it or step through.", null],
["city", function () { return walkMode && typeof inSomnucorNow === "function" && inSomnucorNow() && !(typeof store !== "undefined" && store.inside); },
"<b>Somnucor, the shared city.</b> Tap <b>☰ Menu</b> at the top right for your phone, work, the post and the rest. The <b>!</b> button reports a problem to the Keeper.",
"<b>Somnucor, the shared city.</b> Click <b>☰ Menu</b> at the top left for your view, wardrobe, powers, phone, the post and the rest. The <b>!</b> button reports a problem to the Keeper."],
["inside", function () { return walkMode && typeof store !== "undefined" && !!store.inside; },
"<b>Inside.</b> Shops and food places: <b>tap the prompt</b> at the bottom to buy. <b>Back</b> takes you out through the door.",
"<b>Inside.</b> Shops and food places: <b>press E</b> to buy. Walk out through the door, or use Menu, Leave this building."],
["rise", function () { return walkMode && typeof canFly !== "undefined" && canFly && !(typeof DRIVE !== "undefined" && DRIVE.on); },
"<b>You can fly.</b> Hold <b>▲</b> to rise and <b>▼</b> to come down.",
"<b>You can fly.</b> Hold <b>Space</b> to rise and <b>C</b> to come down."]
];
function pfTipTick() {
if (typeof walkMode === "undefined")
return;
var seen = pfTipSeen();
if (seen._off) {
if (PF_TIP.cur)
pfTipClose();
return;
}
var now = Date.now();
if (PF_TIP.cur) {
if (now > PF_TIP.t)
pfTipClose();
return;
}
if (now < PF_TIP.gap)
return;
if ((typeof talkOpen !== "undefined" && talkOpen) || (typeof greetOpen !== "undefined" && greetOpen))
return;
if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return;
var touch = document.body.classList.contains("touch");
for (var i = 0; i < PF_TIPS.length; i++) {
var T = PF_TIPS[i];
if (seen[T[0]])
continue;
var txt = (touch && (T[0] !== "city" || document.body.classList.contains("ps-phone"))) ? T[2] : T[3];
if (!txt)
continue;
var on = false;
try {
on = !!T[1]();
}
catch (e) { }
if (on) {
pfTipShow(T[0], txt);
return;
}
}
}
setInterval(function () { try {
pfTipTick();
}
catch (e) {
if (window.console)
console.warn("[phone-fit] tips", e);
} }, 700);
