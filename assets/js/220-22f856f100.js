/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PTY = { open: false, tab: "invites", b: null, at: 0, busy: false, say: "", form: { lot: null, title: "", note: "", when: 0, hours: 3, friends: false, pick: {} }, dressed: null, warned: 0, told: {} };
var PTY_WHEN = [[0, "Now"], [30, "In half an hour"], [60, "In an hour"], [120, "In two hours"], [240, "In four hours"], [480, "In eight hours"], [1440, "Tomorrow, this time"], [2880, "In two days"], [10080, "In a week"]];
function ptyLoad(force) {
if (PTY.busy || (!force && Date.now() - PTY.at < 45000) || typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return;
PTY.busy = true;
PTY.at = Date.now();
cityRpc("party_board", {}).then(function (o) { if (o && o.ok) {
PTY.b = o;
ptyTell();
} }).catch(function () { }).then(function () { PTY.busy = false; ptyPaint(); });
}
function ptyAct(name, args, then) {
PTY.say = "…";
ptyPaint();
cityRpc(name, args).then(function (o) { PTY.say = (o && o.say) || ""; if (then)
then(o); PTY.busy = false; ptyLoad(true); if (typeof HL !== "undefined")
HL.at = 0; })
.catch(function () { PTY.say = "That did not go through. Try again in a moment."; ptyPaint(); });
}
function ptyWhen(p) { return __ZC(220, 0, this, arguments, new.target); }
function ptyWhere(p) { return esc(p.lot_name) + (p.quarter ? ", " + esc(p.quarter) : "") + (typeof hlWhere === "function" ? hlWhere(p.world) : ""); }
function ptyHere(name, world) {
var B = PTY.b;
if (!B)
return null;
var now = Date.now();
var all = (B.mine || []).concat(B.invites || []);
for (var i = 0; i < all.length; i++) {
var p = all[i];
if (p.lot_name !== name || (world && (p.world || "somnucor") !== world))
continue;
if (now < new Date(p.starts).getTime() - 15 * 60000 || now > new Date(p.ends).getTime())
continue;
if (!p.mine && p.rsvp === "no")
continue;
return p;
}
return null;
}
(function () {
if (typeof hlOpen !== "function")
return;
var ho = hlOpen;
hlOpen = function (name, world) { if (ho.apply(this, arguments))
return true; try {
return !!ptyHere(name, world);
}
catch (e) {
return false;
} };
})();
function ptyTell() {
var B = PTY.b;
if (!B)
return;
var now = Date.now();
(B.invites || []).forEach(function (p) {
var s = new Date(p.starts).getTime();
if (p.rsvp === "no" || PTY.told[p.id] || now < s || now > s + 20 * 60000)
return;
PTY.told[p.id] = 1;
if (typeof setStatus === "function")
setStatus("🎉 <b>" + esc(p.title) + "</b> has started at " + ptyWhere(p) + ". ☰ Menu → 🎉 Parties shows the way.");
});
}
function ptyGo(p) { return __ZC(220, 1, this, arguments, new.target); }
function ptyDressTick() {
var I = (typeof INT !== "undefined") ? INT : null, plot = null;
if (I && I.spec && typeof hlPlotOf === "function") {
try {
plot = hlPlotOf(I.spec);
}
catch (e) { }
}
var p = plot ? ptyHere(plot.name) : null;
if (p && new Date(p.starts).getTime() > Date.now())
p = null;
var key = p && I ? I.root.uuid + "|" + p.id : null;
if (key === (PTY.dressed && PTY.dressed.key))
return;
if (PTY.dressed) {
try {
PTY.dressed.root.remove(PTY.dressed.g);
}
catch (e) { }
PTY.dressed = null;
}
if (!key)
return;
var g = new THREE.Group(), W = I.W, D = I.D, H = Math.min(3.2, (I.spec && I.spec.inside && I.spec.inside.h) || 3.2);
var cols = [0xE85A6A, 0xF2C14E, 0x5AB0E8, 0x8AD07A, 0xC88AE8, 0xF29A5A], phone = typeof LITE !== "undefined" && !!LITE;
var sg = new THREE.SphereGeometry(0.24, phone ? 8 : 12, phone ? 6 : 10), str = new THREE.LineBasicMaterial({ color: 0xDDDDDD }), seen = {}, rooms = [];
(I.spots || []).forEach(function (s) { if ((s.level || 0) !== 0 || seen[s.room])
return; seen[s.room] = 1; rooms.push(s); });
if (!rooms.length)
rooms = [{ x: -W / 4, z: -D / 4 }, { x: W / 4, z: D / 4 }];
rooms.slice(0, phone ? 5 : 9).forEach(function (s, i) {
for (var k = 0; k < 3; k++) {
var b = new THREE.Mesh(sg, new THREE.MeshLambertMaterial({ color: cols[(i * 3 + k) % cols.length] }));
var x = s.x + 0.7 + (k - 1) * 0.24, z = s.z + 0.5 + ((k % 2) * 0.2), y = 1.75 + k * 0.16;
b.scale.y = 1.18;
b.position.set(x, y, z);
b.userData.bob = { y: y, ph: i + k * 1.7 };
g.add(b);
var lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, y - 0.28, z), new THREE.Vector3(s.x + 0.7, 0.95, s.z + 0.5)]);
g.add(new THREE.Line(lg, str));
}
});
var zs = rooms.map(function (s) { return s.z; }), z0 = Math.min.apply(null, zs) - 2, z1 = Math.max.apply(null, zs) + 3;
z0 = Math.max(z0, -D / 2 + 0.5);
z1 = Math.min(z1, D / 2 - 0.5);
var bulb = new THREE.SphereGeometry(0.05, 6, 4), warm = new THREE.MeshBasicMaterial({ color: 0xFFD9A0 }), flagG = new THREE.PlaneGeometry(0.24, 0.28);
[-0.9, 0.9].forEach(function (sx, si) {
var n = Math.max(6, Math.round((z1 - z0) / 0.8));
for (var i = 0; i <= n; i++) {
var t = i / n, z = z0 + t * (z1 - z0), y = H - 0.3 - Math.abs(Math.sin(t * Math.PI * 3)) * 0.3;
var bl = new THREE.Mesh(bulb, warm);
bl.position.set(sx, y, z);
g.add(bl);
if (i < n && i % 2 === si) {
var fl = new THREE.Mesh(flagG, new THREE.MeshBasicMaterial({ color: cols[i % cols.length], side: THREE.DoubleSide }));
fl.position.set(sx * 0.6, y - 0.2, z + (z1 - z0) / n / 2);
g.add(fl);
}
}
});
if (!phone) {
var pl = new THREE.PointLight(0xFFC890, 0.5, Math.max(W, D));
pl.position.set(0, H - 0.6, (z0 + z1) / 2);
g.add(pl);
}
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 96;
var x = cv.getContext("2d");
x.fillStyle = "#3A1A2A";
x.fillRect(0, 0, 512, 96);
x.fillStyle = "#F2E0B0";
x.textAlign = "center";
var t = "🎉 " + p.title, fs = 44;
x.font = "700 " + fs + "px Georgia,serif";
while (x.measureText(t).width > 480 && fs > 18) {
fs -= 2;
x.font = "700 " + fs + "px Georgia,serif";
}
x.fillText(t, 256, 62);
var tex = new THREE.CanvasTexture(cv);
if (THREE.SRGBColorSpace)
tex.colorSpace = THREE.SRGBColorSpace;
var bm = new THREE.MeshBasicMaterial({ map: tex }), bg = new THREE.PlaneGeometry(2.2, 0.42), bz = Math.max(z0 + 1, Math.min(z1 - 5, D / 2 - 7));
var b1 = new THREE.Mesh(bg, bm);
b1.position.set(0, H - 0.75, bz);
g.add(b1);
var b2 = new THREE.Mesh(bg, bm);
b2.position.set(0, H - 0.75, bz - 0.02);
b2.rotation.y = Math.PI;
g.add(b2);
I.root.add(g);
PTY.dressed = { key: key, root: I.root, g: g, p: p };
if (typeof setStatus === "function")
setStatus("🎉 <b>" + esc(p.title) + "</b> · " + (p.mine ? "your party" : "hosted by " + esc(p.host_name || "a dreamer")) + " · until " + new Date(p.ends).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ".");
}
function ptyBob(t) {
var D = PTY.dressed;
if (!D)
return;
D.g.children.forEach(function (m) { var b = m.userData.bob; if (b)
m.position.y = b.y + Math.sin(t * 0.0011 + b.ph) * 0.05; });
}
function ptyCard(p, host) { return __ZC(220, 2, this, arguments, new.target); }
function ptyHtml() { return __ZC(220, 3, this, arguments, new.target); }
function ptyKeep() { return __ZC(220, 4, this, arguments, new.target); }
function ptyPaint() {
var el = document.getElementById("pty-box");
if (!PTY.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "pty-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(500px,calc(100vw - 32px));max-height:min(84vh,760px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(26,16,28,.97),rgba(10,8,13,.98));border:1px solid #E8A0B0;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", ptyClick);
el.addEventListener("change", function (e) { if (e.target && e.target.id === "pty-friends") {
ptyKeep();
ptyPaint();
} });
document.body.appendChild(el);
}
if (el.style.display === "block")
ptyKeep();
el.innerHTML = ptyHtml();
el.style.display = "block";
}
function ptyFind(id) { var B = PTY.b; if (!B)
return null; return (B.mine || []).concat(B.invites || []).filter(function (p) { return p.id === id; })[0] || null; }
function ptyClick(e) { return __ZC(220, 5, this, arguments, new.target); }
function ptyOpen() { PTY.open = true; PTY.say = ""; if (PTY.b && (PTY.b.invites || []).length === 0 && (PTY.b.mine || []).length)
PTY.tab = "mine"; ptyPaint(); ptyLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return PTY.open; }, close: function () { PTY.open = false; ptyPaint(); } });
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
var B = PTY.b;
if (B) {
var now = Date.now();
(B.mine || []).concat((B.invites || []).filter(function (p) { return p.rsvp !== "no"; })).forEach(function (p) {
if (new Date(p.starts).getTime() - now > 12 * 3600000)
return;
rows.push(["🎉", "<b>" + esc(p.title) + "</b> · " + (p.mine ? "your party" : esc(p.host_name || "a friend") + "'s party") + " · " + ptyWhen(p) + " · " + ptyWhere(p), !!p.on]);
});
}
}
catch (e) { }
return rows;
};
})();
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-parties"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-parties";
b.title = "Throw a party at home, or answer an invitation";
b.textContent = "🎉 Parties";
b.onclick = function () { ptyOpen(); };
var pk = document.getElementById("me-city");
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
ptyLoad(false);
ptyTell();
ptyDressTick();
}
catch (e) {
if (!PTY.warned && window.console) {
PTY.warned = 1;
console.warn("[parties]", e);
}
}
}, 1500);
(function bob(t) { try {
ptyBob(t || 0);
}
catch (e) { } requestAnimationFrame(bob); })();
