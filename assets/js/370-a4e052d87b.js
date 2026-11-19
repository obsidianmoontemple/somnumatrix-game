/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var OKY = { st: null, at: 0, asking: null, SKEY: "somnu.ownkey", DAYS: 7, shown: {}, forced: 0, checking: null };
function okyKey() {
var c = typeof cfg === "function" ? cfg() : {};
if (c.pkey && /^gsk_/.test(c.pkey))
return c.pkey;
if (c.mode === "direct" && c.key && /^gsk_/.test(c.key))
return c.key;
return "";
}
function okyMe() { return (typeof accessMe === "function" && accessMe()) || null; }
function okyRead() {
if (OKY.st && OKY.st.me === okyMe())
return OKY.st;
try {
var s = JSON.parse(localStorage.getItem(OKY.SKEY) || "null");
if (s && s.me && s.me === okyMe()) {
OKY.st = s;
return s;
}
}
catch (e) { }
return null;
}
function okyState(force) {
var me = okyMe();
if (!me || typeof cityRpc !== "function")
return Promise.resolve(null);
if (OKY.asking)
return OKY.asking;
var s = okyRead();
if (!force && s && Date.now() - (s.at || 0) < 60 * 60 * 1000)
return Promise.resolve(s);
OKY.asking = cityRpc("own_key_state").then(function (r) {
if (!r || !r.ok)
return okyRead();
var n = { me: me, at: Date.now(), exempt: !!r.exempt, paid: !!r.paid, since: r.since ? Date.parse(r.since) : 0, days: r.days || OKY.DAYS, has: !!r.has_key,
rule: !!r.rule, hours: r.hours || 24, due: r.deadline ? Date.parse(r.deadline) : 0, skew: r.now ? Date.parse(r.now) - Date.now() : 0 };
OKY.st = n;
try {
localStorage.setItem(OKY.SKEY, JSON.stringify(n));
}
catch (e) { }
if (!n.exempt && !!okyKey() !== n.has)
okyMark(!!okyKey());
return n;
}).catch(function () { return okyRead(); }).then(function (v) { OKY.asking = null; return v; });
return OKY.asking;
}
function okyMark(has) { if (okyMe() && typeof cityRpc === "function")
cityRpc("own_key_mark", { p_has: !!has }).catch(function () { }); }
function okyAsked() {
var s = okyRead();
if (typeof isKeeperNow === "function" && isKeeperNow())
return false;
return !!(s && !s.exempt && s.rule && s.due);
}
function okyMsLeft() {
var s = okyRead();
if (!s || !s.due)
return Infinity;
return s.due - (Date.now() + (s.skew || 0));
}
function okyLeftText() {
var ms = okyMsLeft();
if (ms === Infinity)
return "";
if (ms <= 0)
return "no time";
var h = Math.floor(ms / 3600000), m = Math.max(1, Math.ceil((ms % 3600000) / 60000));
if (m === 60) {
h++;
m = 0;
}
return h >= 1 ? (h + " hour" + (h === 1 ? "" : "s") + (h < 6 && m ? " " + m + " min" : "")) : (m + " minute" + (m === 1 ? "" : "s"));
}
function okyDaysLeft() { var ms = okyMsLeft(); return ms === Infinity ? OKY.DAYS : Math.max(0, Math.ceil(ms / 86400000)); }
function okyGood() { var c = typeof cfg === "function" ? cfg() : {}; return !!okyKey() && c.pkeyOk !== 0; }
function okyQuiet() { return okyAsked() && !okyGood() && okyMsLeft() <= 0; }
function okyGated() { return okyQuiet(); }
function okyGod(c) { return __ZC(370, 0, this, arguments, new.target); }
function okyFolk(c) { return typeof fmyIsFolk === "function" && fmyIsFolk(c) && !okyGod(c); }
function okyKeeper() { return typeof isKeeperNow === "function" && isKeeperNow(); }
function okyGodTalk(c) { return okyGod(c) && !!(c && c.awake) && !okyKeeper(); }
(function () {
if (typeof sendTalk !== "function" || typeof cfg !== "function")
return;
var st = sendTalk;
sendTalk = function () {
var c = talkWith;
if (okyGodTalk(c)) {
var gk = okyGood() ? okyKey() : "", real0 = cfg;
cfg = function () {
var x = real0.apply(this, arguments);
return gk ? Object.assign(x, { mode: "direct", key: gk, model: LLM_MODEL }) : Object.assign(x, { mode: "off" });
};
try {
return st.apply(this, arguments);
}
finally {
cfg = real0;
if (!gk)
okyBar(c);
}
}
if (!okyFolk(c) || !(c && c.awake))
return st.apply(this, arguments);
var key = okyKey(), quiet = !key && okyQuiet();
if (!key && !quiet)
return st.apply(this, arguments);
var real = cfg;
cfg = function () {
var x = real.apply(this, arguments);
return quiet ? Object.assign(x, { mode: "off" }) : Object.assign(x, { mode: "direct", key: key, model: LLM_MODEL });
};
try {
return st.apply(this, arguments);
}
finally {
cfg = real;
if (quiet)
okyBar(c);
}
};
})();
function okyBarEl() { return __ZC(370, 1, this, arguments, new.target); }
function okyBar(c) { return __ZC(370, 2, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
var r = ot.apply(this, arguments);
try {
okyBar(c);
if (okyFolk(c))
okyState().then(function () { if (talkWith === c)
okyBar(c); });
}
catch (e) { }
return r;
};
})();
var OKY_STEPS = [
["Open the Groq website", "On this device or any other, go to <b>console.groq.com</b>. <a href='https://console.groq.com/keys' target='_blank' rel='noopener' style='color:#C9A86A'>Open it in a new tab</a>."],
["Make a free account", "Sign up with your email (or a Google or GitHub account). It's free, and no card is needed."],
["Go to API Keys", "Once you're in, choose <b>API Keys</b> in the menu on the left (on a phone, tap the menu button at the top first)."],
["Create a key", "Press <b>Create API Key</b>. Give it a name you'll recognise, like <i>SomnuMatrix</i>, and press <b>Submit</b>."],
["Copy it", "Your key appears once, starting with <b>gsk_</b>. Press the copy button next to it. Keep it to yourself, like a password."],
["Paste it here", "Come back here, paste it in the box below, and press <b>Check and save</b>. That's it."]
];
function okyGuide(gate) { return __ZC(370, 3, this, arguments, new.target); }
function okyCheck(k) { return __ZC(370, 4, this, arguments, new.target); }
function okySet(k, ok) { return __ZC(370, 5, this, arguments, new.target); }
function okySettings() { return __ZC(370, 6, this, arguments, new.target); }
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () { var r = op.apply(this, arguments); try {
okySettings();
}
catch (e) { } return r; };
})();
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
var r = ot.apply(this, arguments);
try {
if (okyFolk(c))
okyState().then(function () {
if (!okyAsked() || okyGood())
return;
var day = new Date().toISOString().slice(0, 10), k = "somnu.ownkey.told";
var told = "";
try {
told = localStorage.getItem(k) || "";
}
catch (e) { }
if (told === day)
return;
var firstK = "somnu.ownkey.guided";
var guided = "";
try {
guided = localStorage.getItem(firstK) || "";
}
catch (e) { }
if (!guided) {
try {
localStorage.setItem(firstK, "1");
localStorage.setItem(k, day);
}
catch (e) { }
setTimeout(okyGuide, 900);
return;
}
try {
localStorage.setItem(k, day);
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>" + (okyMsLeft() > 0 ? okyLeftText() + " left" : "Time's up") + "</b> to add your own free key. It takes two minutes: Settings, or “Show me how” in the talk box.");
});
}
catch (e) { }
return r;
};
})();
var OKY_LINES = {
hi: ["Hey there. What can I do for you?", "Hello! Busy day, but go on.", "Oh, hi. Need something?"],
thanks: ["Anytime.", "Glad to help.", "No trouble at all."],
bye: ["Take care now.", "See you around.", "Mind how you go."],
ask: ["Hmm. Couldn't tell you, honestly.", "Good question. Not sure I know.", "You'd do better asking around, I think."],
any: ["Mm-hm.", "Is that so?", "Right, right.", "Fair enough.", "Huh. Well, there you go."]
};
var OKY_GOD = {
hi: ["I am {n}. You may speak.", "{n} hears you, dreamer.", "You have found {n}. Few look.", "Come closer. {N} are mine to keep.", "So. A dreamer, standing before {n}."],
thanks: ["Keep your thanks. Keep your dreams instead.", "It is given. Go well.", "Remember who answered you.", "{n} accepts it."],
bye: ["Go, then. {n} will be here when you dream again.", "Walk carefully. The {t} gods remember.", "Until your next dream.", "Go. And write down what you saw."],
ask: ["That is a question for {d1}, and {d1} is mine. Ask it again in a dream.", "Some answers are not given. They are dreamt.", "You ask much. {n} answers little, today.", "Look at what you dreamt last. The answer sits there.", "Not yet. Ask me when you have dreamt more."],
any: ["{n} listens.", "Mm. The {t} gods have heard such things before.", "{N}. That is what I keep. Remember it.", "Speak plainly, dreamer.", "I hear you. Go on.", "Even a god is silent sometimes.", "Your dream brought you here. Trust it."]
};
function okyGodLine(c, q) { return __ZC(370, 7, this, arguments, new.target); }
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (okyGodTalk(c) && !okyGood() && c.deity && !(typeof mannerOf === "function" && mannerOf(c) === "silent") && Math.random() < 0.6)
return okyGodLine(c, q);
if (!okyFolk(c))
return lv.apply(this, arguments);
var t = String(q || "").toLowerCase(), k = "any";
if (/^\s*(hi|hello|hey|good (morning|afternoon|evening)|greetings)\b/.test(t))
k = "hi";
else if (/\b(thanks|thank you|cheers|ta)\b/.test(t))
k = "thanks";
else if (/\b(bye|goodbye|see you|farewell|good night)\b/.test(t))
k = "bye";
else if (/\?\s*$/.test(t))
k = "ask";
var L = OKY_LINES[k], last = c.okyLast, s;
do {
s = L[Math.floor(Math.random() * L.length)];
} while (L.length > 1 && s === last);
c.okyLast = s;
return s;
};
})();
function okyInCity() {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (typeof WLD !== "undefined" && WLD && WLD.on)
return false;
return !!(r && (store.here || 0) === r.id);
}
function okyGateCheck() {
if (!okyGated())
return Promise.resolve(false);
if (Date.now() - OKY.forced < 60000)
return Promise.resolve(okyGated());
OKY.forced = Date.now();
return okyState(true).then(function () { return okyGated(); });
}
function okyShut() { return __ZC(370, 8, this, arguments, new.target); }
(function () {
if (typeof toSomnucor === "function") {
var ts = toSomnucor;
toSomnucor = function () {
if (okyGated()) {
okyGateCheck().then(function (g) { if (g)
okyGuide(true);
else
ts(); });
return;
}
return ts.apply(this, arguments);
};
}
if (typeof visitRealm === "function") {
var vr = visitRealm;
visitRealm = function (id) {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (id && r && id === r.id && okyGated()) {
okyGateCheck().then(function (g) { if (g)
okyGuide(true);
else
vr(id); });
return;
}
return vr.apply(this, arguments);
};
}
})();
function okyBanner() {
var el = document.getElementById("oky-count");
if (OKY.hideTill && Date.now() > OKY.hideTill)
OKY.hideTill = 0;
var ms = okyMsLeft(), show = !OKY.hideTill && okyAsked() && !okyGood() && ms > 0 && ms !== Infinity;
if (!show) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "oky-count";
var small = Math.min(window.innerWidth || 1280, window.innerHeight || 800) < 600;
el.style.cssText = "position:fixed;top:" + (small ? "6px" : "10px") + ";left:50%;transform:translateX(-50%);z-index:2147482000;max-width:calc(100% - 32px);box-sizing:border-box;" +
"background:rgba(18,20,27,.92);color:#E9E1D0;border:1px solid #C9A86A;border-radius:18px;padding:" + (small ? "5px 10px" : "7px 14px") + ";font:" + (small ? "12.5px" : "14px") + "/1.35 system-ui,sans-serif;" +
"display:flex;gap:8px;align-items:center;box-shadow:0 2px 10px rgba(0,0,0,.4)";
document.body.appendChild(el);
}
el.innerHTML = "<span>&#128273; <b id='oky-count-t'></b> to add your free key, or Somnucor waits.</span>" +
"<a href='#' id='oky-count-go' style='color:#C9A86A;font-weight:bold;white-space:nowrap'>Show me how</a>" +
"<a href='#' id='oky-count-x' aria-label='Hide for an hour' style='color:#E9E1D0;opacity:.6;text-decoration:none;padding:0 2px'>&times;</a>";
document.getElementById("oky-count-t").textContent = okyLeftText() + " left";
document.getElementById("oky-count-go").onclick = function (e) { e.preventDefault(); okyGuide(); };
document.getElementById("oky-count-x").onclick = function (e) { e.preventDefault(); OKY.hideTill = Date.now() + 3600000; el.style.display = "none"; };
el.style.display = "flex";
}
function okyRecheck() {
var c = cfg(), k = okyKey();
if (!k || OKY.checking || Date.now() - (c.pkeyAt || 0) < 86400000)
return;
OKY.checking = okyCheck(k).then(function (ok) {
OKY.checking = null;
if (ok === null)
return;
var c2 = cfg();
if (c2.pkey !== k)
return;
c2.pkeyOk = ok ? 1 : 0;
c2.pkeyAt = Date.now();
setCfg(c2);
if (!ok)
okyMark(false);
});
}
function okyTick() {
try {
if (!okyMe()) {
okyBanner();
return;
}
if (Date.now() - ((okyRead() || {}).at || 0) > 10 * 60 * 1000)
okyState(true);
okyRecheck();
okyBanner();
if (okyInCity() && okyGated() && !OKY.shutting) {
OKY.shutting = true;
okyGateCheck().then(function (g) { OKY.shutting = false; if (g && okyInCity())
okyShut(); }, function () { OKY.shutting = false; });
}
}
catch (e) { }
}
if (typeof setInterval === "function")
setInterval(okyTick, 2000);
