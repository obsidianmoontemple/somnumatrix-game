/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
FURN.hometv = function () { return __ZC(269, 0, this, arguments, new.target); };
FURN.homeradio = function () { return __ZC(269, 1, this, arguments, new.target); };
SOLIDFURN.hometv = 1;
SOLIDFURN.homeradio = 1;
(function () {
var fb = furnBox;
furnBox = function (k) { return k === "hometv" ? [1.6, .45] : k === "homeradio" ? [.55, .42] : fb(k); };
})();
function homeMediaWanted(spec) {
if (!spec || spec.dpInside || typeof hlPlotOf !== "function")
return false;
var p = hlPlotOf(spec);
if (!p)
return false;
return !/warrens/i.test(String(p.quarter || ""));
}
function homeMediaRoom(put, xc, zc, w, d, sd) {
put("hometv", xc + 1.2, zc + d / 2 - .35, Math.PI);
put("homeradio", xc + sd * (w / 2 - .5), zc + d / 2 - .4, Math.PI);
}
function homeMediaHall(put, W, D, there) { return __ZC(269, 2, this, arguments, new.target); }
var HMD = { dbp: null, list: null, mode: null, shut: null, near: null, int: null, homeId: null, tv: null, radio: null, urls: {},
vol: { tv: .8, radio: .7 }, tvOn: null, radioOn: null, radioAll: false, msg: "", slow: 0, el: null, painted: "",
vid: null, aud: null, tex: null, close: null, sh: {}, shV: {}, seek: {}, extra: [], shCool: 0, shMay: null };
try {
var hmv = JSON.parse(localStorage.getItem("dw_home_media_vol") || "null");
if (hmv && hmv.tv >= 0 && hmv.radio >= 0)
HMD.vol = hmv;
}
catch (e) { }
function hmDb() { return __ZC(269, 3, this, arguments, new.target); }
function hmReq(r) { return new Promise(function (res, rej) { r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
function hmList() { return __ZC(269, 4, this, arguments, new.target); }
var HM_VIDEO = /\.(mp4|m4v|webm|mov|ogv|mkv|3gp)$/i, HM_AUDIO = /\.(mp3|m4a|aac|wav|ogg|oga|opus|flac|weba)$/i;
function hmKindOf(f) {
var t = String(f.type || "");
if (/^video\//.test(t))
return "video";
if (/^audio\//.test(t))
return "audio";
if (HM_VIDEO.test(f.name || ""))
return "video";
if (HM_AUDIO.test(f.name || ""))
return "audio";
return null;
}
function hmAdd(files) { return __ZC(269, 5, this, arguments, new.target); }
function hmLinkParse(raw) { return __ZC(269, 6, this, arguments, new.target); }
function hmAddLink(raw) { return __ZC(269, 7, this, arguments, new.target); }
function hmTitle(row, page) { return __ZC(269, 8, this, arguments, new.target); }
function hmItem(id) { return (HMD.list || []).concat(HMD.extra || []).filter(function (x) { return x.id === id; })[0] || null; }
function hmRemove(id) { return __ZC(269, 9, this, arguments, new.target); }
function hmUrls(kind) { return __ZC(269, 10, this, arguments, new.target); }
function hmFreeUrls() {
Object.keys(HMD.urls).forEach(function (id) { if (id === HMD.tvOn || id === HMD.radioOn)
return; if (/^blob:/.test(HMD.urls[id]))
try {
URL.revokeObjectURL(HMD.urls[id]);
}
catch (e) { } delete HMD.urls[id]; });
}
function hmMB(n) { n = +n || 0; return n >= 1e9 ? (n / 1e9).toFixed(1) + " GB" : n >= 1e6 ? Math.round(n / 1e6) + " MB" : Math.max(1, Math.round(n / 1e3)) + " KB"; }
function hmName(id) { var r = hmItem(id); return r ? r.name : ""; }
function hmVideo() { return __ZC(269, 11, this, arguments, new.target); }
function hmAudio() { return __ZC(269, 12, this, arguments, new.target); }
function hmCantPlay(r, kind) { return __ZC(269, 13, this, arguments, new.target); }
function hmPlay(dev, id, remote) { return __ZC(269, 14, this, arguments, new.target); }
function hmNext(dev) { return __ZC(269, 15, this, arguments, new.target); }
function hmOff(dev) {
if (dev === "tv")
hmEmbedOff();
var el = dev === "tv" ? HMD.vid : HMD.aud;
if (el) {
try {
el.pause();
el.removeAttribute("src");
el.load();
}
catch (e) { }
}
if (dev === "tv") {
HMD.tvOn = null;
hmTexOff();
hmCloseUp(false);
}
else {
HMD.radioOn = null;
hmDial(false);
}
hmPaint(true);
}
function hmScreen() {
var tv = HMD.tv, s = null;
if (!tv)
return null;
tv.traverse(function (o) { if (o.userData && o.userData.hmScreen)
s = o; });
return s;
}
function hmCard(title, line) { return __ZC(269, 16, this, arguments, new.target); }
function hmEmbedOn(r, remote) { return __ZC(269, 17, this, arguments, new.target); }
function hmEmbedOff() { return __ZC(269, 18, this, arguments, new.target); }
function hmTexOn() { return __ZC(269, 19, this, arguments, new.target); }
function hmTexOff() {
var s = hmScreen();
if (s && !HMD.embed) {
s.material.map = null;
s.material.color.setHex(0x0B0D11);
s.material.needsUpdate = true;
s.scale.set(1, 1, 1);
}
if (HMD.tex) {
HMD.tex.dispose();
HMD.tex = null;
}
}
function hmFit() {
var s = hmScreen(), v = HMD.vid;
if (!s || !v || !v.videoWidth || !v.videoHeight || HMD.tvTaint || HMD.embed)
return;
var a = v.videoWidth / v.videoHeight, A = 1.2 / .675;
if (a > A)
s.scale.set(1, A / a, 1);
else
s.scale.set(a / A, 1, 1);
}
function hmDial(on) {
var r = HMD.radio, d = null;
if (!r)
return;
r.traverse(function (o) { if (o.userData && o.userData.hmDial)
d = o; });
if (d)
d.material.color.setHex(on ? 0xFFD58A : 0x6A5A3E);
}
function hmCloseUp(open) { return __ZC(269, 20, this, arguments, new.target); }
function hmVolume(dev, step) {
HMD.vol[dev] = Math.max(0, Math.min(1, Math.round((HMD.vol[dev] + step) * 10) / 10));
try {
localStorage.setItem("dw_home_media_vol", JSON.stringify(HMD.vol));
}
catch (e) { }
hmPaint(true);
}
function hmPicker() { return __ZC(269, 21, this, arguments, new.target); }
function hmRow(r, dev) { return __ZC(269, 22, this, arguments, new.target); }
function hmXr() { try {
return !!(renderer && renderer.xr && renderer.xr.isPresenting);
}
catch (e) {
return false;
} }
function hmAddRow(what) { return __ZC(269, 23, this, arguments, new.target); }
function hmHtml() { return __ZC(269, 24, this, arguments, new.target); }
function hmPaint(force) { return __ZC(269, 25, this, arguments, new.target); }
function hmAct(a, id) { return __ZC(269, 26, this, arguments, new.target); }
function hmOpenLib() {
if (HMD.mode === "lib") {
HMD.mode = null;
hmPaint();
return;
}
HMD.mode = "lib";
HMD.msg = "";
hmPaint(true);
hmList().then(function () { hmPaint(true); });
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-media"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-media";
b.title = "Your own videos and music, for the TV and radio at home";
b.textContent = "📺 Videos and music";
b.onclick = hmOpenLib;
var pk = document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
var HM_SH_EVERY = 4;
function hmShLot() {
if (!INT || !INT.spec || typeof hlPlotOf !== "function")
return null;
var p = hlPlotOf(INT.spec);
return p && p.name ? { world: p.world || "somnucor", name: p.name } : null;
}
function hmShOn() { return !!(HMD.homeId && !HMD.shGone && typeof signedIn === "function" && signedIn() && typeof cityRpc === "function" && hmShLot()); }
function hmShare(dev, r, pos, playing) { return __ZC(269, 27, this, arguments, new.target); }
function hmShMissing(e) { if (/404|PGRST202|not find|does not exist/i.test(String(e && (e.message || e.code) || e))) {
HMD.shGone = true;
setTimeout(function () { HMD.shGone = false; }, 120000);
} }
function hmSeekDue(dev, el) {
var t = HMD.seek[dev];
if (t == null)
return;
HMD.seek[dev] = null;
try {
if (isFinite(el.duration) && t < el.duration - 1)
el.currentTime = t;
}
catch (e) { }
}
function hmShApply(d) { return __ZC(269, 28, this, arguments, new.target); }
function hmShTick(dt) { return __ZC(269, 29, this, arguments, new.target); }
if (typeof PS_KEEP !== "undefined")
PS_KEEP["hm-btn"] = 1;
function hmBtn() {
var el = document.getElementById("hm-btn");
if (el || !document.body)
return el;
el = document.createElement("button");
el.id = "hm-btn";
el.type = "button";
el.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(284px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #C9A868;border-radius:18px;padding:8px 15px;font:600 14px system-ui,sans-serif;max-width:70vw;" +
"white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer";
el.onclick = hmOpenTv;
document.body.appendChild(el);
return el;
}
function hmOpenTv() {
if (!HMD.homeId)
return;
HMD.mode = HMD.radioOn && !HMD.tvOn ? "radio" : "tv";
HMD.pinned = true;
HMD.shut = null;
HMD.msg = "";
hmUrls(HMD.mode === "tv" ? "video" : "audio");
hmPaint(true);
}
function hmBtnPaint(home) {
var el = hmBtn();
if (!el)
return;
var show = !!(home && walkMode && HMD.mode !== "tv" && HMD.mode !== "radio" && !hmXr() && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on));
if (el.style.display !== (show ? "block" : "none"))
el.style.display = show ? "block" : "none";
if (!show)
return;
var ph = typeof psIsPhone === "function" && psIsPhone();
if (el.__ph !== ph) {
el.__ph = ph;
if (ph) {
el.style.left = "50%";
el.style.transform = "translateX(-50%)";
el.style.bottom = "auto";
el.style.top = "calc(78px + env(safe-area-inset-top,0px))";
}
else {
el.style.left = "calc(12px + env(safe-area-inset-left,0px))";
el.style.transform = "";
el.style.top = "auto";
el.style.bottom = "calc(284px + env(safe-area-inset-bottom,0px))";
}
}
var t = HMD.tvOn ? "📺 TV · on" : HMD.radioOn ? "📻 Radio · on" : "📺 TV and radio";
if (el.textContent !== t)
el.textContent = t;
}
var hmV = null;
function hmTick(dt) {
if (typeof THREE === "undefined")
return;
hmV = hmV || new THREE.Vector3();
var home = !!(walkMode && INT && INT.homeMedia);
if (HMD.homeId && (!home || INT.spec.id !== HMD.homeId)) {
var was = !!(HMD.tvOn || HMD.radioOn);
hmOff("tv");
hmOff("radio");
hmFreeUrls();
HMD.tv = HMD.radio = null;
HMD.homeId = null;
HMD.int = null;
if (HMD.mode === "tv" || HMD.mode === "radio")
HMD.mode = null;
HMD.shut = null;
HMD.pinned = false;
HMD.linkOpen = false;
HMD.sh = {};
HMD.shV = {};
HMD.seek = {};
HMD.extra = [];
HMD.shCool = 0;
HMD.shMay = null;
HMD.shTold = false;
hmPaint();
if (was && typeof setStatus === "function")
setStatus("The TV and the radio stay at home: they went off as you stepped out.");
}
if (!walkMode && HMD.mode === "lib") {
HMD.mode = null;
hmPaint();
}
hmBtnPaint(home);
if (!home)
return;
hmShTick(dt);
if (HMD.int !== INT) {
HMD.int = INT;
HMD.homeId = INT.spec.id;
HMD.tv = HMD.radio = null;
INT.root.traverse(function (o) { var k = o.userData && o.userData.furn; if (k === "hometv")
HMD.tv = o;
else if (k === "homeradio")
HMD.radio = o; });
if (HMD.tvOn && HMD.vid && !HMD.vid.paused)
hmTexOn();
hmDial(!!(HMD.radioOn && HMD.aud && !HMD.aud.paused));
if (!HMD.list)
hmList();
if (HMD.told !== HMD.homeId && HMD.tv && typeof setStatus === "function") {
HMD.told = HMD.homeId;
var tellIt = function () { if (HMD.homeId && INT && INT.spec.id === HMD.told)
setStatus("<b>This home has a TV and a radio.</b> Tap <b>📺 TV and radio</b> to put on your own video, a song, or a link."); };
setTimeout(tellIt, 4500);
}
}
HMD.slow -= dt;
if (HMD.slow > 0)
return;
HMD.slow = 0.25;
var P = camera.position, myY = P.y - 1.72;
function at(o) { if (!o)
return null; o.getWorldPosition(hmV); return { d: Math.hypot(P.x - hmV.x, P.z - hmV.z), same: Math.abs(hmV.y - myY) < 1.6 }; }
var t = at(HMD.tv), r = at(HMD.radio);
[["tv", t, HMD.vid], ["radio", r, HMD.aud]].forEach(function (q) {
var el = q[2], w = q[1];
if (!el || !w)
return;
var f = w.d < 6 ? 1 : Math.max(.25, 1 - (w.d - 6) / 30);
if (!w.same)
f *= .5;
var v = Math.max(0, Math.min(1, HMD.vol[q[0]] * f));
if (Math.abs(el.volume - v) > .02)
el.volume = v;
});
var near = null;
if (t && t.same && t.d < 3.2)
near = "tv";
if (r && r.same && r.d < 2.6 && (!near || r.d < t.d))
near = "radio";
if (near !== HMD.near) {
if (HMD.shut && HMD.shut !== near)
HMD.shut = null;
HMD.near = near;
if (near && HMD.mode !== "lib" && HMD.shut !== near && !(HMD.pinned && HMD.mode)) {
HMD.mode = near;
HMD.msg = "";
hmUrls(near === "tv" ? "video" : "audio");
hmPaint(true);
}
else if (!near && !HMD.pinned && (HMD.mode === "tv" || HMD.mode === "radio")) {
HMD.mode = null;
HMD.linkOpen = false;
hmPaint();
}
}
if (HMD.mode === "tv" || HMD.mode === "radio")
hmPaint(false);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
hmTick(Math.min(.1, dt || 1 / 60));
}
catch (e) {
if (window.console)
console.warn("[home media]", e);
} };
})();
