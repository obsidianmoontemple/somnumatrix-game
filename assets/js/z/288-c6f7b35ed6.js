/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(288, function () {
"use strict";
return [
function (spec) {
var v = VOICE[spec.archetype], S = v && SND_VOICE[v];
if (!S)
return null;
var ctx = audio.ctx, src = ctx.createBufferSource();
src.buffer = audio.buf;
src.loop = true;
var f = ctx.createBiquadFilter(), g = ctx.createGain(), p = ctx.createPanner();
p.panningModel = "equalpower";
p.distanceModel = "inverse";
p.refDistance = 8;
p.maxDistance = 260;
p.rolloffFactor = 1.4;
if (p.positionX) {
p.positionX.value = spec.x;
p.positionY.value = 2;
p.positionZ.value = spec.z;
}
else
p.setPosition(spec.x, 2, spec.z);
f.type = S.t;
f.frequency.value = S.f;
f.Q.value = S.q;
g.gain.value = 0.0001;
g.gain.setTargetAtTime(S.g, ctx.currentTime, 0.4);
src.connect(f);
f.connect(g);
g.connect(p);
p.connect(audio.amb || audio.master);
src.start(0, Math.random() * 1.9);
return { src: src, pan: p, gain: g };
},
function () {
if (!audio.ctx)
return;
var L = audio.ctx.listener, P = camera.position;
if (L.positionX) {
L.positionX.value = P.x;
L.positionY.value = P.y;
L.positionZ.value = P.z;
camera.getWorldDirection(SND_PV);
L.forwardX.value = SND_PV.x;
L.forwardY.value = SND_PV.y;
L.forwardZ.value = SND_PV.z;
L.upX.value = 0;
L.upY.value = 1;
L.upZ.value = 0;
}
else if (L.setPosition)
L.setPosition(P.x, P.y, P.z);
var now = performance.now();
var mus = false;
for (var k in SND.music)
if (now - SND.music[k] < 1500)
mus = true;
if (typeof SHW !== "undefined" && SHW.mg && SHW.mg.gain.value > 0.05)
mus = true;
if (typeof BAC !== "undefined" && BAC.snd && BAC.snd.g.gain.value > 0.05)
mus = true;
if (typeof FMUS !== "undefined" && FMUS.act)
mus = true;
var want = mus ? 0.35 : 1;
if (audio.amb && Math.abs(SND.ambT - want) > 0.01) {
SND.ambT = want;
audio.amb.gain.setTargetAtTime(want, audio.ctx.currentTime, 0.6);
}
if (now - SND_AT < 500)
return;
SND_AT = now;
var near = [], O = store.objects;
for (var i = 0; i < O.length; i++) {
var s = O[i];
if (!VOICE[s.archetype])
continue;
var dx = s.x - P.x, dz = s.z - P.z, d = dx * dx + dz * dz;
if (d < 220 * 220)
near.push([d, s]);
}
near.sort(function (a, b) { return a[0] - b[0]; });
var keep = {}, kinds = {}, cap = sndCap(), n = 0;
near.forEach(function (e) { var v = VOICE[e[1].archetype]; if (n < cap && !kinds[v]) {
kinds[v] = 1;
keep[e[1].id] = e[1];
n++;
} });
near.forEach(function (e) { if (n < cap && !keep[e[1].id]) {
keep[e[1].id] = e[1];
n++;
} });
Object.keys(audio.nodes).forEach(function (id) { if (!keep[id])
sndDrop(id); });
Object.keys(keep).forEach(function (id) { if (!audio.nodes[id]) {
var v = voiceFor(keep[id]);
if (v)
audio.nodes[id] = v;
} });
}
];
});
