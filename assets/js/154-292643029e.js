/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LIVE = { figs: [], crit: [], scanAt: 0, t: 0, bl: {}, blAt: 0, smoke: [], v: null };
function jobWear(title, place) {
var w = (String(title || "") + " " + String(place || "")).toLowerCase(), o = {};
function is(re) { return re.test(w); }
if (is(/space corp|spaceport|shuttle|cabin crew|departures agent|first officer|astronaut/)) {
o.top = 0x24335E;
o.bottom = 0x1A2238;
o.layer = "uniform";
o.layerColor = 0x24335E;
o.shoes = 0x111111;
o.shoeKind = "boots";
if (is(/captain|commander/)) {
o.hat = "cap";
o.hatColor = 0x1A2238;
}
if (is(/cabin crew|departures/)) {
o.neck = "scarf";
o.accColor = 0xE8C27A;
o.shoeKind = "shoes";
}
}
else if (is(/dragon|rider|police|constable|officer|guard|watch|gaol|warden|bailiff|sentry|enforcer|patrol|security|bouncer|doorman|surveillance/)) {
o.top = 0x23324E;
o.bottom = 0x1E2638;
o.layer = "uniform";
o.layerColor = 0x1E2A44;
o.hat = is(/dragon|rider/) ? "helmet" : "cap";
o.hatColor = 0x141A2A;
o.waist = "belt";
o.role = "guard";
o.shoes = 0x141414;
o.shoeKind = "boots";
}
else if (is(/underground|railway|train|station|ticket|conductor|signal|track walker|porter|driver|tram|bus/)) {
o.top = 0x1E2F6E;
o.bottom = 0x1C2233;
o.layer = "uniform";
o.layerColor = 0x1E2F6E;
o.hat = "cap";
o.hatColor = 0x1E2F6E;
o.shoeKind = "shoes";
}
else if (is(/post|courier|messenger|letter|parcel/)) {
o.top = 0x2E4E8A;
o.bottom = 0x1E2638;
o.layer = "uniform";
o.layerColor = 0x2E4E8A;
o.hat = "cap";
o.hatColor = 0x2E4E8A;
o.waist = "satchel";
}
else if (is(/nurse|doctor|surgeon|physician|healer|medic|apothecar|chemist|alchem|scientist|laborator|vet\b|dentist|hospital|infirmary/)) {
o.top = 0xE8EEF2;
o.bottom = 0x5A7A9A;
o.layer = "labcoat";
if (is(/nurse/)) {
o.top = 0x6A9AC8;
o.bottom = 0x6A9AC8;
}
}
else if (is(/priest|acolyte|monk|nun|oracle|cleric|shaman|druid|temple|shrine|chapel|abbey/)) {
o.top = 0xF2EEE6;
o.bottom = 0xF2EEE6;
o.layer = "tunic";
o.layerColor = 0xE8DCC0;
o.back = "cloak";
o.backColor = 0x6A3A6A;
o.shoeKind = "sandals";
}
else if (is(/judge|magistrate|advocate|lawyer|barrister|counsel|prosecut|defen[cs]e/)) {
o.top = 0x141418;
o.bottom = 0x141418;
o.layer = "suit";
o.layerColor = 0x141418;
o.back = "cape";
o.backColor = 0x141418;
o.neck = "bowtie";
}
else if (is(/clerk|teller|bank|treasur|account|registrar|cashier|notary|manager|broker|assessor|auditor|secretary|office/)) {
o.top = 0xEDEBE6;
o.bottom = 0x26262E;
o.layer = "suit";
o.layerColor = 0x2A2C36;
o.shoeKind = "shoes";
}
else if (is(/librar|archiv|curator|museum|scribe|teacher|tutor|professor|scholar|school/)) {
o.top = 0xDDD3C2;
o.bottom = 0x4A4036;
o.layer = "vest";
o.layerColor = 0x5A4A3A;
o.face = "glasses";
}
else if (is(/bak|pastry|confection|cook|chef|kitchen|butcher|brewer|cheese|grocer|deli/)) {
o.top = 0xF4F1EA;
o.bottom = 0x3A3A40;
o.layer = "apron";
o.layerColor = 0xE2D3B0;
o.hat = "bandana";
o.hatColor = 0xF4F1EA;
}
else if (is(/bar|tavern|pub|inn\b|innkeep|hotel|waiter|waitress|server|host|sommelier|saloon|cafe|tea ?room/)) {
o.top = 0xF2EEE6;
o.bottom = 0x1C1C20;
o.layer = "vest";
o.layerColor = 0x3A1E22;
o.neck = "bowtie";
o.accColor = 0x7A1A22;
}
else if (is(/usher|projection|picture house|cinema|theat|actor|musician|singer|dancer|croupier|casino|club/)) {
o.top = 0xF2EEE6;
o.bottom = 0x141418;
o.layer = "vest";
o.layerColor = 0x7A1A22;
o.neck = "bowtie";
o.accColor = 0x141418;
}
else if (is(/smith|forge|farrier|miner|mine\b|quarry|mason|carpenter|joiner|wright|charcoal|glaz|plumb|tinker|cooper|tanner|builder/)) {
o.top = 0x8A7A62;
o.bottom = 0x3A3026;
o.layer = "apron";
o.layerColor = 0x5A3A22;
o.hands = "gloves";
o.shoeKind = "boots";
o.gear = "vestbelt";
o.gearColor = 0x5A3A22;
}
else if (is(/farm|shepherd|dairy|forester|garden|groundskeeper|harvest|orchard|field|herd|stable|groom|beekeep/)) {
o.top = 0x7A8A4A;
o.bottom = 0x5A4632;
o.hat = "brimmed";
o.hatColor = 0x9A7A4A;
o.shoeKind = "boots";
o.waist = "belt";
}
else if (is(/hunter|ranger|trapper|scout/)) {
o.top = 0x3A4A30;
o.bottom = 0x3A3026;
o.back = "cloak";
o.backColor = 0x2E3A2A;
o.hat = "hood";
o.role = "hunter";
o.shoeKind = "boots";
}
else if (is(/fish|sailor|dock|boat|ferry|harbour|harbor|quay|deckhand/)) {
o.top = 0x2A3A5A;
o.bottom = 0x3A3A44;
o.layer = "sweater";
o.layerColor = 0x2A3A5A;
o.hat = "beanie";
o.hatColor = 0x8A2E2E;
o.shoeKind = "boots";
}
else if (is(/lamp|sweep|clean|janitor|street|refuse|bin|road|warehouse|stock|loader|haul|wholesale|labour|labor/)) {
o.top = 0x6A6A5A;
o.bottom = 0x3A3A3A;
o.layer = "apron";
o.layerColor = 0x4A4A40;
o.hat = "cap";
o.hatColor = 0x3A3A3A;
o.shoeKind = "boots";
}
else if (is(/tailor|decorat|florist|shop|stall|merchant|vendor|trader|seller|clerk|assistant|market|mall|store/)) {
o.top = 0xEDE6DA;
o.bottom = 0x3A3A44;
o.layer = "apron";
o.layerColor = 0x3E6A5A;
}
else if (is(/wizard|mage|witch|enchant|sorcer|magic|arcane|seer/)) {
o.top = 0x2F3E7E;
o.bottom = 0x2F3E7E;
o.layer = "tunic";
o.layerColor = 0x2F3E7E;
o.back = "cloak";
o.backColor = 0x23285A;
o.hat = "wizard";
o.hatColor = 0x23285A;
}
else {
o.top = 0xDCD4C4;
o.bottom = 0x3A3A44;
o.layer = "vest";
o.layerColor = 0x4A5A6A;
}
return o;
}
function jobDress(L, title, place) {
var o = jobWear(title, place);
L = L || {};
if (!o.hat)
L.hat = null;
if (!o.back)
L.back = null;
if (o.shoes == null)
L.shoes = 0x2A2420;
if (L.sex === "f" && L.hairStyle === "bald")
L.hairStyle = "bun";
Object.keys(o).forEach(function (k) { L[k] = o[k]; });
if (o.layer && L.gear && !o.gear)
L.gear = "none";
L.job = title || "";
return L;
}
(function () {
if (typeof tempLook !== "function")
return;
var tl = tempLook;
tempLook = function (t) {
var L = tl.apply(this, arguments);
try {
if (t && t.post && t.mode !== "fly")
jobDress(L, t.post.title, t.post.workplace);
else if (t && t.mode === "fly") {
L.hat = "helmet";
L.hatColor = 0x141A2A;
L.role = "rider";
}
}
catch (e) { }
return L;
};
})();
function hdfDye(mat, col) { return __ZC(154, 0, this, arguments, new.target); }
(function () {
if (typeof buildDeity !== "function")
return;
var bd = buildDeity;
buildDeity = function (spec) { if (spec && spec.deity && typeof lookOf === "function")
try {
lookOf(spec).hdDye = 1;
}
catch (e) { } return bd.apply(this, arguments); };
})();
var LIVE_SLEEVED = { uniform: 1, suit: 1, labcoat: 1, jacket: 1, longcoat: 1, sweater: 1, tunic: 1, hoodie: 1, kimono: 1, armor: 1 };
(function () {
if (typeof hdfDress !== "function")
return;
var hd = hdfDress;
hdfDress = function (mesh, L, part) {
if (!part || !L)
return hd.apply(this, arguments);
var lay = L.layer, lc = L.layerColor != null ? L.layerColor : L.top;
var col = /legs/.test(part) ? L.bottom : /feet/.test(part) ? (L.shoes != null ? L.shoes : 0x2A2420) : /hood/.test(part) ? (L.hatColor != null ? L.hatColor : lc)
: /arms/.test(part) ? (LIVE_SLEEVED[lay] ? lc : L.top) : /body/.test(part) ? (lay ? lc : L.top) : /pauldron/.test(part) ? lc : null;
if (col == null)
return hd.apply(this, arguments);
var conv = function (m) { var c = hdfColourFor(m.name, L); if (c)
return hd === null ? m : (c.skin !== undefined ? hdfSkinMat(m, c.skin) : hdfTint(m, c.tint, c.k)); return hdfDye(m, col); };
mesh.material = Array.isArray(mesh.material) ? mesh.material.map(conv) : conv(mesh.material);
};
})();
var JOB_GUESS = [
[/bakery|bakehouse/i, ["Baker", "Pastry cook", "Counter assistant"]], [/tavern|\bpub\b|alehouse/i, ["Barkeep", "Server", "Cook"]],
[/\binn\b|hotel/i, ["Innkeeper", "Porter", "Cook"]], [/courthouse|court\b/i, ["Magistrate", "Court clerk", "Advocate", "Bailiff"]],
[/roost|dragon/i, ["Dragon rider", "Dispatcher", "Stable hand"]], [/treasury|bank/i, ["Teller", "Treasurer", "Accountant"]],
[/land office|registry|licen/i, ["Land clerk", "Registrar"]], [/archive|library/i, ["Librarian", "Archivist", "Scribe"]],
[/map house/i, ["Cartographer", "Map clerk"]], [/museum|gallery/i, ["Curator", "Guide"]],
[/hospital|infirmary|clinic/i, ["Nurse", "Doctor", "Orderly"]], [/apothecar|chemist/i, ["Apothecary", "Assistant"]], [/herbalist/i, ["Herbalist"]],
[/vestry|temple|shrine|chapel|'s house/i, ["Priest", "Acolyte", "Verger"]], [/smithy|forge/i, ["Blacksmith", "Apprentice smith"]],
[/post office/i, ["Postal clerk", "Postman"]], [/chronicle|press\b/i, ["Reporter", "Printer", "Editor"]], [/print shop/i, ["Printer"]],
[/gate lodge/i, ["Gatekeeper", "Watchman"]], [/runners/i, ["Runner", "Courier"]], [/gardeners/i, ["Gardener", "Groundskeeper"]],
[/undertaker/i, ["Undertaker"]], [/general store|chandlery/i, ["Shopkeeper", "Shop assistant"]], [/brewhouse|brewery/i, ["Brewer", "Cellarman"]],
[/barber/i, ["Barber"]], [/butcher/i, ["Butcher"]], [/greengrocer|grocer/i, ["Greengrocer"]], [/toy shop/i, ["Toymaker"]],
[/bindery/i, ["Bookbinder"]], [/jewel/i, ["Jeweller"]], [/cookhouse|kitchen/i, ["Cook", "Kitchen hand"]], [/tailor|outfitter/i, ["Tailor", "Seamstress"]],
[/cobbler/i, ["Cobbler"]], [/weaving/i, ["Weaver"]], [/florist/i, ["Florist"]], [/pottery/i, ["Potter"]], [/watchmaker/i, ["Watchmaker"]],
[/sign shop/i, ["Signwriter"]], [/stables/i, ["Groom", "Stable hand"]], [/school|academy|college/i, ["Teacher", "Tutor"]],
[/transport depot/i, ["Driver", "Depot clerk"]], [/joinery/i, ["Joiner"]], [/masons/i, ["Mason"]], [/glassworks/i, ["Glassblower"]],
[/engine house|waterworks/i, ["Engineer", "Stoker"]], [/city depot|warehouse|wholesale/i, ["Warehouse hand", "Stock clerk"]],
[/wheelwright/i, ["Wheelwright"]], [/reactor/i, ["Reactor technician"]], [/biodome/i, ["Botanist"]], [/menagerie/i, ["Keeper"]],
[/gaol|jail|prison/i, ["Gaoler", "Warden"]], [/pit office|mine head|mine\b/i, ["Miner", "Pit clerk"]], [/sawmill/i, ["Sawyer"]],
[/charcoal/i, ["Charcoal burner"]], [/forester/i, ["Forester"]], [/farmhouse|farm\b/i, ["Farmhand", "Farmer"]], [/dairy/i, ["Dairymaid"]],
[/\bmill\b/i, ["Miller"]], [/sheepfold/i, ["Shepherd"]], [/dock office|harbourmaster|harbor/i, ["Dock clerk", "Harbourmaster"]],
[/fish quay/i, ["Fishmonger", "Docker"]], [/ferry light|lighthouse/i, ["Lighthouse keeper", "Ferryman"]], [/hunters/i, ["Hunter"]],
[/market|bazaar|stall/i, ["Stallholder", "Market trader"]], [/picture house|cinema|theatre|theater/i, ["Projectionist", "Usher", "Ticket seller"]],
[/spaceport|space corp/i, ["Space Corp commander", "Patrol pilot", "Survey officer", "Settlement engineer", "Launch controller", "Station quartermaster", "Contact officer", "Shuttle captain", "First officer", "Cabin crew", "Departures agent"]],
[/underground|station|railway/i, ["Ticket clerk", "Station master", "Platform guard"]], [/guild|decorat/i, ["Decorator"]],
[/mall|shop|store|emporium/i, ["Shop assistant"]], [/office|hall/i, ["Clerk"]], [/lodge/i, ["Lodge keeper"]]
];
function jobGuess(wp, i) {
for (var k = 0; k < JOB_GUESS.length; k++)
if (JOB_GUESS[k][0].test(wp)) {
var a = JOB_GUESS[k][1];
return a[(i || 0) % a.length];
}
return "Attendant";
}
function liveHeldHere(t) { return __ZC(154, 1, this, arguments, new.target); }
(function () {
if (typeof tempsPlan !== "function")
return;
var tp = tempsPlan;
tempsPlan = function (rows) {
var real = Array.isArray(rows) && rows.length;
if (real) {
try {
localStorage.setItem("somnu_jobboard", JSON.stringify(rows.map(function (r) { return { job_id: r.job_id, title: r.title, positions: r.positions, taken: r.taken, panel: r.panel, workplace: r.workplace, roams: r.roams }; })));
}
catch (e) { }
}
else {
try {
var c = JSON.parse(localStorage.getItem("somnu_jobboard") || "null");
if (Array.isArray(c) && c.length) {
rows = c;
real = true;
}
}
catch (e) { }
}
if (!real && typeof WORKPLACES !== "undefined" && store.workplaceAt) {
rows = [];
WORKPLACES.forEach(function (w) {
if (!store.workplaceAt[w.key])
return;
(w.jobs || []).forEach(function (j, i) { rows.push({ job_id: j, title: jobGuess(w.key, i), positions: 1, taken: 0, panel: null, workplace: w.key, roams: false }); });
});
}
var held = {};
if (Array.isArray(rows))
rows = rows.map(function (r) {
var pos = +r.positions || 0, tk = Math.min(pos, +r.taken || 0);
held[r.job_id] = { open: pos - tk };
var c = {};
for (var k in r)
c[k] = r[k];
c.taken = 0;
return c;
});
var out = tp.call(this, rows);
try {
TEMPS.list.forEach(function (t) { var h = held[t.post.job]; t.held = !!(h && t.post.k >= h.open); });
}
catch (e) { }
return out;
};
if (typeof tempOnShift === "function") {
var ts = tempOnShift;
tempOnShift = function (t) { if (t && t.held && liveHeldHere(t))
return false; return ts.apply(this, arguments); };
}
})();
function liveScan() {
var figs = [], crit = [];
(function walk(o) {
if (!o)
return;
var u = o.userData;
if (u) {
if (u.limbs && u.limbs.la && u.limbs.ra && !u.__lv) {
u.__lv = { ph: Math.random() * 20, last: {}, base: {}, px: null, pz: null, spd: 0 };
}
if (u.limbs && u.__lv)
figs.push(o);
}
var c = o.children;
if (c)
for (var i = 0; i < c.length; i++) {
if (c[i] && c[i].visible === false)
continue;
walk(c[i]);
}
})(scene);
for (var id in meshes) {
var m = meshes[id], s = specById ? specById(id) : null;
if (!s || !m.visible)
continue;
if (m.userData.limbs || m.userData.__crit === false)
continue;
var def = KIT[s.archetype], beast = typeof CREATURE !== "undefined" && CREATURE[s.archetype] && CREATURE[s.archetype].kind === "beast";
if (!(def && def.cat === "being") && !beast)
continue;
if (typeof isPerson === "function" && isPerson(s))
continue;
if (!m.userData.__crit)
critRig(m, beast);
if (m.userData.__crit)
crit.push(m);
}
LIVE.figs = figs;
LIVE.crit = crit;
}
function liveVis(o) { var p = o, n = 0; while (p && n < 8) {
if (p.visible === false)
return false;
p = p.parent;
n++;
} return true; }
function liveFigs(dt, t) {
if (typeof camera === "undefined" || !camera)
return;
var cam = camera.position, v = LIVE.v || (LIVE.v = new THREE.Vector3());
for (var i = 0; i < LIVE.figs.length; i++) {
var g = LIVE.figs[i], S = g.userData.__lv, L = g.userData.limbs;
if (!g.parent || !liveVis(g))
continue;
g.getWorldPosition(v);
var dx = v.x - cam.x, dz = v.z - cam.z;
if (dx * dx + dz * dz > 90 * 90) {
S.px = null;
continue;
}
var sp = 0;
if (S.px !== null && dt > 0)
sp = Math.hypot(v.x - S.px, v.z - S.pz) / dt;
S.px = v.x;
S.pz = v.z;
S.spd += (Math.min(sp, 10) - S.spd) * Math.min(1, dt * 5);
var k = S.spd > 0.3 ? 0.2 : 1, ph = S.ph;
var off = {
la: [Math.sin(t * 1.05 + ph) * 0.07 + Math.sin(t * 0.31 + ph * 2) * 0.05, Math.sin(t * 0.8 + ph) * 0.025],
ra: [Math.sin(t * 1.05 + ph + 1.4) * 0.07 + Math.sin(t * 0.27 + ph) * 0.05, -Math.sin(t * 0.8 + ph + 0.6) * 0.025],
ll: [Math.sin(t * 0.23 + ph) * 0.03, 0], rl: [-Math.sin(t * 0.23 + ph) * 0.03, 0]
};
var gest = Math.sin(t * 0.37 + ph * 3);
if (gest > 0.82 && k === 1)
off.ra[0] -= (gest - 0.82) * 3.2;
for (var key in off) {
var l = L[key];
if (!l || !l.rotation)
continue;
var lx = S.last[key];
if (!lx || Math.abs(l.rotation.x - lx[0]) > 1e-5 || Math.abs(l.rotation.z - lx[1]) > 1e-5)
S.base[key] = [l.rotation.x, l.rotation.z];
var b = S.base[key], nx = b[0] + off[key][0] * k, nz = b[1] + off[key][1] * k;
l.rotation.x = nx;
l.rotation.z = nz;
S.last[key] = [nx, nz];
}
var body = g.children[0];
if (body && body.scale) {
var by = S.last.by;
if (by === undefined || Math.abs(body.scale.y - by) > 1e-5)
S.base.by = body.scale.y;
var ny = S.base.by * (1 + Math.sin(t * 1.7 + ph) * 0.012 * k);
body.scale.y = ny;
S.last.by = ny;
var bz = S.last.bz;
if (bz === undefined || Math.abs(body.rotation.z - bz) > 1e-5)
S.base.bz = body.rotation.z;
var nz2 = S.base.bz + Math.sin(t * 0.23 + ph) * 0.018 * k;
body.rotation.z = nz2;
S.last.bz = nz2;
}
}
}
function critRig(m, beast) {
var root = beast ? m.children[0] : m;
if (!root) {
m.userData.__crit = false;
return;
}
m.updateMatrixWorld(true);
var box = new THREE.Box3().setFromObject(root), ws = new THREE.Vector3();
root.getWorldScale(ws);
var H = (box.max.y - box.min.y) / (ws.y || 1);
var legs = [], tail = null, head = null, hy = -1, kids = root.children.slice();
kids.forEach(function (c) {
if (!c.isMesh || !c.geometry || c.userData.contact)
return;
var gp = c.geometry.parameters || {}, ty = c.geometry.type;
if (ty === "CylinderGeometry" && Math.abs(c.rotation.x) < 0.05 && Math.abs(c.rotation.z) < 0.05 && c.position.y < H * 0.42 && (gp.height || 0) < H * 0.75)
legs.push(c);
else if (ty === "CylinderGeometry" && Math.abs(c.rotation.x) > 0.3 && c.position.z < 0 && !tail)
tail = c;
else if ((ty === "SphereGeometry" || c.type === "Group") && c.position.z > 0.1 && c.position.y > hy) {
hy = c.position.y;
head = c;
}
});
if (beast)
root.children.forEach(function (c) { if (c.type === "Group" && c.position.z > 0.6 && c.position.y > hy && !c.userData.flap) {
hy = c.position.y;
head = c;
} });
var tall = legs.filter(function (c) { return (c.geometry.parameters.height || 0) > 0.12; });
if (tall.length < 2) {
m.userData.__crit = false;
return;
}
var hips = [];
tall.forEach(function (c) {
var h = c.geometry.parameters.height, top = c.position.y + h / 2;
var hip = new THREE.Group();
hip.position.set(c.position.x, top, c.position.z);
root.add(hip);
root.remove(c);
c.position.set(0, -h / 2, 0);
hip.add(c);
legs.forEach(function (q) { if (q !== c && q.parent === root && Math.abs(q.position.x - hip.position.x) < 0.02 && Math.abs(q.position.z - hip.position.z) < 0.02) {
root.remove(q);
q.position.set(0, q.position.y - top, 0);
hip.add(q);
} });
hip.userData.side = ((c.position.x > 0) !== (c.position.z > 0)) ? 0 : Math.PI;
hips.push(hip);
});
m.userData.__crit = { hips: hips, tail: tail, tailZ: tail ? tail.rotation.z : 0, head: head, headX: head ? head.rotation.x : 0, headY: head ? head.rotation.y : 0,
root: root, ph: Math.random() * 20, px: null, pz: null, spd: 0, walk: 0 };
}
function liveCrit(dt, t) {
var cam = camera.position;
for (var i = 0; i < LIVE.crit.length; i++) {
var m = LIVE.crit[i], C = m.userData.__crit;
if (!C || !m.parent || !m.visible)
continue;
var dx = m.position.x - cam.x, dz = m.position.z - cam.z;
if (dx * dx + dz * dz > 120 * 120) {
C.px = null;
continue;
}
var sp = 0;
if (C.px !== null && dt > 0)
sp = Math.hypot(m.position.x - C.px, m.position.z - C.pz) / dt;
C.px = m.position.x;
C.pz = m.position.z;
C.spd += (Math.min(sp, 14) - C.spd) * Math.min(1, dt * 5);
var walk = Math.min(1, C.spd / 1.2);
C.walk += dt * (2 + C.spd * 3.2);
C.hips.forEach(function (h) { h.rotation.x = Math.sin(C.walk + h.userData.side) * 0.55 * walk + Math.sin(t * 0.4 + C.ph + h.userData.side) * 0.03 * (1 - walk); });
if (C.tail)
C.tail.rotation.z = C.tailZ + Math.sin(t * (walk > 0.2 ? 5 : 2.4) + C.ph) * 0.35;
if (C.head) {
var look = Math.sin(t * 0.29 + C.ph) * 0.35 * (1 - walk), sniff = Math.max(0, Math.sin(t * 0.17 + C.ph * 2) - 0.7) * 1.1 * (1 - walk);
C.head.rotation.y = C.headY + look;
C.head.rotation.x = C.headX + sniff + Math.sin(C.walk * 2) * 0.04 * walk;
}
if (C.root !== m)
C.root.position.y = Math.abs(Math.sin(C.walk)) * 0.04 * walk + Math.sin(t * 1.5 + C.ph) * 0.006;
}
}
var WIND = { t: { value: 0 } };
function windify(mat, baseOff, amp, height) {
if (!mat || !mat.isMaterial || (mat.userData && mat.userData.wind))
return mat;
mat.userData = mat.userData || {};
mat.userData.wind = 1;
var prev = mat.onBeforeCompile, prevKey = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : null;
var U = { b: { value: baseOff || 0 }, a: { value: amp == null ? 0.22 : amp }, h: { value: height || 8 } };
mat.onBeforeCompile = function (sh, r) {
if (prev)
prev.call(this, sh, r);
sh.uniforms.uWindT = WIND.t;
sh.uniforms.uWindBase = U.b;
sh.uniforms.uWindAmp = U.a;
sh.uniforms.uWindH = U.h;
sh.vertexShader = "uniform float uWindT;\nuniform float uWindBase;\nuniform float uWindAmp;\nuniform float uWindH;\n" +
sh.vertexShader.replace("#include <project_vertex>", [
"vec4 wOrg = vec4(0.0,0.0,0.0,1.0);",
"vec4 wPos = vec4(transformed,1.0);",
"#ifdef USE_INSTANCING",
" wOrg = instanceMatrix * wOrg; wPos = instanceMatrix * wPos;",
"#endif",
"wOrg = modelMatrix * wOrg; wPos = modelMatrix * wPos;",
"float wH = max(0.0, wPos.y - wOrg.y + uWindBase) / uWindH;",
"float wB = wH * wH;",
"float wPh = wOrg.x * 0.045 + wOrg.z * 0.037;",
"float wS = sin(uWindT * 1.1 + wPh) * 0.7 + sin(uWindT * 2.3 + wPh * 1.7) * 0.3;",
"float wF = sin(uWindT * 4.6 + wPos.x * 0.8 + wPos.y * 0.6 + wPos.z * 0.7) * 0.05 * min(wH, 1.4);",
"wPos.x += (wS * uWindAmp + wF) * wB;",
"wPos.z += (wS * uWindAmp * 0.55 + wF) * wB;",
"vec4 mvPosition = viewMatrix * wPos;",
"gl_Position = projectionMatrix * mvPosition;"
].join("\n"));
};
mat.customProgramCacheKey = function () { return (prevKey ? prevKey() : "") + "|wind"; };
mat.needsUpdate = true;
return mat;
}
var LIVE_SMOKY = /cottage|house|home|farmhouse|manor|inn\b|tavern|pub|bakery|bakehouse|kitchen|smith|forge|lodge|hut|cabin|tenement|terrace|villa|izba|longhouse|roundhouse|restaurant|cafe/i;
function liveOwnDoor(s) {
var g = meshes[s.id];
if (!g)
return false;
if (g.userData.modelled || g.userData.dbDoorObj)
return true;
return typeof restylesDoor === "function" && !s.city && !!restylesDoor(s);
}
function liveDoor(m, s) {
var def = KIT[s.archetype];
if (!def || def.cat !== "structure")
return null;
if (liveOwnDoor(s))
return null;
var parts;
try {
parts = levelParts(def, s);
}
catch (e) {
parts = def.parts || [];
}
var d = (typeof frontDoorOf === "function") ? frontDoorOf(parts) : null;
if (!d)
return null;
var w = d.s[0], h = d.s[1], piv = new THREE.Group(), front = d.p[2] + d.s[2] / 2 + 0.03;
piv.position.set(d.p[0] - w / 2, d.p[1] - h / 2, front);
piv.userData.lvDoor = 1;
var leaf = new THREE.Mesh(new THREE.BoxGeometry(w * 0.98, h * 0.98, 0.07), new THREE.MeshLambertMaterial({ color: 0x5A3A24 }));
leaf.geometry.translate(w * 0.49, h * 0.49, 0);
piv.add(leaf);
var knob = new THREE.Mesh(new THREE.SphereGeometry(Math.min(0.07, w * 0.05), 8, 6), new THREE.MeshLambertMaterial({ color: 0xC9A04A }));
knob.position.set(w * 0.85, h * 0.45, 0.07);
piv.add(knob);
[0.25, 0.75].forEach(function (f) { var st = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 0.05, 0.02), new THREE.MeshLambertMaterial({ color: 0x3A2416 })); st.position.set(w * 0.49, h * f, 0.045); piv.add(st); });
piv.traverse(function (c) { c.raycast = function () { }; });
m.add(piv);
return { piv: piv, open: 0, local: new THREE.Vector3(d.p[0], 0, front + 1.2) };
}
var LIVE_SIGNS = {};
function liveSignTex(text) { return __ZC(154, 2, this, arguments, new.target); }
function liveSign(m, s) {
if (!s.workplace || typeof signTexture !== "function")
return null;
var def = KIT[s.archetype];
if (!def || def.cat !== "structure")
return null;
var parts;
try {
parts = levelParts(def, s);
}
catch (e) {
parts = def.parts || [];
}
var d = (typeof frontDoorOf === "function") ? frontDoorOf(parts) : null, B = bodyOf(parts);
if (!B)
return null;
var sx = m.scale.x || 1, sy = m.scale.y || 1;
var x = d ? d.p[0] + d.s[0] / 2 + 0.9 / sx : B.x + B.w * 0.3, y = d ? Math.min(d.p[1] + d.s[1] / 2 + 0.9 / sy, B.h - 0.4) : Math.min(3.4 / sy, B.h - 0.4), z = B.z + B.d / 2;
var arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.9), new THREE.MeshLambertMaterial({ color: 0x1E1C1A }));
var hold = new THREE.Group();
hold.position.set(x, y, z);
hold.scale.set(1 / sx, 1 / sy, 1 / (m.scale.z || 1));
m.add(hold);
arm.position.set(0, 0, 0.95);
hold.add(arm);
var piv = new THREE.Group();
piv.position.set(0, -0.03, 1.05);
hold.add(piv);
var tex = liveSignTex(String(s.workplace).replace(/^The /, ""));
var board = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 1.5), [0, 0, 0, 0, 0, 0].map(function (_, i) { return i < 2 ? new THREE.MeshLambertMaterial({ map: tex, emissive: 0x2A261E }) : new THREE.MeshLambertMaterial({ color: 0x5A3A22 }); }));
board.rotation.y = 0;
board.position.y = -0.47;
piv.add(board);
[-0.6, 0.6].forEach(function (o) { var ch = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.08, 0.015), new THREE.MeshLambertMaterial({ color: 0x1E1C1A })); ch.position.set(0, -0.04, o); piv.add(ch); });
hold.traverse(function (c) { c.raycast = function () { }; });
return { piv: piv };
}
function liveHolder(s) {
var a = s.attrs || {}, g = new THREE.Group();
g.position.set(s.x, (typeof terrainY === "function") ? terrainY(s.x, s.z) + (s.y || 0) : 0, s.z);
g.rotation.y = s.rot || 0;
g.scale.set((a.s || 1) * (a.w || 1), (a.s || 1) * (a.h || 1), (a.s || 1) * (a.d || 1));
scene.add(g);
g.updateMatrixWorld(true);
return g;
}
function liveBuildings(dt, t) {
var cam = camera.position, here = store.here || 0;
var nowB = performance.now();
if (nowB >= LIVE.blAt) {
LIVE.blAt = nowB + 1200;
var near = [], smokers = [], seen = {};
for (var i = 0; i < store.objects.length; i++) {
var s = store.objects[i];
if ((s.realm || 0) !== here)
continue;
var dx = s.x - cam.x, dz = s.z - cam.z;
if (dx > 170 || dx < -170 || dz > 170 || dz < -170)
continue;
var d2 = dx * dx + dz * dz;
if (d2 > 170 * 170)
continue;
var def = KIT[s.archetype];
if (!def || def.cat !== "structure")
continue;
if (typeof isHidden === "function" && isHidden(s))
continue;
if (LIVE_SMOKY.test(s.archetype + " " + (s.workplace || "") + " " + (s.label || "")))
smokers.push({ s: s, d2: d2 });
if (d2 > 75 * 75)
continue;
var B = LIVE.bl[s.id];
if (!B) {
B = LIVE.bl[s.id] = { s: s, h: liveHolder(s), door: null, sign: null, x: s.x, z: s.z };
try {
B.door = liveDoor(B.h, s);
}
catch (e) { }
try {
B.sign = liveSign(B.h, s);
}
catch (e) { }
if (!B.door && !B.sign) {
scene.remove(B.h);
B.h = null;
}
}
seen[s.id] = 1;
near.push(B);
}
LIVE.near = near;
Object.keys(LIVE.bl).forEach(function (k) {
var B = LIVE.bl[k], o = specById ? specById(k) : null;
if (!seen[k] || !o || o.x !== B.x || o.z !== B.z) {
if (B.h)
scene.remove(B.h);
delete LIVE.bl[k];
}
});
smokers.sort(function (a, b) { return a.d2 - b.d2; });
liveSmoke(smokers.slice(0, 10));
}
var walkers = livePeopleNear(), V = LIVE.dv || (LIVE.dv = new THREE.Vector3());
(LIVE.near || []).forEach(function (B) {
if (!B.h)
return;
if (B.door && liveOwnDoor(B.s)) {
B.h.remove(B.door.piv);
B.door = null;
}
if (B.door) {
var D = B.door, w = V.copy(D.local).applyMatrix4(B.h.matrixWorld), want = 0;
for (var i = 0; i < walkers.length; i++) {
var p = walkers[i];
if (Math.abs(p.x - w.x) < p.r && Math.abs(p.z - w.z) < p.r && Math.hypot(p.x - w.x, p.z - w.z) < p.r) {
want = 1;
break;
}
}
D.open += (want - D.open) * Math.min(1, dt * 3.2);
D.piv.rotation.y = D.open * 1.45;
}
if (B.sign)
B.sign.piv.rotation.z = Math.sin(t * 1.3 + B.x * 0.1) * 0.09 + Math.sin(t * 2.9 + B.z) * 0.03;
});
}
function liveHideBuildings() { Object.keys(LIVE.bl).forEach(function (k) { var B = LIVE.bl[k]; if (B.h)
scene.remove(B.h); }); LIVE.bl = {}; LIVE.near = []; }
function livePeopleNear() {
var out = [{ x: camera.position.x, z: camera.position.z, r: 3.2 }];
try {
if (typeof TEMPS !== "undefined")
for (var id in TEMPS.shown) {
var g = TEMPS.shown[id].g;
if (g && g.visible)
out.push({ x: g.position.x, z: g.position.z, r: 1.3 });
}
}
catch (e) { }
try {
if (typeof CC !== "undefined")
CC.pool.forEach(function (p) { if (p && p.state === "walk")
out.push({ x: p.g.position.x, z: p.g.position.z, r: 1.6 }); });
}
catch (e) { }
try {
for (var mid in meshes) {
var m = meshes[mid];
if (m.userData.limbs && m.visible && m.userData.target)
out.push({ x: m.position.x, z: m.position.z, r: 1.6 });
}
}
catch (e) { }
return out;
}
function liveSmoke(list) {
if (typeof particles !== "function")
return;
while (LIVE.smoke.length < list.length) {
var p = particles(26, [.8, 7, .8], 0x8A8680, 2.2, 0.32);
p.visible = false;
scene.add(p);
LIVE.smoke.push({ p: p, at: null });
}
LIVE.smoke.forEach(function (S, i) {
var q = list[i];
if (!q || store.inside) {
S.p.visible = false;
S.at = null;
return;
}
if (S.at !== q.s) {
var def = KIT[q.s.archetype], parts;
try {
parts = levelParts(def, q.s);
}
catch (e) {
parts = def.parts || [];
}
var B = bodyOf(parts) || { w: def.size[0], h: def.size[1], d: def.size[2], x: 0, z: 0 };
var top = 0;
parts.forEach(function (pt) { if (pt.p && pt.s)
top = Math.max(top, pt.p[1] + (pt.s[1] || 0) / 2); });
var a = q.s.attrs || {}, sc = a.s || 1, lx = (B.x + B.w * 0.28) * sc * (a.w || 1), lz = (B.z - B.d * 0.18) * sc * (a.d || 1), ly = Math.max(B.h, top * 0.92) * sc * (a.h || 1);
var r = q.s.rot || 0, c = Math.cos(r), sn = Math.sin(r);
S.p.position.set(q.s.x + lx * c + lz * sn, ((typeof terrainY === "function") ? terrainY(q.s.x, q.s.z) : 0) + ly, q.s.z - lx * sn + lz * c);
S.at = q.s;
}
S.p.visible = true;
});
}
(function () {
if (typeof EFFECTS !== "undefined" && KIT.lighthouse && !EFFECTS.lighthouse)
EFFECTS.lighthouse = function (g) {
var d = KIT.lighthouse, top = d.size[1] * 0.9, piv = new THREE.Group();
piv.position.y = top;
g.add(piv);
var beam = new THREE.Mesh(new THREE.ConeGeometry(2.4, 26, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFF2C0, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide }));
beam.geometry.translate(0, -13, 0);
beam.rotation.z = Math.PI / 2;
piv.add(beam);
var b2 = beam.clone();
b2.rotation.z = -Math.PI / 2;
piv.add(b2);
return function (t, dt) { piv.rotation.y += dt * 0.8; };
};
})();
(function () {
var last = performance.now();
function loop() {
var now = performance.now(), dt = Math.min(0.1, (now - last) / 1000);
last = now;
LIVE.t += dt;
WIND.t.value = LIVE.t;
try {
if (typeof camera === "undefined" || !camera)
throw 0;
if (now >= LIVE.scanAt) {
LIVE.scanAt = now + 1000;
liveScan();
}
liveFigs(dt, LIVE.t);
liveCrit(dt, LIVE.t);
if (typeof walkMode !== "undefined" && walkMode && !store.inside)
liveBuildings(dt, LIVE.t);
else {
if (LIVE.smoke.length)
LIVE.smoke.forEach(function (S) { S.p.visible = false; S.at = null; });
if (store.inside && LIVE.near && LIVE.near.length)
liveHideBuildings();
}
if (LIVE.smoke.length && typeof rise === "function")
LIVE.smoke.forEach(function (S) { if (S.p.visible)
rise(S.p, dt, 1.1, 0.3); });
}
catch (e) {
if (e !== 0 && window.console && !LIVE.warned) {
LIVE.warned = 1;
console.warn("living city:", e);
}
}
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
function liveHours(title, place) {
var w = (String(title || "") + " " + String(place || "")).toLowerCase();
if (typeof SHIFTS !== "undefined" && SHIFTS.map && SHIFTS.map[title]) {
var sh = SHIFTS.map[title];
if (sh && sh.start1 != null && sh.len1 != null && sh.start2 == null)
return [+sh.start1, (+sh.start1 + +sh.len1) % 24];
}
if (/nurse|doctor|surgeon|guard|gaol|warden|officer|constable|police|dragon|watchman|night watch|the watch\b|dispatch|hospital|infirmary|signal/.test(w))
return null;
if (/\binn\b|innkeep|hotel|lodging|motel|porter/.test(w))
return [7, 2];
if (/picture house|cinema|projection|usher|box office|concession|film programmer/.test(w))
return [10, 1];
if (/\bbar\b|barkeep|barmaid|tavern|\bpub\b|saloon|casino|croupier|bouncer|dancer|musician|club|cabaret/.test(w))
return [16, 2.5];
if (/bak|pastry|market|stall|dairy|fish|grocer|milk|farm|harvest|orchard/.test(w))
return [4.5, 13];
if (/lamp|track walker|night/.test(w))
return [18, 6.5];
if (/temple|priest|acolyte|shrine/.test(w))
return [6, 21];
return [8, 18.5];
}
function liveWithin(hr, h) { if (!hr)
return true; var a = hr[0], b = hr[1]; return a < b ? (h >= a && h < b) : (h >= a || h < b); }
function liveDuty(title, place, h) {
var hr = liveHours(title, place);
if (hr && hr[0] === 8 && h >= 12 && h < 13.4 && (Math.abs(String(title).length * 7 + String(place).length) % 3) !== 0)
return "lunch";
if (liveWithin(hr, h))
return "work";
if (liveWithin(hr, (h + 0.75) % 24))
return "going";
if (liveWithin(hr, (h + 23.25) % 24))
return "home";
return "off";
}
var LIVE_OUTDOOR = /courier|post|lamp|groundskeep|decorat|sweep|clean|mason|carpenter|musician|stall|market|docker|porter|track walker|street|gardener|watch|constable/i;
var LIVE_TRADES = ["Baker", "Barkeep", "Clerk", "Teller", "Stallholder", "Mason", "Carpenter", "Nurse", "Teacher", "Librarian", "Courier", "Cook", "Tailor", "Blacksmith",
"Farmhand", "Docker", "Shop assistant", "Innkeeper", "Usher", "Musician", "Server", "Apothecary", "Lamplighter", "Ticket clerk", "Warehouse hand", "Groundskeeper", "Scribe", "Decorator"];
var LIVE_COMPANION = { dog: "dog", dogs: "dog", wolf: "wolf", wolves: "wolf", goat: "alpaca", horse: "horse", stag: "stag", bull: "cow", cow: "cow", lion: "lion", cat: "cat", cats: "cat" };
(function () {
if (typeof companion !== "function" || typeof modelsManifest !== "function")
return;
var cp = companion, n = 0;
companion = function (k) {
var q = cp.apply(this, arguments), key = LIVE_COMPANION[k];
if (!q || !key || !modelsOn())
return q;
var id = "companion:" + k + ":" + (n++);
q.userData.kitKids = q.children.slice();
modelsManifest(function (M) {
var e = M && M.a && M.a[key];
if (!e)
return;
var fs = [].concat(e.f), best = fs.filter(function (f) { return /animated-animals/.test(f); });
var spec = { id: id, archetype: key, attrs: {} }, file = modelPick({ f: best.length ? best : fs }, spec);
modelFile(file, function (F) { try {
modelSwap(q, spec, Object.assign({}, e, { all: 1 }), F);
}
catch (err) { } });
});
return q;
};
})();
var LIVE_COSY = /tavern|inn|pub|bar|bakery|house|cottage|cabin|farm|smith|forge|mill|shop|store|market|guild|brew|kitchen|cafe|tea|lodge|barn|stable|workshop|chandler|tailor|cobbler|hall|castle|keep/i;
var LIVE_GRAND = /bank|court|temple|museum|palace|library|theatre|theater|opera|cathedral|church|tower|office|hotel|exchange|treasury/i;
function liveUnmetred(g) {
var uv = g && g.attributes && g.attributes.uv;
if (!uv || !uv.array)
return false;
for (var i = 0; i < uv.array.length; i++)
if (uv.array[i] > 1.0001 || uv.array[i] < -0.0001)
return false;
return true;
}
function liveFinish(I) { return __ZC(154, 3, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
liveFinish(I);
}
catch (e) {
if (window.console)
console.warn("[rooms]", e);
}
return I;
};
})();
var LIVE_FILL = [[/tavern|inn\b|pub|bar\b|alehouse|saloon|club|casino/i, "tavern"], [/bakery|cafe|café|tea|coffee|diner|restaurant|kitchen|patisserie|creamery/i, "cafe"],
[/smith|forge|works|mill|carpent|joiner|cooper|wheelwright|garage|repair/i, "works"]];
(function () {
if (typeof planOf !== "function" || typeof fillHall !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
if (!p || p.mode !== "hall" || p.fill !== "shop" || !spec)
return p;
var what = String(spec.workplace || spec.name || "");
for (var i = 0; i < LIVE_FILL.length; i++)
if (LIVE_FILL[i][0].test(what))
return Object.assign({}, p, { fill: LIVE_FILL[i][1], floor: LIVE_FILL[i][1] === "works" ? "stone" : "wood" });
return p;
};
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
var x, z;
if (kind === "tavern") {
for (x = -W / 2 + 3; x < W / 2 - 2.5; x += 2.2)
put("counter", x, -D / 2 + 1.2, 0);
put("chandelier", 0, 0, 0);
for (z = -D / 2 + 4.5; z < D / 2 - 3.5; z += 3.4)
for (x = -W / 2 + 3; x < W / 2 - 2.5; x += 3.6) {
put("table", x, z, 0);
put("chair", x - 0.9, z, Math.PI / 2);
put("chair", x + 0.9, z, -Math.PI / 2);
}
put("rug", W / 2 - 3, D / 2 - 4, 0);
put("candles", -W / 2 + 1.2, 0, 0);
spots.push({ x: 0, z: -D / 2 + 2.4, room: "the bar" }, { x: 0, z: 0, room: "the tables" });
return;
}
if (kind === "cafe") {
put("counter", -1.2, -D / 2 + 1.4, 0);
put("counter", 1.2, -D / 2 + 1.4, 0);
put("till", 0, -D / 2 + 2.6, Math.PI);
for (z = -D / 2 + 5; z < D / 2 - 3.5; z += 3.2)
for (x = -W / 2 + 2.6; x < W / 2 - 2; x += 3.2) {
put("table", x, z, 0);
put("chair", x, z - 0.9, 0);
put("chair", x, z + 0.9, Math.PI);
}
put("plant", -W / 2 + 1, -D / 2 + 1, 0);
put("plant", W / 2 - 1, -D / 2 + 1, 0);
put("painting", 0, -D / 2 + .2, 0);
spots.push({ x: 0, z: -D / 2 + 2.6, room: "the counter" }, { x: 0, z: 0, room: "the tables" });
return;
}
if (kind === "works") {
for (z = -D / 2 + 2; z < D / 2 - 3; z += 3) {
put("workbench", -W / 2 + 1.2, z, Math.PI / 2);
put("crates", W / 2 - 1.2, z, -Math.PI / 2);
}
put("barrel", W / 2 - 1.4, -D / 2 + 1.4, 0);
put("machine", 0, -D / 2 + 2, 0);
spots.push({ x: 0, z: -D / 2 + 3.4, room: "the works" }, { x: 0, z: 0, room: "the floor" });
return;
}
return fh.apply(this, arguments);
};
})();
