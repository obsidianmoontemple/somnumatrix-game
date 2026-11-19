/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(237, function () {
"use strict";
return [
function (arch, i) {
i = Math.max(0, i | 0);
var L = PASS_LAYOUT[arch];
if (L && L[i])
return L[i];
var S = (typeof vehSpec === "function") ? vehSpec(arch) : null, half = (S && S.len) || 5, row = Math.floor(i / 4), col = i % 4;
var b = -half * 0.7 + row * 0.9;
if (b > -0.6 && b < 0.6)
b += 1.2;
if (b > half * 0.85)
b = half * 0.85;
return [[-0.9, -0.35, 0.35, 0.9][col], b];
},
function (r) {
if (typeof DRIVE !== "undefined" && DRIVE.on) {
PASS_rpc("pass_leave");
PASS_say("Get out of your own car first.");
return;
}
if (typeof rideArch !== "undefined" && rideArch && typeof ride === "function")
try {
ride(null);
}
catch (e) { }
PASS.seat = { driver: r.driver, name: r.name || "the driver", arch: r.arch, seat: r.seat || 0, mode: r.mode || "road", kind: r.kind, dest: r.dest || null };
PASS.pend = null;
PASS.pendDriver = null;
PASS.invite = null;
PASS.pick = null;
PASS.disp = null;
PASS.look = 0;
PASS.yawSet = yaw;
PASS.rideT = 0;
PASS.cam = null;
PASS.prevFly = (typeof canFly !== "undefined") ? canFly : false;
PASS_state(r);
try {
var L = meLook();
L.pass = { d: r.driver, s: PASS.seat.seat, a: r.arch };
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
PASS_say("<b>In with " + PASS_e(PASS.seat.name) + ".</b> Look about as you like; press Q or <b>Hop out</b> to get out.");
PASS_paint();
},
function (r) {
if (typeof r.x !== "number" || typeof r.z !== "number")
return;
PASS.state = { x: r.x, z: r.z, h: +r.h || 0, v: +r.v || 0, y: (typeof r.y === "number") ? r.y : null, age: Math.max(0, +r.age || 0), t0: performance.now() / 1000 };
if (PASS.seat) {
PASS.seat.dest = r.dest || null;
if (r.arch && r.arch !== PASS.seat.arch) {
PASS.seat.arch = r.arch;
}
if (r.mode)
PASS.seat.mode = r.mode;
}
},
function (gone, why, force) {
var S = PASS.seat;
if (!S)
return;
var P = camera.position, d = PASS.disp;
if (force)
PASS_rpc("pass_leave");
if (!gone && !force && S.mode === "fly" && d && PASS.state && typeof PASS.state.y === "number" && PASS.state.y - terrainY(d.x, d.z) > 3) {
PASS_say("Not in mid-air. Wait until " + PASS_e(S.name) + " lands.");
return;
}
if (!gone)
PASS_rpc("pass_leave");
if (d) {
var o = PASS_seatXZ(S.arch, S.seat), V = (typeof vehSpec === "function") ? vehSpec(S.arch) : null, wid = (V && V.wid) || 1;
var sd = o[0] > 0 ? 1 : -1, rx = Math.cos(d.h), rz = -Math.sin(d.h), out = null;
[sd, -sd].forEach(function (s) {
if (out)
return;
var x = d.x + rx * s * (wid + 1.1), z = d.z + rz * s * (wid + 1.1);
if (!(typeof blockedAt === "function" && blockedAt(x, z, terrainY(x, z) + 0.3)))
out = { x: x, z: z };
});
if (!out)
out = { x: d.x + Math.sin(d.h) * 4, z: d.z + Math.cos(d.h) * 4 };
P.x = out.x;
P.z = out.z;
P.y = terrainY(P.x, P.z) + 1.72;
}
if (typeof canFly !== "undefined")
canFly = PASS.prevFly;
if (typeof flyY !== "undefined")
flyY = 0;
PASS.seat = null;
PASS.state = null;
PASS.disp = null;
PASS.pick = null;
if (PASS.carG) {
scene.remove(PASS.carG);
PASS.carG = null;
}
try {
var L = meLook();
if (L.pass) {
L.pass = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
}
catch (e) { }
PASS_say(why || "<b>Out of the car, and on foot.</b>");
PASS_paint();
},
function (dt) {
var st = PASS.state;
if (!st)
return PASS.disp;
var ex = Math.min(2.5, st.age + (performance.now() / 1000 - st.t0)), v = st.v;
var px = ATLC.x + st.x - Math.sin(st.h) * v * ex, pz = ATLC.z + st.z - Math.cos(st.h) * v * ex;
var D = PASS.disp;
if (!D || Math.hypot(px - D.x, pz - D.z) > 40) {
PASS.disp = D = { x: px, z: pz, h: st.h, y: st.y };
return D;
}
var k = 1 - Math.exp(-dt * 4);
D.x += (px - D.x) * k;
D.z += (pz - D.z) * k;
D.h += PASS_ang(st.h - D.h) * k;
if (typeof st.y === "number")
D.y = (typeof D.y === "number") ? D.y + (st.y - D.y) * k : st.y;
else
D.y = null;
return D;
},
function (dt) {
PASS.dt = dt;
var S = PASS.seat, D = PASS_carNow(dt), P = camera.position;
if (!D)
return;
var o = PASS_seatXZ(S.arch, S.seat), c = Math.cos(D.h), s = Math.sin(D.h);
P.x = D.x + o[0] * c + o[1] * s;
P.z = D.z - o[0] * s + o[1] * c;
PASS.look += PASS_ang(yaw - PASS.yawSet);
PASS.look = Math.max(-2.6, Math.min(2.6, PASS.look));
yaw = D.h + PASS.look;
PASS.yawSet = yaw;
if (S.mode === "fly" && typeof D.y === "number") {
if (typeof canFly !== "undefined")
canFly = true;
if (typeof flyY !== "undefined")
flyY = D.y;
}
else {
if (typeof canFly !== "undefined")
canFly = false;
if (typeof flyY !== "undefined")
flyY = 0;
}
},
function (rv, self, args) {
var S = PASS.seat, D = PASS.disp, P = camera.position, px = P.x, py = P.y, pz = P.z;
var doRender = function () { (typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera)); };
var car = PASS_myCarMesh(), V = (typeof vehSpec === "function") ? vehSpec(S.arch) : null;
if (PASS.view === "seat") {
var hide = car && car.visible && V && !V.open;
if (hide)
car.visible = false;
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
try {
doRender();
}
finally {
if (hide)
car.visible = true;
}
return;
}
var base = (S.mode === "fly" && typeof D.y === "number") ? D.y - PASS_seatH(S.arch) : terrainY(D.x, D.z);
var len = V ? V.len : (S.arch === "dragon" ? 3 : 1.5), dist = 6 + len * 1.5, up = 2.2 + len * 0.35, ang = yaw;
var fx = -Math.sin(ang), fz = -Math.cos(ang);
while (dist > len + 1.5 && typeof blockedAt === "function" && blockedAt(D.x - fx * dist, D.z - fz * dist, base + up))
dist -= 0.5;
var tx = D.x - fx * dist, tz = D.z - fz * dist, ty = Math.max(base + up - Math.sin(pitch) * dist * 0.6, terrainY(tx, tz) + 0.8);
if (!PASS.cam)
PASS.cam = { x: tx, y: ty, z: tz };
var k = Math.min(1, (PASS.dt || 0.016) * 7);
PASS.cam.x += (tx - PASS.cam.x) * k;
PASS.cam.y += (ty - PASS.cam.y) * k;
PASS.cam.z += (tz - PASS.cam.z) * k;
camera.position.set(PASS.cam.x, PASS.cam.y, PASS.cam.z);
camera.lookAt(D.x + fx * 4, base + 1.2 + Math.sin(pitch) * 3, D.z + fz * 4);
try {
doRender();
}
finally {
camera.position.set(px, py, pz);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
}
},
function (id) {
var me = PASS_me();
if (id === me && typeof DRIVE !== "undefined" && DRIVE.on) {
var P = camera.position, seat = (typeof rideSeatNow === "function") ? rideSeatNow() : 0;
var rot = (typeof rideG !== "undefined" && rideG) ? rideG.rotation.y - Math.PI : DRIVE.h;
return { x: P.x, z: P.z, y: P.y - 1.72 - seat, rot: rot };
}
var p = (typeof presenceOthers !== "undefined") ? presenceOthers[id] : null;
if (p && p.group)
return { x: p.group.position.x, z: p.group.position.z, y: p.group.position.y, rot: p.group.rotation.y };
return null;
},
function () {
var D = DRIVE, K = PASS_kind(), pl = myPlace();
var body = { arch: D.arch, kind: K.kind, owner: K.owner || null, car: K.car || null, mode: D.mode === "fly" ? "fly" : "road", open: PASS.open,
place: pl.place, x: +pl.x.toFixed(2), z: +pl.z.toFixed(2), h: +D.h.toFixed(4), v: +(D.v || 0).toFixed(2),
y: D.mode === "fly" && typeof flyY !== "undefined" ? +flyY.toFixed(2) : null, dest: PASS.dest ? PASS.dest.name : null };
PASS.busy = true;
return PASS_rpc("pass_drive", { p: body }).then(function (r) {
PASS.busy = false;
if (!r.ok) {
PASS.drv = { seats: 0, fail: true };
PASS.drvT = r.off ? 60 : 5;
if (r.say && r.say !== PASS.lastSay && !r.off) {
PASS.lastSay = r.say;
PASS_say(PASS_e(r.say));
}
return;
}
PASS.drv = { seats: r.seats, kind: r.kind, until: r.pass_until };
var was = {};
PASS.riders.forEach(function (x) { was[x.id] = x.status; });
PASS.riders = r.riders || [];
PASS.riders.forEach(function (x) {
if (x.status === "asked" && was[x.id] !== "asked")
PASS_say("<b>" + PASS_e(x.name) + "</b> asks for a seat.");
if (x.status === "waiting" && was[x.id] !== "waiting")
PASS_say("<b>" + PASS_e(x.name) + "</b> booked a pickup. Drive to them.");
if (x.status === "seated" && was[x.id] && was[x.id] !== "seated")
PASS_say("<b>" + PASS_e(x.name) + "</b> is in.");
});
Object.keys(was).forEach(function (id) {
if (was[id] === "seated" && !PASS.riders.some(function (x) { return x.id === id; })) {
var n = (PASS_findName(id) || "Your passenger");
PASS_say("<b>" + PASS_e(n) + "</b> hopped out.");
}
});
PASS_paint();
});
},
function (dt) {
if (!PASS.dest)
return;
PASS.destT -= dt;
if (PASS.destT > 0)
return;
PASS.destT = 5;
var P = camera.position, dx = PASS.dest.x - P.x, dz = PASS.dest.z - P.z, d = Math.hypot(dx, dz);
if (d < 25) {
driveNote("Carpool: you are at " + PASS.dest.name + ". Your passengers can hop out.", 6);
PASS.dest = null;
return;
}
if (DRIVE.noteT > 0)
return;
var n = PASS.riders.filter(function (x) { return x.status === "waiting"; }).length;
driveNote("Carpool to " + PASS.dest.name + ": " + PASS_dist(d) + " " + PASS_way(dx, dz) + (n ? " · " + n + " waiting for a pickup" : ""), 4);
},
function () {
var pl = myPlace();
return PASS_rpc("pass_nearby", { p_place: pl.place, p_x: pl.x, p_z: pl.z }).then(function (r) {
if (!r.ok)
return;
PASS.near = r.cars || [];
PASS.carpools = r.carpools || [];
PASS.near.concat(PASS.carpools).forEach(function (c) { PASS_names[c.driver] = c.name; });
var m = r.me;
PASS.invite = null;
if (m && m.status === "seated" && !PASS.seat) {
PASS_rpc("pass_ride").then(PASS_rideState);
}
else if (m && m.status === "invited")
PASS.invite = m;
else if (m && (m.status === "asked" || m.status === "waiting")) {
PASS.pend = m.status;
PASS.pendDriver = m;
}
else if (!m) {
PASS.pend = null;
PASS.pendDriver = null;
}
PASS_paint();
});
},
function (r) {
if (!r || !r.ok)
return;
if (r.status === "seated" && typeof r.seat === "number") {
if (!PASS.seat)
PASS_board(r);
else
PASS_state(r);
return;
}
if (PASS.seat) {
PASS_hopOut(true, "<b>Out of " + PASS_e(PASS.seat.name) + "'s " + PASS_e(PASS_name(PASS.seat.arch)) + ".</b> The ride is over.");
return;
}
if (r.status === "asked" || r.status === "waiting") {
PASS.pend = r.status;
}
else if (r.status === "invited") {
PASS.pend = null;
}
else {
if (PASS.pend === "asked")
PASS_say("No seat this time.");
PASS.pend = null;
PASS.pendDriver = null;
}
},
function (driver) {
if (typeof DRIVE !== "undefined" && DRIVE.on) {
PASS_say("Get out of your own car first.");
return;
}
var pl = myPlace();
return PASS_rpc("pass_ask", { p_driver: driver, p_place: pl.place, p_x: pl.x, p_z: pl.z }).then(function (r) {
if (r.say)
PASS_say(PASS_e(r.say));
if (!r.ok)
return;
if (r.status === "seated")
PASS_rpc("pass_ride").then(PASS_rideState);
else {
PASS.pend = r.status;
PASS.rideT = 0;
}
PASS.invite = null;
PASS_paint();
});
},
function (arch, as, attrs) {
if (!PASS_live() || store.inside) {
PASS_say("Out in Somnucor's streets first.");
return;
}
if (typeof DRIVE !== "undefined" && DRIVE.on) {
PASS_say("You are already at a wheel.");
return;
}
if (PASS.seat) {
PASS_say("Hop out of the car you are in first.");
return;
}
if (typeof vehicleTakeWheel !== "function")
return;
var P = camera.position;
var o = { id: "__pass_" + as.kind + "_" + (as.car || as.owner || "x"), archetype: arch, attrs: attrs || {}, x: P.x, z: P.z, rot: yaw - Math.PI, solid: false, nights: [], city: true, passCar: 1 };
as.id = o.id;
PASS.as = as;
if (!vehicleTakeWheel(o)) {
PASS.as = null;
return;
}
PASS_close();
},
function () {
var q = document.getElementById("pass-q");
q = q ? q.value.trim() : "";
if (q.length < 2) {
PASS_say("Type at least two letters of their name.");
return;
}
PASS_rpc("pass_find", { p_q: q }).then(function (r) { PASS_FOUND = Array.isArray(r) ? r : []; if (!PASS_FOUND.length)
PASS_say("Nobody by that name."); PASS_paintPanel(); });
},
function () {
var s = PASS.pass;
if (!s)
return "<span class='pp-dim'>Looking…</span>";
if (s.keeper)
return "The Keeper needs no Lift Pass.";
if (s.valid)
return "Your Lift Pass runs until <b>" + PASS_e(PASS_when(s.until)) + "</b> (payday)" + (s.by_company ? ", paid by " + PASS_e(s.by_company) : "") + ".";
if (s.visitor)
return "Visitors cannot buy a Lift Pass. You can still carry family.";
return "No Lift Pass: you can carry family only. A pass is <b>" + PASS_e(s.price) + " gold</b> and runs until payday, <b>" + PASS_e(PASS_when(s.payday)) + "</b>. " +
"<button type='button' class='pp-b' data-pa='buy'>Buy</button>";
},
function () {
var p = PASS.panel;
if (!p || !p.classList.contains("on"))
return;
Array.prototype.forEach.call(p.querySelectorAll("[data-pt]"), function (b) { b.classList.toggle("on", b.getAttribute("data-pt") === PASS.tab); });
var body = document.getElementById("pass-body"), h = "", P = camera.position;
var ae = document.activeElement;
if (ae && p.contains(ae) && /SELECT|INPUT/.test(ae.tagName) && PASS.panelTab === PASS.tab)
return;
var q = document.getElementById("pass-q"), qv = q ? q.value : "", qf = q && document.activeElement === q;
if (PASS.tab === "seats") {
if (PASS.seat) {
var S = PASS.seat;
h += "<h4>Your seat</h4><div class='pp-card'>Riding with <b>" + PASS_e(S.name) + "</b> in the " + PASS_e(PASS_name(S.arch)) + ", seat " + (S.seat + 1) +
(S.dest ? ". Going to " + PASS_e(S.dest) : "") + ".<div style='margin-top:8px'><button type='button' class='pp-b' data-pa='out'>Hop out</button>" +
" <button type='button' class='pp-b b2' data-pa='seats'>Change seat</button></div>" + PASS_seatPickHtml() + "</div>";
}
else if (PASS.drv && typeof DRIVE !== "undefined" && DRIVE.on) {
var seated = PASS.riders.filter(function (x) { return x.status === "seated"; });
h += "<h4>At the wheel: the " + PASS_e(PASS_name(DRIVE.arch)) + "</h4>";
h += "<div class='pp-card'>" + (PASS.drv.seats ? seated.length + " of " + PASS.drv.seats + " seats taken." : "No seat for a passenger in this one.") +
"<div class='pp-line' style='margin-top:8px'><label for='pass-open'>Passengers:</label> <select id='pass-open'>" +
[["ask", "Anyone may ask"], ["family", "Family only"], ["closed", "None just now"]].map(function (o) { return "<option value='" + o[0] + "'" + (PASS.open === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") +
"</select></div><div class='pp-dim' style='margin-top:8px'>" + PASS_passLine() + "</div></div>";
if (PASS.riders.length) {
h += "<h4>Riders</h4>";
PASS.riders.forEach(function (x) {
var dd = (typeof x.x === "number") ? Math.hypot(ATLC.x + x.x - P.x, ATLC.z + x.z - P.z) : null;
h += "<div class='pp-row'><span><b>" + PASS_e(x.name) + "</b>" + (x.family ? " <span class='pp-dim'>· family</span>" : "") + "<br><span class='pp-dim'>" +
(x.status === "seated" ? "seat " + (x.seat + 1) : x.status === "asked" ? "asks for a seat" : x.status === "invited" ? "offered a seat" : "waiting for a pickup" + (dd != null ? ", " + PASS_dist(dd) + " " + PASS_way(ATLC.x + x.x - P.x, ATLC.z + x.z - P.z) : "")) + "</span></span><span class='pp-acts'>" +
(x.status === "asked" || (x.status === "waiting" && dd != null && dd < 16) ? "<button type='button' class='pp-b' data-pa='yes' data-id='" + PASS_e(x.id) + "'>" + (x.status === "waiting" ? "Pick up" : "Let in") + "</button>" : "") +
"<button type='button' class='pp-b b2' data-pa='no' data-id='" + PASS_e(x.id) + "'>" + (x.status === "seated" ? "Turn out" : "No") + "</button></span></div>";
});
}
var have = {};
PASS.riders.forEach(function (x) { have[x.id] = 1; });
var near = (typeof presenceList === "function" ? presenceList() : []).filter(function (x) { return x.dist < 20 && !have[x.id] && !(presenceOthers[x.id] && presenceOthers[x.id].away); });
h += "<h4>Near the car</h4>";
if (!near.length)
h += "<div class='pp-dim'>Nobody near enough to offer a seat to.</div>";
near.forEach(function (x) { h += "<div class='pp-row'><span>" + PASS_e(x.name) + " <span class='pp-dim'>· " + PASS_dist(x.dist) + "</span></span><span class='pp-acts'><button type='button' class='pp-b' data-pa='inv' data-id='" + PASS_e(x.id) + "'>Offer a seat</button></span></div>"; });
}
else {
h += "<h4>Cars near you</h4>";
var cars = PASS.near || [];
if (!cars.length)
h += "<div class='pp-dim'>No dreamer's car is near. Walk up to one at the kerb and ask for a seat here, or wait to be offered one.</div>";
cars.forEach(function (c) {
var free = Math.max(0, c.seats - c.taken), dd = Math.hypot(ATLC.x + c.x - P.x, ATLC.z + c.z - P.z);
h += "<div class='pp-row'><span><b>" + PASS_e(c.name) + "</b>'s " + PASS_e(PASS_name(c.arch)) + (c.employer ? " <span class='pp-dim'>· " + PASS_e(c.employer) + "</span>" : "") +
"<br><span class='pp-dim'>" + free + " of " + c.seats + " seats free · " + PASS_dist(dd) + (c.family ? " · family" : c.coworker ? " · coworker" : "") + (c.why_not ? "<br>" + PASS_e(c.why_not) : "") + "</span></span>" +
(c.why_not || !free ? "" : "<span class='pp-acts'><button type='button' class='pp-b' data-pa='ask' data-id='" + PASS_e(c.driver) + "'>" + (c.family || c.coworker ? "Get in" : "Ask for a seat") + "</button></span>") + "</div>";
});
if (PASS.pend)
h += "<div class='pp-card'>" + (PASS.pend === "waiting" ? "Your pickup is booked. Wait where you are." : "Waiting for the driver to let you in.") +
" <button type='button' class='pp-b b2' data-pa='cancel'>Cancel</button></div>";
h += "<h4>Your Lift Pass</h4><div class='pp-dim'>" + PASS_passLine() + "</div><div class='pp-dim' style='margin-top:6px'>Passengers never need one; a driver needs one to carry anyone who is not family.</div>";
}
}
else if (PASS.tab === "family") {
var F = PASS_FAMILY;
if (!F)
h = "<div class='pp-dim'>Looking…</div>";
else if (!F.ok)
h = "<div class='pp-dim'>" + PASS_e(F.say) + "</div>";
else {
h += "<div class='pp-dim'>Family ride in your cars without asking, and no Lift Pass is needed to carry them. Tick <i>may drive</i> to let them take your cars out too.</div>";
h += "<h4>Your family</h4>";
if (!F.members.length)
h += "<div class='pp-dim'>Nobody named yet.</div>";
F.members.forEach(function (m) {
h += "<div class='pp-row'><span>" + PASS_e(m.name) + (m.drive ? " <span class='pp-dim'>· may drive</span>" : "") + "</span><span class='pp-acts'>" +
"<button type='button' class='pp-b b2' data-pa='fdrive' data-id='" + PASS_e(m.id) + "' data-on='" + (m.drive ? 0 : 1) + "'>" + (m.drive ? "No driving" : "May drive") + "</button>" +
"<button type='button' class='pp-b b2' data-pa='fdel' data-id='" + PASS_e(m.id) + "'>Remove</button></span></div>";
});
h += "<div class='pp-line' style='margin-top:8px'><input id='pass-q' placeholder='A dreamer&#39;s name' maxlength='40' style='flex:1 1 160px' autocomplete='off'><button type='button' class='pp-b' data-pa='find'>Find</button></div>";
PASS_FOUND.forEach(function (f) {
h += "<div class='pp-row'><span>" + PASS_e(f.name) + "</span><span class='pp-acts'><button type='button' class='pp-b' data-pa='fadd' data-id='" + PASS_e(f.id) + "' data-on='0'>Add</button>" +
"<button type='button' class='pp-b b2' data-pa='fadd' data-id='" + PASS_e(f.id) + "' data-on='1'>Add, may drive</button></span></div>";
});
if (F.household.length) {
h += "<h4>Sharing your home</h4>";
F.household.forEach(function (m) { h += "<div class='pp-row'><span>" + PASS_e(m.name) + " <span class='pp-dim'>· family, and may drive</span></span></div>"; });
}
h += "<h4>Family cars you may drive</h4>";
if (!F.cars.length)
h += "<div class='pp-dim'>None. When a car owner names you as family who may drive, their cars are listed here.</div>";
F.cars.forEach(function (o) {
(o.cars || []).forEach(function (c) {
h += "<div class='pp-row'><span>" + PASS_e(o.name) + "'s " + PASS_e(c.name || PASS_name(c.arch)) + "</span><span class='pp-acts'><button type='button' class='pp-b' data-pa='fcar' data-id='" + PASS_e(o.owner) + "' data-arch='" + PASS_e(c.arch) + "'>Drive</button></span></div>";
});
});
if (F.named_me.length) {
h += "<h4>Who has named you</h4>";
F.named_me.forEach(function (m) { h += "<div class='pp-row'><span>" + PASS_e(m.name) + (m.drive ? " <span class='pp-dim'>· you may drive their cars</span>" : "") + "</span></div>"; });
}
}
}
else if (PASS.tab === "company") {
var C = PASS_COMPANY;
if (!C)
h = "<div class='pp-dim'>Looking…</div>";
else if (!C.ok)
h = "<div class='pp-dim'>" + PASS_e(C.say) + "</div>";
else {
if (!C.works.length && !C.heads.length)
h += "<div class='pp-dim'>Company cars are for those who run a business or work for one. Take a post at the job desk, or open a business at the Tower.</div>";
C.works.forEach(function (w) {
h += "<h4>" + PASS_e(w.name) + "</h4><div class='pp-card'>";
h += "You work here as " + PASS_e(w.job) + ".";
if (w.shift != null)
h += " Your shift starts at <b>" + PASS_e(String(Math.floor(w.shift)).padStart(2, "0") + ":" + String(Math.round((w.shift % 1) * 60)).padStart(2, "0")) + "</b>" + (w.mins_to_shift != null ? " (in " + PASS_mins(w.mins_to_shift) + ")" : "") + ".";
if (w.work) {
var wx = ATLC.x + w.work.x - P.x, wz = ATLC.z + w.work.z - P.z;
h += " Work is " + PASS_dist(Math.hypot(wx, wz)) + " " + PASS_way(wx, wz) + ".";
}
h += "</div>";
var pools = (PASS.carpools || []).filter(function (t) { return t.employer === w.name; });
pools.forEach(function (t) {
var dd = Math.hypot(ATLC.x + t.x - P.x, ATLC.z + t.z - P.z), free = Math.max(0, t.seats - t.taken);
h += "<div class='pp-row'><span><b>" + PASS_e(t.name) + "</b> is driving the " + PASS_e(PASS_name(t.arch)) + (t.dest ? " to " + PASS_e(t.dest) : "") +
"<br><span class='pp-dim'>" + free + " seats free · " + PASS_dist(dd) + " " + PASS_way(ATLC.x + t.x - P.x, ATLC.z + t.z - P.z) + (t.why_not ? "<br>" + PASS_e(t.why_not) : "") + "</span></span>" +
(t.why_not || !free ? "" : "<span class='pp-acts'><button type='button' class='pp-b' data-pa='ask' data-id='" + PASS_e(t.driver) + "'>" + (dd < 40 ? "Get in" : "Ask for a pickup") + "</button></span>") + "</div>";
});
if (!w.cars.length)
h += "<div class='pp-dim'>No company cars here yet.</div>";
w.cars.forEach(function (c) {
h += "<div class='pp-row'><span>" + PASS_e(c.name) + " <span class='pp-dim'>· " + PASS_e(PASS_name(c.arch)) + ", " + c.seats + " seats</span></span><span class='pp-acts'>" +
"<button type='button' class='pp-b' data-pa='ccar' data-id='" + c.id + "' data-arch='" + PASS_e(c.arch) + "' data-emp='" + w.id + "'>Carpool to work</button></span></div>";
});
});
C.heads.forEach(function (e) {
h += "<h4>" + PASS_e(e.name) + ": company cars</h4>";
e.cars.forEach(function (c) {
h += "<div class='pp-row'><span>" + PASS_e(c.name) + " <span class='pp-dim'>· " + c.seats + " seats</span></span><span class='pp-acts'>" +
"<button type='button' class='pp-b' data-pa='ccar' data-id='" + c.id + "' data-arch='" + PASS_e(c.arch) + "' data-emp='" + e.id + "'>Drive</button>" +
"<button type='button' class='pp-b b2' data-pa='cdel' data-id='" + c.id + "'>Sell</button></span></div>";
});
h += "<div class='pp-line' style='margin-top:6px'><select id='pass-carch-" + e.id + "'>" +
[["car", "Car (4 seats)"], ["van", "Van (7 seats)"], ["limousine", "Limousine (7 seats)"], ["omnibus", "Omnibus (20 seats)"], ["bus", "Bus (30 seats)"], ["taxicab", "Cab (4 seats)"], ["coupe", "Coupé (3 seats)"]]
.map(function (o) { return "<option value='" + o[0] + "'>" + o[1] + "</option>"; }).join("") +
"</select><button type='button' class='pp-b' data-pa='cadd' data-emp='" + e.id + "'>Register one</button></div>" +
"<div class='pp-dim' style='margin-top:4px'>Paid once, at the shop's price for that vehicle, from your wallet.</div>";
h += "<h4>" + PASS_e(e.name) + ": Lift Passes for staff</h4>";
if (!e.staff.length)
h += "<div class='pp-dim'>No staff yet.</div>";
e.staff.forEach(function (s) {
h += "<div class='pp-row'><span>" + PASS_e(s.name) + "<br><span class='pp-dim'>" + (s.until ? "pass until " + PASS_e(PASS_when(s.until)) : "no Lift Pass") + "</span></span>" +
(s.until ? "" : "<span class='pp-acts'><button type='button' class='pp-b' data-pa='sbuy' data-id='" + PASS_e(s.id) + "' data-emp='" + e.id + "'>Buy one</button></span>") + "</div>";
});
});
}
}
else if (PASS.tab === "pass") {
h += "<h4>Your Lift Pass</h4><div class='pp-card'>" + PASS_passLine() + "</div>" +
"<div class='pp-dim'>A driver who gives lifts or runs a carpool for anyone who is not family needs a Lift Pass. It runs until the next salary payday (every two weeks), then is bought again. " +
"Passengers never need one, the Keeper needs none, and a business head can buy one for their staff.</div>";
}
if (h === PASS.panelHtml && PASS.panelTab === PASS.tab)
return;
PASS.panelHtml = h;
PASS.panelTab = PASS.tab;
body.innerHTML = h;
if (qv || qf) {
var q2 = document.getElementById("pass-q");
if (q2) {
q2.value = qv;
if (qf)
q2.focus();
}
}
},
function () {
var K = PASS.pick;
if (!K || !PASS.seat)
return "";
if (K.say)
return "<div class='pp-dim' style='margin-top:8px'>" + PASS_e(K.say) + "</div>";
if (!K.seats)
return "<div class='pp-dim' style='margin-top:8px'>Looking at the seats…</div>";
var h = "<div style='margin-top:8px;display:flex;flex-wrap:wrap;gap:4px'>";
for (var i = 0; i < K.seats; i++) {
var mine = i === PASS.seat.seat, taken = K.taken.indexOf(i) >= 0;
h += mine ? "<span class='pp-b' style='opacity:.6'>" + (i + 1) + " (you)</span>" : taken ? "<span class='pp-dim' style='padding:4px 6px'>" + (i + 1) + " taken</span>" :
"<button type='button' class='pp-b b2' data-pa='mseat' data-n='" + i + "'>" + (i + 1) + "</button>";
}
return h + "</div>";
},
function () {
if (!PASS.seat)
return;
PASS.pick = { seats: 0, taken: [] };
PASS_paint();
cityRpc("pass_my_seats", {}).then(function (r) {
if (!PASS.pick)
return;
if (!r || !r.ok) {
PASS.pick = { say: (r && r.say) || "No answer." };
return PASS_paint();
}
PASS.pick = { seats: +r.seats || 0, taken: (r.taken || []).map(Number) };
if (typeof r.mine === "number" && PASS.seat)
PASS.seat.seat = r.mine;
PASS_paint();
}).catch(function () { PASS.pick = { say: "Changing seats opens after the next server update." }; PASS_paint(); });
},
function (n) {
if (!PASS.seat || !(n >= 0))
return;
cityRpc("pass_move_seat", { p_seat: n }).then(function (r) {
if (!r || !r.ok) {
PASS_say(PASS_e((r && r.say) || "That did not go through."));
return PASS_seatPickLoad();
}
PASS.seat.seat = r.seat;
PASS.pick = null;
try {
var L = meLook();
if (L.pass) {
L.pass.s = r.seat;
if (typeof publishMyLook === "function")
publishMyLook();
}
}
catch (e) { }
PASS_say(PASS_e(r.say || ""));
PASS_paint();
}).catch(function () { PASS.pick = { say: "Changing seats opens after the next server update." }; PASS_paint(); });
},
function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-pa],[data-pt]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var tab = t.getAttribute("data-pt");
if (tab) {
PASS_openPanel(tab);
return;
}
var a = t.getAttribute("data-pa"), id = t.getAttribute("data-id");
if (a === "close")
return PASS_close();
if (a === "out")
return PASS_hopOut(false);
if (a === "seats")
return PASS_seatPickLoad();
if (a === "mseat")
return PASS_moveSeat(+t.getAttribute("data-n"));
if (a === "view")
return PASS_toggleView();
if (a === "yes")
return PASS_answer(id, true);
if (a === "no")
return PASS_answer(id, false);
if (a === "inv")
return PASS_invite(id);
if (a === "ask")
return PASS_ask(id);
if (a === "cancel")
return PASS_cancel();
if (a === "open")
return PASS_openPanel("seats");
if (a === "buy" || a === "sbuy") {
var args = a === "sbuy" ? { p_for: id, p_employer: +t.getAttribute("data-emp") } : { p_for: null, p_employer: null };
return PASS_rpc("pass_lift_buy", args).then(function (r) {
PASS_say(PASS_e(r.say || ""));
PASS_loadPass();
if (a === "sbuy" || PASS.tab === "company")
PASS_loadCompany();
if (typeof refreshStanding === "function")
refreshStanding();
PASS.drvT = 0;
});
}
if (a === "find")
return PASS_search();
if (a === "fadd" || a === "fdrive")
return PASS_rpc("pass_family_set", { p_user: id, p_on: true, p_drive: t.getAttribute("data-on") === "1" }).then(function (r) { PASS_say(PASS_e(r.say || "")); PASS_FOUND = []; PASS_loadFamily(); });
if (a === "fdel")
return PASS_rpc("pass_family_set", { p_user: id, p_on: false, p_drive: false }).then(function (r) { PASS_say(PASS_e(r.say || "")); PASS_loadFamily(); });
if (a === "fcar")
return PASS_take(t.getAttribute("data-arch"), { kind: "family", owner: id }, { c: PASS_carColour(id.charCodeAt(0)) });
if (a === "ccar") {
var emp = +t.getAttribute("data-emp"), w = (PASS.work || []).filter(function (x) { return x.id === emp; })[0];
PASS_take(t.getAttribute("data-arch"), { kind: "company", car: +id }, { c: PASS_carColour(emp) });
if (DRIVE.on && w && w.work)
PASS.dest = { x: ATLC.x + w.work.x, z: ATLC.z + w.work.z, name: w.name };
if (DRIVE.on)
PASS_say("<b>The carpool to " + PASS_e(w ? w.name : "work") + ".</b> Coworkers near the car get in without asking; others in the city can book a pickup. Your seats are listed under Seats.");
return;
}
if (a === "cadd") {
var sel = document.getElementById("pass-carch-" + t.getAttribute("data-emp"));
return PASS_rpc("pass_company_car_add", { p_employer: +t.getAttribute("data-emp"), p_arch: sel ? sel.value : "car", p_name: null }).then(function (r) {
PASS_say(PASS_e(r.say || ""));
PASS_loadCompany();
if (typeof refreshStanding === "function")
refreshStanding();
});
}
if (a === "cdel") {
if (!confirm("Take this car off the company's books? The gold paid for it is not returned."))
return;
return PASS_rpc("pass_company_car_remove", { p_id: +id }).then(function (r) { PASS_say(PASS_e(r.say || "")); PASS_loadCompany(); });
}
}
];
});
