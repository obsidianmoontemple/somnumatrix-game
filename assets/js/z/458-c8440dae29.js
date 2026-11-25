/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(458, function () {
return [
function (L, o) {
var r = L._gb || "peasm", W = GBK_WEAR[r] || GBK_WEAR.peasm;
if (typeof ozwFromLook !== "function")
return null;
var x = Object.assign({}, W.x), kid = !!L._gk;
var top = L.top != null ? L.top : 0x8A7A6A, lc = L.layerColor != null ? L.layerColor : null;
if (W.f) {
if (x.dress == null)
x.dress = top;
if (x.skirt == null)
x.skirt = L.bottom != null && L.topKind !== "dress" ? L.bottom : top;
if (r === "courtf" && L.back === "cape" && L.backColor != null)
x.pelerine = L.backColor;
if (r === "redcap") {
x.dress = 0xC8202A;
x.skirt = 0x8A1A1E;
}
if (lc != null && L.layer === "apron")
x.apron = lc;
if (kid && x.len === "ankle")
x.len = "calf";
}
else {
if (x.coat && x.coatCol == null)
x.coatCol = lc != null ? lc : ozwDark(top, 0.15);
if (x.trou == null && L.bottom != null)
x.trou = L.bottom;
if (!x.coat && x.shirt == null)
x.shirt = 0xF0ECE0;
if (x.vest != null && L.layer === "vest" && lc != null)
x.vest = lc;
if (r === "peasm" && L.top != null)
x.coatCol = ozwDark(L.top, 0.1);
}
var R = ozwFromLook(L, { f: !!W.f, kid: kid, lk: "gbk" }, x);
if (R && R.col) {
if (x.sash != null)
R.col.sash = x.sash;
else if (!R.col.sash)
R.col.sash = 0x8A2A2A;
if (x.trim != null)
R.col.trim = x.trim;
if (!R.col.apron)
R.col.apron = 0x6A4A2A;
}
return R;
},
function (col, h, points) {
var g = new THREE.Group(), m = gbkM(col, { r: 0.25, m: 0.9 });
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.118, 0.12, h, 22, 1, true), m);
band.material.side = THREE.DoubleSide;
g.add(band);
for (var i = 0; i < points; i++) {
var a = i / points * Math.PI * 2, p = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.05, 6), m);
p.position.set(Math.cos(a) * 0.118, h / 2 + 0.022, Math.sin(a) * 0.118);
g.add(p);
if (i % 2 === 0) {
var j = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 6), gbkM([0xC81A2A, 0x2A5AC8, 0x2AA85A][i % 3], { r: 0.15, m: 0.2 }));
j.position.set(Math.cos(a) * 0.121, 0, Math.sin(a) * 0.121);
g.add(j);
}
}
return g;
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, r = String(L._gb || ""), h = L._gh || "", hc = L._ghc != null ? L._ghc : 0x3A2A1A, g, m;
if (r === "courtm" || r === "courtf") {
var big = h === "crown" || /^(king|queen)/.test(L._gn || "");
g = gbkCrown(0xE8C040, big ? 0.07 : 0.03, big ? 8 : 10);
add("Head", [0, 0.135, -0.01], g);
return;
}
if (r === "redcap") {
g = new THREE.Group();
m = gbkM(0xC8121E, { r: 0.85, stuff: "velvet" });
var cp = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52), m);
cp.material.side = THREE.DoubleSide;
cp.scale.set(1.06, 0.95, 1.12);
g.add(cp);
var ti = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 6), m);
ti.position.set(0, 0.02, -0.15);
g.add(ti);
add("Head", [0, 0.115, -0.025], g);
return;
}
if (r === "dwarf") {
m = gbkM(hc, { r: 0.95 });
g = new THREE.Group();
var hd = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.34, 14, 1, true), m);
hd.material.side = THREE.DoubleSide;
hd.position.y = 0.13;
hd.rotation.x = -0.25;
hd.position.z = -0.04;
g.add(hd);
add("Head", [0, 0.08, -0.01], g);
return;
}
if (r === "hunt") {
g = new THREE.Group();
m = gbkM(0x2E4A26, { r: 0.9 });
g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.014, 22), m));
var cw = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.12, 18), m);
cw.position.y = 0.06;
g.add(cw);
var fe = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), gbkM(0x6A6A5A, { r: 0.8 }));
fe.scale.set(0.5, 0.4, 4);
fe.position.set(0.1, 0.08, -0.04);
fe.rotation.x = 0.5;
g.add(fe);
add("Head", [0, 0.14, -0.01], g);
return;
}
if (r === "soldier") {
g = new THREE.Group();
m = gbkM(0x141418, { r: 0.8 });
var bc = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m);
bc.scale.set(1.3, 0.55, 0.55);
bc.material.side = THREE.DoubleSide;
g.add(bc);
var ck = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.01, 12), gbkM(0xF2EEE6, { r: 0.6 }));
ck.rotation.x = Math.PI / 2;
ck.position.set(0.12, 0.06, 0.07);
g.add(ck);
add("Head", [0, 0.12, -0.01], g);
return;
}
if (r === "miller") {
var mc = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), gbkM(0xF2F0EA, { r: 1 }));
mc.scale.set(1.05, 0.8, 1.1);
add("Head", [0, 0.11, -0.02], mc);
return;
}
if (r === "henry") {
var hb = new THREE.Group(), im = gbkM(0x4A4A50, { r: 0.4, m: 0.9 });
for (var b = 0; b < 3; b++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.01, 6, 24), im);
t.rotation.x = Math.PI / 2;
t.position.y = -0.05 + b * 0.05;
hb.add(t);
}
add("spine_03", [0, 0, 0.01], hb);
return;
}
if (r === "oldf" || r === "holle") {
var oc = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), gbkM(r === "holle" ? 0xFFFFFF : 0xF2EEE4, { r: 1 }));
oc.material.side = THREE.DoubleSide;
oc.scale.set(1.06, 1, 1.12);
add("Head", [0, 0.1, -0.03], oc);
return;
}
if (r === "witch") {
var ws = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.62), gbkM(0x1E1A22, { r: 1 }));
ws.material.side = THREE.DoubleSide;
ws.scale.set(1.08, 1.05, 1.14);
add("Head", [0, 0.09, -0.03], ws);
return;
}
if (r === "burgm" && h === "tophat") {
g = new THREE.Group();
m = gbkM(hc, { r: 0.6 });
g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.014, 22), m));
var th = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.2, 20), m);
th.position.y = 0.1;
g.add(th);
add("Head", [0, 0.14, -0.01], g);
return;
}
if (r === "peasf" && !L._gk) {
var pc = new THREE.Mesh(new THREE.SphereGeometry(0.128, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.42), gbkM(0xF4F0E6, { r: 1 }));
pc.material.side = THREE.DoubleSide;
pc.scale.set(1.05, 0.9, 1.1);
add("Head", [0, 0.12, -0.04], pc);
return;
}
if ((r === "peasm" || r === "tradem") && (h === "brimmed" || h === "cap" || h === "beanie")) {
g = new THREE.Group();
m = gbkM(hc, { r: 0.95 });
if (h === "brimmed") {
g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.012, 20), m));
var bw = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.1, 16), m);
bw.position.y = 0.05;
g.add(bw);
add("Head", [0, 0.14, -0.01], g);
}
else {
var cc = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m);
cc.material.side = THREE.DoubleSide;
cc.scale.set(1.06, 0.85, 1.12);
add("Head", [0, 0.11, -0.02], cc);
}
return;
}
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "room:" + room : gbkArea();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var x, z, y;
if (T.p && T.p.g) {
try {
T.p.g.updateWorldMatrix(true, false);
}
catch (er) { }
var e = T.p.g.matrixWorld.elements;
x = e[12] - GMM.base;
z = e[14];
y = e[13];
}
else {
x = T.x;
z = T.z;
y = T.y;
}
var rk = gbkRoomAtX(x), P = { x: x, z: z, y: y != null ? y : (rk ? 0 : gmmGround(x, z)), area: rk ? "room:" + rk : "out", T: T };
if (room && P.area !== here)
return;
if (!out || P.area === here)
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
var W = gbkNamed(GMM.talk, at.who, at.room);
if (W)
return W;
}
if (at.spot) {
var Sp = gbkNamed(GMM.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.room) {
var R = GMM_ROOMS[at.room];
if (!R)
return null;
return { x: R.x + (at.lx || 0), y: at.y || 0, z: at.lz != null ? at.lz : 0, area: "room:" + at.room };
}
if (at.x != null) {
var y = at.y != null ? at.y : gmmGround(at.x, at.z);
return { x: at.x, y: y, z: at.z, area: "out" };
}
return null;
},
function (k) {
var R = GMM_ROOMS[k], n = 0;
while (R && !R.door && R.back && n < 6) {
R = GMM_ROOMS[R.back];
n++;
}
if (R && R.door)
return { x: R.door.x, z: R.door.z, y: gmmGround(R.door.x, R.door.z), area: "out" };
for (var q in GMM_ROOMS) {
var O = GMM_ROOMS[q];
if (O.door && O.links && O.links.indexOf(k) >= 0)
return { x: O.door.x, z: O.door.z, y: gmmGround(O.door.x, O.door.z), area: "out" };
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
return Math.round(d) + " m " + w;
},
function () {
if (GBK.beam && GBK.beam.parent)
return GBK.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xFFE8A8, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xFFD878, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF0C0, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
GMM.G.add(g);
GBK.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "crumb":
m = wSph(0.05, wM(0xC8A060), 0, 0.04, 0, g, 6);
break;
case "pebble":
m = wSph(0.11, wM(0xF4F6FA, { e: 0x6A7080, ei: 0.5 }), 0, 0.07, 0, g, 10);
m.scale.y = 0.6;
break;
case "flower":
m = wSph(0.08, wM([0xD8343A, 0xE8C030, 0x6A4AD8, 0xF0F0F4][Math.floor(Math.random() * 4)]), 0, 0.32, 0, g, 8);
wCyl(0.01, 0.01, 0.3, wM(0x3A7A2A), 0, 0.15, 0, g, 4);
break;
case "apple":
m = wSph(0.08, wM(0xC82A22), 0, 0.08, 0, g, 10);
break;
case "bread":
m = wSph(0.16, wM(0xC8904A), 0, 0.1, 0, g, 10);
m.scale.set(1.4, 0.6, 1);
break;
case "feather":
m = wSph(0.1, wM(0xFFFFFF), 0, 0.04, 0, g, 8);
m.scale.set(0.3, 0.1, 1.2);
break;
case "straw":
m = wCyl(0.25, 0.3, 0.25, wM(0xE8C870), 0, 0.12, 0, g, 10);
break;
case "stone":
m = wSph(0.16, wM(0x8A8478), 0, 0.1, 0, g, 8);
m.scale.y = 0.7;
break;
case "twig":
m = wCyl(0.012, 0.016, 0.5, wM(0xC8C8D8, { e: 0x5A5A6A, ei: 0.4 }), 0, 0.04, 0, g, 5);
m.rotation.z = Math.PI / 2;
break;
case "shoe":
m = wBox(0.1, 0.07, 0.24, wM(0xE8C040, { e: 0x5A4010, ei: 0.3 }), 0, 0.04, 0, g);
break;
case "key":
m = wCyl(0.012, 0.012, 0.16, wM(0xC8A050), 0, 0.06, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "basket":
m = wCyl(0.18, 0.14, 0.18, wM(0x9A7040), 0, 0.09, 0, g, 12);
break;
case "chalk":
m = wBox(0.04, 0.04, 0.12, wM(0xF4F4F0), 0, 0.03, 0, g);
break;
case "flour":
m = wCyl(0.14, 0.16, 0.28, wM(0xEAE4D4), 0, 0.14, 0, g, 10);
break;
case "spindle":
m = wCyl(0.012, 0.012, 0.3, wM(0xC8A070), 0, 0.04, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "rose":
m = wSph(0.09, wM(0xD8243A), 0, 0.4, 0, g, 10);
wCyl(0.01, 0.01, 0.38, wM(0x3A6A2A), 0, 0.19, 0, g, 4);
break;
case "shell":
m = wSph(0.07, wM(0xF4E4D8), 0, 0.04, 0, g, 8);
m.scale.y = 0.4;
break;
case "cheese":
m = wCyl(0.08, 0.08, 0.06, wM(0xE8D070), 0, 0.03, 0, g, 10);
break;
case "comb":
m = wBox(0.12, 0.02, 0.05, wM(0xE8E0C8), 0, 0.04, 0, g);
break;
case "lace":
m = wMesh(new THREE.TorusGeometry(0.1, 0.012, 4, 16), wM(0xE85A8A), 0, 0.03, 0, g);
m.rotation.x = Math.PI / 2;
break;
case "herb":
m = wSph(0.12, wM(0x4A8A3A), 0, 0.12, 0, g, 8);
m.scale.y = 1.4;
break;
case "ring":
m = wMesh(new THREE.TorusGeometry(0.03, 0.008, 6, 14), wM(0xE8C040, { e: 0x5A4010, ei: 0.4 }), 0, 0.05, 0, g);
break;
case "page":
m = wBox(0.2, 0.01, 0.28, wM(0xF0E8D0), 0, 0.02, 0, g);
break;
default: m = wSph(0.1, wM(0xE8D8A8, { e: 0x5A4A20, ei: 0.4 }), 0, 0.15, 0, g, 10);
}
var gl = wGlow(0xFFF0B0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = gbkItemMesh(kind);
g.position.set(P.x, P.y + 0.02, P.z);
GMM.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = gmmSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (GBK.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = GMM.spots.indexOf(I.S);
if (j >= 0)
GMM.spots.splice(j, 1);
GBK.items = GBK.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[gbk] take", e);
}
}, P.y);
I.S.gbk = 1;
GBK.items.push(I);
return I;
},
function (k) {
if (GBK.tuneKey === k)
return;
GBK.tuneKey = k;
var old = GBK.tune;
GBK.tune = null;
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
if (!k || !GBK_TUNES[k])
return;
try {
var A = new Audio(GBK_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
GBK.tune = A;
var v = window.GBK_VOL != null ? window.GBK_VOL : 0.28, fi = setInterval(function () { try {
if (GBK.tune !== A) {
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
function () {
var S = gbkS(), C = GBK_CH[S.ch];
if (!C)
return;
GBK.readAsk = 1;
var done = false, show = function (B) {
if (done)
return;
done = true;
GBK.readAsk = 0;
GBK.readOpen = 1;
var T = C.n ? gbkTale(B, C.n) : null, open = T ? T.t.p.slice(0, 2).map(function (p) { return "<p style='margin:6px 0;font-style:italic'>" + gbkEsc(p) + "</p>"; }).join("") : (C.words ? "<p style='margin:6px 0;font-style:italic'>" + gbkEsc(C.words) + "</p>" : "");
var b = "<div style='font-size:12px;opacity:.7'>The Brothers Grimm, Household Tales" + (C.n ? " · No. " + C.n : "") + " · Margaret Hunt's English (1884)</div><h3 style='margin:4px 0'>" + (S.ch + 1) + ". " + gbkEsc(C.t) + "</h3>" + open;
var fns = { go: function () { worldCard(null); GBK.readOpen = 0; gbkStepDone(); }, all: function () { if (T && typeof gmmBookTale === "function") {
gmmBookTale(T.i);
} } };
b += worldBtn("go", "▶ Begin the tale", C.intro || "Step into the book");
if (T)
b += worldBtn("all", "📖 Read the whole tale", "the brothers' own words, all of them");
b += gbkKeeperBtns(fns);
worldCard(b, fns);
};
gbkText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any tale</div><div>";
GBK_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); gbkJump(i); }; });
return b + "</div>";
},
function (st) {
if (st.room) {
gmmEnterRoom(st.room, null);
return;
}
if (GMM.room) {
gmmOutside({ x: st.x, z: st.z, ry: st.ry || 0 });
return;
}
camera.position.set(GMM.base + st.x, gmmGround(st.x, st.z, 1e4) + 1.72, st.z);
if (st.ry !== undefined)
yaw = st.ry;
pitch = 0;
GMM.zone = gmmZoneAt(st.x, st.z);
if (GMM.trees)
try {
gmmForestFill(st.x, st.z, true);
}
catch (e) { }
},
function () {
var b = gbkStep();
gbkItemsClear();
GBK.hold = 0;
if (!b)
return;
b._t0 = performance.now();
b._key = gbkKey();
try {
if (b.on)
b.on(gbkS().f);
}
catch (e) {
if (window.console)
console.warn("[gbk] on", e);
}
if (b.k === "read") {
gbkChapterCard();
return;
}
if (b.k === "reward")
GBK.rew[b.kind] = 0;
if (b.k === "find")
gbkItemAdd(b.item, gbkPos(b.at), b.name, b.verb, function () { var k = gbkKey(); if (k === b._key)
gbkStepDone(); });
if (b.k === "gather") {
var P = gbkPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(gbkS().ch * 97 + gbkS().s * 13 + 7);
GBK.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
if (P.area === "out")
Q.y = gmmGround(Q.x, Q.z);
else {
var RR = GMM_ROOMS[P.area.slice(5)];
Q.x = Math.max(RR.x - RR.w / 2 + 0.7, Math.min(RR.x + RR.w / 2 - 0.7, Q.x));
Q.z = Math.max(-RR.d / 2 + 0.7, Math.min(RR.d / 2 - 0.7, Q.z));
Q.y = P.y || 0;
}
gbkItemAdd(b.item, Q, b.name, b.verb, function () { if (gbkKey() !== b._key)
return; GBK.got++; if (GBK.got < n) {
gbkSay((b.each || "Got one.") + " " + GBK.got + " of " + n + ".");
return;
} gbkStepDone(); });
}
}
if (b.h)
gbkSay("<b>" + gbkEsc(GBK_CH[gbkS().ch].t) + ".</b> " + b.h);
},
function () {
var S = gbkS(), C = GBK_CH[S.ch], b = gbkStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[gbk] done", e);
}
if (b.say)
gbkSay(b.say);
S.s++;
if (window.GBK_LOG)
GBK_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= GBK_CH.length - 1) {
S.done = 1;
S.s = 0;
gbkSave();
gbkItemsClear();
gbkFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
gbkSave();
var nx = GBK_CH[S.ch];
setTimeout(function () { try {
gbkChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[gbk]", e);
} }, window.GBK_FAST ? 10 : 2600);
return;
}
gbkSave();
gbkStepBegin();
},
function () {
gbkTune("joy");
var S = gbkS();
var b = "<h3 style='margin:4px 0'>Kinder- und Hausmärchen</h3><p style='font-style:italic'>Berlin, 20 December 1812: the first volume of the Children's and Household Tales comes off the press, with eighty-six tales in it.</p><p>You have walked every tale of the Grimm Wood, beginning to end. Your keepsakes, one from every tale:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + gbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; gbkSave(); gbkChapterBegin(true); } };
b += worldBtn("again", "Walk the tales again from the start", "The inn, and Dorothea Viehmann by the fire");
worldCard(b, fns);
},
function () {
var S = gbkS(), C = GBK_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Kassel, 1812 · the Brothers Grimm</div><h3 style='margin:4px 0'>📖 The Tales of Kassel</h3>";
if (S.done)
b += "<p>You have walked every tale. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + gbkEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + gbkEsc((gbkStep() || {}).h || "") + "</p>";
else
b += "<p>Dorothea Viehmann tells the tales by the fire at the inn, and the brothers write them down. Walk each one, beginning to end: " + GBK_CH.length + " tales, all over the wood, about three hours and more at your own pace. Your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the inn at Kassel", S.started ? "Back to where you were" : "October 1812");
fns.go = function () { worldCard(null); gbkBegin(); };
}
else {
b += worldBtn("again", "Walk them again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; gbkSave(); gbkBegin(); };
}
b += worldBtn("read", "📖 The whole book", "all 200 tales, the brothers' own words");
fns.read = function () { GBK.readOpen = 0; if (typeof gmmBook === "function")
gmmBook(); };
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + gbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += gbkKeeperBtns(fns);
worldCard(b, fns);
},
function (T) {
if (!gbkActive())
return false;
var b = gbkStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = gbkKey();
worldPrompt(null);
if (b.card) {
gmmCard(b.card[0], GBK_CH[gbkS().ch].t, b.card[1], [[b.card[2] || "▶ Go on", "", function () { if (gbkKey() === k)
gbkStepDone(); }]]);
return true;
}
gbkStepDone();
return true;
},
function (dt) {
if (!GMM.G)
return;
GBK.wt += dt;
if (GBK.wt > 0.5) {
GBK.wt = 0;
gbkWrap();
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!gbkActive()) {
if (GBK.beam)
GBK.beam.visible = false;
if (!cardOpen && !WLD.promptFn && !GMM.moving && !GMM.lift)
worldPrompt("📖 <b>The Tales of Kassel</b> · <b>press E</b> to walk the tales", gbkOpen);
return;
}
var S = gbkS(), b = gbkStep(), L = worldLocal(), t = GMM.t || 0, area = gbkArea();
GBK.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? gbkPos(b.at) : null, show = null, way = "";
if (P) {
if (P.area === area)
show = P;
else if (area === "out" && P.area.indexOf("room:") === 0) {
show = gbkRoomDoor(P.area.slice(5));
way = " (go in)";
}
else if (area !== "out") {
show = gbkRoomExit();
way = P.area === area ? "" : " (go out)";
}
}
var bm = gbkBeam();
if (show && !GMM.moving) {
bm.visible = true;
var cd = gbkDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
bm.userData.col.visible = show.area === "out" && cd > 14;
bm.userData.col.scale.set(1, 40, 1);
bm.userData.col.position.y = 20;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = gbkWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !GMM.moving) {
var inArea = P && P.area === area, fd = P ? gbkDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (GBK.readAsk)
break;
if (!GBK.readOpen)
gbkChapterCard();
else {
GBK.readOpen = 0;
gbkStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 5))) {
gbkStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
GBK.hold += dt;
if (GBK.hold >= (b.sec || 8)) {
gbkStepDone();
return;
}
}
else
GBK.hold = 0;
break;
case "reward":
if (GBK.rew[b.kind]) {
gbkStepDone();
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
gbkStepDone();
return;
}
break;
}
}
}
if (!cardOpen && !WLD.promptFn && !GMM.moving && !GMM.lift)
worldPrompt("📖 <b>The Tales of Kassel</b> · <b>press E</b> for the book", gbkOpen);
var C = GBK_CH[S.ch], prog = b && b.k === "hold" && GBK.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - GBK.hold)) + " s)" : b && b.k === "gather" ? " (" + (GBK.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("📖 <b>" + (S.ch + 1) + ". " + gbkEsc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
}
];
});
