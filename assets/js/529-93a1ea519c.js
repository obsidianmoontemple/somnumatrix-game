/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var UGR_FAM = {
city: { name: "Cars and bikes", shop: "The Transport Yard service bay", icon: "🚗" },
py: { name: "Pyreline race cars", shop: "Pyreline Motorworks tuning bay", icon: "🏁" },
fly: { name: "Flying machines", shop: "The Transport Yard service bay", icon: "🛸" },
apt: { name: "Planes", shop: "Somnucor Airport hangar", icon: "✈️" },
ship: { name: "Spacecraft", shop: "A shipyard", icon: "🚀" }
};
var UGR_PARTS = [
{ k: "engine", name: "Engine", fam: ["city", "py", "fly"], what: "Top speed", lv: [
["Stock", "as the maker built it", 0], ["Street tune", "+8% top speed", 1800], ["Sport", "+16% top speed", 4200], ["Race", "+25% top speed", 8500], ["Pyre-built", "+35% top speed", 16000]
],
add: [0, 0.08, 0.16, 0.25, 0.35] },
{ k: "turbo", name: "Turbo and intake", fam: ["city", "py", "fly"], what: "Pick-up", lv: [
["None", "", 0], ["Cold-air intake", "+12% pick-up", 1500], ["Single turbo", "+25% pick-up", 3500], ["Twin turbo", "+40% pick-up", 7000], ["Supercharger and nitrous", "+55% pick-up", 13000]
],
add: [0, 0.12, 0.25, 0.4, 0.55] },
{ k: "brakes", name: "Brakes", fam: ["city"], what: "Stopping", lv: [
["Stock", "", 0], ["Drilled discs", "+12% stopping", 600], ["Four-pot callipers", "+24% stopping", 1400], ["Six-pot race brakes", "+36% stopping", 2800], ["Carbon-ceramic", "+50% stopping", 5200]
],
add: [0, 0.12, 0.24, 0.36, 0.5] },
{ k: "tyres", name: "Tyres and suspension", fam: ["city", "py"], what: "Grip", lv: [
["Stock", "", 0], ["Sport tyres", "+3% grip, +6% stopping", 800], ["Coilovers and semi-slicks", "+6% grip, +12% stopping", 1800], ["Adjustable race set-up", "+9% grip, +18% stopping", 3600], ["Full race slicks", "+12% grip, +24% stopping", 6500]
],
add: [0, 0.03, 0.06, 0.09, 0.12] },
{ k: "armour", name: "Armour", fam: ["py"], what: "Armour", lv: [
["Stock", "", 0], ["Bolt-on plate", "+15 armour, 8% off every blow", 2500], ["Welded cage", "+30 armour, 15% off every blow", 6000], ["Composite plate", "+50 armour, 22% off every blow", 12000], ["Reactive armour", "+75 armour, 30% off every blow", 22000]
],
add: [0, 15, 30, 50, 75], cut: [0, 0.08, 0.15, 0.22, 0.3] },
{ k: "weapons", name: "Weapons", fam: ["py"], what: "Weapon damage", lv: [
["Stock", "", 0], ["Hotter loads", "+12% weapon damage", 3000], ["Bigger guns", "+25% weapon damage", 7000], ["Twin mounts", "+40% weapon damage", 14000], ["Overcharged", "+60% weapon damage", 26000]
],
add: [0, 0.12, 0.25, 0.4, 0.6] },
{ k: "aengine", name: "Engine", fam: ["apt"], what: "Thrust", lv: [
["Stock", "", 0], ["Tuned and balanced", "+10% thrust", 6000], ["Bigger engine", "+20% thrust", 14000], ["Turbocharged", "+32% thrust", 28000], ["Race engine", "+45% thrust", 52000]
],
add: [0, 0.1, 0.2, 0.32, 0.45] },
{ k: "airframe", name: "Airframe and fairings", fam: ["apt"], what: "Less drag", lv: [
["Stock", "", 0], ["Gap seals", "6% less drag", 4000], ["Wheel spats and fairings", "12% less drag", 9000], ["Smoothed skin", "18% less drag", 18000], ["Race airframe", "25% less drag", 34000]
],
add: [0, 0.06, 0.12, 0.18, 0.25] },
{ k: "controls", name: "Control surfaces", fam: ["apt"], what: "Handling", lv: [
["Stock", "", 0], ["Tighter cables", "+10% roll and pitch", 2500], ["Bigger ailerons", "+20% roll and pitch", 6000], ["Aerobatic surfaces", "+30% roll and pitch", 12000], ["Full aerobatic kit", "+40% roll and pitch", 22000]
],
add: [0, 0.1, 0.2, 0.3, 0.4] },
{ k: "wing", name: "Wing kit", fam: ["apt"], what: "Slow flight", lv: [
["Stock", "", 0], ["Vortex generators", "stalls 4% slower", 3000], ["Drooped tips", "stalls 8% slower", 7000], ["Short take-off kit", "stalls 12% slower", 14000], ["Slotted wing", "stalls 16% slower", 26000]
],
add: [0, 0.04, 0.08, 0.12, 0.16] },
{ k: "thrust", name: "Thrusters", fam: ["ship"], what: "Speed", lv: [
["Stock", "", 0], ["Tuned nozzles", "+6% speed", 4000], ["Bigger thrusters", "+12% speed", 10000], ["Fusion thrusters", "+20% speed", 22000], ["Corsair drive", "+28% speed", 40000]
],
add: [0, 0.06, 0.12, 0.2, 0.28] },
{ k: "burn", name: "Afterburners", fam: ["ship"], what: "Boost", lv: [
["Stock", "", 0], ["Injectors", "+10% boost", 3000], ["Afterburner", "+20% boost", 7000], ["Twin afterburners", "+32% boost", 14000], ["Overburn", "+45% boost", 26000]
],
add: [0, 0.1, 0.2, 0.32, 0.45] },
{ k: "hull", name: "Hull plating", fam: ["ship"], what: "Hull", lv: [
["Stock", "", 0], ["Doubled plates", "+15% hull", 5000], ["Ceramic armour", "+30% hull", 12000], ["Laminated armour", "+50% hull", 25000], ["Star-plate", "+75% hull", 46000]
],
add: [0, 0.15, 0.3, 0.5, 0.75] },
{ k: "shields", name: "Shield generator", fam: ["ship"], what: "Shields", lv: [
["Stock", "", 0], ["Tuned emitters", "+15% shields, comes back 10% faster", 5000], ["Second generator", "+30% shields, 20% faster", 12000], ["Military generator", "+50% shields, 30% faster", 25000], ["Veyari lattice", "+75% shields, 45% faster", 46000]
],
add: [0, 0.15, 0.3, 0.5, 0.75], regen: [0, 0.1, 0.2, 0.3, 0.45] },
{ k: "guns", name: "Primary guns", fam: ["ship"], what: "Gun damage", lv: [
["Stock", "", 0], ["Focused emitters", "+12% damage", 4500], ["Heavier guns", "+25% damage, 5% quicker", 11000], ["Military guns", "+40% damage, 10% quicker", 23000], ["Overcharged guns", "+60% damage, 15% quicker", 43000]
],
add: [0, 0.12, 0.25, 0.4, 0.6], quick: [0, 0, 0.05, 0.1, 0.15] },
{ k: "rack", name: "Missile rack", fam: ["ship"], what: "Second gun", lv: [
["None", "", 0], ["Two-tube rack", "a second gun of two homing missiles (G), or +10% to a star weapon", 3500], ["Four-tube rack", "four missiles, or +20% to a star weapon", 8000], ["Six-tube rack", "six missiles, or +30% to a star weapon", 16000], ["Torpedo bay", "six heavy missiles, or +40% to a star weapon", 30000]
],
add: [0, 0.1, 0.2, 0.3, 0.4], n: [0, 2, 4, 6, 6], dmg: [0, 12, 14, 16, 24] },
{ k: "droids", name: "Repair droids", fam: ["ship"], what: "Mends the hull", lv: [
["None", "the hull stays as it is until a shipyard mends it", 0], ["One droid", "mends 0.5% of the hull a second, out of a fight", 8000], ["A droid crew", "1% a second, and slowly in a fight", 20000], ["Droid bay", "2% a second, and 1% in a fight", 40000]
],
rate: [0, 0.005, 0.01, 0.02], fight: [0, 0, 0.0025, 0.01] }
];
var UGR_PART = {};
UGR_PARTS.forEach(function (p) { UGR_PART[p.k] = p; });
var UGR_PAINT = [["red", "Racing red", 0xB0202A], ["black", "Gloss black", 0x16171A], ["white", "Pearl white", 0xEDEBE6], ["silver", "Silver", 0xA8ACB2], ["blue", "Deep blue", 0x1F3E8C], ["sky", "Sky blue", 0x5AA8E8],
["green", "British green", 0x1E4A30], ["lime", "Lime", 0x8ACC2A], ["yellow", "Yellow", 0xE8C020], ["orange", "Orange", 0xE06A1A], ["purple", "Purple", 0x5A2A8A], ["pink", "Pink", 0xE06AA8], ["gold", "Gold", 0xC8A040], ["bronze", "Bronze", 0x8A5A30], ["grey", "Gunmetal", 0x3A3E44], ["teal", "Teal", 0x1A8A8A]];
var UGR_NEON = [["off", "No neon", 0], ["cyan", "Cyan", 0x2AE8FF], ["magenta", "Magenta", 0xFF3AD8], ["green", "Green", 0x7AFF3A], ["orange", "Orange", 0xFF8A2A], ["violet", "Violet", 0xA85AFF], ["blue", "Blue", 0x5AB8FF], ["red", "Red", 0xFF3A4A], ["gold", "Gold", 0xFFD23A], ["white", "White", 0xF0F4FF]];
var UGR_LAMP = [["stock", "Stock halogen", 0xFFF1D8, 1.0, 1.0], ["xenon", "Xenon", 0xEAF2FF, 1.35, 1.3], ["led", "LED", 0xF4F8FF, 1.6, 1.5], ["laser", "Laser lights", 0xF8FBFF, 2.0, 2.0]];
var UGR_LAMPCOL = [["white", "White", 0], ["warm", "Warm yellow", 0xFFD890], ["ice", "Ice blue", 0x9AD0FF], ["amber", "Amber", 0xFFB040], ["green", "Green", 0x8AFFA0], ["violet", "Violet", 0xC8A0FF], ["red", "Red", 0xFF7A7A]];
var UGR_SMOKE = [["off", "No smoke", 0], ["white", "White", 0xF4F4F4], ["red", "Red", 0xE84040], ["blue", "Blue", 0x4A80F0], ["yellow", "Yellow", 0xF0D040], ["green", "Green", 0x40D070], ["pink", "Pink", 0xF070C0]];
var UGR_LOOKS = {
paint: { name: "Paint", fam: ["city", "py", "fly", "apt", "ship"], list: UGR_PAINT, price: { city: 1800, py: 2400, fly: 2400, apt: 4500, ship: 3500 } },
neon: { name: "Neon underglow", fam: ["city", "py"], list: UGR_NEON, price: { city: 900, py: 900 } },
lamp: { name: "Headlights", fam: ["city"], list: UGR_LAMP, prices: { stock: 0, xenon: 450, led: 900, laser: 2200 } },
lampcol: { name: "Light colour", fam: ["city", "apt", "ship"], list: UGR_LAMPCOL, price: { city: 150, apt: 900, ship: 1200 } },
smoke: { name: "Display smoke", fam: ["apt"], list: UGR_SMOKE, price: { apt: 1500 } }
};
var UGR_MULT_DEF = { city: 1, py: 1.5, fly: 1.2, apt: 1, ship: 1.5 };
var UGR_MULT = {
"city:car": 1, "city:coupe": 1, "city:roadster": 1.1, "city:sportscar": 1.4, "city:limousine": 1.3, "city:taxicab": 1, "city:vintagecar": 1.1, "city:van": 1.1,
"city:hovercar": 1.5, "city:truck": 1.3, "city:bus": 1.3, "city:tractor": 0.8, "city:motorbike": 0.6, "city:scooter": 0.4,
"fly:saucer": 1.5, "fly:airship": 1.2, "fly:sleigh": 0.6, "fly:firechariot": 1, "fly:broomstick": 0.4, "fly:flyingcarpet": 0.5,
"apt:trainer": 1, "apt:seaplane": 1.1, "apt:airliner": 4,
"ship:corp": 0.8, "ship:shuttle": 1, "ship:saucer": 1.2, "ship:shrike": 1.5, "ship:kestrel": 1.6, "ship:domeship": 2, "ship:nightwyrm": 1.8, "ship:emberwing": 1.7, "ship:sunwake": 2.2
};
var UGR_CITY = ["car", "coupe", "roadster", "sportscar", "limousine", "taxicab", "vintagecar", "van", "hovercar", "truck", "bus", "tractor", "motorbike", "scooter"];
var UGR_FLY = ["saucer", "airship", "sleigh", "firechariot", "broomstick", "flyingcarpet"];
var UGR_APT = ["trainer", "seaplane", "airliner"];
function ugrPyMult(price) { return price > 0 ? Math.max(0.6, Math.min(2.2, Math.round(price / 20000 * 10) / 10)) : UGR_MULT_DEF.py; }
var UGR_REPAIR_RATE = 12;
var UGR_SHIP_HULL = { corp: 110, shuttle: 160, saucer: 120, shrike: 100, kestrel: 240, domeship: 200, nightwyrm: 210, emberwing: 170,
bladeship: 200, ashfang: 150, hammer: 340, skiff: 110, longship: 260, racer: 90, hauler: 380, concord: 150, tideray: 170, icerunner: 140, sunwake: 260 };
function ugrRound(n) { return Math.round(n / 10) * 10; }
function ugrMult(veh) { var m = UGR_MULT[veh]; if (m != null)
return m; var f = String(veh).split(":")[0]; return UGR_MULT_DEF[f] || 1; }
function ugrPartPrice(veh, part, lv) { var P = UGR_PART[part]; if (!P || !P.lv[lv])
return null; return ugrRound(P.lv[lv][2] * ugrMult(veh)); }
function ugrStepPrice(veh, part, from, to) { if (to <= from)
return 0; return Math.max(0, ugrPartPrice(veh, part, to) - ugrPartPrice(veh, part, from)); }
function ugrLookPrice(veh, look, opt) {
var L = UGR_LOOKS[look];
if (!L)
return null;
var f = String(veh).split(":")[0];
if (L.prices) {
var p = L.prices[opt];
return p == null ? null : ugrRound(p * ugrMult(veh));
}
if (!L.price[f])
return null;
return ugrRound(L.price[f] * ugrMult(veh));
}
function ugrRepairPrice(veh, hullMax, frac) { if (veh === "ship:corp")
return 0; return ugrRound(Math.max(0, 1 - frac) * hullMax * UGR_REPAIR_RATE * ugrMult(veh)); }
"use strict";
var UGR = { fit: {}, look: {}, hull: {}, best: {}, loaded: false, loadAt: 0, missing: false, busy: false, msg: "", at: null, shown: null, t: 0,
saveT: 0, hullSent: {}, pill: null, fx: [], dmgT: 0 };
var UGR_LS = "ugr.v1";
function ugrEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function ugrSay(h) { if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function ugrTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function ugrSigned() { try {
return typeof signedIn === "function" && signedIn();
}
catch (e) {
return false;
} }
function ugrKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function ugrRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function ugrMissingErr(e) { return /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function ugrGold(n) { return typeof gold === "function" ? gold(n) : (n || 0).toLocaleString() + " gold"; }
function ugrPurse() { try {
return typeof standing !== "undefined" && standing && standing.gold != null ? +standing.gold : null;
}
catch (e) {
return null;
} }
function ugrLite() { return typeof LITE !== "undefined" && !!LITE; }
function ugrTouch() { try {
return !!(document.body && document.body.classList.contains("touch")) || (typeof touchRig !== "undefined" && !!touchRig);
}
catch (e) {
return false;
} }
function ugrLocalLoad() {
try {
var o = JSON.parse(localStorage.getItem(UGR_LS) || "{}") || {};
UGR.fit = o.fit || {};
UGR.look = o.look || {};
UGR.hull = o.hull || {};
UGR.best = o.best || {};
}
catch (e) { }
}
function ugrLocalSave() { try {
localStorage.setItem(UGR_LS, JSON.stringify({ fit: UGR.fit, look: UGR.look, hull: UGR.hull, best: UGR.best }));
}
catch (e) { } }
ugrLocalLoad();
function ugrLoad(force) {
if (!ugrSigned())
return Promise.resolve(false);
if (!force && UGR.loaded && Date.now() - UGR.loadAt < 30000)
return Promise.resolve(true);
return ugrRpc("garage_me", {}).then(function (r) {
UGR.missing = false;
if (!r || !r.ok)
return false;
UGR.fit = {};
UGR.best = {};
UGR.look = {};
(r.fits || []).forEach(function (f) { (UGR.fit[f.veh] = UGR.fit[f.veh] || {})[f.part] = +f.lvl || 0; (UGR.best[f.veh] = UGR.best[f.veh] || {})[f.part] = +f.best || 0; });
(r.looks || []).forEach(function (f) { (UGR.look[f.veh] = UGR.look[f.veh] || {})[f.look] = f.opt; });
(r.hulls || []).forEach(function (h) {
var v = Math.max(0, Math.min(1, +h.frac)), loc = UGR.hull[h.veh];
if (loc == null || !UGR.unsent || !UGR.unsent[h.veh])
UGR.hull[h.veh] = v;
UGR.hullSent[h.veh] = UGR.hull[h.veh];
});
UGR.loaded = true;
UGR.loadAt = Date.now();
ugrLocalSave();
ugrApplyAll();
return true;
}).catch(function (e) { if (ugrMissingErr(e))
UGR.missing = true; return false; });
}
function ugrLv(veh, part) { var f = UGR.fit[veh]; return f && f[part] ? +f[part] : 0; }
function ugrBest(veh, part) { var f = UGR.best[veh]; return Math.max(ugrLv(veh, part), f && f[part] ? +f[part] : 0); }
function ugrAdd(veh, part, key) { var P = UGR_PART[part]; if (!P)
return 0; var a = P[key || "add"]; return a ? (a[ugrLv(veh, part)] || 0) : 0; }
function ugrLook(veh, look) { var l = UGR.look[veh]; return l && l[look] != null ? l[look] : null; }
function ugrLookItem(look, opt) { var L = UGR_LOOKS[look]; if (!L || opt == null)
return null; for (var i = 0; i < L.list.length; i++)
if (L.list[i][0] === opt)
return L.list[i]; return null; }
function ugrAnyWork(veh) { var f = UGR.fit[veh], l = UGR.look[veh], k; if (f)
for (k in f)
if (f[k])
return true; if (l)
for (k in l)
if (l[k] != null)
return true; return false; }
(function () { try {
if (typeof PY_CARS !== "undefined")
PY_CARS.forEach(function (c) { UGR_MULT["py:" + c.k] = ugrPyMult(c.how === "buy" ? +c.what || 0 : 0); });
}
catch (e) { } })();
function ugrFit(veh, part, lv, then) { return __ZC(529, 0, this, arguments, new.target); }
function ugrSetLook(veh, look, opt, then) { return __ZC(529, 1, this, arguments, new.target); }
function ugrPay(fn, args, cost, ok, fail) { return __ZC(529, 2, this, arguments, new.target); }
var UGR_APPLY = [];
function ugrApplyAll() { UGR_APPLY.forEach(function (f) { try {
f();
}
catch (e) {
if (!UGR.warned) {
UGR.warned = 1;
console.warn("[upgrade-garage]", e);
}
} }); }
"use strict";
function ugrOwnedThings() { return (typeof myThings !== "undefined" && myThings ? myThings : []).map(function (t) { return t && t.archetype; }).filter(Boolean); }
function ugrVehicles(fam) { return __ZC(529, 3, this, arguments, new.target); }
function ugrKmh(ms) { return Math.round(ms * 3.6) + " km/h"; }
function ugrStats(veh) { return __ZC(529, 4, this, arguments, new.target); }
function ugrShopHere() { var s = null; UGR_SHOPS.forEach(function (f) { if (!s) {
try {
s = f();
}
catch (e) { }
} }); return s; }
var UGR_SHOPS = [];
function ugrOpen(shop) { return __ZC(529, 5, this, arguments, new.target); }
function ugrHome() { return __ZC(529, 6, this, arguments, new.target); }
function ugrNoneLine(f) { return __ZC(529, 7, this, arguments, new.target); }
function ugrSummary(veh) { return __ZC(529, 8, this, arguments, new.target); }
function ugrVehCard(veh, name) { return __ZC(529, 9, this, arguments, new.target); }
function ugrSure(id, cost) {
if (cost <= 0 || ugrKeeper())
return true;
if (UGR.sure === id && Date.now() - (UGR.sureAt || 0) < 10000) {
UGR.sure = null;
return true;
}
UGR.sure = id;
UGR.sureAt = Date.now();
return false;
}
function ugrPartTap(veh, name, part, lv, cost) {
var id = "p_" + part + "_" + lv;
if (lv === ugrLv(veh, part))
return;
if (!ugrSure(id, cost)) {
UGR.msg = "";
ugrVehCard(veh, name);
return;
}
ugrFit(veh, part, lv, function () { ugrVehCard(veh, name); });
ugrVehCard(veh, name);
}
function ugrLookTap(veh, name, look, opt, cost) {
var id = "l_" + look + "_" + opt;
if (ugrLook(veh, look) === opt)
return;
if (!ugrSure(id, cost)) {
UGR.msg = "";
ugrVehCard(veh, name);
return;
}
ugrSetLook(veh, look, opt, function () { ugrVehCard(veh, name); });
ugrVehCard(veh, name);
}
"use strict";
var UGR_VEHSPEC0 = typeof vehSpec === "function" ? vehSpec : null;
var UGR_FLYBASE = {};
(function () { try {
for (var k in FLYER)
UGR_FLYBASE[k] = Object.assign({}, FLYER[k]);
}
catch (e) { } })();
function ugrCityBase(a) { try {
return UGR_VEHSPEC0 ? UGR_VEHSPEC0(a) : null;
}
catch (e) {
return null;
} }
function ugrCityStats(veh, B) {
var o = Object.assign({}, B);
o.vmax = B.vmax * (1 + ugrAdd(veh, "engine"));
o.acc = B.acc * (1 + ugrAdd(veh, "turbo"));
o.brake = B.brake * (1 + ugrAdd(veh, "brakes") + ugrAdd(veh, "tyres") * 2);
return o;
}
function ugrFlyStats(veh, B) { var o = Object.assign({}, B); o.vmax = B.vmax * (1 + ugrAdd(veh, "engine")); o.acc = B.acc * (1 + ugrAdd(veh, "turbo")); return o; }
function ugrPyStats(veh, c) { return __ZC(529, 10, this, arguments, new.target); }
function ugrOwnsThing(a) { return ugrKeeper() || ugrOwnedThings().indexOf(a) >= 0; }
function ugrDrivingMine() {
var D = typeof DRIVE !== "undefined" ? DRIVE : null;
if (!D || !D.on || D.src === "corp" || D.src === "race" || D.test || (D.spec && D.spec.learner))
return null;
try {
if (typeof TY !== "undefined" && (TY.drive || TY.trying))
return null;
}
catch (e) { }
if (typeof pyIsCar === "function" && pyIsCar(D.arch))
return null;
if (!ugrOwnsThing(D.arch))
return null;
return (D.mode === "fly" ? "fly:" : "city:") + D.arch;
}
(function () {
if (!UGR_VEHSPEC0)
return;
vehSpec = function (arch) {
var r = UGR_VEHSPEC0.apply(this, arguments);
try {
if (r && typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road" && DRIVE.arch === arch) {
var v = ugrDrivingMine();
if (v && ugrAnyWork(v))
r = ugrCityStats(v, r);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof driveFly !== "function")
return;
var df = driveFly;
driveFly = function (dt, inp) {
var D = DRIVE, k = D && D.arch, keep = null, v = ugrDrivingMine();
if (v && k && FLYER[k] && UGR_FLYBASE[k] && ugrAnyWork(v)) {
keep = FLYER[k];
FLYER[k] = ugrFlyStats(v, UGR_FLYBASE[k]);
}
try {
return df.apply(this, arguments);
}
finally {
if (keep)
FLYER[k] = keep;
}
};
})();
function ugrHex(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6); }
var UGR_V3 = null, UGR_V3B = null;
function ugrPaintGroup(g, col, key) { return __ZC(529, 11, this, arguments, new.target); }
var UGR_NEONTEX = null;
function ugrNeonTex() { return __ZC(529, 12, this, arguments, new.target); }
function ugrNeonOn(g, col, len, wid, y) { return __ZC(529, 13, this, arguments, new.target); }
function ugrCityLooksTick() {
var v = ugrDrivingMine();
if (!v || v.indexOf("city:") !== 0 || typeof rideG === "undefined" || !rideG)
return;
var k = v.slice(5), paint = ugrLookItem("paint", ugrLook(v, "paint")), neon = ugrLookItem("neon", ugrLook(v, "neon"));
var key = (paint ? paint[0] : "-") + "|" + (rideG.userData.modelled || "") + "|" + rideG.children.length;
if (rideG.userData.ugrPaint !== key)
ugrPaintGroup(rideG, paint ? paint[2] : null, key);
var S = ugrCityBase(k) || { len: 2.3, wid: 0.95 }, dark = typeof VLT !== "undefined" ? VLT.dark || 0 : 0;
ugrNeonOn(rideG, neon && neon[2] ? neon[2] : 0, S.len, S.wid, 0.06);
if (rideG.userData.ugrNeon)
rideG.userData.ugrNeon.material.opacity = 0.45 + dark * 0.45;
}
(function () {
if (typeof vltTick !== "function")
return;
var vt = vltTick;
vltTick = function (dt) {
var r = vt.apply(this, arguments);
try {
ugrLampTick();
}
catch (e) { }
return r;
};
})();
var UGR_LAMPMAT = {};
function ugrLampTick() {
var v = ugrDrivingMine();
if (!v || v.indexOf("city:") !== 0)
return;
var kind = ugrLookItem("lamp", ugrLook(v, "lamp")) || UGR_LAMP[0], lc = ugrLookItem("lampcol", ugrLook(v, "lampcol"));
if (kind[0] === "stock" && !(lc && lc[2]))
return;
var col = lc && lc[2] ? lc[2] : kind[2];
var E = null;
(VLT.list || []).forEach(function (x) { if (x.own)
E = x; });
if (E && E.halos) {
var key = col.toString(16);
if (!UGR_LAMPMAT[key])
UGR_LAMPMAT[key] = new THREE.SpriteMaterial({ map: vltGlowTex(), color: col, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: true });
E.halos.forEach(function (s) { if (s.userData.t !== "head")
return; s.material = UGR_LAMPMAT[key]; if (s.visible)
s.scale.multiplyScalar(kind[3]); });
if (E.lens && E.lens.head) {
var lk = "lens" + key;
if (!UGR_LAMPMAT[lk])
UGR_LAMPMAT[lk] = new THREE.MeshBasicMaterial({ color: new THREE.Color(col).lerp(new THREE.Color(0xFFFFFF), 0.4), transparent: true, opacity: 1, fog: true });
E.lens.head.material = UGR_LAMPMAT[lk];
}
}
var s = VLT.spot;
if (s && s.intensity > 0) {
s.color.setHex(col);
s.intensity *= kind[3];
s.distance = 55 * kind[4];
}
}
(function () {
if (typeof pyGetIn !== "function")
return;
var gi = pyGetIn;
pyGetIn = function (k, at) {
var r = gi.apply(this, arguments);
try {
var M = PY.me, c = M && M.car, veh = c ? "py:" + c.k : null, own = {};
try {
own = pyOwned() || {};
}
catch (e) { }
if (c && !c.ugr && (own[c.k] || ugrKeeper()) && ugrAnyWork(veh)) {
M.car = ugrPyStats(veh, c);
M.hp = M.max = M.car.hp;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof pyHurt !== "function")
return;
var ph = pyHurt;
pyHurt = function (dmg, src) { try {
var M = PY.me;
if (M && M.car && M.car.cut && !(src && src.wall))
dmg = dmg * (1 - M.car.cut);
}
catch (e) { } return ph.call(this, dmg, src); };
})();
(function () {
if (typeof pyHit !== "function")
return;
var hh = pyHit;
pyHit = function (b, dmg, a, how) { try {
if (a && (a.me || a.id === "me") && PY.me && PY.me.car && PY.me.car.wmul > 1 && !(b && b.me))
dmg = dmg * PY.me.car.wmul;
}
catch (e) { } return hh.call(this, b, dmg, a, how); };
})();
(function () {
if (typeof pyBuildCar !== "function")
return;
var bc = pyBuildCar;
pyBuildCar = function (car, opt) {
try {
if (car && opt && opt.me) {
var veh = "py:" + car.k, own = {};
try {
own = pyOwned() || {};
}
catch (e) { }
var paint = ugrLookItem("paint", ugrLook(veh, "paint")), neon = ugrLookItem("neon", ugrLook(veh, "neon"));
if ((own[car.k] || ugrKeeper()) && (paint || neon)) {
var c2 = Object.assign({}, car);
c2.k = car.k + "~" + (paint ? paint[0] : "") + "~" + (neon ? neon[0] : "");
if (paint)
c2.col = paint[2];
if (neon)
c2.neon = neon[0] === "off" ? 0x101010 : neon[2];
var g = bc.call(this, c2, opt);
g.name = "pycar-" + car.k;
return g;
}
}
}
catch (e) { }
return bc.apply(this, arguments);
};
})();
(function () {
if (typeof pyBuildMotorworks !== "function")
return;
var bm = pyBuildMotorworks;
pyBuildMotorworks = function (G) {
var r = bm.apply(this, arguments);
try {
if (typeof wSign === "function") {
var s = wSign(["TUNING BAY", "Engines · turbos · tyres · armour · weapons · paint · neon"], 4.2, 1.2, "#141418", "#FFB060");
s.position.set(105, 3.2, 86.5);
G.add(s);
var post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.6, 0.12), new THREE.MeshLambertMaterial({ color: 0x2A2A30 }));
post.position.set(105, 1.3, 86.45);
G.add(post);
}
PY.desks.push({ x: 105, z: 88, r: 3.4, label: "<b>The tuning bay</b> · <b>press E</b> to upgrade your race cars", fn: function () { ugrOpen(ugrPyShop()); } });
}
catch (e) {
console.warn("[upgrade-garage] tuning bay", e);
}
return r;
};
})();
function ugrPyShop() { return { fams: ["py"], name: "Pyreline Motorworks tuning bay", note: "Engines, turbos, tyres, armour and weapons for your race cars, and paint and neon. What is fitted goes with the car into every race." }; }
UGR_SHOPS.push(function () {
if (typeof cdmgAtWorkshop !== "function")
return null;
if (!(typeof careInCity === "function" && careInCity()))
return null;
var w = cdmgAtWorkshop();
if (!w)
return null;
return { fams: ["city", "fly"], name: w.replace(/^the /, "The "), note: "Engines, turbos, brakes and tyres; paint, neon and headlights. Drive in with your own car, or walk in and choose one." };
});
UGR_SHOPS.push(function () {
if (typeof WLD === "undefined" || WLD.on !== "race" || typeof worldLocal !== "function")
return null;
var L = worldLocal();
if (Math.hypot(L.x - 105, L.z - 88) > 9)
return null;
return ugrPyShop();
});
UGR_APPLY.push(function () {
if (typeof PY !== "undefined" && PY.me && PY.me.car) {
var c = pyCar(PY.me.car.k);
if (c) {
var veh = "py:" + c.k, fr = PY.me.max ? PY.me.hp / PY.me.max : 1;
PY.me.car = ugrAnyWork(veh) ? ugrPyStats(veh, c) : c;
PY.me.max = PY.me.car.hp;
PY.me.hp = Math.round(PY.me.max * fr);
}
}
if (typeof rideG !== "undefined" && rideG)
rideG.userData.ugrPaint = null;
});
"use strict";
var UGR_APTBASE = {};
(function () { try {
for (var k in APT_PLANES)
UGR_APTBASE[k] = Object.assign({}, APT_PLANES[k]);
}
catch (e) { } })();
function ugrAptStats(veh, B) { return __ZC(529, 14, this, arguments, new.target); }
(function () {
if (typeof aptFlyStart !== "function")
return;
var fs = aptFlyStart;
aptFlyStart = function (kind, R) {
var r = fs.apply(this, arguments);
try {
var F = APT.fly;
if (F && F.kind === kind) {
var veh = "apt:" + kind;
F.ugrVeh = veh;
if (ugrAnyWork(veh) && UGR_APTBASE[kind]) {
F.spec = ugrAptStats(veh, UGR_APTBASE[kind]);
}
ugrAptLooks(F, true);
}
}
catch (e) {
console.warn("[upgrade-garage] plane", e);
}
return r;
};
})();
(function () {
if (typeof aptFlyEnd !== "function")
return;
var fe = aptFlyEnd;
aptFlyEnd = function (quiet) { var F = APT.fly; try {
if (F)
ugrAptLooks(F, false);
}
catch (e) { } return fe.apply(this, arguments); };
})();
function ugrAptLooks(F, on) { return __ZC(529, 15, this, arguments, new.target); }
var UGR_SMOKETEX = null;
function ugrSmokeTex() { return __ZC(529, 16, this, arguments, new.target); }
function ugrPuff(parent, x, y, z, col, size, life, drift) { return __ZC(529, 17, this, arguments, new.target); }
function ugrFxTick(dt) {
for (var i = UGR.fx.length - 1; i >= 0; i--) {
var f = UGR.fx[i];
f.t += dt;
var k = f.t / f.life;
if (k >= 1 || !f.s.parent) {
if (f.s.parent)
f.s.parent.remove(f.s);
f.s.material.dispose();
UGR.fx.splice(i, 1);
continue;
}
f.s.position.x += f.dx * dt;
f.s.position.y += f.dy * dt;
f.s.position.z += f.dz * dt;
var sc = f.size * (1 + k * 2.2);
f.s.scale.set(sc, sc, 1);
f.s.material.opacity = 0.7 * (1 - k) * (1 - k * 0.5);
}
}
function ugrAptTick(dt) {
var F = typeof APT !== "undefined" ? APT.fly : null;
if (!F || F.ground || !F.g || !F.g.parent)
return;
var sm = ugrLookItem("smoke", ugrLook(F.ugrVeh || ("apt:" + F.kind), "smoke"));
if (!sm || !sm[2])
return;
UGR.smT = (UGR.smT || 0) - dt;
if (UGR.smT > 0)
return;
UGR.smT = ugrLite() ? 0.12 : 0.06;
var back = F.spec.k === "airliner" ? 20 : 4.5;
ugrPuff(F.g.parent, F.x - Math.sin(F.h) * back, F.y + 0.2, F.z - Math.cos(F.h) * back, sm[2], F.spec.k === "airliner" ? 4 : 1.8, 3.2, { y: 0.3 });
}
UGR_SHOPS.push(function () {
if (typeof aptIn !== "function" || !aptIn() || APT.fly || APT.ride)
return null;
var P = camera.position, x = P.x - APT.base, z = P.z;
if (x > -318 && x < -222 && z > -340 && z < -270)
return { fams: ["apt"], name: "Somnucor Airport hangar", note: "Joe Tanaka and the hangar crew fit the planes you hold a licence for: engine, airframe, control surfaces, wing, paint, landing light and display smoke." };
return null;
});
"use strict";
var UGR_SB_BASE = {};
function ugrSbBase(k) { if (!UGR_SB_BASE[k] && typeof SB_SHIPS !== "undefined" && SB_SHIPS[k]) {
var D = SB_SHIPS[k];
UGR_SB_BASE[k] = { hull: D.hull, shield: D.shield, spd: D.spd, dmg: D.dmg, cool: D.cool };
} return UGR_SB_BASE[k]; }
(function () { try {
for (var k in SB_SHIPS)
ugrSbBase(k);
}
catch (e) { } })();
function ugrHullMaxFor(k) { var b = UGR_SHIP_HULL[k] || (ugrSbBase(k) || { hull: 200 }).hull; return Math.round(b * (1 + ugrAdd("ship:" + k, "hull"))); }
function ugrHullFrac(k) {
try {
if (typeof SB !== "undefined" && SB.k === k && typeof sbHere === "function" && sbHere() && SB.rollG) {
var D = SB_SHIPS[k];
return Math.max(0, Math.min(1, SB.hull / Math.max(1, D.hull)));
}
}
catch (e) { }
var v = UGR.hull["ship:" + k];
return v == null ? 1 : Math.max(0, Math.min(1, +v));
}
function ugrShipApply() {
if (typeof SB_SHIPS === "undefined")
return;
for (var k in SB_SHIPS) {
var B = ugrSbBase(k);
if (!B)
continue;
var D = SB_SHIPS[k], veh = "ship:" + k, cur = typeof SB !== "undefined" && SB.k === k, fh = cur ? SB.hull / Math.max(1, D.hull) : null, fs = cur ? SB.shield / Math.max(1, D.shield) : null;
var holed = ugrHullFrac(k) < 0.3 ? 0.85 : 1;
D.hull = Math.round(B.hull * (1 + ugrAdd(veh, "hull")));
D.shield = Math.round(B.shield * (1 + ugrAdd(veh, "shields")));
D.spd = B.spd * (1 + ugrAdd(veh, "thrust")) * holed;
D.dmg = B.dmg * (1 + ugrAdd(veh, "guns"));
D.cool = B.cool * (1 - ugrAdd(veh, "guns", "quick"));
if (cur && fh != null && isFinite(fh)) {
SB.hull = fh * D.hull;
SB.shield = Math.min(D.shield, fs * D.shield);
}
}
try {
if (typeof SB !== "undefined" && typeof sbSecondGun === "function")
SB.second = sbSecondGun();
}
catch (e) { }
}
UGR_APPLY.push(ugrShipApply);
UGR_APPLY.push(function () { try {
if (typeof SB !== "undefined" && SB.model)
SB.model.userData.ugrPaint = null;
}
catch (e) { } });
function ugrHullKeep(force) { return __ZC(529, 18, this, arguments, new.target); }
(function () { try {
window.addEventListener("pagehide", function () { try {
ugrHullKeep(true);
}
catch (e) { } });
}
catch (e) { } })();
(function () {
if (typeof sbBoard !== "function")
return;
var bo = sbBoard;
sbBoard = function (k, quiet) {
try {
ugrHullKeep(true);
}
catch (e) { }
var r = bo.apply(this, arguments);
try {
var D = SB_SHIPS[SB.k];
if (D) {
SB.hull = ugrHullFrac0(SB.k) * D.hull;
SB.model && (SB.model.userData.ugrPaint = null);
}
}
catch (e) { }
return r;
};
})();
function ugrHullFrac0(k) { var v = UGR.hull["ship:" + k]; return v == null ? 1 : Math.max(0, Math.min(1, +v)); }
(function () {
if (typeof sbRegen !== "function")
return;
sbRegen = function (dt) {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp, veh = "ship:" + SB.k;
if (SB.t - SB.lastHit > 4 && SB.shield < D.shield)
SB.shield = Math.min(D.shield, SB.shield + D.shield * 0.12 * (1 + ugrAdd(veh, "shields", "regen")) * dt);
var dl = ugrLv(veh, "droids");
if (!dl || SB.hull >= D.hull)
return;
var P = UGR_PART.droids, rate = SB.battle ? P.fight[dl] : (SB.t - SB.lastHit > 3 ? P.rate[dl] : 0);
if (rate > 0)
SB.hull = Math.min(D.hull, SB.hull + D.hull * rate * dt);
};
})();
(function () {
if (typeof sbDisabled !== "function")
return;
sbDisabled = function () {
var k = SB.k, D = SB_SHIPS[k] || SB_SHIPS.corp, corp = k === "corp", dl = ugrLv("ship:" + k, "droids");
SB.downs++;
sbEndBattle("lost");
if (typeof spFlash === "function")
spFlash(0x3A4A6A);
var best = "aurora", bd = 1e12;
for (var s in SP.stations) {
if (SP.stations[s].userData.alien)
continue;
var d = SP.stations[s].position.distanceTo(SP.pos);
if (d < bd) {
bd = d;
best = s;
}
}
SB.hull = corp ? D.hull : D.hull * 0.05;
SB.shield = D.shield;
try {
ugrHullKeep(true);
}
catch (e) { }
setTimeout(function () {
if (!sbHere())
return;
var st = SP.stations[best];
SP.pos.copy(st.position).add(new THREE.Vector3(0, 10, 120));
SP.vel.set(0, 0, 0);
SP.auto = null;
sbSay("<b>Your hull gave out.</b> The escape pod carried you to " + sbEsc(st.userData.name) + (corp ? ", and the Corp's dock crew have patched their cutter for nothing." :
", and the Corp's tug brought " + sbEsc(D.short) + " in behind you, holed: <b>5% of her hull left</b>. " + (dl ? "Your repair droids are at work on her, or have the shipyard here mend her now (🛠️ <b>Shipyard</b>)." : "She stays that way until a shipyard mends her: the 🛠️ <b>Shipyard</b> button, here at the dock.")) + " The raiders went on their way.");
}, 400);
};
})();
(function () {
if (typeof gxDock !== "function")
return;
var gd = gxDock;
gxDock = function (b) {
var h0 = SB.hull;
var r = gd.apply(this, arguments);
try {
var D = SB_SHIPS[SB.k];
if (SB.k !== "corp")
SB.hull = Math.min(D.hull, h0);
ugrHullKeep(true);
var c = WLD && WLD.card;
if (c && c.style.display !== "none") {
c.querySelectorAll("li").forEach(function (li) { if (/mended here for nothing/.test(li.textContent))
li.textContent = "The shipyards here fit, paint and mend every ship. Hull damage stays until a shipyard mends it (the Corp's cutter is mended for nothing)."; });
var btn = document.createElement("div");
btn.innerHTML = worldBtn("ugr", "🛠️ Shipyard: mend and upgrade", "Hull " + Math.round(ugrHullFrac(SB.k) * 100) + "% · thrusters, plating, shields, guns, missiles, droids, paint");
var el = btn.firstChild;
el.style.cursor = "pointer";
el.onclick = function (ev) { ev.stopPropagation(); ugrOpen(ugrShipShop(b.name)); };
c.appendChild(el);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof sfBuild !== "function")
return;
var sf = sfBuild;
sfBuild = function (k) { var h0 = typeof SB !== "undefined" ? SB.hull : null, r = sf.apply(this, arguments); try {
if (h0 != null && SB.k !== "corp")
SB.hull = Math.min(SB.hull, h0);
}
catch (e) { } return r; };
})();
(function () {
if (typeof sbSecondGun !== "function")
return;
var sg = sbSecondGun;
sbSecondGun = function () {
var r = sg.apply(this, arguments), veh = "ship:" + SB.k, l = ugrLv(veh, "rack"), P = UGR_PART.rack;
if (!l)
return r;
if (r) {
r.dmg = r.dmg * (1 + P.add[l]);
r.name = r.name + " (rack-fed)";
return r;
}
return { k: "rack", name: l >= 4 ? "Torpedo bay" : P.n[l] + "-tube missile rack", shot: "missile", dmg: P.dmg[l], cool: Math.max(1.2, 2.4 - 0.3 * l), n: P.n[l] };
};
})();
(function () {
if (typeof spTick !== "function")
return;
var st = spTick;
spTick = function (dt) {
var r = st.apply(this, arguments);
try {
ugrSpaceTick(dt);
}
catch (e) {
if (!UGR.sw) {
UGR.sw = 1;
console.warn("[upgrade-garage] space", e);
}
}
return r;
};
})();
function ugrSpaceTick(dt) { return __ZC(529, 19, this, arguments, new.target); }
function ugrShipLooks() { return __ZC(529, 20, this, arguments, new.target); }
(function () {
if (typeof sbHudTick !== "function")
return;
var ht = sbHudTick;
sbHudTick = function (dt) {
var r = ht.apply(this, arguments);
try {
if (!SB.hud || SB.hud.style.display === "none")
return r;
var D = SB_SHIPS[SB.k], fr = SB.hull / Math.max(1, D.hull), dl = ugrLv("ship:" + SB.k, "droids"), el = SB.hud.querySelector("#ugr-hull");
var txt = fr >= 0.995 ? "" : (dl ? "🤖 Droids mending the hull" : SB.k === "corp" ? "🛠️ Any dock mends the Corp's cutter" : "🛠️ Hull damage stays until a shipyard mends it") + (fr < 0.3 ? " · holed: slower" : "");
if (!txt) {
if (el)
el.remove();
return r;
}
if (!el) {
el = document.createElement("div");
el.id = "ugr-hull";
el.style.cssText = "font:11px var(--sans,system-ui);margin-top:3px;color:" + (fr < 0.3 ? "#FF9A6A" : "#F0D898");
var t = SB.hud.querySelector(".b");
if (t)
SB.hud.insertBefore(el, t);
else
SB.hud.appendChild(el);
}
if (el.textContent !== txt)
el.textContent = txt;
}
catch (e) { }
return r;
};
})();
function ugrRepairTap(k, price) { return __ZC(529, 21, this, arguments, new.target); }
function ugrShipShop(name) { return { fams: ["ship"], name: name ? name + " shipyard" : "Shipyard", note: "Thrusters, afterburners, hull plating, shields, guns, missile racks and repair droids; paint and running lights; and every breach in the hull mended." }; }
UGR_SHOPS.push(function () {
if (typeof WLD !== "undefined" && WLD.on === "station")
return ugrShipShop("The station's");
if (typeof SB === "undefined" || typeof sbHere !== "function" || !sbHere() || SB.battle)
return null;
try {
if (typeof frIn === "function" && frIn() && FR.near && FR.near.b && FR.near.b.dock)
return ugrShipShop(FR.near.b.name);
}
catch (e) { }
for (var s in SP.stations) {
var st = SP.stations[s];
if (st.userData.alien)
continue;
if (SP.pos.distanceTo(st.position) < 400)
return ugrShipShop(st.userData.name);
}
return null;
});
"use strict";
function ugrPill(shop) {
var b = UGR.pill;
if (!b) {
if (!document.body)
return;
b = document.createElement("div");
b.id = "ugr-pill";
b.setAttribute("role", "button");
b.tabIndex = 0;
b.style.cssText = "position:fixed;left:12px;top:38%;z-index:60;padding:8px 12px;border-radius:18px;border:1px solid rgba(255,210,122,.75);background:rgba(26,20,10,.82);color:#FFE7B0;font:600 13px var(--sans,system-ui);cursor:pointer;opacity:0;transition:opacity .5s ease;pointer-events:none;box-shadow:0 2px 10px rgba(0,0,0,.4)";
b.onclick = function (ev) { ev.stopPropagation(); var s = ugrShopHere(); if (s)
ugrOpen(s); };
document.body.appendChild(b);
UGR.pill = b;
}
var on = !!shop && !(typeof VRM !== "undefined" && VRM.xr);
if (on) {
var t = (shop.fams[0] === "ship" ? "🛠️ Shipyard" : shop.fams[0] === "apt" ? "🔧 Hangar workshop" : "🔧 Garage") + (ugrTouch() ? "" : ": upgrades");
if (b.textContent !== t)
b.textContent = t;
b.title = shop.name;
}
b.style.opacity = on ? "1" : "0";
b.style.pointerEvents = on ? "auto" : "none";
b.style.visibility = on ? "visible" : "hidden";
}
try {
if (typeof VO_KEEP_ALL !== "undefined")
VO_KEEP_ALL["ugr-pill"] = 1;
}
catch (e) { }
(function () {
if (typeof requestAnimationFrame !== "function")
return;
var last = 0, slow = 0;
function frame(now) {
requestAnimationFrame(frame);
var dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
last = now;
try {
ugrFxTick(dt);
ugrAptTick(dt);
}
catch (e) { }
slow -= dt;
if (slow > 0)
return;
slow = 0.4;
try {
ugrCityLooksTick();
}
catch (e) { }
try {
ugrPill(ugrShopHere());
}
catch (e) { }
try {
if (!UGR.loaded && !UGR.missing && ugrSigned() && Date.now() - (UGR.tryAt || 0) > 60000) {
UGR.tryAt = Date.now();
ugrLoad(true);
}
}
catch (e) { }
}
requestAnimationFrame(frame);
})();
try {
ugrApplyAll();
}
catch (e) { }
