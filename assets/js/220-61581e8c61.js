/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NTC = { open: false, kind: "", b: null, at: 0, busy: false, say: "", write: false, form: { kind: "sale", title: "", body: "", place: "", days: 7 }, boards: [], tried: {}, promptKey: null, warned: 0 };
var NTC_KIND = { job: ["💼", "Jobs"], sale: ["🏷️", "For sale"], meetup: ["🤝", "Meet-ups"], lost: ["❓", "Lost"], found: ["🔎", "Found"], other: ["📌", "Other"] };
function ntcLoad(force) {
if (NTC.busy || (!force && Date.now() - NTC.at < 60000) || typeof cityRpc !== "function")
return;
NTC.busy = true;
NTC.at = Date.now();
cityRpc("notice_board", { p_kind: "" }).then(function (o) { if (o && o.ok) {
NTC.b = o;
ntcBoardsDraw();
} }).catch(function () { }).then(function () { NTC.busy = false; ntcPaint(); });
}
function ntcAct(name, args, then) {
NTC.say = "…";
ntcPaint();
cityRpc(name, args).then(function (o) { NTC.say = (o && o.say) || ""; if (then)
then(o); NTC.busy = false; ntcLoad(true); })
.catch(function () { NTC.say = "That did not go through. Try again in a moment."; ntcPaint(); });
}
function ntcAgo(iso) { var m = Math.round((Date.now() - new Date(iso).getTime()) / 60000); return m < 2 ? "just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) === 1 ? "a day ago" : Math.round(m / 1440) + " days ago"; }
function ntcMessage(id, name) { return __ZC(220, 0, this, arguments, new.target); }
function ntcBoardMake(x, z, rot) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 512;
var tex = new THREE.CanvasTexture(cv);
if (THREE.SRGBColorSpace)
tex.colorSpace = THREE.SRGBColorSpace;
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x6A4A2E }), cork = new THREE.MeshLambertMaterial({ color: 0xB08850 });
var face = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshBasicMaterial({ map: tex }));
face.position.set(0, 2.0, 0.07);
g.add(face);
var back = new THREE.Mesh(new THREE.BoxGeometry(2.45, 2.45, 0.1), cork);
back.position.set(0, 2.0, 0);
g.add(back);
var roof = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 0.5), wood);
roof.position.set(0, 3.3, 0.12);
roof.rotation.x = -0.18;
g.add(roof);
[-1, 1].forEach(function (s) { var post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.3, 0.14), wood); post.position.set(s * 1.18, 1.65, -0.02); g.add(post); });
g.position.set(x, terrainY(x, z), z);
g.rotation.y = rot;
g.userData.noCull = 1;
scene.add(g);
var B = { g: g, ctx: cv.getContext("2d"), tex: tex, x: x + Math.sin(rot) * 1.4, z: z + Math.cos(rot) * 1.4 };
NTC.boards.push(B);
ntcBoardDraw(B);
return B;
}
function ntcBoardDraw(B) {
var x = B.ctx, W = 512, H = 512, N = (NTC.b && NTC.b.notices || []).filter(function (n) { return !n.hidden; });
x.fillStyle = "#C8A070";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 140; i++) {
x.fillStyle = "rgba(90,60,30," + (0.08 + ((i * 37) % 10) / 100) + ")";
x.fillRect((i * 97) % W, (i * 53) % H, 3, 3);
}
x.fillStyle = "#2A1A10";
x.textAlign = "center";
x.font = "700 38px Georgia,serif";
x.fillText("Notices", W / 2, 46);
x.font = "17px sans-serif";
x.fillText(N.length ? "press E to read them all, or pin your own" : "Nothing pinned yet · press E to pin a notice", W / 2, 72);
var cols = ["#FFF6D8", "#E8F4FF", "#FFE8EC", "#EAFBE6", "#F5ECFF", "#FFF0E0"];
N.slice(0, 6).forEach(function (n, i) {
var cx = 22 + (i % 2) * 246, cy = 92 + Math.floor(i / 2) * 138, w = 224, h = 124, tilt = ((i * 7) % 5 - 2) * 0.012;
x.save();
x.translate(cx + w / 2, cy + h / 2);
x.rotate(tilt);
x.translate(-w / 2, -h / 2);
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(4, 5, w, h);
x.fillStyle = cols[i % cols.length];
x.fillRect(0, 0, w, h);
x.fillStyle = "#C0392B";
x.beginPath();
x.arc(w / 2, 8, 6, 0, 7);
x.fill();
x.fillStyle = "#2A2018";
x.textAlign = "left";
x.font = "bold 18px sans-serif";
var k = NTC_KIND[n.kind] || NTC_KIND.other, words = (k[0] + " " + n.title).split(" "), line = "", y = 34, lines = 0;
words.forEach(function (wd) { var t = line ? line + " " + wd : wd; if (x.measureText(t).width > w - 20 && lines < 2) {
x.fillText(line, 10, y);
y += 22;
line = wd;
lines++;
}
else
line = t; });
if (x.measureText(line).width > w - 20) {
while (line.length && x.measureText(line + "…").width > w - 20)
line = line.slice(0, -1);
line += "…";
}
x.fillText(line, 10, y);
x.font = "14px sans-serif";
x.fillStyle = "#5A4A3A";
x.fillText((n.by_name || "").slice(0, 22) + " · " + ntcAgo(n.at), 10, h - 12);
x.restore();
});
B.tex.needsUpdate = true;
}
function ntcBoardsDraw() { NTC.boards.forEach(ntcBoardDraw); }
function ntcPlaceTick() {
var cr = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!cr || (store.here || 0) !== cr.id)
return;
if (!NTC.tried.tn && typeof TN !== "undefined" && TN.board && TN.board.g) {
NTC.tried.tn = 1;
var T = TN.board, a = T.g.rotation.y, sx = Math.cos(a), sz = -Math.sin(a), spot = null;
[[3.2, 1], [-3.2, 1], [4.2, 1], [-4.2, 1], [3.2, -1.5], [-3.2, -1.5]].some(function (o) {
var bx = T.x + sx * o[0] + Math.sin(a) * o[1], bz = T.z + sz * o[0] + Math.cos(a) * o[1];
if (typeof dkFree !== "function" || dkFree(bx, bz, cr.id)) {
spot = { x: bx, z: bz };
return true;
}
return false;
});
if (spot)
ntcBoardMake(spot.x, spot.z, a);
}
if (!NTC.tried.row && typeof STL !== "undefined" && STL.row && typeof stlW === "function") {
NTC.tried.row = 1;
var V = STL.row, end = 4 * STL_PITCH + 4.2, sp = null;
[[end, 3.2], [-end, 3.2], [end, -3.2], [-end, -3.2]].some(function (o) { var q = stlW(V, o[0], o[1]); if (typeof dkFree !== "function" || dkFree(q.x, q.z, cr.id)) {
sp = { q: q, s: o[0] > 0 ? 1 : -1 };
return true;
} return false; });
if (sp)
ntcBoardMake(sp.q.x, sp.q.z, V.th + (sp.s > 0 ? Math.PI / 2 : -Math.PI / 2));
}
}
function ntcBoardNear() {
if (!(typeof inCityNow === "function" && inCityNow()) || (typeof store !== "undefined" && store.inside))
return null;
var P = camera.position;
for (var i = 0; i < NTC.boards.length; i++) {
var B = NTC.boards[i];
if (Math.hypot(P.x - B.x, P.z - B.z) < 2.6)
return B;
}
return null;
}
function ntcPromptTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var B = ntcBoardNear(), html = B ? "📌 <b>Notice board</b> · <b>press E</b> to read the notices, or pin your own" : null;
if (html !== NTC.promptKey) {
NTC.promptKey = html;
if (typeof worldPromptCity === "function")
worldPromptCity(html, html ? function () { ntcOpen(); } : null);
}
}
function ntcHtml() { return __ZC(220, 1, this, arguments, new.target); }
function ntcKeep() {
var F = NTC.form, v = function (id) { var e = document.getElementById(id); return e ? e.value : null; };
["kind", "title", "body", "place", "days"].forEach(function (k) { var x = v("ntc-" + k); if (x != null)
F[k] = k === "days" ? +x : x; });
}
function ntcPaint() {
var el = document.getElementById("ntc-box");
if (!NTC.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "ntc-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 32px));max-height:min(84vh,760px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", ntcClick);
document.body.appendChild(el);
}
if (el.style.display === "block" && NTC.write)
ntcKeep();
el.innerHTML = ntcHtml();
el.style.display = "block";
}
function ntcClick(e) { return __ZC(220, 2, this, arguments, new.target); }
function ntcOpen() { NTC.open = true; NTC.say = ""; ntcPaint(); ntcLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return NTC.open; }, close: function () { NTC.open = false; ntcPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-notices"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-notices";
b.title = "Jobs, sales, meet-ups, lost and found, pinned by dreamers";
b.textContent = "📌 Notices";
b.onclick = function () { ntcOpen(); };
var pk = document.getElementById("me-parties");
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
setInterval(function () {
try {
if (typeof inCityNow === "function" && inCityNow()) {
ntcPlaceTick();
if (NTC.boards.length)
ntcLoad(false);
}
ntcPromptTick();
}
catch (e) {
if (!NTC.warned && window.console) {
NTC.warned = 1;
console.warn("[notices]", e);
}
}
}, 1000);
