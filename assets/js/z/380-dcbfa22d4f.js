/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(380, function () {
"use strict";
return [
function () {
if (WSN.ready)
return true;
var o = typeof sndOut === "function" ? sndOut() : null;
if (!o)
return false;
var c = o.ctx;
WSN.ctx = c;
WSN.lite = wsnLite();
try {
var n = Math.round(c.sampleRate * (WSN.lite ? 1.3 : 2.4)), ch = WSN.lite ? 1 : 2, ir = c.createBuffer(ch, n, c.sampleRate);
for (var k = 0; k < ch; k++) {
var d = ir.getChannelData(k), lp = 0;
for (var i = 0; i < n; i++) {
lp += ((Math.random() * 2 - 1) - lp) * 0.35;
d[i] = lp * Math.pow(1 - i / n, 2.2) * 1.6;
}
}
WSN.conv = c.createConvolver();
WSN.conv.buffer = ir;
var cg = c.createGain();
cg.gain.value = 0.55;
WSN.conv.connect(cg);
cg.connect(o.out);
}
catch (e) {
WSN.conv = null;
}
WSN.mLev = c.createGain();
WSN.mLev.gain.value = 0;
WSN.mLev.connect(o.out);
WSN.mWet = c.createGain();
WSN.mWet.gain.value = 0.4;
WSN.mLev.connect(WSN.mWet);
if (WSN.conv)
WSN.mWet.connect(WSN.conv);
WSN.tone = c.createBiquadFilter();
WSN.tone.type = "lowpass";
WSN.tone.frequency.value = 6000;
WSN.tone.Q.value = 0.5;
WSN.tone.connect(WSN.mLev);
WSN.mIn = c.createGain();
WSN.mIn.gain.value = 1;
WSN.mIn.connect(WSN.tone);
WSN.wIn = c.createGain();
WSN.wIn.gain.value = 0;
WSN.wIn.connect(WSN.mIn);
WSN.bIn = c.createGain();
WSN.bIn.gain.value = 0;
WSN.bIn.connect(WSN.mIn);
WSN.aLev = c.createGain();
WSN.aLev.gain.value = 0;
WSN.aLev.connect((typeof audio !== "undefined" && audio.amb) || o.out);
WSN.aWet = c.createGain();
WSN.aWet.gain.value = 0;
if (WSN.conv)
WSN.aWet.connect(WSN.conv);
WSN.fxLev = c.createGain();
WSN.fxLev.gain.value = 0.9;
WSN.fxLev.connect(o.out);
WSN.fxWet = c.createGain();
WSN.fxWet.gain.value = 0.25;
WSN.fxLev.connect(WSN.fxWet);
if (WSN.conv)
WSN.fxWet.connect(WSN.conv);
WSN.noise = (typeof audio !== "undefined" && audio.buf) || (function () { var b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++)
d[i] = Math.random() * 2 - 1; return b; })();
WSN.ready = true;
return true;
},
function (out, t, m, len, v) {
var f = wsnMidi(m), lp = wsnFilt("lowpass", Math.min(2400, f * 5), 0.6), g = wsnGain(), os = [wsnOsc("sawtooth", f, t)];
if (!WSN.lite) {
var o2 = wsnOsc("sawtooth", f, t);
o2.detune.value = 9;
os.push(o2);
os[0].detune.value = -7;
}
os.forEach(function (o) { o.connect(lp); });
lp.connect(g);
g.connect(out);
var e = wsnEnv(g, t, Math.min(0.9, len * 0.35), 0.022 * v, len * 0.6, 1.1);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), f1 = wsnFilt("bandpass", 620, 4), f2 = wsnFilt("bandpass", 1080, 5), g = wsnGain(), os = [o];
o.connect(f1);
o.connect(f2);
f1.connect(g);
f2.connect(g);
if (!WSN.lite) {
var o2 = wsnOsc("sawtooth", f * 1.004, t);
o2.connect(f1);
os.push(o2);
}
g.connect(out);
var e = wsnEnv(g, t, Math.min(1.1, len * 0.4), 0.05 * v, len * 0.55, 1.4);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), g = wsnGain(), os = [], pr = WSN.lite ? [[1, 0.6], [2, 0.3]] : [[1, 0.55], [2, 0.3], [3, 0.14], [4, 0.08]];
pr.forEach(function (p) { var o = wsnOsc("sine", f * p[0], t), pg = wsnGain(p[1]); o.connect(pg); pg.connect(g); os.push(o); });
g.connect(out);
var e = wsnEnv(g, t, 0.06, 0.05 * v, len * 0.9, 0.5);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("triangle", f, t), o2 = wsnOsc("sine", f * 2, t), g = wsnGain(), g2 = wsnGain(), lp = wsnFilt("lowpass", Math.min(6000, f * 6), 0.5);
o.connect(lp);
lp.connect(g);
o2.connect(g2);
g2.connect(out);
g.connect(out);
wsnPerc(g2, t, 0.02 * v, 0.18);
var e = wsnPerc(g, t, 0.07 * v, 1.8);
wsnStart(t, [o, o2]);
wsnStop(e, [o, o2]);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), bp = wsnFilt("lowpass", Math.min(3200, f * 4), 1.5), g = wsnGain();
o.connect(bp);
bp.connect(g);
g.connect(out);
bp.frequency.setValueAtTime(Math.min(4200, f * 7), t);
bp.frequency.exponentialRampToValueAtTime(Math.max(200, f * 1.5), t + 0.6);
var e = wsnPerc(g, t, 0.05 * v, 0.9);
wsnStart(t, [o]);
wsnStop(e, [o]);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), c = wsnOsc("sine", f, t), mo = wsnOsc("sine", f * 3.5, t), mg = wsnGain(f * 1.6), g = wsnGain();
mo.connect(mg);
mg.connect(c.frequency);
mg.gain.setValueAtTime(f * 1.6, t);
mg.gain.exponentialRampToValueAtTime(f * 0.05, t + 1.5);
c.connect(g);
g.connect(out);
var e = wsnPerc(g, t, 0.04 * v, 2.6);
wsnStart(t, [c, mo]);
wsnStop(e, [c, mo]);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), c = wsnOsc("sine", f, t), mo = wsnOsc("sine", f, t), mg = wsnGain(f * 0.9), g = wsnGain();
mo.connect(mg);
mg.connect(c.frequency);
mg.gain.setValueAtTime(f * 0.9, t);
mg.gain.exponentialRampToValueAtTime(f * 0.02, t + 0.5);
c.connect(g);
g.connect(out);
var e = wsnPerc(g, t, 0.045 * v, 1.4);
wsnStart(t, [c, mo]);
wsnStop(e, [c, mo]);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("square", f, t), lp = wsnFilt("lowpass", f * 6, 3), g = wsnGain();
lp.frequency.setValueAtTime(Math.min(7000, f * 8), t);
lp.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.5), t + 0.3);
o.connect(lp);
lp.connect(g);
g.connect(out);
var e = wsnPerc(g, t, 0.02 * v, 0.45);
wsnStart(t, [o]);
wsnStop(e, [o]);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sine", f, t), o2 = wsnOsc("triangle", f * 2, t), g = wsnGain(), g2 = wsnGain(0.12), os = [o, o2];
if (!WSN.lite && len > 0.35) {
var lfo = wsnOsc("sine", 5.2, t), lg = wsnGain(f * 0.006);
lfo.connect(lg);
lg.connect(o.frequency);
os.push(lfo);
}
o.connect(g);
o2.connect(g2);
g2.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.07, 0.05 * v, len * 0.75, 0.25);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), bp = wsnFilt("bandpass", Math.min(2600, f * 3), 0.9), g = wsnGain(), os = [o];
if (!WSN.lite && len > 0.3) {
var lfo = wsnOsc("sine", 5.6, t), lg = wsnGain(f * 0.007);
lfo.connect(lg);
lg.connect(o.frequency);
os.push(lfo);
}
o.connect(bp);
bp.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.05, 0.05 * v, len * 0.7, 0.18);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("square", f, t), o2 = wsnOsc("square", f * 1.005, t), lp = wsnFilt("lowpass", Math.min(2400, f * 3.5), 0.8), g = wsnGain(), os = WSN.lite ? [o] : [o, o2];
os.forEach(function (x) { x.connect(lp); });
lp.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.05, 0.022 * v, len * 0.75, 0.15);
wsnStart(t, os);
wsnStop(e, os);
},
function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), lp = wsnFilt("lowpass", f * 2, 1.2), g = wsnGain();
lp.frequency.setValueAtTime(f * 1.5, t);
lp.frequency.linearRampToValueAtTime(Math.min(3200, f * 6), t + 0.08);
lp.frequency.setTargetAtTime(f * 2.5, t + 0.1, 0.3);
o.connect(lp);
lp.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.05, 0.045 * v, len * 0.75, 0.2);
wsnStart(t, [o]);
wsnStop(e, [o]);
},
function (out, t, m, len, v, kind) {
var f = wsnMidi(m), o = wsnOsc(kind === "pluck" ? "triangle" : "sine", f, t), o2 = wsnOsc("sine", f * 2, t), g = wsnGain(), g2 = wsnGain(0.35);
o.connect(g);
o2.connect(g2);
g2.connect(g);
g.connect(out);
var e = kind === "pluck" || kind === "walk" ? wsnPerc(g, t, 0.1 * v, Math.min(0.9, len * 1.1)) : wsnEnv(g, t, 0.04, 0.08 * v, len * 0.7, 0.4);
wsnStart(t, [o, o2]);
wsnStop(e, [o, o2]);
},
function (out, t, k, v) {
var c = WSN.ctx;
v = v || 1;
if (k === "kick" || k === "taiko" || k === "tom") {
var lo = k === "taiko" ? 52 : k === "tom" ? 110 : 46, hi = k === "taiko" ? 95 : k === "tom" ? 180 : 125, o = wsnOsc("sine", hi, t), g = wsnGain();
o.frequency.exponentialRampToValueAtTime(lo, t + (k === "taiko" ? 0.25 : 0.12));
o.connect(g);
g.connect(out);
var e = wsnPerc(g, t, (k === "taiko" ? 0.32 : 0.26) * v, k === "taiko" ? 0.7 : 0.3);
o.start(t);
o.stop(e);
if (k === "taiko") {
var n = wsnNoiseSrc(t, 0.2), lp = wsnFilt("lowpass", 420, 0.7), ng = wsnGain();
n.connect(lp);
lp.connect(ng);
ng.connect(out);
wsnPerc(ng, t, 0.08 * v, 0.15);
}
return;
}
if (k === "snare") {
var n2 = wsnNoiseSrc(t, 0.25), bp = wsnFilt("bandpass", 1900, 0.7), sg = wsnGain(), o2 = wsnOsc("triangle", 190, t), og = wsnGain();
n2.connect(bp);
bp.connect(sg);
sg.connect(out);
wsnPerc(sg, t, 0.09 * v, 0.16);
o2.connect(og);
og.connect(out);
wsnPerc(og, t, 0.06 * v, 0.08);
o2.start(t);
o2.stop(t + 0.2);
return;
}
if (k === "frame") {
var o3 = wsnOsc("sine", 165, t), g3 = wsnGain();
o3.frequency.exponentialRampToValueAtTime(105, t + 0.15);
o3.connect(g3);
g3.connect(out);
wsnPerc(g3, t, 0.16 * v, 0.25);
o3.start(t);
o3.stop(t + 0.35);
var n3 = wsnNoiseSrc(t, 0.08), b3 = wsnFilt("bandpass", 900, 1.2), h3 = wsnGain();
n3.connect(b3);
b3.connect(h3);
h3.connect(out);
wsnPerc(h3, t, 0.03 * v, 0.05);
return;
}
if (WSN.lite && (k === "hat" || k === "shaker"))
return;
var f = k === "hat" ? 6200 : k === "shaker" ? 4400 : 3000, d = k === "hat" ? 0.035 : k === "shaker" ? 0.06 : 0.12, pk = k === "hat" ? 0.014 : k === "shaker" ? 0.012 : 0.011;
var n4 = wsnNoiseSrc(t, d + 0.05), b4 = wsnFilt("bandpass", f, 1.3), g4 = wsnGain();
n4.connect(b4);
b4.connect(g4);
g4.connect(out);
wsnPerc(g4, t, pk * v, d);
},
function (L, which) {
if (L.motifs[which])
return L.motifs[which];
var st = L.st, rnd = wsnRng(L.seed + which * 7919), steps = st.n * 2, out = [], d = 2 + Math.floor(rnd() * 3);
var lens = st.n === 4 ? [1, 1, 2, 2, 2, 3, 4] : [1, 2, 2, 3, 3, 6];
for (var b = 0; b < 2; b++) {
var pos = 0;
while (pos < steps) {
var len = lens[Math.floor(rnd() * lens.length)];
if (pos + len > steps)
len = steps - pos;
if (rnd() < 0.17 && pos > 0) {
pos += len;
continue;
}
var jump = [-2, -1, -1, 0, 1, 1, 2, 3, -3][Math.floor(rnd() * 9)];
d = wsnClamp(d + jump, 0, 9);
out.push({ b: b, s: pos, len: len, d: d });
pos += len;
}
}
L.motifs[which] = out;
return out;
},
function (L, t) {
var st = L.st, pulse = 60 / st.bpm, n = st.n, bar = L.bar, deg = st.p[bar % st.p.length], out = L.out, v = st.v || 0.6;
var cyc = bar % 56, pb = bar % 48, sec = pb < 8 ? 0 : pb >= 40 ? 3 : pb < 24 ? 1 : 2;
if (!st.fight && cyc >= 48)
return;
var lite = WSN.lite, fight = !!st.fight;
var chord = wsnChordDeg(st, deg);
if (st.pad && WSN_INST[st.pad]) {
var top = st.r + 26;
chord.slice(0, lite ? 2 : 4).forEach(function (cd) { var m = st.r + 12 + wsnOff(st, cd); while (m > top)
m -= 12; WSN_INST[st.pad](out, t, m, n * pulse * 1.02, v); });
}
var root = st.r - 12 + (wsnOff(st, deg) % 12);
if (st.bass === "soft")
WSN_INST.bass(out, t, root, n * pulse * 0.9, v, "soft");
else if (st.bass === "pluck") {
var hits = fight ? [0, 1, 2, 3].map(function (i) { return i * n / 4; }) : (n === 3 ? [0] : [0, n / 2]);
hits.forEach(function (p, i) { WSN_INST.bass(out, t + p * pulse, root + (i % 2 && !fight ? 7 : 0), pulse * (fight ? 0.9 : 1.6), v, "pluck"); });
}
else if (st.bass === "drone") {
if (bar % 2 === 0)
WSN_INST.drone(out, t, st.r - 12, n * pulse * 2, v);
}
else if (st.bass === "walk") {
var nx = st.r - 12 + (wsnOff(st, st.p[(bar + 1) % st.p.length]) % 12), wk = [root, root + wsnOff(st, deg + 2) - wsnOff(st, deg), root + 7, nx - 1];
for (var w = 0; w < n; w++)
WSN_INST.bass(out, t + w * pulse + (w % 2 ? (st.swing || 0) * pulse * 0.5 : 0), wk[w % 4], pulse * 0.9, v * 0.8, "walk");
}
else if (st.bass === "organ")
WSN_INST.organ(out, t, root, n * pulse * 0.98, v * 0.8);
if (st.arp && WSN_INST[st.arp] && !(sec === 3 && !fight)) {
var sub = st.sub || 2, steps = n * sub, step = pulse / sub, tones = [];
chord.slice(0, 3).forEach(function (cd) { tones.push(st.r + 12 + wsnOff(st, cd)); });
chord.slice(0, 3).forEach(function (cd) { tones.push(st.r + 24 + wsnOff(st, cd)); });
var rnd = wsnRng(L.seed + bar * 31);
for (var i = 0; i < steps; i++) {
if (lite && sub === 4 && i % 2)
continue;
var sw = (st.swing && i % 2) ? st.swing * step : 0, at = t + i * step + sw, m = null;
if (st.ap === "up")
m = tones[i % tones.length];
else if (st.ap === "updown") {
var cy = i % (tones.length * 2 - 2);
m = tones[cy < tones.length ? cy : tones.length * 2 - 2 - cy];
}
else if (st.ap === "broken")
m = tones[[0, 2, 1, 3, 2, 4, 3, 5][i % 8]];
else if (st.ap === "alberti")
m = tones[[0, 2, 1, 2][i % 4]];
else if (st.ap === "sparse") {
if (rnd() < 0.32)
m = tones[Math.floor(rnd() * tones.length)];
}
else if (st.ap === "comp") {
if (i === 0 || i === 3 || (i === 5 && n === 4))
tones.slice(0, 3).forEach(function (cm) { WSN_INST[st.arp](out, at, cm, step * 2, v * 0.55); });
continue;
}
if (m != null)
WSN_INST[st.arp](out, at, m, step, v * (i % sub ? 0.75 : 1));
}
}
if (st.lead && WSN_INST[st.lead] && (fight || (sec === 1 || sec === 2))) {
var ph = bar % 8, which = Math.floor(bar / 8) % 3, mo = wsnMotif(L, which), half = ph % 2, shift = (ph === 4 || ph === 5) ? 2 : 0, e8 = pulse / 2, strong = n === 3 ? 2 : (n === 6 ? 6 : 4);
var mine = mo.filter(function (x) { return x.b === half; });
mine.forEach(function (x, j) {
var d = x.d + shift;
if (x.s % strong === 0)
d = wsnSnap(st, d, deg);
if (ph === 7 && j === mine.length - 1)
d = wsnSnap(st, 7, 0);
var midi = st.r + 12 * (st.oct || 1) + wsnOff(st, d);
while (midi > st.r + 36)
midi -= 12;
WSN_INST[st.lead](out, t + x.s * e8 + (Math.random() - 0.5) * 0.01, midi, x.len * e8 * 0.95, v * 0.9);
});
}
if (st.perc && WSN_PERC[st.perc] && (fight || sec > 0)) {
var pat = WSN_PERC[st.perc][n] || (n === 6 ? null : WSN_PERC[st.perc][4]);
if (pat)
for (var q = 0; q < pat.length; q++) {
var hit = pat[q];
if (hit)
wsnDrum(out, t + q * pulse * (n / pat.length) + (st.swing && q % 2 ? st.swing * pulse : 0), hit[0], hit[1] * v * (fight ? 1 : 0.8));
}
if (fight && !lite)
for (var e = 0; e < 8; e++)
if (e % 2)
wsnDrum(out, t + e * pulse / 2, "hat", 0.6);
}
},
function (L) {
if (!L)
return;
var c = WSN.ctx, now = c.currentTime, look = (typeof SND_LOOK !== "undefined" ? SND_LOOK : 1), bd = L.st.n * 60 / L.st.bpm, k = 0;
if (L.t < now + 0.02)
L.t = now + 0.08;
while (L.t < now + look && k < 2) {
try {
wsnBar(L, L.t);
}
catch (e) {
if (!WSN.warned) {
WSN.warned = true;
if (window.console)
console.warn("world-sound:", e);
}
}
L.t += bd;
L.bar++;
k++;
}
},
function (out, t, m, peak, dec) {
var f = wsnMidi(m), c = wsnOsc("sine", f, t), mo = wsnOsc("sine", f * 2.76, t), mg = wsnGain(f * 1.2), g = wsnGain();
mo.connect(mg);
mg.connect(c.frequency);
mg.gain.setValueAtTime(f * 1.2, t);
mg.gain.exponentialRampToValueAtTime(f * 0.05, t + dec * 0.6);
c.connect(g);
g.connect(out);
var e = wsnPerc(g, t, peak, dec);
c.start(t);
mo.start(t);
c.stop(e);
mo.stop(e);
},
function (B, t) {
if (wsnDay() < 0.3)
return 4;
var sp = Math.floor(Math.random() * 4), k = 2 + Math.floor(Math.random() * 4), base = 2400 + sp * 450 + Math.random() * 300;
for (var i = 0; i < k; i++) {
var at = t + i * (0.09 + sp * 0.03), f = base * (1 + ((i % 2) ? 0.18 : -0.05));
wsnBlip(B.out, at, "sine", f, f * (sp === 2 ? 0.7 : 1.25), 0.06 + sp * 0.015, WSN.lite ? 0.008 : 0.01);
}
return 1.4 + Math.random() * 4.5;
},
function (B, t) {
if (wsnDay() > 0.4 && Math.random() < 0.7)
return 12;
var o = wsnOsc("sine", 340, t), g = wsnGain(), l = wsnOsc("sine", 5, t), lg = wsnGain(7);
l.connect(lg);
lg.connect(o.frequency);
o.frequency.linearRampToValueAtTime(610, t + 0.9);
o.frequency.linearRampToValueAtTime(560, t + 2.2);
o.frequency.linearRampToValueAtTime(400, t + 3);
o.connect(g);
g.connect(B.wet);
wsnEnv(g, t, 0.5, 0.016, 1.8, 0.8);
o.start(t);
l.start(t);
o.stop(t + 3.6);
l.stop(t + 3.6);
return 30 + Math.random() * 50;
},
function (B, t) {
var k = 1 + Math.floor(Math.random() * 3);
for (var i = 0; i < k; i++) {
var at = t + i * 0.32, o = wsnOsc("sawtooth", 1700, at), bp = wsnFilt("bandpass", 1500, 4), g = wsnGain();
o.frequency.exponentialRampToValueAtTime(1050, at + 0.22);
o.connect(bp);
bp.connect(g);
g.connect(B.out);
wsnPerc(g, at, 0.012, 0.25);
o.start(at);
o.stop(at + 0.3);
}
return 5 + Math.random() * 10;
},
function (B, t) {
B.w.g.gain.setTargetAtTime(0.015 + Math.random() * 0.02, t, 1.2);
var k = WSN.lite ? 2 : 4;
for (var i = 0; i < k; i++) {
var at = t + Math.random() * 0.9, o = wsnOsc("sawtooth", 130 + Math.random() * 140, at), bp = wsnFilt("bandpass", 700 + Math.random() * 500, 3), g = wsnGain();
o.frequency.linearRampToValueAtTime(110 + Math.random() * 160, at + 0.18);
o.connect(bp);
bp.connect(g);
g.connect(B.out);
wsnEnv(g, at, 0.03, 0.004, 0.08, 0.1);
o.start(at);
o.stop(at + 0.35);
}
return 0.9 + Math.random() * 0.6;
},
function (B, t) {
if (!B.first) {
B.first = 1;
return 25 + Math.random() * 30;
}
var n = wsnNoiseSrc(t, 4.2), lp = wsnFilt("lowpass", 200, 0.7), g = wsnGain();
lp.frequency.setValueAtTime(220, t);
lp.frequency.exponentialRampToValueAtTime(55, t + 3.8);
n.connect(lp);
lp.connect(g);
g.connect(B.out);
wsnEnv(g, t, 0.5, 0.07, 0.4, 2.6);
return 45 + Math.random() * 75;
},
function (x, z) {
if (x == null || typeof camera === "undefined")
return { g: 1, p: 0 };
var P = camera.position, dx = x - P.x, dz = z - P.z, d = Math.sqrt(dx * dx + dz * dz);
if (d > 160)
return null;
var yw = typeof yaw !== "undefined" ? yaw : 0, rx = Math.cos(yw), rz = -Math.sin(yw), p = d > 0.5 ? wsnClamp((dx * rx + dz * rz) / d, -1, 1) * 0.7 : 0;
return { g: 1 / (1 + d / 11), p: p };
},
function (kind, o) {
try {
if (!WSN.ready || !WSN.set.all || WSN.keeper.off)
return;
o = o || {};
var c = WSN.ctx, now = c.currentTime, cap = WSN.lite ? 6 : 12, gap = o.gap || 0.06;
if (WSN.fx.n >= cap)
return;
if (WSN.fx.last[kind] && now - WSN.fx.last[kind] < gap)
return;
WSN.fx.last[kind] = now;
var W = wsnWhereGain(o.x, o.z);
if (!W)
return;
var v = (o.v || 1) * W.g;
if (v < 0.02)
return;
var out = wsnGain(1);
if (c.createStereoPanner) {
var sp = c.createStereoPanner();
sp.pan.value = W.p;
out.connect(sp);
sp.connect(WSN.fxLev);
}
else
out.connect(WSN.fxLev);
var t = now + 0.01, end = t + 0.6;
switch (kind) {
case "swing":
var f1 = wsnBurst(out, t, "bandpass", 700, 1.5, 0.2, 0.07 * v);
f1.frequency.exponentialRampToValueAtTime(2400, t + 0.18);
end = t + 0.3;
break;
case "clang":
[880, 1720, 2960, 4100].forEach(function (f, i) { wsnBlip(out, t, "sine", f * (0.98 + Math.random() * 0.04), f * 0.99, 0.45 - i * 0.08, 0.035 * v / (i + 1)); });
wsnBurst(out, t, "highpass", 3000, 0.7, 0.04, 0.05 * v);
end = t + 0.55;
break;
case "hit":
wsnBurst(out, t, "lowpass", 650, 0.8, 0.09, 0.16 * v);
wsnBlip(out, t, "sine", 110, 60, 0.12, 0.14 * v);
end = t + 0.2;
break;
case "block":
wsnBlip(out, t, "triangle", 520, 400, 0.12, 0.06 * v);
wsnBurst(out, t, "bandpass", 1800, 3, 0.05, 0.06 * v);
end = t + 0.2;
break;
case "gun":
wsnBurst(out, t, "lowpass", 2600, 0.7, 0.11, 0.2 * v);
wsnBlip(out, t, "sine", 95, 45, 0.14, 0.18 * v);
wsnBurst(WSN.fxWet, t + 0.02, "lowpass", 900, 0.7, 0.25, 0.03 * v);
end = t + 0.4;
break;
case "laser":
wsnBlip(out, t, "sawtooth", 1900, 240, 0.17, 0.035 * v);
wsnBlip(out, t, "sine", 1200, 300, 0.16, 0.04 * v);
end = t + 0.25;
break;
case "plasma":
wsnBlip(out, t, "sine", 520, 110, 0.3, 0.08 * v);
wsnBurst(out, t, "bandpass", 900, 2, 0.18, 0.04 * v);
end = t + 0.4;
break;
case "arrow":
wsnBlip(out, t, "triangle", 230, 200, 0.08, 0.06 * v);
var f2 = wsnBurst(out, t + 0.02, "bandpass", 1600, 2, 0.22, 0.025 * v);
f2.frequency.exponentialRampToValueAtTime(700, t + 0.24);
end = t + 0.32;
break;
case "throw":
var f3 = wsnBurst(out, t, "bandpass", 500, 1.2, 0.25, 0.05 * v);
f3.frequency.exponentialRampToValueAtTime(1300, t + 0.22);
end = t + 0.32;
break;
case "boom":
case "cannon":
var n = wsnNoiseSrc(t, 1.6), lp = wsnFilt("lowpass", kind === "cannon" ? 900 : 600, 0.7), g = wsnGain();
lp.frequency.setValueAtTime(kind === "cannon" ? 900 : 600, t);
lp.frequency.exponentialRampToValueAtTime(70, t + 1.3);
n.connect(lp);
lp.connect(g);
g.connect(out);
g.connect(WSN.fxWet);
wsnEnv(g, t, 0.015, 0.32 * v, 0.05, 0.9);
wsnBlip(out, t, "sine", 70, 32, 0.6, 0.3 * v);
end = t + 1.8;
break;
case "spell":
[0, 4, 7, 12, 16].forEach(function (s, i) { wsnBellAt(out, t + i * 0.045, 79 + s, 0.02 * v, 0.8); });
var f4 = wsnBurst(out, t, "bandpass", 400, 1.5, 0.4, 0.04 * v);
f4.frequency.exponentialRampToValueAtTime(2200, t + 0.4);
out.connect(WSN.fxWet);
end = t + 1.2;
break;
case "fire":
var f5 = wsnBurst(out, t, "lowpass", 300, 0.8, 0.5, 0.12 * v);
f5.frequency.exponentialRampToValueAtTime(1600, t + 0.25);
end = t + 0.6;
break;
case "frost":
[91, 95, 98].forEach(function (m, i) { wsnBellAt(out, t + i * 0.05, m, 0.014 * v, 0.9); });
wsnBurst(out, t, "highpass", 4000, 0.7, 0.2, 0.02 * v);
end = t + 1.1;
break;
case "zap":
for (var z = 0; z < 5; z++)
wsnBlip(out, t + z * 0.03, "square", 1400 + Math.random() * 1600, 500, 0.03, 0.015 * v);
end = t + 0.25;
break;
case "hurt":
var o1 = wsnOsc("sawtooth", 165, t), b1 = wsnFilt("bandpass", 620, 3), g1 = wsnGain();
o1.frequency.exponentialRampToValueAtTime(105, t + 0.22);
o1.connect(b1);
b1.connect(g1);
g1.connect(out);
wsnEnv(g1, t, 0.02, 0.07 * v, 0.08, 0.14);
o1.start(t);
o1.stop(t + 0.4);
wsnBurst(out, t, "lowpass", 600, 0.8, 0.08, 0.12 * v);
end = t + 0.45;
break;
case "cry":
var o2 = wsnOsc("sawtooth", (o.pitch || 1) * 240, t), b2 = wsnFilt("bandpass", (o.pitch || 1) * 780, 3), g2 = wsnGain(), l2 = wsnOsc("sine", 7, t), lg2 = wsnGain(14);
l2.connect(lg2);
lg2.connect(o2.frequency);
o2.frequency.exponentialRampToValueAtTime((o.pitch || 1) * 150, t + 0.4);
o2.connect(b2);
b2.connect(g2);
g2.connect(out);
wsnEnv(g2, t, 0.04, 0.05 * v, 0.15, 0.2);
o2.start(t);
l2.start(t);
o2.stop(t + 0.6);
l2.stop(t + 0.6);
end = t + 0.65;
break;
case "roar":
var o3 = wsnOsc("sawtooth", 85, t), b3 = wsnFilt("lowpass", 520, 1.5), g3 = wsnGain();
o3.frequency.linearRampToValueAtTime(62, t + 1.2);
o3.connect(b3);
b3.connect(g3);
g3.connect(out);
g3.connect(WSN.fxWet);
wsnEnv(g3, t, 0.15, 0.1 * v, 0.6, 0.5);
o3.start(t);
o3.stop(t + 1.6);
wsnBurst(out, t, "lowpass", 400, 0.7, 1.1, 0.05 * v);
end = t + 1.7;
break;
case "fall":
var o4 = wsnOsc("sawtooth", 210, t), b4 = wsnFilt("bandpass", 650, 2.5), g4 = wsnGain();
o4.frequency.exponentialRampToValueAtTime(80, t + 0.6);
o4.connect(b4);
b4.connect(g4);
g4.connect(out);
wsnEnv(g4, t, 0.03, 0.05 * v, 0.2, 0.3);
o4.start(t);
o4.stop(t + 0.8);
wsnBlip(out, t + 0.5, "sine", 90, 50, 0.2, 0.1 * v);
end = t + 0.85;
break;
case "door":
var o5 = wsnOsc("sawtooth", 115, t), b5 = wsnFilt("bandpass", 520, 5), g5 = wsnGain();
o5.frequency.linearRampToValueAtTime(170, t + 0.45);
o5.connect(b5);
b5.connect(g5);
g5.connect(out);
wsnEnv(g5, t, 0.08, 0.025 * v, 0.25, 0.15);
o5.start(t);
o5.stop(t + 0.6);
wsnBurst(out, t, "bandpass", 2200, 4, 0.025, 0.05 * v);
end = t + 0.7;
break;
case "doorshut":
wsnBurst(out, t, "lowpass", 380, 0.8, 0.18, 0.18 * v);
wsnBlip(out, t, "sine", 85, 55, 0.15, 0.12 * v);
wsnBurst(out, t + 0.05, "bandpass", 2400, 4, 0.02, 0.04 * v);
end = t + 0.3;
break;
case "step":
wsnBurst(out, t, "lowpass", o.f || 320, 0.8, 0.06, 0.05 * v);
end = t + 0.12;
break;
case "whoosh":
var f6 = wsnBurst(out, t, "bandpass", 300, 1, 0.9, 0.05 * v);
f6.frequency.exponentialRampToValueAtTime(1800, t + 0.5);
f6.frequency.exponentialRampToValueAtTime(400, t + 0.9);
out.connect(WSN.fxWet);
end = t + 1.1;
break;
default: return;
}
WSN.fx.n++;
setTimeout(function () { WSN.fx.n = Math.max(0, WSN.fx.n - 1); try {
out.disconnect();
}
catch (e) { } }, Math.max(200, (end - now) * 1000 + 300));
}
catch (e) {
if (!WSN.warned) {
WSN.warned = true;
if (window.console)
console.warn("world-sound fx:", e);
}
}
},
function () {
if (typeof camera === "undefined" || typeof walkMode === "undefined" || !walkMode) {
WSN.steps.lx = null;
return;
}
var P = camera.position, S = WSN.steps, now = performance.now();
if (S.lx == null) {
S.lx = P.x;
S.lz = P.z;
S.ly = P.y;
S.at = now;
return;
}
var dt = (now - S.at) / 1000;
if (dt < 0.05)
return;
var dx = P.x - S.lx, dz = P.z - S.lz, dy = Math.abs(P.y - S.ly), d = Math.sqrt(dx * dx + dz * dz), sp = d / dt;
S.lx = P.x;
S.lz = P.z;
S.ly = P.y;
S.at = now;
if (sp < 0.8 || sp > 9 || dy / dt > 1.2 || d > 3) {
return;
}
if (typeof driving !== "undefined" && driving)
return;
S.d += d;
if (S.d >= 1.6) {
S.d = 0;
var inside = typeof store !== "undefined" && store.inside;
wsnFx("step", { v: WSN.lite ? 0.45 : 0.55, f: inside ? 420 : 300 + Math.random() * 80, gap: 0.2 });
}
},
function () {
try {
if (typeof store === "undefined" || !store.inside)
return null;
var id = store.inside, s = null;
for (var i = 0; i < store.objects.length; i++)
if (store.objects[i].id === id) {
s = store.objects[i];
break;
}
if (!s)
return "in:quiet";
var txt = [s.archetype, s.label, s.name, s.named, s.sign].filter(Boolean).join(" ").toLowerCase();
for (var j = 0; j < WSN_INSIDE.length; j++)
if (WSN_INSIDE[j][0].test(txt))
return WSN_INSIDE[j][1];
}
catch (e) { }
return "in:quiet";
},
function () {
var now = performance.now();
try {
if (typeof SND !== "undefined")
for (var k in SND.music)
if (now - SND.music[k] < 1500)
return true;
}
catch (e) { }
try {
if (typeof SHW !== "undefined" && SHW.mg && SHW.mg.gain.value > 0.05)
return true;
}
catch (e) { }
try {
if (typeof BAC !== "undefined" && BAC.snd && BAC.snd.g.gain.value > 0.05)
return true;
}
catch (e) { }
try {
if (typeof FMUS !== "undefined" && FMUS.act)
return true;
}
catch (e) { }
try {
if (typeof SHN_AU !== "undefined" && SHN_AU.music && SHN_AU.music.gain.value > 0.02 && SHN_AU.ctx && SHN_AU.ctx.state === "running")
return true;
}
catch (e) { }
try {
if (typeof CINL !== "undefined" && CINL.vid && !CINL.vid.paused && !CINL.vid.muted)
return true;
}
catch (e) { }
try {
if (typeof SHKS !== "undefined" && SHKS.on)
return true;
}
catch (e) { }
return false;
},
function () {
if (!wsnGraph())
return;
var c = WSN.ctx, now = c.currentTime, K = WSN.keeper, key = wsnKey();
if (key !== WSN.here)
wsnGo(key, key === "samhain" ? null : wsnPlanFor(key), key);
if (WSN.swapAt && now >= WSN.swapAt) {
WSN.swapAt = 0;
wsnSwap();
}
var other = wsnOtherMusic(), off = !!K.off, duck = (other ? 0 : 1) * (wsnSpeaking() ? 0.3 : 1) * wsnHushHere();
var fightOn = !off && performance.now() - WSN.fightAt < 9000, P = WSN.plan;
if (typeof audio !== "undefined" && audio.master && audio.limiter) {
var mg = 0.45 * WSN.set.all;
if (Math.abs(audio.master.gain.value - mg) > 0.005)
audio.master.gain.setTargetAtTime(mg, now, 0.15);
}
WSN.mLev.gain.setTargetAtTime(off ? 0 : WSN.set.mus * duck * 1.7, now, 0.5);
WSN.aLev.gain.setTargetAtTime(off || (P && wsnListed(K.beds_off, WSN.here)) ? 0 : WSN.set.amb, now, 0.8);
WSN.aWet.gain.setTargetAtTime(off ? 0 : WSN.set.amb * 0.5, now, 0.8);
WSN.fxLev.gain.setTargetAtTime(WSN.set.fx * 0.9, now, 0.1);
if (!WSN.swapAt)
WSN.wIn.gain.setTargetAtTime(WSN.layer.w || WSN.track ? (fightOn ? 0.22 : 1) : 0, now, fightOn ? 0.4 : 1.2);
if (fightOn && !WSN.layer.b) {
var fk = (P && P.f) || "battle";
WSN.layer.b = wsnLayer(fk, (WSN.here || "") + "|fight", WSN.bIn);
}
if (WSN.layer.b) {
WSN.bIn.gain.setTargetAtTime(fightOn ? 1 : 0, now, fightOn ? 0.25 : 1.6);
if (fightOn)
WSN.fightOn = now;
else if (now - WSN.fightOn > 6) {
WSN.layer.b = null;
}
}
if (WSN.layer.b)
wsnPumpLayer(WSN.layer.b);
if (WSN.layer.w && !WSN.swapAt)
wsnPumpLayer(WSN.layer.w);
if (WSN.track) {
var tv = wsnClamp(WSN.set.all * WSN.set.mus * duck * (fightOn ? 0.25 : 1) * (off ? 0 : 1) * 0.7, 0, 1);
try {
WSN.track.volume += (tv - WSN.track.volume) * 0.3;
if (WSN.track.paused && tv > 0.01)
WSN.track.play().catch(function () { });
}
catch (e) { }
}
for (var b in WSN.bed)
wsnBedTick(WSN.bed[b]);
},
function (key, P, here) {
WSN.here = here;
WSN.plan = P;
var c = WSN.ctx;
WSN.wIn.gain.setTargetAtTime(0, c.currentTime, 0.35);
WSN.swapAt = c.currentTime + (WSN.layer.w || WSN.track ? 1.3 : 0.05);
var want = {}, K = WSN.keeper, cap = WSN.lite ? 2 : 3;
if (P && !K.off)
(P.b || []).slice(0, cap).forEach(function (k) { want[k] = 1; });
for (var b in WSN.bed)
if (!want[b]) {
wsnBedStop(WSN.bed[b]);
delete WSN.bed[b];
}
for (var w in want)
if (!WSN.bed[w]) {
var B = wsnBedStart(w);
if (B)
WSN.bed[w] = B;
}
},
function () {
var P = WSN.plan, k = WSN.here, K = WSN.keeper, c = WSN.ctx;
WSN.layer.w = null;
if (WSN.track) {
try {
WSN.track.pause();
}
catch (e) { }
WSN.track = null;
WSN.trackUrl = null;
}
if (!P || !P.s || wsnListed(K.music_off, k))
return;
var url = K.track && typeof K.track[k] === "string" && /^https:\/\//.test(K.track[k]) ? K.track[k] : null;
if (url) {
try {
var a = new Audio();
a.src = url;
a.loop = true;
a.preload = "auto";
a.volume = 0;
a.crossOrigin = "anonymous";
WSN.track = a;
WSN.trackUrl = url;
a.play().catch(function () { });
return;
}
catch (e) {
WSN.track = null;
}
}
var st = WSN_STYLE[(P.n && wsnDay() < 0.3) ? P.n : P.s];
if (!st)
return;
WSN.layer.w = wsnLayer((P.n && wsnDay() < 0.3) ? P.n : P.s, k, WSN.wIn);
WSN.tone.frequency.setTargetAtTime(st.lp || 6000, c.currentTime, 0.3);
WSN.mWet.gain.setTargetAtTime((st.rev || 0.4) * 0.6, c.currentTime, 0.3);
}
];
});
