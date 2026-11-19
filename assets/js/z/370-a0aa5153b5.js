/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(370, function () {
"use strict";
return [
function (c) {
if (!c)
return false;
if (c.deity || c.archetype === "deity" || /hephaestus/i.test(String(c.wKey || "")))
return true;
try {
if (typeof DEITY !== "undefined" && DEITY) {
var n = String(c.name || "").toLowerCase();
for (var k in DEITY)
if (DEITY[k] && DEITY[k].name && String(DEITY[k].name).toLowerCase() === n)
return true;
}
}
catch (e) { }
return false;
},
function () {
var el = document.getElementById("oky-bar");
if (el)
return el;
var talk = document.getElementById("talk"), log = document.getElementById("t-log");
if (!talk || !log || !log.parentNode)
return null;
el = document.createElement("div");
el.id = "oky-bar";
el.style.cssText = "display:none;margin:6px 0;padding:8px 10px;border:1px solid #C9A86A;border-radius:8px;background:rgba(201,168,106,.12);font-size:13px;line-height:1.45;color:inherit";
log.parentNode.insertBefore(el, log);
return el;
},
function (c) {
var el = okyBarEl();
if (!el)
return;
if (okyGod(c) && c.awake) {
if (okyKeeper() || okyGood()) {
el.style.display = "none";
return;
}
el.innerHTML = "<b>The gods speak in full with your own free key.</b> Until then they answer in a few words. " +
"<a href='#' id='oky-how' style='color:#C9A86A;font-weight:bold'>Show me how (free, two minutes)</a>";
el.style.display = "block";
var g = document.getElementById("oky-how");
if (g)
g.onclick = function (e) { e.preventDefault(); okyGuide(); };
return;
}
var visitor = !okyAsked() && okyMe() && !okyKeeper();
if (!okyFolk(c) || okyKey() || !(okyAsked() || visitor)) {
el.style.display = "none";
return;
}
el.innerHTML = visitor ? "<b>Want the city's people to really talk with you?</b> Add a free key: it takes about two minutes. " : (okyMsLeft() > 0
? "<b>" + okyLeftText() + " left</b> to add your own free key. After that, Somnucor waits until you add it. "
: "<b>The city's people are keeping it short</b> until you add your own free key. ") +
"<a href='#' id='oky-how' style='color:#C9A86A;font-weight:bold'>Show me how (free, two minutes)</a>";
el.style.display = "block";
var a = document.getElementById("oky-how");
if (a)
a.onclick = function (e) { e.preventDefault(); okyGuide(); };
},
function (gate) {
var old = document.getElementById("oky-guide");
if (old)
old.remove();
var w = document.createElement("div");
w.id = "oky-guide";
w.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:rgba(5,6,10,.72);display:flex;align-items:center;justify-content:center;padding:16px";
var asked = okyAsked(), left = okyMsLeft();
w.innerHTML = "<div style='background:#12141B;color:#E9E1D0;border:1px solid #C9A86A;border-radius:12px;max-width:520px;width:100%;max-height:92vh;overflow:auto;padding:18px 18px 16px;font:15px/1.5 system-ui,sans-serif'>" +
"<div style='font:20px Georgia,serif;margin-bottom:6px'>" + (gate ? "Somnucor is waiting for your key" : "Your own key for the city's people") + "</div>" +
"<p style='margin:0 0 10px;font-size:17px'><b>It's free, and it takes about two minutes.</b> No card, nothing to install.</p>" +
"<p style='margin:0 0 10px;opacity:.85'>" + (gate
? "Every dreamer adds a free key of their own within a day of joining. Yours isn't on this device yet, so the city stays closed to you until it is. Your dream journal and your own dream are open as always. "
: "Every dreamer adds a free key of their own within a day of joining. It gives the city's people and the gods their full voice when they talk with you, and keeps the city fast for everyone. " +
(asked ? (left > 0 ? "You have <b>" + okyLeftText() + "</b> left to add it. After that, Somnucor waits until you do." : "Until you add it, Somnucor stays closed to you.") : "")) +
" Your key stays on this device only.</p>" +
"<ol style='padding-left:22px;margin:0 0 12px'>" + OKY_STEPS.map(function (s) { return "<li style='margin-bottom:8px'><b>" + s[0] + ".</b> " + s[1] + "</li>"; }).join("") + "</ol>" +
"<input id='oky-in' type='password' autocomplete='off' placeholder='gsk_...' style='width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #555;background:#0B0D13;color:inherit;font-size:16px'>" +
"<div id='oky-say' style='min-height:22px;margin:8px 0;font-size:14px'></div>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'>" +
"<button class='btn' id='oky-save' type='button'>Check and save</button>" +
(okyKey() ? "<button class='btn' id='oky-del' type='button'>Remove my key</button>" : "") +
"<button class='btn' id='oky-close' type='button'>" + (gate ? "Back to my dream" : "Close") + "</button></div>" +
"<p style='font-size:12.5px;opacity:.7;margin:12px 0 0'>Each device you play on needs the key pasted once. Using it a lot in one minute can make the people pause for a moment; that's the free key's limit, and it clears by itself.</p></div>";
document.body.appendChild(w);
var $ = function (i) { return document.getElementById(i); };
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
$("oky-close").onclick = function () { w.remove(); };
w.addEventListener("click", function (e) { if (e.target === w)
w.remove(); });
if ($("oky-del"))
$("oky-del").onclick = function () { okySet(""); $("oky-say").textContent = "Removed from this device."; };
$("oky-save").onclick = function () {
var k = ($("oky-in").value || "").trim(), say = $("oky-say");
if (!/^gsk_[A-Za-z0-9]{20,}$/.test(k)) {
say.textContent = "That doesn't look right: a Groq key starts with gsk_ and is one long line of letters and numbers.";
return;
}
say.textContent = "Checking it with Groq…";
okyCheck(k).then(function (ok) {
if (ok === false) {
say.textContent = "Groq didn't accept that key. Copy it again (the whole line) and paste it once more.";
return;
}
if (ok === null) {
say.textContent = "Couldn't reach Groq just now to check it. Wait a moment and press Check and save again.";
return;
}
okySet(k, 1);
if (gate) {
say.innerHTML = "<b>It works. Somnucor is open to you again.</b> <button class='btn' id='oky-go' type='button'>Take me to Somnucor</button>";
var g = $("oky-go");
if (g)
g.onclick = function () { w.remove(); if (typeof toSomnucor === "function")
toSomnucor(); };
return;
}
say.innerHTML = "<b>Saved. The key works.</b> The city's people will talk with you in full.";
setTimeout(function () { if (w.parentNode)
w.remove(); }, 1800);
});
};
},
function (k) {
function models() {
return fetch("https://api.groq.com/openai/v1/models", { headers: { Authorization: "Bearer " + k } })
.then(function (r) { return r.ok ? true : (r.status === 401 || r.status === 403 ? false : null); }).catch(function () { return null; });
}
return fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: "Bearer " + k, "Content-Type": "application/json" },
body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: "Say ok." }], max_tokens: 1 }) })
.then(function (r) {
if (r.ok || r.status === 429)
return true;
if (r.status === 401 || r.status === 403)
return false;
if (r.status === 400 || r.status === 404)
return models();
return null;
}).catch(function () { return null; });
},
function (k, ok) {
var c = cfg();
c.pkey = k || "";
c.pkeyOk = k ? (ok ? 1 : undefined) : undefined;
c.pkeyAt = k ? Date.now() : 0;
setCfg(c);
okyMark(!!okyKey());
if (OKY.st)
OKY.st.has = !!okyKey();
if (talkWith)
okyBar(talkWith);
var s = document.getElementById("oky-set-state");
if (s)
s.textContent = okyKey() ? "A key is saved on this device." : "No key on this device yet.";
},
function () {
if (document.getElementById("oky-set"))
return;
var adv = document.getElementById("advanced");
if (!adv || !adv.parentNode)
return;
var d = document.createElement("div");
d.id = "oky-set";
d.style.cssText = "margin:18px 0";
d.innerHTML = "<h3 class='set-h'>Your own key for the city's people</h3>" +
"<p><b>Free, about two minutes.</b> Every dreamer adds a free key of their own within a day of joining; after that, Somnucor waits until it's added. It gives the city's people and the gods their full voice. It stays on this device. <span id='oky-set-state'></span></p>" +
"<button class='btn' id='oky-set-open' type='button'>Add or change my key (step by step)</button>";
adv.parentNode.insertBefore(d, adv);
document.getElementById("oky-set-open").onclick = function () { okyGuide(); };
(document.getElementById("oky-set-state").textContent = okyKey() ? "A key is saved on this device." : "No key on this device yet.");
},
function (c, q) {
var d = (typeof DEITY !== "undefined" && DEITY && c.deity && DEITY[c.deity]) || { name: c.name || "the god", domains: "what is mine", trad: "old" };
var dom = String(d.domains || "what is mine"), d1 = dom.split(",")[0].trim();
var t = String(q || "").toLowerCase(), k = "any";
if (/^\s*(hi|hello|hey|good (morning|afternoon|evening)|greetings|hail)\b/.test(t) || /\bwho are you\b/.test(t))
k = "hi";
else if (/\b(thanks|thank you|cheers|bless)/.test(t))
k = "thanks";
else if (/\b(bye|goodbye|see you|farewell|good night)\b/.test(t))
k = "bye";
else if (/\?\s*$/.test(t))
k = "ask";
var L = OKY_GOD[k].map(function (x) { return x.replace(/\{n\}/g, d.name).replace(/\{N\}/g, dom.charAt(0).toUpperCase() + dom.slice(1)).replace(/\{d1\}/g, d1).replace(/\{t\}/g, String(d.trad || "old")); });
var said = c.okyGodSaid || (c.okyGodSaid = []), fresh = L.filter(function (x) { return said.indexOf(x) < 0; });
if (!fresh.length) {
said.length = 0;
fresh = L;
}
var s = fresh[Math.floor(Math.random() * fresh.length)];
said.push(s);
if (said.length > 12)
said.shift();
return s;
},
function () {
if (typeof goHomeDream === "function")
try {
goHomeDream();
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>Somnucor is waiting for your key.</b> Add your own free key (two minutes) and the city opens again. Your dream journal is open as always.");
if (!document.getElementById("oky-guide"))
okyGuide(true);
}
];
});
