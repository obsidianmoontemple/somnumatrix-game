/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(254, function () {
"use strict";
return [
function (n) {
var a0 = SECTOR_A0 + (n - 1) * SECTOR_W, radii = [];
Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (rs) { radii.push(rs); }); });
radii.sort(function (p, q) { return p - q; });
var pts = [];
radii.forEach(function (rs, j) {
var row = [];
for (var i = 1; i <= 4; i++) {
var a = a0 + SECTOR_W * i / 5;
row.push({ x: ATLC.x + Math.cos(a) * rs, z: ATLC.z + Math.sin(a) * rs, name: (typeof corpRingNameAt === "function" ? corpRingNameAt(rs) : "") });
}
if (j % 2)
row.reverse();
pts = pts.concat(row);
});
return pts.concat(pts.slice(1, -1).reverse());
},
function (mode, opt) {
opt = opt || {};
if (!faFlying()) {
setStatus("<b>Autopilot</b> is for flying: mount your dragon, broom or carpet first.");
return false;
}
var D = DRIVE, P = camera.position;
if (D.test && D.test.active) {
setStatus("<b>Not on a test.</b> The examiner wants to see you fly it yourself.");
return false;
}
if ((mode === "sector" || mode === "stops") && !faInCity()) {
setStatus("Sectors and patrols are Somnucor's. Here the autopilot can circle.");
return false;
}
if (mode === "stops" && !faStops()) {
setStatus("<b>No patrol under way.</b> Start one from your work panel, or patrol a sector.");
return false;
}
var A = FLYAUTO;
A.on = true;
A.mode = mode;
A.bumps = D.bumps;
A.lift = 0;
A.i = 0;
A.pts = null;
A.alt = Math.max(D.alt > 8 ? D.alt : 0, mode === "circle" ? 30 : 55);
if (mode === "circle") {
A.r = opt.r || 70;
A.dir = 1;
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), rx = -fz, rz = fx;
A.cx = P.x + rx * A.r;
A.cz = P.z + rz * A.r;
}
else if (mode === "sector") {
A.sec = opt.sec || faMySector();
A.pts = faSectorPts(A.sec);
var best = 0, bd = 1e12;
A.pts.forEach(function (p, i) { var d = Math.hypot(p.x - P.x, p.z - P.z); if (d < bd) {
bd = d;
best = i;
} });
A.i = best;
}
faPaint();
setStatus("<b>Autopilot: " + faWhat() + ".</b> Touch the controls to take the reins back.");
return true;
},
function () {
var A = FLYAUTO, P = camera.position;
if (A.mode === "circle") {
var a = Math.atan2(P.z - A.cz, P.x - A.cx) + A.dir * 0.45;
return { x: A.cx + Math.cos(a) * A.r, z: A.cz + Math.sin(a) * A.r, cruise: 16 };
}
if (A.mode === "sector") {
var p = A.pts[A.i];
if (!p)
return null;
if (Math.hypot(p.x - P.x, p.z - P.z) < 25) {
A.i = (A.i + 1) % A.pts.length;
p = A.pts[A.i];
}
return { x: p.x, z: p.z, cruise: 22 };
}
if (A.mode === "stops") {
var B = faStops();
if (!B) {
faStop("Your patrol is done.");
return null;
}
var s = B.stops[B.i], d = Math.hypot(s.x - P.x, s.z - P.z);
return { x: s.x, z: s.z, cruise: d < 6 ? 0 : Math.min(22, Math.max(4, d * 0.35)), hold: d < 6 };
}
return null;
},
function (P, t) {
var T = (typeof towerSpot === "function") ? towerSpot() : null;
if (!T || typeof NOFLY_R === "undefined")
return t;
var R = NOFLY_R + 70, dx = t.x - P.x, dz = t.z - P.z, L2 = dx * dx + dz * dz || 1;
var k = Math.max(0, Math.min(1, ((T.x - P.x) * dx + (T.z - P.z) * dz) / L2)), cx = P.x + dx * k - T.x, cz = P.z + dz * k - T.z;
if (Math.hypot(cx, cz) > R)
return t;
var a = Math.atan2(P.z - T.z, P.x - T.x), at = Math.atan2(t.z - T.z, t.x - T.x), s = faWrap(at - a) > 0 ? 1 : -1, a2 = a + s * 0.6;
return { x: T.x + Math.cos(a2) * (R + 20), z: T.z + Math.sin(a2) * (R + 20), cruise: t.cruise, hold: false };
},
function (inp) {
var A = FLYAUTO, D = DRIVE, P = camera.position, F = FLYER[D.arch] || { vmax: 20, acc: 5 };
if (D.test && D.test.active) {
faStop("A test is flown by you.");
return inp;
}
var t = faAim();
if (!t)
return inp;
t = faDetour(P, t);
if (D.bumps > A.bumps) {
A.bumps = D.bumps;
A.lift = Math.min(160, A.lift + 20);
}
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), fy = (typeof flyY === "number") ? flyY : P.y;
var ahead = typeof blockedAt === "function" && (blockedAt(P.x + fx * 14, P.z + fz * 14, fy) || blockedAt(P.x + fx * 28, P.z + fz * 28, fy));
if (ahead)
A.lift = Math.min(160, A.lift + 0.5);
else if (A.lift > 0)
A.lift = Math.max(0, A.lift - 0.05);
var want = Math.atan2(-(t.x - P.x), -(t.z - P.z)), diff = faWrap(want - D.h);
var s = Math.max(-1, Math.min(1, -diff * 1.6));
var cruise = Math.min(F.vmax * 0.7, t.cruise) * (Math.abs(diff) > 1.2 ? 0.5 : 1) * (ahead ? 0.4 : 1);
var f = (typeof touchRig !== "undefined" && touchRig) ? Math.max(0, Math.min(1, cruise / F.vmax)) : Math.max(-1, Math.min(1, (cruise - D.v) / 3));
if (t.hold && !(typeof touchRig !== "undefined" && touchRig))
f = Math.max(-1, Math.min(1, -D.v / 2));
var c = Math.max(-1, Math.min(1, (A.alt + A.lift - D.alt) / 6));
if (ahead)
c = 1;
return { f: f, s: t.hold ? 0 : s, kb: false, hand: false, up: c > 0.1, down: c < -0.1, c: c, auto: true };
},
function () {
var m = document.getElementById("fa-menu");
if (!FLYAUTO.menu || !faFlying()) {
if (m)
m.style.display = "none";
return;
}
if (!m) {
m = document.createElement("div");
m.id = "fa-menu";
m.style.cssText = "position:fixed;z-index:60;left:50%;transform:translateX(-50%);bottom:calc(230px + env(safe-area-inset-bottom,0px));" +
"width:min(360px,calc(100vw - 32px));background:rgba(10,12,18,.96);border:1px solid rgba(201,168,104,.5);border-radius:6px;" +
"padding:10px 12px;color:var(--bone,#C9BEA8);font-family:var(--sans);font-size:13px;box-shadow:0 8px 30px rgba(0,0,0,.5)";
var fire = function (ev) {
var t = ev.target && ev.target.closest ? ev.target.closest("[data-fa]") : null;
if (!t)
return;
ev.preventDefault();
ev.stopPropagation();
var k = t.getAttribute("data-fa");
if (k === "close") {
FLYAUTO.menu = false;
return faPaintMenu();
}
if (k === "off") {
faStop("You have the reins.");
FLYAUTO.menu = false;
return faPaintMenu();
}
var ok = false;
if (k === "circle")
ok = faStart("circle");
else if (k === "stops")
ok = faStart("stops");
else if (k === "sector") {
var sel = document.getElementById("fa-sec");
ok = faStart("sector", { sec: sel ? +sel.value : faMySector() });
}
if (ok) {
FLYAUTO.menu = false;
faPaintMenu();
}
};
m.addEventListener("click", fire);
m.addEventListener("touchend", fire, { passive: false });
m.addEventListener("keydown", function (e) { e.stopPropagation(); });
document.body.appendChild(m);
}
try {
var hd = document.getElementById("dhud"), R = hd && hd.getBoundingClientRect();
if (R && R.height) {
if (R.top < innerHeight / 2) {
m.style.top = Math.round(R.bottom + 8) + "px";
m.style.bottom = "auto";
}
else {
m.style.top = "auto";
m.style.bottom = Math.round(innerHeight - R.top + 8) + "px";
}
}
}
catch (e) { }
var city = faInCity(), mine = faMySector(), corp = typeof CORP !== "undefined" && CORP.data;
var row = function (k, label, note) { return '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:7px"><span>' + note + '</span><button class="btn" data-fa="' + k + '" style="min-height:34px;white-space:nowrap">' + label + '</button></div>'; };
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b>Autopilot</b><button class="btn" data-fa="close">Close</button></div>' +
'<div style="color:var(--dim);margin-top:4px;font-size:12px">It flies; you watch. Touch the controls at any time to take the reins back.</div>';
h += row("circle", "Circle", "Circle the spot below you, at your height");
if (city) {
var opts = "";
for (var n = 1; n <= 8; n++)
opts += '<option value="' + n + '"' + (n === mine ? " selected" : "") + '>' + esc(faSectorName(n)) + (corp && n === CORP.data.sector ? " (yours)" : "") + '</option>';
h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:7px"><span>Patrol <select id="fa-sec" style="max-width:150px">' + opts + '</select></span><button class="btn" data-fa="sector" style="min-height:34px">Patrol</button></div>';
if (faStops())
h += row("stops", "Fly it", "Fly the patrol you are working, stop by stop (press E at each)");
}
if (FLYAUTO.on)
h += row("off", "Stop", "Now: " + esc(faWhat()));
m.innerHTML = h;
m.style.display = "block";
}
];
});
