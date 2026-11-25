/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TN = { d: null, at: 0, busy: false, open: false, seen: null, heard: {}, board: null, crier: null, bubble: null, banner: null, bannerT: 0, warned: 0, said: 0 };
function tnSeenKey() { var u = (typeof session !== "undefined" && session && session.user) ? session.user.id : "guest"; return "sm-news-seen-" + u; }
function tnLoad() {
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function") {
tnPaint();
return Promise.resolve();
}
TN.busy = true;
TN.at = Date.now();
return cityRpc("tonight_board", {}).then(function (o) { if (o && o.ok) {
TN.d = o;
TN.at = Date.now();
tnNews();
} })
.catch(function () { }).then(function () { TN.busy = false; tnBoardDraw(); tnPaint(); });
}
function tnHour() {
if (TN.d && typeof TN.d.hour === "number")
return TN.d.hour;
try {
if (typeof cityHourNow === "function")
return cityHourNow();
}
catch (e) { }
var d = new Date();
return d.getHours() + d.getMinutes() / 60;
}
function tnClock(h) { var H = Math.floor(h), M = Math.floor((h - H) * 60); return ("0" + H).slice(-2) + ":" + ("0" + M).slice(-2); }
function tnAgo(t) { var m = Math.max(0, (Date.now() - new Date(t).getTime()) / 60000); return m < 1 ? "just now" : m < 60 ? Math.round(m) + " min ago" : m < 36 * 60 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) + " days ago"; }
function tnWhen(t) { var m = Math.round((new Date(t).getTime() - Date.now()) / 60000); if (m <= 0)
return "now"; if (m < 60)
return "in " + m + " min"; var h = Math.floor(m / 60), r = m % 60; return "in " + h + " h" + (r >= 5 ? " " + r + " min" : ""); }
var TN_RINGS = { plaza: "the Tower Plaza", civic: "the Civic Ring", estates: "the High Ring", temples: "Temple Row", markets: "the Market Ring", commons: "the Commons", harvest: "the Harvest Ring" };
var TN_KIND = { parade: "🎺", holiday: "🎉", festival: "🎪", gathering: "🧺" };
function tnRows() {
var D = TN.d || {}, h = tnHour(), rows = [], night = h >= 19 || h < 6;
(D.events || []).forEach(function (e) { rows.push([TN_KIND[e.kind] || "📅", "<b>" + esc(e.title) + "</b> · " + esc(TN_RINGS[e.ring] || e.ring || "the city") + " · " + (e.live ? "on now, ends " + tnWhen(e.ends_at) : "starts " + tnWhen(e.starts_at)), e.live]); });
if (D.fest)
rows.push(["🎡", "<b>The Grand Opening Extravaganza</b> · the midway on the Tower Plaza, rides, games and the Bacchanal", true]);
rows.push(["🏮", "<b>The Night Market</b> · the Market Ring · " + (night ? "open now, lit by everything it sells" : "opens at dusk"), night]);
if (D.raid_night)
rows.push(["🐺", "<b>The Nightmare Wilds are raiding</b> · " + (D.raids || 0) + " nightmare" + (D.raids === 1 ? "" : "s") + " abroad in the rings" + (D.slain ? ", " + D.slain + " put down this hour" : "") + ". Hunters, to the walls.", true]);
else
rows.push(["🌙", "<b>The Wilds are quiet</b> · nightmares raid the rings after dark (20:30 to 05:30)", false]);
if (D.hearings)
rows.push(["⚖️", "<b>The Courthouse</b> · " + D.hearings + " hearing" + (D.hearings === 1 ? "" : "s") + " listed" + (D.next_hearing ? ", the next " + tnWhen(D.next_hearing) : "") + ". The public gallery is open.", false]);
var H = D.hunt;
if (H)
rows.push(["🗝️", "<b>The Dreamer's Keys</b> · season " + H.season + (H.winner ? ", won by " + esc(H.winner) : ", " + (H.seekers || 0) + " seeking, prize " + Number(H.prize_gold || 0).toLocaleString() + " gold"), !H.winner]);
return rows;
}
function tnWeather() {
if (typeof WX === "undefined")
return "";
var k = WX.kind || "clear";
return { clear: "Clear skies", rain: "Rain", storm: "A storm", snow: "Snow", hail: "Hail", fog: "Fog", wind: "High wind", sandstorm: "A sandstorm", heat: "A heat wave", ash: "Ash on the wind", meteors: "Falling stars" }[k] || k;
}
function tnNews() { return __ZC(210, 0, this, arguments, new.target); }
function tnBanner(a) { return __ZC(210, 1, this, arguments, new.target); }
function tnHtml() { return __ZC(210, 2, this, arguments, new.target); }
function tnPaint() {
var el = document.getElementById("tn-box");
if (!TN.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "tn-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:min(80vh,660px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-tn]") : null;
if (!t)
return;
if (t.getAttribute("data-tn") === "close") {
TN.open = false;
tnPaint();
}
});
document.body.appendChild(el);
}
el.style.display = "block";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#F0E0B8">🌙 Tonight in Somnucor</b>' +
'<button class="btn" data-tn="close">Close</button></div>' + tnHtml();
}
function tnOpen() { TN.open = !TN.open; tnPaint(); if (TN.open) {
tnLoad();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
} }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!TN.open; }, close: function () { TN.open = false; tnPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-tonight"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-tonight";
b.title = "What is on in Somnucor now and tonight, and the latest news";
b.textContent = "🌙 Tonight";
b.onclick = tnOpen;
var pk = document.getElementById("me-hunt") || document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
function tnAnchor() {
if (typeof DK !== "undefined" && DK.gate)
return DK.gate;
if (typeof dkGatePlace === "function")
return dkGatePlace();
return null;
}
function tnBoardDraw() {
var B = TN.board;
if (!B)
return;
var x = B.ctx, W = 512, H = 640, hr = tnHour();
x.fillStyle = "#141826";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#8FB4E8";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.fillStyle = "#F0E8D8";
x.textAlign = "center";
x.font = "bold 36px Georgia";
x.fillText("Tonight in Somnucor", W / 2, 60);
x.font = "24px Georgia";
x.fillStyle = "#B8C8E0";
x.fillText("City time " + tnClock(hr) + (tnWeather() ? " · " + tnWeather() : ""), W / 2, 96);
x.textAlign = "left";
var y = 146;
var strip = function (s) { return String(s).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"'); };
tnRows().slice(0, 6).forEach(function (r) {
x.font = "bold 23px sans-serif";
x.fillStyle = r[2] ? "#F0E0B8" : "#A8B4C8";
var t = r[0] + " " + strip(r[1]);
var words = t.split(" "), line = "", lines = 0;
words.forEach(function (w) { var tryL = line ? line + " " + w : w; if (x.measureText(tryL).width > W - 52 && lines < 1) {
x.fillText(line, 26, y);
y += 28;
line = w;
lines++;
}
else
line = tryL; });
if (x.measureText(line).width > W - 52) {
while (line.length && x.measureText(line + "…").width > W - 52)
line = line.slice(0, -1);
line += "…";
}
x.fillText(line, 26, y);
y += 38;
});
var N = (TN.d && TN.d.news) || [];
if (N.length && y < H - 60) {
x.fillStyle = "#E0B060";
x.font = "bold 22px sans-serif";
x.fillText("📰 " + String(N[0].title).slice(0, 34) + (String(N[0].title).length > 34 ? "…" : ""), 26, Math.min(H - 34, y + 8));
}
B.tex.needsUpdate = true;
}
function tnBoardPlace() {
if (TN.board)
return;
var G = tnAnchor();
if (!G || !G.mesh)
return;
var cr = somnucorRealm();
if (!cr)
return;
var a = G.mesh.rotation.y, side = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a)), fwd = new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
var hb = (typeof DK !== "undefined" && DK.board) ? DK.board.g.position : null, sgn = 1;
if (hb && ((hb.x - G.x) * side.x + (hb.z - G.z) * side.z) > 0)
sgn = -1;
var spot = null;
[5, 6.5, 8].some(function (d) { var bx = G.x + side.x * d * sgn, bz = G.z + side.z * d * sgn; if (dkFree(bx, bz, cr.id)) {
spot = { x: bx, z: bz };
return true;
} return false; });
if (!spot)
spot = { x: G.x + side.x * 5 * sgn + fwd.x * 3, z: G.z + side.z * 5 * sgn + fwd.z * 3 };
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 640;
var tex = new THREE.CanvasTexture(cv), g = new THREE.Group();
var face = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.0), new THREE.MeshBasicMaterial({ map: tex }));
face.position.y = 2.3;
g.add(face);
var back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.2, 0.12), new THREE.MeshLambertMaterial({ color: 0x22283A }));
back.position.set(0, 2.3, -0.08);
g.add(back);
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 0.14), new THREE.MeshLambertMaterial({ color: 0x22283A })); post.position.set(sd * 1.0, 0.4, -0.08); g.add(post); });
g.position.set(spot.x, terrainY(spot.x, spot.z), spot.z);
g.rotation.y = a;
g.userData.noCull = 1;
scene.add(g);
TN.board = { g: g, ctx: cv.getContext("2d"), tex: tex, x: spot.x, z: spot.z };
tnBoardDraw();
}
function tnBubbleTex(text) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 160;
var x = c.getContext("2d");
x.fillStyle = "rgba(250,244,228,.95)";
x.strokeStyle = "#6A4A2A";
x.lineWidth = 4;
x.beginPath();
if (x.roundRect)
x.roundRect(4, 4, 504, 124, 18);
else
x.rect(4, 4, 504, 124);
x.fill();
x.stroke();
x.beginPath();
x.moveTo(236, 128);
x.lineTo(256, 156);
x.lineTo(276, 128);
x.fill();
x.fillStyle = "#2A1E14";
x.font = "bold 26px Georgia";
x.textAlign = "center";
var words = String(text).split(" "), lines = [], line = "";
words.forEach(function (w) { var t = line ? line + " " + w : w; if (x.measureText(t).width > 470) {
lines.push(line);
line = w;
}
else
line = t; });
lines.push(line);
lines = lines.slice(0, 3);
var y0 = lines.length === 1 ? 76 : lines.length === 2 ? 58 : 42;
lines.forEach(function (l, i) { x.fillText(l, 256, y0 + i * 32); });
return new THREE.CanvasTexture(c);
}
function tnCrierPlace() {
if (TN.crier)
return;
var G = tnAnchor();
if (!G || !G.mesh || typeof buildFigure !== "function")
return;
var cr = somnucorRealm();
if (!cr)
return;
var a = G.mesh.rotation.y, fwd = new THREE.Vector3(Math.sin(a), 0, Math.cos(a)), side = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a)), spot = null;
[[5, 2.5], [6, -2.5], [7, 3.5], [8, -3.5], [9, 0]].some(function (q) { var x = G.x + fwd.x * q[0] + side.x * q[1], z = G.z + fwd.z * q[0] + side.z * q[1]; if (dkFree(x, z, cr.id)) {
spot = { x: x, z: z };
return true;
} return false; });
if (!spot)
return;
var id = "tncrier", L = (typeof randomLook === "function") ? randomLook(id, "human") : {};
try {
if (typeof csLookFill === "function")
csLookFill(L, id);
}
catch (e) { }
try {
if (typeof jobDress === "function")
jobDress(L, "Town crier", "The Tower Plaza");
}
catch (e) { }
L.topColor = 0x8A1C24;
L.backColor = 0x8A1C24;
L.trimColor = 0xE0B060;
var g = buildFigure({ id: "__tncrier", archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
var bell = new THREE.Group(), bm = new THREE.MeshLambertMaterial({ color: 0xC8A040 });
var cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.11, 0.16, 10, 1, true), bm);
bell.add(cup);
var hd = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.16, 6), new THREE.MeshLambertMaterial({ color: 0x4A2E1A }));
hd.position.y = 0.15;
bell.add(hd);
bell.position.set(0.32, 1.05, 0.12);
g.add(bell);
var y = terrainY(spot.x, spot.z);
g.position.set(spot.x, y, spot.z);
g.rotation.y = a;
g.userData.noCull = 1;
scene.add(g);
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tnBubbleTex("Hear ye!"), transparent: true, depthWrite: false }));
sp.scale.set(2.6, 0.82, 1);
sp.position.set(0, 2.55, 0);
sp.visible = false;
g.add(sp);
TN.crier = { g: g, x: spot.x, z: spot.z, bell: bell, sp: sp, t: 0, line: null, ring: 0 };
TN.bubble = sp;
}
function tnCall() { return __ZC(210, 3, this, arguments, new.target); }
function tnTick(dt) {
if (!(typeof inCityNow === "function" && inCityNow()) || (typeof store !== "undefined" && store.inside)) {
if (TN.crier)
TN.crier.g.visible = false;
if (TN.board)
TN.board.g.visible = false;
return;
}
tnBoardPlace();
tnCrierPlace();
if (TN.board)
TN.board.g.visible = true;
var C = TN.crier;
if (!C)
return;
C.g.visible = true;
var P = camera.position, d = Math.hypot(P.x - C.x, P.z - C.z);
if (d < 25) {
var want = Math.atan2(P.x - C.x, P.z - C.z), cur = C.g.rotation.y, df = ((want - cur + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
C.g.rotation.y = cur + df * Math.min(1, dt * 2);
}
if (C.ring > 0) {
C.ring -= dt;
C.bell.rotation.z = Math.sin(C.ring * 9) * 0.5 * Math.min(1, C.ring);
}
else
C.bell.rotation.z = 0;
C.t -= dt;
if (d < 14 && C.t <= 0) {
C.t = 28;
tnCall();
}
if (d > 30 && C.sp.visible) {
C.sp.visible = false;
}
}
setInterval(function () { try {
tnTick(0.25);
}
catch (e) {
if (window.console && !TN.warned) {
TN.warned = 1;
console.warn("[tonight]", e);
}
} }, 250);
setInterval(function () { if (typeof signedIn === "function" && signedIn() && typeof inCityNow === "function" && inCityNow() && !TN.busy && (!TN.at || Date.now() - TN.at > 60000))
tnLoad(); }, 5000);
setInterval(function () { try {
tnBoardDraw();
}
catch (e) { } }, 30000);
