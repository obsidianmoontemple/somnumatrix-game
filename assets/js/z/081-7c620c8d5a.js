/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(81, function () {
"use strict";
return [
function (e, idx) {
if (!ATLC)
return;
var d = e.data || {}, sp = idx[e.key];
if (e.op === "add") {
if (sp || !KIT[d.arch])
return;
var r = somnucorRealm();
if (!r)
return;
sp = { id: e.key, archetype: d.arch, label: d.name || null, name: d.name || null, named: d.name ? "stated" : null, attrs: d.s ? { s: +d.s } : {},
x: ATLC.x + (+d.x || 0), z: ATLC.z + (+d.z || 0), rot: +d.rot || 0, solid: KIT[d.arch].cat !== "being" && !(typeof ATL_WALKTHROUGH !== "undefined" && ATL_WALKTHROUGH[d.arch]),
detail: 3, nights: [store.session], realm: r.id, hub: true, city: true, addr: null, peopled: true, added: true };
if (d.sign) {
sp.sign = d.sign;
sp.note = d.note || "";
}
store.objects.push(sp);
idx[sp.id] = sp;
addMesh(sp);
wallsAt = -1;
return;
}
if (!sp)
return;
if (e.op === "restore") {
if (sp.added) {
removeSpec(sp);
delete idx[sp.id];
wallsAt = -1;
return;
}
var s0 = seedOf(sp);
sp.x = s0.x;
sp.z = s0.z;
sp.rot = s0.rot;
sp.attrs = JSON.parse(JSON.stringify(s0.attrs));
sp.label = s0.label;
sp.name = s0.name;
sp.sign = s0.sign;
sp.note = s0.note;
sp._removed = false;
delete cityRemoved[sp.id];
if (store.objects.indexOf(sp) < 0)
store.objects.push(sp);
redraw(sp);
return;
}
seedOf(sp);
if (e.op === "move") {
sp.x = ATLC.x + (+d.x || 0);
sp.z = ATLC.z + (+d.z || 0);
var g = meshes[sp.id];
if (g) {
g.position.set(sp.x, terrainY(sp.x, sp.z) + (sp.y || 0), sp.z);
}
wallsAt = -1;
if (typeof surfAt !== "undefined")
surfAt = -1;
}
else if (e.op === "turn") {
sp.rot = +d.rot || 0;
if (meshes[sp.id])
meshes[sp.id].rotation.y = sp.rot;
wallsAt = -1;
}
else if (e.op === "scale") {
sp.attrs = Object.assign({}, sp.attrs || {}, { s: Math.max(0.1, Math.min(6, +d.s || 1)) });
redraw(sp);
}
else if (e.op === "rename") {
sp.label = d.name || null;
sp.name = d.name || null;
if (d.sign !== undefined) {
sp.sign = d.sign;
}
if (d.note !== undefined)
sp.note = d.note;
redraw(sp);
}
else if (e.op === "remove") {
sp._removed = true;
cityRemoved[sp.id] = sp;
if (meshes[sp.id]) {
scene.remove(meshes[sp.id]);
delete meshes[sp.id];
}
var i = store.objects.indexOf(sp);
if (i > -1)
store.objects.splice(i, 1);
wallsAt = -1;
}
},
function () {
var P = camera.position, list = [];
store.objects.forEach(function (o) {
if (!o.city || SHAPE_SKIP[o.archetype])
return;
var d = Math.hypot(o.x - P.x, o.z - P.z);
if (d < 30)
list.push({ o: o, d: d });
});
Object.keys(cityRemoved).forEach(function (k) { var o = cityRemoved[k]; var d = Math.hypot(o.x - P.x, o.z - P.z); if (d < 30)
list.push({ o: o, d: d + 0.01 }); });
list.sort(function (a, b) { return a.d - b.d; });
var pick = list.length ? list[shapeSkip % list.length].o : null;
if (pick !== shapeTarget) {
shapeTarget = pick;
paintShape();
}
if (!shapeRing && scene) {
shapeRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.12, 6, 40), new THREE.MeshBasicMaterial({ color: 0xFFD27A }));
shapeRing.rotation.x = Math.PI / 2;
scene.add(shapeRing);
}
if (shapeRing) {
shapeRing.visible = !!shapeTarget;
if (shapeTarget) {
var k = KIT[shapeTarget.archetype], s = ((shapeTarget.attrs && shapeTarget.attrs.s) || 1), rr = k ? Math.max(k.size[0], k.size[2]) * s * 0.6 + 1 : 2;
shapeRing.scale.set(rr, rr, rr);
shapeRing.position.set(shapeTarget.x, terrainY(shapeTarget.x, shapeTarget.z) + 0.3, shapeTarget.z);
}
}
},
function (msg) {
var el = shapeEl();
if (!el)
return;
if (!shapeOpen) {
el.style.display = "none";
return;
}
el.style.display = "block";
var t = shapeTarget, nm = t ? (t.label || t.name || t.sign || t.archetype) : null;
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="color:var(--gold,#C9A868)">Shaping Somnucor</b>' +
'<button class="btn" id="sh-close">Done</button></div>' +
'<div style="color:var(--dim);font-size:12px;line-height:1.5;margin-bottom:8px">What you change here changes for every dreamer. The ringed thing is what you are working on: walk up to it, or press <b>Next</b> for the one beyond.</div>' +
'<div style="margin-bottom:8px">' + (t ? ('<b>' + esc(nm) + '</b> <span style="color:var(--dim)">· ' + esc(t.archetype) + (t.added ? " · added by a keeper" : "") + (t._removed ? " \u00b7 taken away" : "") + '</span>') : '<span style="color:var(--dim)">Nothing close enough — walk up to what you mean to change.</span>') + '</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">' +
'<button class="btn" id="sh-next">Next</button><button class="btn" id="sh-move">Move it here</button><button class="btn" id="sh-turn">Turn it</button>' +
'<button class="btn" id="sh-big">Bigger</button><button class="btn" id="sh-small">Smaller</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' +
'<button class="btn" id="sh-name">Rename</button><button class="btn" id="sh-remove">Take it away</button><button class="btn" id="sh-restore">Put back as planned</button></div>' +
'<div style="display:flex;gap:6px"><select id="sh-kind" style="flex:1;min-width:0;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:5px">' +
shapeKinds().map(function (k) { return '<option>' + k + '</option>'; }).join("") + '</select><button class="btn" id="sh-add">Set it down here</button></div>' +
'<div id="sh-msg" style="color:var(--dim);font-size:12px;margin-top:8px;min-height:16px">' + (msg ? esc(msg) : "") + '</div>';
var $ = function (i) { return document.getElementById(i); };
$("sh-close").onclick = function () { shapeOpen = false; paintShape(); paintShapeButton(); };
$("sh-next").onclick = function () { shapeSkip++; shapeTarget = null; shapeFind(); };
$("sh-move").onclick = function () { if (!t)
return; var h = shapeHere(); shapeSend(t.id, "move", { x: h.x, z: h.z }, "Moved."); };
$("sh-turn").onclick = function () { if (!t)
return; shapeSend(t.id, "turn", { rot: +(((t.rot || 0) + Math.PI / 12) % (Math.PI * 2)).toFixed(4) }, "Turned."); };
$("sh-big").onclick = function () { if (!t)
return; shapeSend(t.id, "scale", { s: +(((t.attrs && t.attrs.s) || 1) * 1.15).toFixed(3) }, "Bigger."); };
$("sh-small").onclick = function () { if (!t)
return; shapeSend(t.id, "scale", { s: +(((t.attrs && t.attrs.s) || 1) / 1.15).toFixed(3) }, "Smaller."); };
$("sh-name").onclick = function () {
if (!t)
return;
var n = prompt("What is it called? (Leave empty for no name.)", t.label || t.sign || "");
if (n === null)
return;
var note = t.archetype === "signboard" ? prompt("What does the board say beneath its name?", t.note || "") : undefined;
var data = { name: n.trim() || null };
if (t.sign !== undefined || t.archetype === "signboard")
data.sign = n.trim() || null;
if (note !== undefined && note !== null)
data.note = note;
shapeSend(t.id, "rename", data, "Renamed.");
};
$("sh-remove").onclick = function () { if (!t)
return; if (!confirm("Take " + nm + " away, for everyone?"))
return; shapeSend(t.id, "remove", null, "Taken away, for everyone."); };
$("sh-restore").onclick = function () { if (!t)
return; shapeSend(t.id, "restore", null, "Back as the plan laid it."); };
$("sh-add").onclick = function () {
var k = $("sh-kind").value, h = shapeHere(), fwd = 6;
var nmNew = prompt("A name for it? (Optional.)", "") || "";
var data = { arch: k, x: +(h.x + h.fx * fwd).toFixed(2), z: +(h.z + h.fz * fwd).toFixed(2), rot: +(Math.atan2(-h.fx, -h.fz)).toFixed(4) };
if (nmNew.trim()) {
data.name = nmNew.trim();
if (k === "signboard") {
data.sign = data.name;
data.note = prompt("What does the board say?", "") || "";
}
}
shapeSend(null, "add", data, "Set down.");
};
},
function (key, op, data, ok) {
cityRpc("city_edit", { p_key: key, p_op: op, p_data: data }).then(function (id) {
if (typeof id !== "number" && typeof id !== "string") {
paintShape("That didn't take.");
return;
}
var idx = cityIndex();
var e = { id: +id, key: op === "add" ? ("new:" + id) : key, op: op, data: data };
applyCityEdit(e, idx);
if (+id > cityEditAt && +id === cityEditAt + 1)
cityEditAt = +id;
shapeTarget = null;
cullAt = 0;
paintShape(ok);
}).catch(function (e) { paintShape((e && e.message) || "That didn't take. Try again in a moment."); });
}
];
});
