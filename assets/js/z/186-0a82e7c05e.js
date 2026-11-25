/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(186, function () {
"use strict";
return [
function (x, z, faceX, faceZ, name) {
if (!ktKeeper())
return false;
if (typeof closeDesk === "function")
closeDesk();
if (typeof INT !== "undefined" && INT && typeof exitInterior === "function")
exitInterior(true);
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
if (typeof setWalk === "function" && !walkMode)
setWalk(true);
var gy = (typeof terrainY === "function") ? (terrainY(x, z) || 0) : 0;
camera.position.set(x, gy + 1.72, z);
if (typeof flyY !== "undefined")
flyY = 0;
if (faceX != null)
yaw = Math.atan2(-(faceX - x), -(faceZ - z));
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof surfAt !== "undefined")
surfAt = 0;
if (typeof guideTo !== "undefined")
guideTo = null;
if (typeof moveEveryone === "function" && typeof dreamHour === "function")
try {
moveEveryone(dreamHour(), daylight(dreamHour()));
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>" + esc(name) + "</b>. You are there.");
KT.last = name;
return true;
},
function (key) {
var sp = ktSpecFor(key);
if (!sp) {
if (typeof setStatus === "function")
setStatus("That place is not in the city yet.");
return;
}
var D = null;
try {
D = (typeof doorWorld === "function") ? doorWorld(sp) : null;
}
catch (e) { }
if (D && D.out)
ktLand(D.x + D.out.x * 4, D.z + D.out.z * 4, D.x, D.z, key);
else
ktLand(sp.x + 6, sp.z + 6, sp.x, sp.z, key);
},
function (k) {
var R = (typeof atlRing === "function") ? atlRing(k) : null;
if (!R)
return;
var a = (typeof ATL_STAIRS !== "undefined" && ATL_STAIRS[0]) ? ATL_STAIRS[0].a : 0.19, d = k === "plaza" ? 60 : (R.S + R.E) / 2;
var cx = (typeof ATLC !== "undefined" && ATLC) ? ATLC.x : 0, cz = (typeof ATLC !== "undefined" && ATLC) ? ATLC.z : 0;
var x = cx + Math.sin(a) * d, z = cz + Math.cos(a) * d;
ktLand(x + Math.cos(a) * 14, z - Math.sin(a) * 14, cx, cz, R.name);
},
function () {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
var tw = store.objects.filter(function (o) { return o.archetype === "somnucortower" && (!r || o.realm === r.id); })[0];
if (!tw)
return ktToRing("plaza");
var D = null;
try {
D = (typeof doorWorld === "function") ? doorWorld(tw) : null;
}
catch (e) { }
if (D && D.out)
ktLand(D.x + D.out.x * 5, D.z + D.out.z * 5, D.x, D.z, "The Somnucor Tower");
else
ktToRing("plaza");
},
function (pane) {
var keys = Object.keys(store.workplaceAt || {}).sort(function (a, b) { return a.replace(/^the /i, "").localeCompare(b.replace(/^the /i, "")); });
var ringOf = function (k) { var w = store.workplaceAt[k]; if (typeof atlRingAt === "function" && w) {
var r = atlRingAt(w.x, w.z);
if (r)
return r.name;
} return ""; };
pane.innerHTML = '<p style="color:var(--dim);line-height:1.6">Go anywhere in Somnucor at once. Only the Keeper can travel this way. ' +
'Choose a ring of the city or a place, and you are set down outside its door.</p>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px"><button class="btn" data-kt-home="1">Back to the Tower</button>' +
ATL_RINGS.map(function (R) { return '<button class="btn" data-kt-ring="' + esc(R.k) + '">' + esc(R.name) + '</button>'; }).join("") + '</div>' +
'<input id="kt-find" type="text" placeholder="Find a place" style="width:100%;box-sizing:border-box;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:8px 10px;border-radius:2px;margin-bottom:8px">' +
'<div style="max-height:46vh;overflow-y:auto"><table id="kt-list" style="width:100%;border-collapse:collapse">' +
keys.map(function (k) {
return '<tr data-kt-row="' + esc(k.toLowerCase()) + '"><td style="padding:5px 6px;border-bottom:1px solid var(--line)"><b>' + esc(k) + '</b>' +
'<br><span style="color:var(--dim);font-size:12px">' + esc(ringOf(k)) + '</span></td>' +
'<td style="border-bottom:1px solid var(--line);text-align:right"><button class="btn" data-kt-go="' + esc(k) + '">Go</button></td></tr>';
}).join("") +
'</table></div>';
pane.querySelector("[data-kt-home]").onclick = ktToTower;
Array.prototype.forEach.call(pane.querySelectorAll("[data-kt-ring]"), function (b) { b.onclick = function () { ktToRing(b.getAttribute("data-kt-ring")); }; });
Array.prototype.forEach.call(pane.querySelectorAll("[data-kt-go]"), function (b) { b.onclick = function () { ktToPlace(b.getAttribute("data-kt-go")); }; });
var f = document.getElementById("kt-find");
f.addEventListener("keydown", function (e) { e.stopPropagation(); });
f.addEventListener("keyup", function (e) { e.stopPropagation(); });
f.oninput = function () {
var q = f.value.trim().toLowerCase();
Array.prototype.forEach.call(pane.querySelectorAll("[data-kt-row]"), function (tr) { tr.style.display = !q || tr.getAttribute("data-kt-row").indexOf(q) >= 0 ? "" : "none"; });
};
}
];
});
