/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(204, function () {
"use strict";
return [
function (W, list, P) {
var taken = [];
var key = W.key, homes = typeof WHM !== "undefined" && WHM.homes ? WHM.homes[key] : null;
(homes || []).forEach(function (o) { taken.push({ x: o.x, z: o.z, r: Math.max(o.hw || 4, o.hd || 4) + 3 }); });
for (var i = 0; i < list.length; i++) {
var s = typeof whSpot === "function" ? whSpot(W, list[i][0], list[i][1], HP_PAD_R + 1.5, HP_PAD_R + 1.5, taken, P) : null;
if (s)
return s;
}
return null;
},
function (k) {
var here = hpHereKey();
if (k === "city") {
if (typeof WLD !== "undefined" && WLD.on) {
worldOff(true);
WLD.from = null;
}
if (typeof spBar === "function")
try {
spBar(false);
}
catch (e) { }
var r = somnucorRealm();
if (r && (store.here || 0) !== r.id)
toSomnucor();
hpCityBuild();
return !!HP.pads.city;
}
var w = k.split(":"), opt = {};
if (w[0] === "surface")
opt.k = w[1];
if (typeof WLD !== "undefined" && WLD.on)
opt.keepFrom = true;
else if (here === "city" && HP.pads.city) {
var C = HP.pads.city;
opt.from = { here: store.here || 0, x: C.x + HP_PAD_R + 3, y: C.y + 1.72, z: C.z, yaw: yaw, name: "the Tower Plaza helipad" };
}
if (WLD.on === w[0] && w[0] === "surface" && SF.k !== w[1]) {
worldOff(true);
opt.keepFrom = true;
}
worldGo(w[0], opt);
if (w[0] === "surface" && SF.k !== w[1] && typeof sfBuild === "function")
sfBuild(w[1]);
return !!HP.pads[k];
},
function (dest) {
if (!hpCleared()) {
setStatus("The administrative helicopter is for the Keeper and appointed officials only.");
return;
}
var here = hpHereKey();
if (!here || HP.at !== here || !HP.pads[here] || HP.fly)
return;
hpOpen(false);
var P = HP.pads[here];
HP.pilot.visible = false;
hpRotor(true);
HP.fly = { ph: "up", t0: performance.now(), dest: dest, from: here };
setStatus("<b>The administrative helicopter.</b> The pilot takes you up for " + esc(hpName(dest)) + ".");
if (typeof playTone === "function")
playTone(180, 0.6);
},
function () {
var here = hpHereKey();
if (!here || !HP.pads[here] || HP.fly)
return;
if (!hpCleared()) {
setStatus("Only the Keeper and appointed officials may call the helicopter.");
return;
}
hpOpen(false);
if (!HP.heli) {
HP.heli = hpHeli();
HP.pilot = hpPilot();
}
var P = HP.pads[here];
Object.keys(HP.pads).forEach(function (q) { var o = HP.pads[q]; if (o.heliSol)
o.heliSol.hw = -9; });
P.g.add(HP.heli);
HP.heli.position.set(0, 45, 0);
HP.heli.rotation.set(0, 0, 0);
hpRotor(true);
HP.pilot.visible = false;
HP.at = here;
HP.fly = { ph: "call", t0: performance.now(), dest: here };
setStatus("<b>The helicopter is coming in.</b> Stand clear of the pad.");
},
function () {
if (HP.box)
return HP.box;
if (!HP.css) {
HP.css = true;
var st = document.createElement("style");
st.textContent = HP_CSS;
document.head.appendChild(st);
}
var b = document.createElement("div");
b.id = "hp-box";
document.body.appendChild(b);
HP.box = b;
["keydown", "keyup", "keypress"].forEach(function (t) { b.addEventListener(t, function (ev) { if (/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))
ev.stopPropagation(); }); });
return b;
},
function () {
if (typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn())
return Promise.resolve(null);
return cityRpc("heli_status", {}).then(function (d) { if (d && d.ok) {
HP.cleared = !!d.cleared;
HP.keeper = !!d.keeper;
HP.crew = d.crew || [];
} HP.st = Date.now(); return d; }).catch(function () { HP.st = Date.now(); return null; });
},
function () {
var b = hpEl(), here = hpHereKey(), K = hpKeeper(), ok = hpCleared();
var h = '<h3>Administrative helipad</h3><div class="s">' + esc(hpName(here || "")) + ' · for administration only</div>';
if (!ok) {
h += '<p>The marshal stops you at the edge of the pad. <b>The helicopter flies only the Keeper and the officials the Keeper appoints.</b></p>';
}
else if (HP.fly) {
h += '<p>The helicopter is in the air.</p>';
}
else if (HP.at !== here) {
h += '<p>The helicopter is at <b>' + esc(hpName(HP.at)) + '</b>.</p><button data-hp-call="1">Call the helicopter here</button>';
}
else {
h += '<p>The pilot is ready. Where to?</p>';
HP_LIST.forEach(function (d) { if (d.k === here)
return; h += '<div class="r"><span>' + esc(d.name) + '</span><button data-hp-fly="' + esc(d.k) + '">Fly</button></div>'; });
}
if (K) {
h += '<h4>Officials who may fly</h4>';
if (!HP.crew.length)
h += '<div class="s">Nobody is appointed yet. The Keeper always may.</div>';
HP.crew.forEach(function (c) { h += '<div class="r"><span>' + esc(c.name || "a dreamer") + '</span><button class="b2" data-hp-off="' + esc(c.id) + '">Remove</button></div>'; });
h += '<input id="hp-find" type="text" placeholder="Find someone to appoint"><div id="hp-found"></div>';
}
h += '<div style="margin-top:8px"><button class="b2" data-hp-close="1">Close</button></div>';
b.innerHTML = h;
var q = function (s) { return b.querySelectorAll(s); };
Array.prototype.forEach.call(q("[data-hp-fly]"), function (x) { x.onclick = function () { hpFly(x.getAttribute("data-hp-fly")); }; });
Array.prototype.forEach.call(q("[data-hp-call]"), function (x) { x.onclick = hpCall; });
Array.prototype.forEach.call(q("[data-hp-close]"), function (x) { x.onclick = function () { hpOpen(false); }; });
Array.prototype.forEach.call(q("[data-hp-off]"), function (x) { x.onclick = function () { hpAppoint(x.getAttribute("data-hp-off"), false); }; });
var f = document.getElementById("hp-find");
if (f) {
var tm = null;
f.oninput = function () { clearTimeout(tm); tm = setTimeout(function () { hpFind(f.value); }, 350); };
hpFoundPaint();
}
},
function () {
var el = document.getElementById("hp-found");
if (!el)
return;
var on = {};
HP.crew.forEach(function (c) { on[c.id] = 1; });
el.innerHTML = HP.found.slice(0, 12).map(function (p) { return '<div class="r"><span>' + esc(p.name || "a dreamer") + '</span>' + (on[p.id] ? '<span class="s">appointed</span>' : '<button data-hp-on="' + esc(p.id) + '">Appoint</button>') + '</div>'; }).join("");
Array.prototype.forEach.call(el.querySelectorAll("[data-hp-on]"), function (x) { x.onclick = function () { hpAppoint(x.getAttribute("data-hp-on"), true); }; });
}
];
});
