/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(347, function () {
"use strict";
return [
function (x, z, feet) {
var A = WLD.arrive;
if (A && Math.hypot(x - A.x, z - A.z) < DGB_RING)
return true;
var SR = dgbSpell("spellRing");
if (SR && WLD.w && Math.hypot(x + WLD.w.base - SR.x, z - SR.z) < SR.r)
return true;
if (WLD.on && /^gr_/.test(WLD.on) && x > 15000)
return true;
if (WLD.on === "underdark" && typeof udxAreaAt === "function") {
try {
var U = udxAreaAt(x, z, feet);
if (U && (U.kind === "inside" || U.kind === "mine"))
return true;
}
catch (e) { }
}
if (WLD.on === "race" && typeof pyZoneAt === "function") {
try {
if (pyZoneAt(x, z) === "paddock")
return true;
}
catch (e) { }
}
return false;
},
function () {
if (!(typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.w.g))
return false;
if (typeof walkMode !== "undefined" && !walkMode)
return false;
if (typeof DRIVE !== "undefined" && DRIVE.on)
return false;
if (dgbIndoors())
return false;
if (dgbLevel() < 3)
return false;
if (!DGB.force) {
if (dgbKeeper())
return false;
if (typeof dgrProtected === "function" && dgrProtected())
return false;
}
if (DGR.downT > 0 || DGR.guard > 0)
return false;
var L = dgrMeLocal();
if (dgbBarred(L.x, L.z, camera.position.y - 1.72))
return false;
return true;
},
function (K, seed) {
var g = null;
try {
if (K.body === "person") {
var BK = { body: "person", species: K.species, arm: K.arm, scale: K.scale, look: K.look ? function () { return K.look; } : null };
if (!BK.look)
delete BK.look;
g = bwBody(BK, "wild", seed);
}
else if (K.body === "drone")
g = bwBody({ body: "drone" }, "wild", seed);
else {
g = buildCreature({ id: "dgb_" + seed, archetype: K.arch, attrs: {}, solid: false, detail: 3, nights: [], city: true }, 1);
if (g && K.scale)
g.scale.multiplyScalar(K.scale);
}
}
catch (e) {
g = null;
}
if (!g) {
try {
g = wPerson("dgb" + seed, { species: "orc" });
}
catch (e2) {
g = new THREE.Group();
}
}
if (K.glow && typeof wGlow === "function")
try {
var gl = wGlow(K.glow, 3.2, 0.3);
gl.position.y = 1.2;
g.add(gl);
}
catch (e) { }
g.userData.dgb = 1;
return g;
},
function (feet) {
var L = dgrMeLocal();
for (var i = 0; i < 36; i++) {
var far = i < 16, a = far ? yaw + Math.PI * (0.35 + Math.random() * 1.3) * (Math.random() < 0.5 ? -1 : 1) : Math.random() * Math.PI * 2, r = far ? 24 + Math.random() * 16 : 12 + Math.random() * 12;
var x = L.x - Math.sin(a) * r, z = L.z - Math.cos(a) * r, h = dgbGround(x, z, feet);
if (h === null || Math.abs(h - feet) > 4)
continue;
if (dgbBlocked(x, z, h) || dgbBarred(x, z, h))
continue;
return { x: x, z: z, y: h };
}
return null;
},
function () {
var lv = dgbLevel(), P = DGB_PACE[lv >= 4 ? 4 : 3], list = dgbList(), feet = camera.position.y - 1.72;
var n = Math.round(dgbRand(P.n));
n = Math.min(n, dgbCap() - DGB.on.length);
if (n < 1)
return 0;
var made = [], lead = list[Math.floor(Math.random() * list.length)];
for (var i = 0; i < n; i++) {
var kind = i === 0 ? lead : list[Math.floor(Math.random() * list.length)], K = DGB_KINDS[kind];
if (!K)
continue;
var s = dgbSpot(feet);
if (!s)
continue;
var seq = ++DGB.seq, g = dgbBody(K, kind + "_" + seq);
g.position.set(s.x, s.y + (K.fly || 0), s.z);
WLD.w.g.add(g);
var B = { id: seq, kind: kind, k: K, g: g, x: s.x, z: s.z, y: s.y, yaw: 0, hp: K.hp, max: K.hp, st: "come", t: 0, cool: 1 + Math.random(), wind: 0, wob: Math.random() * 6, wg: WLD.w.g, leaveT: 0 };
DGB.on.push(B);
made.push(B);
}
if (!made.length)
return 0;
var nm = made[0].k.name, more = made.length - 1;
dgbTone(made[0].k.growl || 160, 0.35);
setStatus("⚠️ <b>Something comes for you: " + esc(dgbA(nm)) + "</b>" + (more ? " and " + more + " more" : "") + ", " + dgbArrow(made[0]) + ". " +
"Strike back (<b>E</b> or <b>F</b>, the headset's trigger, or <b>Strike</b> on a phone), or run: indoors, or back to the way in, you are safe.");
return made.length;
},
function (B, mx, mz, sp, dt) {
if (!mx && !mz)
return false;
var nx = B.x + mx * sp * dt, nz = B.z + mz * sp * dt;
var hov = dgbHover(B.k), feet = camera.position.y - 1.72;
var ok = function (x, z) {
var h = dgbGround(x, z, B.y);
if (hov) {
var y = (h !== null && Math.abs(h - B.y) <= 1.3) ? h : B.y + (feet - B.y) * Math.min(1, dt * 2);
if ((h !== null && dgbBlocked(x, z, y)) || dgbBarred(x, z, y))
return false;
B.y = y;
return true;
}
if (h === null || Math.abs(h - B.y) > 1.3)
return false;
if (dgbBlocked(x, z, h) || dgbBarred(x, z, h))
return false;
B.y = h;
return true;
};
if (ok(nx, nz)) {
B.x = nx;
B.z = nz;
return true;
}
if (ok(nx, B.z)) {
B.x = nx;
return true;
}
if (ok(B.x, nz)) {
B.z = nz;
return true;
}
return false;
},
function (B, dt, open, L, feet) {
var K = B.k, g = B.g;
if (B.st === "dead") {
B.t += dt;
var u = Math.min(1, B.t / 0.7);
g.rotation.z = u * Math.PI / 2 * (K.fly ? 0 : 1);
if (K.fly)
g.position.y = B.y + K.fly * Math.max(0, 1 - B.t);
if (B.t > 3)
g.position.y -= dt * 0.5;
if (B.t > 5)
dgbRemove(B);
return;
}
B.cool -= dt;
B.wob += dt;
if (B.hold > 0)
B.hold -= dt;
if (B.calm > 0)
B.calm -= dt;
if (B.hold > 0) {
B.wind = 0;
g.position.set(B.x, B.y + (K.fly || 0), B.z);
return;
}
var dec = dgbSpell("spellDecoy"), aim = L;
if (dec && isFinite(dec.x) && WLD.w)
aim = { x: dec.x - WLD.w.base, z: dec.z };
var dx = aim.x - B.x, dz = aim.z - B.z, d = Math.hypot(dx, dz) || 0.01, dy = Math.abs(feet - B.y), mx = 0, mz = 0, sp = K.spd;
var dMe = Math.hypot(L.x - B.x, L.z - B.z);
if (!open || dMe > DGB_GIVEUP || B.calm > 0 || (dgbSpell("spellUnseen") && dMe > 3)) {
if (B.st !== "leave") {
B.st = "leave";
B.leaveT = 0;
}
}
if (B.st === "leave") {
B.leaveT += dt;
mx = -dx / d * 0.7;
mz = -dz / d * 0.7;
B.yaw = dgbTurn(B.yaw, Math.atan2(mx, mz), dt * 4);
if (B.leaveT > 6 || d > DGB_GIVEUP + 25) {
dgbRemove(B);
return;
}
if (open && dMe < DGB_GIVEUP * 0.6 && B.leaveT > 1.5 && !(B.calm > 0) && !dgbSpell("spellUnseen"))
B.st = "come";
}
else {
B.st = "come";
B.yaw = dgbTurn(B.yaw, Math.atan2(dx, dz), dt * 5);
var reach = K.reach + (K.big ? 0.6 : 0);
if (B.wind > 0) {
B.wind -= dt;
if (B.wind <= 0 && aim === L)
dgbBlow(B, d, dy);
}
else if (K.shot && d < K.shot.r && d > reach * 1.6) {
if (d < K.shot.r * 0.45) {
mx = -dx / d * 0.6;
mz = -dz / d * 0.6;
}
else {
var s = Math.sin(B.wob * 0.7 + B.id);
mx = -dz / d * s * 0.4;
mz = dx / d * s * 0.4;
}
if (B.cool <= 0) {
B.cool = 2.2 + Math.random() * 1.4;
if (aim === L)
dgbThrow(B, L, feet);
}
}
else if (d > Math.max(K.big ? 2.6 : 1.5, reach * 0.8)) {
mx = dx / d;
mz = dz / d;
}
if (B.wind <= 0 && B.cool <= 0 && d < reach && dy < 2.5) {
B.wind = 0.5;
if (typeof bwAct === "function")
bwAct(g, "attack", 900);
dgbTone((K.growl || 160) * 0.8, 0.18);
}
}
for (var i = 0; i < DGB.on.length; i++) {
var O = DGB.on[i];
if (O === B || O.st === "dead")
continue;
var ox = B.x - O.x, oz = B.z - O.z, od = ox * ox + oz * oz;
if (od < 2.2 && od > 0.0001) {
var q = Math.sqrt(od);
mx += ox / q * 0.5;
mz += oz / q * 0.5;
}
}
if (dMe < (K.big ? 2.2 : 1.2) && dMe > 0.001) {
mx -= (L.x - B.x) / dMe * 0.8;
mz -= (L.z - B.z) / dMe * 0.8;
}
var m = Math.hypot(mx, mz);
if (m > 1) {
mx /= m;
mz /= m;
}
dgbStep(B, mx, mz, sp, dt);
g.position.set(B.x, B.y + (K.fly ? K.fly + Math.sin(B.wob * 1.3) * 0.2 : 0), B.z);
g.rotation.y = B.yaw;
var b = g.children[0];
if (b) {
if (B.wind > 0)
b.position.z = Math.sin((0.5 - B.wind) / 0.5 * Math.PI) * 0.4;
else if (b.position.z)
b.position.z = 0;
if (K.body === "kit" && !K.fly)
b.position.y = (mx || mz) ? Math.abs(Math.sin(B.wob * sp * 1.6)) * 0.06 : 0;
}
if (typeof bwBar === "function")
bwBar(g, B.hp, B.max, (K.big ? 3.4 : 2.3) / (K.scale || 1), 1.1 / (K.scale || 1));
},
function (B, L, feet) {
var K = B.k, c = K.shot.c, m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: c }));
var y0 = B.y + (K.fly || 0) + (K.big ? 2.2 : 1.3), ty = feet + 1.2, dx = L.x - B.x, dz = L.z - B.z, d = Math.hypot(dx, dz) || 1, v = 13;
m.position.set(B.x + dx / d * 0.6, y0, B.z + dz / d * 0.6);
B.wg.add(m);
if (typeof bwAct === "function")
bwAct(B.g, "cast", 800);
DGB.orbs.push({ m: m, vx: dx / d * v, vz: dz / d * v, vy: (ty - y0) / (d / v), t: 0, dmg: Math.round(K.dmg * (0.85 + Math.random() * 0.3)), from: K.name, wg: B.wg });
dgbTone(520, 0.08);
},
function (dt, L, feet) {
DGB.orbs.slice().forEach(function (o) {
if (!WLD.w || o.wg !== WLD.w.g) {
dgbOrbOff(o);
return;
}
o.t += dt;
o.m.position.x += o.vx * dt;
o.m.position.y += o.vy * dt;
o.m.position.z += o.vz * dt;
var p = o.m.position, d = Math.hypot(p.x - L.x, p.z - L.z), dy = Math.abs(p.y - (feet + 1.1));
if (d < 0.9 && dy < 1.1) {
dgbOrbOff(o);
dgbHurt(o.dmg, o.from);
return;
}
if (o.t > 2.6)
dgbOrbOff(o);
});
},
function (d, name) {
if (!dgbOpen())
return;
d = Math.max(1, Math.min(25, d | 0));
if (typeof spellHarm === "function")
try {
var w = +spellHarm(d);
if (isFinite(w))
d = Math.max(0, Math.round(w));
}
catch (e) { }
if (!d) {
setStatus("<b>" + esc(dgbUp(dgbA(name))) + "</b> strikes you, but your ward holds.");
return;
}
DGR.hp -= d;
DGR.hurt = Math.min(1, DGR.hurt + d / 40);
DGB.quiet = 0;
DGR.quiet = 0;
DGB.engaged = 8;
DGR.fought = DGR.t;
dgbTone(150, 0.12);
if (DGR.hp <= 0)
dgbBeaten(name);
else
setStatus("<b>" + esc(dgbUp(dgbA(name))) + "</b> strikes you (−" + d + "). Vigour " + Math.round(DGR.hp) + " of " + DGR.max + ".");
},
function (name) {
DGR.hp = 0;
DGR.downT = 1.6;
var id = dgrWhere();
setStatus("<b>You are beaten by " + esc(dgbA(name)) + ".</b> You wake by the way into " + esc(dgrNameOf(id).split(":")[0]) + ". A beast takes nothing: no gold, and nothing drops.");
DGB.on.forEach(function (B) { if (B.st !== "dead")
B.st = "leave"; });
DGB.orbs.slice().forEach(dgbOrbOff);
DGB.next = -1;
},
function () {
if (!DGB.on.length || !dgbOpen())
return null;
var shoot = typeof dgrShooting === "function" && dgrShooting(), L = dgrMeLocal(), feet = camera.position.y - 1.72, best = null, bd = 1e9;
DGB.on.forEach(function (B) {
if (B.st === "dead")
return;
var dx = B.x - L.x, dz = B.z - L.z, d = Math.hypot(dx, dz), reach = (shoot ? 18 : 3.2) + (B.k.big ? 0.8 : 0) + ((B.k.scale || 1) >= 2 ? 1 : 0);
if (d > reach || Math.abs(B.y - feet) > 3)
return;
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
if (Math.abs(rel) > (d < 2.2 ? 1.7 : shoot ? 0.45 : 0.9))
return;
if (d < bd) {
bd = d;
best = B;
}
});
return best;
},
function (B) {
if (!B || B.st === "dead" || DGB.cool > 0)
return;
DGB.cool = 0.6;
DGB.engaged = 8;
DGR.fought = DGR.t;
var d = dgbMyDmg();
B.hp -= d;
B.st = "come";
dgbTone(260, 0.08);
if (typeof harmKnock === "function" && B.k.body === "person")
try {
harmKnock(B.g, false);
}
catch (e) { }
var L = dgrMeLocal(), dx = B.x - L.x, dz = B.z - L.z, dd = Math.hypot(dx, dz) || 1;
dgbStep(B, dx / dd, dz / dd, B.k.big ? 3 : 6, 0.12);
B.cool = Math.max(B.cool, 0.5);
if (B.hp <= 0)
dgbFell(B);
else
setStatus("You strike " + esc(dgbA(B.k.name).replace(/^(a|an) /, "the ")) + " (" + d + "). " + Math.max(0, Math.round(B.hp)) + " of " + B.max + " left in it.");
},
function (B) {
B.st = "dead";
B.t = 0;
B.hp = 0;
if (B.g.userData.bwBarS)
B.g.userData.bwBarS.visible = false;
if (typeof bwAct === "function")
bwAct(B.g, "fall", 3000);
dgbTone(660, 0.2);
var D = dgbData();
D.beaten = (D.beaten || 0) + 1;
var nm = B.k.name.replace(/^The /, "the ");
if (B.k.spoil && Math.random() < 0.6) {
D.trophies.push({ n: B.k.spoil[0], i: B.k.spoil[1], f: B.k.name, w: dgrNameOf(dgrWhere()).split(":")[0], at: Date.now() });
if (D.trophies.length > 300)
D.trophies.splice(0, D.trophies.length - 300);
setStatus("⚔️ <b>You beat " + esc(dgbA(nm).replace(/^(a|an) /, "the ")) + ".</b> It leaves <b>" + esc(B.k.spoil[1] + " " + B.k.spoil[0]) + "</b>: a trophy, in your Backpack.");
}
else
setStatus("⚔️ <b>You beat " + esc(dgbA(nm).replace(/^(a|an) /, "the ")) + ".</b>");
try {
if (typeof save === "function")
save();
}
catch (e) { }
}
];
});
