/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TOG = { since: 0, cool: 0, busy: false, adult: null, voiceMuted: false, warned: 0,
emo: {},
talk: {},
open: false, friends: [], fAt: 0, fol: null, folSay: "", pm: null };
var TOG_EMOTES = [
["wave", "👋", "Wave"], ["bow", "🙇", "Bow"], ["cheer", "🙌", "Cheer"], ["clap", "👏", "Clap"], ["dance", "💃", "Dance"],
["laugh", "😂", "Laugh"], ["point", "👉", "Point"], ["sit", "🪑", "Sit"], ["heart", "❤️", "Heart"], ["shrug", "🤷", "Shrug"]
];
var TOG_EMO = {};
TOG_EMOTES.forEach(function (e) { TOG_EMO[e[0]] = { icon: e[1], word: e[2], len: e[0] === "sit" ? 12 : e[0] === "dance" ? 8 : 3.2 }; });
function togPlace() { try {
var p = myPlace();
return p.place + "#" + (/^world:/.test(p.place) ? 0 : (p.level || 0));
}
catch (e) {
return "out#0";
} }
function togLive() { return typeof presenceActive !== "undefined" && presenceActive && typeof signedIn === "function" && signedIn(); }
function togPoll() {
if (TOG.busy || !togLive())
return;
TOG.busy = true;
cityRpc("live_poll", { p_since: TOG.since, p_place: togPlace() }).then(function (o) {
if (!o || !o.ok)
return;
TOG.adult = !!o.adult;
TOG.voiceMuted = !!o.voice_muted;
var first = !TOG.since;
TOG.since = Math.max(TOG.since, +o.top || 0);
if (first)
return;
(o.rows || []).forEach(function (r) {
try {
if (r.kind === "emote")
togEmoteOn(r.from, (r.body && r.body.e) || "wave", r.name);
else if (r.kind === "rtc")
vcSignal(r.from, r.name, r.body || {});
}
catch (e) { }
});
}).catch(function () { }).then(function () { TOG.busy = false; });
}
function togFigure(id) {
if (id === "me")
return (typeof meG !== "undefined") ? meG : null;
var p = (typeof presenceOthers !== "undefined") ? presenceOthers[id] : null;
return p && p.group;
}
function togSignTex(icon) { return __ZC(211, 0, this, arguments, new.target); }
function togEmoteOn(id, kind, name) { return __ZC(211, 1, this, arguments, new.target); }
function togEmoteOff(id) {
var e = TOG.emo[id];
if (!e)
return;
if (e.sprite) {
if (e.sprite.parent)
e.sprite.parent.remove(e.sprite);
e.sprite.material.map.dispose();
e.sprite.material.dispose();
}
var g = togFigure(id);
if (g)
togPoseReset(g);
delete TOG.emo[id];
}
function togPoseReset(g) {
var L = g.userData.limbs, b = g.children[0];
if (!L || !b)
return;
L.la.rotation.z = -0.07;
L.ra.rotation.z = 0.07;
L.la.rotation.y = 0;
L.ra.rotation.y = 0;
L.ll.rotation.x = 0;
L.rl.rotation.x = 0;
L.la.rotation.x = 0;
L.ra.rotation.x = 0;
b.rotation.x = 0;
b.rotation.z = 0;
b.rotation.y = 0;
b.position.y = 0;
}
function togPose(g, kind, t, len) { return __ZC(211, 2, this, arguments, new.target); }
function togEmotesTick(dt) {
Object.keys(TOG.emo).forEach(function (id) {
var e = TOG.emo[id];
e.t += dt;
var g = togFigure(id);
if (!g || e.t >= e.len) {
togEmoteOff(id);
return;
}
togPose(g, e.kind, e.t, e.len);
if (e.sprite) {
var a = Math.min(1, e.t / 0.5, Math.max(0, (Math.min(e.len, 3.2) - e.t) / 0.6));
e.sprite.material.opacity = a;
e.sprite.visible = a > 0.01;
e.sprite.position.y = 2.45 + Math.min(1, e.t / 0.5) * 0.12;
}
if (id === "me" && e.kind === "sit" && e.t > 0.6 && g.userData.amp > 0.2)
e.len = Math.min(e.len, e.t + 0.3);
});
}
function togEmote(kind) { return __ZC(211, 3, this, arguments, new.target); }
(function () {
if (typeof avatarTick !== "function")
return;
var at = avatarTick;
avatarTick = function (dt) { at.apply(this, arguments); try {
if (TOG.emo.me && typeof meG !== "undefined" && meG)
togPose(meG, TOG.emo.me.kind, TOG.emo.me.t, TOG.emo.me.len);
togMouth("me", dt);
}
catch (e) { } };
})();
function togMouthMesh(g) { return __ZC(211, 4, this, arguments, new.target); }
function togLevel(id, dt) {
var v = (typeof vcLevel === "function") ? vcLevel(id) : 0;
if (TOG.talk[id] > 0) {
TOG.talk[id] -= dt;
TOG.t2 = (TOG.t2 || 0) + dt;
v = Math.max(v, 0.45 + 0.4 * Math.abs(Math.sin(TOG.t2 * 9 + id.length)));
}
return v;
}
function togMouth(id, dt) {
var g = togFigure(id);
if (!g)
return;
var lv = togLevel(id, dt);
g.userData.togLv = lv;
var s = g.userData.togS || 0.3;
s += ((0.3 + lv * 1.1) - s) * Math.min(1, dt * 14);
g.userData.togS = s;
var m = (lv > 0.05 || g.userData.togMouth) ? togMouthMesh(g) : null;
if (!m)
return;
m.scale.y = s;
m.visible = s > 0.36;
}
(function () {
if (typeof sayOver !== "function")
return;
var so = sayOver;
sayOver = function (id, text) { so.apply(this, arguments); try {
TOG.talk[id] = Math.min(6, 0.8 + String(text || "").length * 0.055);
}
catch (e) { } };
})();
function togTalkAll(dt) {
if (typeof presenceOthers === "undefined")
return;
Object.keys(presenceOthers).forEach(function (id) { togMouth(id, dt); });
}
(function () {
if (typeof presenceTick !== "function")
return;
var pt = presenceTick;
presenceTick = function (dt) { pt.apply(this, arguments); try {
togEmotesTick(dt || 0.016);
togTalkAll(dt || 0.016);
}
catch (e) {
if (!TOG.warned && window.console) {
TOG.warned = 1;
console.warn("[together]", e);
}
} };
})();
var TOG_V = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], TOG_Q = [new THREE.Quaternion(), new THREE.Quaternion(), new THREE.Quaternion()];
function togHD(g) {
if (!g || typeof HDF === "undefined" || !HDF.list)
return null;
for (var i = 0; i < HDF.list.length; i++) {
var E = HDF.list[i];
if (E.g === g && E.model)
return E;
}
return null;
}
function togBones(E) {
if (E.togB && E.togB.m === E.model)
return E.togB;
var B = { m: E.model };
E.model.traverse(function (b) { if (b.isBone && /^(upperarm|lowerarm|hand|Head|spine_03|foot|ball)(_[lr])?$/i.test(b.name))
B[b.name.toLowerCase()] = b; });
E.togB = B;
return B;
}
function togAim(b, c, d, w) { return __ZC(211, 5, this, arguments, new.target); }
function togFwd(g, B) {
var r = B && B.m && B.m.children[0], F = new THREE.Vector3(0, 0, 1);
F.applyQuaternion((r || g).getWorldQuaternion(new THREE.Quaternion()));
if (!r)
F.negate();
F.y = 0;
return F.normalize();
}
function togHDPose(g, E, kind, t, len) { return __ZC(211, 6, this, arguments, new.target); }
function togHDAll() {
Object.keys(TOG.emo).forEach(function (id) {
var e = TOG.emo[id], g = togFigure(id), E = togHD(g);
if (E)
try {
togHDPose(g, E, e.kind, e.t, e.len);
}
catch (er) { }
});
}
(function () {
if (typeof hdfTick !== "function")
return;
var ht = hdfTick;
hdfTick = function (dt) { ht.apply(this, arguments); try {
togHDAll();
togHDMouths();
}
catch (e) { } };
})();
function togHDMouths() {
var ids = Object.keys(typeof presenceOthers !== "undefined" ? presenceOthers : {});
ids.push("me");
ids.forEach(function (id) {
var g = togFigure(id);
if (!g)
return;
var m = g.userData.togMouthHD, E = togHD(g);
if (!E) {
if (m)
m.visible = false;
return;
}
var lv = g.userData.togLv || 0;
if (lv < 0.05 && !m)
return;
var B = togBones(E), H = B.head;
if (!H)
return;
var body = g.children[0];
if (!m || m.parent !== body) {
m = new THREE.Mesh(new THREE.SphereGeometry(0.013, 12, 8), new THREE.MeshBasicMaterial({ color: 0x3A0E10 }));
m.renderOrder = 3;
body.add(m);
g.userData.togMouthHD = m;
}
var hp = H.getWorldPosition(new THREE.Vector3()).addScaledVector(togFwd(g, B), TOG_MOUTH.f).add(new THREE.Vector3(0, TOG_MOUTH.u, 0));
m.position.copy(body.worldToLocal(hp));
var s = g.userData.togS || 0.3, ws = body.getWorldScale(TOG_V[3]);
m.scale.set(1.5 / ws.x, s / ws.y, 0.6 / ws.z);
m.visible = s > 0.36;
});
}
var TOG_MOUTH = { f: 0.1, u: 0.032 };
var VC_STUN = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }];
function vcIceServers() { return __ZC(211, 7, this, arguments, new.target); }
function vcIceClean(x) { return __ZC(211, 8, this, arguments, new.target); }
function vcRelayOn() { return vcIceServers().length > VC_STUN.length; }
function vcNewPc() {
try {
return new RTCPeerConnection({ iceServers: vcIceServers() });
}
catch (e) {
if (window.console)
console.warn("[voice] relay refused, going on without it", e);
VC.relayBad = String((e && e.message) || e);
return new RTCPeerConnection({ iceServers: VC_STUN });
}
}
var VC = { on: false, stream: null, muted: false, peers: {}, ok: {}, okAt: 0, hiAt: {}, local: {}, actx: null, myAn: null, myBuf: null, mutedBy: {}, said: 0 };
function vcNear() {
if (typeof presenceList !== "function")
return [];
return presenceList().filter(function (p) { return p.dist < 20 && !(presenceOthers[p.id] && presenceOthers[p.id].away); }).slice(0, 6);
}
function vcSend(to, body) { return cityRpc("live_send", { p_kind: "rtc", p_to: to, p_place: null, p_body: body }).then(function (o) { if (o && o.novoice)
vcDrop(to); return o; }).catch(function () { }); }
function vcLevel(id) {
if (id === "me") {
if (!VC.on || VC.muted || !VC.myAn)
return 0;
return vcMeasure(VC.myAn, VC.myBuf);
}
var p = VC.peers[id];
if (!p || !p.an || VC.mutedBy[id])
return 0;
return vcMeasure(p.an, p.buf);
}
function vcMeasure(an, buf) { try {
an.getByteTimeDomainData(buf);
var s = 0;
for (var i = 0; i < buf.length; i += 4) {
var d = (buf[i] - 128) / 128;
s += d * d;
}
var r = Math.sqrt(s / (buf.length / 4));
return Math.min(1, Math.max(0, (r - 0.02) * 7));
}
catch (e) {
return 0;
} }
function vcCtx() { if (!VC.actx) {
try {
VC.actx = new (window.AudioContext || window.webkitAudioContext)();
}
catch (e) { }
} if (VC.actx && VC.actx.state === "suspended")
VC.actx.resume().catch(function () { }); return VC.actx; }
function vcStart(quiet) { return __ZC(211, 9, this, arguments, new.target); }
function vcStop(auto) { return __ZC(211, 10, this, arguments, new.target); }
function vcMute(on) { VC.muted = on; if (VC.stream)
VC.stream.getAudioTracks().forEach(function (t) { t.enabled = !on; }); vcPill(); togPaint(); }
function vcPeer(id) { return __ZC(211, 11, this, arguments, new.target); }
function vcGathered(pc) { return __ZC(211, 12, this, arguments, new.target); }
function vcRemote(P, desc) { return P.pc.setRemoteDescription(desc).then(function () { var q = P.queue.splice(0); q.forEach(function (c) { P.pc.addIceCandidate(c).catch(function () { }); }); }); }
function vcCall(id) { return __ZC(211, 13, this, arguments, new.target); }
function vcSignal(from, name, b) { return __ZC(211, 14, this, arguments, new.target); }
function vcDrop(id) {
var P = VC.peers[id];
if (!P)
return;
try {
P.pc.close();
}
catch (e) { }
if (P.audio) {
try {
P.audio.srcObject = null;
}
catch (e) { }
}
delete VC.peers[id];
togPaint();
}
try {
VC.want = localStorage.getItem("somnu.voiceWanted") === "1";
}
catch (e) { }
setInterval(function () {
try {
if (!VC.want || VC.on || VC.starting || document.visibilityState === "hidden")
return;
if (Date.now() - (VC.tryAt || 0) < 5000 || !togLive())
return;
if (TOG.adult !== true || TOG.voiceMuted)
return;
if (typeof flkOn === "function" && flkOn())
return;
vcStart(true);
}
catch (e) { }
}, 1500);
function vcTick() {
if (!VC.on)
return;
if (!togLive()) {
vcStop(true);
return;
}
var near = vcNear(), ids = near.map(function (p) { return p.id; }), now = Date.now();
var fresh = ids.filter(function (id) { return VC.ok[id] === undefined; });
if ((fresh.length || now - VC.okAt > 30000) && ids.length && !VC.asking) {
VC.asking = true;
cityRpc("voice_who", { p_ids: ids }).then(function (ok) { ids.forEach(function (id) { VC.ok[id] = (ok || []).indexOf(id) >= 0; }); VC.okAt = Date.now(); }).catch(function () { }).then(function () { VC.asking = false; });
}
ids.forEach(function (id) {
if (!VC.ok[id] || VC.local[id] || VC.peers[id])
return;
if (!VC.hiAt["sent" + id] || now - VC.hiAt["sent" + id] > 6000) {
VC.hiAt["sent" + id] = now;
vcSend(id, { t: "hi" });
}
});
Object.keys(VC.peers).forEach(function (id) {
var P = VC.peers[id], g = togFigure(id);
if (!g) {
if (now - P.at > 15000)
vcDrop(id);
return;
}
var d = Math.hypot(g.position.x - camera.position.x, g.position.z - camera.position.z);
if (d > 26) {
vcSend(id, { t: "bye" });
vcDrop(id);
return;
}
P.at = now;
if (P.audio)
P.audio.volume = VC.mutedBy[id] ? 0 : Math.max(0, Math.min(1, 1 - (d - 4) / 16));
if (P.state === "calling" && now - (P.t0 || now) > 20000) {
vcSend(id, { t: "bye" });
vcDrop(id);
}
});
vcPill();
}
function vcLinked(P) { var pc = P && P.pc; if (!pc)
return false; var s = pc.connectionState || "", i = pc.iceConnectionState || ""; return s === "connected" || i === "connected" || i === "completed"; }
function vcWhy(id) { return __ZC(211, 15, this, arguments, new.target); }
function vcPill() { return __ZC(211, 16, this, arguments, new.target); }
setInterval(function () { try {
vcTick();
}
catch (e) { } }, 1000);
function togFriends() {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve();
return cityRpc("friends_where", {}).then(function (o) { if (o && o.ok) {
TOG.friends = o.friends || [];
TOG.fAt = Date.now();
} }).catch(function () { });
}
function togWhereWord(f) { return __ZC(211, 17, this, arguments, new.target); }
function togFollowTick() { return __ZC(211, 18, this, arguments, new.target); }
function togFolPill() { return __ZC(211, 19, this, arguments, new.target); }
function togFollow(f) {
if (!f) {
if (TOG.fol && typeof guideTo !== "undefined" && guideTo && guideTo.key === TOG.fol.name)
guideTo = null;
TOG.fol = null;
togFolPill();
togPaint();
return;
}
TOG.fol = { id: f.id, name: f.name || "your friend" };
togFollowTick();
togPaint();
}
setInterval(function () {
if (!(typeof signedIn === "function" && signedIn()))
return;
if (TOG.fol || TOG.open) {
if (Date.now() - TOG.fAt > 4000)
togFriends().then(function () { togFollowTick(); if (TOG.open)
togPaint(); });
else
togFollowTick();
}
}, 2000);
function togHtml() { return __ZC(211, 20, this, arguments, new.target); }
function togPaint() { return __ZC(211, 21, this, arguments, new.target); }
function togOpen() { TOG.open = !TOG.open; togPaint(); if (TOG.open) {
togFriends().then(togPaint);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
} }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!TOG.open; }, close: function () { TOG.open = false; togPaint(); } });
var PM_FILTERS = [["none", "As it is", "none"], ["warm", "Warm", "sepia(.25) saturate(1.35) hue-rotate(-8deg)"], ["noir", "Noir", "grayscale(1) contrast(1.25)"],
["dream", "Dream", "saturate(1.45) hue-rotate(18deg) brightness(1.06)"], ["sepia", "Sepia", "sepia(.85) contrast(1.05)"]];
function pmOpen() { return __ZC(211, 22, this, arguments, new.target); }
function pmClose() { return __ZC(211, 23, this, arguments, new.target); }
function pmPlaceName() {
try {
var p = myPlace();
if (p.place === "out")
return "Somnucor";
var lab = String(p.place).split(":").slice(1).join(":");
return lab || "Somnucor";
}
catch (e) {
return "SomnuMatrix";
}
}
function pmBar() { return __ZC(211, 24, this, arguments, new.target); }
function pmSnap() { return __ZC(211, 25, this, arguments, new.target); }
function pmFilterPixels(x, ox, oy, W, H, k) { return __ZC(211, 26, this, arguments, new.target); }
function pmPreview(blob, c) { return __ZC(211, 27, this, arguments, new.target); }
(function () {
var st = document.createElement("style");
st.textContent = "body.pm-on>*:not(#world):not(#pm-bar):not(#pm-frame):not(#pm-shot):not(canvas):not(script):not(style){visibility:hidden!important}" +
"body.pm-on #world{visibility:visible!important}";
document.head.appendChild(st);
})();
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return !!TOG.pm; }, close: function () { var s = document.getElementById("pm-shot"); if (s && s.style.display !== "none")
s.style.display = "none";
else
pmClose(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
[["me-who", "👥 Who's here", "Everyone near you, your friends, emotes and voice", togOpen],
["me-photo", "📷 Photo", "Photo mode: pose, frame and save a picture", function () { pmOpen(); }]].forEach(function (d) {
if (document.getElementById(d[0]))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = d[0];
b.textContent = d[1];
b.title = d[2];
b.onclick = d[3];
var pk = document.getElementById("me-tonight") || document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
});
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
TOG.cool -= 0.5;
if (TOG.cool > 0)
return;
TOG.cool = Math.min(VC.on ? 1 : 2.5, typeof presenceEvery === "function" ? presenceEvery(2.5, 0.5, 0.03) : 2.5);
try {
togPoll();
}
catch (e) { }
if (!togLive() && Object.keys(TOG.emo).length)
Object.keys(TOG.emo).forEach(function (id) { if (id !== "me")
togEmoteOff(id); });
}, 500);
setInterval(function () { if (TOG.emo.me && !togLive())
try {
togEmotesTick(0.05);
}
catch (e) { } }, 50);
