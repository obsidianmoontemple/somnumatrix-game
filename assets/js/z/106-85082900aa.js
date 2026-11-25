/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(106, function () {
"use strict";
return [
function (kind, col, glow) {
var tpl = SIGN_TPL[kind] || (SIGN_TPL[kind] = signShapeBuild(kind, 0xFFFFFF, false));
var g = tpl.clone(true);
g.traverse(function (o) {
if (!o.isMesh)
return;
var role = o.userData.role || "m", key = col + "|" + (glow ? 1 : 0) + "|" + role;
o.material = SIGN_MAT[key] || (SIGN_MAT[key] = glow ? new THREE.MeshBasicMaterial({ color: role === "dk" ? blend(col, 0x000000, 0.55) : col, transparent: true, opacity: 0.92, depthWrite: false })
: new THREE.MeshLambertMaterial({ color: role === "dk" ? blend(col, 0x000000, 0.55) : col }));
});
return g;
},
function (kind, col, glow) {
var g = new THREE.Group(), m = glow ? new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.92, depthWrite: false }) : new THREE.MeshLambertMaterial({ color: col });
var dk = glow ? new THREE.MeshBasicMaterial({ color: blend(col, 0x000000, 0.55), transparent: true, opacity: 0.9, depthWrite: false }) : new THREE.MeshLambertMaterial({ color: blend(col, 0x000000, 0.55) });
var gi = 0;
function add(geo, mat, x, y, z, rz, sx, sy) { SIGN_GEO[kind + (gi++)] = geo; var o = new THREE.Mesh(geo, mat || m); o.userData.role = (mat === dk) ? "dk" : "m"; o.position.set(x || 0, y || 0, z || 0); if (rz)
o.rotation.z = rz; if (sx || sy)
o.scale.set(sx || 1, sy || 1, 1); g.add(o); return o; }
var disc = function (r) { var c = new THREE.CylinderGeometry(r, r, 0.06, 28); c.rotateX(Math.PI / 2); return c; };
if (kind === "sun") {
add(disc(0.26));
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
add(new THREE.ConeGeometry(0.06, 0.2, 8), m, Math.cos(a) * 0.38, Math.sin(a) * 0.38, 0, a - Math.PI / 2);
}
}
else if (kind === "moon") {
add(new THREE.TorusGeometry(0.32, 0.09, 10, 32, Math.PI * 1.25), m, 0, 0, 0, Math.PI * 0.37);
}
else if (kind === "wave") {
for (var w = 0; w < 3; w++)
add(new THREE.TorusGeometry(0.18, 0.045, 8, 20, Math.PI), m, -0.36 + w * 0.36, (w % 2 ? -0.04 : 0.04), 0, w % 2 ? Math.PI : 0);
}
else if (kind === "bolt") {
[[0.08, 0.22, 0.5], [-0.06, 0, -0.5], [0.06, -0.22, 0.5]].forEach(function (b) { add(new THREE.BoxGeometry(0.1, 0.32, 0.06), m, b[0], b[1], 0, b[2]); });
}
else if (kind === "flame") {
add(new THREE.ConeGeometry(0.2, 0.6, 16), m, 0, 0.02);
add(new THREE.ConeGeometry(0.11, 0.36, 12), dk, 0, -0.06, 0.08);
}
else if (kind === "hourglass") {
add(new THREE.ConeGeometry(0.2, 0.3, 16), m, 0, 0.15, 0, Math.PI);
add(new THREE.ConeGeometry(0.2, 0.3, 16), m, 0, -0.15);
add(new THREE.BoxGeometry(0.5, 0.05, 0.08), dk, 0, 0.31);
add(new THREE.BoxGeometry(0.5, 0.05, 0.08), dk, 0, -0.31);
}
else if (kind === "sword") {
add(new THREE.BoxGeometry(0.07, 0.62, 0.04), m, 0, 0.08);
add(new THREE.BoxGeometry(0.32, 0.06, 0.06), dk, 0, -0.22);
add(new THREE.BoxGeometry(0.06, 0.16, 0.06), dk, 0, -0.33);
}
else if (kind === "heart") {
add(new THREE.SphereGeometry(0.15, 16, 12), m, -0.1, 0.08);
add(new THREE.SphereGeometry(0.15, 16, 12), m, 0.1, 0.08);
add(new THREE.ConeGeometry(0.24, 0.34, 16), m, 0, -0.14, 0, Math.PI);
}
else if (kind === "leaf") {
var lf = add(new THREE.SphereGeometry(0.24, 16, 12), m, 0, 0.04, 0, 0.5);
lf.scale.set(0.55, 1.25, 0.25);
add(new THREE.BoxGeometry(0.03, 0.5, 0.03), dk, 0, -0.02, 0.04, 0.5);
}
else if (kind === "eye") {
var ey = add(new THREE.TorusGeometry(0.26, 0.04, 8, 32), m);
ey.scale.set(1, 0.55, 1);
add(disc(0.09), dk, 0, 0, 0.02);
}
else {
for (var s = 0; s < 5; s++) {
var sa = s / 5 * Math.PI * 2 + Math.PI / 2;
add(new THREE.ConeGeometry(0.08, 0.3, 8), m, Math.cos(sa) * 0.15, Math.sin(sa) * 0.15, 0, sa - Math.PI / 2);
}
add(disc(0.12));
}
return g;
},
function (spec, d) {
var L = lookOf(spec);
L.src = L.src || {};
var h = hash("dl" + d.key), t = d.trad || "Greek", f = !!DEITY_F[d.key] && !hasIcon(d, "longbeard") && !hasIcon(d, "beard");
L.sex = f ? "f" : (L.sex || "m");
if (L.skin === null || L.skin === undefined)
L.skin = pickOf(TRAD_SKIN[t] || [0xC89A70], h);
if (L.hair === null || L.hair === undefined)
L.hair = pickOf(TRAD_HAIR[t] || [0x1E1612, 0x2A1E16, 0x3A2A1A], h >>> 4);
if (hasIcon(d, "longbeard") && !L.src.hair) {
L.hair = pickOf([0xE8E4DA, 0xBCB8B0, 0x8A847A], h >>> 6);
L.src.hair = "tradition";
}
if (!L.top) {
L.top = TRAD_ROBE[t] || 0xE8E4DA;
L.bottom = shade(L.top, -0.2);
L.topKind = L.topKind || "robe";
}
var styles = f ? ["long", "bun", "braids", "long", "ponytail"] : ["long", "short", "waves", "long", "curly"];
if (t === "Yoruba" || t === "Akan" || t === "Vodou")
styles = f ? ["headwrap", "braids", "locs", "coily"] : ["coily", "locs", "short", "afro"];
if (t === "Japanese" || t === "Chinese")
styles = f ? ["bun", "long"] : ["bun", "long"];
if (!L.src.hairStyle || L.src.hairStyle === "tradition") {
L.hairStyle = pickOf(styles, h >>> 8);
L.src.hairStyle = "tradition";
}
L.gear = "none";
L.acc = false;
var sg = deitySign(d);
L.eyes = (t === "Demonology" || t === "Qliphothic" || t === "Adversarial") ? 0xC02020 : blend(sg.col, 0x2A1A10, 0.35);
L.ears = (t === "Demonology" || t === "Qliphothic") ? "pointed" : "round";
return L;
},
function (g, spec, d) {
var body = g.children[0];
if (!body)
return;
var L = lookOf(spec), t = d.trad || "Greek", f = L.sex === "f", h = hash("dd" + d.key);
var top = L.top !== null && L.top !== undefined ? L.top : 0xE8E4DA, trim = (typeof PRECINCT !== "undefined" && PRECINCT[t] && PRECINCT[t].trim) || 0xC9A868;
var gold = 0xC9A040, sg = deitySign(d), hy = 1.72, limbs = g.userData.limbs || {};
var formless = hasIcon(d, "formless"), headgear = HEADWEAR.some(function (k) { return hasIcon(d, k); });
if (formless)
return;
function M(c, ds) { return tmat(c, ds); }
function add(parent, geo, mat, x, y, z, rx, ry, rz) { var o = new THREE.Mesh(geo, mat); o.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
o.rotation.set(rx || 0, ry || 0, rz || 0); o.userData.dl = 1; parent.add(o); return o; }
var robe = null;
body.children.forEach(function (m) { if (m.userData && m.userData.part === "robe")
robe = m; });
var gm = M(gold), tm = M(trim), am = M(sg.col);
if (robe && robe.visible !== false) {
robe.geometry = dlg("roberlathe", function () { var pts = []; for (var i = 0; i <= 10; i++) {
var u = i / 10;
pts.push(new THREE.Vector2(0.2 + 0.17 * Math.pow(u, 1.6), 0.5 - u * 1.0));
} pts.reverse(); return new THREE.LatheGeometry(pts, 28); });
add(body, dlg("hem", function () { return new THREE.TorusGeometry(0.36, 0.022, 8, 40); }), tm, 0, 0.07, 0, Math.PI / 2);
add(body, dlg("sash", function () { return new THREE.CylinderGeometry(0.19, 0.195, 0.07, 24); }), tm, 0, 1.0, 0).scale.z = 0.8;
}
var arms = [limbs.la, limbs.ra].filter(Boolean);
function band(parent, y, r, c) { add(parent, dlg("band" + r, function () { return new THREE.TorusGeometry(r, 0.016, 8, 20); }), c, 0, y, 0, Math.PI / 2); }
function drape(c) {
var dm = M(c, true);
add(body, dlg("drape", function () { return new THREE.BoxGeometry(0.13, 0.95, 0.025); }), dm, 0.02, 1.2, 0.125, 0.05, 0, 0.6);
add(body, dlg("drape", function () { return new THREE.BoxGeometry(0.13, 0.95, 0.025); }), dm, 0.02, 1.2, -0.125, -0.05, 0, -0.6);
}
function cloak(c) {
var cm = M(c, true);
add(body, dlg("dlcloak", function () { return new THREE.CylinderGeometry(0.23, 0.4, 1.3, 24, 1, true, Math.PI / 2 + 0.3, Math.PI - 0.6); }), cm, 0, 0.92, -0.03).scale.z = 0.72;
}
function necklace(r, y, c, beads) {
if (beads) {
var bm = M(c);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
add(body, dlg("bead", function () { return new THREE.SphereGeometry(0.022, 8, 6); }), bm, Math.cos(a) * r, y - Math.max(0, Math.sin(a)) * 0.05, Math.sin(a) * r * 0.75 + 0.01);
}
}
else
add(body, dlg("neck" + r, function () { return new THREE.TorusGeometry(r, 0.018, 8, 28); }), M(c), 0, y, 0.02, Math.PI / 2 - 0.25).scale.y = 0.78;
}
function headCrown(c, tall) {
add(body, dlg("dlcrown" + tall, function () { return new THREE.CylinderGeometry(0.1, 0.13, tall, 10); }), M(c), 0, hy + 0.12 + tall / 2, 0);
}
if (t === "Greek" || t === "Roman" || t === "Hebrew") {
drape(f ? blend(top, 0xFFFFFF, 0.35) : trim === 0xE8E4DA ? blend(top, 0x2E5E9E, 0.4) : trim);
necklace(0.12, 1.5, gold);
if (!headgear)
add(body, dlg("wreath", function () { return new THREE.TorusGeometry(0.135, 0.022, 8, 28); }), M(0x6A8A3A), 0, hy + 0.06, 0, Math.PI / 2);
}
else if (t === "Norse" || t === "Anglo-Saxon") {
var fur = add(body, dlg("fur", function () { return new THREE.TorusGeometry(0.2, 0.085, 12, 28); }), M(f ? 0xE8E0D0 : 0x6A5A48), 0, 1.52, 0, Math.PI / 2);
fur.scale.set(1, 0.75, 0.9);
arms.forEach(function (a) { band(a, -0.32, 0.05, gm); });
if (!f)
band(body, 0.99, 0.19, M(0x3A2A1A));
cloak(shade(top, -0.25));
}
else if (t === "Egyptian") {
add(body, dlg("usekh", function () { return new THREE.CylinderGeometry(0.25, 0.27, 0.03, 32); }), gm, 0, 1.5, 0.01).scale.z = 0.7;
add(body, dlg("usekh2", function () { return new THREE.CylinderGeometry(0.2, 0.22, 0.035, 32); }), M(0x2F5E9E), 0, 1.52, 0.012).scale.z = 0.7;
arms.forEach(function (a) { band(a, -0.18, 0.05, gm); band(a, -0.5, 0.042, gm); });
if (!headgear) {
var nm = M(0x2F5E9E, true);
add(body, dlg("nemes", function () { return new THREE.SphereGeometry(0.145, 24, 14, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9, 0, 1.9); }), nm, 0, hy, 0);
[-1, 1].forEach(function (sd) { add(body, dlg("lappet", function () { return new THREE.BoxGeometry(0.07, 0.32, 0.04); }), gm, sd * 0.13, hy - 0.2, 0.05); });
band(body, hy + 0.04, 0.142, gm);
}
}
else if (t === "Hindu") {
necklace(0.13, 1.5, gold);
necklace(0.17, 1.42, gold);
arms.forEach(function (a) { band(a, -0.2, 0.05, gm); band(a, -0.55, 0.04, gm); });
drape(blend(sg.col, top, 0.3));
if (!headgear)
add(body, dlg("mukuta", function () { return new THREE.ConeGeometry(0.12, 0.34, 12); }), gm, 0, hy + 0.26, 0);
add(body, dlg("bindi", function () { return new THREE.SphereGeometry(0.014, 8, 6); }), M(0xC0201E), 0, hy + 0.07, 0.132);
}
else if (t === "Japanese" || t === "Chinese") {
add(body, dlg("obi", function () { return new THREE.CylinderGeometry(0.2, 0.205, 0.16, 24); }), M(t === "Japanese" ? blend(sg.col, 0xE8E0D0, 0.3) : 0x2E6A4A), 0, 1.02, 0).scale.z = 0.8;
[-1, 1].forEach(function (sd) { add(body, dlg("collarv", function () { return new THREE.BoxGeometry(0.045, 0.32, 0.02); }), M(0xF2EEE6), sd * 0.05, 1.4, 0.125, 0, 0, sd * 0.45); });
arms.forEach(function (a) { var sl = add(a, dlg("sleeve", function () { return new THREE.CylinderGeometry(0.07, 0.15, 0.42, 16, 1, true); }), M(shade(top, -0.08), true), 0, -0.44, -0.02); sl.scale.x = 0.6; });
if (t === "Chinese") {
add(body, dlg("jade", function () { var c = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16); c.rotateX(Math.PI / 2); return c; }), M(0x5AAA7A), 0, 1.02, 0.17);
if (!headgear && !f)
add(body, dlg("guan", function () { return new THREE.BoxGeometry(0.1, 0.12, 0.16); }), M(0x1A1A1E), 0, hy + 0.17, -0.01);
}
if (!headgear && f)
add(body, dlg("kanzashi", function () { return new THREE.BoxGeometry(0.22, 0.012, 0.012); }), gm, 0.02, hy + 0.13, -0.06, 0, 0, 0.3);
}
else if (t === "Mesopotamian" || t === "Persian") {
var fl = M(blend(top, 0xF2EEE6, 0.4));
[0.3, 0.55, 0.8].forEach(function (y, i) { add(body, dlg("tier" + i, function () { return new THREE.CylinderGeometry(0.27 - i * 0.03, 0.35 - i * 0.03, 0.16, 24, 1, true); }), fl, 0, y, 0); });
if (!headgear) {
add(body, dlg("horncap", function () { return new THREE.CylinderGeometry(0.13, 0.14, 0.16, 16); }), M(t === "Persian" ? 0xC8A040 : 0xE8DCC0), 0, hy + 0.15, 0);
if (t !== "Persian")
[-1, 1].forEach(function (sd) { add(body, dlg("chorn", function () { return new THREE.TorusGeometry(0.11, 0.016, 8, 16, Math.PI); }), M(0xC8B890), sd * 0.01, hy + 0.12 + 0.03, 0, 0, Math.PI / 2, 0); });
}
necklace(0.12, 1.5, gold);
}
else if (t === "Aztec" || t === "Maya" || t === "Inca") {
var fc = [0x2E9A5A, 0x2F6EC8, 0xC8322E, 0xE8B83A, 0x2E9A5A, 0x2F6EC8, 0xE8B83A, 0xC8322E, 0x2E9A5A];
if (!headgear || t !== "Inca")
for (var q = 0; q < 9; q++) {
var a = -1.1 + q * 0.275;
var ft = add(body, dlg("plume", function () { return new THREE.SphereGeometry(0.06, 12, 8); }), M(fc[q]), Math.sin(a) * 0.22, hy + 0.08 + Math.cos(a) * 0.22, -0.1, 0, 0, -a);
ft.scale.set(0.6, 3.2, 0.3);
}
if (t === "Inca")
add(body, dlg("sunpect", function () { var c = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 24); c.rotateX(Math.PI / 2); return c; }), gm, 0, 1.42, 0.14);
else
necklace(0.15, 1.47, 0x3AAA7A, true);
[-1, 1].forEach(function (sd) { add(body, dlg("spool", function () { var c = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12); c.rotateZ(Math.PI / 2); return c; }), M(0x3AAA7A), sd * 0.14, hy - 0.01, 0); });
}
else if (t === "Yoruba" || t === "Akan" || t === "Vodou") {
necklace(0.12, 1.52, top, true);
necklace(0.16, 1.46, 0xF2EEE6, true);
necklace(0.2, 1.4, sg.col, true);
if (f && !headgear) {
var gl = add(body, dlg("gele", function () { return new THREE.SphereGeometry(0.17, 20, 14, 0, Math.PI * 2, 0, 1.7); }), M(blend(top, sg.col, 0.35)), 0, hy + 0.07, -0.02);
gl.scale.set(1.1, 1.0, 1.05);
}
if (t === "Akan")
drape(0xD4B83C);
}
else if (t === "Irish" || t === "Welsh" || t === "Gaulish") {
add(body, dlg("torc", function () { return new THREE.TorusGeometry(0.085, 0.018, 10, 24, Math.PI * 1.7); }), gm, 0, 1.56, 0.01, Math.PI / 2, 0, Math.PI * 0.65);
cloak(shade(top, -0.3));
add(body, dlg("brooch", function () { var c = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16); c.rotateX(Math.PI / 2); return c; }), gm, 0.12, 1.48, 0.13);
}
else if (t === "Slavic") {
var rm = M(0xB0302A);
band(body, 0.99, 0.19, rm);
if (robe)
add(body, dlg("hem2", function () { return new THREE.TorusGeometry(0.33, 0.02, 8, 40); }), rm, 0, 0.16, 0, Math.PI / 2);
arms.forEach(function (a) { band(a, -0.56, 0.045, rm); });
if (f && !headgear)
add(body, dlg("kokoshnik", function () { return new THREE.CylinderGeometry(0.17, 0.15, 0.18, 20, 1, true, -1.2, 2.4); }), M(0xB0302A, true), 0, hy + 0.13, 0.02);
}
else if (t === "Hawaiian" || t === "Polynesian") {
var lc = [0xF2D04A, 0xE84A6A, 0xF4F0E6, 0xE8823A];
for (var li = 0; li < 16; li++) {
var la = li / 16 * Math.PI * 2;
add(body, dlg("flower", function () { return new THREE.SphereGeometry(0.028, 8, 6); }), M(lc[li % 4]), Math.cos(la) * 0.15, 1.49 - Math.max(0, Math.sin(la)) * 0.06, Math.sin(la) * 0.11 + 0.01);
}
if (robe)
add(body, dlg("tapa", function () { return new THREE.TorusGeometry(0.31, 0.03, 8, 40); }), M(0x6A3A1E), 0, 0.4, 0, Math.PI / 2);
}
else if (t === "Demonology" || t === "Qliphothic" || t === "Adversarial") {
cloak(t === "Qliphothic" ? 0x1A1024 : 0x2A0E0E);
[-1, 1].forEach(function (sd) { for (var k = 0; k < 3; k++)
add(body, dlg("spike", function () { return new THREE.ConeGeometry(0.022, 0.13, 8); }), M(0x1A1418), sd * (0.2 + k * 0.025), 1.56, -0.03 + k * 0.03, 0, 0, -sd * 0.5); });
necklace(0.13, 1.5, 0x6A1A1A);
}
var pale = (((top >> 16) & 255) + ((top >> 8) & 255) + (top & 255)) / 3 > 200;
if (pale && robe && !(t === "Norse" || t === "Irish" || t === "Welsh" || t === "Gaulish" || t === "Demonology" || t === "Qliphothic" || t === "Adversarial")) {
var mc = M(blend(sg.col, 0x3A2A4A, 0.25), true);
add(body, dlg("mantle", function () { return new THREE.CylinderGeometry(0.22, 0.36, 1.15, 24, 1, true, Math.PI / 2 + 0.55, Math.PI - 1.1); }), mc, 0, 0.98, -0.02).scale.z = 0.75;
add(body, dlg("stole", function () { return new THREE.BoxGeometry(0.07, 0.62, 0.02); }), mc, -0.09, 1.22, 0.135, 0, 0, 0.04);
add(body, dlg("stole", function () { return new THREE.BoxGeometry(0.07, 0.62, 0.02); }), mc, 0.09, 1.22, 0.135, 0, 0, -0.04);
}
var sgn = signShape(sg.kind, sg.col, true);
sgn.position.set(0, hy + 0.12, -0.34);
sgn.scale.setScalar(0.62);
sgn.userData.dl = 1;
body.add(sgn);
body.scale.multiplyScalar(1.1);
},
function (g, spec, d) {
var def = KIT[spec.archetype], parts = levelParts(def, spec), door = frontDoorOf(parts), B = bodyOf(parts);
var sx = g.scale.x || 1;
var front = door ? door.p[2] + door.s[2] / 2 : (B ? B.z + B.d / 2 : def.size[2] / 2), dw = door ? door.s[0] : 2, dtop = door ? door.p[1] + door.s[1] / 2 : 3;
var rc = null;
d.icons.forEach(function (x) { var p = x.split(":"); if (p[0] === "robe" && ICONCOL[p[1]] !== undefined)
rc = ICONCOL[p[1]]; });
if (rc === null)
rc = TRAD_ROBE[d.trad] || 0xC9A868;
var sg = deitySign(d), gold = tmat(0xC9A040);
var pl = new THREE.Mesh(dlg("plaque", function () { return new THREE.CylinderGeometry(0.75, 0.75, 0.12, 32); }), tmat(shade(rc, -0.25)));
pl.rotation.x = Math.PI / 2;
pl.position.set(0, dtop + 1.1, front + 0.12);
g.add(pl);
var ring = new THREE.Mesh(dlg("plring", function () { return new THREE.TorusGeometry(0.75, 0.06, 8, 40); }), gold);
ring.position.set(0, dtop + 1.1, front + 0.16);
g.add(ring);
var s = signShape(sg.kind, sg.col, false);
s.position.set(0, dtop + 1.1, front + 0.22);
s.scale.setScalar(1.55);
g.add(s);
var paleR = (((rc >> 16) & 255) + ((rc >> 8) & 255) + (rc & 255)) / 3 > 200, bc = paleR ? blend(sg.col, 0x2A2040, 0.3) : rc;
var bm = tmat(bc, true), tm = tmat(paleR ? 0xC9A040 : sg.col);
[-1, 1].forEach(function (sd) {
var x = sd * (dw / 2 + 1.2);
var pole = new THREE.Mesh(dlg("bpole", function () { return new THREE.CylinderGeometry(0.05, 0.05, 1.64, 8); }), gold);
pole.rotation.z = Math.PI / 2;
pole.position.set(x, dtop + 0.9, front + 0.35);
g.add(pole);
var bh = Math.round((dtop + 0.4) * 4) / 4, ban = new THREE.Mesh(dlg("banner" + bh, function () { return new THREE.PlaneGeometry(1.3, bh); }), bm);
ban.position.set(x, (dtop + 0.9) / 2 + 0.2, front + 0.36);
g.add(ban);
var stripe = new THREE.Mesh(dlg("bstripe", function () { return new THREE.PlaneGeometry(1.3, 0.18); }), tm);
stripe.position.set(x, 0.75, front + 0.37);
g.add(stripe);
var mini = signShape(sg.kind, sg.col, false);
mini.position.set(x, (dtop + 0.9) * 0.6, front + 0.4);
mini.scale.setScalar(0.8);
g.add(mini);
});
}
];
});
