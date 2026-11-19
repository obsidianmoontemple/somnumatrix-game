/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(442, function () {
"use strict";
return [
function (force) {
var r = fscRen();
if (!r || !fscTouch() || fscInVR() || (typeof VRM !== "undefined" && VRM && VRM.card))
return;
try {
var gl = r.getContext && r.getContext();
if (gl && gl.isContextLost && gl.isContextLost())
return;
var w = innerWidth, h = innerHeight, cv = r.domElement, pr = r.getPixelRatio();
if (!force && cv.width === Math.floor(w * pr) && cv.height === Math.floor(h * pr))
return;
if (typeof GFX !== "undefined" && GFX && typeof gfxPixelRatio === "function" && typeof GFX_PHONE !== "undefined" && GFX_PHONE) {
var np = gfxPixelRatio();
if (np !== pr) {
r.setPixelRatio(np);
pr = np;
}
}
if (typeof camera !== "undefined" && camera && camera.isPerspectiveCamera) {
camera.aspect = w / h;
camera.updateProjectionMatrix();
}
r.setSize(w, h);
FSC.heals = (FSC.heals | 0) + 1;
}
catch (e) { }
},
function () {
var c = fscCfg();
function sel(id, v, opts) { return "<select id='" + id + "' style='width:100%'>" + opts.map(function (p) { return "<option value='" + p[0] + "'" + (String(v) === p[0] ? " selected" : "") + ">" + p[1] + "</option>"; }).join("") + "</select>"; }
var note = fscCan() ? "Remembered on this device. If it is on, the game goes full screen again at your first click or tap." :
"This browser cannot go full screen from a page. On an iPhone or iPad: Share, then Add to Home Screen, and open the game from there.";
return "<h3 style='font-weight:500;margin:18px 0 6px;color:var(--bone)'>Screen</h3>" +
"<label for='fsc-on'>Full screen</label>" + sel("fsc-on", fscIsOn() || c.on ? "1" : "0", [["0", "Off"], ["1", "On: no browser bars, edge to edge"]]) +
"<div style='font-size:12px;color:var(--dim);margin:4px 0 0'>" + note + "</div>" +
"<label for='fsc-turn' style='margin-top:10px'>Screen turning (tablets and phones)</label>" + sel("fsc-turn", c.turn, [["any", "Follow the device: sideways or upright"], ["landscape", "Keep sideways"], ["portrait", "Keep upright"]]) +
"<div style='font-size:12px;color:var(--dim);margin:4px 0 0'>Keeping it one way holds while in full screen.</div>" +
"<label for='fsc-corner' style='margin-top:10px'>Full screen button in the corner</label>" + sel("fsc-corner", c.btn ? "1" : "0", [["1", "Show"], ["0", "Hide (F11 and the Menu still work)"]]);
},
function () {
var have = document.getElementById("fsc-set");
var anchor = document.getElementById("advanced");
if (!anchor || !anchor.parentNode)
return;
if (!have) {
have = document.createElement("div");
have.id = "fsc-set";
have.style.cssText = "margin:12px 0";
anchor.parentNode.insertBefore(have, anchor);
}
have.innerHTML = fscSetHtml();
var a = document.getElementById("fsc-on"), t = document.getElementById("fsc-turn"), b = document.getElementById("fsc-corner"), c = fscCfg();
if (a)
a.onchange = function () { c.on = a.value === "1"; fscSave(); if (c.on)
fscEnter();
else
fscExit(); fscPaint(); };
if (t)
t.onchange = function () { c.turn = t.value; fscSave(); fscTurn(); };
if (b)
b.onchange = function () { c.btn = b.value === "1"; fscSave(); fscPaint(); };
}
];
});
