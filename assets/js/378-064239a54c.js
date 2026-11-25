/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PCL = { c: null, ring: null };
var PCL_ICE = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };
function pclSend(to, body) { return __ZC(378, 0, this, arguments, new.target); }
function pclMyName() { var n = ""; try {
n = (dreamer().name || "").trim();
}
catch (e) { } return n || "A dreamer"; }
function pclMayVoice() { return __ZC(378, 1, this, arguments, new.target); }
function pclGathered(pc) {
if (typeof vcGathered === "function")
return vcGathered(pc);
return new Promise(function (res) { setTimeout(res, 2500); });
}
function pclBell(c, kind) { return __ZC(378, 2, this, arguments, new.target); }
function pclRingTone(on) { return __ZC(378, 3, this, arguments, new.target); }
function pclCard(html) { return __ZC(378, 4, this, arguments, new.target); }
function pclBtn(w, label, bg, fn) { var b = document.createElement("button"); b.className = "btn"; b.type = "button"; b.textContent = label; if (bg) {
b.style.background = bg;
b.style.color = "#fff";
} b.onclick = function (ev) { ev.stopPropagation(); fn(); }; w.querySelector(".pcl-acts").appendChild(b); return b; }
function pclPaint() { return __ZC(378, 5, this, arguments, new.target); }
function pclPeer(k) { return __ZC(378, 6, this, arguments, new.target); }
function pclMic() { return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
function pclCall(id, name) { return __ZC(378, 7, this, arguments, new.target); }
function pclAnswer() { return __ZC(378, 8, this, arguments, new.target); }
function pclEnd(tell, say) { return __ZC(378, 9, this, arguments, new.target); }
function pclSignal(from, name, b) { return __ZC(378, 10, this, arguments, new.target); }
setInterval(function () { var k = PCL.c, el = document.getElementById("pcl-t"); if (k && k.state === "on" && el) {
var s = Math.floor((Date.now() - k.at) / 1000);
el.textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2);
} }, 1000);
function pclPollAway() {
if (typeof TOG === "undefined" || TOG.busy || !(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
var now = Date.now(), gap = PCL.c ? 1000 : document.visibilityState === "hidden" ? 10000 : 4000;
if (now - (PCL.polled || 0) < gap)
return;
PCL.polled = now;
pclPrimed();
TOG.busy = true;
cityRpc("live_poll", { p_since: TOG.since, p_place: null }).then(function (o) {
if (!o || !o.ok)
return;
TOG.adult = !!o.adult;
TOG.voiceMuted = !!o.voice_muted;
var first = !TOG.since;
TOG.since = Math.max(TOG.since, +o.top || 0);
if (first)
return;
(o.rows || []).forEach(function (r) {
var b = r.body || {};
if (r.kind === "rtc" && typeof b.t === "string" && /^pc(ring|pick|hang|busy)$/.test(b.t))
try {
pclSignal(r.from, r.name, b);
}
catch (e) { }
});
}).catch(function () { }).then(function () { TOG.busy = false; });
}
function pclPrimed() { if (TOG.since === 0 && PCL.asked)
TOG.since = 1; PCL.asked = true; }
(function () {
if (typeof togPoll !== "function")
return;
var tp = togPoll;
togPoll = function () {
if (typeof togLive === "function" && !togLive())
return pclPollAway();
if (!TOG.busy)
pclPrimed();
return tp.apply(this, arguments);
};
})();
(function () {
if (typeof vcSignal !== "function")
return;
var vs = vcSignal;
vcSignal = function (from, name, b) {
if (b && typeof b.t === "string" && /^pc(ring|pick|hang|busy)$/.test(b.t)) {
try {
pclSignal(from, name, b);
}
catch (e) { }
return;
}
return vs.apply(this, arguments);
};
})();
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
if (typeof PH === "undefined" || PH.tab !== "msgs" || !PH.withId || document.getElementById("pcl-callbtn"))
return r;
var back = document.querySelector("#ph-box [data-p='back']");
if (!back || !back.parentNode)
return r;
var b = document.createElement("button");
b.id = "pcl-callbtn";
b.type = "button";
b.textContent = "📞 Call";
b.style.cssText = typeof PH_BTN === "string" ? PH_BTN : "";
var id = PH.withId, nm = PH.withName;
b.onclick = function (ev) { ev.stopPropagation(); pclCall(id, nm); };
back.parentNode.appendChild(b);
}
catch (e) { }
return r;
};
})();
