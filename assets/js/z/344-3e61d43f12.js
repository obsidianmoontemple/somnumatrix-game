/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(344, function () {
return [
function (color, o) {
o = o || {};
var m = vcpLite() || o.flat ? new THREE.MeshLambertMaterial({ color: color }) : new THREE.MeshStandardMaterial({ color: color, roughness: o.r != null ? o.r : 0.75, metalness: o.m || 0 });
if (o.map) {
m.map = o.map;
}
if (o.e != null) {
m.emissive = new THREE.Color(o.e);
if (m.emissiveIntensity !== undefined)
m.emissiveIntensity = o.ei != null ? o.ei : 1;
}
else if (o.lit) {
m.emissive = new THREE.Color(color).multiplyScalar(o.lit);
}
if (o.op != null) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.side)
m.side = o.side;
return m;
},
function (kind) {
if (VCP_GRAIN[kind])
return VCP_GRAIN[kind];
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#fff";
x.fillRect(0, 0, 128, 128);
var s = 7;
function r() { s = (s * 16807) % 2147483647; return s / 2147483647; }
if (kind === "wood") {
for (var i = 0; i < 128; i++) {
var v = 200 + Math.round(40 * Math.sin(i * 0.35 + Math.sin(i * 0.07) * 4) + r() * 14);
x.fillStyle = "rgb(" + v + "," + v + "," + v + ")";
x.fillRect(0, i, 128, 1);
}
}
else if (kind === "carbon") {
for (var a = 0; a < 128; a += 8)
for (var b = 0; b < 128; b += 8) {
var on = ((a + b) / 8) % 2;
x.fillStyle = on ? "#d8d8d8" : "#9a9a9a";
x.fillRect(a, b, 8, 8);
x.fillStyle = on ? "#efefef" : "#b5b5b5";
x.fillRect(a + 1, b + 1, on ? 6 : 2, on ? 2 : 6);
}
}
else {
for (var k = 0; k < 2600; k++) {
var g = 200 + Math.round(r() * 55);
x.fillStyle = "rgb(" + g + "," + g + "," + g + ")";
x.fillRect(r() * 128, r() * 128, 1 + r() * 2, 1 + r() * 2);
}
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(kind === "carbon" ? 6 : 3, kind === "carbon" ? 6 : 3);
VCP_GRAIN[kind] = t;
return t;
},
function (w, h, r) {
var s = new THREE.Shape(), x = -w / 2, y = -h / 2;
r = Math.max(0.0005, Math.min(r, w / 2, h / 2));
s.moveTo(x + r, y);
s.lineTo(x + w - r, y);
s.quadraticCurveTo(x + w, y, x + w, y + r);
s.lineTo(x + w, y + h - r);
s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
s.lineTo(x + r, y + h);
s.quadraticCurveTo(x, y + h, x, y + h - r);
s.lineTo(x, y + r);
s.quadraticCurveTo(x, y, x + r, y);
return s;
},
function (g, w, h, d, r, mat, x, y, z, rx, ry, rz) {
if (vcpLite())
return vcpBox(g, w, h, d, mat, x, y, z, rx, ry, rz);
var b = Math.min(r * 0.6, d * 0.4, w * 0.25, h * 0.25), geo = new THREE.ExtrudeGeometry(vcpRR(w - 2 * b, h - 2 * b, Math.max(0.0005, r - b)), { depth: Math.max(0.0005, d - 2 * b), bevelEnabled: b > 0.0005, bevelThickness: b, bevelSize: b, bevelSegments: 2, curveSegments: 3 });
geo.translate(0, 0, -(d - 2 * b) / 2);
var m = new THREE.Mesh(geo, mat);
m.position.set(x || 0, y || 0, z || 0);
if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
g.add(m);
return m;
},
function (g, a, b, w, d, mat, round) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.hypot(dx, dy, dz) || 0.001;
var geo = round ? new THREE.CylinderGeometry(w / 2, w / 2, L, vcpLite() ? 6 : 10) : new THREE.BoxGeometry(w, L, d);
var m = new THREE.Mesh(geo, mat);
m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
m.quaternion.setFromUnitVectors(VCP_UP, new THREE.Vector3(dx / L, dy / L, dz / L));
g.add(m);
return m;
},
function (g, p, mat) {
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute([].concat(p[0], p[1], p[2], p[0], p[2], p[3]), 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2));
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, mat);
g.add(m);
return m;
},
function (g, pts, x0, x1, mat) {
var s = new THREE.Shape();
s.moveTo(pts[0][0], pts[0][1]);
for (var i = 1; i < pts.length; i++) {
var p = pts[i];
if (p.length === 4)
s.quadraticCurveTo(p[0], p[1], p[2], p[3]);
else
s.lineTo(p[0], p[1]);
}
var geo = new THREE.ExtrudeGeometry(s, { depth: x1 - x0, bevelEnabled: false, curveSegments: vcpLite() ? 3 : 8 });
var m = new THREE.Mesh(geo, mat);
m.rotation.y = Math.PI / 2;
m.position.x = x0;
g.add(m);
return m;
},
function (arch) {
if (!arch)
return null;
if (typeof pyIsCar === "function" && pyIsCar(arch))
return "race";
var map = { car: "car", coupe: "coupe", roadster: "roadster", sportscar: "sport", limousine: "limo", taxicab: "cab", vintagecar: "vintage", van: "van",
hovercar: "hover", truck: "truck", bus: "bus", omnibus: "omnibus", tractor: "tractor", tram: "tram", motorbike: "moto", scooter: "scooter",
carriage: "reins", hansomcab: "reins", wagon: "reins", cart: "reins",
dragon: "saddle", pegasus: "saddle", griffin: "saddle", hippogriff: "saddle", broomstick: null, flyingcarpet: null,
airship: "airship", saucer: "saucer", sleigh: "sleigh", firechariot: "chariot" };
if (map.hasOwnProperty(arch))
return map[arch];
var V = typeof VEH !== "undefined" ? VEH[arch] : null;
if (V)
return ({ car: "car", bus: "bus", tram: "tram", carriage: "reins", moto: "moto" })[V.c] || "car";
return null;
},
function () {
var D = DRIVE, S = D.mode === "road" && typeof vehSpec === "function" ? vehSpec(D.arch) : null;
var vmax = S ? S.vmax : ((typeof FLYER !== "undefined" && FLYER[D.arch]) || {}).vmax || 30;
return { mph: Math.abs(D.v) * 2.23694, vmaxMph: vmax * 2.23694, thr: D.thr || 0, brk: D.brk || 0, gear: D.gear || "N", ind: D.ind, steer: D.steer || 0,
limit: D.mode === "road" && D.road && D.road.mph ? D.road.mph : null, road: D.road && D.road.name ? D.road.name : "", heading: typeof bearingOfHeading === "function" ? bearingOfHeading(D.h) : 0,
alt: D.alt || 0, climb: D.climb || 0, fly: D.mode === "fly", next: D.test && D.test.active && D.test.next ? D.test.next : null, note: D.note || "", reverse: D.v < -0.2 };
},
function () {
var n = (typeof UGD_NOTCH !== "undefined" && UGD.notch != null) ? UGD_NOTCH[Math.max(0, Math.min(UGD_NOTCH.length - 1, UGD.notch + 5))] : "Off";
return { mph: Math.abs(UGD.v || 0) * 2.23694, vmaxMph: 50, thr: Math.max(0, UGD.notch || 0) / 4, brk: Math.max(0, -(UGD.notch || 0)) / 5, gear: n, notch: UGD.notch || 0, steer: 0,
limit: null, road: (typeof UG_RAIL_NAMES !== "undefined" && UG_RAIL_NAMES[UGD.d]) || "", heading: 0, doors: UGD.doors, state: UGD.state, next: null, note: "" };
},
function (px, pz, h, range, out) {
try {
if (typeof bwFoesForMe !== "function" || typeof WLD === "undefined" || WLD.on !== "battle")
return;
var list = bwFoesForMe(), best = null, bd = 1e9, c = Math.cos(h), s = Math.sin(h), bl = [];
list.forEach(function (q) {
var dx = q.x - px, dz = q.z - pz, d = Math.hypot(dx, dz);
if (d < bd) {
bd = d;
best = q;
}
if (d < range && bl.length < 40) {
var rx = dx * c - dz * s, fw = -(dx * s + dz * c);
bl.push([rx / range, -fw / range, false, q === best]);
}
});
out.blips = bl;
out.foes = list.length;
if (best && bd < range * 1.5)
out.target = { name: best.M ? best.M.T.name : best.F && best.F.k && best.F.k.name ? best.F.k.name : best.pvp ? "Dreamer" : "Foe", dist: bd };
}
catch (e) { }
},
function () {
var R = MM.ride, d = R.d, I = R.I || {}, h = (I.yaw != null ? I.yaw : 0);
var heavy = d.shot === "shell" || d.shot === "star2", mx = (heavy ? 1.1 : d.kind === "ship" ? 0.28 : 0.45) * 0.7;
var o = { mph: vcpMoveMph("mm", I.x || 0, I.z || 0), vmaxMph: Math.max(30, (d.spd || 4) * 2.23694 * 2.2), shield: (typeof mmHp === "function" && MM.shield != null) ? MM.shield / mmHp(d) : 1, hp: 1,
alt: R.alt || 0, climb: R.vz || 0, name: d.name, armed: typeof mmArmed === "function" ? mmArmed() : false, gun: d.gun || "Guns", charge: 1 - Math.max(0, R.shot || 0) / mx, thr: Math.min(1, (VCP_MV.mm ? VCP_MV.mm.v : 0) / Math.max(1, (d.spd || 4) * 2)) };
vcpBwRadar(typeof BW !== "undefined" ? (BW.base || 0) + (I.x || 0) : 0, I.z || 0, h, 160, o);
return o;
},
function () {
var M = BW.ride, T = M.T || {};
var o = { mph: vcpMoveMph("bw", M.x || 0, M.z || 0), vmaxMph: Math.max(15, (T.spd || 2) * 2.23694 * 3), hp: M.hp != null && T.hp ? M.hp / T.hp : 1, name: T.name || "", armed: true,
gun: T.gun || "Guns", charge: T.rideCool ? Math.max(0, 1 - Math.max(0, M.cool || 0) / T.rideCool) : 1, ammo: M.ammo != null ? M.ammo : null, thr: Math.min(1, (VCP_MV.bw ? VCP_MV.bw.v : 0) / Math.max(1, (T.spd || 2) * 1.5)) };
vcpBwRadar((BW.base || 0) + (M.x || 0), M.z || 0, M.yaw || 0, 160, o);
return o;
},
function () {
var best = null, br = 0;
try {
if (typeof rideG !== "undefined" && rideG)
rideG.traverse(function (o) {
if (!o.isMesh || !o.material || Array.isArray(o.material) || !o.material.color || o.material.transparent)
return;
if (!o.geometry.boundingSphere)
o.geometry.computeBoundingSphere();
var s = o.geometry.boundingSphere.radius * Math.max(o.scale.x, o.scale.y, o.scale.z);
if (s > br) {
br = s;
best = o.material.color;
}
});
}
catch (e) { }
return best ? best.getHex() : 0x7A1E22;
},
function (x, cx, cy, r, val, max, step, label, o) {
o = o || {};
var a0 = Math.PI * 0.75, sweep = Math.PI * 1.5;
x.save();
var gr = x.createRadialGradient(cx, cy - r * 0.3, r * 0.1, cx, cy, r);
gr.addColorStop(0, o.face2 || "#1C2027");
gr.addColorStop(1, o.face || "#0A0C10");
x.fillStyle = gr;
x.beginPath();
x.arc(cx, cy, r, 0, Math.PI * 2);
x.fill();
x.lineWidth = r * 0.06;
x.strokeStyle = o.bezel || "#8E959E";
x.stroke();
if (o.red) {
x.beginPath();
x.arc(cx, cy, r * 0.86, a0 + sweep * o.red, a0 + sweep);
x.lineWidth = r * 0.07;
x.strokeStyle = "#C0392B";
x.stroke();
}
x.fillStyle = o.ink || "#E8E4DA";
x.strokeStyle = o.ink || "#E8E4DA";
x.font = "600 " + Math.round(r * 0.17) + "px system-ui,sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
for (var v = 0; v <= max + 1e-6; v += step / 2) {
var big = Math.abs((v / step) - Math.round(v / step)) < 1e-6, a = a0 + sweep * v / max, c = Math.cos(a), s = Math.sin(a);
x.lineWidth = big ? r * 0.035 : r * 0.018;
x.beginPath();
x.moveTo(cx + c * r * 0.9, cy + s * r * 0.9);
x.lineTo(cx + c * r * (big ? 0.74 : 0.81), cy + s * r * (big ? 0.74 : 0.81));
x.stroke();
if (big)
x.fillText(String(Math.round(v * (o.mul || 1))), cx + c * r * 0.58, cy + s * r * 0.58);
}
if (label) {
x.font = "500 " + Math.round(r * 0.12) + "px system-ui,sans-serif";
x.fillStyle = o.dim || "#9AA0A8";
x.fillText(label, cx, cy + r * 0.36);
}
if (o.limit != null && o.limit <= max) {
var al = a0 + sweep * o.limit / max;
x.beginPath();
x.arc(cx, cy, r * 0.95, al - 0.04, al + 0.04);
x.lineWidth = r * 0.1;
x.strokeStyle = "#E8C27A";
x.stroke();
}
var an = a0 + sweep * Math.max(0, Math.min(1, val / max));
x.strokeStyle = o.needle || "#FF6A3D";
x.lineWidth = r * 0.05;
x.lineCap = "round";
x.beginPath();
x.moveTo(cx - Math.cos(an) * r * 0.12, cy - Math.sin(an) * r * 0.12);
x.lineTo(cx + Math.cos(an) * r * 0.82, cy + Math.sin(an) * r * 0.82);
x.stroke();
x.fillStyle = "#2A2E35";
x.beginPath();
x.arc(cx, cy, r * 0.1, 0, Math.PI * 2);
x.fill();
x.restore();
},
function (cv, R, style) {
var x = cv.x, W = cv.c.width, H = cv.c.height;
style = style || {};
x.clearRect(0, 0, W, H);
x.fillStyle = style.bg || "#07080B";
vcpRound(x, 0, 0, W, H, H * 0.18);
x.fill();
var r = H * 0.44, max = Math.max(40, Math.ceil(R.vmaxMph * 1.2 / 20) * 20), rpm = R.gear === "N" || R.gear === "P" ? 0.8 + R.thr * 2 : Math.min(7.2, 0.8 + (R.mph % 22) / 22 * 4.6 + R.thr * 1.4);
var ink = { ink: style.ink, face: style.face, face2: style.face2, bezel: style.bezel, needle: style.needle };
vcpDial(x, W * 0.2, H * 0.52, r, R.mph, max, max > 100 ? 20 : 10, "MPH", Object.assign({ limit: R.limit }, ink));
vcpDial(x, W * 0.8, H * 0.52, r, rpm, 8, 1, "×1000 r/min", Object.assign({ red: 0.78 }, ink));
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#0F1318";
vcpRound(x, W * 0.37, H * 0.14, W * 0.26, H * 0.72, 12);
x.fill();
x.fillStyle = style.digit || "#DDE7F2";
x.font = "300 " + Math.round(H * 0.27) + "px system-ui,sans-serif";
x.fillText(String(Math.round(R.mph)), W * 0.5, H * 0.38);
x.font = "600 " + Math.round(H * 0.07) + "px system-ui,sans-serif";
x.fillStyle = "#8D97A3";
x.fillText("MPH", W * 0.5, H * 0.54);
var gears = ["P", "R", "N", "D"], g = String(R.gear || "N").charAt(0);
x.font = "700 " + Math.round(H * 0.1) + "px system-ui,sans-serif";
gears.forEach(function (k, i) { x.fillStyle = k === g ? "#FFFFFF" : "#4C5560"; x.fillText(k, W * 0.44 + i * W * 0.04, H * 0.68); });
if (/^D\d/.test(String(R.gear))) {
x.font = "600 " + Math.round(H * 0.06) + "px system-ui,sans-serif";
x.fillStyle = "#8D97A3";
x.fillText(String(R.gear), W * 0.5, H * 0.79);
}
vcpArrow(x, W * 0.41, H * 0.08, -1, R.ind === "left", H * 0.05);
vcpArrow(x, W * 0.59, H * 0.08, 1, R.ind === "right", H * 0.05);
if (R.limit) {
x.fillStyle = "#F4F0E6";
x.beginPath();
x.arc(W * 0.5, H * 0.9, H * 0.07, 0, Math.PI * 2);
x.fill();
x.lineWidth = H * 0.018;
x.strokeStyle = "#C0392B";
x.stroke();
x.fillStyle = "#16171C";
x.font = "700 " + Math.round(H * 0.07) + "px system-ui,sans-serif";
x.fillText(String(R.limit), W * 0.5, H * 0.905);
}
VCP_ODO += R.mph / 3600 * 0.1;
x.font = "500 " + Math.round(H * 0.055) + "px system-ui,sans-serif";
x.fillStyle = "#7E8893";
x.textAlign = "left";
x.fillText("⛽", W * 0.05, H * 0.93);
x.fillStyle = "#3EA0E0";
x.fillRect(W * 0.085, H * 0.91, W * 0.1, H * 0.035);
x.textAlign = "right";
x.fillStyle = "#7E8893";
x.fillText(VCP_ODO.toFixed(1) + " mi", W * 0.96, H * 0.93);
cv.t.needsUpdate = true;
},
function (cv, R, style) {
var x = cv.x, W = cv.c.width, H = cv.c.height;
style = style || {};
var bg = x.createLinearGradient(0, 0, 0, H);
bg.addColorStop(0, style.top || "#0C1A2A");
bg.addColorStop(1, style.bot || "#050A12");
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(120,170,230,.25)";
x.lineWidth = 2;
x.strokeRect(1, 1, W - 2, H - 2);
x.textBaseline = "middle";
x.textAlign = "left";
var hr = typeof dreamHour === "function" ? dreamHour() : new Date().getHours(), hh = Math.floor(hr) % 24, mm = Math.floor((hr - Math.floor(hr)) * 60);
x.fillStyle = "#CFE0F4";
x.font = "600 " + Math.round(H * 0.11) + "px system-ui,sans-serif";
x.fillText((hh % 12 || 12) + ":" + (mm < 10 ? "0" : "") + mm + (hh < 12 ? " am" : " pm"), W * 0.05, H * 0.12);
x.textAlign = "right";
x.fillStyle = "#7FA7D0";
x.fillText(typeof compassWord === "function" ? compassWord(R.heading).toUpperCase() : "", W * 0.95, H * 0.12);
x.save();
x.translate(W * 0.2, H * 0.55);
x.fillStyle = "#3E7BD6";
x.beginPath();
x.arc(0, 0, H * 0.2, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#FFFFFF";
x.beginPath();
x.moveTo(0, -H * 0.13);
x.lineTo(H * 0.09, H * 0.1);
x.lineTo(0, H * 0.05);
x.lineTo(-H * 0.09, H * 0.1);
x.closePath();
x.fill();
x.restore();
x.textAlign = "left";
x.fillStyle = "#EAF2FB";
x.font = "600 " + Math.round(H * 0.1) + "px system-ui,sans-serif";
var road = String(R.road || (R.fly ? "In the air" : "Off the road"));
x.fillText(road.length > 22 ? road.slice(0, 21) + "…" : road, W * 0.38, H * 0.42);
x.fillStyle = "#9DB6CF";
x.font = "500 " + Math.round(H * 0.085) + "px system-ui,sans-serif";
var sub = R.next ? String(R.next).replace(/<[^>]*>/g, "") : (R.fly ? ("Altitude " + Math.round(R.alt * 3.28084) + " ft") : (R.limit ? "Limit " + R.limit + " mph" : "Drive safely"));
x.fillText(sub.length > 26 ? sub.slice(0, 25) + "…" : sub, W * 0.38, H * 0.6);
x.fillStyle = "#5E7894";
x.font = "500 " + Math.round(H * 0.075) + "px system-ui,sans-serif";
x.fillText(style.footer || "Somnucor Navigation", W * 0.38, H * 0.85);
cv.t.needsUpdate = true;
},
function (cv, R, labels) {
var x = cv.x, W = cv.c.width, H = cv.c.height;
x.clearRect(0, 0, W, H);
var n = labels.length, r = Math.min(H * 0.46, W / n * 0.44);
labels.forEach(function (L, i) {
var cx = W * (i + 0.5) / n, v = L.val(R);
vcpDial(x, cx, H * 0.5, r, v, L.max, L.step, L.label, { face: "#EFE6CF", face2: "#FFF8E6", ink: "#2A2118", dim: "#6A5A40", bezel: "#B8892E", needle: "#1A1A1A" });
});
cv.t.needsUpdate = true;
},
function (cv, R, style) {
var x = cv.x, W = cv.c.width, H = cv.c.height;
style = style || {};
x.clearRect(0, 0, W, H);
x.fillStyle = style.bg || "#06090E";
vcpRound(x, 0, 0, W, H, H * 0.12);
x.fill();
var r = H * 0.4, ink = { ink: style.ink || "#BFF6FF", face: style.face || "#041018", face2: style.face2 || "#0B2430", bezel: style.bezel || "#2BD3E6", needle: style.needle || "#FFE15A" };
vcpDial(x, W * 0.17, H * 0.5, r, R.mph, Math.max(40, Math.ceil(R.vmaxMph * 1.2 / 20) * 20), 20, "MPH", ink);
vcpDial(x, W * 0.5, H * 0.5, r, Math.max(0, R.alt * 3.28084), 1200, 200, "FEET", ink);
vcpDial(x, W * 0.83, H * 0.5, r, Math.max(-1, Math.min(1, (R.climb || 0) / 6)) + 1, 2, 0.5, "CLIMB", Object.assign({ mul: 1 }, ink));
x.textAlign = "center";
x.textBaseline = "middle";
x.font = "700 " + Math.round(H * 0.11) + "px system-ui,sans-serif";
x.fillStyle = style.ink || "#BFF6FF";
x.fillText(String(Math.round(R.mph || 0)), W * 0.17, H * 0.8);
x.fillText(String(Math.round(Math.max(0, (R.alt || 0) * 3.28084))), W * 0.5, H * 0.8);
cv.t.needsUpdate = true;
},
function (style) {
var S = Object.assign({ off: 0.38, hw: 0.86, ws: { bf: 0.86, by: -0.235, tf: 0.46, ty: 0.3 }, dash: 0x202329, trim: 0x3A3E46, seat: 0x1E1F24, wheelR: 0.185, tilt: 0.45, wheel: [0, -0.43, -0.42],
hood: { f0: 0.95, f1: 2.3, y0: -0.25, y1: -0.33 }, lift: 0.05 }, VCP_CAR[style] || {});
if (S.big && VCP_CAR[style].lift == null)
S.lift = 0;
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: true, style: style };
g.userData.vcp = U;
var C = S.off, L = C - S.hw, R = C + S.hw;
var mDash = vcpMat(S.dash, { map: S.carbon ? vcpGrain("carbon") : vcpGrain("soft"), r: 0.85, lit: 0.35 });
var mTrim = vcpMat(S.trim, { r: 0.6, m: 0.2, lit: 0.25 });
var mBlack = vcpMat(0x0C0D10, { r: 0.5 });
var mChrome = vcpMat(0xC8CCD2, { r: 0.25, m: 0.9 });
var mWood = S.wood ? vcpMat(S.wood, { map: vcpGrain("wood"), r: 0.35 }) : null;
var mBody = vcpMat(S.paint != null ? S.paint : (VCP.bodyCol != null ? VCP.bodyCol : 0x7A1E22), { r: 0.3, m: 0.45, side: THREE.DoubleSide });
var mPiano = vcpMat(0x08090B, { r: 0.15, m: 0.3 });
var mBlackDS = vcpMat(0x0C0D10, { r: 0.5, side: THREE.DoubleSide });
U.bodyMat = S.paint != null ? null : mBody;
var ws = S.ws;
var by = ws ? ws.by : -0.3, bf = ws ? ws.bf : 0.8;
if (S.big) {
vcpProfile(g, [[bf + 0.02, by - 0.01], [0.66, by - 0.02], [0.62, -1.0], [bf + 0.1, -1.0]], L + 0.04, R - 0.04, mDash);
by = S.cTop;
vcpProfile(g, [[0.9, by - 0.06], [0.76, by], [0.72, by - 0.01, 0.7, by - 0.05], [0.7, -1.0], [0.9, -1.0]], L + 0.06, C + 0.32, mDash);
}
else if (S.cluster !== "pod") {
vcpProfile(g, [[bf + 0.02, by - 0.005], [0.7, by + 0.004], [0.6, by + 0.012, 0.56, by - 0.022], [0.532, by - 0.06, 0.54, by - 0.12], [0.55, -0.44], [0.5, -0.48, 0.53, -0.56], [0.6, -0.74], [bf + 0.1, -0.74]], L + 0.03, R - 0.03, mDash);
if (!lite) {
vcpBox(g, R - L - 0.2, 0.0015, 0.0015, vcpMat(0x55585E, { r: 0.9 }), C, by + 0.0095, -0.63);
vcpBox(g, R - L - 0.5, 0.004, 0.03, mBlack, C, by + 0.002, -(bf - 0.05));
var gx = R - 0.33, gy = by - 0.27;
vcpBox(g, 0.4, 0.004, 0.004, mBlack, gx, gy + 0.09, -0.548);
vcpBox(g, 0.4, 0.004, 0.004, mBlack, gx, gy - 0.09, -0.552);
vcpBox(g, 0.004, 0.18, 0.004, mBlack, gx - 0.2, gy, -0.55);
vcpBox(g, 0.004, 0.18, 0.004, mBlack, gx + 0.2, gy, -0.55);
vcpSlab(g, 0.07, 0.018, 0.012, 0.006, mChrome, gx, gy + 0.06, -0.546);
}
vcpSlab(g, R - C - 0.25, 0.035, 0.014, 0.01, S.inlay != null ? vcpMat(S.inlay, { r: 0.35, m: 0.7, lit: 0.2 }) : (mWood || vcpMat(0x8E939A, { r: 0.35, m: 0.75, lit: 0.2 })), (C + 0.17 + R - 0.08) / 2, by - 0.15, -0.54);
}
if (mWood && S.cluster !== "pod" && !S.brass)
vcpBox(g, R - L - 0.12, 0.035, 0.02, mWood, C, by - 0.225, -0.515);
if (mWood && S.brass)
vcpBox(g, R - L - 0.08, 0.2, 0.012, mWood, C, by - 0.11, -0.518);
if (S.accent)
vcpBox(g, R - L - 0.12, 0.006, 0.01, vcpMat(S.accent, { e: S.accent, ei: 0.35 }), C, by - 0.25, -0.513);
if (S.glow)
vcpBox(g, R - L - 0.12, 0.006, 0.008, vcpGlow(S.glow), C, by - 0.03, -0.53);
var lite2 = lite ? 0.5 : 1;
if (S.cluster === "pod") {
U.cluster = vcpCanvas(Math.round(512 * lite2), Math.round(192 * lite2));
vcpBox(g, 0.34, 0.15, 0.1, mDash, 0, -0.33, -0.6, -0.25);
vcpFace(g, U.cluster, 0.3, 0.112, 0, -0.32, -0.548, -0.25);
}
else if (S.brass) {
U.brass = vcpCanvas(Math.round(512 * lite2), Math.round(170 * lite2));
vcpFace(g, U.brass, 0.36, 0.12, 0, by - 0.11, -0.512, -0.12);
}
else {
U.cluster = vcpCanvas(Math.round(640 * lite2), Math.round(220 * lite2));
if (S.big) {
vcpFace(g, U.cluster, 0.46, 0.16, 0, by + 0.02, -0.8, -0.75);
}
else {
vcpFace(g, U.cluster, 0.38, 0.13, 0, by - 0.075, -0.512, -0.18);
if (!lite)
[-0.114, 0.114].forEach(function (dx) {
vcpCyl(g, 0.061, 0.058, 0.05, vcpMat(0x0A0B0D, { r: 0.6, side: THREE.DoubleSide }), dx, by - 0.078, -0.528, Math.PI / 2 - 0.18).geometry = new THREE.CylinderGeometry(0.061, 0.058, 0.05, 28, 1, true);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.003, 6, 32), mChrome);
ring.position.set(dx, by - 0.077, -0.505);
ring.rotation.x = -0.18;
g.add(ring);
});
vcpProfile(g, [[0.62, by + 0.002], [0.5, by + 0.03, 0.49, by - 0.005], [0.495, by - 0.02], [0.6, by - 0.02]], -0.24, 0.24, mDash);
}
if (S.carbon)
vcpBox(g, 0.46, 0.004, 0.006, vcpMat(S.accent || 0xD3242C, { e: S.accent || 0xD3242C, ei: 0.4 }), 0, by - 0.018, -0.497);
}
U.style2 = { face: S.face, needle: S.needle };
if (S.cluster !== "pod") {
var sx = C + 0.02, sy = by - 0.09, sz = S.big ? -0.2 : 0;
if (S.brass) {
vcpCyl(g, 0.035, 0.035, 0.02, mChrome, sx, sy, -0.52, Math.PI / 2);
vcpCyl(g, 0.035, 0.035, 0.02, mChrome, sx + 0.12, sy, -0.52, Math.PI / 2);
}
else {
U.screen = vcpCanvas(Math.round(400 * lite2), Math.round(240 * lite2));
vcpSlab(g, 0.27, 0.17, 0.024, 0.018, mPiano, sx, sy, -0.523 + sz, 0, -0.14);
if (!S.big)
vcpSlab(g, 0.24, 0.2, 0.02, 0.02, mPiano, sx, sy - 0.17, -0.528, 0, -0.1);
if (!lite)
vcpSlab(g, 0.03, 0.022, 0.012, 0.005, vcpMat(0xB0281E, { r: 0.4, lit: 0.3 }), sx, sy - 0.1, -0.516, 0, -0.12);
vcpFace(g, U.screen, 0.23, 0.138, sx - 0.0015, sy, -0.509 + sz, 0, -0.14);
if (!lite) {
[-0.06, 0.06].forEach(function (dx) { vcpCyl(g, 0.022, 0.022, 0.025, mChrome, sx + dx, sy - 0.12, -0.52 + sz, Math.PI / 2); });
for (var i = 0; i < 5; i++)
vcpBox(g, 0.022, 0.012, 0.012, mBlack, sx - 0.06 + i * 0.03, sy - 0.16, -0.52 + sz);
}
}
(S.big ? [sx - 0.17, sx + 0.17, L + 0.16] : [L + 0.14, R - 0.14, sx - 0.17, sx + 0.17]).forEach(function (vx, vi) {
var round = !S.big && vi < 2, vz = -0.535;
if (round) {
vcpCyl(g, 0.045, 0.045, 0.02, mBlack, vx, by - 0.085, vz, Math.PI / 2);
if (!lite) {
var bz = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.005, 6, 28), mChrome);
bz.position.set(vx, by - 0.085, vz + 0.01);
g.add(bz);
for (var k2 = -1; k2 <= 1; k2++)
vcpBox(g, 0.08, 0.004, 0.012, mTrim, vx, by - 0.085 + k2 * 0.018, vz + 0.006);
}
}
else {
vcpSlab(g, 0.12, 0.05, 0.022, 0.012, mBlack, vx, by - 0.08, vz);
if (!lite) {
vcpSlab(g, 0.125, 0.055, 0.008, 0.014, mChrome, vx, by - 0.08, vz + 0.003).scale.set(1, 1, 0.5);
for (var k = 0; k < 4; k++)
vcpBox(g, 0.105, 0.004, 0.014, mTrim, vx, by - 0.098 + k * 0.012, vz + 0.008);
}
}
});
if (!S.big)
vcpBox(g, 0.36, 0.004, 0.004, mTrim, R - 0.3, by - 0.2, -0.512);
}
var wp = S.wheel, col = new THREE.Group();
col.position.set(wp[0], wp[1], wp[2]);
col.rotation.x = S.tilt;
g.add(col);
var wheel = new THREE.Group();
col.add(wheel);
U.wheel = wheel;
var mGrip = vcpMat(S.yoke ? 0x1A1C22 : 0x17181B, { map: vcpGrain("soft"), r: 0.55 });
if (S.yoke) {
vcpSlab(wheel, 0.32, 0.035, 0.045, 0.016, mGrip, 0, 0.0, 0);
vcpSlab(wheel, 0.045, 0.15, 0.05, 0.02, mGrip, -0.155, 0.05, 0);
vcpSlab(wheel, 0.045, 0.15, 0.05, 0.02, mGrip, 0.155, 0.05, 0);
vcpSlab(wheel, 0.1, 0.07, 0.05, 0.02, vcpMat(0x0C0E14, { e: S.glow || 0x3FD6FF, ei: 0.25 }), 0, 0, 0);
}
else if (S.brass || S.spokes) {
var rimB = new THREE.Mesh(new THREE.TorusGeometry(S.wheelR, S.brass ? 0.013 : 0.02, lite ? 6 : 10, lite ? 20 : 40), S.brass ? (mWood || mGrip) : mGrip);
wheel.add(rimB);
var nsp = S.spokes || 3, mSp = S.brass ? mChrome : mTrim;
for (var sb = 0; sb < nsp; sb++) {
var ab = (sb / nsp) * Math.PI * 2 + Math.PI / 4;
vcpBeam(wheel, [0, 0, 0], [Math.cos(ab) * S.wheelR, Math.sin(ab) * S.wheelR, 0], S.brass ? 0.012 : 0.03, 0.012, mSp, !!S.brass);
}
vcpCyl(wheel, 0.05, 0.055, 0.04, S.brass ? mChrome : mBlack, 0, 0, 0.012, Math.PI / 2);
}
else {
var WR = S.wheelR, tb = S.big ? 0.022 : 0.02;
wheel.add(new THREE.Mesh(new THREE.TorusGeometry(WR, tb, lite ? 6 : 12, lite ? 24 : 56), mGrip));
if (!lite)
[0, Math.PI].forEach(function (a) { var gr = new THREE.Mesh(new THREE.TorusGeometry(WR, tb * 1.28, 10, 16, 0.9), mGrip); gr.rotation.z = a - 0.45; wheel.add(gr); });
var mSpoke = vcpMat(S.spoke || 0x2B2D32, { r: 0.45, m: 0.35, lit: 0.15 });
[[-1, -0.1], [1, -0.1]].forEach(function (sp) {
var sx2 = sp[0] * WR * 0.55;
vcpSlab(wheel, WR * 0.86, 0.05, 0.018, 0.012, mSpoke, sx2, -0.012, 0.004);
if (!lite)
for (var bi = 0; bi < 3; bi++)
vcpSlab(wheel, 0.016, 0.013, 0.008, 0.004, mBlack, sx2 + sp[0] * (-0.03 + bi * 0.022), 0.0, 0.016);
});
[-0.32, 0.32].forEach(function (da) { var a2 = -Math.PI / 2 + da; vcpBeam(wheel, [da * 0.08, -0.04, 0.004], [Math.cos(a2) * WR, Math.sin(a2) * WR, 0], 0.026, 0.014, mSpoke); });
vcpSlab(wheel, S.big ? 0.16 : 0.14, S.big ? 0.12 : 0.105, 0.05, 0.04, vcpMat(0x121316, { map: vcpGrain("soft"), r: 0.75 }), 0, -0.004, 0.022);
if (!lite) {
var badge = vcpCyl(wheel, 0.016, 0.016, 0.004, S.accent ? vcpMat(S.accent, { r: 0.3, m: 0.6 }) : mChrome, 0, 0.0, 0.05, Math.PI / 2);
badge.scale.x = 1.6;
}
if (S.carbon)
vcpSlab(wheel, 0.02, 0.022, 0.03, 0.006, vcpMat(S.accent || 0xD3242C, { e: S.accent, ei: 0.2 }), 0, WR, 0);
}
if (S.big)
vcpCyl(col, 0.055, 0.04, 0.7, mBlack, 0, -0.35, -0.02, 0);
else
vcpSlab(col, 0.09, 0.085, 0.22, 0.03, mDash, 0, -0.01, -0.13);
vcpBeam(col, [-0.04, 0.0, -0.06], [-0.19, 0.01, -0.03], 0.012, 0.012, mBlack, true);
vcpBeam(col, [0.04, 0.0, -0.06], [0.19, 0.01, -0.03], 0.012, 0.012, mBlack, true);
if (!lite) {
vcpBall(col, 0.011, mBlack, -0.19, 0.01, -0.03, 1.6, 1, 1);
vcpBall(col, 0.011, mBlack, 0.19, 0.01, -0.03, 1.6, 1, 1);
}
var mHead = vcpMat(S.head || 0x8E8A82, { map: vcpGrain("soft"), r: 0.95, side: THREE.DoubleSide, lit: 0.2 });
if (ws) {
var bw = S.hw - 0.06, tw = S.hw - 0.14;
var BL = [C - bw, ws.by, -ws.bf], BR = [C + bw, ws.by, -ws.bf], TL = [C - tw, ws.ty, -ws.tf], TR = [C + tw, ws.ty, -ws.tf];
var mPillar = S.open ? mChrome : (S.big ? mTrim : mHead), pw = S.open ? 0.03 : S.big ? 0.05 : 0.085;
[vcpBeam(g, BL, TL, pw, 0.05, mPillar, true), vcpBeam(g, BR, TR, pw, 0.05, mPillar, true)].forEach(function (m) { if (!S.open)
m.scale.z = 0.55; });
vcpBeam(g, TL, TR, S.open ? 0.03 : 0.06, S.open ? 0.03 : 0.06, S.open ? mChrome : mHead, S.open);
if (!lite) {
vcpQuad(g, [BL, BR, TR, TL], vcpMat(0xBFD8E8, { op: 0.05, flat: true, side: THREE.DoubleSide }));
if (!S.open) {
var k = 0.16;
vcpQuad(g, [[TL[0] + (BL[0] - TL[0]) * k, TL[1] + (BL[1] - TL[1]) * k, TL[2] + (BL[2] - TL[2]) * k], [TR[0] + (BR[0] - TR[0]) * k, TR[1] + (BR[1] - TR[1]) * k, TR[2] + (BR[2] - TR[2]) * k], TR, TL], vcpMat(0x3A5A78, { op: 0.22, flat: true, side: THREE.DoubleSide }));
}
}
if (!S.open) {
vcpQuad(g, [[C - tw, ws.ty + 0.03, -ws.tf], [C + tw, ws.ty + 0.03, -ws.tf], [C + S.hw - 0.06, ws.ty + 0.05, 0.9], [C - S.hw + 0.06, ws.ty + 0.05, 0.9]], mHead);
vcpBeam(g, TL, [C - S.hw + 0.04, ws.ty + 0.03, 0.6], 0.05, 0.05, mHead);
vcpBeam(g, TR, [C + S.hw - 0.04, ws.ty + 0.03, 0.6], 0.05, 0.05, mHead);
vcpBeam(g, [C - S.hw + 0.02, ws.by, 0.35], [C - S.hw + 0.04, ws.ty + 0.02, 0.3], 0.08, 0.14, mHead);
vcpBeam(g, [C + S.hw - 0.02, ws.by, 0.35], [C + S.hw - 0.04, ws.ty + 0.02, 0.3], 0.08, 0.14, mHead);
vcpBeam(g, [C - 0.1, ws.ty + 0.03, -ws.tf + 0.05], [C - 0.1, ws.ty - 0.05, -ws.tf + 0.07], 0.018, 0.018, mBlack, true);
vcpSlab(g, 0.27, 0.075, 0.035, 0.03, mBlack, C - 0.1, ws.ty - 0.09, -ws.tf + 0.08, 0.08, -0.2);
vcpSlab(g, 0.25, 0.06, 0.006, 0.026, vcpMat(0x7C8EA2, { r: 0.05, m: 0.9, lit: 0.25 }), C - 0.1 - 0.004, ws.ty - 0.089, -ws.tf + 0.097, 0.08, -0.2);
var mVis = vcpMat(S.head ? S.head : 0x8E8A82, { map: vcpGrain("soft"), r: 0.95, lit: 0.15 });
[[-0.02, 1], [2 * C + 0.02, -1]].forEach(function (v) { vcpSlab(g, 0.4, 0.16, 0.025, 0.03, mVis, v[0], ws.ty - 0.005, -ws.tf + 0.15, -1.42, 0, 0); if (!lite)
vcpCyl(g, 0.008, 0.008, 0.05, mBlack, v[0] + v[1] * 0.2, ws.ty + 0.01, -ws.tf + 0.08, 0, 0, Math.PI / 2); });
if (!lite) {
vcpSlab(g, 0.32, 0.035, 0.16, 0.02, mTrim, C + 0.06, ws.ty + 0.01, -ws.tf + 0.2);
[-0.08, 0.08].forEach(function (dx) { vcpSlab(g, 0.07, 0.006, 0.05, 0.01, vcpMat(0xD8D2C4, { r: 0.3, lit: 0.3 }), C + 0.06 + dx, ws.ty - 0.008, -ws.tf + 0.2); });
}
var mSide = vcpMat(0xA8C4D8, { op: 0.07, flat: true, side: THREE.DoubleSide });
[[L + 0.02, 1], [R - 0.02, -1]].forEach(function (d) {
var z0 = -ws.bf + 0.28, z1 = 0.34, xi = d[0] + d[1] * 0.07;
if (!lite)
vcpQuad(g, [[d[0], ws.by, z0], [d[0], ws.by, z1], [xi, ws.ty + 0.02, z1 - 0.02], [xi, ws.ty + 0.02, -ws.tf + 0.08]], mSide);
vcpBeam(g, [xi, ws.ty + 0.02, -ws.tf + 0.08], [xi, ws.ty + 0.02, z1], 0.03, 0.03, mTrim);
});
}
var mDoor = vcpMat(S.big ? 0x3A3D44 : (S.door != null ? S.door : (S.seat === 0xD9CBB0 ? 0xBFAE90 : 0x2A2C31)), { map: vcpGrain("soft"), r: 0.85, lit: 0.3 });
var mDoor2 = vcpMat(S.big ? 0x2C2F35 : (S.seat === 0xD9CBB0 ? 0xA89878 : (S.door2 != null ? S.door2 : 0x45474D)), { map: vcpGrain("soft"), r: 0.9, lit: 0.25 });
[[L + 0.02, 1], [R - 0.02, -1]].forEach(function (d) {
var dx = d[0], sd = d[1], top = ws.by;
vcpSlab(g, 1.4, 0.62, 0.07, 0.06, mDoor, dx, top - 0.31, -0.15, 0, Math.PI / 2, 0);
vcpSlab(g, 1.4, 0.05, 0.13, 0.022, mWood || mDoor2, dx + sd * 0.03, top - 0.01, -0.15, 0, Math.PI / 2, 0);
vcpSlab(g, 0.85, 0.2, 0.02, 0.04, mDoor2, dx + sd * 0.04, top - 0.17, -0.2, 0, Math.PI / 2, 0);
vcpSlab(g, 0.55, 0.055, 0.11, 0.025, mDoor2, dx + sd * 0.07, top - 0.3, 0.0, 0, Math.PI / 2, 0);
vcpSlab(g, 0.09, 0.035, 0.016, 0.012, mChrome, dx + sd * 0.05, top - 0.12, -0.43, 0, Math.PI / 2, 0);
if (!lite) {
vcpCyl(g, 0.075, 0.075, 0.012, mBlack, dx + sd * 0.04, top - 0.48, -0.45, 0, 0, Math.PI / 2);
vcpCyl(g, 0.06, 0.06, 0.014, vcpMat(0x2E3036, { r: 0.9 }), dx + sd * 0.045, top - 0.48, -0.45, 0, 0, Math.PI / 2);
if (sd > 0)
for (var ws2 = 0; ws2 < 2; ws2++)
vcpSlab(g, 0.025, 0.012, 0.035, 0.006, mBlack, dx + sd * 0.08, top - 0.27, -0.12 + ws2 * 0.05);
}
});
var mo = S.big ? 0.32 : 0.2, my = S.big ? ws.by + 0.42 : ws.by + 0.07, mz = S.big ? -ws.bf + 0.02 : -ws.bf + 0.2, mh = S.big ? 0.3 : 0.1, mw = S.big ? 0.2 : 0.17;
var mGlass = vcpMat(0x8FA6BC, { r: 0.05, m: 0.9, lit: 0.25 });
[[L - mo, -1], [R + mo, 1]].forEach(function (m) {
vcpSlab(g, mw, mh, 0.07, 0.035, S.big ? mBlack : mBody, m[0], my, mz - 0.03);
vcpSlab(g, mw - 0.025, mh - 0.025, 0.006, 0.028, mGlass, m[0], my, mz + 0.006);
vcpBeam(g, [m[0] - m[1] * mw * 0.4, my - mh * 0.3, mz - 0.04], [m[0] - m[1] * (mo + 0.04), ws.by + (S.big ? 0.3 : 0), mz - 0.08], 0.026, 0.026, mBlack);
});
[[C - 0.55, C - 0.04], [C + 0.08, C + 0.62]].forEach(function (w) {
vcpBeam(g, [w[0], ws.by + 0.004, -ws.bf - 0.03], [w[1], ws.by + 0.026, -ws.bf - 0.065], 0.014, 0.008, mBlack);
vcpBeam(g, [w[0] + 0.06, ws.by - 0.01, -ws.bf - 0.02], [(w[0] + w[1]) / 2, ws.by + 0.012, -ws.bf - 0.05], 0.012, 0.012, mBlack);
});
}
if (S.hood) {
var H = S.hood, hw = H.hw || S.hw - 0.05, crown = H.crown != null ? H.crown : 0.035;
var nx = lite ? 4 : 12, nz = lite ? 2 : 6, hp = [], huv = [], hix = [];
for (var j = 0; j <= nz; j++)
for (var i = 0; i <= nx; i++) {
var u = i / nx * 2 - 1, v = j / nz, au = Math.abs(u);
var hwv = H.box ? hw : hw - 0.06 - v * 0.12;
var y = H.y0 + (H.y1 - H.y0) * v + crown * (1 - u * u) - (au > 0.82 ? (au - 0.82) * 0.5 : 0) + (!lite && Math.abs(au - 0.42) < 0.08 ? 0.008 * (1 - Math.abs(au - 0.42) / 0.08) : 0);
var f = H.f0 + (H.f1 - H.f0) * v - (H.box ? 0 : 0.18 * Math.pow(au, 4) * v * v);
hp.push(C + u * hwv, y, -f);
huv.push(i / nx, v);
}
for (var j2 = 0; j2 < nz; j2++)
for (var i2 = 0; i2 < nx; i2++) {
var a0 = j2 * (nx + 1) + i2, a1 = a0 + 1, b0 = a0 + nx + 1, b1 = b0 + 1;
hix.push(a0, a1, b0, a1, b1, b0);
}
var hg = new THREE.BufferGeometry();
hg.setAttribute("position", new THREE.Float32BufferAttribute(hp, 3));
hg.setAttribute("uv", new THREE.Float32BufferAttribute(huv, 2));
hg.setIndex(hix);
hg.computeVertexNormals();
g.add(new THREE.Mesh(hg, mBody));
if (style === "vintage")
vcpCyl(g, 0.03, 0.04, 0.08, mChrome, C, H.y1 + 0.04, -H.f1 + 0.05);
}
var mSeat = vcpMat(S.seat, { map: vcpGrain("soft"), r: 0.9, lit: 0.2 });
var mSeat2 = vcpMat(new THREE.Color(S.seat).multiplyScalar(0.72).getHex(), { map: vcpGrain("soft"), r: 0.95, lit: 0.2 });
if (!S.big && S.cluster !== "pod") {
var px = 2 * C;
vcpSlab(g, 0.26, 0.32, 0.36, 0.05, mDash, C, -0.64, -0.36);
vcpSlab(g, 0.22, 0.2, 0.8, 0.05, mDash, C, -0.74, 0.05);
vcpSlab(g, 0.16, 0.012, 0.2, 0.02, mPiano, C, -0.635, -0.12);
vcpCyl(g, 0.045, 0.02, 0.07, mBlack, C, -0.6, -0.14);
vcpBall(g, 0.03, S.brass ? mWood || mChrome : vcpMat(0x1A1B1F, { map: vcpGrain("soft"), r: 0.5 }), C, -0.555, -0.14, 1, 1.15, 1);
if (!lite) {
vcpCyl(g, 0.032, 0.032, 0.03, mBlack, C - 0.04, -0.635, 0.04);
vcpCyl(g, 0.032, 0.032, 0.03, mBlack, C + 0.04, -0.635, 0.04);
}
vcpSlab(g, 0.2, 0.06, 0.32, 0.03, mSeat2, C, -0.62, 0.32);
vcpSlab(g, 0.52, 0.14, 0.52, 0.06, mSeat, px, -0.7, 0.15, 0.08);
vcpSlab(g, 0.5, 0.62, 0.13, 0.07, mSeat, px, -0.34, 0.47, 0.14);
vcpSlab(g, 0.3, 0.5, 0.02, 0.04, mSeat2, px, -0.36, 0.4, 0.14);
[-1, 1].forEach(function (sd) { vcpSlab(g, 0.09, 0.55, 0.17, 0.04, mSeat, px + sd * 0.235, -0.36, 0.44, 0.14, 0, sd * 0.08); });
vcpSlab(g, 0.27, 0.17, 0.1, 0.05, mSeat, px, 0.07, 0.51, 0.1);
if (!lite)
[-0.07, 0.07].forEach(function (dx) { vcpCyl(g, 0.007, 0.007, 0.07, mChrome, px + dx, -0.03, 0.5); });
vcpBeam(g, [R - 0.07, ws ? ws.ty - 0.12 : 0.1, 0.33], [R - 0.09, -0.62, 0.38], 0.045, 0.006, vcpMat(0x2A2B2E, { r: 0.8 }));
vcpQuad(g, [[L, -0.98, -0.85], [R, -0.98, -0.85], [R, -0.98, 0.5], [L, -0.98, 0.5]], vcpMat(0x1A1A1C, { r: 1, side: THREE.DoubleSide }));
}
if (S.meter) {
vcpBox(g, 0.16, 0.07, 0.08, mBlack, C + 0.12, by + 0.03, -0.6);
U.meter = vcpCanvas(lite ? 128 : 256, lite ? 48 : 96);
vcpFace(g, U.meter, 0.145, 0.055, C + 0.12, by + 0.03, -0.559, 0, -0.1);
vcpBox(g, 0.2, 0.06, 0.02, vcpMat(0xF2C230, { e: 0xF2C230, ei: 0.2 }), C, ws.ty - 0.02, -ws.tf + 0.08);
}
if (S.fare) {
vcpBox(g, 0.22, 0.3, 0.2, vcpMat(0x50565E, { r: 0.4, m: 0.5 }), R - 0.35, -0.65, -0.3);
vcpBox(g, 0.16, 0.08, 0.01, vcpGlow(0x2B7A3A), R - 0.35, -0.55, -0.199);
for (var f = 0; f < 4; f++)
vcpCyl(g, 0.018, 0.018, 0.012, vcpMat([0xC03A2B, 0x2B8C3A, 0xE8C27A, 0x3A6AC0][f], { e: [0xC03A2B, 0x2B8C3A, 0xE8C27A, 0x3A6AC0][f], ei: 0.25 }), 0.3 + f * 0.05, by - 0.03, -0.56, Math.PI / 2);
}
if (S.rops) {
var mRops = vcpMat(0x2D6B2F, { r: 0.5, m: 0.3 });
vcpBeam(g, [-0.55, -1.2, 0.35], [-0.55, 0.55, 0.35], 0.06, 0.06, mRops);
vcpBeam(g, [0.55, -1.2, 0.35], [0.55, 0.55, 0.35], 0.06, 0.06, mRops);
vcpBeam(g, [-0.55, 0.55, 0.35], [0.55, 0.55, 0.35], 0.06, 0.06, mRops);
[-0.62, 0.62].forEach(function (fx) { vcpBox(g, 0.38, 0.04, 0.9, mRops, fx, -0.62, 0.1); });
vcpBox(g, 0.5, 0.6, 0.5, vcpMat(0x2D6B2F, { r: 0.5, m: 0.3 }), 0, -0.75, -0.55);
}
if (S.glow && ws) {
vcpBeam(g, [C - S.hw + 0.08, ws.by + 0.01, -ws.bf + 0.02], [C + S.hw - 0.08, ws.by + 0.01, -ws.bf + 0.02], 0.006, 0.006, vcpGlow(S.glow));
}
U.tick = function (dt, Rd) {
U.wheel.rotation.z = -(Rd.steer || 0) / 0.6 * 2.3;
};
U.paint = function (Rd) {
if (U.cluster)
vcpPaintCluster(U.cluster, Rd, { face: S.face, needle: S.needle });
if (U.brass)
vcpPaintBrass(U.brass, Rd, [{ label: "MPH", max: Math.max(30, Math.ceil(Rd.vmaxMph * 1.2 / 10) * 10), step: 10, val: function (r) { return r.mph; } },
{ label: "OIL", max: 8, step: 2, val: function (r) { return 3 + r.thr * 3; } }, { label: "AMPS", max: 6, step: 2, val: function () { return 3.2; } }]);
if (U.screen)
vcpPaintScreen(U.screen, Rd, { footer: style === "cab" ? "Somnucor Cabs · on duty" : style === "hover" ? "Hover Systems online" : "Somnucor Navigation" });
if (U.meter) {
var x = U.meter.x, W = U.meter.c.width, Hh = U.meter.c.height;
x.fillStyle = "#140404";
x.fillRect(0, 0, W, Hh);
x.fillStyle = "#FF3B2F";
x.font = "700 " + Math.round(Hh * 0.48) + "px monospace";
x.textAlign = "center";
x.textBaseline = "middle";
VCP.fare = (VCP.fare || 2.5) + Rd.mph / 3600 * 0.1 * 2.2;
x.fillText("$" + VCP.fare.toFixed(2), W / 2, Hh / 2);
U.meter.t.needsUpdate = true;
}
};
var outer = new THREE.Group();
g.position.y = S.lift;
g.position.z = S.big ? 0.04 : 0.07;
outer.add(g);
outer.userData.vcp = U;
return outer;
},
function (style) {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: true, style: style };
g.userData.vcp = U;
var scooter = style === "scooter", mBody = vcpMat(VCP.bodyCol != null ? VCP.bodyCol : 0x9A1C1C, { r: 0.3, m: 0.5 });
var mBlack = vcpMat(0x0E0F12, { r: 0.6 }), mChrome = vcpMat(0xC8CCD2, { r: 0.2, m: 0.9 }), mGrip = vcpMat(0x18191C, { map: vcpGrain("soft"), r: 0.9 });
if (scooter) {
vcpProfile(g, [[0.42, -1.6], [0.45, -0.7], [0.55, -0.52, 0.62, -0.5], [0.7, -0.5], [0.7, -1.6]], -0.22, 0.22, mBody);
vcpBox(g, 0.42, 0.03, 0.6, mBlack, 0, -1.6, -0.05);
}
else {
var tank = new THREE.Mesh(new THREE.SphereGeometry(0.2, lite ? 10 : 18, lite ? 8 : 12), mBody);
tank.scale.set(1.05, 0.62, 1.7);
tank.position.set(0, -0.72, -0.38);
g.add(tank);
vcpCyl(g, 0.04, 0.04, 0.02, mChrome, 0, -0.6, -0.42);
}
vcpBeam(g, [-0.09, -0.5, -0.62], [-0.1, -1.3, -0.95], 0.04, 0.04, mChrome, true);
vcpBeam(g, [0.09, -0.5, -0.62], [0.1, -1.3, -0.95], 0.04, 0.04, mChrome, true);
var guard = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.06, 6, 16, Math.PI * 0.7), mBody);
guard.rotation.y = Math.PI / 2;
guard.rotation.z = Math.PI * 0.2;
guard.position.set(0, -1.38, -1.0);
g.add(guard);
var bars = new THREE.Group();
bars.position.set(0, -0.44, -0.56);
g.add(bars);
U.wheel = bars;
vcpBeam(bars, [-0.36, 0.04, 0.1], [0.36, 0.04, 0.1], 0.026, 0.026, scooter ? mBody : mChrome, true);
vcpBeam(bars, [-0.36, 0.04, 0.1], [-0.27, 0.04, 0.08], 0.034, 0.034, mGrip, true);
vcpBeam(bars, [0.27, 0.04, 0.08], [0.36, 0.04, 0.1], 0.034, 0.034, mGrip, true);
vcpBeam(bars, [-0.24, 0.05, 0.06], [-0.36, 0.03, 0.0], 0.01, 0.01, mBlack, true);
vcpBeam(bars, [0.24, 0.05, 0.06], [0.36, 0.03, 0.0], 0.01, 0.01, mBlack, true);
U.cluster = vcpCanvas(lite ? 256 : 512, lite ? 96 : 192);
vcpCyl(bars, 0.1, 0.1, 0.06, mBlack, 0, 0.08, -0.02, Math.PI / 2 - 0.6);
vcpFace(bars, U.cluster, 0.21, 0.08, 0, 0.11, 0.01, -0.55);
[-1, 1].forEach(function (s) {
vcpBeam(bars, [s * 0.22, 0.05, 0.06], [s * 0.33, 0.17, 0.02], 0.01, 0.01, mChrome, true);
vcpCyl(bars, 0.032, 0.032, 0.02, mBlack, s * 0.34, 0.2, 0.02, Math.PI / 2);
vcpCyl(bars, 0.028, 0.028, 0.004, vcpMat(0x8FA6BC, { r: 0.05, m: 0.9, lit: 0.25 }), s * 0.34, 0.2, 0.032, Math.PI / 2);
});
if (!scooter)
vcpCyl(g, 0.085, 0.075, 0.06, mChrome, 0, -0.62, -0.82, Math.PI / 2);
U.tick = function (dt, R) { U.wheel.rotation.y = (R.steer || 0) * 0.6; };
U.paint = function (R) { vcpPaintCluster(U.cluster, R, {}); };
return g;
},
function (g, to, mat) {
var mL = mat || vcpMat(0x4A2E1A, { r: 0.8 });
[[-0.1, to[0]], [0.1, to[1]]].forEach(function (p) {
var mid = [(p[0] + p[1][0]) / 2, (-0.48 + p[1][1]) / 2 - 0.08, (-0.38 + p[1][2]) / 2];
vcpBeam(g, [p[0], -0.48, -0.38], mid, 0.012, 0.012, mL, true);
vcpBeam(g, mid, p[1], 0.012, 0.012, mL, true);
});
var mH = vcpMat(0x3A2A20, { r: 0.9 });
[-0.1, 0.1].forEach(function (x) { var h = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mH); h.scale.set(1, 0.8, 1.3); h.position.set(x, -0.48, -0.38); g.add(h); });
},
function (style) {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: false, style: style };
g.userData.vcp = U;
var mWood = vcpMat(0x5A3418, { map: vcpGrain("wood"), r: 0.5 }), mBrass = vcpMat(0xB8892E, { r: 0.3, m: 0.8 });
vcpBox(g, 1.3, 0.4, 0.05, mWood, 0, -0.6, -0.74, -0.25);
vcpBox(g, 1.34, 0.03, 0.08, mBrass, 0, -0.4, -0.69, -0.25);
vcpQuad(g, [[-0.65, -1.1, -0.4], [0.65, -1.1, -0.4], [0.65, -0.8, -0.79], [-0.65, -0.8, -0.79]], vcpMat(0x5A3418, { map: vcpGrain("wood"), r: 0.5, side: THREE.DoubleSide }));
[-0.66, 0.66].forEach(function (x) { vcpBox(g, 0.04, 0.3, 0.7, mWood, x, -0.62, -0.4); vcpBox(g, 0.05, 0.03, 0.72, mBrass, x, -0.46, -0.4); });
[-0.72, 0.72].forEach(function (x) { vcpBox(g, 0.02, 0.2, 0.02, mBrass, x, -0.42, -0.72); vcpBox(g, 0.11, 0.17, 0.11, vcpMat(0x1A1A1A, { r: 0.4, m: 0.5 }), x, -0.24, -0.72); vcpBox(g, 0.075, 0.11, 0.004, vcpGlow(0xFFD58A, 0.85), x, -0.24, -0.663); vcpCyl(g, 0.03, 0.07, 0.06, vcpMat(0x1A1A1A, { r: 0.4, m: 0.5 }), x, -0.13, -0.72); });
vcpReins(g, [[-0.35, -0.85, -2.4], [0.35, -0.85, -2.4]]);
U.brass = vcpCanvas(lite ? 128 : 256, lite ? 128 : 256);
vcpFace(g, U.brass, 0.13, 0.13, 0.4, -0.5, -0.69, -0.25);
U.paint = function (R) { vcpPaintBrass(U.brass, R, [{ label: "MPH", max: 20, step: 5, val: function (r) { return r.mph; } }]); };
return g;
},
function (style) {
var g = new THREE.Group(), U = { hideRide: false, style: style };
g.userData.vcp = U;
var mL = vcpMat(0x5A3218, { map: vcpGrain("soft"), r: 0.7 }), mBrass = vcpMat(0xC9A040, { r: 0.3, m: 0.8 });
vcpCyl(g, 0.035, 0.05, 0.14, mL, 0, -0.92, -0.32);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mBrass);
cap.position.set(0, -0.84, -0.32);
g.add(cap);
vcpReins(g, [[-0.18, -0.55, -1.6], [0.18, -0.55, -1.6]], mL);
U.cluster = vcpCanvas(vcpLite() ? 256 : 512, vcpLite() ? 96 : 192);
vcpBox(g, 0.24, 0.1, 0.03, mL, 0, -0.79, -0.42, -0.7);
vcpFace(g, U.cluster, 0.22, 0.08, 0, -0.785, -0.405, -0.7);
U.paint = function (R) { vcpPaintFlight(U.cluster, R, { bg: "#2A1A10", face: "#EFE6CF", face2: "#FFF8E6", ink: "#2A2118", bezel: "#B8892E", needle: "#1A1A1A" }); };
return g;
},
function () {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: true, style: "airship" };
g.userData.vcp = U;
var mWood = vcpMat(0x6A3E1E, { map: vcpGrain("wood"), r: 0.45 }), mBrass = vcpMat(0xC9A040, { r: 0.3, m: 0.85 }), mFrame = vcpMat(0x3A2614, { map: vcpGrain("wood"), r: 0.6 });
vcpBox(g, 3.2, 0.05, 2.6, mFrame, 0, -1.72, -0.4);
for (var i = 0; i <= 7; i++) {
var a = -Math.PI * 0.42 + i * Math.PI * 0.84 / 7, x = Math.sin(a) * 1.5, z = -Math.cos(a) * 1.5 - 0.2;
vcpBeam(g, [x, -0.6, z], [x * 0.9, 0.7, z * 0.9], 0.06, 0.06, mFrame);
if (i < 7) {
var a2 = -Math.PI * 0.42 + (i + 1) * Math.PI * 0.84 / 7, x2 = Math.sin(a2) * 1.5, z2 = -Math.cos(a2) * 1.5 - 0.2;
vcpBeam(g, [x, -0.6, z], [x2, -0.6, z2], 0.08, 0.12, mWood);
vcpBeam(g, [x * 0.9, 0.7, z * 0.9], [x2 * 0.9, 0.7, z2 * 0.9], 0.06, 0.06, mFrame);
vcpQuad(g, [[x, -1.7, z], [x2, -1.7, z2], [x2, -0.6, z2], [x, -0.6, z]], mWood);
}
}
vcpBox(g, 3, 0.04, 2.4, mFrame, 0, 0.78, -0.4);
var helm = new THREE.Group();
helm.position.set(0, -0.42, -0.6);
g.add(helm);
U.wheel = helm;
helm.add(new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.02, 8, lite ? 20 : 32), mWood));
for (var s = 0; s < 8; s++) {
var aa = s / 8 * Math.PI * 2;
vcpBeam(helm, [0, 0, 0], [Math.cos(aa) * 0.4, Math.sin(aa) * 0.4, 0], 0.025, 0.025, mWood, true);
}
vcpCyl(helm, 0.06, 0.06, 0.06, mBrass, 0, 0, 0, Math.PI / 2);
vcpBox(g, 0.14, 1.0, 0.14, mWood, 0, -1.15, -0.68);
vcpCyl(g, 0.05, 0.07, 0.9, mBrass, 0.55, -1.2, -0.55);
vcpCyl(g, 0.15, 0.15, 0.08, mBrass, 0.55, -0.7, -0.55, Math.PI / 2 - 0.4);
U.brass = vcpCanvas(lite ? 384 : 768, lite ? 128 : 256);
vcpBox(g, 0.62, 0.22, 0.04, mWood, -0.05, -0.5, -1.15, -0.4);
vcpFace(g, U.brass, 0.58, 0.19, -0.05, -0.495, -1.128, -0.4);
U.tick = function (dt, R) { U.wheel.rotation.z = (VCP.turnRate || 0) * -4; };
U.paint = function (R) {
vcpPaintBrass(U.brass, R, [{ label: "KNOTS", max: 30, step: 10, val: function (r) { return r.mph * 0.87; } },
{ label: "FEET ×100", max: 12, step: 2, val: function (r) { return Math.max(0, r.alt * 3.28084 / 100); } }, { label: "GAS", max: 10, step: 2, val: function () { return 8.4; } }]);
};
return g;
},
function () {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: true, style: "saucer" };
g.userData.vcp = U;
var mHull = vcpMat(0x9AA3B0, { r: 0.25, m: 0.85 }), mDark = vcpMat(0x1A1E26, { r: 0.4, m: 0.6 }), glow = vcpGlow(0x4CF2FF);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.12, 8, lite ? 24 : 48, Math.PI * 0.9), mDark);
ring.rotation.x = -Math.PI / 2;
ring.rotation.z = Math.PI * 0.05;
ring.position.set(0, -0.55, 0.1);
g.add(ring);
var lip = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.012, 6, lite ? 24 : 48, Math.PI * 0.9), glow);
lip.rotation.x = -Math.PI / 2;
lip.rotation.z = Math.PI * 0.05;
lip.position.set(0, -0.43, 0.1);
g.add(lip);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 8, lite ? 32 : 64), mHull);
rim.rotation.x = Math.PI / 2;
rim.position.set(0, -0.5, 0);
g.add(rim);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
var rib = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.025, 6, lite ? 12 : 24, Math.PI / 2), mHull);
rib.rotation.y = a;
rib.position.set(0, -0.5, 0);
g.add(rib);
}
if (!lite) {
var dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), vcpMat(0x9FE8FF, { op: 0.06, flat: true, side: THREE.DoubleSide }));
dome.position.y = -0.5;
g.add(dome);
}
var floor = new THREE.Mesh(new THREE.CircleGeometry(1.6, lite ? 24 : 48), mDark);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.4;
g.add(floor);
U.cluster = vcpCanvas(lite ? 384 : 768, lite ? 128 : 256);
vcpFace(g, U.cluster, 0.5, 0.17, 0, -0.44, -0.62, -0.9);
var yoke = new THREE.Group();
yoke.position.set(0, -0.52, -0.45);
g.add(yoke);
U.wheel = yoke;
[-0.16, 0.16].forEach(function (x) { var b = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), vcpMat(0x2A2F3A, { e: 0x4CF2FF, ei: 0.15 })); b.position.set(x, 0, 0); yoke.add(b); });
U.tick = function (dt, R) { U.wheel.rotation.z = (VCP.turnRate || 0) * -3; };
U.paint = function (R) { vcpPaintFlight(U.cluster, R, {}); };
return g;
},
function () {
var g = new THREE.Group(), U = { hideRide: false, style: "sleigh" };
g.userData.vcp = U;
var mRed = vcpMat(0xA01020, { r: 0.35, m: 0.2 }), mGold = vcpMat(0xD8B040, { r: 0.3, m: 0.85 });
vcpProfile(g, [[0.5, -1.2], [0.52, -0.58], [0.62, -0.4, 0.78, -0.47], [0.9, -0.58], [0.9, -1.2]], -0.75, 0.75, mRed);
vcpBeam(g, [-0.75, -0.43, -0.56], [0.75, -0.43, -0.56], 0.035, 0.035, mGold, true);
[-0.78, 0.78].forEach(function (x) { vcpBeam(g, [x, -0.44, -0.6], [x * 1.05, -0.55, 0.1], 0.06, 0.08, mRed, true); vcpBeam(g, [x, -0.4, -0.6], [x * 1.05, -0.51, 0.1], 0.025, 0.025, mGold, true); });
[-0.8, 0.8].forEach(function (x) { vcpCyl(g, 0.05, 0.05, 0.14, vcpMat(0x1A1A1A, { r: 0.4, m: 0.5 }), x, -0.3, -0.58); vcpCyl(g, 0.04, 0.04, 0.1, vcpGlow(0xFFD58A, 0.9), x, -0.3, -0.58); });
vcpReins(g, [[-0.25, -0.7, -2.8], [0.25, -0.7, -2.8]], vcpMat(0x6A1A10, { r: 0.7 }));
U.cluster = vcpCanvas(vcpLite() ? 256 : 512, vcpLite() ? 96 : 192);
vcpFace(g, U.cluster, 0.3, 0.11, 0, -0.5, -0.535, -0.35);
U.paint = function (R) { vcpPaintFlight(U.cluster, R, { bg: "#3A0A10", face: "#F4ECD8", face2: "#FFFFFF", ink: "#5A0A10", bezel: "#D8B040", needle: "#1A1A1A" }); };
return g;
},
function () {
var g = new THREE.Group(), U = { hideRide: false, style: "chariot" };
g.userData.vcp = U;
var mGold = vcpMat(0xD8A030, { r: 0.25, m: 0.9, e: 0x7A2A00, ei: 0.2 });
vcpProfile(g, [[0.5, -1.3], [0.5, -0.62], [0.58, -0.5, 0.7, -0.55], [0.75, -1.3]], -0.6, 0.6, mGold);
vcpBeam(g, [-0.6, -0.52, -0.55], [0.6, -0.52, -0.55], 0.04, 0.04, mGold, true);
vcpReins(g, [[-0.3, -0.75, -2.6], [0.3, -0.75, -2.6]], vcpMat(0xC86A20, { r: 0.6, e: 0xC84A10, ei: 0.3 }));
return g;
},
function () {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: true, style: "tram" };
g.userData.vcp = U;
var mDesk = vcpMat(0x3A3F46, { map: vcpGrain("soft"), r: 0.8 }), mTrim = vcpMat(0x8A7A5A, { r: 0.5, m: 0.3 }), mBrass = vcpMat(0xB8892E, { r: 0.3, m: 0.8 });
vcpProfile(g, [[0.9, -0.32], [0.6, -0.33], [0.52, -0.38], [0.5, -1.0], [0.95, -1.0]], -0.9, 0.9, mDesk);
[-0.95, 0.95].forEach(function (x) { vcpBeam(g, [x, -0.33, -0.92], [x, 0.5, -0.85], 0.08, 0.08, mTrim); });
vcpBeam(g, [-0.95, 0.5, -0.85], [0.95, 0.5, -0.85], 0.1, 0.1, mTrim);
vcpBeam(g, [0, -0.33, -0.94], [0, 0.5, -0.87], 0.04, 0.04, mTrim);
vcpCyl(g, 0.12, 0.12, 0.24, vcpMat(0x2A2D33, { r: 0.5, m: 0.5 }), -0.25, -0.48, -0.55);
var h = new THREE.Group();
h.position.set(-0.25, -0.35, -0.55);
g.add(h);
U.handle = h;
vcpBeam(h, [0, 0, 0], [0, 0, -0.16], 0.025, 0.025, mBrass, true);
vcpCyl(h, 0.03, 0.03, 0.07, vcpMat(0x2A1A10, { r: 0.6 }), 0, 0.035, -0.16);
var bw = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 6, 20), mBrass);
bw.rotation.x = -Math.PI / 2;
bw.position.set(0.3, -0.3, -0.55);
g.add(bw);
U.cluster = vcpCanvas(lite ? 256 : 512, lite ? 96 : 192);
vcpFace(g, U.cluster, 0.34, 0.12, 0, -0.345, -0.6, -1.2);
U.tick = function (dt, R) { U.handle.rotation.y = (R.thr || 0) * 1.2 - (R.brk || 0) * 0.8; };
U.paint = function (R) { vcpPaintCluster(U.cluster, R, {}); };
return g;
},
function () {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: false, style: "train" };
g.userData.vcp = U;
var mDesk = vcpMat(0x2C3036, { map: vcpGrain("soft"), r: 0.8 }), mTrim = vcpMat(0x5A6068, { r: 0.5, m: 0.4 });
vcpProfile(g, [[0.85, -0.36], [0.58, -0.38], [0.52, -0.45], [0.5, -1.0], [0.9, -1.0]], -0.7, 0.7, mDesk);
var h = new THREE.Group();
h.position.set(-0.32, -0.42, -0.58);
g.add(h);
U.handle = h;
vcpBeam(h, [0, 0, 0], [0, 0.16, 0], 0.03, 0.03, mTrim, true);
vcpBeam(h, [-0.06, 0.16, 0], [0.06, 0.16, 0], 0.03, 0.03, vcpMat(0x1A1A1A, { r: 0.7 }), true);
vcpBox(g, 0.1, 0.02, 0.24, mTrim, -0.32, -0.43, -0.58);
U.doorL = vcpCyl(g, 0.025, 0.025, 0.015, vcpGlow(0x3EE07A), 0.2, -0.4, -0.6);
U.doorR = vcpCyl(g, 0.025, 0.025, 0.015, vcpGlow(0xE04A3E), 0.3, -0.4, -0.6);
U.cluster = vcpCanvas(lite ? 320 : 640, lite ? 110 : 220);
vcpFace(g, U.cluster, 0.38, 0.13, 0, -0.39, -0.555, -1.1);
U.tick = function (dt, R) { U.handle.rotation.x = Math.max(-0.7, Math.min(0.7, (R.notch || 0) * 0.15)); };
U.paint = function (R) { vcpPaintCluster(U.cluster, Object.assign({}, R, { gear: "N" }), {}); };
return g;
},
function (kind) {
var g = VCP.built[kind];
if (g)
return g;
try {
var R = VCP.reg[kind];
if (R) {
g = R.build(vcpCtx());
if (g) {
g.userData.vcp = g.userData.vcp || { hideRide: false, style: kind };
g.userData.vcp.reg = R;
}
}
else if (VCP_BUILD[kind])
g = VCP_BUILD[kind](kind);
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit build", kind, e);
}
g = null;
}
if (!g)
return null;
try {
g = vcpMergeStatic(g);
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit merge", e);
}
}
g.name = "vcp-" + kind;
g.rotation.order = "YXZ";
g.traverse(function (o) { if (o.isMesh) {
o.raycast = function () { };
o.castShadow = false;
o.receiveShadow = false;
o.frustumCulled = false;
} });
VCP.built[kind] = g;
return g;
},
function (g) {
var U = g.userData.vcp || {};
if (U.reg)
return g;
var moving = [U.wheel, U.handle, U.stalk].filter(Boolean);
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
g.updateMatrixWorld(true);
var buckets = {}, order = [];
g.traverse(function (m) {
if (!m.isMesh)
return;
for (var p = m; p; p = p.parent)
if (moving.indexOf(p) >= 0)
return;
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
geo.applyMatrix4(m.matrixWorld);
if (!geo.attributes.normal)
geo.computeVertexNormals();
if (!geo.attributes.uv)
geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
var k = m.material.uuid;
if (!buckets[k]) {
buckets[k] = { mat: m.material, list: [] };
order.push(k);
}
buckets[k].list.push(geo);
});
var out = new THREE.Group();
out.userData.vcp = U;
order.forEach(function (k) {
var b = buckets[k], n = 0;
b.list.forEach(function (q) { n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0;
b.list.forEach(function (q) { pos.set(q.attributes.position.array, o * 3); nor.set(q.attributes.normal.array, o * 3); uv.set(q.attributes.uv.array, o * 2); o += q.attributes.position.count; q.dispose(); });
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
mg.computeBoundingSphere();
var mesh = new THREE.Mesh(mg, b.mat);
if (b.mat.transparent)
mesh.renderOrder = 2;
out.add(mesh);
});
moving.forEach(function (m) { out.attach(m); });
g.traverse(function (o) { if (o.isMesh && moving.indexOf(o) < 0) {
var inMove = false;
for (var p = o; p; p = p.parent)
if (moving.indexOf(p) >= 0)
inMove = true;
if (!inMove)
o.geometry.dispose();
} });
return out;
},
function (G) {
if (G.userData.vcpNear && G.userData.vcpNearAt === G.children.length)
return G.userData.vcpNear;
var out = [], P = camera.position, sp = new THREE.Sphere();
G.updateMatrixWorld(true);
G.traverse(function (o) {
if (!o.isMesh || !o.visible || !o.geometry)
return;
if (!o.geometry.boundingSphere)
o.geometry.computeBoundingSphere();
sp.copy(o.geometry.boundingSphere).applyMatrix4(o.matrixWorld);
var d = sp.center.distanceTo(P);
if ((d < sp.radius * 0.8 && sp.radius < 1.2) || (d < 0.6 && sp.radius < 0.6))
out.push(o);
});
G.userData.vcpNear = out;
G.userData.vcpNearAt = G.children.length;
return out;
},
function (cv, R, side, accent) {
var x = cv.x, W = cv.c.width, H = cv.c.height, P = W * 0.06;
R = R || {};
var bg = x.createLinearGradient(0, 0, 0, H);
bg.addColorStop(0, "#081018");
bg.addColorStop(1, "#03060A");
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(90,170,230,0.10)";
x.lineWidth = 1;
for (var gx = P; gx < W; gx += W / 16) {
x.beginPath();
x.moveTo(gx, 0);
x.lineTo(gx, H);
x.stroke();
}
x.strokeStyle = accent;
x.globalAlpha = 0.55;
x.lineWidth = Math.max(2, H * 0.012);
vcpRound(x, 3, 3, W - 6, H - 6, H * 0.06);
x.stroke();
x.globalAlpha = 1;
x.textBaseline = "middle";
x.textAlign = "left";
var f = function (w, sz) { x.font = w + " " + Math.round(H * sz) + "px system-ui,sans-serif"; };
if (side === "left") {
var sh = R.shield != null ? Math.max(0, Math.min(1, R.shield)) : null, hp = Math.max(0, Math.min(1, R.hp != null ? R.hp : 1)), tw = W * 0.56;
x.fillStyle = accent;
f("700", 0.1);
x.fillText("DEFENCE", P, H * 0.12);
var y = H * 0.27;
if (sh != null) {
x.fillStyle = "#9FB4C8";
f("600", 0.075);
x.fillText("SHIELDS", P, y);
x.textAlign = "right";
x.fillStyle = vcpLvlCol(sh);
x.fillText(Math.round(sh * 100) + "%", P + tw, y);
x.textAlign = "left";
vcpBar(x, P, y + H * 0.06, tw, H * 0.075, sh, "#4AB8F0");
y += H * 0.25;
}
x.fillStyle = "#9FB4C8";
f("600", 0.075);
x.fillText(R.shield != null ? "HULL" : "ARMOUR", P, y);
x.textAlign = "right";
x.fillStyle = vcpLvlCol(hp);
x.fillText(Math.round(hp * 100) + "%", P + tw, y);
x.textAlign = "left";
vcpBar(x, P, y + H * 0.06, tw, H * 0.075, hp, vcpLvlCol(hp));
y += H * 0.25;
x.fillStyle = "#7E8C9A";
f("500", 0.068);
x.fillText(vcpFit(x, R.name || "", tw), P, Math.min(y, H * 0.9));
var cx = W * 0.81, cy = H * 0.52, rr = Math.min(W * 0.15, H * 0.4);
x.fillStyle = "#04121A";
x.beginPath();
x.arc(cx, cy, rr, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "rgba(90,200,240,0.35)";
x.lineWidth = 1;
[0.33, 0.66, 1].forEach(function (k) { x.beginPath(); x.arc(cx, cy, rr * k, 0, Math.PI * 2); x.stroke(); });
x.beginPath();
x.moveTo(cx - rr, cy);
x.lineTo(cx + rr, cy);
x.moveTo(cx, cy - rr);
x.lineTo(cx, cy + rr);
x.stroke();
var sv = sh != null ? sh : hp;
x.strokeStyle = sh != null ? "#4AB8F0" : vcpLvlCol(hp);
x.lineWidth = H * 0.025;
x.beginPath();
x.arc(cx, cy, rr * 0.22, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.02, sv));
x.stroke();
x.fillStyle = "#E8F4FF";
x.beginPath();
x.moveTo(cx, cy - rr * 0.1);
x.lineTo(cx + rr * 0.07, cy + rr * 0.08);
x.lineTo(cx - rr * 0.07, cy + rr * 0.08);
x.closePath();
x.fill();
(R.blips || []).forEach(function (b) { var bx = cx + b[0] * rr, by = cy + b[1] * rr; if (Math.hypot(b[0], b[1]) > 1)
return; x.fillStyle = b[2] ? "#3EE07A" : "#FF5A4A"; x.beginPath(); x.arc(bx, by, H * (b[3] ? 0.026 : 0.018), 0, Math.PI * 2); x.fill(); });
if (R.foes != null) {
x.fillStyle = "#FF8A7A";
f("600", 0.06);
x.textAlign = "center";
x.fillText(R.foes + " hostile" + (R.foes === 1 ? "" : "s"), cx, cy + rr + H * 0.06 > H * 0.95 ? H * 0.94 : cy + rr + H * 0.06);
x.textAlign = "left";
}
}
else {
var c1 = R.charge != null ? Math.max(0, Math.min(1, R.charge)) : 1, armed = R.armed !== false, tw2 = W * 0.88;
x.fillStyle = accent;
f("700", 0.1);
x.fillText("WEAPONS", P, H * 0.12);
x.textAlign = "right";
f("700", 0.075);
x.fillStyle = !armed ? "#E8C27A" : c1 >= 0.999 ? "#3EE07A" : "#8AD0FF";
x.fillText(!armed ? "LOCKED HERE" : c1 >= 0.999 ? "READY" : "CHARGING", P + tw2, H * 0.12);
x.textAlign = "left";
x.fillStyle = "#C8D8E8";
f("600", 0.072);
x.fillText(vcpFit(x, (R.gun || "Main guns").toUpperCase(), tw2 * 0.62), P, H * 0.27);
if (R.ammo != null) {
x.textAlign = "right";
x.fillStyle = "#E8D8A8";
x.fillText(String(R.ammo), P + tw2, H * 0.27);
x.textAlign = "left";
}
vcpBar(x, P, H * 0.32, tw2, H * 0.06, armed ? c1 : 0, c1 >= 0.999 ? "#3EE07A" : "#4AB8F0");
var y2 = H * 0.47;
if (R.gun2) {
var c2 = R.charge2 != null ? Math.max(0, Math.min(1, R.charge2)) : 1;
x.fillStyle = "#C8D8E8";
f("600", 0.064);
x.fillText(vcpFit(x, String(R.gun2).toUpperCase(), tw2 * 0.62), P, y2);
x.textAlign = "right";
x.fillStyle = c2 >= 0.999 ? "#3EE07A" : "#8AD0FF";
x.fillText(c2 >= 0.999 ? "READY" : Math.round(c2 * 100) + "%", P + tw2, y2);
x.textAlign = "left";
vcpBar(x, P, y2 + H * 0.045, tw2, H * 0.04, c2, c2 >= 0.999 ? "#3EE07A" : "#4AB8F0");
y2 += H * 0.14;
}
x.fillStyle = "#9FB4C8";
f("600", 0.064);
x.fillText("TARGET", P, y2);
x.textAlign = "right";
x.fillStyle = R.target ? "#FF8A7A" : "#5E6E7E";
x.fillText(vcpFit(x, R.target ? (R.target.name + (R.target.dist != null ? "  " + (R.target.dist >= 1000 ? (R.target.dist / 1000).toFixed(1) + " km" : Math.round(R.target.dist) + " m") : "")) : "None in range", tw2 * 0.7), P + tw2, y2);
x.textAlign = "left";
y2 += H * 0.13;
var re = R.reactor != null ? R.reactor : Math.min(1, 0.3 + (R.thr || 0) * 0.6 + (1 - c1) * 0.15);
x.fillStyle = "#9FB4C8";
x.fillText("REACTOR", P, y2);
x.textAlign = "right";
x.fillStyle = "#DDE7F2";
x.fillText(Math.round(re * 100) + "%", P + tw2, y2);
x.textAlign = "left";
vcpBar(x, P, y2 + H * 0.045, tw2, H * 0.04, re, re > 0.85 ? "#E8C27A" : "#B88AFF");
y2 += H * 0.15;
f("500", 0.062);
x.fillStyle = "#8D97A3";
var spd = Math.round(R.mph || 0), alt = Math.round(Math.max(0, R.alt || 0) * 3.28084);
x.fillText("SPEED", P, Math.min(y2, H * 0.93));
x.fillStyle = "#DDE7F2";
f("700", 0.068);
x.fillText(spd + " mph", P + W * 0.15, Math.min(y2, H * 0.93));
x.textAlign = "right";
x.fillStyle = "#DDE7F2";
x.fillText(R.space ? ("HDG " + String(Math.round(R.heading || 0)).padStart(3, "0") + "°") : (alt + " ft"), P + tw2, Math.min(y2, H * 0.93));
x.textAlign = "left";
}
cv.t.needsUpdate = true;
},
function (kind) {
var lite = vcpLite(), g = new THREE.Group(), U = { hideRide: false, style: kind };
g.userData.vcp = U;
var war = /^bw/.test(kind), accent = war ? 0xD04030 : 0xC8A860, css = war ? "#FF6A4A" : "#E8C878";
var mFrame = vcpMat(war ? 0x3A3C40 : 0x2A2630, { r: 0.4, m: 0.7, lit: 0.2 }), mPanel = vcpMat(0x15171C, { r: 0.55, m: 0.35, lit: 0.18 }), mGlow = vcpGlow(accent);
var rim = [], AN = [-1.3, -0.78, -0.34, 0.34, 0.78, 1.3], N = AN.length - 1;
AN.forEach(function (a) { rim.push([Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7]); });
for (var j = 0; j <= N; j++) {
var p = rim[j];
vcpBeam(g, [p[0], -0.44, p[2]], [p[0] * 0.8, 0.44, p[2] * 0.8], 0.022, 0.022, mFrame);
if (j < N) {
var q = rim[j + 1];
vcpBeam(g, [p[0], -0.44, p[2]], [q[0], -0.44, q[2]], 0.03, 0.03, mFrame);
vcpBeam(g, [p[0] * 0.8, 0.44, p[2] * 0.8], [q[0] * 0.8, 0.44, q[2] * 0.8], 0.03, 0.03, mFrame);
if (!lite)
vcpBeam(g, [p[0] * 0.8, 0.425, p[2] * 0.8], [q[0] * 0.8, 0.425, q[2] * 0.8], 0.005, 0.005, mGlow);
}
}
vcpQuad(g, [[-0.5, 0.45, -0.5], [0.5, 0.45, -0.5], [0.62, 0.48, 0.6], [-0.62, 0.48, 0.6]], vcpMat(0x1A1C22, { r: 0.8, side: THREE.DoubleSide, lit: 0.2 }));
vcpProfile(g, [[0.72, -0.45], [0.5, -0.46], [0.45, -0.52], [0.45, -1.1], [0.72, -1.1]], -0.68, 0.68, mPanel);
vcpBox(g, 0.9, 0.003, 0.006, mGlow, 0, -0.457, -0.52);
U.left = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.right = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
vcpFace(g, U.left, 0.22, 0.11, -0.27, -0.25, -0.5, -0.35, 0.25);
vcpFace(g, U.right, 0.22, 0.11, 0.27, -0.25, -0.5, -0.35, -0.25);
U.cluster = vcpCanvas(lite ? 384 : 768, lite ? 128 : 256);
vcpFace(g, U.cluster, 0.24, 0.08, 0, -0.27, -0.52, -0.35);
var sticks = new THREE.Group();
g.add(sticks);
U.wheel = sticks;
[-0.34, 0.34].forEach(function (x) {
vcpBox(g, 0.14, 0.06, 0.4, mPanel, x, -0.68, -0.12);
vcpBeam(sticks, [x, -0.65, -0.25], [x, -0.52, -0.27], 0.03, 0.03, mFrame, true);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), vcpMat(0x101216, { r: 0.5 }));
top.scale.set(1, 1.4, 1);
top.position.set(x, -0.5, -0.27);
sticks.add(top);
vcpBox(sticks, 0.012, 0.012, 0.012, mGlow, x, -0.47, -0.28);
});
U.tick = function (dt, R) { U.wheel.rotation.z = -(VCP.turnRate || 0) * 0.08; };
U.paint = function (R) {
vcpPaintMech(U.left, R, "left", css);
vcpPaintMech(U.right, R, "right", css);
vcpPaintFlight(U.cluster, { mph: R.mph || 0, vmaxMph: 60, alt: R.alt || 0, climb: 0 }, { bezel: css, needle: css });
};
return g;
},
function () {
var outer = vcpBuildCar("chase"), g = outer.children[0], U = outer.userData.vcp, lite = vcpLite(), S = VCP_CAR.chase;
var C = S.off, by = S.ws.by;
var mRub = vcpMat(0x16171A, { map: vcpGrain("soft"), r: 0.85 }), mBlack = vcpMat(0x0C0D10, { r: 0.5 }), mMetal = vcpMat(0x6A6E74, { r: 0.35, m: 0.7, lit: 0.15 });
var mAmber = vcpMat(0xE8A030, { e: 0xE8A030, ei: 0.5 });
var tx = C - 0.08, ty = by + 0.15, tz = -0.7;
vcpBall(g, 0.022, mMetal, tx, by + 0.02, tz - 0.04);
vcpBeam(g, [tx, by + 0.02, tz - 0.04], [tx, ty - 0.06, tz - 0.01], 0.022, 0.022, mMetal, true);
vcpBall(g, 0.02, mMetal, tx, ty - 0.06, tz - 0.01);
vcpSlab(g, 0.33, 0.215, 0.03, 0.025, mRub, tx, ty, tz, -0.12, 0.12);
if (!lite)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { vcpSlab(g, 0.04, 0.04, 0.038, 0.014, vcpMat(0xD06A1A, { r: 0.7 }), tx + c[0] * 0.15, ty + c[1] * 0.093, tz + 0.001, -0.12, 0.12); });
U.radar = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
vcpFace(g, U.radar, 0.3, 0.15, tx + 0.002, ty + 0.002, tz + 0.018, -0.12, 0.12);
var wx = C + 0.25, wy = by + 0.045, wz = -0.72;
vcpSlab(g, 0.2, 0.09, 0.06, 0.012, mBlack, wx, wy, wz, -0.25, -0.2);
U.meso = vcpCanvas(lite ? 160 : 320, lite ? 72 : 144);
vcpFace(g, U.meso, 0.18, 0.075, wx - 0.006, wy + 0.004, wz + 0.031, -0.25, -0.2);
var cx = C, cy = by - 0.36, cz = -0.47;
vcpSlab(g, 0.2, 0.055, 0.14, 0.008, mBlack, cx, cy, cz);
vcpBox(g, 0.05, 0.016, 0.004, vcpGlow(0xE8A030), cx - 0.04, cy + 0.006, cz + 0.071);
if (!lite) {
vcpCyl(g, 0.012, 0.012, 0.012, mMetal, cx + 0.04, cy + 0.004, cz + 0.075, Math.PI / 2);
vcpCyl(g, 0.012, 0.012, 0.012, mMetal, cx + 0.07, cy + 0.004, cz + 0.075, Math.PI / 2);
}
vcpBall(g, 0.03, mBlack, cx + 0.14, cy - 0.02, cz + 0.03, 1.1, 1.6, 0.75);
vcpBeam(g, [cx + 0.14, cy - 0.07, cz + 0.03], [cx + 0.05, cy - 0.03, cz + 0.06], 0.008, 0.008, mBlack, true);
vcpSlab(g, 0.2, 0.004, 0.15, 0.002, vcpMat(0xA8A090, { r: 1 }), 2 * C - 0.04, -0.624, 0.16, 0.08, 0.3);
vcpSlab(g, 0.03, 0.02, 0.012, 0.004, mAmber, C + 0.13, by - 0.1, -0.515, 0, -0.12);
var tick0 = U.tick, paint0 = U.paint;
U.radarAt = 0;
U.mesoAt = 0;
U.paint = function (R) {
paint0(R);
var now = performance.now();
if (now - U.mesoAt > (lite ? 1000 : 500)) {
U.mesoAt = now;
vcpPaintMeso(U.meso, R);
}
if (now - U.radarAt > (lite ? 3000 : 1500)) {
U.radarAt = now;
vcpPaintRadar(U.radar);
}
};
U.tick = tick0;
return outer;
},
function (cv) {
var x = cv.x, W = cv.c.width, H = cv.c.height;
try {
if (typeof stcRadarDraw === "function")
stcRadarDraw(x, W, H, true);
else {
x.fillStyle = "#05080C";
x.fillRect(0, 0, W, H);
}
}
catch (e) {
x.fillStyle = "#05080C";
x.fillRect(0, 0, W, H);
}
x.fillStyle = "rgba(5,8,12,.75)";
x.fillRect(0, H - Math.round(H * 0.12), W, Math.round(H * 0.12));
x.fillStyle = "#9FD8FF";
x.font = "600 " + Math.round(H * 0.075) + "px monospace";
x.textAlign = "left";
x.textBaseline = "middle";
x.fillText("STORMHAVEN DOPPLER · LIVE", W * 0.02, H - H * 0.06);
cv.t.needsUpdate = true;
},
function (cv, R) {
var x = cv.x, W = cv.c.width, H = cv.c.height, r = { wind: R.wind || 0, dir: R.dir || 0, p: R.p || 1006, T: R.T || 31, Td: R.Td || 21 };
x.fillStyle = "#0E1A12";
x.fillRect(0, 0, W, H);
x.fillStyle = "#7CF29A";
x.textBaseline = "middle";
x.textAlign = "left";
x.font = "700 " + Math.round(H * 0.3) + "px monospace";
x.fillText(Math.round(r.wind) + " MPH", W * 0.04, H * 0.3);
x.font = "600 " + Math.round(H * 0.16) + "px monospace";
var dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
x.textAlign = "right";
x.fillText("FROM " + dirs[Math.round(((r.dir % 360) + 360) % 360 / 45) % 8], W * 0.96, H * 0.3);
x.textAlign = "left";
x.fillText(r.p.toFixed(1) + " mb", W * 0.04, H * 0.62);
x.textAlign = "right";
x.fillText(Math.round(r.T * 9 / 5 + 32) + "°F  DP " + Math.round(r.Td * 9 / 5 + 32) + "°", W * 0.96, H * 0.62);
x.fillStyle = "#3F8A55";
x.textAlign = "left";
x.font = "600 " + Math.round(H * 0.12) + "px monospace";
x.fillText("MOBILE MESONET", W * 0.04, H * 0.87);
cv.t.needsUpdate = true;
},
function () {
var R = typeof STC !== "undefined" ? STC.ride : null, T = STC && STC.truck, sp = R ? R.sp : 0, w = {};
try {
if (T && typeof stcReadings === "function")
w = stcReadings(T.position.x, T.position.z) || {};
}
catch (e) { }
return { mph: sp * 2.23694, vmaxMph: 80, thr: R ? 0.45 : 0, brk: 0, gear: R ? "D" : "P", ind: null, steer: Math.max(-0.6, Math.min(0.6, -(VCP.turnRate || 0) * 0.35)),
limit: null, road: "Section road", heading: typeof bearingOfHeading === "function" && T ? bearingOfHeading(T.rotation.y + Math.PI) : 0, alt: 0, climb: 0, fly: false, next: null, note: "", reverse: false,
wind: w.wind, dir: w.dir, p: w.p, T: w.T, Td: w.Td };
}
];
});
