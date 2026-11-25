/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MALL = { on: false, g: null, units: [], stores: [], at: 0, near: null, station: null, cx: -120000, cz: 0, A: 110, B: 62, open: false };
var MALL_UNITS = 40;
var MALL_STOP = { key: "World Mall", name: "World Mall", ring: "mall", arrive: function () { mallEnter(); } };
function mallStoresLoad(force) { return __ZC(100, 0, this, arguments, new.target); }
function mallStoreAt(unit) { return (MALL.stores || []).filter(function (s) { return s.unit === unit; })[0] || null; }
function mallTex(text, sub, col) { return __ZC(100, 1, this, arguments, new.target); }
function mallBuild() { return __ZC(100, 2, this, arguments, new.target); }
function mallSigns() { return __ZC(100, 3, this, arguments, new.target); }
function mallEnter() { return __ZC(100, 4, this, arguments, new.target); }
function mallLeave() { MALL.on = false; if (MALL.g)
MALL.g.visible = false; mallClose(); var mb = document.getElementById("mall-mine"); if (mb)
mb.style.display = "none"; if (MALL.lit && typeof tickClock === "function") {
MALL.lit = false;
tickClock(true);
} }
(function () {
if (typeof ugArrive !== "function")
return;
var ua = ugArrive;
ugArrive = function (to) { if (to && to.ring !== "mall" && MALL.on)
mallLeave(); return ua(to); };
})();
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (MALL.on && !store.inside && Math.abs(x - MALL.cx) < 400 && Math.abs(z - MALL.cz) < 400)
return mdBlocked(x - MALL.cx, z - MALL.cz, feet);
return ba(x, z, feet);
};
if (typeof supportAt !== "function")
return;
var sa = supportAt;
supportAt = function (x, z, feet) {
if (MALL.on && !store.inside && Math.abs(x - MALL.cx) < 400 && Math.abs(z - MALL.cz) < 400)
return mdSupport(x - MALL.cx, z - MALL.cz, feet);
return sa.apply(this, arguments);
};
})();
function mallEl() { return __ZC(100, 5, this, arguments, new.target); }
function mallOpen(u) { return __ZC(100, 6, this, arguments, new.target); }
function mallMine(back) { return __ZC(100, 7, this, arguments, new.target); }
function mallClose() { MALL.open = false; var el = document.getElementById("mall"); if (el) {
el.style.display = "none";
el.style.borderColor = "";
} }
(function () {
var m = (typeof location !== "undefined") && /[?&]mall=(\d+)/.exec(location.search || "");
if (!m)
return;
var unit = +m[1], tries = 0;
(function go() {
if (typeof scene === "undefined" || !scene || typeof setWalk !== "function") {
if (tries++ < 60)
setTimeout(go, 300);
return;
}
setWalk(true);
mallEnter();
mallStoresLoad(true).then(function () {
var u = MALL.units[unit - 1];
if (!u)
return;
camera.position.set(u.x - u.nx * 0 + u.nx * -5.5, 1.72 + (u.y || 0), u.z + u.nz * -5.5);
if (typeof flyY !== "undefined")
flyY = u.y || 0;
yaw = Math.atan2(u.nx, u.nz) + Math.PI;
pitch = 0;
var st = mallStoreAt(unit);
setStatus(st ? ("<b>" + esc(st.name) + "</b> is right in front of you. Press <b>Enter</b> or tap to step in.") : "The World Mall.");
});
})();
})();
function mallTick(dt) {
if (!MALL.on)
return;
try {
mdTick(dt || 0.016);
}
catch (e) { }
if (!walkMode) {
var mb0 = document.getElementById("mall-mine");
if (mb0)
mb0.style.display = "none";
return;
}
if (scene && scene.fog)
scene.fog.density = Math.min(scene.fog.density, 0.002);
if (typeof sun !== "undefined" && sun)
sun.intensity = Math.min(sun.intensity, 0.3);
if (typeof hemi !== "undefined" && hemi)
hemi.intensity = Math.max(0.35, Math.min(hemi.intensity, 0.55));
MALL.lit = true;
if (MALL.jet) {
MALL.jet.scale.y = 1 + Math.sin(performance.now() / 600) * 0.06;
}
var P = camera.position, pr = document.getElementById("mall-prompt") || (mallEl(), document.getElementById("mall-prompt"));
var near = null;
MALL.units.forEach(function (u) { if (Math.hypot(u.x - P.x, u.z - P.z) < 6.5 && Math.abs(P.y - 1.72 - (u.y || 0)) < 2.5)
near = u; });
var atStation = MALL.station && Math.hypot(MALL.station.x - P.x, MALL.station.z - P.z) < 6;
MALL.near = near;
var mb = document.getElementById("mall-mine");
if (mb)
mb.style.display = (MALL.open || !(typeof signedIn === "function" && signedIn())) ? "none" : "block";
if (MALL.open || (typeof ugOpen !== "undefined" && ugOpen)) {
pr.style.display = "none";
return;
}
if (atStation) {
pr.innerHTML = "<b>World Mall</b> Underground · booking office · " + (typeof ugFareWords === "function" ? ugFareWords() : "1 gold a ride") + " · <b>press U</b> or tap";
pr.style.display = "block";
pr.onclick = function () { ugShow({ key: "World Mall", name: "World Mall", ring: "mall" }); };
MALL.atStation = true;
return;
}
MALL.atStation = false;
var lift = !near && !MD.ride ? mdLiftNear() : null;
MALL.lift = lift;
if (near) {
var s = mallStoreAt(near.i);
pr.innerHTML = s ? ("<b>" + esc(s.name) + "</b> · press <b>Enter</b> or tap to step in") : ("Unit " + near.i + " · to let");
pr.style.display = "block";
pr.onclick = function () { mallOpen(near); };
}
else if (lift) {
pr.innerHTML = "<b>Glass lift</b> · to the other floors · press <b>Enter</b> or tap";
pr.style.display = "block";
pr.onclick = function () { mdLiftMenu(lift); };
}
else
pr.style.display = "none";
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!MALL.on || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "Enter" && MALL.near && !MALL.open) {
e.preventDefault();
mallOpen(MALL.near);
}
else if (e.code === "Enter" && MALL.lift && !MALL.open && !MD.ride) {
e.preventDefault();
mdLiftMenu(MALL.lift);
}
if (e.code === "KeyU" && MALL.atStation && !(typeof ugOpen !== "undefined" && ugOpen)) {
e.preventDefault();
ugShow({ key: "World Mall", name: "World Mall", ring: "mall" });
}
if (e.code === "Escape" && MALL.open)
mallClose();
});
