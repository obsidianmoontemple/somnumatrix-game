/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(208, function () {
"use strict";
return [
function (k) {
if (k === "neverland" && typeof NV !== "undefined")
return NV.talkers;
if (k === "sea" && typeof SEA !== "undefined")
return SEA.talkers;
if (k === "underdark" && typeof UD !== "undefined")
return UD.talkers;
if (k === "northpole" && typeof NP !== "undefined")
return NP.talkers;
if (k === "station" && typeof STN !== "undefined")
return STN.spots;
if (k === "casino" && typeof CAS !== "undefined")
return CAS.spots;
if (k === "palace" && typeof IP !== "undefined")
return IP.spots;
return null;
},
function (W, x, z) {
var y;
try {
y = (W.key === "sea" && typeof seaHeight === "function") ? seaHeight(x, z) : W.ground ? W.ground(x, z) : 0;
}
catch (e) {
return false;
}
if (!isFinite(y))
return false;
var k = W.key;
if (k === "underdark") {
var h = (typeof udHeight === "function") ? udHeight(x, z) : y, wl = (typeof UD !== "undefined" && UD.water && UD.water.position) ? UD.water.position.y : -1e9;
return h > -900 && y > wl + 0.2;
}
return k === "neverland" ? y > -1.0 : k === "sea" ? y > -0.9 : y > -500;
},
function (W, x, z, r, wide, dMax, clearArrival) {
var a0 = (dkHash("near" + x.toFixed(1) + dkSeason()) % 8) * Math.PI / 4;
for (var d = Math.min(2, r); d <= dMax; d += 1) {
for (var q = 0; q < 12; q++) {
var a = a0 + q * Math.PI / 6, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, y = dkGround(W, px, pz), ok = dkDry(W, px, pz);
if (ok && W.block) {
var wd = wide || 0.8;
for (var j = 0; j < 9 && ok; j++) {
var ox = j === 1 ? wd : j === 2 ? -wd : j === 5 ? 0.8 : j === 6 ? -0.8 : 0, oz = j === 3 ? wd : j === 4 ? -wd : j === 7 ? 0.8 : j === 8 ? -0.8 : 0;
try {
if (W.block(px + ox, pz + oz, y))
ok = false;
}
catch (e) { }
}
}
if (ok && Math.abs(dkGround(W, px + 1.5, pz) - y) > 1.2)
ok = false;
if (ok && W.key === "casino" && Math.hypot(px, pz) > 29 - (wide || 0.8))
ok = false;
if (ok && clearArrival && dkNearArrival(W, px, pz))
ok = false;
if (ok)
return { x: px, z: pz, y: y };
}
}
return null;
},
function (n) {
var K = DK_KEYS[n - 1], g = new THREE.Group();
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 8, 20), new THREE.MeshLambertMaterial({ color: K.col, emissive: new THREE.Color(K.col), emissiveIntensity: 0.35 }));
ring.position.y = 1.9;
g.add(ring);
var body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.22), new THREE.MeshLambertMaterial({ color: K.col, emissive: new THREE.Color(K.col), emissiveIntensity: 0.25 }));
body.position.y = 1.5;
g.add(body);
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.3, 8), new THREE.MeshLambertMaterial({ color: 0x4A3A2A }));
post.position.y = 0.65;
g.add(post);
if (typeof wGlow === "function") {
var s = wGlow(K.col, 1.6, 0.35);
s.position.y = 1.6;
g.add(s);
}
g.userData.noCull = 1;
return g;
},
function () {
var g = new THREE.Group(), stone = new THREE.MeshLambertMaterial({ color: 0x6E6A78 }), cry = new THREE.MeshLambertMaterial({ color: 0x9AD8FF, emissive: new THREE.Color(0x4A90C8), emissiveIntensity: 0.7 });
var legs = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.3, 0.5), stone);
legs.position.y = 0.65;
g.add(legs);
var body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.3, 0.7), stone);
body.position.y = 1.95;
g.add(body);
var head = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.6, 0.55), stone);
head.position.y = 2.95;
g.add(head);
[-0.14, 0.14].forEach(function (x) { var e = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.04), cry); e.position.set(x, 3.0, 0.29); g.add(e); });
var heart = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), cry);
heart.position.set(0, 2.05, 0.38);
g.add(heart);
var blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.05), cry);
blade.position.set(0.85, 1.7, 0.2);
g.add(blade);
[-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.1, 0.3), stone); a.position.set(s * 0.8, 2.0, 0); g.add(a); });
g.userData.noCull = 1;
return g;
},
function () {
var g = new THREE.Group(), stone = new THREE.MeshLambertMaterial({ color: 0x5A5466 }), glow = new THREE.MeshLambertMaterial({ color: 0xE8D8A8, emissive: new THREE.Color(0xC9A868), emissiveIntensity: 0.8 });
var st = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.22), stone);
st.position.y = 0.55;
g.add(st);
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.22, 16, 1, false, 0, Math.PI), stone);
top.rotation.z = Math.PI / 2;
top.rotation.y = Math.PI / 2;
top.position.y = 1.1;
g.add(top);
[[0, 0.78, 0.13, 0.08, 0.32], [0, 0.98, 0.13, 0.2, 0.2], [0.06, 0.66, 0.13, 0.1, 0.05]].forEach(function (q) { var r = new THREE.Mesh(new THREE.BoxGeometry(q[3], q[4], 0.03), glow); r.position.set(q[0], q[1], q[2]); g.add(r); var b = r.clone(); b.position.z = -q[2]; g.add(b); });
var ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 32), new THREE.MeshBasicMaterial({ color: 0xC9A868, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.03;
g.add(ring);
if (typeof wGlow === "function") {
var s = wGlow(0xC9A868, 1.8, 0.3);
s.position.y = 0.9;
g.add(s);
}
g.userData.noCull = 1;
return g;
},
function (i) {
var M = dkMarks()[i];
if (!M || typeof WLD === "undefined" || WLD.on !== M.w)
return null;
var S = dkNamed(dkWorldList(M.w), M.spot);
if (!S)
return null;
var W = WLD.w, ck = "mark" + i + "@" + dkSeason() + "@" + M.w;
if (!DK.pos[ck] || DK.pos[ck].int !== W.g) {
var wide = (M.kind === "play" || M.kind === "arcade") ? 2.2 : 0;
var F = (typeof S.y === "number" && !dkNearArrival(W, S.x + ((dkHash(ck) % 2) ? 1.6 : -1.6), S.z + 1.2)) ? { x: S.x + ((dkHash(ck) % 2) ? 1.6 : -1.6), z: S.z + 1.2, y: S.y } : dkFreeNear(W, S.x, S.z, Math.min(S.r || 3, 4) + 1 + (wide ? 2 : 0), wide);
if (!F)
return null;
DK.pos[ck] = { F: F, int: W.g };
}
var F2 = DK.pos[ck].F;
return { x: W.base + F2.x, z: F2.z, y: F2.y, S: S };
},
function (i) {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>A mark of the hunt.</b> Sign in to walk the trail.");
return;
}
cityRpc("hunt_step", { p_step: i, p_answer: null }).then(function (o) {
if (o && o.ok) {
dkChime(true);
dkSay("<b>A mark on the trail.</b> " + esc(o.say || "") + " The next clue is in the Hunt panel.");
dkPage(o.page);
return dkLoad();
}
dkSay(esc((o && o.say) || "The mark does not answer."));
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function (n) {
var K = dkSet()[n - 1];
if (!K || typeof WLD === "undefined" || WLD.on !== K.w)
return null;
var S = dkNamed(dkWorldList(K.w), K.spot);
if (!S)
return null;
var W = WLD.w, ck = "lock" + n + "@" + dkSeason() + "@" + K.w;
if (!DK.pos[ck] || DK.pos[ck].int !== W.g) {
var F = dkFreeNear(W, S.x, S.z, Math.min(S.r || 3, 4) + 1);
if (!F)
return null;
DK.pos[ck] = { F: F, int: W.g };
}
var F2 = DK.pos[ck].F;
return { x: W.base + F2.x, z: F2.z, y: F2.y, S: S, lx: F2.x, lz: F2.z };
},
function () {
var K = dkSet()[1], list = dkWorldList(K.w), sp = dkKeySpot(2);
if (!sp)
return;
var pool = (list || []).filter(function (T) { return T && typeof T.x === "number" && !T.p && T !== sp.S && isFinite(T.x); }), at = { x: sp.lx, z: sp.lz }, marks = [], total = 0;
while (marks.length < 8 && pool.length) {
var bi = -1, bd = 1e9;
pool.forEach(function (T, i) { var d = Math.hypot(T.x - at.x, T.z - at.z); if (d >= 10 && d < bd) {
bd = d;
bi = i;
} });
if (bi < 0)
break;
var T = pool.splice(bi, 1)[0];
marks.push({ x: T.x, z: T.z, name: T.name });
total += bd;
at = T;
}
if (marks.length < 4) {
dkSay("The waymarks are not out yet. Try again in a moment.");
return;
}
if (marks.length < 7) {
marks = marks.concat(marks.slice(0, -1).reverse().slice(0, 8 - marks.length));
total *= 1.8;
}
cityRpc("hunt_trial", { p_key: 2 }).then(function (o) {
if (!(o && o.ok)) {
dkSay(esc((o && o.say) || "The trial would not begin."));
return;
}
var limit = Math.max(75, Math.min(780, Math.round(total / 3.7 + 25)));
DK.race = { marks: marks, i: 0, t0: Date.now(), limit: limit, meshes: [] };
var W = WLD.w;
marks.forEach(function (m, i) {
var col = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 26, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0x5FC894, transparent: true, opacity: i === 0 ? 0.38 : 0.12, side: THREE.DoubleSide, depthWrite: false }));
col.position.set(W.base + m.x, dkGround(W, m.x, m.z) + 13, m.z);
col.userData.noCull = 1;
scene.add(col);
DK.race.meshes.push(col);
});
dkChime(true);
dkSay("<b>The Jade Key's race.</b> Reach " + marks.length + " waymarks in turn (tall green lights) in " + Math.floor(limit / 60) + " min " + (limit % 60) + " s. First: <b>" + esc(marks[0].name) + "</b>.");
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function (won) {
var R = DK.race;
if (!R)
return;
DK.race = null;
R.meshes.forEach(function (m) { if (m.parent)
m.parent.remove(m); try {
m.geometry.dispose();
m.material.dispose();
}
catch (e) { } });
if (!won) {
dkSay("<b>The race is over:</b> time ran out. The jade lock waits for you to try again.");
return;
}
var wait = Math.max(0, 61500 - (Date.now() - R.t0));
if (wait > 1500)
dkSay("<b>Every waymark reached.</b> The jade lock is turning…");
setTimeout(function () { dkClaim(2); }, wait);
},
function () {
var R = DK.race;
if (!R)
return;
if (typeof WLD === "undefined" || WLD.on !== dkSet()[1].w) {
dkRaceEnd(false);
return;
}
var left = R.limit - (Date.now() - R.t0) / 1000;
if (left <= 0) {
dkRaceEnd(false);
return;
}
var m = R.marks[R.i], L = worldLocal(), d = Math.hypot(L.x - m.x, L.z - m.z);
if (typeof worldBanner === "function")
worldBanner("🟢 Waymark <b>" + (R.i + 1) + " of " + R.marks.length + "</b> · " + esc(m.name) + " · " + Math.round(d) + " m · <b>" + Math.floor(left / 60) + ":" + ("0" + Math.floor(left % 60)).slice(-2) + "</b> left");
if (d < 4.5) {
R.meshes[R.i].material.opacity = 0.05;
R.i++;
if (typeof playTone === "function")
playTone(700 + R.i * 60, 0.2);
if (R.i >= R.marks.length) {
if (typeof worldBanner === "function")
worldBanner(null);
dkRaceEnd(true);
return;
}
R.meshes[R.i].material.opacity = 0.38;
dkSay("Waymark " + R.i + " reached. Next: <b>" + esc(R.marks[R.i].name) + "</b>.");
}
},
function () {
cityRpc("hunt_trial", { p_key: 3 }).then(function (o) {
if (!(o && o.ok)) {
dkSay(esc((o && o.say) || "The guardian does not move."));
return;
}
DK.duel = { t0: Date.now(), hits: 0, miss: 0, ph: 0, speed: 0.7, zone: 0.22, zc: 0.5, over: false, last: performance.now() };
DK.open = true;
dkPaint();
dkDuelLoop();
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function () {
var D = DK.duel;
if (!D || D.over)
return;
var p = dkDuelPos(), hit = Math.abs(p - D.zc) <= D.zone / 2;
if (hit) {
D.hits++;
D.speed += 0.13;
D.zone = Math.max(0.1, D.zone - 0.02);
D.zc = 0.2 + (dkHash(D.hits + ":" + D.t0) % 60) / 100;
if (typeof playTone === "function")
playTone(520 + D.hits * 80, 0.15);
}
else {
D.miss++;
if (typeof playTone === "function")
playTone(180, 0.25);
}
if (D.hits >= 7) {
D.over = true;
D.won = true;
dkPaint();
var wait = Math.max(0, 21000 - (Date.now() - D.t0));
setTimeout(function () { dkClaim(3); }, wait);
return;
}
if (D.miss >= 3) {
D.over = true;
D.won = false;
dkPaint();
return;
}
dkPaint();
},
function () {
var D = DK.duel;
if (!D)
return "";
var h = '<div style="margin:10px 0;padding:10px;border:1px solid #6A8AB8;border-radius:6px;background:rgba(80,120,180,.08)"><b>The Guardian of the Crystal Key</b>';
if (D.over)
return h + '<div style="margin:6px 0;line-height:1.5">' + (D.won ? 'The guardian lowers its blade and steps aside. The Crystal Key is yours…' : 'The guardian stands firm. Catch your breath and face it again.') + '</div>' +
(D.won ? '' : '<button class="btn" data-dk="duel">Face it again</button> ') + '<button class="btn" data-dk="duelx">Close</button></div>';
h += '<div style="color:var(--dim);margin:4px 0 8px;line-height:1.5">Strike when the marker is inside the bright band. <b>Seven hits</b> before <b>three misses</b>; it grows quicker with every blow. (Tap Strike, or press Space.)</div>';
h += '<div style="position:relative;height:26px;border-radius:13px;background:rgba(255,255,255,.08);overflow:hidden">' +
'<div style="position:absolute;top:0;bottom:0;left:' + ((D.zc - D.zone / 2) * 100).toFixed(1) + '%;width:' + (D.zone * 100).toFixed(1) + '%;background:rgba(154,216,255,.45)"></div>' +
'<div id="dk-mark" style="position:absolute;top:2px;bottom:2px;width:6px;margin-left:-3px;border-radius:3px;background:#F0E0B8;left:' + (dkDuelPos() * 100).toFixed(2) + '%"></div></div>';
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span>Hits <b>' + D.hits + '</b>/7 · Misses <b>' + D.miss + '</b>/3</span><button class="btn" data-dk="strike" style="padding:10px 26px;font-size:15px">⚔️ Strike</button></div></div>';
return h;
},
function (n, answer) {
return cityRpc("hunt_claim", { p_key: n, p_answer: answer || null }).then(function (o) {
if (o && o.ok) {
DK.riddle = false;
if (n === 3)
DK.duel = null;
dkChime(true);
if (o.page)
DK.newPage = o.page;
dkSay("<b>" + esc(o.name || DK_KEYS[n - 1].name) + "</b> is yours. It is in your backpack." + " Read what is cut into it: the next clue is in the Hunt panel.");
DK.msg = o.say || "";
return dkLoad().then(function () { dkLit(); DK.open = true; dkPaint(); });
}
DK.msg = (o && o.say) || "Not this time.";
if (o && o.wait && DK.st && DK.st.me) {
DK.st.me.wait = o.wait;
DK.at = Date.now();
}
dkPaint();
if (!o || !o.wrong)
dkSay(esc(DK.msg));
}).catch(function (e) { DK.msg = (e && e.message) || String(e); dkPaint(); });
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>The Gate of Dreams.</b> Sign in to join the hunt: three keys open it.");
return;
}
cityRpc("hunt_gate", {}).then(function (o) {
var say = (o && o.say) || "The Gate does not open.";
if (o && o.question) {
DK.gq = DK.gq || { phase: "memory" };
if (DK.gq.phase === "memory" && !DK.gq.seq)
dkMemStart();
DK.open = true;
dkPaint();
dkSay("<b>The Gate of Dreams.</b> " + esc(say));
return;
}
if (o && o.hidden) {
dkRoomBegin();
dkSay("<b>The Gate of Dreams.</b> " + esc(say));
return;
}
if (o && o.ok) {
dkChime(true);
if (DK.gate && DK.gate.mesh)
DK.gate.mesh.userData.veil.material.opacity = 0.12;
}
if (o && o.won)
say += " The prize: <b>" + (typeof gold === "function" ? gold(o.prize_gold) : o.prize_gold + " gold") + "</b> and " + esc(o.prize_text || "the Dreamer's Crown") + ", in your purse and your backpack.";
dkSay("<b>The Gate of Dreams.</b> " + (o && o.won ? say : esc(say)));
dkLoad();
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function (k) {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>A dream shard.</b> Sign in to keep the shards you find: they count towards your rank in the hunt.");
return;
}
cityRpc("hunt_shard", { p_place: k }).then(function (o) {
if (o && o.ok) {
if (DK.st && DK.st.me) {
DK.st.me.shards = dkShards().concat([k]);
DK.st.me.score = o.score;
}
else
dkLoad();
dkChime(false);
dkSay("<b>A dream shard</b> from " + esc(dkPlaceName(k)) + ": <b>" + o.shards + " of " + DK_PLACES.length + "</b>. Your rank in the hunt rises.");
}
else
dkSay(esc((o && o.say) || "The shard slips away."));
if (!DK.st || !DK.st.me)
dkLoad();
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function () {
if (DK.mark && DK.mark.mesh.parent)
DK.mark.mesh.parent.remove(DK.mark.mesh);
DK.mark = null;
if (DK.mesh && DK.mesh.parent)
DK.mesh.parent.remove(DK.mesh);
DK.mesh = null;
DK.meshKey = null;
if (DK.lock && DK.lock.mesh && DK.lock.mesh.parent)
DK.lock.mesh.parent.remove(DK.lock.mesh);
DK.lock = null;
if (DK.guard && DK.guard.parent)
DK.guard.parent.remove(DK.guard);
DK.guard = null;
},
function (col, lines) {
var g = new THREE.Group(), stone = new THREE.MeshLambertMaterial({ color: 0xCFC6B4 }), trim = new THREE.MeshLambertMaterial({ color: col, emissive: new THREE.Color(col), emissiveIntensity: 0.35 });
[-1, 1].forEach(function (sd) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 0.5), stone); p.position.set(sd * 1.3, 1.7, 0); g.add(p); });
var top = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 0.6), stone);
top.position.y = 3.6;
g.add(top);
var band = new THREE.Mesh(new THREE.BoxGeometry(3.24, 0.12, 0.64), trim);
band.position.y = 3.42;
g.add(band);
var veil = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 3.3), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
veil.position.y = 1.68;
g.add(veil);
if (typeof wSign === "function") {
var sg = wSign(lines, 1.9, 0.5, "#2A2238", "#F0E0B8");
sg.position.set(0, 4.15, 0.32);
g.add(sg);
var sb = sg.clone();
sb.position.z = -0.32;
sb.rotation.y = Math.PI;
g.add(sb);
}
if (typeof wGlow === "function") {
var s = wGlow(col, 2.4, 0.3);
s.position.y = 1.8;
g.add(s);
}
g.userData.noCull = 1;
return g;
},
function () {
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x5A3E26 }), page = new THREE.MeshLambertMaterial({ color: 0xEFE4C8, emissive: new THREE.Color(0x8A7A5A), emissiveIntensity: 0.3 });
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.1, 8), wood);
post.position.y = 0.55;
g.add(post);
var foot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 12), wood);
foot.position.y = 0.04;
g.add(foot);
var desk = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.5), wood);
desk.position.y = 1.15;
desk.rotation.x = -0.35;
g.add(desk);
var book = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.04, 0.38), page);
book.position.set(0, 1.2, 0.01);
book.rotation.x = -0.35;
g.add(book);
if (typeof wGlow === "function") {
var s = wGlow(0x7AB8C8, 1.4, 0.3);
s.position.y = 1.2;
g.add(s);
}
g.userData.noCull = 1;
return g;
},
function (ice) {
var g = new THREE.Group(), frame = new THREE.MeshLambertMaterial({ color: ice ? 0xBFE6F5 : 0x8A6A48, emissive: new THREE.Color(ice ? 0x5A9AC8 : 0x3A2A1A), emissiveIntensity: ice ? 0.45 : 0.15, transparent: !!ice, opacity: ice ? 0.9 : 1 });
var col = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.12), frame);
col.position.set(-0.5, 0.9, 0);
g.add(col);
var neck = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 0.12), frame);
neck.position.set(0.02, 1.78, 0);
neck.rotation.z = -0.25;
g.add(neck);
var box = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.5, 0.22), frame);
box.position.set(0.5, 0.75, 0);
box.rotation.z = 0.42;
g.add(box);
var str = new THREE.MeshBasicMaterial({ color: 0xF0E8D0 });
for (var i = 0; i < 8; i++) {
var x = -0.38 + i * 0.11, h = 0.5 + i * 0.12;
var sm = new THREE.Mesh(new THREE.BoxGeometry(0.012, h, 0.012), str);
sm.position.set(x, 1.62 - h / 2 - i * 0.02, 0);
g.add(sm);
}
if (typeof wGlow === "function") {
var s = wGlow(ice ? 0x9AD8FF : 0xE8C890, 1.6, 0.3);
s.position.y = 1.0;
g.add(s);
}
g.userData.noCull = 1;
return g;
},
function () {
var g = new THREE.Group(), brass = new THREE.MeshLambertMaterial({ color: 0xB08A3E, emissive: new THREE.Color(0x5A4418), emissiveIntensity: 0.35 }), stone = new THREE.MeshLambertMaterial({ color: 0x7A7470 }), peb = new THREE.MeshLambertMaterial({ color: 0x9A948C });
var table = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.6, 0.75, 14), stone);
table.position.y = 0.38;
g.add(table);
for (var i = 0; i < 14; i++) {
var p = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), peb);
p.position.set(Math.cos(i * 2.4) * 0.08 * (1 + i % 4), 0.8 + (i > 9 ? 0.06 : 0), Math.sin(i * 2.4) * 0.08 * (1 + i % 4));
g.add(p);
}
var seat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.6), stone);
seat.position.set(0, 0.23, -1.05);
g.add(seat);
var body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.85, 0.4), brass);
body.position.set(0, 0.9, -1.05);
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), brass);
head.position.set(0, 1.55, -1.05);
g.add(head);
[-0.08, 0.08].forEach(function (x) { var e = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.02), new THREE.MeshBasicMaterial({ color: 0xF0D890 })); e.position.set(x, 1.58, -0.84); g.add(e); });
[-1, 1].forEach(function (sd) { var a = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.7), brass); a.position.set(sd * 0.32, 0.95, -0.75); g.add(a); });
g.userData.noCull = 1;
return g;
},
function (kind) {
if (kind === "play")
return dkArchMesh(0xC87A3A, ["The First Gate", "a play in three parts"]);
if (kind === "arcade")
return dkArchMesh(0x3FA878, ["The Second Gate", "one perfect game"]);
if (kind === "tale")
return dkLecternMesh();
if (kind === "song")
return dkHarpMesh(WLD && WLD.on === "northpole");
return dkMarkMesh();
},
function (kind, stp) {
if (kind === "play")
return { html: "🎭 <b>The First Gate</b> · <b>press E</b> to take the stage", fn: function () { dkPlayBegin(); } };
if (kind === "arcade")
return { html: "🌠 <b>The Second Gate</b> · <b>press E</b> to play its perfect game", fn: function () { dkStarsBegin(); } };
if (kind === "tale")
return { html: "📖 <b>A story on a lectern</b>: The Drowned Library · <b>press E</b> to read it", fn: function () { dkTaleBegin(); } };
if (kind === "song")
return { html: "🎵 <b>A harp, left for you</b> · <b>press E</b> to play it", fn: function () { dkHarpBegin(); } };
return { html: "🜂 <b>A mark of the hunt</b>, cut in an old stone · <b>press E</b> to read it", fn: function () { dkMarkTake(stp); } };
},
function () {
var CL = dkClue(), notch = {};
if (CL && CL.kind === "almanac" && CL.data && Array.isArray(CL.data.notch))
CL.data.notch.forEach(function (q) { notch[q[0] + ":" + q[1]] = 1; });
var h = '<div style="margin:6px 0 10px;padding:12px 14px;border:1px solid #8A7A4A;border-radius:6px;background:#EFE4C8;color:#2A2018;font-family:Georgia,serif;line-height:1.6">' +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A5A2A">The Dreamwright\'s Almanac</div><button class="btn" data-dk="modex">Close the book</button></div>' +
'<div style="font-size:12px;color:#6A5A3A;margin:4px 0 8px">The things the Dreamwright loved, in their own words. Most of the hunt\'s answers are somewhere in here.</div>';
DK_ALMANAC.forEach(function (e, ei) {
var b = "", tx = e.b;
for (var i = 0; i < tx.length; i++) {
var ch = tx[i];
b += notch[ei + ":" + i] ? '<span style="border-bottom:1px solid rgba(90,58,26,.5);padding-bottom:0">' + esc(ch) + '</span>' : ch === "\n" ? "<br>" : esc(ch);
}
h += '<details style="margin:4px 0;border-top:1px solid rgba(90,58,26,.2);padding-top:4px"><summary style="cursor:pointer"><b>' + (ei + 1) + '. ' + esc(e.t) + '</b></summary><div style="margin:4px 0 6px">' + b + '</div></details>';
});
return h + '</div>';
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>The Warden.</b> Sign in to walk the trail.");
return;
}
cityRpc("hunt_begin", { p_step: dkSteps() }).then(function (o) {
if (!(o && o.ok)) {
dkSay(esc((o && o.say) || "The Warden does not look up."));
return;
}
DK.stones = { t0: Date.now(), wins: 0, lost: false, pile: 0, turn: "you", say: "The Warden of brass sets out a heap of stones. \"Take one, two or three. Whoever takes the last stone wins. You first. I have never lost.\"" };
dkStonesDeal();
dkMode("stones");
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function (k) {
var S = DK.stones;
if (!S || S.turn !== "you" || S.over)
return;
k = Math.min(k, S.pile);
if (k < 1)
return;
S.pile -= k;
if (typeof playTone === "function")
playTone(420, 0.08);
if (S.pile <= 0) {
S.wins++;
if (S.wins >= 3) {
S.over = true;
S.say = "The Warden looks at the empty table for a long time. \"Three times,\" he says. \"Nobody has ever done that.\"";
dkPaint();
var wait = Math.max(0, 41500 - (Date.now() - S.t0));
setTimeout(function () { cityRpc("hunt_done", { p_step: dkSteps(), p_flawless: !S.lost }).then(function (o) { DK.stones = null; if (o && o.ok)
return dkStepWon(o); DK.mode = null; DK.msg = (o && o.say) || ""; dkPaint(); }).catch(function (e) { DK.msg = (e && e.message) || String(e); dkPaint(); }); }, wait);
return;
}
S.say = "You take the last stone. The Warden's eyes flicker. \"Again.\" (" + S.wins + " of 3 running)";
dkStonesDeal();
dkPaint();
return;
}
S.turn = "him";
S.say = "The Warden considers the heap…";
dkPaint();
setTimeout(function () {
if (DK.stones !== S || S.over)
return;
var w = S.pile % 4 || (1 + Math.floor(Math.random() * Math.min(3, S.pile)));
w = Math.min(w, S.pile);
S.pile -= w;
if (S.pile <= 0) {
S.wins = 0;
S.lost = true;
S.say = "The Warden takes " + w + " and the last stone with it. \"Again, from nothing,\" he says. You need three wins running.";
dkStonesDeal();
}
else {
S.turn = "you";
S.say = "The Warden takes " + w + ".";
}
dkPaint();
}, 1100);
},
function () {
var S = DK.stones;
if (!S)
return "";
var dots = "";
for (var i = 0; i < S.pile; i++)
dots += '<span style="display:inline-block;width:16px;height:16px;border-radius:8px;margin:2px;background:#9A948C"></span>';
var h = '<div style="margin:10px 0;padding:10px;border:1px solid #B08A3E;border-radius:6px;background:rgba(176,138,62,.08)"><b>The Warden of the Copper Key</b>' +
'<div style="margin:6px 0;line-height:1.55;font-style:italic">' + esc(S.say) + '</div>' +
'<div style="margin:8px 0;text-align:center;max-width:300px;margin-left:auto;margin-right:auto">' + dots + '</div>' +
'<div style="text-align:center;margin:4px 0">Stones: <b>' + S.pile + '</b> · wins running <b>' + S.wins + '</b> of 3' + (S.lost ? '' : ' · not lost yet') + '</div>';
if (!S.over)
h += '<div style="display:flex;gap:8px;justify-content:center;margin-top:8px">' + [1, 2, 3].map(function (k) { return '<button class="btn" data-dk="take" data-k="' + k + '" style="padding:10px 18px;font-size:15px"' + (S.turn !== "you" || k > S.pile ? ' disabled' : '') + '>Take ' + k + '</button>'; }).join("") + '</div>';
else
h += '<div style="text-align:center;margin-top:8px;color:#F0D890">The Warden steps aside…</div>';
return h + '<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="modex">Leave the table</button></div></div>';
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>The Second Gate.</b> Sign in to walk the trail.");
return;
}
cityRpc("hunt_begin", { p_step: dkSteps() }).then(function (o) {
if (!(o && o.ok)) {
dkSay(esc((o && o.say) || "The Gate is still."));
return;
}
DK.stars = { t0: performance.now(), w0: Date.now(), lane: 2, rocks: [], spawn: 0, over: false, won: false, last: performance.now() };
dkMode("stars");
requestAnimationFrame(dkStarsLoop);
}).catch(function (e) { dkSay(esc((e && e.message) || String(e))); });
},
function () {
var G = DK.stars;
if (!G || G.over)
return;
if (DK.mode !== "stars" || !DK.open) {
G.over = true;
DK.stars = null;
return;
}
var now = performance.now(), dt = Math.min(0.05, (now - G.last) / 1000), el = (now - G.t0) / 1000;
G.last = now;
var speed = 170 + el * 2.6, every = Math.max(0.34, 0.72 - el * 0.006);
G.spawn -= dt;
if (G.spawn <= 0) {
G.spawn = every;
if (Math.random() < 0.25 && el > 8) {
var gaps = [Math.floor(Math.random() * 5)];
var g2 = (gaps[0] + 1 + Math.floor(Math.random() * 4)) % 5;
gaps.push(g2);
for (var l = 0; l < 5; l++)
if (gaps.indexOf(l) < 0 && Math.random() < 0.75)
G.rocks.push({ lane: l, y: -24 });
}
else
G.rocks.push({ lane: Math.floor(Math.random() * 5), y: -24 });
}
G.rocks.forEach(function (r) { r.y += speed * dt; });
G.rocks = G.rocks.filter(function (r) { return r.y < 400; });
var hit = G.rocks.some(function (r) { return r.lane === G.lane && r.y + 20 > 334 && r.y < 356; });
if (hit) {
G.over = true;
if (typeof playTone === "function")
playTone(180, 0.3);
dkPaint();
return;
}
if (el >= 61) {
G.over = true;
G.won = true;
dkPaint();
var wait = Math.max(0, 61500 - (Date.now() - G.w0));
setTimeout(function () { cityRpc("hunt_done", { p_step: dkSteps(), p_flawless: true }).then(function (o) { DK.stars = null; if (o && o.ok)
return dkStepWon(o); DK.mode = null; DK.msg = (o && o.say) || ""; dkPaint(); }).catch(function (e) { DK.msg = (e && e.message) || String(e); dkPaint(); }); }, wait);
return;
}
var cv = document.getElementById("dk-stars");
if (cv) {
var x = cv.getContext("2d");
x.fillStyle = "#0E0C18";
x.fillRect(0, 0, 300, 380);
x.fillStyle = "rgba(255,255,255,.05)";
for (var k = 1; k < 5; k++)
x.fillRect(k * 60, 0, 1, 380);
x.fillStyle = "#B8E4FF";
G.rocks.forEach(function (r) { x.beginPath(); x.arc(r.lane * 60 + 30, r.y + 10, 11, 0, Math.PI * 2); x.fill(); });
x.fillStyle = "#F0D890";
x.beginPath();
var px = G.lane * 60 + 30;
x.moveTo(px, 334);
x.lineTo(px - 14, 356);
x.lineTo(px + 14, 356);
x.closePath();
x.fill();
var t = document.getElementById("dk-stars-t");
if (t)
t.textContent = Math.max(0, 61 - el).toFixed(0) + " s to go";
}
requestAnimationFrame(dkStarsLoop);
},
function () {
var G = DK.stars, h = '<div style="margin:10px 0;padding:10px;border:1px solid #3FA878;border-radius:6px;background:rgba(63,168,120,.06)"><b>The Second Gate</b>';
if (!G)
return h + '</div>';
if (G.over)
return h + '<div style="margin:6px 0;line-height:1.55">' + (G.won ? 'A whole minute, and not one star touched you. The Gate is opening…' : 'A star touched you. The Gate asks for a perfect game: begin again.') + '</div>' +
(G.won ? '' : '<button class="btn" data-dk="stars">Play again</button> ') + '<button class="btn" data-dk="modex">Step back</button></div>';
return h + '<div style="color:var(--dim);margin:4px 0 6px;line-height:1.45">Keep out of the falling stars for one minute. ◀ ▶ (or the arrow keys, or tap either side of the sky). <span id="dk-stars-t"></span></div>' +
'<canvas id="dk-stars" width="300" height="380" style="display:block;margin:0 auto;height:min(380px,46vh);width:auto;max-width:100%;border-radius:6px;touch-action:none"></canvas>' +
'<div style="display:flex;gap:10px;justify-content:center;margin-top:8px"><button class="btn" data-dk="sl" style="padding:12px 30px;font-size:18px">◀</button><button class="btn" data-dk="sr" style="padding:12px 30px;font-size:18px">▶</button></div></div>';
},
function () {
var Pl = DK.play;
if (!Pl || DK.mode !== "play")
return;
if (Pl.i >= DK_PLAY.length) {
Pl.done = true;
dkPaint();
dkPlaySend();
return;
}
var L = DK_PLAY[Pl.i];
if (L[0] !== Pl.role) {
Pl.shown.push({ who: L[0], line: L[1] });
Pl.i++;
dkPaint();
setTimeout(function () { if (DK.play === Pl)
dkPlayNext(); }, 2400);
return;
}
Pl.cue = Pl.i;
dkPaint();
var mine = Pl.i;
setTimeout(function () { if (DK.play === Pl && Pl.i === mine && !Pl.done && DK.mode === "play") {
Pl.missed = true;
dkPaint();
} }, 45000);
},
function () {
var Pl = DK.play;
if (!Pl || Pl.done || Pl.missed || Pl.cue !== Pl.i)
return;
var v = ((document.getElementById("dk-line") || {}).value || "").trim();
if (!v)
return;
Pl.cue = -1;
Pl.mine.push(v);
Pl.shown.push({ who: Pl.role, line: v, me: true });
Pl.i++;
dkPaint();
setTimeout(function () { if (DK.play === Pl)
dkPlayNext(); }, 900);
},
function () {
var Pl = DK.play;
DK.msg = "…";
cityRpc("hunt_step", { p_step: dkSteps(), p_answer: Pl.mine.join(" ") }).then(function (o) {
if (o && o.ok) {
DK.play = null;
return dkStepWon(o);
}
dkWaitSay(o);
Pl.failed = (o && o.wait > 10) ? o.say : "The Gate heard a line that is not in the play. The curtain comes down.";
DK.msg = "";
dkPaint();
}).catch(function (e) { Pl.failed = (e && e.message) || String(e); dkPaint(); });
},
function () {
var Pl = DK.play;
if (!Pl)
return "";
var h = '<div style="margin:10px 0;padding:10px;border:1px solid #C87A3A;border-radius:6px;background:rgba(200,122,58,.07)"><b>The First Gate: The Lamplighter and the Moon</b>' +
'<div style="color:var(--dim);margin:4px 0 8px;line-height:1.45">You are ' + DK_ROLES[Pl.role] + '. Say each of your lines, word for word, when your cue comes. The Almanac stays shut while the Gate watches.</div>' +
'<div style="font-family:Georgia,serif;line-height:1.6">' + Pl.shown.map(function (x) { return '<div' + (x.me ? ' style="color:#F0D890"' : '') + '><span style="font-size:11px;letter-spacing:.06em;color:#C9A868">' + esc(DK_ROLES[x.who].toUpperCase()) + '</span> ' + esc(x.line) + '</div>'; }).join("") + '</div>';
if (Pl.failed)
h += '<div style="margin:8px 0;color:#E0A080">' + esc(Pl.failed) + ' Learn the part, and take the stage again.</div><button class="btn" data-dk="play">Take the stage again</button> ';
else if (Pl.missed)
h += '<div style="margin:8px 0;color:#E0A080">You missed your cue. The curtain comes down.</div><button class="btn" data-dk="play">Take the stage again</button> ';
else if (Pl.done)
h += '<div style="margin:8px 0;color:var(--dim)">The Gate is listening back over the play…</div>';
else if (Pl.cue === Pl.i)
h += '<div style="margin-top:8px;display:flex;gap:6px"><input id="dk-line" type="text" maxlength="120" placeholder="Your line, as ' + DK_ROLES[Pl.role] + '" style="flex:1;min-width:0;padding:7px;font-size:15px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px"><button class="btn" data-dk="line">Say it</button></div><div style="font-size:12px;color:var(--dim);margin-top:4px">Your cue. You have 45 seconds.</div>';
else
h += '<div style="margin:8px 0;color:var(--dim);font-style:italic">…</div>';
return h + '<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="modex">Leave the stage</button></div></div>';
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>The Drowned Library.</b> Sign in to walk the trail.");
return;
}
DK.tale = DK.tale || { room: "steps", inv: {}, lit: false, covered: false, wheels: ["high", "high", "high"], open: false, asked: false, log: [] };
dkMode("tale");
if (!DK.tale.log.length)
dkTaleSay(dkTaleLook());
},
function () {
var T = DK.tale, R = DK_TALE[T.room], d = "<b>" + R.n + "</b>. " + R.d;
if (T.room === "steps") {
if (T.inv.lamp)
d = d.replace(" A brass lamp hangs on a hook.", "");
if (T.inv.tinder)
d = d.replace(" A tinderbox lies on the bottom dry step.", "");
}
if (T.room === "maps" && T.open)
d = d.replace("each turned to HIGH. In the east wall is a heavy round door.", "turned " + T.wheels.join(", ").toUpperCase() + ". The round door in the east wall stands open.");
else if (T.room === "maps")
d = d.replace("each turned to HIGH", "turned " + T.wheels.join(", ").toUpperCase());
if (T.room === "vault")
d += dkTaleLady();
return d;
},
function () {
var T = DK.tale;
if (T.lit && !T.covered)
return " She turns her face away from your lamp and will not look at you.";
T.asked = true;
var q = DK_TALEQ[((DK.st && DK.st.season && +DK.st.season.set) || 0) % 3];
return " She looks up. \"You found me,\" she says, in a voice like a tide coming in. \"I keep one thing for the Dreamwright, and I give it only to someone who knew them. Answer me, and it is yours: " + q + "\" (Type: say, and then your answer.)";
},
function (dir) {
var T = DK.tale, r = T.room, to = null;
if (r === "steps" && dir === "down") {
if (!T.lit)
return "It is pitch dark down there, and the water is deep. You would not find your way back without a light.";
to = "reading";
}
if (r === "reading") {
if (dir === "up")
to = "steps";
if (dir === "north")
to = "stacks";
if (dir === "east")
to = "maps";
}
if (r === "stacks" && dir === "south")
to = "reading";
if (r === "maps") {
if (dir === "west")
to = "reading";
if (dir === "east") {
if (!T.open)
return "The round door is shut fast. It does not even have a handle.";
to = "vault";
}
}
if (r === "vault" && dir === "west")
to = "maps";
if (!to)
return "You can't go that way.";
if (T.room === "vault")
T.covered = false;
T.room = to;
return dkTaleLook();
},
function (raw) {
var T = DK.tale;
if (!T)
return;
var c = String(raw || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
if (!c)
return;
dkTaleSay("> " + raw, true);
var dirs = { n: "north", s: "south", e: "east", w: "west", u: "up", d: "down", north: "north", south: "south", east: "east", west: "west", up: "up", down: "down" };
var w = c.split(" "), v = w[0], rest = w.slice(1).join(" ");
if (v === "go" || v === "walk" || v === "climb") {
v = w[1] || "";
rest = w.slice(2).join(" ");
}
if (dirs[v])
return dkTaleSay(dkTaleGo(dirs[v]));
if (v === "look" || v === "l") {
if (/row|shelf/.test(rest) && T.room === "stacks")
return dkTaleRow(c);
if (/drawer|card|catalogue|catalog/.test(rest))
return dkTaleSay(dkTaleRead("card"));
return dkTaleSay(dkTaleLook());
}
if (v === "i" || v === "inventory" || v === "inv") {
var it = [];
if (T.inv.lamp)
it.push("a brass lamp" + (T.lit ? (T.covered ? " (lit, covered by your hand)" : " (lit)") : ""));
if (T.inv.tinder)
it.push("a tinderbox");
if (T.inv.book)
it.push("a book with no title");
return dkTaleSay(it.length ? "You are carrying " + it.join(", ") + "." : "You are carrying nothing.");
}
if (v === "help" || v === "hint")
return dkTaleSay("Try short commands: look, take lamp, light lamp, read card, search row 3, read book, turn wheels high low high, cover lamp, say …, and directions (north or n, up, down).");
if (v === "take" || v === "get" || v === "grab") {
if (T.room === "steps" && /lamp|all/.test(rest) && !T.inv.lamp) {
T.inv.lamp = 1;
if (/all/.test(rest))
T.inv.tinder = 1;
return dkTaleSay(/all/.test(rest) ? "You take the lamp and the tinderbox." : "You lift the brass lamp off its hook. It is heavier than it looks.");
}
if (T.room === "steps" && /tinder|box/.test(rest) && !T.inv.tinder) {
T.inv.tinder = 1;
return dkTaleSay("You pick up the tinderbox. It rattles with flint and steel.");
}
if (/book/.test(rest) && T.room === "stacks")
return dkTaleSay("There are thousands of books here. Which row?");
return dkTaleSay("There is nothing like that here to take.");
}
if (v === "light" || v === "lighten" || v === "ignite") {
if (!/lamp/.test(rest))
return dkTaleSay("Light what?");
if (!T.inv.lamp)
return dkTaleSay("You have no lamp.");
if (!T.inv.tinder)
return dkTaleSay("You have nothing to light it with.");
if (T.lit)
return dkTaleSay("It is already lit.");
T.lit = true;
return dkTaleSay("You strike a spark from the tinderbox. The lamp catches, and a warm light spills down the steps.");
}
if (v === "cover" || v === "shade" || v === "hide" || v === "dim") {
if (!T.lit)
return dkTaleSay("There is nothing lit to cover.");
T.covered = true;
return dkTaleSay("You cup your hand over the lamp. The light shrinks to a glow between your fingers." + (T.room === "vault" ? dkTaleLady() : ""));
}
if (v === "uncover") {
T.covered = false;
return dkTaleSay("You take your hand away from the lamp.");
}
if (v === "read" || v === "examine" || v === "x" || v === "search" || v === "open") {
if (T.room === "stacks" && /row|shelf|[1-9]|one|two|three|four|five|six|seven|eight|nine/.test(rest))
return dkTaleRow(c);
if (/card|drawer|catalogue|catalog/.test(rest))
return dkTaleSay(dkTaleRead("card"));
if (/book/.test(rest))
return dkTaleSay(dkTaleRead("book"));
if (/wheel|tide/.test(rest) && T.room === "maps")
return dkTaleSay("Three iron wheels, each marked TIDE, each can be turned to LOW or HIGH. Just now they read " + T.wheels.join(", ").toUpperCase() + ".");
if (/door/.test(rest) && T.room === "maps")
return dkTaleSay(T.open ? "The round door stands open." : "A round door of green bronze, with no handle and no keyhole. Around its rim, small letters: I OPEN FOR THE TIDE.");
if (/map|chart|floor/.test(rest) && T.room === "maps")
return dkTaleSay("The painted sea goes on past the edges of the room. Someone has drawn a tiny library at its very bottom.");
if (/woman|her|lady|librarian/.test(rest) && T.room === "vault")
return dkTaleSay(T.lit && !T.covered ? "She will not turn to the light." : "Her face is water, moving very slowly, like a reflection. Her eyes are kind.");
return dkTaleSay("You see nothing special.");
}
if (v === "turn" || v === "set" || v === "pull" || v === "push") {
if (T.room !== "maps")
return dkTaleSay("There is nothing here to turn.");
var ws = c.match(/\b(low|high)\b/g) || [], num = c.match(/\b(1|2|3|one|two|three|first|second|third)\b/);
if (ws.length >= 3)
T.wheels = ws.slice(0, 3);
else if (ws.length === 1 && num) {
var ix = { "1": 0, one: 0, first: 0, "2": 1, two: 1, second: 1, "3": 2, three: 2, third: 2 }[num[1]];
T.wheels[ix] = ws[0];
}
else
return dkTaleSay("Turn the wheels to what? (For example: turn wheels low high low, or turn wheel 2 low.)");
var ok = !!T.inv.book && T.wheels.join(" ") === "low low high";
if (ok && !T.open) {
T.open = true;
return dkTaleSay("The wheels grind: " + T.wheels.join(", ").toUpperCase() + ". Somewhere far off, water drains away with a long sigh, and the round door rolls open to the east.");
}
if (T.wheels.join(" ") === "low low high" && !T.inv.book)
return dkTaleSay("The wheels grind, and the water stirs, but nothing else happens. You feel you are guessing, and the library knows it.");
return dkTaleSay("The wheels grind: " + T.wheels.join(", ").toUpperCase() + ". The water sloshes about your ankles, but the round door does not move.");
}
if (v === "say" || v === "answer" || v === "tell") {
if (T.room !== "vault" || !T.asked || (T.lit && !T.covered))
return dkTaleSay("Your voice echoes off the water. Nobody answers.");
if (!rest)
return dkTaleSay("Say what?");
var ans = String(raw).replace(/^\s*(say|answer|tell)\s+/i, "").trim();
dkTaleSay("…");
cityRpc("hunt_step", { p_step: dkSteps(), p_answer: ans }).then(function (o) {
if (o && o.ok) {
DK.tale = null;
return dkStepWon(o);
}
dkWaitSay(o);
dkTaleSay("\"No,\" she says, and the water of her face goes still. \"Come back when you know.\" " + ((o && o.wait) ? "(You may ask again in " + dkWaitText(o.wait) + ".)" : ""));
}).catch(function (e) { dkTaleSay(esc((e && e.message) || String(e))); });
return;
}
dkTaleSay("You can't do that here, or you don't know how yet. (Type help.)");
},
function (what) {
var T = DK.tale;
if (what === "card") {
if (T.room !== "reading")
return "There is no card here.";
return "In the open drawer, one card has been left standing up. In faded ink: THE BOOK WITH NO TITLE. THE STACKS, ROW SEVEN. Under it, in pencil, smaller: she is shy of light.";
}
if (!T.inv.book)
return "You have no book.";
return "The book with no title has one page that is not blank. On it, in green ink: THE VAULT ANSWERS TO THE TIDE. LOW, LOW, HIGH.";
},
function (c) {
var T = DK.tale, m = c.match(/\b([1-9]|one|two|three|four|five|six|seven|eight|nine)\b/);
if (!m)
return dkTaleSay("Which row? They are numbered one to nine.");
var n = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }[m[1]] || +m[1];
if (n === 7) {
if (T.inv.book)
return dkTaleSay("Row seven. The gap where the book with no title was.");
T.inv.book = 1;
return dkTaleSay("Row seven. Between two swollen atlases is a thin book with nothing on its spine at all. You take it.");
}
var topics = ["", "lighthouses", "knots", "the moon", "bells", "boats that were never finished", "lullabies", "", "tides", "games nobody can lose"];
return dkTaleSay("Row " + n + ": books about " + topics[n] + ", all asleep. None of them is the one you want.");
},
function () {
var T = DK.tale;
if (!T)
return "";
return '<div style="margin:10px 0;padding:10px;border:1px solid #5A8AA8;border-radius:6px;background:rgba(90,138,168,.07)"><b>The Drowned Library</b> <span style="color:var(--dim);font-size:12px">a story to walk through</span>' +
'<div id="dk-tlog" style="margin:8px 0;max-height:260px;overflow-y:auto;font-family:Georgia,serif;line-height:1.55;padding:6px 8px;background:rgba(0,0,0,.25);border-radius:4px">' +
T.log.map(function (x) { return '<div style="margin:3px 0;' + (x.me ? 'color:#9FC8D8' : '') + '">' + (x.me ? esc(x.t) : x.t) + '</div>'; }).join("") + '</div>' +
'<div style="display:flex;gap:6px"><input id="dk-cmd" type="text" maxlength="120" placeholder="What do you do?" autocomplete="off" style="flex:1;min-width:0;padding:7px;font-size:15px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px"><button class="btn" data-dk="cmd">Do it</button></div>' +
'<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">' + ["north", "south", "east", "west", "up", "down", "look", "inventory"].map(function (d) { return '<button class="btn" data-dk="tgo" data-d="' + d + '" style="padding:4px 9px">' + d + '</button>'; }).join("") + '</div>' +
'<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="modex">Close the story</button></div></div>';
},
function () {
var H = DK.harp;
if (!H || !H.notes.length)
return;
H.say = "…";
dkPaint();
cityRpc("hunt_step", { p_step: dkSteps(), p_answer: H.notes.map(function (i) { return DK_HARP[i][1]; }).join(" ") }).then(function (o) {
if (o && o.ok) {
DK.harp = null;
return dkStepWon(o);
}
dkWaitSay(o);
H.notes = [];
H.say = (o && o.say) || "The harp is silent.";
dkPaint();
}).catch(function (e) { H.say = (e && e.message) || String(e); dkPaint(); });
},
function () {
var H = DK.harp;
if (!H)
return "";
return '<div style="margin:10px 0;padding:10px;border:1px solid #9AD8FF;border-radius:6px;background:rgba(154,216,255,.06)"><b>A harp, left for you</b>' +
'<div style="color:var(--dim);margin:4px 0 8px;line-height:1.45">Eight strings, white notes only, low to high. Play the tune the clue asks for, then let the harp hear it. A wrong tune counts as a wrong answer.</div>' +
'<div style="display:flex;gap:4px;justify-content:center;align-items:flex-end">' + DK_HARP.map(function (s, i) { return '<button class="btn" data-dk="pluck" data-i="' + i + '" style="width:34px;height:' + (110 - i * 7) + 'px;padding:0;font-size:14px">' + s[0] + (i === 7 ? '<sup>↑</sup>' : '') + '</button>'; }).join("") + '</div>' +
'<div style="text-align:center;margin:8px 0;min-height:22px;letter-spacing:4px;color:#F0E0B8">' + H.notes.map(function (i) { return DK_HARP[i][0] + (i === 7 ? '↑' : ''); }).join(" ") + '</div>' +
(H.say ? '<div style="color:#E0A080;text-align:center">' + esc(H.say) + '</div>' : '') +
'<div style="display:flex;gap:6px;justify-content:center;margin-top:6px"><button class="btn" data-dk="hclear">Start again</button><button class="btn" data-dk="hsend"' + (dkWait() ? ' disabled' : '') + '>Let the harp hear it</button></div>' +
'<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="modex">Step away</button></div></div>';
},
function (a) {
var R = DK.room;
if (!R)
return;
if (DK_ROOMS[a]) {
R.at = a;
R.say = "";
dkPaint();
return;
}
var at = R.at;
if (a === "window")
R.say = "Through the window is the whole city, very small and far below, the way it must have looked on the first night.";
else if (a === "doors")
R.say = "Painted shut, every one. They were never finished either.";
else if (a === "trunk")
R.say = "Old clothes, a kite with no string, a tin of buttons. Nothing that is waiting for you.";
else if (a === "closer") {
if (at === "attic" && !R.speck) {
R.seen = true;
R.say = "On the floorboards, so small you nearly missed it, is a single grey speck, like a crumb of stone. Something about it makes you want to keep it.";
}
else if (at === "little")
R.say = "Under the bed: dust, and a child's drawing of a lighthouse, red and white.";
else if (at === "corridor")
R.say = "The paint on the doors is still tacky, as though it were done this morning.";
else
R.say = "Dust, and the grey light.";
}
else if (a === "speck") {
R.speck = true;
R.seen = false;
R.say = "You pick up the grey speck. It weighs nothing at all.";
}
else if (a === "wall") {
if (!R.speck) {
R.say = "It is only a wall: plaster, a little uneven, a little grey.";
}
else {
R.say = "";
R.signed = true;
dkRoomSign();
}
}
dkPaint();
},
function () {
var R = DK.room;
R.signing = true;
dkPaint();
cityRpc("hunt_step", { p_step: dkSteps(), p_answer: null }).then(function (o) {
if (o && o.ok) {
R.signing = false;
R.done = true;
dkChime(true);
dkPaint();
return dkLoad();
}
if (o && /still bare/i.test(o.say || "")) {
setTimeout(function () { if (DK.room === R)
dkRoomSign(); }, 8000);
return;
}
R.signing = false;
R.say = (o && o.say) || "";
dkPaint();
}).catch(function (e) { R.signing = false; R.say = (e && e.message) || String(e); dkPaint(); });
},
function () {
var R = DK.room;
if (!R)
return "";
var Q = DK_ROOMS[R.at], s = (DK.st && DK.st.season) || {};
var h = '<div style="margin:10px 0;padding:12px;border:1px solid #8A7AC8;border-radius:6px;background:rgba(106,88,200,.08)"><b>' + esc(Q.n) + '</b>' +
'<div style="margin:6px 0;line-height:1.6;font-family:Georgia,serif">' + esc(Q.d) + '</div>';
if (R.say)
h += '<div style="margin:6px 0;line-height:1.6;font-style:italic;color:#F0E0B8">' + esc(R.say) + '</div>';
if (R.signed) {
h += '<div style="margin:10px 0;padding:12px;background:#EFE4C8;color:#2A2018;border-radius:4px;font-family:Georgia,serif;line-height:1.6">You press the grey speck to the bare wall. It sinks into the plaster like a stone into a pond, and words spread out from it in a careful hand:' +
'<div style="margin:8px 0;font-size:17px;text-align:center"><i>This world was dreamed by <b>' + esc(s.signature || "the Dreamwright") + '</b>.<br>Thank you for coming all this way to find me.<br>Now it is yours too.</i></div></div>';
if (R.signing)
h += '<div style="color:var(--dim)">The words are still spreading…</div>';
if (R.done)
h += '<div style="margin-top:8px"><button class="btn" data-dk="through" style="padding:10px 18px">Walk through the Gate of Dreams</button></div>';
}
else {
h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">' + Q.acts.map(function (q) { return '<button class="btn" data-dk="ract" data-a="' + q[0] + '">' + q[1] + '</button>'; }).join("") +
(R.at === "attic" && R.seen && !R.speck ? '<button class="btn" data-dk="ract" data-a="speck">Take the grey speck</button>' : '') + '</div>';
if (R.speck)
h += '<div style="margin-top:6px;font-size:12px;color:var(--dim)">You are carrying a grey speck.</div>';
}
return h + '<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="modex">Step back out</button></div></div>';
},
function () {
var S = DK.st || {}, s = S.season || {}, me = dkMe(), set = dkSet(), n = dkNext(), st = dkSteps(), CL = dkClue(), h = "";
var signed = typeof signedIn === "function" && signedIn();
if (DK.duel)
return dkDuelHtml() + dkHtmlRest();
if (DK.newPage) {
var P = DK.newPage;
h += '<div style="margin:6px 0 10px;padding:12px 14px;border:1px solid #8A7A4A;border-radius:6px;background:#EFE4C8;color:#2A2018;font-family:Georgia,serif;line-height:1.6">' +
'<div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A5A2A">The Dreamwright\'s Journal · page ' + P.n + ' of 15</div>' +
'<div style="font-size:16px;margin:4px 0 6px"><b>' + esc(P.title) + '</b></div><div>' + esc(P.body) + '</div>' +
(P.word ? '<div style="margin-top:8px;text-align:right;font-style:italic;color:#5A3A1A">Pressed into the margin, in another ink: <b style="text-decoration:underline">' + esc(P.word) + '</b></div>' : '') +
'<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="pagex">Keep it and go on</button></div></div>';
return h + dkHtmlRest();
}
if (DK.mode === "almanac")
return dkAlmanacHtml();
if (DK.mode === "stones")
return dkStonesHtml();
if (DK.mode === "stars")
return dkStarsHtml();
if (DK.mode === "play")
return dkPlayHtml();
if (DK.mode === "tale")
return dkTaleHtml();
if (DK.mode === "harp")
return dkHarpHtml();
if (DK.mode === "room")
return dkRoomHtml();
if (DK.gq && n === 0 && !me.final)
return dkGateHtml() + dkHtmlRest();
h += '<details' + (st === 0 ? ' open' : '') + ' style="margin:4px 0 8px;padding:8px 10px;border-left:3px solid #C9A868;background:rgba(201,168,104,.07)"><summary style="cursor:pointer;color:#F0E0B8"><b>The Keeper\'s Testament</b></summary>' +
'<div style="margin-top:6px;line-height:1.6;font-style:italic;white-space:pre-wrap">' + esc(s.testament || DK_TESTAMENT) + '</div><div style="text-align:right;color:#C9A868;margin-top:4px">· The Keeper</div></details>';
h += '<div style="margin:4px 0 8px"><button class="btn" data-dk="almanac">📕 The Dreamwright\'s Almanac</button> <span style="color:var(--dim);font-size:12px">' + DK_ALMANAC.length + ' entries, open to everyone</span></div>';
if (s.prize_gold)
h += '<div style="color:var(--dim);line-height:1.5;margin:4px 0 8px">This season\'s prize: <b>' + (typeof gold === "function" ? gold(+s.prize_gold) : s.prize_gold + " gold") + '</b> and ' + esc(s.prize_text || "the Dreamer's Crown") + ', for the first citizen through the <b>Gate of Dreams</b> on the Tower Plaza.</div>';
if (s.winner)
h += '<div style="margin:4px 0 8px;color:#F0D890">👑 This season was won by <b>' + esc(s.winner) + '</b>. The hunt goes on for rank.</div>';
if (!signed)
h += '<div style="margin:4px 0 8px;color:#E0A080">Sign in to walk the trail and keep what you find.</div>';
if (S.ok && !dkNew()) {
h += '<div style="margin:10px 0;padding:10px;border:1px solid #6A5A3A;border-radius:6px;line-height:1.55">The trails are being laid for a harder hunt. Read the Almanac while you wait, and gather dream shards: they count towards your rank.' +
(S.keeper ? '<div style="margin-top:6px;color:#E0A080">Keeper: run the latest server update to open the new trail.</div>' : '') + '</div>';
return h + dkHtmlRest();
}
h += '<div style="margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">Your trail · season ' + (s.id || 1) + ' · step ' + Math.min(st + 1, DK_TOTAL) + ' of ' + DK_TOTAL + (st >= DK_TOTAL ? ' (done)' : '') + '</div>';
DK_GROUPS.forEach(function (G, i) {
var K = DK_KEYS[i], css = K ? K.css : "#B8A0FF", got = K ? dkHas(i + 1) : !!me.gate, dots = "";
for (var k = G[0]; k <= G[1]; k++) {
var done = st > k, cur = !done && st === k;
dots += '<span title="' + DK_STEPNAMES[DK_STEPKIND[k]] + '" style="display:inline-block;width:12px;height:12px;border-radius:6px;margin-right:4px;vertical-align:middle;' + (done ? 'background:' + css : cur ? 'border:2px solid ' + css : 'border:1px solid rgba(255,255,255,.25)') + '"></span>';
}
h += '<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);line-height:1.5;display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="color:' + css + '">' + (K ? '🗝️ ' + K.name : '🚪 The Gate of Dreams') + '</b><span>' + dots + (got ? ' <span style="color:#9FD89F">' + (K ? 'yours' : 'opened') + '</span>' : '') + '</span></div>';
});
var wait = dkWait();
if (CL && st < DK_TOTAL) {
var kind = CL.kind, gi = st >= 14 ? 3 : st >= 10 ? 2 : st >= 5 ? 1 : 0, col = gi < 3 ? DK_KEYS[gi].css : "#B8A0FF";
h += '<div style="margin:10px 0;padding:10px;border:1px solid ' + col + ';border-radius:6px;background:rgba(255,255,255,.03)">' +
'<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:' + col + '">Step ' + (st + 1) + ' · ' + (DK_STEPNAMES[kind] || kind) + '</div>' +
'<div style="margin:6px 0;line-height:1.6;white-space:pre-wrap">' + esc(CL.clue) + '</div>';
if (kind === "lore" || kind === "almanac") {
h += '<div style="display:flex;gap:6px"><input id="dk-lore" type="text" maxlength="120" placeholder="Your answer" style="flex:1;min-width:0;padding:7px;font-size:15px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px">' +
'<button class="btn" data-dk="lore"' + (wait ? ' disabled' : '') + '>Answer</button></div>' +
'<div style="margin-top:4px;font-size:12px;color:var(--dim)">' + (kind === "almanac" ? 'Open the Almanac: the notches are faint, a line under a single letter here and there.' : 'The answer is somewhere in the worlds: in a secret, a story or a memory.') + ' Wrong answers make you wait, longer each time.</div>';
}
else if (kind === "find")
h += '<div style="font-size:12px;color:var(--dim)">Go there and look for an old stone with a mark cut in it. Nothing on any map shows where.</div>';
else if (kind === "game")
h += '<div style="font-size:12px;color:var(--dim)">Go there and sit down at his table. Win without losing once and he gives you a Spare Breath.</div>';
else if (kind === "play")
h += '<div style="font-size:12px;color:var(--dim)">The play is in the Almanac. Learn your part by heart: on the stage you will have only your cues.</div>';
else if (kind === "tale" || kind === "song" || kind === "arcade")
h += '<div style="font-size:12px;color:var(--dim)">Go there to begin it. Nothing on any map shows where.</div>';
else if (kind === "trial" && n === 1)
h += '<div style="font-size:12px;color:var(--dim)">Its riddle is cut round the lock itself: go and read it there.</div>';
else if (kind === "final")
h += '<div style="font-size:12px;color:var(--dim)">Take your three keys to the Gate of Dreams on the Tower Plaza.</div>';
else if (kind === "hidden")
h += '<div style="margin-top:4px"><button class="btn" data-dk="room">Go back into the first room</button></div>';
if (wait) {
h += '<div style="margin-top:6px;color:#E0A080">The locks will not listen to you for ' + dkWaitText(wait) + '.</div>';
if (+me.spare > 0)
h += '<div style="margin-top:4px"><button class="btn" data-dk="spare">Take your Spare Breath (skip this wait)</button></div>';
}
h += '</div>';
}
if (+me.spare > 0 && !wait)
h += '<div style="margin:4px 0;color:var(--dim)">You are keeping a <b>Spare Breath</b> from the Warden: it skips one wait for a wrong answer.</div>';
if (st >= DK_TOTAL && !me.gate)
h += '<div style="margin:8px 0;color:#F0D890">The first room is signed. Walk through the <b>Gate of Dreams</b> on the Tower Plaza.</div>';
if (me.gate)
h += '<div style="margin:8px 0;color:#F0D890">You opened the Gate of Dreams this season. 🎉</div>';
if (DK.riddle && n === 1 && dkReady(1)) {
h += '<div style="margin:10px 0;padding:10px;border:1px solid #A8784A;border-radius:6px;background:rgba(200,122,58,.08)"><b>Words cut round the copper lock</b>' +
'<div style="margin:6px 0;font-style:italic;line-height:1.55">' + esc(set[0].riddle) + '</div>' +
'<div style="display:flex;gap:6px"><input id="dk-ans" type="text" maxlength="60" placeholder="Your answer" style="flex:1;min-width:0;padding:7px;font-size:15px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px">' +
'<button class="btn" data-dk="answer"' + (wait ? ' disabled' : '') + '>Answer</button></div>' + (DK.msg ? '<div style="margin-top:6px;color:#E0A080">' + esc(DK.msg) + '</div>' : '') + '</div>';
}
else if (DK.msg)
h += '<div style="margin:6px 0;color:#F0D890">' + esc(DK.msg) + '</div>';
var pages = Array.isArray(me.pages) ? me.pages : [];
h += '<details style="margin:10px 0 4px"><summary style="cursor:pointer;color:#F0E0B8"><b>📖 The Dreamwright\'s Journal</b> · ' + pages.length + ' of 15 pages</summary>' +
(pages.length ? pages.map(function (p) {
return '<div style="margin:8px 0;padding:8px 10px;background:#EFE4C8;color:#2A2018;border-radius:4px;font-family:Georgia,serif;line-height:1.55"><b>' + p.n + '. ' + esc(p.title) + '</b><div>' + esc(p.body) + '</div>' +
(p.word ? '<div style="text-align:right;font-style:italic;color:#5A3A1A">in the margin: <b style="text-decoration:underline">' + esc(p.word) + '</b></div>' : '') + '</div>';
}).join("") : '<div style="color:var(--dim);margin:6px 0">Every step on the trail gives you a page.</div>') + '</details>';
return h + dkHtmlRest();
},
function () {
var seq = [], pool = DK_GLYPHS.slice();
for (var i = 0; i < 7; i++) {
var j = Math.floor(Math.random() * pool.length);
seq.push(pool.splice(j, 1)[0]);
}
var shown = seq.concat(pool.slice(0, 3)).sort(function () { return Math.random() - 0.5; });
DK.gq = { phase: "memory", seq: seq, palette: shown, got: [], show: true, t: Date.now() };
setTimeout(function () { if (DK.gq && DK.gq.seq === seq) {
DK.gq.show = false;
dkPaint();
} }, 7000);
},
function () {
var G = DK.gq, h = '<div style="margin:10px 0;padding:10px;border:1px solid #8A7AC8;border-radius:6px;background:rgba(106,88,200,.08)"><b>The Gate of Dreams</b>';
if (G.phase === "memory") {
h += '<div style="margin:6px 0;line-height:1.5;color:var(--dim)">Before it asks its question, the Gate tests your memory. ' + (G.show ? 'Remember these seven signs, in order.' : 'Touch the signs in the order you saw them.') + '</div>';
if (G.show)
h += '<div style="font-size:30px;letter-spacing:12px;text-align:center;margin:10px 0;color:#F0E0B8">' + G.seq.join(" ") + '</div>';
else {
h += '<div style="font-size:24px;text-align:center;margin:6px 0;min-height:34px;color:#F0E0B8">' + G.got.join(" ") + '</div><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">' +
G.palette.map(function (g, i) { return '<button class="btn" data-dk="glyph" data-i="' + i + '" style="font-size:22px;min-width:46px;padding:6px 0">' + g + '</button>'; }).join("") + '</div>';
if (G.miss)
h += '<div style="margin-top:6px;color:#E0A080;text-align:center">The Gate forgets you. Look again.</div>';
}
}
else {
h += '<div style="margin:6px 0;line-height:1.6">' + esc((dkClue() && dkClue().kind === "final") ? dkClue().clue : "What did the Dreamwright learn?") + '</div>' +
'<div style="display:flex;gap:6px"><input id="dk-final" type="text" maxlength="120" placeholder="The Gate listens" style="flex:1;min-width:0;padding:7px;font-size:15px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px">' +
'<button class="btn" data-dk="final"' + (dkWait() ? ' disabled' : '') + '>Answer</button></div>' + (dkWait() ? '<div style="margin-top:6px;color:#E0A080">The Gate will not listen to you for ' + dkWaitText(dkWait()) + '.</div>' : '') +
(DK.msg ? '<div style="margin-top:6px;color:#E0A080">' + esc(DK.msg) + '</div>' : '');
}
return h + '<div style="text-align:right;margin-top:8px"><button class="btn" data-dk="gqx">Step back</button></div></div>';
},
function (i) {
var G = DK.gq;
if (!G || G.phase !== "memory" || G.show)
return;
var g = G.palette[i];
if (g === undefined)
return;
if (g !== G.seq[G.got.length]) {
if (typeof playTone === "function")
playTone(180, 0.25);
dkMemStart();
DK.gq.miss = true;
dkPaint();
return;
}
G.got.push(g);
if (typeof playTone === "function")
playTone(500 + G.got.length * 50, 0.15);
if (G.got.length === G.seq.length) {
G.phase = "question";
DK.msg = "";
dkChime(true);
}
dkPaint();
},
function () {
var v = ((document.getElementById("dk-final") || {}).value || "").trim();
if (!v)
return;
DK.msg = "…";
dkPaint();
cityRpc("hunt_final", { p_answer: v }).then(function (o) {
if (o && o.ok) {
DK.gq = null;
DK.msg = "";
dkChime(true);
dkSay("<b>The Gate of Dreams.</b> " + esc(o.say || ""));
return dkLoad().then(function () { if (o.page && o.page.title) {
DK.newPage = o.page;
DK.afterPage = "room";
DK.open = true;
dkPaint();
}
else
dkGateOpen(); });
}
DK.msg = (o && o.say) || "The Gate is silent.";
if (o && o.wait && DK.st && DK.st.me) {
DK.st.me.wait = o.wait;
DK.at = Date.now();
}
dkPaint();
}).catch(function (e) { DK.msg = (e && e.message) || String(e); dkPaint(); });
},
function () {
var v = ((document.getElementById("dk-lore") || {}).value || "").trim();
if (!v)
return;
if (!(typeof signedIn === "function" && signedIn())) {
DK.msg = "Sign in to walk the trail.";
dkPaint();
return;
}
DK.msg = "…";
dkPaint();
cityRpc("hunt_step", { p_step: dkSteps(), p_answer: v }).then(function (o) {
if (o && o.ok) {
DK.msg = "";
dkChime(true);
DK.newPage = o.page || null;
return dkLoad();
}
DK.msg = (o && o.say) || "Not that.";
if (o && o.wait && DK.st && DK.st.me) {
DK.st.me.wait = o.wait;
DK.at = Date.now();
}
dkPaint();
}).catch(function (e) { DK.msg = (e && e.message) || String(e); dkPaint(); });
},
function () {
var S = DK.st || {}, s = S.season || {}, me = dkMe(), h = "";
var sh = dkShards(), sec = +(me.secrets || 0);
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">Your rank</div>';
var sm = dkSmall();
h += '<div style="line-height:1.6">✨ Dream shards: <b>' + sh.length + ' of ' + DK_PLACES.length + '</b> (one hides in every world, each season)<br>🔥 Small secrets: <b>' + Math.max(sec, sm.castle + sm.palace) + ' of 12</b> <span style="color:var(--dim)">(the Volcano Castle\'s runes ' + sm.castle + '/8, the North King\'s palace ' + sm.palace + '/4)</span><br>' +
'Score <b>' + (+me.score || 0) + '</b>' + (me.rank ? ' · rank <b>' + me.rank + '</b> of ' + (S.seekers || 1) : '') + ' <span style="color:var(--dim)">(a step 30, a key 100, the Gate\'s answer 60, the Gate 200, a shard 10, a secret 5)</span></div>';
h += '<details style="margin:4px 0"><summary style="cursor:pointer;color:#C9BEA8">Where the shards are</summary><div style="column-count:2;column-gap:14px;font-size:12px;line-height:1.6;margin-top:4px">' +
DK_PLACES.map(function (p) { var got = sh.indexOf(p[0]) >= 0; return '<div>' + (got ? '✅ ' : '· ') + esc(p[1]) + '</div>'; }).join("") + '</div></details>';
var N = S.news || [];
if (N.length) {
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">The hunt today</div>' +
N.slice(0, 6).map(function (x) { return '<div style="padding:3px 0;line-height:1.45">📜 ' + esc(x.body) + ' <span style="color:var(--dim);font-size:11px">' + dkAgo(x.at) + '</span></div>'; }).join("");
}
var B = S.board || [];
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">The scoreboard</div>';
if (!B.length)
h += '<div style="color:var(--dim)">Nobody has found anything yet this season. Be the first.</div>';
B.forEach(function (r, i) {
h += '<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)' + (r.me ? ';color:#F0E0B8' : '') + '"><span>' + (i + 1) + '. ' + esc(r.name) + (r.gate ? ' 🚪' : '') + '</span><span>' +
'step ' + Math.min(DK_TOTAL, (+r.steps || 0)) + '/' + DK_TOTAL + ' · 🗝️' + r.keys + ' · ✨' + r.shards + ' · <b>' + r.score + '</b></span></div>';
});
if (S.gate && S.gate.length)
h += '<div style="margin-top:6px;color:var(--dim)">Through the Gate this season: ' + S.gate.map(function (g) { return esc(g.name); }).join(", ") + '</div>';
if (S.champions && S.champions.length)
h += '<div style="margin-top:6px;color:#F0D890">Carved on the Gate: ' + S.champions.map(function (c) { return '👑 ' + esc(c.name) + ' <span style="color:var(--dim)">(season ' + c.season + ')</span>'; }).join(" · ") + '</div>';
if (S.keeper)
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">Keeper</div>' +
'<div style="line-height:1.5;color:var(--dim)">A new season moves the keys to other worlds, changes the riddle and starts every score again. The Gazette prints it.</div>' +
'<div style="display:flex;gap:6px;margin-top:6px;align-items:center"><span>Prize</span><input id="dk-prize" type="number" min="0" max="1000000" step="1000" value="' + (+s.prize_gold || 25000) + '" style="width:110px;padding:5px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px"> gold</div>' +
'<div style="display:flex;gap:6px;margin-top:6px;align-items:center"><span>and</span><input id="dk-ptext" type="text" maxlength="120" value="' + esc(s.prize_text || "The Dreamer\'s Crown") + '" placeholder="a title, a home on the Crown Estate…" style="flex:1;min-width:0;padding:5px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px"></div>' +
'<div style="margin-top:6px"><button class="btn" data-dk="season">Start a new season</button></div>' +
'<div style="margin-top:10px;line-height:1.5;color:var(--dim)">Your Testament, read by every seeker when they open the hunt (leave it empty for the city\'s own words):</div>' +
'<textarea id="dk-testament" maxlength="2000" rows="5" style="width:100%;box-sizing:border-box;margin-top:4px;padding:6px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px;font:13px Georgia,serif">' + esc(s.testament || "") + '</textarea>' +
'<div style="margin-top:4px"><button class="btn" data-dk="testament">Write the Testament</button></div>' +
'<div style="margin-top:10px;line-height:1.5;color:var(--dim)">The name written on the bare wall of the first room, which only a seeker who reaches it ever reads (empty: "the Dreamwright"):</div>' +
'<div style="display:flex;gap:6px;margin-top:4px"><input id="dk-signature" type="text" maxlength="200" value="' + esc(s.signature || "") + '" placeholder="the Dreamwright" style="flex:1;min-width:0;padding:5px;background:#14121A;color:#F0E8D8;border:1px solid #6A5A3A;border-radius:4px"><button class="btn" data-dk="signature">Sign the wall</button></div>';
return h;
}
];
});
