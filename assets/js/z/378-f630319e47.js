/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(378, function () {
"use strict";
return [
function (to, body) {
return cityRpc("live_send", { p_kind: "rtc", p_to: to, p_place: null, p_body: body }).then(function (o) {
if (o && o.ok === false) {
pclEnd(null, o.novoice ? "You can't call them: voice calls are for grown-ups, and not between dreamers who have blocked each other." : (o.say || "The call didn't go through."));
}
return o;
}).catch(function () { });
},
function () {
if (typeof TOG !== "undefined" && TOG.adult === false) {
setStatus("📞 Phone calls are for dreamers aged 18 and over. Messages are open to everyone.");
return false;
}
if (typeof TOG !== "undefined" && TOG.voiceMuted) {
setStatus("📞 Your voice is switched off for a day after reports. The Keeper can lift it.");
return false;
}
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof RTCPeerConnection === "undefined") {
setStatus("📞 This browser can't make calls. Messages still work.");
return false;
}
return true;
},
function (c, kind) {
if (!c)
return;
var t = c.currentTime + 0.02, out = c.createGain();
out.gain.value = 1;
out.connect(c.destination);
var burst = function (at, len, notes, rate, peak) {
var g = c.createGain(), tr = c.createGain(), l = c.createOscillator(), lg = c.createGain();
g.gain.setValueAtTime(0.0001, at);
g.gain.exponentialRampToValueAtTime(peak, at + 0.02);
g.gain.setValueAtTime(peak, at + len - 0.08);
g.gain.exponentialRampToValueAtTime(0.0001, at + len);
tr.gain.value = 0.55;
l.type = "square";
l.frequency.value = rate;
lg.gain.value = 0.45;
l.connect(lg);
lg.connect(tr.gain);
notes.forEach(function (n) { var o = c.createOscillator(), og = c.createGain(); o.type = n[2] || "sine"; o.frequency.value = n[0]; og.gain.value = n[1]; o.connect(og); og.connect(tr); o.start(at); o.stop(at + len + 0.05); });
tr.connect(g);
g.connect(out);
l.start(at);
l.stop(at + len + 0.05);
};
if (kind === "out")
burst(t, 1.1, [[440, 0.5], [480, 0.5]], 0.001, 0.05);
else {
var bell = [[1318.5, 0.5, "triangle"], [1661.2, 0.32], [2637, 0.12], [3322, 0.06]];
burst(t, 0.42, bell, 24, 0.13);
burst(t + 0.6, 0.42, bell, 24, 0.13);
}
setTimeout(function () { try {
out.disconnect();
}
catch (e) { } }, 2000);
},
function (on) {
clearInterval(PCL.ring);
PCL.ring = null;
if (!on)
return;
var play = function () {
var inc = !!(PCL.c && PCL.c.state === "ringing-in");
try {
if (inc && navigator.vibrate)
navigator.vibrate([300, 200, 300]);
}
catch (e) { }
try {
var c = typeof vcCtx === "function" ? vcCtx() : new (window.AudioContext || window.webkitAudioContext)();
if (!c)
return;
pclBell(c, inc ? "in" : "out");
}
catch (e) { }
};
play();
PCL.ring = setInterval(play, 2800);
},
function (html) {
var w = document.getElementById("pcl-card");
if (!w) {
w = document.createElement("div");
w.id = "pcl-card";
w.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(70px + env(safe-area-inset-top,0px));z-index:2147482000;width:min(340px,calc(100vw - 32px));background:#0B0A14;border:2px solid #4CC77A;border-radius:20px;padding:14px;color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.5)";
document.body.appendChild(w);
}
w.innerHTML = html;
return w;
},
function () {
var k = PCL.c;
if (!k) {
var w0 = document.getElementById("pcl-card");
if (w0)
w0.remove();
return;
}
var head = k.state === "ringing-in" ? "📞 Incoming call" : k.state === "calling" ? "📞 Calling…" : "On a call · <span id='pcl-t'>0:00</span>";
var w = pclCard("<div style='font-size:12px;color:#4CC77A'>" + head + "</div><div style='font:600 18px system-ui,sans-serif;margin:4px 0 10px'>" + esc(k.name || "A dreamer") + "</div><div class='pcl-acts' style='display:flex;gap:8px;justify-content:center;flex-wrap:wrap'></div>");
if (k.state === "ringing-in") {
pclBtn(w, "Answer", "#2E8B57", pclAnswer);
pclBtn(w, "Decline", "#C0392B", function () { pclEnd(true); });
}
else {
if (k.state === "on")
pclBtn(w, k.muted ? "Unmute" : "Mute", null, function () { k.muted = !k.muted; if (k.stream)
k.stream.getAudioTracks().forEach(function (t) { t.enabled = !k.muted; }); pclPaint(); });
pclBtn(w, "Hang up", "#C0392B", function () { pclEnd(true); });
}
},
function (k) {
var pc = k.pc = new RTCPeerConnection({ iceServers: (typeof vcIceServers === "function") ? vcIceServers() : PCL_ICE.iceServers });
if (k.stream)
k.stream.getTracks().forEach(function (t) { pc.addTrack(t, k.stream); });
pc.ontrack = function (e) { var st = e.streams && e.streams[0]; if (!st)
return; var a = k.audio || new Audio(); a.autoplay = true; a.playsInline = true; a.srcObject = st; a.volume = 1; k.audio = a; a.play().catch(function () { }); };
pc.onconnectionstatechange = function () {
if (PCL.c !== k)
return;
if (pc.connectionState === "connected" && k.state !== "on") {
k.state = "on";
k.at = Date.now();
pclRingTone(false);
pclPaint();
}
if (pc.connectionState === "failed")
pclEnd(false, "The call dropped. One of you may be on a network that blocks calls; try again on another connection.");
};
return pc;
},
function (id, name) {
if (!id || !pclMayVoice())
return;
if (PCL.c || (typeof FVO !== "undefined" && (FVO.call || FVO.inc))) {
setStatus("📞 You're already on a call.");
return;
}
var k = PCL.c = { id: id, name: name, state: "calling", cid: Math.random().toString(36).slice(2, 10) };
pclPaint();
pclRingTone(true);
pclMic().then(function (s) {
if (PCL.c !== k) {
s.getTracks().forEach(function (t) { t.stop(); });
return;
}
k.stream = s;
var pc = pclPeer(k);
return pc.createOffer({ offerToReceiveAudio: true }).then(function (o) { return pc.setLocalDescription(o); }).then(function () { return pclGathered(pc); })
.then(function () { if (PCL.c === k)
pclSend(id, { t: "pcring", cid: k.cid, name: pclMyName(), sdp: pc.localDescription.sdp }); });
}).catch(function () { pclEnd(false, "The microphone was not allowed, so the call couldn't start."); });
k.timeout = setTimeout(function () { if (PCL.c === k && k.state === "calling")
pclEnd(true, (name || "They") + " didn't answer."); }, 35000);
},
function () {
var k = PCL.c;
if (!k || k.state !== "ringing-in")
return;
if (!pclMayVoice()) {
pclEnd(true);
return;
}
pclRingTone(false);
k.state = "connecting";
pclPaint();
pclMic().then(function (s) {
if (PCL.c !== k) {
s.getTracks().forEach(function (t) { t.stop(); });
return;
}
k.stream = s;
var pc = pclPeer(k);
return pc.setRemoteDescription({ type: "offer", sdp: k.offer }).then(function () { return pc.createAnswer(); }).then(function (a) { return pc.setLocalDescription(a); })
.then(function () { return pclGathered(pc); }).then(function () { if (PCL.c === k)
pclSend(k.id, { t: "pcpick", cid: k.cid, sdp: pc.localDescription.sdp }); });
}).catch(function () { pclEnd(true, "The microphone was not allowed, so the call couldn't be answered."); });
},
function (tell, say) {
var k = PCL.c;
PCL.c = null;
pclRingTone(false);
if (k) {
clearTimeout(k.timeout);
if (tell)
pclSend(k.id, { t: "pchang", cid: k.cid });
try {
if (k.pc)
k.pc.close();
}
catch (e) { }
if (k.stream)
k.stream.getTracks().forEach(function (t) { t.stop(); });
if (k.audio) {
try {
k.audio.srcObject = null;
}
catch (e) { }
}
}
pclPaint();
if (say)
setStatus("📞 " + esc(say));
},
function (from, name, b) {
var k = PCL.c;
if (b.t === "pcring") {
if (k || (typeof FVO !== "undefined" && (FVO.call || FVO.inc))) {
pclSend(from, { t: "pcbusy", cid: b.cid });
return;
}
if (typeof VC !== "undefined" && VC.local && VC.local[from])
return;
PCL.c = { id: from, name: name || b.name || "A dreamer", state: "ringing-in", cid: b.cid, offer: b.sdp };
pclRingTone(true);
pclPaint();
PCL.c.timeout = setTimeout(function () { if (PCL.c && PCL.c.cid === b.cid && PCL.c.state === "ringing-in")
pclEnd(false, "Missed call from " + (name || b.name || "a dreamer") + "."); }, 35000);
return;
}
if (!k || k.id !== from || b.cid !== k.cid)
return;
if (b.t === "pcpick" && b.sdp && k.pc) {
pclRingTone(false);
k.state = "connecting";
pclPaint();
k.pc.setRemoteDescription({ type: "answer", sdp: b.sdp }).catch(function () { pclEnd(true, "The call couldn't connect."); });
}
if (b.t === "pchang")
pclEnd(false, k.state === "on" ? (k.name + " hung up.") : k.state === "calling" ? (k.name + " can't talk right now.") : "Missed call from " + k.name + ".");
if (b.t === "pcbusy")
pclEnd(false, k.name + " is on another call.");
}
];
});
