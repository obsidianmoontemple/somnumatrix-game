/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(295, function () {
"use strict";
return [
function (t, L, Z) {
var c = PP._c || (PP._c = new THREE.Color());
PP.tiles.forEach(function (T) {
if (T.zone !== Z && !(T.zone === "out" && Z === "roof"))
return;
T.acc = (T.acc || 0) + 1;
if (PP.lite && T.acc % 3)
return;
var pal = (T.key === "club" && PP.clubPal) || (T.key === "club" ? ppNightPal() : T.pal), bpm = ppBpmAt(T.zone, 0, 0);
var b = t * bpm / 60, seg = b / 32, i0 = Math.floor(seg) % pal.length, i1 = (i0 + 1) % pal.length, f = Math.max(0, Math.min(1, (seg % 1 - 0.75) * 4));
var a0 = ppMix(pal[i0], pal[i1], f), a1 = ppMix(pal[(i0 + 2) % pal.length], pal[(i1 + 2) % pal.length], f), n = T.n;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var w = 0.5 + 0.5 * Math.sin(t * 0.35 + i * 0.55 + j * 0.4), cc = ppMix(a0, a1, w), lum = 0.62 + 0.12 * Math.sin(t * 0.22 + (i - j) * 0.3);
c.setRGB(cc[0] * lum, cc[1] * lum, cc[2] * lum);
T.m.setColorAt(i * n + j, c);
}
if (T.m.instanceColor)
T.m.instanceColor.needsUpdate = true;
});
},
function (dt, t, out) {
var c = PP._c2 || (PP._c2 = new THREE.Color());
PP.beams.forEach(function (B, i) {
if (B.club ? PP.zone !== "club" : !out)
return;
B.m.rotation.z = Math.sin(t * 0.21 + B.ph) * 0.42;
B.m.rotation.x = 0.4 + Math.sin(t * 0.17 + B.ph) * 0.2;
var cone = B.m.userData.cone;
if (cone) {
c.setHSL((0.72 + 0.1 * Math.sin(t * 0.05 + B.ph)) % 1, 0.7, 0.7);
cone.material.color.copy(c);
}
});
PP.chaseAt = (PP.chaseAt || 0) - dt;
if (PP.chaseAt <= 0) {
PP.chaseAt = PP.lite ? 0.25 : 0.1;
PP.chase.forEach(function (C) {
if (!C.m.parent || !ppShown(C.m))
return;
for (var i = 0; i < C.n; i++) {
c.setHSL(((i * 0.07 + t * 0.02 + C.off * 0.1) % 1 + 1) % 1, 0.75, 0.6);
C.m.setColorAt(i, c);
}
if (C.m.instanceColor)
C.m.instanceColor.needsUpdate = true;
});
}
PP.glows.forEach(function (G) {
var m = G.m.material, ph = G.ph || 0;
if (G.amp)
m.opacity = G.base + G.amp * Math.sin(t * G.sp * 2 + ph);
if (G.cycle) {
c.setHSL(((G.hue + t * G.sp) % 1 + 1) % 1, 0.85, 0.65);
m.color.copy(c);
}
});
PP.flames.forEach(function (F) { var s = F.small ? 0.12 : 0.18; F.m.scale.set(1 + Math.sin(t * 2.1 + F.ph) * s * 0.5, 1 + Math.sin(t * 2.9 + F.ph * 1.3) * s, 1 + Math.cos(t * 2.3 + F.ph) * s * 0.5); });
PP.spin.forEach(function (S) {
if (S.ball) {
S.ball.rotation.y += dt * 0.25;
return;
}
if (S.aurora && out && !PP.lite) {
var a = S.aurora, P = a.geometry.attributes.position, B = a.userData.base;
S.acc = (S.acc || 0) + 1;
if (S.acc % 3)
return;
for (var k = 0; k < P.count; k++) {
P.setZ(k, B[k * 3 + 2] + Math.sin(t * 0.12 + B[k * 3] * 0.004 + S.ph) * 90);
}
P.needsUpdate = true;
}
});
var LN = PP.lanterns;
if (LN && out) {
var m = PP._m || (PP._m = new THREE.Matrix4());
LN.s.forEach(function (s, i) {
s.y += s.v * dt;
if (s.y > 440) {
s.y = 0;
s.x = 150 + Math.random() * 80;
s.z = -210 + Math.random() * 80;
}
m.makeTranslation(s.x + Math.sin(t * 0.1 + s.ph) * s.y * 0.08, s.y + 2, s.z + s.y * 0.12);
LN.m.setMatrixAt(i, m);
});
LN.m.instanceMatrix.needsUpdate = true;
}
var W = PP.wheel;
if (W && out) {
W.a += dt * 0.05;
W.g.rotation.x = W.a;
W.gond.forEach(function (g, i) { var a = W.a + i / W.gond.length * Math.PI * 2; g.position.set(W.W.x, W.W.y + Math.cos(a) * W.W.r, W.W.z + Math.sin(a) * W.W.r); });
}
var C = PP.carousel;
if (C && out) {
C.a += dt * 0.32;
C.g.rotation.y = C.a;
C.horses.forEach(function (h) { h.g.position.y = 1.4 + Math.sin(t * 1.5 + h.ph) * 0.28; });
}
},
function (dt, t, L, Z) {
PP.figAt = (PP.figAt || 0) - dt;
var far = PP.lite ? 38 : 70, cull = PP.figAt <= 0;
if (cull)
PP.figAt = 0.5;
var S = Math.sin, now = Date.now() / 1000;
PP.dancers.forEach(function (c, i) {
if (cull)
c.near = c.zone === Z && Math.hypot(c.lx - L.x, c.lz - L.z) < far;
c.g.visible = !!c.near;
if (!c.near)
return;
var bt = now * c.bpm / 60 * Math.PI, s = S(bt + c.ph * Math.PI), Lm = c.g.userData.limbs, b = c.g.children[0];
var real = c.g.userData.rbReal;
c.g.userData.dance = c.sway ? "gentle" : "club";
c.g.userData.danceTempo = Math.max(0.85, Math.min(1.2, (c.bpm || 120) / 120));
c.g.position.set(c.lx + S(t * 0.3 + i) * 0.25, c.y + 0.09 + (real ? 0 : Math.abs(s) * (c.sway ? 0.03 : 0.08)), c.lz + S(t * 0.27 + i * 2) * 0.25);
c.g.rotation.y = c.face + S(real ? t * 0.15 + i : bt / 4 + i) * 0.5;
if (Lm) {
var up = (i % 3 === 0 && !c.sway) ? 1 : 0;
Lm.la.rotation.z = -(0.5 + s * 0.4 + up * 1.6);
Lm.ra.rotation.z = 0.5 - s * 0.4 + up * 1.6;
Lm.ll.rotation.x = s * 0.3;
Lm.rl.rotation.x = -s * 0.3;
}
if (b)
b.rotation.z = real ? 0 : s * 0.07;
});
PP.players.forEach(function (m) {
if (cull) {
m.near = m.zone === Z && Math.hypot(m.x - L.x, m.z - L.z) < far * 1.5;
m.g.visible = m.near;
}
if (!m.near)
return;
var bt = now * m.bpm / 60 * Math.PI, s = S(bt + m.ph), Lm = m.g.userData.limbs, b = m.g.children[0];
if (b) {
b.position.y = Math.abs(s) * 0.04;
b.rotation.z = s * 0.04;
}
if (!Lm)
return;
if (m.part === "drums") {
Lm.la.rotation.x = -1.0 + Math.abs(S(bt * 2)) * 0.5;
Lm.ra.rotation.x = -1.0 + Math.abs(S(bt * 2 + 1.6)) * 0.5;
}
else if (m.part === "keys" || m.part === "dj") {
Lm.la.rotation.x = -1.1 + s * 0.12;
Lm.ra.rotation.x = -1.1 - s * 0.12;
}
else if (m.part === "guitar") {
Lm.la.rotation.x = -0.9;
Lm.ra.rotation.x = -0.6 + Math.abs(S(bt * 2)) * 0.4;
}
else if (m.part === "strings") {
Lm.la.rotation.x = -1.2;
Lm.ra.rotation.x = -0.9 + S(bt) * 0.3;
}
else {
Lm.ra.rotation.x = -1.4;
Lm.la.rotation.x = -0.2 + s * 0.1;
}
});
PP.people.forEach(function (p) {
if (cull) {
p.near = p.zone === Z && Math.hypot(p.g.position.x - L.x, p.g.position.z - L.z) < far;
p.g.visible = p.near;
}
if (p.near && p.wander)
wWander(p.g, dt, function (x, z) { return ppGround(x, z, 0); }, { r: p.wander.r, sp: 0.9 });
});
},
function (dt, t, Z) {
PP.scrAt = (PP.scrAt || 0) - dt;
if (PP.scrAt > 0)
return;
PP.scrAt = PP.lite ? 0.5 : 0.25;
PP.screens.forEach(function (S) {
var zone = S.kind === "waves" && S.title === "JUBILEE" ? "out" : S.kind === "karaoke" || S.kind === "bowl" ? "echo" : S.kind === "gather" ? "hall" : S.kind === "cctv" ? "club" : "club";
if (zone !== Z && !(zone === "out" && Z === "roof"))
return;
var x = S.cv.getContext("2d"), W = S.cv.width, H = S.cv.height;
if (S.kind === "waves") {
for (var i = 0; i < 8; i++) {
var hue = ((S.hue + i * 0.04 + t * 0.01) % 1) * 360;
x.fillStyle = "hsl(" + hue.toFixed(0) + ",70%," + (28 + i * 3) + "%)";
x.fillRect(i * W / 8, 0, W / 8 + 1, H);
}
x.globalAlpha = 0.35;
for (var k = 0; k < 5; k++) {
x.fillStyle = "hsl(" + (((S.hue + 0.3 + k * 0.07) % 1) * 360).toFixed(0) + ",80%,60%)";
x.beginPath();
x.arc(W * (0.5 + 0.4 * Math.sin(t * 0.1 + k * 1.3)), H * (0.5 + 0.35 * Math.sin(t * 0.13 + k)), 26 + k * 6, 0, 7);
x.fill();
}
x.globalAlpha = 1;
x.fillStyle = "rgba(255,240,250,.85)";
x.font = "bold 30px sans-serif";
x.textAlign = "center";
x.fillText(S.title || "", W / 2, H / 2 + 10);
}
else if (S.kind === "cctv") {
x.fillStyle = "#0A0E14";
x.fillRect(0, 0, W, H);
x.font = "10px monospace";
x.textAlign = "left";
["DOOR", "MAIN FLOOR", "BAR W", "BAR E", "VIP", "ROOF", "STOCK", "LOBBY"].forEach(function (n, i) {
var cx = (i % 4) * 64, cy = Math.floor(i / 4) * 64;
x.fillStyle = "#1A2A24";
x.fillRect(cx + 2, cy + 2, 60, 60);
x.fillStyle = "#5A8A6A";
for (var p = 0; p < 4; p++)
x.fillRect(cx + 10 + ((p * 17 + Math.floor(t * 0.3 + i)) % 40), cy + 30 + (p % 2) * 8, 4, 10);
x.fillStyle = "#9AE8B0";
x.fillText(n, cx + 5, cy + 13);
});
}
else if (S.kind === "karaoke") {
var R = S.room, K = PP.kar && PP.kar.room === R ? PP.kar : null;
x.fillStyle = "#0A0828";
x.fillRect(0, 0, W, H);
x.textAlign = "center";
if (!K) {
x.fillStyle = "#FFB8E8";
x.font = "bold 20px sans-serif";
x.fillText("ROOM " + (R.i + 1), W / 2, 40);
x.fillStyle = "#BFD8FF";
x.font = "14px sans-serif";
x.fillText("Pick a song at the sofa", W / 2, 72);
}
else {
x.fillStyle = "#BFD8FF";
x.font = "12px sans-serif";
x.fillText(K.song.t, W / 2, 18);
for (var l = -1; l <= 1; l++) {
var ln = K.song.l[K.line + l];
if (!ln)
continue;
x.fillStyle = l === 0 ? "#FFE7B0" : "rgba(200,200,240,.6)";
x.font = (l === 0 ? "bold 15px" : "13px") + " sans-serif";
x.fillText(ln, W / 2, 68 + l * 28);
}
}
}
else if (S.kind === "bowl") {
x.fillStyle = "#0A0E20";
x.fillRect(0, 0, W, H);
x.textAlign = "left";
x.font = "bold 13px sans-serif";
for (var ln2 = 0; ln2 < 6; ln2++) {
var Bw = PP.bowl && PP.bowl.lane === ln2 ? PP.bowl : null;
x.fillStyle = Bw ? "#FFE7B0" : "#6A7AA8";
x.fillText("L" + (ln2 + 1) + (Bw ? " " + Bw.score : ""), 6 + ln2 * 42, 38);
}
}
else if (S.kind === "gather") {
var g = (PP.invite && PP.invite.gathering) || null;
x.fillStyle = "#1E140A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(8, 8, W - 16, H - 16);
x.textAlign = "center";
x.fillStyle = "#E8C977";
x.font = "bold 34px Georgia";
x.fillText("THE GOLDEN GATHERING", W / 2, 70);
x.fillStyle = "#F1E3BE";
x.font = "24px Georgia";
x.fillText(g && g.at ? (typeof giWhen === "function" ? giWhen(g.at) : String(g.at)) : "The Keeper will announce the day", W / 2, 130);
x.fillStyle = "#BFA062";
x.font = "18px Georgia";
x.fillText(g && g.note ? String(g.note).slice(0, 60) : "Twenty places at one table", W / 2, 180);
}
S.tex.needsUpdate = true;
});
},
function (L, Z) {
var best = null, bd = 1e9;
PP.music.forEach(function (m) { if (m.zone !== Z)
return; var d = Math.hypot(m.x - L.x, m.z - L.z); if (d < m.r && d < bd) {
bd = d;
best = m;
} });
if (!best) {
PP.musV = null;
}
else {
var V = PP.musV && PP.musV.k === best.k ? PP.musV : { k: best.k, C: { bpm: best.C.bpm, band: best.C.band }, pp: true, r: best.r };
if (PP.req && PP.req[best.k])
V.C.bpm = PP.req[best.k];
V.d = bd;
PP.musV = V;
}
PP.musAt = performance.now();
if (typeof sndMusicNear === "function")
sndMusicNear("party", !!PP.musV);
if (typeof shwMusic === "function")
try {
shwMusic(PP.musV);
}
catch (e) { }
},
function (L, Z, feet) {
var on = null;
for (var i = 0; i < PP.floors.length; i++) {
var F = PP.floors[i];
if (F.zone !== Z)
continue;
if (ppIn(F, L.x, L.z) && Math.abs(feet - (F.y || 0)) < 1.2) {
on = F;
break;
}
}
PP.onFloor = on;
if (PP.dance && !on) {
ppDanceSet(false);
return;
}
if (!PP.dance || typeof TOG === "undefined")
return;
var e = TOG.emo.me;
if (!e || e.kind !== "dance") {
if (typeof togEmoteOn === "function")
togEmoteOn("me", "dance");
}
else
e.len = e.t + 8;
if (Date.now() - PP.danceSent > 7000 && typeof togLive === "function" && togLive()) {
PP.danceSent = Date.now();
cityRpc("live_send", { p_kind: "emote", p_to: null, p_place: togPlace(), p_body: { e: "dance" } }).catch(function () { });
}
},
function (on) {
if (typeof TOG === "undefined") {
PP.dance = false;
return;
}
if (PP.dance === on)
return;
PP.dance = on;
if (on) {
PP.danceSent = Date.now();
if (typeof togEmote === "function")
togEmote("dance");
setStatus("💃 You are dancing. Walk off the floor, or press E, to stop.");
}
else {
var e = TOG.emo.me;
if (e && e.kind === "dance")
e.len = Math.min(e.len, e.t + 0.4);
}
},
function (kind) {
if (PP.ride)
return;
ppDanceSet(false);
PP.ride = { kind: kind, t: 0, len: kind === "wheel" ? Math.PI * 2 / 0.05 : 3 * Math.PI * 2 / 0.32, i: 0 };
if (kind === "wheel") {
var W = PP.wheel, best = 0, bv = -1e9;
W.gond.forEach(function (g, i) { if (-g.position.y > bv) {
bv = -g.position.y;
best = i;
} });
PP.ride.i = best;
}
else {
var C = PP.carousel, cb = 0, cd = 1e9, L = worldLocal(), v = new THREE.Vector3();
C.horses.forEach(function (h, i) { h.g.getWorldPosition(v); var d = Math.hypot(v.x - camera.position.x, v.z - camera.position.z); if (d < cd) {
cd = d;
cb = i;
} });
PP.ride.i = cb;
}
worldCard(null);
worldPrompt("<b>press E</b> to get off", ppRideEnd);
setStatus(kind === "wheel" ? "<b>Up you go.</b> One slow turn of the wheel: the whole of Jubilee, the lagoon, the lanterns. Back, or E, to get off early." : "<b>On a painted horse.</b> Round and round to the organ. Back, or E, to get off.");
if (typeof playTone === "function")
playTone(600, 0.3);
},
function (dt) {
var R = PP.ride;
R.t += dt;
var v = PP._v || (PP._v = new THREE.Vector3());
if (R.kind === "wheel") {
var g = PP.wheel.gond[R.i];
if (!g) {
ppRideEnd();
return;
}
g.getWorldPosition(v);
camera.position.set(v.x, v.y - 1.2, v.z);
}
else {
var h = PP.carousel.horses[R.i];
if (!h) {
ppRideEnd();
return;
}
h.g.getWorldPosition(v);
camera.position.set(v.x, v.y + 1.3, v.z);
}
if (typeof flyY !== "undefined")
flyY = 0;
worldPrompt("<b>press E</b> to get off", ppRideEnd);
if (R.t >= R.len)
ppRideEnd();
},
function () {
var R = PP.ride;
if (!R)
return;
PP.ride = null;
if (R.kind === "wheel")
ppPut(PP.wheel.W.x + 5, PP.wheel.W.z, -Math.PI / 2);
else
ppPut(PP.carousel.C.x + PP.carousel.C.r + 2.2, PP.carousel.C.z, Math.PI / 2);
setStatus(R.kind === "wheel" ? "<b>Back on the ground.</b> That was the best view on Jubilee." : "<b>Off the carousel.</b> A little dizzy, in a good way.");
}
];
});
