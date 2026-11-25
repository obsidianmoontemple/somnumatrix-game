/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(215, function () {
"use strict";
return [
function (on) {
if (typeof TOG === "undefined")
return;
SHW.dance = on;
if (on) {
SHW.danceSent = Date.now();
if (typeof togEmote === "function")
togEmote("dance");
setStatus("💃 You are dancing. Walk off the floor, or press E, to stop.");
}
else {
var e = TOG.emo.me;
if (e && e.kind === "dance")
e.len = Math.min(e.len, e.t + 0.4);
}
SHW.promptKey = null;
},
function (type, f, at, dur, peak, out, attack) {
var ctx = audio.ctx, o = ctx.createOscillator(), g = ctx.createGain();
o.type = type;
o.frequency.setValueAtTime(f, at);
g.gain.setValueAtTime(0.0001, at);
g.gain.linearRampToValueAtTime(peak, at + (attack || 0.01));
g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
o.connect(g);
g.connect(out || SHW.mg);
o.start(at);
o.stop(at + dur + 0.05);
return o;
},
function (at, dur, peak, type, freq) {
var ctx = audio.ctx, n = ctx.createBufferSource();
n.buffer = audio.buf;
var f = ctx.createBiquadFilter();
f.type = type;
f.frequency.value = freq;
var g = ctx.createGain();
g.gain.setValueAtTime(peak, at);
g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
n.connect(f);
f.connect(g);
g.connect(SHW.mg);
n.start(at, Math.random() * 1.5);
n.stop(at + dur + 0.05);
},
function (V, s, at, sl) {
var club = !V.C.band, st = s % 16, bar = Math.floor(s / 16), song = shwSong(V, bar), ch = song.prog[bar % 4], root = song.root + ch[0], tri = ch[1] === "M" ? [0, 4, 7] : [0, 3, 7];
var ctx = audio.ctx;
if (club ? st % 4 === 0 : (st === 0 || st === 8 || (st === 10 && (song.h & 1)))) {
var o = ctx.createOscillator(), og = ctx.createGain();
o.frequency.setValueAtTime(club ? 120 : 100, at);
o.frequency.exponentialRampToValueAtTime(42, at + 0.14);
og.gain.setValueAtTime(club ? 0.8 : 0.6, at);
og.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
o.connect(og);
og.connect(SHW.mg);
o.start(at);
o.stop(at + 0.25);
}
if (st === 4 || st === 12)
shwNoise(at, club ? 0.14 : 0.18, club ? 0.12 : 0.07, "bandpass", club ? 1700 : 2200);
if (club) {
if (st % 4 === 2)
shwNoise(at, 0.07, 0.035, "bandpass", 8000);
else if (st % 2 === 1)
shwNoise(at, 0.03, 0.012, "bandpass", 9000);
}
else if (st % 2 === 0)
shwNoise(at, 0.04, 0.014, "bandpass", 8500);
var bassAt = club ? [0, 3, 6, 8, 11, 14] : [0, 6, 8, 14];
if (bassAt.indexOf(st) >= 0) {
var bm = root - 24 + ((club && (st === 6 || st === 14)) ? 12 : 0) + (!club && st === 6 ? 7 : 0);
shwOsc("triangle", shwMidi(bm), at, sl * (club ? 1.6 : 3), 0.22);
shwOsc("sine", shwMidi(bm + 12), at, sl * (club ? 1.4 : 2.6), 0.07);
}
if (st === 0)
tri.forEach(function (iv, k) { shwOsc(club ? "sawtooth" : "triangle", shwMidi(root + iv + (k === 0 ? 12 : 0)), at, sl * 16, club ? 0.018 : 0.045, null, sl * 4); });
var hh = shwHash(V.k + ":" + bar + ":" + st);
if (club) {
if (st % 2 === 0 || (hh % 5 === 0)) {
var nt = root + 12 + tri[(st / 2 | 0) % 3] + ((st >= 8 && (hh & 2)) ? 12 : 0);
shwOsc("square", shwMidi(nt), at, sl * 0.9, 0.03);
}
}
else if (st % 2 === 0 && (hh % 3) !== 0) {
var deg = [0, 1, 2, 1, 2, 0, 1, 2][(hh >>> 3) % 8], up = (hh >>> 7) % 2 ? 12 : 0;
shwOsc("triangle", shwMidi(root + 12 + tri[deg] + up), at, sl * 2.4, 0.09);
}
},
function (iso) {
try {
var d = new Date(iso), now = new Date(), t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
if (d.toDateString() === now.toDateString())
return "today " + t;
var tm = new Date(now.getTime() + 86400000);
if (d.toDateString() === tm.toDateString())
return "tomorrow " + t;
return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) + " " + t;
}
catch (e) {
return "";
}
},
function (mode, file, mic) {
if (mode === "cam") {
var lite = shwPhone();
return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
video: { width: { ideal: lite ? 480 : 960 }, height: { ideal: lite ? 270 : 540 }, frameRate: { ideal: lite ? 12 : 24, max: lite ? 15 : 30 }, facingMode: "user" } }).then(function (st) {
var v = document.createElement("video");
v.muted = true;
v.playsInline = true;
v.setAttribute("playsinline", "");
v.srcObject = st;
return v.play().catch(function () { }).then(function () { return { stream: st, el: v, stop: function () { st.getTracks().forEach(function (t) { t.stop(); }); try {
v.srcObject = null;
}
catch (e) { } } }; });
});
}
if (mode === "mic")
return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false }, video: false }).then(function (st) { return { stream: st, stop: function () { st.getTracks().forEach(function (t) { t.stop(); }); } }; });
var ctx = (typeof vcCtx === "function") ? vcCtx() : null;
if (!ctx)
return Promise.reject(new Error("no audio"));
var url = URL.createObjectURL(file), el = document.createElement(mode === "video" ? "video" : "audio");
el.src = url;
el.playsInline = true;
el.setAttribute("playsinline", "");
el.crossOrigin = "anonymous";
var src = ctx.createMediaElementSource(el), dest = ctx.createMediaStreamDestination();
src.connect(dest);
src.connect(ctx.destination);
var micSt = null, cv = null, timer = null;
var stop = function () { try {
el.pause();
}
catch (e) { } clearInterval(timer); URL.revokeObjectURL(url); if (micSt)
micSt.getTracks().forEach(function (t) { t.stop(); }); try {
src.disconnect();
}
catch (e) { } };
var withMic = mic ? navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: true }, video: false }).then(function (m) { micSt = m; ctx.createMediaStreamSource(m).connect(dest); }).catch(function () { setStatus("🎤 The microphone was not allowed; your file plays without it."); }) : Promise.resolve();
return withMic.then(function () { return el.play(); }).then(function () {
var tracks = dest.stream.getAudioTracks();
if (mode === "video" && document.createElement("canvas").captureStream) {
cv = document.createElement("canvas");
cv.width = 640;
cv.height = 360;
var x = cv.getContext("2d");
timer = setInterval(function () { try {
if (el.videoWidth) {
var r = Math.min(640 / el.videoWidth, 360 / el.videoHeight), w = el.videoWidth * r, h = el.videoHeight * r;
x.fillStyle = "#000";
x.fillRect(0, 0, 640, 360);
x.drawImage(el, (640 - w) / 2, (360 - h) / 2, w, h);
}
}
catch (e) { } }, 66);
tracks = tracks.concat(cv.captureStream(15).getVideoTracks());
}
el.onended = function () { setStatus("🎤 Your file has finished playing. Press E on the stage to end the show, or keep singing."); };
return { stream: new MediaStream(tracks), stop: stop, el: mode === "video" ? el : null };
});
},
function (s, mode, file, mic) {
if (SHW.live)
return;
mode = mode || "mic";
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof RTCPeerConnection === "undefined") {
setStatus("🎤 This browser cannot send a live show. Try Chrome or Safari on a phone or computer.");
return;
}
setStatus("🎤 Getting ready…");
cityRpc("show_live", { p_id: s.id }).then(function (o) {
if (!o || !o.ok) {
setStatus("🎤 " + esc((o && o.say) || "That did not go through."));
return;
}
return shwSource(mode, file, mic).then(function (src) {
SHW.live = { id: s.id, venue: s.venue, title: s.title, ends: new Date(s.ends_at).getTime(), stream: src.stream, stop: src.stop, video: !!src.el, peers: {} };
var V = SHW.v[s.venue];
if (src.el && V && V.screen) {
V.screen.material.map = new THREE.VideoTexture(src.el);
V.screen.material.needsUpdate = true;
V.screen.visible = true;
SHW.live.screen = V.screen;
}
setStatus("🎤 <b>You are live.</b> Dreamers in " + esc(s.venue_name) + " aged 18 and over " + (src.el ? "see and hear" : "hear") + " your show. Press E on the stage to end it.");
SHW.open = false;
shwLoad(true);
shwPaint();
}).catch(function () { setStatus(mode === "cam" ? "📷 The camera or microphone was not allowed, so the show is not live. Allow both and try again." : mode === "mic" ? "🎤 The microphone was not allowed, so the show is not live. Allow the microphone and try again." : "🎤 That file could not be played. Try another (mp3, m4a or mp4 work best)."); });
}).catch(function () { setStatus("🎤 That did not go through. Try again in a moment."); });
},
function (say) {
var L = SHW.live;
if (!L)
return;
Object.keys(L.peers).forEach(function (id) { shwSend(id, { t: "s-bye", show: L.id }); try {
L.peers[id].pc.close();
}
catch (e) { } });
if (L.stream)
L.stream.getTracks().forEach(function (t) { t.stop(); });
try {
if (L.stop)
L.stop();
}
catch (e) { }
if (L.screen) {
L.screen.visible = false;
if (L.screen.material.map) {
L.screen.material.map.dispose();
L.screen.material.map = null;
L.screen.material.needsUpdate = true;
}
}
SHW.live = null;
cityRpc("show_cancel", { p_id: L.id }).then(function () { shwLoad(true); }).catch(function () { });
setStatus("🎤 " + (say || "The show is over. Thank you for playing."));
shwPaint();
},
function (from, b) {
var L = SHW.live;
if (!L || b.show !== L.id)
return;
if (b.t === "s-join") {
if (L.peers[from])
return;
if (Object.keys(L.peers).length >= shwPeerCap()) {
shwSend(from, { t: "s-full", show: L.id });
return;
}
var pc = new RTCPeerConnection({ iceServers: vcIceServers() }), Pp = L.peers[from] = { pc: pc, at: Date.now() };
L.stream.getTracks().forEach(function (t) { pc.addTrack(t, L.stream); });
pc.onconnectionstatechange = function () { if (pc.connectionState === "failed" || pc.connectionState === "closed") {
if (L.peers[from] === Pp)
delete L.peers[from];
} };
pc.createOffer().then(function (o) { return pc.setLocalDescription(o); }).then(function () { return vcGathered(pc); })
.then(function () { if (SHW.live === L && L.peers[from] === Pp)
shwSend(from, { t: "s-offer", show: L.id, sdp: pc.localDescription.sdp }); }).catch(function () { delete L.peers[from]; });
return;
}
var P2 = L.peers[from];
if (!P2)
return;
if (b.t === "s-answer" && b.sdp)
P2.pc.setRemoteDescription({ type: "answer", sdp: b.sdp }).catch(function () { });
else if (b.t === "s-bye") {
try {
P2.pc.close();
}
catch (e) { }
delete L.peers[from];
}
},
function (id) {
var Lq = SHW.lis[id];
if (!Lq)
return;
try {
if (Lq.pc)
Lq.pc.close();
}
catch (e) { }
if (Lq.audio) {
try {
Lq.audio.srcObject = null;
}
catch (e) { }
}
if (Lq.screen) {
Lq.screen.visible = false;
if (Lq.screen.material.map) {
Lq.screen.material.map.dispose();
Lq.screen.material.map = null;
Lq.screen.material.needsUpdate = true;
}
}
delete SHW.lis[id];
},
function (from, b) {
var Lq = SHW.lis[b.show];
if (!Lq || Lq.from !== from)
return;
if (b.t === "s-full") {
Lq.full = true;
setStatus("🎤 The show is full just now. The house music plays on; you will be let in if a place opens.");
setTimeout(function () { if (SHW.lis[b.show])
SHW.lis[b.show].full = false; }, 60000);
return;
}
if (b.t === "s-bye") {
shwDrop(b.show);
return;
}
if (b.t === "s-offer" && b.sdp) {
if (Lq.pc)
try {
Lq.pc.close();
}
catch (e) { }
var pc = Lq.pc = new RTCPeerConnection({ iceServers: vcIceServers() });
pc.ontrack = function (e) {
var st = e.streams && e.streams[0];
if (!st)
return;
var vid = st.getVideoTracks().length > 0, a = Lq.audio;
if (!a || (vid && a.tagName !== "VIDEO")) {
a = vid ? document.createElement("video") : new Audio();
a.autoplay = true;
a.playsInline = true;
a.setAttribute("playsinline", "");
}
a.srcObject = st;
a.volume = 0;
Lq.audio = a;
a.play().catch(function () { });
var V = SHW.v[Lq.venue];
if (vid && V && V.screen) {
if (V.screen.material.map)
V.screen.material.map.dispose();
V.screen.material.map = new THREE.VideoTexture(a);
V.screen.material.needsUpdate = true;
V.screen.visible = true;
Lq.screen = V.screen;
}
};
pc.onconnectionstatechange = function () { if (pc.connectionState === "failed") {
if (Lq.pc === pc)
Lq.pc = null;
} };
pc.setRemoteDescription({ type: "offer", sdp: b.sdp }).then(function () { return pc.createAnswer(); }).then(function (a) { return pc.setLocalDescription(a); })
.then(function () { return vcGathered(pc); }).then(function () { if (Lq.pc === pc)
shwSend(from, { t: "s-answer", show: b.show, sdp: pc.localDescription.sdp }); }).catch(function () { if (Lq.pc === pc)
Lq.pc = null; });
}
},
function () {
var B = SHW.b, me = B && B.me, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🎵 Shows and dancing</b><button class="btn" data-sw="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px">' + [["on", "What's on"], ["book", "Book a slot"]].map(function (t) { return '<button class="btn" data-sw="tab" data-t="' + t[0] + '" style="' + (SHW.tab === t[0] ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (SHW.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(SHW.say) + '</div>';
if (typeof audio !== "undefined" && !audio.on)
h += '<div style="margin:0 0 8px;color:#B8C8E0">🔈 The sound is off. <button class="btn" data-sw="sound">Sound on</button> to hear the music.</div>';
if (SHW.tab === "on") {
SHW_KEYS.forEach(function (k) {
var C = SHW_VEN[k], V = SHW.v[k], s = shwLiveAt(k);
h += '<div style="border:1px solid #3A4258;border-radius:6px;padding:8px;margin-bottom:8px"><b style="color:#F2E6C4">' + C.icon + ' ' + esc(C.name) + '</b> <span style="color:#9AA3B5">' + esc(C.where) + '</span><br>' +
(s ? '🔴 <b>Live now:</b> ' + esc(s.title) + ' · ' + esc(s.name || "") + '.' : (C.band ? "The house band is playing." : "The DJ is playing.")) +
' <span style="color:#9AA3B5">' + C.bpm + ' beats a minute.</span>' +
(V ? ' <button class="btn" data-sw="way" data-k="' + k + '" style="padding:2px 8px">Show me the way</button>' : '') + '</div>';
});
var list = (B && B.shows) || [];
h += '<b>Shows booked</b>';
if (!list.length)
h += '<div style="color:#9AA3B5;margin:4px 0 8px">Nothing booked yet. Be the first: "Book a slot".</div>';
list.forEach(function (s) {
h += '<div style="border-top:1px solid #2A3040;padding:6px 0">' + (s.live ? "🔴 " : "🎤 ") + '<b>' + esc(s.title) + '</b> · ' + esc(s.name || "") + '<br><span style="color:#9AA3B5">' + esc(s.venue_name) + ' · ' + (s.live ? "live now, until " + shwWhen(s.ends_at) : shwWhen(s.starts_at) + ", " + s.minutes + " min") + (s.tips ? " · " + Number(s.tips).toLocaleString() + " gold in tips" : "") + '</span>';
if (s.live && me && s.performer !== me)
h += '<div style="margin-top:4px">Tip: ' + [10, 50, 100].map(function (g) { return '<button class="btn" data-sw="tip" data-id="' + s.id + '" data-g="' + g + '" style="padding:2px 8px">' + g + ' gold</button>'; }).join(" ") + '</div>';
var ready = me && s.performer === me && !(SHW.live && SHW.live.id === s.id) && Date.now() > new Date(s.starts_at).getTime() - 600000;
if (ready)
h += '<div style="margin-top:6px;padding:6px;border:1px solid #6A5A8A;border-radius:6px">Go live with: <button class="btn" data-sw="live" data-m="cam" data-id="' + s.id + '" style="padding:2px 8px">📷 Camera</button> <button class="btn" data-sw="live" data-m="mic" data-id="' + s.id + '" style="padding:2px 8px">🎤 Microphone</button> <button class="btn" data-sw="live" data-m="music" data-id="' + s.id + '" style="padding:2px 8px">🎵 My music file</button> <button class="btn" data-sw="live" data-m="video" data-id="' + s.id + '" style="padding:2px 8px">🎬 My video file</button>' +
'<br><label style="display:inline-flex;gap:6px;align-items:center;margin-top:4px"><input type="checkbox" id="shw-mic"' + (SHW.micOver ? " checked" : "") + '> and my microphone over the file</label>' +
'<div style="color:#9AA3B5;margin-top:4px">Only music and video you made, or have the right to play. A video shows on the stage\'s big screen. ' + (SHW.v[s.venue] && shwOn(SHW.v[s.venue], "stage") ? "" : "Stand on the stage of " + esc(s.venue_name) + " first.") + '</div></div>';
if (me && (s.performer === me || (B && B.keeper)))
h += '<div style="margin-top:4px"><button class="btn" data-sw="cancel" data-id="' + s.id + '" style="padding:2px 8px">' + (s.live ? "End the show" : "Cancel") + '</button></div>';
h += '</div>';
});
h += '<div style="margin-top:8px;color:#9AA3B5">On a dance floor, press E to dance. ' + (B && !B.adult ? "Live shows use the microphone and are heard by dreamers aged 18 and over; the house music is for everyone." : "Live shows are heard by dreamers aged 18 and over who are in the venue.") +
' <button class="btn" data-sw="mute" style="padding:2px 8px">' + (SHW.muted ? "Music on" : "Music off") + '</button></div>';
}
else {
if (!(typeof signedIn === "function" && signedIn()))
return h + '<div style="color:#9AA3B5">Sign in to book a slot.</div>';
if (B && !B.adult)
return h + '<div style="color:#9AA3B5">Live shows use the microphone, so booking is for dreamers aged 18 and over. The house music and dancing are for everyone.</div>';
if (B && !B.paid)
return h + '<div style="color:#9AA3B5">Booking a stage is for dreamers whose dues are paid.</div>';
var f = SHW.form || (SHW.form = { venue: "garden", title: "", when: shwNextSlot(), minutes: 30 });
h += '<label>Where</label><select id="shw-venue" style="width:100%;margin:2px 0 8px">' + SHW_KEYS.map(function (k) { return '<option value="' + k + '"' + (f.venue === k ? " selected" : "") + '>' + SHW_VEN[k].icon + ' ' + esc(SHW_VEN[k].name) + ' (' + (SHW_VEN[k].band ? "concert stage" : "dance club") + ')</option>'; }).join("") + '</select>' +
'<label>The show\'s name</label><input id="shw-title" maxlength="60" style="width:100%;margin:2px 0 8px" value="' + esc(f.title) + '" placeholder="e.g. Songs for the Night Market">' +
'<label>Starts (your time)</label><input id="shw-when" type="datetime-local" style="width:100%;margin:2px 0 8px" value="' + esc(f.when) + '">' +
'<label>How long</label><select id="shw-min" style="width:100%;margin:2px 0 8px">' + [15, 30, 45, 60, 90, 120].map(function (m) { return '<option' + (+f.minutes === m ? " selected" : "") + '>' + m + '</option>'; }).join("") + '</select> minutes' +
'<div style="margin:8px 0;color:#9AA3B5">In your slot, stand on the stage and press E to go live: with your camera (you show on the stage\'s big screen, for a concert, a lecture or a class), with your microphone, or with a music or video file from your device (a video shows on the stage\'s big screen). Dreamers in the venue aged 18 and over hear and see it, and it is never recorded. Only play music and video you made, or have the right to play. Listeners can tip you.</div>' +
'<button class="btn" data-sw="book">Book it</button>';
}
return h;
},
function () {
var el = document.getElementById("shw-box");
if (!SHW.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "shw-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:min(84vh,720px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(18,14,30,.97),rgba(8,7,14,.98));border:1px solid #7A6A9A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", shwClick);
document.body.appendChild(el);
}
if (SHW.tab === "book")
shwReadForm();
el.innerHTML = shwHtml();
el.style.display = "block";
},
function (e) {
var t = e.target.closest && e.target.closest("[data-sw]");
if (!t)
return;
var a = t.getAttribute("data-sw"), id = +t.getAttribute("data-id");
if (a === "close") {
SHW.open = false;
shwPaint();
return;
}
if (a === "tab") {
shwReadForm();
SHW.tab = t.getAttribute("data-t");
SHW.say = "";
shwPaint();
return;
}
if (a === "sound") {
try {
if (typeof startAudio === "function")
startAudio();
}
catch (er) { }
setTimeout(shwPaint, 200);
return;
}
if (a === "mute") {
SHW.muted = !SHW.muted;
shwPaint();
return;
}
if (a === "way") {
var V = SHW.v[t.getAttribute("data-k")];
if (V && typeof guideTo !== "undefined") {
guideTo = { key: V.C.name, x: V.x, z: V.z };
SHW.open = false;
shwPaint();
setStatus("The arrow at the top points the way to <b>" + esc(V.C.name) + "</b>.");
}
return;
}
if (a === "tip") {
shwAct("show_tip", { p_id: id, p_gold: +t.getAttribute("data-g") });
return;
}
if (a === "live") {
var sh = ((SHW.b && SHW.b.shows) || []).filter(function (x) { return x.id === id; })[0], m = t.getAttribute("data-m"), cb = document.getElementById("shw-mic");
if (!sh)
return;
SHW.micOver = !!(cb && cb.checked);
var Vs = SHW.v[sh.venue];
if (!Vs || !shwOn(Vs, "stage")) {
SHW.say = "Stand on the stage of " + sh.venue_name + " first, then go live.";
shwPaint();
return;
}
if (m === "mic" || m === "cam") {
shwGoLive(sh, m);
return;
}
var fi = document.createElement("input");
fi.type = "file";
fi.accept = m === "video" ? "video/*" : "audio/*";
fi.onchange = function () { var f = fi.files && fi.files[0]; if (f)
shwGoLive(sh, m === "video" ? "video" : "music", f, SHW.micOver); };
fi.click();
return;
}
if (a === "cancel") {
if (SHW.live && SHW.live.id === id) {
shwEndLive();
return;
}
shwAct("show_cancel", { p_id: id });
return;
}
if (a === "book") {
shwReadForm();
var f = SHW.form, d = new Date(f.when);
if (!f.when || isNaN(d.getTime())) {
SHW.say = "Pick a day and time.";
shwPaint();
return;
}
shwAct("show_book", { p_venue: f.venue, p_title: f.title, p_starts: d.toISOString(), p_minutes: +f.minutes }, function (o) { if (o && o.ok) {
SHW.form = null;
SHW.tab = "on";
} });
}
}
];
});
