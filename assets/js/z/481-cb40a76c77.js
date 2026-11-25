/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(481, function () {
"use strict";
return [
function () {
try {
if (typeof LITE !== "undefined" && LITE)
return false;
var ua = navigator.userAgent || "";
if (/Android|iPhone|iPad|iPod|Mobile|OculusBrowser|Quest|Pico|Wolvic/i.test(ua))
return false;
if (navigator.deviceMemory && navigator.deviceMemory < 4)
return false;
return typeof Worker !== "undefined" && typeof WebAssembly !== "undefined" && !!(window.AudioContext || window.webkitAudioContext);
}
catch (e) {
return false;
}
},
function (lang) {
try {
var all = speechSynthesis.getVoices() || [];
if (!all.length)
return null;
var want = String(lang || (typeof SML !== "undefined" && SML.code && typeof smlOn === "function" && smlOn() ? SML.code : "") || navigator.language || "en").toLowerCase();
var two = want.slice(0, 2), L = all.filter(function (v) { return String(v.lang || "").toLowerCase().replace("_", "-").indexOf(two) === 0; });
if (!L.length)
L = all.filter(function (v) { return /^en/i.test(v.lang || ""); });
if (!L.length)
L = all;
var real = typeof fvoReal === "function" ? fvoReal : function (v) { return /natural|neural|online|premium|enhanced|google/i.test(v.name || "") ? 3 : 1; };
var top = 0;
L.forEach(function (v) { top = Math.max(top, real(v)); });
var B = L.filter(function (v) { return real(v) === top; });
var ex = B.filter(function (v) { return String(v.lang || "").toLowerCase().replace("_", "-") === want; });
if (ex.length)
B = ex;
return B[0] || null;
}
catch (e) {
return null;
}
},
function (u) {
var t = String(u.text || ""), o = { sx: "", kid: false, old: false, kind: "", key: "", acc: "" };
try {
var S = typeof SVO !== "undefined" && SVO.said;
if (S && S.lines)
for (var i = 0; i < S.lines.length; i++) {
var L = S.lines[i];
if (L.text === t) {
o.sx = L.sx || "";
o.kid = !!L.kid;
o.old = !!L.old;
o.kind = L.kind || "";
o.key = "svo:" + L.who;
o.acc = L.lang || "";
o.god = L.god || "";
break;
}
}
}
catch (e) { }
try {
var F = typeof FVO !== "undefined" && FVO.lastVoice;
if (!o.key && F && u.voice && F.name === u.voice.name && Math.abs((F.pitch || 1) - (u.pitch || 1)) < 0.001) {
o.sx = F.sex || "";
o.kid = F.age > 0 && F.age < 13;
o.old = F.age >= 62;
o.key = "fvo:" + F.name + "|" + F.pitch;
o.god = F.deity || "";
}
}
catch (e) { }
var vs = u.voice ? (typeof fvoVoiceSex === "function" ? fvoVoiceSex(u.voice) : "") : "";
if (!o.sx)
o.sx = vs || ((u.pitch || 1) > 1.06 ? "f" : "m");
if (!o.kid && u.voice && /\b(ana|maisie|child|kid|junior)\b/i.test(u.voice.name || ""))
o.kid = true;
if (!o.kid && !o.key && (u.pitch || 1) >= 1.3)
o.kid = true;
if (!o.acc)
o.acc = u.voice && u.voice.lang || u.lang || "en-GB";
if (!o.key)
o.key = (u.voice && u.voice.name || "default") + "|" + (u.pitch || 1).toFixed(2);
return o;
},
function (u) {
var o = lkvWho(u), acc = /^en-(gb|ie|au|nz|za)|scot/i.test(o.acc) ? "gb" : "us", h = lkvHash(o.key);
var p = u.pitch || 1, rt = u.rate || 1, pr = 1;
var set = LKV_V[acc][o.kid ? (o.sx === "m" ? "km" : "kf") : (o.sx === "f" ? "f" : "m")];
var voice = set[h % set.length];
if (o.kid)
pr = o.sx === "m" ? 1.2 : 1.24;
else if (o.god)
pr = Math.max(0.84, Math.min(1, Math.pow(p / 0.92, 0.6)));
else if (p < 0.86)
pr = Math.max(0.78, Math.pow(p / 0.9, 0.7));
else if (p > 1.28)
pr = Math.min(1.16, Math.pow(p / 1.15, 0.7));
if (o.old && !o.kid)
pr = Math.min(pr, 0.97);
var speed = Math.max(0.7, Math.min(1.35, rt / pr));
return { voice: voice, pr: pr, speed: speed, kid: o.kid, sx: o.sx, acc: acc };
},
function () {
if (LKV.st !== "off")
return;
if (lkvSlowSaved()) {
LKV.st = "slow";
return;
}
LKV.st = "loading";
try {
var w = new Worker(LKV_WORKER, { type: "module" });
LKV.w = w;
w.onmessage = function (e) {
var m = e.data || {};
if (m.t === "prog") {
LKV.prog = m.p;
lkvSetPaint();
}
else if (m.t === "note") {
if (window.console)
console.warn("[lifelike-voice] " + m.e);
}
else if (m.t === "ready") {
LKV.dev = m.dev;
LKV.bench = m.rtf;
if (!(m.rtf < LKV_MAXRTF))
lkvSlow("this computer made a voice at " + (+m.rtf).toFixed(2) + "x real time (" + m.dev + ")");
else {
LKV.st = "ready";
lkvSetPaint();
}
}
else if (m.t === "fail") {
LKV.st = "dead";
LKV.err = m.e || "";
lkvSetPaint();
if (window.console)
console.warn("[lifelike-voice] " + LKV.err);
}
else if (m.t === "pcm")
lkvGot(m);
};
w.onerror = function (ev) { LKV.st = "dead"; LKV.err = String(ev && ev.message || "worker"); lkvSetPaint(); };
w.postMessage({ t: "load", model: LKV_MODEL, wasm: LKV_WASM, gpu: !!navigator.gpu, anyGpu: !!window.LKV_ANYGPU });
}
catch (e) {
LKV.st = "dead";
LKV.err = String(e);
}
},
function (t) {
t = String(t || "").replace(/\s+/g, " ").trim();
if (!t)
return [];
var S = t.match(/[^.!?…;]+[.!?…;]+["'”’)]*\s*|[^.!?…;]+$/g) || [t], out = [];
S.forEach(function (s) {
s = s.trim();
if (!s)
return;
while (s.length > (out.length ? 220 : 110)) {
var lim = out.length ? 220 : 110, cut = s.lastIndexOf(", ", lim);
if (cut < 30)
cut = s.lastIndexOf(" ", lim);
if (cut < 30)
break;
out.push(s.slice(0, cut + 1).trim());
s = s.slice(cut + 1).trim();
}
if (s)
out.push(s);
});
return out;
},
function (u, type, err) {
try {
var ev;
if (type === "error") {
try {
ev = new SpeechSynthesisErrorEvent("error", { utterance: u, error: err || "interrupted" });
}
catch (e) {
ev = new Event("error");
ev.error = err || "interrupted";
}
}
else {
try {
ev = new SpeechSynthesisEvent(type, { utterance: u });
}
catch (e) {
ev = new Event(type);
}
}
u.dispatchEvent(ev);
}
catch (e) {
try {
var f = u["on" + type];
if (typeof f === "function")
f.call(u, { type: type, error: err, utterance: u });
}
catch (e2) { }
}
},
function (u) {
var V = lkvVoiceFor(u), parts = lkvPieces(u.text);
if (!parts.length)
return false;
var it = { u: u, v: V, parts: parts.map(function (t) { return { t: t, id: ++LKV.id, pcm: null }; }), i: 0, started: false, dev: false, at: 0 };
parts = null;
it.parts.forEach(function (p) { LKV.w.postMessage({ t: "say", id: p.id, text: p.t, voice: it.v.voice, speed: it.v.speed }); });
LKV.q.push(it);
if (!LKV.cur)
lkvNext();
return true;
},
function (m) {
var all = (LKV.cur ? [LKV.cur] : []).concat(LKV.q);
for (var i = 0; i < all.length; i++) {
var it = all[i];
for (var j = 0; j < it.parts.length; j++) {
var p = it.parts[j];
if (p.id !== m.id)
continue;
if (m.err) {
p.err = m.err;
}
else {
p.pcm = m.pcm;
p.sr = m.sr;
var dur = m.pcm.length / m.sr;
if (dur > 0.4) {
LKV.rtf.push(m.ms / 1000 / dur);
if (LKV.rtf.length > 8)
LKV.rtf.shift();
lkvSpeedCheck();
}
}
if (it === LKV.cur && j === it.i && !it.playing)
lkvPlay();
return;
}
}
},
function (it) {
it.dev = true;
LKV.late++;
if (LKV.late >= 3 && LKV.st === "ready")
lkvSlow("three lines in a row were late");
var u = it.u, done = function () { u.removeEventListener("end", done); u.removeEventListener("error", done); if (LKV.cur === it) {
LKV.cur = null;
lkvNext();
} };
u.addEventListener("end", done);
u.addEventListener("error", done);
try {
LKV.speak0.call(speechSynthesis, u);
}
catch (e) {
done();
}
},
function () {
var it = LKV.cur;
if (!it || it.dev || it.playing)
return;
var p = it.parts[it.i];
if (!p) {
LKV.cur = null;
lkvEv(it.u, "end");
lkvNext();
return;
}
if (p.err && !p.pcm) {
it.i++;
lkvPlay();
return;
}
if (!p.pcm) {
it.playing = false;
return;
}
clearTimeout(it.wt);
try {
var ac = lkvAC(), buf = ac.createBuffer(1, p.pcm.length, p.sr);
buf.copyToChannel ? buf.copyToChannel(p.pcm, 0) : buf.getChannelData(0).set(p.pcm);
var s = ac.createBufferSource(), g = ac.createGain();
s.buffer = buf;
s.playbackRate.value = it.v.pr;
g.gain.value = Math.max(0, Math.min(1, it.u.volume == null ? 1 : it.u.volume));
s.connect(g);
g.connect(ac.destination);
LKV.src = s;
it.playing = true;
if (!it.started) {
it.started = true;
lkvEv(it.u, "start");
}
s.onended = function () {
if (LKV.cur !== it || LKV.src !== s)
return;
LKV.src = null;
p.pcm = null;
it.i++;
it.playing = false;
setTimeout(function () { if (LKV.cur === it)
lkvPlay(); }, 90);
};
s.start();
}
catch (e) {
it.i++;
it.playing = false;
lkvPlay();
}
},
function () {
var cur = LKV.cur, q = LKV.q;
LKV.cur = null;
LKV.q = [];
if (LKV.src)
try {
LKV.src.onended = null;
LKV.src.stop();
}
catch (e) { }
LKV.src = null;
if (LKV.w)
try {
LKV.w.postMessage({ t: "clear" });
}
catch (e) { }
if (cur) {
clearTimeout(cur.wt);
if (!cur.dev)
lkvEv(cur.u, "error", "interrupted");
}
q.forEach(function (it) { lkvEv(it.u, "error", "canceled"); });
lkvDrop();
},
function () {
if (!lkvPC())
return "";
if (cfg().lifeVoice !== true)
return "The device's own best natural voices are speaking. Lifelike voices are made on this computer instead (a download of about 90 to 330 MB); if they ever sound like mumbling, choose the device's voices again.";
if (LKV.st === "ready")
return "Lifelike voices are ready on this computer.";
if (LKV.st === "loading")
return "Getting the lifelike voices ready" + (LKV.prog ? " (" + LKV.prog + "%)" : "") + ": the device's natural voices speak until then.";
if (LKV.st === "slow")
return "This computer makes the lifelike voices too slowly to keep up, so its best natural voices are speaking (it tries again in a week).";
if (LKV.st === "dead")
return "The lifelike voices could not be got ready, so the device's best natural voices are speaking.";
return "Downloaded once (about 90 MB, or 330 MB to run on the graphics chip) the first time someone speaks, then kept on this computer.";
}
];
});
