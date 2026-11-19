/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(207, function () {
"use strict";
return [
function (sp) {
var g = new THREE.Group();
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d");
x.strokeStyle = "#FFB060";
x.lineWidth = 4;
x.beginPath();
x.arc(32, 32, 22, 0, 6.283);
x.stroke();
x.beginPath();
x.moveTo(32, 14);
x.lineTo(32, 50);
x.moveTo(20, 26);
x.lineTo(44, 38);
x.moveTo(44, 26);
x.lineTo(20, 38);
x.stroke();
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, opacity: 0.55, depthWrite: false }));
var face = sp.S.side === "back" ? 0 : (sp.S.side === "left" ? Math.PI / 2 : -Math.PI / 2);
m.rotation.y = face;
var off = 0.95;
m.position.set(sp.x + (sp.S.side === "left" ? -off : sp.S.side === "right" ? off : 0), sp.y + 0.55, sp.z + (sp.S.side === "back" ? -off : 0));
g.add(m);
g.userData.noCull = 1;
INT.root.add(g);
return g;
},
function () {
CSEC.int = INT;
CSEC.marks = [];
var rooms = csecRooms();
for (var L = 0; L < Math.min(rooms.length, INT.levels || 1); L++) {
var sp = csecSpot(rooms[L], L);
if (!sp)
continue;
try {
csecMark(sp);
}
catch (e) { }
CSEC.marks.push(sp);
}
var f = csecFound(), n = CSEC.marks.filter(function (s) { return f[s.k]; }).length;
setStatus("<b>" + esc(typeof placeName === "function" ? placeName(INT.spec) : "The castle") + "</b> keeps " + CSEC.marks.length + " secrets, one in each hall. You have found <b>" + n + "</b>. " +
(n < CSEC.marks.length ? "Look for a faint ember rune low on a wall." : "You know every one of them."));
},
function (sp) {
var f = csecFound(), first = !f[sp.k];
f[sp.k] = Date.now();
csecSave(f);
var n = CSEC.marks.filter(function (s) { return f[s.k]; }).length;
var html = "<b style='font-size:15px'>" + esc(sp.S.name) + "</b><div style='margin:8px 0;line-height:1.55'>" + esc(sp.S.text) + "</div>" +
"<div style='color:#C9A868'>" + (first ? "A secret found. " : "") + "Secrets of the castle: <b>" + n + " of " + CSEC.marks.length + "</b></div>";
if (typeof worldCard === "function")
worldCard(html, {});
else
setStatus(html);
}
];
});
