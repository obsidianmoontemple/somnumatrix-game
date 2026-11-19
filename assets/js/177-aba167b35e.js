/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ARC = { open: null, el: null, cv: null, x: null, raf: 0, last: 0, k: {}, pk: {}, paused: false, over: false, score: 0, best: {} };
var ARC_W = 320, ARC_H = 240;
function arcBest(id, v) { try {
var b = JSON.parse(localStorage.getItem("sm_arcade_best") || "{}");
if (v != null && v > (b[id] || 0)) {
b[id] = v;
localStorage.setItem("sm_arcade_best", JSON.stringify(b));
}
return b[id] || 0;
}
catch (e) {
return 0;
} }
function arcRnd(a, b) { return a + Math.random() * (b - a); }
function arcHit(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function arcText(x, t, X, Y, sz, col, al) { x.fillStyle = col || "#fff"; x.font = (sz || 10) + "px monospace"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillText(t, X, Y); }
function arcPress(k) { return ARC.k[k] && !ARC.pk[k]; }
var ARC_GAMES = {
paddle: { name: "Paddle Duel", col: "#5AF", blurb: "First to seven. Up and down.",
init: function (G) { G.p = { y: 100 }; G.c = { y: 100 }; G.b = { x: 160, y: 120, vx: 110, vy: 60 }; G.sp = 0; G.sc = 0; },
step: function (G, dt) { return __ZC(177, 0, this, arguments, new.target); },
draw: function (G, x) {
x.fillStyle = "#fff";
for (var i = 0; i < ARC_H; i += 12)
x.fillRect(159, i, 2, 6);
x.fillRect(8, G.p.y, 6, 40);
x.fillRect(ARC_W - 14, G.c.y, 6, 40);
x.fillRect(G.b.x - 3, G.b.y - 3, 6, 6);
arcText(x, String(G.sp), 120, 20, 22);
arcText(x, String(G.sc), 200, 20, 22);
} },
serpent: { name: "Serpent", col: "#6E6", blurb: "Eat the apples. Don't bite yourself.",
init: function (G) { G.n = 16; G.s = [{ x: 8, y: 7 }, { x: 7, y: 7 }, { x: 6, y: 7 }]; G.d = { x: 1, y: 0 }; G.nd = { x: 1, y: 0 }; G.t = 0; G.food = this.food(G); },
food: function (G) { for (;;) {
var f = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 15) };
if (!G.s.some(function (p) { return p.x === f.x && p.y === f.y; }))
return f;
} },
step: function (G, dt) { return __ZC(177, 1, this, arguments, new.target); },
draw: function (G, x) { x.fillStyle = "#E33"; x.fillRect(G.food.x * 16 + 3, G.food.y * 16 + 3, 10, 10); G.s.forEach(function (p, i) { x.fillStyle = i ? "#4C4" : "#9F9"; x.fillRect(p.x * 16 + 1, p.y * 16 + 1, 14, 14); }); } },
bricks: { name: "Brick Breaker", col: "#F84", blurb: "Clear the wall. Left and right; Space to serve.",
init: function (G) { G.p = { x: 136, w: 48 }; G.b = { x: 160, y: 200, vx: 0, vy: 0, on: false }; G.lives = 3; G.lv = 1; this.wall(G); },
wall: function (G) { G.br = []; var cols = ["#E44", "#E84", "#EC4", "#4C4", "#4AE", "#A6E"]; for (var r = 0; r < 6; r++)
for (var c = 0; c < 10; c++)
G.br.push({ x: c * 32 + 1, y: 30 + r * 12, w: 30, h: 10, c: cols[r], hp: r === 0 && G.lv > 1 ? 2 : 1 }); },
step: function (G, dt) { return __ZC(177, 2, this, arguments, new.target); },
draw: function (G, x) {
G.br.forEach(function (q) { x.fillStyle = q.hp > 1 ? "#fff" : q.c; x.fillRect(q.x, q.y, q.w, q.h); });
x.fillStyle = "#ddd";
x.fillRect(G.p.x, ARC_H - 16, G.p.w, 6);
x.fillRect(G.b.x - 3, G.b.y - 3, 6, 6);
arcText(x, "LIVES " + G.lives + "  LEVEL " + G.lv, ARC_W - 6, 10, 9, "#aaa", "right");
} },
raiders: { name: "Star Raiders", col: "#E5E", blurb: "Hold off the fleet. Left, right, Space to fire.",
init: function (G) { G.px = 150; G.shots = []; G.bombs = []; G.lives = 3; G.wave = 0; this.fleet(G); G.cool = 0; },
fleet: function (G) { G.f = []; G.wave++; for (var r = 0; r < 4; r++)
for (var c = 0; c < 9; c++)
G.f.push({ x: 30 + c * 28, y: 24 + r * 20, r: r }); G.fx = 1; G.fs = 18 + G.wave * 6; },
step: function (G, dt) { return __ZC(177, 3, this, arguments, new.target); },
draw: function (G, x) { return __ZC(177, 4, this, arguments, new.target); } },
rocks: { name: "Rock Storm", col: "#DDD", blurb: "Left and right to turn, Up to thrust, Space to fire.",
init: function (G) { G.s = { x: 160, y: 120, a: -Math.PI / 2, vx: 0, vy: 0 }; G.sh = []; G.r = []; G.lives = 3; G.lv = 0; G.cool = 0; G.safe = 2; this.wave(G); },
wave: function (G) { G.lv++; for (var i = 0; i < 3 + G.lv; i++) {
var e = Math.random() < 0.5;
G.r.push({ x: e ? arcRnd(0, ARC_W) : 0, y: e ? 0 : arcRnd(0, ARC_H), vx: arcRnd(-40, 40), vy: arcRnd(-40, 40), z: 3 });
} },
step: function (G, dt) { return __ZC(177, 5, this, arguments, new.target); },
draw: function (G, x) { return __ZC(177, 6, this, arguments, new.target); } },
blocks: { name: "Block Drop", col: "#4CF", blurb: "Left and right to move, Up or Space to turn, Down to drop.",
shapes: [[[1, 1, 1, 1]], [[1, 1], [1, 1]], [[0, 1, 0], [1, 1, 1]], [[1, 0, 0], [1, 1, 1]], [[0, 0, 1], [1, 1, 1]], [[1, 1, 0], [0, 1, 1]], [[0, 1, 1], [1, 1, 0]]],
cols: ["#4CF", "#FD4", "#C5F", "#48F", "#F94", "#5E5", "#F55"],
init: function (G) { G.b = []; for (var r = 0; r < 20; r++) {
G.b.push(new Array(10).fill(0));
} G.t = 0; G.lines = 0; this.next(G); G.rep = 0; },
next: function (G) { var i = Math.floor(Math.random() * 7); G.p = { m: this.shapes[i].map(function (r) { return r.slice(); }), c: i + 1, x: 3, y: 0 }; if (this.hit(G, G.p.m, G.p.x, G.p.y))
arcOver("GAME OVER"); },
hit: function (G, m, px, py) { for (var r = 0; r < m.length; r++)
for (var c = 0; c < m[r].length; c++)
if (m[r][c]) {
var x = px + c, y = py + r;
if (x < 0 || x >= 10 || y >= 20 || (y >= 0 && G.b[y][x]))
return true;
} return false; },
step: function (G, dt) { return __ZC(177, 7, this, arguments, new.target); },
draw: function (G, x) { return __ZC(177, 8, this, arguments, new.target); } },
hopper: { name: "Road Hopper", col: "#8E4", blurb: "Cross the road and the river. Arrows to hop.",
init: function (G) { return __ZC(177, 9, this, arguments, new.target); },
step: function (G, dt) { return __ZC(177, 10, this, arguments, new.target); },
draw: function (G, x) { return __ZC(177, 11, this, arguments, new.target); } }
};
var ARC_ORDER = ["raiders", "bricks", "serpent", "blocks", "rocks", "paddle", "hopper"];
var ARC_AC = null;
function arcBeep(f, d) { return __ZC(177, 12, this, arguments, new.target); }
function arcEl() { return __ZC(177, 13, this, arguments, new.target); }
function arcIsTouch() { try {
return (typeof sdTouch === "function" && sdTouch()) || (matchMedia && matchMedia("(pointer:coarse)").matches);
}
catch (e) {
return false;
} }
function arcTouchLayout(el) { return __ZC(177, 14, this, arguments, new.target); }
var ARC_KEYS = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down", Space: "fire", Enter: "fire" };
addEventListener("keydown", function (e) {
if (!ARC.open)
return;
e.preventDefault();
e.stopImmediatePropagation();
if (e.code === "Escape")
return arcClose();
if (e.code === "KeyP") {
ARC.paused = !ARC.paused;
return;
}
var k = ARC_KEYS[e.code];
if (k)
ARC.k[k] = true;
if (ARC.over && (e.code === "Space" || e.code === "Enter"))
arcStart();
}, true);
addEventListener("keyup", function (e) { if (!ARC.open)
return; e.preventDefault(); e.stopImmediatePropagation(); var k = ARC_KEYS[e.code]; if (k)
ARC.k[k] = false; }, true);
function arcOpen(id) { return __ZC(177, 15, this, arguments, new.target); }
function arcStart() { var g = ARC_GAMES[ARC.open]; ARC.G = {}; ARC.score = 0; ARC.over = false; ARC.paused = false; g.init(ARC.G); ARC.last = performance.now(); cancelAnimationFrame(ARC.raf); ARC.raf = requestAnimationFrame(arcLoop); arcBeep(660, 0.1); }
function arcOver(msg) { if (ARC.over)
return; ARC.over = msg || "GAME OVER"; ARC.best[ARC.open] = arcBest(ARC.open, ARC.score); }
function arcClose() { ARC.open = null; cancelAnimationFrame(ARC.raf); if (ARC.el)
ARC.el.style.display = "none"; ARC.k = {}; }
function arcLoop(now) { return __ZC(177, 16, this, arguments, new.target); }
function arcAttract(id) { return __ZC(177, 17, this, arguments, new.target); }
