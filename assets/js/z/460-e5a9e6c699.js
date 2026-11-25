/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(460, function () {
return [
function (L, o) {
if (typeof wfIds !== "function")
return null;
var r = L._vb || (o.f ? "woman" : "man"), W = VBK_WEAR[r] || VBK_WEAR.man;
var own = function (v, d) { return v != null ? v : d; };
var coat = own(W.coat, own(L.layerColor, 0x2A2A34)), vest = own(W.vest, own(L.top != null && L.top !== 0xF2EEE2 ? L.top : null, 0x5A4A3A)), trou = own(W.trou, own(L.bottom, 0x3A3A40)), tie = own(W.tie, 0x2A2020);
var ids, col;
switch (W.cut) {
case "lady": {
var d = own(W.coat, own(L.top != null && L.top !== 0xF2EEE2 ? L.top : null, own(L.layerColor, 0x5A2A3A)));
return wfIds({ ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.26:cloth", "oz:collar:low:none"].concat(o.r < 0.45 ? ["oz:pelerine"] : []), col: { dress: d, skirt: d, trim: 0xF0ECE4, collar: 0xF8F6F0, cape: wfDark ? wfDark(d, 0.3) : d } });
}
case "sari": return wfIds({ ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.12:cloth", "oz:sash", "oz:pelerine"], col: { dress: W.coat, skirt: W.coat, trim: W.trim, sash: W.trim, cape: W.coat }, shoes: 0x8A6A3A });
case "bare": return wfIds(wfBare({ ids: ["oz:skirt:knee:0.05:cloth", "oz:sash"], col: { skirt: W.coat, trim: W.coat, sash: 0xC8B890 }, shoes: 0x6A4A30 }, L, 1, 1));
case "frock":
ids = ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"];
break;
case "long":
ids = ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots"];
break;
case "work":
ids = ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:trousers:cloth", "oz:boots"];
break;
case "sailor":
ids = ["oz:shirt:long", "oz:collar:low:soft", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"];
break;
case "knit":
ids = ["oz:shirt:long:cloth", "oz:vest:cloth", "oz:trousers:cloth", "oz:stock:knit", "oz:boots", "oz:pelerine"];
break;
default: ids = ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"];
}
col = { shirt: W.cut === "sailor" && W.vest === 0xF2F2F2 ? 0xF2F2F2 : (W.cut === "knit" ? coat : 0xF6F4EE), collar: 0xF8F6F0, tie: tie, vest: W.cut === "knit" ? vest : vest, coat: coat, trou: trou, stock: 0xD8D0C0, cape: own(W.vest, coat) };
return wfIds({ ids: ids, col: col, shoes: 0x141010 });
},
function (add, c) {
var g = new THREE.Group(), m = vbkM(c, { r: 0.6 });
var d = new THREE.Mesh(vbkG("bowd", function () { return new THREE.SphereGeometry(0.125, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52); }), m);
d.scale.set(1, 0.95, 1.1);
g.add(d);
var b = new THREE.Mesh(vbkG("bowb", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.012, 24); }), m);
b.scale.z = 1.1;
g.add(b);
add("Head", [0, 0.13, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), m = vbkM(c, { r: 0.7 });
var t = new THREE.Mesh(vbkG("navt", function () { return new THREE.CylinderGeometry(0.135, 0.12, 0.075, 20); }), m);
t.position.y = 0.03;
t.scale.z = 1.08;
g.add(t);
var band = new THREE.Mesh(vbkG("navb", function () { return new THREE.CylinderGeometry(0.122, 0.122, 0.02, 20, 1, true); }), vbkM(0xB89A40, { r: 0.3, m: 0.8 }));
band.material.side = THREE.DoubleSide;
band.position.y = 0.002;
g.add(band);
var peak = new THREE.Mesh(vbkG("navp", function () { return new THREE.CylinderGeometry(0.1, 0.1, 0.01, 16, 1, false, -Math.PI / 2, Math.PI); }), vbkM(0x101010, { r: 0.3 }));
peak.position.set(0, -0.01, 0.07);
peak.rotation.x = 0.18;
g.add(peak);
add("Head", [0, 0.12, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), m = vbkM(c, { r: 0.9 });
var d = new THREE.Mesh(vbkG("pithd", function () { return new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5); }), m);
d.scale.set(1, 0.85, 1.15);
g.add(d);
var b = new THREE.Mesh(vbkG("pithb", function () { return new THREE.CylinderGeometry(0.2, 0.22, 0.012, 24); }), m);
b.scale.z = 1.15;
b.position.y = -0.005;
g.add(b);
add("Head", [0, 0.11, -0.01], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(vbkG("canes", function () { return new THREE.CylinderGeometry(0.009, 0.009, 0.9, 6); }), vbkM(0x1E1612, { r: 0.4 })));
var k = new THREE.Mesh(vbkG("canek", function () { return new THREE.SphereGeometry(0.02, 8, 6); }), vbkM(0xD8B040, { r: 0.3, m: 0.85 }));
k.position.y = 0.45;
g.add(k);
add("hand_r", [0, -0.35, 0], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(vbkG("harps", function () { return new THREE.CylinderGeometry(0.014, 0.016, 1.9, 6); }), vbkM(0x6A4A2A)));
var p = new THREE.Mesh(vbkG("harpp", function () { return new THREE.ConeGeometry(0.03, 0.16, 4); }), vbkM(0x8A8A90, { r: 0.3, m: 0.8 }));
p.position.y = 1.02;
g.add(p);
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(vbkG("harpw", function () { return new THREE.ConeGeometry(0.012, 0.08, 4); }), vbkM(0x8A8A90, { r: 0.3, m: 0.8 })); w.position.set(s * 0.025, 0.94, 0); w.rotation.z = s * 2.6; g.add(w); });
add("hand_r", [0, 0.2, 0], g);
},
function (add) {
var g = new THREE.Group(), m = vbkM(0xB89A40, { r: 0.3, m: 0.85 });
var a = new THREE.Mesh(vbkG("spya", function () { return new THREE.CylinderGeometry(0.022, 0.026, 0.2, 10); }), m);
g.add(a);
var b = new THREE.Mesh(vbkG("spyb", function () { return new THREE.CylinderGeometry(0.018, 0.02, 0.14, 10); }), vbkM(0x2A1E14, { r: 0.6 }));
b.position.y = 0.16;
g.add(b);
g.rotation.x = 0.4;
add("hand_l", [0, -0.02, 0.04], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(vbkG("picks", function () { return new THREE.CylinderGeometry(0.012, 0.014, 0.42, 6); }), vbkM(0x6A4A2A)));
var h = new THREE.Mesh(vbkG("pickh", function () { return new THREE.BoxGeometry(0.16, 0.025, 0.025); }), vbkM(0x5A5A60, { r: 0.4, m: 0.8 }));
h.position.y = 0.2;
g.add(h);
add("hand_r", [0, 0.05, 0], g);
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, W = VBK_WEAR[L._vb] || null;
if (!W)
return;
var hat = W.hat, hc = W.hc != null ? W.hc : (L.hatColor != null ? L.hatColor : 0x1E1A16);
if (hat) {
if (VBK_HAT[hat])
VBK_HAT[hat](add, hc, E);
else if (typeof WF_HAT !== "undefined" && WF_HAT[hat])
WF_HAT[hat](add, hc, E);
}
var h = W.held;
if (h) {
if (VBK_HELD[h])
VBK_HELD[h](add);
else if (typeof WF_HELD !== "undefined" && WF_HELD[h])
WF_HELD[h](add);
}
},
function (seed, look) {
if (look && look._vb)
return look._vb;
var k = String(seed).replace(/^vrn_/, "");
if (VBK_KEYS[k])
return VBK_KEYS[k];
if (/^f\d/.test(k) && look) {
if (look.hat === "cap" && look.bottom === 0x1E2A4A && look.top === 0xF2F2F2)
return "sailor";
if (look.sex === "f")
return look.hat === "brimmed" ? "lady" : "woman";
return look.hat === "tophat" ? "gent" : look.hat === "cap" ? "clerk" : "man";
}
return vbkRoleOf(k, look && look.sex);
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : vbkArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? vbkLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = vbkAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : vbkGround(p.x, p.z), area: a, T: T };
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
var W = vbkNamed(VRN.talk, at.who, at.room), C0 = VBK_CH[vbkS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (W && (!d0 || d0.at === at || W.area === vbkArea() || W.area === (vbkPos(d0.at) || {}).area))
return W;
if (d0 && d0.at !== at) {
var Q0 = vbkPos(d0.at);
return Q0 ? { x: Q0.x + (d0.ox || 0), z: Q0.z + (d0.oz || 0), y: Q0.y, area: Q0.area } : null;
}
}
if (at.spot) {
var Sp = vbkNamed(VRN.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = VBK.cast[at.cast], q = c && c.g && c.g.parent ? vbkLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: vbkAreaAt(q.x, q.z) };
var CC = VBK_CH[vbkS().ch], def = CC && CC.cast ? CC.cast.filter(function (d) { return d.key === at.cast; })[0] : null;
if (def)
return vbkPos(def.at);
}
if (at.room)
return vbkRoomPt(at.room, at.lx, at.lz, at.ly);
if (at.at && VRN_SPOTS[at.at]) {
var A = VRN_SPOTS[at.at], ax = A.x + (at.dx || 0), az = A.z + (at.dz || 0);
return { x: ax, z: az, y: vbkGround(ax, az), area: vbkAreaAt(ax, az) };
}
if (at.x != null) {
var y = at.y != null ? at.y : vbkGround(at.x, at.z);
return { x: at.x, y: y, z: at.z, area: at.area || vbkAreaAt(at.x, at.z), name: at.name };
}
return null;
},
function () {
var I = VRN.insideOf;
if (!I)
return null;
var best = null;
VRN.spots.forEach(function (S) { if (best || Math.abs(S.x - I.x) > 300 || Math.abs(S.z - (I.z || 0)) > 4500)
return; if (/^(go back outside|go up onto the jetty|go down to the beach)$/.test(S.verb || ""))
best = { x: S.x, z: S.z, y: S.y || 0, area: "in:" + I.key, name: S.name }; });
return best || { x: I.x, z: (I.z || 0) + (I.arrive || [0, 8])[1], y: 0, area: "in:" + I.key };
},
function (from, toArea) {
var L = VBK_LINKS[from];
if (!L)
return null;
var to = toArea.indexOf("in:") === 0 ? toArea.slice(3) : toArea, nm = L[to] || L["*"];
if (!nm)
return null;
var best = null;
VRN.spots.forEach(function (S) { if (best || S.name !== nm)
return; if (vbkAreaAt(S.x, S.z) !== "in:" + from)
return; best = { x: S.x, z: S.z, y: S.y != null ? S.y : 0, area: "in:" + from }; });
return best;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var lk = vbkLink(area.slice(3), P.area);
if (lk)
return { show: lk, way: "" };
return { show: vbkRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = vbkRoomDoor(P.area.slice(3));
inn = " (go in)";
if (!target)
return null;
}
if (target.area === area)
return { show: target, way: inn };
if (area === "home" && target.area === "island") {
var b = vbkSpotPt("The harbour master's board", "home");
return b ? { show: b, way: " (take a boat to Lincoln Island)" } : null;
}
if (area === "home" && target.area === "under") {
var c = vbkSpotPt("The middle chimney", "home");
return c ? { show: c, way: " (down the middle chimney of Snaefells, at noon)" } : null;
}
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
if (VBK.beam && VBK.beam.parent)
return VBK.beam;
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
VRN.G.add(g);
VBK.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "card":
m = wBox(0.064, 0.002, 0.09, wM(0xF4F0E4), 0, 0.01, 0, g);
wBox(0.02, 0.003, 0.02, wM(0xB8202A), 0, 0.012, 0, g);
break;
case "parchment":
m = wBox(0.2, 0.004, 0.14, wM(0xD8C8A0), 0, 0.01, 0, g);
break;
case "telegram":
m = wBox(0.18, 0.003, 0.12, wM(0xF0E8C8), 0, 0.01, 0, g);
wBox(0.18, 0.004, 0.02, wM(0x2A4A8A), 0, 0.012, -0.05, g);
break;
case "ticket":
m = wBox(0.1, 0.003, 0.05, wM(0xE8D8A8), 0, 0.01, 0, g);
break;
case "watch":
m = wCyl(0.03, 0.03, 0.012, wM(0xD8B040, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 16);
break;
case "compass":
m = wCyl(0.05, 0.05, 0.02, wM(0x8A6A3A), 0, 0.012, 0, g, 16);
wCyl(0.042, 0.042, 0.004, wM(0xF4F0E4), 0, 0.024, 0, g, 16);
break;
case "notebook":
m = wBox(0.12, 0.02, 0.16, wM(0x5A2A1E), 0, 0.012, 0, g);
break;
case "shell":
m = wSph(0.07, wM(0xF4E4D8), 0, 0.04, 0, g, 8);
m.scale.y = 0.4;
break;
case "coral":
m = wCyl(0.01, 0.02, 0.24, wM(0xE85A4A), 0, 0.12, 0, g, 5);
wCyl(0.008, 0.012, 0.14, wM(0xE85A4A), 0.04, 0.18, 0, g, 5).rotation.z = -0.6;
break;
case "stone":
m = wSph(0.1, wM(0x3A3634), 0, 0.07, 0, g, 8);
m.scale.y = 0.6;
break;
case "match":
m = wCyl(0.004, 0.004, 0.06, wM(0xE8D8B0), 0, 0.01, 0, g, 4);
m.rotation.z = Math.PI / 2;
wSph(0.007, wM(0xB8202A), 0.03, 0.01, 0, g, 5);
break;
case "lens":
m = wCyl(0.035, 0.035, 0.006, new THREE.MeshStandardMaterial({ color: 0xE8F0F8, transparent: true, opacity: 0.6, roughness: 0.05 }), 0, 0.01, 0, g, 16);
break;
case "egg":
m = wSph(0.05, wM(0xF0E8D8), 0, 0.05, 0, g, 10);
m.scale.y = 1.3;
break;
case "seed":
m = wSph(0.04, wM(0xC8A848), 0, 0.03, 0, g, 6);
break;
case "wood":
m = wCyl(0.03, 0.04, 0.5, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "feather":
m = wBox(0.02, 0.004, 0.18, wM(0xF0F0F0), 0, 0.02, 0, g);
break;
case "flag":
m = wCyl(0.008, 0.008, 0.6, wM(0x4A3A2A), 0, 0.3, 0, g, 5);
wBox(0.2, 0.12, 0.004, wM(0x141414), 0.1, 0.52, 0, g);
break;
case "scroll":
m = wCyl(0.03, 0.03, 0.24, wM(0xEAE0C4), 0, 0.04, 0, g, 8);
m.rotation.z = Math.PI / 2;
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
var g = vbkItemMesh(kind);
g.position.set(P.x, P.y + 0.02, P.z);
VRN.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = vrnSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (VBK.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = VRN.spots.indexOf(I.S);
if (j >= 0)
VRN.spots.splice(j, 1);
VBK.items = VBK.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[vbk] take", e);
}
}, P.y);
I.S.vbk = 1;
VBK.items.push(I);
return I;
},
function (k) {
if (VBK.tuneKey === k)
return;
VBK.tuneKey = k;
var old = VBK.tune;
VBK.tune = null;
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
if (!k || !VBK_TUNES[k])
return;
try {
var A = new Audio(VBK_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
VBK.tune = A;
var v = window.VBK_VOL != null ? window.VBK_VOL : 0.26, fi = setInterval(function () { try {
if (VBK.tune !== A) {
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
if (VBK.text)
return fn(VBK.text);
if (VBK.textWait) {
VBK.textWait.push(fn);
return;
}
VBK.textWait = [fn];
var done = function (B) { VBK.text = B; var w = VBK.textWait; VBK.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
var bk = VBK_BK, url = vbkBook().text, done0 = done;
done = function (B) { if (B)
VBK.texts[bk] = B; if (VBK_BK !== bk) {
var w = VBK.textWait;
VBK.textWait = null;
(w || []).forEach(function (f) { try {
f(null);
}
catch (e) { } });
return;
} done0(B); };
try {
fetch(url).then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
vbkText(function (B) {
var T = vbkPassage(B, i), C = VBK_CH[i];
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + vbkEsc(T.src) + "</div><h3 style='margin:4px 0'>" + vbkNum(i) + ". " + vbkEsc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(vbkParaHtml).join("") + "</div>";
var fns = { back: function () { worldCard(null); VBK.readOpen = 0; VBK.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = vbkS(), C = VBK_CH[S.ch];
if (!C)
return;
VBK.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
VBK.readAsk = 0;
VBK.readOpen = 1;
var T = vbkPassage(B, ch), open = T ? vbkOpening(T).map(vbkParaHtml).join("") : (C.words ? vbkParaHtml(C.words) : "");
var b = "<div style='font-size:12px;opacity:.7'>" + vbkEsc(T ? T.src : (C.src || vbkBook().title)) + "</div><h3 style='margin:4px 0'>" + vbkNum(ch) + ". " + vbkEsc(C.t) + "</h3>" + (C.words && T ? "<p style='margin:6px 0'>" + vbkEsc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + open + "</div>";
var fns = { go: function () { worldCard(null); VBK.readOpen = 0; vbkStepDone(); }, all: function () { vbkReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Step into the story");
if (T)
b += worldBtn("all", "📜 Read the whole passage", "Verne's own words, all of them");
b += vbkKeeperBtns(fns);
worldCard(b, fns);
};
vbkText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
VBK_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); vbkJump(i); }; });
return b + "</div>";
},
function () {
var b = vbkStep();
vbkItemsClear();
VBK.hold = 0;
VBK.puzOpen = 0;
if (!b)
return;
b._t0 = performance.now();
b._key = vbkKey();
try {
if (b.on)
b.on(vbkS().f);
}
catch (e) {
if (window.console)
console.warn("[vbk] on", e);
}
if (b.k === "read") {
vbkChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { VBK.rew[k] = 0; });
if (b.k === "find")
vbkItemAdd(b.item, vbkPos(b.at), b.name, b.verb, function () { if (vbkKey() === b._key)
vbkStepDone(); });
if (b.k === "gather") {
var P = vbkPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(vbkS().ch * 97 + vbkS().s * 13 + 7);
VBK.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = P.area.indexOf("in:") === 0 ? (P.y || 0) : vbkGround(Q.x, Q.z);
vbkItemAdd(b.item, Q, b.name, b.verb, function () { if (vbkKey() !== b._key)
return; VBK.got++; if (VBK.got < n) {
vbkSay((b.each || "Got one.") + " " + VBK.got + " of " + n + ".");
return;
} vbkStepDone(); });
}
}
if (b.h)
vbkSay("<b>" + vbkEsc(VBK_CH[vbkS().ch].t) + ".</b> " + b.h);
},
function (b) {
VBK.puzOpen = 1;
VBK.puzT = performance.now();
var k = vbkKey(), fns = {}, h = VRN_H + vbkEsc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
vbkSay(b.yes);
if (vbkKey() === k)
vbkStepDone();
return;
}
vbkSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (vbkKey() === k)
VBK.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = vbkS(), C = VBK_CH[S.ch], b = vbkStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[vbk] done", e);
}
if (b.say)
vbkSay(typeof b.say === "function" ? b.say() : b.say);
S.s++;
if (window.VBK_LOG)
VBK_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= VBK_CH.length - 1) {
S.done = 1;
S.s = 0;
vbkSave();
vbkItemsClear();
vbkFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
vbkSave();
var nx = VBK_CH[S.ch];
setTimeout(function () { try {
vbkChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[vbk]", e);
} }, window.VBK_FAST ? 10 : 2600);
return;
}
vbkSave();
vbkStepBegin();
},
function () {
var S = vbkS(), B = vbkBook();
if (B.finish) {
try {
B.finish(S);
return;
}
catch (e) {
if (window.console)
console.warn("[vbk] finish", e);
}
}
vbkTune("danube");
var b = "<h3 style='margin:4px 0'>Jules Verne closes the book</h3><p style='font-style:italic'>\"Phileas Fogg had won his wager... But what then? What had he really gained by all this trouble? Nothing, say you? Perhaps so; nothing but a charming woman, who, strange as it may appear, made him the happiest of men! Truly, would you not for less than that make the tour around the world?\"</p><p>You have sailed, dived, climbed, flown and fallen with every one of them, and come home each time. Your keepsakes, one from every chapter:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + vbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; vbkSave(); vbkChapterBegin(true); } };
b += worldBtn("again", "Read the voyages again from the start", "Verne's house on the quay");
worldCard(b, fns);
},
function (k) {
if (k)
vbkUse(k);
var B = vbkBook(), S = vbkS(), C = VBK_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>" + vbkEsc(B.by) + "</div><h3 style='margin:4px 0'>" + B.icon + " " + vbkEsc(B.title) + "</h3>";
if (S.done)
b += "<p>You have walked it to the end. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + vbkNum(S.ch) + ". " + vbkEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + vbkEsc((vbkStep() || {}).h || "") + "</p>";
else
b += "<p>" + vbkEsc(B.blurb) + " " + VBK_CH.length + " chapters, every one played. Your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: " + B.begin, S.started ? "Back to where you were" : "");
fns.go = function () { worldCard(null); vbkBegin(); };
}
else {
b += worldBtn("again", "Read it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; vbkSave(); vbkBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + vbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
var others = Object.keys(VBK_BOOKS).filter(function (x) { return x !== VBK_BK && !VBK_BOOKS[x].away; });
if (others.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Verne's other books on the shelf</div>";
others.forEach(function (x) { var O = VBK_BOOKS[x], OS = store[O.store]; b += worldBtn("bk_" + x, O.icon + " " + O.title, OS && OS.done ? "Walked to the end" : OS && OS.started ? "Carry on at chapter " + (OS.ch + 1) : O.ch.length + " chapters"); fns["bk_" + x] = function () { vbkOpen(x); }; });
}
b += vbkKeeperBtns(fns);
worldCard(b, fns);
},
function (T) {
if (!vbkActive())
return false;
var b = vbkStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = vbkKey();
worldPrompt(null);
var next = function () { if (vbkKey() === k)
vbkStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
if (window.console)
console.warn("[vbk] act", e);
next();
}
}
else
next(); } };
worldCard(VRN_H + vbkEsc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
var C = VBK.cast[c.key];
if (vbkCastLive(C))
return C;
if (C) {
try {
if (C.g && C.g.parent)
C.g.parent.remove(C.g);
}
catch (e) { }
VRN.talk = VRN.talk.filter(function (T) { return T.p !== C.P; });
VRN.people = VRN.people.filter(function (p) { return p !== C.P; });
delete VBK.cast[c.key];
}
var P = vbkPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = VRN.G;
var I = null;
if (inside) {
I = VRN_IN[P.area.slice(3)];
if (!I || !I.built || !I.grp)
return null;
parent = I.grp;
}
var look = Object.assign({ sex: c.sex || "m" }, c.look || {});
look._vb = c.role || vbkRoleOf(c.name, look.sex);
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = inside ? (P.y || 0) : vbkGround(px, pz);
var F = { name: c.name, look: look, persona: c.persona || ("You are " + c.name + " from Jules Verne's novels, in the year 1870 or so. Speak as the book has you speak. Never mention films."), greet: c.greet || "Good day to you." };
var Q = vrnPerson(parent, F, px, pz, c.ry || 0, { y: py, r: c.r || 3, wander: c.wander || 0 });
if (!Q)
return null;
VBK.cast[c.key] = { g: Q.g, P: Q, c: c, home: I };
return VBK.cast[c.key];
},
function () {
var C = VBK_CH[vbkS().ch];
if (!C || !C.cast)
return;
C.cast.forEach(function (c) {
if (vbkCastLive(VBK.cast[c.key]))
return;
var P = vbkPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
var I = VRN_IN[P.area.slice(3)];
if (!I || !I.built)
return;
}
else if (vbkDist(P, worldLocal()) > 400 && !((vbkStep() || {}).who === c.name))
return;
vbkPerson(c);
});
},
function (dt) {
if (!VRN.G || !VRN.built)
return;
VBK.wt += dt;
if (VBK.wt > 0.5) {
VBK.wt = 0;
vbkWrap();
if (vbkActive())
vbkCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!vbkActive()) {
if (VBK.beam)
VBK.beam.visible = false;
if (!cardOpen && !WLD.promptFn && !VRN.moving && !vrnCine() && !VRN.ride)
worldPrompt("📚 <b>Jules Verne's books</b> · <b>press E</b> to walk Verne's own stories", function () { vbkOpen(); });
return;
}
var S = vbkS(), b = vbkStep(), L = worldLocal(), t = VRN.t || 0, area = vbkAreaAt(L.x, L.z);
VBK.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? vbkPos(b.at) : null, W = P ? vbkWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "";
var bm = vbkBeam();
if (show && !VRN.moving) {
bm.visible = true;
var cd = vbkDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = vbkWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !VRN.moving) {
var inArea = P && P.area === area, fd = P ? vbkDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (VBK.readAsk)
break;
if (!VBK.readOpen)
vbkChapterCard();
else {
VBK.readOpen = 0;
vbkStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null && !b.at.who && !b.at.spot ? true : fd < (b.r || 6))) {
vbkStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
VBK.hold += dt;
if (VBK.hold >= (b.sec || 8)) {
vbkStepDone();
return;
}
}
else
VBK.hold = 0;
break;
case "reward":
if (vbkRewGot(b)) {
vbkStepDone();
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
vbkStepDone();
return;
}
break;
}
case "puzzle":
if ((!VBK.puzOpen || performance.now() - (VBK.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
vbkPuzzleCard(b);
break;
}
}
if (!cardOpen && !WLD.promptFn && !VRN.moving && !vrnCine() && !VRN.ride)
worldPrompt(vbkBook().icon + " <b>" + vbkEsc(vbkBook().title) + "</b> · <b>press E</b> for the book", function () { vbkOpen(); });
var C = VBK_CH[S.ch], prog = b && b.k === "hold" && VBK.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - VBK.hold)) + " s)" : b && b.k === "gather" ? " (" + (VBK.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner(vbkBook().icon + " <b>" + vbkNum(S.ch) + ". " + vbkEsc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
}
];
});
