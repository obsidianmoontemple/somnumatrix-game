/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LIMO = { pub: "", t: 0, far: {}, warned: 0, btn: null };
function limoKey(o) { return o ? (o.x + "," + o.z + "," + o.r) : ""; }
function limoPublish() {
if (typeof tglKeeper !== "function" || !tglKeeper() || typeof meLook !== "function")
return;
var at = null;
if (TGL.g && TGL.parked && TGL.where === "out" && !TGL.auto && !TGL.coming && typeof careInCity === "function" && careInCity())
at = { x: +TGL.x.toFixed(2), z: +TGL.z.toFixed(2), r: +TGL.rot.toFixed(3) };
var L = meLook(), riding = !!(TGL.auto && !TGL.auto.taxi), k = limoKey(at) + (riding ? "|ride" : "");
if (k === LIMO.pub)
return;
LIMO.pub = k;
L.limoAt = at;
L.limo = riding ? 1 : null;
if (typeof publishMyLook === "function")
publishMyLook();
}
function limoModel(id) { return __ZC(245, 0, this, arguments, new.target); }
function limoChauffeur(sat) {
var d = tglChauffeur();
if (sat) {
d.position.set(0.45, 0.15, -0.9);
d.rotation.set(0, Math.PI, 0);
d.userData.pose = "sit";
d.userData.seated = true;
var lm = d.userData.limbs;
if (lm)
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = -1.4;
l.rotation.z = 0;
} });
}
return d;
}
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments), L = row && row.look;
if (L && L.ride === "limousine" && L.limo) {
for (var i = g.children.length - 1; i >= 0; i--) {
var v = g.children[i];
if (v === g.userData.tag)
continue;
try {
if (typeof modelDress === "function")
modelDress(v, { id: "__plimo_" + row.user_id, archetype: "limousine", attrs: {}, solid: true, placed: true, city: true });
}
catch (e) { }
if (typeof tglFinish === "function")
tglFinish(v);
try {
v.add(limoChauffeur(true));
}
catch (e) { }
break;
}
}
return g;
};
})();
function limoFarTick() {
var seen = {}, show = typeof careInCity === "function" && careInCity() && typeof walkMode !== "undefined" && walkMode;
if (typeof presenceOthers !== "undefined")
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], L = p && p.group && p.group.userData.passLook, at = L && L.limoAt;
if (!at || typeof at.x !== "number")
return;
seen[id] = 1;
var F = LIMO.far[id], k = limoKey(at);
if (!F) {
F = LIMO.far[id] = { g: limoModel("__flimo_" + id), d: limoChauffeur(false), k: "" };
scene.add(F.g);
scene.add(F.d);
}
if (F.k !== k) {
F.k = k;
F.x = at.x;
F.z = at.z;
F.r = at.r;
var y = terrainY(at.x, at.z);
F.g.position.set(at.x, y, at.z);
F.g.rotation.y = at.r;
var sx = Math.cos(at.r), sz = -Math.sin(at.r);
F.d.position.set(at.x + sx * 1.7 + Math.sin(at.r) * 0.9, y, at.z + sz * 1.7 + Math.cos(at.r) * 0.9);
F.d.rotation.y = at.r + Math.PI / 2;
}
var P = camera.position, near = Math.hypot(P.x - F.x, P.z - F.z) < 400;
F.g.visible = F.d.visible = show && near;
});
Object.keys(LIMO.far).forEach(function (id) { if (seen[id])
return; var F = LIMO.far[id]; scene.remove(F.g); scene.remove(F.d); delete LIMO.far[id]; });
}
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
for (var id in LIMO.far) {
var F = LIMO.far[id];
if (!F.g.visible)
continue;
var dx = x - F.x, dz = z - F.z, c = Math.cos(F.r), s = Math.sin(F.r), lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < 1.15 && Math.abs(lz) < 3.9)
return true;
}
return ba.apply(this, arguments);
};
})();
function limoOthersNear(r) {
if (typeof presenceOthers === "undefined")
return 0;
var P = camera.position, n = 0;
Object.keys(presenceOthers).forEach(function (id) { var g = presenceOthers[id].group; if (g && Math.hypot(g.position.x - P.x, g.position.z - P.z) < r)
n++; });
return n;
}
(function () {
if (typeof trfSolids !== "function")
return;
var ts = trfSolids;
trfSolids = function () {
var out = ts.apply(this, arguments);
if (typeof DRIVE === "undefined" || !DRIVE.on || !out || !out.length)
return out;
var P = camera.position, h = DRIVE.h || 0, c = Math.cos(h), s = Math.sin(h), seated = [];
if (typeof PASS !== "undefined" && PASS.riders && typeof presenceOthers !== "undefined")
PASS.riders.forEach(function (x) { var o = x && x.status === "seated" && presenceOthers[x.id]; if (o && o.group)
seated.push(o.group); });
var keep = out.filter(function (q) {
if (q.k === "p" && q.kind === "dreamer" && q.ref && seated.indexOf(q.ref.group) >= 0)
return false;
var dx = q.x - P.x, dz = q.z - P.z, lx = dx * c - dz * s, lz = dx * s + dz * c;
return !(Math.abs(lx) < 1.4 && Math.abs(lz) < 3.4);
});
TRF.solids = keep;
return keep;
};
})();
function limoSetOff() {
var A = TGL.auto;
if (!A || !A.hold)
return;
A.hold = false;
TGL.chk = null;
setStatus("<b>The chauffeur drives you to " + esc(A.name) + ".</b> Sit back. Press Q to get out on the way.");
if (TGL.box && TGL.box.style.display === "block")
tglOpen(true);
}
(function () {
if (typeof tglGo === "function") {
var go = tglGo;
tglGo = function (k) {
var r = go.apply(this, arguments);
if (TGL.auto && limoOthersNear(25) > 0) {
TGL.auto.hold = true;
setStatus("<b>The chauffeur waits at the kerb</b> while your guests get in. They ask for a seat beside the car; let them in from <b>Seats</b>, then press <b>Set off</b>.");
}
return r;
};
}
if (typeof driveInput === "function") {
var di = driveInput;
driveInput = function () { if (TGL.auto && TGL.auto.hold && typeof DRIVE !== "undefined" && DRIVE.on)
return { f: 0, s: 0, hand: true, up: false, down: false }; return di.apply(this, arguments); };
}
if (typeof tglTick === "function") {
var tk = tglTick;
tglTick = function (dt) {
if (TGL.auto && TGL.auto.hold) {
if (typeof rideG !== "undefined" && rideG) {
tglFinish(rideG);
if (TGL.driver && TGL.driver.parent !== rideG) {
rideG.add(TGL.driver);
TGL.driver.position.set(0.45, 0.15, -0.9);
TGL.driver.rotation.set(0, Math.PI, 0);
TGL.driver.visible = true;
TGL.driver.userData.pose = "sit";
TGL.driver.userData.seated = true;
}
}
return;
}
return tk.apply(this, arguments);
};
}
if (typeof tglOpen === "function") {
var op = tglOpen;
tglOpen = function (on) {
var r = op.apply(this, arguments);
if (on && TGL.box && TGL.auto && TGL.auto.hold) {
var b = document.createElement("button");
b.textContent = "Set off";
b.onclick = function (ev) { ev.stopPropagation(); limoSetOff(); };
var st = TGL.box.querySelector("[data-t='stop']");
if (st)
st.parentNode.insertBefore(b, st);
else
TGL.box.appendChild(b);
var s = TGL.box.querySelector(".s");
if (s)
s.textContent = "At the kerb, waiting for your guests. Then on to " + TGL.auto.name + ".";
}
return r;
};
}
})();
function limoHud() {
var row = document.querySelector("#dhud .dh-btns"), want = !!(TGL.auto && TGL.auto.hold);
var b = row && row.querySelector(".limo-go");
if (!want) {
if (b)
b.remove();
return;
}
if (!row || b)
return;
b = document.createElement("button");
b.className = "btn limo-go";
b.type = "button";
b.textContent = "Set off";
b.title = "The chauffeur drives on";
var fire = function (ev) { if (ev) {
ev.preventDefault();
ev.stopPropagation();
} limoSetOff(); };
b.addEventListener("click", fire);
b.addEventListener("touchend", fire, { passive: false });
row.insertBefore(b, row.firstChild);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt.apply(this, arguments);
try {
LIMO.t -= dt || 0;
if (LIMO.t <= 0) {
LIMO.t = 0.5;
limoPublish();
limoHud();
}
limoFarTick();
}
catch (e) {
if (window.console && LIMO.warned++ < 3)
console.warn("[limo shared]", e);
}
};
})();
