/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PP = { base: -360000, g: null, out: null, rooms: {}, zone: "out", zoneAt: "", spots: [], solids: [], pads: [], ramps: [], gates: [], walk: [],
floors: [], tiles: [], beams: [], chase: [], flames: [], spin: [], glows: [], screens: [], people: [], dancers: [], ride: null,
dance: false, danceSent: 0, invite: null, inviteAt: 0, gather: null, gatherAt: 0, cat: null, catAt: 0, said: {}, gateSaid: 0, t: 0, mus: null,
lite: false, v80: null, bowl: null, kar: null, dart: null, boardAt: 0 };
var PP_JOB0 = 3000, PP_JOB1 = 3099;
var PP_KEYS = { club: "The Glowworm Club", echo: "The Echo Lounge", fest: "Jubilee Festival Grounds", beach: "Jubilee Beach Club",
port: "Jubilee Starport", shop: "Confetti & Co.", hall: "The Gilded Hall" };
var PP_NAME = "Jubilee, the Party Planet";
var PP_NIGHTS = [
["Sunday", "Sunday Slow Jam", "Soul, slow grooves and candle-lit lounges."],
["Monday", "Neon Mondays", "Wear your brightest; the floors run violet and teal."],
["Tuesday", "Retro Disco", "Mirror balls, platform shoes and seventies grooves."],
["Wednesday", "Karaoke Crown", "The Echo Lounge picks its singer of the week."],
["Thursday", "Glow Garden", "Lanterns and soft glow on every floor, all night."],
["Friday", "Fireworks Friday", "The big night: every stage and every floor open late."],
["Saturday", "Starlight Masquerade", "Masks on at the Glowworm; a gold-and-silver ball."]
];
function ppLite() { return typeof LITE !== "undefined" && !!LITE; }
var PP_MATS = {};
function ppM(col, o) { return __ZC(290, 0, this, arguments, new.target); }
function ppGlowMat(col, op) { var m = new THREE.MeshBasicMaterial({ color: col, fog: false }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} return m; }
function ppBox(w, h, d, m, x, y, z, G) { return wBox(w, h, d, m, x, y, z, G); }
function ppCyl(rt, rb, h, m, x, y, z, G, s) { return wCyl(rt, rb, h, m, x, y, z, G, s); }
function ppSph(r, m, x, y, z, G, s) { return wSph(r, m, x, y, z, G, s); }
function ppKeep(o) { o.userData.keep = 1; return o; }
function ppSign(G, lines, w, h, x, y, z, ry, bg, fg) { var s = wSign(lines, w, h, bg || "#160C24", fg || "#F2D9A0"); s.position.set(x, y, z); s.rotation.y = ry || 0; G.add(s); return s; }
function ppSolid(x, z, hw, hd, rot, h, b) { var o = { x: x, z: z, hw: hw, hd: hd, rot: rot || 0 }; if (h !== undefined)
o.h = h; if (b !== undefined)
o.b = b; PP.solids.push(o); return o; }
function ppSolidR(x, z, r) { PP.solids.push({ x: x, z: z, r: r }); }
function ppSpot(o) { PP.spots.push(o); return o; }
function ppRand(seed) { return wRand(seed); }
function ppHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function ppMix(a, b, f) { return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; }
function ppBake(G, cell) { return __ZC(290, 1, this, arguments, new.target); }
function ppWalls(G, x0, x1, z0, z1, h, mat, gaps, noSolid) { return __ZC(290, 2, this, arguments, new.target); }
function ppFloor(G, x0, x1, z0, z1, mat, y) { var f = wMesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat, (x0 + x1) / 2, (y || 0) + 0.01, (z0 + z1) / 2, G); f.rotation.x = -Math.PI / 2; return f; }
function ppCeil(G, x0, x1, z0, z1, h, mat) { var f = wMesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat, (x0 + x1) / 2, h, (z0 + z1) / 2, G); f.rotation.x = Math.PI / 2; return f; }
function ppWalk(x0, x1, z0, z1, zone, y) { PP.walk.push({ x0: x0, x1: x1, z0: z0, z1: z1, zone: zone, y: y || 0 }); }
function ppPad(x0, x1, z0, z1, h) {
PP.pads.push({ x0: x0, x1: x1, z0: z0, z1: z1, h: h });
if (h > 0.55)
PP.solids.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2 - 0.3, hd: (z1 - z0) / 2 - 0.3, rot: 0, h: h });
}
function ppRamp(x0, x1, z0, z1, h0, h1, axis) { PP.ramps.push({ x0: x0, x1: x1, z0: z0, z1: z1, h0: h0, h1: h1, axis: axis || "z" }); }
function ppGate(x0, x1, z0, z1, need, name) { PP.gates.push({ x0: x0, x1: x1, z0: z0, z1: z1, need: need, name: name }); }
function ppIn(r, x, z) { return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1; }
function ppSigned() { return typeof signedIn === "function" && signedIn(); }
function ppKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function ppAdult() { return ppKeeper() || (typeof ageAdult === "function" && ageAdult()); }
function ppMyJobs() { return ((typeof standing !== "undefined" && standing && standing.jobs) || []).filter(function (j) { var id = +(j.job_id || j.id || 0); return id >= PP_JOB0 && id <= PP_JOB1; }); }
function ppStaff() { return ppKeeper() || ppMyJobs().length > 0; }
function ppHasThing(arch) { var T = (typeof myThings !== "undefined" && myThings) || []; for (var i = 0; i < T.length; i++)
if (T[i].archetype === arch)
return true; return false; }
function ppVip() { return ppStaff() || ppHasThing("pp_vip_card"); }
function ppInvited() { return ppKeeper() || !!(PP.invite && PP.invite.no); }
function ppAllowed(need) {
if (need === "staff")
return ppStaff();
if (need === "vip")
return ppVip();
if (need === "invite")
return ppInvited();
if (need === "keeper")
return ppKeeper();
return true;
}
var PP_NEED_SAY = { staff: "Staff only. The badge reader by the door glows amber: it opens for anyone working a Party Planet post, and for the Keeper.",
vip: "VIP only. A host checks for a Glowworm VIP card (Confetti & Co. sells them) or a staff badge.",
invite: "The Gilded Hall opens only for the twenty Golden Invitation guests, their +1s, and the Keeper. The doorman bows: \"Your invitation, please.\"",
keeper: "The Keeper's anteroom. Only the Keeper goes in." };
function ppLoadInvite(force) {
if (!ppSigned()) {
PP.invite = null;
return;
}
if (!force && Date.now() - PP.inviteAt < 120000)
return;
PP.inviteAt = Date.now();
cityRpc("my_invitation", {}).then(function (o) { PP.invite = o && o.ok ? o : null; }).catch(function () { });
if (typeof loadThings === "function")
loadThings();
}
worldDef("party", {
base: PP.base, far: 7000, ownSky: true, tone: 620,
env: function () { return ppEnv(); },
build: function (G) { ppBuild(G); },
enter: function (opt) { ppEnter(opt || {}); },
leave: function () { ppLeaveTidy(); },
ground: function (x, z, feet) { return ppGround(x, z, feet); },
block: function (x, z, feet) { return ppBlocked(x, z, feet); },
tick: function (dt) { ppTick(dt); },
back: function () { ppBack(); }
});
function ppEnv() { return __ZC(290, 3, this, arguments, new.target); }
function ppOutH(x, z) {
var r = Math.hypot(x, z);
if (r < 370)
return 0;
var k = Math.min(1, (r - 370) / 80);
k = k * k * (3 - 2 * k);
return k * (10 + wFbm(x * 0.01, z * 0.01, 77, 3) * 22);
}
function ppGround(x, z, feet) { return __ZC(290, 4, this, arguments, new.target); }
function ppBlocked(x, z, feet) { return __ZC(290, 5, this, arguments, new.target); }
function ppWater(x, z) {
var dx = x - 190, dz = z + 170;
if (dx * dx + dz * dz < 57 * 57)
return true;
if (x > 98 && x < 132 && z > -232 && z < -208)
return true;
if (Math.hypot(x, z - 60) < 7.6)
return true;
return false;
}
var PP_ZONES = {
out: { name: "Jubilee", indoor: false },
roof: { name: "The Glowworm's Rooftop Terrace", indoor: false, key: PP_KEYS.club },
club: { name: "The Glowworm Club", indoor: true, key: PP_KEYS.club, x0: 1900, x1: 2100, z0: -80, z1: 80, fog: 0x120820, hemi: 0.9, hemiCol: 0xE8D0FF },
echo: { name: "The Echo Lounge", indoor: true, key: PP_KEYS.echo, x0: 2400, x1: 2600, z0: -80, z1: 80, fog: 0x101428, hemi: 1.0, hemiCol: 0xE0E8FF },
shop: { name: "Confetti & Co.", indoor: true, key: PP_KEYS.shop, x0: 2950, x1: 3050, z0: -60, z1: 60, fog: 0x2A1420, hemi: 1.1, hemiCol: 0xFFF0E8 },
hall: { name: "The Gilded Hall", indoor: true, key: PP_KEYS.hall, x0: 3420, x1: 3600, z0: -80, z1: 80, fog: 0x1E140A, hemi: 0.85, hemiCol: 0xFFE0C0 }
};
var PP_ROOF = { x0: 33, x1: 91, z0: 11, z1: 69, y: 18 };
function ppZoneAt(x, z, y) {
if (y > 12 && ppIn(PP_ROOF, x, z))
return "roof";
for (var k in PP_ZONES) {
var Z = PP_ZONES[k];
if (Z.x0 !== undefined && x >= Z.x0 && x <= Z.x1 && z >= Z.z0 && z <= Z.z1)
return k;
}
return "out";
}
function ppOutdoorKey(x, z) {
if (x < -60 && x > -340 && z > -190 && z < 160)
return PP_KEYS.fest;
if (x > 90 && z < -90)
return PP_KEYS.beach;
if (z > 270)
return PP_KEYS.port;
if (z < -262 && Math.abs(x) < 40)
return PP_KEYS.hall;
return null;
}
function ppHereKey() {
if (WLD.on !== "party")
return null;
var L = worldLocal(), z = PP_ZONES[PP.zone];
if (z && z.key)
return z.key;
return ppOutdoorKey(L.x, L.z);
}
