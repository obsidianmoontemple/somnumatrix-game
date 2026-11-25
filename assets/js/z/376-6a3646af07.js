/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(376, function () {
"use strict";
return [
function (c, text, done) {
if (!fvoOn()) {
if (done)
done();
return;
}
var t = fvoClean(text);
if (!t) {
if (done)
done();
return;
}
if (typeof svoSys === "function" ? svoSys(t) : /rate[ _-]?limit|organi[sz]ation|tokens? per|[{}`]/i.test(t)) {
if (done)
done();
return;
}
try {
var V = FVO.voices && FVO.voices.length ? FVO.voices : fvoVoices(), h = fvoHash((c && c.name) || "someone"), god = typeof okyGod === "function" && okyGod(c);
var sx = fvoSex(c), age = c && c.ftkAge || 0, voice = null;
var VS = sx ? V.filter(function (v) { return fvoVoiceSex(v) === sx; }) : [];
if (!VS.length && sx)
VS = V.filter(function (v) { return !fvoVoiceSex(v); });
if (!VS.length)
VS = V;
VS = fvoBest(VS);
if (VS.length)
voice = VS[h % VS.length];
var match = !!(voice && sx && fvoVoiceSex(voice) === sx);
var p = 0.95 + ((h >>> 8) % 11) / 100, rt = 0.96 + ((h >>> 16) % 9) / 100;
if (!match && sx === "f")
p = 1.08 + ((h >>> 8) % 9) / 100;
else if (!match && sx === "m")
p = 0.84 + ((h >>> 8) % 9) / 100;
if (age && age < 13) {
p = Math.min(1.5, p + 0.22);
rt = Math.min(1.12, rt + 0.05);
}
else if (age >= 62) {
p = Math.max(0.7, p - 0.06);
rt = Math.max(0.84, rt - 0.08);
}
else if (age && age < 26)
rt = Math.min(1.1, rt + 0.03);
if (god) {
p = 0.78;
rt = 0.9;
}
if (c && c.fvoP)
p = c.fvoP;
if (c && c.fvoRt)
rt = c.fvoRt;
var dv = god && typeof dvoPick === "function" ? dvoPick(c, V) : null;
if (dv) {
voice = dv.voice;
p = dv.p;
rt = dv.rt;
sx = dv.sx;
h = dv.h;
}
var parts = fvoPieces(t.slice(0, 900)), left = parts.length, fin = false, started = false, again = false, run = (FVO.run = (FVO.run || 0) + 1);
var end = function () { if (fin)
return; if (--left <= 0) {
fin = true;
if (done)
done();
} };
var retry = function () {
if (again || started || fin || run !== FVO.run)
return;
again = true;
var own = V.filter(function (v) { return v.localService && v !== voice && fvoReal(v) > 0; }), same = own.filter(function (v) { return sx && fvoVoiceSex(v) === sx; });
var v2 = (same.length ? same : own)[h % Math.max(1, (same.length ? same : own).length)] || null;
try {
speechSynthesis.cancel();
speechSynthesis.resume();
}
catch (e) { }
left = parts.length;
say(v2);
FVO.lastVoice.retry = v2 ? v2.name : "(the device's own)";
};
var say = function (vo) {
parts.forEach(function (x) {
var u = new SpeechSynthesisUtterance(x);
if (vo) {
u.voice = vo;
u.lang = vo.lang || "en-GB";
}
u.pitch = p;
u.rate = rt;
u.volume = 1;
u.onstart = function () { started = true; };
u.onend = function () { started = true; end(); };
u.onerror = function (ev) { var er = ev && ev.error; if (!started && !again && er !== "interrupted" && er !== "canceled")
retry();
else
end(); };
speechSynthesis.speak(u);
});
};
speechSynthesis.cancel();
try {
speechSynthesis.resume();
}
catch (e) { }
say(voice);
setTimeout(function () { if (!started && !fin && run === FVO.run && !speechSynthesis.speaking)
retry(); }, 2500);
FVO.lastVoice = { name: voice && voice.name || "", pitch: p, rate: rt, parts: parts.length, sex: sx, age: age, deity: dv ? dv.key : "" };
}
catch (e) {
if (done)
done();
}
},
function (onText, onLive) {
var SR = fvoSR();
if (!SR)
return false;
try {
if (typeof listening !== "undefined" && listening)
return false;
}
catch (e) { }
fvoStop();
fvoHush();
var rec = new SR(), said = "";
rec.lang = (typeof smlTag === "function") ? smlTag() : "en-US";
rec.continuous = true;
rec.interimResults = true;
rec.onresult = function (e) { var fin = "", live = ""; for (var i = 0; i < e.results.length; i++) {
var t = e.results[i][0].transcript;
if (e.results[i].isFinal)
fin += t + " ";
else
live += t;
} said = fin; if (onLive)
onLive((fin + live).trim()); };
rec.onend = function () { FVO.rec = null; var t = said.trim(); if (t)
onText(t); };
rec.onerror = function () { };
try {
rec.start();
FVO.rec = rec;
return true;
}
catch (e) {
return false;
}
},
function (id, label, onText, onLive) {
var b = document.createElement("button");
b.className = "btn";
b.id = id;
b.type = "button";
b.textContent = label;
b.style.touchAction = "none";
b.style.userSelect = "none";
var down = function (ev) {
ev.preventDefault();
ev.stopPropagation();
if (FVO.holding)
return;
FVO.holding = true;
b.textContent = "Listening… let go to send";
if (!fvoListen(onText, onLive)) {
FVO.holding = false;
b.textContent = label;
}
};
var up = function (ev) { if (!FVO.holding)
return; ev.preventDefault(); FVO.holding = false; b.textContent = label; fvoStop(); };
b.addEventListener("pointerdown", down);
b.addEventListener("pointerup", up);
b.addEventListener("pointercancel", up);
b.addEventListener("pointerleave", up);
b.addEventListener("keydown", function (ev) { if ((ev.key === " " || ev.key === "Enter") && !FVO.holding)
down(ev); });
b.addEventListener("keyup", function (ev) { if (ev.key === " " || ev.key === "Enter")
up(ev); });
return b;
},
function () {
if (!fvoSR())
return;
var b = document.getElementById("fvo-mic");
if (!b) {
var send = document.getElementById("t-send");
if (!send || !send.parentNode)
return;
b = fvoHoldButton("fvo-mic", "🎤 Hold to talk", function (t) {
var ta = document.getElementById("t-say");
if (!ta || !talkWith)
return;
ta.value = t;
if (typeof sendTalk === "function")
sendTalk();
}, function (live) { var ta = document.getElementById("t-say"); if (ta)
ta.value = live; });
send.parentNode.insertBefore(b, send);
}
b.style.display = fvoWho(talkWith) && talkWith.awake ? "" : "none";
},
function (on) {
clearInterval(FVO.ringT);
FVO.ringT = null;
if (!on)
return;
var play = function () {
try {
var c = typeof vcCtx === "function" ? vcCtx() : null;
if (!c)
return;
if (typeof pclBell === "function")
pclBell(c, on === "in" ? "in" : "out");
}
catch (e) { }
try {
if (on === "in" && navigator.vibrate)
navigator.vibrate([300, 200, 300]);
}
catch (e) { }
};
play();
FVO.ringT = setInterval(play, 2800);
},
function (id, bottom) {
var w = document.createElement("div");
w.id = id;
w.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);" + (bottom ? "bottom:calc(90px + env(safe-area-inset-bottom,0px))" : "top:calc(70px + env(safe-area-inset-top,0px))") + ";z-index:2147482000;width:min(340px,calc(100vw - 32px));background:#0B0A14;border:2px solid #4CC77A;border-radius:20px;padding:14px;color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.5)";
document.body.appendChild(w);
return w;
},
function (c, name, they, opener) {
if (opener)
return opener;
var first = String(name || "").split(" ")[0] || "me", at = c && c.stfPlace ? " from " + c.stfPlace : "";
if (!they)
return "Hello, " + first + " speaking.";
var L = ["Hi, it's " + first + at + ". I was just thinking of you, so I thought I'd ring. How are you doing?",
"Hello, it's " + first + at + ". Have you got a minute? I wanted to hear how you're getting on.",
"Hi there, it's " + first + at + ". Nothing urgent, I just wanted to catch up with you."];
return L[fvoHash(name + new Date().getDate()) % L.length];
},
function (name, they, opener, about) {
if (!name || typeof fpsChar !== "function")
return;
if (!they && fvoBusy()) {
if (FVO.call && FVO.call.name === name)
return;
setStatus("📞 You're already on a call.");
return;
}
fvoCallEnd(true);
var c = fpsChar(name), T = fpsStore(), L = T.log[name] || (T.log[name] = []), w = fvoCard("fvo-call", true);
FVO.call = { name: name, c: c, from: L.length, at: Date.now(), el: w, timer: null };
var k = FVO.call;
w.innerHTML = "<div style='font-size:12px;color:#4CC77A'>" + (they ? "On a call" : "Calling…") + " · <span id='fvo-t'>0:00</span></div><div style='font:600 18px system-ui,sans-serif;margin:4px 0'>" + esc(name) + "</div>" +
(function () { var wh = typeof twhLine === "function" ? twhLine(name) : ""; return wh ? "<div id='fvo-where' style='font-size:12.5px;color:#A9A2C0'>" + esc(wh) + "</div>" : ""; })() +
fvoAbout(about) +
"<div id='fvo-line' style='min-height:40px;color:#C9C2E0;font-size:13.5px;margin:6px 0'>" + (they ? "…" : "Ringing…") + "</div><div id='fvo-acts' style='display:flex;gap:8px;justify-content:center;flex-wrap:wrap'></div>" +
"<div style='display:flex;gap:6px;margin-top:8px'><input id='fvo-type' maxlength='400' placeholder='" + (fvoSR() ? "Or type here" : "Type what you say") + "' style='flex:1;min-width:0;padding:8px 10px;border-radius:12px;border:1px solid #3A3550;background:#15131F;color:#EDE8F8;font:14px system-ui,sans-serif'><button class='btn' id='fvo-typesend' type='button'>Say</button></div>";
var acts = w.querySelector("#fvo-acts"), line = w.querySelector("#fvo-line"), ti = w.querySelector("#fvo-type");
if (fvoSR())
acts.appendChild(fvoHoldButton("fvo-callmic", "🎤 Hold to talk", function (t) { fvoCallSay(t); }, function (live) { line.textContent = "You: " + live; }));
acts.appendChild(fvoBtn("Hang up", "#C0392B", function () { fvoCallEnd(); }));
var typed = function () { var v = ti.value.trim(); ti.value = ""; if (v)
fvoCallSay(v); };
ti.addEventListener("keydown", function (ev) { ev.stopPropagation(); if (ev.key === "Enter") {
ev.preventDefault();
typed();
} });
ti.addEventListener("keyup", function (ev) { ev.stopPropagation(); });
w.querySelector("#fvo-typesend").onclick = function (ev) { ev.stopPropagation(); typed(); };
k.timer = setInterval(function () { var s = Math.floor((Date.now() - k.at) / 1000), el = document.getElementById("fvo-t"); if (el)
el.textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }, 1000);
var hello = function () {
if (FVO.call !== k || k.up)
return;
k.up = true;
fvoRing(false);
k.at = Date.now();
var hd = w.querySelector("div");
if (hd)
hd.innerHTML = "On a call · <span id='fvo-t'>0:00</span>";
line.textContent = "…";
fpsAsk(c, fvoPlain(L), typeof they === "string" ? they : they ? "You have just rung them on the phone and they picked up. Say hello the way you really would and why you are ringing: something from your day, a follow-up on what you remember of them, or news from your work. Never ask them to do a task." :
"They have just rung you and you picked up. Answer the phone the way you really would.", true, fvoOpener(c, name, they, opener)).then(function (t) {
if (FVO.call !== k)
return;
L.push({ t: "📞 " + t, at: Date.now() });
fpsSave();
line.textContent = name.split(" ")[0] + ": " + fvoClean(t);
fvoSpeak(c, t);
if (typeof PH !== "undefined" && PH.open && PH.tab === "town")
phPaint(true);
});
};
if (they)
hello();
else {
fvoRing("out");
setTimeout(hello, 2400 + Math.random() * 2600);
}
},
function (t) {
var k = FVO.call;
if (!k)
return;
var L = fpsStore().log[k.name] || (fpsStore().log[k.name] = []), line = document.getElementById("fvo-line");
fvoRing(false);
fvoHush();
if (!k.up) {
k.up = true;
var hd = k.el && k.el.querySelector("div");
if (hd)
hd.innerHTML = "On a call · <span id='fvo-t'>0:00</span>";
}
L.push({ me: 1, t: "📞 " + t, at: Date.now() });
fpsSave();
if (line)
line.textContent = "You: " + t;
fpsAsk(k.c, fvoPlain(L), "", true).then(function (r) {
if (FVO.call !== k)
return;
L.push({ t: "📞 " + r, at: Date.now() });
fpsSave();
var ln = document.getElementById("fvo-line");
if (ln)
ln.textContent = k.name.split(" ")[0] + ": " + fvoClean(r);
fvoSpeak(k.c, r);
if (typeof PH !== "undefined" && PH.open && PH.tab === "town")
phPaint(true);
});
},
function (quiet) {
var k = FVO.call;
if (!k)
return;
FVO.call = null;
clearInterval(k.timer);
fvoRing(false);
fvoStop();
fvoHush();
if (k.el && k.el.parentNode)
k.el.parentNode.removeChild(k.el);
if (quiet)
return;
var L = (fpsStore().log[k.name] || []).slice(k.from), lines = L.map(function (m) { return { who: m.me ? "me" : "them", text: String(m.t).replace(/^📞 /, "") }; });
if (lines.some(function (x) { return x.who === "me"; }) && typeof fmyRemember === "function")
fmyRemember(k.c, [{ who: "them", text: "(on a phone call)" }].concat(lines));
},
function (name, why, opener, about) {
if (!name || fvoBusy() || !fvoSettled() || typeof fpsChar !== "function")
return false;
var c = fpsChar(name);
if (typeof okyGod === "function" && okyGod(c))
return false;
var w = fvoCard("fvo-inc", false), k = FVO.inc = { name: name, el: w };
var job = [c.stfTitle, c.stfPlace].filter(Boolean).join(", ");
w.innerHTML = "<div style='font-size:12px;color:#4CC77A'>📞 Incoming call</div><div style='font:600 18px system-ui,sans-serif;margin:4px 0 2px'>" + esc(name) + "</div>" +
(job ? "<div style='font-size:12.5px;color:#A9A2C0;margin-bottom:8px'>" + esc(job) + "</div>" : "<div style='height:8px'></div>") + fvoAbout(about) + "<div class='fvo-acts' style='display:flex;gap:8px;justify-content:center;margin-top:6px'></div>";
var acts = w.querySelector(".fvo-acts");
var close = function (missed) {
if (FVO.inc !== k)
return;
FVO.inc = null;
clearTimeout(k.t);
fvoRing(false);
if (w.parentNode)
w.parentNode.removeChild(w);
if (missed) {
var T = fpsStore(), L = T.log[name] || (T.log[name] = []);
L.push({ t: "📞 Missed call", at: Date.now() });
T.unread[name] = (T.unread[name] || 0) + 1;
fpsSave();
if (typeof fpsBadge === "function")
fpsBadge();
setStatus("📞 Missed call from <b>" + esc(name) + "</b>. Ring them back from Phone &gt; Town.");
}
};
acts.appendChild(fvoBtn("Answer", "#2E8B57", function () { close(false); fvoCallOpen(name, why || true, opener, about); }));
acts.appendChild(fvoBtn("Decline", "#C0392B", function () { close(true); }));
k.t = setTimeout(function () { close(true); }, 30000);
fvoRing("in");
return true;
},
function () {
try {
fvoKeeper();
if (!(typeof signedIn === "function" && signedIn()) || document.visibilityState === "hidden" || fvoBusy() || !fvoMayRing())
return;
if (typeof talkOpen !== "undefined" && talkOpen)
return;
if (typeof PH !== "undefined" && PH.open)
return;
if (Date.now() - FVO.lastRing < 60 * 60000 || typeof fpsKnown !== "function")
return;
var L = fpsKnown().filter(function (p) { return Date.now() - p.last < 5 * 86400000 && Date.now() - p.last > 30 * 60000 && !(typeof twhAsleep === "function" && twhAsleep(p.name)); });
if (!L.length || Math.random() > 0.3)
return;
FVO.lastRing = Date.now();
fvoIncoming(L[Math.floor(Math.random() * Math.min(5, L.length))].name);
}
catch (e) { }
}
];
});
