/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(459, function () {
return [
function (L, o) {
if (typeof wfBare !== "function" || typeof wfIds !== "function")
return null;
var r = L._eb || (o.f ? "woman" : "man"), W = EBK_WEAR[r] || EBK_WEAR.man, f = W.f != null ? !!W.f : !!o.f;
var t = W.t != null ? W.t : (L.top != null ? L.top : (f ? 0xE8DCC8 : 0xE8E0D0)), tr = W.tr != null ? W.tr : (L.layerColor != null ? L.layerColor : 0xB8603A);
var cape = W.cape === "own" ? (L.bottom != null && L.bottom !== t ? L.bottom : null) : W.cape, len = o.kid ? "knee" : W.len, cap = W.sl !== "long";
var ids = ["oz:bodice:" + (cap ? "cap" : "long") + ":cloth", "oz:skirt:" + len + ":" + (len === "knee" ? "0.06" : "0.12") + ":cloth", "oz:sash"].concat(cape != null ? ["oz:pelerine"] : []);
return wfIds(wfBare({ ids: ids, col: { dress: t, skirt: t, trim: tr, sash: tr, cape: cape != null ? cape : tr }, shoes: 0x8A6A44 }, L, cap ? 1 : 0, len === "knee" ? 1 : 0));
},
function (add, c) {
var g = new THREE.Group(), m = ebkM(c, { r: 0.3, m: 0.85 });
var band = new THREE.Mesh(ebkG("crownb", function () { return new THREE.CylinderGeometry(0.118, 0.12, 0.045, 22, 1, true); }), m);
band.material.side = THREE.DoubleSide;
g.add(band);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, p = new THREE.Mesh(ebkG("crownp", function () { return new THREE.ConeGeometry(0.016, 0.055, 5); }), m);
p.position.set(Math.cos(a) * 0.118, 0.048, Math.sin(a) * 0.118);
g.add(p);
}
add("Head", [0, 0.135, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), m = ebkM(c, { r: 0.95 });
g.add(new THREE.Mesh(ebkG("petb", function () { return new THREE.CylinderGeometry(0.25, 0.25, 0.012, 24); }), m));
var d = new THREE.Mesh(ebkG("petd", function () { return new THREE.SphereGeometry(0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), m);
d.scale.y = 0.55;
g.add(d);
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(ebkG("petw", function () { var b = new THREE.BoxGeometry(0.012, 0.06, 0.13); return b; }), ebkM(0xF2F0EA, { r: 0.9 })); w.position.set(s * 0.135, 0.045, -0.02); w.rotation.set(-0.4, 0, s * 0.35); g.add(w); });
add("Head", [0, 0.13, -0.01], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0xB8863A, { r: 1 });
var h = new THREE.Mesh(ebkG("lionh", function () { return new THREE.SphereGeometry(0.155, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.6); }), m);
h.scale.set(1.05, 0.95, 1.18);
g.add(h);
var sn = new THREE.Mesh(ebkG("lions", function () { return new THREE.SphereGeometry(0.07, 10, 8); }), m);
sn.scale.set(1, 0.6, 1.2);
sn.position.set(0, 0.06, 0.15);
g.add(sn);
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(ebkG("lione", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), m); e.position.set(s * 0.1, 0.12, -0.02); g.add(e); });
var mane = new THREE.Mesh(ebkG("lionm", function () { return new THREE.TorusGeometry(0.15, 0.045, 8, 22); }), ebkM(0x8A5A24, { r: 1 }));
mane.rotation.x = Math.PI / 2;
mane.position.y = 0.01;
g.add(mane);
add("Head", [0, 0.09, -0.02], g);
var paw = new THREE.Mesh(ebkG("lionp", function () { return new THREE.SphereGeometry(0.05, 8, 6); }), m);
paw.scale.set(1.6, 0.8, 0.8);
add("spine_03", [0, 0.12, 0.13], paw);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0x2A4A2A, { r: 0.5 });
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, s = new THREE.Mesh(ebkG("snake", function () { return new THREE.TorusGeometry(0.035, 0.009, 5, 10, Math.PI * 1.4); }), m);
s.position.set(Math.cos(a) * 0.11, 0.02 + (i % 2) * 0.03, Math.sin(a) * 0.11);
s.rotation.set(Math.PI / 2, 0, a);
g.add(s);
}
add("Head", [0, 0.12, -0.02], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0xC8A060, { r: 0.6 }), sm = ebkM(0xEAE4D4, { r: 0.4 });
var body = new THREE.Mesh(ebkG("lyreb", function () { return new THREE.SphereGeometry(0.08, 12, 8); }), ebkM(0x8A6A3A));
body.scale.set(1, 1, 0.35);
g.add(body);
[-1, 1].forEach(function (s) { var arm = new THREE.Mesh(ebkG("lyrea", function () { return new THREE.CylinderGeometry(0.008, 0.01, 0.26, 6); }), m); arm.position.set(s * 0.06, 0.13, 0); arm.rotation.z = -s * 0.25; g.add(arm); });
var bar = new THREE.Mesh(ebkG("lyrebar", function () { return new THREE.CylinderGeometry(0.008, 0.008, 0.2, 6); }), m);
bar.rotation.z = Math.PI / 2;
bar.position.y = 0.25;
g.add(bar);
for (var i = 0; i < 7; i++) {
var st = new THREE.Mesh(ebkG("lyres", function () { return new THREE.CylinderGeometry(0.0015, 0.0015, 0.2, 3); }), sm);
st.position.set(-0.045 + i * 0.015, 0.15, 0.01);
g.add(st);
}
add("hand_l", [0, 0.02, 0.06], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(ebkG("torchs", function () { return new THREE.CylinderGeometry(0.02, 0.025, 0.6, 6); }), ebkM(0x5A3A1E)));
var f = new THREE.Mesh(ebkG("torchf", function () { return new THREE.ConeGeometry(0.05, 0.16, 8); }), new THREE.MeshBasicMaterial({ color: 0xFFA040, transparent: true, opacity: 0.85 }));
f.position.y = 0.36;
g.add(f);
add("hand_r", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0xC8A040, { r: 0.3, m: 0.8 });
g.add(new THREE.Mesh(ebkG("cadst", function () { return new THREE.CylinderGeometry(0.01, 0.012, 0.6, 6); }), m));
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(ebkG("cadw", function () { return new THREE.BoxGeometry(0.08, 0.03, 0.006); }), m); w.position.set(s * 0.045, 0.3, 0); w.rotation.z = s * 0.4; g.add(w); });
add("hand_r", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0x2A2A30, { r: 0.3, m: 0.8 });
g.add(new THREE.Mesh(ebkG("bist", function () { return new THREE.CylinderGeometry(0.015, 0.018, 1.6, 6); }), m));
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(ebkG("bip", function () { return new THREE.ConeGeometry(0.015, 0.18, 5); }), m); p.position.set(s * 0.04, 0.88, 0); g.add(p); });
add("hand_r", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0xD8B040, { r: 0.3, m: 0.85 });
g.add(new THREE.Mesh(ebkG("sceps", function () { return new THREE.CylinderGeometry(0.012, 0.014, 0.9, 6); }), m));
var b = new THREE.Mesh(ebkG("scepb", function () { return new THREE.SphereGeometry(0.035, 10, 8); }), m);
b.position.y = 0.47;
g.add(b);
add("hand_r", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group(), m = ebkM(0x3A6A2A, { r: 0.9 });
g.add(new THREE.Mesh(ebkG("laurs", function () { return new THREE.CylinderGeometry(0.006, 0.008, 0.4, 4); }), ebkM(0x5A4A2A)));
for (var i = 0; i < 6; i++) {
var l = new THREE.Mesh(ebkG("laurl", function () { var s = new THREE.SphereGeometry(0.02, 6, 4); s.scale(0.6, 1.8, 0.3); return s; }), m);
l.position.set((i % 2 ? 1 : -1) * 0.025, 0.05 + i * 0.03, 0);
l.rotation.z = (i % 2 ? -1 : 1) * 0.6;
g.add(l);
}
add("hand_l", [0, 0.05, 0.03], g);
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, W = EBK_WEAR[L._eb] || null;
if (!W)
return;
var hat = W.hat;
if (hat) {
if (EBK_HAT[hat])
EBK_HAT[hat](add, W.hc != null ? W.hc : 0x4A3A2A, E);
else if (typeof WF_HAT !== "undefined" && WF_HAT[hat])
WF_HAT[hat](add, W.hc != null ? W.hc : 0x4A3A2A, E);
}
var h = W.held;
if (h) {
if (EBK_HELD[h])
EBK_HELD[h](add);
else if (typeof WF_HELD !== "undefined" && WF_HELD[h])
WF_HELD[h](add);
}
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : ebkArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? ebkLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = ebkAreaAt(p.x);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : ebsGround(p.x, p.z), area: a, T: T };
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
var W = ebkNamed(EBS.talk, at.who, at.room);
if (W)
return W;
}
if (at.spot) {
var Sp = ebkNamed(EBS.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = EBK.cast[at.cast], q = c && c.g && c.g.parent ? ebkLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: ebkAreaAt(q.x) };
var CC = EBK_CH[ebkS().ch], def = CC && CC.cast ? CC.cast.filter(function (d) { return d.key === at.cast; })[0] : null;
if (def)
return ebkPos(def.at);
}
if (at.room)
return ebkRoomPt(at.room, at.lx, at.lz);
if (at.at && EBS_AT[at.at]) {
var A = EBS_AT[at.at], ax = A.x + (at.dx || 0), az = A.z + (at.dz || 0);
return { x: ax, z: az, y: ebsGround(ax, az), area: ebkAreaAt(ax) };
}
if (at.x != null) {
var y = at.y != null ? at.y : ebsGround(at.x, at.z);
return { x: at.x, y: y, z: at.z, area: ebkAreaAt(at.x) };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0)
return { show: ebkRoomExit(), way: " (go out)" };
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = ebkRoomDoor(P.area.slice(3));
inn = " (go in)";
if (!target)
return null;
}
if (target.area === area) {
if (area === "main") {
var L = worldLocal(), south = L.z > 2300, tsouth = target.z > 2300;
if (south !== tsouth && Math.abs(L.x) < 3000) {
var best = null;
EBS.spots.forEach(function (S) { if (S.name === "Charon's ferry" && ((S.z > 2300) === south))
best = { x: S.x, z: S.z, y: S.y != null ? S.y : ebsGround(S.x, S.z), area: "main" }; });
if (best)
return { show: best, way: " (cross the Acheron by Charon's ferry" + (south ? "; he takes an obol" : "") + ")" };
}
}
return { show: target, way: inn };
}
var g = ebkGate(area, target.area);
return g ? { show: g, way: " (the way to " + (target.area === "main" ? "the underworld" : target.area === "taenarum" ? "Cape Taenarum" : target.area === "tartarus" ? "Tartarus" : "Elysium") + ")" } : null;
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
if (EBK.beam && EBK.beam.parent)
return EBK.beam;
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
var s = wGlow(0xE8F0FF, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
EBS.G.add(g);
EBK.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "flower":
m = wSph(0.08, wM([0xF0E8F8, 0xE8C030, 0x6A4AD8, 0xD8343A][Math.floor(Math.random() * 4)]), 0, 0.32, 0, g, 8);
wCyl(0.01, 0.01, 0.3, wM(0x3A7A2A), 0, 0.15, 0, g, 4);
break;
case "narcissus":
m = wSph(0.07, wM(0xFAF6E8, { e: 0x5A5A40, ei: 0.3 }), 0, 0.36, 0, g, 8);
wSph(0.03, wM(0xE8B020), 0, 0.38, 0.04, g, 6);
wCyl(0.01, 0.01, 0.34, wM(0x3A7A2A), 0, 0.17, 0, g, 4);
break;
case "torch":
m = wCyl(0.03, 0.03, 0.6, wM(0x6A4A2A), 0, 0.3, 0, g, 6);
wSph(0.07, wM(0xFF9A30, { e: 0xFF6A10, ei: 0.9 }), 0, 0.64, 0, g, 8);
break;
case "pomegranate":
m = wSph(0.07, wM(0xA8182A), 0, 0.07, 0, g, 10);
break;
case "obol":
m = wCyl(0.03, 0.03, 0.006, wM(0xD8D8E0, { e: 0x4A4A50, ei: 0.3 }), 0, 0.01, 0, g, 14);
break;
case "cake":
m = wCyl(0.09, 0.1, 0.06, wM(0xC8904A), 0, 0.04, 0, g, 12);
break;
case "bough":
m = wCyl(0.012, 0.016, 0.5, wM(0xE8C040, { e: 0x6A5010, ei: 0.6 }), 0, 0.05, 0, g, 5);
m.rotation.z = Math.PI / 2;
break;
case "barley":
m = wCyl(0.01, 0.01, 0.4, wM(0xE8D080), 0, 0.2, 0, g, 4);
wSph(0.03, wM(0xE8C870), 0, 0.42, 0, g, 6);
break;
case "wineskin":
m = wSph(0.12, wM(0x6A3A2A), 0, 0.1, 0, g, 10);
m.scale.set(1.3, 0.8, 1);
break;
case "sop":
m = wSph(0.07, wM(0xD8B070), 0, 0.05, 0, g, 8);
m.scale.y = 0.6;
break;
case "box":
m = wBox(0.16, 0.1, 0.12, wM(0xE8C040, { e: 0x5A4010, ei: 0.4 }), 0, 0.05, 0, g);
break;
case "lyre":
m = wBox(0.2, 0.24, 0.03, wM(0xC8A060), 0, 0.13, 0, g);
break;
case "stone":
m = wSph(0.12, wM(0xE8E4DA), 0, 0.08, 0, g, 8);
m.scale.y = 0.6;
break;
case "laurel":
m = wMesh(new THREE.TorusGeometry(0.1, 0.02, 5, 16), wM(0x4A7A3A), 0, 0.03, 0, g);
m.rotation.x = Math.PI / 2;
break;
case "scroll":
m = wCyl(0.03, 0.03, 0.24, wM(0xEAE0C4), 0, 0.04, 0, g, 8);
m.rotation.z = Math.PI / 2;
break;
case "lot":
m = wBox(0.06, 0.01, 0.08, wM(0xE8E0C8), 0, 0.02, 0, g);
break;
case "shell":
m = wSph(0.07, wM(0xF4E4D8), 0, 0.04, 0, g, 8);
m.scale.y = 0.4;
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
var g = ebkItemMesh(kind);
g.position.set(P.x, P.y + 0.02, P.z);
EBS.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = ebsSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (EBK.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = EBS.spots.indexOf(I.S);
if (j >= 0)
EBS.spots.splice(j, 1);
EBK.items = EBK.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[ebk] take", e);
}
}, P.y);
I.S.ebk = 1;
EBK.items.push(I);
return I;
},
function (k) {
if (EBK.tuneKey === k)
return;
EBK.tuneKey = k;
var old = EBK.tune;
EBK.tune = null;
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
if (!k || !EBK_TUNES[k])
return;
try {
var A = new Audio(EBK_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
EBK.tune = A;
var v = window.EBK_VOL != null ? window.EBK_VOL : 0.26, fi = setInterval(function () { try {
if (EBK.tune !== A) {
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
if (EBK.text)
return fn(EBK.text);
if (EBK.textWait) {
EBK.textWait.push(fn);
return;
}
EBK.textWait = [fn];
var done = function (B) { EBK.text = B; var w = EBK.textWait; EBK.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/erebos/descents.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
ebkText(function (B) {
var T = ebkPassage(B, i), C = EBK_CH[i];
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + ebkEsc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + ebkEsc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(ebkParaHtml).join("") + "</div>";
var fns = { back: function () { worldCard(null); EBK.readOpen = 0; EBK.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = ebkS(), C = EBK_CH[S.ch];
if (!C)
return;
EBK.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
EBK.readAsk = 0;
EBK.readOpen = 1;
var T = ebkPassage(B, ch), open = T ? ebkOpening(T).map(ebkParaHtml).join("") : (C.words ? ebkParaHtml(C.words) : "");
var b = "<div style='font-size:12px;opacity:.7'>" + ebkEsc(T ? T.src : (C.src || "The Descents")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + ebkEsc(C.t) + "</h3>" + (C.words && T ? "<p style='margin:6px 0'>" + ebkEsc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + open + "</div>";
var fns = { go: function () { worldCard(null); EBK.readOpen = 0; ebkStepDone(); }, all: function () { ebkReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Step into the story");
if (T)
b += worldBtn("all", "📜 Read the whole passage", "the poet's own words, all of them");
b += ebkKeeperBtns(fns);
worldCard(b, fns);
};
ebkText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
EBK_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); ebkJump(i); }; });
return b + "</div>";
},
function () {
var b = ebkStep();
ebkItemsClear();
EBK.hold = 0;
if (!b)
return;
b._t0 = performance.now();
b._key = ebkKey();
try {
if (b.on)
b.on(ebkS().f);
}
catch (e) {
if (window.console)
console.warn("[ebk] on", e);
}
if (b.k === "read") {
ebkChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { EBK.rew[k] = 0; });
if (b.k === "find")
ebkItemAdd(b.item, ebkPos(b.at), b.name, b.verb, function () { if (ebkKey() === b._key)
ebkStepDone(); });
if (b.k === "gather") {
var P = ebkPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(ebkS().ch * 97 + ebkS().s * 13 + 7);
EBK.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = P.area.indexOf("in:") === 0 ? (P.y || 0) : ebsGround(Q.x, Q.z);
ebkItemAdd(b.item, Q, b.name, b.verb, function () { if (ebkKey() !== b._key)
return; EBK.got++; if (EBK.got < n) {
ebkSay((b.each || "Got one.") + " " + EBK.got + " of " + n + ".");
return;
} ebkStepDone(); });
}
}
if (b.h)
ebkSay("<b>" + ebkEsc(EBK_CH[ebkS().ch].t) + ".</b> " + b.h);
},
function () {
var S = ebkS(), C = EBK_CH[S.ch], b = ebkStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[ebk] done", e);
}
if (b.say)
ebkSay(b.say);
S.s++;
if (window.EBK_LOG)
EBK_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= EBK_CH.length - 1) {
S.done = 1;
S.s = 0;
ebkSave();
ebkItemsClear();
ebkFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
ebkSave();
var nx = EBK_CH[S.ch];
setTimeout(function () { try {
ebkChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[ebk]", e);
} }, window.EBK_FAST ? 10 : 2600);
return;
}
ebkSave();
ebkStepBegin();
},
function () {
ebkTune("sun");
var S = ebkS();
var b = "<h3 style='margin:4px 0'>The Sibyl closes the book</h3><p style='font-style:italic'>\"Easy is the way down; the doors of dark Dis stand open night and day. But to retrace your steps and come out to the air above: that is the labour, that is the task.\" (Virgil)</p><p>You have walked every descent, and come back up every time. Your keepsakes, one from every chapter:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + ebkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; ebkSave(); ebkChapterBegin(true); } };
b += worldBtn("again", "Walk the descents again from the start", "The Sibyl's cave above Cumae");
worldCard(b, fns);
},
function () {
var S = ebkS(), C = EBK_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>The Sibyl of Cumae · Homer, Virgil, Ovid, Euripides, Apuleius, Aristophanes, Plato</div><h3 style='margin:4px 0'>📜 The Descents</h3>";
if (S.done)
b += "<p>You have walked every descent. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + ebkEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + ebkEsc((ebkStep() || {}).h || "") + "</p>";
else
b += "<p>The Sibyl keeps the book of everyone who went down to the house of Hades alive: Persephone, Orpheus, Heracles, Theseus, Alcestis, Odysseus, Aeneas, Psyche, Dionysus and Er. Walk each descent as the old poets tell it, beginning to end: " + EBK_CH.length + " chapters, all over the underworld, about three hours and more at your own pace. Your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Sibyl at the Vestibule", S.started ? "Back to where you were" : "Cape Taenarum, and the long stair down");
fns.go = function () { worldCard(null); ebkBegin(); };
}
else {
b += worldBtn("again", "Walk them again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; ebkSave(); ebkBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + ebkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += ebkKeeperBtns(fns);
worldCard(b, fns);
},
function (next) { var d = ebsData(); if (d.passed) {
d.honey = 0;
ebsSave();
setStatus("🍯 <b>All three heads snap at the cake,</b> and the great back slackens; he sprawls across the cave, snoring (Aeneid 6.417-423).");
next();
return;
} d.honey = 0; ebsSave(); ebsCerbPass("honey", "🍯 <b>All three heads snap at the honey cake.</b> The draught in it works quickly: he slumps across the threshold, snoring, and you step over him, as Aeneas did."); next(); },
function (T) {
if (!ebkActive())
return false;
var b = ebkStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = ebkKey();
worldPrompt(null);
var next = function () { if (ebkKey() === k)
ebkStepDone(); };
if (b.card) {
ebsChoose(b.card[0], [b.card[1]], [[b.card[2] || "▶ Go on", function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
if (window.console)
console.warn("[ebk] act", e);
next();
}
}
else
next(); }]]);
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
var C = EBK.cast[c.key];
if (C && C.g && C.g.parent)
return C;
var P = ebkPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0;
if (inside) {
var I = EBS_IN[P.area.slice(3)];
if (!I || !I.built)
return null;
}
var o = Object.assign({ sex: c.sex || "m", ebRole: c.role, name: c.name, look: c.look || {} }, c.o || {});
if (inside && EBS_IN[P.area.slice(3)].grp)
o.parent = EBS_IN[P.area.slice(3)].grp;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = inside ? (P.y || 0) : ebsGround(px, pz);
if (o.parent) {
px -= o.parent.position.x;
pz -= o.parent.position.z;
py -= o.parent.position.y;
}
var Q = ebsPerson("ebk" + c.key, px, pz, py, o, c.ry || 0);
Q.ebkRoleSet = 1;
if (Q.ebkLook)
Q.ebkLook._eb = c.role || Q.ebkLook._eb;
ebsTalk(Q, c.name, c.persona || ("You are " + c.name + " of the old Greek stories. Never mention films."), c.greet || "", c.r || 3);
if (c.shade && typeof ebsShadeify === "function")
try {
ebsShadeify(Q.g);
}
catch (e) { }
EBK.cast[c.key] = { g: Q.g, P: Q, c: c };
return EBK.cast[c.key];
},
function (dt) {
if (!EBS.G || !EBS.built)
return;
EBK.wt += dt;
if (EBK.wt > 0.5) {
EBK.wt = 0;
ebkWrap();
if (ebkActive())
ebkCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!ebkActive()) {
if (EBK.beam)
EBK.beam.visible = false;
if (!cardOpen && !WLD.promptFn && !EBS.moving && !EBS.run && !EBS.ride)
worldPrompt("📜 <b>The Descents</b> · <b>press E</b> to walk the old stories", ebkOpen);
return;
}
var S = ebkS(), b = ebkStep(), L = worldLocal(), t = EBS.t || 0, area = ebkAreaAt(L.x);
EBK.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? ebkPos(b.at) : null, W = P ? ebkWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "";
if (show && /Charon's ferry/.test(way) && /obol/.test(way) && !ebsData().obol && ebkDist(show, L) < 40) {
ebkObol();
ebkSay("🪙 Someone presses an obol into your hand: \"For the ferryman. The Sibyl sends it.\"");
}
var bm = ebkBeam();
if (show && !EBS.moving) {
bm.visible = true;
var cd = ebkDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = ebkWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !EBS.moving) {
var inArea = P && P.area === area, fd = P ? ebkDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (EBK.readAsk)
break;
if (!EBK.readOpen)
ebkChapterCard();
else {
EBK.readOpen = 0;
ebkStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null && !b.at.who && !b.at.spot ? true : fd < (b.r || 6))) {
ebkStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
EBK.hold += dt;
if (EBK.hold >= (b.sec || 8)) {
ebkStepDone();
return;
}
}
else
EBK.hold = 0;
break;
case "reward":
if (ebkRewGot(b)) {
ebkStepDone();
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
ebkStepDone();
return;
}
break;
}
}
}
if (!cardOpen && !WLD.promptFn && !EBS.moving && !EBS.run && !EBS.ride)
worldPrompt("📜 <b>The Descents</b> · <b>press E</b> for the book", ebkOpen);
var C = EBK_CH[S.ch], prog = b && b.k === "hold" && EBK.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - EBK.hold)) + " s)" : b && b.k === "gather" ? " (" + (EBK.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("📜 <b>" + (S.ch + 1) + ". " + ebkEsc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
}
];
});
