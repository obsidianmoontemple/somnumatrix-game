/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LKV = { st: "off", w: null, q: [], cur: null, id: 0, rtf: [], late: 0, ac: null, prog: 0, src: null, gain: null, err: "" };
var LKV_MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
var LKV_WORKER = "assets/vendor/kokoro/kokoro-worker.js";
var LKV_WASM = null;
var LKV_V = {
us: { f: ["af_heart", "af_bella", "af_nicole", "af_aoede", "af_kore", "af_sarah"], m: ["am_michael", "am_fenrir", "am_puck", "am_echo", "am_eric", "am_liam", "am_onyx"],
kf: ["af_jessica", "af_heart"], km: ["af_heart", "af_bella"] },
gb: { f: ["bf_emma", "bf_isabella", "bf_alice", "bf_lily"], m: ["bm_george", "bm_fable", "bm_lewis", "bm_daniel"],
kf: ["bf_alice", "bf_isabella"], km: ["bf_isabella", "bf_alice"] }
};
var LKV_WAIT = 3200;
var LKV_MAXRTF = 0.8;
function lkvHash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h; }
function lkvPC() { return __ZC(481, 0, this, arguments, new.target); }
function lkvWant() { var c = typeof cfg === "function" ? cfg() : {}; return c.lifeVoice === true && lkvPC(); }
function lkvEnglish(u) {
try {
if (typeof smlOn === "function" && smlOn())
return false;
}
catch (e) { }
var l = String(u && (u.voice && u.voice.lang || u.lang) || "en").toLowerCase();
return !l || l.indexOf("en") === 0;
}
function lkvDeviceBest(lang) { return __ZC(481, 1, this, arguments, new.target); }
function lkvWho(u) { return __ZC(481, 2, this, arguments, new.target); }
function lkvVoiceFor(u) { return __ZC(481, 3, this, arguments, new.target); }
var LKV_SLOWKEY = "somnu.lifeVoice.slow";
function lkvSlowSaved() { try {
var t = +localStorage.getItem(LKV_SLOWKEY) || 0;
return t && Date.now() - t < 7 * 864e5;
}
catch (e) {
return false;
} }
function lkvSlow(why) {
if (LKV.st === "slow")
return;
LKV.st = "slow";
lkvSetPaint();
try {
localStorage.setItem(LKV_SLOWKEY, String(Date.now()));
}
catch (e) { }
lkvDrop();
if (window.console)
console.warn("[lifelike-voice] " + why + ": the device's natural voices speak instead");
}
function lkvLoad() { return __ZC(481, 4, this, arguments, new.target); }
function lkvAC() {
if (!LKV.ac) {
var C = window.AudioContext || window.webkitAudioContext;
LKV.ac = new C();
}
if (LKV.ac.state === "suspended")
try {
LKV.ac.resume();
}
catch (e) { }
return LKV.ac;
}
function lkvPieces(t) { return __ZC(481, 5, this, arguments, new.target); }
function lkvEv(u, type, err) { return __ZC(481, 6, this, arguments, new.target); }
function lkvTake(u) { return __ZC(481, 7, this, arguments, new.target); }
function lkvGot(m) { return __ZC(481, 8, this, arguments, new.target); }
function lkvSpeedCheck() {
if (LKV.rtf.length < 4)
return;
var s = LKV.rtf.slice().sort(function (a, b) { return a - b; }), med = s[s.length >> 1];
if (med > Math.max(1.05, LKV_MAXRTF) && LKV.st === "ready")
lkvSlow("this computer makes voices at " + med.toFixed(2) + "x real time");
}
function lkvDrop() { if (LKV.w && LKV.st === "slow" && !lkvBusy()) {
try {
LKV.w.terminate();
}
catch (e) { }
LKV.w = null;
} }
function lkvNext() {
LKV.cur = LKV.q.shift() || null;
var it = LKV.cur;
if (!it) {
lkvDrop();
return;
}
it.at = Date.now();
if (it.parts[0].pcm)
lkvPlay();
else
it.wt = setTimeout(function () { if (LKV.cur === it && !it.started)
lkvToDevice(it); }, LKV_WAIT);
}
function lkvToDevice(it) { return __ZC(481, 9, this, arguments, new.target); }
function lkvPlay() { return __ZC(481, 10, this, arguments, new.target); }
function lkvStop() { return __ZC(481, 11, this, arguments, new.target); }
function lkvBusy() { return !!(LKV.cur && !LKV.cur.dev) || LKV.q.length > 0; }
(function () {
try {
if (typeof speechSynthesis === "undefined" || !speechSynthesis)
return;
var P = Object.getPrototypeOf(speechSynthesis);
if (!P || typeof P.speak !== "function")
return;
var sp = P.speak, cn = P.cancel;
LKV.speak0 = sp;
P.speak = function (u) {
try {
if (u && !u.voice) {
var b = lkvDeviceBest(u.lang);
if (b) {
u.voice = b;
if (!u.lang)
u.lang = b.lang;
}
}
var realKid = u && u.voice && /\b(ana|maisie)\b/i.test(u.voice.name || "") && /natural|online|neural/i.test(u.voice.name || "");
if (u && u.text && !realKid && lkvWant() && lkvEnglish(u)) {
if (LKV.st === "off")
lkvLoad();
if (LKV.st === "ready" || (lkvBusy() && LKV.st !== "dead")) {
if (LKV.w && lkvTake(u)) {
if (typeof ezaCfg === "function" && ezaCfg().cap && typeof ezaCapShow === "function")
ezaCapShow(u.text);
return;
}
}
}
}
catch (e) { }
return sp.apply(this, arguments);
};
P.cancel = function () { try {
lkvStop();
}
catch (e) { } return cn.apply(this, arguments); };
var dS = Object.getOwnPropertyDescriptor(P, "speaking"), dP = Object.getOwnPropertyDescriptor(P, "pending");
if (dS && dS.get)
Object.defineProperty(P, "speaking", { configurable: true, enumerable: dS.enumerable, get: function () { return lkvBusy() || dS.get.call(this); } });
if (dP && dP.get)
Object.defineProperty(P, "pending", { configurable: true, enumerable: dP.enumerable, get: function () { return LKV.q.length > 0 || dP.get.call(this); } });
}
catch (e) { }
})();
function lkvState() { return __ZC(481, 12, this, arguments, new.target); }
function lkvSetPaint() { var s = document.getElementById("lkv-set-st"); if (s)
s.textContent = lkvState(); }
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () {
var r = op.apply(this, arguments);
try {
if (!lkvPC())
return r;
var sel = document.getElementById("lkv-set-v");
if (!sel) {
var anchor = document.getElementById("svo-set") || document.getElementById("fvo-set") || document.getElementById("advanced");
if (!anchor || !anchor.parentNode)
return r;
var d = document.createElement("div");
d.id = "lkv-set";
d.style.cssText = "margin:10px 0 0";
d.innerHTML = "<label for='lkv-set-v'>Voices</label><select id='lkv-set-v' style='width:100%'><option value='1'>Lifelike voices (made on this computer)</option><option value='0'>The device's own best natural voices</option></select>" +
"<div id='lkv-set-st' style='font-size:12px;opacity:.8;margin-top:4px'></div>";
anchor.parentNode.insertBefore(d, anchor.nextSibling);
sel = document.getElementById("lkv-set-v");
sel.onchange = function () {
var c = cfg();
c.lifeVoice = sel.value === "1";
setCfg(c);
if (!c.lifeVoice)
lkvStop();
else if (LKV.st === "slow" && !LKV.w) {
try {
localStorage.removeItem(LKV_SLOWKEY);
}
catch (e) { }
LKV.st = "off";
}
lkvSetPaint();
};
}
sel.value = cfg().lifeVoice === true ? "1" : "0";
lkvSetPaint();
}
catch (e) { }
return r;
};
})();
