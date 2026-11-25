/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(158, function () {
"use strict";
return [
function (s, x, z, r) {
if (s.k === "p") {
var dx = x - s.x, dz = z - s.z;
return (s.r + r) - Math.sqrt(dx * dx + dz * dz);
}
var c = Math.cos(s.h), sn = Math.sin(s.h), dx2 = x - s.x, dz2 = z - s.z;
var lx = dx2 * c - dz2 * sn, lz = dx2 * sn + dz2 * c;
var qx = Math.max(Math.abs(lx) - s.hw, 0), qz = Math.max(Math.abs(lz) - s.hl, 0);
if (qx === 0 && qz === 0)
return r + Math.min(s.hw - Math.abs(lx), s.hl - Math.abs(lz));
return r - Math.sqrt(qx * qx + qz * qz);
},
function (H) {
var v = H.v, mph = Math.round(v / MPH_MS), x = H.x, z = H.z, y = terrainY(x, z) + 0.7;
TRF.shake = Math.min(0.35, 0.06 + v / 45);
trfSparks(x, y, z, Math.min(90, 20 + v * 5));
if (H.k !== "p")
trfDebris(x, y, z, H.h, Math.min(18, 4 + Math.round(v)));
if (v > 7)
trfSmoke(x, y + 0.3, z);
trfCrashSound(v);
var what = "";
if (H.k === "v" && H.s) {
var t = H.s.ref;
if (t && t.g) {
t.crash = 12;
t.vc = 0;
t.jolt = (Math.random() < 0.5 ? -1 : 1) * Math.min(0.5, 0.08 + v * 0.02);
trfHazards(t);
}
var nm = (H.s.arch || "vehicle").replace(/([a-z])([A-Z])/g, "$1 $2");
what = "collided with a " + nm + " at " + mph + " mph";
}
else if (H.k === "p" && H.s) {
var g = H.s.g;
if (g) {
var dx = g.position.x - x, dz = g.position.z - z, d = Math.hypot(dx, dz) || 1;
if (H.s.kind === "citizen" && H.s.ref) {
H.s.ref.sepX = (H.s.ref.sepX || 0) + dx / d * 1.6;
H.s.ref.sepZ = (H.s.ref.sepZ || 0) + dz / d * 1.6;
}
else if (g.parent === scene) {
var nx = g.position.x + dx / d * 1.4, nz = g.position.z + dz / d * 1.4;
if (!blockedAt(nx, nz, 0)) {
g.position.x = nx;
g.position.z = nz;
}
}
}
what = "struck " + (H.s.kind === "dreamer" ? "another dreamer" : H.s.kind === "animal" ? "an animal" : "somebody on foot") + " at " + mph + " mph";
}
else {
if (v > 6)
setStatus("<b>Crash.</b> " + mph + " mph into something solid. At 30 mph a car needs about 23 metres to stop.");
return;
}
setStatus("<b>Crash!</b> You " + esc(what) + ". " + (v > 9 ? "At that speed people are badly hurt. " : "") + "Stop, and look before you go on.");
if (typeof trfOffence === "function" && trfInCity())
trfOffence(H.k === "p" ? "pedestrian" : "collision", what, mph, DRIVE.road && DRIVE.road.mph);
},
function (t) {
if (t.hazard || !t.g)
return;
var g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xFFA020 });
var hl = t.hl || 2, hw = t.hw || 0.9;
[[hw * 0.85, hl * 0.98], [-hw * 0.85, hl * 0.98], [hw * 0.85, -hl * 0.98], [-hw * 0.85, -hl * 0.98]].forEach(function (p) { g.add(P(sph(0.09, 8, 6), m, p[0], 0.75, p[1])); });
g.visible = false;
t.g.add(g);
t.hazard = g;
},
function (x, y, z, n) {
var geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3), vel = [];
for (var i = 0; i < n; i++) {
pos[i * 3] = x;
pos[i * 3 + 1] = y;
pos[i * 3 + 2] = z;
vel.push([(Math.random() - 0.5) * 9, 1.5 + Math.random() * 5, (Math.random() - 0.5) * 9]);
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var mat = new THREE.PointsMaterial({ color: 0xFFC860, size: 0.12, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
var pts = new THREE.Points(geo, mat);
pts.raycast = function () { };
scene.add(pts);
TRF.fx.push({ g: pts, t: 0, step: function (dt, t) {
var a = geo.attributes.position.array, gy = y - 0.7;
for (var i = 0; i < n; i++) {
vel[i][1] -= 9.8 * dt;
a[i * 3] += vel[i][0] * dt;
a[i * 3 + 1] = Math.max(gy, a[i * 3 + 1] + vel[i][1] * dt);
a[i * 3 + 2] += vel[i][2] * dt;
}
geo.attributes.position.needsUpdate = true;
mat.opacity = Math.max(0, 1 - t / 0.9);
mat.color.setHSL(0.1 - t * 0.08, 1, 0.6);
return t < 0.9;
} });
},
function (x, y, z, h, n) {
var g = new THREE.Group(), bits = [];
var glass = new THREE.MeshLambertMaterial({ color: 0xBFE4F2, transparent: true, opacity: 0.8 }), dark = mL(0x2A2C30), paint = mL(0x9A2A22);
for (var i = 0; i < n; i++) {
var m = i % 3 === 0 ? paint : (i % 3 === 1 ? glass : dark), s = 0.05 + Math.random() * 0.14;
var b = P(box(s, s * 0.3, s * 0.8), m, x, y, z);
g.add(b);
bits.push({ m: b, v: [(Math.random() - 0.5) * 6, 1 + Math.random() * 4, (Math.random() - 0.5) * 6], r: [Math.random() * 8, Math.random() * 8], rest: false });
}
g.traverse(function (o) { o.raycast = function () { }; });
scene.add(g);
TRF.fx.push({ g: g, t: 0, step: function (dt, t) {
bits.forEach(function (b) {
if (b.rest)
return;
b.v[1] -= 9.8 * dt;
b.m.position.x += b.v[0] * dt;
b.m.position.y += b.v[1] * dt;
b.m.position.z += b.v[2] * dt;
b.m.rotation.x += b.r[0] * dt;
b.m.rotation.z += b.r[1] * dt;
var gy = terrainY(b.m.position.x, b.m.position.z) + 0.03;
if (b.m.position.y < gy) {
b.m.position.y = gy;
b.v[1] *= -0.3;
b.v[0] *= 0.5;
b.v[2] *= 0.5;
if (Math.abs(b.v[1]) < 0.5) {
b.rest = true;
b.m.rotation.x = 0;
}
}
});
if (t > 20) {
var o = Math.max(0, 1 - (t - 20) / 4);
glass.opacity = 0.8 * o;
}
return t < 24;
} });
},
function (x, y, z) {
var g = new THREE.Group(), puffs = [];
for (var i = 0; i < 8; i++) {
var m = new THREE.MeshLambertMaterial({ color: 0x6A6A6E, transparent: true, opacity: 0.5, depthWrite: false });
var p = P(sph(0.4, 8, 6), m, x + (Math.random() - 0.5) * 0.8, y, z + (Math.random() - 0.5) * 0.8);
g.add(p);
puffs.push({ m: p, d: i * 0.35, v: 0.6 + Math.random() * 0.5 });
}
g.traverse(function (o) { o.raycast = function () { }; });
scene.add(g);
TRF.fx.push({ g: g, t: 0, step: function (dt, t) {
puffs.forEach(function (p) { var k = Math.max(0, t - p.d); p.m.position.y += p.v * dt * (k > 0 ? 1 : 0); var s = 1 + k * 0.9; p.m.scale.setScalar(s); p.m.material.opacity = k > 0 ? Math.max(0, 0.5 - k * 0.09) : 0; });
return t < 7;
} });
},
function (v) {
try {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var c = audio.ctx, t = c.currentTime, out = audio.master || c.destination, vol = Math.min(0.5, 0.12 + v / 40);
var o = c.createOscillator(), og = c.createGain();
o.type = "sine";
o.frequency.setValueAtTime(90, t);
o.frequency.exponentialRampToValueAtTime(35, t + 0.35);
og.gain.setValueAtTime(vol, t);
og.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
o.connect(og);
og.connect(out);
o.start(t);
o.stop(t + 0.45);
var len = Math.floor(c.sampleRate * 0.7), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
for (var i = 0; i < len; i++) {
var e = Math.pow(1 - i / len, 2.2);
d[i] = (Math.random() * 2 - 1) * e * (i < len * 0.08 ? 1 : 0.45 + 0.55 * (Math.random() < 0.02 ? 1 : 0.3));
}
var n = c.createBufferSource();
n.buffer = buf;
var f = c.createBiquadFilter();
f.type = "highpass";
f.frequency.value = 900;
var ng = c.createGain();
ng.gain.value = vol * 0.8;
n.connect(f);
f.connect(ng);
ng.connect(out);
n.start(t);
}
catch (e) { }
},
function (what) {
if (/speeding/.test(what))
return "speeding";
if (/red light/.test(what))
return "red_light";
if (/wrong side/.test(what))
return "wrong_side";
if (/pavement/.test(what))
return "pavement";
if (/struck|pedestrian|on foot/.test(what))
return "pedestrian";
if (/collided|collision/.test(what))
return "collision";
return null;
},
function (kind, what, mph, limit) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("<b>The Dragon Corp saw that.</b> " + esc(TRF_KIND_WORD[kind] || what) + ". Sign in and a ticket would follow it to your address.");
return Promise.resolve(null);
}
var k = "_" + kind;
if (TRF.warned[k] && Date.now() - TRF.warned[k] < 60000)
return Promise.resolve(null);
TRF.warned[k] = Date.now();
if (TRF.missing) {
if (typeof reportCrime === "function")
reportCrime("reckless", "Driving: " + what, null);
return Promise.resolve(null);
}
return cityRpc("traffic_offence", { p_kind: kind, p_note: String(what).slice(0, 240), p_mph: mph || null, p_limit: limit || null }).then(function (o) {
if (o && o.ok && o.ticket) {
setStatus("<b>The Dragon Corp has your number.</b> " + esc(TRF_KIND_WORD[kind] || what) + ". Ticket no. " + o.ticket + " (" + o.fine + " gold) is filed with The Courthouse by " +
esc(o.filed_by || "the Corp") + ", and the city's carrier will bring it to " + esc(o.address || "your address") + ".");
TRF.tkAt = 0;
}
return o;
}).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e)) {
TRF.missing = true;
if (typeof reportCrime === "function")
reportCrime("reckless", "Driving: " + what, null);
}
return null;
});
},
function () {
var w = document.getElementById("trf-letters");
if (!w) {
w = document.createElement("div");
w.id = "trf-letters";
w.style.cssText = "position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)";
document.body.appendChild(w);
w.addEventListener("click", function (e) { if (e.target === w)
w.remove(); });
}
if (document.exitPointerLock)
document.exitPointerLock();
var rows = TRF.tickets || [];
var when = function (s) { try {
var d = new Date(s);
return d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
catch (e) {
return "";
} };
var stWord = { posted: "On its way to you", delivered: "Delivered: to pay or contest", paid: "Paid", contested: "Contested: listed at The Courthouse",
to_court: "Unpaid: gone to The Courthouse", closed: "Closed by the court", cancelled: "Cancelled by the court" };
var h = '<div style="background:#F4EEDC;color:#2A2420;max-width:560px;width:calc(100% - 32px);max-height:84vh;overflow-y:auto;padding:22px 24px;border-radius:4px;font-family:Georgia,serif;box-shadow:0 10px 40px rgba(0,0,0,.5)">' +
'<div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:18px">The Courthouse, Somnucor</b><button class="btn" id="trf-x" style="background:none;border:none;font-size:20px;color:#2A2420;cursor:pointer">×</button></div>' +
'<div style="font-size:12px;color:#6A5E50;margin-bottom:12px">Fixed penalty notices, filed by the Dragon Corp</div>';
if (!rows.length)
h += '<p>No letters.</p>';
rows.forEach(function (t) {
h += '<div style="border-top:1px solid #C8BCA4;padding:12px 0">' +
'<div><b>Ticket no. ' + t.id + '</b> · ' + esc(TRF_KIND_WORD[t.kind] || t.kind) + '</div>' +
'<div style="font-size:13px;line-height:1.6;margin-top:4px">' + esc(t.note || "") + (t.sector ? ' · sector ' + t.sector : '') + '<br>' +
'Seen ' + when(t.at) + ' · filed by ' + esc(t.filed_by || "the Corp") + '<br>' +
'To: ' + esc(t.address || "") + (t.delivered_at ? '<br>Delivered ' + when(t.delivered_at) + ' by ' + esc(t.carrier || "the carrier") : '') + '<br>' +
'<b>Fine: ' + (t.fine || 0).toLocaleString() + ' gold</b>' + (t.due_at && t.status === "delivered" ? ' · pay by ' + when(t.due_at) : '') + '<br>' +
'<i>' + (stWord[t.status] || t.status) + '</i></div>' +
(t.status === "delivered" ? '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-pay="' + t.id + '">Pay ' + t.fine + ' gold</button>' +
'<button class="btn" data-contest="' + t.id + '">Contest it at The Courthouse</button></div>' : '') +
'</div>';
});
h += '<div style="font-size:11px;color:#6A5E50;border-top:1px solid #C8BCA4;padding-top:10px">Paid within three days, a ticket is closed. Unpaid, it goes to The Courthouse and the judge decides. Contested, you put your side at a hearing.</div></div>';
w.innerHTML = h;
w.querySelector("#trf-x").onclick = function () { w.remove(); };
w.querySelectorAll("[data-pay]").forEach(function (b) {
b.onclick = function () {
b.disabled = true;
cityRpc("pay_ticket", { p_id: +b.getAttribute("data-pay") }).then(function (o) {
setStatus(o && o.ok ? "<b>Paid.</b> " + o.paid + " gold to the Treasury; the ticket is closed." : esc((o && o.say) || "It could not be paid."));
TRF.tkAt = 0;
trfTicketsTick(0);
setTimeout(function () { if (document.getElementById("trf-letters"))
trfLetters(); }, 900);
}).catch(function () { b.disabled = false; });
};
});
w.querySelectorAll("[data-contest]").forEach(function (b) {
b.onclick = function () {
var why = prompt("Your side, in a sentence, for the court (you may leave it empty):", "") || "";
b.disabled = true;
cityRpc("contest_ticket", { p_id: +b.getAttribute("data-contest"), p_why: why.slice(0, 300) }).then(function (o) {
setStatus(o && o.ok ? "<b>Contested.</b> Case " + o.case + " is filed at The Courthouse; the clerk lists it for a hearing." : esc((o && o.say) || "It could not be contested."));
if (o && o.ok && typeof courtRefresh === "function")
courtRefresh(true);
TRF.tkAt = 0;
trfTicketsTick(0);
setTimeout(function () { if (document.getElementById("trf-letters"))
trfLetters(); }, 900);
}).catch(function () { b.disabled = false; });
};
});
},
function (t) {
if (TRF.carrier || !t || !t.address)
return;
var pl = trfPlotFor(t.address), door = trfDoorOf(pl);
if (!door)
return;
var P = camera.position;
if (Math.hypot(door.x - P.x, door.z - P.z) > 140)
return;
var dx = door.x - ATLC.x, dz = door.z - ATLC.z, r = Math.hypot(dx, dz), ux = dx / r, uz = dz / r;
var st = { x: door.x + (door.out ? door.out.x * 14 : ux * 14), z: door.z + (door.out ? door.out.z * 14 : uz * 14) };
var look = (typeof randomLook === "function") ? randomLook("carrier" + t.id, "human") : {};
if (typeof jobDress === "function")
try {
jobDress(look, "Postman", "The Post Office");
}
catch (e) { }
var g = buildFigure({ id: "__carrier" + t.id, archetype: "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
var bag = P(box(0.32, 0.36, 0.12), mL(0x6A4A2A), 0.22, 1.0, -0.02);
bag.userData.part = "worn";
if (g.children[0])
g.children[0].add(bag);
g.position.set(st.x, terrainY(st.x, st.z), st.z);
scene.add(g);
TRF.carrier = { g: g, from: st, to: { x: door.x + (door.out ? door.out.x * 0.9 : ux * 0.9), z: door.z + (door.out ? door.out.z * 0.9 : uz * 0.9) }, t: 0, name: t.carrier };
},
function (dt) {
var C = TRF.carrier;
C.t += dt;
var walk = 11, wait = 3, k, back = false;
if (C.t < walk)
k = C.t / walk;
else if (C.t < walk + wait)
k = 1;
else if (C.t < walk * 2 + wait) {
k = 1 - (C.t - walk - wait) / walk;
back = true;
}
else {
scene.remove(C.g);
TRF.carrier = null;
return;
}
var x = C.from.x + (C.to.x - C.from.x) * k, z = C.from.z + (C.to.z - C.from.z) * k;
C.g.position.set(x, terrainY(x, z), z);
var fx = (C.to.x - C.from.x) * (back ? -1 : 1), fz = (C.to.z - C.from.z) * (back ? -1 : 1);
C.g.rotation.y = (C.t >= walk && C.t < walk + wait) ? Math.atan2(C.from.x - C.to.x, C.from.z - C.to.z) + Math.PI : Math.atan2(fx, fz);
var L = C.g.userData.limbs, moving = !(C.t >= walk && C.t < walk + wait);
if (L) {
var s = moving ? Math.sin(C.t * 7) * 0.5 : 0;
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = -s * 0.6;
if (L.ra)
L.ra.rotation.x = moving ? s * 0.6 : -1.1;
}
if (C.t >= walk && C.t < walk + dt * 1.5 && typeof playTone === "function") {
try {
playTone(520, 0.12);
setTimeout(function () { playTone(520, 0.12); }, 220);
}
catch (e) { }
}
},
function () {
var el = document.getElementById("trf-round");
if (!TRF.round.length || !trfInCity()) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "trf-round";
el.style.cssText = "position:fixed;left:14px;top:120px;z-index:35;max-width:280px;background:rgba(20,18,24,.85);border:1px solid #5A5048;color:#E8E0D0;font-size:12px;padding:8px 10px;border-radius:4px;line-height:1.5";
document.body.appendChild(el);
}
el.style.display = "";
el.innerHTML = '<b style="color:#E8C27A">Your round: letters from The Courthouse</b>' + TRF.round.slice(0, 6).map(function (t) {
return '<div>' + esc(t.address) + ' <span style="color:#9A9088">for ' + esc(t.to || "") + '</span>' + (t.near ? ' <button class="btn" data-dl="' + t.id + '" style="font-size:11px;padding:1px 6px">Deliver (E)</button>' : '') + '</div>';
}).join("");
el.querySelectorAll("[data-dl]").forEach(function (b) { b.onclick = function () { trfDeliver(+b.getAttribute("data-dl")); }; });
},
function (id) {
cityRpc("deliver_ticket", { p_id: id }).then(function (o) {
setStatus(o && o.ok ? "<b>Delivered</b> to " + esc(o.address) + ". The Courthouse's letter is through the door." : esc((o && o.say) || "It could not be delivered."));
TRF.round = TRF.round.filter(function (t) { return t.id !== id; });
trfRoundPaint();
}).catch(function () { });
}
];
});
