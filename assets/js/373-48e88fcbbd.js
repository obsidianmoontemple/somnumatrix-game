/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FVO = { rec: null, holding: false, call: null, inc: null, voices: null, ringT: null };
function fvoOn() { var c = typeof cfg === "function" ? cfg() : {}; return (c.folkVoice !== false || (typeof SHKS !== "undefined" && SHKS.on && SHKS.voice)) && typeof speechSynthesis !== "undefined" && typeof SpeechSynthesisUtterance !== "undefined"; }
function fvoSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
function fvoWho(c) { return !!c && ((typeof fmyIsFolk === "function" && fmyIsFolk(c)) || (typeof okyGod === "function" && okyGod(c))); }
function fvoHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function fvoVoices() {
try {
var v = speechSynthesis.getVoices() || [];
var en = v.filter(function (x) { return /^en/i.test(x.lang || ""); });
FVO.voices = en.length ? en : v;
}
catch (e) {
FVO.voices = [];
}
return FVO.voices;
}
if (typeof speechSynthesis !== "undefined" && speechSynthesis.addEventListener)
try {
speechSynthesis.addEventListener("voiceschanged", fvoVoices);
}
catch (e) { }
function fvoClean(t) {
return String(t || "").replace(/\[\[[^\]]*\]\]?/g, "").replace(/\*[^*]{1,80}\*/g, "")
.replace(/[☀-➿]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|️/g, "").replace(/\s+/g, " ").trim();
}
var FVO_FN = /^(ada|cora|edie|greta|iris|lena|nora|pearl|rosa|tilda|uma|wren|yara|agnes|clara|elsie|hattie|june|mabel|olive|ruth|thea|vera|amira|dara|esi|hana|ines|keiko|mei|nadia|priya|sofia|mary|anne|ann|elizabeth|margaret|sarah|emma|alice|grace|rose|lucy|jane|helen|martha|maria|anna|eleanor|ellen|kate|catherine|molly|nell|bess|lady|mother|mrs|miss|queen|princess|grandmother|granny|gigi|aunt|sister|madame|dame|widow)$/i;
function fvoSex(c) {
if (!c)
return "";
if (c.ftkSex === "f" || c.ftkSex === "m")
return c.ftkSex;
var f = String(c.name || "").trim().split(/\s+/)[0].replace(/[^A-Za-z]/g, "");
if (FVO_FN.test(f))
return "f";
return "";
}
var FVO_VF = /female|woman|zira|samantha|susan|hazel|victoria|karen|moira|tessa|fiona|libby|sonia|aria|jenny|emma|amy|kate|serena|allison|ava|joanna|kimberly|salli|ivy|nicole|catherine|heera|veena|linda|heather|natasha|clara|michelle|sara|olivia|elsa|maisie|mia|isla/i;
var FVO_VM = /(^|[^e])male|\bman\b|david|mark|george|daniel|alex|fred|ryan|guy|thomas|james|brian|matthew|joey|justin|russell|oliver|arthur|aaron|rishi|ravi|liam|william|eric|christopher|roger|steffan|tom|richard|sean|connor|gordon|lee|nathan|reed|rocko|ralph|albert|bruce/i;
function fvoVoiceSex(v) { var n = String(v && v.name || ""); return FVO_VF.test(n) ? "f" : FVO_VM.test(n) ? "m" : ""; }
function fvoReal(v) {
var n = String(v && v.name || "");
if (/espeak|robot|novelty|bad news|bells|bubbles|cellos|whisper|zarvox|trinoids|boing|jester|organ|superstar|wobble/i.test(n))
return 0;
if (/natural|neural|online|premium|enhanced|wavenet|siri/i.test(n))
return 3;
if (/google/i.test(n))
return 2;
return 1;
}
function fvoBest(L) {
var top = 0;
L.forEach(function (v) { top = Math.max(top, fvoReal(v)); });
var keep = L.filter(function (v) { return fvoReal(v) >= (top >= 2 ? Math.max(2, top - 1) : top); });
return keep.length ? keep : L;
}
function fvoPieces(t) {
var L = String(t).match(/[^.!?…]+[.!?…]+["'”’)]*\s*|[^.!?…]+$/g) || [t], out = [], cur = "";
L.forEach(function (x) { if ((cur + x).length > 180 && cur) {
out.push(cur.trim());
cur = "";
} cur += x; });
if (cur.trim())
out.push(cur.trim());
return out.length ? out : [t];
}
function fvoSpeak(c, text, done) { return __ZC(373, 0, this, arguments, new.target); }
function fvoHush() { try {
if (typeof speechSynthesis !== "undefined")
speechSynthesis.cancel();
}
catch (e) { } }
(function () {
if (typeof renderLog !== "function")
return;
var rl = renderLog;
renderLog = function () {
var r = rl.apply(this, arguments);
try {
var c = talkWith;
if (!fvoWho(c) || !c.awake || !c.log || !c.log.length)
return r;
var last = c.log[c.log.length - 1];
if (last.who !== "me" && last.text && last.text !== "…" && c.fvoSaid !== last.text) {
c.fvoSaid = last.text;
fvoSpeak(c, last.text);
}
fvoMicPaint();
}
catch (e) { }
return r;
};
})();
(function () { if (typeof closeTalk !== "function")
return; var ct = closeTalk; closeTalk = function () { fvoHush(); fvoStop(); var b = document.getElementById("fvo-mic"); if (b)
b.style.display = "none"; return ct.apply(this, arguments); }; })();
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) { if (c && c.log && c.log.length) {
var l = c.log[c.log.length - 1];
if (l.who === "me")
c.fvoSaid = null;
} return ot.apply(this, arguments); };
})();
function fvoListen(onText, onLive) { return __ZC(373, 1, this, arguments, new.target); }
function fvoStop() { var r = FVO.rec; if (r) {
try {
r.stop();
}
catch (e) { }
} }
function fvoHoldButton(id, label, onText, onLive) { return __ZC(373, 2, this, arguments, new.target); }
function fvoMicPaint() { return __ZC(373, 3, this, arguments, new.target); }
function fvoBusy() { return !!(FVO.call || FVO.inc || (typeof PCL !== "undefined" && PCL.c)); }
function fvoRing(on) { return __ZC(373, 4, this, arguments, new.target); }
function fvoCard(id, bottom) { return __ZC(373, 5, this, arguments, new.target); }
function fvoBtn(label, bg, fn) { var b = document.createElement("button"); b.className = "btn"; b.type = "button"; b.textContent = label; if (bg) {
b.style.background = bg;
b.style.color = "#fff";
} b.onclick = function (ev) { ev.stopPropagation(); fn(); }; return b; }
function fvoPlain(L) { return L.map(function (m) { return { me: m.me, t: String(m.t).replace(/^📞 /, ""), at: m.at }; }).filter(function (m) { return m.t !== "Missed call"; }); }
function fvoOpener(c, name, they, opener) { return __ZC(373, 6, this, arguments, new.target); }
function fvoAbout(about) { return about ? "<div class='fvo-about' style='margin:6px 0 4px;padding:7px 9px;border-radius:10px;background:#1B1630;border:1px solid #3A3160;color:#F2E6C0;font-size:13px;line-height:1.4;text-align:left'>" + about + "</div>" : ""; }
function fvoCallOpen(name, they, opener, about) { return __ZC(373, 7, this, arguments, new.target); }
function fvoCallSay(t) { return __ZC(373, 8, this, arguments, new.target); }
function fvoCallEnd(quiet) { return __ZC(373, 9, this, arguments, new.target); }
FVO.lastRing = Date.now();
FVO.keeperAt = 0;
FVO.keeperOn = true;
function fvoKeeper() {
if (Date.now() - FVO.keeperAt < 30 * 60000 || typeof cityRpc !== "function")
return;
FVO.keeperAt = Date.now();
cityRpc("city_life_state").then(function (o) { var s = o && o.settings; if (s && s.folkcalls !== undefined && s.folkcalls !== null)
FVO.keeperOn = !!+s.folkcalls; }).catch(function () { });
}
function fvoMayRing() { var c = typeof cfg === "function" ? cfg() : {}; return c.folkRing !== false && FVO.keeperOn; }
function fvoIncoming(name, why, opener, about) { return __ZC(373, 10, this, arguments, new.target); }
function fvoMaybeRing() { return __ZC(373, 11, this, arguments, new.target); }
setInterval(fvoMaybeRing, 6 * 60000);
FVO.major = {};
function fvoMajor() { return __ZC(373, 12, this, arguments, new.target); }
setInterval(fvoMajor, 60000);
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
if (typeof PH === "undefined" || PH.tab !== "town" || typeof FPS === "undefined" || !FPS.with)
return r;
var back = document.querySelector("#ph-box [data-fps='back']");
if (!back || document.getElementById("fvo-callbtn"))
return r;
var b = document.createElement("button");
b.id = "fvo-callbtn";
b.type = "button";
b.textContent = "📞 Call";
b.style.cssText = typeof PH_BTN === "string" ? PH_BTN : "";
b.onclick = function (ev) { ev.stopPropagation(); fvoCallOpen(FPS.with); };
back.parentNode.appendChild(b);
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () {
var r = op.apply(this, arguments);
try {
if (document.getElementById("fvo-set")) {
document.getElementById("fvo-set-on").checked = cfg().folkVoice !== false;
document.getElementById("fvo-set-ring").checked = cfg().folkRing !== false;
return r;
}
var anchor = document.getElementById("oky-set") || document.getElementById("advanced");
if (!anchor || !anchor.parentNode)
return r;
var d = document.createElement("div");
d.id = "fvo-set";
d.style.cssText = "margin:12px 0";
d.innerHTML = "<label style='display:flex;gap:8px;align-items:center;cursor:pointer'><input type='checkbox' id='fvo-set-on'> The city's people speak out loud</label>" +
"<label style='display:flex;gap:8px;align-items:center;cursor:pointer;margin-top:8px'><input type='checkbox' id='fvo-set-ring'> People I know may phone me</label>";
anchor.parentNode.insertBefore(d, anchor);
var cb = document.getElementById("fvo-set-on");
cb.checked = cfg().folkVoice !== false;
cb.onchange = function () { var c = cfg(); c.folkVoice = cb.checked; setCfg(c); if (!cb.checked)
fvoHush(); };
var rb = document.getElementById("fvo-set-ring");
rb.checked = cfg().folkRing !== false;
rb.onchange = function () { var c = cfg(); c.folkRing = rb.checked; setCfg(c); };
}
catch (e) { }
return r;
};
})();
