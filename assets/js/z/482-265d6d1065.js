/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(482, function () {
return [
function (grp, cx, cz, y, w, d, h, door, wall, floor, roof) {
var hw = w / 2, hd = d / 2, gap = [[w / 2, Math.min(1.8, w * 0.3), 2.3]], dg = function (s) { return door === s ? (door === "o" ? null : gap) : null; };
vrnIWall(grp, cx - hw, cz - hd, cx + hw, cz - hd, h, wall, dg("n"), y);
vrnIWall(grp, cx - hw, cz + hd, cx + hw, cz + hd, h, wall, door === "s" ? [[w / 2, w * 0.45, 0]] : null, y);
vrnIWall(grp, cx - hw, cz - hd, cx - hw, cz + hd, h, wall, null, y);
vrnIWall(grp, cx + hw, cz - hd, cx + hw, cz + hd, h, wall, null, y);
vrnInFloor(grp, cx, cz, w, d, y + 0.04, floor);
var rf = new THREE.Mesh(vrnPitchGeo(w + 1, d + 1, 1.5, 0.4), roof);
rf.position.set(cx, y + h, cz);
grp.add(rf);
},
function () {
var lite = VRN.lite, W = lite ? 512 : 1024, H = W / 2;
return vmnCanvas("moon" + W, W, H, function (x, w, h) {
var R = wRand(1865), s = lite ? 2 : 4, img = x.createImageData(w / s, h / s), d = img.data;
for (var j = 0; j < h / s; j++)
for (var i = 0; i < w / s; i++) {
var n = wFbm(i * s / 40, j * s / 40, 19, 4), v = 150 + n * 70, o = (j * (w / s) + i) * 4;
d[o] = v;
d[o + 1] = v;
d[o + 2] = v * 0.97;
d[o + 3] = 255;
}
var c2 = document.createElement("canvas");
c2.width = w / s;
c2.height = h / s;
c2.getContext("2d").putImageData(img, 0, 0);
x.imageSmoothingEnabled = true;
x.drawImage(c2, 0, 0, w, h);
function px(lon) { return (lon + 180) / 360 * w; }
function py(lat) { return (90 - lat) / 180 * h; }
var k = w / 360;
VMN_MARIA.forEach(function (m) {
for (var e = 0; e < 6; e++) {
var g = x.createRadialGradient(px(m[0]), py(m[1]), 0, px(m[0]), py(m[1]), m[2] * k * (1 + e * 0.06));
g.addColorStop(0, "rgba(58,58,60,0.55)");
g.addColorStop(0.75, "rgba(66,66,68,0.4)");
g.addColorStop(1, "rgba(80,80,80,0)");
x.save();
x.translate(px(m[0]), py(m[1]));
x.scale(1, m[3] / m[2]);
x.translate(-px(m[0]), -py(m[1]));
x.fillStyle = g;
x.beginPath();
x.arc(px(m[0]) + (R() - 0.5) * m[2] * k * 0.3, py(m[1]) + (R() - 0.5) * m[2] * k * 0.3, m[2] * k * (0.8 + R() * 0.3), 0, 7);
x.fill();
x.restore();
}
});
function crater(cx, cy, r, bright) {
x.fillStyle = "rgba(40,40,42,0.45)";
x.beginPath();
x.arc(cx + r * 0.12, cy + r * 0.1, r, 0, 7);
x.fill();
x.fillStyle = bright ? "rgba(235,235,232,0.9)" : "rgba(150,150,148,0.7)";
x.beginPath();
x.arc(cx, cy, r * 0.86, 0, 7);
x.fill();
x.strokeStyle = "rgba(225,225,220,0.75)";
x.lineWidth = Math.max(1, r * 0.16);
x.beginPath();
x.arc(cx - r * 0.08, cy - r * 0.08, r, Math.PI * 0.9, Math.PI * 1.9);
x.stroke();
if (r > 5) {
x.fillStyle = "rgba(200,200,196,0.7)";
x.beginPath();
x.arc(cx, cy, r * 0.15, 0, 7);
x.fill();
}
}
for (var c = 0; c < (lite ? 380 : 900); c++) {
var r = Math.max(1, Math.pow(R(), 3.2) * w / 50);
crater(R() * w, h * 0.04 + R() * h * 0.92, r, false);
}
function rays(lon, lat, n, len, a) { var cx = px(lon), cy = py(lat); for (var q = 0; q < n; q++) {
var an = R() * Math.PI * 2, L = len * k * (0.4 + R() * 0.8);
x.strokeStyle = "rgba(245,245,240," + (a * (0.4 + R() * 0.6)) + ")";
x.lineWidth = 1 + R() * 2.2 * (w / 1024);
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(an) * L, cy + Math.sin(an) * L * 0.8);
x.stroke();
} }
rays(-11, -43, 38, 70, 0.35);
rays(-20, 10, 26, 32, 0.3);
rays(-38, 8, 18, 18, 0.25);
crater(px(-11), py(-43), 2.8 * k, true);
crater(px(-20), py(10), 3 * k, true);
crater(px(-38), py(8), 1.4 * k, true);
crater(px(-1), py(-9), 2.4 * k, false);
crater(px(-9), py(51), 3 * k, false);
var gp = x.createLinearGradient(0, 0, 0, h);
gp.addColorStop(0, "rgba(255,255,255,0.12)");
gp.addColorStop(0.12, "rgba(255,255,255,0)");
gp.addColorStop(0.88, "rgba(255,255,255,0)");
gp.addColorStop(1, "rgba(255,255,255,0.12)");
x.fillStyle = gp;
x.fillRect(0, 0, w, h);
});
},
function () {
var lite = VRN.lite, W = lite ? 256 : 512, H = W / 2;
return vmnCanvas("earth" + W, W, H, function (x, w, h) {
var img = x.createImageData(w, h), d = img.data;
for (var j = 0; j < h; j++) {
var lat = 90 - j / h * 180;
for (var i = 0; i < w; i++) {
var n = wFbm(i / w * 7, j / h * 3.5, 1865, 5), o = (j * w + i) * 4, r, g, b, ice = Math.abs(lat) > 66 + n * 12;
if (ice) {
r = 236;
g = 240;
b = 246;
}
else if (n > 0.53) {
var dry = Math.abs(Math.abs(lat) - 24) < 11 ? 1 : 0, hi = (n - 0.53) * 4;
if (dry) {
r = 196 + hi * 30;
g = 168 + hi * 20;
b = 112;
}
else if (Math.abs(lat) > 48) {
r = 88 + hi * 40;
g = 104 + hi * 30;
b = 70;
}
else {
r = 66 + hi * 60;
g = 108 + hi * 40;
b = 52 + hi * 10;
}
}
else {
var dp = Math.max(0, 0.53 - n) * 3;
r = 18 - dp * 8;
g = 58 - dp * 12;
b = 118 - dp * 20;
}
d[o] = r;
d[o + 1] = g;
d[o + 2] = b;
d[o + 3] = 255;
}
}
x.putImageData(img, 0, 0);
});
},
function () {
var W = VRN.lite ? 256 : 512, H = W / 2;
return vmnCanvas("cloud" + W, W, H, function (x, w, h) {
var img = x.createImageData(w, h), d = img.data;
for (var j = 0; j < h; j++) {
var lat = 90 - j / h * 180, band = 0.6 + 0.4 * Math.abs(Math.sin(lat * Math.PI / 60));
for (var i = 0; i < w; i++) {
var n = wFbm(i / w * 12, j / h * 6, 77, 4), a = Math.max(0, (n - 0.5) * 3.2) * band, o = (j * w + i) * 4;
d[o] = d[o + 1] = d[o + 2] = 250;
d[o + 3] = Math.min(235, a * 255);
}
}
x.putImageData(img, 0, 0);
});
},
function (tex, o) {
o = o || {};
return new THREE.ShaderMaterial({ uniforms: { map: { value: tex }, sun: { value: new THREE.Vector3(1, 0, 0) }, amb: { value: o.amb || 0.02 }, gain: { value: o.gain || 1.15 }, alpha: { value: o.alpha ? 1 : 0 } }, transparent: !!o.alpha, depthWrite: !o.alpha, fog: false,
vertexShader: "varying vec2 vU; varying vec3 vN; void main(){ vU=uv; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
fragmentShader: "uniform sampler2D map; uniform vec3 sun; uniform float amb; uniform float gain; uniform float alpha; varying vec2 vU; varying vec3 vN; void main(){ vec4 t=texture2D(map,vU); float d=dot(normalize(vN),normalize(sun)); float l=amb+gain*smoothstep(-0.04,0.35,d)*max(d,0.0)*1.6; l=min(l,gain); gl_FragColor=vec4(t.rgb*l, alpha>0.5?t.a*smoothstep(-0.1,0.2,d):1.0); }" });
},
function () {
return new THREE.ShaderMaterial({ uniforms: { sun: { value: new THREE.Vector3(1, 0, 0) } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide, fog: false,
vertexShader: "varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.0); vV=normalize(cameraPosition-w.xyz); gl_Position=projectionMatrix*viewMatrix*w; }",
fragmentShader: "uniform vec3 sun; varying vec3 vN; varying vec3 vV; void main(){ float r=1.0-abs(dot(vN,vV)); float lit=smoothstep(-0.3,0.4,dot(vN,normalize(sun))); gl_FragColor=vec4(0.35,0.6,1.0,1.0)*pow(r,3.0)*lit*1.2; }" });
},
function (grp, X, Y, Z) {
var g = new THREE.Group();
g.position.set(X, Y, Z);
grp.add(g);
var R = wRand(1870), N = VRN.lite ? 900 : 2600, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
for (var i = 0; i < N; i++) {
var u = R() * 2 - 1, a = R() * Math.PI * 2, s = Math.sqrt(1 - u * u);
pos[i * 3] = Math.cos(a) * s * 400;
pos[i * 3 + 1] = u * 400;
pos[i * 3 + 2] = Math.sin(a) * s * 400;
var t = R(), b = 0.55 + Math.pow(R(), 3) * 0.45;
col[i * 3] = b * (t < 0.2 ? 0.8 : 1);
col[i * 3 + 1] = b * (t < 0.2 ? 0.88 : t > 0.85 ? 0.86 : 1);
col[i * 3 + 2] = b * (t > 0.85 ? 0.75 : 1);
}
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
sg.setAttribute("color", new THREE.BufferAttribute(col, 3));
var st = new THREE.Points(sg, new THREE.PointsMaterial({ size: VRN.lite ? 1.6 : 1.9, sizeAttenuation: false, vertexColors: true, fog: false, depthWrite: false }));
g.add(st);
var mw = new THREE.Mesh(new THREE.TorusGeometry(395, 40, 4, VRN.lite ? 24 : 48), new THREE.MeshBasicMaterial({ color: 0x1A1C26, transparent: true, opacity: 0.5, depthWrite: false, fog: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
mw.rotation.set(1.1, 0.3, 0.5);
mw.scale.z = 0.05;
g.add(mw);
var sun = wGlow(0xFFF6E0, 90, 1);
sun.material.fog = false;
g.add(sun);
var core = wSph(5, new THREE.MeshBasicMaterial({ color: 0xFFFFF4, fog: false }), 0, 0, 0, g, 16);
sun.add(core);
core.position.set(0, 0, 0);
var earth = new THREE.Group();
g.add(earth);
var em = new THREE.Mesh(new THREE.SphereGeometry(1, VRN.lite ? 32 : 64, VRN.lite ? 20 : 40), vmnLitMat(vmnEarthTex(), { amb: 0.015, gain: 1.1 }));
earth.add(em);
var cl = new THREE.Mesh(new THREE.SphereGeometry(1.012, VRN.lite ? 32 : 64, VRN.lite ? 20 : 40), vmnLitMat(vmnCloudTex(), { alpha: 1, amb: 0.01, gain: 1.2 }));
earth.add(cl);
var halo = new THREE.Mesh(new THREE.SphereGeometry(1.06, VRN.lite ? 24 : 48, VRN.lite ? 16 : 32), vmnHaloMat());
earth.add(halo);
var moon = new THREE.Group();
g.add(moon);
var mm = new THREE.Mesh(new THREE.SphereGeometry(1, VRN.lite ? 40 : 96, VRN.lite ? 24 : 64), vmnLitMat(vmnMoonTex(), { amb: 0.012, gain: 1.18 }));
moon.add(mm);
var bol = new THREE.Group();
g.add(bol);
var rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 1), vmnM(0x5A524A));
bol.add(rock);
var fire = wGlow(0xFFB060, 14, 0.9);
fire.material.fog = false;
bol.add(fire);
bol.visible = false;
var dog = vmnBeast("dog", { s: 1.1 });
dog.visible = false;
g.add(dog);
return { g: g, stars: st, sun: sun, earth: earth, em: em, cl: cl, halo: halo, moon: moon, mm: mm, bol: bol, fire: fire, dog: dog };
},
function (I, k) {
var V = VMN_VIEWS[k];
if (!I || !I.sky || !V)
return;
I.view = k;
VMN.view = k;
var S = I.sky;
function put(o, a) { var l = Math.hypot(a[0], a[1], a[2]); o.position.set(a[0] / l * a[3], a[1] / l * a[3], a[2] / l * a[3]); o.scale.setScalar(Math.max(0.001, a[4])); o.visible = a[4] > 0.01; }
put(S.earth, V.earth);
put(S.moon, V.moon);
var s = new THREE.Vector3(V.sun[0], V.sun[1], V.sun[2]).normalize();
S.sun.position.copy(s).multiplyScalar(380);
[S.em, S.cl, S.mm].forEach(function (m) { m.material.uniforms.sun.value.copy(s); });
S.halo.material.uniforms.sun.value.copy(s);
S.moon.rotation.set((V.tilt || [0, 0])[0], -Math.PI / 2 + ((V.tilt || [0, 0])[1]), 0);
S.earth.rotation.set(0.4, 2.2, 0);
if (I.panels)
I.panels.forEach(function (p) { p.visible = !!V.shut; });
I.shut = !!V.shut;
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1865), iron = vrnMetal(0x2A2A2E), brass = vrnBrass(), wood = vrnSurf("wood", 0x4A2A16, 1.5);
[-14, 0, 14].forEach(function (cx) {
var ch = new THREE.Group();
ch.position.set(X + cx, 6.4, Z - 2);
grp.add(ch);
wCyl(0.02, 0.02, 1.6, iron, 0, 0.8, 0, ch, 4);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 6, 24), brass);
ring.rotation.x = Math.PI / 2;
ch.add(ring);
for (var p = 0; p < (VRN.lite ? 8 : 16); p++) {
var a = p / 16 * Math.PI * 2, pg = new THREE.Group();
pg.position.set(Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2);
pg.rotation.y = -a;
ch.add(pg);
wBox(0.3, 0.05, 0.05, iron, 0.15, 0, 0, pg);
wBox(0.06, 0.14, 0.05, wood, -0.02, -0.08, 0, pg);
wCyl(0.035, 0.035, 0.06, iron, 0.03, 0.01, 0, pg, 6).rotation.z = Math.PI / 2;
}
var gl = wGlow(0xFFE0A8, 6, 0.45);
gl.position.y = -0.1;
ch.add(gl);
});
for (var t = 0; t < 8; t++) {
var side = t < 4 ? -1 : 1, tz = Z - 18 + (t % 4) * 11, tg = new THREE.Group();
tg.position.set(X + side * 29.7, 3.4, tz);
tg.rotation.y = side * Math.PI / 2;
grp.add(tg);
[-1, 1].forEach(function (k) { var m = wBox(0.06, 2.4, 0.06, wood, 0, 0, 0, tg); m.rotation.z = k * 0.6; var bb = wBox(0.04, 1.4, 0.04, iron, k * 0.35, 0.5, 0, tg); bb.rotation.z = k * 0.6; });
var sh = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), brass);
sh.position.z = 0.08;
tg.add(sh);
}
[[-26, -12], [26, -12], [-26, 14], [26, 14]].forEach(function (p) { for (var a = 0; a < 4; a++)
for (var bx = 0; bx < 4 - a; bx++)
for (var bz = 0; bz < 4 - a; bz++)
wSph(0.22, iron, X + p[0] + (bx - (3 - a) / 2) * 0.44, 0.22 + a * 0.36, Z + p[1] + (bz - (3 - a) / 2) * 0.44, grp, 8); });
var pc = new THREE.Group();
pc.position.set(X, 0, Z - 11.4);
grp.add(pc);
vrnBoxM(1.6, 0.5, 1.4, wood, 0, 0.45, 0, pc);
[-0.7, 0.7].forEach(function (k) { var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.12, 16), wood); wh.rotation.z = Math.PI / 2; wh.position.set(k * 0.86, 0.45, 0.2); pc.add(wh); });
vrnBoxM(1.4, 0.18, 1.2, vmnM(0x6A1E1E), 0, 0.8, 0, pc);
vrnBoxM(1.4, 1.6, 0.16, vmnM(0x6A1E1E), 0, 1.6, -0.55, pc);
wBox(1.5, 0.12, 0.2, brass, 0, 2.45, -0.55, pc);
vrnSolid({ x: X, z: Z - 11.4, hw: 0.9, hd: 0.8 });
var mort = wCyl(0.16, 0.2, 0.2, iron, X + 1.8, 0.92, Z - 8, grp, 10);
wSph(0.08, vmnM(0x141414), X + 1.8, 1.02, Z - 8, grp, 8);
var bell = wCyl(0.06, 0.12, 0.14, brass, X - 1.8, 0.94, Z - 8, grp, 10);
vrnSpot(X, Z - 12.8, 2.2, "The President's chair", "look at the President's chair", function () { setStatus("🪑 A chair on a carved gun-carriage, its back in red leather, a little bronze mortar for an inkstand on the table before it. From here Barbicane rules the Gun Club; it is said he has never once raised his voice."); }, 0);
var map = vmnPlate("fltx", 512, 320, function (x, w, h) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, w, h);
x.fillStyle = "#9AB8C8";
x.fillRect(0, 0, w, h);
x.fillStyle = "#E4D6B0";
x.strokeStyle = "#5A4A30";
x.lineWidth = 2;
x.beginPath();
x.moveTo(0, 40);
x.lineTo(230, 40);
x.lineTo(240, 70);
x.lineTo(210, 150);
x.lineTo(150, 240);
x.lineTo(120, 300);
x.lineTo(80, 260);
x.lineTo(40, 200);
x.lineTo(0, 190);
x.closePath();
x.fill();
x.stroke();
x.beginPath();
x.moveTo(250, 20);
x.lineTo(512, 20);
x.lineTo(512, 60);
x.lineTo(430, 70);
x.lineTo(440, 120);
x.lineTo(470, 190);
x.lineTo(470, 250);
x.lineTo(440, 290);
x.lineTo(420, 240);
x.lineTo(400, 180);
x.lineTo(380, 120);
x.lineTo(330, 80);
x.lineTo(270, 70);
x.closePath();
x.fill();
x.stroke();
x.fillStyle = "#2A2018";
x.font = "bold 22px Georgia";
x.fillText("TEXAS", 70, 130);
x.fillText("FLORIDA", 370, 170);
x.font = "italic 15px Georgia";
x.fillText("Gulf of Mexico", 230, 220);
x.strokeStyle = "#B82020";
x.lineWidth = 3;
x.setLineDash([10, 6]);
x.beginPath();
x.moveTo(0, 200);
x.lineTo(w, 200);
x.stroke();
x.setLineDash([]);
x.fillStyle = "#B82020";
x.font = "bold 14px Georgia";
x.fillText("28° N", 8, 194);
x.beginPath();
x.arc(410, 196, 6, 0, 7);
x.fill();
x.fillStyle = "#2A2018";
x.font = "13px Georgia";
x.fillText("Tampa Town", 420, 214);
x.font = "bold 18px Georgia";
x.fillText("THE GUN CLUB · SOUTH OF THE 28th PARALLEL", 40, h - 14);
}, 8, 5);
map.position.set(X - 29.8, 4, Z - 4);
map.rotation.y = Math.PI / 2;
grp.add(map);
wBox(0.1, 5.3, 8.3, wood, X - 29.92, 4, Z - 4, grp);
vrnSpot(X - 27.6, Z - 4, 3, "The map of Florida and Texas", "study the map", function () { setStatus("🗺️ The 28th parallel ruled in red across the Gulf: south of it, the Moon passes straight overhead. Only two states of the Union reach below it: Texas and Florida."); }, 0);
var sub = vmnPlate("subs", 420, 520, function (x, w, h) {
x.fillStyle = "#141414";
x.fillRect(0, 0, w, h);
x.fillStyle = "#E8E0C8";
x.font = "bold 24px Georgia";
x.fillText("SUBSCRIPTIONS · URBI ET ORBI", 14, 36);
var L = [["United States", "$4,000,000"], ["Russia", "368,733 roubles"], ["France", "1,253,930 francs"], ["Austria", "216,000 florins"], ["Sweden & Norway", "52,000 rix-dollars"], ["Prussia", "250,000 thalers"], ["Turkey", "1,372,640 piastres"], ["Belgium", "513,000 francs"], ["Holland", "110,000 florins"], ["Denmark", "9,000 ducats"], ["Italy", "200,000 lire"], ["Mexico", "86 piastres"], ["Great Britain", "nothing"]];
x.font = "18px Georgia";
L.forEach(function (r, i) { x.fillStyle = i === L.length - 1 ? "#E87A6A" : "#E8E0C8"; x.fillText(r[0], 18, 80 + i * 31); x.textAlign = "right"; x.fillText(r[1], w - 18, 80 + i * 31); x.textAlign = "left"; });
x.fillStyle = "#E8C848";
x.font = "bold 20px Georgia";
x.fillText("TOTAL $5,446,675", 18, h - 18);
}, 5, 6.2);
sub.position.set(X + 29.8, 4, Z - 4);
sub.rotation.y = -Math.PI / 2;
grp.add(sub);
wBox(0.1, 6.5, 5.3, wood, X + 29.92, 4, Z - 4, grp);
vrnSpot(X + 27.6, Z - 4, 3, "The subscription board", "read the subscription board", function () { setStatus("💰 The whole world's subscriptions, chalked up country by country. One line is short: Great Britain, nothing at all."); }, 0);
vrnTable(grp, X - 20, Z - 20, 4, 2, 0, 0x3A2214);
[[-21.4, -21.4, 0], [-18.6, -21.4, 0], [-21.4, -18.6, Math.PI], [-18.6, -18.6, Math.PI]].forEach(function (c) { vrnChair(grp, X + c[0], Z + c[1], c[2], 0x5A2A1A); });
var dr = vmnPlate("shelldraw", 256, 160, function (x, w, h) {
x.fillStyle = "#F0E8D4";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#2A3A6A";
x.lineWidth = 2;
x.beginPath();
x.arc(70, 80, 48, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(150, 130);
x.lineTo(150, 60);
x.lineTo(180, 24);
x.lineTo(210, 60);
x.lineTo(210, 130);
x.closePath();
x.stroke();
x.fillStyle = "#2A3A6A";
x.font = "11px Georgia";
x.fillText("108 in.", 52, 145);
x.fillText("cylindro-conical?", 140, 150);
for (var i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(10, 10 + i * 4);
x.lineTo(60, 10 + i * 4);
x.stroke();
}
}, 1.2, 0.75);
dr.rotation.x = -Math.PI / 2;
dr.position.set(X - 20.5, 0.87, Z - 20);
grp.add(dr);
for (var pp = 0; pp < 5; pp++) {
var sh2 = wBox(0.3, 0.005, 0.22, vmnM(0xF2ECDC), X - 19 + pp * 0.25, 0.875, Z - 19.6 + (pp % 2) * 0.3, grp);
sh2.rotation.y = pp * 0.3;
}
vrnSpot(X - 20, Z - 17.6, 2.6, "The committee table", "look at the committee's papers", function () { setStatus("📐 Drawings of a shell, round and then pointed; a gun drawn nine hundred feet long; and sheet after sheet of J. T. Maston's sums, covered with x and n."); }, 0);
for (var r = 0; r < 3; r++) {
var rk = new THREE.Group();
rk.position.set(X + 20 + r * 2.4, 0, Z - 23);
grp.add(rk);
wBox(2, 1.8, 0.3, wood, 0, 0.9, 0, rk);
for (var n = 0; n < 4; n++) {
var pap = wBox(0.42, 0.6, 0.02, vmnM(0xEEE6D2), -0.7 + n * 0.46, 1.1, 0.17, rk);
}
}
vrnSpot(X + 22.4, Z - 21, 2.6, "The newspaper rack", "read the newspapers", function () { var L = ["📰 The New York Herald: 'THE MOON! THE GUN CLUB'S GREAT PROJECT.'", "📰 The Tampa Observer: 'FLORIDA, AND NOWHERE ELSE.'", "📰 The Galveston Journal: 'TEXAS HAS TWENTY-SIX COUNTIES. FLORIDA HAS TWELVE.'", "📰 The Philadelphia Ledger: a letter from Captain Nicholl, with five wagers in it."]; setStatus(L[(Math.random() * L.length) | 0]); }, 0);
if (!VRN.lite)
for (var m = 0; m < 6; m++)
vrnFolk(grp, 1865 + m, X - 10 + m * 4.4, Z + 6 + (m % 2) * 5, { still: 1, look: { sex: "m", layer: "suit", layerColor: [0x2A2A34, 0x3A2A22, 0x22222A][m % 3], hat: "tophat", hatColor: 0x141414 }, name: ["Colonel Blomsberry", "Tom Hunter", "Bilsby", "Major Elphinston", "General Morgan", "A member of the Gun Club"][m],
say: "You are " + ["Colonel Blomsberry", "Tom Hunter", "Bilsby", "Major Elphinston", "General Morgan", "a member"][m] + " of the Gun Club of Baltimore, in Jules Verne's From the Earth to the Moon (1865): an artillery officer of the late war, proud of your wounds and your guns, bored to death by the peace, eager for Barbicane's great project.", greet: "Peace! There's nothing left for a gunner to do." });
},
function (G) {
var y = VRN_TOWN.y, x = 252, z = -136.6, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var wood = vrnSurf("wood", 0x3A2A1E, 1.5);
wBox(0.12, 2.2, 0.12, wood, -0.8, 1.1, 0, g);
wBox(0.12, 2.2, 0.12, wood, 0.8, 1.1, 0, g);
vrnBoxM(1.9, 1.3, 0.1, wood, 0, 1.75, 0, g);
var n = vmnPlate("notice", 256, 180, function (c, w, h) {
c.fillStyle = "#F2EAD4";
c.fillRect(0, 0, w, h);
c.fillStyle = "#1A1410";
c.textAlign = "center";
c.font = "bold 20px Georgia";
c.fillText("THE GUN CLUB", w / 2, 30);
c.font = "15px Georgia";
c.fillText("Members are requested to attend", w / 2, 62);
c.fillText("the meeting of the 5th of October,", w / 2, 84);
c.fillText("at eight o'clock in the evening.", w / 2, 106);
c.font = "italic 14px Georgia";
c.fillText("The President has a communication", w / 2, 136);
c.fillText("of the utmost importance.", w / 2, 156);
}, 1.7, 1.15);
n.position.set(0, 1.75, 0.07);
g.add(n);
var lp = wGlow(0xFFE0A0, 2.2, 0.35);
lp.position.set(0, 2.6, 0.4);
g.add(lp);
vrnSpot(x, z + 1.4, 3, "The Gun Club's notice", "read the notice", function () { var B = store.vearthmoon; if (VBK_BK === "earthmoon" && B && B.started && !B.done) {
setStatus("📜 The Gun Club: members are requested to attend the meeting of the 5th of October.");
return;
} vbkOpen("earthmoon"); }, y);
},
function (G) {
var S = VRN_STONE, y = S.y, grp = new THREE.Group();
grp.name = "vmn-stone";
G.add(grp);
var R = wRand(1866), wood = vrnSurf("wood", 0x8A6A4A, 2), dark = vrnSurf("wood", 0x5A4430, 1.5), iron = vrnMetal(0x2A2A2E), roof = vmnM(0x6A6A6A);
var cr = new THREE.Group();
cr.position.set(S.x, y, S.z);
grp.add(cr);
[[-12, -12], [12, -12], [-12, 12], [12, 12]].forEach(function (p) { var leg = wBox(0.9, 30, 0.9, dark, p[0] * 0.75, 15, p[1] * 0.75, cr); leg.rotation.set(p[1] > 0 ? -0.2 : 0.2, 0, p[0] > 0 ? 0.2 : -0.2); vrnSolid({ x: S.x + p[0] * 0.95, z: S.z + p[1] * 0.95, r: 0.8 }); });
wBox(26, 1.2, 1.2, dark, 0, 29.5, 0, cr);
wBox(1.2, 1.2, 26, dark, 0, 29.5, 0, cr);
var drum = wCyl(1, 1, 3, iron, 0, 30.6, 0, cr, 12);
drum.rotation.z = Math.PI / 2;
var chain = wCyl(0.12, 0.12, 1, iron, 0, 0, 0, cr, 5);
VMN.chain = chain;
var hang = vrnShellModel(1);
hang.position.set(0, 14, 0);
cr.add(hang);
VMN.hangM = hang;
hang.visible = false;
chain.visible = false;
var stair = new THREE.Group();
stair.position.set(S.x + 16, y, S.z);
grp.add(stair);
for (var s = 0; s < 10; s++)
vrnBoxM(1.6, 0.2, 0.6, wood, 0, 0.2 + s * 0.3, -s * 0.55, stair);
vrnBoxM(4, 0.3, 4, wood, 0, 3.1, -7, stair);
vrnSpot(S.x + 14, S.z + 2, 6, "The crane over the Columbiad's mouth", "look up at the crane", function () {
var B = store.vroundmoon, A = store.vearthmoon;
if (VBK_BK === "roundmoon" && B && B.started && !B.done) {
setStatus("🏗️ The crane over the Columbiad's mouth.");
return;
}
if (VBK_BK === "earthmoon" && A && A.started && !A.done) {
setStatus("🏗️ The crane over the Columbiad's mouth, and below it the well of the great gun, nine hundred feet straight down into the hill. (<b>Round the Moon</b> begins here, once the Moon book you are in has been walked to its end.)");
return;
}
vbkOpen("roundmoon");
}, y);
var tx = S.x - 60, tz = S.z + 40;
vmnShed(grp, tx, tz, y, 8, 6, 3, "s", wood, dark, roof);
var tg0 = new THREE.Group();
tg0.position.y = y;
grp.add(tg0);
vrnTable(tg0, tx, tz - 2, 3, 1, 0, 0x4A2A16);
wBox(0.3, 0.1, 0.2, vrnBrass(), tx + 0.4, 0.86, tz - 2, tg0);
wBox(0.24, 0.18, 0.18, iron, tx - 0.4, 0.9, tz - 2, tg0);
vrnChair(tg0, tx, tz - 1, Math.PI, 0x3A2A1A);
for (var p = 0; p < 14; p++) {
var px = tx - 6 - p * 30, pz = tz + 4;
wCyl(0.14, 0.18, 7, dark, px, vrnLand(px, pz) + 3.5, pz, grp, 6);
wBox(1.4, 0.12, 0.12, dark, px, vrnLand(px, pz) + 6.6, pz, grp);
}
vrnSpot(tx, tz + 1.2, 3, "The telegraph hut", "go to the telegraph", function () { setStatus("📡 The key and the sounder, and the wire to Tampa Town: news from the whole world comes in here, and goes out."); }, y);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 6; c++) {
var hx = S.x - 130 + c * 16, hz = S.z + 150 + r * 16, hy = vrnLand(hx, hz);
vmnShed(grp, hx, hz, hy, 12, 8, 3, "s", wood, dark, roof);
for (var b = 0; b < 4; b++) {
vrnBoxM(0.9, 0.5, 2, vmnM(0xC8B890), hx - 4.5 + b * 3, hy + 0.3, hz - 2.6, grp);
}
if (c === 2 && r === 1) {
var tg = new THREE.Group();
tg.position.y = hy;
grp.add(tg);
vrnTable(tg, hx, hz + 1, 4, 1.4, 0, 0x6A4A2A);
for (var q = 0; q < 6; q++)
wCyl(0.08, 0.08, 0.12, vmnM(0x8A8A8A), hx - 1.6 + q * 0.64, hy + 0.92, hz + 1, grp, 8);
}
}
vrnSpot(S.x - 90, S.z + 168, 10, "The works camp", "walk through the camp", function () { setStatus("⛺ Sheds of planks in rows, the men's cots, the canteen, the forge; a town built in a week for fifteen hundred workmen, on the hill where there was nothing."); }, vrnLand(S.x - 90, S.z + 168));
for (var t = 0; t < 60; t++) {
var rx = S.x - 200 - t * 8, rz = S.z - 60, ry = vrnLand(rx, rz);
wBox(0.3, 0.12, 2.4, dark, rx, ry + 0.06, rz, grp);
}
[-0.75, 0.75].forEach(function (k) { var ln = wBox(480, 0.12, 0.1, iron, S.x - 436, 0, S.z - 60 + k, grp); ln.position.y = vrnLand(S.x - 436, S.z - 60) + 0.18; });
vrnBoxM(30, 1, 6, vrnSurf("stone", 0xB8B0A0, 2), S.x - 210, y + 0.5, S.z - 66, grp);
vrnFloor(S.x - 210, S.z - 66, 15, 3, y + 1);
var sign = wSign(["STONE'S HILL"], 5, 1, "#1E2A3A", "#E8D8A8");
sign.position.set(S.x - 210, y + 3.4, S.z - 69);
grp.add(sign);
vrnSpot(S.x - 210, S.z - 64, 6, "The railway platform", "wait for the train", function () { setStatus("🚂 The Gun Club's railway runs from here to Tampa Town, fifteen miles: rails, iron, coal, food and men come up it every day."); }, y + 1);
[-1, 1].forEach(function (k) { var fl = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.4), vlgFlagMat()); fl.position.set(S.x + k * 13, y + 33, S.z); grp.add(fl); wCyl(0.08, 0.08, 5, iron, S.x + k * 11, y + 31.5, S.z, grp, 5); });
VMN.glows = [];
for (var f = 0; f < (VRN.lite ? 12 : 24); f++) {
var a = f / (VRN.lite ? 12 : 24) * Math.PI * 2, gx = S.x + Math.cos(a) * 116, gz = S.z + Math.sin(a) * 116, gl = wGlow(0xFF8A3A, 8, 0);
gl.position.set(gx, y + 2, gz);
grp.add(gl);
VMN.glows.push(gl);
}
vrnSpot(S.x + 116, S.z, 8, "The furnaces", "look at the furnaces", function () { setStatus("🔥 Twelve hundred reverberatory furnaces round the hill, each its own chimney, each fed with coal and iron, all to be lit together on the day of the casting."); }, y);
VMN.stone = grp;
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1847), plaster = vrnSurf("plaster", 0xE8E2D4, 2), wood = vrnSurf("wood", 0x5A3A22, 2), iron = vrnMetal(0x2A2C30), brass = vrnBrass(), grass = vrnSurf("grass", 0x3A5A2A, 4);
vrnInFloor(grp, X, Z, 140, 140, 0, grass);
var path = vrnBoxM(4, 0.05, 30, vrnSurf("stone", 0xB8B0A0, 2), X, 0.03, Z + 16, grp);
for (var t = 0; t < (VRN.lite ? 14 : 30); t++) {
var a = R() * 6.28, r = 26 + R() * 36;
vmnTree(grp, "jungle", X + Math.cos(a) * r, 0, Z + Math.sin(a) * r, 0.9 + R() * 0.5, R() * 6);
vrnSolid({ x: X + Math.cos(a) * r, z: Z + Math.sin(a) * r, r: 0.7 });
}
var n = 24;
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2;
if (i === 6)
continue;
vrnIWall(grp, X + Math.cos(a0) * 10, Z + Math.sin(a0) * 10, X + Math.cos(a1) * 10, Z + Math.sin(a1) * 10, 7, plaster);
}
vrnInFloor(grp, X, Z, 20, 20, 0.04, wood);
var dome = new THREE.Mesh(new THREE.SphereGeometry(10.4, VRN.lite ? 16 : 32, VRN.lite ? 8 : 16, 0.25, Math.PI * 2 - 0.5, 0, Math.PI / 2), vmnM(0xC8CCD0, { ds: true, shine: 40 }));
dome.position.set(X, 7, Z);
dome.rotation.y = -Math.PI / 2;
grp.add(dome);
vrnBoxM(2.2, 0.2, 22, iron, X, 7, Z, grp);
I.slit = dome;
var pier = wCyl(1.1, 1.4, 3, vrnSurf("stone", 0x8A8478, 2), X, 1.5, Z, grp, 12);
vrnSolid({ x: X, z: Z, r: 1.4 });
var tube = new THREE.Group();
tube.position.set(X, 3.4, Z);
tube.rotation.set(-0.75, 0, 0);
grp.add(tube);
wCyl(0.32, 0.38, 7, vmnM(0x2A3A5A, { shine: 60 }), 0, 1.6, 0, tube, 16);
wCyl(0.42, 0.42, 0.4, brass, 0, 5.1, 0, tube, 16);
wCyl(0.12, 0.12, 0.5, brass, 0, -2.1, 0, tube, 10);
var ladder = new THREE.Group();
ladder.position.set(X + 3, 0, Z - 3);
ladder.rotation.y = 0.6;
grp.add(ladder);
[-0.5, 0.5].forEach(function (k) { wBox(0.08, 5, 0.08, wood, k, 2.5, 0, ladder); });
for (var s = 0; s < 12; s++)
wBox(1, 0.05, 0.08, wood, 0, 0.3 + s * 0.4, 0, ladder);
var chair = new THREE.Group();
chair.position.set(X + 1.2, 0, Z + 2.2);
grp.add(chair);
vrnBoxM(0.6, 0.08, 0.6, wood, 0, 1.4, 0, chair);
[-0.25, 0.25].forEach(function (k) { wBox(0.06, 1.4, 0.06, wood, k, 0.7, 0.25, chair); wBox(0.06, 1.4, 0.06, wood, k, 0.7, -0.25, chair); });
vrnSpot(X + 1.4, Z + 1.6, 2.6, "The great refractor", "look through the great refractor", function () { worldCard(VRN_H + "🔭 The Moon, through the great refractor</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>The Moon fills the eyepiece: grey seas and white mountains, the long black shadows of the craters along the line where night meets day. Two hundred and forty thousand miles away, and you can count the peaks.</div>", {}); }, 0);
var SX = X, SZ = Z + 20;
vrnRoom(grp, SX, SZ, 14, 10, 4, { wall: plaster, floor: wood, gaps: { n: [[7, 1.6, 0]], s: [[7, 1.8, 0]] } });
vrnTable(grp, SX - 3, SZ - 1, 3, 1.4, 0, 0x4A2A16);
vrnChair(grp, SX - 3, SZ - 2.3, 0, 0x5A2A1A);
vrnShelf(grp, SX + 4, SZ - 4.6, 5, 0, 3.4);
vrnShelf(grp, SX - 5.5, SZ + 4.6, 3, Math.PI, 3.4);
for (var l = 0; l < 6; l++) {
var lt = wBox(0.22, 0.005, 0.3, vmnM(0xF2ECDC), SX - 3.8 + l * 0.32, 0.875, SZ - 0.8, grp);
lt.rotation.y = (l - 3) * 0.15;
}
var lamp = wGlow(0xFFE0A0, 4, 0.5);
lamp.position.set(SX - 2, 1.4, SZ - 1);
grp.add(lamp);
var chart = vmnPlate("starchart", 256, 256, function (x, w, h) {
x.fillStyle = "#141C34";
x.fillRect(0, 0, w, h);
var r = wRand(9);
x.fillStyle = "#F0F0E0";
for (var i = 0; i < 220; i++) {
x.beginPath();
x.arc(r() * w, r() * h, r() * 1.8 + 0.3, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(200,180,120,.5)";
for (var g = 1; g < 6; g++) {
x.beginPath();
x.arc(w / 2, h / 2, g * 24, 0, 7);
x.stroke();
}
x.fillStyle = "#E8C848";
x.font = "12px Georgia";
x.fillText("THE MOON'S PATH · 1st DECEMBER", 8, h - 8);
}, 2.4, 2.4);
chart.position.set(SX + 6.84, 2.2, SZ);
chart.rotation.y = -Math.PI / 2;
grp.add(chart);
vrnSpot(SX - 3, SZ + 0.6, 2.4, "The Director's desk", "look at the desk", function () { setStatus("✉️ Letters from every observatory in Europe; a fair copy, nearly finished, addressed To the President of the Gun Club at Baltimore."); }, 0);
vrnSpot(SX + 5.2, SZ, 2.4, "The star charts", "study the star charts", function () { setStatus("🗺️ The Moon's path among the stars for the coming year, worked out to the second, and one night ringed in ink: the 1st of December."); }, 0);
vrnSpot(X, Z + 31, 3, "The observatory gate", "go home to Baltimore", function () { vrnLeave("vmn_cambridge"); }, 0);
for (var lp = 0; lp < 4; lp++) {
var gl = wGlow(0xFFE8B8, 4, 0.35);
gl.position.set(X + Math.cos(lp * 1.57) * 8, 5.4, Z + Math.sin(lp * 1.57) * 8);
grp.add(gl);
}
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1866), sand = vrnSurf("sand", 0xD8C8A0, 5), wood = vrnSurf("wood", 0xD8D0BC, 2), pl = vrnSurf("wood", 0x8A6A4A, 2), stone = vrnSurf("stone", 0xB8B0A0, 3), roofM = vmnM(0x6A5A4A), green = vmnM(0x4A6A3A);
vrnInFloor(grp, X, Z + 20, 440, 280, 0, sand);
vlgSea(grp, X, Z - 200, -1.2, 460, 0x2A6A7A);
vrnBoxM(220, 1.4, 12, stone, X - 30, -0.5, Z - 114, grp);
vrnFloor(X - 30, Z - 114, 110, 6, 0.2, { inside: 1 });
for (var b = 0; b < 14; b++)
wCyl(0.25, 0.3, 1.2, vrnMetal(0x2A2A2A), X - 130 + b * 16, 0.8, Z - 119.4, grp, 8);
var atl = vlgShipModel({ L: 62, B: 10, D: 6, masts: [14, -12], mh: 24, ports: false, flag: true, hull: 0x1E1E22, band: 0xC8B890 });
atl.position.set(X - 40, -1.4, Z - 132);
grp.add(atl);
I.atlanta = atl;
wCyl(1.3, 1.3, 9, vmnM(0x1A1A1A), X - 40, 8, Z - 132, grp, 12);
wBox(14, 6, 0.4, vmnM(0x3A2A1A), X - 40, 2.2, Z - 127, grp);
var tam = vlgShipModel({ L: 54, B: 9, D: 5, masts: [12, -10], mh: 22, ports: false, flag: true, hull: 0x2A1E18, band: 0xE8E0CC });
tam.position.set(X + 60, -1.4, Z - 134);
grp.add(tam);
wCyl(1.1, 1.1, 8, vmnM(0x6A1A1A), X + 60, 7.4, Z - 134, grp, 12);
var gang = vrnBoxM(2, 0.2, 10, pl, X - 40, 0.8, Z - 122, grp);
gang.rotation.x = -0.12;
vrnSpot(X - 40, Z - 116, 5, "The Atlanta, at the quay", "look at the Atlanta", function () { setStatus("🚢 The Atlanta, a steamer from Liverpool: smoke still coming from her funnel, her passengers' boxes piled on the quay, the whole of Tampa crowded to see her."); }, 0.2);
vrnSpot(X + 20, Z - 112, 6, "The quay of Tampa Town", "walk along the quay", function () { setStatus("⚓ Tampa Bay: the steamers in from Mobile and New Orleans and New York, the barges for Stone's Hill, the bales, the barrels, the crowds."); }, 0.2);
function house(hx, hz, w, d, h, col, ry, ver) {
var g = new THREE.Group();
g.position.set(X + hx, 0, Z + hz);
g.rotation.y = ry || 0;
grp.add(g);
vrnBoxM(w, h, d, vrnSurf("wood", col, 2), 0, h / 2, 0, g);
var rf = new THREE.Mesh(vrnPitchGeo(w + 0.6, d + 0.6, 2, 0.4), roofM);
rf.position.y = h;
g.add(rf);
for (var k = 0; k < Math.max(1, (w / 3.2) | 0); k++)
for (var f = 0; f < (h > 6 ? 2 : 1); f++) {
var wn = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.5), vmnM(0x2A3440, { shine: 70 }));
wn.position.set(-w / 2 + 1.6 + k * 3.2, 1.8 + f * 3.4, d / 2 + 0.02);
g.add(wn);
wBox(0.15, 1.5, 0.06, green, -w / 2 + 1.0 + k * 3.2, 1.8 + f * 3.4, d / 2 + 0.05, g);
wBox(0.15, 1.5, 0.06, green, -w / 2 + 2.2 + k * 3.2, 1.8 + f * 3.4, d / 2 + 0.05, g);
}
if (ver) {
vrnBoxM(w, 0.15, 2.6, pl, 0, 0.2, d / 2 + 1.3, g);
wBox(w, 0.15, 2.8, roofM, 0, 3.2, d / 2 + 1.4, g);
for (var p = 0; p <= w / 3; p++)
wCyl(0.1, 0.1, 3, wood, -w / 2 + p * 3, 1.6, d / 2 + 2.5, g, 6);
}
var a = Math.abs(Math.cos(ry || 0)) > 0.5;
vrnSolid({ x: X + hx, z: Z + hz, hw: (a ? w : d) / 2, hd: (a ? d : w) / 2, h: h + 2 });
return g;
}
var cols = [0xE8E0CC, 0xD8C8A8, 0xC8D0D8, 0xE8D8B8, 0xB8C8B0, 0xF0EAE0];
for (var i = 0; i < 9; i++) {
if (i !== 4)
house(-150 + i * 24, -70, 14, 9, 5, cols[i % 6], 0, 1);
house(-150 + i * 24, -30, 14, 9, i % 3 ? 5 : 8, cols[(i + 2) % 6], Math.PI, 1);
}
house(-54, -70, 22, 12, 10, 0xF2EEE4, 0, 1);
var hs = wSign(["FRANKLIN HOTEL"], 8, 1.2, "#1E2A3A", "#E8D8A8");
hs.position.set(X - 54, 8.6, Z - 63.7);
grp.add(hs);
vrnSpot(X - 54, Z - 61, 4, "The Franklin Hotel", "go up to the rooms", function () { setStatus("🏨 The Franklin Hotel: every room taken since the Gun Club came, the veranda full of reporters, and a crowd in the street day and night under Barbicane's windows."); }, 0);
house(42, -30, 10, 8, 5, 0xC8B898, Math.PI, 1);
var ts = wSign(["TELEGRAPH"], 5, 0.9, "#1E2A3A", "#E8D8A8");
ts.position.set(X + 42, 4.6, Z - 34.3);
ts.rotation.y = Math.PI;
grp.add(ts);
vrnSpot(X + 42, Z - 37, 3.5, "The telegraph office", "go to the telegraph office", function () { setStatus("📡 The telegraph office: the clerks at their keys, the wire to the whole Union and, by the cable from Valentia, to Europe."); }, 0);
var ch = new THREE.Group();
ch.position.set(X + 100, 0, Z - 60);
grp.add(ch);
vrnBoxM(12, 7, 20, vrnSurf("wood", 0xF2F0EA, 2), 0, 3.5, 0, ch);
var crf = new THREE.Mesh(vrnPitchGeo(12.6, 20.6, 4, 0.4), roofM);
crf.position.y = 7;
ch.add(crf);
vrnBoxM(3.4, 9, 3.4, vrnSurf("wood", 0xF2F0EA, 2), 0, 4.5, 11, ch);
wCone(2.4, 7, vmnM(0xF2F0EA), 0, 12.5, 11, ch, 4);
vrnSolid({ x: X + 100, z: Z - 60, hw: 6, hd: 12 });
for (var t = 0; t < (VRN.lite ? 16 : 40); t++) {
var tx = -170 + R() * 300, tz = [-50, -92, 10, 50][t % 4] + (R() - 0.5) * 6;
vmnTree(grp, t % 3 ? "palm" : "jungle", X + tx, 0, Z + tz, 0.7 + R() * 0.4, R() * 6);
vrnSolid({ x: X + tx, z: Z + tz, r: 0.5 });
}
var MX = X + 120, MZ = Z + 80;
var trib = new THREE.Group();
trib.position.set(MX, 0, MZ);
grp.add(trib);
vrnBoxM(16, 2.4, 8, pl, 0, 1.2, 0, trib);
vrnFloor(MX, MZ, 8, 4, 2.4, { inside: 1 });
for (var s2 = 0; s2 < 6; s2++)
vrnBoxM(3, 0.2, 0.6, pl, 9.2, 0.2 + s2 * 0.4, -2 + s2 * 0.6, trib);
for (var k2 = 0; k2 < 5; k2++) {
wCyl(0.08, 0.08, 8, vrnMetal(0x3A3A3A), -7 + k2 * 3.5, 6.4, -3.6, trib, 5);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), vlgFlagMat());
fl.position.set(-5.7 + k2 * 3.5, 9.4, -3.6);
trib.add(fl);
}
vrnBoxM(16, 0.4, 0.4, vmnM(0xB82020), 0, 2.6, 4, trib);
vrnSolid({ x: MX, z: MZ, hw: 8, hd: 4, h: 2.4 });
vrnSpot(MX, MZ + 5, 5, "The platform on the meeting-field", "go up to the platform", function () { setStatus("🎤 The platform outside the town, its flags snapping: the whole crowd of Tampa, and half of Florida, packed round it as far as you can see."); }, 0);
var mort = new THREE.Group();
mort.position.set(X - 150, 0, Z + 70);
grp.add(mort);
wCyl(1.6, 2, 3, vrnMetal(0x2A2A2E), 0, 1.5, 0, mort, 16).rotation.x = -0.6;
vrnBoxM(5, 1, 5, vrnSurf("wood", 0x5A4430, 1), 0, 0.5, 0, mort);
vrnSolid({ x: X - 150, z: Z + 70, r: 3 });
vrnSpot(X - 150, Z + 74, 5, "The great mortar of Pensacola", "look at the mortar", function () { setStatus("💥 A huge mortar, brought from the arsenal at Pensacola, to try the shock of a shell on living creatures before any man goes."); }, 0);
vrnBoxM(10, 0.05, 200, vrnSurf("sand", 0xC8B890, 4), X + 200, 0.03, Z + 40, grp);
vrnSpot(X + 200, Z + 110, 5, "The road to Stone's Hill", "ride to Stone's Hill", function () { var S = VRN_STONE; vrnMove(S.x - 100, S.z + 60, Math.PI / 2, "🐎 Fifteen miles inland, through the pine woods and the swamps, up to <b>Stone's Hill</b>."); }, 0);
I.folk = [];
for (var f = 0; f < (VRN.lite ? 14 : 44); f++) {
var fx = X - 160 + R() * 320, fz = Z + [-50, -92, 10, 60, 80][f % 5] + (R() - 0.5) * 14;
I.folk.push(vrnFolk(grp, 1900 + f, fx, fz, { r: 16 }));
}
I.crowd = new THREE.Group();
grp.add(I.crowd);
I.crowd.visible = false;
for (var cw = 0; cw < (VRN.lite ? 24 : 64); cw++) {
var a = R() * Math.PI - Math.PI, r = 12 + R() * 36, p = wPerson("vmn_cw" + cw, {});
p.position.set(MX + Math.cos(a) * r, 0, MZ + 18 + Math.abs(Math.sin(a)) * r);
p.rotation.y = Math.atan2(MX - p.position.x, MZ - p.position.z);
I.crowd.add(p);
}
I.crowd.userData.keep = 1;
for (var lmp = 0; lmp < 10; lmp++) {
var lg = wGlow(0xFFE0A0, 3, 0.3);
lg.position.set(X - 150 + lmp * 30, 4, Z - 50);
grp.add(lg);
}
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1866), ground = vrnSurf("grass", 0x4A5A2A, 4);
vrnInFloor(grp, X, Z, 280, 280, 0, ground);
var moss = vmnM(0x9A9A88, { ds: true });
for (var t = 0; t < (VRN.lite ? 60 : 170); t++) {
var tx = (R() - 0.5) * 260, tz = (R() - 0.5) * 260;
if (Math.abs(tx) < 4 && tz > 60)
continue;
if (Math.hypot(tx - 18, tz + 20) < 10)
continue;
var k = R(), kind = k < 0.55 ? "jungle" : k < 0.8 ? "palm" : "pine", s = 0.8 + R() * 0.7;
vmnTree(grp, kind, X + tx, 0, Z + tz, s, R() * 6);
vrnSolid({ x: X + tx, z: Z + tz, r: 0.6 * s });
if (kind === "jungle" && R() < 0.6)
for (var m = 0; m < 3; m++) {
var mm = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 2.4 + R() * 2), moss);
mm.position.set(X + tx + (R() - 0.5) * 5, 7 + R() * 3, Z + tz + (R() - 0.5) * 5);
mm.rotation.y = R() * 3;
grp.add(mm);
}
}
for (var u = 0; u < (VRN.lite ? 40 : 140); u++) {
var bx = (R() - 0.5) * 260, bz = (R() - 0.5) * 260, bu = wSph(0.6 + R() * 1.2, vmnM([0x3A5A2A, 0x4A6A30, 0x2E4A26][u % 3]), X + bx, 0.4, Z + bz, grp, 6);
bu.scale.y = 0.6;
}
vrnBoxM(3, 0.04, 120, vrnSurf("sand", 0xA89A70, 3), X, 0.02, Z + 70, grp);
var st = new THREE.Mesh(new THREE.PlaneGeometry(6, 280), vrnWaterMat(0x3A5A4A, 0.9));
st.rotation.x = -Math.PI / 2;
st.position.set(X - 40, 0.03, Z);
grp.add(st);
vrnSpot(X - 36, Z + 10, 6, "The stream", "drink from the stream", function () { setStatus("💧 Cold, clear water, running over sand under the trees. Somewhere a mocking-bird; nothing else."); }, 0);
var cat = vmnTree(grp, "jungle", X + 18, 0, Z - 20, 1.9, 0.4);
vrnSolid({ x: X + 18, z: Z - 20, r: 1.4 });
I.catalpa = cat;
var web = new THREE.Group();
web.position.set(X + 16, 2.6, Z - 16.4);
grp.add(web);
var wm = new THREE.LineBasicMaterial({ color: 0xE8E8F0, transparent: true, opacity: 0.6 });
for (var s = 0; s < 12; s++) {
var a = s / 12 * Math.PI * 2;
web.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0)]), wm));
}
for (var rr = 1; rr < 6; rr++) {
var pts = [];
for (var q = 0; q <= 24; q++) {
var aa = q / 24 * Math.PI * 2;
pts.push(new THREE.Vector3(Math.cos(aa) * rr * 0.2, Math.sin(aa) * rr * 0.2, 0));
}
web.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), wm));
}
var bird = new THREE.Group();
bird.position.set(0.2, 0.1, 0.02);
web.add(bird);
var bb = wSph(0.07, vmnM(0x3A6A9A), 0, 0, 0, bird, 8);
bb.scale.set(1, 0.8, 1.4);
wSph(0.045, vmnM(0x3A6A9A), 0, 0.06, 0.08, bird, 6);
I.bird = bird;
var spider = wSph(0.06, vmnM(0x1A1A1A), -0.3, 0.4, 0.02, web, 6);
I.spider = spider;
I.web = web;
vrnSpot(X + 16, Z - 14.4, 3, "The gigantic catalpa", "look up into the catalpa", function () { setStatus("🌳 A great catalpa, twenty feet off the path, its leaves like hearts; and between two of its low branches, something caught and struggling."); }, 0);
vrnSpot(X + 16, Z - 15.2, 2.2, "The spider's web", "look closer at the web", function () { if (VMN.birdAsk && !VMN.bird) {
VMN.bird = 1;
I.bird.visible = false;
setStatus("🐦 Gently, with Nicholl: the threads part, and the little bird is off into the trees.");
return;
} setStatus(VMN.bird ? "🕸️ An empty web, torn, and a cross spider." : "🕸️ A little bird, a fly-catcher, tangled in a spider's web; and a fat spider coming for it down the threads."); }, 0);
vrnSpot(X, Z + 128, 4, "The way out of the wood", "walk back to Tampa Town", function () { vrnEnter("vmn_tampa"); }, 0);
vrnSpot(X, Z + 116, 4, "The edge of the wood", "look into the wood", function () { setStatus("🌲 Tall trees and grey moss, and no sound but the birds. Somewhere in there, Barbicane; somewhere else, Nicholl."); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, iron = vmnM(0x3A3C40, { shine: 90, spec: 0x8A8A8A, ds: true }), R = 2.6, H = VRN.lite ? 80 : 160;
var bore = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, VRN.lite ? 20 : 40, VRN.lite ? 4 : 12, true), iron);
bore.position.set(X, H / 2, Z);
grp.add(bore);
for (var r = 0; r < (VRN.lite ? 8 : 20); r++)
wCyl(R - 0.01, R - 0.01, 0.08, vmnM(0x2A2C30, { ds: true }), X, 2 + r * 7, Z, grp, VRN.lite ? 20 : 40).material.side = THREE.BackSide;
vrnInFloor(grp, X, Z, R * 2, R * 2, 0, vmnM(0x2A2A2E, { shine: 60 }));
vmnRingSolid(X, Z, R, 16, H);
var sky = new THREE.Mesh(new THREE.CircleGeometry(R, 24), new THREE.MeshBasicMaterial({ color: 0x8AB0E0, fog: false }));
sky.rotation.x = Math.PI / 2;
sky.position.set(X, H, Z);
grp.add(sky);
var tb = wCyl(1.4, 1.4, 0.08, vmnM(0xF4F0E8), X, 0.82, Z, grp, 24);
wCyl(0.15, 0.25, 0.8, vmnM(0x4A2A16), X, 0.4, Z, grp, 10);
vrnSolid({ x: X, z: Z, r: 1.45 });
for (var c = 0; c < 10; c++) {
var a = c / 10 * Math.PI * 2;
vrnChair(grp, X + Math.cos(a) * 1.85, Z + Math.sin(a) * 1.85, -a - Math.PI / 2, 0x6A1E1E);
wCyl(0.14, 0.14, 0.02, vmnM(0xFFFFFF, { shine: 80 }), X + Math.cos(a) * 1.15, 0.87, Z + Math.sin(a) * 1.15, grp, 12);
wCyl(0.03, 0.02, 0.16, vmnM(0xE8F0F8, { op: 0.5 }), X + Math.cos(a + 0.2) * 1.05, 0.94, Z + Math.sin(a + 0.2) * 1.05, grp, 6);
}
wCyl(0.2, 0.3, 0.22, vrnBrass(), X, 0.97, Z, grp, 12);
for (var f = 0; f < 5; f++)
wSph(0.07, vmnM([0xE84A4A, 0xE8C048, 0x8AB84A][f % 3]), X + (f - 2) * 0.12, 1.12, Z, grp, 6);
for (var l = 0; l < 6; l++) {
var a2 = l / 6 * Math.PI * 2, gl = wGlow(0xF0F4FF, 5, 0.6);
gl.position.set(X + Math.cos(a2) * (R - 0.3), 3, Z + Math.sin(a2) * (R - 0.3));
grp.add(gl);
wSph(0.12, vmnM(0xFFFFFF, { e: 0xF0F4FF, ei: 1 }), X + Math.cos(a2) * (R - 0.2), 3, Z + Math.sin(a2) * (R - 0.2), grp, 8);
}
var bk = new THREE.Group();
bk.position.set(X - 1.6, 0, Z + 1.2);
grp.add(bk);
wCyl(0.6, 0.5, 0.9, vrnSurf("wood", 0x8A6A3A, 1), 0, 0.45, 0, bk, 10);
wCyl(0.02, 0.02, H, vmnM(0x6A5A40), 0, H / 2, 0, bk, 4);
vrnSpot(X, Z + 1.8, 1.6, "The banquet table", "sit down at the banquet", function () { setStatus("🍽️ Dinner nine hundred feet down: the toasts follow one another, the iron walls ring with hurrahs, and somebody has brought a cannon-ball for a centrepiece."); }, 0);
vrnSpot(X - 1.6, Z + 1.2, 1.4, "The lift-basket", "go up in the basket", function () { vrnLeave("vmn_bore"); }, 0);
vrnSpot(X + 1.8, Z - 1.4, 1.4, "The iron wall of the bore", "touch the wall", function () { setStatus("🔩 Cold iron, polished like glass, nine hundred feet of it straight up to a little disc of blue sky."); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, Rr = 1.6, Hw = 2.7, al = vmnM(0xC8CCD2, { shine: 80, spec: 0x8A8A8A, ds: true }), brass = vrnBrass(), wood = vrnSurf("wood", 0x6A4A2A, 1);
var pad = vmnCanvas("pad", 512, 256, function (x, w, h) {
x.fillStyle = "#6A3A22";
x.fillRect(0, 0, w, h);
for (var j = 0; j < 8; j++)
for (var i = 0; i < 16; i++) {
var cx = i * 32 + (j % 2 ? 16 : 0) + 8, cy = j * 32 + 16, g = x.createRadialGradient(cx, cy, 2, cx, cy, 22);
g.addColorStop(0, "#8A5232");
g.addColorStop(1, "#4A2414");
x.fillStyle = g;
x.fillRect(cx - 16, cy - 16, 32, 32);
x.fillStyle = "#C8A04A";
x.beginPath();
x.arc(cx - 16, cy - 16, 2, 0, 7);
x.fill();
}
});
var hole = vmnCanvas("padhole", 256, 128, function (x, w, h) { x.fillStyle = "#FFF"; x.fillRect(0, 0, w, h); x.fillStyle = "#000"; [0.25, 0.75].forEach(function (u) { x.beginPath(); x.ellipse(u * w, h * (1 - 1.55 / Hw), w * 0.045, h * 0.11, 0, 0, 7); x.fill(); }); });
pad.wrapS = THREE.RepeatWrapping;
var wallM = new THREE.MeshPhongMaterial({ map: pad, alphaMap: hole, alphaTest: 0.5, side: THREE.DoubleSide, shininess: 12 });
var wall = new THREE.Mesh(new THREE.CylinderGeometry(Rr, Rr, Hw, VRN.lite ? 24 : 48, 1, true), wallM);
wall.position.set(X, Hw / 2, Z);
grp.add(wall);
var outer = new THREE.Mesh(new THREE.CylinderGeometry(Rr + 0.12, Rr + 0.12, Hw, VRN.lite ? 24 : 48, 1, true), new THREE.MeshPhongMaterial({ color: 0xC8CCD2, alphaMap: hole, alphaTest: 0.5, side: THREE.DoubleSide, shininess: 60 }));
outer.position.set(X, Hw / 2, Z);
grp.add(outer);
var coneM = new THREE.MeshPhongMaterial({ map: pad, side: THREE.DoubleSide, shininess: 12 });
var cone = new THREE.Mesh(new THREE.CylinderGeometry(0.32, Rr, 1.7, VRN.lite ? 24 : 48, 1, true), coneM);
cone.position.set(X, Hw + 0.85, Z);
grp.add(cone);
var oc = new THREE.Mesh(new THREE.CylinderGeometry(0.36, Rr + 0.12, 1.8, VRN.lite ? 24 : 48, 1, true), al);
oc.position.set(X, Hw + 0.9, Z);
grp.add(oc);
var floorM = new THREE.MeshPhongMaterial({ map: vrnTex("wood", 0.8), color: 0x8A6A4A, alphaMap: vmnCanvas("floorhole", 128, 128, function (x, w, h) { x.fillStyle = "#FFF"; x.fillRect(0, 0, w, h); x.fillStyle = "#000"; x.beginPath(); x.arc(w / 2, h / 2, w * 0.13, 0, 7); x.fill(); }), alphaTest: 0.5, side: THREE.DoubleSide });
var floor = new THREE.Mesh(new THREE.CircleGeometry(Rr, VRN.lite ? 24 : 48), floorM);
floor.rotation.x = -Math.PI / 2;
floor.position.set(X, 0.002, Z);
grp.add(floor);
vrnFloor(X, Z, Rr, Rr, 0, { inside: 1 });
var under = new THREE.Mesh(new THREE.CircleGeometry(Rr + 0.12, VRN.lite ? 24 : 48), new THREE.MeshPhongMaterial({ color: 0xC8CCD2, alphaMap: floorM.alphaMap, alphaTest: 0.5, side: THREE.DoubleSide }));
under.rotation.x = -Math.PI / 2;
under.position.set(X, -0.4, Z);
grp.add(under);
var glassM = new THREE.MeshPhongMaterial({ color: 0xB8D0E8, transparent: true, opacity: 0.12, shininess: 120, specular: 0xFFFFFF, depthWrite: false, side: THREE.DoubleSide });
I.panels = [];
var panelM = vmnM(0x8A8E94, { shine: 40, ds: true });
var wins = [[Math.PI / 2, 1.55], [-Math.PI / 2, 1.55]];
wins.forEach(function (wv, i) {
var a = i === 0 ? 0 : Math.PI, wx = Math.cos(a) * Rr, wz = Math.sin(a) * Rr;
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), glassM);
gl.position.set(X + wx * 1.04, 1.55, Z + wz * 1.04);
gl.rotation.y = i === 0 ? -Math.PI / 2 : Math.PI / 2;
grp.add(gl);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 8, 28), brass);
rim.position.copy(gl.position);
rim.position.x -= Math.sign(wx) * 0.03;
rim.rotation.y = gl.rotation.y;
grp.add(rim);
var pn = new THREE.Mesh(new THREE.CircleGeometry(0.4, 20), panelM);
pn.position.set(X + wx * 1.1, 1.55, Z);
pn.rotation.y = gl.rotation.y;
grp.add(pn);
I.panels.push(pn);
});
var fg = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), glassM);
fg.rotation.x = -Math.PI / 2;
fg.position.set(X, -0.05, Z);
grp.add(fg);
var fr = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.03, 8, 24), brass);
fr.rotation.x = Math.PI / 2;
fr.position.set(X, 0.01, Z);
grp.add(fr);
var fp = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), panelM);
fp.rotation.x = -Math.PI / 2;
fp.position.set(X, -0.42, Z);
grp.add(fp);
I.panels.push(fp);
var tg = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), glassM);
tg.rotation.x = Math.PI / 2;
tg.position.set(X, Hw + 1.7, Z);
grp.add(tg);
var tp = new THREE.Mesh(new THREE.CircleGeometry(0.36, 20), panelM);
tp.rotation.x = Math.PI / 2;
tp.position.set(X, Hw + 1.82, Z);
grp.add(tp);
I.panels.push(tp);
vmnRingSolid(X, Z, Rr - 0.05, 16, 5);
for (var c = 0; c < 3; c++) {
var a = Math.PI / 2 + c * Math.PI * 2 / 3 + 0.3, cg = new THREE.Group();
cg.position.set(X + Math.cos(a) * 1.15, 0, Z + Math.sin(a) * 1.15);
cg.rotation.y = -a - Math.PI / 2;
grp.add(cg);
vrnBoxM(0.9, 0.36, 0.5, vmnM(0x7A3A22), 0, 0.2, 0, cg);
vrnBoxM(0.9, 0.5, 0.12, vmnM(0x6A3020), 0, 0.55, -0.2, cg);
}
var gas = wCyl(0.14, 0.14, 0.8, vmnM(0x4A5A3A, { shine: 50 }), X + 0.4, 2.3, Z - 1.3, grp, 12);
var burner = wCyl(0.06, 0.1, 0.14, brass, X, 2.75, Z, grp, 10);
wCyl(0.01, 0.01, 0.6, brass, X + 0.2, 2.75, Z - 0.65, grp, 4).rotation.x = 1.2;
I.lamp = wGlow(0xFFE8B8, 7, 0.55);
I.lamp.position.set(X, 2.55, Z);
grp.add(I.lamp);
I.flame = wSph(0.035, new THREE.MeshBasicMaterial({ color: 0xFFE8A0 }), X, 2.62, Z, grp, 8);
var ox = new THREE.Group();
ox.position.set(X - 1.25, 1.0, Z - 0.75);
ox.rotation.y = 0.9;
grp.add(ox);
vrnBoxM(0.5, 0.6, 0.3, vmnM(0x3A4A5A, { shine: 40 }), 0, 0, 0, ox);
wCyl(0.04, 0.04, 0.14, brass, 0.18, 0.1, 0.18, ox, 6).rotation.x = Math.PI / 2;
var tap = wBox(0.16, 0.03, 0.03, vmnM(0xB82020), 0.18, 0.1, 0.26, ox);
I.tap = tap;
for (var s = 0; s < 4; s++) {
var a3 = -0.5 + s * 0.5, sx = X + Math.cos(a3) * 1.25, sz = Z + Math.sin(a3) * 1.25;
var bx = vrnBoxM(0.4, 0.34, 0.32, wood, sx, 0.17, sz, grp);
bx.rotation.y = -a3;
}
wCyl(0.18, 0.18, 0.5, vrnSurf("wood", 0x7A5A3A, 1), X + 0.9, 0.25, Z + 0.95, grp, 10);
var rack = new THREE.Group();
rack.position.set(X, 1.9, Z + 1.55);
grp.add(rack);
wBox(1.2, 0.04, 0.12, wood, 0, 0, 0, rack);
[-0.4, -0.1, 0.2, 0.45].forEach(function (k, i) { wCyl(0.04, 0.04, 0.2 + i * 0.04, [vmnM(0xE8E8F0), brass, vmnM(0x3A3A3A), vmnM(0xD8C8A8)][i], k, 0.14, 0, rack, 8); });
var therm = wBox(0.06, 0.4, 0.02, vmnM(0xF2F2F0), X - 0.5, 1.6, Z + 1.55, grp);
wBox(0.012, 0.3, 0.025, vmnM(0xB82020), X - 0.5, 1.58, Z + 1.55, grp);
var baro = wCyl(0.12, 0.12, 0.04, brass, X + 0.5, 1.6, Z + 1.55, grp, 16);
baro.rotation.x = Math.PI / 2;
var nb = wBox(0.16, 0.02, 0.22, vmnM(0x3A2A1A), X + 0.3, 0.38, Z + 1.05, grp);
vrnBoxM(0.6, 0.04, 0.4, wood, X + 0.3, 0.36, Z + 1.1, grp);
var bsk = wCyl(0.32, 0.28, 0.12, vrnSurf("wood", 0xA88A5A, 1), X - 0.9, 0.06, Z + 1.0, grp, 12);
I.dogs = [vmnBeast("dog", { s: 0.9 }), vmnBeast("dog", { s: 0.6 })];
I.dogs[0].position.set(X - 0.85, 0, Z + 0.95);
I.dogs[0].rotation.y = 2.4;
I.dogs[1].position.set(X - 1.1, 0, Z + 0.6);
I.dogs[1].rotation.y = 2.0;
I.dogs.forEach(function (d) { grp.add(d); });
I.float = [];
[[0.3, 1.1, 0.4], [-0.4, 1.4, -0.2], [0.6, 1.7, -0.5], [-0.2, 0.9, 0.7], [0.1, 2.0, 0.1]].forEach(function (p, i) { var m = i % 2 ? wCyl(0.035, 0.03, 0.09, vmnM(0xE8F0F8, { op: 0.6 }), 0, 0, 0, grp, 8) : wCyl(0.05, 0.04, 0.06, vmnM(0xF2F2EE), 0, 0, 0, grp, 10); m.position.set(X + p[0], p[1], Z + p[2]); m.userData.p = p; m.visible = false; I.float.push(m); });
for (var k = 0; k < (VRN.lite ? 6 : 20); k++) {
var a4 = k / 20 * Math.PI * 2;
wCyl(0.04, 0.04, 0.2, vmnM(0x5A4A3A), X + Math.cos(a4) * 1.45, -0.5, Z + Math.sin(a4) * 1.45, grp, 6);
}
I.sky = vmnSky(grp, X, 1.55, Z);
I.gun = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 60, 32, 1, true), vmnM(0x2A2C30, { ds: true }));
I.gun.position.set(X, 0, Z);
grp.add(I.gun);
vmnView(I, "closed");
vrnSpot(X + 1.3, Z, 1.2, "The side scuttle", "look out of the scuttle", function () { vmnScuttle(I); }, 0);
vrnSpot(X - 1.3, Z, 1.2, "The other side scuttle", "look out of the scuttle", function () { vmnScuttle(I); }, 0);
vrnSpot(X, Z, 0.6, "The floor-scuttle", "look down through the floor", function () { if (VMN.rocketAsk && !VMN.rockets) {
VMN.rockets = 1;
VMN.rocketAsk = 0;
setStatus("🎇 Barbicane touches the match to the fuses through the floor: the rockets in the base roar together, and the whole projectile shudders and turns.");
if (typeof playTone === "function")
playTone(70, 0.6);
return;
} vmnScuttle(I, "floor"); }, 0);
vrnSpot(X - 1.2, Z - 0.7, 1, "The oxygen apparatus", "look at the oxygen apparatus", function () { if (VMN.oxyAsk && VMN.oxy) {
VMN.oxy = 0;
VMN.oxyAsk = 0;
if (I.tap)
I.tap.rotation.y = Math.PI / 2;
setStatus("🫧 You turn the tap down. The hiss dies; the gas-flame shrinks back to its proper yellow; one by one, everyone sits down, rather ashamed.");
return;
} setStatus("🫧 Reiset and Regnault's apparatus: it gives out fresh air for breathing, and takes up the breathed air. One tap, and the hand on it must be careful."); }, 0);
vrnSpot(X, Z - 0.2, 0.9, "The gas-burner", "look at the gas lamp", function () { setStatus("💡 The gas-burner under the cone: light, and the heat that keeps the cold of space outside."); }, 0);
vrnSpot(X + 0.3, Z + 1.1, 1, "Barbicane's notebook", "read Barbicane's notebook", function () { setStatus("📓 Columns of figures in a small exact hand: times, distances, speeds; and, underlined twice, 10.46.40, December 1."); }, 0);
vrnSpot(X, Z + 1.4, 1, "The instruments", "look at the instruments", function () { setStatus("🌡️ Thermometers, a barometer, the telescopes, a chronometer set to the second, maps of the Moon by Beer and Mädler."); }, 0);
vrnSpot(X + 1.15, Z - 0.5, 1, "The provisions", "look in the chests", function () { setStatus("🥫 Meat and vegetables pressed hard and dry, enough for a year; brandy; water for two months; tea from the Emperor of Russia."); }, 0);
vrnSpot(X - 0.9, Z + 1, 0.9, "The dogs' corner", "stroke the dogs", function () { setStatus("🐕 Diana and Satellite, Michel's dogs, curled up together on their blanket."); }, 0);
vrnSpot(X, Z - 1.2, 1, "The hatch", "climb out of the projectile", function () { vmnHatch(); }, 0);
},
function (I, which) {
if (I.shut) {
if (VMN.canOpen) {
VMN.opened = 1;
I.panels.forEach(function (p) { p.visible = false; });
I.shut = false;
var V0 = VMN_VIEWS[I.view];
setStatus("🪟 The shutter rolls back from the glass. " + (V0 && V0.say ? V0.say : ""));
return;
}
setStatus("🛡️ The shutter is down over the glass: nothing to see but riveted metal.");
return;
}
var V = VMN_VIEWS[I.view];
setStatus(V && V.say ? V.say : "✨ Stars.");
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1867), rock = vrnSurf("stone", 0x6A6660, 4), snow = vrnSurf("snow", 0xF2F4F8, 4), iron = vrnMetal(0x2A2C30), wood = vrnSurf("wood", 0x5A4430, 2);
vrnInFloor(grp, X, Z, 320, 320, 0, snow);
for (var r = 0; r < (VRN.lite ? 20 : 60); r++) {
var rx = (R() - 0.5) * 300, rz = (R() - 0.5) * 300;
if (Math.hypot(rx, rz) < 70)
continue;
var rk = new THREE.Mesh(new THREE.DodecahedronGeometry(3 + R() * 12, 1), R() < 0.4 ? snow : rock);
rk.position.set(X + rx, R() * 4, Z + rz);
rk.scale.y = 0.5 + R() * 0.8;
grp.add(rk);
vrnSolid({ x: X + rx, z: Z + rz, r: 3 });
}
for (var p = 0; p < 9; p++) {
var a = p / 9 * Math.PI * 2, pk = new THREE.Mesh(new THREE.ConeGeometry(40 + R() * 30, 60 + R() * 50, VRN.lite ? 7 : 12), R() < 0.5 ? rock : snow);
pk.position.set(X + Math.cos(a) * 240, 20, Z + Math.sin(a) * 240);
grp.add(pk);
var cap = new THREE.Mesh(new THREE.ConeGeometry(18, 24, VRN.lite ? 7 : 12), snow);
cap.position.set(pk.position.x, pk.position.y + pk.geometry.parameters.height / 2 - 10, pk.position.z);
grp.add(cap);
}
var T = new THREE.Group();
T.position.set(X, 0, Z);
grp.add(T);
var tilt = 0.62, L = 85;
vrnBoxM(14, 7, 14, vrnSurf("stone", 0x8A8478, 3), 0, 3.5, 0, T);
var mir = new THREE.Mesh(new THREE.CircleGeometry(2.5, 32), vmnM(0xE8ECF0, { shine: 120, spec: 0xFFFFFF }));
mir.position.set(0, 4, -7.05);
mir.rotation.y = Math.PI;
T.add(mir);
var tube = new THREE.Group();
tube.position.set(0, 6, -4);
tube.rotation.x = -tilt;
T.add(tube);
var tb = wCyl(2.9, 2.9, L, vmnM(0x3A3E44, { shine: 50, ds: true }), 0, L / 2, 0, tube, VRN.lite ? 16 : 32);
for (var b = 0; b < 14; b++)
wCyl(3.05, 3.05, 0.4, iron, 0, 3 + b * 6, 0, tube, VRN.lite ? 16 : 32);
for (var f = 0; f < 7; f++) {
var fy = 8 + f * 11, fz = -4 - Math.sin(tilt) * fy * 1.0, fh = Math.cos(tilt) * fy + 6;
[-1, 1].forEach(function (k) { var lg = wBox(0.5, fh, 0.5, iron, k * 4, fh / 2, -4 - Math.sin(tilt) * (f * 11 + 8), T); });
wBox(8.6, 0.4, 0.5, iron, 0, Math.cos(tilt) * (f * 11 + 8) + 6, -4 - Math.sin(tilt) * (f * 11 + 8), T);
}
var topY = 6 + Math.cos(tilt) * L, topZ = -4 - Math.sin(tilt) * L;
var gal = vrnBoxM(10, 0.4, 6, wood, 0, topY - 3, topZ + 1, T);
for (var s = 0; s < 4; s++)
wBox(10, 0.08, 0.08, wood, 0, topY - 2 + s * 0.3, topZ + 4, T);
vrnFloor(X, Z + topZ + 1, 5, 3, topY - 2.8, { inside: 1 });
I.gallery = { x: X, z: Z + topZ + 2.5, y: topY - 2.8 };
vrnSolid({ x: X, z: Z, hw: 7, hd: 7, h: 7 });
var hx = X + 30, hz = Z + 20;
vrnIWall(grp, hx - 5, hz - 4, hx + 5, hz - 4, 3, wood);
vrnIWall(grp, hx - 5, hz + 4, hx + 5, hz + 4, 3, wood, [[5, 1.6, 2.3]]);
vrnIWall(grp, hx - 5, hz - 4, hx - 5, hz + 4, 3, wood);
vrnIWall(grp, hx + 5, hz - 4, hx + 5, hz + 4, 3, wood);
vrnInFloor(grp, hx, hz, 10, 8, 0.05, wood);
var rf = new THREE.Mesh(vrnPitchGeo(11, 9, 1.6, 0.4), vmnM(0x4A4A4A));
rf.position.set(hx, 3, hz);
grp.add(rf);
var stove = wCyl(0.4, 0.4, 1, vmnM(0x1A1A1A), hx - 3, 0.5, hz - 2.6, grp, 10);
var sg = wGlow(0xFF8A3A, 2.4, 0.5);
sg.position.set(hx - 3, 0.6, hz - 2.2);
grp.add(sg);
vrnTable(grp, hx + 1, hz - 2, 2.4, 1.2, 0, 0x4A2A16);
vrnChair(grp, hx + 1, hz - 0.9, Math.PI, 0x3A2A1A);
var lamp = wGlow(0xFFE0A0, 4, 0.5);
lamp.position.set(hx + 1, 2, hz - 2);
grp.add(lamp);
vrnSpot(hx, hz + 4.6, 3, "The observers' hut", "go into the hut", function () { setStatus("🛖 The observers' hut: a stove, a table of logbooks, the wire to Cambridge and to Baltimore, and hot coffee for men who watch all night."); }, 0);
vrnSpot(X, Z + 8, 4, "The great telescope", "look up at the telescope", function () { setStatus("🔭 A tube 280 feet long, laid up the mountain on its iron frame, its sixteen-foot mirror at the foot: through it the Moon comes to within five miles."); }, 0);
vrnSpot(X + 6, Z + 2, 3, "The eyepiece gallery", "climb up to the eyepiece", function () { var Gp = I.gallery; vrnMove(Gp.x, Gp.z, 0, "🔭 <b>The eyepiece gallery</b>, high on the tube's mouth. Below, the whole of the Rockies under snow.", Gp.y); }, 0);
vrnSpot(I.gallery.x, I.gallery.z + 1.2, 2.4, "The eyepiece", "look through the great telescope", function () { vmnPeakLook(); }, I.gallery.y);
vrnSpot(I.gallery.x + 3, I.gallery.z + 1, 2, "The ladder down", "climb down", function () { vrnMove(X + 6, Z + 8, Math.PI, null, 0); }, I.gallery.y);
vrnSpot(X - 10, Z + 50, 4, "The path down", "go down the mountain", function () { vrnLeave("vmn_peak"); }, 0);
},
function () {
var n = vbkS().ch, k = vmnBook(), h;
if (k === 1 && n >= 27)
h = "A bright point against the Moon's black limb, moving: the projectile, going round her. A new star.";
else if (k === 1 && n === 26)
h = "Cloud. Thick, grey, unbroken cloud, night after night.";
else
h = "The Moon, so near you could count the stones on her: the craters, the long shadows, the seas of grey, and no sign of any living thing.";
worldCard(VRN_H + "🔭 Through the great telescope</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + h + "</div>", {});
},
function (grp, I) {
var X = I.x, Z = I.z, R = wRand(1866);
vlgSea(grp, X, Z, -2.4, 440, 0x1E4A6A);
var sh = vlgShipModel({ L: 70, B: 13, D: 7, masts: [20, 0, -18], mh: 30, ports: true, flag: true, hull: 0x141418, band: 0xE8E4DA });
sh.position.set(X, -1.2, Z);
grp.add(sh);
I.ship = sh;
vrnFloor(X, Z, 30, 5.6, 0, { inside: 1 });
var funnel = wCyl(1.6, 1.6, 10, vmnM(0x1A1A1A), X + 4, 5, Z, grp, 14);
[-1, 1].forEach(function (k) { var pb = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 2.4, 20, 1, false, 0, Math.PI), vmnM(0x141418)); pb.rotation.x = Math.PI / 2; pb.rotation.z = Math.PI / 2; pb.position.set(X + 4, 0.4, Z + k * 7.6); grp.add(pb); });
var sm = new THREE.Group();
sm.position.set(X - 10, 0, Z + 4.4);
grp.add(sm);
var drum = wCyl(0.8, 0.8, 1.4, vmnM(0x6A6A70, { shine: 60 }), 0, 1.2, 0, sm, 16);
drum.rotation.x = Math.PI / 2;
I.drum = drum;
vrnBoxM(1.8, 0.9, 1.8, vrnSurf("wood", 0x6A4A2A, 1), 0, 0.45, 0, sm);
var arm = wBox(0.2, 0.2, 3, vmnM(0x3A3A3A), 0, 2.2, 1.6, sm);
var line = wCyl(0.012, 0.012, 30, vmnM(0xC8C8C8), 0, -12, 3.1, sm, 4);
I.line = line;
vrnSpot(X - 10, Z + 2.4, 2.6, "The sounding machine", "watch the sounding line", function () { setStatus("🧵 The wire paying out from the drum, fathom after fathom, down into the dark: 3,000 fathoms, and the lead not yet at the bottom."); }, 0);
vrnSpot(X + 18, Z, 3, "The bridge", "go up to the bridge", function () { setStatus("🧭 Captain Blomsberry's bridge: the chart of the Pacific, the course two hundred miles off the coast, latitude 27° 7' north."); }, 0);
vrnSpot(X - 2, Z - 5, 2.6, "The ship's rail", "look out to sea", function () { var v = VMN.sea || "calm"; setStatus(v === "fall" ? "☄️ A ball of fire, falling, growing, roaring, straight down into the sea a few hundred yards away: a column of steam and spray, and the ship heeling." : v === "search" ? "🌊 The Pacific, empty to the horizon. Boats out, grapples down, all day long." : v === "found" ? "🌊 Something bobbing on the swell, bright as silver in the sun: the projectile, afloat!" : "🌊 The Pacific, long and blue and calm, and the stars coming out."); }, 0);
var pr = vrnShellModel(1.2);
pr.rotation.z = 0.25;
pr.position.set(X - 10, -2.2, Z - 40);
grp.add(pr);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), vlgFlagMat());
fl.position.set(0.7, 4.8, 0);
pr.add(fl);
wCyl(0.03, 0.03, 1.6, vmnM(0x6A6A6A), 0, 4.2, 0, pr, 4);
I.proj = pr;
pr.visible = false;
vrnSpot(X - 6, Z - 5.6, 3, "The projectile, afloat", "hail the projectile", function () { if (!I.proj.visible) {
setStatus("🌊 Nothing there but the sea.");
return;
} setStatus("🌖 Bright metal on the swell; and from inside, faintly, through the scuttle... laughter? Dominoes?"); }, 0);
I.boat = new THREE.Group();
I.boat.position.set(X - 4, -1.6, Z - 12);
grp.add(I.boat);
vrnBoxM(8, 1, 2.4, vrnSurf("wood", 0xE8E4DA, 1), 0, 0, 0, I.boat);
vrnSpot(X - 4, Z - 7, 2.6, "The cutter", "look at the cutter", function () { setStatus("🚣 The Susquehanna's eight-oared cutter, ready to be lowered."); }, 0);
I.bolide = new THREE.Group();
grp.add(I.bolide);
var bf = wGlow(0xFFB060, 40, 0.95);
bf.material.fog = false;
I.bolide.add(bf);
wSph(2, new THREE.MeshBasicMaterial({ color: 0xFFF0C0, fog: false }), 0, 0, 0, I.bolide, 12);
I.bolide.visible = false;
I.bolide.userData.keep = 1;
if (!VRN.lite)
for (var s = 0; s < 8; s++)
vrnFolk(grp, 2200 + s, X - 20 + s * 5, Z + (s % 2 ? 3 : -3), { still: 1, sailor: 1, name: "A sailor of the Susquehanna", say: "You are a sailor of the US steam frigate Susquehanna in 1866, sounding the Pacific for the telegraph cable, in Jules Verne's Round the Moon.", greet: "Three thousand fathoms, and still no bottom!" });
},
function (key, lx, lz, yaw, h, msg, ly) {
return { k: "until", h: h, at: null, on: function (f) { f.vgo = 0; setTimeout(function () { var I = VRN_IN[key]; if (!I)
return; vrnInBuild(I); vrnMove(I.x + lx, I.z + lz, yaw, msg || null, ly || 0, { fn: function () { f.vgo = 1; vbkSave(); } }); }, 1500); },
test: function (f) { var I = VRN_IN[key]; return !!f.vgo && !!I && VRN.insideOf === I; }, sim: function (f) { f.vgo = 1; var I = VRN_IN[key]; vrnInBuild(I); vrnMove(I.x + lx, I.z + lz, yaw, null, ly || 0); } };
},
function (k, S) {
vbkTune(k === 1 ? "mnhebrides" : "mnyankee");
var keep = "<p>Your keepsakes, one from every chapter: <span style='font-size:20px'>" + S.keeps.map(function (x) { return "<span title='" + vbkEsc(x.n) + "'>" + x.i + "</span>"; }).join(" ") + "</span></p>", fns = {}, b;
if (k === 1) {
b = "<h3 style='margin:4px 0'>A new star</h3><p style='font-style:italic'>" + vbkEsc("\"Those three men have carried into space all the resources of art, science, and industry. With that, one can do anything; and you will see that, some day, they will come out all right.\"") + "</p>" + keep +
"<p>What happened to them is the second book, <b>Round the Moon</b>. It begins where they went in: at <b>the crane over the Columbiad's mouth, Stone's Hill</b>.</p>";
var R = store.vroundmoon;
b += worldBtn("rm", "🌖 Round the Moon", R && R.done ? "Walked to the end" : "At the crane on Stone's Hill");
fns.rm = function () { worldCard(null); var St = VRN_STONE; vrnMove(St.x + 14, St.z + 10, 0, "🏗️ <b>Stone's Hill.</b> The crane over the Columbiad's mouth: press E at it for <b>Round the Moon</b>."); };
}
else {
b = "<h3 style='margin:4px 0'>The National Company of Interstellar Communication</h3><p style='font-style:italic'>They went round the Moon, and came home, and floated, and played dominoes while the Navy searched the bottom of the sea.</p>" + keep +
"<p>A century after Verne wrote it, three men went round the Moon at Christmas in Apollo 8, from Florida, and came down in the Pacific. He would not have been surprised.</p>";
}
b += worldBtn("again", "Read it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; vbkSave(); vbkChapterBegin(true); };
worldCard(b, fns);
},
function () {
var S = VRN_STONE;
VMN.fireT = 0;
VMN.hang = 4;
if (VMN.hangM)
VMN.hangM.visible = false;
if (VMN.chain)
VMN.chain.visible = false;
if (VMN.stone && !VMN.flashG) {
var g = wGlow(0xFFF2D0, 420, 0);
g.position.set(S.x, S.y + 80, S.z);
VMN.stone.add(g);
VMN.flashG = g;
}
VRN.smokers.push({ x: S.x, y: S.y + 6, z: S.z, r: 40, dark: 0, big: 1, t: 90 });
if (typeof playTone === "function") {
playTone(32, 2.2);
setTimeout(function () { playTone(48, 1.4); }, 180);
}
setStatus("💥 <b>FIRE!</b> A sheet of flame from the mouth of the Columbiad, a roar like the end of the world, the ground heaving under you: and a column of smoke and steam going up and up into the night.");
},
function (dt) {
if (!VRN.built)
return;
VMN.t += dt;
var t = VMN.t, b = vmnBook(), ch = b ? vbkS().ch : -1;
var want = vmnEnvWant();
if (want) {
if (VRN.envOver !== want && (!VRN.envOver || VRN.envOver === VMN.envSet)) {
VRN.envOver = want;
VMN.envSet = want;
}
}
else if (VMN.envSet) {
if (VRN.envOver === VMN.envSet)
VRN.envOver = null;
VMN.envSet = null;
}
if (VMN.glows) {
var on = b === 1 && VMN.cast === 1;
VMN.glows.forEach(function (g, i) { g.material.opacity = on ? 0.6 + 0.25 * Math.sin(t * 3 + i * 1.7) : 0; g.visible = on; });
}
if (VMN.hangM) {
var h = b === 1 ? VMN.hang : 0, show = h === 1;
if (h === 1 && VMN.hy == null)
VMN.hy = 14;
if (h === 1)
VMN.hy = Math.max(-8, VMN.hy - dt * 1.4);
if (h !== 1 && h !== 2)
VMN.hy = null;
var y = VMN.hy == null ? 14 : VMN.hy;
VMN.hangM.visible = !!show && h < 3;
VMN.hangM.position.y = y;
if (VMN.chain) {
var top = y + 3.3;
VMN.chain.visible = VMN.hangM.visible;
VMN.chain.scale.y = Math.max(0.1, 30 - top);
VMN.chain.position.y = (30 + top) / 2;
}
}
if (VMN.flashG && VMN.fireT != null) {
VMN.fireT += dt;
var f = VMN.fireT;
VMN.flashG.material.opacity = f < 0.15 ? f / 0.15 : Math.max(0, 1 - (f - 0.15) / 2.5);
VMN.flashG.visible = VMN.flashG.material.opacity > 0.01;
if (f > 3) {
VMN.fireT = null;
VMN.flashG.visible = false;
}
}
var I = VRN.insideOf;
if (!I)
return;
if (I.key === "vmn_tampa") {
if (I.crowd)
I.crowd.visible = b === 1 && !!VMN.crowd;
if (I.atlanta)
I.atlanta.visible = b !== 1 || !!VMN.atlanta || ch >= 17;
}
else if (I.key === "vmn_wood") {
if (I.bird)
I.bird.visible = !VMN.bird;
}
else if (I.key === "vmn_shell")
vmnShellTick(I, dt, b);
else if (I.key === "vmn_susq") {
var sounding = VMN.sea !== "found" && !VMN.bolide2;
if (I.line)
I.line.visible = sounding;
if (I.drum && sounding)
I.drum.rotation.y += dt * 0.8;
if (I.proj) {
I.proj.visible = VMN.sea === "found";
if (I.proj.visible) {
I.proj.position.y = -2.2 + Math.sin(t * 0.9) * 0.25;
I.proj.rotation.x = Math.sin(t * 0.7) * 0.06;
}
}
if (I.bolide) {
if (VMN.bolide2 === 1) {
VMN.bolide2 = 1.01;
VMN.bt = 0;
}
if (VMN.bolide2 > 1 && VMN.bolide2 < 2) {
VMN.bt += dt;
var p = Math.min(1, VMN.bt / 3.2);
I.bolide.visible = true;
I.bolide.position.set(I.x - 60 + p * 20, 260 * (1 - p) - 2, I.z - 400 + p * 180);
var s = 1 + p * 2;
I.bolide.scale.setScalar(s);
if (VMN.bt > 0.2 && !VMN.btTone) {
VMN.btTone = 1;
if (typeof playTone === "function")
playTone(120, 2.8);
}
if (p >= 1) {
VMN.bolide2 = 2;
VMN.btTone = 0;
I.bolide.visible = false;
VRN.smokers.push({ x: I.x - 40, y: 0, z: I.z - 220, r: 24, dark: 0, big: 1, t: 40 });
if (typeof playTone === "function")
playTone(36, 1.6);
}
}
else
I.bolide.visible = false;
}
}
},
function (I, dt, b) {
if (!I.sky)
return;
var t = VMN.t, S = I.sky;
if (b === 2 && VMN.want && I.view !== VMN.want) {
vmnView(I, VMN.want);
if (VMN.want !== "closed" && VMN_VIEWS[VMN.want].say)
setStatus(VMN_VIEWS[VMN.want].say);
}
if (b === 2 && I.view === "closed" && VMN.opened && VMN.canOpen && I.shut) {
I.panels.forEach(function (p) { p.visible = false; });
I.shut = false;
}
if (I.gun)
I.gun.visible = b === 2 && I.view === "closed" && !VMN.launch;
if (b === 2 && VMN.launch === 1 && !VMN.launchFx) {
VMN.launchFx = 1;
VMN.lampOut = 1;
if (typeof playTone === "function")
playTone(30, 1.8);
}
if (b === 2 && !VMN.launch)
VMN.launchFx = 0;
if (I.lamp) {
var dark = b === 2 && !!VMN.lampOut;
I.lamp.visible = !dark;
if (I.flame)
I.flame.visible = !dark;
if (I.lamp.userData.s0 == null)
I.lamp.userData.s0 = I.lamp.scale.x;
var k = VMN.oxy ? 1.7 + 0.25 * Math.sin(t * 9) + 0.1 * Math.sin(t * 23) : (VMN.cold ? 0.8 : 1) + 0.03 * Math.sin(t * 7);
I.lamp.scale.setScalar(I.lamp.userData.s0 * k);
if (I.flame)
I.flame.scale.setScalar(VMN.oxy ? 2.2 : 1);
}
if (I.tap && !VMN.oxy)
I.tap.rotation.y = Math.PI / 2;
else if (I.tap)
I.tap.rotation.y = 0;
if (I.float)
I.float.forEach(function (m, i) { m.visible = b === 2 && !!VMN.float; if (m.visible) {
var p = m.userData.p;
m.position.y = p[1] + Math.sin(t * 0.6 + i) * 0.1;
m.rotation.set(t * 0.3 + i, t * 0.2, i);
} });
if (I.dogs && I.dogs[1])
I.dogs[1].visible = !(b === 2 && VMN.dogOut);
if (S.dog) {
S.dog.visible = b === 2 && !!VMN.dogOut && I.view !== "closed" && I.view !== "fall";
if (S.dog.visible) {
S.dog.position.set(3.4 + Math.sin(t * 0.13) * 0.4, -0.3 + Math.sin(t * 0.21) * 0.2, 0.6);
S.dog.rotation.set(t * 0.07, t * 0.11, t * 0.05);
}
}
if (S.bol) {
if (b === 2 && VMN.bolide === 1) {
VMN.bolide = 1.01;
VMN.bt = 0;
}
if (b === 2 && VMN.flash === 1) {
VMN.flash = 1.01;
VMN.ft = 0;
}
if (VMN.bolide > 1 && VMN.bolide < 2) {
VMN.bt += dt;
var p = Math.min(1, VMN.bt / 5);
S.bol.visible = true;
S.bol.position.set(60, -20 + p * 40, -220 + p * 440);
S.bol.scale.setScalar(6);
S.fire.scale.setScalar(20);
S.bol.rotation.x += dt;
if (p >= 1) {
VMN.bolide = 2;
S.bol.visible = false;
}
}
else if (VMN.flash > 1 && VMN.flash < 2) {
VMN.ft += dt;
var q = VMN.ft;
S.bol.visible = true;
S.bol.position.set(-120, 40, -160);
S.bol.scale.setScalar(q < 2 ? 8 : 0.01);
var o = q < 2 ? 0.9 : Math.max(0, 1 - (q - 2) / 3);
S.fire.material.opacity = o;
S.fire.scale.setScalar(q < 2 ? 24 : 24 + (q - 2) * 140);
if (S.mm && S.mm.material.uniforms) {
S.mm.material.uniforms.amb.value = q < 2 ? 0.012 : 0.012 + 0.3 * o;
}
if (q > 2 && !VMN.ftTone) {
VMN.ftTone = 1;
if (typeof playTone === "function")
playTone(90, 0.5);
}
if (q > 5.5) {
VMN.flash = 2;
VMN.ftTone = 0;
S.bol.visible = false;
S.fire.material.opacity = 0.9;
if (S.mm && S.mm.material.uniforms)
S.mm.material.uniforms.amb.value = 0.012;
}
}
else
S.bol.visible = false;
}
if (I.view === "fall" && S.earth) {
VMN.fallS = Math.min(200, (VMN.fallS || 70) + dt * 4);
S.earth.scale.setScalar(VMN.fallS);
S.earth.rotation.y += dt * 0.02;
}
else
VMN.fallS = null;
if (I.view && I.view !== "closed" && S.earth)
S.earth.rotation.y += dt * 0.004;
}
];
});
