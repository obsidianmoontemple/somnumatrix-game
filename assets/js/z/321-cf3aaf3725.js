/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(321, function () {
"use strict";
return [
function (S) {
if (HX.busy)
return;
if (!hxSigned()) {
hxSay("Sign in to gather: what you find is kept against your account, in your backpack's stock.");
return;
}
var now = Date.now(), until = +HX.picked[S.id] || 0;
if (until > now && !hxKeeper()) {
hxSay("<b>" + esc(S.name) + ".</b> You have had what there is here for now. Worth another look in " + Math.ceil((until - now) / 60000) + " minutes.");
return;
}
HX.busy = true;
var M = hxMat(S.kind);
hxSay("<b>" + esc(S.name) + "</b>: you " + esc(S.verb) + "…");
hxTone(330, 0.1);
setTimeout(function () { hxTone(392, 0.1); }, 600);
setTimeout(function () {
var L = hxL();
if (!S.aboard && !S.prize && Math.hypot(L.x - S.x, L.z - S.z) > 5) {
HX.busy = false;
hxSay("You moved off before you were done.");
return;
}
hxGive(S.id, function (o) { if (S.g)
S.g.scale.setScalar(0.85); }, function () { });
}, 1400);
},
function (id, ok, no) {
var S = HX_SPOTS.filter(function (s) { return s[0] === id; })[0];
if (!hxSigned()) {
HX.busy = false;
hxSay("Sign in, and what you win or find is kept in your backpack.");
if (no)
no();
return;
}
hxRpc("craft_gather", { p_spot: id }).then(function (o) {
HX.busy = false;
if (o && o.ok) {
HX.picked[id] = Date.now() + (+o.regrow || (S ? S[7] : 20)) * 60000;
hxSave();
HX.stockAt = 0;
var M = hxMat(o.kind);
hxSay("<b>" + (M.icon || "") + " " + esc(o.say || ("+" + o.got + " " + M.name)) + "</b> It is in your 🎒 Backpack, under Materials: sell it at a stall here or to the city, or use it at a forge.");
hxTone(523, 0.12);
setTimeout(function () { hxTone(659, 0.14); }, 120);
if (ok)
ok(o);
}
else {
if (o && o.wait) {
HX.picked[id] = Date.now() + o.wait * 60000;
hxSave();
}
hxSay(esc((o && o.say) || "Nothing came of it."));
if (no)
no(o);
}
}).catch(function (e) { HX.busy = false; hxSay(hxMissing(e) ? "Gathering here opens soon." : esc((e && e.message) || String(e))); if (no)
no(e); });
},
function (id, msg) {
var T = HX_STALLS[id];
if (!T)
return;
if (T.maps)
return hxMaps(T);
var draw = function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(T.name) + "</div><div style='opacity:.85;margin:4px 0 8px'>" + esc(T.say) + "</div>", fns = {};
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
if (!hxSigned())
h += "<div style='margin:6px 0;color:#E8C8A0'>Sign in to trade: gold and stock are kept against your account.</div>";
var sells = T.sells.filter(function (k) { return hxBuyPrice(k) != null; });
if (sells.length) {
h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>For sale</div>";
sells.forEach(function (k) {
var M = hxMat(k), p = hxBuyPrice(k);
h += worldBtn("b1_" + k, (M.icon || "") + " " + esc(M.name) + " · " + (hxKeeper() ? "free to you" : p + " gold"), "Buy one · you have " + hxHave(k));
h += worldBtn("b5_" + k, "Buy five · " + (hxKeeper() ? "free" : (p * 5) + " gold"), null);
fns["b1_" + k] = function () { hxBuy(id, k, 1); };
fns["b5_" + k] = function () { hxBuy(id, k, 5); };
});
}
var buys = T.buys.filter(function (k) { return hxHave(k) > 0; });
h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>They buy</div>";
if (!buys.length)
h += "<div style='opacity:.75'>" + esc(T.buys.map(function (k) { return hxMat(k).name.toLowerCase(); }).join(", ")) + ". You have none of those with you yet" + (hxSigned() ? "" : " (or you are signed out") + ".</div>";
buys.forEach(function (k) {
var M = hxMat(k), n = hxHave(k), p = hxSellPrice(k);
h += worldBtn("s1_" + k, "Sell one " + esc(M.name.toLowerCase()) + " · " + p + " gold", "You have " + n);
if (n > 1) {
h += worldBtn("sa_" + k, "Sell all " + n + " · " + (p * n) + " gold", null);
fns["sa_" + k] = function () { hxSell(id, k, n); };
}
fns["s1_" + k] = function () { hxSell(id, k, 1); };
});
h += "<div style='opacity:.6;font-size:12px;margin-top:8px'>What you buy and sell is your stock: 🎒 Backpack, Materials.</div>";
worldCard(h, fns);
};
draw();
hxStock(true).then(function () { if (WLD.card && WLD.card.style.display === "block")
draw(); });
},
function (id, k, n) {
if (!hxSigned())
return hxStall(id, "Sign in first.");
hxRpc("craft_buy", { p_kind: k, p_amount: n }).then(function (o) { HX.stockAt = 0; hxStock(true).then(function () { hxStall(id, esc((o && o.say) || "Done.")); }); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { hxStall(id, esc(hxMissing(e) ? "The stall opens soon." : ((e && e.message) || String(e)))); });
},
function (id, k, n) {
if (!hxSigned())
return hxStall(id, "Sign in first.");
hxRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
HX.stockAt = 0;
var said = o === "ok" ? "Sold: " + n + " " + hxMat(k).name.toLowerCase() + ", for " + (hxSellPrice(k) * n) + " gold." : String(o || "Not now.");
hxStock(true).then(function () { hxStall(id, esc(said)); });
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
})
.catch(function (e) { hxStall(id, esc((e && e.message) || String(e))); });
},
function (T) {
var places = [["The Deep Workings", 0, -60], ["The Halfway Market", 95, -470], ["Zhaelvorn, City of Spires", 200, -800], ["The Fungus Forest", -260, -560], ["The Darklake and Stillwater Landing", -232, -972],
["The Velvetcap Terraces", -150, -340], ["The Long Fall", 330, -430], ["The Shardlight Grotto", 420, -560], ["Cinderwell Forges", 340, -990], ["The Echoing Hollow", -505, -690],
["The Weavers' Bridge over the Riven Deep", 0, -1040], ["The ruins of Old Ylmarr", 0, -1110], ["Glimmerdeep", 960, -700], ["The shore of the Sunless Sea", 1150, -700]];
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(T.name) + "</div><div style='opacity:.85;margin:4px 0 8px'>" + esc(T.say) + " Ysra lets you look for nothing: \"A map is only worth having if it is used.\"</div>", fns = {};
places.forEach(function (p, i) { h += worldBtn("m" + i, esc(p[0]), "Show me the way"); fns["m" + i] = function () { hxGuideTo("underdark", p[1], p[2], p[0]); }; });
worldCard(h, fns);
},
function () {
var G = HX.guide;
if (!G || G.w !== hxWorld())
return "";
var L = hxL(), dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 6) {
HX.guide = null;
hxSay("<b>" + esc(G.name) + ".</b> You are here.");
return "";
}
var arrow = "➜";
try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
arrow = pfindArrow(bearingOf(dx, dz));
}
catch (e) { }
return "<div>" + arrow + " <b>" + esc(G.name) + "</b> · " + (d < 1000 ? Math.round(d) + " m" : (d / 1000).toFixed(1) + " km") + "</div>";
},
function (w, name, opts) {
var list = hxTalkers(w);
if (!list)
return;
list.forEach(function (T) {
if (T.hxWrapped || T.name !== name || !T.t)
return;
T.hxWrapped = 1;
var talk = T.t;
T.verb = "trade, or talk";
T.fn = function () { hxKeeperCard(T, opts.concat([["💬 Talk with " + esc(String(name).split(",")[0]), "", function () { wTalk(talk); }]])); };
});
},
function () {
var w = hxWorld();
if (!w)
return null;
if (w === "sea" && SEA.aboard)
return HX_WP["The Wayfarer"];
if (w === "neverland" && NV.home)
return HX_WP["The Home Under the Ground"];
var L = hxL(), best = null, bd = 1e9;
HX_WORK.forEach(function (r) { if (r[1] !== w || !r[4])
return; var d = Math.hypot(L.x - r[2], L.z - r[3]); if (d < r[4] && d < bd) {
bd = d;
best = HX_WP[r[0]];
} });
return best;
},
function (look) {
var g = new THREE.Group(), R = wRand((look.length * 7919) ^ 1234);
function rnd(a, b) { return a + (b - a) * R(); }
if (look === "shells") {
var cols = [0xF2DCC8, 0xE8C0B0, 0xF4E8D8, 0xD8B898, 0xEAD0D8];
for (var i = 0; i < 8; i++) {
var s = wSph(0.09 + R() * 0.05, wM(cols[i % 5]), rnd(-0.9, 0.9), 0.03, rnd(-0.9, 0.9), g, 7);
s.scale.set(1, 0.45, 1.3);
s.rotation.y = R() * 6;
}
for (var a = 0; a < 5; a++) {
var arm = wBox(0.05, 0.03, 0.2, wM(0xD8784A), 0.5 + Math.sin(a * 1.256) * 0.1, 0.03, -0.4 + Math.cos(a * 1.256) * 0.1, g);
arm.rotation.y = a * 1.256;
}
}
else if (look === "oysters") {
var rk = wSph(0.7, wM(0x6A6660), 0, -0.1, 0, g, 7);
rk.scale.set(1.6, 0.5, 1.1);
for (var o = 0; o < 6; o++) {
var sh = wMesh(new THREE.SphereGeometry(0.16, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2), wM(0x8A8478), Math.cos(o) * 0.9, 0.18, Math.sin(o) * 0.6, g);
sh.scale.set(1.3, 0.4, 1);
sh.rotation.y = o;
}
var pe = wSph(0.05, wM(0xF4F0EC, { e: 0x2A2A2E, ei: 0.4 }), 0.9, 0.24, 0, g, 8);
}
else if (look === "feathers") {
for (var r = 0; r < 9; r++) {
var rd = wCyl(0.02, 0.03, 1.4 + R() * 0.6, wM(0x6A8A3A), rnd(-0.8, 0.8), 0.7, rnd(-0.5, 0.5), g, 4);
rd.rotation.z = rnd(-0.15, 0.15);
}
for (var f = 0; f < 4; f++) {
var fe = wMesh(new THREE.PlaneGeometry(0.08, 0.38), wM(f % 2 ? 0xF0A0A8 : 0xE88A90, { ds: 1 }), rnd(-0.4, 0.4), 0.2, rnd(-0.3, 0.3), g);
fe.rotation.set(-1.2, R() * 6, 0.3);
}
}
else if (look === "coconuts") {
for (var c = 0; c < 6; c++)
wSph(0.16, wM(0x6A4A2A), Math.cos(c * 1.1) * 0.4, 0.15 + (c > 3 ? 0.22 : 0), Math.sin(c * 1.1) * 0.35, g, 8);
var fr = wMesh(new THREE.PlaneGeometry(0.5, 2.2), wM(0x4A7A2A, { ds: 1 }), 0.9, 0.04, 0.3, g);
fr.rotation.set(-Math.PI / 2, 0, 0.6);
}
else if (look === "dust") {
var md = wSph(0.9, wM(0x4A5A2A), 0, -0.25, 0, g, 8);
md.scale.set(1.4, 0.55, 1.2);
var gl = wGlow(0xFFE8B0, 1.6, 0.55);
gl.position.y = 0.5;
g.add(gl);
HX.glows.push({ m: gl, b: 0.55, ph: R() * 6 });
var pts = wPoints(26, function () { return [rnd(-0.8, 0.8), rnd(0.2, 1.4), rnd(-0.8, 0.8)]; }, 0xFFF0C8, 0.06, true);
g.add(pts);
}
else if (look === "drift") {
for (var d = 0; d < 3; d++) {
var lg = wCyl(0.14 + d * 0.03, 0.18, 2.4 - d * 0.5, wM(0xA8A090), d * 0.35 - 0.3, 0.15, d * 0.4 - 0.4, g, 7);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = d * 0.7;
}
}
else if (look === "olive") {
var tr = wCyl(0.14, 0.22, 1.6, wM(0x6A5A44), 0, 0.8, 0, g, 7);
tr.rotation.z = 0.12;
[[0, 2, 0, 1.2], [0.6, 1.8, 0.3, 0.8], [-0.5, 1.9, -0.3, 0.9]].forEach(function (q) { var cn = wSph(q[3], wM(0x6A7A4A), q[0], q[1], q[2], g, 8); cn.scale.y = 0.7; });
var bk = wCyl(0.3, 0.24, 0.32, wM(0xA8844A), 1.1, 0.16, 0.5, g, 10);
for (var ol = 0; ol < 5; ol++)
wSph(0.05, wM(0x3A4A22), 1.0 + ol * 0.05, 0.34, 0.45 + (ol % 2) * 0.08, g, 6);
}
else if (look === "salt") {
for (var p = 0; p < 3; p++) {
var px = (p - 1) * 1.4;
wBox(1.2, 0.08, 1.2, wM(0x8A7A62), px, 0.04, 0, g);
wBox(1.0, 0.04, 1.0, wM(0xE8E6E0), px, 0.1, 0, g);
}
var hd = wCyl(0.03, 0.03, 1.6, wM(0x8A6A42), 0.6, 0.4, 1.0, g, 5);
hd.rotation.x = 1.1;
wBox(0.5, 0.08, 0.06, wM(0x8A6A42), 0.6, 0.06, 1.6, g);
wCyl(0.25, 0.3, 0.5, wM(0xC8B890), -2.2, 0.25, 0.6, g, 8);
}
else if (look === "sponge") {
var sr = wSph(0.8, wM(0x7A7468), 0, 0, 0, g, 7);
sr.scale.set(1.5, 0.6, 1);
for (var sp = 0; sp < 5; sp++) {
var b = wSph(0.16 + R() * 0.08, wM(0xC8A04A), Math.cos(sp) * 0.8, 0.35, Math.sin(sp) * 0.5, g, 6);
b.scale.y = 0.8;
}
}
else if (look === "ore" || look === "coal") {
var face = wBox(0.3, 1.8, 2.6, wM(look === "coal" ? 0x2E2B28 : 0x5A524A), 0, 0.9, 0, g);
var fl = look === "coal" ? 0x121212 : 0x9A5A32;
for (var o2 = 0; o2 < 9; o2++)
wBox(0.06, 0.14, 0.18, wM(fl), -0.16, 0.3 + R() * 1.4, rnd(-1.1, 1.1), g);
wBox(0.5, 0.4, 0.6, wM(0x5A4028), -0.7, 0.2, 0.9, g);
var pk = wCyl(0.025, 0.025, 0.9, wM(0x6A4A2A), -0.7, 0.6, -0.6, g, 5);
pk.rotation.z = 0.5;
}
else if (look === "crystal" && typeof fgSpotMesh === "function") {
try {
return fgSpotMesh("cr_crystal");
}
catch (e) { }
}
else if (look === "gem") {
var gr = wSph(1, wM(0x4A4650), 0, 0.3, 0, g, 7);
gr.scale.set(1.4, 0.8, 1);
[0x8A4AC8, 0x3AA8D8, 0xD84A6A, 0x4AC88A].forEach(function (col, i) { var o3 = wMesh(new THREE.OctahedronGeometry(0.16, 0), wM(col, { e: col, ei: 0.25 }), Math.cos(i * 1.6) * 0.9, 0.7 + (i % 2) * 0.2, Math.sin(i * 1.6) * 0.6, g); o3.rotation.y = i; });
}
else if (look === "caps") {
var cc = [0x3AA88A, 0x8A4AC8, 0x4A6AD8];
for (var m = 0; m < 7; m++) {
var mx = rnd(-0.9, 0.9), mz = rnd(-0.9, 0.9), hh = 0.2 + R() * 0.35, col2 = cc[m % 3];
wCyl(0.04, 0.06, hh, wM(0xD8D0C0), mx, hh / 2, mz, g, 6);
var cp = wMesh(new THREE.SphereGeometry(0.16 + R() * 0.1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), wM(col2, { e: col2, ei: 0.35 }), mx, hh, mz, g);
cp.scale.y = 0.7;
}
var cg = wGlow(0x8AF0D0, 2, 0.3);
cg.position.y = 0.4;
g.add(cg);
HX.glows.push({ m: cg, b: 0.3, ph: R() * 6 });
}
else if (look === "jars") {
for (var j = 0; j < 4; j++) {
var jx = (j % 2 - 0.5) * 0.9, jz = (j > 1 ? 0.45 : -0.45);
wSph(0.34, wM(0xA8643A), jx, 0.36, jz, g, 10).scale.set(1, 1.25, 1);
wCyl(0.12, 0.16, 0.18, wM(0x9A5A34), jx, 0.86, jz, g, 8);
}
wBox(2.2, 0.06, 1.6, wM(0x6A4A2A), 0, 0.03, 0, g);
}
else if (look === "cheese") {
[-0.5, 0.5].forEach(function (z) { wBox(2, 0.06, 0.5, wM(0x7A5A3A), 0, 0.5, z, g); wBox(2, 0.06, 0.5, wM(0x7A5A3A), 0, 1.1, z, g); });
[-0.95, 0.95].forEach(function (x) { wBox(0.06, 1.3, 1.5, wM(0x5A4228), x, 0.65, 0, g); });
for (var c2 = 0; c2 < 6; c2++)
wCyl(0.24, 0.24, 0.18, wM(0xE8D8A8), (c2 % 3 - 1) * 0.6, c2 < 3 ? 0.62 : 1.22, (c2 % 2 ? 0.5 : -0.5), g, 12);
}
else if (look === "sacks") {
for (var k2 = 0; k2 < 4; k2++) {
var sk = wSph(0.38, wM(0xC8B48A), (k2 % 2 - 0.5) * 0.85, 0.4, (k2 > 1 ? 0.4 : -0.4), g, 8);
sk.scale.set(1, 1.3, 0.9);
}
wSph(0.36, wM(0xC8B48A), 0, 1.05, 0, g, 8).scale.set(1, 1.2, 0.9);
}
else if (look === "hive") {
[-0.7, 0.7].forEach(function (x) {
wBox(0.7, 0.34, 0.7, wM(0xE8DCC0), x, 0.5, 0, g);
wBox(0.7, 0.34, 0.7, wM(0xD8C8A0), x, 0.86, 0, g);
wBox(0.84, 0.06, 0.84, wM(0x8A6A44), x, 1.06, 0, g);
wBox(0.06, 0.32, 0.06, wM(0x5A4228), x, 0.17, 0, g);
});
}
else if (look === "silk") {
[-1.2, 1.2].forEach(function (x) { wCyl(0.06, 0.08, 1.8, wM(0x3A3236), x, 0.9, 0, g, 5); });
var pos = [];
for (var l = 0; l < 8; l++) {
var y1 = 0.3 + l * 0.2;
pos.push(-1.2, y1, 0, 1.2, 1.7 - l * 0.18, 0);
pos.push(-1.2 + l * 0.3, 0.1, 0, -1.2 + l * 0.3 + 0.2, 1.6, 0);
}
var lg2 = new THREE.BufferGeometry();
lg2.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.add(new THREE.LineSegments(lg2, new THREE.LineBasicMaterial({ color: 0xD8D8E8, transparent: true, opacity: 0.6 })));
var sp2 = wCyl(0.14, 0.14, 0.32, wM(0xE8E4F0), 0.4, 0.16, 0.6, g, 10);
sp2.rotation.z = Math.PI / 2;
}
else if (look === "pine") {
for (var b2 = 0; b2 < 5; b2++) {
var bo = wCone(0.35, 1.4, wM(0x1E4A32), rnd(-0.6, 0.6), 0.2, b2 * 0.3 - 0.6, g, 7);
bo.rotation.z = Math.PI / 2;
bo.rotation.y = rnd(-0.4, 0.4);
}
wBox(0.9, 0.08, 1.8, wM(0x8A5A32), 1.3, 0.18, 0, g);
[-0.4, 0.4].forEach(function (x) { wBox(0.06, 0.06, 2, wM(0xB8BCC4), 1.3 + x, 0.05, 0.05, g); });
}
else if (look === "log") {
var lg3 = wCyl(0.4, 0.5, 6, wM(0x5A4028), 0, 0.45, 0, g, 8);
lg3.rotation.z = Math.PI / 2;
wCyl(0.42, 0.42, 0.12, wM(0xB89A6A), 3.02, 0.45, 0, g, 8).rotation.z = Math.PI / 2;
var sn = wBox(5, 0.12, 0.9, wM(0xF4F8FF), 0, 0.92, 0, g);
sn.rotation.x = 0.05;
}
else if (look === "holly") {
var bu = wSph(0.9, wM(0x1E4A2A), 0, 0.75, 0, g, 9);
bu.scale.set(1.2, 0.9, 1.1);
wSph(0.6, wM(0x24562E), 0.6, 0.55, 0.3, g, 8);
for (var be = 0; be < 12; be++) {
var ba = R() * 6.28, bh = 0.4 + R() * 0.8;
wSph(0.05, wM(0xC81E22), Math.cos(ba) * 0.95, bh, Math.sin(ba) * 0.9, g, 5);
}
var cap = wSph(0.8, wM(0xF4F8FF), 0, 1.25, 0, g, 8);
cap.scale.set(1.1, 0.25, 1);
}
else if (look === "ice") {
var im = new THREE.MeshPhongMaterial({ color: 0xBFE0F0, shininess: 90, transparent: true, opacity: 0.8 });
[[0, 0.35, 0], [0.85, 0.35, 0.1], [0.4, 1.0, 0.05]].forEach(function (q) { wBox(0.8, 0.7, 0.8, im, q[0], q[1], q[2], g); });
var saw = wBox(1.2, 0.18, 0.03, wM(0xA8ACB4), -0.9, 0.4, 0.6, g);
saw.rotation.z = 0.4;
}
else if (look === "moss") {
for (var mo = 0; mo < 5; mo++) {
var mm = wSph(0.4 + R() * 0.3, wM(0x98A478), rnd(-1, 1), 0, rnd(-1, 1), g, 7);
mm.scale.y = 0.35;
}
wCyl(0.35, 0.3, 0.4, wM(0x8A6A42), 1.2, 0.2, 0.8, g, 10);
}
else {
wSph(0.5, wM(0x8A8070), 0, 0.3, 0, g, 7);
}
return g;
},
function (G, w, lines, x, z, ry, bg, fg) {
var y = hxGround(w, x, z), a = ry || 0, nx = Math.sin(a) * 0.045, nz = Math.cos(a) * 0.045;
var s = wSign(lines, 3.6, 1.3, bg || "#2A2018", fg || "#F0DCA8");
s.material.side = THREE.FrontSide;
s.position.set(x + nx, y + 2.1, z + nz);
s.rotation.y = a;
G.add(s);
var k = new THREE.Mesh(s.geometry, s.material);
k.position.set(x - nx, y + 2.1, z - nz);
k.rotation.y = a + Math.PI;
G.add(k);
var e = wBox(3.66, 1.36, 0.07, wM(0x3A2C20), x, y + 2.1, z, G);
e.rotation.y = a;
wBox(0.1, 1.5, 0.1, wM(0x4A3A2A), x, y + 0.75, z, G);
return s;
},
function (G, w, seed, o, x, z, talk, ry) {
var g = wPerson(seed, o);
g.position.set(x, hxGround(w, x, z) + (o.y || 0), z);
g.rotation.y = ry || 0;
G.add(g);
var P = { g: g };
if (w === "neverland")
NV.people.push(P);
else if (w === "underdark")
UD.people.push(P);
else if (w === "northpole")
NP.people.push(P);
var list = hxTalkers(w);
if (talk && list)
list.push({ p: P, r: 3.6, name: talk.name, t: talk });
return P;
},
function (G, w, x, z, ry, col, goods) {
var g = new THREE.Group();
g.position.set(x, hxGround(w, x, z), z);
g.rotation.y = ry || 0;
G.add(g);
var wood = wM(0x6A4A2E);
wBox(2.4, 0.9, 0.9, wood, 0, 0.45, 0, g);
[-1.1, 1.1].forEach(function (s) { wCyl(0.05, 0.05, 2.4, wM(0x4A3A2A), s, 1.2, -0.35, g, 5); });
var aw = wBox(2.8, 0.06, 1.4, wM(col || 0x8A3A2A), 0, 2.4, 0.1, g);
aw.rotation.x = 0.18;
(goods || []).forEach(function (c, i) { if (i % 2)
wBox(0.26, 0.26, 0.26, wM(c), -0.9 + i * 0.36, 1.03, 0, g);
else
wSph(0.14, wM(c), -0.9 + i * 0.36, 1.04, 0, g, 7); });
return g;
},
function (w, G) {
if (HX.built[w])
return;
HX.built[w] = 1;
var list = hxTalkers(w);
HX_SPOTS.forEach(function (s) {
if (s[1] !== w || s[10] === "prize" || s[10] === "aboard")
return;
var S = { id: s[0], world: w, kind: s[2], x: s[3], z: s[4], name: s[8], verb: s[9], look: s[10] };
if (s[10] === "jetty") {
if (list)
list.push({ x: S.x, z: S.z, r: 2.6, name: "The end of the jetty", verb: "fish the Darklake", fn: function () { hxFishOpen("ud_fish"); } });
return;
}
var g = hxProp(S.look), y = hxGround(w, S.x, S.z);
if (S.look === "ore" || S.look === "coal") {
var sd = S.x < 0 ? -1 : 1;
g.position.set(sd * 5.55, 0, S.z);
g.rotation.y = sd < 0 ? Math.PI : 0;
}
else {
g.position.set(S.x, y, S.z);
g.rotation.y = (S.x * 0.37 + S.z * 0.11) % 6.28;
}
G.add(g);
S.g = g;
HX.spots.push(S);
if (list)
list.push({ x: S.x, z: S.z, r: 2.8, name: S.name, verb: S.verb, fn: function () { hxGather(S); } });
});
if (w === "neverland")
hxDressNeverland(G, list);
if (w === "sea")
hxDressSea(G, list);
if (w === "underdark")
hxDressUnderdark(G, list);
if (w === "northpole")
hxDressNorthPole(G, list);
},
function (G, list) {
var T = HX_STALLS.smee, ch = new THREE.Group(), y = hxGround("neverland", T.x, T.z);
ch.position.set(T.x, y, T.z);
ch.rotation.y = 0.6;
G.add(ch);
wBox(1.3, 0.6, 0.8, wM(0x5A3A1E), 0, 0.3, 0, ch);
var lid = wBox(1.3, 0.08, 0.8, wM(0x6A4A2A), 0, 0.9, -0.4, ch);
lid.rotation.x = -1.1;
[-0.55, 0.55].forEach(function (x) { wBox(0.08, 0.62, 0.84, wM(0x8A7A4A), x, 0.31, 0, ch); });
for (var c = 0; c < 7; c++)
wCyl(0.06, 0.06, 0.02, wM(0xE8C04A), -0.4 + c * 0.13, 0.62, 0.05, ch, 8);
wBox(1.6, 0.7, 0.9, wM(0x7A5A3A), 1.8, 0.35, 0.4, ch);
wSph(0.16, wM(0x6A4A2A), 1.6, 0.85, 0.3, ch, 8);
wCyl(0.14, 0.14, 0.3, wM(0x2A4A2A), 2.0, 0.85, 0.4, ch, 8);
hxSignAt(G, "neverland", ["Smee's Sea-Chest", "Fair prices, mostly", "(Don't tell the Captain)"], T.x - 3, T.z + 2.5, 0.6, "#2A1A12", "#F0D8A0");
if (list)
list.push({ x: T.x, z: T.z, r: 3, name: T.name, verb: "see what Smee is selling", fn: hxStallTalk("smee") });
hxWrapKeeper("neverland", "Smee", [["🛒 Trade at Smee's sea-chest", "Coconuts, sailcloth, timber; Smee buys shells, pearls and feathers", hxStallTalk("smee")]]);
var U = HX_STALLS.tailors;
hxCounter(G, "neverland", U.x, U.z, -0.8, 0x3A6A4A, [0xC8A060, 0x8A2A3A, 0x2A4A8A, 0xE8D8B0, 0x5A3A2A]);
hxSignAt(G, "neverland", ["The Tailors' Counter", "Cloth by the yard", "Bright feathers bought"], U.x + 2.6, U.z + 2, -0.8, "#1E2A1A", "#E8E0B0");
if (list)
list.push({ x: U.x, z: U.z, r: 3, name: U.name, verb: "trade with the gnome tailors", fn: hxStallTalk("tailors") });
var W = HX_WP["The Never Rings"];
hxSignAt(G, "neverland", ["The Never Rings", "Ten rings round the Never Peak", "Think a happy thought, and fly"], W.x, W.z, 0.4, "#1A2A3A", "#FFE8B0");
if (list)
list.push({ x: W.x, z: W.z, r: 3.4, name: "The Never Rings", verb: "fly the course", fn: function () { hxRingsCard(); } });
hxRingsBuild(G);
},
function (G, list) {
var T = HX_STALLS.scheria;
hxCounter(G, "sea", T.x, T.z, 0.3, 0x2A5A8A, [0x6A7A3A, 0xE8E6E0, 0x8A6A42, 0xC8A060, 0x3A4A22]);
hxCounter(G, "sea", T.x + 4, T.z + 1, 0.3, 0x8A3A2A, [0xD8C8A8, 0xA8784A, 0x6A4A2A, 0xC8B890, 0x8A8478]);
hxSignAt(G, "sea", ["The Market of Scheria", "Everything a ship needs"], T.x - 3, T.z - 2, 0.3, "#1A2A3A", "#F0E0B0");
hxPersonAt(G, "sea", "sea_eurymede", { sex: "f", look: GREEK(0x7AA8C8, 1) }, T.x, T.z + 1.4, { name: "Eurymede, a Phaeacian trader", persona: "You are Eurymede, a Phaeacian trader who keeps a stall in the market by the harbour of Scheria, the land of the Phaeacians from Homer's Odyssey (Books 6 to 8), where King Alcinous rules and the ships steer themselves by thought. You sell olives, salt, timber, sailcloth and leather, and buy fish, pearls, sponges and shells from sailors. You are hospitable, proud of your people's ships, and fair in trade. Keep it friendly and suitable for all ages.", greet: "Welcome to Scheria, stranger. Strangers are sent by Zeus, we say. What does your ship need?" }, Math.PI + 0.3);
hxWrapKeeper("sea", "Eurymede, a Phaeacian trader", [["🛒 Trade at the market", "Olives, salt, timber, sailcloth; she buys your catch", hxStallTalk("scheria")]]);
if (SEA.talkers)
SEA.talkers.push({ x: T.x + 4, z: T.z + 1, r: 2.6, name: T.name, verb: "trade", fn: hxStallTalk("scheria") });
var yx = 5626, yz = -5452, yy = hxGround("sea", yx, yz), yd = new THREE.Group();
yd.position.set(yx, yy, yz);
yd.rotation.y = -0.4;
G.add(yd);
var hull = wMesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x8A6A42, { ds: 1 }), 0, 1.6, 0, yd);
hull.scale.set(1.4, 1.2, 5.5);
hull.rotation.x = Math.PI;
for (var r = 0; r < 5; r++)
wBox(3.4, 0.3, 0.3, wM(0x5A4030), 0, 0.3, -4 + r * 2, yd);
for (var t = 0; t < 6; t++) {
var pl = wBox(0.3, 0.1, 5, wM(0xA8844A), 3 + (t % 3) * 0.35, 0.1 + Math.floor(t / 3) * 0.12, 0, yd);
pl.rotation.y = 0.02 * t;
}
hxSignAt(G, "sea", ["The Shipwrights' Yard", "Scheria builds the swiftest ships"], yx - 4, yz + 3, -0.4, "#1A2A3A", "#F0E0B0");
if (SEA.talkers)
SEA.talkers.push({ x: yx + 3, z: yz, r: 3.4, name: "The shipwrights' yard", verb: "work at the bench and make something", fn: function () { if (typeof craftOpen === "function")
craftOpen("scheria"); } });
},
function (G, list) {
var S = hxMarketSpots();
var vae = S[1], bra = S[2];
if (vae)
hxPersonAt(G, "underdark", "ud_vaeryn", { sex: "f", look: UD_ELF(0x5A4A6A, 1, 2) }, vae.x, vae.z, { name: "Vaeryn, a silk-weaver", persona: "You are Vaeryn, a dark elf silk-weaver of Zhaelvorn who sells spider silk and silk cloth at the Halfway Market" + UD_SETTING + " The bridge-weavers wind the silk from the old webs along the Riven Deep, and you weave it into cloth light as smoke. You are soft-spoken, exact and a little proud of your craft.", greet: "Silk from the Riven Deep. Touch it: lighter than breath, and it will hold a bridge." }, vae.ry);
if (bra)
hxPersonAt(G, "underdark", "ud_bramwick", { sex: "m", look: UD_GNOME(0x4A6A3A), scale: 0.62 }, bra.x, bra.z, { name: "Bramwick Tuft, a mushroom grower", persona: "You are Bramwick Tuft, a deep gnome who grows mushrooms on the Velvetcap Terraces and sells them at the Halfway Market" + UD_SETTING + " You sell glowcaps and velvetcaps, and buy blind fish from the Darklake fishers. You are cheerful, chatty and full of mushroom recipes (simple and safe ones).", greet: "Glowcaps! Fresh from the Terraces this morning, as near as anyone can tell a morning down here." }, bra.ry);
hxWrapKeeper("underdark", "Orrin Saltpocket, a trader", [["🛒 Trade at Orrin's stall", "Ore and coal; he buys rough gems and crystal", hxStallTalk("orrin")]]);
hxWrapKeeper("underdark", "Vaeryn, a silk-weaver", [["🛒 Trade at the silk-weaver's stall", "Spider silk and silk cloth", hxStallTalk("silk")]]);
hxWrapKeeper("underdark", "Bramwick Tuft, a mushroom grower", [["🛒 Trade at the mushroom stall", "Glowcaps; he buys glowcaps and blind fish", hxStallTalk("caps")]]);
hxWrapKeeper("underdark", "Ysra, a mapmaker of Zhaelvorn", [["🗺️ Look at Ysra's maps", "Every place in the deep, and the way to it", function () { hxStall("ysra"); }]]);
["orrin", "silk", "caps", "ysra"].forEach(function (id) {
var T = HX_STALLS[id], P = S[T.stall];
if (!P || !list)
return;
var cx = (P.x + P.sx) / 2, cz = (P.z + P.sz) / 2;
list.push({ x: cx, z: cz, r: 1.6, name: T.name, verb: T.maps ? "look at the maps" : "trade", fn: hxStallTalk(id) });
});
var F = UD_SPOTS.forge, mid = -0.5, mx = F.x + Math.cos(mid) * 14, mz = F.z + Math.sin(mid) * 14, ry = Math.atan2(-Math.cos(mid), -Math.sin(mid)), fp = udLW(mx, mz, ry, 0, 2.4);
if (list)
list.push({ x: fp.x, z: fp.z, r: 2.6, name: "The middle smithy's anvil", verb: "work at the forge and make something", fn: function () { if (typeof craftOpen === "function")
craftOpen("cinderwell"); } });
var forgeOpt = [["⚒️ Work at the forge", "Weapons, armour, smelting: make it yourself, or commission it", function () { if (typeof craftOpen === "function")
craftOpen("cinderwell"); }],
["🛒 Buy ore, coal and crystal", "At the forge's own counter", function () { if (typeof craftOpen === "function")
craftOpen("cinderwell"); }]];
hxWrapKeeper("underdark", "Durra Anvilsong, a smith", forgeOpt);
hxWrapKeeper("underdark", "Kesh, a silversmith of Zhaelvorn", forgeOpt);
hxEchoBuild(G, list);
},
function (G, list) {
var T = HX_STALLS.supply, sh = new THREE.Group(), y = hxGround("northpole", T.x, T.z);
sh.position.set(T.x, y, T.z);
sh.rotation.y = -Math.PI / 2;
G.add(sh);
wBox(5, 3, 3.4, wM(0x7A3A2A), 0, 1.5, -1, sh);
var rf = wMesh(new THREE.ConeGeometry(4, 1.6, 4), wM(0xF4F8FF), 0, 3.8, -1, sh);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 0.75;
wBox(4.6, 1, 0.8, wM(0x6A4A2E), 0, 0.5, 1.1, sh);
[0x1E4A32, 0xC81E22, 0xB8C0A0, 0xE8C04A, 0x8A6A42].forEach(function (c, i) { wBox(0.4, 0.4, 0.4, wM(c), -1.6 + i * 0.8, 1.2, 1.1, sh); });
NP.solids.push({ x: T.x + 1, z: T.z, hw: 1.8, hd: 2.6 }, { x: T.x - 1.1, z: T.z, hw: 0.45, hd: 2.3 });
hxSignAt(G, "northpole", ["The Supply Shed", "Boughs, holly, moss, ribbon, timber"], T.x - 1.6, T.z - 3.6, -Math.PI / 2, "#1E3A2A", "#F4E8C8");
var bx = T.x - 2.4, bz = T.z + 2.9;
hxPersonAt(G, "northpole", "np_bramble", { child: true, elf: 1, sex: "f", look: { top: 0x2A8A3A, topKind: "shirt", bottom: 0xC82A2A, shoes: 0x3A2A1A, hat: "beanie", hatColor: 0xC82A2A } }, bx, bz, { name: "Bramble the elf", persona: "You are Bramble, the elf who keeps the Supply Shed at the North Pole in SomnuMatrix: everything the village uses comes through your shed, boughs and holly for the halls, moss for the reindeer, ribbon for the presents and timber for the benches. You are brisk, cheerful and very organised, with a list for everything." + NP_KIDS, greet: "Hello! Supply Shed's open. Boughs, holly, moss, ribbon, timber. What can I find you?" }, -Math.PI / 2);
if (NP.people.length) {
NP.people[NP.people.length - 1].elf = true;
}
hxWrapKeeper("northpole", "Bramble the elf", [["🛒 Trade at the Supply Shed", "Boughs, holly, moss, ribbon and timber; Bramble buys what you gather", hxStallTalk("supply")]]);
if (list)
list.push({ x: T.x - 2.6, z: T.z, r: 3, name: T.name, verb: "trade", fn: hxStallTalk("supply") });
var S0 = NP.shop, bx2 = S0.x - 16, bz2 = S0.z + 8.5, b = new THREE.Group();
b.position.set(bx2, 0.3, bz2);
G.add(b);
wBox(3, 0.12, 1.1, wM(0x8A6A42), 0, 0.95, 0, b);
[-1.3, 1.3].forEach(function (x) { wBox(0.12, 0.95, 1, wM(0x6A4A2E), x, 0.47, 0, b); });
wBox(0.5, 0.3, 0.3, wM(0xC8A060), -0.8, 1.15, 0, b);
wCyl(0.12, 0.12, 0.6, wM(0xC82A2A), 0.2, 1.13, 0, b, 8).rotation.z = Math.PI / 2;
wBox(0.6, 0.05, 0.05, wM(0xA8ACB4), 0.9, 1.04, 0.2, b);
NP.solids.push({ x: bx2, z: bz2, hw: 1.5, hd: 0.6 });
if (list)
list.push({ x: bx2, z: bz2 + 1.4, r: 2.4, name: "The spare bench", verb: "make something (brooms, sleds, carts, bows)", fn: function () { if (typeof craftOpen === "function")
craftOpen("npbench"); } });
var wx = 20, wz = 124, tb = new THREE.Group();
tb.position.set(wx, hxGround("northpole", wx, wz), wz);
G.add(tb);
wBox(2.6, 0.1, 1.2, wM(0x8A6A42), 0, 0.9, 0, tb);
[-1.2, 1.2].forEach(function (x) { wBox(0.1, 0.9, 1.1, wM(0x6A4A2E), x, 0.45, 0, tb); });
[0xC82A2A, 0x2A5AA8, 0x2A8A3A, 0xE8C04A].forEach(function (c, i) { var r = wCyl(0.12, 0.12, 0.9, wM(c), -0.9 + i * 0.6, 1.07, 0, tb, 10); r.rotation.z = Math.PI / 2; });
hxSignAt(G, "northpole", ["The Wrapping Race", "Eight presents, ninety seconds", "The right paper, the right ribbon"], wx + 2.4, wz - 1.4, 0, "#3A1A1A", "#F4E8C8");
NP.solids.push({ x: wx, z: wz, hw: 1.3, hd: 0.6 });
if (list)
list.push({ x: wx, z: wz - 1.3, r: 2.4, name: "The Wrapping Race", verb: "have a go", fn: function () { hxWrapCard(); } });
},
function (G) {
var leaf = wM(0x4A7A3A), done = wM(0xC8D8C0, { op: 0.45 }), next = wM(0xE8C060, { e: 0x6A4A10, ei: 0.5 }), fl = [0xF0A0B8, 0xF8F0D8, 0xE8C04A];
HX_RINGS = [];
for (var i = 0; i < 10; i++) {
var a = -2.2 + i / 10 * Math.PI * 2, x = 40 + Math.cos(a) * 300, z = -80 + Math.sin(a) * 270, h = Math.max(hxGround("neverland", x, z), 0) + 20 + (i % 3) * 7;
var g = new THREE.Group();
g.position.set(x, h, z);
g.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
G.add(g);
var ring = wMesh(new THREE.TorusGeometry(6, 0.45, 8, 28), leaf, 0, 0, 0, g);
for (var f = 0; f < 10; f++) {
var fa = f / 10 * Math.PI * 2;
wSph(0.42, wM(fl[f % 3]), Math.cos(fa) * 6, Math.sin(fa) * 6, 0, g, 6);
}
HX_RINGS.push({ g: g, ring: ring, x: x, y: h, z: z, leaf: leaf, done: done, next: next });
}
hxRingsPaint();
},
function () {
var b = hxBest("rings");
worldCard(worldFacts("The Never Rings", "The flying school's course", [["Rings", "ten, round the Never Peak"], ["Your best", b ? hxClock(b) : "not flown yet"]], ["Fly through the rings in order: the next one is gold, the ones you have flown fade pale.", "In Neverland you can fly: Space to rise, C to sink, and go where you look.", "Finish the course and the fairies leave you a pinch of fairy dust (once in a while)."]) +
worldBtn("go", "🪽 Start the course", "The clock starts when you press it") + worldBtn("job", "📋 Work here", "The flying school takes on instructors"), { go: function () { worldCard(null); HX.game = { kind: "rings", i: 0, t: 0 }; hxRingsPaint(); hxSay("<b>Off you go!</b> The first ring is gold, out over the island. Follow the arrow on the banner."); hxTone(784, 0.2); },
job: function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen("The Never Rings"); } });
},
function (dt) {
var G = HX.game;
if (!G || G.kind !== "rings")
return;
if (hxWorld() !== "neverland") {
HX.game = null;
hxRingsPaint();
return;
}
G.t += dt;
var P = camera.position, R = HX_RINGS[G.i], base = WORLDS.neverland.base;
if (!R)
return;
var d = Math.hypot(P.x - base - R.x, P.y - R.y, P.z - R.z);
if (d < 6.5) {
G.i++;
hxTone(659 + G.i * 30, 0.15);
if (G.i >= HX_RINGS.length) {
var t = G.t, b = hxBest("rings");
HX.game = null;
hxRingsPaint();
if (!b || t < b)
hxSetBest("rings", t);
var rh = "<b>All ten rings in " + hxClock(t) + "!</b>" + (!b || t < b ? " Your best yet." : " Your best is " + hxClock(b) + ".") + " ";
setTimeout(function () { hxTone(784, 0.2); setTimeout(function () { hxTone(988, 0.3); }, 200); }, 100);
hxPrize("nv_rings", function (x) { hxSay(rh + x); }, "Peter crows from somewhere in the wood", "drops you", "pixie dust");
return;
}
hxRingsPaint();
}
if (G.t > 600) {
HX.game = null;
hxRingsPaint();
hxSay("The Never Rings: the course is cleared after ten minutes. Try again from the post by the Hangman's Tree.");
}
},
function () {
var G = HX.game;
if (!G || G.kind !== "rings")
return "";
var R = HX_RINGS[G.i];
if (!R)
return "";
var L = hxL(), dx = R.x - L.x, dz = R.z - L.z, d = Math.hypot(dx, dz), up = R.y - L.y, arrow = "➜";
try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
arrow = pfindArrow(bearingOf(dx, dz));
}
catch (e) { }
return "<div>🪽 <b>Ring " + (G.i + 1) + " of " + HX_RINGS.length + "</b> · " + hxClock(G.t) + " · " + arrow + " " + Math.round(d) + " m" + (Math.abs(up) > 4 ? (up > 0 ? " · higher" : " · lower") : "") + "</div>";
},
function (msg) {
var F = HX.fish;
if (!F)
return;
var where = F.spot === "ud_fish" ? "The end of Stillwater Landing" : "The Wayfarer's rail";
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + where + "</div>", fns = {};
if (F.state === "idle") {
h += "<div style='opacity:.85;margin:4px 0'>" + (F.spot === "ud_fish" ? "A silk line, a bent pin and a bit of glowcap for bait. The black water is very still." : "A line and a hook over the side. Off Pylos and Ithaca the big tunny run.") + "</div>" + worldBtn("cast", "🎣 Cast the line", "Wait for the bite, then strike");
fns.cast = hxFishCast;
}
else if (F.state === "wait") {
h += "<div style='margin:8px 0'>The line drifts… <i>wait for it.</i></div>" + worldBtn("strike", "Strike", "Too soon and it's gone");
fns.strike = function () { F.state = "idle"; hxFishPaint("Too soon: the fish was only nosing the bait."); };
}
else if (F.state === "bite") {
h += "<div style='margin:8px 0;color:#FFE7B0'><b>A bite! Strike now!</b></div>" + worldBtn("strike", "🎣 Strike!", "");
fns.strike = hxFishStrike;
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (dt) {
var F = HX.fish;
if (!F)
return;
if (!WLD.card || WLD.card.style.display !== "block") {
HX.fish = null;
return;
}
if (F.state === "wait") {
F.t -= dt;
if (F.t <= 0) {
F.state = "bite";
F.t = F.win;
hxTone(880, 0.12);
hxFishPaint();
}
}
else if (F.state === "bite") {
F.t -= dt;
if (F.t <= 0) {
F.state = "idle";
hxFishPaint("It got away. Cast again.");
}
}
},
function () {
var F = HX.fish;
if (!F)
return;
F.state = "idle";
var id = hxFishSpot();
if (!hxSigned()) {
hxFishPaint("Landed! (Sign in and what you catch is kept in your backpack.)");
return;
}
if (HX.picked[id] > Date.now() && !hxKeeper()) {
hxFishPaint("Landed, and let go: you have had your share here for now. Come back in " + Math.ceil((HX.picked[id] - Date.now()) / 60000) + " minutes.");
return;
}
hxFishPaint("Landed! …");
hxGive(id, function (o) { hxFishPaint(esc((o && o.say) || "Into your stock.")); }, function (o) { hxFishPaint(esc((o && o.say) || "It slipped the hook.")); });
},
function (G, list) {
var H = UD_SPOTS.hollow;
HX_ECHO.stones = [];
for (var i = 0; i < 4; i++) {
var a = Math.PI * 0.7 + i * 0.45, x = H.x + Math.cos(a) * 5, z = H.z + Math.sin(a) * 5, y = hxGround("underdark", x, z), col = HX_ECHO.cols[i];
var m = new THREE.MeshLambertMaterial({ color: col });
m.emissive = new THREE.Color(col);
m.emissiveIntensity = 0.12;
var s = wMesh(new THREE.DodecahedronGeometry(0.7, 0), m, x, y + 0.55, z, G);
s.scale.y = 1.3;
var gl = wGlow(col, 2.4, 0.12);
gl.position.set(x, y + 0.9, z);
G.add(gl);
HX_ECHO.stones.push({ m: m, gl: gl, lit: 0 });
UD.solids.push({ x: x, z: z, r: 0.7 });
}
hxSignAt(G, "underdark", ["The Singing Stones", "Listen, then sing it back", "Each stone has its own note"], H.x + 6, H.z - 4, Math.PI / 2, "#2A2620", "#D8E0FF");
if (list)
list.push({ x: H.x + 1, z: H.z + 1, r: 3.2, name: "The Singing Stones", verb: "play", fn: hxEchoCard });
},
function (msg) {
var E = HX.game && HX.game.kind === "echo" ? HX.game : null, b = hxBest("echo");
var h = "<div style='font:600 17px var(--serif,Georgia);color:#E8D8FF'>The Singing Stones</div>", fns = {};
if (!E) {
h += "<div style='opacity:.85;margin:4px 0'>Four stones, four notes. The stones sing a tune; sing it back by touching them in the same order. Each time you get it right, the tune grows by a note. Reach seven and the Listener says the stones may let you keep a sliver of crystal.</div>" +
"<div style='opacity:.75'>Your best: " + (b || "none yet") + "</div>" + worldBtn("go", "🎵 Begin", "");
fns.go = function () { HX.game = { kind: "echo", seq: [], at: 0, play: -1, pt: 0 }; hxEchoNext(); };
}
else {
h += "<div style='margin:4px 0'>" + (E.play >= 0 ? "<i>Listen…</i>" : "Your turn: " + E.at + " of " + E.seq.length) + "</div>";
HX_ECHO.names.forEach(function (n, i) {
var c = "#" + ("00000" + HX_ECHO.cols[i].toString(16)).slice(-6);
h += "<div data-w='s" + i + "' role='button' tabindex='0' style='display:inline-block;margin:4px;padding:12px 14px;min-width:42%;border-radius:6px;border:1px solid " + c + ";background:" + c + "33'><b>" + esc(n.replace(/^the /, "")) + "</b></div>";
fns["s" + i] = function () { hxEchoPress(i); };
});
h += worldBtn("stop", "Stop", "");
fns.stop = function () { HX.game = null; worldCard(null); };
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (dt) {
HX_ECHO.stones.forEach(function (S) { if (S.lit > 0)
S.lit = Math.max(0, S.lit - dt * 1.4); var k = Math.sin(Math.min(1, S.lit) * Math.PI / 2); S.m.emissiveIntensity = 0.12 + 0.6 * k; S.gl.material.opacity = 0.12 + 0.45 * k; });
var E = HX.game;
if (!E || E.kind !== "echo")
return;
if (hxWorld() !== "underdark") {
HX.game = null;
return;
}
if (E.play >= 0) {
E.pt -= dt;
if (E.pt <= 0) {
if (E.play < E.seq.length) {
hxEchoLight(E.seq[E.play]);
E.play++;
E.pt = 0.95;
}
else {
E.play = -1;
hxEchoCard();
}
}
}
},
function (i) {
var E = HX.game;
if (!E || E.kind !== "echo" || E.play >= 0)
return;
hxEchoLight(i);
if (E.seq[E.at] !== i) {
var got = E.seq.length - 1;
HX.game = null;
if (got > hxBest("echo"))
hxSetBest("echo", got);
hxEchoCard("Not quite: that was " + esc(HX_ECHO.names[E.seq[E.at]]) + ". You sang back " + got + " notes.");
return;
}
E.at++;
if (E.at >= E.seq.length) {
var n = E.seq.length;
if (n >= 7) {
HX.game = null;
if (n > hxBest("echo"))
hxSetBest("echo", n);
var won = "<b>Seven notes, every one true.</b> The stones hum together";
if (!hxSigned()) {
hxEchoCard(won + ". Sign in, and the next time you win the crystal they give is kept in your backpack.");
return;
}
var wait = (+HX.picked.ud_echo || 0) - Date.now();
if (wait > 0 && !hxKeeper()) {
hxEchoCard(won + ", but they gave you crystal a little while ago. They will give again in " + Math.ceil(wait / 60000) + " minutes.");
return;
}
hxEchoCard(won + "…");
hxGive("ud_echo", function (o) {
var M = hxMat(o.kind);
hxEchoCard(won + ", and " + (o.got > 1 ? o.got + " slivers" : "a sliver") + " of " + esc(String(M.name || "crystal").toLowerCase()) + " " + (o.got > 1 ? "come" : "comes") + " away in your hand. " +
(M.icon || "💎") + " <b>It is in your 🎒 Backpack, under Materials.</b>");
if (typeof bwFeed === "function")
try {
bwFeed((M.icon || "💎") + " +" + o.got + " " + esc(String(M.name || o.kind).toLowerCase()), "#CFE8C0");
}
catch (e) { }
}, function (o) { hxEchoCard(won + ", but the crystal would not come away: " + esc((o && o.say) || (o && o.message) || "try again in a moment.")); });
return;
}
E.seq.push(Math.floor(Math.random() * 4));
E.at = 0;
E.play = 0;
E.pt = 1.1;
hxEchoCard("Right! Now one more note…");
return;
}
hxEchoCard();
},
function (msg) {
var Wg = HX.game && HX.game.kind === "wrap" ? HX.game : null, b = hxBest("wrap"), h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Wrapping Race</div>", fns = {};
if (!Wg) {
h += "<div style='opacity:.85;margin:4px 0'>Eight presents and ninety seconds. Each one has a tag: read it, and wrap it in the right paper with the right ribbon. Six or more right, and the wrappers give you their ribbon offcuts.</div><div style='opacity:.75'>Your best: " + (b ? b + " of 8" : "none yet") + "</div>" + worldBtn("go", "🎁 Start", "");
fns.go = function () { HX.game = { kind: "wrap", n: 0, right: 0, t: 90, cur: hxWrapNew(), pick: null }; hxWrapCard(); };
}
else {
var c = Wg.cur;
h += "<div style='margin:4px 0'>Present " + (Wg.n + 1) + " of 8 · " + Math.ceil(Wg.t) + " s left · " + Wg.right + " right</div>" +
"<div style='margin:8px 0;padding:8px 10px;border:1px dashed #C9A868;border-radius:4px;background:rgba(240,220,170,.08)'>🏷️ <b>For " + esc(c.who) + "</b>, who loves " + esc(c.loves) + ".<br><i>Wrap me in " + c.paper + " paper, with a " + c.ribbon + " ribbon.</i></div>";
if (!Wg.pick) {
h += "<div style='opacity:.8'>Paper:</div>";
HX_WRAP.papers.forEach(function (p, pi) { h += worldBtn("p_" + p[0], ["🟥", "🟩", "🟦", "🟨"][pi] + " " + p[0].charAt(0).toUpperCase() + p[0].slice(1) + " paper", null); fns["p_" + p[0]] = function () { Wg.pick = p[0]; hxWrapCard(); }; });
}
else {
h += "<div style='opacity:.8'>Paper: " + Wg.pick + ". Ribbon:</div>";
HX_WRAP.ribbons.forEach(function (r) { h += worldBtn("r_" + r, r.charAt(0).toUpperCase() + r.slice(1) + " ribbon", null); fns["r_" + r] = function () { hxWrapDone(r); }; });
}
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (rb) {
var G = HX.game;
if (!G || G.kind !== "wrap")
return;
var ok = G.pick === G.cur.paper && rb === G.cur.ribbon;
if (ok) {
G.right++;
hxTone(659, 0.1);
}
else
hxTone(220, 0.15);
G.n++;
G.pick = null;
if (G.n >= 8)
return hxWrapEnd(ok ? "Right!" : "Not that one.");
G.cur = hxWrapNew();
hxWrapCard(ok ? "Right! Onto the sleigh pile." : "Oops: that one was meant to be " + G.cur.paper + "… never mind, next!");
},
function (last) {
var G = HX.game;
HX.game = null;
var n = G.right;
if (n > hxBest("wrap"))
hxSetBest("wrap", n);
var head = (last ? last + " " : "") + "<b>" + n + " of 8 wrapped right.</b> ";
if (n < 6) {
hxWrapCard(head + "Six right wins the wrappers' ribbon. Have another go!");
return;
}
hxPrize("np_wrap", function (t) { hxWrapCard(head + t); }, "The wrappers cheer", "hand you", "ribbon offcuts");
},
function (id, show, cheer, verb, what) {
if (!hxSigned()) {
show(cheer + ". Sign in, and the next time you win the " + what + " is kept in your backpack.");
return;
}
var wait = (+HX.picked[id] || 0) - Date.now();
if (wait > 0 && !hxKeeper()) {
show(cheer + ", but they gave you " + what + " a little while ago. Win again in " + Math.ceil(wait / 60000) + " minutes for more.");
return;
}
show(cheer + "…");
hxGive(id, function (o) {
var M = hxMat(o.kind);
show(cheer + ", and " + verb + " " + o.got + " × " + esc(String(M.name || o.kind).toLowerCase()) + ". " + (M.icon || "🎁") + " <b>It is in your 🎒 Backpack, under Materials.</b>");
if (typeof bwFeed === "function")
try {
bwFeed((M.icon || "🎁") + " +" + o.got + " " + esc(String(M.name || o.kind).toLowerCase()), "#CFE8C0");
}
catch (e) { }
}, function (o) { show(cheer + ", but the prize could not be given: " + esc((o && o.say) || (o && o.message) || "try again in a moment.")); });
},
function () {
var w = hxWorld();
if (!w)
return;
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Things to do in " + esc(HX_WORLDS[w]) + "</div>", fns = {}, n = 0;
function head(t) { h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function go(label, sub, fn) { var k = "h" + (n++); h += worldBtn(k, label, sub); fns[k] = fn; }
function way(name, x, z) { return function () { hxGuideTo(w, x, z, name); }; }
if (w === "sea" && SEA.aboard) {
head("Aboard the Wayfarer");
go("🎣 Fish from the rail", "Fresh fish anywhere; big tunny off Pylos and Ithaca", function () { hxFishOpen("sea"); });
go("🛒 The purser's stores", "Buy salt, olives, sailcloth, timber; sell your catch", function () { hxStall("purser"); });
go("📋 Work aboard", "Deckhand, helmsman, lookout, cook, net fisher, carpenter", function () { if (typeof ahOpen === "function")
ahOpen("The Wayfarer"); });
}
head("Work · real shifts, paid like any post in the city");
HX_WORK.forEach(function (r) {
if (r[1] !== w)
return;
var jobs = HX_JOBS.filter(function (j) { return j[3] === r[0]; }).map(function (j) { return j[2]; });
go("📋 " + esc(r[0]), esc(jobs.join(", ")), function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(r[0]); });
});
var stalls = Object.keys(HX_STALLS).filter(function (k) { return HX_STALLS[k].world === w && !HX_STALLS[k].aboard; });
if (stalls.length) {
head("Trade");
stalls.forEach(function (k) {
var T = HX_STALLS[k], P = T.stall != null ? hxMarketSpots()[T.stall] : null, x = P ? P.x : T.x, z = P ? P.z : T.z;
go("🛒 " + esc(T.name), esc(T.maps ? "Maps of the deep" : "Sells " + T.sells.map(function (s) { return hxMat(s).name.toLowerCase(); }).join(", ")), way(T.name, x, z));
});
}
head("Gather · into your stock");
var seen = {};
HX_SPOTS.forEach(function (s) {
if (s[1] !== w || s[10] === "prize" || s[10] === "aboard" || seen[s[8]])
return;
seen[s[8]] = 1;
var M = hxMat(s[2]);
go((M.icon || "") + " " + esc(s[8]), esc(M.name), s[10] === "jetty" ? way("The end of Stillwater Landing", s[3], s[4]) : way(s[8], s[3], s[4]));
});
head("Games");
if (w === "neverland") {
var R = HX_WP["The Never Rings"];
go("🪽 The Never Rings", "A flying course round the Never Peak" + (hxBest("rings") ? " · your best " + hxClock(hxBest("rings")) : ""), way("The Never Rings", R.x, R.z));
}
if (w === "sea")
go("🎣 Fishing", "From the rail, aboard (above)", function () { if (SEA.aboard)
hxFishOpen("sea");
else
hxSay("Go back aboard the Wayfarer to fish from her rail."); });
if (w === "underdark") {
var H = UD_SPOTS.hollow;
go("🎵 The Singing Stones", "At the Echoing Hollow: sing the tune back", way("The Singing Stones", H.x + 1, H.z + 1));
go("🎣 Fishing the Darklake", "At the end of Stillwater Landing", way("The end of Stillwater Landing", -230, -950));
}
if (w === "northpole")
go("🎁 The Wrapping Race", "Outside the Wrapping House", way("The Wrapping Race", 20, 123));
head("Make your own");
if (w === "underdark") {
var F = UD_SPOTS.forge;
go("⚒️ Cinderwell Forges", "Weapons, armour, smelting", way("Cinderwell Forges", F.x, F.z + 18));
}
if (w === "northpole")
go("🪚 The workshop's spare bench", "Brooms, sleds and carts, bows", way("The spare bench", NP.shop.x - 16, NP.shop.z + 10));
if (w === "sea")
go("🪚 The shipwrights' yard at Scheria", "Carts, wagons, bows, staves", function () { hxSay("The shipwrights' yard is at the harbour of Scheria: set a course for it on the chart (M), and go ashore."); });
if (w === "neverland")
h += "<div style='opacity:.75'>No forge in Neverland: the Lost Boys make do. The Tailors' Counter sells cloth for the forges in other worlds.</div>";
worldCard(h, fns);
}
];
});
