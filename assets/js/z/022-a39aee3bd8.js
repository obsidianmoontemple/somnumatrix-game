/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(22, function () {
"use strict";
return [
function () {
var L = land(), $ = function (i) { return document.getElementById(i); };
$("l-ground").value = L.ground;
$("l-hills").value = String(L.hills);
$("l-season").value = L.season;
$("l-sky").value = L.sky;
$("l-shadows").checked = !!L.shadows;
$("l-detail").checked = !!L.detail;
$("l-now").textContent = L.season === "calendar" ? ("(it's " + seasonNow() + " now)") : "";
renderRealmList();
var sw = $("l-water");
sw.innerHTML = "";
WATERS.forEach(function (c) {
var b = document.createElement("button");
b.type = "button";
b.className = "sw" + (c === L.water ? " on" : "");
b.style.background = "#" + ("000000" + c.toString(16)).slice(-6);
b.setAttribute("aria-label", "water colour");
b.onclick = function () { L.water = c; reland(); openLand(); };
sw.appendChild(b);
});
$("land").classList.add("open");
}
];
});
