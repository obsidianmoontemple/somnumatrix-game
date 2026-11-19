/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TOGX_SOLO = [
["nod", "🙂", "Nod", "nods", 2.4], ["no", "🙅", "Shake head", "shakes their head", 2.4], ["thumbs", "👍", "Thumbs up", "gives a thumbs up", 2.8],
["salute", "🎖️", "Salute", "salutes", 3], ["think", "🤔", "Think", "has a think", 5], ["facepalm", "🤦", "Facepalm", "facepalms", 3],
["cry", "😢", "Cry", "cries", 4], ["kiss", "😘", "Blow a kiss", "blows a kiss", 2.6], ["flex", "💪", "Flex", "flexes", 3.2],
["pray", "🙏", "Pray", "prays", 6], ["stretch", "🙆", "Stretch", "stretches", 3.6], ["yawn", "🥱", "Yawn", "yawns", 3.4],
["jump", "🤸", "Jump for joy", "jumps for joy", 3], ["beckon", "🙋", "Come here", "waves you over", 3], ["scared", "😱", "Scared", "jumps in fright", 3],
["angry", "😠", "Angry", "stamps in anger", 3], ["guitar", "🎸", "Air guitar", "plays air guitar", 6], ["victory", "✌️", "Victory", "throws up a victory sign", 3],
["look", "👀", "Look around", "looks around", 4], ["curtsey", "🌸", "Curtsey", "curtseys", 3]
];
var TOGX_PAIR = [
["hug", "🤗", "Hug", "a hug", "hug", 3.6], ["five", "✋", "High five", "a high five", "high-five", 2.4], ["shake", "🤝", "Handshake", "a handshake", "shake hands", 3],
["bump", "👊", "Fist bump", "a fist bump", "bump fists", 2.2], ["slow", "💞", "Slow dance", "a slow dance", "slow dance", 24]
];
var TOGX_GROUPS = [
["Greet and answer", ["wave", "bow", "curtsey", "nod", "no", "thumbs", "salute", "beckon", "point"]],
["How you feel", ["laugh", "heart", "kiss", "cry", "scared", "angry", "think", "facepalm", "shrug", "yawn"]],
["Have some fun", ["cheer", "clap", "dance", "jump", "flex", "guitar", "victory", "stretch", "look", "pray", "sit"]]
];
var TOGX = { ask: null, out: null, open: false, said: {} };
TOGX_SOLO.forEach(function (e) { TOG_EMO[e[0]] = { icon: e[1], word: e[2], len: e[4], says: e[3] }; });
TOGX_PAIR.forEach(function (e) { TOG_EMO[e[0]] = { icon: e[1], word: e[2], len: e[5], pair: true, ask: e[3], verb: e[4] }; });
function togxEmo(k) {
var a = TOGX_SOLO.filter(function (e) { return e[0] === k; })[0];
if (a)
return a;
var b = TOG_EMOTES.filter(function (e) { return e[0] === k; })[0];
return b ? [b[0], b[1], b[2]] : null;
}
function togxHex(id) { return String(id || "").replace(/-/g, "").slice(0, 12).toLowerCase(); }
function togxWho(hex) {
if (!hex)
return null;
var me = (typeof myUserId === "function") ? myUserId() : null;
if (me && togxHex(me) === hex)
return "me";
var ids = (typeof presenceOthers !== "undefined") ? Object.keys(presenceOthers) : [];
for (var i = 0; i < ids.length; i++)
if (togxHex(ids[i]) === hex)
return ids[i];
return null;
}
function togxSend(e) {
if (!togLive())
return Promise.resolve(null);
return cityRpc("live_send", { p_kind: "emote", p_to: null, p_place: togPlace(), p_body: { e: e } }).then(function (o) {
if (o && !o.ok && o.say && typeof setStatus === "function")
setStatus(esc(o.say));
return o;
}).catch(function () { return null; });
}
function togxName(id) { var p = (typeof presenceOthers !== "undefined") && presenceOthers[id]; return (p && p.name) || "a dreamer"; }
(function () {
var on = togEmoteOn;
togEmoteOn = function (id, kind, name) {
kind = String(kind || "");
var m = /^([qyn])\.([a-z]+)\.([0-9a-f]{12})$/.exec(kind);
if (m)
return togxPairSignal(id, m[1], m[2], m[3], name);
var X = TOG_EMO[kind], quiet = X && (X.says || X.pair);
var r = on.call(this, id, kind, quiet ? null : name);
if (quiet && id !== "me" && name && X.says && typeof streetNote === "function")
try {
streetNote("<b>" + esc(name) + "</b> " + X.says + " " + X.icon);
}
catch (e) { }
return r;
};
var te = togEmote;
togEmote = function (kind) {
var X = TOG_EMO[kind];
if (X && X.pair)
return;
var r = te.apply(this, arguments);
if (X && X.says && typeof meView !== "undefined" && meView === "eyes" && typeof setStatus === "function")
setStatus(X.icon + " You " + X.word.toLowerCase() + ". Press V to see yourself.");
return r;
};
var off = togEmoteOff;
togEmoteOff = function (id) {
var e = TOG.emo[id], g = e && togFigure(id);
var r = off.apply(this, arguments);
if (g && g.children[0]) {
g.children[0].position.x = 0;
g.children[0].position.z = 0;
}
if (e && e.with && TOG.emo[e.with] && TOG.emo[e.with].with === id && TOG.emo[e.with].kind === e.kind && TOG_EMO[e.kind].len > 8)
togEmoteOff(e.with);
return r;
};
})();
function togxAsk(id, kind) { return __ZC(309, 0, this, arguments, new.target); }
function togxPairSignal(from, q, kind, hex, name) { return __ZC(309, 1, this, arguments, new.target); }
function togxStart(a, b, kind, name) { return __ZC(309, 2, this, arguments, new.target); }
function togxAnswer(yes) {
var A = TOGX.ask;
TOGX.ask = null;
togxAskBox();
if (!A)
return;
togxSend((yes ? "y." : "n.") + A.kind + "." + togxHex(A.from));
if (yes)
togxStart("me", A.from, A.kind);
}
function togxAskBox() { return __ZC(309, 3, this, arguments, new.target); }
setInterval(function () { if (TOGX.ask)
togxAskBox(); if (TOGX.out && Date.now() - TOGX.out.at > 32000)
TOGX.out = null; }, 1000);
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!TOGX.ask; }, close: function () { togxAnswer(false); } });
function togxSm(a, b, t) { var x = Math.max(0, Math.min(1, (t - a) / (b - a))); return x * x * (3 - 2 * x); }
(function () {
var tp = togPose;
togPose = function (g, kind, t, len) {
var X = TOG_EMO[kind];
if (!X || !(X.says || X.pair))
return tp.apply(this, arguments);
var L = g.userData.limbs, b = g.children[0];
if (!L || !b)
return;
var k = Math.min(1, t / 0.3, Math.max(0, (len - t) / 0.3)), S = Math.sin, hd = !!togHD(g);
var la = L.la.rotation, ra = L.ra.rotation, ll = L.ll.rotation, rl = L.rl.rotation;
la.set(0, 0, -0.07);
ra.set(0, 0, 0.07);
ll.x = 0;
rl.x = 0;
b.rotation.set(0, 0, 0);
b.position.y = 0;
switch (kind) {
case "nod":
if (!hd)
b.rotation.x = S(t * 7) * 0.07 * k;
break;
case "no":
if (!hd)
b.rotation.y = S(t * 7) * 0.22 * k;
break;
case "thumbs":
ra.x = -0.9 * k;
break;
case "salute":
ra.z = 0.07 + 1.5 * k;
ra.x = -0.7 * k;
break;
case "think":
ra.x = -1.25 * k;
la.x = -0.5 * k;
la.z = -0.07 + 0.5 * k;
break;
case "facepalm":
ra.x = -1.65 * k;
if (!hd)
b.rotation.x = 0.18 * k;
break;
case "cry":
la.x = ra.x = -1.45 * k;
if (!hd)
b.rotation.x = 0.18 * k;
break;
case "kiss":
ra.x = -(1.5 - 0.4 * togxSm(0.9, 1.4, t)) * k;
break;
case "flex":
la.z = -(0.07 + 1.45 * k);
ra.z = 0.07 + 1.45 * k;
la.x = ra.x = -0.2 * k;
break;
case "pray":
la.x = ra.x = -1.1 * k;
la.z = -0.07 + 0.35 * k;
ra.z = 0.07 - 0.35 * k;
if (!hd)
b.rotation.x = 0.1 * k;
break;
case "stretch":
la.z = -(0.07 + 2.7 * k);
ra.z = 0.07 + 2.7 * k;
b.position.y = 0.03 * k;
break;
case "yawn":
ra.x = -1.5 * k;
la.z = -(0.07 + 2.3 * k);
break;
case "jump":
la.z = -(0.07 + 2.7 * k);
ra.z = 0.07 + 2.7 * k;
b.position.y = Math.abs(S(t * 5.2)) * 0.26 * k;
break;
case "beckon":
ra.x = (-1.0 + S(t * 6) * 0.28) * k;
break;
case "scared":
la.x = ra.x = -1.55 * k;
la.z = -0.07 + 0.25 * k;
ra.z = 0.07 - 0.25 * k;
b.position.y = -0.06 * k;
break;
case "angry":
la.z = -0.07 - 0.3 * k;
ra.z = 0.07 + 0.3 * k;
b.position.y = -Math.abs(S(t * 6)) * 0.03 * k;
break;
case "guitar":
la.x = -1.1 * k;
la.z = -0.07 - 0.35 * k;
ra.x = (-0.6 + S(t * 12) * 0.2) * k;
b.position.y = Math.abs(S(t * 4)) * 0.025 * k;
break;
case "victory":
ra.z = 0.07 + 2.8 * k;
break;
case "look":
if (!hd)
b.rotation.y = S(t * 1.6) * 0.5 * k;
break;
case "curtsey":
b.position.y = -0.12 * S(Math.min(1, t / len) * Math.PI) * k;
ll.x = 0.25 * k;
rl.x = -0.3 * k;
la.z = -0.07 - 0.35 * k;
ra.z = 0.07 + 0.35 * k;
break;
case "hug":
la.x = ra.x = -1.4 * k;
la.z = -0.07 + 0.55 * k;
ra.z = 0.07 - 0.55 * k;
break;
case "five":
ra.z = 0.07 + 2.5 * k;
ra.x = -0.6 * k;
break;
case "shake":
ra.x = (-1.0 + S(t * 9) * 0.12) * k;
break;
case "bump":
ra.x = -1.35 * k;
break;
case "slow":
la.x = ra.x = -1.15 * k;
la.z = -0.07 + 0.3 * k;
ra.z = 0.07 - 0.3 * k;
break;
}
if (X.pair)
togxFace(g, TOG.emo[togxIdOf(g)], kind, t, k, b);
};
})();
function togxIdOf(g) { if (typeof meG !== "undefined" && g === meG)
return "me"; var ids = Object.keys(TOG.emo); for (var i = 0; i < ids.length; i++)
if (ids[i] !== "me" && togFigure(ids[i]) === g)
return ids[i]; return null; }
var TOGX_V = [new THREE.Vector3(), new THREE.Vector3()];
var TOGX_GAP = { hug: 0.42, five: 0.95, shake: 0.85, bump: 0.85, slow: 0.5 };
function togxFace(g, e, kind, t, k, b) { return __ZC(309, 4, this, arguments, new.target); }
(function () {
var hp = togHDPose;
togHDPose = function (g, E, kind, t, len) {
var X = TOG_EMO[kind];
if (!X || !(X.says || X.pair))
return hp.apply(this, arguments);
var B = togBones(E), k = Math.min(1, t / 0.3, Math.max(0, (len - t) / 0.3));
if (k <= 0)
return;
if (kind === "curtsey")
return;
E.model.updateMatrixWorld(true);
var F = togFwd(g, B), U = new THREE.Vector3(0, 1, 0), Lf = new THREE.Vector3();
if (B.upperarm_l && B.upperarm_r) {
var a = B.upperarm_l.getWorldPosition(new THREE.Vector3()), c = B.upperarm_r.getWorldPosition(new THREE.Vector3());
Lf.subVectors(a, c);
Lf.y = 0;
}
if (Lf.lengthSq() < 1e-6)
Lf.crossVectors(U, F);
Lf.normalize();
function dir(f, u, l) { return new THREE.Vector3().addScaledVector(F, f).addScaledVector(U, u).addScaledVector(Lf, l); }
var S = Math.sin, P = {}, pitch = 0, yawH = 0;
switch (kind) {
case "nod":
pitch = S(t * 7) * 0.32;
break;
case "no":
yawH = S(t * 7) * 0.5;
break;
case "look":
yawH = S(t * 1.6) * 0.75;
break;
case "thumbs":
P.r = [dir(0.55, -0.6, -0.35), dir(0.9, 0.5, 0)];
break;
case "salute":
P.r = [dir(0.35, 0.25, -0.9), dir(0.25, 0.55, 0.8)];
break;
case "think":
P.r = [dir(0.45, -0.85, -0.2), dir(0.3, 0.9, 0.25)];
P.l = [dir(0.3, -0.9, 0.2), dir(0.8, 0.1, -0.6)];
pitch = 0.12;
break;
case "facepalm":
P.r = [dir(0.6, -0.45, -0.2), dir(0.25, 0.85, 0.4)];
pitch = 0.38;
break;
case "cry":
P.l = [dir(0.6, -0.6, 0.25), dir(0.25, 0.9, -0.3)];
P.r = [dir(0.6, -0.6, -0.25), dir(0.25, 0.9, 0.3)];
pitch = 0.3 + S(t * 9) * 0.04;
break;
case "kiss":
var w = togxSm(0.9, 1.4, t), a1 = dir(0.6, -0.55, -0.2).lerp(dir(0.9, 0.25, -0.3), w), a2 = dir(0.3, 0.9, 0.3).lerp(dir(1, 0.3, -0.15), w);
P.r = [a1, a2];
break;
case "flex":
P.l = [dir(0, 0.05, 1), dir(0.1, 1, 0.05)];
P.r = [dir(0, 0.05, -1), dir(0.1, 1, -0.05)];
break;
case "pray":
P.l = [dir(0.45, -0.85, 0.25), dir(0.75, 0.6, -0.45)];
P.r = [dir(0.45, -0.85, -0.25), dir(0.75, 0.6, 0.45)];
pitch = 0.22;
break;
case "stretch":
P.l = [dir(0, 1, 0.3), dir(0, 1, 0)];
P.r = [dir(0, 1, -0.3), dir(0, 1, 0)];
pitch = -0.15;
break;
case "yawn":
P.r = [dir(0.6, -0.55, -0.2), dir(0.3, 0.9, 0.3)];
P.l = [dir(0.1, 0.8, 0.55), dir(0, 1, 0.15)];
pitch = -0.28;
break;
case "jump":
P.l = [dir(0.1, 1, 0.4), dir(0, 1, 0.15)];
P.r = [dir(0.1, 1, -0.4), dir(0, 1, -0.15)];
break;
case "beckon":
P.r = [dir(0.75, -0.35, -0.3), dir(0.85, 0.25 + 0.45 * Math.max(0, S(t * 6)), 0.1)];
break;
case "scared":
P.l = [dir(0.6, -0.2, 0.35), dir(0.3, 0.95, -0.15)];
P.r = [dir(0.6, -0.2, -0.35), dir(0.3, 0.95, 0.15)];
pitch = 0.15;
break;
case "angry":
P.l = [dir(0.1, -1, 0.3), dir(0.25, -1, 0.2)];
P.r = [dir(0.1, -1, -0.3), dir(0.25, -1, -0.2)];
pitch = 0.12;
break;
case "guitar":
P.l = [dir(0.6, -0.3, 0.5), dir(0.6, 0.3, -0.75)];
P.r = [dir(0.35, -0.85, -0.3), dir(0.75, -0.1 + 0.3 * S(t * 12), 0.6)];
break;
case "victory":
P.r = [dir(0.15, 1, -0.35), dir(0.05, 1, -0.1)];
break;
case "hug":
P.l = [dir(0.95, 0.1, 0.28), dir(0.3, 0.05, -0.95)];
P.r = [dir(0.95, 0.1, -0.28), dir(0.3, 0.05, 0.95)];
break;
case "five":
var hit = togxSm(0.6, 1.0, t) - togxSm(1.5, 1.9, t);
P.r = [dir(0.5 + 0.25 * hit, 0.8, -0.3), dir(0.4 + 0.3 * hit, 1, -0.05)];
break;
case "shake":
P.r = [dir(0.6, -0.75, -0.1), dir(1, 0.05 + 0.14 * S(t * 9), 0.2)];
break;
case "bump":
P.r = [dir(0.7, -0.45, -0.15), dir(1, 0.08, 0.12)];
break;
case "slow":
P.l = [dir(0.8, 0.2, 0.35), dir(0.55, 0.4, -0.75)];
P.r = [dir(0.8, -0.3, -0.3), dir(0.6, -0.1, 0.7)];
break;
}
["l", "r"].forEach(function (sd) {
var q = P[sd];
if (!q)
return;
togAim(B["upperarm_" + sd], B["lowerarm_" + sd], q[0], k);
togAim(B["lowerarm_" + sd], B["hand_" + sd], q[1], k);
});
if ((pitch || yawH) && B.head) {
var H = B.head, q = new THREE.Quaternion();
if (pitch)
q.setFromAxisAngle(Lf, -pitch * k);
if (yawH)
q.premultiply(new THREE.Quaternion().setFromAxisAngle(U, yawH * k));
var hw = H.getWorldQuaternion(new THREE.Quaternion()).premultiply(q);
H.quaternion.copy(H.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(hw));
H.updateMatrixWorld(true);
}
};
})();
setInterval(function () {
var e = TOG.emo.me;
if (!e || !TOG_EMO[e.kind] || !TOG_EMO[e.kind].pair)
return;
if (typeof meG !== "undefined" && meG && e.t > 1 && meG.userData.amp > 0.25)
e.len = Math.min(e.len, e.t + 0.3);
if (e.with && !togFigure(e.with))
e.len = Math.min(e.len, e.t + 0.3);
}, 250);
function togxHtml() { return __ZC(309, 5, this, arguments, new.target); }
function togxPaint() { return __ZC(309, 6, this, arguments, new.target); }
function togxOpen(on) { TOGX.open = on === undefined ? !TOGX.open : !!on; togxPaint(); if (TOGX.open && document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!TOGX.open; }, close: function () { togxOpen(false); } });
setInterval(function () { if (TOGX.open)
togxPaint(); }, 3000);
addEventListener("keydown", function (e) {
if (e.code !== "KeyN" || e.repeat || e.ctrlKey || e.metaKey || e.altKey)
return;
var tg = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT/.test(tg) || (e.target && e.target.isContentEditable))
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
togxOpen();
});
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-emotes"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-emotes";
b.textContent = "😊 Emotes";
b.title = "Emotes: wave, hug, dance and more (N)";
b.onclick = function () { togxOpen(true); };
var w = document.getElementById("me-who");
if (w && w.parentNode === bar)
bar.insertBefore(b, w.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
var TOGX_VR = { stick: false };
function togxVrPoll() {
if (typeof VRM === "undefined" || !VRM.xr) {
if (VCX.vrHeld) {
VCX.vrHeld = false;
vcxGate();
}
return;
}
var stick = false, grip = false;
try {
var S = VRM.xr;
for (var i = 0; i < S.inputSources.length; i++) {
var s = S.inputSources[i], gp = s.gamepad;
if (!gp || s.handedness !== "right")
continue;
var bt = gp.buttons || [];
stick = !!(bt[3] && bt[3].pressed);
grip = !!(bt[1] && bt[1].pressed);
}
}
catch (e) { }
if (stick && !TOGX_VR.stick)
togxOpen();
TOGX_VR.stick = stick;
if (grip !== !!VCX.vrHeld) {
VCX.vrHeld = grip;
vcxGate();
}
}
var VCX = { ptt: false, keyHeld: false, btnHeld: false, vrHeld: false, vol: 1, pvol: {}, spk: {}, meter: 0, drag: false };
try {
VCX.ptt = localStorage.getItem("sm.vc.ptt") === "1";
var vv = parseFloat(localStorage.getItem("sm.vc.vol"));
if (isFinite(vv))
VCX.vol = Math.max(0, Math.min(1.5, vv));
VCX.pvol = JSON.parse(localStorage.getItem("sm.vc.pvol") || "{}") || {};
}
catch (e) { }
function vcxSave() { try {
localStorage.setItem("sm.vc.ptt", VCX.ptt ? "1" : "0");
localStorage.setItem("sm.vc.vol", String(VCX.vol));
localStorage.setItem("sm.vc.pvol", JSON.stringify(VCX.pvol));
}
catch (e) { } }
function vcxHeld() { return VCX.keyHeld || VCX.btnHeld || VCX.vrHeld; }
function vcxGate() {
if (!VC.stream)
return;
var live = !VC.muted && (!VCX.ptt || vcxHeld());
VC.stream.getAudioTracks().forEach(function (t) { t.enabled = live; });
}
(function () {
var vm = vcMute;
vcMute = function () { var r = vm.apply(this, arguments); vcxGate(); return r; };
var vs = vcStart;
vcStart = function () { var r = vs.apply(this, arguments); var n = 0, iv = setInterval(function () { if (VC.stream || ++n > 40) {
clearInterval(iv);
vcxGate();
vcPill();
} }, 250); return r; };
})();
addEventListener("keydown", function (e) {
if (e.code !== "KeyY" || !VC.on || !VCX.ptt)
return;
var tg = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT/.test(tg) || (e.target && e.target.isContentEditable))
return;
if (!VCX.keyHeld) {
VCX.keyHeld = true;
vcxGate();
}
});
addEventListener("keyup", function (e) { if (e.code === "KeyY" && VCX.keyHeld) {
VCX.keyHeld = false;
vcxGate();
} });
addEventListener("blur", function () { if (VCX.keyHeld || VCX.btnHeld) {
VCX.keyHeld = VCX.btnHeld = false;
vcxGate();
} });
(function () {
var vp = vcPeer;
vcPeer = function (id) {
var P = vp.apply(this, arguments), ot = P.pc.ontrack;
P.pc.ontrack = function (e) {
ot.apply(this, arguments);
try {
var st = e.streams && e.streams[0], c = vcCtx();
if (!st || !c || P.sp || !c.createPanner)
return;
var src = c.createMediaStreamSource(st), g = c.createGain(), pn = c.createPanner();
pn.panningModel = "HRTF";
pn.distanceModel = "linear";
pn.rolloffFactor = 0;
pn.refDistance = 1;
pn.maxDistance = 10000;
g.gain.value = 0;
src.connect(g);
g.connect(pn);
pn.connect(c.destination);
P.sp = { src: src, g: g, pn: pn };
}
catch (er) {
P.sp = null;
}
};
return P;
};
var vd = vcDrop;
vcDrop = function (id) {
var P = VC.peers[id];
if (P && P.sp) {
try {
P.sp.src.disconnect();
P.sp.g.disconnect();
P.sp.pn.disconnect();
}
catch (e) { }
P.sp = null;
}
vcxSpeakerOff(id);
return vd.apply(this, arguments);
};
})();
function vcxGainFor(id, d) {
if (VC.mutedBy[id])
return 0;
var f = d <= 3 ? 1 : Math.max(0, 1 - (d - 3) / 17);
f = f * f * (3 - 2 * f);
var pv = VCX.pvol[id];
pv = (pv === undefined || pv === null) ? 1 : pv;
return f * VCX.vol * pv;
}
var VCX_V = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
function vcxSet(param, v, c) { if (!param)
return; try {
param.setTargetAtTime(v, c.currentTime, 0.08);
}
catch (e) {
param.value = v;
} }
function vcxFrame() {
if (!VC.on)
return;
var c = VC.actx, ok = !!(c && c.state === "running");
var cam = (typeof VRM !== "undefined" && VRM.open && VRM.cam) ? VRM.cam : camera;
if (ok) {
var Ls = c.listener, pos = cam.getWorldPosition(VCX_V[0]), fw = cam.getWorldDirection(VCX_V[1]), up = VCX_V[2].set(0, 1, 0).applyQuaternion(cam.getWorldQuaternion(new THREE.Quaternion()));
try {
if (Ls.positionX) {
Ls.positionX.value = pos.x;
Ls.positionY.value = pos.y;
Ls.positionZ.value = pos.z;
Ls.forwardX.value = fw.x;
Ls.forwardY.value = fw.y;
Ls.forwardZ.value = fw.z;
Ls.upX.value = up.x;
Ls.upY.value = up.y;
Ls.upZ.value = up.z;
}
else {
Ls.setPosition(pos.x, pos.y, pos.z);
Ls.setOrientation(fw.x, fw.y, fw.z, up.x, up.y, up.z);
}
}
catch (e) { }
}
Object.keys(VC.peers).forEach(function (id) {
var P = VC.peers[id], g = togFigure(id);
if (!P.audio)
return;
var d = g ? Math.hypot(g.position.x - camera.position.x, g.position.z - camera.position.z) : 99;
if (P.sp && ok && g) {
P.audio.muted = true;
var at = g.getWorldPosition(VCX_V[0]);
at.y += 1.6;
try {
if (P.sp.pn.positionX) {
P.sp.pn.positionX.value = at.x;
P.sp.pn.positionY.value = at.y;
P.sp.pn.positionZ.value = at.z;
}
else
P.sp.pn.setPosition(at.x, at.y, at.z);
}
catch (e) { }
vcxSet(P.sp.g.gain, vcxGainFor(id, d), c);
}
else {
if (P.sp)
vcxSet(P.sp.g.gain, 0, c || { currentTime: 0 });
P.audio.muted = false;
P.audio.volume = Math.max(0, Math.min(1, vcxGainFor(id, d)));
}
});
vcxSpeakers();
}
function vcxSpeakerTex() { return __ZC(309, 7, this, arguments, new.target); }
function vcxSpeakerOff(id) { var s = VCX.spk[id]; if (!s)
return; if (s.sp.parent)
s.sp.parent.remove(s.sp); s.sp.material.dispose(); delete VCX.spk[id]; }
function vcxSpeakers() { return __ZC(309, 8, this, arguments, new.target); }
(function () {
if (typeof presenceTick !== "function")
return;
var pt = presenceTick;
presenceTick = function () { var r = pt.apply(this, arguments); try {
vcxFrame();
}
catch (e) { } return r; };
})();
setInterval(function () { try {
togxVrPoll();
}
catch (e) { } }, 80);
function vcxTalkers() {
return Object.keys(VC.peers).filter(function (id) { return VC.peers[id].state === "on" && vcLevel(id) > 0.06; }).map(togxName);
}
(function () {
var vpl = vcPill;
vcPill = function () {
vpl.apply(this, arguments);
var el = document.getElementById("vc-pill");
if (!el || !VC.on)
return;
if (!el.querySelector("[data-vcx]")) {
var s = document.createElement("span");
s.setAttribute("data-vcx", "1");
s.style.cssText = "display:flex;gap:6px;align-items:center";
el.insertBefore(s, el.firstChild);
if (!el._vcx) {
el._vcx = 1;
el.style.flexWrap = "wrap";
el.style.maxWidth = "calc(100vw - 24px)";
var down = function (e) { var t = e.target.closest && e.target.closest("[data-vcptt]"); if (!t)
return; e.preventDefault(); VCX.btnHeld = true; vcxGate(); vcxPaintBar(); };
var up = function () { if (VCX.btnHeld) {
VCX.btnHeld = false;
vcxGate();
vcxPaintBar();
} };
el.addEventListener("pointerdown", down);
addEventListener("pointerup", up);
addEventListener("pointercancel", up);
el.addEventListener("touchstart", function (e) { if (e.target.closest && e.target.closest("[data-vcptt]"))
e.preventDefault(); }, { passive: false });
}
}
vcxPaintBar();
};
})();
function vcxPaintBar() { return __ZC(309, 9, this, arguments, new.target); }
setInterval(function () {
if (!VC.on)
return;
var lv = (typeof vcLevel === "function") ? vcLevel("me") : 0;
VCX.meter += (lv - VCX.meter) * 0.4;
vcxPaintBar();
}, 120);
(function () {
var th = togHtml;
togHtml = function () {
var h = th.apply(this, arguments);
if (!(typeof signedIn === "function" && signedIn()))
return h;
var more = '<div style="margin:-4px 0 10px"><button class="btn" data-tgx="emotes">😊 More emotes, and hugs, high fives and dances with someone near</button></div>';
var i = h.indexOf('<div style="padding:8px 10px;border:1px solid rgba(255,255,255,.08)');
if (i >= 0)
h = h.slice(0, i) + more + h.slice(i);
else
h = more + h;
if (VC.on) {
var vs = '<div style="padding:6px 10px 8px;margin:-6px 0 10px;border:1px solid rgba(255,255,255,.06);border-top:0;border-radius:0 0 6px 6px;line-height:1.7">' +
'<label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-tgx="ptt"' + (VCX.ptt ? ' checked' : '') + '> Push to talk <span style="color:var(--dim);font-size:12px">(hold Y, the Hold to talk button, or the right grip in a headset)</span></label>' +
'<label style="display:flex;align-items:center;gap:8px">Everyone\'s volume <input type="range" min="0" max="150" step="5" value="' + Math.round(VCX.vol * 100) + '" data-tgv="all" style="flex:1;min-width:0"></label>' +
'<div style="color:var(--dim);font-size:12px">Voices come from where people stand and fade out by 20 m.</div></div>';
var j = h.indexOf('</div>', h.indexOf('🎙️ <b>Voice is on</b>'));
if (j >= 0)
h = h.slice(0, j + 6) + vs + h.slice(j + 6);
}
return h;
};
var tp = togPaint;
togPaint = function () {
if (VCX.drag)
return;
var r = tp.apply(this, arguments);
var el = document.getElementById("tog-box");
if (!el || !TOG.open)
return r;
try {
var near = (typeof presenceList === "function") ? presenceList().slice(0, 20) : [];
var rows = el.querySelectorAll('[data-tg="wave"]');
Array.prototype.forEach.call(rows, function (w, i) {
var p = near[i];
if (!p)
return;
var row = w.parentNode;
if (row.querySelector("[data-tgx]"))
return;
var P = VC.peers[p.id], x = document.createElement("span");
x.style.cssText = "display:flex;gap:6px;align-items:center;flex-wrap:wrap";
var pv = VCX.pvol[p.id];
pv = (pv === undefined || pv === null) ? 1 : pv;
x.innerHTML = (P ? '<input type="range" min="0" max="150" step="5" value="' + Math.round(pv * 100) + '" data-tgv="' + p.id + '" title="' + esc(p.name) + '\'s volume" aria-label="' + esc(p.name) + '\'s volume" style="width:80px">' : '') +
(p.dist < 4 ? '<button class="btn" data-tgx="pairs" data-id="' + p.id + '" style="padding:2px 8px" title="Hug, high five, handshake...">🤗</button>' : '') +
'<button class="btn" data-tgx="block" data-id="' + p.id + '" data-n="' + esc(p.name) + '" style="padding:2px 8px">Block</button>';
row.appendChild(x);
});
if (!el._tgx) {
el._tgx = 1;
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-tgx]") : null;
if (!t)
return;
var a = t.getAttribute("data-tgx"), id = t.getAttribute("data-id");
if (a === "emotes" || a === "pairs") {
TOG.open = false;
tp();
togxOpen(true);
}
else if (a === "ptt") {
VCX.ptt = !!t.checked;
vcxSave();
vcxGate();
vcPill();
}
else if (a === "block") {
var n = t.getAttribute("data-n");
if (!confirm("Block " + n + "? You will not see their chat, emotes or voice, and they will not see yours. You can unblock them from your phone (Friends)."))
return;
VC.local[id] = 1;
VC.mutedBy[id] = true;
if (VC.peers[id]) {
vcSend(id, { t: "bye" });
vcDrop(id);
}
cityRpc("block_set", { p_user: id, p_on: true }).then(function (o) { setStatus(o && o.ok === false && o.say ? esc(o.say) : "🚫 <b>" + esc(n) + "</b> is blocked."); }).catch(function () { setStatus("🚫 Blocked on this device; the city did not answer, try again from your phone."); });
togPaint();
}
});
el.addEventListener("input", function (e) {
var t = e.target;
if (!t || !t.getAttribute)
return;
var k = t.getAttribute("data-tgv");
if (!k)
return;
var v = Math.max(0, Math.min(1.5, (+t.value) / 100));
if (k === "all")
VCX.vol = v;
else
VCX.pvol[k] = v;
vcxSave();
});
var hold = function (e) { if (e.target && e.target.getAttribute && e.target.getAttribute("data-tgv"))
VCX.drag = true; };
var free = function () { if (VCX.drag) {
VCX.drag = false;
} };
el.addEventListener("pointerdown", hold);
el.addEventListener("touchstart", hold, { passive: true });
addEventListener("pointerup", free);
addEventListener("pointercancel", free);
addEventListener("touchend", free);
}
}
catch (e) { }
return r;
};
})();
