/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(325, function () {
return [
function (G, o) {
var th = o.th, Dx = 31 * Math.cos(th), Dz = 31 * Math.sin(th), ph = Math.atan2(Math.cos(th), Math.sin(th)), c = Math.cos(ph), s = Math.sin(ph);
var g = new THREE.Group();
g.position.set(Dx, 0, Dz);
g.rotation.y = ph;
G.add(g);
var W = { o: o, g: g, ph: ph, Dx: Dx, Dz: Dz, w: o.w, d: o.d, h: o.h, locked: !!o.locked, name: o.name };
W.pt = function (lx, lz) { return { x: Dx + lx * c + lz * s, z: Dz - lx * s + lz * c }; };
W.loc = function (x, z) { var dx = x - Dx, dz = z - Dz; return { x: dx * c - dz * s, z: dx * s + dz * c }; };
W.box = function (w, h, d, mat, lx, y, lz, solid, list) { var m = wBox(w, h, d, mat, lx, y, lz, g); if (solid) {
var p = W.pt(lx, lz);
(list || CAS.solids).push({ x: p.x, z: p.z, hw: w / 2, hd: d / 2, rot: ph });
} return m; };
W.cyl = function (rt, rb, h, mat, lx, y, lz, seg, solid) { var m = wCyl(rt, rb, h, mat, lx, y, lz, g, seg || 12); if (solid) {
var p = W.pt(lx, lz);
CAS.solids.push({ x: p.x, z: p.z, r: Math.max(rt, rb) });
} return m; };
W.sph = function (r, mat, lx, y, lz, seg) { return wSph(r, mat, lx, y, lz, g, seg || 10); };
W.sign = function (lines, w, h, lx, y, lz, ry, bg, fg) { var m = wSign(lines, w, h, bg || "#14080E", fg || "#E8C27A"); m.material.side = THREE.FrontSide; m.position.set(lx, y, lz); m.rotation.y = ry || 0; g.add(m); return m; };
W.spot = function (lx, lz, r, name, fn) { var p = W.pt(lx, lz); CAS.spots.push({ x: p.x, z: p.z, r: r, name: name, fn: fn }); };
W.person = function (seed, title, lx, lz, ry, o2) {
o2 = o2 || {};
var gp = wPerson("cw_" + seed, { title: title, place: "The Hidden Crescent casino", sex: o2.sex, look: o2.look || { hat: "none" } });
gp.position.set(lx, o2.sit ? 0.08 : 0, lz);
gp.rotation.y = ry || 0;
g.add(gp);
if (o2.sit) {
gp.userData.seated = true;
gp.userData.pose = "sit";
}
if (title) {
var tg = makeTag((typeof casName === "function" ? casName(title, seed.length) : title) + " · " + title + " (stand-in)", false);
tg.position.y = 2.05;
gp.add(tg);
}
var P = { g: gp, role: title || "guest" };
if (o2.wander)
P.wander = { r: o2.wander };
CAS.people.push(P);
return gp;
};
W.chair = function (lx, lz, ry, mat) {
var ch = new THREE.Group();
ch.position.set(lx, 0, lz);
ch.rotation.y = ry || 0;
g.add(ch);
wBox(0.5, 0.08, 0.5, mat, 0, 0.48, 0, ch);
wBox(0.5, 0.6, 0.08, mat, 0, 0.8, -0.22, ch);
[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(function (q) { wBox(0.05, 0.46, 0.05, mat, q[0], 0.23, q[1], ch); });
return ch;
};
var hw = o.w / 2, z0 = 0.6, z1 = 0.6 + o.d, wall = o.wall, H = o.h;
var fl = wMesh(new THREE.PlaneGeometry(o.w, o.d), o.floor, 0, 0.01, z0 + o.d / 2, g);
fl.rotation.x = -Math.PI / 2;
var ce = wMesh(new THREE.PlaneGeometry(o.w, o.d), o.ceil || wM(0x1A1018), 0, H, z0 + o.d / 2, g);
ce.rotation.x = Math.PI / 2;
W.box(0.3, H, o.d + 0.3, wall, -hw - 0.15, H / 2, z0 + o.d / 2, true);
W.box(0.3, H, o.d + 0.3, wall, hw + 0.15, H / 2, z0 + o.d / 2, true);
if (o.win) {
var gw = o.win.w, y0 = o.win.y0, y1 = o.win.y1, sw = (o.w + 0.6 - gw) / 2;
W.box(sw, H, 0.3, wall, -(gw / 2 + sw / 2), H / 2, z1 + 0.15, true);
W.box(sw, H, 0.3, wall, (gw / 2 + sw / 2), H / 2, z1 + 0.15, true);
W.box(gw, y0, 0.3, wall, 0, y0 / 2, z1 + 0.15, true);
W.box(gw, H - y1, 0.3, wall, 0, y1 + (H - y1) / 2, z1 + 0.15, false);
W.box(gw, y1 - y0, 0.04, wB(0x8AA0C8, { op: 0.08, fog: false }), 0, (y0 + y1) / 2, z1 + 0.15, true);
}
else
W.box(o.w + 0.6, H, 0.3, wall, 0, H / 2, z1 + 0.15, true);
var side = (o.w - 3.2) / 2;
W.box(side, H, 0.3, wall, -(1.6 + side / 2), H / 2, z0 - 0.15, true);
W.box(side, H, 0.3, wall, (1.6 + side / 2), H / 2, z0 - 0.15, true);
W.box(3.2, H - 3, 0.3, wall, 0, 3 + (H - 3) / 2, z0 - 0.15, false);
if (o.trim) {
[[-hw + 0.02, 0], [hw - 0.02, 0]].forEach(function (q) { W.box(0.04, 0.08, o.d, o.trim, q[0], 1.0, z0 + o.d / 2); W.box(0.04, 0.12, o.d, o.trim, q[0], H - 0.15, z0 + o.d / 2); });
W.box(o.w, 0.08, 0.04, o.trim, 0, 1.0, z1 - 0.02);
W.box(o.w, 0.12, 0.04, o.trim, 0, H - 0.15, z1 - 0.02);
}
var gold = wM(0xC9A868, { e: 0x3A2A08 });
[-1.7, 1.7].forEach(function (x) { W.box(0.2, 3.1, 0.5, gold, x, 1.55, z0 - 0.2); });
W.box(3.6, 0.2, 0.5, gold, 0, 3.1, z0 - 0.2);
W.sign([o.name, o.sub || ""], 3.4, 0.8, 0, 3.8, -0.08, Math.PI);
W.inside = function (x, z) { var L = W.loc(x, z); return Math.abs(L.x) < hw - 0.3 && L.z > z0 + 0.25 && L.z < z1 - 0.3; };
W.door = function (x, z) { var L = W.loc(x, z); return Math.abs(L.x) < 1.35 && L.z > -1.6 && L.z < z0 + 0.4; };
CW.wings.push(W);
return W;
},
function (G) {
var old = null;
G.children.forEach(function (m) { var P = m.geometry && m.geometry.parameters; if (m.isMesh && P && m.geometry.type === "CylinderGeometry" && P.radiusTop === 31 && P.openEnded && P.height === 12)
old = m; });
var mat = old ? old.material : wM(0x2A1420, { ds: true });
if (old)
G.remove(old);
var gaps = CW.wings.map(function (W) { return Math.PI / 2 - W.o.th; }).map(function (t) { t = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); return t; }).sort(function (a, b) { return a - b; });
var half = 1.7 / 31, segs = [];
for (var i = 0; i < gaps.length; i++) {
var a = gaps[i] + half, b = (i + 1 < gaps.length ? gaps[i + 1] : gaps[0] + 2 * Math.PI) - half;
segs.push([a, b - a]);
}
segs.forEach(function (sg) { wMesh(new THREE.CylinderGeometry(31, 31, 12, Math.max(4, Math.round(sg[1] / (Math.PI * 2) * 64)), 1, true, sg[0], sg[1]), mat, 0, 6, 0, G); });
gaps.forEach(function (t) { wMesh(new THREE.CylinderGeometry(31, 31, 9, 3, 1, true, t - half, half * 2), mat, 0, 7.5, 0, G); });
},
function (G) {
CW.wings = [];
CW.locks = [];
CW.doors = [];
CW.wheel = null;
var gold = wM(0xC9A868, { e: 0x3A2A08 }), dark = wM(0x1A1018), felt = wM(0x0E5A3A), wood = wM(0x4A2418), cream = wM(0xE8DFCC), silver = wM(0xC8CCD4, { e: 0x181A20 }), red = wM(0x8A1A2A), steel = wM(0x9AA0A8);
function carpet(base, fig) {
return new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (x, W, H) {
x.fillStyle = base;
x.fillRect(0, 0, W, H);
x.strokeStyle = fig;
x.lineWidth = 3;
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = i * 64 + 32, cy = j * 64 + 32;
x.beginPath();
x.arc(cx, cy, 18, 0.7, Math.PI * 1.75);
x.stroke();
x.beginPath();
x.moveTo(cx - 28, cy);
x.lineTo(cx, cy - 28);
x.lineTo(cx + 28, cy);
x.lineTo(cx, cy + 28);
x.closePath();
x.globalAlpha = 0.35;
x.stroke();
x.globalAlpha = 1;
}
}, [6, 6]) });
}
function panels(base, line) { return new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (x, W, H) { x.fillStyle = base; x.fillRect(0, 0, W, H); x.strokeStyle = line; x.lineWidth = 4; x.strokeRect(10, 10, W - 20, H - 20); x.globalAlpha = 0.25; x.strokeRect(22, 22, W - 44, H - 44); x.globalAlpha = 1; }, [6, 2]) }); }
function chandelier(W, lx, lz, y, sc) {
var ch = new THREE.Group();
ch.position.set(lx, y, lz);
ch.scale.setScalar(sc || 1);
W.g.add(ch);
wMesh(new THREE.TorusGeometry(0.9, 0.05, 6, 20), gold, 0, 0, 0, ch).rotation.x = Math.PI / 2;
wCyl(0.02, 0.02, 0.8, gold, 0, 0.4, 0, ch, 4);
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2;
wSph(0.08, wB(0xFFF0D0, { fog: false }), Math.cos(a) * 0.9, -0.12, Math.sin(a) * 0.9, ch, 6);
}
ch.add(wGlow(0xFFE8B0, 4, 0.25));
}
var S = cwWing(G, { th: Math.PI * 2 * (1.5 / 32), w: 14, d: 16, h: 4.6, name: "THE CRESCENT SALON", sub: "High limits · Baccarat", floor: carpet("#14203A", "#C9A868"), wall: panels("#3A1E14", "#7A4A2A"), trim: gold });
chandelier(S, 0, 7, 4.1, 1.3);
chandelier(S, -3.5, 13, 4.1, 0.9);
chandelier(S, 4, 13, 4.1, 0.9);
[-2.2, 2.2].forEach(function (x) { for (var j = 0; j < 2; j++) {
S.cyl(0.05, 0.07, 1, gold, x, 0.5, 1.4 + j * 1.6, 8);
S.sph(0.09, gold, x, 1.03, 1.4 + j * 1.6, 8);
} S.box(0.04, 0.04, 1.6, red, x, 0.85, 2.2); });
var bt = new THREE.Group();
bt.position.set(0, 0, 7.4);
S.g.add(bt);
var tb = wCyl(1, 1, 0.85, wood, 0, 0.42, 0, bt, 32);
tb.scale.set(2.3, 1, 1.15);
var tf = wCyl(0.97, 0.97, 0.04, felt, 0, 0.86, 0, bt, 32);
tf.scale.set(2.25, 1, 1.1);
var bacTex = wTex(256, 128, function (x, W, H) {
x.fillStyle = "#0E5A3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#E8DFCC";
x.lineWidth = 2;
x.fillStyle = "#E8DFCC";
x.font = "bold 16px Georgia";
x.textAlign = "center";
[["PLAYER", 0.78], ["BANKER", 0.52], ["TIE 8 TO 1", 0.28]].forEach(function (r) { x.beginPath(); x.ellipse(W / 2, H * 1.1, W * 0.47 * r[1] / 0.78, H * r[1], 0, Math.PI, 2 * Math.PI); x.stroke(); x.fillText(r[0], W / 2, H * (1.08 - r[1]) + 16); });
});
var lay = wMesh(new THREE.PlaneGeometry(3.6, 1.6), new THREE.MeshLambertMaterial({ map: bacTex, transparent: true }), 0, 0.885, -0.1, bt);
lay.rotation.x = -Math.PI / 2;
wBox(0.5, 0.22, 0.36, red, 0.9, 0.98, 0.5, bt);
for (var cs = 0; cs < 4; cs++)
wCyl(0.11, 0.11, 0.12 + cs * 0.05, wM([0xC0303A, 0x2A6AC8, 0x1A1A1A, 0xE8DFCC][cs]), -0.6 + cs * 0.26, 0.93 + cs * 0.03, 0.55, bt, 10);
var sp = S.pt(0, 7.4);
CAS.solids.push({ x: sp.x, z: sp.z, hw: 2.3, hd: 1.2, rot: S.ph });
for (var bc = 0; bc < 6; bc++) {
var ba = Math.PI * (1.12 + bc * 0.155);
S.chair(Math.cos(ba) * 2.9, 7.4 + Math.sin(ba) * 1.75, -ba - Math.PI / 2 + Math.PI, red);
}
S.person("bacdl", "Baccarat dealer", 0, 8.8, Math.PI);
S.person("bacg1", "", -1.6, 5.95, 0, { sit: true });
S.person("bacg2", "", 1.4, 5.9, 0, { sit: true });
S.spot(0, 5.0, 2.2, "Baccarat: player, banker or a tie (smallest bet 100 chips)", cwBaccarat);
var bj = new THREE.Group();
bj.position.set(-3.6, 0, 13.2);
S.g.add(bj);
wMesh(new THREE.CylinderGeometry(1.9, 1.9, 0.85, 32, 1, false, Math.PI / 2, Math.PI), wood, 0, 0.42, 0, bj);
var bf = wMesh(new THREE.CircleGeometry(1.85, 32, Math.PI, Math.PI), felt, 0, 0.86, 0, bj);
bf.rotation.x = -Math.PI / 2;
wBox(3.8, 0.9, 0.3, wood, 0, 0.45, 0.1, bj);
var bjp = S.pt(-3.6, 12.6);
CAS.solids.push({ x: bjp.x, z: bjp.z, hw: 1.9, hd: 0.9, rot: S.ph });
for (var bs = 0; bs < 4; bs++) {
var a5 = Math.PI * (1.15 + bs * 0.23);
S.chair(-3.6 + Math.cos(a5) * 2.4, 13.2 + Math.sin(a5) * 2.0, -a5 + Math.PI / 2, red);
}
S.person("bjdl", "Card dealer", -3.6, 13.9, Math.PI);
S.spot(-3.6, 10.6, 2.0, "Blackjack in the Salon", function () { casBlackjack(0); });
S.box(4.4, 1.1, 0.7, wood, 4.2, 0.55, 13.6, true);
S.box(4.6, 0.07, 0.9, gold, 4.2, 1.12, 13.6);
S.box(4.4, 2.4, 0.3, dark, 4.2, 2.2, 16.1, true);
for (var sh = 0; sh < 2; sh++) {
S.box(4, 0.05, 0.3, wood, 4.2, 1.5 + sh * 0.7, 15.9);
for (var bo = 0; bo < 8; bo++)
S.cyl(0.05, 0.06, 0.3, wM([0x2A6A3A, 0x8A3A1A, 0xC8A040, 0x3A4AA8][(bo + sh) % 4], { op: 0.85 }), 2.6 + bo * 0.45, 1.68 + sh * 0.7, 15.9, 8);
}
S.person("salbar", "Barkeep", 4.2, 14.6, Math.PI);
S.spot(4.2, 12.2, 2.0, "The Salon bar", function () { if (typeof casBar === "function")
casBar(); });
[[-4.6, 2.6], [-5.6, 4.2], [4.8, 3.2]].forEach(function (q, i) {
var ac = new THREE.Group();
ac.position.set(q[0], 0, q[1]);
ac.rotation.y = i === 2 ? -Math.PI / 2 : Math.PI / 2;
S.g.add(ac);
wBox(0.9, 0.45, 0.85, red, 0, 0.32, 0, ac);
wBox(0.9, 0.7, 0.2, red, 0, 0.75, -0.35, ac);
wBox(0.18, 0.35, 0.85, red, -0.4, 0.6, 0, ac);
wBox(0.18, 0.35, 0.85, red, 0.4, 0.6, 0, ac);
});
S.cyl(0.35, 0.35, 0.5, wood, -5.0, 0.25, 3.4, 16, true);
var pnt = wTex(256, 160, function (x, W, H) {
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#05060E");
gr.addColorStop(1, "#1A1A2A");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
x.fillStyle = "#3A6AC8";
x.beginPath();
x.arc(W * 0.62, H * 0.42, 30, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#E8ECF4";
x.globalAlpha = 0.5;
x.beginPath();
x.arc(W * 0.6, H * 0.38, 14, 0, Math.PI * 2);
x.fill();
x.globalAlpha = 1;
x.fillStyle = "#6A6760";
x.fillRect(0, H * 0.75, W, H * 0.25);
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.strokeRect(4, 4, W - 8, H - 8);
});
var pm = wMesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshLambertMaterial({ map: pnt }), -1, 2.5, 16.42, S.g);
pm.rotation.y = Math.PI;
S.person("pit", "Pit boss", 5.4, 5.6, -Math.PI / 2);
S.sign(["THE CRESCENT SALON", "Baccarat · bets from 100 chips"], 3.6, 0.8, 0, 3.6, 1.0, 0);
var D = cwWing(G, { th: Math.PI * 2 * (6.5 / 32), w: 16, d: 16, h: 4.6, name: "THE DICE ROOM", sub: "Craps · the Big Six", floor: carpet("#3A0E18", "#C9A868"), wall: panels("#2A1420", "#5A2A3A"), trim: gold });
chandelier(D, 0, 5.6, 4.1, 1.1);
chandelier(D, 0, 11.2, 4.1, 1.1);
var crTex = wTex(512, 256, function (x, W, H) {
x.fillStyle = "#0E5A3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#E8DFCC";
x.fillStyle = "#E8DFCC";
x.lineWidth = 3;
x.textAlign = "center";
x.textBaseline = "middle";
x.strokeRect(14, 14, W - 28, H - 28);
x.strokeRect(30, H - 62, W - 60, 32);
x.font = "bold 20px Georgia";
x.fillText("PASS LINE", W / 2, H - 46);
x.strokeRect(60, H - 108, W - 120, 38);
x.font = "bold 15px Georgia";
x.fillText("DON'T PASS BAR · 12 IS A STAND-OFF", W / 2, H - 89);
x.strokeRect(60, H / 2 - 60, W - 120, 46);
x.font = "bold 18px Georgia";
x.fillText("FIELD  2 · 3 · 4 · 9 · 10 · 11 · 12", W / 2, H / 2 - 37);
x.fillStyle = "#A01E28";
x.fillRect(W / 2 - 70, 30, 140, 34);
x.fillStyle = "#E8DFCC";
x.font = "bold 16px Georgia";
x.fillText("ANY SEVEN 4 TO 1", W / 2, 47);
x.font = "bold 14px Georgia";
[4, 5, 6, 8, 9, 10].forEach(function (n, i) { x.strokeRect(40 + i * 72, 74, 64, 30); x.fillText(String(n), 72 + i * 72, 89); });
});
[5.4, 11.4].forEach(function (z, i) {
var t = new THREE.Group();
t.position.set(0, 0, z);
D.g.add(t);
wBox(5.6, 0.85, 2.6, wood, 0, 0.42, 0, t);
wBox(5.8, 0.18, 2.8, red, 0, 0.95, 0, t);
var top = wMesh(new THREE.PlaneGeometry(5.2, 2.2), new THREE.MeshLambertMaterial({ map: crTex }), 0, 0.88, 0, t);
top.rotation.x = -Math.PI / 2;
wBox(0.06, 0.25, 2.2, gold, -2.6, 1.0, 0, t);
wBox(0.06, 0.25, 2.2, gold, 2.6, 1.0, 0, t);
for (var dd = 0; dd < 2; dd++) {
var di = wBox(0.09, 0.09, 0.09, wM(0xC0303A, { op: 0.92 }), 0.3 + dd * 0.16, 0.93, -0.2, t);
di.rotation.y = dd * 0.6;
}
var stick = wCyl(0.015, 0.015, 1.4, wood, -0.6, 1.05, 0.5, t, 4);
stick.rotation.z = 1.2;
var tp = D.pt(0, z);
CAS.solids.push({ x: tp.x, z: tp.z, hw: 2.9, hd: 1.4, rot: D.ph });
D.person("stick" + i, "Craps dealer", 0, z + 1.75, Math.PI);
D.person("boxm" + i, i ? "" : "Craps dealer", 1.6, z + 1.75, Math.PI);
D.person("crg" + i + "a", "", -1.8, z - 1.75, 0);
D.person("crg" + i + "b", "", 0.9, z - 1.75, 0);
D.spot(-0.4, z - 2.0, 1.6, "Craps: pass, don't pass, the field or any seven", function () { cwCraps(i); });
});
var wr = new THREE.Group();
wr.position.set(7.55, 2.3, 8.4);
wr.rotation.y = -Math.PI / 2;
D.g.add(wr);
var wt = wTex(512, 512, function (x, W, H) {
var cx = W / 2, n = CW_WHEEL.length, cols = { 1: "#E8C860", 2: "#3A6AC8", 5: "#2A8A4A", 10: "#7A3AA8", 20: "#C86A2A", 40: "#141418" };
for (var i = 0; i < n; i++) {
var a0 = -Math.PI / 2 + (i - 0.5) / n * Math.PI * 2, a1 = a0 + Math.PI * 2 / n;
x.fillStyle = cols[CW_WHEEL[i]];
x.beginPath();
x.moveTo(cx, cx);
x.arc(cx, cx, 250, a0, a1);
x.closePath();
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 2;
x.stroke();
}
x.save();
x.translate(cx, cx);
for (var j = 0; j < n; j++) {
x.save();
x.rotate(j / n * Math.PI * 2);
x.fillStyle = CW_WHEEL[j] === 1 ? "#141418" : "#F4ECD8";
x.font = "bold 20px Georgia";
x.textAlign = "center";
x.fillText(CW_WHEEL[j] === 40 ? "☾" : String(CW_WHEEL[j]), 0, -205);
x.restore();
}
x.restore();
x.fillStyle = "#2A1420";
x.beginPath();
x.arc(cx, cx, 120, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.beginPath();
x.arc(cx, cx, 120, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#E8C27A";
x.font = "bold 34px Georgia";
x.textAlign = "center";
x.fillText("BIG SIX", cx, cx + 12);
});
var disc = new THREE.Group();
wr.add(disc);
var face = wMesh(new THREE.CircleGeometry(1.6, 54), new THREE.MeshLambertMaterial({ map: wt }), 0, 0, 0.06, disc);
wMesh(new THREE.TorusGeometry(1.62, 0.07, 8, 54), gold, 0, 0, 0.06, wr);
for (var pg = 0; pg < 54; pg++) {
var pa = pg / 54 * Math.PI * 2;
wCyl(0.012, 0.012, 0.12, silver, Math.sin(pa) * 1.6, Math.cos(pa) * 1.6, 0.12, disc, 4).rotation.x = Math.PI / 2;
}
wBox(0.12, 0.4, 0.05, wM(0x6A3A1A), 0, 1.78, 0.16, wr);
D.box(0.3, 0.75, 1.4, dark, 7.75, 0.37, 8.4, true);
D.box(0.12, 0.12, 0.6, gold, 7.75, 0.78, 8.4);
CW.wheel = { disc: disc, a: 0, from: 0, to: 0, t: 1, dur: 5 };
D.spot(5.6, 8.4, 2.0, "The Big Six wheel", cwWheel);
D.person("big6", "Big Six wheel attendant", 6.6, 10.2, -Math.PI / 2);
D.sign(["THE DICE ROOM", "Craps · the Big Six wheel"], 3.6, 0.8, 0, 3.6, 1.0, 0);
[[-7, 14.6], [7, 14.6]].forEach(function (q) { D.cyl(0.3, 0.38, 0.6, wM(0x3A2A20), q[0], 0.3, q[1], 12, true); var pl = D.sph(0.55, wM(0x2A5A2A), q[0], 1.0, q[1], 10); pl.scale.y = 1.3; });
var E = cwWing(G, { th: Math.PI * 2 * (14.5 / 32), w: 16, d: 20, h: 5, name: "THE EARTHRISE ROOM", sub: "Fine dining", win: { w: 11, y0: 1.0, y1: 4.4 }, floor: new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (x, W, H) { x.fillStyle = "#5A3A22"; x.fillRect(0, 0, W, H); x.strokeStyle = "#3A2414"; x.lineWidth = 2; for (var i = 0; i < 8; i++) {
x.beginPath();
x.moveTo(0, i * 16);
x.lineTo(W, i * 16);
x.stroke();
x.beginPath();
x.moveTo((i % 2) * 64 + 20, i * 16);
x.lineTo((i % 2) * 64 + 20, i * 16 + 16);
x.stroke();
} }, [8, 10]) }), wall: panels("#2A2030", "#4A3A50"), trim: gold });
E.box(11.4, 0.2, 0.3, gold, 0, 4.45, 20.4);
E.box(11.4, 0.2, 0.3, gold, 0, 1.0, 20.4);
for (var m = 0; m < 5; m++)
E.box(0.12, 3.4, 0.25, gold, -5.5 + m * 2.75, 2.7, 20.4);
var er = wMesh(new THREE.SphereGeometry(2.2, 32, 20), new THREE.MeshBasicMaterial({ map: (typeof spPaint === "function" ? spPaint("earth") : null), color: typeof spPaint === "function" ? 0xFFFFFF : 0x3A6AC8, fog: false }), 1.5, 3.4, 24, E.g);
er.add(wGlow(0x6AA8FF, 7, 0.3));
CW.earth = er;
var ms = wMesh(new THREE.PlaneGeometry(24, 4), wM(0x5A5852), 0, 0.9, 22, E.g);
ms.rotation.x = -Math.PI / 2 + 0.08;
var sta = wPoints(160, function () { return [-10 + Math.random() * 20, 4 + Math.random() * 8, 26 + Math.random() * 4]; }, 0xFFFFFF, 1.2, false);
E.g.add(sta);
chandelier(E, 2.5, 9, 4.5, 1);
chandelier(E, 2.5, 15, 4.5, 1);
chandelier(E, -4.5, 15, 4.5, 0.9);
var cloth = wM(0xE8E2D4), chairM = wM(0x5A2A1A);
[[0.5, 10], [5, 10], [-4.5, 12.2], [0.5, 14.6], [5, 14.6], [-4.5, 17], [0.5, 18.6], [5, 18.6]].forEach(function (q, i) {
E.cyl(0.75, 0.75, 0.04, cloth, q[0], 0.78, q[1], 20, true);
E.cyl(0.78, 0.7, 0.5, cloth, q[0], 0.52, q[1], 20);
E.cyl(0.05, 0.05, 0.5, gold, q[0], 0.25, q[1], 6);
E.cyl(0.03, 0.03, 0.18, cream, q[0], 0.89, q[1], 6);
E.sph(0.03, wB(0xFFC860, { fog: false }), q[0], 1.0, q[1], 6);
for (var c2 = 0; c2 < 3; c2++) {
var a = c2 / 3 * Math.PI * 2 + i * 0.4;
E.chair(q[0] + Math.cos(a) * 1.15, q[1] + Math.sin(a) * 1.15, -a - Math.PI / 2, chairM);
}
if (i % 2 === 0) {
var a2 = i * 0.4;
E.person("din" + i, "", q[0] + Math.cos(a2) * 1.0, q[1] + Math.sin(a2) * 1.0, -a2 - Math.PI / 2, { sit: true });
}
});
E.box(0.9, 1.15, 0.6, wood, 2.4, 0.58, 2.4, true);
E.box(1.0, 0.06, 0.7, gold, 2.4, 1.18, 2.4);
E.person("maitre", "Casino host", 2.4, 3.3, Math.PI);
E.spot(2.4, 1.3, 2.2, "The Earthrise Room: a table and the menu", function () { if (typeof needsMenu === "function")
needsMenu("The Earthrise Room");
else
setStatus("The Earthrise Room is setting its tables."); });
E.person("waiter1", "Waiter, Earthrise Room", 3, 12.4, 0, { wander: 3 });
E.person("waiter2", "Waiter, Earthrise Room", -2, 16, Math.PI / 2, { wander: 3 });
var kw = wM(0xB8BCC0), tile = new THREE.MeshLambertMaterial({ map: wTex(64, 64, function (x, W, H) { x.fillStyle = "#9A9EA4"; x.fillRect(0, 0, W, H); x.strokeStyle = "#7A7E84"; x.strokeRect(0, 0, 32, 32); x.strokeRect(32, 32, 32, 32); x.strokeRect(32, 0, 32, 32); x.strokeRect(0, 32, 32, 32); }, [4, 4]) });
var kf = wMesh(new THREE.PlaneGeometry(5, 8), tile, -5.5, 0.02, 4.6, E.g);
kf.rotation.x = -Math.PI / 2;
E.box(0.2, 5, 2.6, kw, -3, 2.5, 1.9, true);
E.box(0.2, 5, 3.5, kw, -3, 2.5, 6.85, true);
E.box(0.2, 2, 1.4, kw, -3, 4, 3.9);
E.box(5, 5, 0.2, kw, -5.5, 2.5, 8.6, true);
var kd = E.box(0.08, 2.9, 1.36, wM(0x6A6E74), -3, 1.45, 3.9);
CW.doors.push({ m: kd, axis: "z", to: 1.45 });
var lk = E.pt(-3, 3.9);
CW.locks.push({ x: lk.x, z: lk.z, hw: 0.25, hd: 0.7, rot: E.ph });
E.spot(-2.2, 3.9, 1.6, "The kitchen (staff only)", function () { cwStaffOnly("the Earthrise Room's kitchen"); });
E.box(0.8, 0.9, 3.6, steel, -7.5, 0.45, 4.2, true);
for (var bn = 0; bn < 4; bn++) {
E.cyl(0.14, 0.14, 0.03, dark, -7.5, 0.92, 2.9 + bn * 0.85, 10);
E.cyl(0.13, 0.12, 0.18, silver, -7.5, 1.02, 2.9 + bn * 0.85, 10);
}
E.box(1.2, 0.6, 3.8, steel, -7.4, 3.4, 4.2);
E.box(2.6, 0.9, 0.8, steel, -5.2, 0.45, 6.2, true);
E.box(0.9, 1.9, 0.7, wM(0xD0D4D8), -7.5, 0.95, 7.6, true);
for (var bd = 0; bd < 3; bd++)
E.box(0.5, 0.05, 0.35, wM(0x8A6A3A), -5.9 + bd * 0.7, 0.92, 6.2);
E.person("chef", "Head chef, Earthrise Room", -5.6, 4.6, -Math.PI / 2, { look: { hat: "chef" } });
E.person("cook", "Line cook, Earthrise Room", -6.6, 6.9, Math.PI);
E.sign(["THE EARTHRISE ROOM", "Under the light of home"], 3.6, 0.8, 2, 4.0, 1.0, 0);
var B = cwWing(G, { th: -Math.PI * 2 * (4.5 / 32), w: 12, d: 22, h: 4, name: "STAFF ONLY", sub: "Hidden Crescent staff", floor: wM(0x4A4E54), ceil: wM(0x2A2C30), wall: wM(0x6A6E74), locked: true });
var bdoor = B.box(3.2, 3, 0.12, wM(0x5A5E6A), 0, 1.5, 0.45);
CW.doors.push({ m: bdoor, axis: "x", to: 2.9 });
var bl = B.pt(0, 0.45);
CW.locks.push({ x: bl.x, z: bl.z, hw: 1.6, hd: 0.3, rot: B.ph });
B.spot(0, -1.6, 2.0, "Staff only: the casino's back of house", function () { cwStaffOnly("the back of house"); });
var pw = wM(0x7A7E84);
[-1.5, 1.5].forEach(function (x) { B.box(0.15, 4, 4.4, pw, x, 2, 2.8, true); B.box(0.15, 4, 9.6, pw, x, 2, 11.6, true); B.box(0.15, 4, 5.5, pw, x, 2, 19.9, true); B.box(0.15, 1, 1.4, pw, x, 3.5, 5.7); B.box(0.15, 1, 1.4, pw, x, 3.5, 17.1); });
B.box(4.5, 4, 0.15, pw, -3.75, 2, 11.3, true);
B.box(4.5, 4, 0.15, pw, 3.75, 2, 11.3, true);
var vd = B.cyl(1.1, 1.1, 0.25, steel, -5.85, 1.5, 6, 32);
vd.rotation.z = Math.PI / 2;
B.cyl(0.3, 0.3, 0.3, silver, -5.75, 1.5, 6, 16).rotation.z = Math.PI / 2;
for (var sp2 = 0; sp2 < 6; sp2++) {
var sa = sp2 / 6 * Math.PI * 2;
B.box(0.06, 0.6, 0.06, silver, -5.6, 1.5 + Math.cos(sa) * 0.45, 6 + Math.sin(sa) * 0.45).rotation.x = sa;
}
B.box(2.4, 0.85, 1.0, steel, -3.6, 0.42, 3.2, true);
B.box(2.4, 0.85, 1.0, steel, -3.6, 0.42, 8.6, true);
for (var st = 0; st < 6; st++) {
B.cyl(0.08, 0.08, 0.3, wM([0xC0303A, 0x2A6AC8, 0x2A8A4A, 0x1A1A1A, 0xE8E0D0, 0xC9A868][st]), -4.4 + st * 0.3, 1.0, 3.2, 8);
B.cyl(0.08, 0.08, 0.22, wM([0xC0303A, 0x2A6AC8, 0x2A8A4A][st % 3]), -4.4 + st * 0.3, 0.96, 8.6, 8);
}
B.box(0.8, 0.8, 1.2, wM(0x3A3E44), -2.4, 0.5, 6.0, true);
B.person("count1", "Count room clerk", -3.6, 4.2, Math.PI);
B.person("count2", "Count room clerk", -3.6, 9.5, Math.PI);
B.sign(["COUNT ROOM", "Two to count · two to sign"], 2.2, 0.6, -1.6, 3.0, 5.7, -Math.PI / 2, "#2A2C30", "#E8E0D0");
B.spot(-3.6, 6.0, 2.0, "The count room", function () { cwRoomCard("The count room", "Every night's drop boxes come here from the tables. Two clerks count every chip by colour, a second time to be sure, and both sign the sheet before it goes into the vault.", "Count room clerk"); });
var mon = wTex(128, 96, function (x, W, H) { x.fillStyle = "#0A1410"; x.fillRect(0, 0, W, H); x.fillStyle = "#1E5A3A"; x.fillRect(20, 30, 40, 24); x.beginPath(); x.ellipse(90, 50, 22, 14, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = "#C8D0C8"; x.font = "10px monospace"; x.fillText("CAM", 4, 12); x.fillStyle = "#6A8A6A"; x.fillRect(4, H - 10, W - 8, 2); });
for (var r = 0; r < 3; r++)
for (var c3 = 0; c3 < 4; c3++) {
var sc = wMesh(new THREE.PlaneGeometry(0.95, 0.7), new THREE.MeshBasicMaterial({ map: mon, color: 0xB0C8B8 }), 5.85, 1.2 + r * 0.8, 2.2 + c3 * 1.05, B.g);
sc.rotation.y = -Math.PI / 2;
}
B.box(0.1, 2.6, 4.6, dark, 5.95, 1.9, 3.8);
B.box(1.0, 0.8, 4.4, wM(0x3A3E44), 4.6, 0.4, 3.8, true);
for (var k2 = 0; k2 < 3; k2++)
B.box(0.5, 0.04, 0.25, dark, 4.5, 0.82, 2.4 + k2 * 1.4);
B.chair(3.7, 3.0, Math.PI / 2, dark);
B.chair(3.7, 4.8, Math.PI / 2, dark);
B.person("surv1", "Surveillance officer", 3.6, 3.0, Math.PI / 2, { sit: true });
B.sign(["SURVEILLANCE", "Nobody here plays"], 2.2, 0.6, 1.6, 3.0, 5.7, Math.PI / 2, "#2A2C30", "#E8E0D0");
B.spot(3.4, 6.0, 2.0, "Surveillance", function () { cwRoomCard("Surveillance", "Every table, machine and door on the floor has a camera, and the screens here never sleep. When a big win comes up, or a dispute at a table, the officer pulls the recording for the pit boss.", "Surveillance officer"); });
for (var lc = 0; lc < 6; lc++) {
B.box(0.55, 2, 0.5, wM(lc % 2 ? 0x4A5A6A : 0x3A4A5A), -5.7, 1, 12.2 + lc * 0.6, false);
B.box(0.04, 0.1, 0.02, silver, -5.43, 1.2, 12.2 + lc * 0.6);
}
var lkp = B.pt(-5.7, 13.7);
CAS.solids.push({ x: lkp.x, z: lkp.z, hw: 0.3, hd: 1.8, rot: B.ph });
B.box(2, 0.45, 0.85, wM(0x3A5A6A), -3.6, 0.3, 21.6, true);
B.box(2, 0.6, 0.2, wM(0x3A5A6A), -3.6, 0.75, 21.95);
B.cyl(0.6, 0.6, 0.05, wood, -3.4, 0.75, 18.2, 16, true);
B.cyl(0.05, 0.05, 0.75, dark, -3.4, 0.37, 18.2, 6);
B.chair(-2.5, 18.2, -Math.PI / 2, dark);
B.chair(-4.3, 18.2, Math.PI / 2, dark);
B.box(1.8, 0.9, 0.6, wood, -5.6, 0.45, 20.0, true);
B.cyl(0.1, 0.12, 0.22, silver, -5.4, 1.01, 20.0, 10);
var nb = wTex(128, 96, function (x, W, H) { x.fillStyle = "#8A6A4A"; x.fillRect(0, 0, W, H); [["#F4ECD8", 10, 10], ["#E8D8A8", 60, 14], ["#D8E0F0", 22, 50], ["#F4ECD8", 70, 52]].forEach(function (n) { x.fillStyle = n[0]; x.fillRect(n[1], n[2], 44, 32); x.fillStyle = "#555"; for (var l = 0; l < 3; l++)
x.fillRect(n[1] + 4, n[2] + 8 + l * 8, 34, 2); }); });
var nbm = wMesh(new THREE.PlaneGeometry(1.2, 0.9), new THREE.MeshLambertMaterial({ map: nb }), -1.6, 1.7, 15, B.g);
nbm.rotation.y = -Math.PI / 2;
B.person("staffbreak", "", -4.3, 18.2, Math.PI / 2, { sit: true });
B.spot(-3.6, 16, 2.2, "The staff room", function () { cwRoomCard("The staff room", "Lockers for every post, the kettle, a sofa and the notice board: the rota, the house rules, and who has the next night off.", null); });
B.box(2, 0.78, 0.9, wood, 3.8, 0.39, 17.4, true);
B.box(2.1, 0.05, 1.0, wood, 3.8, 0.8, 17.4);
B.chair(3.8, 18.4, Math.PI, wM(0x2A1A14));
B.chair(3.4, 16.3, 0, dark);
B.box(0.8, 1.0, 0.7, wM(0x3A3E44), 5.5, 0.5, 21.8, true);
B.cyl(0.12, 0.12, 0.06, silver, 5.5, 0.6, 21.43, 12).rotation.x = Math.PI / 2;
B.box(0.4, 2.4, 2.4, wood, 5.75, 1.2, 14, true);
for (var bk = 0; bk < 4; bk++)
for (var bb = 0; bb < 6; bb++)
B.box(0.25, 0.4, 0.12, wM([0x6A1A1A, 0x1A3A6A, 0x2A5A2A, 0x6A5A1A][(bk + bb) % 4]), 5.5, 0.55 + bk * 0.55, 13.1 + bb * 0.36);
B.sign(["MANAGER", "Knock first"], 1.8, 0.5, 1.6, 3.0, 17.1, Math.PI / 2, "#2A2C30", "#E8E0D0");
B.spot(3.6, 15.6, 2.0, "The manager's office", function () { cwRoomCard("The manager's office", "The casino manager's desk, the safe for the night's float, the books. Hiring, promotions and raises for the Hidden Crescent's staff are decided here.", "Casino manager"); });
[[0, 4], [0, 10], [0, 16], [0, 21]].forEach(function (q) { B.box(1.2, 0.05, 0.3, wB(0xE8E4D8), q[0], 3.97, q[1]); });
var bp = { x: 5.6, z: 25.4 };
wBox(0.12, 2.4, 0.12, gold, bp.x, 1.2, bp.z, G);
var brd = wSign(["THE HIDDEN CRESCENT", "East · the Crescent Salon", "South-east · the Dice Room", "West · the Earthrise Room", "Tables, wheels and machines on the floor"], 2.6, 2.0, "#14080E", "#E8C27A");
brd.position.set(bp.x, 2.2, bp.z + 0.08);
brd.rotation.y = Math.PI * 1.1;
G.add(brd);
CAS.spots.push({ x: bp.x - 0.6, z: bp.z - 1.4, r: 1.8, name: "The guide board: where everything is", fn: cwGuideCard });
cwCutWall(G);
},
function (what) {
if (cwBadge()) {
setStatus("<b>Your staff badge opens " + esc(what) + ".</b>");
return;
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Staff only</div>" +
"<div style='opacity:.85;margin-top:6px'>The door to " + esc(what) + " opens to a Hidden Crescent staff badge. Every post here is hired the same way as in the city: look for <b>📋 Hiring here</b>, or ask the casino manager by the airlock.</div>");
},
function () {
var P = [["The Crescent Salon", "Baccarat from 100 chips, blackjack, a private bar", 0], ["The Dice Room", "Craps and the Big Six wheel", 1], ["The Earthrise Room", "Dinner under Earth, for gold", 2],
["The cage", "Gold for chips, chips for gold", -1, { x: 16.2, z: 18.2 }], ["The prize counter", "Prizes for chips", -1, { x: -16.2, z: 18.2 }], ["The bar", "Under the great window", -1, { x: 4, z: -18.2 }],
["Roulette", "The wheels on the west of the floor", -1, { x: -9.2, z: 4.4 }], ["Blackjack", "The half-moon tables on the east", -1, { x: 10, z: 5.6 }], ["Poker with other dreamers", "The players' table", -1, null]];
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Where everything is</div><div style='opacity:.8;margin-bottom:6px'>Pick a place and the banner at the top points the way.</div>", f = {};
P.forEach(function (p, i) {
var to = p[2] >= 0 ? CW.wings[p[2]] : null, t = to ? to.pt(0, 3) : p[3];
if (!t) {
var ps = CAS.spots.filter(function (s) { return /players' table/.test(s.name); })[0];
if (ps)
t = { x: ps.x, z: ps.z };
}
if (!t)
return;
h += worldBtn("g" + i, esc(p[0]), esc(p[1]));
f["g" + i] = function () { CW.guide = { x: t.x, z: t.z, name: p[0] }; worldCard(null); setStatus("<b>" + esc(p[0]) + "</b>: follow the arrow on the banner at the top."); };
});
worldCard(h, f);
},
function (kind, bet) {
var rolls = [], pt = null, res = "lose";
for (var n = 0; n < 60; n++) {
var a = 1 + Math.floor(Math.random() * 6), b = 1 + Math.floor(Math.random() * 6), s = a + b;
rolls.push([a, b]);
if (kind === "field") {
res = [3, 4, 9, 10, 11].indexOf(s) >= 0 ? "win" : s === 2 ? "double" : s === 12 ? "triple" : "lose";
break;
}
if (kind === "any7") {
res = s === 7 ? "win" : "lose";
break;
}
if (pt === null) {
if (kind === "pass") {
if (s === 7 || s === 11) {
res = "win";
break;
}
if (s === 2 || s === 3 || s === 12) {
res = "lose";
break;
}
}
else {
if (s === 2 || s === 3) {
res = "win";
break;
}
if (s === 12) {
res = "push";
break;
}
if (s === 7 || s === 11) {
res = "lose";
break;
}
}
pt = s;
}
else {
if (s === pt) {
res = kind === "pass" ? "win" : "lose";
break;
}
if (s === 7) {
res = kind === "pass" ? "lose" : "win";
break;
}
}
}
var pay = { win: bet * (kind === "any7" ? 5 : 2), double: bet * 3, triple: bet * 4, push: bet }[res] || 0;
CAS.pchips += -bet + pay;
return { ok: true, rolls: rolls, point: pt, result: res, win: pay > bet, push: res === "push", payout: pay };
},
function (i) {
var html = casHead("Craps", "<b>Pass line:</b> 7 or 11 on the first roll wins, 2, 3 or 12 loses; any other number is the point, and you win if it comes again before a 7. <b>Don't pass</b> is the reverse (12 on the first roll is a stand-off). <b>The field</b>, one roll: 3, 4, 9, 10 or 11 pay even money, 2 pays double, 12 pays triple. <b>Any seven</b>, one roll, pays 4 to 1.") +
casBetInput("cas-bet") + "<div id='cw-dice' style='font-size:40px;text-align:center;margin:4px 0'>⚄ ⚁</div>" +
worldBtn("pass", "Pass line", "Even money") + worldBtn("dontpass", "Don't pass", "Even money") + worldBtn("field", "The field", "One roll") + worldBtn("any7", "Any seven", "One roll, 4 to 1") + "<div id='cas-msg'></div>";
var fns = {};
["pass", "dontpass", "field", "any7"].forEach(function (k) { fns[k] = function () { cwRoll(i, k); }; });
worldCard(html, fns);
},
function (i, kind) {
if (CW.busy || CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
CW.busy = true;
casMsg("<i>The shooter shakes the dice…</i>");
var p = CAS.practice ? Promise.resolve(cwCrapsLocal(kind, bet)) : casRpc("casino_craps", { p_bet: bet, p_kind: kind });
p.then(function (o) {
if (!o || !o.ok) {
CW.busy = false;
return casMsg(esc((o && o.say) || "The stickman waves the bet away."));
}
var R = o.rolls || [], k = 0, pt = null;
(function next() {
var el = document.getElementById("cw-dice"), r = R[k];
if (r) {
if (el)
el.textContent = CW_DICE[r[0]] + " " + CW_DICE[r[1]];
var s = r[0] + r[1];
if (k === 0 && o.point)
pt = o.point;
casMsg("<b>" + s + "</b>" + (pt && k === 0 ? " · the point is <b>" + pt + "</b>" : pt ? " · rolling for " + pt : ""));
if (typeof playTone === "function")
playTone(300 + s * 20, 0.12);
k++;
if (k < R.length)
return setTimeout(next, R.length > 8 ? 450 : 800);
}
setTimeout(function () {
CW.busy = false;
casPaid(o);
var keep = bet;
cwCraps(i);
var e2 = document.getElementById("cw-dice");
if (e2 && r)
e2.textContent = CW_DICE[r[0]] + " " + CW_DICE[r[1]];
var bi = document.getElementById("cas-bet");
if (bi)
bi.value = keep;
casMsg((r ? "<b>" + (r[0] + r[1]) + "</b> after " + R.length + " roll" + (R.length === 1 ? "" : "s") + " · " : "") + (o.push ? "A stand-off: your chips come back." : o.win ? "<b style='color:#FFE7B0'>You win " + o.payout + " chips.</b>" : "The stickman rakes your chips in."));
if (typeof playTone === "function")
playTone(o.win ? 660 : o.push ? 440 : 180, 0.35);
}, 700);
})();
}).catch(function (e) { CW.busy = false; casMsg(esc(e.message)); });
},
function (side, bet) {
function card() { return 1 + Math.floor(Math.random() * 13); }
function v(c) { return Math.min(c, 10) % 10; }
var c = [card(), card(), card(), card(), card(), card()], pc = [c[0], c[2]], bc = [c[1], c[3]], p = (v(c[0]) + v(c[2])) % 10, b = (v(c[1]) + v(c[3])) % 10;
if (p < 8 && b < 8) {
var b3 = false;
if (p <= 5) {
pc.push(c[4]);
var p3 = v(c[4]);
p = (p + p3) % 10;
b3 = b <= 2 ? true : b === 3 ? p3 !== 8 : b === 4 ? (p3 >= 2 && p3 <= 7) : b === 5 ? (p3 >= 4 && p3 <= 7) : b === 6 ? (p3 >= 6 && p3 <= 7) : false;
}
else
b3 = b <= 5;
if (b3) {
bc.push(c[5]);
b = (b + v(c[5])) % 10;
}
}
var won = p > b ? "player" : b > p ? "banker" : "tie";
var pay = side === won ? (won === "player" ? bet * 2 : won === "banker" ? bet + Math.floor(bet * 0.95) : bet * 9) : (won === "tie" ? bet : 0);
CAS.pchips += -bet + pay;
return { ok: true, player: pc, banker: bc, p: p, b: b, won: won, win: pay > bet, push: pay === bet, payout: pay };
},
function () {
var html = casHead("Baccarat", "The hand nearer 9 wins; the cards are drawn by the house rules, not by you. <b>Player</b> pays even money, <b>banker</b> pays 19 to 20, a <b>tie</b> pays 8 to 1 (and hands player and banker bets back). Smallest bet in the Salon: 100 chips.") +
casBetInput("cas-bet", Math.max(100, CAS.min)) + "<div id='cw-hands'></div>" + worldBtn("player", "Player", "Even money") + worldBtn("banker", "Banker", "19 to 20") + worldBtn("tie", "Tie", "8 to 1") + "<div id='cas-msg'></div>";
worldCard(html, { player: function () { cwDeal("player"); }, banker: function () { cwDeal("banker"); }, tie: function () { cwDeal("tie"); } });
},
function (side) {
if (CW.busy || CAS.busy)
return;
var bet = casBet("cas-bet");
if (bet < 100)
return casMsg("The Salon's smallest bet is 100 chips.");
var bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
CW.busy = true;
casMsg("<i>The dealer slides the cards from the shoe…</i>");
var p = CAS.practice ? Promise.resolve(cwBacLocal(side, bet)) : casRpc("casino_baccarat", { p_bet: bet, p_side: side });
p.then(function (o) {
setTimeout(function () {
CW.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The dealer waves the bet away."));
casPaid(o);
cwBaccarat();
var bi = document.getElementById("cas-bet");
if (bi)
bi.value = bet;
function show(cs, seed) { return (cs || []).map(function (r, i) { return casCard(((seed + i * 7) % 4) * 13 + (r - 1)); }).join(""); }
var el = document.getElementById("cw-hands");
if (el)
el.innerHTML = "<div><b>Player</b> (" + o.p + ")<br>" + show(o.player, 1) + "</div><div style='margin-top:4px'><b>Banker</b> (" + o.b + ")<br>" + show(o.banker, 2) + "</div>";
casMsg("<b>" + (o.won === "tie" ? "A tie." : o.won === "player" ? "Player wins." : "Banker wins.") + "</b> " + (o.push ? "Your chips come back." : o.win ? "<b style='color:#FFE7B0'>You win " + o.payout + " chips.</b>" : "The dealer takes your chips."));
if (typeof playTone === "function")
playTone(o.win ? 660 : 180, 0.35);
}, 1400);
}).catch(function (e) { CW.busy = false; casMsg(esc(e.message)); });
},
function () {
var html = casHead("The Big Six wheel", "Put your chips on a number and the wheel is spun. It pays what the number says: 1 to 1, 2 to 1, 5, 10, 20, and 40 to 1 on the crescent. Of the 54 places, 25 are ones and only one is the crescent.") +
casBetInput("cas-bet") + "<div style='display:flex;flex-wrap:wrap;gap:4px'>" + [1, 2, 5, 10, 20, 40].map(function (v) { return worldBtn("w" + v, v === 40 ? "☾ 40" : String(v), v + " to 1"); }).join("") + "</div><div id='cas-msg'></div>";
var f = {};
[1, 2, 5, 10, 20, 40].forEach(function (v) { f["w" + v] = function () { cwSpinWheel(v); }; });
worldCard(html, f);
},
function (pick) {
if (CW.busy || CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
CW.busy = true;
casMsg("<i>The attendant spins the wheel…</i>");
var p = CAS.practice ? Promise.resolve(cwWheelLocal(pick, bet)) : casRpc("casino_wheel", { p_bet: bet, p_pick: pick });
p.then(function (o) {
if (!o || !o.ok) {
CW.busy = false;
return casMsg(esc((o && o.say) || "The attendant waves the bet away."));
}
var W = CW.wheel, n = CW_WHEEL.length;
if (W) {
var cur = W.a, want = (o.seg / n) * Math.PI * 2, d = ((want - cur) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
W.from = cur;
W.to = cur + Math.PI * 2 * 3 + d;
W.t = 0;
W.dur = 5;
W.start = performance.now();
}
setTimeout(function () {
CW.busy = false;
casPaid(o);
cwWheel();
var bi = document.getElementById("cas-bet");
if (bi)
bi.value = bet;
casMsg("The clapper stops on <b>" + (o.value === 40 ? "the crescent" : o.value) + "</b>. " + (o.win ? "<b style='color:#FFE7B0'>You win " + o.payout + " chips.</b>" : "Not this time."));
if (typeof playTone === "function")
playTone(o.win ? 700 : 200, 0.35);
}, 5200);
}).catch(function (e) { CW.busy = false; casMsg(esc(e.message)); });
},
function (dt) {
var W = CW.wheel;
if (W && W.t < 1) {
W.t = Math.min(1, (performance.now() - (W.start || 0)) / 1000 / W.dur);
var e = 1 - Math.pow(1 - W.t, 3);
W.a = W.from + (W.to - W.from) * e;
W.disc.rotation.z = W.a;
}
var ok = cwBadge();
CW.doors.forEach(function (d) { if (d.home == null)
d.home = d.m.position[d.axis]; var t = d.home + (ok ? d.to : 0); d.m.position[d.axis] += (t - d.m.position[d.axis]) * Math.min(1, dt * 3); });
if (CW.earth)
CW.earth.rotation.y += dt * 0.03;
},
function (G) {
if (!(typeof LITE !== "undefined" && LITE) || typeof ppBake !== "function")
return;
if (typeof CAS !== "undefined")
cwKeep(CAS, 0);
CW.doors.forEach(function (q) { cwKeep(q.m, 0); });
cwKeep(CW.wheel, 0);
cwKeep(CW.earth, 0);
G.traverse(function (o) { if (!o.visible)
o.userData.keep = 1; });
ppBake(G, 16);
}
];
});
