/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(225, function () {
"use strict";
return [
function (g, m, side, x, y, z, w, d, shape) {
var hinge = new THREE.Group();
hinge.position.set(x, y, z);
var sh = new THREE.Shape();
if (shape === "moth") {
sh.moveTo(0, 0);
sh.bezierCurveTo(w * 0.3, d * 0.9, w * 0.9, d * 0.8, w, d * 0.2);
sh.bezierCurveTo(w * 0.9, -d * 0.6, w * 0.4, -d * 0.9, 0, -d * 0.2);
}
else if (shape === "bat") {
sh.moveTo(0, d * 0.3);
sh.lineTo(w * 0.5, d * 0.6);
sh.lineTo(w, d * 0.1);
sh.quadraticCurveTo(w * 0.8, -d * 0.15, w * 0.68, -d * 0.35);
sh.quadraticCurveTo(w * 0.5, -d * 0.2, w * 0.4, -d * 0.5);
sh.quadraticCurveTo(w * 0.25, -d * 0.25, 0, -d * 0.4);
}
else {
sh.moveTo(0, d * 0.3);
sh.quadraticCurveTo(w * 0.6, d * 0.5, w, 0);
sh.quadraticCurveTo(w * 0.7, -d * 0.5, 0, -d * 0.4);
}
var geo = new THREE.ShapeGeometry(sh);
geo.rotateX(-Math.PI / 2);
var mesh = new THREE.Mesh(geo, m);
if (side < 0)
mesh.scale.x = -1;
hinge.add(mesh);
hinge.userData.side = side;
g.add(hinge);
(g.userData.wings = g.userData.wings || []).push(hinge);
return hinge;
},
function (kind, colour) {
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
g.userData.body = body;
var col = colour || "#A07850", m = ptMat(col), dk = ptMat(ptShade(col, 0.62)), lt = ptMat(new THREE.Color(col).lerp(new THREE.Color(0xF4EEE4), 0.6)), nose = ptMat(0x1A1414);
g.userData.legs = null;
var b = body;
if (kind === "dog") {
b.add(ptBall(m, 0.2, 0.95, 0.9, 1.7, 0, 0.42, 0));
b.add(ptBall(lt, 0.15, 0.9, 0.9, 1.2, 0, 0.36, 0.14));
b.add(ptBall(m, 0.15, 1, 1, 1.05, 0, 0.62, 0.36));
b.add(ptBall(lt, 0.08, 0.9, 0.75, 1.3, 0, 0.58, 0.5));
b.add(ptBall(nose, 0.03, 1.2, 1, 1, 0, 0.6, 0.6));
ptEyes(b, 0.06, 0.68, 0.47, 0.022);
b.add(ptBall(dk, 0.07, 0.45, 1.3, 0.9, -0.13, 0.6, 0.32));
b.add(ptBall(dk, 0.07, 0.45, 1.3, 0.9, 0.13, 0.6, 0.32));
var t = ptRod(m, 0.03, 0.26, 0, 0.56, -0.38, -0.7);
b.add(t);
g.userData.tail = t;
ptLeg(g, m, -0.1, 0.32, 0.2, 0.3, 0.045, dk);
ptLeg(g, m, 0.1, 0.32, 0.2, 0.3, 0.045, dk);
ptLeg(g, m, -0.1, 0.32, -0.2, 0.3, 0.045, dk);
ptLeg(g, m, 0.1, 0.32, -0.2, 0.3, 0.045, dk);
}
else if (kind === "cat") {
b.add(ptBall(m, 0.14, 0.9, 0.95, 1.75, 0, 0.3, 0));
b.add(ptBall(m, 0.11, 1, 0.95, 0.95, 0, 0.47, 0.24));
b.add(ptBall(lt, 0.05, 1.2, 0.8, 0.8, 0, 0.43, 0.33));
b.add(ptCone(m, 0.04, 0.09, -0.06, 0.58, 0.23));
b.add(ptCone(m, 0.04, 0.09, 0.06, 0.58, 0.23));
b.add(ptBall(ptMat(0xD88A8A), 0.012, 1, 1, 1, 0, 0.45, 0.355));
ptEyes(b, 0.045, 0.5, 0.32, 0.018, 0x5AA040);
var t2 = ptRod(m, 0.022, 0.38, 0, 0.44, -0.3, -0.45);
b.add(t2);
g.userData.tail = t2;
ptLeg(g, m, -0.07, 0.22, 0.14, 0.22, 0.03, m);
ptLeg(g, m, 0.07, 0.22, 0.14, 0.22, 0.03, m);
ptLeg(g, m, -0.07, 0.22, -0.14, 0.22, 0.03, m);
ptLeg(g, m, 0.07, 0.22, -0.14, 0.22, 0.03, m);
}
else if (kind === "fox") {
var wh = ptMat(0xF2ECE2), blk = ptMat(0x221C18);
b.add(ptBall(m, 0.16, 0.9, 0.85, 1.75, 0, 0.36, 0));
b.add(ptBall(wh, 0.11, 0.85, 0.8, 1.0, 0, 0.32, 0.17));
b.add(ptBall(m, 0.12, 1, 0.95, 1, 0, 0.52, 0.3));
b.add(ptCone(wh, 0.05, 0.14, 0, 0.49, 0.44, Math.PI / 2));
b.add(ptBall(nose, 0.022, 1, 1, 1, 0, 0.5, 0.51));
b.add(ptCone(m, 0.05, 0.12, -0.07, 0.66, 0.28));
b.add(ptCone(m, 0.05, 0.12, 0.07, 0.66, 0.28));
ptEyes(b, 0.05, 0.56, 0.39, 0.018);
var tg = new THREE.Group();
tg.position.set(0, 0.4, -0.26);
tg.add(ptBall(m, 0.09, 0.9, 0.9, 2.3, 0, 0, -0.17));
tg.add(ptBall(wh, 0.06, 0.9, 0.9, 1.2, 0, -0.01, -0.37));
tg.rotation.x = -0.3;
b.add(tg);
g.userData.tail = tg;
ptLeg(g, blk, -0.08, 0.28, 0.17, 0.27, 0.035, blk);
ptLeg(g, blk, 0.08, 0.28, 0.17, 0.27, 0.035, blk);
ptLeg(g, blk, -0.08, 0.28, -0.17, 0.27, 0.035, blk);
ptLeg(g, blk, 0.08, 0.28, -0.17, 0.27, 0.035, blk);
}
else if (kind === "rabbit") {
var wh2 = ptMat(0xF6F2EA);
b.add(ptBall(m, 0.15, 1, 0.95, 1.25, 0, 0.17, -0.03));
b.add(ptBall(m, 0.1, 1, 1, 1, 0, 0.32, 0.13));
b.add(ptBall(wh2, 0.05, 1, 1, 1, 0, 0.2, -0.21));
b.add(ptBall(m, 0.035, 0.8, 3.2, 0.6, -0.04, 0.5, 0.1));
b.add(ptBall(m, 0.035, 0.8, 3.2, 0.6, 0.04, 0.5, 0.1));
b.add(ptBall(ptMat(0xE0A0A0), 0.014, 1, 1, 1, 0, 0.31, 0.225));
ptEyes(b, 0.055, 0.35, 0.19, 0.017);
ptLeg(g, m, -0.06, 0.12, 0.12, 0.11, 0.028, m);
ptLeg(g, m, 0.06, 0.12, 0.12, 0.11, 0.028, m);
b.add(ptBall(m, 0.05, 0.9, 0.6, 1.6, -0.09, 0.05, -0.08));
b.add(ptBall(m, 0.05, 0.9, 0.6, 1.6, 0.09, 0.05, -0.08));
g.userData.hop = 1;
}
else if (kind === "hedgehog") {
var sk = ptMat(0xC8A882), sp = dk;
b.add(ptBall(sk, 0.11, 1, 0.7, 1.3, 0, 0.11, 0));
b.add(ptBall(sk, 0.05, 1, 0.9, 1.3, 0, 0.1, 0.15));
b.add(ptBall(nose, 0.015, 1, 1, 1, 0, 0.1, 0.215));
ptEyes(b, 0.03, 0.14, 0.17, 0.012);
for (var i = 0; i < 34; i++) {
var a = i * 2.4, r = 0.7 + 0.3 * ((i * 37) % 10) / 10, up = 0.35 + 0.55 * ((i * 53) % 10) / 10;
var dx = Math.cos(a) * r * 0.12, dz = -0.02 - Math.abs(Math.sin(a)) * 0.04 + Math.sin(a) * 0.1, dy = 0.1 + up * 0.08;
var c = ptCone(sp, 0.012, 0.08, dx, dy, dz - 0.02, -(0.5 + up * 0.6), -dx * 6);
b.add(c);
}
ptLeg(g, sk, -0.05, 0.06, 0.07, 0.05, 0.017, null);
ptLeg(g, sk, 0.05, 0.06, 0.07, 0.05, 0.017, null);
ptLeg(g, sk, -0.05, 0.06, -0.07, 0.05, 0.017, null);
ptLeg(g, sk, 0.05, 0.06, -0.07, 0.05, 0.017, null);
}
else if (kind === "owl") {
var face = ptMat(new THREE.Color(col).lerp(new THREE.Color(0xF4EEE4), 0.7)), beak = ptMat(0xC8A040);
b.add(ptBall(m, 0.13, 1, 1.3, 0.95, 0, 0, 0));
b.add(ptBall(face, 0.1, 1, 0.85, 0.5, 0, 0.06, 0.07));
ptEyes(b, 0.045, 0.08, 0.11, 0.03, 0xF0C020);
ptEyes(b, 0.045, 0.08, 0.135, 0.015, 0x101010);
b.add(ptCone(beak, 0.015, 0.05, 0, 0.03, 0.12, Math.PI));
b.add(ptCone(m, 0.025, 0.07, -0.07, 0.17, 0.02, 0, 0.3));
b.add(ptCone(m, 0.025, 0.07, 0.07, 0.17, 0.02, 0, -0.3));
ptWing(g, dk, -1, -0.1, 0.02, 0, 0.34, 0.22);
ptWing(g, dk, 1, 0.1, 0.02, 0, 0.34, 0.22);
}
else if (kind === "moth") {
var fz = ptMat(ptShade(col, 0.55)), w1 = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide, emissive: new THREE.Color(col), emissiveIntensity: 0.35 });
b.add(ptBall(fz, 0.035, 1, 1, 2.6, 0, 0, 0));
b.add(ptBall(fz, 0.035, 1, 1, 1, 0, 0.01, 0.1));
b.add(ptRod(fz, 0.004, 0.12, -0.03, 0.07, 0.15, 0.6, 0.4));
b.add(ptRod(fz, 0.004, 0.12, 0.03, 0.07, 0.15, 0.6, -0.4));
ptWing(g, w1, -1, -0.02, 0.01, 0.02, 0.24, 0.2, "moth");
ptWing(g, w1, 1, 0.02, 0.01, 0.02, 0.24, 0.2, "moth");
g.userData.flutter = 1;
}
else if (kind === "sprite") {
var glow = ptMat(col, 0.9), core = ptMat(0xFFF6DC, 1);
b.add(ptBall(glow, 0.09, 1, 1.15, 1, 0, 0, 0));
b.add(ptBall(core, 0.05, 1, 1, 1, 0, 0.01, 0.03));
ptEyes(b, 0.03, 0.03, 0.085, 0.012, 0x3A2A10);
var halo = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.135, 24), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
halo.rotation.x = Math.PI / 2;
halo.position.y = 0.15;
b.add(halo);
var wm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 0.55, emissive: new THREE.Color(col), emissiveIntensity: 0.5 });
ptWing(g, wm, -1, -0.06, 0.04, -0.02, 0.14, 0.1, "moth");
ptWing(g, wm, 1, 0.06, 0.04, -0.02, 0.14, 0.1, "moth");
g.userData.glowMat = glow;
g.userData.flutter = 1;
}
else {
var bel = ptMat(new THREE.Color(col).lerp(new THREE.Color(0xE8D8A0), 0.55)), horn = ptMat(0xE8DCC0), wmd = new THREE.MeshLambertMaterial({ color: ptShade(col, 0.7), side: THREE.DoubleSide });
b.add(ptBall(m, 0.12, 0.9, 0.85, 1.6, 0, 0, 0));
b.add(ptBall(bel, 0.09, 0.85, 0.7, 1.3, 0, -0.03, 0.03));
b.add(ptRod(m, 0.045, 0.14, 0, 0.08, 0.18, 0.9));
b.add(ptBall(m, 0.07, 1, 0.9, 1.3, 0, 0.14, 0.26));
b.add(ptBall(m, 0.045, 1, 0.75, 1.2, 0, 0.12, 0.34));
b.add(ptCone(horn, 0.015, 0.08, -0.04, 0.21, 0.21, -0.9));
b.add(ptCone(horn, 0.015, 0.08, 0.04, 0.21, 0.21, -0.9));
ptEyes(b, 0.04, 0.17, 0.31, 0.014, 0xF0C030);
var tl = new THREE.Group();
tl.position.set(0, 0, -0.17);
tl.add(ptRod(m, 0.035, 0.3, 0, 0, -0.14, -Math.PI / 2));
tl.add(ptCone(m, 0.035, 0.06, 0, 0, -0.31, -Math.PI / 2));
b.add(tl);
g.userData.tail = tl;
ptWing(g, wmd, -1, -0.07, 0.06, 0.04, 0.36, 0.24, "bat");
ptWing(g, wmd, 1, 0.07, 0.06, 0.04, 0.36, 0.24, "bat");
}
g.userData.fly = !!PT_FLY[kind];
g.userData.kind = kind;
g.userData.phase = Math.random() * 6;
g.traverse(function (o) { if (o.isMesh) {
o.castShadow = false;
o.receiveShadow = false;
} });
return g;
},
function (g, dt, speed) {
var u = g.userData;
u.phase = (u.phase || 0) + dt * (speed > 0.3 ? Math.min(14, 4 + speed * 2.2) : 2);
var p = u.phase, amp = speed > 0.3 ? Math.min(0.7, 0.25 + speed * 0.06) : 0;
u.amp = (u.amp || 0) + (amp - (u.amp || 0)) * Math.min(1, dt * 6);
if (u.legs)
u.legs.forEach(function (l, i) { l.rotation.x = Math.sin(p + (i % 2 === (i < 2 ? 0 : 1) ? 0 : Math.PI)) * u.amp; });
if (u.hop && u.body)
u.body.position.y = speed > 0.3 ? Math.abs(Math.sin(p * 0.8)) * 0.1 : 0;
if (u.tail)
u.tail.rotation.y = Math.sin(p * (speed > 0.3 ? 1 : 0.6)) * (u.kind === "dog" ? 0.5 : 0.22);
if (u.wings) {
var beat = u.flutter ? Math.sin(p * 3.2) * 0.7 : Math.sin(p * 1.6) * (speed > 0.3 ? 0.75 : 0.35);
u.wings.forEach(function (w) { w.rotation.z = w.userData.side * beat; });
}
if (u.fly && u.body)
u.body.position.y = Math.sin(p * 0.5) * 0.06;
if (u.glowMat)
u.glowMat.emissiveIntensity = 0.75 + Math.sin(p * 0.35) * 0.15;
if (u.play > 0) {
u.play -= dt;
g.children[0].rotation.y = (1 - u.play / 1.2) * Math.PI * 2;
if (u.play <= 0)
g.children[0].rotation.y = 0;
}
},
function (e) { var m = String(e && e.message || e || ""); try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { } return /function|404|schema cache/i.test(m) ? (typeof notOpenYet === "function" ? notOpenYet("The Animal Shelter opens soon.", "Pets need the latest server update.") : "The Animal Shelter opens soon.") : m; },
function (label, v) {
var c = v >= 60 ? "#7FC86A" : v >= 25 ? "#E8C27A" : "#E07A5A";
return "<div style='display:flex;align-items:center;gap:6px;font-size:12px;margin:2px 0'><span style='width:44px;opacity:.85'>" + label + "</span><span style='flex:1;height:8px;background:#2A2418;border-radius:4px;overflow:hidden'><span style='display:block;height:100%;width:" + Math.max(0, Math.min(100, v)) + "%;background:" + c + "'></span></span><span style='width:30px;text-align:right'>" + v + "</span></div>";
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🐾 Pets and mounts</b>" + ptBtn("x", "Close") + "</div>";
if (PT.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(PT.say) + "</div>";
var d = PT.d;
if (!d)
return h + "<p>Looking…</p>";
if (!d.ok)
return h + "<p>" + esc(d.say || "") + "</p>";
var myMounts = (typeof myThings !== "undefined" ? myThings : []).filter(function (t) { return PT_MOUNTS.indexOf(t.archetype) >= 0; });
var tabs = [["mine", "Your pets"], ["shelter", "The Shelter"], ["mounts", "Your mounts" + (myMounts.length ? " (" + myMounts.length + ")" : "")]];
h += "<div style='margin-bottom:8px'>" + tabs.map(function (t) { return "<button class='btn' data-pt='tab' data-t='" + t[0] + "' style='margin:0 4px 4px 0;" + (PT.tab === t[0] ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + t[1] + "</button>"; }).join("") + "</div>";
if (PT.tab === "mine") {
var ps = d.pets || [];
if (!ps.length)
return h + "<p style='opacity:.85'>No pets yet. The Somnucor Animal Shelter has creatures waiting for a home: see The Shelter.</p>";
ps.forEach(function (p) {
var K = ptKindName(p.kind);
h += "<div style='padding:8px 0;border-top:1px solid rgba(201,168,104,.2)'><div style='display:flex;align-items:center;gap:8px'><span style='font-size:26px'>" + K[2] + "</span><div style='flex:1'><b>" + esc(p.name) + "</b> <span style='opacity:.8;font-size:12px'>" + esc(K[1].toLowerCase()) + " · bond " + p.bond + "/100</span>" +
"<div style='font-size:12px;opacity:.8'>" + (p.sheltered ? "At the Animal Shelter, cared for and waiting for you." : p.out ? "Walking at your heel." : "At home.") + "</div></div><span style='width:16px;height:16px;border-radius:50%;background:" + esc(p.colour) + ";border:1px solid #6A5A3A'></span></div>";
if (p.sheltered)
h += "<div>" + ptBtn("fetch", "Fetch " + esc(p.name) + " home (50 gold)", " data-id='" + p.id + "'") + "</div></div>";
else
h += ptBar("Food", p.food) + ptBar("Joy", p.joy) + ptBar("Coat", p.coat) + "<div style='margin-top:4px'>" + ptBtn("feed", "🍖 Feed (5 gold)", " data-id='" + p.id + "'") + ptBtn("play", "🎾 Play", " data-id='" + p.id + "'") + ptBtn("groom", "🪮 Groom (2 gold)", " data-id='" + p.id + "'") +
(p.out ? ptBtn("home", "Leave at home", " data-id='" + p.id + "'") : ptBtn("walk", "Walk with me", " data-id='" + p.id + "'")) + ptBtn("rehome", "Find it a new home", " data-id='" + p.id + "'") + "</div></div>";
});
return h + "<p style='font-size:12px;opacity:.75;margin-top:8px'>Food runs down over a day, joy over a day and a half, a coat over two days. The bond grows with every day of care. A pet left four days with an empty bowl goes to the Shelter's care.</p>";
}
if (PT.tab === "shelter") {
if (d.may !== "ok")
h += "<p style='opacity:.85'>" + esc(d.may) + "</p>";
h += "<p style='font-size:12px;opacity:.8'>The Somnucor Animal Shelter, where every creature is looked after until someone takes it home. Up to three pets each; one walks with you at a time.</p>";
h += "<div style='display:flex;flex-wrap:wrap;gap:6px'>" + (d.kinds || []).map(function (k) {
var K = ptKindName(k.k);
return "<button class='btn' data-pt='kind' data-k='" + k.k + "' style='flex:1 1 140px;text-align:left;" + (PT.kind === k.k ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + K[2] + " " + esc(k.n) + "<br><span style='font-size:11.5px;opacity:.8'>" + (+k.p).toLocaleString() + " gold</span></button>";
}).join("") + "</div>";
var cols = PT_COLOURS[PT.kind] || ["#A07850"];
if (cols.indexOf(PT.colour) < 0)
PT.colour = cols[0];
h += "<div style='margin:8px 0 4px'>Colour: " + cols.map(function (c) { return "<button data-pt='col' data-c='" + c + "' title='" + c + "' style='width:26px;height:26px;border-radius:50%;margin:0 4px;background:" + c + ";border:2px solid " + (PT.colour === c ? "#E8C27A" : "#3A3020") + ";cursor:pointer'></button>"; }).join("") + "</div>";
h += "<div style='display:flex;gap:6px;align-items:center'><input id='pt-name' maxlength='24' placeholder='Its name' value='" + esc(PT.name) + "' style='flex:1;min-width:0;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:6px'>" + ptBtn("adopt", "Adopt") + "</div>";
return h;
}
if (!myMounts.length)
return h + "<p style='opacity:.85'>You have no living mount yet. Horses, unicorns, pegasi, stags, camels, elephants, griffins, hippogriffs and dragons are sold at the shops and the Transport Yard.</p>";
h += "<p style='font-size:12px;opacity:.8'>A living mount needs feeding. A hungry one (food under 20) goes at a slower pace until it is fed.</p>";
var seen = {};
myMounts.forEach(function (t) {
var k = t.archetype;
if (seen[k])
return;
seen[k] = 1;
var m = PT.mounts[k] || { food: 100, coat: 100 };
h += "<div style='padding:8px 0;border-top:1px solid rgba(201,168,104,.2)'><b>" + esc(t.name) + "</b>" + ptBar("Food", m.food) + ptBar("Coat", m.coat) + "<div>" + ptBtn("mfeed", "🌾 Feed (10 gold)", " data-k='" + k + "'") + ptBtn("mgroom", "🪮 Groom (3 gold)", " data-k='" + k + "'") + "</div></div>";
});
return h;
},
function () {
var el = document.getElementById("pt-box");
if (!PT.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "pt-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", ptClick);
el.addEventListener("input", function (e) { if (e.target.id === "pt-name")
PT.name = e.target.value; });
document.body.appendChild(el);
}
el.innerHTML = ptHtml();
el.style.display = "block";
},
function (e) {
var t = e.target.closest && e.target.closest("[data-pt]");
if (!t)
return;
var a = t.getAttribute("data-pt"), id = +t.getAttribute("data-id") || 0;
if (a === "x") {
PT.open = false;
ptPaint();
return;
}
if (a === "tab") {
PT.tab = t.getAttribute("data-t");
PT.say = "";
ptPaint();
return;
}
if (a === "kind") {
PT.kind = t.getAttribute("data-k");
ptPaint();
return;
}
if (a === "col") {
PT.colour = t.getAttribute("data-c");
ptPaint();
return;
}
if (a === "adopt") {
if (!PT.name.trim()) {
PT.say = "Give it a name first.";
ptPaint();
return;
}
ptAct("pet_adopt", { p_kind: PT.kind, p_name: PT.name, p_colour: PT.colour }, function (o) { if (o && o.ok) {
PT.name = "";
PT.tab = "mine";
if (typeof refreshStanding === "function")
refreshStanding();
} });
return;
}
if (a === "rehome") {
if (!confirm("Give this pet to the Shelter to find it a new home? It cannot be undone."))
return;
}
if (["feed", "play", "groom", "walk", "home", "fetch", "rehome"].indexOf(a) >= 0) {
ptAct("pet_care", { p_id: id, p_act: a }, function (o) {
if (o && o.ok && a === "play" && PT.mine)
PT.mine.userData.play = 1.2;
if (o && o.ok && (a === "feed" || a === "groom" || a === "fetch") && typeof refreshStanding === "function")
refreshStanding();
});
return;
}
if (a === "mfeed" || a === "mgroom") {
var k = t.getAttribute("data-k");
ptAct("mount_care_do", { p_kind: k, p_act: a === "mfeed" ? "feed" : "groom" }, function (o) {
if (o && o.ok && a === "mfeed" && typeof riding !== "undefined" && riding && ptMountOf(riding) === k && typeof ride === "function") {
var r = riding;
PT.mounts[k] = { food: 100, coat: (PT.mounts[k] || {}).coat || 100 };
ride(r);
}
if (typeof refreshStanding === "function")
refreshStanding();
});
return;
}
},
function () {
return new Promise(function (res, rej) {
if (!window.indexedDB)
return rej(new Error("This browser cannot keep photos."));
var q;
try {
q = indexedDB.open("sm-memory-book", 1);
}
catch (e) {
return rej(e);
}
q.onupgradeneeded = function () { q.result.createObjectStore("photos", { keyPath: "id", autoIncrement: true }); };
q.onsuccess = function () { res(q.result); };
q.onerror = function () { rej(q.error); };
});
},
function () {
return mbkDb().then(function (db) {
return new Promise(function (res, rej) {
var out = [], r = db.transaction("photos", "readonly").objectStore("photos").openCursor();
r.onsuccess = function () { var c = r.result; if (c) {
out.push(c.value);
c.continue();
}
else
res(out); };
r.onerror = function () { rej(r.error); };
});
});
},
function (blob, note) {
return mbkPhotos().then(function (list) {
if (list.length >= 60)
throw new Error("Your memory book holds 60 photos. Take one out to keep another.");
return mbkDb().then(function (db) {
return new Promise(function (res, rej) {
var tx = db.transaction("photos", "readwrite");
tx.objectStore("photos").add({ at: Date.now(), blob: blob, note: note || "" });
tx.oncomplete = function () { res(); };
tx.onerror = function () { rej(tx.error); };
});
});
});
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
MBK.d = { ok: false, say: "Sign in to see the city's side of your story. Your dreams and photos are below." };
mbkPaint();
return;
}
cityRpc("memory_book", {}).then(function (o) { MBK.d = o; }).catch(function (e) { var m = ptErr(e); MBK.d = { ok: false, say: /Shelter/.test(m) ? "The city's pages of your memory book open soon." : m }; }).then(mbkPaint);
},
function () {
var d = MBK.d || {}, h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:16px;flex:1;font-family:Georgia,serif'>📖 " + (d.name ? esc(d.name) + "'s memory book" : "Your memory book") + "</b><button class='btn' data-mb='x'>Close</button></div>";
if (MBK.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(MBK.say) + "</div>";
h += "<div style='margin-bottom:8px'>" + mbkTab("firsts", "Firsts") + mbkTab("dreams", "Best dreams") + mbkTab("photos", "Photos") + mbkTab("people", "Friends and keys") + mbkTab("treasures", "Treasures") + "</div>";
var row = function (icon, title, sub) { return "<div style='display:flex;gap:10px;align-items:flex-start;padding:6px 0;border-top:1px solid rgba(201,168,104,.18)'><span style='font-size:20px;width:26px;text-align:center'>" + icon + "</span><div style='flex:1'><b>" + title + "</b>" + (sub ? "<div style='font-size:12px;opacity:.8'>" + sub + "</div>" : "") + "</div></div>"; };
if (MBK.tab === "dreams") {
var ss = (typeof store !== "undefined" && store.sessions) || [], st = mbkStars();
if (!ss.length)
return h + "<p style='opacity:.85'>No dreams written yet. Every dream you tell is kept in your journal; star the ones you love and they gather here.</p>";
var list = ss.slice().sort(function (a, b) { return (st[b.n] ? 1 : 0) - (st[a.n] ? 1 : 0) || String(b.date).localeCompare(String(a.date)); });
h += "<p style='font-size:12px;opacity:.8'>Star your best dreams and they stay at the top. These are on this device, from your own journal.</p>";
list.slice(0, 60).forEach(function (r) {
var txt = String(r.original || "").replace(/\s+/g, " ").slice(0, 180);
h += "<div style='padding:7px 0;border-top:1px solid rgba(201,168,104,.18)'><div style='display:flex;gap:8px;align-items:center'><button class='btn' data-mb='star' data-n='" + esc(String(r.n)) + "' title='Star' style='padding:2px 8px'>" + (st[r.n] ? "⭐" : "☆") + "</button><b style='flex:1'>" + esc(r.title || ("Night " + r.n)) + "</b><span style='font-size:12px;opacity:.75'>" + esc(r.date || "") + "</span></div>" +
(txt ? "<div style='font-size:12.5px;opacity:.85;margin-top:3px;font-family:Georgia,serif'>“" + esc(txt) + (String(r.original || "").length > 180 ? "…" : "") + "”</div>" : "") +
((r.emotions || []).length ? "<div style='font-size:11.5px;opacity:.7;margin-top:2px'>" + esc(r.emotions.slice(0, 5).join(", ")) + (r.lucidity ? " · lucid " + esc(String(r.lucidity)) : "") + "</div>" : "") + "</div>";
});
return h;
}
if (MBK.tab === "photos") {
if (!MBK.photos) {
mbkPhotos().then(function (p) { MBK.photos = p; }).catch(function (e) { MBK.photos = []; MBK.say = String(e && e.message || e); }).then(mbkPaint);
return h + "<p>Opening…</p>";
}
MBK.urls.forEach(function (u) { try {
URL.revokeObjectURL(u);
}
catch (e) { } });
MBK.urls = [];
if (!MBK.photos.length)
return h + "<p style='opacity:.85'>No photos kept yet. Take one in ☰ Menu → 📷 Photo, then press “📖 Keep in my memory book”. Kept photos stay on this device.</p>";
h += "<div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px'>";
MBK.photos.slice().reverse().forEach(function (p) {
var u = URL.createObjectURL(p.blob);
MBK.urls.push(u);
h += "<div style='background:#1A140C;border:1px solid #4A3E28;border-radius:4px;padding:4px'><img src='" + u + "' alt='' style='width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:3px;display:block'><div style='font-size:11.5px;opacity:.8;margin:3px 0'>" + esc(mbkDate(p.at)) + (p.note ? " · " + esc(p.note) : "") + "</div>" +
"<a class='btn' href='" + u + "' download='somnumatrix-memory-" + p.id + ".jpg' style='font-size:11.5px;padding:2px 6px'>💾</a> <button class='btn' data-mb='drop' data-id='" + p.id + "' style='font-size:11.5px;padding:2px 6px'>Take out</button></div>";
});
return h + "</div>";
}
if (!MBK.d)
return h + "<p>Turning the pages…</p>";
if (!d.ok)
return h + "<p style='opacity:.85'>" + esc(d.say || "") + "</p>";
if (MBK.tab === "firsts") {
if (d.level)
h += "<p style='margin:0 0 6px'>Level " + d.level.level + ", <b>" + esc(d.level.title || "") + "</b> · " + (+d.level.xp).toLocaleString() + " experience</p>";
if (!(d.firsts || []).length)
return h + "<p style='opacity:.85'>Your story is just beginning. Your first job, first friend, first key and many more firsts are written here as they happen.</p>";
d.firsts.forEach(function (f) { h += row(f.icon, esc(f.title), mbkDate(f.at)); });
return h;
}
if (MBK.tab === "people") {
h += "<div style='margin:4px 0'><b>Friends</b></div>";
if (!(d.friends || []).length)
h += "<p style='opacity:.8;font-size:12.5px'>No friends yet. Ask someone in ☰ Menu → 👥 Who's here.</p>";
(d.friends || []).forEach(function (f) { h += row("🤝", esc(f.name || "a dreamer"), "Friends since " + mbkDate(f.at)); });
h += "<div style='margin:10px 0 4px'><b>The Dreamer's Keys</b></div>";
if (!(d.keys || []).length)
h += "<p style='opacity:.8;font-size:12.5px'>No clue shards found yet. Every world hides one.</p>";
(d.keys || []).forEach(function (k) {
var sh = Array.isArray(k.shards) ? k.shards.length : (+k.shards || 0);
h += row("🗝️", "Season " + k.season + ": " + k.keys + " of 3 keys", sh + " clue shard" + (sh === 1 ? "" : "s") + (k.gate ? " · the gate opened" : "") + (k.secrets ? " · " + k.secrets + " secrets" : ""));
});
return h;
}
var any = false;
(d.rare || []).forEach(function (r) { any = true; h += row(r.icon || "💎", esc(r.name), "Number " + r.serial + " of " + r.of); });
if (d.arena && +d.arena.played) {
any = true;
h += row("🏆", "Arena record", d.arena.won + " won of " + d.arena.played + " played");
}
(d.pets || []).forEach(function (p) { any = true; var K = ptKindName(p.kind); h += row(K[2], esc(p.name), esc(K[1]) + " · with you since " + mbkDate(p.born) + " · bond " + p.bond); });
(d.worlds || []).forEach(function (w) { any = true; h += row("🌌", esc(w.title || "A dream world"), (+w.visits || 0) + " visits from other dreamers"); });
if (!any)
h += "<p style='opacity:.85'>Rare finds, arena wins, your pets and the dream worlds you share gather here.</p>";
return h;
},
function () {
var el = document.getElementById("mbk-box");
if (!MBK.open) {
if (el)
el.style.display = "none";
MBK.urls.forEach(function (u) { try {
URL.revokeObjectURL(u);
}
catch (e) { } });
MBK.urls = [];
return;
}
if (!el) {
el = document.createElement("div");
el.id = "mbk-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 32px));max-height:min(86vh,800px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(34,26,16,.97),rgba(14,11,8,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-mb]");
if (!t)
return;
var a = t.getAttribute("data-mb");
if (a === "x") {
MBK.open = false;
mbkPaint();
return;
}
if (a === "tab") {
MBK.tab = t.getAttribute("data-t");
MBK.say = "";
mbkPaint();
return;
}
if (a === "star") {
var n = t.getAttribute("data-n");
mbkStar(n, !mbkStars()[n]);
mbkPaint();
return;
}
if (a === "drop") {
if (!confirm("Take this photo out of your memory book?"))
return;
mbkDrop(+t.getAttribute("data-id")).then(function () { MBK.photos = null; mbkPaint(); });
return;
}
});
document.body.appendChild(el);
}
var top = el.scrollTop;
el.innerHTML = mbkHtml();
el.style.display = "block";
el.scrollTop = top;
}
];
});
