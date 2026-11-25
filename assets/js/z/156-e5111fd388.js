/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(156, function () {
"use strict";
return [
function (x, y, z, col, r1, life) {
if (typeof scene === "undefined")
return;
var m = new THREE.Mesh(new THREE.TorusGeometry(1, 0.07, 6, 40), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, depthWrite: false }));
m.rotation.x = Math.PI / 2;
m.position.set(x, y, z);
scene.add(m);
PW.fx.push({ p: m, t: 0, life: life || 1, kind: "ring", r1: r1 || 6 });
},
function (col, ms) {
if (typeof document === "undefined")
return;
var d = document.getElementById("pw-flash");
if (!d) {
d = document.createElement("div");
d.id = "pw-flash";
d.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:25;opacity:0;transition:opacity .45s ease-out";
document.body.appendChild(d);
}
d.style.background = col || "#fff";
d.style.transition = "none";
d.style.opacity = "0.75";
setTimeout(function () { d.style.transition = "opacity " + ((ms || 450) / 1000) + "s ease-out"; d.style.opacity = "0"; }, 30);
},
function (n) {
if (!pwHas(n))
return;
try {
if (n === "passing through walls" && typeof trfInCity === "function" && trfInCity()) {
pwSay("<b>Not in Somnucor.</b> The city's walls hold everyone, whatever they can do in a dream.");
return;
}
if (n === "passing through walls") {
PW.walls = !PW.walls;
pwSay(PW.walls ? "<b>Walls are nothing to you.</b>" : "Walls stop you again.");
pwShimmer(0xBFD8FF);
}
else if (n === "breathing underwater")
pwDive();
else if (n === "becoming unseen")
pwUnseen(!PW.unseen);
else if (n === "changing shape")
pwShapes();
else if (n === "summoning")
pwSummon();
else if (n === "stopping time")
pwStopTime();
else if (n === "moving without walking")
pwBlink();
else if (n === "changing size")
pwSize();
else if (n === "speaking with the dead")
pwDead();
else if (n === "knowing it was a dream")
pwLucid(!PW.lucid);
else if (n === "changing the dream")
pwRemake();
else if (n === "seeing what was hidden")
pwReveal();
else if (n === "healing")
pwHeal();
}
catch (e) {
if (window.console)
console.warn("[powers]", e);
}
pwBarSig = "";
pwBarAt = 0;
pwTint();
},
function () {
if (typeof meG === "undefined" || !meG)
return;
meG.traverse(function (o) {
if (!o.material)
return;
[].concat(o.material).forEach(function (m) {
if (m.userData.pwOpa === undefined)
m.userData.pwOpa = [m.opacity, m.transparent];
if (PW.unseen) {
m.transparent = true;
m.opacity = Math.min(m.userData.pwOpa[0], 0.22);
}
else {
m.opacity = m.userData.pwOpa[0];
m.transparent = m.userData.pwOpa[1];
}
m.needsUpdate = true;
});
});
},
function () {
if (typeof document === "undefined")
return;
var p = document.getElementById("pw-shapes");
if (p && p.style.display === "block") {
p.style.display = "none";
return;
}
if (!p) {
p = document.createElement("div");
p.id = "pw-shapes";
p.style.cssText = "position:fixed;z-index:31;left:12px;bottom:66px;width:min(330px,calc(100vw - 24px));background:rgba(9,11,16,.95);" +
"border:1px solid var(--line,#333);border-radius:4px;padding:12px 14px";
document.body.appendChild(p);
}
var forms = PW_FORMS.filter(function (f) { return (typeof SPECIES_FEATS !== "undefined" && SPECIES_FEATS[f[0]]) || (typeof HDF_KIND !== "undefined" && HDF_KIND[f[0]]); });
p.innerHTML = '<b style="font-weight:500">Take another form</b><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px">' +
forms.map(function (f) { return '<button class="btn" data-form="' + f[0] + '">' + f[1] + '</button>'; }).join("") +
'<button class="btn" data-form="">Yourself</button></div>';
p.style.display = "block";
Array.prototype.forEach.call(p.querySelectorAll("[data-form]"), function (b) {
b.onclick = function () { p.style.display = "none"; pwShape(b.getAttribute("data-form")); };
});
},
function (form) {
if (typeof meLook !== "function" || typeof rebuildMe !== "function")
return;
var L = meLook(), F = pwFeet();
if (PW.home === null)
PW.home = { species: L.species || null, src: L.src ? L.src.species : undefined };
if (!form) {
L.species = PW.home.species;
if (L.src)
L.src.species = PW.home.src;
PW.home = null;
}
else {
L.species = form;
if (!L.src)
L.src = {};
L.src.species = (typeof HDF_KIND !== "undefined" && HDF_KIND[form]) ? "dream" : "stated";
}
pwBurst(F.x, F.y, F.z, 0xE8C27A, 120, [1.2, 2.6, 1.2], 1.6, "swirl", 0.28);
pwFlash("rgba(255,230,170,.6)", 500);
rebuildMe();
if (PW.unseen)
setTimeout(pwMeFade, 50);
if (typeof setView === "function" && meView === "eyes" && form)
setView("behind");
pwSay(form ? "<b>You are " + esc((PW_FORMS.filter(function (f) { return f[0] === form; })[0] || [0, form])[1].toLowerCase()) + " now.</b> Press V to change how you see yourself." : "<b>You are yourself again.</b>");
},
function () {
var P = camera.position, f = pwFwd(), x = P.x + f.x * 7, z = P.z + f.z * 7, y = pwFeet().y;
if (typeof landWorking === "function" && KIT.summoning)
landWorking("summoning", x, y, z);
pwRing(x, y + 0.1, z, 0xC050FF, 4, 1.4);
pwBurst(x, y, z, 0xE8B0FF, 90, [2.2, 3, 2.2], 2.2, "swirl", 0.7);
var named = store.objects.filter(function (o) { return (o.realm || 0) === (store.here || 0) && !o.city && KIT[o.archetype] && KIT[o.archetype].cat === "creature"; }).map(function (o) { return o.archetype; });
var pool = named.length ? named : PW_SUMMON.filter(function (k) { return KIT[k] && typeof modelEntry === "function" && modelEntry({ archetype: k }); });
if (!pool.length)
pool = PW_SUMMON.filter(function (k) { return KIT[k]; });
if (!pool.length)
return;
var kind = pool[Math.floor(Math.random() * pool.length)];
setTimeout(function () {
var spec = { id: uid(), archetype: kind, label: null, attrs: kind === "dragon" ? { s: 0.3 } : {}, x: x, z: z, rot: yaw + Math.PI, solid: false, detail: 3, nights: [store.session], summoned: true };
if (store.here)
spec.realm = store.here;
store.objects.push(spec);
addMesh(spec);
pwFlash("rgba(200,120,255,.45)", 600);
pwSay("<b>Something comes through the circle: " + esc(typeof placeName === "function" ? placeName(spec) : kind) + ".</b>");
if (typeof save === "function")
save();
}, 1100);
},
function () {
var P = camera.position, d = new THREE.Vector3();
camera.getWorldDirection(d);
var flat = Math.hypot(d.x, d.z) || 1, dist = 40;
if (d.y < -0.05) {
var h = (P.y - pwFeet().y) / (-d.y);
dist = Math.min(dist, h * flat);
}
dist = Math.max(4, dist);
var fx = d.x / flat, fz = d.z / flat, nx = P.x + fx * dist, nz = P.z + fz * dist;
var feet = pwFeet().y;
while (dist > 3 && !(throughWalls() && PW.walls) && blockedAt(nx, nz, feet)) {
dist -= 1;
nx = P.x + fx * dist;
nz = P.z + fz * dist;
}
var F = pwFeet();
pwBurst(F.x, F.y, F.z, 0xBFE8FF, 80, [0.8, 2.4, 0.8], 0.9, "burst", 0.25);
P.x = nx;
P.z = nz;
pwBurst(nx, F.y, nz, 0xFFFFFF, 90, [0.8, 2.4, 0.8], 1.1, "burst", 0.5);
pwRing(nx, F.y + 0.1, nz, 0xBFE8FF, 3, 0.7);
pwFlash("rgba(230,245,255,.55)", 380);
},
function () {
if (store.inside) {
pwSay("There is no room in here to change your size.");
return;
}
PW.size = PW.size === 0 ? 1 : PW.size === 1 ? -1 : 0;
PW.eye = PW.size === 1 ? 10 : PW.size === -1 ? -1.35 : 0;
PW.pace = PW.size === 1 ? 3.2 : PW.size === -1 ? 0.35 : 1;
var F = pwFeet();
pwBurst(F.x, F.y, F.z, 0xE8C27A, 90, [1.6, 3, 1.6], 1.3, "swirl", 0.3);
pwSay(PW.size === 1 ? "<b>You grow huge.</b> The dream is small around you." : PW.size === -1 ? "<b>You shrink</b> to the height of a cat." : "You are your own size again.");
},
function (x, z) {
if (store.inside || pwInCity())
return null;
var S = (typeof dpShoreHere === "function") ? dpShoreHere() : null;
if (S && S.shore && typeof dpShoreFrame === "function") {
var Fr = dpShoreFrame(S), a = Fr.along({ x: x, z: z });
var sg = meshes[S.id], wm = sg && sg.userData.water;
if (a > S.shore.s0 + 2)
return { y: 0.12, deep: Math.min(9, (a - S.shore.s0) * 0.35), mesh: wm ? wm.parent : null };
}
var here = store.here || 0;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!PW_WATERY[o.archetype] || (o.realm || 0) !== here)
continue;
var K = KIT[o.archetype];
if (!K)
continue;
var s = (o.attrs && o.attrs.s) || 1, r = Math.max(K.size[0], K.size[2]) * s * 0.45;
if (o.archetype === "river")
r = K.size[0] * s * 0.45;
var wp = pwWaterSheet(K);
if (wp) {
var a = o.attrs || {}, g = meshes[o.id], gx = g ? g.position.x : o.x, gz = g ? g.position.z : o.z, gr = g ? g.rotation.y : (o.rot || 0);
var c = Math.cos(-gr), sn = Math.sin(-gr), dx = x - gx, dz = z - gz, lx = dx * c + dz * sn - wp.x * s * (a.w || 1), lz = -dx * sn + dz * c - wp.z * s * (a.d || 1);
if (Math.abs(lx) < wp.hw * s * (a.w || 1) - 0.3 && Math.abs(lz) < wp.hd * s * (a.d || 1) - 0.3)
return { y: 0.1, deep: 3, mesh: g || null };
continue;
}
if (Math.hypot(x - o.x, z - o.z) < r)
return { y: 0.1, deep: 3, mesh: meshes[o.id] || null };
}
return null;
},
function () {
if (PW.under) {
PW.under = false;
pwSay("You rise and break the surface.");
return;
}
var P = camera.position, w = pwWaterAt(P.x, P.z);
if (!w) {
pwSay("There is no water here to go under. Find the sea, a lake or a river.");
return;
}
PW.under = true;
pwSay("<b>You go under, and breathe.</b> Press it again to come up.");
pwBurst(P.x, w.y, P.z, 0xDDF4FF, 80, [1.4, .6, 1.4], 1, "burst", 0.18);
},
function () {
if (PW.ghost && PW.ghost.c && store.characters.indexOf(PW.ghost.c) > -1) {
if (typeof openTalk === "function")
openTalk(PW.ghost.c);
return;
}
var P = camera.position, f = pwFwd(), x = P.x + f.x * 3.5, z = P.z + f.z * 3.5;
var name = PW_DEAD_NAMES[Math.floor(Math.random() * PW_DEAD_NAMES.length)];
var spec = { id: uid(), archetype: "human", label: name, attrs: {}, x: x, z: z, rot: yaw + Math.PI, solid: false, detail: 3, nights: [store.session], summoned: true };
if (store.here)
spec.realm = store.here;
var L = (typeof blankLook === "function") ? blankLook("human") : {};
L.species = "ghost";
L.src = { species: "dream" };
spec.look = L;
var c = { id: uid(), archetype: "human", name: name.replace(/^a |^the /, function (m) { return m === "a " ? "A " : "The "; }), aka: [],
details: ["one of the dead", "a spirit who answers the dreamer from beyond death", "speaks softly, of what was and what is left undone"],
sessions: [store.session], awake: true, log: [], objId: spec.id, x: x, z: z, primary: false, src: { name: "stated" }, role: null, shift: null, routine: null,
home: null, work: null, anchor: { x: x, z: z }, born: "" };
spec.charId = c.id;
store.objects.push(spec);
store.characters.push(c);
addMesh(spec);
PW.ghost = { spec: spec, c: c };
pwBurst(x, pwFeet().y, z, 0xCFE8F0, 110, [0.9, 2.6, 0.9], 2.4, "rise", 0.6);
pwFlash("rgba(190,215,230,.45)", 900);
pwSay("<b>" + esc(c.name) + " comes to you from beyond.</b> Speak with them (E), or press the power again.");
setTimeout(function () { if (typeof openTalk === "function" && PW.ghost && PW.ghost.c === c)
openTalk(c); }, 1400);
},
function () {
raycaster.setFromCamera({ x: 0, y: 0 }, camera);
var hits = raycaster.intersectObjects(scene.children, true), spec = null;
for (var i = 0; i < hits.length && !spec; i++) {
if (hits[i].distance > 60)
break;
var o = hits[i].object;
while (o && o.userData.id === undefined)
o = o.parent;
if (o && o.userData.id) {
var s = specById(o.userData.id);
if (s && !s.city && !s.hub && !s.deity && s.archetype !== "shore")
spec = s;
}
}
if (!spec) {
pwSay("Look straight at something in the dream, then remake it.");
return;
}
if (pwInCity() && spec.city) {
pwSay("Somnucor's own streets cannot be remade.");
return;
}
var was = typeof placeName === "function" ? placeName(spec) : spec.archetype;
var said = (typeof prompt === "function") ? prompt("Make the " + was + " become…", "") : "";
if (!said)
return;
var k = (typeof lexFind === "function") ? lexFind(said) : null;
if (!k && KIT[said.toLowerCase().replace(/[^a-z]/g, "")])
k = said.toLowerCase().replace(/[^a-z]/g, "");
var x = spec.x, z = spec.z;
if (typeof landWorking === "function" && KIT.transmute)
landWorking("transmute", x, 0, z);
pwBurst(x, 0.5, z, 0x6AF0C4, 120, [2, 4, 2], 1.8, "swirl", 0.7);
if (k && KIT[k]) {
setTimeout(function () {
spec.archetype = k;
spec.label = said;
spec.attrs = spec.attrs || {};
delete spec.attrs.lv;
if (typeof refresh === "function")
refresh(spec);
if (typeof save === "function")
save();
pwSay("<b>The " + esc(was) + " becomes " + esc(said) + ".</b>");
}, 700);
return;
}
var before = {};
store.objects.forEach(function (o) { before[o.id] = 1; });
var idx = store.objects.indexOf(spec);
if (idx > -1)
store.objects.splice(idx, 1);
if (meshes[spec.id]) {
scene.remove(meshes[spec.id]);
delete meshes[spec.id];
}
if (typeof scanText === "function")
scanText("There was " + (/^(a|an|the)\s/i.test(said) ? "" : "a ") + said + ".");
setTimeout(function () {
store.objects.forEach(function (o) { if (!before[o.id] && !o.city && (o.realm || 0) === (store.here || 0) && !(typeof isPerson === "function" && isPerson(o))) {
o.x = x;
o.z = z;
if (typeof refresh === "function")
refresh(o);
} });
if (typeof save === "function")
save();
}, 1600);
pwSay("<b>The " + esc(was) + " becomes " + esc(said) + ".</b>");
},
function () {
var P = camera.position, n = 0;
store.objects.forEach(function (o) {
if (o.filler || typeof isHidden !== "function" || !isHidden(o))
return;
if ((o.realm || 0) !== (store.here || 0))
return;
if (Math.hypot(o.x - P.x, o.z - P.z) < 90) {
o.found = true;
if (typeof refresh === "function")
refresh(o);
n++;
}
});
pwRing(P.x, pwFeet().y + 0.2, P.z, 0xA8E0FF, 40, 2.2);
pwFlash("rgba(170,220,255,.4)", 800);
pwAuraClear();
var tex = (typeof dotTexture === "function") ? dotTexture() : null;
store.objects.forEach(function (o) {
if ((o.realm || 0) !== (store.here || 0) || o.id === "__me")
return;
var live = (typeof isPerson === "function" && isPerson(o)) || (KIT[o.archetype] && KIT[o.archetype].cat === "creature") || o.archetype === "dragon";
if (!live || Math.hypot(o.x - P.x, o.z - P.z) > 120)
return;
var g = meshes[o.id];
if (!g)
return;
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0x9FE0FF, transparent: true, opacity: 0.85, depthTest: false, depthWrite: false }));
sp.scale.set(2.6, 3.6, 1);
sp.position.set(0, 1.2, 0);
sp.renderOrder = 999;
g.add(sp);
PW.aura.push(sp);
});
PW.auraT = 12;
pwSay(n ? "<b>You see what was hidden: " + n + " thing" + (n > 1 ? "s" : "") + " found.</b> Every living thing glows." : "<b>Your sight goes through everything.</b> Every living thing glows.");
},
function () {
var F = pwFeet();
if (typeof landWorking === "function" && KIT.healinglight)
landWorking("healinglight", F.x, F.y, F.z);
pwBurst(F.x, F.y, F.z, 0xFFF0C0, 120, [1.2, 3.4, 1.2], 2.4, "rise", 0.3);
pwFlash("rgba(255,244,200,.45)", 900);
var hurt = (typeof dreamerHurt === "function") ? dreamerHurt() : null;
if (pwInCity() && hurt && hurt.state !== "well")
pwSay("<b>Warm light rises round you.</b> In Somnucor your body still mends at the hospital or in time; the light eases the pain on the way.");
else
pwSay("<b>Warm light rises round you, and the hurt is gone.</b>");
}
];
});
