/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(117, function () {
"use strict";
return [
function (ward, light) {
var h = cityHourNow(), list = lampList().filter(function (L) { return L.ward === ward && (light ? !LAMPSTATE.lit[L.id] : !!LAMPSTATE.lit[L.id]); });
var P = { x: camera.position.x, z: camera.position.z }, out = [];
while (list.length) {
var bi = 0, bd = 1e18;
for (var i = 0; i < list.length; i++) {
var d = (list[i].x - P.x) * (list[i].x - P.x) + (list[i].z - P.z) * (list[i].z - P.z);
if (d < bd) {
bd = d;
bi = i;
}
}
var L = list.splice(bi, 1)[0];
out.push({ x: L.x, z: L.z, name: L.name, id: L.id, lamp: L });
P = L;
}
return out;
},
function (B, s) {
var light = B.task.mode !== "douse";
if (light)
LAMPSTATE.lit[s.id] = 1;
else
delete LAMPSTATE.lit[s.id];
LAMPSTATE.kept[s.lamp ? s.lamp.ward : wardOf(s.x, s.z)] = 1;
LAMPSTATE.pending = LAMPSTATE.pending || {};
LAMPSTATE.pending[s.id] = light ? 1 : 0;
LAMP_OUT.push(s.id);
if (LAMP_OUT.length >= 5 || B.i >= B.stops.length - 1)
lampFlush(light, s.lamp ? s.lamp.ward : null);
lampAt = 0;
},
function (light, ward) {
if (!LAMP_OUT.length)
return;
var keys = LAMP_OUT.splice(0, 40);
cityRpc("lamp_set", { p_keys: keys, p_lit: light, p_ward: ward }).then(function (o) {
if (o && o.ok) {
keys.forEach(function (k) { if (LAMPSTATE.pending)
delete LAMPSTATE.pending[k]; });
if (typeof WORK !== "undefined")
WORK.svc.lighting = o.level;
}
else if (o && o.say)
setStatus(esc(o.say));
}).catch(function () { LAMP_OUT = keys.concat(LAMP_OUT); });
},
function (b) {
var st = GARDEN.beds[b.id], key = st ? JSON.stringify(st) : "";
var g = BED_G[b.id];
if (g && g.stamp === key)
return g;
if (g) {
scene.remove(g);
g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material)
m.material.dispose(); });
delete BED_G[b.id];
}
if (!st)
return null;
g = new THREE.Group();
g.position.set(b.x, terrainY(b.x, b.z), b.z);
g.rotation.y = b.rot;
var dry = st.dry, weedy = st.weedy;
if (b.kind === "hedge" && st.shape && st.shape !== "natural") {
var green = new THREE.MeshLambertMaterial({ color: dry ? 0x7A7A3A : 0x2F6A2E }), W = Math.max(1, b.w), H = Math.max(1, b.h), Dd = Math.max(1, b.dd), m;
if (st.shape === "box")
m = new THREE.Mesh(new THREE.BoxGeometry(W * 1.04, H * 1.02, Dd * 1.04), green);
else if (st.shape === "round") {
m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 10), green);
m.scale.set(W * 1.05, H * 1.05, Dd * 1.05);
}
else if (st.shape === "cone")
m = new THREE.Mesh(new THREE.ConeGeometry(Math.max(W, Dd) * 0.55, H * 1.25, 14), green);
else if (st.shape === "spiral") {
m = new THREE.Group();
for (var i = 0; i < 4; i++) {
var c = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), green);
var sc = (1 - i * 0.2) * Math.max(W, Dd);
c.scale.set(sc, H * 0.28, sc);
c.position.y = H * 0.18 + i * H * 0.26;
m.add(c);
}
}
else if (st.shape === "arch") {
m = new THREE.Mesh(new THREE.TorusGeometry(Math.max(W, Dd) * 0.45, Math.min(W, Dd) * 0.22, 8, 16, Math.PI), green);
m.rotation.y = Math.PI / 2;
m.position.y = 0;
}
if (m) {
if (!(m instanceof THREE.Group) && st.shape !== "arch")
m.position.y = H * 0.52;
g.add(m);
}
}
if (st.flower && b.kind !== "lawn") {
var col = st.color || (FLOWERS.filter(function (f) { return f[0] === st.flower; })[0] || [0, 0xC0392B])[1];
if (dry) {
var c0 = new THREE.Color(col);
c0.lerp(new THREE.Color(0x7A5A30), 0.6);
col = c0.getHex();
}
var fm = new THREE.MeshLambertMaterial({ color: col, emissive: col, emissiveIntensity: 0.12 });
var n = Math.max(6, Math.min(26, Math.round(b.w * b.dd * 1.5))), r = b.id.length * 7919;
var top = b.kind === "hedge" ? b.h * 1.02 : Math.max(0.25, b.h * 0.9);
for (var k = 0; k < n; k++) {
r = (r * 9301 + 49297) % 233280;
var fx = (r / 233280 - 0.5) * b.w * 0.9;
r = (r * 9301 + 49297) % 233280;
var fz = (r / 233280 - 0.5) * b.dd * 0.9;
var f = new THREE.Mesh(new THREE.SphereGeometry(dry ? 0.11 : 0.16, 6, 5), fm);
f.position.set(fx, top + 0.12, fz);
g.add(f);
}
}
if (weedy && b.kind !== "hedge") {
var wm = new THREE.MeshLambertMaterial({ color: 0x8A9A3A });
for (var q = 0; q < 5; q++) {
var wd = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 4), wm);
wd.position.set((q / 4 - 0.5) * b.w * 0.8, 0.3, ((q * 37) % 5 / 4 - 0.5) * b.dd * 0.8);
g.add(wd);
}
}
g.stamp = key;
scene.add(g);
BED_G[b.id] = g;
return g;
},
function (ward) {
var list = bedList().filter(function (b) { return b.ward === ward; });
var P = { x: camera.position.x, z: camera.position.z }, out = [];
while (list.length && out.length < 400) {
var bi = 0, bd = 1e18;
for (var i = 0; i < list.length; i++) {
var d = (list[i].x - P.x) * (list[i].x - P.x) + (list[i].z - P.z) * (list[i].z - P.z);
if (d < bd) {
bd = d;
bi = i;
}
}
var b = list.splice(bi, 1)[0];
out.push({ x: b.x, z: b.z, name: b.name, id: b.id, bed: b });
P = b;
}
return out;
},
function (B, s) {
var b = s.bed || { kind: "bed" }, st = GARDEN.beds[s.id] || {}, h = "";
B.pick = B.pick || { flower: st.flower || "roses", color: st.color || null, shape: st.shape || "box" };
if (B.bedBusy) {
var pct = Math.min(100, B.t / B.stepSecs * 100);
return "<div class='bar'><i style='width:" + pct.toFixed(0) + "%'></i></div><span style='color:var(--dim)'>" + esc(B.bedBusy.label) + "…</span>";
}
h += "<div style='margin:6px 0;color:var(--dim)'>" + (st.flower ? ("Now: " + esc(st.flower) + (st.dry ? " · <span style='color:#C0603A'>dry</span>" : "") + (st.weedy ? " · weedy" : "")) : "Not yet planted by a gardener") + (st.shape ? " · trimmed " + esc(st.shape) : "") + "</div>";
if (b.kind !== "lawn") {
h += "<div style='margin:4px 0'>Plant <select id='bed-flower'>" + FLOWERS.map(function (f) { return "<option" + (f[0] === B.pick.flower ? " selected" : "") + ">" + f[0] + "</option>"; }).join("") + "</select> " +
BED_COLOURS.map(function (c) { var hx = "#" + ("000000" + c.toString(16)).slice(-6); return "<span class='sw" + (B.pick.color === c ? " on" : "") + "' data-col='" + c + "' style='background:" + hx + "'></span>"; }).join(" ") +
" <button class='btn' data-bed='plant'>Plant</button></div>";
}
if (b.kind === "hedge")
h += "<div style='margin:4px 0'>Trim to <select id='bed-shape'>" + HEDGE_SHAPES.map(function (x) { return "<option" + (x === B.pick.shape ? " selected" : "") + ">" + x + "</option>"; }).join("") + "</select> <button class='btn' data-bed='trim'>Trim</button></div>";
h += "<div class='steps'><button class='btn' data-bed='water'>Water</button><button class='btn' data-bed='weed'>Weed</button>" + (b.kind === "lawn" ? "<button class='btn' data-bed='mow'>Mow</button>" : "") +
"<button class='btn' data-bed='next'>Next bed</button></div>";
return h;
},
function (el, B) {
var fl = document.getElementById("bed-flower");
if (fl)
fl.onchange = function () { B.pick.flower = fl.value; };
var sh = document.getElementById("bed-shape");
if (sh)
sh.onchange = function () { B.pick.shape = sh.value; };
Array.prototype.forEach.call(el.querySelectorAll("[data-col]"), function (x) { x.onclick = function () { B.pick.color = +x.getAttribute("data-col"); el.dataset.h = ""; workRunPaint(); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-bed]"), function (x) {
x.onclick = function () {
var a = x.getAttribute("data-bed");
if (a === "next") {
B.i++;
B.atStop = false;
B.pick = null;
if (B.i >= B.stops.length)
workDone();
else
setStatus("On to the next bed.");
return;
}
var labels = { plant: "Planting " + B.pick.flower, water: "Watering", weed: "Weeding", trim: "Trimming to a " + B.pick.shape, mow: "Mowing" };
B.bedBusy = { action: a, label: labels[a], flower: B.pick.flower, color: B.pick.color, shape: B.pick.shape };
B.t = 0;
B.last = Date.now();
workRunPaint();
};
});
},
function (B, s, act) {
var w = s.bed ? s.bed.ward : wardOf(s.x, s.z);
var cur = GARDEN.beds[s.id] || { key: s.id };
if (act.action === "plant") {
cur.flower = act.flower;
cur.color = act.color;
cur.dry = false;
}
if (act.action === "water")
cur.dry = false;
if (act.action === "weed")
cur.weedy = false;
if (act.action === "trim")
cur.shape = act.shape;
GARDEN.beds[s.id] = cur;
bedAt = 0;
cityRpc("garden_tend", { p_key: s.id, p_action: act.action, p_flower: act.action === "plant" ? act.flower : null, p_color: act.action === "plant" ? act.color : null, p_shape: act.action === "trim" ? act.shape : null, p_ward: w })
.then(function (o) { if (o && o.ok) {
setStatus("<b>" + esc(act.label) + "</b> — done." + (typeof WORK !== "undefined" ? "" : ""));
if (typeof WORK !== "undefined")
WORK.svc.clean = o.level;
}
else if (o && o.say)
setStatus(esc(o.say)); })
.catch(function (e) { setStatus(esc(e.message)); });
var el = document.getElementById("work-run");
if (el)
el.dataset.h = "";
}
];
});
