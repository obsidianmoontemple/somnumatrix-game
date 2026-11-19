/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(446, function () {
return [
function (w, h, d, kind, col, x, y, z, p, ry) {
var s = new THREE.Shape();
s.moveTo(-w / 2, 0);
s.lineTo(w / 2, 0);
s.lineTo(0, h);
s.lineTo(-w / 2, 0);
var g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
g.translate(0, 0, -d / 2);
var T = (typeof TILE !== "undefined" && TILE[kind]) || 2.4, uv = g.attributes.uv;
if (uv) {
var P = g.attributes.position;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, (P.getX(i) + P.getZ(i)) / T, P.getY(i) / T);
}
return swAdd(g, swMat(kind, col), x, y, z, p, ry);
},
function (p, x, y, z, r, col) {
var k = r + "|" + col, G = SW_LB[k];
if (!G) {
var geo = null, mat = null;
try {
if (typeof ctuInstGeo === "function" && typeof ctuLeafMat === "function") {
geo = ctuInstGeo("ball", { radius: r });
mat = ctuLeafMat(col);
}
}
catch (e) { }
if (!geo) {
geo = new THREE.IcosahedronGeometry(r, 2);
mat = swMat(null, col);
}
G = SW_LB[k] = { geo: geo, mat: mat };
}
return swAdd(G.geo, G.mat, x, y, z, p);
},
function (g, lx, lz) {
var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y), P = g.position, q = g.parent;
var x = P.x + lx * c + lz * s, z = P.z - lx * s + lz * c;
while (q && q !== SW.G && q.position) {
var c2 = Math.cos(q.rotation.y), s2 = Math.sin(q.rotation.y), nx = q.position.x + x * c2 + z * s2, nz = q.position.z - x * s2 + z * c2;
x = nx;
z = nz;
q = q.parent;
}
return { x: x, z: z };
},
function (x, z, feet) {
for (var i = 0; i < SW.solids.length; i++) {
var S = SW.solids[i];
if (S.off || feet >= S.y1 - 0.4 || feet + 1.7 <= S.y0)
continue;
if (S.round) {
if (Math.hypot(x - S.x, z - S.z) < S.r)
return true;
continue;
}
var dx = x - S.x, dz = z - S.z, lx = dx * S.c - dz * S.s, lz = dx * S.s + dz * S.c;
if (Math.abs(lx) < S.hw && Math.abs(lz) < S.hd)
return true;
}
return false;
},
function (g, x, y, z, col) {
var c = col || 0xFFD8A0;
swC(0.03, 0.03, 0.5, null, 0x2A2A2A, x, y + 0.25, z, g, 6);
var sh = swAdd(new THREE.CylinderGeometry(0.16, 0.3, 0.32, 16, 1, true), swMat(null, 0xF0E6D0), x, y + 0.62, z, g);
sh.material = new THREE.MeshLambertMaterial({ color: 0xF4ECD8, side: THREE.DoubleSide, emissive: new THREE.Color(0x6A5A3A) });
var b = swS(0.07, 0, x, y + 0.55, z, g, 8);
b.material = swGlowM(c);
return b;
},
function (sec, mid) {
if (!SW.veil && typeof document !== "undefined") {
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#1A1814;opacity:0;pointer-events:none;z-index:43;transition:opacity .5s";
document.body.appendChild(v);
SW.veil = v;
}
var V = SW.veil;
SW.moving = true;
sec = sec || 0.5;
if (V) {
V.style.transition = "opacity " + sec + "s ease";
V.style.opacity = "1";
}
setTimeout(function () { try {
mid && mid();
}
catch (e) {
if (window.console)
console.warn("[stillwater] veil", e);
} setTimeout(function () { if (V)
V.style.opacity = "0"; SW.moving = false; }, 120); }, sec * 1000 + 40);
},
function (seed, x, z, ry, o, parent, y) {
o = o || {};
var p;
try {
p = wPerson("sw" + seed, o);
}
catch (e) {
p = new THREE.Group();
swB(0.5, 1.7, 0.3, null, 0x6A5A4A, 0, 0.85, 0, p);
}
if (o.s)
p.scale.multiplyScalar(o.s);
p.position.set(x, y === undefined ? swGround(x, z) : y, z);
p.rotation.y = ry || 0;
p.userData.keep = 1;
(parent || SW.G).add(p);
var P = { g: p, y: p.position.y, o: o };
SW.people.push(P);
if (o.wander)
P.wander = o.wander;
if (o.talk || o.fn)
SW.talk.push({ p: P, r: o.r || 3, name: o.talk ? o.talk.name : o.name, t: o.talk, fn: o.fn });
return P;
},
function (a, x, z, ry, k, seed, parent, y) {
var g = null;
try {
if (typeof ctuOne === "function")
g = ctuOne(a, { k: k || 1 }, seed || 1);
}
catch (e) { }
if (!g) {
g = new THREE.Group();
var b = swS(0.4 * (k || 1), 0x8A6A4A, 0, 0.5 * (k || 1), 0, g);
b.scale.set(1, 0.8, 1.6);
}
g.position.set(x, y === undefined ? swGround(x, z) : y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
(parent || SW.G).add(g);
return g;
},
function (p, x, y, z, s, col, neck, bill) {
s = s || 1;
var g = swG(x, y, z, p), m = swMat(null, col);
var b = swAdd(new THREE.SphereGeometry(0.2 * s, 14, 10), m, 0, 0.25 * s, 0, g);
b.scale.set(0.9, 0.8, 1.4);
var n = swAdd(new THREE.CylinderGeometry(0.05 * s, 0.07 * s, (neck || 0.25) * s, 8), m, 0, (0.38 + (neck || 0.25) * 0.4) * s, 0.16 * s, g);
n.rotation.x = 0.35;
swAdd(new THREE.SphereGeometry(0.075 * s, 10, 8), m, 0, (0.38 + (neck || 0.25) * 0.85) * s, 0.22 * s, g);
var bk = swAdd(new THREE.ConeGeometry(0.03 * s, 0.12 * s, 6), swMat(null, bill || 0xE89A20), 0, (0.38 + (neck || 0.25) * 0.85) * s, 0.33 * s, g);
bk.rotation.x = Math.PI / 2;
var tl = swAdd(new THREE.ConeGeometry(0.08 * s, 0.18 * s, 6), m, 0, 0.3 * s, -0.28 * s, g);
tl.rotation.x = -Math.PI / 2 - 0.4;
g.userData.keep = 1;
return g;
},
function (title, html, onClose, o) {
o = o || {};
if (!SWP.el) {
var el = document.createElement("div");
el.id = "sw-panel";
el.innerHTML = "<div class='swp-top'><div class='swp-t'></div><button class='swp-read' title='Read this page aloud' aria-label='Read aloud'>🔈</button><button class='swp-x' aria-label='Close'>✕</button></div><div class='swp-b'></div>";
document.body.appendChild(el);
SWP.el = el;
SWP.body = el.querySelector(".swp-b");
SWP.title = el.querySelector(".swp-t");
el.querySelector(".swp-x").onclick = function () { swPanelClose(); };
el.querySelector(".swp-read").onclick = function () { swSay(SWP.title.textContent + ". " + (SWP.body.innerText || "").slice(0, 600), true); };
addEventListener("keydown", function (e) { if (!SWP.open)
return; if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "") && e.key !== "Escape")
return; if (e.key === "Escape") {
e.preventDefault();
swPanelClose();
}
else if (SWP.keys) {
try {
SWP.keys(e);
}
catch (x) { }
} e.stopImmediatePropagation(); }, true);
addEventListener("keyup", function (e) { if (SWP.open)
e.stopImmediatePropagation(); }, true);
swCss();
}
SWP.el.className = o.clear ? "swp-clear" : "";
SWP.title.textContent = title;
SWP.body.innerHTML = html || "";
SWP.el.style.display = "flex";
SWP.open = true;
SWP.onClose = onClose || null;
SWP.keys = o.keys || null;
if (typeof keys !== "undefined" && keys)
Object.keys(keys).forEach(function (k) { keys[k] = false; });
if (document.exitPointerLock)
document.exitPointerLock();
worldCard(null);
worldPrompt(null);
return SWP.body;
},
function () {
if (SW_CSS)
return;
SW_CSS = true;
var s = document.createElement("style");
s.textContent =
"#sw-panel{position:fixed;inset:0;z-index:60;display:none;flex-direction:column;background:linear-gradient(170deg,#F4F0E6,#E6EEE4 60%,#E4ECF0);color:#2E3A34;font:16px/1.5 system-ui,sans-serif}" +
"#sw-panel.swp-clear{background:transparent;pointer-events:none}#sw-panel.swp-clear .swp-top,#sw-panel.swp-clear .swp-b>*{pointer-events:auto}" +
"#sw-panel .swp-top{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(250,248,240,.94);border-bottom:2px solid #9AB89A;flex:0 0 auto}" +
"#sw-panel .swp-t{flex:1;font:600 20px Georgia,serif;color:#2E4A3A}" +
"#sw-panel .swp-x,#sw-panel .swp-read{font:600 18px system-ui;border:0;background:#7A9A82;color:#fff;border-radius:50%;width:44px;height:44px;cursor:pointer}" +
"#sw-panel .swp-read{background:#9AAFC0}" +
"#sw-panel .swp-b{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;padding:12px 14px 40px}" +
"#sw-panel.swp-clear .swp-b{overflow:hidden;padding:0;position:relative}" +
".swb{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;margin:5px;padding:10px 14px;min-width:120px;min-height:52px;border:0;border-radius:14px;background:#6E8E7A;color:#fff;font:600 15px system-ui;cursor:pointer;box-shadow:0 2px 0 rgba(0,0,0,.12);vertical-align:top}" +
".swb small{display:block;font:400 12px system-ui;opacity:.88;margin-top:2px;max-width:220px}" +
".swb:hover{filter:brightness(1.06)}.swb-on{outline:4px solid #F0D890}.swb-big{font-size:26px;min-width:140px;min-height:110px}.swb-small{min-width:0;min-height:40px;padding:6px 10px;font-size:14px}" +
".swb[disabled]{opacity:.45;cursor:default}" +
".sw-card{background:rgba(255,255,255,.8);border:1px solid #C8D8C8;border-radius:14px;padding:12px 14px;margin:8px 0}" +
".sw-h{font:600 18px Georgia,serif;color:#2E4A3A;margin:6px 0}" +
".sw-sw{display:inline-block;width:38px;height:38px;border-radius:50%;margin:4px;border:3px solid #fff;box-shadow:0 0 0 1px #9A9A9A;cursor:pointer;vertical-align:middle}" +
".sw-sw.on{box-shadow:0 0 0 4px #2E4A3A}" +
".sw-bar{position:absolute;left:0;right:0;bottom:0;padding:8px 10px calc(10px + env(safe-area-inset-bottom,0px));background:rgba(250,248,240,.94);border-top:2px solid #9AB89A;max-height:46vh;overflow:auto}" +
".sw-side{position:absolute;right:0;top:0;bottom:0;width:min(340px,42vw);padding:10px;background:rgba(250,248,240,.94);border-left:2px solid #9AB89A;overflow:auto}" +
".sw-tip{font-size:14px;opacity:.85;margin:4px 0}" +
"body.sw-bigtext #sw-panel,body.sw-bigtext #sw-hud,body.sw-bigtext #wld-hud,body.sw-bigtext #wld-prompt,body.sw-bigtext #status{font-size:19px!important}" +
"#sw-hud{position:fixed;left:10px;top:206px;z-index:44;display:none;font:14px/1.4 system-ui,sans-serif;color:#24302A;pointer-events:none;max-width:250px}" +
"#sw-hud .box{background:rgba(250,248,240,.9);border:1px solid #9AB89A;border-radius:12px;padding:8px 10px;margin-bottom:8px;pointer-events:auto}" +
"#sw-hud .row{display:flex;align-items:center;gap:6px;margin:3px 0}#sw-hud .row.done{opacity:.55;text-decoration:line-through}" +
"#sw-hud .tk{font-size:20px}#sw-hud .nn{font-size:13px}#sw-hud .nn b{color:#2E5A3A}" +
"#sw-dock{position:fixed;right:10px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:44;display:none;flex-direction:column;gap:8px}" +
"#sw-dock button{width:64px;height:64px;border-radius:18px;border:2px solid #fff;background:rgba(110,142,122,.95);color:#fff;font:600 26px system-ui;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.25)}" +
"#sw-dock button small{display:block;font:600 10px system-ui;margin-top:-2px}" +
".sw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}" +
".sw-tile{background:#fff;border:2px solid #C8D8C8;border-radius:14px;padding:8px;text-align:center;cursor:pointer}.sw-tile:hover{border-color:#6E8E7A}" +
".sw-tile img{width:100%;height:110px;object-fit:cover;border-radius:8px;display:block}.sw-tile b{display:block;margin-top:4px;font-size:14px}.sw-tile small{opacity:.75}" +
"input[type=range].sw-r{width:100%;height:34px}";
document.head.appendChild(s);
},
function (t, force) {
try {
var C = swCalm();
if (!force && !C.read)
return;
if (!window.speechSynthesis)
return;
var txt = String(t || "").replace(/<[^>]+>/g, " ").replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, "").replace(/\s+/g, " ").trim();
if (!txt)
return;
speechSynthesis.cancel();
var u = new SpeechSynthesisUtterance(txt.slice(0, 700));
u.rate = 0.86;
u.pitch = 1;
u.volume = Math.max(0.05, Math.min(1, (C.voices === undefined ? 0.8 : C.voices)));
speechSynthesis.speak(u);
}
catch (e) { }
},
function (g, x, z, w, d, col, o) {
o = o || {};
var t = swG(x, 0, z, g, o.ry || 0), h = o.h || 0.78;
swB(w, 0.07, d, "wood", col || SW_WOOD, 0, h, 0, t);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { swB(0.08, h, 0.08, "wood", col || SW_WOOD, c[0] * (w / 2 - 0.1), h / 2, c[1] * (d / 2 - 0.1), t); });
if (o.cloth)
swB(w + 0.08, 0.015, d + 0.08, null, o.cloth, 0, h + 0.045, 0, t);
if (o.mat)
swB(w * 0.9, 0.01, d * 0.86, null, o.mat, 0, h + 0.04, 0, t);
return t;
},
function (g, x, z, ry, col) {
var c = swG(x, 0, z, g, ry), m = col || 0x6A7A8A;
swB(0.9, 0.42, 0.86, null, m, 0, 0.25, 0, c);
swB(0.9, 0.62, 0.18, null, m, 0, 0.72, -0.36, c);
swB(0.16, 0.32, 0.8, null, m, -0.42, 0.58, 0, c);
swB(0.16, 0.32, 0.8, null, m, 0.42, 0.58, 0, c);
swB(0.66, 0.12, 0.62, null, 0xE8E0D0, 0, 0.5, 0.06, c);
for (var i = 0; i < 4; i++)
swC(0.03, 0.025, 0.06, "wood", SW_DARK, (i % 2 ? 0.38 : -0.38), 0.03, (i < 2 ? 0.36 : -0.36), c, 6);
return c;
},
function (g, x, z, ry, col, L) {
L = L || 1.9;
var c = swG(x, 0, z, g, ry), m = col || 0x7A8A6A;
swB(L, 0.42, 0.86, null, m, 0, 0.25, 0, c);
swB(L, 0.6, 0.18, null, m, 0, 0.72, -0.36, c);
swB(0.16, 0.32, 0.8, null, m, -L / 2 + 0.08, 0.58, 0, c);
swB(0.16, 0.32, 0.8, null, m, L / 2 - 0.08, 0.58, 0, c);
for (var i = 0; i < 2; i++) {
swB(L / 2 - 0.14, 0.12, 0.62, null, 0xE8E0D0, (i ? 1 : -1) * (L / 4 - 0.04), 0.5, 0.06, c);
swB(0.4, 0.34, 0.1, null, [0xC8A86A, 0x8AA8C8][i], (i ? 1 : -1) * (L / 4), 0.78, -0.24, c).rotation.x = -0.2;
}
return c;
},
function (g, x, z, ry, w, h, col, fill) {
var s = swG(x, 0, z, g, ry), c = col || SW_WOOD;
swB(w, h, 0.04, "wood", c, 0, h / 2, -0.15, s);
swB(0.05, h, 0.34, "wood", c, -w / 2, h / 2, 0, s);
swB(0.05, h, 0.34, "wood", c, w / 2, h / 2, 0, s);
var n = Math.max(2, Math.round(h / 0.42));
for (var i = 0; i <= n; i++)
swB(w, 0.04, 0.34, "wood", c, 0, 0.04 + i * (h - 0.08) / n, 0, s);
if (fill)
for (var j = 0; j < n; j++)
fill(s, -w / 2 + 0.08, w - 0.16, 0.08 + j * (h - 0.08) / n, j);
return s;
},
function (g, x, z, w, d, col, col2) {
var t = wTex(128, 128, function (c, W, H) {
c.fillStyle = "#" + ("00000" + col.toString(16)).slice(-6);
c.fillRect(0, 0, W, H);
c.strokeStyle = "#" + ("00000" + (col2 || 0xE8DCC0).toString(16)).slice(-6);
c.lineWidth = 7;
c.strokeRect(10, 10, W - 20, H - 20);
c.lineWidth = 3;
c.strokeRect(22, 22, W - 44, H - 44);
for (var i = 0; i < 6; i++) {
c.beginPath();
c.arc(W / 2, H / 2, 8 + i * 7, 0, 7);
c.stroke();
}
});
var m = swAdd(new THREE.PlaneGeometry(w, d), new THREE.MeshLambertMaterial({ map: t }), x, 0.012, z, g);
m.rotation.x = -Math.PI / 2;
return m;
},
function (g, x, z, ry) {
var s = swG(x, 0, z, g, ry);
swB(0.8, 0.8, 0.6, null, 0x2A2A2E, 0, 0.4, 0, s);
swB(0.86, 0.05, 0.66, null, 0x3A3A3E, 0, 0.82, 0, s);
var w = swB(0.42, 0.3, 0.02, null, 0, 0, 0.42, 0.31, s);
w.material = swGlowM(0xE8803A);
swC(0.08, 0.08, 1.8, null, 0x2A2A2E, 0, 1.7, -0.1, s, 10);
var gl = wGlow(0xFF9A50, 1.4, 0.35);
gl.position.set(0, 0.42, 0.36);
s.add(gl);
return s;
},
function (g, x, z, ry) {
var f = swG(x, 0, z, g, ry);
swB(1.8, 1.3, 0.5, "stone", 0xA89A88, 0, 0.65, 0, f);
swB(2.0, 0.12, 0.6, "wood", SW_DARK, 0, 1.36, 0.05, f);
var hole = swB(1.0, 0.75, 0.2, null, 0x1A1410, 0, 0.42, 0.18, f);
for (var i = 0; i < 3; i++) {
var lg = swC(0.06, 0.07, 0.7, "bark", 0x5A3A22, (i - 1) * 0.16, 0.14 + (i === 1 ? 0.1 : 0), 0.22, f, 6);
lg.rotation.z = Math.PI / 2;
}
var fl = swAdd(new THREE.ConeGeometry(0.22, 0.4, 8), new THREE.MeshBasicMaterial({ color: 0xFFA040, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }), 0, 0.42, 0.24, f);
fl.userData.keep = 1;
SW.fx.push({ k: "flame", m: fl, ph: Math.random() * 5 });
var gl = wGlow(0xFF9A40, 2.2, 0.4);
gl.position.set(0, 0.45, 0.35);
f.add(gl);
swLight(0xFF9A50, 0.7, 7, 0, 0.8, 0.8, f);
return f;
},
function (g, x, y, z, ry, w, h, col) {
var wg = swG(x, y, z, g, ry);
var p = swB(w, h, 0.03, null, 0, 0, 0, 0.005, wg);
p.material = typeof swViewTex === "function" ? swViewTex() : swGlowM(col || 0xD8E8F0);
p.userData.keep = 1;
var fr = 0xF2ECE0;
swB(w + 0.2, 0.09, 0.14, null, fr, 0, h / 2 + 0.02, 0.03, wg);
swB(w + 0.24, 0.07, 0.3, "wood", 0xEEE6D6, 0, -h / 2 - 0.03, 0.1, wg);
swB(0.08, h, 0.14, null, fr, -w / 2 - 0.04, 0, 0.03, wg);
swB(0.08, h, 0.14, null, fr, w / 2 + 0.04, 0, 0.03, wg);
swB(0.045, h, 0.06, null, fr, 0, 0, 0.04, wg);
for (var r = 1; r < 3; r++)
swB(w, 0.035, 0.06, null, fr, 0, -h / 2 + r * h / 3, 0.04, wg);
swB(0.06, h, 0.3, "plaster", 0xE8E0D2, -w / 2 - 0.11, 0, -0.08, wg);
swB(0.06, h, 0.3, "plaster", 0xE8E0D2, w / 2 + 0.11, 0, -0.08, wg);
swB(w + 0.28, 0.06, 0.3, "plaster", 0xE8E0D2, 0, h / 2 + 0.09, -0.08, wg);
return wg;
},
function () {
if (SW_PATHS)
return SW_PATHS;
var P = [], ring = [], G = SW_GREEN, r = G.r + 5;
for (var i = 0; i <= 40; i++) {
var a = i / 40 * Math.PI * 2;
ring.push([G.x + Math.sin(a) * r, G.z - Math.cos(a) * r]);
}
P.push(ring);
var lane = [];
for (var j = 0; j <= 32; j++) {
var a2 = (100 + j * (268 - 100) / 32) * Math.PI / 180;
lane.push([Math.sin(a2) * (SW_LANE_R - 14), 20 - Math.cos(a2) * (SW_LANE_R - 14)]);
}
P.push(lane);
P.push([[0, 128], [0, 96], [0, G.z + r]]);
P.push([[0, G.z - r], [0, -40], [0, -60]]);
P.push([[-G.r - 5, G.z - 4], [-80, -6], [-130, -24], [-170, -34], [-186, -36]]);
P.push([[G.r + 5, G.z - 10], [70, -20], [110, -40], [124, -40]]);
P.push([[0, -60], [-30, -62], [-60, -66], [-100, -78], [-130, -100]]);
P.push([[0, -60], [40, -66], [80, -90], [100, -100]]);
Object.keys(SW_HOUSE_AT).forEach(function (k) {
var H = SW_HOUSE_AT[k], dx = Math.sin(H.ry), dz = Math.cos(H.ry), fx = H.x + dx * (H.d / 2 + 0.6), fz = H.z + dz * (H.d / 2 + 0.6), tx = H.x + dx * (H.d / 2 + 8), tz = H.z + dz * (H.d / 2 + 8);
if (k === "stars") {
tx = H.x + dx * (H.d / 2 + 12);
tz = H.z + dz * (H.d / 2 + 12);
}
P.push([[fx, fz], [tx, tz]]);
});
return (SW_PATHS = P);
},
function (x, z) {
var h = wFbm(x * 0.004 + 11, z * 0.004 + 3, 4, 4) * 5 - 2.2 + wNoise(x * 0.02, z * 0.02, 9) * 0.6;
var d = Math.hypot(x * 0.95, z * 0.9);
if (d > 330) {
var e = Math.min(d - 330, 260);
h += e * e * 0.0016;
}
h += 13 * swSmooth(Math.hypot(x - SW_AT.hill.x, z - SW_AT.hill.z), 120);
return h;
},
function () {
if (SW_FLATS)
return SW_FLATS;
var F = [];
Object.keys(SW_HOUSE_AT).forEach(function (k) { var H = SW_HOUSE_AT[k]; F.push([H.x, H.z, Math.max(H.w, H.d) * 0.7 + 3]); });
F.push([SW_GREEN.x, SW_GREEN.z, SW_GREEN.r + 8]);
F.push([SW_AT.arrive.x, SW_AT.arrive.z, 10]);
F.push([SW_AT.allot.x, SW_AT.allot.z, SW_AT.allot.r]);
return (SW_FLATS = F);
},
function (x, z) {
var h = swLandRaw(x, z), F = swFlats();
for (var i = 0; i < F.length; i++) {
var f = F[i], d = Math.hypot(x - f[0], z - f[1]);
if (d < f[2] + 30) {
var y = swCentre(f), k = swSmooth(Math.max(0, d - f[2] * 0.8), f[2] * 0.2 + 30);
h = h * (1 - k) + y * k;
}
}
var e = swLakeE(x, z);
if (e < 0.97)
h = SW_LAKE.y - 0.12 - 2.2 * (1 - e / 0.97);
else if (e < 1.4) {
var t = (e - 0.97) / 0.43, k2 = t * t * (3 - 2 * t), shore = SW_LAKE.y + 0.12 + (e - 0.97) * 1.5;
h = shore * (1 - k2) + Math.max(h, shore) * k2;
}
var sd = swStreamD(x, z);
if (sd < 12 && !(e < 1.1)) {
var k3 = swSmooth(sd, 12);
h = h * (1 - k3 * 0.85) + (SW_LAKE.y - 0.4) * k3 * 0.85;
}
return h;
},
function (x, z) {
var H = SW.hg;
if (!H)
return -1e9;
var u = (x + H.S / 2) / H.st, v = (z + H.S / 2) / H.st, i = Math.floor(u), j = Math.floor(v);
if (i < 0 || j < 0 || i >= H.n || j >= H.n)
return -1e9;
var fu = u - i, fv = v - j, N = H.n + 1, a = H.h[j * N + i], b = H.h[j * N + i + 1], c = H.h[(j + 1) * N + i], d = H.h[(j + 1) * N + i + 1];
if (fu + fv <= 1)
return a + (b - a) * fu + (c - a) * fv;
return d + (c - d) * (1 - fu) + (b - d) * (1 - fv);
},
function (x, z, h) {
var n = wNoise(x * 0.012, z * 0.012, 5), n2 = wNoise(x * 0.05, z * 0.05, 8), n3 = wNoise(x * 0.004 + 7, z * 0.004 + 2, 3), c = swMix(0x6E9A48, 0x9AB45E, n);
c = swMix(c, 0x5E8A3C, n2 * 0.35);
c = swMix(c, 0xA8A866, Math.max(0, n3 - 0.55) * 1.2);
if (Math.hypot(x - SW_GREEN.x, z - SW_GREEN.z) < SW_GREEN.r + 2)
c = swMix(0x74A64C, 0x86B456, n2);
var md = Math.hypot(x - SW_AT.meadow.x, z - SW_AT.meadow.z);
if (md < SW_AT.meadow.r + 20)
c = swMix(c, 0x9AA860, 0.35 * swSmooth(md, SW_AT.meadow.r + 20));
var e = swLakeE(x, z);
if (e < 1.08)
c = swMix(c, 0x8A7A5A, Math.min(1, (1.08 - e) * 8));
if (e < 0.96)
c = 0x6A5E46;
if (swStreamD(x, z) < 5)
c = swMix(c, 0x6A604A, 0.7);
if (h > 16)
c = swMix(c, 0x6E8A50, Math.min(1, (h - 16) / 20));
return c;
},
function (G) {
var n = SW.lite ? 150 : 240, S = 1200;
var mat = new THREE.MeshLambertMaterial({ vertexColors: true });
mat.userData.noReal = 1;
try {
var gt = new THREE.TextureLoader().load("assets/textures/photo/grass" + (SW.lite ? "" : "-1k") + ".jpg");
gt.wrapS = gt.wrapT = THREE.RepeatWrapping;
gt.repeat.set(S / 5, S / 5);
try {
gt.anisotropy = Math.min(SW.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
gt.encoding = THREE.sRGBEncoding;
mat.map = gt;
SW.groundTex = gt;
}
catch (e) { }
var st = S / n, HG = new Float32Array((n + 1) * (n + 1));
SW.hg = { n: n, S: S, st: st, h: HG };
var mesh = wGround(S, n, function (x, z) { var h = swLand(x, z), i = Math.round((x + S / 2) / st), j = Math.round((z + S / 2) / st); HG[j * (n + 1) + i] = h; return [h, swGroundCol(x, z, h)]; }, mat);
mesh.receiveShadow = true;
G.add(mesh);
SW.ground = mesh;
var L = SW_LAKE, lg = new THREE.CircleGeometry(1, 72);
lg.rotateX(-Math.PI / 2);
lg.scale(L.rx * 1.02, 1, L.rz * 1.02);
var lm = new THREE.MeshPhongMaterial({ color: 0x4A7A86, shininess: 140, specular: 0xF0E0C0, transparent: true, opacity: 0.93, emissive: new THREE.Color(0x14282C) });
var lake = swAdd(lg, lm, L.x, L.y, L.z, G);
SW.lake = lake;
var pg = new THREE.CircleGeometry(0.5, 10, 0.3, Math.PI * 2 - 0.6);
pg.rotateX(-Math.PI / 2);
var pm = swMat(null, 0x4A7A3A), R = wRand(808), N = SW.lite ? 40 : 110, pad = new THREE.InstancedMesh(pg, pm, N), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), k = 0;
while (k < N) {
var a = R() * 6.283, rr = 0.78 + R() * 0.17, x = L.x + Math.sin(a) * L.rx * rr, z = L.z - Math.cos(a) * L.rz * rr;
if (Math.abs(x) < 26 && z > -90)
continue;
e.set(0, R() * 6.28, 0);
q.setFromEuler(e);
var sc = 0.6 + R() * 0.9;
v.set(x, L.y + 0.03, z);
s.set(sc, 1, sc);
m4.compose(v, q, s);
pad.setMatrixAt(k++, m4);
}
pad.instanceMatrix.needsUpdate = true;
pad.frustumCulled = false;
G.add(pad);
var fl = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 8, 6), swMat(null, 0xF4E8F0), Math.floor(N / 3));
for (var f = 0; f < fl.count; f++) {
pad.getMatrixAt(f * 3, m4);
m4.decompose(v, q, s);
v.y += 0.06;
s.set(1, 0.6, 1);
m4.compose(v, q, s);
fl.setMatrixAt(f, m4);
}
fl.instanceMatrix.needsUpdate = true;
fl.frustumCulled = false;
G.add(fl);
swRibbon(G, SW_STREAM, 7, new THREE.MeshPhongMaterial({ color: 0x5A8A96, shininess: 100, specular: 0xD8D0B8, transparent: true, opacity: 0.88 }), function (x, z) { return SW_LAKE.y - 0.25; });
swPathsBuild(G);
var rk = typeof ctuRock === "function" ? ctuRock(1, 3) : new THREE.IcosahedronGeometry(1, 0), rm = swMat("stone", 0x8A867E), R2 = wRand(55);
for (var r2 = 0; r2 < (SW.lite ? 30 : 80); r2++) {
var a2 = R2() * 6.283, x2, z2;
if (r2 % 3) {
x2 = L.x + Math.sin(a2) * L.rx * (1.0 + R2() * 0.06);
z2 = L.z - Math.cos(a2) * L.rz * (1.0 + R2() * 0.06);
if (Math.abs(x2) < 20 && z2 > -100)
continue;
}
else {
var t = R2() * (SW_STREAM.length - 1.01), i2 = Math.floor(t), A = SW_STREAM[i2], B = SW_STREAM[i2 + 1], f2 = t - i2, sdx = B[1] - A[1], sdz = -(B[0] - A[0]), sl = Math.hypot(sdx, sdz) || 1, side = R2() < 0.5 ? -1 : 1;
x2 = A[0] + (B[0] - A[0]) * f2 + sdx / sl * 4.2 * side;
z2 = A[1] + (B[1] - A[1]) * f2 + sdz / sl * 4.2 * side;
}
var m = swAdd(rk, rm, x2, swLand(x2, z2) - 0.1, z2, G);
var sc2 = 0.3 + R2() * 0.8;
m.scale.set(sc2 * (1 + R2()), sc2 * (0.5 + R2() * 0.6), sc2 * (1 + R2()));
m.rotation.y = R2() * 6;
}
},
function (G, P, w, mat, yf, y0) {
var pos = [], uv = [], idx = [], along = 0, n = 0;
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), steps = Math.max(1, Math.ceil(L / 2.5)), nx = -(b[1] - a[1]) / L, nz = (b[0] - a[0]) / L;
for (var s = (i === 0 ? 0 : 1); s <= steps; s++) {
var t = s / steps, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, al = along + L * t;
var lx = x + nx * w / 2, lz = z + nz * w / 2, rx = x - nx * w / 2, rz = z - nz * w / 2;
pos.push(lx, yf(lx, lz) + (y0 || 0), lz, rx, yf(rx, rz) + (y0 || 0), rz);
uv.push(0, al / (SW.uvM || 1.8), w / (SW.uvM || 1.8), al / (SW.uvM || 1.8));
if (n > 0) {
var q = (n - 1) * 2;
idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3);
}
n++;
}
along += L;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var ny = 0, nn = g.attributes.normal;
for (var c = 0; c < nn.count; c += 5)
ny += nn.getY(c);
if (ny < 0) {
for (var t2 = 0; t2 < idx.length; t2 += 3) {
var tmp = idx[t2 + 1];
idx[t2 + 1] = idx[t2 + 2];
idx[t2 + 2] = tmp;
}
g.setIndex(idx);
g.computeVertexNormals();
}
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
G.add(m);
return m;
},
function (G) {
var t = swTexK("paving");
var mat = new THREE.MeshLambertMaterial({ color: 0xD4C8AE, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
if (t) {
var tt = t.clone();
tt.needsUpdate = true;
tt.wrapS = tt.wrapT = THREE.RepeatWrapping;
tt.repeat.set(1, 1);
mat.map = tt;
}
SW.uvM = 1.1;
swPaths().forEach(function (P, i) { swRibbon(G, P, i < 2 ? 3.4 : 2.4, mat, function (x, z) { return swLand(x, z); }, 0.05); });
var vm = new THREE.MeshLambertMaterial({ color: 0x9AB86A, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1, transparent: true, opacity: 0.45, depthWrite: false });
if (SW.groundTex)
vm.map = SW.groundTex;
SW.uvM = 5;
swPaths().forEach(function (P, i) { swRibbon(G, P, (i < 2 ? 3.4 : 2.4) + 2.2, vm, function (x, z) { return swLand(x, z); }, 0.03); });
SW.uvM = 1.1;
},
function () {
var R = SW.room, base = R ? (SW_ENV[R.env || "inside"] || SW_ENV.inside) : SW_ENV.out, C = swCalm(), E = {};
for (var k in base)
E[k] = base[k];
var b = C.bright === undefined ? 1 : C.bright;
SW.bri = SW.bri === undefined ? b : SW.bri + (b - SW.bri) * 0.05;
E.sun *= SW.bri;
E.hemi *= SW.bri;
return E;
},
function (G) {
var sg = new THREE.SphereGeometry(1500, 32, 20), sp = sg.attributes.position, sc = new Float32Array(sp.count * 3), ca = new THREE.Color(), top = new THREE.Color(0x1A4290), mid = new THREE.Color(0x5A80B8), low = new THREE.Color(0xC0905A), haze = new THREE.Color(0xA89070);
for (var i = 0; i < sp.count; i++) {
var h = sp.getY(i) / 1500;
if (h < 0.02)
ca.copy(haze);
else if (h < 0.18)
ca.copy(low).lerp(mid, (h - 0.02) / 0.16);
else
ca.copy(mid).lerp(top, Math.min(1, (h - 0.18) / 0.5));
sc[i * 3] = ca.r;
sc[i * 3 + 1] = ca.g;
sc[i * 3 + 2] = ca.b;
}
sg.setAttribute("color", new THREE.BufferAttribute(sc, 3));
var dome = new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
dome.renderOrder = -9;
dome.frustumCulled = false;
G.add(dome);
SW.dome = dome;
var sun = new THREE.Mesh(new THREE.SphereGeometry(30, 20, 14), new THREE.MeshBasicMaterial({ color: 0xFFE8C0, fog: false }));
sun.position.set(-1100, 420, 560);
G.add(sun);
var halo = wGlow(0xFFD8A0, 170, 0.2);
halo.position.copy(sun.position);
G.add(halo);
var soft = wTex(128, 128, function (x, W, H) { var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.6, "rgba(255,255,255,.5)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
var cm = new THREE.SpriteMaterial({ map: soft, color: 0xFFF0E0, transparent: true, opacity: 0.45, depthWrite: false, fog: false }), cm2 = new THREE.SpriteMaterial({ map: soft, color: 0xF0D8C8, transparent: true, opacity: 0.38, depthWrite: false, fog: false });
var cg = new THREE.Group();
G.add(cg);
SW.clouds = cg;
for (var i = 0; i < (SW.lite ? 7 : 14); i++) {
var R = wRand(400 + i), a = R() * 6.283, rr = 200 + R() * 600, cx = Math.cos(a) * rr, cy = 380 + R() * 140, cz = Math.sin(a) * rr, n = 4 + (R() * 4 | 0);
for (var k = 0; k < n; k++) {
var sp = new THREE.Sprite(k % 3 === 2 ? cm2 : cm), w = 150 + R() * 200;
sp.scale.set(w, w * 0.3, 1);
sp.position.set(cx + (R() - 0.5) * 220, cy + (R() - 0.5) * 20, cz + (R() - 0.5) * 120);
cg.add(sp);
}
}
},
function (kind) {
var bark = [], core = [], leaf = [], M = function (x, y, z, sx, sy, sz, rx, rz) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, 0, rz || 0)), new THREE.Vector3(sx || 1, sy || 1, sz || 1)); return m; };
function trunk(r0, r1, h, y, rx, rz, x, z) { bark.push({ geo: swMetre(new THREE.CylinderGeometry(r1, r0, h, 8)), m: M(x || 0, y + h / 2, z || 0, 1, 1, 1, rx, rz) }); }
function ball(x, y, z, r, sy) { core.push({ geo: new THREE.IcosahedronGeometry(r, 1), m: M(x, y, z, 0.74, 0.6 * (sy || 1), 0.74) }); leaf.push({ geo: ctuInstGeo("ball", { radius: r }), m: M(x, y, z, 1, 0.8 * (sy || 1), 1) }); }
function cone(y, r, h) { core.push({ geo: new THREE.ConeGeometry(r, h, 8), m: M(0, y, 0, 0.62, 0.92, 0.62) }); leaf.push({ geo: ctuInstGeo("cone", { radius: r * 1.08, height: h }), m: M(0, y, 0) }); }
var col = { oak: [0x5A4632, 0x4A7A2E], birch: [0xD8D4CA, 0x7AA844], willow: [0x6A5A42, 0x7A9A4A], fruit: [0x5A4232, 0x4E8A30], pine: [0x4A3A2A, 0x2E5A34] }[kind];
if (kind === "oak") {
trunk(0.8, 0.52, 5, 0);
trunk(0.52, 0.32, 4, 4.8, 0.05, 0.08);
[[0, 3.5, 0.9], [2.1, 3.2, 0.8], [4.2, 3.0, 0.9], [5.3, 3.4, 0.7]].forEach(function (l) { trunk(0.3, 0.14, l[1], 6.5, Math.sin(l[0]) * l[2], Math.cos(l[0]) * l[2]); });
ball(0, 12.5, 0, 4.8);
ball(3.4, 10.6, 1.4, 4);
ball(-3.2, 10.8, -1.2, 4);
ball(0.8, 10.2, -3.4, 3.6);
ball(-1.2, 10.4, 3.4, 3.6);
}
else if (kind === "birch") {
trunk(0.22, 0.14, 9, 0);
trunk(0.14, 0.08, 4, 8.7, 0.08, 0.06);
ball(0, 12, 0, 2.7);
ball(1.4, 10.4, 0.6, 2.3);
ball(-1.3, 10.6, -0.5, 2.3);
}
else if (kind === "willow") {
trunk(0.7, 0.45, 4, 0);
[[0, 0.7], [1.6, 0.7], [3.2, 0.75], [4.8, 0.7]].forEach(function (l) { trunk(0.3, 0.12, 4, 3.6, Math.sin(l[0]) * l[1], Math.cos(l[0]) * l[1]); });
ball(0, 9, 0, 4.2, 1);
for (var w = 0; w < 8; w++) {
var a = w / 8 * Math.PI * 2;
ball(Math.cos(a) * 3.6, 6.2, Math.sin(a) * 3.6, 2.2, 2.3);
}
}
else if (kind === "fruit") {
trunk(0.3, 0.22, 2.4, 0);
[[0, 1.6], [2.1, 1.4], [4.2, 1.5]].forEach(function (l) { trunk(0.18, 0.1, l[1], 2.2, Math.sin(l[0]) * 0.7, Math.cos(l[0]) * 0.7); });
ball(0, 4.6, 0, 2.5);
ball(1.5, 4.0, 0.6, 1.9);
ball(-1.4, 4.1, -0.6, 1.9);
ball(0.3, 3.9, -1.6, 1.8);
}
else {
trunk(0.42, 0.12, 18, 0);
cone(5.5, 4, 5.5);
cone(9, 3.2, 5);
cone(12.4, 2.4, 4.5);
cone(15.4, 1.5, 4);
}
return { bark: ctuBake(bark), core: ctuBake(core), leaf: (function () { var g = ctuBake(leaf); g.userData.ctuLeaf = 1; return g; })(), col: col, kind: kind };
},
function (x, z, pad) {
if (swPathAll(x, z) < 3.5 + pad)
return false;
if (swLakeE(x, z) < 1.02 && !(pad < 0))
return false;
if (swStreamD(x, z) < 5)
return false;
if (Math.hypot(x - SW_GREEN.x, z - SW_GREEN.z) < SW_GREEN.r + 4)
return false;
if (Math.hypot(x - SW_AT.allot.x, z - SW_AT.allot.z) < SW_AT.allot.r + 4)
return false;
for (var k in SW_HOUSE_AT) {
var H = SW_HOUSE_AT[k];
if (Math.hypot(x - H.x, z - H.z) < Math.max(H.w, H.d) * 0.75 + 4 + pad)
return false;
}
if (Math.hypot(x - SW_AT.arrive.x, z - SW_AT.arrive.z) < 12)
return false;
if (Math.hypot(x - SW_AT.harbour.x, z - SW_AT.harbour.z) < SW_AT.harbour.r)
return false;
return true;
},
function (G) {
var list = {}, R = wRand(2424);
SW_TREEK.forEach(function (k) { list[k] = []; });
for (var i = 0; i < (SW.lite ? 18 : 34); i++) {
var a = R() * 6.283, x = SW_LAKE.x + Math.sin(a) * SW_LAKE.rx * (1.1 + R() * 0.12), z = SW_LAKE.z - Math.cos(a) * SW_LAKE.rz * (1.12 + R() * 0.14);
if (swTreeOK(x, z, 0))
list.willow.push({ x: x, z: z, s: 0.85 + R() * 0.35, a: R() * 6.28 });
}
for (var oi = 0; oi < 4; oi++)
for (var oj = 0; oj < 4; oj++) {
var ox = SW_AT.allot.x + 34 + oi * 9, oz = SW_AT.allot.z - 20 + oj * 9;
if (swTreeOK(ox, oz, 0))
list.fruit.push({ x: ox, z: oz, s: 0.9 + R() * 0.2, a: R() * 6.28 });
}
var tries = SW.lite ? 900 : 2200, want = SW.lite ? 160 : 380, n = 0;
for (var t = 0; t < tries && n < want; t++) {
var tx = (R() - 0.5) * 980, tz = (R() - 0.5) * 940, d = Math.hypot(tx, tz);
if (d > 470)
continue;
if (!swTreeOK(tx, tz, 1))
continue;
var near = d < 190, k = d > 330 ? (R() < 0.7 ? "pine" : "oak") : near ? (R() < 0.6 ? "oak" : "birch") : (R() < 0.5 ? "oak" : R() < 0.6 ? "birch" : "pine");
if (near && R() < 0.45)
continue;
list[k].push({ x: tx, z: tz, s: 0.75 + R() * 0.5, a: R() * 6.28 });
n++;
}
var grp = new THREE.Group();
G.add(grp);
SW.treeList = list;
var m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
SW_TREEK.forEach(function (k) {
var L = list[k];
if (!L.length)
return;
var P = swTreeProto(k);
var bm = new THREE.MeshLambertMaterial({ color: P.col[0], map: swTexK("bark") }), cm = new THREE.MeshLambertMaterial({ color: ctuMul(P.col[1], 0.78) }), lm = ctuLeafMat(P.col[1]);
[[P.bark, bm], [P.core, cm], [P.leaf, lm]].forEach(function (pp, qi) {
var im = new THREE.InstancedMesh(pp[0], pp[1], L.length);
im.frustumCulled = false;
im.castShadow = qi === 0;
L.forEach(function (T, i) { e.set(0, T.a, 0); q.setFromEuler(e); v.set(T.x, swLand(T.x, T.z) - 0.15, T.z); s.set(T.s, T.s, T.s); m.compose(v, q, s); im.setMatrixAt(i, m); });
im.instanceMatrix.needsUpdate = true;
grp.add(im);
});
});
},
function () {
var parts = [], st = new THREE.CylinderGeometry(0.005, 0.007, 0.26, 3, 1, true);
st.translate(0, 0.13, 0);
parts.push([st, 0x3E5A26]);
function blade(L, W, col, rx, ry, tx, ty, tz, cup) {
var g = new THREE.BufferGeometry(), v = [0, 0, 0, L * 0.5, cup, W, L, cup * 1.6, 0, L * 0.5, cup, -W];
g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
g.setIndex([0, 1, 2, 0, 2, 3]);
g.computeVertexNormals();
g.rotateZ(rx);
g.rotateY(ry);
g.translate(tx, ty, tz);
parts.push([g, col]);
}
blade(0.11, 0.024, 0x3E5A26, 0.25, 0.4, 0, 0.02, 0, 0.006);
blade(0.1, 0.022, 0x3E5A26, 0.3, 2.5, 0, 0.03, 0, 0.006);
blade(0.1, 0.022, 0x46662C, 0.3, 4.6, 0, 0.025, 0, 0.006);
for (var k = 0; k < 8; k++)
blade(0.09, 0.022, 0xFFFFFF, 0, k / 8 * 6.283, 0, 0.265, 0, 0.014);
var hd = new THREE.SphereGeometry(0.016, 5, 3);
hd.scale(1.2, 0.6, 1.2);
hd.translate(0, 0.272, 0);
parts.push([hd, 0xE8C040]);
var pos = [], nor = [], col = [], c = new THREE.Color();
parts.forEach(function (P) {
var g = P[0].toNonIndexed(), a = g.attributes.position.array, nn = g.attributes.normal.array;
c.setHex(P[1]);
for (var i = 0; i < a.length; i++) {
pos.push(a[i]);
nor.push(nn[i]);
}
for (var j = 0; j < a.length / 3; j++)
col.push(c.r, c.g, c.b);
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
return G;
},
function (tall) {
var pos = [], col = [], R = wRand(tall ? 79 : 77), lo = new THREE.Color(tall ? 0x4A6A2A : 0x3E6A26), hi = new THREE.Color(tall ? 0xB8C07A : 0xA8C068);
for (var b = 0; b < (tall ? 12 : 16); b++) {
var a = R() * 6.283, h = (tall ? 0.8 : 0.18) + R() * (tall ? 0.6 : 0.22), w = tall ? 0.014 : 0.016, lean = 0.06 + R() * 0.16, ox = Math.cos(a) * 0.08, oz = Math.sin(a) * 0.08, tx = ox + Math.cos(a) * lean, tz = oz + Math.sin(a) * lean, px = -Math.sin(a) * w, pz = Math.cos(a) * w;
pos.push(ox - px, 0, oz - pz, ox + px, 0, oz + pz, tx, h, tz);
col.push(lo.r, lo.g, lo.b, lo.r, lo.g, lo.b, hi.r, hi.g, hi.b);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
G.computeVertexNormals();
var n = G.attributes.normal;
for (var i = 0; i < n.count; i++)
n.setXYZ(i, 0, 1, 0);
return G;
},
function (G) {
if (typeof ctuFrondGeo !== "function")
return;
var U = { cx: 1e9, cz: 1e9, parts: [] }, cap = SW.lite ? 140 : 600;
var fern = ctuFrondGeo(1.1), fm = new THREE.MeshLambertMaterial({ color: 0x4A7A2E, side: THREE.DoubleSide });
var bush = ctuInstGeo("ball", { radius: 0.9 }), bm = ctuLeafMat(0x4E8A34);
var fl = swFlowerGeo(), flm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, side: THREE.DoubleSide });
var gr = swTuftGeo(false), grm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, side: THREE.DoubleSide });
var rd = swTuftGeo(true), rdm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, side: THREE.DoubleSide });
[[fern, fm, "fern"], [bush, bm, "bush"], [fl, flm, "flower"], [gr, grm, "grass"], [rd, rdm, "reed"]].forEach(function (p) {
var N = p[2] === "flower" ? cap * 8 : p[2] === "grass" ? cap * 11 : p[2] === "reed" ? cap * 2 : p[2] === "fern" ? cap * 2 : cap, im = new THREE.InstancedMesh(p[0], p[1], N);
if (p[2] === "flower")
im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(N * 3), 3);
im.count = 0;
im.frustumCulled = false;
im.userData.noSit = 1;
G.add(im);
U.parts.push({ k: p[2], im: im, max: N });
});
SW.under = U;
},
function (x, z) {
var U = SW.under;
if (!U || Math.hypot(x - U.cx, z - U.cz) < 24)
return;
U.cx = x;
U.cz = z;
var Rr = SW.lite ? 80 : 130, C = 5, n = Math.ceil(Rr / C), ci = Math.floor(x / C), cj = Math.floor(z / C), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), cnt = { fern: 0, bush: 0, flower: 0, grass: 0, reed: 0 }, col = new THREE.Color();
var by = {};
U.parts.forEach(function (P) { by[P.k] = P; });
for (var i = ci - n; i <= ci + n; i++)
for (var j = cj - n; j <= cj + n; j++) {
var R = wRand(((i * 92821) ^ (j * 68917)) >>> 0 || 3), px = (i + R()) * C, pz = (j + R()) * C;
if (Math.hypot(px - x, pz - z) > Rr)
continue;
if (swPathAll(px, pz) < 2.6)
continue;
var le = swLakeE(px, pz), r = R(), y = swLand(px, pz), k = null;
if (le < 0.97)
continue;
if (le < 1.12 || swStreamD(px, pz) < 7)
k = r < 0.3 ? "reed" : r < 0.8 ? "grass" : "flower";
else {
var md = Math.hypot(px - SW_AT.meadow.x, pz - SW_AT.meadow.z), gd = Math.hypot(px - SW_GREEN.x, pz - SW_GREEN.z);
if (gd < SW_GREEN.r + 2)
k = r < 0.12 ? "flower" : r < 0.5 ? "grass" : null;
else if (md < SW_AT.meadow.r + 10)
k = r < 0.62 ? "flower" : "grass";
else
k = r < 0.3 ? "flower" : r < 0.9 ? "grass" : r < 0.93 ? "fern" : "bush";
}
if (k !== "grass" && k !== "flower" && k !== "reed") {
var near = false;
for (var hk in SW_HOUSE_AT) {
var H = SW_HOUSE_AT[hk];
if (Math.hypot(px - H.x, pz - H.z) < Math.max(H.w, H.d) * 0.8 + 2) {
near = true;
break;
}
}
if (near)
k = "grass";
}
if (!k)
continue;
var P = by[k];
if (cnt[k] >= P.max)
continue;
var sc = k === "bush" ? 0.7 + R() * 0.6 : k === "flower" ? 0.8 + R() * 0.6 : 0.8 + R() * 0.5;
if (k === "grass" || k === "reed") {
for (var gg = 0; gg < (k === "reed" ? 5 : 8) && cnt[k] < P.max; gg++) {
var gx = px + (R() - 0.5) * 4, gz = pz + (R() - 0.5) * 4, gs = 0.5 + R() * 0.55;
if (swLakeE(gx, gz) < 0.99)
continue;
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
v.set(gx, swLand(gx, gz) - 0.02, gz);
s.set(gs, gs * (0.8 + R() * 0.6), gs);
m.compose(v, q, s);
P.im.setMatrixAt(cnt[k]++, m);
}
continue;
}
if (k === "flower") {
var fc = SW_FLC[(R() * SW_FLC.length) | 0];
for (var g = 0; g < 6 && cnt.flower < P.max; g++) {
var fx = px + (R() - 0.5) * 2.2, fz = pz + (R() - 0.5) * 2.2;
v.set(fx, swLand(fx, fz), fz);
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
s.set(sc * 1.5, sc * 1.6, sc * 1.5);
m.compose(v, q, s);
P.im.setMatrixAt(cnt.flower, m);
col.setHex(fc);
P.im.setColorAt(cnt.flower, col);
cnt.flower++;
}
continue;
}
if (k === "fern") {
for (var f = 0; f < 4 && cnt.fern < P.max; f++) {
e.set(0, R() * 6.283 + f * 1.5, 0.3);
q.setFromEuler(e);
v.set(px, y + 0.2, pz);
s.set(sc, sc, sc);
m.compose(v, q, s);
P.im.setMatrixAt(cnt.fern++, m);
}
continue;
}
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
v.set(px, y + 0.55 * sc, pz);
s.set(sc, sc * 0.8, sc);
m.compose(v, q, s);
P.im.setMatrixAt(cnt[k]++, m);
}
U.parts.forEach(function (P) { P.im.count = cnt[P.k]; P.im.instanceMatrix.needsUpdate = true; if (P.im.instanceColor)
P.im.instanceColor.needsUpdate = true; });
},
function (p, x, y, z, ry, w, h, o) {
o = o || {};
var g = swG(x, y, z, p, ry), fr = o.frame || 0xEEE6D6;
var gl = swB(w, h, 0.06, null, 0, 0, 0, 0, g);
gl.material = o.lit ? swGlowM(o.lit) : swShiny(0x2E3A48, 90);
swB(w + 0.16, 0.08, 0.12, null, fr, 0, h / 2, 0.03, g);
swB(w + 0.16, 0.08, 0.12, null, fr, 0, -h / 2, 0.03, g);
swB(0.08, h, 0.12, null, fr, -w / 2, 0, 0.03, g);
swB(0.08, h, 0.12, null, fr, w / 2, 0, 0.03, g);
swB(0.05, h, 0.08, null, fr, 0, 0, 0.04, g);
swB(w, 0.05, 0.08, null, fr, 0, h * 0.1, 0.04, g);
swB(w + 0.3, 0.07, 0.24, "stone", 0xB8B0A0, 0, -h / 2 - 0.06, 0.1, g);
if (o.shutters) {
swB(w * 0.5, h, 0.05, "wood", o.shutters, -w * 0.78, 0, 0.05, g);
swB(w * 0.5, h, 0.05, "wood", o.shutters, w * 0.78, 0, 0.05, g);
}
if (o.flowers) {
swB(w, 0.2, 0.22, "wood", 0x5A3A22, 0, -h / 2 - 0.12, 0.24, g);
for (var i = 0; i < 6; i++)
swS(0.075, [0xE85A6A, 0xF4F0E8, 0xE8B030, 0xB86AD0][i % 4], -w / 2 + 0.1 + i * (w - 0.2) / 5, -h / 2 + 0.03, 0.26, g, 6);
swLeafBall(g, 0, -h / 2 + 0.0, 0.2, 0.16, 0x4A8A3A).scale.set(w * 2.2, 0.6, 0.8);
}
return g;
},
function (p, x, y, z, ry, w, h, col, o) {
o = o || {};
var g = swG(x, y, z, p, ry);
swB(w + 0.36, h + 0.22, 0.3, o.frameKind || "stone", o.frame || 0xB8B0A0, 0, (h + 0.22) / 2, -0.02, g);
var gap = swB(w, h, 0.05, null, 0, 0, h / 2, 0.08, g);
gap.material = swGlowM(0x8A6A3A);
var leaf = swG(-w / 2, 0, 0.14, g, -0.85);
swB(w, h, 0.08, "wood", col || 0x5A3A22, w / 2, h / 2, 0, leaf);
swB(w * 0.9, 0.06, 0.03, null, 0x2A2A2A, w / 2, h * 0.3, 0.05, leaf);
swB(w * 0.9, 0.06, 0.03, null, 0x2A2A2A, w / 2, h * 0.72, 0.05, leaf);
swS(0.05, 0xC8A048, w * 0.85, h * 0.5, 0.07, leaf, 8);
if (o.arch) {
var a = swAdd(new THREE.CylinderGeometry(w / 2 + 0.18, w / 2 + 0.18, 0.3, 16, 1, false, 0, Math.PI), swMat("stone", o.frame || 0xB8B0A0), 0, h + 0.11, -0.02, g);
a.rotation.x = Math.PI / 2;
a.rotation.z = Math.PI / 2;
}
swB(w + 0.9, 0.14, 0.9, "stone", 0xA8A090, 0, 0.07, 0.5, g);
return g;
},
function (p, w, d, y, rh, kind, col, over, gableKind, gableCol) {
over = over || 0.5;
var half = d / 2 + over, slope = Math.hypot(half, rh), ang = Math.atan2(rh, half), g = swG(0, y, 0, p);
var th = kind === "thatch" ? 0.55 : 0.2;
[-1, 1].forEach(function (s) { var r = swB(w + over * 2, th, slope, kind, col, 0, rh / 2, s * half / 2, g); r.rotation.x = s * ang; });
if (kind === "thatch") {
var rid = swC(0.4, 0.4, w + over * 2, "thatch", swMix(col, 0x3A2A1A, 0.15), 0, rh + 0.1, 0, g, 10);
rid.rotation.z = Math.PI / 2;
}
else
swB(w + over * 2 + 0.1, 0.22, 0.3, kind, col, 0, rh + 0.05, 0, g);
swPrism(d, rh, 0.2, gableKind || "plaster", gableCol === undefined ? 0xEEE4D0 : gableCol, w / 2 - 0.1, 0, 0, g, Math.PI / 2);
swPrism(d, rh, 0.2, gableKind || "plaster", gableCol === undefined ? 0xEEE4D0 : gableCol, -w / 2 + 0.1, 0, 0, g, Math.PI / 2);
return g;
},
function (g, x, y, z, ry, icon, name, bg) {
var s = swG(x, y, z, g, ry);
swB(0.06, 0.06, 1.3, null, 0x1A1A1A, 0, 0.62, 0.6, s);
var t = wTex(256, 200, function (c, W, H) {
c.fillStyle = bg || "#F4EEDC";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#5A4A32";
c.lineWidth = 10;
c.strokeRect(5, 5, W - 10, H - 10);
c.font = "96px system-ui,'Segoe UI Emoji','Noto Color Emoji'";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(icon, W / 2, H * 0.4);
c.fillStyle = "#2E3A2E";
c.font = "bold 25px Georgia";
var words = name.replace(/^The /, "");
c.fillText(words.length > 18 ? words.slice(0, 18) + "…" : words, W / 2, H * 0.84);
});
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
var b = swAdd(new THREE.PlaneGeometry(0.95, 0.74), m, 0, 0.2, 1.1, s);
b.rotation.y = Math.PI / 2;
swB(0.03, 0.26, 0.03, null, 0x1A1A1A, 0, 0.5, 0.86, s);
swB(0.03, 0.26, 0.03, null, 0x1A1A1A, 0, 0.5, 1.34, s);
return s;
},
function (G, k) {
var H = swHouseDef(k), A = SW_HOUSE_AT[k];
if (!H || !A)
return;
var w = H[5][0], d = H[5][1], fl = H[5][2] || 1, y0 = swLand(A.x, A.z), g = swG(A.x, y0, A.z, G, A.ry), wall = SW_WALLS[H[6]] || SW_WALLS.plaster, roof = SW_ROOFS[H[7]] || SW_ROOFS.slate;
if (H[6] === "dome")
return swDomeHouse(G, k, g, A, H);
var sh = 3.1, top = 0.5 + fl * sh;
swB(w + 0.3, 0.7, d + 0.3, "stone", 0x9A9284, 0, 0.1, 0, g);
if (H[6] === "log") {
for (var i = 0; i < Math.round(sh * fl / 0.32); i++) {
var ly = 0.6 + i * 0.32;
[[w, 0, d / 2, 0], [w, 0, -d / 2, 0], [d, w / 2, 0, 1], [d, -w / 2, 0, 1]].forEach(function (s) { var lg = swC(0.17, 0.17, s[0] + 0.6, "bark", i % 2 ? 0x7A5A3A : 0x6E5034, s[1], ly, s[2], g, 9); if (s[3])
lg.rotation.x = Math.PI / 2;
else
lg.rotation.z = Math.PI / 2; });
}
}
else
swB(w, sh * fl, d, wall[0], wall[1], 0, 0.5 + sh * fl / 2, 0, g);
if (H[6] === "plaster" && fl > 1)
for (var t = 0; t < fl; t++)
swB(w + 0.04, 0.18, d + 0.04, "wood", 0x4A3220, 0, 0.5 + t * sh + sh, 0, g);
for (var f = 0; f < fl; f++) {
var fy = 0.5 + f * sh + sh * 0.55, nw = Math.max(1, Math.round(w / 2.8));
for (var i2 = 0; i2 < nw; i2++) {
var wx = -w / 2 + (i2 + 0.5) * w / nw;
if (f === 0 && Math.abs(wx) < 1.3)
continue;
swWindow(g, wx, fy, d / 2 + 0.05, 0, 0.95, 1.3, { shutters: H[6] === "plaster" ? 0x4A6A5A : null, flowers: f === 0 || (i2 % 2 === 0), lit: (i2 + f) % 2 ? 0xFFD89A : 0 });
swWindow(g, wx, fy, -d / 2 - 0.05, Math.PI, 0.95, 1.3, {});
}
var nd = Math.max(1, Math.round(d / 3));
for (var k2 = 0; k2 < nd; k2++) {
var wz = -d / 2 + (k2 + 0.5) * d / nd;
swWindow(g, w / 2 + 0.05, fy, wz, Math.PI / 2, 0.85, 1.2, {});
swWindow(g, -w / 2 - 0.05, fy, wz, -Math.PI / 2, 0.85, 1.2, { lit: k2 % 2 ? 0xFFD89A : 0 });
}
}
var rh = H[6] === "barn" ? d * 0.55 : d * 0.62;
if (H[6] === "barn") {
var rg = swG(0, top, 0, g);
[-1, 1].forEach(function (s) { var a = swB(w + 0.8, 0.2, d * 0.36, "shingle", 0x5A4A3A, 0, d * 0.14, s * d * 0.36, rg); a.rotation.x = s * 1.0; var b = swB(w + 0.8, 0.2, d * 0.3, "shingle", 0x5A4A3A, 0, d * 0.42, s * d * 0.12, rg); b.rotation.x = s * 0.35; });
swPrism(d, d * 0.5, 0.2, "wood", 0x9A2E22, w / 2 - 0.1, 0, 0, rg, Math.PI / 2);
swPrism(d, d * 0.5, 0.2, "wood", 0x9A2E22, -w / 2 + 0.1, 0, 0, rg, Math.PI / 2);
for (var b2 = 0; b2 < 2; b2++) {
var bd = swB(1.6, 3.4, 0.1, "wood", 0xE8E0D0, (b2 ? 1 : -1) * 0.85, 2.2, d / 2 + 0.08, g);
swB(1.5, 0.12, 0.05, null, 0xE8E0D0, (b2 ? 1 : -1) * 0.85, 2.2, d / 2 + 0.15, g).rotation.z = (b2 ? 1 : -1) * 1.1;
}
var loft = swB(1.4, 1.2, 0.06, null, 0x1A1410, 0, top + 1.4, d / 2 + 0.06, g);
}
else {
swGable(g, w, d, top, rh, roof[0], roof[1], 0.55, H[6] === "brick" ? "brick" : H[6] === "stone" ? "stone" : H[6] === "log" ? "wood" : "plaster", H[6] === "brick" ? 0xA8604A : H[6] === "stone" ? 0xB8AE9C : H[6] === "log" ? 0x7A5A3A : 0xEEE4D0);
swB(0.9, rh + 1.6, 0.9, H[6] === "brick" ? "brick" : "stone", H[6] === "brick" ? 0x9A5040 : 0xA89E8C, w * 0.3, top + rh * 0.5 + 0.5, -d * 0.18, g);
swB(1.1, 0.2, 1.1, "stone", 0x6A6460, w * 0.3, top + rh + 1.35, -d * 0.18, g);
swC(0.12, 0.12, 0.4, null, 0xA0503A, w * 0.3 + 0.2, top + rh + 1.6, -d * 0.18, g, 8);
swC(0.12, 0.12, 0.4, null, 0xA0503A, w * 0.3 - 0.2, top + rh + 1.6, -d * 0.18, g, 8);
}
var dg = swDoor(g, 0, 0.45, d / 2 + 0.05, 0, 1.4, 2.35, H[8], { arch: H[6] === "stone" || H[6] === "brick" });
swHangSign(g, 1.15, 2.75, d / 2 + 0.08, 0, H[2], H[1]);
swLantern(g, -1.15, 2.4, d / 2 + 0.22);
if (H[6] !== "barn" && H[6] !== "log") {
for (var rz = 0; rz < 5; rz++)
swLeafBall(g, -w / 2 + 0.5, 0.6 + rz * 0.5, d / 2 + 0.25, 0.32, 0x3E7A2E);
for (var rr = 0; rr < 7; rr++)
swS(0.07, 0xE85A7A, -w / 2 + 0.4 + Math.sin(rr * 2) * 0.2, 0.7 + rr * 0.35, d / 2 + 0.45, g, 6);
}
swBench(g, -w / 2 + 1.4, d / 2 + 1.2, 0, 1.4, 0x7A5A3A);
swSolidIn(g, 0, 0, w + 0.6, d + 0.6, -5, top + rh + 2);
var dp = swTo(g, 0, d / 2 + 1.4);
SW_HOUSE_AT[k].door = { x: dp.x, z: dp.z, ry: A.ry };
swSpot(dp.x, dp.z, 2.6, H[1], "go in", function () { swEnterRoom(k, SW_HOUSE_AT[k].door); }, y0 + 0.5, H[2]);
return g;
},
function (G, k, g, A, H) {
var r = H[5][0] / 2;
swC(r + 0.4, r + 0.6, 0.7, "stone", 0x9A9284, 0, 0.1, 0, g, 28);
swC(r, r, 4.2, "plaster", 0xF0EEE8, 0, 2.55, 0, g, 28);
var dome = swAdd(new THREE.SphereGeometry(r + 0.15, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), swShiny(0xE8EAEE, 50), 0, 4.65, 0, g);
var slit = swB(1.2, 0.1, r + 0.3, null, 0x1A1E2A, 0, 4.65 + r * 0.55, r * 0.4, g);
slit.rotation.x = -0.9;
var tel = swC(0.25, 0.35, 2.4, null, 0x3A3A44, 0, 4.65 + r * 0.7, r * 0.3, g, 12);
tel.rotation.x = -0.9;
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.4)
continue;
swWindow(g, Math.sin(a) * (r + 0.02), 2.8, Math.cos(a) * (r + 0.02), a, 0.8, 1.2, { lit: i % 2 ? 0xC8D8F8 : 0 });
}
swDoor(g, 0, 0.45, r + 0.05, 0, 1.4, 2.35, H[8], { arch: true });
swHangSign(g, 1.15, 2.75, r + 0.08, 0, H[2], H[1]);
swRound(A.x, A.z, r + 0.5, -5, 12);
var dp = swTo(g, 0, r + 1.4);
SW_HOUSE_AT[k].door = { x: dp.x, z: dp.z, ry: A.ry };
swSpot(dp.x, dp.z, 2.6, H[1], "go in", function () { swEnterRoom(k, SW_HOUSE_AT[k].door); }, swLand(A.x, A.z) + 0.5, H[2]);
var bx = A.x + Math.sin(A.ry + 0.9) * 12, bz = A.z + Math.cos(A.ry + 0.9) * 12;
swBench(G, bx, bz, A.ry, 1.8, 0x7A5A3A).position.y = swLand(bx, bz);
return g;
},
function (G) {
var A = SW_HOUSE_AT.nature, x = A.x + Math.cos(A.ry) * 12, z = A.z - Math.sin(A.ry) * 12, y = swLand(x, z), g = swG(x, y, z, G, A.ry), w = 10, d = 8, h = 3.4;
var glass = swSee(0xD8F0E8, 0.22), frame = swMat(null, 0xF2F2EE);
swB(w, 0.3, d, "stone", 0xA8A090, 0, 0.15, 0, g);
[[w, 0, d / 2, 0], [w, 0, -d / 2, 0], [d, w / 2, 0, Math.PI / 2], [d, -w / 2, 0, Math.PI / 2]].forEach(function (s) {
var p = swB(s[0], h, 0.04, null, 0, s[1], 0.3 + h / 2, s[2], g, s[3]);
p.material = glass;
for (var i = 0; i <= Math.round(s[0] / 1.2); i++) {
var o = -s[0] / 2 + i * s[0] / Math.round(s[0] / 1.2);
var m = swB(0.07, h, 0.07, null, 0, s[3] ? s[1] : s[1] + o, 0.3 + h / 2, s[3] ? s[2] + o : s[2], g);
m.material = frame;
}
});
[-1, 1].forEach(function (s) { var rf = swB(w + 0.2, 0.04, d * 0.6, null, 0, 0, 0.3 + h + d * 0.17, s * d * 0.25, g); rf.material = glass; rf.rotation.x = s * 0.6; });
swB(w + 0.2, 0.1, 0.1, null, 0xF2F2EE, 0, 0.3 + h + d * 0.33, 0, g);
for (var b = 0; b < 10; b++) {
swLeafBall(g, -w / 2 + 1.2 + (b % 5) * 2, 0.9, (b < 5 ? -1 : 1) * (d / 2 - 1.3), 0.8, 0x3E7A2E);
for (var f = 0; f < 5; f++)
swS(0.09, [0xF07AA8, 0xF0D040, 0xB86AE0, 0xFFFFFF][f % 4], -w / 2 + 1.2 + (b % 5) * 2 + (Math.random() - 0.5), 1.2 + Math.random() * 0.6, (b < 5 ? -1 : 1) * (d / 2 - 1.3) + (Math.random() - 0.5), g, 6);
}
swSolidIn(g, 0, d / 2, w, 0.3, -5, 5);
swSolidIn(g, 0, -d / 2, w, 0.3, -5, 5);
swSolidIn(g, -w / 2, 0, 0.3, d, -5, 5);
SW.bfly = { x: x, z: z, y: y, w: w, d: d, ry: A.ry, g: g };
for (var n = 0; n < (SW.lite ? 8 : 18); n++)
SW.flies.push(swButterfly(g, (Math.random() - 0.5) * (w - 2), 1.2 + Math.random() * 1.6, (Math.random() - 0.5) * (d - 2), n));
var sg = wSign(["THE BUTTERFLY HOUSE", "walk in slowly · press E near a butterfly"], 3.2, 0.7, "#2E4A3A", "#F4EEDC");
sg.position.set(w / 2 + 0.1, 3.6, 0);
sg.rotation.y = Math.PI / 2;
g.add(sg);
},
function (g, x, y, z, n) {
var cols = [[0xF08A2A, 0x1A1A1A], [0x4A8AF0, 0x1A2A4A], [0xF4E040, 0x3A3A1A], [0xF4F4F0, 0x5A5A5A], [0xD84A8A, 0x3A1A2A], [0x8AD86A, 0x2A4A1A]], C = cols[n % cols.length];
var b = swG(x, y, z, g), wl = swG(0, 0, 0, b), wr = swG(0, 0, 0, b), wing = new THREE.CircleGeometry(0.12, 8);
wing.translate(0.11, 0, 0);
var m = new THREE.MeshLambertMaterial({ color: C[0], side: THREE.DoubleSide });
var a = swAdd(wing, m, 0, 0, 0, wl);
a.rotation.x = -Math.PI / 2;
var c = swAdd(wing, m, 0, 0, 0, wr);
c.rotation.x = -Math.PI / 2;
wr.scale.x = -1;
var body = swC(0.012, 0.012, 0.16, null, C[1], 0, 0, 0, b, 5);
body.rotation.x = Math.PI / 2;
b.userData = { wl: wl, wr: wr, hx: x, hy: y, hz: z, ph: Math.random() * 20, sp: 0.25 + Math.random() * 0.2 };
return b;
},
function (G) {
var c = SW_GREEN, y = swLand(c.x, c.z), g = swG(c.x, y, c.z, G);
var tk = swC(0.85, 1.1, 6, "bark", 0x5A4632, 0, 3, 0, g, 12);
[[0, 1], [2.1, 1], [4.2, 1], [5.3, 0.9]].forEach(function (l) { var b = swC(0.4, 0.2, 5, "bark", 0x5A4632, Math.sin(l[0]) * 1.6, 7, Math.cos(l[0]) * 1.6, g, 8); b.rotation.z = Math.cos(l[0]) * 0.5; b.rotation.x = -Math.sin(l[0]) * 0.5; });
[[0, 12, 0, 5.5], [3.6, 10.2, 1.4, 4.4], [-3.4, 10.4, -1.2, 4.4], [0.8, 9.8, -3.6, 4], [-1.2, 10, 3.6, 4]].forEach(function (b) { swLeafBall(g, b[0], b[1], b[2], b[3], 0x4A7A2E); });
swRound(c.x, c.z, 1.3, -5, 20);
var rb = swG(0, 0, 0, g);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2;
var p = swB(1.1, 0.06, 0.42, "wood", 0x8A6242, Math.sin(a) * 2.2, 0.46, Math.cos(a) * 2.2, rb, a);
swB(0.06, 0.46, 0.3, "wood", 0x6A4A32, Math.sin(a) * 2.2, 0.23, Math.cos(a) * 2.2, rb, a);
}
for (var b2 = 0; b2 < 6; b2++) {
var a2 = b2 / 6 * Math.PI * 2 + 0.5;
swBench(g, Math.sin(a2) * (c.r - 3), Math.cos(a2) * (c.r - 3), a2 + Math.PI, 1.8, 0x7A5A3A);
}
var wg = swG(10, 0, 8, g);
swC(1.1, 1.1, 0.9, "stone", 0xA89E8C, 0, 0.45, 0, wg, 18);
swC(0.9, 0.9, 0.92, null, 0x1A2A30, 0, 0.47, 0, wg, 18);
swB(0.15, 2.2, 0.15, "wood", 0x6A4A32, -0.95, 1.1, 0, wg);
swB(0.15, 2.2, 0.15, "wood", 0x6A4A32, 0.95, 1.1, 0, wg);
swGable(wg, 2.3, 1.6, 2.2, 0.7, "shingle", 0x5A4A3A, 0.15, "wood", 0x6A4A32);
swRound(c.x + 10, c.z + 8, 1.2, -5, 3);
var mg = swG(0, 0, c.r - 6, g, Math.PI);
swB(0.12, 1.2, 0.12, "wood", 0x5A3A22, -1.4, 0.6, 0, mg);
swB(0.12, 1.2, 0.12, "wood", 0x5A3A22, 1.4, 0.6, 0, mg);
var mp = swAdd(new THREE.PlaneGeometry(3.2, 2), new THREE.MeshLambertMaterial({ map: swMapTex(), side: THREE.DoubleSide }), 0, 1.6, 0, mg);
mp.rotation.x = -0.5;
swB(3.4, 0.08, 0.2, "wood", 0x5A3A22, 0, 1.2, 0.4, mg);
var mpp = swTo(mg, 0, -1.6);
swSpot(mpp.x, mpp.z, 2.4, "The picture map", "see where everything is", function () { swMapCard(); }, null, "🗺️");
for (var f = 0; f < 24; f++) {
var fa = f / 24 * Math.PI * 2;
swS(0.18, SW_FLC[f % SW_FLC.length], Math.sin(fa) * 3.3, 0.15, Math.cos(fa) * 3.3, g, 6);
}
},
function () {
return wTex(1024, 640, function (c, W, H) {
function P(x, z) { return [W / 2 + x * 1.55, H * 0.56 + z * 1.55]; }
c.fillStyle = "#E8E2C8";
c.fillRect(0, 0, W, H);
c.fillStyle = "#B8CC98";
c.fillRect(14, 14, W - 28, H - 28);
c.strokeStyle = "#5A4A32";
c.lineWidth = 8;
c.strokeRect(6, 6, W - 12, H - 12);
var L = SW_LAKE, p = P(L.x, L.z);
c.fillStyle = "#88B4C8";
c.beginPath();
c.ellipse(p[0], p[1], L.rx * 1.55, L.rz * 1.55, 0, 0, 7);
c.fill();
c.strokeStyle = "#88B4C8";
c.lineWidth = 10;
c.beginPath();
SW_STREAM.forEach(function (q, i) { var pp = P(q[0], q[1]); if (i)
c.lineTo(pp[0], pp[1]);
else
c.moveTo(pp[0], pp[1]); });
c.stroke();
c.strokeStyle = "#D8C8A0";
c.lineWidth = 6;
swPaths().forEach(function (Q) { c.beginPath(); Q.forEach(function (q, i) { var pp = P(q[0], q[1]); if (i)
c.lineTo(pp[0], pp[1]);
else
c.moveTo(pp[0], pp[1]); }); c.stroke(); });
var gp = P(SW_GREEN.x, SW_GREEN.z);
c.fillStyle = "#7AA858";
c.beginPath();
c.arc(gp[0], gp[1], SW_GREEN.r * 1.55, 0, 7);
c.fill();
if (SW_AT.sgarden) {
var sgp = P(SW_AT.sgarden.x, SW_AT.sgarden.z);
c.fillStyle = "#9AC07A";
c.beginPath();
c.arc(sgp[0], sgp[1], SW_AT.sgarden.r * 1.55, 0, 7);
c.fill();
c.strokeStyle = "#8A7A5A";
c.lineWidth = 4;
c.stroke();
c.font = "26px system-ui,'Segoe UI Emoji','Noto Color Emoji'";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillStyle = "#000";
c.fillText("🌸", sgp[0], sgp[1]);
}
c.textAlign = "center";
c.textBaseline = "middle";
SW_HOUSES.forEach(function (Hd) {
var A = SW_HOUSE_AT[Hd[0]], pp = P(A.x, A.z);
c.fillStyle = "#FFFFFF";
c.beginPath();
c.arc(pp[0], pp[1], 22, 0, 7);
c.fill();
c.strokeStyle = "#5A4A32";
c.lineWidth = 2;
c.stroke();
c.font = "26px system-ui,'Segoe UI Emoji','Noto Color Emoji'";
c.fillStyle = "#000";
c.fillText(Hd[2], pp[0], pp[1] + 1);
});
var ap = P(SW_AT.arrive.x, SW_AT.arrive.z);
c.font = "bold 20px Georgia";
c.fillStyle = "#2E3A2E";
c.fillText("★ You arrive here", ap[0], ap[1] + 22);
c.font = "bold 30px Georgia";
c.fillText("STILLWATER", W / 2, 40);
});
},
function (G) {
var A = SW_AT.arrive, sx = A.x + 3.6, sz = A.z - 4.5, y = swLand(sx, sz), g = swG(sx, y, sz, G, Math.PI - 0.55);
var st = swAdd(new THREE.CylinderGeometry(0.6, 0.85, 2.6, 7), swMat("stone", 0x9A9488), 0, 1.3, 0, g);
st.scale.z = 0.55;
var t = wTex(256, 320, function (c, W, H) {
c.fillStyle = "#9A9488";
c.fillRect(0, 0, W, H);
c.fillStyle = "#3A3A34";
c.textAlign = "center";
c.font = "bold 34px Georgia";
c.fillText("STILLWATER", W / 2, 70);
c.font = "22px Georgia";
c.fillText("a calm place", W / 2, 108);
c.font = "90px system-ui,'Segoe UI Emoji','Noto Color Emoji'";
c.fillText("🍃", W / 2, 210);
c.font = "20px Georgia";
c.fillText("take your time", W / 2, 290);
});
var face = swAdd(new THREE.PlaneGeometry(0.95, 1.2), new THREE.MeshLambertMaterial({ map: t }), 0, 1.5, -0.39, g);
face.rotation.y = Math.PI;
swRound(sx, sz, 0.9, -5, 3);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
swS(0.14, SW_FLC[i % SW_FLC.length], Math.sin(a) * 1.6, 0.12, Math.cos(a) * 1.6, g, 6);
}
},
function (G) {
var x0 = 0, z0 = -74, y = SW_LAKE.y, g = swG(x0, 0, z0, G);
for (var i = 0; i < 9; i++) {
swB(3, 0.12, 1.6, "wood", 0x8A6A4A, 0, y + 0.55, -i * 1.6, g);
swC(0.12, 0.12, 1.8, "bark", 0x5A4632, -1.4, y - 0.2, -i * 1.6, g, 8);
swC(0.12, 0.12, 1.8, "bark", 0x5A4632, 1.4, y - 0.2, -i * 1.6, g, 8);
}
swFloor(x0, z0 - 6.4, 3, 14.4, y + 0.61);
SW.jetty = { x: x0, z0: z0, z1: z0 - 13.6, y: y + 0.61 };
SW.boats = [];
for (var b = 0; b < 3; b++) {
var bx = x0 + (b % 2 ? 3.2 : -3.2), bz = z0 - 3 - b * 4;
var bt = swBoat(G, bx, y + 0.05, bz, b);
SW.boats.push(bt);
swSpot(bx + (b % 2 ? -1.4 : 1.4), bz, 2.2, "A rowing boat", "sit in and row (slowly)", (function (B) { return function () { swBoatIn(B); }; })(bt), y + 0.61, "🚣");
}
var hg = swG(-12, swLand(-12, -64), -64, G, 0.3);
swB(4, 2.6, 3, "wood", 0x6A7A8A, 0, 1.3, 0, hg);
swGable(hg, 4, 3, 2.6, 1.2, "shingle", 0x4A4A4A, 0.3, "wood", 0x6A7A8A);
swSolidIn(hg, 0, 0, 4.2, 3.2, -5, 5);
swWindow(hg, 1, 1.5, 1.55, 0, 0.7, 0.7, { lit: 0xFFD89A });
swSpot(x0, z0 - 13, 2.4, "The end of the jetty", "fish (catch and release)", function () { swFishCard(); }, y + 0.61, "🎣");
swSpot(x0 + 8, z0 + 1, 3, "The duck shore", "feed the ducks", function () { swFeedDucks(x0 + 8, z0 - 4); }, null, "🦆");
[[-16, -70, 0], [14, -72, 0], [-30, -74, 0.2], [30, -76, -0.2]].forEach(function (b) { var bb = swBench(G, b[0], b[1], Math.PI + b[2], 1.8, 0x7A5A3A); bb.position.y = swLand(b[0], b[1]); });
},
function (G, x, y, z, n) {
var g = swG(x, y, z, G), hull = swMat("wood", [0x6A8AA8, 0xA8503A, 0x5A8A5A][n % 3]), inn = swMat("wood", 0xB89A72);
var sh = new THREE.Shape();
sh.moveTo(-0.7, 1.8);
sh.quadraticCurveTo(-0.75, 0, -0.55, -1.6);
sh.lineTo(0.55, -1.6);
sh.quadraticCurveTo(0.75, 0, 0.7, 1.8);
sh.quadraticCurveTo(0, 2.3, -0.7, 1.8);
var hg = new THREE.ExtrudeGeometry(sh, { depth: 0.55, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2 });
hg.rotateX(Math.PI / 2);
hg.translate(0, 0.55, 0);
swAdd(hg, hull, 0, 0, 0, g);
var fl = swAdd(new THREE.ShapeGeometry(sh), inn, 0, 0.3, 0, g);
fl.rotation.x = -Math.PI / 2;
fl.scale.set(0.9, 0.9, 1);
swB(1.3, 0.05, 0.3, "wood", 0xB89A72, 0, 0.45, 0.3, g);
swB(1.3, 0.05, 0.3, "wood", 0xB89A72, 0, 0.45, -0.9, g);
[-1, 1].forEach(function (s) { var o = swC(0.025, 0.025, 2.4, "wood", 0xC8A878, s * 0.9, 0.55, 0.2, g, 6); o.rotation.z = s * 1.25; swB(0.02, 0.3, 0.12, "wood", 0xC8A878, s * 1.95, 0.2, 0.2, g); });
g.userData = { x: x, z: z, y: y, ry: 0, home: { x: x, z: z } };
g.rotation.y = Math.PI * 0.5 * (n % 2 ? 1 : -1);
g.userData.ry = g.rotation.y;
return g;
},
function (G) {
var i = 3, A = SW_STREAM[i], B = SW_STREAM[i + 1], x = (A[0] + B[0]) / 2, z = (A[1] + B[1]) / 2, ry = Math.atan2(B[0] - A[0], B[1] - A[1]) + Math.PI / 2, y = Math.max(swLand(x + 4, z), swLand(x - 4, z)) + 0.1;
var g = swG(x, y, z, G, ry), stone = swMat("stone", 0xA89E8C);
for (var s = 0; s < 14; s++) {
var t = s / 13, a = (t - 0.5) * Math.PI * 0.8, bx = (t - 0.5) * 12, by = Math.cos(a) * 1.2;
swB(0.9, 0.35, 2.6, "stone", 0xA89E8C, bx, by, 0, g).rotation.z = -Math.sin(a) * 0.5;
swB(0.9, 0.6, 0.25, "stone", 0x9A9080, bx, by + 0.45, 1.2, g).rotation.z = -Math.sin(a) * 0.5;
swB(0.9, 0.6, 0.25, "stone", 0x9A9080, bx, by + 0.45, -1.2, g).rotation.z = -Math.sin(a) * 0.5;
}
SW.bridge = { x: x, z: z, ry: ry, y: y };
},
function (G) {
var R = wRand(19), n = 0, max = SW.lite ? 24 : 60;
swPaths().slice(0, 8).forEach(function (P) {
var along = 0;
for (var i = 0; i < P.length - 1 && n < max; i++) {
var a = P[i], b = P[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, nz = (b[0] - a[0]) / L;
for (var s = (20 - along % 20); s < L && n < max; s += 20) {
var x = a[0] + (b[0] - a[0]) * s / L + nx * 2.4, z = a[1] + (b[1] - a[1]) * s / L + nz * 2.4;
if (swLakeE(x, z) < 1.05)
continue;
var y = swLand(x, z), g = swG(x, y, z, G);
swC(0.07, 0.1, 3.4, "metal", 0x2A2E2A, 0, 1.7, 0, g, 8);
swC(0.18, 0.18, 0.12, null, 0x2A2E2A, 0, 3.45, 0, g, 8);
var gl = swB(0.24, 0.36, 0.24, null, 0, 0, 3.7, 0, g);
gl.material = swGlowM(0xFFD8A0);
swK(0.24, 0.2, null, 0x2A2E2A, 0, 3.98, 0, g, 4);
if (!SW.lite || n % 2 === 0) {
var sp = wGlow(0xFFC880, 2.4, 0.32);
sp.position.set(0, 3.7, 0);
g.add(sp);
}
swRound(x, z, 0.18, -5, 4);
n++;
}
along += L;
}
});
},
function (G) {
var posts = [[[6, 92], [["🏡 Welcome Cottage", "welcome"], ["🧱 Hobby Lane", "bricks"], ["🌳 The green", "green"]]], [[-38, 8], [["🔭 Star Hill", "stars"], ["🍞 Bakery", "bakery"], ["📚 Library", "library"]]], [[40, -6], [["🦋 Butterflies", "nature"], ["🐴 Barn", "barn"], ["🌱 Allotments", "garden"]]], [[8, -52], [["🚣 Harbour", "harbour"], ["🗺️ Map Room", "maps"], ["🌳 The green", "green"]]]];
posts.forEach(function (P) {
var x = P[0][0], z = P[0][1], y = swLand(x, z), g = swG(x, y, z, G);
swC(0.09, 0.11, 3, "wood", 0x6A4A32, 0, 1.5, 0, g, 8);
P[1].forEach(function (arm, i) {
var tx, tz;
if (arm[1] === "green") {
tx = SW_GREEN.x;
tz = SW_GREEN.z;
}
else if (arm[1] === "harbour") {
tx = SW_AT.harbour.x;
tz = SW_AT.harbour.z;
}
else {
var H = SW_HOUSE_AT[arm[1]];
tx = H.x;
tz = H.z;
}
var a = Math.atan2(tx - x, tz - z), ag = swG(0, 2.6 - i * 0.45, 0, g, a - Math.PI / 2);
var t = wTex(256, 48, function (c, W, H) { c.fillStyle = "#F4EEDC"; c.fillRect(0, 0, W, H); c.fillStyle = "#2E3A2E"; c.font = "bold 24px system-ui,'Segoe UI Emoji','Noto Color Emoji'"; c.textBaseline = "middle"; c.fillText(arm[0], 10, H / 2 + 1); });
var b = swAdd(new THREE.PlaneGeometry(1.6, 0.3), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }), 0.85, 0, 0, ag);
swB(1.7, 0.32, 0.03, "wood", 0x6A4A32, 0.85, 0, -0.02, ag);
});
swRound(x, z, 0.2, -5, 4);
});
},
function (G) {
var A = SW_AT.allot, y = swLand(A.x, A.z), g = swG(A.x, y, A.z, G);
SW.plots = [];
for (var i = 0; i < 3; i++)
for (var j = 0; j < 4; j++) {
var px = -12 + j * 8, pz = -8 + i * 8;
swB(5.6, 0.35, 5.6, "wood", 0x6A4A32, px, 0.17, pz, g);
swB(5.2, 0.36, 5.2, null, 0x4A3624, px, 0.2, pz, g);
var mine = i === 1 && j === 1;
SW.plots.push({ x: A.x + px, z: A.z + pz, mine: mine, g: swG(px, 0.38, pz, g) });
if (!mine) {
for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++)
swLeafBall(g, px - 1.8 + c * 1.2, 0.55, pz - 1.8 + r * 1.2, 0.3, [0x4A8A3A, 0x5A9A3A, 0x3A7A2A][(i + j + r) % 3]);
}
}
var M = SW.plots.filter(function (p) { return p.mine; })[0];
SW.myPlot = M;
var sg = wSign(["YOUR PLOT", "🌱 press E to tend it"], 2, 0.5, "#3A5A2A", "#F4EEDC");
sg.position.set(M.x - A.x, 1.3, M.z - A.z + 3.1);
g.add(sg);
swSpot(M.x, M.z + 3.2, 3, "Your allotment plot", "tend it", function () { swPlotCard(); }, null, "🌱");
for (var f = 0; f < 4; f++) {
var L = f < 2 ? 34 : 26;
for (var p = 0; p <= L; p += 2.5) {
var fx = f < 2 ? -17 + p : (f === 2 ? -17 : 17), fz = f < 2 ? (f === 0 ? -13 : 13) : -13 + p;
if (f === 1 && Math.abs(fx) < 2)
continue;
swB(0.1, 0.9, 0.1, "wood", 0x8A6A4A, fx, 0.45, fz, g);
}
}
swC(0.5, 0.5, 1.1, "wood", 0x3A5A3A, -15, 0.55, 11, g, 14);
},
function (G) {
var B = SW_HOUSE_AT.barn;
var px = B.x + Math.cos(B.ry) * 16, pz = B.z - Math.sin(B.ry) * 16, g = swG(px, swLand(px, pz), pz, G, B.ry);
for (var f = 0; f < 4; f++) {
var L = 16;
for (var p = 0; p <= L; p += 2) {
var fx = f < 2 ? -8 + p : (f === 2 ? -8 : 8), fz = f < 2 ? (f === 0 ? -7 : 7) : -7 + p;
swB(0.12, 1.1, 0.12, "wood", 0xEEE6D6, fx, 0.55, fz, g);
}
var rail = swB(f < 2 ? 16 : 14, 0.08, 0.06, "wood", 0xEEE6D6, f < 2 ? 0 : (f === 2 ? -8 : 8), 0.95, f < 2 ? (f === 0 ? -7 : 7) : 0, g);
if (f >= 2)
rail.rotation.y = Math.PI / 2;
}
swSolidIn(g, 0, -7, 16, 0.3, -5, 2);
swSolidIn(g, -8, 0, 0.3, 14, -5, 2);
swSolidIn(g, 8, 0, 0.3, 14, -5, 2);
swSolidIn(g, -5, 7, 6, 0.3, -5, 2);
swSolidIn(g, 5, 7, 6, 0.3, -5, 2);
var pony = swBeast("horse", px, pz, B.ry + 1, 0.75, 7);
SW.pony = { g: pony, hx: px, hz: pz };
SW.people.push({ g: pony, wander: { r: 5, sp: 0.5 }, beast: 1 });
var pp = swTo(g, 0, 8.2);
swSpot(pp.x, pp.z, 2.6, "Clover the pony", "brush her mane", function () { swPonyCard(); }, null, "🐴");
var hx = B.x - Math.cos(B.ry) * 13, hz = B.z + Math.sin(B.ry) * 13, hg = swG(hx, swLand(hx, hz), hz, G, B.ry);
swB(2.4, 1.4, 1.6, "wood", 0xA8603A, 0, 1.0, -2, hg);
swGable(hg, 2.4, 1.6, 1.7, 0.7, "shingle", 0x5A4A3A, 0.2, "wood", 0xA8603A);
swB(0.5, 0.5, 0.06, null, 0x1A1410, 0, 0.9, -1.18, hg);
swSolidIn(hg, 0, -2, 2.6, 1.8, -5, 3);
SW.hens = [];
for (var h = 0; h < 6; h++) {
var c = swBird(hg, (h % 3 - 1) * 1.2, 0, (h < 3 ? 0.6 : 1.8), 1, h % 2 ? 0xA8582A : 0xF0EEE6, 0.12, 0xE8A030);
SW.hens.push(c);
SW.movers.push({ k: "peck", g: c, ph: h * 1.3 });
}
var hp = swTo(hg, 0, 3.2);
swSpot(hp.x, hp.z, 2.8, "The hens", "feed them, and look for eggs", function () { swHensCard(); }, null, "🐔");
for (var s = 0; s < (SW.lite ? 3 : 6); s++) {
var sx = SW_AT.meadow.x + (s % 3 - 1) * 12, sz = SW_AT.meadow.z + (s < 3 ? -6 : 8);
var sh = swBeast("sheep", sx, sz, s * 1.1, 1, 30 + s);
SW.people.push({ g: sh, wander: { r: 10, sp: 0.3 }, beast: 1 });
}
},
function (G) {
SW.ducks = [];
for (var i = 0; i < (SW.lite ? 5 : 9); i++) {
var a = i * 0.7, x = Math.sin(a) * 20 + (i % 3) * 4, z = -110 - Math.cos(a) * 12;
var d = swBird(G, x, SW_LAKE.y - 0.05, z, 1.1, i % 3 ? 0x6A5A3A : 0xF4F2EC, 0.14, 0xF0A020);
if (i % 3 === 0) {
var hd = swS(0.08, 0x2A6A3A, 0, 0.6, 0.25, d, 8);
}
SW.ducks.push({ g: d, hx: x, hz: z, tx: x, tz: z, wait: Math.random() * 6, food: null });
}
},
function (G) {
SW.folk = {};
var slot = swFolkSlot();
SW_FOLK.forEach(function (F, i) {
var where = F[5][slot], P = swFolkPlace(where);
if (P.room)
return;
var look = Object.assign({}, F[4]);
look.sex = F[2];
var p = swPerson("folk" + F[0], P.x, P.z, Math.PI, { look: look, sex: F[2], talk: swFolkTalk(F), wander: { r: 5, sp: 0.6 } });
SW.folk[F[0]] = p;
});
var extra = [["walker1", 22, 40, "m", { top: 0x6A7A5A }], ["walker2", -24, 46, "f", { top: 0xA88AB8 }], ["reader", -20, -66, "f", { top: 0x5A6A8A }], ["dogwalker", 30, 70, "m", { top: 0x8A5A3A }]];
extra.forEach(function (E, i) { var p = swPerson(E[0], E[1], E[2], i, { look: Object.assign({ sex: E[3] }, E[4]), sex: E[3], wander: { r: 9, sp: 0.55 } }); });
try {
var dog = swBeast("dog", 32, 72, 0, 0.8, 9);
SW.people.push({ g: dog, wander: { r: 9, sp: 0.6 }, beast: 1 });
}
catch (e) { }
},
function (G) {
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[stillwater] " + name, e);
} }
var join = function (g) { if (g && g.isObject3D && typeof ctnMerge === "function")
ctnMerge(g); };
SW_HOUSES.forEach(function (H) { step("house " + H[0], function () { join(swHouse(G, H[0])); }); });
step("green", function () { swJoined(G, swGreen); });
step("arrival", function () { swJoined(G, swArrival); });
step("harbour", function () { swHarbour(G); });
step("bridge", function () { swJoined(G, swBridge); });
step("lamps", function () { swJoined(G, swLampPosts); });
step("signposts", function () { swJoined(G, swSignposts); });
step("allotments", function () { swAllotments(G); });
step("animals", function () { swAnimals(G); });
step("ducks", function () { swDucks(G); });
step("butterflies", function () { swButterflyHouse(G); });
step("villagers", function () { swVillagers(G); });
},
function (R) {
R.spot = function (lx, lz, r, name, verb, fn, icon) { return swSpot(R.x + lx, lz, r, name, verb, fn, 0, icon); };
R.solid = function (lx, lz, w, d, y1) { return swSolid(R.x + lx, lz, w, d, -5, y1 === undefined ? 3 : y1); };
R.round = function (lx, lz, r) { return swRound(R.x + lx, lz, r, -5, 3); };
R.person = function (seed, lx, lz, ry, o) { return swPerson(seed, R.x + lx, lz, ry, o, R.D, 0); };
},
function (R, g) {
var w = R.w, d = R.d, h = R.h || 3.3, W = R.wall || ["plaster", 0xEEE6D4], F = R.floor || ["wood", 0x9A7452];
var fk = F[0] === "wood" ? (R.boards || "oak") : F[0] === "floortile" ? "cotto" : null;
if (fk)
swRB(w, 0.2, d, fk, swMix(F[1], 0xFFFFFF, 0.25), 0, -0.1, 0, g);
else
swB(w, 0.2, d, F[0], F[1], 0, -0.1, 0, g);
swB(w, 0.2, d, R.ceilKind || "plaster", R.ceil || 0xF2EADC, 0, h + 0.1, 0, g);
var wk = R.wallRich || (W[0] === "plaster" ? "stucco" : W[0] === "stone" ? "ashlar" : null), wall = function (a, b, c, x, y, z) { return wk ? swRB(a, b, c, wk, W[1], x, y, z, g) : swB(a, b, c, W[0], W[1], x, y, z, g); };
wall(w + 0.4, h, 0.3, 0, h / 2, -d / 2 - 0.15);
wall(w + 0.4, h, 0.3, 0, h / 2, d / 2 + 0.15);
wall(0.3, h, d, -w / 2 - 0.15, h / 2, 0);
wall(0.3, h, d, w / 2 + 0.15, h / 2, 0);
if (R.beams !== false)
for (var b = 0; b < Math.floor(w / 2); b++)
swRB(0.2, 0.24, d, "oak", 0x5A3E2A, -w / 2 + 1 + b * 2, h - 0.12, 0, g);
var sk = 0x5A3E2A;
swB(w, 0.16, 0.05, null, sk, 0, 0.08, -d / 2 + 0.03, g);
swB(0.05, 0.16, d, null, sk, -w / 2 + 0.03, 0.08, 0, g);
swB(0.05, 0.16, d, null, sk, w / 2 - 0.03, 0.08, 0, g);
swB(w, 0.16, 0.05, null, sk, 0, 0.08, d / 2 - 0.03, g);
var wc = R.winCol || 0xF4DCB8, nw = R.win === undefined ? Math.max(1, Math.round(d / 4)) : R.win;
R.wins = [];
for (var i = 0; i < nw; i++) {
var wz = -d / 2 + (i + 0.5) * d / nw;
[-1, 1].forEach(function (s) { if (R.winSide && R.winSide !== s)
return; var ry = s > 0 ? -Math.PI / 2 : Math.PI / 2; swWindowIn(g, s * (w / 2 - 0.02), 1.7, wz, ry, 1.1, 1.4, wc); R.wins.push({ x: s * (w / 2 - 0.02), y: 1.7, z: wz, ry: ry, w: 1.1, h: 1.4 }); });
}
var dg = swG(0, 0, d / 2 - 0.05, g, Math.PI);
swRB(1.4, 2.3, 0.12, "oak", 0x6A4228, 0, 1.15, 0, dg);
swRB(1.7, 0.18, 0.2, "oak", 0x4A2E1A, 0, 2.38, 0, dg);
swRB(0.12, 2.3, 0.2, "oak", 0x4A2E1A, -0.76, 1.15, 0, dg);
swRB(0.12, 2.3, 0.2, "oak", 0x4A2E1A, 0.76, 1.15, 0, dg);
for (var pn = 0; pn < 4; pn++)
swRB(0.5, 0.85, 0.03, "oak", 0x7A5232, (pn % 2 ? 0.3 : -0.3), pn < 2 ? 0.6 : 1.65, -0.07, dg);
swS(0.05, 0xC8A048, 0.5, 1.1, -0.1, dg, 10).material = swRM("brass", 0xD8B060);
swFloor(R.x, 0, w - 0.6, d - 0.6, 0, true);
R.spot(0, d / 2 - 1, 1.9, "The door", "go back outside", function () { swLeaveRoom(R); }, "🚪");
var nl = Math.max(1, Math.round(w * d / 40));
for (var l = 0; l < nl; l++) {
var lx = -w / 2 + (l + 0.5) * w / nl;
var pend = swG(lx, h - 0.05, 0, g);
swC(0.01, 0.01, 0.6, null, 0x2A2A2A, 0, -0.3, 0, pend, 4);
var sh = swAdd(new THREE.CylinderGeometry(0.12, 0.32, 0.26, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8DCC0, side: THREE.DoubleSide, emissive: new THREE.Color(0x5A4A2A) }), 0, -0.7, 0, pend);
var bulb = swS(0.06, 0, 0, -0.74, 0, pend, 8);
bulb.material = swGlowM(0xFFE8C0);
}
},
function (k) {
var R = SW_ROOMS[k];
if (!R)
return null;
if (!R.g) {
var g = new THREE.Group();
g.position.set(R.x, 0, 0);
SW.G.add(g);
R.g = g;
R.D = new THREE.Group();
SW.G.add(R.D);
swRoomKit(R);
try {
swShell(R, g);
if (R.f)
R.f(R, g);
if (R.more)
R.more(R, g);
}
catch (e) {
if (window.console)
console.warn("[stillwater] room " + k, e);
}
try {
if (typeof swRich === "function")
swRich(R, g);
}
catch (e) {
if (window.console)
console.warn("[stillwater] dress " + k, e);
}
try {
if (typeof ctnMerge === "function" && !R.noMerge)
ctnMerge(g);
}
catch (e) { }
var L = new THREE.PointLight(R.lightCol || 0xFFE4C0, R.light || 0.85, Math.max(R.w, R.d) * 1.5, 2);
L.position.set(0, (R.h || 3.3) - 0.6, 0);
g.add(L);
if (!SW.lite && R.env !== "dome" && R.light2 !== false) {
var L2 = new THREE.PointLight(0xFFC890, (R.light || 0.85) * 0.45, Math.max(R.w, R.d) * 1.1, 2);
L2.position.set(-R.w * 0.3, 1.6, R.d * 0.2);
g.add(L2);
}
swRoomFolk(R);
}
return R;
},
function (R) {
var slot = swFolkSlot();
SW_FOLK.forEach(function (F) {
if (F[5][slot] !== R.k && !(R.k === "welcome" && F[0] === "host"))
return;
if (R.folkAt === undefined)
return;
var look = Object.assign({}, F[4]);
look.sex = F[2];
R.person("folk" + F[0] + "_in", R.folkAt[0], R.folkAt[1], R.folkAt[2] || 0, { look: look, sex: F[2], talk: swFolkTalk(F) });
});
},
function (k, D) {
var R = swRoomGet(k);
if (!R)
return;
swVeil(0.5, function () {
if (D)
R.door = D;
SW.room = R;
swShowOnly(R);
camera.position.set(SW.base + R.x, 1.72, R.d / 2 - 2);
yaw = 0;
pitch = 0;
if (R.onEnter)
try {
R.onEnter(R);
}
catch (e) {
if (window.console)
console.warn("[stillwater] enter " + k, e);
}
var H = swHouseDef(k);
setStatus((H ? H[2] : "🚪") + " <b>" + esc(H ? H[1] : k) + ".</b> " + (R.say || ""));
swSay((H ? H[1] : "") + ". " + (R.say || ""));
swAmbRoom(R);
});
},
function (D) {
swVeil(0.5, function () {
SW.room = null;
swShowOnly(null);
var x = D ? D.x : SW_AT.arrive.x, z = D ? D.z : SW_AT.arrive.z;
var fx = D ? Math.sin(D.ry || 0) : 0, fz = D ? Math.cos(D.ry || 0) : 1;
camera.position.set(SW.base + x, swGround(x, z, 1e4) + 1.72, z);
yaw = Math.atan2(-fx, -fz);
pitch = 0;
if (SW.under)
swUnderFill(x, z);
swAmbRoom(null);
});
},
function (R, g, lx, lz, ry, name, verb, fn, icon, dress) {
var t = swTable(g, lx, lz, 1.8, 0.9, SW_WOOD, { ry: ry || 0, mat: 0x3A5A4A });
swStool(g, lx + Math.sin(ry || 0) * 0.75, lz + Math.cos(ry || 0) * 0.75);
swLamp(t, 0.7, 0.82, -0.25);
if (dress)
try {
dress(t);
}
catch (e) { }
R.solid(lx, lz, (ry ? 0.9 : 1.8) + 0.1, (ry ? 1.8 : 0.9) + 0.1, 1);
return R.spot(lx + Math.sin(ry || 0) * 1.2, lz + Math.cos(ry || 0) * 1.2, 1.7, name, verb, fn, icon);
},
function (R, g) {
swFireplace(g, 0, -4.2, 0);
swRug(g, 0, -1.6, 3.6, 2.4, 0x6A8A6A, 0xF0E6C8);
swArmchair(g, -1.7, -2.2, 0.5, 0x7A8A9A);
swArmchair(g, 1.7, -2.2, -0.5, 0xA88A6A);
swTable(g, 0, -1.1, 1.2, 0.7, SW_WOOD, { h: 0.45 });
swC(0.08, 0.06, 0.12, null, 0xF4F0E8, 0.2, 0.53, -1.1, g, 10);
var bd = swG(-5.85, 1.6, -1.6, g, Math.PI / 2);
swB(2.2, 1.3, 0.05, null, 0xB89A6A, 0, 0, 0, bd);
swB(2.34, 1.44, 0.04, "wood", SW_DARK, 0, 0, -0.02, bd);
for (var i = 0; i < 3; i++)
swB(0.55, 0.7, 0.02, null, 0xF8F4EA, -0.7 + i * 0.7, 0, 0.04, bd);
R.spot(-4.8, -1.6, 1.8, "The Today board", "choose today's three things", function () { swTodayCard(); }, "📋");
var mp = swAdd(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshLambertMaterial({ map: swMapTex() }), 5.84, 1.7, -1, g);
mp.rotation.y = -Math.PI / 2;
R.spot(4.8, -1, 1.8, "The picture map", "see where everything is", function () { swMapCard(); }, "🗺️");
swShelf(g, -4.6, 3.6, Math.PI, 1.8, 1.9, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 4; q++)
swS(0.08, [0xC8A86A, 0x6A8AC8, 0xC86A6A, 0x6AC88A][(q + j) % 4], x0 + 0.2 + q * 0.4, y + 0.1, 0, s, 10); });
R.spot(-4.6, 2.6, 1.8, "Your shelf", "see what you've made", function () { swShelfCard(); }, "🗄️");
swTable(g, 4.6, 3, 0.8, 0.6, SW_WOOD);
swLeafBall(g, 4.6, 0.95, 3, 0.16, 0x5A9A4A);
R.spot(4.6, 2.2, 1.6, "Calm settings", "change sound, light and how many people you see", function () { swCalmCard(); }, "🍃");
swPlant(g, -5.3, -3.9);
swPlant(g, 5.3, -3.9, 1.2);
R.onEnter = function () { var C = swCfg(); if (C.notice)
setTimeout(function () { setStatus("📌 <b>On the board:</b> " + esc(C.notice)); swSay("On the board: " + C.notice); }, 1800); };
},
function (R, g) {
swRug(g, 0, 0, 4, 3, 0x8A9AAA, 0xDCE4E8);
var ch = swArmchair(g, -1.2, -1.5, 0.4, 0x6A7A9A);
for (var i = 0; i < 6; i++)
swB(0.9, 0.04, 0.6, null, [0x9AA8C8, 0xA8B8D8][i % 2], -1.2, 0.56 + i * 0.012, -1.4, g);
R.spot(-1.2, -0.6, 1.6, "The big soft chair (with a weighted blanket)", "sit and rest", function () { swSitQuiet(R); }, "🛋️");
var tk = swG(2.6, 0, -2.8, g);
swB(1.6, 0.8, 0.6, "wood", SW_DARK, 0, 0.4, 0, tk);
var gl = swB(1.5, 0.8, 0.5, null, 0, 0, 1.2, 0, tk);
gl.material = swSee(0x8AD8C8, 0.35);
var wat = swB(1.44, 0.68, 0.44, null, 0, 0, 1.16, 0, tk);
wat.material = new THREE.MeshBasicMaterial({ color: 0x3A8A8A, transparent: true, opacity: 0.35 });
swB(1.44, 0.06, 0.44, null, 0xD8C8A0, 0, 0.83, 0, tk);
for (var p = 0; p < 5; p++)
swLeafBall(tk, -0.6 + p * 0.3, 0.95, -0.1, 0.08, 0x3A8A4A).scale.set(0.5, 2.4, 0.5);
SW.fish = [];
for (var f = 0; f < 6; f++) {
var fs = swG(0, 1.15, 0, tk), b = swS(0.05, [0xF08A3A, 0xF4D040, 0x5AA8F0][f % 3], 0, 0, 0, fs, 8);
b.scale.set(1, 0.7, 2);
var tl = swK(0.04, 0.06, null, [0xF08A3A, 0xF4D040, 0x5AA8F0][f % 3], 0, 0, -0.1, fs, 4);
tl.rotation.x = Math.PI / 2;
SW.fish.push({ g: fs, ph: f * 1.1, r: 0.45 + f * 0.03, y: 1.0 + f * 0.05 });
}
var lg = swLight(0x8AE8D8, 0.3, 3, 0, 1.4, 0, tk, true);
R.spot(2.6, -1.9, 1.5, "The fish tank", "watch the fish", function () { swWatchFish(); }, "🐠");
swTable(g, -2.6, 2, 0.7, 0.6, SW_WOOD);
var bl = swS(0.18, 0, -2.6, 1.05, 2, g, 16);
bl.material = new THREE.MeshBasicMaterial({ color: 0xBFE0F0, transparent: true, opacity: 0.85 });
bl.userData.keep = 1;
var bg = wGlow(0xBFE0F0, 1.2, 0.35);
bg.position.set(-2.6, 1.05, 2);
g.add(bg);
SW.breath = { m: bl, glow: bg };
R.noMerge = false;
R.spot(-2.6, 1.2, 1.5, "The breathing light", "breathe with it", function () { swBreathe(); }, "🫧");
R.amb = "rain";
},
function (R, g) {
var ov = swG(0, 0, -3.6, g);
swB(3, 2.2, 1, "brick", 0xA8604A, 0, 1.1, 0, ov);
var mouth = swAdd(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16, 1, false, 0, Math.PI), swGlowM(0xE8803A), 0, 0.9, 0.45, ov);
mouth.rotation.x = Math.PI / 2;
mouth.rotation.z = Math.PI / 2;
swLight(0xFF9A50, 0.5, 5, 0, 1, 0.8, ov);
swShelf(g, -4.6, 0, Math.PI / 2, 3, 1.8, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 5; q++) {
var l = swS(0.12, 0xC8904A, x0 + 0.2 + q * 0.5, y + 0.1, 0, s, 10);
l.scale.set(1.4, 0.8, 1);
} });
R.solid(-4.6, 0, 0.4, 3);
swBenchAt(R, g, 0, 0.2, 0, "The big table and the recipe card", "bake bread", function () { swBakeCard(); }, "🍞", function (t) { swC(0.18, 0.2, 0.12, null, 0xE8E0D0, -0.3, 0.86, 0, t, 14); swS(0.12, 0xF0E6D0, 0.2, 0.88, 0, t, 10); });
R.spot(0, -2.2, 1.6, "The oven", "", function () { setStatus("🍞 The oven is warm, never hot to touch here. Bake at the big table: the card shows each step."); }, "🔥");
},
function (R, g) {
[-4.6, -1.6, 1.6, 4.6].forEach(function (x) { swShelf(g, x, -4.1, 0, 2.6, 2.4, SW_DARK, swBooks); });
R.solid(0, -4.1, 12, 0.5);
swShelf(g, -5.6, 1.5, Math.PI / 2, 3, 2.2, SW_DARK, swBooks);
R.solid(-5.6, 1.5, 0.5, 3);
swRug(g, 0, -1.2, 4, 2.6, 0x8A5A4A, 0xE8D8B0);
swArmchair(g, 0, -2.5, 0, 0xA85A4A);
for (var i = 0; i < 5; i++) {
var a = (i - 2) * 0.4;
swStool(g, Math.sin(a) * 1.6, -0.6 + Math.cos(a) * 0.4, 0x8A6242);
}
R.spot(0, -1.2, 2, "The story chair", "hear a story read aloud", function () { swStoryCard(); }, "📖");
swBenchAt(R, g, 3.8, 1.8, -Math.PI / 2, "The sorting tables", "sort shells, buttons and leaves", function () { swSortCard("library"); }, "🐚", function (t) { for (var q = 0; q < 20; q++)
swS(0.03, [0xF4E8D8, 0xC88A5A, 0x5A8AC8, 0xC85A5A][q % 4], (Math.random() - 0.5) * 1.4, 0.83, (Math.random() - 0.5) * 0.6, t, 6); });
},
function (R, g) {
var mb = swG(0, 0, -1.6, g);
for (var i = 0; i < 10; i++) {
swB(0.16, 0.04, 0.7 - i * 0.035, "wood", 0xA87A4A, -0.9 + i * 0.2, 0.8, 0, mb);
swC(0.04, 0.04, 0.3, null, 0xB8B8C0, -0.9 + i * 0.2, 0.6, 0, mb, 6);
}
swB(2.2, 0.06, 0.9, "wood", SW_DARK, 0, 0.55, 0, mb);
var ch = swG(2.6, 0, -2.2, g);
swB(1.4, 0.06, 0.06, "wood", SW_DARK, 0, 2.2, 0, ch);
for (var c = 0; c < 8; c++)
swC(0.03, 0.03, 0.8 - c * 0.06, "metal", 0xD8D0B8, -0.6 + c * 0.17, 1.8, 0, ch, 8);
swB(0.06, 2.2, 0.06, "wood", SW_DARK, -0.7, 1.1, 0, ch);
swB(0.06, 2.2, 0.06, "wood", SW_DARK, 0.7, 1.1, 0, ch);
R.solid(0, -1.6, 2.3, 1);
R.spot(0, -0.6, 1.8, "The marimba, the chimes and the harp", "play", function () { swMusicPanel(); }, "🎵");
for (var h = 0; h < 3; h++) {
var hp = swG(-3.8, 1.6, -1 + h * 0.5, g, Math.PI / 2);
var band = swAdd(new THREE.TorusGeometry(0.1, 0.015, 6, 14, Math.PI), swMat(null, 0x2A2A2A), 0, 0, 0, hp);
swS(0.05, 0x3A3A3A, -0.1, 0, 0, hp, 8);
swS(0.05, 0x3A3A3A, 0.1, 0, 0, hp, 8);
}
R.spot(-3.2, -0.5, 1.5, "The headphones", "put them on (everything goes quiet)", function () { swHeadphones(); }, "🎧");
},
function (R, g) {
for (var i = 0; i < 6; i++) {
var b = swB(1.2, 0.6, 0.8, null, 0xD8C070, -6 + i * 1.3, 0.3, -4.2, g);
if (i % 2)
swB(1.2, 0.6, 0.8, null, 0xD8C070, -5.4 + i * 1.3, 0.9, -4.2, g);
}
R.solid(-2.5, -4.2, 8, 1);
[-1, 1].forEach(function (s) { for (var p = 0; p < 3; p++)
swB(0.12, 1.3, 0.12, "wood", SW_DARK, s * 5 + p * 0.9 - 0.9, 0.65, 1, g); swB(2, 0.1, 0.08, "wood", SW_DARK, s * 5, 1.1, 1, g); });
swB(1.4, 0.5, 0.6, "wood", SW_WOOD, 4.4, 0.25, -4.2, g);
swS(0.06, 0xF4EEE0, 4.2, 0.55, -4.2, g, 8);
swS(0.06, 0xC8A07A, 4.45, 0.55, -4.15, g, 8);
R.spot(4.4, -3.2, 1.6, "The egg basket", "see the eggs you've found", function () { var d = swData(); setStatus("🥚 You have collected <b>" + (d.f.eggs || 0) + "</b> eggs. The hens lay a few each day: look in the coop outside."); }, "🥚");
try {
var cat = swBeast("cat", R.x - 3, -3.6, 0.6, 0.6, 4, R.D, 1.25);
}
catch (e) { }
swRug(g, 0, 0, 0.1, 0.1, 0x8A7A5A);
},
function (R, g) {
for (var t = 0; t < 2; t++) {
var tx = -3 + t * 6;
swTable(g, tx, -0.5, 2.2, 1.2, SW_WOOD, { cloth: 0xE8DCC0 });
for (var c = 0; c < 4; c++) {
var a = c / 4 * Math.PI * 2;
swChair(g, tx + Math.sin(a) * 1.4, -0.5 + Math.cos(a) * 1.0, a + Math.PI);
}
R.solid(tx, -0.5, 2.3, 1.3, 1);
}
R.spot(-3, 0.8, 1.8, "The memory-match table", "play picture pairs (alone or taking turns)", function () { swMatchCard(); }, "🃏");
R.spot(3, 0.8, 1.8, "The picture bingo table", "play picture bingo", function () { swBingoCard(); }, "🎱");
swB(4, 0.5, 1.5, "wood", SW_DARK, 0, 0.25, -3.6, g);
for (var b = 0; b < 6; b++)
swB(0.6, 0.4, 0.02, null, [0xC85A5A, 0x5A8AC8, 0xE8C04A, 0x6AB86A, 0xA86AC8, 0xE88A3A][b], -5 + b * 2, 3.2, -4.38, g);
},
function (R, g) {
swShelf(g, -2.9, -1, Math.PI / 2, 2.4, 1.8, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 6; q++)
swB(0.14, 0.2, 0.04, null, [0xE8B04A, 0x6AA84A, 0xC85A5A, 0xA86AC8][q % 4], x0 + 0.15 + q * 0.35, y + 0.12, 0, s); });
R.solid(-2.9, -1, 0.5, 2.6);
for (var c = 0; c < 3; c++) {
var can = swG(1.5 + c * 0.6, 0, -2.4, g);
swC(0.15, 0.17, 0.3, "metal", [0x5A8A5A, 0x8AA8C8, 0xC8A04A][c], 0, 0.15, 0, can, 12);
var sp = swC(0.02, 0.03, 0.35, "metal", 0x5A8A5A, 0.2, 0.3, 0, can, 6);
sp.rotation.z = -0.9;
}
var tb = swG(0.6, 0, 0.6, g);
swB(2, 0.08, 1, "wood", SW_WOOD, 0, 0.86, 0, tb);
[[-0.9, -0.4], [0.9, -0.4], [-0.9, 0.4], [0.9, 0.4]].forEach(function (l) { swB(0.08, 0.86, 0.08, "wood", SW_DARK, l[0], 0.43, l[1], tb); });
R.solid(0.6, 0.6, 2.1, 1.1);
for (var t = 0; t < 3; t++) {
swB(0.5, 0.08, 0.34, null, 0x5A3A22, -0.6 + t * 0.6, 0.94, 0, tb);
for (var sd = 0; sd < 6; sd++)
swC(0.02, 0.01, 0.08, null, 0x5AA84A, -0.78 + t * 0.6 + (sd % 3) * 0.16, 1.02, -0.08 + (sd > 2 ? 0.16 : 0), tb, 5);
}
for (var pt = 0; pt < 5; pt++) {
swC(0.12, 0.09, 0.2, null, 0xB8683A, -2.6 + pt * 0.42, 0.1, 2.5, g, 10);
swC(0.1, 0.1, 0.02, null, 0x4A3020, -2.6 + pt * 0.42, 0.2, 2.5, g, 10);
var lf = swC(0.06, 0.01, 0.18, null, 0x4A9A3A, -2.6 + pt * 0.42, 0.3, 2.5, g, 6);
}
for (var sk = 0; sk < 2; sk++) {
swC(0.28, 0.24, 0.6, null, 0xC8B48A, 2.6, 0.3, 1.4 + sk * 0.7, g, 8);
}
R.solid(2.6, 1.75, 0.7, 1.5);
var cal = swB(1, 0.8, 0.02, null, 0xF4EEDC, 0, 1.7, -2.96, g);
for (var m = 0; m < 12; m++)
swB(0.2, 0.14, 0.01, null, [0x6AB86A, 0xE8C04A, 0xC85A5A][m % 3], -0.36 + (m % 4) * 0.24, 1.96 - Math.floor(m / 4) * 0.2, -2.94, g);
var hk = swG(-1.4, 0, -2.9, g);
[0, 1, 2].forEach(function (i) { var tl = swB(0.04, 1.1, 0.04, "wood", SW_WOOD, i * 0.3, 0.9, 0, hk); tl.rotation.z = 0.05 * (i - 1); swB(0.2, 0.24, 0.02, "metal", 0x8A8A8A, i * 0.3, 0.3, 0, hk); });
R.spot(1.5, -1.5, 1.7, "The seed shelf and the watering cans", "go and tend your plot", function () { swPlotCard(); }, "🌱");
},
function (R, g) {
swBenchAt(R, g, -3, -1.5, 0, "The potter's wheel", "shape a pot", function () { swPotteryBench(); }, "🏺", swDressClay);
var kl = swG(4, 0, -3.4, g);
swB(1.6, 1.8, 1.2, "brick", 0x9A5A4A, 0, 0.9, 0, kl);
swC(0.2, 0.2, 1.2, "brick", 0x8A4A3A, 0, 2.4, 0, kl, 10);
var kd = swB(0.6, 0.6, 0.04, null, 0, 0, 0.9, 0.62, kl);
kd.material = swGlowM(0xC86A3A);
R.solid(4, -3.4, 1.8, 1.4);
swShelf(g, 5.6, 1, -Math.PI / 2, 3, 2, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 5; q++) {
var pot = swC(0.08, 0.06, 0.2, null, [0xC8A07A, 0x6A8AA8, 0xA85A4A, 0xE8E0D0][(q + j) % 4], x0 + 0.2 + q * 0.5, y + 0.12, 0, s, 12);
} });
R.solid(5.6, 1, 0.5, 3.1);
swBenchAt(R, g, -2.5, 2.2, 0, "The whittling bench", "carve wood (or stone)", function () { swSculptBench("wood"); }, "🪵", function (t) { swB(0.3, 0.1, 0.1, "wood", 0xC8A47A, 0, 0.86, 0, t); });
},
function (R, g) {
var sp = wPoints(SW.lite ? 260 : 700, function () { var a = Math.random() * 6.283, e = Math.random() * 1.4; return [Math.cos(a) * Math.cos(e) * 5.6, 3.3 + Math.sin(e) * 2.0, Math.sin(a) * Math.cos(e) * 5.6]; }, 0xF4F0FF, 0.05, true);
g.add(sp);
var o = swG(0, 0, 0, g);
swC(0.5, 0.7, 0.9, "wood", SW_DARK, 0, 0.45, 0, o, 20);
swC(0.06, 0.06, 0.8, "metal", 0xC8A048, 0, 1.3, 0, o, 8);
var sun = swS(0.28, 0, 0, 1.75, 0, o, 20);
sun.material = swGlowM(0xFFD070);
var sg = wGlow(0xFFC060, 1.6, 0.4);
sg.position.set(0, 1.75, 0);
o.add(sg);
SW.orrery = [];
[[0.55, 0.05, 0xB8A898, 4.1], [0.85, 0.08, 0xE8C890, 1.6], [1.2, 0.085, 0x4A8AE8, 1], [1.55, 0.065, 0xC85A3A, 0.53], [2.1, 0.18, 0xD8B888, 0.084], [2.6, 0.15, 0xE8D8A8, 0.034]].forEach(function (p, i) {
var arm = swG(0, 1.75, 0, o);
swB(p[0], 0.012, 0.012, "metal", 0xC8A048, p[0] / 2, 0, 0, arm);
var pl = swS(p[1], p[2], p[0], 0, 0, arm, 14);
if (i === 5) {
var rg = swAdd(new THREE.RingGeometry(p[1] * 1.4, p[1] * 2.2, 24), new THREE.MeshLambertMaterial({ color: 0xD8C8A0, side: THREE.DoubleSide }), p[0], 0, 0, arm);
rg.rotation.x = -1.2;
}
SW.orrery.push({ g: arm, sp: p[3] * 0.08 });
});
R.round(0, 0, 1);
R.spot(0, 1.6, 2, "The orrery", "learn about the planets", function () { swPlanets(); }, "🪐");
var tl = swG(0, 0, -4.4, g);
swC(0.05, 0.08, 1.4, "wood", SW_DARK, 0, 0.7, 0, tl, 8);
var tube = swC(0.12, 0.16, 1.8, "metal", 0xC8A048, 0, 1.6, 0.2, tl, 14);
tube.rotation.x = -0.7;
R.spot(0, -3.4, 1.7, "The great telescope", "look at the stars", function () { swStarCard(); }, "🔭");
},
function (R, g) {
[-4, 0, 4].forEach(function (x, i) { swCabinet(g, x, -4, 0, 2.4, 2, SW_DARK, 0xE0F0E8); for (var q = 0; q < 12; q++)
swS(0.04, [0x3A6AC8, 0xE8B04A, 0x5A9A3A, 0xC85A5A, 0xE8E0D0][q % 5], x - 0.9 + (q % 6) * 0.36, 0.6 + Math.floor(q / 6) * 0.5, -3.8, g, 6); });
R.solid(0, -4, 12, 0.6);
swBenchAt(R, g, -2.6, 1.2, 0, "The sorting table", "sort and label the collection", function () { swSortCard("nature"); }, "🦋", function (t) { for (var q = 0; q < 12; q++)
swS(0.04, [0x3A6AC8, 0xE8B04A, 0x5A9A3A][q % 3], (Math.random() - 0.5) * 1.4, 0.83, (Math.random() - 0.5) * 0.6, t, 6); });
var mg = swG(2.8, 0, 1.2, g);
swTable(mg, 0, 0, 1.2, 0.8, SW_WOOD);
var lens = swC(0.12, 0.12, 0.02, null, 0, 0, 1.15, 0, mg, 20);
lens.material = swSee(0xE0F0FF, 0.4);
lens.rotation.x = 1.2;
R.spot(2.8, 2.2, 1.6, "The magnifying glass", "look closely at a butterfly's wing", function () { swMagnify(); }, "🔍");
},
function (R, g) {
var gl = swG(-3.2, 0, -2, g);
swC(0.08, 0.4, 0.9, "wood", SW_DARK, 0, 0.45, 0, gl, 10);
var ring = swAdd(new THREE.TorusGeometry(0.66, 0.03, 8, 40), swMat("metal", 0xC8A048), 0, 1.55, 0, gl);
ring.rotation.y = 0.4;
var tex = null;
try {
tex = new THREE.TextureLoader().load("assets/stillwater/world.jpg");
}
catch (e) { }
var globe = swAdd(new THREE.SphereGeometry(0.6, 32, 20), tex ? new THREE.MeshLambertMaterial({ map: tex }) : swMat(null, 0x4A7AA8), 0, 1.55, 0, gl);
globe.rotation.z = 0.41;
globe.userData.keep = 1;
SW.globe = globe;
R.round(-3.2, -2, 0.7);
R.spot(-3.2, -1, 1.6, "The great globe", "spin it and learn about a place", function () { swGlobeCard(); }, "🌍");
var st = swG(1.6, 0, 0.2, g);
swB(2.6, 0.85, 1.8, "wood", SW_DARK, 0, 0.42, 0, st);
swB(2.4, 0.1, 1.6, null, 0xD8C49A, 0, 0.88, 0, st);
R.solid(1.6, 0.2, 2.7, 1.9, 1);
R.spot(1.6, 1.6, 1.8, "The sand table", "shape hills, rivers and lakes", function () { swSandTable(); }, "🏝️");
swBenchAt(R, g, -3, 2.4, Math.PI / 2, "The map desk", "draw your own map", function () { swPaintPanel("map"); }, "🗺️", function (t) { swB(0.6, 0.01, 0.45, null, 0xF0E6CC, 0, 0.82, 0, t); });
},
function (R, g) {
swFireplace(g, 0, -3.3, 0);
swRug(g, 0, -1.2, 3.4, 2.2, 0xA85A5A, 0xF0E2C8);
swArmchair(g, -1.4, -1.6, 0.5, 0xA86A6A);
swArmchair(g, 1.4, -1.6, -0.5, 0x6A8AA8);
var bk = swG(-1.4, 0, -0.6, g);
swC(0.22, 0.18, 0.25, "wood", 0xA8804A, 0, 0.12, 0, bk, 12);
for (var y = 0; y < 4; y++)
swS(0.08, [0xC84A5A, 0x4A8AC8, 0xE8C84A, 0x6AB86A][y], (y - 1.5) * 0.08, 0.28, 0, bk, 8);
R.spot(-1.4, -0.4, 1.8, "Your knitting basket", "knit, crochet or cross-stitch", function () { swKnitCard(); }, "🧶");
var rk = swG(3.6, 0, 1.2, g, -Math.PI / 2);
swB(0.06, 1.7, 0.06, "wood", SW_DARK, -0.8, 0.85, 0, rk);
swB(0.06, 1.7, 0.06, "wood", SW_DARK, 0.8, 0.85, 0, rk);
swB(1.7, 0.05, 0.05, "wood", SW_DARK, 0, 1.7, 0, rk);
SW.knitRack = rk;
},
function (R, g) {
var T = swG(0, 0, -0.6, g);
R.tbl = T;
swB(10.4, 0.12, 6.2, "wood", SW_WOOD, 0, 0.86, 0, T);
for (var i = 0; i < 6; i++) {
var lx = (i % 3 - 1) * 4.8, lz = (i < 3 ? -1 : 1) * 2.9;
swB(0.12, 0.86, 0.12, "wood", SW_DARK, lx, 0.43, lz, T);
}
R.solid(0, -0.6, 10.5, 6.3, 1.2);
swBenchAt(R, g, -6.6, 3.6, Math.PI / 2, "The control desk", "lay track, choose trains, add scenery", function () { swTrainCard(); }, "🚂", function (t) { swB(0.5, 0.12, 0.3, null, 0x2A3A2A, 0, 0.88, 0, t); swC(0.04, 0.04, 0.1, null, 0xC83A2A, 0.1, 0.98, 0, t, 8); });
R.spot(0, 3.2, 1.8, "The end of the table", "ride in the engine's cab", function () { swCabRide(); }, "🪟");
for (var p = 0; p < 4; p++) {
var t = wTex(200, 140, function (c, W, H) {
c.fillStyle = ["#E8DCC0", "#D8E4E8", "#E8E0D0", "#E0E8D8"][p];
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A2A2A";
c.fillRect(40, 70, 110, 34);
c.fillRect(130, 48, 30, 56);
c.fillRect(55, 52, 16, 20);
c.beginPath();
[60, 95, 130].forEach(function (x) { c.moveTo(x + 12, 108); c.arc(x, 108, 12, 0, 7); });
c.fill();
c.fillStyle = "#7A7A7A";
c.beginPath();
c.arc(60, 40, 10, 0, 7);
c.arc(80, 30, 14, 0, 7);
c.fill();
});
swFrame(g, -7.85, 2.2, -3 + p * 2.2, Math.PI / 2, 1.2, 0.84, t);
}
R.onEnter = function () { swTrainsBuild(R); };
},
function (R, g) {
swBenchAt(R, g, -2.5, -1.6, 0, "The model bench", "build and paint a kit", function () { swModelCard(); }, "✈️", swDressPaint);
swBenchAt(R, g, 2.5, -1.6, 0, "The second bench", "build and paint a kit", function () { swModelCard(); }, "🚗", swDressPaint);
swCabinet(g, -4.6, 3.2, Math.PI, 2.4, 2, SW_DARK);
swCabinet(g, -1.8, 3.2, Math.PI, 2.4, 2, SW_DARK);
R.solid(-3.2, 3.2, 5.4, 0.6, 2.2);
R.disp = { x: -3.2, z: 3.0, ry: Math.PI, kind: "model" };
swShelf(g, 5.6, 1, -Math.PI / 2, 3, 2.2, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 5; q++)
swB(0.5, 0.18, 0.3, null, [0xC83A2A, 0x2A6AC8, 0xE8E0D0, 0x3A9A4A, 0xF0C030][(q + j) % 5], x0 + 0.3 + q * 0.55, y + 0.1, 0, s); });
R.solid(5.6, 1, 0.5, 3.1);
var pl = swG(0, 3.2, 1, g);
swC(0.08, 0.06, 1.2, null, 0xE8E0D0, 0, 0, 0, pl, 10).rotation.x = Math.PI / 2;
swB(1.6, 0.02, 0.24, null, 0xC83A2A, 0, 0, 0.1, pl);
swB(0.6, 0.02, 0.16, null, 0xC83A2A, 0, 0, -0.5, pl);
SW.movers.push({ k: "swing", g: pl, ph: 0 });
R.onEnter = function () { swDisplayRefresh(R); };
},
function (R, g) {
swBenchAt(R, g, 0, -1.4, 0, "The painting desk with the magnifying lamp", "paint a figure", function () { swFigureCard(); }, "🖌️", function (t) { swDressPaint(t); var lp = swG(-0.6, 0.82, -0.3, t); swC(0.02, 0.02, 0.6, "metal", 0x8A8A8A, 0, 0.3, 0, lp, 6); var lens = swC(0.14, 0.14, 0.03, null, 0, 0.1, 0.62, 0.1, lp, 20); lens.material = swSee(0xE8F0FF, 0.4); lens.rotation.x = 1; });
swShelf(g, -4.2, 1, Math.PI / 2, 3, 2, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 6; q++)
swC(0.05, 0.05, 0.12, null, [0x8A8A8A, 0xC8A048, 0x5A8A5A][(q + j) % 3], x0 + 0.2 + q * 0.42, y + 0.08, 0, s, 8); });
R.solid(-4.2, 1, 0.5, 3.1);
R.disp = { x: 3.4, z: 2.6, ry: -Math.PI / 2, kind: "figure" };
swCabinet(g, 3.8, 2.2, -Math.PI / 2, 2, 1.8, SW_DARK);
R.solid(3.8, 2.2, 0.6, 2.1);
R.onEnter = function () { swDisplayRefresh(R); };
},
function (R, g) {
swBenchAt(R, g, -3.2, -1.6, 0, "The clay stand", "sculpt in clay", function () { swSculptBench("clay"); }, "🗿", function (t) { swS(0.15, 0xA87A5A, 0, 0.98, 0, t, 14); });
swBenchAt(R, g, 0.6, -1.6, 0, "The stone block", "carve soft stone", function () { swSculptBench("stone"); }, "🪨", function (t) { swB(0.3, 0.3, 0.3, "stone", 0xD8D0C0, 0, 1.0, 0, t); });
swBenchAt(R, g, 4, -1.6, 0, "The whittling block", "whittle wood", function () { swSculptBench("wood"); }, "🪵", function (t) { swC(0.12, 0.12, 0.4, "wood", 0xC8A47A, 0, 1.05, 0, t, 12); });
swBenchAt(R, g, -3, 2.4, 0, "The potter's wheel", "throw a pot", function () { swPotteryBench(); }, "🏺", swDressClay);
for (var p = 0; p < 3; p++) {
var pg = swG(2 + p * 1.4, 0, 3.3, g);
swC(0.22, 0.25, 1.1, "marble", 0xE8E4DC, 0, 0.55, 0, pg, 14);
var hd = swS(0.18, 0xEAE6DE, 0, 1.32, 0, pg, 16);
hd.scale.set(0.85, 1.1, 0.95);
swC(0.08, 0.1, 0.14, null, 0xEAE6DE, 0, 1.12, 0, pg, 10);
R.round(2 + p * 1.4, 3.3, 0.3);
}
},
function (R, g) {
var ez = swG(-4.4, 0, -2.8, g, 0.3);
[-1, 1].forEach(function (s) { var l = swC(0.025, 0.025, 1.9, "wood", SW_PALE, s * 0.35, 0.95, 0, ez, 6); l.rotation.z = s * 0.18; });
var bl = swC(0.025, 0.025, 1.9, "wood", SW_PALE, 0, 0.9, -0.4, ez, 6);
bl.rotation.x = 0.3;
var cv = swB(0.8, 0.6, 0.03, null, 0xF8F6F0, 0, 1.35, 0.06, ez);
swB(0.9, 0.04, 0.1, "wood", SW_PALE, 0, 1.03, 0.08, ez);
R.spot(-4, -1.8, 1.7, "The easel", "paint a picture (or copy a famous one)", function () { swPaintPanel("easel"); }, "🎨");
swBenchAt(R, g, -1, -2.6, 0, "The mosaic table", "lay mosaic tiles", function () { swGridCraft("mosaic"); }, "🟦", function (t) { for (var q = 0; q < 30; q++)
swB(0.05, 0.02, 0.05, null, [0x3A6AC8, 0xE8B04A, 0xC85A5A, 0x5A9A5A, 0xF4F0E8][q % 5], (Math.random() - 0.5) * 1.4, 0.83, (Math.random() - 0.5) * 0.6, t); });
swBenchAt(R, g, 3, -2.6, 0, "The stained-glass window", "colour the glass", function () { swGridCraft("glass"); }, "🪟", function (t) { var gp = swB(0.6, 0.6, 0.02, null, 0, 0, 1.15, -0.3, t); gp.material = swSee(0xE8A0C0, 0.6); });
swBenchAt(R, g, -1, 2.2, 0, "The bead table", "thread a bead pattern", function () { swGridCraft("beads"); }, "📿", function (t) { for (var q = 0; q < 24; q++)
swS(0.025, [0xE85A6A, 0x5AA8E8, 0xF4D040, 0x6AC86A, 0xF4F0F0, 0xA86AE0][q % 6], (Math.random() - 0.5) * 1.2, 0.84, (Math.random() - 0.5) * 0.5, t, 6); });
var lm = swG(3.4, 0, 2.4, g);
swB(1.4, 0.1, 0.1, "wood", SW_DARK, 0, 0.9, -0.4, lm);
swB(1.4, 0.1, 0.1, "wood", SW_DARK, 0, 0.9, 0.4, lm);
swB(0.1, 0.9, 0.9, "wood", SW_DARK, -0.7, 0.45, 0, lm);
swB(0.1, 0.9, 0.9, "wood", SW_DARK, 0.7, 0.45, 0, lm);
for (var w = 0; w < 14; w++)
swB(0.04, 0.01, 0.8, null, [0xC84A5A, 0xE8C84A, 0x4A8AC8][Math.floor(w / 5) % 3], -0.6 + w * 0.09, 0.95, 0, lm);
R.solid(3.4, 2.4, 1.5, 1);
R.spot(3.4, 3.4, 1.6, "The loom", "weave", function () { swGridCraft("weave"); }, "🧵");
R.disp = { kind: "gallery" };
R.onEnter = function () { swGalleryRefresh(R, g); };
swShelf(g, 6.6, 0, -Math.PI / 2, 3, 1.4, SW_WOOD, function (s, x0, W, y, j) { for (var q = 0; q < 8; q++)
swC(0.04, 0.04, 0.12, null, [0xC83A2A, 0x2A6AC8, 0xF0C030, 0x3A9A4A][q % 4], x0 + 0.15 + q * 0.34, y + 0.08, 0, s, 8); });
R.solid(6.6, 0, 0.5, 3.1);
},
function (R, g) {
swBenchAt(R, g, -2.6, -1.6, 0, "The building table", "build with bricks", function () { swBuildCard("bricks"); }, "🧱", swDressBricks);
swBenchAt(R, g, 2.6, -1.6, 0, "The second table", "build with bricks", function () { swBuildCard("bricks"); }, "🧱", swDressBricks);
for (var t = 0; t < 12; t++) {
var tx = -5 + t * 0.9;
swB(0.8, 0.14, 0.4, null, 0xE8E4DC, tx, 1.2, -4.6, g);
for (var q = 0; q < 6; q++)
swB(0.08, 0.06, 0.08, null, SW_BRICKCOLS[t % SW_BRICKCOLS.length][0], tx - 0.25 + (q % 3) * 0.25, 1.31, -4.6 + (q < 3 ? -0.08 : 0.08), g);
}
R.solid(0, -4.6, 12, 0.5, 1.5);
swB(4, 0.8, 2, "wood", SW_DARK, 0, 0.4, 2.8, g);
R.solid(0, 2.8, 4.1, 2.1, 1);
R.disp = { x: 0, z: 2.8, y: 0.82, kind: "bricks", scale: 0.04 };
R.onEnter = function () { swDisplayRefresh(R); };
},
function (R, g) {
swBenchAt(R, g, 0, -1.6, 0, "The log table", "build a log cabin", function () { swBuildCard("logs"); }, "🪵", function (t) { for (var q = 0; q < 10; q++) {
var l = swC(0.025, 0.025, 0.3 + q % 3 * 0.1, "wood", 0xA87A4A, (q % 5 - 2) * 0.25, 0.84, (q < 5 ? -0.2 : 0.15), t, 8);
l.rotation.z = Math.PI / 2;
} });
swB(3, 0.8, 1.6, "wood", SW_DARK, 0, 0.4, 2.6, g);
R.solid(0, 2.6, 3.1, 1.7, 1);
R.disp = { x: 0, z: 2.6, y: 0.82, kind: "logs", scale: 0.06 };
swFireplace(g, -4.3, 0, Math.PI / 2);
R.solid(-4.3, 0, 0.6, 2);
R.onEnter = function () { swDisplayRefresh(R); };
},
function (R, g) {
swBenchAt(R, g, -2, -1.6, 0, "The block table", "build with wooden blocks", function () { swBuildCard("blocks"); }, "🧸", function (t) { for (var q = 0; q < 12; q++)
swB(0.08, 0.08, 0.08, "wood", [0xE8C890, 0xC85A4A, 0x4A7AC8, 0x5A9A5A][q % 4], (q % 6 - 2.5) * 0.2, 0.86, (q < 6 ? -0.15 : 0.15), t); });
swBenchAt(R, g, 2.4, -1.6, 0, "The domino floor", "set up a domino run", function () { swBuildCard("dominoes"); }, "🀄", function (t) { for (var q = 0; q < 12; q++)
swB(0.02, 0.1, 0.05, null, 0xF4F0E8, -0.6 + q * 0.1, 0.87, Math.sin(q * 0.6) * 0.2, t); });
swRug(g, 0, 2, 3.6, 2.2, 0x5A8AA8, 0xF0E6C8);
R.disp = { x: 0, z: 2, y: 0.02, kind: "blocks", scale: 0.08 };
R.onEnter = function () { swDisplayRefresh(R); };
},
function (R, g) {
for (var t = 0; t < 3; t++) {
var tx = -3.6 + t * 3.6;
swBenchAt(R, g, tx, -0.6, 0, "A puzzle table", "do a jigsaw puzzle", function () { swPuzzleCard(); }, "🧩", function (tb) { for (var q = 0; q < 16; q++) {
var p = swB(0.07, 0.01, 0.07, null, [0x3A5AA8, 0xE8C04A, 0x5A8A4A, 0xC8603A][q % 4], (Math.random() - 0.5) * 1.2, 0.825, (Math.random() - 0.5) * 0.5, tb);
p.rotation.y = Math.random();
} });
}
R.onEnter = function () { swPuzzleWall(R, g); };
},
function (col, kind, sh) {
var k = "toy|" + col + "|" + (kind || "paint");
if (SW_MATS[k])
return SW_MATS[k];
var m = new THREE.MeshPhongMaterial({ color: col, shininess: sh || (kind === "metal" ? 90 : kind === "rubber" ? 8 : 70), specular: kind === "rubber" ? 0x111111 : 0x666666 });
m.userData.realKind = kind || "paint";
m.userData.realSoft = 1;
m.userData.ldShared = 1;
return (SW_MATS[k] = m);
},
function () {
var S = SW.lite ? 512 : 1024;
return swTexOnce("board", S, Math.round(S * 0.6), function (c, W, H) {
var r = wRand(31);
c.fillStyle = "#5E8E42";
c.fillRect(0, 0, W, H);
for (var i = 0; i < (SW.lite ? 900 : 2600); i++) {
var x = r() * W, y = r() * H, s = 4 + r() * W * 0.05, g = r();
c.fillStyle = g < 0.33 ? "rgba(110,160,70,0.20)" : g < 0.66 ? "rgba(70,110,45,0.20)" : "rgba(140,170,80,0.14)";
c.beginPath();
c.ellipse(x, y, s, s * 0.6, r() * 3, 0, 7);
c.fill();
}
for (var j = 0; j < (SW.lite ? 3000 : 9000); j++) {
c.fillStyle = ["#4E7E36", "#7AAE52", "#689A44", "#8AB45C"][j % 4];
c.fillRect(r() * W, r() * H, 1.2, 2.4);
}
for (var f = 0; f < (SW.lite ? 160 : 420); f++) {
c.fillStyle = ["#F4E8A0", "#F0F0F0", "#D8A0D8", "#F0C060"][f % 4];
var fx = r() * W, fy = r() * H;
for (var q = 0; q < 5; q++)
c.fillRect(fx + (r() - 0.5) * 8, fy + (r() - 0.5) * 8, 1.6, 1.6);
}
});
},
function () {
return swTexOnce("skyback", SW.lite ? 1024 : 2048, SW.lite ? 128 : 256, function (c, W, H) {
var r = wRand(9), g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#8EB8DE");
g.addColorStop(0.62, "#CFE2EE");
g.addColorStop(1, "#E8EEE4");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
var x = r() * W, y = H * (0.12 + r() * 0.32), s = H * (0.07 + r() * 0.09);
c.fillStyle = "rgba(255,255,255,0.55)";
for (var q = 0; q < 7; q++) {
c.beginPath();
c.arc(x + (q - 3) * s * 0.7, y + Math.sin(q) * s * 0.25, s * (0.6 + r() * 0.5), 0, 7);
c.fill();
}
}
[["#8AA6A8", 0.62, 0.1], ["#6E9468", 0.74, 0.14], ["#557E4A", 0.86, 0.1]].forEach(function (L, li) {
c.fillStyle = L[0];
c.beginPath();
c.moveTo(0, H);
for (var x = 0; x <= W; x += 8) {
var y = H * L[1] - Math.sin(x / W * Math.PI * (5 + li * 3) + li) * H * L[2] - Math.sin(x / W * Math.PI * 17 + li * 2) * H * 0.03;
c.lineTo(x, y);
}
c.lineTo(W, H);
c.fill();
if (li === 2)
for (var t = 0; t < 220; t++) {
var tx = r() * W, ty = H * L[1] - Math.sin(tx / W * Math.PI * (5 + li * 3) + li) * H * L[2] - Math.sin(tx / W * Math.PI * 17 + li * 2) * H * 0.03;
c.fillStyle = t % 3 ? "#3E6A38" : "#4A7A40";
c.beginPath();
c.arc(tx, ty, H * 0.02 + r() * H * 0.02, 0, 7);
c.fill();
}
});
});
},
function () {
return swTexOnce("spoke", 128, 128, function (c, W, H) {
c.fillStyle = "#262626";
c.fillRect(0, 0, W, H);
c.translate(64, 64);
c.fillStyle = "#FFFFFF";
c.beginPath();
c.arc(0, 0, 63, 0, 7);
c.arc(0, 0, 52, 0, 7, true);
c.fill();
for (var i = 0; i < 12; i++) {
c.save();
c.rotate(i * Math.PI / 6);
c.fillRect(-3, 0, 6, 54);
c.restore();
}
c.beginPath();
c.arc(0, 0, 14, 0, 7);
c.fill();
c.fillStyle = "#8A8A8A";
c.beginPath();
c.arc(0, 0, 6, 0, 7);
c.fill();
c.fillStyle = "#FFFFFF";
c.beginPath();
c.ellipse(0, 40, 9, 14, 0, 0, 7);
c.fill();
});
},
function (col) {
var hex = "#" + ("000000" + col.toString(16)).slice(-6);
return swTexOnce("coach" + col, 512, 96, function (c, W, H) {
c.fillStyle = hex;
c.fillRect(0, 0, W, H);
c.fillStyle = "#EDE2C4";
c.fillRect(0, 10, W, 36);
c.fillStyle = "#C8A048";
c.fillRect(0, 48, W, 2);
c.fillRect(0, 8, W, 1.5);
for (var i = 0; i < 9; i++) {
var x = 18 + i * 54;
c.fillStyle = "#3A2A1A";
c.fillRect(x - 2, 14, 40, 30);
var g = c.createLinearGradient(0, 16, 0, 42);
g.addColorStop(0, "#FFE8B8");
g.addColorStop(1, "#E8B878");
c.fillStyle = g;
c.fillRect(x, 16, 36, 26);
c.fillStyle = "rgba(120,70,40,0.55)";
c.fillRect(x, 16, 36, 5);
c.fillStyle = "rgba(60,40,30,0.5)";
c.fillRect(x + 4, 30, 10, 12);
c.fillRect(x + 22, 32, 10, 10);
}
c.strokeStyle = "rgba(0,0,0,0.45)";
c.lineWidth = 2;
[6, W / 2 - 4, W - 12].forEach(function (x) { c.strokeRect(x, 8, 10, 80); });
c.fillStyle = "rgba(0,0,0,0.25)";
c.fillRect(0, H - 8, W, 8);
});
},
function (col) {
var hex = "#" + ("000000" + col.toString(16)).slice(-6);
return swTexOnce("plank" + col, 128, 64, function (c, W, H) {
c.fillStyle = hex;
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(0,0,0,0.35)";
c.lineWidth = 1.5;
for (var y = 8; y < H; y += 9) {
c.beginPath();
c.moveTo(0, y);
c.lineTo(W, y);
c.stroke();
}
c.lineWidth = 3;
c.strokeStyle = "rgba(0,0,0,0.45)";
c.beginPath();
c.moveTo(4, 2);
c.lineTo(W / 2, H - 2);
c.lineTo(W - 4, 2);
c.stroke();
c.strokeRect(2, 2, W - 4, H - 4);
});
},
function (col) {
var hex = "#" + ("000000" + col.toString(16)).slice(-6);
return swTexOnce("grille" + col, 256, 64, function (c, W, H) {
c.fillStyle = hex;
c.fillRect(0, 0, W, H);
for (var p = 0; p < 4; p++) {
var x = 22 + p * 58;
c.fillStyle = "rgba(0,0,0,0.5)";
c.fillRect(x, 14, 40, 30);
c.fillStyle = "rgba(255,255,255,0.12)";
for (var y = 16; y < 44; y += 4)
c.fillRect(x + 2, y, 36, 1.4);
}
c.fillStyle = "rgba(255,255,255,0.25)";
c.fillRect(0, 52, W, 3);
c.fillStyle = "rgba(0,0,0,0.3)";
c.fillRect(0, H - 5, W, 5);
});
},
function (w, h, len, rad, mat, p, y, z) {
var s = new THREE.Shape(), a = w / 2;
rad = Math.min(rad, a, h);
s.moveTo(-a, 0);
s.lineTo(a, 0);
s.lineTo(a, h - rad);
s.quadraticCurveTo(a, h, a - rad, h);
s.lineTo(-a + rad, h);
s.quadraticCurveTo(-a, h, -a, h - rad);
s.lineTo(-a, 0);
var g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false, curveSegments: 6 });
g.translate(0, 0, -len / 2);
return swAdd(g, mat, 0, y || 0, z || 0, p);
},
function (p, r, col, x, y, z, spoke) {
var g = swG(x, y, z, p), tyre = swC(r, r, 0.016, null, 0, 0, 0, 0, g, 18);
tyre.material = swToyM(0x2A2A2C, "metal");
tyre.rotation.z = Math.PI / 2;
var fm = spoke ? swMapM("spoke" + col, swSpokeTex(), col) : swToyM(col, "metal");
[-1, 1].forEach(function (s) { var f = swAdd(new THREE.CircleGeometry(r * 0.92, 18), fm, s * 0.0085, 0, 0, g); f.rotation.y = s * Math.PI / 2; });
g.traverse(function (o) { if (o.isMesh)
o.userData.keep = 1; });
return g;
},
function (g, z, dir, beamCol) { swB(0.19, 0.035, 0.012, null, 0, 0, 0.075, z, g).material = swToyM(beamCol || 0xB8302A); [-0.06, 0.06].forEach(function (x) { var b = swC(0.011, 0.011, 0.03, null, 0, x, 0.075, z + dir * 0.018, g, 8); b.material = swToyM(0x1A1A1E, "metal"); b.rotation.x = Math.PI / 2; var h = swC(0.016, 0.016, 0.004, null, 0, x, 0.075, z + dir * 0.034, g, 10); h.material = swToyM(0xB8B8B8, "metal"); h.rotation.x = Math.PI / 2; }); },
function (p, E) {
var g = swG(0, 0, 0, p), body = swToyM(E.col), trim = swToyM(E.trim, E.trim === 0x1E1E22 || E.trim === 0x2A2A2A ? "paint" : "metal"), blk = swToyM(0x1A1A1E, "paint", 30), brass = swToyM(0xC8A048, "metal"), lamp = swGlowM(0xFFF0C8);
g.userData.rods = [];
g.userData.ang = 0;
if (E.kind === "diesel" || E.kind === "stream") {
var L = E.kind === "stream" ? 0.62 : 0.56;
swB(0.17, 0.03, L - 0.02, null, 0, 0, 0.065, 0, g).material = blk;
var bd = swProfile(0.18, 0.17, L - 0.08, 0.05, body, g, 0.08, 0);
if (E.kind === "stream") {
var nose = swS(0.09, 0, 0, 0.165, L / 2 - 0.04, g, 18);
nose.material = body;
nose.scale.set(1, 0.95, 1.6);
var tail = swS(0.09, 0, 0, 0.165, -L / 2 + 0.04, g, 18);
tail.material = body;
tail.scale.set(1, 0.95, 0.9);
swB(0.185, 0.018, L - 0.1, null, 0, 0, 0.14, 0, g).material = trim;
swB(0.11, 0.035, 0.02, null, 0, 0, 0.205, L / 2 - 0.005, g).material = swSee(0x1A2A3A, 0.85);
}
else {
swB(0.182, 0.012, L - 0.08, null, 0, 0, 0.115, 0, g).material = trim;
[-1, 1].forEach(function (e) { swB(0.18, 0.06, 0.006, null, 0, 0, 0.2, e * (L / 2 - 0.04 + 0.003), g).material = swSee(0x1A2A3A, 0.85); swB(0.18, 0.05, 0.008, null, 0, 0, 0.12, e * (L / 2 - 0.036), g).material = swToyM(0xF0C020); swBuffers(g, e * (L / 2 - 0.01), e, 0x2A2A2A); });
}
var gt = swMapM("grille" + E.col, swGrilleTex(E.col));
[-1, 1].forEach(function (s) { swPanel2(L - 0.18, 0.07, gt, s * 0.0905, 0.16, 0, g, s * Math.PI / 2); });
for (var f = 0; f < 3; f++) {
var fan = swC(0.035, 0.035, 0.01, null, 0, 0, 0.255, -0.12 + f * 0.12, g, 14);
fan.material = swToyM(0x3A3A3E, "metal");
}
var hl = swS(0.012, 0, 0, 0.13, L / 2 - 0.03, g, 8);
hl.material = lamp;
hl.position.z = L / 2 + (E.kind === "stream" ? 0.06 : -0.03);
swBogie(g, L / 2 - 0.13, 0x2A2A2C);
swBogie(g, -L / 2 + 0.13, 0x2A2A2C);
g.userData.len = L;
g.userData.steam = false;
swJoinToy(g);
return g;
}
var tank = E.kind === "tank";
swB(0.15, 0.05, 0.5, null, 0, 0, 0.06, 0, g).material = blk;
swB(0.2, 0.008, 0.48, null, 0, 0, 0.105, 0.01, g).material = blk;
swBuffers(g, 0.255, 1, 0xB8302A);
swBuffers(g, -0.255, -1, 0xB8302A);
var boiler = swC(0.072, 0.072, 0.3, null, 0, 0, 0.18, 0.04, g, 24);
boiler.material = body;
boiler.rotation.x = Math.PI / 2;
[0.13, 0.05, -0.03, -0.1].forEach(function (z) { var b = swC(0.0735, 0.0735, 0.006, null, 0, 0, 0.18, z, g, 24); b.material = brass; b.rotation.x = Math.PI / 2; });
var sb = swC(0.076, 0.076, 0.07, null, 0, 0, 0.18, 0.215, g, 24);
sb.material = blk;
sb.rotation.x = Math.PI / 2;
swB(0.17, 0.09, 0.07, null, 0, 0, 0.11, 0.215, g).material = blk;
var door = swC(0.06, 0.064, 0.01, null, 0, 0, 0.18, 0.252, g, 24);
door.material = swToyM(0x2A2A2E, "metal");
door.rotation.x = Math.PI / 2;
var hd = swC(0.004, 0.004, 0.03, null, 0, 0, 0.18, 0.258, g, 6);
hd.material = brass;
swC(0.022, 0.026, 0.07, null, 0, 0, 0.285, 0.215, g, 14).material = blk;
swC(0.03, 0.024, 0.014, null, 0, 0, 0.322, 0.215, g, 14).material = blk;
var dm = swC(0.03, 0.034, 0.03, null, 0, 0, 0.255, 0.06, g, 16);
dm.material = tank ? body : brass;
var dt = swS(0.03, 0, 0, 0.27, 0.06, g, 14);
dt.material = tank ? body : brass;
dt.scale.y = 0.7;
swC(0.01, 0.013, 0.03, null, 0, 0, 0.26, -0.06, g, 10).material = brass;
swC(0.004, 0.004, 0.03, null, 0, 0.02, 0.27, -0.1, g, 6).material = brass;
[-1, 1].forEach(function (s) { var c = swC(0.032, 0.032, 0.09, null, 0, s * 0.085, 0.07, 0.18, g, 14); c.material = body; c.rotation.x = Math.PI / 2; var cv = swC(0.034, 0.034, 0.006, null, 0, s * 0.085, 0.07, 0.228, g, 14); cv.material = brass; cv.rotation.x = Math.PI / 2; });
if (tank) {
[-1, 1].forEach(function (s) { swB(0.05, 0.11, 0.24, null, 0, s * 0.07, 0.165, 0.02, g).material = body; swB(0.052, 0.008, 0.242, null, 0, s * 0.07, 0.222, 0.02, g).material = brass; });
swB(0.17, 0.08, 0.1, null, 0, 0, 0.14, -0.22, g).material = body;
}
var cz = -0.16;
[-1, 1].forEach(function (s) { swB(0.008, 0.17, 0.13, null, 0, s * 0.092, 0.19, cz, g).material = body; var w = swB(0.002, 0.05, 0.05, null, 0, s * 0.097, 0.235, cz + 0.02, g); w.material = swGlowM(0xFFC878); swB(0.004, 0.058, 0.058, null, 0, s * 0.096, 0.235, cz + 0.02, g).material = brass; });
swB(0.19, 0.17, 0.008, null, 0, 0, 0.19, cz + 0.065, g).material = body;
[-0.045, 0.045].forEach(function (x) { swB(0.04, 0.04, 0.002, null, 0, x, 0.24, cz + 0.07, g).material = swGlowM(0xFFC878); });
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 16, 1, true, -0.7, 1.4), blk);
roof.rotation.x = Math.PI / 2;
roof.rotation.z = 0;
roof.position.set(0, 0.135, cz);
g.add(roof);
var wr = 0.044, axles = [0.11, 0.0, -0.11];
if (tank)
axles = [0.1, -0.01, -0.12];
[-1, 1].forEach(function (s) {
axles.forEach(function (z) { swWheelsOf(g).push({ g: swWheel(g, wr, E.col === 0x1E1E22 ? 0xB8302A : E.col, s * 0.083, wr, z, true), r: wr }); });
swWheelsOf(g).push({ g: swWheel(g, 0.024, 0x2A2A2C, s * 0.075, 0.024, 0.2, true), r: 0.024 });
var rod = swB(0.006, 0.008, 0.24, null, 0, s * 0.094, wr, -0.005, g);
rod.material = swToyM(0xC8CCD0, "metal");
rod.userData.keep = 1;
g.userData.rods.push({ m: rod, y: wr, z: -0.005, c: 0.018 });
var con = swB(0.005, 0.007, 0.13, null, 0, s * 0.098, 0.06, 0.13, g);
con.material = swToyM(0xC8CCD0, "metal");
con.userData.keep = 1;
g.userData.rods.push({ m: con, y: 0.06, z: 0.12, c: 0.009 });
});
[-0.05, 0.05].forEach(function (x) { swB(0.018, 0.022, 0.014, null, 0, x, 0.105, 0.255, g).material = blk; var l = swS(0.007, 0, x, 0.106, 0.263, g, 8); l.material = lamp; });
[-1, 1].forEach(function (s) { var hr = swC(0.003, 0.003, 0.26, null, 0, s * 0.078, 0.215, 0.07, g, 5); hr.material = brass; hr.rotation.x = Math.PI / 2; });
g.userData.len = tank ? 0.54 : 0.52;
g.userData.steam = true;
swJoinToy(g);
return g;
},
function (p, E) {
var g = swG(0, 0, 0, p), body = swToyM(E.col), blk = swToyM(0x1A1A1E, "paint", 30), brass = swToyM(0xC8A048, "metal");
swB(0.15, 0.04, 0.3, null, 0, 0, 0.055, 0, g).material = blk;
swProfile(0.18, 0.13, 0.28, 0.012, body, g, 0.08, 0);
swB(0.182, 0.008, 0.282, null, 0, 0, 0.205, 0, g).material = brass;
swB(0.182, 0.008, 0.282, null, 0, 0, 0.12, 0, g).material = brass;
var r = wRand(3);
for (var i = 0; i < 26; i++) {
var c = swS(0.022 + r() * 0.012, 0, (r() - 0.5) * 0.13, 0.2 + r() * 0.035, (r() - 0.5) * 0.2 + 0.02, g, 5);
c.material = swToyM(0x18181A, "paint", 90);
}
swBuffers(g, -0.15, -1, 0xB8302A);
[-1, 1].forEach(function (s) { [0.08, -0.08].forEach(function (z) { swWheelsOf(g).push({ g: swWheel(g, 0.032, 0x2A2A2C, s * 0.083, 0.032, z, true), r: 0.032 }); }); });
g.userData.len = 0.3;
swJoinToy(g);
return g;
},
function (p, kind, n) {
var g = swG(0, 0, 0, p), blk = swToyM(0x1A1A1E, "paint", 30), L = 0.36;
if (kind === "coach") {
L = 0.5;
var c = [0x6E2224, 0x2A4A2A, 0x2A3A62][n % 3];
swB(0.14, 0.035, L - 0.02, null, 0, 0, 0.065, 0, g).material = blk;
swProfile(0.18, 0.15, L - 0.02, 0.03, swToyM(c), g, 0.085, 0);
var side = swMapM("coachside" + c, swCoachTex(c));
[-1, 1].forEach(function (s) { swPanel2(L - 0.04, 0.075, side, s * 0.0905, 0.165, 0, g, s * Math.PI / 2); });
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, L, 18, 1, false, -0.62, 1.24), swToyM(0x8A8A8E, "paint", 30));
roof.rotation.x = Math.PI / 2;
roof.position.set(0, 0.112, 0);
g.add(roof);
for (var v = 0; v < 4; v++)
swC(0.008, 0.008, 0.012, null, 0, 0, 0.248, -0.18 + v * 0.12, g, 6).material = blk;
[-1, 1].forEach(function (e) { swB(0.1, 0.12, 0.02, null, 0, 0, 0.16, e * (L / 2 - 0.005), g).material = swToyM(0x2A2A2C); swBuffers(g, e * (L / 2 - 0.004), e, 0x1A1A1E); });
swBogie(g, L / 2 - 0.1);
swBogie(g, -L / 2 + 0.1);
}
else {
var t = kind === "mixed" ? ["van", "tank", "open", "logs"][n % 4] : kind;
swB(0.15, 0.03, L - 0.02, null, 0, 0, 0.06, 0, g).material = blk;
[-1, 1].forEach(function (e) { swBuffers(g, e * (L / 2 - 0.004), e, 0x1A1A1E); });
if (t === "van" || t === "brake") {
var col = t === "brake" ? 0x7A3A2A : [0x7A4A2E, 0x8A6A4A, 0x5A6A7A][n % 3];
swProfile(0.17, 0.14, L - 0.06, 0.01, swToyM(col, "wood"), g, 0.075, 0);
var pk = swMapM("plank" + col, swPlankTex(col));
[-1, 1].forEach(function (s) { swPanel2(L - 0.08, 0.13, pk, s * 0.0855, 0.145, 0, g, s * Math.PI / 2); });
var vr = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, L - 0.04, 16, 1, false, -0.6, 1.2), swToyM(0xE8E4DC, "paint", 20));
vr.rotation.x = Math.PI / 2;
vr.position.set(0, 0.077, 0);
g.add(vr);
}
else if (t === "tank") {
var tk = swC(0.07, 0.07, L - 0.06, null, 0, 0, 0.15, 0, g, 22);
tk.material = swToyM([0xE8E0D0, 0x2A2A2E, 0xC8A030][n % 3]);
tk.rotation.x = Math.PI / 2;
[-1, 1].forEach(function (e) { var cap = swS(0.07, 0, 0, 0.15, e * (L / 2 - 0.03), g, 16); cap.material = tk.material; cap.scale.z = 0.35; });
swC(0.02, 0.024, 0.04, null, 0, 0, 0.23, 0, g, 12).material = swToyM(0x2A2A2E, "metal");
[-1, 1].forEach(function (s) { swB(0.01, 0.12, 0.005, null, 0, s * 0.07, 0.12, 0.02, g).material = swToyM(0x8A8A8A, "metal"); });
}
else if (t === "open") {
swProfile(0.17, 0.09, L - 0.06, 0.004, swToyM(0x6A4A32, "wood"), g, 0.075, 0);
var r = wRand(11 + n);
for (var i = 0; i < 22; i++) {
var c2 = swS(0.02 + r() * 0.01, 0, (r() - 0.5) * 0.12, 0.165 + r() * 0.02, (r() - 0.5) * 0.24, g, 5);
c2.material = swToyM(0x18181A, "paint", 90);
}
}
else {
swB(0.17, 0.012, L - 0.04, null, 0, 0, 0.08, 0, g).material = swToyM(0x6A4A32, "wood");
[-1, 1].forEach(function (s) { [-0.12, 0, 0.12].forEach(function (z) { swB(0.006, 0.08, 0.006, null, 0, s * 0.085, 0.12, z, g).material = blk; }); });
for (var l = 0; l < 7; l++) {
var lg = swC(0.022, 0.022, L - 0.06, "bark", 0x6A4A2A, (l % 4 - 1.5) * 0.042, 0.11 + (l > 3 ? 0.038 : 0), 0, g, 9);
lg.rotation.x = Math.PI / 2;
if (l > 3)
lg.position.x = (l - 5) * 0.042;
}
}
[-1, 1].forEach(function (s) { [L / 2 - 0.08, -L / 2 + 0.08].forEach(function (z) { swWheelsOf(g).push({ g: swWheel(g, 0.028, 0x2A2A2C, s * 0.075, 0.028, z, true), r: 0.028 }); }); });
}
g.userData.len = L;
swJoinToy(g);
return g;
},
function (grp, lines, L, S) {
var lite = SW.lite, Rr = wRand(77), taken = [], movers = [];
function clearOf(x, z, pad) {
for (var li = 0; li < lines.length; li++) {
var P = lines[li].P;
for (var i = 0; i < P.length; i += 2)
if (Math.hypot(P[i].x - x, P[i].z - z) < pad)
return false;
}
if (L.hill && Math.hypot((x - 3.1) / 2.0, (z + 1.4) / 1.65) < 1)
return false;
if (L.lake && Math.hypot(x / 1.35, z / 0.75) < 1)
return false;
for (var t = 0; t < taken.length; t++)
if (Math.hypot(taken[t][0] - x, taken[t][1] - z) < taken[t][2] + pad * 0.8)
return false;
return Math.abs(x) < 4.95 - pad * 0.5 && Math.abs(z) < 2.85 - pad * 0.5;
}
function place(pad, tries) { for (var i = 0; i < (tries || 300); i++) {
var x = (Rr() - 0.5) * 9.8, z = (Rr() - 0.5) * 5.6;
if (clearOf(x, z, pad)) {
taken.push([x, z, pad]);
return { x: x, z: z, ry: Math.round(Rr() * 4) * Math.PI / 2 + (Rr() - 0.5) * 0.3 };
}
} return null; }
function along(u, off, li) { var Ln = lines[li || 0], i = Math.round(((u % 1) + 1) % 1 * Ln.N), p = Ln.P[i], a = Ln.P[Math.min(Ln.N, i + 1)], b = Ln.P[Math.max(0, i - 1)], ang = Math.atan2(a.x - b.x, a.z - b.z); return { x: p.x + Math.cos(ang) * off, z: p.z - Math.sin(ang) * off, y: p.y, ang: ang, u: u }; }
var stoneM = swMat("stone", 0xC8BCA8), slate = swToyM(0x4A5058, "paint", 20), tile = swToyM(0xA8503A, "paint", 20), win = swGlowM(0xFFE2A8), dark = swToyM(0x2A2A2E, "paint", 20), white = swToyM(0xF0ECE0), grn = 0x2E5A34;
function house(x, z, ry, k) {
var g = swG(x, 0, z, grp, ry), w = [0.42, 0.34, 0.62][k % 3], d = [0.3, 0.28, 0.3][k % 3], h = [0.28, 0.36, 0.3][k % 3], wall = [0xEEE4D0, 0xD8C0A0, 0xC8B8A8, 0xE8DCC8, 0xB86A4A][k % 5];
swB(w, h, d, "plaster", wall, 0, h / 2, 0, g);
var rf = swPrism(d + 0.06, h * 0.55, w + 0.04, null, 0, 0, h, 0, g, Math.PI / 2);
rf.material = k % 2 ? slate : tile;
swB(0.05, 0.12, 0.05, "brick", 0x9A5A42, w * 0.3, h + 0.1, 0, g);
swB(0.06, 0.012, 0.06, null, 0x5A3A2A, w * 0.3, h + 0.165, 0, g);
swB(0.06, 0.12, 0.006, null, [0x2A4A6A, 0x7A2A2A, 0x2A5A3A][k % 3], 0, 0.06, d / 2 + 0.003, g);
var cols = Math.max(2, Math.round(w / 0.14));
for (var i = 0; i < cols; i++) {
var wx = -w / 2 + w * (i + 0.5) / cols;
if (Math.abs(wx) < 0.05)
continue;
[0.09, h > 0.3 ? 0.25 : -1].forEach(function (wy) { if (wy < 0)
return; swB(0.06, 0.06, 0.006, null, 0, wx, wy, d / 2 + 0.004, g).material = win; swB(0.072, 0.072, 0.004, null, 0, wx, wy, d / 2 + 0.002, g).material = white; swB(0.06, 0.06, 0.006, null, 0, wx, wy, -d / 2 - 0.004, g).material = win; });
}
var fz = d / 2 + 0.14;
for (var f = -1; f <= 1; f += 2)
swB(0.006, 0.04, 0.14, null, 0xF0ECE0, f * w / 2, 0.02, d / 2 + 0.07, g);
swB(w, 0.008, 0.006, null, 0xF0ECE0, 0, 0.035, fz, g);
swB(w, 0.008, 0.006, null, 0xF0ECE0, 0, 0.015, fz, g);
for (var fl = 0; fl < 6; fl++)
swS(0.012, [0xE84A6A, 0xF0C040, 0xA86AD8, 0xF0F0F0][fl % 4], -w / 2 + 0.05 + fl * (w - 0.1) / 5, 0.012, fz - 0.04, g, 5);
return g;
}
if (S.houses) {
var nh = lite ? 6 : 12;
for (var h = 0; h < nh; h++) {
var at = place(0.42);
if (!at)
break;
house(at.x, at.z, at.ry, h);
}
}
if (S.station) {
var s0 = along(0.25, 0.24), st = swG(s0.x, 0, s0.z, grp, s0.ang + Math.PI / 2);
taken.push([s0.x, s0.z, 0.9]);
swB(1.5, 0.06, 0.2, "stone", 0xB8B0A0, 0, 0.03, 0, st);
swB(1.5, 0.004, 0.02, null, 0xF4F0E0, 0, 0.062, -0.09, st);
swB(0.62, 0.2, 0.16, "brick", 0xB8705A, 0, 0.16, 0.07, st);
var rf = swPrism(0.2, 0.08, 0.66, null, 0, 0, 0.26, 0.07, st, 0);
rf.material = slate;
for (var wi = 0; wi < 4; wi++) {
swB(0.06, 0.08, 0.004, null, 0, -0.22 + wi * 0.15, 0.15, -0.012, st).material = win;
}
swB(1.0, 0.008, 0.14, null, 0, 0, 0.24, -0.06, st).material = swToyM(0x2E5A3A);
for (var co = 0; co < 5; co++)
swC(0.006, 0.006, 0.18, null, 0, -0.45 + co * 0.225, 0.15, -0.11, st, 6).material = swToyM(0x2E5A3A);
for (var be = 0; be < 3; be++) {
swB(0.08, 0.008, 0.025, null, 0x7A5A3A, -0.6 + be * 0.55, 0.085, -0.03, st);
}
var ck = swC(0.025, 0.025, 0.006, null, 0, 0, 0.2, -0.11, st, 16);
ck.material = white;
ck.rotation.x = Math.PI / 2;
swB(0.3, 0.05, 0.006, null, 0, 0.5, 0.14, -0.02, st).material = white;
swB(0.32, 0.06, 0.004, null, 0, 0.5, 0.14, -0.016, st).material = swToyM(0x2A3A62);
if (S.people)
for (var pp = 0; pp < (lite ? 5 : 9); pp++)
swFigure(st, -0.65 + pp * 0.16, 0.06, -0.04 + (pp % 2) * 0.04, pp);
}
if (S.people)
for (var pq = 0; pq < (lite ? 6 : 14); pq++) {
var pa = place(0.18, 80);
if (!pa)
break;
swFigure(grp, pa.x, 0, pa.z, pq + 3);
}
if (S.church) {
var ca = place(0.9);
if (ca) {
var cg = swG(ca.x, 0, ca.z, grp, ca.ry);
swB(0.32, 0.3, 0.7, "stone", 0xC8BCA8, 0, 0.15, 0, cg);
var cr = swPrism(0.38, 0.22, 0.72, null, 0, 0, 0.3, 0, cg, 0);
cr.material = slate;
swB(0.22, 0.6, 0.22, "stone", 0xC0B4A0, 0, 0.3, -0.44, cg);
var sp = swK(0.17, 0.5, null, 0, 0, 0.85, -0.44, cg, 4);
sp.material = slate;
sp.rotation.y = Math.PI / 4;
var clk = swC(0.04, 0.04, 0.006, null, 0, 0, 0.48, -0.329, cg, 16);
clk.material = white;
clk.rotation.x = Math.PI / 2;
for (var cw = 0; cw < 4; cw++) {
[-1, 1].forEach(function (s) { var a = swB(0.004, 0.12, 0.05, null, 0, s * 0.162, 0.16, -0.24 + cw * 0.16, cg); a.material = swGlowM(0xE8C890); });
}
for (var gs = 0; gs < 8; gs++)
swB(0.04, 0.05, 0.012, "stone", 0x9A9488, 0.3 + (gs % 2) * 0.1, 0.025, -0.25 + Math.floor(gs / 2) * 0.15, cg);
swB(0.012, 0.04, 0.9, "stone", 0xA89E8C, 0.42, 0.02, 0, cg);
}
}
if (S.farm) {
var fa = place(1.0);
if (fa) {
var fg = swG(fa.x, 0, fa.z, grp, fa.ry);
swB(0.5, 0.26, 0.36, null, 0, -0.2, 0.13, -0.2, fg).material = swToyM(0x9A2A22, "wood");
var br = swPrism(0.42, 0.18, 0.54, null, 0, -0.2, 0.26, -0.2, fg, Math.PI / 2);
br.material = swToyM(0x5A5A5E, "metal", 40);
swB(0.16, 0.18, 0.005, null, 0, -0.2, 0.09, -0.018, fg).material = white;
swB(0.14, 0.16, 0.006, null, 0, -0.2, 0.08, -0.016, fg).material = dark;
swC(0.07, 0.07, 0.5, null, 0, 0.15, 0.25, -0.3, fg, 16).material = swToyM(0xC8C8C0, "metal");
var sd = swS(0.07, 0, 0.15, 0.5, -0.3, fg, 14);
sd.material = swToyM(0x8A9098, "metal");
sd.scale.y = 0.6;
var px0 = -0.45, px1 = 0.45, pz0 = 0.05, pz1 = 0.55;
[[px0, pz0, px1, pz0], [px0, pz1, px1, pz1], [px0, pz0, px0, pz1], [px1, pz0, px1, pz1]].forEach(function (e) {
var len = Math.hypot(e[2] - e[0], e[3] - e[1]), mx = (e[0] + e[2]) / 2, mz = (e[1] + e[3]) / 2, a = Math.atan2(e[2] - e[0], e[3] - e[1]);
[0.02, 0.04].forEach(function (y) { var r = swB(0.005, 0.006, len, null, 0xE8E0D0, mx, y, mz, fg); r.rotation.y = a; });
for (var q = 0; q <= 6; q++)
swB(0.008, 0.05, 0.008, null, 0x8A6A4A, e[0] + (e[2] - e[0]) * q / 6, 0.025, e[1] + (e[3] - e[1]) * q / 6, fg);
});
var fr = wRand(4);
for (var an = 0; an < (lite ? 5 : 9); an++) {
var ax = px0 + 0.08 + fr() * (px1 - px0 - 0.16), az = pz0 + 0.08 + fr() * (pz1 - pz0 - 0.16), cow = an % 3 === 0, ag = swG(ax, 0, az, fg, fr() * 6);
var bd = swS(cow ? 0.04 : 0.03, 0, 0, cow ? 0.05 : 0.04, 0, ag, 8);
bd.material = swToyM(cow ? (an % 2 ? 0x1A1A1A : 0x8A5A3A) : 0xF0EEE6, "paint", 10);
bd.scale.set(0.8, 0.8, 1.5);
var hd = swS(cow ? 0.018 : 0.016, 0, 0, cow ? 0.06 : 0.048, cow ? 0.065 : 0.05, ag, 6);
hd.material = swToyM(cow ? 0xE8E0D8 : 0x1A1A1A, "paint", 10);
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { swC(0.004, 0.004, 0.03, null, 0, s * 0.016, 0.015, t * 0.03, ag, 4).material = dark; }); });
}
for (var hb = 0; hb < 4; hb++) {
var bale = swC(0.03, 0.03, 0.05, null, 0, 0.3 + hb * 0.07, 0.03, -0.08, fg, 12);
bale.material = swToyM(0xD8B860, "paint", 8);
bale.rotation.z = Math.PI / 2;
}
}
}
if (S.windmill) {
var wa = place(0.45);
if (wa) {
var wg = swG(wa.x, 0, wa.z, grp, wa.ry);
swC(0.1, 0.15, 0.55, "plaster", 0xE8E0D0, 0, 0.275, 0, wg, 8);
var cap = swS(0.11, 0, 0, 0.56, 0, wg, 12);
cap.material = swToyM(0x5A4A3A, "wood");
cap.scale.set(1, 0.8, 1.2);
swB(0.06, 0.09, 0.006, null, 0, 0, 0.08, 0.13, wg).material = dark;
swB(0.04, 0.05, 0.006, null, 0, 0, 0.3, 0.105, wg).material = win;
var sails = swG(0, 0.56, 0.15, wg);
for (var sl = 0; sl < 4; sl++) {
var arm = swG(0, 0, 0, sails);
arm.rotation.z = sl * Math.PI / 2;
swB(0.012, 0.4, 0.01, null, 0, 0, 0.2, 0, arm).material = swToyM(0x6A4A2A, "wood");
var cloth = swB(0.07, 0.3, 0.004, null, 0, 0.04, 0.23, 0, arm);
cloth.material = swToyM(0xF0E8D8, "paint", 8);
for (var lt = 0; lt < 6; lt++)
swB(0.07, 0.004, 0.006, null, 0, 0.04, 0.1 + lt * 0.05, 0.002, arm).material = swToyM(0x6A4A2A, "wood");
}
swC(0.015, 0.015, 0.03, null, 0, 0, 0, 0, sails, 8).rotation.x = Math.PI / 2;
sails.traverse(function (o) { if (o.isMesh)
o.userData.keep = 1; });
movers.push({ k: "sails", g: sails });
}
}
if (S.shed) {
var sa = place(1.0);
if (sa) {
var sg = swG(sa.x, 0, sa.z, grp, sa.ry);
swB(0.9, 0.36, 0.46, "brick", 0xA85A42, 0, 0.18, 0, sg);
var sr = swPrism(0.5, 0.16, 0.92, null, 0, 0, 0.36, 0, sg, 0);
sr.material = slate;
for (var v = 0; v < 3; v++)
swB(0.08, 0.06, 0.1, null, 0, -0.3 + v * 0.3, 0.5, 0, sg).material = dark;
[-0.11, 0.11].forEach(function (x) { var arch = swB(0.17, 0.26, 0.006, null, 0, x, 0.13, 0.233, sg); arch.material = swToyM(0x101012, "paint", 5); });
for (var w2 = 0; w2 < 5; w2++) {
[-1, 1].forEach(function (s) { swB(0.004, 0.1, 0.08, null, 0, s * 0.452, 0.2, -0.18 + w2 * 0.09, sg).material = win; });
}
var wt = swG(0.7, 0, -0.05, sg);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { swB(0.014, 0.4, 0.014, null, 0, q[0] * 0.09, 0.2, q[1] * 0.09, wt).material = swToyM(0x3A3A3E, "metal"); });
swB(0.26, 0.16, 0.26, null, 0, 0, 0.48, 0, wt).material = swToyM(0x2A3A4A, "metal");
var hose = swC(0.012, 0.012, 0.18, null, 0, 0.12, 0.35, 0.13, wt, 6);
hose.material = dark;
var cs = swG(-0.7, 0, 0.0, sg);
swB(0.22, 0.08, 0.18, "brick", 0xA85A42, 0, 0.04, 0, cs);
var cr2 = wRand(8);
for (var cc = 0; cc < 16; cc++) {
var lump = swS(0.03, 0, (cr2() - 0.5) * 0.16, 0.09 + cr2() * 0.03, (cr2() - 0.5) * 0.12, cs, 5);
lump.material = swToyM(0x18181A, "paint", 90);
}
}
}
if (S.fields) {
var fa2 = place(1.1);
if (fa2) {
var fdg = swG(fa2.x, 0, fa2.z, grp, fa2.ry), cropC = [0xD8B860, 0x6A4A2E, 0x7AA84A, 0xC8C060, 0x5A8A3A, 0x8A6A3A];
for (var fx = 0; fx < 3; fx++)
for (var fz = 0; fz < 2; fz++) {
var cx = -0.5 + fx * 0.5, cz2 = -0.24 + fz * 0.48, k = fx * 2 + fz, fld = swB(0.46, 0.006, 0.44, null, 0, cx, 0.004, cz2, fdg);
fld.material = swToyM(cropC[k], "paint", 6);
for (var row = 0; row < 9; row++)
swB(0.44, 0.008, 0.012, null, 0, cx, 0.009, cz2 - 0.2 + row * 0.05, fdg).material = swToyM(cropC[k] === 0x6A4A2E ? 0x4A321E : (cropC[k] & 0xFEFEFE) >> 1 | 0x202020, "paint", 6);
}
[[-0.75, 0, 0.012, 0.98], [0.75, 0, 0.012, 0.98], [0, -0.48, 1.5, 0.012], [0, 0.48, 1.5, 0.012], [-0.25, 0, 0.012, 0.98], [0.25, 0, 0.012, 0.98], [0, 0, 1.5, 0.012]].forEach(function (e) { var hg = swB(Math.max(e[2], 0.04), 0.05, Math.max(e[3], 0.04), null, 0, e[0], 0.025, e[1], fdg); hg.material = swToyM(0x2E5A2A, "paint", 8); });
}
}
if (S.castle) {
var ka = place(0.95);
if (ka) {
var kg = swG(ka.x, 0, ka.z, grp, ka.ry), mound = swS(0.7, 0, 0, -0.48, 0, kg, 22);
mound.material = swToyM(0x5A8A3A, "paint", 6);
mound.scale.y = 0.9;
var top = 0.14, ws = 0.7;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { swC(0.075, 0.08, 0.34, "stone", 0xB8B0A0, q[0] * ws / 2, top + 0.17, q[1] * ws / 2 * 0.8, kg, 12); var cn = swK(0.095, 0.16, null, 0, q[0] * ws / 2, top + 0.42, q[1] * ws / 2 * 0.8, kg, 12); cn.material = slate; });
[[0, -1, ws, 0.04], [0, 1, ws, 0.04], [-1, 0, 0.04, ws * 0.8], [1, 0, 0.04, ws * 0.8]].forEach(function (e) { swB(e[2], 0.2, e[3], "stone", 0xC0B8A8, e[0] * ws / 2, top + 0.1, e[1] * ws / 2 * 0.8, kg); var n = Math.round(Math.max(e[2], e[3]) / 0.05); for (var c = 0; c < n; c += 2) {
var t = c / n - 0.5 + 0.5 / n;
swB(e[2] > 0.1 ? 0.03 : 0.045, 0.03, e[2] > 0.1 ? 0.045 : 0.03, "stone", 0xC0B8A8, e[0] * ws / 2 + (e[2] > 0.1 ? t * e[2] : 0), top + 0.215, e[1] * ws / 2 * 0.8 + (e[3] > 0.1 ? t * e[3] : 0), kg);
} });
swB(0.26, 0.4, 0.22, "stone", 0xB8B0A0, 0, top + 0.2, 0, kg);
swB(0.004, 0.12, 0.004, null, 0x3A3A3A, 0, top + 0.46, 0, kg);
var flag = swB(0.08, 0.05, 0.003, null, 0, 0.04, top + 0.5, 0, kg);
flag.material = swToyM(0x2A4A9A);
swB(0.09, 0.12, 0.006, null, 0, 0, top + 0.06, ws / 2 * 0.8 + 0.023, kg).material = dark;
}
}
if (S.trees) {
var fir = swTreeGeo("fir"), oak = swTreeGeo("oak"), n = lite ? 50 : 140, nf = 0, no = 0, firM = new THREE.InstancedMesh(fir, swVcM(1), n), oakM = new THREE.InstancedMesh(oak, swVcM(1), n), ic0 = [firM, oakM].forEach(function (M) { M.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3).fill(1), 3); }), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(), col = new THREE.Color();
var woods = [];
for (var wd = 0; wd < 3; wd++) {
var wa2 = place(0.5, 120);
if (wa2) {
woods.push(wa2);
taken.pop();
}
}
for (var t = 0; t < n * 3 && (nf + no) < n * 1.6; t++) {
var tx, tz;
if (woods.length && t % 3) {
var W = woods[t % woods.length];
tx = W.x + (Rr() - 0.5) * 1.1;
tz = W.z + (Rr() - 0.5) * 0.9;
}
else {
tx = (Rr() - 0.5) * 9.8;
tz = (Rr() - 0.5) * 5.6;
}
if (!clearOf(tx, tz, 0.22))
continue;
var isFir = (t % 3 === 0) || Rr() < 0.45, s = 0.55 + Rr() * 0.5;
e.set(0, Rr() * 6, 0);
q.setFromEuler(e);
v.set(tx, 0, tz);
sc.set(s, s * (0.85 + Rr() * 0.35), s);
m.compose(v, q, sc);
var lv = 0.8 + Rr() * 0.35, hu = Rr();
col.setRGB(lv * (0.9 + hu * 0.15), lv, lv * (0.85 + (1 - hu) * 0.15));
if (isFir && nf < n) {
firM.setMatrixAt(nf, m);
firM.setColorAt(nf, col);
nf++;
}
else if (!isFir && no < n) {
oakM.setMatrixAt(no, m);
oakM.setColorAt(no, col);
no++;
}
}
firM.count = nf;
oakM.count = no;
[firM, oakM].forEach(function (M) { if (!M.count) {
M.dispose && M.dispose();
return;
} M.instanceMatrix.needsUpdate = true; if (M.instanceColor)
M.instanceColor.needsUpdate = true; M.userData.keep = 1; grp.add(M); });
}
if (S.lamps)
for (var lp = 0; lp < (lite ? 8 : 14); lp++) {
var la = along(lp / 14 + 0.03, 0.2);
if (la.y > 0.05)
continue;
var lg = swG(la.x, 0, la.z, grp, la.ang);
swC(0.005, 0.007, 0.24, null, 0, 0, 0.12, 0, lg, 6).material = dark;
swB(0.04, 0.006, 0.006, null, 0, 0.015, 0.235, 0, lg).material = dark;
var lb = swS(0.014, 0, 0.03, 0.225, 0, lg, 8);
lb.material = swGlowM(0xFFD89A);
}
if (S.signals)
[0.08, 0.42, 0.7].forEach(function (u) {
var sa2 = along(u, 0.17);
if (sa2.y > 0.05)
return;
var sg2 = swG(sa2.x, 0, sa2.z, grp, sa2.ang);
swC(0.006, 0.008, 0.42, null, 0, 0, 0.21, 0, sg2, 6).material = white;
swS(0.008, 0, 0, 0.43, 0, sg2, 6).material = dark;
swB(0.04, 0.01, 0.04, null, 0, 0, 0.005, 0, sg2).material = dark;
var piv = swG(0, 0.37, 0.006, sg2), arm = swB(0.12, 0.022, 0.004, null, 0, 0.06, 0, 0, piv);
arm.material = swToyM(0xC8302A);
var st2 = swB(0.012, 0.024, 0.005, null, 0, 0.1, 0, 0.0005, piv);
st2.material = white;
var red = swS(0.007, 0, -0.006, 0.34, 0.012, sg2, 6);
red.material = swGlowM(0xFF5A4A);
var gr = swS(0.007, 0, -0.006, 0.34, 0.012, sg2, 6);
gr.material = swGlowM(0x7AF08A);
gr.visible = false;
[piv, red, gr].forEach(function (o) { o.traverse(function (x) { if (x.isMesh)
x.userData.keep = 1; }); if (o.isMesh)
o.userData.keep = 1; });
movers.push({ k: "signal", piv: piv, red: red, gr: gr, u: u, a: 0 });
});
if (S.crossing) {
var xa = along(0.58, 0);
if (xa.y < 0.05) {
var xg = swG(xa.x, 0, xa.z, grp, xa.ang);
taken.push([xa.x, xa.z, 0.6]);
var road = swB(1.2, 0.006, 0.24, null, 0, 0, 0.003, 0, xg);
road.material = swToyM(0x3A3A3E, "paint", 8);
for (var dl = 0; dl < 6; dl++) {
if (Math.abs(-0.5 + dl * 0.2) < 0.15)
continue;
swB(0.08, 0.008, 0.008, null, 0, -0.5 + dl * 0.2, 0.004, 0, xg).material = white;
}
var gates = [];
[-1, 1].forEach(function (s) {
var post = swG(s * 0.2, 0, s * 0.14, xg);
swC(0.008, 0.008, 0.1, null, 0, 0, 0.05, 0, post, 6).material = white;
var lt = swS(0.008, 0, 0, 0.09, 0.008 * s, post, 6);
lt.material = swGlowM(0xFF5A4A);
lt.visible = false;
lt.userData.keep = 1;
var piv2 = swG(0, 0.07, 0, post);
piv2.rotation.y = s > 0 ? Math.PI : 0;
for (var bs = 0; bs < 5; bs++) {
var seg = swB(0.05, 0.012, 0.01, null, 0, 0.025 + bs * 0.05, 0, 0, piv2);
seg.material = bs % 2 ? white : swToyM(0xC8302A);
seg.userData.keep = 1;
}
gates.push({ p: piv2, l: lt, s: s });
});
var car = swG(-0.42, 0, 0.06, xg, Math.PI / 2);
swProfile(0.07, 0.04, 0.14, 0.012, swToyM(0xC8302A), car, 0.012, 0);
swProfile(0.06, 0.03, 0.07, 0.015, swSee(0x8AB8D8, 0.7), car, 0.05, -0.01);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var wh = swC(0.012, 0.012, 0.01, null, 0, q[0] * 0.035, 0.012, q[1] * 0.045, car, 10); wh.material = swToyM(0x1A1A1A, "rubber"); wh.rotation.z = Math.PI / 2; });
movers.push({ k: "crossing", gates: gates, u: 0.58, a: 0 });
}
}
grp.traverse(function (o) { if (o.isMesh && !o.isInstancedMesh && o.material && o.material.map && o.material.userData && o.material.userData.ctn && o.material.color)
o.material = swToyM(o.material.color.getHex(), "paint", 12); });
return movers;
},
function (p, x, y, z, k) {
var g = swG(x, y, z, p, k * 1.7), coat = [0xC83A2A, 0x2A4A8A, 0x3A6A3A, 0x8A6A3A, 0xE8D8C0, 0x6A3A6A, 0x2A2A2E][k % 7];
swC(0.006, 0.007, 0.03, null, 0, -0.005, 0.015, 0, g, 5).material = swToyM(0x2A2A30);
swC(0.006, 0.007, 0.03, null, 0, 0.005, 0.015, 0, g, 5).material = swToyM(0x2A2A30);
swC(0.011, 0.014, 0.04, null, 0, 0, 0.05, 0, g, 7).material = swToyM(coat);
swS(0.009, 0, 0, 0.078, 0, g, 8).material = swToyM([0xE8C8A8, 0xC8946A, 0x8A5A3A][k % 3], "paint", 20);
if (k % 3 === 0) {
swC(0.009, 0.011, 0.008, null, 0, 0, 0.088, 0, g, 8).material = swToyM(0x2A2A2E);
}
return g;
},
function (kind) {
var key = "treegeo|" + kind;
if (SW_MATS[key])
return SW_MATS[key].g;
var parts = [], add = function (geo, x, y, z, col, sx, sy, sz) { geo = geo.index ? geo.toNonIndexed() : geo; geo.scale(sx || 1, sy || 1, sz || 1); geo.translate(x, y, z); var c = new THREE.Color(col), n = geo.attributes.position.count, C = new Float32Array(n * 3); for (var i = 0; i < n; i++) {
var j = 1 - 0.18 * Math.random();
C[i * 3] = c.r * j;
C[i * 3 + 1] = c.g * j;
C[i * 3 + 2] = c.b * j;
} geo.setAttribute("color", new THREE.BufferAttribute(C, 3)); parts.push(geo); };
add(new THREE.CylinderGeometry(0.008, 0.012, 0.12, 5), 0, 0.06, 0, 0x5A4632);
if (kind === "fir") {
[[0.11, 0.16, 0.1], [0.085, 0.14, 0.19], [0.06, 0.12, 0.27], [0.035, 0.09, 0.34]].forEach(function (t, i) { add(new THREE.ConeGeometry(t[0], t[1], 9), 0, t[2], 0, [0x2E5A34, 0x34623A, 0x3A6A40, 0x426E44][i]); });
}
else {
[[0, 0.2, 0, 0.09], [0.05, 0.17, 0.03, 0.065], [-0.05, 0.18, -0.02, 0.07], [0.01, 0.25, -0.04, 0.06], [-0.02, 0.15, 0.05, 0.06]].forEach(function (b, i) { add(new THREE.IcosahedronGeometry(b[3], 1), b[0], b[1], b[2], [0x4A8A3A, 0x5A9A44, 0x3E7A34, 0x64A24A, 0x4A8A3A][i]); });
}
var n = 0;
parts.forEach(function (g) { n += g.attributes.position.count; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), C = new Float32Array(n * 3), o = 0;
parts.forEach(function (g) { g.computeVertexNormals(); P.set(g.attributes.position.array, o * 3); N.set(g.attributes.normal.array, o * 3); C.set(g.attributes.color.array, o * 3); o += g.attributes.position.count; g.dispose(); });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
G.setAttribute("color", new THREE.BufferAttribute(C, 3));
G.computeBoundingSphere();
G.userData.shared = 1;
SW_MATS[key] = { dispose: function () { G.dispose(); }, g: G };
return G;
},
function (R) {
R = R || SW_ROOMS.trains;
if (!R || !R.tbl)
return;
var D = swTrainData(), L = SW_LAYOUTS[D.layout] || SW_LAYOUTS.oval, T = R.tbl, lite = SW.lite;
if (R.rail) {
T.remove(R.rail);
R.rail.traverse(function (o) { if (o.geometry && !o.geometry.userData.shared)
o.geometry.dispose(); });
}
if (!R.board) {
var bd = swB(10.2, 0.02, 6, null, 0, 0, 0.931, 0, T);
bd.material = swMapM("board", swBoardTex());
R.board = bd;
var path = [[-5.18, -1.4], [-5.18, -2.9], [-4.98, -3.08], [4.98, -3.08], [5.18, -2.9], [5.18, -1.4]], tot = 0, cum = [0];
for (var pi = 1; pi < path.length; pi++) {
tot += Math.hypot(path[pi][0] - path[pi - 1][0], path[pi][1] - path[pi - 1][1]);
cum.push(tot);
}
var sp = [], su = [], si = [];
path.forEach(function (q, i) { sp.push(q[0], 0.94, q[1], q[0], 0.94 + 1.15, q[1]); su.push(cum[i] / tot, 0, cum[i] / tot, 1); if (i)
si.push((i - 1) * 2, i * 2, (i - 1) * 2 + 1, (i - 1) * 2 + 1, i * 2, i * 2 + 1); });
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
sg.setAttribute("uv", new THREE.Float32BufferAttribute(su, 2));
sg.setIndex(si);
sg.computeVertexNormals();
var skm = swMapM("skyback", swSkyBackTex());
skm.side = THREE.DoubleSide;
var sky = new THREE.Mesh(sg, skm);
sky.userData.keep = 1;
T.add(sky);
swB(10.42, 0.1, 0.04, "wood", SW_DARK, 0, 0.88, 3.11, T);
swB(10.42, 0.1, 0.04, "wood", SW_DARK, 0, 0.88, -3.11, T);
swB(0.04, 0.1, 6.2, "wood", SW_DARK, 5.21, 0.88, 0, T);
swB(0.04, 0.1, 6.2, "wood", SW_DARK, -5.21, 0.88, 0, T);
}
var top = 0.94, grp = new THREE.Group();
grp.position.y = top;
T.add(grp);
R.rail = grp;
R.lines = [];
function line(pts, lift) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], 0, p[1]); }), true, "centripetal", 0.5);
var N = 220, P = c.getSpacedPoints(N), len = c.getLength();
if (lift)
for (var i = 0; i < P.length; i++) {
var u = i / N;
if (u > 0.62 && u < 0.88) {
var k = Math.sin((u - 0.62) / 0.26 * Math.PI);
P[i].y = k * 0.35;
}
}
return { c: c, P: P, len: len, N: N, lift: lift };
}
function liftAt(Ln, u) { if (!Ln.lift || u <= 0.62 || u >= 0.88)
return 0; return Math.sin((u - 0.62) / 0.26 * Math.PI) * 0.35; }
var lines = [line(L.pts, L.bridge)];
if (D.layout === "twin" && L.inner)
lines.push(line(L.inner, false));
if (L.hill) {
var hx = 3.1, hz = -1.4, HW = 4.4, HD = 3.6, seg = lite ? 28 : 56, hg = new THREE.PlaneGeometry(HW, HD, seg, Math.round(seg * HD / HW));
hg.rotateX(-Math.PI / 2);
var Pp = hg.attributes.position, C = new Float32Array(Pp.count * 3), hr = wRand(13), cg = new THREE.Color(), heights = [];
for (var i = 0; i < Pp.count; i++) {
var x = Pp.getX(i), z = Pp.getZ(i), d = Math.hypot(x / 1.95, z / 1.6), b = Math.max(0, 1 - d * d), n = Math.sin(x * 5.1 + 1) * Math.cos(z * 4.3) * 0.04 + Math.sin(x * 11.7 + z * 9.1) * 0.015, h = b > 0 ? Math.pow(b, 1.1) * 0.95 + n * b : 0;
Pp.setY(i, h);
heights.push(h);
}
hg.computeVertexNormals();
var Nn = hg.attributes.normal;
for (var i2 = 0; i2 < Pp.count; i2++) {
var h2 = heights[i2], st = 1 - Nn.getY(i2), r = hr();
if (st > 0.42 || h2 > 0.78)
cg.setRGB(0.52 + r * 0.08, 0.5 + r * 0.08, 0.46 + r * 0.06);
else if (st > 0.3)
cg.setRGB(0.42 + r * 0.1, 0.46 + r * 0.06, 0.3);
else
cg.setRGB(0.32 + r * 0.08, 0.5 + r * 0.1, 0.22 + r * 0.05);
C[i2 * 3] = cg.r;
C[i2 * 3 + 1] = cg.g;
C[i2 * 3 + 2] = cg.b;
}
hg.setAttribute("color", new THREE.BufferAttribute(C, 3));
var hm = new THREE.Mesh(hg, swVcM());
hm.position.set(hx, 0.002, hz);
hm.userData.keep = 1;
grp.add(hm);
var Ln0 = lines[0], inside = function (p) { return Math.hypot((p.x - hx) / 1.95, (p.z - hz) / 1.6) < 0.62; };
for (var pi = 0; pi < Ln0.N; pi++) {
var a = Ln0.P[pi], b2 = Ln0.P[pi + 1];
if (inside(a) !== inside(b2)) {
var ang = Math.atan2(b2.x - a.x, b2.z - a.z), pg = swG((a.x + b2.x) / 2, 0, (a.z + b2.z) / 2, grp, ang);
var sh = new THREE.Shape();
sh.moveTo(-0.22, 0);
sh.lineTo(0.22, 0);
sh.lineTo(0.22, 0.38);
sh.lineTo(-0.22, 0.38);
sh.lineTo(-0.22, 0);
var hole = new THREE.Path();
hole.moveTo(-0.11, 0);
hole.lineTo(-0.11, 0.2);
hole.absarc(0, 0.2, 0.11, Math.PI, 0, true);
hole.lineTo(0.11, 0);
hole.lineTo(-0.11, 0);
sh.holes.push(hole);
var pgeo = new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: false, curveSegments: 10 });
pgeo.translate(0, 0, -0.03);
swAdd(pgeo, swMat("stone", 0x9A9080), 0, 0, 0, pg);
swB(0.5, 0.03, 0.08, "stone", 0x8A8070, 0, 0.39, 0, pg);
var dk = swB(0.2, 0.3, 0.004, null, 0, 0, 0.15, inside(a) ? 0.08 : -0.08, pg);
dk.material = swToyM(0x050505, "paint", 1);
}
}
}
if (L.lake) {
var lm = new THREE.MeshPhongMaterial({ color: 0x3A7A98, shininess: 120, specular: 0x99AABB });
lm.userData.realWater = 1;
var lk = swAdd(new THREE.CircleGeometry(0.9, 40), lm, 0, 0.012, 0, grp);
lk.rotation.x = -Math.PI / 2;
lk.scale.set(1.3, 0.7, 1);
var sand = swAdd(new THREE.RingGeometry(0.88, 1.0, 40), swToyM(0xC8B890, "paint", 6), 0, 0.008, 0, grp);
sand.rotation.x = -Math.PI / 2;
sand.scale.set(1.3, 0.7, 1);
var rr = wRand(21);
for (var rd = 0; rd < (lite ? 20 : 60); rd++) {
var ra = rr() * Math.PI * 2, rx = Math.cos(ra) * 0.95 * 1.3, rz = Math.sin(ra) * 0.95 * 0.7;
swC(0.003, 0.004, 0.06 + rr() * 0.05, null, 0x5A7A3A, rx, 0.04, rz, grp, 4);
}
}
var laid = Math.max(0, Math.min(D.laid, swTrainPieces(D))), count = 0, gm = swMapM("gravel", swGravelTex()), slM = SW_MATS["sleeperI"] || (SW_MATS["sleeperI"] = new THREE.MeshLambertMaterial({ color: 0x4A3A2C })), railM = swToyM(0x9A9AA2, "metal", 110);
lines.forEach(function (Ln, li) {
var pieces = Math.round(Ln.len / 0.6), mine = Math.max(0, Math.min(pieces, laid - count));
count += pieces;
Ln.pieces = pieces;
Ln.mine = mine;
if (!mine)
return;
var Nf = Math.round(Ln.len / (lite ? 0.06 : 0.035)), upto = Math.round(Nf * mine / pieces), F = Ln.c.getSpacedPoints(Nf);
for (var i = 0; i < F.length; i++)
F[i].y = liftAt(Ln, i / Nf);
var side = function (i) { var a = F[Math.max(0, i - 1)], b = F[Math.min(Nf, i + 1)], dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1; return [-dz / l, dx / l]; };
var prof = [[-0.12, 0.003], [-0.075, 0.016], [0.075, 0.016], [0.12, 0.003]], pos = [], uv = [], idx = [], dist = 0;
for (var i3 = 0; i3 <= upto; i3++) {
var s = side(i3), p = F[i3];
if (i3)
dist += p.distanceTo(F[i3 - 1]);
prof.forEach(function (q, k) { pos.push(p.x + s[0] * q[0], p.y + q[1], p.z + s[1] * q[0]); uv.push(k / 3, dist / 0.25); });
if (i3)
for (var k = 0; k < 3; k++) {
var a0 = (i3 - 1) * 4 + k, b0 = i3 * 4 + k;
idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1);
}
}
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
bg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
bg.setIndex(idx);
bg.computeVertexNormals();
grp.add(new THREE.Mesh(bg, gm));
var sl = new THREE.InstancedMesh(new THREE.BoxGeometry(0.17, 0.012, 0.024), slM, upto + 1), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(1, 1, 1);
for (var j = 0; j <= upto; j++) {
var s2 = side(j);
e.set(0, Math.atan2(s2[0], s2[1]), 0);
q.setFromEuler(e);
v.set(F[j].x, F[j].y + 0.022, F[j].z);
m.compose(v, q, sc);
sl.setMatrixAt(j, m);
}
sl.instanceMatrix.needsUpdate = true;
sl.userData.keep = 1;
grp.add(sl);
[-0.05, 0.05].forEach(function (off) {
var rp = [];
for (var r = 0; r <= upto; r++) {
var s3 = side(r);
rp.push(new THREE.Vector3(F[r].x + s3[0] * off, F[r].y + 0.034, F[r].z + s3[1] * off));
}
if (rp.length > 1)
grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rp), Math.max(8, rp.length), 0.0065, lite ? 4 : 6, false), railM));
});
if (L.bridge && li === 0) {
for (var bp = 0; bp < 7; bp++) {
var u = 0.655 + bp * 0.04, idx2 = Math.round(u * Nf);
if (idx2 > upto)
continue;
var pp = F[idx2];
if (pp.y < 0.08)
continue;
swB(0.12, pp.y, 0.07, "stone", 0xA89E8C, pp.x, pp.y / 2, pp.z, grp);
}
[-0.09, 0.09].forEach(function (off) {
var gp = [];
for (var r2 = Math.round(0.63 * Nf); r2 <= Math.min(upto, Math.round(0.87 * Nf)); r2++) {
var s4 = side(r2);
gp.push(new THREE.Vector3(F[r2].x + s4[0] * off, F[r2].y + 0.03, F[r2].z + s4[1] * off));
}
if (gp.length > 2)
grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gp), gp.length, 0.012, 4, false), swToyM(0x3A4A5A, "metal", 40)));
});
}
});
R.lines = lines;
R.complete = laid >= swTrainPieces(D);
var mv = [];
try {
mv = swSceneryBuild(grp, lines, L, D.scen);
}
catch (e) {
if (window.console)
console.warn("[stillwater] scenery", e);
}
try {
if (typeof ctnMerge === "function")
ctnMerge(grp);
}
catch (e) { }
R.scenMovers = mv;
R.trains = [];
if (R.complete) {
lines.forEach(function (Ln, li) {
if (li > 1)
return;
var E = SW_ENGINES[D.eng[li]] || SW_ENGINES.steamgreen, carsK = D.cars[li] || "coaches";
var parts = [swLoco(grp, E)];
if (E.kind === "steam")
parts.push(swTender(grp, E));
var nc = lite ? 3 : 5;
for (var c = 0; c < nc; c++)
parts.push(swWagon(grp, carsK === "coaches" ? "coach" : carsK === "goods" ? ["van", "open", "tank", "van", "brake"][c] : carsK === "mixed" ? (c % 2 ? "van" : "coach") : carsK === "tankers" ? (c === nc - 1 ? "brake" : "tank") : carsK === "timber" ? (c === nc - 1 ? "brake" : "logs") : "coach", c));
R.trains.push({ line: Ln, parts: parts, u: li * 0.5, E: E, puff: 0 });
});
}
},
function (D) {
var L = SW_LAYOUTS[D.layout] || SW_LAYOUTS.oval, n = 0;
[L.pts].concat(D.layout === "twin" && L.inner ? [L.inner] : []).forEach(function (pts) { var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], 0, p[1]); }), true, "centripetal", 0.5); n += Math.round(c.getLength() / 0.6); });
return n;
},
function (dt) {
var R = SW_ROOMS.trains;
if (!R || !R.g || !R.g.visible || !R.trains)
return;
var D = swTrainData(), sp = [0, 0.28, 0.5, 0.75][D.speed === undefined ? 1 : D.speed] || 0.28;
if (!D.run)
sp = 0;
R.trains.forEach(function (T) {
var Ln = T.line;
T.u = (T.u + sp * dt / Ln.len) % 1;
var off = 0;
T.parts.forEach(function (P, i) {
var u = ((T.u - off / Ln.len) % 1 + 1) % 1, p = Ln.c.getPointAt(u), a = Ln.c.getPointAt((u + 0.004) % 1);
var hy = Ln.P[Math.round(u * Ln.N) % Ln.N].y;
P.position.set(p.x, hy + 0.04, p.z);
P.rotation.y = Math.atan2(a.x - p.x, a.z - p.z);
var U = P.userData, dd = sp * dt;
if (U.wh && dd)
U.wh.forEach(function (W) { W.g.rotation.x += dd / W.r; });
if (U.rods && dd) {
U.ang = (U.ang || 0) + dd / 0.044;
U.rods.forEach(function (Q) { Q.m.position.y = Q.y + Math.sin(U.ang) * Q.c; Q.m.position.z = Q.z + Math.cos(U.ang) * Q.c; });
}
off += (P.userData.len || 0.55) + 0.04;
});
if (T.parts[0].userData.steam && sp > 0 && !SW.lite) {
T.puff += dt;
if (T.puff > 0.7) {
T.puff = 0;
swPuff(R, T.parts[0]);
}
}
});
if (R.puffs)
for (var i = R.puffs.length - 1; i >= 0; i--) {
var pf = R.puffs[i];
pf.t += dt;
pf.s.position.y += dt * 0.12;
var k = pf.t / 3;
pf.s.material.opacity = 0.35 * (1 - k);
pf.s.scale.setScalar(0.12 + k * 0.3);
if (k >= 1) {
pf.s.parent.remove(pf.s);
pf.s.material.dispose();
R.puffs.splice(i, 1);
}
}
if (R.scenMovers)
R.scenMovers.forEach(function (M) {
if (M.k === "sails") {
M.g.rotation.z += dt * 0.35;
return;
}
var near = R.trains.some(function (T) { var du = ((M.u - T.u) % 1 + 1) % 1; return du < 0.12 || du > 0.93; }), tgt = near ? 1 : 0;
M.a += (tgt - M.a) * Math.min(1, dt * 1.5);
if (M.k === "signal") {
M.piv.rotation.z = -M.a * 0.75;
M.red.visible = M.a < 0.5;
M.gr.visible = M.a >= 0.5;
}
else if (M.k === "crossing")
M.gates.forEach(function (G) { G.p.rotation.z = (1 - M.a) * 1.35; G.l.visible = M.a > 0.3; });
});
if (SW.cab)
swCabTick(dt);
},
function (R, loco) { R.puffs = R.puffs || []; if (R.puffs.length > 12)
return; var s = wGlow(0xF4F4F4, 0.12, 0.35); s.material = s.material.clone(); s.material.blending = THREE.NormalBlending; s.material.opacity = 0.35; var v = new THREE.Vector3(0, 0.36, 0.2); loco.localToWorld(v); R.tbl.worldToLocal(v); s.position.copy(v); R.tbl.add(s); R.puffs.push({ s: s, t: 0 }); },
function () {
var D = swTrainData(), total = swTrainPieces(D), fns = {}, h = "";
h += "<div class='sw-card'><div class='sw-h'>1. Choose a layout</div>";
Object.keys(SW_LAYOUTS).forEach(function (k) { var L = SW_LAYOUTS[k]; h += swBtn("lay_" + k, L.n, L.sub, { on: D.layout === k }); fns["lay_" + k] = function () { if (D.layout !== k) {
D.layout = k;
D.laid = 0;
D.run = false;
swSave();
swTrainsBuild();
} swTrainCard(); }; });
h += "</div><div class='sw-card'><div class='sw-h'>2. Lay the track</div><div class='sw-tip'>" + Math.min(D.laid, total) + " of " + total + " pieces laid.</div>";
h += swBtn("one", "➕ Lay the next piece", "one at a time") + swBtn("five", "➕➕ Lay five pieces", "") + swBtn("all", "✔️ Lay it all", "") + swBtn("up", "↩️ Take up the track", "start again");
fns.one = function () { D.laid = Math.min(total, D.laid + 1); swSave(); swTrainsBuild(); swTrainCard(); };
fns.five = function () { D.laid = Math.min(total, D.laid + 5); swSave(); swTrainsBuild(); swTrainCard(); };
fns.all = function () { D.laid = total; swSave(); swTrainsBuild(); swTrainCard(); };
fns.up = function () { D.laid = 0; D.run = false; swSave(); swTrainsBuild(); swTrainCard(); };
h += "</div><div class='sw-card'><div class='sw-h'>3. Choose your train" + (D.layout === "twin" ? "s" : "") + "</div>";
for (var li = 0; li < (D.layout === "twin" ? 2 : 1); li++) {
(function (li) {
h += "<div class='sw-tip'>" + (li ? "Inner line" : "Line") + ":</div>";
Object.keys(SW_ENGINES).forEach(function (k) { var E = SW_ENGINES[k]; h += swBtn("e" + li + k, E.i + " " + E.n, "", { small: 1, on: D.eng[li] === k }); fns["e" + li + k] = function () { D.eng[li] = k; swSave(); swTrainsBuild(); swTrainCard(); }; });
h += "<br>";
Object.keys(SW_CARS).forEach(function (k) { var C = SW_CARS[k]; h += swBtn("c" + li + k, C.i + " " + C.n, "", { small: 1, on: D.cars[li] === k }); fns["c" + li + k] = function () { D.cars[li] = k; swSave(); swTrainsBuild(); swTrainCard(); }; });
})(li);
}
h += "</div><div class='sw-card'><div class='sw-h'>4. Scenery</div>";
SW_SCENERY.forEach(function (s) { h += swBtn("s_" + s[0], s[1], "", { small: 1, on: !!D.scen[s[0]] }); fns["s_" + s[0]] = function () { D.scen[s[0]] = D.scen[s[0]] ? 0 : 1; swSave(); swTrainsBuild(); swTrainCard(); }; });
h += "</div><div class='sw-card'><div class='sw-h'>5. Run</div>";
if (D.laid < total)
h += "<div class='sw-tip'>Lay all the track first: then the trains come out of the shed.</div>";
else {
h += swBtn("go", D.run ? "⏸️ Stop the trains" : "▶️ Start the trains", "", { big: 0, col: D.run ? "#8A7A6A" : "#5A8A5A" });
fns.go = function () { D.run = !D.run; swSave(); if (D.run)
swDid("train"); swTrainCard(); };
["🐢 Very slow", "🚶 Slow", "🚲 Steady"].forEach(function (l, i) { h += swBtn("sp" + i, l, "", { small: 1, on: D.speed === i + 1 }); fns["sp" + i] = function () { D.speed = i + 1; swSave(); swTrainCard(); }; });
h += "<br>" + swBtn("ride", "🪟 Ride in the cab", "sit in the engine as it goes round");
fns.ride = function () { swPanelClose(); swCabRide(); };
}
h += "</div>";
var b = swPanel("🚂 The Train Room", h, null);
swBind(b, fns);
},
function () {
var R = SW_ROOMS.trains;
if (!R || !R.trains || !R.trains.length) {
setStatus("🚂 Lay all the track and start the trains at the control desk first.");
return;
}
var D = swTrainData();
if (!D.run) {
D.run = true;
swSave();
}
SW.cab = { T: R.trains[0], back: { x: camera.position.x, y: camera.position.y, z: camera.position.z, yaw: yaw } };
setStatus("🪟 <b>In the cab.</b> Look about as you like. Press <b>E</b> (or Go home) to step out.");
swSay("You are riding in the cab. Press E to step out.");
worldPrompt("🪟 <b>press E</b> to step out of the cab", swCabOut);
},
function () {
if (SWB.sc)
return;
var s = new THREE.Scene();
s.background = new THREE.Color(0xE6DED0);
s.add(new THREE.HemisphereLight(0xFFF8EC, 0x7A6A58, 0.7));
var d = new THREE.DirectionalLight(0xFFF0DC, 0.78);
d.position.set(30, 70, 45);
s.add(d);
var d2 = new THREE.DirectionalLight(0xD8E4FF, 0.32);
d2.position.set(-50, 25, -30);
s.add(d2);
SWB.sc = s;
SWB.cam = new THREE.PerspectiveCamera(38, 1, 0.05, 4000);
SWB.tg = new THREE.Vector3();
SWB.ray = new THREE.Raycaster();
var rv = renderView;
renderView = function () {
if (SWB.on && !(renderer.xr && renderer.xr.isPresenting)) {
try {
swBenchFrame();
return;
}
catch (e) {
if (!SWB.e1) {
SWB.e1 = 1;
if (window.console)
console.warn("[stillwater] bench", e);
}
}
}
return rv.apply(this, arguments);
};
},
function () {
var now = performance.now(), dt = Math.min(0.1, (now - (SWB.last || now)) / 1000);
SWB.last = now;
SWB.t += dt;
for (var i = SWB.anim.length - 1; i >= 0; i--) {
var A = SWB.anim[i];
A.t += dt;
var k = Math.min(1, A.t / A.d);
try {
A.f(k, dt);
}
catch (e) {
k = 1;
}
if (k >= 1 && !A.keep) {
SWB.anim.splice(i, 1);
if (A.done)
try {
A.done();
}
catch (e) { }
}
}
if (SWB.o && SWB.o.tick)
try {
SWB.o.tick(dt);
}
catch (e) { }
var el = renderer.domElement, W = el.clientWidth || innerWidth, H = el.clientHeight || innerHeight, c = SWB.cam, ox = 0, oy = 0;
if (SWB.side && SWB.side.offsetParent) {
if (SWB.narrow)
oy = SWB.side.offsetHeight / 2;
else
ox = SWB.side.offsetWidth / 2;
}
c.aspect = W / H;
c.setViewOffset(W, H, ox, oy, W, H);
c.updateProjectionMatrix();
var sp = Math.sin(SWB.ph);
c.position.set(SWB.tg.x + SWB.r * sp * Math.sin(SWB.th), SWB.tg.y + SWB.r * Math.cos(SWB.ph), SWB.tg.z + SWB.r * sp * Math.cos(SWB.th));
c.lookAt(SWB.tg);
renderer.setRenderTarget(null);
renderer.render(SWB.sc, c);
},
function (title, o) {
swBenchInit();
swBenchClear();
SWB.o = o;
SWB.root = new THREE.Group();
SWB.sc.add(SWB.root);
SWB.anim = [];
SWB.r = o.r || 30;
SWB.th = o.th === undefined ? 0.6 : o.th;
SWB.ph = o.ph === undefined ? 0.95 : o.ph;
var T = o.tg || [0, 0, 0];
SWB.tg.set(T[0], T[1], T[2]);
SWB.sc.background.setHex(o.bg || 0xE6DED0);
if (o.table !== false) {
var tb = o.table || {}, tw = tb.w || 80, td = tb.d || 60, tm = new THREE.MeshLambertMaterial({ color: tb.col || 0xC09868 });
var tt = swTexK(tb.kind || "wood");
if (tt)
tm.map = tt;
var top = new THREE.Mesh(new THREE.BoxGeometry(tw, 1, td), tm);
top.position.y = -0.5 - (tb.y || 0);
SWB.root.add(top);
SWB.own(top);
if (tb.mat !== false) {
var mm = new THREE.Mesh(new THREE.PlaneGeometry(tw * 0.86, td * 0.86), new THREE.MeshLambertMaterial({ color: tb.matCol || 0x4A6A5A }));
mm.rotation.x = -Math.PI / 2;
mm.position.y = 0.005 - (tb.y || 0);
SWB.root.add(mm);
SWB.own(mm);
}
}
SWB.narrow = innerWidth < 760;
var b = swPanel(title, "<div class='sw-view'></div><div class='" + (SWB.narrow ? "sw-bar" : "sw-side") + "'></div>", function () { swBenchClose(); }, { clear: 1, keys: function (e) { swBenchKey(e); } });
SWB.view = b.querySelector(".sw-view");
SWB.side = b.querySelector(".sw-side,.sw-bar");
if (!document.getElementById("sw-bench-css")) {
var st = document.createElement("style");
st.id = "sw-bench-css";
st.textContent = ".sw-view{position:absolute;inset:0;touch-action:none;cursor:grab}.sw-view.brush{cursor:crosshair}.sw-side .sw-h,.sw-bar .sw-h{font-size:16px}.sw-side .swb,.sw-bar .swb{min-width:0}.sw-cnt{font:600 15px system-ui;color:#2E4A3A;margin:4px 0}.sw-row{display:flex;flex-wrap:wrap;align-items:center;gap:2px}";
document.head.appendChild(st);
}
swBenchPointer(SWB.view);
SWB.on = true;
SWB.last = 0;
return SWB;
},
function () {
if (SWB.root) {
SWB.sc.remove(SWB.root);
}
(SWB.owned || []).forEach(function (m) { try {
if (m.geometry && !m.geometry.userData.keep)
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : [m.material];
ms.forEach(function (x) { if (x && !x.userData.keep)
x.dispose(); });
}
catch (e) { } });
SWB.owned = [];
SWB.root = null;
SWB.anim = [];
},
function (v) {
SWB.ptrs = {};
SWB.down = null;
function hitAt(ev) {
var r = renderer.domElement.getBoundingClientRect();
var m = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
SWB.ray.setFromCamera(m, SWB.cam);
var list = (SWB.o && SWB.o.targets) ? SWB.o.targets() : SWB.root.children;
var h = SWB.ray.intersectObjects(list, true);
return h;
}
v.onpointerdown = function (ev) {
v.setPointerCapture && v.setPointerCapture(ev.pointerId);
SWB.ptrs[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
var n = Object.keys(SWB.ptrs).length;
if (n === 1) {
SWB.down = { x: ev.clientX, y: ev.clientY, moved: 0, brush: !!(SWB.o && SWB.o.tool && SWB.o.tool()) };
if (SWB.down.brush && SWB.o.brush) {
var h = hitAt(ev);
if (h.length)
SWB.o.brush(h, ev, true);
}
}
else
SWB.down = null;
ev.preventDefault();
};
v.onpointermove = function (ev) {
var P = SWB.ptrs[ev.pointerId];
if (!P)
return;
var ids = Object.keys(SWB.ptrs);
if (ids.length === 2) {
var a = SWB.ptrs[ids[0]], b = SWB.ptrs[ids[1]], d0 = Math.hypot(a.x - b.x, a.y - b.y);
P.x = ev.clientX;
P.y = ev.clientY;
var d1 = Math.hypot(a.x - b.x, a.y - b.y);
if (d0 > 0 && d1 > 0)
swBenchZoom(d0 / d1);
return;
}
var dx = ev.clientX - P.x, dy = ev.clientY - P.y;
P.x = ev.clientX;
P.y = ev.clientY;
var D = SWB.down;
if (!D)
return;
D.moved += Math.abs(dx) + Math.abs(dy);
if (D.brush && SWB.o.brush) {
var h = hitAt(ev);
if (h.length)
SWB.o.brush(h, ev, false, dx, dy);
return;
}
SWB.th -= dx * 0.0065;
SWB.ph = Math.max(0.12, Math.min(1.5, SWB.ph - dy * 0.0055));
};
v.onpointerup = v.onpointercancel = function (ev) {
var D = SWB.down;
delete SWB.ptrs[ev.pointerId];
if (D && D.moved < 7 && !D.brush && SWB.o && SWB.o.pick) {
var h = hitAt(ev);
try {
SWB.o.pick(h, ev);
}
catch (e) {
if (window.console)
console.warn("[stillwater] pick", e);
}
}
if (D && D.brush && SWB.o && SWB.o.brushEnd)
try {
SWB.o.brushEnd();
}
catch (e) { }
if (!Object.keys(SWB.ptrs).length)
SWB.down = null;
};
v.onwheel = function (ev) { ev.preventDefault(); swBenchZoom(1 + Math.max(-0.3, Math.min(0.3, ev.deltaY * 0.0012))); };
},
function (e) {
var k = e.key;
if (k === "ArrowLeft" || k === "a")
SWB.th += 0.08;
else if (k === "ArrowRight" || k === "d")
SWB.th -= 0.08;
else if (k === "ArrowUp" || k === "w")
SWB.ph = Math.max(0.12, SWB.ph - 0.06);
else if (k === "ArrowDown" || k === "s")
SWB.ph = Math.min(1.5, SWB.ph + 0.06);
else if (k === "+" || k === "=")
swBenchZoom(0.9);
else if (k === "-" || k === "_")
swBenchZoom(1.1);
else if (SWB.o && SWB.o.key)
SWB.o.key(e);
},
function (k) {
if (SWB.geo[k])
return SWB.geo[k];
var g, lite = !!SW.lite;
if (k === "box")
g = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
else if (k === "cbox")
g = new THREE.BoxGeometry(1, 1, 1);
else if (k === "stud")
g = new THREE.CylinderGeometry(0.3, 0.3, 0.18, lite ? 8 : 14).translate(0, 0.09, 0);
else if (k === "log") {
g = new THREE.CylinderGeometry(1, 1, 1, lite ? 8 : 12, 1);
g.rotateZ(Math.PI / 2);
}
else if (k === "pillar")
g = new THREE.CylinderGeometry(0.5, 0.5, 2, lite ? 10 : 18).translate(0, 1, 0);
else if (k === "arch") {
var s = new THREE.Shape();
s.moveTo(-1, 0);
s.lineTo(-0.6, 0);
s.absarc(0, 0, 0.6, Math.PI, 0, true);
s.lineTo(1, 0);
s.lineTo(1, 1);
s.lineTo(-1, 1);
s.lineTo(-1, 0);
g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, curveSegments: lite ? 6 : 12 });
g.translate(0, 0, -0.5);
}
else if (k === "roof") {
var s2 = new THREE.Shape();
s2.moveTo(-1, 0);
s2.lineTo(1, 0);
s2.lineTo(0, 1);
s2.lineTo(-1, 0);
g = new THREE.ExtrudeGeometry(s2, { depth: 1, bevelEnabled: false });
g.translate(0, 0, -0.5);
}
else if (k === "half") {
g = new THREE.CylinderGeometry(0.5, 0.5, 1, lite ? 8 : 16, 1, false, 0, Math.PI);
g.rotateX(Math.PI / 2);
g.rotateY(Math.PI / 2);
}
else if (k === "domino")
g = new THREE.BoxGeometry(0.5, 1, 0.16).translate(0, 0.5, 0);
else if (k === "cone")
g = new THREE.ConeGeometry(0.5, 1, lite ? 8 : 14).translate(0, 0.5, 0);
else
g = new THREE.BoxGeometry(1, 1, 1);
g.userData.keep = 1;
return (SWB.geo[k] = g);
},
function (k) {
if (SWB.mat[k])
return SWB.mat[k];
var m;
if (k === "plastic")
m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shininess: 70, specular: 0x3A3A3A });
else if (k === "wood") {
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
var t = swTexK("wood");
if (t)
m.map = t;
}
else if (k === "paint")
m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shininess: 30, specular: 0x222222 });
else if (k === "ghost")
m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.38, depthWrite: false, shininess: 90, emissive: new THREE.Color(0x2A2A2A) });
else
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
m.userData.keep = 1;
return (SWB.mat[k] = m);
},
function (parent, P, ghost, mats) {
var by = {}, out = [], M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), V = new THREE.Vector3(), S = new THREE.Vector3(), C = new THREE.Color();
P.forEach(function (p, i) { var k = p.g + "|" + (ghost ? "ghost" : p.m); (by[k] = by[k] || { g: p.g, m: ghost ? "ghost" : p.m, L: [] }).L.push(i); });
for (var k in by) {
var B = by[k];
var im = new THREE.InstancedMesh(swBGeo(B.g), (mats && mats(B.m)) || swBMat(B.m), B.L.length);
im.userData.part = [];
B.L.forEach(function (pi, j) { var p = P[pi]; E.set(p.rx || 0, p.ry || 0, p.rz || 0); Q.setFromEuler(E); V.set(p.x, p.y, p.z); S.set(p.sx || 1, p.sy || 1, p.sz || 1); M.compose(V, Q, S); im.setMatrixAt(j, M); C.setHex(p.c === undefined ? 0xFFFFFF : p.c); im.setColorAt(j, C); im.userData.part.push(p.i); });
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.frustumCulled = false;
parent.add(im);
out.push(im);
}
return out;
},
function () {
var M = {}, o = { M: M,
set: function (x, y, z, c) { M[x + "," + y + "," + z] = c; }, del: function (x, y, z) { delete M[x + "," + y + "," + z]; }, get: function (x, y, z) { return M[x + "," + y + "," + z]; },
box: function (x0, y0, z0, x1, y1, z1, c, hollow) { for (var x = x0; x <= x1; x++)
for (var y = y0; y <= y1; y++)
for (var z = z0; z <= z1; z++)
if (!hollow || x === x0 || x === x1 || z === z0 || z === z1)
o.set(x, y, z, c); },
clear: function (x0, y0, z0, x1, y1, z1) { for (var x = x0; x <= x1; x++)
for (var y = y0; y <= y1; y++)
for (var z = z0; z <= z1; z++)
o.del(x, y, z); },
cyl: function (cx, cz, r, y0, y1, c, th) { var R = Math.ceil(r); for (var x = Math.floor(cx - R); x <= cx + R; x++)
for (var z = Math.floor(cz - R); z <= cz + R; z++) {
var d = Math.hypot(x + 0.5 - cx, z + 0.5 - cz);
if (d <= r && (!th || d > r - th))
for (var y = y0; y <= y1; y++)
o.set(x, y, z, typeof c === "function" ? c(y, x, z) : c);
} },
ell: function (cx, cy, cz, rx, ry, rz, c, ymin) { for (var x = Math.floor(cx - rx); x <= cx + rx; x++)
for (var y = Math.max(ymin || 0, Math.floor(cy - ry)); y <= cy + ry; y++)
for (var z = Math.floor(cz - rz); z <= cz + rz; z++) {
var a = (x + 0.5 - cx) / rx, b = (y + 0.5 - cy) / ry, d = (z + 0.5 - cz) / rz;
if (a * a + b * b + d * d <= 1)
o.set(x, y, z, c);
} }
};
return o;
},
function (V) {
var L = {};
for (var k in V.M) {
var a = k.split(",");
var y = +a[1];
(L[y] = L[y] || {})[a[0] + "," + a[2]] = V.M[k];
}
var out = [], sizes = [[2, 4], [2, 3], [2, 2], [1, 4], [1, 3], [1, 2], [1, 1]];
Object.keys(L).map(Number).sort(function (a, b) { return a - b; }).forEach(function (y) {
var C = L[y], used = {}, keys = Object.keys(C).map(function (s) { var a = s.split(","); return [+a[0], +a[1]]; });
var odd = y % 2 === 1;
keys.sort(function (p, q) { return odd ? (p[1] - q[1] || p[0] - q[0]) : (p[0] - q[0] || p[1] - q[1]); });
keys.forEach(function (K) {
var x = K[0], z = K[1], id = x + "," + z;
if (used[id])
return;
var c = C[id];
for (var s = 0; s < sizes.length; s++) {
var opts = odd ? [[sizes[s][1], sizes[s][0]], sizes[s]] : [sizes[s], [sizes[s][1], sizes[s][0]]];
for (var o = 0; o < 2; o++) {
var w = opts[o][0], d = opts[o][1], ok = true;
for (var i = 0; i < w && ok; i++)
for (var j = 0; j < d && ok; j++) {
var q = (x + i) + "," + (z + j);
if (C[q] !== c || used[q])
ok = false;
}
if (ok) {
for (var i2 = 0; i2 < w; i2++)
for (var j2 = 0; j2 < d; j2++)
used[(x + i2) + "," + (z + j2)] = 1;
out.push({ x: x, y: y, z: z, w: w, d: d, c: c });
return;
}
}
}
});
});
return out;
},
function (V) {
V.box(0, 0, 0, 5, 0, 5, SWC.green);
V.box(1, 1, 1, 4, 2, 4, SWC.orange);
V.box(2, 3, 2, 3, 3, 3, SWC.brown);
V.box(2, 4, 2, 2, 8, 2, SWC.green);
V.box(3, 6, 2, 4, 6, 2, SWC.green);
V.box(1, 9, 1, 3, 9, 3, SWC.red);
V.set(2, 10, 2, SWC.yellow);
V.set(2, 9, 0, SWC.red);
V.set(2, 9, 4, SWC.red);
V.set(0, 9, 2, SWC.red);
V.set(4, 9, 2, SWC.red);
V.set(2, 10, 1, SWC.red);
V.set(2, 10, 3, SWC.red);
V.set(1, 10, 2, SWC.red);
V.set(3, 10, 2, SWC.red);
},
function (V) {
V.box(0, 0, 0, 13, 0, 7, SWC.grey);
V.box(1, 1, 1, 12, 2, 6, SWC.blue);
V.box(4, 3, 1, 9, 5, 6, SWC.blue, true);
V.box(4, 6, 1, 9, 6, 6, SWC.blue);
V.box(5, 3, 1, 8, 5, 1, SWC.glass);
V.box(5, 3, 6, 8, 5, 6, SWC.glass);
V.box(9, 3, 2, 9, 5, 5, SWC.glass);
V.box(4, 3, 2, 4, 5, 5, SWC.glass);
[[2, 0], [10, 0], [2, 7], [10, 7]].forEach(function (w) { V.box(w[0], 0, w[1], w[0] + 1, 1, w[1], SWC.black); });
V.set(12, 2, 2, SWC.yellow);
V.set(12, 2, 5, SWC.yellow);
V.set(1, 2, 2, SWC.red);
V.set(1, 2, 5, SWC.red);
},
function (V) {
V.box(0, 0, 0, 23, 0, 23, SWC.green);
for (var x = 0; x < 24; x += 3)
V.box(x, 0, 0, x, 0, 23, SWC.dgreen);
V.cyl(12, 12, 8, 1, 2, SWC.grey);
for (var y = 3; y <= 30; y++) {
var r = 7.2 - y * 0.12;
V.cyl(12, 12, r, y, y, y % 6 === 0 ? SWC.tan : SWC.cream, 1.3);
}
V.box(11, 3, 4, 13, 7, 4, SWC.brown);
[10, 17, 24].forEach(function (y) { V.set(12, y, 5, SWC.glass); V.set(12, y, 6, SWC.glass); V.set(19, y, 12, SWC.glass); });
V.ell(12, 31, 12, 5, 4, 5, SWC.brown, 31);
V.box(12, 33, 4, 12, 33, 8, SWC.black);
for (var i = -15; i <= 15; i++) {
if (Math.abs(i) < 1)
continue;
V.set(12 + i, 33, 3, SWC.brown);
V.set(12, 33 + i, 3, SWC.brown);
}
for (var s = 2; s <= 14; s++) {
for (var w = 1; w <= 3; w++) {
V.set(12 + s, 33 + w, 3, s % 3 ? SWC.white : SWC.brown);
V.set(12 - s, 33 - w, 3, s % 3 ? SWC.white : SWC.brown);
V.set(12 - w, 33 + s, 3, s % 3 ? SWC.white : SWC.brown);
V.set(12 + w, 33 - s, 3, s % 3 ? SWC.white : SWC.brown);
}
}
V.box(1, 1, 18, 6, 1, 22, SWC.yellow);
V.box(1, 2, 18, 6, 2, 18, SWC.white);
},
function (V) {
var L = 96, cz = 10;
V.box(-6, 0, -6, L + 5, 0, 2 * cz + 6, SWC.blue);
for (var q = -6; q <= L + 5; q += 4)
V.box(q, 0, -6, q + 1, 0, 2 * cz + 6, SWC.lblue);
function hw(x) { var u = x / L; return u < 0.12 ? cz * Math.sqrt(u / 0.12) : u > 0.86 ? cz * Math.max(0.15, 1 - (u - 0.86) / 0.14 * 0.85) : cz; }
for (var x = 0; x <= L; x++) {
var w = hw(x);
for (var y = 1; y <= 14; y++) {
var ww = w * (y < 4 ? 0.75 + y * 0.07 : 1);
var col = y <= 4 ? SWC.red : y === 5 ? SWC.white : SWC.black;
if (y >= 11 && y <= 12 && x % 3 === 1)
col = SWC.yellow;
V.set(x, y, Math.round(cz - ww), col);
V.set(x, y, Math.round(cz + ww), col);
for (var z = Math.round(cz - ww) + 1; z < Math.round(cz + ww); z++) {
if (y === 1 || y === 14)
V.set(x, y, z, y === 14 ? SWC.tan : SWC.red);
}
}
}
[[8, L - 10, 15, 22, cz - 8], [14, L - 18, 23, 30, cz - 7], [22, L - 28, 31, 36, cz - 6]].forEach(function (D, di) {
for (var y = D[2]; y <= D[3]; y++) {
var lit = (y - D[2]) % 3 === 1;
for (var x = D[0]; x <= D[1]; x++) {
var c = lit && x % 2 === 0 ? SWC.glass : SWC.white;
V.set(x, y, cz - D[4], c);
V.set(x, y, cz + D[4], c);
}
for (var z = cz - D[4]; z <= cz + D[4]; z++) {
V.set(D[0], y, z, lit && z % 2 ? SWC.glass : SWC.white);
V.set(D[1], y, z, SWC.white);
}
}
V.box(D[0], D[3] + 1, cz - D[4], D[1], D[3] + 1, cz + D[4], SWC.tan);
});
[26, 40, 54, 68].forEach(function (fx) { V.cyl(fx + 0.5, cz + 0.5, 3.4, 37, 52, function (y) { return y >= 48 ? SWC.black : SWC.red; }, 1.2); });
for (var b = 0; b < 10; b++) {
var bx = 16 + b * 6;
[cz - 9, cz + 9].forEach(function (z) { V.box(bx, 24, z, bx + 3, 25, z, SWC.orange); V.box(bx, 26, z, bx, 27, z, SWC.grey); V.box(bx + 3, 26, z, bx + 3, 27, z, SWC.grey); });
}
V.box(4, 37, cz, 4, 52, cz, SWC.brown);
V.box(L - 6, 37, cz, L - 6, 48, cz, SWC.brown);
V.box(L - 14, 31, cz - 5, L - 10, 34, cz + 5, SWC.white);
V.box(L - 14, 33, cz - 5, L - 14, 33, cz + 5, SWC.glass);
},
function (V) {
var cy = 28;
V.box(0, 0, 0, 79, 0, 49, SWC.black);
for (var st = 0; st < 120; st++) {
var a = (st * 37) % 80, b = (st * 53) % 50;
V.set(a, 0, b, st % 5 ? SWC.white : SWC.yellow);
}
V.box(36, 1, 22, 43, cy - 6, 27, SWC.grey, true);
for (var x = 4; x <= 75; x++) {
[[22, cy - 1], [27, cy - 1], [22, cy + 2], [27, cy + 2]].forEach(function (p) { V.set(x, p[1], p[0], SWC.grey); });
if (x % 4 === 0) {
V.box(x, cy - 1, 22, x, cy + 2, 22, SWC.white);
V.box(x, cy - 1, 27, x, cy + 2, 27, SWC.white);
V.box(x, cy - 1, 22, x, cy - 1, 27, SWC.white);
V.box(x, cy + 2, 22, x, cy + 2, 27, SWC.white);
}
}
for (var t = 0; t < 360; t += 1.2) {
var a2 = t * Math.PI / 180;
for (var w = -1; w <= 1; w++) {
var r = 15;
var px = 40 + Math.cos(a2) * r, py = cy + Math.sin(a2) * r * 0.95;
V.set(Math.round(px), Math.round(py), 24 + w, w === 0 && Math.round(t) % 12 === 0 ? SWC.glass : SWC.white);
V.set(Math.round(px), Math.round(py), 26 - w, SWC.white);
}
}
[[33, 0], [47, 0], [40, 7], [40, -7]].forEach(function (m) { V.cyl(m[0] + 0.5, 25.5 + m[1], 3.5, cy + 3, cy + 12, function (y) { return y === cy + 7 ? SWC.glass : SWC.white; }, 1.2); V.cyl(m[0] + 0.5, 25.5 + m[1], 3.5, cy + 13, cy + 13, SWC.grey); });
[[6, 20], [6, 30], [64, 20], [64, 30]].forEach(function (p) { var z0 = p[1] > 25 ? 28 : 3, z1 = p[1] > 25 ? 46 : 21; for (var x = p[0]; x <= p[0] + 11; x++)
for (var z = z0; z <= z1; z++) {
var edge = (x === p[0] || x === p[0] + 11 || z === z0 || z === z1);
V.set(x, cy, z, edge ? SWC.grey : ((x + z) % 4 === 0 ? SWC.lblue : SWC.blue));
} V.box(p[0] + 5, cy, p[1] > 25 ? 27 : 22, p[0] + 6, cy, p[1] > 25 ? 28 : 21, SWC.grey); });
V.box(76, cy - 2, 23, 79, cy + 3, 26, SWC.grey, true);
for (var s = 0; s < 14; s++) {
var w2 = Math.max(1, 4 - Math.floor(s / 4));
V.box(80 + s, cy - 1, 25 - w2, 80 + s, cy + 1, 25 + w2 - 1, s > 11 ? SWC.black : SWC.white);
}
V.box(84, cy + 2, 23, 88, cy + 2, 27, SWC.white);
V.box(82, cy, 22, 83, cy, 28, SWC.black);
},
function (V) {
var cols = [SWC.red, SWC.yellow, SWC.lblue, SWC.cream, SWC.green, SWC.orange, SWC.white, SWC.tan];
V.box(0, 0, 0, 99, 0, 79, SWC.blue);
for (var q = 0; q < 100; q += 5)
for (var z = 36; z < 80; z += 7)
V.box(q, 0, z, q + 1, 0, z, SWC.lblue);
V.box(0, 0, 0, 99, 3, 33, SWC.grey);
V.box(0, 4, 0, 99, 4, 33, SWC.tan);
for (var x = 0; x < 100; x += 4)
V.box(x, 1, 33, x + 1, 3, 33, SWC.white);
for (var h = 0; h < 8; h++) {
var hx = 2 + h * 12;
swGenHouse(V, hx, 4, 11, 13, 12 + (h % 3) * 4, { base: SWC.tan, wall: cols[h], corner: SWC.white, roof: [SWC.red, SWC.grey, SWC.dgreen][h % 3], chim: 1 });
for (var y = 8; y <= 14 + (h % 3) * 4; y += 4)
V.box(hx + 2, y, 15, hx + 8, y, 15, SWC.white);
}
V.box(60, 0, 34, 67, 4, 64, SWC.grey);
V.box(60, 5, 34, 67, 5, 64, SWC.tan);
swPut(V, swGenLighthouse, 58, 5, 58);
swPut(V, swGenShip, 14, 1, 44, false);
[[10, 30], [40, 30], [85, 30]].forEach(function (c) { V.box(c[0], 5, c[1], c[0] + 1, 22, c[1] + 1, SWC.yellow); for (var a = 0; a < 12; a++)
V.set(c[0] + 1, 22, c[1] + 1 + a, SWC.yellow); V.box(c[0] + 1, 15, c[1] + 12, c[0] + 1, 21, c[1] + 12, SWC.black); V.box(c[0] - 1, 5, c[1] - 1, c[0] + 2, 6, c[1] + 2, SWC.grey); });
[[74, 44, SWC.red], [80, 56, SWC.white], [88, 40, SWC.yellow], [74, 68, SWC.green], [90, 62, SWC.orange]].forEach(function (b) { V.box(b[0], 1, b[1], b[0] + 7, 2, b[1] + 3, b[2]); V.box(b[0] + 1, 3, b[1] + 1, b[0] + 6, 3, b[1] + 2, SWC.brown); V.box(b[0] + 3, 4, b[1] + 1, b[0] + 3, 10, b[1] + 1, SWC.brown); V.box(b[0] + 4, 5, b[1] + 1, b[0] + 6, 9, b[1] + 1, SWC.white); });
for (var cr = 0; cr < 14; cr++) {
var cx = 4 + cr * 7;
V.box(cx, 5, 28, cx + 2, 6, 30, [SWC.brown, SWC.blue, SWC.red][cr % 3]);
}
},
function (V) {
var W = 96, D = 80;
V.box(0, 0, 0, W + 11, 0, D + 11, SWC.green);
for (var i = 0; i <= W + 11; i++)
for (var w = 2; w <= 4; w++) {
V.set(i, 0, w, SWC.blue);
V.set(i, 0, D + 11 - w, SWC.blue);
}
for (var j = 0; j <= D + 11; j++)
for (var w2 = 2; w2 <= 4; w2++) {
V.set(w2, 0, j, SWC.blue);
V.set(W + 11 - w2, 0, j, SWC.blue);
}
var x0 = 7, z0 = 7, x1 = W + 4, z1 = D + 4;
for (var y = 1; y <= 16; y++) {
V.box(x0, y, z0, x1, y, z0 + 1, SWC.grey);
V.box(x0, y, z1 - 1, x1, y, z1, SWC.grey);
V.box(x0, y, z0, x0 + 1, y, z1, SWC.grey);
V.box(x1 - 1, y, z0, x1, y, z1, SWC.grey);
}
for (var x = x0; x <= x1; x += 2) {
V.set(x, 17, z0, SWC.grey);
V.set(x, 17, z1, SWC.grey);
}
for (var z = z0; z <= z1; z += 2) {
V.set(x0, 17, z, SWC.grey);
V.set(x1, 17, z, SWC.grey);
}
[[x0, z0], [x1, z0], [x0, z1], [x1, z1], [(x0 + x1) >> 1, z0], [x0, (z0 + z1) >> 1], [x1, (z0 + z1) >> 1], [(x0 + x1) >> 1, z1]].forEach(function (p, pi) {
if (pi === 7)
return;
V.cyl(p[0] + 0.5, p[1] + 0.5, 5.5, 1, 24, SWC.grey, 1.6);
V.cyl(p[0] + 0.5, p[1] + 0.5, 5.8, 25, 25, SWC.grey);
for (var k = 0; k < 10; k++) {
var r = 6 * (1 - k / 10);
if (r > 0.6)
V.cyl(p[0] + 0.5, p[1] + 0.5, r, 26 + k, 26 + k, pi % 2 ? SWC.blue : SWC.red);
}
V.box(p[0], 36, p[1], p[0], 38, p[1], SWC.yellow);
for (var wy = 6; wy <= 20; wy += 7)
V.set(p[0], wy, p[1] + (p[1] < 40 ? 6 : -6), SWC.black);
});
var gx = (x0 + x1) >> 1;
V.box(gx - 8, 1, z1 - 3, gx + 8, 22, z1 + 2, SWC.grey, true);
V.clear(gx - 3, 1, z1 - 3, gx + 3, 9, z1 + 2);
V.box(gx - 3, 1, z1 + 2, gx + 3, 9, z1 + 2, SWC.brown);
V.box(gx - 3, 10, z1 + 2, gx + 3, 10, z1 + 2, SWC.black);
V.box(gx - 3, 0, z1 + 3, gx + 3, 0, z1 + 6, SWC.brown);
for (var gxi = gx - 8; gxi <= gx + 8; gxi += 2)
V.set(gxi, 23, z1 + 2, SWC.grey);
V.box(gx - 1, 15, z1 + 2, gx + 1, 17, z1 + 2, SWC.yellow);
var kx0 = gx - 12, kx1 = gx + 12, kz0 = z0 + 10, kz1 = z0 + 30;
V.box(kx0, 1, kz0, kx1, 34, kz1, SWC.cream, true);
V.box(kx0, 35, kz0, kx1, 35, kz1, SWC.tan);
for (var kx = kx0; kx <= kx1; kx += 2) {
V.set(kx, 36, kz0, SWC.tan);
V.set(kx, 36, kz1, SWC.tan);
}
for (var kz = kz0; kz <= kz1; kz += 2) {
V.set(kx0, 36, kz, SWC.tan);
V.set(kx1, 36, kz, SWC.tan);
}
for (var ky = 5; ky <= 31; ky += 5)
for (var kx2 = kx0 + 3; kx2 <= kx1 - 3; kx2 += 4) {
V.box(kx2, ky, kz1, kx2 + 1, ky + 2, kz1, SWC.glass);
V.box(kx2, ky, kz0, kx2 + 1, ky + 2, kz0, SWC.glass);
}
V.box(gx - 2, 1, kz1, gx + 2, 6, kz1, SWC.brown);
[[kx0, kz0], [kx1, kz0], [kx0, kz1], [kx1, kz1]].forEach(function (p) { V.cyl(p[0] + 0.5, p[1] + 0.5, 3.5, 1, 42, SWC.cream, 1.2); for (var k = 0; k < 9; k++) {
var r = 4 * (1 - k / 9);
if (r > 0.6)
V.cyl(p[0] + 0.5, p[1] + 0.5, r, 43 + k, 43 + k, SWC.blue);
} V.box(p[0], 52, p[1], p[0], 54, p[1], SWC.yellow); });
swGenHouse(V, x0 + 6, z0 + 40, 22, 14, 12, { wall: SWC.tan, corner: SWC.cream, roof: SWC.red });
swGenHouse(V, x1 - 27, z0 + 40, 22, 14, 12, { wall: SWC.tan, corner: SWC.cream, roof: SWC.red });
for (var g = 0; g < 4; g++) {
var gz = z0 + 60 + (g >> 1) * 6, gxx = gx - 16 + (g & 1) * 20;
V.box(gxx, 1, gz, gxx + 11, 1, gz + 3, SWC.dgreen);
for (var f = 0; f < 6; f++)
V.set(gxx + 1 + f * 2, 2, gz + 1, [SWC.red, SWC.yellow, SWC.purple][f % 3]);
}
V.cyl(gx + 0.5, z0 + 64.5, 3, 1, 2, SWC.grey);
V.cyl(gx + 0.5, z0 + 64.5, 2, 2, 2, SWC.lblue);
},
function (V, x0, z0, W, D, H, o) {
if (o.base !== undefined)
V.box(x0, 0, z0, x0 + W - 1, 0, z0 + D - 1, o.base);
var a = x0 + 1, b = x0 + W - 2, c = z0 + 1, d = z0 + D - 2, y0 = o.base !== undefined ? 1 : 0, top = y0 + H - 1;
V.box(a, y0, c, b, top, d, o.wall, true);
if (o.corner !== undefined)
for (var y = y0; y <= top; y++) {
[[a, c], [b, c], [a, d], [b, d]].forEach(function (p) { V.set(p[0], y, p[1], o.corner); });
}
var mx = Math.floor((a + b) / 2);
V.box(mx, y0, d, mx + 1, y0 + 3, d, SWC.brown);
for (var wx = a + 2; wx <= b - 3; wx += Math.max(4, Math.floor((b - a) / 3))) {
if (Math.abs(wx - mx) < 3)
continue;
V.box(wx, y0 + 2, d, wx + 1, y0 + 4, d, SWC.glass);
V.box(wx, y0 + 2, c, wx + 1, y0 + 4, c, SWC.glass);
}
for (var wz = c + 2; wz <= d - 3; wz += 4) {
V.box(a, y0 + 2, wz, a, y0 + 4, wz + 1, SWC.glass);
V.box(b, y0 + 2, wz, b, y0 + 4, wz + 1, SWC.glass);
}
var rh = Math.ceil((D) / 2);
for (var k = 0; k < rh; k++) {
var y = top + 1 + k, z1 = z0 + k, z2 = z0 + D - 1 - k;
if (z1 > z2)
break;
for (var x = x0; x <= x0 + W - 1; x++) {
V.set(x, y, z1, o.roof);
V.set(x, y, z2, o.roof);
if (z2 - z1 <= 1)
for (var zz = z1; zz <= z2; zz++)
V.set(x, y, zz, o.roof);
}
for (var z = z1 + 1; z < z2; z++) {
V.set(a, y, z, o.wall);
V.set(b, y, z, o.wall);
}
}
if (o.chim)
V.box(b - 3, top + 1, c + 1, b - 2, top + rh + 2, c + 2, SWC.grey);
if (o.flowers && o.base !== undefined)
for (var f = x0 + 1; f < x0 + W - 1; f++) {
if (Math.abs(f - mx) < 2) {
V.set(f, 0, z0 + D - 1, SWC.grey);
continue;
}
V.set(f, 1, z0 + D - 1, SWC.green);
if (f % 2)
V.set(f, 2, z0 + D - 1, f % 4 === 1 ? SWC.red : SWC.yellow);
}
},
function (V) {
V.box(0, 0, 1, 27, 0, 1, SWC.grey);
V.box(0, 0, 4, 27, 0, 4, SWC.grey);
for (var x = 0; x < 28; x += 2)
V.box(x, 0, 2, x, 0, 3, SWC.brown);
V.box(1, 1, 1, 26, 2, 4, SWC.black);
[4, 8, 12, 19, 23].forEach(function (cx) { [0, 5].forEach(function (z) { for (var x = cx - 1; x <= cx + 1; x++)
for (var y = 1; y <= 3; y++) {
if ((x === cx - 1 || x === cx + 1) && (y === 1 || y === 3))
continue;
V.set(x, y, z, SWC.red);
} }); });
for (var x2 = 2; x2 <= 13; x2++)
for (var y2 = 3; y2 <= 8; y2++)
for (var z2 = 0; z2 <= 5; z2++) {
var dd = Math.hypot(y2 + 0.5 - 5.6, z2 + 0.5 - 3);
if (dd <= 2.7)
V.set(x2, y2, z2, x2 <= 3 ? SWC.black : (x2 % 4 === 0 ? SWC.yellow : SWC.green));
}
V.cyl(5, 3, 1.2, 9, 11, SWC.black);
V.cyl(9, 3, 1, 9, 9, SWC.yellow);
V.box(14, 3, 0, 18, 9, 5, SWC.green, true);
V.box(14, 6, 0, 18, 7, 0, SWC.glass);
V.box(14, 6, 5, 18, 7, 5, SWC.glass);
V.clear(15, 6, 0, 17, 7, 0);
V.box(15, 6, 0, 17, 7, 0, SWC.glass);
V.box(13, 10, 0, 19, 10, 5, SWC.black);
V.box(20, 3, 0, 26, 6, 5, SWC.green);
V.box(21, 7, 1, 25, 7, 4, SWC.black);
V.box(0, 1, 1, 0, 2, 1, SWC.red);
V.box(0, 1, 4, 0, 2, 4, SWC.red);
},
function (V) {
V.ell(0, 0, 0, 10, 4.5, 10, SWC.grey);
for (var k in V.M) {
if (Math.random() < 0.18)
V.M[k] = SWC.dgreen;
}
for (var y = 5; y <= 30; y++) {
var r = 5.4 - (y - 5) * 0.075;
V.cyl(0, 0, r, y, y, Math.floor((y - 5) / 4) % 2 ? SWC.white : SWC.red, 1.6);
}
V.box(-1, 5, 4, 0, 8, 5, SWC.brown);
V.cyl(0, 0, 4.9, 31, 31, SWC.black);
V.cyl(0, 0, 3.1, 32, 35, SWC.glass, 1);
V.cyl(0, 0, 1.6, 32, 34, SWC.yellow);
V.cyl(0, 0, 3.3, 36, 36, SWC.black);
for (var y2 = 37; y2 <= 41; y2++)
V.cyl(0, 0, 3.3 - (y2 - 37) * 0.65, y2, y2, SWC.red);
V.set(0, 42, 0, SWC.black);
V.set(-1, 42, -1, SWC.black);
},
function (V) {
var Lh = 34;
for (var x = 0; x < Lh; x++) {
var u = (x - Lh * 0.45) / (Lh * 0.55), wmax = 4.4 * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), u > 0 ? 2.2 : 3.2)));
for (var y = 0; y <= 5; y++) {
var hw = wmax * (0.45 + 0.55 * y / 5);
if (hw < 0.6)
continue;
for (var z = -5; z < 5; z++) {
var zc = z + 0.5;
if (Math.abs(zc) > hw)
continue;
var shell = Math.abs(zc) > hw - 1.2 || y === 0;
if (!shell)
continue;
V.set(x, y, z, y <= 1 ? SWC.red : (y === 4 ? SWC.yellow : SWC.brown));
}
}
var hw6 = wmax;
for (var z6 = -5; z6 < 5; z6++)
if (Math.abs(z6 + 0.5) <= hw6)
V.set(x, 6, z6, SWC.tan);
}
V.box(2, 7, -3, 7, 9, 2, SWC.brown, true);
V.box(3, 8, -3, 6, 8, -3, SWC.glass);
V.box(2, 10, -3, 7, 10, 2, SWC.tan);
[9, 17, 25].forEach(function (mx, i) {
var h = i === 1 ? 30 : 26;
V.box(mx, 7, -1, mx, h, -1, SWC.brown);
[[10, 15, 4], [17, 22, 3], [24, h - 2, 2]].forEach(function (s) { if (s[1] > h)
return; for (var y = s[0]; y <= s[1]; y++)
for (var z = -s[2] - 1; z <= s[2]; z++)
if (z !== -1)
V.set(mx, y, z, SWC.white); });
V.box(mx, h + 1, -1, mx, h + 1, 0, SWC.red);
});
V.box(Lh - 1, 6, -1, Lh + 3, 6, -1, SWC.brown);
},
function (V) {
V.box(-14, 0, -12, 14, 1, 12, SWC.grey);
V.box(-14, 2, -12, 14, 2, -11, SWC.yellow);
for (var y = 2; y <= 46; y++) {
[[-13, -9], [-13, -6], [-10, -9], [-10, -6]].forEach(function (p) { V.set(p[0], y, p[1], SWC.red); });
if (y % 6 === 0)
V.box(-13, y, -9, -10, y, -6, SWC.red);
}
V.box(-9, 30, -8, -5, 30, -7, SWC.red);
for (var y2 = 4; y2 <= 40; y2++) {
var r = y2 > 34 ? 4.2 * (1 - (y2 - 34) / 8) : 4.2;
if (r > 0.4)
V.cyl(-4, 0, r, y2, y2, SWC.orange);
}
[-6.5, 6.5].forEach(function (bz) { for (var y3 = 2; y3 <= 36; y3++) {
var r2 = y3 > 32 ? 1.8 * (1 - (y3 - 32) / 5) : 1.8;
if (r2 > 0.3)
V.cyl(-4, bz, r2, y3, y3, y3 <= 4 ? SWC.black : SWC.white);
} });
for (var y4 = 6; y4 <= 31; y4++) {
var r3 = y4 > 27 ? 2.6 * (1 - (y4 - 27) / 6) : 2.6;
if (r3 > 0.4)
V.cyl(2, 0, r3, y4, y4, function (yy, xx) { return xx <= 0 ? SWC.black : (yy >= 29 ? SWC.black : SWC.white); });
}
for (var y5 = 6; y5 <= 17; y5++) {
var span = Math.floor((17 - y5) * 0.75) + 2;
for (var z = -span - 1; z <= span; z++)
for (var x = 1; x <= 3; x++)
V.set(x, y5, z, Math.abs(z + 0.5) > span - 0.8 ? SWC.black : SWC.white);
}
for (var y6 = 4; y6 <= 13; y6++)
for (var x6 = 4; x6 <= 4 + Math.floor((13 - y6) * 0.5) + 1; x6++)
V.set(x6, y6, -1, SWC.white);
V.box(1, 4, -2, 3, 5, 1, SWC.black);
V.box(2, 26, -2, 2, 27, 1, SWC.black);
},
function (V) {
V.box(0, 0, 0, 39, 0, 39, SWC.green);
for (var i = 1; i <= 38; i++) {
[1, 2, 37, 38].forEach(function (j) { V.set(i, 0, j, SWC.blue); V.set(j, 0, i, SWC.blue); });
}
V.box(18, 0, 36, 21, 0, 39, SWC.brown);
for (var y = 1; y <= 12; y++) {
V.box(4, y, 4, 35, y, 5, SWC.grey);
V.box(4, y, 34, 35, y, 35, SWC.grey);
V.box(4, y, 4, 5, y, 35, SWC.grey);
V.box(34, y, 4, 35, y, 35, SWC.grey);
}
for (var x = 4; x <= 35; x += 2) {
V.set(x, 13, 4, SWC.grey);
V.set(x, 13, 35, SWC.grey);
V.set(4, 13, x, SWC.grey);
V.set(35, 13, x, SWC.grey);
}
V.clear(18, 1, 34, 21, 7, 35);
V.box(18, 1, 35, 21, 6, 35, SWC.brown);
V.box(18, 7, 35, 21, 7, 35, SWC.black);
[[5, 5], [34, 5], [5, 34], [34, 34]].forEach(function (p) {
V.cyl(p[0] + 0.5, p[1] + 0.5, 4.6, 1, 18, SWC.grey, 1.6);
V.cyl(p[0] + 0.5, p[1] + 0.5, 4.6, 19, 19, SWC.grey);
for (var k = 0; k < 8; k++) {
var r = 4.8 * (1 - k / 8);
if (r > 0.5)
V.cyl(p[0] + 0.5, p[1] + 0.5, r, 20 + k, 20 + k, SWC.blue);
}
V.set(p[0], 28, p[1], SWC.yellow);
});
V.box(14, 1, 14, 25, 20, 25, SWC.tan, true);
V.box(14, 21, 14, 25, 21, 25, SWC.tan);
for (var x2 = 14; x2 <= 25; x2 += 2) {
V.set(x2, 22, 14, SWC.tan);
V.set(x2, 22, 25, SWC.tan);
V.set(14, 22, x2, SWC.tan);
V.set(25, 22, x2, SWC.tan);
}
V.box(19, 1, 25, 20, 4, 25, SWC.brown);
for (var wy = 6; wy <= 18; wy += 4) {
V.set(16, wy, 25, SWC.black);
V.set(23, wy, 25, SWC.black);
V.set(14, wy, 19, SWC.black);
V.set(25, wy, 20, SWC.black);
}
V.box(19, 22, 19, 19, 28, 19, SWC.brown);
V.box(20, 26, 19, 22, 28, 19, SWC.red);
},
function (V) {
V.box(0, 0, 0, 59, 0, 51, SWC.grey);
for (var x = 2; x < 58; x += 6) {
V.box(x, 0, 25, x + 2, 0, 26, SWC.white);
}
for (var z = 2; z < 50; z += 6)
V.box(29, 0, z, 30, 0, z + 2, SWC.white);
V.box(32, 0, 28, 57, 0, 49, SWC.green);
for (var t = 0; t < 9; t++) {
var tx = 34 + (t % 3) * 8, tz = 31 + Math.floor(t / 3) * 6;
V.box(tx, 1, tz, tx, 3, tz, SWC.brown);
V.ell(tx + 0.5, 5, tz + 0.5, 2, 2.2, 2, t % 2 ? SWC.green : SWC.dgreen, 4);
}
V.cyl(45, 39, 3, 1, 1, SWC.grey);
V.cyl(45, 39, 2, 1, 1, SWC.lblue);
swGenHouse(V, 2, 2, 26, 20, 10, { wall: SWC.tan, corner: SWC.cream, roof: SWC.dgreen });
V.box(12, 11, 9, 17, 30, 14, SWC.cream, true);
V.box(13, 22, 14, 16, 25, 14, SWC.white);
V.box(14, 23, 14, 15, 24, 14, SWC.black);
for (var k = 0; k < 5; k++)
V.box(12 + k, 31 + k, 9 + k, 17 - k, 31 + k, 14 - k, SWC.dgreen);
var cols = [SWC.red, SWC.blue, SWC.yellow, SWC.cream, SWC.lblue, SWC.orange];
for (var s = 0; s < 4; s++) {
var sx = 32 + s * 7;
V.box(sx, 1, 2, sx + 6, 8 + (s % 2) * 3, 10, cols[s], true);
V.box(sx + 1, 1, 10, sx + 5, 3, 10, SWC.glass);
V.box(sx + 2, 1, 10, sx + 2, 3, 10, SWC.brown);
V.box(sx, 4, 11, sx + 6, 4, 11, cols[(s + 3) % 6]);
for (var wy = 5; wy <= 7 + (s % 2) * 3; wy += 3)
V.box(sx + 1, wy, 10, sx + 5, wy + 1, 10, SWC.glass);
V.box(sx, 9 + (s % 2) * 3, 2, sx + 6, 9 + (s % 2) * 3, 10, SWC.black);
}
V.box(2, 1, 30, 13, 36, 45, SWC.white, true);
for (var fy = 3; fy <= 34; fy += 4) {
for (var fx = 3; fx <= 12; fx += 3)
V.box(fx, fy, 45, fx + 1, fy + 1, 45, SWC.glass);
for (var fz = 31; fz <= 44; fz += 3) {
V.box(2, fy, fz, 2, fy + 1, fz + 1, SWC.glass);
V.box(13, fy, fz, 13, fy + 1, fz + 1, SWC.glass);
}
}
V.box(2, 37, 30, 13, 37, 45, SWC.grey);
V.box(16, 1, 32, 27, 9, 45, SWC.red, true);
V.box(18, 1, 45, 25, 6, 45, SWC.white);
V.box(16, 10, 32, 27, 10, 45, SWC.black);
V.box(19, 8, 45, 24, 8, 45, SWC.yellow);
for (var h = 0; h < 4; h++) {
var hx = 32 + h * 7;
V.box(hx, 1, 12, hx + 6, 7, 20, [SWC.cream, SWC.tan, SWC.lblue, SWC.white][h], true);
V.box(hx + 2, 1, 20, hx + 3, 3, 20, SWC.brown);
V.box(hx + 4, 4, 20, hx + 5, 5, 20, SWC.glass);
V.box(hx + 1, 4, 12, hx + 2, 5, 12, SWC.glass);
for (var r = 0; r < 4; r++)
V.box(hx, 8 + r, 12 + r, hx + 6, 8 + r, 20 - r, h % 2 ? SWC.red : SWC.brown);
V.box(hx + 5, 8, 15, hx + 5, 13, 16, SWC.red);
}
swGenHouse(V, 30, 51, 28, 10, 9, { base: SWC.grey, wall: SWC.red, corner: SWC.white, roof: SWC.grey });
V.box(42, 10, 53, 45, 18, 56, SWC.white, true);
V.box(43, 15, 56, 44, 16, 56, SWC.black);
for (var k2 = 0; k2 < 4; k2++)
V.box(42 + k2 * 0.5 | 0, 19 + k2, 53 + k2 * 0.5 | 0, 45 - (k2 * 0.5 | 0), 19 + k2, 56 - (k2 * 0.5 | 0), SWC.red);
[[6, 24, SWC.red], [20, 27, SWC.blue], [44, 24, SWC.yellow], [52, 27, SWC.green]].forEach(function (c) { V.box(c[0], 1, c[1], c[0] + 3, 1, c[1] + 1, c[2]); V.box(c[0] + 1, 2, c[1], c[0] + 2, 2, c[1] + 1, SWC.glass); });
},
function (dk) {
var D = SW_BRICK_DESIGNS.filter(function (d) { return d[0] === dk; })[0];
if (!D)
return null;
if (SWB.cache && SWB.cache.k === "bricks:" + dk)
return SWB.cache.P;
var V = swVox();
D[3](V);
var B = swPack(V);
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
B.forEach(function (b) { x0 = Math.min(x0, b.x); x1 = Math.max(x1, b.x + b.w); z0 = Math.min(z0, b.z); z1 = Math.max(z1, b.z + b.d); });
var cx = Math.round((x0 + x1) / 2), cz = Math.round((z0 + z1) / 2);
B.forEach(function (b) { b.x -= cx; b.z -= cz; });
B.sort(function (a, b) { return a.y - b.y || a.z - b.z || a.x - b.x; });
var n = B.length, S = n <= 40 ? 1 : n <= 200 ? 3 : n <= 800 ? 8 : n <= 2000 ? 16 : n <= 5000 ? 28 : 40, st = 0, inStep = 0, ly = null;
B.forEach(function (b) { if (ly !== null && (b.y !== ly || inStep >= S)) {
st++;
inStep = 0;
} b.st = st; inStep++; ly = b.y; });
SWB.cache = { k: "bricks:" + dk, P: B };
return B;
},
function (P, on, ghost) {
var out = [], occ = {};
if (!ghost)
P.forEach(function (b, i) { if (on && !on[i])
return; for (var x = 0; x < b.w; x++)
for (var z = 0; z < b.d; z++)
occ[(b.x + x) + "," + b.y + "," + (b.z + z)] = 1; });
P.forEach(function (b, i) {
if (on && !on[i])
return;
var col = SW_BRICKCOLS[b.c] ? SW_BRICKCOLS[b.c][0] : b.c;
out.push({ g: "box", m: "plastic", x: b.x + b.w / 2, y: b.y * 1.2 + 0.01, z: b.z + b.d / 2, sx: b.w - 0.04, sy: 1.18, sz: b.d - 0.04, c: col, i: i });
for (var x = 0; x < b.w; x++)
for (var z = 0; z < b.d; z++) {
if (!ghost && occ[(b.x + x) + "," + (b.y + 1) + "," + (b.z + z)])
continue;
out.push({ g: "stud", m: "plastic", x: b.x + x + 0.5, y: (b.y + 1) * 1.2 - 0.01, z: b.z + z + 0.5, c: col, i: i });
}
});
return out;
},
function (L) {
var cnt = {};
L.forEach(function (b) { var k = b.c + "|" + Math.min(b.w, b.d) + "×" + Math.max(b.w, b.d); cnt[k] = (cnt[k] || 0) + 1; });
return Object.keys(cnt).map(function (k) { var a = k.split("|"), C = SW_BRICKCOLS[+a[0]]; return "<span class='sw-row'><i class='sw-sw' style='width:22px;height:22px;margin:2px;background:#" + C[0].toString(16).padStart(6, "0") + "'></i>" + cnt[k] + " × " + C[1] + " " + a[1] + "</span>"; }).join("");
},
function (L, A, B, lv, o) {
o = o || {};
var ox = -A / 2, oz = -B / 2;
for (var l = 0; l < lv; l++) {
if (l % 2 === 0) {
[0, B].forEach(function (zz, side) {
var front = side === 1;
if (front && o.door && l >= 0 && l <= Math.min(lv - 2, 6)) {
var d0 = Math.floor(A / 2) - 1;
if (d0 > 0)
L.push({ o: "x", x: ox, z: oz + zz, len: d0, l: l });
L.push({ o: "x", x: ox + d0 + 2, z: oz + zz, len: A - d0 - 2, l: l });
}
else
L.push({ o: "x", x: ox, z: oz + zz, len: A, l: l });
});
}
else
[0, A].forEach(function (xx) { if (o.win && l >= 3 && l <= 5 && B >= 4) {
L.push({ o: "z", x: ox + xx, z: oz, len: 1, l: l });
L.push({ o: "z", x: ox + xx, z: oz + 3, len: B - 3, l: l });
}
else
L.push({ o: "z", x: ox + xx, z: oz, len: B, l: l }); });
}
var g = 0;
if (o.roof !== false)
for (var l2 = lv + (lv % 2 === 0 ? 1 : 0);; l2 += 2) {
g++;
var len = B - 2 * g;
if (len < 1)
break;
[0, A].forEach(function (xx) { L.push({ o: "z", x: ox + xx, z: oz + g, len: len, l: l2 }); });
if (len <= 1)
break;
}
if (o.roof !== false) {
var topL = lv + 2 * g, peakY = 0.2 * (topL + 1), baseY = 0.2 * (lv + 1), half = B / 2 + 0.5, ang = Math.atan2(peakY - baseY, half);
var n = Math.max(2, Math.ceil(half / 0.9));
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n;
[-1, 1].forEach(function (s) { L.push({ t: "board", x: 0, y: baseY + (peakY - baseY) * (1 - t) + 0.12, z: s * (half * t), len: A + 1.1, ang: s * ang, w: half / n * 1.04 / Math.cos(ang) }); });
}
L.push({ o: "x", x: ox - 0.4, z: 0, len: A + 0.8, l: topL, ridge: 1 });
}
if (o.chim)
L.push({ t: "chim", x: ox + A - 1.2, z: oz + 1.2, h: 0.2 * (lv + 2 * g) + 1.2 });
},
function (L) {
[-4, 4].forEach(function (cx) { for (var l = 0; l < 7; l++) {
if (l % 2 === 0) {
L.push({ o: "x", x: cx - 1, z: -1, len: 2, l: l });
L.push({ o: "x", x: cx - 1, z: 1, len: 2, l: l });
}
else {
L.push({ o: "z", x: cx - 1, z: -1, len: 2, l: l });
L.push({ o: "z", x: cx + 1, z: -1, len: 2, l: l });
}
} });
for (var d = -1.2; d <= 1.21; d += 0.4)
L.push({ o: "x", x: -6, z: d, len: 12, l: 7, deck: 1 });
[-1.3, 1.3].forEach(function (z) { for (var p = -5; p <= 5; p += 2.5)
L.push({ t: "post", x: p, z: z, h: 0.9, y0: 1.7 }); L.push({ o: "x", x: -5.4, z: z, len: 10.8, l: 12, deck: 1 }); });
},
function (L) {
var R = 7;
for (var i = -R; i <= R; i += 0.42) {
[[i, -R], [i, R], [-R, i], [R, i]].forEach(function (p) { if (p[1] === R && Math.abs(p[0]) < 1.4)
return; L.push({ t: "post", x: p[0], z: p[1], h: 3 + ((i * 7) % 2 + 2) % 1 * 0.3 }); });
}
L.push({ t: "board", x: 0, y: 2.5, z: R, len: 3, ang: 0, w: 0.3 });
var tw = [];
swCabin(tw, 3, 3, 14, { roof: false });
tw.forEach(function (q) { if (q.x !== undefined && q.o) {
q.x += -R + 2.5;
q.z += -R + 2.5;
} L.push(q); });
L.push({ t: "board", x: -R + 4, y: 3.2, z: -R + 4, len: 3.6, ang: 0, w: 3.6 });
swCabin(L, 4, 3, 8, { door: 1, chim: 1 });
},
function (L) {
var sub = [["cabin", -9, -7], ["cabin", 9, -7], ["farm", -9, 8], ["shed", 0, 10], ["cabin", 10, 8]];
sub.forEach(function (s) { var T = []; SW_LOG_DESIGNS.filter(function (d) { return d[0] === s[0]; })[0][3](T); T.forEach(function (q) { var c = {}; for (var k in q)
c[k] = q[k]; c.x = (c.x || 0) + s[1]; c.z = (c.z || 0) + s[2]; L.push(c); }); });
},
function (dk) {
if (SWB.cache && SWB.cache.k === "logs:" + dk)
return SWB.cache.P;
var D = SW_LOG_DESIGNS.filter(function (d) { return d[0] === dk; })[0];
if (!D)
return null;
var L = [];
D[3](L);
L.forEach(function (q) { q.yy = q.l !== undefined ? q.l : (q.t === "board" ? 99 : q.t === "chim" ? 100 : 0); });
L.sort(function (a, b) { return a.yy - b.yy; });
var n = L.length, S = n <= 30 ? 1 : n <= 120 ? 2 : n <= 400 ? 5 : 10, st = 0, inS = 0, ly = null;
L.forEach(function (q) { if (ly !== null && (q.yy !== ly || inS >= S)) {
st++;
inS = 0;
} q.st = st; inS++; ly = q.yy; });
SWB.cache = { k: "logs:" + dk, P: L };
return L;
},
function (P, on) {
var out = [], r = SW_LOGR;
P.forEach(function (q, i) {
if (on && !on[i])
return;
var tone = [0xB88250, 0xA87444, 0xC08C58, 0xB07C4A][i % 4];
if (q.t === "board") {
out.push({ g: "cbox", m: "wood", x: q.x, y: q.y, z: q.z, rx: q.ang || 0, sx: q.len, sy: 0.06, sz: q.w || 0.9, c: 0x3E7A3E, i: i });
return;
}
if (q.t === "chim") {
out.push({ g: "box", m: "plain", x: q.x, y: 0, z: q.z, sx: 0.7, sy: q.h, sz: 0.7, c: 0xA84A3A, i: i });
return;
}
if (q.t === "post") {
out.push({ g: "log", m: "wood", x: q.x, y: (q.y0 || 0) + q.h / 2, z: q.z, rz: Math.PI / 2, sx: q.h, sy: r, sz: r, c: tone, i: i });
return;
}
var y = r + q.l * r, len = q.len + 0.5;
if (q.o === "x")
out.push({ g: "log", m: "wood", x: q.x + q.len / 2, y: y, z: q.z, sx: len, sy: r, sz: r, c: q.ridge ? 0x3E7A3E : tone, i: i });
else
out.push({ g: "log", m: "wood", x: q.x, y: y, z: q.z + q.len / 2, ry: Math.PI / 2, sx: len, sy: r, sz: r, c: tone, i: i });
});
return out;
},
function (L) { var cnt = {}; L.forEach(function (q) { var k = q.t === "board" ? "green roof board" : q.t === "chim" ? "red chimney" : q.t === "post" ? "upright post" : (q.ridge ? "green ridge log" : q.len + "-notch log"); cnt[k] = (cnt[k] || 0) + 1; }); return Object.keys(cnt).map(function (k) { return "<div>" + cnt[k] + " × " + k + "</div>"; }).join(""); },
function (L) { [-2, 2].forEach(function (x) { swBl(L, "cube", x - 1.5, 0, 0, 0, 0); swBl(L, "cube", x + 1.5, 0, 0, 0, 0); }); swBl(L, "cube", -0.0, 0, 0, 0, 0); [-2, 2].forEach(function (x) { swBl(L, "arch", x, 1, 0, 0, 2); }); [-3.5, -0.5].forEach(function (x) { swBl(L, "plank", x + 1.5, 2, 0, 0, 0); }); swBl(L, "plank", 4.5, 2, 0, 0, 0); swBl(L, "plank", -4.5, 2, 0, 0, 0); for (var x2 = -5; x2 <= 5; x2 += 2)
swBl(L, "cube", x2, 2.34, -0.0, 0, 3); },
function (L) {
for (var y = 0; y < 3; y++) {
[-1.5, 1.5].forEach(function (z) { if (z > 0 && y < 2) {
swBl(L, "cube", -2.5, y, z, 0, 0);
swBl(L, "cube", 2.5, y, z, 0, 0);
swBl(L, "long", -1, y, z, 0, 1);
swBl(L, "long", 1, y, z, 0, 1);
}
else {
swBl(L, "long", -2, y, z, 0, 0);
swBl(L, "long", 0, y, z, 0, 0);
swBl(L, "long", 2, y, z, 0, 0);
} });
[-3, 3].forEach(function (x) { swBl(L, "cube", x, y, -0.5, 0, 0); swBl(L, "cube", x, y, 0.5, 0, 0); });
}
swBl(L, "plank", -1.5, 3, 1.5, 0, 0);
swBl(L, "plank", 1.5, 3, 1.5, 0, 0);
swBl(L, "plank", -1.5, 3, -1.5, 0, 0);
swBl(L, "plank", 1.5, 3, -1.5, 0, 0);
for (var z = -1.5; z <= 1.5; z += 1) {
swBl(L, "roof", -2, 3.33, z, 0, 1);
swBl(L, "roof", 0, 3.33, z, 0, 1);
swBl(L, "roof", 2, 3.33, z, 0, 1);
}
},
function (L) {
[-2.5, 2.5].forEach(function (x) { for (var y = 0; y < 6; y++) {
swBl(L, "cube", x - 0.5, y, -0.5, 0, 0);
swBl(L, "cube", x + 0.5, y, -0.5, 0, 0);
swBl(L, "cube", x - 0.5, y, 0.5, 0, 0);
swBl(L, "cube", x + 0.5, y, 0.5, 0, 0);
} swBl(L, "roof", x, 6, -0.5, 0, 1); swBl(L, "roof", x, 6, 0.5, 0, 1); });
swBl(L, "pillar", -1, 0, 0, 0, 0);
swBl(L, "pillar", 1, 0, 0, 0, 0);
swBl(L, "arch", 0, 2, 0, 0, 2);
swBl(L, "long", 0, 3, 0, 0, 0);
swBl(L, "cube", -1.5, 3, 0, 0, 0);
swBl(L, "cube", 1.5, 3, 0, 0, 0);
for (var x3 = -1.5; x3 <= 1.5; x3 += 1)
if (Math.round(x3 * 2) % 2)
swBl(L, "cube", x3, 4, 0, 0, 0);
},
function (L) { for (var x = -3; x <= 3; x += 3) {
swBl(L, "plank", x, 0, -1.5, 0, 0);
swBl(L, "plank", x, 0, 0, 0, 0);
swBl(L, "plank", x, 0, 1.5, 0, 0);
} [-3, -1, 1, 3].forEach(function (x) { swBl(L, "pillar", x, 0.33, -1.2, 0, 0); swBl(L, "pillar", x, 0.33, 1.2, 0, 0); }); for (var x2 = -3; x2 <= 3; x2 += 3) {
swBl(L, "plank", x2, 2.33, -1.2, 0, 0);
swBl(L, "plank", x2, 2.33, 1.2, 0, 0);
swBl(L, "plank", x2, 2.66, 0, 0, 0);
} for (var z = -1.5; z <= 1.5; z += 1)
[-3, -1, 1, 3].forEach(function (x3) { swBl(L, "roof", x3, 3.0, z, 0, 0); }); },
function (P, on) {
var out = [];
P.forEach(function (q, i) {
if (on && !on[i])
return;
var c = SW_BLOCK_COLS[q.c || 0], p = { m: "wood", x: q.x, y: q.y, z: q.z, ry: q.ry || 0, c: c, i: i };
if (q.s === "cube") {
p.g = "box";
p.sx = p.sy = p.sz = 0.98;
}
else if (q.s === "long") {
p.g = "box";
p.sx = 1.98;
p.sy = 0.98;
p.sz = 0.98;
}
else if (q.s === "plank") {
p.g = "box";
p.sx = 2.98;
p.sy = 0.32;
p.sz = 0.98;
}
else if (q.s === "pillar") {
p.g = "pillar";
}
else if (q.s === "arch") {
p.g = "arch";
p.sz = 0.98;
}
else if (q.s === "roof") {
p.g = "roof";
p.sz = 0.98;
}
else if (q.s === "half") {
p.g = "half";
p.y += 0.5;
}
else {
p.g = "box";
}
out.push(p);
});
return out;
},
function (kind) {
if (kind === "dominoes")
return swDominoCard();
var K = SWK[kind];
if (!K)
return;
var d = swData(), fns = {}, h = "<div class='sw-tip'>Choose a build. Each one has a picture guide: the next pieces glow softly; tap them to put them in, or let the table build a step for you. Your place is kept.</div><div class='sw-grid'>";
K.designs().forEach(function (D) {
var P = K.parts(D.k), on = swBuildProgress(kind, D.k, P.length), n = 0;
for (var i = 0; i < P.length; i++)
if (on[i])
n++;
var done = n >= P.length;
h += "<div class='sw-tile' data-sw='d_" + D.k + "'><div style='font-size:34px'>" + (done ? "✅" : K.i) + "</div><b>" + esc(D.n) + "</b><small>" + esc(D.sub) + "<br>" + P.length + " pieces" + (n && !done ? " · " + n + " in" : "") + "</small></div>";
fns["d_" + D.k] = function () { swBuildStart(kind, D.k); };
});
h += "<div class='sw-tile' data-sw='free'><div style='font-size:34px'>✨</div><b>Build anything you like</b><small>no guide, all the pieces you want</small></div></div>";
fns.free = function () { swBuildStart(kind, "free"); };
var b = swPanel(K.i + " " + K.n, h, null);
swBind(b, fns);
},
function (kind, dk) {
if (dk === "free")
return swFreeBuild(kind);
var K = SWK[kind], P = K.parts(dk), D = K.designs().filter(function (x) { return x.k === dk; })[0], on = swBuildProgress(kind, dk, P.length);
var big = 0;
P.forEach(function (q) { var r = Math.hypot(q.x || 0, q.z || 0); if (r > big)
big = r; });
var hy = 0;
P.forEach(function (q) { hy = Math.max(hy, (q.y !== undefined ? q.y : (q.l || 0) * 0.2)); });
var unit = kind === "bricks" ? 1 : 1, rr = Math.max(10, big * 2.6 + 6) * unit, ty = (kind === "bricks" ? hy * 1.2 : hy) * 0.35;
var S = { kind: kind, dk: dk, P: P, on: on, solid: null, ghost: null, step: 0, steps: P.length ? P[P.length - 1].st + 1 : 0, auto: false, at: 0, peek: false };
SWB.cur = S;
swBenchOpen(K.i + " " + D.n, { r: rr, rMin: 3, rMax: rr * 3, tg: [0, ty, 0], table: { w: Math.max(60, big * 4), d: Math.max(44, big * 3), matCol: kind === "bricks" ? 0x3A6A4A : 0x5A7A6A },
targets: function () { return (S.ghost || []).concat(S.solid || []); },
pick: function (h) { for (var i = 0; i < h.length; i++) {
var o = h[i].object;
if (o.material === swBMat("ghost") && o.userData.part) {
var pi = o.userData.part[h[i].instanceId];
if (pi !== undefined && !S.on[pi]) {
swBuildPut(S, [pi]);
return;
}
}
} },
tick: function (dt) {
var g = swBMat("ghost");
g.opacity = 0.3 + 0.12 * Math.sin(SWB.t * 1.6);
if (S.auto) {
S.at += dt;
if (S.at > (kind === "bricks" && P.length > 800 ? 0.45 : 0.8)) {
S.at = 0;
var st = swBuildStepNow(S);
if (st < 0) {
S.auto = false;
swBuildSide(S);
}
else
swBuildPut(S, swBuildStepList(S, st));
}
}
},
close: function () { S.auto = false; swBuildKeep(kind, dk, S.on); SWB.cur = null; SWB.cache = null; }
});
swBuildDraw(S);
swBuildSide(S);
},
function (S) {
var K = SWK[S.kind];
swBatchDrop(S.solid);
swBatchDrop(S.ghost);
S.solid = swBatch(SWB.root, K.render(S.P, S.on, false));
var st = swBuildStepNow(S), g = null;
if (st >= 0) {
g = new Uint8Array(S.P.length);
S.P.forEach(function (q, i) { if (q.st === st && !S.on[i])
g[i] = 1; });
}
S.ghost = g ? swBatch(SWB.root, K.render(S.P, g, true), true) : [];
if (S.peek) {
var all = new Uint8Array(S.P.length);
S.P.forEach(function (q, i) { if (!S.on[i] && !(g && g[i]))
all[i] = 1; });
S.ghost = S.ghost.concat(swBatch(SWB.root, K.render(S.P, all, true), true));
}
},
function (S, list) {
if (!list.length)
return;
list.forEach(function (i) { S.on[i] = 1; });
var K = SWK[S.kind], mark = new Uint8Array(S.P.length);
list.forEach(function (i) { mark[i] = 1; });
var tmp = swBatch(SWB.root, K.render(S.P, mark, false));
var others = new Uint8Array(S.P.length);
for (var i = 0; i < S.on.length; i++)
others[i] = S.on[i] && !mark[i] ? 1 : 0;
swBatchDrop(S.solid);
swBatchDrop(S.ghost);
S.solid = swBatch(SWB.root, K.render(S.P, others, false));
S.ghost = [];
tmp.forEach(function (im) { im.position.y = 1.6; });
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(S.kind === "bricks" ? 880 : 520, 0.06);
}
catch (e) { }
SWB.anim.push({ t: 0, d: 0.32, f: function (k) { tmp.forEach(function (im) { im.position.y = 1.6 * (1 - k * k); }); }, done: function () { swBatchDrop(tmp); swBuildDraw(S); swBuildSide(S); if (swBuildStepNow(S) < 0)
swBuildDone(S); } });
clearTimeout(S.kt);
S.kt = setTimeout(function () { swBuildKeep(S.kind, S.dk, S.on); }, 1500);
},
function (S) {
var K = SWK[S.kind], st = swBuildStepNow(S), n = 0;
for (var i = 0; i < S.on.length; i++)
if (S.on[i])
n++;
var fns = {}, h = "<div class='sw-cnt'>" + n + " of " + S.P.length + " pieces in</div>";
if (st >= 0) {
var L = swBuildStepList(S, st);
h += "<div class='sw-h'>Step " + (st + 1) + " of " + S.steps + "</div><div class='sw-tip'>The glowing pieces go in next. Tap each one, or:</div>" + K.describe(L.map(function (i) { return S.P[i]; }));
h += "<div>" + swBtn("step", "✔️ Put this step in", "") + swBtn("auto", S.auto ? "⏸️ Stop" : "▶️ Build it for me, slowly", "", { on: S.auto }) + "</div>";
fns.step = function () { swBuildPut(S, swBuildStepList(S, swBuildStepNow(S))); };
fns.auto = function () { S.auto = !S.auto; S.at = 0; swBuildSide(S); };
}
else
h += "<div class='sw-h'>🎉 It's finished!</div><div class='sw-tip'>It stands on the display table in the room now. Turn it round and have a good look.</div>";
h += "<div>" + swBtn("back", "↩️ Take the last step out", "", { small: 1 }) + swBtn("peek", S.peek ? "🙈 Hide the finished picture" : "👀 See the finished picture", "", { small: 1, on: S.peek }) + swBtn("again", "🔁 Start again", "", { small: 1 }) + "</div>";
fns.back = function () { var last = -1; for (var i = 0; i < S.P.length; i++)
if (S.on[i])
last = Math.max(last, S.P[i].st); if (last < 0)
return; S.P.forEach(function (q, i) { if (q.st === last)
S.on[i] = 0; }); S.auto = false; swBuildDraw(S); swBuildSide(S); swBuildKeep(S.kind, S.dk, S.on); };
fns.peek = function () { S.peek = !S.peek; swBuildDraw(S); swBuildSide(S); };
fns.again = function () { if (S.sure) {
S.on.fill(0);
S.sure = 0;
S.auto = false;
swBuildDraw(S);
swBuildSide(S);
swBuildKeep(S.kind, S.dk, S.on);
}
else {
S.sure = 1;
swBuildSide(S);
setTimeout(function () { S.sure = 0; }, 5000);
} };
if (S.sure)
h += "<div class='sw-tip'>Press 🔁 once more to take every piece out and start again.</div>";
swBenchSide(h, fns);
},
function (S) {
var d = swData(), K = SWK[S.kind], D = K.designs().filter(function (x) { return x.k === S.dk; })[0];
d.made[S.kind] = d.made[S.kind] || [];
if (d.made[S.kind].indexOf(S.dk) < 0) {
d.made[S.kind].unshift(S.dk);
swKeep(S.kind, D.n, K.i, { pieces: S.P.length });
}
swBuildKeep(S.kind, S.dk, S.on);
swDid(S.kind);
swSay("It's finished. Well done. It is on the display table now.");
var R = SW_ROOMS[S.kind];
if (R && R.g)
swDisplayRefresh(R);
},
function (kind) {
var K = SWK[kind], key = swBuildKey(kind, "free"), saved = swLocalGet(key), P = (saved && Array.isArray(saved.P)) ? saved.P : [];
var S = { kind: kind, P: P, solid: null, col: 0, size: 3, rot: 0, shape: "cube", len: 4, dir: "x", take: false, hist: [] };
var plate = kind === "bricks" ? 32 : 24;
swBenchOpen(K.i + " Build anything you like", { r: kind === "bricks" ? 44 : 22, rMin: 3, rMax: 140, tg: [0, 2, 0], table: { w: plate * 2.2, d: plate * 1.8, matCol: kind === "bricks" ? 0x3A8A4A : 0x6A8A7A },
targets: function () { return (S.solid || []).concat(S.plate ? [S.plate] : []); },
pick: function (h) {
if (!h.length)
return;
var H = h[0], o = H.object, pi = o.userData.part ? o.userData.part[H.instanceId] : undefined;
if (S.take) {
if (pi !== undefined) {
S.hist.push(JSON.stringify(S.P));
S.P.splice(pi, 1);
swFreeDraw(S);
}
return;
}
var n = H.face ? H.face.normal.clone().transformDirection(o.matrixWorld) : new THREE.Vector3(0, 1, 0), p = H.point.clone().addScaledVector(n, 0.05);
var add = swFreePiece(S, p, n, pi);
if (add) {
S.hist.push(JSON.stringify(S.P));
S.P.push(add);
if (S.P.length > 4000)
S.P.shift();
swFreeDraw(S);
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(760, 0.05);
}
catch (e) { }
}
},
close: function () { swLocalSet(key, { P: S.P }); if (S.P.length >= 10) {
var d = swData();
d.made[kind] = d.made[kind] || [];
if (d.made[kind].indexOf("free") < 0)
d.made[kind].push("free");
swSave();
} }
});
if (kind === "bricks") {
S.plate = new THREE.Mesh(new THREE.BoxGeometry(plate, 0.4, plate).translate(0, -0.2, 0), new THREE.MeshPhongMaterial({ color: 0x3A9A4A, shininess: 40 }));
SWB.root.add(S.plate);
SWB.own(S.plate);
var studs = [];
for (var x = 0; x < plate; x++)
for (var z = 0; z < plate; z++)
studs.push({ g: "stud", m: "plastic", x: x - plate / 2 + 0.5, y: 0, z: z - plate / 2 + 0.5, c: 0x3A9A4A });
swBatch(SWB.root, studs).forEach(function (m) { m.raycast = function () { }; });
}
else {
S.plate = new THREE.Mesh(new THREE.PlaneGeometry(plate, plate).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x6A8A7A, transparent: true, opacity: 0.0 }));
S.plate.position.y = 0.01;
SWB.root.add(S.plate);
SWB.own(S.plate);
}
S.half = plate / 2;
swFreeDraw(S);
swFreeSide(S);
},
function (S, p, n, pi) {
if (S.kind === "bricks") {
var sz = SWK.bricks.free.sizes[S.size], w = S.rot ? sz[1] : sz[0], d = S.rot ? sz[0] : sz[1];
var cx = Math.floor(p.x - w / 2 + 0.5), cz = Math.floor(p.z - d / 2 + 0.5), y = Math.max(0, Math.floor((p.y + 0.02) / 1.2));
if (Math.abs(cx) > S.half || Math.abs(cz) > S.half)
return null;
for (var tries = 0; tries < 60; tries++) {
var hit = false;
for (var i = 0; i < S.P.length && !hit; i++) {
var b = S.P[i];
if (b.y !== y)
continue;
if (cx < b.x + b.w && cx + w > b.x && cz < b.z + b.d && cz + d > b.z)
hit = true;
}
if (!hit)
break;
y++;
}
return { x: cx, y: y, z: cz, w: w, d: d, c: S.col };
}
if (S.kind === "logs") {
var o = S.dir, len = S.len, gx = Math.round(p.x), gz = Math.round(p.z), l = 0;
if (pi !== undefined) {
var q = S.P[pi];
l = (q.l || 0) + 1;
}
if (o === "x" && l % 2 === 1)
l++;
if (o === "z" && l % 2 === 0)
l++;
return o === "x" ? { o: "x", x: gx - Math.floor(len / 2), z: gz, len: len, l: l } : { o: "z", x: gx, z: gz - Math.floor(len / 2), len: len, l: l };
}
if (S.kind === "blocks") {
var y2 = Math.max(0, p.y - 0.04);
if (n.y < 0.5 && pi !== undefined) {
y2 = S.P[pi].y;
}
var gx2 = Math.round(p.x * 2) / 2, gz2 = Math.round(p.z * 2) / 2;
if (n.y > 0.5 && pi !== undefined) {
y2 = swBlockTop(S.P[pi]);
}
return { s: S.shape, x: gx2, y: Math.round(y2 * 3) / 3, z: gz2, ry: S.rot ? Math.PI / 2 : 0, c: S.col };
}
return null;
},
function (S) {
var K = SWK[S.kind], fns = {}, h = "<div class='sw-cnt'>" + S.P.length + " pieces</div>";
if (S.kind === "bricks") {
h += "<div class='sw-h'>Colour</div><div>";
SW_BRICKCOLS.forEach(function (C, i) { if (i === 14)
return; h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' title='" + C[1] + "' style='background:#" + C[0].toString(16).padStart(6, "0") + "'></span>"; fns["c" + i] = function () { S.col = i; S.take = false; swFreeSide(S); }; });
h += "</div>";
h += "<div class='sw-h'>Brick</div>";
K.free.sizes.forEach(function (z, i) { h += swBtn("s" + i, z[0] + " × " + z[1], "", { small: 1, on: S.size === i && !S.take }); fns["s" + i] = function () { S.size = i; S.take = false; swFreeSide(S); }; });
h += swBtn("rot", "🔄 Turn it", "", { small: 1, on: !!S.rot });
fns.rot = function () { S.rot = S.rot ? 0 : 1; swFreeSide(S); };
}
else if (S.kind === "logs") {
h += "<div class='sw-h'>Log length</div>";
K.free.logs.forEach(function (n) { h += swBtn("l" + n, n + " notch" + (n > 1 ? "es" : ""), "", { small: 1, on: S.len === n && !S.take }); fns["l" + n] = function () { S.len = n; S.take = false; swFreeSide(S); }; });
h += "<br>" + swBtn("dx", "↔️ Across", "", { small: 1, on: S.dir === "x" }) + swBtn("dz", "↕️ Along", "", { small: 1, on: S.dir === "z" });
fns.dx = function () { S.dir = "x"; swFreeSide(S); };
fns.dz = function () { S.dir = "z"; swFreeSide(S); };
}
else {
h += "<div class='sw-h'>Shape</div>";
var nm = { cube: "⬜ Cube", long: "▭ Long", plank: "▬ Plank", pillar: "🏛️ Pillar", arch: "⌒ Arch", roof: "🔺 Roof" };
K.free.shapes.forEach(function (s) { h += swBtn("h" + s, nm[s], "", { small: 1, on: S.shape === s && !S.take }); fns["h" + s] = function () { S.shape = s; S.take = false; swFreeSide(S); }; });
h += "<br>" + swBtn("rot", "🔄 Turn it", "", { small: 1, on: !!S.rot });
fns.rot = function () { S.rot = S.rot ? 0 : 1; swFreeSide(S); };
h += "<div class='sw-h'>Colour</div><div>";
SW_BLOCK_COLS.forEach(function (c, i) { h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' style='background:#" + c.toString(16).padStart(6, "0") + "'></span>"; fns["c" + i] = function () { S.col = i; swFreeSide(S); }; });
h += "</div>";
}
h += "<div class='sw-tip'>Tap where it goes: on the table, or on top of a piece.</div>";
h += "<div>" + swBtn("take", S.take ? "✋ Taking away (tap a piece)" : "✋ Take a piece away", "", { small: 1, on: S.take }) + swBtn("undo", "↩️ Undo", "", { small: 1 }) + swBtn("clear", "🧺 Clear the table", "", { small: 1 }) + "</div>";
if (S.sure)
h += "<div class='sw-tip'>Press 🧺 once more to put every piece away.</div>";
fns.take = function () { S.take = !S.take; swFreeSide(S); };
fns.undo = function () { var j = S.hist.pop(); if (j) {
S.P.length = 0;
JSON.parse(j).forEach(function (q) { S.P.push(q); });
swFreeDraw(S);
swFreeSide(S);
} };
fns.clear = function () { if (S.sure) {
S.hist.push(JSON.stringify(S.P));
S.P.length = 0;
S.sure = 0;
swFreeDraw(S);
}
else {
S.sure = 1;
setTimeout(function () { S.sure = 0; }, 5000);
} swFreeSide(S); };
swBenchSide(h, fns);
},
function () {
var fns = {}, h = "<div class='sw-tip'>Choose a domino run, or draw your own with your finger. Then tip the first one, and watch.</div><div class='sw-grid'>";
SW_DOMINO_RUNS.forEach(function (R) { var n = R[3]().length; h += "<div class='sw-tile' data-sw='r_" + R[0] + "'><div style='font-size:34px'>🀄</div><b>" + R[1] + "</b><small>" + R[2] + " · " + n + "</small></div>"; fns["r_" + R[0]] = function () { swDominoStart(R[0]); }; });
h += "<div class='sw-tile' data-sw='draw'><div style='font-size:34px'>✍️</div><b>Draw your own</b><small>drag on the table to set them out</small></div></div>";
fns.draw = function () { swDominoStart("draw"); };
var b = swPanel("🀄 The domino floor", h, null);
swBind(b, fns);
},
function (rk) {
var pts = rk === "draw" ? (swLocalGet("dom:draw") || []) : SW_DOMINO_RUNS.filter(function (r) { return r[0] === rk; })[0][3]();
var S = { rk: rk, D: [], im: null, run: false, speed: 1, col: 0, draw: rk === "draw", lastP: null };
function set(points) { S.D = []; points.forEach(function (p, i) { var a = points[Math.max(0, i - 1)], b = points[Math.min(points.length - 1, i + 1)]; S.D.push({ x: p[0], z: p[1], ry: Math.atan2(b[0] - a[0], b[1] - a[1]), a: 0, w: 0, go: false, rest: false, c: p[2] !== undefined ? p[2] : (rk === "draw" ? 0 : [0, 0, 1, 0, 0, 3][i % 6]) }); }); }
set(pts);
swBenchOpen("🀄 Dominoes", { r: 22, rMin: 4, rMax: 60, tg: [0, 0.5, 0], th: 0.4, ph: 0.85, table: { w: 40, d: 32, kind: "floortile", col: 0xD8C8B0, mat: false },
tool: function () { return S.draw && !S.run; },
brush: function (h, ev, first) { var p = h[0].point; if (first || !S.lastP) {
S.lastP = [p.x, p.z];
return;
} if (Math.hypot(p.x - S.lastP[0], p.z - S.lastP[1]) >= 0.6) {
var a = Math.atan2(p.x - S.lastP[0], p.z - S.lastP[1]);
S.lastP = [p.x, p.z];
S.D.push({ x: p.x, z: p.z, ry: a, a: 0, w: 0, go: false, rest: false, c: S.col });
if (S.D.length > 400)
S.D.shift();
swDomDraw(S);
} },
brushEnd: function () { S.lastP = null; if (S.draw)
swLocalSet("dom:draw", S.D.map(function (q) { return [Math.round(q.x * 100) / 100, Math.round(q.z * 100) / 100, q.c]; })); swDomSide(S); },
tick: function (dt) { if (S.run)
swDomTick(S, dt * [0, 0.45, 0.75, 1.1][S.speed]); }
});
SWB.view.classList.toggle("brush", S.draw);
swDomDraw(S);
swDomSide(S);
SWB.dom = S;
},
function (S) {
if (S.im) {
SWB.root.remove(S.im);
try {
S.im.dispose();
}
catch (e) { }
}
if (!S.D.length) {
S.im = null;
return;
}
var im = new THREE.InstancedMesh(swBGeo("domino"), swBMat("paint"), S.D.length), C = new THREE.Color();
S.D.forEach(function (q, i) { C.setHex(SW_DOM_COLS[q.c || 0]); im.setColorAt(i, C); });
S.im = im;
SWB.root.add(im);
swDomPose(S);
},
function (S) {
var im = S.im;
if (!im)
return;
var M = new THREE.Matrix4(), A = new THREE.Matrix4(), B = new THREE.Matrix4(), T = new THREE.Matrix4();
S.D.forEach(function (q, i) { M.makeTranslation(q.x, 0, q.z); A.makeRotationY(q.ry); M.multiply(A); T.makeTranslation(0, 0, 0.08); M.multiply(T); B.makeRotationX(q.a); M.multiply(B); T.makeTranslation(0, 0, -0.08); M.multiply(T); im.setMatrixAt(i, M); });
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
},
function (S, dt) {
var moving = false;
S.D.forEach(function (q, i) {
if (!q.go || q.rest)
return;
moving = true;
var nx = S.D[i + 1], gap = nx ? Math.hypot(nx.x - q.x, nx.z - q.z) : 9, lean = nx && gap < 0.95 ? Math.asin(Math.min(0.99, (gap - 0.16) / 1)) : Math.PI / 2 - 0.08;
q.w += (2.2 * Math.sin(q.a + 0.05) + 0.4) * dt * 9;
q.a += q.w * dt;
if (q.a >= lean) {
q.a = lean;
q.rest = true;
if (typeof playTone === "function" && swCalm().sound > 0.05 && i % 2 === 0)
try {
playTone(300 + (i % 5) * 30, 0.03);
}
catch (e) { }
}
if (nx && !nx.go && q.a >= lean * 0.92 && gap < 0.95) {
nx.go = true;
nx.w = q.w * 0.4;
}
});
swDomPose(S);
if (!moving) {
S.run = false;
swDomSide(S);
var all = S.D.length && S.D.every(function (q) { return q.go; });
if (all) {
swDid("blocks");
swSay("They all fell down. Lovely.");
}
}
},
function (S) {
var fns = {}, h = "<div class='sw-cnt'>" + S.D.length + " dominoes</div>";
if (S.draw) {
h += "<div class='sw-tip'>Drag on the table to set dominoes out. Keep them close (not too close).</div><div>";
SW_DOM_COLS.forEach(function (c, i) { h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' style='background:#" + c.toString(16).padStart(6, "0") + "'></span>"; fns["c" + i] = function () { S.col = i; swDomSide(S); }; });
h += "</div>";
}
h += swBtn("tip", "👉 Tip the first one", "", { col: "#5A8A5A" }) + swBtn("up", "⬆️ Stand them all up again", "");
["🐢 Very slow", "🚶 Slow", "🚲 Steady"].forEach(function (l, i) { h += swBtn("sp" + i, l, "", { small: 1, on: S.speed === i + 1 }); fns["sp" + i] = function () { S.speed = i + 1; swDomSide(S); }; });
if (S.draw) {
h += swBtn("wipe", "🧺 Clear them away", "", { small: 1 });
fns.wipe = function () { S.D = []; swDomDraw(S); swLocalSet("dom:draw", []); swDomSide(S); };
}
fns.tip = function () { if (!S.D.length)
return; S.D.forEach(function (q) { q.a = 0; q.w = 0; q.go = false; q.rest = false; }); S.D[0].go = true; S.D[0].w = 0.6; S.run = true; SWB.view.classList.remove("brush"); };
fns.up = function () { S.run = false; S.D.forEach(function (q) { q.a = 0; q.w = 0; q.go = false; q.rest = false; }); swDomPose(S); if (S.draw)
SWB.view.classList.add("brush"); };
swBenchSide(h, fns);
},
function (R) {
if (!R || !R.g || !R.disp)
return;
var d = swData(), Dp = R.disp;
if (R.dispG) {
R.g.remove(R.dispG);
R.dispG.traverse(function (o) { if (o.isInstancedMesh && o.dispose)
try {
o.dispose();
}
catch (e) { }
else if (o.geometry && !o.geometry.userData.keep && !o.geometry.userData.shared)
o.geometry.dispose(); });
R.dispG = null;
}
var G = new THREE.Group();
R.g.add(G);
R.dispG = G;
if (Dp.kind === "bricks" || Dp.kind === "logs" || Dp.kind === "blocks") {
var K = SWK[Dp.kind], list = (d.made[Dp.kind] || []).slice(0, 3), spots = [[-1.2, 0], [0, 0.1], [1.2, 0]];
if (!list.length) {
var card = wSign(["Your builds go here", "when they are finished"], 1.2, 0.32, "#F4EEE0", "#3A4A3A");
card.position.set(Dp.x, Dp.y + 0.2, Dp.z);
G.add(card);
return;
}
list.forEach(function (k, i) {
var P;
if (k === "free") {
var s = swLocalGet(swBuildKey(Dp.kind, "free"));
P = s && s.P;
}
else
P = K.parts(k);
SWB.cache = null;
if (!P || !P.length)
return;
var g = new THREE.Group();
g.position.set(Dp.x + spots[i][0], Dp.y, Dp.z + spots[i][1]);
var big = 0;
P.forEach(function (q) { big = Math.max(big, Math.abs(q.x || 0) + (q.w || 1), Math.abs(q.z || 0) + (q.d || 1)); });
var sc = Math.min(Dp.scale || 0.05, 0.55 / Math.max(1, big));
g.scale.setScalar(sc);
swBatch(g, K.render(P, null, false));
G.add(g);
});
return;
}
if (Dp.kind === "model" || Dp.kind === "figure") {
var arr = (d.made[Dp.kind === "model" ? "models" : "figures"] || []).slice(0, 8);
arr.forEach(function (m, i) {
try {
var g = Dp.kind === "model" ? swModelMesh(m) : swFigureMesh(m);
if (!g)
return;
var row = Math.floor(i / 4), col = i % 4;
var lx = (col - 1.5) * 0.5, ly = 0.5 + row * 0.62;
var c = Math.cos(Dp.ry || 0), s = Math.sin(Dp.ry || 0);
g.position.set(Dp.x + lx * c, ly, Dp.z - lx * s);
g.rotation.y = (Dp.ry || 0) + 0.5;
g.scale.multiplyScalar(Dp.kind === "model" ? 0.045 : 0.11);
G.add(g);
}
catch (e) { }
});
}
},
function () {
var P = swKit(["The chassis", "The body", "The mudguards", "The wheels", "The seats and the steering wheel", "The windscreen and the lamps"]);
P(0, "trim", "chassis", SWG.box(7.6, 0.3, 2.1), 0, 0.85, 0);
P(1, "body", "body", SWG.box(4.8, 1.0, 2.0), -0.6, 1.5, 0);
P(1, "body", "bonnet", SWG.box(2.4, 0.85, 1.7), 2.9, 1.42, 0);
P(1, "body", "tail", SWG.sph(1, 1.0, 0.6, 1.0), -3.0, 1.55, 0);
[[2.5, 1.15], [2.5, -1.15], [-2.5, 1.15], [-2.5, -1.15]].forEach(function (w) { P(2, "body", "mudguard", SWG.arch(0.78, 0.6), w[0], 0.78, w[1]); });
[[2.5, 1.2], [2.5, -1.2], [-2.5, 1.2], [-2.5, -1.2]].forEach(function (w) { P(3, "tyre", "tyre", SWG.tyre(0.52, 0.2), w[0], 0.75, w[1]); P(3, "chrome", "hub", SWG.cylZ(0.34, 0.34, 0.14), w[0], 0.75, w[1]); });
P(4, "seat", "seat", SWG.box(1.3, 0.5, 1.7), -0.7, 2.15, 0);
P(4, "seat", "seat back", SWG.box(0.3, 0.9, 1.7), -1.4, 2.5, 0);
P(4, "trim", "steering wheel", SWG.tyre(0.3, 0.04), 0.35, 2.55, 0.4, 0, Math.PI / 2, 0.5);
P(5, "glass", "windscreen", SWG.box(0.05, 0.7, 1.7), 0.95, 2.35, 0, 0, 0, -0.25);
P(5, "chrome", "grille", SWG.box(0.08, 0.8, 1.3), 4.12, 1.45, 0);
P(5, "chrome", "headlamp", SWG.sph(0.22), 4.1, 1.85, 0.75);
P(5, "chrome", "headlamp", SWG.sph(0.22), 4.1, 1.85, -0.75);
P(5, "chrome", "front bumper", SWG.box(0.16, 0.14, 2.3), 4.0, 0.8, 0);
P(5, "chrome", "back bumper", SWG.box(0.16, 0.14, 2.3), -3.95, 0.8, 0);
P(5, "tyre", "spare wheel", SWG.tyre(0.48, 0.18), -3.95, 1.7, 0, 0, Math.PI / 2, 0);
return P;
},
function () {
var P = swKit(["The tub", "The side pods", "The wings", "The wheels", "The driver and the number"]);
P(0, "body", "body", SWG.sph(1, 4.4, 0.5, 0.85), 0, 0.85, 0);
P(0, "body", "nose", SWG.coneX(0.42, 1.8), 4.6, 0.7, 0);
P(0, "trim", "cockpit", SWG.box(1.3, 0.2, 0.7), -0.2, 1.3, 0);
P(1, "body", "side pod", SWG.box(2.6, 0.5, 0.55), -0.8, 0.75, 0.95);
P(1, "body", "side pod", SWG.box(2.6, 0.5, 0.55), -0.8, 0.75, -0.95);
P(1, "body", "air box", SWG.box(1.2, 0.5, 0.45), -1.4, 1.45, 0);
P(2, "trim", "front wing", SWG.box(0.9, 0.08, 3.2), 4.6, 0.35, 0);
P(2, "trim", "back wing", SWG.box(0.9, 0.08, 2.8), -3.8, 1.75, 0);
P(2, "trim", "wing post", SWG.box(0.1, 0.9, 0.1), -3.7, 1.3, 0.6);
P(2, "trim", "wing post", SWG.box(0.1, 0.9, 0.1), -3.7, 1.3, -0.6);
[[2.7, 1.55], [2.7, -1.55], [-2.5, 1.55], [-2.5, -1.55]].forEach(function (w, i) { P(3, "tyre", "tyre", SWG.cylZ(0.62, 0.62, 0.55), w[0], 0.62, w[1]); P(3, "chrome", "hub", SWG.cylZ(0.3, 0.3, 0.57), w[0], 0.62, w[1]); });
P(4, "helmet", "helmet", SWG.sph(0.33), -0.2, 1.5, 0);
P(4, "glass", "visor", SWG.box(0.08, 0.12, 0.4), 0.1, 1.52, 0);
P(4, "white", "number disc", SWG.cylZ(0.32, 0.32, 0.02), 1.6, 0.9, 0.86);
P(4, "white", "number disc", SWG.cylZ(0.32, 0.32, 0.02), 1.6, 0.9, -0.86);
return P;
},
function () {
var P = swKit(["The chassis", "The cab", "The body and lockers", "The wheels", "The ladder", "The lights and the hose"]);
P(0, "trim", "chassis", SWG.box(8.6, 0.4, 2.2), 0, 0.9, 0);
P(1, "body", "cab", SWG.box(2.3, 2.0, 2.4), 3.1, 2.1, 0);
P(1, "glass", "windscreen", SWG.box(0.06, 0.8, 2.1), 4.27, 2.55, 0);
P(1, "glass", "side window", SWG.box(1.2, 0.7, 0.06), 3.2, 2.6, 1.21);
P(1, "glass", "side window", SWG.box(1.2, 0.7, 0.06), 3.2, 2.6, -1.21);
P(2, "body", "body", SWG.box(5.8, 1.9, 2.4), -1.1, 2.05, 0);
for (var i = 0; i < 3; i++) {
P(2, "chrome", "locker", SWG.box(1.6, 1.2, 0.05), -3.1 + i * 1.95, 2.0, 1.22);
P(2, "chrome", "locker", SWG.box(1.6, 1.2, 0.05), -3.1 + i * 1.95, 2.0, -1.22);
}
[3.1, -1.4, -3.0].forEach(function (x) { [1.2, -1.2].forEach(function (z) { P(3, "tyre", "tyre", SWG.tyre(0.5, 0.22), x, 0.72, z); P(3, "chrome", "hub", SWG.cylZ(0.3, 0.3, 0.16), x, 0.72, z); }); });
P(4, "chrome", "turntable", SWG.cyl(0.6, 0.6, 0.3), -3.0, 3.15, 0);
P(4, "ladder", "ladder rail", SWG.box(7, 0.12, 0.12), -0.4, 3.45, 0.45);
P(4, "ladder", "ladder rail", SWG.box(7, 0.12, 0.12), -0.4, 3.45, -0.45);
for (var r = 0; r < 13; r++)
P(4, "ladder", "rung", SWG.box(0.07, 0.07, 0.9), -3.6 + r * 0.54, 3.45, 0);
P(5, "light", "blue lamp", SWG.sph(0.18), 3.6, 3.2, 0.7);
P(5, "light", "blue lamp", SWG.sph(0.18), 3.6, 3.2, -0.7);
P(5, "chrome", "hose reel", SWG.cylZ(0.45, 0.45, 0.4), 0.6, 2.2, 1.4);
P(5, "chrome", "bumper", SWG.box(0.2, 0.25, 2.5), 4.35, 0.9, 0);
P(5, "chrome", "headlamp", SWG.sph(0.16), 4.3, 1.5, 0.9);
P(5, "chrome", "headlamp", SWG.sph(0.16), 4.3, 1.5, -0.9);
return P;
},
function () {
var P = swKit(["The launch stand", "The big orange tank", "The two boosters", "The orbiter", "The wings and the tail", "The engines and the windows"]);
P(0, "stand", "stand", SWG.cyl(3.2, 3.4, 0.5), 0, 0.25, 0);
P(0, "stand", "stand top", SWG.box(3.6, 0.3, 5.4), 0, 0.65, 0);
P(1, "tank", "tank", SWG.lathe([[0, 0.8], [1.35, 0.8], [1.4, 1.2], [1.4, 9.4], [1.2, 10.4], [0.7, 11.2], [0, 11.7]]), 0, 0, 0);
[1.95, -1.95].forEach(function (z) { P(2, "booster", "booster", SWG.lathe([[0, 0.9], [0.55, 0.9], [0.55, 9.1], [0.4, 9.8], [0, 10.4]]), 0, 0, z); P(2, "trim", "booster nozzle", SWG.cone(0.5, 0.6), 0, 0.7, z, Math.PI, 0, 0); });
P(3, "body", "orbiter", SWG.lathe([[0, 1.4], [0.8, 1.4], [0.85, 2], [0.85, 7.6], [0.7, 8.6], [0.35, 9.3], [0, 9.5]]), 2.25, 0, 0);
P(4, "body", "wings", SWG.fin([[-3.0, 1.4], [3.0, 1.4], [0.9, 5.6], [-0.9, 5.6]], 0.18).rotateY(Math.PI / 2), 2.25, 0, 0);
P(4, "trim", "wing edge", SWG.box(0.2, 0.12, 6.0), 2.25, 1.42, 0);
P(4, "body", "tail fin", SWG.fin([[0, 0], [1.4, 0.2], [1.4, 0.8], [0, 2.8]], 0.14), 3.0, 1.3, 0);
for (var e = 0; e < 3; e++)
P(5, "engine", "engine", SWG.cone(0.28, 0.55), 2.25 + (e === 0 ? 0.35 : -0.15), 1.1, e === 0 ? 0 : (e === 1 ? 0.35 : -0.35), Math.PI, 0, 0);
P(5, "trim", "nose cap", SWG.sph(0.3), 2.25, 9.25, 0);
P(5, "trim", "windows", SWG.box(0.3, 0.3, 0.9), 2.95, 8.3, 0);
return P;
},
function () {
var P = swKit(["The first stage", "The fins and the engines", "The second stage", "The third stage", "The capsule and the escape tower"]);
P(0, "stand", "stand", SWG.cyl(2.2, 2.4, 0.4), 0, 0.2, 0);
P(0, "body", "first stage", SWG.cyl(1.25, 1.25, 6), 0, 3.7, 0);
P(0, "trim", "band", SWG.cyl(1.27, 1.27, 0.6), 0, 1.4, 0);
P(0, "trim", "band", SWG.cyl(1.27, 1.27, 0.4), 0, 6.3, 0);
for (var f = 0; f < 4; f++) {
var a = f * Math.PI / 2 + Math.PI / 4;
P(1, "trim", "fin", SWG.fin([[0, 0], [0.9, 0], [0, 1.6]], 0.1).rotateY(-a), Math.cos(a) * 1.2, 0.7, Math.sin(a) * 1.2);
}
for (var e = 0; e < 5; e++) {
var x = e < 4 ? Math.cos(e * Math.PI / 2) * 0.6 : 0, z = e < 4 ? Math.sin(e * Math.PI / 2) * 0.6 : 0;
P(1, "engine", "engine", SWG.cone(0.3, 0.6), x, 0.55, z, Math.PI, 0, 0);
}
P(2, "body", "second stage", SWG.lathe([[1.25, 0], [1.25, 0.4], [1.25, 3.2], [0.95, 3.8]]), 0, 6.7, 0);
P(2, "trim", "band", SWG.cyl(1.27, 1.27, 0.3), 0, 7.0, 0);
P(3, "body", "third stage", SWG.cyl(0.95, 0.95, 2.4), 0, 11.7, 0);
P(3, "trim", "band", SWG.cyl(0.97, 0.97, 0.25), 0, 10.9, 0);
P(4, "body", "capsule", SWG.lathe([[0.95, 0], [0.4, 1.2], [0, 1.4]]), 0, 12.9, 0);
P(4, "tower", "escape tower", SWG.cyl(0.06, 0.25, 1.6), 0, 15.0, 0);
P(4, "tower", "tower tip", SWG.cone(0.15, 0.4), 0, 16.0, 0);
return P;
},
function () {
var P = swKit(["The fuselage", "The lower wing", "The upper wing and the struts", "The tail", "The propeller", "The wheels and the pilot"]);
P(0, "body", "fuselage", SWG.latheX([[0, -3.8], [0.25, -3.6], [0.6, -1], [0.7, 1.6], [0.62, 2.8], [0.3, 3.1]]), 0, 1.9, 0);
P(0, "trim", "cockpit rim", SWG.tyre(0.36, 0.06).rotateX(Math.PI / 2), -0.6, 2.55, 0);
P(1, "wing", "lower wing", SWG.box(1.5, 0.08, 8), 0.9, 1.45, 0);
P(2, "wing", "upper wing", SWG.box(1.5, 0.08, 8.6), 1.0, 3.15, 0);
[-2.6, 2.6].forEach(function (z) { P(2, "strut", "strut", SWG.cyl(0.04, 0.04, 1.7), 0.5, 2.3, z); P(2, "strut", "strut", SWG.cyl(0.04, 0.04, 1.7), 1.5, 2.3, z); });
P(2, "strut", "centre strut", SWG.cyl(0.04, 0.04, 1.0), 1.1, 2.75, 0.4);
P(2, "strut", "centre strut", SWG.cyl(0.04, 0.04, 1.0), 1.1, 2.75, -0.4);
P(3, "wing", "tailplane", SWG.box(0.9, 0.06, 2.8), -3.4, 1.95, 0);
P(3, "wing", "fin", SWG.fin([[0, 0], [1.1, 0], [0.3, 1.1], [-0.2, 1.1]], 0.06), -3.9, 1.95, 0);
P(4, "chrome", "spinner", SWG.coneX(0.22, 0.4), 3.4, 1.9, 0);
P(4, "prop", "propeller", SWG.box(0.08, 2.2, 0.2), 3.2, 1.9, 0, 0.3, 0, 0);
P(5, "strut", "wheel leg", SWG.cyl(0.04, 0.04, 1.1), 1.3, 1.0, 0.6, 0.5, 0, 0);
P(5, "strut", "wheel leg", SWG.cyl(0.04, 0.04, 1.1), 1.3, 1.0, -0.6, -0.5, 0, 0);
P(5, "tyre", "wheel", SWG.tyre(0.32, 0.12), 1.3, 0.45, 0.95);
P(5, "tyre", "wheel", SWG.tyre(0.32, 0.12), 1.3, 0.45, -0.95);
P(5, "pilot", "pilot", SWG.sph(0.26), -0.6, 2.8, 0);
return P;
},
function () {
var P = swKit(["The fuselage", "The wings", "The engines", "The tail", "The windows and the stripe"]);
P(0, "body", "fuselage", SWG.latheX([[0, -5.2], [0.25, -5.0], [0.7, -3.4], [0.82, -2], [0.82, 3.6], [0.7, 4.4], [0.4, 4.9], [0, 5.1]]), 0, 2, 0);
P(1, "wing", "right wing", SWG.wing([[0.9, 0.6], [-0.8, 0.6], [-2.7, 5.4], [-1.9, 5.4]], 0.12), 0, 1.7, 0);
P(1, "wing", "left wing", SWG.wing([[0.9, -0.6], [-0.8, -0.6], [-2.7, -5.4], [-1.9, -5.4]], 0.12), 0, 1.7, 0);
[2.4, -2.4].forEach(function (z) { P(2, "engine", "engine", SWG.cylX(0.36, 0.42, 1.4), 0.2 - Math.abs(z) * 0.38, 1.35, z); P(2, "trim", "engine inlet", SWG.cylX(0.3, 0.3, 0.05), 0.92 - Math.abs(z) * 0.38, 1.35, z); });
P(3, "tail", "fin", SWG.fin([[0, 0], [1.6, 0], [0.3, 2.4], [-0.4, 2.4]], 0.1), -4.9, 2.4, 0);
P(3, "wing", "tailplane", SWG.wing([[0.4, 0.2], [-0.5, 0.2], [-1.3, 2.0], [-0.8, 2.0]], 0.08), -4.2, 2.2, 0);
P(3, "wing", "tailplane", SWG.wing([[0.4, -0.2], [-0.5, -0.2], [-1.3, -2.0], [-0.8, -2.0]], 0.08), -4.2, 2.2, 0);
P(4, "glass", "windows", SWG.box(7, 0.12, 0.02), -0.2, 2.25, 0.82);
P(4, "glass", "windows", SWG.box(7, 0.12, 0.02), -0.2, 2.25, -0.82);
P(4, "trim", "stripe", SWG.box(8, 0.1, 0.02), -0.5, 1.95, 0.83);
P(4, "trim", "stripe", SWG.box(8, 0.1, 0.02), -0.5, 1.95, -0.83);
P(4, "glass", "cockpit", SWG.box(0.4, 0.2, 0.9), 4.55, 2.35, 0, 0, 0, -0.4);
return P;
},
function () {
var P = swKit(["The hull", "The deck and the stern cabin", "The masts", "The sails", "The flags and the bowsprit"]);
P(0, "hull", "hull", new THREE.SphereGeometry(1, SW.lite ? 16 : 28, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).scale(4.6, 1.6, 1.35), 0, 1.6, 0);
P(0, "trim", "gold stripe", SWG.tyre(1, 0.04).rotateX(Math.PI / 2).scale(4.45, 1, 1.31), 0, 1.45, 0);
P(1, "deck", "deck", SWG.cyl(1, 1, 0.1).scale(4.5, 1, 1.3), 0, 1.62, 0);
P(1, "deck", "stern cabin", SWG.box(1.6, 0.8, 2.0), -3.3, 2.1, 0);
P(1, "trim", "cabin roof", SWG.box(1.8, 0.1, 2.2), -3.3, 2.55, 0);
[2.2, 0, -2.0].forEach(function (x, i) { var h = i === 1 ? 6.2 : 5.4; P(2, "mast", "mast", SWG.cyl(0.07, 0.1, h), x, 1.6 + h / 2, 0); P(2, "mast", "yard", SWG.cyl(0.04, 0.04, 2.4).rotateX(Math.PI / 2), x, 3.4, 0); P(2, "mast", "yard", SWG.cyl(0.04, 0.04, 2.0).rotateX(Math.PI / 2), x, 5.2, 0); });
[2.2, 0, -2.0].forEach(function (x, i) { P(3, "sail", "sail", SWG.sail(2.2, 1.6, 0.3).rotateY(Math.PI / 2), x + 0.1, 2.6, 0); P(3, "sail", "top sail", SWG.sail(1.8, 1.5, 0.25).rotateY(Math.PI / 2), x + 0.1, 4.4, 0); });
[2.2, 0, -2.0].forEach(function (x, i) { var h = i === 1 ? 6.2 : 5.4; P(4, "flag", "flag", SWG.box(0.6, 0.3, 0.02), x - 0.3, 1.6 + h + 0.05, 0); });
P(4, "mast", "bowsprit", SWG.cylX(0.04, 0.08, 2.2), 4.8, 2.1, 0, 0, 0, 0.25);
return P;
},
function () {
var P = swKit(["The frame", "The boiler", "The cab", "The wheels and the rods", "The chimney, the dome and the buffers", "The tender"]);
P(0, "trim", "frame", SWG.box(7, 0.5, 1.7), 0.4, 1.0, 0);
P(0, "wheel", "buffer beam", SWG.box(0.2, 0.5, 2.2), 3.95, 1.0, 0);
P(1, "body", "boiler", SWG.cylX(0.85, 0.85, 4.4), 1.6, 2.1, 0);
P(1, "trim", "smokebox", SWG.cylX(0.88, 0.88, 0.8), 3.6, 2.1, 0);
P(1, "trim", "smokebox door", SWG.cylX(0.75, 0.75, 0.08), 4.02, 2.1, 0);
P(2, "body", "cab", SWG.box(1.6, 2.1, 2.0), -1.4, 2.3, 0);
P(2, "roof", "cab roof", SWG.box(1.9, 0.12, 2.3), -1.4, 3.45, 0);
[2.2, 0.8, -0.6].forEach(function (x) { [0.95, -0.95].forEach(function (z) { P(3, "wheel", "wheel", SWG.cylZ(0.62, 0.62, 0.12), x, 0.75, z); P(3, "chrome", "tyre", SWG.tyre(0.62, 0.05), x, 0.75, z); }); });
P(3, "chrome", "coupling rod", SWG.box(2.9, 0.1, 0.05), 0.8, 0.65, 1.06);
P(3, "chrome", "coupling rod", SWG.box(2.9, 0.1, 0.05), 0.8, 0.65, -1.06);
P(4, "trim", "chimney", SWG.cyl(0.25, 0.3, 0.8), 3.5, 3.2, 0);
P(4, "brass", "dome", SWG.sph(0.4, 1, 0.8, 1), 1.6, 2.95, 0);
P(4, "chrome", "buffer", SWG.cylX(0.15, 0.15, 0.4), 4.2, 1.0, 0.75);
P(4, "chrome", "buffer", SWG.cylX(0.15, 0.15, 0.4), 4.2, 1.0, -0.75);
P(4, "chrome", "lamp", SWG.sph(0.15), 4.0, 2.9, 0);
P(5, "body", "tender", SWG.box(2.6, 1.5, 2.0), -3.7, 1.9, 0);
P(5, "trim", "coal", SWG.sph(1, 1.1, 0.3, 0.8), -3.7, 2.65, 0);
[-2.9, -4.5].forEach(function (x) { [0.95, -0.95].forEach(function (z) { P(5, "wheel", "tender wheel", SWG.cylZ(0.45, 0.45, 0.12), x, 0.6, z); }); });
return P;
},
function () {
var P = swKit(["The cabin", "The windows", "The tail", "The skids", "The rotors"]);
P(0, "body", "cabin", SWG.sph(1, 2.0, 1.25, 1.15), 0, 2.2, 0);
P(1, "glass", "canopy", SWG.sph(1, 1.1, 0.9, 1.0), 1.15, 2.35, 0);
P(1, "glass", "side window", SWG.box(0.8, 0.5, 0.02), -0.4, 2.5, 1.1);
P(1, "glass", "side window", SWG.box(0.8, 0.5, 0.02), -0.4, 2.5, -1.1);
P(2, "body", "tail boom", SWG.cylX(0.32, 0.12, 4.2), -3.6, 2.5, 0);
P(2, "white", "tail fin", SWG.fin([[0, 0], [0.8, 0], [0.2, 1.2], [-0.2, 1.2]], 0.06), -5.6, 2.5, 0);
P(2, "rotor", "tail rotor", SWG.box(0.08, 1.4, 0.12), -5.6, 3.0, 0.15);
[0.9, -0.9].forEach(function (z) { P(3, "chrome", "skid", SWG.cylX(0.07, 0.07, 3.6), 0, 0.5, z); P(3, "chrome", "strut", SWG.cyl(0.05, 0.05, 1.0), 0.8, 0.95, z * 0.85); P(3, "chrome", "strut", SWG.cyl(0.05, 0.05, 1.0), -0.8, 0.95, z * 0.85); });
P(4, "trim", "mast", SWG.cyl(0.12, 0.16, 0.6), 0, 3.55, 0);
P(4, "rotor", "blade", SWG.box(8, 0.04, 0.32), 0, 3.86, 0);
P(4, "rotor", "blade", SWG.box(0.32, 0.04, 8), 0, 3.88, 0);
return P;
},
function (P, st, zone, c, r0, r1, n, axis, th, off) {
var L = r1 - r0, g = SWG.cyl(th || 0.015, th || 0.015, L, 5);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, m = (r0 + r1) / 2, o = (off || 0) * (i % 2 ? 1 : -1);
if (axis === "x")
P(st, zone, "spoke", g, c[0] + o, c[1] + Math.cos(a) * m, c[2] + Math.sin(a) * m, a, 0, 0);
else
P(st, zone, "spoke", g, c[0] - Math.sin(a) * m, c[1] + Math.cos(a) * m, c[2] + o, 0, 0, a);
}
},
function (P, st, zone, name, a, b, th) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.hypot(dx, dy, dz) || 0.01, g = SWG.cyl(th || 0.012, th || 0.012, L, 5);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)), e = new THREE.Euler().setFromQuaternion(q);
P(st, zone, name, g, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, e.x, e.y, e.z);
},
function (P) {
var s = SWD.step(P, "The wire wheels");
[[2.5, 1.2], [2.5, -1.2], [-2.5, 1.2], [-2.5, -1.2]].forEach(function (w) { SWD.spokes(P, s, "spoke", [w[0], 0.75, w[1]], 0.1, 0.46, 20, "z", 0.012, 0.04); P(s, "chrome", "wheel spinner", SWG.cylZ(0.1, 0.06, 0.12, 8), w[0], 0.75, w[1] + (w[1] > 0 ? 0.14 : -0.14)); });
s = SWD.step(P, "The springs and the shock absorbers");
[[2.5, 0.7], [2.5, -0.7], [-2.5, 0.7], [-2.5, -0.7]].forEach(function (w) { for (var l = 0; l < 4; l++)
P(s, "spring", "spring leaf", SWG.box(1.4 - l * 0.25, 0.04, 0.16), w[0], 0.62 - l * 0.05, w[1]); P(s, "spring", "shock absorber", SWG.cyl(0.05, 0.05, 0.4, 8), w[0] + 0.4, 0.85, w[1], 0, 0, 0.4); });
s = SWD.step(P, "The bonnet louvres and the radiator cap");
[1, -1].forEach(function (sd) { for (var i = 0; i < 8; i++)
P(s, "body", "louvre", SWG.box(0.12, 0.4, 0.03), 2.1 + i * 0.22, 1.45, sd * 0.86); });
P(s, "chrome", "radiator cap", SWG.cyl(0.08, 0.1, 0.14, 10), 4.0, 1.95, 0);
P(s, "chrome", "mascot", SWG.sph(0.06, 1, 1.6, 1), 4.0, 2.08, 0);
s = SWD.step(P, "The dashboard, the dials and the pedals");
P(s, "dash", "dashboard", SWG.box(0.08, 0.4, 1.6), 0.85, 2.0, 0);
for (var d = 0; d < 5; d++)
P(s, "dial", "dial", SWG.cylX(0.07, 0.07, 0.03, 12), 0.8, 2.05, -0.6 + d * 0.3);
for (var p = 0; p < 3; p++)
P(s, "trim", "pedal", SWG.box(0.05, 0.18, 0.12), 0.6, 1.25, 0.15 + p * 0.2, 0, 0, 0.3);
P(s, "chrome", "gear lever", SWG.cyl(0.02, 0.02, 0.5, 6), 0.0, 1.75, -0.05, 0, 0, -0.3);
P(s, "trim", "gear knob", SWG.sph(0.05), 0.07, 2.0, -0.05);
P(s, "chrome", "handbrake", SWG.cyl(0.02, 0.02, 0.45, 6), 0.0, 1.75, 0.85, 0, 0, -0.4);
s = SWD.step(P, "The doors, the plates and the horn");
[1, -1].forEach(function (sd) { P(s, "chrome", "door handle", SWG.box(0.16, 0.04, 0.04), -0.2, 1.85, sd * 1.03); P(s, "trim", "running board", SWG.box(2.2, 0.06, 0.3), 0, 0.95, sd * 1.15); P(s, "chrome", "mirror stalk", SWG.cyl(0.015, 0.015, 0.3, 5), 1.0, 2.4, sd * 0.95, sd * 0.5, 0, 0); P(s, "chrome", "mirror", SWG.cylX(0.07, 0.07, 0.02, 10), 1.0, 2.53, sd * 1.02); });
P(s, "plate", "number plate", SWG.box(0.03, 0.2, 0.6), 4.18, 1.15, 0);
P(s, "plate", "number plate", SWG.box(0.03, 0.2, 0.6), -4.04, 1.15, 0);
P(s, "chrome", "horn", SWG.coneX(0.1, 0.35), 3.6, 1.85, 0.75);
s = SWD.step(P, "The exhaust, the tank and the luggage rack");
P(s, "chrome", "exhaust pipe", SWG.cylX(0.05, 0.05, 5.0, 8), -0.6, 0.6, -0.85);
P(s, "engine", "silencer", SWG.cylX(0.12, 0.12, 0.8, 10), -1.2, 0.6, -0.85);
P(s, "trim", "fuel tank", SWG.cylZ(0.3, 0.3, 1.4, 12), -3.3, 1.1, 0);
P(s, "chrome", "fuel cap", SWG.cyl(0.07, 0.07, 0.06, 10), -3.3, 1.42, 0.4);
for (var r = 0; r < 8; r++)
P(s, "chrome", "rack slat", SWG.box(0.05, 0.03, 1.4), -3.3 - r * 0.1 + 0.35, 2.2, 0);
P(s, "chrome", "rack rail", SWG.box(0.8, 0.04, 0.04), -3.3, 2.24, 0.68);
P(s, "chrome", "rack rail", SWG.box(0.8, 0.04, 0.04), -3.3, 2.24, -0.68);
[1, -1].forEach(function (sd) { P(s, "lamp", "tail lamp", SWG.sph(0.08), -3.95, 1.3, sd * 0.75); P(s, "seat", "seat piping", SWG.cylX(0.04, 0.04, 1.2, 6), -0.7, 2.42, sd * 0.82); });
P(s, "seat", "seat piping", SWG.cylZ(0.04, 0.04, 1.6, 6), -1.35, 2.95, 0);
P(s, "seat", "seat piping", SWG.cylZ(0.04, 0.04, 1.6, 6), -0.05, 2.42, 0);
},
function (P) {
var W = [[2.7, 1.55], [2.7, -1.55], [-2.5, 1.55], [-2.5, -1.55]];
var s = SWD.step(P, "The suspension");
W.forEach(function (w) { var sd = w[1] > 0 ? 1 : -1; [[0.3, 0.95], [-0.3, 0.95], [0.3, 0.4], [-0.3, 0.4]].forEach(function (a) { SWD.rod(P, s, "susp", "wishbone", [w[0] + a[0], a[1] * 0.9 + 0.2, sd * 0.45], [w[0], a[1] * 0.9 + 0.2, w[1] - sd * 0.3], 0.03); }); SWD.rod(P, s, "susp", "push rod", [w[0], 0.4, w[1] - sd * 0.3], [w[0] - 0.2, 1.1, sd * 0.5], 0.025); P(s, "susp", "upright", SWG.box(0.12, 0.6, 0.1), w[0], 0.62, w[1] - sd * 0.28); });
s = SWD.step(P, "The brakes and the wheel rims");
W.forEach(function (w) { var sd = w[1] > 0 ? 1 : -1; P(s, "disc", "brake disc", SWG.cylZ(0.36, 0.36, 0.05, 18), w[0], 0.62, w[1] - sd * 0.22); P(s, "caliper", "caliper", SWG.box(0.25, 0.18, 0.1), w[0] + 0.2, 0.85, w[1] - sd * 0.22); P(s, "chrome", "wheel nut", SWG.cylZ(0.08, 0.08, 0.08, 6), w[0], 0.62, w[1] + sd * 0.3); SWD.spokes(P, s, "chrome", [w[0], 0.62, w[1] + sd * 0.27], 0.1, 0.3, 10, "z", 0.02); });
s = SWD.step(P, "The radiators and the exhausts");
[1, -1].forEach(function (sd) { for (var i = 0; i < 6; i++)
P(s, "trim", "radiator louvre", SWG.box(0.3, 0.03, 0.5), -0.2 - i * 0.36, 1.02, sd * 0.95, 0, 0, 0.3); for (var e = 0; e < 2; e++)
P(s, "pipe", "exhaust", SWG.cylX(0.06, 0.07, 0.9, 10), -3.1, 1.05 + e * 0.15, sd * (0.2 + e * 0.12)); for (var v = 0; v < 4; v++)
P(s, "flap", "turning vane", SWG.box(0.4, 0.3, 0.03), 0.9 + v * 0.1, 0.75, sd * (0.75 + v * 0.08), 0, 0.3 * sd, 0); });
s = SWD.step(P, "The cockpit");
P(s, "trim", "steering wheel", SWG.box(0.05, 0.18, 0.36), 0.25, 1.45, 0);
for (var b = 0; b < 4; b++)
P(s, "belt", "seat belt", SWG.box(0.5, 0.02, 0.06), -0.3, 1.38, -0.15 + b * 0.1, 0, 0, 0.6);
P(s, "trim", "roll hoop", SWG.tyre(0.25, 0.05).rotateY(Math.PI / 2), -0.75, 1.6, 0);
P(s, "glass", "windscreen", SWG.box(0.05, 0.2, 0.5), 0.45, 1.45, 0, 0, 0, -0.4);
[1, -1].forEach(function (sd) { P(s, "trim", "mirror stalk", SWG.cyl(0.02, 0.02, 0.25, 5), 0.55, 1.3, sd * 0.55, sd * 0.6, 0, 0); P(s, "body", "mirror", SWG.box(0.08, 0.12, 0.22), 0.55, 1.42, sd * 0.65); P(s, "trim", "camera pod", SWG.box(0.25, 0.06, 0.06), -0.6, 1.75, sd * 0.22); });
s = SWD.step(P, "The wing flaps and the diffuser");
for (var f = 0; f < 3; f++)
P(s, "flap", "front flap", SWG.box(0.45, 0.04, 2.6 - f * 0.3), 4.45 - f * 0.25, 0.45 + f * 0.09, 0, 0, 0, 0.2 + f * 0.08);
[1, -1].forEach(function (sd) { P(s, "trim", "front endplate", SWG.box(1.0, 0.4, 0.04), 4.6, 0.5, sd * 1.6); P(s, "trim", "rear endplate", SWG.box(1.0, 0.7, 0.04), -3.8, 1.6, sd * 1.4); });
P(s, "flap", "rear flap", SWG.box(0.4, 0.04, 2.7), -3.5, 1.92, 0, 0, 0, 0.3);
for (var d = 0; d < 6; d++)
P(s, "trim", "diffuser fin", SWG.box(0.8, 0.25, 0.03), -3.6, 0.35, -0.75 + d * 0.3);
P(s, "light", "rain light", SWG.box(0.06, 0.12, 0.2), -4.05, 0.7, 0);
P(s, "trim", "aerial", SWG.cyl(0.01, 0.01, 0.5, 4), -0.9, 1.9, 0);
},
function (P) {
var s = SWD.step(P, "The wheel nuts");
[3.1, -1.4, -3.0].forEach(function (x) { [1.2, -1.2].forEach(function (z) { SWD.ring(P, s, "chrome", "wheel nut", SWG.cylZ(0.04, 0.04, 0.06, 6), [x, 0.72, z + (z > 0 ? 0.1 : -0.1)], 0.2, 8); }); });
s = SWD.step(P, "Inside the cab");
for (var i = 0; i < 4; i++)
P(s, "seat", "seat", SWG.box(0.5, 0.55, 0.45), 2.6 + (i % 2) * 0.9 - 0.3, 1.9, (i < 2 ? 0.55 : -0.55));
P(s, "trim", "steering wheel", SWG.tyre(0.25, 0.04).rotateY(Math.PI / 2).rotateZ(0.5), 3.7, 2.3, 0.55);
P(s, "trim", "dashboard", SWG.box(0.3, 0.3, 2.0), 3.95, 2.0, 0);
for (var g = 0; g < 6; g++)
P(s, "dial", "dash dial", SWG.cylX(0.06, 0.06, 0.02, 10), 4.12, 2.08, -0.7 + g * 0.28);
[1, -1].forEach(function (sd) {
P(s, "chrome", "mirror arm", SWG.cyl(0.02, 0.02, 0.6, 5), 4.0, 2.6, sd * 1.4, 0, 0, 1.2);
P(s, "chrome", "mirror", SWG.box(0.06, 0.4, 0.2), 4.25, 2.6, sd * 1.6);
P(s, "trim", "wiper", SWG.box(0.02, 0.5, 0.03), 4.3, 2.35, sd * 0.5, 0, 0, 0.2);
P(s, "chrome", "grab handle", SWG.cyl(0.02, 0.02, 0.6, 5), 2.1, 2.2, sd * 1.23);
P(s, "chrome", "grab handle", SWG.cyl(0.02, 0.02, 0.6, 5), 4.15, 2.2, sd * 1.23);
P(s, "chrome", "step", SWG.box(0.5, 0.05, 0.25), 3.1, 1.25, sd * 1.3);
P(s, "chrome", "step", SWG.box(0.5, 0.05, 0.25), 3.1, 0.85, sd * 1.3);
P(s, "chrome", "door handle", SWG.box(0.15, 0.04, 0.04), 2.4, 2.3, sd * 1.22);
});
s = SWD.step(P, "The pump panel");
P(s, "panel", "pump panel", SWG.box(1.2, 1.2, 0.04), 1.2, 2.0, 1.23);
for (var d = 0; d < 10; d++)
P(s, "dial", "gauge", SWG.cylZ(0.07, 0.07, 0.03, 12), 0.8 + (d % 5) * 0.2, 2.4 - Math.floor(d / 5) * 0.22, 1.26);
for (var v = 0; v < 8; v++) {
P(s, "valve", "valve stem", SWG.cylZ(0.03, 0.03, 0.15, 6), 0.75 + (v % 4) * 0.26, 1.75 - Math.floor(v / 4) * 0.3, 1.3);
P(s, "valve", "valve wheel", SWG.tyre(0.07, 0.015), 0.75 + (v % 4) * 0.26, 1.75 - Math.floor(v / 4) * 0.3, 1.38);
}
for (var o = 0; o < 4; o++)
P(s, "chrome", "outlet cap", SWG.cylZ(0.09, 0.09, 0.12, 10), 0.7 + o * 0.33, 1.2, 1.3);
s = SWD.step(P, "The locker shutters and handles");
for (var l = 0; l < 3; l++)
[1, -1].forEach(function (sd) { for (var r = 0; r < 6; r++)
P(s, "panel", "shutter rib", SWG.box(1.5, 0.03, 0.02), -3.1 + l * 1.95, 1.5 + r * 0.2, sd * 1.255); P(s, "chrome", "locker handle", SWG.box(0.3, 0.05, 0.05), -3.1 + l * 1.95, 1.45, sd * 1.27); });
s = SWD.step(P, "The lights and the siren");
for (var b = 0; b < 8; b++)
P(s, "light", "light bar", SWG.box(0.25, 0.15, 0.2), 3.1, 3.2, -0.85 + b * 0.24);
P(s, "chrome", "siren", SWG.cylX(0.12, 0.15, 0.3, 10), 4.2, 1.6, 0);
[1, -1].forEach(function (sd) { for (var k = 0; k < 3; k++)
P(s, "amber", "side lamp", SWG.box(0.12, 0.08, 0.03), -3.2 + k * 2.2, 1.1, sd * 1.24); P(s, "wheel", "tail lamp", SWG.box(0.03, 0.15, 0.2), -4.0, 1.3, sd * 0.9); P(s, "amber", "indicator", SWG.box(0.03, 0.1, 0.15), -4.0, 1.55, sd * 0.9); P(s, "amber", "indicator", SWG.box(0.03, 0.1, 0.15), 4.3, 1.2, sd * 0.95); P(s, "light", "rear beacon", SWG.sph(0.13), -3.9, 3.15, sd * 0.8); });
s = SWD.step(P, "The second ladder");
P(s, "ladder", "upper rail", SWG.box(6, 0.1, 0.1), -0.1, 3.7, 0.33);
P(s, "ladder", "upper rail", SWG.box(6, 0.1, 0.1), -0.1, 3.7, -0.33);
for (var u = 0; u < 13; u++)
P(s, "ladder", "upper rung", SWG.box(0.06, 0.06, 0.66), -2.9 + u * 0.46, 3.7, 0);
for (var q = 0; q < 4; q++)
P(s, "chrome", "ladder roller", SWG.cylZ(0.06, 0.06, 0.12, 8), 2.4, 3.55, -0.5 + q * 0.33);
P(s, "chrome", "ladder rest", SWG.box(0.2, 0.5, 1.2), 2.5, 3.0, 0);
s = SWD.step(P, "The hoses and the tools");
[1, -1].forEach(function (sd) { P(s, "hose", "suction hose", SWG.cylX(0.14, 0.14, 3.2, 10), -1.2, 3.2, sd * 1.05); P(s, "chrome", "nozzle", SWG.coneX(0.08, 0.4), 0.6, 2.6, sd * 1.45); P(s, "wheel", "extinguisher", SWG.cyl(0.12, 0.12, 0.5, 10), -3.8, 2.0, sd * 1.05); });
P(s, "chrome", "axe", SWG.box(0.7, 0.05, 0.04), -2.0, 3.1, 0.9);
},
function (P) {
var s = SWD.step(P, "The launch tower"), tx = -3.6, tz = 0;
[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(function (q) { P(s, "tower", "tower leg", SWG.box(0.12, 12, 0.12), tx + q[0], 6.4, tz + q[1]); });
for (var lv = 0; lv < 12; lv++) {
var y = 1.2 + lv;
[[0, -0.6, 1.2, 0.08], [0, 0.6, 1.2, 0.08], [-0.6, 0, 0.08, 1.2], [0.6, 0, 0.08, 1.2]].forEach(function (b) { P(s, "tower", "tower beam", SWG.box(b[2], 0.08, b[3]), tx + b[0], y, tz + b[1]); });
SWD.rod(P, s, "tower", "brace", [tx - 0.6, y, tz - 0.6], [tx + 0.6, y + 1, tz - 0.6], 0.03);
SWD.rod(P, s, "tower", "brace", [tx - 0.6, y, tz + 0.6], [tx + 0.6, y + 1, tz + 0.6], 0.03);
}
for (var a = 0; a < 3; a++)
P(s, "tower", "access arm", SWG.box(2.4, 0.12, 0.3), tx + 1.8, 7 + a * 2.4, 0);
P(s, "tower", "swing arm", SWG.box(2.6, 0.15, 0.5), tx + 1.9, 10.8, 0);
P(s, "tower", "crane", SWG.box(0.1, 0.1, 2.4), tx, 13.2, 0.8);
s = SWD.step(P, "The tank's rings and lines");
for (var r = 0; r < 6; r++)
P(s, "ring", "tank ring", SWG.cyl(1.43, 1.43, 0.08, 28), 0, 1.6 + r * 1.5, 0);
P(s, "ring", "feed line", SWG.cyl(0.08, 0.08, 8, 8), 1.45, 5.4, 0.4);
P(s, "ring", "feed line", SWG.cyl(0.08, 0.08, 8, 8), 1.45, 5.4, -0.4);
P(s, "ring", "cable tray", SWG.box(0.12, 8, 0.2), -1.42, 5.4, 0);
for (var k = 0; k < 4; k++)
P(s, "trim", "tank strut", SWG.cylX(0.05, 0.05, 0.9, 6), 1.4 + 0.0, 1.5 + k * 0.3 + (k > 1 ? 7 : 0), k % 2 ? 0.3 : -0.3);
P(s, "trim", "nose spike", SWG.cone(0.06, 0.6, 8), 0, 12.0, 0);
s = SWD.step(P, "The booster segments");
[1.95, -1.95].forEach(function (z) {
for (var g = 0; g < 6; g++)
P(s, "trim", "segment ring", SWG.cyl(0.57, 0.57, 0.06, 20), 0, 1.8 + g * 1.3, z);
P(s, "trim", "aft skirt", SWG.cyl(0.6, 0.75, 0.6, 20), 0, 1.2, z);
P(s, "booster", "nose cap", SWG.cone(0.15, 0.3, 10), 0, 10.5, z);
for (var m = 0; m < 4; m++)
P(s, "trim", "separation motor", SWG.cyl(0.07, 0.07, 0.4, 8), Math.cos(m * 1.57) * 0.5, 9.3, z + Math.sin(m * 1.57) * 0.5);
P(s, "trim", "attach strut", SWG.cylZ(0.05, 0.05, 0.6, 6), 0, 2.0, z * 0.8);
P(s, "trim", "attach strut", SWG.cylZ(0.05, 0.05, 0.6, 6), 0, 9.0, z * 0.8);
});
s = SWD.step(P, "The orbiter's windows, doors and pods");
for (var w = 0; w < 6; w++)
P(s, "window", "window", SWG.box(0.06, 0.18, 0.22), 2.98, 8.4 + (w % 2) * 0.22, -0.45 + Math.floor(w / 2) * 0.45);
for (var d = 0; d < 6; d++)
P(s, "trim", "payload door line", SWG.box(0.03, 0.04, 0.9), 3.1, 3.0 + d * 0.8, 0);
[1, -1].forEach(function (sd) { P(s, "pod", "OMS pod", SWG.sph(1, 0.35, 1.0, 0.35), 2.65, 2.0, sd * 0.55); P(s, "trim", "thruster pod", SWG.box(0.25, 0.3, 0.2), 2.95, 9.0, sd * 0.5); P(s, "body", "elevon", SWG.box(0.6, 0.1, 1.1), 2.25, 1.4, sd * 1.6); P(s, "body", "elevon", SWG.box(0.6, 0.1, 1.1), 2.25, 1.4, sd * 2.6); P(s, "tile", "wing edge tiles", SWG.box(0.12, 4.0, 0.12), 2.25, 3.6, sd * 1.85, 0, 0, 0); });
P(s, "body", "rudder", SWG.box(0.6, 1.6, 0.1), 3.3, 2.3, 0);
P(s, "trim", "body flap", SWG.box(0.6, 0.12, 1.4), 2.25, 1.25, 0);
P(s, "engine", "main engine", SWG.cone(0.32, 0.65, 14), 2.25, 1.0, 0, Math.PI, 0, 0);
s = SWD.step(P, "The black heat tiles");
for (var t = 0; t < 80; t++) {
var ty = 2.0 + (t % 20) * 0.32, tz2 = -0.6 + Math.floor(t / 20) * 0.4;
P(s, "tile", "heat tile", SWG.box(0.05, 0.28, 0.36), 1.45, ty, tz2);
}
},
function (P) {
var s = SWD.step(P, "The launch tower"), tx = -3.4;
[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(function (q) { P(s, "tower", "tower leg", SWG.box(0.12, 16, 0.12), tx + q[0], 8.4, q[1]); });
for (var lv = 0; lv < 16; lv++) {
var y = 0.8 + lv;
[[0, -0.6, 1.2, 0.08], [0, 0.6, 1.2, 0.08], [-0.6, 0, 0.08, 1.2], [0.6, 0, 0.08, 1.2]].forEach(function (b) { P(s, "tower", "tower beam", SWG.box(b[2], 0.08, b[3]), tx + b[0], y, b[1]); });
SWD.rod(P, s, "tower", "brace", [tx - 0.6, y, -0.6], [tx + 0.6, y + 1, -0.6], 0.03);
SWD.rod(P, s, "tower", "brace", [tx - 0.6, y, 0.6], [tx + 0.6, y + 1, 0.6], 0.03);
}
for (var a = 0; a < 6; a++)
P(s, "tower", "swing arm", SWG.box(2.0, 0.12, 0.3), tx + 1.5, 3 + a * 2.3, 0);
P(s, "tower", "crane", SWG.box(0.12, 0.12, 2.6), tx, 16.6, 0.8);
s = SWD.step(P, "The engines in detail");
for (var e = 0; e < 5; e++) {
var x = e < 4 ? Math.cos(e * Math.PI / 2) * 0.6 : 0, z = e < 4 ? Math.sin(e * Math.PI / 2) * 0.6 : 0;
P(s, "engine", "nozzle extension", SWG.cyl(0.3, 0.36, 0.25, 16), x, 0.15, z);
P(s, "pipe", "turbopump", SWG.cyl(0.1, 0.1, 0.3, 8), x + 0.15, 0.95, z + 0.15);
P(s, "pipe", "fuel line", SWG.cyl(0.03, 0.03, 0.5, 6), x - 0.15, 0.95, z);
P(s, "pipe", "oxidiser line", SWG.cyl(0.03, 0.03, 0.5, 6), x, 0.95, z - 0.15);
}
for (var f = 0; f < 4; f++) {
var an = f * Math.PI / 2 + Math.PI / 4;
P(s, "trim", "engine fairing", SWG.cone(0.32, 1.0, 12), Math.cos(an) * 1.1, 1.2, Math.sin(an) * 1.1, Math.PI, 0, 0);
}
s = SWD.step(P, "The roll pattern and the rings");
for (var c = 0; c < 16; c++) {
var ca = c / 16 * Math.PI * 2;
if (c % 2)
P(s, "check", "roll stripe", SWG.box(0.05, 1.0, 0.46), Math.cos(ca) * 1.26, 4.5 + (Math.floor(c / 8) ? 0 : 1.0), Math.sin(ca) * 1.26, 0, -ca, 0);
}
for (var rr = 0; rr < 6; rr++)
P(s, "trim", "stage ring", SWG.cyl(1.28, 1.28, 0.06, 24), 0, 2.4 + rr * 1.6, 0);
for (var rt = 0; rt < 8; rt++) {
var ra = rt / 8 * Math.PI * 2;
P(s, "trim", "retro rocket", SWG.cyl(0.06, 0.06, 0.5, 8), Math.cos(ra) * 1.28, 6.5, Math.sin(ra) * 1.28);
}
for (var vp = 0; vp < 4; vp++)
P(s, "pipe", "vent pipe", SWG.cyl(0.04, 0.04, 0.6, 6), Math.cos(vp * 1.57 + 0.3) * 1.3, 9.5, Math.sin(vp * 1.57 + 0.3) * 1.3);
s = SWD.step(P, "The panels, cables and the capsule windows");
for (var pn = 0; pn < 6; pn++)
P(s, "white", "name panel", SWG.box(0.03, 0.9, 0.18), 1.27, 3.0 + pn * 0.4, 0);
for (var cb = 0; cb < 6; cb++)
SWD.rod(P, s, "cable", "umbilical", [tx + 0.6, 3 + cb * 2.3, 0], [-1.2, 3.2 + cb * 2.2, 0], 0.03);
P(s, "window", "capsule window", SWG.box(0.05, 0.15, 0.15), 0.7, 13.5, 0.2);
P(s, "window", "capsule window", SWG.box(0.05, 0.15, 0.15), 0.7, 13.5, -0.2);
for (var q = 0; q < 4; q++) {
var qa = q * Math.PI / 2;
for (var j = 0; j < 4; j++)
P(s, "trim", "thruster", SWG.cone(0.04, 0.12, 6), Math.cos(qa) * 0.98, 12.2 + (j % 2) * 0.12, Math.sin(qa) * 0.98 + (j > 1 ? 0.08 : -0.08));
}
for (var sp = 0; sp < 8; sp++)
P(s, "trim", "service panel", SWG.box(0.03, 0.6, 0.25), Math.cos(sp * 0.785) * 0.96, 11.6, Math.sin(sp * 0.785) * 0.96, 0, -sp * 0.785, 0);
},
function (P) {
var s = SWD.step(P, "The wing ribs");
for (var r = 0; r < 22; r++)
P(s, "rib", "upper rib", SWG.box(1.5, 0.02, 0.04), 1.0, 3.2, -4.1 + r * 0.39);
for (var l = 0; l < 20; l++)
P(s, "rib", "lower rib", SWG.box(1.5, 0.02, 0.04), 0.9, 1.5, -3.8 + l * 0.4);
s = SWD.step(P, "The rigging wires");
[-2.6, 2.6].forEach(function (z) { [0.5, 1.5].forEach(function (x) { SWD.rod(P, s, "wire", "flying wire", [x, 1.5, z * 0.15], [x, 3.15, z], 0.01); SWD.rod(P, s, "wire", "landing wire", [x, 3.15, z * 0.15], [x, 1.5, z], 0.01); }); SWD.rod(P, s, "wire", "cross wire", [0.5, 1.5, z], [1.5, 3.15, z], 0.01); SWD.rod(P, s, "wire", "cross wire", [1.5, 1.5, z], [0.5, 3.15, z], 0.01); });
for (var t = 0; t < 4; t++)
SWD.rod(P, s, "wire", "tail wire", [-3.4, 1.95, t < 2 ? 1.2 : -1.2], [-3.9, t % 2 ? 3.0 : 1.3, 0], 0.01);
s = SWD.step(P, "The engine");
for (var c = 0; c < 9; c++) {
var a = c / 9 * Math.PI * 2;
P(s, "engine", "cylinder", SWG.cylX(0.12, 0.12, 0.36, 10), 2.95, 1.9 + Math.cos(a) * 0.42, Math.sin(a) * 0.42);
P(s, "chrome", "pushrod", SWG.cyl(0.015, 0.015, 0.38, 5), 3.08, 1.9 + Math.cos(a) * 0.4, Math.sin(a) * 0.4, a, 0, 0);
P(s, "engine", "exhaust stub", SWG.cylX(0.03, 0.03, 0.25, 6), 2.75, 1.9 + Math.cos(a) * 0.6, Math.sin(a) * 0.6);
}
P(s, "chrome", "cowling ring", SWG.tyre(0.62, 0.05).rotateY(Math.PI / 2), 2.85, 1.9, 0);
s = SWD.step(P, "The wheel spokes");
[0.95, -0.95].forEach(function (z) { SWD.spokes(P, s, "spoke", [1.3, 0.45, z], 0.04, 0.28, 16, "z", 0.008, 0.03); });
P(s, "strut", "axle", SWG.cylZ(0.03, 0.03, 1.9, 6), 1.3, 0.45, 0);
s = SWD.step(P, "The cockpit");
P(s, "pilot", "seat", SWG.box(0.4, 0.1, 0.4), -0.6, 2.1, 0);
P(s, "trim", "control stick", SWG.cyl(0.02, 0.02, 0.4, 5), -0.3, 2.3, 0);
for (var d = 0; d < 4; d++)
P(s, "dial", "instrument", SWG.cylX(0.05, 0.05, 0.02, 10), -0.15, 2.5, -0.24 + d * 0.16);
P(s, "glass", "windscreen", SWG.box(0.03, 0.25, 0.4), -0.1, 2.75, 0, 0, 0, -0.3);
P(s, "trim", "headrest", SWG.sph(0.15, 1.5, 1, 0.8), -1.1, 2.6, 0);
P(s, "trim", "rudder bar", SWG.box(0.04, 0.04, 0.5), 0.2, 2.0, 0);
s = SWD.step(P, "The control surfaces and the fittings");
[1, -1].forEach(function (sd) { P(s, "wing", "aileron", SWG.box(0.4, 0.06, 1.8), 0.1, 3.15, sd * 3.4); P(s, "wing", "aileron", SWG.box(0.4, 0.06, 1.6), 0.0, 1.45, sd * 3.2); P(s, "wing", "elevator", SWG.box(0.35, 0.05, 1.3), -3.95, 1.95, sd * 0.7); for (var h = 0; h < 3; h++)
P(s, "strut", "control horn", SWG.box(0.04, 0.15, 0.03), 0.1 - h * 1.95 * 0.5, 3.25, sd * (3.4 - h * 0.2)); for (var fi = 0; fi < 4; fi++)
P(s, "chrome", "strut fitting", SWG.box(0.08, 0.06, 0.08), 0.5 + (fi % 2), fi < 2 ? 1.5 : 3.15, sd * 2.6); });
P(s, "wing", "rudder", SWG.fin([[0, 0], [0.4, 0], [0.4, 1.0], [0, 1.1]], 0.05), -4.3, 1.95, 0);
P(s, "strut", "tail skid", SWG.box(0.5, 0.05, 0.05), -3.6, 1.55, 0, 0, 0, -0.5);
P(s, "tank", "fuel tank", SWG.cylZ(0.2, 0.2, 1.0, 10), 1.0, 3.35, 0);
P(s, "chrome", "filler cap", SWG.cyl(0.05, 0.05, 0.06, 8), 1.0, 3.57, 0.2);
P(s, "trim", "goggles", SWG.box(0.05, 0.06, 0.2), -0.4, 2.95, 0);
},
function (P) {
var s = SWD.step(P, "The windows, one by one");
for (var w = 0; w < 36; w++) {
P(s, "glass", "window", SWG.box(0.1, 0.12, 0.03), -3.4 + w * 0.19, 2.25, 0.81);
P(s, "glass", "window", SWG.box(0.1, 0.12, 0.03), -3.4 + w * 0.19, 2.25, -0.81);
}
for (var c = 0; c < 6; c++)
P(s, "glass", "cockpit pane", SWG.box(0.12, 0.15, 0.02), 4.35 + (c % 3) * 0.1, 2.4, (c < 3 ? 1 : -1) * (0.3 - (c % 3) * 0.08), 0, (c < 3 ? 1 : -1) * 0.5, 0);
s = SWD.step(P, "The doors");
[1, -1].forEach(function (sd) { [3.6, 1.0, -1.6, -4.1].forEach(function (x) { P(s, "door", "door", SWG.box(0.35, 0.6, 0.03), x, 2.05, sd * 0.82); }); P(s, "door", "cargo door", SWG.box(0.6, 0.35, 0.03), 1.8, 1.45, sd * 0.76); });
s = SWD.step(P, "The flaps and the slats");
[1, -1].forEach(function (sd) { for (var f = 0; f < 4; f++)
P(s, "flap", "flap", SWG.box(0.4, 0.06, 0.9), -1.0 - f * 0.42, 1.65, sd * (1.2 + f * 1.0)); for (var sl = 0; sl < 5; sl++)
P(s, "flap", "slat", SWG.box(0.15, 0.05, 0.85), 0.85 - sl * 0.38, 1.72, sd * (1.0 + sl * 0.88)); P(s, "flap", "aileron", SWG.box(0.3, 0.05, 0.8), -2.4, 1.65, sd * 4.9); for (var sp = 0; sp < 4; sp++)
P(s, "flap", "spoiler", SWG.box(0.3, 0.03, 0.6), -0.7 - sp * 0.4, 1.78, sd * (1.4 + sp * 0.8)); P(s, "tail", "winglet", SWG.fin([[0, 0], [0.5, 0], [0.3, 0.7], [0.1, 0.7]], 0.05), -2.5, 1.7, sd * 5.4); });
s = SWD.step(P, "The landing gear");
P(s, "gear", "nose leg", SWG.cyl(0.06, 0.06, 0.8, 8), 3.6, 1.0, 0);
[0.12, -0.12].forEach(function (z) { P(s, "tyre", "nose wheel", SWG.cylZ(0.16, 0.16, 0.1, 14), 3.6, 0.6, z); });
P(s, "door", "nose door", SWG.box(0.6, 0.3, 0.02), 3.6, 1.2, 0.12);
P(s, "door", "nose door", SWG.box(0.6, 0.3, 0.02), 3.6, 1.2, -0.12);
[1, -1].forEach(function (sd) { P(s, "gear", "main leg", SWG.cyl(0.08, 0.08, 1.0, 8), -0.6, 1.0, sd * 1.3); P(s, "gear", "bogie beam", SWG.box(0.7, 0.06, 0.08), -0.6, 0.55, sd * 1.3); for (var mw = 0; mw < 4; mw++)
P(s, "tyre", "main wheel", SWG.cylZ(0.2, 0.2, 0.12, 14), -0.85 + (mw % 2) * 0.5, 0.45, sd * (1.3 + (mw > 1 ? 0.15 : -0.15))); P(s, "door", "gear door", SWG.box(0.8, 0.4, 0.02), -0.6, 1.25, sd * 1.5); P(s, "door", "gear door", SWG.box(0.5, 0.02, 0.4), -0.6, 1.55, sd * 0.95); });
s = SWD.step(P, "The engine fans and pylons");
[2.4, -2.4].forEach(function (z) {
var x = 0.2 - Math.abs(z) * 0.38;
for (var b = 0; b < 20; b++) {
var a = b / 20 * Math.PI * 2;
P(s, "fan", "fan blade", SWG.box(0.02, 0.24, 0.06), x + 0.62, 1.35 + Math.cos(a) * 0.16, z + Math.sin(a) * 0.16, a, 0, 0.4);
}
P(s, "chrome", "spinner", SWG.coneX(0.1, 0.2), x + 0.68, 1.35, z);
P(s, "wing", "pylon", SWG.box(1.0, 0.4, 0.08), x - 0.1, 1.6, z);
P(s, "fan", "exhaust cone", SWG.coneX(0.15, 0.4).rotateZ(Math.PI), x - 0.85, 1.35, z);
for (var tr = 0; tr < 4; tr++)
P(s, "trim", "reverser line", SWG.box(0.5, 0.02, 0.02), x - 0.3, 1.35 + Math.cos(tr * 1.57) * 0.41, z + Math.sin(tr * 1.57) * 0.41);
});
s = SWD.step(P, "The tail, the aerials and the lights");
P(s, "tail", "rudder", SWG.fin([[0, 0], [0.5, 0], [0.5, 2.2], [0, 2.3]], 0.08), -5.4, 2.45, 0);
P(s, "wing", "elevator", SWG.box(0.3, 0.05, 1.6), -5.0, 2.2, 0.9);
P(s, "wing", "elevator", SWG.box(0.3, 0.05, 1.6), -5.0, 2.2, -0.9);
P(s, "trim", "APU exhaust", SWG.cylX(0.08, 0.08, 0.2, 8), -5.2, 2.0, 0);
for (var an = 0; an < 8; an++)
P(s, "trim", "aerial", SWG.box(0.12, 0.15, 0.02), -3 + an * 0.8, an % 2 ? 2.85 : 1.15, 0);
P(s, "light", "nav light", SWG.sph(0.05), -2.7, 1.72, 5.45);
P(s, "light", "nav light", SWG.sph(0.05), -2.7, 1.72, -5.45);
P(s, "light", "beacon", SWG.sph(0.06), 0, 2.85, 0);
P(s, "light", "beacon", SWG.sph(0.06), 0, 1.15, 0);
P(s, "white", "landing light", SWG.sph(0.05), 0.4, 1.6, 1.1);
P(s, "white", "landing light", SWG.sph(0.05), 0.4, 1.6, -1.1);
},
function (P) {
var MX = [2.2, 0, -2.0], MH = [5.4, 6.2, 5.4];
function hullZ(x) { var u = x / 4.5; return 1.3 * Math.sqrt(Math.max(0, 1 - u * u)); }
var s = SWD.step(P, "The deck planks");
for (var pl = 0; pl < 24; pl++) {
var z = -1.15 + pl * 0.1;
for (var sg = 0; sg < 3; sg++) {
var x0 = -3.6 + sg * 2.6, L = 2.5;
var w = Math.min(hullZ(x0), hullZ(x0 + L));
if (Math.abs(z) > w * 0.95)
continue;
P(s, "plank", "deck plank", SWG.box(L, 0.02, 0.08), x0 + L / 2, 1.68, z);
}
}
s = SWD.step(P, "The rails and stanchions");
[1, -1].forEach(function (sd) { for (var i = 0; i < 30; i++) {
var x = -3.9 + i * 0.27, z = hullZ(x) * 0.97 * sd;
P(s, "rail", "stanchion", SWG.cyl(0.02, 0.02, 0.35, 5), x, 1.85, z);
} for (var r = 0; r < 3; r++) {
for (var k = 0; k < 10; k++) {
var xa = -3.9 + k * 0.8, xb = xa + 0.8;
SWD.rod(P, s, "rail", "rail", [xa, 1.75 + r * 0.12, hullZ(xa) * 0.97 * sd], [xb, 1.75 + r * 0.12, hullZ(xb) * 0.97 * sd], 0.015);
}
} });
s = SWD.step(P, "The stern windows and lanterns");
for (var w = 0; w < 10; w++) {
P(s, "lantern", "stern window", SWG.box(0.03, 0.2, 0.16), -4.12, 2.0 + (w > 4 ? 0.3 : 0), -0.8 + (w % 5) * 0.4);
P(s, "trim", "window frame", SWG.box(0.04, 0.24, 0.2), -4.1, 2.0 + (w > 4 ? 0.3 : 0), -0.8 + (w % 5) * 0.4);
}
for (var ln = 0; ln < 3; ln++) {
P(s, "lantern", "stern lantern", SWG.sph(0.1, 1, 1.4, 1), -4.2, 2.9, -0.5 + ln * 0.5);
}
for (var cv = 0; cv < 4; cv++)
P(s, "trim", "carving", SWG.sph(0.08, 1, 0.6, 1.8), -4.15, 1.75, -0.6 + cv * 0.4);
s = SWD.step(P, "The tops, crosstrees and topmasts");
MX.forEach(function (x, i) { var h = MH[i]; P(s, "deck", "top", SWG.box(0.6, 0.06, 0.9), x, 1.6 + h * 0.55, 0); P(s, "mast", "crosstree", SWG.box(0.06, 0.06, 1.0), x, 1.6 + h * 0.82, 0); P(s, "mast", "crosstree", SWG.box(0.4, 0.06, 0.06), x, 1.6 + h * 0.82, 0); P(s, "mast", "mast cap", SWG.box(0.18, 0.1, 0.18), x, 1.6 + h * 0.56, 0); P(s, "mast", "mast cap", SWG.box(0.14, 0.08, 0.14), x, 1.6 + h * 0.83, 0); P(s, "mast", "topgallant mast", SWG.cyl(0.04, 0.05, 1.2, 6), x, 1.6 + h + 0.6, 0); P(s, "mast", "truck", SWG.sph(0.06), x, 1.6 + h + 1.25, 0); });
s = SWD.step(P, "The shrouds");
MX.forEach(function (x, i) { var top = 1.6 + MH[i] * 0.55; [1, -1].forEach(function (sd) { for (var k = 0; k < 5; k++) {
var bx = x - 0.4 + k * 0.2;
SWD.rod(P, s, "rope", "shroud", [bx, 1.85, hullZ(bx) * 1.0 * sd], [x, top, sd * 0.4], 0.01);
} }); });
s = SWD.step(P, "The ratlines");
MX.forEach(function (x, i) { var top = 1.6 + MH[i] * 0.55; [1, -1].forEach(function (sd) { for (var r = 0; r < 16; r++) {
var t = (r + 1) / 17, y = 1.85 + (top - 1.85) * t, z0 = hullZ(x - 0.4) * sd * (1 - t) + sd * 0.4 * t;
SWD.rod(P, s, "rope", "ratline", [x - 0.4 + 0.4 * t, y, z0], [x + 0.4 - 0.4 * t, y, z0], 0.006);
} }); });
s = SWD.step(P, "The deadeyes and chainplates");
MX.forEach(function (x) { [1, -1].forEach(function (sd) { for (var k = 0; k < 5; k++) {
var bx = x - 0.4 + k * 0.2, z = hullZ(bx) * sd;
P(s, "deadeye", "deadeye", SWG.cylZ(0.05, 0.05, 0.03, 8), bx, 1.9, z * 1.01);
P(s, "deadeye", "chainplate", SWG.box(0.03, 0.35, 0.02), bx, 1.65, z * 1.02);
} }); });
s = SWD.step(P, "The topgallant sails, staysails and jibs");
MX.forEach(function (x, i) { var h = MH[i]; P(s, "mast", "topgallant yard", SWG.cyl(0.03, 0.03, 1.6).rotateX(Math.PI / 2), x, 1.6 + h + 0.4, 0); P(s, "sail", "topgallant sail", SWG.sail(1.4, 0.9, 0.2).rotateY(Math.PI / 2), x + 0.08, 1.6 + h - 0.1, 0); });
for (var ss = 0; ss < 4; ss++)
P(s, "sail", "staysail", SWG.fin([[0, 0], [1.4, 0], [0, 1.4]], 0.02), 1.2 - ss * 1.1, 3.0 + ss * 0.4, 0);
for (var j = 0; j < 3; j++)
P(s, "sail", "jib", SWG.fin([[0, 0], [1.8 - j * 0.3, 0], [0, 1.8 - j * 0.2]], 0.02), 3.8 + j * 0.4, 2.4 + j * 0.3, 0);
P(s, "mast", "gaff", SWG.cylX(0.04, 0.04, 1.8, 6), -2.8, 4.6, 0, 0, 0, 0.3);
P(s, "mast", "boom", SWG.cylX(0.04, 0.04, 2.2, 6), -3.0, 2.6, 0);
P(s, "sail", "spanker", SWG.fin([[0, 0], [2.0, 0], [1.6, 1.8], [0, 1.6]], 0.02), -4.0, 2.7, 0);
s = SWD.step(P, "The running rigging");
MX.forEach(function (x, i) { var h = MH[i]; [3.4, 5.2, 1.6 + h + 0.4].forEach(function (y, yi) { var yy = yi < 2 ? y : y; [1, -1].forEach(function (sd) { SWD.rod(P, s, "rope", "brace", [x, yy, sd * (yi === 0 ? 1.2 : yi === 1 ? 1.0 : 0.8)], [x - 1.4, 1.95, hullZ(x - 1.4) * sd], 0.006); SWD.rod(P, s, "rope", "lift", [x, yy, sd * (yi === 0 ? 1.2 : yi === 1 ? 1.0 : 0.8)], [x, yy + 0.6, 0], 0.006); }); }); SWD.rod(P, s, "rope", "stay", [x, 1.6 + h * 0.82, 0], [x + 2.0, 1.9, 0], 0.008); });
for (var bs = 0; bs < 10; bs++)
SWD.rod(P, s, "rope", "bowsprit rigging", [4.2 + bs * 0.08, 2.1 + bs * 0.02, 0], [3.6 + bs * 0.05, 1.6, (bs % 2 ? 1 : -1) * 0.5], 0.006);
s = SWD.step(P, "The pin rails and belaying pins");
MX.forEach(function (x) { [1, -1].forEach(function (sd) { var z = hullZ(x) * 0.88 * sd; P(s, "rail", "pin rail", SWG.box(0.9, 0.05, 0.06), x, 1.95, z); for (var p = 0; p < 8; p++)
P(s, "pin", "belaying pin", SWG.cyl(0.015, 0.02, 0.16, 5), x - 0.38 + p * 0.11, 2.0, z); }); });
s = SWD.step(P, "The capstan, the wheel and the deck fittings");
P(s, "deck", "capstan", SWG.cyl(0.18, 0.22, 0.35, 12), 1.1, 1.85, 0);
for (var cb = 0; cb < 6; cb++)
P(s, "deck", "capstan bar", SWG.box(0.6, 0.03, 0.03), 1.1 + Math.cos(cb * 1.047) * 0.3, 2.0, Math.sin(cb * 1.047) * 0.3, 0, -cb * 1.047, 0);
P(s, "deck", "wheel", SWG.tyre(0.25, 0.03).rotateY(Math.PI / 2), -2.7, 2.3, 0);
for (var sp = 0; sp < 8; sp++)
P(s, "deck", "wheel spoke", SWG.cyl(0.015, 0.015, 0.65, 5), -2.7, 2.3, 0, sp * 0.785, 0, 0);
P(s, "deck", "binnacle", SWG.cyl(0.08, 0.1, 0.3, 8), -2.4, 1.85, 0);
P(s, "lantern", "bell", SWG.cone(0.08, 0.12, 10), 0.9, 2.4, 0);
for (var hc = 0; hc < 3; hc++) {
P(s, "deck", "hatch", SWG.box(0.6, 0.08, 0.5), -1.0 + hc * 1.1, 1.72, 0);
for (var gr = 0; gr < 6; gr++)
P(s, "rail", "grating", SWG.box(0.6, 0.02, 0.03), -1.0 + hc * 1.1, 1.77, -0.2 + gr * 0.08);
}
for (var br = 0; br < 12; br++)
P(s, "barrel", "barrel", SWG.cyl(0.08, 0.08, 0.18, 10), -0.5 + (br % 6) * 0.15, 1.8, (br < 6 ? 0.85 : -0.85) * (1 - Math.abs(-0.5 + (br % 6) * 0.15) / 5));
P(s, "boat", "lifeboat", SWG.sph(1, 0.55, 0.15, 0.22), 0.5, 1.95, 0);
for (var oar = 0; oar < 6; oar++)
P(s, "rail", "oar", SWG.box(0.7, 0.02, 0.03), 0.5, 2.06, -0.12 + oar * 0.05);
[1, -1].forEach(function (sd) { P(s, "trim", "anchor", SWG.box(0.05, 0.5, 0.05), 3.6, 1.5, sd * 1.0); P(s, "trim", "anchor stock", SWG.box(0.05, 0.05, 0.4), 3.6, 1.75, sd * 1.0); P(s, "rail", "cathead", SWG.box(0.35, 0.08, 0.08), 3.7, 1.85, sd * 0.95); P(s, "deck", "pump", SWG.cyl(0.05, 0.05, 0.3, 8), -0.2, 1.85, sd * 0.4); });
s = SWD.step(P, "The hull bands and portholes");
for (var b = 0; b < 10; b++) {
var y = 0.4 + b * 0.13, k = Math.sqrt(Math.max(0.02, 1 - Math.pow((1.6 - y) / 1.6, 2)));
P(s, "band", "hull band", SWG.tyre(1, 0.012).rotateX(Math.PI / 2).scale(4.55 * k, 1, 1.33 * k), 0, y, 0);
}
[1, -1].forEach(function (sd) { for (var ph = 0; ph < 16; ph++) {
var x = -3.4 + ph * 0.45, z = hullZ(x) * 0.96 * sd;
P(s, "porthole", "porthole", SWG.cylZ(0.06, 0.06, 0.03, 10), x, 1.3, z);
} });
s = SWD.step(P, "The rudder, the figurehead and the ladders");
P(s, "hull", "rudder", SWG.box(0.25, 1.2, 0.06), -4.5, 1.0, 0);
for (var gd = 0; gd < 6; gd++)
P(s, "trim", "gudgeon", SWG.box(0.12, 0.04, 0.1), -4.4, 0.6 + gd * 0.18, 0);
P(s, "trim", "figurehead", SWG.sph(0.18, 1.6, 1, 0.8), 4.45, 1.75, 0);
P(s, "mast", "jib boom", SWG.cylX(0.03, 0.05, 1.6, 6), 5.9, 2.4, 0, 0, 0, 0.25);
P(s, "mast", "dolphin striker", SWG.cyl(0.02, 0.02, 0.5, 5), 4.9, 1.95, 0);
[1, -1].forEach(function (sd) { P(s, "rail", "ladder side", SWG.box(0.04, 0.8, 0.04), -1.2, 1.2, sd * 1.27); P(s, "rail", "ladder side", SWG.box(0.04, 0.8, 0.04), -1.4, 1.2, sd * 1.26); for (var lr = 0; lr < 8; lr++)
P(s, "rail", "ladder rung", SWG.box(0.24, 0.025, 0.025), -1.3, 0.85 + lr * 0.1, sd * 1.265); });
for (var cw = 0; cw < 8; cw++)
P(s, "lantern", "cabin window", SWG.box(0.12, 0.12, 0.02), -3.9 + (cw % 4) * 0.35, 2.15, cw < 4 ? 1.01 : -1.01);
P(s, "trim", "cabin door", SWG.box(0.03, 0.45, 0.3), -2.49, 2.0, 0);
s = SWD.step(P, "The flags and pennants");
MX.forEach(function (x, i) { P(s, "flag", "pennant", SWG.fin([[0, 0], [0.9, 0.05], [0, 0.12]], 0.01), x, 1.6 + MH[i] + 1.3, 0); });
P(s, "flag", "ensign", SWG.box(0.6, 0.4, 0.01), -4.6, 3.4, 0);
P(s, "flag", "jack", SWG.box(0.3, 0.2, 0.01), 6.4, 2.9, 0);
P(s, "flag", "house flag", SWG.box(0.4, 0.25, 0.01), 2.2, 8.6, 0);
},
function (P) {
var s = SWD.step(P, "The wheel spokes");
[2.2, 0.8, -0.6].forEach(function (x) { [1.02, -1.02].forEach(function (z) { SWD.spokes(P, s, "spoke", [x, 0.75, z], 0.15, 0.56, 14, "z", 0.035); P(s, "spoke", "balance weight", SWG.box(0.3, 0.15, 0.04), x, 0.42, z); }); });
[-2.9, -4.5].forEach(function (x) { [1.02, -1.02].forEach(function (z) { SWD.spokes(P, s, "wheel", [x, 0.6, z], 0.1, 0.42, 10, "z", 0.03); }); });
s = SWD.step(P, "The valve gear");
[1.12, -1.12].forEach(function (z) {
P(s, "rod", "crosshead", SWG.box(0.3, 0.2, 0.08), 3.0, 1.15, z);
P(s, "rod", "connecting rod", SWG.box(1.6, 0.1, 0.05), 1.9, 0.95, z + (z > 0 ? 0.04 : -0.04), 0, 0, 0.15);
P(s, "rod", "combination lever", SWG.box(0.08, 0.6, 0.05), 3.2, 1.15, z);
P(s, "rod", "radius rod", SWG.box(1.4, 0.07, 0.05), 2.2, 1.45, z);
P(s, "rod", "expansion link", SWG.box(0.12, 0.4, 0.06), 1.4, 1.45, z);
P(s, "rod", "eccentric rod", SWG.box(0.9, 0.07, 0.05), 1.2, 1.05, z, 0, 0, -0.4);
P(s, "body", "cylinder", SWG.cylX(0.3, 0.3, 0.9, 14), 3.3, 1.15, z * 0.95);
P(s, "chrome", "cylinder cover", SWG.cylX(0.32, 0.32, 0.05, 14), 3.77, 1.15, z * 0.95);
P(s, "chrome", "cylinder cover", SWG.cylX(0.32, 0.32, 0.05, 14), 2.83, 1.15, z * 0.95);
P(s, "trim", "steam pipe", SWG.cyl(0.08, 0.08, 0.9, 8), 3.4, 2.0, z * 0.7, 0, 0, -0.2);
});
s = SWD.step(P, "The boiler bands, handrails and domes");
for (var b = 0; b < 5; b++)
P(s, "brass", "boiler band", SWG.cylX(0.87, 0.87, 0.06, 24), 0.0 + b * 0.7, 2.1, 0);
[1, -1].forEach(function (sd) { P(s, "chrome", "handrail", SWG.cylX(0.025, 0.025, 4.0, 6), 1.6, 2.5, sd * 0.92); for (var k = 0; k < 6; k++)
P(s, "chrome", "handrail knob", SWG.sph(0.04), 0.0 + k * 0.65, 2.5, sd * 0.88); P(s, "body", "sandbox", SWG.box(0.4, 0.3, 0.25), 1.5, 1.55, sd * 0.95); P(s, "chrome", "sand pipe", SWG.cyl(0.02, 0.02, 0.6, 5), 1.6, 1.0, sd * 0.95, 0, 0, 0.3); P(s, "chrome", "sand pipe", SWG.cyl(0.02, 0.02, 0.6, 5), 1.4, 1.0, sd * 0.95, 0, 0, -0.3); });
P(s, "brass", "safety valve", SWG.cyl(0.08, 0.1, 0.3, 10), -0.3, 3.1, 0.1);
P(s, "brass", "safety valve", SWG.cyl(0.08, 0.1, 0.3, 10), -0.3, 3.1, -0.1);
P(s, "brass", "whistle", SWG.cyl(0.04, 0.06, 0.3, 8), -0.75, 3.4, 0);
P(s, "chrome", "smokebox dart", SWG.cylX(0.03, 0.03, 0.25, 6), 4.12, 2.1, 0);
P(s, "chrome", "dart handle", SWG.box(0.04, 0.3, 0.04), 4.2, 2.1, 0);
P(s, "plate", "number plate", SWG.box(0.03, 0.15, 0.5), 4.06, 1.6, 0);
s = SWD.step(P, "Inside the cab");
P(s, "trim", "firebox door", SWG.box(0.05, 0.4, 0.5), -0.62, 2.0, 0);
for (var g = 0; g < 4; g++)
P(s, "gauge", "gauge", SWG.cylX(0.07, 0.07, 0.03, 12), -0.66, 2.8, -0.45 + g * 0.3);
P(s, "brass", "regulator", SWG.box(0.05, 0.05, 0.5), -0.68, 2.5, 0.3, 0, 0, 0.4);
P(s, "brass", "reverser", SWG.cyl(0.03, 0.03, 0.6, 6), -1.2, 1.7, 0.7);
P(s, "glass", "water gauge", SWG.cyl(0.03, 0.03, 0.3, 6), -0.66, 2.35, 0.6);
P(s, "glass", "water gauge", SWG.cyl(0.03, 0.03, 0.3, 6), -0.66, 2.35, -0.6);
[1, -1].forEach(function (sd) { P(s, "trim", "seat", SWG.box(0.3, 0.08, 0.3), -1.8, 2.0, sd * 0.7); P(s, "glass", "cab window", SWG.box(0.03, 0.35, 0.35), -0.62, 2.85, sd * 0.55); P(s, "glass", "side window", SWG.box(0.5, 0.4, 0.03), -1.2, 2.75, sd * 1.01); });
s = SWD.step(P, "The brakes and the steps");
[2.2, 0.8, -0.6].forEach(function (x) { [1, -1].forEach(function (sd) { P(s, "brake", "brake shoe", SWG.box(0.12, 0.4, 0.1), x - 0.68, 0.75, sd * 0.9); P(s, "brake", "brake hanger", SWG.box(0.05, 0.5, 0.05), x - 0.72, 1.1, sd * 0.9); }); });
P(s, "brake", "pull rod", SWG.box(2.8, 0.05, 0.05), 0.8, 0.55, 0.9);
P(s, "brake", "pull rod", SWG.box(2.8, 0.05, 0.05), 0.8, 0.55, -0.9);
[1, -1].forEach(function (sd) { P(s, "step", "front step", SWG.box(0.25, 0.04, 0.2), 3.9, 0.7, sd * 0.95); P(s, "step", "cab step", SWG.box(0.25, 0.04, 0.2), -1.6, 0.9, sd * 1.1); P(s, "step", "cab step", SWG.box(0.25, 0.04, 0.2), -1.6, 0.6, sd * 1.1); P(s, "chrome", "buffer stock", SWG.cylX(0.1, 0.12, 0.2, 8), 4.0, 1.0, sd * 0.75); P(s, "chrome", "lamp", SWG.sph(0.12), 4.0, 1.3, sd * 0.7); P(s, "trim", "vacuum pipe", SWG.cyl(0.04, 0.04, 0.5, 6), 4.05, 1.25, sd * 0.35); });
P(s, "chrome", "coupling hook", SWG.box(0.25, 0.08, 0.06), 4.15, 0.9, 0);
P(s, "chrome", "coupling link", SWG.tyre(0.08, 0.02), 4.3, 0.85, 0);
s = SWD.step(P, "The tender's details");
for (var c = 0; c < 6; c++)
P(s, "trim", "coal rail", SWG.box(0.05, 0.3, 2.0), -2.5 - c * 0.48, 2.8, 0);
P(s, "trim", "tool box", SWG.box(0.4, 0.25, 0.6), -2.6, 2.75, 0.6);
P(s, "chrome", "water filler", SWG.cyl(0.15, 0.15, 0.15, 12), -4.6, 2.7, 0);
[1, -1].forEach(function (sd) { P(s, "step", "tender step", SWG.box(0.25, 0.04, 0.2), -2.5, 0.9, sd * 1.1); P(s, "step", "tender step", SWG.box(0.25, 0.04, 0.2), -4.9, 0.9, sd * 1.1); P(s, "chrome", "tender buffer", SWG.cylX(0.12, 0.12, 0.35, 8), -5.15, 1.0, sd * 0.75); [-2.9, -4.5].forEach(function (x) { P(s, "trim", "axle box", SWG.box(0.25, 0.3, 0.12), x, 0.8, sd * 1.08); for (var l = 0; l < 3; l++)
P(s, "brake", "spring leaf", SWG.box(0.7 - l * 0.15, 0.04, 0.1), x, 1.05 + l * 0.05, sd * 1.08); }); });
for (var cl = 0; cl < 20; cl++)
P(s, "coal", "lump of coal", SWG.sph(0.14 + (cl % 3) * 0.03), -2.8 - (cl % 5) * 0.45, 2.85 + Math.floor(cl / 10) * 0.08, -0.6 + Math.floor(cl / 5) % 4 * 0.4);
},
function (P) {
var s = SWD.step(P, "The rotor head");
P(s, "hub", "hub", SWG.cyl(0.25, 0.25, 0.15, 12), 0, 3.95, 0);
P(s, "hub", "swashplate", SWG.cyl(0.3, 0.3, 0.05, 14), 0, 3.7, 0);
for (var i = 0; i < 4; i++) {
var a = i * Math.PI / 2;
P(s, "hub", "pitch link", SWG.cyl(0.02, 0.02, 0.3, 5), Math.cos(a) * 0.25, 3.85, Math.sin(a) * 0.25);
P(s, "hub", "blade grip", SWG.box(0.4, 0.08, 0.12), Math.cos(a) * 0.45, 3.9, Math.sin(a) * 0.45, 0, -a, 0);
P(s, "white", "blade tip", SWG.box(0.3, 0.05, 0.33), Math.cos(a) * 3.95, 3.87, Math.sin(a) * 3.95, 0, -a, 0);
}
s = SWD.step(P, "The tail rotor and the tail");
P(s, "hub", "tail hub", SWG.cylZ(0.08, 0.08, 0.1, 8), -5.6, 3.0, 0.22);
for (var t = 0; t < 4; t++)
P(s, "rotor", "tail blade", SWG.box(0.08, 0.65, 0.1), -5.6 + Math.sin(t * 1.57) * 0.3, 3.0 + Math.cos(t * 1.57) * 0.3, 0.26, 0, 0, t * 1.57);
P(s, "hub", "tail gearbox", SWG.sph(0.15), -5.6, 3.0, 0.1);
for (var d = 0; d < 6; d++)
P(s, "trim", "drive shaft cover", SWG.box(0.5, 0.08, 0.2), -1.8 - d * 0.6, 2.85 - d * 0.03, 0);
P(s, "chrome", "tail skid", SWG.box(0.4, 0.05, 0.05), -5.2, 2.05, 0, 0, 0, 0.6);
[1, -1].forEach(function (sd) { P(s, "body", "stabiliser", SWG.box(0.5, 0.05, 0.7), -4.6, 2.5, sd * 0.45); P(s, "white", "endplate", SWG.box(0.4, 0.3, 0.04), -4.6, 2.55, sd * 0.82); });
s = SWD.step(P, "The engine cowling");
[1, -1].forEach(function (sd) { P(s, "trim", "air intake", SWG.box(0.3, 0.25, 0.2), 0.4, 3.4, sd * 0.4); P(s, "trim", "exhaust", SWG.cylX(0.1, 0.12, 0.4, 10), -0.9, 3.35, sd * 0.35); for (var c = 0; c < 3; c++)
P(s, "body", "cowl panel", SWG.box(0.45, 0.3, 0.03), 0.3 - c * 0.5, 3.3, sd * 0.52); for (var g = 0; g < 5; g++)
P(s, "trim", "grille line", SWG.box(0.4, 0.02, 0.02), -0.6, 3.2 + g * 0.05, sd * 0.54); });
s = SWD.step(P, "Inside the cabin");
for (var st = 0; st < 4; st++) {
P(s, "seat", "seat", SWG.box(0.4, 0.1, 0.4), 0.6 - Math.floor(st / 2) * 1.0, 1.75, (st % 2 ? 0.35 : -0.35));
P(s, "seat", "seat back", SWG.box(0.1, 0.5, 0.4), 0.4 - Math.floor(st / 2) * 1.0, 2.0, (st % 2 ? 0.35 : -0.35));
P(s, "belt", "seat belt", SWG.box(0.02, 0.4, 0.05), 0.47 - Math.floor(st / 2) * 1.0, 2.0, (st % 2 ? 0.25 : -0.25));
P(s, "belt", "seat belt", SWG.box(0.02, 0.4, 0.05), 0.47 - Math.floor(st / 2) * 1.0, 2.0, (st % 2 ? 0.45 : -0.45));
}
P(s, "trim", "instrument panel", SWG.box(0.1, 0.35, 1.0), 1.5, 2.15, 0);
for (var dl = 0; dl < 10; dl++)
P(s, "dial", "instrument", SWG.cylX(0.05, 0.05, 0.02, 10), 1.56, 2.08 + (dl > 4 ? 0.13 : 0), -0.4 + (dl % 5) * 0.2);
[1, -1].forEach(function (sd) { P(s, "trim", "cyclic", SWG.cyl(0.02, 0.02, 0.4, 5), 1.0, 1.95, sd * 0.35); P(s, "trim", "collective", SWG.cyl(0.02, 0.02, 0.4, 5), 0.7, 1.85, sd * 0.55, 0, 0, 0.6); P(s, "trim", "pedal", SWG.box(0.05, 0.15, 0.1), 1.4, 1.6, sd * 0.25); P(s, "trim", "pedal", SWG.box(0.05, 0.15, 0.1), 1.4, 1.6, sd * 0.45); });
P(s, "trim", "floor", SWG.box(2.0, 0.04, 1.4), 0.3, 1.65, 0);
s = SWD.step(P, "The doors, steps and windows");
[1, -1].forEach(function (sd) { P(s, "trim", "door frame", SWG.box(0.05, 0.9, 0.03), -0.9, 2.2, sd * 1.12); P(s, "trim", "door frame", SWG.box(0.05, 0.9, 0.03), 0.2, 2.25, sd * 1.14); P(s, "chrome", "door handle", SWG.box(0.12, 0.03, 0.03), 0.1, 2.2, sd * 1.16); P(s, "chrome", "step", SWG.box(0.3, 0.04, 0.15), 0.0, 1.15, sd * 1.05); P(s, "glass", "window pane", SWG.box(0.35, 0.3, 0.02), 0.6, 2.55, sd * 1.0); P(s, "glass", "window pane", SWG.box(0.3, 0.25, 0.02), -1.2, 2.5, sd * 1.05); P(s, "glass", "chin window", SWG.box(0.3, 0.03, 0.25), 1.5, 1.4, sd * 0.3); });
s = SWD.step(P, "The skids and the rescue winch");
[0.9, -0.9].forEach(function (z) { P(s, "chrome", "skid cap", SWG.sph(0.08), 1.8, 0.5, z); P(s, "chrome", "skid cap", SWG.sph(0.08), -1.8, 0.5, z); });
P(s, "chrome", "cross tube", SWG.cylZ(0.05, 0.05, 1.8, 6), 0.8, 1.0, 0);
P(s, "chrome", "cross tube", SWG.cylZ(0.05, 0.05, 1.8, 6), -0.8, 1.0, 0);
P(s, "winch", "winch", SWG.cylX(0.12, 0.12, 0.4, 10), 0.0, 3.1, 1.3);
P(s, "winch", "winch arm", SWG.box(0.08, 0.08, 0.5), 0.0, 3.1, 1.05);
SWD.rod(P, s, "trim", "winch cable", [0, 3.0, 1.3], [0, 1.4, 1.3], 0.01);
P(s, "winch", "hook", SWG.tyre(0.06, 0.015), 0, 1.35, 1.3);
P(s, "light", "searchlight", SWG.cylX(0.1, 0.12, 0.2, 10), 1.6, 1.3, 0.3);
P(s, "light", "landing light", SWG.sph(0.06), 1.9, 1.6, 0);
P(s, "light", "nav light", SWG.sph(0.05), -0.3, 3.2, 0.6);
for (var an = 0; an < 5; an++)
P(s, "trim", "aerial", SWG.cyl(0.01, 0.01, 0.3, 4), -1.5 + an * 0.4, an % 2 ? 3.3 : 1.1, 0);
s = SWD.step(P, "The boom rings and the rescue kit");
for (var rg = 0; rg < 8; rg++)
P(s, "trim", "boom ring", SWG.cylX(0.3 - rg * 0.022, 0.3 - rg * 0.022, 0.04, 14), -1.8 - rg * 0.5, 2.52, 0);
for (var pl = 0; pl < 4; pl++)
P(s, "trim", "panel line", SWG.box(0.02, 0.8, 0.02), -0.9 + pl * 0.6, 2.2, 1.1 - Math.abs(pl - 1.5) * 0.05);
[1, -1].forEach(function (sd) { P(s, "winch", "float bag", SWG.cylX(0.1, 0.1, 1.6, 10), 0, 0.62, sd * 0.9); P(s, "chrome", "handhold", SWG.box(0.25, 0.03, 0.03), -1.1, 2.75, sd * 1.05); });
P(s, "white", "stretcher", SWG.box(1.4, 0.06, 0.4), -0.4, 1.72, 0);
P(s, "belt", "first aid box", SWG.box(0.25, 0.18, 0.18), -0.9, 1.78, 0.4);
},
function (m) {
var K = swKitDef(m.k);
if (!K)
return null;
var P = K[5](), g = new THREE.Group(), B = {}, M4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
P.L.forEach(function (p, i) {
var c = (m.c && m.c[i] !== undefined && m.c[i] !== null) ? m.c[i] : SW_PLAIN, f = (m.f && m.f[i]) || "gloss", key = c + "|" + f, G = p.geo.index ? p.geo.toNonIndexed() : p.geo.clone();
e.set(p.r[0], p.r[1], p.r[2]);
q.setFromEuler(e);
v.fromArray(p.p);
M4.compose(v, q, one);
G.applyMatrix4(M4);
if (!G.attributes.normal)
G.computeVertexNormals();
(B[key] = B[key] || { c: c, f: f, L: [] }).L.push(G);
p.geo.dispose();
});
Object.keys(B).forEach(function (k) {
var b = B[k], n = 0;
b.L.forEach(function (G) { n += G.attributes.position.count; });
var Pa = new Float32Array(n * 3), Na = new Float32Array(n * 3), o = 0;
b.L.forEach(function (G) { Pa.set(G.attributes.position.array, o * 3); Na.set(G.attributes.normal.array, o * 3); o += G.attributes.position.count; G.dispose(); });
var GG = new THREE.BufferGeometry();
GG.setAttribute("position", new THREE.BufferAttribute(Pa, 3));
GG.setAttribute("normal", new THREE.BufferAttribute(Na, 3));
GG.computeBoundingSphere();
var me = new THREE.Mesh(GG, swShiny(b.c, b.f === "metal" ? 130 : b.f === "gloss" ? 80 : 6));
g.add(me);
});
return g;
},
function () {
var d = swData(), fns = {}, h = "<div class='sw-tip'>Choose a kit. Fit the parts step by step, then paint it however you like. There's no hurry and nothing can go wrong.</div><div class='sw-grid'>";
SW_KITS.forEach(function (K) { var n = swKitCount(K), sv = swLocalGet("mk:" + K[0]); h += "<div class='sw-tile' data-sw='k_" + K[0] + "'><div style='font-size:36px'>" + K[2] + "</div><b>" + esc(K[1]) + "</b><small>" + esc(K[3]) + "<br>" + n + " parts" + (sv && sv.b ? " · started" : "") + "</small></div>"; fns["k_" + K[0]] = function () { swModelStart(K[0]); }; });
h += "</div>";
var made = d.made.models || [];
if (made.length)
h += "<div class='sw-tip'>You have finished " + made.length + " model" + (made.length === 1 ? "" : "s") + ": they are in the glass case.</div>";
var b = swPanel("✈️ The Model Workshop", h, null);
swBind(b, fns);
},
function (S, pi) {
var p = S.parts[pi];
var list = S.zone ? S.parts.map(function (q, j) { return q.z === p.z ? j : -1; }).filter(function (j) { return j >= 0 && (S.built === undefined || S.parts[j].st < S.built); }) : [pi];
list.forEach(function (j) { S.c[j] = S.col; S.f[j] = S.fin; var m = S.meshes[j]; m.material.color.setHex(S.col); var mm = swFinMat(S.col, S.fin, true); m.material.shininess = mm.shininess; m.material.specular.copy(mm.specular); mm.dispose(); });
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(620, 0.05);
}
catch (e) { }
S.save();
},
function (S, fns) {
var h = "<div class='sw-h'>Paint</div><div>";
SW_PAINTS.forEach(function (P, i) { h += "<span class='sw-sw" + (S.col === P[0] ? " on" : "") + "' data-sw='p" + i + "' title='" + P[1] + "' style='background:#" + P[0].toString(16).padStart(6, "0") + "'></span>"; fns["p" + i] = function () { S.col = P[0]; S.side(); }; });
h += "</div>";
["matt", "gloss", "metal"].forEach(function (f) { h += swBtn("f" + f, { matt: "Matt", gloss: "Gloss", metal: "Metal" }[f], "", { small: 1, on: S.fin === f }); fns["f" + f] = function () { S.fin = f; S.side(); }; });
h += "<br>" + swBtn("zone", S.zone ? "🎨 Painting all the matching parts" : "🖌️ Painting one part at a time", "tap to change", { small: 1, on: S.zone });
fns.zone = function () { S.zone = !S.zone; S.side(); };
h += "<div class='sw-tip'>Choose a colour, then tap a part.</div>";
return h;
},
function (k) {
var K = swKitDef(k), P = K[5](), sv = swLocalGet("mk:" + k) || {}, n = P.L.length;
var S = { k: k, K: K, parts: P.L, steps: P.steps, built: Math.min(sv.b || 0, P.steps.length), c: sv.c || new Array(n).fill(null), f: sv.f || new Array(n).fill("gloss"), col: K[4].body || 0xB8282A, fin: "gloss", zone: true, meshes: [] };
S.save = function () { swLocalSet("mk:" + k, { b: S.built, c: S.c, f: S.f }); };
var ghostM = new THREE.MeshPhongMaterial({ color: 0xF0F4FF, transparent: true, opacity: 0.35, depthWrite: false, emissive: new THREE.Color(0x3A4A6A) });
swBenchOpen(K[2] + " " + K[1], { r: 16, rMin: 4, rMax: 40, tg: [0, k === "shuttle" || k === "rocket" ? 5 : 1.6, 0], th: 0.9, ph: 1.15, table: { w: 30, d: 22, matCol: 0x4A5A6A },
pick: function (h) {
for (var i = 0; i < h.length; i++) {
var pi = h[i].object.userData.pi;
if (pi === undefined)
continue;
if (S.parts[pi].st === S.built) {
swModelFit(S);
return;
}
}
var p = swPaintPick(S, h);
if (p >= 0)
swPaintApply(S, p);
},
tick: function () { ghostM.opacity = 0.28 + 0.1 * Math.sin(SWB.t * 1.6); },
close: function () { S.save(); ghostM.dispose(); }
});
P.L.forEach(function (p, i) { var c = S.c[i] !== null && S.c[i] !== undefined ? S.c[i] : SW_PLAIN; var me = new THREE.Mesh(p.geo, swFinMat(c, S.f[i] || "gloss", true)); me.position.fromArray(p.p); me.rotation.set(p.r[0], p.r[1], p.r[2]); me.userData.pi = i; me.userData.mat = me.material; SWB.root.add(me); SWB.own(me); S.meshes.push(me); });
S.ghostM = ghostM;
S.side = function () { swModelSide(S); };
swModelShow(S);
S.side();
},
function (S) {
if (S.built >= S.steps.length)
return;
var st = S.built;
S.built++;
S.save();
swModelShow(S);
var ms = S.meshes.filter(function (m, i) { return S.parts[i].st === st; }), from = ms.map(function (m) { return m.position.clone(); });
ms.forEach(function (m) { m.position.y += 2.4; m.position.z += 1.5; });
SWB.anim.push({ t: 0, d: 0.7, f: function (k) { var e = 1 - Math.pow(1 - k, 3); ms.forEach(function (m, j) { m.position.set(from[j].x, from[j].y + 2.4 * (1 - e), from[j].z + 1.5 * (1 - e)); }); } });
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(700, 0.06);
}
catch (e) { }
S.side();
},
function (S) {
var fns = {}, h = "";
if (S.built < S.steps.length) {
h += "<div class='sw-h'>Step " + (S.built + 1) + " of " + S.steps.length + ": " + esc(S.steps[S.built]) + "</div><div class='sw-tip'>The glowing parts go on next. Tap them, or:</div>" + swBtn("fit", "✔️ Fit these parts", "") + swBtn("back", "↩️ Take the last step off", "", { small: 1 });
fns.fit = function () { swModelFit(S); };
}
else
h += "<div class='sw-h'>🎉 All the parts are on</div>" + swBtn("back", "↩️ Take the last step off", "", { small: 1 });
fns.back = function () { if (S.built > 0) {
S.built--;
S.save();
swModelShow(S);
S.side();
} };
h += swPaintHtml(S, fns);
h += swBtn("box", "📦 Paint it like the box", "", { small: 1 }) + swBtn("plain", "🧽 Back to plain grey", "", { small: 1 });
fns.box = function () { S.parts.forEach(function (p, i) { var c = S.K[4][p.z]; if (c === undefined)
return; S.c[i] = c; S.f[i] = p.z === "chrome" || p.z === "brass" ? "metal" : "gloss"; var m = S.meshes[i]; m.userData.mat.color.setHex(c); var mm = swFinMat(c, S.f[i], true); m.userData.mat.shininess = mm.shininess; m.userData.mat.specular.copy(mm.specular); mm.dispose(); }); S.save(); };
fns.plain = function () { S.parts.forEach(function (p, i) { S.c[i] = null; S.meshes[i].userData.mat.color.setHex(SW_PLAIN); }); S.save(); };
if (S.built >= S.steps.length) {
h += "<div>" + swBtn("done", "🏆 Put it in the glass case", "", { col: "#5A8A5A" }) + "</div>";
fns.done = function () {
var d = swData();
d.made.models = d.made.models || [];
d.made.models.unshift({ k: S.k, c: S.c.slice(), f: S.f.slice() });
if (d.made.models.length > 16)
d.made.models.length = 16;
swKeep("model", S.K[1], S.K[2]);
swDid("model");
swLocalSet("mk:" + S.k, { b: 0 });
var R = SW_ROOMS.models;
if (R && R.g)
swDisplayRefresh(R);
swSay("Your model is in the glass case now.");
swPanelClose();
};
}
swBenchSide(h, fns);
},
function (P) {
P("base", "base", SWG.cyl(1.1, 1.2, 0.3), 0, 0.15, 0);
[0.22, -0.22].forEach(function (z) { P("armour", "leg", SWG.cyl(0.17, 0.19, 1.3), 0, 0.95, z); P("boots", "boot", SWG.sph(0.22, 1.3, 0.7, 1), 0.06, 0.4, z); });
P("tabard", "tabard", SWG.cyl(0.5, 0.68, 1.0), 0, 1.75, 0);
P("armour", "chest", SWG.cyl(0.45, 0.5, 0.9), 0, 2.5, 0);
P("belt", "belt", SWG.cyl(0.52, 0.52, 0.14), 0, 2.05, 0);
P("armour", "arm", SWG.cyl(0.13, 0.14, 1.1), 0, 2.35, 0.62, 0.3, 0, 0);
P("armour", "arm", SWG.cyl(0.13, 0.14, 1.1), 0.25, 2.4, -0.62, -0.6, 0, -0.5);
P("armour", "helmet", SWG.sph(0.36, 1, 1.15, 1), 0, 3.25, 0);
P("trim", "visor", SWG.box(0.08, 0.1, 0.42), 0.34, 3.25, 0);
P("plume", "plume", SWG.sph(0.25, 0.6, 1.6, 0.6), -0.05, 3.75, 0);
P("shield", "shield", SWG.fin([[0, 0.7], [0.5, 0.55], [0.5, -0.1], [0, -0.7], [-0.5, -0.1], [-0.5, 0.55]], 0.1).rotateY(Math.PI / 2), 0.15, 2.2, 0.86);
P("trim", "shield emblem", SWG.sph(0.16, 0.3, 1, 1), 0.22, 2.3, 0.86);
P("blade", "sword blade", SWG.box(0.05, 1.7, 0.12), 0.65, 2.9, -0.95, 0, 0, -0.2);
P("trim", "sword guard", SWG.box(0.06, 0.08, 0.5), 0.5, 2.05, -0.95);
P("trim", "sword grip", SWG.cyl(0.05, 0.05, 0.35), 0.48, 1.85, -0.95);
},
function (P) {
P("base", "base", SWG.cyl(1.6, 1.7, 0.3), 0, 0.15, 0);
P("scales", "body", SWG.sph(1, 1.5, 0.85, 0.8), 0, 1.5, 0);
P("belly", "belly", SWG.sph(1, 1.3, 0.7, 0.6), 0.1, 1.35, 0);
P("scales", "neck", SWG.cyl(0.32, 0.45, 1.3), 1.3, 2.4, 0, 0, 0, -0.6);
P("scales", "head", SWG.sph(1, 0.55, 0.4, 0.4), 1.95, 3.05, 0);
P("scales", "snout", SWG.sph(1, 0.45, 0.25, 0.3), 2.4, 2.95, 0);
P("eyes", "eye", SWG.sph(0.08), 2.15, 3.2, 0.27);
P("eyes", "eye", SWG.sph(0.08), 2.15, 3.2, -0.27);
P("horns", "horn", SWG.cone(0.08, 0.5), 1.75, 3.5, 0.18, 0, 0, 0.5);
P("horns", "horn", SWG.cone(0.08, 0.5), 1.75, 3.5, -0.18, 0, 0, 0.5);
P("wings", "wing", SWG.fin([[0, 0], [1.6, 1.8], [0.4, 1.2], [-0.6, 1.9], [-0.9, 0.4]], 0.06).rotateX(-0.5), -0.2, 2.0, 0.5);
P("wings", "wing", SWG.fin([[0, 0], [1.6, 1.8], [0.4, 1.2], [-0.6, 1.9], [-0.9, 0.4]], 0.06).rotateX(0.5), -0.2, 2.0, -0.5);
[[0.8, 0.45], [0.8, -0.45], [-0.8, 0.45], [-0.8, -0.45]].forEach(function (l) { P("scales", "leg", SWG.cyl(0.16, 0.2, 0.9), l[0], 0.75, l[1]); P("claws", "foot", SWG.sph(0.22, 1.3, 0.5, 1), l[0] + 0.1, 0.38, l[1]); });
for (var t = 0; t < 6; t++)
P("scales", "tail", SWG.sph(0.35 - t * 0.05), -1.4 - t * 0.42, 1.25 - t * 0.12 + Math.sin(t) * 0.1, Math.sin(t * 0.8) * 0.4);
for (var s = 0; s < 6; s++)
P("horns", "spine", SWG.cone(0.09, 0.3), -1.0 + s * 0.42, 2.28 + Math.sin(s * 0.5) * 0.05, 0);
},
function (P) {
P("branch", "branch", SWG.cylX(0.25, 0.3, 3), 0, 0.3, 0);
P("feathers", "body", SWG.sph(1, 0.85, 1.15, 0.8), 0, 1.55, 0);
P("chest", "chest", SWG.sph(1, 0.55, 0.85, 0.4), 0.38, 1.4, 0);
P("feathers", "head", SWG.sph(0.68), 0, 2.95, 0);
P("face", "face disc", SWG.cylX(0.3, 0.3, 0.06), 0.52, 3.0, 0.24);
P("face", "face disc", SWG.cylX(0.3, 0.3, 0.06), 0.52, 3.0, -0.24);
P("eyes", "eye", SWG.sph(0.15), 0.58, 3.02, 0.24);
P("eyes", "eye", SWG.sph(0.15), 0.58, 3.02, -0.24);
P("pupils", "pupil", SWG.sph(0.08), 0.72, 3.02, 0.24);
P("pupils", "pupil", SWG.sph(0.08), 0.72, 3.02, -0.24);
P("beak", "beak", SWG.coneX(0.08, 0.25), 0.7, 2.82, 0);
P("feathers", "ear tuft", SWG.cone(0.12, 0.4), 0, 3.6, 0.35, 0, 0, 0);
P("feathers", "ear tuft", SWG.cone(0.12, 0.4), 0, 3.6, -0.35);
P("wings", "wing", SWG.sph(1, 0.6, 0.95, 0.25), -0.1, 1.65, 0.7);
P("wings", "wing", SWG.sph(1, 0.6, 0.95, 0.25), -0.1, 1.65, -0.7);
P("feet", "foot", SWG.sph(0.18, 1.4, 0.5, 1), 0.25, 0.55, 0.25);
P("feet", "foot", SWG.sph(0.18, 1.4, 0.5, 1), 0.25, 0.55, -0.25);
},
function (P) {
P("base", "base", SWG.cyl(1.4, 1.5, 0.3), 0, 0.15, 0);
P("fur", "body", SWG.sph(1, 1.1, 0.55, 0.5), 0, 1.2, 0);
P("white", "chest", SWG.sph(1, 0.45, 0.45, 0.38), 0.75, 1.25, 0);
P("fur", "head", SWG.sph(0.45), 1.15, 1.85, 0);
P("white", "cheeks", SWG.sph(1, 0.3, 0.25, 0.38), 1.35, 1.72, 0);
P("fur", "snout", SWG.coneX(0.17, 0.55), 1.65, 1.75, 0);
P("dark", "nose", SWG.sph(0.07), 1.92, 1.76, 0);
P("fur", "ear", SWG.cone(0.16, 0.4), 1.05, 2.35, 0.22);
P("fur", "ear", SWG.cone(0.16, 0.4), 1.05, 2.35, -0.22);
P("dark", "eye", SWG.sph(0.06), 1.5, 1.95, 0.18);
P("dark", "eye", SWG.sph(0.06), 1.5, 1.95, -0.18);
[[0.6, 0.25], [0.6, -0.25], [-0.6, 0.25], [-0.6, -0.25]].forEach(function (l) { P("fur", "leg", SWG.cyl(0.1, 0.09, 0.8), l[0], 0.65, l[1]); P("dark", "paw", SWG.sph(0.12, 1.3, 0.6, 1), l[0] + 0.06, 0.33, l[1]); });
P("fur", "tail", SWG.sph(1, 0.85, 0.32, 0.32), -1.5, 1.35, 0.2, 0, 0.3, 0.6);
P("white", "tail tip", SWG.sph(0.25), -2.15, 1.85, 0.4);
},
function (P) {
P("base", "base", SWG.cyl(1.0, 1.1, 0.3), 0, 0.15, 0);
P("robe", "robe", SWG.cyl(0.3, 0.8, 2.3), 0, 1.45, 0);
P("robe", "sleeve", SWG.cyl(0.14, 0.22, 1.0), 0.15, 2.2, 0.42, 0.6, 0, 0);
P("robe", "sleeve", SWG.cyl(0.14, 0.22, 1.0), 0.15, 2.2, -0.42, -0.4, 0, 0);
P("skin", "head", SWG.sph(0.3), 0, 2.85, 0);
P("beard", "beard", SWG.cone(0.3, 0.9), 0.15, 2.45, 0, Math.PI, 0, 0);
P("hat", "hat brim", SWG.cyl(0.55, 0.55, 0.05), 0, 3.1, 0);
P("hat", "hat", SWG.cone(0.32, 1.4), -0.1, 3.8, 0, 0, 0, 0.15);
P("trim", "belt", SWG.cyl(0.42, 0.42, 0.1), 0, 2.1, 0);
P("staff", "staff", SWG.cyl(0.05, 0.05, 3.2), 0.35, 1.75, -0.75);
P("crystal", "crystal", SWG.sph(0.18), 0.35, 3.4, -0.75);
P("skin", "hand", SWG.sph(0.1), 0.3, 2.4, -0.68);
},
function (P) {
P("base", "base", SWG.cyl(1.3, 1.4, 0.3), 0, 0.15, 0);
P("stone", "tower", SWG.cyl(0.8, 0.9, 3.2), 0, 1.9, 0);
P("stone", "top", SWG.cyl(0.95, 0.95, 0.3), 0, 3.6, 0);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
P("stone", "battlement", SWG.box(0.3, 0.35, 0.3), Math.cos(a) * 0.82, 3.9, Math.sin(a) * 0.82, 0, -a, 0);
}
P("roof", "roof", SWG.cone(0.8, 1.4), 0, 4.75, 0);
P("door", "door", SWG.box(0.1, 0.8, 0.5), 0.86, 0.75, 0);
P("window", "window", SWG.box(0.1, 0.4, 0.25), 0.82, 2.4, 0);
P("window", "window", SWG.box(0.1, 0.4, 0.25), -0.82, 2.8, 0);
P("flag", "flag", SWG.box(0.4, 0.25, 0.02), 0.2, 5.7, 0);
P("trim", "flagpole", SWG.cyl(0.02, 0.02, 0.6), 0, 5.65, 0);
},
function (m) { if (!swFigDef(m.k))
return null; var L = swFigParts(m.k), g = new THREE.Group(); L.forEach(function (p, i) { var c = (m.c && m.c[i] !== null && m.c[i] !== undefined) ? m.c[i] : SW_PLAIN, f = (m.f && m.f[i]) || "matt"; var me = new THREE.Mesh(p.geo, swShiny(c, f === "metal" ? 130 : f === "gloss" ? 80 : 6)); me.position.fromArray(p.p); me.rotation.set(p.r[0], p.r[1], p.r[2]); g.add(me); }); return g; },
function () {
var fns = {}, h = "<div class='sw-tip'>Choose a figure to paint. Turn it round, come close, and colour each part.</div><div class='sw-grid'>";
SW_FIGS.forEach(function (F) { h += "<div class='sw-tile' data-sw='f_" + F[0] + "'><div style='font-size:36px'>" + F[2] + "</div><b>" + F[1] + "</b><small>" + swFigParts(F[0]).length + " parts to paint</small></div>"; fns["f_" + F[0]] = function () { swFigureStart(F[0]); }; });
h += "</div>";
var b = swPanel("🖌️ Painting figures", h, null);
swBind(b, fns);
},
function (k) {
var F = swFigDef(k), L = swFigParts(k), sv = swLocalGet("fg:" + k) || {}, n = L.length;
var S = { k: k, parts: L, c: sv.c || new Array(n).fill(null), f: sv.f || new Array(n).fill("matt"), col: 0xB8282A, fin: "matt", zone: false, meshes: [] };
S.save = function () { swLocalSet("fg:" + k, { c: S.c, f: S.f }); };
swBenchOpen(F[2] + " " + F[1], { r: 9, rMin: 2.2, rMax: 20, tg: [0, 1.9, 0], th: 1.2, ph: 1.2, table: { w: 16, d: 12, matCol: 0x5A6A5A },
pick: function (h) { var p = swPaintPick(S, h); if (p >= 0)
swPaintApply(S, p); }, close: function () { S.save(); } });
L.forEach(function (p, i) { var c = S.c[i] !== null && S.c[i] !== undefined ? S.c[i] : SW_PLAIN; var me = new THREE.Mesh(p.geo, swFinMat(c, S.f[i] || "matt", true)); me.position.fromArray(p.p); me.rotation.set(p.r[0], p.r[1], p.r[2]); me.userData.pi = i; SWB.root.add(me); SWB.own(me); S.meshes.push(me); });
S.side = function () {
var fns = {}, h = "<div class='sw-h'>" + F[1] + "</div>" + swPaintHtml(S, fns) + "<div>" + swBtn("done", "🏆 Put it in the case", "", { col: "#5A8A5A" }) + swBtn("plain", "🧽 Start again", "", { small: 1 }) + "</div>";
fns.plain = function () { S.parts.forEach(function (p, i) { S.c[i] = null; S.meshes[i].material.color.setHex(SW_PLAIN); }); S.save(); };
fns.done = function () { var d = swData(); d.made.figures = d.made.figures || []; d.made.figures.unshift({ k: k, c: S.c.slice(), f: S.f.slice() }); if (d.made.figures.length > 16)
d.made.figures.length = 16; swKeep("figure", F[1], F[2]); swDid("paintfig"); var R = SW_ROOMS.paint; if (R && R.g)
swDisplayRefresh(R); swSay("Your figure is in the case now."); swPanelClose(); };
swBenchSide(h, fns);
};
S.side();
},
function (kind) {
var seg = SW.lite ? 56 : 96, geo = new THREE.SphereGeometry(1, seg, Math.round(seg * 0.66)), pos = geo.attributes.position, n = pos.count, base = new Float32Array(n * 3), dir = new Float32Array(n * 3), disp = new Float32Array(n);
for (var i = 0; i < n; i++) {
var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i), f = 1, sx = 1, sy = 1, sz = 1;
if (kind === "stone") {
f = 1 / Math.pow(Math.pow(Math.abs(x), 5) + Math.pow(Math.abs(y), 5) + Math.pow(Math.abs(z), 5), 0.2);
sx = sz = 1.25;
sy = 1.35;
}
else if (kind === "wood") {
var r = Math.hypot(x, z);
f = 1 / Math.pow(Math.pow(r, 5) + Math.pow(Math.abs(y), 5), 0.2);
sx = sz = 0.85;
sy = 2.0;
}
else {
sx = sz = 1.3;
sy = 1.45;
}
base[i * 3] = x * f * sx;
base[i * 3 + 1] = y * f * sy + (kind === "wood" ? 2.1 : 1.6);
base[i * 3 + 2] = z * f * sz;
var L = Math.hypot(x, y, z) || 1;
dir[i * 3] = x / L;
dir[i * 3 + 1] = y / L;
dir[i * 3 + 2] = z / L;
}
var key = "sc:" + kind, sv = swLocalGet(key);
if (sv && sv.n === n && typeof sv.d === "string") {
try {
var bin = atob(sv.d);
for (var j = 0; j < n && j < bin.length; j++) {
var v = bin.charCodeAt(j);
disp[j] = ((v > 127 ? v - 256 : v)) * 0.008;
}
}
catch (e) { }
}
function apply() { for (var i = 0; i < n; i++) {
var d = disp[i];
pos.setXYZ(i, base[i * 3] + dir[i * 3] * d, base[i * 3 + 1] + dir[i * 3 + 1] * d, base[i * 3 + 2] + dir[i * 3 + 2] * d);
} pos.needsUpdate = true; geo.computeVertexNormals(); }
apply();
var col = { clay: 0xB0785A, stone: 0xD8D2C4, wood: 0xC8A070 }[kind], mat = kind === "clay" ? new THREE.MeshPhongMaterial({ color: col, shininess: 8, specular: 0x111111 }) : new THREE.MeshLambertMaterial({ color: col });
if (kind !== "clay") {
var t = swTexK(kind === "stone" ? "marble" : "wood");
if (t)
mat.map = t;
}
var S = { kind: kind, tool: "turn", size: 0.45, str: 1, hist: [], glaze: null };
function keep() { var s = ""; for (var i = 0; i < n; i++) {
var q = Math.max(-127, Math.min(127, Math.round(disp[i] / 0.008)));
s += String.fromCharCode(q < 0 ? q + 256 : q);
} swLocalSet(key, { n: n, d: btoa(s) }); }
var mesh = new THREE.Mesh(geo, mat), stand;
var words = { clay: ["Clay", "🗿"], stone: ["Soft stone", "🪨"], wood: ["Wood", "🪵"] }[kind];
swBenchOpen(words[1] + " " + words[0], { r: 8, rMin: 2.5, rMax: 18, tg: [0, kind === "wood" ? 2.1 : 1.6, 0], th: 0.4, ph: 1.25, table: { w: 14, d: 10, matCol: 0x6A6258 },
targets: function () { return [mesh]; },
tool: function () { return S.tool !== "turn"; },
brush: function (h, ev, first) {
if (first)
S.hist.push(disp.slice());
if (S.hist.length > 12)
S.hist.shift();
var p = h[0].point, r = S.size, r2 = r * r, k = S.str * (kind === "stone" ? 0.035 : 0.025);
var avg = 0, an = 0;
if (S.tool === "smooth" || S.tool === "flat") {
for (var i = 0; i < n; i++) {
var dx = pos.getX(i) - p.x, dy = pos.getY(i) - p.y, dz = pos.getZ(i) - p.z, dd = dx * dx + dy * dy + dz * dz;
if (dd < r2) {
avg += disp[i];
an++;
}
}
avg = an ? avg / an : 0;
}
for (var i2 = 0; i2 < n; i2++) {
var ex = pos.getX(i2) - p.x, ey = pos.getY(i2) - p.y, ez = pos.getZ(i2) - p.z, d2 = ex * ex + ey * ey + ez * ez;
if (d2 >= r2)
continue;
var f = 1 - Math.sqrt(d2) / r;
f = f * f * (3 - 2 * f);
if (S.tool === "in")
disp[i2] -= k * f;
else if (S.tool === "out")
disp[i2] += k * f;
else
disp[i2] += (avg - disp[i2]) * f * (S.tool === "flat" ? 0.35 : 0.2);
disp[i2] = Math.max(-0.9, Math.min(0.7, disp[i2]));
}
apply();
},
brushEnd: function () { clearTimeout(S.kt); S.kt = setTimeout(keep, 800); },
tick: function (dt) { if (S.tool === "turn" && kind !== "stone")
mesh.rotation.y += dt * 0.15; },
close: function () { keep(); }
});
SWB.root.add(mesh);
SWB.own(mesh);
stand = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.5, 0.3, 32), new THREE.MeshLambertMaterial({ color: 0x6A5A4A }));
stand.position.y = 0.15;
SWB.root.add(stand);
SWB.own(stand);
S.side = function () {
var fns = {}, h = "<div class='sw-h'>Tools</div>", tools = kind === "clay" ? [["turn", "✋ Turn it round"], ["in", "👇 Press in"], ["out", "🤏 Pull out"], ["smooth", "🫳 Smooth"], ["flat", "🔲 Flatten"]] : [["turn", "✋ Turn it round"], ["in", kind === "stone" ? "🔨 Chip away" : "🔪 Whittle"], ["smooth", kind === "stone" ? "🧽 Polish" : "🪵 Sand smooth"], ["flat", "🔲 Flatten"]];
tools.forEach(function (T) { h += swBtn("t" + T[0], T[1], "", { small: 1, on: S.tool === T[0] }); fns["t" + T[0]] = function () { S.tool = T[0]; SWB.view.classList.toggle("brush", T[0] !== "turn"); S.side(); }; });
h += "<div class='sw-h'>Size</div>";
[["Small", 0.25], ["Medium", 0.45], ["Big", 0.8]].forEach(function (z, i) { h += swBtn("s" + i, z[0], "", { small: 1, on: S.size === z[1] }); fns["s" + i] = function () { S.size = z[1]; S.side(); }; });
h += "<div class='sw-h'>How firm</div>";
[["Gentle", 0.5], ["Firm", 1], ["Strong", 2]].forEach(function (z, i) { h += swBtn("k" + i, z[0], "", { small: 1, on: S.str === z[1] }); fns["k" + i] = function () { S.str = z[1]; S.side(); }; });
h += "<div class='sw-tip'>With a tool chosen, drag on the " + words[0].toLowerCase() + " to shape it. Choose ✋ to turn it round again.</div>";
h += "<div>" + swBtn("undo", "↩️ Undo", "", { small: 1 }) + swBtn("fresh", "🔁 A fresh piece", "", { small: 1 }) + "</div>";
if (kind === "clay") {
h += "<div class='sw-h'>Glaze and fire</div><div>";
[0xB0785A, 0xF2EEE4, 0x3A6A9A, 0x4A8A6A, 0xA84A3A, 0x2A2A2A, 0xE8C060].forEach(function (c, i) { h += "<span class='sw-sw' data-sw='g" + i + "' style='background:#" + c.toString(16).padStart(6, "0") + "'></span>"; fns["g" + i] = function () { mat.color.setHex(c); mat.shininess = i === 0 ? 8 : 90; mat.specular.setHex(i === 0 ? 0x111111 : 0x666666); S.glaze = c; }; });
h += "</div>";
}
h += swBtn("done", "🏆 It's finished: put it on my shelf", "", { col: "#5A8A5A" });
fns.undo = function () { var p = S.hist.pop(); if (p) {
disp.set(p);
apply();
keep();
} };
fns.fresh = function () { if (S.sure) {
S.hist.push(disp.slice());
disp.fill(0);
apply();
keep();
S.sure = 0;
}
else {
S.sure = 1;
setTimeout(function () { S.sure = 0; }, 5000);
} S.side(); };
if (S.sure)
h += "<div class='sw-tip'>Press 🔁 once more for a fresh piece (Undo still brings this one back).</div>";
fns.done = function () { keep(); swKeep("sculpt", (kind === "clay" ? "A clay sculpture" : kind === "stone" ? "A stone carving" : "A wood carving"), words[1]); swDid(kind === "clay" ? "pot" : "pot"); swSay("It's on your shelf in the Welcome Cottage."); swPanelClose(); };
swBenchSide(h, fns);
};
S.side();
},
function () {
var N = 24, sv = swLocalGet("pot") || {}, R = Array.isArray(sv.r) && sv.r.length === N ? sv.r : null, H = sv.h || 2.2, S = { glaze: sv.g || null, fired: !!sv.fired, shape: true, handle: !!sv.handle };
if (!R) {
R = [];
for (var i = 0; i < N; i++) {
var t = i / (N - 1);
R.push(1.0 + 0.15 * Math.sin(t * Math.PI));
}
}
var mat = new THREE.MeshPhongMaterial({ color: S.glaze || 0xA8704E, shininess: S.fired ? 90 : 8, specular: S.fired ? 0x666666 : 0x111111, side: THREE.DoubleSide }), pot = new THREE.Group(), mesh = null, hm = null, wheel;
function build() {
if (mesh) {
pot.remove(mesh);
mesh.geometry.dispose();
}
if (hm) {
pot.remove(hm);
hm.geometry.dispose();
hm = null;
}
var th = 0.12, pts = [new THREE.Vector2(0, 0)];
for (var i = 0; i < N; i++)
pts.push(new THREE.Vector2(Math.max(0.15, R[i]), i / (N - 1) * H));
pts.push(new THREE.Vector2(Math.max(0.05, R[N - 1] - th), H));
for (var j = N - 1; j >= 1; j--)
pts.push(new THREE.Vector2(Math.max(0.05, R[j] - th), Math.max(0.18, j / (N - 1) * H)));
pts.push(new THREE.Vector2(0, 0.18));
mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, SW.lite ? 36 : 64), mat);
mesh.position.y = 0.36;
pot.add(mesh);
if (S.handle) {
var y = H * 0.62, r = R[Math.round(0.62 * (N - 1))];
hm = new THREE.Mesh(new THREE.TorusGeometry(H * 0.22, 0.07, 10, 24, Math.PI), mat);
hm.rotation.z = -Math.PI / 2;
hm.position.set(r + 0.0, 0.36 + y, 0);
pot.add(hm);
}
}
build();
function keep() { swLocalSet("pot", { r: R.map(function (v) { return Math.round(v * 1000) / 1000; }), h: Math.round(H * 1000) / 1000, g: S.glaze, fired: S.fired, handle: S.handle }); }
function shapeAt(y, amt, wide) { for (var i = 0; i < N; i++) {
var t = i / (N - 1) * H, f = Math.exp(-Math.pow((t - y) / (wide || 0.5), 2));
R[i] = Math.max(0.3, Math.min(2.6, R[i] + amt * f));
} }
function smooth() { var c = R.slice(); for (var i = 1; i < N - 1; i++)
R[i] = (c[i - 1] + c[i] * 2 + c[i + 1]) / 4; }
var hist = [];
swBenchOpen("🏺 The potter's wheel", { r: 9, rMin: 3, rMax: 18, tg: [0, 1.6, 0], th: 0, ph: 1.2, table: { w: 14, d: 10, matCol: 0x6A6258 },
targets: function () { return [mesh]; },
tool: function () { return S.shape && !S.fired; },
brush: function (h, ev, first, dx, dy) {
if (first) {
hist.push({ r: R.slice(), h: H });
if (hist.length > 12)
hist.shift();
S.y = h[0].point.y - 0.36;
return;
}
var y = S.y;
if (y > H * 0.85 && Math.abs(dy || 0) > Math.abs(dx || 0)) {
H = Math.max(0.6, Math.min(4.5, H - (dy || 0) * 0.012));
}
else {
var x = h[0].point.x;
shapeAt(y, (dx || 0) * 0.006 * (x >= 0 ? 1 : -1), 0.45);
}
build();
},
brushEnd: function () { keep(); },
tick: function (dt) { pot.rotation.y += dt * (S.fired ? 0.2 : 2.4); if (wheel)
wheel.rotation.y = pot.rotation.y; },
close: function () { keep(); if (mesh)
mesh.geometry.dispose(); if (hm)
hm.geometry.dispose(); }
});
wheel = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.9, 0.36, 40), new THREE.MeshPhongMaterial({ color: 0x7A7066, shininess: 30 }));
wheel.position.y = 0.18;
SWB.root.add(wheel);
SWB.own(wheel);
SWB.root.add(pot);
SWB.own({ geometry: null, material: mat });
S.side = function () {
var fns = {}, h = "";
if (!S.fired) {
h += "<div class='sw-tip'>Drag left and right on the clay to make it wider or narrower there. Drag up and down at the top to make it taller or shorter.</div>";
h += swBtn("taller", "⬆️ Taller", "", { small: 1 }) + swBtn("shorter", "⬇️ Shorter", "", { small: 1 }) + swBtn("wtop", "↔️ Wider at the top", "", { small: 1 }) + swBtn("ntop", "➡️⬅️ Narrower at the top", "", { small: 1 }) + swBtn("wmid", "↔️ Wider in the middle", "", { small: 1 }) + swBtn("neck", "🍾 A narrow neck", "", { small: 1 }) + swBtn("smooth", "🫳 Smooth", "", { small: 1 });
h += "<div class='sw-h'>Start from</div>" + swBtn("bowl", "🥣 A bowl", "", { small: 1 }) + swBtn("vase", "🏺 A vase", "", { small: 1 }) + swBtn("mug", "☕ A mug", "", { small: 1 }) + swBtn("jug", "🫖 A jug", "", { small: 1 });
h += "<br>" + swBtn("handle", S.handle ? "✔️ It has a handle" : "➕ Add a handle", "", { small: 1, on: S.handle }) + swBtn("undo", "↩️ Undo", "", { small: 1 });
h += "<div class='sw-h'>Glaze</div><div>";
[0xF2EEE4, 0x3A6A9A, 0x4A8A6A, 0xA84A3A, 0x2A2A2A, 0xE8C060, 0x8AB8C8, 0xC86AA8].forEach(function (c, i) { h += "<span class='sw-sw" + (S.glaze === c ? " on" : "") + "' data-sw='g" + i + "' style='background:#" + c.toString(16).padStart(6, "0") + "'></span>"; fns["g" + i] = function () { S.glaze = c; mat.color.setHex(c); keep(); S.side(); }; });
h += "</div>";
h += swBtn("fire", "🔥 Fire it in the kiln", "the glaze turns shiny and it's finished", { col: "#A8603A" });
}
else
h += "<div class='sw-h'>🎉 Fired and finished</div><div class='sw-tip'>It's on your shelf. You can make another whenever you like.</div>" + swBtn("new", "🏺 Make another pot", "");
function hp() { hist.push({ r: R.slice(), h: H }); }
fns.taller = function () { hp(); H = Math.min(4.5, H + 0.25); build(); keep(); };
fns.shorter = function () { hp(); H = Math.max(0.6, H - 0.25); build(); keep(); };
fns.wtop = function () { hp(); shapeAt(H, 0.25, 0.6); build(); keep(); };
fns.ntop = function () { hp(); shapeAt(H, -0.25, 0.6); build(); keep(); };
fns.wmid = function () { hp(); shapeAt(H * 0.45, 0.25, 0.6); build(); keep(); };
fns.neck = function () { hp(); shapeAt(H * 0.82, -0.35, 0.35); build(); keep(); };
fns.smooth = function () { hp(); smooth(); build(); keep(); };
function preset(f) { hp(); for (var i = 0; i < N; i++) {
var t = i / (N - 1);
R[i] = f(t);
} build(); keep(); }
fns.bowl = function () { H = 1.2; preset(function (t) { return 0.8 + 1.1 * Math.sqrt(t); }); };
fns.vase = function () { H = 3.4; preset(function (t) { return 0.7 + 0.7 * Math.sin(t * Math.PI * 0.9) - 0.35 * Math.max(0, t - 0.75) * 4 + 0.25 * Math.max(0, t - 0.92) * 12; }); };
fns.mug = function () { H = 2.0; S.handle = true; preset(function () { return 0.95; }); S.side(); };
fns.jug = function () { H = 2.8; S.handle = true; preset(function (t) { return 1.0 + 0.5 * Math.sin(t * Math.PI) - 0.2 * t; }); S.side(); };
fns.handle = function () { S.handle = !S.handle; build(); keep(); S.side(); };
fns.undo = function () { var p = hist.pop(); if (p) {
for (var i = 0; i < N; i++)
R[i] = p.r[i];
H = p.h;
build();
keep();
} };
fns.fire = function () { swVeil(1.2, function () { S.fired = true; mat.shininess = 95; mat.specular.setHex(0x777777); if (!S.glaze) {
mat.color.setHex(0xB8805A);
} keep(); swKeep("pot", H < 1.5 ? "A bowl" : S.handle ? "A mug" : "A pot", "🏺", { h: H }); swDid("pot"); S.side(); }); };
fns.new = function () { S.fired = false; S.glaze = null; S.handle = false; mat.color.setHex(0xA8704E); mat.shininess = 8; mat.specular.setHex(0x111111); H = 2.2; for (var i = 0; i < N; i++) {
R[i] = 1.0 + 0.15 * Math.sin(i / (N - 1) * Math.PI);
} build(); keep(); S.side(); };
swBenchSide(h, fns);
};
S.side();
SWB.view.classList.add("brush");
},
function () {
var W = SW.lite ? 56 : 96, D = Math.round(W * 0.7), sz = [16, 11.2], geo = new THREE.PlaneGeometry(sz[0], sz[1], W - 1, D - 1).rotateX(-Math.PI / 2), pos = geo.attributes.position, n = pos.count;
var hgt = new Float32Array(n), sv = swLocalGet("sand");
if (sv && sv.n === n && typeof sv.d === "string") {
try {
var b = atob(sv.d);
for (var i = 0; i < n && i < b.length; i++) {
var v = b.charCodeAt(i);
hgt[i] = (v > 127 ? v - 256 : v) * 0.02;
}
}
catch (e) { }
}
var colA = new Float32Array(n * 3);
geo.setAttribute("color", new THREE.BufferAttribute(colA, 3));
var C = new THREE.Color(), cs = [[-9, 0x2A5A8A], [-0.25, 0x4A8AB8], [0.05, 0xE8D8A8], [0.35, 0xD8C890], [0.6, 0x6A9A4A], [1.6, 0x4A7A3A], [2.4, 0x8A8478], [3.2, 0xF2F2F4]];
function colour(h) { for (var i = cs.length - 1; i >= 0; i--)
if (h >= cs[i][0]) {
var nx = cs[i + 1];
if (!nx)
return C.setHex(cs[i][1]);
var k = (h - cs[i][0]) / (nx[0] - cs[i][0]);
return C.setHex(cs[i][1]).lerp(new THREE.Color(nx[1]), Math.min(1, k * 0.6));
} return C.setHex(cs[0][1]); }
function apply() { for (var i = 0; i < n; i++) {
pos.setY(i, hgt[i]);
colour(hgt[i]);
colA[i * 3] = C.r;
colA[i * 3 + 1] = C.g;
colA[i * 3 + 2] = C.b;
} pos.needsUpdate = true; geo.attributes.color.needsUpdate = true; geo.computeVertexNormals(); }
apply();
var mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true })), water = new THREE.Mesh(new THREE.PlaneGeometry(sz[0], sz[1]).rotateX(-Math.PI / 2), new THREE.MeshPhongMaterial({ color: 0x4A8AC0, transparent: true, opacity: 0.55, shininess: 120, specular: 0xFFFFFF, depthWrite: false }));
water.position.y = -0.02;
var S = { tool: "up", size: 1.2, hist: [], trees: (sv && sv.t) || [] };
function keep() { var s = ""; for (var i = 0; i < n; i++) {
var q = Math.max(-127, Math.min(127, Math.round(hgt[i] / 0.02)));
s += String.fromCharCode(q < 0 ? q + 256 : q);
} swLocalSet("sand", { n: n, d: btoa(s), t: S.trees }); }
var treeG = new THREE.Group();
function trees() { while (treeG.children.length) {
var c = treeG.children.pop();
} S.trees.forEach(function (t) { var y = heightAt(t[0], t[1]); var g = new THREE.Mesh(swBGeo("cone"), swBMat("paint")); g.scale.set(0.35, 0.7, 0.35); g.position.set(t[0], y + 0.15, t[1]); treeG.add(g); var tr = new THREE.Mesh(swBGeo("box"), swBMat("wood")); tr.scale.set(0.08, 0.2, 0.08); tr.position.set(t[0], y, t[1]); treeG.add(tr); }); treeG.children.forEach(function (o, i) { if (o.geometry === swBGeo("cone"))
o.material = swShiny(0x2E6A34, 10); }); }
function heightAt(x, z) { var i = Math.round((x / sz[0] + 0.5) * (W - 1)), j = Math.round((z / sz[1] + 0.5) * (D - 1)); i = Math.max(0, Math.min(W - 1, i)); j = Math.max(0, Math.min(D - 1, j)); return hgt[j * W + i]; }
swBenchOpen("🏝️ The sand table", { r: 16, rMin: 4, rMax: 30, tg: [0, 0, 0], th: 0.2, ph: 0.9, table: { w: 20, d: 15, y: 0.6, matCol: 0x6A5A3A, mat: false },
targets: function () { return [mesh]; },
tool: function () { return S.tool !== "turn" && S.tool !== "tree"; },
pick: function (h) { if (S.tool !== "tree" || !h.length)
return; var p = h[0].point; if (heightAt(p.x, p.z) < 0.05)
return; S.trees.push([Math.round(p.x * 100) / 100, Math.round(p.z * 100) / 100]); if (S.trees.length > 200)
S.trees.shift(); trees(); keep(); },
brush: function (h, ev, first) {
if (first) {
S.hist.push(hgt.slice());
if (S.hist.length > 12)
S.hist.shift();
}
var p = h[0].point, r = S.size, r2 = r * r, avg = 0, an = 0;
if (S.tool === "smooth") {
for (var i = 0; i < n; i++) {
var dx = pos.getX(i) - p.x, dz = pos.getZ(i) - p.z;
if (dx * dx + dz * dz < r2) {
avg += hgt[i];
an++;
}
}
avg = an ? avg / an : 0;
}
for (var i2 = 0; i2 < n; i2++) {
var ex = pos.getX(i2) - p.x, ez = pos.getZ(i2) - p.z, d2 = ex * ex + ez * ez;
if (d2 >= r2)
continue;
var f = 1 - Math.sqrt(d2) / r;
f = f * f * (3 - 2 * f);
if (S.tool === "up")
hgt[i2] += 0.06 * f;
else if (S.tool === "down")
hgt[i2] -= 0.06 * f;
else if (S.tool === "smooth")
hgt[i2] += (avg - hgt[i2]) * f * 0.3;
else if (S.tool === "water")
hgt[i2] += (-0.5 - hgt[i2]) * f * 0.2;
hgt[i2] = Math.max(-2.4, Math.min(2.5, hgt[i2]));
}
apply();
},
brushEnd: function () { trees(); keep(); },
close: function () { keep(); }
});
SWB.root.add(mesh);
SWB.own(mesh);
SWB.root.add(water);
SWB.own(water);
SWB.root.add(treeG);
trees();
var frame = new THREE.Mesh(new THREE.BoxGeometry(sz[0] + 0.6, 0.8, sz[1] + 0.6), new THREE.MeshLambertMaterial({ color: 0x6A4A2A }));
frame.position.y = -0.75;
SWB.root.add(frame);
SWB.own(frame);
S.side = function () {
var fns = {}, h = "<div class='sw-h'>Tools</div>";
[["turn", "✋ Turn it round"], ["up", "⛰️ Build up a hill"], ["down", "🕳️ Dig down"], ["water", "🌊 Make a lake or a river"], ["smooth", "🫳 Smooth"], ["tree", "🌲 Plant a tree (tap)"]].forEach(function (T) { h += swBtn("t" + T[0], T[1], "", { small: 1, on: S.tool === T[0] }); fns["t" + T[0]] = function () { S.tool = T[0]; SWB.view.classList.toggle("brush", T[0] !== "turn" && T[0] !== "tree"); S.side(); }; });
h += "<div class='sw-h'>Size</div>";
[["Small", 0.7], ["Medium", 1.2], ["Big", 2.2]].forEach(function (z, i) { h += swBtn("s" + i, z[0], "", { small: 1, on: S.size === z[1] }); fns["s" + i] = function () { S.size = z[1]; S.side(); }; });
h += "<div>" + swBtn("undo", "↩️ Undo", "", { small: 1 }) + swBtn("flat", "🧹 Smooth it all flat", "", { small: 1 }) + swBtn("done", "🗺️ Keep this map", "", { col: "#5A8A5A" }) + "</div>";
if (S.sure)
h += "<div class='sw-tip'>Press 🧹 once more to smooth the sand flat (Undo brings it back).</div>";
fns.undo = function () { var p = S.hist.pop(); if (p) {
hgt.set(p);
apply();
trees();
keep();
} };
fns.flat = function () { if (S.sure) {
S.hist.push(hgt.slice());
hgt.fill(0);
S.trees = [];
apply();
trees();
keep();
S.sure = 0;
}
else {
S.sure = 1;
setTimeout(function () { S.sure = 0; }, 5000);
} S.side(); };
fns.done = function () { keep(); swKeep("sand", "A landscape in the sand", "🏝️"); swDid("map"); swSay("Kept. It stays on the sand table for next time."); };
swBenchSide(h, fns);
};
S.side();
SWB.view.classList.add("brush");
},
function (i) {
var P = SW_PLANETS[i];
return wTex(256, 128, function (c, W, H) {
var col = new THREE.Color(P[2]);
c.fillStyle = "#" + col.getHexString();
c.fillRect(0, 0, W, H);
var R = wRand(i * 31 + 5);
if (i === 4 || i === 5) {
for (var b = 0; b < 14; b++) {
var t = new THREE.Color(P[2]).offsetHSL(0, 0, (R() - 0.5) * 0.18);
c.fillStyle = "#" + t.getHexString();
c.fillRect(0, b * H / 14 + R() * 4, W, H / 14 + 2);
}
if (i === 4) {
c.fillStyle = "#B8604A";
c.beginPath();
c.ellipse(W * 0.65, H * 0.62, 16, 9, 0, 0, 7);
c.fill();
}
}
else if (i === 2) {
c.fillStyle = "#4A8A3A";
for (var k = 0; k < 14; k++) {
c.beginPath();
c.ellipse(R() * W, H * 0.2 + R() * H * 0.6, 10 + R() * 30, 6 + R() * 16, R() * 3, 0, 7);
c.fill();
}
c.fillStyle = "rgba(255,255,255,.6)";
for (var q = 0; q < 18; q++) {
c.beginPath();
c.ellipse(R() * W, R() * H, 8 + R() * 20, 2 + R() * 4, R(), 0, 7);
c.fill();
}
c.fillStyle = "#F4F4F4";
c.fillRect(0, 0, W, 6);
c.fillRect(0, H - 6, W, 6);
}
else
for (var s = 0; s < 40; s++) {
var t2 = new THREE.Color(P[2]).offsetHSL(0, 0, (R() - 0.5) * 0.2);
c.fillStyle = "#" + t2.getHexString();
c.beginPath();
c.arc(R() * W, R() * H, 2 + R() * 8, 0, 7);
c.fill();
}
});
},
function () {
var S = { sp: 0.5, P: [], sel: -1 };
swBenchOpen("🪐 The planets", { r: 62, rMin: 10, rMax: 120, tg: [0, 0, 0], th: 0.3, ph: 1.05, bg: 0x0A0E1E, table: false,
targets: function () { return S.P.map(function (p) { return p.m; }).concat([S.sun]); },
pick: function (h) {
if (!h.length)
return;
var o = h[0].object;
if (o === S.sun) {
S.sel = -1;
swBenchSide(swPlanetHtml(-1), swPlanetFns(S));
swSay("The Sun. A star, a huge ball of glowing gas. All the planets go round it.");
return;
}
var i = o.userData.pl;
if (i === undefined)
return;
S.sel = i;
swBenchLook(S.P[i].g.getWorldPosition(new THREE.Vector3()), Math.max(10, SW_PLANETS[i][1] * 7), 1.2);
swBenchSide(swPlanetHtml(i), swPlanetFns(S));
swSay(SW_PLANETS[i][0] + ". " + SW_PLANETS[i][4]);
},
tick: function (dt) {
S.P.forEach(function (p, i) { p.a += dt * S.sp * 0.6 / Math.pow(SW_PLANETS[i][3], 1.2); p.g.position.set(Math.cos(p.a) * SW_PLANETS[i][3] * 1.6, 0, Math.sin(p.a) * SW_PLANETS[i][3] * 1.6); p.m.rotation.y += dt * 0.3; });
if (S.sel >= 0 && S.follow) {
SWB.tg.copy(S.P[S.sel].g.position);
}
}
});
var sun = new THREE.Mesh(new THREE.SphereGeometry(3.4, 32, 20), new THREE.MeshBasicMaterial({ color: 0xFFD070 }));
SWB.root.add(sun);
SWB.own(sun);
S.sun = sun;
var gl = wGlow(0xFFC060, 16, 0.5);
SWB.root.add(gl);
var L = new THREE.PointLight(0xFFF0D8, 1.4, 0, 0);
SWB.root.add(L);
var stars = wPoints(800, function () { var a = Math.random() * 6.283, e = (Math.random() - 0.5) * 3; return [Math.cos(a) * 300, e * 60, Math.sin(a) * 300]; }, 0xF4F0FF, 1.2, false);
SWB.root.add(stars);
SW_PLANETS.forEach(function (P, i) {
var g = new THREE.Group();
SWB.root.add(g);
var m = new THREE.Mesh(new THREE.SphereGeometry(P[1] * 0.55, 28, 18), new THREE.MeshLambertMaterial({ map: swPlanetTex(i) }));
m.userData.pl = i;
g.add(m);
SWB.own(m);
if (i === 5) {
var rg = new THREE.Mesh(new THREE.RingGeometry(P[1] * 0.75, P[1] * 1.25, 48), new THREE.MeshLambertMaterial({ color: 0xD8C8A0, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
rg.rotation.x = -Math.PI / 2 + 0.4;
g.add(rg);
SWB.own(rg);
}
var orb = new THREE.Mesh(new THREE.RingGeometry(P[3] * 1.6 - 0.03, P[3] * 1.6 + 0.03, 96), new THREE.MeshBasicMaterial({ color: 0x5A6A8A, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
orb.rotation.x = -Math.PI / 2;
SWB.root.add(orb);
SWB.own(orb);
S.P.push({ g: g, m: m, a: i * 1.7 });
});
swBenchSide(swPlanetHtml(-1), swPlanetFns(S));
swDid("stars");
},
function (i) {
var h = i < 0 ? "<div class='sw-h'>The Sun and its planets</div><div class='sw-tip'>Tap a planet (or the Sun) to hear about it. Drag to look round; pinch or scroll to come closer.</div>" : "<div class='sw-h'>" + SW_PLANETS[i][0] + "</div><div>" + SW_PLANETS[i][4] + "</div>";
return h + "<div class='sw-h'>How fast they go</div>" + swBtn("s0", "⏸️ Still", "", { small: 1 }) + swBtn("s1", "🐢 Slowly", "", { small: 1 }) + swBtn("s2", "🚶 A bit faster", "", { small: 1 }) + "<br>" + swBtn("all", "🔭 See them all", "", { small: 1 });
},
function () {
var tex = null;
try {
tex = new THREE.TextureLoader().load("assets/stillwater/world.jpg");
}
catch (e) { }
var g = new THREE.Mesh(new THREE.SphereGeometry(4, 64, 40), tex ? new THREE.MeshPhongMaterial({ map: tex, shininess: 20 }) : new THREE.MeshLambertMaterial({ color: 0x4A7AA8 }));
var S = { spin: true };
swBenchOpen("🌍 The great globe", { r: 14, rMin: 6, rMax: 30, tg: [0, 0, 0], th: 0, ph: 1.4, bg: 0x1A2230, table: false,
targets: function () { return [g]; },
pick: function (h) {
if (!h.length)
return;
var p = g.worldToLocal(h[0].point.clone()).normalize(), lat = Math.asin(p.y) * 180 / Math.PI, lon = Math.atan2(-p.z, p.x) * 180 / Math.PI;
var hit = null;
SW_PLACES.forEach(function (P) { if (!hit && lat >= P[1] && lat <= P[2] && lon >= P[3] && lon <= P[4])
hit = P; });
if (!hit)
hit = ["the sea", 0, 0, 0, 0, "Water: most of the world is sea."];
S.spin = false;
swBenchSide("<div class='sw-h'>" + esc(hit[0].replace(/^the /, "The ")) + "</div><div>" + esc(hit[5]) + "</div>" + swGlobeBtns(), swGlobeFns(S));
swSay(hit[0] + ". " + hit[5]);
},
tick: function (dt) { if (S.spin)
g.rotation.y += dt * 0.12; }
});
SWB.root.add(g);
SWB.own(g);
var L = new THREE.DirectionalLight(0xFFFFFF, 0.5);
L.position.set(10, 6, 10);
SWB.root.add(L);
swBenchSide("<div class='sw-h'>The world</div><div class='sw-tip'>Tap anywhere on the globe to hear its name.</div>" + swGlobeBtns(), swGlobeFns(S));
},
function () {
var d = swData(), fns = {}, h = "", going = [];
SW_ART.forEach(function (A) { SW_PIECES.forEach(function (n) { var s = swLocalGet(swPuzzleKey(A[0], n)); if (s && s.p && s.p.indexOf("1") >= 0 && s.p.indexOf("0") >= 0)
going.push([A, n, s]); }); });
if (going.length) {
h += "<div class='sw-h'>Carry on</div><div class='sw-grid'>";
going.slice(0, 6).forEach(function (g, i) {
var done = (g[2].p.match(/1/g) || []).length;
h += "<div class='sw-tile' data-sw='g" + i + "'><img loading='lazy' src='" + swArtUrl(g[0][0]) + "' alt=''><b>" + esc(g[0][1]) + "</b><small>" + done + " of " + g[2].p.length + " pieces</small></div>";
fns["g" + i] = function () { swPuzzleStart(g[0][0], g[1]); };
});
h += "</div>";
}
h += "<div class='sw-h'>Choose a painting</div><div class='sw-grid'>";
SW_ART.forEach(function (A) { var best = d.puz[A[0]]; h += "<div class='sw-tile' data-sw='a_" + A[0] + "'><img loading='lazy' src='" + swArtUrl(A[0]) + "' alt=''><b>" + esc(A[1]) + "</b><small>" + esc(A[2]) + ", " + A[3] + (best ? "<br>✅ done in " + best + " pieces" : "") + "</small></div>"; fns["a_" + A[0]] = function () { swPuzzlePieces(A[0]); }; });
h += "</div><div class='sw-tip'>Every painting here was made more than a hundred years ago and belongs to everyone now.</div>";
var b = swPanel("🧩 The Puzzle Parlour", h, null);
swBind(b, fns);
},
function (k) {
var A = swArt(k), mx = swArtMax(A), fns = {}, lite = !!SW.lite, h = "<div style='display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start'><img src='" + swArtUrl(k) + "' style='max-width:min(420px,90vw);max-height:46vh;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.25)' alt=''>";
h += "<div><div class='sw-h'>" + esc(A[1]) + "</div><div class='sw-tip'>" + esc(A[2]) + ", " + A[3] + "</div><div class='sw-h'>How many pieces?</div>";
SW_PIECES.forEach(function (n) {
if (n > mx || (lite && n > 500))
return;
var s = swLocalGet(swPuzzleKey(k, n)), got = s && s.p ? (s.p.match(/1/g) || []).length : 0;
h += swBtn("n" + n, n + " pieces", n <= 24 ? "a gentle start" : n <= 100 ? "an afternoon" : n <= 500 ? "a few sittings" : "a long, slow one", { on: !!got });
fns["n" + n] = function () { swPuzzleStart(k, n); };
});
if (lite && mx > 500)
h += "<div class='sw-tip'>On a phone or headset, up to 500 pieces (more needs a computer).</div>";
h += "</div></div>";
var b = swPanel("🧩 " + A[1], h, null);
swBind(b, fns);
},
function (A, n) {
var asp = A[4] / A[5], cols = Math.max(2, Math.round(Math.sqrt(n * asp))), rows = Math.max(2, Math.round(n / cols)), R = wRand(n * 7 + A[0].length * 131 + A[0].charCodeAt(0));
var hE = [], vE = [];
for (var r = 0; r < rows; r++) {
hE.push([]);
vE.push([]);
for (var c = 0; c < cols; c++) {
hE[r].push(r < rows - 1 ? (R() < 0.5 ? 1 : -1) : 0);
vE[r].push(c < cols - 1 ? (R() < 0.5 ? 1 : -1) : 0);
}
}
return { cols: cols, rows: rows, h: hE, v: vE, j: function () { return 0; } };
},
function (c, x0, y0, x1, y1, t, j) {
if (!t) {
c.lineTo(x1, y1);
return;
}
var dx = x1 - x0, dy = y1 - y0, nx = dy, ny = -dx;
function P(a, b) { return [x0 + dx * (a + j) + nx * b * t, y0 + dy * (a + j) + ny * b * t]; }
var p = P(0.36, 0);
c.lineTo(p[0], p[1]);
var a = P(0.42, 0.02), b = P(0.30, 0.24), e = P(0.5, 0.24);
c.bezierCurveTo(a[0], a[1], b[0], b[1], e[0], e[1]);
a = P(0.70, 0.24);
b = P(0.58, 0.02);
e = P(0.64, 0);
c.bezierCurveTo(a[0], a[1], b[0], b[1], e[0], e[1]);
c.lineTo(x1, y1);
},
function (c, X, r, col, pw, ph, ox, oy) {
var top = r > 0 ? -X.h[r - 1][col] : 0, right = X.v[r][col], bottom = X.h[r][col], left = col > 0 ? -X.v[r][col - 1] : 0;
c.beginPath();
c.moveTo(ox, oy);
swPzEdge(c, ox, oy, ox + pw, oy, top, X.j(r, col, 0));
swPzEdge(c, ox + pw, oy, ox + pw, oy + ph, right, X.j(r, col, 1));
swPzEdge(c, ox + pw, oy + ph, ox, oy + ph, bottom, X.j(r, col, 2));
swPzEdge(c, ox, oy + ph, ox, oy, left, X.j(r, col, 3));
c.closePath();
},
function (k, n) {
var A = swArt(k);
if (!A)
return;
var img = new Image(), X = swPuzzleCut(A, n);
var b = swPanel("🧩 " + A[1] + " · " + (X.cols * X.rows) + " pieces", "<div class='sw-pz'><canvas></canvas><div class='sw-pzbar'></div><div class='sw-pzmsg'></div></div>", function () { swPuzzleKeep(); SWZ = null; });
if (!document.getElementById("sw-pz-css")) {
var st = document.createElement("style");
st.id = "sw-pz-css";
st.textContent = "#sw-panel .swp-b{position:relative}.sw-pz{position:absolute;inset:0;background:#3E5A4C}.sw-pz canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}.sw-pzbar{position:absolute;left:8px;top:8px;right:8px;display:flex;flex-wrap:wrap;gap:2px}.sw-pzbar .swb{min-width:0;min-height:40px;padding:5px 10px;font-size:14px}.sw-pzmsg{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);background:rgba(250,248,240,.94);border-radius:12px;padding:8px 14px;font:600 16px system-ui;color:#2E4A3A;display:none;text-align:center}";
document.head.appendChild(st);
}
var cv = b.querySelector("canvas"), ctx = cv.getContext("2d"), bar = b.querySelector(".sw-pzbar"), msg = b.querySelector(".sw-pzmsg");
var Z = SWZ = { k: k, n: n, A: A, X: X, img: img, cv: cv, ctx: ctx, ready: false, P: [], sc: 1, ox: 0, oy: 0, drag: null, ptrs: {}, show: false, edges: false, hint: -1, dirty: true, board: null, bctx: null, msg: msg };
function say(t) { msg.innerHTML = t; msg.style.display = t ? "block" : "none"; }
say("Getting the pieces out of the box…");
img.onload = function () {
var W = img.naturalWidth, H = img.naturalHeight;
Z.W = W;
Z.H = H;
Z.pw = W / X.cols;
Z.ph = H / X.rows;
Z.m = Math.ceil(Math.max(Z.pw, Z.ph) * 0.3);
Z.board = document.createElement("canvas");
Z.board.width = W;
Z.board.height = H;
Z.bctx = Z.board.getContext("2d");
var sv = swLocalGet(swPuzzleKey(k, n)), R = wRand(n + 11), N = X.cols * X.rows;
for (var r = 0; r < X.rows; r++)
for (var c = 0; c < X.cols; c++) {
var i = r * X.cols + c, edge = r === 0 || c === 0 || r === X.rows - 1 || c === X.cols - 1;
Z.P.push({ r: r, c: c, i: i, x: 0, y: 0, on: false, edge: edge, cv: null });
}
function scatter(p) { var side = R(), x, y; if (side < 0.3) {
x = -W * 0.62 + R() * W * 0.55;
y = -H * 0.3 + R() * H * 1.6;
}
else if (side < 0.6) {
x = W * 1.07 + R() * W * 0.55;
y = -H * 0.3 + R() * H * 1.6;
}
else if (side < 0.8) {
x = -W * 0.1 + R() * W * 1.2;
y = -H * 0.55 + R() * H * 0.45;
}
else {
x = -W * 0.1 + R() * W * 1.2;
y = H * 1.1 + R() * H * 0.45;
} p.x = x; p.y = y; }
Z.P.forEach(scatter);
if (sv && typeof sv.p === "string" && sv.p.length === N) {
Z.P.forEach(function (p, i) { if (sv.p.charAt(i) === "1")
p.on = true;
else if (sv.x && sv.x[i] !== undefined) {
p.x = sv.x[i] * W / 1000;
p.y = sv.y[i] * H / 1000;
} });
}
Z.order = Z.P.filter(function (p) { return !p.on; });
Z.P.forEach(function (p) { if (p.on)
swPzStamp(Z, p); });
Z.ready = true;
say("");
swPzFit(Z);
swPzBar(Z, bar);
Z.dirty = true;
if (Z.order.length === 0)
say("🎉 This one is finished. Lovely.");
};
img.onerror = function () { say("The painting could not be loaded just now. Please try again in a moment."); };
img.src = swArtUrl(k);
function toB(ev) { var r = cv.getBoundingClientRect(); return [(ev.clientX - r.left - Z.ox) / Z.sc, (ev.clientY - r.top - Z.oy) / Z.sc]; }
cv.onpointerdown = function (ev) {
if (!Z.ready)
return;
cv.setPointerCapture && cv.setPointerCapture(ev.pointerId);
Z.ptrs[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
var ids = Object.keys(Z.ptrs);
if (ids.length > 1) {
Z.drag = null;
return;
}
var q = toB(ev), hit = null;
for (var i = Z.order.length - 1; i >= 0; i--) {
var p = Z.order[i];
if (Z.edges && !p.edge)
continue;
if (q[0] >= p.x - Z.pw * 0.12 && q[0] <= p.x + Z.pw * 1.12 && q[1] >= p.y - Z.ph * 0.12 && q[1] <= p.y + Z.ph * 1.12) {
hit = p;
break;
}
}
if (hit) {
Z.order.splice(Z.order.indexOf(hit), 1);
Z.order.push(hit);
Z.drag = { p: hit, dx: q[0] - hit.x, dy: q[1] - hit.y };
}
else
Z.drag = { pan: true, x: ev.clientX, y: ev.clientY };
Z.dirty = true;
};
cv.onpointermove = function (ev) {
var P = Z.ptrs[ev.pointerId];
if (!P)
return;
var ids = Object.keys(Z.ptrs);
if (ids.length === 2) {
var a = Z.ptrs[ids[0]], bb = Z.ptrs[ids[1]], d0 = Math.hypot(a.x - bb.x, a.y - bb.y);
P.x = ev.clientX;
P.y = ev.clientY;
var d1 = Math.hypot(a.x - bb.x, a.y - bb.y);
var r = cv.getBoundingClientRect();
swPzZoom(Z, d1 / d0, (a.x + bb.x) / 2 - r.left, (a.y + bb.y) / 2 - r.top);
return;
}
P.x = ev.clientX;
P.y = ev.clientY;
var D = Z.drag;
if (!D)
return;
if (D.pan) {
Z.ox += ev.clientX - D.x;
Z.oy += ev.clientY - D.y;
D.x = ev.clientX;
D.y = ev.clientY;
Z.dirty = true;
return;
}
var q = toB(ev);
D.p.x = q[0] - D.dx;
D.p.y = q[1] - D.dy;
Z.dirty = true;
};
cv.onpointerup = cv.onpointercancel = function (ev) {
delete Z.ptrs[ev.pointerId];
var D = Z.drag;
Z.drag = null;
if (!D || D.pan)
return;
var p = D.p, tx = p.c * Z.pw, ty = p.r * Z.ph, near = Math.max(Z.pw, Z.ph) * 0.38 / Math.min(1, Math.max(0.4, Z.sc));
if (Math.hypot(p.x - tx, p.y - ty) < Math.max(near, Math.max(Z.pw, Z.ph) * 0.3)) {
swPzPlace(Z, p);
}
swPuzzleKeepSoon();
Z.dirty = true;
};
cv.onwheel = function (ev) { ev.preventDefault(); var r = cv.getBoundingClientRect(); swPzZoom(Z, ev.deltaY < 0 ? 1.12 : 1 / 1.12, ev.clientX - r.left, ev.clientY - r.top); };
(function loop() { if (SWZ !== Z)
return; if (Z.dirty && Z.ready)
swPzDraw(Z); requestAnimationFrame(loop); })();
addEventListener("resize", function rs() { if (SWZ !== Z) {
removeEventListener("resize", rs);
return;
} Z.dirty = true; });
},
function (Z, p) {
if (p.cv)
return p.cv;
var m = Z.m, c = document.createElement("canvas");
c.width = Math.ceil(Z.pw + 2 * m);
c.height = Math.ceil(Z.ph + 2 * m);
var x = c.getContext("2d");
swPzPath(x, Z.X, p.r, p.c, Z.pw, Z.ph, m, m);
x.save();
x.clip();
x.drawImage(Z.img, -p.c * Z.pw + m, -p.r * Z.ph + m);
x.lineWidth = Math.max(1, Z.pw * 0.04);
x.strokeStyle = "rgba(255,255,255,.35)";
x.translate(-0.6, -0.6);
x.stroke();
x.translate(1.2, 1.2);
x.strokeStyle = "rgba(0,0,0,.35)";
x.stroke();
x.restore();
p.cv = c;
return c;
},
function (Z) {
Z.dirty = false;
var cv = Z.cv, r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
if (cv.width !== Math.round(r.width * dpr) || cv.height !== Math.round(r.height * dpr)) {
cv.width = Math.round(r.width * dpr);
cv.height = Math.round(r.height * dpr);
}
var c = Z.ctx;
c.setTransform(dpr, 0, 0, dpr, 0, 0);
c.fillStyle = "#3E5A4C";
c.fillRect(0, 0, r.width, r.height);
c.save();
c.translate(Z.ox, Z.oy);
c.scale(Z.sc, Z.sc);
c.fillStyle = "#E8E0CE";
c.shadowColor = "rgba(0,0,0,.3)";
c.shadowBlur = 14;
c.fillRect(-6, -6, Z.W + 12, Z.H + 12);
c.shadowBlur = 0;
if (Z.show) {
c.globalAlpha = 0.22;
c.drawImage(Z.img, 0, 0);
c.globalAlpha = 1;
}
c.drawImage(Z.board, 0, 0);
if (Z.hint >= 0) {
var hp = Z.P[Z.hint];
c.strokeStyle = "rgba(255,236,150,.95)";
c.lineWidth = Math.max(2, 3 / Z.sc);
swPzPath(c, Z.X, hp.r, hp.c, Z.pw, Z.ph, hp.c * Z.pw, hp.r * Z.ph);
c.stroke();
}
var vx0 = -Z.ox / Z.sc - Z.pw * 1.5, vy0 = -Z.oy / Z.sc - Z.ph * 1.5, vx1 = (r.width - Z.ox) / Z.sc + Z.pw, vy1 = (r.height - Z.oy) / Z.sc + Z.ph;
Z.order.forEach(function (p) {
if (Z.edges && !p.edge)
return;
if (p.x < vx0 || p.x > vx1 || p.y < vy0 || p.y > vy1)
return;
var pc = swPzPiece(Z, p);
if (Z.drag && Z.drag.p === p) {
c.shadowColor = "rgba(0,0,0,.45)";
c.shadowBlur = 12;
c.shadowOffsetY = 4;
}
c.drawImage(pc, p.x - Z.m, p.y - Z.m);
c.shadowBlur = 0;
c.shadowOffsetY = 0;
if (p.i === Z.hint) {
c.strokeStyle = "rgba(255,236,150,.95)";
c.lineWidth = Math.max(2, 3 / Z.sc);
swPzPath(c, Z.X, p.r, p.c, Z.pw, Z.ph, p.x, p.y);
c.stroke();
}
});
c.restore();
},
function (Z, bar) {
var left = Z.order.length, N = Z.P.length, fns = {};
var h = swBtn("zin", "➕", "", { small: 1, title: "Come closer" }) + swBtn("zout", "➖", "", { small: 1, title: "Step back" }) + swBtn("fit", "🏠 See it all", "", { small: 1 }) + swBtn("show", Z.show ? "🖼️ Picture on" : "🖼️ Picture off", "", { small: 1, on: Z.show }) + swBtn("edge", Z.edges ? "🔲 Edge pieces only" : "🔲 All pieces", "", { small: 1, on: Z.edges }) + swBtn("tidy", "🧺 Tidy the loose pieces", "", { small: 1 }) + swBtn("hint", "💡 Where does one go?", "", { small: 1 }) + "<span class='sw-cnt' style='background:rgba(250,248,240,.9);border-radius:10px;padding:6px 10px;margin:5px'>" + (N - left) + " of " + N + "</span>";
bar.innerHTML = h;
var r = Z.cv.getBoundingClientRect();
fns.zin = function () { swPzZoom(Z, 1.25, r.width / 2, r.height / 2); };
fns.zout = function () { swPzZoom(Z, 0.8, r.width / 2, r.height / 2); };
fns.fit = function () { swPzFit(Z); };
fns.show = function () { Z.show = !Z.show; Z.dirty = true; swPzBar(Z, bar); };
fns.edge = function () { Z.edges = !Z.edges; Z.dirty = true; swPzBar(Z, bar); };
fns.tidy = function () {
var L = Z.order.slice().sort(function (a, b) { return (b.edge - a.edge) || (a.i - b.i); }), cols = Math.max(4, Math.ceil(Math.sqrt(L.length) * 0.7)), gx = Z.pw * 1.35, gy = Z.ph * 1.35, half = Math.ceil(L.length / 2);
L.forEach(function (p, i) { var side = i < half ? 0 : 1, j = side ? i - half : i, col = j % cols, row = Math.floor(j / cols); p.x = side ? Z.W + Z.pw * 0.8 + col * gx : -Z.pw * 1.8 - col * gx; p.y = row * gy; });
Z.dirty = true;
swPuzzleKeepSoon();
};
fns.hint = function () { var cand = Z.order.filter(function (p) { return !Z.edges || p.edge; }); if (!cand.length)
return; var p = cand.sort(function (a, b) { return (b.edge - a.edge) || (a.r - b.r) || (a.c - b.c); })[0]; Z.hint = p.i; Z.dirty = true; };
swBind(bar, fns);
clearTimeout(Z.bt);
Z.bt = setTimeout(function () { if (SWZ === Z)
swPzBar(Z, bar); }, 2500);
},
function (Z) {
var d = swData(), N = Z.P.length;
if (!d.puz[Z.k] || d.puz[Z.k] < N) {
d.puz[Z.k] = N;
}
swKeep("puzzle", Z.A[1] + " (" + N + " pieces)", "🧩");
swDid("puzzle");
swPuzzleKeep();
Z.msg.innerHTML = "🎉 Finished: <i>" + esc(Z.A[1]) + "</i>, " + N + " pieces. It hangs on the Parlour wall now.";
Z.msg.style.display = "block";
swSay("Finished. Well done. " + Z.A[1] + " hangs on the wall now.");
var R = SW_ROOMS.puzzles;
if (R && R.g) {
swPuzzleWall(R, R.g);
}
},
function (R, g) {
if (R.wall) {
R.wall.traverse(function (o) { if (o.material && o.material.map && o.material.userData.own) {
o.material.map.dispose();
o.material.dispose();
} if (o.geometry && o.userData.own)
o.geometry.dispose(); });
g.remove(R.wall);
}
var W = new THREE.Group();
g.add(W);
R.wall = W;
var d = swData(), list = SW_ART.slice().sort(function (a, b) { return (d.puz[b[0]] ? 1 : 0) - (d.puz[a[0]] ? 1 : 0); }).slice(0, SW.lite ? 6 : 10);
var spots = [];
for (var i = 0; i < 5; i++)
spots.push([-4.8 + i * 2.4, 1.8, -4.42, 0]);
for (var j = 0; j < 3; j++) {
spots.push([-5.92, 1.8, -2.4 + j * 2.2, Math.PI / 2]);
spots.push([5.92, 1.8, -2.4 + j * 2.2, -Math.PI / 2]);
}
list.forEach(function (A, i) {
var S = spots[i];
if (!S)
return;
var fr = swG(S[0], S[1], S[2], W, S[3]);
var asp = A[4] / A[5], h = asp > 1.4 ? 0.9 : 1.2, w = h * asp;
if (w > 2.0) {
w = 2.0;
h = w / asp;
}
var c = document.createElement("canvas"), max = SW.lite ? 256 : 512;
c.width = asp >= 1 ? max : Math.round(max * asp);
c.height = asp >= 1 ? Math.round(max / asp) : max;
var tex = new THREE.CanvasTexture(c);
var x = c.getContext("2d");
x.fillStyle = "#C8C0B0";
x.fillRect(0, 0, c.width, c.height);
var im = new Image();
im.onload = function () { x.drawImage(im, 0, 0, c.width, c.height); tex.needsUpdate = true; };
im.src = swArtUrl(A[0]);
var m = new THREE.MeshLambertMaterial({ map: tex });
m.userData.own = 1;
var pl = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
pl.userData.own = 1;
pl.position.z = 0.03;
fr.add(pl);
var gold = d.puz[A[0]] ? 0xC8A048 : 0x5A3E2A;
swB(w + 0.16, 0.08, 0.06, null, gold, 0, h / 2 + 0.04, 0, fr);
swB(w + 0.16, 0.08, 0.06, null, gold, 0, -h / 2 - 0.04, 0, fr);
swB(0.08, h, 0.06, null, gold, -w / 2 - 0.04, 0, 0, fr);
swB(0.08, h, 0.06, null, gold, w / 2 + 0.04, 0, 0, fr);
if (d.puz[A[0]]) {
var pt = wSign([A[1], "done by you, " + d.puz[A[0]] + " pieces"], 0.9, 0.2, "#C8A048", "#2A2014");
pt.position.set(0, -h / 2 - 0.24, 0.04);
fr.add(pt);
}
});
},
function () {
if (document.getElementById("sw-css2"))
return;
var st = document.createElement("style");
st.id = "sw-css2";
st.textContent =
"#sw-panel .swp-b{position:relative}.sw-paint{position:absolute;inset:0;display:flex;background:#D8D0C0}.sw-paint .cv{flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}" +
".sw-paint canvas{background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.3);touch-action:none;max-width:100%;max-height:100%}.sw-paint .tools{width:min(300px,40vw);overflow:auto;padding:8px;background:rgba(250,248,240,.95);border-left:2px solid #9AB89A}" +
"@media (max-width:760px){.sw-paint{flex-direction:column}.sw-paint .tools{width:auto;max-height:40vh;border-left:0;border-top:2px solid #9AB89A}}" +
".sw-paint .tools .swb{min-width:0;min-height:40px;padding:5px 10px;font-size:14px}.sw-ref{max-width:100%;border-radius:6px;margin:4px 0}" +
".sw-story{font:22px/1.6 Georgia,serif;max-width:760px;margin:0 auto}.sw-story .pic{font-size:72px;text-align:center}.sw-story p{margin:10px 0}.sw-story .now{background:#F4E8B8;border-radius:6px}" +
".sw-bars{display:flex;gap:8px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:12px 0}.sw-bars button{width:64px;border:0;border-radius:12px;color:#fff;font:700 18px system-ui;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.2)}" +
".sw-cards{display:grid;gap:8px;max-width:760px;margin:0 auto}.sw-cards button{aspect-ratio:3/4;border:0;border-radius:14px;font-size:44px;cursor:pointer;background:#6E8E7A;color:#fff;transition:transform .5s}.sw-cards button.up{background:#FBF8F0;color:#000}.sw-cards button.got{background:#E8F0E0;opacity:.7}" +
".sw-bingo{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:420px;margin:8px auto}.sw-bingo button{aspect-ratio:1;font-size:46px;border:3px solid #C8D8C8;border-radius:14px;background:#fff;cursor:pointer}.sw-bingo button.on{background:#E8F0C8;border-color:#6E8E7A}" +
".sw-steps{display:flex;gap:6px;justify-content:center;margin:8px}.sw-steps i{width:14px;height:14px;border-radius:50%;background:#C8D8C8}.sw-steps i.on{background:#6E8E7A}";
document.head.appendChild(st);
},
function (mode) {
swCss2();
var W = mode === "map" ? 1000 : 1024, H = mode === "map" ? 760 : 768, slot = "pa:" + mode;
var b = swPanel(mode === "map" ? "🗺️ The map desk" : "🎨 The easel", "<div class='sw-paint'><div class='cv'><canvas width='" + W + "' height='" + H + "'></canvas></div><div class='tools'></div></div>", function () { keep(); });
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools");
var S = { col: mode === "map" ? 0x2E6AC8 : 0x2E6AC8, size: mode === "map" ? 6 : 14, soft: mode !== "map", tool: "brush", stamp: null, ref: null, hist: [], down: false, last: null };
function blank() { if (mode === "map") {
var g = c.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#F2E6C8");
g.addColorStop(1, "#E8D8B0");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(120,90,50,.5)";
c.lineWidth = 6;
c.strokeRect(14, 14, W - 28, H - 28);
}
else {
c.fillStyle = "#FBFAF6";
c.fillRect(0, 0, W, H);
} }
var old = null;
try {
old = localStorage.getItem("sw:" + slot);
}
catch (e) { }
blank();
if (old) {
var im = new Image();
im.onload = function () { c.drawImage(im, 0, 0, W, H); };
im.src = old;
}
function keep() { try {
localStorage.setItem("sw:" + slot, cv.toDataURL("image/jpeg", 0.82));
}
catch (e) { } }
function snap() { try {
S.hist.push(c.getImageData(0, 0, W, H));
if (S.hist.length > 6)
S.hist.shift();
}
catch (e) { } }
function at(ev) { var r = cv.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width * W, (ev.clientY - r.top) / r.height * H]; }
function dab(x0, y0, x1, y1) {
c.save();
c.lineCap = "round";
c.lineJoin = "round";
if (S.tool === "rub") {
c.strokeStyle = mode === "map" ? "#EEE0C0" : "#FBFAF6";
c.globalAlpha = 1;
}
else {
c.strokeStyle = swHex(S.col);
c.globalAlpha = S.soft ? 0.35 : 1;
}
c.lineWidth = S.size;
if (S.soft && S.tool !== "rub") {
c.shadowColor = swHex(S.col);
c.shadowBlur = S.size * 0.6;
}
c.beginPath();
c.moveTo(x0, y0);
c.lineTo(x1, y1);
c.stroke();
c.restore();
}
function fill(x, y) {
x = Math.round(x);
y = Math.round(y);
var id = c.getImageData(0, 0, W, H), d = id.data, i0 = (y * W + x) * 4, r0 = d[i0], g0 = d[i0 + 1], b0 = d[i0 + 2], C = new THREE.Color(S.col), R = Math.round(C.r * 255), G = Math.round(C.g * 255), B = Math.round(C.b * 255);
if (Math.abs(r0 - R) + Math.abs(g0 - G) + Math.abs(b0 - B) < 8)
return;
var st = [x, y], seen = new Uint8Array(W * H), n = 0;
while (st.length && n < W * H) {
var py = st.pop(), px = st.pop();
if (px < 0 || py < 0 || px >= W || py >= H)
continue;
var k = py * W + px;
if (seen[k])
continue;
seen[k] = 1;
var j = k * 4;
if (Math.abs(d[j] - r0) + Math.abs(d[j + 1] - g0) + Math.abs(d[j + 2] - b0) > 60)
continue;
d[j] = R;
d[j + 1] = G;
d[j + 2] = B;
n++;
st.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1);
}
c.putImageData(id, 0, 0);
}
cv.onpointerdown = function (ev) {
cv.setPointerCapture && cv.setPointerCapture(ev.pointerId);
var p = at(ev);
snap();
if (S.tool === "fill") {
fill(p[0], p[1]);
keep();
return;
}
if (S.tool === "stamp" && S.stamp) {
c.save();
c.font = (S.size * 5 + 24) + "px serif";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(S.stamp, p[0], p[1]);
c.restore();
keep();
return;
}
if (S.tool === "text") {
var ti = tools.querySelector("#sw-maptext"), t = ti && ti.value;
if (t) {
c.save();
c.fillStyle = swHex(S.col);
c.font = "italic " + (S.size * 3 + 16) + "px Georgia";
c.textAlign = "center";
c.fillText(t.slice(0, 40), p[0], p[1]);
c.restore();
keep();
}
return;
}
S.down = true;
S.last = p;
dab(p[0], p[1], p[0] + 0.1, p[1]);
};
cv.onpointermove = function (ev) { if (!S.down)
return; var p = at(ev); dab(S.last[0], S.last[1], p[0], p[1]); S.last = p; };
cv.onpointerup = cv.onpointercancel = function () { if (S.down) {
S.down = false;
clearTimeout(S.kt);
S.kt = setTimeout(keep, 600);
} };
function side() {
var fns = {}, h = "<div class='sw-h'>Colour</div><div>";
SW_SOFT.forEach(function (col, i) { h += "<span class='sw-sw" + (S.col === col ? " on" : "") + "' data-sw='c" + i + "' style='background:" + swHex(col) + "'></span>"; fns["c" + i] = function () { S.col = col; if (S.tool === "rub")
S.tool = "brush"; side(); }; });
h += "</div><div class='sw-h'>Brush</div>";
[["Fine", 3], ["Small", 8], ["Medium", 16], ["Big", 32], ["Huge", 60]].forEach(function (z, i) { h += swBtn("s" + i, z[0], "", { on: S.size === z[1] }); fns["s" + i] = function () { S.size = z[1]; side(); }; });
h += "<br>" + swBtn("brush", "🖌️ Paint", "", { on: S.tool === "brush" }) + swBtn("soft", S.soft ? "💧 Soft (watercolour)" : "✒️ Solid", "", { on: S.soft }) + swBtn("fill", "🪣 Fill an area", "", { on: S.tool === "fill" }) + swBtn("rub", "🧽 Rub out", "", { on: S.tool === "rub" });
fns.brush = function () { S.tool = "brush"; side(); };
fns.soft = function () { S.soft = !S.soft; side(); };
fns.fill = function () { S.tool = "fill"; side(); };
fns.rub = function () { S.tool = "rub"; side(); };
h += "<div class='sw-h'>Stamps</div><div>";
SW_STAMPS[mode === "map" ? "map" : "easel"].forEach(function (s, i) { h += swBtn("st" + i, s, "", { on: S.tool === "stamp" && S.stamp === s }); fns["st" + i] = function () { S.tool = "stamp"; S.stamp = s; side(); }; });
h += "</div>";
if (mode === "map") {
h += "<div class='sw-h'>Words</div><input id='sw-maptext' maxlength='40' placeholder='a name, like Fern Hill' style='width:100%;font-size:16px;padding:8px;border-radius:8px;border:1px solid #9AB89A' value='" + esc(S.words || "") + "'>" + swBtn("text", "🔤 Then tap the map to write it", "", { on: S.tool === "text" });
fns.text = function () { var ti = tools.querySelector("#sw-maptext"); S.words = ti ? ti.value : ""; S.tool = "text"; side(); };
}
else {
h += "<div class='sw-h'>Copy a famous painting</div>";
if (S.ref) {
var A = swArt(S.ref);
h += "<img class='sw-ref' src='" + swArtUrl(S.ref) + "' alt=''><div class='sw-tip'>" + esc(A[1]) + ", " + esc(A[2]) + "</div>" + swBtn("trace", "✏️ Trace it faintly onto the canvas", "", {}) + swBtn("noref", "✕ Put it away", "");
fns.trace = function () { snap(); var im = new Image(); im.onload = function () { c.save(); c.globalAlpha = 0.18; c.drawImage(im, 0, 0, W, H); c.restore(); keep(); }; im.src = swArtUrl(S.ref); };
fns.noref = function () { S.ref = null; side(); };
}
else {
h += "<div class='sw-grid' style='grid-template-columns:repeat(3,1fr)'>";
SW_ART.slice(0, 12).forEach(function (A) { h += "<div class='sw-tile' data-sw='r_" + A[0] + "' style='padding:3px'><img loading='lazy' src='" + swArtUrl(A[0]) + "' style='height:52px' alt=''></div>"; fns["r_" + A[0]] = function () { S.ref = A[0]; side(); }; });
h += "</div>";
}
}
h += "<div style='margin-top:8px'>" + swBtn("undo", "↩️ Undo", "") + swBtn("new", "📄 A fresh page", "") + swBtn("hang", mode === "map" ? "📌 Pin it up" : "🖼️ Hang it in the gallery", "", { col: "#5A8A5A" }) + "</div>";
if (S.sure)
h += "<div class='sw-tip'>Press 📄 once more for a fresh page (Undo brings this one back).</div>";
fns.undo = function () { var d = S.hist.pop(); if (d) {
c.putImageData(d, 0, 0);
keep();
} };
fns.new = function () { if (S.sure) {
snap();
blank();
keep();
S.sure = 0;
}
else {
S.sure = 1;
setTimeout(function () { S.sure = 0; }, 5000);
} side(); };
fns.hang = function () {
keep();
var gal = swLocalGet("gallery") || [];
var url = cv.toDataURL("image/jpeg", 0.7);
try {
localStorage.setItem("sw:gal" + (gal.length % 6), url);
}
catch (e) { }
gal.unshift({ at: Date.now(), slot: "gal" + (gal.length % 6), map: mode === "map" });
if (gal.length > 6)
gal.length = 6;
swLocalSet("gallery", gal);
swKeep(mode === "map" ? "map" : "painting", mode === "map" ? "A map you drew" : "A painting", mode === "map" ? "🗺️" : "🎨");
swDid(mode === "map" ? "map" : "easel");
var R = SW_ROOMS.crafts;
if (R && R.g)
swGalleryRefresh(R, R.g);
swSay(mode === "map" ? "Pinned up. Lovely." : "It hangs in the gallery in the Arts and Crafts Studio now.");
};
tools.innerHTML = h;
swBind(tools, fns);
}
side();
},
function (R, g) {
if (R.galG) {
R.galG.traverse(function (o) { if (o.material && o.material.userData && o.material.userData.own) {
if (o.material.map)
o.material.map.dispose();
o.material.dispose();
} });
g.remove(R.galG);
}
var G = new THREE.Group();
g.add(G);
R.galG = G;
var gal = swLocalGet("gallery") || [];
gal.slice(0, 6).forEach(function (P, i) {
var url = null;
try {
url = localStorage.getItem("sw:" + P.slot);
}
catch (e) { }
if (!url)
return;
var fr = swG(-4.8 + i * 1.9, 1.9, -4.92, G), w = 1.4, h = 1.05, tex = new THREE.TextureLoader().load(url), m = new THREE.MeshLambertMaterial({ map: tex });
m.userData.own = 1;
var pl = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
pl.position.z = 0.03;
fr.add(pl);
[[0, h / 2 + 0.04, w + 0.12, 0.08], [0, -h / 2 - 0.04, w + 0.12, 0.08], [-w / 2 - 0.04, 0, 0.08, h], [w / 2 + 0.04, 0, 0.08, h]].forEach(function (q) { swB(q[2], q[3], 0.05, null, 0xC8A048, q[0], q[1], 0, fr); });
});
},
function (kind) {
swCss2();
var K = SW_GRIDK[kind];
if (!K)
return;
if (K.glass)
return swGlassCraft();
if (K.crochet)
return swCrochet();
var key = "gc:" + kind, sv = swLocalGet(key), N = K.cols * K.rows, cells = new Array(N).fill(-1);
if (sv && Array.isArray(sv.c) && sv.c.length === N)
cells = sv.c;
var S = { col: kind === "weave" ? 9 : 3, pat: null, row: sv && sv.row || 0, hist: [] };
var W = K.cols * K.cell, H = K.rows * K.cell;
var b = swPanel(K.i + " " + K.n, "<div class='sw-paint'><div class='cv'><canvas width='" + W + "' height='" + H + "'></canvas></div><div class='tools'></div></div>", function () { keep(); });
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools");
function keep() { swLocalSet(key, { c: cells, row: S.row }); }
function patCol(i) {
if (!S.pat)
return -1;
var P = SW_PATTERNS[S.pat], ph = P.length, pw = P[0].length, sc = Math.max(1, Math.floor(Math.min(K.cols / pw, K.rows / ph) * 0.8)), ox = Math.floor((K.cols - pw * sc) / 2), oy = Math.floor((K.rows - ph * sc) / 2);
var x = i % K.cols, y = Math.floor(i / K.cols), px = Math.floor((x - ox) / sc), py = Math.floor((y - oy) / sc);
if (px < 0 || py < 0 || px >= pw || py >= ph)
return -1;
var ch = P[py].charAt(px);
if (ch === "." || !SW_PCOL[ch])
return -1;
return SW_SOFT.indexOf(SW_PCOL[ch]) >= 0 ? SW_SOFT.indexOf(SW_PCOL[ch]) : SW_PCOL[ch];
}
function colOf(v) { return v < 0 ? null : (v < SW_SOFT.length ? SW_SOFT[v] : v); }
function draw() {
c.fillStyle = K.bg;
c.fillRect(0, 0, W, H);
var s = K.cell;
for (var i = 0; i < N; i++) {
var x = (i % K.cols) * s, y = Math.floor(i / K.cols) * s, v = cells[i], col = colOf(v), guide = colOf(patCol(i));
if (K.shape === "tile") {
c.fillStyle = col !== null ? swHex(col) : "rgba(255,255,255,.18)";
c.fillRect(x + 2, y + 2, s - 4, s - 4);
if (col !== null) {
c.fillStyle = "rgba(255,255,255,.18)";
c.fillRect(x + 3, y + 3, s - 8, 3);
}
}
else if (K.shape === "bead") {
c.beginPath();
c.arc(x + s / 2, y + s / 2, col !== null ? s * 0.44 : s * 0.12, 0, 7);
c.fillStyle = col !== null ? swHex(col) : "#C8C0B4";
c.fill();
if (col !== null) {
c.beginPath();
c.arc(x + s / 2, y + s / 2, s * 0.14, 0, 7);
c.fillStyle = "rgba(0,0,0,.25)";
c.fill();
c.beginPath();
c.arc(x + s * 0.36, y + s * 0.34, s * 0.08, 0, 7);
c.fillStyle = "rgba(255,255,255,.5)";
c.fill();
}
}
else if (K.shape === "cross") {
if (col !== null) {
c.strokeStyle = swHex(col);
c.lineWidth = s * 0.22;
c.lineCap = "round";
c.beginPath();
c.moveTo(x + 4, y + 4);
c.lineTo(x + s - 4, y + s - 4);
c.moveTo(x + s - 4, y + 4);
c.lineTo(x + 4, y + s - 4);
c.stroke();
}
else {
c.fillStyle = "rgba(0,0,0,.08)";
c.fillRect(x + s / 2 - 1, y + s / 2 - 1, 2, 2);
}
}
else if (K.shape === "knit") {
if (col !== null) {
c.fillStyle = swHex(col);
[-1, 1].forEach(function (k) { c.save(); c.translate(x + s / 2 + k * s * 0.2, y + s / 2); c.rotate(k * 0.5); c.beginPath(); c.ellipse(0, 0, s * 0.22, s * 0.5, 0, 0, 7); c.fill(); c.strokeStyle = "rgba(0,0,0,.18)"; c.lineWidth = 1; c.stroke(); c.restore(); });
}
}
else if (K.shape === "weave") {
var r = Math.floor(i / K.cols), q = i % K.cols, warp = 0xE8E0D0;
var over = (r + q) % 2 === 0, wc = col !== null ? col : null;
c.fillStyle = swHex(over && wc !== null ? wc : warp);
c.fillRect(x, y + 1, s, s - 2);
c.fillStyle = "rgba(0,0,0,.12)";
c.fillRect(x, y + s - 3, s, 2);
if (!over || wc === null) {
c.fillStyle = "rgba(255,255,255,.15)";
c.fillRect(x + s / 2 - 1, y, 2, s);
}
}
if (guide !== null && v < 0) {
c.strokeStyle = swHex(guide);
c.globalAlpha = 0.55;
c.lineWidth = 2;
c.strokeRect(x + 4, y + 4, s - 8, s - 8);
c.globalAlpha = 1;
}
}
if (K.rowWork && S.row < K.rows) {
var ry = (K.rows - 1 - S.row) * s;
c.strokeStyle = "rgba(255,220,120,.9)";
c.lineWidth = 3;
c.strokeRect(1, ry + 1, W - 2, s - 2);
}
}
function at(ev) { var r = cv.getBoundingClientRect(); var x = Math.floor((ev.clientX - r.left) / r.width * K.cols), y = Math.floor((ev.clientY - r.top) / r.height * K.rows); return (x < 0 || y < 0 || x >= K.cols || y >= K.rows) ? -1 : y * K.cols + x; }
var painting = false;
function put(i) { if (i < 0)
return; if (K.rowsOnly) {
var y = Math.floor(i / K.cols);
for (var x = 0; x < K.cols; x++)
cells[y * K.cols + x] = S.col;
}
else
cells[i] = S.col; draw(); }
cv.onpointerdown = function (ev) { cv.setPointerCapture && cv.setPointerCapture(ev.pointerId); S.hist.push(cells.slice()); if (S.hist.length > 20)
S.hist.shift(); painting = true; put(at(ev)); };
cv.onpointermove = function (ev) { if (painting && !K.rowsOnly)
put(at(ev)); };
cv.onpointerup = cv.onpointercancel = function () { painting = false; clearTimeout(S.kt); S.kt = setTimeout(keep, 600); };
function side() {
var fns = {}, h = "<div class='sw-h'>Colour</div><div>";
SW_SOFT.forEach(function (col, i) { h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' style='background:" + swHex(col) + "'></span>"; fns["c" + i] = function () { S.col = i; side(); }; });
h += "</div>";
if (K.rowsOnly)
h += "<div class='sw-tip'>Tap a row to weave it in that colour. Stripes look lovely.</div>";
else if (!K.rowWork)
h += "<div class='sw-tip'>Tap or drag to colour. Follow a pattern, or make your own.</div>";
if (K.pats) {
h += "<div class='sw-h'>A pattern to follow</div><div>";
K.pats.forEach(function (p) { h += swBtn("p_" + p, p.charAt(0).toUpperCase() + p.slice(1), "", { on: S.pat === p }); fns["p_" + p] = function () { S.pat = S.pat === p ? null : p; draw(); side(); }; });
h += "</div>";
}
if (K.pats && !K.rowWork) {
h += swBtn("follow", "✨ Fill in the pattern for me", "", {});
fns.follow = function () { if (!S.pat)
return; S.hist.push(cells.slice()); for (var i = 0; i < N; i++) {
var pc = patCol(i);
if (pc >= 0)
cells[i] = pc;
} draw(); keep(); };
}
if (K.rowWork) {
h += "<div class='sw-tip'>Knitting goes one row at a time, from the bottom up. The glowing row is next.</div>" + swBtn("row", "🧶 Knit the next row", "", { col: "#8A5A6A" }) + swBtn("rows5", "🧶🧶 Knit five rows", "");
function knitRow() { if (S.row >= K.rows)
return; var y = K.rows - 1 - S.row; for (var x = 0; x < K.cols; x++) {
var i = y * K.cols + x, pc = patCol(i);
cells[i] = pc >= 0 ? pc : S.col;
} S.row++; if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(440, 0.04);
}
catch (e) { } }
fns.row = function () { S.hist.push(cells.slice()); knitRow(); draw(); keep(); side(); };
fns.rows5 = function () { S.hist.push(cells.slice()); for (var k = 0; k < 5; k++)
knitRow(); draw(); keep(); side(); };
h += "<div class='sw-cnt'>" + S.row + " of " + K.rows + " rows</div>";
}
h += "<div style='margin-top:8px'>" + swBtn("undo", "↩️ Undo", "") + swBtn("new", "🧺 Start again", "") + swBtn("done", "🏆 It's finished", "", { col: "#5A8A5A" }) + "</div>";
if (S.sure)
h += "<div class='sw-tip'>Press 🧺 once more to start again (Undo brings it back).</div>";
fns.undo = function () { var p = S.hist.pop(); if (p) {
cells = p;
if (K.rowWork) {
var r = 0;
for (var y = K.rows - 1; y >= 0; y--) {
if (cells[y * K.cols] >= 0)
r++;
else
break;
}
S.row = r;
}
draw();
keep();
side();
} };
fns.new = function () { if (S.sure) {
S.hist.push(cells.slice());
cells = new Array(N).fill(-1);
S.row = 0;
draw();
keep();
S.sure = 0;
}
else {
S.sure = 1;
setTimeout(function () { S.sure = 0; }, 5000);
} side(); };
fns.done = function () { keep(); swKeep(kind, { mosaic: "A mosaic", beads: "A bead pattern", weave: "A woven cloth", knit: "Some knitting", stitch: "A cross-stitch" }[kind], K.i); swDid(kind === "knit" || kind === "stitch" ? "knit" : "easel"); if (kind === "knit")
swKnitRack(); swSay("It's on your shelf. Well done."); };
tools.innerHTML = h;
swBind(tools, fns);
}
draw();
side();
},
function () {
var W = 800, H = 800, key = "gc:glass", sv = swLocalGet(key), S = { col: 15, hist: [] }, R = [], cx = 400, cy = 400;
var rings = [0, 70, 150, 240, 330, 380], secs = [1, 6, 12, 12, 24];
for (var a = 0; a < rings.length - 1; a++)
for (var s = 0; s < secs[a]; s++)
R.push({ r0: rings[a], r1: rings[a + 1], a0: s / secs[a] * Math.PI * 2 + (a % 2 ? Math.PI / secs[a] : 0), a1: (s + 1) / secs[a] * Math.PI * 2 + (a % 2 ? Math.PI / secs[a] : 0) });
var cols = (sv && Array.isArray(sv.c) && sv.c.length === R.length) ? sv.c : R.map(function () { return -1; });
swCss2();
var b = swPanel("🪟 Stained glass", "<div class='sw-paint'><div class='cv'><canvas width='800' height='800' style='background:#2A2A2E;border-radius:50%'></canvas></div><div class='tools'></div></div>", function () { keep(); });
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools");
function keep() { swLocalSet(key, { c: cols }); }
function path(P) { c.beginPath(); if (P.r0 === 0) {
c.arc(cx, cy, P.r1, 0, Math.PI * 2);
return;
} c.arc(cx, cy, P.r1, P.a0, P.a1); c.arc(cx, cy, P.r0, P.a1, P.a0, true); c.closePath(); }
function draw() {
c.clearRect(0, 0, W, H);
var g = c.createRadialGradient(cx - 80, cy - 120, 40, cx, cy, 400);
R.forEach(function (P, i) { path(P); var v = cols[i]; c.fillStyle = v < 0 ? "#D8D8D0" : swHex(SW_SOFT[v]); c.globalAlpha = v < 0 ? 0.35 : 0.9; c.fill(); c.globalAlpha = 1; });
g.addColorStop(0, "rgba(255,255,240,.35)");
g.addColorStop(1, "rgba(255,255,240,0)");
c.fillStyle = g;
c.beginPath();
c.arc(cx, cy, 380, 0, 7);
c.fill();
c.strokeStyle = "#2A2A2E";
c.lineWidth = 7;
R.forEach(function (P) { path(P); c.stroke(); });
c.lineWidth = 14;
c.beginPath();
c.arc(cx, cy, 384, 0, 7);
c.stroke();
}
cv.onpointerdown = function (ev) {
var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W - cx, y = (ev.clientY - r.top) / r.height * H - cy, d = Math.hypot(x, y), a = Math.atan2(y, x);
if (a < 0)
a += Math.PI * 2;
for (var i = 0; i < R.length; i++) {
var P = R[i];
if (d < P.r0 || d > P.r1)
continue;
var a0 = P.a0 % (Math.PI * 2), a1 = a0 + (P.a1 - P.a0), aa = a < a0 ? a + Math.PI * 2 : a;
if (P.r0 === 0 || (aa >= a0 && aa <= a1)) {
S.hist.push(cols.slice());
cols[i] = S.col;
draw();
keep();
return;
}
}
};
function side() {
var fns = {}, h = "<div class='sw-h'>Glass colour</div><div>";
SW_SOFT.forEach(function (col, i) { h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' style='background:" + swHex(col) + "'></span>"; fns["c" + i] = function () { S.col = i; side(); }; });
h += "</div><div class='sw-tip'>Tap a piece of glass to colour it. The window is round, like a rose window.</div><div>" + swBtn("undo", "↩️ Undo", "") + swBtn("done", "🏆 It's finished", "", { col: "#5A8A5A" }) + "</div>";
fns.undo = function () { var p = S.hist.pop(); if (p) {
cols = p;
draw();
keep();
} };
fns.done = function () { keep(); swKeep("glass", "A stained-glass window", "🪟"); swDid("easel"); swSay("It's on your shelf. The light through it is lovely."); };
tools.innerHTML = h;
swBind(tools, fns);
}
draw();
side();
},
function () {
var key = "gc:crochet", sv = swLocalGet(key) || {}, rounds = sv.r || [], S = { col: 9 };
swCss2();
var b = swPanel("🔶 A granny square", "<div class='sw-paint'><div class='cv'><canvas width='640' height='640'></canvas></div><div class='tools'></div></div>", function () { swLocalSet(key, { r: rounds }); });
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools");
function draw() {
c.fillStyle = "#E8E0D0";
c.fillRect(0, 0, 640, 640);
var cx = 320, st = 34;
for (var r = rounds.length - 1; r >= 0; r--) {
var half = st * (r + 1) + 10;
c.fillStyle = swHex(SW_SOFT[rounds[r]]);
c.fillRect(cx - half, cx - half, half * 2, half * 2);
c.fillStyle = "rgba(0,0,0,.18)";
for (var k = -r - 1; k <= r; k++) {
[[k * st, -half], [k * st, half - 8], [-half, k * st], [half - 8, k * st]].forEach(function (p) { c.fillRect(cx + p[0] + 8, cx + p[1], st - 14, 8); });
}
}
c.fillStyle = "#E8E0D0";
c.beginPath();
c.arc(cx, cx, 10, 0, 7);
c.fill();
}
function side() {
var fns = {}, h = "<div class='sw-h'>Wool colour</div><div>";
SW_SOFT.forEach(function (col, i) { h += "<span class='sw-sw" + (S.col === i ? " on" : "") + "' data-sw='c" + i + "' style='background:" + swHex(col) + "'></span>"; fns["c" + i] = function () { S.col = i; side(); }; });
h += "</div><div class='sw-cnt'>" + rounds.length + " rounds</div>" + swBtn("round", "🧶 Crochet the next round", "", { col: "#8A5A6A" }) + swBtn("undo", "↩️ Take a round off", "") + swBtn("done", "🏆 It's finished", "", { col: "#5A8A5A" });
fns.round = function () { if (rounds.length < 8) {
rounds.push(S.col);
draw();
swLocalSet(key, { r: rounds });
side();
} };
fns.undo = function () { rounds.pop(); draw(); swLocalSet(key, { r: rounds }); side(); };
fns.done = function () { swKeep("crochet", "A granny square", "🔶"); swDid("knit"); swSay("It's on your shelf."); };
tools.innerHTML = h;
swBind(tools, fns);
}
draw();
side();
},
function () {
var fns = {}, h = "<div class='sw-tip'>What would you like to make by the fire?</div><div class='sw-grid'>";
[["knit", "🧶", "Knitting", "a row at a time, with a picture if you like"], ["stitch", "✖️", "Cross-stitch", "little crosses on cloth"], ["crochet", "🔶", "A granny square", "round by round"]].forEach(function (K) { h += "<div class='sw-tile' data-sw='" + K[0] + "'><div style='font-size:40px'>" + K[1] + "</div><b>" + K[2] + "</b><small>" + K[3] + "</small></div>"; fns[K[0]] = function () { swGridCraft(K[0]); }; });
h += "</div>";
var b = swPanel("🧶 The Knitting Nook", h, null);
swBind(b, fns);
},
function () {
var rk = SW.knitRack;
if (!rk)
return;
var n = (swData().shelf || []).filter(function (s) { return s.k === "knit" || s.k === "stitch" || s.k === "crochet"; }).length;
rk.children.slice(3).forEach(function (o) { rk.remove(o); });
for (var i = 0; i < Math.min(4, n); i++)
swB(0.32, 0.5, 0.02, null, [0xB8282A, 0x2E6AC8, 0x4A9A4A, 0xF2C230][i], -0.6 + i * 0.4, 1.42, 0, rk);
},
function (kind) {
var R = wRand(kind === "nature" ? 5 : 9), L = [];
var kinds = kind === "nature" ? [["butterfly", "🦋"], ["beetle", "🐞"], ["leaf", "🍂"], ["feather", "🪶"], ["stone", "🪨"]] : [["shell", "🐚"], ["spiral", "🌀"], ["starfish", "⭐"], ["pebble", "🪨"], ["crab", "🦀"]];
for (var i = 0; i < 20; i++) {
var k = kinds[i % kinds.length];
L.push({ k: k[0], i: k[1], c: SW_SOFT[[6, 8, 15, 19, 9, 22][Math.floor(R() * 6)]], x: 0.08 + R() * 0.84, y: 0.08 + R() * 0.5, done: false });
}
return { kinds: kinds, L: L };
},
function (kind) {
swCss2();
var D = swSortItems(kind), mode = "kind", W = 900, H = 640;
var b = swPanel(kind === "nature" ? "🦋 The sorting table" : "🐚 Sorting the shells", "<div class='sw-paint'><div class='cv'><canvas width='900' height='640' style='background:#E8DCC0'></canvas></div><div class='tools'></div></div>", null);
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools"), drag = null;
function trays() { var T = mode === "kind" ? D.kinds.map(function (k) { return { k: k[0], l: k[1] }; }) : [{ k: "warm", l: "🟧" }, { k: "cool", l: "🟦" }, { k: "green", l: "🟩" }]; return T.map(function (t, i) { t.x = W * (i + 0.5) / T.length; t.y = H - 90; t.w = W / T.length - 16; return t; }); }
function fits(it, t) { if (mode === "kind")
return it.k === t.k; var col = new THREE.Color(it.c), hsl = {}; col.getHSL(hsl); var g = hsl.h > 0.18 && hsl.h < 0.45, w = hsl.h < 0.18 || hsl.h > 0.85; return t.k === "green" ? g : t.k === "warm" ? (w && !g) : (!w && !g); }
function draw() {
c.fillStyle = "#E8DCC0";
c.fillRect(0, 0, W, H);
trays().forEach(function (t) { c.fillStyle = "#B8A07A"; c.fillRect(t.x - t.w / 2, t.y - 70, t.w, 150); c.fillStyle = "#D8C8A0"; c.fillRect(t.x - t.w / 2 + 8, t.y - 62, t.w - 16, 134); c.font = "40px serif"; c.textAlign = "center"; c.fillText(t.l, t.x, t.y - 74); });
D.L.forEach(function (it) { c.save(); c.translate(it.x * W, it.y * H); c.beginPath(); c.arc(0, 0, 30, 0, 7); c.fillStyle = swHex(it.c); c.globalAlpha = 0.35; c.fill(); c.globalAlpha = 1; c.font = "42px serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(it.i, 0, 2); c.restore(); });
}
function at(ev) { var r = cv.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height]; }
cv.onpointerdown = function (ev) { var p = at(ev); for (var i = D.L.length - 1; i >= 0; i--) {
var it = D.L[i];
if (Math.hypot((it.x - p[0]) * W, (it.y - p[1]) * H) < 34) {
drag = { it: it, x0: it.x, y0: it.y };
D.L.push(D.L.splice(i, 1)[0]);
cv.setPointerCapture && cv.setPointerCapture(ev.pointerId);
return;
}
} };
cv.onpointermove = function (ev) { if (!drag)
return; var p = at(ev); drag.it.x = p[0]; drag.it.y = p[1]; draw(); };
cv.onpointerup = function () {
if (!drag)
return;
var it = drag.it, T = trays(), into = null;
T.forEach(function (t) { if (Math.abs(it.x * W - t.x) < t.w / 2 && it.y * H > t.y - 80)
into = t; });
if (into) {
if (fits(it, into)) {
it.done = true;
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(660, 0.05);
}
catch (e) { }
}
else {
var a = { x: it.x, y: it.y }, B = { x: drag.x0, y: drag.y0 }, t0 = performance.now();
(function back() { var k = Math.min(1, (performance.now() - t0) / 500); it.x = a.x + (B.x - a.x) * k; it.y = a.y + (B.y - a.y) * k; draw(); if (k < 1)
requestAnimationFrame(back); })();
}
}
drag = null;
draw();
if (D.L.every(function (q) { return q.done; })) {
tools.innerHTML = "<div class='sw-h'>🎉 All sorted</div><div class='sw-tip'>Every one is in its tray. Lovely.</div>" + swBtn("again", "🔁 Tip them out again", "");
swBind(tools, { again: function () { D = swSortItems(kind); D.L.forEach(function (q) { q.x = 0.08 + Math.random() * 0.84; q.y = 0.08 + Math.random() * 0.5; }); draw(); side(); } });
swDid(kind === "nature" ? "bugs" : "sort");
}
};
function side() {
var fns = {}, h = "<div class='sw-tip'>Drag each one into the tray it belongs in. There's no hurry.</div>" + swBtn("kind", "Sort by what they are", "", { on: mode === "kind" }) + swBtn("col", "Sort by colour", "", { on: mode === "col" });
fns.kind = function () { mode = "kind"; D.L.forEach(function (q) { q.done = false; if (q.y > 0.6)
q.y = 0.3; }); draw(); side(); };
fns.col = function () { mode = "col"; D.L.forEach(function (q) { q.done = false; if (q.y > 0.6)
q.y = 0.3; }); draw(); side(); };
tools.innerHTML = h;
swBind(tools, fns);
}
draw();
side();
},
function () {
swCss2();
var W = 1200, H = 800, R = wRand(42), stars = [];
for (var i = 0; i < (SW.lite ? 500 : 900); i++)
stars.push([R(), R(), Math.pow(R(), 3) * 2.2 + 0.4]);
var b = swPanel("🔭 The great telescope", "<div class='sw-paint'><div class='cv'><canvas width='1200' height='800' style='background:#0A0E1E'></canvas></div><div class='tools'></div></div>", null);
var cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools"), on = -1, t0 = performance.now(), live = true;
function draw() {
if (!live || !cv.isConnected) {
live = false;
return;
}
var t = (performance.now() - t0) / 1000;
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#050814");
g.addColorStop(1, "#1A2440");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.fillStyle = "rgba(200,210,255,.06)";
c.beginPath();
c.ellipse(W * 0.75, H * 0.35, 120, 700, 0.6, 0, 7);
c.fill();
stars.forEach(function (s, i) { var tw = 0.75 + 0.25 * Math.sin(t * 0.6 + i); c.fillStyle = "rgba(244,240,255," + (0.5 * tw) + ")"; c.beginPath(); c.arc(s[0] * W, s[1] * H, s[2] * 0.7, 0, 7); c.fill(); });
SW_CONST.forEach(function (C, ci) {
if (ci === on) {
c.strokeStyle = "rgba(150,190,255,.7)";
c.lineWidth = 2;
C[2].forEach(function (l) { var a = C[1][l[0]], bb = C[1][l[1]]; c.beginPath(); c.moveTo(a[0] * W, a[1] * H); c.lineTo(bb[0] * W, bb[1] * H); c.stroke(); });
}
C[1].forEach(function (p) { c.fillStyle = "#FFFBEA"; c.beginPath(); c.arc(p[0] * W, p[1] * H, ci === on ? 4.5 : 3.2, 0, 7); c.fill(); });
});
requestAnimationFrame(draw);
}
cv.onpointerdown = function (ev) {
var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height, best = -1, bd = 0.06;
SW_CONST.forEach(function (C, ci) { C[1].forEach(function (p) { var d = Math.hypot(p[0] - x, (p[1] - y) * H / W); if (d < bd) {
bd = d;
best = ci;
} }); });
if (best >= 0) {
on = best;
side();
swSay(SW_CONST[best][0] + ". " + SW_CONST[best][3]);
swDid("stars");
}
};
function side() {
var h = on < 0 ? "<div class='sw-h'>The night sky</div><div class='sw-tip'>Tap a bright star to see the shape it belongs to, and hear its story.</div>" : "<div class='sw-h'>" + SW_CONST[on][0] + "</div><div>" + SW_CONST[on][3] + "</div>";
h += "<div class='sw-h'>Find</div>";
SW_CONST.forEach(function (C, i) { h += swBtn("k" + i, C[0], "", { on: on === i }); });
tools.innerHTML = h;
var fns = {};
SW_CONST.forEach(function (C, i) { fns["k" + i] = function () { on = i; side(); swSay(C[0] + ". " + C[3]); }; });
swBind(tools, fns);
}
draw();
side();
},
function () {
swCss2();
var fns = {}, h = "<div class='sw-tip'>Choose a story. It can be read to you, one part at a time.</div><div class='sw-grid'>";
SW_STORIES.forEach(function (S, i) { h += "<div class='sw-tile' data-sw='s" + i + "'><div style='font-size:44px'>" + S[1] + "</div><b>" + S[0] + "</b></div>"; fns["s" + i] = function () { swStoryRead(i); }; });
h += "</div><div class='sw-tip'>These are Aesop's fables, more than two thousand years old, told simply.</div>";
var b = swPanel("📖 The library", h, null);
swBind(b, fns);
},
function (i) {
var S = SW_STORIES[i], at = 0, b = swPanel("📖 " + S[0], "", function () { try {
speechSynthesis.cancel();
}
catch (e) { } });
function show() {
var h = "<div class='sw-story'><div class='pic'>" + S[1] + "</div>";
S[2].forEach(function (p, j) { if (j <= at)
h += "<p class='" + (j === at ? "now" : "") + "'>" + esc(p) + "</p>"; });
h += "</div><div class='sw-steps'>";
S[2].forEach(function (p, j) { h += "<i class='" + (j <= at ? "on" : "") + "'></i>"; });
h += "</div><div style='text-align:center'>" + swBtn("read", "🔈 Read it to me", "") + (at < S[2].length - 1 ? swBtn("next", "➡️ What happens next", "", { col: "#5A8A5A" }) : swBtn("end", "📚 Another story", "")) + "</div>";
b.innerHTML = h;
swBind(b, { read: function () { swSay(S[2][at], true); }, next: function () { at++; show(); if (swCalm().read)
swSay(S[2][at], true); }, end: function () { swDid("read"); swStoryCard(); } });
}
show();
if (swCalm().read)
swSay(S[0] + ". " + S[2][0], true);
},
function (f, kind, dur) {
try {
if (typeof audio === "undefined" || !audio.ctx)
return;
var C = audio.ctx, t = C.currentTime, o = C.createOscillator(), g = C.createGain(), vol = 0.22 * (swCalm().music === undefined ? 0.7 : swCalm().music);
o.type = kind === "harp" ? "triangle" : kind === "xylo" ? "sine" : "sine";
o.frequency.value = f;
g.gain.setValueAtTime(0, t);
g.gain.linearRampToValueAtTime(vol, t + (kind === "chime" ? 0.02 : 0.008));
g.gain.exponentialRampToValueAtTime(0.0008, t + (dur || (kind === "chime" ? 2.6 : kind === "harp" ? 1.6 : 0.7)));
o.connect(g);
g.connect(audio.master || C.destination);
o.start(t);
o.stop(t + (dur || 3));
if (kind === "chime") {
var o2 = C.createOscillator(), g2 = C.createGain();
o2.frequency.value = f * 2.76;
o2.type = "sine";
g2.gain.setValueAtTime(vol * 0.25, t);
g2.gain.exponentialRampToValueAtTime(0.0005, t + 1.2);
o2.connect(g2);
g2.connect(audio.master || C.destination);
o2.start(t);
o2.stop(t + 1.3);
}
}
catch (e) { }
},
function () {
swCss2();
var S = { kind: "chime", echo: null, heard: [] }, b = swPanel("🎵 The music shed", "", null), cols = ["#C85A5A", "#E8904A", "#E8C04A", "#6AB86A", "#4AA8A8", "#4A7AC8", "#8A6AC8", "#C86AA8"];
function show() {
var h = "<div style='text-align:center'>" + ["chime", "xylo", "harp"].map(function (k) { return swBtn("k" + k, { chime: "🔔 Chimes", xylo: "🎹 Xylophone", harp: "🪕 Harp" }[k], "", { on: S.kind === k }); }).join("") + "</div><div class='sw-bars'>";
SW_SCALE.forEach(function (f, i) { h += "<button data-sw='n" + i + "' style='height:" + (200 - i * 14) + "px;background:" + cols[i] + "'>" + "CDEGACDE".charAt(i) + "</button>"; });
h += "</div><div style='text-align:center'>" + swBtn("echo", "👂 Leo's echo game", "he plays a few notes, you play them back") + "</div><div class='sw-tip' style='text-align:center' id='sw-echo'>" + (S.echo ? "Your turn: play the notes back." : "Any notes you play sound nice together.") + "</div>";
b.innerHTML = h;
var fns = {};
["chime", "xylo", "harp"].forEach(function (k) { fns["k" + k] = function () { S.kind = k; show(); }; });
SW_SCALE.forEach(function (f, i) { fns["n" + i] = function () { swNote(f, S.kind); swDid("music"); if (S.echo) {
S.heard.push(i);
if (S.heard.length === S.echo.length) {
var same = S.heard.every(function (v, j) { return v === S.echo[j]; });
var el = document.getElementById("sw-echo");
if (el)
el.textContent = same ? "🎉 Just right. Lovely." : "Nice! Let's hear it again.";
if (same)
S.echo = null;
else
setTimeout(play, 1200);
S.heard = [];
}
} }; });
fns.echo = function () { S.echo = []; var n = 2 + Math.floor(Math.random() * 2); for (var i = 0; i < n; i++)
S.echo.push(Math.floor(Math.random() * 6)); S.heard = []; play(); };
swBind(b, fns);
}
function play() { if (!S.echo)
return; S.echo.forEach(function (i, j) { setTimeout(function () { swNote(SW_SCALE[i], S.kind); var bt = b.querySelector("[data-sw='n" + i + "']"); if (bt) {
bt.style.filter = "brightness(1.25)";
setTimeout(function () { bt.style.filter = ""; }, 500);
} }, j * 800 + 300); }); var el = document.getElementById("sw-echo"); if (el)
el.textContent = "Listen…"; setTimeout(function () { var e2 = document.getElementById("sw-echo"); if (e2 && S.echo)
e2.textContent = "Your turn: play the notes back."; }, S.echo.length * 800 + 500); }
show();
},
function () {
swCss2();
var fns = {}, h = "<div class='sw-tip'>How many pairs? (Nobody is timed and nothing is counted.)</div>";
[4, 6, 8, 12].forEach(function (n) { h += swBtn("n" + n, n + " pairs", "", { big: 1 }); fns["n" + n] = function () { swMatchPlay(n, false); }; });
h += "<div class='sw-tip'>Or take turns with someone who is here with you:</div>" + swBtn("two", "👥 Take turns", "", {});
fns.two = function () { swMatchPlay(6, true); };
var b = swPanel("🃏 Picture pairs", h, null);
swBind(b, fns);
},
function (n, two) {
var cards = [];
SW_PICS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, n).forEach(function (p) { cards.push({ p: p }, { p: p }); });
cards.sort(function () { return Math.random() - 0.5; });
var up = [], turn = 0, busy = false, b = swPanel("🃏 Picture pairs", "", null), cols = n <= 4 ? 4 : n <= 8 ? 4 : 6;
function show() {
var h = two ? "<div style='text-align:center;font-size:20px'>" + (turn ? "👉 🙂 Player two's turn" : "👉 😊 Player one's turn") + "</div>" : "";
h += "<div class='sw-cards' style='grid-template-columns:repeat(" + cols + ",1fr)'>";
cards.forEach(function (c, i) { h += "<button data-sw='c" + i + "' class='" + (c.got ? "got" : c.up ? "up" : "") + "'>" + (c.up || c.got ? c.p : "🍃") + "</button>"; });
h += "</div>";
if (cards.every(function (c) { return c.got; }))
h += "<div style='text-align:center;font-size:22px;margin:10px'>🎉 All the pairs found. Lovely.</div><div style='text-align:center'>" + swBtn("again", "🔁 Play again", "") + "</div>";
b.innerHTML = h;
var fns = { again: function () { swMatchCard(); } };
cards.forEach(function (c, i) {
fns["c" + i] = function () {
if (busy || c.up || c.got)
return;
c.up = true;
up.push(c);
show();
if (up.length === 2) {
busy = true;
setTimeout(function () { if (up[0].p === up[1].p) {
up[0].got = up[1].got = true;
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(700, 0.08);
}
catch (e) { }
}
else
turn = 1 - turn; up[0].up = up[1].up = false; up = []; busy = false; show(); if (cards.every(function (q) { return q.got; }))
swDid("music"); }, 1400);
}
};
});
swBind(b, fns);
}
show();
},
function () {
swCss2();
var pool = SW_PICS.slice(), card = pool.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 9), called = [], marked = {}, b = swPanel("🎱 Picture bingo", "", null);
function line() { var L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; return L.some(function (l) { return l.every(function (i) { return marked[i]; }); }); }
function show() {
var last = called[called.length - 1], h = "<div style='text-align:center'><div style='font-size:20px'>The picture called:</div><div style='font-size:80px;line-height:1.2'>" + (last || "…") + "</div>" + swBtn("next", "➡️ Call the next picture", "when you're ready") + "</div><div class='sw-bingo'>";
card.forEach(function (p, i) { h += "<button data-sw='m" + i + "' class='" + (marked[i] ? "on" : "") + "'>" + p + "</button>"; });
h += "</div><div class='sw-tip' style='text-align:center'>If the picture is on your card, tap it.</div>";
if (line())
h += "<div style='text-align:center;font-size:26px'>🎉 Bingo! A whole line.</div><div style='text-align:center'>" + swBtn("again", "🔁 A new card", "") + "</div>";
b.innerHTML = h;
var fns = { next: function () { var left = pool.filter(function (p) { return called.indexOf(p) < 0; }); if (!left.length)
return; var p = left[Math.floor(Math.random() * left.length)]; called.push(p); swSay(p, false); show(); }, again: function () { swBingoCard(); } };
card.forEach(function (p, i) { fns["m" + i] = function () { if (called.indexOf(p) >= 0) {
marked[i] = 1;
show();
if (line())
swDid("music");
} }; });
swBind(b, fns);
}
show();
},
function () {
swCss2();
var fns = {}, h = "<div class='sw-tip'>What shall we bake today?</div><div class='sw-grid'>";
SW_BAKES.forEach(function (B) { h += "<div class='sw-tile' data-sw='b_" + B[0] + "'><div style='font-size:44px'>" + B[1] + "</div><b>" + B[2] + "</b><small>" + B[3].length + " steps</small></div>"; fns["b_" + B[0]] = function () { swBakeDo(B); }; });
h += "</div>";
var b = swPanel("🍞 Hazel's bakery", h, null);
swBind(b, fns);
},
function (B) {
var at = 0, taps = 0, wait = 0, b = swPanel(B[1] + " " + B[2], "", function () { clearInterval(B.iv); });
function show() {
var s = B[3][at], h = "<div class='sw-steps'>" + B[3].map(function (x, j) { return "<i class='" + (j <= at ? "on" : "") + "'></i>"; }).join("") + "</div><div style='text-align:center'><div style='font-size:96px;line-height:1.3'>" + s[0] + "</div><div style='font:24px Georgia,serif;margin:8px'>" + esc(s[1]) + "</div>";
if (s[2])
h += swBtn("tap", "👆 Tap (" + Math.max(0, s[2] - taps) + " more)", "", { big: 1 });
else if (s[3])
h += "<div style='width:260px;height:16px;border-radius:8px;background:#E0E8E0;margin:10px auto;overflow:hidden'><div style='height:100%;width:" + Math.round(Math.min(1, wait / s[3]) * 100) + "%;background:#6E8E7A'></div></div>" + (wait >= s[3] ? swBtn("next", "➡️ Next", "", { big: 1 }) : "<div class='sw-tip'>Waiting… (or " + swBtn("skip", "skip ahead", "", { small: 1 }) + ")</div>");
else if (at < B[3].length - 1)
h += swBtn("next", "➡️ Done that", "", { big: 1 });
else
h += swBtn("end", "🏆 Put it on my shelf", "", { big: 1, col: "#5A8A5A" });
h += "</div>";
b.innerHTML = h;
swBind(b, { tap: function () { taps++; if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(330 + taps * 20, 0.04);
}
catch (e) { } if (taps >= s[2]) {
taps = 0;
at++;
} show(); }, next: function () { at++; taps = 0; wait = 0; show(); }, skip: function () { wait = s[3]; show(); }, end: function () { swKeep("bake", B[2], B[1]); swDid("bake"); swSay("It's on your shelf. Well done."); swPanelClose(); } });
if (s[3] && wait < s[3]) {
clearInterval(B.iv);
B.iv = setInterval(function () { if (!SWP.open) {
clearInterval(B.iv);
return;
} wait += 1; if (wait >= s[3])
clearInterval(B.iv); show(); }, 1000);
}
}
show();
swSay(B[3][0][1]);
},
function () {
var C = swCalm(), on = typeof WLD !== "undefined" && WLD.on === SW_KEY;
try {
document.body.classList.toggle("sw-bigtext", on && C.big);
}
catch (e) { }
try {
var cv = renderer && renderer.domElement;
if (cv) {
var f = on && C.soft ? "saturate(.72) contrast(.9) brightness(1.02)" : "";
if (cv.style.filter !== f)
cv.style.filter = f;
}
}
catch (e) { }
swAmbient();
},
function () {
var C = swCalm(), fns = {}, h = "<div class='sw-tip'>Change anything here, any time. It only changes things for you.</div>";
function slider(k, label, lo, hi, st) { return "<div class='sw-card'><div class='sw-h'>" + label + "</div><input class='sw-r' type='range' min='" + lo + "' max='" + hi + "' step='" + st + "' value='" + C[k] + "' data-k='" + k + "'></div>"; }
h += slider("sound", "🌿 The sounds of the place (water, birds, wind)", 0, 1, 0.05) + slider("music", "🎵 Music and chimes", 0, 1, 0.05) + slider("voices", "🗣️ Reading-aloud voice", 0, 1, 0.05) + slider("bright", "☀️ How bright it is", 0.5, 1.2, 0.05);
h += "<div class='sw-card'><div class='sw-h'>👥 Who you see here</div>" + swBtn("pall", "Everyone", "", { on: C.people === "all" }) + swBtn("pfr", "Only my friends", "", { on: C.people === "friends" }) + swBtn("pnone", "Just me", "", { on: C.people === "none" }) + "<div class='sw-tip'>The villagers are always here; this is about other dreamers.</div></div>";
h += "<div class='sw-card'>" + swBtn("soft", C.soft ? "🎨 Softer colours: on" : "🎨 Softer colours: off", "", { on: C.soft }) + swBtn("slow", C.slow ? "🐢 Slower walking: on" : "🐢 Slower walking: off", "", { on: C.slow }) + swBtn("big", C.big ? "🔠 Bigger words: on" : "🔠 Bigger words: off", "", { on: C.big }) + swBtn("read", C.read ? "🔈 Read things to me: on" : "🔈 Read things to me: off", "", { on: C.read }) + "</div>";
h += swBtn("reset", "↩️ Back to how it was", "", { small: 1 });
var b = swPanel("🍃 Calm settings", h, null);
b.querySelectorAll("input[data-k]").forEach(function (r) { r.oninput = function () { swCalmSet(r.getAttribute("data-k"), +r.value); }; });
fns.pall = function () { swCalmSet("people", "all"); swCalmCard(); };
fns.pfr = function () { swCalmSet("people", "friends"); swCalmCard(); };
fns.pnone = function () { swCalmSet("people", "none"); swCalmCard(); };
["soft", "slow", "big", "read"].forEach(function (k) { fns[k] = function () { swCalmSet(k, !swCalm()[k]); swCalmCard(); if (k === "read" && swCalm().read)
swSay("I will read things to you now.", true); }; });
fns.reset = function () { swData().calm = {}; swSave(); swCalmApply(); swCalmCard(); };
swBind(b, fns);
},
function () {
try {
if (typeof audio === "undefined" || !audio.ctx || !audio.on) {
swAmbientStop();
return;
}
var here = typeof WLD !== "undefined" && WLD.on === SW_KEY, C = swCalm(), vol = SW.hush ? 0 : C.sound;
if (!here || vol <= 0.001) {
swAmbientStop();
return;
}
var A = audio.ctx;
if (!SWA.nodes) {
var len = A.sampleRate * 2, buf = A.createBuffer(1, len, A.sampleRate), d = buf.getChannelData(0), last = 0;
for (var i = 0; i < len; i++) {
var w = Math.random() * 2 - 1;
last = (last + 0.02 * w) / 1.02;
d[i] = last * 3.5;
}
function bed(f, q) { var s = A.createBufferSource(); s.buffer = buf; s.loop = true; var bq = A.createBiquadFilter(); bq.type = "lowpass"; bq.frequency.value = f; bq.Q.value = q || 0.7; var g = A.createGain(); g.gain.value = 0; s.connect(bq); bq.connect(g); g.connect(audio.master || A.destination); s.start(); return { s: s, f: bq, g: g }; }
SWA.nodes = { water: bed(520, 0.8), wind: bed(260, 0.5), rain: bed(1800, 0.4) };
var lfo = A.createOscillator(), lg = A.createGain();
lfo.frequency.value = 0.13;
lg.gain.value = 60;
lfo.connect(lg);
lg.connect(SWA.nodes.water.f.frequency);
lfo.start();
SWA.nodes.lfo = lfo;
}
var R = SW.room, t = A.currentTime, N = SWA.nodes, out = !R;
N.water.g.gain.setTargetAtTime(out ? 0.05 * vol : 0, t, 1.5);
N.wind.g.gain.setTargetAtTime(out ? 0.025 * vol : (R && R.amb === "rain" ? 0 : 0.008 * vol), t, 1.5);
N.rain.g.gain.setTargetAtTime(R && R.amb === "rain" ? 0.035 * vol : 0, t, 1.5);
SWA.on = true;
if (!SWA.birdT)
swBirdsong();
}
catch (e) { }
},
function () {
SWA.birdT = setTimeout(function () {
SWA.birdT = null;
try {
if (SWA.on && !SW.room && !SW.hush && typeof WLD !== "undefined" && WLD.on === SW_KEY) {
var A = audio.ctx, t = A.currentTime, vol = 0.025 * swCalm().sound, f0 = 2400 + Math.random() * 1400, n = 2 + Math.floor(Math.random() * 3);
for (var i = 0; i < n; i++) {
var o = A.createOscillator(), g = A.createGain(), s = t + i * 0.16;
o.type = "sine";
o.frequency.setValueAtTime(f0, s);
o.frequency.exponentialRampToValueAtTime(f0 * (1.2 + Math.random() * 0.3), s + 0.09);
g.gain.setValueAtTime(0, s);
g.gain.linearRampToValueAtTime(vol, s + 0.02);
g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12);
o.connect(g);
g.connect(audio.master || A.destination);
o.start(s);
o.stop(s + 0.14);
}
}
if (SWA.on)
swBirdsong();
}
catch (e) { }
}, 3500 + Math.random() * 7000);
},
function () {
var T = swTodayList(), fns = {}, h = "<div class='sw-tip'>Choose up to three things for today. They show in the corner, and get a tick when they're done. You can change them any time.</div><div class='sw-grid'>";
SW_TODO.forEach(function (t) {
var on = T.pick.indexOf(t[0]) >= 0, done = T.done.indexOf(t[0]) >= 0;
h += "<div class='sw-tile' data-sw='t_" + t[0] + "' style='" + (on ? "border-color:#6E8E7A;background:#EEF4E8" : "") + "'><div style='font-size:36px'>" + t[1] + "</div><b>" + esc(t[2]) + "</b><small>" + (done ? "✅ done today" : on ? "chosen" : "") + "</small></div>";
fns["t_" + t[0]] = function () { var i = T.pick.indexOf(t[0]); if (i >= 0)
T.pick.splice(i, 1);
else {
if (T.pick.length >= 3)
T.pick.shift();
T.pick.push(t[0]);
} swSave(); swHud(); swTodayCard(); };
});
h += "</div>" + swBtn("keep", T.keep ? "📌 Keep the same three tomorrow: yes" : "📌 Keep the same three tomorrow: no", "", { on: T.keep }) + swBtn("clear", "🧹 Clear the card", "", { small: 1 });
fns.keep = function () { T.keep = !T.keep; swSave(); swTodayCard(); };
fns.clear = function () { T.pick = []; swSave(); swHud(); swTodayCard(); };
var b = swPanel("📋 Today", h, null);
swBind(b, fns);
},
function () {
var on = typeof WLD !== "undefined" && WLD.on === SW_KEY;
if (!SW.hud) {
swCss();
var el = document.createElement("div");
el.id = "sw-hud";
document.body.appendChild(el);
SW.hud = el;
var dk = document.createElement("div");
dk.id = "sw-dock";
dk.innerHTML = "<button data-d='home' title='Go home'>🏠<small>Home</small></button><button data-d='calm' title='Calm settings'>🍃<small>Calm</small></button><button data-d='say' title='Say something'>💬<small>Say</small></button><button data-d='map' title='The picture map'>🗺️<small>Map</small></button>";
document.body.appendChild(dk);
SW.dock = dk;
dk.querySelectorAll("button").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); var k = b.getAttribute("data-d"); if (k === "home")
swHomeAsk();
else if (k === "calm")
swCalmCard();
else if (k === "say")
swPhrases();
else
swMapCard(); }; });
}
SW.hud.style.display = on ? "block" : "none";
SW.dock.style.display = on ? "flex" : "none";
if (!on)
return;
var T = swTodayList(), h = "<div class='box'><div class='nn'><b>📋 Today</b></div>";
if (!T.pick.length)
h += "<div class='nn'>Choose three things on the Today board in the Welcome Cottage, or <a href='#' data-t='1'>here</a>.</div>";
T.pick.forEach(function (k) { var t = swTodo(k); if (!t)
return; var done = T.done.indexOf(k) >= 0; h += "<div class='row" + (done ? " done" : "") + "'><span class='tk'>" + (done ? "✅" : t[1]) + "</span><span class='nn'>" + esc(t[2]) + "</span></div>"; });
var nx = T.pick.filter(function (k) { return T.done.indexOf(k) < 0; })[0], nt = nx && swTodo(nx), H = nt && swHouseDef(nt[3]);
if (nt)
h += "<div class='nn'>Next: " + nt[1] + " " + esc(nt[2]) + (H ? " · <a href='#' data-go='" + nt[3] + "'>take me there</a>" : "") + "</div>";
h += "</div>";
if (SW.hud.dataset.h !== h) {
SW.hud.dataset.h = h;
SW.hud.innerHTML = h;
var a = SW.hud.querySelector("[data-t]");
if (a)
a.onclick = function (e) { e.preventDefault(); swTodayCard(); };
var g = SW.hud.querySelector("[data-go]");
if (g)
g.onclick = function (e) { e.preventDefault(); swTakeMe(g.getAttribute("data-go")); };
}
},
function () {
var b = swPanel("🏠 Go home?", "<div style='text-align:center;font-size:20px;margin:20px'>Would you like to leave Stillwater now?</div><div style='text-align:center'>" + swBtn("yes", "🏠 Yes, take me home", "", { big: 1, col: "#5A8A5A" }) + swBtn("no", "🍃 No, I'll stay", "", { big: 1 }) + "</div><div class='sw-tip' style='text-align:center'>Or the Quiet Room, if you'd like somewhere still: " + swBtn("quiet", "🌧️ The Quiet Room", "", { small: 1 }) + "</div>", null);
swBind(b, { yes: function () { swPanelClose(); swHome(); }, no: function () { swPanelClose(); }, quiet: function () { swPanelClose(); swTakeMe("quiet", true); } });
},
function () {
var fns = {}, h = "<div class='sw-tip'>Tap a phrase to say it to the people here.</div><div class='sw-grid'>";
SW_PHRASES.forEach(function (P, i) { h += "<div class='sw-tile' data-sw='p" + i + "'><div style='font-size:40px'>" + P[0] + "</div><b>" + esc(P[1]) + "</b></div>"; fns["p" + i] = function () { swSayOut(P[0] + " " + P[1]); swPanelClose(); }; });
h += "</div>";
var b = swPanel("💬 Say something", h, null);
swBind(b, fns);
},
function (t) { try {
if (typeof cityRpc === "function" && typeof wcHere === "function") {
var here = wcHere();
cityRpc("world_say", { p_body: t, p_channel: "here", p_loc: here.k, p_loc_name: here.n });
}
if (typeof sayOver === "function" && typeof myId !== "undefined")
try {
sayOver(myId, t);
}
catch (e) { }
setStatus("💬 You said: " + esc(t));
}
catch (e) { } },
function () {
var d = swData(), h = "";
if (!d.shelf.length)
h = "<div style='text-align:center;font-size:18px;margin:30px'>Your shelf is empty for now. Anything you make in Stillwater comes here.</div>";
else {
h = "<div class='sw-grid'>";
d.shelf.forEach(function (s) { var dt = new Date(s.at); h += "<div class='sw-tile'><div style='font-size:40px'>" + s.i + "</div><b>" + esc(s.n) + "</b><small>" + dt.toLocaleDateString() + "</small></div>"; });
h += "</div>";
}
swPanel("🗄️ Your shelf", h, null);
},
function (k) {
var H = swHouseDef(k);
if (H) {
var A = SW_HOUSE_AT[k];
if (A && A.door)
return { x: A.door.x, z: A.door.z, ry: A.door.ry, room: k };
if (A)
return { x: A.x + Math.sin(A.ry || 0) * 6, z: A.z + Math.cos(A.ry || 0) * 6, ry: A.ry, room: k };
}
if (k === "harbour" || k === "ducks" || k === "boat" || k === "fish")
return { x: SW_AT.harbour.x, z: SW_AT.harbour.z + 8 };
if (k === "barn")
return null;
return SW_AT[k] ? { x: SW_AT[k].x, z: SW_AT[k].z + 6 } : null;
},
function (k, inside) {
var T = swMapTarget(k);
if (!T)
return;
swPanelClose();
if (inside && T.room) {
swEnterRoom(T.room, SW_HOUSE_AT[T.room] && SW_HOUSE_AT[T.room].door);
return;
}
swVeil(0.6, function () { if (SW.room) {
SW.room = null;
swShowOnly(null);
} SW.boat = null; SW.sit = null; camera.position.set(SW.base + T.x, swGround(T.x, T.z, 1e4) + 1.72, T.z); yaw = T.ry !== undefined ? T.ry + Math.PI : 0; pitch = 0; if (SW.under)
swUnderFill(T.x, T.z); swAmbient(); });
},
function () {
swCss2();
var b = swPanel("🗺️ The picture map", "<div class='sw-paint'><div class='cv'><canvas width='1024' height='640'></canvas></div><div class='tools'></div></div>", null), cv = b.querySelector("canvas"), c = cv.getContext("2d"), tools = b.querySelector(".tools");
var P = function (x, z) { return [512 + x * 1.55, 640 * 0.56 + z * 1.55]; }, L = typeof worldLocal === "function" ? worldLocal() : { x: 0, z: 0 };
var tex = null;
try {
tex = SW.mapTex || (SW.mapTex = swMapTex());
}
catch (e) { }
var spots = [];
SW_HOUSES.forEach(function (H) { var A = SW_HOUSE_AT[H[0]]; if (!A)
return; var p = P(A.x, A.z); spots.push({ k: H[0], x: p[0], y: p[1], n: H[1], i: H[2] }); });
[["harbour", "⚓", "The harbour"], ["hill", "🔭", "Star Hill"], ["allot", "🌱", "The allotments"], ["arrive", "🪨", "The Arrival Stone"], ["green", "🌳", "The village green"], ["sgarden", "🌸", "The Sensory Garden"]].forEach(function (q) { var A = SW_AT[q[0]]; var p = P(A.x, A.z); spots.push({ k: q[0], x: p[0], y: p[1], n: q[2], i: q[1] }); });
function draw(sel) {
if (tex && tex.image)
c.drawImage(tex.image, 0, 0, 1024, 640);
else {
c.fillStyle = "#B8CC98";
c.fillRect(0, 0, 1024, 640);
var lk = P(SW_LAKE.x, SW_LAKE.z);
c.fillStyle = "#8AB8D0";
c.beginPath();
c.ellipse(lk[0], lk[1], SW_LAKE.rx * 1.55, SW_LAKE.rz * 1.55, 0, 0, 7);
c.fill();
}
spots.forEach(function (s) { c.fillStyle = s.k === sel ? "rgba(255,236,150,.95)" : "rgba(255,255,255,.85)"; c.beginPath(); c.arc(s.x, s.y, 22, 0, 7); c.fill(); c.font = "24px serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(s.i, s.x, s.y + 1); });
var me = P(L.x, L.z);
if (L.x < SW_IN_X - 2000) {
c.fillStyle = "#C83A2A";
c.beginPath();
c.arc(me[0], me[1], 10, 0, 7);
c.fill();
c.strokeStyle = "#fff";
c.lineWidth = 3;
c.stroke();
c.fillStyle = "#2E3A34";
c.font = "bold 16px system-ui";
c.fillText("you", me[0], me[1] - 20);
}
}
function side(sel) {
var s = spots.filter(function (q) { return q.k === sel; })[0], h = s ? "<div class='sw-h'>" + s.i + " " + esc(s.n) + "</div>" + swBtn("go", "🚶 Take me there", "", { col: "#5A8A5A" }) + (swHouseDef(s.k) ? swBtn("in", "🚪 Take me inside", "") : "") : "<div class='sw-tip'>Tap a picture on the map to see what it is, and to go there. The red dot is you.</div>";
h += "<div class='sw-h'>Places</div>";
spots.forEach(function (q) { h += swBtn("s_" + q.k, q.i + " " + esc(q.n), "", { small: 1, on: q.k === sel }); });
tools.innerHTML = h;
var fns = { go: function () { swTakeMe(sel); }, "in": function () { swTakeMe(sel, true); } };
spots.forEach(function (q) { fns["s_" + q.k] = function () { draw(q.k); side(q.k); }; });
swBind(tools, fns);
}
cv.onpointerdown = function (ev) { var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * 1024, y = (ev.clientY - r.top) / r.height * 640, best = null, bd = 40; spots.forEach(function (s) { var d = Math.hypot(s.x - x, s.y - y); if (d < bd) {
bd = d;
best = s;
} }); if (best) {
draw(best.k);
side(best.k);
swSay(best.n);
} };
draw();
side(null);
},
function (x, z) {
var n = 0;
SW.ducks.forEach(function (D, i) { D.tx = x + (Math.random() - 0.5) * 6; D.tz = z - 2 - Math.random() * 5; D.wait = 0; D.food = 1; n++; });
if (!SW.crumbs) {
SW.crumbs = [];
}
for (var i = 0; i < 8; i++) {
var cr = swS(0.06, 0xD8B880, x + (Math.random() - 0.5) * 5, SW_LAKE.y + 0.02, z - 2 - Math.random() * 4, SW.G, 5);
SW.crumbs.push({ g: cr, t: 0 });
}
setStatus("🦆 You scatter some crumbs on the water. The ducks paddle over, slowly.");
swSay("You scatter some crumbs. The ducks are coming.");
swDid("ducks");
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(520, 0.05);
}
catch (e) { }
},
function () {
var S = { brush: 0 }, b = swPanel("🐴 Clover the pony", "", null);
function show() {
var h = "<div style='text-align:center'><div style='font-size:96px'>🐴</div>";
if (S.brush < 8)
h += "<div style='font:22px Georgia,serif;margin:8px'>Clover likes having her mane brushed, slowly.</div>" + swBtn("b", "🪮 Brush (" + (8 - S.brush) + " more strokes)", "", { big: 1 });
else
h += "<div style='font:22px Georgia,serif;margin:8px'>Her mane is soft and shiny. She nuzzles your hand.</div>" + swBtn("apple", "🍎 Give her an apple", "", { big: 1 }) + swBtn("done", "👋 Say goodbye", "", { big: 1 });
h += "</div>";
b.innerHTML = h;
swBind(b, { b: function () { S.brush++; if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(260 + S.brush * 12, 0.05);
}
catch (e) { } show(); if (S.brush >= 8)
swDid("pony"); }, apple: function () { setStatus("🍎 Clover munches the apple, very happily."); swSay("Clover munches the apple, very happily."); }, done: function () { swPanelClose(); } });
}
show();
},
function () {
var d = swData(), day = swToday();
if (d.f.eggDay !== day) {
d.f.eggDay = day;
d.f.eggsToday = 3;
}
var b = swPanel("🐔 The hens", "", null);
function show() {
var left = d.f.eggsToday || 0, h = "<div style='text-align:center'><div style='font-size:80px'>🐔🐓🐔</div><div style='font:20px Georgia,serif;margin:8px'>" + (left ? "There " + (left === 1 ? "is one egg" : "are " + left + " eggs") + " in the nest boxes today." : "No more eggs today. The hens will lay again tomorrow.") + "</div>";
h += swBtn("feed", "🌾 Scatter some corn", "", { big: 1 }) + (left ? swBtn("egg", "🥚 Collect an egg", "", { big: 1 }) : "") + "<div class='sw-tip'>You've collected " + (d.f.eggs || 0) + " eggs altogether.</div></div>";
b.innerHTML = h;
swBind(b, { feed: function () { setStatus("🌾 The hens peck happily at the corn."); swSay("The hens peck happily at the corn."); (SW.hens || []).forEach(function (c) { c.userData.fed = 6; }); }, egg: function () { d.f.eggsToday--; d.f.eggs = (d.f.eggs || 0) + 1; swSave(); swDid("eggs"); show(); } });
}
show();
},
function () {
var d = swData(), P = d.plots.mine || (d.plots.mine = { crop: null, stage: 0, wet: null }), day = swToday(), b = swPanel("🌱 Your allotment", "", null);
function show() {
var C = P.crop && SW_CROPS.filter(function (c) { return c[0] === P.crop; })[0], h = "<div style='text-align:center'>";
if (!C) {
h += "<div style='font:20px Georgia,serif;margin:8px'>What would you like to grow?</div>";
SW_CROPS.forEach(function (c) { h += swBtn("c_" + c[0], c[1] + " " + c[2], "", { big: 1 }); });
}
else {
var st = ["🟫 seeds in the soil", "🌱 little shoots", "🌿 growing well", "🪴 nearly ready", C[1] + " ready to pick!"][Math.min(4, P.stage)];
h += "<div style='font-size:80px'>" + (P.stage >= 4 ? C[1] : P.stage >= 2 ? "🌿" : P.stage >= 1 ? "🌱" : "🟫") + "</div><div style='font:20px Georgia,serif'>" + esc(C[2]) + ": " + st + "</div><div class='sw-tip'>Water it once a day: it grows a little each day it's watered.</div>";
if (P.stage >= 4)
h += swBtn("pick", "🧺 Pick them", "", { big: 1, col: "#5A8A5A" });
else
h += P.wet === day ? "<div class='sw-tip'>💧 Watered today. Come back tomorrow to see it grow.</div>" : swBtn("water", "💧 Water it", "", { big: 1 });
}
h += "</div>";
b.innerHTML = h;
var fns = { water: function () { P.wet = day; P.stage = Math.min(4, P.stage + 1); swSave(); swPlotShow(); swDid("garden"); show(); }, pick: function () { swKeep("garden", C[2] + " from your allotment", C[1]); P.crop = null; P.stage = 0; P.wet = null; swSave(); swPlotShow(); swDid("garden"); show(); } };
SW_CROPS.forEach(function (c) { fns["c_" + c[0]] = function () { P.crop = c[0]; P.stage = 0; P.wet = null; swSave(); swPlotShow(); show(); }; });
swBind(b, fns);
}
show();
},
function () {
var M = SW.myPlot;
if (!M || !M.g)
return;
while (M.g.children.length)
M.g.remove(M.g.children[0]);
var d = swData(), P = d.plots.mine;
if (!P || !P.crop)
return;
var C = SW_CROPS.filter(function (c) { return c[0] === P.crop; })[0];
if (!C)
return;
for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++) {
var x = -1.8 + c * 1.2, z = -1.8 + r * 1.2, s = 0.25 + P.stage * 0.18;
if (P.stage === 0) {
swS(0.05, 0x5A4632, x, 0.02, z, M.g, 5);
continue;
}
var st = swC(0.02, 0.03, s * 1.6, null, 0x4A8A3A, x, s * 0.8, z, M.g, 5);
swLeafBall(M.g, x, s * 1.4, z, s * 0.45, 0x4A8A3A);
if (P.stage >= 4) {
if (C[0] === "sunflower") {
swC(0.25, 0.25, 0.06, null, C[3], x, s * 2.2, z, M.g, 12).rotation.x = 1.2;
}
else
swS(0.08, C[3], x + 0.1, s * 1.2, z + 0.1, M.g, 8);
}
}
},
function (B) {
var hp = B.userData.home || (B.userData.home = { x: B.position.x, z: B.position.z, ry: B.rotation.y });
SW.boat = B;
camera.position.set(SW.base + B.position.x, SW_LAKE.y + 1.25, B.position.z);
setStatus("🚣 <b>In the boat.</b> Row about the lake, slowly. Press <b>E</b> by the jetty to step out, or use the Map to go anywhere.");
swSay("You are in the boat. Row slowly about the lake.");
swDid("boat");
},
function () {
var b = swPanel("🎣 Fishing off the jetty", "", function () { clearTimeout(SW.fishT); }), st = 0, F = null;
function show() {
var h = "<div style='text-align:center'>";
if (st === 0)
h += "<div style='font-size:80px'>🎣</div><div style='font:20px Georgia,serif'>The water is still. Ready to cast?</div>" + swBtn("cast", "🎣 Cast your line", "", { big: 1 });
else if (st === 1)
h += "<div style='font-size:80px'>🟠</div><div style='font:20px Georgia,serif'>The float bobs gently on the water… wait…</div>";
else if (st === 2)
h += "<div style='font-size:80px'>〰️🟠〰️</div><div style='font:20px Georgia,serif'>Something is nibbling!</div>" + swBtn("reel", "🌀 Reel it in gently", "", { big: 1 });
else
h += "<div style='font-size:80px'>🐟</div><div style='font:20px Georgia,serif'>You've caught " + F[0] + ", " + F[1] + ". Old Ned says: let it go back, so it can grow.</div>" + swBtn("free", "💧 Let it go", "", { big: 1, col: "#5A8A5A" });
h += "</div>";
b.innerHTML = h;
swBind(b, { cast: function () { st = 1; show(); SW.fishT = setTimeout(function () { if (SWP.open) {
st = 2;
show();
} }, 3000 + Math.random() * 4000); }, reel: function () { F = SW_FISH[Math.floor(Math.random() * SW_FISH.length)]; st = 3; show(); swSay("You have caught " + F[0] + ". Let it go back, so it can grow."); }, free: function () { swDid("fish"); setStatus("💧 The fish swims away, back into the deep, still water."); st = 0; show(); } });
}
show();
},
function (R) {
SW.sit = { y: camera.position.y, x: camera.position.x, z: camera.position.z };
camera.position.set(SW.base + R.x - 1.2, 1.15, -1.2);
yaw = Math.PI + 0.4;
pitch = -0.05;
setStatus("🛋️ <b>You sink into the big soft chair</b> under the heavy blanket. Rain patters on the window. Stay as long as you like. Press <b>E</b> to get up.");
swSay("You sink into the big soft chair. Stay as long as you like.");
swDid("quiet");
worldPrompt("🛋️ <b>press E</b> to get up", swStandUp);
},
function () { var R = SW_ROOMS.quiet; SW.sit = { x: camera.position.x, z: camera.position.z }; camera.position.set(SW.base + R.x + 2.6, 1.3, -1.9); yaw = 0; pitch = -0.12; setStatus("🐠 The fish drift round and round, slowly, in the soft green light. Press <b>E</b> to stop watching."); worldPrompt("🐠 <b>press E</b> to stop watching", swStandUp); swDid("quiet"); },
function () {
swCss2();
var b = swPanel("🫧 Breathe with the light", "<div style='display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh'><div id='sw-br' style='width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#E0F0F8,#9AC8E0);transition:all 4s ease-in-out'></div><div id='sw-brt' style='font:26px Georgia,serif;margin-top:30px;color:#3A5A6A'>Breathe in…</div><div class='sw-tip'>Stop whenever you like.</div></div>", function () { clearInterval(SW.brI); });
var el = b.querySelector("#sw-br"), tx = b.querySelector("#sw-brt"), inn = true;
function step() { inn = !inn; el.style.transitionDuration = inn ? "4s" : "6s"; el.style.width = el.style.height = inn ? "260px" : "120px"; tx.textContent = inn ? "Breathe in…" : "…and out"; }
setTimeout(function () { el.style.width = el.style.height = "260px"; }, 50);
clearInterval(SW.brI);
var t = 0;
SW.brI = setInterval(function () { t++; if ((inn && t >= 4) || (!inn && t >= 6)) {
t = 0;
step();
} }, 1000);
swDid("quiet");
},
function () {
swCss2();
var b = swPanel("🔍 Under the magnifying glass", "<div style='text-align:center'><canvas width='640' height='640' style='max-width:90vw;border-radius:50%;box-shadow:0 0 0 14px #8A6A3A,0 4px 18px rgba(0,0,0,.4)'></canvas><div style='font:19px Georgia,serif;max-width:640px;margin:12px auto'>A butterfly's wing, very close: it is covered in tiny scales, overlapping like roof tiles. Each scale is one colour; together they make the pattern.</div></div>", null);
var c = b.querySelector("canvas").getContext("2d"), R = wRand(3);
c.fillStyle = "#2A1A0A";
c.fillRect(0, 0, 640, 640);
for (var y = -20; y < 660; y += 16)
for (var x = -20; x < 660; x += 12) {
var xx = x + ((y / 16) % 2) * 6, d = Math.hypot(xx - 320, y - 300), col = d < 90 ? "#F4E8C0" : d < 120 ? "#1A1A1A" : d < 250 ? "#E8702A" : (R() < 0.5 ? "#1A1A1A" : "#3A2A1A");
c.fillStyle = col;
c.beginPath();
c.ellipse(xx, y, 6, 10, 0.15, 0, 7);
c.fill();
c.strokeStyle = "rgba(0,0,0,.25)";
c.stroke();
}
swDid("bugs");
},
function (x, z, feet) {
if (SW.moving || SW.cab || SW.sit)
return true;
if (x >= SW_IN_X - 2000) {
if (swSolidAt(x, z, feet))
return true;
return !swInsideWalk(x, z);
}
if (Math.hypot(x, z + 40) > SW_BOUND)
return true;
if (SW.boat) {
return swLakeE(x, z) > 0.93;
}
if (swInLake(x, z) && swFloorAt(x, z, feet) === null)
return true;
if (swSolidAt(x, z, feet))
return true;
return !!(SW.treeList && swTreeHit(x, z));
},
function (G) {
SW.G = G;
SW.lite = typeof LITE !== "undefined" && !!LITE;
SW.solids = [];
SW.floors = [];
SW.spots = [];
SW.talk = [];
SW.people = [];
SW.movers = [];
SW.fx = [];
SW.lights = [];
SW.flies = [];
SW.ducks = [];
SW.crumbs = [];
SW.room = null;
SW.boat = null;
SW.sit = null;
SW.cab = null;
SW.trees = null;
SW.treeList = null;
SW.under = null;
SW.orrery = null;
SW.globe = null;
SW.fish = null;
SW.breath = null;
SW.mapTex = null;
for (var k in SW_ROOMS) {
var R = SW_ROOMS[k];
R.g = null;
R.D = null;
R.door = null;
R.rail = null;
R.trains = null;
R.dispG = null;
R.wall = null;
R.galG = null;
R.puffs = null;
}
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[stillwater] " + name, e);
} }
step("terrain", function () { swTerrain(G); });
step("sky", function () { swSky(G); });
step("trees", function () { swTrees(G); });
step("under", function () { swUnder(G); });
step("village", function () { swVillage(G); });
step("plot", function () { swPlotShow(); });
var my = new THREE.PointLight(0xFFE8C0, 0.4, 12, 2);
G.add(my);
SW.my = my;
SW.outside = G.children.slice();
SW.built = true;
},
function (opt) {
opt = opt || {};
var A = SW_AT.arrive;
SW.room = null;
SW.moving = false;
SW.boat = null;
SW.sit = null;
SW.cab = null;
if (SW.outside)
SW.outside.forEach(function (o) { o.visible = true; });
for (var k in SW_ROOMS)
if (SW_ROOMS[k].g) {
SW_ROOMS[k].g.visible = false;
SW_ROOMS[k].D.visible = false;
}
camera.position.set(SW.base + A.x, swGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = 0;
pitch = 0;
if (SW.under)
swUnderFill(A.x, A.z);
var d = swData(), first = !d.f.been;
d.f.been = 1;
swSave();
if (opt.room) {
setTimeout(function () { swEnterRoom(opt.room, SW_HOUSE_AT[opt.room] && SW_HOUSE_AT[opt.room].door); }, 400);
}
else if (opt.at && SW_AT[opt.at]) {
var P = SW_AT[opt.at];
camera.position.set(SW.base + P.x, swGround(P.x, P.z + 8, 1e4) + 1.72, P.z + 8);
}
var C = swCfg();
setStatus("🍃 <b>" + SW_NAME + ", a calm place.</b> " + (first ? "Take your time. The Welcome Cottage, just ahead on the green, has the Today board, a map and the calm settings. The big buttons on the right are always there: 🏠 home, 🍃 calm, 💬 say, 🗺️ map." : "Welcome back. Take your time.") + (C.welcome && C.notice ? " 📌 " + esc(C.notice) : ""));
swSay(SW_NAME + ". A calm place. Take your time.");
swCalmApply();
swHud();
swAmbient();
},
function () { SW.room = null; SW.boat = null; SW.sit = null; SW.cab = null; if (SW.veil)
SW.veil.style.opacity = "0"; SW.moving = false; worldPrompt(null); if (SWB.on)
swPanelClose(); swAmbientStop(); try {
speechSynthesis.cancel();
}
catch (e) { } var off = function () { swCalmApply(); swHud(); swPeopleFilter(); }; off(); setTimeout(off, 0); },
function (dt) {
var L = worldLocal();
SW.t += dt;
if (!SW.built)
return;
if (typeof stars !== "undefined" && stars)
stars.visible = false;
if (SW.clouds)
SW.clouds.rotation.y += dt * 0.002;
swLightsTick(dt);
SW.fx.forEach(function (F) { if (F.k === "flame") {
F.ph += dt * 2.4;
F.m.scale.set(1, 0.9 + 0.08 * Math.sin(F.ph) + 0.03 * Math.sin(F.ph * 2.3), 1);
} });
SW.movers.forEach(function (M) {
try {
if (M.k === "peck") {
M.ph += dt * (M.g.userData.fed > 0 ? 2.2 : 0.9);
if (M.g.userData.fed > 0)
M.g.userData.fed -= dt;
M.g.rotation.x = Math.max(0, Math.sin(M.ph)) * 0.5;
}
else if (M.k === "swing") {
M.ph += dt * 0.4;
M.g.rotation.y = Math.sin(M.ph) * 0.5;
}
}
catch (e) { }
});
var R = SW.room;
if (!R) {
SW.ducks.forEach(function (D) {
var p = D.g.position, dx = D.tx - p.x, dz = D.tz - p.z, d = Math.hypot(dx, dz);
if (d > 0.3) {
var sp = (D.food ? 0.9 : 0.35) * dt;
p.x += dx / d * Math.min(d, sp);
p.z += dz / d * Math.min(d, sp);
var a = Math.atan2(dx, dz), da = ((a - D.g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
D.g.rotation.y += da * Math.min(1, dt * 1.5);
}
else {
D.wait -= dt;
if (D.wait <= 0) {
D.food = null;
D.wait = 5 + Math.random() * 10;
var a2 = Math.random() * 6.283, r = 4 + Math.random() * 12;
D.tx = D.hx + Math.sin(a2) * r;
D.tz = D.hz + Math.cos(a2) * r;
if (swLakeE(D.tx, D.tz) > 0.85) {
D.tx = D.hx;
D.tz = D.hz;
}
}
}
p.y = SW_LAKE.y - 0.05 + Math.sin(SW.t * 1.2 + D.hx) * 0.02;
});
for (var c = SW.crumbs.length - 1; c >= 0; c--) {
var Cr = SW.crumbs[c];
Cr.t += dt;
if (Cr.t > 14) {
SW.G.remove(Cr.g);
SW.crumbs.splice(c, 1);
}
}
SW.flies.forEach(function (b) { var u = b.userData; u.ph += dt * u.sp; b.position.set(u.hx + Math.sin(u.ph * 0.7) * 1.2, u.hy + Math.sin(u.ph * 1.3) * 0.3, u.hz + Math.cos(u.ph * 0.5) * 1.0); b.rotation.y = u.ph * 0.7 + Math.PI / 2; var a = Math.sin(u.ph * 14) * 0.7; u.wl.rotation.z = a; u.wr.rotation.z = -a; });
if (SW.boat) {
var B = SW.boat;
B.position.x = L.x;
B.position.z = L.z;
var ty = yaw + Math.PI;
var db = ((ty - B.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
B.rotation.y += db * Math.min(1, dt * 2);
B.position.y = SW_LAKE.y - 0.25 + Math.sin(SW.t * 0.9) * 0.03;
var J = SW.jetty;
if (J && Math.abs(L.x - J.x) < 6 && L.z < J.z0 + 2 && L.z > J.z1 - 4)
worldPrompt("🚣 <b>press E</b> to step out onto the jetty", swBoatOut);
else if (WLD.promptFn === swBoatOut)
worldPrompt(null);
}
}
else {
if (SW.fish && R.k === "quiet")
SW.fish.forEach(function (F) { F.ph += dt * 0.35; F.g.position.set(Math.cos(F.ph) * F.r, F.y + Math.sin(F.ph * 1.7) * 0.05, Math.sin(F.ph) * 0.15); F.g.rotation.y = -F.ph; });
if (SW.breath && R.k === "quiet") {
var br = 0.5 + 0.5 * Math.sin(SW.t * 2 * Math.PI / 10);
SW.breath.m.scale.setScalar(0.8 + br * 0.5);
SW.breath.glow.material.opacity = 0.15 + br * 0.25;
}
if (SW.orrery && R.k === "stars")
SW.orrery.forEach(function (O) { O.g.rotation.y += dt * O.sp; });
if (SW.globe && R.k === "maps")
SW.globe.rotation.y += dt * 0.08;
if (R.k === "trains")
swTrainsTick(dt);
}
if (SW.my) {
SW.my.position.set(L.x, camera.position.y + 0.3, L.z);
SW.my.intensity = R ? 0 : 0.4;
}
if (SW.moving) {
worldPrompt(null);
return;
}
if (WLD.arrive && (WLD.arrive.x !== SW_AT.arrive.x || WLD.arrive.z !== SW_AT.arrive.z))
WLD.arrive = { x: SW_AT.arrive.x, z: SW_AT.arrive.z };
SW.vt += dt;
if (SW.vt > 0.5) {
SW.vt = 0;
if (!R && SW.under)
swUnderFill(L.x, L.z);
swHud();
}
var H = R ? swHouseDef(R.k) : null;
worldBanner("<b>🍃 " + SW_NAME + "</b> · " + (H ? H[2] + " " + esc(H[1]) : swZoneName(L.x, L.z)));
SW.pt += dt;
if (SW.pt < 0.15)
return;
SW.pt = 0;
if (SWP.open || SW.cab || SW.sit || SW.boat)
return;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var dd = Math.hypot(L.x - x, L.z - z); if (dd < r && dd / r < bd) {
bd = dd / r;
best = { fn: fn, html: html };
} }
var talkOn = swCfg().talk || swKeeper();
SW.talk.forEach(function (T) {
var g = T.p.g;
if (!g || !g.visible || (g.parent && !g.parent.visible))
return;
var wx = g.matrixWorld.elements[12] - SW.base, wz = g.matrixWorld.elements[14];
if (Math.abs(wx - L.x) > 8 || Math.abs(wz - L.z) > 8)
return;
if (!talkOn && !T.fn)
return;
cand(wx, wz, T.r, T.fn || function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
SW.spots.forEach(function (s) {
if (!s.r || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : swGround(s.x, s.z);
if (Math.abs(sy - feet) > 3.2)
return;
cand(s.x, s.z, s.r, s.fn, (s.icon ? s.icon + " " : "") + "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (typeof raNear === "function") {
var rn = null;
try {
rn = raNear();
}
catch (e) { }
if (rn)
best = { fn: rn.fn, html: rn.html };
}
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
if (!R)
SW.people.forEach(function (P) { if (!P.wander || !P.g.visible)
return; var p = P.g.position; if (Math.abs(p.x - L.x) > 120 || Math.abs(p.z - L.z) > 120)
return; wWander(P.g, 0.15, function (x, z) { return swGround(x, z); }, P.wander); });
},
function () {
for (var k in SW_MATS) {
var m = SW_MATS[k];
if (m && m.dispose && !m.map)
try {
m.dispose();
}
catch (e) { }
delete SW_MATS[k];
}
SW.built = false;
SW.G = null;
SW.outside = null;
SW.trees = null;
SW.treeList = null;
SW.under = null;
SW.ducks = [];
SW.flies = [];
SW.people = [];
SW.talk = [];
SW.spots = [];
SW.knitRack = null;
SW.myPlot = null;
for (var r in SW_ROOMS) {
var R = SW_ROOMS[r];
R.g = null;
R.D = null;
R.rail = null;
R.trains = null;
R.dispG = null;
R.wall = null;
R.galG = null;
}
for (var g in SWB.geo) {
try {
SWB.geo[g].dispose();
}
catch (e) { }
delete SWB.geo[g];
}
},
function () {
var keeper = swKeeper(), b = "", fns = {}, d = swData();
var rows = [["What it is", "A calm lakeside village to visit at your own pace: gentle hobbies, kind villagers, soft sounds, nothing timed and nothing sudden."], ["How to get there", "Through the soft green door in the Hall of Doors, or from here."], ["Your shelf", d.shelf.length + " things you've made"]];
if (WLD.on === SW_KEY) {
b += worldBtn("calm", "🍃 Calm settings", "Sound, light, softer colours, a slower walk, who you see");
fns.calm = function () { worldCard(null); swCalmCard(); };
b += worldBtn("today", "📋 Today", "Choose your three things");
fns.today = function () { worldCard(null); swTodayCard(); };
b += worldBtn("map", "🗺️ The picture map", "See where everything is, and go there");
fns.map = function () { worldCard(null); swMapCard(); };
b += worldBtn("quiet", "🌧️ The Quiet Room", "Somewhere still, just for you");
fns.quiet = function () { worldCard(null); swTakeMe("quiet", true); };
if (SW.room) {
b += worldBtn("out", "🚪 Step outside", "");
fns.out = function () { worldCard(null); swLeaveRoom(SW.room); };
}
b += worldBtn("home", "🏠 Leave " + SW_NAME, "Back to where you came from");
fns.home = function () { worldCard(null); swHome(); };
}
else if (!WLD.on && (swOpen() || keeper)) {
b += worldBtn("go", "🍃 Go to " + SW_NAME, "Arrive at the standing stone, by the green");
fns.go = function () { worldCard(null); swGo({}); };
}
worldCard(worldFacts("🍃 " + SW_NAME, "A calm place", rows, []) + b, fns);
},
function () { return { SW: SW, go: swGo, room: swEnterRoom, rooms: SW_ROOMS, at: SW_AT, land: swLand, ground: swGround, block: swBlock, data: swData, menu: swMenu, bench: SWB, build: swBuildStart, kit: swModelStart, puzzle: swPuzzleStart, fig: swFigureStart, sculpt: swSculptBench, pot: swPotteryBench, sand: swSandTable, planets: swPlanets, globe: swGlobeCard, trains: swTrainCard, cab: swCabRide, calm: swCalmCard, map: swMapCard, today: swTodayCard, parts: swBrickParts }; },
function (kind, col) {
var key = "rm|" + kind + "|" + col;
if (SW_MATS[key])
return SW_MATS[key];
var m = null;
try {
if (kind === "brass" && typeof bdlMetal === "function")
m = bdlMetal(col === undefined ? 0xD8B060 : col);
else if (SW_RICH[kind] && typeof bdlS === "function")
m = bdlS(SW_RICH[kind][0], col === undefined ? 0xFFFFFF : col, SW_RICH[kind][1]);
}
catch (e) {
m = null;
}
if (!m) {
var fb = { oak: "wood", planks: "wood", deck: "wood", stucco: "plaster", limestone: "stone", ashlar: "stone", cotto: "floortile", terracotta: "tile", slate: "slate", marble: "marble" }[kind] || null;
m = kind === "brass" ? swShiny(col || 0xD8B060, 80) : swMat(fb, col === undefined ? 0xFFFFFF : col);
}
return (SW_MATS[key] = m);
},
function () {
if (SW_VIEW)
return SW_VIEW;
var t = wTex(512, 320, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H * 0.62);
g.addColorStop(0, "#7FA3D0");
g.addColorStop(0.55, "#E9D6B8");
g.addColorStop(1, "#F6DDB0");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 9; i++) {
var cx = (i * 97) % W, cy = 30 + (i * 37) % 70, r = 40 + (i * 13) % 40, cg = c.createRadialGradient(cx, cy, 0, cx, cy, r);
cg.addColorStop(0, "rgba(255,246,236,.55)");
cg.addColorStop(1, "rgba(255,246,236,0)");
c.fillStyle = cg;
c.beginPath();
c.ellipse(cx, cy, r * 1.8, r * 0.5, 0, 0, 7);
c.fill();
}
function hills(y0, amp, col, seed) { c.fillStyle = col; c.beginPath(); c.moveTo(0, H); for (var x = 0; x <= W; x += 8) {
c.lineTo(x, y0 - amp * (0.5 + 0.5 * Math.sin(x * 0.011 + seed) * Math.cos(x * 0.004 + seed * 2)));
} c.lineTo(W, H); c.fill(); }
hills(H * 0.56, 34, "#93A6B4", 1);
hills(H * 0.6, 26, "#7E9878", 3);
var lg = c.createLinearGradient(0, H * 0.6, 0, H * 0.8);
lg.addColorStop(0, "#C9CFC8");
lg.addColorStop(1, "#6F94A2");
c.fillStyle = lg;
c.fillRect(0, H * 0.6, W, H * 0.2);
c.fillStyle = "rgba(255,236,200,.35)";
for (var r2 = 0; r2 < 14; r2++)
c.fillRect(W * 0.62 + ((r2 * 31) % 60) - 30, H * 0.62 + r2 * 3.4, 40 - r2 * 2, 1.2);
var mg = c.createLinearGradient(0, H * 0.78, 0, H);
mg.addColorStop(0, "#6E9450");
mg.addColorStop(1, "#4E7436");
c.fillStyle = mg;
c.fillRect(0, H * 0.78, W, H * 0.22);
function tree(x, y, s, col) { c.fillStyle = "#4A3A2A"; c.fillRect(x - 2 * s, y - 18 * s, 4 * s, 18 * s); c.fillStyle = col; for (var k = 0; k < 6; k++) {
c.beginPath();
c.arc(x + (k - 2.5) * 5 * s, y - 22 * s - (k % 2) * 6 * s, 10 * s, 0, 7);
c.fill();
} }
tree(40, H * 0.8, 1.3, "#4E7A38");
tree(92, H * 0.79, 1, "#5A8640");
tree(430, H * 0.8, 1.5, "#48743A");
tree(480, H * 0.81, 1.1, "#5C8A42");
c.strokeStyle = "#6E9A4A";
c.lineWidth = 2;
for (var wv = 0; wv < 40; wv++) {
var wx = 250 + (wv - 20) * 2.2;
c.beginPath();
c.moveTo(250, H * 0.66);
c.quadraticCurveTo(wx, H * 0.62, wx + (wv - 20) * 0.6, H * 0.8);
c.stroke();
}
for (var f = 0; f < 160; f++) {
c.fillStyle = ["#F4F0F0", "#E8C83A", "#C85A9A", "#B8A0E8"][f % 4];
c.fillRect((f * 53) % W, H * 0.84 + ((f * 29) % 50), 2, 2);
}
});
SW_VIEW = new THREE.MeshBasicMaterial({ map: t, fog: false });
SW_VIEW.userData.ldShared = 1;
return SW_VIEW;
},
function (k) {
if (SW_ARTS[k])
return SW_ARTS[k];
var A = swArt(k);
if (!A || typeof document === "undefined")
return null;
var cv = document.createElement("canvas"), sc = 320 / Math.max(A[4], A[5]);
cv.width = Math.max(16, Math.round(A[4] * sc));
cv.height = Math.max(16, Math.round(A[5] * sc));
var x = cv.getContext("2d");
x.fillStyle = "#6A5A48";
x.fillRect(0, 0, cv.width, cv.height);
var t = new THREE.CanvasTexture(cv);
SW_ARTS[k] = t;
var im = new Image();
im.onload = function () { try {
x.drawImage(im, 0, 0, cv.width, cv.height);
t.needsUpdate = true;
}
catch (e) { } };
im.src = SW_ART_DIR + k + ".jpg";
return t;
},
function (g, x, y, z, ry, k, hgt) {
var A = swArt(k);
if (!A)
return null;
hgt = hgt || 0.8;
var w = hgt * A[4] / A[5], f = swG(x, y, z, g, ry), gilt = swRM("brass", 0xC89A48);
swAdd(new THREE.BoxGeometry(w + 0.16, hgt + 0.16, 0.05), gilt, 0, 0, 0, f);
swAdd(new THREE.BoxGeometry(w + 0.06, hgt + 0.06, 0.06), swMat(null, 0x3A2A1A), 0, 0, 0.005, f);
var c = swAdd(new THREE.PlaneGeometry(w, hgt), new THREE.MeshLambertMaterial({ map: swArtTex(k) }), 0, 0, 0.04, f);
c.userData.keep = 1;
if (!SW.lite) {
swC(0.02, 0.02, w * 0.5, null, 0xB8904A, 0, hgt / 2 + 0.12, 0.1, f, 6).rotation.z = Math.PI / 2;
}
return f;
},
function (g, x, y, z, ry, w, h, col) {
var c = swG(x, y, z, g, ry), m = swCloth(col, "velvet");
swC(0.02, 0.02, w + 0.9, null, 0x6A5030, 0, h / 2 + 0.22, 0.14, c, 8).rotation.z = Math.PI / 2;
[-1, 1].forEach(function (s) {
var cu = swG(s * (w / 2 + 0.22), 0, 0.12, c);
for (var i = 0; i < 4; i++) {
var f = swAdd(new THREE.CylinderGeometry(0.07, 0.09, h + 0.4, 10, 1, true, 0, Math.PI), m, (i - 1.5) * 0.12, 0.02, 0, cu);
f.rotation.y = Math.PI;
}
var tie = swAdd(new THREE.TorusGeometry(0.2, 0.025, 6, 14), swMat(null, 0xC8A060), 0, -h * 0.18, 0.05, cu);
tie.rotation.x = Math.PI / 2;
tie.scale.set(1.2, 0.6, 1);
});
return c;
},
function (g, x, z, s, kind) {
s = s || 1;
var p = swG(x, 0, z, g);
swRC(0.2 * s, 0.15 * s, 0.36 * s, "terracotta", 0xC8704A, 0, 0.18 * s, 0, p, 16);
swC(0.19 * s, 0.19 * s, 0.02, null, 0x3A2A1A, 0, 0.35 * s, 0, p, 16);
if (kind === "fern" && typeof ctuFrondGeo === "function") {
var fg = ctuFrondGeo(0.6 * s), fm = swMat(null, 0x4A8A3A);
fm.side = THREE.DoubleSide;
for (var i = 0; i < 7; i++) {
var fr = swAdd(fg, fm, 0, 0.36 * s, 0, p);
fr.rotation.set(0.5, i / 7 * 6.283, 0);
}
}
else if (kind === "palm") {
for (var j = 0; j < 9; j++) {
var st = swC(0.008, 0.012, 0.9 * s, null, 0x5A7A3A, 0, 0.36 * s + 0.4 * s, 0, p, 4);
var a = j / 9 * 6.283;
st.rotation.set(Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4);
st.position.x = Math.sin(a) * 0.18 * s;
st.position.z = Math.cos(a) * 0.18 * s;
var lf = swAdd(new THREE.PlaneGeometry(0.16 * s, 0.5 * s), swCloth(0x4E8A3A, "moss"), Math.sin(a) * 0.4 * s, 0.36 * s + 0.85 * s, Math.cos(a) * 0.4 * s, p);
lf.rotation.set(-0.8, a, 0);
}
}
else {
swLeafBall(p, 0, 0.62 * s, 0, 0.32 * s, 0x4A8A3A);
swLeafBall(p, 0.12 * s, 0.85 * s, 0.05 * s, 0.22 * s, 0x5A9A44);
swLeafBall(p, -0.1 * s, 0.78 * s, -0.08 * s, 0.2 * s, 0x3E7A30);
}
return p;
},
function (g, x, y, z, ry) {
var s = swG(x, y, z, g, ry);
swB(0.1, 0.16, 0.04, null, 0xB8904A, 0, 0, 0, s);
swC(0.015, 0.015, 0.2, null, 0xB8904A, 0, 0.02, 0.1, s, 6).rotation.x = Math.PI / 2;
var sh = swAdd(new THREE.CylinderGeometry(0.07, 0.11, 0.16, 14, 1, true), new THREE.MeshLambertMaterial({ color: 0xF4E8D0, side: THREE.DoubleSide, emissive: new THREE.Color(0x8A6A3A) }), 0, 0.1, 0.2, s);
sh.userData.keep = 1;
if (!SW.lite) {
var gl = wGlow(0xFFD8A0, 0.9, 0.35);
gl.position.set(0, 0.1, 0.22);
s.add(gl);
}
return s;
},
function (g, x, y, z, col) {
var v = swG(x, y, z, g);
swC(0.05, 0.07, 0.2, null, col || 0xE8E4DC, 0, 0.1, 0, v, 14);
for (var i = 0; i < 9; i++) {
var a = i * 2.4, r = 0.04 + (i % 3) * 0.03, st = swC(0.004, 0.004, 0.24, null, 0x4A7A3A, Math.cos(a) * r * 0.5, 0.3, Math.sin(a) * r * 0.5, v, 4);
st.rotation.set(Math.sin(a) * 0.25, 0, Math.cos(a) * 0.25);
swS(0.035, SW_FLC[i % SW_FLC.length], Math.cos(a) * r, 0.42 + (i % 2) * 0.04, Math.sin(a) * r, v, 6);
}
return v;
},
function (g, x, z, ry) {
var c = swG(x, 0, z, g, ry);
swRB(0.5, 2.1, 0.34, "oak", 0x6A4228, 0, 1.05, 0, c);
swRB(0.58, 0.12, 0.4, "oak", 0x5A3820, 0, 2.14, 0, c);
var face = swAdd(new THREE.CircleGeometry(0.17, 24), new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (x, W, H) { x.fillStyle = "#F4EEDC"; x.beginPath(); x.arc(64, 64, 62, 0, 7); x.fill(); x.strokeStyle = "#3A2A1A"; x.lineWidth = 3; x.stroke(); x.fillStyle = "#2A1A10"; x.font = "bold 13px Georgia"; x.textAlign = "center"; x.textBaseline = "middle"; for (var i = 1; i <= 12; i++) {
var a = i / 12 * 6.283;
x.fillText(String(i), 64 + Math.sin(a) * 48, 64 - Math.cos(a) * 48);
} x.lineWidth = 4; x.beginPath(); x.moveTo(64, 64); x.lineTo(64, 30); x.moveTo(64, 64); x.lineTo(90, 72); x.stroke(); }) }), 0, 1.75, 0.175, c);
var pg = swAdd(new THREE.PlaneGeometry(0.26, 0.6), swSee(0xE8F0F0, 0.25), 0, 1.0, 0.175, c);
swC(0.06, 0.06, 0.02, null, 0xD8B060, 0, 0.9, 0.16, c, 14).rotation.x = Math.PI / 2;
return c;
},
function (R, g) {
if (R.plain)
return;
var w = R.w, d = R.d, h = R.h || 3.3, W = R.wall || ["plaster", 0xEEE6D4], dark = R.env === "dome";
if (!dark && (W[0] === "plaster" || W[0] === "stone") && R.wainscot !== false) {
var pc = R.panel || 0x7A5232, ph = 1.05;
[[0, -d / 2 + 0.02, w, 0], [-w / 2 + 0.02, 0, d, Math.PI / 2], [w / 2 - 0.02, 0, d, Math.PI / 2], [0, d / 2 - 0.02, w, 0]].forEach(function (s, si) {
var p = swG(s[0], 0, s[1], g, s[3]);
swRB(s[2], ph, 0.04, "oak", pc, 0, ph / 2, 0, p);
swRB(s[2], 0.06, 0.07, "oak", swMix(pc, 0x000000, 0.2), 0, ph, 0, p);
var n = Math.max(2, Math.round(s[2] / 0.9));
for (var i = 0; i < n; i++) {
var px = -s[2] / 2 + (i + 0.5) * s[2] / n;
swRB(s[2] / n - 0.16, ph - 0.34, 0.012, "oak", swMix(pc, 0xFFFFFF, 0.08), px, ph / 2, si === 3 || si === 2 ? -0.025 : 0.025, p);
}
});
}
if (!dark) {
var cc = R.cornice || 0xF4EEE2;
swB(w, 0.14, 0.14, null, cc, 0, h - 0.07, -d / 2 + 0.07, g);
swB(w, 0.14, 0.14, null, cc, 0, h - 0.07, d / 2 - 0.07, g);
swB(0.14, 0.14, d, null, cc, -w / 2 + 0.07, h - 0.07, 0, g);
swB(0.14, 0.14, d, null, cc, w / 2 - 0.07, h - 0.07, 0, g);
}
(R.wins || []).forEach(function (Wn, i) { swCurtains(g, Wn.x, Wn.y, Wn.z, Wn.ry, Wn.w, Wn.h, R.curtain || [0x6A8A9A, 0xA8705A, 0x7A8A5A, 0x8A6A8A][(R.i + i) % 4]); });
if (!dark && R.art !== false) {
var A = SW_ART_HANG, ai = (R.i * 3) % A.length;
[-1, 1].forEach(function (s, i) { var px = s * Math.min(w / 4 + 0.4, w / 2 - 1.2); if (!swFreeAt(R, px, d / 2 - 0.5) || !swFreeAt(R, px, d / 2 - 0.25))
return; swPainting(g, px, 1.95, d / 2 - 0.06, Math.PI, A[(ai + i) % A.length], 0.85); });
if (swFreeAt(R, -w / 4, -d / 2 + 0.4) && swFreeAt(R, -w / 4, -d / 2 + 0.8) && !R.noBackArt)
swPainting(g, -w / 4, 1.95, -d / 2 + 0.06, 0, A[(ai + 2) % A.length], 0.9);
}
if (!dark)
[-1, 1].forEach(function (s) { swSconce(g, s * (w / 2 - 0.04), 2.2, d / 2 - 1.2, s > 0 ? -Math.PI / 2 : Math.PI / 2); });
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (c, i) {
if (i > 1 && R.backPlants === false)
return;
var px = c[0] * (w / 2 - 0.5), pz = c[1] * (d / 2 - 0.55);
if (!swFreeAt(R, px, pz) || !swFreeAt(R, px * 0.9, pz * 0.9))
return;
if (Math.abs(px) < 1.2)
return;
swPotPlant(g, px, pz, 0.9 + ((R.i + i) % 3) * 0.15, ["fern", "leaf", "palm"][(R.i + i) % 3]);
R.round(px, pz, 0.32);
});
},
function (R, g, cx, cz) {
var T = swG(cx, 0, cz, g), W = 5.2, D = 3.9, X0 = -270, X1 = 270, Z0 = -235, Z1 = 170, sc = W / (X1 - X0), top = 0.92, ex = 2.4, mx = (X0 + X1) / 2, mz = (Z0 + Z1) / 2;
swRB(W + 0.5, 0.12, D + 0.5, "oak", 0x5A3820, 0, top - 0.06, 0, T);
[[0, (D + 0.5) / 2, W + 0.6, 0.1], [0, -(D + 0.5) / 2, W + 0.6, 0.1], [(W + 0.5) / 2, 0, 0.1, D + 0.5], [-(W + 0.5) / 2, 0, 0.1, D + 0.5]].forEach(function (e) { swRB(e[2], 0.2, e[3], "oak", 0x4A2E1A, e[0], top + 0.04, e[1], T); });
for (var l = 0; l < 8; l++) {
var lx = (l % 4 - 1.5) * (W / 3.2), lz = (l < 4 ? -1 : 1) * (D / 2);
swRC(0.07, 0.05, top - 0.12, "oak", 0x4A2E1A, lx, (top - 0.12) / 2, lz, T, 10);
}
R.solid(cx, cz, W + 0.7, D + 0.7, 1.2);
var nx = SW.lite ? 78 : 132, nz = Math.round(nx * D / W), geo = new THREE.PlaneGeometry(W, D, nx, nz);
geo.rotateX(-Math.PI / 2);
var P = geo.attributes.position, col = new Float32Array(P.count * 3), c = new THREE.Color();
for (var i = 0; i < P.count; i++) {
var px = P.getX(i), pz = P.getZ(i), wx = px / sc + mx, wz = pz / sc + mz, hh = swLand(wx, wz), edge = Math.abs(px) > W / 2 - 0.001 || Math.abs(pz) > D / 2 - 0.001;
var y = edge ? top + 0.01 : top + 0.03 + (Math.max(hh, SW_LAKE.y - 0.8) + 4.5) * sc * ex;
P.setY(i, y);
var k = swGroundCol(wx, wz, hh);
if (swStreamD(wx, wz) < 4)
k = 0x6A9AAA;
else if (swPathAll(wx, wz) < 2.4)
k = 0xD8C8A0;
if (edge)
k = 0x7A6A4A;
c.setHex(k);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeVertexNormals();
var land = swAdd(geo, new THREE.MeshLambertMaterial({ vertexColors: true }), 0, 0, 0, T);
land.userData.keep = 1;
var L = SW_LAKE, ly = top + 0.03 + (L.y + 4.5) * sc * ex + 0.004, lg = new THREE.CircleGeometry(1, 56);
lg.rotateX(-Math.PI / 2);
lg.scale(L.rx * sc, 1, L.rz * sc);
var lake = swAdd(lg, new THREE.MeshPhongMaterial({ color: 0x5A8AA0, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.86 }), (L.x - mx) * sc, ly, (L.z - mz) * sc, T);
lake.userData.keep = 1;
function at(x, z) { return { x: (x - mx) * sc, z: (z - mz) * sc, y: top + 0.03 + (Math.max(swLand(x, z), L.y - 0.8) + 4.5) * sc * ex }; }
var big = 1.7, labels = new THREE.Group();
T.add(labels);
SW_HOUSES.forEach(function (H) {
var A = SW_HOUSE_AT[H[0]];
if (!A)
return;
var p = at(A.x, A.z);
if (Math.abs(p.x) > W / 2 - 0.05 || Math.abs(p.z) > D / 2 - 0.05)
return;
var hg = swG(p.x, p.y, p.z, T, A.ry), hw = A.w * sc * big, hd = A.d * sc * big, wh = 3.1 * (H[5][2] || 1) * sc * big, wallC = (SW_WALLS[H[6]] || SW_WALLS.plaster)[1], roofC = (SW_ROOFS[H[7]] || SW_ROOFS.slate)[1];
if (H[6] === "dome") {
swC(hw / 2, hw / 2, wh, null, 0xF0EEE8, 0, wh / 2, 0, hg, 16);
swAdd(new THREE.SphereGeometry(hw / 2, 16, 8, 0, 6.283, 0, Math.PI / 2), swMat(null, 0xE8EAEE), 0, wh, 0, hg);
}
else {
swB(hw, wh, hd, null, wallC, 0, wh / 2, 0, hg);
var rf = swPrism(hd, hd * 0.55, hw, null, roofC, 0, wh, 0, hg, Math.PI / 2);
}
swC(0.004, 0.004, 0.3, null, 0xC8A048, 0, wh + 0.15, 0, hg, 4);
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: swIconTex(H[2]), transparent: true, depthWrite: false }));
sp.scale.set(0.17, 0.17, 1);
var wp = new THREE.Vector3(p.x, p.y + wh + 0.36, p.z);
sp.position.copy(wp);
labels.add(sp);
});
var og = at(SW_GREEN.x, SW_GREEN.z);
swLeafBall(T, og.x, og.y + 0.09, og.z, 0.07, 0x4A7A2E);
swC(0.008, 0.012, 0.08, null, 0x5A4632, og.x, og.y + 0.04, og.z, T, 6);
var jt = at(0, -74);
swB(3 * sc * big, 0.01, 14 * sc, null, 0x8A6A4A, jt.x, ly + 0.004, jt.z - 7 * sc, T);
var as = at(SW_AT.arrive.x, SW_AT.arrive.z);
swC(0.01, 0.014, 0.05, null, 0x9A9488, as.x, as.y + 0.025, as.z, T, 6);
var TL = SW.treeList;
if (TL) {
var all = [];
Object.keys(TL).forEach(function (k) { TL[k].forEach(function (t) { var p = at(t.x, t.z); if (Math.abs(p.x) < W / 2 - 0.03 && Math.abs(p.z) < D / 2 - 0.03)
all.push([p, k, t.s]); }); });
var max = SW.lite ? 360 : 1100;
if (all.length > max)
all = all.filter(function (q, i) { return i % Math.ceil(all.length / max) === 0; });
var im = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), all.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), cc = new THREE.Color();
im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(all.length * 3), 3);
all.forEach(function (A2, i) {
var r = (A2[1] === "oak" ? 0.045 : A2[1] === "willow" ? 0.04 : A2[1] === "pine" ? 0.026 : 0.03) * A2[2];
v.set(A2[0].x, A2[0].y + r * (A2[1] === "pine" ? 1.6 : 1.1), A2[0].z);
s.set(r, r * (A2[1] === "pine" ? 1.9 : 1), r);
m4.compose(v, q, s);
im.setMatrixAt(i, m4);
cc.setHex({ oak: 0x3E6A2A, birch: 0x6A9A3A, willow: 0x6A8E3E, fruit: 0x4E8030, pine: 0x2A4A2C }[A2[1]] || 0x4A7A2E);
im.setColorAt(i, cc);
});
im.instanceMatrix.needsUpdate = true;
im.instanceColor.needsUpdate = true;
im.userData.keep = 1;
T.add(im);
}
var me = SW_HOUSE_AT.maps;
if (me) {
var mp = at(me.x, me.z);
var pin = swS(0.03, 0, mp.x + 0.1, mp.y + 0.25, mp.z, T, 10);
pin.material = swGlowM(0xD84A3A);
swC(0.004, 0.004, 0.22, null, 0xB8B8C0, mp.x + 0.1, mp.y + 0.13, mp.z, T, 4);
}
var pl = swAdd(new THREE.PlaneGeometry(0.9, 0.14), new THREE.MeshLambertMaterial({ map: wTex(256, 40, function (x, W2, H2) { x.fillStyle = "#C8A048"; x.fillRect(0, 0, W2, H2); x.fillStyle = "#3A2A10"; x.font = "bold 20px Georgia"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("STILLWATER · the living model", W2 / 2, H2 / 2 + 1); }) }), 0, top + 0.04, (D + 0.5) / 2 + 0.055, T);
pl.userData.keep = 1;
return T;
},
function (ic) { if (SW_ICONS[ic])
return SW_ICONS[ic]; return (SW_ICONS[ic] = wTex(64, 64, function (c, W, H) { c.fillStyle = "rgba(255,252,242,.95)"; c.beginPath(); c.arc(32, 32, 30, 0, 7); c.fill(); c.strokeStyle = "#5A4A32"; c.lineWidth = 3; c.stroke(); c.font = "36px system-ui,'Segoe UI Emoji','Noto Color Emoji'"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(ic, 32, 35); })); },
function () {
return wTex(1024, 684, function (c, W, H) {
var g = c.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W * 0.7);
g.addColorStop(0, "#EEE0BC");
g.addColorStop(1, "#C8B080");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
var x = (i * 157) % W, y = (i * 91) % H, r = 20 + (i * 13) % 60, s = c.createRadialGradient(x, y, 0, x, y, r);
s.addColorStop(0, "rgba(150,110,60,.12)");
s.addColorStop(1, "rgba(150,110,60,0)");
c.fillStyle = s;
c.fillRect(x - r, y - r, r * 2, r * 2);
}
c.strokeStyle = "#5A3E22";
c.lineWidth = 6;
c.strokeRect(14, 14, W - 28, H - 28);
c.lineWidth = 2;
c.strokeRect(26, 26, W - 52, H - 52);
function P(x, z) { return [W / 2 + x * 1.45, H * 0.58 + z * 1.45]; }
var L = SW_LAKE, lp = P(L.x, L.z);
c.fillStyle = "#B8C8C0";
c.beginPath();
c.ellipse(lp[0], lp[1], L.rx * 1.45, L.rz * 1.45, 0, 0, 7);
c.fill();
c.strokeStyle = "#4A5A5A";
c.lineWidth = 2.5;
c.stroke();
c.save();
c.beginPath();
c.ellipse(lp[0], lp[1], L.rx * 1.45 - 4, L.rz * 1.45 - 4, 0, 0, 7);
c.clip();
c.strokeStyle = "rgba(60,80,90,.35)";
c.lineWidth = 1;
for (var y = lp[1] - L.rz * 1.5; y < lp[1] + L.rz * 1.5; y += 7) {
c.beginPath();
c.moveTo(lp[0] - L.rx * 1.5, y);
c.lineTo(lp[0] + L.rx * 1.5, y);
c.stroke();
}
c.restore();
c.strokeStyle = "#4A5A5A";
c.lineWidth = 5;
c.beginPath();
SW_STREAM.forEach(function (q, i) { var p = P(q[0], q[1]); if (i)
c.lineTo(p[0], p[1]);
else
c.moveTo(p[0], p[1]); });
c.stroke();
c.strokeStyle = "#6A4A2A";
c.lineWidth = 2;
c.setLineDash([6, 5]);
swPaths().forEach(function (Q) { c.beginPath(); Q.forEach(function (q, i) { var p = P(q[0], q[1]); if (i)
c.lineTo(p[0], p[1]);
else
c.moveTo(p[0], p[1]); }); c.stroke(); });
c.setLineDash([]);
var TL = SW.treeList;
if (TL)
Object.keys(TL).forEach(function (k) { TL[k].forEach(function (t, i) { if (i % 2)
return; var p = P(t.x, t.z); if (p[0] < 40 || p[0] > W - 40 || p[1] < 40 || p[1] > H - 40)
return; c.strokeStyle = "rgba(70,80,40,.7)"; c.lineWidth = 1.2; c.beginPath(); c.arc(p[0], p[1], k === "pine" ? 2.5 : 4, 0, 7); c.stroke(); }); });
var hp = P(SW_AT.hill.x, SW_AT.hill.z);
c.strokeStyle = "rgba(90,60,30,.6)";
for (var a = 0; a < 40; a++) {
var an = a / 40 * 6.283;
c.beginPath();
c.moveTo(hp[0] + Math.cos(an) * 30, hp[1] + Math.sin(an) * 22);
c.lineTo(hp[0] + Math.cos(an) * 60, hp[1] + Math.sin(an) * 44);
c.stroke();
}
c.textAlign = "center";
c.textBaseline = "top";
SW_HOUSES.forEach(function (Hd) {
var A = SW_HOUSE_AT[Hd[0]], p = P(A.x, A.z);
c.fillStyle = "#E8D4A8";
c.strokeStyle = "#3A2A18";
c.lineWidth = 1.6;
c.fillRect(p[0] - 7, p[1] - 4, 14, 9);
c.strokeRect(p[0] - 7, p[1] - 4, 14, 9);
c.beginPath();
c.moveTo(p[0] - 9, p[1] - 4);
c.lineTo(p[0], p[1] - 11);
c.lineTo(p[0] + 9, p[1] - 4);
c.closePath();
c.fillStyle = "#9A5A3A";
c.fill();
c.stroke();
c.fillStyle = "#3A2A18";
c.font = "italic 11px Georgia";
var nm = Hd[1].replace(/^The /, "");
c.fillText(nm.length > 20 ? nm.slice(0, 19) + "…" : nm, p[0], p[1] + 7);
});
var gp = P(SW_GREEN.x, SW_GREEN.z);
c.strokeStyle = "#3A5A2A";
c.lineWidth = 2;
c.beginPath();
c.arc(gp[0], gp[1], SW_GREEN.r * 1.45, 0, 7);
c.stroke();
c.font = "italic 13px Georgia";
c.fillStyle = "#3A5A2A";
c.fillText("the Green", gp[0], gp[1] - 6);
c.font = "italic bold 18px Georgia";
c.fillStyle = "#2A4048";
c.fillText("Still Water", lp[0], lp[1] - 10);
var cx = W - 120, cy = 110;
c.strokeStyle = "#3A2A18";
c.fillStyle = "#3A2A18";
c.lineWidth = 1.5;
c.beginPath();
c.arc(cx, cy, 52, 0, 7);
c.stroke();
c.beginPath();
c.arc(cx, cy, 44, 0, 7);
c.stroke();
for (var k = 0; k < 8; k++) {
var an2 = k / 8 * 6.283 - Math.PI / 2, rr = k % 2 ? 32 : 62;
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(an2 + 0.18) * 12, cy + Math.sin(an2 + 0.18) * 12);
c.lineTo(cx + Math.cos(an2) * rr, cy + Math.sin(an2) * rr);
c.closePath();
if (k % 2)
c.stroke();
else
c.fill();
}
c.font = "bold 16px Georgia";
c.textBaseline = "middle";
c.fillText("N", cx, cy - 74);
c.fillStyle = "#EEE0BC";
c.fillRect(46, 40, 330, 74);
c.strokeRect(46, 40, 330, 74);
c.fillStyle = "#3A2A18";
c.font = "bold 34px Georgia";
c.fillText("STILLWATER", 211, 68);
c.font = "italic 14px Georgia";
c.fillText("the village, the lake and the hill · drawn by Isla Moore", 211, 98);
});
},
function () {
return wTex(768, 460, function (c, W, H) {
c.fillStyle = "#B8885A";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
c.fillStyle = "rgba(" + (i % 2 ? 90 : 200) + ",60,30,.12)";
c.fillRect((i * 37) % W, (i * 53) % H, 2, 2);
}
c.fillStyle = "#F8F2E2";
c.fillRect(W / 2 - 160, 10, 320, 40);
c.fillStyle = "#2E3A2E";
c.font = "bold 26px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("Where shall I go?", W / 2, 31);
var n = SW_HOUSES.length, cols = 8;
SW_HOUSES.forEach(function (Hd, i) {
var x = 24 + (i % cols) * 92, y = 64 + Math.floor(i / cols) * 96;
c.save();
c.translate(x + 40, y + 40);
c.rotate(((i * 7) % 5 - 2) * 0.03);
c.fillStyle = "#FFFDF6";
c.fillRect(-40, -40, 80, 86);
c.font = "40px system-ui,'Segoe UI Emoji','Noto Color Emoji'";
c.fillText(Hd[2], 0, -8);
c.fillStyle = "#2E3A2E";
c.font = "11px system-ui";
var nm = Hd[1].replace(/^The /, "");
c.fillText(nm.length > 14 ? nm.slice(0, 13) + "…" : nm, 0, 30);
c.fillStyle = "#C83A2A";
c.beginPath();
c.arc(0, -36, 4, 0, 7);
c.fill();
c.restore();
});
});
},
function () {
return wTex(512, 384, function (c, W, H) {
c.fillStyle = "#1A2240";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 400; i++) {
c.fillStyle = "rgba(255,255,240," + (0.3 + ((i * 37) % 70) / 100) + ")";
c.fillRect((i * 131) % W, (i * 71) % H, 1 + (i % 7 === 0), 1 + (i % 7 === 0));
}
c.strokeStyle = "rgba(232,208,140,.7)";
c.fillStyle = "#FFF4D0";
c.lineWidth = 1.4;
c.font = "italic 14px Georgia";
SW_CONST.forEach(function (K) { c.beginPath(); K[1].forEach(function (p, i) { if (i)
c.lineTo(p[0] * W, p[1] * H);
else
c.moveTo(p[0] * W, p[1] * H); }); c.stroke(); K[1].forEach(function (p) { c.beginPath(); c.arc(p[0] * W, p[1] * H, 3, 0, 7); c.fill(); }); c.fillText(K[0], K[1][0][0] * W, K[1][0][1] * H - 10); });
c.strokeStyle = "#C8A048";
c.lineWidth = 4;
c.strokeRect(6, 6, W - 12, H - 12);
c.fillStyle = "#E8D090";
c.font = "bold 18px Georgia";
c.textAlign = "center";
c.fillText("The Sky over Stillwater", W / 2, 26);
});
},
function () {
return wTex(512, 256, function (c, W, H) {
c.fillStyle = "#1E2A52";
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(200,170,90,.5)";
c.lineWidth = 1;
for (var i = 1; i < 6; i++) {
c.beginPath();
c.moveTo(0, i * H / 6);
c.lineTo(W, i * H / 6);
c.stroke();
}
for (var j = 0; j < 12; j++) {
c.beginPath();
c.moveTo(j * W / 12, 0);
c.lineTo(j * W / 12, H);
c.stroke();
}
c.fillStyle = "#F4DC8A";
for (var k = 0; k < 260; k++) {
c.beginPath();
c.arc((k * 97) % W, (k * 53) % H, (k % 9 === 0) ? 2.2 : 1, 0, 7);
c.fill();
}
c.strokeStyle = "rgba(244,220,138,.7)";
SW_CONST.forEach(function (K, i) { c.beginPath(); K[1].forEach(function (p, q) { var x = p[0] * W * 0.5 + (i % 2) * W * 0.5, y = p[1] * H; if (q)
c.lineTo(x, y);
else
c.moveTo(x, y); }); c.stroke(); });
});
},
function () {
return wTex(512, 512, function (c, W, H) {
var cx = W / 2, cy = H / 2;
c.clearRect(0, 0, W, H);
c.fillStyle = "#C8A06A";
c.beginPath();
c.arc(cx, cy, 250, 0, 7);
c.fill();
c.strokeStyle = "#C8A048";
c.lineWidth = 8;
c.stroke();
c.lineWidth = 3;
c.beginPath();
c.arc(cx, cy, 222, 0, 7);
c.stroke();
for (var k = 0; k < 16; k++) {
var a = k / 16 * 6.283 - Math.PI / 2, r = k % 4 === 0 ? 215 : k % 2 === 0 ? 160 : 110, wd = k % 4 === 0 ? 26 : 16;
c.fillStyle = k % 2 ? "#7A4A2A" : "#4A2E1A";
c.beginPath();
c.moveTo(cx + Math.cos(a + Math.PI / 2) * wd, cy + Math.sin(a + Math.PI / 2) * wd);
c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
c.lineTo(cx + Math.cos(a - Math.PI / 2) * wd, cy + Math.sin(a - Math.PI / 2) * wd);
c.closePath();
c.fill();
c.fillStyle = k % 2 ? "#E8C890" : "#D8B070";
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
c.lineTo(cx + Math.cos(a - Math.PI / 2) * wd, cy + Math.sin(a - Math.PI / 2) * wd);
c.closePath();
c.fill();
}
c.fillStyle = "#C8A048";
c.beginPath();
c.arc(cx, cy, 18, 0, 7);
c.fill();
c.fillStyle = "#3A2A18";
c.font = "bold 30px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("N", cx, cy - 236 + 0);
c.fillText("S", cx, cy + 236);
c.fillText("E", cx + 236, cy);
c.fillText("W", cx - 236, cy);
});
},
function () {
var maps = [["village", "🗺️ The picture map", "Every place in Stillwater, with its picture. The red dot is you.", function () { return swMapTex().image; }],
["old", "📜 The old map", "Isla's hand-drawn map, in ink: the paths, the trees, the lake and every building by name.", function () { return swOldMapTex().image; }],
["stars", "✨ The sky over Stillwater", "The stars you can see from Star Hill on a clear night, and the shapes they make.", function () { return swStarChartTex().image; }],
["world", "🌍 The whole world", "The land and the seas of the whole Earth, as the great globe shows them, laid out flat.", function () { var im = new Image(); im.src = "assets/stillwater/world.jpg"; return im; }]];
var h = "<div class='sw-tip'>Pick a map to look at it. Press ✕ or Escape when you're done.</div><div class='sw-grid'>";
maps.forEach(function (M) { h += "<div class='sw-tile' data-sw='m_" + M[0] + "'><div style='font-size:40px;line-height:110px;height:110px;background:#EFE6CE;border-radius:8px'>" + M[1].split(" ")[0] + "</div><b>" + esc(M[1].slice(M[1].indexOf(" ") + 1)) + "</b><small>" + esc(M[2]) + "</small></div>"; });
h += "</div><div id='sw-mapview' style='margin-top:12px;text-align:center'></div>";
var b = swPanel("🗂️ The map drawers", h, null), fns = {};
maps.forEach(function (M) {
fns["m_" + M[0]] = function () {
var v = b.querySelector("#sw-mapview");
if (!v)
return;
v.innerHTML = "";
var src = M[3]();
var img;
if (src && src.toDataURL) {
img = new Image();
img.src = src.toDataURL("image/jpeg", 0.86);
}
else
img = src;
img.style.cssText = "max-width:100%;max-height:62vh;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.25)";
var cap = document.createElement("div");
cap.className = "sw-h";
cap.textContent = M[1];
v.appendChild(cap);
v.appendChild(img);
if (M[0] === "village" || M[0] === "old") {
var go = document.createElement("div");
go.innerHTML = swBtn("go", "🚶 Choose a place and go there", "");
v.appendChild(go);
swBind(go, { go: function () { swPanelClose(); swMapCard(); } });
}
swSay(M[1] + ". " + M[2]);
try {
v.scrollIntoView({ behavior: "smooth" });
}
catch (e) { }
};
});
swBind(b, fns);
},
function (R, g, o) {
var w = R.w, d = R.d, h = R.h || 3;
swFireplace(g, -1.6, -d / 2 + 0.35, 0);
R.solid(-1.6, -d / 2 + 0.35, 2.1, 0.7, 1.6);
var mt = swG(-1.6, 1.42, -d / 2 + 0.4, g);
swClock(mt, 0, 0, 0).scale.setScalar(0.22);
swVase(mt, -0.7, 0, 0.05, 0xE8E0D0);
swC(0.04, 0.05, 0.18, null, 0xC8A048, 0.7, 0.09, 0, mt, 10);
swPainting(g, -1.6, 2.3, -d / 2 + 0.04, 0, SW_ART_HANG[(R.i * 5) % SW_ART_HANG.length], 0.6);
swRug(g, -1.6, -0.9, 3.2, 2.4, o.rug[0], o.rug[1]);
swArmchair(g, -3.2, -1.5, 1.0, swMix(o.sofa, 0x000000, 0.15));
swArmchair(g, 0.0, -1.5, -1.0, swMix(o.sofa, 0xFFFFFF, 0.15));
swSofa(g, -1.6, 0.6, Math.PI, o.sofa, 2.0);
swCushion(g, -2.2, 0.82, 0.55, Math.PI, 0xE8D8B8);
swCushion(g, -1.0, 0.82, 0.55, Math.PI, 0xC8A86A);
swTable(g, -1.6, -0.7, 0.9, 0.5, 0x5A3820, { h: 0.42 });
swBookPile(g, -1.4, 0.46, -0.7, 2);
var cup = swC(0.04, 0.03, 0.07, null, 0xF4F0E8, -1.85, 0.5, -0.7, g, 10);
R.solid(-3.2, -1.5, 0.9, 0.9, 1);
R.solid(0, -1.5, 0.9, 0.9, 1);
R.solid(-1.6, 0.6, 2.1, 0.9, 1);
R.spot(-1.6, -0.1, 1.8, "The fire", "sit by the fire a while", function () { setStatus("🔥 You sit by the fire. It crackles very softly. The room is warm and smells of wood smoke and tea."); swSay("You sit by the fire. It is warm here."); }, "🔥");
var kx = w / 2 - 0.55;
var rg = swG(kx, 0, -d / 2 + 1.1, g, -Math.PI / 2);
swB(1.2, 0.85, 0.7, null, 0x2A2A30, 0, 0.42, 0, rg);
swB(1.3, 0.06, 0.76, null, 0x3A3A40, 0, 0.87, 0, rg);
swB(0.5, 0.4, 0.02, null, 0xB8B8C0, -0.25, 0.45, 0.36, rg);
swB(0.5, 0.4, 0.02, null, 0xB8B8C0, 0.3, 0.45, 0.36, rg);
var kt = swG(-0.25, 0.9, 0, rg);
swC(0.1, 0.13, 0.16, "metal", 0xC8C8D0, 0, 0.08, 0, kt, 16);
swS(0.03, 0x2A2A2A, 0, 0.18, 0, kt, 8);
var sp = swC(0.015, 0.025, 0.14, "metal", 0xC8C8D0, 0.12, 0.08, 0, kt, 6);
sp.rotation.z = -0.9;
swC(0.1, 0.1, 0.9, null, 0x2A2A30, 0, 1.3, -0.2, rg, 10);
R.solid(kx, -d / 2 + 1.1, 0.8, 1.3, 1.2);
R.spot(kx - 1.0, -d / 2 + 1.1, 1.6, "The kettle", "make a cup of tea", function () { setStatus("🫖 The kettle hums, then sings very gently. You make a cup of tea just how you like it, and hold it in both hands. It's warm."); swSay("You make a cup of tea, just how you like it."); swKeep("tea", "A cup of tea at " + swHouseDef(R.k)[1], "🫖"); }, "🫖");
var sk = swG(kx, 0, 0.3, g, -Math.PI / 2);
swRB(1.6, 0.85, 0.62, "oak", 0x7A5A3A, 0, 0.42, 0, sk);
swRB(1.7, 0.05, 0.66, "marble", 0xE8E4DC, 0, 0.87, 0, sk);
swB(0.6, 0.24, 0.44, null, 0xF4F2EC, 0, 0.78, 0, sk);
swC(0.015, 0.015, 0.25, "metal", 0xC8C8D0, 0, 1.0, -0.25, sk, 6);
R.solid(kx, 0.3, 0.7, 1.7, 1.2);
var sh = swG(w / 2 - 0.06, 1.8, 0.3, g, -Math.PI / 2);
swRB(1.7, 0.04, 0.24, "oak", 0x6A4428, 0, 0, 0.12, sh);
for (var j = 0; j < 7; j++) {
var jr = swC(0.05, 0.05, 0.14, null, 0, -0.7 + j * 0.23, 0.09, 0.12, sh, 12);
jr.material = swSee([0xE8C060, 0xC84A3A, 0x8A4AA8, 0xF0E0B0][j % 4], 0.75);
swC(0.052, 0.052, 0.03, null, 0xC8A048, -0.7 + j * 0.23, 0.17, 0.12, sh, 12);
}
for (var pn = 0; pn < 4; pn++) {
var pan = swG(-0.6 + pn * 0.4, 0.45, 0.08, sh);
swC(0.1 + pn * 0.015, 0.1 + pn * 0.015, 0.05, "metal", 0xB8683A, 0, 0, 0, pan, 16).rotation.x = Math.PI / 2;
}
var dr = swG(-w / 2 + 0.3, 0, 0.4, g, Math.PI / 2);
swRB(1.7, 0.9, 0.5, "oak", 0x6A4428, 0, 0.45, 0, dr);
swRB(1.7, 1.1, 0.06, "oak", 0x5A3820, 0, 1.45, -0.22, dr);
for (var sl = 0; sl < 2; sl++)
swRB(1.7, 0.04, 0.24, "oak", 0x5A3820, 0, 1.2 + sl * 0.42, -0.1, dr);
for (var pl = 0; pl < 10; pl++) {
var plate = swC(0.12, 0.12, 0.015, null, pl % 2 ? 0xF4F0E8 : 0x4A6AA8, -0.68 + (pl % 5) * 0.34, 1.33 + Math.floor(pl / 5) * 0.42, -0.15, dr, 18);
plate.rotation.x = 1.35;
}
R.solid(-w / 2 + 0.3, 0.4, 0.6, 1.8, 2);
var tx = 1.9, tz = 1.2;
swTable(g, tx, tz, 1.4, 0.9, 0x7A5A3A, { cloth: 0xF2ECE0 });
swChair(g, tx - 0.95, tz, Math.PI / 2, 0x6A4428);
swChair(g, tx + 0.95, tz, -Math.PI / 2, 0x6A4428);
var tp = swG(tx, 0.84, tz, g);
swS(0.09, 0xF4F0E8, 0, 0.08, 0, tp, 14);
swC(0.012, 0.02, 0.1, null, 0xF4F0E8, 0.1, 0.1, 0, tp, 6).rotation.z = -0.9;
swC(0.035, 0.035, 0.02, null, 0xF4F0E8, 0, 0.17, 0, tp, 10);
[-0.4, 0.4].forEach(function (x) { swC(0.04, 0.03, 0.06, null, 0xF4F0E8, x, 0.03, 0.15, tp, 10); swC(0.07, 0.07, 0.01, null, 0xF4F0E8, x, 0.0, 0.15, tp, 14); });
swVase(tp, 0.25, 0, -0.25, 0x8AA8C8);
var cake = swC(0.13, 0.13, 0.08, null, 0xE8D0A0, -0.25, 0.04, -0.2, tp, 16);
R.solid(tx, tz, 1.5, 1.0, 1);
try {
swBeast("cat", R.x - 2.6, -0.2, 0.6, 0.55, R.i + 3, R.D, 0.02);
}
catch (e) { }
swClock(g, -w / 2 + 0.35, -d / 2 + 0.45, Math.PI / 2);
R.solid(-w / 2 + 0.35, -d / 2 + 0.45, 0.5, 0.5, 2.2);
var fl = swG(0.9, 0, -d / 2 + 0.5, g);
swC(0.12, 0.16, 0.04, null, 0x3A3A3A, 0, 0.02, 0, fl, 12);
swC(0.015, 0.015, 1.4, null, 0x3A3A3A, 0, 0.72, 0, fl, 6);
var fs = swAdd(new THREE.CylinderGeometry(0.16, 0.24, 0.26, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0xF0E4C8, side: THREE.DoubleSide, emissive: new THREE.Color(0x7A5A2A) }), 0, 1.5, 0, fl);
fs.userData.keep = 1;
if (o.extra === "clocks") {
swRB(2.2, 0.05, 0.28, "oak", 0x5A3820, 2.4, 1.5, -d / 2 + 0.16, g);
for (var c = 0; c < 5; c++) {
var ck = swClock(g, 1.5 + c * 0.45, -d / 2 + 0.18, 0);
ck.position.y = 1.525;
ck.scale.setScalar(0.18 + 0.04 * (c % 2));
}
}
if (o.extra === "toys") {
var tb = swG(-w / 2 + 1.4, 0, d / 2 - 1.0, g);
swRB(0.7, 0.4, 0.45, "oak", 0xC8503A, 0, 0.2, 0, tb);
for (var tq = 0; tq < 8; tq++)
swB(0.12, 0.12, 0.12, null, [0xE8C040, 0x3A8AC8, 0xC83A3A, 0x4AA84A][tq % 4], -0.3 + (tq % 4) * 0.2, 0.06, 0.4 + Math.floor(tq / 4) * 0.16, tb);
var ted = swS(0.12, 0xB8804A, -0.15, 0.5, 0, tb, 10);
swS(0.08, 0xB8804A, -0.15, 0.66, 0, tb, 10);
R.solid(-w / 2 + 1.4, d / 2 - 1.0, 0.8, 0.5, 0.6);
}
if (o.extra === "seeds") {
(R.wins || []).forEach(function (Wn) { var sg = swG(Wn.x, Wn.y - Wn.h / 2 - 0.02, Wn.z, g, Wn.ry); for (var q = 0; q < 3; q++) {
swB(0.28, 0.06, 0.16, null, 0x4A3A2A, -0.32 + q * 0.32, 0.03, 0.2, sg);
for (var sp2 = 0; sp2 < 6; sp2++)
swC(0.004, 0.004, 0.06, null, 0x5AA84A, -0.42 + q * 0.32 + (sp2 % 3) * 0.08, 0.09, 0.15 + (sp2 > 2 ? 0.08 : 0), sg, 4);
} });
}
if (o.extra === "roses") {
swVase(g, tx, 0.84, tz + 0.25, 0xE8E0F0);
}
if (o.extra === "sea") {
var sb = swG(-1.6, 1.42, -d / 2 + 0.4, g);
var bot = swC(0.06, 0.06, 0.3, null, 0, 0.45, 0.08, 0, sb, 14);
bot.rotation.z = Math.PI / 2;
bot.material = swSee(0xC8E8D8, 0.35);
var mini = swS(0.04, 0x5A3820, 0.45, 0.08, 0, sb, 8);
mini.scale.set(2.5, 0.6, 1);
var rope = swAdd(new THREE.TorusGeometry(0.3, 0.04, 8, 24), swMat(null, 0xC8A870), w / 2 - 0.1, 1.4, 1.9, g);
rope.rotation.y = Math.PI / 2;
for (var lr = 0; lr < 3; lr++) {
var lb = swAdd(new THREE.TorusGeometry(0.22, 0.035, 6, 20), swMat(null, 0xB8986A), -w / 2 + 0.1, 1.2 + lr * 0.08, -1.4 + lr * 0.1, g);
lb.rotation.y = Math.PI / 2;
}
}
},
function (kind) {
var parts = [];
function add(g, col) { parts.push([g, col]); }
if (kind === "hollyhock" || kind === "foxglove") {
var st = new THREE.CylinderGeometry(0.012, 0.016, 1.6, 4, 1, true);
st.translate(0, 0.8, 0);
add(st, 0x4A6A2E);
for (var l = 0; l < 5; l++) {
var lf = new THREE.SphereGeometry(0.09, 6, 4);
lf.scale(1.4, 0.35, 1);
lf.translate(Math.cos(l * 2.3) * 0.07, 0.15 + l * 0.1, Math.sin(l * 2.3) * 0.07);
add(lf, 0x4E7A34);
}
for (var b = 0; b < 9; b++) {
var r = kind === "hollyhock" ? 0.06 - b * 0.004 : 0.035, bl = kind === "hollyhock" ? new THREE.CylinderGeometry(r, r * 0.4, 0.05, 8) : new THREE.ConeGeometry(0.035, 0.09, 6, 1, true);
bl.rotateX(kind === "hollyhock" ? Math.PI / 2 : Math.PI);
bl.translate(Math.cos(b * 2.4) * 0.05, 0.75 + b * 0.09, Math.sin(b * 2.4) * 0.05);
add(bl, 0xFFFFFF);
}
}
else if (kind === "lavender") {
for (var s = 0; s < 14; s++) {
var a = s / 14 * 6.283, lean = 0.25, sp = new THREE.CylinderGeometry(0.006, 0.008, 0.5, 3, 1, true);
sp.translate(0, 0.25, 0);
sp.rotateZ(Math.cos(a) * lean);
sp.rotateX(Math.sin(a) * lean);
add(sp, 0x6A8A5A);
var hd = new THREE.CylinderGeometry(0.02, 0.012, 0.14, 5);
hd.translate(0, 0.5, 0);
hd.rotateZ(Math.cos(a) * lean);
hd.rotateX(Math.sin(a) * lean);
add(hd, 0xFFFFFF);
}
var mound = new THREE.SphereGeometry(0.28, 8, 5);
mound.scale(1, 0.45, 1);
mound.translate(0, 0.1, 0);
add(mound, 0x7A9A6A);
}
else if (kind === "rose") {
var bush = new THREE.IcosahedronGeometry(0.4, 1);
bush.scale(1, 0.8, 1);
bush.translate(0, 0.36, 0);
add(bush, 0x3A6A2A);
for (var q = 0; q < 11; q++) {
var a2 = q * 2.4, el = 0.2 + (q % 4) * 0.25, rs = new THREE.SphereGeometry(0.06, 7, 5);
rs.translate(Math.cos(a2) * 0.38 * Math.cos(el), 0.36 + Math.sin(el) * 0.3, Math.sin(a2) * 0.38 * Math.cos(el));
add(rs, 0xFFFFFF);
}
}
else {
var md = new THREE.SphereGeometry(0.22, 8, 5);
md.scale(1, 0.4, 1);
md.translate(0, 0.07, 0);
add(md, 0x4E7E36);
for (var dd = 0; dd < 12; dd++) {
var a3 = dd * 2.4, rr = 0.06 + (dd % 4) * 0.045, fl = new THREE.CircleGeometry(0.035, 7);
fl.rotateX(-Math.PI / 2);
fl.translate(Math.cos(a3) * rr, 0.15 + (dd % 3) * 0.015, Math.sin(a3) * rr);
add(fl, 0xFFFFFF);
}
}
var pos = [], nor = [], col = [], c = new THREE.Color();
parts.forEach(function (P) {
var g = P[0].index ? P[0].toNonIndexed() : P[0];
g.computeVertexNormals();
var a = g.attributes.position.array, n = g.attributes.normal.array;
c.setHex(P[1]);
for (var i = 0; i < a.length; i++) {
pos.push(a[i]);
nor.push(n[i]);
}
for (var j = 0; j < a.length / 3; j++)
col.push(c.r, c.g, c.b);
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
return G;
},
function (G, list) {
var by = {};
list.forEach(function (f) { (by[f[0]] = by[f[0]] || []).push(f); });
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
Object.keys(by).forEach(function (k) {
var L = by[k], geo = swBloomGeo(k), mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), im = new THREE.InstancedMesh(geo, mat, L.length);
im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(L.length * 3), 3);
L.forEach(function (f, i) { e.set(0, (f[1] * 7.1 + f[2] * 3.3) % 6.283, 0); q.setFromEuler(e); var sc = f[4] || 1; v.set(f[1], swLand(f[1], f[2]) - 0.02, f[2]); s.set(sc, sc * (0.85 + ((i * 37) % 30) / 100), sc); m4.compose(v, q, s); im.setMatrixAt(i, m4); c.setHex(f[3]); im.setColorAt(i, c); });
im.instanceMatrix.needsUpdate = true;
im.instanceColor.needsUpdate = true;
im.frustumCulled = false;
im.userData.noSit = 1;
G.add(im);
});
},
function (G, k, beds, o) {
var A = SW_HOUSE_AT[k], H = swHouseDef(k);
if (!A || !H)
return;
var w = A.w, d = A.d, gd = o.depth || 5, gw = w + 2, y0 = swLand(A.x, A.z), g = swG(A.x, y0, A.z, G, A.ry), front = d / 2 + gd, R = wRand(k.length * 97 + (A.x | 0));
var hedge = o.hedge, fc = 0xF4F2EA;
function run(x0, z0, x1, z1) {
var L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / 0.32)), ang = Math.atan2(x1 - x0, z1 - z0);
if (hedge) {
var hb = swB(L * 0.98, 0.7, 0.45, null, 0x3E6A2E, (x0 + x1) / 2, 0.42, (z0 + z1) / 2, g, ang - Math.PI / 2);
hb.material = SWV.hedgeM;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n;
swLeafBall(g, x0 + (x1 - x0) * t, 0.6 + (i % 2) * 0.12, z0 + (z1 - z0) * t, 0.46, i % 3 ? 0x467A34 : 0x3E7030);
}
}
else {
for (var j = 0; j <= n; j++) {
var t2 = j / n;
var p = swB(0.07, 0.9, 0.03, null, fc, x0 + (x1 - x0) * t2, 0.45, z0 + (z1 - z0) * t2, g, ang);
swK(0.05, 0.08, null, fc, x0 + (x1 - x0) * t2, 0.94, z0 + (z1 - z0) * t2, g, 4);
}
[0.28, 0.7].forEach(function (yy) { swB(L, 0.06, 0.025, null, fc, (x0 + x1) / 2, yy, (z0 + z1) / 2, g, ang - Math.PI / 2); });
}
var a = swTo(g, (x0 + x1) / 2, (z0 + z1) / 2);
swSolid(a.x, a.z, L + 0.1, 0.4, -5, 1.1, swRotOf(g) + ang - Math.PI / 2);
}
var gap = 1.3;
run(-gw / 2, front, -gap, front);
run(gap, front, gw / 2, front);
run(-gw / 2, d / 2 + 0.2, -gw / 2, front);
run(gw / 2, d / 2 + 0.2, gw / 2, front);
[-gap, gap].forEach(function (x) { swB(0.14, 1.15, 0.14, "wood", hedge ? 0x6A4A32 : fc, x, 0.57, front, g); swS(0.08, hedge ? 0x6A4A32 : fc, x, 1.2, front, g, 8); });
var gt = swG(-gap, 0, front, g, -1.2);
for (var gb = 0; gb < 6; gb++)
swB(0.06, 0.85, 0.025, null, hedge ? 0x8A6A4A : fc, 0.15 + gb * 0.28, 0.45, 0, gt);
swB(1.7, 0.07, 0.03, null, hedge ? 0x8A6A4A : fc, 0.85, 0.3, 0, gt);
swB(1.7, 0.07, 0.03, null, hedge ? 0x8A6A4A : fc, 0.85, 0.72, 0, gt);
for (var st = d / 2 + 1.2; st < front; st += 0.62) {
var fl = swB(0.95 + R() * 0.25, 0.05, 0.5, "stone", 0xB8B0A0, (R() - 0.5) * 0.12, 0.03, st, g);
fl.rotation.y = (R() - 0.5) * 0.15;
}
var kinds = o.kinds || ["hollyhock", "foxglove", "lavender", "daisy"];
[-1, 1].forEach(function (s) {
for (var x = 1.4; x < gw / 2 - 0.4; x += 0.55)
for (var z = d / 2 + 0.7; z < front - 0.4; z += 0.6) {
if (R() < 0.18)
continue;
var t = (z - (d / 2 + 0.7)) / (front - d / 2 - 1.1), kind = t < 0.3 ? kinds[0] : t < 0.55 ? kinds[1] : t < 0.8 ? kinds[2] : kinds[3];
var p = swTo(g, s * x + (R() - 0.5) * 0.25, z + (R() - 0.5) * 0.25);
beds.push([kind, p.x, p.z, swFcol(kind, (R() * 9) | 0), 0.85 + R() * 0.4]);
}
var rc = swTo(g, s * (gw / 2 - 0.6), front - 0.6);
beds.push(["rose", rc.x, rc.z, swFcol("rose", (R() * 4) | 0), 1.1]);
});
for (var x2 = -w / 2 + 0.4; x2 < w / 2 - 0.3; x2 += 0.5) {
if (Math.abs(x2) < 1.1)
continue;
var pp = swTo(g, x2, d / 2 + 0.45);
beds.push([R() < 0.5 ? "lavender" : "daisy", pp.x, pp.z, swFcol(R() < 0.5 ? "lavender" : "daisy", (R() * 4) | 0), 0.75]);
}
if (o.bath !== false) {
var bx = (R() < 0.5 ? -1 : 1) * (gw / 2 - 1.6), bz = front - 1.4, bb = swG(bx, 0, bz, g);
swC(0.12, 0.18, 0.7, "stone", 0xB8B0A0, 0, 0.35, 0, bb, 10);
swC(0.36, 0.26, 0.12, "stone", 0xB8B0A0, 0, 0.76, 0, bb, 16);
var wt = swC(0.3, 0.3, 0.02, null, 0x8AB0C0, 0, 0.82, 0, bb, 16);
wt.material = swShiny(0x8AB0C0, 120);
var bp = swTo(g, bx, bz);
swRound(bp.x, bp.z, 0.35, -5, 1.2);
}
},
function (G) {
var x = SW_GREEN.x - 15, z = SW_GREEN.z - 11, y = swLand(x, z), g = swG(x, y, z, G, 0.4), r = 3.4, white = 0xF4F2EA;
swC(r + 0.3, r + 0.4, 0.5, "stone", 0xB8B0A0, 0, 0.25, 0, g, 8);
swC(r, r, 0.06, "wood", 0x8A6242, 0, 0.53, 0, g, 8);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2 + Math.PI / 8, px = Math.sin(a) * (r - 0.15), pz = Math.cos(a) * (r - 0.15);
swC(0.08, 0.09, 2.8, null, white, px, 1.95, pz, g, 10);
var p = swTo(g, px, pz);
swRound(p.x, p.z, 0.15, -5, 4);
if (i !== 0) {
var a2 = (i + 0.5) / 8 * Math.PI * 2 + Math.PI / 8, a1 = a;
var mx = (Math.sin(a1) + Math.sin(a1 + Math.PI / 4)) / 2 * (r - 0.15), mz = (Math.cos(a1) + Math.cos(a1 + Math.PI / 4)) / 2 * (r - 0.15), L = 2 * (r - 0.15) * Math.sin(Math.PI / 8);
swB(L, 0.06, 0.06, null, white, mx, 1.4, mz, g, a1 + Math.PI / 8);
var rp = swTo(g, mx, mz);
swSolid(rp.x, rp.z, L, 0.25, -5, y + 2, swRotOf(g) + a1 + Math.PI / 8);
for (var b = 0; b < 6; b++) {
var t = (b + 0.5) / 6;
swB(0.04, 0.8, 0.04, null, white, Math.sin(a1) * (r - 0.15) * (1 - t) + Math.sin(a1 + Math.PI / 4) * (r - 0.15) * t, 0.95, Math.cos(a1) * (r - 0.15) * (1 - t) + Math.cos(a1 + Math.PI / 4) * (r - 0.15) * t, g);
}
}
}
var roof = swAdd(new THREE.ConeGeometry(r + 0.6, 1.8, 8, 1), swMat("shingle", 0x5A7A6A), 0, 4.25, 0, g);
roof.rotation.y = Math.PI / 8;
swS(0.18, 0xD8B060, 0, 5.25, 0, g, 10);
swC(0.03, 0.03, 0.6, null, 0xD8B060, 0, 5.6, 0, g, 6);
for (var j = 0; j < 8; j++) {
var a3 = j / 8 * Math.PI * 2 + Math.PI / 8;
var lp = swLantern(g, Math.sin(a3) * (r - 0.1), 3.15, Math.cos(a3) * (r - 0.1));
}
swFloor(x, z, r * 1.3, r * 1.3, y + 0.56);
var sp = swTo(g, 0, 0);
swSpot(sp.x, sp.z, 3, "The bandstand", "listen to the evening music", function () { setStatus("🎶 You stand in the bandstand. Somewhere, very softly, someone is playing a slow tune on a piano. The lanterns are lit."); try {
swMusicPanel();
}
catch (e) { } }, y + 0.56, "🎶");
},
function (G, beds) {
var S = SW_AT.sgarden, y = swLand(S.x, S.z), g = swG(S.x, y, S.z, G), r = S.r - 1.5;
var n = 40;
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) > Math.PI - 0.16)
continue;
var x = Math.sin(a) * r, z = Math.cos(a) * r, L = 2 * Math.PI * r / n + 0.05;
var wb = swB(L, 1.1, 0.55, "stone", 0xC8B898, x, 0.55, z, g, a);
swB(L + 0.04, 0.12, 0.7, "stone", 0xB8A888, x, 1.16, z, g, a);
swSolid(S.x + x, S.z + z, L + 0.1, 0.6, -5, 1.4, a);
}
[-1, 1].forEach(function (s) { var px = s * 1.3, pz = -r; swB(0.6, 1.6, 0.6, "stone", 0xC8B898, px, 0.8, pz, g); swS(0.26, 0xC8B898, px, 1.85, pz, g, 12); swSolid(S.x + px, S.z + pz, 0.7, 0.7, -5, 2); });
var ar = swG(0, 0, -r, g);
[-1, 1].forEach(function (s) { swB(0.08, 2.6, 0.08, "wood", 0x6A4A32, s * 1.0, 1.3, 0, ar); });
var arc = swAdd(new THREE.TorusGeometry(1.0, 0.05, 6, 20, Math.PI), swMat("wood", 0x6A4A32), 0, 2.6, 0, ar);
for (var ra = 0; ra < 14; ra++) {
var aa = ra / 13 * Math.PI;
swLeafBall(ar, Math.cos(aa) * 1.0, 2.6 + Math.sin(aa) * 1.0, 0, 0.28, 0x3E6E2E);
if (ra % 2)
swS(0.07, [0xE85A7A, 0xF4A8B8][ra % 4 > 1 ? 1 : 0], Math.cos(aa) * 1.0, 2.6 + Math.sin(aa) * 1.0 + 0.15, 0.18, ar, 6);
}
swC(2.4, 2.6, 0.6, "stone", 0xC8B898, 0, 0.3, 0, g, 28);
var pool = swC(2.15, 2.15, 0.04, null, 0x6A9AAA, 0, 0.56, 0, g, 28);
pool.material = swShiny(0x5A8A9A, 140);
swC(0.3, 0.45, 1.0, "stone", 0xC8B898, 0, 0.6, 0, g, 14);
swC(0.9, 0.4, 0.25, "stone", 0xC8B898, 0, 1.2, 0, g, 20);
var bw = swC(0.82, 0.82, 0.03, null, 0x6A9AAA, 0, 1.31, 0, g, 20);
bw.material = swShiny(0x6A9AAA, 140);
var sheet = swAdd(new THREE.CylinderGeometry(0.86, 1.0, 0.66, 24, 1, true), new THREE.MeshPhongMaterial({ color: 0xD8ECF4, transparent: true, opacity: 0.28, shininess: 120, depthWrite: false, side: THREE.DoubleSide }), 0, 0.98, 0, g);
sheet.userData.keep = 1;
SWV.sheet = sheet;
swRound(S.x, S.z, 2.7, -5, 1.2);
swSpot(S.x, S.z + 3.6, 2.2, "The fountain", "sit on the edge and listen", function () { setStatus("⛲ You sit on the edge of the fountain. The water slides over the rim of the bowl so slowly it hardly makes a sound. Put your hand in: it's cool."); swSay("You sit by the fountain. Put your hand in the water: it is cool."); }, y + 0.1, "⛲");
var Q = [["lavender", "The lavender bed", "smell the lavender", "💜", "Run your hand along the lavender and smell your fingers: sweet and clean. The bees are slow and gentle and don't mind you."],
["grass", "The soft grasses", "touch the soft grasses", "🌾", "These grasses are soft as feathers. The grey leaves at the front are lamb's ears: stroke one, it's like velvet."],
["herb", "The herb bed", "smell the herbs", "🌿", "Mint, rosemary, thyme and lemon balm. Pick a leaf, rub it between your fingers and smell: each one is different."],
["bright", "The bright bed", "look at the colours", "🌼", "Sunflowers, marigolds, cornflowers and poppies: all the colours together, standing quite still."]];
Q.forEach(function (q, i) {
var a = Math.PI / 4 + i * Math.PI / 2, cx = Math.sin(a) * 9, cz = -Math.cos(a) * 9, bg = swG(cx, 0, cz, g, -a);
swB(5, 0.55, 2.6, "stone", 0xB8A888, 0, 0.27, 0, bg);
swB(4.7, 0.57, 2.3, null, 0x4A3624, 0, 0.29, 0, bg);
var p = swTo(g, cx, cz);
swSolid(p.x, p.z, 5.1, 2.7, -5, 0.8, swRotOf(bg));
for (var fx = -2; fx <= 2; fx += 0.45)
for (var fz = -0.9; fz <= 0.9; fz += 0.45) {
var wp = swTo(bg, fx, fz), kind = q[0] === "lavender" ? (fx > 1.2 ? "rose" : "lavender") : q[0] === "grass" ? "daisy" : q[0] === "herb" ? "lavender" : (fz < 0 ? "hollyhock" : "daisy");
var col = q[0] === "herb" ? 0x9AB88A : q[0] === "grass" ? 0xD8D0B8 : swFcol(kind, ((fx * 7 + fz * 3) | 0) + 9);
beds.push([kind, wp.x, wp.z, col, q[0] === "bright" ? 0.9 : 0.8]);
}
if (q[0] === "grass")
for (var gt = 0; gt < 12; gt++) {
var tp = swTo(bg, -2 + gt * 0.36, (gt % 2 ? 0.5 : -0.5));
var tf = swAdd(SWV.tall || (SWV.tall = swTuftGeo(true)), SWV.tallM || (SWV.tallM = new THREE.MeshLambertMaterial({ color: 0xE8E0C0, vertexColors: true, side: THREE.DoubleSide })), tp.x - S.x, 0.58, tp.z - S.z, g);
tf.scale.setScalar(1.3);
}
var sp = swTo(g, Math.sin(a) * 6, -Math.cos(a) * 6);
swSpot(sp.x, sp.z, 2.4, q[1], q[2], (function (t) { return function () { setStatus(q[3] + " " + t); swSay(t); }; })(q[4]), y + 0.1, q[3]);
});
var ab = swG(0, 0, r - 2.2, g, Math.PI);
for (var ap = 0; ap < 4; ap++)
swB(0.1, 2.4, 0.1, "wood", 0x6A4A32, (ap % 2 ? 1.3 : -1.3), 1.2, (ap < 2 ? -0.5 : 0.5), ab);
for (var ac = 0; ac < 6; ac++)
swB(0.06, 0.06, 1.3, "wood", 0x6A4A32, -1.3 + ac * 0.52, 2.42, 0, ab);
for (var al = 0; al < 16; al++) {
swLeafBall(ab, -1.4 + (al % 8) * 0.4, 2.55, (al < 8 ? -0.4 : 0.4), 0.32, 0x3E6E2E);
if (al % 2)
swS(0.07, 0xF4A8B8, -1.4 + (al % 8) * 0.4, 2.75, (al < 8 ? -0.3 : 0.3), ab, 6);
}
swBench(ab, 0, -0.1, 0, 2, 0x7A5A3A);
var abp = swTo(g, 0, r - 2.2);
swSolid(abp.x, abp.z, 2.8, 0.6, -5, 1);
swSpot(abp.x, abp.z - 1.4, 2.2, "The rose arbour", "sit in the shade of the roses", function () { setStatus("🌹 You sit in the rose arbour. The roses smell of honey. A bee drifts past and doesn't stop. It's very quiet in here."); swSay("You sit under the roses. It is very quiet here."); }, y + 0.1, "🌹");
var wc = swG(-6, 0, r - 4, g);
swC(0.05, 0.06, 2.6, "wood", 0x6A4A32, 0, 1.3, 0, wc, 8);
swB(0.6, 0.04, 0.04, "wood", 0x6A4A32, 0.25, 2.55, 0, wc);
var ch = swG(0.45, 2.5, 0, wc);
for (var cc = 0; cc < 5; cc++)
swC(0.012, 0.012, 0.3 + cc * 0.06, "metal", 0xC8C8B8, (cc - 2) * 0.05, -0.2 - cc * 0.03, 0, ch, 6);
swKeepAll(ch);
SW.movers.push({ k: "swing", g: ch, ph: 2 });
var wp2 = swTo(g, -6, r - 4);
swRound(wp2.x, wp2.z, 0.2, -5, 3);
[0, Math.PI / 2].forEach(function (a) { var pv = swB(2 * r - 2, 0.04, 1.6, "sand", 0xD8CCB0, 0, 0.03, 0, g, a); });
[[r - 5, 0.9], [-(r - 5), 0.9]].forEach(function (b) { var bb = swBench(g, b[0], -4.4, b[0] > 0 ? -Math.PI / 2 : Math.PI / 2, 1.8, 0x7A5A3A); var bp = swTo(g, b[0], -4.4); swSolid(bp.x, bp.z, 0.6, 1.9, -5, 1); });
for (var bf = 0; bf < (SW.lite ? 4 : 10); bf++) {
var a5 = bf * 1.1, fly = swButterfly(g, Math.sin(a5) * 9, 1.0 + (bf % 3) * 0.3, -Math.cos(a5) * 9, bf);
swKeepAll(fly);
SW.flies.push(fly);
}
var sg = wSign(["THE SENSORY GARDEN", "smell · touch · listen · look"], 2.6, 0.6, "#3A5A2A", "#F4EEDC");
sg.position.set(2.4, 1.3, -r - 0.4);
sg.rotation.y = Math.PI;
g.add(sg);
},
function (G) {
var list = { oak: [], birch: [], fruit: [], willow: [] }, R = wRand(9191);
for (var z = 48; z < 118; z += 10) {
[-5.5, 5.5].forEach(function (x) { var zz = z + (x > 0 ? 5 : 0); if (swPathAll(x, zz) < 3.2)
return; list.oak.push({ x: x, z: zz, s: 0.62, a: R() * 6.28 }); });
}
var copses = [[-150, 40, 24], [150, 60, 22], [-60, 170, 20], [80, 170, 22], [-180, 120, 26], [200, -120, 24], [-230, -10, 20], [40, -250, 30], [-60, -260, 30], [170, 140, 18]];
copses.forEach(function (C) { for (var i = 0; i < (SW.lite ? 7 : 16); i++) {
var a = R() * 6.283, r = R() * C[2], x = C[0] + Math.sin(a) * r, z = C[1] + Math.cos(a) * r;
if (!swTreeOK(x, z, 1))
continue;
(R() < 0.6 ? list.oak : list.birch).push({ x: x, z: z, s: 0.7 + R() * 0.5, a: R() * 6.28 });
} });
SW_HOUSES.forEach(function (H, i) {
var A = SW_HOUSE_AT[H[0]];
if (!A || H[6] === "dome")
return;
var bx = -Math.sin(A.ry), bz = -Math.cos(A.ry);
for (var t = 0; t < 2; t++) {
var side = t ? 1 : -1, x = A.x + bx * (A.d / 2 + 6 + R() * 3) + Math.cos(A.ry) * side * (A.w / 2 + 1), z = A.z + bz * (A.d / 2 + 6 + R() * 3) - Math.sin(A.ry) * side * (A.w / 2 + 1);
if (swTreeOK(x, z, 0))
(R() < 0.5 ? list.oak : R() < 0.6 ? list.birch : list.fruit).push({ x: x, z: z, s: 0.6 + R() * 0.35, a: R() * 6.28 });
}
});
var m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
Object.keys(list).forEach(function (k) {
var L = list[k];
if (!L.length)
return;
var P = swTreeProto(k);
var bm = new THREE.MeshLambertMaterial({ color: P.col[0], map: swTexK("bark") }), cm = new THREE.MeshLambertMaterial({ color: ctuMul(P.col[1], 0.78) }), lm = ctuLeafMat(P.col[1]);
[[P.bark, bm], [P.core, cm], [P.leaf, lm]].forEach(function (pp, qi) {
var im = new THREE.InstancedMesh(pp[0], pp[1], L.length);
im.frustumCulled = false;
im.castShadow = qi === 0;
L.forEach(function (T, i) { e.set(0, T.a, 0); q.setFromEuler(e); v.set(T.x, swLand(T.x, T.z) - 0.15, T.z); s.set(T.s, T.s, T.s); m.compose(v, q, s); im.setMatrixAt(i, m); });
im.instanceMatrix.needsUpdate = true;
G.add(im);
});
if (SW.treeList)
SW.treeList[k] = (SW.treeList[k] || []).concat(L);
});
},
function (G) {
[[-30, -120], [-34, -118]].forEach(function (p, i) { var sw = swBird(G, p[0], SW_LAKE.y - 0.05, p[1], 1.9, 0xFAFAF6, 0.5, 0xE87A30); SW.ducks.push({ g: sw, hx: p[0], hz: p[1], tx: p[0], tz: p[1], wait: i * 3, food: null }); });
for (var c = 0; c < 3; c++) {
var cy = swBird(G, -26 - c, SW_LAKE.y - 0.05, -122 + c, 0.9, 0xA8A8A0, 0.16, 0x3A3A3A);
SW.ducks.push({ g: cy, hx: -26 - c, hz: -122 + c, tx: -26 - c, tz: -122 + c, wait: c, food: null });
}
[[-176, 108, 0.3], [-170, 114, 2.1], [-184, 118, 1.2]].forEach(function (d, i) { try {
var g = swBeast("deer", d[0], d[1], d[2], 0.9, 40 + i);
SW.people.push({ g: g, wander: { r: 12, sp: 0.25 }, beast: 1 });
}
catch (e) { } });
[[170, 20, 0.5], [178, 30, 2.4], [164, 34, 1.4]].forEach(function (d, i) { try {
var g = swBeast("cow", d[0], d[1], d[2], 1, 50 + i);
SW.people.push({ g: g, wander: { r: 8, sp: 0.18 }, beast: 1 });
}
catch (e) { } });
var B = SW_HOUSE_AT.barn;
if (B)
[[3, 2], [-3, -1.5]].forEach(function (o, i) { try {
var gx = B.x + Math.cos(B.ry) * 16 + o[0], gz = B.z - Math.sin(B.ry) * 16 + o[1];
var g = swBeast("goat", gx, gz, i, 0.8, 60 + i);
SW.people.push({ g: g, wander: { r: 4, sp: 0.3 }, beast: 1 });
}
catch (e) { } });
["welcome", "bakery", "home1", "home4", "knit", "library"].forEach(function (k, i) { var A = SW_HOUSE_AT[k]; if (!A || !A.door)
return; var x = A.door.x + Math.cos(A.ry) * 1.6, z = A.door.z - Math.sin(A.ry) * 1.6; try {
swBeast("cat", x, z, A.ry + i, 0.5, 70 + i);
}
catch (e) { } });
var folk = [["painter", 20, -67.4, "f", { top: 0xE8D8C0, bottom: 0x5A6A8A, hair: 0x8A5A2A }, "Rosie Lane", "a painter who paints the lake every evening in soft watercolours and is glad to show you how", null],
["gardener", SW_AT.sgarden.x + 5, SW_AT.sgarden.z - 6, "m", { top: 0x5A7A4A, bottom: 0x4A3A2A, hat: "cap" }, "Tom Birch", "the gardener of the Sensory Garden, who knows the name of every plant and lets you smell each one", { r: 6, sp: 0.35 }],
["walker3", -6, 70, "f", { top: 0xC8A0B0, bottom: 0x4A4A5A }, "Ruth", "a woman out for her evening walk, who likes to say hello", { r: 14, sp: 0.5 }],
["walker4", 44, 96, "m", { top: 0x4A6A8A, bottom: 0x3A3A3A }, "Alfie", "a young man walking slowly round the village, listening to the birds", { r: 16, sp: 0.5 }],
["friend1", -30, -71, "f", { top: 0xA86A5A, bottom: 0x4A3A3A, hair: 0xE8E8E8 }, "Dot", "an old lady sitting by the lake with her friend, watching the swans", null],
["friend2", -28.6, -71, "f", { top: 0x6A8AA8, bottom: 0x3A3A4A, hair: 0xC8C8C8 }, "Peg", "Dot's oldest friend, who knows all the swans by name", null],
["kite", -118, 72, "m", { top: 0xE8C040, bottom: 0x3A6AC8 }, "Sam", "a quiet boy flying his kite in the meadow, who likes it when the kite just hangs there", null]];
folk.forEach(function (F, i) {
var o = { look: Object.assign({ sex: F[3] }, F[4]), sex: F[3], talk: { name: F[5], persona: SW_PERSONA + "You are " + F[5] + ", " + F[6] + ".", greet: "Hello. I'm " + F[5] + "." } };
if (F[7])
o.wander = F[7];
if (F[0] === "kite")
o.s = 0.7;
var p = swPerson(F[0], F[1], F[2], F[0].indexOf("friend") === 0 || F[0] === "painter" ? Math.PI : i, o);
});
var ex = 20, ez = -69, eg = swG(ex, swLand(ex, ez), ez, G, 0);
[-0.3, 0.3].forEach(function (x) { var l = swB(0.04, 1.7, 0.04, "wood", 0x8A6A4A, x, 0.82, 0, eg); l.rotation.z = x > 0 ? -0.1 : 0.1; });
var bl = swB(0.04, 1.6, 0.04, "wood", 0x8A6A4A, 0, 0.8, -0.4, eg);
bl.rotation.x = 0.3;
var cv = swAdd(new THREE.PlaneGeometry(0.75, 0.55), new THREE.MeshLambertMaterial({ map: swArtTex("lilypond") }), 0, 1.3, 0.03, eg);
cv.rotation.x = -0.12;
swRound(ex, ez, 0.4, -5, 2);
var kx = -118, kz = 72, ky = swLand(kx, kz), kg = swG(kx, ky, kz, G);
var kite = swAdd(new THREE.CircleGeometry(0.7, 4), new THREE.MeshLambertMaterial({ color: 0xD84A3A, side: THREE.DoubleSide }), 0, 14, -10, kg);
kite.rotation.y = 0.3;
kite.scale.y = 1.4;
var tl = [];
for (var t = 0; t < 8; t++)
tl.push(0, 13 - t * 0.5, -10 + Math.sin(t) * 0.2, 0, 13 - (t + 1) * 0.5, -10 + Math.sin(t + 1) * 0.2);
var str = [0.3, 1.2, 0.4, 0, 14, -10];
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(str.concat(tl), 3));
kg.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xF0E8D8 })));
SW.movers.push({ k: "swing", g: kite, ph: 0.5 });
var bg = new THREE.Group();
G.add(bg);
SWV.birds = bg;
var bm = new THREE.MeshBasicMaterial({ color: 0x3A3A40, side: THREE.DoubleSide });
for (var b = 0; b < (SW.lite ? 4 : 9); b++) {
var bd = new THREE.Group();
var w1 = swAdd(new THREE.PlaneGeometry(0.9, 0.22), bm, -0.42, 0, 0, bd);
w1.rotation.z = 0.18;
var w2 = swAdd(new THREE.PlaneGeometry(0.9, 0.22), bm, 0.42, 0, 0, bd);
w2.rotation.z = -0.18;
bd.userData = { r: 40 + b * 9, y: 46 + b * 3, sp: 0.03 + b * 0.004, ph: b * 0.7, cx: (b % 3 - 1) * 40, cz: -130 };
bg.add(bd);
}
if (!SW.lite) {
var soft = wTex(64, 64, function (x, W, H) { var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,.8)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
var sm0 = new THREE.SpriteMaterial({ map: soft, color: 0xE8E4E0, transparent: true, opacity: 0.3, depthWrite: false });
SWV.smoke = [];
SW_HOUSES.forEach(function (H, i) {
var A = SW_HOUSE_AT[H[0]];
if (!A || H[6] === "dome" || H[6] === "barn" || i % 2)
return;
var fl = H[5][2] || 1, top = 0.5 + fl * 3.1, rh = A.d * 0.62, y0 = swLand(A.x, A.z);
var c = swTo({ position: new THREE.Vector3(A.x, 0, A.z), rotation: { y: A.ry }, parent: SW.G }, A.w * 0.3, -A.d * 0.18);
for (var p = 0; p < 4; p++) {
var s = new THREE.Sprite(sm0.clone());
s.userData = { x: c.x, z: c.z, y0: y0 + top + rh + 1.8, t: p * 2.5 };
s.scale.set(1, 1, 1);
G.add(s);
SWV.smoke.push(s);
}
});
}
},
function (G) {
[[-56, -73, 0.2], [56, -62, -0.3], [-86, -62, 0.6]].forEach(function (p) {
var y = swLand(p[0], p[1]), g = swG(p[0], y, p[1], G, p[2]);
swB(2, 0.07, 0.8, "wood", 0x8A6A4A, 0, 0.76, 0, g);
[-1, 1].forEach(function (s) { swB(2, 0.06, 0.3, "wood", 0x8A6A4A, 0, 0.44, s * 0.65, g); var l = swB(0.08, 0.8, 1.6, "wood", 0x6A4A32, -0.8, 0.38, 0, g); var l2 = swB(0.08, 0.8, 1.6, "wood", 0x6A4A32, 0.8, 0.38, 0, g); });
swSolid(p[0], p[1], 2.1, 1.7, -5, 0.9, p[2]);
});
var A = SW_AT.allot;
for (var h = 0; h < 3; h++) {
var hx = A.x + 30 + h * 3, hz = A.z + 26, hg = swG(hx, swLand(hx, hz), hz, G, 0.2);
swB(0.6, 0.15, 0.6, "wood", 0x6A5A4A, 0, 0.3, 0, hg);
for (var b = 0; b < 3; b++)
swB(0.56, 0.22, 0.56, "wood", [0xF4F2EA, 0xE8E0C8][b % 2], 0, 0.5 + b * 0.23, 0, hg);
swGable(hg, 0.66, 0.66, 1.18, 0.25, "shingle", 0x6A6A6A, 0.05, "wood", 0xF4F2EA);
swRound(hx, hz, 0.5, -5, 1.5);
}
var c = SW_GREEN, sg = swG(c.x + 3.2, swLand(c.x, c.z), c.z + 2.2, G, 0.5);
[-0.3, 0.3].forEach(function (x) { swC(0.012, 0.012, 4.2, null, 0xC8A870, x, 2.95, 0, sg, 4); });
swB(0.75, 0.05, 0.25, "wood", 0x8A6A4A, 0, 0.85, 0, sg);
swKeepAll(sg);
SW.movers.push({ k: "swing", g: sg, ph: 0.3 });
},
function (g, x, z, ry, wood) {
var dr = swG(x, 0, z, g, ry);
wood = wood || 0x6A4428;
swRB(1.7, 0.9, 0.5, "oak", wood, 0, 0.45, 0, dr);
swRB(1.7, 1.1, 0.06, "oak", swMix(wood, 0x000000, 0.15), 0, 1.45, -0.22, dr);
for (var sl = 0; sl < 2; sl++)
swRB(1.7, 0.04, 0.24, "oak", swMix(wood, 0x000000, 0.15), 0, 1.2 + sl * 0.42, -0.1, dr);
for (var pl = 0; pl < 10; pl++) {
var p = swC(0.12, 0.12, 0.015, null, pl % 2 ? 0xF4F0E8 : 0x4A6AA8, -0.68 + (pl % 5) * 0.34, 1.33 + Math.floor(pl / 5) * 0.42, -0.15, dr, 18);
p.rotation.x = 1.35;
}
return dr;
},
function (g, x, z, ry) {
var c = swG(x, 0, z, g, ry);
swRB(1.4, 0.1, 0.05, "oak", 0x5A3820, 0, 1.75, 0, c);
for (var i = 0; i < 4; i++) {
swC(0.015, 0.015, 0.1, null, 0xB8904A, -0.5 + i * 0.33, 1.75, 0.06, c, 6).rotation.x = Math.PI / 2;
if (i !== 2) {
var coat = swC(0.12, 0.2, 0.85, null, [0x6A4A3A, 0x3A5A6A, 0x8A3A3A][i % 3], -0.5 + i * 0.33, 1.3, 0.14, c, 10);
coat.scale.z = 0.6;
}
}
for (var b = 0; b < 2; b++)
swC(0.06, 0.06, 0.32, null, [0x2E4A2E, 0xC83A2A][b], -0.25 + b * 0.2, 0.16, 0.18, c, 10);
return c;
},
function (g, x, z, ry) {
var p = swG(x, 0, z, g, ry);
swRB(1.5, 1.25, 0.6, "oak", 0x2A1A12, 0, 0.62, 0, p);
swRB(1.56, 0.06, 0.64, "oak", 0x1A100A, 0, 1.27, 0, p);
swRB(1.4, 0.08, 0.28, "oak", 0x2A1A12, 0, 0.74, 0.42, p);
swB(1.3, 0.03, 0.16, null, 0xF4F0E6, 0, 0.79, 0.48, p);
for (var k = 0; k < 20; k++) {
if (k % 7 === 2 || k % 7 === 6)
continue;
swB(0.025, 0.02, 0.09, null, 0x101010, -0.62 + k * 0.066, 0.81, 0.44, p);
}
swRB(0.6, 0.5, 0.35, "oak", 0x2A1A12, 0, 0.25, 0.8, p).scale.y = 1;
swB(0.4, 0.3, 0.02, null, 0xF4F0E6, 0, 1.05, 0.32, p).rotation.x = -0.2;
return p;
},
function (g, x, z, ry, w, h) {
var y = swG(x, 0, z, g, ry);
swRB(w, h, 0.4, "oak", 0x8A6A4A, 0, h / 2, 0, y);
var cols = [0xC84A5A, 0xE87A3A, 0xE8C84A, 0x8AC85A, 0x4AA88A, 0x4A8AC8, 0x6A5AB8, 0xB86AC8, 0xF0E8DC, 0x8A6A4A, 0x3A3A4A, 0xF0A8B8];
var nx = Math.round(w / 0.34), ny = Math.round(h / 0.34);
for (var i = 0; i < nx; i++)
for (var j = 0; j < ny; j++) {
var cx = -w / 2 + (i + 0.5) * w / nx, cy = (j + 0.5) * h / ny;
swB(w / nx - 0.03, h / ny - 0.03, 0.04, null, 0x5A4030, cx, cy, 0.19, y);
for (var b = 0; b < 2; b++)
swS(0.07, cols[(i * 3 + j * 5) % cols.length], cx - 0.05 + b * 0.1, cy - 0.05, 0.18, y, 8);
}
return y;
},
function (g, x, z, ry) {
var s = swG(x, 0, z, g, ry);
swRB(0.9, 0.08, 0.3, "oak", 0x6A4428, 0, 0.3, 0, s);
[-0.35, 0.35].forEach(function (lx) { swRC(0.025, 0.025, 0.32, "oak", 0x6A4428, lx, 0.15, 0, s, 6); });
var wh = swAdd(new THREE.TorusGeometry(0.38, 0.025, 6, 28), swRM("oak", 0x7A5232), -0.15, 0.85, 0, s);
for (var sp = 0; sp < 8; sp++) {
var r = swC(0.01, 0.01, 0.74, null, 0x7A5232, -0.15, 0.85, 0, s, 4);
r.rotation.z = sp / 8 * Math.PI;
}
swRC(0.02, 0.02, 0.6, "oak", 0x6A4428, -0.15, 0.55, 0, s, 6);
swRC(0.025, 0.025, 0.5, "oak", 0x6A4428, 0.3, 0.55, 0, s, 6);
swS(0.06, 0xF0E8D8, 0.3, 0.85, 0, s, 8);
return s;
},
function (g, x, z, ry) { var r = swG(x, 0, z, g, ry); for (var i = 0; i < 4; i++) {
swRB(1.4, 0.04, 0.45, "oak", 0x8A6A4A, 0, 0.35 + i * 0.4, 0, r);
for (var b = 0; b < 4; b++) {
var l = swS(0.12, [0xC8904A, 0xB8783A, 0xD8A860][(i + b) % 3], -0.5 + b * 0.33, 0.43 + i * 0.4, 0, r, 10);
l.scale.set(1.5, 0.75, 1);
}
} [-0.68, 0.68].forEach(function (lx) { swRB(0.05, 1.8, 0.45, "oak", 0x6A4A32, lx, 0.9, 0, r); }); return r; },
function (g, x, y, z) {
var l = swG(x, y, z, g);
swC(0.06, 0.07, 0.02, null, 0xC8A048, 0, 0.01, 0, l, 12);
swC(0.01, 0.01, 0.28, null, 0xC8A048, 0, 0.15, 0, l, 6);
var sh = swAdd(new THREE.CylinderGeometry(0.04, 0.14, 0.1, 16, 1, true, 0, Math.PI), new THREE.MeshPhongMaterial({ color: 0x2E6A3E, shininess: 90, side: THREE.DoubleSide, emissive: new THREE.Color(0x0A2010) }), 0, 0.3, 0, l);
sh.rotation.z = Math.PI / 2;
sh.rotation.x = Math.PI / 2;
sh.userData.keep = 1;
if (!SW.lite) {
var gl = wGlow(0xFFE0A0, 0.5, 0.4);
gl.position.y = 0.24;
l.add(gl);
}
return l;
},
function (P, x, z, ry) {
var y = swLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
swB(1.7, 0.06, 0.42, "wood", 0x9A7A58, 0, 0.45, 0, g);
swB(1.7, 0.36, 0.05, "wood", 0x9A7A58, 0, 0.72, -0.2, g);
[-0.7, 0.7].forEach(function (s) { swB(0.08, 0.45, 0.42, null, 0x3A3A36, s, 0.22, 0, g); });
swSolid(x, z, 1.8, 0.6, y - 1, y + 1, ry);
},
function (P, x, z, ry, seed) {
var y = swLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
[-0.18, 0.18].forEach(function (s) { var l = swB(0.03, 0.45, 0.03, null, 0x3A3A36, s, 0.22, 0, g); l.rotation.z = s * 1.2; });
swB(0.42, 0.04, 0.36, null, 0x3A5A3A, 0, 0.44, 0, g);
var rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.018, 3.4, 5), new THREE.MeshLambertMaterial({ color: 0x4A3A2A }));
rod.position.set(0.3, 1.6, 1.3);
rod.rotation.x = 1.0;
g.add(rod);
swB(0.4, 0.26, 0.28, "wood", 0xA88A5A, -0.45, 0.13, 0.1, g);
try {
swPerson("ang" + seed, 0.55, 0.2, 0, { sex: seed % 3 ? "m" : "f" }, g, 0);
}
catch (e) { }
swSolid(x, z, 1.0, 1.0, y - 1, y + 1.2, ry);
},
function (P, x, z, ry, seed) {
var y = swLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
[[-0.3, 0], [0.3, 0], [0, -0.35]].forEach(function (q) { var l = swB(0.03, 1.6, 0.03, "wood", 0x8A6A48, q[0], 0.78, q[1], g); l.rotation.x = q[1] ? -0.25 : 0.12; });
swB(0.62, 0.48, 0.03, null, 0xE8E2D0, 0, 1.15, 0.1, g);
swB(0.56, 0.4, 0.01, null, [0x7AA0C0, 0x8AB07A, 0xC8A870][seed % 3], 0, 1.15, 0.12, g);
swSolid(x, z, 0.8, 0.8, y - 1, y + 1.6, ry);
return g;
},
function (G, cx, cz, o, seed) {
var P = new THREE.Group();
P.userData.keep = 1;
G.add(P);
var R = wRand(seed), lite = SW.lite;
var nB = lite ? Math.ceil((o.benches || 1) / 2) : (o.benches || 1);
for (var b = 0, t = 0; b < nB && t < 40; t++) {
var a = R() * 6.283, d = 6 + R() * 20, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!swSwFree(x, z, 1.2))
continue;
swSwBench(P, x, z, Math.atan2(cx - x, cz - z));
b++;
}
if (o.lake) {
var nA = lite ? 1 : o.lake;
for (var k = 0, t2 = 0; k < nA && t2 < 80; t2++) {
var a2 = R() * 6.283, sx = SW_LAKE.x + Math.cos(a2) * (SW_LAKE.rx || SW_LAKE.r || 110) * 1.12, sz = SW_LAKE.z + Math.sin(a2) * (SW_LAKE.rz || SW_LAKE.r || 110) * 1.12;
if (Math.hypot(sx - cx, sz - cz) > 70)
continue;
if (!swSwFree(sx, sz, 0.9))
continue;
swSwAngler(P, sx, sz, Math.atan2(SW_LAKE.x - sx, SW_LAKE.z - sz), seed + k);
k++;
}
}
if (o.easel) {
for (var e = 0, t3 = 0; e < 1 && t3 < 40; t3++) {
var a3 = R() * 6.283, d3 = 8 + R() * 14, ex = cx + Math.cos(a3) * d3, ez = cz + Math.sin(a3) * d3;
if (!swSwFree(ex, ez, 1.6))
continue;
swSwEasel(P, ex, ez, a3 + Math.PI, seed);
swPerson("pnt" + seed, ex + Math.cos(a3) * 1.1, ez + Math.sin(a3) * 1.1, a3 + Math.PI, { sex: "f" }, P);
e++;
}
}
var nF = lite ? Math.ceil(o.folk / 2) : o.folk;
for (var f = 0, t4 = 0; f < nF && t4 < nF * 15; t4++) {
var a4 = R() * 6.283, d4 = 4 + R() * 26, fx = cx + Math.cos(a4) * d4, fz = cz + Math.sin(a4) * d4;
if (!swSwFree(fx, fz, 0.6))
continue;
var Pp = swPerson("sws" + seed + "_" + f, fx, fz, R() * 6.28, { sex: R() < 0.5 ? "f" : "m", child: R() < 0.2 }, P);
if (Pp && f % 3 !== 2)
Pp.wander = { r: 8, sp: 0.5 };
f++;
}
},
function (G) {
if (typeof SW_LAKE === "undefined")
return;
[[22, 118, { folk: 5, benches: 2 }], [112, 43, { folk: 4, benches: 1 }], [-31, -56, { folk: 4, benches: 1, lake: 2 }], [-116, 49, { folk: 4, benches: 2 }], [-215, -21, { folk: 3, benches: 1, easel: 1 }],
[-106, -190, { folk: 3, benches: 1, lake: 2, easel: 1 }], [174, 138, { folk: 3, benches: 1 }], [109, -197, { folk: 3, benches: 1, lake: 2 }]].forEach(function (q, i) { swSwPlace(G, q[0], q[1], q[2], 6200 + i * 13); });
}
];
});
