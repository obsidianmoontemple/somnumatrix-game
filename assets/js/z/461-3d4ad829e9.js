/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(461, function () {
return [
function (o) {
var c = wfPick([0x2A2A30, 0x3A2E2A, 0x2E3440, 0x4A3A3A, 0x343A2E], o.r), sh = wfPick([0x6A3A2A, 0x3A4A3A, 0x5A4A6A, 0x7A5A3A, 0x4A2A2A], o.r * 7 % 1);
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.14:cloth", "oz:apron:half:long:0.12", "oz:pelerine"], col: { dress: c, skirt: c, trim: 0xD8D0C0, apron: wfPick([0xE8E0D0, 0x8A8070, 0xC8BCA8], o.r * 3 % 1), cape: sh }, shoes: 0x1E1610 };
},
function (o) {
var c = wfPick([0x4A4034, 0x3A3A3E, 0x5A4A3A, 0x2E3A44], o.r);
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:trousers:cloth", "oz:boots"].concat(o.r < 0.6 ? ["oz:coat:jacket:cloth"] : []), col: { shirt: 0xC8BEAC, collar: 0xC8BEAC, tie: wfPick([0x8A2A2A, 0x2A3A6A, 0xC8A040], o.r * 5 % 1), vest: wfDark(c, 0.1), coat: c, trou: wfDark(c, 0.25) }, shoes: 0x1E1610 };
},
function (add, c) {
var g = new THREE.Group(), straw = wfMat(c || 0x1A1614, { r: 0.9 });
var cr = new THREE.Mesh(wfGeo("wcbonc", function () { return new THREE.SphereGeometry(0.13, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), straw);
cr.scale.set(1, 0.75, 1.08);
g.add(cr);
var br = new THREE.Mesh(wfGeo("wcbonb", function () { return new THREE.CylinderGeometry(0.15, 0.16, 0.012, 18, 1, false, -Math.PI * 0.7, Math.PI * 1.4); }), straw);
br.position.set(0, -0.01, 0.03);
br.rotation.x = -0.4;
g.add(br);
var rb = new THREE.Mesh(wfGeo("wcbonr", function () { return new THREE.TorusGeometry(0.128, 0.01, 4, 18); }), wfMat(0x2A1A2A));
rb.rotation.x = Math.PI / 2;
rb.position.y = 0.02;
g.add(rb);
add("Head", [0, 0.12, -0.02], g);
},
function (add) {
var g = new THREE.Group(), blk = wfMat(0x141416, { r: 0.7 });
var cr = new THREE.Mesh(wfGeo("wcsbc", function () { return new THREE.SphereGeometry(0.15, 14, 9, 0, Math.PI * 2, 0, Math.PI * 0.6); }), blk);
cr.scale.set(1, 0.95, 1.15);
cr.rotation.x = -0.5;
g.add(cr);
var rb = new THREE.Mesh(wfGeo("wcsbr", function () { return new THREE.TorusGeometry(0.15, 0.018, 4, 18, Math.PI); }), wfMat(0xB82020));
rb.rotation.set(-0.5, 0, 0);
rb.position.set(0, 0.03, 0);
g.add(rb);
add("Head", [0, 0.1, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x141416, { r: 0.85 });
var t = new THREE.Mesh(wfGeo("wcpkt", function () { return new THREE.CylinderGeometry(0.13, 0.125, 0.07, 16); }), mt);
t.position.y = 0.02;
g.add(t);
var p = new THREE.Mesh(wfGeo("wcpkp", function () { return new THREE.CylinderGeometry(0.09, 0.09, 0.01, 12, 1, false, -Math.PI / 2, Math.PI); }), wfMat(0x0A0A0C));
p.position.set(0, -0.012, 0.1);
g.add(p);
add("Head", [0, 0.12, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x6A5A40, { r: 1 });
var t = new THREE.Mesh(wfGeo("wcdrt", function () { return new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), mt);
t.scale.set(1, 0.75, 1.1);
g.add(t);
[-1, 1].forEach(function (k) { var p = new THREE.Mesh(wfGeo("wcdrp", function () { return new THREE.CylinderGeometry(0.07, 0.07, 0.01, 10, 1, false, -Math.PI / 2, Math.PI); }), mt); p.position.set(0, -0.01, k * 0.12); if (k < 0)
p.rotation.y = Math.PI; g.add(p); });
add("Head", [0, 0.11, -0.005], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("wclmpb", function () { return new THREE.CylinderGeometry(0.06, 0.06, 0.15, 10); }), wfMat(0x1A1A1E, { m: 0.6, r: 0.4 })));
var l = new THREE.Mesh(wfGeo("wclmpl", function () { return new THREE.CircleGeometry(0.045, 10); }), wfMat(0xFFE0A0, { e: 0xFFC060, ei: 0.9 }));
l.position.set(0, 0, 0.062);
g.add(l);
add("hand_l", [0, -0.12, 0.04], g);
},
function (title, notes, btns, quote, src) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quote ? "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(quote) + "</p>" + (src ? "<div style='font-size:11px;opacity:.65;margin-top:-2px'>" + esc(src) + "</div>" : "") : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
var fns = {};
(btns || []).forEach(function (B) { b += worldBtn(B[0], B[1], B[2] || ""); fns[B[0]] = function () { worldCard(null); B[3](); }; });
worldCard(b, fns);
WCH.read++;
},
function (x, W, H, pal, seed) {
var R = wRand(seed || 7);
x.fillStyle = pal[0];
x.fillRect(0, 0, W, H);
var ch = Math.max(5, Math.round(W / 56)), cw = ch * 2.2;
for (var y = 0; y < H; y += ch) {
var off = (y / ch) % 2 ? cw / 2 : 0;
for (var xx = -cw; xx < W; xx += cw) {
x.fillStyle = pal[(R() * 3) | 0];
x.globalAlpha = 0.55 + R() * 0.45;
x.fillRect(xx + off + 1, y + 1, cw - 2, ch - 2);
}
}
x.globalAlpha = 1;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(10,8,6,.35)");
g.addColorStop(0.5, "rgba(10,8,6,.05)");
g.addColorStop(1, "rgba(10,8,6,.3)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var s = 0; s < 14; s++) {
x.fillStyle = "rgba(0,0,0," + (0.05 + R() * 0.08) + ")";
var sx = R() * W;
x.fillRect(sx, R() * H * 0.5, 2 + R() * 5, H * 0.3 + R() * H * 0.5);
}
},
function (x, X0, Y0, w, h, R, o) {
o = o || {};
x.fillStyle = "#C8BCA4";
x.fillRect(X0 - 3, Y0 + h, w + 6, 4);
x.fillStyle = o.frame || "#D8D0BC";
x.fillRect(X0 - 2, Y0 - 2, w + 4, h + 4);
var lit = R() < (o.lit || 0.25);
var g = x.createLinearGradient(0, Y0, 0, Y0 + h);
if (lit) {
g.addColorStop(0, "#C89850");
g.addColorStop(1, "#7A4A20");
}
else {
g.addColorStop(0, "#2A2E34");
g.addColorStop(1, "#14161A");
}
x.fillStyle = g;
x.fillRect(X0, Y0, w, h);
if (R() < 0.4) {
x.fillStyle = lit ? "rgba(220,200,160,.75)" : "rgba(160,150,130,.6)";
x.fillRect(X0, Y0, w, h * (0.15 + R() * 0.35));
}
if (R() < 0.12) {
x.strokeStyle = "rgba(200,200,190,.6)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(X0 + w * 0.2, Y0 + h * 0.6);
x.lineTo(X0 + w * 0.5, Y0 + h * 0.8);
x.lineTo(X0 + w * 0.35, Y0 + h);
x.stroke();
}
if (R() < 0.15) {
x.fillStyle = "#3A2A1E";
x.fillRect(X0 + w * 0.1, Y0 + h * 0.55, w * 0.35, h * 0.4);
}
x.strokeStyle = o.frame || "#D8D0BC";
x.lineWidth = 2;
x.beginPath();
x.moveTo(X0, Y0 + h / 2);
x.lineTo(X0 + w, Y0 + h / 2);
x.moveTo(X0 + w / 2, Y0);
x.lineTo(X0 + w / 2, Y0 + h);
x.stroke();
},
function (kind, st, v) {
var H = st * 128;
return wcMat("wcup:" + kind + ":" + st + ":" + v, 256, H, function (x, W) {
var R = wRand(st * 131 + v * 17 + kind.length * 7);
wcBricks(x, W, H, kind === "red" ? WCH_BRICK.red : kind === "soot" || kind === "weaver" ? WCH_BRICK.soot : kind === "dwell" ? WCH_BRICK.yellow : WCH_BRICK.stock, v * 13 + st);
for (var f = 0; f < st; f++) {
var y0 = H - (f + 1) * 128 + 26, top = f === st - 1;
if (kind === "weaver" && top) {
x.fillStyle = "#2A2E34";
x.fillRect(18, y0, W - 36, 62);
for (var m = 1; m < 8; m++) {
x.fillStyle = "#C8C0A8";
x.fillRect(18 + m * (W - 36) / 8 - 1, y0, 3, 62);
}
x.fillStyle = "#C8BCA4";
x.fillRect(14, y0 + 62, W - 28, 5);
continue;
}
if (kind === "ware") {
x.fillStyle = "#3A2A1E";
x.fillRect(W / 2 - 34, y0 - 6, 68, 96);
x.strokeStyle = "#5A4632";
x.lineWidth = 3;
for (var b = 0; b < 5; b++) {
x.beginPath();
x.moveTo(W / 2 - 34, y0 - 6 + b * 20);
x.lineTo(W / 2 + 34, y0 + 14 + b * 20);
x.stroke();
}
continue;
}
if (kind === "dwell") {
x.fillStyle = "#C8BC9C";
x.fillRect(0, y0 + 80, W, 8);
}
wcWin(x, 40, y0, 54, 76, R, { lit: 0.22 });
wcWin(x, W - 94, y0, 54, 76, R, { lit: 0.22 });
}
x.fillStyle = "rgba(200,190,170,.5)";
x.fillRect(0, 0, W, 6);
});
},
function (kind, v) {
return wcMat("wcgr:" + kind + ":" + v, 256, 128, function (x, W, H) {
var R = wRand(v * 29 + kind.length * 3 + 1);
wcBricks(x, W, H, kind === "pub" ? WCH_BRICK.red : WCH_BRICK.soot, v + 40);
var door = function (X0, col) {
x.fillStyle = "#C8BCA4";
x.fillRect(X0 - 4, 10, 50, 118);
x.fillStyle = col;
x.fillRect(X0, 14, 42, 114);
x.strokeStyle = "rgba(0,0,0,.35)";
x.lineWidth = 2;
x.strokeRect(X0 + 5, 20, 32, 40);
x.strokeRect(X0 + 5, 68, 32, 50);
x.fillStyle = "#2A2E34";
x.fillRect(X0, 14, 42, 0);
x.fillStyle = "#C8A048";
x.fillRect(X0 + 34, 72, 4, 4);
};
if (kind === "house") {
door(v % 2 ? 190 : 22, ["#2A1E14", "#1E2A1E", "#3A1A14", "#2A2A30"][v % 4]);
wcWin(x, v % 2 ? 40 : 120, 22, 70, 70, R, { lit: 0.3 });
}
else if (kind === "doss") {
door(22, "#2A1E14");
wcWin(x, 120, 22, 70, 70, R, { lit: 0.7 });
x.fillStyle = "rgba(232,224,200,.85)";
x.font = "bold 20px Georgia";
x.textAlign = "center";
x.fillText(["GOOD BEDS", "BEDS 4d", "LODGINGS"][v % 3], W / 2 + 40, 112);
}
else if (kind === "shop") {
x.fillStyle = ["#2A3A2A", "#3A1E1E", "#1E2A3A", "#3A3420", "#2A2A2A"][v % 5];
x.fillRect(0, 0, W, 128);
var g = x.createLinearGradient(0, 30, 0, 120);
g.addColorStop(0, "#E8C890");
g.addColorStop(1, "#8A6A3A");
x.fillStyle = g;
x.fillRect(12, 34, W - 74, 88);
for (var s = 0; s < 3; s++) {
x.fillStyle = "#4A3420";
x.fillRect(12, 60 + s * 22, W - 74, 3);
for (var i = 0; i < 9; i++) {
x.fillStyle = ["#C8A060", "#A84A3A", "#F0E8D8", "#5A7A3A", "#3A4A6A"][(i + s + v) % 5];
x.fillRect(16 + i * 19, 60 + s * 22 - 12, 12, 12);
}
}
x.strokeStyle = "rgba(255,255,255,.2)";
x.beginPath();
x.moveTo(20, 34);
x.lineTo(60, 122);
x.stroke();
door(W - 56, "#2A1E14");
}
else if (kind === "pub") {
x.fillStyle = "#3A1A14";
x.fillRect(0, 0, W, 128);
for (var p = 0; p < 2; p++) {
var X0 = 14 + p * 112;
var gg = x.createLinearGradient(0, 30, 0, 120);
gg.addColorStop(0, "#F0D8A0");
gg.addColorStop(1, "#B87A3A");
x.fillStyle = gg;
x.fillRect(X0, 30, 96, 92);
x.fillStyle = "rgba(255,255,255,.35)";
for (var q = 0; q < 6; q++) {
x.beginPath();
x.arc(X0 + 16 + q * 13, 52, 4, 0, 7);
x.fill();
}
x.strokeStyle = "#C8A048";
x.lineWidth = 3;
x.strokeRect(X0, 30, 96, 92);
}
}
else if (kind === "stable" || kind === "ware") {
x.fillStyle = "#3A2A1E";
x.fillRect(40, 8, 176, 120);
x.strokeStyle = "#5A4632";
x.lineWidth = 3;
for (var b = 0; b < 8; b++) {
x.beginPath();
x.moveTo(40 + b * 22, 8);
x.lineTo(40 + b * 22, 128);
x.stroke();
}
x.beginPath();
x.moveTo(128, 8);
x.lineTo(128, 128);
x.stroke();
}
else if (kind === "dwell") {
x.fillStyle = "#C8BC9C";
x.fillRect(96, 4, 64, 124);
x.fillStyle = "#141210";
x.fillRect(104, 14, 48, 114);
wcWin(x, 22, 22, 54, 70, R);
wcWin(x, W - 76, 22, 54, 70, R);
}
});
},
function (text, w, h, bg, fg) {
var key = "wcsign:" + text + ":" + bg + ":" + fg, W = 1024, H = Math.max(40, Math.min(256, Math.round(1024 * h / w)));
var t = wcTex(key, W, H, function (x) {
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = fg;
x.lineWidth = Math.max(2, H * 0.05);
x.strokeRect(H * 0.08, H * 0.08, W - H * 0.16, H - H * 0.16);
var fs = Math.round(H * 0.58);
x.font = "bold " + fs + "px Georgia";
var mw = x.measureText(text).width;
if (mw > W * 0.9) {
fs = Math.floor(fs * W * 0.9 / mw);
x.font = "bold " + fs + "px Georgia";
}
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text, W / 2, H * 0.54);
});
return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
},
function (P, key, side, o) {
o = o || {};
var ST = o.ST || WCH_ST, S = ST[key], g = wcStreetGroup(P, S, o.org), f = side ? S.f1 : S.f0, dir = side ? -1 : 1, R = wRand(key.length * 977 + side * 31 + (o.seed || 0)), lite = WCH.lite;
var gaps = wcGaps(key, side, ST).concat(o.skip || []).sort(function (a, b) { return a[0] - b[0]; }), runs = [], a = S.a0;
gaps.forEach(function (G) { var e = Math.min(G[0], S.a1); if (e > a + 2)
runs.push([a, e]); a = Math.max(a, G[1]); });
if (S.a1 > a + 2)
runs.push([a, S.a1]);
var roofM = dlnS("slate", 0x8A8A90), chim = dlnS("stock", 0x8A7A64), pot = dlnC(0x8A4A30), d = o.d || 9;
runs.forEach(function (r) {
var len = r[1] - r[0], n = Math.max(1, Math.round(len / (o.hw || 5.4))), hw = len / n, hiMax = 0;
for (var i = 0; i < n; i++) {
var u0 = r[0] + i * hw, u1 = u0 + hw, st = o.st || (o.stR ? o.stR[(R() * o.stR.length) | 0] : [2, 3, 3, 3, 2, 4][(R() * 6) | 0]), up = o.up || (o.upR ? o.upR[(R() * o.upR.length) | 0] : ["stock", "soot", "stock", "red", "soot"][(R() * 5) | 0]);
var gr = o.gr || (o.grR ? o.grR[(R() * o.grR.length) | 0] : ["house", "shop", "house", "shop", "house", "doss"][(R() * 6) | 0]), H = st * 3.3;
var U0 = wcU(S, u0), U1 = wcU(S, u1), lo = Math.min(U0, U1), hi = Math.max(U0, U1);
wcFront(g, (o.grF || wcGround)(gr, (R() * 4) | 0), lo, hi, 0, 3.3, f, dir, 1);
if (st > 1)
wcFront(g, (o.upF || wcUpper)(up, st - 1, (R() * 3) | 0), lo, hi, 3.3, H - 3.3, f, dir, 1);
dlnBox(g, hi - lo + 0.02, 0.25, 0.4, dlnS("stone", 0xA8A090), (lo + hi) / 2, H + 0.12, f - dir * 0.1);
var rf = dlnGable(g, hi - lo, d - 0.6, 2.2, roofM, (lo + hi) / 2, H, f - dir * d / 2);
if (!lite || i % 2 === 0) {
dlnBox(g, 0.9, 1.8, 1.4, chim, lo + 0.45, H + 1.6, f - dir * d * 0.45);
for (var p = 0; p < (lite ? 2 : 3); p++)
dlnCyl(g, 0.12, 0.14, 0.5, pot, lo + 0.2 + p * 0.25, H + 2.75, f - dir * d * 0.45, 6);
}
if (gr === "shop" && !lite) {
dlnBox(g, hi - lo, 0.5, 0.3, dlnC(0x2A2420), (lo + hi) / 2, 3.0, f + dir * 0.14);
if (o.names && o.names.length && R() < 0.7) {
var nm = o.names.shift(), sg = wcSign(nm, hi - lo - 0.4, 0.42, "#141210", "#D8B860");
sg.position.set((lo + hi) / 2, 3.0, f + dir * 0.31);
if (dir < 0)
sg.rotation.y = Math.PI;
g.add(sg);
}
if (R() < 0.35) {
var aw = dlnBox(g, hi - lo - 0.4, 0.06, 1.4, dlnC([0x8A2A2A, 0x2A4A6A, 0x6A5A2A][(R() * 3) | 0]), (lo + hi) / 2, 2.75, f + dir * 0.7);
aw.rotation.x = dir * 0.25;
}
}
if (gr === "doss") {
var lp = dlnCyl(g, 0.12, 0.12, 0.36, dlnGlow(0xFFD890), (lo + hi) / 2 - 1.4, 2.9, f + dir * 0.4, 6);
lp.userData.lamp = 1;
}
if (H > hiMax)
hiMax = H;
}
[r[0], r[1]].forEach(function (e, k) { var U = wcU(S, e); var w = dlnBox(g, 0.3, hiMax, d, dlnS("stock", 0x6A604E), U + (k ? -1 : 1) * (S.ax === "x" ? 0.15 : -0.15), hiMax / 2, f - dir * d / 2); });
});
return g;
},
function (P) {
var setts = dlnS("setts", 0x6A645A), flags = dlnS("flags", 0x8A847A), kerb = dlnS("stone", 0x9A948A);
Object.keys(WCH_ST).forEach(function (k, ki) {
var S = WCH_ST[k], yo = ki * 0.0007, w = S.f1 - S.f0, L = S.a1 - S.a0, c = (S.a0 + S.a1) / 2, fm = (S.f0 + S.f1) / 2, X = S.ax === "x" ? c : fm, Z = S.ax === "x" ? fm : c, pw = w > 9 ? 2.6 : w > 6 ? 1.4 : 0;
var cx = wcX(X), cz = wcZ(Z), sx = S.ax === "x" ? L : w, sz = S.ax === "x" ? w : L;
dlnPlane(P, sx + 0.6, sz + 0.6, k === "hospf" ? dlnS("gravel", 0xB8B0A0) : flags, cx, yo, cz);
if (pw && k !== "hospf" && k !== "mitre" && k !== "chfront") {
var rw = w - pw * 2;
dlnPlane(P, S.ax === "x" ? L : rw, S.ax === "x" ? rw : L, setts, cx, 0.012 + yo, cz);
[-1, 1].forEach(function (s) { var off = s * (rw / 2); dlnBox(P, S.ax === "x" ? L : 0.25, 0.14, S.ax === "x" ? 0.25 : L, kerb, S.ax === "x" ? cx : cx + off, 0.07, S.ax === "x" ? cz + off : cz); });
}
if (k === "mitre")
dlnPlane(P, sx - 4, sz - 4, setts, cx, 0.012 + yo, cz);
shkFloor(cx, cz, sx / 2 + 0.3, sz / 2 + 0.3, 0);
});
},
function (P, R) {
var W = ["weaver", "weaver", "soot", "stock"];
wcRow(P, "comm", 0, { skip: [[-205, -90]], names: wcShopNames("comm"), grR: ["shop", "shop", "house", "shop"], stR: [3, 3, 4] });
wcRow(P, "comm", 1, { skip: [[-128, -56], [-48, -38], [126, 174]], names: wcShopNames("comm").reverse(), grR: ["shop", "house", "shop"], stR: [3, 4, 3], upR: ["soot", "stock", "weaver"] });
wcRow(P, "hanb", 0, { upR: W, grR: ["house", "house", "shop"], stR: [3, 4] });
wcRow(P, "hanb", 1, { upR: W, stR: [3, 4] });
wcRow(P, "brick", 0, { names: wcShopNames("brick"), grR: ["shop", "shop", "house"], upR: ["soot", "stock", "weaver"] });
wcRow(P, "brick", 1, { names: wcShopNames("brick").reverse(), grR: ["shop", "house", "shop"] });
wcRow(P, "church", 0, { skip: [[7, 60]], up: "weaver", gr: "house", st: 4 });
wcRow(P, "church", 1, { up: "weaver", gr: "house", st: 4, skip: [[7, 17]] });
wcRow(P, "fash", 0, { grR: ["house", "shop", "doss"] });
wcRow(P, "fash", 1, { grR: ["house", "doss", "house"] });
wcRow(P, "flower", 0, { skip: [[56, 68]], grR: ["doss", "doss", "house", "doss"], stR: [3, 4], upR: ["soot", "stock"] });
wcRow(P, "flower", 1, { grR: ["doss", "house", "doss"], stR: [3, 4], upR: ["soot", "stock"] });
wcRow(P, "thrawl", 0, { grR: ["doss", "house", "doss", "shop"], stR: [2, 3] });
wcRow(P, "thrawl", 1, { grR: ["doss", "house", "house"], stR: [2, 3] });
wcRow(P, "dorset", 0, { grR: ["doss", "house", "doss"], stR: [3, 4] });
wcRow(P, "dorset", 1, { grR: ["doss", "doss", "house"], stR: [3, 4] });
wcRow(P, "went", 0, { names: wcShopNames("went"), grR: ["shop", "shop", "house"] });
wcRow(P, "went", 1, { names: wcShopNames("went").reverse(), grR: ["shop", "house", "shop"] });
wcRow(P, "goul", 0, { grR: ["house", "shop", "house"] });
wcRow(P, "goul", 1, { skip: [[118, 182]], grR: ["house", "shop"] });
wcRow(P, "high", 0, { names: wcShopNames("high"), gr: "shop", stR: [3, 4, 4], upR: ["stock", "red", "soot"] });
wcRow(P, "high", 1, { names: wcShopNames("high").reverse(), gr: "shop", stR: [3, 4, 4], upR: ["stock", "red", "soot"] });
wcRow(P, "road", 0, { skip: [[254, 272], [378, 400], [668, 692]], names: wcShopNames("road"), grR: ["shop", "shop", "house"], stR: [3, 4] });
wcRow(P, "road", 1, { skip: [[440, 570], [626, 654]], names: wcShopNames("road").reverse(), grR: ["shop", "house"], stR: [3, 4] });
wcRow(P, "aldg", 0, { gr: "shop", st: 4, upR: ["stock", "red"], names: ["ALDGATE · WINE VAULTS", "TEA & COFFEE", "STATIONER"] });
wcRow(P, "aldg", 1, { gr: "shop", st: 4, upR: ["stock", "red"] });
wcRow(P, "duke", 0, { gr: "house", st: 3 });
wcRow(P, "duke", 1, { gr: "house", st: 3 });
wcRow(P, "leman", 0, { names: wcShopNames("leman"), grR: ["house", "shop"], stR: [3, 4] });
wcRow(P, "leman", 1, { skip: [[312, 348]], grR: ["house", "shop"], stR: [3, 4] });
wcRow(P, "comrd", 0, { names: wcShopNames("comrd"), grR: ["shop", "house"], stR: [3, 4] });
wcRow(P, "comrd", 1, { grR: ["shop", "house"], stR: [3, 4] });
wcRow(P, "berner", 0, { skip: [[476, 492]], gr: "house", stR: [2, 3] });
wcRow(P, "berner", 1, { gr: "house", stR: [2, 3] });
wcRow(P, "bucks", 0, { skip: [[490, 510]], gr: "house", st: 2, up: "stock" });
wcRow(P, "bucks", 1, { skip: [[440, 480]], grR: ["ware", "stable", "ware"], st: 3, up: "ware" });
wcRow(P, "brady", 0, { gr: "house", st: 3 });
wcRow(P, "brady", 1, { gr: "house", st: 3 });
wcRow(P, "mitre", 0, { gr: "ware", up: "ware", st: 4, d: 16, hw: 9 });
wcRow(P, "mitre", 1, { gr: "ware", up: "ware", st: 4, d: 16, hw: 9, skip: [[-312, -305]] });
wcRow(P, "millc", 0, { gr: "house", st: 3, up: "soot", hw: 4 });
wcRow(P, "millc", 1, { gr: "house", st: 3, up: "soot", hw: 4 });
wcRow(P, "dutf", 0, { gr: "stable", st: 2, up: "soot" });
wcRow(P, "dutf", 1, { gr: "ware", st: 3, up: "ware" });
[["comm", -205, "z", -7, 7], ["brick", -205, "z", 104, 116], ["dorset", -112, "x", -84, -72], ["went", -140, "x", 95, 105], ["aldg", -340, "x", 241, 259], ["road", 712, "x", 245, 259], ["comrd", 170, "x", 420, 432], ["berner", 530, "z", 52, 62], ["bucks", 420, "x", 168, 176], ["duke", 190, "z", -270, -262], ["millc", -96, "z", -62, -56], ["mitre", -334, "x", 192, 234], ["brady", 168, "z", 612, 622], ["dutf", 40, "x", 466, 474], ["mitre", -286, "x", 192, 209], ["mitre", -286, "x", 213, 234], ["welli", 470, "z", 640, 652], ["welli", 535, "z", 640, 652]].forEach(function (E) {
var w = E[4] - E[3], c = (E[3] + E[4]) / 2, H = E[0] === "mitre" ? 13.2 : 9.9, up = E[0] === "mitre" ? "ware" : "soot", g = new THREE.Group(), lo = E[1] === WCH_ST[E[0]].a0;
g.position.set(E[2] === "x" ? wcX(E[1]) : wcX(c), 0, E[2] === "x" ? wcZ(c) : wcZ(E[1]));
if (E[2] === "x")
g.rotation.y = lo ? Math.PI / 2 : -Math.PI / 2;
else if (!lo)
g.rotation.y = Math.PI;
P.add(g);
wcFront(g, wcGround(E[0] === "millc" ? "house" : "house", 2), -w / 2, w / 2, 0, 3.3, 0, 1, Math.max(1, Math.round(w / 5.4)));
wcFront(g, wcUpper(up, Math.round(H / 3.3) - 1, 1), -w / 2, w / 2, 3.3, H - 3.3, 0, 1, Math.max(1, Math.round(w / 5.4)));
dlnGable(g, w, 8, 2.2, dlnS("slate", 0x8A8A90), 0, H, -4);
});
},
function (P) {
var st = dlnS("portland", 0xE0DCD0), dk = dlnS("portland", 0xA8A498), slate = dlnS("slate", 0x7A7A80), X = wcX, Z = wcZ, cz = WCH_CC.z;
wsmBlock(P, X(42), Z(cz), 58, 40, 15, st, -Math.PI / 2, { roof: 4.2, plain: st, stone: st });
var winM = new THREE.MeshLambertMaterial({ color: 0x2A3036 });
for (var k = 0; k < 5; k++) {
[-1, 1].forEach(function (s) { var x = X(30 + k * 6.5), z = Z(cz + s * 29.1); dlnBox(P, 1.6, 3.4, 0.2, winM, x, 10.2, z); dlnBox(P, 1.4, 1.8, 0.2, winM, x, 4.4, z); var a = dlnCyl(P, 0.8, 0.8, 0.2, winM, x, 11.9, z, 12); a.rotation.x = Math.PI / 2; });
}
dlnBox(P, 9, 26, 16, st, X(19.5), 13, Z(cz));
dlnBox(P, 9.4, 0.6, 16.4, dk, X(19.5), 7.6, Z(cz));
dlnBox(P, 9.4, 0.6, 16.4, dk, X(19.5), 18, Z(cz));
dlnBox(P, 3.2, 4.6, 14, st, X(13.6), 2.3, Z(cz));
dlnBox(P, 3.4, 0.6, 14.4, dk, X(13.6), 4.9, Z(cz));
for (var c = 0; c < 4; c++) {
dlnCyl(P, 0.42, 0.48, 4.3, st, X(12.3), 2.15, Z(cz - 5.4 + c * 3.6), 12);
}
var arch = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.6, 18, 1, false, 0, Math.PI), dk);
arch.rotation.z = Math.PI / 2;
arch.rotation.y = Math.PI / 2;
arch.position.set(X(15.1), 12.6, Z(cz));
P.add(arch);
dlnBox(P, 0.4, 5.2, 5.2, new THREE.MeshLambertMaterial({ color: 0x1E2226 }), X(14.95), 12.0, Z(cz));
dlnBox(P, 7, 8, 7, st, X(19.5), 30, Z(cz));
[-1, 1].forEach(function (s) { dlnBox(P, 0.3, 4, 1.4, winM, X(15.9), 31, Z(cz + s * 1.6)); });
dlnBox(P, 7.4, 0.6, 7.4, dk, X(19.5), 34.2, Z(cz));
dlnBox(P, 5.6, 5, 5.6, st, X(19.5), 37, Z(cz));
var sp = new THREE.Mesh(new THREE.ConeGeometry(3.4, 26, 8), st);
sp.position.set(X(19.5), 52.5, Z(cz));
sp.rotation.y = Math.PI / 8;
P.add(sp);
var ck = wcSign("XII", 2.2, 2.2, "#E8E0C8", "#141414");
ck.position.set(X(14.9), 25.5, Z(cz));
ck.rotation.y = -Math.PI / 2;
P.add(ck);
for (var s = 0; s < 2; s++)
dlnBox(P, 1.4, 0.06 + s * 0.06, 15, st, X(9.2 + s * 1.4), 0.03 + s * 0.03, Z(cz));
dlnRail(P, X(8), Z(cz - 28), X(8), Z(cz - 8.6), 1.3);
dlnRail(P, X(8), Z(cz + 8.6), X(8), Z(cz + 28), 1.3);
shkSolidBox(X(42), Z(cz), 40, 58, 0);
shkSolidBox(X(18), Z(cz), 12, 16, 0);
shkDoor("wc_church", X(11.5), Z(cz), "Christ Church, Spitalfields");
shkSpot(X(9.5), Z(cz - 6), 3, "Christ Church", "look up at the spire", function () { wcTale("⛪ Christ Church, Spitalfields", WCH_FACTS.church); });
},
function (P) {
var X = wcX, Z = wcZ, brick = dlnS("redbrick", 0xA86A50), iron = dlnShine(0x2A3A30, 0.6, 0.4), glass = new THREE.MeshLambertMaterial({ color: 0x8A9AA0, transparent: true, opacity: 0.45, depthWrite: false });
var g = wsmBlock(P, X(-40), Z(-148), 112, 66, 10, brick, Math.PI / 2, { roof: false, base: 1.2, balus: false });
for (var a = 0; a < 6; a++) {
var z = -196 + a * 18;
dlnBox(P, 0.3, 5.2, 5.4, dlnC(0x14120E), X(-7.15), 2.6, Z(z));
var ar = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.32, 14, 1, false, 0, Math.PI), dlnS("stone", 0xE8E0D0));
ar.rotation.set(0, Math.PI / 2, Math.PI / 2);
ar.position.set(X(-7.2), 5.2, Z(z));
P.add(ar);
}
var sg = wcSign("SPITALFIELDS MARKET", 30, 1.4, "#2A3A30", "#F0E6C8");
sg.position.set(X(-7.1), 8.4, Z(-148));
sg.rotation.y = Math.PI / 2;
P.add(sg);
for (var r = 0; r < 3; r++) {
var rf = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 104, 12, 1, true, 0, Math.PI), glass);
rf.rotation.x = Math.PI / 2;
rf.rotation.z = Math.PI / 2;
rf.position.set(X(-20 - r * 20), 10.2, Z(-148));
rf.userData.keep = 1;
P.add(rf);
}
var crate = dlnS("oak", 0x8A6A44), cab = new THREE.MeshLambertMaterial({ color: 0x5A8A3A, flatShading: true }), app = new THREE.MeshLambertMaterial({ color: 0xB83A2A });
for (var c = 0; c < (WCH.lite ? 4 : 12); c++) {
var zz = -200 + c * 9, xx = -6.3 + (c % 2) * 0.35;
dlnBox(P, 1.1, 0.6, 0.8, crate, X(xx), 0.3, Z(zz));
if (c % 3 === 0) {
dlnBox(P, 1.0, 0.5, 0.7, crate, X(xx), 0.85, Z(zz));
}
var h = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), c % 2 ? cab : app);
h.position.set(X(xx), 0.72, Z(zz + 0.1));
P.add(h);
}
shkSpot(X(-5), Z(-150), 3.4, "Spitalfields Market", "look in", function () { wcTale("🥬 Spitalfields Market", WCH_FACTS.market); });
},
function (P) {
var X = wcX, Z = wcZ, z0 = -48, z1 = -38, g = new THREE.Group();
P.add(g);
wsmBlock(P, X(14), Z((z0 + z1) / 2), 10, 14, 9.9, dlnS("redbrick", 0x8A4A3A), -Math.PI / 2, { roof: 3, base: 3.3 });
dlnBox(P, 0.3, 3.3, 10, new THREE.MeshLambertMaterial({ map: wcGround("pub", 1).map }), X(7.1), 1.65, Z((z0 + z1) / 2));
var sg = wcSign("THE TEN BELLS", 8, 0.9, "#2A140E", "#E8C860");
sg.position.set(X(6.8), 3.8, Z((z0 + z1) / 2));
sg.rotation.y = -Math.PI / 2;
P.add(sg);
[z0 + 1, z1 - 1].forEach(function (z) { var l = dlnCyl(P, 0.22, 0.16, 0.5, dlnGlow(0xFFE0A0), X(6.4), 3.2, Z(z), 6); });
shkDoor("wc_bells", X(5.6), Z(WCH_TB.z), "The Ten Bells");
shkSpot(X(5.4), Z(z1 - 1.6), 2.4, "The Ten Bells", "read the board", function () { wcTale("🍺 The Ten Bells", WCH_FACTS.tenbells); });
},
function (P) {
var X = wcX, Z = wcZ, red = dlnS("redbrick", 0xA86A50), st = dlnS("stone", 0xE0D8C8);
dlnBox(P, 3.2, 5.6, 48, dlnS("stock", 0x6A5E4A), X(8.6), 2.8, Z(150));
dlnBox(P, 0.4, 4.2, 4.2, dlnC(0x14120E), X(7.05), 2.1, Z(150));
var gt = wcSign("TOYNBEE HALL", 4.6, 0.6, "#3A2A1E", "#E8D8B0");
gt.position.set(X(6.9), 4.8, Z(150));
gt.rotation.y = -Math.PI / 2;
P.add(gt);
var hall = wsmBlock(P, X(34), Z(150), 36, 18, 10, red, -Math.PI / 2, { roof: false, plain: red, stone: st });
for (var k = -1; k <= 1; k++) {
dlnGable(P, 6, 0.4, 4, red, X(24.9), 10, Z(150 + k * 12), Math.PI / 2);
for (var m = 0; m < 3; m++)
dlnBox(P, 0.2, 2.2, 1.0, dlnGlow(0xE8C890), X(24.8), 5.8, Z(150 + k * 12 - 1.4 + m * 1.4));
}
shkSpot(X(4.6), Z(150), 3, "Toynbee Hall", "read the board", function () { wcTale("🎓 Toynbee Hall", WCH_FACTS.toynbee, [["in", "Go in through the gateway", "The library and the lecture hall", function () { shkGoIn("wc_toyn"); }]]); });
shkDoor("wc_toyn", X(5.4), Z(152.6), "Toynbee Hall");
},
function (P) {
var X = wcX, Z = wcZ;
dlnBox(P, 6.4, 6.6, 4, dlnS("stock", 0x5A5040), X(WCH_MC.x), 6.6, Z(-86));
dlnBox(P, 1.2, 3.2, 0.4, dlnC(0x0E0C0A), X(WCH_MC.x), 1.6, Z(-84.05));
var lb = wcSign("MILLER'S COURT", 2.6, 0.36, "#1A1612", "#C8C0A8");
lb.position.set(X(WCH_MC.x), 3.6, Z(-83.8));
P.add(lb);
var sh = wcSign("J. McCARTHY · CHANDLER", 7, 0.6, "#1E2A1E", "#E8D8A0");
sh.position.set(X(WCH_MCC.x), 3.0, Z(-83.7));
P.add(sh);
dlnBox(P, 8, 2.2, 0.12, new THREE.MeshBasicMaterial({ map: wcGround("shop", 3).map, fog: true }), X(WCH_MCC.x), 1.4, Z(-83.9));
shkDoor("wc_shop", X(WCH_MCC.x + 2.4), Z(-81.4), "McCarthy's chandler's shop, No. 27");
var cz = -95.6;
dlnBox(P, 1.1, 2.2, 0.15, dlnC(0x2A1E14), X(-60.4), 1.1, Z(cz));
dlnBox(P, 1.2, 1.2, 0.12, dlnC(0x1A1C20), X(-57.6), 1.6, Z(cz));
dlnBox(P, 0.4, 0.4, 0.13, dlnC(0x3A3028), X(-57.3), 1.4, Z(cz));
var n13 = wcSign("13", 0.3, 0.24, "#1A1612", "#C8C0A8");
n13.position.set(X(-60.4), 2.4, Z(cz + 0.1));
P.add(n13);
dlnCyl(P, 0.16, 0.16, 0.4, dlnGlow(0xFFD890), X(WCH_CROSS.x + 1), 3.0, Z(-72.4), 6);
var cs = wcSign("CROSSINGHAM'S · BEDS", 6, 0.5, "#1A1612", "#E8D8B0");
cs.position.set(X(WCH_CROSS.x), 3.4, Z(-72.2));
cs.rotation.y = Math.PI;
P.add(cs);
shkSpot(X(-30), Z(-78), 3, "Dorset Street", "look about", function () { wcTale("🏚️ Dorset Street", WCH_FACTS.dorset); });
},
function (P) {
var X = wcX, Z = wcZ, x = WCH_29.x;
dlnBox(P, 1.1, 2.4, 0.12, dlnC(0x0E0C0A), X(x - 2), 1.2, Z(-196.9));
var n = wcSign("29", 0.36, 0.28, "#1A1612", "#E8D8B0");
n.position.set(X(x - 2), 2.6, Z(-196.8));
P.add(n);
var cm = wcSign("CAT'S MEAT", 4, 0.4, "#2A1E14", "#E8D8B0");
cm.position.set(X(x + 2), 3.0, Z(-196.8));
P.add(cm);
shkDoor("wc_yard29", X(x - 2), Z(-194.6), "No. 29 Hanbury Street: the passage to the yard");
},
function (P) {
var X = wcX, Z = wcZ, yb = dlnS("stock", 0xC8B890);
var g = new THREE.Group();
g.position.set(X(0), 0, Z(0));
g.rotation.y = Math.PI / 2;
P.add(g);
wcFront(g, wcGround("dwell", 1), -182, -118, 0, 3.3, -68, -1, 12);
wcFront(g, wcUpper("dwell", 4, 1), -182, -118, 3.3, 13.2, -68, -1, 12);
dlnGable(g, 64, 14, 2.4, dlnS("slate", 0x8A8A90), -150, 16.5, -61);
var sg = wcSign("WENTWORTH DWELLINGS", 14, 0.8, "#C8BC9C", "#2A2A2A");
sg.position.set(X(-68.4), 15.6, Z(150));
sg.rotation.y = -Math.PI / 2;
P.add(sg);
var nn = wcSign("108 - 119", 1.6, 0.36, "#141210", "#E8D8B0");
nn.position.set(X(-68.3), 3.6, Z(WCH_WD.z));
nn.rotation.y = -Math.PI / 2;
P.add(nn);
shkSpot(X(-71), Z(WCH_WD.z), 2.6, "The doorway, Nos. 108 to 119", "look at the doorway", function () { wcTale("🚪 The Model Dwellings", WCH_FACTS.goul); });
},
function (P) {
var X = wcX, Z = wcZ, red = dlnS("redbrick", 0x9A5A44), stock = dlnS("stock", 0x9A8A6A), st = dlnS("stone", 0xE0D8C8);
wsmBlock(P, X(WCH_BF.x), Z(239), 16, 12, 9.9, dlnS("georgian", 0x8A7A64), 0, { roof: 3, base: 0.6 });
var bs = wcSign("MEARS & STAINBANK · BELL FOUNDERS", 14, 0.6, "#1E1E22", "#E8D8A0");
bs.position.set(X(WCH_BF.x), 3.6, Z(245.2));
P.add(bs);
shkDoor("wc_found", X(WCH_BF.x), Z(247.2), "The Whitechapel Bell Foundry");
shkSpot(X(WCH_BF.x + 5), Z(247.4), 2.4, "The Bell Foundry", "read the plate", function () { wcTale("🔔 The Whitechapel Bell Foundry", WCH_FACTS.bell); });
wsmBlock(P, X(WCH_WL.x), Z(237), 22, 16, 13.2, red, 0, { roof: 3.4, base: 1.0, door: 0, doorCol: 0x1E1A14 });
dlnBox(P, 5, 8, 5, red, X(WCH_WL.x + 8), 17, Z(242));
var cl = wcSign("◷", 2, 2, "#E8E0C8", "#141414");
cl.position.set(X(WCH_WL.x + 8), 18, Z(244.55));
P.add(cl);
var tp = new THREE.Mesh(new THREE.ConeGeometry(3.6, 4, 4), dlnS("slate", 0x8A8A90));
tp.rotation.y = Math.PI / 4;
tp.position.set(X(WCH_WL.x + 8), 23, Z(242));
P.add(tp);
var ls = wcSign("WORKING LADS' INSTITUTE", 12, 0.7, "#2A1E14", "#E8D8A0");
ls.position.set(X(WCH_WL.x), 4.0, Z(245.2));
P.add(ls);
shkDoor("wc_lads", X(WCH_WL.x), Z(247.2), "The Working Lads' Institute");
shkSpot(X(WCH_WL.x + 6), Z(247.2), 2.4, "The Working Lads' Institute", "read the board", function () { wcTale("🏛️ The Working Lads' Institute", WCH_FACTS.lads); });
wsmBlock(P, X(505), Z(292), 118, 20, 13.2, dlnS("georgian", 0x8A8478), Math.PI, { roof: 3.6, base: 1.0, balus: true });
var pd = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 0.6, 3, 1), st);
pd.rotation.set(-Math.PI / 2, 0, 0);
pd.scale.set(1, 1, 0.4);
pd.position.set(X(505), 15.3, Z(281.9));
P.add(pd);
var hs = wcSign("THE LONDON HOSPITAL", 16, 0.9, "#E0D8C8", "#2A2A30");
hs.position.set(X(505), 12.4, Z(281.7));
hs.rotation.y = Math.PI;
P.add(hs);
dlnRail(P, X(450), Z(259.4), X(497), Z(259.4), 1.4);
dlnRail(P, X(513), Z(259.4), X(560), Z(259.4), 1.4);
for (var t = 0; t < (WCH.lite ? 2 : 5); t++)
dlnPlanes(P, [{ x: X(458 + t * 24), z: Z(270), h: 10 }], wRand(t + 51));
shkDoor("wc_hosp", X(WCH_LH.x), Z(279.8), "The London Hospital");
shkSpot(X(WCH_LH.x + 6), Z(279.6), 2.6, "The London Hospital", "read the board", function () { wcTale("🏥 The London Hospital", WCH_FACTS.hosp); });
wsmBlock(P, X(WCH_CROWN.x), Z(239), 20, 12, 9.9, red, 0, { roof: 3, base: 3.3 });
var cr = wcSign("THE CROWN", 8, 0.9, "#2A140E", "#E8C860");
cr.position.set(X(WCH_CROWN.x), 3.8, Z(245.25));
P.add(cr);
dlnBox(P, 18, 3.0, 0.12, new THREE.MeshLambertMaterial({ map: wcGround("pub", 2).map }), X(WCH_CROWN.x), 1.6, Z(245.1));
shkDoor("wc_crown", X(WCH_CROWN.x + 5), Z(247.2), "The Crown: up to the Vigilance Committee's room");
shkSpot(X(WCH_CROWN.x - 5), Z(247.2), 2.4, "The Crown", "read the bill in the window", function () { wcTale("👑 The Crown", WCH_FACTS.crown); });
wsmBlock(P, X(WCH_PARA.x), Z(267), 28, 16, 13.2, dlnS("stock", 0xC8B890), Math.PI, { roof: false, base: 1.2, balus: true });
var ps = wcSign("PARAGON THEATRE OF VARIETIES", 22, 1.2, "#3A1A2A", "#F0D890");
ps.position.set(X(WCH_PARA.x), 10, Z(258.85));
ps.rotation.y = Math.PI;
P.add(ps);
for (var j = 0; j < 6; j++)
dlnCyl(P, 0.2, 0.16, 0.5, dlnGlow(0xFFE0A0), X(WCH_PARA.x - 10 + j * 4), 4.2, Z(258.4), 6);
shkDoor("wc_para", X(WCH_PARA.x), Z(257), "The Paragon Theatre of Varieties");
shkSpot(X(WCH_PARA.x + 8), Z(257), 2.4, "The Paragon", "read the bills", function () { wcTale("🎭 The Paragon", WCH_FACTS.para); });
},
function (P) {
var X = wcX, Z = wcZ, st = dlnS("stone", 0xD8D0C0);
wsmBlock(P, X(-142), Z(WCH_LEMAN.z), 36, 16, 13.2, dlnS("stock", 0x9A8A6A), -Math.PI / 2, { roof: 3, base: 1.4 });
var lamp = dlnCyl(P, 0.26, 0.2, 0.6, dlnGlow(0x3A6AE8), X(-150.8), 3.6, Z(WCH_LEMAN.z), 8);
lamp.userData.lamp = 1;
var ps = wcSign("POLICE", 2.4, 0.5, "#1A2A5A", "#F0F0F0");
ps.position.set(X(-150.5), 4.4, Z(WCH_LEMAN.z));
ps.rotation.y = -Math.PI / 2;
P.add(ps);
var hs = wcSign("METROPOLITAN POLICE · H DIVISION", 14, 0.6, "#E0D8C8", "#1A2A5A");
hs.position.set(X(-150.4), 9.6, Z(WCH_LEMAN.z));
hs.rotation.y = -Math.PI / 2;
P.add(hs);
shkDoor("wc_leman", X(-152.4), Z(WCH_LEMAN.z), "Leman Street police station");
shkSpot(X(-152.4), Z(WCH_LEMAN.z + 6), 2.4, "Leman Street police station", "read the notices", function () { wcTale("👮 Leman Street", WCH_FACTS.leman); });
},
function (P) {
var X = wcX, Z = wcZ, wood = dlnS("oak", 0x3A2A1A);
wsmBlock(P, X(44), Z(484), 12, 16, 6.6, dlnS("stock", 0x8A7A5A), Math.PI / 2, { roof: 2.6, base: 0.6 });
var cs = wcSign("No. 40 · INTERNATIONAL WORKING MEN'S EDUCATIONAL CLUB", 14, 0.5, "#1A1612", "#E8D8B0");
cs.position.set(X(52.2), 3.6, Z(484));
cs.rotation.y = Math.PI / 2;
P.add(cs);
for (var w = 0; w < 3; w++)
dlnBox(P, 0.12, 1.4, 1.0, dlnGlow(0xE8C890), X(52.1), 4.6, Z(480 + w * 4));
[466.25, 473.75].forEach(function (z) { dlnBox(P, 3.8, 3.2, 0.2, wood, X(49.6), 1.6, Z(z)); });
var gs = wcSign("W. HINDLEY · SACK MANUFACTURER", 3.6, 0.4, "#3A2A1A", "#E8D8B0");
gs.position.set(X(52.15), 2.8, Z(468.1));
gs.rotation.y = Math.PI / 2;
P.add(gs);
shkDoor("wc_club", X(54.2), Z(484), "The club, No. 40 Berner Street");
shkSpot(X(56), Z(489), 2.4, "The club", "read the notice on the door", function () { wcTale("📰 The club, 40 Berner Street", WCH_FACTS.berner); });
},
function (P) {
var X = wcX, Z = wcZ, wood = dlnS("oak", 0x3A2A1A);
dlnBox(P, 20, 3.6, 0.4, dlnS("stock", 0x6A5E4A), X(WCH_BUCK.x), 1.8, Z(167.7));
dlnBox(P, 4.2, 3.4, 0.2, wood, X(WCH_BUCK.x), 1.7, Z(167.95));
var sg = wcSign("STABLE YARD", 2.6, 0.36, "#2A1E14", "#C8C0A8");
sg.position.set(X(WCH_BUCK.x), 3.7, Z(168.1));
P.add(sg);
wsmBlock(P, X(460), Z(184), 40, 16, 13.2, dlnS("stock", 0xC8B890), Math.PI, { roof: 3.2, base: 1.0 });
var bs = wcSign("BOARD SCHOOL", 8, 0.6, "#C8BC9C", "#2A2A2A");
bs.position.set(X(460), 11, Z(175.85));
bs.rotation.y = Math.PI;
P.add(bs);
var ew = wcSign("ESSEX WHARF", 6, 0.6, "#1A1612", "#E8D8B0");
ew.position.set(X(560), 6, Z(168.1));
P.add(ew);
shkSpot(X(530), Z(172), 3, "Buck's Row", "look about", function () { wcTale("🛣️ Buck's Row", WCH_FACTS.bucks); });
},
function (P) {
var X = wcX, Z = wcZ;
var ks = wcSign("KEARLEY & TONGE · WHOLESALE GROCERS", 18, 0.8, "#2A2A1E", "#E8D8A0");
ks.position.set(X(-312), 8, Z(192.1));
P.add(ks);
shkSpot(X(-300), Z(214), 3, "Mitre Square", "look about", function () { wcTale("🔲 Mitre Square", WCH_FACTS.mitre); });
dlnBox(P, 8, 24, 8, dlnS("stock", 0xA8987A), X(-352), 12, Z(250));
var sp = new THREE.Mesh(new THREE.ConeGeometry(3.6, 16, 8), dlnS("portland", 0xC8C0B0));
sp.position.set(X(-352), 32, Z(250));
P.add(sp);
var pp = dlnBox(P, 0.9, 3.4, 0.9, dlnS("portland", 0xD8D0C0), X(WCH_PUMP.x), 1.7, Z(WCH_PUMP.z));
var top = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.2, 4), dlnS("portland", 0xD8D0C0));
top.rotation.y = Math.PI / 4;
top.position.set(X(WCH_PUMP.x), 4.0, Z(WCH_PUMP.z));
P.add(top);
dlnCyl(P, 0.07, 0.09, 0.4, dlnShine(0xC8A048, 0.3, 0.9), X(WCH_PUMP.x + 0.6), 1.1, Z(WCH_PUMP.z), 8).rotation.z = Math.PI / 2;
shkSolidBox(X(WCH_PUMP.x), Z(WCH_PUMP.z), 1.2, 1.2, 0);
shkSpot(X(WCH_PUMP.x + 2.2), Z(WCH_PUMP.z), 2.4, "The Aldgate pump", "drink, and read the plate", function () { wcTale("⛲ The Aldgate pump", WCH_FACTS.pump); });
},
function (P, R) {
var X = wcX, Z = wcZ, step = WCH.lite ? 60 : 36;
Object.keys(WCH_ST).forEach(function (k) {
var S = WCH_ST[k];
if (/^(hospf|chfront|mitre|passg|dutf|millc)$/.test(k))
return;
if (WCH.lite && k === "welli")
return;
var w = S.f1 - S.f0, st = w > 11 ? step : step * 1.4;
for (var a = S.a0 + st * 0.5; a < S.a1 - 3; a += st) {
var side = ((a / st) | 0) % 2 ? S.f0 + 0.7 : S.f1 - 0.7;
if (S.ax === "x")
dlnLamp(P, X(a), Z(side));
else
dlnLamp(P, X(side), Z(a));
}
});
[[-300, 225], [-330, 200]].forEach(function (p) { dlnLamp(P, X(p[0]), Z(p[1])); });
dlnLamp(P, X(-60), Z(-90));
dlnPillarBox(P, X(-6.2), Z(60));
dlnPillarBox(P, X(110), Z(-60));
dlnPillarBox(P, X(300), Z(258));
dlnTrough(P, X(6.0), Z(220));
shkSpot(X(-5), Z(60), 2, "A pillar box", "look", function () { wcTale("📮 A pillar box", WCH_FACTS.pillar); });
var wood = dlnS("oak", 0x7A5A3A), wh = dlnC(0x3A2A1A), goods = [0xC8A040, 0xB83A2A, 0x8AA060, 0xD8D0C8, 0x5A6A8A];
var barrow = function (x, z, ry, c) {
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry;
P.add(b);
dlnBox(b, 1.2, 0.12, 2.0, wood, 0, 0.85, 0);
[-1, 1].forEach(function (s) { dlnBox(b, 0.06, 0.25, 2.0, wood, s * 0.6, 1.0, 0); var w = dlnCyl(b, 0.42, 0.42, 0.06, wh, s * 0.7, 0.42, 0.3, 12); w.rotation.z = Math.PI / 2; });
dlnBox(b, 0.06, 0.6, 0.06, wood, -0.5, 0.5, -0.9);
dlnBox(b, 0.06, 0.6, 0.06, wood, 0.5, 0.5, -0.9);
for (var i = 0; i < (WCH.lite ? 4 : 9); i++) {
var h = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 0), dlnC(goods[(c + i) % 5]));
h.position.set(-0.4 + (i % 3) * 0.4, 1.0, -0.7 + ((i / 3) | 0) * 0.6);
b.add(h);
}
shkSolidBox(x, z, 1.6, 2.4, ry);
};
[[-5.4, -30], [5.4, 10], [-5.4, 70], [5.4, 110], [-20, 98], [10, 98], [-60, 102], [60, 97], [108, -120], [112, 40]].forEach(function (p, i) { if (WCH.lite && i % 2)
return; var axZ = Math.abs(p[0]) < 8 || p[0] > 100; barrow(X(p[0]), Z(p[1]), axZ ? 0 : Math.PI / 2, i); });
dlnBox(P, 0.4, 1.0, 6, dlnC(0x2A2A2A), X(WCH_CAB.x - 1.6), 0.5, Z(WCH_CAB.z));
shkSolidBox(X(WCH_CAB.x - 1.6), Z(WCH_CAB.z), 0.6, 6, 0);
shkSpot(X(WCH_CAB.x + 1), Z(WCH_CAB.z), 3.4, "The cab rank", "take a cab", function () { wcCabCard(); });
var bill = function (x, z, ry, lines, title) { var pn = dlnPanel(lines, title, 1.4, 1.9, "#E8E0C8", "#1A1A1A"); pn.position.set(x, 1.6, z); pn.rotation.y = ry; P.add(pn); };
bill(X(-6.85), Z(40), Math.PI / 2, ["Information is requested", "respecting the murders", "committed in this district.", "Any person may apply", "at any Police Station."], "POLICE NOTICE");
bill(X(6.85), Z(-20), -Math.PI / 2, ["THE STAR", "Halfpenny", "Every Evening", "Latest Editions"], "READ");
bill(X(-199), Z(244.85), 0, ["THE STAR", "The Whitechapel", "Inquiry", "Special Edition"], "STAR");
shkSpot(X(-5.6), Z(40), 2, "The police notice", "read it", function () { wcTale("📜 The police notice", ["Printed and pasted up by the Metropolitan Police on 30 September 1888, eighty thousand copies, through every house in the district.", "\"Information is requested respecting the murders. Any person who may have reason to suspect that he has knowledge of the offender is earnestly requested to communicate at once with the nearest Police Station.\""]); });
},
function () {
var X = wcX, Z = wcZ, live = WCH.live;
for (var r = 0; r < (WCH.lite ? 1 : 2); r++)
dlnHansom(live, X(WCH_CAB.x - 4.4), Z(WCH_CAB.z - 3 + r * 7), 0);
var loops = [[[-2.8, -200], [-2.8, 251], [-255, 251], [-255, 254], [2.8, 254], [2.8, -200], [-2.8, -200]], [[205, 250], [700, 250], [700, 254], [205, 254], [205, 250]], [[-157, 265], [-157, 426], [160, 426], [160, 429], [-154, 429], [-154, 265], [-157, 265]]];
WCH.loops = loops.map(function (L) { var d = 0; for (var i = 1; i < L.length; i++)
d += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); return { p: L, len: d }; });
var mk = function (li, n, kind) { for (var c = 0; c < n; c++) {
var g = new THREE.Group();
live.add(g);
if (kind === "cart")
wcCart(g);
else if (kind === "tram")
wcTram(g);
else
dlnHansom(g, 0, 0, 0);
WCH.move.push({ g: g, l: li, s: c * WCH.loops[li].len / n, sp: kind === "tram" ? 2.4 : 3 + c % 2, flip: kind === "cab" });
} };
mk(0, WCH.lite ? 2 : 4, "cab");
mk(0, WCH.lite ? 1 : 3, "cart");
mk(1, 1, "tram");
mk(1, WCH.lite ? 1 : 2, "cart");
mk(2, WCH.lite ? 1 : 2, "cart");
},
function (g) {
var wood = dlnS("oak", 0x6A4A2A), wh = dlnC(0x2A1E14);
dlnBox(g, 1.8, 0.5, 3.2, wood, 0, 1.0, -1.2);
[-1, 1].forEach(function (s) { var w = dlnCyl(g, 0.6, 0.6, 0.08, wh, s * 1.0, 0.6, -1.4, 14); w.rotation.z = Math.PI / 2; });
for (var i = 0; i < 4; i++)
dlnBox(g, 0.5, 0.4, 0.5, dlnS("oak", 0x8A6A44), -0.4 + (i % 2) * 0.8, 1.45, -2.2 + ((i / 2) | 0) * 1.2);
if (typeof wsmHorse === "function") {
var h = wsmHorse(0x3A2A1A, 1);
h.position.set(0, 0, 1.6);
g.add(h);
}
},
function (g) {
var red = dlnShine(0x6A1A1A, 0.5, 0.2), cream = dlnC(0xE8DCC0);
dlnBox(g, 2.2, 2.2, 7.4, red, 0, 1.7, -1.5);
dlnBox(g, 2.1, 0.6, 7.0, cream, 0, 2.5, -1.5);
for (var w = 0; w < 6; w++)
[-1, 1].forEach(function (s) { dlnBox(g, 0.05, 0.7, 0.8, dlnGlow(0xE8D8A0), s * 1.11, 2.4, -4.2 + w * 1.1); });
dlnBox(g, 2.3, 0.1, 7.6, dlnC(0x2A2A2A), 0, 3.0, -1.5);
var sg = wcSign("WHITECHAPEL · BOW · STRATFORD", 2.0, 0.3, "#E8DCC0", "#6A1A1A");
sg.position.set(0, 2.95, 2.3);
g.add(sg);
if (typeof wsmHorse === "function")
[-0.5, 0.5].forEach(function (k) { var h = wsmHorse(0x4A3220, 1); h.position.set(k, 0, 3.4); g.add(h); });
},
function (k, x, z, ry, o) {
var F = WCH_FOLK[k], p = wcPerson("wc_" + k, F.dress, { sex: F.sex, child: F.child });
p.position.set(wcX(x), 0.02, wcZ(z));
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "wc_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = wcX, Z = wcZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (WCH.lite)
n = Math.ceil(n * 0.35);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = wcPerson("wcf" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.3 + R() * 0.4 }, ground: 0.02 });
}
};
var poor = ["wcwoman", "wcman", "wcwoman", "wcman", "wcjew", "wcwoman", "wcporter", "wccoster", "wcmatch", "wcgirl", "wcwork", "newsboy"];
crowd(26, -6, 6, -200, 250, poor, { r: 18 });
crowd(10, 105, 115, -200, 240, poor.concat(["wcjew", "wcjew", "wcbaker"]), { r: 14 });
crowd(12, -138, 100, 96, 104, poor.concat(["wcjew", "wcjew"]), { r: 14 });
crowd(16, -250, 195, 246, 258, poor.concat(["gent", "lady", "wcrep", "clergy"]), { r: 20 });
crowd(14, 205, 700, 246, 258, poor.concat(["gent", "doctor", "nurse"]), { r: 20 });
crowd(6, 8, 100, 15, 23, ["wcwoman", "wcman", "wcwoman"], { r: 8 });
crowd(5, 8, 100, 51, 59, ["wcwoman", "wcman"], { r: 8 });
crowd(6, -110, -8, -83, -73, ["wcwoman", "wcman", "wcwoman", "wcgirl"], { r: 8 });
crowd(5, 8, 110, -196, -186, ["wcman", "wcwoman", "wcjew"], { r: 8 });
crowd(5, -160, -152, 262, 428, ["wcman", "wcsgt", "wcwoman"], { r: 12 });
crowd(5, -150, 165, 421, 431, ["wcman", "wcjew", "wcwoman", "bsseaman"], { r: 14 });
for (var u = 0; u < (WCH.lite ? 2 : 6); u++) {
var b = wcPerson("wc_kid" + u, u % 2 ? "wcgirl" : "newsboy", { child: true });
b.position.set(X(20 + u * 12), 0.02, Z(u % 2 ? 18 : 55));
b.rotation.y = u;
SHK.live.add(b);
SHK.people.push({ g: b, wander: { r: 5, sp: 0.8 }, ground: 0.02 });
}
wcNamed("pc", 4, 30, Math.PI, { wander: 60 });
wcNamed("coster", -4.6, -28, Math.PI / 2);
wcNamed("baker", WCH_BAKE.x + 1.4, 97.6, Math.PI);
wcNamed("match", -4.5, 150, Math.PI / 2, { wander: 6 });
wcNamed("newsboy", 4.8, -24, -Math.PI / 2);
wcNamed("sally", -4.4, 240, Math.PI / 2);
wcNamed("porter", -5.2, -160, Math.PI / 2, { wander: 10 });
wcNamed("vigil", 200, 250, -Math.PI / 2, { wander: 30 });
wcNamed("nurse", WCH_LH.x - 3, 276, 0);
wcNamed("resident", 4, 154, -Math.PI / 2);
wcNamed("founder", WCH_BF.x + 3, 247.6, 0);
wcNamed("sailor", -120, 252, Math.PI / 2, { wander: 12 });
wcNamed("deputy", WCH_DOSS.x + 2, 16.6, 0);
if (!WCH.lite) {
for (var s = 0; s < 3; s++) {
var sa = wcPerson("wc_salv" + s, "wcsally", { sex: s ? "m" : "f" });
sa.position.set(X(-5.8 + s * 0.8), 0.02, Z(236 - s * 0.9));
sa.rotation.y = Math.PI / 2;
SHK.live.add(sa);
SHK.people.push({ g: sa, ground: 0.02 });
}
}
},
function (P) {
var X = wcX, Z = wcZ, fl = [0xE8E0F0, 0xC84A6A, 0xF0E8C0, 0x9A6AC8];
Object.keys(WCH_SITES).forEach(function (k) {
var S = WCH_SITES[k];
if (!S)
return;
var L = WCH_LIVES.filter(function (l) { return l.k === k; })[0];
for (var i = 0; i < (WCH.lite ? 2 : 5); i++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), dlnC(fl[i % 4]));
f.position.set(X(S.x + (i - 2) * 0.18), 0.06, Z(S.z + (i % 2) * 0.12));
P.add(f);
}
shkSpot(X(S.x), Z(S.z + 1.2), 2.2, "Remember " + L.n, "remember her", function () { wcLife(k); });
});
},
function () {
if (WCH.built || !SHK.G)
return;
DLN.lite = WCH.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1888), live0 = SHK.live;
WCH.live = new THREE.Group();
WCH.live.name = "wc-live";
SHK.G.add(WCH.live);
WCH.move = [];
var pieces = [["wc-spital", [wcHouses, wcChristChurch, wcMarket, wcTenBells, wcToynbee, wcDorset, wcHanbury29, wcDwellings], 0, 20, 320], ["wc-ground", [wcGroundAll], 180, 160, 600], ["wc-road", [wcRoadBuildings, wcBucks], 460, 220, 300], ["wc-south", [wcLeman, wcBerner, wcMitre], -100, 330, 330], ["wc-lyc", [wcLyceum], 646, 500, 120], ["wc-things", [wcStreetThings, wcSites], 180, 160, 600]];
pieces.forEach(function (pc) {
var all = new THREE.Group();
SHK.G.add(all);
pc[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[whitechapel] " + (f.name || "?"), e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = pc[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
WCH.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[whitechapel] bake", e);
}
SHK.dist.push({ n: pc[0], g: g, x: wcX(pc[2]), z: wcZ(pc[3]), r: pc[4] });
});
try {
wcTraffic();
}
catch (e) {
if (window.console)
console.warn("[whitechapel] traffic", e);
}
try {
wcFolk(R);
}
catch (e) {
if (window.console)
console.warn("[whitechapel] folk", e);
}
SHK.live = live0;
WCH.built = true;
},
function (P) {
var X = wcX, Z = wcZ, st = dlnS("portland", 0xE0D8C8), x0 = 640;
wcRow(P, "welli", 1, { gr: "shop", st: 4, upR: ["stock", "red"], names: ["STRAND · CHOP HOUSE", "THEATRICAL COSTUMIER", "WIGMAKER", "MUSIC PUBLISHER"] });
wcRow(P, "welli", 0, { skip: [[484, 516]], gr: "house", st: 4, up: "stock" });
wsmBlock(P, X(x0 - 17), Z(500), 36, 30, 16, st, Math.PI / 2, { roof: 4, balus: true, stone: st, plain: dlnS("stock", 0xA89878) });
for (var c = 0; c < 6; c++) {
dlnCyl(P, 0.5, 0.56, 9, st, X(x0 - 1.2), 4.5, Z(489 + c * 4.4), 14);
dlnBox(P, 1.3, 0.6, 1.3, st, X(x0 - 1.2), 9.3, Z(489 + c * 4.4));
}
dlnBox(P, 4, 0.9, 25, st, X(x0 - 2.2), 10, Z(500));
var pg = new THREE.Group();
pg.position.set(X(x0 - 2.4), 12.75, Z(500));
pg.rotation.y = Math.PI / 2;
P.add(pg);
var pd = new THREE.Mesh(new THREE.CylinderGeometry(13.2, 13.2, 1.0, 3, 1), st);
pd.rotation.set(-Math.PI / 2, 0, 0);
pd.scale.set(1, 1, 0.35);
pg.add(pd);
var nm = wcSign("LYCEUM THEATRE", 14, 1.0, "#E0D8C8", "#2A2A30");
nm.position.set(X(x0 - 0.15), 10.0, Z(500));
nm.rotation.y = Math.PI / 2;
P.add(nm);
for (var l = 0; l < 4; l++)
dlnCyl(P, 0.2, 0.16, 0.5, dlnGlow(0xFFE0A0), X(x0 - 0.6), 3.4, Z(491 + l * 6), 6);
var bill = dlnPanel(["MR RICHARD MANSFIELD", "in", "DR JEKYLL AND MR HYDE", "from the story by", "R. L. STEVENSON"], "LYCEUM", 1.5, 2.1, "#F0E8D0", "#6A1A1A");
bill.position.set(X(x0 - 0.1), 1.9, Z(486));
bill.rotation.y = Math.PI / 2;
P.add(bill);
shkDoor("wc_lyc", X(x0 + 1.6), Z(500), "The Lyceum Theatre");
shkSpot(X(x0 + 1.6), Z(486), 2.2, "The Lyceum's bill", "read the playbill", function () { wcTale("🎭 The Lyceum", ["Henry Irving's theatre, the most famous in London. This summer he lent it to the American actor Richard Mansfield, who opened here on 4 August 1888 in a play made from Robert Louis Stevenson's book of 1886, Strange Case of Dr Jekyll and Mr Hyde.", "Mansfield changes from the gentle doctor into Hyde in full view of the audience, with no make-up: only his face, his body and the light. People faint. When the murders began in Whitechapel that same month, some letter-writers to the papers and the police said the man on the stage must know something; the play came off in the autumn."]); });
dlnBox(P, 0.4, 1.0, 6, dlnC(0x2A2A2A), X(WCH_LYC.cab.x + 2.6), 0.5, Z(WCH_LYC.cab.z));
shkSpot(X(WCH_LYC.cab.x), Z(WCH_LYC.cab.z), 3.4, "The cab rank", "take a cab", function () { wcCabCard(); });
},
function (g, x, z, ry) {
var r = new THREE.Group();
r.position.set(x, 0, z);
r.rotation.y = ry || 0;
g.add(r);
var iron = dlnShine(0x1A1A1E, 0.6, 0.5);
dlnBox(r, 2.8, 1.0, 0.8, iron, 0, 0.5, 0);
dlnBox(r, 1.0, 0.5, 0.1, dlnGlow(0xE8742A), 0, 0.45, 0.41);
dlnBox(r, 3.4, 2.6, 0.4, dlnS("stock", 0x5A5040), 0, 1.3, -0.5);
dlnBox(r, 3.6, 0.12, 0.6, dlnS("oak", 0x5A3A22), 0, 2.0, -0.3);
[-0.9, 0.9].forEach(function (k) { var kt = dlnCyl(r, 0.16, 0.2, 0.28, dlnShine(0x2A2A2E, 0.4, 0.6), k, 1.15, 0.1, 10); });
var pan = dlnCyl(r, 0.24, 0.22, 0.06, iron, 0, 1.04, 0.15, 12);
return r;
},
function (g, x, z, w, ry) {
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry || 0;
g.add(b);
var mah = dlnShine(0x4A2414, 0.4, 0.2), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnBox(b, w, 1.1, 0.7, mah, 0, 0.55, 0);
dlnBox(b, w + 0.1, 0.06, 0.8, mah, 0, 1.12, 0);
dlnBox(b, w, 0.05, 0.05, brass, 0, 0.2, 0.4);
for (var p = 0; p < 4; p++) {
dlnCyl(b, 0.03, 0.04, 0.4, dlnC(0xE8E0D0), -w / 2 + 0.8 + p * 0.5, 1.35, -0.15, 8);
dlnBox(b, 0.05, 0.06, 0.18, mah, -w / 2 + 0.8 + p * 0.5, 1.56, -0.1);
}
dlnBox(b, w, 2.2, 0.3, mah, 0, 1.1 + 0.9, -1.6);
dlnBox(b, w - 0.6, 1.4, 0.04, dlnShine(0xC8D0D8, 0.1, 0.9), 0, 2.2, -1.44);
for (var s = 0; s < 12; s++)
dlnCyl(b, 0.04, 0.04, 0.26, dlnC([0x3A6A3A, 0x6A3A1A, 0xE8E0D0][s % 3]), -w / 2 + 0.5 + s * (w - 1) / 11, 1.45, -1.42, 6);
shkSolidBox(x, z, w, 0.8, ry || 0);
return b;
},
function (seed, who, x, y, z, ry, o) {
o = o || {};
var p = wcPerson(seed, who, { sex: o.sex, inside: true, beard: o.beard, hair: o.hair, child: o.child });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.35 } : null };
SHK.people.push(P);
var T = null;
if (o.name) {
T = { p: P, name: o.name, r: o.r || 2.8, t: { name: o.name, persona: o.persona || WCH_ERA, greet: o.greet || "Evenin'." } };
SHK.talk.push(T);
}
WCH.home.push({ P: P, T: T, on: true, room: o.room });
return P;
},
function (g, cx, cz, R, Rm) {
var h = 4.2;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwredpaper", 0x8A6A5A), low: dlnS("oak", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0x8A7A5A), outName: "Out to Commercial Street", out: wcOut("tenbells") });
wcBar(g, cx - 1, cz - Rm.hd + 2.2, 7, 0);
for (var t = 0; t < 3; t++) {
n14Table(g, cx - 3.4 + t * 3.2, cz + 1.2, 1.0, 1.0, 0.74, dlnS("oak", 0x5A3A22));
wcBench(g, cx - 3.4 + t * 3.2, cz + 2.1, 1.6, 0);
}
wcBench(g, cx + Rm.hw - 0.5, cz - 1, 3, Math.PI / 2);
wcBench(g, cx - Rm.hw + 0.5, cz - 1, 3, -Math.PI / 2);
for (var j = 0; j < 4; j++)
wcGasJet(g, cx - Rm.hw + 0.1, 2.6, cz - 4 + j * 2.6, Math.PI / 2);
dlnBox(g, 0.06, 1.4, 2.2, dlnGlow(0xD8C898), cx + Rm.hw - 0.05, 2.0, cz - 0.6);
dlnBox(g, 10, 0.01, 11, dlnC(0xB8A880), cx, 0.012, cz);
shkSpot(cx - 1, cz - Rm.hd + 3.4, 1.8, "The bar", "ask for a drink", function () { wcTale("🍺 The bar", [wcAdult() ? "A pint of mild ale is twopence, porter the same, a glass of gin a penny-halfpenny. The potman draws it from the pumps on the counter." : "A ginger beer for you, a penny, in a stone bottle with a marble in the neck.", "The Ten Bells opens at five in the morning for the market men, and on a Saturday night it does not close till half past twelve."]); });
shkSpot(cx + Rm.hw - 1.0, cz - 0.6, 1.8, "The window", "look across at the church", function () { wcTale("🪟 Across the road", ["Through the glass, across Church Street: the great portico of Christ Church and its spire going up into the fog, and under it the market carts."]); });
wcHome("wc_pot", "wcpot", cx - 1.4, 0.02, cz - Rm.hd + 1.0, 0, { name: WCH_FOLK.potman.name, persona: WCH_FOLK.potman.persona, greet: WCH_FOLK.potman.greet, room: "wc_bells" });
[["wcporter", -3.4, 2.0, Math.PI], ["wcwoman", -0.2, 2.0, Math.PI], ["wcman", 3.0, 2.0, Math.PI], ["wcwoman", 3.4, 0.4, 0], ["wcman", -3.0, -1.6, 0.4]].forEach(function (q, i) { if (WCH.lite && i > 2)
return; wcHome("wc_bellf" + i, q[0], cx + q[1], 0.02, cz + q[2], q[3], { room: "wc_bells" }); });
Rm.hello = "<b>The Ten Bells.</b> Sawdust on the boards, the long mahogany bar with its pumps and mirrors, gas jets hissing on the walls, the market men and the lodging-house folk side by side.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x6A645A), wall: dlnS("stock", 0x8A8070), low: dlnC(0x4A3A2A), lowH: 1.0, h: h, ceil: dlnC(0x5A5246), outName: "Out to Flower and Dean Street", out: wcOut("doss") });
wcRange(g, cx, cz - Rm.hd + 0.5, 0);
shkSolidBox(cx, cz - Rm.hd + 0.5, 3.4, 1.2, 0);
for (var t = 0; t < 3; t++) {
n14Table(g, cx - 3.2 + t * 3.2, cz + 0.6, 1.0, 3.0, 0.74, dlnS("oak", 0x9A8A6A));
wcBench(g, cx - 3.2 + t * 3.2 - 0.75, cz + 0.6, 3, Math.PI / 2);
wcBench(g, cx - 3.2 + t * 3.2 + 0.75, cz + 0.6, 3, Math.PI / 2);
}
dlnBox(g, 1.6, 2.2, 1.6, dlnS("oak", 0x5A3A22), cx + Rm.hw - 1.0, 1.1, cz + Rm.hd - 2.0);
dlnBox(g, 0.5, 0.4, 0.05, dlnGlow(0xE8C890), cx + Rm.hw - 1.8, 1.4, cz + Rm.hd - 2.0);
shkSolidBox(cx + Rm.hw - 1.0, cz + Rm.hd - 2.0, 1.6, 1.6, 0);
var rules = dlnPanel(["No person to lodge here", "who has not paid.", "Beds 4d single, 8d double.", "Lodgers to leave by 10 a.m.", "No fighting. No gambling."], "RULES OF THIS HOUSE", 1.4, 1.6, "#E8E0C8", "#1A1A1A");
rules.position.set(cx - Rm.hw + 0.05, 1.8, cz + 2.4);
rules.rotation.y = Math.PI / 2;
g.add(rules);
wcGasJet(g, cx - Rm.hw + 0.1, 2.3, cz - 2, Math.PI / 2);
wcGasJet(g, cx + Rm.hw - 0.1, 2.3, cz - 2, -Math.PI / 2);
for (var s = 0; s < 8; s++)
dlnBox(g, 0.9, 0.06, 0.25, dlnS("oak", 0x6A5A44), cx - Rm.hw + 0.8, 0.25 + s * 0.27, cz - Rm.hd + 1.2 + s * 0.3);
shkSpot(cx, cz - Rm.hd + 1.6, 1.8, "The kitchen fire", "cook your supper", function () { wcTale("🔥 The kitchen fire", ["The fire is free to every lodger. Bloaters and red herrings on a toasting fork, a slice of bread, tea in a can of your own: supper for twopence.", "On cold nights the kitchen is full till the small hours: people with nowhere warmer to be, the deputy turning a blind eye to those who have not paid as long as they keep quiet."]); });
shkSpot(cx + Rm.hw - 1.9, cz + Rm.hd - 2.0, 1.8, "The deputy's window", "pay for a bed", function () { wcTale("🛏️ A bed for the night", WCH_FACTS.doss); });
shkSpot(cx - Rm.hw + 1.0, cz - Rm.hd + 2.6, 1.6, "The stairs to the beds", "look up", function () { wcTale("🪜 Upstairs", ["Long rooms of narrow iron beds in rows, a few feet apart, each with a straw mattress, a sheet, a blanket and a rug; a 'double' is a little wider, for a couple. The windows are shut against the cold, and the deputy calls the lodgers up at ten."]); });
shkSpot(cx - Rm.hw + 0.8, cz + 2.4, 1.6, "The rules", "read them", function () { wcTale("📜 The rules", ["Since the Common Lodging Houses Act of 1851 every lodging-house must be registered with the police and inspected: so many beds to a room, limewashed twice a year, the rules hung up."]); });
wcHome("wc_dossdep", "wcdeputy", cx + Rm.hw - 1.0, 0.02, cz + Rm.hd - 3.2, Math.PI, { sex: "f", name: "Mrs Doyle, the deputy", persona: WCH_FOLK.deputy.persona, greet: WCH_FOLK.deputy.greet, room: "wc_doss" });
[["wcwoman", -3.9, 0.0, Math.PI / 2], ["wcman", -2.5, 1.4, -Math.PI / 2], ["wcwoman", 0.7, -0.6, -Math.PI / 2], ["wcman", -0.7, 1.0, Math.PI / 2], ["wcwoman", 3.8, 0.4, -Math.PI / 2], ["wcman", 0.6, -Rm.hd + 2.0, Math.PI], ["wcwoman", 2.4, -1.4, Math.PI / 2]].forEach(function (q, i) { if (WCH.lite && i > 3)
return; wcHome("wc_dossf" + i, q[0], cx + q[1], 0.02, cz + q[2], q[3], { room: "wc_doss", wander: i === 5 ? 1 : 0 }); });
Rm.hello = "<b>A lodging-house kitchen, Flower and Dean Street.</b> A great black range with its fire, long deal tables and benches, the smell of herrings and wet wool, the deputy's box by the door, the stairs up to the beds.";
},
function (g, cx, cz, R, Rm) {
var h = 6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x5A564C), wall: dlnS("stock", 0x6A604E), h: h, ceil: false, outName: "Back through the passage to Hanbury Street", out: wcOut("h29") });
dlnBox(g, Rm.hw * 2, 0.3, 6, dlnC(0x3A342C), cx, 3.0, cz + Rm.hd - 3);
dlnBox(g, 0.2, 3.0, 6, dlnS("stock", 0x6A604E), cx + 1.0, 1.5, cz + Rm.hd - 3);
dlnBox(g, 1.0, 2.2, 0.12, dlnS("oak", 0x3A2A1A), cx - 0.6, 1.1, cz + 0.6);
for (var s = 0; s < 2; s++)
dlnBox(g, 1.4, 0.18, 0.4, dlnS("stone", 0x9A948A), cx - 0.6, 0.27 - s * 0.18, cz + 0.2 - s * 0.4);
for (var f = 0; f < 10; f++)
dlnBox(g, 0.06, 1.6, 0.6, dlnS("oak", 0x5A4A34), cx - Rm.hw + 0.08, 0.8, cz - 0.6 - f * 0.62);
dlnBox(g, 2.2, 2.2, 2.6, dlnS("oak", 0x6A5A44), cx + Rm.hw - 1.1, 1.1, cz - 4.2);
shkSolidBox(cx + Rm.hw - 1.1, cz - 4.2, 2.2, 2.6, 0);
for (var c = 0; c < 4; c++)
dlnBox(g, 0.7, 0.4, 0.5, dlnS("oak", 0x9A7A54), cx + Rm.hw - 0.6, 0.2 + c * 0.4, cz - 1.6);
dlnBox(g, 1.2, 2.2, 1.2, dlnS("oak", 0x4A3A2A), cx, 1.1, cz - Rm.hd + 0.6);
shkSolidBox(cx, cz - Rm.hd + 0.6, 1.2, 1.2, 0);
dlnCyl(g, 0.03, 0.03, 0.9, dlnShine(0x6A6A70, 0.4, 0.7), cx + 0.6, 0.45, cz - 2.6, 6);
if (wcAdult())
dlnPlane(g, 0.9, 0.5, new THREE.MeshLambertMaterial({ color: 0x2A1612, transparent: true, opacity: 0.55, depthWrite: false }), cx - 1.4, 0.012, cz - 0.4);
else
for (var i = 0; i < 5; i++) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), dlnC([0xE8E0F0, 0xC84A6A, 0xF0E8C0, 0x9A6AC8][i % 4]));
fl.position.set(cx - 1.6 + i * 0.15, 0.06, cz - 0.3);
g.add(fl);
}
shkSpot(cx - 0.6, cz - 0.2, 1.6, "The steps", "sit on the steps", function () { wcTale("🪜 The back steps", ["Two stone steps down from the back door into the yard. At about a quarter to five on the morning of 8 September, John Richardson, whose mother keeps her packing-case business here, sat on the middle step to cut a piece of leather from his boot, and saw nothing in the yard."]); });
shkSpot(cx - Rm.hw + 0.8, cz - 2.4, 1.6, "The fence", "look over", function () { wcTale("🧱 The fence", ["A close wooden fence about five and a half feet high, between this yard and No. 27's. Albert Cadosch, the carpenter next door, went out into his own yard at about twenty past five that morning and heard a voice say \"No!\" on this side, and then something fall against the fence."]); });
shkSpot(cx + 0.6, cz - 2.2, 1.6, "The tap", "look by the tap", function () { wcTale("🚰 The tap", ["A leather apron was found lying by this tap, soaked with water. The newspapers made it into a monster: 'Leather Apron'. It belonged to John Richardson; his mother had washed it and left it out to dry."]); });
if (!wcAdult())
shkSpot(cx - 1.4, cz - 0.2, 1.6, "Flowers", "remember her", function () { wcLife("annie"); });
else
shkSpot(cx - 1.4, cz - 0.6, 1.6, "Remember Annie Chapman", "remember her", function () { wcLife("annie"); });
Rm.hello = "<b>No. 29 Hanbury Street.</b> A narrow passage straight through the house from the front door, always left open, and at the end the back door and two stone steps down into a small yard: a fence, a shed, a privy, a tap.";
},
function (g, cx, cz, R, Rm) {
var h = 5;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xC8B898), wall: dlnS("wardwall", 0xFFFFFF), low: dlnC(0x6A7A6A), lowH: 1.3, h: h, ceil: dlnC(0xF0ECE0), outName: "Out to the Whitechapel Road", out: wcOut("hosp") });
for (var b = 0; b < 3; b++)
wcBench(g, cx - 3 + b * 2.6, cz + Rm.hd - 4.4, 2.2, 0);
n14Table(g, cx + Rm.hw - 1.4, cz + Rm.hd - 3, 1.2, 0.8, 0.8, dlnS("oak", 0x5A3A22));
dlnBox(g, Rm.hw * 2 - 4, 2.0, 0.08, dlnC(0xE8E4DC), cx - 1, 1.0, cz + 1.6);
for (var r = 0; r < 5; r++)
[-1, 1].forEach(function (s) { if (typeof dlnCot === "function")
dlnCot(g, cx + s * (Rm.hw - 1.1), cz - Rm.hd + 1.8 + r * 2.0, s > 0 ? -Math.PI / 2 : Math.PI / 2, R); });
n14Table(g, cx, cz - 2.4, 1.6, 0.8, 0.8, dlnS("oak", 0x6A4A2A), dlnC(0xF4F2EC));
dlnPendant(g, cx, h, cz - 4, 1.0);
dlnPendant(g, cx, h, cz + 2, 1.0);
dlnBox(g, 2.4, 2.2, 0.6, dlnS("oak", 0x3A2414), cx, 1.1, cz - Rm.hd + 0.35);
dlnBox(g, 2.2, 1.6, 0.04, dlnShine(0xC8D0D8, 0.1, 0.9), cx, 1.3, cz - Rm.hd + 0.66);
shkSpot(cx + Rm.hw - 1.4, cz + Rm.hd - 2.2, 1.8, "The porter's desk", "ask", function () { wcTale("🏥 The receiving room", WCH_FACTS.hosp.concat(["At the back of the hospital, in rooms of his own off Bedstead Square, lives Joseph Merrick, whom the papers called 'the Elephant Man': a gentle, well-read man, cared for here since 1886 by the hospital and the gifts of the public, visited by princesses and actresses."])); });
shkSpot(cx, cz - 1.6, 1.8, "The ward", "look round", function () { wcTale("🛏️ A ward", ["Twenty beds, scrubbed boards, a fire at each end, the nurses in their caps and aprons. The London's nursing school, under Miss Eva Luckes, Matron since 1880, is one of the best in the country."]); });
shkSpot(cx, cz - Rm.hd + 1.2, 1.6, "The museum case", "look at the case", function () { wcTale("🔬 The Pathological Museum", ["The hospital keeps a museum of specimens for teaching its students, in the care of its curator, Dr Thomas Openshaw."]); });
wcHome("wc_hospn", "nurse", cx - 2, 0.02, cz - 2.6, 0.5, { sex: "f", name: "Sister Clare", persona: WCH_FOLK.nurse.persona.replace("Nurse Agnes Ward", "Sister Clare Baines"), greet: "Quietly, please: the ward is resting.", room: "wc_hosp" });
wcHome("wc_hospp", "porter", cx + Rm.hw - 1.4, 0.02, cz + Rm.hd - 3.8, Math.PI, { room: "wc_hosp" });
[0, 1, 2].forEach(function (i) { if (WCH.lite && i)
return; wcHome("wc_hospw" + i, ["wcwoman", "wcman", "wcgirl"][i], cx - 3 + i * 2.6, 0.02, cz + Rm.hd - 4.0, Math.PI, { room: "wc_hosp" }); });
Rm.hello = "<b>The London Hospital.</b> The receiving room's benches and the porter's desk; beyond the screen, a long ward of iron beds, a nurse at the table.";
},
function (g, cx, cz, R, Rm) {
var h = 4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwcream", 0xD8D0B8), low: dlnS("oak", 0x4A3020), lowH: 1.2, h: h, ceil: dlnC(0xE0D8C8), outName: "Out to Leman Street", out: wcOut("leman") });
dlnBox(g, 4, 1.3, 0.9, dlnS("oak", 0x4A3020), cx + 1.5, 0.65, cz + 1.4);
dlnBox(g, 4.2, 0.08, 1.0, dlnS("oak", 0x3A2414), cx + 1.5, 1.32, cz + 1.4);
shkSolidBox(cx + 1.5, cz + 1.4, 4, 0.9, 0);
var map = wTex(512, 384, function (x, W, H) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#8A7A5A";
x.lineWidth = 6;
var sx = function (v) { return 20 + (v + 345) / 1060 * (W - 40); }, sz = function (v) { return 20 + (v + 215) / 755 * (H - 40); };
Object.keys(WCH_ST).forEach(function (k) { var S = WCH_ST[k]; x.beginPath(); if (S.ax === "x") {
var zz = sz((S.f0 + S.f1) / 2);
x.moveTo(sx(S.a0), zz);
x.lineTo(sx(S.a1), zz);
}
else {
var xx = sx((S.f0 + S.f1) / 2);
x.moveTo(xx, sz(S.a0));
x.lineTo(xx, sz(S.a1));
} x.stroke(); });
x.fillStyle = "#B82020";
[[500, 172], [84, -197], [47, 470], [-326, 226], [-59, -93]].forEach(function (p) { x.beginPath(); x.arc(sx(p[0]), sz(p[1]), 7, 0, 7); x.fill(); });
x.fillStyle = "#2A2A2A";
x.font = "bold 18px Georgia";
x.fillText("H DIVISION", W - 160, H - 16);
});
var mp = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), new THREE.MeshLambertMaterial({ map: map }));
mp.position.set(cx - 1.6, 2.2, cz - Rm.hd + 0.06);
g.add(mp);
n14Table(g, cx - 1.6, cz - 2.6, 2.2, 1.0, 0.78, dlnS("oak", 0x5A3A22), dlnC(0x2A4A2A));
n14Chair(g, cx - 1.6, cz - 1.8, Math.PI, dlnS("oak", 0x5A3A22));
for (var f = 0; f < 3; f++)
dlnBox(g, 0.32, 0.06, 0.24, dlnC(0xE8E0C8), cx - 2.2 + f * 0.5, 0.84, cz - 2.6);
dlnBox(g, 1.2, 2.2, 0.5, dlnS("oak", 0x3A2414), cx + Rm.hw - 0.6, 1.1, cz - 3);
for (var w = 0; w < 3; w++)
wcGasJet(g, cx - Rm.hw + 0.1, 2.5, cz - 4 + w * 3, Math.PI / 2);
var fac = dlnPanel(["Dear Boss,", "I keep on hearing the police", "have caught me but they", "wont fix me just yet.", "Yours truly, Jack the Ripper"], "FACSIMILE OF LETTER", 1.0, 1.3, "#F0E8D8", "#8A1A1A");
fac.position.set(cx + Rm.hw - 0.05, 2.0, cz + 0.4);
fac.rotation.y = -Math.PI / 2;
g.add(fac);
shkSpot(cx - 1.6, cz - Rm.hd + 1.0, 1.8, "The map", "look at the pins", function () { wcTale("🗺️ The map of H Division", ["Red pins where the women were found. The beats are drawn in pencil, each one walked by a constable in about a quarter of an hour, all night."]); });
shkSpot(cx + Rm.hw - 0.9, cz + 0.4, 1.6, "The facsimile", "read the poster", function () { wcTale("📜 The facsimile", ["On 3 October 1888 the police had the 'Dear Boss' letter and the 'Saucy Jacky' postcard printed in facsimile and posted up outside every police station, in case anyone knew the hand."]); });
shkSpot(cx + 1.5, cz + 2.4, 1.8, "The charge room desk", "speak to the sergeant", function () { wcTale("👮 The desk", WCH_FACTS.leman); });
wcHome("wc_lemsgt", "wcsgt", cx + 1.5, 0.02, cz + 0.6, 0, { name: "The station sergeant", persona: "You are the station sergeant at the charge-room desk of Leman Street police station, H Division, in October 1888, from a made-up story set in the real Whitechapel: steady, overworked, patient with the public and the cranks who come in every hour with a theory or a confession. " + WCH_ERA, greet: "Yes? If it's about the murders, take a seat and I'll take it down. If it's another letter, put it on the pile.", room: "wc_leman" });
wcHome("wc_lemcon", "police", cx + 3.2, 0.02, cz + 2.6, Math.PI, { room: "wc_leman" });
Rm.hello = "<b>Leman Street police station.</b> The charge room's high desk; behind it the inspectors' office, the map of H Division stuck with pins, the files, the gas burning all night.";
},
function (g, cx, cz, R, Rm) {
var h = 3.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwgreenpaper", 0xB8C0A8), low: dlnS("oak", 0x4A3020), lowH: 1.0, h: h, ceil: dlnC(0xE0D8C8), outName: "Down and out to the Mile End Road", out: wcOut("crown") });
n14Table(g, cx, cz - 1.2, 1.4, 3.8, 0.78, dlnS("oak", 0x5A3A22), dlnC(0x2A5A2A));
for (var c = 0; c < 3; c++) {
n14Chair(g, cx - 1.1, cz - 2.5 + c * 1.2, Math.PI / 2, dlnS("oak", 0x5A3A22));
n14Chair(g, cx + 1.1, cz - 2.5 + c * 1.2, -Math.PI / 2, dlnS("oak", 0x5A3A22));
}
n14Chair(g, cx, cz - 3.6, 0, dlnS("oak", 0x3A2414));
dlnBox(g, 0.4, 0.06, 0.3, dlnC(0x6A1A1A), cx, 0.84, cz - 2.8);
var rw = dlnPanel(["£100 REWARD", "for information leading", "to the conviction of", "the Whitechapel murderer.", "Mile End Vigilance Committee."], "REWARD", 1.3, 1.5, "#F0E8D0", "#1A1A1A");
rw.position.set(cx - Rm.hw + 0.05, 1.9, cz);
rw.rotation.y = Math.PI / 2;
g.add(rw);
n14Gasolier(g, cx, h, cz - 0.6);
wsmWin(g, cx + Rm.hw - 0.06, 1.8, cz - 1, -Math.PI / 2, 1.4, 2.0);
shkSpot(cx, cz - 2.6, 1.8, "The minute book", "read the minutes", function () { wcTale("📓 The minute book", ["Formed 10 September 1888 at the Crown, 74 Mile End Road. Chairman: Mr George Lusk, builder. Treasurer: Mr Joseph Aarons. The committee pays men to patrol the streets at night, offers a reward, and writes to the Home Secretary asking the Government to offer one too. The Home Office refuses: rewards, it says, bring false information."]); });
shkSpot(cx - Rm.hw + 0.9, cz, 1.8, "The reward bill", "read it", function () { wcTale("💷 The reward", WCH_FACTS.crown); });
wcHome("wc_crwn0", "wcman", cx + 1.1, 0.02, cz - 1.3, -Math.PI / 2, { room: "wc_crown" });
wcHome("wc_crwn1", "wcjew", cx - 1.1, 0.02, cz + 0.0, Math.PI / 2, { room: "wc_crown" });
Rm.hello = "<b>The Crown, upstairs.</b> The Vigilance Committee's room: a long table under green baize, the minute book, the reward bill on the wall, the window over the Mile End Road.";
},
function (g, cx, cz, R, Rm) {
var h = 5;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x9A8060), wall: dlnS("pmpaper", 0xD8C8A8), low: dlnS("oak", 0x4A3020), lowH: 2.4, h: h, ceil: dlnS("oak", 0x5A3A22), outName: "Out through the gateway to Commercial Street", out: wcOut("toynbee") });
for (var s = 0; s < 4; s++) {
dlnBox(g, 0.4, 2.4, 2.4, dlnS("oak", 0x3A2414), cx - Rm.hw + 0.25, 1.2, cz - 5 + s * 2.6);
for (var r = 0; r < 5; r++)
dlnBox(g, 0.3, 0.3, 2.2, dlnC([0x6A1A1A, 0x1A3A2A, 0x2A2A5A, 0x5A4A2A][(s + r) % 4]), cx - Rm.hw + 0.3, 0.3 + r * 0.45, cz - 5 + s * 2.6);
}
for (var t = 0; t < 2; t++) {
n14Table(g, cx + 0.6, cz - 3 + t * 3.2, 2.2, 1.0, 0.76, dlnS("oak", 0x5A3A22), dlnC(0x2A4A2A));
n14Chair(g, cx + 0.6 - 0.6, cz - 2.3 + t * 3.2, Math.PI, dlnS("oak", 0x5A3A22));
n14Chair(g, cx + 0.6 + 0.6, cz - 2.3 + t * 3.2, Math.PI, dlnS("oak", 0x5A3A22));
}
dlnBox(g, 4, 0.4, 2, dlnS("oak", 0x4A3020), cx + Rm.hw - 2.4, 0.2, cz - Rm.hd + 1.2);
dlnPortrait(g, cx + Rm.hw - 2.4, 2.8, cz - Rm.hd + 0.1, 0, "Arnold Toynbee", "1852 - 1883", "#1E1E24");
n14Gasolier(g, cx, h, cz - 2);
n14Gasolier(g, cx, h, cz + 2);
var bill = dlnPanel(["Tues. Popular lecture: Astronomy", "Wed. Class: English Literature", "Thurs. The Poor Man's Lawyer", "Sat. Concert in the drawing-room", "All are welcome"], "THIS WEEK", 1.3, 1.4, "#F0E8D0", "#1A1A1A");
bill.position.set(cx + Rm.hw - 0.05, 1.8, cz + 2);
bill.rotation.y = -Math.PI / 2;
g.add(bill);
shkSpot(cx - Rm.hw + 1.2, cz - 1, 1.8, "The library", "take down a book", function () { wcTale("📚 The library", WCH_FACTS.toynbee.concat(["The library lends to anyone in the district. This autumn, Samuel Barnett is writing to The Times: the murders are the fruit of the conditions, he says: light the streets, clear the slums, end the trade in common lodging-houses."])); });
shkSpot(cx + Rm.hw - 1.0, cz + 2, 1.6, "This week's bill", "read it", function () { wcTale("📋 This week", ["Lectures, classes and concerts, all free; the Poor Man's Lawyer gives advice to anyone who cannot pay a solicitor."]); });
wcHome("wc_toyres", "gent", cx + 0.6, 0.02, cz - 1.6, Math.PI, { name: "Mr Fenwick, at his books", persona: WCH_FOLK.resident.persona, greet: "Sit down, there's room at the table. What are you reading?", room: "wc_toyn" });
[0, 1].forEach(function (i) { if (WCH.lite && i)
return; wcHome("wc_toyrd" + i, i ? "wcjew" : "wcman", cx + 0.6 + (i ? 0.6 : -0.6), 0.02, cz + 0.9, Math.PI, { room: "wc_toyn" }); });
Rm.hello = "<b>Toynbee Hall.</b> The library: oak shelves, green-baize reading tables, the platform for the lectures, Arnold Toynbee's portrait.";
},
function (g, cx, cz, R, Rm) {
var h = 6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x9A8060), wall: dlnS("lwcream", 0xE0D8C0), low: dlnS("oak", 0x4A3020), lowH: 1.4, h: h, ceil: dlnC(0xE8E0D0), outName: "Out to the Whitechapel Road", out: wcOut("lads") });
dlnBox(g, 6, 0.5, 3, dlnS("oak", 0x5A3A22), cx, 0.25, cz - Rm.hd + 2);
n14Table(g, cx, cz - Rm.hd + 2, 2.6, 1.0, 0.78, dlnS("oak", 0x4A3020), dlnC(0x2A4A2A));
n14Chair(g, cx, cz - Rm.hd + 1.2, 0, dlnS("oak", 0x3A2414));
for (var j = 0; j < 2; j++)
wcBench(g, cx - Rm.hw + 2, cz - 3 + j * 1.2, 4.4, Math.PI / 2);
n14Chair(g, cx + 2.2, cz - 2.4, -Math.PI / 2, dlnS("oak", 0x4A3020));
dlnRail(g, cx - Rm.hw + 0.2, cz + 0.8, cx + Rm.hw - 0.2, cz + 0.8, 1.0);
for (var b = 0; b < 4; b++)
wcBench(g, cx, cz + 2 + b * 1.3, 8, 0);
n14Gasolier(g, cx - 3, h, cz);
n14Gasolier(g, cx + 3, h, cz);
wsmWin(g, cx + Rm.hw - 0.06, 2.6, cz - 3, -Math.PI / 2, 1.6, 2.6);
shkSpot(cx, cz - Rm.hd + 3.2, 1.8, "The coroner's table", "read the depositions", function () { wcTale("⚖️ The coroner's court", WCH_FACTS.lads.concat(["An inquest asks only who the dead person was, and how, when and where she came by her death. The coroner and a jury of local men hear the witnesses; the verdict, each time this autumn, is 'wilful murder by some person or persons unknown'."])); });
shkSpot(cx - Rm.hw + 2, cz - 2.4, 1.8, "The jury benches", "sit", function () { wcTale("🪑 The jury", ["Fifteen local men, householders: shopkeepers, a builder, a publican, a clerk. They go together to view the place and the mortuary before they sit."]); });
for (var jm = 0; jm < (WCH.lite ? 3 : 8); jm++)
wcHome("wc_ladsj" + jm, ["gent", "wcman", "wcporter", "wcrep"][jm % 4], cx - Rm.hw + 2 + ((jm % 2) ? 0.35 : -0.35), 0.3, cz - 4.6 + ((jm / 2) | 0) * 1.1, Math.PI / 2, { room: "wc_lads", sex: "m" });
wcHome("wc_ladsco", "wcinsp", cx + 1.6, 0.5, cz - Rm.hd + 1.4, 0, { room: "wc_lads", sex: "m", name: "The coroner's officer", persona: "You are the made-up coroner's officer at the inquests in the Working Lads' Institute, Whitechapel Road, in September 1888, in a story set among the real events: you call the witnesses, swear the jury and keep order. You say only what was said in open court and printed in the papers. You never guess who the killer is. " + WCH_ERA, greet: "Quiet in court, if you please. The coroner is about to resume." });
for (var pb = 0; pb < (WCH.lite ? 4 : 12); pb++) {
var pr = pb % 4, pi = (pb / 4) | 0;
wcHome("wc_ladsp" + pb, ["wcwoman", "wcman", "wcmatch", "wccoster", "wcwoman", "wcjew"][pb % 6], cx - 3 + pi * 3 + (pr % 2) * 0.6, 0.3, cz + 2.3 + pr * 1.3, Math.PI, { room: "wc_lads", sex: pb % 6 === 0 || pb % 6 === 4 || pb % 6 === 2 ? "f" : "m" });
}
Rm.hello = "<b>The Working Lads' Institute.</b> The hall as a coroner's court: the coroner's table on the platform, the jury on their benches, the witness's chair, the public packed behind the rail.";
},
function (g, cx, cz, R, Rm) {
var h = 4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwoffice", 0xFFFFFF), low: dlnS("oak", 0x4A3020), lowH: 1.2, h: h, ceil: dlnC(0xE8E0D0), outName: "Out, and back to Whitechapel by cab", out: wcOut("cab") });
for (var d = 0; d < 3; d++) {
n14Table(g, cx - 2.8 + d * 2.8, cz - 0.6, 1.6, 0.9, 0.78, dlnS("oak", 0x5A3A22));
n14Chair(g, cx - 2.8 + d * 2.8, cz + 0.2, Math.PI, dlnS("oak", 0x5A3A22));
dlnBox(g, 0.32, 0.08, 0.24, dlnC(0xE8E0C8), cx - 2.8 + d * 2.8, 0.84, cz - 0.6);
}
dlnBox(g, 3, 2.2, 0.4, dlnS("oak", 0x3A2414), cx, 1.1, cz - Rm.hd + 0.25);
for (var p = 0; p < 24; p++)
dlnBox(g, 0.2, 0.12, 0.02, dlnC(0xE8E0C8), cx - 1.3 + (p % 8) * 0.36, 0.5 + ((p / 8) | 0) * 0.6, cz - Rm.hd + 0.47);
for (var t = 0; t < 2; t++) {
dlnBox(g, 0.5, 0.3, 0.4, dlnShine(0x3A2A1A, 0.4, 0.2), cx + Rm.hw - 1, 0.95, cz - 2 + t * 1.4);
dlnCyl(g, 0.06, 0.06, 0.2, dlnShine(0xC8A048, 0.3, 0.9), cx + Rm.hw - 1, 1.2, cz - 2 + t * 1.4, 8);
}
n14Gasolier(g, cx, h, cz - 0.6);
shkSolidBox(cx, cz - Rm.hd + 0.25, 3, 0.4, 0);
shkSpot(cx, cz - Rm.hd + 1.2, 1.8, "The pigeon-holes", "look", function () { wcTale("📬 The Central News Agency", ["A news agency at 5 New Bridge Street, by Ludgate Circus: it gathers news and sells it by telegraph to papers all over the country. On 27 September 1888 a letter came here addressed to 'The Boss, Central News Office', written in red ink and signed with a name nobody had used before: Jack the Ripper. The agency sent it on to Scotland Yard two days later."]); });
shkSpot(cx + Rm.hw - 1.6, cz - 1.3, 1.6, "The telegraph instruments", "listen", function () { wcTale("📟 The wires", ["Clicking all day and all night: news going out to the Manchester Guardian, the Glasgow Herald, the papers in America, minutes after it happens."]); });
[0, 1, 2].forEach(function (i) { if (WCH.lite && i)
return; wcHome("wc_cnaf" + i, "wcrep", cx - 2.8 + i * 2.8, 0.02, cz + 0.3, Math.PI, { room: "wc_cna" }); });
Rm.hello = "<b>The Central News Agency, New Bridge Street.</b> Clerks at their desks, the telegraph instruments clicking, the pigeon-holes full of copy.";
},
function (g, cx, cz, R, Rm) {
var h = 4.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwcream", 0xC8C0A8), low: dlnS("oak", 0x4A3020), lowH: 1.2, h: h, ceil: dlnC(0xE0D8C8), outName: "Out to Berner Street", out: wcOut("berner") });
dlnBox(g, Rm.hw * 2 - 1, 0.6, 3, dlnS("oak", 0x5A3A22), cx, 0.3, cz - Rm.hd + 1.6);
dlnBox(g, 1.4, 1.2, 0.6, dlnShine(0x1A1414, 0.4, 0.3), cx - Rm.hw + 1.5, 1.2, cz - Rm.hd + 1.0);
for (var b = 0; b < 5; b++)
wcBench(g, cx, cz - 1 + b * 1.4, 7, 0);
n14Table(g, cx + Rm.hw - 1.2, cz + Rm.hd - 3, 1.4, 1.6, 0.8, dlnS("oak", 0x5A3A22));
for (var p = 0; p < 6; p++)
dlnBox(g, 0.34, 0.02, 0.46, dlnC(0xE8E0C8), cx + Rm.hw - 1.4, 0.82 + p * 0.02, cz + Rm.hd - 3);
n14Gasolier(g, cx - 2, h, cz);
n14Gasolier(g, cx + 2, h, cz);
shkSpot(cx + Rm.hw - 1.2, cz + Rm.hd - 4, 1.8, "The newspaper", "read Der Arbeter Fraint", function () { wcTale("📰 Der Arbeter Fraint", WCH_FACTS.berner.concat(["'The Worker's Friend': printed here in Yiddish, for the tailors and bootmakers of the East End who work fourteen hours a day in the sweaters' workshops for a few shillings a week."])); });
shkSpot(cx - Rm.hw + 1.5, cz - Rm.hd + 2.2, 1.8, "The piano", "listen to the singing", function () { wcTale("🎹 Saturday night", ["On Saturday nights there is a discussion, and afterwards the members and their friends sing: Russian songs, German songs, Yiddish songs. On the night of 29 September about ninety people came to hear a debate on 'Why Jews should be Socialists'; by one in the morning a few dozen were still upstairs, singing."]); });
[0, 1, 2, 3].forEach(function (i) { if (WCH.lite && i > 1)
return; wcHome("wc_clubf" + i, i % 2 ? "wcwoman" : "wcjew", cx - 2.4 + i * 1.6, 0.02, cz - 0.4 + ((i / 2) | 0) * 1.4, Math.PI, { room: "wc_club" }); });
Rm.hello = "<b>The club, 40 Berner Street.</b> The meeting hall: a platform and a piano, benches, the stacks of the club's Yiddish newspaper by the door.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xA8A090), wall: dlnS("n14whitetile", 0xFFFFFF), h: h, ceil: dlnC(0xE8E0D0), outName: "Out to Wentworth Street", out: wcOut("bakery") });
dlnBox(g, 3, 2.4, 1.6, dlnS("stock", 0x7A6A54), cx, 1.2, cz - Rm.hd + 0.8);
dlnBox(g, 1.2, 0.6, 0.1, dlnGlow(0xE87A2A), cx, 1.0, cz - Rm.hd + 1.62);
shkSolidBox(cx, cz - Rm.hd + 0.8, 3, 1.6, 0);
n14Table(g, cx - 1.6, cz, 1.4, 1.0, 0.86, dlnS("oak", 0xC8B898));
for (var l = 0; l < 6; l++) {
var lf = dlnBox(g, 0.26, 0.12, 0.14, dlnC(0xA8783A), cx - 2.0 + (l % 3) * 0.3, 0.94, cz - 0.2 + ((l / 3) | 0) * 0.3);
}
dlnBox(g, 2.6, 0.9, 0.6, dlnS("oak", 0x5A3A22), cx + 0.6, 0.45, cz + 1.8);
for (var r = 0; r < 3; r++)
for (var b = 0; b < 6; b++) {
var bg = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.03, 5, 10), dlnC(0xC8904A));
bg.position.set(cx + Rm.hw - 0.4, 0.6 + r * 0.5, cz - 2 + b * 0.4);
bg.rotation.y = Math.PI / 2;
g.add(bg);
}
for (var s = 0; s < 3; s++)
dlnBox(g, 0.5, 0.7, 0.4, dlnC(0xE8E0D0), cx - Rm.hw + 0.4, 0.35, cz - 1 + s * 0.6);
shkSpot(cx, cz - Rm.hd + 2, 1.8, "The oven", "feel the heat", function () { wcTale("🔥 The oven", ["A brick oven, fired with coal, going all night. Rye bread for the week, the plaited challah loaves for the Sabbath on Friday, and bagels, boiled first and then baked, sold on strings."]); });
shkSpot(cx - 1.6, cz + 0.8, 1.6, "The kneading table", "shape a bagel", function () { wcTale("🥯 A bagel", ["Roll the dough into a rope, close it into a ring round your hand, drop it in the boiling water till it floats, then into the oven. A farthing each, or a string of them for the week."]); });
wcHome("wc_bakeh", "wcbaker", cx + 0.6, 0.02, cz + 1.1, Math.PI, { name: "Mr Rosen, at his oven", persona: WCH_FOLK.baker.persona, greet: "Come in, come in out of the cold! You want bread, or you want to watch?", room: "wc_bake" });
wcHome("wc_bakew", "wcwoman", cx - 1.6, 0.02, cz - 0.8, 0, { room: "wc_bake" });
Rm.hello = "<b>Mr Rosen's bakery.</b> The heat of the brick oven, sacks of flour, loaves cooling, strings of bagels hung on the wall.";
},
function (g, cx, cz, R, Rm) {
var h = 8;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5040), wall: dlnS("lwredpaper", 0x9A4A3A), low: dlnS("oak", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0xC8A870), outName: "Out to the Mile End Road", out: wcOut("paragon") });
dlnBox(g, Rm.hw * 2 - 2, 1.2, 5, dlnS("oak", 0x5A3A22), cx, 0.6, cz - Rm.hd + 2.6);
dlnBox(g, Rm.hw * 2 - 2, 0.6, 0.3, dlnS("oak", 0x3A2414), cx, 1.5, cz - Rm.hd + 5.2);
for (var f = 0; f < 10; f++)
dlnBox(g, 0.3, 0.1, 0.1, dlnGlow(0xFFE0A0), cx - 6.5 + f * 1.45, 1.25, cz - Rm.hd + 5.0);
dlnBox(g, Rm.hw * 2 - 2, 6, 0.2, dlnC(0x7A1A1A), cx, 4.2, cz - Rm.hd + 0.3);
dlnBox(g, 2, 6.4, 0.4, dlnC(0x8A1E1E), cx - Rm.hw + 1.8, 3.2, cz - Rm.hd + 5.4);
dlnBox(g, 2, 6.4, 0.4, dlnC(0x8A1E1E), cx + Rm.hw - 1.8, 3.2, cz - Rm.hd + 5.4);
n14Table(g, cx, cz - Rm.hd + 6.4, 1.8, 0.8, 0.8, dlnS("oak", 0x5A3A22), dlnC(0x6A1A1A));
n14Chair(g, cx, cz - Rm.hd + 7.0, Math.PI, dlnS("oak", 0x3A2414));
for (var t = 0; t < (WCH.lite ? 4 : 10); t++) {
var tx = cx - 6 + (t % 5) * 3, tz = cz - 1 + ((t / 5) | 0) * 4;
n14Table(g, tx, tz, 0.8, 0.8, 0.74, dlnS("oak", 0x5A3A22));
n14Chair(g, tx - 0.7, tz, Math.PI / 2, dlnS("oak", 0x5A3A22));
n14Chair(g, tx + 0.7, tz, -Math.PI / 2, dlnS("oak", 0x5A3A22));
}
dlnBox(g, Rm.hw * 2, 0.4, 4, dlnS("oak", 0x4A3020), cx, 4.4, cz + Rm.hd - 2);
for (var gs = 0; gs < 6; gs++)
n14Gasolier(g, cx - 7.5 + gs * 3, h, cz);
shkSpot(cx, cz - Rm.hd + 7.8, 1.8, "The chairman's table", "listen to the turn", function () { wcTale("🎤 Tonight's turns", ["The chairman, in evening dress, sits at his table below the stage with a gavel, announces each turn and invites the gentlemen to buy him a drink. Tonight: a comic singer with a song about the lodger, a pair of clog-dancers, a lady who sings sentimental ballads, a man with performing dogs, and to finish, the whole company and the audience in a chorus."]); });
[0, 1, 2, 3, 4, 5].forEach(function (i) { if (WCH.lite && i > 2)
return; wcHome("wc_paraf" + i, ["wcwoman", "wcman", "wcmatch", "wcporter", "wcwoman", "wccoster"][i], cx - 6 + (i % 5) * 3 + 0.7, 0.02, cz - 1 + ((i / 5) | 0) * 4, -Math.PI / 2, { room: "wc_para" }); });
var turn = wcHome("wc_paraturn", "wcrep", cx, 1.22, cz - Rm.hd + 2.6, 0, { room: "wc_para" });
Rm.hello = "<b>The Paragon.</b> Little tables in the hall, the gallery above, the chairman at his table under the footlights, a comic singer on the stage.";
},
function (g, cx, cz, R, Rm) {
var h = 4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7A60), wall: dlnS("lwoffice", 0xFFFFFF), low: dlnS("oak", 0x4A3020), lowH: 1.2, h: h, ceil: dlnC(0xE0D8C8), outName: "Out, and a cab back to Whitechapel", out: wcOut("cab") });
for (var d = 0; d < 4; d++) {
var dx = cx - 3.3 + (d % 2) * 3.6, dz = cz - 2 + ((d / 2) | 0) * 2.8;
n14Table(g, dx, dz, 1.6, 0.9, 0.78, dlnS("oak", 0x5A3A22));
n14Chair(g, dx, dz + 0.8, Math.PI, dlnS("oak", 0x5A3A22));
dlnCyl(g, 0.008, 0.008, 0.22, dlnC(0x8A8A8A), dx + 0.6, 0.9, dz - 0.2, 4);
for (var s = 0; s < 3; s++)
dlnBox(g, 0.18, 0.004, 0.26, dlnC(0xF0E8D8), dx + 0.6, 0.82 + s * 0.02, dz - 0.2);
}
dlnBox(g, 3.2, 2.4, 0.08, dlnShine(0xC8D0D8, 0.1, 0.9), cx + Rm.hw - 2, 1.4, cz - Rm.hd + 2.6);
n14Table(g, cx + Rm.hw - 2, cz - Rm.hd + 1.2, 1.6, 0.9, 0.78, dlnS("oak", 0x3A2414));
n14Gasolier(g, cx - 1.5, h, cz - 0.6);
wsmWin(g, cx - Rm.hw + 0.06, 1.8, cz - 1, Math.PI / 2, 1.4, 2.0);
shkSpot(cx - 3.3, cz - 1.2, 1.8, "Your desk", "sit and write", function () { wcTale("✒️ Your desk", WCH_FACTS.star.concat(["Copy paper, a steel pen, the spike for what the sub-editor throws back. The rule of this desk, from the sub-editor: write what you saw and what you can prove; never what the crowd says."])); });
wcHome("wc_starsub", "wcinsp", cx + Rm.hw - 2, 0.02, cz - Rm.hd + 0.6, 0, { name: "Mr Ernest Parr, sub-editor", persona: "You are Ernest Parr, a sub-editor on the Star, the new halfpenny evening paper, in the autumn of 1888, from a made-up story set in the real London: sharp, tired, a stickler for facts in a paper that loves a loud headline. You sent the young reporter to Whitechapel. " + WCH_ERA, greet: "Copy, or excuses? We go to press at four.", room: "wc_star" });
[0, 1].forEach(function (i) { if (WCH.lite && i)
return; wcHome("wc_starf" + i, "wcrep", cx + 0.3, 0.02, cz - 1.2 + i * 2.8, Math.PI, { room: "wc_star" }); });
Rm.hello = "<b>The Star, Stonecutter Street.</b> The reporters' room: desks and spikes, copy paper everywhere, the sub-editor's glass room at the end, the presses thumping somewhere below.";
},
function (g, cx, cz, R, Rm) {
var h = 12, st = dlnS("portland", 0xE8E4D8);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xC8C0B0), wall: dlnS("portland", 0xF0ECE0), h: h, ceil: dlnC(0xF4F0E4), outName: "Out to Commercial Street", out: wcOut("church") });
for (var c = 0; c < 5; c++)
[-1, 1].forEach(function (s) { dlnCyl(g, 0.42, 0.48, h - 0.4, st, cx + s * (Rm.hw - 2.6), (h - 0.4) / 2, cz - Rm.hd + 3 + c * 4.6, 12); dlnBox(g, 2.2, 0.3, 4.4, dlnS("oak", 0x5A3A22), cx + s * (Rm.hw - 1.1), 4.2, cz - Rm.hd + 3 + c * 4.6); });
for (var p = 0; p < 8; p++)
[-1, 1].forEach(function (s) { dlnBox(g, 4.0, 1.1, 1.2, dlnS("oak", 0x6A4A2A), cx + s * 2.6, 0.55, cz - Rm.hd + 5 + p * 2.2); });
dlnBox(g, 3, 1.0, 1.2, dlnS("marble", 0xFFFFFF), cx, 0.5, cz - Rm.hd + 1);
dlnBox(g, 4, 6, 0.2, dlnGlow(0xE8E0C8), cx, 6, cz - Rm.hd + 0.12);
dlnBox(g, 6, 4, 2, dlnS("oak", 0x4A2E1A), cx, 9, cz + Rm.hd - 1.4);
for (var o = 0; o < 9; o++)
dlnCyl(g, 0.12, 0.12, 2.6 - Math.abs(o - 4) * 0.3, dlnShine(0xC8B888, 0.3, 0.8), cx - 2 + o * 0.5, 11.6 - Math.abs(o - 4) * 0.15, cz + Rm.hd - 1.0, 8);
for (var w = 0; w < 4; w++)
[-1, 1].forEach(function (s) { wsmWin(g, cx + s * (Rm.hw - 0.06), 7, cz - Rm.hd + 4 + w * 5.5, s > 0 ? -Math.PI / 2 : Math.PI / 2, 2, 4); });
dlnBox(g, 1.4, 0.9, 0.5, dlnS("oak", 0x3A2414), cx + 3, 0.45, cz + Rm.hd - 3.4);
for (var k = 0; k < 5; k++)
dlnCyl(g, 0.03, 0.03, 0.24, dlnC(0xF4F0E4), cx + 2.5 + k * 0.25, 1.02, cz + Rm.hd - 3.4, 6);
shkSpot(cx + 3, cz + Rm.hd - 2.6, 1.8, "The candles", "light a candle", function () {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>🕯️ Five candles</div><p style='opacity:.9'>Light one for each of them, and read who she was.</p>", fns = {};
WCH_LIVES.forEach(function (L) { b += worldBtn(L.k, L.n + ", " + L.age, L.date); fns[L.k] = function () { worldCard(null); wcLife(L.k); if (typeof playTone === "function")
playTone(660, 0.08); }; });
worldCard(b, fns);
});
shkSpot(cx, cz + Rm.hd - 5, 2, "The nave", "look up", function () { wcTale("⛪ Inside Christ Church", WCH_FACTS.church.concat(["The great organ in the west gallery was built by Richard Bridge in 1735, the largest in England when it was new."])); });
wcHome("wc_chclerk", "clergy", cx - 2, 0.02, cz - Rm.hd + 3, 0, { name: "The verger", persona: "You are the verger of Christ Church, Spitalfields, in 1888, from a made-up story set in the real place: you keep the keys, light the gas, ring for services and know the church's history (Hawksmoor, 1714 to 1729; the Huguenot weavers; the Bridge organ of 1735). This autumn women from the lodging-houses come in to sit where it is warm and quiet, and you let them. " + WCH_ERA, greet: "You're welcome to sit. It's quiet in here, at least.", room: "wc_church" });
Rm.hello = "<b>Christ Church, Spitalfields.</b> Hawksmoor's great white nave: giant columns, the galleries, the box pews, the Bridge organ high in the west gallery. Quiet, after the street.";
},
function (g, cx, cz, R, Rm) {
var h = 3.2;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A6A50), wall: dlnS("stock", 0x9A8A70), low: dlnS("oak", 0x4A3020), lowH: 1.0, h: h, ceil: dlnC(0x8A7A5A), outName: "Out to Dorset Street", out: wcOut("mccarthy") });
dlnBox(g, Rm.hw * 2 - 1.6, 1.0, 0.6, dlnS("oak", 0x5A3A22), cx, 0.5, cz - 0.6);
shkSolidBox(cx, cz - 0.6, Rm.hw * 2 - 1.6, 0.6, 0);
for (var s = 0; s < 4; s++) {
dlnBox(g, Rm.hw * 2 - 0.6, 0.05, 0.4, dlnS("oak", 0x4A3020), cx, 0.6 + s * 0.6, cz - Rm.hd + 0.25);
for (var i = 0; i < 10; i++)
dlnBox(g, 0.2, 0.24, 0.18, dlnC([0xF4F0E4, 0xC8A060, 0x5A7A3A, 0x8A2A2A, 0x3A3A3A][(i + s) % 5]), cx - Rm.hw + 0.6 + i * 0.65, 0.75 + s * 0.6, cz - Rm.hd + 0.25);
}
for (var b = 0; b < 5; b++)
dlnBox(g, 0.4, 0.3, 0.4, dlnS("oak", 0x9A7A54), cx - Rm.hw + 0.4, 0.15 + b * 0.3, cz + 1.5);
shkSpot(cx, cz + 0.4, 1.8, "The counter", "buy something", function () { wcTale("🕯️ A chandler's", ["Candles a farthing each, a bundle of firewood a ha'penny, soap, lamp oil, tea by the ounce, bread and herrings: everything in the smallest quantities, for people who live from day to day.", "John McCarthy owns the shop at No. 27 and lets the rooms in Miller's Court behind it, by the week."]); });
wcHome("wc_shopboy", "wcporter", cx, 0.02, cz - 1.4, 0, { name: "The shop-boy", persona: "You are the shop-boy at McCarthy's chandler's shop, 27 Dorset Street, in November 1888, from a made-up story set in the real place: you serve candles and firewood, run errands and know everyone in the court behind. " + WCH_ERA, greet: "Candles, firewood, lamp oil? Mr McCarthy's out the back.", room: "wc_shop" });
Rm.hello = "<b>McCarthy's shop, 27 Dorset Street.</b> A chandler's: shelves of candles, soap and tea, bundles of firewood, the counter worn smooth.";
},
function (g, cx, cz, R, Rm) {
var h = 7;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x5A5048), wall: dlnS("stock", 0x7A6A54), h: h, ceil: dlnS("oak", 0x3A2A1A), outName: "Out to the Whitechapel Road", out: wcOut("bell") });
var bronze = dlnShine(0xA87A3A, 0.35, 0.85);
var bell = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.1, 1.8), new THREE.Vector2(0.55, 1.75), new THREE.Vector2(0.7, 1.4), new THREE.Vector2(0.75, 0.7), new THREE.Vector2(0.95, 0.25), new THREE.Vector2(1.1, 0)], 20), bronze);
bell.material.side = THREE.DoubleSide;
bell.position.set(cx - 2, 1.6, cz - 2);
g.add(bell);
dlnBox(g, 3.4, 0.25, 0.25, dlnS("oak", 0x4A3020), cx - 2, 3.6, cz - 2);
[-1, 1].forEach(function (k) { dlnBox(g, 0.25, 3.6, 0.25, dlnS("oak", 0x4A3020), cx - 2 + k * 1.6, 1.8, cz - 2); });
dlnBox(g, 2.6, 2.6, 2.0, dlnS("stock", 0x5A4A3A), cx + Rm.hw - 1.5, 1.3, cz - Rm.hd + 1.2);
dlnBox(g, 1.0, 0.8, 0.1, dlnGlow(0xE8742A), cx + Rm.hw - 1.5, 0.9, cz - Rm.hd + 2.22);
shkSolidBox(cx + Rm.hw - 1.5, cz - Rm.hd + 1.2, 2.6, 2.0, 0);
for (var m = 0; m < 3; m++) {
var md = dlnCyl(g, 0.5 + m * 0.2, 0.8 + m * 0.2, 1.0 + m * 0.3, dlnC(0x6A5040), cx - Rm.hw + 1.2 + m * 1.8, 0.5 + m * 0.15, cz + 2.2, 14);
}
shkSolidBox(cx - 2, cz - 2, 2.4, 2.4, 0);
shkSpot(cx - 2, cz - 0.4, 2, "The bell", "strike it", function () { if (typeof playTone === "function") {
playTone(196, 0.6);
setTimeout(function () { playTone(392, 0.5); }, 120);
} wcTale("🔔 The bell", ["It hums for a long time. Each bell is tuned by turning metal off the inside on a vertical lathe until its notes (the hum, the prime, the tierce, the quint and the nominal) agree."].concat(WCH_FACTS.bell)); });
shkSpot(cx - Rm.hw + 2, cz + 3.2, 1.8, "The loam moulds", "look", function () { wcTale("🟫 Loam moulds", ["The mould is built of loam (sand, clay, horse dung and goat's hair), swept to shape with a wooden pattern called a crook, dried, then the core and the cope set together in the casting pit and the bronze poured in from the furnace."]); });
wcHome("wc_foundw", "wcfounder", cx + 1, 0.02, cz - 1, Math.PI * 0.75, { name: "Mr Gubb, at the casting pit", persona: WCH_FOLK.founder.persona, greet: "Careful near the pit. We've a ring of eight going to a church in Yorkshire.", room: "wc_found" });
Rm.hello = "<b>The Whitechapel Bell Foundry.</b> The casting floor: a bell on its frame, loam moulds drying, the furnace glowing in the corner, the smell of hot metal.";
},
function (g, cx, cz, R, Rm) {
var h = 13, red = dlnC(0x8A1A22), gilt = dlnShine(0xC8A048, 0.3, 0.9), oak = dlnS("oak", 0x4A2A18), plush = dlnC(0x7A1418);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("lwredpaper", 0x8A2A2A), low: oak, lowH: 1.4, h: h, ceil: dlnC(0xE8D8B0), outName: "Out to Wellington Street", out: wcOut("lyceum") });
var sz = cz - Rm.hd + 4.2;
dlnBox(g, Rm.hw * 2 - 2, 1.2, 8, dlnS("boards", 0x7A5A3A), cx, 0.6, cz - Rm.hd + 4);
shkSolidBox(cx, cz - Rm.hd + 4, Rm.hw * 2 - 2, 8, 0);
dlnBox(g, Rm.hw * 2, 2.4, 0.6, gilt, cx, h - 1.2, sz + 3.9);
[-1, 1].forEach(function (k) { dlnBox(g, 1.6, h, 0.6, gilt, cx + k * (Rm.hw - 0.8), h / 2, sz + 3.9); dlnBox(g, 2.2, h - 3, 0.3, red, cx + k * (Rm.hw - 2.6), (h - 3) / 2 + 1.2, sz + 3.4); });
dlnBox(g, Rm.hw * 2 - 4, 2.6, 0.3, red, cx, h - 3.6, sz + 3.5);
for (var f = 0; f < 14; f++)
dlnBox(g, 0.24, 0.1, 0.1, dlnGlow(0xFFE0A0), cx - 8.5 + f * 1.3, 1.26, sz + 3.8);
var set = new THREE.Group();
set.position.y = 1.2;
g.add(set);
dlnBox(set, Rm.hw * 2 - 4, 7, 0.2, dlnS("lwgreenpaper", 0x5A6A4A), cx, 3.5, cz - Rm.hd + 0.4);
n14Pic(set, cx - 3, 3.0, cz - Rm.hd + 0.55, 0, 1.2, 1.5, ["#6A7A9A", "#3A4A3A"]);
n14Pic(set, cx + 3, 3.0, cz - Rm.hd + 0.55, 0, 1.2, 1.5, ["#9A7A5A", "#4A3A2A"]);
dlnFireplace(set, cx, cz - Rm.hd + 0.8, 0);
n14Table(set, cx + 2.6, sz - 1, 1.4, 0.9, 0.78, oak, dlnC(0x2A4A2A));
n14Chair(set, cx + 1.6, sz - 1, Math.PI / 2, oak);
dlnBox(set, 2.4, 0.9, 0.8, oak, cx - 5, 0.45, sz - 2);
[0, 1, 2, 3, 4].forEach(function (i) { dlnCyl(set, 0.05, 0.07, 0.24, dlnShine([0x4A8A4A, 0xC83A3A, 0xE8E0C0, 0x5A4AA8, 0xD8C848][i], 0.1, 0.6), cx - 5.8 + i * 0.4, 1.04, sz - 2, 8); });
var rows = WCH.lite ? 5 : 9;
for (var r = 0; r < rows; r++) {
var rz = cz - Rm.hd + 10 + r * 1.3;
[-1, 1].forEach(function (k) { dlnBox(g, 7.6, 0.5, 0.55, plush, cx + k * 5, 0.25, rz); dlnBox(g, 7.6, 0.6, 0.12, plush, cx + k * 5, 0.75, rz + 0.3); });
shkSolidBox(cx - 5, rz, 7.6, 0.7, 0);
shkSolidBox(cx + 5, rz, 7.6, 0.7, 0);
}
dlnBox(g, Rm.hw * 2, 0.4, 5, oak, cx, 5.2, cz + Rm.hd - 2.5);
dlnBox(g, Rm.hw * 2, 1, 0.2, gilt, cx, 5.9, cz + Rm.hd - 5);
[-1, 1].forEach(function (k) { for (var b = 0; b < 2; b++) {
var bz = sz + 6 + b * 3.4;
dlnBox(g, 1.6, 0.9, 2.8, plush, cx + k * (Rm.hw - 0.8), 4.4 + b * 0, bz);
dlnBox(g, 1.7, 0.2, 3, gilt, cx + k * (Rm.hw - 0.8), 4.9, bz);
} });
for (var gs = 0; gs < (WCH.lite ? 2 : 4); gs++)
n14Gasolier(g, cx - 6 + gs * 4, h, cz + 2);
for (var i = 0; i < (WCH.lite ? 4 : 12); i++) {
var pr = i % rows, pk = i % 2 ? -1 : 1;
wcHome("wc_lycaud" + i, ["gent", "lady", "gent", "lady", "wcrep", "lady"][i % 6], cx + pk * (2 + ((i * 7) % 5) * 1.2), 0.3, cz - Rm.hd + 10.4 + pr * 1.3, Math.PI, { room: "wc_lyc", sex: i % 2 ? "f" : "m" });
}
shkSpot(cx, sz + 4.6, 2.4, "The stage", "look at the set", function () { wcTale("🎭 Dr Jekyll and Mr Hyde", ["Dr Jekyll's drawing room: a fire, pictures, a chemist's bench at the side with the phials and the powders. In the play, the good doctor drinks his mixture here, and in front of the whole audience, by lighting and his own body and voice and nothing else, becomes Edward Hyde.", "Robert Louis Stevenson's story was published in January 1886 and sold forty thousand copies in six months. The stage version, by Thomas Russell Sullivan, was made for the actor Richard Mansfield, who brought it from America to the Lyceum in August 1888."]); });
shkSpot(cx + 3, cz + Rm.hd - 5.6, 1.8, "The programme", "read it", function () { wcTale("📄 The programme", ["LYCEUM THEATRE. Sole lessee, Mr Henry Irving. Every evening at 8: DR. JEKYLL AND MR. HYDE, a play in four acts, from Robert Louis Stevenson's story. Dr Henry Jekyll and Mr Edward Hyde: Mr Richard Mansfield.", "Act I: Dr Lanyon's house. Act II: Jekyll's house. Act III: Hyde's lodgings in Soho. Act IV: Jekyll's laboratory. Carriages at eleven."]); });
shkSpot(cx - 6, cz + Rm.hd - 6, 1.8, "The stalls", "sit a while", function () { wcTale("💺 The stalls", ["Red plush, gilt and gaslight: the stalls seat the West End in evening dress, the pit and gallery behind and above them hold everyone else, a shilling at the top. The Lyceum is one of the great theatres of London; Henry Irving and Ellen Terry play Shakespeare here most of the year."]); });
Rm.hello = "<b>The Lyceum Theatre.</b> Gilt and red plush, gaslight, the curtain up on Dr Jekyll's drawing room, the stalls filling for Dr Jekyll and Mr Hyde.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : wcbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? wcbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = wcbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
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
var W = wcbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = WCB_CH[wcbS().ch], ix = wcbS().s, d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who && !(d.from != null && ix < d.from) && !(d.until != null && ix >= d.until); })[0] : null;
if (d0 && d0.at !== at)
return wcbPos(d0.at);
}
if (at.spot) {
var Sp = wcbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = WCB.cast[at.cast], q = c && c.g && c.g.parent ? wcbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: wcbAreaAt(q.x, q.z) };
}
if (at.room)
return wcbRoomPt(at.room, at.lx, at.lz);
if (at.at && WCH_PLACES[at.at]) {
var A = WCH_PLACES[at.at], ax = wcX(A.x + (at.dx || 0)), az = wcZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: wcbAreaAt(ax, az) };
}
if (at.x != null) {
var x = wcX(at.x), z = wcZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: wcbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: wcbRoomExit(), way: " (through the doors)" };
return { show: wcbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = wcbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target) {
if (area === "wc" || area === "wl") {
var c0 = area === "wl" ? WCH_LYC.cab : WCH_CAB;
return { show: { x: wcX(c0.x + 2), z: wcZ(c0.z), y: 0, area: area }, way: " (take a cab from the rank: it is in Fleet Street)" };
}
return { show: null, way: " (any London cab rank: To Whitechapel, then a cab to Fleet Street)" };
}
}
if (target.area === area)
return { show: target, way: inn };
if (area === "wc" || area === "wl") {
var c = area === "wl" ? WCH_LYC.cab : WCH_CAB;
return { show: { x: wcX(c.x + 2), z: wcZ(c.z), y: 0, area: area }, way: area === "wl" ? " (the cab rank in Wellington Street: back to Whitechapel)" : " (the cab rank on Commercial Street: a cab to the Strand)" };
}
return { show: null, way: " (any London cab rank: To Whitechapel; or the 🎭 menu)" };
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
if (WCB.beam && WCB.beam.parent)
return WCB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
WCB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "coal":
m = wSph(0.09, wM(0x141414), 0, 0.06, 0, g, 6);
m.scale.set(1.2, 0.8, 1);
break;
case "penny":
m = wCyl(0.03, 0.03, 0.006, wM(0xA8642A, { m: 0.8, r: 0.35 }), 0, 0.006, 0, g, 12);
break;
case "chalk":
m = wBox(0.08, 0.02, 0.02, wM(0xF4F4F0), 0, 0.01, 0, g);
break;
case "apron":
m = wBox(0.3, 0.01, 0.25, wM(0xC8BCA8), 0, 0.01, 0, g);
break;
case "nib":
m = wBox(0.03, 0.01, 0.008, wM(0x6A6A70, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g);
break;
case "bottle":
m = wCyl(0.04, 0.045, 0.14, wM(0x8A1A1A), 0, 0.07, 0, g, 8);
break;
case "flower":
m = wSph(0.05, wM(0xE8E0F0), 0, 0.05, 0, g, 8);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = wcbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (WCB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
WCB.items = WCB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[wcb] take", e);
}
}, (P.y || 0));
I.S.wcb = 1;
WCB.items.push(I);
return I;
},
function (k) {
if (WCB.tuneKey === k)
return;
WCB.tuneKey = k;
var old = WCB.tune;
WCB.tune = null;
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
if (!k || !WCB_TUNES[k])
return;
try {
var A = new Audio(WCB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
WCB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (WCB.tune !== A) {
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
function (i) {
wcbText(function (B) {
var C = WCB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(wcbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); WCB.readOpen = 0; WCB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = wcbS(), C = WCB_CH[S.ch];
if (!C)
return;
WCB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
WCB.readAsk = 0;
WCB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(C.src || "Whitechapel, 1888: the true record, and a made-up mystery round it") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + (C.more ? C.more.map(function (p) { return "<p style='margin:6px 0;opacity:.88'>" + esc(p) + "</p>"; }).join("") : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? wcbOpening(T).map(wcbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); WCB.readOpen = 0; wcbStepDone(); }, all: function () { wcbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into Whitechapel");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += wcbKeeperBtns(fns);
worldCard(b, fns);
};
wcbText(show);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
WCB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); wcbJump(i); }; });
return b + "</div>";
},
function () {
var b = wcbStep();
wcbItemsClear();
WCB.hold = 0;
WCB.puzOpen = 0;
if (!b)
return;
if (wcbAgeSkip(b)) {
wcbStepDone();
return;
}
b._key = wcbKey();
try {
if (b.on)
b.on(wcbS().f);
}
catch (e) {
if (window.console)
console.warn("[wcb] on", e);
}
if (b.k === "read") {
wcbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { WCB.rew[k] = 0; });
if (b.k === "find")
wcbItemAdd(b.item, wcbPos(b.at), b.name, b.verb, function () { if (wcbKey() === b._key)
wcbStepDone(); });
if (b.k === "gather") {
var P = wcbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(wcbS().ch * 97 + wcbS().s * 13 + 7);
WCB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
wcbItemAdd(b.item, Q, b.name, b.verb, function () { if (wcbKey() !== b._key)
return; WCB.got++; try {
if (b.each)
b.each(WCB.got);
}
catch (e) { } if (WCB.got < n) {
wcbSay((b.eachSay || "Got one.") + " " + WCB.got + " of " + n + ".");
return;
} wcbStepDone(); });
}
}
if (b.h)
wcbSay("<b>" + esc(WCB_CH[wcbS().ch].t) + ".</b> " + b.h);
},
function (b) {
WCB.puzOpen = 1;
WCB.puzT = performance.now();
var k = wcbKey(), fns = {}, h = WCB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
wcbSay(b.yes);
if (wcbKey() === k)
wcbStepDone();
return;
}
wcbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (wcbKey() === k)
WCB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = wcbS(), C = WCB_CH[S.ch], b = wcbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[wcb] done", e);
}
if (b.say)
wcbSay(b.say);
S.s++;
if (window.WCB_LOG)
WCB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= WCB_CH.length - 1) {
S.done = 1;
S.s = 0;
wcbSave();
wcbItemsClear();
wcbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
wcbSave();
var nx = WCB_CH[S.ch];
setTimeout(function () { try {
wcbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[wcb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
wcbSave();
wcbStepBegin();
},
function () {
wcbTune("organ");
var S = wcbS();
var b = "<h3 style='margin:4px 0'>The Autumn of Terror</h3><p>The man who wrote the false letters is in a cell at Leman Street. The real killer was never found: the police questioned hundreds, and their own files close with no name proved. The streets were lit better, the worst lodging-houses were pulled down in the 1890s, and Flower and Dean Street was rebuilt as homes for working families.</p><p style='font-style:italic'>Mary Ann Nichols. Annie Chapman. Elizabeth Stride. Catherine Eddowes. Mary Jane Kelly.</p><p style='font-size:12px;opacity:.75'>The five women, the places, the dates, the witnesses, the letters and the police are true. The reporter, the letter-writer and his crimes, Holmes's part and the people you talked to in the streets are made up. Nobody has ever proved who the killer was, and this game names no one.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wcbSave(); wcbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "Friday, 31 August 1888");
worldCard(b, fns);
},
function () {
var S = wcbS(), C = WCB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Whitechapel, 31 August to 9 November 1888 · Sherlock Holmes from Arthur Conan Doyle's books</div><h3 style='margin:4px 0'>🔦 The Autumn of Terror</h3>";
if (S.done)
b += "<p>You have walked the whole autumn. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((wcbStep() || {}).h || "") + "</p>";
else
b += "<p>August 1888. You are the newest reporter on the Star, sent east of Aldgate pump to write about the people of Whitechapel. Before the week is out, a woman is found dead in Buck's Row, and then another, and the whole world is watching these streets. Find the truth, with Sherlock Holmes beside you; catch the man who is muddying it; and remember the women.</p><p style='font-size:12px;opacity:.75'>The murders are never shown. Players under 18 see a gentler telling.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: a stranger in Spitalfields", S.started ? "Back to where you were" : "Friday, 31 August 1888");
fns.go = function () { worldCard(null); wcbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wcbSave(); wcbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += wcbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = WCB.cast[c.key];
if (wcbCastLive(C))
return C;
var P = wcbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? WCH.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = wcPerson("wcb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "wcb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || WCH_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
wcbWrapT(T);
}
WCB.cast[c.key] = { g: g, P: Q, c: c };
return WCB.cast[c.key];
},
function () {
var C = WCB_CH[wcbS().ch];
if (!C || !C.cast)
return;
var b = wcbStep() || {}, idx = wcbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (WCB.cast[c.key])
wcbCastHide(c.key);
return;
}
if (wcbCastLive(WCB.cast[c.key]))
return;
var P = wcbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (wcbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
wcbPerson(c);
});
},
function (T) {
if (!wcbActive() || !wcZoneNow())
return false;
var b = wcbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = wcbKey();
worldPrompt(null);
var next = function () { if (wcbKey() === k)
wcbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(WCB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
WCB.wt += dt;
if (WCB.wt > 0.5) {
WCB.wt = 0;
wcbWrap();
if (wcbActive())
wcbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!wcbActive()) {
if (WCB.beam)
WCB.beam.visible = false;
if (!busy)
worldPrompt("🔦 <b>The Autumn of Terror</b> · <b>press E</b> for the Whitechapel mystery", wcbOpen);
return;
}
var S = wcbS(), b = wcbStep(), L = worldLocal(), t = SHK.t || 0, area = wcbAreaAt(L.x, L.z);
WCB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? wcbPos(b.at) : null, W = P ? wcbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = wcbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = wcbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = wcbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? wcbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (WCB.readAsk)
break;
if (!WCB.readOpen)
wcbChapterCard();
else {
WCB.readOpen = 0;
wcbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
wcbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
WCB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(WCB.hold, dt);
}
catch (e) { }
if (WCB.hold >= (b.sec || 8)) {
wcbStepDone();
return;
}
}
else
WCB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return WCB.rew[k]; })) {
wcbStepDone();
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
wcbStepDone();
return;
}
break;
}
case "puzzle":
if ((!WCB.puzOpen || performance.now() - (WCB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
wcbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🔦 <b>The Autumn of Terror</b> · <b>press E</b> for the book", wcbOpen);
var C = WCB_CH[S.ch], prog = b && b.k === "hold" && WCB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - WCB.hold)) + " s)" : b && b.k === "gather" ? " (" + (WCB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🔦 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function (x, z) {
if (wcLyc(x, z))
return Math.hypot(x - WCH_LYC.x, z - WCH_LYC.z) < 14 ? "before the Lyceum Theatre, Wellington Street, Strand" : "Wellington Street, Strand";
var best = null, bd = 9;
for (var k in WCH_PLACES) {
var P = WCH_PLACES[k], d = Math.hypot(x - P.x, z - P.z);
if (d < bd) {
bd = d;
best = P.name;
}
}
if (best)
return best;
var s = wcStreetAt(x, z);
return s ? WCH_ST[s].n + ", Whitechapel" : "Whitechapel";
},
function () {
var L = worldLocal(), Lc = wcLocal(L.x, L.z), atLyc = wcIn(L.x, L.z) && wcLyc(Lc.x, Lc.z), b = "", fns = {};
var go = function (id, icon, label, sub, k, msg) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); wcGo(k, icon + " <b>" + esc(label) + ".</b> " + msg); }; };
if (atLyc) {
go("wc", "🔦", "Back to Whitechapel", "Commercial Street, Spitalfields", "cab", "Down the Strand, Fleet Street, through the City and out past Aldgate pump: the cab sets you down by Christ Church.");
}
else {
go("cc", "⛪", "To Christ Church", "Commercial Street, Spitalfields", "church", "The great white spire over the market.");
go("ws", "🛤️", "To the Whitechapel Road", "The Bell Foundry and the Working Lads' Institute", "lads", "The wide road east, the Hay Market stalls down the middle.");
go("me", "👑", "To Mile End", "The Crown and the Paragon", "crown", "Past the London Hospital to Mile End Waste.");
go("le", "👮", "To Leman Street", "H Division's police station", "leman", "The station's blue lamp over the door.");
go("al", "⛲", "To Aldgate pump", "Where the City ends and the East End begins", "pump", "The pump, the City boundary, Mitre Square a few steps west.");
go("br", "🌹", "To Berner Street", "Off the Commercial Road", "comrd", "The corner of the Commercial Road.");
go("ly", "🎭", "To the Lyceum", "Wellington Street, Strand: Dr Jekyll and Mr Hyde", "lyceum", "West through the City and down the Strand. The portico, the playbills, the carriages.");
}
b += worldBtn("star", "📰 To the Star", "Stonecutter Street, off Fleet Street: the reporters' room");
fns.star = function () { worldCard(null); wchBuild(); shkGoIn("wc_star"); };
b += worldBtn("cna", "✉️ To the Central News", "New Bridge Street, by Ludgate Circus");
fns.cna = function () { worldCard(null); wchBuild(); shkGoIn("wc_cna"); };
if (typeof bsGo === "function") {
b += worldBtn("bs", "To Baker Street", "221B, 1912");
fns.bs = function () { worldCard(null); bsGo("door"); };
}
b += worldBtn("gos", "To Great Ormond Street", "London, 1912: the hospital, Queen Square");
fns.gos = function () { worldCard(null); dlnGo(); };
if (typeof lwlGo === "function") {
b += worldBtn("lw", "🦕 To Fleet Street, 1912", "The Lost World's London");
fns.lw = function () { worldCard(null); lwlGo("cab"); };
}
if (typeof pmlGo === "function") {
b += worldBtn("pm", "🎩 To Pall Mall", "The clubs, the Reform, Charing Cross");
fns.pm = function () { worldCard(null); pmlGo("cab"); };
}
if (typeof wsmGo === "function") {
b += worldBtn("wsm", "To Westminster", "Whitehall, Big Ben, the Abbey");
fns.wsm = function () { worldCard(null); wsmGo("cab"); };
}
if (typeof kgnGo === "function") {
b += worldBtn("kg", "To Kensington Gardens", "The Black Lion Gate");
fns.kg = function () { worldCard(null); kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); };
}
if (typeof n14Go === "function") {
b += worldBtn("n14", "To No. 14, the Darlings' house", "Bloomsbury");
fns.n14 = function () { worldCard(null); n14Go("door"); };
}
b += worldBtn("tale", "The hansom cab", "A shilling a mile, and the cabman up behind");
fns.tale = function () { worldCard(null); wcTale("🐴 Cabs, 1888", ["A hansom: two wheels, one horse, two passengers inside under the folding doors, the driver perched up behind with the reins over the roof. A shilling for the first two miles, sixpence a mile after. The 'growler', a four-wheeler, is slower and holds four and their luggage.", "Few cabs ply for hire east of Aldgate: this rank by Christ Church is for the market men and for the visitors from the West End who come this autumn to stare."]); };
if (typeof dlnTo1600 === "function") {
b += worldBtn("back", "Back to Bankside, 1600", "By Old Father Thames");
fns.back = function () { worldCard(null); dlnTo1600(); };
}
worldCard(worldFacts("🐴 A hansom cab", atLyc ? "The rank in Wellington Street" : "The rank in Commercial Street", [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("wch", "🔦 To Whitechapel, 1888", "Spitalfields, the Ten Bells, the Lyceum: the Autumn of Terror");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); wcGo("cab", "🔦 <b>Whitechapel, autumn 1888.</b> The cab sets you down by Christ Church, Spitalfields: the market across the road, the Ten Bells on the corner, fog in the gas-light."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function () {
if (!WCH.home || !WCH.home.length)
return;
var live = {};
for (var k in WCB.cast) {
var C = WCB.cast[k];
if (C && C.g && C.g.parent && C.c && C.c.name)
live[C.c.name] = 1;
}
WCH.home.forEach(function (H) {
var nm = H.T && H.T.name, off = !!(nm && WCH_HOMEDUP[nm] && live[WCH_HOMEDUP[nm]]);
if (off && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!off && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
if (H.T)
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
},
function (v) {
return wcMat("jkshop:" + v, 256, 128, function (x, W, H) {
var R = wRand(v * 41 + 5), paint = ["#1E3A2A", "#2A2A4A", "#4A1E1E", "#2A3A4A", "#3A2A1A", "#1E2A2A"][v % 6];
wcBricks(x, W, H, WCH_BRICK.red, v + 90);
x.fillStyle = paint;
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8E0CC";
x.fillRect(0, 0, 10, H);
x.fillRect(W - 10, 0, 10, H);
x.fillStyle = paint;
x.fillRect(14, 104, W - 80, 24);
var g = x.createLinearGradient(0, 22, 0, 104);
g.addColorStop(0, "#F8E8C0");
g.addColorStop(1, "#B8925A");
x.fillStyle = g;
x.fillRect(16, 22, W - 84, 82);
var goods = [["#E8D8B0", "#C8A060", "#8A5A3A"], ["#3A6A9A", "#E8E0D0", "#9A3A3A"], ["#F0E8D8", "#D8C8A8", "#B8A888"], ["#6A8A3A", "#C84A2A", "#E8C040"], ["#2A2A2A", "#8A6A4A", "#C8A048"], ["#E8E0F0", "#9A7AB8", "#C8B8D8"]][v % 6];
for (var s = 0; s < 3; s++) {
x.fillStyle = "#5A4026";
x.fillRect(16, 46 + s * 22, W - 84, 2);
for (var i = 0; i < 10; i++) {
x.fillStyle = goods[(i + s) % 3];
var gw = 8 + R() * 8;
x.fillRect(20 + i * 17, 46 + s * 22 - 10 - R() * 4, gw, 10 + R() * 4);
}
}
x.strokeStyle = "rgba(255,255,255,.35)";
x.lineWidth = 2;
x.beginPath();
x.moveTo(24, 24);
x.lineTo(70, 100);
x.moveTo(50, 24);
x.lineTo(80, 60);
x.stroke();
x.fillStyle = "#E8C860";
x.fillRect(16, 98, W - 84, 3);
x.fillStyle = "#E8E0CC";
x.fillRect(W - 64, 10, 54, 118);
x.fillStyle = paint;
x.fillRect(W - 60, 14, 46, 114);
x.fillStyle = "#F8E8C0";
x.fillRect(W - 56, 20, 38, 44);
x.fillStyle = "#E8C860";
x.beginPath();
x.arc(W - 22, 84, 3, 0, 7);
x.fill();
x.fillRect(W - 58, 118, 42, 3);
});
},
function (kind, st, v) {
var H = st * 128;
return wcMat("jkgrand:" + kind + ":" + st + ":" + v, 256, H, function (x, W) {
var R = wRand(st * 71 + v * 23 + 3);
wcBricks(x, W, H, kind === "red" ? WCH_BRICK.red : WCH_BRICK.yellow, v * 11 + st + 5);
for (var f = 0; f < st; f++) {
var y0 = H - (f + 1) * 128 + (f === 0 ? 14 : 24), wh = f === 0 ? 96 : f === st - 1 ? 64 : 84;
for (var b = 0; b < 3; b++) {
var X0 = 22 + b * 76;
x.fillStyle = "#E8E0CC";
x.fillRect(X0 - 5, y0 - 5, 58, wh + 10);
wcWin(x, X0, y0, 48, wh, R, { lit: 0.3, frame: "#F2ECDC" });
x.strokeStyle = "#F2ECDC";
x.lineWidth = 2;
x.beginPath();
x.moveTo(X0 + 16, y0);
x.lineTo(X0 + 16, y0 + wh);
x.moveTo(X0 + 32, y0);
x.lineTo(X0 + 32, y0 + wh);
x.moveTo(X0, y0 + wh / 4);
x.lineTo(X0 + 48, y0 + wh / 4);
x.moveTo(X0, y0 + wh * 3 / 4);
x.lineTo(X0 + 48, y0 + wh * 3 / 4);
x.stroke();
if (f === 0) {
x.fillStyle = "#1A1A1E";
x.fillRect(X0 - 6, y0 + wh + 4, 60, 8);
for (var r = 0; r < 8; r++)
x.fillRect(X0 - 4 + r * 7, y0 + wh - 10, 2, 16);
}
}
if (f === 0) {
x.fillStyle = "#D8D0BC";
x.fillRect(0, H - 128, W, 6);
}
}
x.fillStyle = "#D8D0BC";
x.fillRect(0, 0, W, 10);
});
},
function (kind, v) {
return wcMat("jkgg:" + kind + ":" + v, 256, 128, function (x, W, H) {
var R = wRand(v * 53 + 11);
x.fillStyle = "#E4DCC8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(120,110,90,.35)";
x.lineWidth = 2;
for (var y = 16; y < H; y += 16) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(40,36,30,.05)");
g.addColorStop(1, "rgba(40,36,30,.35)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var dx = v % 2 ? W - 70 : 22, door = ["#141416", "#1E2A1E", "#2A1414", "#1A1E2A"][v % 4];
x.fillStyle = "#F2ECDC";
x.fillRect(dx - 6, 14, 60, 114);
x.fillStyle = door;
x.fillRect(dx, 40, 48, 88);
x.strokeStyle = "rgba(255,255,255,.12)";
x.strokeRect(dx + 6, 48, 15, 34);
x.strokeRect(dx + 27, 48, 15, 34);
x.strokeRect(dx + 6, 88, 15, 34);
x.strokeRect(dx + 27, 88, 15, 34);
x.fillStyle = "#E8C890";
x.beginPath();
x.arc(dx + 24, 38, 22, Math.PI, 0);
x.fill();
x.strokeStyle = "#F2ECDC";
x.lineWidth = 2;
for (var s = 0; s < 5; s++) {
x.beginPath();
x.moveTo(dx + 24, 38);
x.lineTo(dx + 24 - 22 * Math.cos(s * Math.PI / 4), 38 - 22 * Math.sin(s * Math.PI / 4));
x.stroke();
}
x.fillStyle = "#C8A048";
x.fillRect(dx + 22, 80, 5, 5);
var wx = v % 2 ? 24 : 120;
wcWin(x, wx, 26, 52, 78, R, { lit: 0.35, frame: "#F2ECDC" });
wcWin(x, wx + 64, 26, 52, 78, R, { lit: 0.35, frame: "#F2ECDC" });
if (kind === "flats") {
x.fillStyle = "#C8A048";
x.fillRect(dx - 30, 70, 20, 26);
x.fillStyle = "#3A2A14";
for (var l = 0; l < 4; l++)
x.fillRect(dx - 28, 74 + l * 5, 16, 2);
}
});
},
function () {
return wcMat("jkblind", 512, 256, function (x, W, H) {
var R = wRand(1886);
wcBricks(x, W, H, WCH_BRICK.soot, 1886);
for (var i = 0; i < 26; i++) {
x.fillStyle = "rgba(" + (110 + ((R() * 40) | 0)) + "," + (100 + ((R() * 30) | 0)) + ",80," + (0.12 + R() * 0.25) + ")";
x.beginPath();
x.ellipse(R() * W, R() * H, 20 + R() * 90, 10 + R() * 50, R() * 3, 0, 7);
x.fill();
}
for (var s = 0; s < 40; s++) {
x.fillStyle = "rgba(20,16,12," + (0.08 + R() * 0.2) + ")";
x.fillRect(R() * W, R() * H * 0.3, 1 + R() * 4, H * 0.2 + R() * H * 0.6);
}
x.fillStyle = "rgba(60,70,40,.35)";
x.fillRect(0, H - 26, W, 26);
x.fillStyle = "rgba(20,16,12,.5)";
x.fillRect(0, H / 2 - 4, W, 8);
});
},
function () {
return wcMat("jkblister", 128, 256, function (x, W, H) {
var R = wRand(77);
x.fillStyle = "#3A2E22";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 160; i++) {
x.fillStyle = "rgba(" + (90 + ((R() * 70) | 0)) + "," + (70 + ((R() * 50) | 0)) + ",48," + (0.2 + R() * 0.5) + ")";
x.beginPath();
x.arc(R() * W, R() * H, 1 + R() * 5, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(20,14,8,.7)";
x.lineWidth = 3;
[[12, 16, 46, 104], [70, 16, 46, 104], [12, 140, 46, 104], [70, 140, 46, 104]].forEach(function (p) { x.strokeRect(p[0], p[1], p[2], p[3]); });
x.strokeStyle = "rgba(200,180,140,.45)";
x.lineWidth = 1;
for (var k = 0; k < 14; k++) {
var kx = R() * W, ky = R() * H;
x.beginPath();
x.moveTo(kx, ky);
x.lineTo(kx + R() * 14 - 7, ky + R() * 6);
x.stroke();
}
x.strokeStyle = "rgba(10,8,6,.55)";
x.lineWidth = 2;
for (var m = 0; m < 22; m++) {
var mx = 8 + R() * (W - 16), my = 110 + R() * 120;
x.beginPath();
x.moveTo(mx, my);
x.lineTo(mx + R() * 10 - 5, my + 12 + R() * 10);
x.stroke();
}
x.fillStyle = "#141210";
x.fillRect(W - 30, 128, 10, 16);
});
},
function (P) {
var setts = dlnS("setts", 0x6A645A), flags = dlnS("flags", 0x8A847A), kerb = dlnS("stone", 0x9A948A);
Object.keys(JKL_ST).forEach(function (k, ki) {
var S = JKL_ST[k], yo = ki * 0.0007, w = S.f1 - S.f0, L = S.a1 - S.a0, c = (S.a0 + S.a1) / 2, fm = (S.f0 + S.f1) / 2, X = S.ax === "x" ? c : fm, Z = S.ax === "x" ? fm : c, pw = w > 9 ? 2.4 : w > 7 ? 1.4 : 0;
var cx = jkX(X), cz = jkZ(Z), sx = S.ax === "x" ? L : w, sz = S.ax === "x" ? w : L;
dlnPlane(P, sx + 0.6, sz + 0.6, k === "stair" ? dlnS("stone", 0x7A766C) : flags, cx, yo, cz);
if (pw && k !== "stair") {
var rw = w - pw * 2;
dlnPlane(P, S.ax === "x" ? L : rw, S.ax === "x" ? rw : L, setts, cx, 0.012 + yo, cz);
[-1, 1].forEach(function (s) { var off = s * (rw / 2); dlnBox(P, S.ax === "x" ? L : 0.25, 0.14, S.ax === "x" ? 0.25 : L, kerb, S.ax === "x" ? cx : cx + off, 0.07, S.ax === "x" ? cz + off : cz); });
}
shkFloor(cx, cz, sx / 2 + 0.3, sz / 2 + 0.3, 0);
});
var G = JKL_GARDEN, gx = (G.x0 + G.x1) / 2, gz = (G.z0 + G.z1) / 2, gw = G.x1 - G.x0, gd = G.z1 - G.z0;
dlnPlane(P, gw, gd, dlnS("lawn", 0xC8D8B0), jkX(gx), 0.03, jkZ(gz));
dlnPlane(P, gw - 6, 2.4, dlnS("gravel", 0xB8B0A0), jkX(gx), 0.045, jkZ(gz));
dlnPlane(P, 2.4, gd - 6, dlnS("gravel", 0xB8B0A0), jkX(gx), 0.046, jkZ(gz));
var ry = function (x0, z0, x1, z1) { dlnRail(P, jkX(x0), jkZ(z0), jkX(x1), jkZ(z1), 1.3); };
ry(G.x0 + 0.5, G.z0 + 0.5, gx - 1.6, G.z0 + 0.5);
ry(gx + 1.6, G.z0 + 0.5, G.x1 - 0.5, G.z0 + 0.5);
ry(G.x0 + 0.5, G.z1 - 0.5, gx - 1.6, G.z1 - 0.5);
ry(gx + 1.6, G.z1 - 0.5, G.x1 - 0.5, G.z1 - 0.5);
ry(G.x0 + 0.5, G.z0 + 0.5, G.x0 + 0.5, gz - 1.6);
ry(G.x0 + 0.5, gz + 1.6, G.x0 + 0.5, G.z1 - 0.5);
ry(G.x1 - 0.5, G.z0 + 0.5, G.x1 - 0.5, gz - 1.6);
ry(G.x1 - 0.5, gz + 1.6, G.x1 - 0.5, G.z1 - 0.5);
var R = wRand(85), trees = [];
for (var i = 0; i < (JKL.lite ? 6 : 16); i++) {
var u = (i + 0.5) / (JKL.lite ? 6 : 16), sd = i % 4, px, pz;
if (sd === 0) {
px = G.x0 + 5;
pz = G.z0 + 6 + ((u * 4) % 1) * (gd - 12);
}
else if (sd === 1) {
px = G.x1 - 5;
pz = G.z0 + 6 + ((u * 4 + 0.5) % 1) * (gd - 12);
}
else if (sd === 2) {
pz = G.z0 + 5;
px = G.x0 + 8 + ((u * 4 + 0.25) % 1) * (gw - 16);
}
else {
pz = G.z1 - 5;
px = G.x0 + 8 + ((u * 4 + 0.75) % 1) * (gw - 16);
}
trees.push({ x: jkX(px), z: jkZ(pz) });
}
dlnPlanes(P, trees, R);
for (var b = 0; b < (JKL.lite ? 2 : 6); b++)
dlnBench(P, jkX(gx + (b % 2 ? 3.2 : -3.2)), jkZ(G.z0 + 16 + b * 14), b % 2 ? -Math.PI / 2 : Math.PI / 2);
dlnBox(P, 2.2, 0.9, 2.2, dlnS("stone", 0xD8D0C0), jkX(gx), 0.45, jkZ(gz));
var urn = dlnCyl(P, 0.7, 0.4, 1.0, dlnS("stone", 0xD8D0C0), jkX(gx), 1.4, jkZ(gz), 12);
dlnCyl(P, 0.5, 0.7, 0.3, dlnS("stone", 0xD8D0C0), jkX(gx), 2.05, jkZ(gz), 12);
var wm = typeof kgnWaterMat === "function" ? kgnWaterMat() : dlnShine(0x4A5A5E, 0.25, 0.2);
dlnPlane(P, 400, 180, wm, jkX(0), -1.6, jkZ(414 + 90));
dlnBox(P, 400, 6, 4, dlnC(0x1E2022), jkX(0), 1, jkZ(600));
[[-70, -8], [0, 76]].forEach(function (s) { dlnBox(P, s[1] - s[0], 1.2, 0.6, dlnS("stone", 0x8A847A), jkX((s[0] + s[1]) / 2), 0.6, jkZ(404.3)); });
for (var st = 0; st < 7; st++)
dlnBox(P, 8, 0.24, 1.2, dlnS(st > 4 ? "stone" : "stone", st > 4 ? 0x4A5A44 : 0x7A766C), jkX(-4), -0.12 - st * 0.24, jkZ(410 + st * 0.7));
[-8.3, 0.3].forEach(function (xx) { dlnBox(P, 0.6, 2.6, 10, dlnS("stone", 0x8A847A), jkX(xx), -0.1, jkZ(409)); });
},
function (P, key, side, o) {
o = o || {};
var S = JKL_ST[key], g = wcStreetGroup(P, S, { x: jkX(0), z: jkZ(0) }), f = side ? S.f1 : S.f0, dir = side ? -1 : 1, R = wRand(key.length * 313 + side * 7);
var gaps = wcGaps(key, side, JKL_ST).concat(o.skip || []).sort(function (a, b) { return a[0] - b[0]; }), runs = [], a = S.a0;
gaps.forEach(function (G) { var e = Math.min(G[0], S.a1); if (e > a + 2)
runs.push([a, e]); a = Math.max(a, G[1]); });
if (S.a1 > a + 2)
runs.push([a, S.a1]);
var st = o.st || 4, H = st * 3.4, d = 12, stone = dlnS("stone", 0xD8D0C0), slate = dlnS("slate", 0x7A7A84), iron = dlnShine(0x1A1A1E, 0.55, 0.5);
runs.forEach(function (r) {
var len = r[1] - r[0], n = Math.max(1, Math.round(len / (o.hw || 8))), hw = len / n;
for (var i = 0; i < n; i++) {
var u0 = r[0] + i * hw, u1 = u0 + hw, U0 = wcU(S, u0), U1 = wcU(S, u1), lo = Math.min(U0, U1), hi = Math.max(U0, U1), mid = (lo + hi) / 2, v = (R() * 4) | 0, flats = R() < 0.6;
wcFront(g, jkGrandGround(flats ? "flats" : "house", v), lo, hi, 0, 3.4, f, dir, 1);
wcFront(g, jkGrandUp(o.upR ? o.upR[(R() * o.upR.length) | 0] : "yellow", st - 1, (R() * 3) | 0), lo, hi, 3.4, H - 3.4, f, dir, 1);
dlnBox(g, hi - lo, 0.22, 0.3, stone, mid, 3.4, f + dir * 0.1);
dlnBox(g, hi - lo + 0.04, 0.36, 0.6, stone, mid, H + 0.1, f + dir * 0.05);
dlnBox(g, hi - lo, 0.9, 0.26, stone, mid, H + 0.7, f - dir * 0.08);
dlnGable(g, hi - lo, d - 0.8, 2.6, slate, mid, H, f - dir * d / 2);
if (!JKL.lite || i % 2 === 0) {
dlnBox(g, 1.1, 2.4, 2.6, dlnS("stock", 0x8A7A64), lo + 0.6, H + 1.6, f - dir * d * 0.5);
for (var p = 0; p < (JKL.lite ? 2 : 4); p++)
dlnCyl(g, 0.12, 0.14, 0.55, dlnC(0xA85A3A), lo + 0.25 + p * 0.24, H + 3.05, f - dir * d * 0.5, 6);
}
var dU = v % 2 ? hi - 1.6 : lo + 1.6;
dlnBox(g, 1.6, 0.18, 1.0, stone, dU, 0.09, f + dir * 0.6);
dlnBox(g, 1.6, 0.18, 0.6, stone, dU, 0.27, f + dir * 0.3);
if (!JKL.lite) {
dlnBox(g, hi - lo - 0.6, 0.08, 0.7, iron, mid, 4.0, f + dir * 0.35);
for (var bx = lo + 0.5; bx < hi - 0.4; bx += 0.5)
dlnBox(g, 0.03, 0.9, 0.03, iron, bx, 4.45, f + dir * 0.68);
dlnBox(g, hi - lo - 0.6, 0.05, 0.05, iron, mid, 4.9, f + dir * 0.68);
}
}
if (!o.noRail)
dlnRail(g, wcU(S, r[0]) + (S.ax === "x" ? 0.3 : -0.3), f + dir * 1.4, wcU(S, r[1]) - (S.ax === "x" ? 0.3 : -0.3), f + dir * 1.4, 1.1);
[r[0], r[1]].forEach(function (e, k) { var U = wcU(S, e); dlnBox(g, 0.3, H, d, dlnS("stock", 0x6A604E), U + (k ? -1 : 1) * (S.ax === "x" ? 0.15 : -0.15), H / 2, f - dir * d / 2); });
});
return g;
},
function (key, end, o) {
o = o || {};
var S = JKL_ST[key], w = S.f1 - S.f0, c = (S.f0 + S.f1) / 2, a = end ? S.a1 : S.a0, g = new THREE.Group(), P = o.P;
g.position.set(S.ax === "x" ? jkX(a) : jkX(c), 0, S.ax === "x" ? jkZ(c) : jkZ(a));
if (S.ax === "x")
g.rotation.y = end ? -Math.PI / 2 : Math.PI / 2;
else if (end)
g.rotation.y = Math.PI;
P.add(g);
var n = Math.max(1, Math.round(w / 5.4)), H = (o.st || 3) * 3.3;
wcFront(g, (o.grF || wcGround)(o.gr || "house", o.v || 2), -w / 2, w / 2, 0, 3.3, 0, 1, n);
wcFront(g, (o.upF || wcUpper)(o.up || "soot", (o.st || 3) - 1, 1), -w / 2, w / 2, 3.3, H - 3.3, 0, 1, n);
dlnGable(g, w, 8, 2.2, dlnS("slate", 0x8A8A90), 0, H, -4);
},
function (P, R) {
var bright = { grF: function (gr, v) { return gr === "shop" ? jkShopFront(v + (gr.length)) : wcGround(gr, v); }, upR: ["red", "stock", "red"], stR: [3, 3, 4] };
wcRow(P, "by", 0, Object.assign({ ST: JKL_ST, org: { x: jkX(0), z: jkZ(0) }, skip: [[6, 58], [72, 140]], names: JKL_SHOPS.by.slice(), grR: ["shop", "shop", "shop", "house"], seed: 3 }, bright));
wcRow(P, "by", 1, Object.assign({ ST: JKL_ST, org: { x: jkX(0), z: jkZ(0) }, names: JKL_SHOPS.by2.slice(), grR: ["shop", "shop", "house", "shop"], seed: 5 }, bright));
jkGrand(P, "sqw", 0, { skip: [[-86, -62]] });
jkGrand(P, "sqn", 0, {});
jkGrand(P, "sqe", 1, { upR: ["yellow", "red"] });
var org = { x: jkX(0), z: jkZ(0) };
wcRow(P, "gaunt", 0, { ST: JKL_ST, org: org, skip: [[-60, -38], [4, 16]], names: JKL_SHOPS.gaunt.slice(), grR: ["shop", "house", "doss", "shop", "house"], upR: ["soot", "stock", "soot"], stR: [3, 4], seed: 9 });
wcRow(P, "gaunt", 1, { ST: JKL_ST, org: org, skip: [[30, 44]], names: JKL_SHOPS.gaunt2.slice(), grR: ["house", "shop", "doss", "house"], upR: ["soot", "soot", "stock"], stR: [3, 4], seed: 11 });
wcRow(P, "greek", 0, { ST: JKL_ST, org: org, grR: ["house", "doss"], up: "soot", stR: [3, 4], hw: 4.6 });
wcRow(P, "greek", 1, { ST: JKL_ST, org: org, grR: ["doss", "house"], up: "soot", stR: [3, 4], hw: 4.6 });
wcRow(P, "lane", 0, { ST: JKL_ST, org: org, gr: "house", upR: ["stock", "soot"], stR: [2, 3, 3], seed: 13, skip: [[-11, -5]] });
[["by", 0, { grF: bright.grF, gr: "shop", up: "red" }], ["by", 1, { grF: bright.grF, gr: "shop", up: "red" }], ["gaunt", 0, {}], ["gaunt", 1, {}], ["greek", 1, {}], ["lane", 0, { gr: "house", up: "stock", st: 2 }], ["lane", 1, { gr: "ware", up: "ware" }]].forEach(function (E) { E[2].P = P; jkEnd(E[0], E[1], E[2]); });
},
function (P) {
var X = jkX, Z = jkZ, x0 = 14, x1 = 46, cx = (x0 + x1) / 2, w = x1 - x0, h = 7.4, d = 22, g = new THREE.Group();
g.position.set(X(cx), 0, Z(-6));
P.add(g);
var blind = jkBlindWall();
var fr = new THREE.Mesh(new THREE.PlaneGeometry(w, h), blind);
fr.position.set(0, h / 2, 0.6);
g.add(fr);
dlnBox(g, w, h, 0.4, dlnS("stock", 0x4A443A), 0, h / 2, 0.3 - 0.25);
dlnBox(g, 0.4, h, d, dlnS("stock", 0x4A443A), -w / 2, h / 2, -d / 2 + 0.6);
dlnBox(g, 0.4, h, d, dlnS("stock", 0x4A443A), w / 2, h / 2, -d / 2 + 0.6);
var tri = new THREE.Shape();
tri.moveTo(-w / 2, 0);
tri.lineTo(w / 2, 0);
tri.lineTo(0, 5.2);
tri.lineTo(-w / 2, 0);
var gm = new THREE.Mesh(new THREE.ShapeGeometry(tri), dlnS("stock", 0x3A3630));
gm.position.set(0, h, 0.62);
g.add(gm);
var gr = new THREE.Group();
gr.position.set(0, h, -d / 2 + 0.6);
gr.rotation.y = Math.PI / 2;
g.add(gr);
dlnGable(gr, d, w, 5.2, dlnS("slate", 0x5A5A62), 0, 0, 0);
dlnBox(g, w + 0.4, 0.3, 0.5, dlnS("stone", 0x6A645A), 0, h, 0.7);
dlnBox(g, 2.6, 3.2, 0.8, dlnC(0x14120E), cx - 30 + 0, 1.6, 0.3).position.x = JKL_DOOR.x - cx;
var dr = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.6), jkBlisterDoor());
dr.position.set(JKL_DOOR.x - cx, 1.6, 0.72);
g.add(dr);
dlnBox(g, 2.4, 0.18, 0.8, dlnS("stone", 0x6A645A), JKL_DOOR.x - cx, 0.09, 1.0);
dlnBox(g, 2.4, 0.18, 0.5, dlnS("stone", 0x6A645A), JKL_DOOR.x - cx, 0.27, 0.85);
dlnCyl(g, 0.08, 0.08, h, dlnShine(0x2A2A2A, 0.6, 0.4), w / 2 - 0.6, h / 2, 0.75, 6);
dlnBox(g, 1.4, 0.06, 1.0, dlnC(0x2A241E), -8, 0.04, 1.2);
var ce = new THREE.Group();
ce.position.set(X(10), 0, Z(-6));
P.add(ce);
dlnBox(ce, 8, 9.9, 0.3, dlnS("stock", 0x5A5040), 0, 4.95, -0.1);
dlnBox(ce, 2.6, 3.4, 0.32, dlnC(0x0C0B0A), 0, 1.7, 0);
dlnBox(ce, 8, 0.3, 9, dlnS("slate", 0x7A7A84), 0, 9.9, -4.5);
dlnBox(ce, 4, 9.9, 0.3, dlnS("stock", 0x5A5040), 5.6, 4.95, -0.1);
dlnBox(ce, 4, 9.9, 0.3, dlnS("stock", 0x5A5040), -5.6, 4.95, -0.1);
var cs = wcSign("COURT", 1.6, 0.3, "#1A1612", "#C8C0A8");
cs.position.set(X(10), 3.7, Z(-5.7));
P.add(cs);
dlnCyl(P, 0.14, 0.14, 0.36, dlnGlow(0xFFD890), X(10), 3.2, Z(-5.4), 6);
shkDoor("jk_court", X(JKL_DOOR.x), Z(-3.4), "The door with neither bell nor knocker");
shkSpot(X(10), Z(-3.6), 2.2, "The entry of the court", "step into the court", function () { shkGoIn("jk_court"); });
shkSpot(X(JKL_DOOR.x + 5), Z(-3), 2.6, "The sinister block", "look at it", function () { jkTale("🚪 The door", JKL_FACTS.door); });
},
function (P) {
var g = new THREE.Group();
g.position.set(jkX(JKL_HOUSE.x), 0, jkZ(JKL_HOUSE.z));
g.rotation.y = Math.PI / 2;
P.add(g);
var w = 24, st = 4, H = st * 3.6, stone = dlnS("portland", 0xE8E2D4), brick = dlnS("georgian", 0xFFFFFF), iron = dlnShine(0x141416, 0.5, 0.5), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnFace(g, w, H - 3.6, brick, 0, 3.6 + (H - 3.6) / 2, -0.15);
dlnBox(g, w, 3.6, 0.4, stone, 0, 1.8, -0.1);
for (var y = 0.4; y < 3.6; y += 0.45)
dlnBox(g, w, 0.04, 0.44, dlnC(0xC8C0B0), 0, y, -0.1);
dlnBox(g, w + 0.3, 0.3, 0.5, stone, 0, 3.6, 0.05);
dlnBox(g, w + 0.6, 0.5, 0.9, stone, 0, H + 0.1, 0.1);
dlnBox(g, w, 1.0, 0.3, stone, 0, H + 0.8, -0.05);
for (var b = 0; b < (JKL.lite ? 6 : 14); b++)
dlnCyl(g, 0.1, 0.13, 0.7, stone, -w / 2 + 0.8 + b * (w - 1.6) / ((JKL.lite ? 6 : 14) - 1), H + 0.7, 0.1, 6);
var back = dlnBox(g, w, H, 0.3, dlnS("stock", 0x8A7A64), 0, H / 2, -14);
[-1, 1].forEach(function (k) { dlnBox(g, 0.3, H, 14, dlnS("stock", 0x8A7A64), k * w / 2, H / 2, -7); });
dlnMansard(g, w, 13.4, 3.4, dlnS("slate", 0x6A6A74), 0, H + 0.3, -7);
[-1.3, 1.3].forEach(function (k) { dlnCyl(g, 0.24, 0.28, 3.6, stone, k, 1.8 + 0.36, 1.2, 14); dlnBox(g, 0.62, 0.2, 0.62, stone, k, 0.46, 1.2); });
dlnBox(g, 3.4, 0.5, 1.6, stone, 0, 4.2, 0.7);
dlnBox(g, 3.6, 0.12, 1.7, stone, 0, 4.5, 0.7);
dlnBox(g, 1.5, 2.7, 0.12, dlnShine(0x0E0E10, 0.3, 0.3), 0, 1.71, 0.08);
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.75, 16, 0, Math.PI), dlnGlow(0xF0D090));
fan.position.set(0, 3.1, 0.1);
g.add(fan);
dlnCyl(g, 0.12, 0.12, 0.03, brass, 0, 1.9, 0.16, 12).rotation.x = Math.PI / 2;
dlnBox(g, 0.36, 0.08, 0.03, brass, 0, 1.2, 0.16);
for (var s = 0; s < 3; s++)
dlnBox(g, 3.0, 0.18, 0.5 + s * 0.0, stone, 0, 0.09 + s * 0.18, 1.9 - s * 0.4);
dlnBox(g, 0.06, 1.2, 0.06, iron, 0, 4.9, 1.4);
dlnCyl(g, 0.22, 0.16, 0.5, dlnGlow(0xFFE6B0), 0, 4.4, 1.4, 6);
dlnRail(g, -w / 2 + 0.3, 2.2, -1.8, 2.2, 1.1);
dlnRail(g, 1.8, 2.2, w / 2 - 0.3, 2.2, 1.1);
var lit = dlnGlow(0xF0C880), dark = dlnC(0x1A1C22);
for (var f2 = 0; f2 < 3; f2++)
for (var c = 0; c < 5; c++) {
if (f2 === 0 && c === 2)
continue;
var wx = -w / 2 + 2.4 + c * (w - 4.8) / 4, wy = f2 === 0 ? 1.9 : 4.6 + f2 * 3.6 - 3.6, wh = f2 === 1 ? 2.6 : f2 === 2 ? 2.0 : 2.0;
dlnBox(g, 1.3, wh + 0.3, 0.08, stone, wx, wy, 0.04);
dlnBox(g, 1.1, wh, 0.06, (c + f2) % 3 === 1 ? lit : dark, wx, wy, 0.08);
}
dlnBox(g, w - 1, 0.08, 0.8, iron, 0, 4.0, 0.4);
for (var bb = -w / 2 + 0.8; bb < w / 2 - 0.6; bb += 0.4)
dlnBox(g, 0.03, 0.9, 0.03, iron, bb, 4.45, 0.78);
shkDoor("jk_hall", jkX(JKL_HOUSE.x + 2.6), jkZ(JKL_HOUSE.z), "Dr Jekyll's house");
shkSpot(jkX(JKL_HOUSE.x + 4.2), jkZ(JKL_HOUSE.z + 3.4), 2.4, "Dr Jekyll's house", "look at it", function () { jkTale("🏛️ Dr Jekyll's house", JKL_FACTS.square); });
},
function (P) {
var X = jkX, Z = jkZ, brass = dlnShine(0xC8A048, 0.3, 0.9);
var gp = new THREE.Group();
gp.position.set(X(-49), 0, Z(194));
P.add(gp);
wcFront(gp, new THREE.MeshLambertMaterial({ map: wcGround("pub", 3).map }), -11, 11, 0, 4.0, 0, 1, 3);
wcFront(gp, wcUpper("stock", 3, 2), -11, 11, 4.0, 10, 0, 1, 3);
dlnBox(gp, 22.4, 0.4, 0.6, dlnS("stone", 0xD8D0C0), 0, 14.1, 0);
dlnGable(gp, 22, 10, 2.4, dlnS("slate", 0x7A7A84), 0, 14, -5);
var gs = wcSign("THE CROWN & ANCHOR · GIN · RUM · OLD TOM", 20, 0.9, "#2A140E", "#F0D070");
gs.position.set(0, 4.6, 0.3);
gp.add(gs);
for (var l = 0; l < 3; l++) {
dlnBox(gp, 0.06, 0.9, 0.06, brass, -8 + l * 8, 4.4, 0.6);
dlnCyl(gp, 0.32, 0.22, 0.7, dlnGlow(0xFFE6A0), -8 + l * 8, 3.7, 0.9, 8);
}
shkDoor("jk_gin", X(-49), Z(196.6), "The gin palace");
var fe = wcSign("RESTAURANT FRANÇAIS · SOUPE 2d", 9, 0.6, "#1E2A3A", "#F0E8D0");
fe.position.set(X(37), 3.1, Z(205.6));
fe.rotation.y = Math.PI;
P.add(fe);
var mn = dlnPanel(["Soupe aux choux 2d", "Bouilli 4d", "Pain, fromage 2d", "Vin rouge 3d"], "AUJOURD'HUI", 0.8, 1.0, "#1A1A1A", "#E8E8E0");
mn.position.set(X(33), 1.3, Z(205.6));
mn.rotation.y = Math.PI;
P.add(mn);
shkSpot(X(37), Z(203.4), 2.4, "The French eating-house", "look in", function () { jkTale("🍲 A low French eating-house", ["Steam on the glass, a long table and benches, a tureen of cabbage soup, bread, a carafe of thin red wine at threepence; the keeper in his apron, and men of three or four nations eating without a word.", "Soho has been the French quarter of London since the Huguenots came two hundred years ago; its eating-houses feed the poor of every nation for a few pence."]); });
shkSpot(X(-20), Z(196.8), 2.4, "The shop of penny numbers", "look in the window", function () { jkTale("📚 Penny numbers and twopenny salads", ["Penny numbers: stories printed in weekly parts, eight pages for a penny, highwaymen and haunted abbeys and murders in the fog; and, on the same counter, twopenny salads of cress and lettuce for the lodgers.", "Stevenson set this shop in Hyde's street on purpose: cheap thrills and cheap food side by side, in a street of the poor."]); });
var hd = new THREE.Group();
hd.position.set(X(JKL_HYDE.x), 0, Z(194));
P.add(hd);
wcFront(hd, wcGround("house", 1), -6, 6, 0, 3.3, 0, 1, 2);
wcFront(hd, wcUpper("stock", 3, 1), -6, 6, 3.3, 9.9, 0, 1, 2);
dlnGable(hd, 12, 9, 2.2, dlnS("slate", 0x8A8A90), 0, 13.2, -4.5);
dlnBox(hd, 12.2, 0.25, 0.4, dlnS("stone", 0xA8A090), 0, 13.3, 0);
dlnBox(hd, 1.2, 2.5, 0.1, dlnShine(0x2A1A10, 0.4, 0.2), 0, 1.45, 0.1);
dlnBox(hd, 1.6, 0.2, 0.8, dlnS("stone", 0x8A847A), 0, 0.1, 0.5);
dlnCyl(hd, 0.06, 0.06, 0.02, brass, 0.3, 1.4, 0.16, 10).rotation.x = Math.PI / 2;
var nm = wcSign("No. 12", 0.6, 0.22, "#141210", "#C8B888");
nm.position.set(0, 2.9, 0.16);
hd.add(nm);
shkDoor("jk_soho", X(JKL_HYDE.x), Z(196.6), "Mr Hyde's house, Soho");
shkSpot(X(-30), Z(200), 3, "Soho", "look about", function () { jkTale("🌫️ Soho", JKL_FACTS.soho); });
},
function (P) {
var X = jkX, Z = jkZ, mh = new THREE.Group();
mh.position.set(X(JKL_MAID.x), 0, Z(394));
P.add(mh);
wcFront(mh, wcGround("house", 3), -3, 3, 0, 3.3, 0, 1, 1);
wcFront(mh, wcUpper("stock", 2, 2), -3, 3, 3.3, 6.6, 0, 1, 1);
dlnGable(mh, 6, 9, 2.2, dlnS("slate", 0x8A8A90), 0, 9.9, -4.5);
var win = dlnBox(mh, 1.1, 1.5, 0.08, dlnGlow(0xF0D090), -1.2, 5.0, 0.12);
dlnBox(mh, 1.4, 0.24, 0.4, dlnS("oak", 0x6A4A2A), -1.2, 4.1, 0.3);
for (var f = 0; f < 4; f++) {
var gg = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), dlnC(f % 2 ? 0xC8242A : 0x3A6A2A));
gg.position.set(-1.6 + f * 0.26, 4.3, 0.3);
mh.add(gg);
}
shkDoor("jk_maid", X(JKL_MAID.x + 1.2), Z(396.6), "The maid's house over the lane");
shkSpot(X(JKL_MAID.x - 1.2), Z(397.4), 2.4, "The window over the lane", "look up", function () { jkTale("🪟 The window over the lane", JKL_FACTS.lane); });
shkSpot(X(-4), Z(403), 2.4, "The river stairs", "look down at the river", function () { jkTale("🌊 The river stairs", ["Worn stone steps down to the Thames between two walls, green and slimy at the bottom where the tide comes and goes twice a day. Lightermen tie up here; at night the river is black, with the lamps of the far bank lying on it in long gold streaks."]); });
},
function (P, R) {
var X = jkX, Z = jkZ, step = JKL.lite ? 44 : 26;
Object.keys(JKL_ST).forEach(function (k) {
var S = JKL_ST[k];
if (k === "stair")
return;
var w = S.f1 - S.f0;
for (var a = S.a0 + step * 0.5; a < S.a1 - 3; a += step) {
var side = ((a / step) | 0) % 2 ? S.f0 + 0.7 : S.f1 - 0.7;
if (k === "sqw")
side = S.f1 - 0.7;
if (k === "sqe")
side = S.f0 + 0.7;
if (k === "sqn")
side = S.f1 - 0.7;
if (k === "lane")
side = S.f1 - 0.7;
if (S.ax === "x")
dlnLamp(P, X(a), Z(side));
else
dlnLamp(P, X(side), Z(a));
}
});
shkSpot(X(-58), Z(-2), 3, "The by-street", "look about", function () { jkTale("🏪 The by-street", JKL_FACTS.street); });
dlnPillarBox(P, X(-30), Z(5.2));
dlnPillarBox(P, X(66.6), Z(-40));
dlnPillarBox(P, X(-60), Z(205.2));
Object.keys(JKL_PIECES).forEach(function (k) {
var C = JKL_PIECES[k].cab, ax = k === "sq" ? "z" : "x";
if (ax === "z") {
dlnBox(P, 0.4, 1.0, 6, dlnC(0x2A2A2A), X(C.x + 1.6), 0.5, Z(C.z));
shkSolidBox(X(C.x + 1.6), Z(C.z), 0.6, 6, 0);
}
else {
dlnBox(P, 6, 1.0, 0.4, dlnC(0x2A2A2A), X(C.x), 0.5, Z(C.z + 3.4));
shkSolidBox(X(C.x), Z(C.z + 3.4), 6, 0.6, 0);
}
shkSpot(X(C.x), Z(C.z), 3.4, "The cab rank", "take a cab", function () { jkCabCard(); });
});
if (!JKL.lite) {
var sh = new THREE.Group();
sh.position.set(X(146), 0, Z(-30));
P.add(sh);
var gr = dlnShine(0x1E3A2A, 0.6, 0.1);
dlnBox(sh, 2.4, 2.4, 5, gr, 0, 1.2, 0);
dlnGable(sh, 5, 2.6, 0.8, dlnS("slate", 0x5A5A62), 0, 2.4, 0, Math.PI / 2);
for (var w = 0; w < 3; w++)
dlnBox(sh, 0.06, 0.5, 0.8, dlnGlow(0xE8C890), -1.22, 1.6, -1.4 + w * 1.4);
dlnCyl(sh, 0.08, 0.08, 1.2, dlnC(0x1A1A1A), 0.6, 3.4, 1.6, 6);
shkSolidBox(X(146), Z(-30), 2.6, 5.2, 0);
}
dlnPlane(P, 2.0, 12, dlnC(0x8A847A), X(66), 0.02, Z(0));
var wood = dlnS("oak", 0x7A5A3A), goods = [0xC8A040, 0xB83A2A, 0x8AA060, 0xD8D0C8];
[[-70, 199], [-10, 203], [60, 203.6]].forEach(function (p, i) {
if (JKL.lite && i)
return;
var b = new THREE.Group();
b.position.set(X(p[0]), 0, Z(p[1]));
b.rotation.y = Math.PI / 2;
P.add(b);
dlnBox(b, 1.2, 0.12, 2.0, wood, 0, 0.85, 0);
for (var j = 0; j < 6; j++) {
var h = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 0), dlnC(goods[(i + j) % 4]));
h.position.set(-0.4 + (j % 3) * 0.4, 1.0, -0.6 + ((j / 3) | 0) * 0.6);
b.add(h);
}
shkSolidBox(X(p[0]), Z(p[1]), 2.4, 1.6, 0);
});
},
function () {
var live = JKL.live;
Object.keys(JKL_PIECES).forEach(function (k, i) { var C = JKL_PIECES[k].cab; for (var r = 0; r < (JKL.lite ? 1 : 2); r++) {
if (k === "sq")
dlnHansom(live, jkX(C.x + 4.2), jkZ(C.z - 4 - r * 7), Math.PI);
else
dlnHansom(live, jkX(C.x - 4 - r * 7), jkZ(C.z + 1.6), -Math.PI / 2);
} });
var loops = [[[-140, 2.6], [150, 2.6], [150, -2.6], [146, -2.6], [146, -120], [66, -120], [66, -2.6], [-140, -2.6], [-140, 2.6]], [[-85, 201.6], [90, 201.6], [90, 198.4], [-85, 198.4], [-85, 201.6]], [[-66, 400.6], [70, 400.6], [70, 397.6], [-66, 397.6], [-66, 400.6]]];
JKL.loops = loops.map(function (L) { var d = 0; for (var i = 1; i < L.length; i++)
d += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); return { p: L, len: d }; });
var mk = function (li, n, kind) { for (var c = 0; c < n; c++) {
var g = new THREE.Group();
live.add(g);
if (kind === "cart")
wcCart(g);
else
dlnHansom(g, 0, 0, 0);
JKL.move.push({ g: g, l: li, s: c * JKL.loops[li].len / n, sp: 3 + c % 2, flip: kind === "cab" });
} };
mk(0, JKL.lite ? 2 : 4, "cab");
mk(0, JKL.lite ? 0 : 1, "cart");
mk(1, JKL.lite ? 1 : 2, "cart");
mk(1, 1, "cab");
mk(2, 1, "cart");
},
function (k, x, z, ry, o) {
var F = JKL_FOLK[k], p = jkPerson("jk_" + k, F.dress, { sex: F.sex, child: F.child });
p.position.set(jkX(x), 0.02, jkZ(z));
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "jk_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet || "Good day to you." } });
return P;
},
function (R) {
var X = jkX, Z = jkZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (JKL.lite)
n = Math.ceil(n * 0.35);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = jkPerson("jkf" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.3 + R() * 0.4 }, ground: 0.02 });
}
};
var smart = ["gent", "lady", "jklady", "jkguest", "gent", "jkfoot", "jkmaid", "jkshop", "lady", "clergy"], poor = ["wcwoman", "wcman", "wcwoman", "wcman", "wcporter", "wccoster", "wcmatch", "newsboy", "jksweep", "wcwork"];
crowd(18, -140, 150, -4.6, 4.6, smart, { r: 22 });
crowd(6, 62, 70, -120, -10, smart, { r: 14 });
crowd(5, 74, 150, -124, -116, smart, { r: 14 });
crowd(5, 142, 150, -120, -10, smart, { r: 14 });
crowd(16, -85, 90, 195.5, 204.5, poor.concat(["jkshop", "wcjew"]), { r: 18 });
crowd(5, -29, -21, 208, 248, poor, { r: 8 });
crowd(5, -60, 70, 395.5, 402.5, ["wcman", "bsseaman", "wcporter", "wcwoman"], { r: 14 });
for (var u = 0; u < (JKL.lite ? 2 : 6); u++) {
var b = jkPerson("jk_kid" + u, u % 2 ? "wcgirl" : "newsboy", { child: true });
b.position.set(X(-70 + u * 26), 0.02, Z(u % 2 ? 195.0 : 205.0));
b.rotation.y = u % 2 ? 0 : Math.PI;
SHK.live.add(b);
SHK.people.push({ g: b, ground: 0.02 });
}
jkNamed("shop", -40, 4.4, Math.PI);
jkNamed("sweep", 66, 1.0, -Math.PI / 2, { wander: 4 });
jkNamed("lamp", -100, -4.4, 0, { wander: 40 });
jkNamed("pc", 100, -3, Math.PI / 2, { wander: 60 });
jkNamed("gin", -46, 196.2, 0);
jkNamed("french", 37, 204.2, Math.PI);
},
function () {
if (JKL.built || !SHK.G)
return;
DLN.lite = JKL.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1886), live0 = SHK.live;
JKL.live = new THREE.Group();
JKL.live.name = "jk-live";
SHK.G.add(JKL.live);
JKL.move = [];
var pieces = [["jk-sq", [jkHouses, jkBlock, jkHouseFront], 0, -60, 240], ["jk-ground", [jkGroundAll], 0, 140, 520], ["jk-soho", [jkSoho], 0, 200, 200], ["jk-lane", [jkLane], 0, 400, 180], ["jk-things", [jkStreetThings], 0, 140, 520]];
pieces.forEach(function (pc) {
var all = new THREE.Group();
SHK.G.add(all);
pc[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[jekyll] " + (f.name || "?"), e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = pc[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
JKL.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[jekyll] bake", e);
}
SHK.dist.push({ n: pc[0], g: g, x: jkX(pc[2]), z: jkZ(pc[3]), r: pc[4] });
});
try {
jkTraffic();
}
catch (e) {
if (window.console)
console.warn("[jekyll] traffic", e);
}
try {
jkFolk(R);
}
catch (e) {
if (window.console)
console.warn("[jekyll] folk", e);
}
SHK.live = live0;
JKL.built = true;
},
function (seed, who, x, y, z, ry, o) {
o = o || {};
var p = jkPerson(seed, who, { sex: o.sex, inside: true, child: o.child });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.35 } : null };
SHK.people.push(P);
var T = null;
if (o.name) {
T = { p: P, name: o.name, r: o.r || 2.8, t: { name: o.name, persona: o.persona || JKL_ERA, greet: o.greet || "Good evening, sir." } };
SHK.talk.push(T);
}
JKL.home.push({ P: P, T: T, on: true, room: o.room });
return P;
},
function (g, x, z, ry, cov) {
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry || 0;
g.add(b);
var mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnBox(b, 1.5, 0.4, 2.1, mah, 0, 0.35, 0);
dlnBox(b, 1.4, 0.22, 2.0, dlnC(0xF4F0E8), 0, 0.66, 0);
dlnBox(b, 1.42, 0.08, 1.4, dlnC(cov || 0x6A1A22), 0, 0.8, 0.3);
dlnBox(b, 1.2, 0.18, 0.4, dlnC(0xFAF8F2), 0, 0.84, -0.75);
dlnBox(b, 1.6, 1.4, 0.1, mah, 0, 0.9, -1.05);
dlnBox(b, 1.6, 0.8, 0.1, mah, 0, 0.6, 1.05);
shkSolidBox(x, z, ry ? 2.2 : 1.6, ry ? 1.6 : 2.2, 0);
return b;
},
function (g, x, z, ry, w) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
w = w || 1.8;
var mah = dlnShine(0x3A1E10, 0.35, 0.15), glass = dlnShine(0xC8D8E0, 0.05, 0.6);
dlnBox(c, w, 1.0, 0.6, mah, 0, 0.5, 0);
dlnBox(c, w, 1.4, 0.42, mah, 0, 1.7, -0.08);
dlnBox(c, w - 0.2, 1.2, 0.04, glass, 0, 1.7, 0.14);
dlnBox(c, w + 0.1, 0.1, 0.66, mah, 0, 2.45, -0.02);
for (var s = 0; s < 3; s++) {
dlnBox(c, w - 0.2, 0.03, 0.36, mah, 0, 1.25 + s * 0.4, -0.08);
for (var j = 0; j < 6; j++)
dlnCyl(c, 0.04, 0.05, 0.2, dlnShine([0xC8D8D0, 0x6A3A1A, 0x3A6A3A, 0xE8E0C8][(s + j) % 4], 0.1, 0.5), -w / 2 + 0.25 + j * (w - 0.5) / 5, 1.38 + s * 0.4, -0.08, 8);
}
for (var d = 0; d < 4; d++) {
dlnBox(c, w - 0.2, 0.2, 0.04, mah, 0, 0.15 + d * 0.24, 0.31);
dlnBox(c, 0.12, 0.03, 0.03, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.17 + d * 0.24, 0.34);
}
shkSolidBox(x, z, ry ? 0.7 : w, ry ? w : 0.7, 0);
return c;
},
function (g, x, z, ry) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
var mah = dlnShine(0x3A1E10, 0.35, 0.15);
[-0.5, 0.5].forEach(function (k) { dlnBox(c, 0.08, 1.9, 0.08, mah, k, 0.95, 0); dlnBox(c, 0.08, 0.06, 0.6, mah, k, 0.05, 0); });
var fr = new THREE.Group();
fr.position.y = 1.1;
fr.rotation.x = -0.08;
c.add(fr);
dlnBox(fr, 0.9, 1.6, 0.06, mah, 0, 0, 0);
dlnBox(fr, 0.8, 1.5, 0.02, new THREE.MeshStandardMaterial({ color: 0xD8E0E8, roughness: 0.05, metalness: 0.95 }), 0, 0, 0.04);
shkSolid({ x: x, z: z, r: 0.5 });
return c;
},
function (g, x, z, ry) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
var deal = dlnS("oak", 0x9A8460), glass = dlnShine(0xD8E8E0, 0.05, 0.5), cu = dlnShine(0xB8743A, 0.35, 0.8);
dlnBox(c, 2.4, 0.08, 1.0, deal, 0, 0.9, 0);
[[-1.1, -0.4], [1.1, -0.4], [-1.1, 0.4], [1.1, 0.4]].forEach(function (p) { dlnBox(c, 0.08, 0.9, 0.08, deal, p[0], 0.45, p[1]); });
var f = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), glass);
f.position.set(-0.6, 1.15, 0);
c.add(f);
dlnCyl(c, 0.03, 0.05, 0.4, glass, -0.6, 1.45, 0, 8);
var r = dlnCyl(c, 0.02, 0.02, 0.8, glass, -0.2, 1.6, 0, 6);
r.rotation.z = 1.1;
dlnCyl(c, 0.16, 0.18, 0.36, cu, 0.6, 1.12, 0.1, 12);
dlnCyl(c, 0.08, 0.1, 0.1, dlnGlow(0x6A8AFF), -0.6, 0.98, 0, 10);
for (var j = 0; j < 5; j++)
dlnCyl(c, 0.035, 0.035, 0.18, dlnShine([0xC83A3A, 0xE8E0C0, 0x3A8A4A, 0x5A4AA8, 0xE8C040][j], 0.1, 0.5), 0.1 + j * 0.16, 1.03, -0.3, 8);
shkSolidBox(x, z, ry ? 1.1 : 2.5, ry ? 2.5 : 1.1, 0);
return c;
},
function (g, x, z, ry, mat) {
var d = new THREE.Group();
d.position.set(x, 0, z);
d.rotation.y = ry || 0;
g.add(d);
mat = mat || dlnShine(0x4A2414, 0.4, 0.2);
dlnBox(d, 1.8, 0.06, 0.9, mat, 0, 0.76, 0);
dlnBox(d, 0.5, 0.73, 0.85, mat, -0.62, 0.37, 0);
dlnBox(d, 0.5, 0.73, 0.85, mat, 0.62, 0.37, 0);
dlnBox(d, 1.6, 0.02, 0.7, dlnC(0x2A4A2A), 0, 0.8, 0);
dlnCyl(d, 0.05, 0.06, 0.08, dlnC(0x141414), 0.5, 0.84, -0.2, 8);
dlnBox(d, 0.3, 0.02, 0.4, dlnC(0xF4F0E4), -0.2, 0.82, 0.05);
shkSolidBox(x, z, ry ? 1 : 1.9, ry ? 1.9 : 1, 0);
return d;
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.6, oak = dlnShine(0x4A2A16, 0.4, 0.15);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xC8C0B0), wall: dlnS("damask", 0x8A6A4A), low: dlnS("linenfold", 0x5A3A22), lowH: 1.6, h: h, ceil: dlnC(0xE8DCC0), outName: "Out to the square", out: jkOut("house") });
dlnBox(g, 3.2, 2.2, 0.7, dlnS("stone", 0xD8D0C0), cx, 1.1, cz - Rm.hd + 0.35);
dlnBox(g, 1.8, 1.1, 0.3, dlnC(0x141210), cx, 0.55, cz - Rm.hd + 0.6);
dlnBox(g, 1.4, 0.5, 0.3, dlnGlow(0xF08A3A), cx, 0.35, cz - Rm.hd + 0.7);
dlnBox(g, 3.6, 0.2, 0.9, dlnS("stone", 0xD8D0C0), cx, 2.25, cz - Rm.hd + 0.45);
shkSolidBox(cx, cz - Rm.hd + 0.6, 3.4, 1.4, 0);
[-1, 1].forEach(function (k) { n14Ward(g, cx + k * (Rm.hw - 0.45), cz - 1.5, k < 0 ? Math.PI / 2 : -Math.PI / 2, oak, 1.8, 2.3); });
n14Ward(g, cx - Rm.hw + 0.45, cz + 2.2, Math.PI / 2, oak, 1.4, 2.0);
dlnPlane(g, 4.4, 3.4, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz - 2.6);
n14Arm(g, cx - 1.6, cz - 3.6, 0.5, 0x6A1A1A);
n14Arm(g, cx + 1.6, cz - 3.6, -0.5, 0x6A1A1A);
for (var s = 0; s < 10; s++)
dlnBox(g, 1.4, 0.2, 0.32, oak, cx + Rm.hw - 1.4, 0.1 + s * 0.22, cz + Rm.hd - 1.6 - s * 0.3);
dlnBox(g, 0.08, 1.0, 3.2, oak, cx + Rm.hw - 2.1, 1.8, cz + Rm.hd - 3.0);
dlnPortrait(g, cx - 2.2, 2.9, cz - Rm.hd + 0.06, 0, "A celebrated surgeon", "the house's last owner", "#2A1E14");
n14Pic(g, cx + 2.2, 2.9, cz - Rm.hd + 0.06, 0, 1.2, 1.4, ["#7A8A6A", "#3A4A2A", "#C8A060"]);
n14Gasolier(g, cx, h, cz);
jkGasLamp(g, cx - Rm.hw + 0.2, 2.2, cz + 0.6);
shkSpot(cx, cz - Rm.hd + 1.8, 2.2, "The hall fire", "warm your hands", function () { jkTale("🔥 The hall of Dr Jekyll's house", JKL_FACTS.hall); });
jkLinks("jk_hall", cx, cz, Rm, { jk_dining: { x: -Rm.hw + 1.2, z: 0.6 }, jk_bed: { x: Rm.hw - 1.4, z: Rm.hd - 5.4 }, jk_court: { x: -Rm.hw + 1.2, z: Rm.hd - 2.6 } });
jkHome("jk_poole0", "jkpoole", cx + 1.2, 0.02, cz + 1.6, Math.PI, { name: "Poole", persona: JK_POOLE, greet: "Good evening, sir. Will you wait here by the fire?", room: "jk_hall" });
jkHome("jk_foot0", "jkfoot", cx - 2.4, 0.02, cz + 3.4, Math.PI / 2, { room: "jk_hall" });
Rm.hello = "<b>Dr Jekyll's hall.</b> A large, low-roofed, comfortable hall, paved with flags, warmed by a bright open fire and furnished with costly cabinets of oak.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.4, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("pmpaper", 0x8A2A2A), low: dlnS("oak", 0x4A2A16), lowH: 1.0, h: h, ceil: dlnC(0xE8DCC0), outName: "Back to the hall", out: jkRm("jk_hall") });
dlnPlane(g, 6, 7, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz - 0.5);
n14Table(g, cx, cz - 0.6, 1.4, 4.0, 0.76, mah, dlnC(0xFAF8F2));
for (var i = 0; i < 6; i++) {
var side = i % 2 ? 1 : -1, zz = cz - 2.0 + ((i / 2) | 0) * 1.4;
n14Chair(g, cx + side * 1.0, zz, side > 0 ? -Math.PI / 2 : Math.PI / 2, mah, dlnC(0x6A1A1A));
dlnCyl(g, 0.13, 0.13, 0.02, dlnC(0xFFFFFF), cx + side * 0.45, 0.8, zz, 14);
dlnCyl(g, 0.03, 0.02, 0.14, dlnShine(0xE8E8F0, 0.05, 0.6), cx + side * 0.45, 0.88, zz - 0.24, 8);
}
[-0.8, 0.8].forEach(function (k) { dlnCyl(g, 0.05, 0.07, 0.34, dlnShine(0xC8C8D0, 0.2, 0.9), cx, 0.96, cz - 0.6 + k, 8); var fl = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), dlnGlow(0xFFE0A0)); fl.position.set(cx, 1.16, cz - 0.6 + k); g.add(fl); });
dlnBox(g, 2.6, 0.95, 0.6, mah, cx, 0.48, cz - Rm.hd + 0.4);
for (var d = 0; d < 3; d++)
dlnCyl(g, 0.07, 0.09, 0.3, dlnShine([0x6A1A1A, 0xC89A3A, 0x2A4A2A][d], 0.1, 0.5), cx - 0.6 + d * 0.6, 1.12, cz - Rm.hd + 0.4, 10);
dlnFireplace(g, cx - Rm.hw + 0.4, cz - 1, Math.PI / 2);
dlnPortrait(g, cx, 2.8, cz - Rm.hd + 0.06, 0, "Dr H. J.", "as a young man", "#1E1E22");
n14Gasolier(g, cx, h, cz - 0.6);
shkSpot(cx, cz - Rm.hd + 1.4, 1.8, "The sideboard", "look at the wine", function () { jkTale("🍷 The sideboard", ["Decanters of port and old Madeira, a claret jug, the silver; Dr Jekyll gives one of his pleasant dinners to five or six old cronies, all intelligent, reputable men and all judges of good wine."]); });
shkSpot(cx + 1.4, cz + 0.6, 1.8, "The dinner table", "sit down", function () { jkTale("🍽️ The table", ["Soup, a turbot, a saddle of mutton, a pudding, the wine going round; the talk of men who have known each other for thirty years. When the others go, Mr Utterson stays behind, as the quiet man so often does."]); });
Rm.hello = "<b>The dining-room.</b> Red paper, a long table laid with white linen and silver for six, candles lit, a fire, the decanters on the sideboard.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.0, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: dlnS("bspaper", 0x8A9A8A), h: h, ceil: dlnC(0xF0E8D8), outName: "Down to the hall", out: jkRm("jk_hall") });
jkBed(g, cx - 1.2, cz - Rm.hd + 1.4, 0, 0x2A3A5A);
n14Ward(g, cx + Rm.hw - 0.45, cz - 1.6, -Math.PI / 2, mah, 1.6, 2.3);
dlnFireplace(g, cx - Rm.hw + 0.4, cz + 0.8, Math.PI / 2);
dlnBox(g, 1.0, 0.8, 0.5, mah, cx + 2.4, 0.4, cz - Rm.hd + 0.4);
dlnCyl(g, 0.22, 0.16, 0.14, dlnC(0xF4F0E8), cx + 2.4, 0.88, cz - Rm.hd + 0.4, 14);
jkCheval(g, cx + Rm.hw - 0.8, cz + 2.2, -Math.PI / 2);
dlnPlane(g, 3, 2.4, dlnS("n14turkey", 0xFFFFFF), cx - 0.4, 0.012, cz + 0.6);
jkGasLamp(g, cx - Rm.hw + 0.2, 2.0, cz - 1.4);
shkSpot(cx + Rm.hw - 1.4, cz + 2.2, 1.8, "The looking-glass", "look in it", function () { jkTale("🪞 The glass", ["Your own face, in a good London looking-glass. Somewhere in this house there is another glass, a tall cheval-glass in the cabinet, that has seen stranger things."]); });
shkSpot(cx - 1.2, cz - Rm.hd + 2.8, 1.8, "The bed", "look at it", function () { jkTale("🛏️ Dr Jekyll's bed", ["A great mahogany bed with blue hangings. 'I was in my own bed ... I was still so engaged when, in one of my more wakeful moments, my eyes fell upon my hand.' (Henry Jekyll's statement)"]); });
Rm.hello = "<b>Dr Jekyll's bedroom.</b> A great mahogany bed, the wardrobe, a fire in the grate, a tall glass in the corner.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 9;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x6A645A), wall: dlnS("yardbrick", 0x7A6A58), h: h, ceil: false, outName: "Out by the door to the by-street", out: jkOut("door", "🚪 Out through the blistered door, into the by-street.") });
dlnBox(g, Rm.hw * 2, 0.1, Rm.hd * 2, dlnGlow(0x5A5E64), cx, h + 0.5, cz);
var bark = dlnS("planebark", 0x8A8070);
dlnCyl(g, 0.22, 0.32, 4, bark, cx - 3.2, 2, cz - 1, 8);
var br = dlnCyl(g, 0.08, 0.14, 2.2, bark, cx - 2.7, 4.2, cz - 1, 6);
br.rotation.z = -0.6;
var br2 = dlnCyl(g, 0.08, 0.12, 1.8, bark, cx - 3.7, 4.0, cz - 1.2, 6);
br2.rotation.z = 0.7;
for (var s = 0; s < 10; s++) {
var a = s / 10 * Math.PI * 2;
dlnBox(g, 0.3, 0.2, 0.3, dlnS("stone", 0x8A847A), cx - 3.2 + Math.cos(a) * 1.0, 0.1, cz - 1 + Math.sin(a) * 1.0);
}
shkSolid({ x: cx - 3.2, z: cz - 1, r: 1.1 });
dlnCyl(g, 1.0, 1.1, 0.5, dlnS("stone", 0x8A847A), cx + 2.6, 0.25, cz + 1.6, 14);
dlnCyl(g, 0.15, 0.2, 1.0, dlnS("stone", 0x8A847A), cx + 2.6, 0.9, cz + 1.6, 8);
shkSolid({ x: cx + 2.6, z: cz + 1.6, r: 1.2 });
for (var b = 0; b < 3; b++)
dlnCyl(g, 0.3, 0.28, 0.7, dlnShine(0x3A3A3A, 0.6, 0.4), cx + Rm.hw - 0.6, 0.35, cz + Rm.hd - 3 - b * 0.8, 10);
dlnBox(g, 2.2, 3.0, 0.2, dlnS("oak", 0x5A3A22), cx + 2.4, 1.5, cz - Rm.hd + 0.1);
dlnBox(g, 1.6, 0.2, 0.4, dlnS("stone", 0x8A847A), cx + 2.4, 0.1, cz - Rm.hd + 0.4);
for (var w = 0; w < 3; w++) {
var wx = cx - 1.2 + w * 1.6;
dlnBox(g, 1.1, 1.5, 0.1, dlnGlow(w === 1 ? 0xD8B878 : 0x6A6A5A), wx, 5.6, cz - Rm.hd + 0.06);
for (var bar = 0; bar < 4; bar++)
dlnBox(g, 0.04, 1.5, 0.04, dlnC(0x141414), wx - 0.4 + bar * 0.27, 5.6, cz - Rm.hd + 0.14);
}
dlnBox(g, 1.4, 3.0, 0.2, dlnS("oak", 0x3A2A1A), cx - Rm.hw + 0.1, 1.5, cz + 1.2, Math.PI / 2);
shkSpot(cx + 2.4, cz - Rm.hd + 1.4, 2.0, "The theatre door", "go in", jkRm("jk_theatre"));
shkSpot(cx - Rm.hw + 1.2, cz + 1.2, 2.0, "Across the yard to the house", "go in to the house", jkRm("jk_hall"));
shkSpot(cx, cz - Rm.hd + 2.4, 2.4, "The cabinet window", "look up at it", function () { jkTale("🪟 Three dusty windows, barred with iron", ["High in the back wall of the old laboratory: the cabinet's three windows. The middle one is half-way open, and the blind is up."]); });
shkSpot(cx - 3.2, cz + 0.4, 2.0, "The dead tree", "look at it", function () { jkTale("🌳 Once a garden", ["The court is very cool and a little damp, and full of premature twilight, though the sky, high up overhead, is still bright. A plane tree died here years ago; the beds the old surgeon planted are flagged over now."]); });
Rm.hello = "<b>The yard behind the door.</b> Once a garden, now flagged: a dead tree, a dry fountain, ash-bins; across it the old dissecting theatre, and high up the cabinet's three barred windows.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 8, deal = dlnS("oak", 0x8A7050);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5A44), wall: dlnS("plaster", 0xB8B0A0), low: dlnS("oak", 0x4A3A2A), lowH: 1.2, h: h, ceil: dlnC(0x6A6458), outName: "Out to the yard", out: jkRm("jk_court") });
for (var t = 0; t < 4; t++) {
var r = 3.4 + t * 1.1, y = 0.4 + t * 0.5;
for (var a = 0; a < 9; a++) {
var an = Math.PI * 0.15 + a * Math.PI * 0.7 / 8, bx = cx + Math.cos(an + Math.PI * 0.5) * r * (Rm.hw / 6), bz = cz + 1 + Math.sin(an + Math.PI * 0.5) * r * 0.9;
var b = dlnBox(g, 1.3, 0.12, 0.5, deal, bx, y, bz);
b.rotation.y = -(an + Math.PI * 0.5) + Math.PI / 2;
dlnBox(g, 1.3, y, 0.5, dlnS("oak", 0x5A4632), bx, y / 2, bz).rotation.y = b.rotation.y;
}
}
dlnCyl(g, 2.6, 2.6, 0.2, dlnGlow(0x9A9E9A), cx, h - 0.05, cz - 0.4, 24);
for (var rb = 0; rb < 8; rb++) {
var rr = dlnBox(g, 0.08, 0.1, 5.2, dlnC(0x2A2A2A), cx, h - 0.15, cz - 0.4);
rr.rotation.y = rb * Math.PI / 8;
}
jkStill(g, cx - 2.2, cz - 1.4, 0);
jkStill(g, cx + 2.0, cz - 0.2, 0.3);
n14Table(g, cx, cz + 1.6, 1.0, 2.0, 0.84, deal);
jkCrate(g, cx + Rm.hw - 1.2, cz + Rm.hd - 2.4, 1.0);
jkCrate(g, cx + Rm.hw - 1.0, cz + Rm.hd - 3.6, 0.8);
jkCrate(g, cx - Rm.hw + 1.2, cz + 2.0, 0.9);
jkCrate(g, cx - Rm.hw + 1.0, cz + 3.2, 0.7);
for (var s = 0; s < (SHK.lite ? 6 : 16); s++) {
var st = dlnBox(g, 0.6 + R() * 0.6, 0.03, 0.04, dlnC(0xD8C078), cx - 4 + R() * 8, 0.02, cz - 2 + R() * 7);
st.rotation.y = R() * 3;
}
for (var k = 0; k < 10; k++)
dlnBox(g, 1.4, 0.2, 0.32, deal, cx + Rm.hw - 1.2, 0.1 + k * 0.32, cz - Rm.hd + 4.0 - k * 0.32);
dlnBox(g, 1.6, 0.1, 1.6, deal, cx + Rm.hw - 1.2, 3.2, cz - Rm.hd + 0.9);
dlnBox(g, 1.2, 2.4, 0.08, dlnC(0x8A1A1A), cx + Rm.hw - 1.2, 4.4, cz - Rm.hd + 0.06);
for (var n = 0; n < 12; n++) {
var nl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 4), dlnShine(0xC8A048, 0.3, 0.9));
nl.position.set(cx + Rm.hw - 1.75 + (n % 6) * 0.22, 3.4 + ((n / 6) | 0) * 2.2, cz - Rm.hd + 0.1);
g.add(nl);
}
shkSpot(cx + Rm.hw - 1.2, cz - Rm.hd + 4.4, 1.8, "The stair up to the cabinet", "go up", jkRm("jk_cabinet"));
shkSpot(cx - 2.2, cz - 0.4, 1.8, "The chemical tables", "look at the apparatus", function () { jkTale("⚗️ The laboratory", JKL_FACTS.theatre); });
shkSpot(cx, cz + 3.2, 2.0, "The pit", "stand in it", function () { jkTale("🎓 The dissecting theatre", ["Here the celebrated surgeon who owned the house before Dr Jekyll taught his students anatomy, the tiers crowded to the rail. Dr Jekyll's tastes are 'rather chemical than anatomical': he made it his laboratory."]); });
Rm.hello = "<b>The old dissecting theatre.</b> Tiers of empty benches round the pit, tables of chemical apparatus, crates and packing straw, light falling dimly through the foggy cupola; a stair at the far end to a red baize door.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.2, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("lwgreenpaper", 0x7A8A6A), low: dlnS("oak", 0x4A2A16), lowH: 1.0, h: h, ceil: dlnC(0xD8D0C0), outName: "Down the stair to the theatre", out: jkRm("jk_theatre") });
jkPress(g, cx - Rm.hw + 0.4, cz - 2.4, Math.PI / 2, 2.2);
jkPress(g, cx - Rm.hw + 0.4, cz + 0.4, Math.PI / 2, 2.2);
jkPress(g, cx + Rm.hw - 0.4, cz + 1.4, -Math.PI / 2, 2.0);
dlnFireplace(g, cx + 1.6, cz - Rm.hd + 0.4, 0);
jkGasLamp(g, cx + 1.6, 1.55, cz - Rm.hd + 0.5);
jkDesk(g, cx - 0.6, cz - 0.6, 0);
n14Chair(g, cx - 0.6, cz + 0.3, Math.PI, mah, dlnC(0x2A4A2A));
n14Arm(g, cx + 2.2, cz - 1.6, -0.6, 0x5A3A2A);
jkCheval(g, cx + Rm.hw - 0.9, cz - 2.6, -Math.PI / 2 - 0.4);
for (var w = 0; w < 3; w++) {
var wz = cz - 2.4 + w * 1.8;
dlnBox(g, 0.08, 1.4, 1.0, dlnGlow(0xB8B8A8), cx + Rm.hw - 0.04, 2.2, wz);
for (var b = 0; b < 4; b++)
dlnBox(g, 0.04, 1.4, 0.04, dlnC(0x141414), cx + Rm.hw - 0.12, 2.2, wz - 0.36 + b * 0.24);
}
dlnCyl(g, 0.12, 0.16, 0.2, dlnShine(0x2A2A2E, 0.4, 0.6), cx + 1.1, 0.5, cz - Rm.hd + 0.6, 10);
dlnBox(g, 0.24, 0.06, 0.18, dlnC(0x3A1A10), cx - 1.0, 0.84, cz - 0.6);
shkSpot(cx - 0.6, cz + 0.6, 1.8, "The business table", "look at the papers", function () { jkTale("📝 The business table", ["Papers neatly set out; an envelope addressed in the doctor's hand; a copy of a pious work, annotated, to Mr Utterson's surprise, in Dr Jekyll's hand with startling blasphemies."]); });
shkSpot(cx + Rm.hw - 1.6, cz - 2.4, 1.8, "The cheval-glass", "look in it", function () { jkTale("🪞 The cheval-glass", ["'This glass has seen some strange things,' whispers Poole. A tall glass on a swinging frame, tilted to show the whole of a man from head to foot; in it now, only the rosy glow playing on the roof, the fire sparkling in a hundred repetitions along the glazed fronts of the presses, and your own pale face."]); });
shkSpot(cx - Rm.hw + 1.2, cz - 1.0, 1.8, "The glass presses", "look along the shelves", function () { jkTale("🧪 The presses", JKL_FACTS.cabinet); });
Rm.hello = "<b>Dr Jekyll's cabinet.</b> A large room fitted round with glass presses; a cheval-glass, a business table, a fire in the grate, a lamp on the chimney shelf, three dusty windows barred with iron.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.0, mah = dlnShine(0x3A1E10, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("bakerpaper", 0x7A6A5A), low: dlnS("oak", 0x3A2414), lowH: 1.0, h: h, ceil: dlnC(0xE0D8C8), outName: "Out to the cab", out: function () { jkCabCard(); } });
var safe = new THREE.Group();
safe.position.set(cx + Rm.hw - 0.6, 0, cz - Rm.hd + 0.8);
g.add(safe);
dlnBox(safe, 1.0, 1.4, 0.9, dlnShine(0x2A3A2A, 0.5, 0.6), 0, 0.7, 0);
dlnCyl(safe, 0.1, 0.1, 0.06, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.9, 0.46, 12).rotation.x = Math.PI / 2;
shkSolidBox(cx + Rm.hw - 0.6, cz - Rm.hd + 0.8, 1.1, 1, 0);
jkDesk(g, cx - 0.6, cz - 1.4, 0, mah);
n14Chair(g, cx - 0.6, cz - 0.5, Math.PI, mah, dlnC(0x2A1A10));
dlnFireplace(g, cx - Rm.hw + 0.4, cz + 0.6, Math.PI / 2);
n14Arm(g, cx - Rm.hw + 1.6, cz + 1.8, Math.PI * 0.7, 0x3A2A1A);
n14Arm(g, cx - Rm.hw + 1.6, cz - 0.6, Math.PI * 0.3, 0x3A2A1A);
dlnBox(g, Rm.hw * 2 - 2.4, 2.6, 0.4, shkBooksM(), cx - 0.8, 1.6, cz - Rm.hd + 0.22);
dlnBox(g, 1.2, 0.9, 0.6, mah, cx + Rm.hw - 0.5, 0.45, cz + 1.6);
dlnCyl(g, 0.06, 0.08, 0.3, dlnShine(0x3A1A10, 0.1, 0.5), cx + Rm.hw - 0.5, 1.05, cz + 1.6, 8);
jkGasLamp(g, cx - 0.2, 0.82, cz - 1.6);
jkGasLamp(g, cx + Rm.hw - 0.2, 2.2, cz - 0.4);
shkSpot(cx + Rm.hw - 1.4, cz - Rm.hd + 1.6, 1.8, "The safe", "open it", function () { jkTale("🔒 The safe", ["Deeds, wills, a bundle of letters tied in red tape. In the most private part: an envelope endorsed in Dr Jekyll's hand, 'Dr Jekyll's Will', which Mr Utterson refused to help draw up, and which he hates."]); });
shkSpot(cx - 0.6, cz - 0.2, 1.8, "Mr Utterson's desk", "look at the papers", function () { jkTale("🗂️ The desk", ["A dry divinity book open beside the candle, which Mr Utterson reads of a Sunday evening until the neighbouring church rings midnight; briefs in pink tape; quills, sand, the inkstand."]); });
jkHome("jk_utt0", "jkutt", cx - Rm.hw + 1.6, 0.02, cz + 0.6, Math.PI / 2, { name: "Mr Utterson", persona: JK_UTT, greet: "Ah. You are here. Sit down.", room: "jk_utt" });
jkHome("jk_guest0", "jkguest", cx + 1.8, 0.02, cz + 0.8, -Math.PI / 2, { name: "Mr Guest", persona: JK_GUEST, greet: "Good evening. A glass of the old wine, sir?", room: "jk_utt" });
Rm.hello = "<b>Mr Utterson's house: his business room.</b> Law books to the ceiling, a fire, the green-painted safe in the corner, a desk with its candle.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.6, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: dlnS("pmrose", 0x8A7A6A), low: dlnS("oak", 0x4A2A16), lowH: 1.0, h: h, ceil: dlnC(0xF0E8D8), outName: "Out to the cab", out: function () { jkCabCard(); } });
dlnPlane(g, 6, 6, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz);
n14Table(g, cx, cz - 0.8, 1.2, 2.4, 0.76, mah, dlnC(0xFAF8F2));
n14Chair(g, cx, cz + 0.6, Math.PI, mah, dlnC(0x6A1A1A));
n14Chair(g, cx, cz - 2.2, 0, mah, dlnC(0x6A1A1A));
dlnCyl(g, 0.06, 0.08, 0.3, dlnShine(0x6A1A1A, 0.1, 0.5), cx + 0.3, 0.94, cz - 0.8, 8);
dlnCyl(g, 0.03, 0.02, 0.14, dlnShine(0xE8E8F0, 0.05, 0.6), cx - 0.2, 0.86, cz - 0.4, 8);
dlnFireplace(g, cx - Rm.hw + 0.4, cz, Math.PI / 2);
dlnBox(g, 4.0, 2.8, 0.4, shkBooksM(), cx + 0.8, 1.6, cz - Rm.hd + 0.22);
jkPress(g, cx + Rm.hw - 0.4, cz + 0.4, -Math.PI / 2, 2.0);
n14Gasolier(g, cx, h, cz - 0.8);
dlnPortrait(g, cx - Rm.hw + 0.06, 2.8, cz - 2.2, Math.PI / 2, "John Hunter", "the great surgeon", "#3A1E14");
shkSpot(cx + 1.0, cz - 0.8, 1.8, "Dr Lanyon's table", "look at it", function () { jkTale("🍷 Dr Lanyon's table", ["Port, a glass, the evening paper; a hearty, healthy, dapper doctor's table. A man of science who has no patience with 'unscientific balderdash'."]); });
shkSpot(cx + Rm.hw - 1.4, cz + 0.4, 1.8, "The cabinet of drugs", "look in", function () { jkTale("💊 The cabinet", ["Salts, tinctures, glass-stoppered phials in rows, each labelled in a careful copperplate. A physician of Cavendish Square makes up few of his own drugs; the chemist round the corner does that."]); });
jkHome("jk_lan0", "jklan", cx, 0.02, cz - 2.2, 0, { name: "Dr Lanyon", persona: JK_LAN, greet: "Utterson's young man, is it? Sit down, sit down!", room: "jk_lanyon" });
jkHome("jk_lanfoot", "jkfoot", cx + Rm.hw - 1.2, 0.02, cz + Rm.hd - 1.8, Math.PI, { room: "jk_lanyon" });
Rm.hello = "<b>Dr Lanyon's, Cavendish Square.</b> The great physician's dining-room: a Turkey carpet, a fire, books to the ceiling, a portrait of John Hunter, a glass cabinet of drugs.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x5A3A24), wall: dlnS("damask", 0x6A2A3A), low: dlnS("oak", 0x3A2414), lowH: 0.9, h: h, ceil: dlnC(0xC8B8A0), outName: "Out to the Soho street", out: jkOut("hyde") });
dlnPlane(g, 6, 7, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz);
n14Pic(g, cx, 2.4, cz - Rm.hd + 0.06, 0, 1.6, 1.2, ["#5A7A9A", "#3A4A2A", "#E8C878"]);
n14Sofa(g, cx - 0.6, cz - Rm.hd + 1.2, 0, 0x5A1A2A);
n14Ward(g, cx + Rm.hw - 0.45, cz - 1.2, -Math.PI / 2, mah, 1.4, 2.2);
dlnBox(g, 1.2, 0.9, 0.55, mah, cx - Rm.hw + 0.4, 0.45, cz + 1.2);
for (var d = 0; d < 3; d++) {
dlnBox(g, 0.5, 0.18, 1.0, mah, cx - Rm.hw + 0.9, 0.25 + d * 0.25, cz + 1.2);
}
for (var c = 0; c < (SHK.lite ? 3 : 7); c++) {
var cl = dlnBox(g, 0.5 + R() * 0.3, 0.05, 0.4, dlnC([0x2A2A2E, 0xE8E0D0, 0x3A2A1A, 0x4A1A1A][c % 4]), cx - 2 + R() * 4, 0.04, cz - 1 + R() * 4);
cl.rotation.y = R() * 3;
}
dlnFireplace(g, cx + 1.6, cz - Rm.hd + 0.4, 0);
dlnBox(g, 0.8, 0.12, 0.5, dlnC(0x8A8A86), cx + 1.6, 0.08, cz - Rm.hd + 0.9);
dlnBox(g, 1.2, 2.2, 0.5, mah, cx - Rm.hw + 0.6, 1.1, cz - Rm.hd + 0.4);
for (var b = 0; b < 8; b++)
dlnCyl(g, 0.04, 0.04, 0.3, dlnShine(b % 2 ? 0x3A1A10 : 0x2A3A1A, 0.1, 0.5), cx - Rm.hw + 0.25 + (b % 4) * 0.24, 0.6 + ((b / 4) | 0) * 0.8, cz - Rm.hd + 0.55, 8);
jkGasLamp(g, cx - Rm.hw + 0.2, 2.0, cz - 0.6);
shkSpot(cx + 1.6, cz - Rm.hd + 1.6, 1.8, "The hearth", "look in the ashes", function () { jkTale("🔥 The hearth", ["A pile of grey ashes, as though many papers had been burned."]); });
shkSpot(cx - 0.6, cz + 0.4, 2.2, "The rooms", "look about", function () { jkTale("🛋️ Mr Hyde's rooms", ["Mr Hyde had only used a couple of rooms; but these were furnished with luxury and good taste. A closet was filled with wine; the plate was of silver, the napery elegant; a good picture hung upon the walls, a gift (as Utterson supposed) from Henry Jekyll, who was much of a connoisseur; and the carpets were of many plies and agreeable in colour.", "At this moment, however, the rooms bore every mark of having been recently and hurriedly ransacked; clothes lay about the floor, with their pockets inside out; lock-fast drawers stood open."]); });
jkHome("jk_hk0", "jkhk", cx + 1.2, 0.02, cz + Rm.hd - 2.2, Math.PI, { sex: "f", name: "Mr Hyde's housekeeper", persona: JK_HOUSEK, greet: "Yes? He is not at home. He is very irregular, sir.", room: "jk_soho" });
Rm.hello = "<b>Mr Hyde's rooms, Soho.</b> Luxury and good taste, carpets of many plies, a good picture, a closet of wine; and every mark of having been hurriedly ransacked.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, deal = dlnS("oak", 0x8A7050);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5A44), wall: dlnS("plaster", 0xB8C0B0), low: dlnC(0x3A4A3A), lowH: 1.2, h: h, ceil: dlnC(0xD8D8D0), outName: "Out to the cab", out: function () { jkCabCard(); } });
jkDesk(g, cx, cz - 1.6, 0, deal);
n14Chair(g, cx, cz - 2.6, 0, deal);
n14Chair(g, cx - 0.6, cz - 0.6, Math.PI, deal);
n14Chair(g, cx + 0.6, cz - 0.6, Math.PI, deal);
var map = dlnPanel(["Westminster · Soho · St Giles", "Holborn · the Strand · the City", "(the Metropolitan Police districts)"], "MAP OF LONDON", 2.6, 1.8, "#E8E0C8", "#2A2A3A");
map.position.set(cx - Rm.hw + 0.06, 2.0, cz - 0.4);
map.rotation.y = Math.PI / 2;
g.add(map);
var bill = dlnPanel(["MURDER. £100 REWARD", "for information leading to", "the apprehension of", "EDWARD HYDE"], "POLICE NOTICE", 1.4, 1.8, "#F2EAD6", "#141414");
bill.position.set(cx + Rm.hw - 0.06, 2.0, cz - 1.2);
bill.rotation.y = -Math.PI / 2;
g.add(bill);
for (var c = 0; c < 4; c++)
dlnBox(g, 0.5, 1.8, 0.4, dlnC(0x2A3A2A), cx + Rm.hw - 0.3, 0.9, cz + 1.0 + c * 0.55);
jkGasLamp(g, cx, 0.82, cz - 1.9);
jkGasLamp(g, cx - Rm.hw + 0.2, 2.2, cz + 1.6);
shkSpot(cx + Rm.hw - 1.2, cz - 1.2, 1.8, "The police notice", "read it", function () { jkTale("📜 The notice", ["Thousands of pounds were offered in reward, for the death of Sir Danvers was resented as a public injury. But Mr Hyde had disappeared out of the ken of the police as though he had never existed."]); });
jkHome("jk_new0", "police", cx, 0.02, cz - 2.6, 0, { name: "Inspector Newcomen", persona: JK_NEW, greet: "Morning. Mr Utterson's office? Sit down.", room: "jk_police" });
jkHome("jk_pc0", "police", cx - 1.6, 0.02, cz + Rm.hd - 2, Math.PI, { room: "jk_police" });
Rm.hello = "<b>The police station: the inspector's office.</b> A deal desk, a map of London on the wall, the gas burning in the brown fog of morning.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.2;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A6A48), wall: dlnS("n14rose", 0xE8E0D0), h: h, ceil: dlnC(0xF0E8D8), outName: "Down to the lane", out: jkOut("lane") });
var bd = new THREE.Group();
bd.position.set(cx + 1.6, 0, cz - 1.4);
g.add(bd);
dlnBox(bd, 1.0, 0.5, 1.9, dlnShine(0x2A2A2A, 0.5, 0.5), 0, 0.3, 0);
dlnBox(bd, 0.95, 0.12, 1.85, dlnC(0xF4F0E8), 0, 0.6, 0);
dlnBox(bd, 0.96, 0.06, 1.2, dlnC(0x6A7A9A), 0, 0.68, 0.3);
shkSolidBox(cx + 1.6, cz - 1.4, 1.1, 2, 0);
n14Chair(g, cx - 1.4, cz - Rm.hd + 1.4, 0, dlnS("oak", 0x8A6A44));
dlnBox(g, 1.2, 1.5, 0.08, dlnGlow(0x9AAAC8), cx - 1.4, 1.8, cz - Rm.hd + 0.06);
dlnBox(g, 1.4, 0.1, 0.3, dlnC(0xF0E8D8), cx - 1.4, 1.0, cz - Rm.hd + 0.18);
var moon = new THREE.Mesh(new THREE.CircleGeometry(0.16, 16), dlnGlow(0xF8F4E0));
moon.position.set(cx - 1.1, 2.2, cz - Rm.hd + 0.11);
g.add(moon);
dlnBox(g, 0.4, 0.6, 0.3, dlnS("oak", 0x8A6A44), cx + Rm.hw - 0.4, 0.3, cz + 0.6);
jkGasLamp(g, cx + Rm.hw - 0.4, 0.62, cz + 0.6);
shkSpot(cx - 1.4, cz - Rm.hd + 1.6, 1.6, "The window over the lane", "sit and look out", function () { jkTale("🌕 The window", JKL_FACTS.lane.concat(["Never (she used to say, with streaming tears, when she narrated that experience), never had she felt more at peace with all men or thought more kindly of the world."])); });
jkHome("jk_maid0", "jkmaid", cx - 0.4, 0.02, cz - 0.4, Math.PI * 0.8, { sex: "f", name: "The maid", persona: JK_MAID, greet: "Oh! You gave me such a turn. Come in.", room: "jk_maid" });
Rm.hello = "<b>The maid's room over the lane.</b> A narrow bed, a chair set by the window, and through it the lane below, white under the moon.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 5.0;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A6A50), wall: dlnS("lwredpaper", 0x9A6A4A), low: dlnS("oak", 0x3A1A0E), lowH: 1.3, h: h, ceil: dlnC(0xE8D0A0), outName: "Out to the Soho street", out: jkOut("gin") });
wcBar(g, cx, cz - Rm.hd + 2.4, 10, 0);
var tun = dlnShine(0x6A4422, 0.5, 0.1);
for (var t = 0; t < 4; t++) {
var tb = dlnCyl(g, 0.55, 0.55, 1.1, tun, cx - 4.5 + t * 3, 4.0, cz - Rm.hd + 0.9, 14);
tb.rotation.z = Math.PI / 2;
var lab = wcSign(["OLD TOM", "CREAM OF THE VALLEY", "RUM", "THE CORDIAL"][t], 1.0, 0.22, "#1A1008", "#F0D070");
lab.position.set(cx - 4.5 + t * 3, 4.0, cz - Rm.hd + 1.47);
g.add(lab);
}
for (var gs = 0; gs < 3; gs++)
n14Gasolier(g, cx - 4 + gs * 4, h, cz);
dlnBox(g, Rm.hw * 2 - 1, 0.02, Rm.hd * 2 - 1, dlnC(0xB8A880), cx, 0.012, cz);
shkSpot(cx, cz - Rm.hd + 3.6, 2.0, "The bar", "ask for something", function () { jkTale("🥃 The Crown and Anchor", [wcAdult() ? "A quartern of gin is threepence-halfpenny, poured from the great painted tuns behind the bar; women of many nations come in, key in hand, to have a morning glass." : "A cup of hot coffee for you, a penny, and a slice of bread and butter.", "The gin palaces of the 1880s are the brightest places in the poor streets: plate glass, gilt, mahogany and gas, on purpose to draw people in out of the dark."]); });
jkHome("jk_ginpot", "wcpot", cx - 1.2, 0.02, cz - Rm.hd + 1.4, 0, { name: "The barman", persona: "You are a made-up barman in a Soho gin palace in the 1880s, in the world of Stevenson's Jekyll and Hyde: quick, sharp, wiping the counter. " + JKL_ERA, greet: "What's yours?", room: "jk_gin" });
[["wcwoman", -3, 1, Math.PI], ["wcman", -1, 1.6, Math.PI], ["wcwoman", 2.2, 1.2, Math.PI], ["wcman", 4, 0.6, -0.6], ["wcporter", -4.6, 2.6, 0.5], ["wcwoman", 1, 3, 0]].forEach(function (q, i) { if (SHK.lite && i > 2)
return; jkHome("jk_ginf" + i, q[0], cx + q[1], 0.02, cz + q[2], q[3], { room: "jk_gin" }); });
Rm.hello = "<b>The Crown and Anchor.</b> Gas blazing on plate glass and gilt, the long mahogany bar, great painted tuns of Old Tom behind it, the women of Soho at the counter.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : jkbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? jkbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = jkbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
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
var W = jkbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = JKB_CH[jkbS().ch], ix = jkbS().s, d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who && !(d.from != null && ix < d.from) && !(d.until != null && ix >= d.until); })[0] : null;
if (d0 && d0.at !== at)
return jkbPos(d0.at);
}
if (at.spot) {
var Sp = jkbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = JKB.cast[at.cast], q = c && c.g && c.g.parent ? jkbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: jkbAreaAt(q.x, q.z) };
}
if (at.room)
return jkbRoomPt(at.room, at.lx, at.lz);
if (at.at && JKL_PLACES[at.at]) {
var A = JKL_PLACES[at.at], ax = jkX(A.x + (at.dx || 0)), az = jkZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: jkbAreaAt(ax, az) };
}
if (at.x != null) {
var x = jkX(at.x), z = jkZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: jkbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
var inA = area.indexOf("in:") === 0, inP = P.area.indexOf("in:") === 0;
if (inA) {
var here = area.slice(3);
if (inP) {
var path = jkbRoomPath(here, P.area.slice(3));
if (path && path.length > 1) {
var sp = jkbLinkSpot(here, path[1]);
if (sp)
return { show: sp, way: " (through the door)" };
}
}
if (JKL_CABROOM[here])
return { show: jkbRoomExit(), way: " (out to the cab)" };
return { show: jkbRoomExit(), way: " (go out)" };
}
if (inP) {
var k = P.area.slice(3), dr = jkbDoorRoom(k);
if (!dr) {
if (area.indexOf("jk:") === 0)
return { show: jkbCabPt(area), way: " (take a cab: to " + JKL_CABROOM[k] + ")" };
return { show: null, way: " (any London cab rank: To Dr Jekyll's London, then a cab to " + JKL_CABROOM[k] + ")" };
}
var D = jkbRoomDoor(dr);
if (D && D.area === area)
return { show: D, way: " (go in)" };
if (D && area.indexOf("jk:") === 0)
return { show: jkbCabPt(area), way: " (take a cab: to " + (JKL_PIECES[D.area.slice(3)] || {}).name + ")" };
return { show: null, way: " (any London cab rank: To Dr Jekyll's London; or the 🎭 menu)" };
}
if (area.indexOf("jk:") === 0 && P.area.indexOf("jk:") === 0)
return { show: jkbCabPt(area), way: " (take a cab: to " + (JKL_PIECES[P.area.slice(3)] || {}).name + ")" };
return { show: null, way: " (any London cab rank: To Dr Jekyll's London; or the 🎭 menu)" };
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
if (JKB.beam && JKB.beam.parent)
return JKB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
JKB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "cane":
m = wBox(0.03, 0.03, 0.9, wM(0x3A2414), 0, 0.03, 0, g);
wSph(0.04, wM(0xC8A048, { m: 0.8, r: 0.3 }), 0, 0.04, 0.45, g, 8);
break;
case "halfcane":
m = wBox(0.03, 0.03, 0.45, wM(0x3A2414), 0, 0.03, 0, g);
break;
case "key":
m = wBox(0.02, 0.006, 0.1, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g);
wCyl(0.025, 0.025, 0.006, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, -0.06, g, 10);
break;
case "chequebook":
m = wBox(0.16, 0.02, 0.08, wM(0x3A6A3A), 0, 0.01, 0, g);
break;
case "purse":
m = wSph(0.05, wM(0x2A1A10), 0, 0.04, 0, g, 8);
m.scale.set(1.3, 0.7, 1);
break;
case "watch":
m = wCyl(0.03, 0.03, 0.01, wM(0xC8A048, { m: 0.9, r: 0.25 }), 0, 0.01, 0, g, 14);
break;
case "envelope":
m = wBox(0.18, 0.004, 0.11, wM(0xF2EADA), 0, 0.01, 0, g);
wBox(0.03, 0.006, 0.03, wM(0x8A1A1A), 0, 0.012, 0, g);
break;
case "phial":
m = wCyl(0.025, 0.03, 0.11, wM(0xC8D8E8, { e: 0x8A2A3A, ei: 0.3 }), 0, 0.055, 0, g, 8);
break;
case "powder":
m = wBox(0.07, 0.01, 0.05, wM(0xF4F0E8), 0, 0.005, 0, g);
break;
case "drawer":
m = wBox(0.45, 0.18, 0.35, wM(0x4A2414), 0, 0.09, 0, g);
wBox(0.4, 0.02, 0.3, wM(0xF4F0E8), 0, 0.16, 0, g);
break;
case "axe":
m = wBox(0.04, 0.04, 0.8, wM(0x8A6A44), 0, 0.03, 0, g);
wBox(0.14, 0.03, 0.16, wM(0x6A6A70, { m: 0.8, r: 0.35 }), 0, 0.03, 0.4, g);
break;
case "poker":
m = wBox(0.02, 0.02, 0.7, wM(0x2A2A2E, { m: 0.8, r: 0.4 }), 0, 0.02, 0, g);
break;
case "candle":
m = wCyl(0.02, 0.02, 0.16, wM(0xF4F0E4), 0, 0.08, 0, g, 8);
wSph(0.02, wM(0xFFD890, { e: 0xFFA040, ei: 0.8 }), 0, 0.18, 0, g, 6);
break;
case "salt":
m = wCyl(0.035, 0.035, 0.08, wM(0xF4F0F8, { e: 0x6A4A8A, ei: 0.2 }), 0, 0.04, 0, g, 10);
break;
case "book":
m = wBox(0.16, 0.04, 0.22, wM(0x5A1A1A), 0, 0.02, 0, g);
break;
default: return wcbItemMesh(kind);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = jkbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (JKB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
JKB.items = JKB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[jkb] take", e);
}
}, (P.y || 0));
I.S.jkb = 1;
JKB.items.push(I);
return I;
},
function (k) {
if (JKB.tuneKey === k)
return;
JKB.tuneKey = k;
var old = JKB.tune;
JKB.tune = null;
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
if (!k || !JKB_TUNES[k])
return;
try {
var A = new Audio(JKB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
JKB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (JKB.tune !== A) {
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
if (JKB.text)
return fn(JKB.text);
if (JKB.textWait) {
JKB.textWait.push(fn);
return;
}
JKB.textWait = [fn];
var done = function (B) { JKB.text = B; var w = JKB.textWait; JKB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/jekyll/jekyll.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
jkbText(function (B) {
var C = JKB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(jkbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); JKB.readOpen = 0; JKB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = jkbS(), C = JKB_CH[S.ch];
if (!C)
return;
JKB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
JKB.readAsk = 0;
JKB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(C.src || "Robert Louis Stevenson, Strange Case of Dr Jekyll and Mr Hyde (1886)") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + (C.more ? C.more.map(function (p) { return "<p style='margin:6px 0;opacity:.88'>" + esc(p) + "</p>"; }).join("") : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? jkbOpening(T).map(jkbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); JKB.readOpen = 0; jkbStepDone(); }, all: function () { jkbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the fog");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Stevenson's own words, all of it");
b += jkbKeeperBtns(fns);
worldCard(b, fns);
};
jkbText(show);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
JKB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); jkbJump(i); }; });
return b + "</div>";
},
function () {
var b = jkbStep();
jkbItemsClear();
JKB.hold = 0;
JKB.puzOpen = 0;
if (!b)
return;
if (jkbAgeSkip(b)) {
jkbStepDone();
return;
}
b._key = jkbKey();
try {
if (b.on)
b.on(jkbS().f);
}
catch (e) {
if (window.console)
console.warn("[jkb] on", e);
}
if (b.k === "read") {
jkbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { JKB.rew[k] = 0; });
if (b.k === "find")
jkbItemAdd(b.item, jkbPos(b.at), b.name, b.verb, function () { if (jkbKey() === b._key)
jkbStepDone(); });
if (b.k === "gather") {
var P = jkbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(jkbS().ch * 97 + jkbS().s * 13 + 7);
JKB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
jkbItemAdd(b.item, Q, b.name, b.verb, function () { if (jkbKey() !== b._key)
return; JKB.got++; try {
if (b.each)
b.each(JKB.got);
}
catch (e) { } if (JKB.got < n) {
jkbSay((b.eachSay || "Got one.") + " " + JKB.got + " of " + n + ".");
return;
} jkbStepDone(); });
}
}
if (b.h)
jkbSay("<b>" + esc(JKB_CH[jkbS().ch].t) + ".</b> " + b.h);
},
function (b) {
JKB.puzOpen = 1;
JKB.puzT = performance.now();
var k = jkbKey(), fns = {}, h = JKB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
jkbSay(b.yes);
if (jkbKey() === k)
jkbStepDone();
return;
}
jkbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (jkbKey() === k)
JKB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = jkbS(), C = JKB_CH[S.ch], b = jkbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[jkb] done", e);
}
if (b.say)
jkbSay(b.say);
S.s++;
if (window.JKB_LOG)
JKB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= JKB_CH.length - 1) {
S.done = 1;
S.s = 0;
jkbSave();
jkbItemsClear();
jkbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
jkbSave();
var nx = JKB_CH[S.ch];
setTimeout(function () { try {
jkbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[jkb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
jkbSave();
jkbStepBegin();
},
function () {
jkbTune("sorrow");
var S = jkbS();
var b = "<h3 style='margin:4px 0'>Strange Case of Dr Jekyll and Mr Hyde</h3><p>'Here then, as I lay down the pen and proceed to seal up my confession, I bring the life of that unhappy Henry Jekyll to an end.'</p><p>Mr Utterson keeps the papers in his safe and tells no one. Poole goes on living in the empty house a while; the cabinet's door is mended; the blistered door in the by-street stays shut. You have read the whole of Stevenson's book, every chapter, and walked it.</p><p style='font-size:12px;opacity:.75'>The story, its people and its words are Robert Louis Stevenson's (1886). The young clerk you played, the street folk and the hands-on clues are added to let you walk through it. The book's own words are in each chapter's 📜 Read the whole chapter.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; jkbSave(); jkbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "A Sunday walk with Mr Enfield");
worldCard(b, fns);
},
function () {
var S = jkbS(), C = JKB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Robert Louis Stevenson, 1886 · the whole book, all ten chapters</div><h3 style='margin:4px 0'>🧪 Strange Case of Dr Jekyll and Mr Hyde</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((jkbStep() || {}).h || "") + "</p>";
else
b += "<p>London, the 1880s. You are the newest articled clerk to Mr Gabriel John Utterson, the lawyer: lean, long, dusty, dreary, and somehow lovable. One Sunday he takes you on his walk with Mr Enfield, and you pass a door in a by-street with neither bell nor knocker. Behind it is the strangest case in London.</p><p style='font-size:12px;opacity:.75'>Stevenson's own book, every chapter. Players under 18 see a gentler telling of the violent moments.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Story of the Door", S.started ? "Back to where you were" : "A Sunday walk");
fns.go = function () { worldCard(null); jkbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; jkbSave(); jkbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += jkbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = JKB.cast[c.key];
if (jkbCastLive(C))
return C;
var P = jkbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? JKL.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = jkPerson("jkb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "jkb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || JKL_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
jkbWrapT(T);
}
JKB.cast[c.key] = { g: g, P: Q, c: c };
return JKB.cast[c.key];
},
function () {
var C = JKB_CH[jkbS().ch];
if (!C || !C.cast)
return;
var b = jkbStep() || {}, idx = jkbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
var Lv = JKB.cast[c.key];
if (Lv && Lv.c === c)
jkbCastDrop(c.key);
return;
}
if (JKB.gone && JKB.gone[c.key] != null && (c.from || 0) <= JKB.gone[c.key])
return;
if (jkbCastLive(JKB.cast[c.key]))
return;
var P = jkbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (jkbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
jkbPerson(c);
});
},
function (T) {
if (!jkbActive() || !jkZoneNow())
return false;
var b = jkbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = jkbKey();
worldPrompt(null);
var next = function () { if (jkbKey() === k)
jkbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(JKB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
JKB.wt += dt;
if (JKB.wt > 0.5) {
JKB.wt = 0;
jkbWrap();
if (jkbActive())
jkbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!jkbActive()) {
if (JKB.beam)
JKB.beam.visible = false;
if (!busy)
worldPrompt("🧪 <b>Dr Jekyll and Mr Hyde</b> · <b>press E</b> for Stevenson's book", jkbOpen);
return;
}
var S = jkbS(), b = jkbStep(), L = worldLocal(), t = SHK.t || 0, area = jkbAreaAt(L.x, L.z);
JKB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? jkbPos(b.at) : null, W = P ? jkbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = jkbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = jkbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = jkbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? jkbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (JKB.readAsk)
break;
if (!JKB.readOpen)
jkbChapterCard();
else {
JKB.readOpen = 0;
jkbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
jkbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
JKB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(JKB.hold, dt);
}
catch (e) { }
if (JKB.hold >= (b.sec || 8)) {
jkbStepDone();
return;
}
}
else
JKB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return JKB.rew[k]; })) {
jkbStepDone();
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
jkbStepDone();
return;
}
break;
}
case "puzzle":
if ((!JKB.puzOpen || performance.now() - (JKB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
jkbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🧪 <b>Dr Jekyll and Mr Hyde</b> · <b>press E</b> for the book", jkbOpen);
var C = JKB_CH[S.ch], prog = b && b.k === "hold" && JKB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - JKB.hold)) + " s)" : b && b.k === "gather" ? " (" + (JKB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🧪 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var g = new THREE.Group(), skin = dlnC(0xE8C8A8), coat = dlnC(0x22222A), hair = dlnC(0x8A7A6A);
dlnBox(g, 0.62, 0.4, 0.3, coat, 0, -0.1, 0);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), skin);
hd.scale.set(0.9, 1.15, 1);
hd.position.y = 0.28;
g.add(hd);
var hr = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), hair);
hr.position.y = 0.31;
g.add(hr);
dlnBox(g, 0.2, 0.1, 0.02, dlnC(0xF4F0E8), 0, 0.08, 0.15);
g.userData.keep = 1;
return g;
},
function (t) { if (t > 3 && t < 3.6)
jkbSay("A pale moon, lying on her back as though the wind had tilted her; the wind making talking difficult; the square swept clean of passengers."); if (t > 8 && t < 8.6)
jkbSay("Poole stops in the middle of the pavement and, in spite of the biting weather, takes off his hat and mops his brow. 'Well, sir, here we are, and God grant there be nothing wrong.'"); },
function (t) { if (t > 5 && t < 5.6)
jkbSay("London hums solemnly all around; but nearer at hand, the stillness is only broken by the sounds of a footfall moving to and fro along the cabinet floor."); if (t > 12 && t < 12.6)
jkbSay("'So it will walk all day, sir,' whispers Poole; 'ay, and the better part of the night. Only when a new sample comes from the chemist, there's a bit of a break.'"); if (t > 17 && t < 17.6)
jkbSay("And once, says Poole, he heard it weeping. 'Weeping like a woman or a lost soul.'"); },
function () {
var L = worldLocal(), inR = SHK.inside && JKL_ROOMS[SHK.inside], here = inR ? null : jkPiece(jkLocal(L.x, L.z).z), b = "", fns = {};
var go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); jklBuild(); fn(); }; };
if (here !== "sq")
go("sq", "🏛️", "To the square", "Dr Jekyll's house, the by-street round the corner", function () { jkGo("cab", "🐴 <b>The square.</b> Ancient, handsome houses round a railed garden; Dr Jekyll's door second from the corner, the fanlight lit."); });
if (here !== "sq")
go("by", "🚪", "To the by-street", "The shops, and the door with neither bell nor knocker", function () { jkGo("bymid", "🐴 <b>The by-street.</b> Shop fronts like rows of smiling saleswomen."); });
if (here !== "soho")
go("so", "🌫️", "To Soho", "Mr Hyde's rooms; a gin palace, a French eating-house", function () { jkGo("scab", "🐴 <b>Soho.</b> Muddy ways, slatternly passengers, and lamps lit against the fog."); });
if (here !== "lane")
go("la", "🌕", "To the lane by the river", "Where Sir Danvers Carew was struck down", function () { jkGo("lcab", "🐴 <b>The lane by the river.</b> Old houses on one side, the river wall on the other."); });
go("ut", "⚖️", "To Mr Utterson's", "His business room, the safe", function () { shkGoIn("jk_utt"); });
go("ln", "🩺", "To Dr Lanyon's", "Cavendish Square", function () { shkGoIn("jk_lanyon"); });
go("po", "👮", "To the police station", "Inspector Newcomen's office", function () { shkGoIn("jk_police"); });
if (typeof wcGo === "function") {
b += worldBtn("wch", "🔦 To Whitechapel, 1888", "Spitalfields and the Lyceum");
fns.wch = function () { worldCard(null); wcGo("cab"); };
}
if (typeof bsGo === "function") {
b += worldBtn("bs", "To Baker Street", "221B, 1912");
fns.bs = function () { worldCard(null); bsGo("door"); };
}
b += worldBtn("gos", "To Great Ormond Street", "London, 1912: the hospital, Queen Square");
fns.gos = function () { worldCard(null); dlnGo(); };
if (typeof wsmGo === "function") {
b += worldBtn("wsm", "To Westminster", "Whitehall, Big Ben, the Abbey");
fns.wsm = function () { worldCard(null); wsmGo("cab"); };
}
if (typeof pmlGo === "function") {
b += worldBtn("pm", "🎩 To Pall Mall", "The clubs, the Reform, Charing Cross");
fns.pm = function () { worldCard(null); pmlGo("cab"); };
}
b += worldBtn("book", "🧪 The book", "Strange Case of Dr Jekyll and Mr Hyde: all ten chapters");
fns.book = function () { worldCard(null); jkbOpen(); };
if (typeof dlnTo1600 === "function") {
b += worldBtn("back", "Back to Bankside, 1600", "By Old Father Thames");
fns.back = function () { worldCard(null); dlnTo1600(); };
}
worldCard(worldFacts("🐴 A hansom cab", inR ? "At the door" : JKL_PIECES[here].name, [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("jkl", "🧪 To Dr Jekyll's London", "The by-street, the door with no knocker, the square, Soho: Stevenson's book");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); jkGo("cab", "🧪 <b>Dr Jekyll's London.</b> The cab sets you down at the corner of the square: the by-street round the corner, its shops bright even in the fog."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function () {
if (!JKL.home || !JKL.home.length)
return;
var live = {};
for (var k in JKB.cast) {
var C = JKB.cast[k];
if (C && C.g && C.g.parent && C.c && C.c.name)
live[C.c.name] = 1;
}
var act = jkbActive(), here = SHK.inside;
JKL.home.forEach(function (H) {
var nm = H.T && H.T.name, off = !!(nm && live[nm]) || !!(act && nm && H.room === here && JKB_CH[jkbS().ch] && (JKB_CH[jkbS().ch].cast || []).some(function (c) { return c.name === nm; }));
if (off && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!off && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
if (H.T)
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
},
function (seed, who, o) {
o = Object.assign({}, o || {});
if (!o.sex && HBL_SHE.test(who))
o.sex = "f";
if (who === "hbcart" || who === "newsboy")
o.child = true;
if (!o.beard)
o.beard = who === "hbbarry" ? "full" : who === "hbselden" ? "long" : who === "hbfrank" ? "mustache" : who === "hbmort" ? "none" : null;
if (!o.beard)
delete o.beard;
var p = dlnPerson(seed, who, o);
if (who === "hbmort")
p.scale.set(0.96, 1.08, 0.96);
else if (who === "hbhenry")
p.scale.set(1.02, 0.95, 1.02);
else if (who === "hbstap")
p.scale.set(0.94, 0.96, 0.94);
return p;
},
function (x, z) {
if (Math.hypot(x - HBM_SITE.island.x, z - HBM_SITE.island.z) < 24)
return true;
var W = HBM_WANDS;
for (var i = 1; i < W.length; i++) {
var ax = W[i - 1][0], az = W[i - 1][1], bx = W[i][0], bz = W[i][1], vx = bx - ax, vz = bz - az, L = vx * vx + vz * vz, t = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / L));
if (Math.hypot(x - ax - vx * t, z - az - vz * t) < 2.2)
return true;
}
return false;
},
function () {
return function (x, W, H) {
var R = wRand(1889);
x.fillStyle = "#646C3E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 5200; i++) {
var c = [["#5A6238", "#76784A", "#4E5632", "#868454"], ["#6A4A5A", "#5A3E4E", "#7A5A66"], ["#7A5A32", "#8A6A3A"]][R() < 0.55 ? 0 : R() < 0.62 ? 1 : 2][(R() * 3) | 0];
x.fillStyle = c;
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 4);
}
for (var j = 0; j < 240; j++) {
x.fillStyle = "rgba(40,36,24," + (0.1 + R() * 0.2) + ")";
x.beginPath();
x.arc(R() * W, R() * H, 2 + R() * 10, 0, 7);
x.fill();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(4);
x.fillStyle = "#8E8C84";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 2600; i++) {
var v = 110 + ((R() * 90) | 0);
x.fillStyle = "rgb(" + v + "," + (v - 2) + "," + (v - 8) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
}
for (var k = 0; k < 60; k++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "60,70,40" : "200,196,150") + "," + (0.15 + R() * 0.25) + ")";
x.beginPath();
x.arc(R() * W, R() * H, 3 + R() * 14, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(40,38,34,.45)";
for (var c = 0; c < 10; c++) {
x.beginPath();
var sx = R() * W, sy = R() * H;
x.moveTo(sx, sy);
x.lineTo(sx + R() * 60 - 30, sy + R() * 60 - 30);
x.stroke();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(77);
x.fillStyle = "#5A7A2A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 3000; i++) {
x.fillStyle = ["#7AA03A", "#6A8A2A", "#4A5A22", "#8AB04A", "#5A4A2A"][(R() * 5) | 0];
x.fillRect(R() * W, R() * H, 1 + R() * 4, 1 + R() * 3);
}
for (var p = 0; p < 16; p++) {
var g = x.createRadialGradient(0, 0, 1, 0, 0, 30);
x.save();
x.translate(R() * W, R() * H);
x.scale(1 + R(), 0.6 + R() * 0.5);
g.addColorStop(0, "rgba(20,26,18,.8)");
g.addColorStop(1, "rgba(20,26,18,0)");
x.fillStyle = g;
x.beginPath();
x.arc(0, 0, 30, 0, 7);
x.fill();
x.restore();
}
for (var b = 0; b < 200; b++) {
x.fillStyle = "rgba(250,250,240,.85)";
x.beginPath();
x.arc(R() * W, R() * H, 1.2 + R() * 1.6, 0, 7);
x.fill();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(31);
x.fillStyle = "#7A6A50";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 1800; i++) {
x.fillStyle = ["#8A7A5A", "#6A5A40", "#9A8A6A", "#5A4E3A"][(R() * 4) | 0];
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
x.fillStyle = "rgba(90,110,60,.6)";
x.fillRect(W * 0.44, 0, W * 0.12, H);
x.fillStyle = "rgba(50,40,28,.35)";
x.fillRect(W * 0.16, 0, W * 0.08, H);
x.fillRect(W * 0.76, 0, W * 0.08, H);
};
},
function (P) {
var W = 2400, D = 2000, sx = HBM.lite ? 120 : 240, sz = HBM.lite ? 100 : 200, geo = new THREE.PlaneGeometry(W, D, sx, sz);
geo.rotateX(-Math.PI / 2);
var pos = geo.attributes.position, col = new Float32Array(pos.count * 3), R = wRand(5);
for (var i = 0; i < pos.count; i++) {
var x = pos.getX(i), z = pos.getZ(i), h = hmH(x, z);
pos.setY(i, h);
var m = hmMireN(x, z), c;
if (m < 1.02)
c = [0.62 + R() * 0.08, 0.82 + R() * 0.08, 0.5];
else {
var hi = Math.min(1, Math.max(0, (h - 12) / 30)), n = 0.5 + 0.5 * Math.sin(x * 0.031 + z * 0.027) * Math.cos(z * 0.019 - x * 0.013);
c = [0.9 + 0.18 * hi * n + R() * 0.05, 0.92 - 0.12 * hi * n + R() * 0.04, 0.8 + 0.08 * hi * n + R() * 0.04];
}
for (var f = 0; f < HBM_FLAT.length; f++) {
var F = HBM_FLAT[f], d = Math.hypot(x - F.x, z - F.z);
if (d < F.r) {
var w = 1 - d / F.r;
c = [c[0] * (1 - w * 0.2), c[1] * (1 + w * 0.06), c[2] * (1 - w * 0.15)];
}
}
col[i * 3] = c[0];
col[i * 3 + 1] = c[1];
col[i * 3 + 2] = c[2];
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeVertexNormals();
var t = wTex(512, 512, hmGrassTex());
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(140, 116);
var m = new THREE.MeshLambertMaterial({ map: t, vertexColors: true });
var me = new THREE.Mesh(geo, m);
me.position.set(hmX(0), 0, hmZ(0));
me.userData.keep = 1;
me.frustumCulled = false;
P.add(me);
var bog = hmMat("hmbog", 512, 512, hmBogTex(), 18), mg = new THREE.PlaneGeometry(HBM_MIRE.rx * 2.1, HBM_MIRE.rz * 2.1, 30, 30);
mg.rotateX(-Math.PI / 2);
var mp = mg.attributes.position;
for (var k = 0; k < mp.count; k++) {
var X = mp.getX(k) + HBM_MIRE.x, Z = mp.getZ(k) + HBM_MIRE.z;
mp.setY(k, hmMireN(X, Z) < 1 ? 0.36 : hmH(X, Z) - 0.4);
}
mg.computeVertexNormals();
var bm = new THREE.Mesh(mg, bog);
bm.position.set(hmX(HBM_MIRE.x), 0, hmZ(HBM_MIRE.z));
bm.userData.keep = 1;
P.add(bm);
var pool = dlnShine(0x1A2018, 0.08, 0.3), R2 = wRand(99);
for (var p = 0; p < (HBM.lite ? 10 : 28); p++) {
var a = R2() * 6.28, r = R2() * 0.85, px = HBM_MIRE.x + Math.cos(a) * r * HBM_MIRE.rx, pz = HBM_MIRE.z + Math.sin(a) * r * HBM_MIRE.rz;
if (hmOnWands(px, pz))
continue;
var pl = new THREE.Mesh(new THREE.CircleGeometry(2 + R2() * 6, 14), pool);
pl.rotation.x = -Math.PI / 2;
pl.scale.set(1, 0.5 + R2() * 0.8, 1);
pl.position.set(hmX(px), 0.4, hmZ(pz));
P.add(pl);
}
},
function (P) {
var mat = hmMat("hmtrack", 128, 128, hmTrackTex());
HBM_ROADS.forEach(function (L) {
var pts = [];
for (var i = 1; i < L.length; i++) {
var ax = L[i - 1][0], az = L[i - 1][1], bx = L[i][0], bz = L[i][1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / 5));
for (var k = (i === 1 ? 0 : 1); k <= n; k++)
pts.push([ax + (bx - ax) * k / n, az + (bz - az) * k / n]);
}
var w = 3.2, pos = [], uv = [], idx = [], v = 0;
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
[[p[0] + nx, p[1] + nz, 0], [p[0] - nx, p[1] - nz, 1]].forEach(function (s) { pos.push(hmX(s[0]), hmH(s[0], s[1]) + 0.07, hmZ(s[1])); uv.push(s[2], v * 0.6); });
v++;
if (i > 0) {
var a = (i - 1) * 2;
idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
P.add(m);
});
},
function (P, x, z, s, R, o) {
o = o || {};
var g = new THREE.IcosahedronGeometry(1, HBM.lite ? 0 : 1), mat = hmMat("hmgranite", 256, 256, hmGraniteTex());
var m = new THREE.Mesh(g, mat);
m.scale.set(s * (0.8 + R() * 0.6), s * (o.flat || 0.5 + R() * 0.3), s * (0.8 + R() * 0.6));
m.rotation.set(R() * 0.3, R() * 6.28, R() * 0.3);
m.position.set(hmX(x), (o.y != null ? o.y : hmH(x, z)) + s * 0.2, hmZ(z));
P.add(m);
return m;
},
function (P, T, R) {
var top = hmH(T.x, T.z), stacks = HBM.lite ? 3 : 5 + ((R() * 3) | 0);
for (var s = 0; s < stacks; s++) {
var a = s / stacks * 6.28 + R() * 0.8, r = s === 0 ? 0 : T.s * (0.25 + R() * 0.35), sx = T.x + Math.cos(a) * r, sz = T.z + Math.sin(a) * r, y = hmH(sx, sz) - 0.6, layers = 3 + ((R() * 4) | 0), w = T.s * (0.28 + R() * 0.18);
for (var l = 0; l < layers; l++) {
var lw = w * (1 - l * 0.12) * (0.8 + R() * 0.4), lh = 1.4 + R() * 1.6;
var m = hmRock(P, sx + (R() - 0.5) * 1.2, sz + (R() - 0.5) * 1.2, lw, R, { y: y, flat: lh / lw });
m.position.y = y + lh * 0.8;
y += lh * 1.35;
}
shkSolid({ x: hmX(sx), z: hmZ(sz), r: w * 0.95 });
}
for (var c = 0; c < (HBM.lite ? 8 : 26); c++) {
var ca = R() * 6.28, cr = T.s * (0.9 + R() * 1.8), cx = T.x + Math.cos(ca) * cr, cz = T.z + Math.sin(ca) * cr, cs = 0.6 + R() * 1.8;
hmRock(P, cx, cz, cs, R);
if (cs > 1.2)
shkSolid({ x: hmX(cx), z: hmZ(cz), r: cs * 0.8 });
}
},
function (P, ax, az, bx, bz, o) {
o = o || {};
var L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(L / 3)), ry = Math.atan2(bx - ax, bz - az), mat = hmMat("hmgranite", 256, 256, hmGraniteTex()), h = o.h || 1.2;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = hmH(x, z);
var b = dlnBox(P, 0.9, h, L / n + 0.05, mat, hmX(x), y + h / 2 - 0.1, hmZ(z));
b.rotation.y = ry;
if (!o.open)
shkSolidBox(hmX(x), hmZ(z), 0.9, L / n + 0.05, ry);
}
},
function (P, R) {
var heath = [dlnC(0x6A3A5A), dlnC(0x7A4A6A), dlnC(0x5A3A3A)], brack = [dlnC(0x9A5A2A), dlnC(0x8A6A2A), dlnC(0x6A7A2A)], gorse = dlnC(0x3A4A22), gfl = dlnC(0xE8C030), cot = dlnC(0xF4F2EA), rush = dlnC(0x5A6A2A);
var geo = new THREE.IcosahedronGeometry(1, 0), n = HBM.lite ? 700 : 2400;
for (var i = 0; i < n; i++) {
var x = HBM_R.x0 + R() * (HBM_R.x1 - HBM_R.x0), z = HBM_R.z0 + R() * (HBM_R.z1 - HBM_R.z0);
var m0 = hmMireN(x, z);
if (m0 < 1.05)
continue;
var near = false;
for (var f = 0; f < HBM_FLAT.length; f++) {
var F = HBM_FLAT[f];
if (Math.hypot(x - F.x, z - F.z) < F.r * 0.8) {
near = true;
break;
}
}
if (near && R() < 0.85)
continue;
var y = hmH(x, z), k = R(), m;
if (k < 0.55) {
m = new THREE.Mesh(geo, heath[(R() * 3) | 0]);
var s = 0.5 + R() * 0.7;
m.scale.set(s * 1.4, s * 0.45, s * 1.2);
m.position.set(hmX(x), y + s * 0.15, hmZ(z));
}
else if (k < 0.85) {
m = new THREE.Mesh(geo, brack[(R() * 3) | 0]);
var s2 = 0.6 + R() * 0.6;
m.scale.set(s2 * 1.2, s2 * 0.7, s2 * 1.2);
m.position.set(hmX(x), y + s2 * 0.3, hmZ(z));
}
else {
m = new THREE.Mesh(geo, gorse);
var s3 = 0.7 + R() * 0.6;
m.scale.set(s3, s3 * 0.8, s3);
m.position.set(hmX(x), y + s3 * 0.5, hmZ(z));
if (!HBM.lite) {
for (var fl = 0; fl < 4; fl++) {
var q = new THREE.Mesh(geo, gfl);
q.scale.set(0.16, 0.12, 0.16);
q.position.set(hmX(x) + (R() - 0.5) * s3 * 1.4, y + s3 * (0.7 + R() * 0.5), hmZ(z) + (R() - 0.5) * s3 * 1.4);
P.add(q);
}
}
}
m.rotation.y = R() * 6.28;
P.add(m);
}
for (var j = 0; j < (HBM.lite ? 120 : 460); j++) {
var a = R() * 6.28, r = Math.sqrt(R()) * 0.96, x2 = HBM_MIRE.x + Math.cos(a) * r * HBM_MIRE.rx, z2 = HBM_MIRE.z + Math.sin(a) * r * HBM_MIRE.rz;
var t = new THREE.Mesh(geo, j % 3 ? rush : cot);
if (j % 3) {
t.scale.set(0.25, 0.5, 0.25);
t.position.set(hmX(x2), 0.6, hmZ(z2));
}
else {
t.scale.set(0.12, 0.1, 0.12);
t.position.set(hmX(x2), 0.75, hmZ(z2));
var st = dlnCyl(P, 0.01, 0.01, 0.4, rush, hmX(x2), 0.55, hmZ(z2), 3);
}
P.add(t);
}
var bark = dlnS("oak", 0x3A2A1E), leaf = dlnC(0x4A5A2A);
for (var tt = 0; tt < (HBM.lite ? 14 : 40); tt++) {
var x3 = HBM_R.x0 + R() * (HBM_R.x1 - HBM_R.x0), z3 = HBM_R.z0 + R() * (HBM_R.z1 - HBM_R.z0);
if (hmMireN(x3, z3) < 1.1)
continue;
var y3 = hmH(x3, z3), tr = new THREE.Group();
tr.position.set(hmX(x3), y3, hmZ(z3));
tr.rotation.y = R() * 6.28;
P.add(tr);
var tk = dlnCyl(tr, 0.12, 0.2, 2.2, bark, 0, 1.0, 0, 6);
tk.rotation.z = 0.35;
var cr = new THREE.Mesh(geo, leaf);
cr.scale.set(1.8, 0.9, 1.3);
cr.position.set(0.7, 2.2, 0);
tr.add(cr);
shkSolid({ x: hmX(x3), z: hmZ(z3), r: 0.4 });
}
},
function (P) {
var W = HBM_WANDS, wood = dlnC(0x6A5034), R = wRand(12);
for (var i = 1; i < W.length; i++) {
var ax = W[i - 1][0], az = W[i - 1][1], bx = W[i][0], bz = W[i][1], n = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / 6));
for (var k = 0; k < n; k++) {
var t = k / n, x = ax + (bx - ax) * t + (R() - 0.5) * 0.6, z = az + (bz - az) * t + (R() - 0.5) * 0.6;
var w = dlnCyl(P, 0.03, 0.04, 1.6, wood, hmX(x + 1.4), 0.3 + 0.8, hmZ(z), 4);
w.rotation.z = (R() - 0.5) * 0.3;
}
}
var pm = dlnC(0x6A6A3A);
for (var j = 1; j < W.length; j++) {
var ax2 = W[j - 1][0], az2 = W[j - 1][1], bx2 = W[j][0], bz2 = W[j][1], L = Math.hypot(bx2 - ax2, bz2 - az2), pl = dlnPlane(P, 3.2, L + 1, pm, hmX((ax2 + bx2) / 2), 0.42, hmZ((az2 + bz2) / 2));
pl.rotation.y = Math.atan2(bx2 - ax2, bz2 - az2);
}
},
function (P, R) {
var cols = [0x3A2414, 0x1E1410, 0x6A4A2A, 0x8A7A6A];
for (var i = 0; i < (HBM.lite ? 4 : 12); i++) {
var x = -600 + R() * 1200, z = -500 + R() * 1000;
if (hmMireN(x, z) < 1.2)
continue;
var h = wsmHorse(cols[i % 4]);
h.scale.set(0.7, 0.62, 0.7);
h.position.set(hmX(x), hmH(x, z), hmZ(z));
h.rotation.y = R() * 6.28;
HBM.live.add(h);
shkSolid({ x: hmX(x), z: hmZ(z), r: 1.0 });
}
var wool = dlnC(0xE8E2D4), face = dlnC(0x1A1A1A), geo = new THREE.IcosahedronGeometry(1, 1);
for (var s = 0; s < (HBM.lite ? 10 : 36); s++) {
var x2 = -700 + R() * 1400, z2 = -560 + R() * 1100;
if (hmMireN(x2, z2) < 1.2)
continue;
var g = new THREE.Group();
g.position.set(hmX(x2), hmH(x2, z2), hmZ(z2));
g.rotation.y = R() * 6.28;
P.add(g);
var b = new THREE.Mesh(geo, wool);
b.scale.set(0.45, 0.36, 0.62);
b.position.y = 0.62;
g.add(b);
var hd = new THREE.Mesh(geo, face);
hd.scale.set(0.14, 0.16, 0.2);
hd.position.set(0, 0.78, 0.62);
g.add(hd);
[[-0.18, -0.3], [0.18, -0.3], [-0.18, 0.3], [0.18, 0.3]].forEach(function (l) { dlnCyl(g, 0.04, 0.04, 0.42, face, l[0], 0.21, l[1], 4); });
}
},
function (P, R) {
hmGroundMesh(P);
hmTracks(P);
HBM_TOR.forEach(function (T) { hmTor(P, T, R); });
var bt = HBM_SITE.blacktor;
for (var i = 0; i < (HBM.lite ? 6 : 16); i++) {
var a = i * 2.4, r = 26 + i * 5, x = bt.x + Math.cos(a) * r, z = bt.z + 40 + Math.sin(a) * r * 0.6;
if (Math.hypot(x - HBM_PLACES.blacktor.x, z - HBM_PLACES.blacktor.z) < 9)
continue;
hmHutRing(P, x, z, 2.6 + R() * 1.4, R);
}
[[300, -480], [-500, -300], [650, -200], [-600, 320], [400, 480]].forEach(function (c) { for (var k = 0; k < (HBM.lite ? 2 : 5); k++)
hmHutRing(P, c[0] + R() * 60 - 30, c[1] + R() * 60 - 30, 2.4 + R() * 1.2, R); });
for (var s = 0; s < 14; s++) {
var a2 = s / 14 * 6.28;
var st = hmRock(P, 620 + Math.cos(a2) * 11, -80 + Math.sin(a2) * 11, 0.7, R, { flat: 2.2 });
}
hmRock(P, -420, -40, 0.9, R, { flat: 3.4 });
hmPlants(P, R);
hmWandsBuild(P);
hmWall(P, 120, -200, 300, -200);
hmWall(P, 300, -200, 300, -60);
hmWall(P, 120, -60, 300, -60, { open: 1 });
hmWall(P, -790, -180, -790, 30);
hmWall(P, -610, -180, -610, -120);
hmWall(P, -610, -40, -610, 30);
hmWall(P, 330, -440, 330, -205);
hmWall(P, 330, -205, 412, -205);
hmWall(P, 428, -205, 469, -205);
hmWall(P, 330, -440, 469, -440);
hmWall(P, 0, 0, 90, 0, { h: 1.0 });
hmWall(P, 90, 0, 90, 110, { h: 1.0 });
hmWall(P, 0, 110, 90, 110, { h: 1.0 });
hmWall(P, 0, 0, 0, 30, { h: 1.0 });
hmWall(P, 0, 50, 0, 110, { h: 1.0 });
for (var w = 0; w < (HBM.lite ? 3 : 8); w++) {
var x0 = -500 + w * 140, z0 = -560 + (w % 3) * 30;
hmWall(P, x0, z0, x0 + 60 + R() * 40, z0 + R() * 30, { h: 0.9 });
}
},
function (st, v) {
var H = st * 128;
return wcMat("hbstucco:" + st + ":" + v, 256, H, function (x, W) {
var R = wRand(st * 37 + v * 19 + 5);
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(150,130,100,.25)";
for (var y = 8; y < H; y += 18) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
for (var f = 0; f < st; f++) {
var y0 = H - (f + 1) * 128 + (f === 0 ? 16 : 26), wh = f === 0 ? 92 : f === st - 1 ? 60 : 80;
for (var b = 0; b < 3; b++) {
var X0 = 24 + b * 76;
x.fillStyle = "#F4ECD8";
x.fillRect(X0 - 7, y0 - 9, 62, wh + 16);
if (f === 0) {
x.fillStyle = "#D8CCB0";
x.fillRect(X0 - 10, y0 - 16, 68, 8);
}
wcWin(x, X0, y0, 48, wh, R, { lit: 0.3, frame: "#F8F2E2" });
x.strokeStyle = "#F8F2E2";
x.lineWidth = 2;
x.beginPath();
x.moveTo(X0 + 24, y0);
x.lineTo(X0 + 24, y0 + wh);
x.moveTo(X0, y0 + wh / 2);
x.lineTo(X0 + 48, y0 + wh / 2);
x.stroke();
}
if (f === 0) {
x.fillStyle = "#D0C4A8";
x.fillRect(0, H - 128, W, 8);
}
}
x.fillStyle = "#D8CCB0";
x.fillRect(0, 0, W, 14);
for (var p = 0; p < 16; p++) {
x.fillStyle = "#C8BCA0";
x.fillRect(6 + p * 16, 2, 6, 10);
}
});
},
function (v) {
return hmMat("hbgw" + v, 256, 256, function (x, W, H) {
var R = wRand(v * 7 + 3);
x.fillStyle = v === 2 ? "#3A3A3C" : "#8A887E";
x.fillRect(0, 0, W, H);
for (var r = 0; r < H; r += 18 + ((R() * 8) | 0)) {
var c = 0;
while (c < W) {
var w = 20 + R() * 36, s = (v === 2 ? 50 : 118) + ((R() * 40) | 0);
x.fillStyle = "rgb(" + s + "," + (s - 2) + "," + (s - 8) + ")";
x.fillRect(c + 1, r + 1, w - 2, 16);
c += w;
}
}
x.fillStyle = "rgba(40,60,30,.25)";
for (var m = 0; m < 40; m++) {
x.beginPath();
x.arc(R() * W, R() * H, 2 + R() * 8, 0, 7);
x.fill();
}
});
},
function () { return hmMat("hbthatch", 256, 256, function (x, W, H) { var R = wRand(15); x.fillStyle = "#7A6440"; x.fillRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
x.strokeStyle = ["#8A744A", "#6A5434", "#9A8458", "#5A4A2E"][(R() * 4) | 0];
x.beginPath();
var sx = R() * W, sy = R() * H;
x.moveTo(sx, sy);
x.lineTo(sx + R() * 4 - 2, sy + 10 + R() * 12);
x.stroke();
} }); },
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : hmH(x, z), g = new THREE.Group();
g.position.set(hmX(x), y, hmZ(z));
g.rotation.y = ry || 0;
P.add(g);
var w = o.w || 8, d = o.d || 6, h = (o.st || 2) * 3.0, wall = hbGraniteWall(o.dark ? 2 : 1), dark = dlnC(0x1A1C20), lit = dlnGlow(0xF0C070), frame = dlnC(0xE8E2D4);
dlnBox(g, w, h, d, wall, 0, h / 2, 0);
if (o.thatch)
dlnGable(g, w + 0.6, d + 0.8, 2.8, hbThatch(), 0, h, 0);
else
dlnGable(g, w + 0.4, d + 0.6, 2.4, dlnS("slate", 0x5A5A62), 0, h, 0);
dlnBox(g, 1.0, 2.6, 0.8, wall, -w / 2 + 0.6, h + 1.6, 0);
if (!HBM.lite)
dlnBox(g, 1.0, 2.6, 0.8, wall, w / 2 - 0.6, h + 1.6, 0);
var dx = o.door != null ? o.door : 0;
dlnBox(g, 1.1, 2.1, 0.12, dlnShine(o.doorCol || 0x2A3A2A, 0.4, 0.2), dx, 1.05, d / 2 + 0.03);
dlnBox(g, 1.4, 0.18, 0.2, dlnS("stone", 0x9A9890), dx, 2.2, d / 2 + 0.08);
dlnBox(g, 0.95, 2.0, 0.12, dlnShine(o.doorCol || 0x2A3A2A, 0.4, 0.2), -dx - w * 0.22, 1.0, -d / 2 - 0.03);
dlnBox(g, 1.25, 0.16, 0.2, dlnS("stone", 0x9A9890), -dx - w * 0.22, 2.1, -d / 2 - 0.08);
var cols = Math.max(1, Math.round(w / 3));
for (var f = 0; f < (o.st || 2); f++)
for (var c = 0; c < cols; c++) {
var wx = -w / 2 + (c + 0.5) * w / cols;
if (f === 0 && Math.abs(wx - dx) < 1.2)
continue;
var wy = 1.5 + f * 3.0;
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, wy, d / 2 + 0.02);
dlnBox(g, 0.84, 1.04, 0.06, (c + f + (o.seed || 0)) % 3 === 0 ? lit : dark, wx, wy, d / 2 + 0.05);
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, 1.5 + f * 3.0, -d / 2 - 0.02);
dlnBox(g, 0.84, 1.04, 0.06, (c + f + (o.seed || 0)) % 4 === 1 ? lit : dark, wx, 1.5 + f * 3.0, -d / 2 - 0.05);
}
shkSolidBox(hmX(x), hmZ(z), ry && Math.abs(Math.sin(ry)) > 0.7 ? d + 0.4 : w + 0.4, ry && Math.abs(Math.sin(ry)) > 0.7 ? w + 0.4 : d + 0.4, 0);
return g;
},
function (P) {
var setts = dlnS("setts", 0x6A645A), flags = dlnS("flags", 0x8A847A), kerb = dlnS("stone", 0x9A948A);
Object.keys(HBL_ST).forEach(function (k, ki) {
var S = HBL_ST[k], yo = ki * 0.0007, w = S.f1 - S.f0, L = S.a1 - S.a0, c = (S.a0 + S.a1) / 2, fm = (S.f0 + S.f1) / 2, X = S.ax === "x" ? c : fm, Z = S.ax === "x" ? fm : c, pw = w > 12 ? 3.2 : 2.4;
var cx = hbX(X), cz = hbZ(Z), sx = S.ax === "x" ? L : w, sz = S.ax === "x" ? w : L;
dlnPlane(P, sx + 0.6, sz + 0.6, flags, cx, yo, cz);
var rw = w - pw * 2;
dlnPlane(P, S.ax === "x" ? L : rw, S.ax === "x" ? rw : L, setts, cx, 0.012 + yo, cz);
[-1, 1].forEach(function (s) { var off = s * (rw / 2); dlnBox(P, S.ax === "x" ? L : 0.25, 0.14, S.ax === "x" ? 0.25 : L, kerb, S.ax === "x" ? cx : cx + off, 0.07, S.ax === "x" ? cz + off : cz); });
shkFloor(cx, cz, sx / 2 + 0.3, sz / 2 + 0.3, 0);
});
},
function (P, key, end, o) {
o = o || {};
var S = HBL_ST[key], w = S.f1 - S.f0, c = (S.f0 + S.f1) / 2, a = end ? S.a1 : S.a0, g = new THREE.Group();
g.position.set(S.ax === "x" ? hbX(a) : hbX(c), 0, S.ax === "x" ? hbZ(c) : hbZ(a));
if (S.ax === "x")
g.rotation.y = end ? -Math.PI / 2 : Math.PI / 2;
else if (end)
g.rotation.y = Math.PI;
P.add(g);
var n = Math.max(1, Math.round(w / 5.4)), st = o.st || 4, H = st * 3.3;
wcFront(g, jkShopFront(o.v || 3), -w / 2, w / 2, 0, 3.3, 0, 1, n);
wcFront(g, hbStuccoUp(st - 1, 1), -w / 2, w / 2, 3.3, H - 3.3, 0, 1, n);
dlnGable(g, w, 8, 2.2, dlnS("slate", 0x8A8A90), 0, H, -4);
},
function (P) {
var org = { x: hbX(0), z: hbZ(0) }, grF = function (gr, v) { return gr === "shop" ? jkShopFront(v + 7) : wcGround(gr, v); }, upF = function (up, st, v) { return hbStuccoUp(st, v); };
wcRow(P, "rs", 0, { ST: HBL_ST, org: org, names: HBL_SHOPS.n.slice(), grR: ["shop"], grF: grF, upF: upF, stR: [4, 4, 5], hw: 6.4, d: 12, seed: 21 });
wcRow(P, "rs", 1, { ST: HBL_ST, org: org, names: HBL_SHOPS.s.slice(), grR: ["shop"], grF: grF, upF: upF, stR: [4, 4, 5], hw: 6.4, d: 12, seed: 23 });
wcRow(P, "nh", 0, { ST: HBL_ST, org: org, skip: [[60, 102]], gr: "house", upF: upF, stR: [4, 5], hw: 7, d: 12, seed: 25 });
wcRow(P, "nh", 1, { ST: HBL_ST, org: org, grR: ["house", "shop"], grF: grF, upF: upF, stR: [4, 5], hw: 7, d: 12, seed: 27 });
hbEnd(P, "rs", 0, {});
hbEnd(P, "rs", 1, {});
hbEnd(P, "nh", 0, { st: 5 });
},
function (P) {
var g = new THREE.Group();
g.position.set(hbX(HBL_ST.nh.f0), 0, hbZ(-81));
g.rotation.y = Math.PI / 2;
P.add(g);
var w = 42, H = 21, stone = dlnS("portland", 0xE8E2D4), brick = dlnS("georgian", 0xFFFFFF);
dlnBox(g, w, 4.2, 0.4, stone, 0, 2.1, -0.1);
for (var y = 0.5; y < 4.2; y += 0.5)
dlnBox(g, w, 0.04, 0.44, dlnC(0xC8C0B0), 0, y, -0.1);
wcFront(g, hbStuccoUp(4, 2), -w / 2, w / 2, 4.2, H - 4.2, 0, 1, 7);
dlnBox(g, w, H, 0.3, brick, 0, H / 2, -0.5);
dlnBox(g, w + 0.6, 0.6, 1.0, stone, 0, H + 0.2, 0.1);
dlnMansard(g, w, 14, 4.2, dlnS("slate", 0x6A6A74), 0, H + 0.4, -7);
for (var d = 0; d < 6; d++)
dlnBox(g, 1.6, 1.8, 1.2, dlnS("slate", 0x6A6A74), -w / 2 + 4 + d * (w - 8) / 5, H + 2.2, -1.0);
[-2.6, 2.6].forEach(function (k) { dlnCyl(g, 0.3, 0.34, 4.2, stone, k, 2.1, 2.6, 14); });
dlnBox(g, 6.6, 0.7, 3.2, stone, 0, 4.5, 1.4);
var sg = wcSign("NORTHUMBERLAND HOTEL", 9, 0.8, "#1A1A22", "#E8C860");
sg.position.set(0, 5.2, 3.05);
g.add(sg);
dlnBox(g, 2.4, 3.0, 0.12, dlnShine(0x2A1A10, 0.3, 0.2), 0, 1.5, 0.12);
dlnBox(g, 2.0, 0.4, 0.06, dlnGlow(0xF0D090), 0, 3.2, 0.14);
for (var s = 0; s < 3; s++)
dlnBox(g, 5, 0.16, 0.5, stone, 0, 0.08 + s * 0.16, 2.0 - s * 0.4);
[-4.4, 4.4].forEach(function (k) { dlnBox(g, 0.08, 1.4, 0.08, dlnShine(0x141414, 0.5, 0.5), k, 4.9, 1.2); dlnCyl(g, 0.24, 0.18, 0.5, dlnGlow(0xFFE6B0), k, 4.3, 1.2, 8); });
shkDoor("hb_hotel", hbX(HBL_HOTEL.x + 2.4), hbZ(HBL_HOTEL.z), "The Northumberland Hotel");
shkSpot(hbX(HBL_HOTEL.x + 4), hbZ(HBL_HOTEL.z + 5), 2.4, "The Northumberland Hotel", "look at it", function () { hbTale("🏨 The Northumberland Hotel", HBL_FACTS.hotel); });
},
function (P) {
Object.keys(HBL_ST).forEach(function (k) { var S = HBL_ST[k]; for (var a = S.a0 + 14; a < S.a1 - 3; a += HBL.lite ? 40 : 26) {
var side = ((a / 26) | 0) % 2 ? S.f0 + 0.8 : S.f1 - 0.8;
if (S.ax === "x")
dlnLamp(P, hbX(a), hbZ(side));
else
dlnLamp(P, hbX(side), hbZ(a));
} });
dlnPillarBox(P, hbX(60), hbZ(8.6));
dlnPillarBox(P, hbX(161.2), hbZ(-40));
var C = HBL_PLACES.cab;
dlnBox(P, 6, 1.0, 0.4, dlnC(0x2A2A2A), hbX(C.x), 0.5, hbZ(C.z + 3));
shkSolidBox(hbX(C.x), hbZ(C.z + 3), 6, 0.6, 0);
shkSpot(hbX(C.x), hbZ(C.z), 3.4, "The cab rank", "take a cab", function () { hbCabCard(); });
shkSpot(hbX(-100), hbZ(-2), 3, "Regent Street", "look about", function () { hbTale("🛍️ Regent Street", HBL_FACTS.regent); });
shkSpot(hbX(40), hbZ(-6.6), 2.6, "The shop windows", "look in", function () { hbTale("🪞 A shop window in Regent Street", ["Plate glass, gas-lit even by day in the winter: silks from the East, gloves, toys, jewels. In the book, Holmes and Watson stop before such a window, so that they can watch the street behind them in the glass."]); });
},
function () {
var live = HBL.live;
dlnHansom(live, hbX(HBL_PLACES.cab.x - 4), hbZ(HBL_PLACES.cab.z + 1.6), -Math.PI / 2);
if (!HBL.lite)
dlnHansom(live, hbX(HBL_PLACES.cab.x - 11), hbZ(HBL_PLACES.cab.z + 1.6), -Math.PI / 2);
var L = [[-160, 3.4], [180, 3.4], [180, -3.4], [-160, -3.4], [-160, 3.4]], d = 0;
for (var i = 1; i < L.length; i++)
d += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]);
HBL.loops = [{ p: L, len: d }];
for (var c = 0; c < (HBL.lite ? 3 : 6); c++) {
var g = new THREE.Group();
live.add(g);
if (c % 3 === 2)
wcCart(g);
else
dlnHansom(g, 0, 0, 0);
HBL.move.push({ g: g, l: 0, s: c * d / (HBL.lite ? 3 : 6), sp: 3 + c % 2, flip: c % 3 !== 2 });
}
},
function (k, x, z, ry, o) {
var F = HBL_FOLK[k], p = hbPerson("hb_" + k, F.dress, { sex: F.sex });
p.position.set(x, (o && o.y) || 0.02, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "hb_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: (o && o.y) || 0.02 };
if (o && o.moor)
hbMoorGround(P);
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet || "Good day to you." } });
return P;
},
function (R) {
var smart = ["gent", "lady", "jklady", "gent", "jkguest", "lady", "clergy", "jkfoot", "jkshop", "newsboy"];
for (var i = 0; i < (HBL.lite ? 8 : 26); i++) {
var x = -160 + R() * 340, z = R() < 0.5 ? -8.4 + R() * 1.8 : 6.6 + R() * 1.8;
var p = hbPerson("hbf" + i, smart[(R() * smart.length) | 0]);
p.position.set(hbX(x), 0.02, hbZ(z));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: { r: 20, sp: 0.4 + R() * 0.4 }, ground: 0.02 });
}
for (var j = 0; j < (HBL.lite ? 2 : 6); j++) {
var p2 = hbPerson("hbn" + j, ["gent", "lady", "jkfoot"][j % 3]);
p2.position.set(hbX(152 + R() * 8), 0.02, hbZ(-20 - R() * 90));
SHK.live.add(p2);
SHK.people.push({ g: p2, wander: { r: 12, sp: 0.4 }, ground: 0.02 });
}
hbNamed("pc", hbX(90), hbZ(-7), Math.PI / 2, { wander: 50 });
hbNamed("newsboy", hbX(-40), hbZ(7.6), Math.PI);
},
function (P, x, z, ry) {
var y = hmH(x, z), g = new THREE.Group();
g.position.set(hmX(x), y, hmZ(z));
g.rotation.y = ry || 0;
P.add(g);
var body = dlnShine(0x2A1E14, 0.4, 0.2), wheel = dlnShine(0x1A1410, 0.6, 0.2), seat = dlnC(0x6A1A1A);
dlnBox(g, 1.7, 0.5, 3.2, body, 0, 1.1, 0);
dlnBox(g, 1.6, 0.14, 1.2, seat, 0, 1.45, 0.8);
dlnBox(g, 1.6, 0.14, 1.2, seat, 0, 1.45, -0.6);
dlnBox(g, 1.6, 0.6, 0.1, body, 0, 1.7, -1.25);
[[-0.9, 1.0], [0.9, 1.0], [-0.9, -1.0], [0.9, -1.0]].forEach(function (w) { var c = dlnCyl(g, 0.55, 0.55, 0.08, wheel, w[0], 0.55, w[1], 14); c.rotation.z = Math.PI / 2; });
[-0.5, 0.5].forEach(function (k) { var h = wsmHorse(0x5A3A22); h.scale.set(0.72, 0.68, 0.72); h.position.set(k, 0, 3.2); g.add(h); });
shkSolidBox(hmX(x), hmZ(z + (Math.cos(ry || 0) > 0 ? 1.6 : -1.6)), 2.6, 7.2, ry || 0);
return g;
},
function (P) {
var S = HBM_SITE.station, y = hmH(S.x, S.z), stone = dlnS("stone", 0xA8A498), g = new THREE.Group();
g.position.set(hmX(S.x), y, hmZ(S.z));
P.add(g);
dlnBox(g, 4, 0.9, 90, stone, -12, 0.45, 10);
shkSolidBox(hmX(S.x - 12), hmZ(S.z + 10), 4, 90, 0);
var rail = dlnShine(0x5A5A5E, 0.5, 0.6), sl = dlnS("oak", 0x4A3A2A);
for (var r = 0; r < 2; r++)
dlnBox(g, 0.08, 0.12, 400, rail, -16.2 + r * 1.44, 0.06, -120);
for (var s = -320; s < 80; s += 1.4)
dlnBox(g, 2.4, 0.08, 0.24, sl, -15.5, 0.02, s);
var sh = new THREE.Group();
sh.position.set(-8, 0, 20);
g.add(sh);
dlnBox(sh, 5, 3.4, 10, hbGraniteWall(1), 0, 1.7, 0);
dlnGable(sh, 5.6, 10.6, 1.6, dlnS("slate", 0x5A5A62), 0, 3.4, 0, Math.PI / 2);
dlnBox(sh, 0.1, 2.1, 1.0, dlnShine(0x6A1A1A, 0.4, 0.2), -2.55, 1.05, 0);
dlnBox(sh, 0.1, 1.0, 1.4, dlnGlow(0xF0C880), -2.55, 1.9, -2.6);
shkSolidBox(hmX(S.x - 8), hmZ(S.z + 20), 5.4, 10.4, 0);
var nm = wcSign("COOMBE TRACEY ROAD · CHANGE FOR GRIMPEN", 6, 0.5, "#1E2A3A", "#F4F0E4");
nm.position.set(-10, 2.6, 6);
nm.rotation.y = Math.PI / 2;
g.add(nm);
dlnBox(g, 0.1, 2.4, 0.1, dlnC(0x1E2A3A), -10, 1.2, 3.6);
dlnBox(g, 0.1, 2.4, 0.1, dlnC(0x1E2A3A), -10, 1.2, 8.4);
for (var f = 0; f < 16; f++)
dlnBox(g, 0.08, 1.0, 0.08, dlnC(0xF4F2EC), -4, 0.5, -20 + f * 3);
dlnBox(g, 0.06, 0.08, 46, dlnC(0xF4F2EC), -4, 0.9, 2.5);
if (typeof bsTrain === "function")
bsTrain(g, -15.5, -26, 0);
hbWagonette(P, HBM_PLACES.wagon.x, HBM_PLACES.wagon.z, Math.PI);
hbSpotM(S.x - 8, S.z - 4, 3.4, "The train to London", "get in", function () { hbTrainCard("moor"); });
hbSpotM(HBM_PLACES.wagon.x + 2, HBM_PLACES.wagon.z + 2, 3.4, "The wagonette", "ride in it", function () { hbWagonCard(); });
hbSpotM(S.x + 4, S.z - 12, 3.0, "The station", "look about", function () { hbTale("🚉 A small wayside station", HBL_FACTS.station); });
},
function (P) {
var F = HBM_FLAT[1], sub = new THREE.Group();
sub.position.y = F.h;
P.add(sub);
var org = { x: hmX(0), z: hmZ(0) };
wcRow(sub, "coombe", 0, { ST: HBM_ST, org: org, skip: [[118, 142]], grR: ["house", "shop", "house"], upR: ["stock", "stock"], stR: [2, 2, 3], hw: 7, seed: 31 });
wcRow(sub, "coombe", 1, { ST: HBM_ST, org: org, skip: [[28, 52]], grR: ["house", "house", "shop"], upR: ["stock", "stock"], stR: [2, 2, 3], hw: 7, seed: 33 });
dlnPlane(sub, 20, 184, dlnS("setts", 0x7A746A), hmX(-700), 0.03, hmZ(-80));
shkFloor(hmX(-700), hmZ(-80), 12, 92, F.h);
var inn = hbMoorHouse(P, -718, -130, Math.PI / 2, { w: 14, d: 9, st: 2, y: F.h, seed: 1, door: 0 });
var isg = wcSign("THE BASKERVILLE ARMS", 4, 0.6, "#2A1A10", "#E8D8A8");
isg.position.set(0, 3.6, 4.6);
inn.add(isg);
var ly = hbMoorHouse(P, -683, -40, -Math.PI / 2, { w: 9, d: 7, st: 2, y: F.h, seed: 2, doorCol: 0x1A2A4A });
var pl = wcSign("MRS L. LYONS · TYPEWRITING", 1.4, 0.3, "#C8A048", "#1A1208");
pl.position.set(1.0, 1.6, 3.58);
ly.add(pl);
hbDoorM("hb_inn", -711.4, -130, "The inn, Coombe Tracey");
hbDoorM("hb_lyons", -689.6, -40, "Mrs Laura Lyons's house");
hbSpotM(-700, -90, 3, "Coombe Tracey", "look about", function () { hbTale("🏘️ Coombe Tracey", HBL_FACTS.coombe); });
hbSpotM(-704, -60, 3.0, "The wagonette", "ride in it", function () { hbWagonCard(); });
},
function (P, R) {
var F = HBM_FLAT[2];
[[160, -150, 0], [176, -150, 0], [230, -150, 0], [246, -94, Math.PI], [226, -94, Math.PI], [160, -94, Math.PI]].forEach(function (c, i) { hbMoorHouse(P, c[0], c[1], c[2], { w: 7, d: 5.6, st: 1 + (i % 2), y: F.h, thatch: i % 3 !== 1, seed: i }); });
var mh = hbMoorHouse(P, 186, -92, Math.PI, { w: 11, d: 8, st: 2, y: F.h, seed: 4, doorCol: 0x3A1A14 });
var mp = wcSign("JAMES MORTIMER · M.R.C.S.", 1.4, 0.3, "#C8A048", "#1A1208");
mp.position.set(1.2, 1.6, 4.08);
mh.add(mp);
var po = hbMoorHouse(P, 212, -146, 0, { w: 10, d: 7, st: 2, y: F.h, seed: 5, doorCol: 0x7A1A1A });
var ps = wcSign("POST OFFICE · GROCER", 4.6, 0.5, "#7A1A1A", "#F4E8C8");
ps.position.set(0, 3.4, 3.58);
po.add(ps);
hbDoorM("hb_mortimer", 186, -96.6, "Dr Mortimer's house");
hbDoorM("hb_post", 212, -141.4, "The post-office, Grimpen");
hbSpotM(200, -120, 3, "Grimpen", "look about", function () { hbTale("🏡 Grimpen", HBL_FACTS.grimpen); });
hbSpotM(196, -126, 2.6, "The wagonette", "ride in it", function () { hbWagonCard(); });
},
function (P, R) {
var F = HBM_FLAT[3], y = F.h, H = HBM_SITE.hall, black = hbGraniteWall(2), ivy = hbIvy(), slate = dlnS("slate", 0x3A3A42), lit = dlnGlow(0xD8A050), dark = dlnC(0x14161A);
var g = new THREE.Group();
g.position.set(hmX(H.x), y, hmZ(H.z));
P.add(g);
dlnBox(g, 30, 12, 16, black, 0, 6, 0);
dlnFace(g, 30.2, 11, ivy, 0, 6.5, 8.05);
dlnGable(g, 30.4, 16.4, 6.5, slate, 0, 12, 0);
dlnBox(g, 6, 6, 4, black, 0, 3, 9.6);
dlnFace(g, 6.2, 5.6, ivy, 0, 3.4, 11.62);
dlnBox(g, 2.0, 3.2, 0.2, dlnShine(0x2A1A0E, 0.4, 0.2), 0, 1.6, 11.7);
dlnBox(g, 6.4, 0.5, 4.4, black, 0, 6.2, 9.6);
[-15, 15].forEach(function (k) {
dlnBox(g, 7, 22, 7, black, k, 11, 6);
for (var c = 0; c < 8; c++) {
var a = c / 8;
dlnBox(g, 1.2, 1.2, 1.2, black, k - 3 + ((c % 4) * 2), 22.6, 6 + (c < 4 ? -3 : 3));
}
for (var l = 0; l < 4; l++)
dlnBox(g, 0.3, 1.2, 0.1, dark, k, 8 + l * 3.6, 9.56);
});
[-1, 1].forEach(function (s) {
dlnBox(g, 22, 9, 14, black, s * 29.5, 4.5, -1);
dlnGable(g, 22.4, 14.4, 5, slate, s * 29.5, 9, -1);
for (var c = 0; c < 5; c++)
for (var f = 0; f < 2; f++) {
var wx = s * (20 + c * 4);
dlnBox(g, 1.6, 2.2, 0.1, dlnC(0x6A6A62), wx, 2.4 + f * 3.8, 6.04);
dlnBox(g, 1.3, 1.9, 0.1, (c + f) % 3 === 0 ? lit : dark, wx, 2.4 + f * 3.8, 6.08);
for (var mu = -1; mu <= 1; mu += 2)
dlnBox(g, 0.08, 1.9, 0.12, dlnC(0x4A4A44), wx + mu * 0.32, 2.4 + f * 3.8, 6.1);
}
});
for (var w = 0; w < 4; w++) {
var wx2 = -10 + w * 6.6;
if (Math.abs(wx2) < 3)
continue;
dlnBox(g, 2.2, 3.2, 0.1, dlnC(0x6A6A62), wx2, 7, 8.12);
dlnBox(g, 1.9, 2.9, 0.1, w % 2 ? lit : dark, wx2, 7, 8.16);
}
[-9, -3, 3, 9].forEach(function (cx) { dlnBox(g, 1.4, 5, 1.4, black, cx, 17, -2); });
[-26, -33, 26, 33].forEach(function (cx) { dlnBox(g, 1.2, 4, 1.2, black, cx, 13, -3); });
if (!HBM.lite) {
var sm = dlnC(0x4A4A4E);
for (var s2 = 0; s2 < 6; s2++) {
var p = new THREE.Mesh(new THREE.SphereGeometry(0.8 + s2 * 0.25, 8, 6), sm);
p.position.set(-3 + s2 * 0.4, 20 + s2 * 1.4, -2);
g.add(p);
}
}
shkSolidBox(hmX(H.x), hmZ(H.z), 82, 16, 0);
shkSolidBox(hmX(H.x), hmZ(H.z + 9.6), 6.4, 4.4, 0);
dlnPlane(P, 60, 26, dlnS("gravel", 0xA8A090), hmX(H.x), y + 0.05, hmZ(H.z + 22));
dlnPlane(P, 130, 90, dlnS("lawn", 0xA8B890), hmX(H.x - 40), y + 0.03, hmZ(H.z + 75));
hbDoorM("hb_bhall", H.x, H.z + 12.6, "Baskerville Hall");
hbSpotM(H.x + 6, H.z + 22, 3, "Baskerville Hall", "look at it", function () { hbTale("🏰 Baskerville Hall", HBL_FACTS.hall); });
hbSpotM(H.x - 8, H.z + 24, 2.6, "The wagonette", "ride in it", function () { hbWagonCard(); });
var bark = dlnS("oak", 0x2A2018), leaf = dlnC(0x2A3A22), geo = new THREE.IcosahedronGeometry(1, 1);
for (var a = -200; a > -334; a -= HBM.lite ? 16 : 9) {
[-7, 7].forEach(function (k) { var t = new THREE.Group(); t.position.set(hmX(H.x + k), y, hmZ(a)); P.add(t); dlnCyl(t, 0.35, 0.5, 6, bark, 0, 3, 0, 8); var cr = new THREE.Mesh(geo, leaf); cr.scale.set(4.6, 3.2, 4.6); cr.position.set(-k * 0.25, 7.4, 0); t.add(cr); shkSolid({ x: hmX(H.x + k), z: hmZ(a), r: 0.7 }); });
}
dlnPlane(P, 6, 136, dlnS("gravel", 0x8A8270), hmX(H.x), y + 0.06, hmZ(-266));
var gx = H.x, gz = -205;
[-2.6, 2.6].forEach(function (k) { dlnBox(P, 1.4, 4.2, 1.4, hbGraniteWall(1), hmX(gx + k), y + 2.1, hmZ(gz)); var bh = new THREE.Mesh(geo, dlnC(0x3A3A3A)); bh.scale.set(0.5, 0.45, 0.7); bh.position.set(hmX(gx + k), y + 4.6, hmZ(gz + 0.1)); P.add(bh); dlnCyl(P, 0.06, 0.06, 0.4, dlnC(0xE8E0C8), hmX(gx + k + 0.2), y + 4.6, hmZ(gz + 0.6), 4).rotation.x = 1.2; });
for (var b = 0; b < 10; b++) {
var bx = gx - 2.0 + b * 0.44;
dlnBox(P, 0.05, 3.0, 0.05, dlnShine(0x141414, 0.5, 0.5), hmX(bx), y + 1.5 + Math.sin(b / 9 * Math.PI) * 0.3, hmZ(gz));
}
dlnBox(P, 4.2, 0.08, 0.06, dlnShine(0x141414, 0.5, 0.5), hmX(gx), y + 2.6, hmZ(gz));
var ruin = new THREE.Group();
ruin.position.set(hmX(gx - 10), y, hmZ(gz - 4));
P.add(ruin);
dlnBox(ruin, 6, 3, 0.5, hbGraniteWall(2), 0, 1.5, 2.5);
dlnBox(ruin, 0.5, 2.2, 5, hbGraniteWall(2), -3, 1.1, 0);
for (var rr = 0; rr < 5; rr++) {
var rf = dlnBox(ruin, 0.14, 0.14, 4.6, dlnC(0x2A2018), -2.6 + rr * 1.2, 3.4, 0);
rf.rotation.x = 0.5;
}
shkSolidBox(hmX(gx - 10), hmZ(gz - 4), 6.4, 5.4, 0);
var nl = new THREE.Group();
nl.position.set(hmX(gx + 11), y, hmZ(gz - 4));
P.add(nl);
dlnBox(nl, 7, 2.4, 5, hbGraniteWall(1), 0, 1.2, 0);
for (var sc = 0; sc < 4; sc++)
dlnBox(nl, 0.12, 4.4, 0.12, dlnC(0x8A7A5A), -3.6 + sc * 2.4, 2.2, 2.6);
shkSolidBox(hmX(gx + 11), hmZ(gz - 4), 7.4, 5.4, 0);
hbSpotM(gx, gz + 3, 3, "The lodge gates", "look at them", function () { hbTale("🐗 The lodge gates", ["Lodge-gates, a maze of fantastic tracery in wrought iron, with weather-bitten pillars on either side, blotched with lichens, and surmounted by the boars' heads of the Baskervilles. The lodge was a ruin of black granite and bared ribs of rafters, but facing it was a new building, half constructed, the first fruit of Sir Charles's South African gold."]); });
var Y = HBM_SITE.yew, yew = hbYew(), len = Y.z1 - Y.z0, mid = (Y.z0 + Y.z1) / 2;
[-6, 6].forEach(function (k) {
var x = Y.x + k;
if (k > 0) {
dlnBox(P, 1.6, 3.8, len * 0.5 - 1.4, yew, hmX(x), y + 1.9, hmZ(Y.z0 + (len * 0.5 - 1.4) / 2));
dlnBox(P, 1.6, 3.8, len * 0.5 - 1.4, yew, hmX(x), y + 1.9, hmZ(Y.z1 - (len * 0.5 - 1.4) / 2));
shkSolidBox(hmX(x), hmZ(Y.z0 + (len * 0.5 - 1.4) / 2), 1.6, len * 0.5 - 1.4, 0);
shkSolidBox(hmX(x), hmZ(Y.z1 - (len * 0.5 - 1.4) / 2), 1.6, len * 0.5 - 1.4, 0);
}
else {
dlnBox(P, 1.6, 3.8, len - 8, yew, hmX(x), y + 1.9, hmZ(mid + 4));
shkSolidBox(hmX(x), hmZ(mid + 4), 1.6, len - 8, 0);
}
});
dlnPlane(P, 2.6, len, dlnS("gravel", 0xB8B0A0), hmX(Y.x), y + 0.06, hmZ(mid));
dlnPlane(P, 10, len, dlnS("lawn", 0x8AA070), hmX(Y.x), y + 0.04, hmZ(mid));
var mg = HBM_PLACES.moorgate;
dlnBox(P, 0.2, 1.2, 2.4, dlnS("oak", 0x4A3A28), hmX(mg.x + 2.6), y + 0.6, hmZ(mg.z));
for (var gb = 0; gb < 4; gb++)
dlnBox(P, 0.12, 0.1, 2.4, dlnS("oak", 0x5A4A30), hmX(mg.x + 2.6), y + 0.2 + gb * 0.3, hmZ(mg.z));
shkSolidBox(hmX(mg.x + 2.6), hmZ(mg.z), 0.4, 2.8, 0);
dlnCyl(P, 0.06, 0.06, 0.12, dlnShine(0x5A5A5E, 0.5, 0.6), hmX(mg.x + 2.4), y + 0.8, hmZ(mg.z + 1.0), 6);
hbSpotM(mg.x, mg.z, 2.4, "The moor-gate", "look over it", function () { hbTale("🚪 The moor-gate", HBL_FACTS.yew); });
var su = new THREE.Group();
su.position.set(hmX(Y.x), y, hmZ(Y.z1 - 2));
P.add(su);
var sw = dlnS("oak", 0x5A4A34);
[[-2, -2], [2, -2], [-2, 2], [2, 2]].forEach(function (p) { dlnBox(su, 0.2, 2.6, 0.2, sw, p[0], 1.3, p[1]); });
dlnGable(su, 4.8, 4.8, 1.6, dlnS("slate", 0x4A4A50), 0, 2.6, 0);
dlnBox(su, 3.6, 0.5, 0.6, sw, 0, 0.45, 1.4);
shkSolidBox(hmX(Y.x), hmZ(Y.z1), 4.4, 1.2, 0);
hbSpotM(Y.x, Y.z1 - 6, 2.4, "The summer-house", "look in", function () { hbTale("🏚️ The summer-house", ["An old tumble-down summer-house at the far end of the yew alley, its benches green with damp. Sir Charles walked down here every night before he went to bed."]); });
hbSpotM(Y.x, mid, 2.6, "The yew alley", "walk it", function () { hbTale("🌲 The yew alley", HBL_FACTS.yew); });
},
function (P, R) {
var F = HBM_FLAT[4], M = HBM_SITE.merripit;
hbMoorHouse(P, M.x, M.z - 14, 0, { w: 16, d: 8, st: 2, y: F.h, seed: 6, doorCol: 0x3A3A30 });
hbDoorM("hb_merrip", M.x, M.z - 9.4, "Merripit House");
var bark = dlnS("oak", 0x3A2A1E), leaf = dlnC(0x4A5A2A), geo = new THREE.IcosahedronGeometry(1, 0);
for (var i = 0; i < (HBM.lite ? 5 : 14); i++) {
var x = M.x + 18 + (i % 5) * 7, z = M.z + 12 + ((i / 5) | 0) * 10;
var t = new THREE.Group();
t.position.set(hmX(x), hmH(x, z), hmZ(z));
P.add(t);
dlnCyl(t, 0.1, 0.16, 1.6, bark, 0, 0.8, 0, 5).rotation.z = 0.2;
var c = new THREE.Mesh(geo, leaf);
c.scale.set(1.3, 0.8, 1.2);
c.position.set(0.3, 1.8, 0);
t.add(c);
shkSolid({ x: hmX(x), z: hmZ(z), r: 0.3 });
}
hbSpotM(M.x + 6, M.z - 4, 3, "Merripit House", "look at it", function () { hbTale("🏚️ Merripit House", HBL_FACTS.merripit); });
hbSpotM(-140, 160, 3.2, "The edge of the mire", "look out over it", function () { hbTale("🟩 The Great Grimpen Mire", HBL_FACTS.mire); });
},
function (P) {
var F = HBM_FLAT[5], L = HBM_SITE.lafter, g = hbMoorHouse(P, L.x, L.z, 0, { w: 18, d: 10, st: 2, y: F.h, seed: 7, doorCol: 0x4A1A1A });
var brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnBox(g, 5, 0.2, 5, dlnC(0x4A4A4E), 0, 6.2, 0);
[[-1, -1], [1, -1], [0, 1.2]].forEach(function (p) { var l = dlnCyl(g, 0.04, 0.04, 1.8, dlnC(0x2A2018), p[0] * 0.6, 7.0, p[1] * 0.6, 5); l.rotation.x = p[1] * 0.3; l.rotation.z = -p[0] * 0.3; });
var tb = dlnCyl(g, 0.12, 0.16, 2.4, brass, 0, 8.0, 0, 12);
tb.rotation.x = 1.1;
hbDoorM("hb_lafter", L.x, L.z + 5.6, "Lafter Hall");
hbSpotM(L.x + 5, L.z + 9, 3, "Lafter Hall", "look at it", function () { hbTale("🔭 Lafter Hall", HBL_FACTS.lafter); });
},
function (P, R) {
var B = HBM_PLACES.blacktor, y = hmH(B.x, B.z), g = new THREE.Group();
g.position.set(hmX(B.x), y, hmZ(B.z));
P.add(g);
var n = HBM.lite ? 12 : 22;
for (var i = 0; i < n; i++) {
var a = i / n * 6.28;
if (Math.abs(a - Math.PI / 2) < 0.32)
continue;
var r = hmRock(g, 0, 0, 0.55, R, { y: 0, flat: 1.1 });
r.position.set(Math.cos(a) * 2.8, 0.5, Math.sin(a) * 2.8);
}
var roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2.6, 14), dlnC(0x5A5A3A));
roof.position.y = 2.6;
g.add(roof);
shkSolid({ x: hmX(B.x), z: hmZ(B.z), r: 3.0 });
hbDoorM("hb_hut", B.x, B.z + 4.4, "The stone hut");
hbSpotM(B.x + 6, B.z + 6, 3, "The huts on Black Tor", "look about", function () { hbTale("🛖 The stone huts", HBL_FACTS.huts); });
},
function (P, R) {
var S = HBM_PLACES.selden, y = hmH(S.x, S.z), g = new THREE.Group();
g.position.set(hmX(S.x), y, hmZ(S.z));
P.add(g);
hmRock(g, -2.4, 0, 2.4, R, { y: 0, flat: 1.2 }).position.set(-2.4, 1.6, -1);
hmRock(g, 2.4, 0, 2.4, R, { y: 0, flat: 1.2 }).position.set(2.4, 1.6, -1);
hmRock(g, 0, 0, 3.0, R, { y: 0, flat: 0.6 }).position.set(0, 3.6, -1.4);
dlnBox(g, 2.2, 2.2, 0.2, dlnC(0x080808), 0, 1.1, -0.2);
shkSolidBox(hmX(S.x), hmZ(S.z - 1.2), 8, 3, 0);
hbDoorM("hb_cave", S.x, S.z + 2.4, "A cleft in the rocks");
},
function (P, R) {
var I = HBM_SITE.island, y = 0.6, g = new THREE.Group();
g.position.set(hmX(I.x), y, hmZ(I.z));
P.add(g);
var w = hbGraniteWall(1);
dlnBox(g, 8, 7, 0.7, w, -6, 3.5, -6);
dlnBox(g, 0.7, 7, 7, w, -10, 3.5, -2.5);
dlnBox(g, 0.7, 5, 7, w, -2, 2.5, -2.5);
dlnCyl(g, 0.8, 1.1, 14, w, -12, 7, -8, 10);
shkSolidBox(hmX(I.x - 6), hmZ(I.z - 3), 9, 8, 0);
shkSolid({ x: hmX(I.x - 12), z: hmZ(I.z - 8), r: 1.3 });
for (var s = 0; s < 4; s++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(2.5 + s, 1.6, 10), dlnC(0x6A6458));
sp.position.set(6 + s * 2, 0.8, -6 + s * 3);
g.add(sp);
}
var hut = hbMoorHouse(P, I.x + 4, I.z + 6, Math.PI, { w: 6, d: 5, st: 1, y: y, seed: 9, dark: 1 });
hbDoorM("hb_mine", I.x + 4, I.z + 2.6, "The miners' hut");
hbSpotM(I.x - 4, I.z + 4, 3, "The old tin mine", "look at it", function () { hbTale("⛏️ The old tin mine", [HBL_REC.tin, "'It was here that Stapleton kept his hound': in the book the island and its abandoned workings are his hiding-place, out in the heart of the mire where no one else dared to go."]); });
hbSpotM(-150, 172, 2.6, "The wands", "look at the path", function () { hbTale("🪵 The wands", ["Little wands were planted here and there to show where the path zigzagged from tuft to tuft of rushes among those green-scummed pits and foul quagmires. Step only where they show: anywhere else the mire will have you."]); });
},
function (R) {
var add = function (seed, who, x, z, ry, o) { var p = hbPerson(seed, who, o); p.position.set(hmX(x), hmH(x, z) + 0.02, hmZ(z)); p.rotation.y = ry || 0; SHK.live.add(p); var P = { g: p, wander: o && o.wander ? { r: o.wander, sp: 0.35 } : null }; hbMoorGround(P); SHK.people.push(P); return P; };
for (var i = 0; i < (HBM.lite ? 3 : 8); i++)
add("hbcm" + i, i % 2 ? "hbmoorw" : "hbfarm", -700 + (R() - 0.5) * 16, -140 + R() * 140, R() * 6.28, { wander: 20 });
for (var j = 0; j < (HBM.lite ? 2 : 6); j++)
add("hbgm" + j, j % 2 ? "hbmoorw" : "hbfarm", 190 + (R() - 0.5) * 40, -120 + (R() - 0.5) * 24, R() * 6.28, { wander: 14 });
if (!HBM.lite)
for (var k = 0; k < 3; k++)
add("hbgk" + k, k % 2 ? "wcgirl" : "newsboy", 200 + k * 6, -112, R() * 6.28, { wander: 6, child: true });
hbNamed("moorman", hmX(206), hmZ(-118), Math.PI, { moor: 1, y: hmH(206, -118) });
hbNamed("warder", hmX(-756), hmZ(500), 0, { moor: 1, y: hmH(-756, 500) });
add("hbw2", "hbwarder", -750, 508, 0.4);
hbNamed("porter", hmX(-766), hmZ(512), Math.PI / 2, { moor: 1, y: hmH(-766, 512) });
for (var w = 0; w < (HBM.lite ? 1 : 3); w++)
add("hbws" + w, "hbwarder", -200 + w * 260, -60 + w * 90, R() * 6.28, { wander: 40 });
},
function (pieces, R, live) {
pieces.forEach(function (pc) {
var all = new THREE.Group();
SHK.G.add(all);
pc[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[hound] " + (f.name || "?"), e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = pc[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[hound] bake", e);
}
SHK.dist.push({ n: pc[0], g: g, x: pc[2], z: pc[3], r: pc[4] });
});
},
function () {
if (HBL.built || !SHK.G)
return;
DLN.lite = HBL.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1889), live0 = SHK.live;
HBL.live = new THREE.Group();
HBL.live.name = "hb-live";
SHK.G.add(HBL.live);
HBL.move = [];
hbBuildPieces([["hb-rs", [hbGroundLdn, hbLdnHouses, hbHotel, hbLdnThings], hbX(10), hbZ(-40), 260]], R, HBL.live);
try {
hbLdnTraffic();
}
catch (e) {
if (window.console)
console.warn("[hound] traffic", e);
}
try {
hbLdnFolk(R);
}
catch (e) {
if (window.console)
console.warn("[hound] folk", e);
}
SHK.live = live0;
HBL.built = true;
},
function () {
if (HBM.built || !SHK.G)
return;
DLN.lite = HBM.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1902), live0 = SHK.live;
HBM.live = new THREE.Group();
HBM.live.name = "hm-live";
SHK.G.add(HBM.live);
hbBuildPieces([["hm-ground", [hmMoorAll], hmX(0), hmZ(0), 2400], ["hm-west", [hbStation, hbCoombe], hmX(-720), hmZ(200), 520], ["hm-hall", [hbHall, hbGrimpen], hmX(400), hmZ(-260), 360],
["hm-mid", [hbMerripit, hbLafter, hbHutBuild, hbCaveBuild, hbMineBuild, function (P, R) { if (typeof hbMoorExtras === "function")
hbMoorExtras(P, R); }], hmX(0), hmZ(0), 1200]], R, HBM.live);
try {
hmPonies(HBM.live, R);
}
catch (e) {
if (window.console)
console.warn("[hound] ponies", e);
}
try {
hbMoorFolk(R);
}
catch (e) {
if (window.console)
console.warn("[hound] moor folk", e);
}
SHK.live = live0;
HBM.built = true;
},
function (seed, who, x, y, z, ry, o) {
o = o || {};
var p = hbPerson(seed, who, { sex: o.sex, inside: true, child: o.child });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.35 } : null };
SHK.people.push(P);
var T = null;
if (o.name) {
T = { p: P, name: o.name, r: o.r || 2.8, t: { name: o.name, persona: o.persona || HBL_ERA, greet: o.greet || "Good day to you." } };
SHK.talk.push(T);
}
HBL.home.push({ P: P, T: T, on: true, room: o.room });
return P;
},
function (g, x, y, z, w, h, ry, night) {
var f = new THREE.Group();
f.position.set(x, y, z);
f.rotation.y = ry || 0;
g.add(f);
var oak = dlnS("oak", 0x4A3A28);
dlnBox(f, w + 0.3, h + 0.3, 0.14, oak, 0, 0, 0);
dlnBox(f, w, h, 0.05, night ? dlnC(0x0E1218) : dlnGlow(0xB8C0B8), 0, 0, 0.06);
dlnBox(f, 0.06, h, 0.08, oak, 0, 0, 0.09);
dlnBox(f, w, 0.06, 0.08, oak, 0, 0, 0.09);
dlnBox(f, w + 0.5, 0.1, 0.4, oak, 0, -h / 2 - 0.1, 0.2);
return f;
},
function (g, x, y, z, ry) {
var s = new THREE.Group();
s.position.set(x, y, z);
s.rotation.y = ry || 0;
g.add(s);
var br = dlnC(0x6A4A2A), ant = dlnC(0xD8C8A0);
dlnBox(s, 0.5, 0.6, 0.08, dlnS("oak", 0x3A2414), 0, 0, 0);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), br);
h.scale.set(1, 1.1, 1.6);
h.position.set(0, 0, 0.3);
s.add(h);
[-1, 1].forEach(function (k) { var a = dlnCyl(s, 0.025, 0.035, 0.7, ant, k * 0.18, 0.4, 0.25, 5); a.rotation.z = -k * 0.5; var b = dlnCyl(s, 0.02, 0.02, 0.3, ant, k * 0.34, 0.62, 0.25, 4); b.rotation.z = -k * 1.1; });
},
function (g, x, y, z, ry, col) {
var c = new THREE.Group();
c.position.set(x, y, z);
c.rotation.y = ry || 0;
g.add(c);
var t = wTex(64, 80, function (x2, W, H) {
x2.fillStyle = "#C8A048";
x2.beginPath();
x2.moveTo(4, 4);
x2.lineTo(W - 4, 4);
x2.lineTo(W - 4, H * 0.55);
x2.quadraticCurveTo(W / 2, H + 6, 4, H * 0.55);
x2.closePath();
x2.fill();
x2.fillStyle = col || "#6A1A1A";
x2.fillRect(8, 8, W / 2 - 8, H * 0.4);
x2.fillRect(W / 2, H * 0.4, W / 2 - 8, H * 0.2);
x2.fillStyle = "#141414";
x2.beginPath();
x2.arc(W / 2, H * 0.62, 8, 0, 7);
x2.fill();
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.75), new THREE.MeshLambertMaterial({ map: t, transparent: true }));
c.add(m);
},
function (g, x, z, ry, w) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
w = w || 1.6;
var mah = dlnShine(0x3A2414, 0.4, 0.2), R = wRand((x * 7 + z * 13) | 0);
dlnBox(c, w, 0.9, 0.6, mah, 0, 0.45, 0);
for (var d = 0; d < 3; d++) {
var t = wTex(128, 64, function (x2, W, H) { x2.fillStyle = "#F2EEE4"; x2.fillRect(0, 0, W, H); for (var i = 0; i < 12; i++) {
var bx = 10 + (i % 6) * 20, by = 12 + ((i / 6) | 0) * 28, col = ["#C8742A", "#2A4A8A", "#E8C040", "#6A2A6A", "#3A6A3A", "#D84A2A"][(R() * 6) | 0];
x2.fillStyle = "#141414";
x2.fillRect(bx - 0.5, by - 6, 1, 12);
x2.fillStyle = col;
x2.beginPath();
x2.ellipse(bx - 4, by, 4, 3, 0.4, 0, 7);
x2.ellipse(bx + 4, by, 4, 3, -0.4, 0, 7);
x2.fill();
} });
var lid = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.1, 0.5), new THREE.MeshLambertMaterial({ map: t }));
lid.position.set(0, 0.95 + d * 0.0, 0);
lid.rotation.x = -Math.PI / 2 + 0.25;
if (d === 0)
c.add(lid);
}
dlnBox(c, w, 0.6, 0.08, mah, 0, 1.3, -0.26);
for (var r = 0; r < 2; r++) {
var t2 = wTex(128, 48, function (x2, W, H) { x2.fillStyle = "#EAE4D6"; x2.fillRect(0, 0, W, H); for (var i = 0; i < 8; i++) {
x2.fillStyle = ["#C8742A", "#2A6AAA", "#E8C040", "#8A2A8A"][(R() * 4) | 0];
x2.beginPath();
x2.ellipse(8 + i * 15, H / 2, 5, 4, 0.3, 0, 7);
x2.fill();
} });
var p = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.2, 0.24), new THREE.MeshLambertMaterial({ map: t2 }));
p.position.set(0, 1.18 + r * 0.26, -0.21);
c.add(p);
}
shkSolidBox(x, z, ry ? 0.7 : w, ry ? w : 0.7, 0);
return c;
},
function (g, x, z, ry, w) {
var f = new THREE.Group();
f.position.set(x, 0, z);
f.rotation.y = ry || 0;
g.add(f);
var st = dlnS("stone", 0x8A8A80);
w = w || 3;
dlnBox(f, w, 2.4, 0.8, st, 0, 1.2, 0);
dlnBox(f, w * 0.6, 1.4, 0.3, dlnC(0x100E0C), 0, 0.7, 0.3);
dlnBox(f, w * 0.5, 0.4, 0.3, dlnGlow(0xF07A2A), 0, 0.3, 0.35);
dlnBox(f, w + 0.4, 0.2, 1.0, st, 0, 2.5, 0.1);
shkSolidBox(x, z, ry ? 1.0 : w, ry ? w : 1.0, 0);
return f;
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 5.4, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("n14whitetile", 0xFFFFFF), wall: dlnS("damask", 0x7A5A3A), low: dlnS("oak", 0x3A2414), lowH: 1.4, h: h, ceil: dlnC(0xF0E8D4), outName: "Out to Northumberland Street", out: hbOutL("hotel") });
dlnBox(g, 4.4, 1.1, 0.8, mah, cx - 2.6, 0.55, cz - Rm.hd + 2.4);
dlnBox(g, 4.6, 0.06, 0.9, mah, cx - 2.6, 1.12, cz - Rm.hd + 2.4);
dlnBox(g, 0.5, 0.04, 0.36, dlnC(0xF4F0E4), cx - 3.2, 1.16, cz - Rm.hd + 2.3);
dlnCyl(g, 0.08, 0.1, 0.06, dlnShine(0xC8C8D0, 0.2, 0.9), cx - 1.6, 1.17, cz - Rm.hd + 2.3, 10);
shkSolidBox(cx - 2.6, cz - Rm.hd + 2.4, 4.6, 1.0, 0);
dlnBox(g, 2.4, 1.8, 0.1, mah, cx - 2.6, 2.2, cz - Rm.hd + 0.1);
for (var k = 0; k < 24; k++)
dlnBox(g, 0.04, 0.12, 0.03, dlnShine(0xC8A048, 0.3, 0.9), cx - 3.6 + (k % 8) * 0.28, 1.6 + ((k / 8) | 0) * 0.5, cz - Rm.hd + 0.2);
for (var p = 0; p < 4; p++) {
var pt = dlnCyl(g, 0.28, 0.2, 0.5, dlnC(0x6A4A3A), cx + (p % 2 ? 1 : -1) * (Rm.hw - 1), 0.25, cz + (p < 2 ? -2 : 3), 10);
var lf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), dlnC(0x2A5A2A));
lf.scale.set(1, 1.4, 1);
lf.position.set(cx + (p % 2 ? 1 : -1) * (Rm.hw - 1), 1.4, cz + (p < 2 ? -2 : 3));
g.add(lf);
}
for (var s = 0; s < 12; s++)
dlnBox(g, 2.0, 0.2, 0.32, mah, cx + 3.4, 0.1 + s * 0.24, cz - Rm.hd + 5 - s * 0.3);
dlnPlane(g, 5, 6, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz + 1);
n14Arm(g, cx - 2, cz + 2, 0.6, 0x2A3A5A);
n14Arm(g, cx + 1.4, cz + 3, -0.6, 0x2A3A5A);
n14Gasolier(g, cx, h, cz);
n14Gasolier(g, cx, h, cz - 4);
hbLinks("hb_hotel", cx, cz, Rm, { hb_henry: { x: Rm.hw - 1.4, z: -Rm.hd + 5 } });
shkSpot(cx - 3.2, cz - Rm.hd + 3.2, 1.8, "The hotel register", "read it", function () { hbTale("📖 The register", ["Sir Henry Baskerville, Toronto. Then: Theophilus Johnson and family, Newcastle. Mrs Oldmore and maid, High Lodge, Alton."]); });
hbHome("hb_clerk", "jkguest", cx - 2.6, 0.02, cz - Rm.hd + 1.4, 0, { name: "The hotel clerk", persona: "You are a made-up clerk at the desk of the Northumberland Hotel in 1889, in the world of Conan Doyle's The Hound of the Baskervilles: polite, a little harassed; two parties are staying, Mr Theophilus Johnson and family of Newcastle, and old Mrs Oldmore and her maid of High Lodge, Alton. " + HBL_ERA, greet: "Good morning, sir. Can I help you?", room: "hb_hotel" });
hbHome("hb_boots", "jkfoot", cx + 2.2, 0.02, cz - 1.2, -0.6, { name: "The boots", persona: "You are a made-up hotel 'boots' (the servant who cleans the guests' boots left outside their doors) at the Northumberland Hotel in 1889, in the world of The Hound of the Baskervilles: frightened, because one of Sir Henry's boots has vanished and he is in a fury about it. " + HBL_ERA, greet: "I swear I never took it, sir.", room: "hb_hotel" });
for (var q = 0; q < (SHK.lite ? 2 : 5); q++)
hbHome("hb_hg" + q, ["gent", "lady", "jklady", "gent", "clergy"][q], cx - 3 + q * 1.6, 0.02, cz + 2.4 + (q % 2) * 1.2, q * 1.2, { room: "hb_hotel" });
Rm.hello = "<b>The Northumberland Hotel.</b> Tiles, palms and gaslight; the register on the desk, the keys on their board, the great stair going up.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("n14stripe", 0xD8C8A8), h: h, ceil: dlnC(0xF0E8D4), outName: "Down to the hall", out: hbRm("hb_hotel") });
dlnPlane(g, 4.4, 4.4, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz);
n14Table(g, cx, cz - 0.6, 1.2, 1.8, 0.76, mah, dlnC(0xFAF8F2));
n14Chair(g, cx - 0.9, cz - 0.6, Math.PI / 2, mah, 0x6A1A1A);
n14Chair(g, cx + 0.9, cz - 0.6, -Math.PI / 2, mah, 0x6A1A1A);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
n14Arm(g, cx - 1.8, cz + 1.6, 0.4, 0x3A5A3A);
n14Ward(g, cx + Rm.hw - 0.45, cz + 1.6, -Math.PI / 2, mah, 1.6, 2.2);
dlnBox(g, 0.14, 0.3, 0.32, dlnShine(0x6A3A1A, 0.3, 0.3), cx + 1.6, 0.15, cz + Rm.hd - 0.8);
dlnBox(g, 0.9, 0.5, 0.5, dlnShine(0x3A2414, 0.4, 0.2), cx - Rm.hw + 0.8, 0.25, cz + 2.6);
hbWin(g, cx + Rm.hw - 0.05, 1.8, cz - 1.4, 1.3, 1.8, -Math.PI / 2);
n14Gasolier(g, cx, h, cz);
shkSpot(cx + 1.6, cz + Rm.hd - 1.4, 1.6, "The new brown boot", "look at it", function () { hbTale("👞 One new brown boot", ["Bought in the Strand only yesterday, never worn, and one of the pair already gone. 'What can anyone want with one boot?'"]); });
Rm.hello = "<b>Sir Henry's sitting-room.</b> A fire, a table laid for breakfast, a portmanteau not yet unpacked, and by the door a new brown boot, all alone.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, deal = dlnS("oak", 0x8A6A44);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A6A50), wall: dlnS("pmpaper", 0x6A7A6A), low: deal, lowH: 1.2, h: h, ceil: dlnC(0xE8E0CC), outName: "Out to a cab", out: function () { hbCabCard(); } });
dlnBox(g, 6, 1.1, 0.8, deal, cx, 0.55, cz - 1.6);
dlnBox(g, 6.2, 0.06, 0.9, deal, cx, 1.12, cz - 1.6);
shkSolidBox(cx, cz - 1.6, 6.2, 1.0, 0);
for (var i = 0; i < 6; i++)
dlnBox(g, 0.8, 1.2, 0.12, deal, cx - 2.5 + i * 1.0, 2.2, cz - Rm.hd + 0.1);
wcBench(g, cx, cz + 2.6, 5, 0);
var sg = wcSign("DISTRICT MESSENGER SERVICE", 4, 0.4, "#1E2A4A", "#F4E8C8");
sg.position.set(cx, 2.9, cz - Rm.hd + 0.18);
g.add(sg);
hbHome("hb_mgr", "jkshop", cx - 1, 0.02, cz - 2.6, 0, { name: "The manager", persona: "You are the made-up manager of a district messenger office in 1889, in the world of The Hound of the Baskervilles: your messenger boys carry letters and parcels anywhere in London for a few pence. " + HBL_ERA, greet: "A boy, sir? Certainly.", room: "hb_msg" });
for (var b = 0; b < (SHK.lite ? 2 : 4); b++)
hbHome("hb_mb" + b, "hbcart", cx - 2 + b * 1.3, 0.02, cz + 2.0, Math.PI, { child: true, room: "hb_msg" });
shkSpot(cx, cz - 0.6, 2.2, "The counter", "ask for a boy", function () { hbTale("📨 The district messenger office", ["Boys in blue uniforms waiting on a bench to run a message anywhere in London for a few pence; the messages wait in the pigeon-holes behind the counter."]); });
Rm.hello = "<b>The district messenger office.</b> A counter, pigeon-holes for the messages, and a bench of boys in blue uniforms waiting to run.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 14, iron = dlnShine(0x3A3A40, 0.5, 0.5);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x8A847A), wall: dlnS("stock", 0x7A6A54), h: h, ceil: dlnGlow(0xC8CCC8), outName: "Out to the cab rank", out: function () { hbCabCard(); } });
for (var a = -Rm.hd + 3; a < Rm.hd; a += 6) {
var arc = new THREE.Mesh(new THREE.TorusGeometry(Rm.hw - 0.2, 0.12, 4, 24, Math.PI), iron);
arc.position.set(cx, h - Rm.hw + 0.6, cz + a);
g.add(arc);
dlnCyl(g, 0.18, 0.22, h - Rm.hw + 0.6, iron, cx - Rm.hw + 0.4, (h - Rm.hw + 0.6) / 2, cz + a, 8);
}
dlnBox(g, Rm.hw - 1, 0.9, Rm.hd * 2, dlnS("flags", 0x9A948A), cx + Rm.hw / 2 + 0.5, 0.45, cz);
shkFloor(cx + Rm.hw / 2 + 0.5, cz, (Rm.hw - 1) / 2, Rm.hd, 0.9);
if (typeof bsTrain === "function")
bsTrain(g, cx - 3.2, cz - 6, 0);
for (var r = 0; r < 2; r++)
dlnBox(g, 0.08, 0.12, Rm.hd * 2, dlnShine(0x6A6A6E, 0.5, 0.6), cx - 3.9 + r * 1.44, 0.06, cz);
shkSolidBox(cx - 3.2, cz, 3.4, Rm.hd * 2, 0);
var bd = dlnPanel(["10.30 · Exeter, Plymouth: change at Exeter for Coombe Tracey Road", "11.45 · Bristol, Bath", "1.50 · Oxford, Birmingham", "3.40 · Exeter (the return from Devon, 9.50)"], "GREAT WESTERN RAILWAY · DEPARTURES", 4, 1.8, "#1E2A1E", "#F4F0D8");
bd.position.set(cx + Rm.hw - 0.2, 3.4, cz - 6);
bd.rotation.y = -Math.PI / 2;
g.add(bd);
var clk = dlnCyl(g, 0.7, 0.7, 0.12, dlnC(0xF8F4E8), cx + 2, 6, cz - Rm.hd + 2, 20);
clk.rotation.x = Math.PI / 2;
for (var t = 0; t < (SHK.lite ? 3 : 6); t++) {
dlnBox(g, 0.6, 0.5, 0.9, dlnShine(0x5A3A1E, 0.4, 0.2), cx + 2 + (t % 3) * 1.2, 1.15, cz - 10 + t * 3.4);
}
shkSpot(cx + 1, cz - 6, 3, "The 10.30 for Devon", "get in", function () { hbTrainCard("ldn"); }, 0.9);
shkSpot(cx + 3, cz + 4, 3, "Paddington", "look about", function () { hbTale("🚂 Paddington", HBL_FACTS.padd); }, 0.9);
hbHome("hb_porter", "porter", cx + 1.6, 0.92, cz - 2, -Math.PI / 2, { name: "A railway porter", persona: HBL_FOLK.porter.persona, greet: "Train for the West, sir? Platform one; she leaves at ten-thirty.", room: "hb_padd" });
for (var q = 0; q < (SHK.lite ? 3 : 8); q++)
hbHome("hb_pf" + q, ["gent", "lady", "jklady", "porter", "newsboy", "gent", "clergy", "lady"][q], cx + 1 + (q % 3) * 1.6, 0.92, cz - 14 + q * 3.6, R() * 6.28, { room: "hb_padd", wander: 3 });
Rm.hello = "<b>Paddington.</b> Brunel's great iron and glass roof, smoke drifting up under it, and the train for Devon standing at the platform.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 8, oak = dlnShine(0x2A1A10, 0.4, 0.15);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x7A766C), wall: dlnS("linenfold", 0x3A2414), h: h, ceil: dlnC(0x2A1A10), outName: "Out to the drive", out: hbOutM("hall") });
for (var b = -Rm.hd + 1.5; b < Rm.hd; b += 2.6)
dlnBox(g, Rm.hw * 2, 0.5, 0.5, oak, cx, h - 0.4, cz + b);
hbStoneHearth(g, cx, cz - Rm.hd + 0.45, 0, 4.4);
[-1, 1].forEach(function (k) { dlnBox(g, 0.12, 0.9, 0.12, dlnShine(0x1A1A1A, 0.5, 0.4), cx + k * 1.0, 0.45, cz - Rm.hd + 1.2); });
for (var s = 0; s < 6; s++)
hbStag(g, cx + (s % 2 ? Rm.hw - 0.06 : -Rm.hw + 0.06), 3.4, cz - Rm.hd + 3 + ((s / 2) | 0) * 5, s % 2 ? -Math.PI / 2 : Math.PI / 2);
for (var a = 0; a < 4; a++)
hbArms(g, cx - 3 + a * 2, 4.6, cz - Rm.hd + 0.12, 0, ["#6A1A1A", "#1A2A6A", "#2A5A2A", "#6A1A1A"][a]);
dlnBox(g, Rm.hw * 2, 0.3, 2.0, oak, cx, 4.6, cz - Rm.hd + 1.0);
for (var r = 0; r < 14; r++)
dlnBox(g, 0.06, 0.9, 0.06, oak, cx - Rm.hw + 0.8 + r * (Rm.hw * 2 - 1.6) / 13, 5.2, cz - Rm.hd + 2.0);
for (var st = 0; st < 14; st++)
dlnBox(g, 2.2, 0.2, 0.32, oak, cx + Rm.hw - 1.4, 0.1 + st * 0.32, cz + Rm.hd - 3 - st * 0.32);
n14Table(g, cx - 2, cz + 1, 1.2, 2.4, 0.8, oak, null);
n14Arm(g, cx - 1.6, cz - Rm.hd + 3.4, 0.4, 0x5A1A1A);
n14Arm(g, cx + 1.6, cz - Rm.hd + 3.4, -0.4, 0x5A1A1A);
dlnPlane(g, 6, 7, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz - 2);
for (var l = 0; l < 4; l++)
jkGasLamp(g, cx + (l % 2 ? Rm.hw - 0.2 : -Rm.hw + 0.2), 2.6, cz - 4 + ((l / 2) | 0) * 8);
hbWin(g, cx - Rm.hw + 0.06, 3, cz + 2, 1.6, 3.0, Math.PI / 2);
shkSpot(cx, cz - Rm.hd + 2, 2.4, "The great fireplace", "warm your hands", function () { hbTale("🔥 The great hall", ["A fine apartment, large, lofty, and heavily raftered with huge baulks of age-blackened oak. In the great old-fashioned fireplace behind the high iron dogs a log-fire crackled and snapped.", "The light shone on the coats of arms upon the walls, the stags' heads, and the high thin window of old stained glass."]); });
hbLinks("hb_bhall", cx, cz, Rm, { hb_bdine: { x: -Rm.hw + 1.2, z: -1 }, hb_gallery: { x: Rm.hw - 1.6, z: Rm.hd - 7.8 }, hb_bbarry: { x: -Rm.hw + 1.2, z: Rm.hd - 3 } });
hbHome("hb_barry0", "hbbarry", cx + 1.4, 0.02, cz + 2.4, Math.PI, { name: "Barrymore", persona: HB_BARRY, greet: "Good evening, sir. Would you wish dinner to be served at once?", room: "hb_bhall" });
Rm.hello = "<b>The great hall of Baskerville Hall.</b> Huge blackened rafters, a log fire crackling behind the high iron dogs, the stags' heads and coats of arms on the walls.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 6.4, oak = dlnShine(0x2A1A10, 0.4, 0.15);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x4A3420), wall: dlnS("linenfold", 0x3A2414), h: h, ceil: dlnC(0x2A1A10), outName: "Back to the great hall", out: hbRm("hb_bhall") });
dlnBox(g, Rm.hw * 2, 0.3, 3.4, oak, cx, 0.15, cz - Rm.hd + 1.7);
shkFloor(cx, cz - Rm.hd + 1.7, Rm.hw, 1.7, 0.3);
n14Table(g, cx, cz + 0.6, 1.4, 6, 0.78, oak, dlnC(0xF8F6EE));
for (var c = 0; c < 6; c++) {
n14Chair(g, cx - 0.95, cz - 1.8 + c * 1.0, Math.PI / 2, oak, 0x5A1A1A);
n14Chair(g, cx + 0.95, cz - 1.8 + c * 1.0, -Math.PI / 2, oak, 0x5A1A1A);
}
for (var k = 0; k < 3; k++) {
dlnCyl(g, 0.06, 0.09, 0.3, dlnShine(0xC8C8D0, 0.2, 0.9), cx, 0.95, cz - 1.6 + k * 2.2, 8);
dlnCyl(g, 0.02, 0.02, 0.2, dlnC(0xF4F0E4), cx, 1.2, cz - 1.6 + k * 2.2, 6);
}
dlnBox(g, Rm.hw * 2, 0.3, 1.6, oak, cx, 4.4, cz + Rm.hd - 0.8);
for (var r = 0; r < 12; r++)
dlnBox(g, 0.06, 0.9, 0.06, oak, cx - Rm.hw + 0.6 + r * (Rm.hw * 2 - 1.2) / 11, 5.0, cz + Rm.hd - 1.6);
var who = [["Sir Hugo Baskerville", "1647: the wicked Hugo, in velvet and lace", "#2A1A2A"], ["Rear-Admiral Baskerville", "served under Rodney in the West Indies", "#1A2A4A"], ["Sir William Baskerville", "Chairman of Committees, House of Commons, under Pitt", "#3A2A1A"], ["A lady in silk", "a Baskerville of the time of Queen Anne", "#5A3A4A"], ["A cavalier", "a Baskerville of the Civil War", "#2A3A2A"], ["Sir Charles Baskerville", "d. 1889, at the yew alley", "#3A3A3A"]];
who.forEach(function (P, i) { var side = i % 2, z = cz - Rm.hd + 2.4 + ((i / 2) | 0) * 5; dlnPortrait(g, side ? cx + Rm.hw - 0.06 : cx - Rm.hw + 0.06, 2.8, z, side ? -Math.PI / 2 : Math.PI / 2, P[0], P[1], P[2]); });
shkSpot(cx - Rm.hw + 1.2, cz - Rm.hd + 2.4, 2.0, "The portrait of Hugo Baskerville", "look at it closely", function () { hbTale("🖼️ Sir Hugo Baskerville, 1647", ["A Cavalier in black velvet and lace, a broad plumed hat, curling love-locks, a white lace collar; a prim, hard, stern face, with a firm-set, thin-lipped mouth and a coldly intolerant eye.", "It was this wicked Hugo who started the Hound of the Baskervilles, as the old manuscript tells."]); });
Rm.hello = "<b>The dining-hall.</b> A place of shadow and gloom: the dais where the family sat, the minstrels' gallery, and the long line of ancestors staring down from the walls.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.2, oak = dlnShine(0x2A1A10, 0.4, 0.15);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x4A3420), wall: dlnS("damask", 0x4A3A2A), low: dlnS("linenfold", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0x3A2A1A), outName: "Down the great stair", out: hbRm("hb_bhall") });
dlnPlane(g, 1.6, Rm.hd * 2 - 1, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz);
hbWin(g, cx, 1.9, cz - Rm.hd + 0.08, 1.4, 2.2, 0, true);
dlnBox(g, 1.6, 0.08, 0.5, oak, cx, 0.9, cz - Rm.hd + 0.35);
for (var d = 0; d < 5; d++) {
var z = cz - Rm.hd + 4 + d * 4.4;
dlnBox(g, 0.1, 2.4, 1.1, dlnS("oak", 0x5A3A22), cx + (d % 2 ? Rm.hw - 0.06 : -Rm.hw + 0.06), 1.2, z);
}
for (var p = 0; p < 4; p++)
dlnPortrait(g, cx + (p % 2 ? Rm.hw - 0.06 : -Rm.hw + 0.06), 2.6, cz - Rm.hd + 6 + p * 5, p % 2 ? -Math.PI / 2 : Math.PI / 2, "A Baskerville", "an ancestor", "#2A2A2A");
for (var l = 0; l < 3; l++)
jkGasLamp(g, cx - Rm.hw + 0.2, 2.4, cz - Rm.hd + 5 + l * 8);
shkSpot(cx, cz - Rm.hd + 1.4, 1.8, "The window on the moor", "look out", function () { hbTale("🪟 The window on the moor", ["It looks out over the moor: by day the long swell of it to the tors; by night nothing but blackness, unless somewhere far out on it a pin-point of yellow light is answering a candle held in this window."]); });
hbLinks("hb_gallery", cx, cz, Rm, { hb_bwat: { x: -Rm.hw + 1.2, z: -Rm.hd + 4.4 } });
Rm.hello = "<b>The long corridor.</b> Doors on either side, ancestors in their frames, and at the end a window looking out on the moor.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, mah = dlnShine(0x3A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x5A4028), wall: dlnS("n14stripe", 0xC8B898), h: h, ceil: dlnC(0xE8E0CC), outName: "Out to the corridor", out: hbRm("hb_gallery") });
jkBed(g, cx + 1.6, cz - 1.6, 0, 0x2A3A5A);
jkDesk(g, cx - 2.6, cz - Rm.hd + 1.0, 0, mah);
n14Chair(g, cx - 2.6, cz - Rm.hd + 1.9, Math.PI, mah, 0x2A3A5A);
n14Ward(g, cx + Rm.hw - 0.45, cz + 2, -Math.PI / 2, mah, 1.6, 2.2);
hbWin(g, cx - Rm.hw + 0.06, 1.9, cz, 1.2, 1.8, Math.PI / 2);
dlnFireplace(g, cx, cz + Rm.hd - 0.3, Math.PI);
jkGasLamp(g, cx - 2.6, 1.0, cz - Rm.hd + 0.8);
shkSpot(cx - 2.6, cz - Rm.hd + 1.8, 1.8, "Dr Watson's desk", "sit and write", function () { hbTale("✒️ Dr Watson's desk", ["Paper, ink, a pen, and the reports to Mr Sherlock Holmes at 221B Baker Street: every fact, set down as plainly as he can."]); });
Rm.hello = "<b>Dr Watson's room.</b> A bed, a desk with paper and ink for the reports to Baker Street, and a window on the moor.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4, deal = dlnS("oak", 0x8A6A44);
dlnShell(g, cx, cz, Rm, { floor: dlnS("bsflag", 0xFFFFFF), wall: dlnS("n14whitetile", 0xFFFFFF), low: deal, lowH: 1.0, h: h, ceil: dlnC(0xE8E2D4), outName: "Back through the baize door", out: hbRm("hb_bhall") });
for (var s = 0; s < 3; s++) {
dlnBox(g, Rm.hw * 2 - 0.6, 0.05, 0.4, deal, cx, 1.4 + s * 0.5, cz - Rm.hd + 0.25);
for (var i = 0; i < 8; i++)
dlnCyl(g, 0.06, 0.05, 0.18, dlnShine(0xC8C8D0, 0.2, 0.9), cx - 2.6 + i * 0.74, 1.52 + s * 0.5, cz - Rm.hd + 0.25, 8);
}
n14Table(g, cx, cz - 1.3, 1.0, 1.6, 0.85, deal, null);
dlnCyl(g, 0.04, 0.05, 0.2, dlnC(0xF4F0E4), cx, 0.95, cz - 1.3, 8);
jkGasLamp(g, cx + Rm.hw - 0.2, 2.2, cz);
hbHome("hb_mrsb0", "hbmrsb", cx - 1.4, 0.02, cz + 1.4, Math.PI, { name: "Mrs Barrymore", persona: HB_MRSB, greet: "Yes, sir?", room: "hb_bbarry" });
shkSpot(cx, cz, 1.8, "The plate shelves", "look at them", function () { hbTale("🍽️ The butler's pantry", ["The family plate, polished; a scrubbed table; and a candle in a holder, the kind a man might carry to a window at two in the morning."]); });
Rm.hello = "<b>The butler's pantry.</b> The plate on its shelves, a scrubbed table, a candle in a holder.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, oak = dlnShine(0x3A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5034), wall: dlnS("pmpaper", 0x6A6A5A), h: h, ceil: dlnC(0xE8E0CC), outName: "Out to the orchard", out: hbOutM("merripit") });
hbCase(g, cx - Rm.hw + 0.4, cz - 2, Math.PI / 2);
hbCase(g, cx - Rm.hw + 0.4, cz + 1.2, Math.PI / 2);
hbCase(g, cx + 2, cz - Rm.hd + 0.4, 0, 2.2);
dlnFireplace(g, cx - 1.6, cz - Rm.hd + 0.3, 0);
n14Sofa(g, cx - 1.6, cz - 1.4, Math.PI, 0x3A4A5A);
n14Arm(g, cx + 1.4, cz + 0.4, -0.8, 0x5A3A2A);
n14Table(g, cx, cz + 0.6, 0.8, 1.2, 0.72, oak, null);
var net = dlnCyl(g, 0.015, 0.015, 1.6, dlnC(0x6A5A3A), cx + Rm.hw - 0.3, 0.8, cz + 2.4, 5);
net.rotation.z = 0.2;
var nr = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.012, 4, 16), dlnC(0x3A6A3A));
nr.position.set(cx + Rm.hw - 0.12, 1.65, cz + 2.4);
g.add(nr);
hbWin(g, cx + Rm.hw - 0.06, 1.9, cz - 1, 1.4, 1.8, -Math.PI / 2);
n14Gasolier(g, cx, h, cz);
shkSpot(cx + 2, cz - Rm.hd + 1.2, 2.0, "The cases of butterflies", "look at them", function () { hbTale("🦋 The cases of butterflies", ["Moths and butterflies of the moor and of far places, pinned in rows under glass, each with its little written label: the collection of an expert entomologist. 'A Cyclopides!', he cries, and runs off over the mire after one."]); });
hbLinks("hb_merrip", cx, cz, Rm, { hb_mroom: { x: Rm.hw - 1.4, z: Rm.hd - 3 } });
Rm.hello = "<b>Merripit House.</b> A pleasant sitting-room, elegantly furnished: cases of butterflies and moths, books, a fire. From the window, the endless granite-flecked moor.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.2;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5034), wall: dlnS("pmpaper", 0x8A8070), h: h, ceil: dlnC(0xE0D8C4), outName: "Down to the sitting-room", out: hbRm("hb_merrip") });
hbCase(g, cx - Rm.hw + 0.4, cz, Math.PI / 2);
hbCase(g, cx + Rm.hw - 0.4, cz, -Math.PI / 2);
dlnBox(g, Rm.hw * 2, 0.3, 0.3, dlnS("oak", 0x4A3420), cx, h - 0.2, cz - 0.6);
dlnBox(g, 0.24, h, 0.24, dlnS("oak", 0x4A3420), cx, h / 2, cz - 0.6);
shkSolidBox(cx, cz - 0.6, 0.4, 0.4, 0);
hbWin(g, cx, 1.9, cz - Rm.hd + 0.06, 1.0, 1.4, 0);
shkSpot(cx, cz + 1.2, 1.8, "The upright post", "look at it", function () { hbTale("🦋 The locked room", ["Cases of butterflies and moths all round the walls; a beam across the room and an upright post in the middle, a support for the old worm-eaten timber of the roof."]); });
Rm.hello = "<b>The locked room.</b> Small; cases of butterflies all round the walls; a great beam across it, and an upright post in the middle.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.0, oak = dlnShine(0x3A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x5A4028), wall: dlnS("damask", 0x5A3A2A), low: oak, lowH: 1.0, h: h, ceil: dlnC(0xE8E0CC), outName: "Out to the moor", out: hbOutM("lafter") });
for (var b = 0; b < 3; b++)
jkPress(g, cx - 3 + b * 2.2, cz - Rm.hd + 0.4, 0, 2.0);
jkDesk(g, cx + 1.4, cz - 0.6, 0, oak);
n14Chair(g, cx + 1.4, cz + 0.3, Math.PI, oak, 0x6A1A1A);
dlnFireplace(g, cx - Rm.hw + 0.3, cz + 1, Math.PI / 2);
n14Table(g, cx - 2, cz + 2, 0.8, 1.4, 0.76, oak, null);
dlnCyl(g, 0.08, 0.08, 0.6, dlnShine(0xC8C8D0, 0.2, 0.9), cx - 2, 1.0, cz + 2, 8);
for (var s = 0; s < 14; s++)
dlnBox(g, 1.2, 0.2, 0.3, oak, cx + Rm.hw - 1, 0.1 + s * 0.28, cz + Rm.hd - 1.5 - s * 0.26);
shkSpot(cx + Rm.hw - 1, cz - 1.8, 2.0, "The stair to the roof", "go up to the telescope", function () { hbRoof(); });
shkSpot(cx - 3, cz - Rm.hd + 1.2, 2.0, "The law-books", "look at them", function () { hbTale("📚 Mr Frankland's law-books", ["Rows of calf-bound law reports and statutes. Mr Frankland fights cases for the pleasure of fighting: he has opened gates, closed rights of way, and sued the parish of Fernworthy; he spends a fortune on it, and on the whole he is pleased with himself."]); });
hbHome("hb_frank0", "hbfrank", cx + 1.4, 0.02, cz + 0.9, Math.PI, { name: "Mr Frankland", persona: HB_FRANK, greet: "A red-letter day, sir! I have closed Middleton's park, and established a right of way through the Fernworthy oak.", room: "hb_lafter" });
Rm.hello = "<b>Mr Frankland's study at Lafter Hall.</b> Law-books in their presses, papers on the desk, and a stair going up to the roof and his telescope.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("n14stripe", 0xE0D0C0), h: h, ceil: dlnC(0xF0E8DC), outName: "Out to the high street", out: hbOutM("lyons") });
n14Table(g, cx + 1.4, cz - Rm.hd + 1.2, 0.8, 1.4, 0.74, mah, null);
var tw = new THREE.Group();
tw.position.set(cx + 1.4, 0.76, cz - Rm.hd + 1.2);
g.add(tw);
dlnBox(tw, 0.5, 0.14, 0.4, dlnShine(0x141414, 0.4, 0.6), 0, 0.07, 0);
dlnBox(tw, 0.56, 0.06, 0.08, dlnShine(0x141414, 0.4, 0.6), 0, 0.2, -0.14);
dlnBox(tw, 0.3, 0.004, 0.24, dlnC(0xF8F6EE), 0, 0.26, -0.18);
n14Chair(g, cx + 1.4, cz - Rm.hd + 2, Math.PI, mah, 0x3A3A5A);
n14Sofa(g, cx - 1.6, cz, Math.PI / 2, 0x6A3A3A);
n14Arm(g, cx + 2.2, cz + 0.2, -0.9, 0x6A3A3A);
dlnFireplace(g, cx - 0.2, cz - Rm.hd + 0.3, 0);
hbWin(g, cx + Rm.hw - 0.06, 1.8, cz + 0.6, 1.1, 1.6, -Math.PI / 2);
for (var p = 0; p < 3; p++)
n14Pic(g, cx - 2 + p * 1.4, 2.2, cz - Rm.hd + 0.06, 0, 0.6, 0.7, ["#8A9A7A", "#3A4A3A", "#C8A060"]);
shkSpot(cx + 1.4, cz - Rm.hd + 2.2, 1.8, "The typewriter", "look at it", function () { hbTale("⌨️ Mrs Lyons's typewriter", ["A Remington typewriter, the kind that came to England in the 1880s; Mrs Lyons, deserted by her husband, earns her living with it, typing papers for anybody who will pay."]); });
Rm.hello = "<b>Mrs Laura Lyons's sitting-room.</b> Neat and small: a typewriter at the window, a sofa, a few pictures.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.2, deal = dlnS("oak", 0x8A6A44);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A6A50), wall: dlnS("pmpaper", 0x8A7A5A), low: deal, lowH: 1.0, h: h, ceil: dlnC(0xE8E0CC), outName: "Out to the village", out: hbOutM("post") });
wcBar(g, cx, cz - 1.4, 6, 0);
for (var s = 0; s < 3; s++) {
dlnBox(g, Rm.hw * 2 - 0.6, 0.05, 0.4, deal, cx, 1.3 + s * 0.55, cz - Rm.hd + 0.25);
for (var i = 0; i < 10; i++)
dlnBox(g, 0.22, 0.26, 0.2, dlnC([0xC84A2A, 0x2A4A8A, 0xE8C040, 0x6A8A3A, 0xF0E8D8][(i + s) % 5]), cx - 3 + i * 0.66, 1.46 + s * 0.55, cz - Rm.hd + 0.25);
}
var ps = wcSign("POST OFFICE · TELEGRAPH", 2.6, 0.4, "#7A1A1A", "#F4E8C8");
ps.position.set(cx, 2.6, cz - Rm.hd + 0.18);
g.add(ps);
for (var b = 0; b < 3; b++)
dlnBox(g, 0.5, 0.8, 0.5, dlnS("oak", 0x7A5A3A), cx + Rm.hw - 0.6, 0.4, cz + 0.6 + b * 0.7);
hbHome("hb_post0", "hbpost", cx - 1, 0.02, cz - 2.2, 0, { name: "The postmaster", persona: HBL_FOLK.postman.persona, greet: "Morning, sir. Stamps, or the telegraph?", room: "hb_post" });
hbHome("hb_james", "newsboy", cx + 1.6, 0.02, cz + 0.6, -0.6, { name: "James, the postmaster's boy", persona: "You are James, the postmaster's young son at Grimpen, in Conan Doyle's The Hound of the Baskervilles (1889): you took the telegram up to the Hall yourself and gave it to Mrs Barrymore, because Mr Barrymore was up in the loft. " + HBL_ERA, greet: "Yes, sir?", room: "hb_post", child: true });
shkSpot(cx, cz - 0.8, 2.0, "The telegraph", "look at it", function () { hbTale("📠 The telegraph in the corner", ["Holmes's wire came here: 'Is all ready for Sir Henry?' The postmaster gave it to James, his boy, to take up to the Hall; and James gave it to Mrs Barrymore, for Mr Barrymore was up in the loft."]); });
Rm.hello = "<b>The post-office and grocer's at Grimpen.</b> Tins and packets on the shelves, the counter, and the telegraph in the corner.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4, oak = dlnShine(0x3A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: dlnS("pmpaper", 0x5A6A5A), h: h, ceil: dlnC(0xE8E0CC), outName: "Out to the village", out: hbOutM("mortimer") });
jkPress(g, cx - 2, cz - Rm.hd + 0.4, 0, 2.2);
for (var s = 0; s < 6; s++) {
var sk = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), dlnC(0xE8E0C8));
sk.scale.set(1, 0.9, 1.2);
sk.position.set(cx - 2.8 + (s % 3) * 0.8, 1.45 + ((s / 3) | 0) * 0.4, cz - Rm.hd + 0.35);
g.add(sk);
}
jkDesk(g, cx + 1.6, cz - 1, 0, oak);
n14Chair(g, cx + 1.6, cz - 0.1, Math.PI, oak, 0x3A3A3A);
dlnFireplace(g, cx - Rm.hw + 0.3, cz + 1, Math.PI / 2);
n14Arm(g, cx - 1.4, cz + 1.4, 0.8, 0x4A3A2A);
shkSpot(cx - 2, cz - Rm.hd + 1.2, 2.0, "Dr Mortimer's skulls", "look at them", function () { hbTale("💀 Dr Mortimer's skulls", ["'You interest me very much, Mr Holmes. I had hardly expected so dolichocephalic a skull or such well-marked supra-orbital development. Would you have any objection to my running my finger along your parietal fissure?'"]); });
hbHome("hb_spaniel", "hbcart", cx, 0.02, cz, 0, { room: "hb_mortimer" }).g.visible = false;
Rm.hello = "<b>Dr Mortimer's house.</b> A country doctor's room: a desk, a fire, and a case full of skulls.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("stone", 0x6A6458), wall: hbGraniteWall(1), h: h, ceil: dlnC(0x4A4A32), outName: "Out onto the tor", out: hbOutM("blacktor") });
dlnBox(g, 0.9, 0.12, 1.9, dlnC(0x3A3A2E), cx - 1.4, 0.06, cz - 1);
dlnBox(g, 0.8, 0.08, 1.8, dlnC(0x6A5A4A), cx - 1.4, 0.16, cz - 1);
for (var s = 0; s < 6; s++)
dlnBox(g, 0.3, 0.3, 0.3, dlnS("stone", 0x7A7468), cx + 1.2 + (s % 3) * 0.3, 0.15, cz - 1.6 + ((s / 3) | 0) * 0.6);
dlnBox(g, 0.5, 0.06, 0.3, dlnC(0x3A3A3E), cx + 1.5, 0.36, cz - 1.3);
dlnBox(g, 1.0, 0.12, 0.7, dlnS("stone", 0x8A8478), cx + 0.4, 0.6, cz + 0.4);
for (var t = 0; t < 4; t++)
dlnCyl(g, 0.05, 0.05, 0.12, dlnShine(0xB8B8C0, 0.3, 0.8), cx + 0.1 + t * 0.2, 0.72, cz + 0.4, 8);
dlnCyl(g, 0.14, 0.12, 0.3, dlnC(0x5A5A5E), cx + 1.6, 0.15, cz + 1.0, 10);
shkSpot(cx + 0.4, cz + 0.6, 1.4, "The stone slab", "look at what is on it", function () { hbTale("🍞 Someone lives here", ["A loaf of bread, a tinned tongue, two tins of preserved peaches; a pan, a bucket half-full of water; blankets rolled in a waterproof. Somebody is living out here on the moor, and is watching."]); });
Rm.hello = "<b>The stone hut.</b> Round, dim, smelling of peat smoke: a bed of blankets, a fireplace of stones, a slab for a table.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("stone", 0x5A5448), wall: hbGraniteWall(2), h: h, ceil: dlnC(0x2A2A28), outName: "Out of the cleft", out: hbOutM("selden") });
dlnBox(g, 1.0, 0.1, 1.8, dlnC(0x3A3428), cx - 1.2, 0.05, cz - 1.2);
for (var b = 0; b < 5; b++)
dlnBox(g, 0.1, 0.04, 0.1, dlnC(0x6A5A44), cx + 0.4 + b * 0.2, 0.02, cz - 1.4);
var c = dlnCyl(g, 0.06, 0.06, 0.14, dlnC(0xF4F0E4), cx + 1.2, 0.07, cz - 2.2, 8);
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), dlnGlow(0xFFB040));
fl.position.set(cx + 1.2, 0.2, cz - 2.2);
g.add(fl);
shkSpot(cx, cz, 1.6, "The bed of bracken", "look at it", function () { hbTale("🪨 The convict's cave", ["A bed of bracken and an old coat, bones of sheep, a tin or two, and a stub of candle stuck on a stone: all the comforts of a man the whole county hunts."]); });
Rm.hello = "<b>A cleft in the rocks.</b> Low and close: a bed of bracken and an old coat, bones, and a stub of candle stuck on a stone.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0x7A766C), wall: dlnS("pmpaper", 0x8A6A4A), low: dlnS("oak", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0x3A2A1A), outName: "Out to the high street", out: hbOutM("inn") });
wcBar(g, cx, cz - Rm.hd + 2.0, 7, 0);
hbStoneHearth(g, cx - Rm.hw + 0.45, cz + 1, Math.PI / 2, 2.6);
for (var b = 0; b < 3; b++)
wcBench(g, cx + 1.6, cz + 0.2 + b * 1.6, 3, 0);
for (var t = 0; t < 6; t++)
dlnBox(g, 0.8, 0.02, 0.04, dlnC(0x3A2A1A), cx - 2 + t * 0.8, h - 0.4, cz);
hbStag(g, cx, 2.4, cz - Rm.hd + 0.06, 0);
hbHome("hb_land", "jkshop", cx - 1, 0.02, cz - Rm.hd + 1.2, 0, { name: "The landlord", persona: HBL_FOLK.landlord.persona, greet: "What'll it be? Cider, or a pint of the best?", room: "hb_inn" });
[["hbfarm", 1.6, 0.6, Math.PI], ["hbfarm", 2.4, 2.2, -0.6], ["hbmoorw", -1.2, 1.6, 0.6], ["hbfarm", 1, 3.6, 0]].forEach(function (q, i) { if (SHK.lite && i > 1)
return; hbHome("hb_innf" + i, q[0], cx + q[1], 0.02, cz + q[2], q[3], { room: "hb_inn" }); });
shkSpot(cx, cz - 0.6, 2.2, "The bar", "look about", function () { hbTale("🍺 The inn at Coombe Tracey", ["Low beams, a peat fire, cider and talk of the convict. Holmes, the book says later, stayed mostly at Coombe Tracey."]); });
Rm.hello = "<b>The inn at Coombe Tracey.</b> Low beams, a peat fire, the bar, and moormen over their cider.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("stone", 0x5A5448), wall: hbGraniteWall(2), h: h, ceil: dlnC(0x2A2420), outName: "Out onto the island", out: hbOutM("island") });
dlnBox(g, 0.08, 0.3, 0.08, dlnShine(0x5A5A5E, 0.5, 0.6), cx - Rm.hw + 0.2, 0.6, cz - 1);
for (var c = 0; c < 8; c++) {
var lk = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 4, 8), dlnShine(0x4A4A4E, 0.5, 0.6));
lk.position.set(cx - Rm.hw + 0.3 + c * 0.08, 0.5 - c * 0.05, cz - 1);
lk.rotation.y = c % 2 ? 1.57 : 0;
g.add(lk);
}
for (var b = 0; b < 7; b++) {
var bn = dlnCyl(g, 0.025, 0.03, 0.3, dlnC(0xE8E0C8), cx - 1 + b * 0.24, 0.04, cz - 0.4 + (b % 3) * 0.2, 5);
bn.rotation.z = 1.57;
bn.rotation.y = b;
}
dlnCyl(g, 0.12, 0.12, 0.1, dlnShine(0xB8B8C0, 0.3, 0.8), cx + 1.2, 0.05, cz - 1.6, 12);
var paste = new THREE.Mesh(new THREE.CircleGeometry(0.1, 12), dlnGlow(0x9AFFB0));
paste.rotation.x = -Math.PI / 2;
paste.position.set(cx + 1.2, 0.11, cz - 1.6);
g.add(paste);
shkSpot(cx + 1.2, cz - 1.2, 1.4, "A tin of paste", "look at it", function () { hbTale("🫙 The tin", ["A tin containing a curious paste: phosphorus, which shines in the dark. 'A cunning preparation of it.' It is how the hound was made to look like a creature of fire."]); });
Rm.hello = "<b>The miners' hut.</b> Dark and foul: a staple and a chain in the wall, gnawed bones on the floor, a tin of something that glimmers.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : hbbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? hbbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = hbbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
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
var W = hbbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = HBB_CH[hbbS().ch], ix = hbbS().s, d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who && !(d.from != null && ix < d.from) && !(d.until != null && ix >= d.until); })[0] : null;
if (d0 && d0.at !== at)
return hbbPos(d0.at);
}
if (at.spot) {
var Sp = hbbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = HBB.cast[at.cast], q = c && c.g && c.g.parent ? hbbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: hbbAreaAt(q.x, q.z) };
}
if (at.room)
return hbbRoomPt(at.room, at.lx, at.lz);
if (at.mo && HBM_PLACES[at.mo]) {
var M = HBM_PLACES[at.mo], mx = M.x + (at.dx || 0), mz = M.z + (at.dz || 0);
return { x: hmX(mx), z: hmZ(mz), y: hmH(mx, mz), area: "hb:moor", name: M.name };
}
if (at.at && HBL_PLACES[at.at]) {
var A = HBL_PLACES[at.at], ax = hbX(A.x + (at.dx || 0)), az = hbZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: 0, area: "hb:ldn" };
}
if (at.x != null && at.m) {
return { x: hmX(at.x), z: hmZ(at.z), y: at.y != null ? at.y : hmH(at.x, at.z), area: "hb:moor", name: at.name };
}
if (at.x != null) {
var x = hbX(at.x), z = hbZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : 0, area: hbbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
var inA = area.indexOf("in:") === 0, inP = P.area.indexOf("in:") === 0, la = hbbLand(area), lp = hbbLand(P.area);
if (inA) {
var here = area.slice(3);
if (inP) {
var path = hbbRoomPath(here, P.area.slice(3));
if (path && path.length > 1) {
var sp = hbbLinkSpot(here, path[1]);
if (sp)
return { show: sp, way: " (through the door)" };
}
}
if (here === "hb_padd" && lp === "moor")
return { show: hbbPos({ spot: "The 10.30 for Devon" }) || hbbRoomExit(), way: " (the train for Devon)" };
if (HBL_CABROOM[here] || here === "ws_baker")
return { show: hbbRoomExit(), way: lp === "moor" ? " (out to a cab: to Paddington, and the train for Devon)" : " (out to a cab)" };
return { show: hbbRoomExit(), way: " (go out)" };
}
if (la === "moor" && lp !== "moor")
return { show: hbbStationPt(), way: " (the train back to London, at the station)" };
if (la !== "moor" && lp === "moor") {
if (la === "ldn")
return { show: hbbCabPt(), way: " (take a cab: to Paddington, and the train for Devon)" };
return { show: null, way: " (any London cab rank: To Paddington; or the 🎭 menu)" };
}
if (la === "moor") {
if (inP) {
var dr = hbbDoorRoom(P.area.slice(3)), D = dr && hbbRoomDoor(dr);
if (D)
return { show: D, way: hbbFar(D) ? " (go in; or the wagonette)" : " (go in)" };
}
return { show: P, way: "" };
}
if (inP) {
var k = P.area.slice(3);
if (HBL_CABROOM[k]) {
if (la === "ldn")
return { show: hbbCabPt(), way: " (take a cab: to " + HBL_CABROOM[k] + ")" };
return { show: null, way: " (any London cab rank: to " + HBL_CABROOM[k] + ")" };
}
var D2 = hbbRoomDoor(hbbDoorRoom(k) || k);
if (D2 && D2.area === area)
return { show: D2, way: " (go in)" };
if (la === "ldn")
return { show: hbbCabPt(), way: " (take a cab)" };
return { show: null, way: " (any London cab rank: To the Northumberland Hotel; or the 🎭 menu)" };
}
if (lp === "ldn") {
return { show: null, way: " (any London cab rank: To the Northumberland Hotel; or the 🎭 menu)" };
}
return { show: null, way: " (the 🎭 menu)" };
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
if (HBB.beam && HBB.beam.parent)
return HBB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
HBB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "orchid":
m = wCyl(0.008, 0.008, 0.3, wM(0x4A6A2A), 0, 0.15, 0, g, 5);
[[0, 0.3, 0], [0.04, 0.27, 0.02], [-0.04, 0.26, 0.01]].forEach(function (p) { var f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), wM(0xB86AA8)); f.scale.set(1.2, 0.7, 1); f.position.set(p[0], p[1], p[2]); g.add(f); });
break;
case "stub":
m = wCyl(0.008, 0.008, 0.05, wM(0xF0ECE0), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
wCyl(0.0085, 0.0085, 0.012, wM(0x8A5A2A), 0.028, 0.01, 0, g, 6).rotation.z = Math.PI / 2;
break;
case "stick":
m = wBox(0.03, 0.03, 1.0, wM(0x5A3A1E), 0, 0.03, 0, g);
wBox(0.05, 0.05, 0.06, wM(0xC0C0C8, { m: 0.9, r: 0.25 }), 0, 0.03, 0.42, g);
wSph(0.045, wM(0x5A3A1E), 0, 0.04, -0.5, g, 8);
break;
case "boot":
m = wBox(0.1, 0.12, 0.28, wM(0x6A3A1A, { r: 0.5 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x6A3A1A, { r: 0.5 }), 0, 0.18, -0.09, g);
break;
case "oldboot":
m = wBox(0.1, 0.12, 0.28, wM(0x141414, { r: 0.6 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x141414, { r: 0.6 }), 0, 0.18, -0.09, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.2, wM(0xF4EEDC), 0, 0.01, 0, g);
for (var q = 0; q < 5; q++)
wBox(0.1 - q * 0.01, 0.006, 0.012, wM(0x2A2A2A), 0, 0.012, -0.06 + q * 0.03, g);
break;
case "scrap":
m = wBox(0.12, 0.004, 0.08, wM(0x4A3A2A), 0, 0.01, 0, g);
wBox(0.06, 0.006, 0.014, wM(0xE8E0C8), 0, 0.012, 0, g);
break;
case "telegram":
m = wBox(0.16, 0.004, 0.1, wM(0xE8DCC0), 0, 0.01, 0, g);
wBox(0.12, 0.006, 0.02, wM(0x3A5A8A), 0, 0.012, -0.03, g);
break;
case "manuscript":
m = wBox(0.22, 0.03, 0.28, wM(0xE0CCA0), 0, 0.015, 0, g);
wBox(0.2, 0.034, 0.04, wM(0x6A2A1A), 0, 0.017, -0.08, g);
break;
case "photo":
m = wBox(0.1, 0.006, 0.14, wM(0x8A7A60), 0, 0.01, 0, g);
break;
case "ash":
m = wBox(0.04, 0.01, 0.04, wM(0x8A8A86), 0, 0.005, 0, g);
wCyl(0.012, 0.012, 0.08, wM(0x6A4A2A), 0.04, 0.01, 0, g, 6);
break;
case "tin":
m = wCyl(0.05, 0.05, 0.07, wM(0xB8B8C0, { m: 0.8, r: 0.3 }), 0, 0.035, 0, g, 12);
break;
case "net":
m = wBox(0.02, 0.02, 1.2, wM(0x6A5A3A), 0, 0.02, 0, g);
wSph(0.18, wM(0x3A6A3A, { r: 0.9 }), 0, 0.05, 0.6, g, 8);
break;
case "violin":
m = wSph(0.12, wM(0x8A4A1A, { r: 0.3 }), 0, 0.05, 0, g, 10);
m.scale.set(1, 0.3, 1.7);
wBox(0.035, 0.02, 0.32, wM(0x1A1010), 0, 0.06, 0.36, g);
break;
case "times":
m = wBox(0.3, 0.01, 0.4, wM(0xE8E2D2), 0, 0.005, 0, g);
for (var q2 = 0; q2 < 6; q2++)
wBox(0.24, 0.012, 0.01, wM(0x3A3A3A), 0, 0.007, -0.15 + q2 * 0.06, g);
break;
case "print":
m = wBox(0.18, 0.01, 0.3, wM(0x3A2A1A), 0, 0.005, 0, g);
break;
case "cane":
m = wBox(0.03, 0.03, 0.9, wM(0x3A2414), 0, 0.03, 0, g);
wSph(0.04, wM(0xC8A048, { m: 0.8, r: 0.3 }), 0, 0.04, 0.45, g, 8);
break;
case "halfcane":
m = wBox(0.03, 0.03, 0.45, wM(0x3A2414), 0, 0.03, 0, g);
break;
case "key":
m = wBox(0.02, 0.006, 0.1, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g);
wCyl(0.025, 0.025, 0.006, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, -0.06, g, 10);
break;
case "chequebook":
m = wBox(0.16, 0.02, 0.08, wM(0x3A6A3A), 0, 0.01, 0, g);
break;
case "purse":
m = wSph(0.05, wM(0x2A1A10), 0, 0.04, 0, g, 8);
m.scale.set(1.3, 0.7, 1);
break;
case "watch":
m = wCyl(0.03, 0.03, 0.01, wM(0xC8A048, { m: 0.9, r: 0.25 }), 0, 0.01, 0, g, 14);
break;
case "envelope":
m = wBox(0.18, 0.004, 0.11, wM(0xF2EADA), 0, 0.01, 0, g);
wBox(0.03, 0.006, 0.03, wM(0x8A1A1A), 0, 0.012, 0, g);
break;
case "phial":
m = wCyl(0.025, 0.03, 0.11, wM(0xC8D8E8, { e: 0x8A2A3A, ei: 0.3 }), 0, 0.055, 0, g, 8);
break;
case "powder":
m = wBox(0.07, 0.01, 0.05, wM(0xF4F0E8), 0, 0.005, 0, g);
break;
case "drawer":
m = wBox(0.45, 0.18, 0.35, wM(0x4A2414), 0, 0.09, 0, g);
wBox(0.4, 0.02, 0.3, wM(0xF4F0E8), 0, 0.16, 0, g);
break;
case "axe":
m = wBox(0.04, 0.04, 0.8, wM(0x8A6A44), 0, 0.03, 0, g);
wBox(0.14, 0.03, 0.16, wM(0x6A6A70, { m: 0.8, r: 0.35 }), 0, 0.03, 0.4, g);
break;
case "poker":
m = wBox(0.02, 0.02, 0.7, wM(0x2A2A2E, { m: 0.8, r: 0.4 }), 0, 0.02, 0, g);
break;
case "candle":
m = wCyl(0.02, 0.02, 0.16, wM(0xF4F0E4), 0, 0.08, 0, g, 8);
wSph(0.02, wM(0xFFD890, { e: 0xFFA040, ei: 0.8 }), 0, 0.18, 0, g, 6);
break;
case "salt":
m = wCyl(0.035, 0.035, 0.08, wM(0xF4F0F8, { e: 0x6A4A8A, ei: 0.2 }), 0, 0.04, 0, g, 10);
break;
case "book":
m = wBox(0.16, 0.04, 0.22, wM(0x5A1A1A), 0, 0.02, 0, g);
break;
default: return typeof jkbItemMesh === "function" ? jkbItemMesh(kind) : g;
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = hbbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (HBB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
HBB.items = HBB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[hbb] take", e);
}
}, (P.y || 0));
I.S.hbb = 1;
HBB.items.push(I);
return I;
},
function (k) {
if (HBB.tuneKey === k)
return;
HBB.tuneKey = k;
var old = HBB.tune;
HBB.tune = null;
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
if (!k || !HBB_TUNES[k])
return;
try {
var A = new Audio(HBB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
HBB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (HBB.tune !== A) {
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
if (HBB.text)
return fn(HBB.text);
if (HBB.textWait) {
HBB.textWait.push(fn);
return;
}
HBB.textWait = [fn];
var done = function (B) { HBB.text = B; var w = HBB.textWait; HBB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/hound/hound.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
hbbText(function (B) {
var C = HBB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(hbbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); HBB.readOpen = 0; HBB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = hbbS(), C = HBB_CH[S.ch];
if (!C)
return;
HBB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
HBB.readAsk = 0;
HBB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(C.src || "Arthur Conan Doyle, The Hound of the Baskervilles (1902)") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + (C.more ? C.more.map(function (p) { return "<p style='margin:6px 0;opacity:.88'>" + esc(p) + "</p>"; }).join("") : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? hbbOpening(T).map(hbbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); HBB.readOpen = 0; hbbStepDone(); }, all: function () { hbbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += hbbKeeperBtns(fns);
worldCard(b, fns);
};
hbbText(show);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
HBB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); hbbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = hbbS(), C = HBB_CH[S.ch];
if (!C)
return;
if (C.moor)
hbmBuild();
else
hblBuild();
hbbItemsClear();
hbbCastClear();
HBB.hold = 0;
if (place && C.start)
hbbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[hbb] setup", S.ch, e);
}
hbbTune(C.tune || null);
hbbStepBegin();
},
function () {
var b = hbbStep();
hbbItemsClear();
HBB.hold = 0;
HBB.puzOpen = 0;
if (!b)
return;
if (hbbAgeSkip(b)) {
hbbStepDone();
return;
}
b._key = hbbKey();
try {
if (b.on)
b.on(hbbS().f);
}
catch (e) {
if (window.console)
console.warn("[hbb] on", e);
}
if (b.k === "read") {
hbbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { HBB.rew[k] = 0; });
if (b.k === "find")
hbbItemAdd(b.item, hbbPos(b.at), b.name, b.verb, function () { if (hbbKey() === b._key)
hbbStepDone(); });
if (b.k === "gather") {
var P = hbbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(hbbS().ch * 97 + hbbS().s * 13 + 7);
HBB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
hbbItemAdd(b.item, Q, b.name, b.verb, function () { if (hbbKey() !== b._key)
return; HBB.got++; try {
if (b.each)
b.each(HBB.got);
}
catch (e) { } if (HBB.got < n) {
hbbSay((b.eachSay || "Got one.") + " " + HBB.got + " of " + n + ".");
return;
} hbbStepDone(); });
}
}
if (b.h)
hbbSay("<b>" + esc(HBB_CH[hbbS().ch].t) + ".</b> " + b.h);
},
function (b) {
HBB.puzOpen = 1;
HBB.puzT = performance.now();
var k = hbbKey(), fns = {}, h = HBB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
hbbSay(b.yes);
if (hbbKey() === k)
hbbStepDone();
return;
}
hbbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (hbbKey() === k)
HBB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = hbbS(), C = HBB_CH[S.ch], b = hbbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[hbb] done", e);
}
if (b.say)
hbbSay(b.say);
S.s++;
if (window.HBB_LOG)
HBB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= HBB_CH.length - 1) {
S.done = 1;
S.s = 0;
hbbSave();
hbbItemsClear();
hbbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
hbbSave();
var nx = HBB_CH[S.ch];
setTimeout(function () { try {
hbbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[hbb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
hbbSave();
hbbStepBegin();
},
function () {
hbbTune("violin");
var S = hbbS();
var b = "<h3 style='margin:4px 0'>The Hound of the Baskervilles</h3><p>'And now, my dear Watson, we have had some weeks of severe work, and for one evening, I think, we may turn our thoughts into more pleasant channels. I have a box for Les Huguenots. Have you heard the De Reszkes? Might I trouble you then to be ready in half an hour, and we can stop at Marcini's for a little dinner on the way?'</p><p>Sir Henry and Dr Mortimer have gone round the world for his nerves; the Hall waits for him. The mire has kept Stapleton. You have played the whole of Conan Doyle's book, every chapter, from the stick left in Baker Street to the last night in the fog.</p><p style='font-size:12px;opacity:.75'>The story, its people and its words are Arthur Conan Doyle's (1902). The young friend of Dr Watson you played, the folk of the moor and the hands-on clues are added to let you walk through it. The book's own words are in each chapter's 📜 Read the whole chapter.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; hbbSave(); hbbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "The stick left behind in Baker Street");
worldCard(b, fns);
},
function () {
var S = hbbS(), C = HBB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle, 1902 · the whole book, all fifteen chapters</div><h3 style='margin:4px 0'>🐕 The Hound of the Baskervilles</h3>";
if (S.done)
b += "<p>You have played the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((hbbStep() || {}).h || "") + "</p>";
else
b += "<p>London, 1889. You are a young medical student who helps Dr Watson at his practice, and so you are in the sitting-room at 221B Baker Street on the morning a visitor's walking-stick is found by the fire. Its owner, Dr Mortimer of Dartmoor, comes back for it, with an old manuscript about a hound from hell, and a death that has just happened at Baskerville Hall.</p><p style='font-size:12px;opacity:.75'>Conan Doyle's own book, every chapter: London, then the train to Dartmoor and the moor itself. For every age.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Mr Sherlock Holmes", S.started ? "Back to where you were" : "221B Baker Street, a morning in 1889");
fns.go = function () { worldCard(null); hbbBegin(); };
}
else {
b += worldBtn("again", "Play it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; hbbSave(); hbbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += hbbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = HBB.cast[c.key];
if (hbbCastLive(C))
return C;
var P = hbbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? (P.area === "hb:moor" ? HBM.live : HBL.live) : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = hbPerson("hbb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
if (c.up != null && P.area === "hb:moor" && !inside) {
var UL = hmLocal(px, pz);
py = hmH(UL.x, UL.z) + c.up;
}
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "hbb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (P.area === "hb:moor" && !inside && c.up == null)
hbMoorGround(Q);
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || HBL_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
hbbWrapT(T);
}
HBB.cast[c.key] = { g: g, P: Q, c: c };
return HBB.cast[c.key];
},
function () {
var C = HBB_CH[hbbS().ch];
if (!C || !C.cast)
return;
var b = hbbStep() || {}, idx = hbbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
var Lv = HBB.cast[c.key];
if (Lv && Lv.c === c)
hbbCastDrop(c.key);
return;
}
if (HBB.gone && HBB.gone[c.key] != null && (c.from || 0) <= HBB.gone[c.key])
return;
if (hbbCastLive(HBB.cast[c.key]))
return;
var P = hbbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (hbbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
hbbPerson(c);
});
},
function (T) {
if (!hbbActive() || !hbZoneNow())
return false;
var b = hbbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = hbbKey();
worldPrompt(null);
var next = function () { if (hbbKey() === k)
hbbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(HBB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
HBB.wt += dt;
if (HBB.wt > 0.5) {
HBB.wt = 0;
hbbWrap();
if (hbbActive())
hbbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!hbbActive()) {
if (HBB.beam)
HBB.beam.visible = false;
if (!busy)
worldPrompt("🐕 <b>The Hound of the Baskervilles</b> · <b>press E</b> for Conan Doyle's book", hbbOpen);
return;
}
var S = hbbS(), b = hbbStep(), L = worldLocal(), t = SHK.t || 0, area = hbbAreaAt(L.x, L.z);
HBB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? hbbPos(b.at) : null, W = P ? hbbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = hbbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = hbbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = hbbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? hbbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (HBB.readAsk)
break;
if (!HBB.readOpen)
hbbChapterCard();
else {
HBB.readOpen = 0;
hbbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
hbbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
HBB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(HBB.hold, dt);
}
catch (e) { }
if (HBB.hold >= (b.sec || 8)) {
hbbStepDone();
return;
}
}
else
HBB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return HBB.rew[k]; })) {
hbbStepDone();
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
hbbStepDone();
return;
}
break;
}
case "puzzle":
if ((!HBB.puzOpen || performance.now() - (HBB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
hbbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🐕 <b>The Hound of the Baskervilles</b> · <b>press E</b> for the book", hbbOpen);
var C = HBB_CH[S.ch], prog = b && b.k === "hold" && HBB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - HBB.hold)) + " s)" : b && b.k === "gather" ? " (" + (HBB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🐕 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function (t) { if (t > 5 && t < 5.6)
hbbSay("Far away a chiming clock strikes the quarters. Otherwise a deathly silence."); if (t > 12 && t < 12.6) {
hbbSay("And then, in the very dead of the night: the sob of a woman. The muffled, strangling gasp of one torn by an uncontrollable sorrow. In the house.");
try {
hbSob();
}
catch (e) { }
} },
function () {
var g = new THREE.Group();
var p = hbPerson("hb_tor", "hbholmes", { beard: "none" });
p.scale.set(1.15, 1.15, 1.15);
g.add(p);
var mm = new THREE.MeshBasicMaterial({ color: 0xF4F2E0, transparent: true, opacity: 0.92, fog: false, depthWrite: false });
var moon = new THREE.Mesh(new THREE.CircleGeometry(9, 40), mm);
moon.position.set(0, 6, -30);
g.add(moon);
g.userData.keep = 1;
return g;
},
function () {
var g = new THREE.Group();
var p = hbPerson("hb_body", "hbhenry", { beard: "full", hair: "dark" });
p.rotation.x = -Math.PI / 2;
p.rotation.z = 0.5;
p.position.set(0, 0.22, 0.8);
g.add(p);
var pool = new THREE.Mesh(new THREE.CircleGeometry(0.7, 18), new THREE.MeshBasicMaterial({ color: 0x2A0806, transparent: true, opacity: 0.7, depthWrite: false }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(0, 0.03, -0.2);
g.add(pool);
g.userData.keep = 1;
return g;
},
function (t) { if (t > 2 && t < 2.6)
hbbSay("Long slopes golden-green on one side and grey shadow on the other; Belliver and Vixen Tor jutting out of the haze. One great grey bird soars in the blue. No sound, no movement. And below, in a cleft of the hills, a circle of the old stone huts; in the middle, one with roof enough to screen a man from the weather."); },
function (t) { if (t > 2 && t < 2.6)
hbbSay("Outside the west blazes scarlet and gold; the pools of the Great Grimpen Mire shoot it back in ruddy patches. There the two towers of the Hall; there the smoke of Grimpen; behind the hill, the Stapletons."); if (t > 8 && t < 8.6)
hbbSay("Far away, the sharp clink of a boot on a stone. Then another, and another, nearer and nearer. A pause. Then a shadow falls across the opening of the hut."); },
function (t) { if (t > 0.5 && t < 1.0 && typeof hbScream === "function")
hbScream(0.8); if (t > 2.5 && t < 3.0 && typeof hbHowl === "function")
hbHowl(0.7); if (t > 3 && t < 3.6)
hbbSay("Again the agonised cry, louder and much nearer. And with it a deep, muttered rumble, musical and yet menacing, rising and falling like the low murmur of the sea. 'The hound!' cries Holmes. 'Come, Watson, come! Great heavens, if we are too late!'"); },
function (t) { if (t > 2 && t < 2.6)
hbbSay("'Our case becomes rounded off, and difficulty after difficulty thins away in front of us. Even now we have no clear case against this very wily man. But I shall be very much surprised if it is not clear enough before we go to bed this night.'"); if (t > 7 && t < 7.6)
hbbSay("🚂 The London express comes roaring into the station; a small, wiry bulldog of a man springs from a first-class carriage."); },
function (key, pts, sec, cb) {
var C = HBB.cast[key];
if (!C || !C.g)
return;
var g = C.g, L = [0], i;
for (i = 1; i < pts.length; i++)
L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
var tot = L[L.length - 1] || 1, t0 = performance.now(), T = (sec || 6) * 1000;
g.userData.running = 1;
var iv = setInterval(function () {
if (!g.parent) {
clearInterval(iv);
return;
}
var k = Math.min(1, (performance.now() - t0) / T), d = k * tot, j = 1;
while (j < L.length - 1 && L[j] < d)
j++;
var a = pts[j - 1], b = pts[j], f = (d - L[j - 1]) / Math.max(0.001, L[j] - L[j - 1]), x = a[0] + (b[0] - a[0]) * f, z = a[1] + (b[1] - a[1]) * f;
g.position.set(hmX(x), hmH(x, z) + (C.c && C.c.kind === "thing" ? 0 : 0.14), hmZ(z));
g.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]);
if (k >= 1) {
clearInterval(iv);
g.userData.running = 0;
if (cb)
cb();
}
}, 40);
},
function () {
var g = new THREE.Group(), st = dlnS("stone", 0x7A766C);
dlnBox(g, 4, 2.4, 3, st, 0, 1.2, 0);
var r = dlnBox(g, 4.4, 0.2, 3.6, dlnS("slate", 0x3A3A42), 0, 2.6, 0);
r.rotation.z = 0.12;
dlnBox(g, 1.0, 1.9, 0.08, dlnC(0x3A2A1A), 0, 0.95, -1.54);
dlnBox(g, 0.1, 0.1, 0.12, dlnShine(0x5A5A5E, 0.5, 0.6), 0.3, 1.0, -1.6);
g.userData.keep = 1;
return g;
},
function () { var g = new THREE.Group(), gr = dlnS("granite", 0x6A6A62); [[0, 0, 1.6], [1.8, 0.6, 1.1], [-1.6, 0.8, 1.3], [0.6, -1.4, 0.9]].forEach(function (p) { var m = new THREE.Mesh(new THREE.IcosahedronGeometry(p[2], 0), gr); m.position.set(p[0], p[2] * 0.55, p[1]); m.rotation.set(p[0], p[1], p[2]); g.add(m); }); g.userData.keep = 1; return g; },
function () {
var g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xE8ECEE, transparent: true, opacity: 0.34, depthWrite: false, side: THREE.DoubleSide });
for (var i = 0; i < 16; i++) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(26, 5 + (i % 3) * 1.5), m);
p.position.set((i - 8) * 9, 2.4 + (i % 2) * 0.8, (i % 4) * 3);
p.rotation.y = (i % 5 - 2) * 0.12;
g.add(p);
}
g.userData.keep = 1;
return g;
},
function () {
var g = new THREE.Group(), bone = dlnC(0xE4DCC4);
for (var i = 0; i < 9; i++) {
var r = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 4, 10, Math.PI), bone);
r.position.set(-0.2 + i * 0.05, 0.06, 0);
r.rotation.y = Math.PI / 2;
g.add(r);
}
dlnCyl(g, 0.012, 0.012, 0.5, bone, 0, 0.05, 0, 5).rotation.z = Math.PI / 2;
var sk = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), bone);
sk.scale.set(1.4, 0.9, 1);
sk.position.set(0.32, 0.06, 0);
g.add(sk);
for (var h = 0; h < 5; h++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.014, 4, 8), dlnC(0x6A3A1A));
t.position.set(-0.1 + h * 0.08, 0.04, 0.08 * (h % 2 ? 1 : -1));
t.rotation.x = Math.PI / 2;
g.add(t);
}
g.userData.keep = 1;
return g;
},
function (t) { if (t > 1 && t < 1.6)
hbbSay("Only two men: Sir Henry and Stapleton, profiles to you on either side of the round table, cigars, coffee and wine. Stapleton talks with animation; the baronet looks pale and distrait."); if (t > 4 && t < 4.6) {
hbbSay("Stapleton rises and leaves the room. The creak of a door; the crisp sound of boots upon gravel...");
hqRun("stapo", [[44, 50], [60, 47], [78, 41]], 3.4, function () { setTimeout(function () { if (typeof hbHowl === "function")
hbHowl(0.18); hqRun("stapo", [[78, 41], [60, 47], [44, 50]], 3.2); }, 1800); });
} if (t > 7 && t < 7.6)
hbbSay("A key turns in the lock of an out-house in the corner of the orchard. A curious scuffling noise from within. A minute; the key again; he passes you and goes back in to his guest."); },
function (t) { if (t > 1 && t < 1.6)
hbbSay("'It's moving towards us, Watson.' 'Is that serious?' 'Very serious indeed: the one thing upon earth which could have disarranged my plans. It is already ten o'clock. Our success and even his life may depend upon his coming out before the fog is over the path.'"); if (t > 6 && t < 6.6)
hbbSay("The fog-wreaths come crawling round both corners of the house; the upper floor and the roof float on it like a strange ship upon a shadowy sea. Holmes strikes his hand on the rock and stamps his feet."); },
function (t) { if (t > 1.5 && t < 2.1) {
hbbSay("'Thank God, I think that I hear him coming.' Quick steps. Through the fog, as through a curtain, steps Sir Henry. He looks round in surprise at the clear starlit night, then comes swiftly on along the path, glancing over either shoulder.");
hqRun("hen", [[40, 50], [50, 40], [100, 0], [126, -30], [150, -60], [168, -80]], 13);
} },
function (t) { if (t > 1 && t < 1.5) {
if (typeof hbHowl === "function")
hbHowl(1);
hqRun("hound", [[58, 34], [100, 0], [128, -30], [150, -58], [162, -74]], 5.5);
hbbSay("A hound it was, an enormous coal-black hound, but not such a hound as mortal eyes have ever seen. Fire bursts from its open mouth; its eyes glow with a smouldering glare; its muzzle and hackles and dewlap are outlined in flickering flame. Lestrade yells and throws himself face down.");
} },
function (x, z) {
var best = null, bd = 40;
for (var k in HBM_PLACES) {
var P = HBM_PLACES[k], d = Math.hypot(x - P.x, z - P.z);
if (d < bd) {
bd = d;
best = P.name;
}
}
if (best)
return best;
for (var i = 0; i < HBM_TOR.length; i++) {
var T = HBM_TOR[i];
if (Math.hypot(x - T.x, z - T.z) < T.s * 1.6)
return T.n;
}
if (hmMireN(x, z) < 0.97)
return hmOnWands(x, z) ? "the wands across the Great Grimpen Mire" : "the Great Grimpen Mire";
return "the open moor";
},
function () {
var b = "", fns = {}, go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); fn(); }; };
go("ht", "🏨", "To the Northumberland Hotel", "Sir Henry's hotel, off Trafalgar Square", function () { hbGo("hotel", "🐴 <b>Northumberland Street.</b> The Northumberland Hotel, where Sir Henry Baskerville lost a boot, and then another."); });
go("rs", "🛍️", "To Regent Street", "The shop windows; the cab with the black beard in it", function () { hbGo("shop", "🐴 <b>Regent Street.</b> Shop windows, omnibuses, hansoms by the dozen."); });
go("bk", "🔎", "To 221B Baker Street", "Up the seventeen steps to the sitting-room", function () { shkGoIn("ws_baker"); });
go("ms", "📨", "To the district messenger office", "Where Cartwright works", function () { shkGoIn("hb_msg"); });
go("pd", "🚂", "To Paddington", "The 10.30 for Devon", function () { shkGoIn("hb_padd"); });
if (typeof bsGo === "function")
go("bs", "🚪", "To Baker Street", "The street, 221B's black door", function () { bsGo("door"); });
if (typeof jkGo === "function")
go("jk", "🧪", "To Dr Jekyll's London", "The by-street and the door, the square, Soho", function () { jkGo("cab"); });
if (typeof wcGo === "function")
go("wc", "🔦", "To Whitechapel, 1888", "Spitalfields and the Lyceum", function () { wcGo("cab"); });
if (typeof wsmGo === "function")
go("wsm", "🕰️", "To Westminster", "Whitehall, Big Ben, the Abbey", function () { wsmGo("cab"); });
go("gos", "🏥", "To Great Ormond Street", "London, 1912: the hospital, Queen Square", function () { dlnGo(); });
go("book", "🐕", "The book", "The Hound of the Baskervilles: all fifteen chapters", function () { hbbOpen(); });
worldCard(worldFacts("🐴 A hansom cab", SHK.inside ? "At the door" : "Regent Street, 1889", [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("hbl", "🐕 To the Hound's London", "Regent Street, the Northumberland Hotel, Paddington and the train for Dartmoor");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); hbGo("cab", "🐕 <b>Regent Street, 1889.</b> The cab sets you down at the rank: shop windows bright, and Paddington only a cab away."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (from) {
if (from === "ldn")
worldCard(worldFacts("🚂 The 10.30 for Devon", "Paddington, the platform for the West", [], ["A long, slow journey: the train runs out of London, the country grows red-earthed and green, and at last the grey moor rises in the window."]) + worldBtn("go", "🚂 Take the train to Dartmoor", "The little wayside station") + worldBtn("stay", "Stay in London", ""), { go: function () { worldCard(null); hmGo("station", "🚂 <b>The little wayside station.</b> A wagonette waits; beyond the low white fence, the moor. A soldier with a rifle watches the road: a convict has escaped from Princetown."); }, stay: function () { worldCard(null); } });
else
worldCard(worldFacts("🚂 The train to London", "The wayside station", [], ["Up the line to Paddington."]) + worldBtn("go", "🚂 Back to London", "Paddington") + worldBtn("stay", "Stay on the moor", ""), { go: function () { worldCard(null); shkGoIn("hb_padd"); }, stay: function () { worldCard(null); } });
},
function () {
var L = worldLocal(), M = hmLocal(L.x, L.z), b = "", fns = {};
HB_WAGON.forEach(function (w) {
var P = HBM_PLACES[w[0]];
if (Math.hypot(M.x - P.x, M.z - P.z) < 60)
return;
b += worldBtn(w[0], w[1] + " " + w[2], w[3]);
fns[w[0]] = function () { worldCard(null); hmGo(w[0] === "hall" ? "avenue" : w[0], "🐴 <b>" + esc(w[2]) + ".</b> The wagonette rattles off again over the moor road."); };
});
worldCard(worldFacts("🐴 The wagonette", "Perkins, the groom, at the reins", [], ["Two wiry horses and a high-wheeled wagonette: the way to get about the moor."]) + b, fns);
},
function (P, R) {
var lite = !!HBM.lite, TX = 4, TZ = 3, tw = (HBM_R.x1 - HBM_R.x0) / TX, td = (HBM_R.z1 - HBM_R.z0) / TZ, tr = Math.hypot(tw, td) / 2 + 4;
var kinds = {
heath: { geo: new THREE.OctahedronGeometry(1, 0), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0x5E3A52, 0x6E4660, 0x4E3440, 0x5A4434, 0x7A5470, 0x4A3A2C, 0x56482E], n: lite ? 5000 : 22000 },
grass: { geo: new THREE.ConeGeometry(0.5, 1, 3, 1, true), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0x7A7E40, 0x8A8A4C, 0x6A7234, 0x9A9054, 0x5E6A30], n: lite ? 4000 : 16000 },
brack: { geo: new THREE.ConeGeometry(0.7, 1, 4, 1, true), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0x9A5A26, 0xA86A2E, 0x7A6A2A, 0x8A4A22, 0x6A7A2E], n: lite ? 1500 : 6000 },
gorse: { geo: new THREE.DodecahedronGeometry(1, 0), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0x34461E, 0x3E5222, 0x2E3E1A], n: lite ? 300 : 1500 },
bloom: { geo: new THREE.IcosahedronGeometry(1, 0), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0xF0C828, 0xE8B820, 0xF6D840], n: 0 },
rock: { geo: new THREE.DodecahedronGeometry(1, 0), mat: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), cols: [0x8A8A84, 0x7A7A74, 0x9A968C, 0x6E6E6A, 0x8A8478], n: 0 }
};
var place = {}, M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), C = new THREE.Color();
var put = function (k, x, z, y, sx, sy, sz, ry, col) { var tx = Math.min(TX - 1, Math.max(0, ((x - HBM_R.x0) / tw) | 0)), tz = Math.min(TZ - 1, Math.max(0, ((z - HBM_R.z0) / td) | 0)), key = k + ":" + tx + ":" + tz; (place[key] = place[key] || { k: k, tx: tx, tz: tz, l: [] }).l.push([x, z, y, sx, sy, sz, ry, col]); };
var nearFlat = function (x, z, f) { for (var i = 0; i < HBM_FLAT.length; i++) {
var F = HBM_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r * f)
return true;
} return false; };
var free = function (x, z, road) { if (hmMireN(x, z) < 1.04)
return false; if (hmRoadD(x, z) < (road || 3))
return false; return true; };
var rx = function () { return HBM_R.x0 + R() * (HBM_R.x1 - HBM_R.x0); }, rz = function () { return HBM_R.z0 + R() * (HBM_R.z1 - HBM_R.z0); };
["heath", "grass", "brack"].forEach(function (k) {
var K = kinds[k];
for (var i = 0, tries = 0; i < K.n && tries < K.n * 3; tries++) {
var x = rx(), z = rz();
if (!free(x, z))
continue;
if (nearFlat(x, z, 0.85) && R() < 0.9)
continue;
i++;
var y = hmH(x, z), s = k === "heath" ? 0.3 + R() * 0.45 : k === "grass" ? 0.25 + R() * 0.3 : 0.4 + R() * 0.5;
if (k === "heath")
put(k, x, z, y + s * 0.15, s * 1.2, s * 0.75, s * 1.1, R() * 6.28, K.cols[(R() * K.cols.length) | 0]);
else if (k === "grass")
put(k, x, z, y + s * 0.45, s, s * (1.6 + R()), s, R() * 6.28, K.cols[(R() * K.cols.length) | 0]);
else
put(k, x, z, y + s * 0.4, s * 1.3, s * 0.9, s * 1.3, R() * 6.28, K.cols[(R() * K.cols.length) | 0]);
}
});
for (var g = 0, gt = 0; g < kinds.gorse.n && gt < kinds.gorse.n * 4; gt++) {
var x = rx(), z = rz();
if (!free(x, z, 4) || nearFlat(x, z, 0.9))
continue;
g++;
var y = hmH(x, z), s = 0.5 + R() * 0.6;
put("gorse", x, z, y + s * 0.55, s * 1.2, s * 0.85, s * 1.1, R() * 6.28, kinds.gorse.cols[(R() * 3) | 0]);
for (var f = 0; f < (lite ? 2 : 6); f++) {
var a = R() * 6.28, r = s * (0.6 + R() * 0.5);
put("bloom", x + Math.cos(a) * r, z + Math.sin(a) * r, y + s * (0.6 + R() * 0.6), 0.09, 0.07, 0.09, 0, kinds.bloom.cols[(R() * 3) | 0]);
}
}
var solids = 0;
HBM_TOR.forEach(function (T) {
var n = lite ? 60 : 240;
for (var i = 0; i < n; i++) {
var a = R() * 6.28, r = T.s * (0.9 + Math.pow(R(), 0.7) * 2.6), x = T.x + Math.cos(a) * r, z = T.z + Math.sin(a) * r;
if (!free(x, z, 2.5))
continue;
var s = (0.25 + R() * R() * 1.4) * (r < T.s * 1.6 ? 1.4 : 1), y = hmH(x, z);
put("rock", x, z, y + s * 0.25, s * (1 + R() * 0.6), s * (0.55 + R() * 0.4), s * (1 + R() * 0.5), R() * 6.28, kinds.rock.cols[(R() * 5) | 0]);
if (s > 0.75 && solids < (lite ? 150 : 500)) {
solids++;
shkSolid({ x: hmX(x), z: hmZ(z), r: s * 0.9 });
}
}
});
for (var b = 0; b < (lite ? 250 : 1100); b++) {
var x = rx(), z = rz();
if (!free(x, z, 3) || nearFlat(x, z, 1.0))
continue;
var s = 0.2 + R() * R() * 1.0, y = hmH(x, z);
put("rock", x, z, y + s * 0.2, s * (1 + R() * 0.5), s * (0.5 + R() * 0.4), s, R() * 6.28, kinds.rock.cols[(R() * 5) | 0]);
if (s > 0.75 && solids < (lite ? 200 : 650)) {
solids++;
shkSolid({ x: hmX(x), z: hmZ(z), r: s * 0.9 });
}
}
for (var key in place) {
var T = place[key], K = kinds[T.k], cx = HBM_R.x0 + (T.tx + 0.5) * tw, cz = HBM_R.z0 + (T.tz + 0.5) * td, geo = K.geo.clone();
geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 40, 0), tr + 40);
var mesh = new THREE.InstancedMesh(geo, K.mat, T.l.length);
mesh.position.set(hmX(cx), 0, hmZ(cz));
T.l.forEach(function (p, i) { E.set(0, p[6], 0); Q.setFromEuler(E); S.set(p[3], p[4], p[5]); V.set(p[0] - cx, p[2], p[1] - cz); M.compose(V, Q, S); mesh.setMatrixAt(i, M); C.setHex(p[7]); mesh.setColorAt(i, C); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.userData.hmDress = 1;
P.add(mesh);
}
},
function (P, R) {
try {
hmDress(P, R || wRand(1902));
}
catch (e) {
if (window.console)
console.warn("[hound] dress", e);
}
var gr = dlnS("granite", 0x7A766A);
[[-233, -330, 0.2], [-226.5, -331, -0.25]].forEach(function (s) {
var g = new THREE.Group();
g.position.set(hmX(s[0]), hmH(s[0], s[1]) - 0.2, hmZ(s[1]));
P.add(g);
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 1.1, 5.4, 7, 1), gr);
m.position.y = 2.6;
m.rotation.z = s[2];
g.add(m);
shkSolid({ x: hmX(s[0]), z: hmZ(s[1]), r: 1.0 });
});
hbSpotM(-230, -326, 3, "The two great stones", "look at them", function () { hbTale("🪨 The two great stones", ["Two great stones, worn and sharpened at the upper end, like the huge corroding fangs of some monstrous beast. Here, the legend says, the wicked Hugo was found, and the hound tearing at his throat."]); });
hbSpotM(HBM_PLACES.merripit.x - 10, HBM_PLACES.merripit.z - 8, 2.6, "The wagonette", "ride in it", function () { hbWagonCard(); });
hbSpotM(HBM_PLACES.lafter.x + 10, HBM_PLACES.lafter.z + 14, 2.6, "The wagonette", "ride in it", function () { hbWagonCard(); });
},
function (n, h, w, lean, c0, c1, seed) {
var R = wRand(seed), P = [], C = [], N = [], A = new THREE.Color(c0), B = new THREE.Color(c1);
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + R() * 0.8, r = R() * w * 1.2, bx = Math.cos(a) * r, bz = Math.sin(a) * r, hh = h * (0.6 + R() * 0.5), ln = lean * (0.5 + R()), tx = bx + Math.cos(a) * ln * hh, tz = bz + Math.sin(a) * ln * hh, px = -Math.sin(a) * w * 0.5, pz = Math.cos(a) * w * 0.5, mx = (bx + tx) / 2, mz = (bz + tz) / 2;
var v = [[bx - px, 0, bz - pz, 0], [bx + px, 0, bz + pz, 0], [mx - px * 0.7, hh * 0.55, mz - pz * 0.7, 0.55], [mx + px * 0.7, hh * 0.55, mz + pz * 0.7, 0.55], [tx, hh, tz, 1]];
[[0, 1, 3], [0, 3, 2], [2, 3, 4]].forEach(function (t) { t.forEach(function (j) { var q = v[j]; P.push(q[0], q[1], q[2]); N.push(Math.cos(a) * 0.35, 0.9, Math.sin(a) * 0.35); var k = q[3]; C.push(A.r + (B.r - A.r) * k, A.g + (B.g - A.g) * k, A.b + (B.b - A.b) * k); }); });
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
return g;
},
function () {
var lite = !!HBM.lite, G = new THREE.Group();
G.name = "hm-carpet";
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var K = [{ k: "heath", c: 1.0, N: lite ? 36 : 80, geo: hmTuftGeo(14, 0.3, 0.09, 0.75, 0x2A1E16, 0x8A5A80, 11), cols: [0xFFFFFF, 0xE8D0E8, 0xC8B0A0, 0xF0E0F0, 0xB89A88], den: 0.9 },
{ k: "grass", c: 1.3, N: lite ? 28 : 64, geo: hmTuftGeo(8, 0.62, 0.07, 0.45, 0x3A4220, 0xB8B070, 12), cols: [0xFFFFFF, 0xE0E8C0, 0xD0C8A0, 0xF0F0D8], den: 0.85 },
{ k: "brack", c: 2.6, N: lite ? 16 : 40, geo: hmTuftGeo(6, 0.95, 0.28, 0.9, 0x3A4A1E, 0xA8662A, 13), cols: [0xFFFFFF, 0xD0E0A0, 0xE8B888, 0xC0D890], den: 0.6 }];
K.forEach(function (k, ki) { var m = new THREE.InstancedMesh(k.geo, mat, k.N * k.N); m.frustumCulled = false; m.userData.hmDress = 1; k.m = m; k.cx = null; k.seed = ki * 17 + 3; G.add(m); });
return { g: G, K: K };
},
function (k, ix, iz, M, Q, E, S, V, C) {
var h1 = hmHash(ix, iz, k.seed), h2 = hmHash(ix, iz, k.seed + 1), h3 = hmHash(ix, iz, k.seed + 2), x = (ix + h1) * k.c, z = (iz + h2) * k.c, ok = h3 < k.den;
if (ok && (x < HBM_R.x0 || x > HBM_R.x1 || z < HBM_R.z0 || z > HBM_R.z1))
ok = false;
if (ok && hmMireN(x, z) < 1.04)
ok = false;
if (ok) {
var rd = hmRoadD(x, z);
if (rd < 2.4 || (rd < 4 && h3 > k.den * 0.4))
ok = false;
}
if (ok) {
for (var i = 0; i < HBM_FLAT.length; i++) {
var F = HBM_FLAT[i];
var fd = Math.hypot(x - F.x, z - F.z);
if (fd < F.r * (k.k === "grass" ? 0.6 : 0.8)) {
ok = false;
break;
}
}
}
var y = ok ? hmH(x, z) : 0;
if (ok) {
var hi = Math.min(1, Math.max(0, (y - 8) / 26)), n = 0.5 + 0.5 * Math.sin(x * 0.043 + z * 0.031) * Math.cos(z * 0.027 - x * 0.017), w = k.k === "heath" ? 0.35 + hi * 0.5 + n * 0.3 : k.k === "grass" ? 1.0 - hi * 0.55 - n * 0.25 : 0.25 + n * 0.6 - Math.abs(hi - 0.4) * 0.5;
if (hmHash(ix, iz, k.seed + 3) > w)
ok = false;
}
if (!ok) {
S.set(0, 0, 0);
V.set(0, -50, 0);
M.compose(V, Q.set(0, 0, 0, 1), S);
return 0;
}
var s = 0.65 + hmHash(ix, iz, k.seed + 4) * 0.8;
E.set(0, hmHash(ix, iz, k.seed + 5) * 6.28, 0);
Q.setFromEuler(E);
S.set(s, s * (0.8 + h3 * 0.5), s);
V.set(hmX(x), y - 0.06, hmZ(z));
M.compose(V, Q, S);
C.setHex(k.cols[(hmHash(ix, iz, k.seed + 6) * k.cols.length) | 0]);
return 1;
},
function (L, on) {
if (!HBM.built || !HBM.live)
return;
if (!HBM.carpet) {
if (!on)
return;
HBM.carpet = hmCarpetMake();
HBM.live.add(HBM.carpet.g);
}
HBM.carpet.g.visible = on;
if (!on)
return;
var ML = hmLocal(L.x, L.z), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), Cc = new THREE.Color();
HBM.carpet.K.forEach(function (k) {
var N = k.N, h = N >> 1, cx = Math.floor(ML.x / k.c), cz = Math.floor(ML.z / k.c);
if (cx === k.cx && cz === k.cz)
return;
var all = k.cx == null || Math.abs(cx - k.cx) >= N || Math.abs(cz - k.cz) >= N, n = 0;
for (var iz = cz - h; iz < cz - h + N; iz++)
for (var ix = cx - h; ix < cx - h + N; ix++) {
if (!all && ix >= k.cx - h && ix < k.cx - h + N && iz >= k.cz - h && iz < k.cz - h + N)
continue;
var sx = ((ix % N) + N) % N, sz = ((iz % N) + N) % N, idx = sz * N + sx;
hmCarpetCell(k, ix, iz, M, Q, E, S, V, Cc);
k.m.setMatrixAt(idx, M);
k.m.setColorAt(idx, Cc);
n++;
}
k.cx = cx;
k.cz = cz;
if (n) {
k.m.instanceMatrix.needsUpdate = true;
if (k.m.instanceColor)
k.m.instanceColor.needsUpdate = true;
}
});
},
function (dead) {
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var coat = new THREE.MeshStandardMaterial({ color: 0x0C0B0A, roughness: 0.85, metalness: 0.0, emissive: 0x061008, emissiveIntensity: 0.6 }), glow = 0x7CFFB0;
var sph = function (r, sx, sy, sz, x, y, z) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), coat); m.scale.set(sx, sy, sz); m.position.set(x, y, z); body.add(m); return m; };
sph(0.5, 1.0, 0.95, 1.9, 0, 1.05, 0);
sph(0.52, 1.05, 1.05, 0.9, 0, 1.15, 0.62);
sph(0.4, 0.95, 0.95, 1.0, 0, 1.05, -0.7);
var neck = sph(0.28, 1, 1.2, 1.3, 0, 1.45, 1.05);
neck.rotation.x = -0.6;
var head = new THREE.Group();
head.position.set(0, 1.62, 1.36);
body.add(head);
var skull = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 10), coat);
skull.scale.set(1.05, 0.95, 1.15);
head.add(skull);
var muz = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.26, 0.4), coat);
muz.position.set(0, -0.08, 0.32);
head.add(muz);
var jaw = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.34), coat);
jaw.position.set(0, -0.24, 0.28);
jaw.rotation.x = 0.25;
head.add(jaw);
[-1, 1].forEach(function (s) {
var ear = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.18), coat);
ear.position.set(s * 0.22, -0.04, -0.02);
ear.rotation.z = s * 0.25;
head.add(ear);
var eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFE070 }));
eye.position.set(s * 0.11, 0.04, 0.2);
head.add(eye);
var ring = wGlow(0xFFB040, 0.22, 0.9);
ring.position.set(s * 0.11, 0.04, 0.22);
head.add(ring);
});
var flames = [];
var fl = function (par, x, y, z, s, o) { var f = wGlow(glow, s, o); f.position.set(x, y, z); par.add(f); flames.push(f); return f; };
for (var i = 0; i < 6; i++)
fl(head, (i % 2 ? -1 : 1) * 0.12, -0.12 - (i % 3) * 0.06, 0.2 + i * 0.06, 0.35, 0.7);
fl(head, 0, -0.2, 0.55, 0.9, 0.85);
fl(head, 0, -0.3, 0.4, 0.6, 0.7);
for (var h = 0; h < 7; h++)
fl(body, 0, 1.55 - h * 0.02, 0.9 - h * 0.18, 0.5, 0.45);
for (var d = 0; d < 4; d++)
fl(body, 0, 1.15 - d * 0.1, 1.0 + d * 0.04, 0.45, 0.5);
var legs = [];
[[0.26, 0.7], [-0.26, 0.7], [0.26, -0.72], [-0.26, -0.72]].forEach(function (p) {
var leg = new THREE.Group();
leg.position.set(p[0], 1.0, p[1]);
body.add(leg);
var u = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.6, 8), coat);
u.position.y = -0.3;
leg.add(u);
var l = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.45, 8), coat);
l.position.set(0, -0.78, 0.03);
leg.add(l);
var paw = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), coat);
paw.scale.set(1, 0.6, 1.4);
paw.position.set(0, -1.0, 0.06);
leg.add(paw);
legs.push(leg);
});
var tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.07, 0.8, 6), coat);
tail.position.set(0, 1.15, -1.25);
tail.rotation.x = -0.9;
body.add(tail);
var light = new THREE.PointLight(0x7CFFB0, dead ? 0.6 : 1.4, 9);
light.position.set(0, 1.5, 1.6);
g.add(light);
g.userData.legs = legs;
g.userData.flames = flames;
g.userData.hound = 1;
g.userData.dead = !!dead;
if (dead) {
body.rotation.z = Math.PI / 2;
body.position.y = 0.45;
legs.forEach(function (L, i) { L.rotation.x = (i < 2 ? 0.5 : -0.4); });
}
return g;
},
function (t) {
for (var k in HBB.cast) {
var C = HBB.cast[k], g = C && C.g;
if (!g || !g.userData.hound || !g.parent)
continue;
var run = !!g.userData.running, s = t * (run ? 13 : 2);
g.userData.legs.forEach(function (L, i) { L.rotation.x = g.userData.dead ? L.rotation.x : (run ? Math.sin(s + (i % 2 ? Math.PI : 0) + (i < 2 ? 0 : 0.9)) * 0.85 : 0); });
g.userData.flames.forEach(function (f, i) { var o = 0.45 + 0.35 * Math.abs(Math.sin(t * 2.4 + i * 1.7)); if (f.material)
f.material.opacity = g.userData.dead ? o * 0.6 : o; });
}
},
function (v) {
var A = hbAC();
if (!A)
return;
var t = A.currentTime, G = A.createGain(), F = A.createBiquadFilter();
F.type = "lowpass";
F.frequency.value = 700;
F.Q.value = 4;
G.connect(A.destination);
F.connect(G);
G.gain.setValueAtTime(0.0001, t);
G.gain.exponentialRampToValueAtTime(0.32 * hbVol(v), t + 0.5);
G.gain.setValueAtTime(0.32 * hbVol(v), t + 2.4);
G.gain.exponentialRampToValueAtTime(0.0001, t + 4.2);
[1, 1.5, 2.01].forEach(function (m, i) {
var o = A.createOscillator();
o.type = i ? "triangle" : "sawtooth";
var f0 = 92 * m;
o.frequency.setValueAtTime(f0, t);
o.frequency.linearRampToValueAtTime(f0 * 1.55, t + 1.2);
o.frequency.linearRampToValueAtTime(f0 * 1.4, t + 2.6);
o.frequency.linearRampToValueAtTime(f0 * 0.9, t + 4.2);
var lfo = A.createOscillator(), lg = A.createGain();
lfo.frequency.value = 5.5;
lg.gain.value = f0 * 0.025;
lfo.connect(lg);
lg.connect(o.frequency);
var og = A.createGain();
og.gain.value = i ? 0.35 : 0.6;
o.connect(og);
og.connect(F);
o.start(t);
lfo.start(t);
o.stop(t + 4.3);
lfo.stop(t + 4.3);
});
},
function (v) {
var A = hbAC();
if (!A)
return;
var t = A.currentTime, G = A.createGain(), F = A.createBiquadFilter();
F.type = "bandpass";
F.frequency.value = 1200;
F.Q.value = 1.4;
F.connect(G);
G.connect(A.destination);
G.gain.setValueAtTime(0.0001, t);
G.gain.exponentialRampToValueAtTime(0.18 * hbVol(v), t + 0.15);
G.gain.setValueAtTime(0.18 * hbVol(v), t + 1.0);
G.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
var o = A.createOscillator();
o.type = "sawtooth";
o.frequency.setValueAtTime(620, t);
o.frequency.linearRampToValueAtTime(880, t + 0.4);
o.frequency.linearRampToValueAtTime(560, t + 1.8);
var lfo = A.createOscillator(), lg = A.createGain();
lfo.frequency.value = 7;
lg.gain.value = 30;
lfo.connect(lg);
lg.connect(o.frequency);
o.connect(F);
o.start(t);
lfo.start(t);
o.stop(t + 1.9);
lfo.stop(t + 1.9);
},
function () {
var A = hbAC();
if (!A)
return;
var t = A.currentTime, s = hbNoise(A, 0.6), G = A.createGain(), F = A.createBiquadFilter();
F.type = "lowpass";
F.frequency.setValueAtTime(3000, t);
F.frequency.exponentialRampToValueAtTime(300, t + 0.4);
G.gain.setValueAtTime(0.7 * hbVol(1), t);
G.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
s.connect(F);
F.connect(G);
G.connect(A.destination);
s.start(t);
},
function () {
var A = hbAC();
if (!A)
return;
var t = A.currentTime;
for (var i = 0; i < 4; i++) {
var s = hbNoise(A, 0.5), G = A.createGain(), F = A.createBiquadFilter(), t0 = t + i * 0.8;
F.type = "bandpass";
F.frequency.value = 520 + i * 30;
F.Q.value = 3;
G.gain.setValueAtTime(0.0001, t0);
G.gain.exponentialRampToValueAtTime(0.09 * hbVol(1), t0 + 0.08);
G.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.45);
s.connect(F);
F.connect(G);
G.connect(A.destination);
s.start(t0);
}
},
function () {
var live = {};
for (var k in HBB.cast) {
var C = HBB.cast[k];
if (C && C.g && C.g.parent && C.c && C.c.name)
live[C.c.name] = 1;
}
var act = hbbActive(), here = SHK.inside, C0 = act ? HBB_CH[hbbS().ch] : null;
[HBL.home || [], HBM.home || []].forEach(function (list) {
list.forEach(function (H) {
var nm = H.T && H.T.name, off = !!(nm && live[nm]) || !!(C0 && nm && H.room === here && (C0.cast || []).some(function (c) { return c.name === nm; }));
if (off && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!off && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
if (H.T)
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
});
},
function (seed, who, o) {
o = Object.assign({}, o || {});
if (!o.sex && SZL_SHE.test(who))
o.sex = "f";
if (who === "szlucyg" || who === "newsboy" || who === "bsarab")
o.child = true;
if (!o.beard)
o.beard = who === "szferrier" ? "full" : who === "szhunter" ? "full" : who === "szelder" ? "full" : who === "szwatson" ? "mustache" : who === "szcabhope" ? "full" : who === "szpion" ? "full" : null;
if (!o.beard)
delete o.beard;
var p = dlnPerson(seed, who, o);
if (who === "szholmes")
p.scale.set(0.94, 1.07, 0.94);
else if (who === "szlest")
p.scale.set(0.94, 0.92, 0.94);
else if (who === "szcabhope" || who === "szhunter")
p.scale.set(1.06, 1.05, 1.06);
else if (who === "szlucyg")
p.scale.set(0.62, 0.62, 0.62);
return p;
},
function () {
return function (x, W, H) {
var R = wRand(1847);
x.fillStyle = "#E8E4DA";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 5200; i++) {
var v = 200 + ((R() * 55) | 0);
x.fillStyle = "rgb(" + v + "," + (v - 4) + "," + (v - 14) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
for (var j = 0; j < 300; j++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "120,110,90" : "250,250,245") + "," + (0.08 + R() * 0.18) + ")";
x.beginPath();
x.arc(R() * W, R() * H, 2 + R() * 9, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(150,140,120,.25)";
for (var c = 0; c < 40; c++) {
x.beginPath();
var sx = R() * W, sy = R() * H;
x.moveTo(sx, sy);
for (var k = 0; k < 4; k++) {
sx += R() * 24 - 12;
sy += R() * 24 - 12;
x.lineTo(sx, sy);
}
x.stroke();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(61);
x.fillStyle = "#8E8070";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 2600; i++) {
var v = 100 + ((R() * 90) | 0);
x.fillStyle = "rgb(" + (v + 10) + "," + (v) + "," + (v - 12) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2);
}
x.strokeStyle = "rgba(50,40,30,.4)";
for (var c = 0; c < 30; c++) {
x.beginPath();
var sy = R() * H;
x.moveTo(0, sy);
x.lineTo(W, sy + R() * 20 - 10);
x.stroke();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(31);
x.fillStyle = "#B8A888";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 1800; i++) {
x.fillStyle = ["#C8B898", "#A89878", "#D8C8A8", "#988868"][(R() * 4) | 0];
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
x.fillStyle = "rgba(120,100,70,.35)";
x.fillRect(W * 0.16, 0, W * 0.1, H);
x.fillRect(W * 0.74, 0, W * 0.1, H);
};
},
function (x, z, h, R) {
var c, n = 0.5 + 0.5 * Math.sin(x * 0.031 + z * 0.027) * Math.cos(z * 0.019 - x * 0.013), m = 0.5 + 0.5 * Math.sin(x * 0.11 - z * 0.07) * Math.sin(z * 0.09 + x * 0.05);
var steep = Math.min(1, Math.abs(suH(x + 3, z) - h) / 3 + Math.abs(suH(x, z + 3) - h) / 3);
if (x < -400 && h < 12)
c = [0.86 - 0.12 * n - 0.05 * m + R() * 0.02, 0.83 - 0.12 * n - 0.05 * m + R() * 0.02, 0.76 - 0.15 * n - 0.04 * m + R() * 0.02];
else {
var g = suSmooth((x + 260) / 140), cr = suLineD(SZU_CREEK, x, z).d, wet = Math.max(0, 1 - cr / 60) * g;
c = [0.70 - 0.24 * wet - 0.07 * n - 0.05 * m, 0.62 + 0.02 * wet - 0.05 * n - 0.03 * m, 0.46 - 0.14 * wet - 0.05 * n];
var irr = Math.max(suSmooth((230 - Math.hypot(x - 380, z - 200)) / 90), suSmooth((160 - Math.hypot(x - 240, z + 170)) / 70)) * (1 - Math.min(1, steep * 2));
if (irr > 0) {
var st = 0.5 + 0.5 * Math.sin((x * 0.7 + z) * 0.075) * Math.sin((z * 0.8 - x) * 0.05);
c = [c[0] * (1 - irr) + (0.40 + 0.18 * st - 0.05 * n) * irr, c[1] * (1 - irr) + (0.50 + 0.06 * st - 0.04 * n) * irr, c[2] * (1 - irr) + (0.22 + 0.04 * st) * irr];
}
if (steep > 0.3 || h > 30) {
var r = Math.min(1, Math.max(steep, (h - 30) / 40));
c = [c[0] * (1 - r) + (0.62 - 0.08 * m) * r, c[1] * (1 - r) + (0.5 - 0.07 * m) * r, c[2] * (1 - r) + (0.4 - 0.06 * m) * r];
}
}
if (h > 125) {
var s = Math.min(1, (h - 125) / 30) * (steep > 0.8 ? 0.5 : 1);
c = [c[0] * (1 - s) + 0.96 * s, c[1] * (1 - s) + 0.97 * s, c[2] * (1 - s) + 1.0 * s];
}
return c;
},
function (P, L, HW, step, mat) {
var pts = [];
L.forEach(function (p, i) { if (i === 0) {
pts.push(p);
return;
} var a = L[i - 1], n = Math.ceil(Math.hypot(p[0] - a[0], p[1] - a[1]) / step); for (var k = 1; k <= n; k++)
pts.push([a[0] + (p[0] - a[0]) * k / n, a[1] + (p[1] - a[1]) * k / n]); });
var ext = function (p, q, d) { var dx = q[0] - p[0], dz = q[1] - p[1], l = Math.hypot(dx, dz) || 1; return [p[0] + dx / l * d, p[1] + dz / l * d]; };
pts.unshift(ext(pts[0], pts[1], -HW * 0.6));
pts.push(ext(pts[pts.length - 1], pts[pts.length - 2], -HW * 0.6));
var offs = [], NC = SZU.lite ? 16 : 30;
for (var j = 0; j <= NC; j++) {
var u = j / NC * 2 - 1;
offs.push(Math.sign(u) * Math.pow(Math.abs(u), 1.5) * HW);
}
var pos = [], col = [], uv = [], idx = [], R = wRand(77), W = offs.length + 2;
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l, nz = dx / l;
var row = [];
offs.forEach(function (d) { var x = p[0] + nx * d, z = p[1] + nz * d, h = suH(x, z); row.push([x, h, z]); });
row.unshift([row[0][0], row[0][1] - 9, row[0][2]]);
row.push([row[row.length - 1][0], row[row.length - 1][1] - 9, row[row.length - 1][2]]);
row.forEach(function (v, j) { pos.push(suX(v[0]), v[1], suZ(v[2])); var c = suGroundCol(v[0], v[2], v[1], R); col.push(c[0], c[1], c[2]); uv.push(v[0] / 17, v[2] / 17 + v[1] / 17); });
});
for (var i = 0; i < pts.length - 1; i++)
for (var j = 0; j < W - 1; j++) {
var a = i * W + j, b = a + W;
idx.push(a, b, a + 1, a + 1, b, b + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.userData.keep = 1;
P.add(m);
return m;
},
function (P) {
var W = 2600, D = 2000, sx = SZU.lite ? 130 : 260, sz = SZU.lite ? 100 : 200, geo = new THREE.PlaneGeometry(W, D, sx, sz);
geo.rotateX(-Math.PI / 2);
var pos = geo.attributes.position, col = new Float32Array(pos.count * 3), R = wRand(5);
for (var i = 0; i < pos.count; i++) {
var x = pos.getX(i), z = pos.getZ(i), h = suH(x, z), c = suGroundCol(x, z, h, R), nf = suNearFine(x, z);
pos.setY(i, nf < 0 ? h - Math.min(14, -nf * 0.6 + 3) : h);
col[i * 3] = c[0];
col[i * 3 + 1] = c[1];
col[i * 3 + 2] = c[2];
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeVertexNormals();
var t = wTex(512, 512, suDustTex());
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(150, 115);
var m = new THREE.MeshLambertMaterial({ map: t, vertexColors: true });
var me = new THREE.Mesh(geo, m);
me.position.set(suX(0), 0, suZ(0));
me.userData.keep = 1;
me.frustumCulled = false;
P.add(me);
var rt = wTex(256, 256, suRockTex());
rt.wrapS = rt.wrapT = THREE.RepeatWrapping;
var fm = new THREE.MeshLambertMaterial({ map: rt, vertexColors: true });
suFineStrip(P, SZU_GORGE, 56, SZU.lite ? 4 : 2.5, fm);
suFineStrip(P, SZU_TRAIL, 32, SZU.lite ? 5 : 3, me.material);
var water = dlnShine(0x5A7A8A, 0.1, 0.6), pts = [];
SZU_CREEK.forEach(function (p, i) { if (i === 0)
return; var a = SZU_CREEK[i - 1], n = Math.ceil(Math.hypot(p[0] - a[0], p[1] - a[1]) / 6); for (var k = (i === 1 ? 0 : 1); k <= n; k++)
pts.push([a[0] + (p[0] - a[0]) * k / n, a[1] + (p[1] - a[1]) * k / n]); });
var wp = [], wi = [];
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * 3.2, nz = dx / l * 3.2, y = suBase(p[0], p[1]) + 0.75;
wp.push(suX(p[0] + nx), y, suZ(p[1] + nz), suX(p[0] - nx), y, suZ(p[1] - nz));
if (i > 0) {
var a = (i - 1) * 2;
wi.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
});
var wg = new THREE.BufferGeometry();
wg.setAttribute("position", new THREE.Float32BufferAttribute(wp, 3));
wg.setIndex(wi);
wg.computeVertexNormals();
var wm = new THREE.Mesh(wg, water);
P.add(wm);
},
function (P) {
var mat = suMat("sutrack", 128, 128, suTrackTex());
SZU_ROADS.forEach(function (L) {
var pts = [];
for (var i = 1; i < L.length; i++) {
var ax = L[i - 1][0], az = L[i - 1][1], bx = L[i][0], bz = L[i][1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / 5));
for (var k = (i === 1 ? 0 : 1); k <= n; k++)
pts.push([ax + (bx - ax) * k / n, az + (bz - az) * k / n]);
}
var w = 4, pos = [], uv = [], idx = [], v = 0;
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
[[p[0] + nx, p[1] + nz, 0], [p[0] - nx, p[1] - nz, 1]].forEach(function (s) { pos.push(suX(s[0]), suH(s[0], s[1]) + 0.07, suZ(s[1])); uv.push(s[2], v * 0.6); });
v++;
if (i > 0) {
var a = (i - 1) * 2;
idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
P.add(new THREE.Mesh(g, mat));
});
},
function (P, x, z, s, R, o) {
o = o || {};
var g = new THREE.IcosahedronGeometry(1, SZU.lite ? 0 : 1), mat = suMat("surock", 256, 256, suRockTex());
var m = new THREE.Mesh(g, mat);
m.scale.set(s * (0.8 + R() * 0.6), s * (o.flat || 0.55 + R() * 0.35), s * (0.8 + R() * 0.6));
m.rotation.set(R() * 0.3, R() * 6.28, R() * 0.3);
m.position.set(suX(x), (o.y != null ? o.y : suH(x, z)) - s * 0.12, suZ(z));
P.add(m);
return m;
},
function (P, R) {
var n = SZU.lite ? 40 : 140;
for (var i = 0; i < n; i++) {
var t = R(), seg = Math.min(SZU_GORGE.length - 2, (t * (SZU_GORGE.length - 1)) | 0), f = t * (SZU_GORGE.length - 1) - seg, a = SZU_GORGE[seg], b = SZU_GORGE[seg + 1], x = a[0] + (b[0] - a[0]) * f, z = a[1] + (b[1] - a[1]) * f, dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1, side = R() < 0.5 ? -1 : 1, off = R() < 0.55 ? SZU_GW - 1.2 - R() * 1.6 : 12 + R() * 9;
var px = x - dz / l * off * side, pz = z + dx / l * off * side, s = off < SZU_GW ? 0.5 + R() * 1.1 : 0.8 + R() * 2.4;
suRock(P, px, pz, s, R);
}
var S = SZU_SITE.sentinel;
suRock(P, S.x + 8, S.z - 7, 5, R, { flat: 1.3 });
shkSolid({ x: suX(S.x + 8), z: suZ(S.z - 7), r: 4.2 });
},
function () {
var P = [], N = [];
[[1.0, 0.55, -0.5], [0.78, 0.5, -0.18], [0.52, 0.46, 0.12]].forEach(function (t, k) {
var c = new THREE.ConeGeometry(t[0], t[1], 9, 1, true).toNonIndexed();
c.translate(0, t[2] + t[1] / 2, 0);
var a = c.attributes.position.array;
for (var i = 0; i < a.length; i += 3) {
var r = Math.hypot(a[i], a[i + 2]);
if (r > 0.01) {
var w = 1 + 0.12 * Math.sin(Math.atan2(a[i + 2], a[i]) * 5 + k * 2);
a[i] *= w;
a[i + 2] *= w;
a[i + 1] -= 0.06 * r;
}
}
c.computeVertexNormals();
P.push.apply(P, a);
N.push.apply(N, c.attributes.normal.array);
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
return g;
},
function (P, R) {
var lite = !!SZU.lite, M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), C = new THREE.Color();
var kinds = {
sage: { geo: new THREE.IcosahedronGeometry(1, 0), cols: [0x8A9478, 0x7A8468, 0x9AA488, 0x6E7660], l: [] },
chap: { geo: new THREE.DodecahedronGeometry(1, 0), cols: [0x4A5232, 0x3E4628, 0x56603A], l: [] },
pine: { geo: suPineGeo(), cols: [0x24361E, 0x2A3E22, 0x1E2E1A], l: [] },
trunk: { geo: new THREE.CylinderGeometry(0.12, 0.2, 1, 5, 1), cols: [0x4A3624, 0x3A2A1C], l: [] },
cotton: { geo: new THREE.IcosahedronGeometry(1, 1), cols: [0x5A7A32, 0x4A6A2A, 0x6A8A3A], l: [] },
bone: { geo: new THREE.CylinderGeometry(0.05, 0.06, 1, 5, 1), cols: [0xF4F0E4, 0xE8E2D4], l: [] }
};
var put = function (k, x, z, y, sx, sy, sz, ry, rz) { var K = kinds[k]; K.l.push([x, z, y, sx, sy, sz, ry, rz || 0, K.cols[(R() * K.cols.length) | 0]]); };
var nearFlat = function (x, z, f) { for (var i = 0; i < SZU_FLAT.length; i++) {
var F = SZU_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r * f)
return true;
} return false; };
var rx = function () { return SZU_R.x0 + R() * (SZU_R.x1 - SZU_R.x0); }, rz = function () { return SZU_R.z0 + R() * (SZU_R.z1 - SZU_R.z0); };
for (var i = 0, tr = 0; i < (lite ? 2000 : 7000) && tr < 40000; tr++) {
var x = rx(), z = rz();
if (nearFlat(x, z, 1.0) || suOnTrail(x, z))
continue;
var y = suH(x, z);
if (y > 70)
continue;
var cr = suLineD(SZU_CREEK, x, z).d;
if (cr < 5)
continue;
i++;
var plain = x < -400, s = plain ? 0.25 + R() * 0.5 : 0.35 + R() * 0.6;
if (plain && R() < 0.6)
continue;
if (R() < (plain ? 0.4 : 0.75))
put("sage", x, z, y + s * 0.3, s * 1.2, s * 0.75, s * 1.1, R() * 6.28);
else
put("chap", x, z, y + s * 0.35, s * 1.0, s * 0.8, s * 1.0, R() * 6.28);
}
for (var p = 0, pt = 0; p < (lite ? 700 : 2600) && pt < 30000; pt++) {
var x2 = -1000 + R() * 2000, z2 = -720 + R() * 1440, y2 = suH(x2, z2);
if (y2 < 22 || y2 > 135 || suOnTrail(x2, z2))
continue;
p++;
var h = 5 + R() * 7;
put("pine", x2, z2, y2 + h * 0.55 + 1.2, h * 0.3, h, h * 0.3, 0);
put("trunk", x2, z2, y2 + 0.9, 1, 1.8, 1, 0);
}
for (var c = 0; c < (lite ? 40 : 150); c++) {
var t = R(), seg = Math.min(SZU_CREEK.length - 2, (t * (SZU_CREEK.length - 1)) | 0), f = t * (SZU_CREEK.length - 1) - seg, a = SZU_CREEK[seg], b = SZU_CREEK[seg + 1], x3 = a[0] + (b[0] - a[0]) * f + (R() < 0.5 ? -1 : 1) * (7 + R() * 10), z3 = a[1] + (b[1] - a[1]) * f;
if (nearFlat(x3, z3, 0.7))
continue;
var y3 = suH(x3, z3), s3 = 2.6 + R() * 2.2;
put("trunk", x3, z3, y3 + 2.4, 1.6, 4.8, 1.6, 0);
put("cotton", x3, z3, y3 + 5.2 + s3 * 0.5, s3 * 1.1, s3 * 0.9, s3, R() * 6.28);
shkSolid({ x: suX(x3), z: suZ(z3), r: 0.5 });
}
for (var b2 = 0; b2 < (lite ? 40 : 160); b2++) {
var x4 = -880 + R() * 460, z4 = -300 + R() * 780;
var y4 = suH(x4, z4);
put("bone", x4, z4, y4 + 0.05, 1, 0.4 + R() * 0.6, 1, R() * 6.28, Math.PI / 2);
}
for (var k in kinds) {
var K = kinds[k];
if (!K.l.length)
continue;
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: k === "pine" ? THREE.DoubleSide : THREE.FrontSide }), mesh = new THREE.InstancedMesh(K.geo, mat, K.l.length);
K.l.forEach(function (q, i) { E.set(q[7], q[6], 0); Q.setFromEuler(E); S.set(q[3], q[4], q[5]); V.set(suX(q[0]), q[2], suZ(q[1])); M.compose(V, Q, S); mesh.setMatrixAt(i, M); C.setHex(q[8]); mesh.setColorAt(i, C); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
mesh.userData.keep = 1;
P.add(mesh);
}
},
function (P, R) {
suGroundMesh(P);
suTracks(P);
suGorgeRocks(P, R);
suPlants(P, R);
for (var b = 0; b < (SZU.lite ? 60 : 220); b++) {
var x = -880 + R() * 1760, z = -600 + R() * 1200, y = suH(x, z);
if (y < 6 && x > -400)
continue;
if (suOnTrail(x, z))
continue;
var s = 0.4 + R() * R() * 2.6;
suRock(P, x, z, s, R);
if (s > 1.4)
shkSolid({ x: suX(x), z: suZ(z), r: s * 0.8 });
}
},
function (P) {
var setts = dlnS("setts", 0x6A645A), flags = dlnS("flags", 0x8A847A), kerb = dlnS("stone", 0x9A948A), mud = dlnS("sand", 0x9A8A68);
Object.keys(SZL_ST).forEach(function (k, ki) {
var S = SZL_ST[k], yo = ki * 0.0007, w = S.f1 - S.f0, L = S.a1 - S.a0, c = (S.a0 + S.a1) / 2, fm = (S.f0 + S.f1) / 2, X = S.ax === "x" ? c : fm, Z = S.ax === "x" ? fm : c, pw = w > 12 ? 3.2 : w > 8 ? 2.0 : 0;
var cx = szX(X), cz = szZ(Z), sx = S.ax === "x" ? L : w, sz = S.ax === "x" ? w : L;
if (k === "lg") {
dlnPlane(P, sx, sz, mud, cx, 0.02, cz);
shkFloor(cx, cz, sx / 2 + 0.3, sz / 2 + 0.3, 0);
return;
}
dlnPlane(P, sx + 0.6, sz + 0.6, flags, cx, yo, cz);
if (pw) {
var rw = w - pw * 2;
dlnPlane(P, S.ax === "x" ? L : rw, S.ax === "x" ? rw : L, setts, cx, 0.012 + yo, cz);
[-1, 1].forEach(function (s) { var off = s * (rw / 2); dlnBox(P, S.ax === "x" ? L : 0.25, 0.14, S.ax === "x" ? 0.25 : L, kerb, S.ax === "x" ? cx : cx + off, 0.07, S.ax === "x" ? cz + off : cz); });
}
shkFloor(cx, cz, sx / 2 + 0.3, sz / 2 + 0.3, 0);
});
},
function (P, key, end, o) {
o = o || {};
var S = SZL_ST[key], w = S.f1 - S.f0, c = (S.f0 + S.f1) / 2, a = end ? S.a1 : S.a0, g = new THREE.Group();
g.position.set(S.ax === "x" ? szX(a) : szX(c), 0, S.ax === "x" ? szZ(c) : szZ(a));
if (S.ax === "x")
g.rotation.y = end ? -Math.PI / 2 : Math.PI / 2;
else if (end)
g.rotation.y = Math.PI;
P.add(g);
var n = Math.max(1, Math.round(w / 5.4)), st = o.st || 4, H = st * 3.3;
wcFront(g, o.shop ? jkShopFront(o.v || 3) : wcGround("house", o.v || 1), -w / 2, w / 2, 0, 3.3, 0, 1, n);
wcFront(g, o.up ? o.up(st - 1) : wcUpper(o.upk || "stock", st - 1, o.v || 1), -w / 2, w / 2, 3.3, H - 3.3, 0, 1, n);
dlnGable(g, w, 8, 2.2, dlnS("slate", 0x8A8A90), 0, H, -4);
return g;
},
function (P) {
var org = { x: szX(0), z: szZ(0) }, shop = function (gr, v) { return gr === "shop" ? jkShopFront(v + 5) : wcGround(gr, v); };
wcRow(P, "pic", 0, { ST: SZL_ST, org: org, names: SZL_NAMES.pic.slice(), grR: ["shop"], grF: shop, upF: function (up, st, v) { return szStucco(st, v); }, stR: [4, 4, 5], hw: 7, d: 12, seed: 41 });
wcRow(P, "pic", 1, { ST: SZL_ST, org: org, skip: [[-20, 22]], names: SZL_NAMES.pic.slice(5), grR: ["shop"], grF: shop, upF: function (up, st, v) { return szStucco(st, v); }, stR: [4, 5], hw: 7, d: 12, seed: 43 });
szEnd(P, "pic", 0, { st: 4, shop: 1, up: function (n) { return szStucco(n, 2); } });
szEnd(P, "pic", 1, { st: 5, shop: 1, up: function (n) { return szStucco(n, 1); } });
wcRow(P, "sm", 0, { ST: SZL_ST, org: org, skip: [[-26, 26]], names: SZL_NAMES.sm.slice(), grR: ["shop", "house"], grF: shop, upR: ["stock", "soot"], stR: [3, 4], hw: 6, d: 10, seed: 45 });
wcRow(P, "sm", 1, { ST: SZL_ST, org: org, skip: [[-90, 90]], grR: ["shop", "house"], grF: shop, upR: ["red", "stock"], stR: [3, 4], hw: 6, d: 10, seed: 47 });
szEnd(P, "sm", 0, { st: 4 });
szEnd(P, "sm", 1, { st: 4, upk: "red" });
wcRow(P, "br", 0, { ST: SZL_ST, org: org, skip: [[10, 104]], names: SZL_NAMES.br.slice(), grR: ["shop", "house", "house"], grF: shop, upR: ["stock", "red"], stR: [2, 3, 3], hw: 6.2, d: 10, seed: 51 });
wcRow(P, "br", 1, { ST: SZL_ST, org: org, names: SZL_NAMES.br.slice(4), grR: ["house", "shop", "house"], grF: shop, upR: ["stock", "red", "soot"], stR: [2, 3], hw: 6.2, d: 10, seed: 53 });
szEnd(P, "br", 0, { st: 3 });
szEnd(P, "br", 1, { st: 3, shop: 1 });
wcRow(P, "ac", 0, { ST: SZL_ST, org: org, gr: "doss", upR: ["soot"], stR: [2, 3], hw: 4.6, d: 7, seed: 55 });
wcRow(P, "ac", 1, { ST: SZL_ST, org: org, gr: "house", upR: ["soot"], stR: [2, 3], hw: 4.6, d: 7, seed: 57 });
szEnd(P, "ac", 1, { st: 3, upk: "soot", v: 2 });
wcRow(P, "acp", 0, { ST: SZL_ST, org: org, gr: "house", upR: ["soot"], stR: [3], hw: 7, d: 6, seed: 58 });
wcRow(P, "acp", 1, { ST: SZL_ST, org: org, gr: "house", upR: ["soot"], stR: [3], hw: 7, d: 6, seed: 59 });
wcRow(P, "tq", 0, { ST: SZL_ST, org: org, skip: [[30, 50]], names: SZL_NAMES.tq.slice(), gr: "house", upR: ["stock", "red"], stR: [3], hw: 6, d: 10, seed: 61 });
wcRow(P, "tq", 1, { ST: SZL_ST, org: org, gr: "house", upR: ["stock", "red"], stR: [3], hw: 6, d: 10, seed: 63 });
szEnd(P, "tq", 0, { st: 3 });
szEnd(P, "tq", 1, { st: 3, upk: "red" });
wcRow(P, "lgs", 0, { ST: SZL_ST, org: org, skip: [[16, 46]], names: SZL_NAMES.lgs.slice(), grR: ["shop", "house"], grF: shop, upR: ["stock"], stR: [3, 4], hw: 6, d: 10, seed: 65 });
wcRow(P, "lgs", 1, { ST: SZL_ST, org: org, names: SZL_NAMES.lgs.slice(2), grR: ["house", "shop"], grF: shop, upR: ["stock", "soot"], stR: [3, 4], hw: 6, d: 10, seed: 67 });
szEnd(P, "lgs", 0, { st: 4 });
szEnd(P, "lgs", 1, { st: 4 });
wcRow(P, "hl", 1, { ST: SZL_ST, org: org, gr: "house", upR: ["soot"], stR: [3], hw: 8, d: 8, seed: 68 });
wcRow(P, "hd", 0, { ST: SZL_ST, org: org, skip: [[84, 96]], names: SZL_NAMES.hd.slice(), grR: ["shop", "shop", "house"], grF: shop, upR: ["soot", "stock"], stR: [3, 4], hw: 5.4, d: 9, seed: 71 });
wcRow(P, "hd", 1, { ST: SZL_ST, org: org, names: SZL_NAMES.hd.slice(4), grR: ["shop", "doss", "shop"], grF: shop, upR: ["soot", "stock"], stR: [3, 4], hw: 5.4, d: 9, seed: 73 });
szEnd(P, "hd", 0, { st: 4, upk: "soot" });
szEnd(P, "hd", 1, { st: 4, shop: 1 });
},
function (P) {
var g = new THREE.Group();
g.position.set(szX(0), 0, szZ(SZL_ST.pic.f1));
g.rotation.y = Math.PI;
P.add(g);
var w = 42, H = 19, stone = dlnS("portland", 0xE8E2D4), dark = dlnC(0x1A1A1E);
dlnBox(g, w, H, 0.4, stone, 0, H / 2, -0.3);
wcFront(g, szStucco(4, 3), -w / 2, w / 2, 4.6, H - 4.6, 0, 1, 8);
for (var a = 0; a < 9; a++) {
var x = -w / 2 + 2.3 + a * (w - 4.6) / 8;
dlnCyl(g, 0.32, 0.36, 4.4, stone, x, 2.2, 0.5, 12);
if (a < 8) {
var ax = x + (w - 4.6) / 16;
dlnBox(g, (w - 4.6) / 8 - 0.8, 3.2, 0.1, a === 4 ? dlnGlow(0xF0D090) : dlnShine(0x2A2018, 0.3, 0.4), ax, 1.7, 0.0);
}
}
dlnBox(g, w + 0.4, 0.6, 1.2, stone, 0, 4.7, 0.3);
dlnBox(g, w + 0.8, 0.7, 1.0, stone, 0, H + 0.2, 0.2);
dlnMansard(g, w, 12, 4.6, dlnS("slate", 0x5A5A66), 0, H + 0.5, -6);
for (var d = 0; d < 7; d++) {
var dx = -w / 2 + 3 + d * (w - 6) / 6;
dlnBox(g, 1.8, 2.2, 1.0, stone, dx, H + 2.1, -0.8);
dlnBox(g, 1.1, 1.4, 0.06, dark, dx, H + 2.0, -0.28);
}
var sg = wcSign("THE CRITERION · RESTAURANT · THEATRE · AMERICAN BAR", 20, 0.8, "#1A1A22", "#E8C860");
sg.position.set(0, 5.4, 0.35);
g.add(sg);
[-6, 6].forEach(function (k) { dlnBox(g, 0.08, 1.4, 0.08, dlnShine(0x141414, 0.5, 0.5), k, 5.8, 1.4); dlnCyl(g, 0.24, 0.18, 0.5, dlnGlow(0xFFE6B0), k, 5.2, 1.4, 8); });
shkSolidBox(szX(0), szZ(SZL_ST.pic.f1 + 6), w, 12, 0);
shkDoor("sz_crit", szX(0), szZ(SZL_ST.pic.f1 - 1.2), "The Criterion, the Long Bar");
shkSpot(szX(10), szZ(SZL_ST.pic.f1 - 2), 2.6, "The Criterion", "look at it", function () { szTale("🍸 The Criterion", SZL_FACTS.crit); });
},
function () {
return wcMat("szbarts", 256, 512, function (x, W, H) {
var R = wRand(404);
x.fillStyle = "#D8D0BE";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 16) {
x.fillStyle = "rgba(90,80,60," + (0.18 + R() * 0.1) + ")";
x.fillRect(0, y, W, 1.5);
for (var k = (y / 16) % 2 * 40; k < W; k += 80)
x.fillRect(k, y, 1.5, 16);
}
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "70,64,52" : "240,236,226") + "," + (R() * 0.18) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
x.fillStyle = "rgba(40,36,30,.25)";
x.fillRect(0, H - 6, W, 6);
[[60, 140, 1], [220, 130, 2], [370, 110, 0]].forEach(function (r) {
var y = r[0], h = r[1], X = 88, w = 80;
x.fillStyle = "#E8E2D2";
x.fillRect(X - 10, y - 8, w + 20, h + 16);
x.fillStyle = "#2A2E34";
x.fillRect(X, y, w, h);
x.fillStyle = "rgba(150,170,190,.35)";
x.fillRect(X + 4, y + 4, w / 2 - 6, h / 2 - 6);
x.fillRect(X + w / 2 + 2, y + h / 2 + 2, w / 2 - 6, h / 2 - 6);
x.fillStyle = "#E8E2D2";
x.fillRect(X + w / 2 - 2, y, 4, h);
x.fillRect(X, y + h / 2 - 2, w, 4);
for (var q = 1; q < 3; q++) {
x.fillRect(X + q * w / 3 - 1, y, 2, h);
}
if (r[2] === 2) {
x.beginPath();
x.moveTo(X - 16, y - 10);
x.lineTo(X + w / 2, y - 38);
x.lineTo(X + w + 16, y - 10);
x.closePath();
x.fill();
x.strokeStyle = "rgba(80,70,50,.4)";
x.stroke();
}
if (r[2] === 1) {
x.fillRect(X - 14, y - 18, w + 28, 10);
}
x.fillStyle = "#C8C0AE";
x.fillRect(X - 12, y + h + 8, w + 24, 8);
});
});
},
function (P) {
var f = SZL_ST.sm.f0, g = new THREE.Group();
g.position.set(szX(0), 0, szZ(f));
P.add(g);
var stone = dlnS("portland", 0xE0D8C8), dark = dlnC(0x18181C);
dlnBox(g, 14, 15, 3.6, stone, 0, 7.5, -1.9);
dlnBox(g, 4.6, 6.2, 3.8, dark, 0, 3.1, -1.9);
dlnBox(g, 15, 0.8, 4.2, stone, 0, 15.2, -1.9);
var ped = dlnGable(g, 15, 4.2, 2.6, stone, 0, 15.6, -1.9);
for (var p = 0; p < 4; p++)
dlnCyl(g, 0.34, 0.38, 7.6, stone, -5.6 + p * (p < 2 ? 1.6 : 1.6) + (p > 1 ? 6.4 : 0), 9.6, 0.2, 12);
dlnBox(g, 2.4, 3.6, 0.9, dlnC(0x3A3630), 0, 9.6, 0.1);
var king = szPerson("szking", "bsking", { sex: "m" });
king.scale.set(0.55, 0.55, 0.55);
king.position.set(0, 7.9, 0.4);
g.add(king);
var stn = dlnC(0xD8D0C0);
king.traverse(function (o) { if (o.isMesh)
o.material = stn; });
var sg = wcSign("ST BARTHOLOMEW'S HOSPITAL", 9, 0.6, "#2A2A2A", "#E8D8A8");
sg.position.set(0, 6.9, 0.12);
g.add(sg);
var face = szBartsFace();
[-1, 1].forEach(function (s) { dlnBox(g, 40, 13, 12, dlnS("portland", 0xD8D0C0), s * 27, 6.5, -8); wcFront(g, face, s * 27 - 20, s * 27 + 20, 0, 13, -2, 1, 8); dlnBox(g, 40.6, 0.5, 0.7, stone, s * 27, 13.1, -1.8); dlnBox(g, 40.4, 0.3, 0.4, stone, s * 27, 4.4, -1.85); });
shkSolidBox(szX(0), szZ(f - 8), 94, 12, 0);
shkDoor("sz_lab", szX(0), szZ(f + 1.2), "St Bartholomew's Hospital, the gate");
shkSpot(szX(-8), szZ(f + 2.4), 2.6, "The gate of Barts", "look at it", function () { szTale("🏥 St Bartholomew's Hospital", SZL_FACTS.barts); });
var m = new THREE.Group();
m.position.set(szX(0), 0, szZ(SZL_ST.sm.f1));
m.rotation.y = Math.PI;
P.add(m);
var red = dlnS("georgian", 0xB86A50);
dlnBox(m, 176, 10, 0.5, red, 0, 5, -0.3);
for (var b = 0; b < 22; b++) {
var x = -84 + b * 8;
dlnBox(m, 0.8, 10.4, 0.8, stone, x, 5.2, 0.1);
dlnBox(m, 5.4, 4.4, 0.08, dlnShine(0x2A3A2A, 0.4, 0.4), x + 4, 5.2, 0.0);
dlnBox(m, 6.4, 0.5, 0.6, stone, x + 4, 8.0, 0.1);
}
dlnBox(m, 178, 1.0, 1.0, stone, 0, 10.4, 0);
[-88, 88].forEach(function (x) { dlnBox(m, 8, 16, 8, stone, x, 8, -3.6); var dome = new THREE.Mesh(new THREE.SphereGeometry(4.2, 16, 10, 0, 6.28, 0, 1.6), dlnS("slate", 0x4A5A5A)); dome.position.set(x, 16, -3.6); m.add(dome); });
dlnBox(m, 14, 9, 0.2, dlnShine(0x1A2A1A, 0.4, 0.5), 0, 4.5, 0.2);
var ms = wcSign("LONDON CENTRAL MARKETS · 1868", 14, 0.8, "#1A2A1A", "#E8D8A8");
ms.position.set(0, 9.6, 0.4);
m.add(ms);
shkSolidBox(szX(0), szZ(SZL_ST.sm.f1 + 8), 180, 16, 0);
},
function (P, R) {
var f = SZL_ST.br.f0, empty = [false, true, true, false], brick = wcUpper("stock", 2, 1), dark = dlnC(0x14141A), wall = dlnS("stock", 0x7A6A54), clay = dlnS("sand", 0x9A8A68);
[22, 40, 60, 78].forEach(function (x, i) {
var g = new THREE.Group();
g.position.set(szX(x), 0, szZ(80));
P.add(g);
var w = 10, d = 10, H = 9.9;
dlnBox(g, w, H, d, dlnS("stock", 0x8A7A60), 0, H / 2, -d / 2);
wcFront(g, wcGround("house", i), -w / 2, w / 2, 0, 3.3, 0.02, 1, 2);
wcFront(g, brick, -w / 2, w / 2, 3.3, 6.6, 0.02, 1, 2);
dlnGable(g, w + 0.4, d + 0.6, 2.6, dlnS("slate", 0x6A6A72), 0, H, -d / 2);
dlnBox(g, 0.9, 2.0, 1.0, dlnS("stock", 0x7A6A54), -w / 2 + 0.6, H + 1.4, -d / 2);
if (empty[i]) {
for (var c = 0; c < 3; c++) {
dlnBox(g, 1.3, 1.8, 0.06, dark, -3 + c * 3, 5.4, 0.06);
dlnBox(g, 1.3, 1.8, 0.06, dark, -3 + c * 3, 8.2, 0.06);
}
var tl = wcSign("TO LET", 1.1, 0.36, "#F4F0E4", "#1A1A1A");
tl.position.set(-3, 5.2, 0.1);
g.add(tl);
var tl2 = wcSign("TO LET", 1.1, 0.36, "#F4F0E4", "#1A1A1A");
tl2.position.set(3, 8.0, 0.1);
g.add(tl2);
}
var nm = wcSign("No. " + (i + 1), 0.8, 0.3, "#2A2A2A", "#E8E0C0");
nm.position.set(1.6, 2.6, 0.12);
g.add(nm);
shkSolidBox(szX(x), szZ(80 - d / 2), w + 0.4, d + 0.4, 0);
dlnBox(P, w + 6, 0.9, 0.4, wall, szX(x), 0.45, szZ(f - 0.2));
if (i !== 2)
shkSolidBox(szX(x), szZ(f - 0.2), w + 6, 0.4, 0);
else
[-1, 1].forEach(function (sd) { var hw = (w + 6) / 2 - 4; dlnBox(P, hw, 0.9, 0.4, wall, szX(x + sd * (4 + hw / 2)), 0.45, szZ(f - 0.2)); shkSolidBox(szX(x + sd * (4 + hw / 2)), szZ(f - 0.2), hw, 0.4, 0); });
for (var p = 0; p < (SZL.lite ? 3 : 9); p++) {
var px = x - w / 2 + R() * w, pz = 84 + R() * 24;
if (i === 2 && Math.abs(px - x) < 4)
continue;
var pl = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3 + R() * 0.3, 0), dlnC([0x5A6A3A, 0x6A6A40, 0x4A5A2A, 0x7A7048][(R() * 4) | 0]));
pl.position.set(szX(px), 0.2, szZ(pz));
pl.scale.y = 0.6;
P.add(pl);
}
dlnPlane(P, w + 5, 24, dlnS("meadow", 0x8A9060), szX(x), 0.01, szZ(96));
if (i < 3)
dlnBox(P, 0.3, 0.9, 26, wall, szX(x + 9), 0.45, szZ(96));
});
[55.6, 64.4].forEach(function (x) { shkSolidBox(szX(x), szZ(96), 0.4, 28, 0); });
[56.6, 63.4].forEach(function (x) { dlnBox(P, 0.6, 1.4, 0.6, wall, szX(x), 0.7, szZ(f - 0.2)); });
shkDoor("sz_n3hall", szX(60), szZ(81.2), "No. 3, Lauriston Gardens");
shkSpot(szX(62), szZ(104), 2.4, "Lauriston Gardens", "look at it", function () { szTale("🏚️ Lauriston Gardens", SZL_FACTS.lg); });
},
function (P, R) {
var line = dlnC(0x3A3A3A), cloth = [0xE8E2D4, 0xC8C0B0, 0x8A9AAA, 0xD8C8B0, 0x9A6A5A];
for (var l = 0; l < (SZL.lite ? 3 : 6); l++) {
var z = 146 + l * 4;
dlnBox(P, 24, 0.03, 0.03, line, szX(-184), 3.6, szZ(z));
for (var c = 0; c < 6; c++) {
var cw = 0.5 + R() * 0.45, ch = 0.55 + R() * 0.5, cx = -194 + c * 3.8 + R();
dlnBox(P, cw, ch, 0.02, dlnC(cloth[(R() * 5) | 0]), szX(cx), 3.58 - ch / 2, szZ(z));
dlnBox(P, 0.03, 0.09, 0.03, dlnC(0x8A6A48), szX(cx - cw * 0.4), 3.6, szZ(z));
dlnBox(P, 0.03, 0.09, 0.03, dlnC(0x8A6A48), szX(cx + cw * 0.4), 3.6, szZ(z));
}
}
var sg = wcSign("AUDLEY COURT", 2.4, 0.36, "#1A1A1A", "#E8E0C8");
sg.position.set(szX(-180.5), 3.4, szZ(129));
sg.rotation.y = -Math.PI / 2;
P.add(sg);
shkDoor("sz_rance", szX(-184), szZ(169.2), "46 Audley Court");
shkSpot(szX(-188), szZ(150), 2.6, "Audley Court", "look about", function () { szTale("🧺 Audley Court", SZL_FACTS.ac); });
},
function (P, R) {
var g = new THREE.Group();
g.position.set(szX(40), 0, szZ(SZL_ST.tq.f0));
P.add(g);
var w = 20, H = 9.9;
dlnBox(g, w, H, 10, dlnS("stock", 0x8A7A60), 0, H / 2, -5.2);
wcFront(g, wcGround("house", 2), -w / 2, w / 2, 0, 3.3, 0.02, 1, 3);
wcFront(g, wcUpper("stock", 2, 2), -w / 2, w / 2, 3.3, 6.6, 0.02, 1, 3);
dlnGable(g, w + 0.4, 10.6, 2.4, dlnS("slate", 0x6A6A72), 0, H, -5.2);
var c = wcSign("BOARD & RESIDENCE · MADAME CHARPENTIER", 5, 0.42, "#F0E8D0", "#1A1A1A");
c.position.set(0, 3.0, 0.12);
g.add(c);
shkSolidBox(szX(40), szZ(SZL_ST.tq.f0 - 5.2), w + 0.4, 10.4, 0);
shkDoor("sz_charp", szX(40), szZ(SZL_ST.tq.f0 + 1.2), "Madame Charpentier's boarding-house");
shkSpot(szX(30), szZ(SZL_ST.tq.f0 + 2), 2.4, "Torquay Terrace", "look about", function () { szTale("🏘️ Torquay Terrace", SZL_FACTS.tq); });
var h = new THREE.Group();
h.position.set(szX(31), 0, szZ(SZL_ST.lgs.f0));
P.add(h);
var hw = 28, HH = 13.2;
dlnBox(h, hw, HH, 14, dlnS("stock", 0x9A8A70), 0, HH / 2, -7.2);
wcFront(h, wcGround("house", 3), -hw / 2, hw / 2, 0, 3.3, 0.02, 1, 4);
wcFront(h, wcUpper("stock", 3, 1), -hw / 2, hw / 2, 3.3, 9.9, 0.02, 1, 4);
dlnGable(h, hw + 0.4, 14.6, 2.6, dlnS("slate", 0x6A6A72), 0, HH, -7.2);
var hs = wcSign("HALLIDAY'S PRIVATE HOTEL", 8, 0.6, "#1A1A22", "#E8C860");
hs.position.set(0, 3.4, 0.14);
h.add(hs);
var lp = dlnCyl(h, 0.24, 0.2, 0.5, dlnGlow(0xFFE6B0), 2.6, 2.9, 0.6, 8);
lp.userData.lamp = 1;
for (var r = 0; r < 3; r++)
for (var cc = 0; cc < 4; cc++)
dlnBox(h, 0.06, 1.6, 1.1, (r === 1 && cc === 2) ? dlnGlow(0xE0C080) : dlnC(0x18181C), hw / 2 + 0.04, 4.8 + r * 3.3, -2.4 - cc * 3.2);
shkSolidBox(szX(31), szZ(SZL_ST.lgs.f0 - 7.2), hw + 0.4, 14.4, 0);
var lad = new THREE.Group();
lad.position.set(szX(49), 0.1, szZ(536));
P.add(lad);
var wood = dlnS("oak", 0x6A5034);
dlnBox(lad, 0.08, 0.08, 6, wood, -0.25, 0, 0);
dlnBox(lad, 0.08, 0.08, 6, wood, 0.25, 0, 0);
for (var k = 0; k < 12; k++)
dlnBox(lad, 0.5, 0.05, 0.06, wood, 0, 0, -2.8 + k * 0.5);
shkDoor("sz_hhall", szX(31), szZ(SZL_ST.lgs.f0 + 1.2), "Halliday's Private Hotel");
shkSpot(szX(20), szZ(SZL_ST.lgs.f0 + 2), 2.4, "Halliday's Private Hotel", "look at it", function () { szTale("🏨 Halliday's Private Hotel", SZL_FACTS.halliday); });
shkDoor("sz_hdroom", szX(90), szZ(SZL_ST.hd.f0 + 1.2), "13, Duncan Street");
var dh = wcSign("13 · DUNCAN STREET · KESWICK, PAPERHANGER", 4, 0.36, "#2A2A2A", "#E8E0C0");
dh.position.set(szX(90), 3.0, szZ(SZL_ST.hd.f0 + 0.12));
P.add(dh);
var dg = new THREE.Group();
dg.position.set(szX(90), 0, szZ(SZL_ST.hd.f0));
P.add(dg);
dlnBox(dg, 12, 9.9, 9, dlnS("stock", 0x6A604E), 0, 4.95, -4.6);
wcFront(dg, wcGround("house", 1), -6, 6, 0, 3.3, 0.02, 1, 2);
wcFront(dg, wcUpper("soot", 2, 1), -6, 6, 3.3, 6.6, 0.02, 1, 2);
shkSolidBox(szX(90), szZ(SZL_ST.hd.f0 - 4.6), 12.4, 9.4, 0);
shkSpot(szX(70), szZ(SZL_ST.hd.f0 + 2), 2.4, "Houndsditch", "look about", function () { szTale("👗 Houndsditch", SZL_FACTS.hd); });
},
function (P) {
Object.keys(SZL_ST).forEach(function (k) { var S = SZL_ST[k]; if (S.f1 - S.f0 < 10)
return; for (var a = S.a0 + 12; a < S.a1 - 3; a += SZL.lite ? 40 : 26) {
var side = ((a / 26) | 0) % 2 ? S.f0 + 0.8 : S.f1 - 0.8;
if (S.ax === "x")
dlnLamp(P, szX(a), szZ(side));
else
dlnLamp(P, szX(side), szZ(a));
} });
[["cab", 0], ["smcab", 0], ["brcab", 0], ["tqcab", 0], ["hdcab", 0]].forEach(function (c) {
var C = SZL_PLACES[c[0]], S = SZL_ST[szStreetAt(C.x, C.z)];
if (!S)
return;
var side = C.z > (S.f0 + S.f1) / 2 ? S.f1 - 0.4 : S.f0 + 0.4;
dlnBox(P, 6, 1.0, 0.4, dlnC(0x2A2A2A), szX(C.x), 0.5, szZ(side));
shkSolidBox(szX(C.x), szZ(side), 6, 0.6, 0);
shkSpot(szX(C.x), szZ(C.z), 3.4, "The cab rank", "take a cab", function () { szCabCard(); });
});
dlnPillarBox(P, szX(80), szZ(8.6));
dlnPillarBox(P, szX(-30), szZ(126.6));
dlnPillarBox(P, szX(-60), szZ(406.6));
shkSpot(szX(-110), szZ(-2), 3, "Piccadilly", "look about", function () { szTale("🎩 Piccadilly", SZL_FACTS.pic); });
shkSpot(szX(-30), szZ(116), 3, "The Brixton Road", "look about", function () { szTale("🛤️ The Brixton Road", SZL_FACTS.brixton); });
var rail = dlnShine(0x5A5A5E, 0.5, 0.6);
[117.3, 118.7].forEach(function (z) { dlnBox(P, 480, 0.03, 0.08, rail, szX(0), 0.03, szZ(z)); });
},
function () {
var live = SZL.live;
["cab", "smcab", "brcab", "tqcab", "hdcab"].forEach(function (k, i) { var C = SZL_PLACES[k]; if (SZL.lite && i > 2)
return; dlnHansom(live, szX(C.x - 4), szZ(C.z + (C.z > 0 ? -1.6 : 1.6)), -Math.PI / 2); });
SZL.loops = [];
[["pic", 0], ["br", 118], ["tq", 400], ["hd", -400], ["sm", -200]].forEach(function (q) { var S = SZL_ST[q[0]], z = (S.f0 + S.f1) / 2, a0 = S.a0 + 20, a1 = S.a1 - 20, L = [[a0, z + 3.4], [a1, z + 3.4], [a1, z - 3.4], [a0, z - 3.4], [a0, z + 3.4]], d = 0; for (var i = 1; i < L.length; i++)
d += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); SZL.loops.push({ p: L, len: d }); });
var n = SZL.lite ? 3 : 10;
for (var c = 0; c < n; c++) {
var g = new THREE.Group();
live.add(g);
if (c % 3 === 2)
wcCart(g);
else
dlnHansom(g, 0, 0, 0);
var l = c % SZL.loops.length;
SZL.move.push({ g: g, l: l, s: c * 37, sp: 3 + c % 2, flip: c % 3 !== 2 });
}
},
function (k, x, z, ry, o) {
var F = SZL_FOLK[k], p = szPerson("sz_" + k, F.dress, { sex: F.sex });
p.position.set(x, (o && o.y) || 0.02, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "sz_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: (o && o.y) || 0.02 };
if (o && o.moor)
szMoorGround(P);
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet || "Good day to you." } });
return P;
},
function (R) {
var smart = ["gent", "lady", "jklady", "gent", "jkguest", "lady", "clergy", "jkfoot", "jkshop", "newsboy"], poor = ["wcwork", "wccoster", "wcloafer", "wcgirl", "maid", "jkshop", "newsboy"];
[["pic", smart, 26], ["sm", ["jkshop", "wcporter", "gent", "doctor", "nurse", "wcwork"], 14], ["br", smart.concat(poor), 16], ["ac", poor, 10], ["tq", ["lady", "gent", "maid", "jkshop"], 10], ["lgs", smart, 8], ["hd", poor.concat(["wcjew", "wcmatch"]), 16]].forEach(function (q, qi) {
var S = SZL_ST[q[0]], n = SZL.lite ? Math.ceil(q[2] / 4) : q[2];
for (var i = 0; i < n; i++) {
var a = S.a0 + 10 + R() * (S.a1 - S.a0 - 20), side = R() < 0.5, f = S.f1 - S.f0 > 12 ? (side ? S.f0 + 0.8 + R() * 1.8 : S.f1 - 0.8 - R() * 1.8) : (S.f0 + S.f1) / 2 + (R() - 0.5) * (S.f1 - S.f0 - 1.5), x = S.ax === "x" ? a : f, z = S.ax === "x" ? f : a;
var p = szPerson("szf" + qi + "_" + i, q[1][(R() * q[1].length) | 0]);
p.position.set(szX(x), 0.02, szZ(z));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: { r: S.f1 - S.f0 > 12 ? 18 : 5, sp: 0.4 + R() * 0.4 }, ground: 0.02 });
}
});
szNamed("pc", szX(90), szZ(-7), Math.PI / 2, { wander: 50 });
szNamed("newsboy", szX(-50), szZ(7.6), Math.PI);
szNamed("porter", szX(6), szZ(-209), 0);
szNamed("cabman", szX(-96), szZ(121), 0);
},
function () {
return function (x, W, H) {
var R = wRand(23);
x.fillStyle = "#6A5038";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 24) {
var g = x.createLinearGradient(0, y, 0, y + 24);
g.addColorStop(0, "#8A6A48");
g.addColorStop(0.5, "#7A5C3E");
g.addColorStop(1, "#4A3624");
x.fillStyle = g;
x.fillRect(0, y + 1, W, 22);
x.fillStyle = "#C8B898";
x.fillRect(0, y + 22, W, 2);
for (var k = 0; k < 10; k++) {
x.strokeStyle = "rgba(40,28,16,.4)";
x.beginPath();
var sx = R() * W;
x.moveTo(sx, y + 4 + R() * 14);
x.lineTo(sx + 20 + R() * 40, y + 4 + R() * 14);
x.stroke();
}
}
};
},
function () {
return function (x, W, H) {
var R = wRand(29);
x.fillStyle = "#E8E2D4";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 16) {
x.fillStyle = "rgba(120,110,90,.35)";
x.fillRect(0, y + 13, W, 3);
x.fillStyle = "rgba(255,255,250,.5)";
x.fillRect(0, y, W, 2);
}
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(140,130,110," + (0.05 + R() * 0.12) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 6, 1);
}
};
},
function () {
return function (x, W, H) {
var R = wRand(37);
x.fillStyle = "#C8A880";
x.fillRect(0, 0, W, H);
for (var r = 0; r < H; r += 20) {
var c = (r / 20) % 2 ? -20 : 0;
for (var b = c; b < W; b += 40) {
var v = 170 + ((R() * 40) | 0);
x.fillStyle = "rgb(" + (v + 20) + "," + (v) + "," + (v - 34) + ")";
x.fillRect(b + 1, r + 1, 38, 18);
}
}
for (var i = 0; i < 600; i++) {
x.fillStyle = "rgba(90,70,40," + (0.05 + R() * 0.15) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
};
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : suH(x, z), g = new THREE.Group();
g.position.set(suX(x), y, suZ(z));
g.rotation.y = ry || 0;
P.add(g);
var k = o.kind || "frame", w = o.w || 7, d = o.d || 6, st = o.st || 1, h = st * 3.0, wall = suMat("su" + k, 256, 256, k === "log" ? suLogTex() : k === "adobe" ? suAdobeTex() : suBoardTex()), dark = dlnC(0x1A1C20), lit = dlnGlow(0xF0C070), frame = dlnC(k === "frame" ? 0x3A4A3A : 0xE8E2D4);
dlnBox(g, w, h, d, wall, 0, h / 2, 0);
if (k === "adobe")
dlnBox(g, w + 0.3, 0.4, d + 0.3, dlnC(0x8A6A48), 0, h + 0.2, 0);
else
dlnGable(g, w + 0.6, d + 0.8, k === "log" ? 1.8 : 2.4, suShingle(), 0, h, 0);
dlnBox(g, 0.9, 2.4, 0.9, dlnS("stone", 0x8A847A), -w / 2 + 0.5, h + (k === "adobe" ? 1.0 : 1.5), 0);
var dx = o.door != null ? o.door : 0;
dlnBox(g, 1.1, 2.1, 0.12, dlnS("oak", 0x5A4030), dx, 1.05, d / 2 + 0.03);
if (o.porch && !SZU.lite) {
dlnBox(g, w, 0.15, 2.2, dlnS("oak", 0x7A6040), 0, 0.08, d / 2 + 1.1);
dlnBox(g, w + 0.2, 0.1, 2.4, suShingle(), 0, 2.7, d / 2 + 1.2).rotation.x = -0.12;
for (var p = 0; p < 4; p++)
dlnBox(g, 0.14, 2.6, 0.14, dlnS("oak", 0x7A6040), -w / 2 + 0.3 + p * (w - 0.6) / 3, 1.3, d / 2 + 2.1);
}
var cols = Math.max(1, Math.round(w / 3));
for (var f = 0; f < st; f++)
for (var c = 0; c < cols; c++) {
var wx = -w / 2 + (c + 0.5) * w / cols;
if (f === 0 && Math.abs(wx - dx) < 1.2)
continue;
var wy = 1.5 + f * 3.0;
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, wy, d / 2 + 0.02);
dlnBox(g, 0.84, 1.04, 0.06, (c + f + (o.seed || 0)) % 3 === 0 ? lit : dark, wx, wy, d / 2 + 0.05);
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, wy, -d / 2 - 0.02);
dlnBox(g, 0.84, 1.04, 0.06, dark, wx, wy, -d / 2 - 0.05);
}
if (o.sign) {
var sg = wcSign(o.sign, Math.min(w - 0.6, o.sign.length * 0.28), 0.5, "#2A1E14", "#E8D8A8");
sg.position.set(0, h - 0.5, d / 2 + 0.08);
g.add(sg);
}
var sw = ry && Math.abs(Math.sin(ry)) > 0.7;
shkSolidBox(suX(x), suZ(z), sw ? d + 0.4 : w + 0.4, sw ? w + 0.4 : d + 0.4, 0);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var y = suH(x, z), g = new THREE.Group();
g.position.set(suX(x), y, suZ(z));
g.rotation.y = ry || 0;
P.add(g);
var body = dlnS("oak", 0x6A5038), wheel = dlnC(0x3A2A1C), can = dlnC(0xF0EADA);
dlnBox(g, 1.6, 0.7, 3.6, body, 0, 1.15, 0);
[[-0.9, 1.2, 0.7], [0.9, 1.2, 0.7], [-0.9, -1.2, 0.55], [0.9, -1.2, 0.55]].forEach(function (w) { var c = dlnCyl(g, w[2], w[2], 0.08, wheel, w[0], w[2], w[1], 12); c.rotation.z = Math.PI / 2; });
var top = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 3.8, 12, 1, true, 0, Math.PI), can);
top.rotation.z = Math.PI / 2;
top.rotation.y = Math.PI / 2;
top.position.set(0, 1.5, 0);
top.scale.set(1, 1.15, 1);
g.add(top);
top.material.side = THREE.DoubleSide;
dlnBox(g, 0.08, 0.08, 2.0, body, 0, 0.9, 2.8);
if (!o.noteam) {
[-0.45, 0.45].forEach(function (k, i) { var h = wsmHorse(i ? 0x5A3A22 : 0x3A2414); h.scale.set(0.66, 0.62, 0.66); h.position.set(k, 0, 3.6); g.add(h); });
}
shkSolidBox(suX(x), suZ(z), ry && Math.abs(Math.sin(ry)) > 0.7 ? 7 : 2.4, ry && Math.abs(Math.sin(ry)) > 0.7 ? 2.4 : 7, ry || 0);
return g;
},
function (P, ax, az, bx, bz, o) {
o = o || {};
var L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(L / 3)), ry = Math.atan2(bx - ax, bz - az), wood = dlnS("oak", 0x7A6448);
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = suH(x, z);
for (var r = 0; r < 3; r++) {
var b = dlnBox(P, 0.1, 0.1, L / n + 0.3, wood, suX(x) + (i % 2 ? 0.15 : -0.15), y + 0.35 + r * 0.4, suZ(z));
b.rotation.y = ry + (i % 2 ? 0.12 : -0.12);
}
dlnBox(P, 0.14, 1.4, 0.14, wood, suX(ax + (bx - ax) * i / n), suH(ax + (bx - ax) * i / n, az + (bz - az) * i / n) + 0.7, suZ(az + (bz - az) * i / n));
if (!o.open)
shkSolidBox(suX(x), suZ(z), 0.3, L / n, ry);
}
},
function (P, x0, z0, x1, z1, kind, R) {
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), C = new THREE.Color(), list = [], step = SZU.lite ? 1.6 : 0.9;
for (var z = z0; z < z1; z += step * 1.6)
for (var x = x0; x < x1; x += step) {
list.push([x + (R() - 0.5) * 0.3, z + (R() - 0.5) * 0.3]);
}
var geo = kind === "corn" ? new THREE.ConeGeometry(0.22, 1, 4, 1, true) : new THREE.ConeGeometry(0.3, 1, 3, 1, true), mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), mesh = new THREE.InstancedMesh(geo, mat, list.length), cols = kind === "corn" ? [0x5A7A2A, 0x4A6A22, 0x6A8A32] : [0xC8B060, 0xB8A050, 0xD8C070, 0xA89040];
list.forEach(function (p, i) { var y = suH(p[0], p[1]), h = kind === "corn" ? 1.6 + R() * 0.6 : 0.8 + R() * 0.3; E.set(0, R() * 6.28, 0); Q.setFromEuler(E); S.set(1, h, 1); V.set(suX(p[0]), y + h / 2, suZ(p[1])); M.compose(V, Q, S); mesh.setMatrixAt(i, M); C.setHex(cols[(R() * cols.length) | 0]); mesh.setColorAt(i, C); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
mesh.userData.keep = 1;
P.add(mesh);
},
function (P, R) {
var K = SZU_SITE.rock;
for (var i = 0; i < (SZU.lite ? 8 : 18); i++) {
var a = i * 0.9, r = 4 + R() * 12, s = 1.6 + R() * 3.2;
suRock(P, K.x + Math.cos(a) * r, K.z + Math.sin(a) * r, s, R);
if (s > 2.2)
shkSolid({ x: suX(K.x + Math.cos(a) * r), z: suZ(K.z + Math.sin(a) * r), r: s * 0.8 });
}
suRock(P, K.x - 6, K.z - 6, 5.5, R, { flat: 0.9 });
shkSolid({ x: suX(K.x - 6), z: suZ(K.z - 6), r: 4.6 });
szSpotM(K.x + 6, K.z + 6, 3, "The rock on the plain", "look at it", function () { szTale("🪨 The rock on the plain", ["'On the sixteenth of May, 1847, a solitary traveller... he ascended a small eminence... Nowhere was there any sign of water, or of life... He had come so far, he was dying, and he had the child with him.'"]); });
var T = SZU_SITE.train;
for (var w = 0; w < (SZU.lite ? 5 : 12); w++) {
var a2 = w / 12 * 6.28, x = T.x + Math.cos(a2) * 26, z = T.z + Math.sin(a2) * 18;
suWagon(P, x, z, a2 + Math.PI / 2, { noteam: w % 3 !== 0 });
}
var ash = dlnC(0x3A3430), fire = dlnGlow(0xF0A040);
for (var f = 0; f < 3; f++) {
var fx = T.x - 8 + f * 8, fz = T.z + (f - 1) * 4;
dlnCyl(P, 0.6, 0.7, 0.12, ash, suX(fx), suH(fx, fz) + 0.06, suZ(fz), 10);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 6), fire);
fl.position.set(suX(fx), suH(fx, fz) + 0.5, suZ(fz));
P.add(fl);
}
szSpotM(T.x, T.z + 4, 3.4, "The wagon train", "look at it", function () { szTale("🐂 The wagon train", ["'A great caravan of emigrants... the plain was alive with them: wagons and carts, men on horseback and men on foot. Innumerable women staggered along under burdens, and children toddled beside the wagons.'", "In 1847 the first companies came west from the Missouri River, more than a thousand miles, by wagon and handcart."]); });
szDoorM("sz_wagon", T.x + 28.5, T.z, "The great wagon");
szSpotM(-700, 10, 3, "The Great Alkali Plain", "look about", function () { szTale("🏜️ The Great Alkali Plain", SZU_FACTS.plain.concat(SZU_FACTS.sierra)); });
},
function (P, R) {
var F = SZU_FLAT[0], y = F.h, A = SZU_SITE.farm;
var house = suHouse(P, A.x, A.z, 0, { kind: "frame", w: 12, d: 8, st: 2, y: y, porch: 1, seed: 2 });
suHouse(P, A.x - 22, A.z - 6, 0.1, { kind: "log", w: 7, d: 6, y: y, seed: 5 });
var barn = new THREE.Group();
barn.position.set(suX(A.x + 26), y, suZ(A.z - 10));
P.add(barn);
var bw = suMat("sulog", 256, 256, suLogTex());
dlnBox(barn, 12, 6, 16, bw, 0, 3, 0);
dlnGable(barn, 12.6, 16.6, 4, suShingle(), 0, 6, 0);
dlnBox(barn, 4, 4.6, 0.12, dlnS("oak", 0x5A3A28), 0, 2.3, 8.06);
shkSolidBox(suX(A.x + 26), suZ(A.z - 10), 12.4, 16.4, 0);
suFence(P, A.x + 18, A.z + 4, A.x + 40, A.z + 4);
suFence(P, A.x + 40, A.z + 4, A.x + 40, A.z + 24);
suFence(P, A.x + 40, A.z + 24, A.x + 18, A.z + 24);
suFence(P, A.x + 18, A.z + 24, A.x + 18, A.z + 14);
for (var c = 0; c < (SZU.lite ? 2 : 5); c++) {
var hx = A.x + 24 + c * 3.4, hz = A.z + 12 + (c % 2) * 5, h = wsmHorse([0x5A3A22, 0x8A6A4A, 0x2A1A10][c % 3]);
h.scale.set(0.7, 0.66, 0.7);
h.position.set(suX(hx), suH(hx, hz), suZ(hz));
h.rotation.y = R() * 6.28;
P.add(h);
}
suField(P, A.x + 50, A.z - 60, A.x + 120, A.z - 10, "wheat", R);
suField(P, A.x + 50, A.z + 10, A.x + 110, A.z + 50, "corn", R);
suField(P, A.x - 70, A.z - 70, A.x - 30, A.z - 20, "wheat", R);
suFence(P, A.x + 48, A.z - 62, A.x + 122, A.z - 62, { open: 1 });
suFence(P, A.x + 48, A.z + 52, A.x + 112, A.z + 52, { open: 1 });
var bark = dlnS("oak", 0x4A3624), leaf = dlnC(0x4A7A2A), blossom = dlnC(0xE8D0D8);
for (var t = 0; t < (SZU.lite ? 8 : 24); t++) {
var tx = A.x - 28 + (t % 6) * 5, tz = A.z + 20 + ((t / 6) | 0) * 5, ty = suH(tx, tz);
dlnCyl(P, 0.1, 0.14, 1.6, bark, suX(tx), ty + 0.8, suZ(tz), 5);
var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), t % 4 ? leaf : blossom);
cr.position.set(suX(tx), ty + 2.2, suZ(tz));
P.add(cr);
shkSolid({ x: suX(tx), z: suZ(tz), r: 0.3 });
}
dlnCyl(P, 0.8, 0.9, 0.9, dlnS("stone", 0x8A847A), suX(A.x - 8), y + 0.45, suZ(A.z + 10), 10);
shkSolid({ x: suX(A.x - 8), z: suZ(A.z + 10), r: 1.0 });
for (var wp = 0; wp < 6; wp++)
dlnCyl(P, 0.16, 0.16, 1.6, bark, suX(A.x + 8 + (wp % 3) * 0.34), y + 0.2 + ((wp / 3) | 0) * 0.32, suZ(A.z + 6), 6).rotation.z = Math.PI / 2;
suFence(P, A.x - 40, A.z + 40, A.x + 40, A.z + 40, { open: 1 });
dlnBox(P, 3.4, 1.6, 0.16, dlnS("oak", 0x7A6448), suX(A.x), y + 0.8, suZ(A.z + 40));
szDoorM("sz_ffarm", A.x, A.z + 5.2, "John Ferrier's farmhouse");
szSpotM(A.x + 6, A.z + 12, 3, "John Ferrier's farm", "look about", function () { szTale("🌾 John Ferrier's farm", SZU_FACTS.farm); });
},
function (P, R) {
var C = SZU_CITY, y = SZU_FLAT[1].h, dirt = suMat("sutrack", 128, 128, suTrackTex()), water = dlnShine(0x5A7A8A, 0.1, 0.6), n = 0;
for (var gx = C.x0; gx <= C.x1; gx += C.step) {
dlnPlane(P, C.w, C.z1 - C.z0 + C.w, dirt, suX(gx), y + 0.03, suZ((C.z0 + C.z1) / 2));
dlnPlane(P, 0.8, C.z1 - C.z0, water, suX(gx + C.w / 2 + 0.6), y + 0.05, suZ((C.z0 + C.z1) / 2));
}
for (var gz = C.z0; gz <= C.z1; gz += C.step) {
dlnPlane(P, C.x1 - C.x0 + C.w, C.w, dirt, suX((C.x0 + C.x1) / 2), y + 0.035, suZ(gz));
dlnPlane(P, C.x1 - C.x0, 0.8, water, suX((C.x0 + C.x1) / 2), y + 0.05, suZ(gz + C.w / 2 + 0.6));
}
for (var bx = C.x0; bx < C.x1; bx += C.step)
for (var bz = C.z0; bz < C.z1; bz += C.step) {
var cx = bx + C.step / 2, cz = bz + C.step / 2;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q, qi) {
if (SZU.lite && qi % 2)
return;
var hx = cx + q[0] * 18, hz = cz + q[1] * (C.step / 2 - C.w / 2 - 9), ry = q[1] > 0 ? 0 : Math.PI, k = ["adobe", "frame", "log", "adobe", "frame"][(R() * 5) | 0];
n++;
if (Math.hypot(hx - SZU_PLACES.store.x, hz - SZU_PLACES.store.z) < 14)
return;
suHouse(P, hx, hz, ry, { kind: k, w: 6 + R() * 4, d: 5 + R() * 2, st: k === "frame" && R() < 0.4 ? 2 : 1, y: y, seed: qi, porch: k === "frame" });
});
if (!SZU.lite) {
for (var t = 0; t < 4; t++) {
var tx = cx - 30 + t * 20, tz = cz, ty = y;
dlnCyl(P, 0.12, 0.16, 2.0, dlnS("oak", 0x4A3624), suX(tx), ty + 1.0, suZ(tz), 5);
var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 0), dlnC(0x5A8A32));
cr.position.set(suX(tx), ty + 2.8, suZ(tz));
P.add(cr);
}
}
}
var S = SZU_PLACES.store;
suHouse(P, S.x, S.z - 6, 0, { kind: "frame", w: 14, d: 10, st: 2, y: y, porch: 1, sign: "GENERAL STORE · DRY GOODS · FLOUR · POWDER & SHOT" });
szDoorM("sz_store", S.x, S.z - 0.4, "The store");
for (var h = 0; h < (SZU.lite ? 2 : 6); h++) {
var hx2 = C.x0 + 20 + h * 42, hz2 = C.z0 + C.w / 2 + 2;
dlnBox(P, 3, 0.1, 0.1, dlnS("oak", 0x7A6448), suX(hx2), y + 1.0, suZ(hz2));
}
suWagon(P, C.x0 + 60, C.z0 + 3, Math.PI / 2);
if (!SZU.lite)
suWagon(P, C.x0 + 180, C.z0 + 80 + 3, -Math.PI / 2);
szSpotM(SZU_PLACES.city.x, SZU_PLACES.city.z, 3.4, "The city in the valley", "look about", function () { szTale("🏘️ The city of the Salt Lake", SZU_FACTS.valley); });
},
function (P, R) {
var C = SZU_SITE.camp, y = SZU_CAMPH, g = new THREE.Group();
g.position.set(suX(C.x), y, suZ(C.z));
P.add(g);
var bough = dlnC(0x2A3A1E), pole = dlnS("oak", 0x5A4030);
for (var b = 0; b < 5; b++) {
var p = dlnBox(g, 0.1, 3.2, 0.1, pole, -2 + b, 1.3, -1.2);
p.rotation.x = 0.5;
}
var roof = dlnBox(g, 5.2, 0.2, 3.4, bough, 0, 1.6, -0.4);
roof.rotation.x = 0.5;
dlnCyl(g, 0.7, 0.8, 0.14, dlnC(0x3A3430), 2.6, 0.07, 1.6, 10);
for (var s = 0; s < 8; s++) {
var a = s / 8 * 6.28;
suRock(P, C.x + 2.6 + Math.cos(a) * 0.9, C.z + 1.6 + Math.sin(a) * 0.9, 0.25, R, { y: y, flat: 0.8 });
}
shkSolidBox(suX(C.x), suZ(C.z - 1), 5.4, 3.2, 0);
szDoorM("sz_cabin", C.x, C.z + 1.4, "The shelter on the ledge");
var G = SZU_SITE.grave, gy = suH(G.x, G.z);
var mound = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, 6.28, 0, 1.4), dlnC(0x7A6A52));
mound.scale.set(0.9, 0.35, 1.9);
mound.position.set(suX(G.x), gy, suZ(G.z));
P.add(mound);
dlnBox(P, 0.06, 1.2, 0.06, pole, suX(G.x), gy + 0.6, suZ(G.z - 2));
dlnBox(P, 0.4, 0.3, 0.02, dlnC(0xF4F0E4), suX(G.x), gy + 1.1, suZ(G.z - 2) + 0.04);
szSpotM(C.x + 2, C.z + 3, 2.6, "The camp on the ledge", "look about", function () { szTale("⛺ The camp on the ledge", ["A ledge high on the mountain wall, sheltered by the rock, with the whole valley spread below; the trail climbs to it from the gorge."]); });
var S = SZU_SITE.sentinel;
szSpotM(S.x, S.z, 3, "Eagle Cañon", "look about", function () { szTale("⛰️ Eagle Cañon", SZU_FACTS.canyon); });
},
function (R) {
var add = function (seed, who, x, z, ry, o) { var p = szPerson(seed, who, o); p.position.set(suX(x), suH(x, z) + 0.02, suZ(z)); p.rotation.y = ry || 0; SHK.live.add(p); var P = { g: p, wander: o && o.wander ? { r: o.wander, sp: 0.35 } : null }; szMoorGround(P); SHK.people.push(P); return P; };
var C = SZU_CITY;
for (var i = 0; i < (SZU.lite ? 6 : 22); i++) {
var onx = R() < 0.5, x = onx ? C.x0 + R() * (C.x1 - C.x0) : C.x0 + ((R() * 4) | 0) * C.step, z = onx ? C.z0 + ((R() * 3) | 0) * C.step : C.z0 + R() * (C.z1 - C.z0);
add("szc" + i, i % 2 ? "szpionw" : "szpion", x + (R() - 0.5) * 6, z + (R() - 0.5) * 6, R() * 6.28, { wander: 16 });
}
if (!SZU.lite)
for (var k = 0; k < 5; k++)
add("szck" + k, k % 2 ? "wcgirl" : "newsboy", C.x0 + 40 + k * 7, C.z0 + 6, R() * 6.28, { wander: 6, child: true });
szNamed("storekeep", suX(SZU_PLACES.store.x + 2), suZ(SZU_PLACES.store.z + 3), Math.PI, { moor: 1, y: suH(SZU_PLACES.store.x + 2, SZU_PLACES.store.z + 3) });
szNamed("settler", suX(SZU_PLACES.main.x), suZ(SZU_PLACES.main.z), 0, { moor: 1, y: suH(SZU_PLACES.main.x, SZU_PLACES.main.z), wander: 30 });
szNamed("setw", suX(SZU_PLACES.main.x + 20), suZ(SZU_PLACES.main.z + 4), Math.PI, { moor: 1, y: suH(SZU_PLACES.main.x + 20, SZU_PLACES.main.z + 4), wander: 20 });
for (var f = 0; f < (SZU.lite ? 3 : 10); f++) {
var fx = SZU_SITE.farm.x + 60 + R() * 200, fz = SZU_SITE.farm.z + (R() - 0.5) * 160;
if (suBlockLocal(fx, fz))
continue;
add("szfm" + f, "szpion", fx, fz, R() * 6.28, { wander: 24 });
}
var hide = [0x5A3A22, 0x8A5A3A, 0x2A1A14, 0xE8E0D0, 0x7A4A2A], geo = new THREE.IcosahedronGeometry(1, 1);
for (var c = 0; c < (SZU.lite ? 8 : 30); c++) {
var x2 = -60 + R() * 260, z2 = 60 + R() * 240;
if (suBlockLocal(x2, z2))
continue;
var g = new THREE.Group();
g.position.set(suX(x2), suH(x2, z2), suZ(z2));
g.rotation.y = R() * 6.28;
SZU.live.add(g);
var col = dlnC(hide[(R() * 5) | 0]);
var b = new THREE.Mesh(geo, col);
b.scale.set(0.55, 0.5, 1.0);
b.position.y = 1.0;
g.add(b);
var hd = new THREE.Mesh(geo, col);
hd.scale.set(0.26, 0.28, 0.36);
hd.position.set(0, 1.15, 1.05);
g.add(hd);
[-0.2, 0.2].forEach(function (s) { var hn = dlnCyl(g, 0.03, 0.05, 0.5, dlnC(0xE8E0C8), s * 1.6, 1.4, 1.0, 5); hn.rotation.z = s * 4; });
[[-0.3, -0.6], [0.3, -0.6], [-0.3, 0.6], [0.3, 0.6]].forEach(function (l) { dlnCyl(g, 0.07, 0.07, 0.75, col, l[0], 0.38, l[1], 5); });
shkSolid({ x: suX(x2), z: suZ(z2), r: 1.0 });
}
var T = SZU_SITE.train;
for (var e = 0; e < (SZU.lite ? 5 : 16); e++)
add("szem" + e, e % 3 === 0 ? "szpionw" : e % 3 === 1 ? "szpion" : "szelder", T.x + (R() - 0.5) * 30, T.z + (R() - 0.5) * 20, R() * 6.28, { wander: 10 });
},
function (pieces, R, live) {
pieces.forEach(function (pc) {
var all = new THREE.Group();
SHK.G.add(all);
pc[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[scarlet] " + (f.name || "?"), e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = pc[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[scarlet] bake", e);
}
SHK.dist.push({ n: pc[0], g: g, x: pc[2], z: pc[3], r: pc[4] });
});
},
function () {
if (SZL.built || !SHK.G)
return;
DLN.lite = SZL.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1881), live0 = SHK.live;
SZL.live = new THREE.Group();
SZL.live.name = "sz-live";
SHK.G.add(SZL.live);
SZL.move = [];
szBuildPieces([["sz-pic", [szGroundLdn, szLdnHouses, szCriterion, szBarts, szLauriston, szAudley, szCamberwell, szLdnThings], szX(0), szZ(100), 620]], R, SZL.live);
try {
szLdnTraffic();
}
catch (e) {
if (window.console)
console.warn("[scarlet] traffic", e);
}
try {
szLdnFolk(R);
}
catch (e) {
if (window.console)
console.warn("[scarlet] folk", e);
}
SHK.live = live0;
SZL.built = true;
},
function () {
if (SZU.built || !SHK.G)
return;
DLN.lite = SZU.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1847), live0 = SHK.live;
SZU.live = new THREE.Group();
SZU.live.name = "su-live";
SHK.G.add(SZU.live);
szBuildPieces([["su-ground", [suLandAll], suX(0), suZ(0), 2600], ["su-plain", [szPlainBuild], suX(-600), suZ(150), 400], ["su-valley", [szFarmBuild, szCityBuild], suX(320), suZ(60), 520], ["su-mtn", [szCampBuild], suX(-280), suZ(-150), 400]], R, SZU.live);
try {
szUtahFolk(R);
}
catch (e) {
if (window.console)
console.warn("[scarlet] folk", e);
}
SHK.live = live0;
SZU.built = true;
},
function (kind) {
if (SZ_PAPERS[kind])
return SZ_PAPERS[kind];
var P = SZ_PAPER_DEF[kind];
var t = wTex(P.w || 256, P.h || 256, P.f);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(P.rx || 1, P.ry || 1);
if (t.anisotropy !== undefined)
t.anisotropy = 4;
var m = new THREE.MeshLambertMaterial({ map: t, color: P.col || 0xFFFFFF });
m.userData.ctn = 1;
return (SZ_PAPERS[kind] = m);
},
function (x, W, H) {
var R = wRand(81);
x.fillStyle = "#E6DCC6";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 40; i++) {
x.strokeStyle = "rgba(150,130,100," + (0.1 + R() * 0.2) + ")";
x.lineWidth = 0.5 + R() * 1.5;
x.beginPath();
var sx = R() * W, sy = R() * H;
x.moveTo(sx, sy);
for (var k = 0; k < 5; k++) {
sx += R() * 40 - 20;
sy += R() * 30;
x.lineTo(sx, sy);
}
x.stroke();
}
x.strokeStyle = "#B8943A";
x.lineWidth = 5;
x.strokeRect(14, 26, W - 28, H - 52);
x.lineWidth = 2;
x.strokeRect(22, 34, W - 44, H - 68);
x.fillStyle = "#7A5A2A";
x.fillRect(0, 0, W, 8);
x.fillStyle = "#C8A048";
x.fillRect(0, 8, W, 6);
},
function (x, W, H) {
var R = wRand(82);
for (var y = 0; y < H; y += 8)
for (var c = 0; c < W; c += 8) {
var v = R();
x.fillStyle = v < 0.7 ? "rgb(" + (200 + (R() * 40 | 0)) + "," + (150 + (R() * 40 | 0)) + ",60)" : v < 0.85 ? "#A87A2A" : "#E8D080";
x.fillRect(c, y, 7, 7);
}
x.strokeStyle = "#3A5A8A";
x.lineWidth = 6;
x.beginPath();
x.arc(W / 2, H / 2, W * 0.32, 0, 7);
x.stroke();
x.strokeStyle = "#8A2A2A";
x.lineWidth = 3;
for (var a = 0; a < 8; a++) {
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.cos(a * 0.785) * W * 0.3, H / 2 + Math.sin(a * 0.785) * W * 0.3);
x.stroke();
}
},
function (x, W, H) { var s = W / 4; for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++) {
x.fillStyle = (r + c) % 2 ? "#B8643A" : "#E8DCC0";
x.fillRect(c * s, r * s, s, s);
x.fillStyle = "#2A2420";
x.beginPath();
x.moveTo(c * s + s / 2, r * s + 6);
x.lineTo(c * s + s - 6, r * s + s / 2);
x.lineTo(c * s + s / 2, r * s + s - 6);
x.lineTo(c * s + 6, r * s + s / 2);
x.closePath();
x.fill();
x.fillStyle = (r + c) % 2 ? "#E8DCC0" : "#B8643A";
x.beginPath();
x.arc(c * s + s / 2, r * s + s / 2, s * 0.15, 0, 7);
x.fill();
} },
function (x, W, H) {
var R = wRand(83);
x.fillStyle = "#A89058";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 4; r++)
for (var c = 0; c < 3; c++) {
var cx = c * W / 3 + W / 6 + (r % 2) * W / 6, cy = r * H / 4 + H / 8;
x.fillStyle = "#8A3A26";
for (var p = 0; p < 7; p++) {
x.beginPath();
x.ellipse(cx + Math.cos(p * 0.9) * 16, cy + Math.sin(p * 0.9) * 16, 14, 6, p * 0.9, 0, 7);
x.fill();
}
x.fillStyle = "#C0702E";
x.beginPath();
x.arc(cx, cy, 9, 0, 7);
x.fill();
x.strokeStyle = "#4A6A2A";
x.lineWidth = 3;
x.beginPath();
x.moveTo(cx, cy + 12);
x.quadraticCurveTo(cx + 20, cy + 30, cx + 8, cy + 50);
x.stroke();
}
for (var m = 0; m < 14; m++) {
var g = x.createRadialGradient(0, 0, 0, 0, 0, 1);
var mx = R() * W, my = R() * H, mr = 10 + R() * 40;
var gr = x.createRadialGradient(mx, my, 0, mx, my, mr);
gr.addColorStop(0, "rgba(60,64,40,.55)");
gr.addColorStop(1, "rgba(60,64,40,0)");
x.fillStyle = gr;
x.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
}
for (var s = 0; s < 2; s++) {
var sx = R() * W * 0.8, sw = 24 + R() * 30, sh = 60 + R() * 120;
x.fillStyle = "#D8C890";
x.fillRect(sx, 0, sw, sh);
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(sx + sw, 0, 3, sh);
}
x.fillStyle = "rgba(40,30,20,.18)";
x.fillRect(0, H - 30, W, 30);
},
function (x, W, H) {
var R = wRand(84);
for (var c = 0; c < W; c += 32) {
var v = 110 + (R() * 30 | 0);
x.fillStyle = "rgb(" + v + "," + (v - 18) + "," + (v - 40) + ")";
x.fillRect(c, 0, 31, H);
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(c + 31, 0, 1, H);
}
for (var i = 0; i < 3000; i++) {
x.fillStyle = "rgba(190,180,160," + (R() * 0.12) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
},
function (x, W, H) {
x.fillStyle = "#2E4A36";
x.fillRect(0, 0, W, H);
for (var c = 0; c < W; c += 64) {
x.fillStyle = "#B8964A";
x.fillRect(c, 0, 3, H);
x.fillRect(c + 10, 0, 1, H);
for (var y = 16; y < H; y += 48) {
x.fillStyle = "#3E5E46";
x.beginPath();
x.moveTo(c + 36, y);
x.lineTo(c + 50, y + 18);
x.lineTo(c + 36, y + 36);
x.lineTo(c + 22, y + 18);
x.closePath();
x.fill();
}
}
},
function (x, W, H) {
var R = wRand(86), pal = [["#C8B890", "#8A5A3A"], ["#6A8AA8", "#E8E0C8"], ["#A86A6A", "#F0E0C0"], ["#8A9A6A", "#3A4A2A"], ["#E0D0A0", "#7A3A5A"], ["#5A4A6A", "#C8A85A"]];
for (var pi = 0; pi < 6; pi++) {
var c = pi * W / 6, p = pal[pi];
x.fillStyle = p[0];
x.fillRect(c, 0, W / 6, H);
x.fillStyle = p[1];
for (var y = 8; y < H; y += 28) {
for (var k = 6; k < W / 6; k += 20) {
if (R() < 0.8) {
x.beginPath();
x.arc(c + k, y + ((k / 20) % 2) * 12, 4, 0, 7);
x.fill();
}
}
}
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(c, 0, 2, H);
}
},
function (x, W, H) {
x.fillStyle = "#7A2420";
x.fillRect(0, 0, W, H);
var s = 128;
for (var r = 0; r < H / s; r++)
for (var c = 0; c < W / s; c++) {
var cx = c * s + (r % 2) * s / 2, cy = r * s;
x.strokeStyle = "#D8B060";
x.lineWidth = 5;
x.beginPath();
x.moveTo(cx + s / 2, cy);
x.lineTo(cx + s, cy + s / 2);
x.lineTo(cx + s / 2, cy + s);
x.lineTo(cx, cy + s / 2);
x.closePath();
x.stroke();
x.fillStyle = "#2A4A8A";
x.beginPath();
x.arc(cx + s / 2, cy + s / 2, 12, 0, 7);
x.fill();
x.fillStyle = "#C89848";
x.beginPath();
x.arc(cx + s / 2, cy + s / 2, 5, 0, 7);
x.fill();
}
},
function (x, W, H) { var R = wRand(87); x.fillStyle = "#1E2E5A"; x.fillRect(0, 0, W, H); x.fillStyle = "#E0C070"; for (var i = 0; i < 60; i++) {
var sx = R() * W, sy = R() * H;
x.beginPath();
for (var a = 0; a < 10; a++) {
var rr = a % 2 ? 2 : 5;
x.lineTo(sx + Math.cos(a * 0.628) * rr, sy + Math.sin(a * 0.628) * rr);
}
x.fill();
} x.strokeStyle = "#C8A050"; x.lineWidth = 3; x.strokeRect(4, 4, W - 8, H - 8); },
function (x, W, H) {
var R = wRand(89);
for (var c = 0; c < W; c += W / 8) {
var v = 170 + (R() * 30 | 0);
var g = x.createLinearGradient(c, 0, c + W / 8, 0);
g.addColorStop(0, "rgb(" + (v - 20) + "," + (v - 50) + "," + (v - 100) + ")");
g.addColorStop(0.5, "rgb(" + v + "," + (v - 30) + "," + (v - 80) + ")");
g.addColorStop(1, "rgb(" + (v - 25) + "," + (v - 55) + "," + (v - 105) + ")");
x.fillStyle = g;
x.fillRect(c, 0, W / 8, H);
for (var k = 0; k < 6; k++) {
x.strokeStyle = "rgba(110,70,30,.22)";
x.lineWidth = 1.5;
x.beginPath();
var sx = c + 4 + R() * (W / 8 - 8);
x.moveTo(sx, 0);
x.bezierCurveTo(sx + 6, H * 0.3, sx - 6, H * 0.6, sx + 3, H);
x.stroke();
}
if (R() < 0.5) {
x.fillStyle = "rgba(90,50,20,.5)";
x.beginPath();
x.ellipse(c + W / 16, R() * H, 4, 7, 0, 0, 7);
x.fill();
}
x.fillStyle = "rgba(50,30,15,.6)";
x.fillRect(c + W / 8 - 2, 0, 2, H);
}
},
function (x, W, H) {
var R = wRand(90);
x.fillStyle = "#B8A890";
x.fillRect(0, 0, W, H);
var n = 6, rh = H / n;
for (var r = 0; r < n; r++) {
var g = x.createLinearGradient(0, r * rh, 0, r * rh + rh);
g.addColorStop(0, "#5A4028");
g.addColorStop(0.35, "#8A6A48");
g.addColorStop(0.7, "#7A5A3A");
g.addColorStop(1, "#3A2818");
x.fillStyle = g;
x.beginPath();
x.ellipse(W / 2, r * rh + rh / 2, W * 0.7, rh * 0.46, 0, 0, 7);
x.fill();
for (var k = 0; k < 5; k++) {
x.strokeStyle = "rgba(40,26,14,.35)";
x.beginPath();
var sx = R() * W, sy = r * rh + rh * 0.3 + R() * rh * 0.4;
x.moveTo(sx, sy);
x.lineTo(sx + 30 + R() * 60, sy + R() * 4 - 2);
x.stroke();
}
}
},
function (seed, who, x, y, z, ry, o) {
o = o || {};
var p = szPerson(seed, who, { sex: o.sex, inside: true, child: o.child });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.35 } : null };
SHK.people.push(P);
var T = null;
if (o.name) {
T = { p: P, name: o.name, r: o.r || 2.8, t: { name: o.name, persona: o.persona || SZL_ERA, greet: o.greet || "Good day to you." } };
SHK.talk.push(T);
}
SZL.home.push({ P: P, T: T, on: true, room: o.room });
return P;
},
function (g, x, z, ry, R, o) {
o = o || {};
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry || 0;
g.add(b);
var deal = dlnS("oak", 0xA89068), glass = new THREE.MeshLambertMaterial({ color: 0xC8E0E8, transparent: true, opacity: 0.55 }), w = o.w || 4;
dlnBox(b, w, 0.08, 1.2, dlnC(0x2A2A2A), 0, 0.92, 0);
dlnBox(b, w, 0.86, 1.1, deal, 0, 0.45, 0);
for (var i = 0; i < (SHK.lite ? 4 : 10); i++) {
var bx = -w / 2 + 0.3 + R() * (w - 0.6), bz = -0.4 + R() * 0.8, k = R();
if (k < 0.4) {
dlnCyl(b, 0.05, 0.05, 0.22, glass, bx, 1.07, bz, 8);
dlnCyl(b, 0.045, 0.045, 0.08, dlnC([0xC83A2A, 0x3A8A4A, 0xE8D040, 0x6A3A8A, 0x2A5AA8][(R() * 5) | 0]), bx, 1.0, bz, 8);
}
else if (k < 0.7) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), glass);
fl.position.set(bx, 1.06, bz);
b.add(fl);
dlnCyl(b, 0.02, 0.03, 0.18, glass, bx, 1.2, bz, 6);
}
else {
var rt = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), glass);
rt.position.set(bx, 1.08, bz);
b.add(rt);
var nk = dlnCyl(b, 0.015, 0.025, 0.3, glass, bx + 0.12, 1.16, bz, 6);
nk.rotation.z = -1.0;
}
}
dlnBox(b, 0.4, 0.12, 0.14, deal, w / 2 - 0.5, 1.02, -0.3);
for (var t = 0; t < 6; t++)
dlnCyl(b, 0.012, 0.012, 0.16, glass, w / 2 - 0.66 + t * 0.064, 1.12, -0.3, 6);
dlnCyl(b, 0.04, 0.06, 0.16, dlnShine(0x6A5A3A, 0.4, 0.7), w / 2 - 0.9, 1.04, 0.25, 8);
var fl2 = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 8), dlnGlow(0x5A8AFF));
fl2.position.set(w / 2 - 0.9, 1.18, 0.25);
b.add(fl2);
shkSolidBox(x, z, Math.abs(Math.sin(ry || 0)) > 0.7 ? 1.3 : w + 0.1, Math.abs(Math.sin(ry || 0)) > 0.7 ? w + 0.1 : 1.3, 0);
return b;
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 5.6, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: szPaper("critfloor"), wall: szPaper("critwall"), low: dlnS("oak", 0x3A2414), lowH: 1.3, h: h, ceil: szPaper("critceil"), outName: "Out to Piccadilly", out: szOutL("crit") });
wcBar(g, cx - Rm.hw + 1.6, cz - 1, 10, Math.PI / 2);
dlnBox(g, 0.1, 2.4, 12, dlnShine(0xC8D0D8, 0.05, 0.9), cx - Rm.hw + 0.1, 2.6, cz - 1);
for (var b = 0; b < (SHK.lite ? 10 : 28); b++)
dlnCyl(g, 0.05, 0.05, 0.3, dlnC([0x3A6A3A, 0x6A3A1A, 0xE8E0C8, 0x2A2A6A][b % 4]), cx - Rm.hw + 0.4, 1.7 + ((b / 14) | 0) * 0.5, cz - 6 + (b % 14) * 0.8, 8);
for (var t = 0; t < 4; t++) {
n14Table(g, cx + 2.6, cz - 5 + t * 3, 0.9, 0.9, 0.76, dlnS("marble", 0xFFFFFF), null);
n14Chair(g, cx + 1.7, cz - 5 + t * 3, Math.PI / 2, mah, 0x6A1A1A);
n14Chair(g, cx + 3.5, cz - 5 + t * 3, -Math.PI / 2, mah, 0x6A1A1A);
}
n14Gasolier(g, cx, h, cz - 3);
n14Gasolier(g, cx, h, cz + 2);
shkSpot(cx - Rm.hw + 2.8, cz - 1, 2.0, "The Long Bar", "lean on it", function () { szTale("🍸 The Long Bar", SZL_FACTS.crit); });
szHome("sz_barman", "jkshop", cx - Rm.hw + 0.8, 0.02, cz + 1, Math.PI / 2, { name: "The barman", persona: SZL_FOLK.barman.persona, greet: "What will it be, sir?", room: "sz_crit" });
for (var q = 0; q < (SHK.lite ? 2 : 6); q++)
szHome("sz_cg" + q, ["gent", "gent", "jkguest", "gent", "clergy", "gent"][q], cx - Rm.hw + 2.6, 0.02, cz - 5 + q * 1.6, -Math.PI / 2 + q * 0.3, { room: "sz_crit" });
Rm.hello = "<b>The Long Bar of the Criterion.</b> Marble and mosaic, mirrors and gaslight; Army men and young doctors at the rail.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 6.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A6A48), wall: dlnS("stone", 0xD8D2C4), low: dlnS("oak", 0x6A5038), lowH: 1.0, h: h, ceil: dlnC(0xE8E4DA), outName: "Out to the hospital gate", out: szOutL("barts") });
[-1, 1].forEach(function (s) {
for (var r = 0; r < 4; r++) {
dlnBox(g, 0.36, 0.05, Rm.hd * 2 - 4, dlnS("oak", 0x6A5038), cx + s * (Rm.hw - 0.25), 1.2 + r * 0.7, cz - 1);
for (var b = 0; b < (SHK.lite ? 6 : 18); b++)
dlnCyl(g, 0.06, 0.06, 0.26, dlnC([0x8A5A2A, 0x3A6A3A, 0xC8D8E0, 0x6A3A1A, 0x2A3A6A, 0xE8E0C8][(b + r) % 6]), cx + s * (Rm.hw - 0.25), 1.36 + r * 0.7, cz - Rm.hd + 2.4 + b * ((Rm.hd * 2 - 5) / 18), 8);
}
});
szLabBench(g, cx - 2.2, cz - 5, 0, R, { w: 4.4 });
szLabBench(g, cx + 2.2, cz - 5, 0, R, { w: 4.4 });
szLabBench(g, cx - 2.2, cz - 0.6, 0, R, { w: 4.4 });
szLabBench(g, cx + 2.2, cz + 3.4, 0, R, { w: 4.4 });
jkStill(g, cx + Rm.hw - 1.2, cz + 5, -Math.PI / 2);
for (var i = 0; i < 3; i++)
shkLightWin(g, cx - Rm.hw + 0.05, 3.6, cz - 6 + i * 5, 1.6, 2.8, Math.PI / 2);
shkSpot(cx - 1.0, cz - 4.0, 1.4, "The test-tubes", "look at them", function () { szTale("🧪 The test-tubes", ["A rack of clean test-tubes, a basin of water beside them, and a litre glass."]); });
shkSpot(cx + 1.4, cz - 4.0, 1.4, "The bottle of white crystals", "look at it", function () { szTale("🧂 White crystals", ["A stoppered bottle of small white crystals: Holmes's own preparation."]); });
shkSpot(cx + 3.2, cz - 4.0, 1.4, "The transparent fluid", "look at it", function () { szTale("💧 A transparent fluid", ["A few drops of a clear reagent, in a little bottle with a glass rod."]); });
shkSpot(cx - 3.2, cz - 4.0, 1.4, "The basin of water", "look at it", function () { szTale("🥣 The basin", ["A basin of fresh water, and a litre measure."]); });
shkSpot(cx - 2.2, cz + 0.4, 1.4, "Holmes's bodkin", "look at it", function () { szTale("📍 A long bodkin", ["A long, sharp bodkin, for drawing a drop of blood from a finger."]); });
shkSpot(cx + 2.2, cz + 2.4, 1.4, "Holmes's notes", "read them", function () { szTale("📓 Holmes's notes", ["Pages of chemistry in a quick, small hand: 'The old guaiacum test was very clumsy and uncertain. So is the microscopic examination for blood corpuscles. It is valueless if the stains are a few hours old.'"]); });
szLinks("sz_lab", cx, cz, Rm, { sz_bhall: { x: -Rm.hw + 1.2, z: Rm.hd - 4 } });
Rm.hello = "<b>The chemical laboratory, Barts.</b> 'A lofty chamber, lined and littered with countless bottles'; the broad, low tables bristle with retorts, test-tubes and little Bunsen lamps with their blue flickering flames.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 7;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xC8C0B0), wall: dlnS("stone", 0xE0D8C8), h: h, ceil: dlnC(0xE8E4DA), outName: "Back to the laboratory", out: szRm("sz_lab") });
for (var s = 0; s < 14; s++)
dlnBox(g, 2.4, 0.2, 0.34, dlnS("stone", 0xC8C0B0), cx + Rm.hw - 1.4, 0.1 + s * 0.24, cz - Rm.hd + 5 - s * 0.3);
dlnBox(g, 0.08, 1.0, 4.6, dlnShine(0x2A1A10, 0.4, 0.3), cx + Rm.hw - 2.6, 2.4, cz - Rm.hd + 3);
dlnPortrait(g, cx - Rm.hw + 0.1, 3.2, cz - 1, Math.PI / 2, "Rahere", "founder, 1123", 0x3A2A1A);
dlnPortrait(g, cx - Rm.hw + 0.1, 3.2, cz + 2.2, Math.PI / 2, "William Harvey", "physician here, 1609", 0x2A2A3A);
var nb = dlnBox(g, 1.6, 1.2, 0.06, dlnS("oak", 0x6A4A2A), cx, 1.8, cz - Rm.hd + 0.1);
for (var p = 0; p < 6; p++)
dlnBox(g, 0.3, 0.4, 0.02, dlnC(0xF4F0E4), cx - 0.6 + (p % 3) * 0.5, 1.6 + ((p / 3) | 0) * 0.5, cz - Rm.hd + 0.15);
shkSpot(cx, cz - Rm.hd + 1.4, 1.6, "The noticeboard", "read it", function () { szTale("📌 The noticeboard", ["Lectures in anatomy, demonstrations in the dissecting-rooms, the chemical laboratory open to students of the hospital. A card: 'Rooms wanted to share: apply S. H., the laboratory.'"]); });
szHome("sz_dresser", "doctor", cx - 1.4, 0.02, cz + 1.4, 0.6, { name: "A dresser", persona: "You are a made-up dresser (a student assistant to the surgeons) at St Bartholomew's Hospital in 1881, in the world of Conan Doyle's A Study in Scarlet: busy, cheerful; you have seen Mr Sherlock Holmes beating the subjects in the dissecting-rooms with a stick, to see how far bruises may be produced after death. " + SZL_ERA, greet: "Looking for the chemistry fellow? Up the stair and along.", room: "sz_bhall" });
szHome("sz_nurse", "nurse", cx + 1.4, 0.02, cz + 2.4, -0.4, { room: "sz_bhall" });
Rm.hello = "<b>St Bartholomew's: the hall and stair.</b> Stone, portraits of the old physicians, students hurrying.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6;
dlnShell(g, cx, cz, Rm, { floor: szPaper("dustyboards"), wall: szPaper("flaring"), h: h, ceil: dlnC(0xB8B0A0), outName: "Out to the garden path", out: szOutL("no3") });
for (var d = 0; d < 14; d++) {
var dp = new THREE.Mesh(new THREE.CircleGeometry(0.2 + R() * 0.3, 8), dlnC(0x9A8A70));
dp.rotation.x = -Math.PI / 2;
dp.position.set(cx + (R() - 0.5) * 3, 0.01, cz + (R() - 0.5) * 10);
g.add(dp);
}
szLinks("sz_n3hall", cx, cz, Rm, { sz_n3dine: { x: -Rm.hw + 0.8, z: -2 }, sz_n3front: { x: Rm.hw - 0.8, z: 1 } });
shkSpot(cx, cz - 2, 1.4, "The dust of the hall", "look at it", function () { szTale("🦶 The dusty hall", ["'A short passage, bare-planked and dusty, led to the kitchen and offices.' The policemen's boots have trampled it all over."]); });
Rm.hello = "<b>No. 3, Lauriston Gardens: the hall.</b> Bare-planked and dusty; a door each side.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8;
dlnShell(g, cx, cz, Rm, { floor: szPaper("dustyboards"), wall: szPaper("flaring"), h: h, ceil: dlnC(0xA8A090), outName: "Back to the hall", out: szRm("sz_n3hall") });
for (var p = 0; p < 5; p++) {
var st = dlnBox(g, 0.6, 0.9 + R(), 0.03, dlnS("damask", 0xB8A888), cx - Rm.hw + 0.08, 2.2, cz - 4 + p * 2);
st.rotation.y = Math.PI / 2;
st.rotation.z = 0.1;
}
var mant = dlnBox(g, 2.0, 1.2, 0.4, dlnC(0xD8D0C4), cx, 0.6, cz - Rm.hd + 0.2);
dlnBox(g, 0.9, 0.8, 0.42, dlnC(0x2A2420), cx, 0.4, cz - Rm.hd + 0.22);
dlnBox(g, 2.2, 0.08, 0.5, dlnC(0xE8E0D4), cx, 1.24, cz - Rm.hd + 0.24);
dlnCyl(g, 0.03, 0.03, 0.12, dlnC(0xB83A2A), cx + 0.6, 1.34, cz - Rm.hd + 0.24, 6);
szWinR(g, cx + Rm.hw - 0.05, 1.9, cz, 1.3, 1.8, -Math.PI / 2, false);
var w = wTex(256, 96, function (x) { x.fillStyle = "rgba(0,0,0,0)"; x.clearRect(0, 0, 256, 96); x.fillStyle = "#8A1A14"; x.font = "bold 64px Georgia"; x.fillText("RACHE", 20, 72); });
var word = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.38), new THREE.MeshLambertMaterial({ map: w, transparent: true }));
word.position.set(cx - Rm.hw + 0.06, 1.6, cz + 1.2);
word.rotation.y = Math.PI / 2;
g.add(word);
szStill(g, cx + 0.4, cz + 0.8, 0.4, "drebber");
shkSpot(cx - Rm.hw + 0.9, cz + 1.2, 1.4, "The word on the wall", "read it", function () { szTale("🩸 RACHE", ["In the corner, where a strip of paper has peeled, a single word scrawled in blood-red letters: RACHE."]); });
shkSpot(cx, cz - Rm.hd + 1.0, 1.3, "The candle on the mantelpiece", "look at it", function () { szTale("🕯️ The candle", ["A stump of red wax candle on the imitation-marble mantelpiece: it has been lit, and burned a little."]); });
shkSpot(cx + 0.4, cz + 2.0, 1.6, "The man on the floor", "look", function () { szTale("🕴️ The man on the floor", ["A man about forty-three or forty-four, middle-sized, broad-shouldered, with crisp curling black hair and a short stubbly beard, in a heavy broadcloth frock coat, very well dressed; his top hat, well brushed and trim, on the floor beside him. There is no wound on him. On his face, a look of horror, as if he had seen something terrible."]); });
shkSpot(cx + Rm.hw - 1.2, cz - 2.2, 1.4, "The dust by the window", "look at it", function () { szTale("👣 Marks in the dust", ["The dust lies thick here, and in it, the marks of a long stride, and of square-toed boots."]); });
Rm.hello = "<b>The dining-room.</b> A large square room, bare of furniture; vulgar flaring paper, peeling and mildewed; one dirty window; the light dim and uncertain.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8;
dlnShell(g, cx, cz, Rm, { floor: szPaper("dustyboards"), wall: szPaper("flaring"), h: h, ceil: dlnC(0xB0A898), outName: "Back to the hall", out: szRm("sz_n3hall") });
szWinR(g, cx, 1.9, cz - Rm.hd + 0.05, 1.6, 1.9, 0, false);
var sh = dlnBox(g, 1.6, 0.5, 0.03, dlnC(0xF4F0E4), cx, 1.9, cz - Rm.hd + 0.12);
shkSpot(cx, cz - Rm.hd + 1.2, 1.4, "The window on the street", "look out", function () { szTale("🪟 The front window", ["Through the grimy glass: the clay path, the little garden, the gate, and the Brixton Road beyond, with a crowd of loafers craning their necks."]); });
Rm.hello = "<b>The front room.</b> Empty, the window grimy, a 'To Let' card in it.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.0;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5A44), wall: dlnS("stock", 0xC8BCA4), h: h, ceil: dlnC(0xD0C8B8), outName: "Out to Audley Court", out: szOutL("rance") });
jkBed(g, cx - Rm.hw + 1.2, cz - Rm.hd + 1.6, 0, 0x6A5A4A);
wcRange(g, cx + Rm.hw - 0.6, cz - 1, -Math.PI / 2);
n14Table(g, cx, cz - 1.4, 1.0, 0.8, 0.76, dlnS("oak", 0x8A6A44), null);
n14Chair(g, cx - 0.7, cz - 1.4, Math.PI / 2, dlnS("oak", 0x8A6A44), 0x3A3A3A);
dlnBox(g, 0.5, 0.16, 0.3, dlnC(0x1A1E2A), cx + 0.2, 0.84, cz - 1.4);
dlnBox(g, 0.6, 0.4, 0.03, dlnC(0x1A1E2A), cx - Rm.hw + 0.1, 1.8, cz + 1.4);
shkSpot(cx + 0.6, cz - 0.8, 1.4, "Rance's tunic and helmet", "look at them", function () { szTale("👮 Rance's tunic", ["His helmet, his tunic with its numbered collar, his lantern, and his truncheon, laid out ready for the night."]); });
Rm.hello = "<b>Constable Rance's room.</b> A bed, a range, a table; his tunic laid out for the night.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: szPaper("floral"), low: dlnS("oak", 0x4A3020), lowH: 1.0, h: h, ceil: dlnC(0xF0E8D4), outName: "Out to Torquay Terrace", out: szOutL("charp") });
dlnPlane(g, 5, 5, dlnS("n14turkey", 0xFFFFFF), cx, 0.012, cz);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
n14Sofa(g, cx - 2.6, cz + 0.4, Math.PI / 2, 0x5A2A3A);
n14Arm(g, cx + 2.2, cz - 1.4, -0.6, 0x3A4A2A);
n14Table(g, cx + 0.4, cz + 0.6, 1.0, 1.0, 0.74, mah, dlnC(0xF4F0E4));
n14Pic(g, cx - Rm.hw + 0.08, 2.1, cz - 1.4, Math.PI / 2, 0.8, 0.6, ["#A8B8C8", "#E8D8B8", "#6A7A4A"]);
dlnBox(g, 1.6, 1.8, 0.4, mah, cx + Rm.hw - 0.3, 0.9, cz + 2.0);
n14Gasolier(g, cx, h, cz);
szWinR(g, cx + Rm.hw - 0.05, 1.8, cz - 1.6, 1.2, 1.7, -Math.PI / 2, false);
shkSpot(cx + 0.4, cz + 1.4, 1.4, "The lodgers' book", "read it", function () { szTale("📒 The lodgers' book", ["'Mr Enoch J. Drebber, of Cleveland, Ohio, and his secretary, Mr Joseph Stangerson: three weeks, from 21st February. Left 4th March, for the 8.30 train, Euston (Liverpool).'"]); });
Rm.hello = "<b>Madame Charpentier's parlour.</b> A good fire, a Turkey carpet, a sofa; the house of a respectable widow.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.0, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("encaustic", 0xFFFFFF), wall: szPaper("hotel"), low: dlnS("oak", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0xF0E8D4), outName: "Out to Little George Street", out: szOutL("halliday") });
dlnBox(g, 3.2, 1.1, 0.8, mah, cx - 1.4, 0.55, cz - Rm.hd + 1.8);
dlnBox(g, 0.5, 0.04, 0.36, dlnC(0xF4F0E4), cx - 1.8, 1.12, cz - Rm.hd + 1.7);
for (var s = 0; s < 10; s++)
dlnBox(g, 1.6, 0.2, 0.32, mah, cx + Rm.hw - 1.0, 0.1 + s * 0.26, cz - Rm.hd + 4 - s * 0.3);
n14Gasolier(g, cx, h, cz);
szLinks("sz_hhall", cx, cz, Rm, { sz_hroom: { x: Rm.hw - 1.2, z: -Rm.hd + 3 } });
shkSpot(cx - 1.8, cz - Rm.hd + 2.6, 1.4, "The hotel book", "read it", function () { szTale("📖 Halliday's book", ["'Mr J. Stangerson, Cleveland, Ohio: second floor, the room over the lane.' Taken on the night of the 4th."]); });
Rm.hello = "<b>Halliday's Private Hotel.</b> A quiet hall, an encaustic floor, the stair going up to the second floor.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: szPaper("stripe"), h: h, ceil: dlnC(0xF0E8D4), outName: "Down to the hall", out: szRm("sz_hhall") });
jkBed(g, cx - Rm.hw + 1.2, cz - Rm.hd + 1.8, 0, 0xE8E2D4);
n14Table(g, cx + 1.0, cz - 0.4, 1.0, 0.7, 0.74, mah, null);
n14Chair(g, cx + 0.3, cz - 0.4, Math.PI / 2, mah, 0x3A3A3A);
dlnBox(g, 0.8, 0.5, 0.5, dlnShine(0x3A2414, 0.4, 0.2), cx + Rm.hw - 0.6, 0.25, cz + 1.6);
var win = szWinR(g, cx + Rm.hw - 0.05, 1.8, cz - 1.6, 1.2, 1.7, -Math.PI / 2, false);
var w = wTex(256, 96, function (x) { x.clearRect(0, 0, 256, 96); x.fillStyle = "#8A1A14"; x.font = "bold 60px Georgia"; x.fillText("RACHE", 20, 70); });
var word = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.34), new THREE.MeshLambertMaterial({ map: w, transparent: true }));
word.position.set(cx - 0.6, 1.7, cz - Rm.hd + 0.06);
g.add(word);
dlnBox(g, 0.16, 0.06, 0.1, dlnShine(0xE8E0C8, 0.2, 0.5), cx + 1.2, 0.8, cz - 0.5);
dlnBox(g, 0.2, 0.02, 0.14, dlnC(0xF4F0E4), cx + 0.8, 0.79, cz - 0.3);
shkSpot(cx - 0.6, cz - Rm.hd + 1.2, 1.4, "The word above the bed", "read it", function () { szTale("🩸 RACHE, again", ["On the wall above the bed, in letters of blood, the same word: RACHE."]); });
shkSpot(cx + 1.2, cz - 0.2, 1.3, "The little box on the table", "look at it", function () { szTale("💊 A little box", ["A little chip ointment box, and in it two little pills, of a pearly grey, small, round, almost transparent against the light."]); });
shkSpot(cx + 0.6, cz + 0.4, 1.3, "The telegram on the table", "read it", function () { szTale("📨 A telegram", ["Dated from Cleveland about a month ago: 'J. H. is in Europe.' No name to it."]); });
shkSpot(cx + Rm.hw - 1.0, cz - 1.6, 1.4, "The window over the lane", "look out", function () { szTale("🪟 The window", ["Open; below it, the lane, and in the lane a ladder lying, the kind they use for the hotel's windows."]); });
szStill(g, cx - 0.2, cz + 0.8, 1.2, "stangerson");
shkSpot(cx - 0.2, cz + 2.0, 1.6, "Mr Stangerson", "look", function () { szTale("🕴️ Mr Stangerson", ["Joseph Stangerson, Drebber's secretary, lies still on the floor, doubled up, his limbs stiff and cold. He has been dead some hours. The book tells us he was stabbed; we are spared the sight, and the sheet is drawn up."]); });
Rm.hello = "<b>Mr Stangerson's room.</b> Second floor, over the lane; a bed, a table, a box of pills, a telegram; the word on the wall.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A6A48), wall: dlnS("stone", 0xD8D0C0), h: h, ceil: dlnC(0xF0E8D4), outName: "Out to the cab", out: function () { szCabCard(); } });
wcBar(g, cx, cz - Rm.hd + 1.6, Rm.hw * 2 - 1.4, 0);
for (var k = 0; k < 3; k++) {
var ins = new THREE.Group();
ins.position.set(cx - 2 + k * 2, 1.08, cz - Rm.hd + 1.2);
g.add(ins);
dlnBox(ins, 0.4, 0.2, 0.3, dlnShine(0x2A1A10, 0.4, 0.3), 0, 0, 0);
dlnCyl(ins, 0.06, 0.06, 0.04, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.12, 0, 10);
}
shkSpot(cx, cz - Rm.hd + 2.6, 1.6, "The telegraph counter", "send a telegram", function () { szTale("📠 The telegraph", ["Sixpence for the first twelve words. The forms are on the counter, and a pencil on a string."]); });
szHome("sz_tclerk", "lady", cx + 1, 0.02, cz - Rm.hd + 0.6, 0, { sex: "f", name: "The telegraph clerk", persona: "You are a made-up telegraph clerk in 1881, in the world of Conan Doyle's A Study in Scarlet: neat and quick; you can send a wire to Cleveland, Ohio, by the Atlantic cable, and the answer may come in a few hours. " + SZL_ERA, greet: "A form, sir? Write plainly, please.", room: "sz_yard" });
Rm.hello = "<b>The telegraph office.</b> The counter, the forms, the click of the instruments.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.0;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5A44), wall: szPaper("samples"), h: h, ceil: dlnC(0xD0C8B8), outName: "Out to Houndsditch", out: szOutL("hdhouse") });
for (var r = 0; r < 6; r++) {
var rl = dlnCyl(g, 0.1, 0.1, 0.7, dlnC([0xC8A878, 0x8AA0B8, 0xD8C8A8, 0xA87858][r % 4]), cx - Rm.hw + 0.8 + r * 0.3, 0.36, cz - Rm.hd + 0.8, 10);
}
n14Table(g, cx + 0.6, cz - 1.6, 1.8, 0.9, 0.76, dlnS("oak", 0x9A8460), null);
shkSpot(cx - 1.2, cz - Rm.hd + 1.4, 1.4, "The rolls of paper", "look at them", function () { szTale("🧻 Wallpaper", ["Rolls of wallpaper: Mr Keswick is a respectable paperhanger. There is no Mrs Sawyer here, and never was."]); });
szHome("sz_keswick", "jkshop", cx + 1.8, 0.02, cz - 0.4, 0, { name: "Mr Keswick, the paperhanger", persona: "You are Keswick, a respectable paperhanger who lives at 13, Duncan Street, Houndsditch, in 1881, in the world of Conan Doyle's A Study in Scarlet: you have never heard of anyone called Sawyer or Dennis; you are puzzled and a little cross at being asked. " + SZL_ERA, greet: "Sawyer? Never heard of 'em.", room: "sz_hdroom" });
Rm.hello = "<b>13, Duncan Street.</b> A paperhanger's front room, rolls of paper and a long table.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 12;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: szPaper("jones"), low: dlnS("oak", 0x3A2414), lowH: 1.6, h: h, ceil: szPaper("jonesceil"), outName: "Out to the cab", out: function () { szCabCard(); } });
dlnBox(g, Rm.hw * 2 - 2, 1.0, 5, dlnS("oak", 0x5A3A22), cx, 0.5, cz - Rm.hd + 3);
for (var r = 0; r < (SHK.lite ? 4 : 8); r++)
for (var s = 0; s < 8; s++)
n14Chair(g, cx - 5.6 + s * 1.6, cz - 2 + r * 1.6, Math.PI, dlnShine(0x4A2414, 0.4, 0.2), 0x6A1A1A);
for (var p = 0; p < (SHK.lite ? 3 : 6); p++)
n14Gasolier(g, cx + (p % 2 ? 3 : -3), h, cz - 6 + p * 3);
szHome("sz_neruda", "lady", cx, 1.02, cz - Rm.hd + 3, 0, { sex: "f", name: "Madame Norman-Neruda", persona: "You are Wilma Norman-Neruda, the great violinist, playing at a Hallé concert at St James's Hall, London, in 1881, as Sherlock Holmes goes to hear you in A Study in Scarlet: gracious and serious about music; you play Chopin's little pieces, and Mendelssohn. " + SZL_ERA, greet: "You liked the Chopin?", room: "sz_concert" });
for (var a = 0; a < (SHK.lite ? 4 : 14); a++)
szHome("sz_aud" + a, ["gent", "lady", "jklady", "gent"][a % 4], cx - 5.6 + (a % 8) * 1.6, 0.02, cz - 2 + ((a / 8) | 0) * 3.2, Math.PI, { room: "sz_concert" });
shkSpot(cx, cz - Rm.hd + 6.2, 2.2, "The concert platform", "listen", function () { szTale("🎻 Norman-Neruda", ["'Her attack and her bowing are splendid. What's that little thing of Chopin's she plays so magnificently: Tra-la-la-lira-lira-lay.' Holmes, in the book."]); });
Rm.hello = "<b>St James's Hall.</b> A Hallé concert; Madame Norman-Neruda on the platform with her violin.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A6A54), wall: szPaper("whitewash"), low: dlnC(0x3A5A44), lowH: 1.3, h: h, ceil: dlnC(0xF0E8D4), outName: "Out to the cab", out: function () { szCabCard(); } });
jkDesk(g, cx, cz - Rm.hd + 1.6, 0, mah);
n14Chair(g, cx, cz - Rm.hd + 0.8, 0, mah, 0x3A3A3A);
wcBench(g, cx - Rm.hw + 0.6, cz + 0.6, 3.2, Math.PI / 2);
wcBench(g, cx + Rm.hw - 0.6, cz + 0.6, 3.2, -Math.PI / 2);
wcGasJet(g, cx - Rm.hw + 0.1, 2.4, cz - 1, Math.PI / 2);
shkSpot(cx + 0.8, cz - Rm.hd + 2.4, 1.4, "The charge book", "read it", function () { szTale("📕 The charge book", ["'Jefferson Hope: charged with the wilful murder of Enoch J. Drebber and Joseph Stangerson.' In the inspector's neat hand."]); });
szHome("sz_insp", "police", cx - 0.3, 0.02, cz - Rm.hd + 0.9, 0, { name: "The inspector on duty", persona: "You are a made-up police inspector on duty at the station in 1881, in the world of Conan Doyle's A Study in Scarlet: white-faced, unemotional, methodical; you write down the prisoner's statement word for word. " + SZL_ERA, greet: "You may sit there.", room: "sz_police" });
Rm.hello = "<b>The police station.</b> The inspector's desk, the charge book, the benches round the walls.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.8;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: dlnC(0xF0EADA), h: h, ceil: dlnC(0xF0EADA), outName: "Out to the plain", out: szOutM("train") });
for (var b = 0; b < 4; b++) {
var hoop = new THREE.Mesh(new THREE.TorusGeometry(Rm.hw, 0.04, 6, 16, Math.PI), dlnS("oak", 0x6A5038));
hoop.position.set(cx, 1.4, cz - Rm.hd + 1 + b * 2);
g.add(hoop);
}
jkCrate(g, cx - 1.2, cz - Rm.hd + 0.8, 0.7);
jkCrate(g, cx + 1.2, cz - Rm.hd + 0.8, 0.6);
dlnBox(g, 1.2, 0.4, 0.6, dlnShine(0x3A2414, 0.4, 0.2), cx, 0.2, cz - 1.8);
shkSpot(cx, cz - Rm.hd + 1.8, 1.4, "The open Bible on the box", "look", function () { szTale("📖 A book on a box", ["A heavy book open on a box: the leader reads in it as the wagons roll. Whatever anyone believes, the book says, these were people who had crossed a thousand miles of wilderness together."]); });
Rm.hello = "<b>The great wagon.</b> Hoops and canvas; boxes, a bed of quilts, a lantern swinging.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.2, pine = dlnS("oak", 0xA88A60);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xA88A60), wall: szPaper("pine"), h: h, ceil: dlnS("boards", 0x8A6A48), outName: "Out to the yard", out: szOutM("farm") });
var hearth = typeof hbStoneHearth === "function" ? hbStoneHearth(g, cx, cz - Rm.hd + 0.5, 0, 3) : null;
n14Table(g, cx + 1.4, cz, 2.0, 1.0, 0.76, pine, dlnC(0xE8E0D0));
for (var c = 0; c < 4; c++)
n14Chair(g, cx + 0.6 + c * 0.6, cz + (c % 2 ? 0.8 : -0.8), c % 2 ? Math.PI : 0, pine, 0x6A3A2A);
dlnBox(g, 1.8, 2.0, 0.5, pine, cx - Rm.hw + 0.4, 1.0, cz + 1.6);
for (var p = 0; p < 8; p++)
dlnBox(g, 0.2, 0.24, 0.2, dlnC([0xC8B8A0, 0x8A6A4A, 0xE8E0C8][p % 3]), cx - Rm.hw + 0.4, 1.3 + ((p / 4) | 0) * 0.6, cz + 0.9 + (p % 4) * 0.42);
dlnBox(g, 1.0, 1.2, 0.06, dlnS("boards", 0x6A5040), cx + Rm.hw - 0.05, 1.7, cz - 1.4).rotation.y = Math.PI / 2;
szWinR(g, cx - Rm.hw + 0.05, 1.8, cz - 1.6, 1.2, 1.6, Math.PI / 2, false);
dlnPlane(g, 2.4, 1.6, dlnS("n14turkey", 0xC8A888), cx - 0.8, 0.012, cz + 0.6);
for (var pt = 0; pt < 4; pt++)
dlnCyl(g, 0.14 + pt * 0.03, 0.12 + pt * 0.03, 0.2, dlnC(0x2A2A2A), cx - 0.9 + pt * 0.6, 2.1, cz - Rm.hd + 0.25, 10);
dlnCyl(g, 0.08, 0.11, 0.28, dlnC(0xC8A060), cx + 1.4, 0.92, cz, 8);
dlnCyl(g, 0.05, 0.05, 0.18, new THREE.MeshBasicMaterial({ color: 0xFFE0A0 }), cx + 1.4, 1.14, cz, 8);
dlnCyl(g, 0.2, 0.24, 0.8, dlnS("oak", 0x8A6A44), cx - Rm.hw + 0.5, 0.4, cz - 1.0, 10);
dlnCyl(g, 0.18, 0.15, 0.3, dlnC(0x7A7A78), cx - Rm.hw + 0.5, 0.15, cz - 0.4, 10);
var rifle = dlnCyl(g, 0.025, 0.03, 1.3, dlnC(0x2A2420), cx, 2.5, cz + Rm.hd - 0.1, 6);
rifle.rotation.z = Math.PI / 2;
var wh = dlnCyl(g, 0.45, 0.45, 0.05, dlnS("oak", 0x9A7A50), cx + Rm.hw - 0.8, 0.9, cz + 1.2, 16);
wh.rotation.x = Math.PI / 2;
dlnBox(g, 0.9, 0.06, 0.2, dlnS("oak", 0x9A7A50), cx + Rm.hw - 0.8, 0.45, cz + 1.2);
szLinks("sz_ffarm", cx, cz, Rm, { sz_fbed: { x: Rm.hw - 1.2, z: 2.6 } });
shkSpot(cx + 1.4, cz + 1.0, 1.4, "The kitchen table", "look", function () { szTale("🍞 The kitchen table", ["A scrubbed pine table, bread and a jug of milk, Lucy's sewing left at the end of it."]); });
shkSpot(cx, cz - Rm.hd + 1.8, 1.4, "The ceiling above the hearth", "look up", function () { szTale("🔢 The ceiling", ["Smoke-browned boards. Something has been printed there in charcoal?"]); });
Rm.hello = "<b>John Ferrier's farmhouse.</b> A stone hearth, a scrubbed table, a dresser of plates; homely and plain.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.0, pine = dlnS("oak", 0xA88A60);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xA88A60), wall: szPaper("pine"), h: h, ceil: dlnS("boards", 0x8A6A48), outName: "Back to the kitchen", out: szRm("sz_ffarm") });
jkBed(g, cx - Rm.hw + 1.2, cz - Rm.hd + 1.6, 0, 0xC8506A);
dlnBox(g, 0.8, 0.9, 0.5, pine, cx + Rm.hw - 0.5, 0.45, cz - Rm.hd + 0.6);
szWinR(g, cx + Rm.hw - 0.05, 1.6, cz, 1.0, 1.3, -Math.PI / 2, false);
shkSpot(cx - Rm.hw + 1.4, cz, 1.4, "The bed", "look", function () { szTale("🛏️ The bed", ["A patchwork quilt in red and white, Lucy's work."]); });
Rm.hello = "<b>The bedroom.</b> A patchwork quilt, a chest, a small window on the fields.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, pine = dlnS("oak", 0xA88A60);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x9A7A54), wall: szPaper("pine"), h: h, ceil: dlnS("boards", 0x8A6A48), outName: "Out to the main street", out: szOutM("store") });
wcBar(g, cx, cz - Rm.hd + 2.2, Rm.hw * 2 - 2, 0);
for (var s = 0; s < 3; s++)
dlnBox(g, Rm.hw * 2 - 0.6, 0.05, 0.4, pine, cx, 1.0 + s * 0.7, cz - Rm.hd + 0.25);
for (var b = 0; b < (SHK.lite ? 10 : 30); b++)
dlnBox(g, 0.3, 0.3, 0.25, dlnC([0xE8E0C8, 0x8A6A4A, 0x5A7A9A, 0xC8A060, 0x6A3A2A][b % 5]), cx - Rm.hw + 0.6 + (b % 10) * (Rm.hw * 2 - 1.2) / 10, 1.18 + ((b / 10) | 0) * 0.7, cz - Rm.hd + 0.25);
for (var k = 0; k < 4; k++) {
jkCrate(g, cx - Rm.hw + 0.8, cz + 1 + k * 0.9, 0.6);
}
dlnCyl(g, 0.35, 0.4, 0.9, dlnS("oak", 0x6A5038), cx + Rm.hw - 0.8, 0.45, cz + 2, 10);
shkSpot(cx, cz - Rm.hd + 3.2, 1.6, "The store counter", "look", function () { szTale("🏪 The store", ["Flour by the barrel, cloth by the yard, nails, powder and shot, coffee and sugar come a thousand miles by wagon."]); });
Rm.hello = "<b>The store.</b> Barrels, bolts of cloth, boxes of everything, the counter and its scales.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("gravel", 0x6A5A44), wall: szPaper("logs"), h: h, ceil: dlnC(0x2E3A24), outName: "Out to the ledge", out: szOutM("camp") });
dlnBox(g, 1.6, 0.2, 2.0, dlnC(0x3A4A2A), cx - Rm.hw + 0.9, 0.1, cz - 0.6);
dlnBox(g, 0.6, 0.3, 0.4, dlnC(0x6A4A2A), cx + 1.0, 0.15, cz - 1.6);
for (var bp = 0; bp < 6; bp++) {
var pole = dlnCyl(g, 0.06, 0.06, Rm.hw * 2, dlnS("oak", 0x5A4028), cx, h - 0.12, cz - Rm.hd + 0.6 + bp * (Rm.hd * 2 - 1.2) / 5, 6);
pole.rotation.z = Math.PI / 2;
}
for (var bb = 0; bb < 14; bb++) {
var bough = dlnBox(g, 0.9 + R() * 0.5, 0.05, 0.35, dlnC([0x2A4A2A, 0x3A5A30, 0x24402A][bb % 3]), cx - Rm.hw + 0.6 + R() * (Rm.hw * 2 - 1.2), h - 0.2 - R() * 0.08, cz - Rm.hd + 0.5 + R() * (Rm.hd * 2 - 1));
bough.rotation.y = R() * 3;
}
dlnBox(g, 1.4, 0.06, 1.0, dlnC(0x4A3424), cx - Rm.hw + 0.9, 0.23, cz - 0.9);
dlnBox(g, 1.2, 0.16, 0.3, dlnC(0x7A5A3A), cx - Rm.hw + 0.9, 0.3, cz + 0.3);
for (var fs = 0; fs < 9; fs++) {
var a = fs / 9 * 6.28;
dlnBox(g, 0.2, 0.14, 0.16, dlnC(0x6A6058), cx + 0.4 + Math.cos(a) * 0.45, 0.07, cz + Rm.hd - 1.5 + Math.sin(a) * 0.45).rotation.y = a;
}
var ember = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.35, 7), new THREE.MeshBasicMaterial({ color: 0xFF8A2A }));
ember.position.set(cx + 0.4, 0.18, cz + Rm.hd - 1.5);
g.add(ember);
for (var st2 = 0; st2 < 4; st2++) {
var stick = dlnCyl(g, 0.03, 0.03, 0.6, dlnC(0x3A2A1A), cx + 0.4, 0.1, cz + Rm.hd - 1.5, 5);
stick.rotation.z = 1.3;
stick.rotation.y = st2 * 0.8;
}
var gun = dlnCyl(g, 0.025, 0.03, 1.3, dlnC(0x2A2420), cx + Rm.hw - 0.2, 0.66, cz - 0.4, 6);
gun.rotation.z = 0.18;
dlnBox(g, 0.08, 0.4, 0.05, dlnS("oak", 0x6A4A2A), cx + Rm.hw - 0.12, 0.2, cz - 0.4);
dlnCyl(g, 0.16, 0.2, 0.4, dlnC(0x8A6A44), cx + 1.4, 0.2, cz - 2.2, 8);
dlnCyl(g, 0.09, 0.09, 0.24, dlnC(0x3A3A3A), cx - 0.4, h - 0.5, cz - 0.4, 8);
shkSpot(cx + 1.0, cz - 1.0, 1.3, "Their bundle", "look", function () { szTale("🎒 The bundle", ["A little food, a blanket each, John Ferrier's papers, Lucy's few things."]); });
Rm.hello = "<b>The shelter.</b> Boughs and rock; a bed of pine-needles; their bundle.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : szbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? szbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = szbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
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
var W = szbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = SZB_CH[szbS().ch], ix = szbS().s, d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who && !(d.from != null && ix < d.from) && !(d.until != null && ix >= d.until); })[0] : null;
if (d0 && d0.at !== at)
return szbPos(d0.at);
}
if (at.spot) {
var Sp = szbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = SZB.cast[at.cast], q = c && c.g && c.g.parent ? szbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: szbAreaAt(q.x, q.z) };
}
if (at.room)
return szbRoomPt(at.room, at.lx, at.lz);
if (at.mo && SZU_PLACES[at.mo]) {
var M = SZU_PLACES[at.mo], mx = M.x + (at.dx || 0), mz = M.z + (at.dz || 0);
return { x: suX(mx), z: suZ(mz), y: suH(mx, mz), area: "sz:ut", name: M.name };
}
if (at.at && SZL_PLACES[at.at]) {
var A = SZL_PLACES[at.at], ax = szX(A.x + (at.dx || 0)), az = szZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: 0, area: "sz:" + szPiece(A.z + (at.dz || 0)), name: A.name };
}
if (at.x != null && at.m) {
return { x: suX(at.x), z: suZ(at.z), y: at.y != null ? at.y : suH(at.x, at.z), area: "sz:ut", name: at.name };
}
if (at.x != null) {
var x = szX(at.x), z = szZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : 0, area: szbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
var inA = area.indexOf("in:") === 0, inP = P.area.indexOf("in:") === 0, la = szbLand(area), lp = szbLand(P.area);
if (inA) {
var here = area.slice(3);
if (inP) {
var path = szbRoomPath(here, P.area.slice(3));
if (path && path.length > 1) {
var sp = szbLinkSpot(here, path[1]);
if (sp)
return { show: sp, way: " (through the door)" };
}
}
if (lp !== szbLand(area) && (lp === "moor" || szbLand(area) === "moor"))
return { show: null, way: " (press E: the book, ▶ Carry on, takes you there)" };
if (SZL_CABROOM[here] || here === "ws_baker")
return { show: szbRoomExit(), way: " (out to a cab)" };
return { show: szbRoomExit(), way: " (go out)" };
}
if ((la === "moor") !== (lp === "moor"))
return { show: null, way: " (press E: the book, ▶ Carry on, takes you there)" };
if (la === "moor") {
if (inP) {
var dr = szbDoorRoom(P.area.slice(3)), D = dr && szbRoomDoor(dr);
if (D)
return { show: D, way: " (go in)" };
}
return { show: P, way: "" };
}
if (inP) {
var k = P.area.slice(3);
if (SZL_CABROOM[k]) {
if (la === "ldn")
return { show: szbCabPt(area), way: " (take a cab: to " + SZL_CABROOM[k] + ")" };
return { show: null, way: " (any London cab rank: to " + SZL_CABROOM[k] + ")" };
}
var D2 = szbRoomDoor(szbDoorRoom(k) || k);
if (D2 && D2.area === area)
return { show: D2, way: " (go in)" };
var pa = D2 ? D2.area : null;
if (la === "ldn")
return { show: szbCabPt(area), way: " (take a cab" + (pa && SZL_PIECE[pa.slice(3)] ? ": to " + SZL_PIECE[pa.slice(3)] : "") + ")" };
return { show: null, way: " (any London cab rank: A Study in Scarlet's London; or the 🎭 menu)" };
}
if (la === "ldn")
return { show: szbCabPt(area), way: " (take a cab: to " + (SZL_PIECE[P.area.slice(3)] || "there") + ")" };
return { show: null, way: " (any London cab rank: A Study in Scarlet's London; or the 🎭 menu)" };
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
if (SZB.beam && SZB.beam.parent)
return SZB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
SZB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "orchid":
m = wCyl(0.008, 0.008, 0.3, wM(0x4A6A2A), 0, 0.15, 0, g, 5);
[[0, 0.3, 0], [0.04, 0.27, 0.02], [-0.04, 0.26, 0.01]].forEach(function (p) { var f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), wM(0xB86AA8)); f.scale.set(1.2, 0.7, 1); f.position.set(p[0], p[1], p[2]); g.add(f); });
break;
case "stub":
m = wCyl(0.008, 0.008, 0.05, wM(0xF0ECE0), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
wCyl(0.0085, 0.0085, 0.012, wM(0x8A5A2A), 0.028, 0.01, 0, g, 6).rotation.z = Math.PI / 2;
break;
case "stick":
m = wBox(0.03, 0.03, 1.0, wM(0x5A3A1E), 0, 0.03, 0, g);
wBox(0.05, 0.05, 0.06, wM(0xC0C0C8, { m: 0.9, r: 0.25 }), 0, 0.03, 0.42, g);
wSph(0.045, wM(0x5A3A1E), 0, 0.04, -0.5, g, 8);
break;
case "boot":
m = wBox(0.1, 0.12, 0.28, wM(0x6A3A1A, { r: 0.5 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x6A3A1A, { r: 0.5 }), 0, 0.18, -0.09, g);
break;
case "oldboot":
m = wBox(0.1, 0.12, 0.28, wM(0x141414, { r: 0.6 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x141414, { r: 0.6 }), 0, 0.18, -0.09, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.2, wM(0xF4EEDC), 0, 0.01, 0, g);
for (var q = 0; q < 5; q++)
wBox(0.1 - q * 0.01, 0.006, 0.012, wM(0x2A2A2A), 0, 0.012, -0.06 + q * 0.03, g);
break;
case "scrap":
m = wBox(0.12, 0.004, 0.08, wM(0x4A3A2A), 0, 0.01, 0, g);
wBox(0.06, 0.006, 0.014, wM(0xE8E0C8), 0, 0.012, 0, g);
break;
case "telegram":
m = wBox(0.16, 0.004, 0.1, wM(0xE8DCC0), 0, 0.01, 0, g);
wBox(0.12, 0.006, 0.02, wM(0x3A5A8A), 0, 0.012, -0.03, g);
break;
case "manuscript":
m = wBox(0.22, 0.03, 0.28, wM(0xE0CCA0), 0, 0.015, 0, g);
wBox(0.2, 0.034, 0.04, wM(0x6A2A1A), 0, 0.017, -0.08, g);
break;
case "photo":
m = wBox(0.1, 0.006, 0.14, wM(0x8A7A60), 0, 0.01, 0, g);
break;
case "ash":
m = wBox(0.04, 0.01, 0.04, wM(0x8A8A86), 0, 0.005, 0, g);
wCyl(0.012, 0.012, 0.08, wM(0x6A4A2A), 0.04, 0.01, 0, g, 6);
break;
case "tin":
m = wCyl(0.05, 0.05, 0.07, wM(0xB8B8C0, { m: 0.8, r: 0.3 }), 0, 0.035, 0, g, 12);
break;
case "net":
m = wBox(0.02, 0.02, 1.2, wM(0x6A5A3A), 0, 0.02, 0, g);
wSph(0.18, wM(0x3A6A3A, { r: 0.9 }), 0, 0.05, 0.6, g, 8);
break;
case "violin":
m = wSph(0.12, wM(0x8A4A1A, { r: 0.3 }), 0, 0.05, 0, g, 10);
m.scale.set(1, 0.3, 1.7);
wBox(0.035, 0.02, 0.32, wM(0x1A1010), 0, 0.06, 0.36, g);
break;
case "times":
m = wBox(0.3, 0.01, 0.4, wM(0xE8E2D2), 0, 0.005, 0, g);
for (var q2 = 0; q2 < 6; q2++)
wBox(0.24, 0.012, 0.01, wM(0x3A3A3A), 0, 0.007, -0.15 + q2 * 0.06, g);
break;
case "print":
m = wBox(0.18, 0.01, 0.3, wM(0x3A2A1A), 0, 0.005, 0, g);
break;
case "cane":
m = wBox(0.03, 0.03, 0.9, wM(0x3A2414), 0, 0.03, 0, g);
wSph(0.04, wM(0xC8A048, { m: 0.8, r: 0.3 }), 0, 0.04, 0.45, g, 8);
break;
case "halfcane":
m = wBox(0.03, 0.03, 0.45, wM(0x3A2414), 0, 0.03, 0, g);
break;
case "key":
m = wBox(0.02, 0.006, 0.1, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g);
wCyl(0.025, 0.025, 0.006, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, -0.06, g, 10);
break;
case "chequebook":
m = wBox(0.16, 0.02, 0.08, wM(0x3A6A3A), 0, 0.01, 0, g);
break;
case "purse":
m = wSph(0.05, wM(0x2A1A10), 0, 0.04, 0, g, 8);
m.scale.set(1.3, 0.7, 1);
break;
case "watch":
m = wCyl(0.03, 0.03, 0.01, wM(0xC8A048, { m: 0.9, r: 0.25 }), 0, 0.01, 0, g, 14);
break;
case "envelope":
m = wBox(0.18, 0.004, 0.11, wM(0xF2EADA), 0, 0.01, 0, g);
wBox(0.03, 0.006, 0.03, wM(0x8A1A1A), 0, 0.012, 0, g);
break;
case "phial":
m = wCyl(0.025, 0.03, 0.11, wM(0xC8D8E8, { e: 0x8A2A3A, ei: 0.3 }), 0, 0.055, 0, g, 8);
break;
case "powder":
m = wBox(0.07, 0.01, 0.05, wM(0xF4F0E8), 0, 0.005, 0, g);
break;
case "drawer":
m = wBox(0.45, 0.18, 0.35, wM(0x4A2414), 0, 0.09, 0, g);
wBox(0.4, 0.02, 0.3, wM(0xF4F0E8), 0, 0.16, 0, g);
break;
case "axe":
m = wBox(0.04, 0.04, 0.8, wM(0x8A6A44), 0, 0.03, 0, g);
wBox(0.14, 0.03, 0.16, wM(0x6A6A70, { m: 0.8, r: 0.35 }), 0, 0.03, 0.4, g);
break;
case "poker":
m = wBox(0.02, 0.02, 0.7, wM(0x2A2A2E, { m: 0.8, r: 0.4 }), 0, 0.02, 0, g);
break;
case "candle":
m = wCyl(0.02, 0.02, 0.16, wM(0xF4F0E4), 0, 0.08, 0, g, 8);
wSph(0.02, wM(0xFFD890, { e: 0xFFA040, ei: 0.8 }), 0, 0.18, 0, g, 6);
break;
case "salt":
m = wCyl(0.035, 0.035, 0.08, wM(0xF4F0F8, { e: 0x6A4A8A, ei: 0.2 }), 0, 0.04, 0, g, 10);
break;
case "book":
m = wBox(0.16, 0.04, 0.22, wM(0x5A1A1A), 0, 0.02, 0, g);
break;
case "ring":
m = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 16), wM(0xE8C048, { m: 0.95, r: 0.2 }));
m.rotation.x = Math.PI / 2;
m.position.y = 0.006;
g.add(m);
break;
case "pillbox":
m = wCyl(0.03, 0.03, 0.018, wM(0xE8DCC0), 0, 0.01, 0, g, 12);
wSph(0.008, wM(0xC8C8C0), 0.01, 0.022, 0, g, 6);
wSph(0.008, wM(0xC8C8C0), -0.01, 0.022, 0, g, 6);
break;
case "tape":
m = wCyl(0.04, 0.04, 0.02, wM(0x6A4A2A), 0, 0.01, 0, g, 12);
wBox(0.2, 0.004, 0.012, wM(0xE8D8A0), 0.12, 0.004, 0, g);
break;
case "lens":
m = wCyl(0.035, 0.035, 0.006, wM(0xC8E0F0, { m: 0.2, r: 0.05 }), 0, 0.01, 0, g, 14);
wBox(0.012, 0.012, 0.09, wM(0x2A1A10), 0, 0.01, 0.07, g);
break;
case "card":
m = wBox(0.09, 0.004, 0.055, wM(0xF4F2EA), 0, 0.005, 0, g);
wBox(0.06, 0.006, 0.008, wM(0x2A2A2A), 0, 0.006, 0, g);
break;
case "paper":
m = wBox(0.3, 0.01, 0.4, wM(0xE8E2D2), 0, 0.005, 0, g);
for (var q3 = 0; q3 < 6; q3++)
wBox(0.24, 0.012, 0.01, wM(0x3A3A3A), 0, 0.007, -0.15 + q3 * 0.06, g);
break;
case "cigar":
m = wCyl(0.008, 0.009, 0.12, wM(0x5A3A1E), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "blood":
m = wCyl(0.012, 0.012, 0.04, wM(0xC8D8E8, { e: 0x6A1A1A, ei: 0.3 }), 0, 0.02, 0, g, 8);
break;
case "crystals":
m = wCyl(0.025, 0.025, 0.06, wM(0xD8E8F0), 0, 0.03, 0, g, 8);
wCyl(0.012, 0.014, 0.016, wM(0x3A2A1A), 0, 0.066, 0, g, 6);
break;
case "water":
m = wSph(0.05, wM(0x8AB8D8, { e: 0x1A3A5A, ei: 0.2 }), 0, 0.04, 0, g, 10);
m.scale.set(1, 0.6, 1);
break;
case "chalk":
m = wBox(0.02, 0.02, 0.06, wM(0xF4F4F0), 0, 0.01, 0, g);
break;
case "bighorn":
m = wSph(0.4, wM(0x8A6A4A), 0, 0.4, 0, g, 10);
m.scale.set(1.4, 0.8, 0.8);
wSph(0.18, wM(0x8A6A4A), 0.6, 0.55, 0, g, 8);
var hn1 = wCyl(0.05, 0.08, 0.4, wM(0xC8B898), 0.62, 0.75, 0.1, g, 6);
hn1.rotation.x = 1.2;
break;
case "meat":
m = wSph(0.12, wM(0x8A3A2A), 0, 0.08, 0, g, 8);
m.scale.set(1.4, 0.6, 1);
break;
case "nugget":
m = wSph(0.03, wM(0xD8D8E0, { m: 0.9, r: 0.3 }), 0, 0.03, 0, g, 6);
break;
case "print":
m = wBox(0.13, 0.004, 0.2, wM(0x2A2016), 0, 0.004, 0.04, g);
wBox(0.1, 0.005, 0.09, wM(0x2A2016), 0, 0.004, -0.15, g);
break;
case "patent":
m = wSph(0.06, wM(0x3A2E20), 0, 0.003, 0.06, g, 8);
m.scale.set(0.9, 0.05, 1.7);
wSph(0.045, wM(0x3A2E20), 0, 0.003, -0.12, g, 8).scale.set(1, 0.05, 1.1);
break;
case "rut":
m = wBox(0.09, 0.006, 2.4, wM(0x2A2218), -0.75, 0.004, 0, g);
wBox(0.09, 0.006, 2.4, wM(0x2A2218), 0.75, 0.004, 0, g);
break;
case "hoof":
m = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 5, 10, Math.PI * 1.4), wM(0x6A6A70, { m: 0.7, r: 0.4 }));
m.rotation.x = Math.PI / 2;
m.position.y = 0.008;
g.add(m);
break;
case "coin":
m = wCyl(0.012, 0.012, 0.003, wM(0xE8C048, { m: 0.95, r: 0.2 }), 0, 0.004, 0, g, 14);
break;
case "whip":
m = wBox(0.015, 0.015, 1.1, wM(0x2A1A10), 0, 0.01, 0, g);
wBox(0.006, 0.006, 0.6, wM(0x1A1A1A), 0.05, 0.008, 0.8, g);
break;
case "pipette":
m = wCyl(0.006, 0.006, 0.2, wM(0xD8E8F0), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "word":
m = wBox(0.3, 0.004, 0.2, wM(0xE8E2D2), 0, 0.004, 0, g);
wBox(0.2, 0.006, 0.03, wM(0x7A1010), 0, 0.006, 0, g);
break;
case "pills":
m = wCyl(0.03, 0.03, 0.018, wM(0xE8DCC0), 0, 0.01, 0, g, 12);
wSph(0.008, wM(0xD8D0C0), 0.01, 0.022, 0, g, 6);
break;
case "wire":
m = wBox(0.16, 0.004, 0.1, wM(0xE8DCC0), 0, 0.01, 0, g);
wBox(0.12, 0.006, 0.02, wM(0x3A5A8A), 0, 0.012, -0.03, g);
break;
case "water2":
m = wCyl(0.05, 0.06, 0.14, wM(0x8A6A4A), 0, 0.07, 0, g, 10);
break;
case "flower":
m = wCyl(0.006, 0.006, 0.25, wM(0x4A6A2A), 0, 0.12, 0, g, 5);
wSph(0.04, wM(0xE8A8C8), 0, 0.26, 0, g, 8);
break;
default: return typeof jkbItemMesh === "function" ? jkbItemMesh(kind) : g;
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = szbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (SZB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
SZB.items = SZB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[szb] take", e);
}
}, (P.y || 0));
I.S.szb = 1;
SZB.items.push(I);
return I;
},
function (k) {
if (SZB.tuneKey === k)
return;
SZB.tuneKey = k;
var old = SZB.tune;
SZB.tune = null;
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
if (!k || !SZB_TUNES[k])
return;
try {
var A = new Audio(SZB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
SZB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (SZB.tune !== A) {
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
if (SZB.text)
return fn(SZB.text);
if (SZB.textWait) {
SZB.textWait.push(fn);
return;
}
SZB.textWait = [fn];
var done = function (B) { SZB.text = B; var w = SZB.textWait; SZB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/scarlet/scarlet.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
szbText(function (B) {
var C = SZB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(szbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); SZB.readOpen = 0; SZB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = szbS(), C = SZB_CH[S.ch];
if (!C)
return;
SZB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
SZB.readAsk = 0;
SZB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(C.src || "Arthur Conan Doyle, A Study in Scarlet (1887)") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + (C.more ? C.more.map(function (p) { return "<p style='margin:6px 0;opacity:.88'>" + esc(p) + "</p>"; }).join("") : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? szbOpening(T).map(szbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); SZB.readOpen = 0; szbStepDone(); }, all: function () { szbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += szbKeeperBtns(fns);
worldCard(b, fns);
};
szbText(show);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
SZB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); szbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = szbS(), C = SZB_CH[S.ch];
if (!C)
return;
if (C.ut)
szuBuild();
else
szlBuild();
szbItemsClear();
szbCastClear();
SZB.hold = 0;
if (place && C.start)
szbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[szb] setup", S.ch, e);
}
szbTune(C.tune || null);
szbStepBegin();
},
function () {
var b = szbStep();
szbItemsClear();
SZB.hold = 0;
SZB.puzOpen = 0;
if (!b)
return;
if (szbAgeSkip(b)) {
szbStepDone();
return;
}
b._key = szbKey();
try {
if (b.on)
b.on(szbS().f);
}
catch (e) {
if (window.console)
console.warn("[szb] on", e);
}
if (b.k === "read") {
szbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { SZB.rew[k] = 0; });
if (b.k === "find")
szbItemAdd(b.item, szbPos(b.at), b.name, b.verb, function () { if (szbKey() === b._key)
szbStepDone(); });
if (b.k === "gather") {
var P = szbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(szbS().ch * 97 + szbS().s * 13 + 7);
SZB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
szbItemAdd(b.item, Q, b.name, b.verb, function () { if (szbKey() !== b._key)
return; SZB.got++; try {
if (b.each)
b.each(SZB.got);
}
catch (e) { } if (SZB.got < n) {
szbSay((b.eachSay || "Got one.") + " " + SZB.got + " of " + n + ".");
return;
} szbStepDone(); });
}
}
if (b.h)
szbSay("<b>" + esc(SZB_CH[szbS().ch].t) + ".</b> " + b.h);
},
function (b) {
SZB.puzOpen = 1;
SZB.puzT = performance.now();
var k = szbKey(), fns = {}, h = SZB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
szbSay(b.yes);
if (szbKey() === k)
szbStepDone();
return;
}
szbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (szbKey() === k)
SZB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = szbS(), C = SZB_CH[S.ch], b = szbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[szb] done", e);
}
if (b.say)
szbSay(b.say);
S.s++;
if (window.SZB_LOG)
SZB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= SZB_CH.length - 1) {
S.done = 1;
S.s = 0;
szbSave();
szbItemsClear();
szbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
szbSave();
var nx = SZB_CH[S.ch];
setTimeout(function () { try {
szbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[szb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
szbSave();
szbStepBegin();
},
function () {
szbTune("violin");
var S = szbS();
var b = "<h3 style='margin:4px 0'>A Study in Scarlet</h3><p>'What you do in this world is a matter of no consequence. The question is, what can you make people believe that you have done. Never mind... I have all the facts in my journal, and the public shall know them.'</p><p>Watson's journal becomes this book. And you have walked every step of it, from the Criterion Bar to the Great Alkali Plain and back.</p><p style='opacity:.85'>Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; szbSave(); szbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "The Criterion Bar, 1881");
worldCard(b, fns);
},
function () {
var S = szbS(), C = SZB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle, 1887 · the whole book, all fourteen chapters</div><h3 style='margin:4px 0'>🔎 A Study in Scarlet</h3>";
if (S.done)
b += "<p>You have played the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((szbStep() || {}).h || "") + "</p>";
else
b += "<p>London, March 1881. You are a young dresser at Barts, and you once worked under Dr Watson there. He is home from Afghanistan, wounded and thin, with nowhere to live; today, at the Criterion Bar, young Stamford is going to tell him about a strange fellow in the chemical laboratory who wants someone to share rooms. His name is Sherlock Holmes.</p><p style='font-size:12px;opacity:.75'>Conan Doyle's book, the first Holmes story, all of it, chapter by chapter: London, then the American West of Part II. You play every step; the book's own words are there to read whenever you like.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Mr Sherlock Holmes", S.started ? "Back to where you were" : "Piccadilly, the Criterion, 1881");
fns.go = function () { worldCard(null); szbBegin(); };
}
else {
b += worldBtn("again", "Play it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; szbSave(); szbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += szbKeeperBtns(fns);
worldCard(b, fns);
},
function () {
var S = szbS();
S.started = 1;
szbSave();
if (WLD.on !== SHK_KEY) {
SZB.pending = 1;
if (typeof shkGo === "function")
shkGo({ szb: 1 });
else
worldGo(SHK_KEY, { szb: 1 });
return;
}
var b = S.s > 0 ? szbStep() : null, P = b && b.at && b.k !== "read" ? szbPos(b.at) : null, L = worldLocal(), here = szbAreaAt(L.x, L.z);
if (P && szbLand(P.area) !== szbLand(here)) {
var C = SZB_CH[S.ch];
if (C.ut)
szuBuild();
else
szlBuild();
szbItemsClear();
szbCastClear();
szbTune(C.tune || null);
if (P.area.indexOf("in:") === 0)
shkGoIn(P.area.slice(3));
else
shkMove(P.x, P.z, null, null, null, P.y);
setTimeout(function () { try {
szbStepBegin();
}
catch (e) { } }, 400);
return;
}
szbChapterBegin(true);
},
function (c) {
var C = SZB.cast[c.key];
if (szbCastLive(C))
return C;
var P = szbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? (P.area === "sz:ut" ? SZU.live : SZL.live) : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = szPerson("szb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
if (c.up != null && P.area === "sz:ut" && !inside) {
var UL = suLocal(px, pz);
py = suH(UL.x, UL.z) + c.up;
}
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "szb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (P.area === "sz:ut" && !inside && c.up == null)
szMoorGround(Q);
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || SZL_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
szbWrapT(T);
}
SZB.cast[c.key] = { g: g, P: Q, c: c };
return SZB.cast[c.key];
},
function () {
var C = SZB_CH[szbS().ch];
if (!C || !C.cast)
return;
var b = szbStep() || {}, idx = szbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
var Lv = SZB.cast[c.key];
if (Lv && Lv.c === c)
szbCastDrop(c.key);
return;
}
if (SZB.gone && SZB.gone[c.key] != null && (c.from || 0) <= SZB.gone[c.key])
return;
if (szbCastLive(SZB.cast[c.key]))
return;
var P = szbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (szbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
szbPerson(c);
});
},
function (T) {
if (!szbActive() || !szZoneNow())
return false;
var b = szbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = szbKey();
worldPrompt(null);
var next = function () { if (szbKey() === k)
szbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(SZB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
SZB.wt += dt;
if (SZB.wt > 0.5) {
SZB.wt = 0;
szbWrap();
if (szbActive())
szbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!szbActive()) {
if (SZB.beam)
SZB.beam.visible = false;
if (!busy)
worldPrompt("🔎 <b>A Study in Scarlet</b> · <b>press E</b> for Conan Doyle's book", szbOpen);
return;
}
var S = szbS(), b = szbStep(), L = worldLocal(), t = SHK.t || 0, area = szbAreaAt(L.x, L.z);
SZB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? szbPos(b.at) : null, W = P ? szbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = szbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = szbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = szbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? szbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (SZB.readAsk)
break;
if (!SZB.readOpen)
szbChapterCard();
else {
SZB.readOpen = 0;
szbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
szbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
SZB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(SZB.hold, dt);
}
catch (e) { }
if (SZB.hold >= (b.sec || 8)) {
szbStepDone();
return;
}
}
else
SZB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return SZB.rew[k]; })) {
szbStepDone();
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
szbStepDone();
return;
}
break;
}
case "puzzle":
if ((!SZB.puzOpen || performance.now() - (SZB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
szbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🔎 <b>A Study in Scarlet</b> · <b>press E</b> for the book", szbOpen);
var C = SZB_CH[S.ch], prog = b && b.k === "hold" && SZB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - SZB.hold)) + " s)" : b && b.k === "gather" ? " (" + (SZB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🔎 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var on = {};
try {
if (szbActive()) {
var S = szbS(), C = SZB_CH[S.ch];
if (C && C.stills)
for (var k in C.stills) {
var r = C.stills[k];
if (S.s >= r[0] && S.s < r[1])
on[k] = 1;
}
}
}
catch (e) { }
["sz_n3dine", "sz_hroom"].forEach(function (rk) { var Rm = SHK.rooms[rk]; if (!Rm || !Rm.g)
return; Rm.g.traverse(function (o) { if (o.userData && o.userData.still)
o.visible = !!on[o.userData.still]; }); });
},
function () {
var g = new THREE.Group(), w = dlnC(0xE8E2D4), b = dlnC(0x8A6A48), cu = dlnC(0x6A2A2A);
var c = dlnBox(g, 0.7, 0.1, 0.5, cu, 0, 0.05, 0);
var bd = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), w);
bd.scale.set(1.7, 0.75, 0.9);
bd.position.set(0, 0.2, 0);
g.add(bd);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), w);
hd.position.set(0.3, 0.2, 0.02);
g.add(hd);
var mz = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), w);
mz.scale.set(1.4, 0.8, 0.9);
mz.position.set(0.39, 0.18, 0.02);
g.add(mz);
[[0.3, 0.29, 0.06], [0.3, 0.29, -0.03]].forEach(function (p) { var e = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 5), b); e.position.set(p[0], p[1], p[2]); e.rotation.z = -0.5; g.add(e); });
[[0.14, 0.12], [0.14, -0.1], [-0.16, 0.12], [-0.16, -0.1]].forEach(function (p) { dlnBox(g, 0.2, 0.05, 0.05, w, p[0] + 0.06, 0.13, p[1]); });
var sp = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), b);
sp.scale.set(1.4, 0.4, 1);
sp.position.set(-0.05, 0.31, 0.02);
g.add(sp);
g.userData.keep = 1;
return g;
},
function (t) { if (t > 4 && t < 4.6)
szbSay("Holmes sits in the stalls wrapped in the most perfect happiness, gently waving his long, thin fingers in time to the music."); if (t > 12 && t < 12.6)
szbSay("'Her attack and her bowing are splendid.'"); if (t > 19 && t < 19.6)
szbSay("He stays long after the last note. He has somewhere else to go, alone; he sends you on to Baker Street."); },
function (t) { if (t > 2 && t < 2.6)
szbSay("The melancholy hooting of a mountain owl, a few yards off; answered by another. A shadowy figure comes out of the gap, and a second man joins him."); if (t > 5 && t < 5.6)
szbSay("'To-morrow at midnight. When the Whip-poor-Will calls three times.' 'Shall I tell Brother Drebber?' 'Pass it on. Nine to seven!' 'Seven to five!' They flit away."); },
function (x, z) {
var best = null, bd = 40;
for (var k in SZU_PLACES) {
var P = SZU_PLACES[k], d = Math.hypot(x - P.x, z - P.z);
if (d < bd) {
bd = d;
best = P.name;
}
}
if (best)
return best;
if (suLineD(SZU_GORGE, x, z).d < SZU_GW + 3)
return "Eagle Cañon";
if (x < -400)
return "the Great Alkali Plain";
if (suH(x, z) > 40)
return "the mountains";
return "the valley";
},
function () {
var b = "", fns = {}, go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); fn(); }; };
go("pic", "🎩", "To Piccadilly", "The Criterion and its Long Bar", function () { szGo("cab", "🐴 <b>Piccadilly.</b> The Circus, the Criterion's lamps, the crush of cabs and omnibuses."); });
go("sm", "🏥", "To Barts, West Smithfield", "St Bartholomew's Hospital; the chemical laboratory", function () { szGo("smcab", "🐴 <b>West Smithfield.</b> The gate of Barts, King Henry over the arch; the great market opposite."); });
go("br", "🛤️", "To the Brixton Road", "Lauriston Gardens; Audley Court", function () { szGo("brcab", "🐴 <b>The Brixton Road.</b> Villas and shops, the tram rails, and back from the road, Lauriston Gardens."); });
go("cam", "🏘️", "To Camberwell", "Torquay Terrace; Halliday's Private Hotel", function () { szGo("tqcab", "🐴 <b>Torquay Terrace, Camberwell.</b> Lodging-houses all along."); });
go("lgs", "🏨", "To Little George Street", "Halliday's Private Hotel", function () { szGo("lgs", "🐴 <b>Little George Street.</b> Halliday's Private Hotel, its lamp over the door."); });
go("hd", "👗", "To Houndsditch", "13, Duncan Street", function () { szGo("hdcab", "🐴 <b>Houndsditch.</b> Old clothes, rags and bottles, cheap jewellers."); });
go("bk", "🔎", "To 221B Baker Street", "Up the seventeen steps to the sitting-room", function () { shkGoIn("ws_baker"); });
go("tg", "📠", "To the telegraph office", "Charing Cross: a wire to anywhere", function () { shkGoIn("sz_yard"); });
go("sj", "🎻", "To St James's Hall", "A Hallé concert: Norman-Neruda", function () { shkGoIn("sz_concert"); });
go("ps", "🚓", "To the police station", "Where the prisoner is taken", function () { shkGoIn("sz_police"); });
if (typeof hbGo === "function")
go("hb", "🐕", "To the Hound's London", "Regent Street, the Northumberland Hotel", function () { hbGo("cab"); });
if (typeof bsGo === "function")
go("bs", "🚪", "To Baker Street", "The street, 221B's black door", function () { bsGo("door"); });
if (typeof wsmGo === "function")
go("wsm", "🕰️", "To Westminster", "Whitehall, Big Ben, the Abbey", function () { wsmGo("cab"); });
go("gos", "🏥", "To Great Ormond Street", "London, 1912: the hospital, Queen Square", function () { dlnGo(); });
go("book", "🔎", "The book", "A Study in Scarlet: all fourteen chapters", function () { szbOpen(); });
worldCard(worldFacts("🐴 A hansom cab", SHK.inside ? "At the door" : "London, 1881", [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("szl", "🔎 To A Study in Scarlet's London", "Piccadilly and the Criterion, Barts, the Brixton Road, 1881");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); szGo("cab", "🔎 <b>Piccadilly, 1881.</b> The cab sets you down by the Criterion: from here, a cab to anywhere in this London."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function () {
var lite = !!SZU.lite, G = new THREE.Group();
G.name = "su-carpet";
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var K = [{ k: "grass", c: 1.3, N: lite ? 28 : 64, geo: suTuftGeo(9, 0.5, 0.06, 0.5, 0x6A6A3A, 0xD8C890, 21), cols: [0xFFFFFF, 0xE8E0C0, 0xD8D0A0, 0xF0E8D0], den: 0.8 },
{ k: "sage", c: 1.8, N: lite ? 20 : 46, geo: suTuftGeo(12, 0.55, 0.12, 0.7, 0x4A5040, 0xA8B098, 22), cols: [0xFFFFFF, 0xE0E8E0, 0xC8D0C0], den: 0.6 },
{ k: "bloom", c: 3.2, N: lite ? 10 : 24, geo: suTuftGeo(5, 0.4, 0.05, 0.4, 0x4A6A2A, 0xE8C040, 23), cols: [0xFFFFFF, 0xF0A0C0, 0xA0B0F0, 0xF0F0F0], den: 0.5 }];
K.forEach(function (k, ki) { var m = new THREE.InstancedMesh(k.geo, mat, k.N * k.N); m.frustumCulled = false; k.m = m; k.cx = null; k.seed = ki * 19 + 5; G.add(m); });
return { g: G, K: K };
},
function (k, ix, iz, M, Q, E, S, V, C) {
var h1 = suHash(ix, iz, k.seed), h2 = suHash(ix, iz, k.seed + 1), h3 = suHash(ix, iz, k.seed + 2), x = (ix + h1) * k.c, z = (iz + h2) * k.c, ok = h3 < k.den;
if (ok && (x < SZU_R.x0 || x > SZU_R.x1 || z < SZU_R.z0 || z > SZU_R.z1))
ok = false;
var y = ok ? suH(x, z) : 0;
if (ok) {
var plain = x < -420 && y < 12, w = plain ? (k.k === "sage" ? 0.18 : 0.06) : y > 90 ? 0.1 : k.k === "bloom" ? 0.35 : 0.95;
if (suHash(ix, iz, k.seed + 3) > w)
ok = false;
if (ok) {
for (var i = 0; i < SZU_FLAT.length; i++) {
var F = SZU_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r * 0.75) {
ok = false;
break;
}
}
}
if (ok && suLineD(SZU_CREEK, x, z).d < 4)
ok = false;
}
if (!ok) {
S.set(0, 0, 0);
V.set(0, -50, 0);
M.compose(V, Q.set(0, 0, 0, 1), S);
return 0;
}
var s = 0.65 + suHash(ix, iz, k.seed + 4) * 0.8;
E.set(0, suHash(ix, iz, k.seed + 5) * 6.28, 0);
Q.setFromEuler(E);
S.set(s, s * (0.8 + h3 * 0.5), s);
V.set(suX(x), y - 0.06, suZ(z));
M.compose(V, Q, S);
C.setHex(k.cols[(suHash(ix, iz, k.seed + 6) * k.cols.length) | 0]);
return 1;
},
function (L, on) {
if (!SZU.built || !SZU.live)
return;
if (!SZU.carpet) {
if (!on)
return;
SZU.carpet = suCarpetMake();
SZU.live.add(SZU.carpet.g);
}
SZU.carpet.g.visible = on;
if (!on)
return;
var ML = suLocal(L.x, L.z), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), Cc = new THREE.Color();
SZU.carpet.K.forEach(function (k) {
var N = k.N, h = N >> 1, cx = Math.floor(ML.x / k.c), cz = Math.floor(ML.z / k.c);
if (cx === k.cx && cz === k.cz)
return;
var all = k.cx == null || Math.abs(cx - k.cx) >= N || Math.abs(cz - k.cz) >= N, n = 0;
for (var iz = cz - h; iz < cz - h + N; iz++)
for (var ix = cx - h; ix < cx - h + N; ix++) {
if (!all && ix >= k.cx - h && ix < k.cx - h + N && iz >= k.cz - h && iz < k.cz - h + N)
continue;
var sx = ((ix % N) + N) % N, sz = ((iz % N) + N) % N, idx = sz * N + sx;
suCarpetCell(k, ix, iz, M, Q, E, S, V, Cc);
k.m.setMatrixAt(idx, M);
k.m.setColorAt(idx, Cc);
n++;
}
k.cx = cx;
k.cz = cz;
if (n) {
k.m.instanceMatrix.needsUpdate = true;
if (k.m.instanceColor)
k.m.instanceColor.needsUpdate = true;
}
});
},
function () {
var live = {};
for (var k in SZB.cast) {
var C = SZB.cast[k];
if (C && C.g && C.g.parent && C.c && C.c.name)
live[C.c.name] = 1;
}
var act = szbActive(), here = SHK.inside, C0 = act ? SZB_CH[szbS().ch] : null;
[SZL.home || [], SZU.home || []].forEach(function (list) {
list.forEach(function (H) {
var nm = H.T && H.T.name, off = !!(nm && live[nm]) || !!(C0 && nm && H.room === here && (C0.cast || []).some(function (c) { return c.name === nm; }));
if (off && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!off && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
if (H.T)
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
});
},
function (add) {
var g = new THREE.Group(), m = wfMat(0xF0ECE0, { r: 0.95 });
for (var i = 0; i < 4; i++) {
var t = new THREE.Mesh(wfGeo("sxtb" + i, function () { return new THREE.TorusGeometry(0.11 - i * 0.012, 0.032, 8, 18); }), m);
t.rotation.x = Math.PI / 2 + (i % 2 ? 0.18 : -0.18);
t.position.y = 0.02 + i * 0.035;
g.add(t);
}
var top = new THREE.Mesh(wfGeo("sxtbt", function () { return new THREE.SphereGeometry(0.11, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), m);
top.position.y = 0.07;
top.scale.set(1, 0.9, 1.05);
g.add(top);
add("Head", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group(), m = wfMat(0xF2EEE2, { r: 0.95 });
var cap = new THREE.Mesh(wfGeo("sxcp", function () { return new THREE.CylinderGeometry(0.11, 0.105, 0.09, 16); }), m);
cap.position.y = 0.06;
g.add(cap);
var peak = new THREE.Mesh(wfGeo("sxcpk", function () { return new THREE.CylinderGeometry(0.12, 0.12, 0.008, 16, 1, false, -Math.PI * 0.3, Math.PI * 0.6); }), wfMat(0x1A1A1A, { r: 0.4 }));
peak.position.set(0, 0.02, 0.02);
g.add(peak);
var cur = new THREE.Mesh(wfGeo("sxcpc", function () { return new THREE.CylinderGeometry(0.115, 0.14, 0.12, 16, 1, true, Math.PI * 0.7, Math.PI * 1.6); }), m);
cur.position.y = -0.02;
g.add(cur);
add("Head", [0, 0.1, -0.01], g);
},
function (add) {
var g = new THREE.Group(), m = wfMat(0xF4F0E4, { r: 0.9 });
var d = new THREE.Mesh(wfGeo("sxph", function () { return new THREE.SphereGeometry(0.13, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5); }), m);
d.scale.set(1, 1.1, 1.15);
d.position.y = 0.03;
g.add(d);
var b = new THREE.Mesh(wfGeo("sxphb", function () { return new THREE.CylinderGeometry(0.19, 0.2, 0.012, 20); }), m);
b.scale.set(1, 1, 1.15);
g.add(b);
add("Head", [0, 0.1, 0], g);
},
function (seed, who, o) {
o = Object.assign({}, o || {});
if (!o.sex && SXL_SHE.test(who))
o.sex = "f";
if (who === "newsboy" || who === "bsarab")
o.child = true;
if (!o.beard)
o.beard = who === "sxsikh" ? "full" : who === "sxwatson" ? "mustache" : who === "sxsmall" ? "full" : who === "sxsmally" ? "mustache" : who === "sxjones" ? "mustache" : who === "sxmerch" ? "full" : who === "sxofficer" ? "mustache" : null;
if (!o.beard)
delete o.beard;
var p = dlnPerson(seed, who, o);
if (who === "sxholmes")
p.scale.set(0.94, 1.07, 0.94);
else if (who === "sxthad")
p.scale.set(0.96, 0.9, 0.96);
else if (who === "sxjones" || who === "sxmcm")
p.scale.set(1.1, 1.0, 1.1);
else if (who === "sxtonga")
p.scale.set(0.8, 0.74, 0.8);
else if (who === "sxsikh")
p.scale.set(1.02, 1.06, 1.02);
return p;
},
function (L, x, z) {
var best = 1e9, bt = 0, tot = 0, acc = 0, segs = [];
for (var i = 1; i < L.length; i++) {
var l = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]);
segs.push(l);
tot += l;
}
for (var j = 1; j < L.length; j++) {
var ax = L[j - 1][0], az = L[j - 1][1], dx = L[j][0] - ax, dz = L[j][1] - az, q = dx * dx + dz * dz || 1, t = ((x - ax) * dx + (z - az) * dz) / q;
t = t < 0 ? 0 : t > 1 ? 1 : t;
var d = Math.hypot(x - ax - dx * t, z - az - dz * t);
if (d < best) {
best = d;
bt = (acc + t * segs[j - 1]) / tot;
}
acc += segs[j - 1];
}
return { d: best, t: bt };
},
function () {
return function (x, W, H) {
var R = wRand(61);
x.fillStyle = "#8E8070";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 2600; i++) {
var v = 100 + ((R() * 90) | 0);
x.fillStyle = "rgb(" + (v + 10) + "," + (v) + "," + (v - 12) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2);
}
x.strokeStyle = "rgba(50,40,30,.4)";
for (var c = 0; c < 30; c++) {
x.beginPath();
var sy = R() * H;
x.moveTo(0, sy);
x.lineTo(W, sy + R() * 20 - 10);
x.stroke();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(31);
x.fillStyle = "#B8A888";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 1800; i++) {
x.fillStyle = ["#C8B898", "#A89878", "#D8C8A8", "#988868"][(R() * 4) | 0];
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
}
x.fillStyle = "rgba(120,100,70,.35)";
x.fillRect(W * 0.16, 0, W * 0.1, H);
x.fillRect(W * 0.74, 0, W * 0.1, H);
};
},
function (P) {
var mat = sjMat("sxtrack", 128, 128, sjTrackTex());
SXU_ROADS.forEach(function (L) {
var pts = [];
for (var i = 1; i < L.length; i++) {
var ax = L[i - 1][0], az = L[i - 1][1], bx = L[i][0], bz = L[i][1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / 5));
for (var k = (i === 1 ? 0 : 1); k <= n; k++)
pts.push([ax + (bx - ax) * k / n, az + (bz - az) * k / n]);
}
var w = 4, pos = [], uv = [], idx = [], v = 0;
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
[[p[0] + nx, p[1] + nz, 0], [p[0] - nx, p[1] - nz, 1]].forEach(function (s) { pos.push(sjX(s[0]), sjH(s[0], s[1]) + 0.07, sjZ(s[1])); uv.push(s[2], v * 0.6); });
v++;
if (i > 0) {
var a = (i - 1) * 2;
idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
P.add(new THREE.Mesh(g, mat));
});
},
function (P, x, z, s, R, o) {
o = o || {};
var g = new THREE.IcosahedronGeometry(1, SXU.lite ? 0 : 1), mat = sjMat("sxrock", 256, 256, sjRockTex());
var m = new THREE.Mesh(g, mat);
m.scale.set(s * (0.8 + R() * 0.6), s * (o.flat || 0.55 + R() * 0.35), s * (0.8 + R() * 0.6));
m.rotation.set(R() * 0.3, R() * 6.28, R() * 0.3);
m.position.set(sjX(x), (o.y != null ? o.y : sjH(x, z)) - s * 0.12, sjZ(z));
P.add(m);
return m;
},
function (x, z) {
var h, n = Math.sin(x * 0.013) * Math.cos(z * 0.011), m = Math.sin(x * 0.047 + z * 0.031);
if (z < -150) {
var T = sjLineD(SXU_THAMES, x, z), w = sjThamesW(x);
h = 3.0 + 0.6 * n + 0.2 * m;
if (x > 820 && z > -520)
h = 0.9 + 0.35 * n + 0.25 * Math.sin(x * 0.09) * Math.sin(z * 0.08);
var gh = Math.hypot(x + 100, z + 300);
if (gh < 130)
h += 36 * sjSmooth((130 - gh) / 90);
if (T.d < w)
h = -4.5;
else if (T.d < w + 2.5)
h = -4.5 + (h + 4.5) * sjSmooth((T.d - w) / 2.5);
if (z < -820)
h += Math.pow((-820 - z) / 60, 1.4) * 30;
}
else {
var isle = x > 40;
if (!isle) {
h = 5 + 1.2 * n + 0.4 * m;
var J = sjLineD(SXU_JUMNA, x, z);
if (J.d < SXU_JW)
h = -2.5;
else if (J.d < SXU_JW + 10)
h = -2.5 + (h + 2.5) * sjSmooth((J.d - SXU_JW) / 10);
if (x > -120)
h += Math.pow((x + 120) / 160, 1.6) * 90;
}
else {
var dx = x - SXU_ISLE.x, dz = z - SXU_ISLE.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx), R = sjIsleR(a), t = 1 - r / R;
if (t < 0)
h = -6 + Math.max(-8, t * 20);
else {
h = 0.8 + Math.min(1, t * 8) * 1.6 + Math.pow(Math.max(0, t - 0.25) / 0.75, 1.5) * 60 * (0.7 + 0.3 * Math.sin(a * 4));
}
var sw = Math.hypot(x - SXU_SITE.swamp.x, z - SXU_SITE.swamp.z);
if (sw < 90 && t > 0)
h = Math.min(h, 0.7 + 0.3 * Math.sin(x * 0.2) * Math.sin(z * 0.17) + sw / 90 * 1.2);
if (x < 120)
h = Math.max(h, Math.pow((120 - x) / 80, 1.6) * 80 - 6);
}
}
var rz = -110 + 20 * Math.sin(x * 0.004);
if (Math.abs(z - rz) < 110)
h = Math.max(h, (1 - Math.abs(z - rz) / 110) * 90 * (0.85 + 0.15 * Math.sin(x * 0.011)) + (z < rz ? 3 : 5));
if (x < -1200)
h += Math.pow((-1200 - x) / 100, 1.5) * 60;
if (x > 1220)
h += Math.pow((x - 1220) / 80, 1.5) * 60;
if (z > 930)
h += Math.pow((z - 930) / 70, 1.5) * 60;
return h;
},
function (x, z, h, R) {
var c, n = 0.5 + 0.5 * Math.sin(x * 0.031 + z * 0.027) * Math.cos(z * 0.019 - x * 0.013), m = 0.5 + 0.5 * Math.sin(x * 0.11 - z * 0.07) * Math.sin(z * 0.09 + x * 0.05);
var steep = Math.min(1, Math.abs(sjH(x + 3, z) - h) / 3 + Math.abs(sjH(x, z + 3) - h) / 3), reg = sjRegion(x, z);
if (h < 0.3)
c = [0.36 - 0.05 * n, 0.34 - 0.04 * n, 0.28 - 0.03 * n];
else if (reg === "river") {
c = [0.40 - 0.07 * n, 0.38 - 0.05 * n + 0.03 * m, 0.33 - 0.05 * n];
if (x > 820 && z > -520)
c = [0.40 - 0.08 * m, 0.46 - 0.06 * n, 0.28 - 0.05 * m];
if (Math.hypot(x + 100, z + 300) < 130)
c = [0.36 - 0.05 * n, 0.50 - 0.06 * m, 0.26];
}
else if (reg === "agra") {
c = [0.74 - 0.08 * n - 0.04 * m, 0.62 - 0.07 * n - 0.03 * m, 0.42 - 0.06 * n];
var J = sjLineD(SXU_JUMNA, x, z).d;
if (J < SXU_JW + 40) {
var wt = 1 - Math.max(0, J - SXU_JW - 6) / 34;
c = [c[0] * (1 - wt) + 0.62 * wt, c[1] * (1 - wt) + 0.58 * wt, c[2] * (1 - wt) + 0.44 * wt];
}
var gr = Math.max(0, 1 - Math.abs(J - SXU_JW - 60) / 60) * 0.5;
c = [c[0] - gr * 0.2, c[1] - gr * 0.05, c[2] - gr * 0.16];
}
else {
var r = Math.hypot(x - SXU_ISLE.x, z - SXU_ISLE.z), R0 = sjIsleR(Math.atan2(z - SXU_ISLE.z, x - SXU_ISLE.x)), t = 1 - r / R0;
if (t < 0.05)
c = [0.86 - 0.06 * n, 0.80 - 0.06 * n, 0.64 - 0.05 * n];
else
c = [0.24 - 0.05 * m, 0.40 - 0.08 * n, 0.18 - 0.04 * m];
if (Math.hypot(x - SXU_SITE.swamp.x, z - SXU_SITE.swamp.z) < 90 && h < 2.2)
c = [0.30 - 0.05 * m, 0.32 - 0.04 * n, 0.20];
if (Math.hypot(x - SXU_SITE.blair.x, z - SXU_SITE.blair.z) < 80)
c = [0.58 - 0.06 * n, 0.50 - 0.05 * n, 0.36];
}
if (steep > 0.35 && h > 3) {
var k = Math.min(1, steep);
c = [c[0] * (1 - k * 0.5) + 0.36 * k * 0.5, c[1] * (1 - k * 0.5) + 0.34 * k * 0.5, c[2] * (1 - k * 0.5) + 0.26 * k * 0.5];
}
return c;
},
function () {
return function (x, W, H) {
var R = wRand(1857);
x.fillStyle = "#DCD2BE";
x.fillRect(0, 0, W, H);
for (var c = 0; c < 90; c++) {
var cx = R() * W, cy = R() * H, r = 20 + R() * 60, g = x.createRadialGradient(cx, cy, 0, cx, cy, r), d = R() < 0.5;
g.addColorStop(0, d ? "rgba(120,104,80,.16)" : "rgba(250,244,230,.14)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(cx - r, cy - r, r * 2, r * 2);
}
for (var i = 0; i < 22000; i++) {
var v = 170 + ((R() * 70) | 0);
x.fillStyle = "rgba(" + v + "," + (v - 8) + "," + (v - 24) + "," + (0.25 + R() * 0.5) + ")";
x.fillRect(R() * W, R() * H, 1, 1);
}
for (var p = 0; p < 420; p++) {
var px = R() * W, py = R() * H, pr = 0.8 + R() * 2.4, pv = 120 + ((R() * 90) | 0);
x.fillStyle = "rgba(40,30,20,.35)";
x.beginPath();
x.ellipse(px + 0.8, py + 0.9, pr, pr * 0.75, 0, 0, 7);
x.fill();
x.fillStyle = "rgb(" + pv + "," + (pv - 6) + "," + (pv - 16) + ")";
x.beginPath();
x.ellipse(px, py, pr, pr * 0.75, R() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(70,84,44,.35)";
for (var g2 = 0; g2 < 700; g2++) {
var gx = R() * W, gy = R() * H;
x.beginPath();
x.moveTo(gx, gy);
x.lineTo(gx + R() * 4 - 2, gy - 2 - R() * 4);
x.stroke();
}
};
},
function () {
return function (x, W, H) {
var R = wRand(97);
x.fillStyle = "#909090";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 420; i++) {
x.strokeStyle = "rgba(" + (R() < 0.55 ? "255,255,255" : "30,30,30") + "," + (0.05 + R() * 0.14) + ")";
x.lineWidth = 0.8 + R() * 1.6;
var px = R() * W, py = R() * H, L = 14 + R() * 50;
x.beginPath();
x.moveTo(px, py);
x.bezierCurveTo(px + L * 0.3, py - 2.5, px + L * 0.6, py + 2.5, px + L, py);
x.stroke();
}
};
},
function (col, rep, op) {
var k = "water" + col;
if (SXU.mats[k])
return SXU.mats[k];
var t = wTex(256, 256, sjRippleTex());
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep, rep);
var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 70, specular: 0x5A6670, transparent: op < 1, opacity: op });
m.userData.flow = t;
(SXU.flow = SXU.flow || []).push(t);
return (SXU.mats[k] = m);
},
function (P) {
var W = 2700, D = 2000, sx = SXU.lite ? 110 : 220, sz = SXU.lite ? 84 : 170, geo = new THREE.PlaneGeometry(W, D, sx, sz);
geo.rotateX(-Math.PI / 2);
geo.translate(0, 0, 50);
var pos = geo.attributes.position, col = new Float32Array(pos.count * 3), R = wRand(5);
for (var i = 0; i < pos.count; i++) {
var x = pos.getX(i), z = pos.getZ(i), h = sjH(x, z), c = sjGroundCol(x, z, h, R);
pos.setY(i, h);
col[i * 3] = c[0];
col[i * 3 + 1] = c[1];
col[i * 3 + 2] = c[2];
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeVertexNormals();
var t = wTex(512, 512, sjDustTex());
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(160, 120);
var me = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: t, vertexColors: true }));
me.position.set(sjX(0), 0, sjZ(0));
me.userData.keep = 1;
me.frustumCulled = false;
P.add(me);
var thames = new THREE.Mesh(new THREE.PlaneGeometry(2700, 560), sjWaterMat(0x5A6258, 90, 0.94));
thames.rotation.x = -Math.PI / 2;
thames.position.set(sjX(0), SXU_WATER, sjZ(-560));
P.add(thames);
var jumna = new THREE.Mesh(new THREE.PlaneGeometry(220, 1100), sjWaterMat(0x7A7A5E, 30, 0.93));
jumna.rotation.x = -Math.PI / 2;
jumna.position.set(sjX(-430), 0.5, sjZ(500));
P.add(jumna);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(1300, 1100), sjWaterMat(0x2E7480, 60, 0.9));
sea.rotation.x = -Math.PI / 2;
sea.position.set(sjX(660), SXU_WATER, sjZ(470));
P.add(sea);
},
function () {
var P = [], N = [];
for (var f = 0; f < 7; f++) {
var c = new THREE.PlaneGeometry(0.5, 3.2, 1, 4).toNonIndexed(), a = c.attributes.position.array;
for (var i = 0; i < a.length; i += 3) {
var t = (a[i + 1] + 1.6) / 3.2;
a[i + 1] = -t * t * 1.2;
a[i + 2] = t * 3.0;
a[i] *= 1 - t * 0.6;
}
c.rotateY(f / 7 * Math.PI * 2);
c.computeVertexNormals();
P.push.apply(P, c.attributes.position.array);
N.push.apply(N, c.attributes.normal.array);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
return g;
},
function (seed, n) {
var R = wRand(seed), P = [], N = [], U = [];
for (var k = 0; k < (n || 5); k++) {
var g = new THREE.IcosahedronGeometry(1, 1).toNonIndexed(), a = g.attributes.position.array, ox = k ? (R() - 0.5) * 1.1 : 0, oy = k ? (R() - 0.3) * 0.7 : 0, oz = k ? (R() - 0.5) * 1.1 : 0, sc = k ? 0.55 + R() * 0.3 : 0.85;
for (var i = 0; i < a.length; i += 3) {
var j = 1 + (R() - 0.5) * 0.28;
a[i] = a[i] * sc * j + ox;
a[i + 1] = a[i + 1] * sc * j * 0.85 + oy;
a[i + 2] = a[i + 2] * sc * j + oz;
}
g.computeVertexNormals();
P.push.apply(P, a);
N.push.apply(N, g.attributes.normal.array);
U.push.apply(U, g.attributes.uv.array);
}
var out = new THREE.BufferGeometry();
out.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
out.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
out.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
return out;
},
function () {
return function (x, W, H) {
var R = wRand(29);
x.fillStyle = "#808080";
x.fillRect(0, 0, W, H);
var c = ["#A0A0A0", "#B8B8B8", "#6A6A6A", "#C8C8C8", "#585858", "#949494"];
for (var i = 0; i < 2400; i++) {
var px = R() * W, py = R() * H, r = 2 + R() * 5, a = R() * 3;
x.fillStyle = c[(R() * c.length) | 0];
x.beginPath();
x.ellipse(px, py, r, r * 0.45, a, 0, 7);
x.fill();
}
for (var j = 0; j < 500; j++) {
x.fillStyle = "rgba(30,30,30," + (R() * 0.35) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
};
},
function (P, R) {
var lite = !!SXU.lite, M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), C = new THREE.Color();
var kinds = {
reed: { geo: new THREE.ConeGeometry(0.12, 1, 4, 1), cols: [0x8A8A4A, 0x7A7A3A, 0x9A9458], l: [] },
bush: { geo: sjCrownGeo(11, 4), cols: [0x5A6A34, 0x4A602E, 0x66703A, 0x7A7A46], l: [], leaf: 1 },
crown: { geo: sjCrownGeo(7, lite ? 4 : 6), cols: [0x3E6A2C, 0x4A7A34, 0x345A26, 0x5A7A38, 0x4A6A30], l: [], leaf: 1 },
crown2: { geo: sjCrownGeo(19, lite ? 4 : 6), cols: [0x2E5A22, 0x3A6A2A, 0x2A4E1E, 0x46682C], l: [], leaf: 1 },
fern: { geo: sjPalmGeo(), cols: [0x4A7A30, 0x3E6A2A, 0x5A8A3A], l: [] },
trunk: { geo: new THREE.CylinderGeometry(0.12, 0.2, 1, 6, 1), cols: [0x4A3624, 0x3A2A1C, 0x5A4630], l: [] },
palm: { geo: sjPalmGeo(), cols: [0x3A6A2A, 0x4A7A30, 0x2E5A24], l: [] },
ptrunk: { geo: new THREE.CylinderGeometry(0.14, 0.22, 1, 7, 1), cols: [0x7A6A50, 0x6A5A44], l: [] }
};
var put = function (k, x, z, y, sx, sy, sz, ry, rz) { var K = kinds[k]; K.l.push([x, z, y, sx, sy, sz, ry, rz || 0, K.cols[(R() * K.cols.length) | 0]]); };
var nearFlat = function (x, z, f) { for (var i = 0; i < SXU_FLAT.length; i++) {
var F = SXU_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r * f)
return true;
} return Math.hypot(x - SXU_SITE.blair.x, z - SXU_SITE.blair.z) < 70; };
var tree = function (x, z, y, s, k2) { var lean = (R() - 0.5) * 0.12; put("trunk", x, z, y + s * 1.0, s * 0.9, s * 2.2, s * 0.9, R() * 6.28, lean); put(k2 ? "crown2" : "crown", x, z, y + s * 2.6, s * 1.6 * (0.85 + R() * 0.3), s * 1.2 * (0.85 + R() * 0.3), s * 1.5 * (0.85 + R() * 0.3), R() * 6.28); shkSolid({ x: sjX(x), z: sjZ(z), r: 0.4 * s }); };
var tall = function (x, z, y, s) { put("trunk", x, z, y + s * 2.4, s * 1.1, s * 4.8, s * 1.1, R() * 6.28); put("crown2", x, z, y + s * 5.2, s * 2.2, s * 1.3, s * 2.1, R() * 6.28); shkSolid({ x: sjX(x), z: sjZ(z), r: 0.5 * s }); };
var palm = function (x, z, y, s) { var lean = (R() - 0.5) * 0.35; put("ptrunk", x, z, y + s * 2.4, s, s * 4.8, s, R() * 6.28, lean); put("palm", x + Math.sin(lean) * -s * 2.3, z, y + s * 4.8, s * 1.1, s, s * 1.1, R() * 6.28); shkSolid({ x: sjX(x), z: sjZ(z), r: 0.3 }); };
for (var i = 0; i < (lite ? 900 : 3600); i++) {
var x = 830 + R() * 420, z = -500 + R() * 340, y = sjH(x, z);
if (y < 0.5)
continue;
put("reed", x, z, y + 0.5, 1, 0.8 + R() * 1.0, 1, R() * 6.28, (R() - 0.5) * 0.3);
}
for (var b = 0; b < (lite ? 160 : 600); b++) {
var x2 = -1250 + R() * 2050, z2 = -880 + R() * 700, y2 = sjH(x2, z2);
if (y2 < 0.8 || y2 > 60)
continue;
if (sjLineD(SXU_THAMES, x2, z2).d < sjThamesW(x2) + 30)
continue;
if (R() < 0.3)
tree(x2, z2, y2, 1.4 + R() * 1.6);
else
put("bush", x2, z2, y2 + 0.3, 0.6 + R() * 0.8, 0.5 + R() * 0.4, 0.6 + R() * 0.8, R() * 6.28);
}
for (var g = 0; g < (lite ? 30 : 90); g++) {
var gx = -100 + (R() - 0.5) * 220, gz = -300 + (R() - 0.5) * 180, gy = sjH(gx, gz);
if (Math.hypot(gx + 100, gz - (-300)) > 120 || gy < 2)
continue;
tree(gx, gz, gy, 2 + R() * 1.6);
}
for (var a = 0; a < (lite ? 300 : 1100); a++) {
var ax = -1250 + R() * 1200, az = -40 + R() * 960, ay = sjH(ax, az);
if (ay < 0.8 || ay > 50 || nearFlat(ax, az, 0.95))
continue;
var J = sjLineD(SXU_JUMNA, ax, az).d;
if (J < SXU_JW + 30 && R() < 0.6)
palm(ax, az, ay, 0.9 + R() * 0.4);
else if (R() < 0.4)
tree(ax, az, ay, 1.6 + R() * 1.6);
else
put("bush", ax, az, ay + 0.3, 0.5 + R() * 0.7, 0.4 + R() * 0.3, 0.5 + R() * 0.7, R() * 6.28);
}
for (var s = 0; s < (lite ? 700 : 2600); s++) {
var an = R() * 6.28, rr = R(), sx = SXU_ISLE.x + Math.cos(an) * sjIsleR(an) * Math.sqrt(rr), sz = SXU_ISLE.z + Math.sin(an) * sjIsleR(an) * Math.sqrt(rr), sy = sjH(sx, sz);
if (sy < 0.6 || nearFlat(sx, sz, 1.0) || sjOnTrail(sx, sz))
continue;
var t = 1 - Math.hypot(sx - SXU_ISLE.x, sz - SXU_ISLE.z) / sjIsleR(an), sw = Math.hypot(sx - SXU_SITE.swamp.x, sz - SXU_SITE.swamp.z) < 90;
if (t < 0.12) {
if (R() < 0.7)
palm(sx, sz, sy, 0.9 + R() * 0.5);
}
else if (sw) {
put("bush", sx, sz, sy + 0.6, 1.4 + R() * 1.2, 0.9 + R() * 0.6, 1.4 + R() * 1.2, R() * 6.28);
}
else if (R() < 0.3)
palm(sx, sz, sy, 1.0 + R() * 0.5);
else if (R() < 0.22)
tall(sx, sz, sy, 2.4 + R() * 1.4);
else
tree(sx, sz, sy, 2.2 + R() * 2.2, 1);
if (!sw && t >= 0.12) {
for (var f = 0; f < (lite ? 1 : 3); f++) {
var fx = sx + (R() - 0.5) * 7, fz = sz + (R() - 0.5) * 7, fy = sjH(fx, fz);
if (fy > 0.6 && !nearFlat(fx, fz, 1.0) && !sjOnTrail(fx, fz))
put(R() < 0.6 ? "fern" : "bush", fx, fz, fy + (0.15), 0.5 + R() * 0.5, 0.5 + R() * 0.5, 0.5 + R() * 0.5, R() * 6.28);
}
}
}
for (var k in kinds) {
var K = kinds[k];
if (!K.l.length)
continue;
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: (k === "palm" || k === "fern") ? THREE.DoubleSide : THREE.FrontSide });
if (K.leaf) {
var lt = SXU.leafT || (SXU.leafT = wTex(256, 256, sjLeafTex()));
lt.wrapS = lt.wrapT = THREE.RepeatWrapping;
lt.repeat.set(2, 2);
mat.map = lt;
}
var mesh = new THREE.InstancedMesh(K.geo, mat, K.l.length);
K.l.forEach(function (q, i) { E.set(q[7], q[6], 0); Q.setFromEuler(E); S.set(q[3], q[4], q[5]); V.set(sjX(q[0]), q[2], sjZ(q[1])); M.compose(V, Q, S); mesh.setMatrixAt(i, M); C.setHex(q[8]); mesh.setColorAt(i, C); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
mesh.userData.keep = 1;
P.add(mesh);
}
},
function (P, R) {
sjGroundMesh(P);
sjTracks(P);
sjPlants(P, R);
for (var b = 0; b < (SXU.lite ? 50 : 160); b++) {
var x = -1200 + R() * 2400, z = -200 + R() * 1100, y = sjH(x, z);
if (y < 10)
continue;
var s = 0.5 + R() * R() * 2.4;
sjRock(P, x, z, s, R);
if (s > 1.4)
shkSolid({ x: sjX(x), z: sjZ(z), r: s * 0.8 });
}
},
function (P) {
var setts = dlnS("setts", 0x6A645A), flags = dlnS("flags", 0x8A847A), kerb = dlnS("stone", 0x9A948A), mud = dlnS("sand", 0x9A8A68);
Object.keys(SXL_ST).forEach(function (k, ki) {
var S = SXL_ST[k], yo = ki * 0.0007, w = S.f1 - S.f0, L = S.a1 - S.a0, c = (S.a0 + S.a1) / 2, fm = (S.f0 + S.f1) / 2, X = S.ax === "x" ? c : fm, Z = S.ax === "x" ? fm : c, pw = w > 12 ? 3.2 : w > 8 ? 2.0 : 0;
var cx = sxX(X), cz = sxZ(Z), sx = S.ax === "x" ? L : w, sx = S.ax === "x" ? w : L;
if (k === "pyard" || k === "ne") {
dlnPlane(P, sx, sx, k === "ne" ? dlnS("gravel", 0x6A5E4A) : mud, cx, 0.02, cz);
shkFloor(cx, cz, sx / 2 + 0.3, sx / 2 + 0.3, 0);
return;
}
dlnPlane(P, sx + 0.6, sx + 0.6, flags, cx, yo, cz);
if (pw) {
var rw = w - pw * 2;
dlnPlane(P, S.ax === "x" ? L : rw, S.ax === "x" ? rw : L, setts, cx, 0.012 + yo, cz);
[-1, 1].forEach(function (s) { var off = s * (rw / 2); dlnBox(P, S.ax === "x" ? L : 0.25, 0.14, S.ax === "x" ? 0.25 : L, kerb, S.ax === "x" ? cx : cx + off, 0.07, S.ax === "x" ? cz + off : cz); });
}
shkFloor(cx, cz, sx / 2 + 0.3, sx / 2 + 0.3, 0);
});
},
function (P, key, end, o) {
o = o || {};
var S = SXL_ST[key], w = S.f1 - S.f0, c = (S.f0 + S.f1) / 2, a = end ? S.a1 : S.a0, g = new THREE.Group();
g.position.set(S.ax === "x" ? sxX(a) : sxX(c), 0, S.ax === "x" ? sxZ(c) : sxZ(a));
if (S.ax === "x")
g.rotation.y = end ? -Math.PI / 2 : Math.PI / 2;
else if (end)
g.rotation.y = Math.PI;
P.add(g);
var n = Math.max(1, Math.round(w / 5.4)), st = o.st || 4, H = st * 3.3;
wcFront(g, o.shop ? jkShopFront(o.v || 3) : wcGround("house", o.v || 1), -w / 2, w / 2, 0, 3.3, 0, 1, n);
wcFront(g, o.up ? o.up(st - 1) : wcUpper(o.upk || "stock", st - 1, o.v || 1), -w / 2, w / 2, 3.3, H - 3.3, 0, 1, n);
dlnGable(g, w, 8, 2.2, dlnS("slate", 0x8A8A90), 0, H, -4);
return g;
},
function (k, x, z, ry, o) {
var F = SXL_FOLK[k], p = sxPerson("sx_" + k, F.dress, { sex: F.sex });
p.position.set(x, (o && o.y) || 0.02, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "sx_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: (o && o.y) || 0.02 };
if (o && o.moor)
sxMoorGround(P);
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet || "Good day to you." } });
return P;
},
function (P) {
var org = { x: sxX(0), z: sxZ(0) }, shop = function (gr, v) { return gr === "shop" ? jkShopFront(v + 5) : wcGround(gr, v); };
wcRow(P, "nw", 0, { ST: SXL_ST, org: org, skip: [[-70, 70]], names: SXL_NAMES.nw.slice(), grR: ["house", "house", "shop"], grF: shop, upR: ["red", "stock"], stR: [3, 3, 4], hw: 9, d: 12, seed: 81 });
wcRow(P, "nw", 1, { ST: SXL_ST, org: org, names: SXL_NAMES.nw.slice(2), grR: ["house", "house"], grF: shop, upR: ["red", "stock"], stR: [3, 4], hw: 10, d: 12, seed: 83 });
sxEnd(P, "nw", 0, { st: 3, upk: "red" });
sxEnd(P, "nw", 1, { st: 3 });
wcRow(P, "bx", 0, { ST: SXL_ST, org: org, skip: [[-92, -68], [28, 52]], names: SXL_NAMES.bx.slice(), grR: ["house", "shop", "house", "pub"], grF: shop, upR: ["stock", "dwell", "stock"], stR: [2, 2, 3], hw: 5.6, d: 9, seed: 85 });
wcRow(P, "bx", 1, { ST: SXL_ST, org: org, skip: [[-8, 8]], names: SXL_NAMES.bx.slice(5), grR: ["house", "house", "shop", "pub"], grF: shop, upR: ["stock", "dwell"], stR: [2, 3], hw: 5.6, d: 9, seed: 87 });
sxEnd(P, "bx", 0, { st: 3 });
sxEnd(P, "bx", 1, { st: 2, shop: 1 });
wcRow(P, "bxl", 0, { ST: SXL_ST, org: org, gr: "house", upR: ["dwell", "stock"], stR: [2], hw: 6, d: 8, seed: 88 });
wcRow(P, "bxl", 1, { ST: SXL_ST, org: org, gr: "house", upR: ["dwell", "stock"], stR: [2], hw: 6, d: 8, seed: 89 });
sxEnd(P, "bxl", 1, { st: 2, upk: "dwell" });
wcRow(P, "kl", 0, { ST: SXL_ST, org: org, skip: [[-74, -46], [90, 110], [146, 164], [-158, -142]], names: SXL_NAMES.kl.slice(), grR: ["shop", "house", "pub", "shop"], grF: shop, upR: ["soot", "stock"], stR: [2, 3, 3], hw: 5.6, d: 9, seed: 91 });
wcRow(P, "kl", 1, { ST: SXL_ST, org: org, skip: [[-158, -142], [92, 108], [146, 164]], names: SXL_NAMES.kl.slice(5), grR: ["house", "shop", "doss"], grF: shop, upR: ["soot", "stock"], stR: [2, 3], hw: 5.6, d: 9, seed: 93 });
sxEnd(P, "kl", 0, { st: 3, upk: "soot" });
sxEnd(P, "kl", 1, { st: 3, shop: 1 });
wcRow(P, "pin", 0, { ST: SXL_ST, org: org, skip: [[-452, -438]], gr: "house", upR: ["soot"], stR: [2], hw: 5, d: 8, seed: 95 });
wcRow(P, "pin", 1, { ST: SXL_ST, org: org, names: SXL_NAMES.pin.slice(), grR: ["house", "shop"], grF: shop, upR: ["soot"], stR: [2], hw: 5, d: 8, seed: 96 });
sxEnd(P, "pin", 1, { st: 2, upk: "soot" });
wcRow(P, "kp", 0, { ST: SXL_ST, org: org, gr: "house", upR: ["soot", "stock"], stR: [2], hw: 5, d: 8, seed: 97 });
wcRow(P, "kp", 1, { ST: SXL_ST, org: org, names: SXL_NAMES.kp.slice(), grR: ["doss", "house"], upR: ["soot"], stR: [2], hw: 5, d: 8, seed: 98 });
sxEnd(P, "kp", 1, { st: 2, upk: "soot" });
wcRow(P, "bs", 0, { ST: SXL_ST, org: org, skip: [[-600, -586]], grR: ["house", "shop"], grF: shop, upR: ["soot", "ware"], stR: [2, 3], hw: 6, d: 9, seed: 99 });
wcRow(P, "bs", 1, { ST: SXL_ST, org: org, skip: [[-600, -586]], grR: ["house"], upR: ["ware", "soot"], stR: [3, 4], hw: 7, d: 10, seed: 100 });
},
function (P, R) {
var L = SXL_PL, stone = dlnS("stone", 0x8A847A), cap = dlnS("stone", 0x9A9488), H = 4.4;
var wall = function (x0, z0, x1, z1) {
var len = Math.hypot(x1 - x0, z1 - z0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, along = Math.abs(x1 - x0) > Math.abs(z1 - z0), w = along ? len : 0.7, d = along ? 0.7 : len;
dlnBox(P, w, H, d, stone, sxX(cx), H / 2, sxZ(cz));
dlnBox(P, w + 0.2, 0.2, d + 0.2, cap, sxX(cx), H + 0.1, sxZ(cz));
shkSolidBox(sxX(cx), sxZ(cz), w, d, 0);
if (!SXL.lite)
for (var k = 0; k < len; k += 0.7) {
var t = k / len, gx = x0 + (x1 - x0) * t, gz = z0 + (z1 - z0) * t, sh = dlnBox(P, 0.05, 0.12 + R() * 0.1, 0.16, dlnShine(0xB8D0C8, 0.05, 0.9), sxX(gx), H + 0.28, sxZ(gz));
sh.rotation.y = R() * 3;
}
};
wall(L.x0, L.z1, -1.4, L.z1);
wall(1.4, L.z1, L.x1, L.z1);
wall(L.x0, L.z0, L.x1, L.z0);
wall(L.x0, L.z0, L.x0, L.z1);
wall(L.x1, L.z0, L.x1, L.z1);
var dr = dlnBox(P, 1.6, 2.6, 0.12, dlnC(0x2A2A2E), sxX(0), 1.3, sxZ(L.z1 + 0.4));
for (var b = 0; b < 4; b++)
dlnBox(P, 1.7, 0.08, 0.16, dlnShine(0x3A3A3E, 0.5, 0.6), sxX(0), 0.4 + b * 0.6, sxZ(L.z1 + 0.42));
dlnBox(P, 2.6, 0.4, 1.0, cap, sxX(0), 2.9, sxZ(L.z1));
var lg = new THREE.Group();
lg.position.set(sxX(-8), 0, sxZ(L.z1 - 6));
P.add(lg);
dlnBox(lg, 5, 3.2, 4, dlnS("stock", 0x8A7A60), 0, 1.6, 0);
dlnGable(lg, 5.4, 4.4, 1.6, dlnS("slate", 0x6A6A72), 0, 3.2, 0);
dlnBox(lg, 0.9, 1.0, 0.06, dlnGlow(0xE8C080), 2.52, 1.6, 0);
shkSolidBox(sxX(-8), sxZ(L.z1 - 6), 5.2, 4.2, 0);
var w = L.hx1 - L.hx0, d = L.hz1 - L.hz0, HH = 11.4, h = new THREE.Group();
h.position.set(sxX(0), 0, sxZ(L.hz1));
P.add(h);
dlnBox(h, w, HH, d, dlnS("stock", 0x7A7060), 0, HH / 2, -d / 2);
wcFront(h, wcGround("house", 2), -w / 2, w / 2, 0, 3.8, 0.02, 1, 4);
wcFront(h, wcUpper("stock", 2, 2), -w / 2, w / 2, 3.8, 7.6, 0.02, 1, 4);
dlnBox(h, w + 0.4, 0.4, d + 0.4, cap, 0, HH, -d / 2);
dlnMansard(h, w, d, 3.0, dlnS("slate", 0x4A4A54), 0, HH + 0.2, -d / 2);
dlnBox(h, 1.2, 1.4, 0.08, dlnGlow(0xD8D8B8), 6, HH - 1.6, 0.06);
dlnBox(h, 3.2, 0.3, 1.4, cap, 0, 3.6, 0.6);
[-1.4, 1.4].forEach(function (x) { dlnCyl(h, 0.18, 0.2, 3.4, cap, x, 1.7, 0.9, 10); });
var lt = new THREE.Group();
lt.position.set(sxX(L.hx1 + 4), 0, sxZ(-88));
P.add(lt);
dlnBox(lt, 8, 3.0, 10, dlnS("stock", 0x7A6A58), 0, 1.5, 0);
var lr = dlnBox(lt, 8.6, 0.16, 10.6, dlnS("slate", 0x5A5A62), 0.2, 3.2, 0);
lr.rotation.z = 0.18;
shkSolidBox(sxX(L.hx1 + 4), sxZ(-88), 8.2, 10.2, 0);
dlnCyl(P, 0.08, 0.08, HH + 1, dlnShine(0x3A3A3A, 0.5, 0.6), sxX(L.pipe.x - 0.9), (HH + 1) / 2, sxZ(L.pipe.z), 8);
for (var c = 0; c < 6; c++)
dlnBox(P, 0.12, 0.06, 0.3, dlnShine(0x3A3A3A, 0.5, 0.6), sxX(L.pipe.x - 0.9), 1.4 + c * 2, sxZ(L.pipe.z));
shkSolidBox(sxX(0), sxZ((L.hz0 + L.hz1) / 2), w + 0.4, d + 0.4, 0);
var mud = dlnS("sand", 0x7A6A4E), hole = dlnC(0x1E1812);
for (var i = 0; i < (SXL.lite ? 24 : 70); i++) {
var x = L.x0 + 5 + R() * (L.x1 - L.x0 - 10), z = L.z0 + 5 + R() * (L.z1 - L.z0 - 14);
if (x > L.hx0 - 4 && x < L.hx1 + 12 && z > L.hz0 - 3 && z < L.hz1 + 5)
continue;
if (Math.abs(x) < 4 && z > L.z1 - 12)
continue;
if (Math.abs(x + 8) < 4 && Math.abs(z - L.z1 + 6) < 4)
continue;
var r = 0.6 + R() * 1.1, mh = new THREE.Mesh(new THREE.SphereGeometry(r * 1.3, 10, 6, 0, 6.28, 0, 1.3), mud);
mh.scale.set(1, 0.45, 0.8);
mh.position.set(sxX(x + r * 1.6), 0, sxZ(z));
P.add(mh);
var hl = new THREE.Mesh(new THREE.CircleGeometry(r, 12), hole);
hl.rotation.x = -Math.PI / 2;
hl.position.set(sxX(x), 0.03, sxZ(z));
P.add(hl);
if (r > 1.1)
shkSolid({ x: sxX(x), z: sxZ(z), r: r * 0.7 });
}
for (var t = 0; t < (SXL.lite ? 4 : 12); t++) {
var tx = L.x0 + 4 + R() * (L.x1 - L.x0 - 8), tz = L.z0 + 4 + R() * 8;
dlnCyl(P, 0.25, 0.35, 4, dlnS("oak", 0x3A2C1E), sxX(tx), 2, sxZ(tz), 6);
var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(2.6, 1), dlnC([0x2E4024, 0x3A4A2A][t % 2]));
cr.position.set(sxX(tx), 5.4, sxZ(tz));
P.add(cr);
shkSolid({ x: sxX(tx), z: sxZ(tz), r: 0.5 });
}
shkDoor("sx_phall", sxX(L.door.x), sxZ(L.door.z), "Pondicherry Lodge");
shkSpot(sxX(6), sxZ(L.z1 + 4), 2.6, "Pondicherry Lodge", "look at it", function () { sxTale("🏚️ Pondicherry Lodge", SXL_FACTS.pl); });
shkSpot(sxX(L.hx1 + 9.8), sxZ(L.pipe.z), 2.2, "The water-pipe", "look at it", function () { sxTale("🪜 The water-pipe", ["The water-pipe runs up the side of the house from the roof of the lean-to; a man could climb it, but not with a wooden leg, unless a friend let down a rope from above."]); });
shkSpot(sxX(-42), sxZ(-60), 3, "The dug-over grounds", "look about", function () { sxTale("🕳️ The grounds", ["Six years of digging for the treasure: Bartholomew and his brother had the whole garden turned over, pit after pit, heap after heap."]); });
},
function (P, R) {
var f = SXL_ST.bx.f0;
var g = new THREE.Group();
g.position.set(sxX(40), 0, sxZ(f));
P.add(g);
var w = 24, H = 9.9;
dlnBox(g, w, H, 10, dlnS("stock", 0x9A8A68), 0, H / 2, -5.2);
wcFront(g, wcGround("house", 1), -w / 2, w / 2, 0, 3.3, 0.02, 1, 3);
wcFront(g, wcUpper("dwell", 2, 1), -w / 2, w / 2, 3.3, 6.6, 0.02, 1, 3);
dlnGable(g, w + 0.4, 10.6, 2.4, dlnS("slate", 0x6A6A72), 0, H, -5.2);
dlnBox(g, 1.4, 2.2, 0.1, dlnGlow(0xF0C070), 0, 1.4, 0.04);
var lamp = dlnCyl(g, 0.2, 0.16, 0.4, dlnGlow(0xFFD890), 1.2, 2.8, 0.5, 8);
lamp.userData.lamp = 1;
shkSolidBox(sxX(40), sxZ(f - 5.2), w + 0.4, 10.4, 0);
shkDoor("sx_thad", sxX(40), sxZ(f + 1.2), "Thaddeus Sholto's house");
var v = new THREE.Group();
v.position.set(sxX(-80), 0, sxZ(f));
P.add(v);
var vw = 20;
dlnBox(v, vw, 7.4, 11, dlnS("stock", 0xB8A888), 0, 3.7, -6.6);
wcFront(v, wcGround("house", 3), -vw / 2, vw / 2, 0, 3.3, -1.0, 1, 2);
wcFront(v, wcUpper("dwell", 1, 2), -vw / 2, vw / 2, 3.3, 6.6, -1.0, 1, 2);
dlnGable(v, vw + 0.4, 11.6, 2.6, dlnS("slate", 0x6A6A72), 0, 7.4, -6.6);
dlnBox(v, 1.4, 2.2, 0.1, dlnGlow(0xF8D890), -4, 1.3, -0.95);
dlnBox(v, vw + 2, 0.8, 0.3, dlnS("stone", 0xA89E8C), 0, 0.4, -0.1);
dlnPlane(v, vw, 0.8, dlnS("lawn", 0x5A7A3A), 0, 0.02, -0.5);
shkSolidBox(sxX(-80), sxZ(f - 6.6), vw + 0.4, 11.4, 0);
shkDoor("sx_forr", sxX(-84), sxZ(f + 1.2), "Mrs Cecil Forrester's");
shkSpot(sxX(-30), sxZ(f + 3), 3, "The new streets", "look about", function () { sxTale("🧱 Brixton, 1888", SXL_FACTS.bx); });
},
function (P, R) {
var s = SXL_ST.pin, g = new THREE.Group();
g.position.set(sxX(s.f1), 0, sxZ(-445));
g.rotation.y = -Math.PI / 2;
P.add(g);
dlnBox(g, 12, 6.6, 9, dlnS("stock", 0x5A5244), 0, 3.3, -4.6);
wcFront(g, wcGround("shop", 2), -6, 6, 0, 3.3, 0.02, 1, 2);
wcFront(g, wcUpper("soot", 1, 2), -6, 6, 3.3, 6.6, 0.02, 1, 2);
dlnGable(g, 12.4, 9.6, 2.0, dlnS("slate", 0x5A5A62), 0, 6.6, -4.6);
var sg = wcSign("SHERMAN · BIRD STUFFER · No. 3", 6, 0.5, "#1A1A14", "#D8C890");
sg.position.set(0, 3.1, 0.14);
g.add(sg);
for (var b = 0; b < 7; b++) {
var bd = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), dlnC([0x6A5A44, 0x8A7A5A, 0x3A3A3A, 0xA88A5A][b % 4]));
bd.scale.set(1, 0.8, 1.4);
bd.position.set(-3.6 + b * 0.9, 1.4 + (b % 2) * 0.5, 0.1);
g.add(bd);
}
shkSolidBox(sxX(s.f1 + 4.6), sxZ(-445), 9.2, 12.4, 0);
shkDoor("sx_sherman", sxX(s.f1 - 1.2), sxZ(-445), "No. 3, Pinchin Lane");
shkSpot(sxX(-150), sxZ(-470), 2.6, "Pinchin Lane", "look about", function () { sxTale("🐦 Pinchin Lane", SXL_FACTS.pin); });
var N = SXL_ST.ne, fence = dlnS("oak", 0x5A4A36), plank = dlnS("oak", 0xA88A60);
[[N.a0 - 1, N.f0, N.a1 + 1, N.f0, [150, 160]], [N.a0 - 1, N.f1, N.a1 + 1, N.f1, null], [N.a0, N.f0, N.a0, N.f1, null], [N.a1, N.f0, N.a1, N.f1, null]].forEach(function (F) {
var x0 = F[0], z0 = F[1], x1 = F[2], z1 = F[3], along = z0 === z1, gap = F[4];
var seg = function (a, b) { if (b - a < 0.5)
return; var c = (a + b) / 2; if (along) {
dlnBox(P, b - a, 2.6, 0.2, fence, sxX(c), 1.3, sxZ(z0));
shkSolidBox(sxX(c), sxZ(z0), b - a, 0.3, 0);
}
else {
dlnBox(P, 0.2, 2.6, b - a, fence, sxX(x0), 1.3, sxZ(c));
shkSolidBox(sxX(x0), sxZ(c), 0.3, b - a, 0);
} };
if (along) {
if (gap) {
seg(x0, gap[0]);
seg(gap[1], x1);
}
else
seg(x0, x1);
}
else
seg(z0, z1);
});
var ys = wcSign("TIMBER YARD · DEALS · BATTENS · CREOSOTE", 6, 0.5, "#2A2218", "#E8D8A8");
ys.position.set(sxX(155), 3.1, sxZ(N.f0 - 0.15));
ys.rotation.y = Math.PI;
P.add(ys);
for (var k = 0; k < (SXL.lite ? 6 : 14); k++) {
var px = N.a0 + 8 + (k % 7) * 12, pz = N.f0 + 8 + ((k / 7) | 0) * 26;
var st = new THREE.Group();
st.position.set(sxX(px), 0, sxZ(pz));
P.add(st);
for (var l = 0; l < 8; l++)
dlnBox(st, 6, 0.22, 0.3, plank, 0, 0.12 + l * 0.24, -1.4 + (l % 2) * 0.2 + ((l / 2) | 0) * 0.0);
for (var q = 0; q < 5; q++)
dlnBox(st, 6, 0.22, 3.2, plank, 0, 0.12 + q * 0.44 + 2.0 * 0, 0.2 + q * 0.0);
shkSolidBox(sxX(px), sxZ(pz), 6.2, 3.4, 0);
}
var tar = dlnShine(0x1A140E, 0.2, 0.5), hoop = dlnShine(0x3A3430, 0.5, 0.6);
for (var r = 0; r < (SXL.lite ? 6 : 16); r++) {
var bx = 192 + (r % 4) * 4.2, bz = -396 + ((r / 4) | 0) * 4.2;
if (Math.abs(bx - 206) < 1 && Math.abs(bz + 388) < 1)
continue;
var bb = dlnCyl(P, 0.6, 0.55, 1.4, tar, sxX(bx), 0.7, sxZ(bz), 12);
dlnCyl(P, 0.62, 0.62, 0.06, hoop, sxX(bx), 0.3, sxZ(bz), 12);
dlnCyl(P, 0.62, 0.62, 0.06, hoop, sxX(bx), 1.1, sxZ(bz), 12);
shkSolid({ x: sxX(bx), z: sxZ(bz), r: 0.65 });
}
var B = SXL_PLACES.barrel;
dlnCyl(P, 0.6, 0.55, 1.4, tar, sxX(B.x), 0.7, sxZ(B.z + 3), 12);
var stain = new THREE.Mesh(new THREE.CircleGeometry(1.6, 14), dlnC(0x241A10));
stain.rotation.x = -Math.PI / 2;
stain.position.set(sxX(B.x), 0.025, sxZ(B.z + 3));
P.add(stain);
shkSolid({ x: sxX(B.x), z: sxZ(B.z + 3), r: 0.65 });
dlnBox(P, 1.2, 0.5, 2.0, dlnS("oak", 0x6A5038), sxX(B.x + 2), 0.5, sxZ(B.z + 3));
shkSpot(sxX(170), sxZ(-404), 3, "The timber yard", "look about", function () { sxTale("🪵 Nine Elms", SXL_FACTS.ne); });
var W = SXL_ST.stairs, deck = dlnS("oak", 0x7A6A50);
dlnPlane(P, 520, 170, dlnShine(0x3A4A44, 0.15, 0.75), sxX(0), -0.6, sxZ(SXL_RIVER_Z - 85));
shkSolidBox(sxX(0), sxZ(SXL_RIVER_Z - 85), 520, 170, 0);
dlnBox(P, W.a1 - W.a0 + 20, 0.6, 1.2, dlnS("stone", 0x6A645A), sxX((W.a0 + W.a1) / 2), -0.1, sxZ(SXL_RIVER_Z + 0.6));
var jg = new THREE.Group();
jg.position.set(sxX(-30), 0, sxZ(SXL_RIVER_Z));
P.add(jg);
dlnBox(jg, 4, 0.2, 10, deck, 0, -0.1, -5);
for (var pl = 0; pl < 6; pl++) {
dlnCyl(jg, 0.15, 0.15, 3, dlnS("oak", 0x3A2E22), -1.8 + (pl % 2) * 3.6, -1.4, -1 - ((pl / 2) | 0) * 4, 6);
}
for (var bt = 0; bt < 3; bt++) {
var boat = new THREE.Group();
boat.position.set(sxX(-50 + bt * 14), -0.35, sxZ(SXL_RIVER_Z - 6 - bt * 2));
boat.rotation.y = 0.2 * bt;
P.add(boat);
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, 6.28, Math.PI / 2, Math.PI / 2), dlnC([0x3A4A5A, 0x5A3A2A, 0x2A3A2A][bt]));
hull.scale.set(1.0, 0.5, 2.6);
boat.add(hull);
}
var sm = new THREE.Group();
sm.position.set(sxX(-30), 0, sxZ(-590));
P.add(sm);
dlnBox(sm, 9, 5, 7, dlnS("oak", 0x5A4A38), 0, 2.5, 3.6);
dlnGable(sm, 9.4, 7.4, 1.6, dlnS("slate", 0x5A5A62), 0, 5, 3.6);
var ms = wcSign("MORDECAI SMITH · BOATS TO HIRE BY THE HOUR OR DAY", 7, 0.5, "#F0E8D0", "#1A1A1A");
ms.position.set(0, 4.2, -0.1);
ms.rotation.y = Math.PI;
sm.add(ms);
var ms2 = wcSign("STEAM LAUNCH", 3, 0.4, "#F0E8D0", "#1A1A1A");
ms2.position.set(0, 3.5, -0.1);
ms2.rotation.y = Math.PI;
sm.add(ms2);
shkSolidBox(sxX(-30), sxZ(-586.4), 9.2, 7.2, 0);
shkDoor("sx_smith", sxX(-30), sxZ(-591.4), "Mordecai Smith's house");
for (var m = 0; m < 14; m++) {
var mx = -240 + m * 36, mh = 8 + ((m * 37) % 5) * 3;
dlnBox(P, 30, mh, 12, dlnC([0x4A4640, 0x5A5248, 0x3E3A36][m % 3]), sxX(mx), mh / 2, sxZ(SXL_RIVER_Z - 170));
}
shkSpot(sxX(-60), sxZ(-596), 2.6, "The river stairs", "look about", function () { sxTale("⛵ The foot of Broad Street", SXL_FACTS.bs); });
},
function (P) {
Object.keys(SXL_ST).forEach(function (k) { var S = SXL_ST[k]; if (S.f1 - S.f0 < 10 || k === "pyard" || k === "ne" || k === "stairs")
return; for (var a = S.a0 + 12; a < S.a1 - 3; a += SXL.lite ? 40 : 26) {
var side = ((a / 26) | 0) % 2 ? S.f0 + 0.8 : S.f1 - 0.8;
if (S.ax === "x")
dlnLamp(P, sxX(a), sxZ(side));
else
dlnLamp(P, sxX(side), sxZ(a));
} });
[["cab", 0], ["bxcab", 0], ["klcab", 0]].forEach(function (c) {
var C = SXL_PLACES[c[0]], S = SXL_ST[sxStreetAt(C.x, C.z)];
if (!S)
return;
var side = C.z > (S.f0 + S.f1) / 2 ? S.f1 - 0.4 : S.f0 + 0.4;
dlnBox(P, 6, 1.0, 0.4, dlnC(0x2A2A2A), sxX(C.x), 0.5, sxZ(side));
shkSolidBox(sxX(C.x), sxZ(side), 6, 0.6, 0);
shkSpot(sxX(C.x), sxZ(C.z), 3.4, "The cab rank", "take a cab", function () { sxCabCard(); });
});
dlnPillarBox(P, sxX(80), sxZ(7.6));
dlnPillarBox(P, sxX(-30), sxZ(406.6));
dlnPillarBox(P, sxX(60), sxZ(-493.4));
shkSpot(sxX(-110), sxZ(-2), 3, "The Norwood road", "look about", function () { sxTale("🌳 Upper Norwood", SXL_FACTS.nw); });
shkSpot(sxX(-20), sxZ(-502), 3, "Kennington Lane", "look about", function () { sxTale("🛤️ Kennington Lane", SXL_FACTS.kl); });
var rail = dlnShine(0x5A5A5E, 0.5, 0.6);
[-500.7, -499.3].forEach(function (z) { dlnBox(P, 480, 0.03, 0.08, rail, sxX(0), 0.03, sxZ(z)); });
},
function () {
var live = SXL.live;
["cab", "bxcab", "klcab"].forEach(function (k) { var C = SXL_PLACES[k]; dlnHansom(live, sxX(C.x - 4), sxZ(C.z + (C.z > (SXL_ST[sxStreetAt(C.x, C.z)].f0 + SXL_ST[sxStreetAt(C.x, C.z)].f1) / 2 ? -1.6 : 1.6)), -Math.PI / 2); });
SXL.loops = [];
[["nw", 0], ["bx", 400], ["kl", -500]].forEach(function (q) { var S = SXL_ST[q[0]], z = (S.f0 + S.f1) / 2, a0 = S.a0 + 20, a1 = S.a1 - 20, L = [[a0, z + 3.4], [a1, z + 3.4], [a1, z - 3.4], [a0, z - 3.4], [a0, z + 3.4]], d = 0; for (var i = 1; i < L.length; i++)
d += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); SXL.loops.push({ p: L, len: d }); });
var n = SXL.lite ? 3 : 9;
for (var c = 0; c < n; c++) {
var g = new THREE.Group();
live.add(g);
if (c % 3 === 2)
wcCart(g);
else
dlnHansom(g, 0, 0, 0);
var l = c % SXL.loops.length;
SXL.move.push({ g: g, l: l, s: c * 37, sp: 3 + c % 2, flip: c % 3 !== 2 });
}
},
function (R) {
var smart = ["gent", "lady", "jklady", "gent", "jkguest", "lady", "clergy", "jkfoot", "maid"], poor = ["wcwork", "wccoster", "wcloafer", "wcgirl", "maid", "jkshop", "newsboy"];
[["nw", smart, 14], ["bx", smart.concat(poor), 18], ["bxl", poor, 6], ["kl", poor.concat(["jkshop", "gent"]), 22], ["pin", poor, 6], ["kp", poor, 5], ["bs", ["wcwork", "wcporter", "wccoster"], 6], ["ne", ["wcwork", "wcwork", "jkshop"], 5]].forEach(function (q, qi) {
var S = SXL_ST[q[0]], n = SXL.lite ? Math.ceil(q[2] / 3) : q[2];
for (var i = 0; i < n; i++) {
var a = S.a0 + 10 + R() * (S.a1 - S.a0 - 20), side = R() < 0.5, f = S.f1 - S.f0 > 12 ? (side ? S.f0 + 0.8 + R() * 1.8 : S.f1 - 0.8 - R() * 1.8) : (S.f0 + S.f1) / 2 + (R() - 0.5) * (S.f1 - S.f0 - 1.5), x = S.ax === "x" ? a : f, z = S.ax === "x" ? f : a;
if (q[0] === "ne") {
x = 140 + R() * 80;
z = -420 + R() * 40;
}
var p = sxPerson("sxf" + qi + "_" + i, q[1][(R() * q[1].length) | 0]);
p.position.set(sxX(x), 0.02, sxZ(z));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: { r: S.f1 - S.f0 > 12 ? 18 : 5, sp: 0.4 + R() * 0.4 }, ground: 0.02 });
}
});
sxNamed("pc", sxX(90), sxZ(-6), Math.PI / 2, { wander: 50 });
sxNamed("newsboy", sxX(-50), sxZ(406.6), Math.PI);
sxNamed("cabman", sxX(-196), sxZ(-494), 0);
sxNamed("lighter", sxX(40), sxZ(-506), 0, { wander: 30 });
sxNamed("sawyer", sxX(180), sxZ(-416), 0, { wander: 8 });
sxNamed("waterman", sxX(-70), sxZ(-597), Math.PI);
sxNamed("maid", sxX(120), sxZ(7), 0, { wander: 20 });
},
function () {
return function (x, W, H) {
var R = wRand(43);
x.fillStyle = "#E4DED0";
x.fillRect(0, 0, W, H);
for (var c = 0; c < 40; c++) {
var cx = R() * W, cy = R() * H, r = 30 + R() * 90, g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
g.addColorStop(0, R() < 0.5 ? "rgba(170,150,120,.16)" : "rgba(255,252,244,.2)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(cx - r, cy - r, r * 2, r * 2);
}
for (var i = 0; i < 9000; i++) {
var v = 200 + ((R() * 55) | 0);
x.fillStyle = "rgba(" + v + "," + (v - 4) + "," + (v - 14) + ",.35)";
x.fillRect(R() * W, R() * H, 1, 1);
}
x.strokeStyle = "rgba(110,96,76,.35)";
x.lineWidth = 0.8;
for (var k = 0; k < 10; k++) {
var px = R() * W, py = R() * H;
x.beginPath();
x.moveTo(px, py);
for (var q = 0; q < 5; q++) {
px += R() * 16 - 8;
py += 4 + R() * 12;
x.lineTo(px, py);
}
x.stroke();
}
for (var f = 0; f < 3; f++) {
var fx = R() * W * 0.8, fy = R() * H * 0.8, fw = 20 + R() * 30, fh = 12 + R() * 18;
x.fillStyle = "rgba(150,90,60,.55)";
x.fillRect(fx, fy, fw, fh);
x.strokeStyle = "rgba(220,200,170,.6)";
for (var bl = 0; bl < fh; bl += 6) {
x.beginPath();
x.moveTo(fx, fy + bl);
x.lineTo(fx + fw, fy + bl);
x.stroke();
}
}
};
},
function () {
return function (x, W, H) {
var R = wRand(47);
x.fillStyle = "#8A7650";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 10) {
x.fillStyle = (y / 10) % 2 ? "#A89064" : "#9A8258";
for (var c = ((y / 10) % 2) * 12; c < W; c += 24)
x.fillRect(c, y + 1, 22, 8);
}
for (var p = 0; p < W; p += 48) {
x.fillStyle = "#5A4A30";
x.fillRect(p, 0, 5, H);
}
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(60,48,30," + (0.1 + R() * 0.2) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1);
}
};
},
function () {
return function (x, W, H) {
var R = wRand(53);
x.fillStyle = "#A8503A";
x.fillRect(0, 0, W, H);
for (var r = 0; r < H; r += 24) {
var c = (r / 24) % 2 ? -32 : 0;
for (var b = c; b < W; b += 64) {
var v = ((R() * 30) | 0);
x.fillStyle = "rgb(" + (160 + v) + "," + (76 + v * 0.6 | 0) + "," + (56 + v * 0.4 | 0) + ")";
x.fillRect(b + 1, r + 1, 62, 22);
}
}
for (var i = 0; i < 700; i++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "90,40,30" : "220,150,120") + "," + (0.06 + R() * 0.12) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 4, 1 + R() * 3);
}
};
},
function () {
return sjMat("sxthatch", 256, 256, function (x, W, H) {
var R = wRand(59);
x.fillStyle = "#8A7A4A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 2400; i++) {
x.strokeStyle = "rgba(" + (R() < 0.5 ? "160,140,90" : "90,74,44") + "," + (0.3 + R() * 0.4) + ")";
var sx = R() * W, sy = R() * H;
x.beginPath();
x.moveTo(sx, sy);
x.lineTo(sx + R() * 3 - 1.5, sy + 8 + R() * 10);
x.stroke();
}
}, 0.4);
},
function () {
return function (x, W, H) {
var R = wRand(29);
x.fillStyle = "#E8E2D4";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 16) {
x.fillStyle = "rgba(120,110,90,.35)";
x.fillRect(0, y + 13, W, 3);
x.fillStyle = "rgba(255,255,250,.5)";
x.fillRect(0, y, W, 2);
}
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(140,130,110," + (0.05 + R() * 0.12) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 6, 1);
}
};
},
function (P, ax, az, bx, bz, o) {
o = o || {};
var L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(L / 3)), ry = Math.atan2(bx - ax, bz - az), wood = dlnS("oak", 0x7A6448);
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = sjH(x, z);
for (var r = 0; r < 3; r++) {
var b = dlnBox(P, 0.1, 0.1, L / n + 0.3, wood, sjX(x) + (i % 2 ? 0.15 : -0.15), y + 0.35 + r * 0.4, sjZ(z));
b.rotation.y = ry + (i % 2 ? 0.12 : -0.12);
}
dlnBox(P, 0.14, 1.4, 0.14, wood, sjX(ax + (bx - ax) * i / n), sjH(ax + (bx - ax) * i / n, az + (bz - az) * i / n) + 0.7, sjZ(az + (bz - az) * i / n));
if (!o.open)
shkSolidBox(sjX(x), sjZ(z), 0.3, L / n, ry);
}
},
function (pieces, R, live) {
pieces.forEach(function (pc) {
var all = new THREE.Group();
SHK.G.add(all);
pc[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[sign] " + (f.name || "?"), e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = pc[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[sign] bake", e);
}
SHK.dist.push({ n: pc[0], g: g, x: pc[2], z: pc[3], r: pc[4] });
});
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : sjH(x, z), g = new THREE.Group();
g.position.set(sjX(x), y, sjZ(z));
g.rotation.y = ry || 0;
P.add(g);
var k = o.kind || "frame", w = o.w || 7, d = o.d || 6, st = o.st || 1, h = st * 3.0, wall = sjMat("sx" + k, k === "plaster" ? 512 : 256, k === "plaster" ? 512 : 256, k === "plaster" ? sjPlasterTex() : k === "wattle" ? sjWattleTex() : k === "red" ? sjRedTex() : sjBoardTex(), k === "plaster" ? 0.25 : k === "red" ? 0.34 : 0.5), dark = dlnC(0x1A1C20), lit = dlnGlow(0xF0C070), frame = dlnC(k === "frame" ? 0x3A4A3A : 0xE8E2D4);
dlnBox(g, w, h, d, wall, 0, h / 2, 0);
if (k === "red")
dlnBox(g, w + 0.3, 0.4, d + 0.3, dlnC(0x8A3A2A), 0, h + 0.2, 0);
else
dlnGable(g, w + 0.6, d + 0.8, k === "wattle" ? 2.2 : 2.0, k === "wattle" ? sjThatch() : dlnS("slate", 0x8A4A3A), 0, h, 0);
if (k === "plaster")
dlnBox(g, 0.7, 1.6, 0.7, dlnS("stone", 0xD8D0C0), -w / 2 + 0.5, h + 1.2, 0);
var dx = o.door != null ? o.door : 0;
dlnBox(g, 1.1, 2.1, 0.12, dlnS("oak", 0x5A4030), dx, 1.05, d / 2 + 0.03);
if (o.porch && !SXU.lite) {
dlnBox(g, w, 0.15, 2.2, dlnS("oak", 0x7A6040), 0, 0.08, d / 2 + 1.1);
dlnBox(g, w + 0.2, 0.1, 2.4, sjShingle(), 0, 2.7, d / 2 + 1.2).rotation.x = -0.12;
for (var p = 0; p < 4; p++)
dlnBox(g, 0.14, 2.6, 0.14, dlnS("oak", 0x7A6040), -w / 2 + 0.3 + p * (w - 0.6) / 3, 1.3, d / 2 + 2.1);
}
var cols = Math.max(1, Math.round(w / 3));
for (var f = 0; f < st; f++)
for (var c = 0; c < cols; c++) {
var wx = -w / 2 + (c + 0.5) * w / cols;
if (f === 0 && Math.abs(wx - dx) < 1.2)
continue;
var wy = 1.5 + f * 3.0;
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, wy, d / 2 + 0.02);
dlnBox(g, 0.84, 1.04, 0.06, (c + f + (o.seed || 0)) % 3 === 0 ? lit : dark, wx, wy, d / 2 + 0.05);
dlnBox(g, 1.0, 1.2, 0.08, frame, wx, wy, -d / 2 - 0.02);
dlnBox(g, 0.84, 1.04, 0.06, dark, wx, wy, -d / 2 - 0.05);
}
if (o.sign) {
var sg = wcSign(o.sign, Math.min(w - 0.6, o.sign.length * 0.28), 0.5, "#2A1E14", "#E8D8A8");
sg.position.set(0, h - 0.5, d / 2 + 0.08);
g.add(sg);
}
var sw = ry && Math.abs(Math.sin(ry)) > 0.7;
shkSolidBox(sjX(x), sjZ(z), sw ? d + 0.4 : w + 0.4, sw ? w + 0.4 : d + 0.4, 0);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(sjX(x), 0, sjZ(z));
g.rotation.y = ry || 0;
P.add(g);
var L = o.L || 36, B = L * 0.2;
var hull = new THREE.Mesh(new THREE.CylinderGeometry(B / 2, B * 0.35, L, 10, 1), dlnC(o.col || 0x1E1E22));
hull.rotation.x = Math.PI / 2;
hull.scale.set(1, 1, 0.55);
hull.position.y = 0.4;
g.add(hull);
dlnBox(g, B * 0.9, 0.3, L * 0.92, dlnS("oak", 0x8A7A5A), 0, 1.9, 0);
dlnBox(g, B * 0.98, 0.5, L * 0.94, dlnC(0xE8E2D2), 0, 1.3, 0);
var nm = o.masts || 3;
for (var m = 0; m < nm; m++) {
var mz = -L * 0.32 + m * L * 0.64 / Math.max(1, nm - 1), mh = (m === 0 || m === nm - 1 ? 0.85 : 1) * L * 0.75;
dlnCyl(g, 0.18, 0.26, mh, dlnS("oak", 0x6A5038), 0, mh / 2 + 1.8, mz, 6);
for (var y = 0; y < 3; y++) {
var yd = dlnCyl(g, 0.08, 0.08, B * (2.1 - y * 0.4), dlnS("oak", 0x5A4630), 0, mh * (0.45 + y * 0.18) + 1.8, mz, 5);
yd.rotation.z = Math.PI / 2;
dlnBox(g, B * (2.0 - y * 0.4), 0.35, 0.35, dlnC(0xD8D0BC), 0, mh * (0.45 + y * 0.18) + 1.6, mz);
}
}
var bs = dlnCyl(g, 0.12, 0.16, L * 0.4, dlnS("oak", 0x6A5038), 0, 3.2, L * 0.62, 6);
bs.rotation.x = Math.PI / 2 - 0.3;
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(sjX(x), 0, sjZ(z));
g.rotation.y = ry || 0;
P.add(g);
dlnBox(g, 4.4, 1.6, 22, dlnC(0x2A2420), 0, 0.4, 0);
dlnBox(g, 4.0, 0.2, 20, dlnS("oak", 0x7A6A50), 0, 1.25, 0);
dlnCyl(g, 0.15, 0.2, 16, dlnS("oak", 0x6A5038), 0, 9, -3, 6);
var sail = new THREE.Mesh(new THREE.PlaneGeometry(9, 12), dlnC(0x8A3A22));
sail.material.side = THREE.DoubleSide;
sail.position.set(0.1, 8, -7.5);
sail.rotation.y = Math.PI / 2;
g.add(sail);
var top = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), dlnC(0x7A3420));
top.material.side = THREE.DoubleSide;
top.position.set(0.1, 15.5, -5);
top.rotation.y = Math.PI / 2;
g.add(top);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(sjX(x), 0, sjZ(z));
g.rotation.y = ry || 0;
P.add(g);
var L = o.L || 40;
dlnBox(g, L * 0.17, 3.6, L, dlnC(0x1A1A1E), 0, 0.6, 0);
dlnBox(g, L * 0.17 - 0.2, 0.6, L, dlnC(0x8A2A22), 0, -1.0, 0);
dlnBox(g, L * 0.12, 2.6, L * 0.36, dlnC(0xE8E4D8), 0, 3.6, -L * 0.05);
dlnCyl(g, 0.9, 1.0, 8, dlnC(0x1A1A1A), 0, 8.5, 0, 12);
dlnCyl(g, 0.95, 0.95, 1.2, dlnC(o.band || 0xC8382A), 0, 11, 0, 12);
dlnCyl(g, 0.15, 0.2, 16, dlnS("oak", 0x6A5038), 0, 9, L * 0.35, 6);
return g;
},
function (o) {
o = o || {};
var g = new THREE.Group(), L = o.L || 12;
var hull = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 0.6, L, 10, 1), dlnC(o.hull || 0x1A1A1A));
hull.rotation.x = Math.PI / 2;
hull.scale.set(1, 1, 0.6);
hull.position.y = 0.1;
g.add(hull);
var bow = new THREE.Mesh(new THREE.ConeGeometry(1.25, 2.4, 10), dlnC(o.hull || 0x1A1A1A));
bow.rotation.x = Math.PI / 2;
bow.scale.set(1, 1, 0.6);
bow.position.set(0, 0.1, L / 2 + 1.2);
g.add(bow);
dlnBox(g, 2.0, 0.12, L, dlnS("oak", 0x9A8460), 0, 0.85, 0);
dlnBox(g, 1.3, 1.0, 2.6, dlnC(o.house || 0x2A2A30), 0, 1.4, -1.2);
dlnCyl(g, 0.3, 0.32, 2.4, dlnC(0x1A1A1A), 0, 2.0, 0.8, 10);
if (o.band)
dlnCyl(g, 0.33, 0.33, 0.4, dlnC(o.band), 0, 2.8, 0.8, 10);
var lamp = dlnCyl(g, 0.12, 0.12, 0.24, dlnGlow(0xFFE0A0), 0, 1.2, L / 2 + 0.4, 8);
if (o.name) {
var s = wcSign(o.name, 2.6, 0.4, "#1A1A1A", "#E8E0C8");
s.position.set(1.02, 0.4, L * 0.3);
s.rotation.y = Math.PI / 2;
g.add(s);
}
return g;
},
function (P) {
var stone = dlnS("stone", 0x6E685E);
for (var i = 1; i < SXU_THAMES.length; i++) {
var a = SXU_THAMES[i - 1], b = SXU_THAMES[i], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), nx = -dz / l, nz = dx / l, cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2, w = sjThamesW(cx) + 1.1, ry = Math.atan2(dx, dz);
[-1, 1].forEach(function (s) { if (s > 0 && cx > 820)
return; var q = dlnBox(P, 1.6, 7.8, l + 0.8, stone, sjX(cx + nx * w * s), -0.6, sjZ(cz + nz * w * s)); q.rotation.y = ry; });
}
},
function (P) {
var mat = dlnS("setts", 0x8A847A);
[-1, 1].forEach(function (side) {
var pts = [];
for (var x = -1290; x <= 1290; x += 6) {
if (side > 0 && x > 820)
break;
var cz = -560;
for (var i = 1; i < SXU_THAMES.length; i++) {
var a = SXU_THAMES[i - 1], b = SXU_THAMES[i];
if (x >= a[0] && x <= b[0]) {
cz = a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
break;
}
}
pts.push([x, cz + side * (sjThamesW(x) + 9)]);
}
var w = 14, pos = [], uv = [], idx = [], dist = 0;
pts.forEach(function (p, i) { if (i)
dist += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]); [[p[0], p[1] - w / 2, 0], [p[0], p[1] + w / 2, w]].forEach(function (q) { var h = Math.max(sjH(q[0], q[1]), 1.2); pos.push(sjX(q[0]), h + 0.06, sjZ(q[1])); uv.push(q[2], dist); }); if (i) {
var a = (i - 1) * 2;
idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
} });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
if (g.attributes.normal.getY(0) < 0) {
idx.reverse();
g.setIndex(idx);
g.computeVertexNormals();
}
var m = new THREE.Mesh(g, mat);
P.add(m);
});
},
function (P, R) {
var brick = dlnS("stock", 0x6A5A48), roof = dlnS("slate", 0x4A4A52), iron = dlnC(0x2A2A2A), coping = dlnS("stone", 0x8A847A), lamp = dlnGlow(0xF0D090);
var skipN = [[-1270, -1110], [-760, -640]], skipS = [[-200, 10], [820, 1400]];
var czAt = function (x) { for (var i = 1; i < SXU_THAMES.length; i++) {
var a = SXU_THAMES[i - 1], b = SXU_THAMES[i];
if (x >= a[0] && x <= b[0])
return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
} return -560; };
[-1, 1].forEach(function (side) {
var skip = side < 0 ? skipN : skipS;
for (var x = -1250; x < 1240; x += SXU.lite ? 44 : 24) {
if (skip.some(function (k) { return x > k[0] && x < k[1]; }))
continue;
var cz = czAt(x);
var w = sjThamesW(x), st = 3 + ((R() * 3) | 0), H = st * 3.3 + 0.6, d = 12 + R() * 6, z = cz + side * (w + 4 + d / 2);
if (side > 0 && x > -300 && x < -0)
continue;
var g = new THREE.Group();
g.position.set(sjX(x), sjH(x, z) - 0.2, sjZ(z));
if (side < 0)
g.rotation.y = Math.PI;
P.add(g);
var ware = wcUpper("ware", st, 1 + ((x / 24) | 0) % 3), back = wcUpper("stock", st, 2 + ((x / 24) | 0) % 3);
dlnBox(g, 21, H, d, brick, 0, H / 2, 0);
wcFront(g, ware, -10.5, 10.5, 0.3, H - 0.6, -d / 2 - 0.02, -1, 3);
wcFront(g, back, -10.5, 10.5, 0.3, H - 0.6, d / 2 + 0.02, 1, 3);
dlnBox(g, 21.4, 0.5, d + 0.4, coping, 0, H, 0);
if (R() < 0.7)
dlnGable(g, 21, d, 2.4, roof, 0, H, 0);
else
for (var cp = 0; cp < (SXU.lite ? 0 : 3); cp++)
dlnBox(g, 0.8, 1.6, 0.8, brick, -7 + cp * 7, H + 0.8, d / 2 - 1.4);
if (R() < 0.75) {
var jx = R() * 10 - 5, jib = dlnBox(g, 0.3, 0.3, 4, iron, jx, H - 1.6, -d / 2 - 2);
dlnCyl(g, 0.03, 0.03, H - 2, dlnC(0x4A4A4A), jx, (H - 2) / 2, -d / 2 - 3.9, 4);
dlnBox(g, 0.5, 0.5, 0.6, dlnS("oak", 0x6A5A44), jx, 1.6 + R() * 3, -d / 2 - 3.9);
}
if (!SXU.lite && R() < 0.5)
for (var bl = 0; bl < 3; bl++)
dlnCyl(g, 0.32, 0.32, 0.95, dlnS("oak", 0x6A5038), -6 + bl * 0.75 + R() * 4, 0.5, -d / 2 - 1.2 - R() * 1.2, 10);
if (!SXU.lite && R() < 0.4)
dlnBox(g, 1.2, 1.0, 1.2, dlnS("oak", 0x8A7458), 4 + R() * 3, 0.5, -d / 2 - 1.6);
var sname = ["WAPPING STEAM WHARF", "HAY'S WHARF", "ST KATHARINE DOCK", "BUTLER'S WHARF", "BREWER'S QUAY", "FRESH WHARF", "TEA WAREHOUSE", "GRANARY"][(R() * 8) | 0];
if (R() < 0.35) {
var sg = wcSign(sname, 12, 1.0, "#1A1A1A", "#E8E0C8");
sg.position.set(0, H - 1.4, -d / 2 - 0.1);
sg.rotation.y = Math.PI;
g.add(sg);
}
shkSolidBox(sjX(x), sjZ(z), 21, d, 0);
if (!SXU.lite && ((x / 24) | 0) % 2 === 0) {
var lz = cz + side * (w + 2.4), ly = sjH(x + 11, lz);
dlnCyl(P, 0.07, 0.1, 3.6, iron, sjX(x + 11), ly + 1.8, sjZ(lz), 6);
dlnBox(P, 0.4, 0.5, 0.4, lamp, sjX(x + 11), ly + 3.8, sjZ(lz));
}
if (R() < (SXU.lite ? 0.35 : 0.8)) {
var bz = cz + side * (w + 4 + d + 14 + R() * 10), bh = sjH(x, bz);
if (bh > 1 && bh < 14 && Math.abs(bh - sjH(x + 10, bz)) < 2.5) {
var tst = 2 + ((R() * 2) | 0), th = tst * 3.1, t = new THREE.Group();
t.position.set(sjX(x), bh - 0.2, sjZ(bz));
if (side < 0)
t.rotation.y = Math.PI;
P.add(t);
var up = wcUpper(R() < 0.5 ? "dwell" : "stock", tst, (x / 24) | 0), td = 9;
dlnBox(t, 20, th, td, brick, 0, th / 2, 0);
wcFront(t, up, -10, 10, 0.2, th - 0.4, -td / 2 - 0.02, -1, 4);
wcFront(t, up, -10, 10, 0.2, th - 0.4, td / 2 + 0.02, 1, 4);
dlnGable(t, 20, td, 2.0, roof, 0, th, 0);
for (var ch = 0; ch < 4; ch++)
dlnBox(t, 0.7, 1.4, 1.4, dlnS("stock", 0x7A6A58), -7.5 + ch * 5, th + 1.6, 0);
shkSolidBox(sjX(x), sjZ(bz), 20.4, td + 0.4, 0);
}
}
}
});
},
function (P, R) {
var y = sjH(-1200, -700), stone = dlnS("portland", 0xC8B890), g = new THREE.Group();
g.position.set(sjX(-1200), y, sjZ(-680));
P.add(g);
dlnBox(g, 150, 18, 22, stone, 0, 9, 0);
for (var p = 0; p < 30; p++) {
dlnBox(g, 0.8, 24, 0.8, stone, -74 + p * 5.1, 12, -11.4);
var pn = new THREE.Mesh(new THREE.ConeGeometry(0.7, 3, 4), stone);
pn.position.set(-74 + p * 5.1, 25.5, -11.4);
g.add(pn);
}
for (var w = 0; w < 26; w++)
for (var r = 0; r < 3; r++)
dlnBox(g, 2.0, 3.2, 0.1, dlnC(0x2A2A30), -70 + w * 5.6, 4 + r * 5, 11.06);
dlnGable(g, 150, 22, 5, dlnS("slate", 0x4A5A5A), 0, 18, 0);
var ct = new THREE.Group();
ct.position.set(60, 0, 8);
g.add(ct);
dlnBox(ct, 12, 62, 12, stone, 0, 31, 0);
[0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach(function (a) { var f = new THREE.Mesh(new THREE.CircleGeometry(3.6, 24), dlnGlow(0xF0E8C8)); f.position.set(Math.sin(a) * 6.05, 54, Math.cos(a) * 6.05); f.rotation.y = a; ct.add(f); });
var sp = new THREE.Mesh(new THREE.ConeGeometry(8.6, 22, 4), dlnS("slate", 0x3A4A4A));
sp.position.y = 73;
sp.rotation.y = Math.PI / 4;
ct.add(sp);
dlnBox(g, 22, 98, 22, stone, -66, 49, -2);
var vt = new THREE.Mesh(new THREE.ConeGeometry(4, 10, 4), dlnC(0xB8A880));
vt.position.set(-66, 103, -2);
g.add(vt);
shkSolidBox(sjX(-1200), sjZ(-680), 152, 24, 0);
var W = SXU_PLACES.wwharf, deck = dlnS("oak", 0x7A6A50);
dlnBox(P, 24, 0.4, 12, deck, sjX(W.x), 3.1, sjZ(W.z + 22));
sjDeck(W.x, W.z + 22, 12, 6, 3.3, 0);
for (var ws = 0; ws < 6; ws++)
dlnBox(P, 3, 0.3, 1.2, dlnS("stone", 0x8A847A), sjX(W.x + 8), 3.15 - ws * 0.45, sjZ(W.z + 29 + ws * 1.0));
for (var pl = 0; pl < 8; pl++)
dlnCyl(P, 0.25, 0.25, 9, dlnS("oak", 0x3A2E22), sjX(W.x - 10 + (pl % 4) * 6.6), -1.5, sjZ(W.z + (pl < 4 ? 16.4 : 27.6)), 6);
sxSpotM(W.x, W.z, 3, "Westminster Wharf", "look about", function () { sxTale("⚓ Westminster Wharf", ["The police launch lay at Westminster Wharf: Holmes had wired for 'the fastest steam launch' the police had, and she was waiting with steam up, a green lamp at her side."]); });
},
function (P, R) {
var c = { x: -790, z: -700 }, y = sjH(c.x, c.z), stone = dlnS("stone", 0xB8B0A0), g = new THREE.Group();
g.position.set(sjX(c.x), y, sjZ(c.z));
P.add(g);
[[0, -36, 80, 3], [0, 36, 80, 3], [-40, 0, 3, 72], [40, 0, 3, 72]].forEach(function (w) { dlnBox(g, w[2], 10, w[3], stone, w[0], 5, w[1]); });
for (var t = 0; t < 12; t++) {
var a = t / 12 * 6.28, tx = Math.max(-40, Math.min(40, Math.cos(a) * 56)), tz = Math.max(-36, Math.min(36, Math.sin(a) * 52));
dlnCyl(g, 3.4, 3.6, 13, stone, tx, 6.5, tz, 12);
}
dlnBox(g, 32, 27, 36, dlnS("stone", 0xD8D0C0), 0, 13.5, 0);
[[-16, -18], [16, -18], [-16, 18], [16, 18]].forEach(function (q) { dlnCyl(g, 2.4, 2.4, 32, dlnS("stone", 0xD8D0C0), q[0], 16, q[1], 12); var cap = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 8, 0, 6.28, 0, 1.5), dlnC(0x6A7A7A)); cap.position.set(q[0], 32.5, q[1]); g.add(cap); });
shkSolidBox(sjX(c.x), sjZ(c.z), 84, 76, 0);
[-610, -510].forEach(function (z) { var p = new THREE.Group(); p.position.set(sjX(-730), 0, sjZ(z)); P.add(p); dlnBox(p, 20, 14, 30, dlnS("stone", 0x9A9488), 0, 3, 0); for (var s = 0; s < 5; s++) {
dlnCyl(p, 0.2, 0.2, 24, dlnS("oak", 0x6A5A44), -9 + s * 4.5, 22, -14, 5);
dlnCyl(p, 0.2, 0.2, 24, dlnS("oak", 0x6A5A44), -9 + s * 4.5, 22, 14, 5);
} for (var h = 0; h < 4; h++)
dlnBox(p, 20, 0.2, 30, dlnS("oak", 0x7A6A50), 0, 12 + h * 5, 0); var cr = dlnBox(p, 0.6, 0.6, 26, dlnC(0x2A2A2A), 0, 36, 6); cr.rotation.y = 0.4; });
sxSpotM(-770, -650, 3, "The Tower", "look at it", function () { sxTale("🏰 The Tower of London", SXU_FACTS.tower); });
},
function (P, R) {
var J = SXU_SITE.jacob, y = sjH(J.x, J.z + 20), wood = dlnS("oak", 0x6A5A44);
var sh = new THREE.Group();
sh.position.set(sjX(J.x - 20), y, sjZ(J.z - 26));
P.add(sh);
dlnBox(sh, 24, 9, 14, dlnS("oak", 0x4A3E30), 0, 4.5, 0);
dlnGable(sh, 24.6, 14.6, 3, dlnS("slate", 0x4A4A52), 0, 9, 0);
var sg = wcSign("JACOBSON'S YARD · BOATBUILDERS", 10, 0.8, "#1A1A1A", "#E8E0C8");
sg.position.set(0, 7.6, 7.06);
sh.add(sg);
shkSolidBox(sjX(J.x - 20), sjZ(J.z - 26), 24.4, 14.4, 0);
dlnBox(P, 8, 0.3, 40, wood, sjX(J.x + 10), y - 1, sjZ(J.z + 8));
for (var b = 0; b < 3; b++) {
var bt = sjLaunch({ hull: [0x2A3A4A, 0x5A3A2A, 0x3A3A3A][b], L: 10 });
bt.position.set(sjX(J.x - 36 + b * 10), y + 0.8, sjZ(J.z + 4));
bt.rotation.y = 0.1 * b;
P.add(bt);
shkSolid({ x: sjX(J.x - 36 + b * 10), z: sjZ(J.z + 4), r: 2.2 });
}
sjDeck(J.x + 10, J.z + 8, 4, 20, y + 0.2, 0);
sxSpotM(J.x, J.z + 6, 3, "Jacobson's Yard", "look about", function () { sxTale("🛠️ Jacobson's Yard", ["'Down at Jacobson's Yard... she had been run in there and her funnel painted, and she lay among the other craft': Holmes, dressed as an old seaman, found the Aurora here."]); });
},
function (P, R) {
for (var s = 0; s < (SXU.lite ? 6 : 18); s++) {
var x = -1000 + s * (SXU.lite ? 160 : 60) + R() * 20, cz = 0;
for (var i = 1; i < SXU_THAMES.length; i++) {
var a = SXU_THAMES[i - 1], b = SXU_THAMES[i];
if (x >= a[0] && x <= b[0]) {
cz = a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
break;
}
}
var w = sjThamesW(x), side = s % 2 ? 1 : -1, z = cz + side * (w - 16 - R() * 8), k = s % 5;
if (k === 0 || k === 3)
sjShip(P, x, z, Math.PI / 2 + R() * 0.2 - 0.1, { L: 30 + R() * 14, masts: k === 3 ? 2 : 3, col: [0x1E1E22, 0x2A2A30, 0x3A2A22][s % 3] });
else if (k === 1)
sjBarge(P, x, z, Math.PI / 2 + (R() - 0.5) * 0.3);
else if (k === 2)
sjSteamer(P, x, z, Math.PI / 2, { L: 34 + R() * 12, band: [0xC8382A, 0xE8C040, 0x2A6A3A][s % 3] });
else
sjBarge(P, x, z + side * 8, Math.PI / 2);
}
},
function (P, R) {
var stone = dlnS("portland", 0xE0D8C8);
[-150, -50].forEach(function (x) {
var g = new THREE.Group();
g.position.set(sjX(x), sjH(x, -410) - 0.2, sjZ(-410));
P.add(g);
dlnBox(g, 40, 14, 60, stone, 0, 7, -10);
for (var c = 0; c < 8; c++)
dlnCyl(g, 0.8, 0.8, 12, stone, -17 + c * 4.8, 6, -40.8, 12);
dlnBox(g, 42, 1, 62, stone, 0, 14.5, -10);
dlnCyl(g, 6, 6, 10, stone, 0, 19, -40, 16);
var dome = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 10, 0, 6.28, 0, 1.6), dlnC(0x8A8A80));
dome.position.set(0, 24, -40);
g.add(dome);
dlnCyl(g, 1.2, 1.2, 6, stone, 0, 31, -40, 10);
shkSolidBox(sjX(x), sjZ(-420), 42, 62, 0);
});
var oy = sjH(-100, -330), o = new THREE.Group();
o.position.set(sjX(-100), oy, sjZ(-330));
P.add(o);
dlnBox(o, 16, 8, 10, dlnS("redbrick", 0xA85A44), 0, 4, 0);
var od = new THREE.Mesh(new THREE.SphereGeometry(3, 14, 8, 0, 6.28, 0, 1.6), dlnC(0x4A5A5A));
od.position.set(5, 9, 0);
o.add(od);
shkSolidBox(sjX(-100), sjZ(-330), 16.4, 10.4, 0);
sxSpotM(-100, -420, 3, "Greenwich", "look about", function () { sxTale("🏛️ Greenwich", SXU_FACTS.greenwich); });
},
function (P, R) {
for (var b = 0; b < (SXU.lite ? 3 : 8); b++) {
var x = 420 + b * 26, z = -370 - (b % 2) * 26, g = new THREE.Group();
g.position.set(sjX(x), sjH(x, z), sjZ(z));
P.add(g);
dlnBox(g, 22, 8, 16, dlnS("redbrick", 0x9A5038), 0, 4, 0);
dlnGable(g, 22.4, 16.4, 3, dlnS("slate", 0x4A4A52), 0, 8, 0);
if (b % 2 === 0)
dlnCyl(g, 0.9, 1.2, 22, dlnS("redbrick", 0x8A4632), 8, 11, 4, 10);
shkSolidBox(sjX(x), sjZ(z), 22.4, 16.4, 0);
}
sxSpotM(470, -345, 3, "Woolwich", "look about", function () { sxTale("🏭 Woolwich", ["Woolwich Arsenal, where the army's guns and shells were made: the launch tore past it at full speed, 'a great boat of the river police', after the Aurora."]); });
},
function (P, R) {
var pool = dlnShine(0x4A5A4A, 0.1, 0.75);
for (var p = 0; p < (SXU.lite ? 8 : 22); p++) {
var x = 860 + R() * 360, z = -480 + R() * 260, r = 3 + R() * 9;
if (sjH(x, z) < 0.4)
continue;
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 14), pool);
m.rotation.x = -Math.PI / 2;
m.position.set(sjX(x), sjH(x, z) + 0.04, sjZ(z));
m.scale.set(1, 0.6, 1);
P.add(m);
}
sjFence(P, 900, -300, 1000, -320, {});
sjFence(P, 1000, -320, 1080, -280, {});
var A = SXU_SITE.aground, mud = new THREE.Mesh(new THREE.CircleGeometry(14, 18), dlnShine(0x2A2418, 0.3, 0.1));
mud.rotation.x = -Math.PI / 2;
mud.position.set(sjX(A.x), sjH(A.x, A.z) + 0.05, sjZ(A.z));
P.add(mud);
sxSpotM(1010, -420, 3, "The Plumstead Marshes", "look about", function () { sxTale("🌾 The Plumstead Marshes", SXU_FACTS.marsh); });
},
function (P, R) {
var F = { x0: -880, x1: -520, z0: 330, z1: 680 }, y = SXU_FLAT[0].h, red = sjRed(), H = 16, merl = SXU.lite ? 6 : 3.2;
var wall = function (x0, z0, x1, z1, gap) {
var along = z0 === z1, L = along ? x1 - x0 : z1 - z0, segs = gap ? [[along ? x0 : z0, gap[0]], [gap[1], along ? x1 : z1]] : [[along ? x0 : z0, along ? x1 : z1]];
segs.forEach(function (sg) {
var l = sg[1] - sg[0];
if (l < 1)
return;
var c = (sg[0] + sg[1]) / 2, bx = along ? c : x0, bz = along ? z0 : c;
dlnBox(P, along ? l : 5, H, along ? 5 : l, red, sjX(bx), y + H / 2, sjZ(bz));
shkSolidBox(sjX(bx), sjZ(bz), along ? l : 5.2, along ? 5.2 : l, 0);
for (var m = sg[0] + 1.2; m < sg[1] - 1; m += merl) {
var mx = along ? m : x0, mz = along ? z0 : m;
dlnBox(P, along ? 1.4 : 1.2, 1.4, along ? 1.2 : 1.4, red, sjX(mx), y + H + 0.7, sjZ(mz));
}
});
};
wall(F.x0, F.z0, F.x1, F.z0, null);
wall(F.x0, F.z1, F.x1, F.z1, null);
wall(F.x0, F.z0, F.x0, F.z1, [492, 508]);
wall(F.x1, F.z0, F.x1, F.z1, [512, 528]);
for (var b = 0; b < (SXU.lite ? 8 : 20); b++) {
var t = b / 20, per = 2 * ((F.x1 - F.x0) + (F.z1 - F.z0)), d = t * per, bx, bz;
var W = F.x1 - F.x0, D = F.z1 - F.z0;
if (d < W) {
bx = F.x0 + d;
bz = F.z0;
}
else if (d < W + D) {
bx = F.x1;
bz = F.z0 + d - W;
}
else if (d < 2 * W + D) {
bx = F.x1 - (d - W - D);
bz = F.z1;
}
else {
bx = F.x0;
bz = F.z1 - (d - 2 * W - D);
}
if (Math.abs(bz - 500) < 14 && Math.abs(bx - F.x0) < 2)
continue;
if (Math.abs(bz - 520) < 14 && Math.abs(bx - F.x1) < 2)
continue;
dlnCyl(P, 5.2, 6, H + 3, red, sjX(bx), y + (H + 3) / 2, sjZ(bz), 14);
shkSolid({ x: sjX(bx), z: sjZ(bz), r: 6 });
var ch = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 2.4, 10), dlnC(0xE8E0D0));
ch.position.set(sjX(bx), y + H + 5, sjZ(bz));
P.add(ch);
var cd = new THREE.Mesh(new THREE.SphereGeometry(2.3, 10, 6, 0, 6.28, 0, 1.6), dlnC(0xE8E0D0));
cd.position.set(sjX(bx), y + H + 6.2, sjZ(bz));
P.add(cd);
}
[[F.x0, 500, -1], [F.x1, 520, 1]].forEach(function (G) {
var g = new THREE.Group();
g.position.set(sjX(G[0]), y, sjZ(G[1]));
g.rotation.y = G[2] > 0 ? -Math.PI / 2 : Math.PI / 2;
P.add(g);
[-12, 12].forEach(function (k) { dlnBox(g, 8, H + 8, 10, red, k, (H + 8) / 2, 0); var kd = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 3, 10), dlnC(0xE8E0D0)); kd.position.set(k, H + 9.5, 0); g.add(kd); var kc = new THREE.Mesh(new THREE.SphereGeometry(3.1, 10, 6, 0, 6.28, 0, 1.6), dlnC(0xE8E0D0)); kc.position.set(k, H + 11, 0); g.add(kc); });
dlnBox(g, 16, H - 9, 10, red, 0, 9 + (H - 9) / 2, 0);
var ar = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 10.2, 16, 1, false, 0, Math.PI), dlnC(0x6A2A1E));
ar.rotation.z = Math.PI / 2;
ar.rotation.y = Math.PI / 2;
ar.position.set(0, 9, 0);
g.add(ar);
for (var t = 0; t < 6; t++)
dlnBox(g, 1.4, 1.4, 0.3, dlnC(0xF0E8D8), -7 + t * 2.8, H + 2, 5.15);
[-1, 1].forEach(function (s) { shkSolidBox(sjX(G[0]), sjZ(G[1] + s * 12), 10.4, 8.4, 0); });
});
var pave = dlnS("flags", 0xC8B898);
dlnPlane(P, F.x1 - F.x0 - 10, F.z1 - F.z0 - 10, pave, sjX((F.x0 + F.x1) / 2), y + 0.03, sjZ((F.z0 + F.z1) / 2));
var cg = { x: -700, z: 470 }, chan = sjWaterMat(0x5A7A7A, 4, 0.95);
[[0, 0, 60, 1.6], [0, 0, 1.6, 60]].forEach(function (c) { dlnBox(P, c[2] + 0.8, 0.3, c[3] + 0.8, dlnC(0xE8E0D0), sjX(cg.x), y + 0.15, sjZ(cg.z)); var wm = new THREE.Mesh(new THREE.PlaneGeometry(c[2], c[3]), chan); wm.rotation.x = -Math.PI / 2; wm.position.set(sjX(cg.x), y + 0.31, sjZ(cg.z)); P.add(wm); });
[[-16, -16], [16, -16], [-16, 16], [16, 16]].forEach(function (q) { dlnPlane(P, 26, 26, dlnS("lawn", 0x6A8A44), sjX(cg.x + q[0]), y + 0.06, sjZ(cg.z + q[1])); if (!SXU.lite)
for (var t = 0; t < 4; t++) {
var tx = cg.x + q[0] + (t % 2 ? 7 : -7), tz = cg.z + q[1] + (t < 2 ? 7 : -7);
dlnCyl(P, 0.2, 0.28, 2.6, dlnS("planebark", 0x5A4A3A), sjX(tx), y + 1.3, sjZ(tz), 8);
var cr = new THREE.Mesh(sjCrownGeo(40 + t, 4), new THREE.MeshLambertMaterial({ color: 0x3E6A2C }));
cr.scale.set(2.2, 1.8, 2.2);
cr.position.set(sjX(tx), y + 3.6, sjZ(tz));
P.add(cr);
shkSolid({ x: sjX(tx), z: sjZ(tz), r: 0.4 });
} });
dlnCyl(P, 2.4, 2.6, 0.7, dlnC(0xF0ECE4), sjX(cg.x), y + 0.35, sjZ(cg.z), 20);
dlnCyl(P, 0.25, 0.35, 1.6, dlnC(0xF0ECE4), sjX(cg.x), y + 1.0, sjZ(cg.z), 10);
shkSolid({ x: sjX(cg.x), z: sjZ(cg.z), r: 2.6 });
var marble = dlnC(0xF0ECE4);
[[-560, 440], [-560, 600], [-600, 520]].forEach(function (q, i) { var g = new THREE.Group(); g.position.set(sjX(q[0]), y, sjZ(q[1])); P.add(g); dlnBox(g, 22, 1.2, 16, marble, 0, 0.6, 0); for (var c = 0; c < 8; c++) {
dlnCyl(g, 0.45, 0.5, 6, marble, -9 + (c % 4) * 6, 4.2, c < 4 ? -6.6 : 6.6, 10);
} dlnBox(g, 22, 1.0, 16, marble, 0, 7.6, 0); [-8, 8].forEach(function (k) { var k1 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 10, 6, 0, 6.28, 0, 1.6), dlnC(0xE8C860)); k1.position.set(k, 8.2, 0); g.add(k1); }); shkSolidBox(sjX(q[0]), sjZ(q[1]), 22.4, 16.4, 0); });
for (var k = 0; k < (SXU.lite ? 3 : 6); k++) {
var bx2 = -830 + k * 40, bz2 = 360;
sjHouse(P, bx2, bz2, 0, { kind: "plaster", w: 30, d: 10, y: y, porch: 1, seed: k });
}
for (var o = 0; o < (SXU.lite ? 10 : 26); o++) {
var ox = -760 + (o % 6) * 28 + R() * 6, oz = 590 + ((o / 6) | 0) * 20 + R() * 4;
if (Math.abs(ox + 640) < 8 && Math.abs(oz - 620) < 8)
continue;
var hh = 3 + R() * 7, ww = 6 + R() * 10, dd = 1.6;
var bw = dlnBox(P, ww, hh, dd, red, sjX(ox), y + hh / 2, sjZ(oz));
bw.rotation.y = R() < 0.5 ? 0 : Math.PI / 2;
shkSolidBox(sjX(ox), sjZ(oz), bw.rotation.y ? dd : ww, bw.rotation.y ? ww : dd, 0);
if (R() < 0.5)
for (var a = 0; a < 3; a++)
dlnCyl(P, 0.5, 0.55, hh * 0.8, red, sjX(ox - ww / 3 + a * ww / 3), y + hh * 0.4, sjZ(oz + 3), 10);
}
var td = new THREE.Group();
td.position.set(sjX(-640), y, sjZ(624));
P.add(td);
dlnBox(td, 10, 8, 8, red, 0, 4, -4);
var dr = dlnBox(td, 1.6, 2.6, 0.2, dlnC(0x2A1A10), 0, 1.3, 0.05);
shkSolidBox(sjX(-640), sjZ(620), 10.4, 8.4, 0);
sxDoorM("sx_trea", -640, 625.4, "The old hall in the deserted quarter");
var gh = new THREE.Group();
gh.position.set(sjX(-532), y, sjZ(550));
P.add(gh);
dlnBox(gh, 8, 4.4, 6, red, 0, 2.2, 0);
dlnBox(gh, 8.4, 0.4, 6.4, red, 0, 4.6, 0);
shkSolidBox(sjX(-532), sjZ(550), 8.4, 6.4, 0);
sxDoorM("sx_guard", -536.4, 550, "The guard-house by the water-gate");
sxSpotM(-700, 430, 3.4, "The fort at Agra", "look about", function () { sxTale("🏯 The fort at Agra", SXU_FACTS.agra); });
for (var st = 0; st < 8; st++)
dlnBox(P, 16, 0.4, 2, dlnS("flags", 0xC8B898), sjX(-506 + st * 2.4), y - 0.2 - st * 0.5 + 0.0, sjZ(520));
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : sjH(x, z), g = new THREE.Group();
g.position.set(sjX(x), y - 0.1, sjZ(z));
g.rotation.y = ry || 0;
P.add(g);
var w = o.w || 7, d = o.d || 7, st = o.st || 2, h = st * 3.2, wall = o.red ? sjRed() : sjPlasterIn(o.col || 0xF0EAD8), ledge = dlnS("stone", 0xC8B490), dark = dlnC(0x1E1A16), wood = dlnS("oak", 0x5A3E28), lite = SXU.lite;
dlnBox(g, w, h, d, wall, 0, h / 2, 0);
dlnBox(g, w + 0.2, 0.9, 0.25, wall, 0, h + 0.45, d / 2 - 0.02);
dlnBox(g, w + 0.2, 0.9, 0.25, wall, 0, h + 0.45, -d / 2 + 0.02);
dlnBox(g, 0.25, 0.9, d, wall, w / 2 - 0.02, h + 0.45, 0);
dlnBox(g, 0.25, 0.9, d, wall, -w / 2 + 0.02, h + 0.45, 0);
dlnBox(g, w + 0.4, 0.12, d + 0.4, ledge, 0, h + 0.02, 0);
if (!lite && o.seed % 3 === 0)
dlnBox(g, 2.4, 2.4, 2.4, wall, w / 2 - 1.6, h + 1.2, -d / 2 + 1.6);
for (var f = 0; f < st; f++) {
var ch = dlnBox(g, w + 0.3, 0.1, 0.7, ledge, 0, f * 3.2 + 2.75, d / 2 + 0.32);
ch.rotation.x = 0.22;
if (!lite)
for (var b = 0; b < Math.max(2, Math.round(w / 2.2)); b++)
dlnBox(g, 0.12, 0.4, 0.4, ledge, -w / 2 + 0.6 + b * (w - 1.2) / Math.max(1, Math.round(w / 2.2) - 1), f * 3.2 + 2.45, d / 2 + 0.2);
}
var dx = o.door || 0;
dlnBox(g, 1.2, 2.1, 0.1, wood, dx, 1.05, d / 2 + 0.03);
var ar = new THREE.Mesh(new THREE.CircleGeometry(0.6, 12, 0, Math.PI), wood);
ar.position.set(dx, 2.1, d / 2 + 0.035);
g.add(ar);
dlnBox(g, 1.6, 0.16, 0.3, ledge, dx, 0.08, d / 2 + 0.15);
var cols = Math.max(1, Math.round(w / 2.6));
for (var f2 = 0; f2 < st; f2++)
for (var c = 0; c < cols; c++) {
var wx = -w / 2 + (c + 0.5) * w / cols;
if (f2 === 0 && (Math.abs(wx - dx) < 1.3 || o.shop))
continue;
var wy = 1.5 + f2 * 3.2;
dlnBox(g, 0.8, 1.1, 0.06, dark, wx, wy, d / 2 + 0.03);
if (!lite) {
for (var br = 0; br < 3; br++)
dlnBox(g, 0.04, 1.1, 0.04, dlnC(0x3A3430), wx - 0.25 + br * 0.25, wy, d / 2 + 0.07);
dlnBox(g, 0.36, 1.12, 0.04, wood, wx - 0.6, wy, d / 2 + 0.05);
dlnBox(g, 0.36, 1.12, 0.04, wood, wx + 0.6, wy, d / 2 + 0.05);
}
dlnBox(g, 0.8, 1.1, 0.06, dark, wx, wy, -d / 2 - 0.03);
}
if (st > 1 && (o.seed % 2 === 0) && !lite) {
var jx = w > 8 ? -w / 4 : 0, jy = 3.2 + 1.4, J = new THREE.Group();
J.position.set(jx, jy, d / 2 + 0.5);
g.add(J);
dlnBox(J, 1.8, 0.18, 1.0, ledge, 0, -0.9, 0);
dlnBox(J, 1.8, 0.7, 0.08, ledge, 0, -0.5, 0.46);
for (var jc = 0; jc < 4; jc++)
dlnBox(J, 0.1, 1.2, 0.1, ledge, -0.8 + jc * 0.53, 0.2, 0.46);
dlnBox(J, 1.4, 1.0, 0.05, dark, 0, 0.25, 0.1);
var jr = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 2.0, 12, 1, false, 0, Math.PI), ledge);
jr.rotation.z = Math.PI / 2;
jr.scale.set(1, 1, 0.55);
jr.position.set(0, 0.9, 0);
J.add(jr);
}
if (o.shop) {
dlnBox(g, w - 0.8, 2.4, 0.06, dlnC(0x2A221A), 0, 1.5, d / 2 + 0.03);
dlnBox(g, w - 0.6, 0.5, 1.4, ledge, 0, 0.25, d / 2 + 0.7);
var aw = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.4, 2.2), dlnC(o.awn || 0xC8642A));
aw.material.side = THREE.DoubleSide;
aw.rotation.x = -Math.PI / 2 + 0.35;
aw.position.set(0, 2.85, d / 2 + 1.05);
g.add(aw);
if (!lite) {
var gc = [0xC84A2A, 0xE8B040, 0x7A5A2A, 0x4A6A2A, 0xD87A3A, 0xE8E0C8];
for (var k = 0; k < Math.round(w / 1.2); k++) {
var gx = -w / 2 + 0.9 + k * 1.15, kd = k % 3;
if (kd === 0) {
var cn = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.4, 10), dlnC(gc[(o.seed + k) % gc.length]));
cn.position.set(gx, 0.7, d / 2 + 0.7);
g.add(cn);
}
else if (kd === 1)
dlnCyl(g, 0.26, 0.2, 0.4, dlnS("redbrick", 0xB86A44), gx, 0.7, d / 2 + 0.7, 10);
else
dlnBox(g, 0.7, 0.24, 0.5, dlnS("oak", 0x8A6A3A), gx, 0.62, d / 2 + 0.7);
}
}
}
var sw = ry && Math.abs(Math.sin(ry)) > 0.7;
shkSolidBox(sjX(x), sjZ(z), sw ? d + 0.4 : w + 0.4, sw ? w + 0.4 : d + 0.4, 0);
return g;
},
function (P, R) {
var cols = [0xF2ECDC, 0xEAD8B0, 0xE8C890, 0xF0D0C0, 0xC8D4E0, 0xE4D8C8, 0xD8B890], awns = [0xC8642A, 0xB83A2A, 0x2A6A8A, 0xD8A030, 0x6A3A7A, 0x3A7A4A], n = 0, lite = SXU.lite;
var road = SXU_ROADS[0], free = function (x, z, r) { if (sjLineD(road, x, z).d < 5 + r)
return false; for (var k in SXU_PLACES) {
var Q = SXU_PLACES[k];
if (Math.hypot(Q.x - x, Q.z - z) < 12 + r)
return false;
} return sjH(x, z) > 1.2 && Math.abs(sjH(x + r, z) - sjH(x - r, z)) < 2.5; };
for (var t = 0.02; t < 0.98; t += lite ? 0.07 : 0.035) {
var i = Math.min(road.length - 2, Math.floor(t * (road.length - 1))), u = t * (road.length - 1) - i, a = road[i], b = road[i + 1];
if (a[0] > -940)
break;
var px = a[0] + (b[0] - a[0]) * u, pz = a[1] + (b[1] - a[1]) * u, dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), nx = -dz / l, nz = dx / l, ry = Math.atan2(dx, dz);
[-1, 1].forEach(function (sd) {
var w = 6 + R() * 3, d = 8, hx = px + nx * sd * (9 + d / 2), hz = pz + nz * sd * (9 + d / 2);
if (sjLineD(road, hx, hz).d < 5 + d / 2 - 1 || sjH(hx, hz) < 1.2)
return;
var bad = false;
for (var k in SXU_PLACES) {
var Q = SXU_PLACES[k];
if (Math.hypot(Q.x - hx, Q.z - hz) < 14)
bad = true;
}
if (bad)
return;
sjIndHouse(P, hx, hz, ry + (sd < 0 ? Math.PI : 0) + Math.PI / 2, { w: w, d: d, st: R() < 0.6 ? 2 : 3, col: cols[(n++) % cols.length], shop: R() < 0.8, awn: awns[(R() * awns.length) | 0], seed: n, red: R() < 0.15 });
});
}
for (var lz = 340; lz < 700; lz += 26) {
for (var lx = -1236; lx < -930; lx += 0) {
var w = 6 + R() * 4, d = 8;
lx += w / 2;
if (((lx + 1236) / 40 | 0) % 3 === 2 && R() < 0.5) {
lx += 6;
continue;
}
if (free(lx, lz, 6) && (!lite || R() < 0.35))
sjIndHouse(P, lx, lz, 0, { w: w, d: d, st: R() < 0.5 ? 2 : (R() < 0.6 ? 1 : 3), col: cols[(n++) % cols.length], seed: n, red: R() < 0.12 });
lx += w / 2 + 0.4;
if (free(lx, lz + d + 5, 6) && R() < 0.3 && !lite) {
var ty = sjH(lx, lz + d + 5);
dlnCyl(P, 0.25, 0.35, 3.4, dlnS("planebark", 0x5A4A3A), sjX(lx), ty + 1.7, sjZ(lz + d + 5), 8);
var cr = new THREE.Mesh(sjCrownGeo(31 + n, 4), new THREE.MeshLambertMaterial({ color: 0x4A6A2E }));
cr.scale.set(3, 2.2, 3);
cr.position.set(sjX(lx), ty + 4.6, sjZ(lz + d + 5));
P.add(cr);
shkSolid({ x: sjX(lx), z: sjZ(lz + d + 5), r: 0.5 });
}
}
}
if (!lite)
for (var q = 0; q < 14; q++) {
var qx = -1220 + R() * 280, qz = 350 + R() * 340;
if (!free(qx, qz, 3))
continue;
var qy = sjH(qx, qz), kd = q % 3;
if (kd === 0) {
dlnCyl(P, 1.3, 1.4, 0.9, dlnS("stone", 0xB8A888), sjX(qx), qy + 0.45, sjZ(qz), 16);
var wt = new THREE.Mesh(new THREE.CircleGeometry(1.1, 16), dlnC(0x1A2420));
wt.rotation.x = -Math.PI / 2;
wt.position.set(sjX(qx), qy + 0.86, sjZ(qz));
P.add(wt);
[-1.2, 1.2].forEach(function (o2) { dlnBox(P, 0.2, 2.2, 0.2, dlnS("oak", 0x5A4630), sjX(qx + o2), qy + 1.1, sjZ(qz)); });
dlnBox(P, 2.6, 0.16, 0.16, dlnS("oak", 0x5A4630), sjX(qx), qy + 2.2, sjZ(qz));
shkSolid({ x: sjX(qx), z: sjZ(qz), r: 1.5 });
}
else if (kd === 1) {
var cg = new THREE.Group();
cg.position.set(sjX(qx), qy, sjZ(qz));
cg.rotation.y = R() * 6;
P.add(cg);
dlnBox(cg, 1.6, 0.15, 2.6, dlnS("oak", 0x7A5A3A), 0, 0.9, 0);
[-0.95, 0.95].forEach(function (o3) { var wh = dlnCyl(cg, 0.75, 0.75, 0.12, dlnS("oak", 0x5A4030), o3, 0.75, 0, 14); wh.rotation.z = Math.PI / 2; });
dlnBox(cg, 0.1, 0.1, 2.6, dlnS("oak", 0x7A5A3A), -0.3, 0.85, -2.4);
dlnBox(cg, 0.1, 0.1, 2.6, dlnS("oak", 0x7A5A3A), 0.3, 0.85, -2.4);
shkSolid({ x: sjX(qx), z: sjZ(qz), r: 1.4 });
}
else {
var cp = new THREE.Group();
cp.position.set(sjX(qx), qy, sjZ(qz));
cp.rotation.y = R() * 6;
P.add(cp);
dlnBox(cp, 0.9, 0.08, 1.9, dlnS("oak", 0xC8B48A), 0, 0.45, 0);
for (var lg = 0; lg < 4; lg++)
dlnBox(cp, 0.08, 0.45, 0.08, dlnS("oak", 0x5A4030), lg % 2 ? 0.4 : -0.4, 0.22, lg < 2 ? 0.9 : -0.9);
for (var pt = 0; pt < 3; pt++) {
var pot = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), dlnS("redbrick", 0xB0603A));
pot.scale.y = 0.9;
pot.position.set(1.0, 0.26, -0.5 + pt * 0.5);
cp.add(pot);
}
}
}
var M = SXU_SITE.muttra;
sjHouse(P, M.x, M.z, 0, { kind: "plaster", w: 18, d: 10, porch: 1, y: SXU_FLAT[2].h, seed: 3 });
for (var v = 0; v < 4; v++) {
var vx = M.x - 20 + v * 10, vz = M.z + 26;
dlnBox(P, 8, 1.2, 6, dlnS("stone", 0xB8A888), sjX(vx), SXU_FLAT[2].h + 0.6, sjZ(vz));
var wv = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 5.2), dlnC(0x2A3A7A));
wv.rotation.x = -Math.PI / 2;
wv.position.set(sjX(vx), SXU_FLAT[2].h + 1.15, sjZ(vz));
P.add(wv);
shkSolidBox(sjX(vx), sjZ(vz), 8, 6, 0);
}
sxSpotM(M.x, M.z + 16, 3, "Abel White's plantation", "look about", function () { sxTale("🌿 The indigo plantation", ["Small was overseer on Abel White's indigo plantation near Muttra: the indigo plant cut and steeped in great vats until the water ran blue, then beaten and dried to the dark cakes of dye."]); });
},
function (P, R) {
var B = SXU_SITE.blair, y = SXU_FLAT[1].h;
var O = SXU_SITE.bung, g = new THREE.Group();
g.position.set(sjX(O.x), y + 0.9, sjZ(O.z));
P.add(g);
var w = 22, d = 12, wall = sjMat("sxplaster", 512, 512, sjPlasterTex(), 0.25);
for (var p = 0; p < 10; p++)
dlnBox(g, 0.3, 1.0, 0.3, dlnS("oak", 0x5A4630), -w / 2 + 0.5 + (p % 5) * (w - 1) / 4, -0.4, p < 5 ? -d / 2 : d / 2 + 2.6);
dlnBox(g, w, 3.4, d, wall, 0, 1.7, 0);
dlnBox(g, w, 0.2, 3, dlnS("oak", 0x7A6040), 0, 0, d / 2 + 1.5);
dlnGable(g, w + 3, d + 5, 3.2, sjThatch(), 0, 3.4, 1.2);
for (var c = 0; c < 6; c++)
dlnBox(g, 0.2, 3.2, 0.2, dlnS("oak", 0x6A5038), -w / 2 + 1 + c * (w - 2) / 5, 1.6, d / 2 + 2.8);
for (var wi = 0; wi < 5; wi++)
dlnBox(g, 1.4, 1.6, 0.08, wi === 2 ? dlnGlow(0xF0C070) : dlnC(0x2A2A20), -8 + wi * 4, 1.8, d / 2 + 0.04);
shkSolidBox(sjX(O.x), sjZ(O.z), w + 0.4, d + 0.4, 0);
sxDoorM("sx_offq", O.x, O.z + d / 2 + 3.4, "The officers' quarters");
for (var h = 0; h < (SXU.lite ? 6 : 14); h++) {
var hx = SXU_SITE.huts.x - 30 + (h % 7) * 10, hz = SXU_SITE.huts.z + ((h / 7) | 0) * 14;
sjHouse(P, hx, hz, 0, { kind: "wattle", w: 6, d: 5, y: y, seed: h });
}
sxDoorM("sx_hut", SXU_SITE.huts.x + 0, SXU_SITE.huts.z + 2.9, "Jonathan Small's hut");
for (var a = 0; a < (SXU.lite ? 40 : 110); a++) {
var an = a / 110 * 6.28;
if (Math.cos(an) < -0.85)
continue;
var px = B.x + Math.cos(an) * 78, pz = B.z + Math.sin(an) * 78, ph = sjH(px, pz);
dlnCyl(P, 0.16, 0.2, 3.2, dlnS("oak", 0x5A4630), sjX(px), ph + 1.6, sjZ(pz), 5);
}
dlnCyl(P, 0.12, 0.18, 16, dlnS("oak", 0x6A5038), sjX(B.x + 10), y + 8, sjZ(B.z), 6);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), dlnC(0xC82A2A));
fl.material.side = THREE.DoubleSide;
fl.position.set(sjX(B.x + 11.3), y + 15, sjZ(B.z));
P.add(fl);
sjHouse(P, B.x + 20, B.z - 20, Math.PI / 2, { kind: "plaster", w: 9, d: 7, y: y, seed: 5 });
var J = SXU_SITE.jetty, deck = dlnS("oak", 0x7A6A50);
dlnBox(P, 30, 0.3, 4, deck, sjX(J.x - 6), 1.4, sjZ(J.z));
sjDeck(J.x - 6, J.z, 15, 2, 1.55, 0);
for (var pl = 0; pl < 6; pl++)
dlnCyl(P, 0.2, 0.2, 8, dlnS("oak", 0x3A2E22), sjX(J.x - 18 + pl * 5), -2.4, sjZ(J.z + (pl % 2 ? 1.6 : -1.6)), 6);
var sb = sjLaunch({ hull: 0xE8E4D8, house: 0x2A4A6A, L: 9 });
sb.position.set(sjX(J.x - 14), 0.2, sjZ(J.z + 4));
sb.rotation.y = Math.PI / 2;
P.add(sb);
for (var t = 0; t < (SXU.lite ? 10 : 30); t++) {
var sx = SXU_SITE.swamp.x + (R() - 0.5) * 150, sz = SXU_SITE.swamp.z + (R() - 0.5) * 130, sy = sjH(sx, sz);
if (sy < 0.2)
continue;
var tr = dlnCyl(P, 0.2, 0.35, 5 + R() * 4, dlnC(0x6A6458), sjX(sx), sy + 2.5, sjZ(sz), 6);
tr.rotation.z = (R() - 0.5) * 0.3;
}
for (var w2 = 0; w2 < (SXU.lite ? 6 : 16); w2++) {
var wx = SXU_SITE.swamp.x + (R() - 0.5) * 140, wz = SXU_SITE.swamp.z + (R() - 0.5) * 120;
var m = new THREE.Mesh(new THREE.CircleGeometry(4 + R() * 8, 12), dlnShine(0x3A4A30, 0.1, 0.7));
m.rotation.x = -Math.PI / 2;
m.position.set(sjX(wx), sjH(wx, wz) + 0.05, sjZ(wz));
P.add(m);
}
var C = SXU_SITE.canoe, cn = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 6, 10, 1, false, 0, Math.PI), dlnS("oak", 0x6A4A2A));
cn.material.side = THREE.DoubleSide;
cn.rotation.z = Math.PI;
cn.rotation.x = Math.PI / 2;
cn.position.set(sjX(C.x), sjH(C.x, C.z) + 0.5, sjZ(C.z));
P.add(cn);
sxSpotM(B.x, B.z, 3.4, "Blair Island", "look about", function () { sxTale("🌴 Blair Island", SXU_FACTS.andaman); });
sxSpotM(C.x + 3, C.z, 2.6, "The canoe on the beach", "look at it", function () { sxTale("🛶 The canoe", ["A dugout, hollowed from one trunk: in it Small and Tonga got away from the island, and after many days at sea a pilgrim ship took them up."]); });
},
function (R) {
var add = function (seed, who, x, z, ry, o) { var p = sxPerson(seed, who, o); var y = (o && o.y) != null ? o.y : sjH(x, z); p.position.set(sjX(x), y + 0.02, sjZ(z)); p.rotation.y = ry || 0; SHK.live.add(p); var P = { g: p, wander: o && o.wander ? { r: o.wander, sp: 0.4 } : null, ground: y + 0.02 }; if (!(o && o.y != null))
sxMoorGround(P); SHK.people.push(P); return p; };
var named = function (k, x, z, ry, o) { var F = SXL_FOLK[k]; var p = add("sx_" + k, F.dress, x, z, ry, o); SHK.talk.push({ p: { g: p }, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: "Good day to you." } }); };
var W = SXU_PLACES.wwharf;
for (var i = 0; i < (SXU.lite ? 2 : 5); i++)
add("sxww" + i, ["wcwork", "wcporter", "police"][i % 3], W.x - 8 + i * 4, W.z - 4, R() * 6.28, { y: 3.3, wander: 3 });
var J = SXU_SITE.jacob;
for (var j = 0; j < (SXU.lite ? 2 : 5); j++)
add("sxjy" + j, ["wcwork", "wcwork", "jkshop"][j % 3], J.x - 10 + j * 5, J.z + 10, R() * 6.28, { wander: 6 });
var y = SXU_FLAT[0].h;
for (var f = 0; f < (SXU.lite ? 8 : 24); f++) {
var k = f % 4;
add("sxft" + f, k === 0 ? "sxsmally" : k === 1 ? "sxsikh" : k === 2 ? "sxmerch" : "sxofficer", -840 + R() * 280, 360 + R() * 220, R() * 6.28, { y: y, wander: 14 });
}
named("sepoy", -560, 500, Math.PI / 2, { y: y, wander: 6 });
named("trader", -700, 420, 0, { y: y, wander: 10 });
for (var t = 0; t < (SXU.lite ? 6 : 16); t++)
add("sxtw" + t, t % 3 === 0 ? "sxmerch" : "sxsikh", -1200 + R() * 260, 340 + R() * 340, R() * 6.28, { wander: 12 });
var B = SXU_SITE.blair, by = SXU_FLAT[1].h;
for (var c = 0; c < (SXU.lite ? 6 : 18); c++)
add("sxcv" + c, c % 5 === 0 ? "sxwarder" : "sxconv", B.x - 40 + R() * 90, B.z - 30 + R() * 100, R() * 6.28, { y: by, wander: 10 });
named("warder", B.x + 6, B.z + 10, 0, { y: by, wander: 8 });
named("convict", B.x + 40, B.z + 60, 0, { y: by, wander: 8 });
},
function () {
if (SXL.built || !SHK.G)
return;
DLN.lite = SXL.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1888), live0 = SHK.live;
SXL.live = new THREE.Group();
SXL.live.name = "sx-live";
SHK.G.add(SXL.live);
SXL.move = [];
sxBuildPieces([["sx-nw", [sxGroundLdn, sxLdnHouses, sxPondicherry, sxBrixton, sxLambeth, sxLdnThings], sxX(0), sxZ(-130), 760]], R, SXL.live);
try {
sxLdnTraffic();
}
catch (e) {
if (window.console)
console.warn("[sign] traffic", e);
}
try {
sxLdnFolk(R);
}
catch (e) {
if (window.console)
console.warn("[sign] folk", e);
}
SHK.live = live0;
SXL.built = true;
},
function () {
if (SXU.built || !SHK.G)
return;
DLN.lite = SXU.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1857), live0 = SHK.live;
SXU.live = new THREE.Group();
SXU.live.name = "sx-far-live";
SHK.G.add(SXU.live);
SXU_DECKS.length = 0;
sxBuildPieces([["sx-ground", [sjLandAll], sjX(0), sjZ(0), 2700], ["sx-river", [sxQuays, sjQuayWalk, sxWharves, sxWestminster, sxTower, sxJacobson, sxShipping, sxGreenwich, sxWoolwich, sxMarsh], sjX(0), sjZ(-560), 1400], ["sx-agra", [sxFort, sxAgraTown], sjX(-800), sjZ(520), 560], ["sx-isle", [sxBlair], sjX(500), sjZ(560), 400]], R, SXU.live);
try {
sxLaunchMake();
}
catch (e) {
if (window.console)
console.warn("[sign] launch", e);
}
try {
sxFarFolk(R);
}
catch (e) {
if (window.console)
console.warn("[sign] folk", e);
}
SHK.live = live0;
SXU.built = true;
},
function (kind) {
if (SX_PAPERS[kind])
return SX_PAPERS[kind];
var P = SX_PAPER_DEF[kind];
var t = wTex(P.w || 256, P.h || 256, P.f);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(P.rx || 1, P.ry || 1);
if (t.anisotropy !== undefined)
t.anisotropy = 4;
var m = new THREE.MeshLambertMaterial({ map: t, color: P.col || 0xFFFFFF });
m.userData.ctn = 1;
return (SX_PAPERS[kind] = m);
},
function (x, W, H) {
var R = wRand(141);
x.fillStyle = "#5A2A1A";
x.fillRect(0, 0, W, H);
for (var c = 0; c < W; c += 64) {
var g = x.createLinearGradient(c, 0, c + 64, 0);
g.addColorStop(0, "#3A160E");
g.addColorStop(0.5, "#8A4A22");
g.addColorStop(1, "#3A160E");
x.fillStyle = g;
x.fillRect(c, 0, 64, H);
for (var y = 10; y < H; y += 40) {
x.fillStyle = "#C8983A";
x.beginPath();
x.moveTo(c + 32, y);
x.lineTo(c + 46, y + 14);
x.lineTo(c + 32, y + 28);
x.lineTo(c + 18, y + 14);
x.closePath();
x.fill();
x.fillStyle = "#1A1A2A";
x.beginPath();
x.arc(c + 32, y + 14, 5, 0, 7);
x.fill();
}
}
x.fillStyle = "#C8983A";
x.fillRect(0, 0, W, 6);
x.fillRect(0, H - 6, W, 6);
for (var i = 0; i < 200; i++) {
x.fillStyle = "rgba(255,220,150," + (R() * 0.06) + ")";
x.fillRect(R() * W, R() * H, 1, 6);
}
},
function (x, W, H) {
x.fillStyle = "#6A1A1A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C89848";
x.lineWidth = 6;
x.strokeRect(12, 12, W - 24, H - 24);
x.fillStyle = "#1E2A4A";
x.fillRect(30, 30, W - 60, H - 60);
for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++) {
var cx = 48 + c * (W - 96) / 3, cy = 48 + r * (H - 96) / 3;
x.fillStyle = "#C89848";
x.beginPath();
for (var a = 0; a < 8; a++) {
var rr = a % 2 ? 6 : 14;
x.lineTo(cx + Math.cos(a * 0.785) * rr, cy + Math.sin(a * 0.785) * rr);
}
x.fill();
}
},
function (x, W, H) {
var R = wRand(142);
x.fillStyle = "#6A6A4A";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 5; r++)
for (var c = 0; c < 4; c++) {
var cx = c * 64 + 32 + (r % 2) * 32, cy = r * 52 + 26;
x.strokeStyle = "rgba(200,180,120,.5)";
x.lineWidth = 2;
x.beginPath();
x.ellipse(cx, cy, 14, 22, 0, 0, 7);
x.stroke();
x.fillStyle = "rgba(150,60,40,.5)";
x.beginPath();
x.arc(cx, cy, 5, 0, 7);
x.fill();
}
for (var m = 0; m < 10; m++) {
var mx = R() * W, my = R() * H, mr = 10 + R() * 30, gr = x.createRadialGradient(mx, my, 0, mx, my, mr);
gr.addColorStop(0, "rgba(40,40,20,.3)");
gr.addColorStop(1, "rgba(40,40,20,0)");
x.fillStyle = gr;
x.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
}
},
function (x, W, H) {
var R = wRand(143);
x.fillStyle = "#B8AC94";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 9) {
x.fillStyle = "rgb(" + (120 + (R() * 30 | 0)) + "," + (96 + (R() * 20 | 0)) + ",70)";
x.fillRect(0, y, W, 6);
}
for (var p = 0; p < 6; p++) {
x.fillStyle = "#D8D0BC";
x.fillRect(R() * W, R() * H, 30 + R() * 60, 20 + R() * 40);
}
for (var i = 0; i < 2000; i++) {
x.fillStyle = "rgba(80,70,60," + (R() * 0.15) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
},
function (x, W, H) { x.fillStyle = "#2A1E18"; x.fillRect(0, 0, W, H); for (var r = 0; r < H; r += 32)
for (var c = (r / 32) % 2 * 16; c < W; c += 32) {
var g = x.createRadialGradient(c + 16, r + 16, 1, c + 16, r + 16, 18);
g.addColorStop(0, "#5A4232");
g.addColorStop(1, "#20160E");
x.fillStyle = g;
x.fillRect(c, r, 32, 32);
x.fillStyle = "#120C08";
x.beginPath();
x.arc(c + 16, r + 16, 2.5, 0, 7);
x.fill();
} },
function (seed, who, x, y, z, ry, o) {
o = o || {};
var p = sxPerson(seed, who, { sex: o.sex, inside: true, child: o.child });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.35 } : null };
SHK.people.push(P);
var T = null;
if (o.name) {
T = { p: P, name: o.name, r: o.r || 2.8, t: { name: o.name, persona: o.persona || SXL_ERA, greet: o.greet || "Good day to you." } };
SHK.talk.push(T);
}
SXL.home.push({ P: P, T: T, on: true, room: o.room });
return P;
},
function (g, x, z, ry, R, o) {
o = o || {};
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry || 0;
g.add(b);
var deal = dlnS("oak", 0xA89068), glass = new THREE.MeshLambertMaterial({ color: 0xC8E0E8, transparent: true, opacity: 0.55 }), w = o.w || 4;
dlnBox(b, w, 0.08, 1.2, dlnC(0x2A2A2A), 0, 0.92, 0);
dlnBox(b, w, 0.86, 1.1, deal, 0, 0.45, 0);
for (var i = 0; i < (SHK.lite ? 4 : 10); i++) {
var bx = -w / 2 + 0.3 + R() * (w - 0.6), bz = -0.4 + R() * 0.8, k = R();
if (k < 0.4) {
dlnCyl(b, 0.05, 0.05, 0.22, glass, bx, 1.07, bz, 8);
dlnCyl(b, 0.045, 0.045, 0.08, dlnC([0xC83A2A, 0x3A8A4A, 0xE8D040, 0x6A3A8A, 0x2A5AA8][(R() * 5) | 0]), bx, 1.0, bz, 8);
}
else if (k < 0.7) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), glass);
fl.position.set(bx, 1.06, bz);
b.add(fl);
dlnCyl(b, 0.02, 0.03, 0.18, glass, bx, 1.2, bz, 6);
}
else {
var rt = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), glass);
rt.position.set(bx, 1.08, bz);
b.add(rt);
var nk = dlnCyl(b, 0.015, 0.025, 0.3, glass, bx + 0.12, 1.16, bz, 6);
nk.rotation.z = -1.0;
}
}
dlnBox(b, 0.4, 0.12, 0.14, deal, w / 2 - 0.5, 1.02, -0.3);
for (var t = 0; t < 6; t++)
dlnCyl(b, 0.012, 0.012, 0.16, glass, w / 2 - 0.66 + t * 0.064, 1.12, -0.3, 6);
dlnCyl(b, 0.04, 0.06, 0.16, dlnShine(0x6A5A3A, 0.4, 0.7), w / 2 - 0.9, 1.04, 0.25, 8);
var fl2 = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 8), dlnGlow(0x5A8AFF));
fl2.position.set(w / 2 - 0.9, 1.18, 0.25);
b.add(fl2);
shkSolidBox(x, z, Math.abs(Math.sin(ry || 0)) > 0.7 ? 1.3 : w + 0.1, Math.abs(Math.sin(ry || 0)) > 0.7 ? w + 0.1 : 1.3, 0);
return b;
},
function (g, x, z, ry, who) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
c.userData.still = who;
c.visible = false;
g.add(c);
var sheet = dlnC(0xE8E4DA);
dlnBox(c, 0.7, 0.5, 0.7, sheet, 0, 0.7, 0);
var tor = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.8, 10), sheet);
tor.position.set(0, 1.3, -0.1);
c.add(tor);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), sheet);
hd.position.set(0.04, 1.82, -0.08);
c.add(hd);
dlnBox(c, 0.8, 0.02, 0.4, sheet, 0, 0.3, 0.4);
return c;
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8, brass = dlnShine(0xC8A048, 0.3, 0.85);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x4A2A1A), wall: sxPaper("eastern"), h: h, ceil: dlnC(0x2A1A12), outName: "Out to the street", out: sxOutL("thad") });
dlnPlane(g, Rm.hw * 2 - 1.4, Rm.hd * 2 - 2.4, sxPaper("carpet"), cx, 0.02, cz - 0.6);
for (var t = 0; t < 2; t++) {
var tg = new THREE.Mesh(new THREE.CircleGeometry(1, 16), new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (c, W, H) { c.fillStyle = "#D8902A"; c.fillRect(0, 0, W, H); c.strokeStyle = "#1A1208"; c.lineWidth = 5; for (var s = 0; s < 9; s++) {
c.beginPath();
c.moveTo(s * 16, 0);
c.bezierCurveTo(s * 16 + 12, 40, s * 16 - 10, 80, s * 16 + 6, H);
c.stroke();
} }) }));
tg.rotation.x = -Math.PI / 2;
tg.scale.set(1.4, 0.8, 1);
tg.position.set(cx + (t ? 1.8 : -1.6), 0.04, cz + (t ? 1.2 : -2.6));
g.add(tg);
}
var hk = new THREE.Group();
hk.position.set(cx - 2.2, 0, cz - 0.6);
g.add(hk);
dlnCyl(hk, 0.22, 0.3, 0.4, brass, 0, 0.2, 0, 14);
var bowl = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 10), new THREE.MeshLambertMaterial({ color: 0x4A7A9A, transparent: true, opacity: 0.7 }));
bowl.position.y = 0.55;
hk.add(bowl);
dlnCyl(hk, 0.04, 0.05, 0.7, brass, 0, 1.1, 0, 8);
dlnCyl(hk, 0.12, 0.06, 0.12, brass, 0, 1.5, 0, 10);
var tube = dlnCyl(hk, 0.025, 0.025, 1.4, dlnC(0x6A2A2A), 0.5, 0.55, 0.2, 6);
tube.rotation.z = 1.2;
var lamp = new THREE.Group();
lamp.position.set(cx, h - 1.0, cz - 1);
g.add(lamp);
var dv = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), dlnShine(0xD8D8E0, 0.25, 0.9));
dv.scale.set(1.6, 0.8, 0.9);
lamp.add(dv);
dlnCyl(lamp, 0.005, 0.005, 1.0, brass, 0, 0.5, 0, 4);
var lg = new THREE.PointLight(0xFFB070, 0.9, 9);
lg.position.y = -0.2;
lamp.add(lg);
n14Sofa(g, cx + Rm.hw - 0.8, cz - 1.4, -Math.PI / 2, 0x8A2A1A);
n14Sofa(g, cx - Rm.hw + 0.8, cz + 1.2, Math.PI / 2, 0x2A3A6A);
for (var q = 0; q < 6; q++)
dlnBox(g, 0.5, 0.18, 0.5, dlnC([0xC89848, 0x8A2A1A, 0x2A5A4A][q % 3]), cx - 1.0 + q * 0.45, 0.09, cz + 0.4 + (q % 2) * 0.4);
n14Table(g, cx + 0.4, cz - 0.8, 1.0, 0.7, 0.5, dlnShine(0x2A1A10, 0.4, 0.2), null);
dlnCyl(g, 0.06, 0.08, 0.12, brass, cx + 0.4, 0.56, cz - 0.8, 10);
n14Pic(g, cx - 2.6, 2.2, cz - Rm.hd + 0.06, 0, 1.4, 1.0, ["#8AA0A8", "#5A6A4A"]);
n14Pic(g, cx, 2.2, cz - Rm.hd + 0.06, 0, 1.0, 1.3, ["#E8C8B0", "#6A8AA8"]);
n14Pic(g, cx + 2.6, 2.2, cz - Rm.hd + 0.06, 0, 1.4, 1.0, ["#4A4A3A", "#2A2A22"]);
shkSpot(cx - 2.2, cz + 0.2, 1.5, "The hookah", "look at it", function () { sxTale("🪔 The hookah", ["A great hookah in the Eastern style, its bowl of rose-water bubbling as Mr Sholto draws on it: the room fills with the strange, aromatic smoke."]); });
shkSpot(cx, cz - Rm.hd + 1.2, 1.6, "Thaddeus's pictures", "look at them", function () { sxTale("🖼️ The pictures", ["'That is a Corot,' says Mr Sholto, 'and though a connoisseur might perhaps throw a doubt upon that Salvator Rosa, there cannot be the least question about the Bouguereau. I am partial to the modern French school.'"]); });
shkSpot(cx + 1.8, cz + 1.2, 1.4, "The tiger-skins", "look", function () { sxTale("🐅 The tiger-skins", ["'Two great tiger-skins thrown athwart it increased the suggestion of Eastern luxury.' The carpet beneath is of amber and black, so soft that the foot sinks into it 'as into a bed of moss'."]); });
shkSpot(cx, cz - 1, 1.4, "The silver lamp", "look up", function () { sxTale("🕊️ The silver lamp", ["A lamp in the fashion of a silver dove, hung from an almost invisible golden wire in the centre of the room: it fills the air with a subtle, aromatic odour."]); });
sxHome("sx_tserv", "sxmerch", cx + 1.6, 0.02, cz + Rm.hd - 2.4, Math.PI, { name: "Mr Sholto's servant", persona: "You are the servant of Mr Thaddeus Sholto at his house in Brixton in 1888, in the world of Conan Doyle's The Sign of the Four (the book only): a man from India, quiet, dignified and courteous, in a yellow turban, white loose clothes and a yellow sash; you speak little English and say little. " + SXL_ERA, greet: "The sahib awaits you.", room: "sx_thad" });
Rm.hello = "<b>Thaddeus Sholto's sitting-room.</b> 'An oasis of art in the howling desert of South London': amber and black hangings, tiger-skins, a hookah, and a silver lamp like a dove.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 4.6, oak = dlnShine(0x3A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xA89C88), wall: sxPaper("pondi"), low: oak, lowH: 1.4, h: h, ceil: dlnC(0xD8D0C0), outName: "Out to the grounds", out: sxOutL("pdoor") });
for (var s = 0; s < 16; s++)
dlnBox(g, 1.8, 0.2, 0.32, oak, cx + Rm.hw - 1.2, 0.1 + s * 0.26, cz - Rm.hd + 6 - s * 0.3);
dlnBox(g, 0.08, 1.0, 5, oak, cx + Rm.hw - 2.2, 2.6, cz - Rm.hd + 3.6);
n14Table(g, cx - Rm.hw + 1.0, cz - 1, 0.8, 1.6, 0.86, oak, null);
var hl = dlnCyl(g, 0.12, 0.14, 0.36, dlnShine(0xC8A048, 0.3, 0.8), cx - Rm.hw + 1.0, 1.06, cz - 1, 10);
dlnCyl(g, 0.1, 0.1, 0.18, dlnGlow(0xFFD890), cx - Rm.hw + 1.0, 1.3, cz - 1, 10);
dlnPortrait(g, cx - Rm.hw + 0.1, 2.8, cz + 2, Math.PI / 2, "Major John Sholto", "34th Bombay Infantry", 0x2A2A1A);
sxLinks("sx_phall", cx, cz, Rm, { sx_pbart: { x: Rm.hw - 1.2, z: -Rm.hd + 1.8 }, sx_pmajor: { x: -Rm.hw + 1.2, z: -Rm.hd + 2.4 } });
shkSpot(cx - Rm.hw + 1.6, cz - 1, 1.5, "The hall lamp", "look", function () { sxTale("🪔 The hall lamp", ["Mrs Bernstone's lamp, on the hall table: the only light in the house, besides the one high up under the roof where Mr Bartholomew sits."]); });
shkSpot(cx - Rm.hw + 1.4, cz + 2, 1.4, "The Major's portrait", "look at it", function () { sxTale("🎖️ Major John Sholto", ["Late of the Indian Army: he came home in 1878 with 'a considerable sum of money, a large collection of valuable curiosities, and a staff of native servants', and lived at Pondicherry Lodge in great luxury and great fear. He was afraid of men with wooden legs."]); });
sxHome("sx_bern", "landlady", cx - 1.2, 0.02, cz + 1.0, 0.4, { name: "Mrs Bernstone", persona: SX_BERN, greet: "Oh, sir, I am so glad you have come!", room: "sx_phall", sex: "f" });
Rm.hello = "<b>Pondicherry Lodge: the hall.</b> Dark oak, the Major's portrait, one lamp. The stair goes up into darkness.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: dlnS("stone", 0xD8D0C0), h: h, ceil: dlnC(0xC8C0B0), outName: "Down to the hall", out: sxRm("sx_phall") });
sxLabBench(g, cx - Rm.hw + 0.8, cz - 1.4, Math.PI / 2, R, { w: 4.0 });
sxLabBench(g, cx + Rm.hw - 0.8, cz - 0.8, -Math.PI / 2, R, { w: 3.4 });
for (var c = 0; c < 4; c++) {
var cb = new THREE.Group();
cb.position.set(cx - 1.6 + c * 0.9, 0, cz - Rm.hd + 0.8);
g.add(cb);
dlnCyl(cb, 0.32, 0.34, 0.7, dlnS("oak", 0xA88A50), 0, 0.35, 0, 10);
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), new THREE.MeshLambertMaterial({ color: c === 2 ? 0x6A4A2A : 0xC8D8C0, transparent: true, opacity: 0.6 }));
gl.position.y = 0.8;
cb.add(gl);
if (c === 2) {
cb.rotation.z = 1.2;
cb.position.y = 0.3;
}
}
var spill = new THREE.Mesh(new THREE.CircleGeometry(0.9, 16), dlnShine(0x2A1A0A, 0.2, 0.1));
spill.rotation.x = -Math.PI / 2;
spill.scale.set(1.4, 1, 1);
spill.position.set(cx + 0.4, 0.025, cz - Rm.hd + 1.8);
g.add(spill);
sxWinR(g, cx + Rm.hw - 0.05, 1.8, cz + 2.4, 1.0, 1.4, -Math.PI / 2, true);
n14Chair(g, cx, cz - 0.6, Math.PI, dlnS("oak", 0x6A4A2A), 0x3A2A1A);
sxSeatStill(g, cx, cz - 0.6, Math.PI, "bart");
n14Table(g, cx + 1.2, cz - 0.4, 1.0, 0.7, 0.8, dlnS("oak", 0x6A4A2A), null);
sxLinks("sx_pbart", cx, cz, Rm, { sx_phall: { x: -Rm.hw + 1.2, z: Rm.hd - 2.6 }, sx_pattic: { x: Rm.hw - 1.2, z: -Rm.hd + 1.6 } });
dlnBox(g, 1.0, 0.06, 1.0, dlnS("oak", 0x5A4030), cx + Rm.hw - 1.4, h - 0.03, cz - Rm.hd + 1.6);
shkSpot(cx + Rm.hw - 1.0, cz + 2.4, 1.4, "The open window", "look out", function () { sxTale("🪟 The window", ["Sixty feet above the ground, no water-pipe near: and on the sill, the round muddy mark of a wooden stump, and beside it the print of a boot with a broad iron heel. A stout rope hangs from a hook beside the window and trails down."]); });
shkSpot(cx + 0.4, cz - Rm.hd + 2.4, 1.4, "The broken carboy", "look at it", function () { sxTale("🧴 The carboy", ["One of the great glass carboys in its wicker basket has cracked, and a dark fluid has trickled out: creosote. Its smell fills the room. Someone has stepped in it."]); });
shkSpot(cx + 1.2, cz + 0.4, 1.4, "The stone-headed stick", "look at it", function () { sxTale("🪨 A curious instrument", ["On the table: 'a brown, close-grained stick, with a stone head like a hammer, rudely lashed on with coarse twine'."]); });
shkSpot(cx, cz + 0.6, 1.4, "Bartholomew Sholto", "look", function () { sxTale("🪑 In the chair", ["He sits in the wooden arm-chair, stiff and cold, his face set in a terrible fixed smile. He has been dead many hours. Holmes, gently: 'Look here!' At the edge of the ear, a long dark thorn."]); });
Rm.hello = "<b>Bartholomew Sholto's room.</b> A chemical laboratory: benches of bottles, great carboys in wicker, one cracked. The window stands open; above, a trap-door to the garret.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A7458), wall: sxPaper("laths"), h: h, ceil: dlnC(0x6A5A44), outName: "Down through the trap-door", out: sxRm("sx_pbart") });
for (var r = 0; r < 7; r++) {
var rf = dlnBox(g, Rm.hw * 2, 0.16, 0.14, dlnS("oak", 0x5A4630), cx, h - 0.4, cz - Rm.hd + 0.8 + r * (Rm.hd * 2 - 1.6) / 6);
rf.rotation.z = 0.02;
}
for (var j = 0; j < 10; j++)
dlnBox(g, 0.14, 0.18, Rm.hd * 2, dlnS("oak", 0x5A4630), cx - Rm.hw + 0.4 + j * (Rm.hw * 2 - 0.8) / 9, 0.09, cz);
dlnBox(g, 1.4, 1.4, 0.1, dlnS("oak", 0x3A2A1A), cx - Rm.hw + 0.06 + 0.8, 0.7, cz - Rm.hd + 0.06);
dlnBox(g, 1.2, 1.2, 0.6, dlnC(0x14100C), cx - Rm.hw + 0.8, 0.6, cz - Rm.hd + 0.35);
var sk = dlnBox(g, 1.1, 0.06, 1.1, dlnGlow(0x6A7A8A), cx + 1, h - 0.02, cz - 2);
for (var f = 0; f < 16; f++) {
var fp = new THREE.Mesh(new THREE.CircleGeometry(0.06, 8), dlnC(0x4A3E30));
fp.rotation.x = -Math.PI / 2;
fp.scale.set(0.8, 1.6, 1);
fp.position.set(cx - 0.6 + f * 0.12 + (f % 2 ? 0.1 : -0.1), 0.2, cz - 1 + f * 0.12);
g.add(fp);
}
shkSpot(cx - Rm.hw + 1.2, cz - Rm.hd + 1.4, 1.4, "The recess", "look in", function () { sxTale("🕳️ The recess", ["A little room hidden behind the lath and plaster, seven feet by six: here the treasure lay all those years, until Bartholomew sounded the walls and measured the house and found a few feet of height missing. It is empty."]); });
shkSpot(cx + 1, cz - 2, 1.4, "The trap-door in the roof", "look up", function () { sxTale("🌙 The trap-door in the roof", ["A small trap-door opening on to the roof. It is open. 'This is the way he got in.'"]); });
shkSpot(cx, cz - 0.2, 1.4, "The footprints in the dust", "look closely", function () { sxTale("👣 In the dust", ["Clear, well-defined, perfectly formed: the prints of a naked foot. But not half the size of a grown man's."]); });
Rm.hello = "<b>The garret.</b> Rafters, laths, dust thick on the joists; a hidden recess with its door open; a trap-door in the roof.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.8;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A4A30), wall: sxPaper("major"), h: h, ceil: dlnC(0xE0DAC8), outName: "Back to the hall", out: sxRm("sx_phall") });
jkBed(g, cx - Rm.hw + 1.3, cz - Rm.hd + 1.6, 0, 0xE8E2D2);
dlnBox(g, 0.7, 0.8, 0.5, dlnShine(0x3A2414, 0.4, 0.2), cx - Rm.hw + 2.8, 0.4, cz - Rm.hd + 0.6);
sxWinR(g, cx + Rm.hw - 0.05, 1.8, cz - 1.4, 1.2, 1.6, -Math.PI / 2, true);
for (var b = 0; b < 3; b++) {
jkCrate(g, cx + 1.2 + b * 0.8, cz + 1.6, 0.6);
}
jkDesk(g, cx + Rm.hw - 1.0, cz + 1.2, -Math.PI / 2);
var sw = dlnBox(g, 0.05, 0.05, 1.0, dlnShine(0xC8C8D0, 0.3, 0.9), cx - Rm.hw + 0.1, 2.4, cz + 0.6);
sw.rotation.x = 0.4;
shkSpot(cx - Rm.hw + 1.5, cz - Rm.hd + 3.0, 1.5, "The bed", "look", function () { sxTale("🛏️ Major Sholto's bed", ["Here, in April 1882, the Major lay dying: his heart, and the shock of a letter from India. He sent for his two sons, to tell them a thing he had never told."]); });
shkSpot(cx + Rm.hw - 1.0, cz - 1.4, 1.5, "The window", "look out", function () { sxTale("🪟 The window", ["'A face looking in at us out of the darkness... a bearded, hairy face, with wild cruel eyes and an expression of concentrated malevolence.' The bed of flowers below showed the print of one foot."]); });
shkSpot(cx + 1.8, cz + 1.6, 1.5, "The ransacked boxes", "look", function () { sxTale("📦 The boxes", ["The morning after the Major died, the window was found open, his cupboards and boxes rifled, and on his chest a torn piece of paper with the words 'The sign of the four' scrawled across it."]); });
Rm.hello = "<b>Major Sholto's bedroom, 1882.</b> An officer's room; the window over the garden.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, mah = dlnShine(0x4A2414, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: sxPaper("forr"), low: dlnC(0xE8E0C8), lowH: 0.9, h: h, ceil: dlnC(0xF2ECDE), outName: "Out to the road", out: sxOutL("forr") });
dlnPlane(g, Rm.hw * 2 - 2, Rm.hd * 2 - 3, sxPaper("carpet"), cx, 0.02, cz - 0.4);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
n14Sofa(g, cx - 1.6, cz - 0.2, Math.PI / 2, 0x6A3A3A);
n14Chair(g, cx + 1.6, cz - 1.6, -Math.PI / 2, mah, 0x6A3A3A);
n14Chair(g, cx + 1.4, cz + 0.4, -Math.PI / 2.4, mah, 0x6A3A3A);
n14Table(g, cx + Rm.hw - 1.0, cz - Rm.hd + 1.4, 0.7, 0.6, 0.72, mah, null);
dlnBox(g, 0.1, 0.14, 0.2, dlnC(0x2A2A3A), cx + Rm.hw - 1.0, 0.79, cz - Rm.hd + 1.4);
n14Gasolier(g, cx, h, cz - 1);
sxWinR(g, cx - Rm.hw + 0.05, 1.8, cz + 1.2, 1.3, 1.8, Math.PI / 2, false);
hbCase(g, cx + Rm.hw - 0.4, cz + 1.6, -Math.PI / 2, 1.6);
shkSpot(cx + Rm.hw - 1.0, cz - Rm.hd + 2.2, 1.4, "The work-table", "look", function () { sxTale("🧵 The work-table", ["Mrs Forrester's sewing, and on the corner of it a flat cardboard box: Miss Morstan's."]); });
shkSpot(cx, cz - Rm.hd + 1.4, 1.6, "The fire", "warm your hands", function () { sxTale("🔥 The fire", ["A good coal fire in a tiled grate; the mantel crowded with family photographs and a clock in a glass dome."]); });
shkSpot(cx - Rm.hw + 1.0, cz + 1.2, 1.4, "The window", "look out", function () { sxTale("🪟 The window", ["A quiet road in Lower Camberwell, villas behind their railings, a lamp at the gate."]); });
sxHome("sx_fmaid", "maid", cx + 0.8, 0.02, cz + 2.4, Math.PI, { name: "The maid", persona: SXL_FOLK.maid.persona, greet: "Miss Morstan's in the drawing-room, miss.", room: "sx_forr", sex: "f" });
Rm.hello = "<b>Mrs Cecil Forrester's drawing-room.</b> A tinted lamp, a good fire, a comfortable English home.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.2, deal = dlnS("oak", 0x7A5A3A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x5A4630), wall: sxPaper("sherman"), h: h, ceil: dlnC(0x3A2E22), outName: "Out to Pinchin Lane", out: sxOutL("sherman") });
[-1, 1].forEach(function (s) {
for (var r = 0; r < 3; r++) {
dlnBox(g, 0.5, 0.05, Rm.hd * 2 - 3, deal, cx + s * (Rm.hw - 0.3), 0.9 + r * 0.75, cz - 1);
for (var b = 0; b < (SHK.lite ? 3 : 7); b++) {
var bx = cx + s * (Rm.hw - 0.3), bz = cz - Rm.hd + 1.8 + b * ((Rm.hd * 2 - 4) / 7);
var cs = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.5, 0.5), new THREE.MeshLambertMaterial({ color: 0xC8D8E0, transparent: true, opacity: 0.28 }));
cs.position.set(bx, 1.18 + r * 0.75, bz);
g.add(cs);
var bd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), dlnC([0x6A5A3A, 0x3A3A3A, 0xA86A3A, 0xE8E0D0, 0x2A4A6A][(b + r) % 5]));
bd.scale.set(1, 0.8, 1.5);
bd.position.set(bx, 1.08 + r * 0.75, bz);
g.add(bd);
}
}
});
var bdg = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), dlnC(0x5A5A5A));
bdg.scale.set(1, 0.6, 1.8);
bdg.position.set(cx - 1, 0.2, cz - Rm.hd + 1.2);
g.add(bdg);
dlnBox(g, 0.08, 0.02, 0.4, dlnC(0xF0F0F0), cx - 1, 0.36, cz - Rm.hd + 1.0);
dlnBox(g, 1.6, 0.8, 1.0, dlnS("oak", 0x4A3A28), cx + 1.2, 0.4, cz - Rm.hd + 0.8);
for (var w = 0; w < 4; w++)
dlnBox(g, 0.04, 0.7, 0.04, dlnC(0x2A2A2A), cx + 0.5 + w * 0.45, 0.9, cz - Rm.hd + 1.3);
n14Table(g, cx, cz + 0.4, 1.4, 0.8, 0.8, deal, null);
dlnCyl(g, 0.08, 0.1, 0.2, dlnGlow(0xFFD890), cx - 0.3, 0.92, cz + 0.4, 8);
shkSpot(cx - Rm.hw + 1.2, cz - 1, 1.6, "The glass cases", "look at them", function () { sxTale("🦉 The cases", ["Birds of every sort, stuffed and set in glass cases: owls, a kingfisher on a twig, jays, a heron. Old Sherman's trade."]); });
shkSpot(cx - 1, cz - Rm.hd + 2.0, 1.4, "The badger", "look", function () { sxTale("🦡 The badger", ["'Don't mind that, sir: it's only a badger,' and on the shelf 'a slow-worm... it hain't got no fangs, so I gives it the run o' the room, for it keeps the beetles down'. A stoat looks at you from the corner."]); });
shkSpot(cx + 1.2, cz - Rm.hd + 2.0, 1.5, "The kennel at the back", "look", function () { sxTale("🐕 The kennels", ["Dogs at the back: and among them Toby, 'an ugly, long-haired, lop-eared creature, half spaniel and half lurcher, brown and white in colour, with a very clumsy waddling gait'. 'I would rather have Toby's help than that of the whole detective force of London.'"]); });
sxHome("sx_sher", "sxsherman", cx + 0.6, 0.02, cz + 1.4, Math.PI, { name: "Old Sherman", persona: SX_SHERMAN, greet: "Go on, you drunken vagabone! ...Oh, a friend of Mr Sherlock's? Step in, step in.", room: "sx_sherman" });
Rm.hello = "<b>Sherman's, No. 3, Pinchin Lane.</b> 'A strange menagerie': glass cases of birds, a badger, a stoat, a slow-worm loose on the shelf, and dogs at the back.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.8, pine = dlnS("oak", 0x9A7A54);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x7A5A3A), wall: sxPaper("whitewash"), h: h, ceil: dlnS("boards", 0x6A5038), outName: "Out to the wharf", out: sxOutL("smith") });
wcRange(g, cx, cz - Rm.hd + 0.5, 0);
n14Table(g, cx + 0.6, cz - 0.4, 1.2, 0.8, 0.76, pine, null);
n14Chair(g, cx - 0.4, cz - 0.4, Math.PI / 2, pine, 0x5A4630);
n14Chair(g, cx + 1.6, cz - 0.4, -Math.PI / 2, pine, 0x5A4630);
sxWinR(g, cx - Rm.hw + 0.05, 1.6, cz - 1, 1.0, 1.2, Math.PI / 2, false);
var oar = dlnBox(g, 0.08, 0.08, 3.0, dlnS("oak", 0xA88A5A), cx + Rm.hw - 0.3, 1.4, cz + 0.5);
oar.rotation.x = 1.2;
for (var c = 0; c < 3; c++)
dlnCyl(g, 0.06, 0.06, 0.3, dlnC(0x8A8A8A), cx - 0.8 + c * 0.5, 1.8, cz - Rm.hd + 0.15, 8);
shkSpot(cx - Rm.hw + 1.0, cz - 1, 1.4, "The window on the river", "look out", function () { sxTale("🌊 The river", ["The tide running, barges going down; across the water the Millbank shore. Mordecai Smith's black launch with its two red streaks is not at her moorings."]); });
shkSpot(cx + 0.6, cz + 0.4, 1.4, "The kitchen table", "look", function () { sxTale("🍞 The table", ["A loaf, a teapot, a boy's cap; the bill-head of the boat business: 'Mordecai Smith. Boats to hire by the hour or day. Steam launch.'"]); });
sxHome("sx_smw", "sxsmithw", cx + 1.2, 0.02, cz + 1.4, Math.PI, { name: "Mrs Smith", persona: SX_SMITHW, greet: "If it's Smith you want, he's not here.", room: "sx_smith", sex: "f" });
sxHome("sx_jack", "newsboy", cx - 0.6, 0.02, cz + 1.6, Math.PI * 0.8, { name: "Jack", persona: "You are Jack, Mordecai Smith's curly-headed little boy of six, at the wharf at the foot of Broad Street in 1888, in the world of Conan Doyle's The Sign of the Four (the book only): cheeky and cheerful; you would rather have a shilling than a penny. " + SXL_ERA, greet: "Would you give me a shilling?", room: "sx_smith", child: true });
Rm.hello = "<b>Mordecai Smith's.</b> A whitewashed kitchen over the wharf: the range, the table, an oar on the wall, the river through the window.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.3;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x2A1E18), wall: sxPaper("leather"), h: h, ceil: dlnC(0x1A1410), outName: "Step down", out: function () { sxGo("bxcab", "🐴 <b>Brixton.</b> The cab has stopped at last: long lines of dull brick houses, the glare of a public-house at the corner."); } });
[-1, 1].forEach(function (s) { dlnBox(g, Rm.hw * 2 - 1, 0.5, 0.9, dlnC(0x3A2A20), cx, 0.25, cz + s * (Rm.hd - 0.6)); dlnBox(g, Rm.hw * 2 - 1, 1.0, 0.2, sxPaper("leather"), cx, 0.9, cz + s * (Rm.hd - 0.2)); });
Rm.win = [];
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), new THREE.MeshBasicMaterial({ color: 0x4A4840 })); w.position.set(cx + s * (Rm.hw - 0.06), 1.5, cz); w.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2; g.add(w); Rm.win.push(w); });
var lp = new THREE.PointLight(0xFFC070, 0.6, 6);
lp.position.set(cx, 1.6, cz);
g.add(lp);
Rm.lamp = lp;
var brass = dlnShine(0xC8A048, 0.3, 0.9), cloth = dlnC(0x4A3A2A);
[-1, 1].forEach(function (s) {
for (var b = 0; b < 10; b++)
dlnCyl(g, 0.025, 0.025, 0.02, brass, cx - Rm.hw + 0.6 + (b % 5) * (Rm.hw * 2 - 1.2) / 4, 0.65 + ((b / 5) | 0) * 0.4, cz + s * (Rm.hd - 0.31), 6).rotation.x = Math.PI / 2;
dlnBox(g, 0.06, 0.5, 0.04, cloth, cx + s * (Rm.hw - 0.12), 1.75, cz - 0.5);
dlnBox(g, 0.7, 0.04, 0.04, dlnS("oak", 0x3A2618), cx + s * (Rm.hw - 0.05), 1.0, cz);
dlnBox(g, 0.04, 0.05, 0.18, brass, cx + s * (Rm.hw - 0.06), 1.15, cz + 0.9);
});
dlnBox(g, Rm.hw * 2 - 0.4, 0.02, Rm.hd * 2 - 2.4, dlnC(0x3A2E26), cx, 0.01, cz);
dlnBox(g, 0.3, 0.18, 0.3, brass, cx, h - 0.1, cz);
dlnBox(g, 0.22, 0.12, 0.22, dlnGlow(0xFFD088), cx, h - 0.24, cz);
SXL.cab = Rm;
Rm.fog = [];
Rm.win.forEach(function (w, wi) { for (var f = 0; f < 3; f++) {
var dot = new THREE.Mesh(new THREE.CircleGeometry(0.06 + f * 0.02, 10), new THREE.MeshBasicMaterial({ color: 0xFFD898, transparent: true, opacity: 0.7 }));
dot.position.copy(w.position);
dot.position.x += wi ? -0.01 : 0.01;
dot.rotation.y = w.rotation.y;
g.add(dot);
Rm.fog.push({ m: dot, w: w, o: f * 0.33 + wi * 0.17 });
} });
shkSpot(cx - Rm.hw + 0.8, cz, 1.4, "The cab window", "look out", function () { sxTale("🌫️ Through the fog", ["'Rochester Row... Now Vincent Square. Now we come out on the Vauxhall Bridge Road. We are making for the Surrey side, apparently. Yes, I thought so. Now we are on the bridge. You can catch glimpses of the river.' Holmes names every street, though you can see nothing but fog and lamps."]); });
Rm.hello = "<b>The four-wheeler.</b> Fog against the glass; the lamps of streets you cannot name go by.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.6, deal = dlnS("oak", 0x8A6A48);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x6A5038), wall: sxPaper("whitewash"), low: dlnC(0x3A5A3A), lowH: 1.2, h: h, ceil: dlnC(0xE8E4DA), outName: "Out to the street", out: sxOutL("klcab") });
wcBar(g, cx, cz - Rm.hd + 1.8, Rm.hw * 2 - 3, 0);
jkDesk(g, cx + Rm.hw - 1.2, cz, -Math.PI / 2, deal);
n14Chair(g, cx + Rm.hw - 2.0, cz, Math.PI / 2, deal, 0x2A2A2A);
for (var l = 0; l < 6; l++)
dlnCyl(g, 0.08, 0.09, 0.24, dlnShine(0x2A2A2A, 0.5, 0.5), cx - Rm.hw + 0.3, 1.7, cz - 2 + l * 0.4, 8);
dlnBox(g, 0.2, 0.04, 2.6, deal, cx - Rm.hw + 0.3, 1.56, cz - 1);
dlnBox(g, 1.0, 2.4, 0.12, dlnC(0x2A2A2E), cx - Rm.hw + 1.2, 1.2, cz - Rm.hd + 0.06);
for (var b = 0; b < 5; b++)
dlnBox(g, 0.04, 0.6, 0.02, dlnC(0x6A6A6A), cx - Rm.hw + 0.85 + b * 0.18, 1.6, cz - Rm.hd + 0.14);
var ck = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), dlnC(0xF2ECE0));
ck.position.set(cx, 2.8, cz - Rm.hd + 0.05);
g.add(ck);
for (var nt = 0; nt < 5; nt++) {
var nc = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.56), dlnC([0xF0EAD8, 0xE8DCC0, 0xF4F0E4][nt % 3]));
nc.position.set(cx - 1.6 + nt * 0.6, 1.9 + (nt % 2) * 0.12, cz + Rm.hd - 0.04);
nc.rotation.y = Math.PI;
g.add(nc);
var nl = dlnBox(g, 0.32, 0.03, 0.005, dlnC(0x2A2A2A), cx - 1.6 + nt * 0.6, 2.05 + (nt % 2) * 0.12, cz + Rm.hd - 0.05);
}
var pn = wcSign("METROPOLITAN POLICE", 2.4, 0.3, "#1A2A4A", "#E8E0C8");
pn.position.set(cx, 2.6, cz + Rm.hd - 0.05);
pn.rotation.y = Math.PI;
g.add(pn);
dlnBox(g, 2.6, 0.08, 0.45, deal, cx - 0.4, 0.45, cz + Rm.hd - 0.5);
for (var bl = 0; bl < 3; bl++)
dlnBox(g, 0.08, 0.45, 0.4, deal, cx - 1.6 + bl * 1.2, 0.22, cz + Rm.hd - 0.5);
dlnBox(g, 2.6, 0.5, 0.06, deal, cx - 0.4, 0.8, cz + Rm.hd - 0.22);
[-1, 1].forEach(function (s) { dlnBox(g, 0.05, 0.05, 0.4, dlnShine(0x8A7A4A, 0.3, 0.8), cx + s * 1.4, 2.3, cz - Rm.hd + 0.22); var gl = dlnBox(g, 0.16, 0.2, 0.16, dlnGlow(0xFFE0A0), cx + s * 1.4, 2.25, cz - Rm.hd + 0.42); });
dlnBox(g, 1.2, 1.1, 0.4, dlnC(0x1E1E1E), cx - Rm.hw + 0.22, 0.55, cz + 2.4);
dlnBox(g, 0.7, 0.5, 0.1, dlnGlow(0xE07A30), cx - Rm.hw + 0.43, 0.4, cz + 2.4).rotation.y = Math.PI / 2;
shkSpot(cx, cz - Rm.hd + 2.8, 1.6, "The charge desk", "look", function () { sxTale("📒 The charge desk", ["The book where every prisoner is written down: name, age, the charge, the officer. A sergeant's pen behind his ear."]); });
shkSpot(cx - Rm.hw + 1.0, cz - 1, 1.4, "The rack of lanterns", "look", function () { sxTale("🔦 Bull's-eye lanterns", ["The constables' lanterns, filled and trimmed for the night beats."]); });
sxHome("sx_sgt", "police", cx - 0.6, 0.02, cz - Rm.hd + 0.9, 0, { name: "The sergeant", persona: "You are a made-up sergeant at a London police station in 1888, in the world of Conan Doyle's The Sign of the Four (the book only): unhurried, kindly, a great one for the rules. Inspector Athelney Jones of Scotland Yard has the case of the Norwood murder. " + SXL_ERA, greet: "Evening. What can we do for you?", room: "sx_police" });
Rm.hello = "<b>The police station.</b> Whitewash and green paint, the charge desk, the lanterns on their rack.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xB89878), wall: sjRed(), h: h, ceil: dlnC(0x6A3A2A), outName: "Out to the gate", out: sxOutM("gate") });
for (var r = 0; r < 4; r++) {
var rf = dlnCyl(g, 0.03, 0.03, 1.6, dlnS("oak", 0x6A4A2A), cx - Rm.hw + 0.25, 0.9, cz - 1 + r * 0.3, 6);
rf.rotation.z = 0.1;
}
dlnBox(g, 0.3, 0.1, 1.4, dlnS("oak", 0x5A3A1E), cx - Rm.hw + 0.3, 1.6, cz - 0.55);
dlnCyl(g, 0.25, 0.18, 0.6, dlnC(0xA86A4A), cx + Rm.hw - 0.6, 0.3, cz - Rm.hd + 0.6, 12);
dlnBox(g, 1.8, 0.4, 0.8, dlnS("oak", 0x6A4A2A), cx + 1, 0.2, cz - Rm.hd + 0.6);
var lp = dlnCyl(g, 0.08, 0.1, 0.2, dlnGlow(0xFFC060), cx + 0.6, 0.5, cz - Rm.hd + 0.6, 8);
var ar = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.4), new THREE.MeshBasicMaterial({ color: 0x1A2440 }));
ar.position.set(cx, 1.6, cz + Rm.hd - 0.05);
ar.rotation.y = Math.PI;
g.add(ar);
var at = new THREE.Mesh(new THREE.CircleGeometry(0.6, 14, 0, Math.PI), ar.material);
at.position.set(cx, 2.3, cz + Rm.hd - 0.05);
at.rotation.y = Math.PI;
g.add(at);
for (var st = 0; st < 14; st++) {
var sx = new THREE.Mesh(new THREE.CircleGeometry(0.01 + ((st * 7) % 3) * 0.006, 5), dlnGlow(0xF4F0E0));
sx.position.set(cx - 0.5 + ((st * 37) % 100) / 100, 1.2 + ((st * 53) % 120) / 100, cz + Rm.hd - 0.06);
sx.rotation.y = Math.PI;
g.add(sx);
}
var cp = new THREE.Group();
cp.position.set(cx + Rm.hw - 0.7, 0, cz + 0.6);
g.add(cp);
dlnBox(cp, 0.9, 0.08, 1.9, dlnC(0xC8B48A), 0, 0.42, 0);
for (var lg = 0; lg < 4; lg++)
dlnBox(cp, 0.08, 0.42, 0.08, dlnS("oak", 0x5A4030), lg % 2 ? 0.4 : -0.4, 0.21, lg < 2 ? 0.9 : -0.9);
dlnBox(cp, 0.8, 0.1, 0.5, dlnC(0x8A3A2A), 0, 0.5, -0.6);
dlnBox(g, 2.0, 0.01, 1.4, dlnC(0x8A2A22), cx - 0.2, 0.01, cz + 0.4);
dlnBox(g, 1.7, 0.012, 1.1, dlnC(0x2A3A6A), cx - 0.2, 0.012, cz + 0.4);
[-1.2, 1.2].forEach(function (k) { dlnBox(g, 0.4, 0.5, 0.1, dlnC(0x3A1A10), cx + k, 1.9, cz - Rm.hd + 0.04); dlnCyl(g, 0.05, 0.07, 0.08, dlnGlow(0xFFC060), cx + k, 1.72, cz - Rm.hd + 0.1, 8); });
for (var cb = 0; cb < 3; cb++)
dlnBox(g, 0.5, 0.3, 0.35, dlnS("oak", 0x6A5030), cx - Rm.hw + 0.5, 0.15 + cb * 0.3, cz + Rm.hd - 0.5);
shkSpot(cx - Rm.hw + 1.0, cz - 0.5, 1.4, "The rifles in the rack", "look", function () { sxTale("🪖 The rack", ["The muskets of the watch, and a pouch of cartridges: Small's post is the small door on the south-west side, a lonely one, with two Sikh troopers under his command."]); });
shkSpot(cx + Rm.hw - 1.0, cz - Rm.hd + 1.4, 1.4, "The water-jar", "look", function () { sxTale("🏺 The water-jar", ["A great red earthen jar, sweating to keep the water cool in the heat."]); });
Rm.hello = "<b>The guard-house, Agra, 1857.</b> Red stone, the rack of muskets, a lamp turned low, the river beyond the gate.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 5.2;
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xA88A6A), wall: sjRed(), h: h, ceil: false, outName: "Out to the courts", out: sxOutM("oldq") });
for (var p = 0; p < 4; p++)
dlnCyl(g, 0.35, 0.4, h, sjRed(), cx + (p % 2 ? 1.6 : -1.6), h / 2, cz + (p < 2 ? -1.6 : 1.2), 12);
for (var d = 0; d < 12; d++) {
var rb = dlnBox(g, 0.3 + R() * 0.5, 0.2 + R() * 0.3, 0.3 + R() * 0.5, sjRed(), cx + (R() - 0.5) * Rm.hw * 1.8, 0.15, cz + (R() - 0.5) * Rm.hd * 1.8);
rb.rotation.y = R() * 3;
}
dlnBox(g, 1.2, 1.0, 0.3, dlnC(0x2A1810), cx + Rm.hw - 1.4, 0.6, cz - Rm.hd + 0.18);
[-1, 1].forEach(function (s) { for (var n = 0; n < 3; n++) {
var nz = cz - 2.4 + n * 2.4;
dlnBox(g, 0.08, 1.6, 0.9, dlnC(0x5A2418), cx + s * (Rm.hw - 0.04), 1.4, nz);
var na = new THREE.Mesh(new THREE.CircleGeometry(0.45, 12, 0, Math.PI), dlnC(0x5A2418));
na.position.set(cx + s * (Rm.hw - 0.05), 2.2, nz);
na.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
g.add(na);
} });
var ba = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.25, 6, 14, Math.PI * 0.7), sjRed());
ba.position.set(cx, h - 1.6, cz - 0.2);
g.add(ba);
var leaf = new THREE.MeshLambertMaterial({ color: 0x4A6A2E });
for (var v = 0; v < 16; v++) {
var cr = new THREE.Mesh(sjCrownGeo(60 + v, 3), leaf);
var vs = 0.2 + R() * 0.35;
cr.scale.set(vs, vs * (0.6 + R()), vs);
cr.position.set(cx + (R() < 0.5 ? -1 : 1) * (Rm.hw - 0.25), 0.2 + R() * h * 0.8, cz + (R() - 0.5) * Rm.hd * 1.8);
g.add(cr);
}
for (var wd = 0; wd < 10; wd++) {
var wc = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 4), dlnC(0x6A7A3A));
wc.position.set(cx + (R() - 0.5) * Rm.hw * 1.8, 0.15, cz + (R() - 0.5) * Rm.hd * 1.8);
g.add(wc);
}
shkSpot(cx + Rm.hw - 1.4, cz - Rm.hd + 1.2, 1.4, "The broken wall", "look", function () { sxTale("🧱 The broken wall", ["A place where the old wall has crumbled, and a hole can be made and closed again with a few loose bricks."]); });
shkSpot(cx, cz, 1.4, "The empty hall", "look about", function () { sxTale("🏛️ The empty hall", ["Halls whose roofs fell long ago, open to the stars; nobody comes here but the jackals and the owls. 'A great deserted quarter... in which one can easily lose oneself.'"]); });
Rm.hello = "<b>The empty hall, Agra.</b> Red pillars, fallen roof, the stars over it; rubble underfoot.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 3.4, teak = dlnShine(0x5A3A1E, 0.4, 0.2);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A6A48), wall: sjMat("sxplaster", 512, 512, sjPlasterTex(), 0.25), h: h, ceil: dlnC(0xE8E0D0), outName: "Out to the veranda", out: sxOutM("bung") });
n14Table(g, cx, cz - 0.6, 1.4, 1.4, 0.76, dlnC(0x2A5A3A), null);
[[0, -1.4, 0], [0, 0.2, Math.PI], [-1.0, -0.6, Math.PI / 2], [1.0, -0.6, -Math.PI / 2]].forEach(function (c) { n14Chair(g, cx + c[0], cz + c[1], c[2], teak, 0x3A2A1A); });
for (var k = 0; k < 14; k++) {
var cd = dlnBox(g, 0.07, 0.005, 0.1, dlnC(0xF4F0E8), cx - 0.4 + R() * 0.8, 0.79, cz - 0.9 + R() * 0.6);
cd.rotation.y = R() * 3;
}
var pk = dlnBox(g, 2.4, 0.6, 0.04, dlnC(0xE8E0C8), cx, h - 0.6, cz - 0.6);
dlnBox(g, 0.02, 0.4, 0.02, dlnC(0x6A5A44), cx, h - 0.1, cz - 0.6);
n14Table(g, cx + Rm.hw - 0.8, cz + 1.4, 0.6, 1.2, 0.9, teak, null);
for (var b = 0; b < 4; b++)
dlnCyl(g, 0.04, 0.04, 0.28, dlnC([0x3A5A2A, 0x6A3A1A, 0x2A2A2A, 0xE8E0C8][b]), cx + Rm.hw - 0.8, 1.04, cz + 1.0 + b * 0.25, 8);
sxWinR(g, cx - Rm.hw + 0.05, 1.8, cz - 1, 1.4, 1.6, Math.PI / 2, false);
shkSpot(cx, cz + 0.6, 1.6, "The card table", "look", function () { sxTale("🃏 The card table", ["Night after night the officers played cards here: Major Sholto, Captain Morstan, Lieutenant Bromley Brown, and the doctor; and the Major lost, and lost, and lost again, until he owed more than he could ever pay."]); });
shkSpot(cx - Rm.hw + 1.0, cz - 1, 1.4, "The window on the jungle", "look out", function () { sxTale("🌴 The jungle", ["Beyond the clearing, a wall of green; the hum of insects; the sea glinting. Small, who swept the officers' rooms and fetched their drinks, could see the whole game from where he stood."]); });
Rm.hello = "<b>The officers' quarters, Blair Island.</b> A punkah, a card table, bottles, maps; heat and the hum of the jungle.";
},
function (g, cx, cz, R, Rm) {
Rm.g = g;
var h = 2.6;
dlnShell(g, cx, cz, Rm, { floor: dlnS("gravel", 0x7A6A4A), wall: sjMat("sxwattle", 256, 256, sjWattleTex(), 0.5), h: h, ceil: sjThatch(), outName: "Out to the lines", out: sxOutM("huts") });
dlnBox(g, 0.9, 0.25, 1.9, dlnC(0x8A7A50), cx - Rm.hw + 0.6, 0.13, cz - 0.8);
dlnBox(g, 0.7, 0.08, 1.6, dlnC(0xA89A70), cx - Rm.hw + 0.6, 0.3, cz - 0.8);
dlnCyl(g, 0.2, 0.16, 0.4, dlnC(0x9A5A3A), cx + Rm.hw - 0.5, 0.2, cz - Rm.hd + 0.5, 10);
dlnBox(g, 0.8, 0.5, 0.5, dlnS("oak", 0x6A4A2A), cx + 1, 0.25, cz - Rm.hd + 0.4);
var spade = dlnBox(g, 0.05, 1.3, 0.05, dlnS("oak", 0x7A5A3A), cx + Rm.hw - 0.3, 0.65, cz + 1);
spade.rotation.z = 0.12;
var bam = dlnC(0xB8A060);
for (var sb = 0; sb < 2; sb++) {
dlnBox(g, 1.6, 0.04, 0.3, bam, cx, 1.2 + sb * 0.45, cz + Rm.hd - 0.2);
}
for (var it = 0; it < 4; it++)
dlnCyl(g, 0.08, 0.08, 0.18, dlnC([0x9A5A3A, 0xE8E0C8, 0x5A4A3A, 0x8A7A5A][it]), cx - 0.6 + it * 0.4, 1.31, cz + Rm.hd - 0.2, 8);
dlnBox(g, 0.05, 0.05, 0.2, dlnS("oak", 0x5A4030), cx - Rm.hw + 0.1, 1.8, cz + 1.2);
var sh = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.8), dlnC(0xD8D0B8));
sh.material.side = THREE.DoubleSide;
sh.position.set(cx - Rm.hw + 0.08, 1.4, cz + 1.2);
sh.rotation.y = Math.PI / 2;
g.add(sh);
dlnCyl(g, 0.06, 0.08, 0.06, dlnC(0x8A5A3A), cx + 0.4, 0.53, cz - Rm.hd + 0.4, 8);
dlnCyl(g, 0.01, 0.01, 0.06, dlnGlow(0xFFC060), cx + 0.4, 0.59, cz - Rm.hd + 0.4, 4);
dlnBox(g, 1.6, 0.01, 1.0, dlnC(0xB8A070), cx + 0.4, 0.01, cz + 0.6);
var cr2 = dlnCyl(g, 0.03, 0.03, 1.3, dlnS("oak", 0x6A4A2A), cx - Rm.hw + 1.4, 0.66, cz - 1.9, 6);
cr2.rotation.z = 0.2;
shkSpot(cx - Rm.hw + 1.0, cz - 0.6, 1.4, "The pallet", "look", function () { sxTale("🛏️ The pallet", ["A mat of plaited grass on a low frame. Small slept here for twenty years, near enough: his crutch of a wooden leg leaning by it."]); });
shkSpot(cx + Rm.hw - 0.9, cz - Rm.hd + 1.0, 1.4, "The water-pot", "look", function () { sxTale("🏺 The water-pot", ["A red earthen pot of water. Through the long days of digging, draining and building, the convicts were glad of it."]); });
Rm.hello = "<b>Jonathan Small's hut.</b> Woven bamboo under thatch; a pallet, a water-pot, a spade.";
},
function (x, z) { var Z = shkZoneAt(x, z == null ? 0 : z); if (Z === "inside") {
var k = shkRoomAtX(x, z);
return "in:" + (k || "?");
} if (Z === "1912") {
if (sjIn(x, z))
return "sx:far";
if (typeof wcIn === "function" && wcIn(x, z)) {
var W0 = wcLocal(x, z);
if (wcLyc(W0.x, W0.z))
return "wc:lyc";
}
if (sxIn(x, z)) {
var Lc = sxLocal(x, z);
return "sx:" + sxPiece(Lc.z);
}
return "london";
} return "1600"; },
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : sxbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? sxbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = sxbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
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
var W = sxbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = SXB_CH[sxbS().ch], ix = sxbS().s, d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who && !(d.from != null && ix < d.from) && !(d.until != null && ix >= d.until); })[0] : null;
if (d0 && d0.at !== at)
return sxbPos(d0.at);
}
if (at.spot) {
var Sp = sxbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = SXB.cast[at.cast], q = c && c.g && c.g.parent ? sxbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: sxbAreaAt(q.x, q.z) };
}
if (at.room)
return sxbRoomPt(at.room, at.lx, at.lz);
if (at.mo && SXU_PLACES[at.mo]) {
var M = SXU_PLACES[at.mo], mx = M.x + (at.dx || 0), mz = M.z + (at.dz || 0);
return { x: sjX(mx), z: sjZ(mz), y: sjGY(mx, mz), area: "sx:far", name: M.name };
}
if (at.at && SXL_PLACES[at.at]) {
var A = SXL_PLACES[at.at], ax = sxX(A.x + (at.dx || 0)), az = sxZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: 0, area: "sx:" + sxPiece(A.z + (at.dz || 0)), name: A.name };
}
if (at.wc && typeof WCH_PLACES !== "undefined" && WCH_PLACES[at.wc]) {
var Wp = WCH_PLACES[at.wc];
return { x: wcX(Wp.x + (at.dx || 0)), z: wcZ(Wp.z + (at.dz || 0)), y: 0, area: "wc:lyc", name: Wp.name };
}
if (at.x != null && at.m) {
return { x: sjX(at.x), z: sjZ(at.z), y: at.y != null ? at.y : sjH(at.x, at.z), area: "sx:far", name: at.name };
}
if (at.x != null) {
var x = sxX(at.x), z = sxZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : 0, area: sxbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (P.area === "wc:lyc")
return { show: null, way: " (a cab from any rank of this London: to the Lyceum Theatre)" };
var inA = area.indexOf("in:") === 0, inP = P.area.indexOf("in:") === 0, la = sxbLand(area), lp = sxbLand(P.area);
if (inA) {
var here = area.slice(3);
if (inP) {
var path = sxbRoomPath(here, P.area.slice(3));
if (path && path.length > 1) {
var sp = sxbLinkSpot(here, path[1]);
if (sp)
return { show: sp, way: " (through the door)" };
}
}
if (lp !== sxbLand(area) && (lp === "moor" || sxbLand(area) === "moor"))
return { show: null, way: " (press E: the book, ▶ Carry on, takes you there)" };
if (SXL_CABROOM[here] || here === "ws_baker")
return { show: sxbRoomExit(), way: " (out to a cab)" };
return { show: sxbRoomExit(), way: " (go out)" };
}
if ((la === "moor") !== (lp === "moor"))
return { show: null, way: " (press E: the book, ▶ Carry on, takes you there)" };
if (la === "moor") {
if (inP) {
var dr = sxbDoorRoom(P.area.slice(3)), D = dr && sxbRoomDoor(dr);
if (D)
return { show: D, way: " (go in)" };
}
return { show: P, way: "" };
}
if (inP) {
var k = P.area.slice(3);
if (SXL_CABROOM[k]) {
if (la === "ldn")
return { show: sxbCabPt(area), way: " (take a cab: to " + SXL_CABROOM[k] + ")" };
return { show: null, way: " (any London cab rank: to " + SXL_CABROOM[k] + ")" };
}
var D2 = sxbRoomDoor(sxbDoorRoom(k) || k);
if (D2 && D2.area === area)
return { show: D2, way: " (go in)" };
var pa = D2 ? D2.area : null;
if (la === "ldn")
return { show: sxbCabPt(area), way: " (take a cab" + (pa && SXL_PIECE[pa.slice(3)] ? ": to " + SXL_PIECE[pa.slice(3)] : "") + ")" };
return { show: null, way: " (any London cab rank: The Sign of the Four's London; or the 🎭 menu)" };
}
if (la === "ldn")
return { show: sxbCabPt(area), way: " (take a cab: to " + (SXL_PIECE[P.area.slice(3)] || "there") + ")" };
return { show: null, way: " (any London cab rank: The Sign of the Four's London; or the 🎭 menu)" };
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
if (SXB.beam && SXB.beam.parent)
return SXB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
SHK.G.add(g);
SXB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "orchid":
m = wCyl(0.008, 0.008, 0.3, wM(0x4A6A2A), 0, 0.15, 0, g, 5);
[[0, 0.3, 0], [0.04, 0.27, 0.02], [-0.04, 0.26, 0.01]].forEach(function (p) { var f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), wM(0xB86AA8)); f.scale.set(1.2, 0.7, 1); f.position.set(p[0], p[1], p[2]); g.add(f); });
break;
case "stub":
m = wCyl(0.008, 0.008, 0.05, wM(0xF0ECE0), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
wCyl(0.0085, 0.0085, 0.012, wM(0x8A5A2A), 0.028, 0.01, 0, g, 6).rotation.z = Math.PI / 2;
break;
case "stick":
m = wBox(0.03, 0.03, 1.0, wM(0x5A3A1E), 0, 0.03, 0, g);
wBox(0.05, 0.05, 0.06, wM(0xC0C0C8, { m: 0.9, r: 0.25 }), 0, 0.03, 0.42, g);
wSph(0.045, wM(0x5A3A1E), 0, 0.04, -0.5, g, 8);
break;
case "boot":
m = wBox(0.1, 0.12, 0.28, wM(0x6A3A1A, { r: 0.5 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x6A3A1A, { r: 0.5 }), 0, 0.18, -0.09, g);
break;
case "oldboot":
m = wBox(0.1, 0.12, 0.28, wM(0x141414, { r: 0.6 }), 0, 0.06, 0, g);
wBox(0.1, 0.18, 0.1, wM(0x141414, { r: 0.6 }), 0, 0.18, -0.09, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.2, wM(0xF4EEDC), 0, 0.01, 0, g);
for (var q = 0; q < 5; q++)
wBox(0.1 - q * 0.01, 0.006, 0.012, wM(0x2A2A2A), 0, 0.012, -0.06 + q * 0.03, g);
break;
case "scrap":
m = wBox(0.12, 0.004, 0.08, wM(0x4A3A2A), 0, 0.01, 0, g);
wBox(0.06, 0.006, 0.014, wM(0xE8E0C8), 0, 0.012, 0, g);
break;
case "telegram":
m = wBox(0.16, 0.004, 0.1, wM(0xE8DCC0), 0, 0.01, 0, g);
wBox(0.12, 0.006, 0.02, wM(0x3A5A8A), 0, 0.012, -0.03, g);
break;
case "manuscript":
m = wBox(0.22, 0.03, 0.28, wM(0xE0CCA0), 0, 0.015, 0, g);
wBox(0.2, 0.034, 0.04, wM(0x6A2A1A), 0, 0.017, -0.08, g);
break;
case "photo":
m = wBox(0.1, 0.006, 0.14, wM(0x8A7A60), 0, 0.01, 0, g);
break;
case "ash":
m = wBox(0.04, 0.01, 0.04, wM(0x8A8A86), 0, 0.005, 0, g);
wCyl(0.012, 0.012, 0.08, wM(0x6A4A2A), 0.04, 0.01, 0, g, 6);
break;
case "tin":
m = wCyl(0.05, 0.05, 0.07, wM(0xB8B8C0, { m: 0.8, r: 0.3 }), 0, 0.035, 0, g, 12);
break;
case "net":
m = wBox(0.02, 0.02, 1.2, wM(0x6A5A3A), 0, 0.02, 0, g);
wSph(0.18, wM(0x3A6A3A, { r: 0.9 }), 0, 0.05, 0.6, g, 8);
break;
case "violin":
m = wSph(0.12, wM(0x8A4A1A, { r: 0.3 }), 0, 0.05, 0, g, 10);
m.scale.set(1, 0.3, 1.7);
wBox(0.035, 0.02, 0.32, wM(0x1A1010), 0, 0.06, 0.36, g);
break;
case "times":
m = wBox(0.3, 0.01, 0.4, wM(0xE8E2D2), 0, 0.005, 0, g);
for (var q2 = 0; q2 < 6; q2++)
wBox(0.24, 0.012, 0.01, wM(0x3A3A3A), 0, 0.007, -0.15 + q2 * 0.06, g);
break;
case "print":
m = wBox(0.18, 0.01, 0.3, wM(0x3A2A1A), 0, 0.005, 0, g);
break;
case "cane":
m = wBox(0.03, 0.03, 0.9, wM(0x3A2414), 0, 0.03, 0, g);
wSph(0.04, wM(0xC8A048, { m: 0.8, r: 0.3 }), 0, 0.04, 0.45, g, 8);
break;
case "halfcane":
m = wBox(0.03, 0.03, 0.45, wM(0x3A2414), 0, 0.03, 0, g);
break;
case "key":
m = wBox(0.02, 0.006, 0.1, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g);
wCyl(0.025, 0.025, 0.006, wM(0x8A8A90, { m: 0.8, r: 0.3 }), 0, 0.01, -0.06, g, 10);
break;
case "chequebook":
m = wBox(0.16, 0.02, 0.08, wM(0x3A6A3A), 0, 0.01, 0, g);
break;
case "purse":
m = wSph(0.05, wM(0x2A1A10), 0, 0.04, 0, g, 8);
m.scale.set(1.3, 0.7, 1);
break;
case "watch":
m = wCyl(0.03, 0.03, 0.01, wM(0xC8A048, { m: 0.9, r: 0.25 }), 0, 0.01, 0, g, 14);
break;
case "envelope":
m = wBox(0.18, 0.004, 0.11, wM(0xF2EADA), 0, 0.01, 0, g);
wBox(0.03, 0.006, 0.03, wM(0x8A1A1A), 0, 0.012, 0, g);
break;
case "phial":
m = wCyl(0.025, 0.03, 0.11, wM(0xC8D8E8, { e: 0x8A2A3A, ei: 0.3 }), 0, 0.055, 0, g, 8);
break;
case "powder":
m = wBox(0.07, 0.01, 0.05, wM(0xF4F0E8), 0, 0.005, 0, g);
break;
case "drawer":
m = wBox(0.45, 0.18, 0.35, wM(0x4A2414), 0, 0.09, 0, g);
wBox(0.4, 0.02, 0.3, wM(0xF4F0E8), 0, 0.16, 0, g);
break;
case "axe":
m = wBox(0.04, 0.04, 0.8, wM(0x8A6A44), 0, 0.03, 0, g);
wBox(0.14, 0.03, 0.16, wM(0x6A6A70, { m: 0.8, r: 0.35 }), 0, 0.03, 0.4, g);
break;
case "poker":
m = wBox(0.02, 0.02, 0.7, wM(0x2A2A2E, { m: 0.8, r: 0.4 }), 0, 0.02, 0, g);
break;
case "candle":
m = wCyl(0.02, 0.02, 0.16, wM(0xF4F0E4), 0, 0.08, 0, g, 8);
wSph(0.02, wM(0xFFD890, { e: 0xFFA040, ei: 0.8 }), 0, 0.18, 0, g, 6);
break;
case "salt":
m = wCyl(0.035, 0.035, 0.08, wM(0xF4F0F8, { e: 0x6A4A8A, ei: 0.2 }), 0, 0.04, 0, g, 10);
break;
case "book":
m = wBox(0.16, 0.04, 0.22, wM(0x5A1A1A), 0, 0.02, 0, g);
break;
case "ring":
m = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 16), wM(0xE8C048, { m: 0.95, r: 0.2 }));
m.rotation.x = Math.PI / 2;
m.position.y = 0.006;
g.add(m);
break;
case "pillbox":
m = wCyl(0.03, 0.03, 0.018, wM(0xE8DCC0), 0, 0.01, 0, g, 12);
wSph(0.008, wM(0xC8C8C0), 0.01, 0.022, 0, g, 6);
wSph(0.008, wM(0xC8C8C0), -0.01, 0.022, 0, g, 6);
break;
case "tape":
m = wCyl(0.04, 0.04, 0.02, wM(0x6A4A2A), 0, 0.01, 0, g, 12);
wBox(0.2, 0.004, 0.012, wM(0xE8D8A0), 0.12, 0.004, 0, g);
break;
case "lens":
m = wCyl(0.035, 0.035, 0.006, wM(0xC8E0F0, { m: 0.2, r: 0.05 }), 0, 0.01, 0, g, 14);
wBox(0.012, 0.012, 0.09, wM(0x2A1A10), 0, 0.01, 0.07, g);
break;
case "card":
m = wBox(0.09, 0.004, 0.055, wM(0xF4F2EA), 0, 0.005, 0, g);
wBox(0.06, 0.006, 0.008, wM(0x2A2A2A), 0, 0.006, 0, g);
break;
case "paper":
m = wBox(0.3, 0.01, 0.4, wM(0xE8E2D2), 0, 0.005, 0, g);
for (var q3 = 0; q3 < 6; q3++)
wBox(0.24, 0.012, 0.01, wM(0x3A3A3A), 0, 0.007, -0.15 + q3 * 0.06, g);
break;
case "cigar":
m = wCyl(0.008, 0.009, 0.12, wM(0x5A3A1E), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "blood":
m = wCyl(0.012, 0.012, 0.04, wM(0xC8D8E8, { e: 0x6A1A1A, ei: 0.3 }), 0, 0.02, 0, g, 8);
break;
case "crystals":
m = wCyl(0.025, 0.025, 0.06, wM(0xD8E8F0), 0, 0.03, 0, g, 8);
wCyl(0.012, 0.014, 0.016, wM(0x3A2A1A), 0, 0.066, 0, g, 6);
break;
case "water":
m = wSph(0.05, wM(0x8AB8D8, { e: 0x1A3A5A, ei: 0.2 }), 0, 0.04, 0, g, 10);
m.scale.set(1, 0.6, 1);
break;
case "chalk":
m = wBox(0.02, 0.02, 0.06, wM(0xF4F4F0), 0, 0.01, 0, g);
break;
case "bighorn":
m = wSph(0.4, wM(0x8A6A4A), 0, 0.4, 0, g, 10);
m.scale.set(1.4, 0.8, 0.8);
wSph(0.18, wM(0x8A6A4A), 0.6, 0.55, 0, g, 8);
var hn1 = wCyl(0.05, 0.08, 0.4, wM(0xC8B898), 0.62, 0.75, 0.1, g, 6);
hn1.rotation.x = 1.2;
break;
case "meat":
m = wSph(0.12, wM(0x8A3A2A), 0, 0.08, 0, g, 8);
m.scale.set(1.4, 0.6, 1);
break;
case "nugget":
m = wSph(0.03, wM(0xD8D8E0, { m: 0.9, r: 0.3 }), 0, 0.03, 0, g, 6);
break;
case "print":
m = wBox(0.13, 0.004, 0.2, wM(0x2A2016), 0, 0.004, 0.04, g);
wBox(0.1, 0.005, 0.09, wM(0x2A2016), 0, 0.004, -0.15, g);
break;
case "patent":
m = wSph(0.06, wM(0x3A2E20), 0, 0.003, 0.06, g, 8);
m.scale.set(0.9, 0.05, 1.7);
wSph(0.045, wM(0x3A2E20), 0, 0.003, -0.12, g, 8).scale.set(1, 0.05, 1.1);
break;
case "rut":
m = wBox(0.09, 0.006, 2.4, wM(0x2A2218), -0.75, 0.004, 0, g);
wBox(0.09, 0.006, 2.4, wM(0x2A2218), 0.75, 0.004, 0, g);
break;
case "hoof":
m = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 5, 10, Math.PI * 1.4), wM(0x6A6A70, { m: 0.7, r: 0.4 }));
m.rotation.x = Math.PI / 2;
m.position.y = 0.008;
g.add(m);
break;
case "coin":
m = wCyl(0.012, 0.012, 0.003, wM(0xE8C048, { m: 0.95, r: 0.2 }), 0, 0.004, 0, g, 14);
break;
case "whip":
m = wBox(0.015, 0.015, 1.1, wM(0x2A1A10), 0, 0.01, 0, g);
wBox(0.006, 0.006, 0.6, wM(0x1A1A1A), 0.05, 0.008, 0.8, g);
break;
case "pipette":
m = wCyl(0.006, 0.006, 0.2, wM(0xD8E8F0), 0, 0.01, 0, g, 6);
m.rotation.z = Math.PI / 2;
break;
case "word":
m = wBox(0.3, 0.004, 0.2, wM(0xE8E2D2), 0, 0.004, 0, g);
wBox(0.2, 0.006, 0.03, wM(0x7A1010), 0, 0.006, 0, g);
break;
case "pills":
m = wCyl(0.03, 0.03, 0.018, wM(0xE8DCC0), 0, 0.01, 0, g, 12);
wSph(0.008, wM(0xD8D0C0), 0.01, 0.022, 0, g, 6);
break;
case "wire":
m = wBox(0.16, 0.004, 0.1, wM(0xE8DCC0), 0, 0.01, 0, g);
wBox(0.12, 0.006, 0.02, wM(0x3A5A8A), 0, 0.012, -0.03, g);
break;
case "water2":
m = wCyl(0.05, 0.06, 0.14, wM(0x8A6A4A), 0, 0.07, 0, g, 10);
break;
case "flower":
m = wCyl(0.006, 0.006, 0.25, wM(0x4A6A2A), 0, 0.12, 0, g, 5);
wSph(0.04, wM(0xE8A8C8), 0, 0.26, 0, g, 8);
break;
case "pearl":
m = wBox(0.08, 0.04, 0.06, wM(0x2A2A3A), 0, 0.02, 0, g);
wSph(0.012, wM(0xF4F0EA, { m: 0.1, r: 0.15 }), 0, 0.05, 0, g, 10);
break;
case "pearls":
m = wBox(0.14, 0.04, 0.1, wM(0x3A2A4A), 0, 0.02, 0, g);
for (var pq = 0; pq < 6; pq++)
wSph(0.011, wM(0xF4F0EA, { m: 0.1, r: 0.15 }), -0.05 + pq * 0.02, 0.046, 0, g, 8);
break;
case "sign":
m = wBox(0.16, 0.004, 0.1, wM(0xE4D8C0), 0, 0.005, 0, g);
for (var sq = 0; sq < 4; sq++)
wBox(0.012, 0.006, 0.05, wM(0x2A2A2A), -0.04 + sq * 0.03, 0.007, 0.01, g);
wBox(0.1, 0.006, 0.008, wM(0x2A2A2A), 0, 0.007, -0.02, g);
break;
case "plan":
m = wBox(0.22, 0.004, 0.16, wM(0xD8C8A0), 0, 0.005, 0, g);
wBox(0.16, 0.006, 0.1, wM(0x8A2A1A), 0, 0.006, 0, g);
wBox(0.13, 0.007, 0.07, wM(0xD8C8A0), 0, 0.007, 0, g);
break;
case "thorn":
m = wCyl(0.002, 0.004, 0.06, wM(0x3A2A1A), 0, 0.008, 0, g, 5);
m.rotation.z = Math.PI / 2;
break;
case "dart":
m = wCyl(0.003, 0.005, 0.12, wM(0x4A3A2A), 0, 0.01, 0, g, 5);
m.rotation.z = Math.PI / 2;
wSph(0.008, wM(0xE8E0C8), 0.06, 0.01, 0, g, 6);
break;
case "club":
m = wBox(0.03, 0.03, 0.5, wM(0x5A3A1E), 0, 0.02, 0, g);
wSph(0.05, wM(0x6A6A62), 0, 0.04, 0.25, g, 8).scale.set(1.2, 0.8, 1.6);
break;
case "pouch":
m = wSph(0.06, wM(0x6A4A2A), 0, 0.04, 0, g, 8);
m.scale.set(1.2, 0.8, 1);
break;
case "rope":
m = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 6, 18), wM(0x8A7A5A));
m.rotation.x = Math.PI / 2;
m.position.y = 0.015;
g.add(m);
break;
case "creosote":
m = wBox(0.16, 0.006, 0.16, wM(0x4A3A1A), 0, 0.004, 0, g);
break;
case "chaplet":
m = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 6, 18), wM(0xF4F0EA, { m: 0.1, r: 0.15 }));
m.rotation.x = Math.PI / 2;
m.position.y = 0.01;
g.add(m);
break;
case "box":
m = wBox(0.42, 0.26, 0.3, wM(0x2A2A2E, { m: 0.6, r: 0.4 }), 0, 0.13, 0, g);
wBox(0.44, 0.04, 0.32, wM(0xB89048, { m: 0.8, r: 0.3 }), 0, 0.27, 0, g);
wBox(0.08, 0.06, 0.02, wM(0xB89048, { m: 0.8, r: 0.3 }), 0, 0.2, 0.16, g);
break;
case "lamp":
m = wCyl(0.05, 0.06, 0.16, wM(0x6A5A3A, { m: 0.6, r: 0.4 }), 0, 0.08, 0, g, 8);
wSph(0.04, wM(0xFFD890, { e: 0xFFA040, ei: 0.8 }), 0, 0.2, 0, g, 8);
break;
default: return typeof jkbItemMesh === "function" ? jkbItemMesh(kind) : g;
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = sxbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (SXB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
SXB.items = SXB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[sxb] take", e);
}
}, (P.y || 0));
I.S.sxb = 1;
SXB.items.push(I);
return I;
},
function (k) {
if (SXB.tuneKey === k)
return;
SXB.tuneKey = k;
var old = SXB.tune;
SXB.tune = null;
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
if (!k || !SXB_TUNES[k])
return;
try {
var A = new Audio(SXB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
SXB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (SXB.tune !== A) {
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
if (SXB.text)
return fn(SXB.text);
if (SXB.textWait) {
SXB.textWait.push(fn);
return;
}
SXB.textWait = [fn];
var done = function (B) { SXB.text = B; var w = SXB.textWait; SXB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/sign/sign.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
sxbText(function (B) {
var C = SXB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(sxbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); SXB.readOpen = 0; SXB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = sxbS(), C = SXB_CH[S.ch];
if (!C)
return;
SXB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
SXB.readAsk = 0;
SXB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(C.src || "Arthur Conan Doyle, The Sign of the Four (1890)") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + (C.more ? C.more.map(function (p) { return "<p style='margin:6px 0;opacity:.88'>" + esc(p) + "</p>"; }).join("") : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? sxbOpening(T).map(sxbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); SXB.readOpen = 0; sxbStepDone(); }, all: function () { sxbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += sxbKeeperBtns(fns);
worldCard(b, fns);
};
sxbText(show);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
SXB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); sxbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = sxbS(), C = SXB_CH[S.ch];
if (!C)
return;
if (C.far)
sxuBuild();
else
sxlBuild();
sxbItemsClear();
sxbCastClear();
SXB.hold = 0;
if (place && C.start)
sxbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[sxb] setup", S.ch, e);
}
sxbTune(C.tune || null);
sxbStepBegin();
},
function () {
var b = sxbStep();
sxbItemsClear();
SXB.hold = 0;
SXB.puzOpen = 0;
if (!b)
return;
if (sxbAgeSkip(b)) {
sxbStepDone();
return;
}
b._key = sxbKey();
try {
if (b.on)
b.on(sxbS().f);
}
catch (e) {
if (window.console)
console.warn("[sxb] on", e);
}
if (b.k === "read") {
sxbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { SXB.rew[k] = 0; });
if (b.k === "find")
sxbItemAdd(b.item, sxbPos(b.at), b.name, b.verb, function () { if (sxbKey() === b._key)
sxbStepDone(); });
if (b.k === "gather") {
var P = sxbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(sxbS().ch * 97 + sxbS().s * 13 + 7);
SXB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
sxbItemAdd(b.item, Q, b.name, b.verb, function () { if (sxbKey() !== b._key)
return; SXB.got++; try {
if (b.each)
b.each(SXB.got);
}
catch (e) { } if (SXB.got < n) {
sxbSay((b.eachSay || "Got one.") + " " + SXB.got + " of " + n + ".");
return;
} sxbStepDone(); });
}
}
if (b.h)
sxbSay("<b>" + esc(SXB_CH[sxbS().ch].t) + ".</b> " + b.h);
},
function (b) {
SXB.puzOpen = 1;
SXB.puzT = performance.now();
var k = sxbKey(), fns = {}, h = SXB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
sxbSay(b.yes);
if (sxbKey() === k)
sxbStepDone();
return;
}
sxbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (sxbKey() === k)
SXB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = sxbS(), C = SXB_CH[S.ch], b = sxbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[sxb] done", e);
}
if (b.say)
sxbSay(b.say);
S.s++;
if (window.SXB_LOG)
SXB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= SXB_CH.length - 1) {
S.done = 1;
S.s = 0;
sxbSave();
sxbItemsClear();
sxbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
sxbSave();
var nx = SXB_CH[S.ch];
setTimeout(function () { try {
sxbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[sxb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
sxbSave();
sxbStepBegin();
},
function () {
sxbTune("violin");
var S = sxbS();
var b = "<h3 style='margin:4px 0'>The Sign of the Four</h3><p>'The division seems rather unfair,' I remarked. 'You have done all the work in this business. I get a wife out of it, Jones gets the credit, pray what remains for you?' 'For me,' said Sherlock Holmes, 'there still remains the cocaine-bottle.' And he stretched his long white hand up for it.</p><p>Miss Morstan and Dr Watson are to be married. And you have walked every step of it, from Mrs Forrester's parlour to the Andaman Islands and the Plumstead Marshes.</p><p style='opacity:.85'>Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; sxbSave(); sxbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "Mrs Forrester's, Lower Camberwell, 1888");
worldCard(b, fns);
},
function () {
var S = sxbS(), C = SXB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle, 1890 · the whole book, all twelve chapters</div><h3 style='margin:4px 0'>🔎 The Sign of the Four</h3>";
if (S.done)
b += "<p>You have played the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((sxbStep() || {}).h || "") + "</p>";
else
b += "<p>London, September 1888. You lodge with kind Mrs Cecil Forrester in Lower Camberwell, as companion and friend to her governess, Miss Mary Morstan. Every year for six years, on the same day, a large and lustrous pearl has come to Mary by post, with no word of who sends it. This morning a letter came instead: be at the third pillar from the left outside the Lyceum Theatre to-night at seven. Mary is going to Baker Street, to Mr Sherlock Holmes, to ask what to do; she wants you with her.</p><p style='font-size:12px;opacity:.75'>Conan Doyle's book, the second Holmes story, all of it, chapter by chapter: London and the river, then Agra and the Andamans as Jonathan Small tells it. You play every step; the book's own words are there to read whenever you like.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: The Science of Deduction", S.started ? "Back to where you were" : "221B Baker Street, 1888");
fns.go = function () { worldCard(null); sxbBegin(); };
}
else {
b += worldBtn("again", "Play it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; sxbSave(); sxbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += sxbKeeperBtns(fns);
worldCard(b, fns);
},
function () {
var S = sxbS();
S.started = 1;
sxbSave();
if (WLD.on !== SHK_KEY) {
SXB.pending = 1;
if (typeof shkGo === "function")
shkGo({ sxb: 1 });
else
worldGo(SHK_KEY, { sxb: 1 });
return;
}
var b = S.s > 0 ? sxbStep() : null, P = b && b.at && b.k !== "read" ? sxbPos(b.at) : null, L = worldLocal(), here = sxbAreaAt(L.x, L.z);
if (P && sxbLand(P.area) !== sxbLand(here)) {
var C = SXB_CH[S.ch];
if (P.area === "sx:far")
sxuBuild();
else if (P.area === "wc:lyc") {
if (typeof wchBuild === "function")
wchBuild();
}
else
sxlBuild();
sxbItemsClear();
sxbCastClear();
sxbTune(C.tune || null);
if (P.area.indexOf("in:") === 0)
shkGoIn(P.area.slice(3));
else
shkMove(P.x, P.z, null, null, null, P.y);
setTimeout(function () { try {
sxbStepBegin();
}
catch (e) { } }, 400);
return;
}
sxbChapterBegin(true);
},
function (c) {
var C = SXB.cast[c.key];
if (sxbCastLive(C))
return C;
var P = sxbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? (P.area === "sx:far" ? SXU.live : SXL.live) : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = sxPerson("sxb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
if (c.up != null && P.area === "sx:far" && !inside) {
var UL = sjLocal(px, pz);
py = sjGY(UL.x, UL.z) + c.up;
}
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "sxb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (P.area === "sx:far" && !inside && c.up == null)
sxMoorGround(Q);
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || SXL_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
sxbWrapT(T);
}
SXB.cast[c.key] = { g: g, P: Q, c: c };
return SXB.cast[c.key];
},
function () {
var C = SXB_CH[sxbS().ch];
if (!C || !C.cast)
return;
var b = sxbStep() || {}, idx = sxbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
var Lv = SXB.cast[c.key];
if (Lv && Lv.c === c)
sxbCastDrop(c.key);
return;
}
if (SXB.gone && SXB.gone[c.key] != null && (c.from || 0) <= SXB.gone[c.key])
return;
if (sxbCastLive(SXB.cast[c.key]))
return;
var P = sxbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (sxbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
sxbPerson(c);
});
},
function (T) {
if (!sxbActive() || !sxZoneNow())
return false;
var b = sxbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = sxbKey();
worldPrompt(null);
var next = function () { if (sxbKey() === k)
sxbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(SXB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
SXB.wt += dt;
if (SXB.wt > 0.5) {
SXB.wt = 0;
sxbWrap();
if (sxbActive())
sxbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!sxbActive()) {
if (SXB.beam)
SXB.beam.visible = false;
if (!busy)
worldPrompt("🔎 <b>The Sign of the Four</b> · <b>press E</b> for Conan Doyle's book", sxbOpen);
return;
}
var S = sxbS(), b = sxbStep(), L = worldLocal(), t = SHK.t || 0, area = sxbAreaAt(L.x, L.z);
SXB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? sxbPos(b.at) : null, W = P ? sxbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = sxbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = sxbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = sxbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? sxbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (SXB.readAsk)
break;
if (!SXB.readOpen)
sxbChapterCard();
else {
SXB.readOpen = 0;
sxbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
sxbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
SXB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(SXB.hold, dt);
}
catch (e) { }
if (SXB.hold >= (b.sec || 8)) {
sxbStepDone();
return;
}
}
else
SXB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return SXB.rew[k]; })) {
sxbStepDone();
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
sxbStepDone();
return;
}
break;
}
case "puzzle":
if ((!SXB.puzOpen || performance.now() - (SXB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
sxbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🔎 <b>The Sign of the Four</b> · <b>press E</b> for the book", sxbOpen);
var C = SXB_CH[S.ch], prog = b && b.k === "hold" && SXB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - SXB.hold)) + " s)" : b && b.k === "gather" ? " (" + (SXB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🔎 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var on = {};
try {
if (sxbActive()) {
var S = sxbS(), C = SXB_CH[S.ch];
if (C && C.stills)
for (var k in C.stills) {
var r = C.stills[k];
if (S.s >= r[0] && S.s < r[1])
on[k] = 1;
}
}
}
catch (e) { }
["sx_pbart"].forEach(function (rk) { var Rm = SHK.rooms[rk]; if (!Rm || !Rm.g)
return; Rm.g.traverse(function (o) { if (o.userData && o.userData.still)
o.visible = !!on[o.userData.still]; }); });
},
function () {
var g = new THREE.Group(), w = dlnC(0xEAE4D6), b = dlnC(0x7A4A26);
var bd = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), w);
bd.scale.set(0.9, 0.8, 1.9);
bd.position.set(0, 0.42, 0);
g.add(bd);
var pt = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), b);
pt.scale.set(1, 0.6, 1.4);
pt.position.set(0.03, 0.52, -0.08);
g.add(pt);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), b);
hd.position.set(0, 0.56, 0.38);
g.add(hd);
var mz = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), w);
mz.scale.set(0.9, 0.8, 1.4);
mz.position.set(0, 0.51, 0.5);
g.add(mz);
dlnCyl(g, 0.022, 0.022, 0.04, dlnC(0x1A1410), 0, 0.53, 0.6, 6).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), b); e.scale.set(0.4, 1.5, 0.9); e.position.set(s * 0.12, 0.48, 0.36); g.add(e); });
[[0.1, 0.24], [-0.1, 0.24], [0.1, -0.24], [-0.1, -0.24]].forEach(function (p, i) { dlnCyl(g, 0.035, 0.03, 0.34, i < 2 ? w : b, p[0], 0.17, p[1], 6); });
var tl = dlnCyl(g, 0.03, 0.015, 0.3, w, 0, 0.55, -0.42, 6);
tl.rotation.x = -0.8;
g.userData.keep = 1;
return g;
},
function (x, z) {
var best = null, bd = 40;
for (var k in SXU_PLACES) {
var P = SXU_PLACES[k], d = Math.hypot(x - P.x, z - P.z);
if (d < bd) {
bd = d;
best = P.name;
}
}
if (best)
return best;
var r = sjRegion(x, z);
if (r === "river")
return sjH(x, z) < 0.35 ? "the Thames" : x < -600 ? "the north bank of the Thames" : x > 820 ? "the Plumstead Marshes" : "the river bank";
if (r === "agra")
return x < -880 ? "the town of Agra" : x > -470 && x < -380 ? "the Jumna" : "the plain by Agra";
return Math.hypot(x - SXU_ISLE.x, z - SXU_ISLE.z) > sjIsleR(Math.atan2(z - SXU_ISLE.z, x - SXU_ISLE.x)) ? "the sea" : "the jungle of Blair Island";
},
function (k, msg, o) {
sxuBuild();
var x, z, y = null, ry = null;
if (o && o.x != null) {
x = o.x;
z = o.z;
y = o.y;
ry = o.ry;
}
else {
var P = SXU_PLACES[k] || SXU_PLACES.wwharf;
x = P.x;
z = P.z;
var r = sjRegion(x, z);
msg = msg || ((r === "river" ? "⚓ <b>The Thames, 1888.</b> " : r === "agra" ? "🏯 <b>Agra, 1857.</b> " : "🌴 <b>Blair Island.</b> ") + esc(P.name) + ".");
}
var dy = sjDeckAt(x, z);
shkMove(sjX(x), sjZ(z), ry, msg || null, null, y != null ? y : dy != null ? dy : sjH(x, z));
},
function () {
var b = "", fns = {}, go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); fn(); }; };
go("nw", "🏚️", "To Upper Norwood", "Pondicherry Lodge in its walled grounds", function () { sxGo("cab", "🐴 <b>Upper Norwood.</b> Big houses behind high walls, the trees dripping; Pondicherry Lodge along the road."); });
go("bx", "🧱", "To Brixton and Camberwell", "Thaddeus Sholto's; Mrs Cecil Forrester's", function () { sxGo("bxcab", "🐴 <b>Brixton.</b> 'Long lines of dull brick houses... relieved by the coarse glare and tawdry brilliancy of public-houses at the corner.'"); });
go("kl", "🐕", "To Kennington and Lambeth", "Pinchin Lane, Sherman's; Nine Elms; Broad Street and the river", function () { sxGo("klcab", "🐴 <b>Kennington Lane.</b> Shops and lamps; Pinchin Lane is off it, the river below."); });
go("lyc", "🎭", "To the Lyceum Theatre", "Wellington Street: the third pillar from the left", function () { sxLyc(); });
go("bk", "🔎", "To 221B Baker Street", "Up the seventeen steps to the sitting-room", function () { shkGoIn("ws_baker"); });
go("ww", "⚓", "To Westminster Wharf", "The river: the police launch, the Pool, the Tower", function () { sjGo("wwharf"); });
go("ps", "🚓", "To the police station", "Inspector Athelney Jones", function () { shkGoIn("sx_police"); });
if (typeof szGo === "function")
go("sz", "🔎", "To A Study in Scarlet's London", "Piccadilly, Barts, the Brixton Road, 1881", function () { szGo("cab"); });
if (typeof hbGo === "function")
go("hb", "🐕", "To the Hound's London", "Regent Street, the Northumberland Hotel", function () { hbGo("cab"); });
if (typeof bsGo === "function")
go("bs", "🚪", "To Baker Street", "The street, 221B's black door", function () { bsGo("door"); });
if (typeof wsmGo === "function")
go("wsm", "🕰️", "To Westminster", "Whitehall, Big Ben, the Abbey", function () { wsmGo("cab"); });
go("gos", "🏥", "To Great Ormond Street", "London, 1912: the hospital, Queen Square", function () { dlnGo(); });
go("book", "🔎", "The book", "The Sign of the Four: all twelve chapters", function () { sxbOpen(); });
worldCard(worldFacts("🐴 A hansom cab", SHK.inside ? "At the door" : "London, 1888", [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("sxl", "🔎 To The Sign of the Four's London", "Pondicherry Lodge, Brixton, Pinchin Lane and the river, 1888");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); sxGo("cab", "🔎 <b>Upper Norwood, 1888.</b> The cab sets you down on the Norwood road: from here, a cab to anywhere in this London."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function () {
var b = "", fns = {}, go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); fn(); }; };
go("ww", "⚓", "Westminster Wharf", "The Thames, 1888", function () { sjGo("wwharf"); });
go("ja", "🛠️", "Jacobson's Yard", "By the Tower", function () { sjGo("jacob"); });
go("ma", "🌾", "The Plumstead Marshes", "Where the Aurora ran ashore", function () { sjGo("marsh"); });
go("ag", "🏯", "The fort at Agra", "1857: Small's story", function () { sjGo("agra"); });
go("bl", "🌴", "Blair Island", "The convict station in the Andamans", function () { sjGo("blair"); });
go("ldn", "🐴", "Back to London", "Upper Norwood", function () { sxGo("cab"); });
worldCard(worldFacts("🧭 The Sign of the Four: the far land", "The river, Agra and the Andamans", [], []) + b, fns);
},
function () {
var lite = !!SXU.lite, G = new THREE.Group();
G.name = "sx-carpet";
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var K = [{ k: "grass", c: 1.3, N: lite ? 28 : 64, geo: sjTuftGeo(9, 0.5, 0.06, 0.5, 0x5A6A2A, 0xC8C080, 21), cols: [0xFFFFFF, 0xE8E0C0, 0xD8E0A0, 0xF0E8D0], den: 0.8 },
{ k: "fern", c: 1.8, N: lite ? 20 : 46, geo: sjTuftGeo(12, 0.7, 0.14, 0.8, 0x2A4A1A, 0x6A9A3A, 22), cols: [0xFFFFFF, 0xE0F0D0, 0xC8D8B0], den: 0.6 },
{ k: "bloom", c: 3.2, N: lite ? 10 : 24, geo: sjTuftGeo(5, 0.4, 0.05, 0.4, 0x4A6A2A, 0xE8C040, 23), cols: [0xFFFFFF, 0xF0A0C0, 0xA0B0F0, 0xF0F0F0], den: 0.5 }];
K.forEach(function (k, ki) { var m = new THREE.InstancedMesh(k.geo, mat, k.N * k.N); m.frustumCulled = false; k.m = m; k.cx = null; k.seed = ki * 19 + 5; G.add(m); });
return { g: G, K: K };
},
function (k, ix, iz, M, Q, E, S, V, C) {
var h1 = sjHash(ix, iz, k.seed), h2 = sjHash(ix, iz, k.seed + 1), h3 = sjHash(ix, iz, k.seed + 2), x = (ix + h1) * k.c, z = (iz + h2) * k.c, ok = h3 < k.den;
if (ok && (x < SXU_R.x0 || x > SXU_R.x1 || z < SXU_R.z0 || z > SXU_R.z1))
ok = false;
var y = ok ? sjH(x, z) : 0;
if (ok) {
var reg = sjRegion(x, z), w = y < 0.5 ? 0 : reg === "river" ? (x > 820 && k.k === "grass" ? 0.95 : x > -250 && x < 50 && z > -460 ? 0.6 : 0) : reg === "agra" ? (k.k === "fern" ? 0.05 : k.k === "bloom" ? 0.15 : 0.7) : (k.k === "bloom" ? 0.3 : 0.95);
if (sjHash(ix, iz, k.seed + 3) > w)
ok = false;
if (ok) {
for (var i = 0; i < SXU_FLAT.length; i++) {
var F = SXU_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r * 0.75) {
ok = false;
break;
}
}
}
if (ok && sjLineD(SXU_JUMNA, x, z).d < SXU_JW + 3)
ok = false;
}
if (!ok) {
S.set(0, 0, 0);
V.set(0, -50, 0);
M.compose(V, Q.set(0, 0, 0, 1), S);
return 0;
}
var s = 0.65 + sjHash(ix, iz, k.seed + 4) * 0.8;
E.set(0, sjHash(ix, iz, k.seed + 5) * 6.28, 0);
Q.setFromEuler(E);
S.set(s, s * (0.8 + h3 * 0.5), s);
V.set(sjX(x), y - 0.06, sjZ(z));
M.compose(V, Q, S);
C.setHex(k.cols[(sjHash(ix, iz, k.seed + 6) * k.cols.length) | 0]);
return 1;
},
function (L, on) {
if (!SXU.built || !SXU.live)
return;
if (!SXU.carpet) {
if (!on)
return;
SXU.carpet = sjCarpetMake();
SXU.live.add(SXU.carpet.g);
}
SXU.carpet.g.visible = on;
if (!on)
return;
var ML = sjLocal(L.x, L.z), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3(), Cc = new THREE.Color();
SXU.carpet.K.forEach(function (k) {
var N = k.N, h = N >> 1, cx = Math.floor(ML.x / k.c), cz = Math.floor(ML.z / k.c);
if (cx === k.cx && cz === k.cz)
return;
var all = k.cx == null || Math.abs(cx - k.cx) >= N || Math.abs(cz - k.cz) >= N, n = 0;
for (var iz = cz - h; iz < cz - h + N; iz++)
for (var ix = cx - h; ix < cx - h + N; ix++) {
if (!all && ix >= k.cx - h && ix < k.cx - h + N && iz >= k.cz - h && iz < k.cz - h + N)
continue;
var sx = ((ix % N) + N) % N, sx = ((iz % N) + N) % N, idx = sx * N + sx;
sjCarpetCell(k, ix, iz, M, Q, E, S, V, Cc);
k.m.setMatrixAt(idx, M);
k.m.setColorAt(idx, Cc);
n++;
}
k.cx = cx;
k.cz = cz;
if (n) {
k.m.instanceMatrix.needsUpdate = true;
if (k.m.instanceColor)
k.m.instanceColor.needsUpdate = true;
}
});
},
function () {
var live = {};
for (var k in SXB.cast) {
var C = SXB.cast[k];
if (C && C.g && C.g.parent && C.c && C.c.name)
live[C.c.name] = 1;
}
var act = sxbActive(), here = SHK.inside, C0 = act ? SXB_CH[sxbS().ch] : null;
[SXL.home || [], SXU.home || []].forEach(function (list) {
list.forEach(function (H) {
var nm = H.T && H.T.name, off = !!(nm && live[nm]) || !!(C0 && nm && H.room === here && (C0.cast || []).some(function (c) { return c.name === nm; }));
if (off && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!off && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
if (H.T)
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
});
}
];
});
