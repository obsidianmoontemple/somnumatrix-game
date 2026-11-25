/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(140, function () {
"use strict";
return [
function (w, h, paint) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var tex = new THREE.CanvasTexture(c);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
tex.encoding = THREE.sRGBEncoding;
var o = { canvas: c, tex: tex, paint: function () { var g = c.getContext("2d"); paint(g, w, h); tex.needsUpdate = true; } };
o.paint();
return o;
},
function (title, url, foot, opt) {
opt = opt || {};
hallViewerClose();
if (!/^https:\/\//.test(String(url || "")))
return null;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var v = document.createElement("div");
v.className = "hall-view";
v.id = "hall-view";
v.innerHTML = '<div class="bar"><b style="font-size:14px">' + esc(title) + '</b><span>' +
(opt.link ? '<a class="btn" target="_blank" rel="noopener noreferrer" href="' + esc(opt.link) + '">Open in a new tab</a> ' : '') +
'<button class="btn" id="hall-view-x">' + esc(opt.closeWord || "Close") + '</button></span></div>' +
'<iframe class="' + (opt.tall ? "tall" : "") + '" src="' + esc(url) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="no-referrer-when-downgrade"' +
' sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"></iframe>' +
'<div class="foot">' + (foot || "") + '</div>';
document.body.appendChild(v);
HALL.view = v;
HALL.onClose = opt.onClose || null;
document.getElementById("hall-view-x").onclick = hallViewerClose;
return v;
},
function (sc, at) {
var films = sc.films;
if (!films.length)
return null;
var tot = 0;
films.forEach(function (f) { tot += (f.minutes || 90) + CIN_GAP; });
var t = ((at || Date.now()) - CIN_EPOCH) / 60000 + sc.n * 17, r = ((t % tot) + tot) % tot;
for (var i = 0; i < films.length; i++) {
var len = (films[i].minutes || 90) + CIN_GAP;
if (r < len) {
var into = r, next = films[(i + 1) % films.length];
return { film: films[i], into: into, showing: into < (films[i].minutes || 90), left: (films[i].minutes || 90) - into, nextFilm: next, nextIn: len - into };
}
r -= len;
}
return null;
},
function (force) {
if (CIN.busy || (!force && Date.now() - CIN.at < 180000))
return;
CIN.busy = true;
CIN.at = Date.now();
var p = (typeof carePublicRpc === "function") ? carePublicRpc("city_cinema_state") : Promise.resolve(null);
p.then(function (s) {
CIN.busy = false;
if (s && typeof s === "object" && s.screens) {
CIN.state = s;
CIN.feed = (s.feed && typeof s.feed === "object") ? s.feed : null;
cinFeedPoll();
cinBoards(true);
if (CIN.open)
cinPaint();
}
}).catch(function () { CIN.busy = false; });
},
function () {
var f = CIN.feed;
if (!f || !/^https:\/\//.test(String(f.programme_url || "")) || Date.now() - CIN.feedAt < 300000)
return;
CIN.feedAt = Date.now();
fetch(f.programme_url, { mode: "cors", credentials: "omit" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
if (j && j.screens && typeof j.screens === "object") {
var keep = CIN.feed;
CIN.feed = { name: j.name || keep.name, programme_url: keep.programme_url, book: j.book || keep.book, screens: j.screens };
cinBoards(true);
}
}).catch(function () { });
},
function (spec) {
var C = tlCtx(spec, CIN_W, CIN_D, CIN_H);
var wall = tlm(0x5A2328), carpet = tlm(0x7E1E2A), ceil = tlm(0x2A1A20), gold = tlm(0xC9A040), dark = tlm(0x1A1416), wood = tlm(0x5A3A22), cream = tlm(0xE8DCC0);
tlShell(C, wall, tlm(0x3A2A2A), ceil, { door: 0x2A1A12 });
C.add(gB(CIN_W - 0.6, 0.02, CIN_D - CIN_ZA - 0.6), carpet, 0, 0.01, CIN_ZA + (CIN_D / 2 - CIN_ZA) / 2);
[-1, 1].forEach(function (s) { C.add(gB(0.06, 0.14, CIN_D / 2 - CIN_ZA), gold, s * (CIN_W / 2 - 0.18), 3.2, CIN_ZA + (CIN_D / 2 - CIN_ZA) / 2); });
var boards = [], screens = [], seatsA = [], seatsB = [];
for (var i = 0; i < 5; i++) {
var xc = cinAudX(i), x0 = xc - 4, x1 = xc + 4, dx0 = xc + 1.2, dx1 = xc + 3.2;
var wa = dx0 - x0, wb = x1 - dx1;
C.add(gB(wa, CIN_H, 0.3), wall, x0 + wa / 2, CIN_H / 2, CIN_ZA);
C.solid(x0 + wa / 2, CIN_ZA, wa / 2, 0.15, CIN_H);
C.add(gB(wb, CIN_H, 0.3), wall, dx1 + wb / 2, CIN_H / 2, CIN_ZA);
C.solid(dx1 + wb / 2, CIN_ZA, wb / 2, 0.15, CIN_H);
C.add(gB(dx1 - dx0, CIN_H - 2.6, 0.3), wall, (dx0 + dx1) / 2, 2.6 + (CIN_H - 2.6) / 2, CIN_ZA);
C.add(gB(dx1 - dx0 + 0.3, 0.18, 0.36), gold, (dx0 + dx1) / 2, 2.6, CIN_ZA);
if (i < 4) {
var zd = (-CIN_D / 2 + CIN_ZA) / 2, ld = CIN_ZA + CIN_D / 2;
C.add(gB(0.3, CIN_H, ld), wall, x1, CIN_H / 2, zd);
C.solid(x1, zd, 0.15, ld / 2, CIN_H);
}
C.add(gB(7.7, 0.02, CIN_D / 2 + CIN_ZA - 0.4), dark, xc, 0.012, (-CIN_D / 2 + CIN_ZA) / 2);
var bd = hallCanvas(512, 128, cinBoardPaint(i));
var bm = C.add(gP(3.2, 0.8), new THREE.MeshBasicMaterial({ map: bd.tex }), xc - 1.2, 3.6, CIN_ZA + 0.17);
boards.push(bd);
var zs = -CIN_D / 2 + 0.4;
var sc = hallCanvas(640, 280, cinScreenPaint(i));
C.add(gB(6.9, 3.3, 0.12), dark, xc, 3.6, zs - 0.05);
sc.mesh = C.add(gP(6.4, 2.8), new THREE.MeshBasicMaterial({ map: sc.tex }), xc, 3.6, zs + 0.02);
sc.xc = xc;
sc.zs = zs;
[-1, 1].forEach(function (s) { C.add(gB(0.6, 4.6, 0.3), tlm(0x8E1B22), xc + s * 3.6, 3.0, zs + 0.2); });
C.add(gB(7.8, 0.6, 0.3), tlm(0x8E1B22), xc, 5.5, zs + 0.2);
C.add(gB(7.4, 0.7, 1.2), dark, xc, 0.35, zs + 0.7);
C.solid(xc, zs + 0.7, 3.7, 0.6, 0.7);
screens.push(sc);
var glow = new THREE.PointLight(0xA8B8FF, 0.5, 13, 1.5);
glow.position.set(xc, 3.4, zs + 3);
C.root.add(glow);
sc.light = glow;
for (var r = 0; r < 8; r++)
for (var k = 0; k < 6; k++) {
var sx = xc - 2.75 + k * 1.1, sz = -CIN_D / 2 + 5 + r * 1.45;
if (sz > CIN_ZA - 1.6)
continue;
seatsA.push([sx, sz]);
}
C.add(gB(0.5, 0.18, 0.04), tlm(0x3AD06A, "glow"), (dx0 + dx1) / 2, 2.85, CIN_ZA - 0.17);
C.spots.push({ x: xc - 2.5, z: CIN_ZA - 2.2, room: "auditorium", level: 0 });
}
var seatGeo = gB(0.86, 0.42, 0.7), backGeo = gB(0.86, 0.7, 0.12), armGeo = gB(0.08, 0.5, 0.6);
var seatMat = tlm(0x9E1E2A), backMat = tlm(0x8A1824);
var IA = new THREE.InstancedMesh(seatGeo, seatMat, seatsA.length), IB = new THREE.InstancedMesh(backGeo, backMat, seatsA.length), IC = new THREE.InstancedMesh(armGeo, dark, seatsA.length);
var o = new THREE.Object3D();
seatsA.forEach(function (q, j) {
o.position.set(q[0], 0.42, q[1]);
o.updateMatrix();
IA.setMatrixAt(j, o.matrix);
o.position.set(q[0], 0.8, q[1] + 0.36);
o.updateMatrix();
IB.setMatrixAt(j, o.matrix);
o.position.set(q[0] + 0.48, 0.45, q[1] + 0.05);
o.updateMatrix();
IC.setMatrixAt(j, o.matrix);
});
[IA, IB, IC].forEach(function (m) { m.instanceMatrix.needsUpdate = true; m.castShadow = false; m.receiveShadow = true; C.root.add(m); });
screens.seats = seatsA;
var zc = CIN_D / 2 - 7;
C.block(5.2, 1.1, 1, wood, -CIN_W / 2 + 5, 0, zc);
C.add(gB(5.4, 0.06, 1.2), gold, -CIN_W / 2 + 5, 1.13, zc);
C.add(gB(5.2, 1.4, 0.06), tlm(0xBFD8E8, "glow"), -CIN_W / 2 + 5, 1.85, zc + 0.1).material = new THREE.MeshBasicMaterial({ color: 0xBFD8E8, transparent: true, opacity: 0.18, depthWrite: false });
var bo = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#2A1416"; g.fillRect(0, 0, w, h); g.strokeStyle = "#C9A040"; g.lineWidth = 6; g.strokeRect(4, 4, w - 8, h - 8); hallText(g, "BOX OFFICE", w / 2, h / 2, w - 30, "bold 54px Georgia,serif", "#F4E6C0"); });
C.add(gP(3.2, 0.6), new THREE.MeshBasicMaterial({ map: bo.tex }), -CIN_W / 2 + 5, 3.0, zc - 0.2);
C.spots.push({ x: -CIN_W / 2 + 5, z: zc - 1.0, room: "counter", level: 0 });
C.block(6, 1.1, 1, wood, CIN_W / 2 - 5.5, 0, zc);
C.add(gB(6.2, 0.06, 1.2), gold, CIN_W / 2 - 5.5, 1.13, zc);
C.add(gB(1.1, 1.2, 0.8), tlm(0xFFE08A, "glow"), CIN_W / 2 - 7.5, 1.76, zc);
C.add(gB(1.2, 0.1, 0.9), tlm(0xC0392B), CIN_W / 2 - 7.5, 2.4, zc);
C.add(gC(0.12, 0.1, 0.25, 8), tlm(0xE8E0D0), CIN_W / 2 - 4.4, 1.3, zc + 0.1);
C.add(gC(0.12, 0.1, 0.25, 8), tlm(0xE8E0D0), CIN_W / 2 - 4.0, 1.3, zc + 0.1);
var cn = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#2A1416"; g.fillRect(0, 0, w, h); g.strokeStyle = "#C9A040"; g.lineWidth = 6; g.strokeRect(4, 4, w - 8, h - 8); hallText(g, "POPCORN · SWEETS · DRINKS", w / 2, h / 2, w - 30, "bold 40px Georgia,serif", "#F4E6C0"); });
C.add(gP(3.6, 0.6), new THREE.MeshBasicMaterial({ map: cn.tex }), CIN_W / 2 - 5.5, 3.0, zc - 0.2);
C.spots.push({ x: CIN_W / 2 - 5.5, z: zc - 1.0, room: "counter", level: 0 });
var postFilms = ["Nosferatu1922", "HouseOnHauntedHill1959", "night_of_the_living_dead_dvd", "ThePhantomoftheOpera", "the-skeleton-dance-1929", "CarnivalOfSouls1962"];
postFilms.forEach(function (id, j) {
var side = j < 3 ? -1 : 1, z = CIN_ZA + 2.2 + (j % 3) * 3.6;
var pc = hallCanvas(256, 384, cinPosterPaint(cinFilm(id), j));
var m = C.add(gP(1.4, 2.1), new THREE.MeshBasicMaterial({ map: pc.tex }), side * (CIN_W / 2 - 0.17), 2.0, z);
m.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
C.add(gB(0.05, 2.3, 1.6), gold, side * (CIN_W / 2 - 0.2), 2.0, z);
});
[-10, 0, 10].forEach(function (x) { C.add(gS(0.5), tlm(0xFFE8B0, "glow"), x, CIN_H - 0.9, CIN_D / 2 - 6); C.light(x, CIN_D / 2 - 6); C.light(x, CIN_ZA + 2.5); });
C.light(0, CIN_D / 2 - 2);
C.spots.push({ x: 0, z: CIN_ZA + 1.4, room: "lobby", level: 0 }, { x: -4, z: CIN_D / 2 - 4, room: "lobby", level: 0 }, { x: 4, z: CIN_D / 2 - 4, room: "lobby", level: 0 });
var lightPool = [];
for (var li = 0; li < 8; li++) {
var pl = new THREE.PointLight(0xFFE2B8, 0, 16, 1.6);
C.root.add(pl);
lightPool.push(pl);
}
var fill = new THREE.PointLight(0xFFF0DC, 0, Math.max(C.W, C.D) * 1.3, 1.1);
C.root.add(fill);
var amb = new THREE.HemisphereLight(0xFFE8D8, 0x2A1A18, 0.22);
amb.position.set(0, C.H, 0);
C.root.add(amb);
return { spec: spec, root: C.root, walls: C.walls, spots: C.spots, ox: C.ox, oz: 0, exit: { x: C.ox, z: C.D / 2 - 1.0 }, start: { x: C.ox, z: C.D / 2 - 2.4 },
winMats: [], winGlints: [], W: C.W, D: C.D, levels: 1, floor: C.H + 0.5, stairs: [], lifts: [], level: 0, holes: [], locked: null, unlocked: false,
floorNames: [CIN_KEY], asBuilt: [], wpKey: null, wpSaved: false,
lightSpots: C.lights, lightPool: lightPool, lightFill: fill, ceilH: C.H, lightAt: -1, lightLevel: -1,
cinema: { boards: boards, screens: screens } };
},
function (i) {
return function (g, w, h) {
var sc = cinScreens()[i] || { n: i + 1, name: "Screen " + (i + 1), films: [] }, now = cinNow(sc), fs = cinFeedScreen(sc.n);
g.fillStyle = "#120C0E";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#C9A040";
g.lineWidth = 5;
g.strokeRect(3, 3, w - 6, h - 6);
hallText(g, "SCREEN " + sc.n + "  ·  " + String(sc.name).toUpperCase(), w / 2, 26, w - 24, "bold 24px Georgia,serif", "#C9A040");
if (fs) {
var tm = cinFeedTimes(fs);
hallText(g, fs.title || "Live", w / 2, 66, w - 24, "bold 34px Georgia,serif", "#F4E6C0");
hallText(g, (tm ? "Today " + tm + "  ·  " : "") + ((CIN.feed && CIN.feed.name) || "From our partner cinema"), w / 2, 104, w - 24, "20px Georgia,serif", "#BFAF90");
return;
}
if (!now) {
hallText(g, "Dark tonight", w / 2, 72, w - 24, "bold 32px Georgia,serif", "#F4E6C0");
return;
}
hallText(g, now.showing ? now.film.title : ("Next: " + now.nextFilm.title), w / 2, 66, w - 24, "bold 34px Georgia,serif", "#F4E6C0");
hallText(g, now.showing ? ("Now showing · " + cinMins(now.left) + " left · next " + now.nextFilm.title) : ("Starts in " + cinMins(now.nextIn)), w / 2, 104, w - 24, "20px Georgia,serif", "#BFAF90");
};
},
function (i) {
return function (g, w, h) {
var sc = cinScreens()[i] || { n: i + 1, films: [] }, now = cinNow(sc), fs = cinFeedScreen(sc.n);
var grd = g.createLinearGradient(0, 0, 0, h);
grd.addColorStop(0, "#1B2030");
grd.addColorStop(1, "#0A0C12");
g.fillStyle = grd;
g.fillRect(0, 0, w, h);
var title = fs ? (fs.title || "Live") : now ? (now.showing ? now.film.title : now.nextFilm.title) : "";
var sub = fs ? ((CIN.feed && CIN.feed.name) || "Partner cinema") : now ? (now.showing ? (now.film.year ? now.film.year + " · " : "") + "take a seat to watch" : "starts in " + cinMins(now.nextIn)) : "";
hallText(g, title, w / 2, h / 2 - 18, w - 40, "bold 46px Georgia,serif", "#F4ECD8");
hallText(g, sub, w / 2, h / 2 + 34, w - 40, "24px Georgia,serif", "#A8B0C8");
};
},
function (f, j) {
var cols = [["#1A0E14", "#E0761E"], ["#0E1420", "#9FD0FF"], ["#140E0E", "#C0392B"], ["#0F0F12", "#E8C27A"], ["#101810", "#B8E0A0"], ["#16101A", "#C8A0E0"]][j % 6];
return function (g, w, h) {
g.fillStyle = cols[0];
g.fillRect(0, 0, w, h);
g.strokeStyle = cols[1];
g.lineWidth = 8;
g.strokeRect(10, 10, w - 20, h - 20);
g.fillStyle = cols[1];
g.globalAlpha = 0.18;
g.beginPath();
g.arc(w / 2, h * 0.42, 86, 0, Math.PI * 2);
g.fill();
g.globalAlpha = 1;
var words = String(f.title).split(" "), lines = [], cur = "";
g.font = "bold 34px Georgia,serif";
words.forEach(function (wd) { var t = cur ? cur + " " + wd : wd; if (g.measureText(t).width > w - 44 && cur) {
lines.push(cur);
cur = wd;
}
else
cur = t; });
if (cur)
lines.push(cur);
lines.slice(0, 4).forEach(function (l, k) { hallText(g, l, w / 2, h * 0.36 + k * 40 - (lines.length - 1) * 20, w - 40, "bold 34px Georgia,serif", "#F4ECD8"); });
hallText(g, f.year ? String(f.year) : "", w / 2, h - 78, w - 40, "24px Georgia,serif", cols[1]);
hallText(g, "NOW SHOWING", w / 2, h - 40, w - 40, "bold 20px Georgia,serif", cols[1]);
};
},
function (n) {
if (!(typeof signedIn === "function" && signedIn())) {
CIN.tickets[n] = Date.now() + 3 * 3600000;
cinPaint();
return;
}
setStatus("Buying a ticket for screen " + n + "…");
cityRpc("buy_cinema_ticket", { p_screen: n }).then(function (o) {
if (o && o.ok) {
CIN.tickets[n] = Date.now() + 3 * 3600000;
setStatus("<b>Your ticket for screen " + n + ".</b> " + esc(o.say || "Enjoy the film."));
}
else
setStatus(esc((o && o.say) || "The box office could not sell that ticket."));
cinPaint();
}).catch(function (e) {
if (/function|not find|404|PGRST/i.test(String(e && e.message || e))) {
CIN.tickets[n] = Date.now() + 3 * 3600000;
setStatus("The box office waves you through (tickets are not on sale yet).");
cinPaint();
}
else
setStatus(esc(e.message || String(e)));
});
},
function (i) {
var sc = cinScreens()[i];
if (!sc)
return;
if (!cinHasTicket(sc.n)) {
setStatus("<b>You need a ticket for screen " + sc.n + ".</b> The box office is in the lobby.");
return;
}
var fs = cinFeedScreen(sc.n), now = cinNow(sc);
var f = now ? (now.showing ? now.film : now.nextFilm) : null;
if (typeof INT !== "undefined" && INT && INT.cinema) {
var xc = cinAudX(i);
camera.position.x = INT.ox + xc + 0.55;
camera.position.z = INT.oz - CIN_D / 2 + 5 + 4 * 1.45;
yaw = 0;
if (typeof pitch !== "undefined")
pitch = 0.08;
}
CIN.watching = { i: i, n: sc.n, id: fs ? null : f && f.id };
if (fs && !/^https:\/\//.test(String(fs.embed || "")) && cinFullMp4(fs.mp4, { title: fs.title || "Live" }, 0))
return;
if (fs) {
hallViewer("Screen " + sc.n + " · " + (fs.title || "Live"), fs.embed, 'Shown by ' + esc((CIN.feed && CIN.feed.name) || "our partner cinema") + '.' + (fs.book || CIN.feed.book ? ' <a target="_blank" rel="noopener noreferrer" data-pref="cinema" data-pitem="' + sc.n + '" href="' + esc(fs.book || CIN.feed.book) + '">Book seats at the real cinema</a>.' : ''), { onClose: cinStand, closeWord: "Leave your seat" });
return;
}
if (!f)
return;
hallViewer("Screen " + sc.n + " · " + f.title + (f.year ? " (" + f.year + ")" : ""), "https://archive.org/embed/" + encodeURIComponent(f.id), esc(CIN_RATING[f.rating] || "") + (f.rating === "adult" ? " (a horror film made for grown-ups)" : "") + '. ' + (typeof cinLicence === "function" ? cinLicence(f) : "A public-domain film") + ', played from the <a target="_blank" rel="noopener noreferrer" href="https://archive.org/details/' + encodeURIComponent(f.id) + '">Internet Archive</a>. Press play; Escape leaves your seat.', { onClose: cinStand, closeWord: "Leave your seat", link: "https://archive.org/details/" + encodeURIComponent(f.id) });
},
function () {
var el = hallPanel("cin-panel", "#C9A040");
if (!el)
return;
var w = cinWhere();
if (w === null || !walkMode) {
el.style.display = "none";
return;
}
el.style.display = "block";
var list = cinScreens(), h = "";
if (w < 0) {
h += '<h4>' + esc(CIN_KEY) + '</h4><div class="dim">Five screens, every film free for anyone to watch, from the Internet Archive.' + (CIN.feed ? ' Partner cinema: ' + esc(CIN.feed.name || "") + '.' : '') + '</div>';
var price = (CIN.state && CIN.state.price) || 3;
list.forEach(function (sc) {
var now = cinNow(sc), fs = cinFeedScreen(sc.n), f = now ? (now.showing ? now.film : now.nextFilm) : null;
h += '<div class="item"><b>Screen ' + sc.n + ' · ' + esc(sc.name) + '</b><br>' +
(fs ? esc(fs.title || "Live") + ' <span class="dim">(from ' + esc((CIN.feed && CIN.feed.name) || "partner") + ')</span>' :
f ? esc(f.title) + ' <span class="dim">' + (now.showing ? cinMins(now.left) + ' left' : 'in ' + cinMins(now.nextIn)) + ' · ' + esc(CIN_RATING[f.rating] || "") + '</span>' : '<span class="dim">dark</span>') +
'<div class="row">' + (cinHasTicket(sc.n) ? '<span class="dim">Ticket in hand.</span>' : '<button class="btn" data-cin="buy:' + sc.n + '">Ticket · ' + price + ' gold</button>') + '</div></div>';
});
h += '<div class="item"><b>The counter</b><div class="row">' + CIN_SNACKS.map(function (s) { return '<button class="btn" data-cin="snack:' + s[0] + '">' + esc(s[1]) + ' · ' + s[2] + '</button>'; }).join("") + '</div></div>';
}
else {
var sc = list[w] || { n: w + 1, name: "", films: [] }, now = cinNow(sc), fs = cinFeedScreen(sc.n);
h += '<h4>Screen ' + sc.n + ' · ' + esc(sc.name) + '</h4>';
if (fs)
h += '<div>' + esc(fs.title || "Live") + '</div><div class="dim">' + esc(fs.note || "") + '</div>' +
(Array.isArray(fs.showtimes) && fs.showtimes.length ? '<div class="row">' + fs.showtimes.slice(0, 8).map(function (t) {
var b = t.book || fs.book || (CIN.feed && CIN.feed.book);
return b && /^https:\/\//.test(b) ? '<a class="btn" target="_blank" rel="noopener noreferrer" data-pref="cinema" data-pitem="' + sc.n + '" href="' + esc(b) + '">' + esc(t.at) + (t.title ? ' ' + esc(t.title) : '') + '</a>' : '<span class="btn">' + esc(t.at) + '</span>';
}).join("") + '</div><div class="dim">Times at the real cinema; booking opens on its own site.</div>' : '');
else if (now)
h += '<div>' + (now.showing ? 'Now: <b>' + esc(now.film.title) + '</b> <span class="dim">' + cinMins(now.left) + ' left</span>' : 'Next: <b>' + esc(now.nextFilm.title) + '</b> <span class="dim">in ' + cinMins(now.nextIn) + '</span>') + '</div>' +
'<div class="dim">Then: ' + sc.films.map(function (f) { return esc(f.title); }).join(", ") + '</div>';
h += '<div class="row">' + (cinHasTicket(sc.n) ? '<button class="btn" data-cin="watch:' + w + '">Take a seat and watch</button>' : '<span class="dim">Tickets at the box office in the lobby.</span>') + '</div>';
}
if (cinMayProgramme())
h += '<div class="row"><button class="btn" data-cin="prog">Programme the screens</button></div>';
el.innerHTML = h;
},
function () {
var list = cinScreens();
var lib = Object.keys(CIN_FILMS).map(function (id) { var f = cinFilm(id); return '<option value="' + esc(id) + '">' + esc(f.title) + ' (' + f.year + ', ' + f.minutes + ' min)</option>'; }).join("");
var v = document.createElement("div");
v.className = "hall-view";
v.id = "cin-prog";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
v.innerHTML = '<div style="width:min(760px,100%);max-height:calc(100vh - 40px);overflow:auto;background:rgba(10,8,10,.97);border:1px solid #C9A040;border-radius:4px;padding:14px;color:var(--bone);font:13px var(--sans)">' +
'<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:15px">What each screen shows</b><button class="btn" id="cp-x">Close</button></div>' +
'<p class="dim" style="color:var(--dim);line-height:1.5">One film per line, in the order shown. Use the house list, or any public-domain film on the Internet Archive: put its identifier (the part after /details/ in its address), then | title | minutes | family, teen or adult. Only show films that are in the public domain or openly licensed.</p>' +
list.map(function (sc) {
return '<div style="margin:10px 0"><b>Screen ' + sc.n + '</b> <input data-cpn="' + sc.n + '" value="' + esc(sc.name) + '" maxlength="40" style="width:200px"> ' +
'<select data-cpa="' + sc.n + '"><option value="">add from the house list…</option>' + lib + '</select>' +
'<textarea data-cpf="' + sc.n + '" rows="5" style="width:100%;margin-top:4px;font:12px monospace">' + esc(sc.films.map(function (f) { return f.id + " | " + f.title + " | " + (f.minutes || 90) + " | " + (f.rating || "teen"); }).join("\n")) + '</textarea></div>';
}).join("") +
'<button class="btn" id="cp-save">Save the programme</button> <span id="cp-msg" style="color:var(--dim)"></span></div>';
document.body.appendChild(v);
v.querySelector("#cp-x").onclick = function () { v.parentNode.removeChild(v); };
Array.prototype.forEach.call(v.querySelectorAll("[data-cpa]"), function (s) {
s.onchange = function () {
if (!s.value)
return;
var f = cinFilm(s.value), ta = v.querySelector('[data-cpf="' + s.getAttribute("data-cpa") + '"]');
ta.value = (ta.value.trim() ? ta.value.trim() + "\n" : "") + f.id + " | " + f.title + " | " + f.minutes + " | " + f.rating;
s.value = "";
};
});
v.querySelector("#cp-save").onclick = function () {
var msg = v.querySelector("#cp-msg"), jobs = [];
list.forEach(function (sc) {
var films = v.querySelector('[data-cpf="' + sc.n + '"]').value.split("\n").map(function (l) {
var p = l.split("|").map(function (x) { return x.trim(); });
if (!p[0])
return null;
var known = CIN_FILMS[p[0]];
return { id: p[0].slice(0, 100), title: (p[1] || (known && known[0]) || p[0]).slice(0, 120), minutes: Math.max(1, Math.min(400, parseInt(p[2], 10) || (known && known[2]) || 90)), rating: /^(family|teen|adult)$/.test(p[3] || "") ? p[3] : ((known && known[3]) || "teen") };
}).filter(Boolean);
jobs.push(cityRpc("set_cinema_programme", { p_screen: sc.n, p_name: v.querySelector('[data-cpn="' + sc.n + '"]').value.slice(0, 40), p_films: films }));
});
msg.textContent = "Saving…";
Promise.all(jobs).then(function (rs) {
var bad = rs.filter(function (o) { return !o || !o.ok; });
msg.textContent = bad.length ? ((bad[0] && bad[0].say) || "Some screens did not save.") : "Saved. The boards change now.";
cinLoad(true);
}).catch(function (e) { msg.textContent = e.message; });
};
},
function (id, cb) {
if (CINL.src[id] !== undefined) {
cb(CINL.src[id]);
return;
}
if (CINL.asked[id]) {
(CINL.waiting = CINL.waiting || {});
(CINL.waiting[id] = CINL.waiting[id] || []).push(cb);
return;
}
CINL.asked[id] = 1;
var cb0 = cb;
cb = function (u) { cb0(u); var w = CINL.waiting && CINL.waiting[id]; if (w) {
delete CINL.waiting[id];
w.forEach(function (f) { try {
f(u);
}
catch (e) { } });
} };
fetch("https://archive.org/metadata/" + encodeURIComponent(id), { mode: "cors", credentials: "omit" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
var best = null;
((j && j.files) || []).forEach(function (f) {
if (!/\.mp4$/i.test(f.name || ""))
return;
var sz = +f.size || 9e12;
if (sz > 1.5e9)
return;
if (!best || sz > best.sz)
best = { n: f.name, sz: sz };
});
CINL.src[id] = best ? ("https://archive.org/download/" + encodeURIComponent(id) + "/" + best.n.split("/").map(encodeURIComponent).join("/")) : null;
cb(CINL.src[id]);
}).catch(function () { CINL.src[id] = null; cb(null); });
},
function () {
var V = CINL;
if (V.vid) {
try {
V.vid.pause();
V.vid.removeAttribute("src");
V.vid.load();
}
catch (e) { }
}
if (V.tex) {
V.tex.dispose();
}
if (V.scr && V.scr.mesh && V.scr.mesh.material) {
V.scr.mesh.material.map = V.scr.tex;
V.scr.mesh.material.needsUpdate = true;
}
V.vid = null;
V.tex = null;
V.key = null;
V.ok = false;
V.scr = null;
},
function (i, fs) {
var url = String(fs.mp4 || "");
if (!/^https:\/\//.test(url))
return;
var key = i + "|feed|" + url;
if (CINL.key === key)
return;
cinVidStop();
CINL.key = key;
var S = INT.cinema.screens[i];
var v = document.createElement("video");
v.crossOrigin = "anonymous";
v.playsInline = true;
v.muted = true;
v.preload = "auto";
v.loop = true;
v.setAttribute("playsinline", "");
v.src = url;
v.addEventListener("loadedmetadata", function () { if (CINL.key !== key)
return; var p = v.play(); if (p && p.catch)
p.catch(function () { }); });
v.addEventListener("playing", function () {
if (CINL.key !== key || CINL.ok)
return;
var t = new THREE.VideoTexture(v);
if (THREE.sRGBEncoding !== undefined)
t.encoding = THREE.sRGBEncoding;
CINL.tex = t;
CINL.ok = true;
CINL.scr = S;
S.mesh.material.map = t;
S.mesh.material.needsUpdate = true;
});
v.addEventListener("error", function () { if (CINL.key === key) {
cinVidStop();
CINL.key = key;
} });
CINL.vid = v;
},
function (i, sc, now) {
var key = i + "|" + now.film.id;
if (CINL.key === key)
return;
cinVidStop();
CINL.key = key;
var S = INT.cinema.screens[i];
cinSrc(now.film.id, function (url) {
if (CINL.key !== key || !url)
return;
var v = document.createElement("video");
v.crossOrigin = "anonymous";
v.playsInline = true;
v.muted = true;
v.preload = "auto";
v.loop = false;
v.setAttribute("playsinline", "");
v.src = url;
v.addEventListener("loadedmetadata", function () {
if (CINL.key !== key)
return;
var n2 = cinNow(sc);
try {
v.currentTime = Math.min(v.duration - 1, Math.max(0, (n2 ? n2.into : 0) * 60));
}
catch (e) { }
var p = v.play();
if (p && p.catch)
p.catch(function () { });
});
v.addEventListener("playing", function () {
if (CINL.key !== key || CINL.ok)
return;
var t = new THREE.VideoTexture(v);
if (THREE.sRGBEncoding !== undefined)
t.encoding = THREE.sRGBEncoding;
CINL.tex = t;
CINL.ok = true;
CINL.scr = S;
S.mesh.material.map = t;
S.mesh.material.needsUpdate = true;
});
v.addEventListener("error", function () { if (CINL.key === key) {
CINL.src[now.film.id] = null;
cinVidStop();
CINL.key = key;
} });
CINL.vid = v;
});
},
function () {
if (CINL.beams && CINL.beams.root === INT.root)
return CINL.beams;
var B = [];
B.root = INT.root;
INT.cinema.screens.forEach(function (S, i) {
var from = new THREE.Vector3(S.xc, 5.6, CIN_ZA - 0.4), to = new THREE.Vector3(S.xc, 3.6, S.zs + 0.1), len = from.distanceTo(to);
var geo = new THREE.CylinderGeometry(0.12, 3.1, len, 24, 1, true);
geo.translate(0, len / 2, 0);
var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xD8E2FF, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
m.position.copy(to);
m.lookAt(from);
m.rotateX(Math.PI / 2);
m.visible = false;
INT.root.add(m);
var dust = (typeof particles === "function") ? particles(70, [2.2, len * 0.9, 2.2], 0xE8EEFF, 0.05, 0.5) : null;
if (dust) {
dust.position.set(S.xc, 1.6, (from.z + to.z) / 2);
dust.rotation.x = -Math.PI / 2;
dust.position.y = 4.4;
dust.visible = false;
INT.root.add(dust);
}
var lamp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.1), new THREE.MeshBasicMaterial({ color: 0xFFF4D8 }));
lamp.position.set(S.xc, 5.6, CIN_ZA - 0.2);
INT.root.add(lamp);
B.push({ beam: m, dust: dust, lamp: lamp });
});
CINL.beams = B;
return B;
},
function () {
var C = INT.cinema, seats = C.screens.seats || [];
if (!C.aud)
C.aud = {};
var h = (typeof cityHour === "function") ? cityHour() : ((typeof dreamHour === "function") ? dreamHour() : 20);
var busy = h >= 18 && h < 23 ? 0.45 : h >= 12 && h < 18 ? 0.22 : 0.1;
cinScreens().forEach(function (sc, i) {
var now = cinNow(sc), on = !!(now && now.showing) || !!cinFeedScreen(sc.n), list = C.aud[i] || (C.aud[i] = []);
if (!on) {
list.forEach(function (g) { if (g.parent)
g.parent.remove(g); });
C.aud[i] = [];
return;
}
if (list.length)
return;
var xc = cinAudX(i), mine = seats.filter(function (q) { return Math.abs(q[0] - xc) < 4; });
var key = now ? now.film.id : "feed", n = 0;
mine.forEach(function (q, j) {
var r = (typeof hash === "function") ? hash("cin" + i + key + j) % 1000 / 1000 : Math.random();
if (r > busy || n >= 22)
return;
if (CINL.seat && CINL.seat.i === i && Math.abs(q[0] - CINL.seat.x) < 0.3 && Math.abs(q[1] - CINL.seat.z) < 0.3)
return;
var spec = { id: "cinaud" + i + "_" + j, archetype: "human", label: null, attrs: {}, look: randomLook("cin" + key + i + j, "human"), detail: 3, solid: false, nights: [store.session] };
var g = buildFigure(spec, 1);
g.position.set(q[0], 0.14, q[1] + 0.1);
g.rotation.y = Math.PI;
g.userData.pose = "sit";
g.userData.seated = true;
INT.root.add(g);
list.push(g);
n++;
});
});
},
function (on) {
if (typeof document === "undefined")
return;
if (!CINL.bar) {
CINL.bar = document.createElement("div");
CINL.bar.id = "cin-seatbar";
CINL.bar.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:32;display:none;gap:8px;background:rgba(10,8,10,.82);border:1px solid #C9A040;border-radius:4px;padding:8px 10px;color:#F4E6C0;font-size:13px;align-items:center";
document.body.appendChild(CINL.bar);
}
if (!on) {
CINL.bar.style.display = "none";
return;
}
var w = CIN.watching, sc = cinScreens()[w.i], now = sc && cinNow(sc);
CINL.bar.innerHTML = '<span>' + esc(now ? now.film.title : "") + '</span><button class="btn" id="cin-full">Full screen</button><button class="btn" id="cin-leave">Leave your seat</button>';
CINL.bar.style.display = "flex";
document.getElementById("cin-leave").onclick = function () { cinLeaveSeat(); };
document.getElementById("cin-full").onclick = function () {
var f = now && now.film;
if (!f)
return;
if (CINL.vid)
CINL.vid.muted = true;
if (CINL.src[f.id] && cinFullMp4(CINL.src[f.id], f, CINL.vid ? CINL.vid.currentTime : 0))
return;
hallViewer("Screen " + sc.n + " · " + f.title + (f.year ? " (" + f.year + ")" : ""), "https://archive.org/embed/" + encodeURIComponent(f.id), (typeof cinLicence === "function" ? cinLicence(f) : "A public-domain film") + ", played from the Internet Archive.", { onClose: function () { if (CINL.vid && CIN.watching)
CINL.vid.muted = false; }, closeWord: "Back to the screen", link: "https://archive.org/details/" + encodeURIComponent(f.id) });
};
},
function (url, f, at) {
if (!/^https:\/\//.test(String(url || "")))
return false;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var box = document.createElement("div");
box.id = "cin-full-view";
box.style.cssText = "position:fixed;inset:0;z-index:60;background:#000;display:flex;flex-direction:column";
box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;color:#F4E6C0;font-size:13px;background:#0A080A"><b>' + esc(f.title + (f.year ? " (" + f.year + ")" : "")) + '</b><button class="btn" id="cin-full-x">Back to the screen</button></div>';
var v = document.createElement("video");
v.controls = true;
v.playsInline = true;
v.preload = "auto";
v.src = url;
v.style.cssText = "flex:1;width:100%;min-height:0;background:#000;object-fit:contain";
box.appendChild(v);
document.body.appendChild(box);
v.addEventListener("loadedmetadata", function () { try {
v.currentTime = Math.max(0, Math.min(v.duration - 1, at || 0));
}
catch (e) { } var p = v.play(); if (p && p.catch)
p.catch(function () { }); });
try {
if (box.requestFullscreen)
box.requestFullscreen().catch(function () { });
}
catch (e) { }
function close() {
try {
if (document.fullscreenElement)
document.exitFullscreen();
}
catch (e) { }
var t = v.currentTime;
try {
v.pause();
v.removeAttribute("src");
v.load();
}
catch (e) { }
if (box.parentNode)
box.parentNode.removeChild(box);
if (CINL.vid && CIN.watching) {
try {
if (t > 0)
CINL.vid.currentTime = t;
}
catch (e) { }
CINL.vid.muted = false;
}
}
document.getElementById("cin-full-x").onclick = close;
addEventListener("keydown", function k(e) { if (e.key === "Escape" && box.parentNode) {
close();
removeEventListener("keydown", k, true);
} }, true);
return true;
}
];
});
