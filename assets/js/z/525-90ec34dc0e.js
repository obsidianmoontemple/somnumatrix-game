/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(525, function () {
return [
function (col, glow) {
var k = (col || "gold") + (glow ? "!" : "");
if (KC_MAT[k])
return KC_MAT[k];
var c = KC_COL[col] || KC_COL.gold;
var m = new THREE.MeshStandardMaterial({ color: c[0], roughness: c[1], metalness: c[2] });
if (glow || col === "ember") {
m.emissive = new THREE.Color(c[0]);
m.emissiveIntensity = col === "ember" ? 0.9 : 0.35;
}
if (col === "crystal" || col === "ice") {
m.transparent = true;
m.opacity = 0.8;
}
m.userData.noPhoto = 1;
return (KC_MAT[k] = m);
},
function (model, col) {
var g = new THREE.Group(), M = kcMat(col), B = kcBoxG(), C = kcCylG(), S = kcSphG(), T = kcTorG(), K = kcConeG(), W = kcMat("darkoak"), Gd = kcMat("gold");
switch (model) {
case "chest":
kcAdd(g, B, kcMat(col === "gold" ? "darkoak" : col), 0, 0.14, 0, 0, 0, 0, 0.5, 0.28, 0.32);
kcAdd(g, C, kcMat(col === "gold" ? "darkoak" : col), 0, 0.28, 0, 0, 0, Math.PI / 2, 0.16, 0.5, 0.16);
kcAdd(g, B, Gd, 0, 0.16, 0.165, 0, 0, 0, 0.08, 0.1, 0.02);
[-0.2, 0.2].forEach(function (x) { kcAdd(g, B, kcMat("iron"), x, 0.2, 0, 0, 0, 0, 0.03, 0.42, 0.34); });
break;
case "coins":
for (var i = 0; i < 9; i++) {
var a = i * 2.4, r = i ? 0.06 + 0.03 * (i % 3) : 0;
kcAdd(g, C, M, Math.cos(a) * r, 0.01 + Math.floor(i / 3) * 0.012, Math.sin(a) * r, (i % 2) * 0.2, 0, (i % 3) * 0.15, 0.05, 0.012, 0.05);
}
kcAdd(g, S, kcMat("hide"), 0.14, 0.05, 0.02, 0, 0, 0, 0.08, 0.06, 0.08);
break;
case "ring":
kcAdd(g, T, M, 0, 0.07, 0, Math.PI / 2.4, 0, 0, 0.06);
kcAdd(g, S, kcMat("emerald", true), 0, 0.13, 0.02, 0, 0, 0, 0.022);
break;
case "gem":
kcAdd(g, kcG("oct", function () { return new THREE.OctahedronGeometry(1, 0); }), kcMat(col, true), 0, 0.12, 0, 0, 0.4, 0, 0.09, 0.12, 0.09);
break;
case "statue":
kcAdd(g, C, kcMat("marble"), 0, 0.04, 0, 0, 0, 0, 0.1, 0.08, 0.1);
kcAdd(g, kcLathe("robe", [[0, 0], [0.07, 0], [0.06, 0.12], [0.045, 0.24], [0.05, 0.28], [0.03, 0.31], [0, 0.31]]), M, 0, 0.08, 0);
kcAdd(g, S, M, 0, 0.42, 0, 0, 0, 0, 0.028, 0.034, 0.03);
break;
case "cup":
kcAdd(g, kcLathe("cup", [[0, 0], [0.05, 0], [0.05, 0.01], [0.015, 0.03], [0.015, 0.07], [0.09, 0.1], [0.1, 0.14], [0.092, 0.14], [0.08, 0.105], [0, 0.1]]), M, 0, 0, 0);
[-1, 1].forEach(function (s) { kcAdd(g, T, M, s * 0.1, 0.12, 0, 0, 0, Math.PI / 2, 0.03); });
break;
case "amphora":
kcAdd(g, kcLathe("amph", [[0, 0], [0.03, 0.01], [0.07, 0.08], [0.11, 0.2], [0.1, 0.3], [0.05, 0.38], [0.04, 0.46], [0.055, 0.48], [0, 0.48]]), M, 0, 0, 0);
[-1, 1].forEach(function (s) { kcAdd(g, T, M, s * 0.06, 0.41, 0, 0, Math.PI / 2, 0, 0.035, 0.05, 0.035); });
break;
case "scroll":
kcAdd(g, C, kcMat(col === "gold" ? "wax" : col), 0, 0.04, 0, 0, 0, Math.PI / 2, 0.04, 0.3, 0.04);
[-0.16, 0.16].forEach(function (x) { kcAdd(g, C, W, x, 0.04, 0, 0, 0, Math.PI / 2, 0.012, 0.05, 0.012); });
kcAdd(g, B, kcMat("red"), 0, 0.04, 0.04, 0, 0, 0, 0.04, 0.03, 0.01);
break;
case "crown":
kcAdd(g, kcG("crown", function () { return new THREE.CylinderGeometry(0.1, 0.1, 0.07, 20, 1, true); }), M, 0, 0.035, 0);
for (var c = 0; c < 8; c++) {
var ca = c / 8 * Math.PI * 2;
kcAdd(g, K, M, Math.cos(ca) * 0.1, 0.09, Math.sin(ca) * 0.1, 0, 0, 0, 0.018, 0.045, 0.018);
kcAdd(g, S, kcMat(c % 2 ? "red" : "blue", true), Math.cos(ca) * 0.1, 0.04, Math.sin(ca) * 0.1, 0, 0, 0, 0.012);
}
break;
case "sword":
kcAdd(g, B, M, 0, 0.02, 0, 0, 0.3, 0, 0.05, 0.012, 0.5);
kcAdd(g, B, Gd, 0, 0.02, 0.27, 0, 0.3, 0, 0.14, 0.02, 0.025);
kcAdd(g, C, kcMat("hide"), 0, 0.02, 0.33, Math.PI / 2, 0.3, 0, 0.014, 0.1, 0.014);
break;
case "amulet":
kcAdd(g, T, M, 0, 0.005, 0, Math.PI / 2, 0, 0, 0.12, 0.12, 0.4);
kcAdd(g, C, M, 0, 0.012, 0.12, 0, 0, 0, 0.045, 0.01, 0.045);
kcAdd(g, S, kcMat("emerald", true), 0, 0.02, 0.12, 0, 0, 0, 0.022, 0.01, 0.022);
break;
case "lyre":
[-1, 1].forEach(function (s) { kcAdd(g, T, M, s * 0.06, 0.2, 0, 0, 0, s > 0 ? 0.3 : Math.PI - 0.3, 0.12, 0.12, 0.5); });
kcAdd(g, B, M, 0, 0.32, 0, 0, 0, 0, 0.2, 0.02, 0.02);
kcAdd(g, B, kcMat("darkoak"), 0, 0.06, 0, 0, 0, 0, 0.14, 0.08, 0.05);
break;
case "helmet":
kcAdd(g, kcG("helm", function () { return new THREE.SphereGeometry(1, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62); }), M, 0, 0.05, 0, 0, 0, 0, 0.13, 0.16, 0.14);
kcAdd(g, B, kcMat("red"), 0, 0.23, 0, 0, 0, 0, 0.025, 0.08, 0.24);
break;
case "shield":
kcAdd(g, C, M, 0, 0.22, 0, Math.PI / 2, 0, 0, 0.22, 0.03, 0.22);
kcAdd(g, S, Gd, 0, 0.22, 0.025, 0, 0, 0, 0.05, 0.05, 0.02);
break;
case "mask":
kcAdd(g, kcG("mask", function () { return new THREE.SphereGeometry(1, 16, 10, 0, Math.PI, 0, Math.PI); }), M, 0, 0.14, 0, 0, Math.PI, 0, 0.1, 0.14, 0.05);
break;
case "tripod":
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2; kcAdd(g, C, M, Math.cos(a) * 0.08, 0.15, Math.sin(a) * 0.08, Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2, 0.01, 0.3, 0.01); });
kcAdd(g, kcLathe("bowl", [[0, 0], [0.08, 0.01], [0.12, 0.06], [0.13, 0.08], [0, 0.05]]), M, 0, 0.28, 0);
break;
case "lamp":
kcAdd(g, kcLathe("lamp", [[0, 0], [0.06, 0], [0.08, 0.03], [0.05, 0.05], [0, 0.05]]), M, 0, 0, 0);
kcAdd(g, B, M, 0.08, 0.03, 0, 0, 0, 0, 0.06, 0.02, 0.03);
kcAdd(g, K, kcMat("ember"), 0.11, 0.07, 0, 0, 0, 0, 0.015, 0.05, 0.015);
break;
case "ship":
kcAdd(g, B, M, 0, 0.05, 0, 0, 0, 0, 0.12, 0.06, 0.5);
kcAdd(g, K, M, 0, 0.05, 0.3, Math.PI / 2, 0, 0, 0.06, 0.12, 0.03);
kcAdd(g, C, W, 0, 0.2, 0, 0, 0, 0, 0.01, 0.3, 0.01);
kcAdd(g, B, kcMat(col === "black" ? "black" : "white"), 0, 0.25, 0.01, 0, 0, 0, 0.24, 0.16, 0.005);
break;
case "bow":
kcAdd(g, kcG("bowarc", function () { return new THREE.TorusGeometry(0.3, 0.012, 6, 24, Math.PI * 0.9); }), M, 0, 0.02, 0, -Math.PI / 2, 0, Math.PI * 0.05);
kcAdd(g, B, kcMat("wool"), 0, 0.02, -0.05, 0, 0, 0, 0.58, 0.004, 0.004);
break;
case "owl":
kcAdd(g, S, M, 0, 0.1, 0, 0, 0, 0, 0.07, 0.1, 0.065);
kcAdd(g, S, M, 0, 0.22, 0, 0, 0, 0, 0.06, 0.055, 0.055);
[-1, 1].forEach(function (s) { kcAdd(g, S, kcMat("black"), s * 0.025, 0.23, 0.05, 0, 0, 0, 0.014); kcAdd(g, K, M, s * 0.035, 0.28, 0, 0, 0, 0, 0.012, 0.03, 0.012); });
break;
case "bull":
kcAdd(g, S, M, 0, 0.1, 0, 0, 0, 0, 0.07, 0.06, 0.13);
kcAdd(g, S, M, 0, 0.12, 0.14, 0, 0, 0, 0.045, 0.045, 0.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { kcAdd(g, C, M, q[0] * 0.04, 0.03, q[1] * 0.07, 0, 0, 0, 0.012, 0.06, 0.012); });
[-1, 1].forEach(function (s) { kcAdd(g, K, M, s * 0.05, 0.17, 0.15, 0, 0, -s * 0.9, 0.012, 0.06, 0.012); });
break;
case "dolphin":
kcAdd(g, S, M, 0, 0.1, 0, 0.2, 0, 0, 0.05, 0.05, 0.16);
kcAdd(g, K, M, 0, 0.1, 0.18, Math.PI / 2, 0, 0, 0.015, 0.06, 0.015);
kcAdd(g, K, M, 0, 0.16, 0, 0, 0, 0, 0.02, 0.06, 0.03);
kcAdd(g, B, M, 0, 0.13, -0.17, 0.4, 0, 0, 0.12, 0.01, 0.04);
break;
case "shell":
kcAdd(g, kcG("shell", function () { return new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), M, 0, 0.0, 0, 0, 0, 0, 0.1, 0.06, 0.09);
for (var r = 0; r < 5; r++)
kcAdd(g, B, M, (r - 2) * 0.035, 0.04, 0, 0, (r - 2) * 0.25, 0, 0.008, 0.06, 0.18);
break;
case "pearl":
kcAdd(g, kcG("shell2", function () { return new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), kcMat("pearl"), 0, 0, 0, 0, 0, 0, 0.1, 0.03, 0.09);
kcAdd(g, S, kcMat(col === "pearl" ? "pearl" : col, true), 0, 0.04, 0, 0, 0, 0, 0.035);
break;
case "apple":
kcAdd(g, S, kcMat(col, true), 0, 0.06, 0, 0, 0, 0, 0.06, 0.055, 0.06);
kcAdd(g, C, kcMat("darkoak"), 0, 0.12, 0, 0, 0, 0, 0.005, 0.03, 0.005);
kcAdd(g, S, kcMat("laurel"), 0.02, 0.12, 0, 0, 0, 0.6, 0.025, 0.006, 0.012);
break;
case "fleece":
kcAdd(g, S, kcMat(col), 0, 0.04, 0, 0, 0, 0, 0.3, 0.04, 0.22);
for (var f = 0; f < 10; f++)
kcAdd(g, S, kcMat(col), (f % 5 - 2) * 0.1, 0.07, (Math.floor(f / 5) - 0.5) * 0.14, 0, 0, 0, 0.06, 0.04, 0.06);
break;
case "horn":
kcAdd(g, kcG("hornc", function () { var c = new THREE.ConeGeometry(0.05, 0.35, 12); c.rotateZ(Math.PI / 2); return c; }), M, 0, 0.05, 0, 0, 0, 0.25);
kcAdd(g, S, kcMat("apple" === col ? "red" : "gold", true), 0.17, 0.09, 0, 0, 0, 0, 0.03);
break;
case "wreath":
kcAdd(g, T, kcMat(col === "gold" ? "gold" : "laurel"), 0, 0.02, 0, Math.PI / 2, 0, 0, 0.11, 0.11, 0.6);
for (var l = 0; l < 12; l++) {
var la = l / 12 * Math.PI * 2;
kcAdd(g, S, kcMat(col === "gold" ? "gold" : "laurel"), Math.cos(la) * 0.11, 0.03, Math.sin(la) * 0.11, 0, -la, 0, 0.012, 0.006, 0.03);
}
break;
case "tablet":
kcAdd(g, B, M, 0, 0.015, 0, 0, 0, 0, 0.18, 0.03, 0.24);
for (var t = 0; t < 5; t++)
kcAdd(g, B, kcMat("charcoal"), 0, 0.031, -0.08 + t * 0.04, 0, 0, 0, 0.13, 0.002, 0.006);
break;
case "mirror":
kcAdd(g, C, M, 0, 0.2, 0, Math.PI / 2, 0, 0, 0.11, 0.01, 0.11);
kcAdd(g, C, kcMat("silver", true), 0, 0.2, 0.006, Math.PI / 2, 0, 0, 0.095, 0.004, 0.095);
kcAdd(g, C, M, 0, 0.05, 0, 0, 0, 0, 0.012, 0.12, 0.012);
kcAdd(g, C, M, 0, 0.0, 0, 0, 0, 0, 0.05, 0.01, 0.05);
break;
case "axe":
kcAdd(g, C, kcMat("oak"), 0, 0.02, 0, Math.PI / 2, 0, 0, 0.012, 0.45, 0.012);
kcAdd(g, B, M, 0, 0.02, 0.2, 0, 0, 0, 0.02, 0.02, 0.1);
kcAdd(g, C, M, 0, 0.02, 0.24, 0, 0, 0, 0.06, 0.02, 0.04);
break;
case "spear":
kcAdd(g, C, kcMat("oak"), 0, 0.02, 0, Math.PI / 2, 0, 0, 0.01, 0.7, 0.01);
kcAdd(g, K, M, 0, 0.02, 0.4, Math.PI / 2, 0, 0, 0.025, 0.12, 0.012);
break;
case "feather":
kcAdd(g, kcG("feather", function () { var s = new THREE.SphereGeometry(1, 10, 6); s.scale(0.03, 0.004, 0.16); return s; }), M, 0, 0.01, 0, 0, 0.4, 0);
kcAdd(g, C, kcMat("ivory"), 0, 0.012, -0.02, Math.PI / 2, 0.4, 0, 0.003, 0.32, 0.003);
break;
case "bell":
kcAdd(g, kcLathe("bell", [[0, 0.2], [0.03, 0.19], [0.05, 0.12], [0.08, 0.02], [0.09, 0], [0, 0.01]]), M, 0, 0, 0);
kcAdd(g, T, M, 0, 0.22, 0, 0, 0, 0, 0.02);
break;
case "key":
kcAdd(g, T, M, 0, 0.01, 0, Math.PI / 2, 0, 0, 0.04);
kcAdd(g, B, M, 0, 0.01, 0.12, 0, 0, 0, 0.014, 0.014, 0.17);
kcAdd(g, B, M, 0.02, 0.01, 0.19, 0, 0, 0, 0.03, 0.014, 0.014);
break;
case "book":
kcAdd(g, B, kcMat(col === "gold" ? "red" : col), 0, 0.03, 0, 0, 0, 0, 0.2, 0.05, 0.26);
kcAdd(g, B, kcMat("ivory"), 0.005, 0.03, 0, 0, 0, 0, 0.19, 0.04, 0.25);
kcAdd(g, B, Gd, 0, 0.056, 0, 0, 0, 0, 0.08, 0.002, 0.1);
break;
case "flower":
kcAdd(g, C, kcMat("green"), 0, 0.12, 0, 0, 0, 0, 0.006, 0.24, 0.006);
for (var p = 0; p < 6; p++) {
var pa = p / 6 * Math.PI * 2;
kcAdd(g, S, kcMat(col), Math.cos(pa) * 0.03, 0.25, Math.sin(pa) * 0.03, 0, 0, 0, 0.028, 0.01, 0.018);
}
kcAdd(g, S, Gd, 0, 0.255, 0, 0, 0, 0, 0.015);
break;
case "star":
kcAdd(g, kcG("star", function () { var s = new THREE.Shape(); for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 0.045 : 0.11;
if (i)
s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
else
s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
} return new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false }); }), kcMat(col, true), 0, 0.12, 0);
break;
case "heart":
kcAdd(g, S, kcMat(col, true), -0.035, 0.13, 0, 0, 0, 0, 0.05);
kcAdd(g, S, kcMat(col, true), 0.035, 0.13, 0, 0, 0, 0, 0.05);
kcAdd(g, K, kcMat(col, true), 0, 0.07, 0, Math.PI, 0, 0, 0.075, 0.1, 0.045);
break;
default: return kcModel("chest", col);
}
return g;
},
function (hide, model, col) {
var g = new THREE.Group();
if (hide === "buried") {
kcAdd(g, kcSphG(), kcMat("hide"), 0, 0, 0, 0, 0, 0, 0.5, 0.12, 0.42);
for (var i = 0; i < 5; i++)
kcAdd(g, kcSphG(), kcMat("stone"), Math.cos(i * 1.3) * 0.4, 0.03, Math.sin(i * 1.3) * 0.34, 0, 0, 0, 0.05);
}
else if (hide === "stone") {
kcAdd(g, kcG("flat", function () { var d = new THREE.DodecahedronGeometry(1, 1); d.scale(0.45, 0.12, 0.36); return d; }), kcMat("stone"), 0, 0.08, 0, 0, 0.5, 0);
}
else if (hide === "chest")
g.add(kcModel("chest", "darkoak"));
else if (hide === "jar")
g.add(kcModel("amphora", "terracotta"));
else if (hide === "plain")
g.add(kcModel(model, col));
return g;
},
function (hide) {
return { buried: "The earth here has been turned over. You dig with your hands…", stone: "This flat stone does not sit like the others. You lift it…", chest: "A small chest, tucked out of sight. You open it…",
jar: "A sealed jar, hidden away. You break the seal…", plain: "Something lies here, waiting.", unseen: "Your foot strikes something hidden." }[hide] || "Something is hidden here.";
},
function (text) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 64;
var x = c.getContext("2d");
x.fillStyle = "rgba(20,16,10,0.75)";
x.fillRect(0, 0, 512, 64);
x.fillStyle = "#FFE7B0";
x.font = "600 28px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(String(text).slice(0, 36), 256, 33);
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
s.scale.set(1.6, 0.2, 1);
return s;
},
function (html, fns) {
var p = document.getElementById("kcPanel");
if (!html) {
if (p)
p.style.display = "none";
KC.open = null;
return;
}
if (!p) {
p = document.createElement("div");
p.id = "kcPanel";
p.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,92vw);max-height:86vh;overflow:auto;z-index:9000;" +
"background:rgba(18,14,10,0.94);color:#F4EAD8;border:1px solid #8A6A3A;border-radius:8px;padding:14px 16px;font:14px/1.45 Georgia,serif;box-shadow:0 8px 40px rgba(0,0,0,.6)";
document.body.appendChild(p);
}
p.innerHTML = "<div style='text-align:right;margin:-6px -6px 0 0'><span data-k='close' role='button' tabindex='0' aria-label='Close' style='cursor:pointer;opacity:.7;font-size:18px'>✕</span></div>" + html;
p.style.display = "block";
KC.open = true;
p.querySelectorAll("[data-k]").forEach(function (b) { b.style.cursor = "pointer"; b.onclick = function (ev) { ev.stopPropagation(); var n = b.getAttribute("data-k"); if (n === "close") {
kcPanel(null);
return;
} if (fns && fns[n])
fns[n](b, p); }; });
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
return p;
},
function (c) {
KC.asked[c.id] = 1;
var gift = kcModelName(c.model, c.colour);
var html = "<div style='font:600 18px Georgia;color:#FFE7B0'>✨ Something hidden</div><p style='font-style:italic'>" + kcEsc(kcHideSay(c.hide)) + "</p>" +
(c.riddle ? "<p><b>A riddle is cut beside it:</b><br>" + kcEsc(c.riddle) + "</p><input id='kcAns' placeholder='Your answer' style='width:100%;box-sizing:border-box;padding:7px;border-radius:4px;border:1px solid #8A6A3A;background:#221A12;color:#FFF'>" : "") +
kcBtn("take", c.riddle ? "Answer, and take it" : "Take it", c.hide === "plain" ? gift : "") + "<div id='kcSay' style='color:#F8C080;font-size:13px'></div>";
kcPanel(html, { take: function (b, p) {
var a = p.querySelector("#kcAns"), F = kcFeet();
b.style.opacity = 0.5;
kcRpc("kc_take", { p_id: c.id, p_answer: a ? a.value : null, p_x: F.x, p_y: F.y, p_z: F.z }).then(function (o) {
b.style.opacity = 1;
if (!o || !o.ok) {
p.querySelector("#kcSay").textContent = (o && o.say) || "Nothing came of it.";
if (o && o.gone) {
KC.list = KC.list.filter(function (x) { return x.id !== c.id; });
kcSync();
}
return;
}
KC.list = KC.list.filter(function (x) { return x.id !== c.id; });
kcSync();
if (typeof playTone === "function")
try {
playTone(660, 0.12);
setTimeout(function () { playTone(880, 0.18); }, 140);
}
catch (e) { }
var got = ["<b>" + kcEsc(o.name) + "</b>, in your backpack (the city buys it for " + (+o.value || 1) + " gold, or keep it)"];
if (o.gold > 0)
got.push("<b>" + o.gold + " gold</b> from the Treasury");
else if (o.why)
got.push("<span style='opacity:.8'>" + kcEsc(o.why) + "</span>");
if (o.mat)
got.push("<b>" + (+o.mat_n) + " " + kcEsc(String(o.mat).toLowerCase()) + "</b> for the forges");
if (o.item)
got.push("<b>" + kcEsc(o.item) + "</b>, yours to use");
kcPanel("<div style='font:600 18px Georgia;color:#FFE7B0'>🎁 " + kcEsc(o.name) + "</div>" + (o.note ? "<p style='font-style:italic;line-height:1.55'>“" + kcEsc(o.note) + "”</p><p style='text-align:right;opacity:.85'>— " + kcEsc(o.by) + "</p>" : "") +
"<ul style='margin:8px 0 0 18px;padding:0'>" + got.map(function (t) { return "<li style='margin:3px 0'>" + t + "</li>"; }).join("") + "</ul>" + kcBtn("close", "Thank you", ""));
if (typeof stockRefresh === "function")
try {
stockRefresh();
}
catch (e) { }
}).catch(function (e) { b.style.opacity = 1; p.querySelector("#kcSay").textContent = kcMissing(e) ? "Hidden gifts open soon." : String(e && e.message || e); });
} });
},
function (text, mats) {
var t = " " + String(text || "").toLowerCase() + " ", o = {};
var words = t.match(/[a-z]+/g) || [];
for (var i = 0; i < words.length && !o.model; i++) {
var w = words[i], s = w.replace(/s$/, "");
if (KC_MODELS.indexOf(w) >= 0)
o.model = w;
else if (KC_MODELS.indexOf(s) >= 0 && s !== "coin")
o.model = s;
else if (KC_SYN[w] && w !== "gold" && w !== "jar")
o.model = KC_SYN[w];
else if (KC_SYN[s] && s !== "gold")
o.model = KC_SYN[s];
}
for (var j = 0; j < words.length && !o.colour; j++)
if (KC_COL[words[j]] && !/\d+\s*gold/.test(t.slice(Math.max(0, t.indexOf(words[j]) - 8), t.indexOf(words[j]) + 5)))
o.colour = words[j];
if (/\bbur(y|ied)\b|\bdig\b|underground|in the (earth|ground|sand)/.test(t))
o.hide = "buried";
else if (/under (a|the|this) (stone|rock)|beneath (a|the|this) (stone|rock)/.test(t))
o.hide = "stone";
else if (/in (a|the) (small )?(chest|box|coffer|trunk)/.test(t))
o.hide = "chest";
else if (/in (a|the) (sealed )?(jar|urn|pot|amphora)/.test(t))
o.hide = "jar";
else if (/invisible|unseen|can'?t be seen|cannot be seen|not seen|no one can see/.test(t))
o.hide = "unseen";
else if (/plain sight|in the open|visible|on show/.test(t))
o.hide = "plain";
var g = t.match(/(\d[\d,]*)\s*(gold|g\b)/);
if (g)
o.gold = +g[1].replace(/,/g, "");
var v = t.match(/(worth|value[ds]?( at)?|sells? for|sold for)\s*(\d[\d,]*)/);
if (v)
o.value = +v[3].replace(/,/g, "");
var f = t.match(/first\s+(\d+)/);
if (f) {
o.who = "some";
o.max = +f[1];
}
else if (/first (one|finder|person|to find)|whoever finds it first|only one (person|dreamer)|just one/.test(t))
o.who = "first";
else if (/first (two|three|four|five|ten)/.test(t)) {
o.who = "some";
o.max = { two: 2, three: 3, four: 4, five: 5, ten: 10 }[t.match(/first (two|three|four|five|ten)/)[1]];
}
else if (/every(one|body)|anyone|all who|all dreamers|each (person|dreamer)/.test(t))
o.who = "all";
if (/\bnight\b|after dark|by moonlight/.test(t))
o.night = true;
var r = String(text).match(/riddle\s*[:\-]?\s*([\s\S]+?)(?:\s*(?:answer|the answer is)\s*[:\-]?\s*([^.,;\n]+))?\s*$/i);
if (r) {
o.riddle = r[1].replace(/\s*(answer|the answer is)\s*[:\-]?\s*$/i, "").trim();
if (r[2])
o.answer = r[2].trim();
}
var q = String(text).match(/(?:note|says?|message|tell them|write)\s*[:\-]?\s*["“]([^"”]+)["”]/i) || String(text).match(/["“]([^"”]{6,})["”]/);
if (q)
o.note = q[1].trim();
else {
var n2 = String(text).match(/\bnote\s*[:\-]\s*([^\n]+)/i);
if (n2)
o.note = n2[1].trim();
}
var nm = String(text).match(/(?:called|named|name it)\s+["“]?([^"”,.;\n]+)/i);
if (nm)
o.name = nm[1].trim().replace(/\s+(here|there|under|in|buried|for|with|worth|and|on|at)\b[\s\S]*$/i, "");
(mats || []).forEach(function (m) { var nm2 = String(m.name).toLowerCase(), re = new RegExp("(\\d+)\\s+(?:of\\s+)?" + nm2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); var mm = t.match(re); if (mm && !o.mat) {
o.mat = m.kind;
o.mat_n = +mm[1];
} });
if (!o.name && o.model)
o.name = (o.colour ? o.colour.charAt(0).toUpperCase() + o.colour.slice(1) + " " : "A ") + (o.colour ? o.model : o.model);
return o;
},
function (text, mats) {
var cf = typeof cfg === "function" ? cfg() : { mode: "off" };
if (cf.mode === "off" || typeof llmTarget !== "function" || typeof llmBody !== "function" || !(typeof aiBought !== "function" || aiBought()))
return Promise.resolve(null);
var msgs = [{ role: "system", content: "The game's Keeper describes a gift to hide in the world for players to find. Reply with ONE JSON object and nothing else: " +
"{\"name\": a short name for the gift, \"model\": one of [" + KC_MODELS.join(", ") + "] (the nearest shape), \"colour\": one of [" + Object.keys(KC_COL).join(", ") + "], " +
"\"hide\": one of [plain, buried, stone, chest, jar, unseen], \"note\": the message to the finder in the Keeper's words (empty if none), \"gold\": whole gold to pay (0 if none), " +
"\"value\": what the city pays for the gift itself if sold (1 to 1000, a fair price, 1 gold is 1 dollar), \"mat\": one of [" + (mats || []).map(function (m) { return m.kind; }).slice(0, 80).join(", ") + "] or \"\", \"mat_n\": count, " +
"\"who\": one of [first, some, all], \"max\": how many may find it when who is some, \"night\": true or false, \"riddle\": the riddle or \"\", \"answer\": its answer or \"\"}. Keep the Keeper's own words for the note." },
{ role: "user", content: String(text).slice(0, 800) }];
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () { var T = llmTarget(cf); return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 0.2, max_tokens: 500, messages: msgs })) }); })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) { var c = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "", i = c.indexOf("{"), j = c.lastIndexOf("}"); if (i < 0 || j <= i)
return null; return JSON.parse(c.slice(i, j + 1)); })
.catch(function () { return null; });
},
function (f, mats) {
var sel = function (id, list, v) { return "<select id='" + id + "' style='width:100%;padding:6px;background:#221A12;color:#FFF;border:1px solid #8A6A3A;border-radius:4px'>" + list.map(function (o) { return "<option value='" + kcEsc(o[0]) + "'" + (String(o[0]) === String(v) ? " selected" : "") + ">" + kcEsc(o[1]) + "</option>"; }).join("") + "</select>"; };
var inp = function (id, v, ph, type) { return "<input id='" + id + "' " + (type ? "type='" + type + "' " : "") + "value='" + kcEsc(v == null ? "" : v) + "' placeholder='" + kcEsc(ph || "") + "' style='width:100%;box-sizing:border-box;padding:6px;background:#221A12;color:#FFF;border:1px solid #8A6A3A;border-radius:4px'>"; };
var row = function (l, h) { return "<div style='margin:6px 0'><div style='font-size:12px;opacity:.8'>" + l + "</div>" + h + "</div>"; };
return row("Name of the gift", inp("kcName", f.name, "The Seeker's ring")) +
"<div style='display:flex;gap:8px'><div style='flex:1'>" + row("Shape", sel("kcModel", KC_MODELS.map(function (m) { return [m, m]; }), f.model || "chest")) + "</div><div style='flex:1'>" + row("Colour", sel("kcColour", Object.keys(KC_COL).map(function (c) { return [c, c]; }), f.colour || "gold")) + "</div></div>" +
row("How it is hidden", sel("kcHide", KC_HIDES, f.hide || "plain")) +
row("Your note to whoever finds it", "<textarea id='kcNote' rows='3' style='width:100%;box-sizing:border-box;padding:6px;background:#221A12;color:#FFF;border:1px solid #8A6A3A;border-radius:4px'>" + kcEsc(f.note || "") + "</textarea>") +
"<div style='display:flex;gap:8px'><div style='flex:1'>" + row("Gold from the Treasury", inp("kcGold", f.gold || 0, "0", "number")) + "</div><div style='flex:1'>" + row("The gift sells for (gold)", inp("kcValue", f.value || 10, "10", "number")) + "</div></div>" +
"<div style='display:flex;gap:8px'><div style='flex:2'>" + row("Crafting materials", sel("kcMat", [["", "none"]].concat((mats || []).map(function (m) { return [m.kind, m.name]; })), f.mat || "")) + "</div><div style='flex:1'>" + row("How many", inp("kcMatN", f.mat_n || 0, "0", "number")) + "</div></div>" +
row("Also give a copy of something from the catalogue", "<div style='display:flex;gap:6px'>" + inp("kcItemQ", "", "search: sofa, cloak, lamp…") + "<span data-k='find' role='button' style='padding:6px 10px;border:1px solid #8A6A3A;border-radius:4px'>Find</span></div><select id='kcItem' style='width:100%;margin-top:4px;padding:6px;background:#221A12;color:#FFF;border:1px solid #8A6A3A;border-radius:4px'><option value=''>nothing more</option>" + (f.item ? "<option value='" + kcEsc(f.item) + "' selected>" + kcEsc(f.itemName || f.item) + "</option>" : "") + "</select>") +
"<div style='display:flex;gap:8px'><div style='flex:2'>" + row("Who may have it", sel("kcWho", [["all", "Everyone who finds it, once each"], ["first", "Only the first to find it"], ["some", "The first few"]], f.who || "all")) + "</div><div style='flex:1'>" + row("How many (first few)", inp("kcMax", f.max || 3, "3", "number")) + "</div></div>" +
row("", "<label><input id='kcNight' type='checkbox'" + (f.night ? " checked" : "") + "> Only at night</label>") +
row("A riddle to answer first (optional)", inp("kcRiddle", f.riddle, "What has keys but opens no locks?")) + row("Its answer", inp("kcAnswer", f.answer, "a piano"));
},
function (p) {
var v = function (id) { var e = p.querySelector("#" + id); return e ? (e.type === "checkbox" ? e.checked : e.value) : null; };
return { name: v("kcName"), model: v("kcModel"), colour: v("kcColour"), hide: v("kcHide"), note: v("kcNote"), gold: +v("kcGold") || 0, value: +v("kcValue") || 1, mat: v("kcMat"), mat_n: +v("kcMatN") || 0, item: v("kcItem"),
who: v("kcWho"), max: +v("kcMax") || 1, night: !!v("kcNight"), riddle: v("kcRiddle"), answer: v("kcAnswer") };
},
function (msg) {
var A = KC_FORM, mic = ("webkitSpeechRecognition" in window) || ("SpeechRecognition" in window);
var html = "<div style='font:600 18px Georgia;color:#FFE7B0'>🎁 Hide a gift here</div><div style='font-size:12px;opacity:.75'>Where you stand: " + kcEsc(A.place) + " (" + A.at.x.toFixed(1) + ", " + A.at.z.toFixed(1) + ")</div>" +
"<div style='margin:8px 0'><textarea id='kcSay' rows='3' placeholder='Say or type it: a gold ring under this stone, night only, the first 3 who find it, 50 gold, worth 40, note: \"Well done for coming this far.\"' style='width:100%;box-sizing:border-box;padding:7px;background:#221A12;color:#FFF;border:1px solid #8A6A3A;border-radius:4px'>" + kcEsc(A.text || "") + "</textarea>" +
"<div style='display:flex;gap:6px'>" + (mic ? "<span data-k='mic' role='button' style='padding:6px 10px;border:1px solid #8A6A3A;border-radius:4px'>🎤 Say it</span>" : "") + "<span data-k='read' role='button' style='flex:1;text-align:center;padding:6px 10px;border:1px solid #E8C878;border-radius:4px;background:rgba(232,200,120,.12)'><b>Make it from my words</b></span></div></div>" +
(msg ? "<div style='color:#F8C080;font-size:13px;margin:4px 0'>" + msg + "</div>" : "") + kcFormHtml(A.f, A.mats) + kcBtn("hide", "Hide it here", "It stays where you stand, hidden as you chose") + kcBtn("list", "My hidden gifts", "Where they are, who found them; take one out of hiding") + "<div id='kcOut' style='color:#F8C080;font-size:13px'></div>";
kcPanel(html, { read: function (b, p) {
A.text = p.querySelector("#kcSay").value;
A.f = Object.assign({}, kcFormRead(p), kcRead(A.text, A.mats));
kcHideShow("Read from your words. Check it, then Hide it here." + ((typeof cfg === "function" && cfg().mode !== "off") ? " The AI is reading it too…" : ""));
kcAiRead(A.text, A.mats).then(function (ai) {
if (!ai || !KC.open)
return;
var keep = A.f;
A.f = Object.assign({}, keep, Object.keys(ai).reduce(function (o, k) { if (ai[k] !== "" && ai[k] != null && !(k === "gold" && !ai[k] && keep.gold))
o[k] = ai[k]; return o; }, {}));
if (A.f.model && KC_MODELS.indexOf(A.f.model) < 0)
A.f.model = keep.model || "chest";
if (A.f.colour && !KC_COL[A.f.colour])
A.f.colour = keep.colour || "gold";
kcHideShow("✨ The AI has read your words. Check it, then Hide it here.");
});
},
mic: function (b, p) {
var R = window.SpeechRecognition || window.webkitSpeechRecognition;
try {
var r = new R();
r.lang = "en-US";
r.interimResults = false;
b.textContent = "🎤 Listening…";
r.onresult = function (e) { var s = e.results[0][0].transcript; var ta = p.querySelector("#kcSay"); ta.value = (ta.value ? ta.value + " " : "") + s; b.textContent = "🎤 Say it"; };
r.onerror = r.onend = function () { b.textContent = "🎤 Say it"; };
r.start();
}
catch (e) {
b.textContent = "🎤 not here";
}
},
find: function (b, p) {
var q = p.querySelector("#kcItemQ").value;
kcRpc("kc_choices", { p_q: q }).then(function (o) {
var s = p.querySelector("#kcItem");
s.innerHTML = "<option value=''>nothing more</option>" + ((o && o.items) || []).map(function (it) { return "<option value='" + kcEsc(it.arch) + "'>" + kcEsc(it.name) + " (" + kcEsc(it.kind) + ")</option>"; }).join("");
if (o && o.items && o.items.length)
s.selectedIndex = 1;
}).catch(function (e) { p.querySelector("#kcOut").textContent = String(e && e.message || e); });
},
hide: function (b, p) {
var f = kcFormRead(p);
A.f = f;
if (!String(f.name || "").trim()) {
p.querySelector("#kcOut").textContent = "Give the gift a name.";
return;
}
b.style.opacity = 0.5;
kcRpc("kc_hide", { p_place: A.place, p_x: A.at.x, p_y: A.at.y, p_z: A.at.z, p_hide: f.hide, p_model: f.model, p_colour: f.colour, p_name: f.name, p_note: f.note, p_gold: f.gold, p_mat: f.mat, p_mat_n: f.mat_n,
p_item: f.item, p_value: f.value, p_who: f.who, p_max: f.max, p_night: f.night, p_riddle: f.riddle, p_answer: f.answer }).then(function (o) {
b.style.opacity = 1;
if (!o || !o.ok) {
p.querySelector("#kcOut").textContent = (o && o.say) || "It could not be hidden.";
return;
}
kcPanel("<div style='font:600 18px Georgia;color:#FFE7B0'>🎁 Hidden</div><p>" + kcEsc(o.say) + "</p><p style='font-size:13px;opacity:.85'>You see it with its name over it, as the Keeper. Everyone else sees only what you chose.</p>" + kcBtn("close", "Done", ""));
KC.lastFetch = 0;
kcClear();
kcFetch();
}).catch(function (e) { b.style.opacity = 1; p.querySelector("#kcOut").textContent = kcMissing(e) ? "Run SQL the latest server update first." : String(e && e.message || e); });
},
list: function () { kcListShow(); } });
},
function () {
kcRpc("kc_list", {}).then(function (o) {
var L = (o && o.list) || [];
var fns = {};
var html = "<div style='font:600 18px Georgia;color:#FFE7B0'>🎁 Your hidden gifts</div>" + (L.length ? "" : "<p>None yet.</p>") + L.map(function (c) {
fns["t" + c.id] = function () { kcRpc("kc_open", { p_id: c.id, p_open: !c.open }).then(function () { KC.lastFetch = 0; kcClear(); kcFetch(); kcListShow(); }); };
return "<div style='margin:8px 0;padding:8px;border:1px solid rgba(232,200,120,.3);border-radius:5px'><b>" + kcEsc(c.name) + "</b> <span style='opacity:.7;font-size:12px'>" + kcEsc(c.place) + " · " + c.x + ", " + c.z + " · " + kcEsc(c.hide) + "</span><br>" +
"<span style='font-size:13px'>Found " + c.found + (c.who === "first" ? " (first finder only)" : c.who === "some" ? " of " + c.max : " (everyone)") + (c.finders && c.finders.length ? ": " + kcEsc(c.finders.join(", ")) : "") + "</span>" +
"<div data-k='t" + c.id + "' role='button' style='margin-top:4px;font-size:12px;text-decoration:underline'>" + (c.open ? "Take it out of hiding" : "Hide it again") + "</div></div>";
}).join("") + kcBtn("back", "Back", "");
fns.back = function () { kcHideShow(); };
kcPanel(html, fns);
}).catch(function (e) { kcPanel("<p>" + kcEsc(kcMissing(e) ? "Run SQL the latest server update first." : String(e && e.message || e)) + "</p>"); });
}
];
});
