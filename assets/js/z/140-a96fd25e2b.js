/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(140, function () {
"use strict";
return [
function (kind, ref) {
if (!(typeof signedIn === "function" && signedIn()))
return;
var k = kind + ":" + ref;
if (LIB.today[k])
return;
LIB.today[k] = 1;
cityRpc("library_visit", { p_kind: kind, p_ref: String(ref).slice(0, 80) }).then(function (o) {
if (o && o.ok && o.merit)
setStatus("<b>The library notes it.</b> " + esc(o.say || "Learning counts in Somnucor."));
}).catch(function () { });
},
function (n) {
var b = LIB_BOOKS.filter(function (q) { return q[0] === n; })[0];
if (!b)
return;
if (typeof libReader === "function" && !b[6]) {
libReader(b, function () { libReadPage(b); });
libNote("book", n);
return;
}
libReadPage(b);
},
function (b) {
var n = b[0];
if (b[6]) {
hallViewer(b[1] + " · " + b[2], b[6], 'A modern book by ' + esc(b[2]) + ', shared under ' + esc(b[7]) + '. If the page stays blank, <a target="_blank" rel="noopener noreferrer" href="' + b[6] + '">open it in a new tab</a>. Escape closes the book.', { link: b[6], tall: true, closeWord: "Close the book" });
libNote("book", n);
return;
}
hallViewer(b[1] + " · " + b[2], libReadUrl(n), 'A public-domain book from <a target="_blank" rel="noopener noreferrer" href="' + libPage(n) + '">Project Gutenberg</a>. If the page stays blank, open it in a new tab. Escape closes the book.', { link: libReadUrl(n), tall: true, closeWord: "Close the book" });
libNote("book", n);
},
function (k) {
var p = LIB_PHET.filter(function (q) { return q[0] === k; })[0];
if (!p)
return;
var url = "https://phet.colorado.edu/sims/html/" + k + "/latest/" + k + "_en.html";
hallViewer(p[1] + " · PhET", url, '<a target="_blank" rel="noopener noreferrer" href="https://phet.colorado.edu">PhET Interactive Simulations</a>, University of Colorado Boulder, licensed CC BY 4.0.', { link: url });
libNote("activity", k);
},
function (spec) {
var C = tlCtx(spec, LIB_W, LIB_D, LIB_H);
var wall = tlm(0xD8CCB0), floor = tlm(0x6A4A2E), ceil = tlm(0xE8E0CC), wood = tlm(0x4A3020), green = tlm(0x2F5A3A), brass = tlm(0xC9A040), rug = tlm(0x7A2E3A);
tlShell(C, wall, floor, ceil, { door: 0x3A2A1A });
[-1, 1].forEach(function (s) {
C.add(gB(0.06, 1.2, LIB_D - 0.6), wood, s * (LIB_W / 2 - 0.18), 0.6, 0);
for (var k = 0; k < 4; k++)
C.add(gB(0.04, 2.6, 1.6), tlm(0xDCEBF4, "glow"), s * (LIB_W / 2 - 0.17), 5.4, -10 + k * 6.5);
});
var bookPos = [], signs = [];
for (var i = 0; i < 10; i++) {
var p = libStack(i);
C.add(gB(4.2, 2.5, 0.08), wood, p.x, 1.25, p.z);
C.add(gB(0.08, 2.5, 0.74), wood, p.x - 2.1, 1.25, p.z);
C.add(gB(0.08, 2.5, 0.74), wood, p.x + 2.1, 1.25, p.z);
C.solid(p.x, p.z, 2.15, 0.38, 2.5);
for (var sh = 0; sh < 4; sh++) {
C.add(gB(4.2, 0.05, 0.74), wood, p.x, 0.35 + sh * 0.55, p.z);
}
var sc = hallCanvas(512, 96, (function (name) { return function (g, w, h) { g.fillStyle = "#1F3A2A"; g.fillRect(0, 0, w, h); g.strokeStyle = "#C9A040"; g.lineWidth = 5; g.strokeRect(3, 3, w - 6, h - 6); hallText(g, name, w / 2, h / 2, w - 24, "bold 40px Georgia,serif", "#F4ECD8"); }; })(LIB_SHELVES[i]));
[1, -1].forEach(function (f) { var m = C.add(gP(3.2, 0.6), new THREE.MeshBasicMaterial({ map: sc.tex }), p.x, 2.95, p.z + f * 0.36); if (f < 0)
m.rotation.y = Math.PI; });
C.add(gB(3.3, 0.66, 0.66), wood, p.x, 2.95, p.z);
for (var f2 = -1; f2 <= 1; f2 += 2)
for (var row = 0; row < 4; row++) {
var x = p.x - 2, n = 0;
while (x < p.x + 1.95 && n < 40) {
var bw = 0.05 + ((i * 7 + row * 3 + n * 13) % 5) * 0.012;
bookPos.push([x + bw / 2, 0.38 + row * 0.55, p.z + f2 * 0.22, bw, 0.3 + ((n * 5 + row) % 4) * 0.04, (i * 31 + row * 7 + n) % 9]);
x += bw + 0.004;
n++;
}
}
C.spots.push({ x: p.x + 2.6, z: p.z + 1.2, room: "stacks", level: 0 });
}
var cols = [0x7A2E2E, 0x2F4A6A, 0x2F5A3A, 0x6A5A2A, 0x4A2A5A, 0x8A6A3A, 0x1F2F3F, 0x9A3A2A, 0x3A5A5A];
var IB = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 0.24), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), bookPos.length), o3 = new THREE.Object3D(), col = new THREE.Color();
bookPos.forEach(function (q, j) { o3.position.set(q[0], q[1] + q[4] / 2, q[2]); o3.scale.set(q[3], q[4], 1); o3.updateMatrix(); IB.setMatrixAt(j, o3.matrix); col.setHex(cols[q[5]]); IB.setColorAt(j, col); });
IB.instanceMatrix.needsUpdate = true;
if (IB.instanceColor)
IB.instanceColor.needsUpdate = true;
C.root.add(IB);
[[-4, 4.5], [4, 4.5], [-4, 8.5], [4, 8.5]].forEach(function (t) {
C.block(3.2, 0.78, 1.4, wood, t[0], 0, t[1]);
[-0.8, 0.8].forEach(function (dx) { C.add(gC(0.04, 0.06, 0.4, 8), brass, t[0] + dx, 0.98, t[1]); C.add(gC(0.08, 0.2, 0.16, 10), tlm(0x3FA05A, "glow"), t[0] + dx, 1.2, t[1]); });
[-1, 1].forEach(function (s) { [-0.8, 0.8].forEach(function (dx) { C.add(gB(0.5, 0.45, 0.5), wood, t[0] + dx, 0.22, t[1] + s * 1.05); C.add(gB(0.5, 0.5, 0.06), wood, t[0] + dx, 0.7, t[1] + s * 1.3); }); });
C.light(t[0], t[1]);
});
var dz = LIB_D / 2 - 5.5;
C.block(6, 1.05, 1, wood, 0, 0, dz);
C.add(gB(6.2, 0.06, 1.2), brass, 0, 1.08, dz);
var ds = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#1F3A2A"; g.fillRect(0, 0, w, h); g.strokeStyle = "#C9A040"; g.lineWidth = 6; g.strokeRect(4, 4, w - 8, h - 8); hallText(g, "ISSUE DESK · CATALOGUE", w / 2, h / 2, w - 30, "bold 40px Georgia,serif", "#F4ECD8"); });
C.add(gP(3.6, 0.6), new THREE.MeshBasicMaterial({ map: ds.tex }), 0, 3.0, dz - 0.1);
C.spots.unshift({ x: 0, z: dz - 0.2, room: "counter", level: 0 });
var sx = -LIB_W / 2 + 4.5, sz = LIB_D / 2 - 5;
C.add(gC(2.6, 2.6, 0.03, 24), rug, sx, 0.02, sz);
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2;
C.add(gC(0.42, 0.46, 0.3, 10), tlm([0xE0761E, 0x3A7AB0, 0x8EB84A, 0xC0392B, 0xE8C27A, 0x8E3B8E][k]), sx + Math.cos(a) * 1.7, 0.15, sz + Math.sin(a) * 1.7);
}
C.add(gB(0.9, 1.0, 0.9), tlm(0x6E2A20), sx, 0.5, sz - 2.4);
C.add(gB(0.9, 1.2, 0.15), tlm(0x6E2A20), sx, 1.4, sz - 2.8);
var st = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#3A2A4A"; g.fillRect(0, 0, w, h); hallText(g, "STORY CORNER", w / 2, h / 2, w - 30, "bold 44px Georgia,serif", "#F4E6C0"); });
var stm = C.add(gP(2.8, 0.52), new THREE.MeshBasicMaterial({ map: st.tex }), -LIB_W / 2 + 0.18, 3.2, sz);
stm.rotation.y = Math.PI / 2;
C.spots.push({ x: sx, z: sz - 1.9, room: "story", level: 0 });
var lx = LIB_W / 2 - 4.5, lz = LIB_D / 2 - 6;
[[lx - 1.4, lz], [lx + 1.4, lz], [lx - 1.4, lz + 2.6], [lx + 1.4, lz + 2.6]].forEach(function (d) {
C.block(2, 0.75, 0.9, tlm(0xE8E0CC), d[0], 0, d[1]);
C.add(gB(0.9, 0.55, 0.05), tlm(0x8FD0FF, "glow"), d[0], 1.1, d[1] - 0.25);
C.add(gB(0.08, 0.3, 0.08), tlm(0x333333), d[0], 0.85, d[1] - 0.28);
C.add(gB(0.5, 0.45, 0.5), tlm(0x3A7AB0), d[0], 0.22, d[1] + 0.75);
});
var lc = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#1F2F4A"; g.fillRect(0, 0, w, h); hallText(g, "LEARNING CORNER", w / 2, h / 2, w - 30, "bold 44px Georgia,serif", "#DCEBF4"); });
var lcm = C.add(gP(2.8, 0.52), new THREE.MeshBasicMaterial({ map: lc.tex }), LIB_W / 2 - 0.18, 3.2, lz + 1.3);
lcm.rotation.y = -Math.PI / 2;
C.spots.push({ x: lx, z: lz + 1.3, room: "learning", level: 0 });
for (var j = 0; j < 10; j++) {
var q = libStack(j);
C.light(q.x, q.z + 1.6);
}
C.light(0, LIB_D / 2 - 4);
C.light(sx, sz);
C.light(lx, lz + 1);
var lightPool = [];
for (var li = 0; li < 8; li++) {
var pl = new THREE.PointLight(0xFFE8C8, 0, 16, 1.6);
C.root.add(pl);
lightPool.push(pl);
}
var fill = new THREE.PointLight(0xFFF4E4, 0, Math.max(C.W, C.D) * 1.3, 1.1);
C.root.add(fill);
var amb = new THREE.HemisphereLight(0xFFF4E4, 0x3A3020, 0.32);
amb.position.set(0, C.H, 0);
C.root.add(amb);
return { spec: spec, root: C.root, walls: C.walls, spots: C.spots, ox: C.ox, oz: 0, exit: { x: C.ox, z: C.D / 2 - 1.0 }, start: { x: C.ox, z: C.D / 2 - 2.4 },
winMats: [], winGlints: [], W: C.W, D: C.D, levels: 1, floor: C.H + 0.5, stairs: [], lifts: [], level: 0, holes: [], locked: null, unlocked: false,
floorNames: [LIB_KEY], asBuilt: [], wpKey: null, wpSaved: false,
lightSpots: C.lights, lightPool: lightPool, lightFill: fill, ceilH: C.H, lightAt: -1, lightLevel: -1,
library: { story: { x: sx, z: sz }, learning: { x: lx, z: lz + 1.3 }, desk: { x: 0, z: dz } } };
},
function () {
if (!(typeof INT !== "undefined" && INT && INT.library))
return null;
var lx = camera.position.x - INT.ox, lz = camera.position.z - INT.oz, L = INT.library;
for (var i = 0; i < 10; i++) {
var p = libStack(i);
if (Math.abs(lx - p.x) < 2.6 && Math.abs(lz - p.z) < 2.1)
return "shelf:" + i;
}
if (Math.hypot(lx - L.learning.x, lz - L.learning.z) < 3.6)
return "learning";
if (Math.hypot(lx - L.story.x, lz - L.story.z) < 3.4)
return "story";
return "hall";
},
function () {
var el = hallPanel("lib-panel", "#3FA05A");
if (!el)
return;
var w = libWhere();
if (w === null || !walkMode) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<h4>' + esc(LIB_KEY) + '</h4>';
if (w.indexOf("shelf:") === 0) {
var i = +w.split(":")[1];
h += '<div><b>' + esc(LIB_SHELVES[i]) + '</b> <span class="dim">· pick a book to read</span></div>';
LIB_BOOKS.filter(function (b) { return b[3] === i; }).forEach(function (b) {
h += '<div class="item"><b>' + esc(b[1]) + '</b> <span class="dim">' + esc(b[2]) + '</span><br><span class="dim">' + esc(b[5]) + ' (' + libAge(b[4]) + ')</span>' +
'<div class="row"><button class="btn" data-lib="read:' + b[0] + '">Read</button></div></div>';
});
}
else if (w === "learning") {
h += '<div class="dim">Simulations to play with, right here:</div><div class="row">' + LIB_PHET.map(function (p) { return '<button class="btn" data-lib="phet:' + p[0] + '">' + esc(p[1]) + '</button>'; }).join("") + '</div>' +
'<div class="item"><b>Quizzes</b><div class="row">' + Object.keys(LIB_QUIZ).map(function (k) { return '<button class="btn" data-lib="quiz:' + k + '">' + esc(k) + '</button>'; }).join("") + '</div></div>' +
'<div class="item"><b>More to learn</b> <span class="dim">(opens in a new tab)</span>' + LIB_LINKS.map(function (l) { return '<div style="margin-top:4px"><a target="_blank" rel="noopener noreferrer" href="' + esc(l[1]) + '" data-libl="' + esc(l[0]) + '">' + esc(l[0]) + '</a> <span class="dim">' + esc(l[2]) + '</span></div>'; }).join("") + '</div>';
}
else if (w === "story") {
h += '<div><b>The story corner.</b> <span class="dim">Sit on a cushion and pick a story; the storyteller reads at story hour.</span></div>';
LIB_BOOKS.filter(function (b) { return b[3] === 6 || ((b[3] === 9 || b[3] === 10) && b[4] === "all"); }).forEach(function (b) {
h += '<div class="item"><b>' + esc(b[1]) + '</b> <span class="dim">' + esc(b[2]) + '</span><div class="row"><button class="btn" data-lib="read:' + b[0] + '">Read</button></div></div>';
});
h += '<div class="item"><a target="_blank" rel="noopener noreferrer" href="https://librivox.org">Listen to stories read aloud at LibriVox</a> <span class="dim">(public domain, opens in a new tab)</span></div>';
}
else {
h += '<div class="dim">' + LIB_BOOKS.length + ' books on ' + LIB_SHELVES.length + ' shelves, all free. Walk up to a stack to see its shelf, or search them all.</div>' +
'<div class="row"><button class="btn" data-lib="cat">Search the catalogue</button><button class="btn" data-lib="learn">The learning corner</button></div>';
}
el.innerHTML = h;
},
function () {
hallViewerClose();
var v = document.createElement("div");
v.className = "hall-view";
v.id = "lib-cat";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
v.innerHTML = '<div style="width:min(760px,100%);max-height:calc(100vh - 40px);overflow:auto;background:rgba(10,12,10,.97);border:1px solid #3FA05A;border-radius:4px;padding:14px;color:var(--bone);font:13px var(--sans)">' +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:15px">The catalogue</b><input id="lc-q" placeholder="Title, author or subject" style="flex:1;max-width:320px"><button class="btn" id="lc-x">Close</button></div>' +
'<div id="lc-list" style="margin-top:10px"></div></div>';
document.body.appendChild(v);
function draw() {
var q = (v.querySelector("#lc-q").value || "").toLowerCase();
v.querySelector("#lc-list").innerHTML = LIB_SHELVES.map(function (s, i) {
var bs = LIB_BOOKS.filter(function (b) { return b[3] === i && (!q || (b[1] + " " + b[2] + " " + s + " " + b[5]).toLowerCase().indexOf(q) >= 0); });
if (!bs.length)
return "";
return '<div style="margin:10px 0 4px;color:#8FD0A0"><b>' + esc(s) + '</b></div>' + bs.map(function (b) {
return '<div style="display:flex;justify-content:space-between;gap:8px;padding:4px 0;border-top:1px solid rgba(255,255,255,.06)"><span><b>' + esc(b[1]) + '</b> <span style="color:var(--dim)">' + esc(b[2]) + ' · ' + esc(b[5]) + '</span></span><button class="btn" data-lib="read:' + b[0] + '">Read</button></div>';
}).join("");
}).join("") || '<div style="color:var(--dim)">Nothing on the shelves matches that.</div>';
}
v.querySelector("#lc-q").oninput = draw;
draw();
v.querySelector("#lc-x").onclick = function () { v.parentNode.removeChild(v); };
},
function (k) {
var qs = LIB_QUIZ[k];
if (!qs)
return;
var v = document.createElement("div");
v.className = "hall-view";
v.id = "lib-quiz";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
v.innerHTML = '<div style="width:min(620px,100%);max-height:calc(100vh - 40px);overflow:auto;background:rgba(10,12,18,.97);border:1px solid #8FD0FF;border-radius:4px;padding:14px;color:var(--bone);font:13px var(--sans)">' +
'<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:15px">' + esc(k) + ' quiz</b><button class="btn" id="lq-x">Close</button></div>' +
qs.map(function (q, i) { return '<div style="margin-top:10px"><b>' + (i + 1) + '. ' + esc(q[0]) + '</b>' + q[1].map(function (c, j) { return '<label style="display:block;margin:3px 0"><input type="radio" name="lq' + i + '" value="' + j + '"> ' + esc(c) + '</label>'; }).join("") + '</div>'; }).join("") +
'<div style="margin-top:12px"><button class="btn" id="lq-go">Mark it</button> <span id="lq-msg"></span></div></div>';
document.body.appendChild(v);
v.querySelector("#lq-x").onclick = function () { v.parentNode.removeChild(v); };
v.querySelector("#lq-go").onclick = function () {
var right = 0;
qs.forEach(function (q, i) {
var c = v.querySelector('input[name="lq' + i + '"]:checked'), ok = c && +c.value === q[2];
if (ok)
right++;
var lab = v.querySelectorAll('input[name="lq' + i + '"]');
Array.prototype.forEach.call(lab, function (x) { x.parentNode.style.color = +x.value === q[2] ? "#8FE0A0" : (x.checked ? "#E08A8A" : ""); });
});
v.querySelector("#lq-msg").textContent = right + " out of " + qs.length + (right >= 5 ? ". Well done!" : right >= 3 ? ". Good try: the right answers are in green." : ". The right answers are in green; try again.");
if (right >= 5)
libNote("quiz", k);
};
},
function (n, ok, fail) {
if (LIBR.cache[n]) {
ok(LIBR.cache[n]);
return;
}
var tries = [];
var url = (typeof appParseUrl === "function") ? appParseUrl() : "";
if (url && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseKey)
tries.push(function () {
return fetch(url, { method: "POST", headers: { "Content-Type": "application/json", apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey }, body: JSON.stringify({ book: n }) })
.then(function (r) { if (!r.ok || !/text\/plain/.test(r.headers.get("content-type") || ""))
throw 0; return r.text(); });
});
tries.push(function () { return fetch("https://www.gutenberg.org/cache/epub/" + n + "/pg" + n + ".txt", { mode: "cors", credentials: "omit" }).then(function (r) { if (!r.ok)
throw 0; return r.text(); }); });
(function next(i) {
if (i >= tries.length) {
fail();
return;
}
tries[i]().then(function (t) { if (!t || t.length < 200)
throw 0; LIBR.cache[n] = t; ok(t); }).catch(function () { next(i + 1); });
})(0);
},
function (t) {
t = String(t).replace(/\r\n?/g, "\n");
var a = t.search(/\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG[^\n]*\n/i);
if (a > -1)
t = t.slice(t.indexOf("\n", a) + 1);
var z = t.search(/\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i);
if (z > -1)
t = t.slice(0, z);
t = t.replace(/^\s+|\s+$/g, "");
var paras = t.split(/\n\s*\n/).map(function (p) { return p.replace(/\s*\n\s*/g, " ").trim(); }).filter(Boolean);
var head = /^(chapter|book|part|act|scene|letter|stave|canto|section|volume|introduction|preface|prologue|epilogue)\b[\s.:\-—ivxlcdm0-9]*/i;
var ch = [], cur = { title: "Opening", paras: [] };
paras.forEach(function (p) {
if (p.length < 90 && head.test(p) && cur.paras.length > 2) {
ch.push(cur);
cur = { title: p.replace(/\s+/g, " ").slice(0, 80), paras: [] };
}
else if (p.length < 90 && head.test(p) && !cur.paras.length) {
cur.title = p.replace(/\s+/g, " ").slice(0, 80);
return;
}
cur.paras.push(p);
});
if (cur.paras.length)
ch.push(cur);
if (ch.length < 2) {
var all = ch.length ? ch[0].paras : [], out = [], bit = { title: "Part 1", paras: [] }, len = 0;
all.forEach(function (p) { bit.paras.push(p); len += p.length; if (len > 30000) {
out.push(bit);
bit = { title: "Part " + (out.length + 1), paras: [] };
len = 0;
} });
if (bit.paras.length)
out.push(bit);
ch = out;
}
return ch;
},
function () {
if (document.getElementById("libr-css"))
return;
var c = document.createElement("style");
c.id = "libr-css";
c.textContent =
"#libr{position:fixed;inset:0;z-index:60;background:radial-gradient(ellipse at center,#3A2A1E 0%,#120C08 80%);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Georgia,'Iowan Old Style','Palatino Linotype',serif;user-select:none}" +
"#libr .top{width:min(1180px,96vw);display:flex;gap:6px;align-items:center;color:#E8D9B8;margin-bottom:8px;flex-wrap:wrap}" +
"#libr .top b{flex:1;font-weight:500;font-size:15px;min-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
"#libr .top button,#libr .top select{background:rgba(255,240,210,.08);color:#F2E6C8;border:1px solid rgba(232,217,184,.35);border-radius:3px;padding:5px 9px;font:13px Georgia,serif;cursor:pointer}" +
"#libr .spread{position:relative;width:min(1180px,96vw);height:min(760px,calc(100vh - 120px));display:flex;border-radius:4px;box-shadow:0 18px 60px rgba(0,0,0,.65);perspective:2200px}" +
"#libr .leaf{flex:1;position:relative;overflow:hidden;padding:46px 52px 54px}" +
"#libr.paper .leaf{background:linear-gradient(90deg,#EFE4CB,#F7EEDB 12%,#F8F0DE 88%,#EDE1C6);color:#2A2118}" +
"#libr.sepia .leaf{background:linear-gradient(90deg,#E2CDA4,#EDDAB4 12%,#EEDCB8 88%,#E0C9A0);color:#3A2A18}" +
"#libr.night .leaf{background:linear-gradient(90deg,#1C1A17,#23201C 12%,#23201C 88%,#1A1815);color:#CFC4AE}" +
"#libr .leaf.l{border-radius:4px 0 0 4px;box-shadow:inset -18px 0 30px -14px rgba(0,0,0,.35);overflow:visible;z-index:1}" +
"#libr .leaf.r{border-radius:0 4px 4px 0;box-shadow:inset 18px 0 30px -14px rgba(0,0,0,.35)}" +
"#libr .col{position:absolute;top:46px;bottom:54px;left:52px;right:52px;overflow:hidden}" +
"#libr .flow{height:100%;column-fill:auto;column-gap:104px;text-align:justify;hyphens:auto;-webkit-hyphens:auto;line-height:1.62}" +
"#libr .flow p{margin:0 0 .2em;text-indent:1.4em}" +
"#libr .flow h2{font-weight:500;text-align:center;margin:1.2em 0 1em;font-size:1.3em;letter-spacing:.04em;text-indent:0}" +
"#libr .flow h2+p::first-letter{float:left;font-size:3.1em;line-height:.9;padding:.06em .08em 0 0;color:#8A2A1E}" +
"#libr .flow h2+p{text-indent:0}" +
"#libr .num{position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:12px;opacity:.55}" +
"#libr .run{position:absolute;top:18px;left:0;right:0;text-align:center;font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 40px}" +
"#libr .edge{position:absolute;top:0;bottom:0;width:16%;cursor:pointer;z-index:2}" +
"#libr .edge.p{left:0} #libr .edge.n{right:0}" +
"#libr .turn{position:absolute;top:0;bottom:0;right:0;width:50%;transform-origin:left center;pointer-events:none;z-index:3;background:linear-gradient(90deg,rgba(0,0,0,.18),rgba(255,255,255,.08));opacity:0}" +
"#libr .turn.go{animation:librturn .38s ease-in}" +
"#libr .turn.back{left:0;right:auto;transform-origin:right center;animation:librturnb .38s ease-in}" +
"@keyframes librturn{0%{opacity:.9;transform:rotateY(0)}100%{opacity:0;transform:rotateY(-160deg)}}" +
"@keyframes librturnb{0%{opacity:.9;transform:rotateY(0)}100%{opacity:0;transform:rotateY(160deg)}}" +
"#libr .bar{width:min(1180px,96vw);height:3px;background:rgba(232,217,184,.15);margin-top:10px;border-radius:2px}" +
"#libr .bar i{display:block;height:100%;background:#C9A040;border-radius:2px;width:0}" +
"#libr .side{position:absolute;top:0;bottom:0;left:0;width:min(320px,80vw);background:rgba(20,14,10,.97);color:#E8D9B8;overflow-y:auto;z-index:5;padding:14px;display:none;font-size:14px}" +
"#libr .side a{display:block;padding:6px 4px;color:#E8D9B8;text-decoration:none;border-bottom:1px solid rgba(232,217,184,.12);cursor:pointer}" +
"#libr .side a.on{color:#E8C27A}" +
"#libr .side input{width:100%;box-sizing:border-box;padding:6px;background:#2A2018;color:#F2E6C8;border:1px solid #5A4A3A;border-radius:3px;font:14px Georgia,serif}" +
"#libr .wait{color:#E8D9B8;font-size:16px;text-align:center;padding:40px}" +
"@media (max-width:760px){#libr .leaf.r{display:none} #libr .leaf.l{border-radius:4px} #libr .leaf{padding:30px 22px 44px} #libr .col{top:34px;left:22px;right:22px;bottom:44px} #libr .flow{column-gap:44px} #libr .turn{width:100%}}";
document.head.appendChild(c);
},
function (b, fallback) {
librPrefs();
librCss();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
if (typeof hallViewerClose === "function")
hallViewerClose();
librClose();
var el = document.createElement("div");
el.id = "libr";
el.className = LIBR.theme;
el.innerHTML = '<div class="wait">Taking <i>' + esc(b[1]) + '</i> down from the shelf…</div>';
document.body.appendChild(el);
LIBR.el = el;
LIBR.book = b;
librFetch(b[0], function (t) {
if (LIBR.book !== b)
return;
LIBR.ch = librChapters(t);
var m = librMarks()[b[0]];
LIBR.ci = m ? Math.min(m.ci, LIBR.ch.length - 1) : 0;
LIBR.page = m ? m.page : 0;
librBuild();
librShow(true);
}, function () { if (LIBR.book !== b)
return; librClose(); fallback(); });
},
function () {
var el = LIBR.el, b = LIBR.book;
el.innerHTML = '<div class="top"><button data-r="toc">Contents</button><b>' + esc(b[1]) + ' · <span style="opacity:.7">' + esc(b[2]) + '</span></b>' +
'<button data-r="small">A&minus;</button><button data-r="big">A+</button>' +
'<select data-r="theme"><option value="paper">Paper</option><option value="sepia">Sepia</option><option value="night">Night</option></select>' +
'<button data-r="close">Close the book</button></div>' +
'<div class="spread"><div class="leaf l"><div class="run"></div><div class="col"><div class="flow"></div></div><div class="num"></div></div>' +
'<div class="leaf r"><div class="run"></div><div class="num"></div></div>' +
'<div class="edge p" data-r="prev"></div><div class="edge n" data-r="next"></div><div class="turn"></div>' +
'<div class="side"><input placeholder="Search this book" data-r="find"><div class="hits"></div><div class="toc"></div></div></div>' +
'<div class="bar"><i></i></div>';
el.querySelector('[data-r="theme"]').value = LIBR.theme;
el.addEventListener("click", function (e) {
var r = e.target.closest && e.target.closest("[data-r]");
if (!r)
return;
var k = r.getAttribute("data-r");
if (k === "close")
librClose();
else if (k === "next")
librTurn(1);
else if (k === "prev")
librTurn(-1);
else if (k === "big") {
LIBR.size = Math.min(30, LIBR.size + 2);
librSavePrefs();
librShow(false, true);
}
else if (k === "small") {
LIBR.size = Math.max(13, LIBR.size - 2);
librSavePrefs();
librShow(false, true);
}
else if (k === "toc") {
var sd = el.querySelector(".side");
sd.style.display = sd.style.display === "block" ? "none" : "block";
librToc();
}
else if (k === "ch") {
LIBR.ci = +r.getAttribute("data-c");
LIBR.page = +(r.getAttribute("data-p") || 0);
el.querySelector(".side").style.display = "none";
librShow(false);
}
});
el.querySelector('[data-r="theme"]').onchange = function () { LIBR.theme = this.value; el.className = LIBR.theme; librSavePrefs(); };
el.querySelector('[data-r="find"]').oninput = function () { librFind(this.value); };
var sx = null;
el.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
el.addEventListener("touchend", function (e) { if (sx === null)
return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50)
librTurn(dx < 0 ? 1 : -1); }, { passive: true });
addEventListener("resize", librResize);
},
function (first, keepPlace) {
var el = LIBR.el;
if (!el || !LIBR.ch.length)
return;
var ch = LIBR.ch[LIBR.ci], flow = el.querySelector(".flow"), col = el.querySelector(".col"), two = getComputedStyle(el.querySelector(".leaf.r")).display !== "none";
var frac = keepPlace && LIBR.pages > 1 ? LIBR.page / LIBR.pages : null;
var spread = el.querySelector(".spread"), W = col.clientWidth, gap = two ? 104 : 44;
col.style.right = two ? (-(spread.clientWidth / 2) + 52) + "px" : "";
var pw = W;
flow.style.fontSize = LIBR.size + "px";
flow.style.columnWidth = pw + "px";
flow.style.columnGap = gap + "px";
flow.style.width = pw + "px";
flow.innerHTML = '<h2>' + esc(ch.title) + '</h2>' + ch.paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
var total = Math.max(1, Math.round((flow.scrollWidth + gap) / (pw + gap)));
LIBR.pages = total;
LIBR.step = pw + gap;
LIBR.two = two;
if (frac !== null)
LIBR.page = Math.floor(frac * total);
if (LIBR.page < 0)
LIBR.page = two ? Math.max(0, total - 2 + (total % 2)) : total - 1;
if (two)
LIBR.page -= LIBR.page % 2;
LIBR.page = Math.max(0, Math.min(LIBR.page, total - 1));
librPlace();
},
function () {
var el = LIBR.el, flow = el.querySelector(".flow");
flow.style.transform = "translateX(" + (-LIBR.page * LIBR.step) + "px)";
var nums = el.querySelectorAll(".num"), runs = el.querySelectorAll(".run"), ch = LIBR.ch[LIBR.ci];
nums[0].textContent = (LIBR.page + 1) + " / " + LIBR.pages;
if (nums[1])
nums[1].textContent = LIBR.two && LIBR.page + 2 <= LIBR.pages ? (LIBR.page + 2) + " / " + LIBR.pages : "";
runs[0].textContent = LIBR.book[1];
if (runs[1])
runs[1].textContent = ch.title;
var done = (LIBR.ci + (LIBR.page + 1) / LIBR.pages) / LIBR.ch.length;
el.querySelector(".bar i").style.width = Math.round(done * 1000) / 10 + "%";
librMark();
},
function (d) {
if (!LIBR.el)
return;
var step = LIBR.two ? 2 : 1, np = LIBR.page + d * step;
var t = LIBR.el.querySelector(".turn");
t.className = "turn";
void t.offsetWidth;
t.className = "turn " + (d > 0 ? "go" : "back");
if (np >= LIBR.pages) {
if (LIBR.ci < LIBR.ch.length - 1) {
LIBR.ci++;
LIBR.page = 0;
librShow(false);
}
return;
}
if (np < 0) {
if (LIBR.ci > 0) {
LIBR.ci--;
LIBR.page = -1;
librShow(false);
}
return;
}
LIBR.page = np;
librPlace();
},
function (q) {
clearTimeout(librFindT);
librFindT = setTimeout(function () {
var box = LIBR.el.querySelector(".hits");
q = String(q || "").trim().toLowerCase();
if (q.length < 3) {
box.innerHTML = "";
return;
}
var hits = [];
LIBR.ch.forEach(function (c, i) { c.paras.forEach(function (p, j) { if (hits.length < 40) {
var k = p.toLowerCase().indexOf(q);
if (k > -1)
hits.push({ i: i, j: j, s: p.slice(Math.max(0, k - 40), k + q.length + 60) });
} }); });
box.innerHTML = hits.length ? hits.map(function (h) {
var pg = Math.floor(h.j / Math.max(1, LIBR.ch[h.i].paras.length) * LIBR.pages * 0.98);
return '<a data-r="ch" data-c="' + h.i + '" data-p="' + (h.i === LIBR.ci ? pg : 0) + '"><span style="opacity:.6">' + esc(LIBR.ch[h.i].title) + '</span><br>…' + esc(h.s) + '…</a>';
}).join("") : '<div style="padding:8px;opacity:.6">Not found in this book.</div>';
}, 250);
}
];
});
