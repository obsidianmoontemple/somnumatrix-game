/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(178, function () {
"use strict";
return [
function (G, dt) {
var k = ARC.k;
G.p.y += ((k.down ? 1 : 0) - (k.up ? 1 : 0)) * 170 * dt;
G.p.y = Math.max(0, Math.min(ARC_H - 40, G.p.y));
var tgt = G.b.y - 20 + Math.sin(Date.now() / 400) * 14;
G.c.y += Math.max(-120 * dt, Math.min(120 * dt, tgt - G.c.y));
G.c.y = Math.max(0, Math.min(ARC_H - 40, G.c.y));
var b = G.b;
b.x += b.vx * dt;
b.y += b.vy * dt;
if (b.y < 3 || b.y > ARC_H - 3) {
b.vy = -b.vy;
b.y = Math.max(3, Math.min(ARC_H - 3, b.y));
arcBeep(300, 0.03);
}
if (b.x < 16 && b.x > 8 && b.y > G.p.y - 3 && b.y < G.p.y + 43 && b.vx < 0) {
b.vx = -b.vx * 1.06;
b.vy += (b.y - (G.p.y + 20)) * 4;
arcBeep(520, 0.04);
}
if (b.x > ARC_W - 16 && b.x < ARC_W - 8 && b.y > G.c.y - 3 && b.y < G.c.y + 43 && b.vx > 0) {
b.vx = -b.vx * 1.04;
b.vy += (b.y - (G.c.y + 20)) * 3;
arcBeep(440, 0.04);
}
if (b.x < 0) {
G.sc++;
arcBeep(160, 0.2);
G.b = { x: 160, y: 120, vx: 110, vy: arcRnd(-70, 70) };
}
if (b.x > ARC_W) {
G.sp++;
ARC.score = G.sp * 100;
arcBeep(880, 0.15);
G.b = { x: 160, y: 120, vx: -110, vy: arcRnd(-70, 70) };
}
if (G.sp >= 7 || G.sc >= 7) {
ARC.score = G.sp * 100 + (G.sp >= 7 ? 500 : 0);
arcOver(G.sp >= 7 ? "YOU WIN" : "MACHINE WINS");
}
},
function (G, dt) {
var k = ARC.k;
if (k.left && G.d.x !== 1)
G.nd = { x: -1, y: 0 };
if (k.right && G.d.x !== -1)
G.nd = { x: 1, y: 0 };
if (k.up && G.d.y !== 1)
G.nd = { x: 0, y: -1 };
if (k.down && G.d.y !== -1)
G.nd = { x: 0, y: 1 };
G.t += dt;
var spd = Math.max(0.05, 0.13 - G.s.length * 0.002);
if (G.t < spd)
return;
G.t = 0;
G.d = G.nd;
var h = { x: G.s[0].x + G.d.x, y: G.s[0].y + G.d.y };
if (h.x < 0 || h.y < 0 || h.x >= 20 || h.y >= 15 || G.s.some(function (p) { return p.x === h.x && p.y === h.y; })) {
arcBeep(120, 0.4);
return arcOver("GAME OVER");
}
G.s.unshift(h);
if (h.x === G.food.x && h.y === G.food.y) {
ARC.score += 10;
arcBeep(660, 0.05);
G.food = this.food(G);
}
else
G.s.pop();
},
function (G, dt) {
var k = ARC.k, b = G.b;
G.p.x += ((k.right ? 1 : 0) - (k.left ? 1 : 0)) * 220 * dt;
G.p.x = Math.max(0, Math.min(ARC_W - G.p.w, G.p.x));
if (!b.on) {
b.x = G.p.x + G.p.w / 2;
b.y = ARC_H - 22;
if (arcPress("fire")) {
b.on = true;
b.vx = arcRnd(-60, 60);
b.vy = -150 - G.lv * 15;
}
return;
}
b.x += b.vx * dt;
b.y += b.vy * dt;
if (b.x < 3 || b.x > ARC_W - 3) {
b.vx = -b.vx;
b.x = Math.max(3, Math.min(ARC_W - 3, b.x));
}
if (b.y < 3) {
b.vy = Math.abs(b.vy);
}
if (b.vy > 0 && b.y > ARC_H - 20 && b.y < ARC_H - 12 && b.x > G.p.x - 3 && b.x < G.p.x + G.p.w + 3) {
b.vy = -Math.abs(b.vy);
b.vx = (b.x - (G.p.x + G.p.w / 2)) * 5;
arcBeep(400, 0.03);
}
for (var i = 0; i < G.br.length; i++) {
var q = G.br[i];
if (arcHit({ x: b.x - 3, y: b.y - 3, w: 6, h: 6 }, q)) {
b.vy = -b.vy;
q.hp--;
arcBeep(700, 0.03);
if (q.hp <= 0) {
G.br.splice(i, 1);
ARC.score += 10 * G.lv;
}
break;
}
}
if (!G.br.length) {
G.lv++;
this.wall(G);
b.on = false;
arcBeep(990, 0.3);
}
if (b.y > ARC_H + 5) {
G.lives--;
b.on = false;
arcBeep(140, 0.3);
if (G.lives <= 0)
arcOver("GAME OVER");
}
},
function (G, dt) {
var k = ARC.k;
G.px += ((k.right ? 1 : 0) - (k.left ? 1 : 0)) * 160 * dt;
G.px = Math.max(6, Math.min(ARC_W - 20, G.px));
G.cool -= dt;
if (k.fire && G.cool <= 0 && G.shots.length < 2) {
G.shots.push({ x: G.px + 6, y: ARC_H - 24 });
G.cool = 0.3;
arcBeep(900, 0.03);
}
G.shots.forEach(function (s) { s.y -= 260 * dt; });
G.shots = G.shots.filter(function (s) { return s.y > 0; });
var edge = false, sp = G.fs * (1 + (36 - G.f.length) / 24);
G.f.forEach(function (a) { a.x += G.fx * sp * dt; if (a.x < 6 || a.x > ARC_W - 20)
edge = true; });
if (edge) {
G.fx = -G.fx;
G.f.forEach(function (a) { a.y += 8; a.x += G.fx * 2; });
}
if (Math.random() < dt * (0.8 + G.wave * 0.3) && G.f.length) {
var a = G.f[Math.floor(Math.random() * G.f.length)];
G.bombs.push({ x: a.x + 6, y: a.y + 10 });
}
G.bombs.forEach(function (b) { b.y += 120 * dt; });
G.bombs = G.bombs.filter(function (b) { return b.y < ARC_H; });
for (var i = G.shots.length - 1; i >= 0; i--) {
var s = G.shots[i];
for (var j = G.f.length - 1; j >= 0; j--) {
var a = G.f[j];
if (s.x > a.x && s.x < a.x + 14 && s.y > a.y && s.y < a.y + 10) {
G.f.splice(j, 1);
G.shots.splice(i, 1);
ARC.score += (4 - a.r) * 10;
arcBeep(220, 0.06);
break;
}
}
}
for (var q = G.bombs.length - 1; q >= 0; q--) {
var b = G.bombs[q];
if (b.y > ARC_H - 22 && b.x > G.px && b.x < G.px + 14) {
G.bombs.splice(q, 1);
G.lives--;
arcBeep(110, 0.4);
if (G.lives <= 0)
return arcOver("GAME OVER");
}
}
if (G.f.some(function (a) { return a.y > ARC_H - 34; }))
return arcOver("THEY LANDED");
if (!G.f.length)
this.fleet(G);
},
function (G, x) {
var t = Math.floor(Date.now() / 300) % 2, cols = ["#F5F", "#5FF", "#FF5", "#5F5"];
G.f.forEach(function (a) { x.fillStyle = cols[a.r]; x.fillRect(a.x + 2, a.y, 10, 6); x.fillRect(a.x, a.y + 2, 14, 4); x.fillRect(a.x + (t ? 0 : 10), a.y + 6, 4, 4); x.fillRect(a.x + (t ? 10 : 0), a.y + 6, 4, 4); });
x.fillStyle = "#5F5";
x.fillRect(G.px, ARC_H - 16, 14, 6);
x.fillRect(G.px + 5, ARC_H - 21, 4, 5);
x.fillStyle = "#fff";
G.shots.forEach(function (s) { x.fillRect(s.x - 1, s.y, 2, 6); });
x.fillStyle = "#F84";
G.bombs.forEach(function (b) { x.fillRect(b.x - 1, b.y, 3, 6); });
arcText(x, "LIVES " + G.lives + "  WAVE " + G.wave, ARC_W - 6, 10, 9, "#aaa", "right");
},
function (G, dt) {
var k = ARC.k, s = G.s, W = ARC_W, H = ARC_H;
s.a += ((k.right ? 1 : 0) - (k.left ? 1 : 0)) * 4 * dt;
if (k.up) {
s.vx += Math.cos(s.a) * 140 * dt;
s.vy += Math.sin(s.a) * 140 * dt;
}
s.vx *= 0.992;
s.vy *= 0.992;
s.x = (s.x + s.vx * dt + W) % W;
s.y = (s.y + s.vy * dt + H) % H;
G.cool -= dt;
G.safe -= dt;
if (k.fire && G.cool <= 0) {
G.sh.push({ x: s.x, y: s.y, vx: Math.cos(s.a) * 240 + s.vx, vy: Math.sin(s.a) * 240 + s.vy, t: 1 });
G.cool = 0.22;
arcBeep(1000, 0.02);
}
G.sh.forEach(function (b) { b.x = (b.x + b.vx * dt + W) % W; b.y = (b.y + b.vy * dt + H) % H; b.t -= dt; });
G.sh = G.sh.filter(function (b) { return b.t > 0; });
G.r.forEach(function (r) { r.x = (r.x + r.vx * dt + W) % W; r.y = (r.y + r.vy * dt + H) % H; });
for (var i = G.r.length - 1; i >= 0; i--) {
var r = G.r[i], rad = r.z * 6;
for (var j = G.sh.length - 1; j >= 0; j--) {
var b = G.sh[j];
if (Math.hypot(b.x - r.x, b.y - r.y) < rad) {
G.sh.splice(j, 1);
G.r.splice(i, 1);
ARC.score += (4 - r.z) * 20;
arcBeep(160 + r.z * 40, 0.08);
if (r.z > 1)
for (var n = 0; n < 2; n++)
G.r.push({ x: r.x, y: r.y, vx: arcRnd(-60, 60), vy: arcRnd(-60, 60), z: r.z - 1 });
r = null;
break;
}
}
if (r && G.safe <= 0 && Math.hypot(s.x - r.x, s.y - r.y) < rad + 4) {
G.lives--;
arcBeep(90, 0.5);
G.s = { x: 160, y: 120, a: -Math.PI / 2, vx: 0, vy: 0 };
G.safe = 2.5;
if (G.lives <= 0)
return arcOver("GAME OVER");
}
}
if (!G.r.length)
this.wave(G);
},
function (G, x) {
var s = G.s;
x.strokeStyle = "#fff";
x.lineWidth = 1.2;
if (G.safe <= 0 || Math.floor(Date.now() / 150) % 2) {
x.beginPath();
x.moveTo(s.x + Math.cos(s.a) * 9, s.y + Math.sin(s.a) * 9);
x.lineTo(s.x + Math.cos(s.a + 2.5) * 7, s.y + Math.sin(s.a + 2.5) * 7);
x.lineTo(s.x + Math.cos(s.a - 2.5) * 7, s.y + Math.sin(s.a - 2.5) * 7);
x.closePath();
x.stroke();
}
G.r.forEach(function (r) { x.beginPath(); for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283, d = r.z * 6 * (0.8 + ((i * 7 + r.z) % 3) * 0.12);
x.lineTo(r.x + Math.cos(a) * d, r.y + Math.sin(a) * d);
} x.closePath(); x.stroke(); });
x.fillStyle = "#fff";
G.sh.forEach(function (b) { x.fillRect(b.x - 1, b.y - 1, 2, 2); });
arcText(x, "LIVES " + G.lives, ARC_W - 6, 10, 9, "#aaa", "right");
},
function (G, dt) {
var p = G.p, k = ARC.k;
G.rep -= dt;
if ((arcPress("left") || (k.left && G.rep <= 0)) && !this.hit(G, p.m, p.x - 1, p.y)) {
p.x--;
G.rep = 0.12;
}
if ((arcPress("right") || (k.right && G.rep <= 0)) && !this.hit(G, p.m, p.x + 1, p.y)) {
p.x++;
G.rep = 0.12;
}
if (arcPress("up") || arcPress("fire")) {
var m = p.m[0].map(function (_, c) { return p.m.map(function (row) { return row[c]; }).reverse(); });
if (!this.hit(G, m, p.x, p.y))
p.m = m;
else if (!this.hit(G, m, p.x - 1, p.y)) {
p.m = m;
p.x--;
}
arcBeep(500, 0.02);
}
G.t += dt * (k.down ? 12 : 1);
var spd = Math.max(0.12, 0.6 - G.lines * 0.015);
if (G.t > spd) {
G.t = 0;
if (!this.hit(G, p.m, p.x, p.y + 1))
p.y++;
else {
var self = this;
p.m.forEach(function (row, r) { row.forEach(function (v, c) { if (v && p.y + r >= 0)
G.b[p.y + r][p.x + c] = p.c; }); });
var n = 0;
for (var r = 19; r >= 0; r--) {
if (G.b[r].every(function (v) { return v; })) {
G.b.splice(r, 1);
G.b.unshift(new Array(10).fill(0));
n++;
r++;
}
}
if (n) {
G.lines += n;
ARC.score += [0, 40, 100, 300, 1200][n];
arcBeep(700 + n * 100, 0.12);
}
else
arcBeep(200, 0.03);
self.next(G);
}
}
},
function (G, x) {
var S = 11, ox = 105, cols = this.cols;
x.strokeStyle = "#444";
x.strokeRect(ox - 1, 9, 10 * S + 2, 20 * S + 2);
G.b.forEach(function (row, r) { row.forEach(function (v, c) { if (v) {
x.fillStyle = cols[v - 1];
x.fillRect(ox + c * S, 10 + r * S, S - 1, S - 1);
} }); });
var p = G.p;
x.fillStyle = cols[p.c - 1];
p.m.forEach(function (row, r) { row.forEach(function (v, c) { if (v && p.y + r >= 0)
x.fillRect(ox + (p.x + c) * S, 10 + (p.y + r) * S, S - 1, S - 1); }); });
arcText(x, "LINES " + G.lines, ARC_W - 8, 30, 10, "#aaa", "right");
},
function (G) {
G.f = { x: 9, y: 14 };
G.lanes = [];
for (var y = 0; y < 15; y++) {
var kind = y === 0 || y === 7 || y === 14 ? "safe" : y < 7 ? "river" : "road";
var sp = (kind === "safe" ? 0 : arcRnd(30, 70)) * (y % 2 ? 1 : -1);
var objs = [];
if (kind !== "safe") {
var n = kind === "river" ? 3 : 3, len = kind === "river" ? (y % 3 ? 4 : 3) : (y % 3 ? 1 : 2);
for (var i = 0; i < n; i++)
objs.push({ x: i * (20 / n) * 16 + arcRnd(0, 30), w: len * 16 });
}
G.lanes.push({ kind: kind, sp: sp, o: objs });
}
G.homes = 0;
G.lives = 3;
G.best = 14;
},
function (G, dt) {
var f = G.f;
if (arcPress("up") && f.y > 0) {
f.y--;
arcBeep(600, 0.02);
if (f.y < G.best) {
G.best = f.y;
ARC.score += 10;
}
}
if (arcPress("down") && f.y < 14) {
f.y++;
arcBeep(500, 0.02);
}
if (arcPress("left") && f.x > 0) {
f.x--;
arcBeep(550, 0.02);
}
if (arcPress("right") && f.x < 19) {
f.x++;
arcBeep(550, 0.02);
}
G.lanes.forEach(function (L) { L.o.forEach(function (o) { o.x += L.sp * dt; if (L.sp > 0 && o.x > ARC_W)
o.x -= ARC_W + o.w; if (L.sp < 0 && o.x + o.w < 0)
o.x += ARC_W + o.w; }); });
var L = G.lanes[f.y], fx = f.x * 16 + 8, on = L.o.some(function (o) { return fx > o.x && fx < o.x + o.w; });
var die = false;
if (L.kind === "road" && on)
die = true;
if (L.kind === "river") {
if (!on)
die = true;
else {
f.fx = (f.fx || 0) + L.sp * dt / 16;
var mv = Math.trunc(f.fx);
if (mv) {
f.x += mv;
f.fx -= mv;
}
if (f.x < 0 || f.x > 19)
die = true;
}
}
else
f.fx = 0;
if (die) {
G.lives--;
arcBeep(100, 0.4);
G.f = { x: 9, y: 14 };
G.best = 14;
if (G.lives <= 0)
return arcOver("GAME OVER");
}
if (f.y === 0) {
G.homes++;
ARC.score += 200;
arcBeep(990, 0.2);
G.f = { x: 9, y: 14 };
G.best = 14;
G.lanes.forEach(function (L) { L.sp *= 1.12; });
}
},
function (G, x) {
G.lanes.forEach(function (L, y) {
x.fillStyle = L.kind === "safe" ? "#3A2A5A" : L.kind === "river" ? "#14327A" : "#222";
x.fillRect(0, y * 16, ARC_W, 16);
L.o.forEach(function (o) { x.fillStyle = L.kind === "river" ? "#8A5A2A" : (y % 2 ? "#E44" : "#EE4"); x.fillRect(o.x, y * 16 + 3, o.w, 10); });
});
x.fillStyle = "#7F3";
x.fillRect(G.f.x * 16 + 3, G.f.y * 16 + 3, 10, 10);
arcText(x, "LIVES " + G.lives + "  HOME " + G.homes, ARC_W - 6, 8, 8, "#fff", "right");
},
function (f, d) {
try {
var own = typeof audio !== "undefined" && audio.on && audio.ctx;
if (!own && !ARC_AC) {
var A = window.AudioContext || window.webkitAudioContext;
if (!A)
return;
ARC_AC = new A();
}
var AC = own ? audio.ctx : ARC_AC, t = AC.currentTime, o = AC.createOscillator(), v = AC.createGain();
o.type = "triangle";
o.frequency.value = f;
v.gain.setValueAtTime(0.0001, t);
v.gain.exponentialRampToValueAtTime(0.05, t + 0.006);
v.gain.exponentialRampToValueAtTime(0.0001, t + d);
o.connect(v);
v.connect(own ? audio.master : AC.destination);
o.start(t);
o.stop(t + d + 0.02);
}
catch (e) { }
},
function () {
if (ARC.el)
return ARC.el;
var el = document.createElement("div");
el.id = "arc-cab";
el.style.cssText = "position:fixed;inset:0;z-index:60;display:none;background:rgba(0,0,0,.9);align-items:center;justify-content:center;flex-direction:column;font:13px monospace;color:#ddd";
el.innerHTML = '<div id="arc-title" style="font:bold 18px monospace;letter-spacing:.2em;margin-bottom:6px"></div>' +
'<canvas id="arc-cv" width="' + ARC_W + '" height="' + ARC_H + '" style="width:min(92vw,calc(70vh*1.333));height:auto;image-rendering:pixelated;border:6px solid #222;border-radius:10px;box-shadow:0 0 40px rgba(80,160,255,.35);background:#000"></canvas>' +
'<div id="arc-pad" style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;justify-content:center">' +
['left:◀', 'up:▲', 'down:▼', 'right:▶', 'fire:●'].map(function (s) { var p = s.split(":"); return '<button data-k="' + p[0] + '" style="width:58px;height:48px;font-size:20px;background:#222;color:#eee;border:1px solid #555;border-radius:8px;touch-action:none">' + p[1] + '</button>'; }).join("") +
'</div><div style="margin-top:8px;color:#888">Arrows or WASD · Space · P pause · Esc leave &nbsp; <button id="arc-x" style="background:#422;color:#fdd;border:1px solid #844;border-radius:4px;padding:3px 10px">Leave the machine</button></div>';
document.body.appendChild(el);
ARC.el = el;
ARC.cv = el.querySelector("#arc-cv");
ARC.x = ARC.cv.getContext("2d");
el.querySelector("#arc-x").onclick = arcClose;
arcTouchLayout(el);
Array.prototype.forEach.call(el.querySelectorAll("[data-k]"), function (b) {
var k = b.getAttribute("data-k");
var on = function (e) { e.preventDefault(); ARC.k[k] = true; if (ARC.over)
arcStart(); }, off = function (e) { e.preventDefault(); ARC.k[k] = false; };
b.addEventListener("pointerdown", on);
b.addEventListener("pointerup", off);
b.addEventListener("pointerleave", off);
b.addEventListener("pointercancel", off);
});
return el;
},
function (el) {
if (!arcIsTouch())
return;
if (!document.getElementById("arc-touch-css")) {
var st = document.createElement("style");
st.id = "arc-touch-css";
st.textContent =
"#arc-cab.arc-t{background:rgba(4,4,8,.97)!important;padding:env(safe-area-inset-top,0) env(safe-area-inset-right,0) env(safe-area-inset-bottom,0) env(safe-area-inset-left,0);box-sizing:border-box;touch-action:none;user-select:none;-webkit-user-select:none}" +
"#arc-cab.arc-t #arc-row{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}" +
"#arc-cab.arc-t #arc-cv{width:min(94vw,calc((100vh - 250px)*1.333))!important;border-width:4px!important}" +
"#arc-cab.arc-t .arc-cross{display:grid;grid-template-columns:repeat(3,64px);grid-template-rows:repeat(3,64px);gap:4px;touch-action:none}" +
"#arc-cab.arc-t .arc-cross button,#arc-cab.arc-t .arc-fire{background:#2A2A33;color:#EEE;border:2px solid #666;border-radius:12px;font-size:26px;touch-action:none;-webkit-tap-highlight-color:transparent}" +
"#arc-cab.arc-t .arc-cross button.on,#arc-cab.arc-t .arc-fire.on{background:#4A6AA8;border-color:#9AC0FF}" +
"#arc-cab.arc-t .arc-fire{width:104px;height:104px;border-radius:50%;background:#7A1E2A;border-color:#E05A6A;font-size:20px;font-weight:700}" +
"#arc-cab.arc-t .arc-side{display:flex;flex-direction:column;align-items:center;gap:12px}" +
"#arc-cab.arc-t .arc-small{background:#222;color:#ddd;border:1px solid #555;border-radius:8px;padding:8px 14px;font:600 14px monospace}" +
"@media (orientation:landscape){#arc-cab.arc-t #arc-cv{width:min(calc(100vw - 420px),calc((100vh - 70px)*1.333))!important}}" +
"@media (orientation:portrait){#arc-cab.arc-t #arc-row{flex-wrap:wrap}#arc-cab.arc-t #arc-cv{order:-1;flex-basis:100%;max-width:94vw}#arc-cab.arc-t #arc-row{row-gap:18px}}";
document.head.appendChild(st);
}
el.classList.add("arc-t");
var cv = el.querySelector("#arc-cv"), pad = el.querySelector("#arc-pad"), hint = pad.nextElementSibling;
var row = document.createElement("div");
row.id = "arc-row";
var cross = document.createElement("div");
cross.className = "arc-cross";
[["", ""], ["up", "▲"], ["", ""], ["left", "◀"], ["", ""], ["right", "▶"], ["", ""], ["down", "▼"], ["", ""]].forEach(function (c) {
if (!c[0]) {
cross.appendChild(document.createElement("span"));
return;
}
var b = document.createElement("button");
b.setAttribute("data-dir", c[0]);
b.textContent = c[1];
b.setAttribute("aria-label", c[0]);
cross.appendChild(b);
});
var side = document.createElement("div");
side.className = "arc-side";
var fire = document.createElement("button");
fire.className = "arc-fire";
fire.textContent = "FIRE";
fire.setAttribute("aria-label", "Fire");
var pz = document.createElement("button");
pz.className = "arc-small";
pz.textContent = "⏸ Pause";
pz.onclick = function () { ARC.paused = !ARC.paused; pz.textContent = ARC.paused ? "▶ Play" : "⏸ Pause"; };
var lv = document.createElement("button");
lv.className = "arc-small";
lv.textContent = "✕ Leave";
lv.onclick = arcClose;
side.appendChild(fire);
side.appendChild(pz);
side.appendChild(lv);
cv.parentNode.insertBefore(row, cv);
row.appendChild(cross);
row.appendChild(cv);
row.appendChild(side);
pad.style.display = "none";
if (hint)
hint.style.display = "none";
var held = {};
function crossAt(e) {
var r = cross.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
if (Math.hypot(x, y) < 0.08)
return null;
return Math.abs(x) > Math.abs(y) ? (x < 0 ? "left" : "right") : (y < 0 ? "up" : "down");
}
function crossSet(id, d) {
held[id] = d;
var on = {};
Object.keys(held).forEach(function (k) { if (held[k])
on[held[k]] = 1; });
["up", "down", "left", "right"].forEach(function (k) { ARC.k[k] = !!on[k]; var b = cross.querySelector("[data-dir='" + k + "']"); if (b)
b.classList.toggle("on", !!on[k]); });
}
cross.addEventListener("pointerdown", function (e) { e.preventDefault(); try {
cross.setPointerCapture(e.pointerId);
}
catch (x) { } crossSet(e.pointerId, crossAt(e)); if (ARC.over)
arcStart(); });
cross.addEventListener("pointermove", function (e) { if (held[e.pointerId] === undefined)
return; e.preventDefault(); crossSet(e.pointerId, crossAt(e)); });
["pointerup", "pointercancel"].forEach(function (n) { cross.addEventListener(n, function (e) { e.preventDefault(); delete held[e.pointerId]; crossSet(-1, null); delete held[-1]; }); });
fire.addEventListener("pointerdown", function (e) { e.preventDefault(); ARC.k.fire = true; fire.classList.add("on"); if (ARC.over)
arcStart(); });
["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { fire.addEventListener(n, function (e) { e.preventDefault(); ARC.k.fire = false; fire.classList.remove("on"); }); });
var sw = null;
cv.addEventListener("pointerdown", function (e) { e.preventDefault(); sw = { x: e.clientX, y: e.clientY, t: performance.now() }; if (ARC.over)
arcStart(); });
cv.addEventListener("pointerup", function (e) {
if (!sw)
return;
e.preventDefault();
var dx = e.clientX - sw.x, dy = e.clientY - sw.y, k;
if (Math.hypot(dx, dy) < 18) {
k = "fire";
}
else
k = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
ARC.k[k] = true;
setTimeout(function () { if (!held.__k)
ARC.k[k] = false; }, 140);
sw = null;
});
el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
},
function (id) {
var g = ARC_GAMES[id];
if (!g)
return;
arcEl();
ARC.open = id;
ARC.el.style.display = "flex";
ARC.k = {};
ARC.pk = {};
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var t = ARC.el.querySelector("#arc-title");
t.textContent = g.name.toUpperCase();
t.style.color = g.col;
arcStart();
if (typeof setStatus === "function")
setStatus("<b>" + esc(g.name) + "</b> at the Pixel Palace. " + esc(g.blurb) + " Esc to step back from the machine.");
},
function (now) {
if (!ARC.open)
return;
var dt = Math.min(0.05, (now - ARC.last) / 1000);
ARC.last = now;
var g = ARC_GAMES[ARC.open], x = ARC.x;
if (!ARC.paused && !ARC.over)
try {
g.step.call(g, ARC.G, dt);
}
catch (e) {
if (window.console)
console.warn("[arcade]", e);
arcOver("TILT");
}
x.fillStyle = "#000";
x.fillRect(0, 0, ARC_W, ARC_H);
try {
g.draw.call(g, ARC.G, x);
}
catch (e) { }
arcText(x, "SCORE " + ARC.score, 6, 10, 9, "#fff", "left");
arcText(x, "BEST " + Math.max(arcBest(ARC.open), ARC.score), 160, 10, 9, "#ff6");
if (ARC.paused)
arcText(x, "PAUSED", 160, 120, 18, "#ff6");
if (ARC.over) {
x.fillStyle = "rgba(0,0,0,.6)";
x.fillRect(40, 90, 240, 64);
arcText(x, ARC.over, 160, 108, 18, "#f66");
arcText(x, "SPACE (or ●) TO PLAY AGAIN", 160, 136, 9, "#fff");
}
x.fillStyle = "rgba(0,0,0,.18)";
for (var y = 0; y < ARC_H; y += 3)
x.fillRect(0, y, ARC_W, 1);
ARC.pk = Object.assign({}, ARC.k);
ARC.raf = requestAnimationFrame(arcLoop);
},
function (id) {
var g = ARC_GAMES[id], c = document.createElement("canvas");
c.width = ARC_W;
c.height = ARC_H;
var x = c.getContext("2d");
var G = {};
try {
g.init.call(g, G);
}
catch (e) { }
x.fillStyle = "#000";
x.fillRect(0, 0, ARC_W, ARC_H);
try {
g.draw.call(g, G, x);
}
catch (e) { }
x.fillStyle = "rgba(0,0,0,.55)";
x.fillRect(0, 92, ARC_W, 60);
arcText(x, g.name.toUpperCase(), 160, 112, 20, g.col);
arcText(x, "INSERT DREAM · PRESS E", 160, 138, 10, "#fff");
x.fillStyle = "rgba(0,0,0,.18)";
for (var y = 0; y < ARC_H; y += 3)
x.fillRect(0, y, ARC_W, 1);
var t = new THREE.CanvasTexture(c);
t.magFilter = THREE.NearestFilter;
return t;
}
];
});
