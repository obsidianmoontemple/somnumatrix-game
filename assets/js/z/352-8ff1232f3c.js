/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(352, function () {
"use strict";
return [
function (s) {
var S = spbStore();
if (!S.pin)
S.pin = SPB_SPELLS.filter(function (p) { return spbPinned(p.s); }).map(function (p) { return p.s; });
var i = S.pin.indexOf(s);
if (i >= 0)
S.pin.splice(i, 1);
else {
S.pin.push(s);
if (S.pin.length > 6)
S.pin.shift();
}
spbSave();
if (typeof pwBarSig !== "undefined")
pwBarSig = "";
if (typeof pwBarAt !== "undefined")
pwBarAt = 0;
},
function (s) {
var B = SPB.buf;
if (s === "warding")
return SPB.wardHp > 0 && (B.ward || 0) > SPB.t;
if (s === "enchanting")
return (B.enchant || 0) > SPB.t;
if (s === "scrying")
return (B.scry || 0) > SPB.t;
if (s === "shadow-doubling")
return !!SPB.decoy;
if (s === "sigil-warding")
return !!SPB.ring;
if (s === "faerglow-calling")
return !!spbStore().wisp;
if (s === "darksight")
return !!spbStore().dark;
if (s === "stone-skin")
return (B.stone || 0) > SPB.t;
return false;
},
function (s) {
var p = SPB_BY[s];
if (!p)
return;
if (!spbOn(s)) {
spbSay("<b>" + esc(p.n) + "</b> is taught at " + esc(spbWhereTaught(s)) + ".");
return;
}
if (typeof walkMode !== "undefined" && !walkMode) {
spbSay("Step out and walk first.");
return;
}
var left = spbCoolLeft(s);
if (left > 0) {
spbSay("<b>" + esc(p.n) + "</b> is gathering again (" + Math.ceil(left) + " s).");
return;
}
var ok = false;
SPB.casting = true;
try {
ok = SPB_CAST[s] ? SPB_CAST[s](p) !== false : false;
}
catch (e) {
spbWarn("cast " + s, e);
ok = false;
}
SPB.casting = false;
if (ok && p.cd)
SPB.cool[s] = SPB.t + p.cd;
if (SPB.book && SPB.book.style.display === "block")
spbBookPaint();
},
function () {
var w = spbWorld();
if (w === "underdark" || w === "sea" || w === "mmin")
return true;
if (typeof UDX !== "undefined" && UDX.here)
return true;
try {
if (typeof ugOn !== "undefined" && ugOn)
return true;
}
catch (e) { }
var h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
return !spbInside() && (h < 6 || h >= 20);
},
function (range) {
var P = spbP(), out = [];
function add(f) { if (!f)
return; var d = Math.hypot(f.x - P.x, f.z - P.z); if (d > range)
return; f.d = d; out.push(f); }
try {
if (spbWorld() === "battle" && typeof bwFoesForMe === "function") {
bwFoesForMe().concat(typeof bwDummies === "function" ? bwDummies() : []).forEach(function (o) {
add({ kind: o.pvp ? "pvp-bw" : o.M ? "machine" : "bw", o: o, x: o.x, y: o.y, z: o.z, r: o.r || 0.7, beast: !!(o.F && o.F.team === "wild"),
name: o.F ? o.F.k.name : o.M ? "the machine" : (o.pvp && o.pvp.name) || "a dreamer",
hit: function (d, ex) { bwStrikeFoe(o, d, ex || {}); },
hold: function (s) { if (o.F && o.F.k.body !== "dummy" && !o.F.k.boss)
o.F.spbHold = Math.max(o.F.spbHold || 0, s);
else if (o.F && o.F.k.boss)
o.F.slow = Math.max(o.F.slow || 0, s); },
calm: function (s) { if (o.F && !o.F.k.boss && o.F.team !== "dummy") {
o.F.spbCalm = s;
o.F.tgt = null;
return true;
} return false; },
push: function (dx, dz, m) {
if (!o.F || o.F.k.boss)
return;
var n = Math.hypot(dx, dz) || 1, F = o.F, nx = F.x + dx / n * m, nz = F.z + dz / n * m;
if (typeof bwSolidAt !== "function" || !bwSolidAt(nx, nz, F.y + 0.3)) {
F.x = nx;
F.z = nz;
}
} });
});
}
}
catch (e) {
spbWarn("ironfray foes", e);
}
try {
if (typeof dgrFightHere === "function" && dgrFightHere() && typeof dgrOthers === "function" && !(typeof dgrProtected === "function" && dgrProtected())) {
var L = dgrMeLocal();
if (!dgrInRing(L.x, L.z))
dgrOthers().forEach(function (o) {
if (dgrInRing(o.lx, o.lz))
return;
if (DGR.no && DGR.no[o.id] > Date.now())
return;
add({ kind: "pvp", o: o, x: o.g.position.x, y: o.g.position.y + 1.1, z: o.g.position.z, r: 0.6, name: o.name,
hit: function (d) { spbPvpHit(o, d); }, hold: function () { }, calm: function () { return false; }, push: function () { } });
});
}
}
catch (e) {
spbWarn("dreamer foes", e);
}
SPELL_FOES.forEach(function (fn) { try {
(fn() || []).forEach(function (f) { if (f && f.x !== undefined) {
if (!f.kind)
f.kind = "beast";
if (f.beast === undefined)
f.beast = true;
add(f);
} });
}
catch (e) {
spbWarn("foes from elsewhere", e);
} });
SPB.dummies.forEach(function (D) {
if (!D.g || !D.g.parent)
return;
var w = new THREE.Vector3();
D.g.getWorldPosition(w);
add({ kind: "dummy", x: w.x, y: w.y + 1.3, z: w.z, r: 0.5, name: "the practice dummy", beast: true,
hit: function (d) { spbDummyHit(D, d); }, hold: function (s) { D.held = Math.max(D.held || 0, s); spbDummyFx(D, 0xD8D8F0); }, calm: function () { spbDummyFx(D, 0xE8C27A); return true; },
push: function (dx, dz, m) { D.kick = Math.min(1, (D.kick || 0) + m / 8); } });
});
return out.sort(function (a, b) { return a.d - b.d; });
},
function (o, d) {
try {
var id = dgrWhere(), lv = dgrLevelOf(id);
if (lv === 1 && !dgrAgreed(o.id)) {
dgrChallenge(o);
return;
}
if (DGR.downT)
return;
DGR.fought = DGR.t;
dgrRpc("danger_send", { p_to: o.id, p_w: id, p_body: { t: "hit", d: Math.max(1, Math.min(25, Math.round(d))) } }).then(function (r) {
if (r && r.ok === false) {
if (r.no)
DGR.no[o.id] = Date.now() + 60000;
spbSay(esc(r.say || "That does not reach them."));
}
}).catch(function () { });
}
catch (e) {
spbWarn("dreamer blow", e);
}
},
function (d) {
d = +d || 0;
if (d <= 0)
return d;
if ((SPB.buf.stone || 0) > SPB.t)
d *= 0.42;
if ((SPB.buf.iron || 0) > SPB.t)
d *= 0.55;
if (SPB.wardHp > 0 && (SPB.buf.ward || 0) > SPB.t) {
var soak = Math.min(SPB.wardHp, d);
SPB.wardHp -= soak;
d -= soak;
spbWardHit(soak);
if (SPB.wardHp <= 0)
spbSay("<b>Your ward breaks.</b>");
}
return d;
},
function (n) {
var got = false;
try {
if (spbWorld() === "battle" && typeof BW !== "undefined" && !BW.downT && BW.hp < BW.max) {
BW.hp = Math.min(BW.max, BW.hp + n);
got = true;
}
}
catch (e) { }
try {
if (!SPELL_MEND.length && typeof DGR !== "undefined" && DGR && !DGR.downT && DGR.hp < DGR.max) {
DGR.hp = Math.min(DGR.max, DGR.hp + n);
got = true;
}
}
catch (e) { }
SPELL_MEND.forEach(function (fn) { try {
if (fn(n) !== false)
got = true;
}
catch (e) { } });
return got;
},
function () {
if (SPB.book)
return SPB.book;
var el = SPB.book = document.createElement("div");
el.id = "spb-book";
el.style.cssText = "position:fixed;z-index:31;left:50%;top:10%;transform:translateX(-50%);width:min(420px,calc(100vw - 24px));max-height:78vh;overflow-y:auto;" +
"background:rgba(12,9,20,.96);border:1px solid #8A6AE8;border-radius:6px;padding:12px 14px;color:var(--bone,#E8E0D0);font:13px var(--sans,system-ui);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-spb]") : null;
if (!b)
return;
var a = b.getAttribute("data-spb"), v = b.getAttribute("data-v");
if (a === "close") {
el.style.display = "none";
return;
}
if (a === "cast") {
el.style.display = "none";
spbCast(v);
return;
}
if (a === "pin") {
spbPinToggle(v);
spbBookPaint();
return;
}
if (a === "drink") {
spbDrink(v);
spbBookPaint();
return;
}
if (a === "where") {
el.style.display = "none";
spbShowWay(v);
return;
}
});
document.body.appendChild(el);
return el;
},
function () {
var el = spbBookEl();
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font:500 16px var(--serif,Georgia);color:#E8D8FF">✨ Your spellbook</b><button class="btn" data-spb="close">Close</button></div>' +
'<div style="color:var(--dim,#999);font-size:12px;margin-bottom:6px">Cast from here, or keep a spell on the power bar with ☆ (number keys use the bar).</div>';
[["arcane", "The Somnucor Academy of the Arcane"], ["deep", "The Duskwell Academy of the Deep Arts"]].forEach(function (sc) {
h += '<div style="margin:10px 0 3px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C8B0FF">' + esc(sc[1]) + '</div>';
SPB_SPELLS.filter(function (p) { return p.sch === sc[0]; }).forEach(function (p) {
var know = spbKnows(p.s), on = spbActive(p.s), cl = spbCoolLeft(p.s);
h += '<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.07)"><div style="display:flex;align-items:center;gap:8px">' +
'<span style="font-size:18px;width:22px;text-align:center">' + p.i + '</span><span style="flex:1"><b style="font-weight:500;' + (know ? '' : 'color:var(--dim,#999)') + '">' + esc(p.n) + '</b>' +
(on ? ' <span style="color:#E8C27A;font-size:11px">on</span>' : '') + (cl > 0 ? ' <span style="color:var(--dim,#999);font-size:11px">' + Math.ceil(cl) + ' s</span>' : '') + '</span>' +
(know ? (p.s === "potion-brewing" ? '' : '<button class="btn" data-spb="pin" data-v="' + esc(p.s) + '" title="Keep on the power bar">' + (spbPinned(p.s) ? '★' : '☆') + '</button> <button class="btn" data-spb="cast" data-v="' + esc(p.s) + '">' + (p.tog ? (on ? 'Switch off' : 'Switch on') : 'Cast') + '</button>') :
'<button class="btn" data-spb="where" data-v="' + esc(p.s) + '">Where to learn</button>') + '</div>' +
'<div style="color:var(--dim,#999);font-size:12px;margin:2px 0 0 30px;line-height:1.4">' + esc(p.use) + (know ? '' : ' <span style="color:#9A88C8">Taught in ' + esc(spbWhereTaught(p.s)) + '.</span>') + '</div></div>';
});
});
h += spbPotHtml(true);
el.innerHTML = h;
},
function (s) {
var r = typeof acRoomOf === "function" ? acRoomOf(s) : null;
if (r && r.dusk) {
var inCity = typeof UDX !== "undefined" && !UDX.here && typeof WLD !== "undefined" && WLD.on === "underdark" && typeof UDC !== "undefined" && UDC.academy;
if (inCity && typeof guideTo !== "undefined")
guideTo = { key: "udx_academy", x: (UD.base || 0) + UDC.academy.x, z: UDC.academy.z };
spbSay("<b>" + esc(SPB_BY[s].n) + "</b> is taught at the Duskwell Academy, in Zhaelvorn deep under the Underdark: the hall-column with three slim towers on the east side of the city, behind the Practice Court and its three glowing circles." + (inCity ? " Follow the pointer." : ""));
return;
}
if (typeof acGo === "function")
acGo();
},
function () {
SPB.buf.ward = SPB.t + 25;
SPB.wardHp = 60;
var F = spbFeet();
spbRing(F.x, F.y + 0.1, F.z, 0xB08AFF, 3, 1.2);
spbBurst(F.x, F.y, F.z, 0xC8B0FF, 60, [1, 2.2, 1], 1.4, "swirl", 0.2);
if (!SPB.bubble) {
var m = new THREE.Mesh(new THREE.SphereGeometry(1.25, 20, 14), spbMat(0xB08AFF, 0.08, { ds: 1, add: 1 }));
m.renderOrder = 3;
SPB.bubble = m;
}
if (!SPB.bubble.parent)
scene.add(SPB.bubble);
SPB.wardPulse = 0.6;
spbTone(660, 0.25);
spbSay("<b>Arcane Ward.</b> A shimmering skin wraps you (it soaks 60 harm, for 25 seconds).");
},
function () {
var P = spbP(), f = spbFwd(), y = spbFeetY(), n = 0;
for (var i = 1; i <= 5; i++)
spbBurst(P.x + f.x * i * 2.2, y + 0.6, P.z + f.z * i * 2.2, 0xE8F4FF, 24, [0.8, 1.6, 0.8], 0.7 + i * 0.08, "burst", 0.18);
spbFoes(12).forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz) || 0.01;
if ((dx * f.x + dz * f.z) / d < 0.45 && d > 1.4)
return;
try {
o.push(dx, dz, 6);
o.hit(8, { knock: 4 });
n++;
}
catch (e) { }
});
SPB.buf.tail = SPB.t + 8;
spbTone(300, 0.3);
spbSay("<b>Gust.</b> " + (n ? "The wind throws back " + n + (n > 1 ? " of them" : "") + "." : "The wind roars away in front of you.") + " It is at your back for a few seconds.");
},
function () {
var held = (typeof carrying !== "undefined" && carrying) || (spbWorld() === "battle" && typeof bwHeldKey === "function" && bwHeldKey());
if (!held) {
spbSay("<b>Take up a weapon first</b> (or a wand, a staff, anything you strike or cast with), then enchant it.");
return false;
}
SPB.buf.enchant = SPB.t + 60;
var F = spbFeet();
spbBurst(F.x, F.y + 1, F.z, 0xFFB060, 50, [0.6, 1.2, 0.6], 1.2, "swirl", 0.2);
spbTone(520, 0.3);
spbSay("<b>Enchanted.</b> Arcane fire runs along what you hold: half as much again with every blow, for a minute.");
},
function () {
var w = spbWorld(), dark = spbDark();
if (w === "underdark" || w === "mmin")
return Math.random() < 0.6 ? "glowcap" : "pearlmoss";
if (w === "sea" || w === "surface" && typeof PW !== "undefined" && PW.wade > 0.2)
return "pearlmoss";
if (w === "battle" || w === "race" || w === "volcano" || /fire|ember|lava|desert|mars|mercury|venus|io/i.test(w))
return Math.random() < 0.7 ? "emberroot" : "sunpetal";
if (dark)
return Math.random() < 0.7 ? "moonmint" : "pearlmoss";
return ["sunpetal", "sunpetal", "emberroot", "moonmint"][Math.floor(Math.random() * 4)];
},
function () {
if (spbInside()) {
spbSay("<b>Nothing wild grows indoors.</b> Forage out in the open of any world; in the Academy's glasshouses, gather from the beds.");
return false;
}
if (spbWorld() === "space" || spbWorld() === "station" || spbWorld() === "shuttle") {
spbSay("Nothing grows out here in the void. Try any land with ground under it.");
return false;
}
var k = spbForageKind(), n = 1 + (Math.random() < 0.35 ? 1 : 0), got = spbHerbAdd(k, n), H = SPB_HERBS[k];
var F = spbFeet(), f = spbFwd();
spbBurst(F.x + f.x * 1.5, F.y, F.z + f.z * 1.5, 0x9AE870, 40, [0.6, 0.8, 0.6], 1.2, "rise", 0.16);
spbTone(740, 0.15);
spbSay(got ? "<b>" + H.icon + " You find " + got + " " + esc(H.name.toLowerCase()) + "</b> growing here, and take a little. It is in your backpack (" + spbStore().herb[k] + ")." : "Your herb pouch holds no more " + esc(H.name.toLowerCase()) + " (" + SPB_HERB_CAP + ").");
},
function () {
var o = null;
spbFoes(16).forEach(function (q) { if (!o && q.beast && q.kind !== "pvp" && q.kind !== "pvp-bw" && q.kind !== "machine")
o = q; });
if (!o) {
spbSay("<b>No beast near you is after you.</b> Calming works on beasts within 16 m, never on dreamers.");
return false;
}
var ok = false;
try {
ok = o.calm(30) !== false;
}
catch (e) { }
if (!ok) {
spbSay("<b>" + esc(spbTitle(o.name)) + "</b> is too far gone in its rage to be calmed.");
return;
}
spbBurst(o.x, o.y, o.z, 0xF0D890, 50, [0.8, 1.4, 0.8], 1.8, "rise", 0.18);
spbTone(392, 0.4);
spbSay("<b>" + esc(spbTitle(o.name)) + " calms.</b> Its anger leaves it, and it wanders off (30 seconds).");
},
function () {
SPB.buf.scry = SPB.t + 30;
SPB.scryAt = 0;
var F = spbFeet();
spbRing(F.x, F.y + 0.1, F.z, 0x8AA0FF, 10, 1.6);
spbTone(560, 0.4);
var lv = "";
try {
if (typeof dgrHereLevel === "function" && spbWorld()) {
var L = dgrHereLevel(), nm = ["Safe", "Guarded", "Risky", "Dangerous", "Deadly"][L] || "";
lv = " This land is <b>" + nm + "</b> (danger " + L + ").";
}
}
catch (e) { }
setTimeout(function () { var n = SPB.marks.filter(function (m) { return m.visible; }).length; spbSay("<b>Far-sight.</b> " + (n ? n + " living thing" + (n > 1 ? "s" : "") + " within 150 m shine" + (n > 1 ? "" : "s") + " through walls and rock." : "Nothing living stirs within 150 m.") + lv); }, 350);
},
function () {
var S = spbStore(), k = spbPlace(), R = S.runes[k], P = spbP();
if (R && Date.now() - R.at < 48 * 3600e3 && Math.hypot(R.x - P.x, R.z - P.z) > 8) {
if (typeof guideTo !== "undefined") {
guideTo = { key: "Your waymark rune", x: R.x, z: R.z };
}
spbSay("<b>ᛟ Your waymark rune calls you back.</b> Follow the pointer at the top of the screen (" + Math.round(Math.hypot(R.x - P.x, R.z - P.z)) + " m). Press Waymark on the rune to move it.");
return;
}
var F = spbFeet();
S.runes[k] = { x: F.x, y: F.y, z: F.z, at: Date.now() };
spbSave();
spbRuneShow(true);
spbBurst(F.x, F.y, F.z, 0xF0D070, 60, [1, 1.6, 1], 1.4, "rise", 0.18);
spbTone(620, 0.3);
spbSay("<b>ᛟ A waymark rune burns into the ground here.</b> Anywhere else in this land, press Waymark and the pointer leads you back.");
},
function () {
var dist = 12, P = spbP(), x0 = P.x, z0 = P.z, y = spbFeetY();
var n = Math.ceil(dist / 0.5), dx = -Math.sin(yaw) * 0.5, dz = -Math.cos(yaw) * 0.5;
spbBurst(x0, y, z0, 0x3A2A5A, 60, [0.6, 2, 0.6], 1.1, "rise", 0.3);
if (typeof RAP !== "undefined")
RAP.noMult = true;
try {
for (var i = 0; i < n; i++) {
var bx = P.x, bz = P.z;
walkBy(dx, dz);
if (P.x === bx && P.z === bz)
break;
}
}
catch (e) { }
finally {
if (typeof RAP !== "undefined")
RAP.noMult = false;
}
spbBurst(P.x, y, P.z, 0x6A4A9A, 60, [0.6, 2, 0.6], 1.1, "rise", 0.3);
spbFoes(40).forEach(function (o) { if (o.o && o.o.F) {
o.o.F.tgt = null;
o.o.F.tAt = (typeof BW !== "undefined" ? BW.t : 0) + 1.2;
} });
var d = Math.round(Math.hypot(P.x - x0, P.z - z0));
spbTone(220, 0.2);
spbSay(d > 1 ? "<b>Blink.</b> You are suddenly " + d + " m on." : "Something solid stands in the way.");
},
function () {
if (SPB.decoy)
spbDecoyEnd(true);
var F = spbFeet(), g = new THREE.Group(), m = spbMat(0x1A1028, 0.62);
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.25, 10), m);
body.position.y = 0.95;
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), m);
head.position.y = 1.72;
g.add(head);
[-1, 1].forEach(function (s) {
var a = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.7, 6), m);
a.position.set(s * 0.3, 1.1, 0);
a.rotation.z = s * 0.15;
g.add(a);
var l = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.75, 6), m);
l.position.set(s * 0.12, 0.38, 0);
g.add(l);
});
var halo = spbGlow(0x6A4A9A, 2.4, 0.3);
halo.position.y = 1.1;
g.add(halo);
g.position.set(F.x, F.y, F.z);
g.rotation.y = yaw;
scene.add(g);
SPB.decoy = { g: g, x: F.x, y: F.y, z: F.z, hp: 60, until: SPB.t + 12 };
spbBurst(F.x, F.y, F.z, 0x3A2A5A, 70, [0.7, 2.2, 0.7], 1.3, "rise", 0.3);
spbTone(180, 0.3);
spbSay("<b>Shadow Double.</b> A shadow of you stands here for 12 seconds. Anything that hunts you goes for it.");
},
function () {
if (SPB.ring)
spbRingEnd(true);
var F = spbFeet(), g = new THREE.Group();
g.position.set(F.x, F.y + 0.05, F.z);
var r1 = new THREE.Mesh(new THREE.RingGeometry(3.86, 4.02, 64), spbMat(0xE070A8, 0.7, { ds: 1 }));
r1.rotation.x = -Math.PI / 2;
g.add(r1);
var r2 = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.46, 64), spbMat(0xE070A8, 0.45, { ds: 1 }));
r2.rotation.x = -Math.PI / 2;
g.add(r2);
var sig = ["♛", "✳", "✦", "⚔", "⌖", "⚖", "✤"];
var marks = new THREE.Group();
g.add(marks);
sig.forEach(function (ch, i) {
var a = i / 7 * Math.PI * 2, p = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: spbGlyphTex(ch, "#F0A0D0"), transparent: true, opacity: 0.9, depthWrite: false, fog: false, side: THREE.DoubleSide }));
p.rotation.x = -Math.PI / 2;
p.position.set(Math.cos(a) * 3.7, 0.02, Math.sin(a) * 3.7);
marks.add(p);
});
scene.add(g);
SPB.ring = { g: g, marks: marks, x: F.x, z: F.z, r: 4, until: SPB.t + 45, seen: {} };
spbBurst(F.x, F.y, F.z, 0xE070A8, 60, [4, 0.6, 4], 1.4, "rise", 0.2);
spbTone(440, 0.4);
spbSay("<b>Sigil of Warding.</b> Seven sigils ring you, 8 m across. For 45 seconds nothing that hunts you crosses it.");
},
function () {
var S = spbStore();
S.wisp = !S.wisp;
spbSave();
if (!S.wisp && SPB.wisp) {
spbDrop(SPB.wisp);
SPB.wisp = null;
}
var F = spbFeet();
spbBurst(F.x, F.y + 1.4, F.z, 0xD8C0FF, 30, [0.4, 0.6, 0.4], 1, "rise", 0.14);
spbTone(S.wisp ? 700 : 500, 0.2);
spbSay(S.wisp ? "<b>Starlight Wisp.</b> A wisp of soft starlight comes down to follow at your shoulder." : "The starlight wisp fades away.");
},
function () {
var F = spbFeet(), n = 0;
[0, 0.25, 0.5].forEach(function (dl, i) { setTimeout(function () { spbRing(F.x, F.y + 0.08, F.z, 0xC8A070, 10, 1.1); }, dl * 1000); });
spbBurst(F.x, F.y, F.z, 0xA88A60, 90, [6, 0.8, 6], 1.4, "rise", 0.3);
spbFoes(10).forEach(function (o) { try {
o.hold(3);
o.hit(12);
var dx = o.x - F.x, dz = o.z - F.z;
o.push(dx, dz, 1.5);
n++;
}
catch (e) { } });
if (!(typeof VRM !== "undefined" && VRM && VRM.xr))
SPB.shake = 0.6;
spbTone(90, 0.6);
spbSay("<b>Tremor.</b> The ground answers your song" + (n ? " and throws " + n + " off " + (n > 1 ? "their" : "its") + " feet." : "."));
},
function () {
var P = spbP(), f = spbFwd(), o = spbAimed(18, 0.4), y = spbFeetY() + 1.2;
var to = o ? { x: o.x, y: o.y, z: o.z } : { x: P.x + f.x * 12, y: spbFeetY() + 0.1, z: P.z + f.z * 12 };
var ball = spbGlow(0xE8E8F8, 0.6, 0.9), from = { x: P.x + f.x * 0.6, y: y, z: P.z + f.z * 0.6 };
ball.position.set(from.x, from.y, from.z);
spbAdd(ball, 0.3, function (F, k) { ball.position.set(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k + Math.sin(k * Math.PI) * 0.6, from.z + (to.z - from.z) * k); });
setTimeout(function () {
spbWeb(to.x, to.y - (o ? 0.8 : 0), to.z, o ? 4 : 2);
if (o) {
try {
o.hold(4);
o.hit(o.kind === "pvp" ? 6 : 4);
}
catch (e) { }
}
}, 300);
spbTone(600, 0.12);
spbSay(o ? "<b>Web Snare.</b> Shadow-silk wraps <b>" + esc(o.name) + "</b> and holds" + (o.kind === "pvp" ? " them back a moment." : " it fast for 4 seconds.") : "<b>Web Snare.</b> The silk finds nothing to hold and lies on the ground.");
},
function (x, y, z, life) {
var c = document.createElement("canvas");
c.width = c.height = 128;
var g = c.getContext("2d");
g.strokeStyle = "rgba(235,235,250,.9)";
g.lineWidth = 2;
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
g.beginPath();
g.moveTo(64, 64);
g.lineTo(64 + Math.cos(a) * 62, 64 + Math.sin(a) * 62);
g.stroke();
}
for (var r = 10; r < 64; r += 10) {
g.beginPath();
for (var j = 0; j <= 10; j++) {
var b = j / 10 * Math.PI * 2;
var xx = 64 + Math.cos(b) * r, yy = 64 + Math.sin(b) * r;
if (j)
g.lineTo(xx, yy);
else
g.moveTo(xx, yy);
}
g.stroke();
}
var tex = new THREE.CanvasTexture(c), m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide, fog: false });
var grp = new THREE.Group();
grp.position.set(x, y, z);
[0, Math.PI / 2].forEach(function (r) { var p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), m); p.rotation.y = r; p.position.y = 0.9; grp.add(p); });
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), m);
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.05;
grp.add(fl);
spbAdd(grp, life, function (F, k) { m.opacity = 0.9 * (k > 0.8 ? (1 - k) / 0.2 : 1); });
},
function (parent, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
var straw = new THREE.MeshLambertMaterial({ color: 0xC8A860 }), wood = new THREE.MeshLambertMaterial({ color: 0x5A3A22 }), red = new THREE.MeshLambertMaterial({ color: 0xA83A2A });
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.0, 8), wood);
post.position.y = 0.5;
g.add(post);
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.9, 10), straw);
body.position.y = 1.3;
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), straw);
head.position.y = 1.95;
g.add(head);
var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 6), straw);
arm.rotation.z = Math.PI / 2;
arm.position.y = 1.55;
g.add(arm);
var tgt = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), red);
tgt.position.set(0, 1.35, 0.33);
g.add(tgt);
var base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.08, 12), wood);
base.position.y = 0.04;
g.add(base);
g.userData.keep = 1;
parent.add(g);
var D = { g: g, hp: 100, held: 0, kick: 0 };
g.userData.spbDummy = 1;
SPB.dummies.push(D);
return D;
},
function (bed, k) {
var S = spbStore(), now = Date.now(), ready = S.beds[bed] || 0, H = SPB_HERBS[k];
if (ready > now) {
spbSay("<b>" + esc(H.name) + "</b> here was picked not long ago. It grows back in about " + Math.ceil((ready - now) / 60000) + " min.");
return false;
}
var n = 1 + (Math.random() < 0.5 ? 1 : 0) + (spbKnows("herb-lore") ? 1 : 0), got = spbHerbAdd(k, n);
if (!got) {
spbSay("Your herb pouch holds no more " + esc(H.name.toLowerCase()) + " (" + SPB_HERB_CAP + ").");
return false;
}
S.beds[bed] = now + SPB_BED_REGROW * 1000;
spbSave();
var F = spbFeet();
spbBurst(F.x, F.y + 0.4, F.z, 0x9AE870, 24, [0.5, 0.6, 0.5], 1, "rise", 0.14);
spbTone(760, 0.12);
spbSay("<b>" + H.icon + " You gather " + got + " " + esc(H.name.toLowerCase()) + "</b>" + (spbKnows("herb-lore") ? " (herb-lore finds you a little more)" : "") + ". It is in your backpack (" + S.herb[k] + ").");
return true;
},
function (k) {
var P = SPB_POTIONS[k], S = spbStore();
return Object.keys(P.needs).map(function (h) {
var have = S.herb[h] || 0, need = P.needs[h], ok = have >= need;
return '<span style="color:' + (ok ? '#9AE8A0' : '#E8A07A') + '">' + SPB_HERBS[h].icon + ' ' + need + ' ' + esc(SPB_HERBS[h].name.toLowerCase()) + ' <span style="opacity:.75">(you have ' + have + ')</span></span>';
}).join(" · ");
},
function (k) {
if (!spbKnows("potion-brewing")) {
spbSay("<b>Brewing is taught in the Alchemy Laboratory</b> of the Somnucor Academy, in the Spellwright Wing. Take the lesson first.");
return false;
}
var P = SPB_POTIONS[k];
if (!P)
return false;
if (!spbCanBrew(k)) {
spbSay("<b>Not enough herbs for the " + esc(P.name) + ".</b> It takes " + Object.keys(P.needs).map(function (h) { return P.needs[h] + " " + SPB_HERBS[h].name.toLowerCase(); }).join(" and ") + ".");
return false;
}
var S = spbStore();
Object.keys(P.needs).forEach(function (h) { S.herb[h] -= P.needs[h]; if (S.herb[h] <= 0)
delete S.herb[h]; });
S.pot[k] = (S.pot[k] || 0) + 1;
spbSave();
var F = spbFeet(), f = spbFwd();
spbBurst(F.x + f.x * 1.2, F.y + 1, F.z + f.z * 1.2, parseInt(P.col.slice(1), 16), 40, [0.4, 1.2, 0.4], 1.4, "rise", 0.18);
spbTone(520, 0.3);
spbSay("<b>" + P.icon + " You brew a " + esc(P.name) + ".</b> Stir, settle, bottle: it is in your backpack (" + S.pot[k] + ").");
return true;
},
function (where) {
var h = '<div class="item"><b>🧪 The cauldron</b>' + (spbKnows("potion-brewing") ? '' : ' <span class="dim">(brewing is learned in the Alchemy Laboratory of the Somnucor Academy)</span>');
Object.keys(SPB_POTIONS).forEach(function (k) {
var P = SPB_POTIONS[k];
h += '<div style="margin-top:6px;padding-top:5px;border-top:1px solid rgba(255,255,255,.07)"><b style="color:' + P.col + '">' + P.icon + ' ' + esc(P.name) + '</b> <span class="dim">: ' + esc(P.does) + '</span><br><span style="font-size:12px">It takes ' + spbNeedsHtml(k) + '</span>' +
'<div class="row"><button class="btn" data-spbbrew="' + k + '"' + (spbKnows("potion-brewing") && spbCanBrew(k) ? '' : ' style="opacity:.55"') + '>Brew one</button></div></div>';
});
return h + '</div>';
},
function (where) {
if (typeof worldCard === "function" && where === "dusk") {
worldCard("<div style='font:600 18px var(--serif,Georgia);color:#D8F0E0'>The alchemy laboratory</div><div style='opacity:.75;font-size:13px;margin-bottom:6px'>Mistress Orla's cauldrons, at the Duskwell Academy. Goggles on.</div>" + spbBrewHtml(where), {});
return;
}
spbPotOpen(true);
},
function (k) {
var S = spbStore(), P = SPB_POTIONS[k];
if (!P || !(S.pot[k] > 0))
return false;
var B = SPB.buf, msg = "";
if (k === "mend") {
if (!spbMend(40)) {
spbSay("<b>You are not hurt in any fight just now.</b> The Draught of Mending is kept for when you are (in Somnucor the City Hospital mends your health).");
return false;
}
msg = "Warmth runs through you: +40 vigour.";
}
else if (k === "swift") {
B.swift = SPB.t + 90;
msg = "Your legs are light: you run a third faster for 90 seconds.";
}
else if (k === "night") {
SPB.temp.darksight = SPB.t + 180;
msg = "Your eyes take the dark for 3 minutes.";
}
else if (k === "iron") {
B.iron = SPB.t + 60;
msg = "Your skin goes hard as iron for a minute.";
}
else if (k === "breath") {
SPB.temp["breathing underwater"] = SPB.t + 120;
msg = "Your breath is clear: you can breathe under water for 2 minutes (Dive is on your power bar).";
if (typeof pwBarSig !== "undefined") {
pwBarSig = "";
pwBarAt = 0;
}
}
S.pot[k] -= 1;
if (S.pot[k] <= 0)
delete S.pot[k];
spbSave();
var F = spbFeet();
spbBurst(F.x, F.y + 1.2, F.z, parseInt(P.col.slice(1), 16), 30, [0.4, 0.8, 0.4], 1, "rise", 0.14);
spbTone(600, 0.2);
spbSay("<b>" + P.icon + " " + esc(P.name) + ".</b> " + msg);
return true;
},
function (inBook) {
var S = spbStore(), h = "", herbs = Object.keys(S.herb).filter(function (k) { return S.herb[k] > 0 && SPB_HERBS[k]; }), pots = Object.keys(S.pot).filter(function (k) { return S.pot[k] > 0 && SPB_POTIONS[k]; });
if (!herbs.length && !pots.length)
return inBook ? '<div style="margin-top:10px;color:var(--dim,#999);font-size:12px">No draughts or herbs yet. Herbs grow in the Academy\'s glasshouses and Duskwell\'s Glowcap Garden; brew at the cauldrons.</div>' : "";
var head = function (t) { return '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">' + t + '</div>'; };
var row = function (l, r) { return '<div style="display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>' + l + '</span><span style="white-space:nowrap">' + r + '</span></div>'; };
if (pots.length) {
h += head("Potions and draughts");
pots.forEach(function (k) {
var P = SPB_POTIONS[k];
h += row('<span style="color:' + P.col + '">' + P.icon + '</span> ' + esc(P.name) + ' <span style="color:var(--dim,#999)">× ' + S.pot[k] + ' · ' + esc(P.does) + '</span>', '<button class="btn" data-spbdrink="' + k + '">Drink</button>');
});
}
if (herbs.length) {
h += head("Herbs and finds for brewing");
herbs.forEach(function (k) {
var H = SPB_HERBS[k];
h += row(H.icon + ' ' + esc(H.name) + ' <span style="color:var(--dim,#999)">· ' + esc(H.note) + '</span>', '<b>' + S.herb[k] + '</b>');
});
h += '<div style="color:var(--dim,#999);font-size:11.5px;margin-top:3px">Herbs are gathered, never sold. Brew them at an Academy cauldron.</div>';
}
return h;
},
function (brewing) {
var el = document.getElementById("spb-pot");
if (!el) {
el = document.createElement("div");
el.id = "spb-pot";
el.style.cssText = "position:fixed;z-index:31;left:50%;top:12%;transform:translateX(-50%);width:min(440px,calc(100vw - 24px));max-height:76vh;overflow-y:auto;" +
"background:rgba(10,14,12,.96);border:1px solid #6AC89A;border-radius:6px;padding:12px 14px;color:var(--bone,#E8E0D0);font:13px var(--sans,system-ui);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
document.body.appendChild(el);
}
if (el.style.display === "block" && !brewing && !el.dataset.brew) {
el.style.display = "none";
return;
}
el.dataset.brew = brewing ? "1" : "";
spbPotPaint();
el.style.display = "block";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
},
function () {
var el = document.getElementById("spb-pot");
if (!el)
return;
var brewing = !!el.dataset.brew || spbAtCauldron();
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:500 16px var(--serif,Georgia);color:#C8F0D8">⚗ ' + (brewing ? "Brew and drink" : "Your draughts") + '</b><button class="btn" data-spbx="1">Close</button></div>' +
(brewing ? spbBrewHtml() : "") + (spbPotHtml(true) || "");
},
function (I) {
var root = new THREE.Group(), ox = I.ox, A = I.academy.anim;
root.name = "spb-wing";
I.root.add(root);
var C = { root: root, ox: ox, anim: A, lite: spbLite() };
C.add = function (geo, mat, x, y, z, ry, rx, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry || rx || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); C.root.add(m); return m; };
C.solid = function (x, z, hw, hd, h) { I.walls.push({ x: ox + x, z: z, rot: 0, hw: hw, hd: hd, h: h || 1.2, level: 0 }); };
C.block = function (w, h, d, mat, x, y, z) { var m = C.add(gB(w, h, d), mat, x, (y || 0) + h / 2, z); C.solid(x, z, w / 2, d / 2, (y || 0) + h); return m; };
C.light = function (x, z) { I.lightSpots.push({ x: x, z: z, y: 0 }); };
C.flame = function (x, y, z, s) { var f = C.add(gK(0.05 * (s || 1), 0.16 * (s || 1), 6), tlm(0xFFB23A, "glow"), x, y, z); f.userData.keep = 1; I.academy.flames.push(f); return f; };
C.spot = function (x, z, room, face) { I.spots.push({ x: x, z: z, room: room, level: 0, face: face }); };
var T = 0.5;
C.wallX = function (z, x0, x1, gaps, mat, h) {
h = h || SPB_H;
var cuts = [x0];
(gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (g) { cuts.push(g[0] - g[1] / 2, g[0] + g[1] / 2); });
cuts.push(x1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
C.add(gB(b - a, h, T), mat, (a + b) / 2, h / 2, z);
C.solid((a + b) / 2, z, (b - a) / 2, T / 2, h);
}
(gaps || []).forEach(function (g) { var lt = Math.max(3.6, g[1] * 0.9 + 1.4); if (lt < h)
C.add(gB(g[1], h - lt, T), mat, g[0], lt + (h - lt) / 2, z); });
};
C.wallZ = function (x, z0, z1, gaps, mat, h) {
h = h || SPB_H;
var cuts = [z0];
(gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (g) { cuts.push(g[0] - g[1] / 2, g[0] + g[1] / 2); });
cuts.push(z1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
C.add(gB(T, h, b - a), mat, x, h / 2, (a + b) / 2);
C.solid(x, (a + b) / 2, T / 2, (b - a) / 2, h);
}
(gaps || []).forEach(function (g) { var lt = Math.max(3.6, g[1] * 0.9 + 1.4); if (lt < h)
C.add(gB(T, h - lt, g[1]), mat, x, lt + (h - lt) / 2, g[0]); });
};
C.sign = function (txt, x, y, z, ry, col, w, bg) {
w = w || 4.2;
var sc = hallCanvas(512, 96, function (g, cw, ch) {
g.fillStyle = bg || "#1E1630";
g.fillRect(0, 0, cw, ch);
g.strokeStyle = "#C9A040";
g.lineWidth = 5;
g.strokeRect(4, 4, cw - 8, ch - 8);
hallText(g, txt, cw / 2, ch / 2 + 2, cw - 30, "bold 36px Georgia,serif", col || "#F4E6C0");
});
var m = C.add(gP(w, w * 96 / 512), new THREE.MeshBasicMaterial({ map: sc.tex }), x, y, z);
m.rotation.y = ry || 0;
return m;
};
C.board = function (title, lines, x, y, z, ry, w, col) {
var bc = hallCanvas(512, 320, function (g, cw, ch) {
g.fillStyle = "#1A2218";
g.fillRect(0, 0, cw, ch);
g.strokeStyle = "#8A6A3A";
g.lineWidth = 10;
g.strokeRect(5, 5, cw - 10, ch - 10);
hallText(g, title, cw / 2, 44, cw - 40, "bold 30px Georgia,serif", col || "#F4ECD8");
lines.forEach(function (l, i) { hallText(g, l, cw / 2, 92 + i * 36, cw - 40, "22px Georgia,serif", "#DCE8D0"); });
});
var m = C.add(gP(w || 4, (w || 4) * 320 / 512), new THREE.MeshBasicMaterial({ map: bc.tex }), x, y, z);
m.rotation.y = ry || 0;
return m;
};
C.torch = function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 2.6, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
var b = new THREE.Mesh(gB(0.12, 0.12, 0.4), tlm(0x3A3A3E));
b.position.z = 0.2;
g.add(b);
var s = new THREE.Mesh(gC(0.06, 0.04, 0.5, 6), tlm(0x3E2814));
s.position.set(0, 0.2, 0.38);
g.add(s);
var f = new THREE.Mesh(gK(0.09, 0.26, 6), tlm(0xFFB23A, "glow"));
f.position.set(0, 0.56, 0.38);
g.add(f);
I.academy.flames.push(f);
C.root.add(g);
};
C.rug = function (x, z, w, d, col) { C.add(gB(w, 0.03, d), tlm(col || 0x6A1A22), x, 0.02, z); C.add(gB(w - 0.4, 0.035, d - 0.4), tlm(0xC9A040), x, 0.021, z); C.add(gB(w - 0.6, 0.04, d - 0.6), tlm(col || 0x6A1A22), x, 0.022, z); };
C.lectern = function (x, z, ry) { var m = C.add(gB(0.7, 1.1, 0.5), tlm(0x5A3A22), x, 0.55, z, ry); m.userData.furn = "lectern"; C.add(gB(0.8, 0.06, 0.6), tlm(0x3E2814), x, 1.12, z, ry, -0.3); C.solid(x, z, 0.4, 0.4, 1.2); };
C.banner = function (x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, SPB_H - 1.2, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
var cl = new THREE.Mesh(gP(1.6, 4.2), tlm(col, "ds"));
cl.position.y = -2.1;
g.add(cl);
var bar = new THREE.Mesh(gC(0.05, 0.05, 1.9, 6), tlm(0xC9A040));
bar.rotation.z = Math.PI / 2;
g.add(bar);
C.root.add(g);
return g;
};
C.bench = function (x, z, len, rot) { C.block(rot ? 0.5 : len, 0.45, rot ? len : 0.5, tlm(0x3E2814), x, 0, z); };
C.furn = function (k, x, z, ry, s, solid) {
if (typeof FURN === "undefined" || !FURN[k])
return null;
var g;
try {
g = FURN[k]();
}
catch (e) {
return null;
}
if (s)
g.scale.setScalar(s);
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
g.userData.spbShared = 1;
C.root.add(g);
if (solid !== false) {
try {
var bb = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3();
bb.getSize(sz);
var q = Math.abs(Math.sin(ry || 0)) > 0.7;
if (sz.y > 0.35)
C.solid(x, z, Math.max(0.15, (q ? sz.z : sz.x) / 2 - 0.05), Math.max(0.12, (q ? sz.x : sz.z) / 2 - 0.05), sz.y);
}
catch (e) { }
}
return g;
};
return C;
},
function (C, k, x, z, ry, h) {
if (typeof build !== "function" || typeof KIT === "undefined" || !KIT[k])
return null;
var g = null;
try {
g = build({ id: "__spb_" + k + "_" + Math.round(x) + "_" + Math.round(z), archetype: k, attrs: {}, x: 0, z: 0, rot: 0, detail: 3, nights: [], city: true, solid: false });
}
catch (e) {
g = null;
}
if (!g)
return null;
try {
var bb = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3();
bb.getSize(sz);
var s = (h || 1.4) / Math.max(sz.y, 0.1);
g.scale.multiplyScalar(s);
}
catch (e) { }
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
g.userData.spbShared = 1;
g.traverse(function (m) { m.raycast = function () { }; });
C.root.add(g);
return g;
},
function (I) {
var C = spbCtx(I), A = C.anim, lite = C.lite;
var stone = tlm(0x8C857A), stoneD = tlm(0x6E675C), flag = tlm(0x5E574C), ceil = tlm(0x3A342E), oak = tlm(0x5A3A22), oakD = tlm(0x3E2814), gold = tlm(0xC9A040), iron = tlm(0x3A3A3E), cream = tlm(0xE8E0CC), violet = tlm(0x4A2A6A);
[[-19, "THE SPELLWRIGHT WING", "#E0D0FF"], [19, "THE ACADEMY GROUNDS", "#D0FFD8"]].forEach(function (q) {
C.add(gT(1.6, 0.14, Math.PI), gold, q[0], 3.2, 45.6, 0, 0, 0);
C.add(gB(0.3, 3.2, 0.3), stoneD, q[0] - 1.6, 1.6, 45.6);
C.add(gB(0.3, 3.2, 0.3), stoneD, q[0] + 1.6, 1.6, 45.6);
var veil = C.add(gP(3, 4.6), tlm(q[0] < 0 ? 0x8A6AE8 : 0x6AC88A, "glow"), q[0], 2.3, 45.7, Math.PI);
veil.material = veil.material.clone();
veil.userData.keep = 1;
veil.material.opacity = 0.35;
A.push(function (t) { veil.material.opacity = 0.28 + 0.08 * Math.sin(t * 0.9 + q[0]); });
C.sign(q[1], q[0], 5.2, 45.65, Math.PI, q[2], 3.6);
var pad = C.add(gT(0.9, 0.05), tlm(q[0] < 0 ? 0xB09AFF : 0x9AFFB8, "glow"), q[0], 0.06, 43);
pad.rotation.x = Math.PI / 2;
});
var top = C.root, wingG = new THREE.Group(), groundsG = new THREE.Group(), castle = I.root.children.filter(function (o) { var lit = false; if (o !== top)
o.traverse(function (q) { if (q.isLight)
lit = true; }); return o !== top && !lit; });
top.add(wingG);
top.add(groundsG);
wingG.visible = groundsG.visible = false;
I.academy.spbG = { wing: wingG, grounds: groundsG };
I.academy.anim.push(function () {
var lz = camera.position.z - ((typeof INT !== "undefined" && INT && INT.oz) || 0), inW = lz < -100, inG = lz > 100;
if (wingG.visible !== inW)
wingG.visible = inW;
if (groundsG.visible !== inG)
groundsG.visible = inG;
var inC = !inW && !inG;
if (castle.length && castle[0].visible !== inC)
castle.forEach(function (o) { o.visible = inC; });
});
C.root = wingG;
(function () {
var X0 = -36, X1 = 36, Z0 = -252, Z1 = -122, A = spbGate(C, -262, -112);
C.add(gB(X1 - X0, 0.1, Z1 - Z0), flag, 0, -0.05, (Z0 + Z1) / 2);
C.add(gB(X1 - X0 + 0.6, 0.3, Z1 - Z0 + 0.6), ceil, 0, SPB_H + 0.15, (Z0 + Z1) / 2);
C.wallX(Z1, -8, 8, null, stone);
C.wallZ(-8, -134, Z1, null, stone);
C.wallZ(8, -134, Z1, null, stone);
C.wallX(-134, X0, -8, null, stone);
C.wallX(-134, 8, X1, null, stone);
C.wallZ(X0, Z0, -134, null, stone);
C.wallZ(X1, Z0, -134, null, stone);
C.wallX(Z0, X0, X1, null, stone);
var bands = [-152, -170, -188, -206];
bands.forEach(function (z) { C.wallX(z, X0, -8, null, stone); C.wallX(z, 8, X1, null, stone); });
var dz = [-143, -161, -179, -197, -215];
C.wallZ(-8, -224, -134, dz.map(function (z) { return [z, 2.6]; }), stone);
C.wallZ(8, -224, -134, dz.map(function (z) { return [z, 2.6]; }), stone);
C.wallX(-224, X0, -8, null, stone);
C.wallX(-224, 8, X1, null, stone);
C.wallX(-224, -8, 8, [[0, 6]], stone);
var back = C.add(gT(0.9, 0.05), tlm(0xB09AFF, "glow"), 4.5, 0.06, -124.5);
back.rotation.x = Math.PI / 2;
C.sign("BACK TO THE WEST GALLERY", 4.5, 3.6, -122.3, Math.PI, "#E0D0FF", 3.4);
C.sign("THE SPELLWRIGHT WING", 0, 6.4, -122.3, Math.PI, "#F4E6C0", 5.4);
C.rug(0, -180, 4.4, 84, 0x3A1A5A);
for (var tz = -130; tz >= -222; tz -= 8) {
C.torch(-7.7, tz, Math.PI / 2);
C.torch(7.7, tz - 4, -Math.PI / 2);
}
[-150, -176, -202].forEach(function (z, i) {
C.add(gC(0.7, 0.8, 0.8, 10), stoneD, -5.6, 0.4, z);
var st = C.add(gC(0.32, 0.5, 2.2, 10), stone, -5.6, 1.9, z);
C.add(gS(0.28), stone, -5.6, 3.25, z);
C.add(gK(0.3, 0.7, 10), stoneD, -5.6, 3.7, z);
C.add(gC(0.7, 0.8, 0.8, 10), stoneD, 5.6, 0.4, z + 13);
C.add(gC(0.32, 0.5, 2.2, 10), stone, 5.6, 1.9, z + 13);
C.add(gS(0.28), stone, 5.6, 3.25, z + 13);
C.add(gK(0.3, 0.7, 10), stoneD, 5.6, 3.7, z + 13);
C.solid(-5.6, z, 0.8, 0.8, 4);
C.solid(5.6, z + 13, 0.8, 0.8, 4);
});
var lan = [];
for (var li = 0; li < (lite ? 8 : 16); li++) {
var l = C.add(gS(0.18), tlm(0xFFD890, "glow"), -3 + ((li * 37) % 7), 5.4 + (li % 3) * 0.6, -136 - li * 5.6);
l.userData.keep = 1;
lan.push(l);
}
A.push(function (t) { lan.forEach(function (l, i) { l.position.y = 5.6 + (i % 3) * 0.6 + Math.sin(t * 0.7 + i) * 0.25; }); });
for (var lz = -128; lz >= -222; lz -= 12)
C.light(0, lz);
C.spot(0, -130, "swland");
function room(id) { return AC_ROOM[id]; }
function classroom(r, draw) {
var cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, west = r.x1 <= 0, far = west ? r.x0 + 2.4 : r.x1 - 2.4, ry = west ? Math.PI / 2 : -Math.PI / 2;
C.lectern(far, cz, ry);
if (r.subj)
C.board(r.name, r.subj.map(function (s) { return "✦ " + spbTitle(s) + (SPB_BY[s] ? " · " + SPB_BY[s].n : ""); }), west ? r.x0 + 0.3 : r.x1 - 0.3, 3.4, cz, ry, 4.2, "#" + (r.col || 0xF4ECD8).toString(16).padStart(6, "0"));
C.sign(r.name.replace(/^The /, "").toUpperCase(), west ? -7.68 : 7.68, 4.4, cz, west ? Math.PI / 2 : -Math.PI / 2, null, 3.6);
C.torch(west ? r.x0 + 0.3 : r.x1 - 0.3, cz - 6, ry);
C.torch(west ? r.x0 + 0.3 : r.x1 - 0.3, cz + 6, ry);
C.light(cx, cz);
C.light(far + (west ? 3 : -3), cz);
C.spot(far + (west ? 0.9 : -0.9), cz, r.id, west ? Math.PI / 2 : -Math.PI / 2);
draw(cx, cz, west, far, ry);
}
function rows(cx, cz, west, n) { for (var a = 0; a < (n || 3); a++)
for (var b = 0; b < 3; b++)
C.bench(cx + (west ? 1 : -1) * (a * 2.4 - 1), cz - 4 + b * 4, 2.6, true); }
classroom(room("wards"), function (cx, cz, west) {
var ring = C.add(gT(4.2, 0.06), tlm(0xB08AFF, "glow"), cx, 0.04, cz, 0, Math.PI / 2);
var ring2 = C.add(gT(3.1, 0.04), tlm(0xC8B0FF, "glow"), cx, 0.045, cz, 0, Math.PI / 2);
ring.userData.keep = ring2.userData.keep = 1;
var shields = [];
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var px = cx + q[0] * 7, pz = cz + q[1] * 5.4;
C.add(gC(0.35, 0.42, 4.6, 10), stoneD, px, 2.3, pz);
C.solid(px, pz, 0.45, 0.45, 4.6);
var sh = C.add(gC(0.9, 0.9, 0.04, 24), tlm(0xB08AFF, "glow"), px, 5.6, pz, 0, Math.PI / 2);
sh.material = sh.material.clone();
sh.material.opacity = 0.35;
sh.userData.keep = 1;
shields.push(sh);
});
A.push(function (t) { shields.forEach(function (s, i) { s.rotation.z = t * 0.4 + i; s.material.opacity = 0.28 + 0.1 * Math.sin(t * 0.8 + i); }); ring.rotation.z = t * 0.05; ring2.rotation.z = -t * 0.07; });
C.add(gB(1.4, 1.8, 0.3), tlm(0x8A8478), cx, 0.9, cz - 3.6);
C.add(gC(0.6, 0.6, 0.08, 20), tlm(0xB08AFF, "glow"), cx, 1.4, cz - 3.4, 0, Math.PI / 2);
C.solid(cx, cz - 3.6, 0.7, 0.2, 1.8);
C.banner(cx - 4, room("wards").z1 - 0.4, Math.PI, 0x4A2A8A);
C.banner(cx + 4, room("wards").z1 - 0.4, Math.PI, 0x4A2A8A);
rows(cx + (west ? 3 : -3), cz, west, 2);
});
classroom(room("winds"), function (cx, cz, west) {
var chimes = [];
for (var i = 0; i < (lite ? 5 : 9); i++) {
var g = new THREE.Group();
g.position.set(cx - 6 + i * 1.5, SPB_H - 0.3, cz + ((i * 5) % 7) - 3);
C.root.add(g);
for (var k = 0; k < 4; k++) {
var tb = new THREE.Mesh(gC(0.03, 0.03, 0.6 + k * 0.18, 6), tlm(0xC8D0D8));
tb.position.set((k - 1.5) * 0.08, -0.8 - k * 0.09, 0);
g.add(tb);
}
g.userData.keep = 1;
chimes.push(g);
}
A.push(function (t) { chimes.forEach(function (g, i) { g.rotation.z = Math.sin(t * 1.3 + i) * 0.12; g.rotation.x = Math.sin(t * 0.9 + i * 1.7) * 0.08; }); });
if (typeof particles === "function") {
var col = particles(lite ? 50 : 110, [1.4, 6, 1.4], 0xE8F4FF, 0.18, 0.55);
col.position.set(cx, 0.2, cz);
C.root.add(col);
A.push(function (t) { if (typeof swirl === "function")
swirl(col, 0.016, 2.2, 1.4, true); });
}
var vane = new THREE.Group();
vane.position.set(cx, 0, cz + 5.5);
vane.userData.keep = 1;
C.root.add(vane);
var vp = new THREE.Mesh(gC(0.05, 0.05, 3.2, 6), iron);
vp.position.y = 1.6;
vane.add(vp);
var arrow = new THREE.Mesh(gB(1.4, 0.08, 0.05), gold);
arrow.position.y = 3.2;
vane.add(arrow);
var tail = new THREE.Mesh(gK(0.25, 0.4, 3), gold);
tail.rotation.z = Math.PI / 2;
tail.position.set(0.8, 3.2, 0);
vane.add(tail);
C.solid(cx, cz + 5.5, 0.2, 0.2, 3);
A.push(function (t) { arrow.parent.rotation.y = Math.sin(t * 0.2) * 1.5; });
[-6, 0, 6].forEach(function (o) { var win = C.add(gP(2.4, 4.2), tlm(0x9AD8F0, "glow"), west ? room("winds").x0 + 0.3 : room("winds").x1 - 0.3, 4.6, cz + o, west ? Math.PI / 2 : -Math.PI / 2); win.material = win.material.clone(); win.material.opacity = 0.4; });
var flags = [C.banner(cx - 5, room("winds").z0 + 0.4, 0, 0x3A7A9A), C.banner(cx + 5, room("winds").z0 + 0.4, 0, 0xE8F0F8)];
A.push(function (t) { flags.forEach(function (f, i) { f.children[0].rotation.y = Math.sin(t * 1.6 + i) * 0.35; }); });
rows(cx + (west ? 3 : -3), cz, west, 2);
});
classroom(room("enchant"), function (cx, cz, west) {
var r = room("enchant");
if (!C.furn("hearthforge", cx, r.z0 + 1.6, 0, 1)) {
C.block(3, 1.4, 1.6, stoneD, cx, 0, r.z0 + 1.4);
C.add(gB(2.4, 0.2, 1.2), tlm(0xFF7A2A, "glow"), cx, 1.45, r.z0 + 1.4);
C.solid(cx, r.z0 + 1.4, 1.6, 0.9, 1.6);
}
C.furn("anvil", cx - 2, cz, 0);
C.furn("anvil", cx + 2, cz, 0);
C.furn("weaponrack", cx, r.z1 - 1, Math.PI);
C.block(4.4, 0.85, 1.4, oak, cx, 0, cz + 3);
var runes = [];
["ᚠ", "ᚱ", "ᛉ", "ᛟ", "ᛗ"].forEach(function (ch, i) { var m = C.add(gP(0.6, 0.6), new THREE.MeshBasicMaterial({ map: spbGlyphTex(ch, "#FFC070"), transparent: true, depthWrite: false, side: THREE.DoubleSide }), cx - 1.6 + i * 0.8, 1.6, cz + 3); runes.push(m); });
A.push(function (t) { runes.forEach(function (m, i) { m.position.y = 1.5 + Math.sin(t * 1.1 + i) * 0.15; m.rotation.y = t * 0.5 + i; m.material.opacity = 0.65 + 0.25 * Math.sin(t * 0.9 + i); }); });
for (var w = 0; w < 4; w++) {
C.add(gC(0.025, 0.02, 0.7, 6), oakD, cx - 1.5 + w, 0.9, cz + 3, 0, 0, Math.PI / 2);
C.add(gS(0.05), tlm(0xFFB060, "glow"), cx - 1.15 + w, 0.9, cz + 3);
}
if (typeof particles === "function") {
var sp = particles(lite ? 20 : 40, [1, 2.2, 0.5], 0xFF9A4A, 0.12, 0.7);
sp.position.set(cx, 1.4, r.z0 + 1.4);
C.root.add(sp);
A.push(function () { if (typeof rise === "function")
rise(sp, 0.016, 1.2, 0); });
}
C.light(cx, r.z0 + 2);
});
classroom(room("runes"), function (cx, cz, west) {
var mc = hallCanvas(512, 512, function (g, w, h) {
g.fillStyle = "#2A2420";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#C9A040";
g.lineWidth = 6;
g.beginPath();
g.arc(w / 2, h / 2, 230, 0, 6.283);
g.stroke();
g.beginPath();
g.arc(w / 2, h / 2, 160, 0, 6.283);
g.stroke();
g.fillStyle = "#E8D070";
g.font = "bold 48px Georgia,serif";
g.textAlign = "center";
g.textBaseline = "middle";
"ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ".split("").forEach(function (c, i) { var a = i / 12 * 6.283; g.fillText(c, w / 2 + Math.cos(a) * 195, h / 2 + Math.sin(a) * 195); });
g.font = "bold 120px Georgia,serif";
g.fillText("ᛟ", w / 2, h / 2 + 6);
});
var floor = C.add(gP(11, 11), new THREE.MeshLambertMaterial({ map: mc.tex }), cx, 0.03, cz, 0, -Math.PI / 2);
var stones = [];
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283, px = cx + Math.cos(a) * 7.2, pz = cz + Math.sin(a) * 6;
C.add(gB(0.9, 2.6, 0.5), stoneD, px, 1.3, pz, -a);
C.solid(px, pz, 0.55, 0.55, 2.6);
var gl = C.add(gP(0.5, 0.5), new THREE.MeshBasicMaterial({ map: spbGlyphTex("ᚠᚱᛉᛟᛗᚷ"[i], "#F0D070"), transparent: true, depthWrite: false, side: THREE.DoubleSide }), px - Math.cos(a) * 0.27, 1.8, pz - Math.sin(a) * 0.27, -a + Math.PI / 2);
stones.push(gl);
}
A.push(function (t) { stones.forEach(function (m, i) { m.material.opacity = 0.55 + 0.35 * Math.sin(t * 0.7 + i * 1.1); }); });
C.add(gB(3.6, 2, 0.1), tlm(0x1A2A1A), cx, 2.6, room("runes").z1 - 0.4);
C.light(cx, cz);
});
classroom(room("scry"), function (cx, cz, west) {
C.add(gC(0.5, 0.7, 1.1, 12), stoneD, cx, 0.55, cz);
C.solid(cx, cz, 0.6, 0.6, 1.4);
var ball = C.add(gS(0.5), tlm(0x9AB0FF, "glow"), cx, 1.6, cz);
ball.material = ball.material.clone();
var mist = spbGlow(0x8AA0FF, 2.6, 0.35);
mist.position.set(cx, 1.6, cz);
C.root.add(mist);
A.push(function (t) { ball.material.opacity = 0.6 + 0.2 * Math.sin(t * 0.9); mist.material.opacity = 0.25 + 0.1 * Math.sin(t * 0.6); ball.rotation.y = t * 0.3; });
var sp = [];
for (var si = 0; si < (lite ? 120 : 260); si++) {
var hh = (si * 2654435761) >>> 0;
sp.push(room("scry").x0 + 1 + ((hh % 10000) / 10000) * 26, SPB_H - 0.12, room("scry").z0 + 1 + (((hh >>> 8) % 10000) / 10000) * 16);
}
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
var stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xE8ECFF, size: 0.12, transparent: true, opacity: 0.9, depthWrite: false }));
C.root.add(stars);
C.add(gB(26, 0.05, 16), tlm(0x0A1028), cx, SPB_H - 0.08, cz);
[-5, 5].forEach(function (o) { var mr = C.add(gB(1.4, 2.4, 0.08), tlm(0xC8D8F0, "glow"), cx + o, 1.8, room("scry").z0 + 0.35); mr.material = mr.material.clone(); mr.material.opacity = 0.45; C.add(gB(1.6, 2.6, 0.06), gold, cx + o, 1.8, room("scry").z0 + 0.3); });
C.furn("crystalcluster", cx + 6, cz + 4, 0, 0.8);
C.furn("crystalcluster", cx - 6, cz - 4, 1.2, 0.7);
C.block(2.2, 0.8, 1.2, oakD, cx, 0, cz + 4.6);
});
classroom(room("alchemy"), function (cx, cz, west) {
var r = room("alchemy"), cols = [0x5AE8A0, 0xA890FF, 0xF0C060];
[-5, 0, 5].forEach(function (o, i) {
var x = cx + o, z = cz - 2.4;
C.add(gC(0.9, 0.7, 1.0, 16), tlm(0x1A1A1E), x, 0.55, z);
C.add(gT(0.9, 0.08), iron, x, 1.05, z, 0, Math.PI / 2);
C.solid(x, z, 0.95, 0.95, 1.2);
var top = C.add(gC(0.82, 0.82, 0.04, 16), tlm(cols[i], "glow"), x, 1.02, z);
top.material = top.material.clone();
for (var f = 0; f < 3; f++)
C.flame(x - 0.3 + f * 0.3, 0.08, z, 2);
if (typeof particles === "function") {
var b = particles(lite ? 10 : 22, [0.6, 1.2, 0.6], cols[i], 0.14, 0.7);
b.position.set(x, 1.05, z);
C.root.add(b);
A.push(function () { if (typeof rise === "function")
rise(b, 0.016, 0.6, 0); });
}
A.push(function (t) { top.material.opacity = 0.75 + 0.15 * Math.sin(t * 1.7 + i); });
});
C.block(14, 0.9, 1.2, oakD, cx, 0, r.z0 + 1.2);
var nB = lite ? 24 : 60, bot = new THREE.InstancedMesh(gC(0.08, 0.1, 0.3, 8), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), nB), o3 = new THREE.Object3D(), cc = new THREE.Color();
for (var bi = 0; bi < nB; bi++) {
o3.position.set(cx - 6.6 + (bi % 30) * 0.45, 1.05 + (bi >= 30 ? 0 : 0), r.z0 + 1 + (bi >= 30 ? 0.4 : 0));
o3.updateMatrix();
bot.setMatrixAt(bi, o3.matrix);
cc.setHSL((bi * 0.137) % 1, 0.6, 0.55);
bot.setColorAt(bi, cc);
}
bot.instanceMatrix.needsUpdate = true;
if (bot.instanceColor)
bot.instanceColor.needsUpdate = true;
C.root.add(bot);
C.furn("labbench", cx - 6, cz + 4, Math.PI);
C.furn("labbench", cx + 2, cz + 4, Math.PI);
var lines = Object.keys(SPB_POTIONS).map(function (k) { var P = SPB_POTIONS[k]; return P.name + ": " + Object.keys(P.needs).map(function (h) { return P.needs[h] + " " + SPB_HERBS[h].name.toLowerCase(); }).join(", "); });
C.board("The Recipes", lines, west ? r.x0 + 0.3 : r.x1 - 0.3, 3.4, cz + 5.5, west ? Math.PI / 2 : -Math.PI / 2, 4.6, "#C8F0D8");
for (var hr = 0; hr < 6; hr++) {
C.add(gC(0.01, 0.01, 3, 4), tlm(0x8A7A5A), cx - 7 + hr * 2.8, 6.2, r.z1 - 1, 0, 0, Math.PI / 2);
for (var hb = 0; hb < 5; hb++)
C.add(gK(0.08, 0.3, 5), tlm([0x6A8A3A, 0xC8A040, 0x8A3A3A][hb % 3]), cx - 8 + hr * 2.8 + hb * 0.5, 5.95, r.z1 - 1, 0, Math.PI);
}
});
(function () {
var r = room("stores"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE ALCHEMISTS' STORES", 7.68, 4.4, cz, -Math.PI / 2, null, 3.6);
for (var i = 0; i < 5; i++) {
C.furn("shelfgoods", r.x0 + 3 + i * 5, r.z0 + 0.8, 0);
C.furn("shelfgoods", r.x0 + 3 + i * 5, r.z1 - 0.8, Math.PI);
}
C.furn("barrel", r.x1 - 2, cz - 2, 0);
C.furn("barrel", r.x1 - 2, cz, 0);
C.furn("crates", r.x1 - 2.4, cz + 2.4, 0.3);
var nJ = lite ? 20 : 48, jars = new THREE.InstancedMesh(gC(0.12, 0.12, 0.28, 8), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.85 }), nJ), o3 = new THREE.Object3D(), cc = new THREE.Color();
for (var j = 0; j < nJ; j++) {
o3.position.set(cx - 6 + (j % 12) * 1.0, 0.95, cz - 1 + Math.floor(j / 12) * 0.6);
o3.updateMatrix();
jars.setMatrixAt(j, o3.matrix);
cc.setHSL((j * 0.21) % 1, 0.5, 0.5);
jars.setColorAt(j, cc);
}
jars.instanceMatrix.needsUpdate = true;
if (jars.instanceColor)
jars.instanceColor.needsUpdate = true;
C.root.add(jars);
C.block(13, 0.85, 2.6, oakD, cx, 0, cz + 0.2);
C.light(cx, cz);
})();
(function () {
var r = room("dorm"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE STUDENTS' DORMITORY", 7.68, 4.4, cz, -Math.PI / 2, null, 3.6);
for (var i = 0; i < (lite ? 4 : 6); i++) {
var x = r.x0 + 4 + i * 4;
if (!C.furn("fourposter", x, r.z0 + 1.8, 0, 0.8))
C.furn("bed", x, r.z0 + 1.8, 0);
C.furn("footchest", x, r.z0 + 4, 0);
if (!lite && i % 2 === 0)
C.furn("bed", x + 2, r.z1 - 1.8, Math.PI);
}
C.furn("wardrobe", r.x1 - 1, cz, -Math.PI / 2);
C.rug(cx, cz + 1.4, 16, 3, 0x2A2A6A);
C.light(cx, cz);
C.light(cx - 8, cz);
})();
(function () {
var r = room("masters"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE MASTERS' COMMON ROOM", 7.68, 4.4, cz, -Math.PI / 2, null, 3.6);
if (!C.furn("fireplace", r.x1 - 0.8, cz, -Math.PI / 2)) {
C.add(gB(4, 3.4, 1.2), stoneD, r.x1 - 0.8, 1.7, cz, Math.PI / 2);
C.solid(r.x1 - 0.8, cz, 0.6, 2, 3.4);
}
for (var f = 0; f < 4; f++)
C.flame(r.x1 - 1.2, 0.3, cz - 0.6 + f * 0.4, 3);
C.furn("armchair", r.x1 - 4.6, cz - 2, -Math.PI / 2 + 0.4);
C.furn("armchair", r.x1 - 4.6, cz + 2, -Math.PI / 2 - 0.4);
C.furn("sofa", cx - 2, cz, Math.PI / 2);
C.furn("bookshelf", cx, r.z0 + 0.6, 0);
C.furn("bookshelf", cx - 4, r.z0 + 0.6, 0);
C.furn("bookshelf", cx + 4, r.z0 + 0.6, 0);
C.furn("table", cx + 2, cz, 0);
C.rug(cx + 1, cz, 10, 7, 0x5A1A2A);
C.light(cx, cz);
C.light(r.x1 - 3, cz);
})();
(function () {
var r = room("wandgal"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE WANDWRIGHT'S GALLERY", 7.68, 4.4, cz, -Math.PI / 2, null, 3.6);
var glass = new THREE.MeshLambertMaterial({ color: 0xD8E8F0, transparent: true, opacity: 0.25, depthWrite: false }), tips = [];
for (var i = 0; i < 5; i++) {
var x = r.x0 + 4 + i * 4.6;
[r.z0 + 2.4, r.z1 - 2.4].forEach(function (z, j) {
C.block(1.6, 0.9, 0.8, oakD, x, 0, z);
C.add(gB(1.5, 0.6, 0.7), glass, x, 1.2, z);
for (var w = 0; w < 3; w++) {
C.add(gC(0.015, 0.012, 0.5, 5), [oakD, tlm(0x2A1A10), tlm(0xD8C8A8)][(i + w + j) % 3], x - 0.4 + w * 0.4, 1.0, z, 0, 0, Math.PI / 2);
var tp = C.add(gS(0.03), tlm([0xFFB060, 0xB08AFF, 0x7AE8B0, 0x9AD8F0][(i + w) % 4], "glow"), x - 0.15 + w * 0.4, 1.0, z);
tp.userData.keep = 1;
tips.push(tp);
}
});
}
A.push(function (t) { tips.forEach(function (p, i) { p.scale.setScalar(0.9 + 0.25 * Math.sin(t * 1.4 + i)); }); });
C.block(1.4, 1.0, 5, oak, r.x1 - 2, 0, cz);
C.lectern(r.x1 - 3.4, cz, -Math.PI / 2);
C.light(cx, cz);
C.light(cx - 7, cz);
})();
(function () {
var r = room("range"), cx = 0, cz = (r.z0 + r.z1) / 2;
C.sign("THE PRACTICE RANGE", 0, 5.2, -223.7, 0, "#FFD0B0", 4.6);
C.board("The Practice Range", ["Cast at the dummies: they keep count", "Ward · Gust · Calm · Polymorph · Starfall", "Blink · Mirror Double · Sigil · Enchant and strike"], -6, 3.2, -224.3, Math.PI, 4.4, "#FFD0B0");
for (var i = 0; i < (lite ? 4 : 6); i++) {
var x = -25 + i * 10;
spbDummy(C.root, x, 0, r.z0 + 5, 0);
C.add(gB(3, 0.02, 0.2), tlm(0xE8E0CC, "glow"), x, 0.03, r.z0 + 17);
}
C.add(gB(70, 0.02, 0.25), tlm(0xE8C27A, "glow"), 0, 0.03, r.z0 + 19);
for (var b = 0; b < 4; b++)
C.bench(-30 + b * 20, r.z1 - 2, 4);
C.lectern(14, r.z1 - 3, Math.PI);
C.spot(14, r.z1 - 4, "range", Math.PI);
[-24, -8, 8, 24].forEach(function (x) { C.light(x, cz); });
for (var tz = r.x0 + 2; tz < r.x1; tz += 10) {
C.torch(tz, r.z0 + 0.3, 0);
}
})();
})();
C.root = groundsG;
(function () {
var A = spbGate(C, 112, 252), X0 = -40, X1 = 44, Z0 = 122, Z1 = 242, H = SPB_H + 3, grass = tlm(0x4A6A34), path = tlm(0x9A9078), glassM = new THREE.MeshLambertMaterial({ color: 0xCFE8F4, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide });
C.add(gB(X1 - X0, 0.1, Z1 - Z0), grass, (X0 + X1) / 2, -0.05, (Z0 + Z1) / 2);
C.add(gB(16, 0.04, Z1 - Z0), path, 0, 0.01, (Z0 + Z1) / 2);
var sky = C.add(gB(X1 - X0 + 0.6, 0.2, Z1 - Z0 + 0.6), new THREE.MeshBasicMaterial({ color: 0x6A9AD0 }), (X0 + X1) / 2, H + 1.4, (Z0 + Z1) / 2);
function skyNow() { var h = (typeof cityHourNow === "function") ? cityHourNow() : 12, day = h >= 7 && h < 18, dusk = (h >= 18 && h < 20) || (h >= 5 && h < 7); sky.material.color.setHex(day ? 0x7AA8D8 : dusk ? 0xC88A6A : 0x101830); }
skyNow();
var skT = 0;
A.push(function (t) { if (t - skT > 30) {
skT = t;
skyNow();
} });
C.wallX(Z0, -8, 8, null, stone, H);
C.wallZ(-8, Z0, 134, null, stone, H);
C.wallZ(8, Z0, 134, null, stone, H);
C.wallX(134, X0, -8, null, stone, H);
C.wallX(134, 8, X1, null, stone, H);
C.wallZ(X0, 134, Z1, null, stone, H);
C.wallZ(X1, 134, Z1, null, stone, H);
C.wallX(Z1, X0, X1, null, stone, H);
C.wallX(170, X0, -8, null, stone, H);
C.wallX(206, X0, -8, null, stone, H);
C.wallX(188, 8, X1, null, stone, H);
C.wallZ(-8, 134, 224, [[152, 3], [188, 3], [215, 2.6]], stone, H);
C.wallZ(8, 134, 224, [[161, 3.4], [206, 3]], stone, H);
C.wallX(224, X0, -8, null, stone, H);
C.wallX(224, 8, X1, null, stone, H);
var roof = C.add(gB(X1 - X0, 0.05, Z1 - Z0), glassM, (X0 + X1) / 2, H, (Z0 + Z1) / 2);
for (var rx = X0; rx <= X1; rx += 6)
C.add(gB(0.12, 0.2, Z1 - Z0), iron, rx, H - 0.1, (Z0 + Z1) / 2);
for (var rz = Z0; rz <= Z1; rz += 8)
C.add(gB(X1 - X0, 0.2, 0.12), iron, (X0 + X1) / 2, H - 0.1, rz);
var back = C.add(gT(0.9, 0.05), tlm(0x9AFFB8, "glow"), 4.5, 0.06, 124.5);
back.rotation.x = Math.PI / 2;
C.sign("BACK TO THE EAST GALLERY", 4.5, 3.6, 122.3, 0, "#D0FFD8", 3.4);
C.sign("THE ACADEMY GROUNDS", 0, 6.4, 122.3, 0, "#F4E6C0", 5.2);
C.add(gC(1.6, 1.8, 0.6, 20), stoneD, 0, 0.3, 131);
var fw = C.add(gC(1.4, 1.4, 0.04, 20), tlm(0x6AA8D8, "water"), 0, 0.62, 131);
C.solid(0, 131, 1.8, 1.8, 0.7);
C.add(gC(0.2, 0.3, 1.6, 8), stone, 0, 1.2, 131);
if (typeof particles === "function") {
var sp = particles(lite ? 14 : 30, [0.3, 1.2, 0.3], 0xCFE8FF, 0.12, 0.6);
sp.position.set(0, 1.9, 131);
C.root.add(sp);
A.push(function () { if (typeof fall === "function")
fall(sp, 0.016, 1.2, 0); });
}
for (var tz = 140; tz <= 220; tz += 10) {
C.add(gC(0.08, 0.1, 3, 6), iron, -7, 1.5, tz);
C.add(gS(0.22), tlm(0xFFE0A0, "glow"), -7, 3.1, tz);
C.add(gC(0.08, 0.1, 3, 6), iron, 7, 1.5, tz + 5);
C.add(gS(0.22), tlm(0xFFE0A0, "glow"), 7, 3.1, tz + 5);
C.solid(-7, tz, 0.15, 0.15, 3);
C.solid(7, tz + 5, 0.15, 0.15, 3);
}
for (var lz = 128; lz <= 236; lz += 12)
C.light(0, lz);
C.spot(0, 128, "grland");
function plants(x, z, w, d, col, flower, n, glow) {
n = lite ? Math.ceil(n * 0.5) : n;
var leaf = new THREE.InstancedMesh(gK(0.12, 0.5, 5), tlm(col), n), fl = new THREE.InstancedMesh(gS(0.08), glow ? tlm(flower, "glow") : tlm(flower), n), o3 = new THREE.Object3D();
for (var i = 0; i < n; i++) {
var hh = (i * 2246822519 + Math.round(x * 7 + z * 3)) >>> 0, px = x - w / 2 + 0.2 + ((hh % 1000) / 1000) * (w - 0.4), pz = z - d / 2 + 0.2 + (((hh >>> 10) % 1000) / 1000) * (d - 0.4);
o3.position.set(px, 0.75, pz);
o3.rotation.set(0, (hh % 628) / 100, 0);
o3.scale.set(1, 0.8 + ((hh >>> 20) % 40) / 100, 1);
o3.updateMatrix();
leaf.setMatrixAt(i, o3.matrix);
o3.position.y = 1.05;
o3.scale.set(1, 1, 1);
o3.updateMatrix();
fl.setMatrixAt(i, o3.matrix);
}
leaf.instanceMatrix.needsUpdate = true;
fl.instanceMatrix.needsUpdate = true;
C.root.add(leaf);
C.root.add(fl);
}
function bed(x, z, w, d, herb) {
C.block(w, 0.5, d, oakD, x, 0, z);
C.add(gB(w - 0.3, 0.06, d - 0.3), tlm(0x3A2A1A), x, 0.52, z);
var H = SPB_HERBS[herb], spec = { sunpetal: [0x4A8A3A, 0xF0D040], emberroot: [0x8A3A2A, 0xE8603A], moonmint: [0x6A9AA8, 0xC8E8FF, 1], glowcap: [0x5A4A6A, 0xB890FF, 1], pearlmoss: [0x7A8A8A, 0xE8F0F0] }[herb] || [0x4A8A3A, 0xFFFFFF];
plants(x, z, w, d, spec[0], spec[1], Math.round(w * d * 1.6), spec[2]);
C.sign(H.name.toUpperCase(), x, 1.1, z + d / 2 + 0.06, 0, "#E8F0D0", 1.4, "#20301A");
}
(function () {
var r = AC_ROOM.herbs, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE GLASSHOUSE OF HERBS", -7.68, 4.4, 152, Math.PI / 2, null, 3.8);
r.beds.forEach(function (h, i) { bed(cx - 7 + (i % 2) * 14, cz - 8 + Math.floor(i / 2) * 12, 8, 2.4, h); });
C.lectern(r.x0 + 2.4, cz, Math.PI / 2);
C.spot(r.x0 + 3.3, cz, "herbs", Math.PI / 2);
C.board("The Glasshouse of Herbs", ["✦ Herb-lore · Forage", "Gather from the beds (they grow back)", "Sunpetal · Emberroot"], r.x0 + 0.3, 3.4, cz, Math.PI / 2, 4.2, "#C8F0B0");
C.furn("plant", r.x1 - 1.2, r.z0 + 1.2, 0);
C.furn("plant", r.x1 - 1.2, r.z1 - 1.2, 0);
C.block(3, 0.9, 1.2, oak, cx, 0, r.z1 - 1.6);
C.light(cx - 7, cz);
C.light(cx + 7, cz);
})();
(function () {
var r = AC_ROOM.moon, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE MOONLIT GLASSHOUSE", -7.68, 4.4, 188, Math.PI / 2, null, 3.8);
C.add(gB(r.x1 - r.x0, 0.06, r.z1 - r.z0), tlm(0x101828), cx, H - 0.3, cz);
var moon = C.add(gS(1.2), tlm(0xE8ECFF, "glow"), cx, H - 1.6, cz);
moon.material = moon.material.clone();
A.push(function (t) { moon.material.opacity = 0.75 + 0.1 * Math.sin(t * 0.4); });
r.beds.forEach(function (h, i) { bed(cx - 8 + i * 8, cz, 5, 6, h); });
var motes = [];
for (var m = 0; m < (lite ? 6 : 14); m++) {
var s = spbGlow(0xC8E8FF, 0.5, 0.6);
s.position.set(cx - 12 + m * 1.8, 1.2 + (m % 3) * 0.4, cz - 3 + ((m * 7) % 6));
C.root.add(s);
motes.push(s);
}
A.push(function (t) { motes.forEach(function (s, i) { s.position.y = 1.2 + (i % 3) * 0.4 + Math.sin(t * 0.6 + i) * 0.3; s.material.opacity = 0.4 + 0.25 * Math.sin(t * 0.8 + i); }); });
C.light(cx, cz);
})();
(function () {
var r = AC_ROOM.shed, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE POTTING SHED", -7.68, 4.4, 215, Math.PI / 2, null, 3);
C.block(10, 0.9, 1.4, oakD, cx, 0, r.z0 + 1.2);
for (var p = 0; p < 12; p++)
C.add(gC(0.18, 0.13, 0.28, 8), tlm(0xB8603A), cx - 5 + p * 0.9, 1.05, r.z0 + 1.2);
C.furn("shelfgoods", r.x0 + 1, cz, Math.PI / 2);
C.furn("barrel", cx + 6, r.z1 - 1.2, 0);
C.furn("crates", cx - 6, r.z1 - 1.4, 0.2);
for (var tl = 0; tl < 5; tl++)
C.add(gC(0.03, 0.03, 1.4, 5), oakD, r.x0 + 0.5, 1.2, cz - 3 + tl * 0.6, 0, 0, 0.12);
C.spot(cx, cz, "shed", 0);
C.light(cx, cz);
})();
(function () {
var r = AC_ROOM.menag, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE MENAGERIE", 7.68, 4.4, 161, -Math.PI / 2, null, 3.6);
var pens = [["stag", cx - 9, cz - 14, 2.2], ["fox", cx + 9, cz - 14, 0.9], ["unicorn", cx - 9, cz + 14, 2.3], ["griffin", cx + 9, cz + 14, 2.6]];
if (lite)
pens = pens.slice(0, 2);
pens.forEach(function (q, i) {
var px = q[1], pz = q[2];
for (var f = 0; f < 4; f++) {
var a = f * Math.PI / 2;
var fx = px + Math.cos(a) * 4, fz = pz + Math.sin(a) * 4;
if (f === (pz < cz ? 1 : 3))
continue;
C.add(gB(Math.abs(Math.cos(a)) > 0.5 ? 0.15 : 8, 1.1, Math.abs(Math.cos(a)) > 0.5 ? 8 : 0.15), oak, fx, 0.55, fz);
C.solid(fx, fz, Math.abs(Math.cos(a)) > 0.5 ? 0.1 : 4, Math.abs(Math.cos(a)) > 0.5 ? 4 : 0.1, 1.1);
}
C.add(gB(7.6, 0.04, 7.6), tlm(0xC8A860), px, 0.02, pz);
var g = spbBeast(C, q[0], px, pz, i * 1.3, q[3]);
if (g)
A.push(function (t) { g.rotation.y = i * 1.3 + Math.sin(t * 0.25 + i) * 0.9; g.position.x = px + Math.sin(t * 0.18 + i) * 1.2; });
C.add(gB(1.6, 0.4, 0.6), oakD, px + 2.6, 0.2, pz + 2.6);
});
C.add(gT(3, 0.06), tlm(0xE8A86A, "glow"), cx, 0.04, cz, 0, Math.PI / 2);
C.lectern(r.x1 - 2.4, cz, -Math.PI / 2);
C.spot(r.x1 - 3.3, cz, "menag", -Math.PI / 2);
C.board("The Menagerie", ["✦ Beast-calming · Calm Beast", "Lower your eyes; slow your breath", "Leave it a way to walk off"], r.x1 - 0.3, 3.4, cz, -Math.PI / 2, 4.2, "#FFD8B0");
C.light(cx - 9, cz - 14);
C.light(cx + 9, cz + 14);
C.light(cx, cz);
})();
(function () {
var r = AC_ROOM.aviary, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.sign("THE AVIARY", 7.68, 4.4, 206, -Math.PI / 2, null, 3);
for (var p = 0; p < (lite ? 2 : 5); p++) {
var px = cx - 12 + p * 6, pz = cz + ((p % 2) ? 3 : -3);
C.add(gC(0.06, 0.08, 3.4, 6), oakD, px, 1.7, pz);
C.add(gC(0.04, 0.04, 1.6, 6), oakD, px, 3.3, pz, 0, 0, Math.PI / 2);
C.solid(px, pz, 0.15, 0.15, 3.4);
var o = spbBeast(C, "owl", px, pz, p, 0.55);
if (o) {
o.position.y = 3.4;
(function (o, p) { A.push(function (t) { o.rotation.y = p + Math.sin(t * 0.4 + p) * 1.2; }); })(o, p);
}
}
for (var bz = r.z0 + 1; bz < r.z1; bz += 0.9)
C.add(gC(0.02, 0.02, H, 4), iron, r.x1 - 0.5, H / 2, bz);
C.block(4, 0.8, 1, oak, cx, 0, r.z1 - 1.5);
C.spot(cx + 4, r.z1 - 2.4, "aviary", Math.PI);
C.light(cx, cz);
})();
(function () {
var r = AC_ROOM.garden, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
C.add(gB(40, 0.04, 6), tlm(0x5A8AB8, "water"), cx, 0.05, cz);
C.add(gB(41, 0.3, 0.3), stoneD, cx, 0.15, cz - 3.1);
C.add(gB(41, 0.3, 0.3), stoneD, cx, 0.15, cz + 3.1);
C.solid(cx, cz, 20.5, 3.2, 0.3);
for (var b = 0; b < 4; b++) {
C.bench(cx - 18 + b * 12, cz + 6, 2.6);
C.furn("plant", cx - 24 + b * 12, cz - 6, 0);
}
[-30, 30].forEach(function (o) { C.add(gB(0.6, 1.4, 0.6), stone, cx + o, 0.7, cz); C.add(gS(0.3), tlm(0xFFE0A0, "glow"), cx + o, 1.6, cz); C.solid(cx + o, cz, 0.4, 0.4, 1.6); });
C.light(cx - 15, cz);
C.light(cx + 15, cz);
})();
})();
try {
I.root.children.slice().forEach(function (c) {
if (c === top || c.isLight)
return;
var lz = c.position.z - (I.oz || 0), hasL = false;
c.traverse(function (o) { if (o.isLight)
hasL = true; });
if (hasL)
return;
if (lz < -100)
wingG.attach(c);
else if (lz > 100)
groundsG.attach(c);
});
castle = castle.filter(function (o) { return o.parent === I.root; });
}
catch (e) {
spbWarn("dress", e);
}
if (typeof ppBake === "function")
try {
ppBake(wingG, 24);
ppBake(groundsG, 24);
ppBake(top);
}
catch (e) {
spbWarn("bake", e);
}
C.root = top;
},
function (G) {
var keepG = new Set(typeof TLG !== "undefined" ? Object.keys(TLG).map(function (k) { return TLG[k]; }) : []), keepM = new Set(typeof TLM !== "undefined" ? Object.keys(TLM).map(function (k) { return TLM[k]; }) : []);
var gs = new Set(), ms = new Set();
(function walk(o, shared) {
shared = shared || !!o.userData.spbShared;
if (!shared && o.geometry && !keepG.has(o.geometry))
gs.add(o.geometry);
var m = o.material;
(Array.isArray(m) ? m : m ? [m] : []).forEach(function (x) { if (!keepM.has(x) && (x.isMeshBasicMaterial || x.isMeshLambertMaterial) && x.map && x.map.isCanvasTexture)
ms.add(x); });
if (o.userData && o.userData.spbDummy)
o.userData.spbGone = 1;
o.children.forEach(function (c) { walk(c, shared); });
})(G);
gs.forEach(function (g) { try {
g.dispose();
}
catch (e) { } });
ms.forEach(function (m) { try {
m.map.dispose();
m.dispose();
}
catch (e) { } });
SPB.dummies = SPB.dummies.filter(function (D) { return !(D.g && D.g.userData.spbGone); });
if (G.parent)
G.parent.remove(G);
},
function (k) {
var r = dwRoom(DW_ROOM_OF[k]);
if (!r)
return "";
var h = "<div style='margin-top:10px;padding-top:8px;border-top:1px solid rgba(224,112,224,.3)'><div style='font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#E8B8F8'>Spells taught here, by " + esc(r.teach) + "</div>";
r.subj.forEach(function (s) {
var p = SPB_BY[s], know = typeof acLearned === "function" && acLearned(s);
h += "<div data-dwl='" + esc(s) + "' role='button' tabindex='0' style='cursor:pointer;margin:6px 0;padding:7px 10px;border:1px solid rgba(224,112,224,.45);border-radius:4px;background:rgba(224,112,224,.08)'><b>" + p.i + " " + esc(p.n) + "</b> " +
(know ? "<span style='color:#9AE8A0'>learned ✓</span>" : "<span style='opacity:.7'>take the lesson</span>") + "<div style='opacity:.75;font-size:12px'>" + esc(p.use) + "</div></div>";
});
return h + "</div>";
},
function () {
var S = spbStore(), h = "<div style='font:600 18px var(--serif,Georgia);color:#D8C8FF'>The Glowcap Garden</div><div style='opacity:.75;font-size:13px;margin-bottom:6px'>Mushrooms and moss that grow without sun, fed by the drip from the rock. Gather what is ripe; a picked bed grows back in about ten minutes.</div>";
DW_BEDS.forEach(function (b, i) {
var H = SPB_HERBS[b[1]], ready = spbBedReady(b[0]), left = Math.max(0, Math.ceil(((S.beds[b[0]] || 0) - Date.now()) / 60000));
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)'><span>" + H.icon + " <b>" + esc(H.name) + "</b>, bed " + (i + 1) + "<br><span style='opacity:.7;font-size:12px'>" + esc(H.note) + "</span></span>" +
(ready ? "<button class='btn' data-spbgather='" + b[0] + "|" + b[1] + "'>Gather</button>" : "<span style='opacity:.6;font-size:12px;white-space:nowrap'>grows back in " + left + " min</span>") + "</div>";
});
h += "<div style='margin-top:8px;font-size:12.5px;opacity:.85'>You carry " + (S.herb.glowcap || 0) + " glowcap and " + (S.herb.pearlmoss || 0) + " pearlmoss. Brew them at Mistress Orla's cauldrons in the alchemy laboratory, on the students' floor.</div>";
worldCard(h, {});
},
function (K, k, a, b, h, ry, y) {
if (typeof build !== "function" || typeof KIT === "undefined" || !KIT[k])
return null;
var g = null;
try {
g = build({ id: "__dw_" + k + "_" + Math.round(a * 10) + "_" + Math.round(b * 10), archetype: k, attrs: {}, x: 0, z: 0, rot: 0, detail: 3, nights: [], city: true, solid: false });
}
catch (e) {
g = null;
}
if (!g)
return null;
try {
var bb = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3();
bb.getSize(sz);
g.scale.multiplyScalar((h || 1) / Math.max(sz.y, 0.05));
}
catch (e) { }
var p = K.pt(a, b);
g.position.set(p[0], K.y + (y || 0), p[1]);
g.rotation.y = ry === undefined ? K.ryOut : ry;
g.traverse(function (m) { m.raycast = function () { }; });
K.A.g.add(g);
return g;
},
function (K) {
UDX_KITS.classroom(K);
var lamp = dwMesh(K, new THREE.SphereGeometry(0.16, 10, 8), udxMat(0xFFE0A0, null, { basic: 1 }), -K.W / 2 + 2.4, K.D * 0.4, 1.6);
K.glow(-K.W / 2 + 2.4, K.D * 0.4, 1.6, 0xFFE0A0, 1.4);
var scr = dwMesh(K, new THREE.PlaneGeometry(2.2, 1.6), udxMat(0xE8E0D0, null, { ds: 1 }), K.W / 2 - 1.2, K.D * 0.4, 1.6, K.ryL);
dwSolid(K, K.W / 2 - 1.2, K.D * 0.4, 1.1, 0.1, 2.4);
var hand = dwMesh(K, new THREE.CircleGeometry(0.4, 5), udxMat(0x1A1420, null, { basic: 1, op: 0.75, ds: 1 }), K.W / 2 - 1.24, K.D * 0.4, 1.7, K.ryL);
hand.userData.keep = 1;
dwAnim(K.A, function (t) { var s = 0.7 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.6)); hand.scale.set(s, s, 1); });
var mir = dwMesh(K, new THREE.PlaneGeometry(1, 1.8), udxMat(0xC8D8F0, null, { basic: 1, op: 0.55, ds: 1 }), -K.W / 2 + 0.4, K.D * 0.75, 1.4, K.ryR);
K.at("candles", -1.4, K.D - 1.2, K.ryIn, { solid: false });
K.at("candles", 1.4, K.D - 1.2, K.ryIn, { solid: false });
},
function (K) {
UDX_KITS.classroom(K);
var r = dwFloorRing(K, 0, K.D * 0.62, 1.5, 1.7, 0xE070A8, 0.5, 7);
dwAnim(K.A, function (t) { r.rotation.z = t * 0.08; });
["♛", "✣", "✶", "⚔", "✧", "⚖", "❦"].forEach(function (ch, i) {
var tx = dwSigilTex(ch, "#F0A8D8");
if (!tx)
return;
var a = -K.W / 2 + 1.2 + i * (K.W - 2.4) / 6, m = dwMesh(K, new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false, side: THREE.DoubleSide }), a, 0.32, 3.0, K.ryIn);
m.userData.keep = 1;
});
K.glow(0, K.D * 0.62, 0.6, 0xE070A8, 2.2);
},
function (K) {
UDX_KITS.classroom(K);
var cols = [0x7AF0A0, 0xF0A040, 0x80C8FF, 0xE070E0];
[[-K.W / 2 + 1.4, K.D * 0.35], [-K.W / 2 + 1.4, K.D * 0.7]].forEach(function (q, i) {
dwCase(K, q[0], q[1], function (a, b) {
for (var j = 0; j < 3; j++) {
var m = dwMesh(K, new THREE.OctahedronGeometry(0.16, 0), udxMat(cols[(i * 2 + j) % 4], null, { basic: 1 }), a - 0.4 + j * 0.4, b, 1.12);
m.rotation.set(j, 0.4 * j, 0.2);
}
K.glow(a, b, 1.2, cols[i * 2], 1.6);
});
});
var orb = dwMesh(K, new THREE.SphereGeometry(0.22, 12, 10), udxMat(0x9A70FF, null, { basic: 1, op: 0.85 }), 0, K.D * 0.55, 2.6);
orb.userData.keep = 1;
dwAnim(K.A, function (t) { orb.position.y = K.y + 2.6 + Math.sin(t * 0.7) * 0.15; });
},
function (K) {
UDX_KITS.classroom(K);
dwCase(K, 0, K.D * 0.72, function (a, b) { for (var i = 0; i < 7; i++) {
dwMesh(K, new THREE.ConeGeometry(0.06, 0.4, 6), udxMat(0x8A7A9A), a - 0.5 + i * 0.17, b, 1.25, 0).rotation.x = Math.PI;
dwMesh(K, new THREE.ConeGeometry(0.06, 0.3, 6), udxMat(0x7A6A8A), a - 0.45 + i * 0.15, b + 0.15, 0.97);
} });
K.hangR("painting", K.D * 0.4, 1.6, { s: 1.6 });
K.left("esbookcase", K.D * 0.4);
},
function (K) {
UDX_KITS.classroom(K);
var p = K.pt(K.W / 2 - 1.6, 1.6), web = new THREE.Group();
web.position.set(p[0], K.y + 2.6, p[1]);
web.rotation.y = K.ryIn;
var silk = new THREE.LineBasicMaterial({ color: 0xE8E8F8, transparent: true, opacity: 0.55 });
var pts = [];
for (var s = 0; s < 8; s++) {
var an = s / 8 * Math.PI * 2;
pts.push(0, 0, 0, Math.cos(an) * 1.5, Math.sin(an) * 1.5, 0);
}
for (var r = 0.3; r < 1.5; r += 0.3)
for (var s2 = 0; s2 < 8; s2++) {
var a1 = s2 / 8 * Math.PI * 2, a2 = (s2 + 1) / 8 * Math.PI * 2;
pts.push(Math.cos(a1) * r, Math.sin(a1) * r, 0, Math.cos(a2) * r, Math.sin(a2) * r, 0);
}
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
web.add(new THREE.LineSegments(lg, silk));
K.A.g.add(web);
K.right("loom", K.D * 0.6);
K.at("displaycase", -K.W / 2 + 1.2, K.D - 1.4, K.ryR);
for (var j = 0; j < 6; j++)
dwMesh(K, new THREE.CylinderGeometry(0.08, 0.08, 0.22, 8), udxMat([0x6AE070, 0xE0D040, 0xB070E0][j % 3], null, { basic: 1, op: 0.8 }), -1.5 + j * 0.6, K.D - 0.6, 1.0);
},
function (K) {
var lite = UDX.lite, soil = udxMat(0x2A2018), rim = udxMat(0x3A3440, "stone");
var spots = [[-K.W * 0.3, K.D * 0.3], [0, K.D * 0.3], [K.W * 0.3, K.D * 0.3], [-K.W * 0.18, K.D * 0.68], [K.W * 0.18, K.D * 0.68]];
DW_BEDS.forEach(function (bd, i) {
var a = spots[i][0], b = spots[i][1], glow = bd[1] === "glowcap";
dwMesh(K, new THREE.BoxGeometry(3.2, 0.45, 1.8), rim, a, b, 0.22, K.ryIn);
dwMesh(K, new THREE.BoxGeometry(3, 0.06, 1.6), soil, a, b, 0.46, K.ryIn);
dwSolid(K, a, b, 1.6, 0.9, 0.5);
var n = lite ? 7 : 16, stem = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.03, 0.04, 0.22, 5), udxMat(0xD8D0C8), n), cap = new THREE.InstancedMesh(glow ? new THREE.SphereGeometry(0.11, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2) : new THREE.SphereGeometry(0.12, 6, 4), udxMat(glow ? 0xB890FF : 0xE8F0F0, null, glow ? { basic: 1 } : {}), n), o3 = new THREE.Object3D();
for (var j = 0; j < n; j++) {
var u = ((j * 7919 + i * 131) % 1000) / 1000 - 0.5, v = ((j * 104729 + i * 17) % 1000) / 1000 - 0.5, q = K.pt(a + u * 2.8, b + v * 1.4), s = 0.7 + ((j * 31) % 10) / 14;
o3.position.set(q[0], K.y + 0.58 * 1, q[1]);
o3.scale.set(s, s, s);
o3.updateMatrix();
stem.setMatrixAt(j, o3.matrix);
o3.position.y = K.y + (glow ? 0.68 : 0.52);
o3.scale.set(s, glow ? s * 0.8 : 0.35, s);
o3.updateMatrix();
cap.setMatrixAt(j, o3.matrix);
}
stem.instanceMatrix.needsUpdate = true;
cap.instanceMatrix.needsUpdate = true;
if (glow)
K.A.g.add(stem);
K.A.g.add(cap);
K.glow(a, b, 0.9, glow ? 0xB890FF : 0xD8F0F0, glow ? 2.4 : 1.4);
var sp = K.pt(a, b + 0.95);
udxSign(K.A.g, [SPB_HERBS[bd[1]].name + ", bed " + (i + 1)], 1.3, 0.3, sp[0], K.y + 0.7, sp[1], K.ryOut, "#141018", "#D8C8FF");
});
var pool = dwMesh(K, new THREE.CircleGeometry(1.2, 24), udxMat(0x2A4A6A, null, { e: 0x0A1A2A, ei: 0.6 }), K.W / 2 - 2, K.D - 2, 0.05);
pool.rotation.x = -Math.PI / 2;
K.at("bucket", -K.W / 2 + 1, K.D - 1, K.ryIn, { solid: false });
K.wall("herbrack", 0);
},
function (K) {
var frame = udxMat(0x3A2A4A, "wood"), glass = udxMat(0xB8C8E8, null, { basic: 1, op: 0.42, ds: 1 }), shade = udxMat(0x140E1C, null, { basic: 1, op: 0.5, ds: 1 });
var n = Math.max(2, Math.floor((K.D - 2) / 2.4)), shades = [];
for (var i = 0; i < n; i++) {
var b = 1.4 + i * 2.4;
[[-K.W / 2 + 0.3, K.ryR], [K.W / 2 - 0.3, K.ryL]].forEach(function (q) {
dwMesh(K, new THREE.BoxGeometry(1.4, 2.8, 0.12), frame, q[0], b, 1.5, q[1]);
var gl = dwMesh(K, new THREE.PlaneGeometry(1.2, 2.6), glass, q[0] + (q[0] < 0 ? 0.08 : -0.08), b, 1.5, q[1]);
var sh = dwMesh(K, new THREE.PlaneGeometry(0.5, 1.6), shade, q[0] + (q[0] < 0 ? 0.1 : -0.1), b, 1.1, q[1]);
sh.userData.keep = 1;
shades.push(sh);
});
}
dwAnim(K.A, function (t) { shades.forEach(function (s, i) { s.scale.x = 0.85 + 0.15 * Math.sin(t * 0.5 + i); }); });
K.rug("redrunner", 0, K.D * 0.5, { s: Math.min(1, (K.D - 1) / 20) });
K.wall("lectern", 0);
K.glow(0, K.D * 0.5, K.h - 1, 0xB070E8, 3);
},
function (K) {
UDX_KITS.ritual(K);
var gl = [];
["ᛉ", "ᛟ", "ᚱ", "ᛗ", "ᚷ", "ᚠ"].forEach(function (ch, i) {
var tx = dwSigilTex(ch, "#F0A8D8");
if (!tx)
return;
var an = i / 6 * Math.PI * 2;
var m = dwMesh(K, new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false, side: THREE.DoubleSide }), Math.cos(an) * 3.8, K.D * 0.5 + Math.sin(an) * 3.8, 1.6);
m.userData.keep = 1;
gl.push(m);
});
dwAnim(K.A, function (t) { gl.forEach(function (m, i) { m.rotation.y = t * 0.4 + i; m.position.y = K.y + 1.6 + Math.sin(t * 0.8 + i) * 0.12; }); });
},
function (K) {
var stone = udxMat(0x5A5260, "stone"), st = [];
for (var i = 0; i < 7; i++) {
var an = i / 7 * Math.PI * 2, a = Math.cos(an) * 3.4, b = K.D * 0.5 + Math.sin(an) * 3.4;
dwMesh(K, new THREE.BoxGeometry(0.8, 2.2 + (i % 3) * 0.4, 0.5), stone, a, b, 1.1 + (i % 3) * 0.2, an);
dwSolid(K, a, b, 0.45, 0.45, 2.6);
st.push(K.glow(a, b, 2.6 + (i % 3) * 0.4, 0xC8A070, 1.2));
}
K.wall("lectern", 0);
K.runL("benchin", 2);
K.runR("benchin", 2);
},
function (K) {
var beasts = [["spider", 0.9], ["cat", 0.5], ["bird", 0.5], ["creature", 1.2]];
beasts.forEach(function (q, i) {
var a = (i % 2 ? 1 : -1) * (K.W / 2 - 1.6), b = 2 + Math.floor(i / 2) * (K.D - 4) / 1;
dwCase(K, a, b, function (aa, bb) { dwBuild(K, q[0], aa, bb, q[1], K.ryIn + (aa < 0 ? Math.PI / 2 : -Math.PI / 2), 0.92); K.glow(aa, bb, 1.4, 0x9AC8FF, 1.6); });
});
K.wall("esbookcase", -1.4);
K.wall("esbookcase", 1.4);
K.at("lectern", 0, K.D * 0.5);
},
function (K) {
var rim = udxMat(0x3A3440, "stone");
dwMesh(K, new THREE.CylinderGeometry(1.6, 1.7, 0.8, 24), rim, 0, K.D * 0.5, 0.4);
dwSolid(K, 0, K.D * 0.5, 1.6, 1.6, 0.9);
var ink = dwMesh(K, new THREE.CircleGeometry(1.45, 32), udxMat(0x0A0612, null, { basic: 1 }), 0, K.D * 0.5, 0.82);
ink.rotation.x = -Math.PI / 2;
var sw = dwFloorRing(K, 0, K.D * 0.5, 0.4, 1.3, 0x6A40A0, 0.35, 32);
sw.position.y = K.y + 0.84;
dwAnim(K.A, function (t) { sw.rotation.z = t * 0.25; });
for (var i = 0; i < 8; i++) {
var an = i / 8 * Math.PI * 2, q = K.pt(Math.cos(an) * 2.6, K.D * 0.5 + Math.sin(an) * 2.6);
udxF(K.A, "candles", q[0], K.y, q[1], 0, { solid: false });
}
K.glow(0, K.D * 0.5, 1.4, 0x8A60D0, 3);
},
function (K) {
var n = UDX.lite ? 3 : 5;
for (var i = 0; i < n; i++) {
var a = (i - (n - 1) / 2) * (K.W - 3) / Math.max(1, n - 1), p = K.pt(a, 1.6);
if (typeof spbDummy === "function")
spbDummy(K.A.g, p[0], K.y, p[1], K.ryOut);
}
dwMesh(K, new THREE.BoxGeometry(K.W - 2, 0.02, 0.2), udxMat(0xE8B8F8, null, { basic: 1, op: 0.7 }), 0, K.D * 0.5, 0.02, K.ryIn);
K.runL("benchin", 2);
K.runR("benchin", 2);
K.glow(0, 2, K.h - 1.4, 0xFFC890, 4);
K.glow(0, K.D * 0.6, K.h - 1.4, 0xE070E0, 3);
},
function () {
var known = SPB_SPELLS.filter(function (p) { return spbKnows(p.s); }).map(function (p) { return p.i + " " + esc(p.n); });
worldCard("<div style='font:600 18px var(--serif,Georgia);color:#F0D8FF'>The Proving Cavern</div><div style='opacity:.75;font-size:13px;margin-bottom:6px'>Cast at the straw dummies along the far wall: they shake, glow and keep count. Nobody here is hurt.</div>" +
"<p style='margin:6px 0'>Strike the dummies with the dark arts: Shadow Strike, the Hex of Withering, Soul Drain, Earthrend down the line of them, Venom Web, Dread, a Veil of Night, and a wraith to hunt them.</p>" +
"<p style='margin:6px 0;opacity:.85'>" + (known.length ? "Spells you know: " + known.join(" · ") : "You know no spells yet. Every classroom upstairs teaches one.") + "</p>" +
"<p style='margin:6px 0;opacity:.75;font-size:12.5px'>Open your spells with ✨ Spells on the power bar.</p>", {});
},
function (r) {
if (!r.beds)
return "";
var S = spbStore(), h = '<div class="item"><b>🌿 The beds</b> <span class="dim">(gathered, never sold)</span>';
r.beds.forEach(function (k, i) {
var id = r.id + i, H = SPB_HERBS[k], ok = spbBedReady(id), left = Math.max(0, Math.ceil(((S.beds[id] || 0) - Date.now()) / 60000));
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px"><span>' + H.icon + ' ' + esc(H.name) + ', bed ' + (i + 1) + '</span>' +
(ok ? '<button class="btn" data-spbgather="' + id + '|' + k + '">Gather</button>' : '<span class="dim" style="font-size:12px">grows back in ' + left + ' min</span>') + '</div>';
});
return h + '<div class="dim" style="font-size:12px;margin-top:4px">You carry ' + r.beds.filter(function (k, i) { return r.beds.indexOf(k) === i; }).map(function (k) { return (S.herb[k] || 0) + ' ' + SPB_HERBS[k].name.toLowerCase(); }).join(', ') + '.</div></div>';
},
function () {
var h = '<div class="item"><b>Where each is taught</b>';
function line(q, where) {
return '<div style="margin-top:3px"><span style="color:#D8C8FF">' + esc(q.name.replace(/, the Duskwell Academy$/, "")) + '</span> <span class="dim">(' + where + ')</span><br><span class="dim" style="font-size:12px">' +
q.subj.map(function (s) { return (acLearned(s) ? "✓ " : "") + esc(s) + (SPB_BY[s] ? " · " + esc(SPB_BY[s].n) : ""); }).join(" · ") + '</span></div>';
}
AC_ROOMS.filter(function (q) { return q.subj && !q.wing && !q.grounds && !q.dusk; }).forEach(function (q) {
h += line(q, q.up ? "up the grand staircase" : q.down ? "down the dungeon steps" : (q.x1 <= -22 ? "off the West Gallery" : "off the East Gallery"));
});
h += '<div style="margin-top:8px;color:#C8B0FF;font-size:12px">The Spellwright Wing: through the glowing arch at the end of the West Gallery</div>';
AC_ROOMS.filter(function (q) { return q.subj && q.wing; }).forEach(function (q) { h += line(q, q.x1 <= 0 ? "left of the Spellwrights' Hall" : "right of the Spellwrights' Hall"); });
h += '<div style="margin-top:8px;color:#C8F0B0;font-size:12px">The Academy Grounds: through the glowing arch at the end of the East Gallery</div>';
AC_ROOMS.filter(function (q) { return q.subj && q.grounds; }).forEach(function (q) { h += line(q, q.x1 <= 0 ? "left of the Glass Walk" : "right of the Glass Walk"); });
h += '<div style="margin-top:8px;color:#E8B8F8;font-size:12px">The Duskwell Academy of the Deep Arts, in Zhaelvorn under the Underdark</div>';
AC_ROOMS.filter(function (q) { return q.subj && q.dusk; }).forEach(function (q) { h += line(q, "with " + q.teach); });
return h + '</div>';
},
function (f, each, n, every, col, hold) {
var last = { x: f.x, z: f.z, o: f.o, id: f.id, kind: f.kind }, i = 0;
(function step() {
if (i++ >= n)
return;
var o = spbFind(last);
if (!o)
return;
last.x = o.x;
last.z = o.z;
try {
o.hit(each);
if (hold && !spbIsPvp(o))
o.hold(hold);
}
catch (e) { }
spbBurst(o.x, (o.y || spbFeetY()) - 0.4, o.z, col, 14, [0.4, 1.2, 0.4], 0.9, "rise", 0.16);
setTimeout(step, every * 1000);
})();
},
function (to, col, life) {
var P = spbP(), a = new THREE.Vector3(P.x, spbFeetY() + 1.25, P.z), b = new THREE.Vector3(to.x, (to.y || spbFeetY() + 1), to.z), d = b.clone().sub(a), L = d.length();
var m = spbMat(col, 0.75, { add: 1 }), beam = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, L, 8, 1, true), m);
beam.position.copy(a).add(b).multiplyScalar(0.5);
beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
spbAdd(beam, life || 0.6, function (F, k) { m.opacity = 0.75 * (1 - k); });
},
function () {
var o = spbAimed(20, 0.6) || spbFoes(20)[0];
if (!o) {
spbSay("<b>Shadow Strike</b> needs a foe within 20 m to strike.");
return false;
}
var P = spbP(), y = spbFeetY(), x0 = P.x, z0 = P.z, dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz) || 1, ux = dx / d, uz = dz / d;
spbBurst(x0, y, z0, 0x2A1A3A, 60, [0.6, 2, 0.6], 1.1, "rise", 0.3);
var go = Math.max(0, d + 1.2), n = Math.ceil(go / 0.5);
if (typeof RAP !== "undefined")
RAP.noMult = true;
try {
for (var i = 0; i < n; i++) {
var bx = P.x, bz = P.z;
walkBy(ux * 0.5, uz * 0.5);
if (P.x === bx && P.z === bz)
break;
}
}
catch (e) { }
finally {
if (typeof RAP !== "undefined")
RAP.noMult = false;
}
var near = Math.hypot(o.x - P.x, o.z - P.z);
if (near > 3.2) {
spbSay("<b>Shadow Strike.</b> Something solid stands between you and " + spbNamed(o) + ".");
return true;
}
yaw = Math.atan2(-(o.x - P.x), -(o.z - P.z));
try {
o.hit(spbPvpOr(o, 20, 22));
}
catch (e) { }
spbBurst(o.x, (o.y || y + 1) - 0.3, o.z, 0x6A2A8A, 50, [0.5, 1.4, 0.5], 1, "swirl", 0.22);
spbTone(160, 0.25);
spbFoes(40).forEach(function (q) { if (q.o && q.o.F) {
q.o.F.tgt = null;
q.o.F.tAt = (typeof BW !== "undefined" ? BW.t : 0) + 1.2;
} });
spbSay("<b>Shadow Strike.</b> You come out of the dark at the back of " + spbNamed(o) + " and strike.");
},
function () {
var F = spbFeet(), n = 0;
SPB.buf.veil = SPB.t + 8;
var g = new THREE.Group();
g.position.set(F.x, F.y, F.z);
var dome = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), spbMat(0x06040C, 0.0, { ds: 1 }));
g.add(dome);
var floor = new THREE.Mesh(new THREE.CircleGeometry(6, 32), spbMat(0x0A0614, 0.0));
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0.05;
g.add(floor);
spbAdd(g, 8, function (E, k) { var a = k < 0.1 ? k / 0.1 : k > 0.85 ? (1 - k) / 0.15 : 1; dome.material.opacity = 0.55 * a; floor.material.opacity = 0.8 * a; });
spbFoes(6).forEach(function (o) { try {
o.hit(spbPvpOr(o, 8, 6));
o.hold(2);
if (o.o && o.o.F) {
o.o.F.tgt = null;
}
n++;
}
catch (e) { } });
spbTone(110, 0.5);
spbSay("<b>Veil of Night.</b> Darkness pours out round you: for 8 seconds nothing can see you" + (n ? ", and " + n + " caught in it " + (n > 1 ? "are" : "is") + " blinded." : "."));
},
function () {
var o = spbAimed(22, 0.55);
if (!o) {
spbSay("<b>Hex of Withering</b> needs a foe in front of you (up to 22 m).");
return false;
}
spbBeam(o, 0x6AE04A, 0.7);
try {
o.hit(spbPvpOr(o, 6, 6));
}
catch (e) { }
spbDot(o, 6, 5, 2, 0x5AC83A, 2);
spbTone(140, 0.5);
spbSay("<b>Hex of Withering.</b> The curse takes " + spbNamed(o) + ": it withers for 10 seconds.");
},
function () {
var F = spbFeet(), n = 0;
spbRing(F.x, F.y + 0.1, F.z, 0x3A0A2A, 12, 1.4);
spbBurst(F.x, F.y + 1, F.z, 0x4A1A4A, 70, [4, 1.6, 4], 1.3, "swirl", 0.3);
spbFoes(12).forEach(function (o) {
try {
o.hit(spbPvpOr(o, 12, 8));
if (!spbIsPvp(o)) {
o.calm(5);
var dx = o.x - F.x, dz = o.z - F.z;
o.push(dx, dz, 4);
}
n++;
}
catch (e) { }
});
spbTone(70, 0.8);
spbSay("<b>Dread.</b> " + (n ? n + " " + (n > 1 ? "foes feel" : "foe feels") + " the dark look out of your eyes" + ", and run." : "The dark looks out of your eyes, but nothing is near."));
},
function () {
var o = spbAimed(22, 0.55);
if (!o) {
spbSay("<b>Soul Drain</b> needs a foe in front of you (up to 22 m).");
return false;
}
spbBeam(o, 0xC02040, 0.9);
try {
o.hit(16);
}
catch (e) { }
var healed = spbMend(16);
var F = spbFeet();
spbBurst(F.x, F.y + 1, F.z, 0xC02040, 30, [0.5, 1.4, 0.5], 1, "rise", 0.18);
spbTone(180, 0.4);
spbSay("<b>Soul Drain.</b> You tear the strength out of " + spbNamed(o) + (healed ? " and it flows into you (+16)." : "."));
},
function () {
var P = spbP(), f = spbFwd(), y = spbFeetY(), hit = [];
var spikes = new THREE.Group(), mat = new THREE.MeshLambertMaterial({ color: 0x5A5048 });
for (var i = 1; i <= (spbLite() ? 7 : 12); i++) {
var t = i / (spbLite() ? 7 : 12) * 14, c = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.8, 6), mat);
c.position.set(P.x + f.x * t + (i % 2 ? 0.4 : -0.4) * f.z, y - 1.8, P.z + f.z * t - (i % 2 ? 0.4 : -0.4) * f.x);
c.userData.d = t;
spikes.add(c);
}
spbAdd(spikes, 2.2, function (E, k) {
spikes.children.forEach(function (c) {
var s = Math.max(0, Math.min(1, (k * 2.2 * 8 - c.userData.d * 0.5)));
c.position.y = y - 1.8 + 1.9 * Math.min(1, s) - (k > 0.75 ? (k - 0.75) / 0.25 * 1.9 : 0);
});
});
spbFoes(16).forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z, along = dx * f.x + dz * f.z, side = Math.abs(dx * f.z - dz * f.x);
if ((along > 0 && along <= 14.5 && side <= 2.2) || o.d < 3)
hit.push(o);
});
hit.forEach(function (o) { try {
o.hit(22);
o.hold(2);
o.push(o.x - P.x, o.z - P.z, 1.5);
}
catch (e) { } });
spbBurst(P.x + f.x * 7, y, P.z + f.z * 7, 0x8A7A60, 80, [2, 0.8, 7], 1.3, "rise", 0.3);
if (!(typeof VRM !== "undefined" && VRM && VRM.xr))
SPB.shake = 0.5;
spbTone(80, 0.6);
spbSay("<b>Earthrend.</b> The stone bursts open ahead of you" + (hit.length ? " and throws " + hit.length + " down." : "."));
},
function () {
if (SPB.wraith)
spbWraithEnd(true);
var F = spbFeet(), g = new THREE.Group(), m = spbMat(0x8A9AB8, 0.5, { ds: 1 });
var body = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.9, 10, 1, true), m);
body.position.y = 1.05;
body.rotation.x = Math.PI;
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), m);
head.position.y = 2.15;
g.add(head);
[-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.9, 6), m); a.position.set(s * 0.4, 1.5, 0.1); a.rotation.z = s * 1.1; g.add(a); });
[-0.08, 0.08].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), spbMat(0xC0E8FF, 0.9)); e.position.set(x, 2.18, 0.19); g.add(e); });
var halo = spbGlow(0x6A7A9A, 2.6, 0.3);
halo.position.y = 1.3;
g.add(halo);
g.position.set(F.x + 1.2, F.y, F.z);
scene.add(g);
SPB.wraith = { g: g, until: SPB.t + 20, next: SPB.t + 0.8, y: F.y };
spbBurst(F.x + 1.2, F.y, F.z, 0x6A7A9A, 60, [0.6, 2, 0.6], 1.3, "rise", 0.3);
spbTone(120, 0.7);
spbSay("<b>Summon Wraith.</b> A wraith rises out of the dark beside you. For 20 seconds it hunts your foes.");
},
function () {
var o = spbAimed(18, 0.5);
if (!o) {
spbSay("<b>Polymorph</b> needs a foe in front of you (up to 18 m).");
return false;
}
spbBeam(o, 0x7AE07A, 0.6);
if (spbIsPvp(o)) {
try {
o.hit(12);
}
catch (e) { }
spbSay("<b>Polymorph.</b> " + spbNamed(o) + " twists half into a toad and back: a hard blow.");
spbTone(500, 0.3);
return true;
}
try {
o.hold(6);
o.calm(6);
}
catch (e) { }
var toad = new THREE.Group(), gm = new THREE.MeshLambertMaterial({ color: 0x5A9A3A });
var b = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8), gm);
b.scale.set(1, 0.6, 1.15);
b.position.y = 0.25;
toad.add(b);
[-0.14, 0.14].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), gm); e.position.set(x, 0.48, 0.25); toad.add(e); });
var base = o.y !== undefined ? o.y - 1.1 : spbFeetY();
toad.position.set(o.x, base + 2.2, o.z);
spbAdd(toad, 6, function (E, k) { toad.position.y = base + 2.2 + Math.abs(Math.sin(k * 30)) * 0.2; });
spbBurst(o.x, base + 1, o.z, 0x7AE07A, 40, [0.6, 1.6, 0.6], 1, "swirl", 0.2);
spbTone(520, 0.3);
spbSay("<b>Polymorph.</b> " + spbNamed(o) + " is a toad for 6 seconds: it cannot fight or chase you.");
},
function () {
var P = spbP(), f = spbFwd(), o = spbAimed(30, 0.5), at = o ? { x: o.x, z: o.z } : { x: P.x + f.x * 14, z: P.z + f.z * 14 }, y = spbFeetY();
for (var i = 0; i < 5; i++)
(function (i) {
var s = spbGlow(0xFFE8B0, 1.4, 0.85), ox = Math.cos(i * 1.3) * 2.2 * (i ? 1 : 0), oz = Math.sin(i * 1.3) * 2.2 * (i ? 1 : 0), sy = y + 26;
s.position.set(at.x + ox + 6, sy, at.z + oz - 4);
spbAdd(s, 0.9 + i * 0.12, function (E, k) { s.position.set(at.x + ox + 6 * (1 - k), sy - (sy - y - 0.3) * k, at.z + oz - 4 * (1 - k)); s.material.opacity = 0.85 * (k > 0.9 ? (1 - k) / 0.1 : 1); });
})(i);
setTimeout(function () {
var n = 0;
spbFoes(60).forEach(function (q) { if (Math.hypot(q.x - at.x, q.z - at.z) <= 5) {
try {
q.hit(24);
q.hold(1);
q.push(q.x - at.x, q.z - at.z, 1.2);
n++;
}
catch (e) { }
} });
spbBurst(at.x, y, at.z, 0xFFD890, 90, [4, 1.2, 4], 1.4, "rise", 0.3);
spbRing(at.x, y + 0.1, at.z, 0xFFE0A0, 5, 1.2);
spbTone(90, 0.5);
if (n)
spbSay("<b>Starfall</b> strikes " + n + " " + (n > 1 ? "foes" : "foe") + ".");
}, 950);
spbTone(880, 0.3);
spbSay("<b>Starfall.</b> Stars are falling on " + (o ? spbNamed(o) : "the ground ahead") + ".");
},
function (force) {
if (!actIn())
return Promise.resolve(null);
if (ACT.loading)
return ACT.loading;
if (!force && Date.now() - ACT.at < 120000)
return Promise.resolve(ACT.st);
ACT.loading = cityRpc("academy_tuition", {}).then(function (o) { ACT.loading = null; ACT.at = Date.now(); ACT.st = o && o.ok ? o : null; return ACT.st; })
.catch(function () { ACT.loading = null; ACT.at = Date.now(); ACT.st = null; return null; });
return ACT.loading;
},
function (subject, say) {
var k = actSchool(subject), S = ACT.st, fee = actFee(k), el = ACT.el;
if (!el) {
el = ACT.el = document.createElement("div");
el.id = "ac-tuition";
el.style.cssText = "position:fixed;inset:0;z-index:9001;display:none;align-items:center;justify-content:center;background:rgba(6,4,14,.72);padding:16px";
document.body.appendChild(el);
}
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var col = k === "duskwell" ? "#E070E0" : "#8A6AE8", h = '<div style="width:min(460px,100%);background:#120E1E;border:1px solid ' + col + ';border-radius:6px;padding:18px 20px;color:var(--bone,#eee);font:14px var(--sans,sans-serif);line-height:1.55">' +
'<div style="font:12px var(--sans);color:' + col + ';letter-spacing:.08em;text-transform:uppercase">Tuition · ' + esc(actName(k)) + '</div>';
if (!actIn()) {
h += '<p style="margin:10px 0 14px">Lessons here are for students who have paid their tuition. Sign in to Somnucor, and come back to enrol.</p><div class="row"><button class="btn" data-actx="1">Close</button></div>';
}
else if (S && S.young && !S.young_free) {
h += '<p style="margin:10px 0 14px">Lessons here are for dreamers aged 18 and over.</p><div class="row"><button class="btn" data-actx="1">Close</button></div>';
}
else {
h += '<h3 style="margin:8px 0 4px;font:600 20px Georgia,serif;color:#F4ECD8">' + esc(acTitle(subject)) + ' is taught to students</h3>' +
'<p style="margin:0 0 6px">Tuition at ' + esc(actName(k)) + ' is <b>' + fee.toLocaleString() + ' gold</b>, ' + actTerm() + '. Once you are a student, every lesson here is open to you.</p>' +
'<p class="dim" style="color:var(--dim,#999);margin:0 0 12px;font-size:12.5px">Spells you have already learned stay yours.</p>' +
(say ? '<p style="color:#E8A07A;margin:0 0 10px">' + esc(say) + '</p>' : '') +
'<div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" data-actp="' + esc(subject) + '"' + (ACT.busy ? ' disabled' : '') + '>Pay ' + fee.toLocaleString() + ' gold and enrol</button><button class="btn" data-actx="1">Not now</button></div>';
}
el.innerHTML = h + '</div>';
el.style.display = "flex";
},
function (k) {
if (acKeeper())
return '<div class="dim" style="font-size:12px;margin-top:4px">🎓 Tuition: the Keeper studies free.</div>';
var S = ACT.st;
if (!S)
return "";
if (S.open && S.open[k]) {
var u = S.until && S.until[k];
return '<div style="font-size:12px;margin-top:4px;color:#9AE8A0">🎓 You are a student of ' + esc(actName(k)) + (u ? ' until ' + esc(new Date(u).toLocaleDateString()) : '') + '.</div>';
}
if (S.young && !S.young_free)
return '<div class="dim" style="font-size:12px;margin-top:4px">🎓 Lessons here are for dreamers aged 18 and over.</div>';
return '<div style="font-size:12px;margin-top:4px;color:#E8C07A">🎓 Tuition: ' + actFee(k).toLocaleString() + ' gold, ' + actTerm() + '. Pay it when you take your first lesson.</div>';
}
];
});
