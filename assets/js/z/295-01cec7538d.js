/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(295, function () {
"use strict";
return [
function (title, seed) {
var h = ppHash("pp-" + title + "-" + seed), f = (h >>> 3) % 2 === 0;
var given = typeof TEMP_GIVEN_F !== "undefined" ? (f ? TEMP_GIVEN_F : (typeof TEMP_GIVEN_M !== "undefined" ? TEMP_GIVEN_M : TEMP_GIVEN_F)) : ["Ada", "Sam", "Remy", "Juno"];
var sur = typeof SURNAME !== "undefined" ? SURNAME : ["Vance", "Hollis", "Marsh"];
return given[(h >>> 5) % given.length] + " " + sur[(h >>> 10) % sur.length];
},
function () {
PP.people = [];
PP.dancers = [];
PP.players = [];
var lite = PP.lite;
PP.staffAt.forEach(function (s, i) {
if (lite && i % 2 === 1 && !/manager|DJ|director|steward|concierge/i.test(s.title))
return;
try {
var P = ppGroupFor(s.x, s.z, s.y), g = wPerson("pp_" + s.seed, { title: s.title, place: s.place });
g.position.set(s.x, s.y || 0, s.z);
g.rotation.y = s.ry || 0;
P.g.add(g);
var tg = makeTag(ppName(s.title, s.seed) + " · " + s.title + " (stand-in)", false);
tg.position.y = 2.05;
g.add(tg);
PP.people.push({ g: g, zone: P.zone, role: s.title, x: s.x, z: s.z });
}
catch (e) { }
});
PP.djs.forEach(function (d, i) {
var P = ppGroupFor(d.x, d.z, d.y), g = ppFig("__pp_dj" + d.seed, 5 + i, "band");
g.position.set(d.x, d.y || 0, d.z);
g.rotation.y = d.ry || 0;
P.g.add(g);
try {
var tg = makeTag(ppName(d.title, d.seed) + " · " + d.title + " (stand-in)", false);
tg.position.y = 2.3;
g.add(tg);
}
catch (e) { }
PP.players.push({ g: g, part: "dj", ph: i * 0.7, zone: P.zone, x: d.x, z: d.z, bpm: ppBpmAt(P.zone, d.x, d.z) });
});
PP.bands.forEach(function (b, bi) {
var parts = b.solo ? [b.solo] : ["guitar", "drums", "keys", "voice"], c = Math.cos(b.face || 0), s = Math.sin(b.face || 0);
parts.forEach(function (pt, i) {
var off = b.solo ? 0 : (-4.2 + i * 2.8), x = b.x + c * off, z = b.z - s * off, P = ppGroupFor(x, z, b.y);
var g = ppFig("__pp_band" + b.seed + i, i + bi * 3, "band");
g.position.set(x, b.y || 0, z);
g.rotation.y = b.face || 0;
P.g.add(g);
PP.players.push({ g: g, part: pt, ph: i * 0.7, zone: P.zone, x: x, z: z, bpm: ppBpmAt(P.zone, x, z) });
});
});
if (PP.quartet) {
var Q = PP.quartet;
for (var q = 0; q < 4; q++) {
var qx = Q.x - 4.5 + q * 3, g = wPerson("pp_quartet" + q, { title: "String quartet musician", place: PP_KEYS.hall, look: { layer: "suit", layerColor: 0x141418, top: 0xF4F0E8, bottom: 0x141418 } });
g.position.set(qx, Q.y, Q.z);
P2(g);
var bow = ppBox(0.06, 0.06, 0.7, ppM(0x6A3A1A), 0.25, 1.25, 0.2, g);
bow.rotation.y = 0.6;
try {
var tg = makeTag(ppName("String quartet musician", q) + " · String quartet musician (stand-in)", false);
tg.position.y = 2.05;
g.add(tg);
}
catch (e) { }
PP.players.push({ g: g, part: "strings", ph: q * 0.9, zone: "hall", x: qx, z: Q.z, bpm: 84 });
}
}
function P2(g) { PP.rooms.hall.live.add(g); }
PP.crowds.forEach(function (C) {
var n = C.n, R = ppRand(ppHash(C.seed)), P0 = ppGroupFor((C.x0 + C.x1) / 2, (C.z0 + C.z1) / 2, C.y);
for (var i = 0; i < n; i++) {
var x = C.x0 + R() * (C.x1 - C.x0), z = C.z0 + R() * (C.z1 - C.z0), g = ppFig("__pp_" + C.seed + "_d" + i, i + 3, "dance");
g.position.set(x, C.y || 0, z);
g.rotation.y = (C.face || 0) + (R() - 0.5);
P0.g.add(g);
PP.dancers.push({ g: g, ph: R(), lx: x, lz: z, y: C.y || 0, face: g.rotation.y, zone: P0.zone, sway: !!C.sway, bpm: ppBpmAt(P0.zone, x, z) });
}
});
(PP.queue || []).forEach(function (q, i) { if (lite && i > 2)
return; var g = wPerson("pp_queue" + i, {}); g.position.set(q[0], 0, q[1]); g.rotation.y = Math.PI; PP.outLive.add(g); PP.people.push({ g: g, zone: "out", x: q[0], z: q[1] }); });
var G = [[0, 240, 10], [0, 120, 14], [-200, -40, 18], [-150, 40, 14], [150, -140, 12], [2000, 15, 8], [2500, 0, 10], [3000, 0, 5], [3500, 10, 8]], R2 = ppRand(5150), gi = 0;
G.forEach(function (q) {
var n = lite ? Math.ceil(q[2] / 6) : Math.ceil(q[2] / 4);
for (var k = 0; k < n; k++) {
var x = q[0] + (R2() - 0.5) * q[2] * 2, z = q[1] + (R2() - 0.5) * q[2] * 2;
if (worldSolidAt(PP.solids, x, z, 0) || ppWater(x, z))
continue;
var P = ppGroupFor(x, z, 0);
if (P.zone !== "out" && !ppWalkAt(x, z))
continue;
var g = wPerson("pp_g" + (gi++), {});
g.position.set(x, ppGround(x, z, 0), z);
g.rotation.y = R2() * 6.28;
P.g.add(g);
PP.people.push({ g: g, zone: P.zone, x: x, z: z, wander: { r: Math.min(6, q[2] * 0.4) } });
}
});
},
function (opt) {
PP.lite = ppLite();
PP.t = 0;
PP.guide = null;
PP.dance = false;
PP.ride = null;
ppLoadInvite(true);
if (typeof loadThings === "function")
loadThings();
if (typeof ahLoadBoard === "function")
try {
ahLoadBoard(true);
}
catch (e) { }
ppPut(0, 348, 0);
var at = opt && opt.at;
if (at && PP_DOORS[at])
ppPut(PP_DOORS[at].out[0], PP_DOORS[at].out[1], PP_DOORS[at].out[2]);
var N = PP_NIGHTS[new Date().getDay()];
setStatus("<b>Welcome to Jubilee, the Party Planet.</b> Tonight is <b>" + esc(N[1]) + "</b>: " + esc(N[2]) + " The concierge in the pavilion has a map. Back takes you home.");
if (typeof playTone === "function") {
setTimeout(function () { playTone(660, 0.25); }, 300);
setTimeout(function () { playTone(880, 0.35); }, 560);
}
},
function (k) {
var D = PP_DOORS[k];
if (!D)
return;
if (k === "hall" && !ppInvited()) {
ppLoadInvite(true);
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Gilded Hall</div><div style='opacity:.85;margin-top:6px'>" + esc(PP_NEED_SAY.invite) + "</div>" +
"<div style='opacity:.75;margin-top:6px;font-size:12px'>There are only twenty Golden Invitations. If you hold one, open it from your backpack first, then come back to the doors.</div>");
return;
}
if (typeof playTone === "function")
playTone(420, 0.2);
ppPut(D.in[0], D.in[1], D.in[2]);
setStatus("<b>" + esc(D.name) + ".</b> " + ({ club: "The bass in your chest, the floor washing slowly through its colours. Coat check on your left, tickets on your right, the lift to the roof behind them.",
echo: "Karaoke to the left, the games hall ahead, bowling to the right. Shoes from the front desk.",
shop: "Balloons to the ceiling. Everything you buy goes into your backpack.",
hall: "Gold and candlelight. The quartet is tuning; your place at the banquet is waiting." })[k] + " Back takes you outside.");
},
function (dir) {
if (typeof playTone === "function") {
playTone(520, 0.15);
setTimeout(function () { playTone(dir === "up" ? 700 : 400, 0.3); }, 250);
}
ppDanceSet(false);
if (dir === "up") {
ppPut(86, 56, Math.PI / 2, 18.4);
setStatus("<b>The Rooftop Terrace.</b> The whole of Jubilee below you, the ringed giant above. The lift takes you back down.");
}
else {
ppPut(2006, 33.6, Math.PI);
setStatus("<b>Back down in the Glowworm's lobby.</b>");
}
},
function (z) {
if (PP.zone === z && PP.zoneAt)
return;
PP.zone = z;
PP.zoneAt = z;
PP.zoneDef = PP_ZONES[z] || PP_ZONES.out;
var outside = !PP.zoneDef.indoor;
if (PP.out)
PP.out.visible = outside;
if (PP.outLive)
PP.outLive.visible = outside;
Object.keys(PP.rooms).forEach(function (k) { var R = PP.rooms[k]; R.g.visible = R.live.visible = (k === z); });
},
function (dt) {
PP.t += dt;
var t = PP.t, L = worldLocal(), feet = camera.position.y - 1.72;
ppZoneSet(ppZoneAt(L.x, L.z, camera.position.y));
var Z = PP.zone, out = !PP.zoneDef.indoor;
if (PP.ride)
ppRideTick(dt);
ppFloorsTick(t, L, Z);
ppLightsTick(dt, t, out);
ppFiguresTick(dt, t, L, Z);
ppScreensTick(dt, t, Z);
ppMusicTick(L, Z);
ppDanceTick(L, Z, feet);
PP.slow = (PP.slow || 0) - dt;
if (PP.slow <= 0) {
PP.slow = 20;
ppLoadInvite(false);
if (typeof ahLoadBoard === "function")
try {
ahLoadBoard(false);
}
catch (e) { }
}
if (!PP.ride) {
var s = null, sd = 1e9;
for (var i = 0; i < PP.spots.length; i++) {
var q = PP.spots[i], qy = q.y || 0;
if (Math.abs(feet - qy) > 2.6)
continue;
var d = (L.x - q.x) * (L.x - q.x) + (L.z - q.z) * (L.z - q.z);
if (d < q.r * q.r && d < sd) {
sd = d;
s = q;
}
}
if (s)
worldPrompt("<b>" + esc(s.name) + "</b> · <b>press E</b>", s.fn);
else if (PP.onFloor)
worldPrompt(PP.dance ? "<b>Dancing</b> · <b>press E</b> to stop" : "<b>" + esc(PP.onFloor.name || "The dance floor") + "</b> · <b>press E</b> to dance", function () { ppDanceSet(!PP.dance); });
else
worldPrompt(null);
}
ppBannerTick(L);
},
function (L) {
var N = PP_NIGHTS[new Date().getDay()], Zd = PP.zoneDef || PP_ZONES.out;
var h = "<b style='color:#FFB8E8'>🎉 " + esc(Zd.name === "Jubilee" ? PP_NAME : Zd.name) + "</b> · tonight: " + esc(N[1]);
if (PP.dance)
h += " · 💃 dancing";
if (PP.ride)
h += " · on the " + (PP.ride.kind === "wheel" ? "Ferris wheel" : "carousel");
var G = PP.guide;
if (G) {
var dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (G.zone && G.zone !== PP.zone && PP.zone !== "out" && PP.zone !== "roof") {
h += "<div>➜ " + esc(G.name) + ": go back outside first (Back)</div>";
}
else if (d < 6) {
PP.guide = null;
setStatus("<b>" + esc(G.name) + "</b> is right here.");
}
else {
var fx = -Math.sin(yaw), fz = -Math.cos(yaw), ang = Math.atan2(fx * dz - fz * dx, fx * dx + fz * dz);
var arrows = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"], idx = ((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8;
h += "<div style='font-size:15px'>" + arrows[idx] + " <b>" + esc(G.name) + "</b> · " + Math.round(d) + " m</div>";
}
}
worldBanner(h);
}
];
});
