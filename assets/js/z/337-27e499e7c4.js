/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(337, function () {
"use strict";
return [
function (how, what) {
var el = plxRestEl(), P = camera.position;
PLX.rest = { how: how, x: P.x, z: P.z, at: Date.now() };
if (el)
el.style.opacity = how === "sleep" ? "0.55" : how === "nap" ? "0.32" : "0";
setStatus(how === "sleep" ? "<b>You lie down in " + esc(what) + ".</b> Rest as long as you like; walk on, or press E, to get up." :
how === "nap" ? "<b>You put your feet up on " + esc(what) + ".</b> Walk on, or press E, to get up." :
"<b>You bathe in " + esc(what) + ".</b> Warm water, soft towels. Walk on, or press E, when you are done.");
},
function (how, what) {
if (plxResting())
return { name: (PLX.rest ? PLX.rest.how : FN.rest) === "wash" ? "Washing" : "Resting", verb: "get up" };
var ex = plxExempt(), en = (!ex && typeof FN !== "undefined" && FN.energy != null) ? " · energy " + Math.round(FN.energy) : "", hy = (!ex && typeof FN !== "undefined" && FN.hygiene != null) ? " · hygiene " + Math.round(FN.hygiene) : "";
if (how === "sleep")
return { name: what, verb: "sleep" + en };
if (how === "nap")
return { name: what, verb: "take a nap" + en };
return { name: what, verb: "wash" + hy };
},
function (I) {
if (!I.root || !I.asBuilt || !I.wpKey || typeof workplaceDecor !== "function")
return;
var d = workplaceDecor(I.wpKey);
if (!d || !d.length)
return;
var F = I.floor || 7.5;
PLV_SEED.forEach(function (k) {
if (d.some(function (p) { return p && p.k === k; }) || !FURN[k])
return;
var p = I.asBuilt.filter(function (q) { return q.k === k; })[0];
if (!p)
return;
var it = FURN[k]();
it.userData.furn = k;
it.position.set(p.x, (p.l || 0) * F, p.z);
it.rotation.y = p.r || 0;
I.root.add(it);
});
},
function (force) {
if (!plnOn())
return;
var list = plnList(), sig = JSON.stringify(list);
if (!force && sig === PLN.drawn && PLN.G && PLN.G.parent === IP.pg)
return;
PLN.drawn = sig;
if (PLN.G && PLN.G.parent)
PLN.G.parent.remove(PLN.G);
for (var i = IP.solids.length - 1; i >= 0; i--)
if (IP.solids[i].pln)
IP.solids.splice(i, 1);
var G = new THREE.Group();
G.name = "pln-decor";
list.forEach(function (p) {
if (!p || !FURN[p.k] || p.k === "stairs")
return;
var it;
try {
it = FURN[p.k]();
}
catch (e) {
return;
}
var y = p.y != null ? +p.y : IP.F;
it.userData.furn = p.k;
it.position.set(+p.x || 0, y, +p.z || 0);
it.rotation.y = +p.r || 0;
G.add(it);
if (typeof SOLIDFURN !== "undefined" && SOLIDFURN[p.k] && typeof furnBox === "function") {
var bb = furnBox(p.k), c = Math.abs(Math.cos(p.r || 0)), s = Math.abs(Math.sin(p.r || 0)), w = ipW(+p.x || 0, +p.z || 0);
IP.solids.push({ x: w.x, z: w.z, hw: (s * bb[0] + c * bb[1]) / 2, hd: (c * bb[0] + s * bb[1]) / 2, b: y, h: 1.2, pln: 1 });
}
});
IP.pg.add(G);
PLN.G = G;
if (PLN.fint) {
PLN.fint.root = G;
if (typeof HMD !== "undefined" && HMD.int === PLN.fint)
HMD.int = null;
}
},
function () {
if (PLN.fixed && PLN.fixed.parent === IP.pg)
return;
var M = ipMats(), F = IP.F, g = new THREE.Group();
g.name = "pln-fixed";
var bowl = new THREE.Mesh(new THREE.CylinderGeometry(.36, .22, .16, 16), M.silver);
bowl.position.set(53.2, F + 1.08, -23);
g.add(bowl);
var wat = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .02, 16), M.water);
wat.position.set(53.2, F + 1.15, -23);
g.add(wat);
var ewer = new THREE.Mesh(new THREE.CylinderGeometry(.08, .12, .34, 10), M.silver);
ewer.position.set(53.2, F + 1.17, -23.7);
g.add(ewer);
if (FURN.hw_vault) {
var v = FURN.hw_vault();
v.userData.furn = "hw_vault";
v.position.set(44.5, F, -43.76);
g.add(v);
PLN.vault = v;
}
IP.pg.add(g);
PLN.fixed = g;
},
function () {
if (IP.plnSpots)
return;
IP.plnSpots = true;
var F = IP.F;
function add(px, pz, r, how, what) {
var w = ipW(px, pz), s = { x: w.x, z: w.z, y: F, r: r, fn: function () { plxAct(how, what); }, when: plnMay };
Object.defineProperty(s, "name", { get: function () { var t = plxSay(how, what).name; return t.charAt(0).toUpperCase() + t.slice(1); } });
Object.defineProperty(s, "verb", { get: function () { return plxSay(how, what).verb; } });
IP.spots.push(s);
return s;
}
add(46, -31, 5, "sleep", "the King's great bed");
add(26.5, -24, 2.8, "nap", "the fur settle by the hearth");
add(-20, -63, 12.5, "wash", "the Hot Springs");
add(53.2, -23, 2.4, "wash", "the King's silver basin");
var dyn = { x: 0, z: 0, y: F, r: 0, fn: function () { if (dyn.how)
plxAct(dyn.how, dyn.what); }, when: function () { return !!dyn.how && plnMay(); } };
Object.defineProperty(dyn, "name", { get: function () { var t = plxSay(dyn.how, dyn.what).name; return t.charAt(0).toUpperCase() + t.slice(1); } });
Object.defineProperty(dyn, "verb", { get: function () { return plxSay(dyn.how, dyn.what).verb; } });
IP.spots.push(dyn);
PLN.dyn = dyn;
var vw = ipW(44.5, -42.6);
IP.spots.push({ x: vw.x, z: vw.z, y: F, r: 1.9, name: "🔐 Your hidden vault, behind the painting", verb: "open it",
fn: function () { plnVaultOpen(); }, when: function () { return plnMayFurnish() && !(typeof HV !== "undefined" && HV.open); } });
},
function () {
var d = PLN.dyn;
if (!d || !PLN.G)
return;
var L = worldLocal(), best = null, bd = 2.4, feet = L.y - 1.72;
PLN.G.children.forEach(function (o) {
var k = o.userData && o.userData.furn, f = typeof fnFurnHow === "function" ? fnFurnHow(k) : null;
if (!f)
return;
var how = f.how;
if (Math.abs(o.position.y - feet) > 1.2)
return;
var w = ipW(o.position.x, o.position.z), dist = Math.hypot(L.x - w.x, L.z - w.z);
if (dist < bd) {
bd = dist;
best = { how: how, k: f.k, x: w.x, z: w.z };
}
});
if (best) {
d.how = best.how;
d.x = best.x;
d.z = best.z;
d.r = 2.4;
d.what = "the " + best.k;
}
else {
d.how = null;
d.r = 0;
}
},
function (to) {
PLN.swingTo = to;
if (PLN.raf)
return;
var last = performance.now();
(function step(now) {
var dt = Math.min(0.05, (now - last) / 1000);
last = now;
PLN.swing += (PLN.swingTo - PLN.swing) * Math.min(1, dt * 6);
if (Math.abs(PLN.swingTo - PLN.swing) < 0.01)
PLN.swing = PLN.swingTo;
try {
var h = PLN.vault && PLN.vault.userData.hvHinge;
if (h)
h.rotation.y = -1.25 * PLN.swing;
}
catch (e) { }
if (PLN.swing !== PLN.swingTo)
PLN.raf = requestAnimationFrame(step);
else
PLN.raf = 0;
})(last);
},
function () {
var el = document.getElementById("pln-box");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "pln-box";
el.style.cssText = "position:fixed;left:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:47;display:none;width:min(330px,calc(100vw - 24px));max-height:calc(100vh - 180px);overflow-y:auto;" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:12px;font:13px var(--sans);color:var(--bone);box-sizing:border-box";
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
document.body.appendChild(el);
return el;
},
function () {
if (!plnMayFurnish())
return setStatus("Only the palace's holder, or the Keeper, furnishes it.");
PLN.edit = true;
PLN.draft = JSON.parse(JSON.stringify(plnList()));
if (typeof BF !== "undefined")
BF.start = JSON.parse(JSON.stringify(PLN.draft));
plnDraw(true);
plnPaint();
plnBtnPaint();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
},
function (msg) {
var el = plnBoxEl();
if (!el)
return;
if (!PLN.edit) {
el.style.display = "none";
return;
}
el.style.display = "block";
el.innerHTML = '<b style="color:var(--gold,#C9A868)">Furnishing the Palace of the North King</b>' +
'<div style="color:var(--dim);font-size:12px;line-height:1.5;margin:6px 0 8px">Walk to where you want something and place it; stand by a piece to turn it, move it or pick it up. Anywhere inside the palace walls. Nobody sees a change until you save it, then every visitor does.</div>' +
'<div style="display:flex;gap:6px;margin-bottom:6px"><select id="pln-kind" style="flex:1;min-width:0;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:5px">' +
furnList().map(function (k) { return '<option>' + k + '</option>'; }).join("") + '</select>' +
'<button class="btn" id="pln-place">Place here</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' +
'<button class="btn" id="pln-turn">Turn nearest</button><button class="btn" id="pln-move">Move nearest here</button>' +
'<button class="btn" id="pln-pick">Pick up nearest</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap">' +
'<button class="btn" id="pln-save">Save for everyone</button><button class="btn" id="pln-built">Back to as built</button>' +
'<button class="btn" id="pln-cancel">Leave it as it was</button></div>' +
'<div id="pln-msg" style="color:var(--dim);font-size:12px;margin-top:8px;min-height:16px">' + esc(msg || (PLN.draft.length + " pieces")) + '</div>';
var sel = document.getElementById("pln-kind");
try {
if (typeof sgFillSelect === "function" && typeof SG !== "undefined")
sgFillSelect(sel, PLN.draft, SG.pick);
}
catch (e) { }
try {
if (typeof bfFix === "function")
bfFix(sel);
}
catch (e) {
plxWarn("list", e);
}
var $ = function (i) { return document.getElementById(i); };
$("pln-place").onclick = function () { plnPlace($("pln-kind").value); };
$("pln-turn").onclick = function () { plnNearest(function (i) { PLN.draft[i].r = +(((PLN.draft[i].r || 0) + Math.PI / 4) % (Math.PI * 2)).toFixed(3); return "Turned."; }); };
$("pln-move").onclick = function () {
var h = plnHereSpot();
if (typeof h === "string")
return plnPaint(h);
plnNearest(function (i) { PLN.draft[i].x = h.x; PLN.draft[i].z = h.z; PLN.draft[i].y = h.y; return "Moved."; });
};
$("pln-pick").onclick = function () { plnNearest(function (i) { PLN.draft.splice(i, 1); return "Picked up."; }); };
$("pln-save").onclick = function () { plnSave(PLN.draft); };
$("pln-built").onclick = function () { PLN.draft = plnBuilt(); plnDraw(true); plnPaint("Back as built. Press Save to keep it that way."); };
$("pln-cancel").onclick = plnStop;
},
function () {
var L = worldLocal(), fx = -Math.sin(yaw), fz = -Math.cos(yaw), tx = L.x + fx * 1.6, tz = L.z + fz * 1.6, feet = L.y - 1.72;
var Z = ipZone({ x: tx, y: L.y, z: tz });
if (!Z || /road up/.test(Z.name))
return "That is outside the palace walls.";
var gy = typeof ipGround === "function" ? ipGround(tx, tz, feet) : null;
if (gy == null)
gy = feet;
var l = ipL(tx, tz), rw = Math.atan2(-fx, -fz);
return { x: +l.px.toFixed(2), z: +l.pz.toFixed(2), y: +(+gy).toFixed(2), r: +(rw + Math.PI / 2).toFixed(3) };
},
function (k) {
if (!k || !FURN[k])
return;
if (!(typeof bfFree === "function" && bfFree()) && typeof bfMay === "function" && !bfMay(k, PLN.draft))
return plnPaint("Bought pieces only: that one is not yours to set out.");
if (PLN.draft.length >= 300)
return plnPaint("That is as much as the palace's books can hold.");
var h = plnHereSpot();
if (typeof h === "string")
return plnPaint(h);
PLN.draft.push({ k: k, x: h.x, z: h.z, r: h.r, y: h.y });
if (typeof SG !== "undefined" && SG.by && SG.by[k])
SG.pick = k;
plnDraw(true);
plnPaint(k + " placed.");
},
function (fn) {
var L = worldLocal(), l = ipL(L.x, L.z), feet = L.y - 1.72, best = -1, bd = 3.2;
PLN.draft.forEach(function (p, i) { if (Math.abs((p.y != null ? p.y : IP.F) - feet) > 1.6)
return; var d = Math.hypot(p.x - l.px, p.z - l.pz); if (d < bd) {
bd = d;
best = i;
} });
if (best < 0)
return plnPaint("Nothing close enough: stand right by it.");
var m = fn(best);
plnDraw(true);
plnPaint(m);
},
function (list) {
var id = plxLotId(PLN_NAME);
if (!id) {
if (typeof loadLots === "function")
loadLots();
return plnPaint("The palace's books have not come in yet. Try Save again in a moment.");
}
plnPaint("Saving…");
cityRpc("set_lot_build", { p_lot: id, p_items: null, p_inside: list }).then(function (o) {
if (o !== "ok") {
var s = String(o || "That did not save.");
if (/holds this lot/i.test(s))
s = "Only the palace's holder can save its furnishing. The Keeper puts the palace in a dreamer's name on the address roll (admin page, Homes).";
return plnPaint(s);
}
var r = typeof lotByName === "function" ? lotByName(PLN_NAME) : null;
if (r) {
r.decor = r.decor || {};
r.decor.inside = JSON.parse(JSON.stringify(list));
}
if (typeof lotsAt !== "undefined")
lotsAt = 0;
PLN.edit = false;
PLN.draft = null;
if (typeof BF !== "undefined")
BF.start = null;
plnDraw(true);
plnPaint();
plnBtnPaint();
setStatus("<b>Saved.</b> The palace is furnished this way for everyone who comes in.");
}).catch(function (e) { plnPaint(String((e && e.message) || e)); });
},
function () {
if (typeof IPM === "undefined" || !IPM || typeof RSY === "undefined")
return;
var key = plnKey();
if (!key)
return;
var L = (typeof rsyLookFor === "function" && rsyLookFor(key)) || {}, sig = JSON.stringify(L);
if (sig === PLN.look)
return;
PLN.look = sig;
var M = IPM;
if (!PLN.orig) {
PLN.orig = {};
["wallIn", "floor", "stone", "trim"].forEach(function (n) { PLN.orig[n] = { c: M[n].color.getHex(), map: M[n].map || null }; });
}
function set(n, col, map) { var m = M[n], o = PLN.orig[n]; m.color.setHex(col == null ? o.c : col); var want = map === undefined ? o.map : map; if (m.map !== want) {
m.map = want;
m.needsUpdate = true;
} }
var wf = L.inFin, wcol = L.inWall ? rsySafe(L.inWall, 0.78) : (wf && wf !== "paint" && MATCOLOR[RSY_INTEX[wf]]) ? MATCOLOR[RSY_INTEX[wf]] : (wf === "paint" ? 0xA8B8CE : null);
set("wallIn", wcol, wf ? (wf === "paint" ? null : plnTexOf(RSY_INTEX[wf])) : undefined);
var fk = L.floor, fcol = L.floorCol ? rsySafe(L.floorCol, 0.78) : (fk ? (RSY_FLCOL[fk] || null) : null);
set("floor", fcol, fk ? (fk === "carpet" ? null : plnTexOf(RSY_FLTEX[fk])) : undefined);
var of = L.wallFin, ocol = L.wall ? rsySafe(L.wall) : (of && MATCOLOR[of]) ? MATCOLOR[of] : null;
set("stone", ocol, of ? plnTexOf(of === "siding" ? "wood" : of === "metal" ? "concrete" : of) : undefined);
set("trim", L.trim ? rsySafe(L.trim) : null, undefined);
},
function () {
if (PLH.mats)
return PLH.mats;
var lite = typeof LITE !== "undefined" && LITE;
function tap(kind) {
return wTex(lite ? 128 : 256, lite ? 192 : 384, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
if (kind === 0) {
g.addColorStop(0, "#0A1430");
g.addColorStop(1, "#1E3060");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var b = 0; b < 3; b++) {
x.strokeStyle = ["rgba(90,220,170,0.55)", "rgba(120,200,255,0.45)", "rgba(170,120,220,0.35)"][b];
x.lineWidth = W * 0.08;
x.beginPath();
x.moveTo(0, H * (0.15 + b * 0.08));
x.bezierCurveTo(W * 0.3, H * (0.05 + b * 0.1), W * 0.6, H * (0.35 + b * 0.05), W, H * (0.18 + b * 0.08));
x.stroke();
}
x.fillStyle = "#E8EEF6";
x.fillRect(0, H * 0.72, W, H * 0.28);
for (var h = 0; h < 4; h++) {
var hx = W * (0.12 + h * 0.22);
x.fillStyle = "#6A3A2A";
x.fillRect(hx, H * 0.64, W * 0.14, H * 0.1);
x.fillStyle = "#F4F8FF";
x.beginPath();
x.moveTo(hx - 4, H * 0.65);
x.lineTo(hx + W * 0.07, H * 0.57);
x.lineTo(hx + W * 0.14 + 4, H * 0.65);
x.fill();
x.fillStyle = "#FFD890";
x.fillRect(hx + W * 0.05, H * 0.68, W * 0.04, H * 0.03);
}
}
else if (kind === 1) {
g.addColorStop(0, "#1A2A5A");
g.addColorStop(1, "#3A4A7A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#F4E8B0";
x.beginPath();
x.arc(W * 0.75, H * 0.18, W * 0.1, 0, 7);
x.fill();
for (var r = 0; r < 4; r++) {
var rx = W * (0.15 + r * 0.18), ry = H * (0.55 - r * 0.08);
x.fillStyle = "#7A5A3A";
x.beginPath();
x.ellipse(rx, ry, W * 0.07, H * 0.025, -0.3, 0, 7);
x.fill();
x.fillRect(rx - W * 0.05, ry, W * 0.015, H * 0.04);
x.fillRect(rx + W * 0.03, ry - H * 0.01, W * 0.015, H * 0.04);
x.strokeStyle = "#C8B890";
x.lineWidth = 2;
x.beginPath();
x.moveTo(rx + W * 0.06, ry - H * 0.02);
x.lineTo(rx + W * 0.09, ry - H * 0.05);
x.moveTo(rx + W * 0.07, ry - H * 0.03);
x.lineTo(rx + W * 0.1, ry - H * 0.03);
x.stroke();
}
x.fillStyle = "#B83030";
x.fillRect(W * 0.72, H * 0.3, W * 0.16, H * 0.05);
x.fillStyle = "#E8EEF6";
x.fillRect(0, H * 0.8, W, H * 0.2);
}
else {
g.addColorStop(0, "#0E2240");
g.addColorStop(1, "#5A86B0");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#DCEAF6";
x.fillRect(0, H * 0.7, W, H * 0.3);
x.fillStyle = "#9ACCEA";
x.beginPath();
x.ellipse(W * 0.5, H * 0.66, W * 0.38, H * 0.08, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(W * 0.2, H * 0.62);
x.quadraticCurveTo(W * 0.5, H * 0.4, W * 0.82, H * 0.6);
x.fill();
x.fillStyle = "#C8E8FF";
x.beginPath();
x.moveTo(W * 0.75, H * 0.6);
x.lineTo(W * 0.92, H * 0.52);
x.lineTo(W * 0.86, H * 0.64);
x.fill();
}
x.strokeStyle = "#D8B650";
x.lineWidth = W * 0.04;
x.strokeRect(W * 0.03, W * 0.03, W * 0.94, H - W * 0.06);
for (var n = 0; n < 400; n++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.08) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
});
}
PLH.mats = { tap: [0, 1, 2].map(function (k) { return new THREE.MeshLambertMaterial({ map: tap(k) }); }), fir: new THREE.MeshLambertMaterial({ color: 0x1E4A2E }), firD: new THREE.MeshLambertMaterial({ color: 0x163A22 }),
red: new THREE.MeshPhongMaterial({ color: 0xB01E28, shininess: 80, specular: 0x664444 }), paper: new THREE.MeshLambertMaterial({ color: 0xEEE4C8 }) };
return PLH.mats;
},
function (S, D) {
var M = ipMats(), P = plhMats(), F = IP.F, lite = typeof LITE !== "undefined" && LITE;
if (M.floor) {
M.floor.userData.realRough = 0.7;
M.floor.shininess = 30;
M.floor.color = new THREE.Color(0x96A4B8);
M.floor.specular = new THREE.Color(0x3A4452);
M.floor.needsUpdate = true;
}
[-1, 1].forEach(function (s) {
var wx = s * 19.38;
for (var tz = -30; tz <= 30; tz += 10) {
if (lite && Math.abs(tz) % 20 === 10)
continue;
var t = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 5.4), P.tap[((tz + 30) / 10 + (s > 0 ? 1 : 0)) % 3]);
t.position.set(wx - s * 0.02, F + 6.2, tz);
t.rotation.y = -s * Math.PI / 2;
S.add(t);
ipB(S, 0.12, 0.14, 4.6, M.gold, wx - s * 0.04, F + 8.95, tz);
ipB(S, 0.08, 0.1, 4.4, M.gold, wx - s * 0.04, F + 3.45, tz);
}
for (var sz = -35; sz <= 35; sz += 10) {
ipB(S, 0.4, 0.08, 0.08, M.gold, wx - s * 0.2, F + 4.2, sz);
ipC(S, 0.22, 0.08, 0.3, M.crystal, wx - s * 0.42, F + 4.35, sz, 8);
ipS(S, 0.13, M.glowB, wx - s * 0.42, F + 4.55, sz, 8);
ipB(S, 0.06, 0.9, 0.06, M.gold, wx - s * 0.06, F + 3.8, sz);
}
var gl = ipC(S, 0.2, 0.2, 78, P.fir, wx - s * 0.22, F + 3.12, 0, 6);
gl.rotation.x = Math.PI / 2;
for (var bz = -38; bz <= 38; bz += lite ? 3 : 1.5) {
ipS(S, 0.11, (Math.round(bz * 2) % 3 === 0) ? P.red : M.gold, wx - s * 0.38, F + 2.85, bz, 6);
}
for (var cz = -30; cz <= 30; cz += 10) {
var bx = s * 16.9;
ipB(S, 0.9, 0.12, 5, M.gold, bx, F + 0.5, cz);
ipB(S, 0.86, 0.16, 4.9, M.velvet, bx, F + 0.64, cz);
ipB(S, 0.12, 0.8, 5, M.gold, bx + s * 0.42, F + 1.0, cz);
[-2.3, 2.3].forEach(function (e) { ipB(S, 0.8, 0.45, 0.1, M.gold, bx, F + 0.22, cz + e); });
ipBox(bx, cz, 0.5, 2.6, F, 1.2);
}
var fr = ipB(S, 3.4, 0.05, 2.4, M.fur, s * 6.2, F + 0.03, -14.8);
fr.rotation.y = s * 0.15;
var fx = s * 8.5, fz = 38;
ipC(S, 0.5, 0.6, 1.0, M.gold, fx, F + 0.5, fz, 12);
ipC(S, 0.18, 0.22, 1.2, M.woodD, fx, F + 1.4, fz, 6);
for (var k = 0; k < 5; k++) {
ipK(S, 2.8 - k * 0.5, 2.6, k % 2 ? P.firD : P.fir, fx, F + 2.6 + k * 1.5, fz, lite ? 8 : 12);
}
ipS(S, 0.3, M.glowW, fx, F + 10.2, fz, 8);
for (var b = 0; b < (lite ? 10 : 22); b++) {
var lv = b % 5, a = b * 2.399, rr = (2.5 - lv * 0.5) * 0.85;
ipS(S, 0.16, b % 3 ? M.gold : P.red, fx + Math.cos(a) * rr, F + 1.9 + lv * 1.5, fz + Math.sin(a) * rr, 6);
}
ipRound(fx, fz, 2.4, F, 11);
});
ipB(S, 2.2, 0.1, 1.0, M.woodD, -9, F + 0.85, -12.6);
[[-0.95, -0.4], [0.95, -0.4], [-0.95, 0.4], [0.95, 0.4]].forEach(function (q) { ipB(S, 0.1, 0.8, 0.1, M.woodD, -9 + q[0], F + 0.4, -12.6 + q[1]); });
ipB(S, 1.4, 0.02, 0.8, P.paper, -9, F + 0.91, -12.6);
ipC(S, 0.06, 0.06, 0.5, P.paper, -8.2, F + 0.95, -12.9, 8).rotation.z = Math.PI / 2;
ipC(S, 0.05, 0.06, 0.12, M.gold, -9.6, F + 0.96, -12.3, 8);
ipBox(-9, -12.6, 1.2, 0.6, F, 1);
},
function (G) {
var F = IP.F;
function put(seed, o, px, pz, rot, talk) { var g = wPerson(seed, o), w = ipW(px, pz); g.position.set(w.x, F, w.z); g.rotation.y = (rot || 0) - Math.PI / 2; G.add(g); IP.people.push({ g: g, y: F, name: talk && talk.name, t: talk || null, skate: null }); }
var lite = typeof LITE !== "undefined" && LITE, ctx = typeof IP_CTX === "string" ? IP_CTX : "";
var looks = [{ sex: "f", look: { top: 0x2A5A8A, topKind: "dress", bottom: 0x2A5A8A, layer: "cape", layerColor: 0xF4F2EC, hair: 0xD8C090, hairStyle: "bun", shoes: 0x1A1A22 } },
{ sex: "m", look: { top: 0x4A2A5A, topKind: "shirt", bottom: 0x2A2A3A, layer: "longcoat", layerColor: 0x3A1E4A, hair: 0x3A2A1A, hairStyle: "short", beard: "short", shoes: 0x1A1A22 } },
{ sex: "f", look: { top: 0x7A1E2A, topKind: "dress", bottom: 0x7A1E2A, hair: 0x1A1A1A, hairStyle: "long", shoes: 0x1A1A22 } },
{ sex: "m", look: { top: 0x1E4A3A, topKind: "shirt", bottom: 0x2A2A32, layer: "cloak", layerColor: 0x1E3478, hair: 0xC8C8D0, hairStyle: "short", beard: "full", shoes: 0x2A1A10 } },
{ sex: "f", look: { top: 0xE8E0F0, topKind: "dress", bottom: 0xE8E0F0, layer: "cape", layerColor: 0x6A8AB0, hair: 0x8A4A2A, hairStyle: "braids", shoes: 0x3A2A1A } },
{ sex: "m", look: { top: 0x2A3A5A, topKind: "shirt", bottom: 0x1A2232, layer: "longcoat", layerColor: 0x2A3A5A, hair: 0xB89060, hairStyle: "short", shoes: 0x1A1A22 } }];
var cour = { name: "A courtier of the North", persona: ctx + " You are a courtier of the King of the North, waiting in the Throne Hall for an audience: well-mannered, a little gossipy, full of news of the village, the reindeer races and the coming feast.", greet: "Good day. The King hears petitions after the bells; we have been waiting since breakfast." };
var spots = [[10.5, 2, -2.2], [10.5, 3.3, -1.2], [-10.5, 8, 2.0], [-10.5, 9.2, 1.2], [-10.5, 7.0, 1.6], [10.5, 20, -2.0], [10.5, 21.2, -1.0], [-10.5, 28, 2.2], [-10.5, 29.3, 1.0]];
spots.forEach(function (q, i) { if (lite && i % 2)
return; put("plhc" + i, looks[i % looks.length], q[0], q[1], q[2], cour); });
put("plh_scribe", { sex: "m", look: { top: 0x3A3A4A, topKind: "robe", bottom: 0x2A2A32, hair: 0x6A5A4A, hairStyle: "short", shoes: 0x1A1A22 } }, -9, -11.7, Math.PI, { name: "Arne, Scribe of Petitions", persona: ctx + " You are Arne, the King's scribe of petitions: careful, patient, dry. You write down every petition brought to the throne and tell people when the King will hear them.", greet: "Your name and your petition, please, and spell anything unusual." });
}
];
});
