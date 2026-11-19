/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var cityEditAt = 0, cityEditCool = 0, cityEditBusy = false, shapeOpen = false, shapeTarget = null, shapeSkip = 0, shapeRing = null;
var cityRemoved = {};
function cityIndex() {
var m = {};
Object.keys(cityRemoved).forEach(function (k) { m[k] = cityRemoved[k]; });
store.objects.forEach(function (o) { if (o.city)
m[o.id] = o; });
return m;
}
function seedOf(sp) {
if (!sp._seed)
sp._seed = { x: sp.x, z: sp.z, rot: sp.rot || 0, attrs: JSON.parse(JSON.stringify(sp.attrs || {})), label: sp.label, name: sp.name, sign: sp.sign, note: sp.note };
return sp._seed;
}
function redraw(sp) {
var had = meshes[sp.id], vis = had ? had.visible : true;
if (had)
scene.remove(had);
addMesh(sp);
if (meshes[sp.id])
meshes[sp.id].visible = vis;
wallsAt = -1;
if (typeof surfAt !== "undefined")
surfAt = -1;
}
function applyCityEdit(e, idx) { return __ZC(80, 0, this, arguments, new.target); }
function loadCityEdits(fromStart) {
if (cityEditBusy || typeof fetch !== "function" || !cloudOn())
return Promise.resolve(0);
cityEditBusy = true;
var after = fromStart ? 0 : cityEditAt;
return restRpc("city_edits_since", { p_after: after }).then(function (rows) {
cityEditBusy = false;
if (!Array.isArray(rows) || !rows.length)
return 0;
var idx = cityIndex();
rows.forEach(function (e) { applyCityEdit(e, idx); cityEditAt = Math.max(cityEditAt, +e.id || 0); });
cullAt = 0;
return rows.length;
}).catch(function () { cityEditBusy = false; return 0; });
}
function cityShapeTick(dt) {
var r = somnucorRealm();
if (!r || !ATLC)
return;
cityEditCool -= dt;
if (cityEditCool <= 0 && (store.here || 0) === r.id) {
cityEditCool = 45;
loadCityEdits(false);
}
paintShapeButton();
if (shapeOpen)
shapeFind();
}
function shapeEl() {
var el = document.getElementById("shape");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "shape";
el.style.cssText = "position:fixed;left:12px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:47;display:none;width:min(340px,calc(100vw - 24px));" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:12px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
var b = document.createElement("button");
b.id = "shape-btn";
b.type = "button";
b.style.cssText = "position:fixed;left:12px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:46;display:none;" +
"background:rgba(10,12,18,.92);color:var(--gold,#C9A868);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:8px 12px;font:13px var(--sans);cursor:pointer";
b.textContent = "Shape the city";
b.onclick = function () { shapeOpen = true; shapeSkip = 0; paintShape(); };
document.body.appendChild(b);
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
return el;
}
function paintShapeButton() {
shapeEl();
var b = document.getElementById("shape-btn");
if (!b)
return;
var r = somnucorRealm();
var show = walkMode && !store.inside && r && (store.here || 0) === r.id && (typeof mayShape === "function" && mayShape()) && !shapeOpen;
b.style.display = show ? "block" : "none";
if (!shapeOpen) {
var el = document.getElementById("shape");
if (el)
el.style.display = "none";
if (shapeRing)
shapeRing.visible = false;
}
}
var SHAPE_SKIP = { road: 1, groundpad: 1, lawn: 1, snowfield: 1, blossomground: 1, leaffall: 1, zengarden: 1 };
function shapeFind() { return __ZC(80, 1, this, arguments, new.target); }
var SHAPE_KINDS = null;
function shapeKinds() {
if (SHAPE_KINDS)
return SHAPE_KINDS;
SHAPE_KINDS = Object.keys(KIT).filter(function (k) { var c = KIT[k].cat; return (c === "structure" || c === "infra" || c === "nature" || c === "vehicle") && !SHAPE_SKIP[k]; }).sort();
return SHAPE_KINDS;
}
function paintShape(msg) { return __ZC(80, 2, this, arguments, new.target); }
function shapeHere() {
var P = camera.position;
return { x: +(P.x - ATLC.x).toFixed(2), z: +(P.z - ATLC.z).toFixed(2), fx: -Math.sin(yaw), fz: -Math.cos(yaw) };
}
function shapeSend(key, op, data, ok) { return __ZC(80, 3, this, arguments, new.target); }
(function () {
if (typeof setPlot !== "function")
return;
var _setPlot = setPlot;
setPlot = function (on) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (on && r && (store.here || 0) === r.id) {
setStatus("<b>Somnucor is one city, shared by every dreamer.</b> " +
((typeof amKeeper === "function" && amKeeper()) ? "Walk it and press <b>Shape the city</b> to change it for everyone." : "Its keeper shapes it; the ground you hold, you may raise and dress from its own board."));
return;
}
return _setPlot.apply(this, arguments);
};
})();
