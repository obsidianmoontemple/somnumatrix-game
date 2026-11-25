/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SML_LANGS = [
["en", "English", "English", "en-US"], ["es", "Spanish", "Español", "es-ES"], ["fr", "French", "Français", "fr-FR"],
["de", "German", "Deutsch", "de-DE"], ["pt", "Portuguese", "Português", "pt-BR"], ["it", "Italian", "Italiano", "it-IT"],
["nl", "Dutch", "Nederlands", "nl-NL"], ["pl", "Polish", "Polski", "pl-PL"], ["tr", "Turkish", "Türkçe", "tr-TR"],
["ru", "Russian", "Русский", "ru-RU"], ["uk", "Ukrainian", "Українська", "uk-UA"], ["ar", "Arabic", "العربية", "ar-SA"],
["hi", "Hindi", "हिन्दी", "hi-IN"], ["zh", "Chinese", "中文", "zh-CN"], ["ja", "Japanese", "日本語", "ja-JP"],
["ko", "Korean", "한국어", "ko-KR"], ["vi", "Vietnamese", "Tiếng Việt", "vi-VN"], ["id", "Indonesian", "Bahasa Indonesia", "id-ID"],
["tl", "Filipino", "Filipino", "fil-PH"], ["sw", "Swahili", "Kiswahili", "sw-KE"]
];
var SML = { code: "en", map: {}, chat: {}, want: {}, wantN: 0, nodes: new Set(), orig: new WeakMap(), attrs: new WeakMap(), obs: null,
trs: {}, q: [], busy: false, next: 0, fails: 0, oldServer: false, dbP: null, saveT: 0, dirty: false, panel: null,
capOn: false, rec: null, capEl: null, pumpT: 0, ai: 0, dev: 0, applying: false };
var SML_SKIP = "script,style,textarea,code,pre,svg,[contenteditable],.notr,[data-notr],#transcript,#t-log,.wc-line,.st-line:not(.st-dim),#sml-cap,.sml-n";
function smlInfo(c) { c = c || SML.code; for (var i = 0; i < SML_LANGS.length; i++)
if (SML_LANGS[i][0] === c)
return SML_LANGS[i]; return SML_LANGS[0]; }
function smlCode() { return SML.code; }
function smlTag() { return smlInfo()[3]; }
function smlOn() { return SML.code !== "en"; }
function smlConf() {
var c = null;
try {
c = (typeof cloudSetting === "function") ? cloudSetting("translate") : null;
if (typeof c === "string")
c = JSON.parse(c);
}
catch (e) {
c = null;
}
c = c && typeof c === "object" ? c : {};
return { menus: c.menus !== false, chat: c.chat !== false, folk: c.folk !== false, voice: c.voice !== false, ai: c.ai !== false };
}
function smlStore(k, v) { try {
if (v == null)
localStorage.removeItem(k);
else
localStorage.setItem(k, v);
}
catch (e) { } }
function smlRead(k) { try {
return localStorage.getItem(k);
}
catch (e) {
return null;
} }
var SML_WORDS = {
en: "the and you is are to of it that this what have was for with not but your my me i we they do can just like so here there how hello yes no",
es: "el la los las que de y es en un una por para con no pero tu mi yo hola gracias sí qué cómo está estoy muy bien",
fr: "le la les des et est un une que qui pour pas avec je tu vous nous bonjour merci oui c'est très bien suis",
de: "der die das und ist nicht ich du sie wir ein eine mit auf für hallo danke ja nein wie gut bin",
pt: "o a os as que de e é um uma não com para você eu olá obrigado sim muito bem estou está",
it: "il lo la gli le che di e è un una non per con io tu ciao grazie sì molto bene sono",
nl: "de het een en is niet ik jij je wij met op voor hallo dank ja nee hoe goed ben",
pl: "i w nie jest to że na się z do jak tak co ja ty cześć dziękuję dobrze",
tr: "ve bir bu da de ne için ben sen merhaba teşekkür evet hayır iyi çok",
vi: "và là của không có một tôi bạn này được xin chào cảm ơn rất",
id: "dan yang di ini itu tidak saya kamu ada dengan untuk halo terima kasih ya baik",
tl: "ang ng sa at ako ikaw ito hindi oo salamat po kumusta mga",
sw: "na ya wa kwa ni la za katika mimi wewe habari asante ndiyo hapana sana"
};
var SML_SET = {};
Object.keys(SML_WORDS).forEach(function (k) { var s = {}; SML_WORDS[k].split(" ").forEach(function (w) { s[w] = 1; }); SML_SET[k] = s; });
function smlGuess(t) { return __ZC(427, 0, this, arguments, new.target); }
function smlNeeds(t) {
var g = smlGuess(t);
if (g === "same" || g === SML.code)
return false;
if (g === "en?")
return SML.code !== "en";
return true;
}
function smlDevice(from, to, gesture) { return __ZC(427, 1, this, arguments, new.target); }
function smlLimit(p, ms) { return new Promise(function (ok, no) { var t = setTimeout(function () { ok(null); }, ms); Promise.resolve(p).then(function (v) { clearTimeout(t); ok(v); }, function (e) { clearTimeout(t); no(e); }); }); }
function smlDevOne(tr, key, text) {
return smlLimit(tr.translate(text), 5000).then(function (out) { if (out == null) {
SML.trs[key] = Promise.resolve(null);
return null;
} return out; }, function () { return null; });
}
function smlGesture() { if (!smlOn())
return; var k = "en>" + SML.code; if (!SML.trs[k])
smlDevice("en", SML.code, true); }
function smlAiOk() {
if (!smlConf().ai)
return false;
if (typeof cfg !== "function" || typeof llmTarget !== "function")
return false;
var c = cfg();
if (!c || c.mode === "off")
return false;
if (typeof navigator !== "undefined" && navigator.onLine === false)
return false;
return Date.now() >= SML.next;
}
function smlPrompt(to, n) { return __ZC(427, 2, this, arguments, new.target); }
function smlAiCall(texts, to, keep) { return __ZC(427, 3, this, arguments, new.target); }
function smlTr(text, kind, cb) {
var from = kind === "ui" ? "en" : "";
SML.q.push({ t: text, kind: kind, from: from, cb: cb });
smlPumpSoon(kind === "chat" ? 60 : 400);
}
function smlPumpSoon(ms) { if (SML.pumpT)
return; SML.pumpT = setTimeout(function () { SML.pumpT = 0; smlPump(); }, ms); }
function smlPump() { return __ZC(427, 4, this, arguments, new.target); }
function smlDb() { return __ZC(427, 5, this, arguments, new.target); }
function smlLoad(code) {
return smlDb().then(function (db) {
if (!db)
return {};
return new Promise(function (ok) { try {
var g = db.transaction("tr").objectStore("tr").get(code);
g.onsuccess = function () { ok(g.result || {}); };
g.onerror = function () { ok({}); };
}
catch (e) {
ok({});
} });
});
}
function smlSave() { return __ZC(427, 6, this, arguments, new.target); }
function smlKey(s) { var n = []; var k = s.replace(/\d+(?:[.,:]\d+)*/g, function (m) { n.push(m); return "{" + n.length + "}"; }); return { k: k, n: n }; }
function smlFill(t, n) { return t.replace(/\{(\d+)\}/g, function (m, i) { return n[i - 1] != null ? n[i - 1] : m; }); }
function smlFits(k, t) { var a = (k.match(/\{\d+\}/g) || []).sort().join(), b = (String(t).match(/\{\d+\}/g) || []).sort().join(); return a === b; }
function smlSkip(el) { try {
return !el || !!el.closest(SML_SKIP);
}
catch (e) {
return true;
} }
function smlWord(core) { return core.length >= 2 && core.length <= 220 && /[A-Za-z]{2}/.test(core); }
function smlNode(n) { return __ZC(427, 7, this, arguments, new.target); }
var SML_ATTRS = ["placeholder", "title"];
function smlAttr(el, a) { return __ZC(427, 8, this, arguments, new.target); }
function smlWant(k, who) {
var w = SML.want[k];
if (!w) {
w = SML.want[k] = { who: [], asked: false };
SML.wantN++;
}
if (w.who.indexOf(who) < 0)
w.who.push(who);
if (w.who.length > 40)
w.who.shift();
}
function smlShown(x) {
var el = x.el || x.parentElement;
if (!el || !el.isConnected)
return false;
try {
if (el.checkVisibility)
return el.checkVisibility();
}
catch (e) { }
return el.getClientRects().length > 0;
}
function smlAsk() { return __ZC(427, 9, this, arguments, new.target); }
function smlWalk(root) { return __ZC(427, 10, this, arguments, new.target); }
function smlWatch() { return __ZC(427, 11, this, arguments, new.target); }
function smlUnwatch() {
if (SML.obs) {
SML.obs.disconnect();
SML.obs = null;
}
SML.nodes.forEach(function (x) {
if (x.nodeType === 3) {
var r = SML.orig.get(x);
if (r && r.t === x.nodeValue)
x.nodeValue = r.o;
}
else {
var m = SML.attrs.get(x) || {};
Object.keys(m).forEach(function (a) { if (x.getAttribute(a) === m[a].t)
x.setAttribute(a, m[a].o); });
}
});
SML.nodes = new Set();
SML.orig = new WeakMap();
SML.attrs = new WeakMap();
SML.want = {};
SML.wantN = 0;
}
function smOrig(el) {
if (!el)
return "";
if (!smlOn())
return el.textContent;
var s = "", tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n;
while ((n = tw.nextNode())) {
var r = SML.orig.get(n);
s += (r && r.t === n.nodeValue) ? r.o : n.nodeValue;
}
return s;
}
setInterval(function () {
if (!smlOn())
return;
smlAsk();
if (SML.nodes.size > 3000)
SML.nodes.forEach(function (x) { if (!x.isConnected)
SML.nodes.delete(x); });
}, 1500);
function smlChatLine(l, again) { return __ZC(427, 12, this, arguments, new.target); }
function smlChatAll() {
var re = function () {
try {
if (typeof WCHAT !== "undefined" && WCHAT.open && typeof wcPaint === "function")
wcPaintRaw(false);
}
catch (e) { }
try {
if (typeof streetOpen !== "undefined" && streetOpen && typeof paintStreet === "function")
paintStreetRaw();
}
catch (e) { }
};
try {
if (typeof WCHAT !== "undefined")
WCHAT.lines.forEach(function (l) { smlChatLine(l, re); });
}
catch (e) { }
try {
if (typeof chatLines !== "undefined")
chatLines.forEach(function (l) { smlChatLine(l, re); });
}
catch (e) { }
}
var wcPaintRaw = function () { }, paintStreetRaw = function () { };
(function () {
if (typeof wcPaint === "function") {
wcPaintRaw = wcPaint;
wcPaint = function () { try {
smlChatAll();
}
catch (e) { } return wcPaintRaw.apply(this, arguments); };
}
if (typeof paintStreet === "function") {
paintStreetRaw = paintStreet;
paintStreet = function () { try {
smlChatAll();
}
catch (e) { } return paintStreetRaw.apply(this, arguments); };
}
if (typeof sayOver === "function") {
var so = sayOver;
sayOver = function (id, text) {
var self = this, args = arguments;
if (!smlConf().chat || !smlNeeds(text))
return so.apply(self, args);
var hit = SML.chat[text];
if (hit)
return so.call(self, id, hit);
smlTr(text, "chat", function (out) { if (out)
SML.chat[text] = out; so.call(self, id, out || text); });
};
}
if (typeof renderLog === "function") {
var rl = renderLog;
renderLog = function () {
var r = rl.apply(this, arguments);
try {
if (smlOn() && smlConf().folk) {
var el = document.getElementById("t-log");
if (el)
Array.prototype.forEach.call(el.querySelectorAll("p.them"), function (p) {
var t = p.textContent;
if (!t || t === "…" || !smlNeeds(t))
return;
if (SML.chat[t]) {
p.textContent = SML.chat[t];
return;
}
smlTr(t, "chat", function (out) { if (!out)
return; SML.chat[t] = out; if (p.isConnected && p.textContent === t)
p.textContent = out; });
});
}
}
catch (e) { }
return r;
};
}
})();
setInterval(function () { try {
smlChatAll();
}
catch (e) { } }, 2000);
function smlRule() { return __ZC(427, 13, this, arguments, new.target); }
(function () {
if (typeof llmBody !== "function")
return;
var lb = llmBody;
llmBody = function (c, extra) {
if (extra && extra.say) {
var x = Object.assign({}, extra);
delete x.say;
if (smlOn() && smlConf().folk && Array.isArray(x.messages)) {
var m = x.messages.slice(), at = 0;
while (at < m.length && m[at].role === "system")
at++;
m.splice(at, 0, { role: "system", content: smlRule() });
x.messages = m;
}
return lb.call(this, c, x);
}
return lb.apply(this, arguments);
};
})();
(function () {
if (typeof fvoVoices === "function") {
var fv = fvoVoices;
fvoVoices = function () {
var v = fv.apply(this, arguments);
if (!smlOn())
return v;
try {
var all = speechSynthesis.getVoices() || [], c = SML.code === "tl" ? "fil" : SML.code, mine = all.filter(function (x) { return String(x.lang || "").toLowerCase().indexOf(c) === 0 || (c === "fil" && /^tl/i.test(x.lang || "")); });
if (mine.length)
FVO.voices = mine;
}
catch (e) { }
return FVO.voices;
};
}
try {
if (window.speechSynthesis && speechSynthesis.speak) {
var sp = function (u) { return Object.getPrototypeOf(speechSynthesis).speak.call(speechSynthesis, u); };
speechSynthesis.speak = function (u) { try {
if (smlOn() && u && !u.voice && (!u.lang || /^en/i.test(u.lang)) && smlGuess(u.text) === SML.code)
u.lang = smlTag();
}
catch (e) { } return sp(u); };
}
}
catch (e) { }
})();
function smlCapBox() { return __ZC(427, 14, this, arguments, new.target); }
function smlCapShow(name, text) { return __ZC(427, 15, this, arguments, new.target); }
function smlCapIn(id, raw) { return __ZC(427, 16, this, arguments, new.target); }
(function () {
if (typeof vcPeer !== "function")
return;
var vp = vcPeer;
vcPeer = function (id) {
var P = vp.apply(this, arguments);
try {
var dc = P.pc.createDataChannel("sm-cap", { negotiated: true, id: 7 });
dc.onmessage = function (e) { smlCapIn(id, e.data); };
P.dc = dc;
}
catch (e) { }
return P;
};
})();
function smlCapSend(text) { return __ZC(427, 17, this, arguments, new.target); }
function smlCapTick() {
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
var other = false;
try {
other = (typeof listening !== "undefined" && listening) || (typeof FVO !== "undefined" && FVO.rec);
}
catch (e) { }
var want = SML.capOn && SR && smlConf().voice && typeof VC !== "undefined" && VC.on && !VC.muted && Object.keys(VC.peers).length && !other;
if (!want) {
if (SML.rec) {
try {
SML.rec.onend = null;
SML.rec.abort();
}
catch (e) { }
SML.rec = null;
}
return;
}
if (SML.rec)
return;
try {
var r = new SR();
r.lang = smlTag();
r.continuous = true;
r.interimResults = false;
r.onresult = function (e) { for (var i = e.resultIndex; i < e.results.length; i++)
if (e.results[i].isFinal) {
var t = e.results[i][0].transcript.trim();
if (t)
smlCapSend(t);
} };
r.onerror = function (e) { if (e && (e.error === "not-allowed" || e.error === "service-not-allowed")) {
SML.capOn = false;
smlStore("sm.lang.cap", null);
} };
r.onend = function () { SML.rec = null; };
r.start();
SML.rec = r;
}
catch (e) {
SML.rec = null;
}
}
setInterval(smlCapTick, 2000);
function smlSet(code, gesture) {
var was = SML.code;
code = smlInfo(code)[0];
SML.code = code;
smlStore("sm.lang", code);
try {
document.documentElement.lang = code;
}
catch (e) { }
if (code === was && SML.obs)
return Promise.resolve();
smlUnwatch();
SML.map = {};
SML.q = SML.q.filter(function (j) { return j.kind === "chat"; });
try {
[].concat(typeof WCHAT !== "undefined" ? WCHAT.lines : [], typeof chatLines !== "undefined" ? chatLines : []).forEach(function (l) { if (l.orig) {
l.body = l.orig;
delete l.orig;
} delete l.smlT; });
}
catch (e) { }
SML.chat = {};
if (typeof FVO !== "undefined")
try {
fvoVoices();
}
catch (e) { }
if (code === "en")
return Promise.resolve();
if (gesture)
smlDevice("en", code, true);
return smlLoad(code).then(function (m) { if (SML.code !== code)
return; SML.map = m || {}; smlWatch(); });
}
function smlPanel() { return __ZC(427, 18, this, arguments, new.target); }
function smlPaint() { return __ZC(427, 19, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-lang"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-lang";
b.textContent = "🌐 Language";
b.title = "Play in your own language";
b.onclick = smlPanel;
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return !!(SML.panel && SML.panel.style.display !== "none"); }, close: function () { SML.panel.style.display = "none"; } });
})();
(function () {
SML.capOn = smlRead("sm.lang.cap") === "1";
var saved = smlRead("sm.lang"), code = saved;
if (!code) {
var nav = String((navigator.languages && navigator.languages[0]) || navigator.language || "en").toLowerCase();
code = nav.indexOf("fil") === 0 ? "tl" : nav.slice(0, 2);
if (smlInfo(code)[0] !== code)
code = "en";
}
var go = function () {
smlSet(code, false).then(function () {
if (!saved && code !== "en") {
smlStore("sm.lang", code);
setTimeout(function () { if (typeof setStatus === "function")
setStatus("🌐 " + smlInfo(code)[2] + " — ☰ Menu → 🌐 Language"); }, 6000);
}
});
};
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
addEventListener("pointerdown", smlGesture, { passive: true });
})();
