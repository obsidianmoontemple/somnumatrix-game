/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(377, function () {
return [
function (E, dt) {
var p = VLT.v3, f = E.g.getWorldDirection(VLT.v4), hd = Math.atan2(f.x, f.z);
if (E.px === undefined || dt <= 0) {
E.px = p.x;
E.pz = p.z;
E.ph = hd;
E.sv = 0;
E.acc = 0;
E.yr = 0;
return { v: 0, brake: true, ind: null, rev: false };
}
var vx = (p.x - E.px) / dt, vz = (p.z - E.pz) / dt, sp = vx * f.x + vz * f.z;
if (Math.abs(sp) > 80)
sp = E.sv;
var dh = hd - E.ph;
while (dh > Math.PI)
dh -= Math.PI * 2;
while (dh < -Math.PI)
dh += Math.PI * 2;
var k = Math.min(1, dt * 4), prev = E.sv;
E.sv += (sp - E.sv) * k;
E.acc += ((E.sv - prev) / dt - E.acc) * k;
E.yr += (dh / dt - E.yr) * k;
E.px = p.x;
E.pz = p.z;
E.ph = hd;
var v = E.sv, ind = null;
if (Math.abs(v) > 1 && Math.abs(E.yr) > 0.25)
ind = E.yr > 0 ? "left" : "right";
return { v: v, brake: (E.acc < -1.2 && Math.abs(v) > 0.4) || Math.abs(v) < 0.3, ind: ind, rev: v < -0.3 };
},
function (el) {
var row = el.querySelector(".dh-btns");
if (!row)
return;
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-vlt", "1");
b.title = "Headlights (L)";
var paint = function () { b.textContent = VLT.mode === "on" ? "Lights: on" : "Lights: auto"; };
var fire = function (ev) { if (ev) {
ev.preventDefault();
ev.stopPropagation();
} vltToggle(); paint(); };
b.addEventListener("click", fire);
b.addEventListener("touchend", fire, { passive: false });
paint();
row.appendChild(b);
},
function () {
VLT.mode = VLT.mode === "on" ? "auto" : "on";
try {
localStorage.setItem("somnu.vehlights", VLT.mode);
}
catch (e) { }
if (typeof driveNote === "function")
driveNote(VLT.mode === "on" ? "Headlights on" : "Headlights: on by themselves after dark", 1.5);
var b = document.querySelector("#dhud [data-vlt]");
if (b)
b.textContent = VLT.mode === "on" ? "Lights: on" : "Lights: auto";
}
];
});
