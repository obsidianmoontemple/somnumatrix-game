/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var plotOn = false, plotBusy = false, plotArmed = null, plotSel = null, plotRing = null;
var plotGround = null, plotRay = null;
function plotInit() {
plotGround = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
plotRay = new THREE.Raycaster();
var sel = document.getElementById("p-kind");
var groups = { structure: "Buildings", nature: "Land and water", infra: "Streets and things", vehicle: "Vehicles", being: "Figures" };
var html = "";
Object.keys(groups).forEach(function (cat) {
var names = Object.keys(KIT).filter(function (k) { return KIT[k].cat === cat; }).sort();
if (!names.length)
return;
html += '<optgroup label="' + groups[cat] + '">' + names.map(function (n) {
return '<option value="' + n + '">' + n.replace(/([a-z])([A-Z])/g, "$1 $2") + "</option>";
}).join("") + "</optgroup>";
});
sel.innerHTML = html;
sel.value = "house";
var el = renderer.domElement;
el.addEventListener("pointerdown", plotDown);
addEventListener("pointermove", plotMove);
addEventListener("pointerup", plotUp);
el.addEventListener("contextmenu", function (e) { if (plotOn)
e.preventDefault(); });
}
function setPlot(on) { return __ZC(65, 0, this, arguments, new.target); }
function plotStatus(t) { document.getElementById("p-status").textContent = t; }
function ndc(e) { return { x: (e.clientX / innerWidth) * 2 - 1, y: -(e.clientY / innerHeight) * 2 + 1 }; }
function groundAt(e) {
plotRay.setFromCamera(ndc(e), camera);
var v = new THREE.Vector3();
return plotRay.ray.intersectPlane(plotGround, v) ? v : null;
}
function objectAt(e) { return __ZC(65, 1, this, arguments, new.target); }
function plotSelect(spec) { return __ZC(65, 2, this, arguments, new.target); }
function nearestFreeLot(x, z, maxd) { return __ZC(65, 3, this, arguments, new.target); }
function releaseLot(o) { releaseLots(o); }
function settle(o, x, z) { return __ZC(65, 4, this, arguments, new.target); }
function plotPlace(arch, x, z) { return __ZC(65, 5, this, arguments, new.target); }
var plotDrag = null;
function plotDown(e) { return __ZC(65, 6, this, arguments, new.target); }
function plotMove(e) {
if (!plotDrag)
return;
var g = groundAt(e);
if (!g)
return;
plotDrag.moved = true;
var o = plotDrag.spec, m = meshes[o.id];
if (m) {
m.position.x = g.x;
m.position.z = g.z;
}
if (plotRing) {
plotRing.position.x = g.x;
plotRing.position.z = g.z;
}
plotDrag.x = g.x;
plotDrag.z = g.z;
}
function plotUp() {
if (!plotDrag) {
return;
}
var d = plotDrag;
plotDrag = null;
plotBusy = false;
if (d.moved)
settle(d.spec, d.x, d.z);
}
function plotTurn(dir) {
if (!plotSel)
return;
plotSel.rot = (plotSel.rot || 0) + dir * Math.PI / 12;
refresh(plotSel);
plotSelect(plotSel);
save();
}
function plotFloors(dir) {
if (!plotSel)
return;
var base = LEVELS[plotSel.archetype];
if (!base) {
plotStatus("A " + plotSel.archetype + " has no floors to add.");
return;
}
var lv = (plotSel.attrs.lv || base) + dir;
plotSel.attrs.lv = Math.max(1, Math.min(120, lv));
refresh(plotSel);
plotSelect(plotSel);
save();
}
function plotRemove() { return __ZC(65, 7, this, arguments, new.target); }
function panOrbit(dx, dy) {
var sc = orb.r / 600, c = Math.cos(orb.t), s = Math.sin(orb.t);
orb.tx += (-s * dx - c * dy) * sc;
orb.tz += (c * dx - s * dy) * sc;
}
function plotKeys(dt) { return __ZC(65, 8, this, arguments, new.target); }
function plotKeyDown(e) { return __ZC(65, 9, this, arguments, new.target); }
function wirePlot() {
var $ = function (i) { return document.getElementById(i); };
plotInit();
$("plotbtn").addEventListener("click", function () { setPlot(true); });
$("p-done").addEventListener("click", function () { setPlot(false); });
$("p-place").addEventListener("click", function () {
plotArmed = $("p-kind").value;
this.classList.add("on");
plotStatus("Click the ground to place a " + plotArmed + ". Hold shift to place several.");
});
$("p-rotl").addEventListener("click", function () { plotTurn(-1); });
$("p-rotr").addEventListener("click", function () { plotTurn(1); });
$("p-down").addEventListener("click", function () { plotFloors(-1); });
$("p-up").addEventListener("click", function () { plotFloors(1); });
$("p-del").addEventListener("click", plotRemove);
$("p-detail").addEventListener("click", function () { if (plotSel)
openInspect(plotSel.id); });
addEventListener("keydown", function (e) { if (plotKeyDown(e)) {
e.preventDefault();
e.stopImmediatePropagation();
} }, true);
}
function frameTown() { return __ZC(65, 10, this, arguments, new.target); }
