/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(499, function () {
return [
function () {
if (!bhnSigned())
return;
bhnRpc("bhn_rules").then(function (o) { if (o && o.ok)
BHN.rules = o.chances || null; }).catch(function () { });
bhnRpc("bhn_mine").then(function (o) {
if (!o || !o.ok)
return;
var d = bhnData(), ch = false;
Object.keys(o.fin || {}).forEach(function (k) { if (BHN_BOOKS[k] && !d.fin[k]) {
d.fin[k] = +o.fin[k] || Date.now();
ch = true;
} });
Object.keys(o.wins || {}).forEach(function (k) { if (BHN_BOOKS[k] && (+o.wins[k] || 0) > (+d.wins[k] || 0)) {
d.wins[k] = +o.wins[k];
ch = true;
} });
if (ch)
bhnSave();
}).catch(function () { });
},
function (B) {
var h = B.how || "", d = bhnData();
try {
if (h.indexOf("st:") === 0) {
var S = store[h.slice(3)];
return !!(S && S.done);
}
if (h.indexOf("ct:") === 0) {
var id = h.slice(3), W = typeof CT_W !== "undefined" && CT_W[id];
if (!W || !W.ch)
return false;
var D = store.tales, n = D && D.ch && +D.ch[id] || 0;
return n >= W.ch.length;
}
if (h.indexOf("oz:") === 0) {
var n2 = +h.slice(3), O = store.oz;
if (!O)
return false;
var L = window[n2 === 1 ? "OZ_CH" : "OZ_CH" + n2];
if (!L || !L.length)
return false;
var ch = n2 === 1 ? O.ch : (O["b" + n2] && O["b" + n2].ch);
return +ch >= L.length;
}
if (h === "ti") {
var P = store.prw;
return !!(P && P.ti && P.ti.done);
}
if (h === "ovy") {
if (typeof OVY === "undefined" || typeof OVY_CH === "undefined" || !OVY_CH.length)
return false;
return OVY_CH.every(function (C) { return !!OVY.done[C.k]; });
}
}
catch (e) { }
return !!d.fin[B.k];
},
function () {
var d = bhnData(), first = Date.now() - BHN.t0 < 45000, old = [];
BHN_ORDER.forEach(function (k) {
var B = BHN_BOOKS[k];
if (d.fin[k] || B.how === "ext")
return;
if (!bhnIsDone(B))
return;
if (first) {
old.push(B);
bhnFinish(k, true, true);
}
else
bhnFinish(k, true);
});
if (old.length)
bhnSay("🏅 <b>Book honours</b> for " + old.length + " book" + (old.length === 1 ? "" : "s") + " you had already finished: " + old.map(function (B) { return B.b[1] + " " + bhnEsc(B.b[0]); }).join(", ") + ". See them in ☰ Menu › 🏅 Book honours.");
},
function (k, quiet, silent) {
var B = BHN_BOOKS[k];
if (!B)
return;
var d = bhnData(), first = !d.fin[k];
if (first) {
d.fin[k] = Date.now();
bhnSave();
}
if (bhnSigned() && !BHN.pend["f" + k]) {
BHN.pend["f" + k] = 1;
bhnRpc("bhn_finish", { p_book: k }).then(function (o) { BHN.pend["f" + k] = 0; if (o && o.ok && o.new && typeof loadThings === "function")
loadThings(); })
.catch(function (e) { BHN.pend["f" + k] = 0; });
}
if (first && !silent)
setTimeout(function () { bhnFinishCard(B); }, quiet ? 1800 : 400);
},
function (B) {
var h = "<div style='text-align:center'>" + bhnBadgeHtml(B, 96, true) + "<div style='font:600 19px var(--serif,Georgia);color:#FFE7B0;margin-top:6px'>" + bhnEsc(B.t) + ": finished</div>" +
"<div style='margin:4px 0 8px;opacity:.9'>Your badge: <b>" + bhnEsc(B.b[0]) + "</b></div></div>" +
"<div style='margin:6px 0'>🏠 For your home: " + B.d.map(function (x) { return "<b>" + bhnEsc(x[0]) + "</b>"; }).join(" and ") + (bhnSigned() ? " (set them out with <b>Rearrange your house</b>)." : " (sign in and they wait for you at home).") + "</div>" +
"<div style='margin:6px 0'>⚔️ Now go down into <b>" + bhnEsc(B.v[3]) + "</b>: each time you win it, <b>" + bhnEsc(B.v[2]) + "</b> may drop " + B.w.map(function (w) { return "<span style='color:" + BHN_TIER[w[2]].col + "'>" + bhnEsc(w[0]) + "</span>"; }).join(", ") + (B.m ? ", or the rarest of all, <span style='color:" + BHN_TIER.m.col + "'>" + bhnEsc(B.m[0]) + "</span>" : "") + ".</div>";
var fns = { vault: function () { worldCard(null); bhnVault(B.k); }, shelf: function () { worldCard(null); bhnOpen(B.k); }, ok: function () { worldCard(null); } };
if (typeof worldCard === "function")
worldCard(h + worldBtn("vault", "⚔️ Go down into the vault", "Its dungeon and its final battle: play it again and again") + worldBtn("shelf", "🏅 Book honours", "Every book's badge, decor, weapons and mount") + worldBtn("ok", "Later", ""), fns);
if (typeof playTone === "function") {
playTone(523, 0.3);
setTimeout(function () { playTone(659, 0.3); }, 200);
setTimeout(function () { playTone(784, 0.6); }, 400);
}
},
function (k, o) {
var B = BHN_BOOKS[k];
if (!B)
return null;
o = o || {};
var now = (typeof performance !== "undefined" ? performance.now() : Date.now());
if (BHN_LAST[k] != null && now - BHN_LAST[k] < 20000)
return null;
BHN_LAST[k] = now;
var d = bhnData();
d.wins[k] = (+d.wins[k] || 0) + 1;
var got = [];
var order = B.w.map(function (w, i) { return i; }).sort(function (a, b) { return "ruc".indexOf(B.w[a][2]) - "ruc".indexOf(B.w[b][2]); });
for (var j = 0; j < order.length; j++) {
var i = order[j], w = B.w[i], key = bhnArmKey(B, i);
var p = bhnChance(w[2]) * (o.boss === false ? 0.5 : 1);
if (Math.random() < p) {
var had = bhnArmOwned(key);
bhnArmGive(key);
got.push({ k: key, n: w[0], t: w[2], had: had });
break;
}
}
bhnSave();
var show = function (mount) { bhnDropSay(B, got, mount); };
if (B.m && bhnSigned()) {
bhnRpc("bhn_won", { p_book: k }).then(function (r) { var m = r && r.ok && r.mount ? r.mount : null; if (m && typeof loadThings === "function")
loadThings(); show(m ? { n: B.m[0], had: !!r.had } : null); })
.catch(function () { show(null); });
}
else
show(null);
return got;
},
function (B, got, mount) {
var d = bhnData(), L = [];
got.forEach(function (g) { L.push("<span style='color:" + BHN_TIER[g.t].col + "'>" + BHN_TIER[g.t].n + ":</span> <b>" + bhnEsc(g.n) + "</b>" + (g.had ? " (you have it already)" : " is in your 🎒 Backpack")); });
if (mount)
L.push("<span style='color:" + BHN_TIER.m.col + "'>" + BHN_TIER.m.n + ":</span> <b>" + bhnEsc(mount.n) + "</b>" + (mount.had ? " (yours already)" : "! Ride it from 🐾 Pets and mounts"));
bhnSay("⚔️ <b>" + bhnEsc(B.v[3]) + " won</b> (" + d.wins[B.k] + " time" + (d.wins[B.k] === 1 ? "" : "s") + "). " + (L.length ? L.join(" · ") : "Nothing dropped this time: the best things take many tries."));
if (L.length && typeof playTone === "function") {
playTone(659, 0.25);
setTimeout(function () { playTone(988, 0.5); }, 180);
}
},
function (key) {
if (!bhnArmsReady() || typeof bkpKept !== "function")
return;
var A = BW_ARMS[key];
if (!A)
return;
if (!bhnArmOwned(key)) {
bkpKept().push({ id: "bw_" + key + "_" + (typeof uid === "function" ? uid() : Date.now()), a: "bw_" + key, name: A.name, from: A.bhnBook });
}
bhnData().got[key] = bhnData().got[key] || Date.now();
bhnSave();
},
function (g, look) {
if (!g || !look)
return g;
var hsl = {}, mats = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material)
return;
var one = function (m) {
if (!m || !m.color)
return m;
var id = m.uuid;
if (mats[id])
return mats[id];
var c = m.color.clone();
c.getHSL(hsl);
var n;
var glow = m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.3 || m.type === "MeshBasicMaterial";
if (glow && look.g) {
n = m.clone();
n.color = new THREE.Color(look.g);
if (n.emissive)
n.emissive = new THREE.Color(look.g);
}
else if (glow) {
n = m;
}
else if (hsl.s < 0.22 && hsl.l > 0.3) {
n = new THREE.MeshPhongMaterial({ color: look.m != null ? look.m : c.getHex(), shininess: 70, specular: 0x8A8A8A });
}
else {
n = new THREE.MeshLambertMaterial({ color: look.h != null ? look.h : c.getHex() });
}
if (m.transparent) {
n.transparent = true;
n.opacity = m.opacity;
}
mats[id] = n;
return n;
};
o.material = Array.isArray(o.material) ? o.material.map(one) : one(o.material);
});
if (look.g) {
var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.035, 0), new THREE.MeshBasicMaterial({ color: look.g }));
gem.position.set(0, 0.06, 0.02);
g.add(gem);
try {
if (typeof softGlow === "function") {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: softGlow(), color: look.g, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
sp.scale.set(0.22, 0.22, 1);
sp.position.copy(gem.position);
g.add(sp);
}
}
catch (e) { }
}
if (look.stake) {
var st = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.42, 6), new THREE.MeshLambertMaterial({ color: 0xC8A878 }));
st.rotation.z = Math.PI / 2;
st.position.set(0.22, 0.55, 0);
g.add(st);
}
if (look.hook) {
var hk = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 6, 12, Math.PI * 1.3), new THREE.MeshPhongMaterial({ color: 0x3A3A40, shininess: 60 }));
hk.position.set(0, -0.12, 0);
g.add(hk);
}
return g;
},
function () {
if (typeof BW_ARMS === "undefined" || typeof HELD === "undefined" || typeof ARMS === "undefined")
return false;
if (BHN.armsDone)
return true;
BHN_ORDER.forEach(function (k) {
var B = BHN_BOOKS[k];
B.w.forEach(function (w, i) {
var key = bhnArmKey(B, i), base = BW_ARMS[w[1]] || BW_ARMS.longsword, A = {};
for (var p in base)
A[p] = base[p];
var up = BHN_TIERUP[w[2]] || 1.1;
if (A.dmg)
A.dmg = Math.round(A.dmg * up);
if (A.heal)
A.heal = Math.round(A.heal * up);
A.name = w[0];
A.era = "Book honours";
A.reqLv = BHN_TIERLV[w[2]] || 5;
A.bhnBook = B.t;
A.bhnTier = w[2];
A.bhnBase = w[1];
var baseHeld = base.held, held = "bhH_" + key + "_" + String(baseHeld).toLowerCase().replace(/^bw/, "");
A.held = held;
HELD[held] = function () { var f = HELD[baseHeld], g; try {
g = f ? f() : new THREE.Group();
}
catch (e) {
g = new THREE.Group();
} return bhnTint(g, w[3]); };
BW_ARMS[key] = A;
BHN_ARMS[key] = { B: B, i: i, w: w };
var a0 = ARMS["bw_" + w[1]] || {};
ARMS["bw_" + key] = { held: held, shot: a0.shot || null, name: w[0].toLowerCase() };
});
});
BHN.armsDone = true;
return true;
},
function (c, o) {
o = o || {};
var m = o.shine ? new THREE.MeshPhongMaterial({ color: c, shininess: o.shine, specular: o.spec || 0x6A6A6A }) : new THREE.MeshLambertMaterial({ color: c });
if (o.e != null) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o.op != null) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
return m;
},
function (key, o, title) {
if (BHN_TEX[key])
return BHN_TEX[key];
var c = document.createElement("canvas");
c.width = 256;
c.height = 192;
var x = c.getContext("2d");
function hex(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6); }
var sky = x.createLinearGradient(0, 0, 0, 120);
sky.addColorStop(0, hex(o.sky || 0x8AB8D8));
sky.addColorStop(1, hex(((o.sky || 0x8AB8D8) & 0xFEFEFE) >> 1 | 0x404040));
x.fillStyle = sky;
x.fillRect(0, 0, 256, 192);
if (o.aurora) {
for (var a = 0; a < 5; a++) {
x.strokeStyle = "rgba(120,255,200," + (0.18 + a * 0.04) + ")";
x.lineWidth = 8;
x.beginPath();
x.moveTo(0, 30 + a * 8);
x.bezierCurveTo(80, 10 + a * 6, 170, 60 + a * 4, 256, 25 + a * 7);
x.stroke();
}
}
if (o.moon) {
x.fillStyle = "#F4EED8";
x.beginPath();
x.arc(196, 40, 18, 0, Math.PI * 2);
x.fill();
}
if (o.twosun) {
x.fillStyle = "#FFF6E8";
x.beginPath();
x.arc(70, 40, 24, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#9AC8FF";
x.beginPath();
x.arc(200, 70, 12, 0, Math.PI * 2);
x.fill();
}
if (o.swirl) {
x.strokeStyle = "rgba(40,40,40,0.55)";
x.lineWidth = 6;
for (var s = 0; s < 6; s++) {
x.beginPath();
x.arc(150, 60, 10 + s * 9, s, s + 4);
x.stroke();
}
}
x.fillStyle = hex(((o.ground || 0x5A7A3A) & 0xFEFEFE) >> 1 | 0x202020);
x.beginPath();
x.moveTo(0, 118);
for (var i = 0; i <= 256; i += 16)
x.lineTo(i, 110 + Math.sin(i * 0.05) * 8);
x.lineTo(256, 192);
x.lineTo(0, 192);
x.fill();
var gr = x.createLinearGradient(0, 120, 0, 192);
gr.addColorStop(0, hex(o.ground || 0x5A7A3A));
gr.addColorStop(1, hex(((o.ground || 0x5A7A3A) & 0xFEFEFE) >> 1));
x.fillStyle = gr;
x.fillRect(0, 128, 256, 64);
if (o.water) {
x.fillStyle = "rgba(200,220,240,0.25)";
for (var w = 0; w < 14; w++)
x.fillRect((w * 37) % 240, 134 + (w * 13) % 50, 28, 2);
}
if (o.weed) {
x.fillStyle = "#8A1A10";
for (var r = 0; r < 30; r++) {
x.fillRect((r * 29) % 256, 150 + (r * 7) % 40, 6, -10 - (r % 5) * 4);
}
}
if (o.tree) {
x.fillStyle = "#3A2A1A";
x.fillRect(118, 70, 20, 70);
x.fillStyle = hex(o.fig || 0x3A6A2A);
x.beginPath();
x.arc(128, 64, 46, 0, Math.PI * 2);
x.fill();
}
else {
x.fillStyle = hex(o.fig || 0x3A2A1A);
x.beginPath();
x.ellipse(128, 124, 14, 30, 0, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.arc(128, 88, 9, 0, Math.PI * 2);
x.fill();
}
if (o.lamp) {
var lg = x.createRadialGradient(60, 90, 2, 60, 90, 40);
lg.addColorStop(0, "rgba(255,220,150,0.9)");
lg.addColorStop(1, "rgba(255,220,150,0)");
x.fillStyle = lg;
x.fillRect(20, 50, 80, 80);
}
var vg = x.createRadialGradient(128, 96, 60, 128, 96, 160);
vg.addColorStop(0, "rgba(0,0,0,0)");
vg.addColorStop(1, "rgba(40,25,10,0.5)");
x.fillStyle = vg;
x.fillRect(0, 0, 256, 192);
var t = new THREE.CanvasTexture(c);
BHN_TEX[key] = t;
return t;
},
function (text) {
var k = "plate:" + text;
if (BHN_TEX[k])
return BHN_TEX[k];
var c = document.createElement("canvas");
c.width = 256;
c.height = 48;
var x = c.getContext("2d");
x.fillStyle = "#B8902E";
x.fillRect(0, 0, 256, 48);
x.strokeStyle = "#6A4A12";
x.lineWidth = 3;
x.strokeRect(3, 3, 250, 42);
x.fillStyle = "#2A1A08";
x.font = "bold 17px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
var s = String(text);
while (x.measureText(s).width > 236 && s.length > 4)
s = s.slice(0, -2);
if (s !== String(text))
s = s.replace(/.$/, "…");
x.fillText(s, 128, 25);
var t = new THREE.CanvasTexture(c);
BHN_TEX[k] = t;
return t;
},
function (r, c) {
var g = new THREE.Group(), M = bhnM(c || 0xC8C8C8, { shine: 40 }), D = bhnM(BHN_DARK), W = bhnM(BHN_WOOD), G = bhnM(BHN_GOLD, { shine: 70 });
switch (r) {
case "shoes":
[-0.07, 0.07].forEach(function (x) { var s = bhnSph(g, 0.07, bhnM(c, { shine: 90, spec: 0xFFFFFF }), x, 0.05, 0, 0.8, 0.5, 1.6); bhnCyl(g, 0.015, 0.015, 0.06, M, x, 0.03, -0.08); });
bhnBox(g, 0.4, 0.05, 0.3, bhnM(0x8A2A3A), 0, 0.0, 0);
break;
case "carousel":
var cb = bhnSph(g, 0.07, bhnM(c, { shine: 60 }), 0, 0.16, 0, 1.7, 0.9, 0.85);
bhnCyl(g, 0.02, 0.03, 0.1, bhnM(c, { shine: 60 }), 0.09, 0.21, 0);
bhnSph(g, 0.03, bhnM(c, { shine: 60 }), 0.13, 0.25, 0, 1.8, 0.9, 0.85);
[[0.07, 0.03], [0.07, -0.03], [-0.07, 0.03], [-0.07, -0.03]].forEach(function (l) { bhnCyl(g, 0.008, 0.008, 0.09, bhnM(c, { shine: 60 }), l[0], 0.09, l[1]); });
bhnCyl(g, 0.006, 0.006, 0.4, G, 0, 0.2, 0);
bhnBox(g, 0.3, 0.03, 0.18, bhnM(0x3A4A6A), 0, 0.0, 0);
break;
case "pumpkin":
bhnSph(g, 0.16, bhnM(c), 0, 0.14, 0, 1.2, 0.85, 1.2);
bhnCyl(g, 0.02, 0.03, 0.08, bhnM(0x4A6A2A), 0, 0.3, 0);
break;
case "egg":
bhnSph(g, 0.08, bhnM(c, { shine: 50 }), 0, 0.1, 0, 0.8, 1.05, 0.8);
break;
case "crystal":
case "gem":
for (var i = 0; i < (r === "gem" ? 1 : 5); i++) {
var q = bhnPut(g, new THREE.OctahedronGeometry(r === "gem" ? 0.07 : 0.05 + i * 0.01, 0), bhnM(c, { shine: 120, spec: 0xFFFFFF, op: 0.85 }), (i - 2) * 0.05, 0.08 + i % 2 * 0.04, (i % 3 - 1) * 0.04);
q.scale.y = 1.6;
}
break;
case "magnet":
bhnPut(g, new THREE.TorusGeometry(0.09, 0.03, 8, 16, Math.PI), bhnM(c, { shine: 50 }), 0, 0.15, 0, 0, 0, Math.PI);
break;
case "key":
bhnPut(g, new THREE.TorusGeometry(0.04, 0.012, 6, 12), G, 0, 0.2, 0);
bhnBox(g, 0.02, 0.22, 0.02, G, 0, 0.08, 0);
bhnBox(g, 0.06, 0.03, 0.02, G, 0.03, -0.01, 0);
break;
case "pearls":
[0, 1, 2].forEach(function (i) { bhnSph(g, 0.035, bhnM([0xF4F4F8, 0x8AB0F0, 0xF0B8C8][i], { shine: 120, spec: 0xFFFFFF }), (i - 1) * 0.09, 0.05, 0); });
bhnBox(g, 0.32, 0.03, 0.14, bhnM(0x3A1A3A), 0, 0.01, 0);
break;
case "castle":
case "island":
bhnBox(g, 0.26, 0.12, 0.2, bhnM(c), 0, 0.06, 0);
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { bhnCyl(g, 0.03, 0.035, 0.2, bhnM(c), s * 0.12, 0.1, t * 0.09); bhnPut(g, new THREE.ConeGeometry(0.04, 0.08, 8), bhnM(0x6A3A2A), s * 0.12, 0.24, t * 0.09); }); });
if (r === "island") {
bhnPut(g, new THREE.ConeGeometry(0.2, 0.12, 10), bhnM(0x6A6A60), 0, -0.05, 0, Math.PI, 0, 0);
}
break;
case "pan":
bhnCyl(g, 0.13, 0.1, 0.05, bhnM(c, { shine: 60 }), 0, 0.04, 0, 18);
break;
case "sword":
bhnBox(g, 0.03, 0.5, 0.006, bhnM(c, { shine: 90 }), 0, 0.3, 0);
bhnBox(g, 0.14, 0.02, 0.03, G, 0, 0.05, 0);
bhnCyl(g, 0.014, 0.014, 0.1, W, 0, -0.01, 0);
break;
case "flower":
bhnCyl(g, 0.06, 0.05, 0.08, G, 0, 0.04, 0);
bhnCyl(g, 0.005, 0.005, 0.16, bhnM(0x3A7A2A), 0, 0.16, 0);
bhnSph(g, 0.04, bhnM(0xE860A0), 0, 0.25, 0, 1, 0.6, 1);
break;
case "dome":
bhnBox(g, 0.3, 0.03, 0.3, bhnM(0x6A6A5A), 0, 0.015, 0);
bhnPut(g, new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), bhnM(c, { shine: 120, op: 0.45 }), 0, 0.03, 0);
bhnBox(g, 0.08, 0.06, 0.08, bhnM(0xE8E0D0), 0, 0.06, 0);
break;
case "hook":
bhnPut(g, new THREE.TorusGeometry(0.07, 0.014, 8, 16, Math.PI * 1.3), bhnM(c, { shine: 80 }), 0, 0.14, 0);
bhnCyl(g, 0.04, 0.045, 0.08, bhnM(0x3A1A1A), 0, 0.03, 0);
break;
case "ginger":
bhnBox(g, 0.2, 0.12, 0.16, bhnM(0xB8703A), 0, 0.06, 0);
bhnPut(g, new THREE.ConeGeometry(0.17, 0.1, 4), bhnM(0xF0E8E0), 0, 0.17, 0, 0, Math.PI / 4, 0);
[-0.06, 0.06].forEach(function (x) { bhnSph(g, 0.018, bhnM(0xD82A4A), x, 0.07, 0.085); });
break;
case "bough":
for (var b = 0; b < 5; b++)
bhnCyl(g, 0.006, 0.008, 0.18, G, (b - 2) * 0.03, 0.1, 0);
for (var l = 0; l < 9; l++)
bhnSph(g, 0.025, G, (l % 5 - 2) * 0.035, 0.15 + l * 0.012, 0, 1.4, 0.4, 0.6);
break;
case "desk":
bhnBox(g, 0.3, 0.02, 0.18, W, 0, 0.12, 0);
[-1, 1].forEach(function (s) { bhnBox(g, 0.02, 0.12, 0.16, W, s * 0.13, 0.06, 0); });
bhnBox(g, 0.1, 0.005, 0.07, bhnM(0xF0E8D8), 0, 0.135, 0);
bhnCyl(g, 0.012, 0.012, 0.04, bhnM(0x1A1A2A), 0.08, 0.15, -0.04);
break;
case "organ":
for (var p = 0; p < 9; p++)
bhnCyl(g, 0.012, 0.012, 0.12 + Math.abs(p - 4) * -0.015 + 0.06, bhnM(c, { shine: 80 }), (p - 4) * 0.028, 0.1, 0);
bhnBox(g, 0.28, 0.05, 0.08, W, 0, 0.01, 0.03);
break;
case "cards":
bhnBox(g, 0.3, 0.02, 0.3, bhnM(c), 0, 0.01, 0);
for (var k = 0; k < 4; k++)
bhnBox(g, 0.05, 0.003, 0.07, bhnM(0xF4F0E8), (k - 1.5) * 0.06, 0.025, 0.03 * (k % 2));
break;
case "parchment":
case "map":
case "cloth":
bhnBox(g, 0.26, 0.004, 0.18, bhnM(c), 0, 0.02, 0);
bhnCyl(g, 0.015, 0.015, 0.2, bhnM(c), -0.13, 0.02, 0).rotation.x = Math.PI / 2;
break;
case "balloon":
bhnSph(g, 0.1, bhnM(c), 0, 0.24, 0, 1, 1.2, 1);
bhnBox(g, 0.06, 0.04, 0.06, W, 0, 0.06, 0);
break;
case "albatross":
bhnCyl(g, 0.04, 0.04, 0.32, bhnM(c, { shine: 50 }), 0, 0.1, 0).rotation.z = Math.PI / 2;
for (var m = 0; m < 5; m++)
bhnCyl(g, 0.004, 0.004, 0.12, bhnM(0x3A3A40), (m - 2) * 0.06, 0.17, 0);
break;
case "bell":
bhnPut(g, new THREE.CylinderGeometry(0.05, 0.12, 0.16, 16, 1, true), bhnM(c, { shine: 60, ds: 1 }), 0, 0.12, 0);
bhnSph(g, 0.05, bhnM(c, { shine: 60 }), 0, 0.2, 0, 1, 0.5, 1);
break;
case "clock":
bhnCyl(g, 0.1, 0.1, 0.03, G, 0, 0.12, 0, 20).rotation.x = Math.PI / 2;
bhnCyl(g, 0.085, 0.085, 0.035, bhnM(0xF4F0E8), 0, 0.12, 0, 20).rotation.x = Math.PI / 2;
break;
case "phials":
[0, 1, 2].forEach(function (i) { bhnCyl(g, 0.02, 0.03, 0.12, bhnM([0xC8E8D8, 0x8A2A6A, 0xE8D890][i], { shine: 100, op: 0.75 }), (i - 1) * 0.07, 0.06, 0); });
break;
case "muzzle":
bhnPut(g, new THREE.TorusGeometry(0.06, 0.012, 6, 14), bhnM(0x3A2A1A), 0, 0.1, 0);
bhnSph(g, 0.05, bhnM(c, { e: c, ei: 0.35, op: 0.6 }), 0, 0.1, 0);
break;
case "ring":
bhnPut(g, new THREE.TorusGeometry(0.035, 0.01, 8, 18), bhnM(c, { shine: 100 }), 0, 0.06, 0, Math.PI / 2.4, 0, 0);
break;
case "torpedo":
case "shell":
case "sphere":
case "cylinder":
if (r === "sphere")
bhnSph(g, 0.13, bhnM(c, { shine: 60 }), 0, 0.14, 0);
else {
var tp = bhnCyl(g, 0.06, 0.06, 0.3, bhnM(c, { shine: r === "torpedo" ? 120 : 50, op: r === "torpedo" ? 0.8 : null }), 0, 0.08, 0);
tp.rotation.z = Math.PI / 2;
bhnSph(g, 0.06, bhnM(c, { shine: 60 }), 0.15, 0.08, 0);
}
break;
case "machine":
bhnBox(g, 0.26, 0.02, 0.16, bhnM(BHN_WOOD), 0, 0.04, 0);
bhnCyl(g, 0.012, 0.012, 0.18, G, -0.1, 0.13, 0);
bhnCyl(g, 0.012, 0.012, 0.18, G, 0.1, 0.13, 0);
bhnCyl(g, 0.07, 0.07, 0.01, bhnM(0xC8E8F0, { op: 0.6 }), 0, 0.2, -0.06, 18).rotation.x = Math.PI / 2;
bhnBox(g, 0.1, 0.06, 0.06, bhnM(0x8A2A2A), 0, 0.08, 0.04);
break;
case "ptero":
bhnSph(g, 0.04, bhnM(c), 0, 0.15, 0, 1, 0.8, 2.2);
[-1, 1].forEach(function (s) { bhnBox(g, 0.22, 0.004, 0.1, bhnM(0x8A6A5A), s * 0.13, 0.16, 0); });
break;
case "bow":
bhnPut(g, new THREE.TorusGeometry(0.22, 0.012, 6, 20, Math.PI * 0.8), bhnM(c), 0, 0.02, 0, 0, 0, Math.PI * 0.1);
break;
case "apple":
bhnSph(g, 0.07, bhnM(c, { shine: 90 }), 0, 0.08, 0);
bhnCyl(g, 0.006, 0.006, 0.04, bhnM(0x4A3A1A), 0, 0.16, 0);
break;
case "gorgon":
bhnSph(g, 0.1, bhnM(0x2A2A2A), 0, 0.1, 0, 1, 1.1, 1);
for (var sn = 0; sn < 8; sn++) {
var a = sn / 8 * Math.PI * 2;
bhnPut(g, new THREE.TorusGeometry(0.03, 0.008, 5, 8, Math.PI), bhnM(c), Math.cos(a) * 0.09, 0.18, Math.sin(a) * 0.09, 0, a, 0);
}
break;
case "fleece":
bhnSph(g, 0.16, bhnM(c, { shine: 50, spec: 0xE8C870 }), 0, 0.06, 0, 1.2, 0.35, 0.9);
break;
case "idol":
bhnBox(g, 0.14, 0.18, 0.05, bhnM(c), 0, 0.1, 0);
bhnSph(g, 0.035, bhnM(0x3A4A3A), 0, 0.12, 0.03, 1, 1.2, 0.5);
break;
case "goggles":
[-0.04, 0.04].forEach(function (x) { bhnCyl(g, 0.03, 0.03, 0.02, bhnM(0x2A2A2A, { shine: 120 }), x, 0.18, 0.05, 14).rotation.x = Math.PI / 2; });
bhnSph(g, 0.09, bhnM(c), 0, 0.15, 0, 0.9, 1.15, 0.9);
break;
case "harness":
case "runes":
case "tablet":
bhnBox(g, 0.22, 0.16, 0.03, bhnM(c), 0, 0.1, 0);
if (r === "harness")
bhnPut(g, new THREE.TorusGeometry(0.05, 0.01, 6, 12), bhnM(0x8A8A90), 0, 0.22, 0);
break;
case "fan":
bhnPut(g, new THREE.CircleGeometry(0.16, 16, 0, Math.PI), bhnM(c, { ds: 1 }), 0, 0.12, 0);
bhnCyl(g, 0.01, 0.01, 0.14, W, 0, 0.04, 0);
break;
case "lamp":
bhnSph(g, 0.06, G, 0, 0.06, 0, 2, 0.6, 1);
bhnCyl(g, 0.008, 0.02, 0.08, G, 0.12, 0.08, 0).rotation.z = -1;
bhnPut(g, new THREE.TorusGeometry(0.03, 0.006, 5, 10), G, -0.1, 0.08, 0);
break;
case "scales":
bhnCyl(g, 0.008, 0.012, 0.26, G, 0, 0.13, 0);
bhnBox(g, 0.3, 0.01, 0.01, G, 0, 0.26, 0);
[-0.14, 0.14].forEach(function (x) { bhnCyl(g, 0.05, 0.03, 0.015, G, x, 0.18, 0); });
bhnPut(g, new THREE.ConeGeometry(0.01, 0.05, 4), bhnM(0xF0F0F0), 0.14, 0.22, 0);
break;
case "kettle":
bhnSph(g, 0.1, bhnM(c, { shine: 40 }), 0, 0.1, 0, 1, 0.8, 1);
bhnCyl(g, 0.012, 0.02, 0.08, bhnM(c), 0.1, 0.12, 0).rotation.z = -1;
break;
case "arrow":
bhnCyl(g, 0.006, 0.006, 0.5, bhnM(c, { shine: 100 }), 0, 0.25, 0).rotation.z = Math.PI / 2.2;
break;
case "stone":
bhnPut(g, new THREE.DodecahedronGeometry(0.14, 0), bhnM(c), 0, 0.1, 0);
if (c === 0x8A8A88) {
bhnBox(g, 0.02, 0.32, 0.005, bhnM(0xE8E8F0, { shine: 90 }), 0, 0.3, 0);
bhnBox(g, 0.09, 0.015, 0.025, G, 0, 0.36, 0);
}
break;
case "basin":
bhnPut(g, new THREE.SphereGeometry(0.12, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), bhnM(c, { shine: 80, ds: 1 }), 0, 0.12, 0);
break;
case "bench":
bhnBox(g, 0.32, 0.03, 0.14, W, 0, 0.12, 0);
[-1, 1].forEach(function (s) { bhnBox(g, 0.03, 0.12, 0.12, W, s * 0.14, 0.06, 0); });
bhnSph(g, 0.025, bhnM(0xC89A60), -0.05, 0.16, 0, 0.8, 1.8, 0.8);
break;
case "bowls":
[0.06, 0.045, 0.035].forEach(function (r2, i) { bhnPut(g, new THREE.SphereGeometry(r2, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), bhnM(0xE8E0D0, { ds: 1 }), (i - 1) * 0.11, 0.05, 0); });
break;
case "teaset":
bhnCyl(g, 0.05, 0.04, 0.08, bhnM(0xF4F0F8, { shine: 70 }), -0.06, 0.05, 0);
bhnCyl(g, 0.03, 0.025, 0.04, bhnM(0xF4F0F8, { shine: 70 }), 0.07, 0.02, 0.02);
bhnCyl(g, 0.06, 0.06, 0.18, bhnM(0x2A2A2A), 0.12, 0.15, -0.04);
break;
case "arm":
bhnCyl(g, 0.05, 0.035, 0.4, bhnM(c), 0, 0.1, 0).rotation.z = Math.PI / 2.4;
for (var f = 0; f < 4; f++)
bhnCyl(g, 0.012, 0.006, 0.12, bhnM(0x2A2A20), 0.2, 0.2 + f * 0.02, (f - 1.5) * 0.025).rotation.z = -0.6;
break;
case "mask":
bhnSph(g, 0.1, bhnM(c, { shine: 60, ds: 1 }), 0, 0.14, 0.0, 0.75, 1, 0.35);
[-0.03, 0.03].forEach(function (x) { bhnSph(g, 0.016, bhnM(0x0A0A0A), x, 0.16, 0.035); });
break;
case "telescope":
bhnCyl(g, 0.03, 0.045, 0.4, bhnM(c, { shine: 50 }), 0, 0.2, 0).rotation.z = Math.PI / 3;
bhnCyl(g, 0.005, 0.005, 0.2, W, 0, 0.08, 0);
break;
case "knife":
bhnBox(g, 0.24, 0.012, 0.04, bhnM(c, { shine: 100 }), 0.04, 0.04, 0);
bhnBox(g, 0.1, 0.03, 0.03, W, -0.13, 0.04, 0);
break;
case "skull":
bhnSph(g, 0.08, bhnM(c), 0, 0.1, 0, 0.9, 1, 1.1);
bhnBox(g, 0.08, 0.04, 0.06, bhnM(c), 0, 0.04, 0.04);
break;
case "cauldron":
bhnSph(g, 0.13, bhnM(0x2A2A2A, { shine: 30 }), 0, 0.12, 0, 1, 0.85, 1);
bhnCyl(g, 0.11, 0.11, 0.01, bhnM(0x3A8A3A, { e: 0x2A6A2A, ei: 0.4 }), 0, 0.2, 0);
break;
case "asshead":
bhnSph(g, 0.1, bhnM(c), 0, 0.14, 0, 0.8, 0.9, 1.4);
[-1, 1].forEach(function (s) { bhnPut(g, new THREE.ConeGeometry(0.03, 0.16, 6), bhnM(c), s * 0.05, 0.28, -0.05, 0, 0, s * 0.2); });
break;
case "laurel":
bhnPut(g, new THREE.TorusGeometry(0.1, 0.02, 6, 20), bhnM(c, { shine: 60 }), 0, 0.06, 0, Math.PI / 2, 0, 0);
break;
case "crown":
bhnCyl(g, 0.1, 0.1, 0.07, bhnM(c, { shine: c === BHN_GOLD || c === 0xE8C040 ? 80 : 0 }), 0, 0.06, 0, 16, 1);
for (var cp = 0; cp < 6; cp++) {
var an = cp / 6 * Math.PI * 2;
bhnPut(g, new THREE.ConeGeometry(0.02, 0.06, 4), bhnM(c), Math.cos(an) * 0.1, 0.12, Math.sin(an) * 0.1);
}
break;
case "bauble":
bhnCyl(g, 0.01, 0.01, 0.3, W, 0, 0.15, 0);
bhnSph(g, 0.04, bhnM(c), 0, 0.32, 0);
break;
case "caskets":
[0xE8C040, 0xD8D8E0, 0x6A6A60].forEach(function (cc, i) { bhnBox(g, 0.08, 0.07, 0.06, bhnM(cc, { shine: 60 }), (i - 1) * 0.1, 0.04, 0); });
break;
case "boar":
bhnSph(g, 0.08, bhnM(c), 0, 0.1, 0, 1.4, 0.9, 0.8);
bhnPut(g, new THREE.ConeGeometry(0.02, 0.06, 5), bhnM(c), 0.12, 0.1, 0, 0, 0, -1.6);
break;
case "basket":
bhnCyl(g, 0.1, 0.08, 0.12, bhnM(c), 0, 0.06, 0);
bhnPut(g, new THREE.TorusGeometry(0.04, 0.01, 5, 10), bhnM(0x3A5A2A), 0, 0.14, 0, Math.PI / 2, 0, 0);
break;
case "apparatus":
bhnBox(g, 0.26, 0.03, 0.16, W, 0, 0.02, 0);
bhnCyl(g, 0.04, 0.04, 0.14, bhnM(0x8AC8D8, { shine: 100, op: 0.7 }), -0.08, 0.1, 0);
bhnCyl(g, 0.006, 0.006, 0.24, bhnM(0xB8702E, { shine: 60 }), 0.08, 0.14, 0);
bhnSph(g, 0.025, bhnM(0xB8702E, { shine: 60 }), 0.08, 0.27, 0);
break;
case "rlyeh":
default:
bhnPut(g, new THREE.DodecahedronGeometry(0.1, 0), bhnM(c, { shine: 30 }), 0, 0.1, 0);
break;
}
return g;
},
function (B, i) {
var d = B.d[i], kind = d[1], o = d[2] || {}, g = new THREE.Group(), name = d[0];
var W = bhnM(BHN_WOOD), Dk = bhnM(BHN_DARK), G = bhnM(BHN_GOLD, { shine: 70 }), St = bhnM(0xC8C0B0);
switch (kind) {
case "painting":
[-0.42, 0.42].forEach(function (x) { var l = bhnBox(g, 0.05, 1.75, 0.05, W, x, 0.85, 0.05); l.rotation.z = x > 0 ? -0.08 : 0.08; });
var bk = bhnBox(g, 0.05, 1.6, 0.05, W, 0, 0.8, -0.38);
bk.rotation.x = -0.25;
bhnBox(g, 1.0, 0.05, 0.12, W, 0, 0.62, 0.08);
var fr = new THREE.Group();
fr.position.set(0, 1.12, 0.04);
fr.rotation.x = -0.08;
g.add(fr);
var fc = bhnM(o.frame || BHN_GOLD, { shine: 60 });
bhnBox(fr, 1.02, 0.08, 0.06, fc, 0, 0.39, 0);
bhnBox(fr, 1.02, 0.08, 0.06, fc, 0, -0.39, 0);
bhnBox(fr, 0.08, 0.86, 0.06, fc, -0.47, 0, 0);
bhnBox(fr, 0.08, 0.86, 0.06, fc, 0.47, 0, 0);
var cv = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.7), new THREE.MeshLambertMaterial({ map: bhnCanvasTex(B.k + ":" + i, o, name) }));
cv.position.z = 0.02;
fr.add(cv);
bhnBox(fr, 0.9, 0.72, 0.02, Dk, 0, 0, -0.01);
bhnPlate(g, name, 0.66, 0.15, 0.5);
break;
case "case":
bhnBox(g, 0.62, 0.9, 0.62, W, 0, 0.45, 0);
bhnBox(g, 0.68, 0.06, 0.68, Dk, 0, 0.93, 0);
bhnBox(g, 0.7, 0.05, 0.7, Dk, 0, 0.03, 0);
bhnBox(g, 0.42, 0.05, 0.42, bhnM(0x6A1A2A), 0, 0.985, 0);
var rel = bhnRelic(o.relic, o.c);
rel.position.set(0, 1.01, 0);
rel.scale.setScalar(1.35);
g.add(rel);
bhnBox(g, 0.6, 0.62, 0.6, bhnM(0xD8E8F0, { shine: 140, spec: 0xFFFFFF, op: 0.16 }), 0, 1.27, 0);
[[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (p) { bhnBox(g, 0.025, 0.62, 0.025, G, p[0] * 0.3, 1.27, p[1] * 0.3); });
bhnBox(g, 0.64, 0.025, 0.64, G, 0, 1.59, 0);
bhnPlate(g, name, 0.72, 0.315, 0.5);
break;
case "statue":
bhnBox(g, 0.7, 0.7, 0.7, St, 0, 0.35, 0);
bhnBox(g, 0.78, 0.08, 0.78, bhnM(0xA8A090), 0, 0.74, 0);
var sm = bhnM(o.stone || 0xE8E8E0, o.glass ? { shine: 140, op: 0.6 } : o.metal ? { shine: 80 } : {}), top = o.small ? 0.78 : 0.78;
if (o.raven) {
bhnBox(g, 0.42, 0.06, 0.3, sm, 0, 0.81, 0);
var chest = bhnSph(g, 0.24, sm, 0, 0.96, 0, 1.25, 0.62, 0.7);
bhnCyl(g, 0.07, 0.08, 0.14, sm, 0, 1.14, 0, 10);
bhnSph(g, 0.13, sm, 0, 1.3, 0.01, 0.92, 1.12, 1);
bhnPut(g, new THREE.ConeGeometry(0.035, 0.06, 6), sm, 0, 1.29, 0.13, Math.PI / 2, 0, 0);
var helm = bhnSph(g, 0.145, sm, 0, 1.36, -0.01, 1, 0.85, 1.05);
bhnBox(g, 0.03, 0.12, 0.26, sm, 0, 1.5, -0.03);
var Bk = bhnM(0x0E0E12, { shine: 60 }), Bl = bhnM(0x1A1A20);
bhnSph(g, 0.1, Bk, 0, 1.62, -0.02, 0.9, 0.85, 1.5);
bhnSph(g, 0.065, Bk, 0, 1.72, 0.12);
bhnPut(g, new THREE.ConeGeometry(0.022, 0.1, 6), Bl, 0, 1.71, 0.21, Math.PI / 2, 0, 0);
bhnBox(g, 0.1, 0.03, 0.18, Bk, 0, 1.58, -0.18).rotation.x = 0.5;
[-1, 1].forEach(function (s2) { bhnSph(g, 0.07, Bk, s2 * 0.07, 1.63, -0.03, 0.4, 0.7, 1.3); bhnCyl(g, 0.008, 0.008, 0.07, Bl, s2 * 0.03, 1.53, 0.02, 4); });
[-1, 1].forEach(function (s2) { bhnSph(g, 0.012, bhnM(0x0A0A0A, { shine: 120 }), s2 * 0.04, 1.74, 0.17); });
}
else if (o.goat) {
bhnSph(g, 0.18, sm, 0, 1.02, 0, 1.5, 0.8, 0.8);
[-0.12, 0.12].forEach(function (x) { [-0.06, 0.06].forEach(function (z) { bhnCyl(g, 0.025, 0.02, 0.24, sm, x, 0.86, z); }); });
bhnSph(g, 0.08, sm, 0.25, 1.15, 0, 1.3, 0.9, 0.8);
[-1, 1].forEach(function (s) { bhnPut(g, new THREE.TorusGeometry(0.04, 0.012, 5, 8, Math.PI), sm, 0.25, 1.24, s * 0.04, 0, Math.PI / 2, 0); });
}
else if (o.egg) {
bhnBox(g, 0.6, 0.32, 0.3, bhnM(0xB86A4A), 0, 0.94, 0);
bhnSph(g, 0.18, sm, 0, 1.32, 0, 0.85, 1.05, 0.85);
[-0.08, 0.08].forEach(function (x) { bhnCyl(g, 0.02, 0.02, 0.18, sm, x, 1.12, 0.05); });
}
else {
var fig = null;
try {
if (typeof wPerson === "function")
fig = wPerson("bhn_" + B.k + "_" + i, { sex: o.sex || "f" });
}
catch (e) {
fig = null;
}
if (fig) {
fig.position.set(0, top, 0);
fig.scale.setScalar(o.small ? 0.6 : 0.92);
g.add(fig);
var stone = function () { fig.traverse(function (m) { if (m.isMesh && !m.userData.bhnStone) {
m.userData.bhnStone = 1;
m.material = sm;
} if (m.isSkinnedMesh || m.isMesh)
m.castShadow = true; }); };
stone();
[500, 1500, 4000, 9000].forEach(function (t) { setTimeout(stone, t); });
if (fig.userData)
fig.userData.still = true;
}
else {
bhnCyl(g, 0.13, 0.2, 0.75, sm, 0, top + 0.37, 0, 10);
bhnSph(g, 0.15, sm, 0, top + 0.86, 0, 1, 1.1, 0.8);
bhnSph(g, 0.1, sm, 0, top + 1.08, 0);
}
}
if (o.metal || o.glass) { }
bhnPlate(g, name, 0.5, 0.355, 0.5);
break;
case "bookstand":
bhnCyl(g, 0.05, 0.07, 1.0, W, 0, 0.5, 0);
bhnBox(g, 0.42, 0.04, 0.42, Dk, 0, 0.02, 0);
var top2 = bhnBox(g, 0.6, 0.04, 0.44, W, 0, 1.04, 0);
top2.rotation.x = -0.35;
[-1, 1].forEach(function (s) { var pg = bhnBox(g, 0.27, 0.03, 0.38, bhnM(o.c || 0xE8D8B0), s * 0.14, 1.08, 0.01); pg.rotation.x = -0.35; pg.rotation.z = s * 0.06; });
bhnPlate(g, name, 0.5, 0.22, 0.45);
break;
case "ship":
bhnBox(g, 0.9, 0.7, 0.36, W, 0, 0.35, 0);
bhnBox(g, 0.1, 0.18, 0.06, G, -0.25, 0.79, 0);
bhnBox(g, 0.1, 0.18, 0.06, G, 0.25, 0.79, 0);
var hm = bhnM(o.hull || 0x3A2A1A);
var hull = bhnSph(g, 0.24, hm, 0, 0.95, 0, 1.9, 0.5, 0.55);
if (o.sub) {
bhnSph(g, 0.08, hm, 0, 1.08, 0, 1.4, 0.6, 0.6);
}
else {
bhnBox(g, 0.8, 0.04, 0.2, bhnM(0x6A4A2A), 0, 1.07, 0);
[-0.22, 0, 0.2].forEach(function (x, j) {
bhnCyl(g, 0.008, 0.01, 0.55 - j * 0.05, bhnM(0x3A2A1A), x, 1.35, 0);
if (o.sail !== 0 && !o.wreck)
bhnBox(g, 0.003, 0.22, 0.2, bhnM(o.sail == null ? 0xE8E0C8 : o.sail, { ds: 1 }), x, 1.38, 0).rotation.y = Math.PI / 2;
});
if (o.flag)
bhnBox(g, 0.002, 0.06, 0.09, bhnM(0x0A0A0A, { ds: 1 }), 0, 1.66, 0.05).rotation.y = Math.PI / 2;
if (o.oars)
for (var r = 0; r < 8; r++)
[-1, 1].forEach(function (s) { var oa = bhnCyl(g, 0.004, 0.004, 0.3, bhnM(0x8A6A3A), -0.3 + r * 0.085, 0.95, s * 0.18); oa.rotation.x = s * 1.0; });
if (o.wreck)
hull.rotation.z = 0.25;
}
bhnPlate(g, name, 0.42, 0.185, 0.5);
break;
case "coffin":
var cm = bhnM(o.c || BHN_DARK, { shine: 20 });
bhnBox(g, 0.7, 0.5, 2.05, cm, 0, 0.25, 0);
bhnBox(g, 0.74, 0.08, 2.1, cm, 0, 0.54, 0);
[-0.7, 0, 0.7].forEach(function (z) { [-1, 1].forEach(function (s) { bhnBox(g, 0.05, 0.04, 0.18, bhnM(0x6A6A60, { shine: 50 }), s * 0.37, 0.3, z); }); });
if (o.earth) {
bhnBox(g, 0.6, 0.06, 1.9, bhnM(0x3A2A1A), 0, 0.5, 0);
var lid = bhnBox(g, 0.72, 0.07, 2.05, cm, 0.42, 0.42, 0.1);
lid.rotation.z = -0.9;
}
bhnPlate(g, name, 0.3, 1.06, 0.5).rotation.y = 0;
break;
case "candelabrum":
var cmb = bhnM(o.c || 0x6A6A60, { shine: 50 }), big = o.big ? 1.5 : 1;
if (o.big) {
bhnCyl(g, 0.05, 0.08, 2.2, Dk, 0, 1.1, 0);
bhnBox(g, 0.6, 0.05, 0.6, Dk, 0, 0.03, 0);
}
else {
bhnCyl(g, 0.12, 0.18, 0.06, cmb, 0, 0.03, 0);
bhnCyl(g, 0.025, 0.035, 1.3, cmb, 0, 0.68, 0);
}
var y0 = o.big ? 2.0 : 1.3;
for (var a = 0; a < (o.big ? 8 : 5); a++) {
var an = a / (o.big ? 8 : 5) * Math.PI * 2, rr = (a === 0 && !o.big) ? 0 : 0.24 * big;
var cx = Math.cos(an) * rr, cz = Math.sin(an) * rr;
if (rr) {
var arm = bhnCyl(g, 0.012, 0.012, rr, cmb, cx / 2, y0, cz / 2);
arm.rotation.z = Math.PI / 2;
arm.rotation.y = -an;
}
bhnCyl(g, 0.035, 0.025, 0.04, cmb, cx, y0 + 0.02, cz);
bhnCyl(g, 0.018, 0.018, 0.16, bhnM(0xF4EEDC), cx, y0 + 0.12, cz);
bhnSph(g, 0.016, bhnM(0xFFC870, { e: 0xFFA040, ei: 0.9 }), cx, y0 + 0.22, cz, 0.8, 1.6, 0.8);
}
bhnPlate(g, name, 0.2, o.big ? 0.31 : 0.19, 0.4).rotation.x = -0.4;
break;
case "lamp":
bhnCyl(g, 0.14, 0.2, 0.06, Dk, 0, 0.03, 0);
bhnCyl(g, 0.025, 0.03, 1.5, o.gold ? G : Dk, 0, 0.78, 0);
if (o.paper) {
bhnCyl(g, 0.18, 0.18, 0.4, bhnM(o.c, { e: o.c, ei: 0.45, op: 0.88 }), 0, 1.62, 0, 14);
bhnCyl(g, 0.19, 0.19, 0.03, bhnM(0x1A1A1A), 0, 1.83, 0, 14);
bhnCyl(g, 0.19, 0.19, 0.03, bhnM(0x1A1A1A), 0, 1.41, 0, 14);
}
else {
bhnSph(g, 0.17, bhnM(o.c, { e: o.c, ei: 0.45, shine: 90, op: 0.9 }), 0, 1.65, 0, 1, 1.2, 1);
bhnCyl(g, 0.06, 0.1, 0.06, G, 0, 1.47, 0);
bhnPut(g, new THREE.ConeGeometry(0.06, 0.1, 8), G, 0, 1.88, 0);
}
bhnPlate(g, name, 0.45, 0.08, 0.4);
break;
case "throne":
var tm = bhnM(o.c || 0x8A2A2A);
bhnBox(g, 0.9, 0.45, 0.8, o.straw ? bhnM(0xC8A040) : W, 0, 0.23, 0);
bhnBox(g, 0.8, 0.12, 0.7, tm, 0, 0.5, 0.02);
bhnBox(g, 0.9, 1.3, 0.12, o.straw ? bhnM(0xC8A040) : W, 0, 1.08, -0.36);
bhnBox(g, 0.7, 0.95, 0.04, tm, 0, 1.1, -0.29);
[-1, 1].forEach(function (s) { bhnBox(g, 0.1, 0.35, 0.7, W, s * 0.42, 0.62, 0); });
if (o.straw)
for (var st = 0; st < 14; st++)
bhnCyl(g, 0.006, 0.006, 0.25, bhnM(0xE8C860), -0.4 + st * 0.06, 1.78, -0.36).rotation.z = (st % 3 - 1) * 0.4;
bhnPlate(g, name, 0.35, 0.41, 0.5);
break;
case "chest":
var chm = bhnM(o.c || BHN_WOOD), band = bhnM(o.iron ? 0x3A3A40 : BHN_GOLD, { shine: 50 });
bhnBox(g, 0.9, 0.5, 0.55, chm, 0, 0.25, 0);
bhnPut(g, new THREE.CylinderGeometry(0.275, 0.275, 0.9, 14, 1, false, 0, Math.PI), chm, 0, 0.5, 0, 0, 0, Math.PI / 2);
[-0.35, 0, 0.35].forEach(function (x) { bhnBox(g, 0.05, 0.52, 0.57, band, x, 0.25, 0); });
bhnBox(g, 0.1, 0.12, 0.03, band, 0, 0.5, 0.28);
bhnPlate(g, name, 0.12, 0.28, 0.45);
break;
case "mirror":
[-0.38, 0.38].forEach(function (x) { bhnBox(g, 0.06, 1.8, 0.06, bhnM(o.c || BHN_WOOD), x, 0.9, 0); bhnBox(g, 0.08, 0.04, 0.5, bhnM(o.c || BHN_WOOD), x, 0.02, 0); });
var mf = new THREE.Group();
mf.position.set(0, 1.05, 0);
mf.rotation.x = -0.06;
g.add(mf);
bhnBox(mf, 0.72, 1.32, 0.05, bhnM(o.c || BHN_WOOD), 0, 0, 0);
bhnBox(mf, 0.62, 1.22, 0.02, bhnM(0xC8D8E0, { shine: 160, spec: 0xFFFFFF }), 0, 0, 0.03);
bhnPlate(g, name, 0.3, 0.06, 0.4);
break;
case "rug":
var cv2 = document.createElement("canvas");
cv2.width = 128;
cv2.height = 96;
var x2 = cv2.getContext("2d");
for (var py = 0; py < 6; py++)
for (var px = 0; px < 8; px++) {
x2.fillStyle = (px + py) % 2 ? "#" + ("00000" + (o.c || 0xB82A3A).toString(16)).slice(-6) : "#" + ("00000" + (o.c2 || 0xE8C040).toString(16)).slice(-6);
x2.fillRect(px * 16, py * 16, 16, 16);
}
x2.strokeStyle = "#2A1A12";
x2.lineWidth = 4;
x2.strokeRect(2, 2, 124, 92);
var rt = new THREE.CanvasTexture(cv2);
var rug = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), new THREE.MeshLambertMaterial({ map: rt }));
rug.rotation.x = -Math.PI / 2;
rug.position.y = 0.012;
g.add(rug);
var fm = bhnM(o.c2 || 0xE8C040);
[-1.2, 1.2].forEach(function (x) { for (var t = 0; t < 12; t++)
bhnBox(g, 0.08, 0.01, 0.03, fm, x + (x > 0 ? 0.04 : -0.04), 0.012, -0.82 + t * 0.15); });
break;
default: bhnBox(g, 0.5, 0.5, 0.5, W, 0, 0.25, 0);
}
return g;
},
function () {
if (typeof FURN === "undefined")
return false;
if (BHN.decorDone)
return true;
BHN_ORDER.forEach(function (k) {
var B = BHN_BOOKS[k];
B.d.forEach(function (d, i) {
var a = bhnDecorArch(B, i);
BHN_DECOR[a] = { B: B, i: i, n: d[0] };
FURN[a] = function () { try {
return bhnDecorBuild(B, i);
}
catch (e) {
if (window.console)
console.warn("[book-honours] decor", a, e);
return new THREE.Group();
} };
if (typeof SOLIDFURN !== "undefined" && /^(case|statue|coffin|throne|chest|ship)$/.test(d[1]))
SOLIDFURN[a] = 1;
});
});
BHN.decorDone = true;
return true;
},
function (sel) {
if (!sel || sel.querySelector("optgroup[data-bhn]"))
return;
var mine = {};
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { if (t && BHN_DECOR[t.archetype])
mine[t.archetype] = (mine[t.archetype] || 0) + 1; });
if (bhnKeeper())
Object.keys(BHN_DECOR).forEach(function (a) { if (!mine[a])
mine[a] = 1; });
var keys = Object.keys(mine);
if (!keys.length)
return;
var draft = (typeof bfDraft === "function" && bfDraft()) || [];
var og = document.createElement("optgroup");
og.label = "🏅 Book honours";
og.setAttribute("data-bhn", "1");
og.setAttribute("data-um", "bhn");
keys.sort(function (a, b) { return BHN_DECOR[a].n < BHN_DECOR[b].n ? -1 : 1; }).forEach(function (a) {
var op = document.createElement("option");
op.value = a;
op.textContent = BHN_DECOR[a].n + (bhnKeeper() ? "" : " (" + Math.max(0, mine[a] - bfCount(draft, a)) + " of " + mine[a] + " to set out)");
og.appendChild(op);
});
sel.insertBefore(og, sel.firstChild);
},
function () {
if (typeof KIT === "undefined" || typeof RIDE_SEAT === "undefined")
return false;
if (BHN.mountDone)
return true;
BHN_ORDER.forEach(function (k) {
var B = BHN_BOOKS[k];
if (!B.m)
return;
var a = bhnMountArch(B), base = B.m[1];
BHN_MOUNTS[a] = { B: B, base: base, n: B.m[0], look: B.m[2] || {} };
var K = KIT[base];
KIT[a] = K ? Object.assign({}, K, { bhnMount: 1 }) : { cat: "creature", size: [3, 3, 4], parts: [], bhnMount: 1 };
if (RIDE_SEAT[base] != null)
RIDE_SEAT[a] = RIDE_SEAT[base];
if (typeof RIDE_FLIES !== "undefined" && RIDE_FLIES[base])
RIDE_FLIES[a] = 1;
if (typeof RIDE_YAW !== "undefined" && RIDE_YAW[base] != null)
RIDE_YAW[a] = RIDE_YAW[base];
});
BHN.mountDone = true;
return true;
},
function (g, look) {
if (!g || !look)
return;
var coat = look.coat != null ? new THREE.Color(look.coat) : null, hsl = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material || o.userData.bhnTinted)
return;
o.userData.bhnTinted = 1;
var one = function (m) {
if (!m || !m.color || m.userData && m.userData.bhnTack)
return m;
var n = m.clone();
n.color.getHSL(hsl);
if (coat && hsl.l > 0.12) {
n.color.lerp(coat, 0.72);
if (n.map && hsl.l > 0.5)
n.color.multiplyScalar(0.95);
}
return n;
};
o.material = Array.isArray(o.material) ? o.material.map(one) : one(o.material);
});
},
function (g, M) {
var seat = RIDE_SEAT[M.base] || 1.2, look = M.look, flat = /^(sleigh|flyingcarpet|airship|saucer|firechariot|hansomcab|bicycle)$/.test(M.base);
if (flat || seat < 0.3)
return;
var w = M.base === "elephant" ? 1.9 : M.base === "camel" ? 1.0 : M.base === "dragon" ? 1.4 : /^(horse|unicorn|pegasus|donkey|pony|zebra)$/.test(M.base) ? 0.6 : 0.8, len = M.base === "elephant" ? 1.6 : 0.85;
var cloth = new THREE.MeshLambertMaterial({ color: look.tack != null ? look.tack : 0x6A2A2A, side: THREE.DoubleSide });
cloth.userData = { bhnTack: 1 };
var gold = new THREE.MeshPhongMaterial({ color: 0xC8A040, shininess: 70 });
gold.userData = { bhnTack: 1 };
var t = new THREE.Group();
t.position.set(0, seat - 0.06, 0);
g.add(t);
var R = w * 0.5, drape = new THREE.Mesh(new THREE.CylinderGeometry(R, R, len, 20, 1, true, -Math.PI * 0.62, Math.PI * 1.24), cloth);
drape.rotation.set(Math.PI / 2, 0, Math.PI);
drape.scale.set(1, 1, 0.9);
drape.position.y = -R * 0.82;
t.add(drape);
[-1, 1].forEach(function (s) {
var a = Math.PI * 0.62, ex = Math.sin(a) * R, ey = -R * 0.82 + Math.cos(a) * R * 0.9;
var edge = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.045, len), gold);
edge.position.set(s * ex, ey, 0);
t.add(edge);
});
var sad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.55), new THREE.MeshLambertMaterial({ color: 0x3A2414 }));
sad.material.userData = { bhnTack: 1 };
sad.position.y = 0.06;
t.add(sad);
if (look.eyes && M.base === "horse") {
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshBasicMaterial({ color: look.eyes })); e.position.set(s * 0.12, seat + 0.55, 1.05); g.add(e); });
}
},
function (B) {
var o = typeof dmkDefaults === "function" ? dmkDefaults() : {};
o.name = B.v[3];
o.theme = B.v[0];
o.size = "large";
o.shape = ["branch", "winding", "wings", "hub", "maze"][(B.k.length * 7 + B.k.charCodeAt(0)) % 5];
if (B.v[0] === "spider" || B.v[0] === "fungal")
o.shape = "cavern";
o.party = "1";
o.diff = "hard";
o.decor = "lavish";
o.light = B.v[0] === "frost" ? "crystal" : B.v[0] === "forge" ? "fire" : "torch";
o.many = "some";
o.loot = "rich";
o.secret = true;
o.puzN = 2;
o.often = "some";
o.boss = { on: true, kind: B.v[1], name: B.v[2], size: "giant", tricks: ["slam", "call", "rage", "shield"] };
o.seed = 1 + Math.floor(Math.random() * 999999);
return o;
},
function (k) {
var B = BHN_BOOKS[k];
if (!B)
return;
if (typeof dmkPlay !== "function" || typeof dmkGenerate !== "function") {
bhnSay("⚔️ The vaults open with the Dungeon Maker: it is not here on this device.");
return;
}
if (!bhnIsDone(B) && !bhnData().fin[k] && !bhnKeeper()) {
bhnSay("⚔️ <b>" + bhnEsc(B.v[3]) + "</b> opens once you have finished <i>" + bhnEsc(B.t) + "</i>.");
return;
}
if (typeof WLD !== "undefined" && WLD.on === "dmk") {
bhnSay("You are in a dungeon already: climb back up first.");
return;
}
var spec;
try {
spec = dmkGenerate(bhnVaultSpec(B));
}
catch (e) {
bhnSay("The vault could not be laid out just now.");
return;
}
BHN.vault = k;
dmkPlay(spec, { from: "bhn:" + k });
},
function (B, on) {
var key = B.k + (on ? "1" : "0");
if (BHN_BADGE[key])
return BHN_BADGE[key];
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d"), col = B.b[2] || "#B8902E";
x.fillStyle = on ? col : "#555";
x.beginPath();
x.moveTo(40, 0);
x.lineTo(56, 0);
x.lineTo(64, 40);
x.lineTo(72, 0);
x.lineTo(88, 0);
x.lineTo(76, 52);
x.lineTo(52, 52);
x.fill();
var rim = x.createRadialGradient(54, 62, 10, 64, 74, 56);
rim.addColorStop(0, on ? "#FFF0B8" : "#BBB");
rim.addColorStop(0.6, on ? "#C8A040" : "#888");
rim.addColorStop(1, on ? "#6A4A12" : "#444");
x.fillStyle = rim;
x.beginPath();
x.arc(64, 76, 50, 0, Math.PI * 2);
x.fill();
for (var i = 0; i < 36; i++) {
var a = i / 36 * Math.PI * 2;
x.fillStyle = on ? "rgba(255,240,190,.8)" : "rgba(220,220,220,.5)";
x.beginPath();
x.arc(64 + Math.cos(a) * 45, 76 + Math.sin(a) * 45, 1.6, 0, Math.PI * 2);
x.fill();
}
var fld = x.createRadialGradient(56, 66, 4, 64, 76, 40);
fld.addColorStop(0, on ? "#FFFFFF" : "#999");
fld.addColorStop(0.15, on ? col : "#777");
fld.addColorStop(1, on ? "#1A1208" : "#333");
x.fillStyle = fld;
x.beginPath();
x.arc(64, 76, 39, 0, Math.PI * 2);
x.fill();
x.font = "40px serif";
x.textAlign = "center";
x.textBaseline = "middle";
if (!on)
x.globalAlpha = 0.35;
x.fillText(B.b[1] || B.i, 64, 78);
x.globalAlpha = 1;
return BHN_BADGE[key] = c.toDataURL();
},
function (sel) {
BHN.open = true;
if (sel)
BHN.sel = sel;
var el = document.getElementById("bhn-panel");
if (!el) {
el = document.createElement("div");
el.id = "bhn-panel";
el.style.cssText = "position:fixed;inset:4% 3%;max-width:980px;margin:auto;z-index:60;background:rgba(18,14,10,.97);color:#F4ECD8;border:1px solid #6A5A3A;border-radius:12px;display:flex;flex-direction:column;font:14px/1.45 var(--sans,system-ui);box-shadow:0 10px 40px rgba(0,0,0,.6)";
document.body.appendChild(el);
el.addEventListener("click", function (e) {
var t = e.target.closest("[data-bhn]");
if (!t)
return;
var a = t.getAttribute("data-bhn"), v = t.getAttribute("data-v");
if (a === "close")
bhnClose();
else if (a === "tab") {
BHN.tab = v;
BHN.sel = null;
bhnPaint();
}
else if (a === "book") {
BHN.sel = BHN.sel === v ? null : v;
bhnPaint();
}
else if (a === "vault") {
bhnClose();
bhnVault(v);
}
else if (a === "hold") {
bhnHold(v);
}
});
if (typeof loadThings === "function")
try {
loadThings().then(function () { if (BHN.open)
bhnPaint(); });
}
catch (e) { }
}
el.style.display = "flex";
bhnPaint();
if (typeof document.exitPointerLock === "function")
try {
document.exitPointerLock();
}
catch (e) { }
},
function () {
var el = document.getElementById("bhn-panel");
if (!el || !BHN.open)
return;
var d = bhnData(), shelves = bhnShelves(), done = 0, tot = BHN_ORDER.length;
BHN_ORDER.forEach(function (k) { if (d.fin[k])
done++; });
var h = "<div style='display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #4A3E2A'><div style='font:600 20px var(--serif,Georgia);color:#FFE7B0;flex:1'>🏅 Book honours</div><div style='opacity:.8'>" + done + " of " + tot + " books finished</div><button class='btn' data-bhn='close'>Close</button></div>";
h += "<div style='padding:8px 16px;display:flex;flex-wrap:wrap;gap:6px;border-bottom:1px solid #3A3020'>" + ["all"].concat(shelves).map(function (s) { return "<button class='btn' data-bhn='tab' data-v='" + bhnEsc(s) + "' style='" + (BHN.tab === s ? "background:#6A5A2A;color:#FFF" : "") + "'>" + (s === "all" ? "All" : bhnEsc(s)) + "</button>"; }).join("") + "</div>";
h += "<div style='overflow:auto;padding:10px 16px;flex:1'>";
h += "<p style='margin:0 0 10px;opacity:.85'>Finish a book: its <b>badge</b> and its <b>decor</b> for your home. Win its <b>vault</b> (its dungeon and its final battle) again and again: each win may drop its weapons, and, rarest of all, its <b>mount</b>. Chances each win: <span style='color:" + BHN_TIER.c.col + "'>common " + bhnPct(bhnChance("c")) + "</span>, <span style='color:" + BHN_TIER.u.col + "'>uncommon " + bhnPct(bhnChance("u")) + "</span>, <span style='color:" + BHN_TIER.r.col + "'>rare " + bhnPct(bhnChance("r")) + "</span>, <span style='color:" + BHN_TIER.m.col + "'>mount " + bhnPct(bhnChance("m")) + "</span>.</p>";
BHN_ORDER.forEach(function (k) {
var B = BHN_BOOKS[k];
if (BHN.tab !== "all" && B.shelf !== BHN.tab)
return;
var fin = !!d.fin[k], open = BHN.sel === k, wins = +d.wins[k] || 0;
var got = B.w.filter(function (w, i) { return bhnArmOwned(bhnArmKey(B, i)); }).length + (B.m && bhnOwnsThing(bhnMountArch(B)) ? 1 : 0), all = B.w.length + (B.m ? 1 : 0);
h += "<div style='border:1px solid " + (fin ? "#7A6A3A" : "#3A3428") + ";border-radius:10px;margin:6px 0;background:" + (fin ? "rgba(80,60,20,.25)" : "rgba(255,255,255,.03)") + "'>";
h += "<div data-bhn='book' data-v='" + k + "' style='display:flex;align-items:center;gap:10px;padding:8px 10px;cursor:pointer'>" + bhnBadgeHtml(B, 44, fin) +
"<div style='flex:1'><div style='font-weight:600'>" + bhnEsc(B.i + " " + B.t) + "</div><div style='font-size:12px;opacity:.8'>" + (fin ? "Badge: <b>" + bhnEsc(B.b[0]) + "</b>" : "Not finished yet") + " · vault wins " + wins + " · drops " + got + " of " + all + "</div></div><div style='opacity:.6'>" + (open ? "▾" : "▸") + "</div></div>";
if (open) {
h += "<div style='padding:0 12px 10px 64px;font-size:13px'>";
h += "<div>🏠 <b>Decor</b> (finish the book): " + B.d.map(function (x, i) { var own = bhnOwnsThing(bhnDecorArch(B, i)); return (own ? "✅ " : "▫️ ") + bhnEsc(x[0]); }).join(" · ") + (fin && !bhnSigned() ? " <i>(sign in to receive them)</i>" : "") + "</div>";
h += "<div style='margin-top:4px'>⚔️ <b>Weapons</b> (from the vault):<br>" + B.w.map(function (w, i) {
var key = bhnArmKey(B, i), own = bhnArmOwned(key), A = typeof BW_ARMS !== "undefined" && BW_ARMS[key];
return "<span style='display:inline-block;margin:2px 8px 2px 0'>" + (own ? "✅ " : "▫️ ") + "<span style='color:" + BHN_TIER[w[2]].col + "'>" + BHN_TIER[w[2]].n + "</span> " + bhnEsc(w[0]) + (A ? " <span style='opacity:.7'>(fights as " + bhnEsc((BW_ARMS[w[1]] || {}).name || w[1]).toLowerCase() + ", level " + A.reqLv + ")</span>" : "") + (own || bhnKeeper() ? " <button class='btn' data-bhn='hold' data-v='" + key + "' style='padding:1px 8px'>Hold</button>" : "") + "</span>";
}).join("<br>") + "</div>";
if (B.m)
h += "<div style='margin-top:4px'>🐎 <b>Mount</b> (rarest of all): " + (bhnOwnsThing(bhnMountArch(B)) ? "✅ " : "▫️ ") + "<span style='color:" + BHN_TIER.m.col + "'>" + bhnEsc(B.m[0]) + "</span></div>";
h += "<div style='margin-top:6px'>" + (fin || bhnKeeper() ? "<button class='btn' data-bhn='vault' data-v='" + k + "'>⚔️ Go down into " + bhnEsc(B.v[3]) + "</button> <span style='opacity:.7'>· at the bottom: " + bhnEsc(B.v[2]) + "</span>" : "<span style='opacity:.75'>Finish the book to open its vault, <i>" + bhnEsc(B.v[3]) + "</i>.</span>") + "</div>";
h += "</div>";
}
h += "</div>";
});
h += "</div>";
el.innerHTML = h;
}
];
});
