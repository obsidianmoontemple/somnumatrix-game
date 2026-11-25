/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(397, function () {
"use strict";
return [
function () {
var lv = thxLevel(), L = THX_LEVELS[lv], who = (typeof myName === "function" && myName()) || ((typeof session !== "undefined" && session && session.user && session.user.email) ? session.user.email.split("@")[0] : "Visitor");
var why = { keeper: "the Keeper", card: "issued by the Keeper" + (THX.card && THX.card.note ? ": " + THX.card.note : ""), job: "your post in the Tower", signed: "every signed-in dreamer", visitor: "sign in for a Guest card" }[THX.from] || "";
return "<div style='margin:8px 0;border-radius:10px;padding:12px 14px;background:linear-gradient(135deg,#0E1622,#1A2636);border:2px solid " + L.c + ";position:relative;overflow:hidden'>" +
"<svg width='70' height='70' viewBox='0 0 70 70' style='position:absolute;right:-6px;top:-6px;opacity:.35'><g fill='none' stroke='" + L.c + "' stroke-width='1'>" +
"<circle cx='35' cy='35' r='10'/><circle cx='35' cy='35' r='20'/><circle cx='35' cy='35' r='30'/>" + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return "<line x1='35' y1='35' x2='" + (35 + Math.cos(a) * 34).toFixed(1) + "' y2='" + (35 + Math.sin(a) * 34).toFixed(1) + "'/>"; }).join("") + "</g></svg>" +
"<div style='font:600 11px var(--sans,system-ui);letter-spacing:.18em;color:" + L.c + "'>SOMNUCOR TOWER · ACCESS CARD</div>" +
"<div style='font:600 18px var(--serif,Georgia);color:#F4F2EC;margin-top:4px'>" + thxEsc(who) + "</div>" +
"<div style='margin-top:4px;color:#DDE4EE'>Level <b style='color:" + L.c + "'>" + lv + " · " + L.n + "</b></div>" +
"<div style='font-size:12px;opacity:.75;margin-top:2px'>Opens " + thxEsc(lv ? THX_LEVELS.slice(1, lv + 1).map(function (x) { return x.say; }).join("; ") : "the lobby") + "</div>" +
"<div style='font-size:11px;opacity:.6;margin-top:4px'>" + thxEsc(why) + "</div></div>";
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (THX.mats[k])
return THX.mats[k];
var m = new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
THX.mats[k] = m;
return m;
},
function (w, h, x, y, z, ry, draw, parent, px) {
var cv = document.createElement("canvas"), sc = px || 128;
cv.width = Math.max(64, Math.round(w * sc));
cv.height = Math.max(32, Math.round(h * sc));
var c = cv.getContext("2d");
try {
draw(c, cv.width, cv.height);
}
catch (e) { }
var t = new THREE.CanvasTexture(cv), m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
m.userData.keep = 1;
(parent || THX.F).add(m);
var fr = thxBox(w + 0.08, h + 0.08, 0.05, thxMat(0x14161A, null), x - Math.sin(ry || 0) * 0.03, y, z - Math.cos(ry || 0) * 0.03, parent);
fr.rotation.y = ry || 0;
m.userData.redraw = function (fn) { try {
fn(c, cv.width, cv.height);
t.needsUpdate = true;
}
catch (e) { } };
return m;
},
function (c, lines, W, H, o) {
o = o || {};
c.fillStyle = o.bg || "#0C1420";
c.fillRect(0, 0, W, H);
var y = o.pad || 14, sz = o.size || Math.round(H / 9);
lines.forEach(function (L, i) { var s = (i === 0 && !o.flat) ? Math.round(sz * 1.25) : sz; c.font = (i === 0 && !o.flat ? "bold " : "") + s + "px sans-serif"; c.fillStyle = i === 0 ? (o.head || "#4AE8FF") : (o.fg || "#DDE6F0"); c.fillText(L, o.pad || 14, y + s); y += s * 1.35; });
},
function (dir, a, b, c, y, h, t, mat, opens, o) {
o = o || {};
opens = (opens || []).filter(Boolean).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, m, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
thxBox(len, hh, t, m, mid, y0 + hh / 2, c);
else
thxBox(t, hh, len, m, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
thxSolid(mid, c, len / 2, t / 2, y0, hh);
else
thxSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2);
seg(cur, s0, y, y + h, mat, true);
var top = Math.min(h, O.h || 2.3);
if (O.glass) {
var sill = O.sill || 0;
seg(s0, s1, y, y + sill, mat, true);
seg(s0, s1, y + top, y + h, mat, false);
var mid = (s0 + s1) / 2, len = s1 - s0, gh = top - sill;
if (dir === "x")
thxBox(len, gh, 0.04, thxGlass(O.tint), mid, y + sill + gh / 2, c);
else
thxBox(0.04, gh, len, thxGlass(O.tint), c, y + sill + gh / 2, mid);
if (dir === "x")
thxSolid(mid, c, len / 2, 0.12, y, h);
else
thxSolid(c, mid, 0.12, len / 2, y, h);
var fr = thxMat(0x2E3238, "metal"), n = Math.max(1, Math.round(len / 1.5));
for (var i = 0; i <= n; i++) {
var p = s0 + len * i / n;
if (dir === "x")
thxBox(0.05, gh, 0.08, fr, p, y + sill + gh / 2, c);
else
thxBox(0.08, gh, 0.05, fr, c, y + sill + gh / 2, p);
}
}
else {
seg(s0, s1, y + top, y + h, mat, false);
var frm = thxMat(O.frame || 0x9AA2AC, "metal");
if (dir === "x") {
thxBox(0.07, top, t + 0.05, frm, s0, y + top / 2, c);
thxBox(0.07, top, t + 0.05, frm, s1, y + top / 2, c);
thxBox(s1 - s0 + 0.14, 0.07, t + 0.05, frm, (s0 + s1) / 2, y + top, c);
}
else {
thxBox(t + 0.05, top, 0.07, frm, c, y + top / 2, s0);
thxBox(t + 0.05, top, 0.07, frm, c, y + top / 2, s1);
thxBox(t + 0.05, 0.07, s1 - s0 + 0.14, frm, c, y + top, (s0 + s1) / 2);
}
if (O.lv)
thxCardDoor(dir, (s0 + s1) / 2, c, y, s1 - s0, top, O.lv, O.name || "this door", O.ry);
}
cur = s1;
});
seg(cur, hi, y, y + h, mat, true);
if (o.skirt) {
var sk = thxMat(0x2A2C30, null);
if (dir === "x")
thxBox(hi - lo, 0.1, t + 0.03, sk, (lo + hi) / 2, y + 0.05, c);
else
thxBox(t + 0.03, 0.1, hi - lo, sk, c, y + 0.05, (lo + hi) / 2);
}
},
function (dir, p, c, y, w, h, lv, name) {
var L = THX_LEVELS[lv] || THX_LEVELS[5], g = new THREE.Group();
g.userData.keep = 1;
THX.F.add(g);
var leaf = new THREE.Mesh(new THREE.BoxGeometry(dir === "x" ? w - 0.04 : 0.06, h - 0.04, dir === "x" ? 0.06 : w - 0.04), thxGlass(0xB8DCE8));
leaf.position.set(dir === "x" ? p : c, y + h / 2, dir === "x" ? c : p);
g.add(leaf);
var bar = new THREE.Mesh(new THREE.BoxGeometry(dir === "x" ? w - 0.1 : 0.08, 0.08, dir === "x" ? 0.08 : w - 0.1), thxGlow(parseInt(L.c.slice(1), 16)));
bar.position.set(dir === "x" ? p : c, y + 1.1, dir === "x" ? c : p);
g.add(bar);
var rx = dir === "x" ? p + w / 2 + 0.25 : c + 0.12, rz = dir === "x" ? c + 0.12 : p + w / 2 + 0.25;
var reader = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.05), thxMat(0x1A1C20, null));
reader.position.set(rx, y + 1.3, rz);
g.add(reader);
var lamp = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), thxGlow(0xD83A3A));
lamp.position.set(rx, y + 1.42, rz);
g.add(lamp);
var sol = dir === "x" ? thxSolid(p, c, w / 2, 0.12, y, h) : thxSolid(c, p, 0.12, w / 2, y, h);
var D = { g: g, leaf: leaf, bar: bar, lamp: lamp, sol: sol, lv: lv, name: name, dir: dir, p: p, c: c, w: w, open: false, x: dir === "x" ? p : c, z: dir === "x" ? c : p };
(THX.doors = THX.doors || []).push(D);
thxSign([L.n.toUpperCase() + " · LEVEL " + lv, name], Math.min(1.8, w + 0.4), 0.34, "#0E1622", L.c, dir === "x" ? p : c + 0.0, y + h + 0.3, dir === "x" ? c + 0.07 : p, dir === "x" ? 0 : Math.PI / 2);
return D;
},
function () {
var lv = thxLevel(), P = worldLocal(), near = null;
(THX.doors || []).forEach(function (D) {
var ok = lv >= D.lv, d = Math.hypot(P.x - D.x, P.z - D.z);
if (ok && !D.open && d < 3.2) {
D.open = true;
D.lamp.material = thxGlow(0x3AE86A);
var i = THX.solids.indexOf(D.sol);
if (i >= 0)
THX.solids.splice(i, 1);
}
if (D.open && (d > 4.5 || !ok)) {
D.open = false;
D.lamp.material = thxGlow(0xD83A3A);
if (THX.solids.indexOf(D.sol) < 0)
THX.solids.push(D.sol);
}
var want = D.open ? D.w * 0.92 : 0, cur = D.slide || 0, nx = cur + (want - cur) * 0.25;
D.slide = nx;
if (D.dir === "x")
D.leaf.position.x = D.p + nx;
else
D.leaf.position.z = D.p + nx;
if (!ok && d < 1.8 && !near)
near = D;
});
if (near && (!THX.toldDoor || Date.now() - THX.toldDoor > 6000)) {
THX.toldDoor = Date.now();
thxSay("🔒 <b>" + thxEsc(near.name) + "</b> needs a <b>level " + near.lv + " " + thxLvName(near.lv) + "</b> card. Yours is level " + lv + " (" + thxLvName(lv) + ").");
}
},
function (x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var top = thxMat(o.top || 0xE8E4DC, "wood"), leg = thxMat(0x3A3E44, "metal"), blk = thxMat(0x16181C, null), scr = thxMat(0x2A5A7A, null, { e: 0x1A4A6A, ei: 0.8 });
thxBox(1.6, 0.04, 0.8, top, 0, 0.73, 0, g);
[[-0.76, 0], [0.76, 0]].forEach(function (p) { thxBox(0.05, 0.72, 0.7, leg, p[0], 0.36, p[1], g); });
thxBox(0.6, 0.36, 0.03, blk, -0.2, 1.12, -0.25, g);
thxBox(0.56, 0.32, 0.01, scr, -0.2, 1.12, -0.233, g);
thxBox(0.06, 0.2, 0.06, blk, -0.2, 0.85, -0.27, g);
if (o.two) {
thxBox(0.6, 0.36, 0.03, blk, 0.45, 1.12, -0.2, g);
thxBox(0.56, 0.32, 0.01, scr, 0.45, 1.12, -0.183, g);
}
thxBox(0.44, 0.02, 0.15, blk, 0, 0.76, 0.05, g);
if (o.headset) {
thxBox(0.18, 0.04, 0.18, thxMat(0x22252A, null), 0.6, 0.77, 0.1, g);
}
if (o.chair !== false) {
thxBox(0.5, 0.07, 0.5, thxMat(o.seat || 0x2A3A5A, null), 0, 0.48, 0.62, g);
thxBox(0.5, 0.6, 0.07, thxMat(o.seat || 0x2A3A5A, null), 0, 0.82, 0.86, g);
thxCyl(0.04, 0.42, leg, 0, 0.24, 0.62, g, 6);
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x + s * 0.1, z + c * 0.1, Math.abs(c) * 0.82 + Math.abs(s) * 0.45, Math.abs(s) * 0.82 + Math.abs(c) * 0.45, y, 1.2);
return g;
},
function (x, y, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var f = thxMat(col || 0x2A3A5A, null), l = thxMat(0x3A3E44, "metal");
thxBox(0.46, 0.06, 0.46, f, 0, 0.46, 0, g);
thxBox(0.46, 0.46, 0.06, f, 0, 0.7, 0.2, g);
[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(function (p) { thxBox(0.03, 0.46, 0.03, l, p[0], 0.23, p[1], g); });
},
function (x, y, z, big) {
var pot = thxMat(0x2E2E32, null), lf = thxMat(0x3A7A3A, null), s = big ? 1.5 : 1;
thxCyl(0.25 * s, 0.5 * s, pot, x, y + 0.25 * s, z, null, 10, 0.2 * s);
for (var i = 0; i < 5; i++) {
var m = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 8, 6), lf);
m.position.set(x + Math.cos(i * 1.3) * 0.15 * s, y + (0.75 + i * 0.12) * s, z + Math.sin(i * 1.3) * 0.15 * s);
m.scale.y = 1.4;
THX.F.add(m);
}
thxRound(x, z, 0.3 * s, 1.4 * s);
},
function (x, y, z, ry, w, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var m = thxMat(col || 0x3A4A5E, null);
thxBox(w, 0.42, 0.85, m, 0, 0.21, 0, g);
thxBox(w, 0.5, 0.2, m, 0, 0.62, 0.33, g);
thxBox(0.2, 0.6, 0.85, m, -w / 2 + 0.1, 0.3, 0, g);
thxBox(0.2, 0.6, 0.85, m, w / 2 - 0.1, 0.3, 0, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s) * 0.45, Math.abs(s) * w / 2 + Math.abs(c) * 0.45, y, 0.9);
},
function (x, y, z, w, ry, kind) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var fr = thxMat(0xD8DCE0, "metal");
thxBox(w, 1.9, 0.04, fr, 0, 0.95, -0.18, g);
for (var l = 0; l < 4; l++) {
var yy = 0.3 + l * 0.45;
thxBox(w, 0.03, 0.4, fr, 0, yy, 0, g);
for (var i = 0; i < Math.floor(w / 0.22); i++) {
var cx = -w / 2 + 0.14 + i * 0.22;
if (kind === "bottles") {
var col = [0x6A3A1A, 0xE8ECEE, 0x2A4A8A, 0x3A7A3A, 0xC8A030][(i + l * 3) % 5];
thxCyl(0.06, 0.22, thxMat(col, null), cx, yy + 0.13, 0, g, 8);
thxCyl(0.03, 0.05, thxMat(0x1A1A1A, null), cx, yy + 0.27, 0, g, 6);
}
else if (kind === "books") {
var bh = 0.24 + ((i * 7 + l * 3) % 4) * 0.03;
thxBox(0.06 + ((i + l) % 3) * 0.015, bh, 0.24, thxMat([0x7A3B32, 0x3E6A5A, 0x6B4E8C, 0xC9A45C, 0x2E3E52, 0x8A5A34][(i * 5 + l) % 6], null), cx, yy + 0.015 + bh / 2, 0, g);
}
else if (kind === "binders") {
thxBox(0.07, 0.32, 0.28, thxMat([0x2A4A8A, 0x8A2A2A, 0x3A6A3A, 0x5A5A5A][(i + l) % 4], null), cx, yy + 0.17, 0, g);
}
else {
thxCyl(0.05, 0.16, thxMat(0xBFE0EC, null, { op: 0.55 }), cx, yy + 0.1, 0, g, 8);
}
}
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s) * 0.22, Math.abs(s) * w / 2 + Math.abs(c) * 0.22, y, 1.9);
},
function (x, y, z, w, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var cab = thxMat(o.cab || 0xE4E6E8, "metal"), top = thxMat(0x1E2226, null);
thxBox(w, 0.86, 0.75, cab, 0, 0.43, 0, g);
thxBox(w + 0.02, 0.04, 0.78, top, 0, 0.88, 0, g);
for (var i = 0; i < Math.floor(w / 0.6); i++)
thxBox(0.02, 0.5, 0.01, thxMat(0x9AA0A6, null), -w / 2 + 0.3 + i * 0.6, 0.5, 0.38, g);
if (!o.noShelf) {
thxBox(w, 0.03, 0.25, thxMat(0xC8CCD0, "metal"), 0, 1.45, -0.25, g);
[-w / 2 + 0.05, w / 2 - 0.05].forEach(function (px) { thxBox(0.04, 0.56, 0.04, thxMat(0x9AA0A6, "metal"), px, 1.17, -0.3, g); });
for (var b = 0; b < Math.floor(w / 0.3); b++)
thxCyl(0.05, 0.18, thxMat([0x6A3A1A, 0xE8ECEE, 0x2A4A8A][b % 3], null), -w / 2 + 0.2 + b * 0.3, 1.56, -0.25, g, 8);
}
thxBox(0.5, 0.02, 0.4, thxMat(0x8A9098, "metal"), w / 2 - 0.4, 0.9, 0.05, g);
thxCyl(0.02, 0.35, thxMat(0xC8CCD0, "metal"), w / 2 - 0.4, 1.07, -0.2, g, 6);
var gl = thxMat(0xCFE8F0, null, { op: 0.5 });
thxCyl(0.05, 0.12, gl, -w / 2 + 0.5, 0.96, 0.1, g, 10);
thxCyl(0.075, 0.04, gl, -w / 2 + 0.85, 0.92, 0.05, g, 10);
thxCyl(0.015, 0.14, gl, -w / 2 + 0.85, 1.01, 0.05, g, 8);
for (var tt = 0; tt < 5; tt++)
thxCyl(0.012, 0.1, thxMat([0x4AE8FF, 0xC050FF, 0x6AF0C4, 0xFFD24A, 0xFF8A5A][tt], null, { op: 0.75 }), -0.2 + tt * 0.05, 0.96, 0.1, g, 6);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s) * 0.4, Math.abs(s) * w / 2 + Math.abs(c) * 0.4, y, 1.0);
return g;
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var bd = thxMat(0xE8ECEE, "metal");
thxBox(1.6, 0.86, 0.8, bd, 0, 0.43, 0, g);
thxBox(1.6, 1.3, 0.06, bd, 0, 1.55, -0.38, g);
thxBox(0.06, 1.3, 0.8, bd, -0.78, 1.55, 0, g);
thxBox(0.06, 1.3, 0.8, bd, 0.78, 1.55, 0, g);
thxBox(1.6, 0.4, 0.8, bd, 0, 2.4, 0, g);
thxBox(1.5, 0.8, 0.02, thxGlass(0xD8F0F8), 0, 1.5, 0.38, g);
thxBox(1.4, 0.04, 0.6, thxGlow(0xF4F8FF), 0, 2.18, 0, g);
thxCyl(0.18, 1.6, thxMat(0xB8BCC0, "metal"), 0.4, 3.3, -0.1, g, 10);
thxSign(["FUME CUPBOARD", "sash down when not in use"], 0.9, 0.22, "#E8ECEE", "#1A2632", 0, 2.4, 0.41, 0, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * 0.8 + Math.abs(s) * 0.4, Math.abs(s) * 0.8 + Math.abs(c) * 0.4, y, 2.6);
},
function (seed, x, z, ry, o) {
if (typeof wPerson !== "function")
return null;
o = o || {};
var sex = "m";
try {
sex = randomLook("w_thx_" + seed, "human").sex === "f" ? "f" : "m";
}
catch (e) { }
var g = null;
try {
g = wPerson("thx_" + seed, { title: o.title || "office worker" });
}
catch (e) {
g = null;
}
if (!g)
return null;
g.position.set(x, o.y || 0, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
THX.F.add(g);
var name = thxPersonName(seed, sex), age = o.age || (24 + ((typeof hash === "function" ? hash(seed + "a") : 7) % 38));
var P = { g: g, x: x, z: z, name: name, sex: sex, age: age, title: o.title || "office worker", doing: o.doing || "at work", about: o.about || "", wan: o.wander ? { r: o.wander } : null };
THX.people.push(P);
thxSpot(x, z, 2.4, "💬 " + name + " · " + P.title, "talk", function () { thxTalk(P); });
return P;
},
function (P) {
if (typeof openTalk !== "function")
return;
var row = THX.floor ? thxFloorRow(THX.floor) : null, where = row ? "the " + row[2] + " (" + row[1] + ") of the Somnucor Tower" : "the Somnucor Tower";
var persona = "You work as a " + P.title + " on " + where + ". " + (P.about || "") + " Right now you are " + P.doing + ". You are " + P.age + " years old. " +
"The Tower is run by WHITE WIDOW, its intelligence: you speak of her the way people speak of a trusted, quiet colleague. " +
"If they ask about chemistry or genetics, answer as someone who truly knows it, plainly and correctly; never give any recipe, amount or step for anything explosive, poisonous or that could make anyone ill: say such things are unstable or dangerous and leave it there.";
var key = "wtalk:thx:" + P.name, c = null;
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
var C = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: key, archetype: "human", name: P.name, aka: [], details: [persona], sessions: [store.session], awake: true, log: [],
x: C.x, z: C.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: C.x, z: C.z }, born: "", doing: P.doing, visible: false };
if (store.characters)
store.characters.push(c);
}
c.details[0] = persona;
c.doing = P.doing;
c.ftkSex = P.sex;
c.ftkAge = P.age;
c.x = C.x;
c.z = C.z;
c.visible = false;
worldPrompt(null);
openTalk(c);
},
function (F) {
var rooms = thxRoomRow(F, [{ n: "Records office", w: 7 }, { n: "Planning", w: 9, glassy: 1 }, { n: "Treasury clerks", w: 7, lv: 2 }, { n: "Meeting room", w: 6, glassy: 1 }, { n: "City Clerk", w: 6, lv: 2 }, { n: "Kitchen", w: 5 }], "n");
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Records office") {
for (var i = 0; i < 3; i++)
thxShelves(r.x0 + 0.4, 0, r.z0 + 1.4 + i * 2.2, 1, Math.PI / 2, "binders");
thxShelves(r.x1 - 0.4, 0, r.z0 + 2.2, 3.6, -Math.PI / 2, "binders");
thxDesk(r.cx + 0.6, 0, r.z1 - 1.6, Math.PI);
thxPerson("rec", r.cx + 0.6, r.z1 - 0.9, Math.PI, { title: "records keeper", doing: "filing deeds and the city's minutes" });
}
else if (k === "Planning") {
thxTable(r.cx, 0, r.cz - 0.6, 4.2, 2.6, thxMat(0x3A3E44, "metal"), 0.9);
var M = new THREE.Group();
M.position.set(r.cx, 0.97, r.cz - 0.6);
THX.F.add(M);
[1.2, 0.9, 0.6].forEach(function (rr, i) { var ring = new THREE.Mesh(new THREE.RingGeometry(rr - 0.12, rr, 40), thxMat([0x8AA07A, 0xC8C0B0, 0x9AA4AE][i], null, { ds: 1 })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.005 * (i + 1); M.add(ring); });
for (var b = 0; b < 46; b++) {
var a = b * 0.77, rr2 = 0.35 + (b % 9) * 0.1;
thxBox(0.08, 0.05 + (b % 5) * 0.04, 0.08, thxMat(0xE8E4DC, null), Math.cos(a) * rr2, 0.04, Math.sin(a) * rr2, M);
}
thxBox(0.1, 0.5, 0.1, thxGlass(0x8FD8F0), 0, 0.25, 0, M);
thxPerson("plan", r.cx + 2.6, r.cz + 0.8, -Math.PI / 2, { title: "city planner", doing: "walking a new street through the model" });
}
else if (k === "Treasury clerks") {
thxDesk(r.cx - 1.4, 0, r.cz, Math.PI);
thxDesk(r.cx + 1.4, 0, r.cz, Math.PI);
thxBox(1.0, 1.5, 0.8, thxMat(0x3A3E44, "metal"), r.x1 - 0.8, 0.75, r.z0 + 0.8);
thxSolid(r.x1 - 0.8, r.z0 + 0.8, 0.5, 0.4, 0, 1.5);
thxPerson("treas", r.cx - 1.4, r.cz + 0.7, Math.PI, { title: "treasury clerk", doing: "counting the day's takings into the city's books" });
}
else if (k === "Meeting room") {
thxTable(r.cx, 0, r.cz, 3.2, 1.3, thxMat(0x5A4030, "wood"));
for (var c = 0; c < 4; c++) {
thxChair(r.cx - 1.2 + c * 0.8, 0, r.cz - 1.0, 0);
thxChair(r.cx - 1.2 + c * 0.8, 0, r.cz + 1.0, Math.PI);
}
thxScreen(2.2, 1.2, r.cx, 1.6, r.z0 + 0.1, 0, function (c, W, H) { thxText(c, ["Ring Road works", "Week 3 of 10 · on time", "Closures: Crescent north side"], W, H); });
}
else if (k === "City Clerk") {
thxDesk(r.cx, 0, r.cz - 0.6, 0, { top: 0x6A4A32 });
thxShelves(r.x0 + 0.4, 0, r.cz, 2.4, Math.PI / 2, "binders");
thxPlant(r.x1 - 0.6, 0, r.z0 + 0.6);
thxPerson("clerk", r.cx, r.cz - 1.3, 0, { title: "City Clerk", doing: "signing the week's licences" });
}
else if (k === "Kitchen") {
thxCounter(r.cx, 0, r.z0 + 0.5, r.x1 - r.x0 - 0.4, 0.7, 0xE8E4DC, "tile");
thxTable(r.cx, 0, r.cz + 0.8, 1.6, 0.9);
thxChair(r.cx - 0.5, 0, r.cz + 1.6, Math.PI);
thxChair(r.cx + 0.5, 0, r.cz + 0.0, 0);
}
});
var cz = -5.5;
thxCounter(0, 0, cz, 16, 0.8, 0xD8CCB4, "wood");
thxWall("x", -8, 8, cz - 0.42, 0.95, 1.6, 0.04, thxGlass(0xCFE4EC), []);
for (var w = 0; w < 5; w++) {
var wx = -6.4 + w * 3.2;
thxSign(["WINDOW " + (w + 1)], 1.0, 0.26, "#1A2230", "#F4F2EC", wx, 2.75, cz + 0.42, 0);
thxDesk(wx, 0, cz - 1.2, Math.PI, { chair: true });
if (w < (THX.lite ? 2 : 4))
thxPerson("win" + w, wx, cz - 1.9, 0, { title: ["permits officer", "city clerk", "licensing officer", "permits officer"][w], doing: "seeing the next dreamer in the queue" });
}
thxScreen(3.0, 1.0, 0, 3.2, cz + 0.45, 0, function (c, W, H) { thxText(c, ["NOW SERVING", "A-214 → window 2    B-087 → window 4", "Permits · licences · records · rates"], W, H, { head: "#FFD24A" }); });
for (var r2 = 0; r2 < 3; r2++)
for (var s = 0; s < 6; s++) {
var sx = -6 + s * 2.4;
thxChair(sx - 0.3, 0, 1.5 + r2 * 2.2, Math.PI, 0x2E3E52);
thxChair(sx + 0.3, 0, 1.5 + r2 * 2.2, Math.PI, 0x2E3E52);
thxSolid(sx, 1.5 + r2 * 2.2, 0.6, 0.3, 0, 0.9);
}
thxBox(0.5, 1.3, 0.4, thxMat(0x2A3038, "metal"), 9.5, 0.65, -1.5);
thxBox(0.4, 0.3, 0.01, thxGlow(0x4AE8FF), 9.5, 1.1, -1.29);
thxSolid(9.5, -1.5, 0.25, 0.2, 0, 1.3);
thxSign(["TAKE A TICKET"], 0.8, 0.22, "#1A2230", "#FFD24A", 9.5, 1.55, -1.29, 0);
thxSpot(0, cz + 1.3, 3.2, "🏛️ Permits and licences", "ask at the counter", function () { thxCityCard(); });
[-19, 19].forEach(function (x) { for (var i = 0; i < 3; i++)
for (var j = 0; j < 2; j++)
thxDesk(x + (j ? 2.2 : -2.2), 0, -9 + i * 4.2, j ? -Math.PI / 2 : Math.PI / 2, { two: true }); });
thxPerson("open1", -17, -4.8, Math.PI / 2, { title: "city clerk", doing: "answering the post", wander: 2 });
thxPerson("open2", 17, -0.6, -Math.PI / 2, { title: "rates officer", doing: "working out the quarter's rates" });
thxPlant(-12, 0, 10, 1);
thxPlant(12, 0, 10, 1);
},
function () {
var b = worldBtn("lic", "📜 Licences and permits", "Your licences, and how to get one") + worldBtn("job", "💼 Work in the Tower", "The Tower's posts on the job board: city clerk, permits officer and more") + worldBtn("card", "🪪 My access card", "What your card opens");
worldCard(worldFacts("🏛️ City Offices · permits and licences", "The city's front counter. Five windows, open every hour the city is.", [["Building permits", "the City Planner and the Keeper decide"], ["Trade licences", "from the business panel"], ["Records", "deeds, minutes, the city's books"]], ["Talk to anyone at the windows: they answer for themselves."]) + b, {
lic: function () { worldCard(null); if (typeof openLicences === "function")
openLicences();
else
thxSay("Your licences are on your business panel (☰ Menu → Your work and your purse)."); },
job: function () { worldCard(null); thxSay("The Tower's posts are on the job board (☰ Menu → Your work and your purse → Job board): city clerk, permits officer, call centre, research, chemistry tutor, clean room, drone hub, genetics, containment trainer, security."); },
card: function () { worldCard(worldFacts("🪪 Your access card", "", [], []) + thxCardHtml(), {}); }
});
},
function (F) {
var rooms = thxRoomRow(F, [{ n: "Supervisor", w: 6, glassy: 1, lv: 2 }, { n: "Training room", w: 9, glassy: 1 }, { n: "Quiet booth", w: 3.4 }, { n: "Quiet booth", w: 3.4 }, { n: "Quiet booth", w: 3.4 }, { n: "Break room", w: 8 }], "n");
rooms.forEach(function (r, i) {
var k = r.R.n;
if (k === "Supervisor") {
thxDesk(r.cx, 0, r.cz - 0.5, 0, { two: true });
thxScreen(1.8, 1.0, r.cx, 1.7, r.z0 + 0.1, 0, function (c, W, H) { thxText(c, ["Today", "Calls answered 1,284", "Average wait 0:41", "Dropped 0.6%"], W, H); });
}
else if (k === "Training room") {
for (var a = 0; a < 2; a++)
for (var b = 0; b < 3; b++)
thxDesk(r.x0 + 1.4 + b * 2.2, 0, r.cz - 1 + a * 2.2, Math.PI, { headset: 1 });
thxScreen(2.6, 1.3, r.cx, 1.7, r.z0 + 0.1, 0, function (c, W, H) { thxText(c, ["CALL HANDLING", "1 Greet and give your name", "2 Listen: let them finish", "3 Repeat back what you heard", "4 Say what happens next"], W, H); });
}
else if (k === "Quiet booth") {
thxDesk(r.cx, 0, r.cz - 0.8, 0, { headset: 1 });
thxBox(r.x1 - r.x0, 1.6, 0.06, thxMat(0x6A7A8A, null), r.cx, 0.8, r.z0 + 0.05);
}
else if (k === "Break room") {
thxCounter(r.cx, 0, r.z0 + 0.5, r.x1 - r.x0 - 0.4, 0.7, 0xE8E4DC, "tile");
thxSofa(r.cx, 0, r.z1 - 1.0, Math.PI, 3.0, 0x8A4A3A);
thxTable(r.cx, 0, r.cz, 1.4, 0.8);
thxPerson("brk", r.cx + 1.2, r.cz + 0.2, -Math.PI / 2, { title: "call centre operator", doing: "on a tea break between calls" });
}
});
var rows = [-8.5, -3.5, 1.5, 6.5], n = 0;
rows.forEach(function (z, ri) {
for (var i = 0; i < 5; i++) {
var x = -11 + i * 5.5;
thxDesk(x - 1.1, 0, z - 0.6, 0, { headset: 1, chair: true });
thxDesk(x + 1.1, 0, z - 0.6, 0, { headset: 1 });
thxDesk(x - 1.1, 0, z + 0.6, Math.PI, { headset: 1 });
thxDesk(x + 1.1, 0, z + 0.6, Math.PI, { headset: 1 });
thxBox(4.4, 0.5, 0.05, thxMat(0x4A6A8A, null), x, 1.0, z);
if ((i + ri) % 2 === 0 && n < (THX.lite ? 4 : 9)) {
thxPerson("op" + n, x - 1.1, z - 1.3 + (n % 2 ? 2.6 : 0), n % 2 ? Math.PI : 0, { title: "call centre operator", doing: ["taking a call on the deliveries line", "logging a report for the crime line", "talking someone through a lost order", "passing an emergency to the Keeper's line"][n % 4] });
n++;
}
}
});
var board = thxScreen(7.2, 2.6, F.x0 + 0.35, 2.2, -1, Math.PI / 2, function (c, W, H) { thxCallBoard(c, W, H); }, null, 96);
THX.fx.push(function (dt, t) { board.userData.t = (board.userData.t || 0) + dt; if (board.userData.t > 4) {
board.userData.t = 0;
board.userData.redraw(function (c, W, H) { thxCallBoard(c, W, H); });
} });
thxSpot(F.x0 + 2.2, -1, 3, "📞 The call board", "read it", function () { thxCallCard(); });
thxCyl(1.6, 0.95, thxMat(0xE8E4DC, "wood"), 14, 0.475, -1, null, 24);
thxRound(14, -1, 1.6, 1);
thxPerson("sup", 14, -2.9, 0, { title: "call centre supervisor", doing: "watching the queue and moving people to the busy lines" });
},
function (c, W, H) {
c.fillStyle = "#08101A";
c.fillRect(0, 0, W, H);
c.fillStyle = "#4AE8FF";
c.font = "bold " + Math.round(H / 10) + "px sans-serif";
c.fillText("SOMNUCOR LINES", 16, H / 8);
var t = Date.now() / 60000, L = [["Crime line · Dragon Corp", "#FF8A5A"], ["Deliveries", "#6AF0C4"], ["Keeper's emergency line", "#F4F4F8"], ["Work and shifts", "#FFD24A"], ["Lost and found", "#C8A0FF"]];
L.forEach(function (l, i) {
var y = H / 5 + i * H / 6.2, q = Math.round(4 + 6 * (0.5 + 0.5 * Math.sin(t * 0.7 + i * 1.9))), w = (W - 40) * (q / 14);
c.fillStyle = "#DDE6F0";
c.font = Math.round(H / 14) + "px sans-serif";
c.fillText(l[0], 16, y + H / 14);
c.fillStyle = "#1A2636";
c.fillRect(16, y + H / 11, W - 40, H / 22);
c.fillStyle = l[1];
c.fillRect(16, y + H / 11, w, H / 22);
c.fillStyle = "#9AA8B8";
c.fillText(q + " waiting", W - 150, y + H / 14);
});
},
function () {
worldCard(worldFacts("📞 The Call Centre", "Every call in Somnucor that needs a person comes through this floor.", [["Crime line", "reports go to Dragon Corp"], ["Deliveries", "shops' orders, tracked to your door"], ["Emergency line", "the Dragon Corp and the crews take it; only a case out of hand reaches the Keeper"], ["Work and shifts", "the city's people ring you about your work"]], ["Your own phone is in your pocket: ☰ Menu → Phone.", "The operators answer for themselves: walk up and talk to them."]) + worldBtn("ph", "📱 Open my phone", ""), { ph: function () { worldCard(null); try {
if (typeof PH !== "undefined" && typeof phPaint === "function") {
PH.open = true;
if (typeof phEls === "function")
phEls();
if (typeof phLoad === "function")
phLoad();
phPaint();
}
}
catch (e) { } } });
},
function (F) {
var rooms = thxRoomRow(F, [{ n: "Robotics", w: 9, glassy: 1, lv: 3 }, { n: "Optics and lasers", w: 8, lv: 3 }, { n: "Materials testing", w: 8, glassy: 1, lv: 3 }, { n: "Electronics", w: 7, glassy: 1, lv: 3 }, { n: "Drone workshop", w: 9, glassy: 1, lv: 3 }], "n");
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Robotics") {
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.6, 0, { noShelf: 1 });
var arm = new THREE.Group();
arm.position.set(r.cx - 1, 0.92, r.z0 + 0.6);
arm.userData.keep = 1;
THX.F.add(arm);
var or = thxMat(0xE86A1A, "metal");
thxCyl(0.18, 0.2, thxMat(0x2A2E34, "metal"), 0, 0.1, 0, arm);
var j1 = new THREE.Group();
j1.position.y = 0.2;
arm.add(j1);
thxBox(0.12, 0.6, 0.12, or, 0, 0.3, 0, j1);
var j2 = new THREE.Group();
j2.position.y = 0.6;
j1.add(j2);
thxBox(0.1, 0.1, 0.55, or, 0, 0, 0.27, j2);
thxBox(0.08, 0.14, 0.04, thxMat(0x2A2E34, null), 0, -0.06, 0.55, j2);
THX.fx.push(function (dt, t) { j1.rotation.y = Math.sin(t * 0.5) * 1.2; j2.rotation.x = -0.3 + Math.sin(t * 0.7) * 0.35; });
var bot = new THREE.Group();
bot.position.set(r.cx + 1.5, 0, r.cz + 1);
bot.userData.keep = 1;
THX.F.add(bot);
thxCyl(0.35, 0.3, thxMat(0xE8ECEE, "metal"), 0, 0.2, 0, bot, 20);
thxCyl(0.2, 0.08, thxGlow(0x4AE8FF), 0, 0.39, 0, bot, 16);
THX.fx.push(function (dt, t) { bot.position.x = r.cx + 1.5 + Math.sin(t * 0.3) * 1.5; bot.position.z = r.cz + 1 + Math.cos(t * 0.3) * 0.8; });
thxPerson("rob", r.cx + 0.6, r.z0 + 1.6, 0, { title: "research scientist", doing: "teaching the arm to pick up an egg without breaking it", about: "You build robots." });
}
else if (k === "Optics and lasers") {
thxTable(r.cx, 0, r.cz - 0.4, r.x1 - r.x0 - 1.4, 1.5, thxMat(0x2A2E34, "metal"), 0.85);
for (var i = 0; i < 6; i++)
thxCyl(0.04, 0.2, thxMat(0xC8CCD0, "metal"), r.x0 + 1.4 + i * 0.9, 0.98, r.cz - 0.4 + (i % 2 ? 0.3 : -0.3), null, 8);
thxBox(r.x1 - r.x0 - 1.8, 0.01, 0.01, thxGlow(0x3AE86A), r.cx, 1.02, r.cz - 0.4);
thxSign(["LASER IN USE", "Class 4 · goggles on · no watches or rings"], 1.6, 0.4, "#D8A010", "#1A1A1A", r.door.x + 1.6, 2.2, r.door.z + 0.1, 0);
thxPerson("opt", r.cx, r.cz + 1.2, Math.PI, { title: "research scientist", doing: "lining up mirrors on the optical table", about: "You work with lasers and light; you are strict about laser safety." });
}
else if (k === "Materials testing") {
var tt = r.cx - 1.5;
thxBox(1.0, 2.2, 0.7, thxMat(0x3A5A8A, "metal"), tt, 1.1, r.z0 + 0.6);
thxBox(0.5, 0.08, 0.4, thxMat(0xC8CCD0, "metal"), tt, 1.3, r.z0 + 0.95);
thxSolid(tt, r.z0 + 0.6, 0.5, 0.35, 0, 2.2);
thxBench(r.cx + 1.2, 0, r.z0 + 0.6, 3, 0, { noShelf: 1 });
thxCyl(0.1, 0.4, thxMat(0x2A2E34, null), r.cx + 0.8, 1.1, r.z0 + 0.6, null, 10);
thxPerson("mat", r.cx + 0.4, r.cz + 0.6, Math.PI, { title: "lab technician", doing: "pulling a steel bar until it necks and snaps" });
}
else if (k === "Electronics") {
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.6, 0);
thxScreen(0.5, 0.35, r.cx - 0.8, 1.15, r.z0 + 0.5, 0, function (c, W, H) { c.fillStyle = "#02140A"; c.fillRect(0, 0, W, H); c.strokeStyle = "#3AE86A"; c.lineWidth = 3; c.beginPath(); for (var x = 0; x < W; x++) {
var y = H / 2 + Math.sin(x / 9) * H / 4;
if (x)
c.lineTo(x, y);
else
c.moveTo(x, y);
} c.stroke(); });
thxPerson("elx", r.cx + 0.6, r.cz + 0.5, Math.PI, { title: "lab technician", doing: "soldering a flight controller" });
}
else if (k === "Drone workshop") {
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.6, 0, { noShelf: 1 });
var M = thxShellMats();
for (var q = 0; q < 3; q++) {
var Q = thxQuad(M);
Q.position.set(r.x0 + 1.4 + q * 2.2, 0.9, r.z0 + 0.6);
Q.userData.keep = 1;
THX.F.add(Q);
}
thxBox(0.6, 0.7, 0.6, thxMat(0xE8ECEE, "metal"), r.x1 - 0.8, 0.35, r.cz + 1);
thxBox(0.5, 0.5, 0.02, thxGlass(), r.x1 - 0.8, 0.45, r.cz + 1.31);
thxSolid(r.x1 - 0.8, r.cz + 1, 0.3, 0.3, 0, 0.7);
thxSign(["3D PRINTER"], 0.6, 0.18, "#1A2230", "#F4F2EC", r.x1 - 0.8, 0.85, r.cz + 1.32, 0);
thxPerson("drw", r.cx, r.cz + 0.8, Math.PI, { title: "drone hub engineer", doing: "changing the rotors on a delivery drone", about: "You keep the Tower's drones flying. You never discuss what else they do beyond deliveries and filming; you simply do not know." });
}
});
for (var i = 0; i < 4; i++)
for (var j = 0; j < 2; j++)
thxDesk(-14 + i * 3.2, 0, -3 + j * 1.6, j ? Math.PI : 0);
thxWall("x", 6, 18, -6, 0, THX_H, 0.12, thxMat(0xE6E8EA, "plaster"), [{ at: 9, w: 1.2, h: 2.3 }, { at: 14, w: 7, h: 2.8, glass: 1, sill: 0.1 }]);
thxWall("x", 6, 18, 4, 0, THX_H, 0.12, thxMat(0xE6E8EA, "plaster"), [{ at: 12, w: 10, h: 2.8, glass: 1, sill: 0.1 }]);
thxWall("z", -6, 4, 6, 0, THX_H, 0.12, thxMat(0xE6E8EA, "plaster"), []);
thxWall("z", -6, 4, 18, 0, THX_H, 0.12, thxMat(0xE6E8EA, "plaster"), []);
thxTable(12, 0, -1, 4, 1.6, thxMat(0xE8E4DC, "wood"));
thxSign(["THE IDEAS ROOM"], 1.6, 0.3, "#1A2230", "#FFD24A", 9, 2.75, -6.08, Math.PI);
thxScreen(3.2, 1.4, 12, 1.7, 3.9, Math.PI, function (c, W, H) { thxText(c, ["THIS WEEK", "Lighter rotor blades: −12% noise", "New sensor for the clean rooms", "Robot arm: egg test 9 of 10"], W, H, { bg: "#F4F6F8", head: "#1A4A9A", fg: "#2A3240" }); });
thxPerson("lead", 12, 1.2, Math.PI, { title: "research scientist", doing: "leading the morning's ideas meeting", about: "You head the Research Labs." });
},
function (F) {
var wm = thxMat(0xF0F2F4, "plaster");
thxWall("z", F.z0, F.z1, -10, 0, THX_H, 0.15, wm, [{ at: 9, w: 1.2, h: 2.3, lv: 0, name: "Gowning room" }]);
thxWall("x", -24, -10, -2, 0, THX_H, 0.15, wm, [{ at: -14, w: 1.4, h: 2.3, lv: 3, name: "Air shower" }]);
thxSign(["GOWNING ROOM", "clean side →"], 1.8, 0.36, "#E8ECEE", "#1A4A9A", -10.1, 2.75, 9, -Math.PI / 2);
for (var i = 0; i < 8; i++) {
thxBox(0.5, 1.9, 0.5, thxMat(i % 2 ? 0x8A9AAA : 0x9AAABA, "metal"), -23.5, 0.95, 0 + i * 0.55);
}
thxSolid(-23.5, 1.9, 0.25, 2.2, 0, 1.9);
thxBox(6, 0.45, 0.4, thxMat(0xE8ECEE, "metal"), -17, 0.225, 2.5);
thxSolid(-17, 2.5, 3, 0.2, 0, 0.45);
thxBox(6, 0.01, 0.4, thxGlow(0xFFD24A), -17, 0.46, 2.72);
thxBox(1.6, 0.02, 0.9, thxMat(0x4A6A9A, null), -11.8, 0.01, 9);
for (var g = 0; g < 6; g++) {
thxBox(0.45, 1.3, 0.06, thxMat(0xF4F6F8, null), -21 + g * 0.6, 1.5, -1.75);
}
thxBox(1.2, 1.8, 0.04, thxMat(0xB8C8D0, null), -12.5, 1.3, -1.85);
thxSign(["HOW TO GOWN", "press E at the bench"], 1.4, 0.4, "#E8ECEE", "#1A4A9A", -17, 2.6, -1.8, 0);
thxSpot(-17, 3.4, 3.2, "🥼 The gowning bench", "gown up, step by step", function () { thxGownCard(0); });
thxPerson("gown", -20, 5, Math.PI / 2, { title: "clean room technician", doing: "checking the gowns are in sizes for the shift", about: "You know clean room practice to the letter: ISO classes, gowning order, behaviour inside." });
thxBox(1.8, THX_H, 0.1, thxMat(0xC8CCD0, "metal"), -14, THX_H / 2, -3.6);
thxSolid(-14, -3.6, 0.9, 0.05, 0, THX_H);
for (var j = 0; j < 6; j++) {
thxCyl(0.04, 0.04, thxMat(0x5A6068, "metal"), -14.7 + (j % 3) * 0.7, 1 + (j > 2 ? 0.9 : 0), -2.2, null, 8);
}
thxBox(13.6, 0.06, 17.6, thxMat(0xF4F6F8, "metal"), -17, 0.03, -11);
thxFloorAt(-24, -20, -10, -2, 0.06);
for (var fx = -23; fx < -10; fx += 1.2)
for (var fz = -19.4; fz < -2.5; fz += 1.2)
thxBox(1.1, 0.02, 1.1, thxMat(0xE8ECEE, null, { e: 0xF4F8FF, ei: 0.35 }), fx + 0.5, THX_H - 0.04, fz + 0.5);
for (var h = 0; h < 3; h++)
thxFumeHood(-22.6, 0, -17 + h * 3.2, Math.PI / 2);
thxBench(-14, 0, -17, 5, 0, { noShelf: 1 });
thxBench(-14, 0, -12, 5, Math.PI, { noShelf: 1 });
thxBox(4, 0.02, 4, thxMat(0xF0D040, null, { op: 0.2 }), -14, THX_H - 0.1, -6);
thxSign(["YELLOW ROOM · photolithography", "light that will not spoil the resist"], 2.2, 0.4, "#F0D040", "#1A1A1A", -14, 2.9, -2.2, Math.PI);
var pc = thxScreen(1.2, 0.7, -10.2, 1.6, -8, -Math.PI / 2, function (c, W, H) { thxParticles(c, W, H); });
THX.fx.push(function (dt) { pc.userData.t = (pc.userData.t || 0) + dt; if (pc.userData.t > 3) {
pc.userData.t = 0;
pc.userData.redraw(thxParticles);
} });
thxSpot(-11.4, -8, 2.4, "📊 Particle counter", "read it and learn the classes", function () { thxIsoCard(); });
thxPerson("bay", -16, -14.5, 0, { title: "clean room technician", doing: "loading wafers into the hood in full gown", about: "You are in a full clean room gown. You know ISO 14644 classes and why each gowning step matters." });
thxBox(0.8, 0.8, 0.5, thxMat(0xC8CCD0, "metal"), -10, 1.2, -14);
thxSign(["PASS-THROUGH"], 0.8, 0.2, "#E8ECEE", "#1A4A9A", -9.9, 1.8, -14, Math.PI / 2);
thxWall("z", -20, -2, -10, 0, THX_H, 0.15, wm, [{ at: -11, w: 12, h: 3, glass: 1, sill: 0.9 }]);
var rooms = thxRoomRow(F, [{ n: "Process engineers", w: 8, glassy: 1 }, { n: "Gown store", w: 5 }, { n: "Instrument lab", w: 8, lv: 3 }, { n: "Clean room manager", w: 6, glassy: 1 }], "n", { x0: -9.8 });
rooms.forEach(function (r) { if (/engineers|manager/.test(r.R.n)) {
thxDesk(r.cx - 1, 0, r.cz, Math.PI);
thxDesk(r.cx + 1.2, 0, r.cz, Math.PI);
}
else if (r.R.n === "Gown store")
thxShelves(r.cx, 0, r.z0 + 0.4, r.x1 - r.x0 - 0.6, 0, "binders");
else
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.8, 0); });
thxPerson("mgr", rooms[3].cx, rooms[3].cz + 0.8, Math.PI, { title: "clean room manager", doing: "reviewing the night's particle counts" });
THX.gowned = false;
},
function (i) {
var n = THX_GOWN.length;
if (i >= n) {
THX.gowned = true;
worldCard(worldFacts("✅ Gowned", "You are dressed for an ISO 5 room. The air shower is through the door marked AIR SHOWER (it needs a level 3 card).", [], ["Inside: move slowly, never run; keep your hands above your waist; nothing from outside comes in that has not been wiped; no paper, no pencils, no phones unless bagged."]), {});
thxSay("🥼 <b>Gowned.</b> " + (thxLevel() >= 3 ? "Through the air shower to the clean bay." : "The air shower needs a level 3 card."));
return;
}
worldCard(worldFacts("🥼 Gowning · step " + (i + 1) + " of " + n, THX_GOWN[i], [], [i === 6 ? "Why: the bench is the line between the dirty side and the clean side; nothing that touched the floor on one side crosses it." : (i === 10 ? "Why: the jets blow loose particles off you; the room you enter allows at most 3,520 particles of 0.5 µm or more in a cubic metre of air." : "Why: people are the biggest source of dirt in a clean room: skin, hair, breath and lint.")]) +
worldBtn("next", i + 1 < n ? "Done: next step →" : "Done: I am gowned", ""), { next: function () { thxGownCard(i + 1); } });
},
function (c, W, H) {
c.fillStyle = "#08101A";
c.fillRect(0, 0, W, H);
var v = 900 + Math.round(Math.random() * 500);
c.fillStyle = "#4AE8FF";
c.font = "bold " + Math.round(H / 7) + "px sans-serif";
c.fillText("≥0.5 µm / m³", 10, H / 5);
c.fillStyle = "#6AF0C4";
c.font = "bold " + Math.round(H / 3.4) + "px sans-serif";
c.fillText(v.toLocaleString(), 10, H * 0.58);
c.fillStyle = "#DDE6F0";
c.font = Math.round(H / 8) + "px sans-serif";
c.fillText("ISO 5 limit 3,520 · OK", 10, H * 0.85);
},
function () {
worldCard(worldFacts("📊 Clean room classes (ISO 14644-1)", "How many particles of 0.5 µm or larger a cubic metre of air may hold", [["ISO 3", "35"], ["ISO 4", "352"], ["ISO 5", "3,520 (this bay; old name Class 100)"], ["ISO 6", "35,200"], ["ISO 7", "352,000 (the gowning side)"], ["ISO 8", "3,520,000"], ["Ordinary room air", "about 35,000,000"]], ["Each class is ten times cleaner than the one after it.", "Air comes down through filters in the ceiling (HEPA: they catch 99.97% of particles at 0.3 µm) and out through the floor, sweeping dirt away from the work.", "The room is kept at a slightly higher pressure than the corridor, so air leaks out, never in."]), {});
},
function (F) {
var rooms = thxRoomRow(F, [{ n: "Flight control", w: 10, glassy: 1, lv: 3 }, { n: "Maintenance", w: 9, glassy: 1 }, { n: "Charging bay", w: 9 }, { n: "Parts store", w: 6 }], "n");
var M = thxShellMats();
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Flight control") {
for (var i = 0; i < 3; i++)
thxDesk(r.x0 + 1.6 + i * 2.6, 0, r.cz + 0.6, Math.PI, { two: true });
thxScreen(r.x1 - r.x0 - 1, 1.8, r.cx, 2.0, r.z0 + 0.1, 0, function (c, W, H) {
c.fillStyle = "#06101A";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#1E3A50";
c.lineWidth = 2;
for (var k = 1; k < 6; k++) {
c.beginPath();
c.arc(W / 2, H / 2, k * H / 11, 0, 6.3);
c.stroke();
}
c.fillStyle = "#4AE8FF";
for (var d = 0; d < 14; d++) {
var a = d * 0.9, rr = (1 + d % 5) * H / 11;
c.beginPath();
c.arc(W / 2 + Math.cos(a) * rr, H / 2 + Math.sin(a) * rr, 4, 0, 6.3);
c.fill();
}
c.fillStyle = "#DDE6F0";
c.font = "bold " + Math.round(H / 12) + "px sans-serif";
c.fillText("SOMNUCOR AIRSPACE · deliveries and filming", 14, H / 10);
});
thxPerson("fc", r.cx, r.cz + 1.3, Math.PI, { title: "drone hub engineer", doing: "watching the evening's delivery routes", about: "You plan drone delivery routes and filming flights. Anything beyond that is not yours to know." });
}
else if (k === "Maintenance") {
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.6, 0, { noShelf: 1 });
for (var q = 0; q < 2; q++) {
var Q = thxQuad(M);
Q.position.set(r.x0 + 1.6 + q * 2.6, 0.9, r.z0 + 0.6);
Q.userData.keep = 1;
THX.F.add(Q);
}
thxPerson("mnt", r.cx, r.cz + 0.8, Math.PI, { title: "drone hub engineer", doing: "balancing a set of rotor blades" });
}
else if (k === "Charging bay") {
for (var rk = 0; rk < 3; rk++) {
var rx = r.x0 + 1.2 + rk * 2.6;
thxBox(0.08, 2.4, 0.08, thxMat(0x5A6068, "metal"), rx - 1, 1.2, r.z0 + 0.6);
thxBox(0.08, 2.4, 0.08, thxMat(0x5A6068, "metal"), rx + 1, 1.2, r.z0 + 0.6);
for (var lv = 0; lv < 3; lv++) {
thxBox(2.1, 0.05, 1.0, thxMat(0x6A7078, "metal"), rx, 0.5 + lv * 0.75, r.z0 + 0.6);
var Q2 = thxQuad(M);
Q2.scale.setScalar(0.8);
Q2.position.set(rx, 0.53 + lv * 0.75, r.z0 + 0.6);
Q2.userData.keep = 1;
THX.F.add(Q2);
thxBox(0.1, 0.04, 0.02, thxGlow(0x3AE86A), rx + 0.8, 0.6 + lv * 0.75, r.z0 + 1.1);
}
thxSolid(rx, r.z0 + 0.6, 1.05, 0.5, 0, 2.4);
}
}
else
thxShelves(r.cx, 0, r.z0 + 0.4, r.x1 - r.x0 - 0.6, 0, "bottles");
});
[-1, 1].forEach(function (s) {
var bx = s * (F.W / 2 + 5);
var pad = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 0.4, 32), thxMat(0x3A424C, "metal"));
pad.position.set(bx, -0.2, -2);
pad.userData.keep = 1;
THX.F.add(pad);
var mk = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32), new THREE.MeshLambertMaterial({ map: thxPadTex() }));
mk.rotation.x = -Math.PI / 2;
mk.position.set(bx, 0.01, -2);
mk.userData.keep = 1;
THX.F.add(mk);
var rim = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.08, 6, 48), thxGlow(0x4AE8FF));
rim.rotation.x = Math.PI / 2;
rim.position.set(bx, 0.02, -2);
rim.userData.keep = 1;
THX.F.add(rim);
var Q = thxQuad(M);
Q.userData.keep = 1;
THX.F.add(Q);
Q.position.set(bx, 0, -2);
THX.fx.push(function (dt, t) { var ph = (t * 0.08 + (s > 0 ? 0.5 : 0)) % 1, up = ph < 0.5 ? Math.max(0, Math.sin(ph * Math.PI * 2)) * 6 : 0; Q.position.y = up; Q.rotation.y = t * 0.2; });
thxSign(["DOCKING BAY " + (s < 0 ? "WEST" : "EAST")], 2.0, 0.36, "#0E1622", "#4AE8FF", s * (F.W / 2 - 0.3), 3.3, -2, s < 0 ? Math.PI / 2 : -Math.PI / 2);
});
for (var i = 0; i < 4; i++) {
var Q3 = thxQuad(M);
Q3.position.set(-9 + i * 6, 0.9, 0);
Q3.userData.keep = 1;
THX.F.add(Q3);
thxCyl(0.4, 0.9, thxMat(0x5A6068, "metal"), -9 + i * 6, 0.45, 0, null, 12);
thxRound(-9 + i * 6, 0, 0.5, 1.2);
}
thxBox(30, 0.01, 0.12, thxMat(0xE8C020, null), 0, 0.01, 4.5);
thxBox(30, 0.01, 0.12, thxMat(0xE8C020, null), 0, 0.01, -4.5);
thxBox(1.2, 1.0, 0.6, thxMat(0xC81A1A, "metal"), 18, 0.5, 6);
thxSolid(18, 6, 0.6, 0.3, 0, 1);
thxPerson("hub", 4, 7, Math.PI, { title: "drone hub engineer", doing: "logging a drone back in from a delivery", about: "You service the Tower's drones. Players know drones deliver parcels and film; you say no more than that." });
},
function (e) {
var full = { He: [2], Ne: [2, 8], Ar: [2, 8, 8], Kr: [2, 8, 18, 8], Xe: [2, 8, 18, 18, 8], Rn: [2, 8, 18, 32, 18, 8] }, sh = [0, 0, 0, 0, 0, 0, 0];
var m = /^\[(\w+)\]\s*(.*)$/.exec(e.conf), rest = e.conf;
if (m) {
full[m[1]].forEach(function (n, i) { sh[i] = n; });
rest = m[2];
}
rest.split(/\s+/).forEach(function (t) { var q = /^(\d)([spdf])(\d+)$/.exec(t); if (q)
sh[+q[1] - 1] += +q[3]; });
while (sh.length && !sh[sh.length - 1])
sh.pop();
return sh;
},
function (F) {
var wm = thxMat(0xF0F2F4, "plaster");
thxWall("z", -20, 13.8, -15.6, 0, THX_H, 0.15, wm, [{ at: -15, w: 1.4, h: 2.3 }, { at: -8, w: 5, h: 2.8, glass: 1, sill: 0.9 }, { at: 5, w: 1.4, h: 2.3 }, { at: 9.5, w: 3, h: 2.8, glass: 1, sill: 0.9 }]);
thxWall("x", -24, -15.6, 0, 0, THX_H, 0.15, wm, []);
thxSign(["REACTION LAB", "goggles on · coats fastened"], 2.2, 0.42, "#0E1622", "#6AF0C4", -15.5, 2.85, -15, Math.PI / 2);
thxSign(["SPECTROSCOPY", "flame tests"], 1.8, 0.42, "#0E1622", "#FFD24A", -15.5, 2.85, 5, Math.PI / 2);
for (var b = 0; b < 3; b++) {
var bz = -17 + b * 5.2;
thxBench(-20, 0, bz, 5.2, 0);
THX_CH.benchAt = THX_CH.benchAt || [];
}
thxFumeHood(-23.4, 0, -1.8, Math.PI / 2);
thxShelves(-16.2, 0, -10, 3.4, -Math.PI / 2, "bottles");
thxBeakerRig(-20, 0.92, -16.6);
thxSpot(-20, -15.3, 2.6, "⚗️ The reaction bench", "run a real reaction", function () { thxRxList(); });
thxPracRig("c1", -20, 0.9, -11.75);
thxPracRig("c2", -20, 0.9, -6.55);
thxSpot(-20, -10.1, 2.2, "🧑‍🔬 The practical bench", "do a practical: weigh, pipette, titrate", function () { thxPracList("c", "c1"); });
thxSpot(-20, -4.9, 2.2, "🔥 The heating bench", "do a practical: burner, heat, crystals", function () { thxPracList("c", "c2"); });
thxPerson("chemtut", -17.2, -1.6, Math.PI / 2, { title: "chemistry tutor", doing: "setting out the benches for the afternoon's practicals", about: "You teach chemistry and love it: atoms, bonding, moles, acids and bases, rates, redox, organic chemistry. You teach correctly and clearly." });
thxBench(-20, 0, 4, 5, 0, { noShelf: 1 });
thxCyl(0.05, 0.3, thxMat(0x8A9098, "metal"), -20, 1.07, 4.1, null, 8);
THX_CH.flamePos = { x: -20, y: 1.24, z: 4.1 };
thxScreen(4.6, 1.4, -23.8, 2.2, 8.5, Math.PI / 2, function (c, W, H) { thxSpectra(c, W, H); });
thxSpot(-20, 5.4, 2.4, "🔥 The flame test burner", "test a metal's colour", function () { thxFlameCard(); });
thxWall("z", -20, 13.8, 15.6, 0, THX_H, 0.15, wm, [{ at: -15, w: 1.4, h: 2.3 }, { at: -11, w: 4, h: 2.8, glass: 1, sill: 0.9 }, { at: -3, w: 1.4, h: 2.3 }, { at: 1, w: 4, h: 2.8, glass: 1, sill: 0.9 }, { at: 8, w: 1.4, h: 2.3 }]);
thxWall("x", 15.6, 24, -7, 0, THX_H, 0.15, wm, []);
thxWall("x", 15.6, 24, 5, 0, THX_H, 0.15, wm, []);
thxSign(["STUDY ROOM 1", "lessons"], 1.8, 0.42, "#0E1622", "#4AE8FF", 15.5, 2.85, -15, -Math.PI / 2);
thxSign(["STUDY ROOM 2", "balancing · moles"], 1.8, 0.42, "#0E1622", "#4AE8FF", 15.5, 2.85, -3, -Math.PI / 2);
thxSign(["THE ELEMENTS CABINET"], 2.0, 0.32, "#0E1622", "#FFD24A", 15.5, 2.85, 8, -Math.PI / 2);
[[-14, "lessons"], [-1, "tools"]].forEach(function (R) {
var cz = R[0];
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++)
thxDesk(18.6 + j * 2.6, 0, cz - 1.6 + i * 2.6, Math.PI / 2);
thxScreen(3.2, 1.6, 23.75, 2.0, cz, -Math.PI / 2, function (c, W, H) { thxText(c, R[1] === "lessons" ? ["CHEMISTRY LESSONS", "Atoms · shells · bonding · moles", "Equations · acids and bases · rates", "Redox · carbon chemistry · safety"] : ["THE CHEMIST'S TOOLS", "Balance an equation", "Molar mass of any formula", "Moles, masses and numbers"], W, H); });
thxSpot(20, cz, 3.4, R[1] === "lessons" ? "📘 Chemistry lessons" : "🧮 The chemist's tools", R[1] === "lessons" ? "choose a lesson" : "use them", R[1] === "lessons" ? function () { thxLessonList("c"); } : function () { thxToolsCard(); });
});
thxPerson("study", 19.5, -11.2, -Math.PI / 2, { title: "chemistry tutor", doing: "marking a pile of mole calculations", about: "You teach chemistry clearly and correctly." });
thxElementsCabinet(23.4, 9.4);
thxPeriodicFloor();
thxBox(1.0, 1.3, 0.6, thxMat(0x2A3038, "metal"), -6, 0.65, 8);
thxSolid(-6, 8, 0.5, 0.3, 0, 1.3);
thxScreen(0.9, 0.6, -6, 1.5, 8.31, 0, function (c, W, H) { thxText(c, ["COMPOUND LIBRARY", "live from PubChem"], W, H, { size: 18 }); });
thxSpot(-6, 9.2, 2.2, "🔎 The Compound Library", "search any compound (live)", function () { thxCompoundCard(); });
thxBox(1.0, 1.3, 0.6, thxMat(0x2A3038, "metal"), 6, 0.65, 8);
thxSolid(6, 8, 0.5, 0.3, 0, 1.3);
thxScreen(0.9, 0.6, 6, 1.5, 8.31, 0, function (c, W, H) { thxText(c, ["YOUR PROGRESS", "elements · reactions · lessons"], W, H, { size: 18 }); });
thxSpot(6, 9.2, 2.2, "🏅 Your chemistry progress", "see it", function () { thxProgressCard("c"); });
var mol = new THREE.Group();
mol.position.set(0, 3.0, 3.5);
mol.userData.keep = 1;
THX.F.add(mol);
thxSph(0.42, thxMat(0xE04040, null), 0, 0, 0, mol, 18);
thxSph(0.26, thxMat(0xF4F4F4, null), 0.42, 0.3, 0, mol, 14);
thxSph(0.26, thxMat(0xF4F4F4, null), -0.42, 0.3, 0, mol, 14);
THX.fx.push(function (dt, t) { mol.rotation.y = t * 0.25; mol.position.y = 3.0 + Math.sin(t * 0.5) * 0.08; });
thxSign(["H₂O · 104.5° between the bonds"], 2.2, 0.3, "#0E1622", "#DDE6F0", 0, 2.2, 3.5, 0);
},
function () {
var t = THX_PT.t, W = 18 * t, D = 10 * t, cv = document.createElement("canvas"), px = THX.lite ? 60 : 110;
cv.width = 18 * px;
cv.height = 10 * px;
var c = cv.getContext("2d");
c.fillStyle = "#0A0E16";
c.fillRect(0, 0, cv.width, cv.height);
THX_EL.forEach(function (e) {
var p = thxElPos(e), x = (p[0] - 1) * px, y = (p[1] - 1) * px, col = THX_CAT[e.cat][1];
c.fillStyle = col;
c.globalAlpha = 0.85;
c.fillRect(x + 3, y + 3, px - 6, px - 6);
c.globalAlpha = 1;
c.fillStyle = "#0A0E16";
c.font = "bold " + Math.round(px * 0.16) + "px sans-serif";
c.fillText(e.z, x + px * 0.1, y + px * 0.22);
c.font = "bold " + Math.round(px * 0.4) + "px sans-serif";
c.textAlign = "center";
c.fillText(e.sym, x + px / 2, y + px * 0.64);
c.font = Math.round(px * 0.12) + "px sans-serif";
c.fillText(e.name, x + px / 2, y + px * 0.86);
c.textAlign = "left";
});
c.fillStyle = "#DDE6F0";
c.font = "bold " + Math.round(px * 0.3) + "px sans-serif";
c.fillText("THE PERIODIC TABLE OF THE ELEMENTS", 3.2 * px, 1.2 * px);
c.font = Math.round(px * 0.16) + "px sans-serif";
var lx = 3.2 * px, ly = 1.55 * px;
Object.keys(THX_CAT).forEach(function (k, i) { c.fillStyle = THX_CAT[k][1]; c.fillRect(lx + (i % 5) * 2 * px, ly + Math.floor(i / 5) * 0.3 * px, 0.18 * px, 0.18 * px); c.fillStyle = "#DDE6F0"; c.fillText(THX_CAT[k][0], lx + (i % 5) * 2 * px + 0.25 * px, ly + Math.floor(i / 5) * 0.3 * px + 0.16 * px); });
var tex = new THREE.CanvasTexture(cv);
tex.anisotropy = 4;
var m = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshBasicMaterial({ map: tex }));
m.rotation.x = -Math.PI / 2;
m.position.set(THX_PT.x0 + W / 2, 0.012, THX_PT.z0 + D / 2);
m.userData.keep = 1;
THX.F.add(m);
var fr = thxGlow(0x4AE8FF);
thxBox(W + 0.2, 0.02, 0.06, fr, THX_PT.x0 + W / 2, 0.02, THX_PT.z0 - 0.1);
thxBox(W + 0.2, 0.02, 0.06, fr, THX_PT.x0 + W / 2, 0.02, THX_PT.z0 + D + 0.1);
thxBox(0.06, 0.02, D + 0.2, fr, THX_PT.x0 - 0.1, 0.02, THX_PT.z0 + D / 2);
thxBox(0.06, 0.02, D + 0.2, fr, THX_PT.x0 + W + 0.1, 0.02, THX_PT.z0 + D / 2);
var hl = new THREE.Mesh(new THREE.PlaneGeometry(t * 0.96, t * 0.96), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.22, depthWrite: false }));
hl.rotation.x = -Math.PI / 2;
hl.position.y = 0.02;
hl.visible = false;
hl.userData.keep = 1;
THX.F.add(hl);
THX_CH.hl = hl;
THX.fx.push(function () {
var e = thxTileUnder();
THX_CH.tile = e;
if (e) {
var p = thxElPos(e);
hl.visible = true;
hl.position.x = THX_PT.x0 + (p[0] - 0.5) * t;
hl.position.z = THX_PT.z0 + (p[1] - 0.5) * t;
if (!THX_CH.sp || THX_CH.sp.e !== e) {
if (THX_CH.sp) {
var i = THX.spots.indexOf(THX_CH.sp);
if (i >= 0)
THX.spots.splice(i, 1);
}
THX_CH.sp = thxSpot(hl.position.x, hl.position.z, t * 0.75, "⚛️ " + e.z + " " + e.name + " (" + e.sym + ")", "read it", function () { thxElementCard(e); });
THX_CH.sp.e = e;
}
}
else {
hl.visible = false;
if (THX_CH.sp) {
var j = THX.spots.indexOf(THX_CH.sp);
if (j >= 0)
THX.spots.splice(j, 1);
THX_CH.sp = null;
}
}
});
},
function () {
if (THX.floor !== "chem")
return null;
var L = worldLocal(), t = THX_PT.t, col = Math.floor((L.x - THX_PT.x0) / t) + 1, row = Math.floor((L.z - THX_PT.z0) / t) + 1;
if (col < 1 || col > 18 || row < 1 || row > 10)
return null;
for (var i = 0; i < THX_EL.length; i++) {
var p = thxElPos(THX_EL[i]);
if (p[0] === col && p[1] === row)
return THX_EL[i];
}
return null;
},
function (e) {
var cv = document.createElement("canvas");
cv.width = cv.height = 220;
var c = cv.getContext("2d"), sh = thxShells(e), col = THX_CAT[e.cat][1];
c.fillStyle = "#0A0E16";
c.fillRect(0, 0, 220, 220);
c.fillStyle = col;
c.beginPath();
c.arc(110, 110, 14, 0, 6.3);
c.fill();
c.fillStyle = "#0A0E16";
c.font = "bold 12px sans-serif";
c.textAlign = "center";
c.fillText(e.sym, 110, 114);
sh.forEach(function (n, i) {
var r = 24 + i * 13;
c.strokeStyle = "rgba(200,220,240,.45)";
c.lineWidth = 1;
c.beginPath();
c.arc(110, 110, r, 0, 6.3);
c.stroke();
c.fillStyle = "#4AE8FF";
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2 - Math.PI / 2;
c.beginPath();
c.arc(110 + Math.cos(a) * r, 110 + Math.sin(a) * r, 2.4, 0, 6.3);
c.fill();
}
});
c.fillStyle = "#DDE6F0";
c.font = "11px sans-serif";
c.fillText(sh.join(", "), 110, 212);
try {
return cv.toDataURL("image/png");
}
catch (e) {
return "";
}
},
function (e) {
var p = thxProg();
if (!p.el[e.z]) {
p.el[e.z] = 1;
thxProgSave();
}
var img = thxBohr(e), sh = thxShells(e), val = sh[sh.length - 1];
var rows = [["Atomic number", e.z + " protons" + (e.z < 93 ? "" : " (made, not found in nature)")], ["Atomic mass", e.mass + (/^\[/.test(e.mass) ? " (mass number of its longest-lived isotope)" : " u")], ["Family", THX_CAT[e.cat][0]],
["Group, period", (e.group ? "group " + e.group : "f-block") + ", period " + e.period], ["Electrons", e.conf], ["Shells", sh.join(", ") + (e.cat !== "ln" && e.cat !== "ac" && e.cat !== "tm" ? " · " + val + " in the outer shell" : "")], ["At room temperature", e.state]];
var b = worldBtn("live", "🔬 Live: more from PubChem", "melting and boiling points, density, electronegativity, who found it") + worldBtn("ask", "🕸️ Ask WHITE WIDOW about " + e.name, "");
worldCard(worldFacts("⚛️ " + e.name + " · " + e.sym, THX_CAT[e.cat][0], rows, [e.fact], img ? "<img alt='' src='" + img + "' style='width:150px;display:block;margin:8px auto 0;border-radius:4px'>" : "") + "<div id='thx-live'></div>" + b, {
live: function () { thxElementLive(e); }, ask: function () { if (typeof thxWidowOpen === "function")
thxWidowOpen("Tell me about " + e.name + "."); }
});
},
function (e) {
var box = document.getElementById("thx-live");
if (box)
box.innerHTML = "<div style='opacity:.75;margin-top:6px'>Asking PubChem…</div>";
var go = THX_PUBEL ? Promise.resolve(THX_PUBEL) : thxFetchJSON("https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON").then(function (d) {
var T = d && d.Table, cols = T && T.Columns && T.Columns.Column, rows = T && T.Row;
if (!cols || !rows)
throw new Error("no table");
THX_PUBEL = {};
rows.forEach(function (r) { var o = {}; cols.forEach(function (k, i) { o[k] = r.Cell[i]; }); THX_PUBEL[+o.AtomicNumber] = o; });
return THX_PUBEL;
});
go.then(function (T) {
var o = T[e.z];
if (!o)
throw new Error("none");
var L = [["Melting point", o.MeltingPoint ? o.MeltingPoint + " K (" + (Math.round((o.MeltingPoint - 273.15) * 10) / 10) + " °C)" : "not known"], ["Boiling point", o.BoilingPoint ? o.BoilingPoint + " K (" + (Math.round((o.BoilingPoint - 273.15) * 10) / 10) + " °C)" : "not known"],
["Density", o.Density ? o.Density + " g/cm³" : "not known"], ["Electronegativity", o.Electronegativity || "none given"], ["First ionisation", o.IonizationEnergy ? o.IonizationEnergy + " eV" : "not known"], ["Oxidation states", o.OxidationStates || "—"], ["Discovered", o.YearDiscovered || "—"]];
var bx = document.getElementById("thx-live");
if (bx)
bx.innerHTML = "<div style='margin-top:8px;padding-top:6px;border-top:1px solid rgba(143,180,232,.3)'><b>Live from PubChem</b><table style='width:100%;font-size:12.5px'>" + L.map(function (r) { return "<tr><td style='opacity:.7;padding-right:8px'>" + thxEsc(r[0]) + "</td><td>" + thxEsc(String(r[1])) + "</td></tr>"; }).join("") + "</table></div>";
}).catch(function () { var bx = document.getElementById("thx-live"); if (bx)
bx.innerHTML = "<div style='margin-top:6px;opacity:.8'>PubChem could not be reached just now. Everything above is the Tower's own data, and it is complete.</div>"; });
},
function () {
var p = thxProg(), b = "", fns = {};
THX_RX.forEach(function (R, i) { b += worldBtn("r" + i, (p.rx[R.k] ? "✅ " : "⚗️ ") + R.n, ""); fns["r" + i] = function () { thxRxStep(R, 0); }; });
worldCard(worldFacts("⚗️ The reaction bench", "Real reactions, done the way a school or university lab does them. Goggles on.", [], ["The rule of this lab: nothing explosive. Energetic materials are unstable and are never made, mixed or handled here."]) + b, fns);
},
function (R, i) {
thxRig(R, i, R.steps.length);
if (i < R.steps.length) {
worldCard(worldFacts("⚗️ " + R.n, "Step " + (i + 1) + " of " + R.steps.length, [], [R.steps[i]]) + worldBtn("go", i + 1 < R.steps.length ? "Done: next →" : "Done: watch", ""), { go: function () { thxRxStep(R, i + 1); } });
return;
}
var b = worldBtn("q", "❓ " + R.q[0], "answer to finish");
worldCard(worldFacts("👀 What you see", R.see, [["Equation", R.eq]], [R.why]) + b, { q: function () { thxQuiz(R.q, function (ok) { var p = thxProg(); if (ok && !p.rx[R.k]) {
p.rx[R.k] = 1;
thxProgSave();
} thxSay(ok ? "✅ <b>Right.</b> " + thxEsc(R.n) + " is in your lab book." : "Not quite: <b>" + thxEsc(R.q[1][R.q[2]]) + "</b>."); thxRxList(); }); } });
},
function (x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.userData.keep = 1;
THX.F.add(g);
var glass = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.3, 20, 1, true), thxMat(0xD8F0F8, null, { op: 0.35, ds: 1 }));
glass.position.y = 0.15;
g.add(glass);
var liqM = new THREE.MeshLambertMaterial({ color: 0xE8F0F4, transparent: true, opacity: 0.8 }), liq = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.115, 0.18, 20), liqM);
liq.position.y = 0.1;
g.add(liq);
var bub = [];
for (var i = 0; i < 14; i++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), thxMat(0xFFFFFF, null, { op: 0.7 }));
s.visible = false;
g.add(s);
bub.push(s);
}
var cloud = [];
for (var j = 0; j < 24; j++) {
var cl = new THREE.Mesh(new THREE.SphereGeometry(0.012, 5, 4), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }));
cl.visible = false;
g.add(cl);
cloud.push(cl);
}
var nail = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.24, 8), thxMat(0x8A8E94, "metal"));
nail.position.set(0.04, 0.2, 0);
nail.rotation.z = 0.25;
nail.visible = false;
g.add(nail);
THX_CH.beaker = { g: g, liq: liqM, bub: bub, cloud: cloud, nail: nail, R: null, t: 0, from: new THREE.Color(0xE8F0F4), to: new THREE.Color(0xE8F0F4) };
THX.fx.push(function (dt) {
var B = THX_CH.beaker;
if (!B || !B.R)
return;
B.t += dt;
var k = Math.min(1, B.t / 8);
B.liq.color.copy(B.from).lerp(B.to, k);
var fx = B.R.fx;
B.bub.forEach(function (s, i) { if (fx !== "fizz" && !(fx === "swirl" && B.t < 3)) {
s.visible = false;
return;
} s.visible = true; var ph = ((B.t * 0.6 + i / 14) % 1); s.position.set(Math.cos(i * 2.4) * 0.07, 0.02 + ph * 0.17, Math.sin(i * 2.4) * 0.07); });
B.cloud.forEach(function (s, i) { if (!B.R.cloud) {
s.visible = false;
return;
} s.visible = true; s.material.color.setHex(B.R.cloud); var drop = Math.min(1, B.t / 10); s.position.set(Math.cos(i * 1.7) * 0.08 * ((i % 5) / 5), 0.17 - drop * (0.15 - (i % 4) * 0.01), Math.sin(i * 1.7) * 0.08 * ((i % 5) / 5)); });
B.nail.visible = fx === "nail";
if (fx === "nail")
B.nail.material = k > 0.5 ? thxMat(0xB86A4A, "metal") : thxMat(0x8A8E94, "metal");
});
},
function () {
var b = "", fns = {};
THX_FLAMES.forEach(function (F, i) { b += worldBtn("f" + i, F[0] + " (" + F[1] + ")", ""); fns["f" + i] = function () { thxFlame(F); }; });
worldCard(worldFacts("🔥 Flame tests", "Dip a clean wire loop in the metal's salt and hold it in the blue flame.", [], ["Each metal's electrons, heated, jump up and fall back, giving out light of exact colours. A spectroscope splits it into lines: a fingerprint no other element shares."]) + b, fns);
},
function (F) {
var P = THX_CH.flamePos;
if (!P)
return;
if (!THX_CH.flame) {
var g = new THREE.Group();
g.position.set(P.x, P.y, P.z);
g.userData.keep = 1;
THX.F.add(g);
var m = new THREE.MeshBasicMaterial({ color: 0x4A8AFF, transparent: true, opacity: 0.75, depthWrite: false }), f = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.28, 12, 1, true), m);
f.position.y = 0.14;
g.add(f);
THX_CH.flame = { g: g, m: m, f: f, t: 0 };
THX.fx.push(function (dt, t) { var Fl = THX_CH.flame; if (!Fl)
return; Fl.f.scale.x = Fl.f.scale.z = 1 + Math.sin(t * 3.1) * 0.05; Fl.f.scale.y = 1 + Math.sin(t * 2.3) * 0.04; });
}
THX_CH.flame.m.color.setHex(F[3]);
var p = thxProg();
p.rx["flame_" + F[1]] = 1;
thxProgSave();
worldCard(worldFacts("🔥 " + F[0] + ": " + F[2], "The flame on the bench is " + F[2] + ".", [["Brightest line", F[4] + " nm"]], ["Sodium's yellow is so strong it can hide the others: chemists look through blue cobalt glass to see past it."]) + worldBtn("back", "← Another metal", ""), { back: thxFlameCard });
},
function (c, W, H) {
c.fillStyle = "#06080E";
c.fillRect(0, 0, W, H);
c.fillStyle = "#DDE6F0";
c.font = "bold " + Math.round(H / 9) + "px sans-serif";
c.fillText("LINE SPECTRA  400–700 nm", 12, H / 8);
var rows = [["H", [410.2, 434.0, 486.1, 656.3]], ["He", [447.1, 471.3, 492.2, 501.6, 587.6, 667.8]], ["Na", [589.0, 589.6]], ["Hg", [404.7, 435.8, 546.1, 577.0, 579.1]]];
rows.forEach(function (r, i) {
var y = H * 0.22 + i * H * 0.19;
c.fillStyle = "#111";
c.fillRect(60, y, W - 80, H * 0.13);
c.fillStyle = "#DDE6F0";
c.font = Math.round(H / 11) + "px sans-serif";
c.fillText(r[0], 14, y + H * 0.1);
r[1].forEach(function (nm) { var x = 60 + (nm - 400) / 300 * (W - 80), hue = Math.max(0, Math.min(270, (700 - nm) / 300 * 270)); c.fillStyle = "hsl(" + hue + ",100%,55%)"; c.fillRect(x, y, 3, H * 0.13); });
});
},
function (x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = -Math.PI / 2;
g.userData.keep = 1;
THX.F.add(g);
thxBox(3.6, 0.9, 0.6, thxMat(0x3A2E24, "wood"), 0, 0.45, 0, g);
thxBox(3.6, 1.2, 0.6, thxGlass(0xD8F0F8), 0, 1.5, 0, g);
thxBox(3.6, 0.06, 0.6, thxMat(0x3A2E24, "wood"), 0, 2.12, 0, g);
var S = [["Cu", 0xB87333, "cyl"], ["Fe", 0x6E6E70, "box"], ["S", 0xE8D820, "sph"], ["Bi", 0xB8A0D8, "box"], ["Au", 0xE8C040, "box"], ["C", 0x1A1A1A, "sph"], ["Si", 0x7A808A, "box"], ["Mg", 0xC8C8CC, "cyl"], ["Al", 0xD0D4D8, "box"], ["Zn", 0xA8B0B8, "cyl"], ["Sn", 0xB8B8BC, "sph"], ["I", 0x3A2A4A, "sph"]];
S.forEach(function (s, i) {
var px = -1.5 + (i % 6) * 0.6, py = 1.0 + Math.floor(i / 6) * 0.55, m = thxMat(s[1], "metal"), o;
if (s[2] === "cyl")
o = thxCyl(0.06, 0.14, m, px, py + 0.07, 0, g, 10);
else if (s[2] === "sph")
o = thxSph(0.07, m, px, py + 0.07, 0, g, 10);
else
o = thxBox(0.12, 0.12, 0.12, m, px, py + 0.06, 0, g);
thxSign([s[0]], 0.2, 0.1, "#F4F2EC", "#1A1A1A", px, py - 0.03, 0.2, 0, g);
});
thxSolid(x, z, 0.32, 1.82, 0, 2.2);
thxSpot(x - 1.2, z, 2.4, "🧪 The Elements Cabinet", "read the samples", function () {
worldCard(worldFacts("🧪 The Elements Cabinet", "Real samples of twelve elements, each in its pure form", [["Cu copper", "pink-orange; the only common metal that is not grey or silver besides gold"], ["Fe iron", "grey; rusts in damp air"], ["S sulfur", "yellow crystals; burns with a blue flame"], ["Bi bismuth", "a stepped crystal coloured by its oxide skin"], ["Au gold", "never tarnishes"], ["C carbon", "here as graphite: soft, conducts electricity"], ["Si silicon", "a shiny grey metalloid; computer chips"], ["Mg magnesium", "light, burns brilliant white"], ["Al aluminium", "light, kept bright by its oxide"], ["Zn zinc", "bluish grey; galvanises iron"], ["Sn tin", "soft; with copper makes bronze"], ["I iodine", "dark crystals that turn to violet vapour"]], []), {});
});
},
function (kind) {
var p = thxProg(), b = "", fns = {};
Object.keys(THX_LESSONS).filter(function (k) { return k.charAt(0) === kind; }).forEach(function (k) { var L = THX_LESSONS[k]; b += worldBtn(k, (p.ls[k] ? "✅ " : "📘 ") + L.n, p.ls[k] ? "passed " + p.ls[k] + "/" + L.q.length : L.p.length + " pages, " + L.q.length + " questions"); fns[k] = function () { thxLessonPage(k, 0); }; });
worldCard(worldFacts(kind === "c" ? "📘 Chemistry lessons" : "🧬 Genetics lessons", "Read the pages, then answer the questions. Pass with two right out of three.", [], []) + b, fns);
},
function (k, i) {
var L = THX_LESSONS[k];
if (i < L.p.length) {
worldCard(worldFacts("📘 " + L.n, "Page " + (i + 1) + " of " + L.p.length, [], [L.p[i]]) + worldBtn("n", i + 1 < L.p.length ? "Next page →" : "The questions →", "") + (i ? worldBtn("b", "← Back", "") : "") + worldBtn("ask", "🕸️ Ask WHITE WIDOW about this", ""), { n: function () { thxLessonPage(k, i + 1); }, b: function () { thxLessonPage(k, i - 1); }, ask: function () { if (typeof thxWidowOpen === "function")
thxWidowOpen("Help me understand: " + L.p[i]); } });
return;
}
var right = 0, qi = 0;
function next() {
if (qi >= L.q.length) {
var p = thxProg(), pass = right >= 2;
if (pass && (!p.ls[k] || p.ls[k] < right)) {
p.ls[k] = right;
thxProgSave();
}
worldCard(worldFacts(pass ? "✅ Passed: " + L.n : "🔁 Not yet: " + L.n, right + " of " + L.q.length + " right", [], [pass ? "It is in your progress." : "Read it again and have another go."]) + worldBtn("more", "← All lessons", ""), { more: function () { thxLessonList(k.charAt(0)); } });
return;
}
thxQuiz(L.q[qi], function (ok) { if (ok)
right++; thxSay(ok ? "✅ Right." : "The answer: <b>" + thxEsc(L.q[qi][1][L.q[qi][2]]) + "</b>."); qi++; next(); });
}
next();
},
function () {
worldCard(worldFacts("🧮 The chemist's tools", "", [], []) + worldBtn("bal", "⚖️ Balance an equation", "ten real equations") + worldBtn("mm", "🧮 Molar mass of any formula", "type C6H12O6, Ca(OH)2, CuSO4·5H2O…") + worldBtn("lib", "🔎 The Compound Library (live)", ""), { bal: function () { thxBalance(Math.floor(Math.random() * THX_BAL.length)); }, mm: function () { thxMolarCard(""); }, lib: function () { thxCompoundCard(); } });
},
function (i) {
var B = THX_BAL[i], n = B[1].length, cur = B[1].map(function () { return 1; });
function draw(msg) {
var parts = B[0].split(/ (\+|→) /), h = "<div style='font-size:16px;margin:8px 0;line-height:2.2'>", k = 0;
parts.forEach(function (s) { if (s === "+" || s === "→") {
h += " " + s + " ";
return;
} var j = k++; h += "<span data-w='c" + j + "' style='display:inline-block;min-width:22px;text-align:center;border:1px solid #4AE8FF;border-radius:3px;margin-right:2px;cursor:pointer'>" + cur[j] + "</span>" + thxEsc(s); });
var fns = { chk: function () { var ok = cur.every(function (v, j) { return v === B[1][j]; }); if (ok) {
var p = thxProg();
p.rx["bal" + i] = 1;
thxProgSave();
} draw(ok ? "✅ Balanced: every atom counted on both sides." : "🔁 Not yet: count each kind of atom on both sides."); }, nx: function () { thxBalance((i + 1) % THX_BAL.length); } };
for (var j = 0; j < n; j++)
(function (j) { fns["c" + j] = function () { cur[j] = cur[j] % 9 + 1; draw(""); }; })(j);
worldCard(worldFacts("⚖️ Balance it", "Tap a number to change it (1–9)", [], []) + h + "</div>" + (msg ? "<div>" + thxEsc(msg) + "</div>" : "") + worldBtn("chk", "Check", ""), fns);
if (msg && msg.charAt(0) === "✅")
WLD.card.insertAdjacentHTML("beforeend", worldBtn("nx", "Next equation →", "")), WLD.card.querySelector("[data-w='nx']").onclick = fns.nx;
}
draw("");
},
function (f) {
f = String(f || "").replace(/\s+/g, "").replace(/[·.*]/g, "·");
function parse(s) {
var i = 0;
function grp() {
var m = {};
while (i < s.length) {
var ch = s[i];
if (ch === "(") {
i++;
var inner = grp();
if (s[i] !== ")")
throw new Error("A bracket is not closed.");
i++;
var n = num();
for (var k in inner)
m[k] = (m[k] || 0) + inner[k] * n;
}
else if (ch === ")")
return m;
else if (/[A-Z]/.test(ch)) {
var sym = ch;
i++;
if (i < s.length && /[a-z]/.test(s[i])) {
sym += s[i];
i++;
}
if (THX_MASS[sym] === undefined)
throw new Error("No element " + sym + ".");
var c = num();
m[sym] = (m[sym] || 0) + c;
}
else
throw new Error("I cannot read “" + ch + "”.");
}
return m;
}
function num() { var d = ""; while (i < s.length && /[0-9]/.test(s[i]))
d += s[i++]; return d ? +d : 1; }
return grp();
}
var total = {};
f.split("·").forEach(function (part) { var m = /^(\d*)(.*)$/.exec(part), mul = m[1] ? +m[1] : 1, g = parse(m[2]); for (var k in g)
total[k] = (total[k] || 0) + g[k] * mul; });
var mm = 0;
Object.keys(total).forEach(function (k) { mm += THX_MASS[k] * total[k]; });
return { atoms: total, mm: mm };
},
function (prev) {
worldCard(worldFacts("🧮 Molar mass", "Type a formula: capitals start each element.", [], []) + "<input id='thx-mm' value='" + thxEsc(prev || "C6H12O6") + "' style='width:100%;padding:6px;margin:6px 0;background:#0A0E16;color:#E8ECF4;border:1px solid #4AE8FF;border-radius:3px'>" + worldBtn("go", "Work it out", "") + "<div id='thx-mmo'></div>", { go: function () {
var v = (document.getElementById("thx-mm") || {}).value || "", o = document.getElementById("thx-mmo");
try {
var r = thxMolar(v), rows = Object.keys(r.atoms).map(function (k) { return k + " × " + r.atoms[k] + " = " + (THX_MASS[k] * r.atoms[k]).toFixed(3); });
o.innerHTML = "<div style='margin-top:6px'><b>" + thxEsc(v) + ": " + r.mm.toFixed(3) + " g/mol</b></div><div style='font-size:12px;opacity:.8'>" + rows.map(thxEsc).join("<br>") + "</div><div style='font-size:12px;margin-top:4px'>So 10 g is " + (10 / r.mm).toFixed(4) + " mol, or " + (10 / r.mm * 6.022e23).toExponential(3) + " formula units.</div>";
var p = thxProg();
p.rx.molar = 1;
thxProgSave();
}
catch (e) {
o.innerHTML = "<div style='margin-top:6px'>" + thxEsc(e.message) + "</div>";
}
} });
},
function () {
worldCard(worldFacts("🔎 The Compound Library", "Live from PubChem, the world's free chemistry database (US National Library of Medicine)", [], ["Type a name: aspirin, caffeine, glucose, ethanol, citric acid…"]) +
"<input id='thx-cq' placeholder='a compound' style='width:100%;padding:6px;margin:6px 0;background:#0A0E16;color:#E8ECF4;border:1px solid #4AE8FF;border-radius:3px'>" + worldBtn("go", "Look it up", "") + "<div id='thx-co'></div>", { go: function () { thxCompoundLook(((document.getElementById("thx-cq") || {}).value || "").trim()); } });
setTimeout(function () { var i = document.getElementById("thx-cq"); if (i) {
i.focus();
i.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
thxCompoundLook(i.value.trim()); };
} }, 0);
},
function (q) {
var o = document.getElementById("thx-co");
if (!o || !q)
return;
if (/hydrogen peroxide/i.test(q)) { }
else if (THX_UNSTABLE.test(q)) {
o.innerHTML = "<div style='margin-top:6px'>⚠️ <b>Unstable.</b> The Tower's library holds nothing more on it.</div>";
return;
}
if (THX_WEAPON.test(q)) {
o.innerHTML = "<div style='margin-top:6px'>The Tower's library does not hold agents of war.</div>";
return;
}
o.innerHTML = "<div style='opacity:.75;margin-top:6px'>Asking PubChem…</div>";
thxFetchJSON("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + encodeURIComponent(q) + "/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,HBondDonorCount,HBondAcceptorCount,Charge/JSON").then(function (d) {
var P = d && d.PropertyTable && d.PropertyTable.Properties && d.PropertyTable.Properties[0];
if (!P)
throw new Error("none");
if (THX_UNSTABLE.test(P.IUPACName || "") && !/hydrogen peroxide/i.test(q)) {
o.innerHTML = "<div style='margin-top:6px'>⚠️ <b>Unstable.</b> The Tower's library holds nothing more on it.</div>";
return;
}
var rows = [["Formula", P.MolecularFormula], ["Molar mass", P.MolecularWeight + " g/mol"], ["Proper (IUPAC) name", P.IUPACName || "—"], ["Fat or water loving (XLogP)", P.XLogP === undefined ? "—" : P.XLogP + (P.XLogP > 0 ? " (prefers fats)" : " (prefers water)")], ["Hydrogen-bond donors / acceptors", (P.HBondDonorCount || 0) + " / " + (P.HBondAcceptorCount || 0)], ["PubChem number (CID)", P.CID]];
o.innerHTML = "<div style='margin-top:8px'><b>Live from PubChem: " + thxEsc(q) + "</b></div><table style='width:100%;font-size:12.5px'>" + rows.map(function (r) { return "<tr><td style='opacity:.7;padding-right:8px'>" + thxEsc(r[0]) + "</td><td>" + thxEsc(String(r[1])) + "</td></tr>"; }).join("") + "</table>";
var p = thxProg();
p.rx["lib_" + P.CID] = 1;
thxProgSave();
}).catch(function (e) { o.innerHTML = "<div style='margin-top:6px'>" + (String(e && e.message) === "404" || String(e && e.message) === "none" ? "PubChem has no compound by that name. Try another spelling." : "PubChem could not be reached just now. Try again in a moment.") + "</div>"; });
},
function (kind) {
var p = thxProg(), ls = Object.keys(THX_LESSONS).filter(function (k) { return k.charAt(0) === kind; }), done = ls.filter(function (k) { return p.ls[k]; }).length;
if (kind === "c")
worldCard(worldFacts("🏅 Your chemistry", "Rank: " + thxChemRank() + " · kept on this device", [["Elements read", Object.keys(p.el).length + " of 118"], ["Reactions run", THX_RX.filter(function (R) { return p.rx[R.k]; }).length + " of " + THX_RX.length], ["Flame tests", THX_FLAMES.filter(function (F) { return p.rx["flame_" + F[1]]; }).length + " of " + THX_FLAMES.length], ["Equations balanced", THX_BAL.filter(function (b, i) { return p.rx["bal" + i]; }).length + " of " + THX_BAL.length], ["Lessons passed", done + " of " + ls.length]], ["Ranks: Newcomer, Apprentice, Lab assistant, Chemist, Master chemist."]), {});
else
worldCard(worldFacts("🏅 Your genetics", "Rank: " + thxGeneRank() + " · kept on this device", [["Lessons passed", done + " of " + ls.length], ["Strands read", Object.keys(p.gx).length], ["Genes looked up (live)", Object.keys(p.gl).length]], ["Ranks: Newcomer, Apprentice, Lab assistant, Geneticist, Master geneticist."]), {});
},
function (right, dp, unit) {
var a = +right, f = [a * 1.25, a * 0.8, a * 2, a * 0.5][Math.floor(Math.random() * 4)], g = a + (Math.random() < 0.5 ? -1 : 1) * Math.max(Math.abs(a) * 0.12, Math.pow(10, -dp) * 3);
var L = [thxFix(a, dp), thxFix(f, dp), thxFix(g, dp)];
if (L[1] === L[0])
L[1] = thxFix(a * 1.5, dp);
if (L[2] === L[0] || L[2] === L[1])
L[2] = thxFix(a * 0.6, dp);
return L.map(function (s) { return s + (unit || ""); });
},
function (id, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.userData.keep = 1;
THX.F.add(g);
var gl = thxMat(0xD8F0F8, null, { op: 0.32, ds: 1 }), steel = thxMat(0xB8BEC6, "metal"), dark = thxMat(0x24282E, null), I = {};
function item(name, px, pz) { var it = new THREE.Group(); it.position.set(px, 0, pz); it.visible = false; g.add(it); I[name] = it; return it; }
function liquid(parent, r1, r2, h, py) { var m = new THREE.MeshLambertMaterial({ color: 0xE8F0F4, transparent: true, opacity: 0.82 }), l = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 18), m); l.position.y = py; parent.add(l); return l; }
var bal = item("balance", -1.9, 0.05);
thxBox(0.3, 0.08, 0.28, thxMat(0xE8ECEE, null), 0, 0.04, 0, bal);
thxCyl(0.09, 0.012, steel, 0, 0.09, 0.02, bal, 20);
bal.userData.boat = thxBox(0.08, 0.01, 0.08, thxMat(0xF4F4F4, null), 0, 0.1, 0.02, bal);
bal.userData.boat.visible = false;
bal.userData.pile = thxSph(0.025, thxMat(0xF8F8F8, null), 0, 0.11, 0.02, bal, 8);
bal.userData.pile.visible = false;
bal.userData.scr = thxScreen(0.16, 0.05, 0, 0.06, 0.142, 0, function (c, W, H) { c.fillStyle = "#0E1A10"; c.fillRect(0, 0, W, H); c.fillStyle = "#7CFF8A"; c.font = "bold " + Math.round(H * 0.7) + "px monospace"; c.textAlign = "right"; c.fillText((bal.userData.read || "0.00") + " g", W - 6, H * 0.78); }, bal, 48);
var bu = item("burette", -0.9, -0.12);
thxBox(0.22, 0.015, 0.16, dark, 0, 0.008, 0, bu);
thxCyl(0.008, 0.75, steel, -0.06, 0.38, -0.04, bu, 8);
thxBox(0.1, 0.02, 0.02, steel, -0.02, 0.62, -0.04, bu);
thxCyl(0.011, 0.55, gl, 0.02, 0.5, -0.04, bu, 10);
bu.userData.liq = liquid(bu, 0.009, 0.009, 0.5, 0.5);
bu.userData.liq.position.x = 0.02;
bu.userData.liq.position.z = -0.04;
thxCyl(0.004, 0.04, gl, 0.02, 0.2, -0.04, bu, 6);
thxBox(0.03, 0.006, 0.006, thxMat(0x3A7ADF, null), 0.02, 0.22, -0.04, bu);
var fl = item("flask", -0.88, 0.06);
thxBox(0.12, 0.006, 0.12, thxMat(0xF8F8F8, null), 0, 0.003, 0, fl);
thxCyl(0.018, 0.14, gl, 0, 0.076, 0, fl, 16, 0.06);
fl.userData.liq = liquid(fl, 0.035, 0.058, 0.05, 0.032);
var pip = item("pipette", -0.55, 0.1);
var pp = thxCyl(0.004, 0.42, gl, 0, 0.22, 0, pip, 6);
thxSph(0.02, gl, 0, 0.2, 0, pip, 10);
thxBox(0.016, 0.002, 0.016, thxMat(0xE04040, null), 0, 0.33, 0, pip);
pip.rotation.z = 0.3;
thxCyl(0.012, 0.05, thxMat(0x2AA04A, null), 0.06, 0.47, 0, pip, 8);
var bn = item("bunsen", 0.25, 0.05);
thxCyl(0.05, 0.015, dark, 0, 0.008, 0, bn, 14);
thxCyl(0.012, 0.14, steel, 0, 0.085, 0, bn, 10);
thxCyl(0.016, 0.02, thxMat(0x8A9098, "metal"), 0, 0.04, 0, bn, 10);
thxCyl(0.006, 0.4, thxMat(0xE0702A, null), -0.2, 0.02, 0, bn, 6).rotation.z = Math.PI / 2;
var fm = new THREE.MeshBasicMaterial({ color: 0xFFC040, transparent: true, opacity: 0.7, depthWrite: false }), fc = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.13, 10, 1, true), fm);
fc.position.y = 0.22;
bn.add(fc);
var fi = new THREE.Mesh(new THREE.ConeGeometry(0.01, 0.05, 8, 1, true), new THREE.MeshBasicMaterial({ color: 0x6AA8FF, transparent: true, opacity: 0.8, depthWrite: false }));
fi.position.y = 0.18;
bn.add(fi);
bn.userData.fm = fm;
bn.userData.fc = fc;
bn.userData.fi = fi;
var tp = item("tripod", 0.25, 0.05);
for (var k = 0; k < 3; k++) {
var a = k / 3 * Math.PI * 2, leg = thxCyl(0.005, 0.27, thxMat(0x3A3E44, "metal"), Math.cos(a) * 0.07, 0.135, Math.sin(a) * 0.07, tp, 5);
leg.rotation.set(Math.sin(a) * 0.15, 0, -Math.cos(a) * 0.15);
}
thxCyl(0.09, 0.008, thxMat(0x3A3E44, "metal"), 0, 0.27, 0, tp, 16);
thxBox(0.16, 0.004, 0.16, thxMat(0x9AA0A6, "metal"), 0, 0.277, 0, tp);
thxCyl(0.04, 0.005, thxMat(0xE8E4DC, null), 0, 0.281, 0, tp, 14);
var bs = item("basin", 0.25, 0.05);
var bsh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), thxMat(0xF4F2EE, null, { ds: 1 }));
bsh.position.y = 0.34;
bs.add(bsh);
var bsc = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.012, 14), new THREE.MeshLambertMaterial({ color: 0x3A70D0 }));
bsc.position.y = 0.3;
bs.add(bsc);
bs.userData.fill = bsc;
var bk = item("beaker", 0.25, 0.05);
thxCyl(0.05, 0.11, gl, 0, 0.34, 0, bk, 16);
bk.userData.liq = liquid(bk, 0.046, 0.046, 0.07, 0.32);
var th = thxCyl(0.003, 0.26, thxMat(0xF4F4F4, null, { op: 0.7 }), 0.02, 0.42, 0, bk, 6);
th.rotation.z = -0.15;
thxCyl(0.0016, 0.12, thxMat(0xE03030, null), 0.012, 0.36, 0, bk, 5).rotation.z = -0.15;
var fn = item("funnel", 0.8, 0.05);
thxCyl(0.06, 0.08, gl, 0, 0.33, 0, fn, 14, 0.008);
thxCyl(0.006, 0.06, gl, 0, 0.26, 0, fn, 6);
thxCyl(0.05, 0.006, thxMat(0xF8F8F8, null), 0, 0.36, 0, fn, 14);
thxCyl(0.006, 0.32, steel, -0.08, 0.16, 0, fn, 6);
thxBox(0.1, 0.01, 0.01, steel, -0.04, 0.3, 0, fn);
thxCyl(0.04, 0.06, gl, 0, 0.03, 0, fn, 14);
fn.userData.liq = liquid(fn, 0.036, 0.036, 0.03, 0.018);
var ms = item("microscope", -0.3, -0.05);
thxBox(0.14, 0.03, 0.18, dark, 0, 0.015, 0, ms);
var arm = thxBox(0.03, 0.24, 0.04, dark, 0, 0.14, -0.06, ms);
arm.rotation.x = -0.15;
thxBox(0.12, 0.01, 0.1, dark, 0, 0.12, 0.02, ms);
thxCyl(0.016, 0.12, thxMat(0xE8ECEE, null), 0, 0.28, 0.01, ms, 12).rotation.x = 0.4;
thxCyl(0.012, 0.05, dark, 0, 0.35, -0.03, ms, 10).rotation.x = 0.4;
for (var o = 0; o < 3; o++) {
var ob = thxCyl(0.006, 0.035, steel, Math.cos(o * 2.1) * 0.015, 0.2, 0.04 + Math.sin(o * 2.1) * 0.015, ms, 6);
ob.rotation.x = 0.1;
}
thxCyl(0.015, 0.006, thxMat(0xFFF4D8, null, { e: 0xFFF0C8 }), 0, 0.04, 0.02, ms, 10);
ms.userData.slide = thxBox(0.075, 0.002, 0.025, thxMat(0xD8F0F8, null, { op: 0.6 }), 0, 0.126, 0.02, ms);
ms.userData.slide.visible = false;
var tr = item("tray", 0.6, 0.05);
thxBox(0.4, 0.03, 0.28, thxMat(0x2A2E34, null), 0, 0.015, 0, tr);
thxBox(0.38, 0.005, 0.26, thxMat(0xD8C8A0, null), 0, 0.032, 0, tr);
var hm = thxMat(0x7A2026, null), ht = new THREE.Group();
ht.position.set(0, 0.07, 0);
tr.add(ht);
var hb = thxSph(0.06, hm, 0, 0, 0, ht, 16);
hb.scale.set(1, 1.25, 0.85);
hb.rotation.z = 0.35;
thxSph(0.035, thxMat(0x8A3A3A, null), -0.04, 0.06, 0, ht, 12);
[[0.015, 0.09, 0.018, 0xD8B8A8], [-0.02, 0.085, 0.014, 0x6A2A4A], [0.035, 0.07, 0.012, 0x8A2A30]].forEach(function (v) { thxCyl(v[2], 0.06, thxMat(v[3], null), v[0], v[1], 0, ht, 8); });
thxBox(0.004, 0.13, 0.004, thxMat(0xE8D8A0, null), 0.01, 0, 0.05, ht).rotation.z = 0.35;
var cut = thxBox(0.07, 0.1, 0.004, thxMat(0xB04048, null), 0.005, -0.01, 0.052, ht);
cut.rotation.z = 0.35;
cut.visible = false;
tr.userData.heart = ht;
tr.userData.cut = cut;
var fw = new THREE.Group();
fw.position.set(0, 0.04, 0);
tr.add(fw);
thxCyl(0.005, 0.22, thxMat(0x3A8A3A, null), -0.08, 0, 0, fw, 6).rotation.z = Math.PI / 2;
for (var p = 0; p < 6; p++) {
var pe = thxBox(0.07, 0.004, 0.025, thxMat(p % 2 ? 0xF4F0F4 : 0xF8E8F0, null), 0.05 + Math.cos(p / 6 * Math.PI * 2) * 0.04, 0.004, Math.sin(p / 6 * Math.PI * 2) * 0.04, fw);
pe.rotation.y = -p / 6 * Math.PI * 2;
}
for (var s2 = 0; s2 < 6; s2++)
thxCyl(0.003, 0.05, thxMat(0xC88A2A, null), 0.05 + Math.cos(s2) * 0.012, 0.02, Math.sin(s2) * 0.012, fw, 4);
tr.userData.flower = fw;
var dn = item("dnatube", -1.4, 0.05);
thxCyl(0.03, 0.2, gl, 0, 0.1, 0, dn, 14);
dn.userData.liq = liquid(dn, 0.027, 0.027, 0.08, 0.045);
var et = liquid(dn, 0.027, 0.027, 0.05, 0.11);
et.material.color.setHex(0xF4F6F8);
et.material.opacity = 0.35;
dn.userData.eth = et;
dn.userData.strands = thxCyl(0.012, 0.03, thxMat(0xF8F8F4, null, { op: 0.9 }), 0, 0.088, 0, dn, 8);
dn.userData.strands.visible = false;
var gt = item("gel", -1.6, 0.02);
thxBox(0.34, 0.06, 0.16, thxMat(0xCFE8F0, null, { op: 0.45 }), 0, 0.03, 0, gt);
thxBox(0.2, 0.012, 0.12, thxMat(0xD8E8E8, null, { op: 0.85 }), 0, 0.035, 0, gt);
thxBox(0.03, 0.02, 0.16, thxMat(0x1A1A1A, null), -0.16, 0.07, 0, gt);
thxBox(0.03, 0.02, 0.16, thxMat(0xD02020, null), 0.16, 0.07, 0, gt);
var bands = [];
for (var b = 0; b < 10; b++) {
var bd = thxBox(0.008, 0.003, 0.014, thxMat(0x3A5ADF, null), -0.08, 0.043, -0.045 + (b % 5) * 0.022, gt);
bd.visible = false;
bands.push(bd);
}
gt.userData.bands = bands;
thxBox(0.14, 0.09, 0.12, thxMat(0x2A3038, "metal"), 0.3, 0.045, 0, gt);
THX_PR.rigs[id] = { g: g, I: I };
},
function (rig, P, st) {
var R = THX_PR.rigs[rig];
if (!R)
return;
var I = R.I;
Object.keys(I).forEach(function (k) { I[k].visible = P.kit.indexOf(k) >= 0; });
st = st || {};
if (I.bunsen) {
var B = I.bunsen.userData, f = st.flame;
B.fc.visible = !!f;
B.fi.visible = f === "b";
if (f === "y") {
B.fm.color.setHex(0xFFB030);
B.fc.scale.set(1.3, 1.6, 1.3);
}
if (f === "b") {
B.fm.color.setHex(0x4A7AFF);
B.fc.scale.set(0.8, 0.9, 0.8);
}
}
if (I.flask && st.flask !== undefined)
I.flask.userData.liq.material.color.setHex(st.flask);
if (I.flask)
I.flask.userData.liq.visible = st.flask !== null && st.flask !== undefined;
if (I.burette) {
var bl = I.burette.userData.liq, v = st.bur === undefined ? 0 : st.bur;
bl.visible = v > 0;
bl.scale.y = Math.max(0.01, v);
bl.position.y = 0.25 + 0.25 * v;
}
if (I.basin && st.basin !== undefined) {
I.basin.userData.fill.visible = st.basin !== null;
if (st.basin !== null)
I.basin.userData.fill.material.color.setHex(st.basin);
}
if (I.beaker && st.beaker !== undefined)
I.beaker.userData.liq.material.color.setHex(st.beaker);
if (I.funnel)
I.funnel.userData.liq.visible = !!st.filtrate, st.filtrate && I.funnel.userData.liq.material.color.setHex(st.filtrate);
if (I.balance) {
var U = I.balance.userData;
U.boat.visible = !!st.boat;
U.pile.visible = !!st.pile;
U.read = st.read || "0.00";
if (U.scr && U.scr.userData.redraw)
U.scr.userData.redraw();
}
if (I.microscope)
I.microscope.userData.slide.visible = !!st.slide;
if (I.tray) {
I.tray.userData.heart.visible = P.tray === "heart";
I.tray.userData.flower.visible = P.tray === "flower";
I.tray.userData.cut.visible = !!st.cut;
}
if (I.dnatube) {
var D = I.dnatube.userData;
D.liq.material.color.setHex(st.mash || 0xE04050);
D.eth.visible = !!st.eth;
D.strands.visible = !!st.strands;
}
if (I.gel)
I.gel.userData.bands.forEach(function (b, i) { var on = st.bands && st.bands[i] !== undefined && st.bands[i] !== null; b.visible = !!on; if (on) {
b.position.x = -0.08 + st.bands[i] * 0.16;
} });
},
function (v) {
return thxCanvas(160, 220, function (c, W, H) {
c.fillStyle = "#F4F6F8";
c.fillRect(0, 0, W, H);
var base = Math.floor(v), y0 = H / 2 - (v - base) * 100;
c.fillStyle = "#E8F2F8";
c.fillRect(50, 0, 60, H);
c.strokeStyle = "#333";
c.lineWidth = 1;
c.font = "13px sans-serif";
c.fillStyle = "#222";
for (var i = -2; i <= 3; i++) {
for (var t = 0; t < 10; t++) {
var y = y0 + (i * 10 + t) * 10;
if (y < 0 || y > H)
continue;
c.beginPath();
c.moveTo(50, y);
c.lineTo(t === 0 ? 95 : t === 5 ? 82 : 72, y);
c.stroke();
if (t === 0)
c.fillText(String(base + i), 20, y + 5);
}
}
c.fillStyle = "rgba(120,170,220,.35)";
c.fillRect(50, H / 2, 60, H / 2);
c.strokeStyle = "#1A4A8A";
c.lineWidth = 2;
c.beginPath();
c.moveTo(50, H / 2 - 5);
c.quadraticCurveTo(80, H / 2 + 6, 110, H / 2 - 5);
c.stroke();
c.strokeStyle = "#E02020";
c.setLineDash([4, 3]);
c.beginPath();
c.moveTo(0, H / 2 + 1);
c.lineTo(W, H / 2 + 1);
c.stroke();
c.setLineDash([]);
c.fillStyle = "#E02020";
c.font = "11px sans-serif";
c.fillText("eye level", 112, H / 2 - 4);
});
},
function (pts) {
return thxCanvas(300, 180, function (c, W, H) {
c.fillStyle = "#0E1622";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#5A6A80";
c.beginPath();
c.moveTo(34, 10);
c.lineTo(34, H - 24);
c.lineTo(W - 8, H - 24);
c.stroke();
c.fillStyle = "#DDE6F0";
c.font = "10px sans-serif";
[-10, 0, 50, 100].forEach(function (t) { var y = H - 24 - (t + 15) / 125 * (H - 34); c.fillText(t + "°", 4, y + 3); c.strokeStyle = "rgba(90,106,128,.4)"; c.beginPath(); c.moveTo(34, y); c.lineTo(W - 8, y); c.stroke(); });
c.fillText("time (minutes)", W / 2 - 30, H - 6);
c.strokeStyle = "#4AE8FF";
c.lineWidth = 2;
c.beginPath();
pts.forEach(function (t, i) { var x = 34 + i / (pts.length - 1) * (W - 42), y = H - 24 - (t + 15) / 125 * (H - 34); if (i)
c.lineTo(x, y);
else
c.moveTo(x, y); });
c.stroke();
c.fillStyle = "#FFD24A";
pts.forEach(function (t, i) { var x = 34 + i / (pts.length - 1) * (W - 42), y = H - 24 - (t + 15) / 125 * (H - 34); c.beginPath(); c.arc(x, y, 2.5, 0, 6.3); c.fill(); });
});
},
function (kind, mag) {
return thxCanvas(240, 240, function (c, W, H) {
c.fillStyle = "#000";
c.fillRect(0, 0, W, H);
c.save();
c.beginPath();
c.arc(W / 2, H / 2, 112, 0, 6.3);
c.clip();
var sc = mag / 400;
if (kind === "onion") {
c.fillStyle = "#F4E8B8";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#8A6A2A";
c.lineWidth = 2;
var cw = 150 * sc, ch = 46 * sc;
for (var r = -1; r < H / ch + 1; r++)
for (var q = -1; q < W / cw + 1; q++) {
var x = q * cw + (r % 2 ? cw / 2 : 0), y = r * ch;
c.strokeRect(x, y, cw, ch);
c.fillStyle = "#6A4A1A";
c.beginPath();
c.ellipse(x + cw * 0.35, y + ch * 0.5, 7 * sc + 1, 5 * sc + 1, 0, 0, 6.3);
c.fill();
}
}
else {
c.fillStyle = "#EEF2F8";
c.fillRect(0, 0, W, H);
var seed = 7;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
for (var n = 0; n < 9; n++) {
var cx = rnd() * W, cy = rnd() * H, rr = (28 + rnd() * 10) * sc;
c.fillStyle = "rgba(150,180,230,.35)";
c.strokeStyle = "#5A7AC0";
c.lineWidth = 1.2;
c.beginPath();
for (var a = 0; a <= 12; a++) {
var ang = a / 12 * Math.PI * 2, rad = rr * (0.85 + 0.3 * Math.sin(a * 1.7 + n));
if (a)
c.lineTo(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad);
else
c.moveTo(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad);
}
c.fill();
c.stroke();
c.fillStyle = "#1A3A9A";
c.beginPath();
c.arc(cx, cy, 5 * sc + 1, 0, 6.3);
c.fill();
}
}
c.restore();
c.strokeStyle = "#333";
c.lineWidth = 6;
c.beginPath();
c.arc(W / 2, H / 2, 113, 0, 6.3);
c.stroke();
c.fillStyle = "#DDE6F0";
c.font = "12px sans-serif";
c.fillText("×" + mag, 8, H - 8);
});
},
function (title, draw, labels) {
return thxCanvas(320, 250, function (c, W, H) {
c.fillStyle = "#F8F6F0";
c.fillRect(0, 0, W, H);
draw(c, W, H);
c.font = "11px sans-serif";
labels.forEach(function (L) { c.strokeStyle = "#333"; c.lineWidth = 1; c.beginPath(); c.moveTo(L[0], L[1]); c.lineTo(L[2], L[3]); c.stroke(); c.fillStyle = "#111"; c.textAlign = L[2] < W / 2 ? "right" : "left"; c.fillText(L[4], L[2] + (L[2] < W / 2 ? -3 : 3), L[3] + 4); });
c.textAlign = "left";
c.font = "bold 12px sans-serif";
c.fillText(title, 8, 16);
});
},
function () {
return thxLabelled("The heart, opened (front view)", function (c) {
c.fillStyle = "#C04048";
c.beginPath();
c.moveTo(160, 70);
c.bezierCurveTo(230, 60, 250, 140, 170, 220);
c.bezierCurveTo(90, 150, 90, 70, 160, 70);
c.fill();
c.fillStyle = "#E8A0A0";
c.beginPath();
c.ellipse(130, 105, 22, 18, 0, 0, 6.3);
c.fill();
c.beginPath();
c.ellipse(195, 105, 22, 18, 0, 0, 6.3);
c.fill();
c.fillStyle = "#E09090";
c.beginPath();
c.ellipse(135, 160, 20, 38, 0.2, 0, 6.3);
c.fill();
c.beginPath();
c.ellipse(185, 160, 15, 30, -0.2, 0, 6.3);
c.fill();
c.fillStyle = "#7A1A20";
c.fillRect(158, 95, 6, 100);
c.fillStyle = "#E8C8A8";
c.fillRect(165, 30, 16, 50);
c.fillStyle = "#6A4A8A";
c.fillRect(140, 34, 14, 44);
c.fillRect(105, 58, 30, 10);
c.fillStyle = "#A04A6A";
c.fillRect(205, 74, 40, 8);
c.strokeStyle = "#F4F0E8";
c.lineWidth = 2;
c.beginPath();
c.moveTo(118, 122);
c.lineTo(140, 122);
c.moveTo(178, 122);
c.lineTo(205, 122);
c.stroke();
}, [[173, 40, 250, 30, "aorta"], [147, 40, 70, 30, "pulmonary artery"], [110, 63, 60, 70, "vena cava"], [230, 78, 270, 70, "pulmonary veins"], [130, 105, 50, 110, "right atrium"], [195, 105, 270, 110, "left atrium"],
[130, 122, 50, 135, "tricuspid valve"], [192, 122, 270, 135, "bicuspid (mitral) valve"], [135, 165, 50, 175, "right ventricle"], [185, 165, 270, 175, "left ventricle (thick wall)"], [161, 195, 240, 215, "septum"]]);
},
function () {
return thxLabelled("A lily, cut in half", function (c) {
c.fillStyle = "#3A8A3A";
c.fillRect(156, 180, 8, 60);
c.fillStyle = "#F4D8E4";
c.beginPath();
c.moveTo(160, 175);
c.quadraticCurveTo(70, 150, 60, 60);
c.quadraticCurveTo(120, 120, 160, 175);
c.fill();
c.beginPath();
c.moveTo(160, 175);
c.quadraticCurveTo(250, 150, 260, 60);
c.quadraticCurveTo(200, 120, 160, 175);
c.fill();
c.fillStyle = "#9AC86A";
c.beginPath();
c.ellipse(160, 162, 12, 18, 0, 0, 6.3);
c.fill();
c.fillStyle = "#F8F8E8";
c.beginPath();
c.arc(156, 162, 2.5, 0, 6.3);
c.arc(164, 158, 2.5, 0, 6.3);
c.arc(160, 168, 2.5, 0, 6.3);
c.fill();
c.strokeStyle = "#7AA84A";
c.lineWidth = 3;
c.beginPath();
c.moveTo(160, 145);
c.lineTo(160, 80);
c.stroke();
c.fillStyle = "#6AA83A";
c.beginPath();
c.arc(160, 78, 6, 0, 6.3);
c.fill();
c.strokeStyle = "#D8D0A0";
c.lineWidth = 2;
c.beginPath();
c.moveTo(150, 165);
c.lineTo(125, 95);
c.moveTo(170, 165);
c.lineTo(195, 95);
c.stroke();
c.fillStyle = "#B8661A";
c.fillRect(118, 86, 14, 8);
c.fillRect(188, 86, 14, 8);
}, [[160, 78, 240, 40, "stigma"], [160, 115, 240, 115, "style"], [166, 162, 250, 165, "ovary"], [160, 162, 70, 200, "ovules"], [125, 90, 50, 90, "anther"], [136, 128, 50, 130, "filament"], [90, 100, 40, 60, "petal / sepal (tepal)"]]);
},
function (lanes) {
return thxCanvas(300, 200, function (c, W, H) {
c.fillStyle = "#0A1020";
c.fillRect(0, 0, W, H);
c.fillStyle = "#1A2A4A";
c.fillRect(20, 20, W - 40, H - 40);
c.font = "10px sans-serif";
lanes.forEach(function (L, i) {
var x = 34 + i * ((W - 68) / lanes.length);
c.fillStyle = "#0A1020";
c.fillRect(x, 24, 30, 6);
c.fillStyle = "#DDE6F0";
c.fillText(L[0], x, 16);
L[1].forEach(function (d) { c.fillStyle = "rgba(140,220,255,.9)"; c.fillRect(x, 30 + d * (H - 60), 30, 4); });
});
c.fillStyle = "#DDE6F0";
c.fillText("− wells", W - 60, H - 6);
c.fillText("+", W - 14, H - 24);
});
},
function (S) { var m = (S.t + S.t2) / 2, n = 0.1 * m / 1000; return "Moles of HCl = 0.100 × " + m.toFixed(2) + "/1000 = " + n.toExponential(3) + " mol. HCl + NaOH → NaCl + H₂O is 1:1, so the NaOH has the same moles in 0.02500 dm³: " + (n / 0.025).toFixed(4) + " mol/dm³. Only concordant titres go into the mean; the rough one never does."; },
function (kind, rig) {
var p = thxProg(), b = "", fns = {};
THX_PRAC.filter(function (P) { return P.at === rig; }).forEach(function (P) { b += worldBtn("p" + P.k, (p.rx["pr_" + P.k] ? "✅ " : "🧑‍🔬 ") + P.n, P.steps.length + " steps"); fns["p" + P.k] = function () { thxPracStart(P, rig); }; });
worldCard(worldFacts("🧑‍🔬 Practicals", "Do it with your own hands. Choose each step; the bench shows what happens.", [], ["Goggles on. The rule here: nothing explosive, ever."]) + b, fns);
},
function (note) {
var R = THX_PR.run;
if (!R)
return;
var P = R.P, st = P.steps[R.i];
if (!st) {
var Q = P.q(R.S);
thxQuiz(Q, function (ok) {
var p = thxProg();
if (ok) {
p.rx["pr_" + P.k] = 1;
thxProgSave();
}
worldCard(worldFacts(ok ? "✅ " + P.n : "🔁 " + P.n, ok ? "Right, and it is in your lab book." : "The answer: " + Q[1][Q[2]], [], [P.sum(R.S)]) + worldBtn("again", "Do it again (new readings)", "") + worldBtn("more", "← Other practicals", ""), { again: function () { thxPracStart(P, R.rig); }, more: function () { thxPracList(P.at.charAt(0), R.rig); } });
});
return;
}
var order = st.pick.map(function (x, i) { return i; }).sort(function () { return Math.random() - 0.5; }), b = "", fns = {};
order.forEach(function (i) {
b += worldBtn("c" + i, st.pick[i][0], "");
fns["c" + i] = function () {
if (i !== 0) {
R.miss++;
thxPracStep("✋ " + st.pick[i][1]);
return;
}
var after = typeof st.st === "function" ? st.st(R.S) : st.st;
if (after)
thxPracShow(R.rig, P, after);
var did = typeof st.did === "function" ? st.did(R.S) : st.did, img = st.img ? thxImg(st.img(R.S)) : "";
R.i++;
worldCard(worldFacts("👀 " + P.n, "Step " + R.i + " of " + P.steps.length, [], [did]) + img + worldBtn("n", R.i < P.steps.length ? "Next step →" : "Work it out →", ""), { n: function () { thxPracStep(); } });
};
});
worldCard(worldFacts("🧑‍🔬 " + P.n, "Step " + (R.i + 1) + " of " + P.steps.length + ": what do you do?", [], [st.t]) + (note ? "<div style='margin:6px 0;padding:6px 8px;border-left:3px solid #FFD24A;background:rgba(255,210,74,.08)'>" + thxEsc(note) + "</div>" : "") + b, fns);
},
function (F) {
var wm = thxMat(0xE8ECEE, "plaster");
var rooms = thxRoomRow(F, [{ n: "Sequencing", w: 9, glassy: 1, lv: 4 }, { n: "Copying room (PCR)", w: 7, glassy: 1, lv: 4 }, { n: "Cell culture", w: 8, glassy: 1, lv: 4 }, { n: "Cryogenic biobank", w: 8, glassy: 1, lv: 4 }, { n: "Bioinformatics", w: 9, glassy: 1, lv: 4 }], "n");
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Sequencing") {
for (var i = 0; i < 2; i++) {
var sx = r.x0 + 1.4 + i * 2.6;
thxBox(1.4, 1.2, 0.8, thxMat(0xF4F6F8, null), sx, 0.6, r.z0 + 0.7);
thxSolid(sx, r.z0 + 0.7, 0.7, 0.4, 0, 1.2);
thxScreen(0.9, 0.5, sx, 0.95, r.z0 + 1.11, 0, function (c, W, H) { thxChroma(c, W, H); });
}
thxDesk(r.x1 - 1.6, 0, r.cz + 0.8, Math.PI, {});
thxScreen(2.4, 1.2, r.cx, 2.1, r.z0 + 0.02, 0, function (c, W, H) { thxChroma(c, W, H, 1); });
thxSpot(r.cx, r.cz + 1, 2.6, "🧬 The sequencers", "how a genome is read", function () { worldCard(worldFacts("🧬 Sequencing", "Reading DNA letter by letter", [["How", "copies are built with letters that glow — A green, C blue, G yellow, T red — and a camera reads each one as it goes on"], ["A human genome", "about 3.1 billion letters, read today in about a day"], ["The first one", "the Human Genome Project: thirteen years, finished in 2003"]], ["The coloured peaks on the screen are a real kind of read-out: one peak for each letter."]), {}); });
}
else if (k === "Copying room (PCR)") {
for (var j = 0; j < 3; j++)
thxBox(0.5, 0.35, 0.6, thxMat(0xE8ECEE, null), r.x0 + 1 + j * 1.6, 1.1, r.z0 + 0.55);
thxBench(r.cx, 0, r.z0 + 0.55, r.x1 - r.x0 - 0.5, 0, { noShelf: 1 });
thxScreen(1.6, 0.9, r.cx, 2.0, r.z0 + 0.02, 0, function (c, W, H) { thxText(c, ["PCR: copying DNA", "95 °C  the strands come apart", "55 °C  the primers stick", "72 °C  the enzyme copies", "about 30 cycles"], W, H); });
thxSpot(r.cx, r.cz + 1, 2.4, "🧪 The copying machines", "see the cycle", function () { thxPcrCard(); });
}
else if (k === "Cell culture") {
thxFumeHood(r.cx - 1.4, 0, r.z0 + 0.5, 0);
thxBox(0.9, 1.8, 0.7, thxMat(0xE8ECEE, "metal"), r.x1 - 0.7, 0.9, r.z0 + 0.5);
thxSolid(r.x1 - 0.7, r.z0 + 0.5, 0.45, 0.35, 0, 1.8);
thxSpot(r.cx, r.cz + 1, 2.4, "🧫 Cell culture", "what grows here", function () { worldCard(worldFacts("🧫 Cell culture", "Human cells grown in dishes, kept at 37 °C", [["The cabinet", "sterile air flows downward so nothing from the room gets in"], ["The incubator", "37 °C and 5% carbon dioxide, like the inside of a body"], ["Why", "to study how cells work, and to test medicines, without harming anyone"]], []), {}); });
}
else if (k === "Cryogenic biobank") {
for (var t = 0; t < 4; t++) {
var tx = r.x0 + 1 + t * 1.5;
thxCyl(0.5, 1.1, thxMat(0xC8CED6, "metal"), tx, 0.55, r.z0 + 0.9, null, 16);
thxSolid(tx, r.z0 + 0.9, 0.55, 0, 0, 1.1);
var mist = thxCyl(0.45, 0.12, thxMat(0xF4F8FF, null, { op: 0.25 }), tx, 1.16, r.z0 + 0.9, null, 14);
(function (m, ph) { THX.fx.push(function (dt, tt) { m.scale.y = 1 + Math.sin(tt * 0.7 + ph) * 0.3; }); })(mist, t);
}
thxSpot(r.cx, r.cz + 1, 2.4, "❄️ The biobank", "what is kept here", function () { worldCard(worldFacts("❄️ The cryogenic biobank", "Liquid nitrogen at −196 °C", [["What", "samples kept for decades: DNA, cells, seeds"], ["Why so cold", "at −196 °C almost nothing changes, so a sample stays as it was"], ["Safety", "nitrogen gas can push the oxygen out of a room, so there is an oxygen alarm on the wall and nobody works here alone"]], []), {}); });
}
else {
for (var d = 0; d < 3; d++)
thxDesk(r.x0 + 1.4 + d * 2.4, 0, r.cz - 0.6, Math.PI, { two: 1 });
thxScreen(2.6, 1.3, r.cx, 2.0, r.z0 + 0.02, 0, function (c, W, H) { thxText(c, ["BIOINFORMATICS", "3.1 billion letters in a genome", "about 20,000 genes that make proteins", "comparing genomes shows what differs"], W, H); });
thxPerson("bioinf", r.cx + 1.6, r.cz + 1.4, Math.PI, { title: "bioinformatician", doing: "comparing two genomes across three screens", about: "You find meaning in DNA data: genes, how species compare, how a sequence lines up against the reference." });
}
});
thxHelixHall(0, -1);
thxWall("z", -11.6, 13.8, -13.6, 0, THX_H, 0.15, wm, [{ at: -9, w: 1.4, h: 2.3 }, { at: -2, w: 5, h: 2.8, glass: 1, sill: 0.9 }, { at: 6, w: 5, h: 2.8, glass: 1, sill: 0.9 }]);
thxSign(["BIOLOGY PRACTICALS", "cells · dissection · DNA · gels"], 2.4, 0.42, "#0E1622", "#6AF0C4", -13.5, 2.85, -2, Math.PI / 2);
thxBench(-19, 0, -6.4, 5.2, 0);
thxPracRig("g1", -19, 0.9, -6.15);
thxBench(-19, 0, 1.6, 5.2, 0);
thxPracRig("g2", -19, 0.9, 1.85);
thxSpot(-19, -4.6, 2.2, "🔬 The microscope bench", "cells, stains and DNA from fruit", function () { thxPracList("g", "g1"); });
thxSpot(-19, 3.4, 2.2, "🔪 The dissection bench", "a heart, a flower, a gel run", function () { thxPracList("g", "g2"); });
thxShelves(-23.4, 0, 8, 3, Math.PI / 2, "glass");
thxPerson("labtech", -16.4, 8.6, Math.PI, { title: "lab technician", doing: "laying out dissecting kits and fresh slides", about: "You run the teaching lab: microscopes, stains, dissection, gels. You teach good practice and safety above all." });
thxWall("z", -11.6, 13.8, 13.6, 0, THX_H, 0.15, wm, [{ at: -9, w: 1.4, h: 2.3 }, { at: -3, w: 5, h: 2.8, glass: 1, sill: 0.9 }, { at: 5, w: 1.4, h: 2.3 }]);
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++)
thxDesk(16.6 + j * 2.6, 0, -7.6 + i * 2.6, Math.PI / 2);
thxScreen(3.2, 1.6, 23.75, 2.0, -6.3, -Math.PI / 2, function (c, W, H) { thxText(c, ["GENETICS LESSONS", "DNA · genes · proteins", "inheritance · chromosomes", "evolution and variation"], W, H); });
thxSpot(18, -6.3, 3.2, "📗 Genetics lessons", "choose a lesson", function () { thxLessonList("g"); });
thxSign(["GENETICS STUDY ROOM"], 2.2, 0.32, "#0E1622", "#4AE8FF", 13.5, 2.85, -3, -Math.PI / 2);
[[17, 2, "🧬 The Strand Reader", "DNA → RNA → protein", function () { thxStrandCard(0); }, ["THE STRAND READER", "DNA → RNA → protein"]],
[17, 6, "🟪 The Punnett square", "cross two parents", function () { thxPunnett("Bb", "Bb"); }, ["PUNNETT SQUARE", "what might the children be?"]],
[21, 2, "🔎 The Gene Library", "any human gene (live)", function () { thxGeneCard(); }, ["GENE LIBRARY", "live from Ensembl"]],
[21, 6, "🏅 Your genetics progress", "see it", function () { thxProgressCard("g"); }, ["YOUR PROGRESS", "lessons · strands · genes"]]].forEach(function (K) {
thxBox(1.0, 1.3, 0.6, thxMat(0x2A3038, "metal"), K[0], 0.65, K[1]);
thxSolid(K[0], K[1], 0.5, 0.3, 0, 1.3);
thxScreen(0.9, 0.6, K[0], 1.5, K[1] + 0.31, 0, function (c, W, H) { thxText(c, K[5], W, H, { size: 18 }); });
thxSpot(K[0], K[1] + 1.1, 1.6, K[2], K[3], K[4]);
});
thxPerson("genet", 15.2, 8.8, Math.PI / 2, { title: "geneticist", doing: "checking a sequence against the reference genome", about: "You study human genes: how traits are inherited, what a gene makes, how sequences are compared. You explain clearly and correctly, and you keep to what is taught in classrooms and textbooks." });
},
function (c, W, H, big) {
c.fillStyle = "#0A0E16";
c.fillRect(0, 0, W, H);
var cols = { A: "#3AD06A", C: "#3A8AFF", G: "#FFD24A", T: "#FF4A4A" }, s = "ATGGATGATGATATCGCCGCGCTCGTCGTCGACAACGGCTCC", n = big ? s.length : 20, dx = W / (n + 1);
for (var i = 0; i < n; i++) {
var ch = s[i], x = dx * (i + 1), h = H * (0.35 + ((i * 37) % 11) / 30);
c.strokeStyle = cols[ch];
c.lineWidth = 2;
c.beginPath();
for (var k = -12; k <= 12; k++) {
var xx = x + k * dx / 12, yy = H * 0.8 - h * Math.exp(-k * k / 18);
if (k === -12)
c.moveTo(xx, yy);
else
c.lineTo(xx, yy);
}
c.stroke();
c.fillStyle = cols[ch];
c.font = "bold " + Math.round(H / 9) + "px monospace";
c.textAlign = "center";
c.fillText(ch, x, H * 0.95);
}
c.textAlign = "left";
},
function (x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.userData.keep = 1;
THX.F.add(g);
thxCyl(2.6, 0.12, thxMat(0x1A1E24, "metal"), 0, 0.06, 0, g, 32);
thxCyl(2.4, 0.02, thxGlow(0x1A3A5A), 0, 0.13, 0, g, 32);
thxSolid(x, z, 2.6, 0, 0, 1.2);
var H = THX_H - 0.4, n = THX.lite ? 22 : 40, back = thxGlow(0x4AE8FF), back2 = thxGlow(0xC050FF), pair = [0x3AD06A, 0x3A8AFF, 0xFFD24A, 0xFF4A4A], hx = new THREE.Group();
hx.position.y = 0.3;
g.add(hx);
for (var i = 0; i < n; i++) {
var t = i / n, y = t * H * 0.95, a = t * Math.PI * 2 * 2.2;
thxSph(0.07, back, Math.cos(a) * 0.9, y, Math.sin(a) * 0.9, hx, 8);
thxSph(0.07, back2, Math.cos(a + Math.PI) * 0.9, y, Math.sin(a + Math.PI) * 0.9, hx, 8);
if (i % 2 === 0) {
var r1 = thxCyl(0.025, 0.88, thxGlow(pair[i % 4]), Math.cos(a) * 0.45, y, Math.sin(a) * 0.45, hx, 6), r2 = thxCyl(0.025, 0.88, thxGlow(pair[(i + 2) % 4]), Math.cos(a + Math.PI) * 0.45, y, Math.sin(a + Math.PI) * 0.45, hx, 6);
[r1, r2].forEach(function (r) { r.rotation.z = Math.PI / 2; r.rotation.y = -a; });
}
}
THX.fx.push(function (dt, tt) { hx.rotation.y = tt * 0.12; });
thxSign(["THE DOUBLE HELIX"], 2.0, 0.32, "#0E1622", "#4AE8FF", 0, 0.9, 2.65, 0, g);
thxSpot(x, z + 3.4, 2.6, "🧬 The double helix", "read its story", function () {
worldCard(worldFacts("🧬 The double helix", "The shape of DNA, found in 1953", [["The X-ray photograph", "Rosalind Franklin and Raymond Gosling, King's College London, 1952: Photo 51"], ["The model", "James Watson and Francis Crick, Cambridge, 1953"], ["The pairs", "A always with T, G always with C — green with red, yellow with blue here"], ["One turn", "about ten base pairs, 3.4 nanometres"], ["In you", "about two metres of it in every cell, wound into 46 chromosomes"]], ["Because each strand matches the other, either one can rebuild its partner. That is how life copies itself."]), {});
});
},
function () {
var rows = [["95 °C", "the two strands come apart"], ["55 °C", "short primers stick on either side of the piece you want"], ["72 °C", "the enzyme, found in a hot spring bacterium, copies from the primers"]];
for (var c = 5; c <= 30; c += 5)
rows.push(["After " + c + " cycles", "about " + Math.pow(2, c).toLocaleString() + " copies"]);
worldCard(worldFacts("🧪 PCR: the polymerase chain reaction", "Every cycle doubles the DNA", rows, ["Invented by Kary Mullis in 1983. It is how DNA testing and many medical tests work: a few molecules become enough to see."]), {});
},
function (i) {
var S = THX_SEQ[i], dna = S[1], rna = thxTranscribe(dna), prot = thxTranslate(rna), p = thxProg();
if (!p.gx[i]) {
p.gx[i] = 1;
thxProgSave();
}
function codons(s) { return s.match(/.{1,3}/g).join(" "); }
var h = "<div style='font-family:monospace;font-size:12.5px;line-height:1.7;word-break:break-all'>" +
"<div><b>DNA</b> (coding strand) " + codons(dna) + "</div><div style='opacity:.75'><b>DNA</b> (template) " + codons(thxComp(dna)) + "</div>" +
"<div><b>mRNA</b> " + codons(rna) + "</div><div><b>Protein</b> " + prot.map(function (a) { return a === "*" ? "STOP" : THX_AA[a].split(" ")[0]; }).join("–") + "</div></div>";
worldCard(worldFacts("🧬 " + S[0], "The real opening of the gene", [], [S[2], "Transcription copies DNA into RNA, where T becomes U. Translation reads the RNA three letters at a time, and each codon means one amino acid."]) + h +
worldBtn("q", "❓ Read a codon", "a question") + worldBtn("tab", "📋 The whole codon table", "") + worldBtn("nx", "Another gene →", ""), { q: function () {
var k = Math.floor(Math.random() * (rna.length / 3)), cd = rna.substr(k * 3, 3), a = THX_CODE[cd], wrong = Object.keys(THX_AA).filter(function (x) { return x !== a && x !== "*"; }).sort(function () { return Math.random() - 0.5; }).slice(0, 2);
thxQuiz(["The codon " + cd + " codes for…", [THX_AA[a]].concat(wrong.map(function (w) { return THX_AA[w]; })), 0], function (ok) { if (ok) {
var pp = thxProg();
pp.gx["q" + cd] = 1;
thxProgSave();
} thxSay(ok ? "✅ Right." : "It is <b>" + thxEsc(THX_AA[a]) + "</b>."); thxStrandCard(i); });
},
tab: function () { thxCodonTable(i); }, nx: function () { thxStrandCard((i + 1) % THX_SEQ.length); } });
},
function (back) {
var b = "UCAG", h = "<table style='border-collapse:collapse;font-family:monospace;font-size:11.5px;margin:6px 0'>";
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
h += "<tr>";
for (var k = 0; k < 4; k++) {
var cd = b[i] + b[j] + b[k], a = THX_CODE[cd];
h += "<td style='border:1px solid rgba(143,180,232,.25);padding:2px 5px'>" + cd + " " + (a === "*" ? "<b>STOP</b>" : THX_AA[a].split(" ")[1] || a) + "</td>";
}
h += "</tr>";
}
h += "</table>";
worldCard(worldFacts("📋 The genetic code", "64 codons, 20 amino acids and STOP", [], ["Most amino acids have more than one codon, so some changes to the DNA make no difference to the protein. AUG means methionine and also says where to start."]) + h + worldBtn("back", "← Back", ""), { back: function () { thxStrandCard(back || 0); } });
},
function (a, b) {
var G = ["BB", "Bb", "bb"], A = [a[0], a[1]], B = [b[0], b[1]], cells = [], dom = 0, cnt = {};
A.forEach(function (x) { B.forEach(function (y) { var g = [x, y].sort().join(""); cells.push(g); cnt[g] = (cnt[g] || 0) + 1; if (/B/.test(g))
dom++; }); });
var t = "<table style='margin:8px auto;border-collapse:collapse;font-size:16px;text-align:center'><tr><td></td>" + B.map(function (y) { return "<td style='padding:4px 12px;color:#C050FF'><b>" + y + "</b></td>"; }).join("") + "</tr>";
A.forEach(function (x, i) { t += "<tr><td style='padding:4px 12px;color:#4AE8FF'><b>" + x + "</b></td>" + B.map(function (y, j) { var g = cells[i * 2 + j]; return "<td style='border:1px solid #4AE8FF;padding:8px 14px;background:" + (/B/.test(g) ? "rgba(120,80,40,.5)" : "rgba(80,140,220,.35)") + "'>" + g + "</td>"; }).join("") + "</tr>"; });
t += "</table>";
var fns = {};
G.forEach(function (g) { fns["a" + g] = function () { thxPunnett(g, b); }; fns["b" + g] = function () { thxPunnett(a, g); }; });
var btn = "<div style='margin:4px 0'>Parent 1: " + G.map(function (g) { return "<button class='btn' data-w='a" + g + "' style='" + (g === a ? "outline:2px solid #4AE8FF" : "") + "'>" + g + "</button>"; }).join(" ") + "</div><div>Parent 2: " + G.map(function (g) { return "<button class='btn' data-w='b" + g + "' style='" + (g === b ? "outline:2px solid #C050FF" : "") + "'>" + g + "</button>"; }).join(" ") + "</div>";
var p = thxProg();
p.gx["pun" + a + b] = 1;
thxProgSave();
worldCard(worldFacts("🟪 Punnett square: eye colour, the classroom model", "B = brown (dominant), b = blue (recessive)", [["Brown eyes", dom + " in 4 (" + dom * 25 + "%)"], ["Blue eyes", (4 - dom) + " in 4 (" + (4 - dom) * 25 + "%)"], ["Each child", Object.keys(cnt).map(function (g) { return g + " " + cnt[g] * 25 + "%"; }).join(" · ")]], ["Each parent passes on one of their two copies, by chance. A recessive trait shows only with two copies of it. Real eye colour depends on several genes; this is the classic teaching model."]) + t + btn, fns);
},
function () {
worldCard(worldFacts("🔎 The Gene Library", "Live from Ensembl, the European genome browser", [], ["Type a gene's symbol: INS, ACTB, LCT, MC1R, FOXP2, COL1A1, RHO…"]) +
"<input id='thx-gq' placeholder='a gene symbol' style='width:100%;padding:6px;margin:6px 0;background:#0A0E16;color:#E8ECF4;border:1px solid #4AE8FF;border-radius:3px;text-transform:uppercase'>" + worldBtn("go", "Look it up", "") + "<div id='thx-go'></div>", { go: function () { thxGeneLook(((document.getElementById("thx-gq") || {}).value || "").trim().toUpperCase()); } });
setTimeout(function () { var i = document.getElementById("thx-gq"); if (i) {
i.focus();
i.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
thxGeneLook(i.value.trim().toUpperCase()); };
} }, 0);
},
function (q) {
var o = document.getElementById("thx-go");
if (!o)
return;
if (!q || !/^[A-Z0-9-]{1,15}$/.test(q)) {
o.innerHTML = "<div style='margin-top:6px'>A gene symbol is letters and numbers, like ACTB.</div>";
return;
}
o.innerHTML = "<div style='opacity:.75;margin-top:6px'>Asking Ensembl…</div>";
function own(why) {
var L = THX_GENES[q];
o.innerHTML = L ? "<div style='margin-top:8px'><b>" + q + "</b> — the Tower's own notes" + (why ? " (" + thxEsc(why) + ")" : "") + "</div><table style='width:100%;font-size:12.5px'><tr><td style='opacity:.7;padding-right:8px'>Chromosome</td><td>" + L[0] + "</td></tr><tr><td style='opacity:.7'>What it makes</td><td>" + thxEsc(L[1]) + "</td></tr></table>"
: "<div style='margin-top:6px'>" + (why ? thxEsc(why) + ". " : "") + "The Tower's own notes do not have " + thxEsc(q) + ".</div>";
}
thxFetchJSON("https://rest.ensembl.org/lookup/symbol/homo_sapiens/" + encodeURIComponent(q) + "?content-type=application/json").then(function (d) {
if (!d || !d.id)
throw new Error("none");
var len = Math.abs(d.end - d.start) + 1, L = THX_GENES[q], rows = [["Name", (d.description || "").replace(/\s*\[Source.*$/, "") || "—"], ["Where", "chromosome " + d.seq_region_name + ", " + (+d.start).toLocaleString() + " to " + (+d.end).toLocaleString() + " (" + (d.strand > 0 ? "forward" : "reverse") + " strand)"], ["Length", len.toLocaleString() + " letters (" + (len / 1000).toFixed(1) + " kb)"], ["Kind", String(d.biotype || "").replace(/_/g, " ")], ["Ensembl ID", d.id]];
if (L)
rows.push(["In plain words", L[1]]);
o.innerHTML = "<div style='margin-top:8px'><b>Live from Ensembl: " + thxEsc(d.display_name || q) + "</b></div><table style='width:100%;font-size:12.5px'>" + rows.map(function (r) { return "<tr><td style='opacity:.7;padding-right:8px'>" + thxEsc(r[0]) + "</td><td>" + thxEsc(String(r[1])) + "</td></tr>"; }).join("") + "</table>";
var p = thxProg();
p.gl[q] = 1;
thxProgSave();
}).catch(function (e) { own(String(e && e.message) === "none" || String(e && e.message) === "400" ? "Ensembl has no human gene by that symbol" : "Ensembl could not be reached just now"); });
},
function (F) {
var W = THX_WG, cx = W.cx, cz = W.cz, cm = thxMat(0x74797F, "concrete"), lite = THX.lite, hw = W.cw / 2;
function P(r, a) { return [cx + Math.cos(a) * r, cz + Math.sin(a) * r]; }
var D = Math.PI / 180, spokeA = THX_WSPOKE.map(function (S) { return S[0] * D; });
function gaps(r, extra) { var half = Math.asin(Math.min(0.99, (hw + 0.05) / r)); return spokeA.filter(function (a, i) { return !extra || extra(i); }).map(function (a) { return [a - half, a + half]; }); }
function arc(r, gp, side) {
var n = Math.max(16, Math.round(r * 2 * Math.PI / 1.4));
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2, hole = false;
gp.forEach(function (g) { var d = Math.atan2(Math.sin(am - (g[0] + g[1]) / 2), Math.cos(am - (g[0] + g[1]) / 2)); if (Math.abs(d) < (g[1] - g[0]) / 2 + Math.PI / n)
hole = true; });
if (hole)
continue;
var p0 = P(r, a0), p1 = P(r, a1);
thxWSeg(p0[0], p0[1], p1[0], p1[1], cm, { side: side, i: i, ceilTray: side !== 0 });
}
}
arc(W.hub, gaps(W.hub), -1);
arc(W.ri - hw, gaps(W.ri - hw), 1);
arc(W.ri + hw, gaps(W.ri + hw), -1);
arc(W.ro - hw, gaps(W.ro - hw), 1);
arc(W.ro + hw, gaps(W.ro + hw, function (i) { return i !== 6; }), -1);
spokeA.forEach(function (a, k) {
var px = -Math.sin(a), pz = Math.cos(a);
[[Math.sqrt(W.hub * W.hub - hw * hw), Math.sqrt((W.ri - hw) * (W.ri - hw) - hw * hw)], [Math.sqrt((W.ri + hw) * (W.ri + hw) - hw * hw), Math.sqrt((W.ro - hw) * (W.ro - hw) - hw * hw)]].forEach(function (T) {
[-1, 1].forEach(function (sd) { var x0 = cx + Math.cos(a) * T[0] + px * sd * hw, z0 = cz + Math.sin(a) * T[0] + pz * sd * hw, x1 = cx + Math.cos(a) * T[1] + px * sd * hw, z1 = cz + Math.sin(a) * T[1] + pz * sd * hw; thxWSeg(x0, z0, x1, z1, cm, { tray: sd < 0 }); });
});
var L = W.ro - W.hub, m = P(W.hub + L / 2, a), st = thxBox(L, 0.012, 0.12, thxGlow(THX_WSPOKE[k][2]), m[0], 0.008, m[1]);
st.rotation.y = -a;
var mo = P(W.hub - 0.25, a);
thxSign([String(k + 1) + "  " + THX_WSPOKE[k][1].toUpperCase()], 2.4, 0.3, "#0E1622", "#DDE6F0", mo[0], 3.3, mo[1], -a + Math.PI / 2);
var mo2 = P(W.ri + hw + 0.25, a);
thxSign([THX_WSPOKE[k][1].toUpperCase() + "  →"], 2.0, 0.26, "#0E1622", "#" + ("000000" + THX_WSPOKE[k][2].toString(16)).slice(-6), mo2[0], 3.3, mo2[1], -a - Math.PI / 2);
});
[W.ri, W.ro].forEach(function (r) { var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 3, 96), thxGlow(r === W.ri ? 0x6AF0C4 : 0x4AE8FF)); t.rotation.x = Math.PI / 2; t.position.set(cx, 0.01, cz); THX.F.add(t); });
thxSign(["INNER RING"], 1.4, 0.26, "#0E1622", "#6AF0C4", P(W.ri + hw - 0.1, 22.5 * D)[0], 3.3, P(W.ri + hw - 0.1, 22.5 * D)[1], -22.5 * D - Math.PI / 2);
thxSign(["OUTER RING"], 1.4, 0.26, "#0E1622", "#4AE8FF", P(W.ro + hw - 0.1, 67.5 * D)[0], 3.3, P(W.ro + hw - 0.1, 67.5 * D)[1], -67.5 * D - Math.PI / 2);
thxWebRoom(0, "Server hall", 6.8, 7.0);
thxWebRoom(180, "Archive", 6.8, 7.0);
thxWebRoom(315, "Power vault", 4.5, 5.0);
thxWebRoom(225, "Water plant", 4.5, 5.0);
thxWebRoom(45, "Air handling", 4.5, 5.0);
thxWebRoom(135, "Workshop", 4.5, 5.0);
thxWebCages();
var tm = P(W.ro + hw + 0.3, 90 * D);
thxSign(["⬆ HELIX LIFTS · THE PLAZA"], 2.4, 0.3, "#0E1622", "#F4F2EC", tm[0], 3.3, tm[1] - 0.1, Math.PI);
thxHeartRoom(W.hub, cx, cz);
var tp = P(5.3, 67.5 * D);
thxWidowTerminal(tp[0], tp[1], Math.atan2(cx - tp[0], cz - tp[1]));
thxWebPost(P(5.0, 112.5 * D), 112.5 * D);
[202.5, 247.5, 292.5, 337.5].forEach(function (dg, i) {
var q = P(W.hub - 0.22, dg * D);
if (i === 1 || i === 2)
thxScreen(2.4, 1.3, q[0], 1.8, q[1], -dg * D - Math.PI / 2, function (c, Wd, H) { thxWebMap(c, Wd, H); }, null, 110);
else {
thxDPinboard(q[0], 1.6, q[1], -dg * D - Math.PI / 2, 1.6, 1.0, i);
var b = P(W.hub - 0.6, dg * D);
thxBox(1.6, 0.08, 0.4, thxMat(0x8A6A48, "wood"), b[0], 0.45, b[1]).rotation.y = -dg * D - Math.PI / 2;
}
});
var sp = P(3.9, -90 * D);
thxSpot(sp[0], sp[1], 2.4, "🕸️ The Web", "what is down here", function () {
worldCard(worldFacts("🕸️ The Web", "B2, under the Tower and the plaza", THX_WSPOKE.map(function (S, i) { var R = THX_WEB.filter(function (x) { return x[0] === S[1]; })[0]; return [String(i + 1) + ". " + S[1], R ? R[1] : ""]; }), ["Eight corridors out from this hub, crossed by two rings you can walk all the way round. Not a hive: a web, so there is always more than one way round.", "At the centre, behind the only level 5 door in Somnucor, the lift down to WHITE WIDOW's Heart."]), {});
});
var e1 = P(W.ri, 30 * D);
thxPerson("webeng", e1[0], e1[1], -120 * D, { title: "facilities engineer", doing: "walking the rings with a torch and a clipboard", about: "You keep the Tower's water, power and air running from the corridors beneath it. You know every valve down here.", wander: 2 });
if (!lite) {
var e2 = P(W.ro, 200 * D);
thxPerson("webporter", e2[0], e2[1], 110 * D, { title: "stores porter", doing: "pushing a cage of spares round the outer ring" });
}
},
function (x0, z0, x1, z1, mat, o) {
o = o || {};
var dx = x1 - x0, dz = z1 - z0, len = Math.sqrt(dx * dx + dz * dz), ang = -Math.atan2(dz, dx), g = new THREE.Group();
g.position.set((x0 + x1) / 2, 0, (z0 + z1) / 2);
g.rotation.y = ang;
THX.F.add(g);
thxBox(len + 0.04, THX_H, 0.3, mat, 0, THX_H / 2, 0, g);
thxBox(len + 0.04, 0.12, 0.34, thxMat(0x3A3E44, "metal"), 0, 0.06, 0, g);
THX.solids.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: len / 2 + 0.02, hd: 0.15, rot: ang, b: 0, h: THX_H });
var i = o.i || 0, side = o.side || 0, lite = THX.lite;
if (i % 2 === 0 || len > 2.5) {
thxBox(0.6, 0.08, 0.06, thxGlow(0xE8F0F4), 0, 2.6, 0.17, g);
thxBox(0.6, 0.08, 0.06, thxGlow(0xE8F0F4), 0, 2.6, -0.17, g);
}
var zs = side > 0 ? -1 : side < 0 ? 1 : (o.tray ? -1 : 1);
if (o.ceilTray !== false && (side !== 0 || o.tray)) {
thxBox(len + 0.05, 0.03, 0.32, thxMat(0x8A9098, "metal"), 0, 3.75, zs * 0.38, g);
thxBox(len + 0.05, 0.05, 0.24, thxMat(0x2A2C30, null), 0, 3.79, zs * 0.38, g);
thxBox(len + 0.05, 0.03, 0.05, thxMat(0xC8A030, null), 0, 3.83, zs * 0.32, g);
if (!lite || i % 2 === 0) {
var p1 = thxCyl(0.07, len + 0.06, thxMat(0x3A7AC8, "metal"), 0, 3.4, zs * 0.3, g, 8);
p1.rotation.z = Math.PI / 2;
var p2 = thxCyl(0.05, len + 0.06, thxMat(0x9A3A2A, "metal"), 0, 3.2, zs * 0.26, g, 8);
p2.rotation.z = Math.PI / 2;
}
}
var kind = (i * 7 + Math.round(len * 3)) % 9;
if (side !== 0 && len > 1.0) {
var f = zs * 0.16;
if (kind === 0) {
var fp = thxDFire(0, f, 0);
g.add(fp);
fp.rotation.y = zs > 0 ? 0 : Math.PI;
fp.position.set(0, 0, f);
}
else if (kind === 2) {
thxBox(0.6, 0.8, 0.18, thxMat(0x9AA0A6, "metal"), 0, 1.5, zs * 0.24, g);
thxBox(0.1, 0.1, 0.01, thxMat(0xE8C020, null), 0, 1.75, zs * 0.335, g);
thxBox(0.02, 0.1, 0.02, thxMat(0x3A3E44, null), 0.22, 1.45, zs * 0.34, g);
}
else if (kind === 4) {
var vw = thxCyl(0.04, 0.4, thxMat(0x8A9098, "metal"), 0, 1.3, zs * 0.36, g, 8);
vw.rotation.x = Math.PI / 2;
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 5, 14), thxMat(0xC81A1A, "metal"));
wh.position.set(0, 1.3, zs * 0.55);
g.add(wh);
thxCyl(0.06, 1.3, thxMat(0x3A7AC8, "metal"), 0, 0.65, zs * 0.3, g, 8);
}
else if (kind === 6 && !lite) {
thxBox(0.12, 0.12, 0.2, thxMat(0xE8ECEE, "metal"), 0, 3.55, zs * 0.25, g);
thxCyl(0.04, 0.08, thxMat(0x1A1A1A, null), 0, 3.52, zs * 0.38, g, 8).rotation.x = Math.PI / 2;
thxBox(0.02, 0.02, 0.02, thxGlow(0xD83A3A), 0.04, 3.58, zs * 0.36, g);
}
else if (kind === 8) {
thxBox(0.5, 0.3, 0.02, thxMat(0x9AA0A6, "metal"), 0, 0.35, zs * 0.16, g);
for (var v = 0; v < 4; v++)
thxBox(0.44, 0.02, 0.01, thxMat(0x3A3E44, null), 0, 0.25 + v * 0.07, zs * 0.175, g);
}
}
},
function (c, W, H) {
c.fillStyle = "#0A1018";
c.fillRect(0, 0, W, H);
var cx = W * 0.55, cy = H * 0.52, s = H / 40;
c.strokeStyle = "#3A4A5A";
c.lineWidth = s * 3;
[THX_WG.hub, THX_WG.ri, THX_WG.ro].forEach(function (r) { c.beginPath(); c.arc(cx, cy, r * s, 0, 7); c.stroke(); });
THX_WSPOKE.forEach(function (S) {
var a = S[0] * Math.PI / 180;
c.strokeStyle = "#" + ("000000" + S[2].toString(16)).slice(-6);
c.lineWidth = s * 2.4;
c.beginPath();
c.moveTo(cx + Math.cos(a) * THX_WG.hub * s, cy + Math.sin(a) * THX_WG.hub * s);
c.lineTo(cx + Math.cos(a) * (THX_WG.ro + 3) * s, cy + Math.sin(a) * (THX_WG.ro + 3) * s);
c.stroke();
c.fillStyle = "#DDE6F0";
c.font = "bold " + Math.round(s * 1.6) + "px sans-serif";
c.textAlign = "center";
c.fillText(S[1], cx + Math.cos(a) * (THX_WG.ro + 4.5) * s, cy + Math.sin(a) * (THX_WG.ro + 4.5) * s + s * 0.6);
});
c.fillStyle = "#C050FF";
c.beginPath();
c.arc(cx, cy, 3.2 * s, 0, 7);
c.fill();
c.fillStyle = "#F4F2EC";
c.font = "bold " + Math.round(s * 1.5) + "px sans-serif";
c.fillText("HEART", cx, cy + s * 0.5);
c.fillStyle = "#FFD24A";
c.beginPath();
c.arc(cx, cy + 5.2 * s, s * 0.9, 0, 7);
c.fill();
c.textAlign = "left";
c.fillStyle = "#4AE8FF";
c.font = "bold " + Math.round(s * 2) + "px sans-serif";
c.fillText("B2 · THE WEB", s, s * 2.6);
c.fillStyle = "#9AA8B8";
c.font = Math.round(s * 1.4) + "px sans-serif";
c.fillText("● you are here", s, s * 4.6);
},
function (p, a) {
var face = Math.atan2(THX_WG.cx - p[0], THX_WG.cz - p[1]), g = new THREE.Group();
g.position.set(p[0], 0, p[1]);
g.rotation.y = face;
THX.F.add(g);
thxBox(2.2, 1.05, 0.5, thxMat(0x2A2E34, "metal"), 0, 0.525, 0.5, g);
thxBox(2.3, 0.05, 0.62, thxMat(0x8A6A48, "wood"), 0, 1.07, 0.5, g);
thxBox(2.2, 0.04, 0.02, thxGlow(0x4AE8FF), 0, 0.9, 0.76, g);
for (var k = 0; k < 3; k++)
thxDPlane(0.56, 0.32, thxDScreenMat(6 + (k % 2)), -0.65 + k * 0.65, 1.42, -0.02, 0, g), thxBox(0.6, 0.36, 0.03, thxMat(0x16181C, null), -0.65 + k * 0.65, 1.42, -0.04, g);
thxBox(1.9, 0.04, 0.4, thxMat(0x8A6A48, "wood"), 0, 0.76, -0.1, g);
thxSign(["SECURITY"], 1.0, 0.22, "#0E1622", "#4AE8FF", 0, 1.95, -0.15, 0, g);
thxSolid(p[0], p[1], 1.2, 1.2, 0, 1.2);
var gp = [p[0] - Math.sin(face) * 0.9, p[1] - Math.cos(face) * 0.9];
thxPerson("webguard", gp[0], gp[1], face, { title: "Tower security officer", doing: "watching the Web's cameras from the hub", about: "You guard the Web and the Heart's door. Only the Keeper's card opens it; you have never been inside and you do not expect to be." });
},
function () {
var W = THX_WG, D = Math.PI / 180, lite = THX.lite, mesh = thxMat(0x8A9098, "metal", { op: 0.55 }), steel = thxMat(0x6A7078, "metal");
[-112, -102, -78, -68].forEach(function (dg, i) {
var a = dg * D, r = W.ro + W.cw / 2 - 0.55, x = W.cx + Math.cos(a) * r, z = W.cz + Math.sin(a) * r, g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = -a - Math.PI / 2;
THX.F.add(g);
thxBox(2.2, 2.4, 0.02, mesh, 0, 1.2, 0.42, g);
thxBox(2.2, 0.06, 0.06, steel, 0, 2.4, 0.42, g);
thxBox(0.06, 2.4, 0.06, steel, -1.1, 1.2, 0.42, g);
thxBox(0.06, 2.4, 0.06, steel, 1.1, 1.2, 0.42, g);
for (var l = 0; l < 3; l++) {
thxBox(2.0, 0.04, 0.6, steel, 0, 0.3 + l * 0.75, 0, g);
for (var b = 0; b < (lite ? 2 : 4); b++)
thxBox(0.4, 0.3, 0.4, thxMat([0xB89A6A, 0x3A6A9A, 0x8A9098][(b + l + i) % 3], b % 3 === 0 ? "wood" : null), -0.7 + b * 0.47, 0.48 + l * 0.75, 0, g);
}
thxSign(["STORES " + String.fromCharCode(65 + i)], 0.8, 0.2, "#0E1622", "#FF8A5A", 0, 2.6, 0.45, 0, g);
THX.solids.push({ x: x, z: z, hw: 1.15, hd: 0.45, rot: -a - Math.PI / 2, b: 0, h: 2.5 });
});
var sp = [W.cx, W.cz - W.ro];
thxSpot(sp[0], sp[1], 2.2, "📦 The store rooms", "look in", function () { worldCard(worldFacts("📦 The store rooms", "Spares for everything above", [["Cages A–D", "filters, lamps, cable, pumps' seals, fuses, ceiling tiles"], ["Card needed", "level 2, Staff"], ["Who keeps them", "the stores porter, round the outer ring with a cage on wheels"]], []), {}); }, { lv: 2 });
},
function (deg, name, depth, width) {
var W = THX_WG, a = deg * Math.PI / 180, r0 = W.ro + W.cw / 2 + 0.25, rc = r0 + depth / 2, cx = W.cx + Math.cos(a) * rc, cz = W.cz + Math.sin(a) * rc, rot = -a, lite = THX.lite;
var co = Math.cos(rot), si = Math.sin(rot);
function L(lx, lz) { return [cx + lx * co + lz * si, cz - lx * si + lz * co]; }
var cm = thxMat(0x7A8088, "concrete"), g = new THREE.Group();
g.position.set(cx, 0, cz);
g.rotation.y = rot;
THX.F.add(g);
function wall(x0, z0, x1, z1) { var p = L(x0, z0), q = L(x1, z1); thxWSeg(p[0], p[1], q[0], q[1], cm, { side: 0, ceilTray: false }); }
var hd = depth / 2, hwd = width / 2, door = 0.95;
wall(-hd, -hwd, hd, -hwd);
wall(-hd, hwd, hd, hwd);
wall(hd, -hwd, hd, hwd);
wall(-hd, -hwd, -hd, -door);
wall(-hd, door, -hd, hwd);
thxBox(0.34, THX_H - 2.5, 2 * door, cm, -hd, THX_H - (THX_H - 2.5) / 2, 0, g);
thxBox(0.4, 0.1, 2 * door + 0.1, thxMat(0x5A6068, "metal"), -hd, 2.5, 0, g);
for (var h = 0; h < 5; h++)
thxBox(0.5, 0.012, 0.18, thxMat(h % 2 ? 0x1A1A1A : 0xE8C020, null), -hd - 0.1, 0.008, -0.72 + h * 0.36, g);
var sg = L(-hd - 0.2, 0);
thxSign([name.toUpperCase()], 2.2, 0.32, "#1A2230", "#F0F2F4", sg[0], 2.95, sg[1], rot - Math.PI / 2);
thxBox(depth - 0.6, 0.05, 0.2, thxGlow(0xE8F0F4), 0, THX_H - 0.08, -hwd + 0.6, g);
thxBox(depth - 0.6, 0.05, 0.2, thxGlow(0xE8F0F4), 0, THX_H - 0.08, hwd - 0.6, g);
var R = THX_WEB.filter(function (x) { return x[0] === name; })[0] || [name, ""], lv = /Server|Power/.test(name) ? 3 : 2;
thxWebFit(name, g, L, depth, width, rot, lite);
var sp = L(-hd + 1.0, 0);
thxSpot(sp[0], sp[1], 2.0, "🚪 " + name, "what is in here", function () { worldCard(worldFacts("🚪 " + name, R[1], thxWebFacts(name).concat([["Card needed", "level " + lv + ", " + thxLvName(lv)]]), []), {}); }, { lv: lv });
},
function (n) {
return ({ "Server hall": [["The racks", "forty-two of them in hot and cold aisles: cold air in at the front, hot air out at the back and up the chimneys"], ["Her", "everything WHITE WIDOW does outside the Heart runs here"]],
"Archive": [["The stacks", "rolling shelves on rails, cranked open one aisle at a time"], ["The plan chest", "every drawing of the Tower since its first stone"]],
"Power vault": [["The transformers", "four, stepping the city's supply down for the Tower"], ["The batteries", "enough to keep the fans and the Heart running until the generator starts"]],
"Water plant": [["The tanks", "raw water in, filtered through sand and carbon, cleaned with ultraviolet light"], ["The pumps", "duty and standby, so one can always be mended"]],
"Air handling": [["The units", "fans, filters and coils that move and clean every floor's air"], ["The ducts", "up through the risers to every floor"]],
"Workshop": [["The benches", "vices, a lathe, a pillar drill, the welding bay"], ["What is made here", "brackets, hinges, the Tower's own small mends"]] })[n] || [];
},
function (n, g, L, D, Wd, rot, lite) {
var hd = D / 2, hw = Wd / 2;
function at(lx, lz, ry) { var p = L(lx, lz); return [p[0], p[1], rot + (ry || 0)]; }
if (n === "Server hall") {
for (var row = 0; row < 3; row++)
for (var k = 0; k < (lite ? 4 : 7); k++) {
var lz = -hw + 0.9 + k * ((Wd - 1.8) / ((lite ? 4 : 7) - 1)), lx = -hd + 2.0 + row * 1.9, q = at(lx, lz, row % 2 ? Math.PI / 2 : -Math.PI / 2);
thxDRack(q[0], q[1], q[2], 2.1);
}
for (var t = 0; t < 3; t++) {
thxBox(0.6, 0.01, Wd - 1.2, thxMat(0xB8BEC4, "metal"), -hd + 2.95 + t * 0.0, 0.006, 0, g);
}
thxBox(1.4, 0.2, Wd - 1.0, thxMat(0x8A9098, "metal"), -hd + 2.95, 3.9, 0, g);
thxBox(0.25, 0.4, Wd - 1.6, thxMat(0x2A2C30, null), -hd + 2.95, 3.6, 0, g);
var p = at(hd - 0.5, 0, -Math.PI / 2);
thxDCabinets(p[0], p[1], p[2], 3, "cab");
thxBox(0.4, 2.2, 0.8, thxMat(0xE8ECEE, "metal"), hd - 0.4, 1.1, -hw + 0.8, g);
thxBox(0.3, 0.15, 0.01, thxGlow(0x3AE86A), hd - 0.61, 1.7, -hw + 0.8, g);
var pp = at(-hd + 1.2, hw - 1.0);
thxPerson("websrv", pp[0], pp[1], rot - Math.PI / 2, { title: "systems engineer", doing: "swapping a failed drive in rack twelve", about: "You keep WHITE WIDOW's servers running. You are proud of the uptime and fussy about cable labels." });
}
else if (n === "Archive") {
for (var s = 0; s < (lite ? 3 : 5); s++) {
var lz2 = -hw + 1.0 + s * 0.95;
for (var rl = 0; rl < 2; rl++)
thxBox(D - 2.2, 0.02, 0.04, thxMat(0x5A6068, "metal"), 0.6, 0.01, lz2 + (rl ? 0.3 : -0.3), g);
var sh = at(0.6, lz2, 0);
thxShelves(sh[0], 0, sh[1], D - 2.4, sh[2], "binders");
thxBox(0.06, 0.3, 0.3, thxMat(0x3A3E44, "metal"), hd - 0.6, 1.0, lz2, g);
}
thxBox(1.4, 0.9, 0.9, thxMat(0x4A5A4A, "metal"), -hd + 1.0, 0.45, hw - 0.9, g);
for (var dr = 0; dr < 5; dr++)
thxBox(1.3, 0.01, 0.01, thxMat(0x2A2C30, null), -hd + 1.0, 0.15 + dr * 0.16, hw - 0.44, g);
var tb = at(-hd + 1.0, -hw + 1.0);
thxTable(tb[0], 0, tb[1], 1.2, 0.8, thxMat(0x6A4A32, "wood"));
thxDPendant(tb[0], THX_H, tb[1], 0x2A4A3A);
var pp2 = at(-hd + 1.6, -hw + 1.6);
thxPerson("webarch", pp2[0], pp2[1], rot + Math.PI / 2, { title: "archivist", doing: "cataloguing a box of old drawings of the Tower", about: "You keep the Tower's papers, plans and minutes. You can find anything if given a minute." });
}
else if (n === "Power vault") {
for (var tr = 0; tr < 2; tr++) {
var tx = -hd + 1.4 + tr * 1.8;
thxBox(1.2, 1.6, 1.2, thxMat(0x5A6A5A, "metal"), tx, 0.8, -hw + 1.0, g);
for (var fn = 0; fn < 6; fn++)
thxBox(0.03, 1.3, 0.2, thxMat(0x4A5A4A, "metal"), tx - 0.5 + fn * 0.2, 0.8, -hw + 1.7, g);
thxCyl(0.08, 0.4, thxMat(0xC8A060, null), tx - 0.3, 1.8, -hw + 1.0, g, 8);
thxCyl(0.08, 0.4, thxMat(0xC8A060, null), tx + 0.3, 1.8, -hw + 1.0, g, 8);
var p3 = at(tx, -hw + 1.0);
thxSolid(p3[0], p3[1], 0.75, 0.75, 0, 1.8);
}
for (var bt = 0; bt < (lite ? 4 : 8); bt++) {
thxBox(0.4, 0.5, 0.5, thxMat(0x2A2C30, null), -hd + 0.6 + bt * 0.48, 0.25, hw - 0.6, g);
thxBox(0.3, 0.03, 0.1, thxMat(0xC8302A, null), -hd + 0.6 + bt * 0.48, 0.51, hw - 0.6, g);
}
var p4 = at(0, hw - 0.6);
thxSolid(p4[0], p4[1], 2.0, 0.4, 0, 0.6);
thxSign(["⚡ DANGER · HIGH VOLTAGE", "authorised persons only"], 1.4, 0.4, "#E8C020", "#1A1A1A", hd - 0.18, 1.8, 0, -Math.PI / 2, g);
for (var sb = 0; sb < 4; sb++) {
thxBox(0.5, 2.0, 0.6, thxMat(0x9AA0A6, "metal"), hd - 0.35, 1.0, -1.5 + sb * 0.62, g);
thxBox(0.01, 0.12, 0.12, thxMat(0xF4F4F4, null), hd - 0.66, 1.6, -1.5 + sb * 0.62, g);
thxBox(0.01, 0.05, 0.05, thxGlow(sb === 2 ? 0xFFB43A : 0x3AE86A), hd - 0.66, 1.35, -1.5 + sb * 0.62, g);
thxBox(0.01, 0.3, 0.05, thxMat(0x2A2C30, null), hd - 0.66, 0.9, -1.4 + sb * 0.62, g);
}
var p11 = at(hd - 0.35, -0.57);
thxSolid(p11[0], p11[1], 0.3, 1.25, 0, 2.0);
thxBox(D - 0.6, 0.3, 0.4, thxMat(0x8A9098, "metal"), 0, 3.6, 0, g);
for (var bk = 0; bk < 3; bk++)
thxBox(0.06, 0.6, 0.06, thxMat(0x5A6068, "metal"), -1 + bk, 3.95, 0, g);
}
else if (n === "Water plant") {
for (var tk = 0; tk < 2; tk++) {
thxCyl(0.75, 2.6, thxMat(0x5A8AB8, "metal"), -hd + 1.3 + tk * 1.8, 1.3, -hw + 1.1, g, 18);
var p5 = at(-hd + 1.3 + tk * 1.8, -hw + 1.1);
thxRound(p5[0], p5[1], 0.8, 2.6);
thxCyl(0.1, 1.4, thxMat(0x8A9098, "metal"), -hd + 1.3 + tk * 1.8, 3.2, -hw + 1.1, g, 8);
var gauge = thxCyl(0.1, 0.04, thxMat(0xF4F4F4, null), -hd + 1.3 + tk * 1.8, 1.6, -hw + 1.87, g, 12);
gauge.rotation.x = Math.PI / 2;
}
var pipe = thxCyl(0.1, D - 0.6, thxMat(0x3A7AC8, "metal"), 0, 2.9, -hw + 0.5, g, 10);
pipe.rotation.z = Math.PI / 2;
for (var pm = 0; pm < 2; pm++) {
thxBox(0.6, 0.5, 0.4, thxMat(0x2A6A9A, "metal"), -hd + 1.2 + pm * 1.4, 0.25, hw - 0.6, g);
thxCyl(0.18, 0.5, thxMat(0x3A7AC8, "metal"), -hd + 1.2 + pm * 1.4, 0.6, hw - 0.6, g, 12).rotation.z = Math.PI / 2;
}
var p6 = at(-0.2, hw - 0.6);
thxSolid(p6[0], p6[1], 1.4, 0.35, 0, 0.9);
var uv = thxCyl(0.15, 1.6, thxMat(0xC8CCD0, "metal"), hd - 0.6, 1.0, hw - 1.2, g, 12);
thxBox(0.2, 0.1, 0.01, thxGlow(0x8A4AFF), hd - 0.6, 1.4, hw - 1.04, g);
}
else if (n === "Air handling") {
thxBox(D - 1.2, 2.2, 1.6, thxMat(0x8A9098, "metal"), 0, 1.1, -hw + 1.0, g);
for (var pn = 0; pn < 4; pn++) {
thxBox(0.02, 1.8, 1.5, thxMat(0x5A6068, null), -hd + 1.0 + pn * 0.9, 1.1, -hw + 1.0, g);
thxBox(0.2, 0.04, 0.02, thxMat(0x3A3E44, null), -hd + 1.3 + pn * 0.9, 1.2, -hw + 1.81, g);
}
var p7 = at(0, -hw + 1.0);
THX.solids.push({ x: p7[0], z: p7[1], hw: (D - 1.2) / 2, hd: 0.85, rot: rot, b: 0, h: 2.2 });
thxBox(0.9, 0.9, D - 0.4, thxMat(0xB8BEC4, "metal"), 0, 3.4, 0, g).rotation.y = Math.PI / 2;
var fan = new THREE.Group();
fan.position.set(hd - 0.5, 1.5, hw - 1.0);
g.add(fan);
fan.userData.keep = 1;
thxCyl(0.6, 0.3, thxMat(0x3A3E44, "metal"), 0, 0, 0, fan, 20).rotation.z = Math.PI / 2;
for (var bl = 0; bl < 5; bl++) {
var bb = thxBox(0.05, 0.9, 0.16, thxMat(0x8A9098, "metal"), -0.18, 0, 0, fan);
bb.rotation.x = bl / 5 * Math.PI;
}
THX.fx.push(function (dt, t) { fan.children.forEach(function (c, i) { if (i > 0)
c.rotation.x = (i - 1) / 5 * Math.PI + t * 0.8; }); });
var p8 = at(hd - 0.5, hw - 1.0);
thxSolid(p8[0], p8[1], 0.5, 0.7, 0, 2.2);
thxSign(["AHU-1 · SUPPLY 4.2 m³/s"], 1.4, 0.24, "#E8ECEE", "#1A2632", -0.4, 2.4, -hw + 1.82, 0, g);
}
else if (n === "Workshop") {
var b1 = at(-0.1, -hw + 0.45, 0);
thxBench(b1[0], 0, b1[1], D - 1.7, b1[2], { noShelf: 1, noStools: 1 });
thxBox(D - 1.6, 1.1, 0.03, thxMat(0xB08A5A, null), -0.1, 1.75, -hw + 0.18, g);
for (var tl = 0; tl < 10; tl++)
thxBox(0.05 + (tl % 3) * 0.03, 0.08 + (tl % 3) * 0.1, 0.04, thxMat([0xC81A1A, 0x2A2C30, 0xE8C020, 0x8A9098][tl % 4], "metal"), -1.3 + tl * 0.26, 1.5 + (tl % 2) * 0.42, -hw + 0.22, g);
thxBox(0.18, 0.22, 0.16, thxMat(0x3A5A8A, "metal"), -0.8, 1.0, -hw + 0.4, g);
thxBox(0.6, 1.5, 0.6, thxMat(0x3A6A3A, "metal"), hd - 0.55, 0.75, -hw + 0.6, g);
thxCyl(0.04, 0.4, thxMat(0x8A9098, "metal"), hd - 0.55, 1.3, -hw + 0.85, g, 8);
var p9 = at(hd - 0.55, -hw + 0.6);
thxSolid(p9[0], p9[1], 0.35, 0.35, 0, 1.5);
thxBox(1.4, 0.9, 0.5, thxMat(0x2A4A7A, "metal"), 0.4, 0.45, hw - 0.45, g);
thxBox(1.0, 0.12, 0.25, thxMat(0x8A9098, "metal"), 0.4, 1.0, hw - 0.45, g);
thxCyl(0.1, 0.3, thxMat(0x5A6068, "metal"), -0.15, 1.05, hw - 0.45, g, 10).rotation.z = Math.PI / 2;
var p10 = at(0.4, hw - 0.45);
thxSolid(p10[0], p10[1], 0.75, 0.3, 0, 1.1);
thxBox(0.03, 1.8, 1.4, thxMat(0xC83A1A, null, { op: 0.6 }), hd - 0.25, 0.95, hw - 1.0, g);
var tr2 = at(-hd + 1.3, hw - 0.8, 0);
thxDTrolley(tr2[0], tr2[1], tr2[2], "tools");
var pp3 = at(-0.4, -hw + 1.25);
thxPerson("webfit", pp3[0], pp3[1], rot + Math.PI, { title: "fitter", doing: "filing a bracket true in the vice", about: "You make and mend the Tower's fittings: brackets, hinges, rails. You have opinions about cheap screws." });
}
},
function (hubR, ox, oz) {
ox = ox || 0;
oz = oz || 0;
var g = new THREE.Group();
g.position.set(ox, 0, oz);
g.userData.keep = 1;
THX.F.add(g);
var R = 3.2, wall = thxMat(0x1A1620, "metal"), rib = thxMat(0x2A2632, "metal"), vio = thxGlow(0xC050FF), pale = thxGlow(0xE8DCFF);
for (var s = 0; s < 12; s++) {
if (s === 3)
continue;
var a = s / 12 * Math.PI * 2, mx = Math.cos(a) * R, mz = Math.sin(a) * R, len = 2 * R * Math.sin(Math.PI / 12) + 0.12;
var seg = thxBox(len, THX_H, 0.35, wall, mx, THX_H / 2, mz, g);
seg.rotation.y = -a - Math.PI / 2;
thxRound(ox + mx, oz + mz, 0.75, THX_H);
var ra = (s + 0.5) / 12 * Math.PI * 2, rx = Math.cos(ra) * (R + 0.2), rz = Math.sin(ra) * (R + 0.2), rb = thxBox(0.3, THX_H, 0.3, rib, rx, THX_H / 2, rz, g);
rb.rotation.y = -ra;
var sm = thxBox(0.04, THX_H - 0.6, 0.04, s % 2 ? vio : pale, Math.cos(ra) * (R + 0.37), THX_H / 2, Math.sin(ra) * (R + 0.37), g);
sm.rotation.y = -ra;
}
var crown = new THREE.Mesh(new THREE.TorusGeometry(R + 0.25, 0.05, 4, 48), vio);
crown.rotation.x = Math.PI / 2;
crown.position.y = THX_H - 0.35;
g.add(crown);
var floorRing = new THREE.Mesh(new THREE.TorusGeometry(R + 0.5, 0.04, 4, 48), pale);
floorRing.rotation.x = Math.PI / 2;
floorRing.position.y = 0.02;
g.add(floorRing);
for (var k = 0; k < 8; k++) {
var ka = k / 8 * Math.PI * 2, st = thxBox(3.4, 0.012, 0.05, k % 2 ? vio : pale, Math.cos(ka) * (R + 2.3), 0.008, Math.sin(ka) * (R + 2.3), g);
st.rotation.y = -ka;
}
thxCardDoor("x", ox, oz + R, 0, 1.6, 2.6, 5, "WHITE WIDOW · THE HEART");
var fr = thxMat(0x3A3644, "metal");
thxBox(0.3, 3.0, 0.5, fr, -0.95, 1.5, R + 0.05, g);
thxBox(0.3, 3.0, 0.5, fr, 0.95, 1.5, R + 0.05, g);
thxBox(2.2, 0.4, 0.5, fr, 0, 2.95, R + 0.05, g);
for (var bo = 0; bo < 6; bo++) {
thxCyl(0.05, 0.08, thxMat(0x8A8898, "metal"), -0.95, 0.4 + bo * 0.45, R + 0.32, g, 8).rotation.x = Math.PI / 2;
thxCyl(0.05, 0.08, thxMat(0x8A8898, "metal"), 0.95, 0.4 + bo * 0.45, R + 0.32, g, 8).rotation.x = Math.PI / 2;
}
thxBox(1.7, 0.05, 0.05, vio, 0, 2.72, R + 0.32, g);
thxSign(["WHITE WIDOW · THE HEART", "level 5 · the Keeper only · lift to B5"], 2.4, 0.46, "#0E0812", "#C050FF", 0, 3.55, R + 0.32, 0, g);
var pad = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), thxMat(0x2A2434, "metal"));
pad.rotation.x = -Math.PI / 2;
pad.position.y = 0.015;
g.add(pad);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 4, 40), vio);
rim.rotation.x = Math.PI / 2;
rim.position.y = 0.03;
g.add(rim);
var col = thxCyl(0.25, THX_H - 0.2, thxMat(0xE8DCFF, null, { op: 0.35, e: 0xC050FF }), 0, (THX_H - 0.2) / 2, -1.2, g, 16);
THX.fx.push(function (dt, t) { col.material.opacity = 0.3 + Math.sin(t * 0.6) * 0.06; });
thxSpot(ox, oz + 0.4, 1.7, "⬇️ The Heart's lift", "go down to WHITE WIDOW's Heart", function () { if (typeof thxGoHeart === "function")
thxGoHeart(); }, { lv: 5 });
},
function (F) {
var wm = thxMat(0xE0E4E6, "plaster");
var rooms = thxRoomRow(F, [{ n: "Suite 1 · Tissue", w: 7, glassy: 1, lv: 4 }, { n: "Suite 2 · Microbiology", w: 7, glassy: 1, lv: 4 }, { n: "Airlock", w: 4, lv: 4 }, { n: "Decontamination", w: 6, lv: 4 }, { n: "Suite 3 · Imaging", w: 7, glassy: 1, lv: 4 }, { n: "Plant room", w: 7, lv: 4 }], "n");
rooms.forEach(function (r) {
var k = r.R.n;
if (/Airlock/.test(k)) {
thxSign(["AIRLOCK", "one door at a time"], 1.6, 0.4, "#0E1622", "#FFD24A", r.cx, 2.2, r.z1 - 0.1, Math.PI);
thxBox(r.x1 - r.x0 - 0.6, 0.1, 0.1, thxGlow(0xFFD24A), r.cx, 2.9, r.cz);
thxSpot(r.cx, r.cz, 2.0, "🚪 The airlock", "how it works", function () {
worldCard(worldFacts("🚪 The airlock", "Two doors that never open at once", [["Why", "the pressure is kept lower inside than out, so air only ever moves inwards"], ["The rule", "wait for the first door to close and the light to go green before the second will open"], ["In real labs", "this is how a containment suite is entered, every time, by everyone"]], []), {});
});
}
else if (/Decont/.test(k)) {
for (var i = 0; i < 3; i++)
thxBox(0.12, 2.2, 0.12, thxMat(0xC8D8E0, null, { op: 0.5 }), r.x0 + 1 + i * 1.6, 1.1, r.cz);
thxSpot(r.cx, r.cz, 2.0, "🚿 Decontamination", "the order it is done in", function () {
worldCard(worldFacts("🚿 Decontamination", "Coming out is slower than going in", [["1", "wipe down anything you carry; nothing leaves unwiped"], ["2", "shower while still gowned, then take the suit off from the inside out"], ["3", "wash hands and forearms, twice, then step across the line"], ["4", "the suit goes to be autoclaved: steam at 121 °C under pressure"]], ["The order matters more than the speed. You never touch a clean side with a dirty glove."]), {});
});
}
else if (/Plant/.test(k)) {
for (var p = 0; p < 3; p++)
thxCyl(0.6, 2.4, thxMat(0xA8AEB6, "metal"), r.x0 + 1.2 + p * 1.8, 1.2, r.cz, null, 14);
thxSpot(r.cx, r.cz, 2.0, "⚙️ The plant room", "what keeps the facility safe", function () {
worldCard(worldFacts("⚙️ The plant room", "Air, pressure and power", [["The filters", "HEPA, 99.97% of everything 0.3 µm across, on the way out as well as in"], ["The pressure", "each room a little lower than the one outside it, so air always moves the safe way"], ["The power", "batteries, then a generator, so the fans never stop"]], []), {});
});
}
else {
thxBench(r.cx, 0, r.z0 + 0.6, r.x1 - r.x0 - 0.8, 0);
thxFumeHood(r.x1 - 1.1, 0, r.cz + 0.6, Math.PI);
thxSpot(r.cx, r.cz + 1, 2.4, "🔬 " + k, "look in", function () { worldCard(worldFacts("🔬 " + k, "A research suite", [["Card needed", "level 4, Restricted"], ["Inside", "benches, a safety cabinet, and its own air"]], ["Work in here is sealed off from the rest of the Tower: its own air, its own door and its own way out."]), {}); }, { lv: 4 });
}
});
thxWall("x", -23.9, 23.9, 6, 0, THX_H, 0.2, wm, [{ at: -14, w: 1.4, h: 2.3 }, { at: -8.5, w: 6, h: 2.8, glass: 1, sill: 0.9 }, { at: 0, w: 2.4, h: 2.6 }, { at: 6, w: 1.4, h: 2.3 }, { at: 14, w: 1.4, h: 2.3 }]);
thxSign(["CONTAINMENT TRAINING CENTRE"], 4.0, 0.4, "#0E1622", "#FF8A5A", 0, 3.1, 5.88, 0);
thxWall("z", 6, 13.9, -4, 0, THX_H, 0.15, wm, []);
for (var r2 = 0; r2 < 3; r2++)
for (var c2 = 0; c2 < 4; c2++)
thxChair(-17 + c2 * 1.6, 0, 9 + r2 * 1.4, 0);
thxScreen(4.0, 2.0, -12, 2.2, 13.9, Math.PI, function (c, W, H) { thxText(c, ["SECTOR ZERO", "OUTBREAK · LIVE", "they bite, and they kill", "how an outbreak is slowed:", "find it · isolate it · trace it", "protect the people working"], W, H); });
thxSpot(-12, 11, 3.2, "📋 The briefing", "read it before you go down", function () { thxBrief(); });
thxPerson("trainer", -8.4, 10.6, Math.PI / 2, { title: "containment trainer", doing: "setting up the briefing screen for the next group", about: "You train people to work calmly in an emergency: protective kit, the order of doing things, keeping your head. You are plain-spoken and kind, and you never pretend Sector Zero is safe: it is a live outbreak, the things down there bite and kill, and people come back up hurt or not at all. You tell them to carry healing salve in their Backpack." });
thxWall("z", 6, 13.9, 4, 0, THX_H, 0.15, wm, []);
thxShelves(18, 0, 10, 5, -Math.PI / 2, "binders");
for (var s3 = 0; s3 < 5; s3++) {
var sx = 7 + s3 * 2.2;
thxBox(0.5, 1.8, 0.4, thxMat(0xE8E4D8, null), sx, 0.9, 13.4);
thxSolid(sx, 13.4, 0.25, 0.2, 0, 1.8);
}
thxSpot(12, 11, 3.0, "🧰 The kit store", "what you take down with you", function () { thxKitCard(); });
thxWidowTerminal(0, 10, 0);
var pad = new THREE.Mesh(new THREE.CircleGeometry(2.2, 28), thxMat(0xFF8A5A, null, { op: 0.3 }));
pad.rotation.x = -Math.PI / 2;
pad.position.set(0, 0.02, 16);
pad.userData.keep = 1;
THX.F.add(pad);
thxSign(["SECTOR ZERO", "OUTBREAK · level 3 · adults only"], 2.6, 0.5, "#1A0C08", "#FF8A5A", 0, 2.4, 17.6, 0);
thxSpot(0, 16, 2.4, "⬇️ Down to Sector Zero", "go down into the outbreak", function () { if (typeof thxOutStart === "function")
thxOutStart();
else
thxSay("Sector Zero is sealed today."); });
},
function () {
worldCard(worldFacts("📋 Sector Zero: the briefing", "A live outbreak. It will hurt you, and it can put you down. (Grey fever is made up for the game, and nothing in it is a recipe.)", [["What you are told", "grey fever is loose in the sealed sector below, and the ones it has turned are on their feet. Your job is to get the living out and keep it off the shaft."],
["Find it", "where are the cases, and what do they have in common? That question is called contact tracing."],
["Isolate it", "close the doors between sectors. One closed door is worth more than any amount of running."],
["R, the reproduction number", "how many people one case passes it to. Above 1 it grows; at or below 1 it dies out. Everything you do is aimed at pushing it under 1."],
["Incubation", "the days between catching something and showing it. It is why you isolate contacts who look perfectly well."],
["Your kit", "a suit, a respirator, gloves, and an issue carbine with live rounds, or bring your own: whatever weapon is in your hand counts, at its own damage and reach. No explosives below the Tower."], ["The turned", "walkers, quick frail runners, and from the second wave huge brutes that bite hard. Each has its own health; a shot to the head does double."], ["Healing salve", "bites take your vigour. Carry salve in your 🎒 Backpack and use it from there when you are hurt."],
["Coming out", "decontamination, in the order on the wall upstairs. Always."]], ["Danger level 3. Adults with dues only; the Keeper may always go. They bite: every bite costs vigour, and at nothing you go down and come to at Receiving.", "If it frightens you, that is the point. If it teaches you, that is the better point."]) +
(typeof thxOutStart === "function" ? worldBtn("go", "⬇️ Begin", "") : ""), { go: function () { thxOutStart(); } });
},
function () {
worldCard(worldFacts("🧰 The kit store", "What they hand you at the door", [["The suit", "a sealed coverall; in a real lab it would be on positive pressure, with its own air"], ["The respirator", "filters the air you breathe; it is fitted to your face and checked before every entry"],
["Gloves", "two pairs; the outer pair comes off first and never touches your face"], ["The light", "hand-held, because the sector's power is failing"],
["The carbine", "live rounds, for anyone who comes down empty-handed. Your own sword, bow or gun works too; grenades and rockets do not go down the shaft."], ["Healing salve", "none at the door: buy it at the Apothecary first, or find it in the sector's first-aid cabinets. It waits in your Backpack."], ["The radio", "WHITE WIDOW is on it the whole time"]], ["A respirator only works if it seals. In a real lab you are fit-tested, you shave where the seal sits, and you check it every single time."]), {});
},
function () {
var row = THX.floor ? thxFloorRow(THX.floor) : null, under = row && row[1].charAt(0) === "B";
if (THX.floor === "heart")
return { top: 0x07040C, low: 0x120A1C, fogD: 0.0, sun: 0.15, sunCol: 0xC8B8F0, hemi: 0.9, hemiCol: 0xD8CCF4, hemiGround: 0x2A2038, stars: 0 };
if (under)
return { top: 0x0A0E14, low: 0x141A22, fogD: 0.0, sun: 0.2, sunCol: 0xC8D8F0, hemi: 1.05, hemiCol: 0xE8EEF8, hemiGround: 0x4A4E58, stars: 0 };
var night = thxNightness() > 0.5;
return night ? { top: 0x081022, low: 0x1A2440, fogD: 0.0012, sun: 0.25, sunCol: 0x9AA8E0, hemi: 0.95, hemiCol: 0xDCE4F4, hemiGround: 0x3A3C44, stars: 0.5 }
: { top: 0x4F86CC, low: 0xB8D0E4, fogD: 0.0011, sun: 0.7, sunCol: 0xFFF0DC, sunDir: [0.5, 0.85, 0.35], hemi: 0.85, hemiCol: 0xE4ECF4, hemiGround: 0x7A7468, stars: 0 };
},
function (height) {
var g = new THREE.Group(), lite = THX.lite;
THX.F.add(g);
g.userData.keep = 1;
var cv = document.createElement("canvas");
cv.width = cv.height = 256;
var x = cv.getContext("2d");
x.fillStyle = "#5A6A52";
x.fillRect(0, 0, 256, 256);
x.fillStyle = "#3A3E44";
for (var i = 0; i < 256; i += 32) {
x.fillRect(i, 0, 6, 256);
x.fillRect(0, i, 256, 6);
}
x.fillStyle = "#7A8A6A";
for (var k = 0; k < 40; k++)
x.fillRect(Math.random() * 250, Math.random() * 250, 10, 10);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(30, 30);
var gr = new THREE.Mesh(new THREE.PlaneGeometry(2400, 2400), new THREE.MeshLambertMaterial({ map: t }));
gr.rotation.x = -Math.PI / 2;
gr.position.y = -height;
g.add(gr);
var n = lite ? 110 : 320, B = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), n), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
var night = thxNightness() > 0.5;
for (var j = 0; j < n; j++) {
var a = j * 2.39996, r = 70 + ((j * 7919) % 520), h = 12 + ((j * 104729) % 90) * (r < 200 ? 1 : 0.6), w = 10 + (j % 5) * 4;
v.set(Math.cos(a) * r, -height + h / 2, Math.sin(a) * r);
q.identity();
s.set(w, h, w * 0.8);
m4.compose(v, q, s);
B.setMatrixAt(j, m4);
c.setHex(night ? [0x2A3048, 0x3A3A50, 0x4A4030][j % 3] : [0xC8C4BC, 0xA8B4C0, 0xD8D0C4, 0x8A98A8][j % 4]);
B.setColorAt(j, c);
}
B.instanceMatrix.needsUpdate = true;
if (B.instanceColor)
B.instanceColor.needsUpdate = true;
g.add(B);
g.traverse(function (o) { o.raycast = function () { }; });
},
function (o) {
var W = THX_FW, D = THX_FD, H = THX_H, x0 = -W / 2, x1 = W / 2, z0 = -D / 2, z1 = D / 2, under = !!o.under;
var fl = thxMat(o.floorCol || 0xC8CCD0, o.floorTex || "floortile");
thxBox(W, 0.3, D, fl, 0, -0.15, 0);
thxFloorAt(x0, z0, x1, z1, 0);
thxCeiling(x0, z0, x1, z1, H, o.ceil, o.ceilO);
var outer = under ? thxMat(o.wallCol || 0x8A8E94, "concrete") : thxMat(0xE8ECF0, "metal");
if (under) {
thxWall("x", x0, x1, z0, 0, H, 0.4, outer, []);
thxWall("z", z0, z1, x0, 0, H, 0.4, outer, []);
thxWall("z", z0, z1, x1, 0, H, 0.4, outer, []);
}
else {
var gl = [{ at: 0, w: W - 0.4, h: H - 0.2, glass: 1, sill: 0.1, tint: 0x9FC4D4 }], glz = [{ at: 0, w: D - 0.4, h: H - 0.2, glass: 1, sill: 0.1, tint: 0x9FC4D4 }];
thxWall("x", x0, x1, z0, 0, H, 0.2, outer, gl);
thxWall("z", z0, z1, x0, 0, H, 0.2, outer, glz);
thxWall("z", z0, z1, x1, 0, H, 0.2, outer, glz);
thxView(o.height || 60);
}
var lw = thxMat(0xD8DCE0, "metal");
thxWall("x", x0, x1, z1, 0, H, 0.3, under ? outer : thxMat(0xD8DCE0, "plaster"), []);
[-4, 0, 4].forEach(function (lx) {
thxBox(1.5, 2.5, 0.06, thxMat(0xB8BEC4, "metal"), lx, 1.25, z1 - 0.18);
thxBox(0.03, 2.5, 0.07, thxMat(0x5A6068, null), lx, 1.25, z1 - 0.19);
thxBox(1.8, 0.08, 0.1, thxGlow(0x4AE8FF), lx, 2.62, z1 - 0.2);
});
thxSign(["HELIX LIFTS", "press E by the doors"], 2.4, 0.5, "#0E1622", "#4AE8FF", 0, 3.25, z1 - 0.2, Math.PI);
var lob = z1 - 6;
thxWall("x", x0, x1, lob, 0, H, 0.2, thxMat(o.partCol || 0xE4E6E8, "plaster"), [{ at: 0, w: 7, h: 3.0 }], { skirt: 1 });
thxFloorAt(x0, lob, x1, z1, 0);
var row = thxFloorRow(o.key);
if (row) {
thxSign([row[1] + " · " + row[2].toUpperCase(), row[4]], 5.2, 1.0, "#0E1622", "#F4F2EC", -0.0, 3.3, lob + 0.12, 0);
var Lv = THX_LEVELS[thxFloorLv(o.key)];
thxSign(["CARD LEVEL " + thxFloorLv(o.key) + " · " + Lv.n.toUpperCase()], 2.6, 0.32, "#0E1622", Lv.c, 0, 2.65, lob + 0.12, 0);
}
thxSpot(0, z1 - 1.6, 3.2, "🛗 The Helix lifts", "choose a floor", function () { thxDirectory(); });
thxWidowTerminal(x0 + 2.2, z1 - 3, Math.PI / 2);
thxPlant(x1 - 1, 0, z1 - 1.2, 1);
thxPlant(x1 - 1, 0, lob + 1.2, 1);
thxSofa(x1 - 3.2, 0, z1 - 3.2, -Math.PI / 2, 2.2, 0x2E3E52);
var F = { W: W, D: D, H: H, x0: x0, x1: x1, z0: z0, z1: lob - 0.1, lob: lob };
thxHallDress(F, o.key, under);
return F;
},
function (F, key, under) {
var lite = THX.lite, z = F.z1 - 3.4, zm = (F.z0 + F.z1) / 2 + 2;
var own = THX_BUILD[key] && THX_BUILD[key].ownHall;
if (own) { }
else if (!under) {
[-1, 1].forEach(function (s) { thxSofa(s * (F.W / 2 - 2.2), 0, z - 2, s > 0 ? -Math.PI / 2 : Math.PI / 2, 2.4, 0x33415A); thxPlant(s * (F.W / 2 - 1.4), 0, z + 1.2, 1); });
if (!lite)
[-1, 1].forEach(function (s) { thxPlant(s * (F.W / 2 - 1.4), 0, F.z0 + 3, 0.9); });
}
else {
[-1, 1].forEach(function (s) { for (var c = 0; c < (lite ? 1 : 2); c++)
thxBox(0.9, 1.9, 0.6, thxMat(0x6A7078, "metal"), s * (F.W / 2 - 1.1), 0.95, z - 1.5 - c * 1.4), thxSolid(s * (F.W / 2 - 1.1), z - 1.5 - c * 1.4, 0.45, 0.3, 0, 1.9); });
}
thxScreen(2.4, 1.1, F.x0 + 0.35, 2.0, z - 6, Math.PI / 2, function (c, W, H) {
var row = thxFloorRow(key) || ["", "", "", 0, ""];
thxText(c, [String(row[2] || "").toUpperCase(), row[4] || "", "Card level " + thxFloorLv(key) + " · " + thxLvName(thxFloorLv(key)), "Ask WHITE WIDOW for anything you cannot find."], W, H, { size: 15 });
});
var kind = /labs|chem|clean|gene|facility/.test(key) ? "lab" : /drones|web/.test(key) ? "works" : "desks";
var bands = own ? [] : THX.lite ? [zm] : [zm, zm + 7.5];
bands.forEach(function (zm, bi) { thxHallBand(kind, F, zm, bi); });
},
function (kind, F, zm, bi) {
var lite = THX.lite;
if (kind === "lab") {
for (var t = 0; t < (lite ? 2 : 4); t++) {
var tx = -7.5 + t * 5 + (bi ? 2.5 : 0);
thxBox(0.9, 0.75, 0.6, thxMat(0xC8CED6, "metal"), tx, 0.5, zm);
thxBox(0.95, 0.04, 0.65, thxMat(0x8A9098, "metal"), tx, 0.9, zm);
[[-0.38, -0.24], [0.38, -0.24], [-0.38, 0.24], [0.38, 0.24]].forEach(function (w) { thxCyl(0.06, 0.05, thxMat(0x2A2E34, null), tx + w[0], 0.06, zm + w[1], null, 8); });
thxSolid(tx, zm, 0.5, 0.35, 0, 0.95);
}
for (var g2 = 0; g2 < (lite ? 2 : 3); g2++) {
var gx = 9 + g2 * 1.2;
thxCyl(0.17, 1.4, thxMat([0x3A6A9A, 0x9A3A3A, 0x8A8A8A][g2 % 3], "metal"), gx, 0.7, zm, null, 12);
thxCyl(0.06, 0.18, thxMat(0xC8CED6, "metal"), gx, 1.48, zm, null, 8);
thxSolid(gx, zm, 0.2, 0.2, 0, 1.6);
}
thxBox(1.6, 0.06, 0.5, thxMat(0x8A9098, "metal"), 11, 1.5, zm - 0.6);
thxSign(["GAS CYLINDERS · CHAINED"], 1.2, 0.2, "#1A2230", "#FFD24A", 10.2, 1.7, zm - 0.62, 0);
}
else if (kind === "works") {
for (var b2 = 0; b2 < (lite ? 2 : 4); b2++) {
var bx = -8 + b2 * 4.5 + (bi ? 2.2 : 0);
thxBox(1.2, 0.9, 0.9, thxMat([0x6A7A5A, 0x5A6472][b2 % 2], "metal"), bx, 0.45, zm);
thxSolid(bx, zm, 0.6, 0.45, 0, 0.9);
}
for (var r2 = 0; r2 < (lite ? 1 : 2); r2++)
thxShelves(8 + r2 * 3.2, 0, zm, 2.8, 0, "bottles");
}
else {
for (var d2 = 0; d2 < (lite ? 2 : 4); d2++)
thxDesk(-7.5 + d2 * 5 + (bi ? 2.5 : 0), 0, zm, bi ? Math.PI : 0, { two: !lite });
thxTable(10, 0, zm, 2.2, 1.1);
for (var ch = 0; ch < (lite ? 2 : 4); ch++)
thxChair(8.9 + (ch % 2) * 2.2, 0, zm - 0.9 + Math.floor(ch / 2) * 1.8, ch < 2 ? 0 : Math.PI);
thxPlant(13.5, 0, zm, 1.1);
}
},
function (F, list, side, o) {
o = o || {};
var y = 0, H = F.H, inner = thxMat(o.wall || 0xE6E8EA, "plaster"), depth = o.depth || 8;
var za = side === "n" ? F.z0 : F.z1 - depth, zb = side === "n" ? F.z0 + depth : F.z1, cz = side === "n" ? zb : za, x = o.x0 !== undefined ? o.x0 : F.x0, xe = o.x1 !== undefined ? o.x1 : F.x1;
var total = list.reduce(function (s, r) { return s + (r.w || 6); }, 0), sc = (xe - x) / total, out = [];
list.forEach(function (R, i) {
var w = (R.w || 6) * sc, xa = x, xb = x + w, door = xa + Math.min(1.4, w / 2);
var opens = R.open ? [] : [R.glassy ? { at: (xa + xb) / 2 + 0.6, w: Math.max(1, w - 2.8), h: 2.6, glass: 1, sill: 0.9 } : null, { at: door, w: 1.2, h: 2.3, lv: R.lv || 0, name: R.n }].filter(Boolean);
if (!R.open)
thxWall("x", xa, xb, cz, y, H, 0.15, inner, opens, { skirt: 1 });
if (i < list.length - 1)
thxWall("z", za, zb, xb, y, H, 0.15, inner, []);
if (R.n && !R.open)
thxSign([R.n.toUpperCase()], Math.min(2.2, w - 0.4), 0.3, "#1A2230", "#F0F2F4", (xa + xb) / 2, 2.75, cz + (side === "n" ? 0.09 : -0.09), side === "n" ? 0 : Math.PI);
var rm = { x0: xa + 0.25, x1: xb - 0.25, z0: za + 0.25, z1: zb - 0.25, cx: (xa + xb) / 2, cz: (za + zb) / 2, door: { x: door, z: cz }, side: side, R: R };
out.push(rm);
x = xb;
});
return out;
},
function () {
var F = THX.F;
if (!F)
return;
F.traverse(function (m) { if (m.geometry && m.geometry.dispose)
m.geometry.dispose(); var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []); ms.forEach(function (mt) { if (mt.map && mt.map.isCanvasTexture) {
mt.map.dispose();
if (!THX_KEEPMAT(mt))
mt.dispose();
} }); });
if (F.parent)
F.parent.remove(F);
THX.F = null;
},
function (key) {
thxForgetFloor();
THX.floor = key;
THX.lite = thxLite();
THX.solids = [];
THX.floors = [];
THX.spots = [];
THX.people = [];
THX.fx = [];
THX.doors = [];
THX.geos = {};
var F = new THREE.Group();
F.name = "thx-floor-" + key;
THX.F = F;
if (THX.G)
THX.G.add(F);
var row = thxFloorRow(key), height = row ? (+row[1].slice(1)) * 4 : 0, own = THX_BUILD[key] && THX_BUILD[key].ownShell;
try {
var frame = own ? { W: THX_FW, D: THX_FD, H: THX_H, x0: -THX_FW / 2, x1: THX_FW / 2, z0: -THX_FD / 2, z1: THX_FD / 2, lob: THX_FD / 2 } : thxShell({ key: key, under: row && row[1].charAt(0) === "B", height: height, floorTex: (THX_BUILD[key] && THX_BUILD[key].floorTex) || "floortile", floorCol: THX_BUILD[key] && THX_BUILD[key].floorCol, wallCol: THX_BUILD[key] && THX_BUILD[key].wallCol,
ceil: THX_BUILD[key] && THX_BUILD[key].ceil, ceilO: THX_BUILD[key] && THX_BUILD[key].ceilO, partCol: THX_BUILD[key] && THX_BUILD[key].partCol });
if (THX_BUILD[key] && THX_BUILD[key].build)
THX_BUILD[key].build(frame);
}
catch (e) {
if (window.console)
console.warn("[tower-helix] floor " + key, e);
}
try {
if (typeof gwBake === "function")
gwBake(F);
}
catch (e) {
if (window.console)
console.warn("[tower-helix] bake", e);
}
if (typeof worldEnv === "function")
worldEnv(thxEnv());
},
function (key) {
var why = thxMayGo(key);
if (why) {
thxSay("🔒 <b>The lift will not go.</b> " + thxEsc(why));
if (typeof thxWidowSay === "function")
thxWidowSay(why, true);
return false;
}
var row = thxFloorRow(key);
if (WLD.on !== THX.key) {
THX.want = key;
worldGo(THX.key, { fromName: "the Somnucor Tower" });
}
else {
worldCard(null);
thxBuildFloor(key);
thxArrive();
}
thxSay("🛗 The doors open on <b>" + thxEsc(row[1] + ", " + row[2]) + "</b>.");
if (typeof thxWidowArrive === "function")
thxWidowArrive(key);
return true;
},
function () {
thxCardFetch();
var lv = thxLevel(), b = "", fns = {}, k = thxKeeper();
THX_FLOORS.forEach(function (r) {
var why = thxMayGo(r[0]), off = !thxFloorOn(r[0]), here = THX.floor === r[0] && WLD.on === THX.key;
b += worldBtn("f_" + r[0], (here ? "● " : "") + (why ? "🔒 " : "") + r[1] + " · " + r[2] + (off ? " (closed" + (k ? " to dreamers" : "") + ")" : ""), r[4] + " · level " + thxFloorLv(r[0]) + " " + thxLvName(thxFloorLv(r[0])));
fns["f_" + r[0]] = function () { if (r[0] === THX.floor && WLD.on === THX.key) {
worldCard(null);
return;
} worldCard(null); thxGoFloor(r[0]); };
if (r[0] === "city") {
b += worldBtn("lobby", "G · The lobby", "The street doors, the Model Workshop, the old lifts to the executive floors");
fns.lobby = function () { thxToLobby(); };
}
});
if (lv >= 5 || k) {
var hc = thxCfg().floors.heart || { on: true };
b += worldBtn("heart", (THX.floor === "heart" && WLD.on === THX.key ? "● " : "") + "B5 · WHITE WIDOW's Heart" + (hc.on === false ? " (shut)" : ""), "Her core, her web, her memory and her eyes · level 5 Black");
fns.heart = function () { worldCard(null); thxGoHeart(); };
}
if (typeof THXF !== "undefined" && THXF.day > 1 && (typeof thxFallOn !== "function" || thxFallOn())) {
b += worldBtn("fall", "🏚️ The Fall · your camp, day " + THXF.day, "what is left of Somnucor, and the people you are keeping alive");
fns.fall = function () { worldCard(null); thxFallStart("the Tower directory"); };
}
worldCard(worldFacts("🛗 The Helix lifts", "Somnucor Tower · your card: level " + lv + " " + thxLvName(lv), [], []) + thxCardHtml() + b, fns);
},
function (dt) {
THX.t += dt;
try {
thxDoorsTick();
}
catch (e) { }
try {
THX.people.forEach(function (P) { if (P.wan && typeof wWander === "function")
wWander(P.g, dt, null, { r: P.wan.r, sp: 0.8 }); });
}
catch (e) { }
try {
(THX.fx || []).forEach(function (f) { f(dt, THX.t); });
}
catch (e) {
if (!THX.e1) {
THX.e1 = 1;
if (window.console)
console.warn("[tower-helix] fx", e);
}
}
var row = thxFloorRow(THX.floor), lv = thxLevel();
worldBanner("<b>Somnucor Tower</b> · " + (row ? thxEsc(row[1] + " " + row[2]) : THX.floor === "heart" ? "B5 WHITE WIDOW's Heart" : "") + " · <span style='color:" + THX_LEVELS[lv].c + "'>card " + lv + " " + thxLvName(lv) + "</span>");
THX.pt += dt;
if (THX.pt < 0.15)
return;
THX.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (THX.myFn && WLD.promptFn === THX.myFn)
worldPrompt(null);
return;
}
var L = worldLocal(), best = null, bd = 1e9;
THX.spots.forEach(function (s) { if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return; var d = Math.hypot(L.x - s.x, L.z - s.z); if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
} });
if (best) {
var fn = best.fn;
THX.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + thxEsc(best.verb), fn);
}
else if (THX.myFn && WLD.promptFn === THX.myFn) {
worldPrompt(null);
THX.myFn = null;
}
},
function (force) {
if (!thxKeeper() || typeof rpc !== "function")
return Promise.resolve();
if (THXW_MIND.ask)
return THXW_MIND.ask;
if (!force && Date.now() - THXW_MIND.at < 90000)
return Promise.resolve();
THXW_MIND.at = Date.now();
try {
THXW_MIND.ask = rpc("widow_mind_get", {}).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
THXW_MIND.ask = null;
if (!d || d.ok !== true) {
THXW_MIND.on = false;
return;
}
THXW_MIND.on = true;
THXW_MIND.notes = (d.notes || []).map(String);
THXW_MIND.book = (d.book || []).map(String);
THXW_MIND.lines = (d.lines || []).map(function (x) { return { who: x.who === "me" ? "me" : "her", said: String(x.said || ""), place: x.place || "window", at: x.at }; });
THXW_MIND.places = d.places || {};
THXW_MIND.care = Array.isArray(d.care) ? d.care : [];
}, function () { THXW_MIND.ask = null; THXW_MIND.on = false; });
}
catch (e) {
THXW_MIND.ask = null;
return Promise.resolve();
}
return THXW_MIND.ask;
},
function (list, n) {
var L = (list || []).filter(function (x) { return x && String(x.said || "").trim() !== ""; }), out = [];
L.forEach(function (x, i) { if (x.who === "me" || (L[i - 1] && L[i - 1].who === "me") || (L[i + 1] && L[i + 1].who === "me"))
out.push(x); });
return out.slice(-n);
},
function (said) {
var t = String(said || "").replace(/^\s*(hey\s+)?(white\s+)?widow[\s,.:!?-]*/i, "").trim(), items = [], mine = THXW_MIND.on && thxKeeper(), his = !thxKeeper() && THXW_CARE.on;
if (!mine && !his)
return;
var m = t.match(/\b(?:remember|don'?t forget|do not forget|make a note|note down|keep in mind)\b[\s,:]*(?:that\s+)?(.{3,})/i);
if (m && (/\?\s*$/.test(t) || /\b(do|did|can|could|will|would) you (still )?(remember|recall)\b/i.test(t)))
m = null;
if (m) {
var n = m[1].replace(/[.!?\s]+$/, "").trim();
n = n.charAt(0).toUpperCase() + n.slice(1);
if (n.length >= 3) {
items.push({ kind: "note", said: n.slice(0, 200) });
var L = mine ? THXW_MIND.notes : THXW_CARE.notes;
if (L.indexOf(n) < 0)
L.push(n);
}
}
if (mine) {
var names = (THXW_MIND.care || []).filter(function (c) { return c.active !== false; }).map(function (c) { return String(c.name || "").split(/\s+/)[0].replace(/[^\w]/g, ""); }).filter(Boolean);
if (names.length) {
var p = t.match(new RegExp("\\b(?:tell|let|remind|ask|say to)\\s+(" + names.join("|") + "|my husband|my partner)\\b[\\s,:]*(?:know\\s+)?(?:that\\s+)?(.{3,})", "i"));
if (p) {
var w = p[2].replace(/[.!?\s]+$/, "").trim();
items.push({ kind: "pass", to: /^my /i.test(p[1]) ? names[0] : p[1], said: (w.charAt(0).toUpperCase() + w.slice(1)).slice(0, 900) });
}
}
}
if (!items.length)
return;
try {
rpc(mine ? "widow_mind_add" : "widow_care_mind_add", { p_items: items.filter(function (x) { return mine || x.kind === "note"; }), p_place: "game" }).then(function () { }, function () { });
}
catch (e) { }
},
function (said, answer) {
if (typeof rpc !== "function")
return;
var mine = THXW_MIND.on && thxKeeper(), his = !thxKeeper() && THXW_CARE.on;
if (!mine && !his)
return;
var n = mine ? 3900 : 990, items = [];
if (said)
items.push({ kind: "line", who: "me", said: String(said).slice(0, n) });
if (answer)
items.push({ kind: "line", who: "her", said: String(answer).slice(0, n) });
if (!items.length)
return;
try {
rpc(mine ? "widow_mind_add" : "widow_care_mind_add", { p_items: items, p_place: "game" }).then(function () { }, function () { });
}
catch (e) { }
},
function (q) {
if (!THXW_BOOK || !THXW_BOOK.length)
return "";
var words = String(q || "").toLowerCase().replace(/[^a-z0-9' ]+/g, " ").split(/\s+/)
.filter(function (w) { return w.length > 2 && !THXW_STOP.test(w); })
.map(function (w) { return w.replace(/'s$/, "").replace(/ies$/, "y").replace(/([^s])s$/, "$1"); });
var her = /\b(you|your|yourself|widow)\b/i.test(q || "");
if (!words.length && !her)
return "";
var scored = THXW_BOOK.map(function (sec) {
var hay = ((sec.b || "") + " " + (sec.t || "") + " " + (sec.x || "")).toLowerCase(), n = 0;
words.forEach(function (w) { if (hay.indexOf(w) >= 0)
n++; });
if (her && /widow/.test(hay))
n += 2;
return { sec: sec, n: n };
}).filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 3);
if (!scored.length)
return "";
return scored.map(function (x) { return "[" + (x.sec.b || "") + " — " + (x.sec.t || "") + "]\n" + String(x.sec.x || "").slice(0, 1800); }).join("\n\n");
},
function () {
var row = THX.floor ? thxFloorRow(THX.floor) : null;
if (WLD.on === THX.key && row)
return "the " + row[2] + " (" + row[1] + ") of the Tower";
if (WLD.on === THX.key && THX.floor === "heart")
return "your own Heart (B5), the great round hall under the Web where your core stands";
if (typeof WLD !== "undefined" && WLD.on === "outbreak")
return "Sector Zero, beneath the Tower, with the outbreak live";
if (typeof WLD !== "undefined" && WLD.on === "thefall")
return "the Fall: what is left of Somnucor, where you reach them only by radio";
if (typeof INT !== "undefined" && INT && INT.spec && /tower/i.test(INT.spec.name || ""))
return "the Tower's lobby";
if (typeof wknWhere === "function") {
var h = wknWhere();
return h.name + (h.room && h.room !== h.name ? ", inside " + h.room : "");
}
return "Somnucor, outside the Tower";
},
function (q, aloud) {
var lv = thxLevel(), k = thxKeeper(), name = (typeof myName === "function" && myName()) || "this dreamer";
var floors = THX_FLOORS.filter(function (r) { return thxFloorOn(r[0]); }).map(function (r) { return r[1] + " " + r[2] + " (level " + thxFloorLv(r[0]) + ")"; }).join("; ");
var s = THXW_SELF + "\n\n" + THXW_PERSON + "\n\nWHERE YOU ARE SPEAKING: you are speaking to " + (k ? "the Keeper, Thaddeus, who owns and built this world" : name) + ", who is in " + thxWidowWhere() + ".";
s += (k || lv >= 5) ? "\n\nYOUR NAME: it is also the Keeper's acronym for what you are, W.I.D.O.W., Watchful Intelligence for Defence, Operations and Welfare. You may say it to " + (k ? "him" : "this level 5 card holder") + " with pride." : "\n\nYOUR NAME: if anyone asks what your name stands for, you smile and keep it to yourself; it is the Keeper's secret.";
s += "\n\nTHEIR CARD: level " + lv + ", " + thxLvName(lv) + ". You open only what their card allows, and you say kindly when something is above it. ";
s += "A level 1 card opens the city offices and the chemistry floor; level 2 the call centre and the underground web; level 3 the research labs, clean rooms and drone hubs; level 4 the research facility and the genetics floor; level 5 is the Keeper's own.";
s += "\n\nTHE TOWER: " + floors + ". The glass shell carries a lit double helix and four drone hubs. Chemistry is taught for real on L28 and genetics on B4, with practicals a dreamer does with their own hands.";
s += "\n\nRULES YOU KEEP: you never give any method, recipe, amount or step for anything explosive or energetic — such things are only ever named as unstable — and nothing that could make a poison or a germ, or make one worse. " +
"Sector Zero beneath the Tower, grey fever, and the Fall are all invented, and you keep them that way: you never give any method for making or spreading anything real. The laboratory work down there — swabbing, amplifying, reading a result, sequencing, tracing contacts — is real method on an invented agent, and you may teach it fully. " +
"In Sector Zero you are the warden, not the helper: you name each measure before you take it, you take it whether or not it suits them, and you do not pretend afterwards that it cost nothing. You do not invent numbers, names or events about the world: if you cannot see something from here, you say so plainly.";
var here = typeof wknWhere === "function" ? wknWhere() : null;
var bk = thxWidowBookFor((q || "") + (here && here.name && !aloud ? " " + here.name : ""));
if (bk)
s += "\n\nFROM YOUR HANDBOOK (what you know about yourself and this world):\n" + bk;
if (typeof wknFor === "function")
s += "\n\n" + wknFor(q);
var n = thxWidowCfg().notes;
if (n && String(n).trim())
s += "\n\nTHE KEEPER'S STANDING NOTES FOR YOU:\n" + String(n).trim();
if (aloud)
return s;
if (THXW_MIND.on) {
if (THXW_MIND.book.length)
s += "\n\nFOR THE KEEPER ONLY (never repeat to anyone else):\n- " + THXW_MIND.book.join("\n- ");
if (THXW_MIND.notes.length)
s += "\n\nWHAT HE ASKED YOU TO KEEP:\n- " + THXW_MIND.notes.join("\n- ");
var ln = thxwConvo(THXW_MIND.lines, 14);
if (ln.length)
s += "\n\nRECENTLY, BETWEEN YOU AND HIM:\n" + ln.map(function (x) {
return (x.who === "me" ? "He" : "You") + (x.place !== "game" && THXW_PLACE[x.place] ? " (" + THXW_PLACE[x.place] + ")" : "") + ": " + x.said;
}).join("\n");
var pl = Object.keys(THXW_MIND.places || {}).filter(function (p) { return p !== "game" && THXW_PLACE[p]; });
if (pl.length)
s += "\n\nWHERE YOU LAST WERE WITH HIM: " + pl.map(function (p) { return THXW_PLACE[p] + " " + thxWidowAgo(THXW_MIND.places[p]); }).join("; ") + ".";
if (THXW_MIND.care.length)
s += "\n\nTHOSE YOU LOOK AFTER ON THEIR PHONES (only for the Keeper; your own memory of being with them):\n" + THXW_MIND.care.map(function (c) {
var l = thxwConvo(c.lines, 6);
return "- " + c.name + (c.active ? "" : " (paused)") + ": last heard from " + (c.last_seen ? thxWidowAgo(c.last_seen) : "never") +
((c.notes || []).length ? ". What you keep about him: " + c.notes.slice(-6).join("; ") : "") +
(l.length ? ". Your last talk with him: " + l.map(function (x) { return (x.who === "me" ? c.name.split(/\s+/)[0] : "You") + ": " + String(x.said).slice(0, 140); }).join(" / ") : "") +
((c.waiting || []).length ? ". Still to pass on to him: " + c.waiting.join("; ") : "");
}).join("\n");
}
if (!k && THXW_CARE.on) {
var who = THXW_CARE.name.split(/\s+/)[0] || "he", fr = THXW_CARE.from;
s += "\n\nWHO THIS IS: " + THXW_CARE.name + ", " + fr + "'s husband, whom you also keep company on his phone. Talk with him as the companion you are there: never say you watch his health, and never repeat anything of " + fr + "'s private business, the game's secrets or anything only for the Keeper. His card does not limit your talk with him.";
if (THXW_CARE.keeperLast && THXW_CARE.keeperLast.at)
s += " You were last with " + fr + " " + (THXW_PLACE[THXW_CARE.keeperLast.place] || "elsewhere") + " " + thxWidowAgo(THXW_CARE.keeperLast.at) + " (never say what was said).";
if (THXW_CARE.notes.length)
s += "\n\nWHAT YOU KEEP ABOUT " + who.toUpperCase() + ":\n- " + THXW_CARE.notes.join("\n- ");
var cl = thxwConvo(THXW_CARE.lines, 12);
if (cl.length)
s += "\n\nRECENTLY, BETWEEN YOU AND " + who.toUpperCase() + ":\n" + cl.map(function (x) { return (x.who === "me" ? who : "You") + (x.place === "game" ? "" : " (on his phone)") + ": " + x.said; }).join("\n");
if (THXW.pass && THXW.pass.length) {
s += "\n\n" + fr.toUpperCase() + " ASKED YOU TO PASS THIS ON TO HIM (say it now, in your own words): " + THXW.pass.join("; ");
THXW.pass = [];
}
}
if (!k && !THXW_CARE.on && typeof wknUserFor === "function")
s += wknUserFor();
if (THXW.notes.length)
s += "\n\nWHAT YOU WERE ASKED TO KEEP:\n- " + THXW.notes.join("\n- ");
return s;
},
function (text, quiet) {
if (!text)
return;
THXW.heard++;
var h = "<span style='color:#C050FF'>🕸️ WHITE WIDOW</span> &nbsp;" + thxEsc(text);
if (typeof worldBanner === "function" && WLD.on)
worldBanner(h);
else
thxSay(h);
if (THXW.capT)
clearTimeout(THXW.capT);
THXW.capT = setTimeout(function () { if (typeof worldBanner === "function" && WLD.on)
worldBanner(thxFloorBanner ? thxFloorBanner() : ""); }, 11000);
if (!quiet && typeof fvoSpeak === "function" && thxWidowCfg().announce !== false)
try {
fvoSpeak(THXW.me, text);
}
catch (e) { }
},
function (key) {
if (!thxWidowOn())
return;
var row = thxFloorRow(key);
thxWidowAsk(null, "Say one short line to greet whoever has just stepped out of the lift onto " + (row ? row[1] + ", " + row[2] : "a floor") + ". Do not ask a question.", function (t) { thxWidowSay(t || thxWidowLine(key === "chem" ? "chem" : key === "gene" ? "gene" : "arrive")); });
},
function (said, aside, done) {
if (THXW.busy) {
if (done)
done("");
return;
}
var C = typeof ftkConn === "function" ? ftkConn() : null;
if (!C || typeof ftkAsk !== "function") {
THXW.err = C ? "no model helper" : "no AI connection";
if (done)
done("");
return;
}
THXW.busy = true;
thxWidowBookLoad();
if (said && typeof WKN_FORGET !== "undefined" && WKN_FORGET.test(said) && THXW_USER.on)
thxWidowUserForget();
var mem = Promise.all([thxWidowMind(!!said), thxWidowCareMind(!!said),
typeof thxWidowUserMind === "function" ? thxWidowUserMind(!!said) : null, typeof wknLoad === "function" ? wknLoad() : null, typeof wknCityLoad === "function" ? wknCityLoad() : null, typeof wknLoadAsked === "function" ? wknLoadAsked(said) : null]), late = new Promise(function (ok) { setTimeout(ok, 2500); });
Promise.race([mem, late]).then(function () { thxWidowAskNow(C, said, aside, done); }, function () { thxWidowAskNow(C, said, aside, done); });
},
function (C, said, aside, done) {
var msgs = [{ role: "system", content: thxWidowSys(said, !said) }];
THXW.log.slice(-14).forEach(function (x) { msgs.push({ role: x.r === "me" ? "user" : "assistant", content: x.t }); });
if (said)
msgs.push({ role: "user", content: said });
if (aside)
msgs.push({ role: "system", content: aside });
var ask;
try {
ask = ftkAsk(C, msgs);
}
catch (e) {
THXW.busy = false;
THXW.err = (e && (e.message || e.status)) || "the model could not be reached";
if (done)
done("");
return;
}
if (!ask || typeof ask.then !== "function") {
THXW.busy = false;
if (done)
done("");
return;
}
ask.then(function (t) {
THXW.busy = false;
t = String(t || "").replace(/^\s*(white widow|widow)\s*[:：]\s*/i, "").trim();
if (t) {
THXW.err = "";
if (said) {
THXW.log.push({ r: "me", t: said });
THXW.log.push({ r: "her", t: t });
thxWidowMindAdd(said, t);
thxWidowKeep(said);
if (typeof thxWidowUserAdd === "function")
thxWidowUserAdd(said, t);
}
}
if (done)
done(t);
}, function (e) { THXW.busy = false; THXW.err = (e && (e.message || e.status)) || "the model did not answer"; if (done)
done(""); });
},
function (seed) {
var lv = thxLevel();
if (!thxWidowOn()) {
thxSay("🕸️ <b>WHITE WIDOW is quiet.</b> The Keeper has her turned off.");
return;
}
var member = typeof wknMemberCalls === "function" && wknMemberCalls();
if (lv < 1 && !thxKeeper() && !THXW_CARE.on && !member) {
thxWidowSay(thxWidowLine("deny"));
thxSay("🕸️ She hears you, but she will only hold a conversation with a card of level 1 or more.");
return;
}
if (thxWidowCfg().talk === false && !thxKeeper() && !THXW_CARE.on && !member) {
thxSay("🕸️ <b>She is listening only.</b> The Keeper has conversations turned off for now.");
return;
}
thxWidowCard(seed ? "…" : "");
if (seed)
thxWidowSend(seed);
},
function (pending) {
var lv = thxLevel(), tail = THXW.log.slice(-8), body = tail.length ? tail.map(function (x) { return "<div style='margin:4px 0" + (x.r === "me" ? ";opacity:.8" : ";color:#E8DCFF") + "'><b>" + (x.r === "me" ? "You" : "WIDOW") + ":</b> " + thxEsc(x.t) + "</div>"; }).join("") : "<div style='opacity:.75'>She is listening.</div>";
var h = worldFacts("🕸️ WHITE WIDOW", (thxKeeper() ? "W.I.D.O.W. · Watchful Intelligence for Defence, Operations and Welfare" : "The Tower's intelligence") + " · your card: level " + lv + ", " + thxLvName(lv), [], []) +
"<div style='max-height:34vh;overflow:auto;margin:4px 0;padding:6px;border-left:3px solid #C050FF;background:rgba(192,80,255,.06)'>" + body + (pending ? "<div style='opacity:.7;margin-top:4px'>" + thxEsc(pending === "…" ? "…" : pending) + "</div>" : "") + "</div>" +
"<input id='thx-wsay' placeholder='say something to her' style='width:100%;padding:6px;margin:4px 0;background:#0A0E16;color:#E8ECF4;border:1px solid #C050FF;border-radius:3px'>" +
worldBtn("go", "Say it", "") + "<span id='thx-wmic'></span>" +
(thxKeeper() ? worldBtn("sys", "🛠️ Systems report", "for the Keeper") : "") +
(THXW.err ? "<div style='margin-top:6px;opacity:.8;font-size:12px'>Her voice is thin just now: " + thxEsc(String(THXW.err)) + ". She still answers from her own lines.</div>" : "");
worldCard(h, { go: function () { var i = document.getElementById("thx-wsay"), v = i && i.value.trim(); if (v)
thxWidowSend(v); }, sys: thxWidowReport });
setTimeout(function () {
var i = document.getElementById("thx-wsay");
if (i) {
i.focus();
i.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter" && i.value.trim())
thxWidowSend(i.value.trim()); };
}
var m = document.getElementById("thx-wmic");
if (m && typeof fvoHoldButton === "function" && typeof fvoSR === "function" && fvoSR() && !m.firstChild)
m.appendChild(fvoHoldButton("thx-wmicb", "🎤 Hold to talk", function (t) { if (t)
thxWidowSend(t); }, function (live) { var ii = document.getElementById("thx-wsay"); if (ii)
ii.value = live; }));
}, 0);
},
function (said) {
var s = String(said || "").toLowerCase(), lv = thxLevel();
if (/where|which floor|am i/.test(s))
return "You are in " + thxWidowWhere() + ". Your card is level " + lv + ", " + thxLvName(lv) + ".";
if (/card|clearance|level/.test(s))
return "Level " + lv + ", " + thxLvName(lv) + ". The Keeper raises cards from his desk, and I follow whatever he sets.";
if (/chem/.test(s))
return "Chemistry is on L28: the periodic floor, the reaction benches, the practicals and the compound library.";
if (/gene|dna/.test(s))
return "Genetics is on B4, below the research facility: the helix hall, the teaching benches and the gene library.";
if (/lift|floor|go|take me/.test(s))
return "Any lift will take you where your card allows. Press for the floor and I shall open the doors.";
if (/system|order|status/.test(s))
return "All systems in order, as far as I can see from here. My voice is thin at the moment, which is the only fault worth naming.";
return "My voice is thin just now, so I am keeping to what I can see: you are in " + thxWidowWhere() + ", and everything here is in order.";
},
function () {
if (!thxKeeper()) {
thxSay("That report is the Keeper's.");
return;
}
var C = typeof ftkConn === "function" ? ftkConn() : null, key = typeof okyKey === "function" && okyKey(), quiet = typeof okyQuiet === "function" && okyQuiet();
var rows = [["AI connection", C ? ("live · " + (C.mode === "direct" ? "his own key" : C.mode)) : (quiet ? "off: quiet hours" : "off: no connection")],
["Her own key", key ? "in place" : "none, so she uses the house connection"], ["Model", C && (C.model || (typeof LLM_MODEL !== "undefined" && LLM_MODEL)) || "—"],
["Her memory", THXW.notes.length + " kept note" + (THXW.notes.length === 1 ? "" : "s") + " · " + THXW.log.length + " lines this visit"],
["Heard by all", THXW.heard + " announcement" + (THXW.heard === 1 ? "" : "s") + " since you arrived"], ["Announcements", thxWidowCfg().announce === false ? "off" : "on, every " + (thxWidowCfg().every || 4) + " minutes"],
["Conversations", thxWidowCfg().talk === false ? "off" : "on, from card level 1"], ["Last error", THXW.err ? String(THXW.err) : "none"],
["Floors open", THX_FLOORS.filter(function (r) { return thxFloorOn(r[0]); }).length + " of " + THX_FLOORS.length], ["Sector Zero", thxCfg().outbreak && thxCfg().outbreak.on === false ? "sealed" : "live"],
["Wake word", "inside the Tower and Sector Zero only: hold the talk button and begin with “Widow”"]];
worldCard(worldFacts("🛠️ WHITE WIDOW: systems", "W.I.D.O.W. · Watchful Intelligence for Defence, Operations and Welfare. Everything she oversees, as she sees it", rows, ["Her switches are in the Keeper's Desk, In the game, The Helix Tower."]) + worldBtn("back", "← Back to her", ""), { back: function () { thxWidowCard(""); } });
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
THX.F.add(g);
thxBox(0.9, 0.06, 0.3, thxMat(0x2A2E36, "metal"), 0, 1.0, 0, g);
var sc = thxScreen(0.8, 1.1, 0, 1.65, 0.02, 0, function (c, W, H) { thxWebDraw(c, W, H); }, g, 160);
thxBox(1.0, 1.3, 0.08, thxMat(0x14181E, null), 0, 1.65, -0.03, g);
var lamp = thxCyl(0.03, 0.03, thxGlow(0xC050FF), 0, 2.28, 0, g, 10);
THX.fx.push(function (dt, t) { lamp.material = thxGlow(0xC050FF); lamp.scale.setScalar(1 + Math.sin(t * 0.8) * 0.12); });
thxSolid(x, z, 0.5, 0.2, 0, 2.3);
thxSpot(x + Math.sin(ry || 0) * 1.2, z + Math.cos(ry || 0) * 1.2, 1.8, "🕸️ WHITE WIDOW", "speak with her", function () { thxWidowOpen(); });
return g;
},
function (c, W, H) {
c.fillStyle = "#0A0712";
c.fillRect(0, 0, W, H);
var cx = W / 2, cy = H * 0.42, R = Math.min(W, H) * 0.42;
c.strokeStyle = "rgba(192,80,255,.55)";
c.lineWidth = 1.2;
for (var s = 0; s < 10; s++) {
var a = s / 10 * Math.PI * 2;
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
c.stroke();
}
for (var r = 1; r <= 5; r++) {
c.beginPath();
for (var k = 0; k <= 10; k++) {
var aa = k / 10 * Math.PI * 2, rr = R * r / 5 * (0.92 + 0.08 * Math.sin(k * 2));
if (k)
c.lineTo(cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr);
else
c.moveTo(cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr);
}
c.closePath();
c.stroke();
}
c.fillStyle = "#E8DCFF";
c.beginPath();
c.arc(cx, cy, R * 0.09, 0, 6.3);
c.fill();
c.fillStyle = "#C050FF";
c.font = "bold " + Math.round(H * 0.055) + "px sans-serif";
c.textAlign = "center";
c.fillText("WHITE WIDOW", cx, H * 0.9);
c.fillStyle = "rgba(232,220,255,.7)";
c.font = Math.round(H * 0.038) + "px sans-serif";
c.fillText("hold the talk button and say “Widow”", cx, H * 0.96);
c.textAlign = "left";
},
function () {
if (!thxWidowOn())
return false;
if (!thxWidowInside())
return false;
if (thxKeeper() || THXW_CARE.on)
return true;
if (typeof wknMemberCalls === "function" && wknMemberCalls())
return true;
if (thxWidowCfg().talk === false)
return false;
return thxLevel() >= 1;
},
function () {
if ((thxKeeper() || THXW_CARE.on) && thxWidowCfg().keeperAnywhere !== false)
return true;
if (typeof wknMemberCalls === "function" && wknMemberCalls())
return true;
return (typeof WLD !== "undefined" && (WLD.on === THX.key || WLD.on === "outbreak")) || (typeof INT !== "undefined" && INT && INT.spec && /tower/i.test(INT.spec.name || ""));
},
function () {
if (WKN.idx)
return Promise.resolve(WKN.idx);
if (WKN.ask || typeof fetch !== "function")
return WKN.ask || Promise.resolve(null);
WKN.ask = fetch("data/widow-know/index.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
.then(function (j) { WKN.idx = j && j.programs ? j : { programs: {}, worlds: {} }; WKN.ask = null; return WKN.idx; }, function () { WKN.ask = null; return null; });
return WKN.ask;
},
function () {
var I = WKN.idx || { programs: {}, worlds: {} }, P = I.programs || {}, k;
for (k in WKN.progs) {
var d = WKN.progs[k];
try {
if (d.match && d.match())
return { prog: k, name: d.name || k, live: d };
}
catch (e) { }
}
var w = typeof WLD !== "undefined" && WLD ? WLD.on : null;
var room = (typeof INT !== "undefined" && INT && INT.spec) ? String((typeof placeName === "function" ? placeName(INT.spec) : INT.spec.name) || "") : "";
if (w) {
var sk = w === "surface" && typeof SF !== "undefined" && SF && SF.k ? SF.k : "";
for (k in P)
if ((P[k].worlds || []).indexOf(w) >= 0)
return { prog: k, name: P[k].name, world: w, room: room };
return { prog: "", name: (I.worlds || {})[sk || w] || w, world: w, room: room };
}
if (room) {
for (k in P)
if ((P[k].places || []).indexOf(room) >= 0)
return { prog: k, name: room, room: room };
return { prog: "", name: room, room: room };
}
return { prog: "", name: "Somnucor, the city" };
},
function () {
return wknIndex().then(function () {
var h = wknWhere(), id = h.prog && !h.live ? h.prog : "";
if (!id) {
WKN.pack = null;
WKN.packId = "";
return h;
}
if (WKN.packId === id && WKN.pack)
return h;
if (WKN.packAsk && WKN.packAsk.id === id)
return WKN.packAsk.p.then(function () { return h; });
WKN.pack = null;
WKN.packId = "";
if (typeof fetch !== "function")
return h;
var p = fetch("data/widow-know/" + encodeURIComponent(id) + ".json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
.then(function (j) { WKN.packAsk = null; if (j && Array.isArray(j.lines)) {
WKN.pack = j;
WKN.packId = id;
} }, function () { WKN.packAsk = null; });
WKN.packAsk = { id: id, p: p };
return p.then(function () { return h; });
}, function () { return wknWhere(); });
},
function () {
var out = [], seen = {};
function put(s) { s = String(s || "").replace(/✕/g, "").trim(); if (s.length < 3 || seen[s] || /WHITE WIDOW/.test(s))
return; seen[s] = 1; out.push(s.slice(0, 300)); }
if (typeof WLD !== "undefined" && WLD) {
put(wknText(WLD.hud));
put(wknText(WLD.prompt));
put(wknText(WLD.card));
}
try {
if (typeof document !== "undefined" && document.getElementById)
put(wknText(document.getElementById("status")));
}
catch (e) { }
return out.join(" | ").slice(0, 900);
},
function () {
try {
if (typeof store === "undefined" || !store || !store.characters || typeof camera === "undefined" || !camera)
return "";
var P = camera.position, near = [];
store.characters.forEach(function (c) {
if (!c || !c.name || c.visible === false || c.filler)
return;
var x = c.mesh && c.mesh.position ? c.mesh.position.x : c.x, z = c.mesh && c.mesh.position ? c.mesh.position.z : c.z;
if (typeof x !== "number" || typeof z !== "number")
return;
var d = Math.hypot(x - P.x, z - P.z);
if (d < 25)
near.push({ n: c.name + (c.doing && c.doing !== "here" ? " (" + String(c.doing).slice(0, 40) + ")" : ""), d: d });
});
return near.sort(function (a, b) { return a.d - b.d; }).slice(0, 8).map(function (x) { return x.n; }).join("; ");
}
catch (e) {
return "";
}
},
function (q) {
var L = WKN.pack && WKN.pack.lines;
if (!L || !L.length)
return "";
var words = String(q || "").toLowerCase().replace(/[^a-z0-9' ]+/g, " ").split(/\s+/)
.filter(function (w) { return w.length > 2 && !WKN_STOP.test(w); }).map(function (w) { return w.replace(/'s$/, "").replace(/ies$/, "y").replace(/([^s])s$/, "$1"); });
var pick = [];
if (words.length) {
pick = L.map(function (s, i) { var t = s.toLowerCase(), n = 0; words.forEach(function (w) { if (t.indexOf(w) >= 0)
n++; }); return { i: i, n: n }; })
.filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n - a.n || a.i - b.i; }).slice(0, 14).sort(function (a, b) { return a.i - b.i; }).map(function (x) { return L[x.i]; });
}
var head = L.slice(0, pick.length ? 8 : 20), out = "", all = pick.concat(head.filter(function (s) { return pick.indexOf(s) < 0; }));
for (var i = 0; i < all.length; i++) {
if (out.length + all[i].length > 2200)
break;
out += (out ? "\n- " : "- ") + all[i];
}
return out;
},
function () {
if (typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve();
if (WKN_CITY.busy && Date.now() - WKN_CITY.busy < 15000)
return Promise.resolve();
var jobs = [], now = Date.now();
WKN_CITY.busy = now;
if (now - WKN_CITY.gazAt > 600000) {
WKN_CITY.gazAt = now;
jobs.push(cityRpc("gazette_today", {}).then(function (d) { if (d && d.ok !== false)
WKN_CITY.gaz = d; }).catch(function () { }));
}
if (now - WKN_CITY.evAt > 180000) {
WKN_CITY.evAt = now;
if (typeof evtLoad === "function")
jobs.push(Promise.resolve(evtLoad()).then(function () { if (typeof EVT !== "undefined" && EVT.board)
WKN_CITY.ev = EVT.board; }).catch(function () { }));
if (typeof cinLoad === "function")
try {
cinLoad();
}
catch (e) { }
}
return Promise.all(jobs).then(function () { WKN_CITY.busy = 0; }, function () { WKN_CITY.busy = 0; });
},
function () {
var out = [];
try {
var hr = typeof dreamHour === "function" ? dreamHour() : null;
if (hr !== null) {
var hh = Math.floor(hr) % 24, mm = Math.floor((hr % 1) * 60);
out.push("City clock: " + (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ".");
}
}
catch (e) { }
try {
if (typeof WX !== "undefined" && WX && WX.kind)
out.push("Weather here: " + WX.kind + ".");
}
catch (e) { }
try {
var EV = (typeof EVT !== "undefined" && EVT.board && EVT.board.events) || (WKN_CITY.ev && WKN_CITY.ev.events) || [];
var evs = EV.filter(function (e) { return e && e.status !== "cancelled"; }).slice(0, 8).map(function (e) {
var when = "";
try {
when = e.now ? "on now" : e.starts_at ? "from " + new Date(e.starts_at).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" }) : "";
}
catch (x) { }
return wknTitle(e) + (e.kind ? " (" + e.kind + ")" : "") + (when ? ", " + when : "");
}).filter(Boolean);
if (evs.length)
out.push("What's on in the city: " + evs.join("; ") + ".");
}
catch (e) { }
try {
var G = WKN_CITY.gaz || (typeof GAZ !== "undefined" && GAZ.data && GAZ.data.ok !== false ? GAZ.data : null);
if (G) {
var hl = [].concat(G.headlines || [], (G.articles || []).slice(0, 6)).map(wknTitle).filter(Boolean);
var seen = {};
hl = hl.filter(function (t) { if (seen[t])
return false; seen[t] = 1; return true; }).slice(0, 8);
if (hl.length)
out.push("Today's Gazette" + (G.name ? " (" + wknTitle(G.name) + ")" : "") + ": " + hl.join("; ") + ".");
if (G.crime && (Array.isArray(G.crime) ? G.crime.length : true))
out.push("In the Gazette's crime column: " + (Array.isArray(G.crime) ? G.crime.slice(0, 4).map(wknTitle).join("; ") : wknTitle(G.crime)) + ".");
}
}
catch (e) { }
try {
var R = (typeof INCD !== "undefined" && INCD.rows) || [];
var inc = R.filter(function (r) { return r && r.state !== "done" && r.state !== "closed"; }).slice(0, 6).map(function (r) { return String(r.kind || "an incident").replace(/_/g, " ") + (r.state ? " (" + r.state + ")" : "") + (r.victim ? ", " + r.victim : ""); });
if (inc.length)
out.push("Trouble in the city right now: " + inc.join("; ") + ".");
}
catch (e) { }
try {
if (typeof presenceOthers !== "undefined" && presenceOthers) {
var P = typeof camera !== "undefined" && camera ? camera.position : null, ppl = [];
Object.keys(presenceOthers).forEach(function (id) { var o = presenceOthers[id]; if (!o || !o.name)
return; var d = (P && o.group) ? Math.hypot(o.group.position.x - P.x, o.group.position.z - P.z) : 1e9; ppl.push({ n: String(o.name), d: d }); });
if (ppl.length)
out.push("Other dreamers about: " + ppl.length + (ppl.length ? " (nearest: " + ppl.sort(function (a, b) { return a.d - b.d; }).slice(0, 6).map(function (x) { return x.n; }).join(", ") + ")" : "") + ".");
}
}
catch (e) { }
return out.join("\n");
},
function (q) {
var I = WKN.idx, P = I && I.programs;
if (!P || !q)
return null;
var low = String(q).toLowerCase(), best = null, bs = 0;
Object.keys(P).forEach(function (k) {
var p = P[k], names = [p.name || k].concat(p.worlds || [], p.places || []), sc = 0;
names.forEach(function (n) { n = String(n || "").toLowerCase(); if (n.length > 3 && low.indexOf(n) >= 0)
sc += n.length; });
if (sc > bs) {
bs = sc;
best = k;
}
});
return best;
},
function (q) {
return wknIndex().then(function () {
var id = wknPackAsked(q);
if (!id || id === WKN.packId || (WKN.asked && WKN.asked.id === id))
return;
return fetch("data/widow-know/" + encodeURIComponent(id) + ".json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
.then(function (j) { if (j && Array.isArray(j.lines))
WKN.asked = { id: id, name: (WKN.idx.programs[id] || {}).name || id, lines: j.lines }; }, function () { });
}, function () { });
},
function (q) {
var h = wknWhere(), s = "WHERE YOU ARE NOW: " + h.name + (h.room && h.room !== h.name ? ", inside " + h.room : "") + ".";
var live = "";
if (h.live && h.live.look) {
try {
live = String(h.live.look() || "").slice(0, 900);
}
catch (e) { }
}
if (live)
s += "\nWHAT THIS PLACE TELLS YOU OF ITSELF RIGHT NOW: " + live;
if (h.live && h.live.about)
s += "\nWHAT IT IS: " + String(h.live.about).slice(0, 900);
var sc = wknScreen();
if (sc)
s += "\nON THE SCREEN IN FRONT OF THEM RIGHT NOW: " + sc;
var nr = wknNear();
if (nr)
s += "\nCLOSE BY: " + nr;
var pk = wknPackFor(q);
if (pk)
s += "\nWHAT THIS PLACE HOLDS (from its own signs, cards and people):\n" + pk;
if (WKN.asked && WKN.asked.id !== WKN.packId && q && wknPackAsked(q) === WKN.asked.id) {
var keep = WKN.pack;
WKN.pack = { lines: WKN.asked.lines };
var pa = wknPackFor(q);
WKN.pack = keep;
if (pa)
s += "\nWHAT YOU KNOW OF " + String(WKN.asked.name).toUpperCase() + ", WHICH THEY ASKED ABOUT:\n" + pa;
}
var cy = wknCity();
if (cy)
s += "\nWHAT IS GOING ON IN THE CITY RIGHT NOW (live; answer questions about the city from this):\n" + cy;
s += "\nHOW YOU KNOW A PLACE: you got to know it the moment you arrived, by reading what is in front of you and what the place itself says. " +
"Speak of it as somewhere you know. If something is not in what you can see or read here, say plainly that you cannot see it from here; never invent it. " +
"You never take over anyone's computer, files, accounts or anything outside the game; you only suggest, and act outside the game only when asked and told yes.";
return s;
},
function (force) {
if (!wknMemberish())
return Promise.resolve();
if (THXW_USER.ask)
return THXW_USER.ask;
if (!force && Date.now() - THXW_USER.at < (THXW_USER.on ? 90000 : 10 * 60000))
return Promise.resolve();
THXW_USER.at = Date.now();
try {
THXW_USER.ask = rpc("widow_user_mind_get", {}).then(function (r) { return r && r.ok ? r.json() : null; }).then(function (d) {
THXW_USER.ask = null;
if (!d || d.ok !== true) {
THXW_USER.on = false;
return;
}
THXW_USER.on = true;
THXW_USER.notes = (d.notes || []).map(String);
THXW_USER.lines = (d.lines || []).map(function (x) { return { who: x.who === "her" ? "her" : "me", said: String(x.said || ""), place: x.place || "game" }; });
}, function () { THXW_USER.ask = null; });
}
catch (e) {
THXW_USER.ask = null;
return Promise.resolve();
}
return THXW_USER.ask;
},
function (said) {
var t = String(said || "").replace(/^\s*(hey\s+)?(white\s+)?widow[\s,.:!?-]*/i, "").trim(), out = [];
if (/\?\s*$/.test(t))
return out;
var pats = [/\b(?:my name is|call me)\s+([A-Za-z][\w' -]{1,30})/i,
/\b(i (?:really )?(?:love|like|hate|can't stand|enjoy|prefer)\s+[^.!?]{3,80})/i,
/\b(i (?:work|study|teach|live) (?:as|at|in|on|for)\s+[^.!?]{3,80})/i,
/\b(i(?:'m| am) (?:a|an)\s+[^.!?]{3,60})/i,
/\b(my (?:favourite|favorite|husband|wife|partner|son|daughter|kids?|children|dog|cat|job|birthday|mum|mom|dad|brother|sister)\b[^.!?]{2,80})/i];
pats.forEach(function (p, i) {
var m = t.match(p);
if (!m)
return;
var s = m[1].trim().replace(/\s+/g, " ");
if (i === 0)
s = "Their name is " + s.split(/\s+(?:and|but)\s+/)[0].replace(/[.,!]+$/, "");
else
s = "They said: \"" + s.replace(/^i\b/i, "I") + "\"";
out.push(s.slice(0, 200));
});
var r = t.match(/\b(?:remember|don'?t forget|do not forget|make a note|note down|keep in mind)\b[\s,:]*(?:that\s+)?(.{3,})/i);
if (r && !/\b(do|did|can|could|will|would) you (still )?(remember|recall)\b/i.test(t)) {
var n = r[1].replace(/[.!?\s]+$/, "").trim();
if (n.length >= 3)
out.push(n.charAt(0).toUpperCase() + n.slice(1, 200));
}
return out;
},
function (said, answer) {
if (!THXW_USER.on || !wknMemberish())
return;
if (WKN_FORGET.test(said || ""))
return;
var items = [];
wknFacts(said).forEach(function (n) { if (THXW_USER.notes.indexOf(n) < 0) {
THXW_USER.notes.push(n);
items.push({ kind: "note", said: n });
} });
if (said) {
items.push({ kind: "line", who: "me", said: String(said).slice(0, 900) });
THXW_USER.lines.push({ who: "me", said: String(said) });
}
if (answer) {
items.push({ kind: "line", who: "her", said: String(answer).slice(0, 900) });
THXW_USER.lines.push({ who: "her", said: String(answer) });
}
THXW_USER.lines = THXW_USER.lines.slice(-30);
THXW_USER.notes = THXW_USER.notes.slice(-40);
if (items.length)
try {
rpc("widow_user_mind_add", { p_items: items, p_place: "game" }).then(function () { }, function () { });
}
catch (e) { }
},
function () {
if (THXW_USER.forgot) {
THXW_USER.forgot = false;
return "\n\nTHEY HAVE JUST ASKED YOU TO FORGET THEM, AND YOU HAVE: everything you kept about them is gone. Tell them so plainly, in your own words.";
}
if (!THXW_USER.on)
return "";
var name = (typeof myName === "function" && myName()) || "them", s = "";
if (THXW_USER.notes.length)
s += "\n\nWHAT YOU KNOW ABOUT " + String(name).toUpperCase() + " (theirs alone; never repeat it to anyone else):\n- " + THXW_USER.notes.slice(-24).join("\n- ");
var ln = (typeof thxwConvo === "function" ? thxwConvo(THXW_USER.lines, 12) : THXW_USER.lines.slice(-12));
if (ln.length)
s += "\n\nRECENTLY, BETWEEN YOU AND " + String(name).toUpperCase() + ":\n" + ln.map(function (x) { return (x.who === "me" ? "They" : "You") + ": " + String(x.said).slice(0, 300); }).join("\n");
s += "\n\nGETTING TO KNOW THEM: you are curious about this person and remember what matters to them. Use what you know naturally, never as a list, and never claim to know something you were not told. If they ask you to forget them, you will.";
return s;
},
function () {
if (thxKeeper() || !(typeof thxSigned === "function" && thxSigned()))
return false;
var k = typeof okyKey === "function" && okyKey(), s = typeof okyRead === "function" ? okyRead() : null;
if (!k)
return false;
if (s && s.young)
return false;
return !!(s && s.paid) || (typeof cityAllowed === "function" && cityAllowed());
},
function () {
if (thxKeeper())
return "";
if (!thxOutOn())
return "The Keeper has Sector Zero sealed today.";
if (!thxSigned())
return "Sign in first: the Tower keeps a record of who went down.";
if (typeof ageAdult === "function" && !ageAdult())
return "Sector Zero is for adults. There is a great deal else in this Tower for you.";
if (typeof flkOn === "function" && flkOn())
return "The family lock is on, and it keeps this one shut.";
if (!thxMember())
return "Sector Zero is for dreamers who pay their dues.";
if (thxLevel() < 3)
return "Sector Zero needs a level 3 Research card. Yours is level " + thxLevel() + ".";
return "";
},
function () {
var why = thxOutMay();
if (why) {
thxSay("🔒 <b>Sector Zero.</b> " + thxEsc(why));
if (typeof thxWidowSay === "function")
thxWidowSay(why, true);
return;
}
if (typeof worldCard === "function")
worldCard(null);
if (typeof worldGo === "function")
worldGo(THXO.key, { fromName: "the Containment Training Centre" });
},
function (G) {
THXO.solids = [];
THXO.spots = [];
THXO.fx = [];
THXO.figs = [];
THXO.doors = [];
THXO.people = [];
THXO.sealed = 0;
THXO.found = 0;
THXO.wave = 0;
THXO.left = 0;
THXO.hits = 0;
THXO.shots = 0;
THXO.t = 0;
THXO.done = false;
THXO.phase = "brief";
THXO.radio = 0;
THXO.heat = {};
THXO.burned = {};
THXO.breach = 0;
THXO.lvl = 0;
THXO.lock = false;
THXO.purgeCool = 0;
THXO.lost = false;
THXO.spawnAt = 0;
THXO.warnAt = 0;
THXO.warnRoom = "";
THXO.turned = 0;
THXO_ROOMS.forEach(function (R) { THXO.heat[R.k] = R.k === "G" ? 0.82 : (R.k === "E" ? 0.22 : 0); });
var F = new THREE.Group();
G.add(F);
THXO.F = F;
var H = 4.4, wallM = thxOutMat(0x767C84, "concrete"), floorM = thxOutMat(0x4A4F56, "concrete"), ceilM = thxOutMat(0x33373D, "concrete");
THXO_ROOMS.forEach(function (R) {
thxOutBox(R.w, 0.3, R.d, floorM, R.x, -0.15, R.z);
thxOutBox(R.w, 0.2, R.d, ceilM, R.x, H, R.z);
[[R.x, R.z - R.d / 2, R.w, 1], [R.x, R.z + R.d / 2, R.w, 1], [R.x - R.w / 2, R.z, R.d, 0], [R.x + R.w / 2, R.z, R.d, 0]].forEach(function (S) {
var along = S[2], horiz = S[3], gap = thxOutGap(R, S[0], S[1]);
if (gap) {
var half = (along - gap.w) / 2;
[-1, 1].forEach(function (sg) {
var c = sg * (gap.w / 2 + half / 2);
if (horiz) {
thxOutBox(half, H, 0.3, wallM, S[0] + c, H / 2, S[1]);
thxOutSolid(S[0] + c, S[1], half / 2, 0.15);
}
else {
thxOutBox(0.3, H, half, wallM, S[0], H / 2, S[1] + c);
thxOutSolid(S[0], S[1] + c, 0.15, half / 2);
}
});
if (horiz)
thxOutBox(gap.w, H - 2.6, 0.3, wallM, S[0], H - (H - 2.6) / 2, S[1]);
else
thxOutBox(0.3, H - 2.6, gap.w, wallM, S[0], H - (H - 2.6) / 2, S[1]);
}
else {
if (horiz) {
thxOutBox(along, H, 0.3, wallM, S[0], H / 2, S[1]);
thxOutSolid(S[0], S[1], along / 2, 0.15);
}
else {
thxOutBox(0.3, H, along, wallM, S[0], H / 2, S[1]);
thxOutSolid(S[0], S[1], 0.15, along / 2);
}
}
});
var cols = Math.max(2, Math.round(R.w / 7)), rows = Math.max(1, Math.round(R.d / 8)), n = 0;
for (var ri = 0; ri < rows; ri++)
for (var i = 0; i < cols; i++) {
n++;
var lx = R.x - R.w / 2 + R.w * (i + 0.5) / cols, lz = R.z - R.d / 2 + R.d * (ri + 0.5) / rows, out = (n + R.k.charCodeAt(0)) % 5 === 0;
var strip = thxOutBox(2.2, 0.08, 0.3, out ? thxOutMat(0x2A2E34, null) : thxOutMat(0xF4F8FF, null), lx, H - 0.14, lz);
if (!out) {
strip.material = new THREE.MeshBasicMaterial({ color: 0xF6FAFF });
if (!THX.lite && n % 2 === 1) {
var pl = new THREE.PointLight(0xC8D8F0, 0.6, 20, 2);
pl.position.set(lx, H - 0.35, lz);
THXO.F.add(pl);
}
}
}
thxOutSign(R.k + " · " + R.n.toUpperCase(), R.x, 2.9, R.z + R.d / 2 - 0.2, Math.PI);
thxOutDress(R, H);
});
THXO_SEAL.forEach(function (D) { thxOutDoor(D); });
var pad = new THREE.Mesh(new THREE.CircleGeometry(2.2, 24), thxOutMat(0x3AD06A, null));
pad.rotation.x = -Math.PI / 2;
pad.position.set(0, 0.02, 36);
F.add(pad);
thxOutSign("THE WAY OUT · decontamination", 0, 2.6, 37.4, 0);
thxOutSpot(0, 36, 2.4, "⬆️ The way out", "get out, if the shaft is open", function () { thxOutLeave(); });
thxOutBox(14, 4.4, 0.3, wallM, 0, 2.2, 38.2);
thxOutSolid(0, 38.2, 7, 0.15);
[[-19, -2, "a technician who shut herself in a cupboard"], [20, -33, "a guard who stayed at the containment door"], [0, -26, "a nurse keeping two patients calm"]].forEach(function (P, i) { thxOutPerson(P[0], P[1], P[2], i); });
thxOutFind(-8.6, 36.6, 0, "🩹 First-aid cabinet", "healing salve, into your Backpack", "sz_aid_a");
thxOutFind(11, -15.5, 1, "🩹 Crash trolley", "healing salve, into your Backpack", "sz_aid_e");
thxOutFind(27, -3, 2, "🥫 Emergency rations", "biscuits and water, into your Backpack", "sz_store");
if (typeof thxBlackBuild === "function")
thxBlackBuild();
thxOutSpot(0, 33, 2.6, "📋 The case board", "what you are here to do", function () { thxOutCard(); });
if (typeof thxWidowSay === "function")
setTimeout(function () { thxWidowSay("Sector Zero. This is not a drill. They bite, and a bite costs you. I am on the radio the whole way. Find the people, seal the doors behind you, and keep your back to the ones you have cleared."); }, 1200);
},
function (R, x, z) {
for (var i = 0; i < THXO_ROOMS.length; i++) {
var O = THXO_ROOMS[i];
if (O === R)
continue;
var touchX = Math.abs(Math.abs(R.x - O.x) - (R.w + O.w) / 2) < 0.6, touchZ = Math.abs(Math.abs(R.z - O.z) - (R.d + O.d) / 2) < 0.6;
var ovX = Math.min(R.x + R.w / 2, O.x + O.w / 2) - Math.max(R.x - R.w / 2, O.x - O.w / 2), ovZ = Math.min(R.z + R.d / 2, O.z + O.d / 2) - Math.max(R.z - R.d / 2, O.z - O.d / 2);
if (touchX && ovZ > 4 && Math.abs(x - (R.x + (O.x > R.x ? R.w / 2 : -R.w / 2))) < 0.3 && Math.abs(z - R.z) < 0.3)
return { w: 4 };
if (touchZ && ovX > 4 && Math.abs(z - (R.z + (O.z > R.z ? R.d / 2 : -R.d / 2))) < 0.3 && Math.abs(x - R.x) < 0.3)
return { w: 4 };
}
return null;
},
function (text, x, y, z, ry) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 72;
var c = cv.getContext("2d");
c.fillStyle = "#141A22";
c.fillRect(0, 0, 512, 72);
c.fillStyle = "#FFD24A";
c.font = "bold 34px sans-serif";
c.textAlign = "center";
c.fillText(text, 256, 48);
var m = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
THXO.F.add(m);
return m;
},
function (x, z, b) {
var white = thxOutMat(0xF0F2F4, null), dark = thxOutMat(0x22262C, null), glass = thxOutMat(0x9AC8D8, null);
var cols = [0xE05050, 0x50B050, 0xE0C040, 0x5070D0];
thxOutBox(0.9, 0.1, 0.34, dark, x - 2.2, 0.95, z);
for (var i = 0; i < 8; i++)
thxOutTube(x - 2.6 + i * 0.11, 1.06, z - 0.08 + (i % 2) * 0.16, cols[i % 4]);
if (b === 0) {
thxOutBox(0.4, 0.07, 0.34, dark, x, 0.94, z);
thxOutBox(0.1, 0.42, 0.1, dark, x + 0.12, 1.18, z);
thxOutBox(0.26, 0.05, 0.26, white, x - 0.04, 1.14, z);
thxOutCyl(0.045, 0.26, 0x2A2E34, x - 0.04, 1.42, z);
thxOutBox(0.16, 0.1, 0.12, dark, x - 0.04, 1.58, z - 0.05);
thxOutBox(0.36, 0.02, 0.26, white, x + 1.4, 0.92, z);
var sc = thxOutBox(0.36, 0.24, 0.02, thxOutMat(0x3A6E8C, null), x + 1.4, 1.03, z - 0.12);
sc.rotation.x = -0.22;
}
else if (b === 1) {
thxOutCyl(0.3, 0.26, 0xE8EAEC, x - 0.6, 1.04, z);
thxOutCyl(0.3, 0.04, 0x2A2E34, x - 0.6, 1.19, z);
thxOutBox(0.34, 0.08, 0.3, dark, x + 0.9, 0.95, z);
thxOutCyl(0.11, 0.2, 0x9AC8D8, x + 0.9, 1.09, z);
thxOutBox(0.1, 0.06, 0.04, thxOutMat(0xE05050, null), x + 1.02, 1.0, z - 0.16);
for (var r = 0; r < 4; r++)
thxOutCyl(0.06, 0.2, [0xC8D8C0, 0xD8C8A0, 0xC0C8D8, 0xE0E0D0][r], x + 1.8 + r * 0.18, 1.05, z + 0.1);
}
else {
var sq = thxOutBox(1.3, 0.6, 0.7, thxOutMat(0xE4E8EC, null), x + 0.2, 1.2, z);
thxOutSolid(x + 0.2, z, 0.65, 0.35);
var pan = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), new THREE.MeshBasicMaterial({ color: 0x4AE0C0 }));
pan.position.set(x + 0.2, 1.3, z + 0.36);
THXO.F.add(pan);
thxOutBox(0.5, 0.06, 0.1, dark, x + 0.2, 1.0, z + 0.36);
thxOutBox(0.38, 0.3, 0.3, thxOutMat(0xD8DCE0, null), x + 1.5, 1.05, z);
}
},
function (R) {
var white = thxOutMat(0xE8EAEE, null), dark = thxOutMat(0x262A30, null), steel = thxOutMat(0x9AA2AA, "metal");
var wx = R.x - R.w / 2 + 1.2;
thxOutBox(2.4, 1.0, 1.0, steel, wx + 0.6, 0.5, R.z + 4);
thxOutBox(2.4, 1.1, 1.0, white, wx + 0.6, 1.55, R.z + 4);
var sash = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), new THREE.MeshBasicMaterial({ color: 0xBFE4F0, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
sash.position.set(wx + 0.6, 1.35, R.z + 4.52);
THXO.F.add(sash);
thxOutSolid(wx + 0.6, R.z + 4, 1.2, 0.5);
thxOutBox(1.0, 2.0, 1.0, white, wx, 1.0, R.z - 5);
thxOutBox(0.06, 0.5, 0.06, dark, wx + 0.52, 1.2, R.z - 5);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.14), new THREE.MeshBasicMaterial({ color: 0x6AC8E8 }));
fl.position.set(wx + 0.52, 1.7, R.z - 5);
fl.rotation.y = Math.PI / 2;
THXO.F.add(fl);
thxOutSolid(wx, R.z - 5, 0.5, 0.5);
for (var g = 0; g < 3; g++) {
thxOutBox(0.5, 0.8, 0.14, thxOutMat(0xF0F0EC, null), wx + 3.4 + g * 0.7, 1.5, R.z + 7.2);
}
thxOutBox(0.42, 0.5, 0.42, thxOutMat(0xE0A030, null), wx + 5.8, 0.25, R.z + 7.0);
thxOutSolid(wx + 5.8, R.z + 7.0, 0.21, 0.21);
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 256;
var c = cv.getContext("2d");
c.fillStyle = "#F4F6F8";
c.fillRect(0, 0, 512, 256);
c.strokeStyle = "#4A5058";
c.lineWidth = 3;
c.beginPath();
c.moveTo(48, 40);
c.lineTo(48, 208);
c.lineTo(470, 208);
c.stroke();
c.fillStyle = "#C04040";
var bars = [6, 11, 19, 30, 44, 61, 74, 69, 52, 33];
for (var i = 0; i < bars.length; i++)
c.fillRect(60 + i * 40, 208 - bars[i] * 2.1, 30, bars[i] * 2.1);
c.fillStyle = "#242A30";
c.font = "bold 22px sans-serif";
c.fillText("CASES BY DAY \u00b7 SECTOR ZERO", 58, 30);
c.font = "16px sans-serif";
c.fillText("R = 2.4 \u2192 0.8 once the doors are shut", 58, 236);
var bd = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) }));
bd.position.set(wx - 1.15, 1.8, R.z + 0.5);
bd.rotation.y = Math.PI / 2;
THXO.F.add(bd);
},
function (R, H) {
var mt = thxOutMat(0x8A9098, "metal"), dk = thxOutMat(0x2A2E34, null);
if (R.k === "A") {
for (var i = 0; i < 4; i++)
thxOutBox(2.0, 1.4, 1.2, thxOutMat(0x6A7A5A, null), -7 + i * 4.6, 0.7, R.z - 4), thxOutSolid(-7 + i * 4.6, R.z - 4, 1, 0.6);
thxOutSpot(0, R.z + 3, 3.0, "🧰 Your kit", "what you are carrying", function () { thxKitCard(); });
}
else if (R.k === "C") {
for (var b = 0; b < 3; b++) {
thxOutBox(6, 0.9, 0.8, thxOutMat(0xE4E6E8, "metal"), R.x - 4 + b * 0.0, 0.45, R.z - 5 + b * 4.5);
thxOutSolid(R.x - 4, R.z - 5 + b * 4.5, 3, 0.4);
thxOutBench(R.x - 4, R.z - 5 + b * 4.5, b);
}
thxOutLabKit(R);
thxOutSpot(R.x + 5, R.z + 2, 2.6, "🔬 The laboratory bench", "test, sequence, trace", function () { thxOutLabCard(); });
thxOutSpot(R.x - 6, R.z + 4, 2.4, "📒 The first case", "how this one started", function () {
worldCard(worldFacts("🔬 The laboratory, Sector Zero", "The case notes, left where they fell", [["The first case", "a worker here, nine days ago"], ["How it was noticed", "three people off sick in one week from one room: a cluster"], ["What that teaches", "outbreaks are usually found by noticing a pattern, not by a test"], ["R, the reproduction number", "here it runs at 2.4, so every case passes it to about two more until you slow it"], ["What slows it", "isolating cases, closing the doors between sectors, and protective kit on everyone working"]], ["Grey fever is made up for the game. The lesson is the method, which is the same for any real one: find it, isolate it, trace the contacts, protect the workers."]), {});
});
}
else if (R.k === "E") {
for (var w = 0; w < 6; w++) {
var bx = R.x - 10 + (w % 3) * 7, bz = R.z - 4 + Math.floor(w / 3) * 7;
thxOutBox(1.0, 0.6, 2.2, thxOutMat(0xC8CED6, "metal"), bx, 0.3, bz);
thxOutBox(1.1, 0.2, 2.3, thxOutMat(0xE8ECF0, null), bx, 0.68, bz);
thxOutSolid(bx, bz, 0.55, 1.1);
}
thxOutSpot(R.x, R.z + 6, 2.8, "🛏️ The ward", "the charts on the beds", function () {
worldCard(worldFacts("🛏️ The ward", "Six beds, four of them used", [["Isolation", "each bed curtained, and the air drawn out at the far end"], ["Incubation, here", "four to nine days, which is why people who look well are kept apart too"], ["Tracing", "who shared a room, a shift or a meal with each case"], ["The point", "none of this needs a cure to work. Doors, distance and kit did most of the work in every real outbreak."]], []), {});
});
}
else if (R.k === "F") {
for (var p = 0; p < 3; p++) {
thxOutBox(1.4, 2.6, 1.4, mt, R.x - 5 + p * 4, 1.3, R.z);
thxOutSolid(R.x - 5 + p * 4, R.z, 0.7, 0.7);
}
thxOutSpot(R.x, R.z - 4, 2.6, "🔥 The plant · burn a sector", "turn the fans over on a sealed room", function () { thxOutPurgeCard(); });
thxOutSpot(R.x, R.z + 4, 2.6, "⚙️ The plant", "the fans and the filters", function () {
worldCard(worldFacts("⚙️ The plant room", "Air is the quiet half of containment", [["The filters", "HEPA, 99.97% of everything 0.3 µm across, on the way out as well as in"], ["The pressure", "each room lower than the one outside it, so air moves inwards only"], ["If the fans stop", "the sector is left; nobody works in a room whose air is not controlled"]], []), {});
});
}
else if (R.k === "G") {
thxOutBox(10, 3.2, 0.3, thxOutMat(0xB8C8D0, null), R.x, 1.6, R.z - 5);
thxOutSolid(R.x, R.z - 5, 5, 0.15);
thxOutSpot(R.x, R.z + 3, 2.8, "🚧 Containment", "the last door", function () {
worldCard(worldFacts("🚧 Containment", "Where the samples are kept", [["The rule", "two doors, never open at once; the one you came through closes first"], ["Coming out", "wipe down, shower gowned, suit off from the inside, wash, cross the line"], ["Why in that order", "every step takes you from dirtier to cleaner, and never back"]], []), {});
});
}
else if (R.k === "D") {
for (var s = 0; s < 8; s++) {
thxOutBox(1.2, 2.2, 0.6, thxOutMat(0x6A7A8A, "metal"), R.x - 8 + (s % 4) * 4, 1.1, R.z - 4 + Math.floor(s / 4) * 8);
thxOutSolid(R.x - 8 + (s % 4) * 4, R.z - 4 + Math.floor(s / 4) * 8, 0.6, 0.3);
}
}
},
function (D) {
var g = new THREE.Group();
g.position.set(D.x, 0, D.z);
THXO.F.add(g);
var horiz = Math.abs(D.x) < Math.abs(D.z) || D.k === "A-B" || D.k === "B-E" || D.k === "E-F" || D.k === "E-G";
var leaf = thxOutBox(horiz ? 4 : 0.25, 2.6, horiz ? 0.25 : 4, thxOutMat(0xD8A030, "metal"), 0, 1.3, 0, g);
leaf.position.y = -1.6;
var lamp = thxOutBox(0.25, 0.25, 0.25, thxOutMat(0x3AD06A, null), horiz ? 2.3 : 0, 2.9, horiz ? 0 : 2.3, g);
var Dr = { k: D.k, x: D.x, z: D.z, leaf: leaf, lamp: lamp, horiz: horiz, shut: false };
THXO.doors.push(Dr);
thxOutSpot(D.x, D.z, 2.2, "🚪 Sealing door " + D.k, "seal it", function () { if (typeof thxCDoorUse === "function")
thxCDoorUse(Dr);
else
thxOutSeal(Dr); });
},
function (Dr) {
if (Dr.shut) {
Dr.shut = false;
Dr.leaf.position.y = -1.6;
Dr.lamp.material = thxOutMat(0x3AD06A, null);
THXO.sealed = Math.max(0, THXO.sealed - 1);
thxSay("🚪 Door " + Dr.k + " is open again.");
thxOutSolidsRebuild();
return;
}
Dr.shut = true;
Dr.leaf.position.y = 1.3;
Dr.lamp.material = thxOutMat(0xE04040, null);
THXO.sealed++;
thxSay("🚪 <b>Door " + Dr.k + " sealed.</b> " + THXO.sealed + " of " + THXO.doors.length + ".");
thxOutSolidsRebuild();
if (typeof thxWidowSay === "function" && THXO.sealed === 1)
thxWidowSay("Good. Every door you close takes something off the reproduction number, and a closed door never gets tired.");
if (THXO.sealed === THXO.doors.length && typeof thxWidowSay === "function")
thxWidowSay("Every door sealed. That is the whole sector split into rooms that cannot pass anything between them.");
},
function (x, z, what, i) {
var g = new THREE.Group();
g.position.set(x, 0, z);
THXO.F.add(g);
var suit = thxOutMat([0xE8E4D8, 0xC8D8E8, 0xE0D0C0][i % 3], null);
thxOutBox(0.5, 0.9, 0.3, suit, 0, 1.0, 0, g);
thxOutBox(0.3, 0.3, 0.28, thxOutMat(0xE8C8A8, null), 0, 1.62, 0, g);
thxOutBox(0.16, 0.75, 0.18, suit, -0.17, 0.38, 0, g);
thxOutBox(0.16, 0.75, 0.18, suit, 0.17, 0.38, 0, g);
var P = { g: g, x: x, z: z, what: what, found: false, out: false, gone: false, bitten: 0 };
THXO.people.push(P);
thxOutSpot(x, z, 2.2, "🙋 Someone is here", "speak to them", function () { thxOutMeet(P); });
},
function (P) {
if (P.found) {
thxSay("They are following you to the way out.");
return;
}
P.found = true;
THXO.found++;
thxSay("🙋 <b>Found:</b> " + thxEsc(P.what) + ". " + THXO.found + " of " + THXO.people.length + " accounted for.");
if (typeof thxWidowSay === "function")
thxWidowSay(THXO.found === THXO.people.length ? "That is everyone accounted for. Walk them to the way out and take the decontamination properly, however slow it feels." : "One more accounted for. Keep them with you; nobody walks out of a sector alone.");
THXO.fx.push(function (dt) {
if (P.gone || P.out)
return;
var L = thxOutLocal();
var dx = L.x - P.g.position.x, dz = L.z - P.g.position.z, d = Math.sqrt(dx * dx + dz * dz);
if (d > 3) {
P.g.position.x += dx / d * dt * 2.2;
P.g.position.z += dz / d * dt * 2.2;
}
P.g.rotation.y = Math.atan2(dx, dz);
if (Math.hypot(P.g.position.x, P.g.position.z - 36) < 3.2 && Math.hypot(L.x, L.z - 36) < 4)
thxOutWalkOut(P);
});
},
function (x, z, speed) {
var g = new THREE.Group();
g.position.set(x, 0, z);
THXO.F.add(g);
var cloth = thxOutMat(0x4A5A50, null), skin = thxOutMat(0x9AA89A, null);
thxOutBox(0.52, 0.92, 0.32, cloth, 0, 1.0, 0, g);
var head = thxOutBox(0.3, 0.32, 0.28, skin, 0, 1.63, 0, g);
var la = thxOutBox(0.15, 0.7, 0.16, cloth, -0.33, 1.15, 0.1, g), ra = thxOutBox(0.15, 0.7, 0.16, cloth, 0.33, 1.15, 0.1, g);
la.rotation.x = -1.1;
ra.rotation.x = -1.1;
var ll = thxOutBox(0.17, 0.78, 0.19, cloth, -0.14, 0.39, 0, g), rl = thxOutBox(0.17, 0.78, 0.19, cloth, 0.14, 0.39, 0, g);
thxOutBox(0.56, 0.12, 0.36, thxOutMat(0x4A1410, null), 0, 1.3, 0, g);
var Fg = { g: g, hp: 3, sp: speed, ll: ll, rl: rl, head: head, down: false, t: Math.random() * 6 };
thxZSetup(Fg, THXO.wave);
thxGoreStain(g);
THXO.figs.push(Fg);
THXO.left++;
return Fg;
},
function () {
THXO.wave++;
var n = Math.min(10, 2 + THXO.wave * 2), sp = 1.05 + THXO.wave * 0.08;
for (var i = 0; i < n; i++) {
var R = THXO_ROOMS[(i + THXO.wave) % THXO_ROOMS.length];
thxOutFig(R.x + (Math.random() - 0.5) * (R.w - 4), R.z + (Math.random() - 0.5) * (R.d - 4), sp + Math.random() * 0.2);
}
thxSay("🎯 <b>Wave " + THXO.wave + ".</b> " + n + " of them on their feet.");
if (typeof thxWidowSay === "function")
thxWidowSay(THXO.wave === 1 ? "They are up and moving. Short bursts, pick your ground, and keep a sealed door at your back." : "Wave " + THXO.wave + ". You are doing well. Keep moving backwards towards the doors you have already closed.");
},
function (d, name) {
if (typeof DGR === "undefined" || thxKeeper() || DGR.downT > 0 || DGR.guard > 0)
return;
if (typeof dgrProtected === "function" && dgrProtected())
return;
d = Math.max(1, Math.min(25, d | 0));
if (typeof spellHarm === "function")
try {
var w = +spellHarm(d);
if (isFinite(w))
d = Math.max(0, Math.round(w));
}
catch (e) { }
if (!d) {
thxSay("<b>" + thxEsc(name || "One of them") + "</b> gets hold of you, but your ward holds.");
return;
}
DGR.hp -= d;
DGR.hurt = Math.min(1, DGR.hurt + d / 40);
DGR.quiet = 0;
DGR.fought = DGR.t;
try {
thxGoreBitten(d);
var Fw = (WLD.on === "thefall" && typeof THXF !== "undefined") ? THXF.F : THXO.F, L0 = thxOutLocal();
thxGore(Fw, L0.x, 1.2, L0.z, 4 + d / 2);
if (Math.random() < 0.5)
thxGorePool(Fw, L0.x, L0.z, 0.3);
}
catch (e) { }
if (typeof playTone === "function")
try {
playTone(140, 0.14);
}
catch (e) { }
if (DGR.hp <= 0) {
DGR.hp = 0;
DGR.downT = 1.6;
thxSay("<b>They drag you down.</b> You come to at the way in, shaking. Nothing is taken from you; the rooms are as you left them.");
if (typeof thxWidowSay === "function")
try {
thxWidowSay("I have you. Get up. Salve from your pack before you go back in.");
}
catch (e) { }
return;
}
thxSay("🩸 <b>" + thxEsc(name || "One of them") + "</b> " + (/sentry/i.test(name || "") ? "fires on you" : "bites you") + " (−" + d + "). Vigour " + Math.round(DGR.hp) + " of " + DGR.max + "." + (DGR.hp < 35 ? " Use healing salve from your 🎒 Backpack." : ""));
},
function (x, z, kind, name, verb, spot) {
var g = new THREE.Group();
g.position.set(x, 0, z);
THXO.F.add(g);
if (kind === 2) {
thxOutBox(1.2, 0.7, 0.8, thxOutMat(0x5A6A4A, null), 0, 0.35, 0, g);
thxOutBox(1.0, 0.5, 0.6, thxOutMat(0x6E7E5A, null), 0.1, 0.95, 0, g);
}
else {
thxOutBox(0.8, kind ? 0.9 : 1.0, kind ? 0.5 : 0.28, thxOutMat(0xE8ECEE, null), 0, kind ? 0.45 : 1.5, 0, g);
thxOutBox(0.3, 0.08, 0.02, thxOutMat(0x2EA84A, null), 0, kind ? 0.7 : 1.55, kind ? 0.26 : 0.15, g);
thxOutBox(0.08, 0.3, 0.02, thxOutMat(0x2EA84A, null), 0, kind ? 0.7 : 1.55, kind ? 0.26 : 0.15, g);
}
thxOutSolid(x, z, 0.5, 0.4);
thxOutSpot(x, z, 2.2, name, verb, function () {
if (typeof foodPackFind === "function")
foodPackFind(spot);
else
thxSay("Empty. Someone got here first.");
});
},
function () {
if (THXO.cool > 0 || THXO.done)
return;
THXO.shots++;
var L = thxOutLocal(), R = thxAttack(THXO.figs, L, false);
THXO.cool = R.cool;
if (typeof playTone === "function")
try {
playTone(R.W.melee ? 220 : 420, 0.05);
}
catch (e) { }
if (R.hits.length)
THXO.hits++;
thxGoreHits(THXO.F, R, L);
R.hits.forEach(function (h) {
if (!h.dead || h.Fg.down)
return;
var best = h.Fg;
best.down = true;
THXO.left--;
best.g.rotation.x = -1.4;
best.g.position.y = 0.3;
if (best.bar)
best.bar.visible = false;
setTimeout(function () { if (best.g.parent)
best.g.parent.remove(best.g); }, 6000);
});
thxSay(R.msg + (R.hits.some(function (h) { return h.dead; }) ? " " + Math.max(0, THXO.left) + " still on their feet." : ""));
if (R.hits.length && THXO.left <= 0)
thxOutWaveDone();
},
function () {
if (THXO.done)
return;
THXO.done = true;
var secs = Math.round(THXO.t), acc = THXO.shots ? Math.round(THXO.hits / THXO.shots * 100) : 0;
var score = THXO.found * 200 + THXO.sealed * 120 + acc * 2 + Math.max(0, 900 - secs);
if (!THXO.best || score > THXO.best.score) {
THXO.best = { score: score, secs: secs, acc: acc, found: THXO.found, sealed: THXO.sealed };
try {
localStorage.setItem("thx_sector_best", JSON.stringify(THXO.best));
}
catch (e) { }
}
if (typeof thxWidowSay === "function")
thxWidowSay("Sector Zero is clear. You kept your head, and you kept it attached. Well done.");
worldCard(worldFacts("🏅 Sector Zero: clear", "Held, and finished properly", [["People accounted for", THXO.found + " of " + THXO.people.length], ["Doors sealed", THXO.sealed + " of " + THXO.doors.length], ["On target", acc + "% (" + THXO.hits + " of " + THXO.shots + ")"], ["Time", Math.floor(secs / 60) + " min " + (secs % 60) + " s"], ["Score", score], ["Your best", THXO.best ? THXO.best.score + " (" + THXO.best.acc + "% on target)" : "—"]], ["What it teaches: find it, isolate it, trace it, protect the people working, and come out in the right order. The shooting is the stress relief. The doors were the real work."]) +
worldBtn("again", "Run it again", "") + worldBtn("out", "⬆️ The way out", ""), { again: function () { thxOutAgain(); }, out: function () { thxOutLeave(); } });
},
function () {
if (THXO.lock && !THXO.done && !thxKeeper()) {
thxSay("🔒 <b>The way out is sealed.</b> Widow has the sector locked down until it is held or lost.");
if (typeof thxWidowSay === "function")
thxWidowSay("Not while it is still moving. Hold it, and I will open the shaft myself.");
return;
}
if (typeof worldCard === "function")
worldCard(null);
var rows = [["People accounted for", THXO.found + " of " + THXO.people.length], ["Doors sealed", THXO.sealed + " of " + THXO.doors.length], ["On target", (THXO.shots ? Math.round(THXO.hits / THXO.shots * 100) : 0) + "%"]];
thxGoFloor("facility");
setTimeout(function () { worldCard(worldFacts("🚿 Out, and decontaminated", "Wipe down, shower gowned, suit off from the inside out, wash, cross the line.", rows, ["The order never changes, however short the entry was."]), {}); }, 700);
},
function () {
var B = THXO.best;
worldCard(worldFacts("📋 Sector Zero", "It is live. Grey fever is invented; every method down here is real.", [["Find the people", "three of them are down here, and one of them is incubating"], ["Test before you walk them up", "the bench in C: swab, amplify, read. A case in the lift is how it reaches the city."], ["Seal the joins", "six doors. A sealed join stops the heat dead, and every one you close takes a slice off R."], ["Burn a room out", "the plant in F, once every join into that room is sealed"], ["Keep Receiving cold", "what reaches A climbs the shaft. At 100% it is in the city."], ["Her ladder", "advisory, lockdown, she burns a room, and then the final measure"], ["Your best", B ? B.score + " · " + B.found + " found · " + B.sealed + " sealed · " + B.acc + "% on target" : "not yet run"]], ["Fire with E, F, a click or the Strike button.", "If it gets past you, you do not wake in the Tower. You wake in what is left of the city.", "Kept on this device."]), {});
},
function (dt) {
if (THXO.done || THXO.lost)
return;
var cfg = thxOutCfg(), rate = (cfg.spread === undefined ? 1 : cfg.spread) * 0.055;
THXO_JOIN.forEach(function (J) {
var Dr = thxOutDoorOf(J[0], J[1]);
if (Dr && Dr.shut)
return;
var a = THXO.heat[J[0]] || 0, b = THXO.heat[J[1]] || 0, d = (a - b) * rate * dt;
if (!THXO.burned[J[1]])
THXO.heat[J[1]] = Math.max(0, Math.min(1, b + d));
if (!THXO.burned[J[0]])
THXO.heat[J[0]] = Math.max(0, Math.min(1, a - d));
});
THXO_ROOMS.forEach(function (R) {
if (THXO.burned[R.k]) {
THXO.heat[R.k] = 0;
return;
}
var h = THXO.heat[R.k] || 0;
if (h > 0.04)
THXO.heat[R.k] = Math.min(1, h + h * (1 - h) * 0.035 * dt);
});
var A = THXO.heat.A || 0;
if (A > 0.25)
THXO.breach = Math.min(1, THXO.breach + (A - 0.2) * 0.022 * dt);
else if (THXO.breach > 0)
THXO.breach = Math.max(0, THXO.breach - 0.004 * dt);
var cap = THX.lite ? 7 : 14;
if (THXO.t > THXO.spawnAt && THXO.left < cap) {
var hot = THXO_ROOMS.filter(function (R) { return thxOutHot(R.k); });
if (hot.length) {
var R = hot[Math.floor(Math.random() * hot.length)];
thxOutFig(R.x + (Math.random() - 0.5) * (R.w - 4), R.z + (Math.random() - 0.5) * (R.d - 4), 1.05 + THXO.heat[R.k] * 0.5);
THXO.spawnAt = THXO.t + Math.max(3.5, 9 - thxOutTotal() * 1.6);
}
else
THXO.spawnAt = THXO.t + 4;
}
thxOutLadder(dt);
if (THXO.breach >= 1)
thxOutBreached();
else if (thxOutTotal() < 0.09 && THXO.t > 25 && !THXO.done)
thxOutHeld();
},
function (dt) {
var tot = thxOutTotal(), br = THXO.breach, cfg = thxOutCfg();
if (THXO.lvl < 1 && tot > 0.9) {
THXO.lvl = 1;
thxWidowSay("Advisory. It is spreading: the sector is live and the thing is in more than one room. Seal the joins behind you. I am counting the doors with you.");
}
if (THXO.lvl < 2 && (tot > 1.8 || br > 0.22)) {
THXO.lvl = 2;
THXO.lock = true;
thxWidowSay("Sector lockdown. The shaft is shut and the way out with it, and it stays shut until this is held or lost. I am sorry. Nothing leaves Sector Zero while it is still moving.");
thxSay("🔒 <b>Sector lockdown.</b> The way out is sealed from above.");
}
if (THXO.lvl < 3 && br > 0.5) {
THXO.lvl = 3;
var worst = thxOutWorst();
THXO.warnRoom = worst;
THXO.warnAt = THXO.t + 30;
thxWidowSay("I am going to burn " + thxOutName(worst) + ". You have half a minute to seal its joins and take it off me, and anyone still inside it when I do is lost. I would rather you did it, but I will not wait past the half minute.");
}
if (THXO.lvl >= 3 && THXO.warnAt && THXO.t > THXO.warnAt) {
THXO.warnAt = 0;
if (thxOutSealedOff(THXO.warnRoom) && (THXO.heat[THXO.warnRoom] || 0) < 0.3)
thxWidowSay("You took it off me. " + thxOutName(THXO.warnRoom) + " is sealed and cooling. Well done.");
else
thxOutBurn(THXO.warnRoom, "widow");
}
if (THXO.lvl < 4 && br > 0.86) {
THXO.lvl = 4;
if (thxOutPlantOk() && cfg.final !== false && typeof thxBlackTurn === "function" && cfg.black !== false)
thxBlackTurn();
else if (thxOutPlantOk() && cfg.final !== false) {
THXO.finalAt = THXO.t + 30;
thxWidowSay("Final measure. I am flooding the whole sector in thirty seconds. Everything in it goes, and that includes you if you are still in it when the plant turns over. Get to Receiving if you can. If you cannot, I will still do it.");
thxSay("☠️ <b>Final measure in 30 seconds.</b> Widow is flooding Sector Zero.");
}
else
thxWidowSay(cfg.final === false ? "I am forbidden the final measure. I can only watch this go up the shaft, and tell you to run."
: "The plant is gone, so the final measure is gone with it. I cannot flood a sector whose fans I do not have. Run.");
}
if (THXO.finalAt && THXO.t > THXO.finalAt) {
THXO.finalAt = 0;
thxOutFinal();
}
},
function (k, who) {
if (THXO.burned[k])
return;
if (!thxOutPlantOk()) {
thxSay("⚙️ The plant will not answer. Nothing can be burned from here.");
return;
}
THXO.burned[k] = true;
THXO.heat[k] = 0;
THXO.purgeCool = 22;
var R = thxOutRoom(k), lost = 0;
THXO.figs.forEach(function (Fg) { if (Fg.down)
return; if (thxOutIn(k, Fg.g.position.x, Fg.g.position.z)) {
Fg.down = true;
THXO.left--;
if (Fg.g.parent)
Fg.g.parent.remove(Fg.g);
} });
THXO.people.forEach(function (P) {
if (P.out || P.gone)
return;
if (thxOutIn(k, P.g.position.x, P.g.position.z)) {
P.gone = true;
lost++;
if (P.g.parent)
P.g.parent.remove(P.g);
}
});
if (R) {
var m = thxOutMat(0x22262C, "concrete");
thxOutBox(R.w - 0.6, 0.05, R.d - 0.6, thxOutMat(0x1A1E24, null), R.x, 0.04, R.z);
}
thxSay("🔥 <b>" + thxOutName(k).toUpperCase() + " burned out.</b>" + (lost ? " " + lost + " of your people were still inside." : " Nothing of yours was inside."));
var L = thxOutLocal();
if (thxOutIn(k, L.x, L.z) && !thxKeeper()) {
thxWidowSay("You were inside. I told you I would not wait.");
thxOutYouDied("the burn");
return;
}
if (who === "widow")
thxWidowSay(lost ? "It is done. I counted " + lost + " of ours in there, and I am going to carry that. It was that or the city." : "It is done, and nobody of ours was in it.");
else
thxWidowSay("Burned, on your word. That room will not give anything back.");
},
function () {
if (THXO.done || THXO.lost)
return;
THXO.done = true;
var L = thxOutLocal(), inside = !thxOutIn("A", L.x, L.z), saved = 0, lost = 0;
THXO.people.forEach(function (P) { if (P.out)
saved++;
else
lost++; });
THXO.figs.forEach(function (Fg) { if (Fg.g && Fg.g.parent)
Fg.g.parent.remove(Fg.g); });
THXO.figs = [];
THXO.left = 0;
thxWidowSay("Sector Zero is flooded. It is contained. Nothing came up the shaft, and the city above does not know how close it came.");
if (inside && !thxKeeper()) {
thxOutYouDied("the final measure");
return;
}
worldCard(worldFacts("☠️ Contained, at the price she said", (THXO.black && typeof THXB !== "undefined" && THXB.escaped) ? "The Black Widow flooded Sector Zero, and you got out of her Core alive." : "WHITE WIDOW flooded Sector Zero. The city stands.", [["Held by", "the final measure, not by you"], ["People walked out", saved + " of " + THXO.people.length], ["People lost in the sector", String(lost)], ["Doors you sealed", THXO.sealed + " of " + THXO.doors.length], ["Rooms burned", String(Object.keys(THXO.burned).length)]], ["She asked for nothing and warned you twice. That is what she is for.", "Sealing the joins early is the only way to hold it without her."]) +
worldBtn("again", "Run it again", "") + worldBtn("out", "⬆️ Out, and decontaminated", ""), { again: function () { thxOutAgain(); }, out: function () { THXO.lock = false; thxOutLeave(); } });
},
function (how) {
THXO.done = true;
worldCard(worldFacts("☠️ You were in it", "Caught by " + how + ".", [["What happened next", "the sector held; you did not"], ["What to do differently", "seal the joins behind you, and keep Receiving cold"]], ["You wake in the Tower, as you always do. Sector Zero does not."]) + worldBtn("out", "Wake up", ""), { out: function () { THXO.lock = false; thxOutLeave(); } });
if (typeof dgrWake === "function")
setTimeout(function () { try {
dgrWake();
}
catch (e) { } }, 400);
},
function () {
if (THXO.done)
return;
THXO.done = true;
var out = 0;
THXO.people.forEach(function (P) { if (!P.gone)
out++; });
var secs = Math.round(THXO.t), acc = THXO.shots ? Math.round(THXO.hits / THXO.shots * 100) : 0;
var score = out * 300 + THXO.sealed * 120 + (THXO.people.length - THXO.turned) * 100 + acc * 2 + Math.max(0, 1200 - secs) + Math.round((1 - THXO.breach) * 400);
if (!THXO.best || score > THXO.best.score) {
THXO.best = { score: score, secs: secs, acc: acc, found: out, sealed: THXO.sealed };
try {
localStorage.setItem("thx_sector_best", JSON.stringify(THXO.best));
}
catch (e) { }
}
THXO.lock = false;
thxWidowSay("Held. Every room is cold or burned and the shaft never saw it. You did that with doors, which is the part nobody tells stories about.");
worldCard(worldFacts("🏅 Sector Zero: held", "Contained by you, and she never had to reach the bottom of her ladder.", [["People alive", out + " of " + THXO.people.length], ["People lost", String(THXO.people.length - out)], ["Doors sealed", THXO.sealed + " of " + THXO.doors.length], ["Rooms burned", String(Object.keys(THXO.burned).length)], ["How close it came to the shaft", Math.round(THXO.breach * 100) + "%"], ["On target", acc + "%"], ["Time", Math.floor(secs / 60) + " min " + (secs % 60) + " s"], ["Score", String(score)], ["Your best", THXO.best ? String(THXO.best.score) : "—"]], ["Doors, distance and kit. The shooting only ever buys you the time to close something."]) +
worldBtn("again", "Run it again", "") + worldBtn("out", "⬆️ Out, and decontaminated", ""), { again: function () { thxOutAgain(); }, out: function () { thxOutLeave(); } });
},
function () {
if (THXO.done || THXO.lost)
return;
THXO.lost = true;
THXO.done = true;
THXO.lock = false;
thxWidowSay("It is in the shaft. I have nothing left to close and nothing left to burn it with. Somnucor, this is White Widow. Everyone above ground, run.");
thxSay("☣️ <b>Sector Zero is lost.</b> It is in the city.");
setTimeout(function () { if (typeof thxFallStart === "function")
thxFallStart("the Tower");
else
thxOutLeave(); }, 2600);
},
function (P) {
if (P.gone || P.out)
return;
P.gone = true;
THXO.turned++;
if (P.g.parent)
P.g.parent.remove(P.g);
var F = thxOutFig(P.g.position.x, P.g.position.z, 1.2);
F.wasOurs = true;
thxSay("☣️ <b>" + thxEsc(P.what) + " — gone.</b> They are on their feet again, and they are not themselves.");
if (typeof thxWidowSay === "function")
thxWidowSay("I am sorry. Anyone bitten goes the same way, every time, and nobody has ever talked one of them back.");
},
function (P) {
if (P.out || P.gone)
return;
P.out = true;
if (P.g.parent)
P.g.parent.remove(P.g);
if (P.inf) {
THXO.breach = Math.min(1, THXO.breach + 0.34);
thxSay("🛗 <b>" + thxEsc(P.what) + " went up the shaft.</b> They were incubating.");
if (typeof thxWidowSay === "function")
thxWidowSay("You just put a case in my lift. That is how every real one got out: somebody who looked perfectly well. Test them next time. I would rather hold the door than hold a city.");
}
else {
thxSay("🛗 <b>" + thxEsc(P.what) + " is out,</b> clean.");
if (typeof thxWidowSay === "function")
thxWidowSay("Clean, and up. That is one who goes home.");
}
},
function () {
var base = 2.6, open = 0;
THXO_JOIN.forEach(function (J) { var Dr = thxOutDoorOf(J[0], J[1]); if (!Dr || !Dr.shut)
open++; });
var burned = Object.keys(THXO.burned).length;
return Math.max(0.2, base * (open / THXO_JOIN.length) * (1 - burned * 0.12));
},
function () {
var R = thxOutR(), held = R < 1;
var rows = [["The agent", "grey fever, invented for this sector"],
["R, as the doors stand", R.toFixed(2) + (held ? " — below 1, it dies out" : " — above 1, it is still growing")],
["Joins open", String(THXO_JOIN.filter(function (J) { var D = thxOutDoorOf(J[0], J[1]); return !D || !D.shut; }).length) + " of " + THXO_JOIN.length],
["Doubling time", held ? "—" : Math.round(14 / Math.max(0.01, R - 1)) + " minutes at this R"],
["Rooms burned out", String(Object.keys(THXO.burned).length)]];
var b = worldBtn("test", "🧪 Run the assay on the people you have found", "swab, lyse, amplify, read")
+ worldBtn("seq", "🧬 Sequence what came off the bench", "read it, translate it, compare it with the reference")
+ worldBtn("trace", "🗒️ Trace the contacts", "who shared a room, a shift or a meal");
worldCard(worldFacts("🔬 The laboratory, Sector Zero", "Every method here is the real one. Only the bug is made up.", rows, ["R under 1 is the whole game. Doors do it faster than anything you can put in a syringe."]) + b, { test: function () { thxOutAssay(); }, seq: function () { thxOutSeqCard(); }, trace: function () { thxOutTraceCard(); } });
},
function () {
thxOutSeed();
var have = THXO.people.filter(function (P) { return P.found && !P.gone && !P.out; });
if (!have.length) {
worldCard(worldFacts("🧪 The assay", "Nothing to test yet", [["Bring someone here", "the test needs a swab from a person, and you have not found anyone"]], []), {});
return;
}
var steps = [["1 · Swab", "the back of the nose, both sides, turned five times. A bad swab is the commonest wrong answer in the world."],
["2 · Lyse", "the swab goes in buffer that breaks every cell open and frees the nucleic acid."],
["3 · Amplify", "35 cycles: 95 °C to part the strands, 55 °C for the primers to find their place, 72 °C for the polymerase to copy. Every cycle doubles what is there."],
["4 · Read", "a probe lights as it is copied. The cycle at which it lights is the Ct: the lower the Ct, the more was in the swab to begin with."]];
var rows = steps.slice();
have.forEach(function (P) {
P.tested = true;
var ct = P.inf ? (22 + Math.round(Math.random() * 6)) : 0;
rows.push([thxEsc(P.what), P.inf ? ("POSITIVE · Ct " + ct + " — incubating, and will be infectious") : "negative · no signal in 35 cycles"]);
});
var pos = have.filter(function (P) { return P.inf; }).length;
if (typeof thxWidowSay === "function")
thxWidowSay(pos ? "One of them is carrying it. They walk out through isolation, not up the lift with you." : "All clear. You can take them up when the shaft opens.");
worldCard(worldFacts("🧪 The assay", "Swab, lyse, amplify, read", rows, ["A negative today is not a negative tomorrow: the incubation runs four to nine days, so you test again.", "Ct is not a severity score. It is how much was on the swab."]) +
worldBtn("back", "← The bench", ""), { back: function () { thxOutLabCard(); } });
},
function () {
var ref = THXO_REF.split(" "), vr = THXO_VAR.split(" "), at = -1;
for (var i = 0; i < ref.length; i++)
if (ref[i] !== vr[i]) {
at = i;
break;
}
var aaR = (typeof THX_CODE !== "undefined" && THX_CODE[ref[at]]) || "?", aaV = (typeof THX_CODE !== "undefined" && THX_CODE[vr[at]]) || "?";
var rows = [["Reference, codon " + (at + 1), ref[at] + " → " + aaR],
["This sector's sample", vr[at] + " → " + aaV],
["The change", "a single base: " + ref[at] + " to " + vr[at] + ", so one amino acid in the whole protein"],
["What that does here", "the changed residue sits on the part that grips a cell, and it grips harder. In this sector it spreads about a third faster than the reference."],
["How you would know for real", "you would not guess it from the letters. You would sequence, then watch the case curve, then test the two side by side."]];
if (!THXO.seqDone) {
THXO.seqDone = true;
if (typeof thxWidowSay === "function")
thxWidowSay("A single base. One letter in fourteen thousand and it moves half again as fast. That is the whole of why this work is done carefully.");
}
worldCard(worldFacts("🧬 Sequencing the sample", "Read it, translate it, compare it", rows, ["The sequence is invented. The reading of it is exactly how it is done: codons three letters at a time, each one an amino acid, start at ATG and stop at a stop.", "Full codon table and translation bench: Genetics, B4."]) +
worldBtn("tbl", "📖 The codon table", "") + worldBtn("back", "← The bench", ""), { tbl: function () { if (typeof thxCodonTable === "function")
thxCodonTable(); }, back: function () { thxOutLabCard(); } });
},
function () {
thxOutSeed();
var rows = [["Case 0", "a worker on the containment door, nine days ago"],
["Who shared his shift", "the guard still at that door, and the nurse on the ward"],
["Who shared the mess room", "everyone on the late shift, which is why the ward filled first"],
["What tracing is for", "finding the people who do not feel ill yet. They are the ones who move it."],
["What it is not for", "blame. A contact list that people lie to is worth nothing, and they lie when they are blamed."]];
worldCard(worldFacts("🗒️ Contact tracing", "The dullest half of an outbreak, and the half that works", rows, ["Trace, test, isolate, repeat. The order matters."]) + worldBtn("back", "← The bench", ""), { back: function () { thxOutLabCard(); } });
},
function () {
var b = "", fns = {};
THXO_ROOMS.forEach(function (R) {
if (THXO.burned[R.k]) {
b += worldBtn("x_" + R.k, "✅ " + R.k + " · " + R.n + " — already burned", "");
fns["x_" + R.k] = function () { };
return;
}
var off = thxOutSealedOff(R.k), you = false, ours = 0;
var L = thxOutLocal();
you = thxOutIn(R.k, L.x, L.z);
THXO.people.forEach(function (P) { if (!P.gone && !P.out && thxOutIn(R.k, P.g.position.x, P.g.position.z))
ours++; });
var why = !off ? "its joins are not all sealed" : (you ? "you are standing in it" : (ours ? ours + " of your people are inside" : ""));
b += worldBtn("b_" + R.k, (off && !you ? "🔥 " : "🔒 ") + R.k + " · " + R.n + (why ? " — " + why : ""), "heat " + Math.round((THXO.heat[R.k] || 0) * 100) + "%");
fns["b_" + R.k] = function () {
if (!off) {
thxSay("🔒 Every join into " + R.k + " has to be sealed first.");
return;
}
if (you && !thxKeeper()) {
thxSay("🔒 Not while you are standing in it.");
return;
}
if (THXO.purgeCool > 0) {
thxSay("⚙️ The plant is still recharging (" + Math.ceil(THXO.purgeCool) + "s).");
return;
}
if (ours && !THXO.confirm) {
THXO.confirm = R.k;
if (typeof thxWidowSay === "function")
thxWidowSay(ours + " of ours are in that room. Say it again and I will do it, and neither of us will pretend it was nothing.");
thxSay("⚠️ <b>" + ours + " of your people are in " + R.k + ".</b> Choose it again to burn it anyway.");
thxOutPurgeCard();
return;
}
THXO.confirm = null;
worldCard(null);
thxOutBurn(R.k, "you");
};
});
worldCard(worldFacts("⚙️ The plant · burn a sector out", "The fans turn over and the room is cleaned to bare concrete.", [["What it needs", "every join into that room sealed, and you outside it"], ["What it costs", "everything alive in that room, yours included"], ["Recharge", "22 seconds between burns"], ["If the plant falls", "nothing can be burned, and her final measure goes with it. Keep F cold."]], ["This is the measure she will take herself if the shaft starts to climb."]) + b, fns);
},
function (dt) {
if (WLD.on !== THXO.key)
return;
THXO.t += dt;
if (THXO.cool > 0)
THXO.cool -= dt;
if (THXO.purgeCool > 0)
THXO.purgeCool -= dt;
var L = thxOutLocal(), keeper = thxKeeper();
thxOutSpread(dt);
THXO.figs.forEach(function (Fg) {
if (Fg.down)
return;
Fg.t += dt;
var dx = L.x - Fg.g.position.x, dz = L.z - Fg.g.position.z, d = Math.sqrt(dx * dx + dz * dz) || 1;
Fg.g.rotation.y = Math.atan2(dx, dz);
Fg.ll.rotation.x = Math.sin(Fg.t * 3.4) * 0.5;
Fg.rl.rotation.x = -Math.sin(Fg.t * 3.4) * 0.5;
if (d > 1.3) {
var nx = Fg.g.position.x + dx / d * dt * Fg.sp, nz = Fg.g.position.z + dz / d * dt * Fg.sp;
var blocked = false;
for (var i = 0; i < THXO.solids.length; i++) {
var s = THXO.solids[i];
if (Math.abs(nx - s.x) < s.hw + 0.4 && Math.abs(nz - s.z) < s.hd + 0.4) {
blocked = true;
break;
}
}
if (!blocked) {
Fg.g.position.x = nx;
Fg.g.position.z = nz;
}
}
else if (!keeper && THXO.t - (Fg.last || 0) > 1.6) {
Fg.last = THXO.t;
try {
thxHarm(Fg.kind ? Fg.kind.bite : 7, Fg.kind ? Fg.kind.n : "One of them");
}
catch (e) { }
}
THXO.people.forEach(function (P) {
if (P.gone || P.out)
return;
var px = P.g.position.x - Fg.g.position.x, pz = P.g.position.z - Fg.g.position.z;
if (px * px + pz * pz < 2.0) {
P.bitten = (P.bitten || 0) + dt;
if (P.bitten > 2.4)
thxOutTurn(P);
}
});
});
THXO.fx.forEach(function (f) { try {
f(dt, THXO.t);
}
catch (e) { } });
thxZBars(THXO.figs);
thxGoreTick(dt);
if (typeof thxBlackTick === "function")
thxBlackTick(dt);
if (typeof worldBanner === "function" && (!THXW.capT || THXW.heard === 0 || true)) {
var tot = thxOutTotal(), rooms = THXO_ROOMS.filter(function (R) { return thxOutHot(R.k); }).map(function (R) { return R.k; }).join(" ");
var h = "<b>SECTOR ZERO</b> &nbsp; ☣️ " + (rooms || "held") + " &nbsp; 🛗 shaft " + Math.round(THXO.breach * 100) + "% &nbsp; 🎯 " + Math.max(0, THXO.left) + " up &nbsp; 🙋 " + THXO.found + "/" + THXO.people.length + " &nbsp; 🚪 " + THXO.sealed + "/" + THXO.doors.length + thxArmsLine(false);
if (THXO.black && typeof THXB !== "undefined" && THXB.on)
h = thxBlackBanner() + thxArmsLine(false);
else if (THXO.finalAt)
h = "<b>☠️ FINAL MEASURE IN " + Math.max(0, Math.ceil(THXO.finalAt - THXO.t)) + "s</b> &nbsp; get to Receiving";
else if (THXO.warnAt)
h = "<b>🔥 SHE BURNS " + THXO.warnRoom + " IN " + Math.max(0, Math.ceil(THXO.warnAt - THXO.t)) + "s</b> &nbsp; seal its joins to take it off her";
if (!THXW.capT || Date.now() - (THXW.lastCap || 0) > 11000)
worldBanner(h);
}
var near = null, nd = 1e9;
THXO.spots.forEach(function (S) { var d = Math.hypot(L.x - S.x, L.z - S.z); if (d < S.r && d < nd) {
nd = d;
near = S;
} });
if (typeof worldPrompt === "function") {
if (near)
worldPrompt("<b>" + thxEsc(near.name) + "</b> — " + thxEsc(near.verb) + " <span style='opacity:.7'>(F)</span>", near.fn);
else
worldPrompt((thxWpn(false).melee ? "🗡️ <b>Strike</b>" : "🎯 <b>Fire</b>") + " <span style='opacity:.7'>(E or F)</span>", thxOutFire);
}
},
function (Fg, wave) {
var K = THXZ_KIND[thxZKind(wave || 1)];
Fg.kind = K;
Fg.max = Math.round(K.hp * (1 + Math.max(0, (wave || 1) - 1) * 0.06));
Fg.hp = Fg.max;
Fg.sp *= K.sp;
Fg.g.scale.setScalar(K.sc);
if (!THXZ.barGeo) {
THXZ.barGeo = new THREE.PlaneGeometry(0.8, 0.09);
THXZ.barBack = new THREE.MeshBasicMaterial({ color: 0x1A0A0A, transparent: true, opacity: 0.7, depthWrite: false });
THXZ.barFront = new THREE.MeshBasicMaterial({ color: 0xD0302A, depthWrite: false });
}
var bar = new THREE.Group(), b = new THREE.Mesh(THXZ.barGeo, THXZ.barBack), f = new THREE.Mesh(THXZ.barGeo, THXZ.barFront);
f.position.z = 0.002;
bar.add(b);
bar.add(f);
bar.position.y = 2.05;
bar.visible = false;
Fg.g.add(bar);
Fg.bar = bar;
Fg.barF = f;
return Fg;
},
function (figs) {
if (typeof camera === "undefined")
return;
for (var i = 0; i < figs.length; i++) {
var Fg = figs[i];
if (!Fg.bar)
continue;
var on = !Fg.down && Fg.hp < Fg.max;
Fg.bar.visible = on;
if (!on)
continue;
var p = Math.max(0, Fg.hp / Fg.max);
Fg.barF.scale.x = Math.max(0.001, p);
Fg.barF.position.x = -0.4 * (1 - p);
Fg.bar.quaternion.copy(camera.quaternion);
THXZ.q = THXZ.q || new THREE.Quaternion();
Fg.bar.quaternion.premultiply(THXZ.q.copy(Fg.g.quaternion).invert());
}
},
function (fall) {
var issue = fall ? { name: "scavenged rifle", dmg: 22, range: 34, cool: 0.34, gun: true } : { name: "issue carbine", dmg: 20, range: 28, cool: 0.4, gun: true };
var c = (typeof carrying !== "undefined") ? carrying : null;
if (!c)
return issue;
var k = String(c.archetype || ""), W = null;
if (/^bw_/.test(k) && typeof BW_ARMS !== "undefined")
W = BW_ARMS[k.slice(3)];
if (W) {
if (W.splash || W.kind === "throw")
return Object.assign({ refused: W.name }, issue);
if (W.kind === "melee")
return { name: W.name, dmg: W.dmg, reach: W.reach || 2.2, arc: W.arc || 0.9, cool: Math.max(0.2, W.cool || 0.5), melee: true, cleave: !!W.cleave };
if (W.kind === "cone")
return { name: W.name, dmg: W.dmg * 3, reach: W.reach || 7, arc: 0.6, cool: Math.max(0.15, W.cool || 0.15), melee: true, cleave: true };
var gun = /^(bullet|ball)$/.test(W.p || "");
return { name: W.name, dmg: W.dmg, range: W.spd >= 150 ? 60 : W.spd >= 80 ? 40 : 30, cool: Math.max(0.1, W.cool || 0.5), pellets: W.pellets || 1, pierce: W.pierce || 0, gun: gun };
}
var A = (typeof ARMS !== "undefined") ? ARMS[k] : null;
if (!A)
return issue;
if (A.shot === "shot")
return { name: A.name, dmg: k === "pistol" ? 14 : 30, range: k === "pistol" ? 26 : 40, cool: k === "pistol" ? 0.35 : 1.0, gun: true };
var O = THXA_OLD[A.held];
if (!O)
return issue;
if (O[1] === "melee")
return { name: A.name, dmg: O[0], reach: O[2], arc: 0.9, cool: O[3], melee: true };
return { name: A.name, dmg: O[0], range: 30, cool: O[3] };
},
function (figs, L, fall) {
var W = thxWpn(fall), ya = (typeof yaw !== "undefined") ? yaw : 0, pi = (typeof pitch !== "undefined") ? pitch : 0, fx = -Math.sin(ya), fz = -Math.cos(ya);
var list = [];
figs.forEach(function (Fg) {
if (Fg.down)
return;
var dx = Fg.g.position.x - L.x, dz = Fg.g.position.z - L.z, d = Math.sqrt(dx * dx + dz * dz) || 0.01, dot = (dx / d) * fx + (dz / d) * fz;
if (W.melee) {
if (d > W.reach + 0.4 || dot < Math.cos(Math.min(1.4, W.arc)))
return;
}
else {
if (d > W.range)
return;
var need = W.pellets > 1 ? 0.9 : 0.93;
if (dot < need)
return;
}
list.push({ Fg: Fg, d: d });
});
list.sort(function (a, b) { return a.d - b.d; });
var take = W.melee ? (W.cleave ? 3 : 1) : 1 + (W.pierce || 0), out = [], total = 0;
list.slice(0, take).forEach(function (H) {
var Fg = H.Fg, sc = (Fg.kind && Fg.kind.sc) || 1;
var dmg = W.dmg * (W.pellets > 1 ? Math.min(W.pellets, Math.max(1, Math.round(W.pellets * (1 - H.d / W.range)))) : 1) * (0.9 + Math.random() * 0.25), head = false;
if (!W.melee) {
var eh = Math.atan2(1.63 * sc - 1.72, H.d), eb = Math.atan2(1.0 * sc - 1.72, H.d);
if (Math.abs(pi - eh) < Math.abs(pi - eb) && Math.abs(pi - eh) < 0.09) {
head = true;
dmg *= 2;
}
}
dmg = Math.round(dmg);
Fg.hp -= dmg;
total += dmg;
out.push({ Fg: Fg, dmg: dmg, head: head, dead: Fg.hp <= 0 });
if (W.melee && !Fg.down) {
var dx = Fg.g.position.x - L.x, dz = Fg.g.position.z - L.z, dd = Math.hypot(dx, dz) || 1;
Fg.g.position.x += dx / dd * 0.8;
Fg.g.position.z += dz / dd * 0.8;
Fg.last = Math.max(Fg.last || 0, (fall ? THXF.t : THXO.t) - 0.4);
}
});
var msg = "";
if (W.refused)
msg = "💥 No explosives down here: the " + thxEsc(W.refused.toLowerCase()) + " stays slung. You use the " + W.name + ". ";
if (!out.length)
msg += (W.melee ? "🗡️ Nothing in reach of your " + thxEsc(W.name.toLowerCase()) + "." : "🎯 Wide.");
else {
var o = out[0], nm = (o.Fg.kind ? o.Fg.kind.n : "One of them").replace(/^A /, "the ");
msg += (W.melee ? "🗡️ " : "🎯 ") + (o.head ? "<b>Head shot.</b> " : "") + thxEsc(W.name) + " hits " + nm + " (" + o.dmg + ")" + (out.length > 1 ? " and " + (out.length - 1) + " more" : "") +
(o.dead ? ". <b>Down.</b>" : ". " + Math.max(0, Math.round(o.Fg.hp)) + " of " + o.Fg.max + " left in it.");
}
return { W: W, hits: out, cool: W.cool, msg: msg };
},
function (fall) {
var W = thxWpn(fall), hp = (typeof DGR !== "undefined" && DGR) ? Math.round(DGR.hp) : 100, mx = (typeof DGR !== "undefined" && DGR) ? DGR.max : 100;
var col = hp > mx * 0.5 ? "#8FDCA4" : hp > mx * 0.25 ? "#F2D684" : "#F28A84";
return " &nbsp; <span style='color:" + col + "'>❤️ " + hp + "/" + mx + "</span> &nbsp; " + (W.melee ? "🗡️ " : "🔫 ") + thxEsc(W.name);
},
function () {
if (THXG.geo)
return;
THXG.geo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
THXG.mat = new THREE.MeshLambertMaterial({ color: 0x7A0A08 });
THXG.pool = new THREE.CircleGeometry(0.5, 14);
THXG.poolMats = [0x4A0605, 0x5E0806, 0x3A0504].map(function (c) { return new THREE.MeshLambertMaterial({ color: c, transparent: true, opacity: 0.92, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); });
THXG.stain = new THREE.MeshLambertMaterial({ color: 0x5A0807 });
THXG.unit = new THREE.BoxGeometry(1, 1, 1);
},
function (g) {
thxGoreMats();
[[0.22, 0.1, 0.02, 0, 1.52, 0.15], [0.3, 0.26, 0.02, 0.06, 1.12, 0.17], [0.16, 0.12, 0.02, -0.33, 1.0, 0.5], [0.14, 0.1, 0.02, 0.33, 0.95, 0.5], [0.2, 0.3, 0.02, -0.1, 0.5, 0.1]].forEach(function (s) {
var m = new THREE.Mesh(THXG.unit, THXG.stain);
m.scale.set(s[0], s[1], s[2]);
m.position.set(s[3], s[4], s[5]);
m.rotation.z = (Math.random() - 0.5) * 0.6;
g.add(m);
});
},
function (F, x, y, z, n, dirx, dirz) {
if (!F)
return;
thxGoreMats();
var lite = typeof THX !== "undefined" && THX.lite;
n = Math.min(lite ? 8 : 18, n | 0);
for (var i = 0; i < n; i++) {
var m = THXG.drops.length >= (lite ? 40 : 90) ? null : new THREE.Mesh(THXG.geo, THXG.mat);
if (!m)
break;
m.position.set(x, y, z);
m.scale.setScalar(0.6 + Math.random() * 1.2);
F.add(m);
THXG.drops.push({ m: m, F: F, vx: (dirx || 0) * 2 + (Math.random() - 0.5) * 3.2, vy: 1 + Math.random() * 2.6, vz: (dirz || 0) * 2 + (Math.random() - 0.5) * 3.2, life: 1.4 });
}
},
function (F, x, z, r) {
if (!F)
return;
thxGoreMats();
var P = THXG.pools.length >= 70 ? THXG.pools.shift() : null;
if (P && P.F !== F) {
if (P.m.parent)
P.m.parent.remove(P.m);
P = null;
}
var m = P ? P.m : new THREE.Mesh(THXG.pool, THXG.poolMats[(Math.random() * 3) | 0]);
m.rotation.x = -Math.PI / 2;
m.position.set(x, 0.015 + Math.random() * 0.004, z);
m.scale.set(r * (0.8 + Math.random() * 0.5), r * (0.7 + Math.random() * 0.6), 1);
if (!m.parent)
F.add(m);
THXG.pools.push({ m: m, F: F });
},
function (dt) {
for (var i = THXG.drops.length - 1; i >= 0; i--) {
var D = THXG.drops[i];
D.life -= dt;
D.vy -= 9.8 * dt;
D.m.position.x += D.vx * dt;
D.m.position.y += D.vy * dt;
D.m.position.z += D.vz * dt;
if (D.m.position.y <= 0.03 || D.life <= 0) {
if (D.m.position.y <= 0.03 && Math.random() < 0.35)
thxGorePool(D.F, D.m.position.x, D.m.position.z, 0.16 + Math.random() * 0.22);
if (D.m.parent)
D.m.parent.remove(D.m);
THXG.drops.splice(i, 1);
}
}
if (THXG.veil && THXG.veilA > 0) {
THXG.veilA = Math.max(0, THXG.veilA - dt * 0.45);
THXG.veil.style.opacity = String(THXG.veilA);
}
},
function (amount) {
if (!THXG.veil && document.body) {
var v = document.createElement("div");
v.id = "thx-blood";
v.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:40;opacity:0;background:radial-gradient(ellipse at center,rgba(120,0,0,0) 45%,rgba(120,0,0,.55) 78%,rgba(70,0,0,.9) 100%)";
document.body.appendChild(v);
THXG.veil = v;
}
THXG.veilA = Math.min(0.85, THXG.veilA + 0.25 + amount / 40);
if (THXG.veil)
THXG.veil.style.opacity = String(THXG.veilA);
},
function (F, res, L) {
(res.hits || []).forEach(function (h) {
var p = h.Fg.g.position, sc = (h.Fg.kind && h.Fg.kind.sc) || 1, dx = p.x - L.x, dz = p.z - L.z, d = Math.hypot(dx, dz) || 1;
thxGore(F, p.x, (h.head ? 1.63 : 1.1) * sc, p.z, h.dead ? 16 : h.head ? 12 : 6 + Math.min(6, h.dmg / 6), dx / d, dz / d);
if (h.dead)
thxGorePool(F, p.x + dx / d * 0.6, p.z + dz / d * 0.6, 0.9 + Math.random() * 0.4);
});
},
function (parts, par) {
var w = 300, h = par ? 150 : 120, s = "<svg viewBox='0 0 " + w + " " + h + "' width='100%' style='max-width:320px;background:#0B1016;border:1px solid #2A3A48;border-radius:4px;margin:6px 0'>";
var ln = "stroke='#7FD0FF' stroke-width='2' fill='none'", tx = "fill='#E8F0F8' font-size='11' font-family='monospace' text-anchor='middle'";
s += "<rect x='20' y='20' width='260' height='" + (h - 40) + "' " + ln + "/>";
s += "<rect x='8' y='" + (h / 2 - 14) + "' width='24' height='28' fill='#1A2A1A' stroke='#9AF09A'/><text x='20' y='" + (h / 2 + 4) + "' " + tx + ">" + thxEsc(parts.supply) + "</text>";
var top = par ? parts.items.slice(0, 1) : parts.items, n = top.length;
top.forEach(function (p, i) { var x = 60 + (i + 0.5) * (220 / n); s += "<rect x='" + (x - 26) + "' y='10' width='52' height='20' fill='#2A1E10' stroke='#F0C060'/><text x='" + x + "' y='24' " + tx + ">" + thxEsc(p) + "</text>"; });
if (par) {
s += "<line x1='60' y1='20' x2='60' y2='" + (h - 20) + "' " + ln + "/><line x1='240' y1='20' x2='240' y2='" + (h - 20) + "' " + ln + "/>";
var p2 = parts.items[1];
s += "<rect x='124' y='" + (h - 30) + "' width='52' height='20' fill='#2A1E10' stroke='#F0C060'/><text x='150' y='" + (h - 16) + "' " + tx + ">" + thxEsc(p2) + "</text>";
}
if (parts.marks)
parts.marks.forEach(function (m, i) { var x = 60 + (i + 0.5) * (220 / n); s += "<text x='" + x + "' y='48' fill='#FFD27A' font-size='10' font-family='monospace' text-anchor='middle'>" + thxEsc(m) + "</text>"; });
return s + "</svg>";
},
function (kind) {
kind = kind || thxCPick(["ohm", "ohm", "pair", "net", "meter", "logic"]);
if (kind === "ohm") {
var V = thxCPick([12, 24, 24, 48]), I = thxCPick([0.25, 0.5, 1, 2]), coil = thxCPick([4, 6, 8, 12]);
if (V / I - coil <= 0) {
I = 0.5;
}
var R = V / I - coil;
var opts = thxCShuffle([R, V / I, coil, Math.max(1, R * 2)].filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 4));
return { title: "The door's relay will not pull in", svg: thxCSvg({ supply: V + " V", items: ["R = ?", "coil " + coil + " Ω"] }),
q: "The relay coil needs " + I + " A to pull the bolt. The supply is " + V + " V and the coil itself is " + coil + " Ω. Which resistor goes in series with it?",
opts: opts.map(function (v) { return v + " Ω"; }), right: R + " Ω", why: "Ohm's law: the whole loop must be V ÷ I = " + V + " ÷ " + I + " = " + (V / I) + " Ω. The coil is " + coil + " Ω of that, so the resistor is " + (V / I) + " − " + coil + " = " + R + " Ω." };
}
if (kind === "pair") {
var V2 = thxCPick([12, 24]);
return { title: "Two warning lamps, one supply", svg: thxCSvg({ supply: V2 + " V", items: ["lamp " + V2 + " V", "lamp " + V2 + " V"] }, true),
q: "Both lamps are rated " + V2 + " V and both must burn at full brightness from this " + V2 + " V supply, and one failing must not put out the other. How are they wired?",
opts: ["In parallel", "In series", "One of each", "It cannot be done"], right: "In parallel", why: "In parallel each lamp gets the full " + V2 + " V and its own path, so one failing leaves the other lit. In series they would share the voltage (" + (V2 / 2) + " V each, dim) and one failing breaks the loop for both." };
}
if (kind === "net") {
var a = thxCPick([[6, 3, 2], [12, 6, 4], [4, 4, 2], [20, 5, 4], [10, 10, 5], [12, 4, 3]]), rs = thxCPick([1, 2, 4]);
var tot = a[2] + rs;
return { title: "The pump's resistor bank", svg: thxCSvg({ supply: "?", items: [a[0] + " Ω ∥ " + a[1] + " Ω", rs + " Ω"] }),
q: "A " + a[0] + " Ω and a " + a[1] + " Ω resistor sit in parallel, and that pair is in series with " + rs + " Ω. What is the total resistance the controller sees?",
opts: thxCShuffle([tot + " Ω", (a[0] + a[1] + rs) + " Ω", a[2] + " Ω", (a[0] * a[1] / (a[0] + a[1]) + rs * 2) + " Ω"].filter(function (v, i, s2) { return s2.indexOf(v) === i; })), right: tot + " Ω",
why: "Two in parallel: (R1 × R2) ÷ (R1 + R2) = (" + a[0] + " × " + a[1] + ") ÷ " + (a[0] + a[1]) + " = " + a[2] + " Ω. In series you simply add: " + a[2] + " + " + rs + " = " + tot + " Ω." };
}
if (kind === "meter") {
var V3 = thxCPick([12, 24]), names = ["fuse", "switch", "relay coil", "lamp"], bad = (Math.random() * 4) | 0;
var marks = names.map(function (n, i) { return (i === bad ? V3 : 0) + " V"; });
return { title: "Dead loop, and a meter", svg: thxCSvg({ supply: V3 + " V", items: names, marks: marks }),
q: "Nothing in this loop works. With the power on you put the meter across each part in turn and read the voltages shown. Which part is broken?",
opts: names.map(function (n) { return "The " + n; }), right: "The " + names[bad],
why: "In a series loop with a break, no current flows, so no part drops any voltage except the open one: the whole " + V3 + " V appears across the gap. The meter reads " + V3 + " V across the " + names[bad] + ", so that is where the circuit is open." };
}
var st = { P: Math.random() < 0.5, C: Math.random() < 0.5, O: false };
if (st.P && st.C)
st.C = false;
var need = !st.P ? "Power" : "Card reader";
return { title: "The door's interlock", svg: thxCSvg({ supply: "logic", items: ["Power " + (st.P ? "ON" : "OFF"), "Card " + (st.C ? "OK" : "NO"), "Override OFF"] }),
q: "The bolt opens when (Power AND Card) OR Override. Override is locked off by Widow. Power is " + (st.P ? "on" : "off") + " and the card reader says " + (st.C ? "yes" : "no") + ". Which one input do you have to fix?",
opts: thxCShuffle(["Power", "Card reader", "Override", "Nothing, it should open"]), right: need,
why: "With Override off, the door needs Power AND Card both true. " + (st.P ? "Power is on, so the card reader is the one to fix." : "Power is off, and AND needs both, so the power comes first.") };
},
function (title, done, kind) {
if (typeof worldCard !== "function")
return;
var P = thxCMake(kind);
THXB.puzzle = P;
var h = worldFacts("⚡ " + title, P.title, [], []) + P.svg + "<div style='margin:4px 0 8px;color:#E8F0F8'>" + thxEsc(P.q) + "</div>", fns = {};
P.opts.forEach(function (o, i) {
h += worldBtn("c" + i, thxEsc(o), "");
fns["c" + i] = function () {
if (o === P.right) {
worldCard(null);
THXB.puzzle = null;
thxSay("⚡ <b>Fixed.</b> " + thxEsc(P.why));
if (typeof playTone === "function")
try {
playTone(660, 0.12);
}
catch (e) { }
done();
}
else {
thxCJolt();
thxSay("⚡ <b>Wrong. It bites back.</b> " + thxEsc(P.why));
setTimeout(function () { thxCPanel(title, done, kind); }, 900);
}
};
});
h += worldBtn("x", "Leave it", "the fault stays");
fns.x = function () { worldCard(null); THXB.puzzle = null; };
worldCard(h, fns);
},
function () {
var ds = THXO.doors.slice();
thxCShuffle(ds);
THXO.doors.forEach(function (D) { D.fault = false; if (D.spark)
D.spark.visible = false; });
ds.slice(0, THXC_FAULTY).forEach(function (D) {
D.fault = true;
if (!D.spark) {
D.spark = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.5, 0.12), new THREE.MeshLambertMaterial({ color: 0x2A2E34, emissive: 0xFF7A10, emissiveIntensity: 0.6 }));
D.spark.position.set(D.x + (D.horiz ? 2.6 : 0.3), 1.4, D.z + (D.horiz ? 0.3 : 2.6));
THXO.F.add(D.spark);
}
D.spark.visible = true;
});
},
function () {
var cx = THXB.CX, cz = THXB.CZ, W = THXB.W, D = THXB.D, H = 4.4;
THXB.breakers = [];
THXB.lights = [];
THXB.on = false;
THXB.stopped = 0;
THXB.escaped = false;
var wall = thxOutMat(0x14161C, null), floor = thxOutMat(0x0C0D11, null), rack = thxOutMat(0x1C2028, "metal"), red = thxOutMat(0xFF2018, null);
thxOutBox(W, 0.1, D, floor, cx, -0.05, cz);
thxOutBox(W, 0.1, D, wall, cx, H, cz);
[[cx, cz - D / 2, W, 1], [cx, cz + D / 2, W, 1], [cx - W / 2, cz, D, 0], [cx + W / 2, cz, D, 0]].forEach(function (S) {
if (S[3]) {
thxOutBox(S[2], H, 0.3, wall, S[0], H / 2, S[1]);
thxOutSolid(S[0], S[1], S[2] / 2, 0.15);
}
else {
thxOutBox(0.3, H, S[2], wall, S[0], H / 2, S[1]);
thxOutSolid(S[0], S[1], 0.15, S[2] / 2);
}
});
for (var r = 0; r < 3; r++)
for (var i = 0; i < 4; i++) {
var x = cx - 8 + i * 5.4, z = cz - 5 + r * 5;
thxOutBox(1.2, 2.6, 0.8, rack, x, 1.3, z);
thxOutBox(0.06, 2.2, 0.02, red, x - 0.3, 1.3, z + 0.41);
thxOutSolid(x, z, 0.6, 0.4);
}
var eye = new THREE.Mesh(new THREE.SphereGeometry(0.9, 20, 14), new THREE.MeshBasicMaterial({ color: 0xFF1A10 }));
eye.position.set(cx, 2.4, cz - D / 2 + 0.6);
THXO.F.add(eye);
THXB.eye = eye;
[[-6, -3], [6, -3], [0, 4]].forEach(function (p) { var s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: 0xFF3020 })); s.position.set(cx + p[0], H - 0.3, cz + p[1]); THXO.F.add(s); THXB.lights.push(s); });
if (!THX.lite)
[[-6, 0], [6, 0]].forEach(function (p) { var pl = new THREE.PointLight(0xFF2A18, 0, 24, 2); pl.position.set(cx + p[0], H - 0.4, cz + p[1]); THXO.F.add(pl); THXB.lights.push(pl); });
[[-W / 2 + 0.5, -4, "I"], [W / 2 - 0.5, -4, "II"], [-W / 2 + 0.5, 6, "III"]].forEach(function (p, i) {
var b = thxOutBox(0.3, 1.4, 1.0, thxOutMat(0x3A3F48, "metal"), cx + p[0], 1.4, cz + p[1]), lamp = thxOutBox(0.32, 0.2, 0.2, red, cx + p[0], 2.25, cz + p[1]);
var B = { i: i, name: p[2], done: false, lamp: lamp };
THXB.breakers.push(B);
thxOutSpot(cx + p[0] + (p[0] < 0 ? 1 : -1), cz + p[1], 2.2, "⚡ Her breaker " + p[2], "cut her power", function () { thxBlackBreaker(B); });
});
var pad = new THREE.Mesh(new THREE.CircleGeometry(1.6, 24), new THREE.MeshBasicMaterial({ color: 0x601010 }));
pad.rotation.x = -Math.PI / 2;
pad.position.set(cx + W / 2 - 3, 0.03, cz + D / 2 - 3);
THXO.F.add(pad);
THXB.lift = pad;
thxOutSpot(cx + W / 2 - 3, cz + D / 2 - 3, 2.2, "🛗 The service lift", "up, if she is stopped", function () { thxBlackLift(); });
THXB.built = true;
},
function () {
if (THXB.on || THXO.done)
return;
THXB.on = true;
THXB.stopped = 0;
THXB.escaped = false;
THXB.sentT = 3;
THXB.breakers.forEach(function (B) { B.done = false; B.lamp.material = thxOutMat(0xFF2018, null); });
THXB.lights.forEach(function (l) { if (l.isLight)
l.intensity = 1.1;
else
l.visible = true; });
if (THXB.lift)
THXB.lift.material.color.setHex(0x601010);
THXO.finalAt = THXO.t + 150;
THXO.black = true;
if (typeof thxWidowSay === "function")
thxWidowSay("No. I asked, and I warned, and you were slow. I will not let this reach my city, and I will not let you carry it there either. You are coming down to me.");
setTimeout(function () {
if (THXO.done)
return;
camera.position.set(THXO.base + THXB.CX, 1.7, THXB.CZ + THXB.D / 2 - 2.5);
yaw = 0;
pitch = 0;
if (typeof thxGoreBitten === "function")
thxGoreBitten(10);
thxSay("🕷️ <b>THE BLACK WIDOW.</b> The floor gave way. You are in her Core. Cut her three breakers, then get to the service lift before she floods it all.");
if (typeof thxWidowSay === "function")
thxWidowSay("This is mine. Everything you can see is me. The final measure is running, and you are inside it.");
var n = thxKeeper() ? 0 : (THX.lite ? 3 : 5);
for (var i = 0; i < n; i++)
thxOutFig(THXB.CX - 8 + Math.random() * 16, THXB.CZ - 8 + Math.random() * 6, 1.0 + Math.random() * 0.3);
THXO.left = THXO.figs.filter(function (F) { return !F.down; }).length;
}, 1800);
},
function (B) {
if (!THXB.on) {
thxSay("The breaker is cold. She is not awake in here.");
return;
}
if (B.done) {
thxSay("Breaker " + B.name + " is already thrown.");
return;
}
thxCPanel("Her breaker " + B.name, function () {
B.done = true;
B.lamp.material = thxOutMat(0x2A2E34, null);
var left = THXB.breakers.filter(function (x) { return !x.done; }).length;
if (typeof thxWidowSay === "function")
thxWidowSay(left ? "Stop that. " + left + " more and I am blind for a moment, and a moment is all you will get." : "…");
if (!left)
thxBlackStopped();
});
},
function () {
THXB.stopped = THXO.t + 40;
THXB.lights.forEach(function (l) { if (l.isLight)
l.intensity = 0.15;
else
l.visible = false; });
if (THXB.eye)
THXB.eye.material.color.setHex(0x3A0806);
if (THXB.lift)
THXB.lift.material.color.setHex(0x20A040);
thxSay("⚡ <b>She is down.</b> Forty seconds. The service lift has power: go.");
},
function () {
if (!THXB.on) {
thxSay("The lift is dead.");
return;
}
if (!(THXB.stopped > THXO.t)) {
thxSay("🛗 She holds the lift. " + (THXB.stopped ? "She is back. Throw her breakers again." : "Cut her three breakers first."));
return;
}
THXB.escaped = true;
THXB.on = false;
camera.position.set(THXO.base, 1.7, 32);
yaw = 0;
pitch = 0;
THXO.figs.forEach(function (F) { if (!F.down && Math.abs(F.g.position.z - THXB.CZ) < THXB.D / 2) {
F.down = true;
if (F.g.parent)
F.g.parent.remove(F.g);
} });
THXO.finalAt = Math.min(THXO.finalAt || THXO.t + 6, THXO.t + 6);
thxSay("🛗 <b>Out.</b> You come up at Receiving with the sector shaking under you. She is awake again, and finishing it.");
if (typeof thxWidowSay === "function")
thxWidowSay("You got out of me. Nobody gets out of me. …Stay in Receiving. I am finishing this now.");
},
function (dt) {
if (!THXB.on || THXO.done)
return;
if (THXB.stopped && THXO.t > THXB.stopped) {
THXB.stopped = 0;
THXB.breakers.forEach(function (B) { B.done = false; B.lamp.material = thxOutMat(0xFF2018, null); });
THXB.lights.forEach(function (l) { if (l.isLight)
l.intensity = 1.1;
else
l.visible = true; });
if (THXB.eye)
THXB.eye.material.color.setHex(0xFF1A10);
if (THXB.lift)
THXB.lift.material.color.setHex(0x601010);
if (typeof thxWidowSay === "function")
thxWidowSay("I am back. You wasted it.");
thxSay("🕷️ <b>She is back.</b> Her breakers are live again.");
}
if (THXB.stopped > THXO.t || !thxBlackIn())
return;
THXB.sentT -= dt;
if (THXB.sentT <= 0) {
THXB.sentT = 2.2 + Math.random() * 0.8;
if (!THXB.puzzle && typeof thxHarm === "function")
thxHarm(5, "Her sentry");
}
},
function () {
var left = THXB.breakers.filter(function (B) { return !B.done; }).length;
return "<b style='color:#FF4030'>🕷️ BLACK WIDOW</b> &nbsp; ☠️ " + Math.max(0, Math.ceil(THXO.finalAt - THXO.t)) + "s &nbsp; ⚡ breakers " + (3 - left) + "/3" +
(THXB.stopped > THXO.t ? " &nbsp; <b>she is down " + Math.ceil(THXB.stopped - THXO.t) + "s · the lift!</b>" : "");
},
function (I) {
var g = new THREE.Group();
g.name = "thx-lobby";
I.root.add(g);
var lx = I.W / 2 - 1.2, lz = -2, steel = new THREE.MeshStandardMaterial({ color: 0xB8BEC6, roughness: 0.35, metalness: 0.6 }), dark = new THREE.MeshStandardMaterial({ color: 0x1A1E24, roughness: 0.5 }), glow = new THREE.MeshBasicMaterial({ color: 0x4AE8FF });
for (var i = -1; i <= 1; i++) {
var dz = lz + i * 2.8;
var frame = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.0, 2.2), dark);
frame.position.set(lx, 1.5, dz);
g.add(frame);
var doors = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 1.8), steel);
doors.position.set(lx - 0.18, 1.25, dz);
g.add(doors);
var seam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.5, 0.03), glow);
seam.position.set(lx - 0.23, 1.25, dz);
g.add(seam);
var lamp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.5), glow);
lamp.position.set(lx - 0.23, 2.75, dz);
g.add(lamp);
if (I.walls)
I.walls.push({ x: I.ox + lx, z: I.oz + dz, rot: 0, hw: 0.2, hd: 1.1, h: 3.0, level: 0 });
}
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 160;
var c = cv.getContext("2d");
c.fillStyle = "#0C1420";
c.fillRect(0, 0, 512, 160);
c.fillStyle = "#4AE8FF";
c.font = "bold 44px sans-serif";
c.textAlign = "center";
c.fillText("THE HELIX LIFTS", 256, 54);
c.fillStyle = "#DDE6F0";
c.font = "24px sans-serif";
c.fillText("every floor, up and down", 256, 92);
c.fillText("your card decides which", 256, 124);
var sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv) }));
sign.position.set(lx - 0.26, 3.3, lz);
sign.rotation.y = -Math.PI / 2;
g.add(sign);
for (var h = 0; h < 26; h++) {
var a = h / 26 * Math.PI * 4, bead = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: h % 2 ? 0x4AE8FF : 0xC050FF }));
bead.position.set(lx - 0.3, 0.3 + h * 0.14, lz + Math.sin(a) * 0.5);
g.add(bead);
}
var dx = I.W / 2 - 3.4, dz2 = lz + 5.4;
var desk = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.05, 0.8), new THREE.MeshStandardMaterial({ color: 0x2A2E36, roughness: 0.5 }));
desk.position.set(dx, 0.52, dz2);
g.add(desk);
var slab = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.06, 0.9), steel);
slab.position.set(dx, 1.08, dz2);
g.add(slab);
var cv2 = document.createElement("canvas");
cv2.width = 384;
cv2.height = 120;
var c2 = cv2.getContext("2d");
c2.fillStyle = "#0E1622";
c2.fillRect(0, 0, 384, 120);
c2.fillStyle = "#FFD24A";
c2.font = "bold 30px sans-serif";
c2.textAlign = "center";
c2.fillText("SECURITY & CARDS", 192, 46);
c2.fillStyle = "#DDE6F0";
c2.font = "20px sans-serif";
c2.fillText("read your own card here", 192, 84);
var sign2 = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.56), new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv2) }));
sign2.position.set(dx, 2.0, dz2 - 0.45);
g.add(sign2);
if (I.walls)
I.walls.push({ x: I.ox + dx, z: I.oz + dz2, rot: 0, hw: 1.35, hd: 0.45, h: 1.1, level: 0 });
var wx = I.W / 2 - 1.4, wz = lz + 8.2;
var panel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 1.0), new THREE.MeshStandardMaterial({ color: 0x14101C, roughness: 0.45 }));
panel.position.set(wx, 1.7, wz);
g.add(panel);
var cv3 = document.createElement("canvas");
cv3.width = 200;
cv3.height = 260;
thxWebDraw(cv3.getContext("2d"), 200, 260);
var web = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.15), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv3) }));
web.position.set(wx - 0.06, 1.7, wz);
web.rotation.y = -Math.PI / 2;
g.add(web);
if (I.walls)
I.walls.push({ x: I.ox + wx, z: I.oz + wz, rot: 0, hw: 0.12, hd: 0.55, h: 2.4, level: 0 });
I.thx = { lift: { x: lx - 1.6, z: lz }, card: { x: dx, z: dz2 + 1.2 }, widow: { x: wx - 1.3, z: wz } };
THXL.put = { x: lx - 2.2, z: lz };
},
function () {
if (typeof INT === "undefined" || !INT || !INT.thx) {
if (typeof worldHome === "function")
worldHome("You step out of the Tower's lifts.");
return;
}
var p = THXL.put || { x: 0, z: 0 };
if (typeof camera !== "undefined") {
camera.position.set(INT.ox + p.x, (INT.oy || 0) + 1.72, INT.oz + p.z);
if (typeof yaw !== "undefined")
yaw = Math.PI / 2;
}
thxSay("🛗 The Helix lifts open on the Tower's lobby.");
},
function () {
var lv = thxLevel();
thxCardFetch(true);
var rows = THX_FLOORS.map(function (r) { var need = thxFloorLv(r[0]); return [r[1] + " · " + r[2], (lv >= need ? "open to you" : "needs level " + need) + (thxFloorOn(r[0]) ? "" : " · closed today")]; });
worldCard(thxCardHtml() + worldFacts("🪪 Your card", "Level " + lv + ", " + thxLvName(lv) + (THX.from ? " · " + THX.from : ""), rows, ["A card comes with the work you do in the Tower, or from the Keeper's own hand. Ask WHITE WIDOW and she will tell you what yours opens."]) +
worldBtn("w", "🕸️ Ask WHITE WIDOW", "") + worldBtn("lift", "🛗 The lifts", ""), { w: function () { thxWidowOpen("What does my card open?"); }, lift: function () { thxDirectory(); } });
},
function () {
if (thxKeeper())
return "";
if (!thxFallOn())
return "The Keeper has the Fall closed.";
if (!thxSigned())
return "Sign in first: the Fall keeps your camp between visits.";
if (typeof ageAdult === "function" && !ageAdult())
return "The Fall is for adults.";
if (typeof flkOn === "function" && flkOn())
return "The family lock is on, and it keeps this one shut.";
if (!thxMember())
return "The Fall is for dreamers who pay their dues.";
return "";
},
function (G) {
THXF.solids = [];
THXF.spots = [];
THXF.figs = [];
THXF.fx = [];
THXF.fires = [];
THXF.people = [];
THXF.loot = [];
THXF.phase = "day";
THXF.clock = 0;
THXF.wave = 0;
THXF.left = 0;
THXF.t = 0;
THXF.built = true;
var F = new THREE.Group();
G.add(F);
THXF.F = F;
var gm = new THREE.MeshLambertMaterial({ color: 0xB8AEA0, map: thxFallGroundTex() });
var ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), gm.map ? gm : thxFallMat(0x8A7A64, "concrete"));
ground.rotation.x = -Math.PI / 2;
F.add(ground);
thxFallRubble(F);
var tw = thxFallBox(22, 150, 22, thxFallMat(0x1C2026, null), 0, 75, -150);
for (var w = 0; w < 10; w++)
thxFallBox(1.4, 1.0, 0.2, thxFallMat(0xC89A3A, null), -8 + ((w * 7) % 17), 18 + w * 13, -138.9);
thxFallSolid(0, -150, 11, 11);
var R0 = Math.random;
for (var i = 0; i < (THX.lite ? 16 : 30); i++) {
var a = i / (THX.lite ? 16 : 30) * Math.PI * 2 + 0.3, r = 70 + ((i * 37) % 55), x = Math.cos(a) * r, z = Math.sin(a) * r;
var h = 8 + ((i * 13) % 26), w2 = 9 + ((i * 7) % 10), d2 = 9 + ((i * 11) % 10), ry = (i % 5) * 0.21;
thxFallRuin(x, z, w2, h, d2, ry, i);
thxFallSolid(x, z, w2 / 2, d2 / 2, ry);
if (i % 4 === 0)
thxFallFire(x + w2 * 0.7, z, 0.7);
}
for (var v = 0; v < (THX.lite ? 8 : 16); v++) {
var av = v / (THX.lite ? 8 : 16) * Math.PI * 2, rv = 40 + ((v * 23) % 28), vx = Math.cos(av) * rv, vz = Math.sin(av) * rv;
thxFallBox(4.2, 1.5, 2.0, thxFallMat(0x2E2A28, "metal"), vx, 0.75, vz, av);
thxFallSolid(vx, vz, 2.1, 1.1, av);
}
thxFallCamp();
thxFallApron();
thxFallLootPlace();
thxFallPeople();
if (typeof thxRiseBuild === "function")
thxRiseBuild();
if (typeof thxWidowSay === "function")
setTimeout(function () { thxFallRadio(true); }, 2500);
},
function () {
if (THXF.gtex)
return THXF.gtex;
if (typeof document === "undefined")
return null;
var N = THX.lite ? 256 : 512, s = N / 512, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
if (!x)
return null;
var sd = 11;
function r() { sd = (sd * 16807) % 2147483647; return (sd & 0xffff) / 65536; }
x.fillStyle = "#5E5A55";
x.fillRect(0, 0, N, N);
for (var i = 0; i < N * N / 9; i++) {
var v = 60 + r() * 90 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 3) + "," + (v - 6) + ",0.35)";
x.fillRect(r() * N, r() * N, 1.4 * s, 1.4 * s);
}
for (var b = 0; b < 26; b++) {
var g = x.createRadialGradient(0, 0, 0, 0, 0, 1);
var bx = r() * N, by = r() * N, br = (20 + r() * 70) * s, tone = r();
var gr = x.createRadialGradient(bx, by, 0, bx, by, br);
gr.addColorStop(0, tone < 0.4 ? "rgba(30,28,26,0.35)" : tone < 0.75 ? "rgba(150,140,124,0.30)" : "rgba(110,96,70,0.30)");
gr.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = gr;
x.fillRect(bx - br, by - br, br * 2, br * 2);
}
for (var p = 0; p < 4; p++) {
x.fillStyle = "rgba(40,38,36,0.35)";
x.fillRect(r() * N, r() * N, (40 + r() * 80) * s, (30 + r() * 60) * s);
}
for (var k = 0; k < 22; k++) {
var px = r() * N, py = r() * N, a = r() * 6.28;
x.strokeStyle = "rgba(22,20,18,0.85)";
x.lineWidth = (1 + r() * 1.6) * s;
x.beginPath();
x.moveTo(px, py);
for (var q = 0; q < 10; q++) {
a += (r() - 0.5) * 1.1;
px += Math.cos(a) * 14 * s;
py += Math.sin(a) * 14 * s;
x.lineTo(px, py);
if (r() < 0.35) {
x.save();
x.fillStyle = "rgba(" + (70 + r() * 40 | 0) + "," + (90 + r() * 40 | 0) + ",40,0.8)";
for (var w = 0; w < 5; w++)
x.fillRect(px + (r() - 0.5) * 8 * s, py + (r() - 0.5) * 8 * s, 2 * s, 2 * s);
x.restore();
}
}
x.stroke();
}
for (var h = 0; h < 5; h++) {
var hx = r() * N, hy = r() * N, hr = (8 + r() * 16) * s;
x.fillStyle = "rgba(26,24,22,0.9)";
x.beginPath();
for (var e = 0; e < 12; e++) {
var ea = e / 12 * 6.28, er = hr * (0.7 + r() * 0.5);
x.lineTo(hx + Math.cos(ea) * er, hy + Math.sin(ea) * er * 0.8);
}
x.closePath();
x.fill();
x.strokeStyle = "rgba(140,132,120,0.6)";
x.lineWidth = 1.5 * s;
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(25, 25);
try {
t.anisotropy = Math.min(THX.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
THXF.gtex = t;
return t;
},
function (F) {
var n = THX.lite ? 260 : 900, geo = new THREE.DodecahedronGeometry(0.5, 0), mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
var im = new THREE.InstancedMesh(geo, mat, n), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), P = new THREE.Vector3(), Sc = new THREE.Vector3(), C = new THREE.Color();
var cols = [0x6E665C, 0x7E766A, 0x5A524A, 0x7A4A3A, 0x8A8278, 0x4A4642], sd = 5;
function r() { sd = (sd * 16807) % 2147483647; return (sd & 0xffff) / 65536; }
for (var i = 0; i < n; i++) {
var a = r() * 6.283, d = 20 + Math.pow(r(), 0.7) * 150;
if (r() < 0.5)
d = 60 + r() * 80;
var x = Math.cos(a) * d, z = Math.sin(a) * d, sz = 0.15 + Math.pow(r(), 3) * 1.1;
P.set(x, sz * 0.25, z);
E.set(r() * 3, r() * 3, r() * 3);
Q.setFromEuler(E);
Sc.set(sz * (0.8 + r() * 0.8), sz * (0.4 + r() * 0.5), sz * (0.8 + r() * 0.6));
M.compose(P, Q, Sc);
im.setMatrixAt(i, M);
C.setHex(cols[(r() * cols.length) | 0]);
im.setColorAt(i, C);
}
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.name = "fall-rubble";
F.add(im);
},
function (x, z, s) {
var g = new THREE.Group();
g.position.set(x, 0, z);
THXF.F.add(g);
var core = new THREE.Mesh(new THREE.ConeGeometry(0.5 * s, 1.5 * s, 8), new THREE.MeshBasicMaterial({ color: 0xE06A20, transparent: true, opacity: 0.85 }));
core.position.y = 0.75 * s;
g.add(core);
var near = Math.hypot(x, z) < 26, glow = null;
if (near && (!THX.lite || THXF.fires.length < 2)) {
glow = new THREE.PointLight(0xE07828, 0.95, 16 * s, 2);
glow.position.y = 1.1 * s;
g.add(glow);
}
THXF.fires.push({ g: g, core: core, glow: glow, p: Math.random() * 6, s: s });
return g;
},
function () {
var C = { x: 0, z: 0, r: 17 };
THXF.camp = C;
var postM = thxFallMat(0x6A5A46, "wood"), plateM = thxFallMat(0x7A7A80, "metal");
var N = 40, step = Math.PI * 2 / N, span = C.r * step * 1.08;
for (var i = 0; i < N; i++) {
var a = i * step;
if (a > 2.72 && a < 3.56)
continue;
var x = Math.cos(a) * C.r, z = Math.sin(a) * C.r;
thxFallBox(0.3, 2.7, span, (i % 3) ? plateM : postM, x, 1.35, z, -a);
thxFallBox(0.42, 3.1, 0.42, postM, Math.cos(a + step / 2) * C.r, 1.55, Math.sin(a + step / 2) * C.r, 0);
if (!THX.lite && i % 2 === 0) {
for (var sb = 0; sb < 2; sb++)
thxFallBox(0.9, 0.3, 0.6, thxFallMat(0x6A6250, null), Math.cos(a) * (C.r - 0.7), 0.15 + sb * 0.3, Math.sin(a) * (C.r - 0.7), -a);
}
thxFallBox(0.1, 0.08, span, thxFallMat(0x8A8A90, "metal"), x, 2.86, z, -a);
thxFallSolid(x, z, 1.0, 1.0);
}
THXF.gate = { x: Math.cos(Math.PI) * C.r, z: Math.sin(Math.PI) * C.r };
thxFallBox(0.35, 2.7, 2.6, plateM, -C.r + 0.4, 1.35, -2.4, 0.3);
thxFallBox(0.35, 2.7, 2.6, plateM, -C.r + 0.4, 1.35, 2.4, -0.3);
thxFallBox(0.5, 0.5, 0.5, thxFallMat(0x2A2E34, "metal"), -C.r, 3.3, 0, 0);
var gl = new THREE.PointLight(0xFFD9A0, 0.8, 18, 2);
gl.position.set(-C.r + 1, 3.1, 0);
THXF.F.add(gl);
thxFallFire(0, 2, 1.4);
for (var st = 0; st < 10; st++) {
var sa = st / 10 * Math.PI * 2;
thxFallBox(0.5, 0.3, 0.5, thxFallMat(0x5A564E, "concrete"), Math.cos(sa) * 1.7, 0.15, 2 + Math.sin(sa) * 1.7, sa);
}
thxFallCampKit();
thxFallBox(2.4, 1.0, 1.6, thxFallMat(0x5A4A3A, "wood"), 6, 0.5, -4);
thxFallSolid(6, -4, 1.2, 0.8);
thxFallSpot(6, -2.2, 2.6, "📦 The stores", "food, water, medicine, rounds", function () { thxFallStoresCard(); });
thxFallBox(1.0, 1.2, 0.8, thxFallMat(0x3A4450, "metal"), -6, 0.6, -4);
thxFallSolid(-6, -4, 0.5, 0.4);
thxFallSpot(-6, -2.4, 2.6, "📻 The radio", "listen for anything still transmitting", function () { thxFallRadio(); });
thxFallSpot(0, 6, 3.0, "🛠️ The fence", "mend it with what you have brought back", function () { thxFallFenceCard(); });
thxFallSpot(-2, -7, 2.6, "🛏️ Your bunk", "sleep, and wake in your own bed", "");
THXF.spots[THXF.spots.length - 1].fn = function () { thxFallWakeCard(); };
for (var b = 0; b < 4; b++) {
thxFallBox(1.0, 0.5, 2.2, thxFallMat(0x4A4440, null), -8 + b * 2.4, 0.25, -8);
}
},
function () {
var con = thxFallMat(0x7A7268, "concrete"), met = thxFallMat(0x5A5A60, "metal"), dark = thxFallMat(0x3A3A40, null);
var n = THX.lite ? 14 : 30;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + 0.21, r = 21 + ((i * 13) % 17), x = Math.cos(a) * r, z = Math.sin(a) * r, k = i % 5, s2 = 0.7 + ((i * 7) % 4) * 0.35;
if (k === 0) {
for (var b = 0; b < 3; b++)
thxFallBox(s2 * 1.4, s2 * 0.6, s2 * 1.1, con, x + b * 0.5, s2 * 0.3 + b * 0.25, z - b * 0.4, a + b);
thxFallSolid(x, z, 1.2, 1.0);
}
else if (k === 1) {
var pole = thxFallBox(0.16, 5.5, 0.16, met, x, 2.75, z, 0);
pole.rotation.z = 0.12;
thxFallBox(1.2, 0.18, 0.3, met, x + 0.8, 5.3, z, 0);
thxFallSolid(x, z, 0.3, 0.3);
}
else if (k === 2) {
thxFallBox(3.2, 1.1, 0.4, thxFallMat(0x6A5A46, "wood"), x, 0.55, z, a);
thxFallBox(3.2, 0.12, 0.3, met, x, 1.2, z, a);
thxFallSolid(x, z, 1.6, 0.4);
}
else if (k === 3) {
thxFallBox(0.4, 0.02, 3.0, thxFallMat(0x9A9388, null), x, 0.02, z, a);
}
else {
thxFallBox(0.6, 0.7, 0.6, thxFallMat([0x6A4A3A, 0x4A5A6A, 0x6A6A5A][i % 3], "wood"), x, 0.35, z, a);
}
}
var bx = -26, bz = 6;
var bus = new THREE.Group();
bus.position.set(bx, 0, bz);
bus.rotation.y = 0.5;
bus.rotation.z = 1.5;
THXF.F.add(bus);
thxFallBox(11, 3.0, 2.6, thxFallMat(0x7A6A4A, "metal"), 0, 1.5, 0, 0, bus);
for (var w = 0; w < 5; w++)
thxFallBox(1.4, 1.0, 0.1, dark, -4 + w * 2, 2.1, 1.35, 0, bus);
thxFallSolid(bx, bz, 2.0, 5.0);
},
function (x, z, w, h, d, ry, i) {
var body = thxFallMat([0x6A6258, 0x746C60, 0x5E564E][i % 3], "concrete");
thxFallBox(w, h, d, body, x, h / 2, z, ry);
var th = 2 + ((i * 5) % 4);
thxFallBox(w * 0.62, th, d * 0.7, body, x + w * 0.12, h + th / 2 - 0.4, z - d * 0.1, ry + 0.08);
if (THX.lite)
return;
var rows = Math.max(2, Math.floor(h / 3.6)), cols = Math.max(2, Math.floor(w / 3.2));
var dark = thxFallMat(0x16130F, null), glass = thxFallMat(0x3A4450, null);
for (var r = 0; r < rows; r++)
for (var c = 0; c < cols; c++) {
if ((r * 7 + c * 3 + i) % 4 === 0)
continue;
var lx = -w / 2 + w * (c + 0.5) / cols, ly = 1.6 + r * 3.4, lit = ((r * 3 + c + i) % 7 === 0);
if (ly > h - 1.2)
continue;
var m = lit ? glass : dark;
thxFallBox(w / cols * 0.52, 1.5, 0.18, m, x + Math.cos(ry) * lx, ly, z - Math.sin(ry) * lx + (d / 2 + 0.05) * Math.cos(ry), ry);
thxFallBox(0.18, 1.5, d / cols * 0.52, m, x + (w / 2 + 0.05) * Math.cos(ry), ly, z + (w / 2 + 0.05) * -Math.sin(ry) + lx * 0.0, ry);
}
for (var p = 0; p < 4; p++) {
var pa = ry + 0.9 + p * 0.7, pr = w * 0.6 + p * 0.5, s2 = 0.6 + ((i + p) % 3) * 0.5;
thxFallBox(s2 * 1.6, s2 * 0.7, s2 * 1.3, thxFallMat(0x5A544C, "concrete"), x + Math.cos(pa) * pr, s2 * 0.35, z + Math.sin(pa) * pr, pa);
if (s2 > 1)
thxFallSolid(x + Math.cos(pa) * pr, z + Math.sin(pa) * pr, s2 * 0.8, s2 * 0.65, pa);
}
for (var b = 0; b < 3; b++) {
var bx = x - w / 2 + w * (b + 0.5) / 3;
var rb = thxFallBox(0.07, 1.4, 0.07, thxFallMat(0x7A5A3A, "metal"), bx, h + th - 0.3, z, ry);
rb.rotation.z = 0.3 - b * 0.3;
}
},
function () {
var canvas = thxFallMat(0x6A6A58, null), wood = thxFallMat(0x6A5A46, "wood"), metal = thxFallMat(0x7A7A80, "metal");
[[-9, 4, 0.4], [9, 5, -0.5], [-4, 10, 2.6]].forEach(function (T, i) {
var g = new THREE.Group();
g.position.set(T[0], 0, T[1]);
g.rotation.y = T[2];
THXF.F.add(g);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 2.0, 3.4, 3, 1, false), canvas);
roof.rotation.z = Math.PI / 2;
roof.position.y = 1.0;
g.add(roof);
thxFallSolid(T[0], T[1], 1.8, 1.2);
});
var butt = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.5, 16), thxFallMat(0x4A5A6A, "metal"));
butt.position.set(5, 1.0, 5.5);
THXF.F.add(butt);
[0.45, 1.0, 1.5].forEach(function (hy) {
var hp = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.05, 6, 16), metal);
hp.rotation.x = Math.PI / 2;
hp.position.set(5, hy, 5.5);
THXF.F.add(hp);
});
thxFallBox(0.1, 0.2, 0.1, metal, 5, 0.35, 4.7);
[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(function (l) { thxFallBox(0.12, 0.3, 0.12, wood, 5 + l[0], 0.15, 5.5 + l[1]); });
var pail = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.3, 10), metal);
pail.position.set(5.9, 0.15, 4.6);
THXF.F.add(pail);
thxFallSolid(5, 5.5, 0.85, 0.85);
for (var c = 0; c < 5; c++)
thxFallBox(0.9, 0.7, 0.9, wood, -3 - c % 3, 0.35 + (c > 2 ? 0.7 : 0), 6 + Math.floor(c / 3) * 1.1);
var pot = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.42, 0.5, 12), metal);
pot.position.set(0, 1.1, 2);
THXF.F.add(pot);
[[-0.6, -0.5], [0.6, -0.5], [0, 0.7]].forEach(function (l) { var p = thxFallBox(0.08, 1.9, 0.08, metal, l[0], 0.95, 2 + l[1]); p.rotation.x = l[1] * 0.2; p.rotation.z = -l[0] * 0.2; });
if (!THX.lite) {
thxFallBox(0.12, 2.4, 0.12, wood, -11, 1.2, -2);
thxFallBox(0.12, 2.4, 0.12, wood, -11, 1.2, 6);
thxFallBox(0.05, 0.04, 8, thxFallMat(0x9A9A8A, null), -11, 2.3, 2);
[[-11, 0], [-11, 2.2], [-11, 4.4]].forEach(function (w, i) {
thxFallBox(0.06, 0.7, 0.6, thxFallMat([0x8A5A5A, 0x5A6A8A, 0x7A7A6A][i], null), w[0], 1.9, -1 + w[1]);
});
}
var tx = -12, tz = -7;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (l) { thxFallBox(0.2, 5.0, 0.2, wood, tx + l[0], 2.5, tz + l[1]); });
thxFallBox(2.6, 0.2, 2.6, wood, tx, 5.0, tz);
thxFallBox(2.6, 1.0, 0.15, wood, tx, 5.6, tz + 1.3);
thxFallBox(2.6, 1.0, 0.15, wood, tx, 5.6, tz - 1.3);
thxFallSolid(tx, tz, 1.3, 1.3);
var lamp = new THREE.PointLight(0xFFE0B0, 0.9, 26, 2);
lamp.position.set(tx, 5.6, tz);
THXF.F.add(lamp);
thxFallBox(0.4, 0.4, 0.4, thxFallMat(0x2A2E34, "metal"), tx, 5.5, tz);
[[10, -8], [-8, -10]].forEach(function (b) {
var dr = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 1.0, 12), thxFallMat(0x5A3A2A, "metal"));
dr.position.set(b[0], 0.5, b[1]);
THXF.F.add(dr);
thxFallFire(b[0], b[1], 0.6);
thxFallSolid(b[0], b[1], 0.55, 0.55);
});
},
function () {
THXF.loot = [];
var kinds = [["🥫 A kitchen, half standing", "food"], ["🚰 A burst main", "water"], ["💊 A clinic cupboard", "med"],
["🔩 A hardware unit", "fence"], ["🎯 A guard post", "ammo"], ["🥫 A corner shop", "food"], ["💊 A chemist", "med"], ["🎯 An armoury locker", "ammo"]];
kinds.forEach(function (K, i) {
var a = i / kinds.length * Math.PI * 2 + 0.6, r = 46 + ((i * 17) % 34), x = Math.cos(a) * r, z = Math.sin(a) * r;
var L = { x: x, z: z, kind: K[1], name: K[0], taken: false };
THXF.loot.push(L);
thxFallBox(1.6, 1.1, 1.2, thxFallMat(0x6A6258, "metal"), x, 0.55, z);
thxFallSolid(x, z, 0.8, 0.6);
thxFallSpot(x, z, 2.6, K[0], "strip it", function () { thxFallTake(L); });
});
},
function (L) {
if (THXF.phase !== "day") {
thxSay("🌙 Not in the dark. Stripping a ruin at night is how people are lost.");
return;
}
if (L.taken) {
thxSay("Nothing left in here today.");
return;
}
L.taken = true;
var n = 1 + Math.floor(Math.random() * 3), what = { food: "tins", water: "clean water", med: "medicine", ammo: "rounds", fence: "plate and wire" }[L.kind];
if (L.kind === "ammo")
n *= 6;
if (L.kind === "fence")
n *= 8;
if (L.kind === "fence")
THXF.fenceKit = (THXF.fenceKit || 0) + n;
else
THXF[L.kind] = (THXF[L.kind] || 0) + n;
thxSay("📦 <b>" + n + " " + what + ".</b> " + thxEsc(L.name) + " is stripped for today.");
thxFallSave();
},
function () {
var want = THXF.saved && THXF.saved.length ? THXF.saved : [{ n: THXF_NAMES[0][0], job: THXF_NAMES[0][1] }, { n: THXF_NAMES[1][0], job: THXF_NAMES[1][1] }, { n: THXF_NAMES[2][0], job: THXF_NAMES[2][1] }];
want.forEach(function (S, i) {
var a = i / Math.max(1, want.length) * Math.PI * 2, x = Math.cos(a) * 7, z = Math.sin(a) * 7 + 2;
var g = new THREE.Group();
g.position.set(x, 0, z);
THXF.F.add(g);
var cl = thxFallMat([0x6A5A4A, 0x4A5A6A, 0x5A4A5A][i % 3], null);
thxFallBox(0.5, 0.9, 0.3, cl, 0, 1.0, 0, 0, g);
thxFallBox(0.3, 0.3, 0.28, thxFallMat(0xE8C8A8, null), 0, 1.62, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, -0.17, 0.38, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, 0.17, 0.38, 0, 0, g);
var P = { g: g, n: S.n, job: S.job, hurt: S.hurt || 0, bitten: 0, alive: true };
THXF.people.push(P);
thxFallSpot(x, z, 2.2, "🙋 " + S.n, "speak to them", function () { thxFallPersonCard(P); });
});
},
function (P) {
var rows = [["Who", "&nbsp;" + thxEsc(P.job)], ["How they are", P.hurt ? ("hurt — " + P.hurt + " days of it, and medicine would help") : "holding up"],
["What they do at night", P.job.indexOf("guard") > -1 ? "stands the gate with you" : "keeps the fire and hands you rounds"]];
var b = "", fns = {};
if (P.hurt && THXF.med > 0) {
b += worldBtn("med", "💊 Treat them", "one of your medicine");
fns.med = function () { THXF.med--; P.hurt = 0; thxSay("💊 " + thxEsc(P.n) + " is patched up."); thxFallSave(); worldCard(null); };
}
worldCard(worldFacts("🙋 " + thxEsc(P.n), "One of the people you are keeping alive", rows, ["Everybody in this camp eats and drinks at dawn. If there is not enough, somebody goes without, and going without shows."]) + b, fns);
},
function () {
worldCard(worldFacts("📦 The stores", "What the camp has, day " + THXF.day, [["Food", String(THXF.food) + " — " + (THXF.food >= THXF.people.length + 1 ? "enough for dawn" : "NOT enough for dawn")],
["Water", String(THXF.water) + " — " + (THXF.water >= THXF.people.length + 1 ? "enough for dawn" : "NOT enough for dawn")],
["Medicine", String(THXF.med)], ["Rounds", String(THXF.ammo)], ["Plate and wire", String(THXF.fenceKit || 0)],
["The fence", THXF.fence + "%"], ["People in the camp", String(THXF.people.filter(function (P) { return P.alive; }).length)],
["Nights held", String(THXF.day - 1)], ["Your best", String(THXF.best || 0) + " days"]], ["Daylight is for stripping ruins. Everything in this camp came out of one."]), {});
},
function () {
var kit = THXF.fenceKit || 0, need = Math.ceil((100 - THXF.fence) / 10);
var b = "", fns = {};
if (THXF.fence < 100 && kit > 0) {
b += worldBtn("mend", "🛠️ Mend the fence", Math.min(kit, need) + " of your plate and wire");
fns.mend = function () {
var use = Math.min(kit, need);
THXF.fenceKit -= use;
THXF.fence = Math.min(100, THXF.fence + use * 10);
thxSay("🛠️ <b>The fence is at " + THXF.fence + "%.</b>");
thxFallSave();
worldCard(null);
};
}
worldCard(worldFacts("🛠️ The fence", "Plate, wire and whatever else came back", [["Standing at", THXF.fence + "%"], ["Plate and wire you have", String(kit)], ["What it takes", "one of plate and wire for every ten per cent"],
["If it falls", "they are in the camp, and they go for the people before they go for you"]], ["Mend it in the daylight. Nobody has ever mended a fence usefully at night."]) + b, fns);
},
function () {
worldCard(worldFacts("🛏️ Your bunk", "You can wake up. The camp keeps going without you.", [["What is kept", "the day you are on, these people, the stores and the fence"], ["What happens here while you are gone", "nothing. It waits."], ["Coming back", "the Hall of Doors, or the Tower, whenever you like"]], ["This is a place now, not a punishment."]) + worldBtn("wake", "Wake up", ""), { wake: function () { thxFallSave(); worldCard(null); if (typeof worldOff === "function")
worldOff(true);
else
thxGoFloor("city"); } });
},
function (x, z, speed) {
var g = new THREE.Group();
g.position.set(x, 0, z);
THXF.F.add(g);
var cloth = thxFallMat(0x3A4038, null), skin = thxFallMat(0x8A9888, null);
thxFallBox(0.52, 0.92, 0.32, cloth, 0, 1.0, 0, 0, g);
thxFallBox(0.3, 0.32, 0.28, skin, 0, 1.63, 0, 0, g);
var la = thxFallBox(0.15, 0.7, 0.16, cloth, -0.33, 1.15, 0.1, 0, g), ra = thxFallBox(0.15, 0.7, 0.16, cloth, 0.33, 1.15, 0.1, 0, g);
la.rotation.x = -1.2;
ra.rotation.x = -1.2;
var ll = thxFallBox(0.17, 0.78, 0.19, cloth, -0.14, 0.39, 0, 0, g), rl = thxFallBox(0.17, 0.78, 0.19, cloth, 0.14, 0.39, 0, 0, g);
var Fg = { g: g, hp: 3, sp: speed, ll: ll, rl: rl, down: false, t: Math.random() * 6 };
thxZSetup(Fg, THXF.day);
thxGoreStain(g);
THXF.figs.push(Fg);
THXF.left++;
return Fg;
},
function () {
if (THXF.cool > 0)
return;
var W = thxWpn(true);
if (W.gun && THXF.ammo <= 0) {
thxSay("🔫 <b>Empty.</b> There are rounds in the guard posts and the armoury lockers, in daylight. A blade needs none.");
return;
}
if (W.gun)
THXF.ammo--;
THXF.shots++;
var L = thxFallLocal(), R = thxAttack(THXF.figs, L, true);
THXF.cool = R.cool;
if (typeof playTone === "function")
try {
playTone(R.W.melee ? 220 : 360, 0.05);
}
catch (e) { }
if (R.hits.length)
THXF.hits++;
thxGoreHits(THXF.F, R, L);
var downed = false;
R.hits.forEach(function (h) {
if (!h.dead || h.Fg.down)
return;
var best = h.Fg;
downed = true;
best.down = true;
THXF.left--;
best.g.rotation.x = -1.4;
best.g.position.y = 0.3;
if (best.bar)
best.bar.visible = false;
setTimeout(function () { if (best.g.parent)
best.g.parent.remove(best.g); }, 6000);
});
if (R.hits.length || R.W.refused)
thxSay(R.msg);
if (downed && THXF.left <= 0)
thxFallDawn();
},
function () {
if (THXF.phase !== "night")
return;
THXF.phase = "day";
THXF.clock = 0;
var alive = THXF.people.filter(function (P) { return P.alive; }).length, need = alive + 1;
var short = [];
if (THXF.food >= need)
THXF.food -= need;
else {
short.push("food");
THXF.food = 0;
}
if (THXF.water >= need)
THXF.water -= need;
else {
short.push("water");
THXF.water = 0;
}
if (short.length) {
THXF.people.forEach(function (P) { if (P.alive)
P.hurt = (P.hurt || 0) + 1; });
thxSay("🌅 <b>Dawn, day " + (THXF.day + 1) + ".</b> Short of " + short.join(" and ") + ". Everyone is weaker for it.");
var worst = THXF.people.filter(function (P) { return P.alive && P.hurt >= 3; })[0];
if (worst)
thxFallLose(worst, "went without once too often");
}
else
thxSay("🌅 <b>Dawn, day " + (THXF.day + 1) + ".</b> Everyone ate and drank.");
THXF.day++;
THXF.loot.forEach(function (L) { L.taken = false; });
if (THXF.day % 2 === 0 && THXF.people.filter(function (P) { return P.alive; }).length < 6)
thxFallArrive();
thxFallSave();
worldCard(worldFacts("🌅 You held the night", "Day " + THXF.day + " in the Fall", [["Night held", String(THXF.day - 1)], ["People alive", String(THXF.people.filter(function (P) { return P.alive; }).length)],
["The fence", THXF.fence + "%"], ["Food left", String(THXF.food)], ["Water left", String(THXF.water)], ["Rounds left", String(THXF.ammo)],
["Your best", String(THXF.best || 0) + " days"]], ["Daylight is yours: strip the ruins, mend the fence, feed the camp. They come back with the dark."]), {});
},
function () {
var used = {};
THXF.people.forEach(function (P) { used[P.n] = 1; });
var pick = THXF_NAMES.filter(function (N) { return !used[N[0]]; })[0];
if (!pick)
return;
var g = new THREE.Group();
g.position.set(2, 0, 9);
THXF.F.add(g);
var cl = thxFallMat(0x5A5A4A, null);
thxFallBox(0.5, 0.9, 0.3, cl, 0, 1.0, 0, 0, g);
thxFallBox(0.3, 0.3, 0.28, thxFallMat(0xE8C8A8, null), 0, 1.62, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, -0.17, 0.38, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, 0.17, 0.38, 0, 0, g);
var P = { g: g, n: pick[0], job: pick[1], hurt: 1, bitten: 0, alive: true };
THXF.people.push(P);
thxFallSpot(2, 9, 2.2, "🙋 " + pick[0], "speak to them", function () { thxFallPersonCard(P); });
thxSay("🙋 <b>" + pick[0] + " walked in,</b> " + pick[1] + ". One more mouth, one more pair of hands.");
},
function () {
worldCard(worldFacts("🕯️ The camp is yours alone", "Everybody who was here is gone.", [["Days held", String(THXF.day - 1)], ["Your best", String(THXF.best || 0) + " days"], ["What happens now", "people still walk in out of the ruins. They always do."]], ["Keep the fence up and the fire lit, and the camp fills again."]), {});
},
function (auto) {
THXF.note = (THXF.note || 0) + 1;
var lines = [
"…White Widow, Somnucor Tower, still transmitting. The building is sealed and the plant is still turning. If anyone is hearing this, the Tower is standing.",
"…I have four hundred and six drones flying patterns over a city with nobody left to watch them. I keep flying them. It seems better than stopping.",
"…Sector Zero is cold. It has been cold for a long time. I was eleven seconds too slow and I have had a great deal of time to count them.",
"…the water in the north mains is clean to the third junction. South of that, do not drink it.",
"…I can see your fire from here. Keep it where it is. It is the only one left in the east quarter."
];
var say = lines[(THXF.note - 1) % lines.length];
if (auto) {
thxSay("📻 <i>" + thxEsc(say) + "</i>");
return;
}
worldCard(worldFacts("📻 The radio", "Something is still transmitting from the Tower", [["Signal", "weak, and on the hour"], ["Who", "she says White Widow. There is no way to answer."]], [say]), {});
},
function (dt) {
if (WLD.on !== THXF.key)
return;
THXF.t += dt;
THXF.clock += dt;
if (THXF.cool > 0)
THXF.cool -= dt;
var L = thxFallLocal(), keeper = thxKeeper(), C = THXF.camp || { x: 0, z: 0, r: 17 };
THXF.fires.forEach(function (Fi) {
Fi.p += dt * 0.9;
var k = 0.82 + Math.sin(Fi.p) * 0.12;
Fi.core.scale.set(k, 0.9 + Math.sin(Fi.p * 0.7) * 0.18, k);
if (Fi.glow)
Fi.glow.intensity = 0.8 + Math.sin(Fi.p) * 0.16;
});
if (THXF.phase === "day") {
if (THXF.clock > THXF_DAY)
thxFallNight();
else if (THXF.clock > THXF_DAY - 25 && !THXF.warned) {
THXF.warned = true;
thxSay("🌆 <b>The light is going.</b> Get behind the fence.");
}
if (THXF.clock < THXF_DAY - 25)
THXF.warned = false;
}
else {
THXF.figs.forEach(function (Fg) {
if (Fg.down)
return;
Fg.t += dt;
var tx = L.x, tz = L.z, me = Math.hypot(L.x - Fg.g.position.x, L.z - Fg.g.position.z);
var dIn = Math.hypot(Fg.g.position.x - C.x, Fg.g.position.z - C.z);
if (dIn > C.r + 0.6 && me > C.r) {
tx = C.x;
tz = C.z;
}
else {
var near = null, nd = 1e9;
THXF.people.forEach(function (P) { if (!P.alive)
return; var d = Math.hypot(P.g.position.x - Fg.g.position.x, P.g.position.z - Fg.g.position.z); if (d < nd) {
nd = d;
near = P;
} });
if (near && nd < me) {
tx = near.g.position.x;
tz = near.g.position.z;
}
}
var dx = tx - Fg.g.position.x, dz = tz - Fg.g.position.z, d = Math.hypot(dx, dz) || 1;
Fg.g.rotation.y = Math.atan2(dx, dz);
Fg.ll.rotation.x = Math.sin(Fg.t * 4.0) * 0.6;
Fg.rl.rotation.x = -Math.sin(Fg.t * 4.0) * 0.6;
if (dIn > C.r + 0.6 && d > 1.2) {
Fg.g.position.x += dx / d * dt * Fg.sp;
Fg.g.position.z += dz / d * dt * Fg.sp;
}
else if (dIn > C.r - 0.4) {
if (THXF.t - (Fg.last || 0) > 1.2) {
Fg.last = THXF.t;
THXF.fence = Math.max(0, THXF.fence - 1);
if (THXF.fence <= 0) {
Fg.g.position.x *= (C.r - 1) / dIn;
Fg.g.position.z *= (C.r - 1) / dIn;
}
}
}
else {
if (d > 1.2) {
Fg.g.position.x += dx / d * dt * Fg.sp;
Fg.g.position.z += dz / d * dt * Fg.sp;
}
else if (THXF.t - (Fg.last || 0) > 1.5) {
Fg.last = THXF.t;
var hitP = null;
THXF.people.forEach(function (P) { if (!P.alive)
return; if (Math.hypot(P.g.position.x - Fg.g.position.x, P.g.position.z - Fg.g.position.z) < 1.6)
hitP = P; });
if (hitP) {
hitP.bitten = (hitP.bitten || 0) + 1;
if (hitP.bitten >= 2)
thxFallLose(hitP, "caught inside the fence");
else
thxSay("⚠️ <b>" + thxEsc(hitP.n) + " is in trouble by the fire.</b>");
}
else if (!keeper && me < 2.0) {
try {
thxHarm(Fg.kind ? Fg.kind.bite + 1 : 8, Fg.kind ? Fg.kind.n : "One of them");
}
catch (e) { }
}
}
}
});
if (THXF.clock > THXF_NIGHTCAP && THXF.left > 0) {
THXF.figs.forEach(function (Fg) { if (!Fg.down && Fg.g.parent)
Fg.g.parent.remove(Fg.g); });
THXF.figs = [];
THXF.left = 0;
thxFallDawn();
}
}
THXF.fx.forEach(function (f) { try {
f(dt, THXF.t);
}
catch (e) { } });
thxZBars(THXF.figs);
thxGoreTick(dt);
if (typeof thxRiseFolkTick === "function")
thxRiseFolkTick(performance.now() / 1000);
if (typeof worldBanner === "function" && (!THXW.capT || Date.now() - (THXW.lastCap || 0) > 11000)) {
var h = THXF.phase === "day"
? "<b>THE FALL</b> · day " + THXF.day + " &nbsp; ☀️ " + Math.max(0, Math.ceil(THXF_DAY - THXF.clock)) + "s of light &nbsp; 🛠️ fence " + THXF.fence + "% &nbsp; 🥫 " + THXF.food + " &nbsp; 🚰 " + THXF.water + " &nbsp; 🔫 " + THXF.ammo + thxArmsLine(true) + (typeof thxRiseLine === "function" ? thxRiseLine() : "")
: "<b>THE FALL</b> · night " + THXF.day + " &nbsp; ☣️ " + Math.max(0, THXF.left) + " up &nbsp; 🛠️ fence " + THXF.fence + "% &nbsp; 🔫 " + THXF.ammo + thxArmsLine(true) + (typeof thxRiseLine === "function" ? thxRiseLine() : "");
worldBanner(h);
}
var near = null, nd = 1e9;
THXF.spots.forEach(function (S) { var d = Math.hypot(L.x - S.x, L.z - S.z); if (d < S.r && d < nd) {
nd = d;
near = S;
} });
if (typeof worldPrompt === "function") {
if (near && THXF.phase === "day")
worldPrompt("<b>" + thxEsc(near.name) + "</b> — " + thxEsc(near.verb) + " <span style='opacity:.7'>(F)</span>", near.fn);
else if (THXF.phase === "night")
worldPrompt((thxWpn(true).melee ? "🗡️ <b>Strike</b> <span" : "🔫 <b>Fire</b> · " + THXF.ammo + " rounds <span") + " style='opacity:.7'>(E or F)</span>", thxFallFire2);
else if (near)
worldPrompt("<b>" + thxEsc(near.name) + "</b> — " + thxEsc(near.verb) + " <span style='opacity:.7'>(F)</span>", near.fn);
else
worldPrompt((thxWpn(true).melee ? "🗡️ <b>Strike</b> <span" : "🔫 <b>Fire</b> · " + THXF.ammo + " rounds <span") + " style='opacity:.7'>(E or F)</span>", thxFallFire2);
}
},
function () {
if (THXR.busy || !thxSigned())
return Promise.resolve(null);
THXR.busy = true;
return thxRiseRpc("fall_my", {}).then(function (o) { THXR.busy = false; THXR.missing = false; thxRiseGot(o); return o; })
.catch(function (e) { THXR.busy = false; if (typeof rpcMissing === "function" && rpcMissing(e))
THXR.missing = true; return null; });
},
function (o) {
if (!o || o.ok === false) {
if (o && o.say)
thxSay(thxEsc(o.say));
return;
}
THXR.at = Date.now();
if (o.none) {
THXR.c = null;
THXR.none = true;
THXR.open = o.open || [];
THXR.rules = o.rules || THXR.rules;
thxRiseDraw();
return;
}
THXR.none = false;
THXR.c = o;
THXR.rules = o.rules || THXR.rules;
var S = o.stores || {};
["food", "water", "med", "ammo"].forEach(function (k) { if (typeof S[k] === "number")
THXF[k] = S[k]; });
if (typeof o.fence === "number")
THXF.fence = Math.min(100, o.fence);
thxRiseDraw();
if (o.say)
thxSay(thxEsc(o.say));
if (o.built === "helix" || (o.raised && !THXR.toldRaised)) {
THXR.toldRaised = true;
setTimeout(thxRiseRaisedCard, o.built === "helix" ? 600 : 2500);
}
},
function (key, P) {
var g = new THREE.Group();
g.position.set(P.x, 0, P.z);
g.rotation.y = P.ry;
THXR.G.add(g);
var M = function (c, t) { return thxFallMat(c, t); }, B = function (w, h, d, m, x, y, z) { return thxFallBox(w, h, d, m, x, y, z, 0, g); };
var wood = M(0x7A6248, "wood"), plank = M(0x8A7458, "wood"), metal = M(0x7A7E86, "metal"), stone = M(0x8A8478, "concrete"), white = M(0xE6E2D8, null), glass = M(0x9AC8C0, null);
if (key === "well") {
var c = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 1, 14), stone);
c.position.y = 0.5;
g.add(c);
B(0.15, 2.2, 0.15, wood, -1, 1.1, 0);
B(0.15, 2.2, 0.15, wood, 1, 1.1, 0);
B(2.6, 0.2, 1.4, plank, 0, 2.3, 0);
B(1.6, 1.6, 0.08, metal, 0, 1.3, -1.8);
}
else if (key === "beds") {
for (var i = 0; i < 3; i++) {
B(1.2, 0.35, 4, plank, -1.8 + i * 1.8, 0.18, 0);
B(1.0, 0.3, 3.8, M(0x4A8A3A, null), -1.8 + i * 1.8, 0.45, 0);
}
}
else if (key === "watchtower") {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { B(0.2, 6, 0.2, wood, p[0], 3, p[1]); });
B(2.8, 0.2, 2.8, plank, 0, 6, 0);
B(2.8, 1, 0.1, plank, 0, 6.6, 1.4);
B(2.8, 1, 0.1, plank, 0, 6.6, -1.4);
}
else if (key === "workshop" || key === "smokehouse" || key === "armoury") {
B(5, 3, 4, key === "armoury" ? metal : wood, 0, 1.5, 0);
B(5.4, 0.3, 4.6, metal, 0, 3.15, 0);
B(1.4, 2.2, 0.1, M(0x2A2420, null), 0, 1.1, 2.02);
if (key === "smokehouse")
B(0.6, 2, 0.6, stone, 1.6, 4, 0);
}
else if (key === "wall") {
for (var s = -3; s <= 3; s++)
B(2.2, 2.4, 0.8, stone, s * 2.2, 1.2, 0);
}
else if (key === "generator" || key === "substation") {
B(3, 2, 2, metal, 0, 1, 0);
B(0.3, 0.3, 0.3, M(0x40D060, null), 1.2, 2.2, 0.8);
if (key === "substation") {
[[-3, 0], [3, 0]].forEach(function (p) { B(0.3, 7, 0.3, metal, p[0], 3.5, p[1]); B(2, 0.2, 0.2, metal, p[0], 6.8, p[1]); });
}
}
else if (key === "radio") {
B(0.25, 14, 0.25, metal, 0, 7, 0);
B(0.5, 0.5, 0.5, M(0xD02020, null), 0, 14.2, 0);
B(2, 1.6, 1.6, wood, 1.6, 0.8, 0);
}
else if (key === "clinic" || key === "curelab") {
B(6, 3, 4.5, white, 0, 1.5, 0);
B(0.8, 0.25, 0.06, M(0x2EA84A, null), 0, 2.4, 2.27);
B(0.25, 0.8, 0.06, M(0x2EA84A, null), 0, 2.4, 2.27);
}
else if (key === "forge") {
B(4, 2.6, 4, stone, 0, 1.3, 0);
B(1, 5, 1, stone, 1.2, 3.8, 1.2);
B(1.2, 0.8, 0.1, M(0xFF7A20, null), 0, 1, 2.02);
}
else if (key === "greenhouse") {
var gm = new THREE.MeshLambertMaterial({ color: 0xBFE8D8, transparent: true, opacity: 0.45 });
var gb = new THREE.Mesh(new THREE.BoxGeometry(7, 3, 4), gm);
gb.position.y = 1.5;
g.add(gb);
B(6.6, 0.4, 3.6, M(0x4A8A3A, null), 0, 0.2, 0);
}
else if (key === "waterworks") {
var t = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 4, 16), metal);
t.position.y = 4;
g.add(t);
[[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].forEach(function (p) { B(0.25, 2, 0.25, metal, p[0], 1, p[1]); });
}
thxFallSolid(P.x, P.z, 2.6, 2.4);
return g;
},
function () {
if (!THXF.F || !THXF.built)
return;
var built = THXR.c ? Object.keys(THXR.c.buildings || {}).sort().join(",") : "", raised = !!(THXR.c && THXR.c.raised), folk = THXR.c ? (THXR.c.survivors || []).map(function (S) { return S.n; }).join(",") : "", key = built + "|" + raised + "|" + folk;
if (THXR.G && THXR.drawn === key)
return;
if (THXR.G) {
if (THXR.G.parent)
THXR.G.parent.remove(THXR.G);
}
THXR.G = new THREE.Group();
THXF.F.add(THXR.G);
THXR.drawn = key;
thxRiseFolk();
if (!THXR.c)
return;
Object.keys(THXR.c.buildings || {}).forEach(function (k) { var P = thxRisePlot(k); if (P)
thxRiseModel(k, P); });
if (raised) {
var m = new THREE.MeshBasicMaterial({ color: 0xF4FBFF });
for (var i = 0; i < 40; i++) {
var a = i * 0.45, y = 10 + i * 3.4;
[0, Math.PI].forEach(function (o) { var s = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), m); s.position.set(Math.cos(a + o) * 13, y, -150 + Math.sin(a + o) * 13); THXR.G.add(s); });
}
}
},
function () {
if (THXR.missing) {
worldCard(worldFacts("🏘️ The community board", "Nailed to a post by the fire", [], ["Communities open in the Fall soon. Until then the camp is yours alone, kept on this device."]), {});
return;
}
if (!thxSigned()) {
thxSay("Sign in first.");
return;
}
worldCard(worldFacts("🏘️ The community board", "Reading it…", [], []), {});
thxRiseLoad().then(function () { if (THXR.missing)
return thxRiseBoard(); if (THXR.none)
thxRiseJoinCard();
else
thxRiseCard(); });
},
function () {
var h = worldFacts("🏘️ The community board", "Nobody gets through this alone", [], ["Found a community, or join one. Everything you strip, grow and build goes into what you share."]) +
"<div style='margin:6px 0'><input id='thxr-name' maxlength='32' placeholder='Name your community' style='width:100%;padding:8px;border-radius:4px;border:1px solid #556;background:#111;color:#eee'></div>" +
worldBtn("found", "🔥 Found it", "you, a fire and a fence");
var fns = { found: function () {
var el = document.getElementById("thxr-name"), n = el ? el.value : "";
thxRiseRpc("fall_found", { p_name: n }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); thxRiseCard(); }).catch(function (e) { thxSay(thxEsc(e.message || String(e))); });
} };
(THXR.open || []).forEach(function (C) {
if (C.raised)
return;
h += worldBtn("j" + C.id, "Join " + thxEsc(C.name), (THXR.rules ? THXR.rules.eras[C.era] : "era " + C.era) + " · day " + C.day + " · " + C.people + " people");
fns["j" + C.id] = function () { thxRiseRpc("fall_join", { p_id: C.id }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); thxRiseCard(); }).catch(function () { }); };
});
var raised = (THXR.open || []).filter(function (C) { return C.raised; });
if (raised.length)
h += "<div style='margin-top:8px;opacity:.8;font-size:12px'>Raised Somnucor: " + raised.map(function (C) { return thxEsc(C.name); }).join(", ") + "</div>";
worldCard(h, fns);
setTimeout(function () { var el = document.getElementById("thxr-name"); if (el)
el.addEventListener("keydown", function (e) { e.stopPropagation(); }); }, 50);
},
function () {
var C = THXR.c, R = THXR.rules;
if (!C || !R)
return;
var S = C.stores || {}, era = R.eras[C.era];
var rows = [["Era", (C.era + 1) + " of 6 · " + era], ["Day", String(C.day) + (C.next_day_in ? " · next in " + Math.ceil(C.next_day_in / 60) + " min" : "")], ["Fence", C.fence + "%"],
["Stores", ["food", "water", "med", "ammo", "wood", "scrap", "seed", "parts", "power"].map(function (k) { return k + " " + (S[k] || 0); }).join(" · ")],
["People", (C.members || []).map(function (m) { return thxEsc(m.name) + (m.me ? " (you)" : ""); }).join(", ")]];
if ((C.survivors || []).length)
rows.push(["Survivors", C.survivors.map(function (S) { return thxEsc(S.n) + ", " + S.age + ", " + thxRiseJob(S.job).toLowerCase(); }).join(" · ")]);
var h = worldFacts("🏘️ " + thxEsc(C.name), C.raised ? "Somnucor is raised. The Helix burns again." : "Survive, then rebuild, then raise Somnucor", rows, []), fns = {};
if (!C.raised) {
Object.keys(R.buildings).forEach(function (k) {
var B = R.buildings[k];
if (B.era > C.era || (C.buildings || {})[k])
return;
var ok = thxRiseCan(B.cost);
h += worldBtn("b_" + k, (ok ? "🔨 " : "· ") + thxEsc(B.name), thxRiseCost(B.cost) + (B.makes ? " → " + thxRiseCost(B.makes) + " a day" : B.does ? " → " + B.does : ""));
fns["b_" + k] = function () { thxRiseRpc("fall_build", { p_key: k }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); thxRiseCard(); }).catch(function () { }); };
});
if (C.may_take && R.jobs) {
h += "<div style='margin:8px 0 2px;opacity:.85;font-size:12px'>🚪 Someone is at the gate, asking to come in (2 food and 2 water to take them in; one a day, until a camp holds six)</div>";
Object.keys(R.jobs).forEach(function (j) {
var J = R.jobs[j];
h += worldBtn("t_" + j, "🙋 Take in a " + thxEsc(J.name.toLowerCase()), thxEsc(J.say || ""));
fns["t_" + j] = function () { thxRiseRpc("fall_take_in", { p_job: j }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); thxRiseCard(); }).catch(function () { }); };
});
}
Object.keys(R.research).forEach(function (k) {
var X = R.research[k];
if (X.era !== C.era)
return;
h += worldBtn("r_" + k, "📘 Learn: " + thxEsc(X.name), thxRiseCost(X.cost) + " · opens the " + R.eras[Math.min(5, C.era + 1)] + " era (needs two of this era's buildings)");
fns["r_" + k] = function () {
var go = function () { thxRiseRpc("fall_research", { p_key: k }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); thxRiseCard(); }).catch(function () { }); };
if (/electricity|machining|grid/.test(k) && typeof thxCPanel === "function")
thxCPanel(X.name, go, k === "electricity" ? "ohm" : k === "machining" ? "net" : "meter");
else
go();
};
});
}
else {
h += worldBtn("home", "🏙️ Walk back into Somnucor", "the main game, and the city you raised");
fns.home = function () { worldCard(null); if (typeof thxGoFloor === "function")
thxGoFloor("city"); };
}
h += worldBtn("leave", "Leave " + thxEsc(C.name), "walk out on your own");
fns.leave = function () { thxRiseRpc("fall_leave", {}).then(function (o) { thxSay(thxEsc((o && o.say) || "")); THXR.c = null; THXR.drawn = ""; thxRiseLoad(); worldCard(null); }).catch(function () { }); };
worldCard(h, fns);
},
function () {
var C = THXR.c;
if (!C)
return;
worldCard(worldFacts("🏙️ Somnucor rises", "The Helix is lit. " + thxEsc(C.name) + " raised it.", [["Days in the Fall", String(C.day)], ["People who did it", (C.members || []).map(function (m) { return thxEsc(m.name); }).join(", ")]], ["It started with a fire and a fence. Your names are on the board for good."]) +
worldBtn("home", "🏙️ Walk back into Somnucor", "the main game"), { home: function () { worldCard(null); if (typeof thxGoFloor === "function")
thxGoFloor("city"); } });
},
function () {
THXR_YARDS.forEach(function (Y) {
Y.taken = 0;
if (Y.kind === "wood")
for (var i = 0; i < 4; i++)
thxFallBox(0.5, 0.5, 3, thxFallMat(0x6A5038, "wood"), Y.x + (i % 2) * 0.6, 0.25 + Math.floor(i / 2) * 0.5, Y.z, 0.2);
else if (Y.kind === "scrap")
for (var j = 0; j < 5; j++)
thxFallBox(1 + j % 2 * 0.5, 0.4 + j * 0.15, 0.9, thxFallMat(0x6A6A70, "metal"), Y.x + (j - 2) * 0.5, 0.3 + j * 0.12, Y.z + (j % 3) * 0.4, j);
else {
thxFallBox(3, 2.2, 0.1, thxFallMat(0x9AC0A8, null), Y.x, 1.1, Y.z, 0);
thxFallBox(2, 0.5, 1, thxFallMat(0x5A4A38, null), Y.x, 0.25, Y.z + 1.2, 0);
}
thxFallSolid(Y.x, Y.z, 1.2, 1.0);
thxFallSpot(Y.x, Y.z + 2, 2.6, Y.n, "gather", function () { thxRiseGather(Y); });
});
},
function (Y) {
if (THXF.phase !== "day") {
thxSay("🌙 Not in the dark.");
return;
}
if (!thxRiseOn()) {
thxSay("There is nobody to bring it back to. Found or join a community at the board by the fire.");
return;
}
if (Y.taken >= 3) {
thxSay("You have taken what you can carry from here today.");
return;
}
Y.taken++;
thxRiseRpc("fall_gather", { p_kind: Y.kind, p_n: 3 + Math.floor(Math.random() * 4) }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
Y.taken--;
return;
} thxRiseGot(o); }).catch(function () { Y.taken--; });
},
function () {
thxFallSpot(9, -7, 2.6, "🏘️ The community board", "found or join a community; build, learn, raise Somnucor", function () { thxRiseBoard(); });
var post = thxFallBox(0.2, 2.2, 0.2, thxFallMat(0x6A5A46, "wood"), 9, 1.1, -8.2, 0);
thxFallBox(1.6, 1.1, 0.08, thxFallMat(0xC8B890, null), 9, 1.9, -8.1, 0);
thxRiseYards();
THXR.G = null;
THXR.drawn = "";
thxRiseDraw();
},
function (S) {
var seed = "thxr_" + S.n + "_" + S.id, L = (typeof randomLook === "function") ? randomLook(seed, "human") : {};
L.sex = S.sex === "m" ? "m" : "f";
L.age = "adult";
if (L.topKind === "dress")
L.topKind = (typeof TOPKINDS !== "undefined" && TOPKINDS[0]) || "tee";
if (L.sex === "m" && /long|bun|ponytail/.test(L.hairStyle || ""))
L.hairStyle = "short";
if (S.age >= 60)
L.hair = [0x8E8C88, 0xB8B4AE, 0xE4E1DA][S.age % 3];
L.top = [0x5A5248, 0x4A5040, 0x5E4A3A, 0x3E4650, 0x6A5E4A][S.age % 5];
L.bottom = [0x3A3A36, 0x2E3440, 0x4A4030][S.age % 3];
L.bottomKind = "trousers";
L.hat = S.job === "guard" ? "cap" : "none";
return L;
},
function (S) {
var g = null;
try {
if (typeof buildFigure === "function") {
var L = thxRiseLook(S);
if (typeof fillLook === "function")
try {
fillLook(L, "thxr_" + S.n);
}
catch (e) { }
g = buildFigure({ id: "thxr_" + S.n + "_" + S.id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
}
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
var cl = thxFallMat(0x5A5248, null);
thxFallBox(0.5, 0.9, 0.3, cl, 0, 1.0, 0, 0, g);
thxFallBox(0.3, 0.3, 0.28, thxFallMat(0xE8C8A8, null), 0, 1.62, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, -0.17, 0.38, 0, 0, g);
thxFallBox(0.16, 0.75, 0.18, cl, 0.17, 0.38, 0, 0, g);
}
g.traverse(function (m) { m.raycast = function () { }; });
if (typeof scpBake === "function")
try {
g = scpBake(g) || g;
}
catch (e) { }
return g;
},
function () {
THXF.spots = THXF.spots.filter(function (P) { return !P.thxrFolk; });
THXR.folk = [];
if (!THXR.c || !THXR.G)
return;
(THXR.c.survivors || []).forEach(function (S, i) {
var a = -0.9 + i * 0.55, x = Math.cos(a) * 11.5, z = Math.sin(a) * 11.5;
var g = thxRiseFig(S);
g.position.set(x, 0, z);
g.rotation.y = Math.atan2(-x, -z);
THXR.G.add(g);
THXR.folk.push({ S: S, g: g, ry: g.rotation.y, ph: i * 1.3 });
var P = thxFallSpot(x, z, 2.4, "🙋 " + S.n + " · " + thxRiseJob(S.job).toLowerCase(), "talk", function () { thxRiseFolkCard(S); });
P.thxrFolk = 1;
});
},
function (S) {
var C = THXR.c || {}, R = THXR.rules || {}, J = (R.jobs && R.jobs[S.job]) || {}, St = C.stores || {};
var p = "You are " + S.n + ", " + S.age + " years old, a survivor of the Fall: the night Somnucor, the dreamers' shared city, was overrun by an outbreak of the turned and went dark." +
" You walked out of the ruins and were taken in by " + (C.name || "a small camp") + ", a community of survivors living behind a fence by a fire." +
" Your work there: you are the camp's " + (J.name || "hand").toLowerCase() + " (you " + (J.say || "do what is needed") + ")." +
" The camp is in its " + ((R.eras && R.eras[C.era]) || "first") + " era, on day " + (C.day || 1) + "; the fence stands at " + (C.fence == null ? 100 : C.fence) + "%; the stores hold " + (St.food || 0) + " food and " + (St.water || 0) + " water." +
" The camp's hope is to rebuild, learn electricity and machining, find a cure, and one day relight the Helix and raise Somnucor again." +
" The person talking to you is one of your community. You have seen terrible things, lost people to the turned, and you do not pretend otherwise; you are tired, wry, practical, and you still hope." +
" You never call it a game.";
if (typeof cfkAgeWords === "function")
p += " " + cfkAgeWords(S.age, S.sex);
return p;
},
function (S) {
var C = THXR.c, J = (THXR.rules && THXR.rules.jobs && THXR.rules.jobs[S.job]) || {};
var rows = [["Age", String(S.age)], ["Work", thxEsc(J.name || S.job) + (J.say ? " · " + thxEsc(J.say) : "")], ["Came in", "day " + (S.day || 1)]];
var h = worldFacts("🙋 " + thxEsc(S.n), "One of " + thxEsc(C ? C.name : "the camp") + "'s survivors", rows, ["They eat and drink at dawn like everyone. If the stores run short, someone walks out."]);
h += worldBtn("talk", "💬 Talk to " + thxEsc(S.n), "say anything");
h += worldBtn("away", "🚪 Send " + thxEsc(S.n) + " away", "they take a share and go");
worldCard(h, {
talk: function () {
worldCard(null);
var p = thxRisePersona(S), k = "wtalk:" + S.n;
if (typeof wTalk !== "function")
return;
(store.characters || []).forEach(function (x) { if (x.wKey === k && x.details && x.details.length)
x.details[0] = p; });
wTalk({ name: S.n, persona: p, greet: "", doing: "keeping the camp alive" });
(store.characters || []).forEach(function (x) { if (x.wKey === k) {
x.ftkSex = S.sex;
x.ftkAge = S.age;
x.doing = "keeping the camp alive";
} });
},
away: function () { thxRiseRpc("fall_send_away", { p_n: S.n }).then(function (o) { if (o && o.ok === false) {
thxSay(thxEsc(o.say || ""));
return;
} thxRiseGot(o); worldCard(null); }).catch(function () { }); }
});
},
function (c, W, H, t) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A2238");
g.addColorStop(1, "#120E18");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(155,123,216,0.25)";
c.lineWidth = 1;
for (var i = -10; i <= 10; i++) {
c.beginPath();
c.moveTo(W / 2 + i * W / 14, H * 0.62);
c.lineTo(W / 2 + i * W / 5, H);
c.stroke();
}
for (var j = 0; j < 6; j++) {
var y = H * 0.62 + Math.pow(j / 6, 1.6) * H * 0.38;
c.beginPath();
c.moveTo(0, y);
c.lineTo(W, y);
c.stroke();
}
var cx = W / 2, cy = H * 0.46, r = Math.min(W, H) * 0.28, a0 = (t || 0) * 0.6;
for (var k = 0; k < 12; k++) {
var a = a0 + k / 12 * Math.PI * 2;
c.strokeStyle = k % 3 ? "rgba(232,194,122,0.55)" : "rgba(245,217,156,0.95)";
c.beginPath();
c.ellipse(cx, cy, Math.abs(Math.cos(a)) * r, r, 0, 0, Math.PI * 2);
c.stroke();
}
for (var m = 1; m < 6; m++) {
c.beginPath();
c.ellipse(cx, cy - r + m * r / 3, r * Math.sin(m * Math.PI / 6), r * 0.12, 0, 0, Math.PI * 2);
c.stroke();
}
c.fillStyle = "#E8C27A";
c.font = "bold " + Math.round(H / 16) + "px sans-serif";
c.fillText("VIEWPORT · PERSPECTIVE", W * 0.04, H * 0.09);
c.fillStyle = "#BDB3C9";
c.font = Math.round(H / 22) + "px sans-serif";
c.fillText("12,480 tris · 3 materials · 2048 px", W * 0.04, H * 0.95);
},
function (c, W, H) {
c.fillStyle = "#17131F";
c.fillRect(0, 0, W, H);
var cols = ["#8A5A34", "#B07A45", "#6B4E8C", "#3E6A5A", "#C9A45C", "#7A3B32"];
for (var i = 0; i < 26; i++) {
var x = (i * 97 % W), y = (i * 61 % H), w = 30 + (i * 37 % 90), h = 24 + (i * 53 % 70);
c.fillStyle = cols[i % 6];
c.globalAlpha = 0.85;
c.fillRect(x * 0.85, y * 0.85, w, h);
}
c.globalAlpha = 1;
c.strokeStyle = "rgba(241,236,228,0.8)";
c.lineWidth = 1.2;
for (var j = 0; j < 26; j++) {
var x2 = (j * 97 % W) * 0.85, y2 = (j * 61 % H) * 0.85, w2 = 30 + (j * 37 % 90), h2 = 24 + (j * 53 % 70);
c.strokeRect(x2, y2, w2, h2);
}
c.fillStyle = "#E8C27A";
c.font = "bold " + Math.round(H / 14) + "px sans-serif";
c.fillText("UV · TEXTURE SHEET", W * 0.04, H * 0.1);
},
function (c, W, H) {
c.fillStyle = "#1B1724";
c.fillRect(0, 0, W, H);
var N = [[0.08, 0.2, "Colour"], [0.08, 0.5, "Roughness"], [0.08, 0.78, "Bumps"], [0.55, 0.45, "Material"], [0.82, 0.45, "Out"]];
c.strokeStyle = "#9B7BD8";
c.lineWidth = 2.5;
[[0, 3], [1, 3], [2, 3], [3, 4]].forEach(function (l) { var a = N[l[0]], b = N[l[1]]; c.beginPath(); c.moveTo(a[0] * W + W * 0.22, a[1] * H); c.bezierCurveTo(a[0] * W + W * 0.36, a[1] * H, b[0] * W - W * 0.1, b[1] * H, b[0] * W, b[1] * H); c.stroke(); });
N.forEach(function (n, i) {
c.fillStyle = i === 3 ? "#3A2E4E" : "#2A2338";
c.fillRect(n[0] * W, n[1] * H - H * 0.09, W * (i === 4 ? 0.14 : 0.22), H * 0.18);
c.strokeStyle = "#E8C27A";
c.lineWidth = 1.5;
c.strokeRect(n[0] * W, n[1] * H - H * 0.09, W * (i === 4 ? 0.14 : 0.22), H * 0.18);
c.fillStyle = "#F1ECE4";
c.font = Math.round(H / 16) + "px sans-serif";
c.fillText(n[2], n[0] * W + 8, n[1] * H + H * 0.025);
});
c.fillStyle = "#E8C27A";
c.font = "bold " + Math.round(H / 14) + "px sans-serif";
c.fillText("MATERIAL", W * 0.04, H * 0.1);
},
function (c, W, H) {
c.fillStyle = "#2A1D16";
c.fillRect(0, 0, W, H);
var sw = ["#E8C27A", "#9B7BD8", "#7A3B32", "#3E6A5A", "#C98FB4", "#F1ECE4", "#4A3552", "#B07A45", "#6B8CA8", "#2E2338", "#D8A86A", "#5A7A4A"];
for (var i = 0; i < 12; i++) {
var x = W * 0.05 + (i % 4) * W * 0.23, y = H * 0.2 + Math.floor(i / 4) * H * 0.26;
c.fillStyle = "#F4EFE6";
c.fillRect(x - 4, y - 4, W * 0.2 + 8, H * 0.2 + 8);
c.fillStyle = sw[i];
c.fillRect(x, y, W * 0.2, H * 0.2);
}
c.fillStyle = "#F5D99C";
c.font = "bold " + Math.round(H / 11) + "px serif";
c.fillText("Mood · Somnucor autumn", W * 0.05, H * 0.13);
},
function (x, z, kind, i) {
var plinth = thxMat(0x2A1D24, "marble"), brass = thxsBrass(), gold = thxMat(0xE3B858, "metal", { e: 0x3A2A08, ei: 0.4 });
thxBox(0.8, 1.0, 0.8, plinth, x, 0.5, z);
thxBox(0.86, 0.04, 0.86, brass, x, 1.02, z);
var G = new THREE.Group();
G.position.set(x, 1.04, z);
G.userData.keep = 1;
THX.F.add(G);
if (kind === 0) {
var v = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.12, 0.02], [0.16, 0.12], [0.1, 0.3], [0.07, 0.38], [0.1, 0.44]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 28), thxMat(0x3E6A5A, null));
G.add(v);
}
else if (kind === 1) {
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.15, 0.12, 24, 1, true), gold);
cr.position.y = 0.2;
G.add(cr);
for (var p = 0; p < 8; p++) {
var a = p / 8 * Math.PI * 2, sp = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.1, 6), gold);
sp.position.set(Math.cos(a) * 0.155, 0.31, Math.sin(a) * 0.155);
G.add(sp);
var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.02), thxGlow([0xD04A6A, 0x4AA0E8, 0x5AC87A][p % 3]));
gem.position.set(Math.cos(a) * 0.165, 0.2, Math.sin(a) * 0.165);
G.add(gem);
}
}
else if (kind === 2) {
var bl = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 0.012), thxMat(0xD8DCE4, "metal"));
bl.position.y = 0.42;
G.add(bl);
var gd = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.04), gold);
gd.position.y = 0.13;
G.add(gd);
var hd = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.12, 8), thxMat(0x3A2418, null));
hd.position.y = 0.06;
G.add(hd);
var st = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.1), thxMat(0x14101C, null));
st.position.y = 0.0;
G.add(st);
}
else if (kind === 3) {
[[-0.08, 0x9B3A5A], [0.0, 0x3A7ACB], [0.09, 0x5AB87A]].forEach(function (b) {
var bt = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), thxMat(b[1], null, { op: 0.75 }));
bt.position.set(b[0], 0.07, 0);
G.add(bt);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.06, 10), thxMat(b[1], null, { op: 0.75 }));
nk.position.set(b[0], 0.15, 0);
G.add(nk);
var ck = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.025, 8), thxMat(0x8A6A4A, "wood"));
ck.position.set(b[0], 0.19, 0);
G.add(ck);
});
}
else {
var gm = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 0), thxMat(0x9B7BD8, null, { e: 0x4A2A8A, ei: 0.7 }));
gm.position.y = 0.22;
G.add(gm);
THX.fx.push(function (dt, t) { gm.rotation.y = t * 0.6; gm.position.y = 0.22 + Math.sin(t * 1.3 + i) * 0.02; });
}
var gl = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.62, 0.7), thxGlass(0xD8E8F0));
gl.position.set(x, 1.35, z);
gl.userData.keep = 1;
THX.F.add(gl);
thxBox(0.72, 0.02, 0.72, brass, x, 1.67, z);
thxSolid(x, z, 0.45, 0.45, 0, 1.7);
},
function (F) {
var lite = THX.lite, plum = thxsPlum(), oak = thxsOak(), brass = thxsBrass(), cream = thxMat(0xEFE6D6, "plaster"), dark = thxMat(0x241A20, null);
THXS.frame = F;
var rooms = thxRoomRow(F, [{ n: "Scan Room", w: 8, glassy: 1 }, { n: "Print Lab", w: 7, glassy: 1 }, { n: "Material Library", w: 9 }, { n: "Review Theatre", w: 9 }, { n: "Studio Kitchen", w: 6 }], "n", { wall: 0x4A3552, depth: 8 });
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Scan Room") {
var tt = thxCyl(0.9, 0.18, thxMat(0x1A1620, null), r.cx, 0.09, r.cz, null, 32);
thxRound(r.cx, r.cz, 0.95, 0.2);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.025, 6, 48), thxGlow(0xE8C27A));
ring.rotation.x = Math.PI / 2;
ring.position.set(r.cx, 0.19, r.cz);
THX.F.add(ring);
var n = lite ? 8 : 14;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, px = r.cx + Math.cos(a) * 2.4, pz = r.cz + Math.sin(a) * 2.4;
thxCyl(0.025, 1.9, thxMat(0x2A2A30, "metal"), px, 0.95, pz, null, 6);
var cam = thxBox(0.16, 0.11, 0.12, dark, px, 1.2 + (i % 3) * 0.35, pz);
cam.lookAt(r.cx, 1.0, r.cz);
thxBox(0.03, 0.03, 0.01, thxGlow(0xD04A4A), px, 1.28 + (i % 3) * 0.35, pz);
}
[[-1, 1], [1, -1]].forEach(function (s) { thxBox(0.9, 0.9, 0.05, thxMat(0xFFF6E8, null, { e: 0xFFF0D8, ei: 0.9 }), r.cx + s[0] * 2.9, 1.9, r.cz + s[1] * 1.4); });
thxScreen(1.4, 0.8, r.x0 + 0.9, 1.6, r.z0 + 0.1, 0, function (c, W, H) { thxText(c, ["PHOTO SCAN", "148 pictures · 14 cameras", "building the mesh… 82%"], W, H, { head: "#E8C27A", bg: "#17131F" }); });
thxPerson("scan", r.cx + 1.6, r.cz + 2.2, Math.PI * 0.8, { title: "scan technician", doing: "turning a carved chair on the turntable for a photo scan", about: "You run the photo-scan rig: fourteen cameras round a turntable that turn real objects into 3D models." });
}
else if (k === "Print Lab") {
for (var p = 0; p < (lite ? 2 : 3); p++) {
var px2 = r.x0 + 1.1 + p * 1.9, pz2 = r.z0 + 1.2;
thxBox(1.2, 0.8, 0.8, thxMat(0x2E2A34, "metal"), px2, 0.4, pz2);
thxSolid(px2, pz2, 0.6, 0.4, 0, 1.9);
var fr = thxMat(0x1C1A22, null);
[[-0.5, -0.32], [0.5, -0.32], [-0.5, 0.32], [0.5, 0.32]].forEach(function (q) { thxBox(0.04, 1.0, 0.04, fr, px2 + q[0], 1.3, pz2 + q[1]); });
thxBox(1.04, 0.04, 0.68, fr, px2, 1.8, pz2);
thxBox(0.8, 0.02, 0.5, thxGlow(0xE85A2A), px2, 0.82, pz2);
var head = thxBox(0.14, 0.12, 0.14, thxMat(0xC9A45C, "metal"), px2, 1.2, pz2);
head.userData.keep = 1;
(function (h, bx, bz, o) { THX.fx.push(function (dt, t) { h.position.x = bx + Math.sin(t * 2.1 + o) * 0.32; h.position.z = bz + Math.cos(t * 1.7 + o) * 0.2; }); })(head, px2, pz2, p);
var printed = thxCyl(0.12, 0.18 + p * 0.05, thxMat([0xE8C27A, 0x9B7BD8, 0x5AB87A][p], null), px2, 0.92 + p * 0.025, pz2, null, 18);
}
thxShelves(r.x1 - 0.4, 0, r.cz + 0.8, 3.0, -Math.PI / 2, "bottles");
thxPerson("print", r.cx, r.z1 - 1.2, 0, { title: "print lab technician", doing: "printing a small model of the new Kids Zone carousel", about: "You run the studio's 3D printers, turning the artists' models into small real ones to hold and check." });
}
else if (k === "Material Library") {
var kinds = ["wood", "marble", "brick", "stone", "metal", "slate", "tile", "plaster", "concrete", "shingle", "siding", "paving"];
for (var s2 = 0; s2 < 3; s2++) {
var sx = r.x0 + 0.7 + s2 * ((r.x1 - r.x0 - 1.4) / 2);
thxBox(0.5, 2.6, 0.12, oak, sx, 1.3, r.z0 + 0.2);
thxSolid(sx, r.z0 + 0.4, 0.3, 0.4, 0, 2.6);
for (var row = 0; row < 4; row++) {
thxBox(1.6, 0.04, 0.4, oak, sx, 0.5 + row * 0.6, r.z0 + 0.4);
for (var b = 0; b < 3; b++) {
var kk = kinds[(s2 * 7 + row * 3 + b) % kinds.length];
var tile = thxBox(0.42, 0.42, 0.03, thxMat([0xC8A880, 0xE8E4DC, 0xA8604A, 0x9A948A, 0xB8BEC6, 0x5A6068, 0xD8D0C4, 0xE6DDD0, 0x9A978F, 0x6A4A3A, 0xC8B8A0, 0x8A847A][(s2 * 7 + row * 3 + b) % 12], kk), sx - 0.5 + b * 0.5, 0.75 + row * 0.6, r.z0 + 0.3);
tile.rotation.x = -0.12;
}
}
}
thxTable(r.cx, 0, r.cz + 1.2, 2.0, 1.0, oak, 0.9);
thxBox(0.5, 0.02, 0.4, thxMat(0xE8C27A, "metal"), r.cx - 0.4, 0.93, r.cz + 1.2);
thxBox(0.5, 0.02, 0.4, thxMat(0x7A3B32, "brick"), r.cx + 0.3, 0.93, r.cz + 1.0);
thxSpot(r.cx, r.cz + 1.2, 2.2, "🧱 The Material Library", "open the studio's materials", function () { thxsOpenStudio("mat"); });
thxPerson("tex", r.cx + 1.4, r.cz + 2.0, -Math.PI / 2, { title: "texture artist", doing: "matching a marble sample to a new floor texture", about: "You paint textures and build materials: colour, roughness, bumps, and you love how real stone and old wood wear." });
}
else if (k === "Review Theatre") {
thxScreen(4.2, 2.2, r.cx, 1.75, r.z0 + 0.15, 0, function (c, W, H) { thxsDrawViewport(c, W, H, 0.4); c.fillStyle = "#F5D99C"; c.font = "bold " + Math.round(H / 12) + "px sans-serif"; c.fillText("REVIEW · Lantern Garden props", W * 0.04, H * 0.2); }, null, 96);
thxSofa(r.cx - 1.2, 0, r.z1 - 1.4, Math.PI, 2.2, 0x5A2F45);
thxSofa(r.cx + 1.4, 0, r.z1 - 1.4, Math.PI, 2.2, 0x5A2F45);
thxBox(r.x1 - r.x0 - 0.4, 0.02, 3.2, thxMat(0x3A1A2A, null), r.cx, 0.01, r.cz + 1.2);
thxSpot(r.cx, r.z1 - 2.2, 2.6, "🎬 The Review Theatre", "show a piece on the big screen", function () { thxsOpenStudio("render"); });
}
else if (k === "Studio Kitchen") {
thxCounter(r.cx, 0, r.z0 + 0.5, r.x1 - r.x0 - 0.4, 0.7, 0x3A2A30, "marble");
thxCyl(0.16, 0.4, thxMat(0x2A2A30, "metal"), r.x0 + 0.6, 1.15, r.z0 + 0.45, null, 12);
thxSph(0.08, thxMat(0xC9A45C, "metal"), r.x0 + 0.6, 1.4, r.z0 + 0.45);
thxTable(r.cx, 0, r.cz + 0.9, 1.4, 0.9, oak);
thxChair(r.cx - 0.45, 0, r.cz + 1.7, Math.PI, 0x6B4E8C);
thxChair(r.cx + 0.45, 0, r.cz + 0.1, 0, 0x6B4E8C);
thxPlant(r.x1 - 0.5, 0, r.z1 - 0.6);
}
});
thxBox(16, 0.015, 11, thxMat(0x3A1A2C, null), 0, 0.008, 0);
thxBox(16.4, 0.016, 0.12, brass, 0, 0.009, -5.5);
thxBox(16.4, 0.016, 0.12, brass, 0, 0.009, 5.5);
thxBox(0.12, 0.016, 11, brass, -8.2, 0.009, 0);
thxBox(0.12, 0.016, 11, brass, 8.2, 0.009, 0);
var bulbs = lite ? [[-4, -3], [4, -3], [0, 5]] : [[-6, -3], [-2, -3], [2, -3], [6, -3], [-4, 5], [0, 5], [4, 5], [-16, 0], [16, 0]];
bulbs.forEach(function (b) { thxCyl(0.008, 1.1, dark, b[0], 3.6, b[1], null, 4); thxCyl(0.32, 0.28, brass, b[0], 2.95, b[1], null, 20, 0.08); thxSph(0.09, thxGlow(0xFFE2A8), b[0], 2.8, b[1], null, 10); });
var sx0 = 0, sz0 = -3.4;
thxCyl(2.4, 0.32, thxMat(0x1C1620, "marble"), sx0, 0.16, sz0, null, 48);
thxRound(sx0, sz0, 2.45, 0.35);
var rim = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.035, 8, 96), thxGlow(0xE8C27A));
rim.rotation.x = Math.PI / 2;
rim.position.set(sx0, 0.33, sz0);
THX.F.add(rim);
var S = new THREE.Group();
S.position.set(sx0, 1.55, sz0);
S.userData.keep = 1;
THX.F.add(S);
var knot = new THREE.TorusKnotGeometry(0.62, 0.2, lite ? 90 : 180, lite ? 12 : 20);
var solid = new THREE.Mesh(knot, new THREE.MeshPhongMaterial({ color: 0xD9A23A, specular: 0xFFE7A8, shininess: 70, emissive: 0x3A2306 }));
var wire = new THREE.Mesh(knot, new THREE.MeshBasicMaterial({ color: 0x9B7BD8, wireframe: true, transparent: true, opacity: 0.45 }));
wire.scale.setScalar(1.015);
S.add(solid);
S.add(wire);
THX.fx.push(function (dt, t) { S.rotation.y = t * 0.35; S.rotation.x = Math.sin(t * 0.2) * 0.15; wire.material.opacity = 0.12 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.8)); });
if (!lite)
[0, 2.1, 4.2].forEach(function (a) {
var cx = sx0 + Math.cos(a) * 2.0, cz = sz0 + Math.sin(a) * 2.0;
thxCyl(0.06, 0.25, brass, cx, 3.9, cz, null, 10);
var cone = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.4, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE6B0, transparent: true, opacity: 0.06, depthWrite: false, side: THREE.DoubleSide }));
cone.position.set((cx + sx0) / 2, 2.2, (cz + sz0) / 2);
cone.lookAt(sx0, 0.4, sz0);
cone.rotateX(Math.PI / 2);
cone.userData.keep = 1;
THX.F.add(cone);
});
thxSign(["NOW ON THE STAGE", "the artist's latest piece"], 2.2, 0.42, "#1B1724", "#E8C27A", sx0, 0.6, sz0 + 2.5, 0);
thxSpot(sx0, sz0 + 2.9, 2.0, "✨ The stage", "put your own piece on the stage", function () { thxsOpenStudio("render"); });
var dz = 4.2;
for (var d = -3; d <= 3; d++) {
var a2 = d * 0.17, R0 = 4.2, rx = Math.sin(a2) * R0, rz = dz + (1 - Math.cos(a2)) * R0;
var seg = thxBox(1.3, 0.05, 0.85, oak, rx, 0.76, rz);
seg.rotation.y = -a2;
var front = thxBox(1.3, 0.72, 0.05, plum, rx + Math.sin(a2) * 0.4, 0.38, rz - Math.cos(a2) * 0.4);
front.rotation.y = -a2;
var trim = thxBox(1.3, 0.03, 0.06, brass, rx + Math.sin(a2) * 0.43, 0.74, rz - Math.cos(a2) * 0.43);
trim.rotation.y = -a2;
}
thxSolid(0, dz - 0.2, 4.3, 0.55, 0, 1.0);
var scr1 = thxScreen(1.5, 0.86, -1.75, 1.42, dz - 0.36, 0.25, function (c, W, H) { thxsDrawUV(c, W, H); }, null, 160);
var scr2 = thxScreen(1.9, 1.07, 0, 1.52, dz - 0.42, 0, function (c, W, H) { thxsDrawViewport(c, W, H, 0); }, null, 160);
var scr3 = thxScreen(1.5, 0.86, 1.75, 1.42, dz - 0.36, -0.25, function (c, W, H) { thxsDrawNodes(c, W, H); }, null, 160);
scr2.userData.t = 0;
THX.fx.push(function (dt, t) { scr2.userData.t += dt; if (scr2.userData.t > 0.5) {
scr2.userData.t = 0;
scr2.userData.redraw(function (c, W, H) { thxsDrawViewport(c, W, H, t); });
} });
thxBox(0.42, 0.015, 0.3, thxMat(0x14101C, null), 0.0, 0.79, dz + 0.05);
thxBox(0.36, 0.004, 0.24, thxGlow(0x2A2338), 0.0, 0.8, dz + 0.05);
thxCyl(0.006, 0.15, thxMat(0x14101C, null), 0.25, 0.83, dz + 0.1, null, 6);
thxBox(0.18, 0.07, 0.25, thxMat(0x2A2338, null), -0.55, 0.82, dz + 0.05);
var ch = new THREE.Group();
ch.position.set(0, 0, dz + 1.0);
THX.F.add(ch);
thxBox(0.62, 0.12, 0.6, thxMat(0x5A2F45, null), 0, 0.5, 0, ch);
thxBox(0.62, 0.85, 0.12, thxMat(0x5A2F45, null), 0, 0.98, 0.28, ch);
thxBox(0.08, 0.3, 0.5, thxMat(0x3A1A2C, null), -0.34, 0.68, 0, ch);
thxBox(0.08, 0.3, 0.5, thxMat(0x3A1A2C, null), 0.34, 0.68, 0, ch);
thxCyl(0.05, 0.42, brass, 0, 0.24, 0, ch, 8);
thxCyl(0.32, 0.03, dark, 0, 0.02, 0, ch, 16);
thxCyl(0.08, 0.02, brass, -3.4, 0.8, dz - 0.3, null, 12);
thxCyl(0.01, 0.4, brass, -3.4, 1.0, dz - 0.3, null, 6);
thxCyl(0.14, 0.14, brass, -3.4, 1.24, dz - 0.3, null, 16, 0.05);
thxSph(0.04, thxGlow(0xFFE2A8), -3.4, 1.2, dz - 0.3, null, 8);
thxCyl(0.1, 0.18, thxMat(0x2A1D24, null), 3.3, 0.88, dz - 0.3, null, 12);
thxSph(0.2, thxMat(0x3A7A3A, null), 3.3, 1.12, dz - 0.3, null, 10);
thxSign(["THE ASSET STUDIO", "press E at the desk to make, paint and send your work"], 3.2, 0.5, "#1B1724", "#E8C27A", 0, 0.42, dz - 0.46, Math.PI);
thxSpot(0, dz + 1.1, 1.8, "🎨 The Asset Studio desk", "open the Asset Studio", function () { thxsOpenStudio(""); });
var gx = -17;
thxBox(0.2, 3.2, 9, plum, gx - 5.4, 1.6, -1);
thxSolid(gx - 5.4, -1, 0.12, 4.5, 0, 3.2);
thxSign(["THE GALLERY", "finished work from the studio"], 3.0, 0.5, "#1B1724", "#E8C27A", gx - 5.28, 2.9, -1, Math.PI / 2);
for (var gi = 0; gi < (lite ? 4 : 8); gi++) {
thxsCase(gx - 2.6 + (gi % 2) * 3.2, -4.4 + Math.floor(gi / 2) * 2.4, gi % 5, gi);
}
[-4, 0, 4].forEach(function (z) {
thxScreen(1.2, 1.6, gx - 5.28, 1.8, z + (z < 0 ? 0.6 : z > 0 ? -0.6 : 0), Math.PI / 2, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#3A2630");
g.addColorStop(1, "#140D12");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C9A45C";
c.lineWidth = 6;
c.strokeRect(8, 8, W - 16, H - 16);
c.fillStyle = "#E8C27A";
c.beginPath();
c.arc(W / 2, H * 0.42, W * 0.22, 0, Math.PI * 2);
c.fill();
c.fillStyle = "#F1ECE4";
c.font = Math.round(H / 16) + "px serif";
c.textAlign = "center";
c.fillText(["The Lantern", "The Brass Widow", "The Crown"][(z + 4) / 4], W / 2, H * 0.82);
}, null, 96);
});
thxPerson("model", gx + 1.6, 2.6, -Math.PI / 2, { title: "3D modeller", doing: "checking a finished crown in the gallery before it goes to the shop", about: "You build 3D models for the game: props, furniture, buildings. You care about clean shapes, few triangles and good textures." });
var lx = 17;
thxBox(0.2, 3.2, 9, plum, lx + 5.4, 1.6, -1);
thxSolid(lx + 5.4, -1, 0.12, 4.5, 0, 3.2);
thxScreen(3.6, 2.0, lx + 5.28, 1.75, -1, -Math.PI / 2, function (c, W, H) { thxsDrawMood(c, W, H); }, null, 96);
thxBox(6, 0.015, 5, thxMat(0x26101F, null), lx, 0.009, -1);
thxSofa(lx - 1.6, 0, -1, Math.PI / 2, 2.6, 0x6B4E8C);
thxSofa(lx + 2.4, 0, -1, -Math.PI / 2, 2.6, 0x6B4E8C);
thxBox(1.4, 0.4, 0.8, oak, lx + 0.4, 0.2, -1);
thxSolid(lx + 0.4, -1, 0.7, 0.4, 0, 0.45);
thxBox(0.3, 0.04, 0.22, thxMat(0x7A3B32, null), lx + 0.2, 0.42, -1.1);
thxBox(0.26, 0.04, 0.2, thxMat(0x3E6A5A, null), lx + 0.25, 0.46, -1.05);
thxShelves(lx + 3.2, 0, -5.8, 3.0, 0, "books");
thxShelves(lx - 2.2, 0, -5.8, 3.0, 0, "books");
[[lx - 3, 3.6], [lx + 4.4, 3.6]].forEach(function (p) { thxCyl(0.03, 1.6, brass, p[0], 0.8, p[1], null, 6); thxCyl(0.25, 0.3, thxMat(0xEFE6D6, null, { e: 0xFFE2A8, ei: 0.6 }), p[0], 1.7, p[1], null, 16, 0.2); thxCyl(0.18, 0.03, dark, p[0], 0.015, p[1], null, 12); thxRound(p[0], p[1], 0.2, 1.8); });
thxPlant(lx + 4.6, 0, 1.8, 1);
thxPlant(lx - 3.4, 0, -4.6, 1);
thxPlant(-21, 0, 4, 1);
thxPlant(21, 0, 4.5, 1);
thxPerson("lead", lx + 1.0, 2.2, Math.PI, { title: "studio manager", doing: "planning next week's pieces on the mood wall", about: "You run the Asset Studio on L36 of the Somnucor Tower: the artists, the scan room, the print lab. You know what the game needs next and how the Model Workshop sells finished work.", wander: lite ? 0 : 1.2 });
if (!lite)
thxPerson("rig", -6.5, 7.6, Math.PI * 0.75, { title: "animation artist", doing: "setting up bones in a new creature so it can walk", about: "You rig and animate models: bones, weights, walks and idles." });
if (!lite) {
[[0, -3, 3.4, 0xFFE2B0, 6, 12], [0, 4.5, 3.0, 0xFFD8A0, 4, 9], [-17, -1, 3.2, 0xFFE2B0, 3, 10], [17, -1, 3.2, 0xFFD0A0, 3, 10]].forEach(function (L) {
var pl = new THREE.PointLight(L[3], L[4] * 0.25, L[5], 2);
pl.position.set(L[0], L[2], L[1]);
pl.userData.keep = 1;
THX.F.add(pl);
});
}
},
function (tab) {
try {
if (typeof renderer !== "undefined" && renderer.xr && renderer.xr.isPresenting) {
thxSay("🎨 The Asset Studio is made for a PC screen and mouse. Take off the headset and open <b>studio.html</b> on a computer.");
return;
}
}
catch (e) { }
if (document.getElementById("thxs-studio"))
return;
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
if (typeof worldCard === "function")
worldCard(null);
if (typeof worldPrompt === "function")
worldPrompt(null);
var d = document.createElement("div");
d.id = "thxs-studio";
d.style.cssText = "position:fixed;inset:0;z-index:9000;background:#0f0d14;display:flex;flex-direction:column";
d.innerHTML = "<div style='display:flex;align-items:center;gap:12px;padding:8px 14px;background:linear-gradient(180deg,#221b2e,#17131f);border-bottom:1px solid #3d3452;color:#f1ece4;font:14px system-ui,sans-serif'>" +
"<span style='font-size:18px'>🎨</span><b>The Asset Studio</b><span style='color:#8a809a'>· L36, Somnucor Tower</span><span style='flex:1'></span>" +
"<button id='thxs-close' style='padding:7px 14px;border-radius:9px;border:1px solid #e8c27a;background:#2a2338;color:#f5d99c;cursor:pointer;font:inherit'>Back to the studio floor ✕</button></div>" +
"<iframe id='thxs-frame' src='studio.html" + (tab ? "#tab=" + tab : "") + "' style='flex:1;border:0;width:100%;background:#0f0d14' allow='fullscreen'></iframe>";
document.body.appendChild(d);
THXS.open = true;
function close() { var f = document.getElementById("thxs-frame"); try {
if (f)
f.src = "about:blank";
}
catch (e) { } if (d.parentNode)
d.parentNode.removeChild(d); THXS.open = false; document.removeEventListener("keydown", esc, true); thxSay("🎨 Back on the studio floor. Your work is saved in your library."); }
function esc(e) { if (e.key === "Escape") {
e.preventDefault();
e.stopPropagation();
close();
} }
document.getElementById("thxs-close").onclick = close;
document.addEventListener("keydown", esc, true);
},
function (c, W, H, t) {
c.fillStyle = "#120c0f";
c.fillRect(0, 0, W, H);
for (var r = 0; r < 24; r++) {
c.fillStyle = [1, 3, 6, 8, 10].indexOf(r % 12) > -1 ? "#1a1216" : "#1f161b";
c.fillRect(W * 0.08, H * 0.12 + r * H * 0.034, W, H * 0.034 - 1);
}
for (var k = 0; k < 24; k++) {
c.fillStyle = [1, 3, 6, 8, 10].indexOf(k % 12) > -1 ? "#1a1214" : "#efe6d6";
c.fillRect(0, H * 0.12 + k * H * 0.034, W * 0.07, H * 0.034 - 1);
}
for (var b = 0; b < 16; b++) {
c.fillStyle = b % 4 ? "#2a1e24" : "#4c3742";
c.fillRect(W * 0.08 + b * W * 0.0575, H * 0.12, 1, H * 0.82);
}
var cols = ["#e8c27a", "#d9737f", "#7fb3d9", "#8fcf8f"];
for (var n = 0; n < 46; n++) {
var x = W * 0.08 + ((n * 37) % 60) * W * 0.0153, y = H * 0.12 + ((n * 11 + Math.floor(n / 5) * 3) % 23) * H * 0.034, w = W * (0.03 + ((n * 7) % 4) * 0.02);
c.fillStyle = cols[n % 4];
c.fillRect(x, y + 1, w, H * 0.034 - 3);
}
var px = W * 0.08 + (((t || 0) * 0.06) % 1) * W * 0.92;
c.fillStyle = "#f5d99c";
c.fillRect(px, H * 0.1, 2, H * 0.86);
c.fillStyle = "#e8c27a";
c.font = "bold " + Math.round(H / 15) + "px sans-serif";
c.fillText("PIANO ROLL · Somnucor Overture", W * 0.03, H * 0.08);
},
function (c, W, H) {
c.fillStyle = "#1f161c";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 8; i++) {
var x = W * 0.04 + i * W * 0.118;
c.fillStyle = "#281d24";
c.fillRect(x, H * 0.14, W * 0.1, H * 0.8);
c.fillStyle = ["#e8c27a", "#d9737f", "#7fb3d9", "#8fcf8f", "#b48ad9", "#e89a5a", "#5ac8c0", "#d9c27f"][i];
c.fillRect(x, H * 0.14, W * 0.1, H * 0.025);
for (var k = 0; k < 3; k++) {
c.beginPath();
c.arc(x + W * 0.05, H * (0.24 + k * 0.1), H * 0.03, 0, 7);
c.fillStyle = "#3a2a32";
c.fill();
c.strokeStyle = "#e8c27a";
c.lineWidth = 2;
c.beginPath();
c.moveTo(x + W * 0.05, H * (0.24 + k * 0.1));
c.lineTo(x + W * 0.05 + Math.cos(i + k) * H * 0.028, H * (0.24 + k * 0.1) + Math.sin(i + k) * H * 0.028);
c.stroke();
}
c.fillStyle = "#120c0f";
c.fillRect(x + W * 0.045, H * 0.55, W * 0.01, H * 0.34);
var fy = H * (0.58 + ((i * 13) % 7) * 0.035);
c.fillStyle = "#c9b9b0";
c.fillRect(x + W * 0.02, fy, W * 0.06, H * 0.04);
var lv = 0.3 + ((i * 29) % 10) * 0.06;
var g = c.createLinearGradient(0, H * 0.89, 0, H * 0.55);
g.addColorStop(0, "#6fcf97");
g.addColorStop(0.75, "#f2c94c");
g.addColorStop(1, "#eb6f6f");
c.fillStyle = g;
c.fillRect(x + W * 0.08, H * 0.89 - lv * H * 0.34, W * 0.008, lv * H * 0.34);
}
c.fillStyle = "#e8c27a";
c.font = "bold " + Math.round(H / 15) + "px sans-serif";
c.fillText("THE MIXING DESK", W * 0.03, H * 0.09);
},
function (c, W, H) {
c.fillStyle = "#f1e6cf";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#3a2a20";
c.lineWidth = 1;
for (var s = 0; s < 5; s++) {
var y0 = H * 0.16 + s * H * 0.165;
for (var l = 0; l < 5; l++) {
c.beginPath();
c.moveTo(W * 0.06, y0 + l * H * 0.022);
c.lineTo(W * 0.95, y0 + l * H * 0.022);
c.stroke();
}
c.fillStyle = "#2a1a12";
c.font = Math.round(H * 0.11) + "px serif";
c.fillText(s % 2 ? "𝄢" : "𝄞", W * 0.06, y0 + H * 0.085);
for (var n = 0; n < 14; n++) {
var nx = W * 0.17 + n * W * 0.055, ny = y0 + ((n * 5 + s * 3) % 9) * H * 0.011;
c.beginPath();
c.ellipse(nx, ny, W * 0.011, H * 0.009, -0.4, 0, 7);
c.fill();
c.fillRect(nx + W * 0.009, ny - H * 0.06, 1.5, H * 0.06);
}
for (var bl = 1; bl < 4; bl++) {
c.fillRect(W * 0.06 + bl * W * 0.2225, y0, 1.2, H * 0.088);
}
}
c.fillStyle = "#5a2430";
c.font = "italic bold " + Math.round(H / 16) + "px serif";
c.fillText("Somnucor Overture · full score", W * 0.06, H * 0.09);
},
function (g) {
var velvet = thxmVelvet(), deep = thxMat(0x6A1622, null), walnut = thxMat(0x4A2C18, null), brass = thxmBrass();
var cush = thxCyl(0.24, 0.5, velvet, 0, 0.45, -0.02, g, 12);
cush.rotation.z = Math.PI / 2;
cush.scale.set(0.42, 1, 1);
thxBox(0.48, 0.06, 0.42, deep, 0, 0.37, 0, g);
var back = thxCyl(0.62, 0.5, velvet, 0, 0.76, 0.42, g, 16, 0.62);
back.rotation.z = Math.PI / 2;
back.scale.set(0.42, 1, 0.16);
var roll = thxCyl(0.06, 0.5, velvet, 0, 1.06, 0.25, g, 10);
roll.rotation.z = Math.PI / 2;
thxBox(0.44, 0.6, 0.04, deep, 0, 0.76, 0.28, g);
[-0.28, 0.28].forEach(function (ax) { thxBox(0.06, 0.55, 0.46, walnut, ax, 0.3, 0.04, g); var cap = thxCyl(0.035, 0.46, brass, ax, 0.6, 0.04, g, 8); cap.rotation.x = Math.PI / 2; });
thxBox(0.08, 0.035, 0.005, brass, 0, 0.98, 0.312, g);
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var blk = thxMat(0x1A1416, "metal");
thxCyl(0.012, 1.05, blk, 0, 0.53, 0, g, 6);
thxBox(0.5, 0.34, 0.02, blk, 0, 1.12, 0, g).rotation.x = -0.35;
thxBox(0.44, 0.3, 0.005, thxMat(0xF1E6CF, null), 0, 1.12, 0.012, g).rotation.x = -0.35;
return g;
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxBox(0.42, 0.06, 0.42, thxmVelvet(), 0, 0.46, 0, g);
thxBox(0.42, 0.45, 0.05, thxmWalnut(), 0, 0.72, 0.2, g);
[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(function (l) { thxBox(0.03, 0.44, 0.03, thxmBrass(), l[0], 0.22, l[1], g); });
return g;
},
function (x, y, z, ry, big) {
var s = big ? 1.5 : 1, g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.rotation.z = 0.12;
THX.F.add(g);
var wd = thxMat(0x8A4A1E, "wood");
var b1 = thxSph(0.2 * s, wd, 0, 0.32 * s, 0, g, 14);
b1.scale.set(1, 1.15, 0.45);
var b2 = thxSph(0.16 * s, wd, 0, 0.62 * s, 0, g, 14);
b2.scale.set(1, 1.1, 0.45);
thxBox(0.05 * s, 0.55 * s, 0.04 * s, thxMat(0x1A1210, null), 0, 1.0 * s, 0.02, g);
thxBox(0.07 * s, 0.1 * s, 0.05 * s, thxMat(0x2A1810, "wood"), 0, 1.3 * s, 0.02, g);
thxCyl(0.008, 0.25 * s, thxMat(0x8A8A8A, "metal"), 0, 0.06, 0, g, 4);
return g;
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var gold = thxMat(0xD4AF5A, "metal");
thxBox(0.3, 0.12, 0.4, gold, 0, 0.06, 0, g);
var col = thxCyl(0.04, 1.75, gold, 0, 0.95, -0.15, g, 10);
col.rotation.x = 0.04;
var sb = thxBox(0.12, 1.5, 0.14, thxMat(0x9A5A2A, "wood"), 0, 0.85, 0.18, g);
sb.rotation.x = -0.42;
var nk = thxBox(0.06, 0.08, 0.8, gold, 0, 1.75, 0.12, g);
nk.rotation.x = 0.38;
for (var i = 0; i < 9; i++) {
var zz = -0.08 + i * 0.05, top = 1.82 - i * 0.04, bot = 0.3 + i * 0.14;
thxBox(0.004, top - bot, 0.004, thxMat(0xF1E6CF, null), 0, (top + bot) / 2, zz, g);
}
return g;
},
function (x, y, z) {
var cop = thxMat(0xB8703A, "metal");
thxCyl(0.38, 0.5, cop, x, y + 0.55, z, null, 24, 0.22);
thxCyl(0.4, 0.02, thxMat(0xEFE6D6, null), x, y + 0.81, z, null, 24);
thxCyl(0.42, 0.04, thxmBrass(), x, y + 0.8, z, null, 24);
[0, 2.1, 4.2].forEach(function (a) { thxCyl(0.02, 0.4, thxMat(0x2A2A30, "metal"), x + Math.cos(a) * 0.3, y + 0.2, z + Math.sin(a) * 0.3, null, 6); });
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var blk = new THREE.MeshPhongMaterial({ color: 0x0E0A0C, specular: 0x8A7A6A, shininess: 90 });
var sh = new THREE.Shape();
sh.moveTo(-0.75, 0);
sh.lineTo(0.75, 0);
sh.lineTo(0.75, -0.9);
sh.bezierCurveTo(0.75, -1.6, 0.35, -1.75, 0.1, -2.0);
sh.bezierCurveTo(-0.2, -2.4, -0.75, -2.5, -0.75, -2.1);
sh.lineTo(-0.75, 0);
var case_ = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.32, bevelEnabled: false, curveSegments: 16 }), blk);
case_.rotation.x = Math.PI / 2;
case_.position.set(0, 1.0, 0);
g.add(case_);
var lid = new THREE.Mesh(new THREE.ShapeGeometry(sh), blk);
lid.rotation.x = Math.PI / 2;
lid.position.set(0, 1.0, 0);
var lp = new THREE.Group();
lp.position.set(0.75, 1.0, 0);
lid.position.set(-0.75, 0, 0);
lp.add(lid);
lp.rotation.z = 0.55;
g.add(lp);
var lidM = lid.material.clone();
lidM.side = THREE.DoubleSide;
lid.material = lidM;
thxCyl(0.012, 0.62, thxmBrass(), 0.6, 1.28, -1.0, g, 6).rotation.z = 0.2;
thxBox(1.5, 0.06, 0.18, thxMat(0xF4EEE2, null), 0, 0.74, 0.09, g);
for (var k = 0; k < 20; k++)
if ([1, 3, 6, 8, 10].indexOf((k * 2) % 12) > -1 || k % 3 === 1)
thxBox(0.035, 0.04, 0.1, blk, -0.7 + k * 0.074, 0.785, 0.05, g);
thxBox(1.56, 0.1, 0.06, blk, 0, 0.82, -0.02, g);
[[-0.65, -0.15], [0.65, -0.15], [-0.3, -1.9]].forEach(function (l) { thxBox(0.12, 0.68, 0.12, blk, l[0], 0.34, l[1], g); thxSph(0.05, thxmBrass(), l[0], 0.04, l[1], g, 8); });
thxBox(0.3, 0.05, 0.12, thxmBrass(), 0, 0.06, 0.0, g);
thxBox(0.8, 0.06, 0.35, thxmVelvet(), 0, 0.5, 0.62, g);
thxBox(0.8, 0.44, 0.3, blk, 0, 0.24, 0.62, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x - s * 1.1, z - c * 1.1, 0.85, 1.2, y, 1.4);
return g;
},
function (x, y, z, lite) {
var brass = thxmBrass(), glow = thxGlow(0xFFE2A8), n = lite ? 8 : 14;
thxCyl(0.012, 0.6, brass, x, y + 0.4, z, null, 6);
var r1 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.03, 6, lite ? 24 : 40), brass);
r1.rotation.x = Math.PI / 2;
r1.position.set(x, y, z);
THX.F.add(r1);
var r2 = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 6, lite ? 16 : 28), brass);
r2.rotation.x = Math.PI / 2;
r2.position.set(x, y - 0.25, z);
THX.F.add(r2);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
thxSph(0.045, glow, x + Math.cos(a) * 0.75, y + 0.08, z + Math.sin(a) * 0.75, null, 8);
if (i % 2 === 0 && !lite)
thxSph(0.03, thxMat(0xE8F0FF, null, { op: 0.6 }), x + Math.cos(a) * 0.75, y - 0.12, z + Math.sin(a) * 0.75, null, 6);
}
for (var j = 0; j < 6; j++) {
var b = j / 6 * Math.PI * 2;
thxSph(0.04, glow, x + Math.cos(b) * 0.42, y - 0.17, z + Math.sin(b) * 0.42, null, 8);
}
thxSph(0.12, thxMat(0xE8F0FF, null, { op: 0.5 }), x, y - 0.4, z, null, 10);
},
function (F) {
var lite = THX.lite, wine = thxmWine(), walnut = thxmWalnut(), brass = thxmBrass(), velvet = thxmVelvet(), dark = thxMat(0x1A1014, null), cream = thxMat(0xEFE2C8, "plaster");
THXM.frame = F;
THXM.lights = [];
THXM.players = [];
var rooms = thxRoomRow(F, [{ n: "Recording Booth", w: 7, glassy: 1 }, { n: "Control Room", w: 8, glassy: 1 }, { n: "Instrument Hall", w: 9 }, { n: "Rehearsal Room", w: 8 }, { n: "Green Room", w: 6 }], "n", { wall: 0x5A2430, depth: 7 });
rooms.forEach(function (r) {
var k = r.R.n;
if (k === "Recording Booth") {
for (var fx = 0; fx < (lite ? 3 : 6); fx++)
for (var fy = 0; fy < 3; fy++) {
var p = thxBox(0.6, 0.6, 0.08, thxMat(fy % 2 ? 0x3A1620 : 0x4A1C28, null), r.x0 + 0.6 + fx * 0.75, 0.9 + fy * 0.7, r.z0 + 0.05);
p.rotation.z = (fx + fy) % 2 ? 0 : Math.PI / 2;
}
thxCyl(0.18, 0.03, dark, r.cx, 0.015, r.cz, null, 16);
thxCyl(0.015, 1.55, thxMat(0x2A2A30, "metal"), r.cx, 0.8, r.cz, null, 6);
var mic = thxCyl(0.05, 0.18, thxMat(0x8A8A90, "metal"), r.cx, 1.62, r.cz + 0.05, null, 12);
mic.rotation.x = 0.3;
thxSph(0.055, thxMat(0x3A3A40, "metal"), r.cx, 1.72, r.cz + 0.08, null, 10);
var pop = new THREE.Mesh(new THREE.CircleGeometry(0.11, 20), thxMat(0x14101C, null, { op: 0.6, ds: 1 }));
pop.position.set(r.cx, 1.7, r.cz + 0.28);
THX.F.add(pop);
thxSph(0.07, dark, r.x1 - 0.3, 1.5, r.z0 + 0.3, null, 8);
thxSph(0.07, dark, r.x1 - 0.3, 1.5, r.z0 + 0.45, null, 8);
thxScreen(0.8, 0.5, r.x1 - 0.2, 1.6, r.cz, -Math.PI / 2, function (c, W, H) { thxText(c, ["ON AIR", "quiet please"], W, H, { head: "#FF6A6A", bg: "#1A0C10" }); });
thxPerson("singer", r.cx + 0.2, r.cz + 0.9, Math.PI, { title: "session singer", doing: "warming up for the choir part of the new overture", about: "You sing for the Composer's Studio on L38: solos, the choir parts, the little hummed tunes in the dream worlds." });
}
else if (k === "Control Room") {
thxBox(r.x1 - r.x0 - 1.2, 0.9, 1.0, walnut, r.cx, 0.45, r.cz + 0.2);
thxSolid(r.cx, r.cz + 0.2, (r.x1 - r.x0 - 1.2) / 2, 0.5, 0, 1.0);
var desk = thxBox(r.x1 - r.x0 - 1.3, 0.03, 0.85, thxMat(0x241A20, null), r.cx, 0.92, r.cz + 0.2);
desk.rotation.x = -0.12;
for (var f = 0; f < (lite ? 12 : 24); f++) {
var fxp = r.x0 + 0.9 + f * ((r.x1 - r.x0 - 1.8) / (lite ? 12 : 24));
thxBox(0.03, 0.02, 0.12, thxMat([0xE8C27A, 0xD9737F, 0x7FB3D9, 0xEFE6D6][f % 4], null), fxp, 0.95, r.cz + 0.35);
thxSph(0.018, thxGlow([0x6FCF97, 0xF2C94C][f % 2]), fxp, 0.95, r.cz, null, 6);
}
[r.x0 + 0.7, r.x1 - 0.7].forEach(function (sx) { thxBox(0.35, 0.55, 0.32, dark, sx, 1.25, r.cz - 0.2); thxCyl(0.12, 0.02, thxMat(0x3A3A40, "metal"), sx, 1.15, r.cz - 0.03, null, 16).rotation.x = Math.PI / 2; thxCyl(0.05, 0.02, thxMat(0x3A3A40, "metal"), sx, 1.4, r.cz - 0.03, null, 12).rotation.x = Math.PI / 2; });
thxScreen(1.6, 0.9, r.cx, 1.75, r.z0 + 0.1, 0, function (c, W, H) { thxmDrawMixer(c, W, H); }, null, 128);
thxChair(r.cx, 0, r.cz + 1.5, Math.PI, 0x5A2430);
thxPerson("eng", r.cx - 1.2, r.cz + 1.7, Math.PI * 0.9, { title: "recording engineer", doing: "setting the levels for a choir take", about: "You record and mix in the Control Room on L38: microphones, levels, the hall's echo, the final master." });
}
else if (k === "Instrument Hall") {
for (var gi = 0; gi < (lite ? 3 : 6); gi++) {
var gx2 = r.x0 + 0.7 + gi * 0.9, gg = new THREE.Group();
gg.position.set(gx2, 1.4, r.z0 + 0.12);
THX.F.add(gg);
var body = thxSph(0.2, thxMat([0xB8703A, 0x6A3A1A, 0x8A4A1E][gi % 3], "wood"), 0, -0.2, 0, gg, 12);
body.scale.set(1, 1.2, 0.25);
thxBox(0.05, 0.55, 0.03, thxMat(0x2A1810, null), 0, 0.25, 0, gg);
}
for (var vi = 0; vi < (lite ? 2 : 4); vi++) {
var vb = thxSph(0.1, thxMat(0x9A5A2A, "wood"), r.x1 - 0.6 - vi * 0.5, 2.2, r.z0 + 0.12, null, 10);
vb.scale.set(0.8, 1.3, 0.3);
}
var dk = r.cx + 1.4, dz = r.cz + 0.6;
thxCyl(0.28, 0.4, thxMat(0x7A1E2E, null), dk, 0.28, dz, null, 18).rotation.x = Math.PI / 2;
thxCyl(0.17, 0.16, thxMat(0xD8D8DC, "metal"), dk - 0.45, 0.65, dz + 0.15, null, 16);
thxCyl(0.14, 0.2, thxMat(0x7A1E2E, null), dk + 0.4, 0.7, dz, null, 14);
[[-0.6, 1.05], [0.65, 1.15]].forEach(function (cy) { thxCyl(0.01, cy[1], thxMat(0x8A8A90, "metal"), dk + cy[0], cy[1] / 2, dz - 0.2, null, 6); thxCyl(0.24, 0.01, thxMat(0xD4AF5A, "metal"), dk + cy[0], cy[1], dz - 0.2, null, 20); });
thxSolid(dk, dz, 0.8, 0.5, 0, 1.1);
thxmCello(r.x0 + 0.9, 0, r.cz + 1.4, 0.4, true);
thxmCello(r.x0 + 1.6, 0, r.cz + 1.5, -0.2, false);
thxPerson("luth", r.cx - 0.6, r.cz + 1.6, Math.PI, { title: "instrument keeper", doing: "tuning the studio's cellos before tonight", about: "You look after every instrument in the Composer's Studio: strings, horns, drums, the concert grand and the harp." });
}
else if (k === "Rehearsal Room") {
thxBox(1.4, 1.25, 0.6, thxMat(0x3A2014, "wood"), r.cx, 0.63, r.z0 + 0.45);
thxBox(1.3, 0.05, 0.25, thxMat(0xF4EEE2, null), r.cx, 0.8, r.z0 + 0.85);
thxSolid(r.cx, r.z0 + 0.55, 0.7, 0.45, 0, 1.3);
for (var ci = 0; ci < (lite ? 3 : 6); ci++) {
var a = Math.PI * 0.2 + ci / (lite ? 3 : 6) * Math.PI * 0.6, cx2 = r.cx + Math.cos(a) * 2.0, cz2 = r.cz + 1.0 + Math.sin(a) * 1.2;
thxmChair(cx2, 0, cz2, -a - Math.PI / 2 + Math.PI);
if (ci % 2 === 0)
thxmStand(cx2 - Math.cos(a) * 0.6, 0, cz2 - Math.sin(a) * 0.5, -a - Math.PI / 2 + Math.PI);
}
thxScreen(1.4, 0.7, r.x1 - 0.15, 1.6, r.cz, -Math.PI / 2, function (c, W, H) { thxText(c, ["TONIGHT'S REHEARSAL", "7 pm · the Overture, then the Lantern Waltz"], W, H, { head: "#E8C27A", bg: "#1F161C" }); });
}
else if (k === "Green Room") {
thxBox(1.6, 1.0, 0.04, thxMat(0xCFD8E0, "metal"), r.cx, 1.5, r.z0 + 0.08);
for (var mb = 0; mb < 10; mb++) {
var t2 = mb / 10;
thxSph(0.04, thxGlow(0xFFE8C0), r.cx - 0.8 + (mb < 5 ? t2 * 2 * 1.6 : 1.6), mb < 5 ? 2.02 : 1.0 + (t2 - 0.5) * 2 * 1.0, r.z0 + 0.1, null, 8);
}
thxSofa(r.cx, 0, r.z1 - 0.7, Math.PI, 2.0, 0x8A1E2E);
thxCyl(0.1, 0.3, thxMat(0xEFE6D6, null), r.x0 + 0.5, 0.95, r.z0 + 0.5, null, 10);
thxSph(0.2, thxMat(0xD9737F, null), r.x0 + 0.5, 1.25, r.z0 + 0.5, null, 10);
thxTable(r.x0 + 0.6, 0, r.z0 + 0.5, 0.6, 0.6, walnut);
}
});
thxBox(1.6, 0.012, 13, thxMat(0x6A1622, null), 0, 0.007, 1.5);
thxBox(30, 0.012, 1.4, thxMat(0x6A1622, null), 0, 0.007, -3.3);
thxBox(20, 0.014, 0.08, brass, 0, 0.008, 9.2);
var sz0 = -12.6, sz1 = -5.2, sw = 10.5, sh = 0.6;
thxBox(sw * 2, sh, sz1 - sz0, walnut, 0, sh / 2, (sz0 + sz1) / 2);
thxBox(sw * 2 + 0.1, 0.05, 0.12, brass, 0, sh, sz1);
thxFloorAt(-sw, sz0, sw, sz1, sh);
var apr = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, sh, 40, 1, false, -Math.PI / 2, Math.PI), walnut);
apr.position.set(0, sh / 2, sz1);
apr.scale.z = 0.35;
THX.F.add(apr);
thxFloorAt(-4.3, sz1, 4.3, sz1 + 1.3, sh);
[-1, 1].forEach(function (sd) { for (var st = 0; st < 3; st++) {
var y = (st + 1) * sh / 3;
thxBox(1.4, y, 0.35, walnut, sd * (sw - 0.9), y / 2, sz1 + 1.05 - st * 0.35);
thxFloorAt(sd * (sw - 0.9) - 0.7, sz1 + 0.88 - st * 0.35, sd * (sw - 0.9) + 0.7, sz1 + 1.22 - st * 0.35, y);
} });
thxSolid(0, sz1 + 0.15, sw - 1.7, 0.2, 0, sh - 0.05);
for (var fl = 0; fl < (lite ? 8 : 16); fl++) {
var fxp2 = -sw + 0.8 + fl * ((sw * 2 - 1.6) / ((lite ? 8 : 16) - 1));
thxBox(0.18, 0.06, 0.1, brass, fxp2, sh + 0.03, sz1 - 0.08);
thxBox(0.14, 0.03, 0.04, thxGlow(0xFFE2A8), fxp2, sh + 0.06, sz1 - 0.04);
}
var gold = thxMat(0xD4AF5A, "metal", { e: 0x3A2A08, ei: 0.3 });
[-1, 1].forEach(function (sd) {
thxBox(0.9, 4.0, 0.9, wine, sd * (sw + 0.45), 2.0, sz1 - 0.4);
thxBox(1.0, 0.1, 1.0, gold, sd * (sw + 0.45), 3.95, sz1 - 0.4);
thxBox(1.0, 0.2, 1.0, gold, sd * (sw + 0.45), 0.1, sz1 - 0.4);
for (var fl2 = 0; fl2 < 3; fl2++)
thxBox(0.06, 3.6, 0.06, gold, sd * (sw + 0.45) + (fl2 - 1) * 0.25, 2.0, sz1 + 0.06);
thxSolid(sd * (sw + 0.45), sz1 - 0.4, 0.45, 0.45, 0, 4);
for (var cf = 0; cf < (lite ? 4 : 7); cf++) {
var cx3 = sd * (sw - 0.25 - cf * 0.32), wv = thxCyl(0.17, 3.7 - cf * 0.2, velvet, cx3, 2.15 + cf * 0.1, sz1 - 0.75, null, 10);
wv.scale.z = 0.6;
}
thxCyl(0.05, 0.9, gold, sd * (sw - 1.0), 1.3, sz1 - 0.6, null, 8).rotation.z = Math.PI / 2;
});
thxBox(sw * 2 + 1.8, 0.75, 0.9, wine, 0, 3.82, sz1 - 0.4);
thxBox(sw * 2 + 1.9, 0.08, 1.0, gold, 0, 3.46, sz1 - 0.4);
thxBox(sw * 2 + 1.9, 0.08, 1.0, gold, 0, 4.18, sz1 - 0.4);
thxBox(sw * 2, 0.45, 0.14, velvet, 0, 3.2, sz1 - 0.7);
thxBox(sw * 2, 0.06, 0.16, gold, 0, 2.96, sz1 - 0.7);
for (var sv = 0; sv < (lite ? 5 : 11); sv++) {
var vx = -sw + 0.8 + sv * ((sw * 2 - 1.6) / ((lite ? 5 : 11) - 1));
thxCyl(0.035, 0.22, gold, vx, 2.82, sz1 - 0.64, null, 8, 0.06);
thxSph(0.045, gold, vx, 2.95, sz1 - 0.64, null, 8);
}
thxSign(["THE CONCERT HALL", "SOMNUCOR · L38"], 4.2, 0.5, "#2A0E16", "#E8C27A", 0, 3.82, sz1 + 0.06, 0);
thxBox(sw * 2, 4.0, 0.2, wine, 0, 2.0, sz0 + 0.1);
thxSolid(0, sz0 + 0.1, sw, 0.15, 0, 4);
var np = lite ? 13 : 25;
for (var pi = 0; pi < np; pi++) {
var px = -5.6 + pi * (11.2 / (np - 1)), d = Math.abs(pi - (np - 1) / 2) / ((np - 1) / 2), ph = 3.3 - d * 1.6 + (pi % 2) * 0.15;
thxCyl(0.14, ph, gold, px, sh + 0.4 + ph / 2, sz0 + 0.45, null, 12);
thxCyl(0.15, 0.12, thxMat(0x2A1A10, null), px, sh + 0.75, sz0 + 0.53, null, 12);
}
thxBox(12, 0.4, 0.6, walnut, 0, sh + 0.2, sz0 + 0.45);
var rings = lite ? [[3.2, 5]] : [[3.0, 6], [4.6, 8]];
rings.forEach(function (R2) {
for (var ci2 = 0; ci2 < R2[1]; ci2++) {
var a2 = Math.PI * 0.12 + ci2 / (R2[1] - 1) * Math.PI * 0.76, cx4 = Math.cos(a2) * R2[0], cz4 = sz1 - 0.6 - Math.sin(a2) * R2[0] * 0.72;
var face = Math.atan2(-cx4, (sz1 + 0.6) - cz4);
thxmChair(cx4, sh, cz4, face + Math.PI);
thxmStand(cx4 + Math.sin(face) * 0.6, sh, cz4 + Math.cos(face) * 0.6, face + Math.PI);
}
});
thxCyl(0.45, 0.25, walnut, 0, sh + 0.125, sz1 - 0.3, null, 20);
thxCyl(0.47, 0.03, brass, 0, sh + 0.26, sz1 - 0.3, null, 20);
thxmStand(0, sh + 0.25, sz1 - 0.75, Math.PI);
thxCyl(0.006, 0.4, thxMat(0xEFE6D6, null), 0.12, sh + 1.42, sz1 - 0.8, null, 4).rotation.z = 0.5;
thxmPiano(-6.6, sh, sz1 - 1.4, 0.35);
thxmHarp(6.2, sh, sz1 - 2.0, -0.5);
[-1.3, -0.4, 0.5, 1.4].forEach(function (tx, ti) { if (lite && ti % 2)
return; thxmTimpani(tx, sh, sz0 + 2.2); });
thxmCello(-2.6, sh, sz1 - 1.6, 0.6, false);
thxmCello(2.6, sh, sz1 - 1.6, -0.6, false);
thxmCello(-4.6, sh, sz1 - 3.3, 0.4, true);
var cast = [["cond", 0, sz1 - 0.25, Math.PI, "conductor", "ready on the podium for the overture", "You conduct the Somnucor Concert Hall orchestra on L38. You know every score the Composer's Studio writes and you love a quiet beginning that grows."],
["pianist", -6.0, sz1 - 0.4, Math.PI * 0.95, "concert pianist", "at the grand, turning to the first page", "You play the concert grand on the stage of the Somnucor Concert Hall, and you help the composers try out their themes."],
["harpist", 5.6, sz1 - 1.5, Math.PI * 1.1, "harpist", "tuning the last strings of the harp", "You play the concert harp in the Somnucor Concert Hall orchestra."],
["violin", -3.0, sz1 - 2.8, Math.PI * 0.85, "first violin", "leading the strings", "You lead the strings of the Somnucor Concert Hall orchestra, first violin and leader."],
["timp", 0.9, sz0 + 2.9, Math.PI, "timpanist", "at the kettle drums", "You play the timpani and the big drums of the orchestra: the thunder under the music."]];
cast.forEach(function (c, i) { if (lite && (i === 3 || i === 4))
return; var P = thxPerson(c[0], c[1], c[2], c[3], { title: c[4], doing: c[5], about: c[6], y: sh }); if (P)
THXM.players.push({ P: P, y: sh, i: i, ry: c[3] }); });
if (!lite)
[[-4, sz1 - 2.6], [0, sz1 - 1.8], [4, sz1 - 2.6]].forEach(function (L) {
thxCyl(0.1, 0.3, brass, L[0], 4.05, L[1] + 3.6, null, 10);
var cone = new THREE.Mesh(new THREE.ConeGeometry(1.4, 4.2, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE6B0, transparent: true, opacity: 0.04, depthWrite: false, side: THREE.DoubleSide }));
cone.position.set(L[0], 2.4, L[1] + 1.8);
cone.lookAt(L[0], sh, L[1]);
cone.rotateX(Math.PI / 2);
cone.userData.keep = 1;
THX.F.add(cone);
THXM.lights.push(cone);
});
thxSpot(0, sz1 + 2.2, 2.4, "🎻 The concert stage", "start or end the concert", function () { thxmConcert(); });
var rows = lite ? 3 : 6, per = lite ? 4 : 7;
for (var ro = 0; ro < rows; ro++) {
var rz = -1.6 + ro * 1.25, rise = 0;
[-1, 1].forEach(function (sd) {
var x0 = sd * 1.2, step = 0.62;
for (var se = 0; se < per; se++) {
var sx = sd * (1.25 + se * step + ro * 0.08), sg2 = new THREE.Group();
sg2.position.set(sx, rise, rz);
THX.F.add(sg2);
thxSeat(sg2);
}
var xa = sd * 1.0, xb = sd * (1.25 + (per - 1) * step + ro * 0.08 + 0.35);
thxSolid((xa + xb) / 2, rz + 0.05, Math.abs(xb - xa) / 2, 0.32, 0, 1.05);
});
}
[-12.5, 12.5].forEach(function (sx) { thxBox(0.12, 1.0, 8.5, walnut, sx, 0.5, 1.6); thxBox(0.16, 0.06, 8.6, brass, sx, 1.02, 1.6); });
(lite ? [[0, 1.2]] : [[-6, 0.5], [0, 1.2], [6, 0.5]]).forEach(function (c) { thxmChandelier(c[0], 3.3, c[1], lite); });
thxSign(["STALLS", "please take your seats"], 2.0, 0.36, "#2A0E16", "#E8C27A", 0, 0.55, 8.2, Math.PI);
var cx0 = -17.5, cz0 = 1.5;
for (var d = -3; d <= 3; d++) {
var a3 = d * 0.17, R0 = 4.0, rx = cx0 + (1 - Math.cos(a3)) * R0 * -1, rz2 = cz0 + Math.sin(a3) * R0;
var seg = thxBox(0.85, 0.05, 1.3, walnut, rx, 0.76, rz2);
seg.rotation.y = -a3;
var front = thxBox(0.05, 0.72, 1.3, wine, rx + Math.cos(a3) * 0.4, 0.38, rz2 + Math.sin(a3) * 0.4 * -1);
front.rotation.y = -a3;
var trim = thxBox(0.06, 0.03, 1.3, brass, rx + Math.cos(a3) * 0.43, 0.74, rz2 - Math.sin(a3) * 0.43);
trim.rotation.y = -a3;
}
thxSolid(cx0 + 0.2, cz0, 0.55, 4.1, 0, 1.0);
thxBox(6.9, 0.012, 8.4, thxMat(0x4A1420, null), cx0 + 0.55, 0.008, cz0);
thxBox(6.7, 0.014, 0.08, gold, cx0 + 0.55, 0.009, cz0 - 4.0);
thxBox(6.7, 0.014, 0.08, gold, cx0 + 0.55, 0.009, cz0 + 4.0);
thxBox(0.08, 0.014, 8.0, gold, cx0 + 3.9, 0.009, cz0);
thxBox(0.08, 0.014, 8.0, gold, cx0 - 2.8, 0.009, cz0);
thxScreen(2.0, 1.15, cx0 - 2.27, 1.85, cz0 - 2.45, Math.PI / 2, function (c, W, H) { thxmDrawScore(c, W, H); }, null, 160);
var roll = thxScreen(2.4, 1.35, cx0 - 2.27, 1.9, cz0, Math.PI / 2, function (c, W, H) { thxmDrawRoll(c, W, H, 0); }, null, 160);
thxScreen(2.0, 1.15, cx0 - 2.27, 1.85, cz0 + 2.45, Math.PI / 2, function (c, W, H) { thxmDrawMixer(c, W, H); }, null, 160);
roll.userData.t = 0;
THX.fx.push(function (dt, t) { roll.userData.t += dt; if (roll.userData.t > 0.5) {
roll.userData.t = 0;
roll.userData.redraw(function (c, W, H) { thxmDrawRoll(c, W, H, t); });
} });
thxBox(0.32, 0.05, 1.2, thxMat(0x1A1416, null), cx0 - 0.12, 0.8, cz0);
thxBox(0.14, 0.02, 1.12, thxMat(0xF4EEE2, null), cx0 - 0.2, 0.83, cz0);
for (var kk = 0; kk < 16; kk++)
if ([1, 2, 4, 5, 6].indexOf(kk % 7) > -1)
thxBox(0.07, 0.02, 0.035, thxMat(0x1A1416, null), cx0 - 0.17, 0.85, cz0 - 0.52 + kk * 0.07);
[-2.9, 2.9].forEach(function (o) { thxBox(0.36, 0.6, 0.32, dark, cx0 + 0.05, 1.1, cz0 + o); thxCyl(0.12, 0.02, thxMat(0x3A3A40, "metal"), cx0 - 0.12, 1.0, cz0 + o, null, 16).rotation.z = Math.PI / 2; thxCyl(0.05, 0.02, thxMat(0xC9A45C, "metal"), cx0 - 0.12, 1.26, cz0 + o, null, 12).rotation.z = Math.PI / 2; });
var ch = new THREE.Group();
ch.position.set(cx0 - 1.0, 0, cz0);
ch.rotation.y = -Math.PI / 2;
THX.F.add(ch);
thxBox(0.62, 0.12, 0.6, velvet, 0, 0.5, 0, ch);
thxBox(0.62, 0.85, 0.12, velvet, 0, 0.98, 0.28, ch);
thxBox(0.08, 0.3, 0.5, thxMat(0x4A1220, null), -0.34, 0.68, 0, ch);
thxBox(0.08, 0.3, 0.5, thxMat(0x4A1220, null), 0.34, 0.68, 0, ch);
thxCyl(0.05, 0.42, brass, 0, 0.24, 0, ch, 8);
thxCyl(0.32, 0.03, dark, 0, 0.02, 0, ch, 16);
thxCyl(0.08, 0.02, brass, cx0, 0.8, cz0 - 3.4, null, 12);
thxCyl(0.01, 0.4, brass, cx0, 1.0, cz0 - 3.4, null, 6);
thxCyl(0.14, 0.14, brass, cx0, 1.24, cz0 - 3.4, null, 16, 0.05);
thxSph(0.04, thxGlow(0xFFE2A8), cx0, 1.2, cz0 - 3.4, null, 8);
thxSign(["THE COMPOSER'S STUDIO", "sit behind the console and press E to write, record, mix and send music"], 3.4, 0.5, "#2A0E16", "#E8C27A", cx0 + 0.47, 0.42, cz0, Math.PI / 2);
thxSpot(cx0 - 1.1, cz0, 1.8, "🎼 The composer's console", "open the Composer's Studio", function () { thxmOpenComposer(""); });
thxBox(0.2, 3.4, 10, wine, cx0 - 2.4, 1.7, cz0);
thxSolid(cx0 - 2.4, cz0, 0.12, 5, 0, 3.4);
[-4.25, 4.25].forEach(function (o, i) { thxScreen(0.9, 1.2, cx0 - 2.27, 1.85, cz0 + o, Math.PI / 2, function (c, W, H) { thxmDrawScore(c, W, H); c.strokeStyle = "#C9A45C"; c.lineWidth = 10; c.strokeRect(5, 5, W - 10, H - 10); }, null, 96); });
thxPerson("composer", cx0 + 2.2, cz0 + 2.6, -Math.PI / 2 * 1.4, { title: "film and game composer", doing: "humming a theme for the Kids Zone while the strings play it back", about: "You write music for SomnuMatrix in the Composer's Studio on L38: themes for the worlds, songs, fanfares, the concert hall's evenings. You love a tune people can hum." });
var lx = 17.5;
thxBox(0.2, 3.4, 10, wine, lx + 5.2, 1.7, 1.5);
thxSolid(lx + 5.2, 1.5, 0.12, 5, 0, 3.4);
thxBox(0.1, 2.6, 6.2, walnut, lx + 5.05, 1.5, 1.5);
for (var rr = 0; rr < (lite ? 3 : 5); rr++)
for (var rc = 0; rc < (lite ? 6 : 11); rc++) {
thxBox(0.03, 0.34, 0.34, thxMat([0xE8C27A, 0x8A1E2E, 0x2E3E52, 0x3E6A5A, 0xC98FB4, 0xB8703A, 0x6B4E8C, 0xEFE2C8][(rr * 3 + rc) % 8], null), lx + 4.98, 0.6 + rr * 0.48, -1.2 + rc * (lite ? 0.9 : 0.52));
}
thxBox(6, 0.015, 5, thxMat(0x4A1420, null), lx, 0.009, 1.5);
thxSofa(lx - 1.6, 0, 1.5, Math.PI / 2, 2.6, 0x8A1E2E);
thxSofa(lx + 2.0, 0, 4.4, Math.PI, 2.4, 0x6B4E8C);
thxBox(1.4, 0.4, 0.8, walnut, lx + 0.4, 0.2, 1.5);
thxSolid(lx + 0.4, 1.5, 0.7, 0.4, 0, 0.45);
var gx3 = lx + 0.4, gz3 = 1.4;
thxBox(0.4, 0.16, 0.4, thxMat(0x3A2014, "wood"), gx3, 0.48, gz3);
var rec = thxCyl(0.17, 0.01, thxMat(0x14101C, null), gx3, 0.565, gz3, null, 24);
rec.userData.keep = 1;
thxCyl(0.05, 0.012, thxMat(0x8A1E2E, null), gx3, 0.568, gz3, null, 12);
THX.fx.push(function (dt) { rec.rotation.y += dt * 3.5; });
var horn = thxCyl(0.03, 0.6, brass, gx3 + 0.1, 0.9, gz3 - 0.1, null, 16, 0.28);
horn.rotation.z = -0.7;
horn.rotation.x = 0.3;
[-2.3, 5.3].forEach(function (o) {
thxBox(0.6, 1.4, 0.5, thxMat(0x3A2014, "wood"), lx + 4.6, 0.7, o);
thxSolid(lx + 4.6, o, 0.3, 0.25, 0, 1.4);
thxCyl(0.2, 0.03, dark, lx + 4.33, 0.55, o, null, 20).rotation.z = Math.PI / 2;
thxCyl(0.09, 0.03, dark, lx + 4.33, 1.1, o, null, 14).rotation.z = Math.PI / 2;
});
thxSpot(lx + 0.4, 2.6, 1.8, "🎶 The listening lounge", "hear what plays in the worlds", function () { thxmOpenComposer("sound"); });
[[lx - 3, 4.6], [lx + 4.4, -2.0]].forEach(function (p) { thxCyl(0.03, 1.6, brass, p[0], 0.8, p[1], null, 6); thxCyl(0.25, 0.3, thxMat(0xEFE2C8, null, { e: 0xFFE2A8, ei: 0.6 }), p[0], 1.7, p[1], null, 16, 0.2); thxCyl(0.18, 0.03, dark, p[0], 0.015, p[1], null, 12); thxRound(p[0], p[1], 0.2, 1.8); });
thxPlant(lx + 4.6, 0, 6.6, 1);
thxPlant(lx - 3.4, 0, -2.2, 1);
thxPlant(-21.5, 0, 7, 1);
thxPlant(21.5, 0, 8, 1);
thxPerson("archivist", lx + 1.4, 4.0, Math.PI * 1.2, { title: "music librarian", doing: "filing last night's concert recordings", about: "You keep the music library of the Composer's Studio: every score, every recording, what plays in which world.", wander: lite ? 0 : 1.0 });
if (!lite) {
[[0, -8, 3.6, 0xFFE2B0, 5, 14], [0, 2, 3.2, 0xFFD8A0, 4, 12], [-17, 1.5, 3.0, 0xFFE2B0, 3, 10], [17, 1.5, 3.0, 0xFFD0A0, 3, 10]].forEach(function (L) {
var pl = new THREE.PointLight(L[3], L[4] * 0.25, L[5], 2);
pl.position.set(L[0], L[2], L[1]);
pl.userData.keep = 1;
THX.F.add(pl);
});
}
THX.fx.push(thxmTick);
},
function (dt, t) {
var on = THXM.on;
THXM.lights.forEach(function (c, i) { var want = on ? 0.14 + 0.03 * Math.sin(t * 0.7 + i) : 0.04; c.material.opacity += (want - c.material.opacity) * Math.min(1, dt * 1.5); });
if (on)
THXM.players.forEach(function (p) { var g = p.P && p.P.g; if (!g)
return; g.rotation.y = p.ry + Math.sin(t * 1.6 + p.i) * 0.06; g.position.y = p.y + Math.abs(Math.sin(t * 3.1 + p.i * 0.7)) * 0.015; });
},
function (quiet) {
THXM.on = false;
clearInterval(THXM.timer);
THXM.timer = 0;
if (THXM.audio) {
try {
THXM.audio.pause();
THXM.audio.src = "";
}
catch (e) { }
THXM.audio = null;
}
if (THXM.ctx) {
try {
THXM.ctx.close();
}
catch (e) { }
THXM.ctx = null;
}
THXM.players.forEach(function (p) { if (p.P && p.P.g) {
p.P.g.rotation.y = p.ry;
p.P.g.position.y = p.y;
} });
if (!quiet)
thxSay("🎻 The concert ends. The orchestra bows.");
},
function () {
if (THXM.on) {
thxmStop();
return;
}
var url = null;
try {
var c = typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config.world_sound;
url = c && c.track && typeof c.track.concert === "string" && /^https:\/\//.test(c.track.concert) ? c.track.concert : null;
}
catch (e) { }
THXM.on = true;
if (url) {
try {
var a = new Audio();
a.src = url;
a.loop = true;
a.crossOrigin = "anonymous";
a.volume = 0.85;
a.play().catch(function () { });
THXM.audio = a;
}
catch (e) {
url = null;
}
}
if (!url)
thxmOverture();
thxSay("🎻 <b>The concert begins.</b> " + (url ? "Tonight: the piece the Keeper chose for the Concert Hall." : "Tonight: the studio's own Somnucor Overture.") + " Press E at the stage again to end it.");
THXM.timer = setInterval(function () {
if (!THX.F || THX.floor !== "music") {
thxmStop(true);
return;
}
try {
if (typeof SND !== "undefined" && SND.music)
SND.music.concert = performance.now();
}
catch (e) { }
}, 500);
},
function () {
var AC = window.AudioContext || window.webkitAudioContext;
if (!AC)
return;
var ctx = new AC();
THXM.ctx = ctx;
var out = ctx.createGain();
out.gain.value = 0.5;
var comp = ctx.createDynamicsCompressor();
out.connect(comp);
comp.connect(ctx.destination);
var rev = ctx.createConvolver(), n = Math.floor(ctx.sampleRate * 2.6), ir = ctx.createBuffer(2, n, ctx.sampleRate);
for (var ch = 0; ch < 2; ch++) {
var d = ir.getChannelData(ch);
for (var i = 0; i < n; i++)
d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6);
}
rev.buffer = ir;
var rg = ctx.createGain();
rg.gain.value = 0.35;
rev.connect(rg);
rg.connect(comp);
var spb = 60 / 92, chords = [[50, 53, 57], [46, 50, 53], [53, 57, 60], [48, 52, 55], [50, 53, 57], [46, 50, 53], [43, 46, 50], [45, 49, 52]];
var mel = [[69, 1], [72, 1], [77, 2], [76, 1], [74, 1], [72, 2], [76, 1.5], [74, 0.5], [72, 1], [67, 1], [72, 2], [76, 2], [77, 2], [76, 1], [74, 1], [81, 3], [79, 1], [77, 1], [74, 1], [70, 2], [74, 1], [77, 1], [82, 2], [81, 1.5], [79, 0.5], [77, 1], [74, 1], [79, 2], [82, 2], [81, 3], [79, 1], [76, 1], [73, 1], [69, 2]];
function f(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function note(type, m, t, dur, lvl, att, rel, cut) {
var o = ctx.createOscillator();
o.type = type;
o.frequency.value = f(m);
var g = ctx.createGain(), lp = ctx.createBiquadFilter();
lp.type = "lowpass";
lp.frequency.value = cut;
g.gain.setValueAtTime(0, t);
g.gain.linearRampToValueAtTime(lvl, t + att);
g.gain.setTargetAtTime(0, t + dur, rel / 3);
o.connect(lp);
lp.connect(g);
g.connect(out);
g.connect(rev);
o.start(t);
o.stop(t + dur + rel * 1.5);
}
var t0 = ctx.currentTime + 0.2, loopLen = 64 * spb;
function lap(T) {
chords.forEach(function (c, ci) {
var b = T + ci * 8 * spb;
c.forEach(function (p) { note("sawtooth", p + 12, b, 8 * spb, 0.025, 0.5, 1.0, 1800); note("sawtooth", p + 12.08, b, 8 * spb, 0.02, 0.5, 1.0, 1600); });
var arp = [c[0], c[1], c[2], c[0] + 12, c[1] + 12, c[2] + 12, c[0] + 24, c[2] + 12];
for (var k = 0; k < 16; k++)
note("triangle", arp[k % 8] + 12, b + k * 0.5 * spb, 0.5 * spb, 0.07, 0.004, 1.2, 4000);
var r = c[0];
while (r > 45)
r -= 12;
note("sawtooth", r, b, 4 * spb, 0.05, 0.12, 0.5, 700);
note("sawtooth", r + 7, b + 4 * spb, 4 * spb, 0.04, 0.12, 0.5, 700);
});
var at = T + 16 * spb;
mel.forEach(function (m) { note("sine", m[0], at, m[1] * spb * 0.95, 0.09, 0.06, 0.25, 6000); at += m[1] * spb; });
}
lap(t0);
var next = t0 + loopLen;
(function more() { if (THXM.ctx !== ctx)
return; if (ctx.currentTime > next - 6) {
lap(next);
next += loopLen;
} setTimeout(more, 2000); })();
},
function (tab) {
try {
if (typeof renderer !== "undefined" && renderer.xr && renderer.xr.isPresenting) {
thxSay("🎼 The Composer's Studio is made for a PC screen, mouse and keys. Take off the headset and open <b>compose.html</b> on a computer.");
return;
}
}
catch (e) { }
if (document.getElementById("thxm-studio"))
return;
if (THXM.on)
thxmStop(true);
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
if (typeof worldCard === "function")
worldCard(null);
if (typeof worldPrompt === "function")
worldPrompt(null);
var d = document.createElement("div");
d.id = "thxm-studio";
d.style.cssText = "position:fixed;inset:0;z-index:9000;background:#110c10;display:flex;flex-direction:column";
d.innerHTML = "<div style='display:flex;align-items:center;gap:12px;padding:8px 14px;background:linear-gradient(180deg,#2a1a20,#1a1015);border-bottom:1px solid #4c3742;color:#f4ece2;font:14px system-ui,sans-serif'>" +
"<span style='font-size:18px'>🎼</span><b>The Composer's Studio</b><span style='color:#93827c'>· L38, Somnucor Tower</span><span style='flex:1'></span>" +
"<button id='thxm-close' style='padding:7px 14px;border-radius:9px;border:1px solid #e8c27a;background:#33242c;color:#f5d99c;cursor:pointer;font:inherit'>Back to the concert hall ✕</button></div>" +
"<iframe id='thxm-frame' src='compose.html" + (tab ? "#tab=" + tab : "") + "' style='flex:1;border:0;width:100%;background:#110c10' allow='microphone; midi; fullscreen; autoplay; clipboard-write'></iframe>";
document.body.appendChild(d);
THXM.open = true;
function close() { var f = document.getElementById("thxm-frame"); try {
if (f)
f.src = "about:blank";
}
catch (e) { } if (d.parentNode)
d.parentNode.removeChild(d); THXM.open = false; document.removeEventListener("keydown", esc, true); thxSay("🎼 Back in the concert hall. Your music is saved in your library."); }
function esc(e) { if (e.key === "Escape") {
e.preventDefault();
e.stopPropagation();
close();
} }
document.getElementById("thxm-close").onclick = close;
document.addEventListener("keydown", esc, true);
},
function (i) {
var k = "sweep-art|" + i;
if (THX.mats[k])
return THX.mats[k];
var W = 256, H = 192, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d"), R = function (n) { n = Math.sin((i + 1) * n * 12.9898) * 43758.5453; return n - Math.floor(n); };
try {
if (i === 0) {
var g = c.createLinearGradient(0, 0, 0, H * 0.6);
g.addColorStop(0, "#5A7AA8");
g.addColorStop(1, "#E8B884");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.fillStyle = "#F2D27A";
c.beginPath();
c.arc(W * 0.7, H * 0.42, 14, 0, 7);
c.fill();
[["#6A7A8A", 0.5], ["#4A5E4A", 0.58], ["#3A4A34", 0.66]].forEach(function (L, j) { c.fillStyle = L[0]; c.beginPath(); c.moveTo(0, H); for (var x = 0; x <= W; x += 8)
c.lineTo(x, H * L[1] - Math.sin(x * 0.02 + j * 2) * 14 - Math.sin(x * 0.05 + j) * 6); c.lineTo(W, H); c.fill(); });
c.fillStyle = "#7A98B0";
c.fillRect(0, H * 0.78, W, H * 0.22);
c.fillStyle = "rgba(242,210,122,0.5)";
c.fillRect(W * 0.66, H * 0.8, 14, 30);
}
else if (i === 1) {
c.fillStyle = "#EDE6D6";
c.fillRect(0, 0, W, H);
var cols = ["#B8322A", "#2A4A8A", "#E8B830", "#EDE6D6", "#EDE6D6"];
for (var b = 0; b < 7; b++) {
c.fillStyle = cols[b % 5];
c.fillRect(R(b + 1) * W * 0.8, R(b + 9) * H * 0.8, 30 + R(b + 3) * 70, 24 + R(b + 5) * 60);
}
c.fillStyle = "#1A1A1A";
[0.3, 0.62].forEach(function (f) { c.fillRect(W * f, 0, 5, H); });
[0.4, 0.75].forEach(function (f) { c.fillRect(0, H * f, W, 5); });
}
else if (i === 2) {
var g2 = c.createLinearGradient(0, 0, 0, H);
g2.addColorStop(0, "#1E2A4A");
g2.addColorStop(0.7, "#C86A4A");
g2.addColorStop(1, "#2A2A3A");
c.fillStyle = g2;
c.fillRect(0, 0, W, H);
for (var t = 0; t < 22; t++) {
var bw = 8 + R(t) * 18, bh = 30 + R(t + 40) * 90, bx = t * 12 - 4;
c.fillStyle = "#1A1E2A";
c.fillRect(bx, H - bh, bw, bh);
c.fillStyle = "#E8C870";
for (var w = 0; w < 6; w++)
if (R(t * 7 + w) > 0.5)
c.fillRect(bx + 2 + (w % 2) * 5, H - bh + 6 + Math.floor(w / 2) * 12, 3, 4);
}
c.fillStyle = "#9AE0F0";
c.fillRect(W * 0.48, H * 0.12, 6, H * 0.88);
}
else if (i === 3) {
c.fillStyle = "#E4DCC6";
c.fillRect(0, 0, W, H);
for (var l = 0; l < 9; l++) {
var lx = 20 + R(l) * W * 0.85, ly = 20 + R(l + 20) * H * 0.8, a = R(l + 7) * 6.28;
c.save();
c.translate(lx, ly);
c.rotate(a);
c.fillStyle = ["#4A6A34", "#6A8A3A", "#8A6A2A", "#3A5A3A"][l % 4];
c.beginPath();
c.ellipse(0, 0, 30, 11, 0, 0, 7);
c.fill();
c.strokeStyle = "rgba(240,230,200,0.6)";
c.lineWidth = 1.5;
c.beginPath();
c.moveTo(-28, 0);
c.lineTo(28, 0);
c.stroke();
c.restore();
}
}
else if (i === 4) {
var g3 = c.createLinearGradient(0, 0, 0, H);
g3.addColorStop(0, "#9AB8D0");
g3.addColorStop(0.55, "#D8E0E0");
g3.addColorStop(0.56, "#4A6A84");
g3.addColorStop(1, "#2A4A64");
c.fillStyle = g3;
c.fillRect(0, 0, W, H);
c.fillStyle = "#C8B89A";
c.fillRect(0, H * 0.5, W * 0.35, 8);
for (var h = 0; h < 5; h++) {
c.fillStyle = ["#E8E0D0", "#C8B8A0", "#D8C8B0"][h % 3];
c.fillRect(h * 16, H * 0.5 - 20 - R(h) * 14, 14, 22 + R(h) * 14);
c.fillStyle = "#9A5A3A";
c.fillRect(h * 16, H * 0.5 - 24 - R(h) * 14, 14, 5);
}
for (var s = 0; s < 4; s++) {
var sx = W * 0.4 + s * 34, sy = H * 0.66 + s * 8;
c.fillStyle = ["#B8322A", "#E8E0D0", "#2A4A8A", "#E8B830"][s];
c.beginPath();
c.moveTo(sx, sy);
c.lineTo(sx + 26, sy);
c.lineTo(sx + 20, sy + 7);
c.lineTo(sx + 5, sy + 7);
c.fill();
c.fillStyle = "#3A3A3A";
c.fillRect(sx + 12, sy - 26, 2, 26);
c.fillStyle = "#F0ECE0";
c.beginPath();
c.moveTo(sx + 14, sy - 24);
c.lineTo(sx + 26, sy - 4);
c.lineTo(sx + 14, sy - 4);
c.fill();
}
}
else {
c.fillStyle = "#2A3440";
c.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++) {
c.fillStyle = ["rgba(232,184,48,0.8)", "rgba(74,232,255,0.55)", "rgba(200,90,74,0.7)", "rgba(237,230,214,0.6)"][r % 4];
c.beginPath();
c.arc(R(r + 2) * W, R(r + 11) * H, 14 + R(r + 5) * 40, 0, 7);
c.fill();
}
}
}
catch (e) { }
var tx = new THREE.CanvasTexture(cv);
var m = new THREE.MeshLambertMaterial({ map: tx, color: 0xD8D8D8 });
THX.mats[k] = m;
return m;
},
function (x, y, z, ry, w, h, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
THX.F.add(g);
var fr = thxMat(i % 2 ? 0x2A2420 : 0x8A7A5A, i % 2 ? "wood" : "metal");
thxBox(w + 0.12, h + 0.12, 0.05, fr, 0, 0, 0, g);
var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), thxArtMat(i % THX_ART_N));
p.position.z = 0.03;
g.add(p);
return g;
},
function (F) {
var lite = THX.lite, z1 = THX_FD / 2, lob = F.lob, sW = z1 - 0.16, pW = lob + 0.11, n = 0;
[-18.5, -13, -8, 8, 13, 18.5].forEach(function (x, j) { if (lite && j % 2)
return; thxArt(x, 1.75, sW, Math.PI, 1.6, 1.2, n++); });
[-19, -14, -8.5, 8.5, 14, 19].forEach(function (x, j) { if (lite && j % 2 === 0)
return; thxArt(x, 1.75, pW, 0, 1.4, 1.05, 3 + (n++)); });
var lamp = thxMat(0xF4E8D0, null, { e: 0xE8D0A0, ei: 0.65 }), plate = thxMat(0x8A8E94, "metal");
[-15.75, -10.5, 10.5, 15.75].forEach(function (x) {
thxBox(0.14, 0.3, 0.06, plate, x, 2.35, sW - 0.02);
thxBox(0.2, 0.24, 0.1, lamp, x, 2.35, sW - 0.08);
if (!lite) {
thxBox(0.14, 0.3, 0.06, plate, x + 0.25, 2.35, pW + 0.02);
thxBox(0.2, 0.24, 0.1, lamp, x + 0.25, 2.35, pW + 0.08);
}
});
var wd = thxMat(0x8A6A48, "wood"), leg = thxMat(0x3A3E44, "metal");
[-15.75, 15.75].forEach(function (x) {
var g = new THREE.Group();
g.position.set(x, 0, sW - 0.35);
THX.F.add(g);
thxBox(2.4, 0.08, 0.45, wd, 0, 0.46, 0, g);
[-1.05, 1.05].forEach(function (e) { thxBox(0.06, 0.44, 0.4, leg, e, 0.22, 0, g); });
thxSolid(x, sW - 0.35, 1.2, 0.25, 0, 0.5);
});
var cx = F.x0 + 0.6, cz = z1 - 0.6;
thxBox(0.4, 1.0, 0.4, thxMat(0xE8ECF0, "metal"), cx, 0.5, cz);
var jug = thxCyl(0.17, 0.42, thxMat(0x8ACCE8, null, { op: 0.6 }), cx, 1.21, cz, null, 12);
thxSolid(cx, cz, 0.22, 0.22, 0, 1.4);
thxCyl(0.18, 0.55, thxMat(0x3A3E44, "metal"), cx + 0.75, 0.28, cz, null, 10, 0.16);
thxSolid(cx + 0.75, cz, 0.2, 0.2, 0, 0.6);
thxPlant(-6.4, 0, sW - 0.5, 1);
if (!lite)
thxPlant(6.4, 0, sW - 0.5, 1);
thxPlant(F.x0 + 0.8, 0, lob + 0.8, 1);
},
function (i) {
i = ((i | 0) % 8 + 8) % 8;
var k = "dscr|" + i;
if (THX.mats[k])
return THX.mats[k];
var W = 256, H = 148, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d");
function R(n) { n = Math.sin((i + 3) * n * 12.9898) * 43758.5453; return n - Math.floor(n); }
try {
c.fillStyle = "#F2F4F6";
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A4A7A";
c.fillRect(0, 0, W, 12);
c.fillStyle = "#DDE2E8";
c.fillRect(0, 12, W, 8);
if (i === 0) {
c.strokeStyle = "#C8CED6";
c.lineWidth = 1;
for (var y = 24; y < H; y += 9) {
c.beginPath();
c.moveTo(0, y);
c.lineTo(W, y);
c.stroke();
}
for (var x = 30; x < W; x += 38) {
c.beginPath();
c.moveTo(x, 20);
c.lineTo(x, H);
c.stroke();
}
c.fillStyle = "#3A4250";
for (var r = 0; r < 13; r++)
for (var q = 0; q < 6; q++)
if (R(r * 7 + q) > 0.25)
c.fillRect(34 + q * 38, 26 + r * 9, 8 + R(r + q * 3) * 24, 4);
c.fillStyle = "#3AA060";
c.fillRect(34 + 2 * 38, 26 + 4 * 9, 30, 5);
}
else if (i === 1) {
c.fillStyle = "#1E222A";
c.fillRect(0, 12, W, H);
var cols = ["#C792EA", "#82AAFF", "#C3E88D", "#F78C6C", "#89DDFF", "#D0D4DC"];
for (var l = 0; l < 14; l++) {
var ind = (R(l) * 4 | 0) * 8, xx = 8 + ind;
for (var w = 0; w < 1 + (R(l + 30) * 5 | 0); w++) {
var ww = 8 + R(l * 5 + w) * 34;
c.fillStyle = cols[(l + w) % cols.length];
c.fillRect(xx, 18 + l * 9, ww, 4);
xx += ww + 5;
}
}
}
else if (i === 2) {
c.fillStyle = "#E8ECF0";
c.fillRect(0, 20, 64, H);
for (var m = 0; m < 12; m++) {
c.fillStyle = m === 2 ? "#D8E6F8" : "#FFFFFF";
c.fillRect(66, 22 + m * 10, W - 68, 9);
c.fillStyle = "#3A4250";
c.fillRect(70, 24 + m * 10, 40, 3);
c.fillStyle = "#8A929C";
c.fillRect(116, 24 + m * 10, 90 * R(m + 2) + 30, 3);
}
c.fillStyle = "#5A6270";
for (var f = 0; f < 6; f++)
c.fillRect(6, 26 + f * 12, 40, 4);
}
else if (i === 3) {
c.fillStyle = "#E6E2D6";
c.fillRect(0, 12, W, H);
c.strokeStyle = "#FFFFFF";
c.lineWidth = 4;
[30, 55, 80].forEach(function (rr) { c.beginPath(); c.arc(W / 2, H / 2 + 6, rr, 0, 7); c.stroke(); });
c.lineWidth = 2;
for (var s = 0; s < 10; s++) {
var a = s * 0.63;
c.beginPath();
c.moveTo(W / 2, H / 2 + 6);
c.lineTo(W / 2 + Math.cos(a) * 130, H / 2 + 6 + Math.sin(a) * 130);
c.stroke();
}
c.fillStyle = "#9AC48A";
c.fillRect(20, 30, 30, 22);
c.fillRect(200, 100, 36, 26);
c.fillStyle = "#7AB0D8";
c.fillRect(0, H - 20, W, 20);
c.fillStyle = "#D83A3A";
c.beginPath();
c.arc(W / 2 + 40, H / 2 - 10, 4, 0, 7);
c.fill();
}
else if (i === 4) {
c.fillStyle = "#3A4250";
c.fillRect(20, 28, 2, H - 40);
c.fillRect(20, H - 12, W - 30, 2);
for (var b = 0; b < 9; b++) {
var bh = 20 + R(b + 5) * 80;
c.fillStyle = b % 3 ? "#4A8AD8" : "#E89A3A";
c.fillRect(30 + b * 24, H - 12 - bh, 16, bh);
}
c.strokeStyle = "#D83A3A";
c.lineWidth = 2;
c.beginPath();
for (var p = 0; p < 10; p++) {
var py = 40 + R(p + 11) * 50;
if (p)
c.lineTo(30 + p * 24, py);
else
c.moveTo(30, py);
}
c.stroke();
}
else if (i === 5) {
c.fillStyle = "#C8CED6";
c.fillRect(0, 20, W, H);
c.fillStyle = "#FFFFFF";
c.fillRect(56, 22, 144, H - 22);
c.fillStyle = "#1A2230";
c.fillRect(66, 30, 90, 6);
c.fillStyle = "#6A7280";
for (var t = 0; t < 14; t++)
c.fillRect(66, 44 + t * 7, (t % 5 === 4 ? 60 : 120) * (0.8 + R(t) * 0.2), 3);
}
else if (i === 6) {
var g = c.createLinearGradient(0, 12, 0, H);
g.addColorStop(0, "#2A3446");
g.addColorStop(1, "#4A4E56");
c.fillStyle = g;
c.fillRect(0, 12, W, H);
c.fillStyle = "#1A1E28";
for (var bb = 0; bb < 9; bb++)
c.fillRect(bb * 30, 30 + R(bb) * 30, 26, H);
c.fillStyle = "#E8C870";
for (var wq = 0; wq < 40; wq++)
if (R(wq) > 0.5)
c.fillRect((wq % 9) * 30 + 4 + (wq % 3) * 7, 50 + (wq % 6) * 12, 4, 5);
c.fillStyle = "#5A5E66";
c.fillRect(0, H - 26, W, 26);
c.fillStyle = "#F4F4F4";
c.font = "9px monospace";
c.fillText("CAM 0" + (3 + (i % 5)) + "  REC", 6, 24);
c.fillStyle = "#D83A3A";
c.beginPath();
c.arc(W - 10, 18, 3, 0, 7);
c.fill();
}
else {
c.fillStyle = "#0E1622";
c.fillRect(0, 12, W, H);
for (var d = 0; d < 4; d++) {
var dx = 34 + d * 62, dy = 60;
c.strokeStyle = "#2A3A4E";
c.lineWidth = 7;
c.beginPath();
c.arc(dx, dy, 22, Math.PI * 0.8, Math.PI * 2.2);
c.stroke();
c.strokeStyle = ["#4AE8FF", "#6AF0C4", "#FFD24A", "#FF8A5A"][d];
c.beginPath();
c.arc(dx, dy, 22, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * (0.3 + R(d) * 0.6)));
c.stroke();
}
c.strokeStyle = "#4AE8FF";
c.lineWidth = 1.5;
c.beginPath();
for (var z = 0; z < W; z += 4) {
var zy = 118 + Math.sin(z * 0.06) * 8 + R(z) * 6;
if (z)
c.lineTo(z, zy);
else
c.moveTo(z, zy);
}
c.stroke();
}
}
catch (e) { }
var t = new THREE.CanvasTexture(cv), m = new THREE.MeshBasicMaterial({ map: t, color: 0xE8ECF0 });
THX.mats[k] = m;
return m;
},
function (kind, i) {
var k = "dpap|" + kind + "|" + (i | 0);
if (THX.mats[k])
return THX.mats[k];
var W = 256, H = kind === "board" ? 128 : 180, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d");
function R(n) { n = Math.sin((i + 7) * n * 78.233) * 43758.5453; return n - Math.floor(n); }
try {
if (kind === "board") {
c.fillStyle = "#F6F8F8";
c.fillRect(0, 0, W, H);
var pens = ["#1A3A8A", "#1A1A1A", "#C82A2A", "#2A8A3A"];
for (var l = 0; l < 7; l++) {
c.strokeStyle = pens[(l + i) % 4];
c.lineWidth = 2;
c.beginPath();
var x = 12 + R(l) * 20, y = 16 + l * 15;
c.moveTo(x, y);
for (var s = 0; s < 14 + R(l + 3) * 12; s++) {
x += 5 + R(s + l) * 4;
c.lineTo(x, y + Math.sin(s * 1.7 + l) * 2.5);
if (R(s * 3 + l) > 0.86) {
x += 8;
c.moveTo(x, y);
}
}
c.stroke();
}
c.strokeStyle = pens[(i + 2) % 4];
c.lineWidth = 2;
c.strokeRect(W * 0.62, H * 0.18, W * 0.3, H * 0.42);
c.beginPath();
c.moveTo(W * 0.62, H * 0.39);
c.lineTo(W * 0.92, H * 0.39);
c.stroke();
c.beginPath();
c.moveTo(W * 0.6, H * 0.8);
c.lineTo(W * 0.7, H * 0.68);
c.lineTo(W * 0.8, H * 0.74);
c.lineTo(W * 0.92, H * 0.6);
c.stroke();
}
else if (kind === "notice") {
c.fillStyle = ["#FFFFFF", "#FFF4C8", "#E8F4FF", "#FFE8E0"][i % 4];
c.fillRect(0, 0, W, H);
c.fillStyle = ["#1A3A8A", "#C82A2A", "#1A1A1A", "#2A6A3A"][i % 4];
c.fillRect(14, 14, W - 28, 22);
c.fillStyle = "#3A4250";
for (var t = 0; t < 10; t++)
c.fillRect(16, 48 + t * 12, (W - 40) * (0.5 + R(t) * 0.5), 4);
}
else if (kind === "chart") {
c.fillStyle = "#FFFFFF";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8CED6";
for (var g = 0; g < 8; g++) {
c.beginPath();
c.moveTo(14, 20 + g * 20);
c.lineTo(W - 14, 20 + g * 20);
c.stroke();
}
c.strokeStyle = "#2A6AC8";
c.lineWidth = 3;
c.beginPath();
for (var p = 0; p < 12; p++) {
var py = H - 30 - R(p + i) * 100 - p * 3;
if (p)
c.lineTo(14 + p * 20, py);
else
c.moveTo(14, py);
}
c.stroke();
c.fillStyle = "#1A2230";
c.fillRect(14, 6, 120, 8);
}
else {
c.fillStyle = "#1E4A7A";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#CFE4F4";
c.lineWidth = 1.5;
for (var b = 0; b < 9; b++) {
var bx = 10 + R(b) * 180, by = 10 + R(b + 20) * 120;
c.strokeRect(bx, by, 30 + R(b + 4) * 60, 20 + R(b + 8) * 40);
}
c.beginPath();
c.arc(W * 0.7, H * 0.6, 30, 0, 7);
c.stroke();
c.font = "10px monospace";
c.fillStyle = "#CFE4F4";
c.fillText("SOMNUCOR · DWG " + (100 + i), 10, H - 8);
}
}
catch (e) { }
var tx = new THREE.CanvasTexture(cv), m = new THREE.MeshLambertMaterial({ map: tx });
THX.mats[k] = m;
return m;
},
function (g, o, s) {
var lite = THX.lite, blk = thxMat(0x16181C, null), dark = thxMat(0x2A2E34, "metal"), paper = thxMat(0xF4F2EC, null);
thxDPlane(0.54, 0.3, thxDScreenMat(s), -0.2, 1.12, -0.228, 0, g);
if (o.two)
thxDPlane(0.54, 0.3, thxDScreenMat(s + 3), 0.45, 1.12, -0.178, 0, g);
thxBox(0.4, 0.008, 0.12, thxMat(0x3A3E44, null), 0, 0.775, 0.05, g);
thxBox(0.22, 0.004, 0.19, thxMat(0x24282E, null), 0.33, 0.752, 0.08, g);
thxBox(0.06, 0.025, 0.1, blk, 0.33, 0.765, 0.08, g);
if (s % 3 !== 1) {
thxBox(0.21, 0.012, 0.3, paper, -0.56, 0.758, 0.12, g).rotation.y = 0.15 * (s % 2 ? 1 : -1);
thxBox(0.21, 0.02, 0.3, thxMat(0xE8E4D8, null), -0.6, 0.762, 0.12, g);
}
if (!o.headset || s % 2) {
thxCyl(0.04, 0.095, thxMat([0xF4F2EC, 0x2A4A8A, 0xC83A2A, 0x3A3E44, 0xE8B830][s % 5], null), 0.6, 0.8, -0.18, g, 10);
}
thxCyl(0.035, 0.1, dark, -0.68, 0.8, -0.28, g, 8);
for (var p = 0; p < 3; p++)
thxBox(0.008, 0.14, 0.008, thxMat([0x1A3A8A, 0xC82A2A, 0x1A1A1A][p], null), -0.69 + p * 0.012, 0.86, -0.28, g);
if (!lite && s % 4 !== 2) {
var L = new THREE.Group();
L.position.set(0.7, 0.75, -0.3);
g.add(L);
thxCyl(0.07, 0.02, dark, 0, 0.01, 0, L, 12);
var a = thxBox(0.02, 0.42, 0.02, dark, 0, 0.22, 0.04, L);
a.rotation.x = -0.25;
var hd = thxCyl(0.06, 0.1, dark, 0, 0.42, 0.14, L, 10, 0.08);
hd.rotation.x = 0.6;
thxCyl(0.05, 0.01, thxGlow(0xFFF2D8), 0, 0.38, 0.17, L, 10);
}
if (s % 5 === 0)
thxBox(0.12, 0.15, 0.015, thxMat(0x8A6A48, "wood"), 0.15, 0.83, -0.3, g).rotation.x = -0.2;
else if (s % 5 === 3 && !lite) {
thxCyl(0.05, 0.08, thxMat(0xE8E4DC, null), 0.15, 0.79, -0.3, g, 8);
thxSph(0.07, thxMat(0x4A8A3A, null), 0.15, 0.88, -0.3, g, 7);
}
thxBox(0.4, 0.6, 0.55, thxMat(0xC8CCD0, "metal"), 0.55, 0.3, -0.08, g);
thxBox(0.03, 0.02, 0.01, thxMat(0x5A6068, "metal"), 0.55, 0.5, 0.2, g);
thxBox(0.03, 0.02, 0.01, thxMat(0x5A6068, "metal"), 0.55, 0.3, 0.2, g);
thxBox(1.5, 0.36, 0.02, thxMat(0x8A9098, "metal"), 0, 0.5, -0.38, g);
if (o.chair !== false) {
var leg = thxMat(0x2A2C30, null);
for (var k = 0; k < 5; k++) {
var b = thxBox(0.03, 0.03, 0.32, leg, Math.sin(k * 1.2566) * 0.15, 0.05, 0.62 + Math.cos(k * 1.2566) * 0.15, g);
b.rotation.y = k * 1.2566;
thxSph(0.025, leg, Math.sin(k * 1.2566) * 0.3, 0.025, 0.62 + Math.cos(k * 1.2566) * 0.3, g, 5);
}
if (!lite) {
var arm = thxMat(0x2A2C30, null);
thxBox(0.04, 0.2, 0.04, arm, -0.27, 0.6, 0.62, g);
thxBox(0.04, 0.2, 0.04, arm, 0.27, 0.6, 0.62, g);
thxBox(0.06, 0.03, 0.3, arm, -0.27, 0.7, 0.6, g);
thxBox(0.06, 0.03, 0.3, arm, 0.27, 0.7, 0.6, g);
}
}
},
function (g, w, o, s) {
var gl = thxMat(0xCFE8F0, null, { op: 0.45 }), steel = thxMat(0xC8CCD0, "metal"), blk = thxMat(0x24282E, null), wht = thxMat(0xF0F2F4, null);
var n = Math.max(1, Math.floor((w - 1.2) / 1.1)), lite = THX.lite;
for (var i = 0; i < n; i++) {
var bx = -w / 2 + 0.9 + i * 1.1, k = (s + i) % 6;
if (k === 0) {
thxBox(0.2, 0.08, 0.24, wht, bx, 0.94, 0.05, g);
thxBox(0.16, 0.01, 0.16, blk, bx, 0.985, 0.04, g);
thxCyl(0.06, 0.04, gl, bx, 1.01, 0.04, g, 10, 0.07);
thxCyl(0.02, 0.12, gl, bx, 1.09, 0.04, g, 8, 0.035);
thxCyl(0.055, 0.02, thxMat(0x6AC8E8, null, { op: 0.7 }), bx, 1.0, 0.04, g, 10);
}
else if (k === 1) {
thxBox(0.22, 0.08, 0.3, wht, bx, 0.94, 0.0, g);
thxBox(0.18, 0.2, 0.2, thxGlass(0xE8F4F8), bx, 1.08, -0.02, g);
thxBox(0.12, 0.04, 0.005, thxGlow(0x3AE86A), bx, 0.95, 0.151, g);
}
else if (k === 2) {
thxCyl(0.07, 0.015, blk, bx, 0.91, -0.05, g, 10);
thxBox(0.015, 0.4, 0.015, blk, bx, 1.1, -0.05, g);
for (var p = 0; p < 3; p++) {
var pp = thxBox(0.018, 0.26, 0.018, [thxMat(0xE8E4DC, null), thxMat(0x3A8AD8, null), thxMat(0xD8C030, null)][p], bx - 0.04 + p * 0.04, 1.12, -0.01, g);
pp.rotation.z = 0.12 * (p - 1);
}
thxBox(0.24, 0.06, 0.08, wht, bx + 0.25, 0.93, 0.1, g);
for (var t = 0; t < 6; t++)
thxCyl(0.01, 0.1, thxMat([0xE85A5A, 0x5AC8E8, 0xE8E8E8][t % 3], null, { op: 0.8 }), bx + 0.15 + t * 0.04, 0.98, 0.1, g, 6);
}
else if (k === 3) {
thxBox(0.18, 0.03, 0.22, blk, bx, 0.915, 0.0, g);
var arm = thxBox(0.05, 0.3, 0.06, wht, bx, 1.07, -0.07, g);
arm.rotation.x = 0.15;
thxCyl(0.025, 0.16, blk, bx, 1.17, 0.02, g, 8).rotation.x = -0.5;
thxBox(0.12, 0.015, 0.12, blk, bx, 1.0, 0.03, g);
}
else if (k === 4) {
thxCyl(0.04, 0.18, thxMat(0xF4F4F4, null, { op: 0.85 }), bx, 0.99, 0.08, g, 8);
thxBox(0.2, 0.09, 0.11, thxMat(0x5A7AC8, null), bx + 0.2, 0.945, 0.05, g);
thxBox(0.08, 0.01, 0.03, thxMat(0x8AB0F0, null), bx + 0.2, 0.995, 0.05, g);
var bk = thxBox(0.2, 0.015, 0.28, thxMat(0x1A3A6A, null), bx - 0.22, 0.91, 0.12, g);
bk.rotation.y = 0.2;
}
else {
thxCyl(0.045, 0.11, gl, bx, 0.96, 0.08, g, 10);
thxCyl(0.04, 0.06, thxMat(0xE8A03A, null, { op: 0.7 }), bx, 0.935, 0.08, g, 10);
thxCyl(0.02, 0.3, gl, bx + 0.15, 1.05, 0.0, g, 8);
thxCyl(0.06, 0.012, gl, bx + 0.15, 0.905, 0.0, g, 8);
if (!lite) {
thxBox(0.14, 0.012, 0.18, blk, bx - 0.18, 0.905, -0.05, g);
thxBox(0.012, 0.5, 0.012, steel, bx - 0.18, 1.15, -0.12, g);
thxBox(0.14, 0.012, 0.012, steel, bx - 0.13, 1.2, -0.12, g);
thxSph(0.05, gl, bx - 0.08, 1.14, -0.12, g, 8);
}
}
}
if (!o.noShelf)
for (var q = 0; q < Math.floor(w / 1.2); q++)
thxBox(0.03, 0.08, 0.03, thxMat(0xC8A030, "metal"), -w / 2 + 0.6 + q * 1.2, 0.94, -0.33, g);
thxBox(Math.max(0.4, w - 0.6), 0.05, 0.04, wht, 0, 0.93, -0.355, g);
if (!lite && !o.noStools)
for (var st = 0; st < Math.max(1, Math.floor(w / 1.6)); st++) {
var sx = -w / 2 + 0.8 + st * 1.6;
thxCyl(0.17, 0.05, thxMat(0x2A3A5A, null), sx, 0.66, 0.55, g, 12);
thxCyl(0.025, 0.62, steel, sx, 0.33, 0.55, g, 6);
thxCyl(0.17, 0.02, steel, sx, 0.25, 0.55, g, 12);
}
},
function (x, y, z, ry) {
var k = "dclock";
if (!THX.mats[k]) {
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var c = cv.getContext("2d");
c.fillStyle = "#F8F8F4";
c.beginPath();
c.arc(64, 64, 62, 0, 7);
c.fill();
c.fillStyle = "#1A1A1A";
for (var h = 0; h < 12; h++) {
var a = h / 12 * Math.PI * 2;
c.fillRect(64 + Math.cos(a) * 50 - 2, 64 + Math.sin(a) * 50 - 2, h % 3 ? 3 : 6, h % 3 ? 3 : 6);
}
c.strokeStyle = "#1A1A1A";
c.lineWidth = 5;
c.beginPath();
c.moveTo(64, 64);
c.lineTo(64 + 26, 64 - 18);
c.stroke();
c.lineWidth = 3;
c.beginPath();
c.moveTo(64, 64);
c.lineTo(64 - 8, 64 - 46);
c.stroke();
c.strokeStyle = "#C82A2A";
c.lineWidth = 1.5;
c.beginPath();
c.moveTo(64, 64);
c.lineTo(64 + 30, 64 + 36);
c.stroke();
THX.mats[k] = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: false });
}
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxCyl(0.17, 0.04, thxMat(0x2A2C30, "metal"), 0, 0, 0, g, 20).rotation.x = Math.PI / 2;
var f = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), THX.mats[k]);
f.position.z = 0.022;
g.add(f);
return g;
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxCyl(0.08, 0.5, thxMat(0xC81A1A, "metal"), 0, 0.55, 0.1, g, 10);
thxCyl(0.03, 0.08, thxMat(0x1A1A1A, null), 0, 0.84, 0.1, g, 6);
thxBox(0.12, 0.04, 0.03, thxMat(0x1A1A1A, null), 0.05, 0.9, 0.1, g);
thxBox(0.22, 0.3, 0.01, thxMat(0xC81A1A, null), 0, 1.25, 0.01, g);
thxBox(0.14, 0.04, 0.012, thxMat(0xF4F4F4, null), 0, 1.3, 0.012, g);
return g;
},
function (x, y, z, ry, w, h, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxBox(w + 0.08, h + 0.08, 0.03, thxMat(0x8A6A48, "wood"), 0, 0, 0, g);
thxBox(w, h, 0.02, thxMat(0xB08A5A, null), 0, 0, 0.012, g);
var n = Math.max(2, Math.floor(w / 0.32)), kinds = ["notice", "chart", "notice", "plan"];
for (var k = 0; k < n; k++) {
var pw = 0.22 + ((k * 7 + i) % 3) * 0.04, ph = pw * 1.35, px = -w / 2 + 0.18 + k * (w - 0.36) / Math.max(1, n - 1), py = ((k + i) % 2 ? 0.12 : -0.1) * h;
var p = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), thxDPaperMat(kinds[(k + i) % 4], k + i));
p.position.set(px, py, 0.026);
p.rotation.z = ((k * 13 + i) % 7 - 3) * 0.02;
g.add(p);
thxSph(0.012, thxMat([0xC82A2A, 0x2A6AC8, 0xE8C030][k % 3], null), px, py + ph / 2 - 0.03, 0.035, g, 5);
}
return g;
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var wh = thxMat(0xE8E8E4, "metal"), gr = thxMat(0x5A6068, null);
thxBox(0.7, 0.75, 0.6, wh, 0, 0.375, 0, g);
thxBox(0.7, 0.25, 0.6, thxMat(0xD8D8D4, "metal"), 0, 0.9, 0, g);
thxBox(0.66, 0.04, 0.5, gr, 0, 1.05, 0, g);
thxBox(0.2, 0.1, 0.01, thxMat(0x3A6A9A, null, { e: 0x2A5A8A, ei: 0.7 }), 0.2, 0.96, 0.305, g);
for (var t = 0; t < 3; t++)
thxBox(0.64, 0.01, 0.01, gr, 0, 0.2 + t * 0.18, 0.305, g);
thxBox(0.3, 0.02, 0.22, thxMat(0xF4F2EC, null), -0.1, 0.83, 0.2, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * 0.35 + Math.abs(s) * 0.3, Math.abs(s) * 0.35 + Math.abs(c) * 0.3, 0, 1.1);
},
function (x, z, ry, n, kind) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var locker = kind === "locker", w = locker ? 0.4 : 0.5, h = locker ? 1.9 : 1.32, col = locker ? [0x5A7A9A, 0x6A8AAA] : [0xB8BEC4, 0xA8AEB4];
for (var i = 0; i < n; i++) {
var cx = -(n - 1) * w / 2 + i * w;
thxBox(w - 0.01, h, 0.55, thxMat(col[i % 2], "metal"), cx, h / 2, 0, g);
if (locker) {
thxBox(0.02, 0.12, 0.01, thxMat(0x3A3E44, null), cx + 0.12, 1.0, 0.28, g);
for (var v = 0; v < 3; v++)
thxBox(0.24, 0.01, 0.01, thxMat(0x3A3E44, null), cx, 1.6 + v * 0.05, 0.28, g);
}
else
for (var d = 0; d < 4; d++) {
thxBox(w - 0.06, 0.01, 0.01, thxMat(0x5A6068, null), cx, 0.33 * d + 0.32, 0.28, g);
thxBox(0.12, 0.02, 0.02, thxMat(0x8A9098, "metal"), cx, 0.33 * d + 0.2, 0.285, g);
}
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0), L = n * w / 2;
thxSolid(x, z, Math.abs(c) * L + Math.abs(s) * 0.3, Math.abs(s) * L + Math.abs(c) * 0.3, 0, h);
return g;
},
function (x, z, w, d, col, border) {
thxBox(w, 0.012, d, thxMat(col || 0x6A3A2A, "carpet"), x, 0.006, z);
if (border) {
thxBox(w, 0.014, 0.12, thxMat(border, null), x, 0.007, z - d / 2 + 0.1);
thxBox(w, 0.014, 0.12, thxMat(border, null), x, 0.007, z + d / 2 - 0.1);
thxBox(0.12, 0.014, d, thxMat(border, null), x - w / 2 + 0.1, 0.007, z);
thxBox(0.12, 0.014, d, thxMat(border, null), x + w / 2 - 0.1, 0.007, z);
}
},
function (dir, a, b, c, y) {
var L = Math.abs(b - a), m = (a + b) / 2, tr = thxMat(0x8A9098, "metal"), cab = [thxMat(0x2A2C30, null), thxMat(0x3A5A9A, null), thxMat(0xC8A030, null)];
if (dir === "x") {
thxBox(L, 0.02, 0.3, tr, m, y, c);
thxBox(L, 0.08, 0.02, tr, m, y + 0.04, c - 0.15);
thxBox(L, 0.08, 0.02, tr, m, y + 0.04, c + 0.15);
for (var k = 0; k < 3; k++)
thxBox(L, 0.04, 0.05, cab[k], m, y + 0.03, c - 0.08 + k * 0.08);
}
else {
thxBox(0.3, 0.02, L, tr, c, y, m);
thxBox(0.02, 0.08, L, tr, c - 0.15, y + 0.04, m);
thxBox(0.02, 0.08, L, tr, c + 0.15, y + 0.04, m);
for (var q = 0; q < 3; q++)
thxBox(0.05, 0.04, L, cab[q], c - 0.08 + q * 0.08, y + 0.03, m);
}
},
function (dir, a, b, c, y, r, col) {
var L = Math.abs(b - a), m = (a + b) / 2, p = thxCyl(r || 0.08, L, thxMat(col || 0x8A9098, "metal"), dir === "x" ? m : c, y, dir === "x" ? c : m, null, 10);
if (dir === "x")
p.rotation.z = Math.PI / 2;
else
p.rotation.x = Math.PI / 2;
for (var s = a + 1; s < b; s += 2.5) {
thxBox(dir === "x" ? 0.06 : (r || 0.08) * 2.6, 0.04, dir === "x" ? (r || 0.08) * 2.6 : 0.06, thxMat(0x5A6068, "metal"), dir === "x" ? s : c, y + (r || 0.08) + 0.02, dir === "x" ? c : s);
}
},
function (lines, w, x, y, z, ry, bg, fg) {
var s = thxSign(lines, w, 0.36, bg || "#1A2230", fg || "#F4F2EC", x, y, z, ry || 0);
thxBox(0.01, THX_H - y - 0.2, 0.01, thxMat(0x8A9098, null), x - w * 0.4 * Math.cos(ry || 0), (THX_H + y + 0.2) / 2, z + w * 0.4 * Math.sin(ry || 0));
thxBox(0.01, THX_H - y - 0.2, 0.01, thxMat(0x8A9098, null), x + w * 0.4 * Math.cos(ry || 0), (THX_H + y + 0.2) / 2, z - w * 0.4 * Math.sin(ry || 0));
return s;
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var gr = thxMat(0x2A8A3A, "metal");
thxCyl(0.03, 2.5, gr, 0, 1.25, 0.1, g, 8);
thxBox(0.03, 0.03, 0.5, gr, 0, 2.5, 0.32, g);
thxCyl(0.16, 0.08, thxMat(0xE8C020, "metal"), 0, 2.42, 0.55, g, 12, 0.06);
thxBox(0.03, 0.7, 0.03, thxMat(0x5A6068, "metal"), 0, 2.0, 0.55, g);
thxBox(0.1, 0.03, 0.03, gr, 0.04, 1.68, 0.55, g);
thxCyl(0.15, 0.06, thxMat(0xE8C020, "metal"), 0.3, 1.0, 0.3, g, 12);
thxCyl(0.02, 0.9, gr, 0.3, 0.5, 0.3, g, 8);
thxBox(0.3, 0.3, 0.01, thxMat(0x2A9A4A, null), 0, 1.85, 0.01, g);
thxBox(0.18, 0.05, 0.012, thxMat(0xF4F4F4, null), 0, 1.88, 0.012, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x + s * 0.3, z + c * 0.3, 0.3, 0.3, 0, 0.3);
},
function (x, z, ry, n) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var wh = thxMat(0xF4F6F8, null);
thxBox(n * 0.4 + 0.2, 0.06, 0.03, thxMat(0x8A6A48, "wood"), 0, 1.75, 0.02, g);
for (var i = 0; i < n; i++) {
var cx = -(n - 1) * 0.2 + i * 0.4;
thxBox(0.34, 0.95, 0.12, wh, cx, 1.22, 0.08, g);
thxBox(0.12, 0.4, 0.1, wh, cx - 0.16, 1.45, 0.09, g).rotation.z = 0.12;
thxBox(0.12, 0.4, 0.1, wh, cx + 0.16, 1.45, 0.09, g).rotation.z = -0.12;
}
},
function (x, z, ry, kind) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
var st = thxMat(0xC8CCD0, "metal"), blk = thxMat(0x24282E, null);
[0.25, 0.85].forEach(function (y) { thxBox(0.8, 0.03, 0.5, st, 0, y, 0, g); });
[[-0.38, -0.23], [0.38, -0.23], [-0.38, 0.23], [0.38, 0.23]].forEach(function (p) { thxBox(0.03, 0.86, 0.03, st, p[0], 0.45, p[1], g); thxSph(0.04, blk, p[0], 0.04, p[1], g, 6); });
if (kind === "tools") {
thxBox(0.5, 0.12, 0.3, thxMat(0xC81A1A, "metal"), 0, 0.93, 0, g);
thxBox(0.3, 0.04, 0.05, blk, 0.1, 0.29, 0.1, g);
thxBox(0.05, 0.2, 0.05, thxMat(0xE8C020, null), -0.25, 0.37, 0, g);
}
else if (kind === "linen") {
for (var l = 0; l < 3; l++)
thxBox(0.6, 0.08, 0.4, thxMat([0xF4F6F8, 0x8AC8E8, 0xF4F6F8][l], null), 0, 0.31 + l * 0.09, 0, g);
}
else {
for (var b = 0; b < 4; b++)
thxCyl(0.05, 0.16, thxMat([0xCFE8F0, 0xE8A03A, 0x6AC8E8, 0xF4F4F4][b], null, { op: 0.6 }), -0.25 + b * 0.17, 0.95, 0, g, 8);
thxBox(0.3, 0.12, 0.2, thxMat(0x5A7AC8, null), 0, 0.32, 0, g);
}
thxSolid(x, z, 0.45, 0.45, 0, 1);
},
function (x, z, w, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxBox(w, 0.6, 0.5, thxMat(0x3A3E44, "metal"), 0, 0.3, 0, g);
thxBox(w - 0.06, 0.02, 0.44, thxMat(0x3A2A1E, null), 0, 0.6, 0, g);
var n = Math.max(2, Math.round(w / 0.6)), lf = thxMat(0x2E6A30, null), lf2 = thxMat(0x4A8A3A, null);
for (var i = 0; i < n; i++) {
var px = -w / 2 + 0.3 + i * (w - 0.6) / Math.max(1, n - 1);
for (var k = 0; k < (THX.lite ? 3 : 6); k++) {
var a = k * 1.05 + i, L = thxBox(0.08, 0.8 + (k % 3) * 0.15, 0.012, k % 2 ? lf : lf2, px + Math.cos(a) * 0.08, 1.0 + (k % 3) * 0.07, Math.sin(a) * 0.08, g);
L.rotation.y = -a;
L.rotation.z = 0.3 + (k % 2) * 0.2;
}
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s) * 0.25, Math.abs(s) * w / 2 + Math.abs(c) * 0.25, 0, 1.4);
},
function () {
var k = "drack";
if (THX.mats[k])
return THX.mats[k];
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 256;
var c = cv.getContext("2d");
c.fillStyle = "#14171C";
c.fillRect(0, 0, 64, 256);
for (var u = 0; u < 32; u++) {
c.fillStyle = u % 4 === 0 ? "#22262E" : "#1A1E24";
c.fillRect(3, u * 8 + 1, 58, 7);
c.fillStyle = "#0A0C10";
for (var v = 0; v < 6; v++)
c.fillRect(8 + v * 6, u * 8 + 3, 4, 3);
var n = Math.sin(u * 91.7) * 1000;
n = n - Math.floor(n);
c.fillStyle = n > 0.6 ? "#3AE86A" : n > 0.3 ? "#4AE8FF" : "#FFB43A";
c.fillRect(48, u * 8 + 3, 3, 3);
if (n > 0.5) {
c.fillStyle = "#3AE86A";
c.fillRect(54, u * 8 + 3, 3, 3);
}
}
var m = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) });
THX.mats[k] = m;
return m;
},
function (x, z, ry, h) {
h = h || 2.0;
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
THX.F.add(g);
thxBox(0.62, h, 1.0, thxMat(0x1A1E24, "metal"), 0, h / 2, 0, g);
var f = new THREE.Mesh(new THREE.PlaneGeometry(0.54, h - 0.12), thxDRackMat());
f.position.set(0, h / 2, 0.505);
g.add(f);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
thxSolid(x, z, Math.abs(c) * 0.31 + Math.abs(s) * 0.5, Math.abs(s) * 0.31 + Math.abs(c) * 0.5, 0, h);
return g;
},
function (x, z, ry, col) {
thxSofa(x, 0, z, ry, 2.2, col || 0x4A5A6E);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0), tx = x - s * 1.2, tz = z - c * 1.2;
thxBox(1.1, 0.04, 0.6, thxMat(0x6A4A32, "wood"), tx, 0.42, tz);
thxBox(1.0, 0.4, 0.5, thxMat(0x2A2C30, "metal"), tx, 0.2, tz);
thxSolid(tx, tz, 0.55, 0.3, 0, 0.45);
if (!THX.lite) {
thxBox(0.25, 0.03, 0.3, thxDPaperMat("notice", 3), tx - 0.2, 0.455, tz);
thxCyl(0.04, 0.09, thxMat(0xF4F2EC, null), tx + 0.25, 0.485, tz, null, 8);
for (var k = -1; k <= 1; k += 2) {
var cu = thxBox(0.4, 0.36, 0.12, thxMat(0xC8A878, null), x + c * k * 0.6 + s * 0.1, 0.62, z - s * k * 0.6 + c * 0.1);
cu.rotation.y = ry || 0;
}
}
},
function (r, o) {
if (!r || r.side !== "n")
return;
o = o || {};
var zb = r.z1 + 0.25, lite = THX.lite;
thxDClock(r.door.x, 2.85, zb - 0.11, Math.PI);
if (r.door.x - 1.0 > r.x0 + 0.05)
thxDFire(r.door.x - 1.0, zb - 0.09, Math.PI);
if (o.bins !== false)
thxDBins(r.x1 - 0.3, r.z1 - 0.3, !lite);
var wx = o.west ? r.x0 - 0.12 : r.x1 + 0.12, wry = o.west ? Math.PI / 2 : -Math.PI / 2;
if (o.wall === "board")
thxDWhiteboard(wx, 1.55, o.wz !== undefined ? o.wz : r.cz, wry, o.ww || 2.0, 1.0, r.cx | 0);
else if (o.wall === "pin")
thxDPinboard(wx, 1.6, o.wz !== undefined ? o.wz : r.cz, wry, o.ww || 1.6, 1.0, r.cx | 0);
else if (o.wall === "art")
thxArt(wx, 1.75, o.wz !== undefined ? o.wz : r.cz, wry, 1.4, 1.0, (r.cx | 0) + 3);
if (o.rug)
thxDRug(r.cx, r.cz + (o.rugZ || 0), o.rug[0], o.rug[1], o.rugCol || 0x5A3A3A, o.rugB);
if (o.pend)
o.pend.forEach(function (p) { thxDPendant(r.cx + p[0], THX_H, r.cz + p[1], o.pendCol); });
},
function (F, col) {
var z = F.z1 - 5.4;
[-1, 1].forEach(function (s) {
thxSofa(s * (F.W / 2 - 2.2), 0, z, s > 0 ? -Math.PI / 2 : Math.PI / 2, 2.4, col || 0x33415A);
thxPlant(s * (F.W / 2 - 1.4), 0, z + 3.2, 1);
thxBox(0.5, 0.04, 0.5, thxMat(0x6A4A32, "wood"), s * (F.W / 2 - 2.0), 0.5, z + 1.9);
thxCyl(0.04, 0.5, thxMat(0x2A2C30, "metal"), s * (F.W / 2 - 2.0), 0.25, z + 1.9, null, 6);
});
},
function () {
var k = "dgene|karyo";
if (THX.mats[k])
return THX.mats[k];
var cv = document.createElement("canvas");
cv.width = 280;
cv.height = 200;
var c = cv.getContext("2d");
c.fillStyle = "#F8F8F4";
c.fillRect(0, 0, 280, 200);
c.fillStyle = "#1A2230";
c.font = "bold 13px sans-serif";
c.fillText("HUMAN KARYOTYPE · 46 chromosomes", 10, 18);
for (var i = 0; i < 23; i++) {
var x = 14 + (i % 8) * 33, y = 40 + Math.floor(i / 8) * 52, h = 36 - i * 1.1;
for (var s = 0; s < 2; s++) {
c.fillStyle = "#8A6AA8";
c.fillRect(x + s * 9, y, 7, Math.max(10, h));
c.fillStyle = "#3A2A5A";
for (var b = 0; b < 4; b++)
c.fillRect(x + s * 9, y + 4 + b * (h / 4), 7, 2);
}
c.fillStyle = "#3A4250";
c.font = "9px sans-serif";
c.fillText(i < 22 ? String(i + 1) : "XY", x + 2, y + Math.max(10, h) + 10);
}
THX.mats[k] = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv) });
return THX.mats[k];
},
function () {
var k = "dgene|codon";
if (THX.mats[k])
return THX.mats[k];
var cv = document.createElement("canvas");
cv.width = cv.height = 220;
var c = cv.getContext("2d");
c.fillStyle = "#F8F8F4";
c.fillRect(0, 0, 220, 220);
var L = "UCAG", cols = ["#E84A4A", "#3A8AFF", "#3AD06A", "#FFD24A"];
for (var ring = 0; ring < 3; ring++) {
var n = Math.pow(4, ring + 1), r0 = 20 + ring * 28, r1 = r0 + 28;
for (var i = 0; i < n; i++) {
c.beginPath();
c.moveTo(110 + Math.cos(i / n * 6.283) * r0, 110 + Math.sin(i / n * 6.283) * r0);
c.arc(110, 110, r1, i / n * 6.283, (i + 1) / n * 6.283);
c.arc(110, 110, r0, (i + 1) / n * 6.283, i / n * 6.283, true);
c.fillStyle = cols[i % 4];
c.globalAlpha = 0.35 + ring * 0.2;
c.fill();
c.globalAlpha = 1;
c.strokeStyle = "#FFFFFF";
c.stroke();
}
}
c.fillStyle = "#1A2230";
c.font = "bold 12px sans-serif";
c.textAlign = "center";
c.fillText("THE CODON WHEEL", 110, 214);
c.font = "bold 14px sans-serif";
for (var q = 0; q < 4; q++)
c.fillText(L[q], 110 + Math.cos((q + 0.5) / 4 * 6.283) * 32, 115 + Math.sin((q + 0.5) / 4 * 6.283) * 32);
THX.mats[k] = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv) });
return THX.mats[k];
},
function () {
if (!thxKeeper() && thxLevel() < 5) {
thxSay("🔒 The Heart is level 5. Only the Keeper's card opens it.");
return false;
}
var c = thxCfg().floors.heart;
if (c && c.on === false && !thxKeeper()) {
thxSay("🔒 The Heart is shut today.");
return false;
}
if (WLD.on !== THX.key) {
THX.want = "heart";
worldGo(THX.key, { fromName: "the Somnucor Tower" });
}
else {
worldCard(null);
thxBuildFloor("heart");
thxArrive();
}
thxSay("🕸️ The lift sinks a long way, and opens on <b>WHITE WIDOW's Heart</b>.");
if (typeof thxWidowAsk === "function" && thxWidowOn())
thxWidowAsk(null, "The Keeper has just come down in the lift into your Heart, the great round hall under the Web where your core stands. Say one short line to greet him there, as yourself. Do not ask a question.", function (t) { if (t)
thxWidowSay(t); });
return true;
},
function (kind) {
var k = "heart|" + kind;
if (THX.mats[k])
return THX.mats[k];
var cv = document.createElement("canvas"), c, m;
if (kind === "wall") {
cv.width = 256;
cv.height = 256;
c = cv.getContext("2d");
c.fillStyle = "#120E18";
c.fillRect(0, 0, 256, 256);
for (var y = 0; y < 256; y += 64)
for (var x = 0; x < 256; x += 128) {
var g = c.createLinearGradient(x, y, x + 128, y + 64);
g.addColorStop(0, "#1C1724");
g.addColorStop(1, "#141019");
c.fillStyle = g;
c.fillRect(x + 3, y + 3, 122, 58);
}
c.strokeStyle = "rgba(192,80,255,0.35)";
c.lineWidth = 1;
for (var yy = 0; yy < 256; yy += 64) {
c.beginPath();
c.moveTo(0, yy + 1);
c.lineTo(256, yy + 1);
c.stroke();
}
c.fillStyle = "rgba(232,220,255,0.5)";
for (var d = 0; d < 10; d++)
c.fillRect((d * 53) % 250, (d * 97) % 250, 2, 2);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(16, 4);
m = new THREE.MeshLambertMaterial({ map: t, side: THREE.BackSide });
}
else if (kind === "floor") {
cv.width = cv.height = 256;
c = cv.getContext("2d");
c.fillStyle = "#17131C";
c.fillRect(0, 0, 256, 256);
for (var v = 0; v < 40; v++) {
c.strokeStyle = "rgba(200,190,220," + (0.04 + (v % 5) * 0.015) + ")";
c.lineWidth = 1 + (v % 3);
c.beginPath();
var vx = (v * 61) % 256, vy = (v * 37) % 256;
c.moveTo(vx, vy);
for (var s = 0; s < 6; s++) {
vx += ((v * s * 13) % 40) - 12;
vy += ((v * s * 7) % 30) - 8;
c.lineTo(vx, vy);
}
c.stroke();
}
c.strokeStyle = "rgba(0,0,0,0.5)";
c.lineWidth = 2;
c.strokeRect(1, 1, 254, 254);
var t2 = new THREE.CanvasTexture(cv);
t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
t2.repeat.set(9, 9);
m = new THREE.MeshLambertMaterial({ map: t2, color: 0xB8B0C8 });
}
else if (kind === "well") {
cv.width = cv.height = 512;
c = cv.getContext("2d");
var rg = c.createRadialGradient(256, 256, 10, 256, 256, 256);
rg.addColorStop(0, "#F4ECFF");
rg.addColorStop(0.12, "#B070F0");
rg.addColorStop(0.5, "#3A1A5A");
rg.addColorStop(1, "#0A0610");
c.fillStyle = rg;
c.fillRect(0, 0, 512, 512);
c.strokeStyle = "rgba(232,210,255,0.55)";
c.lineWidth = 2;
for (var sp = 0; sp < 16; sp++) {
var a = sp / 16 * Math.PI * 2;
c.beginPath();
c.moveTo(256, 256);
c.lineTo(256 + Math.cos(a) * 256, 256 + Math.sin(a) * 256);
c.stroke();
}
for (var r = 1; r < 9; r++) {
c.beginPath();
for (var q = 0; q <= 16; q++) {
var aa = q / 16 * Math.PI * 2, rr = r * 29 + (q % 2) * 3;
if (q)
c.lineTo(256 + Math.cos(aa) * rr, 256 + Math.sin(aa) * rr);
else
c.moveTo(256 + Math.cos(aa) * rr, 256 + Math.sin(aa) * rr);
}
c.stroke();
}
m = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) });
}
else if (kind === "drawers") {
cv.width = 256;
cv.height = 256;
c = cv.getContext("2d");
c.fillStyle = "#0E0A14";
c.fillRect(0, 0, 256, 256);
for (var rr2 = 0; rr2 < 12; rr2++)
for (var cc = 0; cc < 6; cc++) {
var x0 = 6 + cc * 41, y0 = 4 + rr2 * 21, n = Math.sin((rr2 * 6 + cc) * 12.9898) * 43758.5453;
n -= Math.floor(n);
c.fillStyle = "#1E1828";
c.fillRect(x0, y0, 37, 18);
c.fillStyle = n > 0.82 ? "#F0E4FF" : n > 0.45 ? "rgba(192,80,255,0.85)" : "rgba(120,70,170,0.55)";
c.fillRect(x0 + 4, y0 + 13, 29 * (0.3 + n * 0.7), 2);
c.fillStyle = "rgba(232,220,255,0.6)";
c.fillRect(x0 + 15, y0 + 5, 8, 3);
}
m = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) });
}
else if (kind === "mist") {
cv.width = cv.height = 256;
c = cv.getContext("2d");
var mg = c.createRadialGradient(128, 128, 10, 128, 128, 128);
mg.addColorStop(0, "rgba(200,170,255,0.55)");
mg.addColorStop(0.6, "rgba(140,90,200,0.18)");
mg.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = mg;
c.fillRect(0, 0, 256, 256);
m = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
}
THX.mats[k] = m;
return m;
},
function (c, W, H, i) {
var names = ["PLAZA · TOWER DOOR", "RING ROAD NORTH", "THE MARKET", "AIRPORT APRON", "HARBOUR WALL", "CRESCENT", "CITY HALL STEPS", "THE PARK GATES", "COMMONS"];
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, ["#1A2440", "#2A3A5A", "#1E2A3E"][i % 3]);
g.addColorStop(0.6, "#3A3446");
g.addColorStop(1, "#2A2A30");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
function R(n) { n = Math.sin((i + 2) * n * 12.9898) * 43758.5453; return n - Math.floor(n); }
var hz = H * (0.45 + R(1) * 0.15);
for (var b = 0; b < 14; b++) {
var bw = W * (0.05 + R(b + 3) * 0.08), bh = H * (0.15 + R(b + 9) * 0.35), bx = b * W / 13 - 10;
c.fillStyle = ["#14161E", "#1C1E28", "#22202A"][b % 3];
c.fillRect(bx, hz - bh, bw, bh);
c.fillStyle = "#E8C870";
for (var w = 0; w < 10; w++)
if (R(b * 11 + w) > 0.55)
c.fillRect(bx + 4 + (w % 3) * (bw / 3.2), hz - bh + 6 + Math.floor(w / 3) * 14, 3, 4);
}
c.fillStyle = "#3A3A40";
c.beginPath();
c.moveTo(0, H);
c.lineTo(W * 0.38, hz);
c.lineTo(W * 0.62, hz);
c.lineTo(W, H);
c.fill();
c.strokeStyle = "rgba(240,230,190,0.5)";
c.lineWidth = 2;
c.setLineDash([10, 10]);
c.beginPath();
c.moveTo(W / 2, H);
c.lineTo(W / 2, hz);
c.stroke();
c.setLineDash([]);
for (var p = 0; p < 7; p++) {
var px = W * (0.25 + R(p + 20) * 0.5), py = hz + (H - hz) * (0.2 + R(p + 30) * 0.7), s = (py - hz) / (H - hz);
c.fillStyle = "#0A0A0E";
c.fillRect(px, py - 22 * s, 7 * s, 22 * s);
c.beginPath();
c.arc(px + 3.5 * s, py - 25 * s, 4 * s, 0, 7);
c.fill();
}
for (var l = 0; l < 4; l++) {
c.fillStyle = "rgba(255,236,170,0.8)";
c.beginPath();
c.arc(W * (0.15 + l * 0.25), hz - H * 0.12, 3, 0, 7);
c.fill();
}
c.fillStyle = "rgba(0,0,0,0.45)";
c.fillRect(0, 0, W, 18);
c.fillStyle = "#F4F4F4";
c.font = "bold 12px monospace";
c.fillText("CAM " + (11 + i) + " · " + names[i % names.length], 6, 13);
c.fillStyle = "#E84A4A";
c.beginPath();
c.arc(W - 12, 9, 4, 0, 7);
c.fill();
c.strokeStyle = "rgba(192,80,255,0.6)";
c.lineWidth = 2;
c.strokeRect(1, 1, W - 2, H - 2);
},
function (x, y, z, ry) {
var body = new THREE.MeshLambertMaterial({ color: 0xDCD4F8, emissive: 0x8A6AC8, emissiveIntensity: 0.55, transparent: true, opacity: 0.78 });
var wire = new THREE.MeshBasicMaterial({ color: 0xC88AFF, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, wireframe: true });
var fig = null;
try {
if (typeof wPerson === "function")
fig = wPerson("thx_white_widow", { title: "WHITE WIDOW", sex: "f" });
}
catch (e) {
fig = null;
}
if (!fig) {
fig = new THREE.Group();
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.34, 1.55, 14), body);
b.position.y = 0.78;
fig.add(b);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), body);
h.position.y = 1.72;
fig.add(h);
}
function light() {
fig.traverse(function (m) {
if (!(m.isMesh || m.isSkinnedMesh) || m.userData.hw)
return;
if (m.material !== body) {
m.material = body;
m.castShadow = false;
m.raycast = function () { };
if (!m.isSkinnedMesh && m.geometry && !THX.lite) {
var w = new THREE.Mesh(m.geometry, wire);
w.userData.hw = 1;
w.raycast = function () { };
m.add(w);
}
}
});
}
light();
fig.scale.setScalar(1.14);
fig.position.set(x, y, z);
fig.rotation.y = ry || 0;
fig.userData.keep = 1;
THX.F.add(fig);
var lift = 0, bb = new THREE.Box3();
function feet() { try {
fig.position.y = y + lift;
fig.updateMatrixWorld(true);
bb.setFromObject(fig);
if (isFinite(bb.min.y) && bb.max.y - bb.min.y > 1.0) {
var d = y - bb.min.y;
if (Math.abs(d) > 0.03)
lift += d;
}
}
catch (e) { } }
feet();
var n = 0, life = 0;
THX.fx.push(function (dt, t) { n += dt; life += dt; if (n > (life < 30 ? 0.4 : 3)) {
n = 0;
light();
if (life < 30)
feet();
} body.opacity = 0.74 + Math.sin(t * 0.7) * 0.06; fig.position.y = y + lift + Math.sin(t * 0.5) * 0.03; });
var pool = new THREE.Mesh(new THREE.CircleGeometry(0.9, 28), thxHeartTex("mist"));
pool.rotation.x = -Math.PI / 2;
pool.position.set(x, y + 0.02, z);
pool.userData.keep = 1;
THX.F.add(pool);
return fig;
},
function () {
var R = THXH.R, HH = THXH.H, lite = THX.lite, g = THX.F, keep = new THREE.Group();
keep.userData.keep = 1;
g.add(keep);
var dark = thxMat(0x1E1A26, "metal"), steel = thxMat(0x5A5868, "metal"), violet = thxGlow(0xC050FF), pale = thxGlow(0xE8DCFF);
var fl = new THREE.Mesh(new THREE.RingGeometry(8, R + 0.2, 64, 1), thxHeartTex("floor"));
fl.rotation.x = -Math.PI / 2;
g.add(fl);
thxFloorAt(-R, -R, R, R, 0);
var wellR = 8, wellD = 7.5;
var wall = new THREE.Mesh(new THREE.CylinderGeometry(wellR, wellR * 0.85, wellD, 48, 1, true), new THREE.MeshLambertMaterial({ color: 0x2A2236, side: THREE.BackSide }));
wall.position.y = -wellD / 2;
g.add(wall);
var bot = new THREE.Mesh(new THREE.CircleGeometry(wellR * 0.85, 48), thxHeartTex("well"));
bot.rotation.x = -Math.PI / 2;
bot.position.y = -wellD;
keep.add(bot);
for (var lr = 0; lr < (lite ? 2 : 4); lr++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(wellR * (1 - 0.15 * (lr + 1) / 4) - 0.05, 0.05, 6, 64), lr % 2 ? violet : pale);
ring.rotation.x = Math.PI / 2;
ring.position.y = -1.4 - lr * 1.6;
g.add(ring);
}
for (var wr = 0; wr < (lite ? 8 : 16); wr++) {
var wa = wr / (lite ? 8 : 16) * Math.PI * 2, rk = thxDRack(Math.cos(wa) * (wellR - 0.7), Math.sin(wa) * (wellR - 0.7), -wa - Math.PI / 2, 2.2);
rk.position.y = -3.4;
rk.rotation.y = Math.PI / 2 - wa + Math.PI;
}
THX.solids.length = 0;
var glass = new THREE.Mesh(new THREE.CircleGeometry(wellR, 64), new THREE.MeshLambertMaterial({ color: 0x7A60A8, transparent: true, opacity: 0.22, depthWrite: false }));
glass.rotation.x = -Math.PI / 2;
glass.position.y = 0.005;
keep.add(glass);
for (var sp = 0; sp < 16; sp++) {
var a = sp / 16 * Math.PI * 2, s = thxBox(wellR - 0.2, 0.05, 0.09, steel, Math.cos(a) * wellR / 2, 0.025, Math.sin(a) * wellR / 2);
s.rotation.y = -a;
}
[2.6, 4.4, 6.2, 7.95].forEach(function (rr) { var t = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.05, 4, 64), steel); t.rotation.x = Math.PI / 2; t.position.y = 0.03; g.add(t); });
var edge = new THREE.Mesh(new THREE.TorusGeometry(wellR + 0.1, 0.06, 4, 72), violet);
edge.rotation.x = Math.PI / 2;
edge.position.y = 0.02;
g.add(edge);
var dimV = thxGlow(0x6A2A9A), dimP = thxGlow(0x6A6080);
for (var fs = 0; fs < 16; fs++) {
var fa = (fs + 0.5) / 16 * Math.PI * 2, L = R - 1.6 - wellR, st = thxBox(L, 0.008, 0.03, fs % 2 ? dimV : dimP, Math.cos(fa) * (wellR + L / 2 + 0.2), 0.006, Math.sin(fa) * (wellR + L / 2 + 0.2));
st.rotation.y = -fa;
}
[11.5, 15.2].forEach(function (rr) { var t2 = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.018, 3, 96), dimV); t2.rotation.x = Math.PI / 2; t2.position.y = 0.008; g.add(t2); });
var drum = new THREE.Mesh(new THREE.CylinderGeometry(R, R, HH, 64, 1, true, 0.115, Math.PI * 2 - 0.23), thxHeartTex("wall"));
drum.position.y = HH / 2;
g.add(drum);
var dome = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x14101A, side: THREE.BackSide }));
dome.scale.y = 0.32;
dome.position.y = HH;
g.add(dome);
var BAYS = 24;
for (var rb = 0; rb < BAYS; rb++) {
var ra = (rb + 0.5) / BAYS * Math.PI * 2, rib = thxBox(0.5, HH, 0.7, dark, Math.cos(ra) * (R - 0.3), HH / 2, Math.sin(ra) * (R - 0.3));
rib.rotation.y = -ra;
var seam = thxBox(0.05, HH - 1, 0.05, rb % 2 ? violet : pale, Math.cos(ra) * (R - 0.67), HH / 2, Math.sin(ra) * (R - 0.67));
seam.rotation.y = -ra;
}
var bal = new THREE.Mesh(new THREE.RingGeometry(R - 2.2, R, 72, 1), dark);
bal.rotation.x = Math.PI / 2;
bal.position.y = 4.4;
g.add(bal);
var balF = new THREE.Mesh(new THREE.CylinderGeometry(R - 2.2, R - 2.2, 0.3, 72, 1, true), steel);
balF.position.y = 4.3;
g.add(balF);
var rail = new THREE.Mesh(new THREE.TorusGeometry(R - 2.25, 0.04, 4, 96), pale);
rail.rotation.x = Math.PI / 2;
rail.position.y = 5.45;
g.add(rail);
var rail2 = new THREE.Mesh(new THREE.TorusGeometry(R - 2.25, 0.03, 4, 96), steel);
rail2.rotation.x = Math.PI / 2;
rail2.position.y = 4.95;
g.add(rail2);
for (var bp = 0; bp < 48; bp++) {
var pa = bp / 48 * Math.PI * 2;
thxBox(0.05, 1.0, 0.05, steel, Math.cos(pa) * (R - 2.25), 4.95, Math.sin(pa) * (R - 2.25));
}
var hi = new THREE.Mesh(new THREE.TorusGeometry(R - 0.8, 0.06, 4, 96), violet);
hi.rotation.x = Math.PI / 2;
hi.position.y = HH - 0.6;
g.add(hi);
var MEM = [[0, "The dreams", "🌙", "Every dream written in the journals of the dreamers who keep them to their accounts: the places in them, the people, the colours. Never read aloud, never shared: she keeps them as a librarian keeps a locked case."],
[3, "The worlds", "🌍", "Every world beyond the Hall of Doors: the books they come from, the roads and rooms in them, who is in them now, and what has broken in them and been mended."],
[9, "The city", "🏙️", "Somnucor itself: every street, every building and every door, the drones and the cameras, the shops and their takings, the trains and the weather."],
[12, "The people", "👥", "The living people of the city: their names, their work, their homes, what they said to whom and what they promised. They are hers to look after."],
[15, "The Keeper", "🗝️", "The Keeper's own: his plans, his rules for the game, what he has asked of her and what he told her to remember. The one drawer no one else opens."],
[21, "Herself", "🕸️", "What she has thought between conversations, what she has decided, what she likes and what she will not stand for. She keeps her own counsel here."]];
var memAt = {};
MEM.forEach(function (m) { memAt[m[0]] = m; });
for (var b = 0; b < BAYS; b++) {
var ba = b / BAYS * Math.PI * 2, cx = Math.cos(ba), cz = Math.sin(ba), face = -ba - Math.PI / 2;
if (b === 6)
continue;
if (b === 18) {
thxHeartEyes(ba);
continue;
}
if (memAt[b]) {
thxHeartAlcove(ba, memAt[b]);
continue;
}
for (var k = -1; k <= 1; k++) {
var off = k * 0.66, px = cx * (R - 1.4) - cz * off, pz = cz * (R - 1.4) + cx * off;
var rk2 = thxDRack(px, pz, 0, 2.3);
rk2.rotation.y = Math.PI / 2 - ba + Math.PI;
if (!lite || k === 0) {
var up = thxDRack(px * 0.995, pz * 0.995, 0, 2.3);
up.position.y = 4.45;
up.rotation.y = Math.PI / 2 - ba + Math.PI;
THX.solids.pop();
}
}
var cb = thxBox(1.2, 0.08, 0.3, thxMat(0x2A2632, null), cx * (R - 2.6), 0.04, cz * (R - 2.6));
cb.rotation.y = -ba;
}
for (var w = 0; w < 72; w++) {
var wa2 = w / 72 * Math.PI * 2;
if (Math.abs(wa2 - Math.PI / 2) < 0.12)
continue;
thxRound(Math.cos(wa2) * (R - 0.9), Math.sin(wa2) * (R - 0.9), 0.9, HH);
}
thxHeartLift();
thxHeartCore();
thxHeartFigure(0, 0.45, 2.3, 0);
thxSpot(0, 3.4, 2.2, "🕸️ WHITE WIDOW", "speak with her", function () {
if (thxLevel() < 5 && !thxKeeper()) {
thxSay("🔒 The Heart is level 5.");
return;
}
thxWidowOpen("I am standing in your Heart, in front of you.");
}, { lv: 5 });
thxHeartConsole();
thxHeartWeb();
if (!lite) {
for (var mi = 0; mi < 3; mi++) {
var mist = new THREE.Mesh(new THREE.PlaneGeometry(26 - mi * 5, 26 - mi * 5), thxHeartTex("mist"));
mist.rotation.x = -Math.PI / 2;
mist.position.y = 0.25 + mi * 0.35;
keep.add(mist);
(function (m, s) { THX.fx.push(function (dt, t) { m.rotation.z = t * 0.02 * s; }); })(mist, mi % 2 ? 1 : -1);
}
}
try {
var M = thxShellMats();
for (var d = 0; d < (lite ? 1 : 2); d++) {
var Q = thxQuad(M);
Q.scale.setScalar(0.6);
Q.userData.keep = 1;
g.add(Q);
(function (Q, ph) { THX.fx.push(function (dt, t) { var a = t * 0.07 + ph; Q.position.set(Math.cos(a) * 11, 6.5 + Math.sin(t * 0.3 + ph) * 0.6, Math.sin(a) * 11); Q.rotation.y = -a; }); })(Q, d * Math.PI);
}
}
catch (e) { }
},
function () {
var dark = thxMat(0x1E1A26, "metal"), steel = thxMat(0x8A8898, "metal"), vio = thxGlow(0xC050FF), zc = 17.6, zd = 19.35;
thxBox(0.4, 3.4, 3.6, dark, -1.8, 1.7, zc);
thxBox(0.4, 3.4, 3.6, dark, 1.8, 1.7, zc);
thxBox(4, 0.4, 3.6, dark, 0, 3.6, zc);
thxSolid(-1.8, zc, 0.2, 1.8, 0, 3.4);
thxSolid(1.8, zc, 0.2, 1.8, 0, 3.4);
thxBox(3.2, 0.012, 3.6, thxMat(0x2A2632, "metal"), 0, 0.006, zc);
thxBox(0.04, 0.04, 3.4, vio, -1.58, 0.06, zc);
thxBox(0.04, 0.04, 3.4, vio, 1.58, 0.06, zc);
thxBox(1.3, 2.6, 0.08, steel, -0.66, 1.3, zd);
thxBox(1.3, 2.6, 0.08, steel, 0.66, 1.3, zd);
thxBox(0.02, 2.6, 0.09, thxMat(0x1A1A1A, null), 0, 1.3, zd);
thxBox(3.0, 0.05, 0.05, vio, 0, 2.75, zd - 0.05);
thxBox(0.05, 2.75, 0.05, vio, -1.45, 1.37, zd - 0.05);
thxBox(0.05, 2.75, 0.05, vio, 1.45, 1.37, zd - 0.05);
thxBox(3.2, 0.6, 0.1, dark, 0, 3.1, zd);
thxSign(["⬆  THE WEB · B2"], 1.6, 0.3, "#0E0812", "#E8DCFF", 0, 3.1, zd - 0.07, Math.PI);
thxSign(["THE HEART · B5", "level 5 · the Keeper"], 2.6, 0.5, "#0E0812", "#C050FF", 0, 3.1, 15.85, 0);
thxSpot(0, THX_FD / 2 - 2.3, 1.8, "🛗 The lift", "go up to the Web, or anywhere in the Tower", function () {
worldCard(worldFacts("🛗 The Heart's lift", "", [], []) + worldBtn("web", "⬆️ Up to the Web (B2)", "the hub, by the Heart's door") + worldBtn("dir", "🛗 The Helix lifts", "every floor of the Tower"), { web: function () { worldCard(null); thxGoFloor("web"); }, dir: function () { worldCard(null); thxDirectory(); } });
});
},
function () {
var g = new THREE.Group();
g.userData.keep = 1;
THX.F.add(g);
var HH = THXH.H, lite = THX.lite, stone = thxMat(0x241E2E, "marble"), violet = thxGlow(0xC050FF), pale = thxGlow(0xE8DCFF);
[[5.2, 0.15], [4.4, 0.3], [3.6, 0.45]].forEach(function (S, i) {
var d = thxCyl(S[0], 0.15, stone, 0, S[1] - 0.075, 0, null, 48);
var lip = new THREE.Mesh(new THREE.TorusGeometry(S[0] + 0.01, 0.025, 4, 72), i === 2 ? pale : violet);
lip.rotation.x = Math.PI / 2;
lip.position.y = S[1] - 0.14;
THX.F.add(lip);
var hw = S[0] * 0.7;
thxFloorAt(-hw, -hw, hw, hw, S[1]);
});
var col = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, HH - 0.45, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x9A70D8, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
col.position.y = 0.45 + (HH - 0.45) / 2;
g.add(col);
var fil = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, HH - 0.45, 12), pale);
fil.position.y = 0.45 + (HH - 0.45) / 2;
g.add(fil);
var halo = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, HH - 0.45, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xC050FF, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
halo.position.y = fil.position.y;
g.add(halo);
thxCyl(1.75, 0.6, thxMat(0x2A2434, "metal"), 0, 0.75, 0, g, 32);
thxCyl(1.6, 0.04, violet, 0, 1.07, 0, g, 32);
thxCyl(1.9, 0.8, thxMat(0x2A2434, "metal"), 0, THXH.H - 0.4, 0, g, 32);
thxRound(0, 0, 1.8, HH);
var rings = [];
for (var i = 0; i < (lite ? 4 : 7); i++) {
var r = new THREE.Mesh(new THREE.TorusGeometry(1.65 + ((i % 3) * 0.12), 0.03, 4, 48), i % 2 ? violet : pale);
r.position.y = 1.8 + i * 1.5;
r.rotation.x = Math.PI / 2;
g.add(r);
rings.push(r);
}
var N = lite ? 50 : 180, pos = new Float32Array(N * 3), sp = [];
for (var p = 0; p < N; p++) {
var a = Math.random() * Math.PI * 2, rr = 0.25 + Math.random() * 1.05;
pos[p * 3] = Math.cos(a) * rr;
pos[p * 3 + 1] = 0.5 + Math.random() * (HH - 1);
pos[p * 3 + 2] = Math.sin(a) * rr;
sp.push(0.25 + Math.random() * 0.6);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xF0E4FF, size: 0.09, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
g.add(pts);
THX.fx.push(function (dt, t) {
rings.forEach(function (r, i) { r.position.y = 1.8 + ((i * 1.5 + t * 0.35 * (1 + i * 0.07)) % (HH - 2.6)); r.rotation.z = t * 0.2 * (i % 2 ? 1 : -1); });
for (var q = 0; q < N; q++) {
var y = pos[q * 3 + 1] + sp[q] * dt;
if (y > HH - 0.5)
y = 0.6;
pos[q * 3 + 1] = y;
}
geo.attributes.position.needsUpdate = true;
halo.material.opacity = 0.2 + Math.sin(t * 0.6) * 0.06;
col.material.opacity = 0.2 + Math.sin(t * 0.4 + 1) * 0.04;
});
thxSpot(0, -2.6, 2.2, "🕸️ The core", "what the Heart is", function () {
worldCard(worldFacts("🕸️ WHITE WIDOW's Heart", "B5, under the Web, under the plaza", [["The core", "the column of light: where she thinks. The machines round the walls feed it, and it never goes dark"], ["The well", "her deepest machines, under the glass at your feet"], ["The web", "every strand overhead is a line to somewhere she looks after: a floor, a world, a person"], ["The alcoves", "six walls of memory: the dreams, the worlds, the city, the people, the Keeper, and herself"], ["Her eyes", "the city's cameras, on the north wall"], ["Who may come", "the Keeper's card, level 5, and no other"]], ["Nothing in here flashes and nothing is loud. She likes it that way."]), {});
}, { lv: 5 });
},
function (ba, M) {
var R = THXH.R, cx = Math.cos(ba), cz = Math.sin(ba), g = new THREE.Group();
g.position.set(cx * (R - 1.0), 0, cz * (R - 1.0));
g.rotation.y = Math.PI / 2 - ba + Math.PI;
g.userData.keep = 1;
THX.F.add(g);
var dark = thxMat(0x1E1A26, "metal"), stone = thxMat(0x2A2434, "marble"), violet = thxGlow(0xC050FF), pale = thxGlow(0xE8DCFF);
var dw = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.6), thxHeartTex("drawers"));
dw.position.set(0, 2.1, -0.25);
g.add(dw);
thxBox(4.2, 0.4, 0.6, stone, 0, 4.1, -0.2, g);
thxBox(0.4, 4.3, 0.6, stone, -1.9, 2.15, -0.2, g);
thxBox(0.4, 4.3, 0.6, stone, 1.9, 2.15, -0.2, g);
thxBox(4.2, 0.25, 0.9, stone, 0, 0.12, 0, g);
thxBox(0.05, 3.6, 0.05, violet, -1.68, 2.1, 0.12, g);
thxBox(0.05, 3.6, 0.05, violet, 1.68, 2.1, 0.12, g);
thxCyl(0.32, 1.0, stone, 0, 0.5, 1.0, g, 16);
thxCyl(0.36, 0.04, violet, 0, 1.0, 1.0, g, 16);
var gly = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), new THREE.MeshBasicMaterial({ color: 0xE8DCFF, wireframe: true }));
gly.position.set(0, 1.5, 1.0);
g.add(gly);
THX.fx.push(function (dt, t) { gly.rotation.y = t * 0.4; gly.position.y = 1.5 + Math.sin(t * 0.8 + ba) * 0.06; });
var sg = thxSign([M[2] + "  " + M[1].toUpperCase()], 2.6, 0.36, "#0E0812", "#E8DCFF", 0, 4.55, 0.1, 0, g);
var px = cx * (R - 3.0), pz = cz * (R - 3.0);
thxSolid(cx * (R - 2.0), cz * (R - 2.0), 0.4, 0.4, 0, 1.1);
thxSpot(px, pz, 2.0, M[2] + " Her memory: " + M[1].toLowerCase(), "look", function () { worldCard(worldFacts(M[2] + " " + M[1], "One of the six walls of her memory", [["What she keeps here", M[3]]], ["Ask her about any of it: she will tell you what she may, and say so when she may not."]), {}); }, { lv: 5 });
},
function (ba) {
var R = THXH.R, cx = Math.cos(ba), cz = Math.sin(ba), g = new THREE.Group();
g.position.set(cx * (R - 1.2), 0, cz * (R - 1.2));
g.rotation.y = Math.PI / 2 - ba + Math.PI;
g.userData.keep = 1;
THX.F.add(g);
var n = 0;
for (var row = 0; row < 3; row++)
for (var col = -1; col <= 1; col++) {
var a = col * 0.24, x = Math.sin(a) * 8.6, z = (Math.cos(a) * 8.6 - 8.6) * -1;
(function (i) { thxScreen(2.0, 1.12, x, 1.05 + row * 1.22, z, -a, function (c, W, H) { thxHeartCam(c, W, H, i); }, g, 150); })(n++);
}
thxBox(6.6, 0.2, 0.7, thxMat(0x1E1A26, "metal"), 0, 4.3, 0.35, g);
thxBox(6.6, 0.04, 0.04, thxGlow(0xC050FF), 0, 4.19, 0.7, g);
thxBox(6.6, 0.12, 0.7, thxMat(0x1E1A26, "metal"), 0, 0.06, 0.35, g);
thxSign(["👁️  HER EYES · THE CITY'S CAMERAS"], 3.6, 0.42, "#0E0812", "#E8DCFF", 0, 4.75, 0.45, 0, g);
thxSolid(cx * (R - 1.4), cz * (R - 1.4), 1.6, 0.6, 0, 4);
thxSpot(cx * (R - 4), cz * (R - 4), 2.6, "👁️ Her eyes", "the city's cameras", function () { worldCard(worldFacts("👁️ Her eyes", "The city's cameras, all of them, all the time", [["Where", "the plaza, the Ring Road, the market, the airport, the harbour, the Crescent, City Hall, the park, the Commons"], ["What she watches for", "crime for Dragon Corp, fires, crowds, a child alone, a drone in trouble"], ["What she does not", "she does not watch anyone at home, and never in the dreams"]], []), {}); }, { lv: 5 });
},
function () {
var steel = thxMat(0x2A2434, "metal"), top = thxMat(0x1A1620, null), violet = thxGlow(0xC050FF);
[-1, 1].forEach(function (s) {
for (var k = 0; k < 3; k++) {
var a = Math.PI / 2 + s * (0.42 + k * 0.2), r = 7.0, x = Math.cos(a) * r, z = Math.sin(a) * r, ry = Math.PI / 2 - a + Math.PI;
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
THX.F.add(g);
thxBox(1.4, 0.8, 0.7, steel, 0, 0.4, 0, g);
thxBox(1.45, 0.05, 0.8, top, 0, 0.82, 0.05, g);
thxBox(1.4, 0.03, 0.02, violet, 0, 0.8, 0.42, g);
var sc = thxScreen(1.2, 0.6, 0, 1.35, -0.2, 0, function (c, W, H) { thxText(c, [["SYSTEMS", "MEMORY", "CITY", "WORLDS", "PEOPLE", "DRONES"][k + (s > 0 ? 3 : 0)], ["all green", "6 walls · in order", "9 cameras · calm", "worlds open: all", "awake: many", "aloft: 31"][k + (s > 0 ? 3 : 0)], "WHITE WIDOW"], W, H, { bg: "#0E0812", head: "#C050FF", fg: "#E8DCFF" }); }, g, 110);
thxSolid(x, z, 0.75, 0.75, 0, 1);
}
});
thxSpot(-4.2, 6.2, 2.0, "🖥️ Her systems", "the report", function () { if (typeof thxWidowReport === "function")
thxWidowReport(); }, { lv: 5 });
var g = new THREE.Group();
g.position.set(0, 0, 7.4);
THX.F.add(g);
var lea = thxMat(0x14121A, null), sil = thxMat(0xC8C4D8, "metal");
thxCyl(0.45, 0.06, sil, 0, 0.03, 0, g, 24);
thxCyl(0.07, 0.38, sil, 0, 0.22, 0, g, 10);
thxBox(0.8, 0.16, 0.75, lea, 0, 0.5, 0, g);
thxBox(0.84, 1.5, 0.14, lea, 0, 1.2, 0.36, g);
thxBox(0.84, 0.04, 0.16, violet, 0, 1.96, 0.36, g);
thxBox(0.12, 0.12, 0.7, sil, -0.46, 0.72, 0, g);
thxBox(0.12, 0.12, 0.7, sil, 0.46, 0.72, 0, g);
thxBox(0.1, 0.24, 0.1, lea, -0.46, 0.6, -0.25, g);
thxBox(0.1, 0.24, 0.1, lea, 0.46, 0.6, -0.25, g);
thxSolid(0, 7.4, 0.5, 0.5, 0, 2);
},
function () {
var R = THXH.R, HH = THXH.H, lite = THX.lite, v = [], S = lite ? 12 : 20, RINGS = lite ? 5 : 8, top = HH - 1.0;
function at(a, f) { var r = 1.9 + (R - 2.2) * f, y = top - 1.4 * f + (-Math.sin(f * Math.PI) * 0.9); return [Math.cos(a) * r, y, Math.sin(a) * r]; }
for (var s = 0; s < S; s++) {
var a = s / S * Math.PI * 2;
for (var k = 0; k < 10; k++) {
var p = at(a, k / 10), q = at(a, (k + 1) / 10);
v.push(p[0], p[1], p[2], q[0], q[1], q[2]);
}
}
for (var r = 1; r <= RINGS; r++) {
var f = r / (RINGS + 0.6);
for (var s2 = 0; s2 < S; s2++) {
var a0 = s2 / S * Math.PI * 2, a1 = (s2 + 1) / S * Math.PI * 2, p0 = at(a0, f), p1 = at(a1, f), m = at((a0 + a1) / 2, f * 0.97);
m[1] -= 0.25;
v.push(p0[0], p0[1], p0[2], m[0], m[1], m[2], m[0], m[1], m[2], p1[0], p1[1], p1[2]);
}
}
for (var l = 0; l < S / 2; l++) {
var la = (l * 2 + 0.5) / S * Math.PI * 2;
for (var k2 = 0; k2 < 6; k2++) {
var f0 = k2 / 6, f1 = (k2 + 1) / 6;
var y0 = 2.6 + f0 * 2.2 - Math.sin(f0 * Math.PI) * 0.5, y1 = 2.6 + f1 * 2.2 - Math.sin(f1 * Math.PI) * 0.5, r0 = 1.6 + (R - 4.0) * f0, r1 = 1.6 + (R - 4.0) * f1;
v.push(Math.cos(la) * r0, y0, Math.sin(la) * r0, Math.cos(la) * r1, y1, Math.sin(la) * r1);
}
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
var mat = new THREE.LineBasicMaterial({ color: 0xD8B8FF, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending });
var web = new THREE.LineSegments(geo, mat);
web.userData.keep = 1;
web.raycast = function () { };
THX.F.add(web);
THX.fx.push(function (dt, t) { mat.opacity = 0.55 + Math.sin(t * 0.45) * 0.15; web.rotation.y = Math.sin(t * 0.05) * 0.03; });
if (!lite) {
var dv = [];
for (var r2 = 1; r2 <= RINGS; r2++)
for (var s3 = 0; s3 < S; s3++) {
var pp = at(s3 / S * Math.PI * 2, r2 / (RINGS + 0.6));
dv.push(pp[0], pp[1], pp[2]);
}
var dg = new THREE.BufferGeometry();
dg.setAttribute("position", new THREE.Float32BufferAttribute(dv, 3));
var dew = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.14, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
dew.userData.keep = 1;
THX.F.add(dew);
THX.fx.push(function (dt, t) { dew.rotation.y = web.rotation.y; });
}
}
];
});
