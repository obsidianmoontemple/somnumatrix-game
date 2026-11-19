/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(341, function () {
"use strict";
return [
function () {
dgrLoad(true);
var here = dgrWhere(), lv = dgrLevelOf(here);
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Danger by world</div>" +
"<div style='opacity:.85;margin:4px 0 6px'>Here: <b>" + esc(dgrNameOf(here)) + "</b>" + dgrChip(lv) + "</div>" +
"<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + DGR_NAME.map(function (n, i) { return DGR_ICON[i] + " <b>" + n + "</b>: " + DGR_RULE[i]; }).join("<br>") +
"<br>Fights happen only out in the open: indoors, and round the way into every world, nobody can be hurt. Under 18, or under a family lock, nobody can fight you anywhere.</div>";
DGR_GROUPS.forEach(function (g) {
h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868'>" + esc(g[1]) + "</div>";
if (g[0] === "land")
h += "<div style='font-size:12px;opacity:.75'>In a dream land itself you are in your own dream, which is always safe. These are for the great city through each land's gate, where other dreamers are.</div>";
DGR_WORLDS.forEach(function (r) {
if (r[3] !== g[0])
return;
var l = dgrLevelOf(r[0]);
h += "<div style='display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.06)" + (r[0] === here ? ";color:#FFE7B0" : "") + "'><span>" + (r[0] === here ? "📍 " : "") + esc(r[1]) + "</span>" +
"<span style='color:" + DGR_COL[l] + ";white-space:nowrap'>" + DGR_ICON[l] + " " + DGR_NAME[l] + "</span></div>";
});
});
if (dgrKeeper())
h += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: change any of these in admin.html, In the game, Danger levels.</div>";
if (typeof worldCard === "function")
worldCard(h, {});
},
function () {
var out = [];
if (typeof presenceOthers === "undefined" || !WLD.w)
return out;
var P = camera.position;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], g = p && p.group;
if (!g || !g.visible || !g.parent || p.away)
return;
var dx = g.position.x - P.x, dz = g.position.z - P.z, d = Math.hypot(dx, dz);
if (d > 60)
return;
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
out.push({ id: id, p: p, g: g, name: String(p.name || "a dreamer").split(" · ")[0], d: d, rel: rel, lx: g.position.x - WLD.w.base, lz: g.position.z });
});
return out.sort(function (a, b) { return a.d - b.d; });
},
function () {
if (!dgrFightHere() || DGR.downT || dgrProtected())
return null;
var reach = dgrShooting() ? DGR_SHOT_REACH : DGR_REACH, now = Date.now();
var L = dgrMeLocal();
if (dgrInRing(L.x, L.z))
return null;
var list = dgrOthers().filter(function (o) { return o.d < reach && Math.abs(o.rel) < (o.d < 1.6 ? 1.6 : 0.75) && !(DGR.no[o.id] > now) && !dgrInRing(o.lx, o.lz); });
return list[0] || null;
},
function (o) {
if (!o || DGR.cool > 0)
return;
var id = dgrWhere(), lv = dgrLevelOf(id);
if (lv === 1 && !dgrAgreed(o.id))
return dgrChallenge(o);
DGR.cool = 0.8;
DGR.fought = DGR.t;
var dmg = Math.round((carrying ? 15 : 10) + Math.random() * 5);
if (typeof playTone === "function")
try {
playTone(210, 0.08);
}
catch (e) { }
if (o.g && typeof harmKnock === "function")
try {
harmKnock(o.g, false);
}
catch (e) { }
dgrRpc("danger_send", { p_to: o.id, p_w: id, p_body: { t: "hit", d: dmg } }).then(function (r) {
if (r && r.ok === false) {
if (r.no)
DGR.no[o.id] = Date.now() + 60000;
setStatus(esc(r.say || "That blow does not land."));
return;
}
setStatus("You strike <b>" + esc(o.name) + "</b> (" + dmg + ").");
}).catch(function (e) { setStatus(dgrMissing(e) ? "Fights between dreamers open here soon." : esc((e && e.message) || "That blow does not land.")); });
},
function (o) {
if (DGR.cool > 0)
return;
DGR.cool = 2;
dgrRpc("danger_send", { p_to: o.id, p_w: dgrWhere(), p_body: { t: "ask" } }).then(function (r) {
if (r && r.ok === false) {
if (r.no)
DGR.no[o.id] = Date.now() + 60000;
setStatus(esc(r.say || "They cannot be asked."));
return;
}
DGR.mine[o.id] = Date.now() + DGR_ASK_S * 1000;
setStatus("🤝 You challenge <b>" + esc(o.name) + "</b> to a fight. If they accept, you may both strike.");
}).catch(function (e) { setStatus(dgrMissing(e) ? "Fights between dreamers open here soon." : esc((e && e.message) || "")); });
},
function (yes) {
var A = DGR.ask;
DGR.ask = null;
if (typeof worldCard === "function")
worldCard(null);
if (!A)
return;
dgrRpc("danger_send", { p_to: A.id, p_w: A.w, p_body: { t: yes ? "yes" : "no" } }).then(function (r) {
if (r && r.ok === false) {
setStatus(esc(r.say || ""));
return;
}
if (yes) {
DGR.ok[A.id] = Date.now() + DGR_AGREE_S * 1000;
setStatus("🤝 <b>You accept.</b> You and " + esc(A.name) + " may fight for the next quarter of an hour. Step away, or go indoors, to stop.");
}
else
setStatus("You turn the challenge down.");
}).catch(function () { });
},
function (d, from, name) {
if (!dgrFightHere() || DGR.downT || DGR.guard > 0 || dgrProtected())
return;
var L = dgrMeLocal();
if (dgrInRing(L.x, L.z))
return;
d = Math.max(0, Math.min(25, +d || 0));
if (!d)
return;
DGR.hp -= d;
DGR.quiet = 0;
DGR.fought = DGR.t;
DGR.hurt = Math.min(1, DGR.hurt + d / 40);
DGR.lastBy = { id: from, name: name };
if (typeof playTone === "function")
try {
playTone(150, 0.12);
}
catch (e) { }
if (DGR.hp <= 0)
dgrBeaten(from, name);
else
setStatus("<b>" + esc(name || "A dreamer") + "</b> strikes you (−" + d + "). Vigour " + Math.round(DGR.hp) + " of " + DGR.max + ".");
},
function (by, name) {
DGR.hp = 0;
DGR.downT = 1.6;
var id = dgrWhere(), lv = dgrLevelOf(id);
setStatus("<b>You are beaten by " + esc(name || "a dreamer") + ".</b> You wake by the way into " + esc(dgrNameOf(id).split(":")[0]) + "." + (lv >= 3 ? " The purse is being counted…" : " You lose nothing."));
var L = dgrMeLocal();
dgrRpc("danger_beaten", { p_by: by, p_w: id, p_x: L.x, p_z: L.z }).then(function (o) {
if (!o || o.ok === false)
return;
if (o.drop)
setTimeout(function () { setStatus("<b>You drop " + esc(dgrDropName(o.drop)) + "</b> where you fell. " + esc(o.by || name || "Whoever beat you") + " has ten minutes to pick it up; after that it stays yours."); }, 3500);
if (+o.gold > 0)
setStatus("<b>You are beaten by " + esc(o.by || name || "a dreamer") + "</b>, who takes <b>" + (+o.gold).toLocaleString() + " gold</b> from your purse. You wake by the way in.");
else if (lv >= 3)
setStatus("<b>You are beaten by " + esc(o.by || name || "a dreamer") + ".</b> No gold changes hands" + (o.why ? " (" + esc(o.why) + ")" : "") + ". You wake by the way in.");
}).catch(function () { });
},
function () {
var N = DGR.net;
if (N.busy || N.missing || !dgrSigned())
return;
N.busy = true;
dgrRpc("live_poll", { p_since: N.since, p_place: "world:" + WLD.on }).then(function (o) {
if (!o || !o.ok)
return;
var first = !N.since;
N.since = Math.max(N.since, +o.top || 0);
if (first)
return;
(o.rows || []).forEach(function (r) {
if (r.kind !== "danger" || !r.body)
return;
var b = r.body, nm = r.name || "A dreamer";
if (b.t === "hit")
dgrHurt(b.d, r.from, nm);
else if (b.t === "down")
dgrWon(r);
else if (b.t === "drop")
dgrDropHeard({ id: b.id, kind: b.kind, ref: b.ref, name: b.name, x: +b.x, z: +b.z, w: b.w, by: nm, until: Date.now() + 600000 });
else if (b.t === "ask" && !dgrProtected())
dgrAsked(r.from, nm, b.w);
else if (b.t === "yes") {
DGR.ok[r.from] = Date.now() + DGR_AGREE_S * 1000;
setStatus("🤝 <b>" + esc(nm) + " accepts your challenge.</b> Strike when you are ready.");
}
else if (b.t === "no")
setStatus(esc(nm) + " turns your challenge down.");
});
}).catch(function (e) { if (dgrMissing(e))
N.missing = true; }).then(function () { N.busy = false; });
},
function (from, name, w) {
DGR.ask = { id: from, name: name, w: w || dgrWhere(), until: Date.now() + DGR_ASK_S * 1000 };
if (typeof worldCard === "function")
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🤝 A challenge</div><div style='margin:4px 0 8px'><b>" + esc(name) + "</b> challenges you to a fight. Nothing is lost here: the beaten one only wakes by the way in.</div>" +
worldBtn("yes", "Accept", "Fight for the next quarter of an hour") + worldBtn("no", "Turn it down", ""), { yes: function () { dgrAnswer(true); }, no: function () { dgrAnswer(false); } });
},
function (d) {
if (d.g || !WLD.w || !WLD.w.g)
return;
var g = new THREE.Group(), W = WLD.w, gy = 0;
try {
if (W.ground)
gy = +W.ground(d.x, d.z, 0) || 0;
}
catch (e) { }
g.position.set(d.x, gy, d.z);
var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshBasicMaterial({ color: 0xFFD878 }));
gem.position.y = 1.0;
g.add(gem);
g.userData.gem = gem;
var pil = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 6, 10, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE8A8, transparent: true, opacity: 0.15, depthWrite: false, side: THREE.DoubleSide }));
pil.position.y = 3;
g.add(pil);
W.g.add(g);
d.g = g;
d.wg = W.g;
},
function (d) {
if (d.busy)
return;
d.busy = true;
dgrRpc("danger_drop_take", { p_id: +d.id }).then(function (o) {
if (o && o.ok === false) {
setStatus(esc(o.say || "It cannot be taken."));
if (/already|late|gone|not yours/i.test(o.say || ""))
d.taken = true;
return;
}
d.taken = true;
if (typeof playTone === "function")
try {
playTone(988, 0.2);
}
catch (e) { }
setStatus("✨ <b>" + esc(dgrDropName(d)) + "</b> is yours now. It is in your Backpack.");
if (typeof ELW !== "undefined")
ELW.gifts = null;
if (typeof RA !== "undefined" && RA)
RA.mineAt = -99;
if (typeof loadStock === "function")
try {
loadStock();
}
catch (e) { }
}).catch(function (e) { setStatus(dgrMissing(e) ? "This opens soon." : esc((e && e.message) || "")); }).then(function () { d.busy = false; });
},
function (G) {
if (ELW.built)
return;
ELW.built = true;
var S = new THREE.Group(), H = ELW_HUT, wood = wM(0x7A5432), dark = wM(0x4A3020), snow = wM(0xF4F8FF), red = wM(0xB8302A);
var hut = new THREE.Group();
hut.position.set(H.x, npHeight(H.x, H.z), H.z);
S.add(hut);
wBox(6, 3, 0.25, wood, 0, 1.5, -3, hut);
wBox(6, 3, 0.25, wood, 0, 1.5, 3, hut);
wBox(0.25, 3, 6.2, wood, 3, 1.5, 0, hut);
[-1, 1].forEach(function (s) { var r = wBox(6.6, 0.22, 3.7, dark, 0, 3.85, s * 1.6, hut); r.rotation.x = s * 0.5; var c = wBox(6.7, 0.12, 3.7, snow, 0, 4.0, s * 1.6, hut); c.rotation.x = s * 0.5; });
wBox(0.3, 3, 0.3, dark, -3, 1.5, -3, hut);
wBox(0.3, 3, 0.3, dark, -3, 1.5, 3, hut);
for (var sh = 0; sh < 3; sh++) {
wBox(0.4, 0.04, 5.4, wood, 2.6, 0.8 + sh * 0.7, 0, hut);
for (var bx = 0; bx < 4; bx++)
wBox(0.3, 0.3, 0.3, wM([0xC82A2A, 0x2A8A3A, 0xE8C04A, 0x2A5AA8][(sh + bx) % 4]), 2.6, 0.97 + sh * 0.7, -1.8 + bx * 1.2, hut);
}
var lamp = wGlow(0xFFD890, 2.4, 0.35);
lamp.position.set(0, 2.6, 0);
hut.add(lamp);
var sg = wSign(["The Helpers' Hut", "Volunteers always welcome", "Help the elves, by your own good will"], 3.6, 1.3, "#3A1A14", "#FFE8A0");
sg.position.set(H.x - 3.3, npHeight(H.x, H.z) + 3.2, H.z);
sg.rotation.y = -Math.PI / 2;
S.add(sg);
NP.solids.push({ x: H.x, z: H.z - 3, hw: 3, hd: 0.2 }, { x: H.x, z: H.z + 3, hw: 3, hd: 0.2 }, { x: H.x + 3, z: H.z, hw: 0.2, hd: 3.1 });
var wp = new THREE.Group();
wp.position.set(33.6, 0, 24.4);
S.add(wp);
for (var r = 0; r < 3; r++)
for (var l = 0; l < 5 - r; l++) {
var lg = wCyl(0.16, 0.16, 1.4, wM(r % 2 ? 0x8A6040 : 0x7A5432), -0.7 + l * 0.34 + r * 0.17, 0.17 + r * 0.3, 0, wp, 8);
lg.rotation.x = Math.PI / 2;
}
NP.solids.push({ x: 33.6, z: 24.4, hw: 1, hd: 0.8 });
var ct = new THREE.Group();
ct.position.set(34.2, 0, 30);
S.add(ct);
wBox(1.2, 0.85, 2, wood, 0, 0.42, 0, ct);
wBox(1.3, 0.06, 2.1, red, 0, 0.88, 0, ct);
for (var m = 0; m < 5; m++) {
wCyl(0.08, 0.07, 0.16, wM(0xF4F0E8), 0, 0.99, -0.7 + m * 0.35, ct, 8);
}
wCyl(0.25, 0.25, 0.5, wM(0x8A8A90), 0.3, 1.15, 0.7, ct, 10);
NP.solids.push({ x: 34.2, z: 30, hw: 0.7, hd: 1.1 });
var mb = new THREE.Group();
mb.position.set(33.8, 0, 35.6);
S.add(mb);
wBox(1.4, 0.9, 2.4, wood, 0, 0.45, 0, mb);
[[0xC8302A, 0], [0x2A8A3A, 0.6], [0xE8C04A, -0.6]].forEach(function (q) { wBox(0.3, 0.3, 0.3, wM(q[0]), 0, 1.05, q[1], mb); });
wSph(0.18, wM(0x8A5A3A), 0.2, 1.08, 0.95, mb, 8);
NP.solids.push({ x: 33.8, z: 35.6, hw: 0.8, hd: 1.3 });
for (var hb = 0; hb < 3; hb++)
wBox(1.2, 0.7, 0.8, wM(0xD8B85A), -80 + hb * 0.4, npHeight(-80, -23) + 0.35 + (hb === 2 ? 0.7 : 0), -23.6 + (hb === 1 ? 0.9 : 0), S);
NP.solids.push({ x: -79.6, z: -23.2, hw: 0.9, hd: 0.9 });
var lb = new THREE.Group();
lb.position.set(8.6, npHeight(8.6, -25.2), -25.2);
S.add(lb);
wCyl(0.6, 0.5, 0.7, wM(0x8A6A3A), 0, 0.35, 0, lb, 12);
for (var k = 0; k < 4; k++) {
var lg2 = wCyl(0.12, 0.12, 1, wM(0x7A5432), -0.2 + k * 0.13, 0.75, 0, lb, 7);
lg2.rotation.z = Math.PI / 2;
}
NP.solids.push({ x: 8.6, z: -25.2, r: 0.6 });
landBake(G, S);
ELW_LAMPS.forEach(function (p) {
var g = new THREE.Group();
g.position.set(p[0], npHeight(p[0], p[1]), p[1]);
G.add(g);
wCyl(0.09, 0.12, 3.2, dark, 0, 1.6, 0, g, 8);
wBox(0.7, 0.08, 0.08, dark, 0.3, 3.1, 0, g);
var bulbs = new THREE.Group();
g.add(bulbs);
[0xFF6A5A, 0x8AF0A0, 0xFFE08A, 0x8AC8FF, 0xFFB0E0].forEach(function (c, i) { var b = wSph(0.07, new THREE.MeshBasicMaterial({ color: c }), 0.08, 0.6 + i * 0.55, 0.1, bulbs, 6); b.userData.on = c; });
ELW.lamps.push({ g: g, bulbs: bulbs });
NP.solids.push({ x: p[0], z: p[1], r: 0.2 });
});
ELW_DRIFTS.forEach(function (d) {
var g = new THREE.Group();
g.position.set(d[0], npHeight(d[0], d[1]), d[1]);
g.visible = false;
G.add(g);
var a = wSph(1.3, snow, 0, 0, 0, g, 10);
a.scale.set(1.4, 0.45, 1);
var b = wSph(0.8, snow, 0.9, 0.1, 0.4, g, 8);
b.scale.y = 0.5;
var sv = wCyl(0.03, 0.03, 1.2, dark, -1.4, 0.6, 0.4, g, 5);
sv.rotation.z = 0.3;
wBox(0.3, 0.03, 0.35, wM(0x9AA0A8), -1.6, 0.08, 0.4, g);
ELW.drifts.push(g);
});
var P = npPut(G, "elw_warden", { child: true, elf: 1, sex: "f", rot: -Math.PI / 2, look: { top: 0x2A8A3A, topKind: "shirt", bottom: 0xC82A2A, shoes: 0x3A2A1A, hat: "beanie", hatColor: 0x2A8A3A } }, 36.6, 27.6, null, null);
NP.talkers.push({ p: P, r: 2.8, name: ELW_WARDEN, verb: "volunteer", fn: elwOpen });
var ring = wMesh(new THREE.TorusGeometry(1.1, 0.07, 6, 28), new THREE.MeshBasicMaterial({ color: 0xFFE08A, transparent: true, opacity: 0.7, depthWrite: false }), 0, 0, 0, G);
ring.rotation.x = Math.PI / 2;
ring.visible = false;
ELW.ring = ring;
var pil = wMesh(new THREE.CylinderGeometry(0.35, 0.35, 7, 10, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE8A8, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }), 0, 0, 0, G);
pil.visible = false;
ELW.pillar = pil;
},
function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🎄 " + esc(ELW_WARDEN) + "</div>" +
"<div style='opacity:.85;margin:4px 0 8px'>\"Nobody has to, and nobody is paid: you help because you want to. But every job done, the elves make you something on the spot, and no two of their gifts are ever alike.\"</div>", fns = {};
if (ELW.task) {
var T = ELW_T[ELW.task];
h += "<div style='margin:6px 0'>You are doing: <b>" + T.icon + " " + esc(T.n) + "</b> (" + ELW.step + " of " + T.steps.length + " done).</div>" + worldBtn("stop", "Stop this job", "You can start it again any time");
fns.stop = function () { elwStop("You put the job down. Clementine smiles: \"Any help is help.\""); worldCard(null); };
}
else {
ELW_TASKS.forEach(function (T) { h += worldBtn("t_" + T.k, T.icon + " " + esc(T.n), esc(T.say)); fns["t_" + T.k] = function () { elwStart(T.k); }; });
}
if (ELW.today != null && ELW.cap != null)
h += "<div style='opacity:.75;font-size:12px;margin-top:6px'>Gifts from the elves today: " + ELW.today + " of " + ELW.cap + ". After that they can only thank you, until tomorrow.</div>";
if (!elwSigned())
h += "<div style='opacity:.75;font-size:12px;margin-top:6px'>Sign in to be given the elves' gifts. You can still help without.</div>";
h += worldBtn("mine", "🎁 The gifts you have", "In your Backpack");
fns.mine = function () { worldCard(null); if (typeof bkpOpen === "function")
bkpOpen(); };
worldCard(h, fns);
},
function (k) {
var T = ELW_T[k];
if (!T)
return;
worldCard(null);
ELW.task = k;
ELW.step = 0;
ELW.busy = null;
ELW.started = Date.now();
if (k === "paths")
ELW.drifts.forEach(function (g) { g.visible = true; g.scale.set(1, 1, 1); });
if (k === "lights")
ELW.lamps.forEach(function (L) { elwLamp(L, false); });
elwSay("<b>" + T.icon + " " + esc(T.n) + ".</b> " + esc(T.say) + " Follow the arrow on the banner, and the golden ring.");
if (elwSigned())
elwRpc("elf_service_start", { p_task: k }).then(function (o) { if (o && o.ok === false && o.say)
elwSay(esc(o.say)); }).catch(function (e) { if (dgrMissing(e))
ELW.missing = true; });
},
function (s) {
var T = ELW_T[ELW.task];
ELW.busy = null;
ELW.step++;
if (s[6] === "drift" && ELW.drifts[s[7]])
ELW.drifts[s[7]].visible = false;
if (s[6] === "lamp" && ELW.lamps[s[7]])
elwLamp(ELW.lamps[s[7]], true);
if (typeof playTone === "function")
try {
playTone(784, 0.15);
}
catch (e) { }
if (ELW.step >= T.steps.length)
return elwFinish(T);
var c = s[5], nx = T.steps[ELW.step];
elwSay("✓ Done" + (c ? ": you carry " + esc(c) : "") + ". Next: <b>" + esc(nx[2]) + "</b> (" + ELW.step + " of " + T.steps.length + ").");
},
function (T) {
var k = T.k;
elwStop(null);
if (!elwSigned()) {
elwSay("<b>" + T.icon + " " + esc(T.n) + ": all done!</b> The elves cheer. Sign in, and next time they will have a gift for you.");
return;
}
elwSay("<b>" + T.icon + " " + esc(T.n) + ": all done!</b> The elves cheer, and one of them runs off to the workshop…");
elwRpc("elf_service_done", { p_task: k }).then(function (o) {
if (!o)
return;
if (o.ok === false) {
elwSay(esc(o.say || "The elves thank you warmly."));
return;
}
if (o.today != null)
ELW.today = +o.today;
if (o.cap != null)
ELW.cap = +o.cap;
if (!o.gift) {
elwSay("<b>Thank you!</b> " + esc(o.say || "The elves have given you all their gifts for today. Come back tomorrow: your help still counts."));
return;
}
ELW.gifts = null;
elwGiftCard(o.gift);
}).catch(function (e) { elwSay(elwSoft(e)); });
},
function (g) {
if (typeof playTone === "function")
try {
[1047, 1319, 1568].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.15); }, i * 130); });
}
catch (e) { }
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🎁 A gift from the elves</div><div style='font-size:42px;text-align:center;margin:6px 0'>" + esc(g.icon || "🎁") + "</div>" +
"<div style='text-align:center;font-weight:600'>" + esc(g.name) + "</div><div style='text-align:center;opacity:.8;margin:2px 0 8px'>Made by " + esc(g.maker || "an elf") + " · No. " + esc(String(g.id)) + "</div>" +
"<div style='opacity:.85'>One of a kind: there is no other like it anywhere. It is in your Backpack, to keep, or to give to a dreamer beside you.</div>";
worldCard(h, {});
},
function () {
var T = ELW.task && ELW_T[ELW.task];
if (!T || !elwOn())
return "";
var s = T.steps[ELW.step];
if (!s)
return "";
var L = worldLocal(), dx = s[0] - L.x, dz = s[1] - L.z, d = Math.hypot(dx, dz);
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var arrows = ["⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️", "➡️", "↗️"], i = ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8;
var c = elwCarry();
return "<div style='color:#FFE8A8'>" + T.icon + " " + (d < 3 ? "Here" : arrows[i]) + " <b>" + esc(s[2]) + "</b>" + (d < 3 ? "" : " · " + Math.round(d) + " m") + (c ? " · carrying " + esc(c) : "") + "</div>";
},
function () {
if (ELW.giftsBusy || !elwSigned())
return;
ELW.giftsBusy = true;
ELW.giftsAt = Date.now();
elwRpc("elf_gifts_mine", {}).then(function (o) { if (o && o.ok) {
ELW.gifts = o.rows || [];
if (o.today != null)
ELW.today = +o.today;
if (o.cap != null)
ELW.cap = +o.cap;
if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint();
} })
.catch(function (e) { if (dgrMissing(e))
ELW.missing = true; ELW.gifts = ELW.gifts || []; }).then(function () { ELW.giftsBusy = false; });
},
function (id) {
var g = (ELW.gifts || []).filter(function (x) { return +x.id === id; })[0];
if (!g)
return;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
var near = (typeof presenceList === "function" ? presenceList() : []).filter(function (p) { return p.dist < 6; });
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Give " + esc(g.name) + "</div>", fns = {};
if (!near.length)
h += "<div style='opacity:.85;margin:6px 0'>Stand beside the dreamer you want to give it to (within a few steps), then open your Backpack again.</div>";
else {
h += "<div style='opacity:.85;margin:4px 0'>Who should have it? It will be theirs, and no longer yours.</div>";
near.forEach(function (p, i) { h += worldBtn("p" + i, "🎁 " + esc(String(p.name).split(" · ")[0]), Math.round(p.dist) + " m away"); fns["p" + i] = function () { elwGive(g, p); }; });
}
worldCard(h, fns);
},
function (g, p) {
worldCard(null);
elwRpc("elf_gift_give", { p_id: +g.id, p_to: p.id }).then(function (o) {
if (o && o.ok === false) {
elwSay(esc(o.say || "It could not be given."));
return;
}
ELW.gifts = (ELW.gifts || []).filter(function (x) { return +x.id !== +g.id; });
elwSay("🎁 You give <b>" + esc(g.name) + "</b> to " + esc(String(p.name).split(" · ")[0]) + ".");
}).catch(function (e) { elwSay(elwSoft(e)); });
}
];
});
