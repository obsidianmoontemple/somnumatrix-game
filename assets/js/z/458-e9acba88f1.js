/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(458, function () {
return [
function (seed, look) {
if (look && look._sbk)
return look._sbk;
var k = String(seed).replace(/^shk_/, "");
if (/^book_/.test(k))
return typeof shkRoleOf === "function" ? shkRoleOf(look && look._sbkName || "", "") : "common";
for (var w in SBK_WHO)
if (k === w || k.indexOf(w) === 0)
return SBK_WHO[w];
return sbkHash(seed) % 4 === 0 ? "noble" : "common";
},
function () {
if (typeof WDR_COST !== "undefined" && WDR_COST.oz_sbk)
return true;
if (typeof shkWearReady !== "function" || !shkWearReady())
return false;
WDR_COST.oz_sbk = { rb: 1, look: { role: "" }, ozKey: "shk", props: function (add, c, E) {
try {
var L = (E && E.spec && E.spec.look) || {}, r = L._shkRole || "noble";
if (!L._sbkHat || L._sbkHat === "none") {
shkHeadwear(add, E);
return;
}
if (/king|noble/.test(r)) {
var ruff = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.034, 8, 28), wdrMat(0xF8F6F0, { r: 0.9 }));
ruff.rotation.x = Math.PI / 2;
ruff.scale.set(1, 1, 0.55);
add("neck_01", [0, 0.035, 0.0], ruff);
}
}
catch (e) { }
} };
OZ_WEAR.oz_sbk = OZ_WEAR.oz_shk;
return true;
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : sbkArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? sbkLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = sbkAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : sbkGround(p.x, p.z), area: a, T: T };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
out = P;
});
return out;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (at.who) {
var W = sbkNamed(SHK.talk, at.who, at.room);
if (W)
return sbkBeside(W, at);
var C0 = SBK_CH[sbkS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at) {
var Q0 = sbkPos(d0.at);
return Q0 ? sbkBeside({ x: Q0.x + (d0.ox || 0), z: Q0.z + (d0.oz || 0), y: Q0.y, area: Q0.area }, at) : null;
}
}
if (at.spot) {
var Sp = sbkNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = SBK.cast[at.cast], q = c && c.g && c.g.parent ? sbkLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: sbkAreaAt(q.x, q.z) };
var CC = SBK_CH[sbkS().ch], def = CC && CC.cast ? CC.cast.filter(function (d) { return d.key === at.cast; })[0] : null;
if (def)
return sbkPos(def.at);
}
if (at.room)
return sbkRoomPt(at.room, at.lx, at.lz);
if (at.at && SBK_PLACE(at.at)) {
var A = SBK_PLACE(at.at), ax = A.x + (at.dx || 0), az = A.z + (at.dz || 0);
return { x: ax, z: az, y: sbkGround(ax, az), area: sbkAreaAt(ax, az) };
}
if (at.x != null) {
var y = at.y != null ? at.y : sbkGround(at.x, at.z);
return { x: at.x, y: y, z: at.z, area: at.area || sbkAreaAt(at.x, at.z), name: at.name };
}
return null;
},
function (W, at) {
if (!at || (!at.ox && !at.oz))
return W;
var ox = at.ox || 0, oz = at.oz || 0, d = Math.hypot(ox, oz);
if (d < 1.8) {
var k = 1.8 / d;
ox *= k;
oz *= k;
}
var a0 = Math.atan2(oz, ox), r0 = Math.hypot(ox, oz), y0 = W.y || 0;
function clear(x, z) { try {
if (typeof shkSolidAt === "function" && (shkSolidAt(x, z, y0 + 0.05) || shkSolidAt(x, z, y0 + 0.6)))
return false;
if (typeof shkBlock === "function" && shkBlock(x, z, y0))
return false;
}
catch (e) { } return true; }
for (var t = 0; t < 24; t++) {
var q = t % 12, r = r0 + (t >= 12 ? 0.6 : 0), a = a0 + (q % 2 ? 1 : -1) * Math.ceil(q / 2) * Math.PI / 6;
var x = W.x + Math.cos(a) * r, z = W.z + Math.sin(a) * r;
if (clear(x, z)) {
var y = y0;
try {
if (typeof shkGround === "function")
y = shkGround(x, z, y0 + 0.4);
}
catch (e) { }
return { x: x, z: z, y: y, area: W.area, T: W.T };
}
}
return { x: W.x + ox, z: W.z + oz, y: y0, area: W.area, T: W.T };
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0)
return { show: sbkRoomExit(), way: " (go out)" };
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = sbkRoomDoor(P.area.slice(3));
inn = " (go in)";
if (!target)
return null;
}
if (target.area === area)
return { show: target, way: inn };
var w = sbkSpotPt("The carrier's wagon", area);
if (w)
return { show: w, way: area === "london" ? " (the carrier's wagon to Stratford, in the Tabard's yard)" : " (the carrier's wagon back to London)" };
return null;
},
function (P, L) {
var dx = P.x - L.x, dz = P.z - L.z, d = Math.hypot(dx, dz);
if (d < 2)
return "right here";
var a = Math.atan2(-dx, -dz) - yaw;
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
var w = Math.abs(a) < 0.4 ? "ahead" : Math.abs(a) > 2.6 ? "behind you" : a > 0 ? (a < 1.6 ? "ahead, to your left" : "to your left, behind") : (a > -1.6 ? "ahead, to your right" : "to your right, behind");
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (SBK.beam && SBK.beam.parent)
return SBK.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xD8E4FF, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xC8D8FF, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF0D0, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
SBK.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "glove":
m = wBox(0.09, 0.02, 0.16, wM(0xC8A070), 0, 0.012, 0, g);
wBox(0.1, 0.022, 0.04, wM(0xB08A58), 0, 0.013, 0.09, g);
break;
case "hornbook":
m = wBox(0.12, 0.012, 0.16, wM(0x6A4A2A), 0, 0.008, 0, g);
wBox(0.1, 0.014, 0.12, wM(0xF0E8D0), 0, 0.012, 0.01, g);
wBox(0.03, 0.012, 0.08, wM(0x6A4A2A), 0, 0.008, -0.11, g);
break;
case "ring":
m = wCyl(0.012, 0.012, 0.004, wM(0xE8C860, { m: 0.8, r: 0.3 }), 0, 0.006, 0, g, 12);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
wCyl(0.012, 0.012, 0.004, wM(0xA82A2A), 0, 0.014, 0, g, 10);
break;
case "quarto":
m = wBox(0.14, 0.03, 0.19, wM(0xD8C8A0), 0, 0.016, 0, g);
break;
case "quill":
m = wBox(0.012, 0.008, 0.36, wM(0xF4F0E8), 0, 0.02, 0, g);
var vn = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.26), wM(0xFAF6EC));
vn.rotation.x = -Math.PI / 2;
vn.position.set(0.03, 0.026, -0.04);
g.add(vn);
wBox(0.006, 0.006, 0.05, wM(0x2A2018), 0, 0.02, 0.18, g);
break;
case "coin":
m = wCyl(0.018, 0.018, 0.003, wM(0xC8C8C8, { m: 0.8, r: 0.35 }), 0, 0.004, 0, g, 14);
break;
case "timber":
m = wBox(0.18, 0.16, 1.6, wM(0x6A4A2A), 0, 0.08, 0, g);
break;
case "rosemary":
m = wCyl(0.006, 0.006, 0.24, wM(0x4A6A3A), 0, 0.02, 0, g, 4);
m.rotation.z = Math.PI / 2;
wSph(0.03, wM(0x6A8A5A), 0.1, 0.02, 0, g, 5);
break;
case "skull":
m = wSph(0.09, wM(0xE8E0C8), 0, 0.09, 0, g, 10);
break;
case "crown":
m = wCyl(0.09, 0.09, 0.06, wM(0xD8B040, { m: 0.8, r: 0.3 }), 0, 0.04, 0, g, 10);
break;
case "candle":
m = wCyl(0.02, 0.02, 0.16, wM(0xF4ECD8), 0, 0.08, 0, g, 8);
break;
case "ash":
m = wSph(0.08, wM(0x3A3634), 0, 0.03, 0, g, 8);
m.scale.y = 0.3;
break;
case "bill":
m = wBox(0.16, 0.004, 0.22, wM(0xF0E8D0), 0, 0.01, 0, g);
wBox(0.13, 0.005, 0.03, wM(0x1A1A1A), 0, 0.012, -0.07, g);
break;
case "seal":
m = wCyl(0.03, 0.035, 0.012, wM(0xA82A2A), 0, 0.008, 0, g, 12);
break;
case "cloth":
m = wBox(0.3, 0.06, 0.22, wM(0xA8202A), 0, 0.03, 0, g);
break;
case "bucket":
m = wCyl(0.12, 0.1, 0.24, wM(0x6A4A2A), 0, 0.12, 0, g, 10);
wCyl(0.125, 0.125, 0.02, wM(0x3A3A3A), 0, 0.2, 0, g, 10);
break;
case "book":
m = wBox(0.22, 0.06, 0.32, wM(0x4A2A1A), 0, 0.03, 0, g);
wBox(0.2, 0.05, 0.3, wM(0xF0E8D0), 0.012, 0.03, 0, g);
break;
default: m = wSph(0.1, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.15, 0, g, 10);
}
var gl = wGlow(0xE0E8FF, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = sbkItemMesh(kind);
g.position.set(P.x, P.y + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (SBK.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
SBK.items = SBK.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[sbk] take", e);
}
}, P.y);
I.S.sbk = 1;
SBK.items.push(I);
return I;
},
function (k) {
if (SBK.tuneKey === k)
return;
SBK.tuneKey = k;
var old = SBK.tune;
SBK.tune = null;
if (old) {
var o = old, f = setInterval(function () { try {
o.volume = Math.max(0, o.volume - 0.04);
if (o.volume <= 0.01) {
o.pause();
clearInterval(f);
}
}
catch (e) {
clearInterval(f);
} }, 80);
}
if (!k || !SBK_TUNES[k])
return;
try {
var A = new Audio(SBK_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
SBK.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (SBK.tune !== A) {
clearInterval(fi);
return;
}
A.volume = Math.min(v, A.volume + 0.03);
if (A.volume >= v)
clearInterval(fi);
}
catch (e) {
clearInterval(fi);
} }, 90);
}
catch (e) { }
},
function (fn) {
if (SBK.text)
return fn(SBK.text);
if (SBK.textWait) {
SBK.textWait.push(fn);
return;
}
SBK.textWait = [fn];
var done = function (B) { SBK.text = B; var w = SBK.textWait; SBK.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/shakespeare-book/life.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
sbkText(function (B) {
var T = sbkPassage(B, i), C = SBK_CH[i];
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + sbkEsc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + sbkEsc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(sbkParaHtml).join("") + "</div>";
var fns = { back: function () { worldCard(null); SBK.readOpen = 0; SBK.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = sbkS(), C = SBK_CH[S.ch];
if (!C)
return;
SBK.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
SBK.readAsk = 0;
SBK.readOpen = 1;
var T = sbkPassage(B, ch), open = T ? sbkOpening(T).map(sbkParaHtml).join("") : (C.words ? sbkParaHtml(C.words) : "");
var b = "<div style='font-size:12px;opacity:.7'>" + sbkEsc(T ? T.src : (C.src || "The Player's Life")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + sbkEsc(C.t) + "</h3>" + (C.words && T ? "<p style='margin:6px 0'>" + sbkEsc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + open + "</div>";
var fns = { go: function () { worldCard(null); SBK.readOpen = 0; sbkStepDone(); }, all: function () { sbkReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Step into the story");
if (T)
b += worldBtn("all", "📜 Read the whole passage", "Sidney Lee's Life of 1899, all of it for this chapter");
b += sbkKeeperBtns(fns);
worldCard(b, fns);
};
sbkText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
SBK_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); sbkJump(i); }; });
return b + "</div>";
},
function () {
var b = sbkStep();
sbkItemsClear();
SBK.hold = 0;
SBK.puzOpen = 0;
if (!b)
return;
b._t0 = performance.now();
b._key = sbkKey();
try {
if (b.on)
b.on(sbkS().f);
}
catch (e) {
if (window.console)
console.warn("[sbk] on", e);
}
if (b.k === "read") {
sbkChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { SBK.rew[k] = 0; });
if (b.k === "find")
sbkItemAdd(b.item, sbkPos(b.at), b.name, b.verb, function () { if (sbkKey() === b._key)
sbkStepDone(); });
if (b.k === "gather") {
var P = sbkPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(sbkS().ch * 97 + sbkS().s * 13 + 7);
SBK.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = P.area.indexOf("in:") === 0 ? (P.y || 0) : sbkGround(Q.x, Q.z);
sbkItemAdd(b.item, Q, b.name, b.verb, function () { if (sbkKey() !== b._key)
return; SBK.got++; if (SBK.got < n) {
sbkSay((b.each || "Got one.") + " " + SBK.got + " of " + n + ".");
return;
} sbkStepDone(); });
}
}
if (b.h)
sbkSay("<b>" + sbkEsc(SBK_CH[sbkS().ch].t) + ".</b> " + b.h);
},
function (b) {
SBK.puzOpen = 1;
SBK.puzT = performance.now();
var k = sbkKey(), fns = {}, h = SBK_H + sbkEsc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
sbkSay(b.yes);
if (sbkKey() === k)
sbkStepDone();
return;
}
sbkSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (sbkKey() === k)
SBK.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = sbkS(), C = SBK_CH[S.ch], b = sbkStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[sbk] done", e);
}
if (b.say)
sbkSay(b.say);
S.s++;
if (window.SBK_LOG)
SBK_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= SBK_CH.length - 1) {
S.done = 1;
S.s = 0;
sbkSave();
sbkItemsClear();
sbkFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
sbkSave();
var nx = SBK_CH[S.ch];
setTimeout(function () { try {
sbkChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[sbk]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
sbkSave();
sbkStepBegin();
},
function () {
sbkTune("green");
var S = sbkS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>\"Triumph, my Britain, thou hast one to show<br>To whom all scenes of Europe homage owe.<br>He was not of an age, but for all time!\"</p><p style='font-size:12px;opacity:.75'>Ben Jonson, in the First Folio, 1623</p><p>You have walked his life from the glover's house in Henley Street to the stone in Holy Trinity, and watched his fellows gather the plays so that they would not be lost. Your keepsakes, one from every chapter:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + sbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; sbkSave(); sbkChapterBegin(true); } };
b += worldBtn("again", "Walk his life again from the start", "The Folio Library, 1623");
worldCard(b, fns);
},
function () {
var S = sbkS(), C = SBK_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>William Shakespeare, 1564 to 1616 · from the records, his own words, and Sidney Lee's Life of 1899</div><h3 style='margin:4px 0'>🪶 The Player's Life</h3>";
if (S.done)
b += "<p>You have walked his whole life. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + sbkEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + sbkEsc((sbkStep() || {}).h || "") + "</p>";
else
b += "<p>In the Folio Library at Stationers' Hall, two old players are gathering his plays into one great book, seven years after his death. Walk the life behind it, as the records tell it: Stratford, the road to London, the Rose and the Theatre, the Globe built and burned, Whitehall and Blackfriars, and home again. " + SBK_CH.length + " chapters, all over London and Stratford, about four hours and more at your own pace. Where nobody knows what happened, the book says so. Your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Folio Library, 1623", S.started ? "Back to where you were" : "Stationers' Hall, by St Paul's");
fns.go = function () { worldCard(null); sbkBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; sbkSave(); sbkBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + sbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += sbkKeeperBtns(fns);
worldCard(b, fns);
},
function (T) {
if (!sbkActive())
return false;
var b = sbkStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = sbkKey();
worldPrompt(null);
var next = function () { if (sbkKey() === k)
sbkStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
if (window.console)
console.warn("[sbk] act", e);
next();
}
}
else
next(); } };
worldCard(SBK_H + sbkEsc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
return true;
}
if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
return true;
}
next();
return true;
},
function (c) {
var C = SBK.cast[c.key];
if (sbkCastLive(C))
return C;
if (C) {
try {
if (C.g && C.g.parent)
C.g.parent.remove(C.g);
}
catch (e) { }
SHK.talk = SHK.talk.filter(function (T) { return T.p !== C.P; });
SHK.people = SHK.people.filter(function (p) { return p !== C.P; });
delete SBK.cast[c.key];
}
var P = sbkPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = SHK.live;
if (inside) {
var Rm = SHK.rooms[P.area.slice(3)];
if (!Rm || !Rm.live)
return null;
parent = Rm.live;
}
var look = Object.assign({ sex: c.sex || "m" }, c.look || {});
look._sbk = c.role || "";
look._sbkName = c.name;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = inside ? shkGround(px, pz, (P.y || 0) + 0.3) : sbkGround(px, pz);
var g = wPerson("shk_book_" + c.key, { look: look, sex: look.sex, place: SHK_NAME, _shkRole: c.role });
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
g.userData.shkFlat = 1;
parent.add(g);
var Q = { g: g, key: "book_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.6 } : null, ground: py };
SHK.people.push(Q);
var T = { p: Q, name: c.name, r: c.r || 3.2, t: { name: c.name, persona: c.persona || ("You are " + c.name + ", in the London or Stratford of Shakespeare's day. Speak as a person of that time; never mention films."), greet: c.greet || "God save you." } };
SHK.talk.push(T);
sbkWrapT(T);
SBK.cast[c.key] = { g: g, P: Q, c: c, par: parent };
return SBK.cast[c.key];
},
function () {
var C = SBK_CH[sbkS().ch];
if (!C || !C.cast)
return;
C.cast.forEach(function (c) {
if (sbkCastLive(SBK.cast[c.key]))
return;
var P = sbkPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (sbkDist(P, worldLocal()) > 400 && !((sbkStep() || {}).who === c.name))
return;
sbkPerson(c);
});
},
function (dt) {
if (!SHK.G || !SHK.built)
return;
SBK.wt += dt;
if (SBK.wt > 0.5) {
SBK.wt = 0;
sbkWrap();
if (sbkActive())
sbkCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!sbkActive()) {
if (SBK.beam)
SBK.beam.visible = false;
if (!cardOpen && !WLD.promptFn && !SHK.moving && !SHK.ride && !(typeof SHKS !== "undefined" && SHKS.on))
worldPrompt("🪶 <b>The Player's Life</b> · <b>press E</b> to walk Shakespeare's own life", sbkOpen);
return;
}
var S = sbkS(), b = sbkStep(), L = worldLocal(), t = SHK.t || 0, area = sbkAreaAt(L.x, L.z);
SBK.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? sbkPos(b.at) : null, W = P ? sbkWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "";
var bm = sbkBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = sbkDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = sbkWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? sbkDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (SBK.readAsk)
break;
if (!SBK.readOpen)
sbkChapterCard();
else {
SBK.readOpen = 0;
sbkStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null && !b.at.who && !b.at.spot ? true : fd < (b.r || 6))) {
sbkStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
SBK.hold += dt;
if (SBK.hold >= (b.sec || 8)) {
sbkStepDone();
return;
}
}
else
SBK.hold = 0;
break;
case "reward":
if (sbkRewGot(b)) {
sbkStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
sbkStepDone();
return;
}
break;
}
case "puzzle":
if ((!SBK.puzOpen || performance.now() - (SBK.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
sbkPuzzleCard(b);
break;
}
}
if (!cardOpen && !WLD.promptFn && !SHK.moving && !SHK.ride && !(typeof SHKS !== "undefined" && SHKS.on))
worldPrompt("🪶 <b>The Player's Life</b> · <b>press E</b> for the book", sbkOpen);
var C = SBK_CH[S.ch], prog = b && b.k === "hold" && SBK.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - SBK.hold)) + " s)" : b && b.k === "gather" ? " (" + (SBK.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🪶 <b>" + (S.ch + 1) + ". " + sbkEsc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
}
];
});
