/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(211, function () {
"use strict";
return [
function (icon) {
var c = document.createElement("canvas");
c.width = 128;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "rgba(250,244,228,.92)";
x.beginPath();
x.arc(64, 60, 52, 0, Math.PI * 2);
x.fill();
x.font = "64px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(icon, 64, 64);
return new THREE.CanvasTexture(c);
},
function (id, kind, name) {
var E = TOG_EMO[kind];
if (!E)
return;
var old = TOG.emo[id];
if (old)
togEmoteOff(id);
var g = togFigure(id), sp = null;
if (g) {
sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: togSignTex(E.icon), transparent: true, depthWrite: false, opacity: 0 }));
sp.scale.set(0.55, 0.55, 1);
sp.position.y = 2.55;
sp.renderOrder = 11;
g.add(sp);
}
TOG.emo[id] = { kind: kind, t: 0, len: E.len, sprite: sp };
if (id !== "me" && name && typeof streetNote === "function" && kind !== "sit")
try {
streetNote("<b>" + esc(name) + "</b> " + ({ wave: "waves", bow: "bows", cheer: "cheers", clap: "claps", dance: "dances", laugh: "laughs", point: "points", heart: "sends a heart", shrug: "shrugs" }[kind] || kind) + " " + E.icon);
}
catch (e) { }
},
function (g, kind, t, len) {
var L = g.userData.limbs, b = g.children[0];
if (!L || !b)
return;
var k = Math.min(1, t / 0.3, Math.max(0, (len - t) / 0.3)), S = Math.sin;
var la = L.la.rotation, ra = L.ra.rotation, ll = L.ll.rotation, rl = L.rl.rotation;
la.z = -0.07;
ra.z = 0.07;
b.rotation.set(0, 0, 0);
b.position.y = 0;
if (kind === "wave") {
ra.z = 0.07 + 2.5 * k;
ra.x = 0;
ra.y = 0;
la.x = 0;
ra.z += S(t * 9) * 0.28 * k;
}
else if (kind === "bow") {
b.rotation.x = 0.55 * k;
la.x = 0.2 * k;
ra.x = 0.2 * k;
}
else if (kind === "cheer") {
la.z = -(0.07 + 2.75 * k);
ra.z = 0.07 + 2.75 * k;
la.x = ra.x = 0;
b.position.y = Math.abs(S(t * 7)) * 0.08 * k;
}
else if (kind === "clap") {
la.x = ra.x = -1.25 * k;
var c = (0.35 + S(t * 14) * 0.25) * k;
la.z = -0.07 + c;
ra.z = 0.07 - c;
}
else if (kind === "dance") {
b.position.y = Math.abs(S(t * 6)) * 0.07 * k;
b.rotation.y = S(t * 3) * 0.35 * k;
b.rotation.z = S(t * 6) * 0.08 * k;
la.z = -(0.4 + S(t * 6) * 0.5 + 0.6) * k - 0.07;
ra.z = (0.4 - S(t * 6) * 0.5 + 0.6) * k + 0.07;
ll.x = S(t * 6) * 0.35 * k;
rl.x = -S(t * 6) * 0.35 * k;
}
else if (kind === "laugh") {
b.rotation.x = (-0.12 + S(t * 16) * 0.05) * k;
la.x = ra.x = -0.4 * k;
la.z = -0.07 + 0.4 * k;
ra.z = 0.07 - 0.4 * k;
}
else if (kind === "point") {
ra.x = -1.5 * k;
ra.z = 0.07;
}
else if (kind === "sit") {
b.position.y = -0.42 * k;
ll.x = rl.x = -1.45 * k;
la.x = ra.x = -0.5 * k;
}
else if (kind === "heart") {
la.z = -(0.07 + 2.3 * k);
ra.z = 0.07 + 2.3 * k;
la.x = ra.x = -0.35 * k;
}
else if (kind === "shrug") {
la.z = -(0.07 + 0.7 * k);
ra.z = 0.07 + 0.7 * k;
la.x = ra.x = -0.6 * k;
b.position.y = S(Math.min(1, t / 0.6) * Math.PI) * 0.03;
}
},
function (kind) {
if (!TOG_EMO[kind])
return;
togEmoteOn("me", kind);
if (typeof meView !== "undefined" && meView === "eyes" && typeof setStatus === "function")
setStatus(TOG_EMO[kind].icon + " You " + ({ wave: "wave", bow: "bow", cheer: "cheer", clap: "clap", dance: "dance", laugh: "laugh", point: "point", sit: "sit down", heart: "send a heart", shrug: "shrug" }[kind]) + ". Press V to see yourself.");
if (togLive())
cityRpc("live_send", { p_kind: "emote", p_to: null, p_place: togPlace(), p_body: { e: kind } }).then(function (o) {
if (o && !o.ok && o.say && typeof setStatus === "function")
setStatus(esc(o.say));
}).catch(function () { });
},
function (g) {
if (g.userData.togMouth !== undefined)
return g.userData.togMouth;
var face = null;
g.traverse(function (m) { if (!face && m.userData && m.userData.part === "face")
face = m; });
var mouth = null;
if (face) {
mouth = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 8), new THREE.MeshBasicMaterial({ color: 0x3A0E10 }));
mouth.position.set(0, -0.031, 0.108);
mouth.scale.set(1.5, 0.3, 0.45);
mouth.visible = false;
mouth.renderOrder = 3;
face.add(mouth);
}
g.userData.togMouth = mouth;
return mouth;
},
function (b, c, d, w) {
if (!b || !c || w <= 0)
return;
var bp = TOG_V[0], cp = TOG_V[1];
b.getWorldPosition(bp);
c.getWorldPosition(cp);
var cur = cp.sub(bp);
if (cur.lengthSq() < 1e-8)
return;
cur.normalize();
var q = TOG_Q[0].setFromUnitVectors(cur, TOG_V[2].copy(d).normalize());
if (w < 1)
q.slerpQuaternions(TOG_Q[2].identity(), q.clone(), w);
var bw = b.getWorldQuaternion(TOG_Q[1]);
bw.premultiply(q);
var pw = b.parent.getWorldQuaternion(TOG_Q[2]).invert();
b.quaternion.copy(pw.multiply(bw));
b.updateMatrixWorld(true);
},
function (g, E, kind, t, len) {
var B = togBones(E), k = Math.min(1, t / 0.3, Math.max(0, (len - t) / 0.3));
if (k <= 0)
return;
if (kind === "bow" || kind === "sit")
return;
E.model.updateMatrixWorld(true);
var F = togFwd(g, B);
var U = new THREE.Vector3(0, 1, 0), Lf = new THREE.Vector3();
if (B.upperarm_l && B.upperarm_r) {
var a = B.upperarm_l.getWorldPosition(new THREE.Vector3()), b = B.upperarm_r.getWorldPosition(new THREE.Vector3());
Lf.subVectors(a, b);
Lf.y = 0;
}
if (Lf.lengthSq() < 1e-6)
Lf.crossVectors(U, F);
Lf.normalize();
function dir(f, u, l) { return new THREE.Vector3().addScaledVector(F, f).addScaledVector(U, u).addScaledVector(Lf, l); }
var S = Math.sin, P = {};
if (kind === "wave") {
P.r = [dir(0.1, 0.9, -0.45), dir(0, 1, -0.25 + 0.38 * S(t * 8))];
}
else if (kind === "cheer") {
P.l = [dir(0.1, 1, 0.4), dir(0, 1, 0.15)];
P.r = [dir(0.1, 1, -0.4), dir(0, 1, -0.15)];
}
else if (kind === "clap") {
var c = 0.55 - 0.35 * Math.max(0, S(t * 12));
P.l = [dir(0.8, -0.35, 0.2), dir(0.8, 0.1, -c)];
P.r = [dir(0.8, -0.35, -0.2), dir(0.8, 0.1, c)];
}
else if (kind === "heart") {
P.l = [dir(0.15, 0.6, 0.8), dir(0.1, 0.7, -0.75)];
P.r = [dir(0.15, 0.6, -0.8), dir(0.1, 0.7, 0.75)];
}
else if (kind === "point") {
P.r = [dir(1, 0.15, -0.1), dir(1, 0.1, 0)];
}
else if (kind === "shrug") {
P.l = [dir(0.1, -0.85, 0.35), dir(0.6, 0.25, 0.7)];
P.r = [dir(0.1, -0.85, -0.35), dir(0.6, 0.25, -0.7)];
}
else if (kind === "laugh") {
P.l = [dir(0.3, -1, 0.15), dir(0.4, 0, -0.8)];
P.r = [dir(0.3, -1, -0.15), dir(0.4, 0, 0.8)];
}
else if (kind === "dance") {
var u1 = 0.3 + 0.6 * S(t * 6), u2 = 0.3 - 0.6 * S(t * 6);
P.l = [dir(0.2, u1, 1), dir(0.2, 1, 0.3)];
P.r = [dir(0.2, u2, -1), dir(0.2, 1, -0.3)];
}
["l", "r"].forEach(function (sd) {
var q = P[sd];
if (!q)
return;
togAim(B["upperarm_" + sd], B["lowerarm_" + sd], q[0], k);
togAim(B["lowerarm_" + sd], B["hand_" + sd], q[1], k);
});
},
function () {
try {
var c = (typeof cloudSetting === "function") ? cloudSetting("voice_ice") : null;
if (typeof c === "string")
c = JSON.parse(c);
if (c && !Array.isArray(c) && Array.isArray(c.iceServers))
c = c.iceServers;
if (Array.isArray(c) && c.length) {
var L = c.map(vcIceClean).filter(Boolean);
if (L.length)
return VC_STUN.concat(L);
}
}
catch (e) { }
return VC_STUN;
},
function (x) {
if (!x || !x.urls)
return null;
var U = [].concat(x.urls).join(" ").split(/[\s,;]+/).map(function (u) {
u = String(u || "").trim().replace(/^[a-z]+:\/\//i, "").replace(/\/+$/, "");
if (!u)
return null;
if (!/^(stun|turns?):/i.test(u))
u = "turn:" + u;
return /^(stun|turns?):[^\s]+$/i.test(u) ? u : null;
}).filter(Boolean);
if (!U.length)
return null;
var o = { urls: U };
if (x.username)
o.username = String(x.username).trim();
if (x.credential)
o.credential = String(x.credential).trim();
if (U.some(function (u) { return /^turns?:/i.test(u); }) && !(o.username && o.credential))
return null;
return o;
},
function (quiet) {
if (VC.on || VC.starting)
return;
if (TOG.adult === false) {
setStatus("🎙️ Voice is for dreamers aged 18 and over. Chat, emotes and the phone are open to everyone.");
return;
}
if (TOG.voiceMuted) {
setStatus("🎙️ Your voice is switched off for a day after reports. The Keeper can lift it.");
return;
}
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof RTCPeerConnection === "undefined") {
setStatus("🎙️ This browser cannot do voice. Chat still works.");
return;
}
VC.starting = true;
VC.tryAt = Date.now();
navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }).then(function (s) {
VC.starting = false;
VC.stream = s;
VC.on = true;
VC.muted = false;
VC.want = true;
try {
localStorage.setItem("somnu.voiceWanted", "1");
}
catch (e) { }
if (quiet) {
vcPill();
togPaint();
return;
}
var c = vcCtx();
if (c) {
try {
var src = c.createMediaStreamSource(s);
VC.myAn = c.createAnalyser();
VC.myAn.fftSize = 512;
VC.myBuf = new Uint8Array(VC.myAn.fftSize);
src.connect(VC.myAn);
}
catch (e) { }
}
setStatus("🎙️ <b>Voice is on.</b> Dreamers within 20 m who have voice on can hear you. Tap Mute any time.");
vcPill();
togPaint();
}).catch(function () { VC.starting = false; if (quiet) {
VC.want = false;
return;
} setStatus("🎙️ The microphone was not allowed. Voice stays off; you can turn it on again from Who's here."); });
},
function (auto) {
if (!auto) {
VC.want = false;
try {
localStorage.removeItem("somnu.voiceWanted");
}
catch (e) { }
}
Object.keys(VC.peers).forEach(function (id) { vcSend(id, { t: "bye" }); vcDrop(id); });
if (VC.stream)
VC.stream.getTracks().forEach(function (t) { t.stop(); });
VC.stream = null;
VC.on = false;
VC.myAn = null;
vcPill();
togPaint();
},
function (id) {
var pc = vcNewPc();
var P = VC.peers[id] = { pc: pc, audio: null, an: null, buf: null, at: Date.now(), t0: Date.now(), state: "calling" };
if (VC.stream)
VC.stream.getTracks().forEach(function (t) { pc.addTrack(t, VC.stream); });
pc.ontrack = function (e) {
var st = e.streams && e.streams[0];
if (!st)
return;
var a = P.audio || new Audio();
a.autoplay = true;
a.playsInline = true;
a.srcObject = st;
a.volume = 0;
P.audio = a;
a.play().catch(function () { });
var c = vcCtx();
if (c) {
try {
var src = c.createMediaStreamSource(st);
P.an = c.createAnalyser();
P.an.fftSize = 512;
P.buf = new Uint8Array(P.an.fftSize);
src.connect(P.an);
}
catch (er) { }
}
P.state = "on";
togPaint();
};
pc.onconnectionstatechange = function () { if (pc.connectionState === "failed") {
VC.fail = VC.fail || {};
VC.fail[id] = Date.now();
} if (pc.connectionState === "failed" || pc.connectionState === "closed")
vcDrop(id); };
P.late = [];
P.sent = false;
pc.onicecandidate = function (e) { if (!e.candidate || !P.sent)
return; P.late.push(e.candidate.toJSON()); clearTimeout(P.lateT); P.lateT = setTimeout(function () { if (VC.peers[id] !== P || !P.late.length)
return; vcSend(id, { t: "ice", c: P.late.splice(0, 8) }); }, 400); };
P.queue = [];
return P;
},
function (pc) {
return new Promise(function (res) {
if (pc.iceGatheringState === "complete")
return res();
var t = setTimeout(res, 6000), n = 0;
pc.addEventListener("icecandidate", function (e) { if (e.candidate && ++n === 1) {
clearTimeout(t);
t = setTimeout(res, 1200);
} });
pc.addEventListener("icegatheringstatechange", function () { if (pc.iceGatheringState === "complete") {
clearTimeout(t);
res();
} });
});
},
function (id) {
if (VC.peers[id])
return;
var P = vcPeer(id), pc = P.pc;
pc.createOffer({ offerToReceiveAudio: true }).then(function (o) { return pc.setLocalDescription(o); }).then(function () { return vcGathered(pc); })
.then(function () { if (VC.peers[id] === P) {
P.sent = true;
vcSend(id, { t: "offer", sdp: pc.localDescription.sdp });
} }).catch(function () { vcDrop(id); });
},
function (from, name, b) {
if (!VC.on)
return;
if (b.t === "bye") {
vcDrop(from);
return;
}
if (VC.local[from])
return;
var me = myUserId() || "";
if (b.t === "hi") {
VC.hiAt[from] = Date.now();
if (!VC.peers[from] && me < from && vcNear().some(function (p) { return p.id === from; }))
vcCall(from);
return;
}
if (b.t === "offer" && b.sdp) {
if (VC.peers[from])
vcDrop(from);
var P = vcPeer(from), pc = P.pc;
vcRemote(P, { type: "offer", sdp: b.sdp }).then(function () { return pc.createAnswer(); }).then(function (a) { return pc.setLocalDescription(a); })
.then(function () { return vcGathered(pc); }).then(function () { if (VC.peers[from] === P) {
P.sent = true;
vcSend(from, { t: "answer", sdp: pc.localDescription.sdp });
} }).catch(function () { vcDrop(from); });
return;
}
if (b.t === "answer" && b.sdp && VC.peers[from]) {
vcRemote(VC.peers[from], { type: "answer", sdp: b.sdp }).catch(function () { vcDrop(from); });
return;
}
if (b.t === "ice" && VC.peers[from]) {
var Q = VC.peers[from];
(b.c || []).forEach(function (c) { if (Q.pc.remoteDescription)
Q.pc.addIceCandidate(c).catch(function () { });
else
Q.queue.push(c); });
}
},
function (id) {
var P = VC.peers[id], now = Date.now();
if (VC.local[id])
return "you muted and reported them";
if (P && vcLinked(P))
return "🔊 on voice";
if (P)
return VC.fail && now - (VC.fail[id] || 0) < 60000 ? "🎙️ still trying (last try could not get through)" : "🎙️ connecting…";
if (VC.ok[id] === false)
return "voice not open between you (18+ with a date of birth, both, and no block)";
if (VC.ok[id] === undefined)
return "🎙️ checking…";
if (VC.fail && now - (VC.fail[id] || 0) < 60000)
return vcRelayOn() ? "🎙️ could not get through, trying again" : "🎙️ could not get through: different networks need the voice relay";
if (!VC.hiAt[id] || now - VC.hiAt[id] > 15000)
return "their voice is off";
return "🎙️ about to connect…";
},
function () {
var el = document.getElementById("vc-pill");
if (!VC.on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "vc-pill";
el.style.cssText = "position:fixed;left:12px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(14,16,26,.9);border:1px solid #6A8A5A;border-radius:18px;padding:5px 10px;" +
"font:12.5px var(--sans,system-ui);color:#DDE8D0;display:flex;gap:8px;align-items:center";
el.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-vc]");
if (!t)
return;
var a = t.getAttribute("data-vc");
if (a === "mute")
vcMute(!VC.muted);
else if (a === "off")
vcStop();
else if (a === "who") {
TOG.open = true;
togPaint();
}
});
document.body.appendChild(el);
}
var n = Object.keys(VC.peers).filter(function (id) { return VC.peers[id].state === "on" && vcLinked(VC.peers[id]); }).length;
el.style.display = "flex";
el.innerHTML = '<span data-vc="who" style="cursor:pointer">' + (VC.muted ? "🔇 Muted" : "🎙️ Voice on") + ' · ' + n + ' talking with you</span>' +
'<button class="btn" data-vc="mute" style="padding:2px 8px">' + (VC.muted ? "Unmute" : "Mute") + '</button><button class="btn" data-vc="off" style="padding:2px 8px">Off</button>';
},
function (f) {
if (!f.here)
return "not in Somnucor now";
if (f.realm && f.realm !== "somnucor")
return "away from the city";
var p = String(f.place || "out");
if (p === "out")
return "out in the streets";
if (/^mall:/.test(p))
return "in the World Mall";
if (/^underground/.test(p))
return "down in the Underground";
var lab = p.split(":").slice(1).join(":");
return "inside " + (lab || "a building");
},
function () {
var F = TOG.fol;
if (!F)
return;
var f = TOG.friends.filter(function (x) { return x.id === F.id; })[0];
if (!f) {
TOG.folSay = "Looking for " + esc(F.name) + "…";
return togFolPill();
}
var w = null;
try {
w = f.here ? placeToWorld({ x: f.x, z: f.z, place: f.place, level: f.level }) : null;
}
catch (e) { }
if (w) {
var d = Math.hypot(w.x - camera.position.x, w.z - camera.position.z);
if (typeof guideTo !== "undefined") {
guideTo = d > 12 ? { key: F.name, x: w.x, z: w.z } : null;
}
TOG.folSay = d > 12 ? ("Following <b>" + esc(F.name) + "</b> · " + Math.round(d) + " m · the arrow at the top shows the way") : ("You are with <b>" + esc(F.name) + "</b>");
}
else {
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === F.name)
guideTo = null;
TOG.folSay = "<b>" + esc(F.name) + "</b> is " + esc(togWhereWord(f)) + (f.here && String(f.place || "out") === "out" ? ". Step outside and the arrow will point to them." : ".");
}
togFolPill();
},
function () {
var el = document.getElementById("tog-fol");
if (!TOG.fol) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "tog-fol";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(112px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(14,16,26,.9);border:1px solid #8FB4E8;border-radius:18px;padding:5px 12px;" +
"font:12.5px var(--sans,system-ui);color:#E0E8F4;display:flex;gap:8px;align-items:center;max-width:calc(100vw - 32px)";
el.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("[data-fol]"))
togFollow(null); });
document.body.appendChild(el);
}
el.style.display = "flex";
el.innerHTML = '<span>👣 ' + TOG.folSay + '</span><button class="btn" data-fol="stop" style="padding:2px 8px">Stop</button>';
},
function () {
if (!(typeof signedIn === "function" && signedIn()))
return '<div style="color:var(--dim)">Sign in to see who is here.</div>';
var h = "", near = (typeof presenceList === "function") ? presenceList() : [], tot = (typeof presenceTotal !== "undefined") ? presenceTotal : near.length + 1;
var friendIds = {};
TOG.friends.forEach(function (f) { friendIds[f.id] = f; });
h += '<div style="color:var(--dim);margin:4px 0 8px"><b style="color:#F0E8D8">' + tot + '</b> in Somnucor right now' + (near.length ? ', <b style="color:#F0E8D8">' + near.filter(function (p) { return p.dist < 40; }).length + '</b> near you' : '') + '</div>';
h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">' + TOG_EMOTES.map(function (e) { return '<button class="btn" data-tg="emote" data-k="' + e[0] + '" title="' + e[2] + '" style="padding:5px 8px">' + e[1] + ' ' + e[2] + '</button>'; }).join("") + '</div>';
h += '<div style="padding:8px 10px;border:1px solid rgba(255,255,255,.08);border-radius:6px;margin-bottom:10px;line-height:1.5">';
if (TOG.adult === false)
h += '🎙️ Voice is for dreamers aged 18 and over. Chat, emotes and the phone are open to everyone.';
else if (TOG.voiceMuted)
h += '🎙️ Your voice is switched off for a day after reports.';
else if (!VC.on)
h += '🎙️ <b>Voice</b>: talk out loud with dreamers within 20 m who have voice on too. Never recorded. <button class="btn" data-tg="voice-on" style="margin-left:4px">Turn voice on</button>';
else
h += '🎙️ <b>Voice is on</b>' + (VC.muted ? ' (you are muted)' : '') + '. <button class="btn" data-tg="voice-mute">' + (VC.muted ? 'Unmute' : 'Mute') + '</button> <button class="btn" data-tg="voice-off">Turn off</button>';
if (VC.on)
h += '<div style="color:var(--dim);font-size:12px;margin-top:4px">Voice relay: ' + (vcRelayOn() ? 'on' : 'off (voice works on the same Wi-Fi only)') + (VC.relayBad ? ' · the relay was refused: ' + esc(VC.relayBad) : '') + '</div>';
h += '</div>';
h += '<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868;margin:6px 0 2px">Near you</div>';
if (!near.length)
h += '<div style="color:var(--dim)">Nobody else is in sight. Your friends are below.</div>';
near.slice(0, 20).forEach(function (p) {
var P = VC.peers[p.id], fr = friendIds[p.id];
h += '<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06);flex-wrap:wrap"><span style="flex:1;min-width:120px"><b>' + esc(p.name) + '</b> <span style="color:var(--dim);font-size:12px">' + Math.round(p.dist) + ' m' + (fr ? ' · friend' : '') + (VC.on ? ' · ' + esc(vcWhy(p.id)) : '') + '</span></span>' +
'<button class="btn" data-tg="wave" style="padding:2px 8px">👋</button>' +
(P || VC.mutedBy[p.id] ? '<button class="btn" data-tg="hush" data-id="' + p.id + '" style="padding:2px 8px">' + (VC.mutedBy[p.id] ? 'Unmute' : 'Mute') + '</button>' : '') +
(P ? '<button class="btn" data-tg="report" data-id="' + p.id + '" data-n="' + esc(p.name) + '" style="padding:2px 8px">Report voice</button>' : '') + '</div>';
});
h += '<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868;margin:12px 0 2px">Your friends</div>';
if (!TOG.friends.length)
h += '<div style="color:var(--dim)">No friends yet. Add them from your phone (☰ Menu → Phone → Friends).</div>';
TOG.friends.forEach(function (f) {
var on = TOG.fol && TOG.fol.id === f.id;
h += '<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span style="flex:1"><b>' + esc(f.name || "a friend") + '</b> <span style="color:var(--dim);font-size:12px">' + esc(togWhereWord(f)) + '</span></span>' +
(f.here ? '<button class="btn" data-tg="' + (on ? 'unfollow' : 'follow') + '" data-id="' + f.id + '" style="padding:2px 8px">' + (on ? 'Stop following' : 'Follow') + '</button>' : '') + '</div>';
});
h += '<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-tg="photo">📷 Photo mode</button></div>';
return h;
},
function () {
var el = document.getElementById("tog-box");
if (!TOG.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "tog-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:min(80vh,680px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #6A7A9A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-tg]") : null;
if (!t)
return;
var a = t.getAttribute("data-tg"), id = t.getAttribute("data-id");
if (a === "close") {
TOG.open = false;
togPaint();
}
else if (a === "emote") {
togEmote(t.getAttribute("data-k"));
}
else if (a === "wave") {
togEmote("wave");
}
else if (a === "voice-on")
vcStart();
else if (a === "voice-off")
vcStop();
else if (a === "voice-mute")
vcMute(!VC.muted);
else if (a === "hush") {
VC.mutedBy[id] = !VC.mutedBy[id];
togPaint();
}
else if (a === "report") {
var n = t.getAttribute("data-n");
if (!confirm("Report " + n + "'s voice to the officers and the Keeper? You will stop hearing them."))
return;
VC.local[id] = 1;
VC.mutedBy[id] = true;
vcSend(id, { t: "bye" });
vcDrop(id);
cityRpc("voice_report", { p_user: id, p_why: "reported from Who's here" }).then(function (o) { setStatus(esc((o && o.say) || "Reported.")); }).catch(function () { setStatus("Reported; you will not hear them again."); });
}
else if (a === "follow") {
var f = TOG.friends.filter(function (x) { return x.id === id; })[0];
if (f)
togFollow(f);
}
else if (a === "unfollow")
togFollow(null);
else if (a === "photo") {
TOG.open = false;
togPaint();
pmOpen();
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var st = el.scrollTop;
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#E0E8F4">👥 Who\'s here</b><button class="btn" data-tg="close">Close</button></div>' + togHtml();
el.scrollTop = st;
},
function () {
if (TOG.pm)
return;
var cv = (typeof renderer !== "undefined" && renderer) ? renderer.domElement : null;
if (!cv)
return;
TOG.pm = { filter: 0, frame: true, fov: camera.fov, view: (typeof meView !== "undefined") ? meView : "eyes" };
document.body.classList.add("pm-on");
if (typeof setView === "function" && meView === "eyes")
try {
setView("behind");
}
catch (e) { }
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
pmBar();
},
function () {
var M = TOG.pm;
if (!M)
return;
document.body.classList.remove("pm-on");
var cv = renderer.domElement;
cv.style.filter = "";
camera.fov = M.fov;
camera.updateProjectionMatrix();
if (typeof setView === "function")
try {
setView(M.view);
}
catch (e) { }
TOG.pm = null;
var b = document.getElementById("pm-bar");
if (b)
b.style.display = "none";
var fr = document.getElementById("pm-frame");
if (fr)
fr.style.display = "none";
},
function () {
var M = TOG.pm, b = document.getElementById("pm-bar");
if (!b) {
b = document.createElement("div");
b.id = "pm-bar";
b.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:60;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;" +
"width:min(760px,calc(100vw - 24px));background:rgba(10,12,20,.82);border:1px solid #6A7A9A;border-radius:10px;padding:8px;font:13px var(--sans,system-ui);color:#E0E8F4";
b.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-pm]") : null;
if (!t || !TOG.pm)
return;
var a = t.getAttribute("data-pm");
if (a === "done")
pmClose();
else if (a === "filter") {
TOG.pm.filter = (TOG.pm.filter + 1) % PM_FILTERS.length;
pmBar();
}
else if (a === "frame") {
TOG.pm.frame = !TOG.pm.frame;
pmBar();
}
else if (a === "in" || a === "out") {
camera.fov = Math.max(25, Math.min(90, camera.fov + (a === "in" ? -8 : 8)));
camera.updateProjectionMatrix();
}
else if (a === "view") {
var vs = ["eyes", "behind", "mirror"], i = vs.indexOf(meView);
try {
setView(vs[(i + 1) % 3]);
}
catch (er) { }
pmBar();
}
else if (a === "pose") {
var k = TOG_EMOTES[(TOG.pm.pose = ((TOG.pm.pose || 0) + 1) % TOG_EMOTES.length)][0];
togEmote(k);
}
else if (a === "snap")
pmSnap();
});
document.body.appendChild(b);
}
var f = PM_FILTERS[M.filter];
renderer.domElement.style.filter = f[2] === "none" ? "" : f[2];
b.style.display = "flex";
b.innerHTML = '<button class="btn" data-pm="snap" style="font-weight:600">📸 Take the photo</button>' +
'<button class="btn" data-pm="pose">🙌 Pose</button>' +
'<button class="btn" data-pm="view">🔄 ' + esc((typeof VIEW_LABEL !== "undefined" && VIEW_LABEL[meView]) || meView) + '</button>' +
'<button class="btn" data-pm="filter">🎨 ' + f[1] + '</button>' +
'<button class="btn" data-pm="frame">🖼️ Frame ' + (M.frame ? 'on' : 'off') + '</button>' +
'<button class="btn" data-pm="in">➕</button><button class="btn" data-pm="out">➖</button>' +
'<button class="btn" data-pm="done">Done</button>';
var fr = document.getElementById("pm-frame");
if (!fr) {
fr = document.createElement("div");
fr.id = "pm-frame";
fr.style.cssText = "position:fixed;inset:0;z-index:55;pointer-events:none;border:14px solid rgba(246,240,226,.95);box-sizing:border-box";
fr.innerHTML = '<div style="position:absolute;left:0;right:0;bottom:-12px;text-align:center;font:italic 13px Georgia;color:#4A3A2A"></div>';
document.body.appendChild(fr);
}
fr.style.display = M.frame ? "block" : "none";
fr.firstChild.textContent = "SomnuMatrix · " + pmPlaceName() + " · " + new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
},
function () {
var M = TOG.pm;
if (!M)
return;
try {
if (typeof renderView === "function")
renderView();
else
renderer.render(scene, camera);
}
catch (e) { }
var src = renderer.domElement, W = src.width, H = src.height, pad = M.frame ? Math.round(Math.min(W, H) * 0.035) : 0, cap = M.frame ? Math.round(pad * 2.2) : 0;
var c = document.createElement("canvas");
c.width = W + pad * 2;
c.height = H + pad * 2 + cap;
var x = c.getContext("2d");
if (M.frame) {
x.fillStyle = "#F6F0E2";
x.fillRect(0, 0, c.width, c.height);
}
var f = PM_FILTERS[M.filter][2];
if (f !== "none" && "filter" in x) {
x.filter = f;
x.drawImage(src, pad, pad);
x.filter = "none";
}
else {
x.drawImage(src, pad, pad);
if (f !== "none")
pmFilterPixels(x, pad, pad, W, H, PM_FILTERS[M.filter][0]);
}
if (M.frame) {
x.fillStyle = "#4A3A2A";
x.textAlign = "center";
x.font = "italic " + Math.round(cap * 0.42) + "px Georgia";
x.fillText("SomnuMatrix · " + pmPlaceName() + " · " + new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }), c.width / 2, H + pad + cap * 0.72);
}
var du = c.toDataURL("image/jpeg", 0.92), bin = atob(du.split(",")[1]), buf = new Uint8Array(bin.length);
for (var i = 0; i < bin.length; i++)
buf[i] = bin.charCodeAt(i);
pmPreview(new Blob([buf], { type: "image/jpeg" }), c);
},
function (x, ox, oy, W, H, k) {
try {
var d = x.getImageData(ox, oy, W, H), p = d.data;
for (var i = 0; i < p.length; i += 4) {
var r = p[i], g = p[i + 1], b = p[i + 2], l = 0.299 * r + 0.587 * g + 0.114 * b;
if (k === "noir") {
l = Math.min(255, Math.max(0, (l - 128) * 1.25 + 128));
r = g = b = l;
}
else if (k === "sepia") {
r = l * 1.07 + 20;
g = l * 0.95 + 8;
b = l * 0.75;
}
else if (k === "warm") {
r = r * 1.08 + 8;
g = g * 1.02;
b = b * 0.88;
}
else if (k === "dream") {
r = r * 0.95 + 10;
g = g * 0.98 + 6;
b = b * 1.1 + 14;
}
p[i] = Math.min(255, r);
p[i + 1] = Math.min(255, g);
p[i + 2] = Math.min(255, b);
}
x.putImageData(d, ox, oy);
}
catch (e) { }
},
function (blob, c) {
var url = URL.createObjectURL(blob), el = document.getElementById("pm-shot");
if (!el) {
el = document.createElement("div");
el.id = "pm-shot";
el.style.cssText = "position:fixed;inset:0;z-index:70;background:rgba(6,7,12,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;box-sizing:border-box";
document.body.appendChild(el);
}
var name = "somnumatrix-" + new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-") + ".jpg";
var canShare = false;
try {
canShare = !!(navigator.canShare && navigator.canShare({ files: [new File([blob], name, { type: "image/jpeg" })] }));
}
catch (e) { }
el.style.display = "flex";
el.innerHTML = '<img src="' + url + '" alt="Your photo" style="max-width:100%;max-height:70vh;border-radius:4px;box-shadow:0 10px 40px rgba(0,0,0,.6);opacity:0;transition:opacity .6s ease">' +
'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><a class="btn" href="' + url + '" download="' + name + '">💾 Save</a>' + (canShare ? '<button class="btn" data-pms="share">📤 Share</button>' : '') + '<button class="btn" data-pms="again">Take another</button></div>';
requestAnimationFrame(function () { var im = el.querySelector("img"); if (im)
im.style.opacity = "1"; });
el.onclick = function (e) {
var t = e.target.closest && e.target.closest("[data-pms]");
if (!t)
return;
if (t.getAttribute("data-pms") === "share") {
navigator.share({ files: [new File([blob], name, { type: "image/jpeg" })], title: "SomnuMatrix" }).catch(function () { });
}
else {
el.style.display = "none";
URL.revokeObjectURL(url);
}
};
}
];
});
