/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PT = { d: null, open: false, tab: "mine", say: "", name: "", kind: "dog", colour: "#A07850", mine: null, mineKey: "", mounts: {}, loadedAt: 0, busy: false, warned: 0, last: 0, hungryTold: {} };
var PT_KINDS = [["dog", "Dog", "🐕"], ["cat", "Cat", "🐈"], ["fox", "Fox", "🦊"], ["owl", "Owl", "🦉"], ["rabbit", "Rabbit", "🐇"], ["hedgehog", "Hedgehog", "🦔"], ["moth", "Dream moth", "🦋"], ["sprite", "Lantern sprite", "🏮"], ["dragonling", "Dragonling", "🐉"]];
var PT_FLY = { owl: 1, moth: 1, sprite: 1, dragonling: 1 };
var PT_MOUNTS = ["horse", "unicorn", "pegasus", "stag", "camel", "elephant", "griffin", "hippogriff", "dragon"];
var PT_COLOURS = { dog: ["#A07850", "#2A2420", "#E8DCC8", "#C89040", "#6A4A30"], cat: ["#E8A050", "#2A2A2E", "#D8D0C4", "#8A8A90", "#6A4A30"], fox: ["#D86A28", "#B8B0A8", "#2A2420", "#E89048"],
owl: ["#9A7A52", "#E8E2D8", "#6A5A48", "#C8A070"], rabbit: ["#B89878", "#F2EEE6", "#5A4A3C", "#8A8A88"], hedgehog: ["#7A6048", "#B8A080", "#4A3A2C"],
moth: ["#A27AE8", "#7AB8F0", "#E8A0D8", "#F0D080"], sprite: ["#F0C060", "#A0E0F0", "#F0A0C0", "#B0F0A0"], dragonling: ["#3A9A5A", "#B83A2A", "#3A5AB8", "#D8B030", "#6A3A9A"] };
var PT_G = {};
function ptGeo(k, f) { return PT_G[k] || (PT_G[k] = f()); }
function ptMat(c, glow) { var m = new THREE.MeshLambertMaterial({ color: c }); if (glow) {
m.emissive = new THREE.Color(c);
m.emissiveIntensity = glow;
} return m; }
function ptBall(m, r, sx, sy, sz, x, y, z) { var s = new THREE.Mesh(ptGeo("ball", function () { return new THREE.SphereGeometry(1, 14, 10); }), m); s.scale.set(r * sx, r * sy, r * sz); s.position.set(x, y, z); return s; }
function ptCone(m, r, h, x, y, z, rx, rz) { var s = new THREE.Mesh(ptGeo("cone", function () { return new THREE.ConeGeometry(1, 1, 8); }), m); s.scale.set(r, h, r); s.position.set(x, y, z); s.rotation.set(rx || 0, 0, rz || 0); return s; }
function ptRod(m, r, h, x, y, z, rx, rz) { var s = new THREE.Mesh(ptGeo("rod", function () { return new THREE.CylinderGeometry(1, 0.8, 1, 8); }), m); s.scale.set(r, h, r); s.position.set(x, y, z); s.rotation.set(rx || 0, 0, rz || 0); return s; }
function ptLeg(g, m, x, y, z, len, r, paw) {
var hip = new THREE.Group();
hip.position.set(x, y, z);
hip.add(ptRod(m, r, len, 0, -len / 2, 0));
if (paw)
hip.add(ptBall(paw, r * 1.25, 1, 0.6, 1.4, 0, -len, r * 0.4));
g.add(hip);
(g.userData.legs = g.userData.legs || []).push(hip);
return hip;
}
function ptWing(g, m, side, x, y, z, w, d, shape) { return __ZC(224, 0, this, arguments, new.target); }
function ptEyes(g, x, y, z, r, col) { var e = ptMat(col || 0x101010); g.add(ptBall(e, r, 1, 1, 1, -x, y, z)); g.add(ptBall(e, r, 1, 1, 1, x, y, z)); }
function ptShade(hex, f) { var c = new THREE.Color(hex); c.multiplyScalar(f); return c; }
function ptBuild(kind, colour) { return __ZC(224, 1, this, arguments, new.target); }
function ptAnimate(g, dt, speed) { return __ZC(224, 2, this, arguments, new.target); }
function ptOut() { var ps = (PT.d && PT.d.pets) || []; for (var i = 0; i < ps.length; i++)
if (ps[i].out && !ps[i].sheltered)
return ps[i]; return null; }
function ptLookSync() {
var p = ptOut(), L = typeof meLook === "function" ? meLook() : null;
if (!L)
return;
var want = p ? { k: p.kind, c: p.colour, n: p.name } : null;
if (JSON.stringify(L.pet || null) === JSON.stringify(want))
return;
if (want)
L.pet = want;
else
delete L.pet;
if (typeof publishMyLook === "function")
publishMyLook();
}
function ptMineTick(dt) {
var p = ptOut(), key = p ? (p.id + "|" + p.kind + "|" + p.colour) : "";
if (key !== PT.mineKey) {
if (PT.mine && PT.mine.parent)
PT.mine.parent.remove(PT.mine);
PT.mine = null;
PT.mineKey = key;
if (p && typeof scene !== "undefined" && scene) {
PT.mine = ptBuild(p.kind, p.colour);
PT.mine.visible = false;
scene.add(PT.mine);
}
}
var g = PT.mine;
if (!g)
return;
var show = typeof walkMode !== "undefined" && walkMode && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on);
g.visible = show;
if (!show) {
g.userData.placed = false;
return;
}
var P = camera.position, feet = P.y - 1.72, fy = -Math.sin(yaw), fz = -Math.cos(yaw);
var tx = P.x + fy * 2.1 - fz * 1.1, tz = P.z + fz * 2.1 + fy * 1.1;
var u = g.userData, d = Math.hypot(tx - g.position.x, tz - g.position.z);
if (!u.placed || d > 30 || Math.abs(g.position.y - feet) > 8) {
g.position.set(tx, feet, tz);
u.placed = true;
d = 0;
}
var sp = 0;
if (d > 0.25) {
var step = Math.min(d, Math.max(2.2, d * 2.6) * dt);
g.position.x += (tx - g.position.x) / d * step;
g.position.z += (tz - g.position.z) / d * step;
sp = step / Math.max(dt, 0.001);
var want = Math.atan2(tx - g.position.x, tz - g.position.z), cur = g.rotation.y, dd = Math.atan2(Math.sin(want - cur), Math.cos(want - cur));
g.rotation.y = cur + dd * Math.min(1, dt * 8);
}
else {
var face = Math.atan2(P.x - g.position.x, P.z - g.position.z), c2 = g.rotation.y, d2 = Math.atan2(Math.sin(face - c2), Math.cos(face - c2));
g.rotation.y = c2 + d2 * Math.min(1, dt * 2);
}
if (u.fly)
g.position.y += (feet + 1.55 - g.position.y) * Math.min(1, dt * 4);
else {
var sup = typeof supportAt === "function" ? supportAt(g.position.x, g.position.z, g.position.y + 0.3) : feet;
if (!(typeof standFall !== "undefined" && standFall > 0) && Math.abs(sup - feet) > 2.5)
sup = feet;
g.position.y += (sup - g.position.y) * Math.min(1, dt * 10);
}
ptAnimate(g, dt, sp);
}
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg(row), pt = row && !row.away && row.look && row.look.pet;
if (pt && PT_KINDS.some(function (k) { return k[0] === pt.k; })) {
try {
var c = /^#[0-9A-Fa-f]{6}$/.test(String(pt.c || "")) ? pt.c : "#A07850", v = ptBuild(pt.k, c);
v.position.set(0.85, PT_FLY[pt.k] ? 1.5 : 0, -0.5);
g.add(v);
g.userData.ptPet = v;
}
catch (e) { }
}
return g;
};
})();
function ptOthersTick(dt) {
if (typeof presenceOthers === "undefined")
return;
for (var id in presenceOthers) {
var p = presenceOthers[id], g = p && p.group, v = g && g.userData.ptPet;
if (!v)
continue;
var last = v.userData.lastAt, mv = last ? Math.hypot(g.position.x - last.x, g.position.z - last.z) / Math.max(dt, 0.001) : 0;
v.userData.lastAt = { x: g.position.x, z: g.position.z };
ptAnimate(v, dt, mv);
}
}
function ptMountOf(name) { var t = (typeof myThings !== "undefined" ? myThings : []).filter(function (x) { return x.name === name; })[0]; return t && PT_MOUNTS.indexOf(t.archetype) >= 0 ? t.archetype : null; }
function ptMountFood(k) { var m = PT.mounts[k]; return m ? m.food : 100; }
(function () {
if (typeof ride !== "function")
return;
var rd = ride;
ride = function (name) {
rd(name);
var k = name && typeof riding !== "undefined" && riding ? ptMountOf(name) : null;
if (k && ptMountFood(k) < 20 && rideSpeed > 1) {
rideSpeed = 1 + (rideSpeed - 1) * 0.6;
setStatus("<b>Your " + esc(k) + " is hungry</b> and goes slowly. Feed it in ☰ Menu → 🐾 Pets and mounts (" + rideSpeed.toFixed(1) + " times your pace for now).");
}
};
})();
function ptErr(e) { return __ZC(224, 3, this, arguments, new.target); }
function ptLoad(quiet) {
if (!(typeof signedIn === "function" && signedIn())) {
PT.d = { ok: false, say: "Sign in to adopt a pet." };
if (!quiet)
ptPaint();
return Promise.resolve();
}
if (PT.busy)
return Promise.resolve();
PT.busy = true;
return cityRpc("pets_board", {}).then(function (o) {
PT.d = o;
PT.mounts = {};
((o && o.mounts) || []).forEach(function (m) { PT.mounts[m.kind] = m; });
ptLookSync();
ptHungerNudge();
}).catch(function (e) { if (!quiet)
PT.d = { ok: false, say: ptErr(e) }; }).then(function () { PT.busy = false; PT.loadedAt = Date.now(); if (!quiet || PT.open)
ptPaint(); });
}
function ptHungerNudge() { return __ZC(224, 4, this, arguments, new.target); }
function ptBtn(a, label, extra) { return "<button class='btn' data-pt='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0'>" + label + "</button>"; }
function ptBar(label, v) { return __ZC(224, 5, this, arguments, new.target); }
function ptKindName(k) { for (var i = 0; i < PT_KINDS.length; i++)
if (PT_KINDS[i][0] === k)
return PT_KINDS[i]; return [k, k, "🐾"]; }
function ptHtml() { return __ZC(224, 6, this, arguments, new.target); }
function ptPaint() { return __ZC(224, 7, this, arguments, new.target); }
function ptAct(name, body, after) {
return cityRpc(name, body).then(function (o) { PT.say = (o && o.say) || ""; if (after)
after(o); }).catch(function (e) { PT.say = ptErr(e); }).then(function () { PT.busy = false; return ptLoad(); });
}
function ptClick(e) { return __ZC(224, 8, this, arguments, new.target); }
function ptOpen(tab) { PT.open = true; PT.say = ""; if (tab)
PT.tab = tab;
else if (PT.d && PT.d.ok && !(PT.d.pets || []).length)
PT.tab = "shelter"; ptPaint(); ptLoad(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
var MBK = { open: false, tab: "firsts", d: null, say: "", photos: null, urls: [] };
function mbkStars() { try {
return JSON.parse(localStorage.getItem("sm.memory.stars") || "{}") || {};
}
catch (e) {
return {};
} }
function mbkStar(n, on) { var s = mbkStars(); if (on)
s[n] = 1;
else
delete s[n]; try {
localStorage.setItem("sm.memory.stars", JSON.stringify(s));
}
catch (e) { } }
function mbkDb() { return __ZC(224, 9, this, arguments, new.target); }
function mbkPhotos() { return __ZC(224, 10, this, arguments, new.target); }
function mbkKeep(blob, note) { return __ZC(224, 11, this, arguments, new.target); }
function mbkDrop(id) {
return mbkDb().then(function (db) { return new Promise(function (res) { var tx = db.transaction("photos", "readwrite"); tx.objectStore("photos").delete(id); tx.oncomplete = res; tx.onerror = res; }); });
}
(function () {
if (typeof pmPreview !== "function")
return;
var pv = pmPreview;
pmPreview = function (blob, c) {
pv(blob, c);
var el = document.getElementById("pm-shot"), row = el && el.querySelector("div");
if (!row)
return;
var b = document.createElement("button");
b.className = "btn";
b.textContent = "📖 Keep in my memory book";
b.onclick = function (e) {
e.stopPropagation();
b.disabled = true;
mbkKeep(blob, (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && (INT.spec.label || INT.spec.name)) || "").then(function () { b.textContent = "📖 Kept"; MBK.photos = null; })
.catch(function (er) { b.disabled = false; b.textContent = String(er && er.message || er).slice(0, 80); });
};
row.appendChild(b);
};
})();
function mbkDate(ms) { try {
return new Date(+ms).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}
catch (e) {
return "";
} }
function mbkLoad() { return __ZC(224, 12, this, arguments, new.target); }
function mbkTab(k, label) { return "<button class='btn' data-mb='tab' data-t='" + k + "' style='margin:0 4px 4px 0;" + (MBK.tab === k ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + label + "</button>"; }
function mbkHtml() { return __ZC(224, 13, this, arguments, new.target); }
function mbkPaint() { return __ZC(224, 14, this, arguments, new.target); }
function mbkOpen(tab) { MBK.open = true; MBK.say = ""; MBK.photos = null; if (tab)
MBK.tab = tab; mbkPaint(); mbkLoad(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function") {
backRegister({ order: 2, open: function () { return PT.open; }, close: function () { PT.open = false; ptPaint(); } });
backRegister({ order: 2, open: function () { return MBK.open; }, close: function () { MBK.open = false; mbkPaint(); } });
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
var after = document.getElementById("me-art") || document.getElementById("me-rep");
[["me-pets", "🐾 Pets and mounts", "Adopt a pet, care for it, and feed your mounts", function () { ptOpen(); }],
["me-memory", "📖 Memory book", "Your firsts, best dreams, photos, friends and treasures", function () { mbkOpen(); }]].forEach(function (d) {
if (document.getElementById(d[0]))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = d[0];
b.textContent = d[1];
b.title = d[2];
b.onclick = d[3];
if (after && after.parentNode === bar && after.nextSibling)
bar.insertBefore(b, after.nextSibling);
else
bar.appendChild(b);
after = b;
});
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
(function () {
var last = 0;
function frame(t) {
requestAnimationFrame(frame);
var dt = last ? Math.min(0.1, (t - last) / 1000) : 0.016;
last = t;
if (document.hidden || typeof camera === "undefined" || !camera)
return;
try {
ptMineTick(dt);
ptOthersTick(dt);
}
catch (e) {
if (!PT.warned && window.console) {
PT.warned = 1;
console.warn("[pets]", e);
}
}
}
requestAnimationFrame(frame);
setInterval(function () {
if (document.hidden || !(typeof signedIn === "function" && signedIn()))
return;
if (Date.now() - PT.loadedAt > (PT.open ? 30000 : 180000))
ptLoad(true);
}, 5000);
})();
