/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CGAP = { tags: [], spots: [], acts: {}, places: {}, busy: false, missing: false, fishing: null, prompt: null };
function gapMissing(e) { var m = String((e && e.message) || e || ""); return /does not exist|not find the function|PGRST202|404|schema cache/i.test(m); }
function gapErr(e) {
if (gapMissing(e)) {
CGAP.missing = true;
return "This opens soon.";
}
var m = String((e && e.message) || e || "Not now.");
try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { }
return m;
}
function gapRpc(name, args) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve({ ok: false, say: "Sign in first." });
if (typeof cityRpc !== "function")
return Promise.resolve({ ok: false, say: "Not now." });
return cityRpc(name, args || {}).catch(function (e) { return { ok: false, say: gapErr(e) }; });
}
function gapSaid(o, then) { return __ZC(320, 0, this, arguments, new.target); }
function gapMeal(place) { return gapRpc("gap_meal", { p_place: place }).then(function (o) { return gapSaid(o); }); }
function gapRest(how, where) { return gapRpc("gap_rest", { p_how: how, p_where: where }).then(function (o) { return gapSaid(o); }); }
function gapGather(kind, spot) { return gapRpc("gap_gather", { p_kind: kind, p_spot: String(spot).slice(0, 40) }).then(function (o) { return gapSaid(o); }); }
function gapBuy(item) { return gapRpc("gap_buy", { p_item: item }).then(function (o) { return gapSaid(o); }); }
function gapDonate(n) { return gapRpc("gap_donate", { p_amount: n | 0 }).then(function (o) { return gapSaid(o); }); }
function gapPlace(w) {
CGAP.places[w.key] = w;
if (typeof cityWorkplace === "function")
cityWorkplace({ key: w.key, ring: w.ring, arch: w.arch, s: w.s || 1, jobs: w.jobs || [], fit: w.fit || [], note: w.note || "" });
if (w.tag)
CGAP.tags.push({ key: w.key, label: w.tag, arch: w.arch });
if (w.menu && typeof NEEDS_PLACES !== "undefined")
NEEDS_PLACES[w.key] = w.menu;
return w;
}
function gapTag() {
if (typeof store === "undefined" || !store.objects)
return;
if (!store.workplaceAt)
store.workplaceAt = {};
CGAP.tags.forEach(function (t) {
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.city || o.label !== t.label || (t.arch && o.archetype !== t.arch))
continue;
o.workplace = t.key;
store.workplaceAt[t.key] = { x: o.x, z: o.z, id: o.id };
return;
}
});
}
(function () {
if (typeof buildSomnucorCity === "function") {
var bc = buildSomnucorCity;
buildSomnucorCity = function () { var r = bc.apply(this, arguments); try {
gapTag();
}
catch (e) {
if (window.console)
console.warn("city-gaps:", e);
} return r; };
}
try {
gapTag();
}
catch (e) { }
})();
function gapInside(key) {
if (typeof store === "undefined" || !store.inside || typeof INT === "undefined" || !INT || !INT.spec)
return false;
var k = INT.spec.workplace || INT.spec.label;
return key ? k === key : !!CGAP.places[k];
}
function gapHere() { if (typeof INT === "undefined" || !INT || !INT.spec)
return null; var k = INT.spec.workplace || INT.spec.label; return CGAP.places[k] ? k : null; }
function gapPiece(k, w, d, solid, fn) {
if (typeof FURN !== "object" || !FURN)
return;
FURN[k] = function () { var g = new THREE.Group(); fn(g); return (typeof trDone === "function") ? trDone(g) : g; };
if (typeof TR_BOX !== "undefined")
TR_BOX[k] = [w, d];
if (solid && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
}
function gapAct(k, a) { CGAP.acts[k] = a; }
function gapSpot(s) { CGAP.spots.push(s); return s; }
function gapSpotsClear(tag) { CGAP.spots = CGAP.spots.filter(function (s) { return s.tag !== tag; }); }
function gapNearAct() { return __ZC(320, 1, this, arguments, new.target); }
var GAP_BED = /^(bed|bunk|cot|singlebed|bedroll|gpbunk|gpcot)$/, GAP_WASH = /^(bathtub|bath|shower|tub|sink|basin|washbasin|washstand|gpbath|gpshower)$/;
function gapNearRest(where) { return __ZC(320, 2, this, arguments, new.target); }
var GAP_REST_AT = {};
function gapRestAt(key, where) { GAP_REST_AT[key] = where; }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (!(typeof WLD !== "undefined" && WLD && WLD.on) && typeof tsPrompt === "function") {
if (typeof store !== "undefined" && store.inside) {
var here = gapHere();
if (here) {
var n = gapNearAct();
if (n) {
var s = typeof n.a.say === "function" ? n.a.say() : n.a.say;
tsPrompt(s, function () { n.a.fn(n); });
return;
}
var where = GAP_REST_AT[here];
if (where && typeof FN !== "undefined" && FN.energy != null && !(typeof fnExempt === "function" && fnExempt())) {
var f = gapNearRest(where);
if (f) {
if (FN.rest && (FN.rest === "wash") === (f.how === "wash")) {
tsPrompt("<b>" + (FN.rest === "wash" ? "Washing" : "Resting") + "</b> · <b>press E</b> (or tap here) to get up", function () { gapRest("stop", where); });
return;
}
var say = f.how === "sleep" ? "<b>A bed</b> · <b>press E</b> (or tap here) to sleep" + (where === "poorhouse" ? " (free)" : "") + " · energy " + Math.round(FN.energy) :
"<b>A " + (/shower/.test(f.k) ? "shower" : "bath") + "</b> · <b>press E</b> (or tap here) to wash" + (where === "bathhouse" ? " (2 gold)" : " (free)") + " · hygiene " + Math.round(FN.hygiene);
tsPrompt(say, function () { gapRest(f.how, where); });
return;
}
}
}
}
else if (typeof walkMode === "undefined" || walkMode) {
var P = camera.position, best = null, bd = 1e9;
for (var i = 0; i < CGAP.spots.length; i++) {
var q = CGAP.spots[i], dx = P.x - q.x, dz = P.z - q.z, d = dx * dx + dz * dz, r = q.r || 3;
if (d < r * r && d < bd && (!q.when || q.when())) {
bd = d;
best = q;
}
}
if (best) {
var sy = typeof best.say === "function" ? best.say() : best.say;
tsPrompt(sy, function () { best.fn(best); });
return;
}
}
}
}
catch (e) {
if (window.console)
console.warn("city-gaps prompt:", e);
}
return tt.apply(this, arguments);
};
})();
var GAPP = { el: null };
function gapPanel(title, html, wire) { return __ZC(320, 3, this, arguments, new.target); }
function gapClose() { if (GAPP.el)
GAPP.el.style.display = "none"; }
function gapChoices(title, intro, rows) { return __ZC(320, 4, this, arguments, new.target); }
function gapFishStart(spot) { return __ZC(320, 5, this, arguments, new.target); }
function gapAt(rr, a) { return { x: ATLC.x + Math.cos(a) * rr, z: ATLC.z + Math.sin(a) * rr }; }
"use strict";
var GWR_POOR = "The Poorhouse", GWR_YARD = "The Rag and Bone Yard", GWR_BATH = "The Warrens Baths";
function gwrIds(a, b) { var o = []; for (var i = a; i <= b; i++)
o.push(i); return o; }
var GWR = { busy: false };
var GWR_FINDS = [["gap_scrap_iron", "Scrap iron", 2], ["gap_copper_wire", "Copper wire", 4], ["gap_brass_fittings", "Brass fittings", 6],
["gap_rags", "Rags", 1], ["gap_glass_bottles", "Glass bottles", 1], ["gap_old_timber", "Old timber", 2]];
var GWR_RUMMAGE = {
scrapheap: { name: "A scrap heap", cap: 44, every: 1, kinds: ["gap_scrap_iron", "gap_copper_wire", "gap_scrap_iron", "gap_glass_bottles", "gap_scrap_iron", "gap_copper_wire", "gap_brass_fittings"] },
brokencart: { name: "A broken cart", cap: 34, every: 1, kinds: ["gap_old_timber", "gap_scrap_iron", "gap_old_timber", "gap_rags", "gap_brass_fittings"] },
trashcan: { name: "A rubbish bin", cap: 16, every: 1, kinds: ["gap_glass_bottles", "gap_rags", "gap_glass_bottles", "gap_rags", "gap_copper_wire"] },
rubble: { name: "A heap of rubble", cap: 14, every: 1, kinds: ["gap_old_timber", "gap_scrap_iron", "gap_glass_bottles", "gap_old_timber"] },
pallets: { name: "A stack of old pallets", cap: 12, every: 1, kinds: ["gap_old_timber"] }
};
if (typeof gapPlace === "function") {
gapPlace({ key: GWR_POOR, ring: "warrens", arch: "tenementblock", s: 1, jobs: gwrIds(3800, 3815), fit: [], tag: "The Poorhouse",
note: "The city's charity house: a free hot meal at the hatch, free beds and baths, the infirmary, a school for the children, and work sorting what the city gives." });
gapPlace({ key: GWR_YARD, ring: "warrens", arch: "warehouse", s: 0.5, jobs: gwrIds(3820, 3824), fit: [],
note: "Scrap, rags, bottles and old timber bought by weight at the weighbridge, sorted, baled and sent on to the works." });
gapPlace({ key: GWR_BATH, ring: "warrens", arch: "factory", s: 0.45, jobs: gwrIds(3830, 3835), fit: [],
menu: "Tea, bread and dripping, and broth",
note: "The Warrens' public baths and laundry: bathing halls, a plunge bath, family bathrooms, wash troughs and mangles, and a tea counter." });
}
if (typeof gapRestAt === "function") {
gapRestAt(GWR_POOR, "poorhouse");
gapRestAt(GWR_BATH, "bathhouse");
}
var GWR_SOFT = { shanty: 1, leanto: 1, boardedshack: 1, tent: 1, crates: 1, barrel: 1, pallets: 1, sacks: 1, rubble: 1, brokencart: 1, scrapheap: 1,
trashcan: 1, puddle: 1, firebarrel: 1, ragline: 1, dimlamp: 1, handpump: 1, crowd: 1, cat: 1, rat: 1, dog: 1, washing: 1, tenementblock: 1 };
function gwrSoft(o) { return String(o.id).indexOf("sw") === 0 && !o.label && !o.workplace && !!GWR_SOFT[o.archetype]; }
function gwrRad(o) { var k = KIT[o.archetype], a = o.attrs || {}, s = a.s || 1; return Math.max(k.size[0] * (a.w || 1), k.size[2] * (a.d || 1)) * s * 0.5; }
function gwrDrop(o) {
var i = store.objects.indexOf(o);
if (i >= 0)
store.objects.splice(i, 1);
o._gone = true;
if (typeof meshes !== "undefined" && meshes[o.id]) {
try {
scene.remove(meshes[o.id]);
}
catch (e) { }
delete meshes[o.id];
}
if (typeof atlMeshQueue !== "undefined") {
var j = atlMeshQueue.indexOf(o);
if (j >= 0)
atlMeshQueue.splice(j, 1);
}
}
function gwrSite(C, key, rs, side, a0, dir) {
var wp = WP_BY_KEY[key];
if (!wp)
return null;
var w = kitW(wp.arch, wp.s), d = kitD(wp.arch, wp.s), rb = rs + side * (ATL_ROAD + ATL_SETBACK + d / 2), rad = Math.max(w, d) / 2 + 2;
var hx = C.h.x, hz = C.h.z, hard = [], soft = [];
store.objects.forEach(function (o) {
if (o.realm !== C.r.id || o._gone || !KIT[o.archetype])
return;
var rr = Math.sqrt((o.x - hx) * (o.x - hx) + (o.z - hz) * (o.z - hz));
if (Math.abs(rr - rb) > rad + 30)
return;
var q = { x: o.x, z: o.z, r: gwrRad(o), o: o };
if (gwrSoft(o))
soft.push(q);
else if (KIT[o.archetype].cat !== "being" && !(typeof NOWALL !== "undefined" && NOWALL[o.archetype] && o.archetype !== "signboard"))
hard.push(q);
});
function clearOf(x, z, r) { for (var i = 0; i < hard.length; i++) {
var q = hard[i], m = q.r + r, dx = q.x - x, dz = q.z - z;
if (dx * dx + dz * dz < m * m)
return false;
} return true; }
function sweep(x, z, r) { soft.forEach(function (q) { if (q.o._gone)
return; var m = q.r + r, dx = q.x - x, dz = q.z - z; if (dx * dx + dz * dz < m * m)
gwrDrop(q.o); }); }
var kb = C.kerb(rs, side);
for (var t = 0; t < 1500; t += 3) {
for (var k = 0; k < 2; k++) {
if (t === 0 && k)
continue;
var a = a0 + (k ? -dir : dir) * t / rb;
if (!atlClearAt(rb, a, rad, 4))
continue;
var x = hx + Math.cos(a) * rb, z = hz + Math.sin(a) * rb;
if (!clearOf(x, z, rad))
continue;
var sa = a + (w / 2 + 3) / kb, sx = hx + Math.cos(sa) * kb, sz = hz + Math.sin(sa) * kb;
if (!clearOf(sx, sz, 1.5))
continue;
sweep(x, z, rad + 1);
sweep(sx, sz, 2.5);
var f = C.workplace(key, rs, side, a);
if (!f || !f.spec)
return null;
return { spec: f.spec, a: a, side: side, rb: rb, w: w, d: d };
}
}
return null;
}
function gwrKindToday(R, i) { var day = Math.floor(Date.now() / 86400000); return R.kinds[(i * 3 + day) % R.kinds.length]; }
function gwrFindName(k) { for (var i = 0; i < GWR_FINDS.length; i++)
if (GWR_FINDS[i][0] === k)
return GWR_FINDS[i][1]; return k; }
function gwrSpots(C) {
if (typeof gapSpot !== "function")
return;
gapSpotsClear("gwr");
var W = atlRing("warrens"), hx = C.h.x, hz = C.h.z, Y = store.gaolYard, by = {};
store.objects.forEach(function (o) {
if (o.realm !== C.r.id || o._gone || !o.city)
return;
if (o.archetype === "soupkitchen" && o.label === "Soup kitchen") {
var sx = o.x + Math.sin(o.rot || 0) * 4.6, sz = o.z + Math.cos(o.rot || 0) * 4.6;
gapSpot({ tag: "gwr", x: sx, z: sz, r: 4, say: "<b>The soup kitchen</b> · <b>press E</b> (or tap here) for a free bowl of soup",
fn: function () { if (GWR.busy)
return; GWR.busy = true; gapMeal("soup").then(function () { GWR.busy = false; }, function () { GWR.busy = false; }); } });
return;
}
if (!GWR_RUMMAGE[o.archetype])
return;
var rr = Math.sqrt((o.x - hx) * (o.x - hx) + (o.z - hz) * (o.z - hz));
if (!W || rr < W.S || rr > W.E)
return;
if (Y && Math.abs(o.x - Y.x) < 62 && Math.abs(o.z - Y.z) < 62)
return;
(by[o.archetype] = by[o.archetype] || []).push(o);
});
Object.keys(GWR_RUMMAGE).forEach(function (k) {
var R = GWR_RUMMAGE[k], L = by[k] || [], step = Math.max(1, Math.ceil(L.length / R.cap));
for (var i = 0, n = 0; i < L.length && n < R.cap; i += step, n++) {
(function (o, idx) {
gapSpot({ tag: "gwr", x: o.x, z: o.z, r: Math.min(8, gwrRad(o) + 2.2),
say: function () { return "<b>" + R.name + "</b> · <b>press E</b> (or tap here) to rummage · " + esc(gwrFindName(gwrKindToday(R, idx)).toLowerCase()) + " in it today"; },
fn: function () { if (GWR.busy)
return; GWR.busy = true; gapGather(gwrKindToday(R, idx), "wr-" + o.id).then(function () { GWR.busy = false; }, function () { GWR.busy = false; }); } });
})(L[i], n);
}
});
}
if (typeof cityMore === "function")
cityMore("gwr", function (C) {
var hx = C.h.x, hz = C.h.z, pa = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.realm === C.r.id && o.city && o.label === GWR_POOR && o.archetype === "tenementblock") {
pa = Math.atan2(o.z - hz, o.x - hx);
break;
}
}
if (pa === null)
pa = 1.1;
try {
gwrSite(C, GWR_BATH, 1620, -1, pa - 0.012, -1);
}
catch (e) {
if (window.console)
console.warn("warrens baths:", e);
}
try {
gwrSite(C, GWR_YARD, 1620, 1, pa + 0.012, 1);
}
catch (e) {
if (window.console)
console.warn("warrens yard:", e);
}
gwrSpots(C);
});
function gwrRow(label, note, btns) { return __ZC(320, 6, this, arguments, new.target); }
function gwrBtn(attr, val, text, off) { return "<button class='btn' " + attr + "='" + esc(val) + "' style='min-height:40px;min-width:64px'" + (off ? " disabled" : "") + ">" + text + "</button>"; }
function gwrGivePanel() { return __ZC(320, 7, this, arguments, new.target); }
function gwrNoticePanel() { return __ZC(320, 8, this, arguments, new.target); }
function gwrYardPanel() { return __ZC(320, 9, this, arguments, new.target); }
function gwrPayPanel() { return __ZC(320, 10, this, arguments, new.target); }
if (typeof gapAct === "function") {
gapAct("gwrhatch", { r: 2.8, say: "<b>The serving hatch</b> · <b>press E</b> (or tap here) for a free hot meal",
fn: function () { if (GWR.busy)
return; GWR.busy = true; gapMeal("poorhouse").then(function () { GWR.busy = false; }, function () { GWR.busy = false; }); } });
gapAct("gwrdonbox", { say: "<b>The donations box</b> · <b>press E</b> (or tap here) to give, and see what was given", fn: function () { gwrGivePanel(); } });
gapAct("gwrnotice", { say: "<b>The notice board</b> · <b>press E</b> (or tap here) to read it", fn: function () { gwrNoticePanel(); } });
gapAct("gwrscalehouse", { r: 2.8, say: "<b>The weighbridge office</b> · <b>press E</b> (or tap here) to sell what you have scavenged", fn: function () { gwrYardPanel(); } });
gapAct("gwrprices", { say: "<b>The price board</b> · <b>press E</b> (or tap here) to read it", fn: function () { gwrPayPanel(); } });
gapAct("gwrpaybox", { say: "<b>The pay box</b> · <b>press E</b> (or tap here) for prices", fn: function () { gwrPayPanel(); } });
gapAct("gwrteabar", { say: "<b>The tea counter</b> · <b>press E</b> (or tap here) for the menu", fn: function () { if (typeof needsMenu === "function")
needsMenu(GWR_BATH); } });
}
var GWR_TEX = {};
function gwrTex(key, lines, bg, fg, w, h) { return __ZC(320, 11, this, arguments, new.target); }
function gwrSign(g, tex, w, h, x, y, z, ry) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex }));
m.position.set(x, y, z);
if (ry)
m.rotation.y = ry;
g.add(m);
return m;
}
(function () {
if (typeof gapPiece !== "function" || typeof trB !== "function")
return;
var P = gapPiece;
var wood = function () { return trM(0x6A4A30, "wood"); }, dark = function () { return trM(0x3E2C1C, "wood"); }, iron = function () { return trM(0x3A3E42); }, steel = function () { return trM(0x8C9296, null, "shine"); }, brass = function () { return trM(0xB8963E, null, "shine"); }, enamel = function () { return trM(0xCFCABD); }, tile = function () { return trM(0x8FA39C); }, stone = function () { return trM(0x8A8680, "stone"); }, brick = function () { return trM(0x8A4A3A); }, ticking = function () { return trM(0x8A8576); }, blanket = function () { return trM(0x5A4A3E); }, linen = function () { return trM(0xCFC8B8); };
P("gpbunk", 0.95, 2.0, true, function (g) {
var m = iron();
[-0.44, 0.44].forEach(function (x) { [-0.97, 0.97].forEach(function (z) { trB(g, 0.05, 1.75, 0.05, m, x, 0.875, z); }); trB(g, 0.05, 0.05, 1.95, m, x, 0.33, 0); trB(g, 0.05, 0.05, 1.95, m, x, 1.29, 0); });
[0.42, 1.38].forEach(function (y) { trB(g, 0.84, 0.13, 1.88, ticking(), 0, y, 0); trB(g, 0.86, 0.05, 1.2, blanket(), 0, y + 0.08, 0.3); trB(g, 0.58, 0.1, 0.34, linen(), 0, y + 0.11, -0.72); });
});
P("gpcot", 0.8, 1.7, true, function (g) {
trB(g, 0.8, 0.28, 1.7, wood(), 0, 0.18, 0);
trB(g, 0.7, 0.12, 1.6, ticking(), 0, 0.38, 0);
trB(g, 0.72, 0.04, 1.0, trM(0x6A7A8A), 0, 0.46, 0.25);
trB(g, 0.5, 0.09, 0.3, linen(), 0, 0.48, -0.6);
trB(g, 0.8, 0.55, 0.06, wood(), 0, 0.5, -0.84);
});
P("gpbath", 1.8, 0.85, true, function (g) {
trB(g, 1.7, 0.52, 0.78, enamel(), 0, 0.42, 0);
trB(g, 1.5, 0.02, 0.6, trM(0x7A969A), 0, 0.6, 0);
[-0.72, 0.72].forEach(function (x) { [-0.3, 0.3].forEach(function (z) { trB(g, 0.08, 0.16, 0.08, iron(), x, 0.08, z); }); });
trC(g, 0.03, 0.03, 0.24, 6, brass(), -0.78, 0.78, -0.12);
trC(g, 0.03, 0.03, 0.24, 6, brass(), -0.78, 0.78, 0.12);
});
P("gpshower", 1.0, 1.0, false, function (g) {
var t = tile();
trB(g, 1.0, 2.1, 0.06, t, 0, 1.05, -0.47);
trB(g, 0.06, 2.1, 0.94, t, -0.47, 1.05, 0);
trB(g, 0.06, 2.1, 0.94, t, 0.47, 1.05, 0);
trB(g, 0.88, 0.06, 0.88, trM(0xB4AEA2), 0, 0.03, 0);
trC(g, 0.02, 0.02, 1.8, 6, brass(), 0.2, 1.2, -0.42);
trC(g, 0.09, 0.05, 0.05, 10, brass(), 0.2, 2.0, -0.3);
trB(g, 0.94, 0.03, 0.03, iron(), 0, 2.05, 0.46);
trB(g, 0.34, 1.6, 0.02, trM(0x5E6E78), -0.28, 1.22, 0.46);
});
P("gwrhatch", 4.0, 0.9, true, function (g) {
trB(g, 4.0, 0.95, 0.8, wood(), 0, 0.475, 0);
trB(g, 4.05, 0.05, 0.86, steel(), 0, 0.975, 0);
[-1.2, 0, 1.2].forEach(function (x) { trC(g, 0.26, 0.22, 0.34, 12, steel(), x, 1.17, -0.12); trC(g, 0.27, 0.27, 0.03, 12, iron(), x, 1.35, -0.12); });
trB(g, 4.0, 0.04, 0.24, steel(), 0, 0.92, 0.52);
trC(g, 0.12, 0.08, 0.24, 10, trM(0xCFC4A8), 1.75, 1.12, 0.18);
trC(g, 0.12, 0.08, 0.24, 10, trM(0xCFC4A8), -1.75, 1.12, 0.18);
trB(g, 0.12, 1.35, 0.12, dark(), -1.96, 1.65, -0.34);
trB(g, 0.12, 1.35, 0.12, dark(), 1.96, 1.65, -0.34);
trB(g, 4.04, 0.16, 0.14, dark(), 0, 2.38, -0.34);
gwrSign(g, gwrTex("hatch", ["Hot meals", "Free to anyone who asks"], "#2E2A22", "#E8DCC0", 256, 96), 1.4, 0.5, 0, 2.75, -0.33);
});
P("gwrrefectory", 4.0, 2.2, true, function (g) {
var w = wood(), tin = trM(0x9A9C98);
trB(g, 4.0, 0.06, 0.86, w, 0, 0.76, 0);
trB(g, 0.08, 0.73, 0.7, w, -1.6, 0.37, 0);
trB(g, 0.08, 0.73, 0.7, w, 1.6, 0.37, 0);
trB(g, 3.2, 0.06, 0.06, w, 0, 0.22, 0);
[-0.78, 0.78].forEach(function (z) { trB(g, 4.0, 0.06, 0.32, w, 0, 0.45, z); trB(g, 0.06, 0.42, 0.28, w, -1.7, 0.21, z); trB(g, 0.06, 0.42, 0.28, w, 1.7, 0.21, z); });
[-1.2, 0.4].forEach(function (x) { trC(g, 0.13, 0.13, 0.02, 10, tin, x, 0.8, 0.24); trC(g, 0.13, 0.13, 0.02, 10, tin, x + 0.6, 0.8, -0.24); });
trC(g, 0.05, 0.05, 0.1, 8, tin, 1.5, 0.84, 0.1);
trC(g, 0.05, 0.05, 0.1, 8, tin, -0.4, 0.84, -0.1);
});
P("gwrdonbox", 0.5, 0.5, true, function (g) {
trB(g, 0.14, 1.0, 0.14, dark(), 0, 0.5, 0);
trB(g, 0.42, 0.36, 0.32, wood(), 0, 1.18, 0);
trB(g, 0.18, 0.02, 0.05, trM(0x141414), 0, 1.365, 0);
trB(g, 0.24, 0.09, 0.01, brass(), 0, 1.2, 0.165);
trC(g, 0.025, 0.025, 0.02, 8, brass(), 0.12, 1.1, 0.165, Math.PI / 2, 0, 0);
trB(g, 0.04, 0.5, 0.04, dark(), 0, 1.6, -0.1);
gwrSign(g, gwrTex("donbox", ["Give to the Poorhouse", "Food, coal and soap for the house"], "#E8DCC0", "#3A2A1A", 256, 128), 0.56, 0.28, 0, 1.92, -0.07);
});
P("gwrnotice", 1.6, 0.1, false, function (g) {
var key = "notice";
if (!GWR_TEX[key]) {
var c = document.createElement("canvas");
c.width = 256;
c.height = 160;
var x = c.getContext("2d");
x.fillStyle = "#8A6A44";
x.fillRect(0, 0, 256, 160);
x.fillStyle = "#2E2418";
x.font = "bold 18px Georgia,serif";
x.textAlign = "center";
x.fillText("NOTICES", 128, 22);
var notes = [["Meals", "at the hatch"], ["Beds", "upstairs"], ["Washhouse", "through the back"], ["Infirmary", "first floor"], ["School", "top floor"], ["Chapel", "top floor"]];
notes.forEach(function (n, i) {
var X = 10 + (i % 3) * 82, Y = 34 + Math.floor(i / 3) * 62;
x.fillStyle = i % 2 ? "#E6DCC6" : "#DCD6C8";
x.fillRect(X, Y, 74, 54);
x.fillStyle = "#8A2A22";
x.beginPath();
x.arc(X + 37, Y + 5, 3, 0, 7);
x.fill();
x.fillStyle = "#2A2A2A";
x.font = "bold 12px sans-serif";
x.fillText(n[0], X + 37, Y + 26);
x.font = "10px sans-serif";
x.fillText(n[1], X + 37, Y + 42);
});
GWR_TEX[key] = new THREE.CanvasTexture(c);
}
trB(g, 1.6, 1.05, 0.05, dark(), 0, 1.6, 0);
gwrSign(g, GWR_TEX[key], 1.5, 0.95, 0, 1.6, 0.03);
});
P("gwrstove", 0.8, 0.8, true, function (g) {
var m = iron();
trB(g, 0.7, 0.12, 0.7, m, 0, 0.06, 0);
trC(g, 0.3, 0.26, 0.7, 12, m, 0, 0.5, 0);
trC(g, 0.24, 0.3, 0.18, 12, m, 0, 0.94, 0);
trC(g, 0.07, 0.07, 2.1, 8, m, 0, 2.08, 0);
trB(g, 0.2, 0.18, 0.02, trM(0x2A2A2A), 0, 0.45, 0.29);
trC(g, 0.12, 0.14, 0.16, 10, trM(0x5A5A58), 0.12, 1.11, 0);
});
P("gwrcopper", 0.9, 0.9, true, function (g) {
trB(g, 0.9, 0.8, 0.9, brick(), 0, 0.4, 0);
trC(g, 0.36, 0.32, 0.36, 14, trM(0xA0623A, null, "shine"), 0, 0.96, 0);
trC(g, 0.38, 0.38, 0.04, 14, wood(), 0, 1.16, 0);
trB(g, 0.32, 0.24, 0.02, iron(), 0, 0.25, 0.46);
});
P("gwrmangle", 1.0, 0.7, true, function (g) {
var m = iron();
trB(g, 0.06, 1.1, 0.6, m, -0.45, 0.55, 0);
trB(g, 0.06, 1.1, 0.6, m, 0.45, 0.55, 0);
trC(g, 0.09, 0.09, 0.86, 10, linen(), 0, 0.92, 0, 0, 0, Math.PI / 2);
trC(g, 0.09, 0.09, 0.86, 10, linen(), 0, 1.1, 0, 0, 0, Math.PI / 2);
trC(g, 0.3, 0.3, 0.04, 14, m, 0.52, 1.0, 0, 0, 0, Math.PI / 2);
trB(g, 0.9, 0.04, 0.36, wood(), 0, 0.76, 0.34);
});
P("gwrairer", 1.6, 0.6, false, function (g) {
var w = wood();
[-0.78, 0.78].forEach(function (x) { trB(g, 0.04, 1.45, 0.04, w, x, 0.72, -0.25); trB(g, 0.04, 1.45, 0.04, w, x, 0.72, 0.25); });
[0.8, 1.4].forEach(function (y) { trB(g, 1.6, 0.03, 0.03, w, 0, y, -0.25); trB(g, 1.6, 0.03, 0.03, w, 0, y, 0.25); });
[[-0.45, 0xC8C0B0], [0.1, 0x6A7A8A], [0.55, 0x8A5A4A]].forEach(function (c, i) { trB(g, 0.46, 0.6, 0.02, trM(c[1]), c[0], 1.08, i % 2 ? 0.25 : -0.25); });
});
P("gwrrail", 1.6, 0.5, true, function (g) {
var m = iron();
trB(g, 0.04, 1.7, 0.04, m, -0.76, 0.85, 0);
trB(g, 0.04, 1.7, 0.04, m, 0.76, 0.85, 0);
trB(g, 1.6, 0.03, 0.03, m, 0, 1.68, 0);
trB(g, 0.04, 0.04, 0.5, m, -0.76, 0.03, 0);
trB(g, 0.04, 0.04, 0.5, m, 0.76, 0.03, 0);
[0x4A4E5A, 0x6A4A3A, 0x3E5A4A, 0x7A6A5A, 0x5A3A4A, 0x6A6A62].forEach(function (c, i) { trB(g, 0.09, 0.95, 0.44, trM(c), -0.6 + i * 0.24, 1.18, 0); });
});
P("gwrbin", 1.2, 0.7, true, function (g) {
var w = wood();
trB(g, 1.2, 0.7, 0.7, w, 0, 0.35, 0);
trB(g, 0.04, 0.72, 0.7, dark(), -0.2, 0.36, 0);
trB(g, 0.04, 0.72, 0.7, dark(), 0.2, 0.36, 0);
trB(g, 0.36, 0.1, 0.6, trM(0x6A5A7A), -0.4, 0.66, 0);
trB(g, 0.36, 0.1, 0.6, trM(0x6A6A62), 0, 0.64, 0);
trB(g, 0.36, 0.1, 0.6, trM(0x8A6A4A), 0.4, 0.62, 0);
});
P("gwrscreen", 1.4, 0.06, true, function (g) { trB(g, 1.4, 1.85, 0.05, trM(0x7E8E88), 0, 1.05, 0); trB(g, 0.05, 0.12, 0.3, iron(), -0.66, 0.06, 0); trB(g, 0.05, 0.12, 0.3, iron(), 0.66, 0.06, 0); });
P("gwraltar", 1.8, 0.8, true, function (g) {
trB(g, 1.8, 0.9, 0.8, dark(), 0, 0.45, 0);
trB(g, 1.84, 0.04, 0.84, trM(0xD8D0BE), 0, 0.92, 0);
trB(g, 0.9, 0.5, 0.01, trM(0x4A3A5A), 0, 0.66, 0.425);
trB(g, 0.36, 0.06, 0.26, trM(0x5A2A22), 0, 0.97, 0);
trC(g, 0.06, 0.05, 0.22, 8, brass(), -0.62, 1.05, 0);
trS(g, 0.1, trM(0x5A7A4A), -0.62, 1.22, 0);
});
P("gwrsewer", 1.2, 0.6, true, function (g) {
trB(g, 1.2, 0.05, 0.6, wood(), 0, 0.76, 0);
trB(g, 0.06, 0.74, 0.5, iron(), -0.55, 0.37, 0);
trB(g, 0.06, 0.74, 0.5, iron(), 0.55, 0.37, 0);
trB(g, 0.6, 0.04, 0.3, iron(), 0, 0.1, 0.05);
var k = trM(0x1E1E20, null, "shine");
trB(g, 0.42, 0.12, 0.16, k, 0, 0.85, 0);
trB(g, 0.1, 0.26, 0.14, k, 0.18, 0.98, 0);
trB(g, 0.36, 0.08, 0.14, k, 0.02, 1.1, 0);
trC(g, 0.06, 0.06, 0.04, 10, brass(), 0.24, 0.98, 0.1, Math.PI / 2, 0, 0);
});
P("gwrweigh", 3.2, 6.0, false, function (g) {
trB(g, 3.0, 0.06, 5.8, trM(0x5E6264), 0, 0.03, 0);
var y = trM(0xA8862E);
trB(g, 3.2, 0.08, 0.1, y, 0, 0.04, -2.95);
trB(g, 3.2, 0.08, 0.1, y, 0, 0.04, 2.95);
trB(g, 0.1, 0.08, 5.8, y, -1.55, 0.04, 0);
trB(g, 0.1, 0.08, 5.8, y, 1.55, 0.04, 0);
for (var z = -2.2; z <= 2.21; z += 1.1)
trB(g, 2.9, 0.065, 0.04, trM(0x4A4E50), 0, 0.035, z);
});
P("gwrscalehouse", 2.6, 2.4, false, function (g) {
var p = trM(0x4E5E52, "wood");
trB(g, 2.6, 2.5, 0.08, p, 0, 1.25, -1.16);
trB(g, 0.08, 2.5, 2.4, p, -1.26, 1.25, 0);
trB(g, 0.08, 2.5, 2.4, p, 1.26, 1.25, 0);
trB(g, 2.8, 0.1, 2.6, trM(0x3A3A3C), 0, 2.55, 0);
trB(g, 2.5, 1.0, 0.08, p, 0, 0.5, 1.16);
trB(g, 2.6, 0.05, 0.42, wood(), 0, 1.02, 1.12);
trC(g, 0.26, 0.26, 0.04, 16, trM(0xD8D2C2), 0.6, 1.65, -1.1, Math.PI / 2, 0, 0);
trB(g, 0.02, 0.2, 0.01, trM(0x141414), 0.6, 1.7, -1.07);
trB(g, 1.2, 0.05, 0.6, wood(), -0.55, 0.76, -0.75);
trB(g, 0.36, 0.05, 0.26, trM(0x5A2A22), -0.55, 0.81, -0.75);
gwrSign(g, gwrTex("weigh", ["Weighbridge", "All scrap bought by weight"], "#1E2A22", "#E8DCC0", 256, 96), 1.6, 0.6, 0, 2.95, 1.2);
});
var BAYS = { iron: ["Iron and steel", [0x6A4030, 0x5A3A2A, 0x7A5040]], copper: ["Copper", [0xA0602E, 0x8A4E26, 0xB07040]], brass: ["Brass", [0xA8862E, 0x98782A, 0xB8923E]],
rags: ["Rags", [0x6A5A7A, 0x8A6A4A, 0x5A6A5A]], glass: ["Glass", [0x4A6E56, 0x5E7E70, 0x3E5A48]], timber: ["Old timber", [0x7A5A3A, 0x6A4A2E, 0x8A6A44]] };
Object.keys(BAYS).forEach(function (k) {
var b = BAYS[k];
P("gwrpile" + k, 3.0, 3.0, true, function (g) {
var c = trM(0x8A8882, "stone");
trB(g, 3.0, 1.2, 0.3, c, 0, 0.6, -1.35);
trB(g, 0.3, 1.2, 2.7, c, -1.35, 0.6, 0.15);
trB(g, 0.3, 1.2, 2.7, c, 1.35, 0.6, 0.15);
trB(g, 2.2, 0.55, 1.9, trM(b[1][0]), 0, 0.28, -0.1, 0, 0.25, 0);
trB(g, 1.5, 0.5, 1.2, trM(b[1][1]), 0.2, 0.75, -0.25, 0.2, 0.8, 0.1);
trS(g, 0.5, trM(b[1][2]), -0.5, 0.6, 0.4, 1.4, 0.7, 1.0);
gwrSign(g, gwrTex("bay" + k, [b[0]], "#E2DACA", "#2A2A2A", 256, 64), 1.4, 0.36, 0, 1.45, -1.19);
trB(g, 1.5, 0.42, 0.04, dark(), 0, 1.45, -1.22);
});
});
P("gwrcart", 1.8, 3.4, true, function (g) {
var w = wood();
trB(g, 1.6, 0.08, 2.4, w, 0, 0.75, 0);
trB(g, 0.05, 0.3, 2.4, w, -0.8, 0.9, 0);
trB(g, 0.05, 0.3, 2.4, w, 0.8, 0.9, 0);
trC(g, 0.6, 0.6, 0.08, 14, dark(), -0.92, 0.6, 0, 0, 0, Math.PI / 2);
trC(g, 0.6, 0.6, 0.08, 14, dark(), 0.92, 0.6, 0, 0, 0, Math.PI / 2);
trC(g, 0.04, 0.04, 1.9, 6, iron(), 0, 0.6, 0, 0, 0, Math.PI / 2);
trB(g, 0.06, 0.06, 1.7, w, -0.5, 0.45, 2.0, -0.25, 0, 0);
trB(g, 0.06, 0.06, 1.7, w, 0.5, 0.45, 2.0, -0.25, 0, 0);
trS(g, 0.32, trM(0x8A7A5E), -0.4, 1.05, -0.5, 1, 0.8, 1.2);
trS(g, 0.3, trM(0x7A6A52), 0.35, 1.02, 0.3, 1, 0.8, 1.1);
trB(g, 1.1, 0.6, 0.04, iron(), 0.1, 1.1, -0.9, 0, 0.2, 0);
});
P("gwrbale", 1.2, 1.0, true, function (g) { trB(g, 1.1, 0.9, 0.9, trM(0x6E6458), 0, 0.45, 0); trB(g, 1.12, 0.04, 0.92, iron(), 0, 0.25, 0); trB(g, 1.12, 0.04, 0.92, iron(), 0, 0.65, 0); });
P("gwrbaler", 1.4, 1.2, true, function (g) {
var m = iron();
[-0.62, 0.62].forEach(function (x) { [-0.5, 0.5].forEach(function (z) { trB(g, 0.08, 2.2, 0.08, m, x, 1.1, z); }); });
trB(g, 1.3, 0.12, 1.1, m, 0, 2.2, 0);
trB(g, 1.0, 1.0, 0.9, wood(), 0, 0.5, 0);
trC(g, 0.05, 0.05, 0.9, 8, m, 0, 1.6, 0);
trC(g, 0.35, 0.35, 0.04, 14, m, 0, 2.32, 0);
trB(g, 0.9, 0.1, 0.8, trM(0x6E6458), 0, 1.06, 0);
});
P("gwrragtable", 2.4, 1.2, true, function (g) {
var w = wood();
trB(g, 2.4, 0.06, 1.1, w, 0, 0.86, 0);
[-1.1, 1.1].forEach(function (x) { [-0.48, 0.48].forEach(function (z) { trB(g, 0.06, 0.84, 0.06, w, x, 0.42, z); }); });
trS(g, 0.3, trM(0x6A5A7A), -0.7, 0.98, 0, 1.2, 0.45, 1.0);
trS(g, 0.28, trM(0x8A7A62), 0.05, 0.97, 0.1, 1.2, 0.4, 1.0);
trS(g, 0.26, trM(0x4E5E6E), 0.75, 0.96, -0.1, 1.1, 0.4, 1.0);
trC(g, 0.3, 0.24, 0.4, 10, trM(0x8A6A3E), -0.6, 0.2, 0);
trC(g, 0.3, 0.24, 0.4, 10, trM(0x8A6A3E), 0.6, 0.2, 0);
});
P("gwrpaybox", 2.2, 1.6, true, function (g) {
var w = dark();
trB(g, 2.2, 1.1, 0.1, w, 0, 0.55, 0.75);
trB(g, 2.0, 0.85, 0.03, trM(0xA8C0C4, null, "glass"), 0, 1.55, 0.75);
trB(g, 0.1, 2.2, 1.6, w, -1.05, 1.1, 0);
trB(g, 0.1, 2.2, 1.6, w, 1.05, 1.1, 0);
trB(g, 2.3, 0.12, 1.7, w, 0, 2.26, 0);
trB(g, 2.0, 0.05, 0.34, wood(), 0, 1.12, 0.88);
gwrSign(g, gwrTex("paybox", ["Pay here", "A wash 2 gold · Tea at the counter"], "#20302C", "#E8DCC0", 256, 96), 1.6, 0.5, 0, 2.58, 0.82);
});
P("gwrprices", 1.6, 0.1, false, function (g) {
trB(g, 1.6, 1.05, 0.05, dark(), 0, 1.6, 0);
gwrSign(g, gwrTex("prices", ["The Warrens Baths", "A wash in the bathing halls: 2 gold", "Plunge bath and family bathrooms upstairs", "Tea, bread and dripping, broth", "Public laundry upstairs"], "#20302C", "#E8DCC0", 256, 160), 1.5, 0.95, 0, 1.6, 0.03);
});
P("gwrteabar", 3.0, 0.8, true, function (g) {
trB(g, 3.0, 1.0, 0.7, wood(), 0, 0.5, 0);
trB(g, 3.05, 0.05, 0.75, dark(), 0, 1.02, 0);
trC(g, 0.22, 0.2, 0.55, 14, trM(0xA0623A, null, "shine"), -0.9, 1.32, -0.1);
trC(g, 0.03, 0.03, 0.12, 6, brass(), -0.9, 1.12, 0.12, Math.PI / 2, 0, 0);
[-0.3, -0.1, 0.1].forEach(function (x) { trC(g, 0.05, 0.04, 0.09, 8, trM(0xD8D0BE), x, 1.09, 0.15); });
trB(g, 0.5, 0.04, 0.3, wood(), 0.7, 1.06, 0);
trS(g, 0.15, trM(0xA8743A), 0.7, 1.14, 0, 1.4, 0.8, 0.9);
gwrSign(g, gwrTex("tea", ["Tea counter", "Tea · bread and dripping · broth"], "#2E2A22", "#E8DCC0", 256, 96), 1.4, 0.5, 0, 2.2, -0.3);
trB(g, 0.06, 1.1, 0.06, dark(), -0.65, 1.62, -0.3);
trB(g, 0.06, 1.1, 0.06, dark(), 0.65, 1.62, -0.3);
});
P("gwrboiler", 2.6, 1.7, true, function (g) {
trB(g, 2.6, 0.5, 1.7, brick(), 0, 0.25, 0);
trC(g, 0.75, 0.75, 2.4, 16, trM(0x3A3A3C), 0, 1.2, 0, 0, 0, Math.PI / 2);
trB(g, 0.03, 0.4, 0.5, iron(), -1.22, 0.95, 0);
trC(g, 0.09, 0.09, 0.03, 12, trM(0xD8D2C2), -1.22, 1.65, 0.3, 0, 0, Math.PI / 2);
trC(g, 0.09, 0.09, 1.4, 8, trM(0x9A5E36, null, "shine"), 0.6, 2.55, 0);
trC(g, 0.06, 0.06, 0.5, 8, brass(), -0.4, 2.05, 0);
});
P("gwrcoal", 1.8, 1.4, true, function (g) {
var c = trM(0x222224);
trS(g, 0.7, c, 0, 0.3, 0, 1.3, 0.6, 0.9);
trS(g, 0.45, c, 0.5, 0.25, 0.3, 1, 0.6, 1);
trB(g, 0.04, 1.1, 0.04, wood(), -0.7, 0.6, 0.4, 0.3, 0, 0);
trB(g, 0.24, 0.03, 0.3, iron(), -0.7, 0.08, 0.6);
});
P("gwrtrough", 2.0, 0.7, true, function (g) {
trB(g, 2.0, 0.8, 0.7, stone(), 0, 0.4, 0);
trB(g, 1.8, 0.02, 0.5, trM(0x6A8A8E), 0, 0.75, 0);
trC(g, 0.03, 0.03, 0.3, 6, brass(), -0.5, 0.95, -0.3);
trC(g, 0.03, 0.03, 0.3, 6, brass(), 0.5, 0.95, -0.3);
trB(g, 0.4, 0.5, 0.03, wood(), -0.6, 0.95, -0.05, -0.35, 0, 0);
});
P("gwrpool", 7.6, 4.0, true, function (g) {
var t = tile();
trB(g, 7.6, 0.36, 0.3, t, 0, 0.18, -1.85);
trB(g, 7.6, 0.36, 0.3, t, 0, 0.18, 1.85);
trB(g, 0.3, 0.36, 3.4, t, -3.65, 0.18, 0);
trB(g, 0.3, 0.36, 3.4, t, 3.65, 0.18, 0);
trB(g, 7.0, 0.04, 3.4, trM(0x4E7A82), 0, 0.3, 0);
trB(g, 0.9, 0.1, 1.0, trM(0xA4ACA6), 3.0, 0.22, 0);
trC(g, 0.025, 0.025, 0.9, 6, brass(), 3.45, 0.7, -0.55);
trC(g, 0.025, 0.025, 0.9, 6, brass(), 3.45, 0.7, 0.55);
});
})();
function gwrBaths(R, who) { return __ZC(320, 12, this, arguments, new.target); }
if (typeof wgRoom === "function") {
wgRoom("gwrkitchen", "Kitchen", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcookline", -1.4);
R.put("gwrcopper", w - 0.6, 1.4, "in");
R.put("gwrcopper", w - 0.6, 2.5, "in");
R.put("wgsteeltable", w - 3.3, -1.4, "n");
R.put("wgsteeltable", w - 3.3, 1.2, "n");
R.wallS("fridge", 2.4);
R.wallS("fridge", 3.3);
R.wallS("wgshelving", 5.0);
R.wallS("wgdishpit", 7.4);
R.staff("Poorhouse cook", w - 1.6, -1.4, "out");
R.staff("Poorhouse kitchen hand", w - 4.1, -1.0, "in");
R.spot(2.2, 0.4);
}, { secure: true });
wgRoom("gwrscullery", "Scullery and pantry", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgdishpit", -1.4);
R.wallOut("wgshelving", 1.0);
R.wallS("wgshelving", 2.6);
R.wallS("wgshelving", 4.8);
R.put("trsacks", w * 0.5, 0.6, "n");
R.put("barrel", 2.6, 0.8, 0);
R.put("barrel", 3.5, 0.8, 0);
R.staff("Poorhouse kitchen hand", w - 1.9, -1.4, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gwrlaundry", "Laundry", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("wglaundry", -2.4);
R.wallOut("wglaundry", -0.4);
R.wallOut("gwrcopper", 1.4);
R.put("gwrmangle", w * 0.5, -d / 2 + 0.6, "n");
R.put("gwrairer", w * 0.5 - 0.4, 1.4, "n");
R.put("gwrairer", w * 0.5 - 2.4, 1.4, "n");
R.wallS("wgshelving", 2.2);
R.staff("Poorhouse laundry hand", w * 0.5, -d / 2 + 1.4, "s");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gwrwash", "Washhouse", 9, function (R) { gwrBaths(R, "Poorhouse attendant"); }, { public: true });
wgRoom("gwrstore", "Donations store", 9, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.6; v += 1.9)
R.put("wgshelving", w - 0.4, v + 0.5, "in");
R.put("trcrates", w * 0.5, -d / 2 + 0.8, "n");
R.put("trsacks", w * 0.5, 1.2, "n");
R.put("wgpallets", 3.0, -d / 2 + 0.7, "n");
R.staff("Donations sorter", w * 0.5 - 1.4, -0.6, "in");
R.spot(1.6, 0.8);
}, { secure: true });
wgRoom("gwrclothes", "Clothing store", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.0; v += 1.8)
R.put("gwrrail", w - 0.5, v, "in");
R.put("gwrrail", w - 2.6, -1.0, "in");
R.put("gwrrail", w - 2.6, 1.0, "in");
R.wallS("wgshelving", 2.4);
R.put("trcounter", 2.4, 1.2, "out");
R.staff("Donations sorter", 3.2, 0.2, "in");
R.spot(1.4, -1.0);
}, { secure: true });
wgRoom("gwrsort", "Workroom", 10, function (R) {
var w = R.w, d = R.d;
R.put("wgsteeltable", w * 0.55, -1.6, "n");
R.put("wgsteeltable", w * 0.55, 1.4, "n");
for (var v = -d / 2 + 1.0; v < d / 2 - 1.2; v += 1.6)
R.put("gwrbin", w - 0.4, v + 0.3, "in");
R.wallS("gwrrail", 2.4);
R.put("weighscale", 2.4, 1.0, "out");
R.put("trsacks", 4.2, -d / 2 + 0.7, "n");
R.staff("Donations sorter", w * 0.55 - 0.9, -1.6, "out");
R.staff("Donations sorter", w * 0.55 + 0.9, 1.4, "in");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gwrdorm", "Dormitory", 12, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 0.9; v += 1.55) {
R.put("gpbunk", w - 1.1, v, "in");
if (w > 8 && v < d / 2 - 2.6)
R.put("gpbunk", w - 4.5, v, "out");
}
R.wallS("trlockers", 2.0);
R.put("chair", 1.2, -d / 2 + 2.0, "out");
R.staff("Poorhouse attendant", 2.4, -d / 2 + 2.6, "out");
R.spot(2.2, 0);
}, { public: true });
wgRoom("gwrfamily", "Family rooms", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.8; v += 3.0) {
R.put("gpbunk", w - 1.1, v + 0.1, "in");
R.put("gpcot", w - 1.0, v + 1.2, "in");
if (v + 2.4 < d / 2 - 0.4)
R.put("gwrscreen", w - 0.8, v + 2.3, "n");
R.put("footchest", w - 2.6, v + 0.6, "in");
}
R.put("rug", w * 0.35, 0.4, 0);
R.put("toys", w * 0.35, 0.8, 0);
R.put("table", 2.4, -d / 2 + 1.2, "n");
R.put("chair", 1.5, -d / 2 + 1.2, "out");
R.put("chair", 3.3, -d / 2 + 1.2, "in");
R.spot(2.0, 0.6);
}, { public: true });
wgRoom("gwrsick", "Infirmary", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.6; v += 2.2) {
R.put("hospitalbed", w - 1.2, v, "in");
R.put("chair", w - 2.6, v - 0.6, "out");
}
R.put("desk", 2.6, -d / 2 + 1.0, "n");
R.put("chair", 2.6, -d / 2 + 0.5, "n");
R.wallS("wgmedshelf", 4.8);
R.wallN("wgbasin", w - 3.4);
R.staff("Poorhouse nurse", 3.4, -d / 2 + 1.6, "out");
R.spot(1.8, 0.6);
});
wgRoom("gwrnight", "Night warden's post", 5.5, function (R) {
var w = R.w, d = R.d;
R.wallOut("desk", -0.6);
R.put("chair", w - 1.4, -0.6, "in");
R.put("keyrack", w - 0.06, 1.3, "in");
R.put("noticeboard", 2.6, -d / 2 + 0.06, "n");
R.put("clock", 1.0, -d / 2 + 0.4, "out");
R.staff("Poorhouse night warden", w - 1.6, 0.4, "out");
R.spot(1.4, 0);
}, { secure: true });
wgRoom("gwrschool", "Schoolroom", 10, function (R) {
var w = R.w, d = R.d;
R.put("blackboard", w - 0.12, 0, "in");
R.put("desk", w - 1.7, 0, "out");
R.staff("Poorhouse schoolteacher", w - 1.0, 0.9, "in");
for (var u = w - 3.4; u > 2.2; u -= 1.7)
for (var v = -d / 2 + 1.4; v < d / 2 - 1.8; v += 1.9)
R.put("schooldesk", u, v, "in");
R.put("bookshelf", 1.6, -d / 2 + 0.25, "n");
R.put("clock", 0.2, -d / 2 + 1.2, "out");
R.spot(1.4, 0);
}, { public: true });
wgRoom("gwrnursery", "Nursery", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.2; v += 1.6)
R.put("crib", w - 0.6, v, "in");
R.put("rug", w * 0.45, 0.2, 0);
R.put("toys", w * 0.45, 0.4, 0);
R.put("toys", w * 0.45 - 0.9, -0.6, 1);
R.put("armchair", 2.2, -d / 2 + 1.0, "n");
R.put("bookshelf", 4.2, -d / 2 + 0.25, "n");
R.staff("Poorhouse attendant", w * 0.45, -1.6, "out");
R.spot(1.6, 0.6);
}, { public: true });
wgRoom("gwrchapel", "Chapel", 9, function (R) {
var w = R.w, d = R.d;
R.put("gwraltar", w - 0.7, -0.4, "in");
R.put("lectern", w - 1.8, 1.6, "out");
for (var u = w - 3.0; u > 1.8; u -= 1.4)
R.put("pew", u, -0.4, "out");
R.staff("Poorhouse chaplain", w - 1.6, 0.9, "in");
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.spot(1.4, 0);
}, { public: true });
wgRoom("gwrsewing", "Sewing room", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.2; v += 1.5) {
R.put("gwrsewer", w - 0.8, v, "in");
R.put("chair", w - 1.5, v, "out");
}
R.put("table", w * 0.4, 0, "n");
R.put("gwrrail", 2.4, -d / 2 + 0.4, "n");
R.put("trsacks", 4.4, -d / 2 + 0.7, "n");
R.staff("Poorhouse matron", w * 0.4, 1.0, "s");
R.spot(1.6, 0.4);
});
wgRoom("gwrmatron", "Matron's office", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("desk", -0.4);
R.put("chair", w - 1.3, -0.4, "in");
R.put("chair", w - 2.5, -0.9, "out");
R.put("chair", w - 2.5, 0.1, "out");
R.wallS("filecabinet", w - 0.6);
R.wallS("filecabinet", w - 1.4);
R.put("keyrack", 0.06, -d / 2 + 1.6, "out");
R.put("wardrobe", 2.4, -d / 2 + 0.35, "n");
R.staff("Poorhouse matron", w - 1.5, 0.5, "out");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("gwralmoner", "Almoner's office", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("desk", -0.4);
R.put("chair", w - 1.3, -0.4, "in");
R.put("chair", w - 2.5, -0.9, "out");
R.put("chair", w - 2.5, 0.1, "out");
R.wallS("filecabinet", w - 0.6);
R.wallS("bookshelf", 2.6);
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.staff("Poorhouse almoner", w - 1.5, 0.5, "out");
R.spot(1.6, 0.6);
}, { public: true });
wgRoom("gwrshed", "Sorting shed", 11, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.4; v += 1.6)
R.put("gwrbin", w - 0.4, v + 0.3, "in");
R.put("wgsteeltable", w * 0.5, -1.8, "n");
R.put("wgsteeltable", w * 0.5, 1.2, "n");
R.put("weighscale", 2.2, -d / 2 + 0.8, "n");
R.wallS("trtoolwall", 4.2);
R.staff("Yard hand", w * 0.5 - 0.9, -1.8, "out");
R.staff("Rag sorter", w * 0.5 + 0.9, 1.2, "in");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gwrragroom", "Rag room", 9, function (R) {
var w = R.w, d = R.d;
R.put("gwrragtable", w - 1.8, -1.6, "in");
R.put("gwrragtable", w - 1.8, 1.4, "in");
R.put("gwrbale", 2.4, -d / 2 + 0.7, 0);
R.put("gwrbale", 3.7, -d / 2 + 0.7, 0);
R.put("trsacks", w * 0.4, 0, "n");
R.staff("Rag sorter", w - 3.2, -1.6, "out");
R.staff("Rag sorter", w - 3.2, 1.4, "out");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("gwrbaling", "Baling room", 8, function (R) {
var w = R.w, d = R.d;
R.put("gwrbaler", w - 1.2, -1.2, "in");
R.put("gwrbale", w - 1.0, 1.4, 0);
R.put("gwrbale", w - 2.3, 1.4, 0);
R.put("gwrbale", w - 1.0, 2.5, 0);
R.put("gwrbale", 2.4, -d / 2 + 0.7, 0);
R.staff("Yard hand", w - 2.6, -1.2, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gwrmetal", "Metal store", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgshelving", -1.4);
R.wallOut("wgshelving", 1.0);
R.put("gwrbin", w * 0.5, -d / 2 + 0.5, "n");
R.put("gwrbin", w * 0.5 + 1.4, -d / 2 + 0.5, "n");
R.put("trcrates", 2.6, d / 2 - 1.4, "s");
R.put("weighscale", 2.4, -0.6, "out");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("gwrbathhall", "Bathing hall", 13, function (R) { gwrBaths(R, "Bath attendant"); }, { public: true });
wgRoom("gwrboiler", "Boiler house", 8, function (R) {
var w = R.w, d = R.d;
R.put("gwrboiler", w - 1.0, -1.0, "in");
R.put("gwrcoal", 2.6, -d / 2 + 0.9, "n");
R.put("gwrcoal", 4.6, -d / 2 + 0.9, "n");
R.put("trtoolwall", w * 0.5, d / 2 - 0.12, "s");
R.staff("Bathhouse stoker", w - 2.6, 1.2, "in");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("gwrwashhouse", "Public laundry", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.4; v += 2.3)
R.put("gwrtrough", w - 0.5, v, "in");
R.put("gwrmangle", w * 0.45, -d / 2 + 0.6, "n");
R.put("gwrmangle", w * 0.45 + 1.3, -d / 2 + 0.6, "n");
R.put("gwrcopper", 2.4, -d / 2 + 0.6, "n");
R.put("gwrairer", w * 0.45, 1.2, "n");
R.put("benchin", 2.2, 1.2, "out");
R.staff("Bathhouse laundry hand", w * 0.45, -d / 2 + 1.4, "s");
R.spot(1.6, 0);
}, { public: true });
wgRoom("gwrdrying", "Drying room", 7, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.2; v += 1.4) {
R.put("gwrairer", w - 1.0, v, "in");
R.put("gwrairer", w - 3.0, v, "in");
}
R.wallS("wgshelving", 2.2);
R.spot(1.6, 0);
});
wgRoom("gwrplunge", "Plunge bath", 14, function (R) {
var w = R.w, d = R.d;
R.put("gwrpool", w - 2.4, -0.6, "in");
R.wallS("gpshower", 1.8);
R.wallS("gpshower", 2.9);
R.put("benchin", 1.6, 0.4, "out");
R.put("benchin", 1.6, 2.8, "out");
R.put("trlockers", 3.2, d / 2 - 0.35, "s");
R.staff("Bath attendant", 1.4, -2.2, "out");
R.spot(1.4, 0.8);
}, { public: true });
wgRoom("gwrfamilybath", "Family bathrooms", 9, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.3; v < d / 2 - 1.0; v += 2.6) {
R.put("gpbath", w - 0.55, v, "in");
R.put("wgbasin", w - 2.0, v - 0.6, "in");
if (v + 1.3 < d / 2 - 0.4)
R.put("gwrscreen", w - 0.8, v + 1.3, "n");
}
R.put("benchin", 2.2, -d / 2 + 0.5, "n");
R.spot(1.6, 0.6);
}, { public: true });
}
if (typeof wgPlace === "function") {
wgPlace(GWR_POOR, { floors: 3, w: 24, front: 20, floor: "wood", wall: 0xCFC6B2,
trade: "Poorhouse attendant", clerk: "Poorhouse clerk", head: "Master of the Poorhouse", secure: false,
wingName: "Washhouse · Dormitories · Chapel",
names: ["Refectory, kitchens and washhouse", "Dormitories and infirmary", "Schoolroom, chapel and offices"],
ground: { L: ["gwrkitchen", "gwrscullery", "gwrlaundry", "gwrsort"],
R: ["gwrwash:Men's washhouse", "gwrwash:Women's washhouse", "gwrstore", "gwrclothes"] },
up: [{ L: ["gwrdorm:Men's dormitory", "gwrdorm:Men's dormitory", "gwrsick", "gwrnight"],
R: ["gwrdorm:Women's dormitory", "gwrdorm:Women's dormitory", "gwrfamily", "gwrfamily", "restrooms"] },
{ L: ["gwrschool", "gwrnursery", "gwrchapel", "gwrsewing"],
R: ["office:Master's office", "gwrmatron", "gwralmoner", "records:Admissions register", "meeting:Guardians' board room", "staffroom", "lockers"] }],
fillers: ["lounge:Day room", "linen:Linen cupboard"] });
wgPlace(GWR_YARD, { floors: 1, w: 24, front: 22, floor: "stone", wall: 0x8A867C,
trade: "Yard hand", clerk: "Weighbridge clerk", head: "Yard boss", secure: true,
wingName: "Staff only · Sorting sheds", names: ["The yard"],
ground: { L: ["gwrshed", "gwrragroom", "gwrbaling"], R: ["gwrmetal", "office:Yard office", "staffroom:Mess room", "lockers", "restrooms"] },
fillers: ["store:Tool store"] });
wgPlace(GWR_BATH, { floors: 2, w: 22, front: 16, floor: "tile", wall: 0xC2CCC2,
trade: "Bath attendant", clerk: "Bathhouse cashier", head: "Bathhouse keeper", secure: false,
wingName: "To the baths and the laundry", names: ["Bathing halls and laundry", "Plunge bath and family bathrooms"],
ground: { L: ["gwrbathhall:Men's bathing hall", "gwrboiler"], R: ["gwrbathhall:Women's bathing hall", "gwrwashhouse"] },
up: [{ L: ["gwrplunge", "gwrdrying", "linen:Towel store", "office:Keeper's office"], R: ["gwrfamilybath", "staffroom", "lockers", "restrooms"] }],
fillers: ["lounge:Rest room", "linen:Towel store"] });
}
if (typeof WG_FRONT !== "undefined") {
WG_FRONT[GWR_POOR] = function (K) { return __ZC(320, 13, this, arguments, new.target); };
WG_FRONT[GWR_YARD] = function (K) { return __ZC(320, 14, this, arguments, new.target); };
WG_FRONT[GWR_BATH] = function (K) { return __ZC(320, 15, this, arguments, new.target); };
}
"use strict";
var GHR_CLUB = "The Crescent Club", GHR_AGENCY = "The High Ring Household Agency", GHR_ORANGERY = "The High Ring Orangery";
var GHR = { playing: false, club: null, agency: null, orangery: null };
function ghrIds(a, b) { var o = []; for (var i = a; i <= b; i++)
o.push(i); return o; }
if (typeof S === "function" && typeof KIT !== "undefined" && !KIT.ghrorangery) {
S("ghrorangery", "structure", [30, 13, 19], [
{ g: "box", s: [30, 0.8, 15], p: [0, 0.4, -1.5], c: 0xCFC6B4 },
{ g: "box", s: [29, 6.2, 14], p: [0, 3.9, -1.5], c: "glass" },
{ g: "box", s: [0.22, 6.2, 0.22], p: [-14, 3.9, 5.55], c: 0xF2EFE6, rep: [15, 2, 0, 0] },
{ g: "box", s: [0.22, 6.2, 0.22], p: [-14, 3.9, -8.55], c: 0xF2EFE6, rep: [15, 2, 0, 0] },
{ g: "box", s: [0.22, 6.2, 0.22], p: [-14.55, 3.9, -7], c: 0xF2EFE6, rep: [7, 0, 0, 2] },
{ g: "box", s: [0.22, 6.2, 0.22], p: [14.55, 3.9, -7], c: 0xF2EFE6, rep: [7, 0, 0, 2] },
{ g: "box", s: [29.6, 0.35, 14.6], p: [0, 7.0, -1.5], c: 0xF2EFE6 },
{ g: "tri", s: [29.6, 3, 14.6], p: [0, 7.15, -1.5], c: "glass" },
{ g: "box", s: [29.8, 0.25, 0.3], p: [0, 10.15, -1.5], c: 0xF2EFE6 },
{ g: "cyl", s: [2.2, 2.6, 2.0, 12], p: [0, 11.0, -1.5], c: "glass" },
{ g: "cone", s: [2.4, 1.2, 12], p: [0, 12.6, -1.5], c: 0xF2EFE6 },
{ g: "sph", s: [1.7], p: [-10, 3.2, -1.5], c: 0x3F7A3A, rep: [5, 5, 0, 0] },
{ g: "sph", s: [0.22], p: [-10.7, 3.9, -0.2], c: 0xE08A2A, rep: [5, 5, 0, 0] },
{ g: "box", s: [6.4, 5.2, 2.6], p: [0, 3.4, 7.0], c: "glass" },
{ g: "box", s: [6.8, 0.4, 3.0], p: [0, 6.1, 7.0], c: 0xF2EFE6 },
{ g: "box", s: [0.25, 5.2, 0.25], p: [-3.1, 3.4, 8.25], c: 0xF2EFE6, rep: [2, 6.2, 0, 0] },
{ g: "box", s: [2.4, 3.0, 0.15], p: [0, 2.3, 8.35], c: "dark" },
{ g: "box", s: [7.4, 0.4, 1.2], p: [0, 0.2, 9.0], c: 0xCFC6B4 }
], ["orangery", "glasshouse", "palm house", "glass house"], { sign: [0, 6.75, 8.55, 6, 0.9] });
}
if (typeof gapPlace === "function") {
gapPlace({ key: GHR_CLUB, ring: "estates", arch: "manor", s: 0.9, jobs: ghrIds(3840, 3853), fit: [],
note: "The High Ring's members' club: fine dining, the bar, the library, billiards and cards, the ballroom, and guest suites. Every dreamer is welcomed as a guest.",
menu: "The club dining room and bar: fine dining, wine and coffee" });
gapPlace({ key: GHR_AGENCY, ring: "estates", arch: "museum", s: 0.85, jobs: ghrIds(3854, 3866), fit: [],
note: "Where the great houses of the Crescent and Backers Street engage their staff: butlers, housekeepers, maids, valets, chauffeurs, gardeners, nannies, guards, cooks and footmen." });
gapPlace({ key: GHR_ORANGERY, ring: "estates", arch: "ghrorangery", s: 1, jobs: ghrIds(3867, 3869), fit: [],
note: "A public glasshouse of orange and lemon trees and palms round a fountain, with a tea room, the rose house, and the Rose Gardens beside it. Free to walk in.",
menu: "The Orangery tea room: afternoon tea, lemonade and cake" });
}
var GHR_TEX = {}, GHR_MAT = {};
function ghrTex(id, cw, ch, draw) {
if (GHR_TEX[id])
return GHR_TEX[id];
var c = document.createElement("canvas");
c.width = cw;
c.height = ch;
draw(c.getContext("2d"), cw, ch);
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace && "colorSpace" in t)
t.colorSpace = THREE.SRGBColorSpace;
return (GHR_TEX[id] = t);
}
function ghrFace(g, id, tex, w, h, x, y, z) {
var m = GHR_MAT[id] || (GHR_MAT[id] = new THREE.MeshLambertMaterial({ map: tex }));
var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
p.position.set(x, y, z);
g.add(p);
return p;
}
function ghrBoardTex(id, bg, ink, head, lines, font) {
return ghrTex(id, 512, 320, function (x, W, H) {
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = ink;
x.globalAlpha = 0.5;
x.lineWidth = 4;
x.strokeRect(10, 10, W - 20, H - 20);
x.globalAlpha = 1;
x.fillStyle = ink;
x.textAlign = "center";
x.font = "bold 30px Georgia,serif";
x.fillText(head, W / 2, 52);
x.font = (font || "20px Georgia,serif");
x.textAlign = "left";
lines.forEach(function (t, i) { x.fillText(t, 34, 96 + i * 30); });
});
}
function ghrPieces() {
if (typeof gapPiece !== "function" || typeof trB !== "function" || typeof FURN !== "object" || !FURN)
return;
var M = function (c, t, o) { return trM(c, t || null, o || null); };
var mahog = function () { return M(0x4A2618, "wood"); }, oak = function () { return M(0x7A5634, "wood"); }, brass = function () { return M(0xC9A040, null, "shine"); };
var silver = function () { return M(0xB8BCC2, null, "shine"); }, linen = function () { return M(0xEEEAE0); }, paper = function () { return M(0xF4F0E4); };
var glass = function () { return M(0xCFE4EC, null, "glass"); }, leaf = function () { return M(0x3C6E34); }, stone = function () { return M(0xCFC8BA, "stone"); };
function chair(g, x, z, f, seat) { var w = mahog(); trB(g, 0.42, 0.44, 0.42, w, x, 0.22, z); trB(g, 0.42, 0.05, 0.42, seat, x, 0.465, z); trB(g, 0.42, 0.55, 0.06, w, x, 0.76, z - f * 0.2); }
function setting(g, x, z) { trC(g, 0.12, 0.12, 0.015, 14, M(0xF8F6F0), x, 0.795, z); trB(g, 0.02, 0.01, 0.2, silver(), x - 0.17, 0.79, z); trB(g, 0.02, 0.01, 0.2, silver(), x + 0.17, 0.79, z); trC(g, 0.035, 0.025, 0.12, 8, glass(), x + 0.14, 0.85, z - 0.16); }
gapPiece("ghrporterdesk", 2.6, 0.8, true, function (g) {
var w = mahog();
trB(g, 2.6, 1.05, 0.12, w, 0, 0.525, 0.34);
trB(g, 2.72, 0.05, 0.44, w, 0, 1.08, 0.3);
trB(g, 2.6, 0.05, 0.7, M(0x2E3A2E), 0, 0.78, 0);
trB(g, 0.12, 0.78, 0.7, w, -1.24, 0.39, 0);
trB(g, 0.12, 0.78, 0.7, w, 1.24, 0.39, 0);
trB(g, 0.5, 0.05, 0.36, M(0x6A1E1E), -0.6, 0.82, -0.05);
trB(g, 0.46, 0.01, 0.32, paper(), -0.6, 0.85, -0.05);
trC(g, 0.06, 0.07, 0.06, 12, brass(), 0.55, 0.84, 0.12);
trS(g, 0.02, brass(), 0.55, 0.88, 0.12);
trC(g, 0.015, 0.015, 0.4, 6, brass(), 1.0, 1.0, -0.1);
trC(g, 0.1, 0.15, 0.14, 12, M(0x2E5A3A), 1.0, 1.22, -0.1);
});
var pigeon = ghrTex("pigeon", 256, 160, function (x, W, H) {
x.fillStyle = "#3A2416";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 5; r++)
for (var q = 0; q < 8; q++) {
var X = 4 + q * 31, Y = 4 + r * 31;
x.fillStyle = "#1E140C";
x.fillRect(X, Y, 28, 28);
if ((r * 3 + q * 5) % 4 !== 0) {
x.fillStyle = (r + q) % 3 ? "#EFE8D8" : "#E2D6BA";
x.fillRect(X + 4, Y + 10, 20, 14);
}
if ((r + q) % 5 === 1) {
x.fillStyle = "#C9A040";
x.fillRect(X + 12, Y + 2, 3, 8);
}
}
});
gapPiece("ghrpigeon", 2.0, 0.22, false, function (g) { trB(g, 2.0, 1.3, 0.18, mahog(), 0, 1.55, 0); ghrFace(g, "pigeon", pigeon, 1.9, 1.2, 0, 1.55, 0.095); });
function rail(g, cols, hats) {
var b = brass();
trC(g, 0.025, 0.025, 1.85, 6, b, -1.05, 0.925, 0);
trC(g, 0.025, 0.025, 1.85, 6, b, 1.05, 0.925, 0);
trB(g, 0.1, 0.04, 0.6, b, -1.05, 0.02, 0);
trB(g, 0.1, 0.04, 0.6, b, 1.05, 0.02, 0);
trC(g, 0.02, 0.02, 2.1, 6, b, 0, 1.75, 0, 0, 0, Math.PI / 2);
trB(g, 2.12, 0.03, 0.36, oak(), 0, 1.98, 0);
cols.forEach(function (c, i) { trB(g, 0.12, 1.0, 0.5, M(c), -0.9 + i * 0.3, 1.22, 0); });
(hats || []).forEach(function (c, i) { trC(g, 0.13, 0.15, 0.12, 10, M(c), -0.7 + i * 0.7, 2.06, 0); });
}
gapPiece("ghrcloakrail", 2.2, 0.6, true, function (g) { rail(g, [0x1E2433, 0x34343A, 0x9A7A52, 0x16161A, 0x5A5E66, 0x2A3A2E, 0x3E2A22], [0x16161A, 0x6A5A46, 0x2A2A30]); });
gapPiece("ghrmembersbook", 0.7, 0.6, true, function (g) {
var w = mahog();
trC(g, 0.25, 0.3, 0.06, 12, w, 0, 0.03, 0);
trC(g, 0.06, 0.09, 1.0, 8, w, 0, 0.5, 0);
trB(g, 0.6, 0.04, 0.45, w, 0, 1.05, 0, -0.35);
trB(g, 0.5, 0.04, 0.36, M(0x2E4A2E), 0, 1.085, 0.01, -0.35);
trB(g, 0.46, 0.012, 0.32, paper(), 0, 1.11, 0.01, -0.35);
trB(g, 0.02, 0.01, 0.3, M(0x8A1E22), 0.05, 1.12, 0.02, -0.35);
});
var clubNotice = ghrBoardTex("clubnotice", "#1E3226", "#E8D8A8", "The Crescent Club", ["Members' notices", "Dinner served in the dining room daily", "The bar is open to members and their guests", "Billiards and cards: ask the games steward", "The library: quiet, please", "Guests are welcome: sign at the porter's desk", "Read the members' book for all the club offers"]);
gapPiece("ghrnotice", 1.4, 0.1, false, function (g) { trB(g, 1.4, 1.0, 0.05, M(0xA8823A, null, "shine"), 0, 1.65, 0); ghrFace(g, "clubnotice", clubNotice, 1.3, 0.9, 0, 1.65, 0.03); });
gapPiece("ghrdining", 1.9, 2.1, true, function (g) {
var cl = linen(), seat = M(0x6A1E24);
trB(g, 1.6, 0.05, 0.9, cl, 0, 0.76, 0);
trB(g, 1.64, 0.3, 0.94, cl, 0, 0.6, 0);
[-0.7, 0.7].forEach(function (x) { [-0.36, 0.36].forEach(function (z) { trB(g, 0.08, 0.45, 0.08, mahog(), x, 0.225, z); }); });
[-0.4, 0.4].forEach(function (x) { setting(g, x, 0.28); setting(g, x, -0.28); chair(g, x, 0.75, -1, seat); chair(g, x, -0.75, 1, seat); });
trC(g, 0.03, 0.05, 0.25, 8, silver(), 0, 0.91, 0);
trC(g, 0.018, 0.018, 0.14, 6, M(0xF4F0E4), 0, 1.1, 0);
trS(g, 0.06, M(0xB83A4A), 0.25, 0.84, 0);
});
gapPiece("ghrlongdining", 3.8, 2.1, true, function (g) {
var cl = linen(), seat = M(0x6A1E24);
trB(g, 3.4, 0.05, 1.0, cl, 0, 0.76, 0);
trB(g, 3.44, 0.3, 1.04, cl, 0, 0.6, 0);
[-1.6, 1.6].forEach(function (x) { [-0.4, 0.4].forEach(function (z) { trB(g, 0.08, 0.45, 0.08, mahog(), x, 0.225, z); }); });
[-1.2, -0.4, 0.4, 1.2].forEach(function (x) { setting(g, x, 0.3); setting(g, x, -0.3); chair(g, x, 0.8, -1, seat); chair(g, x, -0.8, 1, seat); });
[-0.8, 0.8].forEach(function (x) { trC(g, 0.03, 0.05, 0.25, 8, silver(), x, 0.91, 0); trC(g, 0.018, 0.018, 0.14, 6, M(0xF4F0E4), x, 1.1, 0); });
trS(g, 0.1, M(0xC84A5A), 0, 0.86, 0);
});
gapPiece("ghrsideboard", 2.0, 0.55, true, function (g) {
var w = mahog();
trB(g, 2.0, 0.9, 0.5, w, 0, 0.45, 0);
trB(g, 2.06, 0.04, 0.54, w, 0, 0.92, 0);
[-0.5, 0.5].forEach(function (x) { trB(g, 0.9, 0.7, 0.02, M(0x5A3020, "wood"), x, 0.45, 0.255); trS(g, 0.025, brass(), x + (x < 0 ? 0.38 : -0.38), 0.5, 0.27); });
trS(g, 0.2, silver(), -0.55, 0.95, 0, 1, 0.6, 1);
trS(g, 0.2, silver(), 0.05, 0.95, 0, 1, 0.6, 1);
trC(g, 0.06, 0.08, 0.24, 10, glass(), 0.55, 1.06, 0);
trC(g, 0.06, 0.08, 0.24, 10, glass(), 0.75, 1.06, 0);
trB(g, 0.5, 0.02, 0.32, silver(), 0.65, 0.95, 0);
});
var wine = ghrTex("wine", 256, 256, function (x, W, H) {
x.fillStyle = "#2A1A10";
x.fillRect(0, 0, W, H);
var cols = ["#1E3A1E", "#3A1418", "#4A3A16", "#22301C", "#2A1012"];
for (var r = 0; r < 10; r++)
for (var q = 0; q < 10; q++) {
x.fillStyle = "#140C08";
x.fillRect(q * 25.6 + 1, r * 25.6 + 1, 24, 24);
if ((r * 7 + q * 3) % 9 !== 0) {
x.fillStyle = cols[(r * 3 + q) % cols.length];
x.beginPath();
x.arc(q * 25.6 + 13, r * 25.6 + 13, 9, 0, 7);
x.fill();
x.fillStyle = "#C9B48A";
x.beginPath();
x.arc(q * 25.6 + 13, r * 25.6 + 13, 3, 0, 7);
x.fill();
}
}
});
gapPiece("ghrwinerack", 2.0, 0.45, true, function (g) { trB(g, 2.0, 2.2, 0.42, M(0x3A2414, "wood"), 0, 1.1, 0); ghrFace(g, "wine", wine, 1.9, 2.1, 0, 1.1, 0.215); });
gapPiece("ghrbarcounter", 2.6, 0.8, true, function (g) {
var w = mahog();
trB(g, 2.6, 1.05, 0.12, w, 0, 0.525, 0.34);
trB(g, 2.7, 0.06, 0.8, M(0x3A3430, null, "shine"), 0, 1.08, 0.1);
trB(g, 2.6, 0.05, 0.5, w, 0, 0.9, -0.05);
trC(g, 0.03, 0.03, 2.5, 8, brass(), 0, 0.2, 0.52, 0, 0, Math.PI / 2);
trC(g, 0.04, 0.03, 0.1, 8, glass(), -0.8, 1.16, 0.0);
trC(g, 0.04, 0.03, 0.1, 8, glass(), -0.65, 1.16, 0.05);
trC(g, 0.05, 0.05, 0.02, 10, M(0xC9A040, null, "shine"), 0.7, 1.12, 0.0);
});
var backbar = ghrTex("backbar", 256, 128, function (x, W, H) {
x.fillStyle = "#3A2214";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8AA0A8";
x.fillRect(6, 6, W - 12, 30);
var cols = ["#5A2A10", "#1E3A1E", "#B88A2A", "#3A1418", "#D8D0B0", "#2A2A40", "#8A4A1A"];
[44, 86].forEach(function (Y, r) {
x.fillStyle = "#24140A";
x.fillRect(4, Y + 30, W - 8, 4);
for (var i = 0; i < 18; i++) {
var X = 10 + i * 13.5;
x.fillStyle = cols[(i * 3 + r) % cols.length];
x.fillRect(X, Y + 6, 9, 24);
x.fillRect(X + 3, Y, 3, 7);
}
});
});
gapPiece("ghrbackbar", 2.6, 0.45, true, function (g) {
var w = mahog();
trB(g, 2.6, 0.9, 0.45, w, 0, 0.45, 0);
trB(g, 2.64, 0.04, 0.48, w, 0, 0.92, 0);
trB(g, 2.6, 1.4, 0.2, w, 0, 1.65, -0.12);
ghrFace(g, "backbar", backbar, 2.4, 1.25, 0, 1.65, -0.015);
});
gapPiece("ghrbilliard", 3.0, 1.7, true, function (g) {
var w = mahog(), cloth = M(0x1E5A32);
trB(g, 2.7, 0.18, 1.5, w, 0, 0.72, 0);
trB(g, 2.5, 0.03, 1.3, cloth, 0, 0.82, 0);
trB(g, 2.7, 0.07, 0.1, w, 0, 0.845, 0.7);
trB(g, 2.7, 0.07, 0.1, w, 0, 0.845, -0.7);
trB(g, 0.1, 0.07, 1.5, w, 1.3, 0.845, 0);
trB(g, 0.1, 0.07, 1.5, w, -1.3, 0.845, 0);
[-1.15, 0, 1.15].forEach(function (x) { [-0.6, 0.6].forEach(function (z) { trC(g, 0.07, 0.09, 0.64, 8, w, x, 0.32, z); }); });
var red = M(0xA01E1E, null, "shine");
[[0.6, 0], [0.68, 0.05], [0.68, -0.05], [0.76, 0.1], [0.76, 0], [0.76, -0.1]].forEach(function (p) { trS(g, 0.03, red, p[0], 0.865, p[1]); });
trS(g, 0.03, M(0xF4F2EA, null, "shine"), -0.8, 0.865, 0.1);
trS(g, 0.03, M(0xE8C840, null, "shine"), -0.8, 0.865, -0.15);
trB(g, 1.9, 0.12, 0.42, M(0x24402E), 0, 1.8, 0);
trC(g, 0.012, 0.012, 0.9, 6, brass(), -0.8, 2.3, 0);
trC(g, 0.012, 0.012, 0.9, 6, brass(), 0.8, 2.3, 0);
});
gapPiece("ghrcuerack", 1.4, 0.15, false, function (g) {
var w = mahog();
trB(g, 1.2, 1.3, 0.05, w, 0, 1.25, 0);
trB(g, 1.2, 0.08, 0.12, w, 0, 0.62, 0.05);
for (var i = 0; i < 6; i++)
trC(g, 0.011, 0.018, 1.45, 6, M(0xC8A068, "wood"), -0.5 + i * 0.2, 1.32, 0.06);
trB(g, 1.2, 0.3, 0.04, M(0x1E2A1E), 0, 2.1, 0.02);
trB(g, 1.0, 0.02, 0.01, M(0xE8E0C8), 0, 2.12, 0.045);
});
gapPiece("ghrcardtable", 1.9, 1.9, true, function (g) {
var w = mahog(), seat = M(0x2E4A3A);
trB(g, 0.9, 0.05, 0.9, w, 0, 0.74, 0);
trB(g, 0.8, 0.01, 0.8, M(0x1E5A32), 0, 0.77, 0);
[-0.38, 0.38].forEach(function (x) { [-0.38, 0.38].forEach(function (z) { trB(g, 0.06, 0.72, 0.06, w, x, 0.36, z); }); });
chair(g, 0, 0.72, -1, seat);
chair(g, 0, -0.72, 1, seat);
trB(g, 0.42, 0.44, 0.42, w, 0.72, 0.22, 0);
trB(g, 0.42, 0.05, 0.42, seat, 0.72, 0.465, 0);
trB(g, 0.06, 0.55, 0.42, w, 0.92, 0.76, 0);
trB(g, 0.42, 0.44, 0.42, w, -0.72, 0.22, 0);
trB(g, 0.42, 0.05, 0.42, seat, -0.72, 0.465, 0);
trB(g, 0.06, 0.55, 0.42, w, -0.92, 0.76, 0);
[[0, 0.25, 0.2], [0, -0.25, -0.3], [0.25, 0, 1.2], [-0.25, 0, 0.6], [0.05, 0.02, 0.9]].forEach(function (p) { trB(g, 0.07, 0.006, 0.1, M(0xF4F0E8), p[0], 0.78, p[1], 0, p[2], 0); });
});
gapPiece("ghrgrandpiano", 1.6, 2.7, true, function (g) {
var b = M(0x141216, null, "shine");
trB(g, 1.5, 0.3, 1.0, b, 0, 0.85, 0.35);
trC(g, 0.75, 0.75, 0.3, 18, b, 0, 0.85, -0.2);
trB(g, 1.3, 0.06, 0.24, M(0xF4F0E8), 0, 0.99, 0.95);
trB(g, 1.2, 0.04, 0.1, b, 0, 1.03, 0.9);
trB(g, 1.4, 0.03, 1.7, b, 0.22, 1.35, 0.0, 0, 0, -0.42);
trC(g, 0.05, 0.06, 0.72, 8, b, -0.62, 0.36, 0.75);
trC(g, 0.05, 0.06, 0.72, 8, b, 0.62, 0.36, 0.75);
trC(g, 0.05, 0.06, 0.72, 8, b, 0, 0.36, -0.85);
trB(g, 0.8, 0.5, 0.35, b, 0, 0.25, 1.45);
trB(g, 0.82, 0.05, 0.37, M(0x3A1418), 0, 0.51, 1.45);
});
gapPiece("ghrgiltchairs", 2.4, 0.55, true, function (g) {
var gold = M(0xB8943A, null, "shine"), seat = M(0x8A2A2E);
for (var i = 0; i < 4; i++) {
var x = -0.9 + i * 0.6;
trB(g, 0.44, 0.44, 0.44, gold, x, 0.22, 0);
trB(g, 0.44, 0.05, 0.44, seat, x, 0.465, 0);
trB(g, 0.44, 0.5, 0.05, gold, x, 0.74, -0.2);
trB(g, 0.36, 0.36, 0.02, seat, x, 0.76, -0.17);
}
});
gapPiece("ghrpapers", 1.0, 0.6, true, function (g) {
var w = mahog();
trB(g, 0.9, 0.05, 0.5, w, 0, 0.45, 0);
[-0.4, 0.4].forEach(function (x) { trB(g, 0.05, 0.43, 0.4, w, x, 0.215, 0); });
trB(g, 0.36, 0.015, 0.26, paper(), -0.2, 0.485, 0, 0, 0.2, 0);
trB(g, 0.36, 0.015, 0.26, M(0xE8E2D2), 0.18, 0.49, 0.03, 0, -0.15, 0);
trB(g, 0.36, 0.015, 0.26, paper(), 0.02, 0.5, -0.06, 0, 0.05, 0);
});
gapPiece("ghrlibdesk", 1.8, 0.8, true, function (g) {
var w = mahog();
trB(g, 1.7, 0.06, 0.75, w, 0, 0.76, 0);
trB(g, 0.45, 0.74, 0.7, w, -0.6, 0.37, 0);
trB(g, 0.45, 0.74, 0.7, w, 0.6, 0.37, 0);
trB(g, 1.62, 0.01, 0.6, M(0x2E4A2E), 0, 0.795, 0);
trB(g, 0.5, 0.32, 0.36, oak(), 0.5, 0.96, -0.12);
for (var i = 0; i < 3; i++)
trS(g, 0.015, brass(), 0.38 + i * 0.12, 0.96, 0.07);
trB(g, 0.3, 0.06, 0.22, M(0x6A1E1E), -0.3, 0.83, 0.05);
trB(g, 0.24, 0.08, 0.18, M(0x2A3A5A), -0.55, 0.84, -0.1);
});
gapPiece("ghrregister", 1.0, 0.7, true, function (g) {
var w = mahog();
trB(g, 0.9, 0.95, 0.55, w, 0, 0.475, 0);
trB(g, 0.95, 0.04, 0.62, w, 0, 0.99, 0, -0.18);
trB(g, 0.78, 0.06, 0.5, M(0x5A1E1A), 0, 1.03, 0, -0.18);
trB(g, 0.72, 0.012, 0.44, paper(), 0, 1.065, 0, -0.18);
trC(g, 0.04, 0.05, 0.06, 8, brass(), 0.36, 1.03, -0.22);
trC(g, 0.004, 0.004, 0.18, 4, M(0xE8E0D0), 0.38, 1.12, -0.22, 0.3, 0, 0);
});
var houseMap = ghrTex("housemap", 512, 320, function (x, W, H) {
x.fillStyle = "#E8E0C8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#6A5A3A";
x.lineWidth = 4;
x.strokeRect(8, 8, W - 16, H - 16);
x.fillStyle = "#3A2E1E";
x.textAlign = "center";
x.font = "bold 24px Georgia,serif";
x.fillText("The great houses of the High Ring", W / 2, 40);
var cx = W / 2, cy = 186;
x.fillStyle = "#B8C8A0";
x.beginPath();
x.arc(cx, cy, 128, 0, 7);
x.fill();
x.fillStyle = "#E8E0C8";
x.beginPath();
x.arc(cx, cy, 46, 0, 7);
x.fill();
x.strokeStyle = "#8A7A5A";
x.lineWidth = 7;
[74, 108].forEach(function (r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); });
x.fillStyle = "#5A3A22";
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2 + 0.1;
[62, 88, 96, 120].forEach(function (r, k) { if ((i + k) % 2)
return; x.fillRect(cx + Math.cos(a) * r - 3, cy + Math.sin(a) * r - 3, 6, 6); });
}
x.fillStyle = "#3A2E1E";
x.font = "16px Georgia,serif";
x.fillText("The Tower", cx, cy + 5);
x.textAlign = "left";
x.font = "17px Georgia,serif";
x.fillText("inner ring: the Crescent", 20, 290);
x.textAlign = "right";
x.fillText("outer ring: Backers Street", W - 20, 290);
});
gapPiece("ghrhousemap", 2.4, 0.1, false, function (g) { trB(g, 2.4, 1.5, 0.05, M(0x8A6A3A, "wood"), 0, 1.65, 0); ghrFace(g, "housemap", houseMap, 2.3, 1.42, 0, 1.65, 0.03); });
var situations = ghrBoardTex("situations", "#F2ECDC", "#2E2418", "Situations vacant", ["In the great houses of the High Ring:", "Butlers · Housekeepers · Footmen", "Lady's maids · Valets · Cooks", "Chauffeurs · Gardeners · Nannies", "Estate security guards", "Training given in our own school.", "Enquire at the desk, or press E here."], "19px Georgia,serif");
gapPiece("ghrsituations", 1.4, 0.1, false, function (g) { trB(g, 1.4, 1.0, 0.05, M(0x4A2E1C, "wood"), 0, 1.6, 0); ghrFace(g, "situations", situations, 1.3, 0.9, 0, 1.6, 0.03); });
var rota = ghrBoardTex("rota", "#B8946A", "#2A1C10", "Today's rounds", ["Butlers: open the houses by eight", "Housekeepers: keys from the watch room", "Footmen: silver, then luncheon", "Chauffeurs: cars from the motor house", "Gardeners: tools from the store", "Guards: the Crescent, then Backers Street", "Press E for the houses on today's rota"], "19px Georgia,serif");
gapPiece("ghrrota", 1.6, 0.1, false, function (g) { trB(g, 1.6, 1.1, 0.05, M(0x5A3A22, "wood"), 0, 1.6, 0); ghrFace(g, "rota", rota, 1.5, 1.0, 0, 1.6, 0.03); });
gapPiece("ghruniformrail", 2.2, 0.6, true, function (g) { rail(g, [0x141418, 0x141418, 0x5A5E66, 0xEDEAE2, 0x2E3440, 0x141418, 0x5A5E66], [0x2E3440, 0x141418]); });
gapPiece("ghrlaidtable", 2.4, 1.2, true, function (g) {
var cl = linen();
trB(g, 2.2, 0.05, 1.0, cl, 0, 0.76, 0);
trB(g, 2.24, 0.3, 1.04, cl, 0, 0.6, 0);
[-1.0, 1.0].forEach(function (x) { [-0.4, 0.4].forEach(function (z) { trB(g, 0.08, 0.45, 0.08, mahog(), x, 0.225, z); }); });
[-0.7, 0, 0.7].forEach(function (x) { setting(g, x, 0.3); setting(g, x, -0.3); trC(g, 0.03, 0.025, 0.14, 8, glass(), x + 0.24, 0.86, 0.12); trC(g, 0.03, 0.025, 0.14, 8, glass(), x + 0.24, 0.86, -0.12); });
trS(g, 0.18, silver(), 0, 0.82, 0, 1, 0.6, 1);
});
gapPiece("ghrpressing", 1.6, 0.6, true, function (g) {
var s = M(0x5A5E66, null, "shine");
trB(g, 1.5, 0.05, 0.5, M(0xE8E4DA), 0, 0.85, 0);
trB(g, 0.04, 0.85, 0.04, s, -0.5, 0.42, 0, 0, 0, 0.35);
trB(g, 0.04, 0.85, 0.04, s, 0.5, 0.42, 0, 0, 0, -0.35);
trB(g, 0.22, 0.1, 0.12, M(0x9AA0A8, null, "shine"), 0.4, 0.92, 0);
trB(g, 0.14, 0.05, 0.04, M(0x2A2A2E), 0.4, 1.0, 0);
trB(g, 0.36, 0.05, 0.26, paper(), -0.35, 0.9, 0);
trB(g, 0.3, 0.06, 0.24, M(0xF8F8F4), 0.0, 0.905, 0.05);
});
gapPiece("ghrcar", 2.2, 5.2, true, function (g) {
var body = M(0x1E3A2E, null, "shine"), dark = M(0x16161A), chrome = M(0xC8CCD0, null, "shine");
trB(g, 1.9, 0.7, 4.8, body, 0, 0.75, 0);
trB(g, 1.7, 0.65, 2.4, body, 0, 1.42, -0.4);
trB(g, 1.66, 0.5, 2.2, M(0x8AA4B0, null, "glass"), 0, 1.45, -0.4);
trB(g, 1.6, 0.25, 0.06, chrome, 0, 0.75, 2.42);
trB(g, 1.9, 0.12, 0.12, chrome, 0, 0.45, 2.44);
trB(g, 1.9, 0.12, 0.12, chrome, 0, 0.45, -2.44);
[[-0.9, 1.55], [0.9, 1.55], [-0.9, -1.6], [0.9, -1.6]].forEach(function (p) { trC(g, 0.38, 0.38, 0.26, 14, dark, p[0], 0.38, p[1], 0, 0, Math.PI / 2); });
});
gapPiece("ghrpalm", 1.4, 1.4, true, function (g) {
trC(g, 0.42, 0.34, 0.55, 12, M(0x7A5A3A, "wood"), 0, 0.275, 0);
trC(g, 0.38, 0.38, 0.03, 12, M(0x3A2A1A), 0, 0.55, 0);
trC(g, 0.07, 0.1, 1.9, 8, M(0x7A6248), 0, 1.5, 0);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, m = trB(g, 0.16, 0.02, 1.15, leaf(), Math.sin(a) * 0.48, 2.32, Math.cos(a) * 0.48);
m.rotation.set(0.5, a, 0, "YXZ");
}
});
function citrus(k, fruit) {
gapPiece(k, 1.0, 1.0, true, function (g) {
var pl = M(0x2E4A36), lead = M(0x8A8E90, null, "shine");
trB(g, 0.72, 0.72, 0.72, pl, 0, 0.36, 0);
trB(g, 0.76, 0.05, 0.76, lead, 0, 0.74, 0);
[[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]].forEach(function (p) { trS(g, 0.05, lead, p[0], 0.8, p[1]); });
trC(g, 0.05, 0.07, 0.95, 8, M(0x6A5038), 0, 1.2, 0);
trS(g, 0.55, leaf(), 0, 1.9, 0, 1, 0.9, 1);
var f = M(fruit);
for (var i = 0; i < 7; i++) {
var a = i * 0.9;
trS(g, 0.065, f, Math.sin(a) * 0.5, 1.78 + ((i % 3) - 1) * 0.2, Math.cos(a) * 0.5);
}
});
}
citrus("ghrcitrus", 0xE0882A);
citrus("ghrlemon", 0xE8D040);
gapPiece("ghrfountain", 3.4, 3.4, true, function (g) {
var st = stone(), water = M(0x4E7E92, null, "shine");
trC(g, 1.62, 1.72, 0.5, 24, st, 0, 0.25, 0);
trC(g, 1.5, 1.5, 0.04, 24, water, 0, 0.46, 0);
trC(g, 0.18, 0.26, 1.0, 10, st, 0, 0.95, 0);
trC(g, 0.62, 0.26, 0.2, 16, st, 0, 1.48, 0);
trC(g, 0.56, 0.56, 0.02, 16, water, 0, 1.57, 0);
trS(g, 0.13, st, 0, 1.72, 0);
});
gapPiece("ghrteatable", 1.0, 1.9, true, function (g) {
var cane = M(0xB8945A), cush = M(0x7A9A7A);
trC(g, 0.42, 0.42, 0.04, 16, linen(), 0, 0.74, 0);
trC(g, 0.44, 0.46, 0.22, 16, linen(), 0, 0.62, 0);
trC(g, 0.05, 0.12, 0.5, 8, M(0x3A3A3A), 0, 0.25, 0);
trC(g, 0.008, 0.008, 0.4, 6, silver(), 0, 0.95, 0);
[0.8, 0.95, 1.1].forEach(function (y, i) { trC(g, 0.15 - i * 0.03, 0.15 - i * 0.03, 0.01, 12, M(0xF8F6F0), 0, y, 0); trS(g, 0.03, M(i === 1 ? 0xE8C070 : 0xF0D8D0), 0.05, y + 0.025, 0.02); });
trS(g, 0.08, M(0xF4F2EC, null, "shine"), 0.22, 0.83, 0.12);
trB(g, 0.1, 0.02, 0.02, M(0xF4F2EC, null, "shine"), 0.32, 0.86, 0.12, 0, 0, 0.5);
[0.72, -0.72].forEach(function (z) { var f = z > 0 ? -1 : 1; trB(g, 0.48, 0.42, 0.46, cane, 0, 0.21, z); trB(g, 0.46, 0.06, 0.44, cush, 0, 0.45, z); trB(g, 0.48, 0.5, 0.06, cane, 0, 0.72, z - f * 0.21); });
});
gapPiece("ghrcakecase", 2.4, 0.8, true, function (g) {
trB(g, 2.4, 0.9, 0.7, M(0xE6DCC8), 0, 0.45, 0);
trB(g, 2.44, 0.04, 0.74, M(0xDCD8D0, null, "shine"), 0, 0.92, 0);
trB(g, 2.2, 0.42, 0.5, glass(), 0, 1.15, 0.05);
[[-0.8, 0xF4E6B0], [-0.3, 0x7A4A2E], [0.2, 0xF0D0D8], [0.7, 0xE8A040]].forEach(function (p) { trC(g, 0.08, 0.08, 0.01, 12, M(0xF8F6F0), p[0], 0.95, 0.05); trC(g, 0.15, 0.15, 0.12, 14, M(p[1]), p[0], 1.01, 0.05); });
});
gapPiece("ghrrosebed", 2.4, 1.2, true, function (g) {
trB(g, 2.4, 0.35, 1.2, M(0x9A6A50, "brick"), 0, 0.175, 0);
trB(g, 2.2, 0.02, 1.0, M(0x3A2A1C), 0, 0.36, 0);
var cols = [0xB0202E, 0xE89AAA, 0xF2EEE0, 0xF0B080];
for (var i = 0; i < 4; i++)
for (var j = 0; j < 2; j++) {
var x = -0.8 + i * 0.53, z = -0.25 + j * 0.5;
trS(g, 0.2, leaf(), x, 0.55, z);
trS(g, 0.075, M(cols[(i + j * 2) % 4]), x + 0.05, 0.74, z + 0.03);
}
});
gapPiece("ghrseedtrays", 2.4, 0.9, true, function (g) {
var w = oak();
trB(g, 2.4, 0.06, 0.85, w, 0, 0.85, 0);
[-1.1, 1.1].forEach(function (x) { [-0.35, 0.35].forEach(function (z) { trB(g, 0.06, 0.82, 0.06, w, x, 0.41, z); }); });
trB(g, 2.3, 0.04, 0.75, w, 0, 0.25, 0);
for (var i = 0; i < 4; i++)
[-0.2, 0.2].forEach(function (z) { var x = -0.85 + i * 0.56; trB(g, 0.5, 0.06, 0.35, M(0x1E1E20), x, 0.91, z); trB(g, 0.46, 0.04, 0.31, M(0x5A9A44), x, 0.95, z); });
});
gapPiece("ghrplantstand", 2.0, 0.9, true, function (g) {
var w = M(0xE8E4DA, "wood"), pot = M(0xA85A3A);
[[0.4, 0.3], [0.7, 0], [1.0, -0.3]].forEach(function (s) { trB(g, 2.0, 0.05, 0.3, w, 0, s[0], s[1]); trB(g, 2.0, s[0], 0.04, w, 0, s[0] / 2, s[1] - 0.15); });
var cols = [0x3C6E34, 0xB0202E, 0xE89AAA, 0xE0882A];
[[0.4, 0.3], [0.7, 0], [1.0, -0.3]].forEach(function (s, r) { for (var i = 0; i < 4; i++) {
var x = -0.75 + i * 0.5;
trC(g, 0.1, 0.08, 0.16, 8, pot, x, s[0] + 0.1, s[1]);
trS(g, 0.13, leaf(), x, s[0] + 0.27, s[1]);
if (r > 0)
trS(g, 0.05, M(cols[(i + r) % 4]), x + 0.04, s[0] + 0.38, s[1] + 0.02);
} });
});
}
ghrPieces();
if (typeof wgRoom === "function") {
wgRoom("ghrdining", "Dining room", 14, function (R) {
var w = R.w, d = R.d;
for (var u = 3.0; u < w - 1.3; u += 3.1)
for (var v = -d / 2 + 2.2; v < d / 2 - 2.4; v += 2.9)
R.put("ghrdining", u, v, "n");
R.wallS("ghrsideboard", 3.4);
R.wallS("ghrsideboard", Math.min(w - 1.4, 7.6));
R.wallN("fireplace", Math.min(w - 1.5, w * 0.6));
R.put("painting", w - 0.06, -2.6, "in");
R.put("painting", w - 0.06, 2.2, "in");
R.put("chandelier", w * 0.3, 0, 0);
R.put("chandelier", w * 0.75, 0, 0);
R.put("plant", 0.6, -d / 2 + 0.6, 0);
R.staff("Club maître d'hôtel", 1.4, d / 2 - 3.0, "out");
R.staff("Club waiter", 4.55, -0.4, "in");
R.staff("Club waiter", 7.65, 2.5, "out");
R.spot(1.6, 0);
R.spot(w * 0.5, -d / 2 + 1.2);
}, { public: true });
wgRoom("ghrprivdining", "Private dining room", 7, function (R) {
var w = R.w, d = R.d;
R.put("ghrlongdining", w * 0.55, -0.2, "n");
R.wallS("ghrsideboard", w * 0.55);
R.put("painting", w - 0.06, -0.2, "in");
R.put("chandelier", w * 0.55, -0.2, 0);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.staff("Club waiter", 2.2, -1.6, "out");
R.spot(1.6, 1.2);
}, { public: true });
wgRoom("ghrkitchen", "Kitchens", 10, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcookline", -2.2);
R.wallOut("wgcookline", 1.2);
R.staff("Club commis chef", w - 1.45, -2.2, "out");
R.staff("Club commis chef", w - 1.45, 1.2, "out");
R.put("wgsteeltable", w - 3.6, -2.2, "n");
R.put("wgsteeltable", w - 3.6, 0.4, "n");
R.staff("Club chef", w - 4.5, -0.9, "out");
R.wallS("wgdishpit", 2.8);
R.staff("Club kitchen porter", 2.8, -d / 2 + 1.25, "s");
R.wallS("fridge", 4.6);
R.wallS("fridge", 5.45);
R.wallN("wgshelving", w - 1.6);
R.wallN("wgshelving", w - 3.8);
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("ghrcellar", "Wine cellar", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.2; v += 2.1)
R.wallOut("ghrwinerack", v);
for (var u = 2.6; u < w - 2.2; u += 2.1)
R.wallS("ghrwinerack", u);
R.put("table", w * 0.5, 0.6, "n");
R.put("chair", w * 0.5 - 0.95, 0.6, "out");
R.put("chair", w * 0.5 + 0.95, 0.6, "in");
R.put("cask", 3.4, d / 2 - 1.0, "s");
R.staff("Club sommelier", w - 1.5, 0.43, "out");
R.spot(1.5, 0);
}, { secure: true });
wgRoom("ghrbar", "Members' bar", 10, function (R) {
var w = R.w, d = R.d;
R.put("ghrbarcounter", w - 2.2, -2.4, "in");
R.put("ghrbarcounter", w - 2.2, 0.2, "in");
R.wallOut("ghrbackbar", -2.4);
R.wallOut("ghrbackbar", 0.2);
R.staff("Crescent Club bartender", w - 1.2, -1.1, "in");
[-2.6, 1.6].forEach(function (v) { R.put("table", 3.4, v, "n"); R.put("armchair", 2.2, v, "out"); R.put("armchair", 4.6, v, "in"); });
R.wallS("sofa", Math.min(5.8, w - 3.6));
R.wallN("fireplace", Math.min(5.4, w - 3));
R.put("painting", w * 0.4, -d / 2 + 0.06, "n");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.spot(1.6, 0);
R.spot(w - 3.4, -1.1);
}, { public: true });
wgRoom("ghrlibrary", "Library", 10, function (R) {
var w = R.w, d = R.d;
for (var u = w - 1.0; u > 2.8; u -= 1.7) {
R.put("bookshelf", u, -d / 2 + 0.25, "n");
R.put("bookshelf", u, d / 2 - 0.25, "s");
}
R.wallOut("fireplace", 0);
R.put("armchair", w - 2.1, -1.4, "out");
R.put("armchair", w - 2.1, 1.4, "out");
R.put("rug", w - 2.0, 0, 0);
[-1.8, 1.6].forEach(function (v) { R.put("table", w * 0.45, v, "n"); R.put("chair", w * 0.45 - 0.95, v, "out"); R.put("chair", w * 0.45 + 0.95, v, "in"); });
R.put("ghrlibdesk", 2.4, -2.8, "out");
R.staff("Club librarian", 1.5, -2.8, "out");
R.spot(1.6, 1.2);
}, { public: true });
wgRoom("ghrbilliards", "Billiards room", 9, function (R) {
var w = R.w, d = R.d;
R.put("ghrbilliard", w * 0.55, 0, "n");
R.wallS("ghrcuerack", w * 0.55);
R.put("armchair", w * 0.4, d / 2 - 0.7, "s");
R.put("armchair", w * 0.7, d / 2 - 0.7, "s");
R.put("painting", w - 0.06, 1.4, "in");
R.put("clock", w - 0.25, -2.4, "in");
R.staff("Club games room steward", w - 1.6, -1.6, "in");
R.spot(1.6, 1.2);
R.spot(w * 0.55, -2.2);
});
wgRoom("ghrcards", "Card room", 8, function (R) {
var w = R.w, d = R.d;
R.put("ghrcardtable", 3.6, -1.2, "n");
if (w > 8.6)
R.put("ghrcardtable", 7.2, -1.2, "n");
R.put("ghrcardtable", 5.4, 2.0, "n");
R.wallS("ghrsideboard", w * 0.5);
R.wallOut("fireplace", 1.4);
R.put("painting", w - 0.06, -1.8, "in");
R.staff("Club games room steward", 1.6, -2.4, "out");
R.spot(1.4, 0.6);
});
wgRoom("ghrballroom", "Ballroom", 16, function (R) {
var w = R.w, d = R.d;
R.put("ghrgrandpiano", w - 1.6, -d / 2 + 2.0, "in");
R.wallS("ghrgiltchairs", 3.2);
R.wallS("ghrgiltchairs", 6.0);
R.wallN("ghrgiltchairs", 4.0);
R.wallN("ghrgiltchairs", 7.0);
R.put("ghrgiltchairs", w - 0.35, 1.0, "in");
R.put("ghrgiltchairs", w - 0.35, 4.0, "in");
R.put("wallmirror", w - 0.06, -2.0, "in");
R.put("wallmirror", w - 0.06, 6.4, "in");
R.put("chandelier", w * 0.5, -4, 0);
R.put("chandelier", w * 0.5, 0, 0);
R.put("chandelier", w * 0.5, 4, 0);
R.put("plant", 0.6, -d / 2 + 0.6, 0);
R.put("plant", w - 0.6, d / 2 - 0.6, 0);
R.spot(w * 0.5, 0);
R.spot(1.6, 0);
R.spot(w - 2.6, -d / 2 + 2.2);
}, { public: true });
wgRoom("ghrmorning", "Morning room", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("desk", -2.2);
R.put("chair", w - 1.25, -2.2, "out");
R.wallOut("desk", 0.8);
R.put("chair", w - 1.25, 0.8, "out");
R.wallS("sofa", w * 0.45);
R.put("ghrpapers", w * 0.45, -2.0, "n");
R.put("armchair", w * 0.45 - 1.3, -0.8, "s");
R.put("armchair", w * 0.45 + 1.3, -0.8, "s");
R.wallN("bookshelf", w * 0.6);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("painting", w * 0.45, -d / 2 + 0.06, "n");
R.spot(1.6, 0.8);
}, { public: true });
wgRoom("ghrgardenroom", "Garden room", 9, function (R) {
var w = R.w, d = R.d;
R.put("ghrpalm", w - 0.9, -d / 2 + 0.9, 0);
R.put("ghrpalm", w - 0.9, d / 2 - 0.9, 0);
R.put("ghrcitrus", w - 0.7, -1.2, 0);
R.put("ghrlemon", w - 0.7, 1.4, 0);
[[3.6, -2.4], [3.6, 1.6], [w - 3.6, -0.4]].forEach(function (p) { R.put("table", p[0], p[1], "n"); R.put("armchair", p[0], p[1] - 1.0, "n"); R.put("armchair", p[0], p[1] + 1.0, "s"); });
R.put("rug", w * 0.5, 0, 0);
R.put("plant", 0.6, -d / 2 + 0.6, 0);
R.spot(1.6, 0);
R.spot(w * 0.5, 0.6);
}, { public: true });
wgRoom("ghrdrawing", "Drawing room", 10, function (R) {
var w = R.w, d = R.d;
R.wallOut("fireplace", 0);
R.put("rug", w - 3.4, 0, 0);
R.put("sofa", w - 3.4, -1.9, "n");
R.put("sofa", w - 3.4, 1.9, "s");
R.put("armchair", w - 5.7, 0, "out");
R.put("table", w - 3.4, 0, "n");
R.wallS("piano", 2.8);
R.wallN("bookshelf", 4.4);
R.put("painting", w - 0.06, -3.0, "in");
R.put("painting", w - 0.06, 3.0, "in");
R.put("chandelier", w * 0.55, 0, 0);
R.put("plant", w - 0.5, -d / 2 + 0.55, 0);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.spot(1.6, 0);
}, { public: true });
wgRoom("ghrlinen", "Housekeeper's room", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgshelving", -1.4);
R.wallOut("wgshelving", 1.0);
R.wallS("wglaundry", 2.6);
R.put("ghrpressing", w * 0.5, 0.8, "n");
R.wallN("desk", w * 0.55);
R.staff("Club housekeeper", w * 0.5, 0.0, "n");
R.spot(1.4, 0);
}, { secure: true });
wgRoom("ghrquarters", "Staff quarters", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.3; v += 1.9) {
R.put("bed", w - 1.2, v, "in");
R.put("footchest", w - 2.55, v, "in");
}
R.wallS("wardrobe", 2.8);
R.wallS("wardrobe", 4.3);
R.put("table", 3.2, 1.4, "n");
R.put("chair", 2.3, 1.4, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("ghrinterview", "Interview room", 6, function (R) {
var w = R.w, d = R.d, u = Math.min(w - 1.8, Math.max(3.6, w * 0.62));
R.put("desk", u, -0.2, "in");
R.staff("Agency registrar", u + 0.85, -0.2, "in");
R.put("chair", u - 1.0, -0.7, "out");
R.put("chair", u - 1.0, 0.3, "out");
R.wallS("filecabinet", w - 0.8);
R.wallS("filecabinet", w - 1.5);
R.put("painting", w - 0.06, 1.2, "in");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.spot(1.5, 0.8);
}, { public: true });
wgRoom("ghrmuster", "Muster room", 9, function (R) {
var w = R.w, d = R.d;
R.put("ghrrota", w - 0.06, -1.0, "in");
R.put("keyrack", w - 0.12, 2.2, "in");
R.put("benchin", 4.2, -1.0, "out");
R.put("benchin", 4.2, 1.8, "out");
R.wallS("trlockers", 2.6);
R.wallS("trlockers", 3.6);
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.put("wallmirror", w * 0.6, d / 2 - 0.06, "s");
R.staff("Estate butler", w - 1.3, -2.6, "in");
R.staff("Estate footman", 5.4, -1.0, "out");
R.spot(1.6, 0.6);
});
wgRoom("ghrwatch", "Estate watch room", 6, function (R) {
var w = R.w, d = R.d;
R.put("wgcctv", w - 0.06, 0, "in");
R.put("wgcontrol", w - 1.25, 0, "in");
R.staff("Estate security guard", w - 2.3, 0, "out");
R.wallS("keyrack", 2.6);
R.wallS("trlockers", 4.4);
R.put("ghrhousemap", Math.max(4.2, w * 0.55), d / 2 - 0.06, "s");
R.spot(1.6, -0.5);
}, { secure: true });
wgRoom("ghrmotor", "Motor house", 11, function (R) {
var w = R.w, d = R.d;
R.put("ghrcar", w - 2.4, -1.2, "in");
R.put("tytoolchest", w - 0.5, d / 2 - 1.6, "in");
R.wallS("trtoolwall", 2.6);
R.wallS("workbench", 5.4);
R.put("tytyres", 2.2, d / 2 - 0.8, "s");
R.staff("Estate chauffeur", w - 4.4, 1.6, "in");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("ghrgardenstore", "Gardeners' store", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("trtoolwall", -1.0);
R.wallS("workbench", 3.6);
R.put("flowerbucket", w - 1.0, 1.4, "in");
R.put("flowerbucket", w - 1.0, 2.2, "in");
R.put("trsacks", 2.4, d / 2 - 0.7, "s");
R.staff("Estate gardener", w - 1.6, -1.0, "out");
R.spot(1.6, 0);
});
wgRoom("ghrsilver", "Silver service room", 10, function (R) {
var w = R.w, d = R.d, u = Math.max(4.2, w * 0.55);
R.put("ghrlaidtable", u, -1.6, "n");
R.put("ghrlaidtable", u, 1.8, "n");
R.wallOut("ghrsideboard", -3.6);
R.put("painting", w - 0.06, 1.8, "in");
R.staff("Butler school instructor", u - 1.8, -1.6, "out");
R.staff("Estate footman", u, 0.15, "s");
R.spot(1.6, 0.6);
});
wgRoom("ghrbutler", "Butler school", 10, function (R) {
var w = R.w, d = R.d;
R.put("blackboard", w - 0.12, 0, "in");
R.put("desk", w - 1.6, 0, "out");
R.staff("Butler school instructor", w - 1.0, 0.9, "in");
for (var u = w - 3.4; u > 3.0; u -= 1.7)
for (var v = -d / 2 + 1.4; v < d / 2 - 1.6; v += 1.9)
R.put("schooldesk", u, v, "in");
R.wallS("ghrpressing", 2.2);
R.wallN("ghrsideboard", Math.min(w - 1.4, 4.6));
R.spot(1.6, 0);
}, { public: true });
wgRoom("ghrcookschool", "Cookery kitchen", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcookline", -1.6);
R.put("wgsteeltable", w - 3.4, -1.6, "n");
R.put("wgsteeltable", w - 3.4, 1.2, "n");
R.wallS("fridge", 2.6);
R.wallS("wgdishpit", 4.4);
R.wallN("wgshelving", w - 1.6);
R.staff("Estate cook", w - 1.45, -1.6, "out");
R.spot(1.6, 0.6);
});
wgRoom("ghrhousekeep", "Housekeeping school", 9, function (R) {
var w = R.w, d = R.d;
R.put("bed", w - 1.2, -d / 2 + 1.4, "in");
R.wallS("wardrobe", 2.6);
R.wallS("wgshelving", 4.6);
R.wallOut("wglaundry", 2.4);
R.put("ghrpressing", w * 0.45, 0.8, "n");
R.put("dressform", 2.4, 2.0, "out");
R.staff("Estate housekeeper", w - 2.8, -1.0, "out");
R.staff("Estate lady's maid", w * 0.45, 0.2, "n");
R.spot(1.6, 0);
});
wgRoom("ghrnursery", "Day nursery", 8, function (R) {
var w = R.w, d = R.d;
R.put("crib", w - 0.8, -2.0, "in");
R.put("rug", w * 0.5, 0.6, 0);
R.put("toys", w * 0.5, 0.8, 0);
R.put("armchair", w - 1.3, 1.6, "in");
R.wallS("bookshelf", 3.0);
R.wallN("wardrobe", 4.2);
R.put("painting", w - 0.06, 0, "in");
R.staff("Estate nanny", w - 2.2, -2.0, "out");
R.spot(1.6, 0);
});
wgRoom("ghruniforms", "Uniform store", 7, function (R) {
var w = R.w, d = R.d;
R.put("ghruniformrail", w - 0.6, -1.4, "in");
R.put("ghruniformrail", w - 0.6, 1.0, "in");
R.put("ghruniformrail", Math.max(4.4, w * 0.5), -d / 2 + 0.6, "n");
R.put("wallmirror", w * 0.55, d / 2 - 0.06, "s");
R.put("dressform", 3.0, 0.6, "out");
R.wallS("wgshelving", 2.2);
R.staff("Estate valet", w - 1.8, -0.2, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("ghrpropagation", "Propagation house", 10, function (R) {
var w = R.w, d = R.d, u1 = Math.max(3.8, w * 0.36), u2 = Math.min(w - 1.6, u1 + 4.2);
for (var v = -d / 2 + 1.2; v < d / 2 - 1.5; v += 2.2) {
R.put("ghrseedtrays", u1, v, "n");
R.put("ghrseedtrays", u2, v, "n");
}
R.put("ghrlemon", w - 0.6, -d / 2 + 0.6, 0);
R.put("ghrcitrus", w - 0.6, d / 2 - 0.6, 0);
R.staff("Glasshouse gardener", (u1 + u2) / 2, -d / 2 + 2.3, "n");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("ghrpotting", "Potting shed", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("workbench", -1.2);
R.wallOut("trtoolwall", 1.6);
R.put("trsacks", 2.4, -d / 2 + 0.6, "n");
R.put("flowerbucket", 3.8, -d / 2 + 0.5, "n");
R.put("flowerbucket", 4.6, -d / 2 + 0.5, "n");
R.put("ghrseedtrays", w * 0.5, 0.4, "n");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("ghrrosehouse", "Rose house", 12, function (R) {
var w = R.w, d = R.d, u1 = Math.max(3.6, w * 0.3), u2 = Math.min(w - 2.2, u1 + 4.6);
for (var v = -d / 2 + 1.5; v < d / 2 - 1.4; v += 2.8) {
R.put("ghrrosebed", u1, v, "n");
R.put("ghrrosebed", u2, v, "n");
}
R.put("benchin", w - 0.5, -2.0, "in");
R.put("benchin", w - 0.5, 2.4, "in");
R.put("ghrpalm", w - 0.9, -d / 2 + 0.9, 0);
R.put("ghrpalm", w - 0.9, d / 2 - 0.9, 0);
R.staff("Glasshouse gardener", (u1 + u2) / 2, -0.2, "n");
R.spot((u1 + u2) / 2, 0.6);
R.spot(1.6, 0);
}, { public: true });
wgRoom("ghrteakitchen", "Tea room kitchen", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("oven", -1.6);
R.wallOut("oven", -0.2);
R.wallOut("fridge", 1.4);
R.put("wgsteeltable", w - 3.0, -0.6, "n");
R.wallS("wgcoffeebar", 3.0);
R.wallS("sink", 5.2);
R.wallN("wgshelving", w - 1.6);
R.staff("Orangery tea room attendant", w - 3.9, -0.6, "out");
R.spot(1.6, 0.6);
}, { secure: true });
}
if (typeof wgPlace === "function") {
wgPlace(GHR_CLUB, { floors: 3, w: 26, front: 22, floor: "wood", wall: 0xE4DCC8,
head: "Club secretary", clerk: "Club secretary", trade: "Club waiter", bar: "Crescent Club bartender", secure: false,
wingName: "The club rooms",
names: ["Ground floor · The hall, dining room and bar", "First floor · Ballroom, library and games rooms", "Second floor · Guest suites and the household"],
ground: { L: ["ghrdining", "ghrkitchen", "ghrcellar", "restrooms:Members' cloakrooms"], R: ["ghrbar", "ghrmorning", "ghrgardenroom"] },
up: [{ L: ["ghrballroom", "ghrprivdining", "ghrprivdining"], R: ["ghrlibrary", "ghrbilliards", "ghrcards", "ghrdrawing"] },
{ L: ["suite:Guest suite", "suite:Guest suite", "guestroom:Guest bedroom", "ghrlinen"], R: ["suite:Guest suite", "guestroom:Guest bedroom", "office:Secretary's office", "ghrquarters"] }],
fillers: ["lounge:Writing room", "meeting:Committee room", "store:Housekeeping store"] });
wgPlace(GHR_AGENCY, { floors: 2, w: 22, front: 16, floor: "wood", wall: 0xE8E2D2,
head: "Agency director", clerk: "Agency registrar", trade: "Agency registrar", secure: false,
wingName: "Interviews · The estate staff",
names: ["Ground floor · The agency", "First floor · The training school"],
ground: { L: ["ghrinterview", "ghrinterview", "ghrmuster", "ghrwatch"], R: ["ghrinterview", "records:Register of placements", "ghrmotor", "ghrgardenstore"] },
up: [{ L: ["ghrsilver", "ghrbutler", "ghrcookschool", "ghruniforms"], R: ["ghrhousekeep", "ghrnursery", "office:Director's office", "meeting:Clients' meeting room"] }],
fillers: ["meeting:Clients' meeting room", "records:Archive", "store:Agency store"] });
wgPlace(GHR_ORANGERY, { floors: 1, w: 30, front: 26, floor: "tile", wall: 0xE6EADC,
head: "Orangery head gardener", clerk: "Orangery head gardener", trade: "Glasshouse gardener", secure: false,
wingName: "The rose house · Gardeners only beyond",
names: ["The Orangery"],
ground: { L: ["ghrrosehouse", "ghrpropagation", "ghrpotting"], R: ["ghrteakitchen", "plantroom:Boiler house", "store:Seed and tool store", "office:Head gardener's office"] },
fillers: ["store:Pot store", "lounge:Gardeners' bothy"] });
}
if (typeof WG_FRONT !== "undefined") {
WG_FRONT[GHR_CLUB] = function (K) { return __ZC(320, 16, this, arguments, new.target); };
WG_FRONT[GHR_AGENCY] = function (K) { return __ZC(320, 17, this, arguments, new.target); };
WG_FRONT[GHR_ORANGERY] = function (K) { return __ZC(320, 18, this, arguments, new.target); };
}
function ghrBuy(item, label, price, note) { return ["<b>" + label + "</b> · " + price + " gold", note, function () { gapBuy(item); }, "Buy"]; }
function ghrPosts(title, lo, hi, intro) { return __ZC(320, 19, this, arguments, new.target); }
function ghrHouses() {
var out = [];
if (typeof store === "undefined" || !store.objects)
return out;
store.objects.forEach(function (o) { if (o && o.city && o.plot && /Crescent|Backers Street/.test(String(o.plot.street || "")))
out.push({ name: o.plot.name, street: o.plot.street }); });
return out;
}
function ghrPanelText(title, paras) { gapPanel(title, paras.map(function (p) { return "<p style='margin:0 0 9px'>" + p + "</p>"; }).join("")); }
function ghrClubBook() { return __ZC(320, 20, this, arguments, new.target); }
function ghrPorter() { return __ZC(320, 21, this, arguments, new.target); }
function ghrBilliards() { return __ZC(320, 22, this, arguments, new.target); }
function ghrWhist() {
var t = 3 + Math.floor(Math.random() * 8);
setStatus("<b>A rubber of whist</b> with the members at the card table: your side takes " + t + " of the thirteen tricks. " + (t >= 7 ? "The rubber is yours." : "The other side has it this time."));
}
function ghrPiano() { return __ZC(320, 23, this, arguments, new.target); }
var GHR_READ = [
["The club's beginnings", ["The Crescent Club was founded by the first office holders of the Tower, who wanted somewhere on the High Ring to dine, read and talk away from the desks below.", "They took the grandest house on the Crescent that had no family in it, and agreed three rules that still stand: the door is open to every guest who signs the book, the library is quiet, and the cellar is shared."]],
["The High Ring", ["Two streets ring the Tower here. The Crescent, nearer in, keeps the houses of those who hold the Tower's offices; Backers Street, further out, keeps a house for every backer who made Somnucor possible.", "No house here is bought or sold. Each is assigned, and each is run by staff engaged through the Household Agency, who walk their rounds of the houses every day."]],
["On orange trees", ["An orange tree lives happily in a pot for a hundred years if it is kept from frost, fed in summer and given its water little and often.", "That is why the great houses built orangeries: tall glasshouses facing the sun, where the trees spend the winter. The High Ring's own Orangery, open to all, keeps a whole avenue of them round its fountain."]]
];
function ghrLibrary() {
gapChoices("The club library", "The librarian brings down a book for you to read here:", GHR_READ.map(function (b) { return ["<b>" + esc(b[0]) + "</b>", "", function () { ghrPanelText(b[0], b[1]); }, "Read"]; }));
}
function ghrGazette() { return __ZC(320, 24, this, arguments, new.target); }
if (typeof gapAct === "function") {
gapAct("ghrmembersbook", { say: "<b>The members' book</b> · <b>press E</b> (or tap here) to read what the club offers", fn: ghrClubBook, r: 2 });
gapAct("ghrporterdesk", { say: "<b>The porter's desk</b> · <b>press E</b> (or tap here) to ask the porter", fn: ghrPorter, r: 2.2 });
gapAct("ghrnotice", { say: "<b>The club notices</b> · <b>press E</b> (or tap here) to read the members' book", fn: ghrClubBook, r: 1.8 });
gapAct("ghrsideboard", { say: "<b>The sideboard</b> · <b>press E</b> (or tap here) for the menu", fn: function () { var k = gapHere(); if (typeof needsMenu === "function" && k && typeof NEEDS_PLACES !== "undefined" && NEEDS_PLACES[k])
needsMenu(k);
else
setStatus("The silver here is for laying the tables."); }, r: 1.8 });
gapAct("ghrbarcounter", { say: "<b>The bar</b> · <b>press E</b> (or tap here) for the drinks and the menu", fn: function () { if (typeof needsMenu === "function")
needsMenu(GHR_CLUB); }, r: 2 });
gapAct("ghrbilliard", { say: "<b>The billiards table</b> · <b>press E</b> (or tap here) to play a frame", fn: ghrBilliards, r: 2.2 });
gapAct("ghrcardtable", { say: "<b>The card table</b> · <b>press E</b> (or tap here) to play a rubber of whist", fn: ghrWhist, r: 1.8 });
gapAct("ghrgrandpiano", { say: "<b>The grand piano</b> · <b>press E</b> (or tap here) to play", fn: ghrPiano, r: 2 });
gapAct("ghrlibdesk", { say: "<b>The librarian's desk</b> · <b>press E</b> (or tap here) to borrow a book to read", fn: ghrLibrary, r: 2 });
gapAct("ghrpapers", { say: "<b>The day's paper</b> · <b>press E</b> (or tap here) to read the High Ring Gazette", fn: ghrGazette, r: 1.8 });
}
var GHR_ROUNDS = [["Estate butler", "opens the house, keeps the silver, the cellar and the door"], ["Estate housekeeper", "keeps the rooms, the linen and the stores"],
["Estate lady's maid", "dresses the lady of the house and keeps her wardrobe"], ["Estate valet", "dresses the gentleman and keeps his clothes"],
["Estate chauffeur", "drives the household from the agency's motor house"], ["Estate gardener", "mows, clips and plants the grounds"],
["Estate nanny", "cares for the children and walks them to the Rose Gardens"], ["Estate security guard", "walks the Crescent and Backers Street, gate to gate"],
["Estate cook", "cooks for the household in the house's own kitchen"], ["Estate footman", "cleans the silver, waits at table, runs the errands"]];
function ghrRegister() { return __ZC(320, 25, this, arguments, new.target); }
function ghrRota() { return __ZC(320, 26, this, arguments, new.target); }
if (typeof gapAct === "function") {
gapAct("ghrregister", { say: "<b>The register of the great houses</b> · <b>press E</b> (or tap here) to read it", fn: ghrRegister, r: 2 });
gapAct("ghrhousemap", { say: "<b>The plan of the High Ring</b> · <b>press E</b> (or tap here) for the register", fn: ghrRegister, r: 2 });
gapAct("ghrsituations", { say: "<b>Situations vacant</b> · <b>press E</b> (or tap here) to see the posts", fn: function () { ghrPosts("Situations vacant", 3854, 3866, "The agency and the great houses it serves."); }, r: 2 });
gapAct("ghrrota", { say: "<b>Today's rounds</b> · <b>press E</b> (or tap here) to read the rota", fn: ghrRota, r: 2 });
}
var GHR_ROSES = ["A deep red damask rose, heavily scented", "A pale pink climbing rose, trained up the pillars", "A white rambler that flowers once, all at once, in early summer", "An apricot shrub rose that flowers again in autumn", "A striped old rose, crimson on blush", "A small pink rose from the China coast, in flower most of the year"];
function ghrStand() { return __ZC(320, 27, this, arguments, new.target); }
if (typeof gapAct === "function") {
gapAct("ghrcakecase", { say: "<b>The tea room</b> · <b>press E</b> (or tap here) for afternoon tea and cake", fn: function () { if (typeof needsMenu === "function")
needsMenu(GHR_ORANGERY); }, r: 2.2 });
gapAct("ghrplantstand", { say: "<b>The plant stand</b> · <b>press E</b> (or tap here) for trees and roses to take home", fn: ghrStand, r: 2.2 });
gapAct("ghrfountain", { say: "<b>The fountain</b> · <b>press E</b> (or tap here) to sit a while", fn: function () { setStatus("<b>You sit by the fountain.</b> Water runs quietly over the stone, and the air smells of orange blossom."); }, r: 2.6 });
gapAct("ghrrosebed", { say: "<b>The roses</b> · <b>press E</b> (or tap here) to read the labels", fn: function () {
var h = Math.floor(Date.now() / 36e5);
ghrPanelText("The roses", [GHR_ROSES[h % GHR_ROSES.length] + ".", GHR_ROSES[(h + 2) % GHR_ROSES.length] + ".", GHR_ROSES[(h + 4) % GHR_ROSES.length] + ".", "Roses for the house can be bought at the plant stand, and from the Orangery's flower cart on the Crescent."]);
}, r: 1.8 });
}
function ghrStand2(C) {
return store.objects.filter(function (o) { return o.realm === C.r.id && KIT[o.archetype] && KIT[o.archetype].cat !== "being" && !(typeof NOWALL !== "undefined" && NOWALL[o.archetype] && o.archetype !== "signboard"); })
.map(function (o) { var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 }; });
}
function ghrFind(C, T, dep, rs, k0, sides) {
var stand = ghrStand2(C), main = ATL_STAIRS.filter(function (s) { return s.main; }), got = null;
function clear(rb, a) {
if (!atlClearAt(rb, a, T / 2, 4))
return false;
for (var s = -T / 2 + 4; s <= T / 2 - 4 + 0.01; s += 4) {
var aa = a + s / rb, x = C.h.x + Math.cos(aa) * rb, z = C.h.z + Math.sin(aa) * rb;
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - x, dz = q.z - z, m = q.r + dep / 2 + 1;
if (dx * dx + dz * dz < m * m)
return false;
}
}
return true;
}
(sides || [1, -1]).forEach(function (side) {
if (got)
return;
var rb = rs + side * (ATL_ROAD + ATL_SETBACK + dep / 2);
for (var k = 0; k < main.length && !got; k++)
for (var t = 0; t < (Math.PI / 4) * rb && !got; t += 3) {
var a = main[(k + k0) % main.length].a + (ATL_MAIN_HALF + T / 2 + 8 + t) / rb;
if (clear(rb, a))
got = { side: side, a: a, rb: rb };
}
});
return got;
}
function ghrWorld(C, r, a) { return { x: C.h.x + Math.cos(a) * r, z: C.h.z + Math.sin(a) * r }; }
function ghrFirst(C, key, tries) { for (var i = 0; i < tries.length; i++) {
var f = cityFrontage(C, key, tries[i][0], tries[i][1], tries[i][2]);
if (f && f.spec)
return f;
} return null; }
function ghrGardens(C, rs, side, aG, gw, gd) { return __ZC(320, 28, this, arguments, new.target); }
function ghrFlowerCart(C, f) {
var kb = f.rs + f.side * (ATL_ROAD + 2.5), a = f.a - (f.w / 2 - 4) / kb;
C.at("flowers", kb, a, f.side > 0 ? rotIn(a) : rotOut(a), "The Orangery's flower cart");
var p = ghrWorld(C, kb, a);
gapSpot({ tag: "ghr", x: p.x, z: p.z, r: 3.6, say: "<b>The Orangery's flower cart</b> · <b>press E</b> (or tap here) for a buttonhole or a bouquet", fn: function () {
gapChoices("The flower cart", "Roses from the Orangery, cut this morning.", [
ghrBuy("gap_buttonhole", "A rose buttonhole", 3, "A single bud with a sprig of green, for your lapel."),
ghrBuy("gap_rose_bouquet", "A bouquet of garden roses", 12, "Tied with ribbon, from the rose house.")
]);
} });
}
if (typeof cityMore === "function")
cityMore("ghr", function (C) {
if (typeof gapSpotsClear === "function")
gapSpotsClear("ghr");
var club = ghrFirst(C, GHR_CLUB, [[430, 2], [430, 5], [565, 1], [430, 7], [565, 5], [565, 3, [-1]]]);
if (club) {
club.spec.attrs.c = 0xDCD2BE;
club.spec.attrs.rc = 0x3A4250;
GHR.club = club;
ghrFlowerCart(C, club);
}
var ag = ghrFirst(C, GHR_AGENCY, [[565, 4], [430, 3], [565, 7], [430, 6], [565, 2, [-1]]]);
if (ag) {
ag.spec.attrs.c = 0xE6DED0;
ag.spec.attrs.rc = 0x4A3E36;
GHR.agency = ag;
var kb = C.kerb(ag.rs, ag.side), sa = ag.a + (ag.w / 2 + 3) / kb, sp = ghrWorld(C, kb, sa);
gapSpot({ tag: "ghr", x: sp.x, z: sp.z, r: 3, say: "<b>Situations vacant in the great houses</b> · <b>press E</b> (or tap here) to read the board", fn: function () { ghrPosts("Situations vacant", 3854, 3866, "Engaged by the High Ring Household Agency (the door behind you)."); } });
}
var wb = kitW("ghrorangery", 1), gw = 30, gd = 22, T = wb + 4 + gw, done = false, tries = [[565, 6], [430, 0], [565, 0], [430, 4], [565, 3]];
for (var i = 0; i < tries.length && !done; i++) {
var g = ghrFind(C, T, gd, tries[i][0], tries[i][1]);
if (!g)
continue;
var rs = tries[i][0], rbB = rs + g.side * (ATL_ROAD + ATL_SETBACK + kitD("ghrorangery", 1) / 2), rg = rs + g.side * (ATL_ROAD + ATL_SETBACK + gd / 2);
var aB = g.a + (T / 2 - wb / 2) / rbB, aG = g.a - (T / 2 - gw / 2) / rg;
var f = C.workplace(GHR_ORANGERY, rs, g.side, aB);
if (f && f.spec) {
GHR.orangery = { spec: f.spec, a: aB, side: g.side, rs: rs };
ghrGardens(C, rs, g.side, aG, gw, gd);
done = true;
}
}
if (!done) {
var o = ghrFirst(C, GHR_ORANGERY, [[565, 6], [430, 0], [565, 2], [430, 4], [565, 5, [-1]]]);
if (o)
GHR.orangery = o;
}
});
var GMW_BOAT = "The Moat Boathouse", GMW_POST = "The Wildwatch Outpost", GMW_PORT = "The Rim Port";
var GMW = { post: null, boat: null, pegs: [], finds: [] };
var GMW_FISH = [["gap_fish_roach", "Roach", 2, "any"], ["gap_fish_perch", "Perch", 3, "day"], ["gap_fish_rudd", "Rudd", 2, "day"], ["gap_fish_bream", "Bream", 4, "any"],
["gap_fish_tench", "Tench", 5, "any"], ["gap_fish_carp", "Common carp", 6, "any"], ["gap_fish_pike", "Pike", 9, "day"], ["gap_fish_zander", "Zander", 8, "night"],
["gap_fish_eel", "Eel", 7, "night"], ["gap_fish_golden_carp", "Golden carp", 30, "any"]];
var GMW_FINDS = [["gap_nightshade", "Nightshade berries", 5, "gmwnightshade", "Black berries on low bushes. Poisonous: never eat them."],
["gap_ghostcap", "Ghostcap mushrooms", 4, "gmwghostcap", "Pale caps in the shade of dead trees."],
["gap_dreamglass", "Dreamglass shards", 12, "gmwdreamglass", "Glassy splinters where the dream broke through."],
["gap_black_amber", "Black amber", 9, "gmwamber", "Dark resin from the old stumps."],
["gap_wolfsbane", "Wolfsbane", 6, "gmwwolfsbane", "Tall violet flower spikes. Poisonous to touch for long."],
["gap_old_bones", "Old bones", 3, "bonepile", "Whatever the nightmares left."]];
var GMW_SHOP = [["gap_rod", "Fishing rod", 12, "A rod, reel, line and float. You need only one, and it is yours to keep."],
["gap_bait", "A tub of bait", 2, "Worms and sweetcorn. The moat's fish take a bare hook as well; bait is for anglers who like a full tub."]];
var GMW_JOBS_BOAT = [], GMW_JOBS_POST = [], GMW_JOBS_PORT = [];
(function () { var i; for (i = 3870; i <= 3878; i++)
GMW_JOBS_BOAT.push(i); for (i = 3879; i <= 3888; i++)
GMW_JOBS_POST.push(i); for (i = 3889; i <= 3899; i++)
GMW_JOBS_PORT.push(i); })();
gapPlace({ key: GMW_BOAT, ring: "harvest", arch: "barn", s: 1, jobs: GMW_JOBS_BOAT, fit: [], menu: "Tea, coffee and fried fish by the water",
note: "On the outer bank of the Outer Moat, below the docks: boats and the slipway, the tackle shop, the fishmonger who buys your catch, the Moat Café, and the fishing pegs round the ring." });
gapPlace({ key: GMW_POST, ring: "wilds", arch: "longhouse", s: 1.3, jobs: GMW_JOBS_POST, fit: [], menu: "Stew, bread and coffee for the hunters",
note: "The hunters' outpost in the Nightmare Wilds: trophies paid for, Wilds finds bought, the map room's sector reports. The Wilds' nightmares attack anyone out there." });
gapPlace({ key: GMW_PORT, ring: "commons", arch: "spaceport", s: 1, jobs: GMW_JOBS_PORT, fit: [], tag: "The Rim Port", menu: "Coffee, pastries and sandwiches before your flight",
note: "The city's passenger terminal: check-in, security, the departure gates for the Orbital Line, the baggage hall and the hangar." });
(function () {
if (typeof KIT === "undefined" || !KIT || KIT.gmwpalisade)
return;
var T = 0x5A4632, TD = 0x3E3022, ROPE = 0xB8A47A;
function K(k, cat, size, parts) { KIT[k] = { cat: cat, size: size, parts: parts }; }
K("gmwpalisade", "infra", [7, 4, 0.6], [
{ g: "box", s: [7, 3.3, .4], p: [0, 1.65, 0], c: T },
{ g: "cone", s: [.26, .7, 5], p: [-3, 3.65, 0], c: TD, rep: [7, 1, 0, 0] }
]);
K("gmwgatetower", "infra", [3, 8.6, 3], [
{ g: "box", s: [3, 6, 3], p: [0, 3, 0], c: T },
{ g: "box", s: [3.4, .3, 3.4], p: [0, 6.15, 0], c: TD },
{ g: "box", s: [3.4, 1, .12], p: [0, 6.8, 1.64], c: TD }, { g: "box", s: [3.4, 1, .12], p: [0, 6.8, -1.64], c: TD },
{ g: "cone", s: [2.6, 1.6, 4], p: [0, 8, 0], r: [0, .785, 0], c: 0x3A3430 }
]);
K("gmwgatebeam", "infra", [8, 7.4, 1.6], [
{ g: "box", s: [8.4, .5, 1.6], p: [0, 6.1, 0], c: TD },
{ g: "box", s: [8.4, .9, .12], p: [0, 6.8, .74], c: T },
{ g: "box", s: [3.6, .7, .08], p: [0, 5.4, .82], c: 0x2A221A }
]);
K("gmwtower", "infra", [4, 10.6, 4], [
{ g: "cyl", s: [.2, .24, 7.6, 6], p: [-1.6, 3.8, -1.6], c: TD, rep: [2, 3.2, 0, 0], rep2: [2, 0, 0, 3.2] },
{ g: "box", s: [4, .3, 4], p: [0, 7.6, 0], c: T },
{ g: "box", s: [4, 1, .1], p: [0, 8.25, 1.95], c: T }, { g: "box", s: [4, 1, .1], p: [0, 8.25, -1.95], c: T },
{ g: "box", s: [.1, 1, 4], p: [1.95, 8.25, 0], c: T }, { g: "box", s: [.1, 1, 4], p: [-1.95, 8.25, 0], c: T },
{ g: "cone", s: [3.4, 1.8, 4], p: [0, 10.4, 0], r: [0, .785, 0], c: 0x3A3430 },
{ g: "box", s: [.5, 7.4, .08], p: [0, 3.7, 2.1], c: TD },
{ g: "sph", s: [.16, 8, 6], p: [1.7, 8.9, 1.7], c: 0xC89048, glow: 1 }
]);
K("gmwjetty", "infra", [2.4, 4, 10], [
{ g: "box", s: [2.4, .18, 10], p: [0, 3.36, 0], c: 0x7A6248 },
{ g: "cyl", s: [.14, .14, 3.6, 6], p: [-1.05, 1.6, -4.6], c: TD, rep: [4, 0, 0, 3.05] },
{ g: "cyl", s: [.14, .14, 3.6, 6], p: [1.05, 1.6, -4.6], c: TD, rep: [4, 0, 0, 3.05] },
{ g: "box", s: [.1, .8, 9.6], p: [-1.15, 3.85, 0], c: TD },
{ g: "cyl", s: [.12, .12, 1, 6], p: [-1.05, 3.9, 4.8], c: TD, rep: [2, 2.1, 0, 0] }
]);
K("gmwslipway", "infra", [4, 1.4, 16], [
{ g: "box", s: [3.6, .25, 16.4], p: [0, -1.2, 2], r: [.18, 0, 0], c: 0x6A5A48 },
{ g: "box", s: [.2, .3, 16.4], p: [-1.5, -1.0, 2], r: [.18, 0, 0], c: TD, rep: [2, 3, 0, 0] },
{ g: "box", s: [.5, 1.2, .5], p: [0, .6, -6.4], c: TD },
{ g: "cyl", s: [.22, .22, 1.2, 8], p: [0, 1.0, -6.4], r: [0, 0, 1.5708], c: 0x4A4A4E }
]);
K("gmwrowboat", "infra", [1.5, 0.8, 4.4], [
{ g: "box", s: [1.0, .16, 3.8], p: [0, .1, 0], c: 0x5A6A7A },
{ g: "box", s: [.08, .6, 4.0], p: [-.66, .4, 0], r: [0, 0, -.25], c: 0x6A8098 }, { g: "box", s: [.08, .6, 4.0], p: [.66, .4, 0], r: [0, 0, .25], c: 0x6A8098 },
{ g: "box", s: [1.4, .6, .08], p: [0, .38, -2.0], c: 0x5A6A7A },
{ g: "cone", s: [.72, 1.0, 4], p: [0, .4, 2.3], r: [1.5708, .785, 0], c: 0x6A8098 },
{ g: "box", s: [1.3, .06, .3], p: [0, .5, -.6], c: 0x8A6A4A, rep: [2, 0, 0, 1.3] },
{ g: "box", s: [.06, .06, 2.8], p: [-.3, .56, .2], c: 0xA8885A, rep: [2, .6, 0, 0] }
]);
K("gmwbuoypost", "infra", [0.8, 1.8, 0.3], [
{ g: "box", s: [.12, 1.7, .12], p: [0, .85, 0], c: TD },
{ g: "tor", s: [.3, .07], p: [0, 1.25, .12], c: 0xC8502E },
{ g: "box", s: [.5, .12, .06], p: [0, 1.62, .08], c: 0xE0D8C8 }
]);
K("gmwnightshade", "infra", [1.8, 1.1, 1.8], [
{ g: "sph", s: [.6, 8, 6], p: [0, .5, 0], c: 0x24361E }, { g: "sph", s: [.45, 8, 6], p: [.55, .4, .25], c: 0x2A3E22 },
{ g: "sph", s: [.07, 6, 4], p: [-.3, .85, .35], c: 0x1A1220, rep: [5, .16, -.05, -.12] }
]);
K("gmwghostcap", "infra", [1.6, 0.6, 1.6], [
{ g: "cyl", s: [.05, .06, .3, 5], p: [-.4, .15, 0], c: 0xC8C4B8, rep: [5, .2, 0, .12] },
{ g: "cone", s: [.17, .12, 8], p: [-.4, .34, 0], c: 0xD8D6E0, rep: [5, .2, 0, .12] }
]);
K("gmwdreamglass", "infra", [1.6, 0.8, 1.6], [
{ g: "cone", s: [.12, .6, 4], p: [-.3, .3, 0], r: [.2, 0, .3], c: 0x9AB4C8, opa: .8 },
{ g: "cone", s: [.1, .5, 4], p: [.25, .25, .2], r: [-.3, 0, -.2], c: 0xA8C0D8, opa: .8 },
{ g: "cone", s: [.14, .7, 4], p: [.05, .35, -.3], r: [.1, .5, .1], c: 0x8AA6C0, opa: .8 },
{ g: "box", s: [1.2, .06, 1.0], p: [0, .03, 0], c: 0x2E2A30 }
]);
K("gmwamber", "infra", [1.6, 0.7, 1.6], [
{ g: "cyl", s: [.45, .55, .6, 9], p: [0, .3, 0], c: 0x3A2C20 },
{ g: "sph", s: [.1, 6, 4], p: [.4, .5, .2], c: 0x4A2A0E, rep: [3, -.25, .04, .12] }
]);
K("gmwwolfsbane", "infra", [1.4, 1.3, 1.4], [
{ g: "cyl", s: [.03, .03, .9, 4], p: [-.3, .45, 0], c: 0x3A5A2A, rep: [4, .2, 0, .1] },
{ g: "cone", s: [.08, .4, 6], p: [-.3, 1.05, 0], c: 0x4A3C8A, rep: [4, .2, 0, .1] }
]);
if (typeof ATL_WALKTHROUGH !== "undefined")
ATL_WALKTHROUGH.gmwgatebeam = 1;
})();
if (typeof cityMore === "function")
cityMore("gmw", function (C) {
gapSpotsClear("gmw");
if (typeof ATL_STAIRS === "undefined" || typeof atlRing !== "function")
return;
var hx = C.h.x, hz = C.h.z, Wr = atlRing("wilds"), BANK = Wr.S;
var main = ATL_STAIRS.filter(function (s) { return s.main; }).sort(function (p, q) { return p.a - q.a; });
function wpos(rr, a) { return { x: hx + Math.cos(a) * rr, z: hz + Math.sin(a) * rr }; }
var stand = store.objects.filter(function (o) {
if (o.realm !== C.r.id || !KIT[o.archetype] || KIT[o.archetype].cat === "being")
return false;
var r = Math.hypot(o.x - hx, o.z - hz);
return r > BANK - 80 && r < Wr.E + 20;
})
.map(function (o) { var d = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(d.size[0], d.size[2]) * s * 0.5 }; });
function clearAt(rr, a, rad) {
var p = wpos(rr, a);
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - p.x, dz = q.z - p.z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
function note(sp, rad) { if (sp && KIT[sp.archetype])
stand.push({ x: sp.x, z: sp.z, r: rad }); return sp; }
var gate = (typeof bwGateSpot === "function") ? bwGateSpot() : null, pier = (typeof seaPierSpot === "function") ? seaPierSpot() : null;
function farFrom(p, q, d) { return !q || Math.hypot(p.x - q.x, p.z - q.z) > d; }
var sB = main[6] || main[0], aB = sB.a + (40 + 11) / (BANK + 22), rH = BANK + 22;
var bh = C.at("barn", rH, aB, rotAlong(aB) + Math.PI, GMW_BOAT, {}, { workplace: GMW_BOAT, sign: GMW_BOAT });
if (bh) {
C.workplaces[GMW_BOAT] = { x: bh.x, z: bh.z, id: bh.id };
note(bh, 13);
GMW.boat = { x: bh.x, z: bh.z };
}
C.sign(BANK + 36, sB.a + 18 / (BANK + 36), rotIn(sB.a), GMW_BOAT, "Boats, the slipway, rods and bait, the fishmonger and the Moat Café. Fishing pegs by every sector stair round the moat.");
C.at("gmwslipway", BANK + 6.5, aB + 3 / (BANK + 6.5), rotIn(aB));
C.at("gmwrowboat", BANK + 8.5, aB + 3 / (BANK + 8.5), rotIn(aB), null, null, { y: -0.25 });
C.at("gmwjetty", BANK - 5, aB - 6 / (BANK - 5), rotIn(aB), null, null, { y: 0.1 });
C.at("gmwrowboat", BANK - 8, aB - 8.6 / (BANK - 8), rotIn(aB) + 0.05, null, null, { y: 1.55 });
C.at("gmwrowboat", BANK - 8.5, aB - 3.4 / (BANK - 8.5), rotIn(aB) - 0.04, null, null, { y: 1.55 });
C.at("fishingboat", BANK - 20, aB + 14 / (BANK - 20), rotAlong(aB), null, null, { y: 1.8 });
C.at("gmwbuoypost", BANK + 2.4, aB - 9 / (BANK + 2.4), rotIn(aB));
C.at("bench", BANK + 3.5, aB - 14 / (BANK + 3.5), rotIn(aB));
C.at("bench", BANK + 3.5, aB - 18 / (BANK + 3.5), rotIn(aB));
C.at("barrel", BANK + 9, aB + 9.5 / (BANK + 9), 0);
C.at("barrel", BANK + 9.6, aB + 11 / (BANK + 9.6), 0.6);
C.at("crates", BANK + 10, aB + 14 / (BANK + 10), rotIn(aB));
C.at("cart", BANK + 30, aB - 10 / (BANK + 30), rotAlong(aB));
C.at("dimlamp", BANK + 2, aB - 4 / (BANK + 2), rotIn(aB));
C.at("dimlamp", BANK + 2, aB + 8 / (BANK + 2), rotIn(aB));
var jp = wpos(BANK + 2.2, aB - 6 / (BANK + 2.2));
gapSpot({ x: jp.x, z: jp.z, r: 3.4, tag: "gmw", when: function () { return !CGAP.fishing; },
say: "<b>The boathouse jetty</b> · <b>press E</b> (or tap here) to cast into the moat · you need a rod (the tackle shop inside sells them)",
fn: function () { gapFishStart({ k: "moat", name: "the Outer Moat" }); } });
GMW.pegs = [];
for (var k = 1; k <= 8; k++) {
var ms = 0.19 + (k - 0.5) * Math.PI / 4, pa = ms + 20 / (BANK + 2);
C.at("gmwjetty", BANK - 5, pa, rotIn(pa), null, null, { y: 0.1 });
C.at("gmwbuoypost", BANK + 2.2, pa + 2.6 / (BANK + 2.2), rotIn(pa));
C.at("bench", BANK + 4, pa - 3 / (BANK + 4), rotIn(pa));
C.sign(BANK + 6, pa + 5 / (BANK + 6), rotIn(pa), "Moat peg " + k, "Sector " + k + ". Cast from the bank by the jetty. Rods and bait at the Moat Boathouse; the fishmonger there buys your catch.");
var pp = wpos(BANK + 2.2, pa);
GMW.pegs.push({ n: k, x: pp.x, z: pp.z });
(function (n) {
gapSpot({ x: pp.x, z: pp.z, r: 3.6, tag: "gmw", when: function () { return !CGAP.fishing; },
say: "<b>Moat peg " + n + "</b> · <b>press E</b> (or tap here) to cast · you need a rod from the Moat Boathouse",
fn: function () { gapFishStart({ k: "moat", name: "the Outer Moat" }); } });
})(k);
}
var H = 28, site = null;
for (var rc = BANK + 130; rc <= BANK + 300 && !site; rc += 10) {
[0, 10, -10, 20, -20, 30, -30, 40, -40].forEach(function (lat) {
if (site)
return;
var ac = sB.a + lat / rc, c = wpos(rc, ac);
if (!farFrom(c, gate, 140) || !farFrom(c, pier, 140))
return;
if (GMW.boat && !farFrom(c, GMW.boat, 70))
return;
if (clearAt(rc, ac, H * 1.3))
site = { rc: rc, ac: ac };
});
}
if (!site)
site = { rc: BANK + 150, ac: sB.a };
var rc0 = site.rc, ac0 = site.ac, rIn = rotIn(ac0), rAl = rotAlong(ac0);
function pol(lx, ly) { var x = (rc0 + ly) * Math.cos(ac0) - lx * Math.sin(ac0), z = (rc0 + ly) * Math.sin(ac0) + lx * Math.cos(ac0); return { r: Math.sqrt(x * x + z * z), a: Math.atan2(z, x) }; }
function put(arch, lx, ly, rot, name, attrs, extra) { var p = pol(lx, ly); return C.at(arch, p.r, p.a, rot, name || null, attrs || null, extra || null); }
var f;
[-24.5, -17.5, -10.5, 10.5, 17.5, 24.5].forEach(function (lx) { put("gmwpalisade", lx, -H, rIn); });
for (f = -24.5; f <= 24.6; f += 7) {
put("gmwpalisade", f, H, rIn);
put("gmwpalisade", -H, f, rAl);
put("gmwpalisade", H, f, rAl);
}
put("gmwgatetower", -5.5, -H, rIn);
put("gmwgatetower", 5.5, -H, rIn);
put("gmwgatebeam", 0, -H, rIn);
[[-25, -25], [25, -25], [-25, 25], [25, 25]].forEach(function (q) { put("gmwtower", q[0], q[1], rIn); });
var hall = put("longhouse", 0, 9, rIn, GMW_POST, { s: 1.3 }, { workplace: GMW_POST, sign: GMW_POST });
if (hall) {
C.workplaces[GMW_POST] = { x: hall.x, z: hall.z, id: hall.id };
GMW.post = { x: hall.x, z: hall.z };
}
put("brazier", -5, -24, 0);
put("brazier", 5, -24, 0);
put("tent", -18, -14, rAl);
put("tent", -18, -5, rAl);
put("wagon", 18, -15, rIn);
put("crates", 19, -5, rIn);
put("barrel", 16.6, -2.4, 0);
put("barrel", 17.4, -1.2, 1.1);
put("well", 15, 10, 0);
put("log", -15, 12, rIn);
put("log", -15, 14, rIn);
put("bannerpole", 9, -21, 0);
put("weaponrack", -10, -17, rIn);
put("human", -7.5, -31, rIn + Math.PI);
put("human", 7.5, -31, rIn + Math.PI);
var sg = pol(10, -33);
C.sign(sg.r, sg.a, rIn, GMW_POST, "Hunters' outpost. Trophies paid for, Wilds finds bought, the sector reports in the map room. The nightmares out here attack anyone: go in at the gate.");
stand.push({ x: hx + Math.cos(ac0) * rc0, z: hz + Math.sin(ac0) * rc0, r: H * 1.5 });
C.sign(BANK + 52, sB.a - 14 / (BANK + 52), rotIn(sB.a), GMW_POST, "Straight out from this stair, behind its palisade. The Wilds' nightmares attack anyone who crosses: keep to the way.");
GMW.finds = [];
for (var n = 0; n < 18; n++) {
var fd = GMW_FINDS[n % 6], a = 0.19 + (n + 0.5) * (Math.PI * 2 / 18) + 0.05, rr = BANK + 100 + ((n * 173) % 9) * 70, ok = false;
for (var t = 0; t < 60 && !ok; t++) {
var ta = a + t * 6 / rr, tr = rr + (t % 3) * 9, tp = wpos(tr, ta);
if (!atlClearAt(tr, ta, 3, 4) || !clearAt(tr, ta, 3.5) || !farFrom(tp, gate, 60) || !farFrom(tp, pier, 60))
continue;
ok = true;
a = ta;
rr = tr;
}
if (!ok || !KIT[fd[3]])
continue;
note(C.at(fd[3], rr, a, n * 1.7), 3);
var gp = wpos(rr, a), id = "gmw-" + fd[0].replace(/^gap_/, "") + "-" + n;
GMW.finds.push({ kind: fd[0], x: gp.x, z: gp.z });
(function (fd, id, gp) {
gapSpot({ x: gp.x, z: gp.z, r: 3.4, tag: "gmw",
say: "<b>" + esc(fd[1]) + "</b> · <b>press E</b> (or tap here) to gather · the quartermaster at the Wildwatch Outpost buys it · the nightmares out here attack anyone",
fn: function () { gapGather(fd[0], id); } });
})(fd, id, gp);
}
});
var GMW_TEX = {};
function gmwCanvas(key, w, h, paint) {
if (GMW_TEX[key])
return GMW_TEX[key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
paint(x, w, h);
return (GMW_TEX[key] = new THREE.CanvasTexture(c));
}
function gmwPanelMesh(g, tex, w, h, x, y, z) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex }));
m.position.set(x || 0, y || 0, z || 0);
g.add(m);
return m;
}
(function () {
if (typeof FURN !== "object" || !FURN || typeof trB !== "function")
return;
var wood = function () { return trM(0x6A4A30, "wood"); }, dark = function () { return trM(0x2E2A28); }, steel = function () { return trM(0x9AA0A6, null, "shine"); };
var timber = function () { return trM(0x5A4632, "wood"); }, cream = function () { return trM(0xE6DED0); };
gapPiece("gmwrodrack", 1.8, 0.35, false, function (g) {
trB(g, 1.8, 1.7, 0.06, wood(), 0, 1.2, -0.14);
trB(g, 1.8, 0.08, 0.3, wood(), 0, 0.3, 0);
for (var i = 0; i < 7; i++) {
var x = -0.75 + i * 0.25;
trC(g, 0.01, 0.02, 2.1, 5, dark(), x, 1.2, -0.04);
trB(g, 0.07, 0.07, 0.07, steel(), x, 0.75, 0.0);
}
});
gapPiece("gmwtackle", 2.6, 0.8, true, function (g) {
trB(g, 2.6, 0.92, 0.7, wood(), 0, 0.46, 0);
trB(g, 2.6, 0.05, 0.78, trM(0x8A6A44, "wood"), 0, 0.95, 0);
trB(g, 1.6, 0.3, 0.5, trM(0xBFD8E0, null, "glass"), -0.4, 1.12, 0);
[0xC8502E, 0xE0C040, 0x3A8A5A, 0x3A5A9A].forEach(function (c, i) { trB(g, 0.18, 0.06, 0.1, trM(c), -0.95 + i * 0.36, 1.0, 0.05); });
trB(g, 0.42, 0.28, 0.36, dark(), 0.85, 1.12, -0.05);
trB(g, 0.3, 0.02, 0.2, trM(0x2A6A9A, null, "glow"), 0.85, 1.28, 0.0);
});
gapPiece("gmwbaitfridge", 0.9, 0.7, true, function (g) {
trB(g, 0.9, 1.8, 0.7, cream(), 0, 0.9, 0);
trB(g, 0.78, 1.3, 0.02, trM(0xBFD8E0, null, "glass"), 0, 1.05, 0.36);
trB(g, 0.7, 0.16, 0.02, trM(0x3A6A8A), 0, 1.82, 0.36);
for (var i = 0; i < 3; i++)
trB(g, 0.7, 0.02, 0.5, steel(), 0, 0.6 + i * 0.4, 0);
});
gapPiece("gmwfishslab", 2.6, 1.0, true, function (g) {
trB(g, 2.6, 0.85, 0.9, steel(), 0, 0.425, 0);
trB(g, 2.5, 0.12, 0.8, trM(0xE8EEF0), 0, 0.9, 0.02, -0.18, 0, 0);
var silver = trM(0xA8B0B4, null, "shine"), brown = trM(0x6A6A40), gold = trM(0xC8A040, null, "shine");
[[-0.95, silver], [-0.55, brown], [-0.15, silver], [0.25, brown], [0.65, silver], [1.0, gold]].forEach(function (q) { trS(g, 0.07, q[1], q[0], 0.99, 0.05, 3.0, 1, 1); });
trB(g, 2.5, 0.5, 0.02, trM(0xBFD8E0, null, "glass"), 0, 1.25, 0.44);
trB(g, 0.4, 0.12, 0.3, steel(), -1.05, 1.0, -0.3);
});
gapPiece("gmwboard", 1.8, 0.1, false, function (g) {
var tex = gmwCanvas("gmwboard", 256, 224, function (x, W, H) {
x.fillStyle = "#1E2E2A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8DDB8";
x.font = "bold 19px Georgia,serif";
x.fillText("The Outer Moat", 14, 26);
x.font = "12px sans-serif";
x.fillStyle = "#C8D4CC";
x.fillText("What the fishmonger pays, each:", 14, 46);
GMW_FISH.forEach(function (f, i) { var y = 66 + i * 15; x.fillStyle = "#E6EEE8"; x.fillText(f[1] + (f[3] === "night" ? " (after dark)" : ""), 18, y); x.fillText(f[2] + " gold", 196, y); });
x.fillStyle = "#C8D4CC";
x.fillText("Pegs 1 to 8: one by each sector stair.", 14, H - 10);
});
trB(g, 1.8, 1.5, 0.06, trM(0x5A3A22, "wood"), 0, 1.7, 0);
gmwPanelMesh(g, tex, 1.7, 1.4, 0, 1.7, 0.035);
});
gapPiece("gmwlifebuoy", 0.8, 0.15, false, function (g) {
trB(g, 0.7, 0.8, 0.04, trM(0xE6DED0), 0, 1.6, 0);
var t = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.06, 6, 16), trM(0xC8502E));
t.position.set(0, 1.6, 0.06);
g.add(t);
});
gapPiece("gmwboatrack", 1.6, 4.6, true, function (g) {
var hull = trM(0x5A6A7A), side = trM(0x6A8098), tr = timber();
trB(g, 0.12, 0.7, 1.4, tr, 0, 0.35, -1.2);
trB(g, 0.12, 0.7, 1.4, tr, 0, 0.35, 1.2);
trB(g, 1.4, 0.08, 0.12, tr, 0, 0.72, -1.2);
trB(g, 1.4, 0.08, 0.12, tr, 0, 0.72, 1.2);
trB(g, 1.0, 0.14, 3.8, hull, 0, 0.84, 0);
trB(g, 0.07, 0.55, 4.0, side, -0.62, 1.1, 0, 0, 0, -0.25);
trB(g, 0.07, 0.55, 4.0, side, 0.62, 1.1, 0, 0, 0, 0.25);
trB(g, 1.3, 0.55, 0.07, hull, 0, 1.1, -2.0);
trB(g, 1.2, 0.06, 0.28, trM(0x8A6A4A), 0, 1.2, -0.4);
});
gapPiece("gmwhull", 2.0, 5.2, true, function (g) {
var tr = timber(), oak = trM(0xA8885A, "wood");
trB(g, 0.25, 0.6, 5.0, tr, 0, 0.3, 0);
trB(g, 0.18, 0.14, 5.0, oak, 0, 0.67, 0);
for (var i = 0; i < 6; i++) {
var z = -2.0 + i * 0.8, wv = 0.9 - Math.abs(i - 2.5) * 0.12;
trB(g, wv * 2, 0.06, 0.06, oak, 0, 0.74, z);
trB(g, 0.06, 0.7, 0.06, oak, -wv, 1.05, z, 0, 0, 0.2);
trB(g, 0.06, 0.7, 0.06, oak, wv, 1.05, z, 0, 0, -0.2);
}
trB(g, 0.08, 0.08, 4.6, oak, -0.95, 1.38, 0);
trB(g, 0.08, 0.08, 4.6, oak, 0.95, 1.38, 0);
});
gapPiece("gmwslipcradle", 2.2, 5.0, true, function (g) {
var tr = timber();
trB(g, 0.2, 0.16, 5.0, tr, -0.7, 0.08, 0);
trB(g, 0.2, 0.16, 5.0, tr, 0.7, 0.08, 0);
trB(g, 1.7, 0.3, 0.3, trM(0x4A4A4E), 0, 0.3, -1.4);
trB(g, 1.7, 0.3, 0.3, trM(0x4A4A4E), 0, 0.3, 1.4);
trB(g, 1.0, 0.14, 3.8, trM(0x5A6A7A), 0, 0.55, 0);
trB(g, 0.07, 0.55, 4.0, trM(0x6A8098), -0.62, 0.8, 0, 0, 0, -0.25);
trB(g, 0.07, 0.55, 4.0, trM(0x6A8098), 0.62, 0.8, 0, 0, 0, 0.25);
});
gapPiece("gmwtrophydesk", 2.6, 0.9, true, function (g) {
trB(g, 2.6, 1.0, 0.8, timber(), 0, 0.5, 0);
trB(g, 2.7, 0.08, 0.9, trM(0x4A3A2A, "wood"), 0, 1.04, 0);
trB(g, 0.5, 0.06, 0.36, cream(), -0.6, 1.1, 0);
trB(g, 0.04, 0.3, 0.04, steel(), 0.9, 1.22, 0.1);
trC(g, 0.16, 0.16, 0.04, 12, trM(0xC9A050, null, "shine"), 0.4, 1.1, 0);
});
gapPiece("gmwbountyboard", 2.0, 0.1, false, function (g) {
var tex = gmwCanvas("gmwbounty", 256, 192, function (x, W, H) {
x.fillStyle = "#2A1E16";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8C27A";
x.font = "bold 20px Georgia,serif";
x.fillText("Trophies taken here", 14, 30);
x.font = "13px sans-serif";
x.fillStyle = "#E6DCC8";
["Bring in the trophies of the nightmares", "you put down. The wildwarden checks", "each one and pays the city's bounty,", "the same as at the Tower and the", "Hunters' Lodge. Only nightmare hunters", "take trophies."].forEach(function (t, i) { x.fillText(t, 14, 58 + i * 20); });
});
trB(g, 2.0, 1.5, 0.06, trM(0x3A2A1C, "wood"), 0, 1.8, 0);
gmwPanelMesh(g, tex, 1.9, 1.4, 0, 1.8, 0.035);
});
gapPiece("gmwqmcounter", 2.6, 0.9, true, function (g) {
trB(g, 2.6, 1.0, 0.8, timber(), 0, 0.5, 0);
trB(g, 2.7, 0.08, 0.9, trM(0x4A3A2A, "wood"), 0, 1.04, 0);
trB(g, 0.4, 0.05, 0.3, steel(), -0.8, 1.1, 0);
trC(g, 0.02, 0.02, 0.4, 5, steel(), -0.8, 1.3, 0);
trB(g, 0.5, 0.03, 0.03, steel(), -0.8, 1.5, 0);
trB(g, 0.5, 0.4, 0.4, trM(0x8A7A5A), 0.7, 1.28, -0.1);
});
gapPiece("gmwfindshelf", 2.4, 0.5, true, function (g) {
trB(g, 2.4, 2.0, 0.06, timber(), 0, 1.0, -0.22);
for (var s = 0; s < 3; s++)
trB(g, 2.4, 0.05, 0.44, timber(), 0, 0.5 + s * 0.6, 0);
var cols = [0x2A1A2E, 0xD8D6E0, 0x9AB4C8, 0x4A2A0E, 0x4A3C8A, 0xE6DCC2];
for (var i = 0; i < 12; i++) {
var c = cols[i % 6];
trC(g, 0.09, 0.09, 0.22, 8, trM(c, null, i % 6 === 2 ? "glass" : null), -1.0 + (i % 6) * 0.4, 0.65 + Math.floor(i / 6) * 0.6, 0);
}
trB(g, 0.6, 0.3, 0.36, trM(0x8A7A5A), -0.7, 1.85, 0);
trB(g, 0.6, 0.3, 0.36, trM(0x8A7A5A), 0.4, 1.85, 0);
});
gapPiece("gmwwarnboard", 1.6, 0.1, false, function (g) {
var tex = gmwCanvas("gmwwarn", 256, 224, function (x, W, H) {
x.fillStyle = "#2A2420";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8A078";
x.font = "bold 18px Georgia,serif";
x.fillText("The Wilds: take care", 14, 26);
x.font = "12px sans-serif";
x.fillStyle = "#E6DCC8";
x.fillText("The quartermaster buys, each:", 14, 48);
GMW_FINDS.forEach(function (f, i) { var y = 70 + i * 17; x.fillText(f[1], 18, y); x.fillText(f[2] + " gold", 196, y); });
x.fillStyle = "#E8A078";
x.fillText("Nightshade and wolfsbane are poison.", 14, H - 28);
x.fillText("The nightmares attack anyone.", 14, H - 10);
});
trB(g, 1.6, 1.4, 0.06, trM(0x3A2A1C, "wood"), 0, 1.7, 0);
gmwPanelMesh(g, tex, 1.5, 1.3, 0, 1.7, 0.035);
});
gapPiece("gmwmaptable", 3.0, 2.0, true, function (g) {
var tex = gmwCanvas("gmwmap", 256, 256, function (x, W, H) {
x.fillStyle = "#C8B88A";
x.fillRect(0, 0, W, H);
var cx = W / 2, cy = H / 2;
x.fillStyle = "#3A3A30";
x.beginPath();
x.arc(cx, cy, 122, 0, 7);
x.fill();
x.fillStyle = "#3A6A8A";
x.beginPath();
x.arc(cx, cy, 88, 0, 7);
x.fill();
x.fillStyle = "#8A9A6A";
x.beginPath();
x.arc(cx, cy, 84, 0, 7);
x.fill();
x.fillStyle = "#B8AE98";
x.beginPath();
x.arc(cx, cy, 40, 0, 7);
x.fill();
x.strokeStyle = "#C8B88A";
x.lineWidth = 1.5;
for (var i = 0; i < 8; i++) {
var a = 0.19 + i * Math.PI / 4;
x.beginPath();
x.moveTo(cx + Math.cos(a) * 88, cy + Math.sin(a) * 88);
x.lineTo(cx + Math.cos(a) * 122, cy + Math.sin(a) * 122);
x.stroke();
}
x.fillStyle = "#E8DDB8";
x.font = "bold 14px sans-serif";
for (var k = 1; k <= 8; k++) {
var b = 0.19 + (k - 0.5) * Math.PI / 4;
x.fillText(String(k), cx + Math.cos(b) * 105 - 4, cy + Math.sin(b) * 105 + 5);
}
var o = 0.19 + 6 * Math.PI / 4;
x.fillStyle = "#C8502E";
x.beginPath();
x.arc(cx + Math.cos(o) * 96, cy + Math.sin(o) * 96, 4, 0, 7);
x.fill();
});
trB(g, 3.0, 0.12, 2.0, timber(), 0, 0.86, 0);
[[-1.3, -0.8], [1.3, -0.8], [-1.3, 0.8], [1.3, 0.8]].forEach(function (q) { trB(g, 0.12, 0.8, 0.12, timber(), q[0], 0.4, q[1]); });
var m = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9), new THREE.MeshLambertMaterial({ map: tex }));
m.rotation.x = -Math.PI / 2;
m.position.set(0, 0.925, 0);
g.add(m);
trS(g, 0.03, trM(0xC8502E), 0.5, 0.96, -0.4);
trS(g, 0.03, trM(0xC8502E), -0.6, 0.96, 0.3);
});
gapPiece("gmwcot", 0.8, 2.0, true, function (g) {
var fr = trM(0x4A4A40), cv = trM(0x6A6A4E);
trB(g, 0.04, 0.04, 2.0, fr, -0.36, 0.42, 0);
trB(g, 0.04, 0.04, 2.0, fr, 0.36, 0.42, 0);
trB(g, 0.72, 0.03, 1.9, cv, 0, 0.44, 0);
[[-0.34, -0.9], [0.34, -0.9], [-0.34, 0.9], [0.34, 0.9]].forEach(function (q) { trB(g, 0.04, 0.42, 0.04, fr, q[0], 0.21, q[1]); });
trB(g, 0.6, 0.1, 0.35, cream(), 0, 0.5, -0.75);
trB(g, 0.7, 0.06, 0.9, trM(0x5A5A48), 0, 0.48, 0.3);
});
gapPiece("gmwgrindstone", 0.9, 0.6, true, function (g) {
trB(g, 0.8, 0.7, 0.5, timber(), 0, 0.35, 0);
trC(g, 0.32, 0.32, 0.12, 16, trM(0x8A8478), 0, 0.9, 0, 0, 0, Math.PI / 2);
trB(g, 0.3, 0.04, 0.04, steel(), 0.5, 0.9, 0);
});
gapPiece("gmwstewpot", 1.4, 0.8, true, function (g) {
trB(g, 1.4, 0.8, 0.8, trM(0x2A2A2C), 0, 0.4, 0);
trC(g, 0.32, 0.28, 0.4, 14, trM(0x4A4A4E, null, "shine"), -0.3, 1.0, 0);
trC(g, 0.22, 0.2, 0.3, 12, trM(0x4A4A4E, null, "shine"), 0.4, 0.95, 0);
trB(g, 0.08, 1.4, 0.08, trM(0x3A3A3A), 0.6, 1.5, -0.32);
});
gapPiece("gmwtelescope", 0.8, 0.8, true, function (g) {
var b = trM(0x3A3A3A);
[[0.3, 0], [-0.15, 0.26], [-0.15, -0.26]].forEach(function (q) { trB(g, 0.04, 1.3, 0.04, b, q[0] * 0.8, 0.62, q[1] * 0.8, q[1] * 0.3, 0, -q[0] * 0.3); });
trC(g, 0.06, 0.09, 1.0, 10, trM(0xC9A050, null, "shine"), 0, 1.32, 0, 1.35, 0, 0);
});
gapPiece("gmwsignallamp", 0.7, 0.7, true, function (g) {
trB(g, 0.12, 1.1, 0.12, trM(0x3A3A3A), 0, 0.55, 0);
trC(g, 0.22, 0.22, 0.36, 12, trM(0x4A4A4E), 0, 1.25, 0, Math.PI / 2, 0, 0);
trC(g, 0.19, 0.19, 0.02, 12, trM(0xC8B890), 0, 1.25, 0.19, Math.PI / 2, 0, 0);
});
gapPiece("gmwcheckin", 2.4, 1.4, true, function (g) {
var top = trM(0xD8D4CC), body = trM(0x3A4A5A);
trB(g, 2.4, 1.05, 0.7, body, 0, 0.525, 0);
trB(g, 2.5, 0.05, 0.8, top, 0, 1.07, 0);
trB(g, 0.9, 0.3, 0.9, trM(0x4A4A4E), 0.95, 0.15, 0.75);
trB(g, 0.7, 0.04, 0.7, steel(), 0.95, 0.32, 0.75);
trB(g, 0.5, 0.32, 0.04, dark(), -0.4, 1.3, -0.1);
trB(g, 0.46, 0.28, 0.01, trM(0x2A5A7A, null, "glow"), -0.4, 1.3, -0.075);
trB(g, 0.04, 1.4, 0.04, steel(), -1.1, 1.75, 0.2);
trB(g, 0.6, 0.3, 0.04, trM(0x2A3A4A), -1.1, 2.5, 0.2);
});
gapPiece("gmwdepboard", 3.2, 0.12, false, function (g) {
var tex = gmwCanvas("gmwdep", 512, 256, function (x, W, H) {
x.fillStyle = "#0E1622";
x.fillRect(0, 0, W, H);
x.fillStyle = "#BFD8FF";
x.font = "bold 30px sans-serif";
x.fillText("DEPARTURES", 20, 42);
x.font = "18px sans-serif";
x.fillStyle = "#8FA8C8";
x.fillText("Orbital Line · Space Corp shuttles · no fare", 20, 70);
var lines = (typeof ORB_LINES !== "undefined") ? ORB_LINES : [];
lines.slice(0, 5).forEach(function (l, i) {
var y = 110 + i * 32;
x.fillStyle = l.col || "#E8C27A";
x.font = "bold 20px sans-serif";
x.fillText(l.name, 20, y);
x.fillStyle = "#E8ECF4";
x.font = "18px sans-serif";
var d = l.stops[1] ? l.stops[1].name.split(":")[0] : "";
x.fillText(d + (l.stops[2] ? " · " + l.stops[2].name.split(":")[0] : ""), 170, y);
x.fillStyle = "#E8D8A8";
x.fillText("every " + Math.round((typeof ORB_PERIOD !== "undefined" ? ORB_PERIOD : 150) / 6) / 10 + " min", W - 130, y);
});
x.fillStyle = "#6AA88A";
x.font = "16px sans-serif";
x.fillText("Boarding at the gates, through security", 20, H - 14);
});
trB(g, 3.2, 1.65, 0.1, trM(0x1A1E24), 0, 2.95, 0);
gmwPanelMesh(g, tex, 3.1, 1.55, 0, 2.95, 0.055);
});
gapPiece("gmwscanarch", 1.4, 0.8, false, function (g) {
var c = trM(0xB8BCC0, null, "shine");
trB(g, 0.18, 2.2, 0.6, c, -0.55, 1.1, 0);
trB(g, 0.18, 2.2, 0.6, c, 0.55, 1.1, 0);
trB(g, 1.28, 0.2, 0.6, c, 0, 2.3, 0);
trB(g, 0.1, 0.06, 0.02, trM(0x3A8A5A, null, "glow"), 0.55, 2.0, 0.31);
});
gapPiece("gmwxray", 3.2, 1.0, true, function (g) {
var c = trM(0x8A9098, null, "shine");
trB(g, 1.4, 1.2, 0.9, c, 0, 0.6, 0);
trB(g, 1.0, 0.6, 0.02, trM(0x2A2E34), 0, 0.9, 0.46);
trB(g, 3.2, 0.12, 0.7, trM(0x2E2E30), 0, 0.72, 0);
trB(g, 3.2, 0.6, 0.08, c, 0, 0.4, 0.36);
trB(g, 3.2, 0.6, 0.08, c, 0, 0.4, -0.36);
trB(g, 0.4, 0.3, 0.04, dark(), 1.2, 1.25, -0.3);
trB(g, 0.36, 0.26, 0.01, trM(0x3A5A6A, null, "glow"), 1.2, 1.25, -0.27);
});
gapPiece("gmwgatedesk", 1.6, 0.8, true, function (g) {
trB(g, 1.4, 1.05, 0.6, trM(0x3A4A5A), 0, 0.525, 0);
trB(g, 1.5, 0.05, 0.7, trM(0xD8D4CC), 0, 1.07, 0);
trB(g, 0.5, 0.32, 0.04, dark(), 0, 1.3, -0.1);
trB(g, 0.46, 0.28, 0.01, trM(0x2A5A7A, null, "glow"), 0, 1.3, -0.075);
trB(g, 0.06, 2.6, 0.06, steel(), -0.6, 1.3, -0.3);
trB(g, 0.9, 0.4, 0.05, trM(0x1A2A3A), -0.6, 2.5, -0.3);
});
gapPiece("gmwcarousel", 6.0, 2.6, true, function (g) {
var belt = trM(0x3A3A3E), rim = trM(0x9AA0A6, null, "shine");
trB(g, 3.4, 0.45, 2.4, belt, 0, 0.225, 0);
trC(g, 1.2, 1.2, 0.45, 18, belt, -1.7, 0.225, 0);
trC(g, 1.2, 1.2, 0.45, 18, belt, 1.7, 0.225, 0);
trB(g, 3.4, 0.5, 0.8, rim, 0, 0.55, 0);
trC(g, 0.4, 0.4, 0.5, 12, rim, -1.7, 0.55, 0);
trC(g, 0.4, 0.4, 0.5, 12, rim, 1.7, 0.55, 0);
trB(g, 0.5, 0.35, 0.3, trM(0x6A3A2A), -0.8, 0.62, 0.9);
trB(g, 0.45, 0.3, 0.28, trM(0x2A4A6A), 1.2, 0.6, -0.95);
});
gapPiece("gmwtrolley", 0.8, 1.4, true, function (g) {
var c = trM(0x9AA0A6, null, "shine");
trB(g, 0.6, 0.04, 1.0, c, 0, 0.25, 0);
trB(g, 0.6, 0.04, 0.04, c, 0, 0.95, -0.55);
trB(g, 0.04, 0.8, 0.04, c, -0.28, 0.6, -0.55);
trB(g, 0.04, 0.8, 0.04, c, 0.28, 0.6, -0.55);
trC(g, 0.08, 0.08, 0.05, 10, dark(), -0.28, 0.08, 0.4, 0, 0, Math.PI / 2);
trC(g, 0.08, 0.08, 0.05, 10, dark(), 0.28, 0.08, 0.4, 0, 0, Math.PI / 2);
});
gapPiece("gmwqueue", 2.4, 0.3, false, function (g) {
var c = trM(0x9AA0A6, null, "shine"), tape = trM(0x2A4A7A);
[-1.2, 0, 1.2].forEach(function (x) { trC(g, 0.03, 0.03, 0.95, 8, c, x, 0.475, 0); trC(g, 0.15, 0.17, 0.04, 12, c, x, 0.02, 0); });
trB(g, 2.4, 0.06, 0.02, tape, 0, 0.88, 0);
});
gapPiece("gmwapron", 3.0, 0.1, false, function (g) {
var tex = gmwCanvas("gmwapron", 256, 128, function (x, W, H) {
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#2A3A5A");
gr.addColorStop(1, "#5A6A7A");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
x.fillStyle = "#4A4E54";
x.fillRect(0, 86, W, 42);
x.strokeStyle = "#C8B060";
x.lineWidth = 2;
x.beginPath();
x.ellipse(128, 104, 60, 10, 0, 0, 7);
x.stroke();
x.fillStyle = "#D8DCE0";
x.beginPath();
x.moveTo(98, 98);
x.lineTo(160, 98);
x.lineTo(172, 92);
x.lineTo(160, 86);
x.lineTo(104, 86);
x.closePath();
x.fill();
x.fillStyle = "#B8BCC0";
x.fillRect(120, 78, 10, 9);
});
trB(g, 3.0, 1.6, 0.08, trM(0x3A3E44), 0, 1.6, 0);
gmwPanelMesh(g, tex, 2.8, 1.4, 0, 1.6, 0.045);
});
gapPiece("gmwshuttlenose", 3.0, 6.0, true, function (g) {
var hull = trM(0xE4E4E0), dk = trM(0x3A3E44);
trC(g, 1.1, 1.1, 3.6, 14, hull, 0, 1.9, -0.6, Math.PI / 2, 0, 0);
var n = trC(g, 0.01, 1.1, 2.0, 14, hull, 0, 1.9, 2.2, Math.PI / 2, 0, 0);
n.rotation.x = Math.PI / 2;
trB(g, 1.2, 0.3, 0.06, dk, 0, 2.5, 2.0);
trB(g, 0.3, 1.0, 0.3, trM(0xC8A040), -0.9, 0.5, -1.6);
trB(g, 0.3, 1.0, 0.3, trM(0xC8A040), 0.9, 0.5, -1.6);
trB(g, 0.3, 1.0, 0.3, trM(0xC8A040), 0, 0.5, 1.2);
trB(g, 0.5, 0.06, 0.3, dk, 1.15, 1.9, -0.6);
});
})();
function gmwSell(title, intro, test, empty) { return __ZC(320, 29, this, arguments, new.target); }
function gmwIsFish(k) { return /^gap_fish_/.test(String(k)); }
function gmwIsFind(k) { for (var i = 0; i < GMW_FINDS.length; i++)
if (GMW_FINDS[i][0] === k)
return true; return false; }
function gmwTackle() { return __ZC(320, 30, this, arguments, new.target); }
function gmwMoatBoard() { return __ZC(320, 31, this, arguments, new.target); }
function gmwFindsBoard() { return __ZC(320, 32, this, arguments, new.target); }
function gmwTrophies() { return __ZC(320, 33, this, arguments, new.target); }
function gmwReports(again) { return __ZC(320, 34, this, arguments, new.target); }
function gmwDepartures(boarding) { return __ZC(320, 35, this, arguments, new.target); }
gapAct("gmwtackle", { say: "<b>The tackle shop</b> · <b>press E</b> (or tap here) for a rod or bait", fn: function () { gmwTackle(); } });
gapAct("gmwfishslab", { say: "<b>The fishmonger</b> · <b>press E</b> (or tap here) to sell your catch", fn: function () {
gmwSell("The fishmonger", "The fishmonger weighs your catch and pays the city's price for each fish.", gmwIsFish, "You have no fish to sell. Buy a rod at the tackle shop and cast at a moat peg.");
} });
gapAct("gmwboard", { say: "<b>The moat board</b> · <b>press E</b> (or tap here) to read it", fn: function () { gmwMoatBoard(); } });
gapAct("gmwtrophydesk", { say: "<b>The trophy counter</b> · <b>press E</b> (or tap here) to turn in nightmare trophies", fn: function () { gmwTrophies(); } });
gapAct("gmwqmcounter", { say: "<b>The quartermaster</b> · <b>press E</b> (or tap here) to sell what you gathered in the Wilds", fn: function () {
gmwSell("The quartermaster", "The quartermaster buys what grows and lies out in the Wilds, at the city's price.", gmwIsFind, "You have nothing from the Wilds to sell. The board by the door says what to look for.");
} });
gapAct("gmwwarnboard", { say: "<b>The Wilds board</b> · <b>press E</b> (or tap here) to read it", fn: function () { gmwFindsBoard(); } });
gapAct("gmwmaptable", { say: "<b>The map table</b> · <b>press E</b> (or tap here) for the sector reports", fn: function () { gmwReports(false); } });
gapAct("gmwdepboard", { say: "<b>Departures</b> · <b>press E</b> (or tap here) to read the board", fn: function () { gmwDepartures(false); } });
gapAct("gmwgatedesk", { say: "<b>The gate</b> · <b>press E</b> (or tap here) to board the Orbital Line", fn: function () { gmwDepartures(true); } });
if (typeof wgRoom === "function") {
wgRoom("gmwboathall", "Boat hall", 12, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.3; v < d / 2 - 2.6; v += 2.2)
R.put("gmwboatrack", w - 2.6, v, "in");
R.wallS("troars", 2.4);
R.wallS("troars", 4.6);
R.put("gmwlifebuoy", 0.1, -d / 2 + 1.6, "out");
R.put("gmwlifebuoy", 0.1, -d / 2 + 2.6, "out");
R.put("trlockers", 2.6, d / 2 - 0.35, "s");
R.staff("Boathouse hand", 2.6, 0, "out");
R.spot(1.4, 0);
}, { secure: true });
wgRoom("gmwslip", "Slipway", 10, function (R) {
var w = R.w, d = R.d;
R.put("gmwslipcradle", w * 0.55, -0.6, "n");
R.put("trwinch", 2.0, -d / 2 + 0.8, "n");
R.wallOut("gmwlifebuoy", d / 2 - 2.2);
R.put("barrel", w - 0.8, d / 2 - 1.0, 0);
R.wallS("trtoolwall", w - 1.6);
R.staff("Boathouse hand", 2.2, -1.0, "out");
R.spot(1.4, 0.6);
}, { secure: true });
wgRoom("gmwcafe", "The Moat Café", 12, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", w - 1.5, -d / 2 + 1.6, "n");
R.put("trtill", w - 3.8, -d / 2 + 1.6, "n");
R.put("wgcoffeebar", w - 0.35, -d / 2 + 3.6, "in");
R.staff("Boathouse café server", w - 2.6, -d / 2 + 0.9, "n");
for (var v = -d / 2 + 4.2; v < d / 2 - 1.6; v += 2.6)
for (var u = 2.4; u < w - 2.4; u += 3) {
R.put("table", u, v, "out");
R.put("chair", u - 0.95, v, "out");
R.put("chair", u + 0.95, v, "in");
}
R.put("gmwboard", w - 0.06, d / 2 - 2.4, "in");
R.put("plant", 0.5, -d / 2 + 0.6, 0);
R.spot(1.6, 0);
}, { public: true });
wgRoom("gmwgalley", "Café kitchen", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcookline", -0.6);
R.staff("Boathouse café cook", w - 1.55, -0.6, "out");
R.put("wgsteeltable", w - 3.2, -0.4, "n");
R.wallS("wgdishpit", 2.6);
R.wallS("fridge", 4.4);
R.wallN("wgshelving", w - 1.4);
R.spot(w - 3.2, 1.6);
}, { secure: true });
wgRoom("gmwwarden", "Moat warden's office", 7, function (R) {
var w = R.w, d = R.d;
R.put("desk", w - 1.7, -0.8, "in");
R.staff("Moat warden", w - 0.85, -0.8, "in");
R.put("chair", w - 2.7, -0.8, "out");
R.put("trwallmap", w - 0.06, 1.8, "in");
R.wallS("filecabinet", 2.4);
R.wallS("filecabinet", 3.3);
R.put("homeradio", 4.6, -d / 2 + 0.4, "n");
R.put("gmwlifebuoy", 0.1, -d / 2 + 1.4, "out");
R.put("keyrack", 0.1, -d / 2 + 2.6, "out");
R.put("gmwrodrack", w * 0.5, d / 2 - 0.25, "s");
R.spot(1.6, 0.4);
});
wgRoom("gmwboatshop", "Boat workshop", 11, function (R) {
var w = R.w, d = R.d;
R.put("gmwhull", w * 0.52, -0.4, "n");
R.wallOut("workbench", -3.2);
R.wallS("trtoolwall", 2.6);
R.put("trlogs", w - 1.0, d / 2 - 1.8, "in");
R.staff("Boat builder", w * 0.52 - 1.7, -0.4, "in");
R.staff("Boat builder", w - 1.6, -3.2, "out");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("gmwarmoury", "Armoury", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("weaponrack", -1.6);
R.wallOut("weaponrack", 0.8);
R.put("armourstand", w * 0.5, -d / 2 + 0.6, 0);
R.put("armourstand", w * 0.5 + 1.2, -d / 2 + 0.6, 0);
R.put("workbench", 2.6, -d / 2 + 0.5, "n");
R.put("gmwgrindstone", w - 1.2, d / 2 - 1.2, "in");
R.put("trlockers", 3.2, d / 2 - 0.35, "s");
R.staff("Outpost armourer", 2.6, -d / 2 + 1.4, "s");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("gmwmaproom", "Map room", 9, function (R) {
var w = R.w, d = R.d, u = Math.max(3.4, w * 0.52);
R.put("gmwmaptable", u, -0.3, "n");
R.put("trwallmap", w - 0.06, 0, "in");
R.put("noticeboard", u, -d / 2 + 0.08, "n");
R.put("mapchest", 1.8, -d / 2 + 0.6, "n");
R.staff("Outpost cartographer", u, -1.9, "n");
R.staff("Wilds tracker", u + 1.2, 1.4, "s");
R.spot(1.6, 0.6);
}, { public: true });
wgRoom("gmwqmstore", "Quartermaster's store", 8, function (R) {
var w = R.w, d = R.d;
for (var u = 2.4; u < w - 1.0; u += 2.5) {
R.put("wgshelving", u, -d / 2 + 0.45, "n");
R.put("wgshelving", u, 0.3, "s");
}
R.wallOut("gmwfindshelf", d / 2 - 1.8);
R.put("trsacks", w - 1.2, 1.6, "in");
R.put("barrel", 1.4, -d / 2 + 0.8, 0);
R.spot(1.4, 1.2);
}, { secure: true });
wgRoom("gmwmess", "Mess hall", 13, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", w - 1.6, -d / 2 + 1.9, "n");
R.put("gmwstewpot", w - 1.6, -d / 2 + 0.5, "n");
R.put("trbreadrack", w - 3.6, -d / 2 + 0.4, "n");
R.staff("Outpost mess cook", w - 2.6, -d / 2 + 1.15, "n");
for (var v = -d / 2 + 4.4; v < d / 2 - 1.8; v += 3.0)
for (var u = 2.8; u < w - 2.4; u += 3.4)
R.put("trbenchtable", u, v, "n");
R.put("fireplace", w - 0.35, d / 2 - 1.6, "in");
R.spot(1.6, 0);
}, { public: true });
wgRoom("gmwfield", "Field infirmary", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.6; v += 1.6)
R.put("gmwcot", w - 1.2, v, "in");
R.put("wgmedshelf", 2.4, -d / 2 + 0.4, "n");
R.put("wgworkstation", 4.2, -d / 2 + 0.5, "n");
R.put("wgivstand", w - 2.4, -d / 2 + 1.0, 0);
R.staff("Outpost field medic", 3.4, -d / 2 + 1.4, "s");
R.spot(1.6, 0.4);
}, { public: true });
wgRoom("gmwbunks", "Bunkhouse", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.6; v += 2.0) {
R.put("wgbunk", w - 1.1, v, "in");
R.put("footchest", w - 2.5, v, "in");
}
for (var u = 2.4; u < w - 3.0; u += 1.3)
R.put("trlockers", u, -d / 2 + 0.35, "n");
R.put("table", 2.8, 1.2, "n");
R.put("chair", 1.9, 1.2, "out");
R.spot(1.6, 0.6);
});
wgRoom("gmwsignal", "Signal room", 7, function (R) {
var w = R.w, d = R.d;
R.put("gmwtelescope", w - 0.8, -1.2, "in");
R.put("gmwsignallamp", w - 0.6, 1.2, "in");
R.put("desk", 2.6, -d / 2 + 0.5, "n");
R.put("chair", 2.6, -d / 2 + 1.2, "s");
R.put("homeradio", 4.0, -d / 2 + 0.4, "n");
R.put("clock", 0.1, -d / 2 + 1.6, "out");
R.staff("Outpost lookout", w - 1.7, -1.2, "out");
R.spot(1.6, 0.6);
});
wgRoom("gmwgate", "Gate", 11, function (R) {
var w = R.w, d = R.d;
R.wallOut("gmwapron", -2.6);
R.wallOut("gmwapron", 1.0);
R.put("gmwgatedesk", w - 1.4, d / 2 - 2.6, "in");
R.staff("Gate agent", w - 0.7, d / 2 - 2.6, "in");
[2.4, 4.2].forEach(function (u) { if (u < w - 2.4) {
R.put("wgchairrow", u, -2.6, "out");
R.put("wgchairrow", u, 0.2, "out");
} });
R.wallS("gmwdepboard", w * 0.5);
R.put("plant", 0.5, -d / 2 + 0.6, 0);
R.spot(1.6, 0);
}, { public: true });
wgRoom("gmwbaggage", "Baggage hall", 12, function (R) {
var w = R.w, d = R.d;
R.put("gmwcarousel", Math.max(3.6, w * 0.55), -0.8, "n");
R.put("gmwtrolley", 1.2, -d / 2 + 1.0, "n");
R.put("gmwtrolley", 2.0, -d / 2 + 1.0, "n");
R.wallOut("trtimetable", d / 2 - 2.6);
R.staff("Baggage handler", Math.max(3.6, w * 0.55), -d / 2 + 0.9, "n");
R.spot(1.4, 1.6);
}, { public: true });
wgRoom("gmwlost", "Lost property", 6, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", 2.4, -0.4, "out");
R.staff("Terminal information officer", 3.3, -0.4, "in");
R.wallOut("wgshelving", -1.4);
R.wallOut("wgshelving", 1.2);
R.put("trcrates", w - 1.6, d / 2 - 0.9, "in");
R.spot(1.0, 0.6);
}, { public: true });
wgRoom("gmwmedical", "Medical room", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgexamcouch", w - 1.1, -1.0, "in");
R.put("wgmedshelf", w - 0.3, 1.6, "in");
R.put("wgworkstation", 2.4, -d / 2 + 0.5, "n");
R.put("wgwheelchair", 1.2, -d / 2 + 0.8, "n");
R.staff("Terminal first-aider", 2.4, -d / 2 + 1.4, "s");
R.spot(1.6, 0.6);
}, { public: true });
wgRoom("gmwhangar", "Hangar workshop", 13, function (R) {
var w = R.w, d = R.d;
R.put("gmwshuttlenose", Math.max(3.6, w * 0.55), 0, "n");
R.put("tytoolchest", w - 0.5, d / 2 - 1.8, "in");
R.wallS("trtoolwall", 2.6);
R.put("workbench", w * 0.6, -d / 2 + 0.5, "n");
R.staff("Hangar engineer", Math.max(3.6, w * 0.55) - 1.9, -1.0, "out");
R.staff("Rim Port ground crew", Math.max(3.6, w * 0.55) + 1.4, 2.8, "s");
R.spot(1.6, 1.6);
}, { secure: true });
}
if (typeof wgPlace === "function") {
wgPlace(GMW_BOAT, { floors: 2, w: 22, front: 16, floor: "wood", wall: 0xD8D0C0,
trade: "Net mender", clerk: "Tackle shop clerk", head: "Boathouse keeper", secure: false,
wingName: "Boat hall · the Moat Café · the warden",
names: ["Ground floor · boat hall, slipway and café", "Loft · nets, the boat workshop and the keeper"],
ground: { L: ["gmwboathall", "gmwslip", "store:Oar and gear store"], R: ["gmwcafe", "gmwgalley", "gmwwarden"] },
up: [{ L: ["netloft", "gmwboatshop", "records:Moat records"], R: ["office:Boathouse keeper's office", "staffroom", "lockers", "restrooms", "mudroom:Drying room"] }],
fillers: ["store:Rope store", "mudroom:Drying room", "records:Moat records"] });
wgPlace(GMW_POST, { floors: 2, w: 26, front: 18, floor: "wood", wall: 0xC8B8A0,
trade: "Wildwarden", clerk: "Outpost cartographer", head: "Outpost captain", guard: "Outpost sentry", secure: false,
wingName: "Armoury · map room · mess · infirmary",
names: ["Ground floor · the trophy hall and the outpost", "Upper floor · bunkhouse and the signal room"],
ground: { L: ["gmwarmoury", "gmwmaproom", "office:Captain's office", "gmwqmstore"], R: ["gmwmess", "gmwfield", "mudroom:Boot room", "restrooms"] },
up: [{ L: ["gmwbunks", "gmwbunks", "laundry:Drying room", "lockers"], R: ["gmwsignal", "briefing", "records:Hunt records", "staffroom"] }],
fillers: ["store:Lamp oil and rations", "gmwbunks", "records:Old maps"] });
wgPlace(GMW_PORT, { floors: 2, w: 40, front: 22, floor: "tile", wall: 0xE2E0DA,
trade: "Baggage handler", clerk: "Check-in agent", head: "Terminal manager", control: "Rim Port traffic controller", dispatch: "Rim Port ground crew", secure: false,
wingName: "Security · gates 1 to 4 · baggage",
names: ["Ground floor · departures, gates and baggage", "First floor · control room and crew"],
ground: { L: ["gmwgate:Gate 1", "gmwgate:Gate 2", "gmwbaggage", "gmwlost"], R: ["gmwgate:Gate 3", "gmwgate:Gate 4", "gmwmedical", "loading:Baggage make-up", "gmwhangar"] },
up: [{ L: ["controlroom", "office:Terminal manager's office", "meeting:Operations meeting room", "records:Flight records", "dispatch:Ground operations"],
R: ["staffroom:Crew room", "lounge:Crew rest room", "lockers:Crew lockers", "restrooms", "meeting:Crew briefing room"] }],
fillers: ["waiting:Arrivals lounge", "store", "lounge:Quiet room"] });
}
if (typeof WG_FRONT !== "undefined") {
WG_FRONT[GMW_BOAT] = function (K) { return __ZC(320, 36, this, arguments, new.target); };
WG_FRONT[GMW_POST] = function (K) { return __ZC(320, 37, this, arguments, new.target); };
WG_FRONT[GMW_PORT] = function (K) { return __ZC(320, 38, this, arguments, new.target); };
}
if (typeof cityMore === "function")
cityMore("gtr", function (C) {
if (typeof ATL_STAIRS === "undefined" || !KIT.tramstop)
return;
var rs = 430, main = ATL_STAIRS.filter(function (s) { return s.main; });
var stand = store.objects.filter(function (o) {
if (o.realm !== C.r.id || !KIT[o.archetype] || KIT[o.archetype].cat === "being")
return false;
var dx = o.x - C.h.x, dz = o.z - C.h.z, r = Math.sqrt(dx * dx + dz * dz);
return r > rs - 40 && r < rs + 10;
})
.map(function (o) { var d = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(d.size[0], d.size[2]) * s * 0.5 }; });
function clear(rr, a) {
if (!atlClearAt(rr, a, 2.6, 1))
return false;
var x = C.h.x + Math.cos(a) * rr, z = C.h.z + Math.sin(a) * rr;
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - x, dz = q.z - z, m = q.r + 2.4;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
for (var k = 0; k < main.length; k++) {
var ta = main[k].a + 90 / rs, rr = rs - (ATL_ROAD + 3), ok = false;
for (var t = 0; t < 24 && !ok; t += 3) {
for (var sg = 1; sg >= -1 && !ok; sg -= 2) {
var at = ta + sg * t / rr;
if (clear(rr, at)) {
C.at("tramstop", rr, at, rotOut(at), "Tram stop");
ok = true;
}
if (!t)
break;
}
}
}
});
