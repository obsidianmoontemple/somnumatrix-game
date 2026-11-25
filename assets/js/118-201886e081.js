/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof dreamHour !== "function")
return;
var dh = dreamHour;
dreamHour = function () {
if (scrubOffset === null && typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null && typeof somnucorRealm === "function") {
var r = somnucorRealm();
if (r && (store.here || 0) === r.id)
return cityHourNow();
}
return dh.apply(this, arguments);
};
})();
function careHash(s) { var h = 0; s = String(s); for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
function careInCity() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !!(r && ATLC && (store.here || 0) === r.id && !store.inside); }
function carePublicRpc(name) {
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return Promise.resolve(null);
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: "{}" })
.then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
}
var LAMPS = null, LAMPS_N = -1, LAMPSTATE = { lit: {}, kept: {}, at: 0, loaded: false }, LAMP_SPR = [], LAMP_TEX = null, lampAt = 0, LAMP_OUT = [];
function lampList() {
var objs = typeof cityObjs === "function" ? cityObjs() : [];
if (LAMPS && LAMPS_N === objs.length)
return LAMPS;
LAMPS = [];
LAMPS_N = objs.length;
var re = typeof TARGET_RE !== "undefined" ? TARGET_RE.lamps : /streetlight|lamppost|gaslamp/;
objs.forEach(function (o) {
if (!re.test(o.archetype))
return;
var d = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1, top = d ? d.size[1] * s * 0.93 : 4;
var ring = (typeof atlRingAt === "function") ? atlRingAt(o.x, o.z) : null;
LAMPS.push({ id: o.id, x: o.x, z: o.z, top: top, ward: wardOf(o.x, o.z), name: "a lamp" + (ring && ring.name ? " on " + ring.name : ""), h: careHash(o.id) });
});
return LAMPS;
}
function lampLitNow(L, h) {
if (LAMPSTATE.kept[L.ward])
return !!LAMPSTATE.lit[L.id];
var w = lampRounds(), on = w.on + (L.h % 90) / 90 * w.onLen, off = w.off + (L.h % 60) / 60 * w.offLen;
on %= 24;
off %= 24;
return on > off ? (h >= on || h < off) : (h >= on && h < off);
}
var LAMP_ROUNDS = { at: 0, w: null };
function lampRounds() {
if (LAMP_ROUNDS.w && Date.now() - LAMP_ROUNDS.at < 5000)
return LAMP_ROUNDS.w;
LAMP_ROUNDS.at = Date.now();
return (LAMP_ROUNDS.w = lampRoundsNow());
}
function lampRoundsNow() {
if (typeof shiftsLoad === "function")
shiftsLoad();
var sh = (typeof SHIFTS !== "undefined" && SHIFTS.map) ? SHIFTS.map.Lamplighter : null;
var def = { on: 17.75, onLen: 1.5, off: 5.25, offLen: 1 };
if (!sh || !isFinite(+sh.start1) || !isFinite(+sh.len1))
return def;
var a = { s: +sh.start1, l: Math.max(0.25, Math.min(2, +sh.len1)) };
if (sh.start2 === null || sh.start2 === undefined || !isFinite(+sh.start2)) {
var end = (+sh.start1 + +sh.len1) % 24;
return { on: a.s, onLen: Math.min(1.5, a.l), off: (end + 23) % 24, offLen: 1 };
}
var b = { s: +sh.start2, l: Math.max(0.25, Math.min(2, +sh.len2 || 1)) };
var dusk = (a.s >= 12) === (b.s >= 12) ? (a.s > b.s ? a : b) : (a.s >= 12 ? a : b), dawn = dusk === a ? b : a;
return { on: dusk.s, onLen: dusk.l, off: dawn.s, offLen: dawn.l };
}
function lampsLoad() {
if (Date.now() - LAMPSTATE.at < 60000)
return;
LAMPSTATE.at = Date.now();
carePublicRpc("lamps_board").then(function (b) {
if (!b || !b.lit)
return;
var lit = {};
(b.lit || []).forEach(function (k) { lit[k] = 1; });
Object.keys(LAMPSTATE.pending || {}).forEach(function (k) { lit[k] = LAMPSTATE.pending[k] ? 1 : 0; if (!LAMPSTATE.pending[k])
delete lit[k]; });
var kept = {};
(b.kept || []).forEach(function (w) { kept[w] = 1; });
LAMPSTATE.lit = lit;
LAMPSTATE.kept = kept;
LAMPSTATE.loaded = true;
});
}
function lampTex() {
if (LAMP_TEX)
return LAMP_TEX;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d");
var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
g.addColorStop(0, "rgba(255,244,210,1)");
g.addColorStop(0.25, "rgba(255,206,120,.85)");
g.addColorStop(0.6, "rgba(255,170,70,.25)");
g.addColorStop(1, "rgba(255,150,40,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
LAMP_TEX = new THREE.CanvasTexture(c);
return LAMP_TEX;
}
function lampSprite(i) {
if (LAMP_SPR[i])
return LAMP_SPR[i];
var m = new THREE.SpriteMaterial({ map: lampTex(), color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
var s = new THREE.Sprite(m);
s.scale.set(2.2, 2.2, 1);
s.renderOrder = 5;
s.visible = false;
scene.add(s);
LAMP_SPR[i] = s;
return s;
}
function lampsTick(dt) {
lampAt -= dt;
if (lampAt > 0)
return;
lampAt = 0.5;
var show = careInCity();
if (show)
lampsLoad();
var h = typeof cityHourNow === "function" ? cityHourNow() : 12, night = (h >= 17.5 || h < 6.75);
var n = 0;
if (show && night) {
var P = camera.position, list = lampList(), near = [];
for (var i = 0; i < list.length; i++) {
var L = list[i], d = Math.hypot(L.x - P.x, L.z - P.z);
if (d < 320 && lampLitNow(L, h))
near.push({ L: L, d: d });
}
near.sort(function (a, b) { return a.d - b.d; });
near.slice(0, typeof LITE !== "undefined" && LITE ? 90 : 220).forEach(function (q) {
var s = lampSprite(n++);
s.visible = true;
s.position.set(q.L.x, terrainY(q.L.x, q.L.z) + q.L.top, q.L.z);
var f = 1 + Math.sin(performance.now() / 180 + q.L.h) * 0.06;
s.scale.set(2.2 * f, 2.2 * f, 1);
});
}
for (var k = n; k < LAMP_SPR.length; k++)
LAMP_SPR[k].visible = false;
}
(function () {
if (typeof lampsForNight !== "function")
return;
var lf = lampsForNight;
lampsForNight = function (night) { lf(careInCity() ? night * 0.18 : night); };
})();
function wardLamps(ward, light) { return __ZC(118, 0, this, arguments, new.target); }
function lampDone(B, s) { return __ZC(118, 1, this, arguments, new.target); }
function lampFlush(light, ward) { return __ZC(118, 2, this, arguments, new.target); }
var BEDS = null, BEDS_N = -1, GARDEN = { beds: {}, at: 0 }, BED_G = {}, bedAt = 0;
var FLOWERS = [["roses", 0xC0392B], ["tulips", 0xE0703A], ["lavender", 0x8E7CC3], ["marigolds", 0xE8A030], ["lilies", 0xF2EEE0], ["sunflowers", 0xF0C83C],
["poppies", 0xD2382E], ["daisies", 0xF6F3E8], ["irises", 0x5A5ACF], ["violets", 0x7A4AB0], ["peonies", 0xE48AA8], ["hyacinths", 0x6A7AE0]];
var BED_COLOURS = [0xC0392B, 0xE48AA8, 0xF2EEE0, 0xF0C83C, 0xE0703A, 0x8E7CC3, 0x5A5ACF, 0x3E8E62];
var HEDGE_SHAPES = ["box", "round", "cone", "spiral", "arch", "natural"];
function bedKind(a) { return /hedge|topiary/.test(a) ? "hedge" : /lawn|green|grass/.test(a) ? "lawn" : "bed"; }
function bedList() {
var objs = typeof cityObjs === "function" ? cityObjs() : [];
if (BEDS && BEDS_N === objs.length)
return BEDS;
BEDS = [];
BEDS_N = objs.length;
objs.forEach(function (o) {
if (!/flowerbed|flowers|flower|hedge|topiary|planter|garden|lawn|bush/.test(o.archetype) || /fountain|shop|house|lodge/.test(o.archetype))
return;
var d = KIT[o.archetype];
if (!d || d.cat === "being" || d.cat === "structure")
return;
var s = (o.attrs && o.attrs.s) || 1;
BEDS.push({ id: o.id, x: o.x, z: o.z, ward: wardOf(o.x, o.z), kind: bedKind(o.archetype), w: d.size[0] * s, h: d.size[1] * s, dd: d.size[2] * s, rot: o.rot || 0, name: o.label || ({ hedge: "a hedge", lawn: "a green", bed: "a flower bed" }[bedKind(o.archetype)]) });
});
return BEDS;
}
function gardenLoad() {
if (Date.now() - GARDEN.at < 120000)
return;
GARDEN.at = Date.now();
carePublicRpc("garden_board").then(function (rows) {
if (!rows)
return;
var m = {};
rows.forEach(function (r) { m[r.key] = r; });
GARDEN.beds = m;
Object.keys(BED_G).forEach(function (k) { BED_G[k].stamp = null; });
});
}
function bedDraw(b) { return __ZC(118, 3, this, arguments, new.target); }
function gardenTick(dt) {
bedAt -= dt;
if (bedAt > 0)
return;
bedAt = 1;
var show = careInCity();
if (show)
gardenLoad();
var P = camera.position, near = {};
if (show)
bedList().forEach(function (b) { if (Math.hypot(b.x - P.x, b.z - P.z) < 200 && GARDEN.beds[b.id]) {
near[b.id] = 1;
bedDraw(b);
} });
Object.keys(BED_G).forEach(function (k) { var g = BED_G[k]; g.visible = !!near[k]; });
}
function wardBeds(ward) { return __ZC(118, 4, this, arguments, new.target); }
function bedCardHtml(B, s) { return __ZC(118, 5, this, arguments, new.target); }
function bedCardWire(el, B) { return __ZC(118, 6, this, arguments, new.target); }
function bedDone(B, s, act) { return __ZC(118, 7, this, arguments, new.target); }
var SHIFTS = { map: null, at: 0 };
function shiftsLoad() {
if (Date.now() - SHIFTS.at < 3600000 || typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return;
SHIFTS.at = Date.now();
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/job_shift?select=title,start1,len1,start2,len2", { headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey } })
.then(function (r) { return r.ok ? r.json() : null; }).then(function (rows) { if (!Array.isArray(rows) || !rows.length)
return; var m = {}; rows.forEach(function (x) { m[x.title] = x; }); SHIFTS.map = m; }).catch(function () { });
if (typeof cityClockLoad === "function")
cityClockLoad();
}
function tempOnShift(t) {
if (!t || !t.post)
return true;
var sh = SHIFTS.map ? SHIFTS.map[t.post.title] : null;
if (sh)
return shiftNow(sh, 0);
var h = (typeof cityHourNow === "function") ? cityHourNow() : 12, w = (String(t.post.title || "") + " " + String(t.post.workplace || "")).toLowerCase();
function within(a, b) { return a < b ? (h >= a && h < b) : (h >= a || h < b); }
if (/nurse|doctor|surgeon|guard|gaol|warden|officer|constable|police|dragon|watchman|night watch|the watch\b|dispatch|hospital|infirmary|signal/.test(w))
return true;
if (/\binn\b|innkeep|hotel|lodging|motel|porter/.test(w))
return within(7, 2);
if (/picture house|cinema|projection|usher|box office|concession|film programmer/.test(w))
return within(10, 1);
if (/\bbar\b|barkeep|barmaid|tavern|\bpub\b|saloon|casino|croupier|bouncer|dancer|musician|club|cabaret/.test(w))
return within(16, 2.5);
if (/bak|pastry|market|stall|dairy|fish|grocer|milk|farm|harvest|orchard/.test(w))
return within(4.5, 13);
if (/lamp|track walker|night/.test(w))
return within(18, 6.5);
if (/temple|priest|acolyte|shrine/.test(w))
return within(6, 21);
return within(8, 18.5);
}
var DREAM_GROUND = { water: 1, mountain: 1, hill: 1, dune: 1, snowfield: 1, lawn: 1, road: 1, sidewalk: 1, grass: 1, flood: 1, frozenlake: 1, dustbowl: 1, emberfield: 1, shardfield: 1, mistbank: 1, cloudbank: 1, parking: 1 };
function dreamCluster() {
var here = store.here || 0, pts = [];
store.objects.forEach(function (o) {
if (o.filler || o.hub || o.city || (o.realm || 0) !== here || DREAM_GROUND[o.archetype] || !KIT[o.archetype])
return;
pts.push(o);
});
if (!pts.length)
return null;
var cx = 0, cz = 0;
pts.forEach(function (o) { cx += o.x; cz += o.z; });
cx /= pts.length;
cz /= pts.length;
var d = pts.map(function (o) { return Math.sqrt((o.x - cx) * (o.x - cx) + (o.z - cz) * (o.z - cz)); }).sort(function (a, b) { return a - b; });
return { x: cx, z: cz, spread: d[Math.floor(d.length * 0.75)] || 0, n: pts.length };
}
function dreamFrame() {
if (walkMode || (typeof plotOn !== "undefined" && plotOn) || store.inside)
return;
var C = dreamCluster();
if (!C)
return;
orb.tx = C.x;
orb.tz = C.z;
viewAt = { x: C.x, z: C.z };
orb.r = Math.max(70, Math.min(190, C.spread * 1.5 + 60));
orb.p = Math.min(1.0, Math.max(0.6, orb.p || 0.85));
}
(function () {
if (typeof setWalk !== "function")
return;
var sw = setWalk, lastCount = -1;
setWalk = function (on) {
var fresh = on && store.objects.length !== lastCount && !store.inside;
if (fresh)
walkResume = null;
var r = sw.apply(this, arguments);
if (on) {
lastCount = store.objects.length;
if (fresh) {
var C = dreamCluster();
if (C) {
var R = Math.max(22, Math.min(90, C.spread * 0.8 + 20));
camera.position.set(C.x, 1.72 + ((typeof terrainY === "function") ? terrainY(C.x, C.z + R) : 0), C.z + R);
yaw = 0;
pitch = -0.05;
}
}
}
else
lastCount = store.objects.length;
return r;
};
})();
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
try {
var defs = {};
((p && p.newArchetypes) || []).forEach(function (nd) { if (nd && nd.key)
defs[nd.key] = nd; });
((p && p.objects) || []).forEach(function (o) {
if (!o || !o.archetype || !defs[o.archetype])
return;
var label = String(o.label || "").toLowerCase().trim();
if (!label)
return;
var got = typeof growArchetype === "function" ? growArchetype(o.archetype, defs[o.archetype], label) : null;
if (!got)
return;
var words = label.split(/\s+/), last = growSingular(words[words.length - 1]), flat = label.replace(/[^a-z0-9]/g, "");
var keys = ["g" + flat, "g" + last.replace(/[^a-z0-9]/g, "")], swapped = false, drop = [];
store.objects.forEach(function (sp) {
var byKey = keys.indexOf(sp.archetype) > -1, byLabel = sp.label && String(sp.label).toLowerCase().replace(/[^a-z0-9]/g, "") === flat && sp.archetype !== o.archetype && !(KIT[sp.archetype] && KIT[sp.archetype].cat === "being");
var byPlace = sp.standIn && sp.standIn.split(" ").indexOf(flat) > -1;
if (!(byKey || byLabel || byPlace) || sp.sea)
return;
if (!swapped && (byKey || byLabel || (byPlace && KIT[sp.archetype] && KIT[sp.archetype].cat === "structure"))) {
sp.archetype = o.archetype;
sp.label = sp.label || label;
sp.attrs = o.attrs ? JSON.parse(JSON.stringify(o.attrs)) : {};
delete sp.standIn;
swapped = true;
if (typeof refresh === "function")
refresh(sp);
}
else if (byPlace)
drop.push(sp);
});
drop.forEach(function (sp) { if (typeof removeSpec === "function")
removeSpec(sp); });
if (swapped)
o.__swapped = true;
PHRASES = PHRASES.filter(function (ph) { return !((ph[0] === label || ph[0] === last) && /^g/.test(ph[1]) && ph[1] !== o.archetype); });
keys.forEach(function (k) { if (VOCAB[k])
VOCAB[k] = VOCAB[k].filter(function (w) { return w !== label && w !== last; }); });
if (typeof learnWord === "function") {
learnWord(o.archetype, label);
learnWord(o.archetype, last);
}
});
}
catch (e) {
if (window.console)
console.warn("grow/ai:", e);
}
var out = rc.apply(this, arguments);
try {
var SEA = store.objects.filter(function (o) { return o.sea && !o.filler && (o.realm || 0) === (store.here || 0); })[0];
if (SEA) {
var hs = 35 * ((SEA.attrs && SEA.attrs.s) || 1), kk = 0;
store.objects.forEach(function (o) {
if (o.filler || o === SEA || (o.realm || 0) !== (store.here || 0))
return;
var floats = /(ship|boat|ferry|wreck|whale|dolphin|shark|kraken|serpent|jellyfish|mermaid|merman|selkie|yacht|galleon|canoe|raft|submarine)/.test(o.archetype) && !/(rocket|star|space|air|sky)/.test(o.archetype) && KIT[o.archetype] && KIT[o.archetype].cat !== "structure";
if (!floats)
return;
var ex = o.x - SEA.x, ez = o.z - SEA.z;
if (ex * ex + ez * ez < (hs - 10) * (hs - 10)) {
kk++;
return;
}
o.x = SEA.x + ((kk % 2 ? 1 : -1) * Math.ceil(kk / 2) * 24);
o.z = SEA.z + hs * 0.35;
kk++;
if (typeof refresh === "function")
refresh(o);
});
store.objects.filter(function (o) { return o.archetype === "water" && !o.sea && !o.filler && /^(sea|the sea|ocean|the ocean|open sea|open water)$/i.test(String(o.label || "")); })
.forEach(function (o) { if (typeof removeSpec === "function")
removeSpec(o); });
}
}
catch (e) { }
setTimeout(function () { try {
if (typeof terrainTick === "function")
terrainTick();
dreamFrame();
}
catch (e) { } }, 400);
try {
var objs = (p && p.objects) || [], ppl = (p && p.people) || [];
if (objs.length || ppl.length) {
var archs = {}, labels = {}, labelArch = {};
objs.forEach(function (o) { if (o && o.archetype) {
archs[o.archetype] = 1;
} if (o && o.label) {
var lk = String(o.label).toLowerCase().replace(/[^a-z0-9]/g, "");
labels[lk] = 1;
if (o.archetype && KIT[o.archetype])
labelArch[lk] = o.archetype;
} });
ppl.forEach(function (x) { if (x && x.label)
labels[String(x.label).toLowerCase().replace(/[^a-z0-9]/g, "")] = 1; });
var gone = [];
store.objects.forEach(function (o) {
if (!o.instant)
return;
if (o.archetype === "field" && !((p && p.fields) || []).length) {
delete o.instant;
return;
}
if (o.archetype === "field")
return;
var lab = String(o.label || o.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
var being = KIT[o.archetype] && KIT[o.archetype].cat === "being";
if (lab && labelArch[lab] && labelArch[lab] !== o.archetype) {
gone.push(o);
return;
}
var keep = archs[o.archetype] || (lab && labels[lab]) || (being && o.archetype === "human" && ppl.length > 0);
if (keep)
delete o.instant;
else
gone.push(o);
});
gone.forEach(function (o) {
if (typeof removeSpec === "function")
removeSpec(o);
if (store.characters)
store.characters = store.characters.filter(function (c) { return c.objId !== o.id; });
});
if (gone.length && typeof save === "function")
save();
}
}
catch (e) {
if (window.console)
console.warn("ai/clean:", e);
}
return out;
};
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
if (careInCity())
shiftsLoad();
lampsTick(dt);
gardenTick(dt);
}
catch (e) {
if (window.console)
console.warn("care:", e);
} };
})();
