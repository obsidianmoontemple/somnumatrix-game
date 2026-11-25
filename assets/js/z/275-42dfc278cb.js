/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(275, function () {
"use strict";
return [
function (label, secure) {
var key = label + "|" + (secure ? 1 : 0);
if (WG.sign[key])
return WG.sign[key];
var c = document.createElement("canvas");
c.width = 512;
c.height = secure ? 150 : 112;
var x = c.getContext("2d");
x.fillStyle = "#1C3350";
x.fillRect(0, 0, c.width, c.height);
x.strokeStyle = "#C9A86A";
x.lineWidth = 5;
x.strokeRect(5, 5, c.width - 10, c.height - 10);
x.fillStyle = "#F4F1E8";
x.textAlign = "center";
x.textBaseline = "middle";
var fs = 52;
x.font = "bold " + fs + "px system-ui,sans-serif";
while (x.measureText(label).width > 470 && fs > 22) {
fs -= 2;
x.font = "bold " + fs + "px system-ui,sans-serif";
}
x.fillText(label, 256, secure ? 54 : 58);
if (secure) {
x.fillStyle = "#F0B848";
x.font = "600 30px system-ui,sans-serif";
x.fillText("Staff only · badge access", 256, 114);
}
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace && "colorSpace" in t)
t.colorSpace = THREE.SRGBColorSpace;
return (WG.sign[key] = { t: t, h: c.height / c.width });
},
function (label, secure) {
var k = "wgsign:" + (secure ? "!" : "") + label;
if (FURN[k])
return k;
wgPiece(k, 1.6, 0.1, false, true, function () {
var T = wgSignTex(label, secure), g = new THREE.Group(), w = 1.5, h = w * T.h;
var m = new THREE.MeshBasicMaterial({ map: T.t });
var a = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
a.position.set(0, 2.62 + (secure ? 0.05 : 0), 0.1);
g.add(a);
var b = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
b.position.set(0, 2.62 + (secure ? 0.05 : 0), -0.1);
b.rotation.y = Math.PI;
g.add(b);
return g;
});
return k;
}
];
});
