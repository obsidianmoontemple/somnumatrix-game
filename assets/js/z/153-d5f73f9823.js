/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(153, function () {
"use strict";
return [
function () {
if (UGO.g || typeof UG2 === "undefined" || !UG2.g)
return;
var G = new THREE.Group(), D = new THREE.Group();
function M(c, e) { var m = new THREE.MeshLambertMaterial({ color: c }); if (e) {
m.emissive = new THREE.Color(e);
m.emissiveIntensity = 0.9;
} return m; }
function bx(w, h, d, x, y, z, m, P) { var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(x, y, z); (P || G).add(me); return me; }
function cy(r, h, x, y, z, m, P) { var me = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 12), m); me.position.set(x, y, z); (P || G).add(me); return me; }
function plane(w, h, x, y, z, ry, tex, P) { var me = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex })); me.position.set(x, y, z); me.rotation.y = ry; (P || G).add(me); return me; }
var tile = M(0xEDE6D2), band = M(typeof UG_LINECOL !== "undefined" ? UG_LINECOL : 0xC03A2E), lino = M(0x5A6A5E), wood = M(0x6A4A30), dark = M(0x1C1D22), green = M(0x2E4A3A), steel = M(0x8A9098), cream = M(0xF4F0E6), blue = M(0x1E2F6E), lamp = M(0xFFF6DA, 0xFFF2C8), brass = M(0xC9A04A);
var x0 = UGO.x0, x1 = UGO.x1, zh = UGO.zh, cx = (x0 + x1) / 2, W = x1 - x0;
bx(W, 0.1, zh * 2, cx, -0.05, 0, lino);
bx(W, 0.15, zh * 2, cx, 3.45, 0, M(0xE6DFCB));
[-1, 1].forEach(function (s) { bx(W, 3.5, 0.2, cx, 1.75, s * (zh + 0.1), tile); bx(W, 0.3, 0.22, cx, 1.3, s * (zh + 0.09), band); });
bx(0.2, 3.5, zh * 2, x1 + 0.1, 1.75, 0, tile);
bx(0.22, 0.3, zh * 2, x1 + 0.09, 1.3, 0, band);
bx(0.2, 3.5, zh * 2, x0 - 0.1, 1.75, 0, tile);
bx(0.22, 0.3, zh * 2, x0 - 0.09, 1.3, 0, band);
for (var lx = x0 + 2; lx < x1; lx += 4)
bx(1.4, 0.08, 0.4, lx, 3.36, 0, lamp);
bx(1.2, 2.3, 0.08, x0 + 0.06, 1.15, zh - 1.0, green).rotation.y = Math.PI / 2;
plane(1.4, 0.4, x0 + 0.02, 2.6, zh - 1.0, Math.PI / 2, ugTex("Platforms", "Way back out", 256, 72, "#1E2F6E", "#FFFFFF"));
plane(2.6, 0.7, x0 + 0.02, 2.6, -0.6, Math.PI / 2, ugTex("The Underground Office", "Somnucor Underground · staff only", 512, 140, "#F4F0E6", "#1E2F6E"));
bx(1.8, 0.08, 0.9, x0 + 3, 0.76, -zh + 0.9, wood);
bx(0.08, 0.76, 0.8, x0 + 2.15, 0.38, -zh + 0.9, wood);
bx(0.08, 0.76, 0.8, x0 + 3.85, 0.38, -zh + 0.9, wood);
bx(0.4, 0.1, 0.25, x0 + 3.5, 0.86, -zh + 0.8, dark);
cy(0.03, 0.35, x0 + 2.4, 0.97, -zh + 0.65, brass);
bx(0.2, 0.08, 0.2, x0 + 2.4, 1.16, -zh + 0.65, M(0x2A5A3A, 0x2A5A3A));
bx(0.5, 0.45, 0.5, x0 + 3, 0.45, -zh + 1.75, dark);
var clock = cy(0.32, 0.06, x0 + 3, 2.5, -zh - 0.02, cream);
clock.rotation.x = Math.PI / 2;
UGO.hand = bx(0.03, 0.26, 0.02, x0 + 3, 2.56, -zh + 0.04, dark);
bx(0.4, 1.0, 5.4, x1 - 0.3, 0.5, -0.4, M(0x3A3C42));
bx(0.3, 1.6, 5.4, x1 - 0.15, 1.85, -0.4, dark);
var pc = document.createElement("canvas");
pc.width = 1024;
pc.height = 256;
UGO.panel = { ctx: pc.getContext("2d"), tex: new THREE.CanvasTexture(pc) };
var pm = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.4), new THREE.MeshBasicMaterial({ map: UGO.panel.tex }));
pm.position.set(x1 - 0.31, 1.85, -0.4);
pm.rotation.y = -Math.PI / 2;
G.add(pm);
for (var lv = 0; lv < 12; lv++) {
var lev = bx(0.05, 0.5, 0.05, x1 - 0.55, 1.1, -2.8 + lv * 0.44, lv % 3 === 0 ? band : M(lv % 3 === 1 ? 0x2A4A8A : 0x2A2A2A));
lev.rotation.z = 0.3;
}
bx(2.0, 0.08, 0.9, cx + 0.8, 0.76, zh - 0.75, wood);
bx(0.08, 0.76, 0.8, cx - 0.15, 0.38, zh - 0.75, wood);
bx(0.08, 0.76, 0.8, cx + 1.75, 0.38, zh - 0.75, wood);
for (var cd = 0; cd < 3; cd++)
bx(0.36, 0.1, 0.3, cx + 0.2 + cd * 0.55, 0.85, zh - 0.8, steel);
for (var cn = 0; cn < 6; cn++)
cy(0.035, 0.04 + cn % 3 * 0.02, cx + 1.3 + (cn % 3) * 0.1, 0.82 + 0.01, zh - 0.6 - (cn > 2 ? 0.1 : 0), brass);
bx(0.8, 1.1, 0.7, cx + 2.6, 0.55, zh - 0.4, M(0x4A4E58));
cy(0.1, 0.05, cx + 2.6, 0.65, zh - 0.75, brass).rotation.x = Math.PI / 2;
bx(0.5, 0.45, 0.5, cx + 0.8, 0.45, zh - 1.55, dark);
var rc = document.createElement("canvas");
rc.width = 512;
rc.height = 384;
UGO.rota = { ctx: rc.getContext("2d"), tex: new THREE.CanvasTexture(rc) };
var rm = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.2), new THREE.MeshBasicMaterial({ map: UGO.rota.tex }));
rm.position.set(cx - 1.2, 1.95, zh - 0.02);
rm.rotation.y = Math.PI;
G.add(rm);
bx(1.7, 1.3, 0.04, cx - 1.2, 1.95, zh, wood);
plane(2.4, 1.0, cx - 1.0, 2.0, -zh + 0.02, 0, ugTex("Somnucor Underground", "the line, ring by ring", 512, 200, "#F4F0E6", "#C03A2E"));
for (var lk = 0; lk < 5; lk++) {
bx(0.5, 1.9, 0.5, x0 + 0.4, 0.95, -zh + 2.3 + lk * 0.52, M(0x5A6A8A));
bx(0.02, 0.25, 0.05, x0 + 0.66, 1.2, -zh + 2.3 + lk * 0.52, steel);
}
bx(1.2, 0.06, 0.3, cx - 3.3, 1.5, zh - 0.15, wood);
UGO.lamps = [];
for (var lp = 0; lp < 4; lp++) {
var L = cy(0.08, 0.22, cx - 3.75 + lp * 0.3, 1.65, zh - 0.18, M(0xE8C23A, 0x8A6A20));
UGO.lamps.push(L);
}
bx(0.9, 0.06, 0.1, cx - 3.3, 1.9, zh - 0.08, M(0xE87A1A));
bx(1.4, 0.06, 1.0, x1 - 2.6, 0.74, zh - 1.4, M(0xD8D0B8));
cy(0.06, 0.72, x1 - 2.6, 0.37, zh - 1.4, steel);
[[-0.4, -0.2], [0.3, 0.25], [0.45, -0.3]].forEach(function (q) { cy(0.045, 0.1, x1 - 2.6 + q[0], 0.82, zh - 1.4 + q[1], cream); });
bx(0.25, 0.3, 0.2, x1 - 0.7, 1.05, zh - 0.4, steel);
bx(1.2, 0.9, 0.5, x1 - 0.9, 0.45, zh - 0.3, wood);
bx(0.45, 0.45, 0.45, x1 - 3.6, 0.45, zh - 1.4, dark);
bx(0.45, 0.45, 0.45, x1 - 1.6, 0.45, zh - 1.4, dark);
G.traverse(function (m) { m.raycast = function () { }; });
UG2.g.add(G);
UGO.g = G;
bx(0.12, 2.4, 1.2, UGO_DOOR.x + 1.75, 1.2, UGO_DOOR.z, green, D);
bx(0.14, 0.06, 1.4, UGO_DOOR.x + 1.74, 2.45, UGO_DOOR.z, dark, D);
bx(0.06, 0.06, 0.18, UGO_DOOR.x + 1.66, 1.1, UGO_DOOR.z - 0.42, brass, D);
plane(1.5, 0.42, UGO_DOOR.x + 1.68, 2.8, UGO_DOOR.z, -Math.PI / 2, ugTex("Underground Office", "Staff", 256, 72, "#1E2F6E", "#FFFFFF"), D);
D.traverse(function (m) { m.raycast = function () { }; });
UG2.g.add(D);
UGO.door = D;
function staff(seed, title, x, z, ry, seated, hours) {
var g = (typeof wPerson === "function") ? wPerson("ugo_" + seed, { title: title, place: "The Underground Office" }) : null;
if (!g)
return;
g.position.set(x, seated ? 0.08 : 0, z);
g.rotation.y = ry;
if (seated) {
g.userData.seated = true;
g.userData.pose = "sit";
}
var sx = (typeof randomLook === "function") ? (randomLook("w_ugo_" + seed, "human") || {}).sex : null;
var tg = (typeof makeTag === "function") ? makeTag(ugoName(title, seed, sx) + " · " + title, false) : null;
if (tg) {
tg.position.y = 2.05;
tg.scale.multiplyScalar(0.7);
g.add(tg);
}
g.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
G.add(g);
UGO.figs.push({ g: g, title: title, hours: hours });
}
staff("master", "Station master", x0 + 3, -zh + 1.75, Math.PI, true, [5.5, 24]);
staff("signal", "Underground signal operator", x1 - 1.2, -0.4, Math.PI / 2, false, [0, 24]);
staff("clerk", "Booking clerk", cx + 0.8, zh - 1.55, 0, true, [5, 24.5]);
staff("driver", "Underground train driver", x1 - 3.6, zh - 1.4, Math.PI / 2, true, [5, 24.5]);
staff("guard", "Underground guard", x1 - 1.6, zh - 1.4, -Math.PI / 2, true, [5, 24.5]);
staff("walker", "Track walker", cx - 3.3, zh - 0.8, Math.PI, false, [22.5, 23.5]);
},
function (title, seed, sex) {
var h = (typeof hash === "function") ? hash("ugo" + title + seed) : 7;
var F = typeof TEMP_GIVEN_F !== "undefined" ? TEMP_GIVEN_F : ["Mara", "Ivy", "Nell"], Mn = typeof TEMP_GIVEN_M !== "undefined" ? TEMP_GIVEN_M : ["Oswin", "Tam", "Ned"], S = typeof SURNAME !== "undefined" ? SURNAME : ["Dray", "Hollis"];
var A = sex === "f" ? F : sex === "m" ? Mn : ((h >>> 3) % 2 ? F : Mn);
return A[(h >>> 5) % A.length] + " " + S[(h >>> 10) % S.length];
},
function () {
var P = UGO.panel;
if (!P || typeof ugLine !== "function")
return;
var x = P.ctx, L = ugLine().list, N = L.length || 1, t = ugNow();
x.fillStyle = "#111418";
x.fillRect(0, 0, 1024, 256);
x.font = "bold 20px monospace";
x.fillStyle = "#E8C27A";
x.textAlign = "left";
x.fillText("SOMNUCOR UNDERGROUND · SIGNAL PANEL", 20, 26);
[0, 1].forEach(function (d) {
var y = d === 0 ? 96 : 186;
x.strokeStyle = d === 0 ? "#C03A2E" : "#3A6AC0";
x.lineWidth = 6;
x.beginPath();
x.moveTo(40, y);
x.lineTo(984, y);
x.stroke();
x.fillStyle = "#9AA0A8";
x.font = "14px monospace";
x.fillText(d === 0 ? "OUTER RAIL →" : "← INNER RAIL", 20, y - 22);
for (var i = 0; i < N; i++) {
var px = 40 + i * (944 / Math.max(1, N - 1));
x.fillStyle = "#F4F0E6";
x.fillRect(px - 3, y - 12, 6, 24);
if (d === 0) {
x.save();
x.translate(px, y + 30);
x.rotate(-0.5);
x.fillStyle = "#C8CCD2";
x.font = "12px monospace";
x.fillText(String(L[i].name || "").slice(0, 16), 0, 0);
x.restore();
}
if (typeof ugTrainNear === "function") {
var n = ugTrainNear(i, d, t);
if (n && Math.abs(n.x) < UG_SEGLEN) {
var f = (d === 0 ? 1 : -1) * n.x / UG_SEGLEN, tx = px + f * (944 / Math.max(1, N - 1));
if (n.x <= 0 || d === 1) {
x.fillStyle = n.live ? "#8FCB8A" : "#FFB43C";
x.beginPath();
x.arc(tx, y, 8, 0, 6.283);
x.fill();
}
}
}
var held = UG2.holds && UG2.holds[(L[i].key || L[i].name) + ":" + d];
x.fillStyle = held ? "#E04040" : "#40C060";
x.beginPath();
x.arc(px + 14, y - 14, 4, 0, 6.283);
x.fill();
}
});
P.tex.needsUpdate = true;
},
function () {
var R = UGO.rota;
if (!R)
return;
var x = R.ctx, h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
x.fillStyle = "#F4F0E6";
x.fillRect(0, 0, 512, 384);
x.fillStyle = "#1E2F6E";
x.fillRect(0, 0, 512, 54);
x.fillStyle = "#FFFFFF";
x.font = "bold 28px Georgia, serif";
x.textAlign = "center";
x.fillText("Duty rota", 256, 37);
x.textAlign = "left";
x.font = "18px Georgia, serif";
UGO.figs.forEach(function (f, i) { var on = ugoOnShift(f); x.fillStyle = on ? "#1A1C22" : "#9A9488"; x.fillText(f.title, 18, 92 + i * 46); x.textAlign = "right"; x.fillText(on ? "on duty" : "off", 494, 92 + i * 46); x.textAlign = "left"; });
x.fillStyle = "#C03A2E";
x.font = "italic 15px Georgia, serif";
x.fillText("Take a post on the job board: Somnucor Underground", 18, 372);
R.tex.needsUpdate = true;
},
function () {
if (!UGO.g)
return;
UGO.inside = true;
UGO.from = { x: camera.position.x, z: camera.position.z };
camera.position.set(UG2.cx + UGO.x0 + 1.2, 1.72, UG2.cz + UGO.zh - 1.0);
yaw = -Math.PI / 2;
pitch = 0;
ugoPaintRota();
ugoPaintPanel();
if (typeof playTone === "function")
playTone(440, 0.2);
setStatus("<b>The Underground Office.</b> The station master's desk, the signal panel, the clerks' table and the crew mess. The green door takes you back to the platforms.");
}
];
});
