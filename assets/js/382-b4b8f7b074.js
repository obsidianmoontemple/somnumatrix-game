/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var PTX_KEY = "sim", PTX_NAME = "Simulation Studio";
var PTX = { base: -2300000, G: null, built: false, spec: null, t: 0, lite: false, solids: [], floors: [], spots: [], people: [], fx: [], exits: [], lifts: [],
hazards: [], forks: [], drill: null, pt: 0, vt: 0, mats: {}, geos: {}, keeper: null, aiBusy: false, aiSpec: null, panel: null, rec: null, arrive: { x: 0, z: 40 } };
var PTX_NUM = { a: 1, an: 1, one: 1, single: 1, two: 2, double: 2, twin: 2, three: 3, triple: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
eleven: 11, twelve: 12, fifteen: 15, twenty: 20, "a couple of": 2, couple: 2, "a few": 3, few: 3, several: 4, some: 3, many: 6, lots: 8, dozen: 12, dozens: 24 };
var PTX_TYPES = [
["site", ["construction site", "building site", "construction zone", "work site", "worksite"], "Construction site"],
["datacentre", ["data centre", "data center", "datacenter", "server farm", "server hall"], "Data centre"],
["hospital", ["hospital", "clinic", "ward", "medical centre", "medical center", "surgery", "care home", "nursing home", "emergency room"], "Hospital"],
["school", ["school", "classroom", "college", "university", "campus", "academy"], "School"],
["hotel", ["hotel", "motel", "hostel", "inn", "apartment block", "apartments", "flats"], "Hotel"],
["lab", ["laboratory", "lab ", "labs", "research facility", "clean room", "cleanroom"], "Laboratory"],
["restaurant", ["restaurant", "commercial kitchen", "kitchen line", "cafe", "café", "canteen", "diner", "fast food", "bakery"], "Restaurant"],
["retail", ["supermarket", "shop floor", "retail", "store", "shop", "grocery", "pharmacy", "showroom", "mall unit"], "Retail store"],
["factory", ["factory", "plant", "manufacturing", "production line", "assembly line", "workshop", "mill", "foundry", "processing"], "Factory"],
["warehouse", ["warehouse", "distribution centre", "distribution center", "fulfilment", "fulfillment", "depot", "logistics", "storage facility", "stockroom", "loading dock"], "Warehouse"],
["house", ["house", "home", "bungalow", "cottage", "villa", "townhouse", "flat ", "apartment"], "House"],
["office", ["office", "floor plan", "floorplan", "headquarters", "hq", "call centre", "call center", "bank branch", "coworking", "workplace", "corporate"], "Office"]
];
var PTX_THINGS = [
["forklift", ["forklift", "forklifts", "fork lift", "fork lifts", "fork-lift", "reach truck", "reach trucks", "lift truck"]],
["palletjack", ["pallet jack", "pallet jacks", "pallet truck", "pallet trucks"]],
["rack", ["rack", "racks", "racking", "pallet racking", "shelving", "shelves", "aisles", "aisle"]],
["conveyor", ["conveyor", "conveyors", "conveyor belt", "conveyor belts"]],
["truck", ["truck", "trucks", "lorry", "lorries", "hgv", "trailer", "trailers", "delivery van", "vans"]],
["dock", ["loading dock", "loading docks", "loading bay", "loading bays", "dock door", "dock doors", "goods in"]],
["desk", ["desk", "desks", "workstation", "workstations", "cubicle", "cubicles", "hot desk", "hot desks"]],
["meeting", ["meeting room", "meeting rooms", "conference room", "conference rooms", "boardroom", "boardrooms"]],
["kitchen", ["kitchen", "break room", "breakroom", "staff room", "canteen", "tea point", "kitchenette"]],
["toilets", ["toilet", "toilets", "restroom", "restrooms", "washroom", "washrooms", "bathroom", "bathrooms"]],
["reception", ["reception", "lobby", "front desk", "foyer"]],
["serverroom", ["server room", "comms room"]],
["lift", ["lift", "lifts", "elevator", "elevators"]],
["exit", ["fire exit", "fire exits", "emergency exit", "emergency exits", "escape route", "escape routes"]],
["extinguisher", ["fire extinguisher", "fire extinguishers", "extinguisher", "extinguishers"]],
["firstaid", ["first aid kit", "first aid kits", "first aid station", "aed", "defibrillator", "defibrillators"]],
["machine", ["machine", "machines", "machinery", "cnc", "lathe", "lathes", "press", "presses", "robot arm", "robot arms"]],
["bed", ["bed", "beds", "patient bed", "patient beds"]],
["server", ["server rack", "server racks", "server cabinet", "server cabinets"]],
["checkout", ["checkout", "checkouts", "till", "tills", "cash register", "cash registers"]],
["stove", ["stove", "stoves", "oven", "ovens", "fryer", "fryers", "grill", "grills", "hob", "hobs"]],
["bench", ["bench", "benches", "lab bench", "lab benches", "workbench", "workbenches"]],
["scaffold", ["scaffold", "scaffolding"]],
["crane", ["crane", "cranes", "tower crane"]],
["mezzanine", ["mezzanine"]],
["people", ["people", "person", "workers", "worker", "staff", "employees", "employee", "colleagues", "colleague", "customers", "customer", "patients", "students", "pupils", "guests", "visitors", "operatives", "crew"]],
["bedroom", ["bedroom", "bedrooms"]],
["classroom", ["classroom", "classrooms"]],
["parking", ["car park", "parking", "parking lot"]]
];
var PTX_DRILL_WORDS = {
fire: ["fire", "evacuation", "evacuate", "evacuating", "fire drill", "fire exit drill", "alarm", "smoke", "fire alarm", "emergency exit drill", "escape"],
forklift: ["forklift safety", "pedestrian", "near miss", "near-miss", "traffic management", "walkway", "walkways", "vehicle safety", "reversing"],
hazard: ["hazard", "hazards", "inspection", "safety walk", "audit", "risk assessment", "spot the", "housekeeping", "trip", "trips", "slip", "slips"],
firstaid: ["first aid", "injury", "injured", "casualty", "collapsed", "collapse", "unconscious", "cpr", "accident", "medical emergency"],
spill: ["spill", "spills", "leak", "leaking", "spillage"]
};
var PTX_SKINS = [["glass", ["glass", "glazed", "curtain wall", "modern"]], ["brick", ["brick", "red brick", "victorian"]], ["timber", ["timber", "wooden", "wood clad", "log"]],
["metal", ["metal clad", "steel clad", "cladding", "corrugated", "steel frame"]], ["concrete", ["concrete", "brutalist"]], ["plaster", ["rendered", "stucco", "white render", "plaster"]]];
function ptxHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function ptxLow(t) { return " " + String(t || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9.,'\- ]/g, " ").replace(/-/g, " ").replace(/\s+/g, " ") + " "; }
function ptxCountBefore(low, i) {
var pre = low.slice(Math.max(0, i - 24), i).trim().split(" "), w = pre[pre.length - 1] || "", w2 = (pre[pre.length - 2] || "") + " " + w;
if (/^\d+$/.test(w))
return Math.min(200, +w);
if (PTX_NUM[w2] !== undefined)
return PTX_NUM[w2];
if (PTX_NUM[w] !== undefined)
return PTX_NUM[w];
return 0;
}
function ptxFind(low, words) {
var best = null;
words.forEach(function (w) { var i = low.indexOf(" " + w.trim() + " "); if (i < 0)
i = low.indexOf(" " + w.trim() + ","); if (i < 0)
i = low.indexOf(" " + w.trim() + "."); if (i >= 0 && (best === null || i < best.at))
best = { at: i + 1, w: w }; });
return best;
}
function ptxRead(text) { return __ZC(382, 0, this, arguments, new.target); }
function ptxTitle(S) {
var b = (S.storeys > 1 ? S.storeys + "-storey " : "") + S.name.toLowerCase();
var d = S.drills.length ? " · " + S.drills.map(function (k) { return PTX_DRILLS[k] ? PTX_DRILLS[k].n : k; }).join(", ") : "";
return b.charAt(0).toUpperCase() + b.slice(1) + d;
}
function ptxClean(o, text) { return __ZC(382, 1, this, arguments, new.target); }
function ptxN(S, k, def) { var n = S.items[k]; if (n === undefined)
return def; return n < 0 ? def : n; }
function ptxMat(col, tex, o) { return __ZC(382, 2, this, arguments, new.target); }
function ptxGlass() { return ptxMat(0x6A8CA0, null, { op: 0.3, ds: 1 }); }
function ptxGlow(col) { return ptxMat(col, null, { e: col, ei: 1 }); }
function ptxBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = PTX.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
PTX.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || PTX.G).add(m);
return m;
}
function ptxCyl(r, h, mat, x, y, z, parent, seg, r2) {
var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r2 === undefined ? r : r2, h, seg || 12), mat);
m.position.set(x, y, z);
(parent || PTX.G).add(m);
return m;
}
function ptxSolid(x, z, hw, hd, b, h) { var S = { x: x, z: z, hw: hw, hd: hd, b: b || 0, h: h || 3 }; PTX.solids.push(S); return S; }
function ptxFloor(x0, z0, x1, z1, y) { PTX.floors.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: Math.abs(x1 - x0) / 2, hd: Math.abs(z1 - z0) / 2, y: y }); }
function ptxSpot(x, z, y, r, name, verb, fn) { var S = { x: x, z: z, y: y, r: r, name: name, verb: verb, fn: fn }; PTX.spots.push(S); return S; }
function ptxWall(dir, a, b, c, y, h, t, mat, opens, o) { return __ZC(382, 3, this, arguments, new.target); }
function ptxDoorway(dir, p, c, y, w, h, t, O) { return __ZC(382, 4, this, arguments, new.target); }
function ptxSlab(x0, z0, x1, z1, y, th, mat, hole, under) { return __ZC(382, 5, this, arguments, new.target); }
function ptxCeilLights(x0, z0, x1, z1, y, step) {
var m = ptxMat(0xF4F6F8, null, { e: 0xF0F2F4, ei: PTX.spec && PTX.spec.night ? 0.12 : 0.5 }), st = step || (PTX.lite ? 6 : 4);
for (var x = x0 + st / 2; x < x1; x += st)
for (var z = z0 + st / 2; z < z1; z += st)
ptxBox(1.2, 0.04, 0.6, m, x, y - 0.03, z);
}
function ptxSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || PTX.G).add(s);
s.userData.keep = 1;
return s;
}
function ptxExitSign(x, y, z, ry) { return ptxSign(["⇦ EXIT ⇨", "fire exit · keep clear"], 1.1, 0.4, "#0E8A3E", "#FFFFFF", x, y, z, ry); }
function ptxStairs(x0, z0, y, H, top) { return __ZC(382, 6, this, arguments, new.target); }
function ptxStairWalls(x0, z0, y, H, mat, label) { return __ZC(382, 7, this, arguments, new.target); }
var PTX_CARD = [0xB8946A, 0xA8845A, 0xC4A276, 0x9A7A52];
function ptxPallet(x, y, z, ry, load, g) { return __ZC(382, 8, this, arguments, new.target); }
function ptxRack(x, z0, len, h, lv) { return __ZC(382, 9, this, arguments, new.target); }
function ptxGondola(x, z0, len) { return __ZC(382, 10, this, arguments, new.target); }
function ptxDesk(x, y, z, ry) { return __ZC(382, 11, this, arguments, new.target); }
function ptxTable(x, y, z, w, d, mat) {
var m = mat || ptxMat(0x6A4A32, "wood"), leg = ptxMat(0x404448, "metal");
ptxBox(w, 0.05, d, m, x, y + 0.74, z);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { ptxBox(0.06, 0.72, 0.06, leg, x + p[0] * (w / 2 - 0.1), y + 0.36, z + p[1] * (d / 2 - 0.1)); });
ptxSolid(x, z, w / 2, d / 2, y, 0.8);
}
function ptxChair(x, y, z, ry) { return __ZC(382, 12, this, arguments, new.target); }
function ptxPlant(x, y, z) {
var pot = ptxMat(0x3A3A3E, null), lf = ptxMat(0x3A7A3A, null);
ptxCyl(0.25, 0.5, pot, x, y + 0.25, z, null, 10, 0.2);
for (var i = 0; i < 5; i++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), lf);
s.position.set(x + Math.cos(i * 1.3) * 0.15, y + 0.75 + i * 0.12, z + Math.sin(i * 1.3) * 0.15);
s.scale.y = 1.4;
PTX.G.add(s);
}
}
function ptxExtinguisher(x, y, z, ry, missing) { return __ZC(382, 13, this, arguments, new.target); }
function ptxCallPoint(x, y, z, ry) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; PTX.G.add(g); ptxBox(0.12, 0.12, 0.05, ptxMat(0xD81A1A, null), 0, 1.4, 0.03, g); ptxBox(0.08, 0.06, 0.01, ptxMat(0xF4F4F4, null), 0, 1.42, 0.06, g); return g; }
function ptxFirstAid(x, y, z, ry) { return __ZC(382, 14, this, arguments, new.target); }
function ptxForklift(x, z, ry) { return __ZC(382, 15, this, arguments, new.target); }
function ptxLorry(x, z, ry) { return __ZC(382, 16, this, arguments, new.target); }
function ptxCar(x, z, ry, col) { return __ZC(382, 17, this, arguments, new.target); }
function ptxMachine(x, z, k) { return __ZC(382, 18, this, arguments, new.target); }
function ptxConveyor(x0, x1, z) { return __ZC(382, 19, this, arguments, new.target); }
function ptxServer(x, z, len) { return __ZC(382, 20, this, arguments, new.target); }
function ptxBed(x, y, z, ry, hospital) { return __ZC(382, 21, this, arguments, new.target); }
function ptxCounter(x, y, z, w, d, col) { ptxBox(w, 0.9, d, ptxMat(col || 0xC8CCD0, "metal"), x, y + 0.45, z); ptxBox(w + 0.04, 0.04, d + 0.04, ptxMat(0xE0E4E8, "metal"), x, y + 0.92, z); ptxSolid(x, z, w / 2, d / 2, y, 1.0); }
function ptxStove(x, y, z) {
ptxCounter(x, y, z, 1.0, 0.8, 0x8A8E94);
for (var i = 0; i < 4; i++)
ptxCyl(0.13, 0.02, ptxMat(0x1A1A1A, null), x - 0.22 + (i % 2) * 0.44, y + 0.95, z - 0.18 + (i >> 1) * 0.36, null, 14);
ptxBox(1.0, 0.5, 0.6, ptxMat(0xB8BCC0, "metal"), x, y + 2.2, z - 0.1);
}
function ptxBenchLab(x, y, z, w) {
ptxCounter(x, y, z, w, 0.9, 0xE8ECEE);
ptxBox(w, 0.6, 0.25, ptxMat(0xE0E4E8, "metal"), x, y + 1.3, z - 0.3);
for (var i = 0; i < Math.round(w / 0.8); i++)
ptxCyl(0.05, 0.18, ptxMat(0x9FC4D8, null, { op: 0.5 }), x - w / 2 + 0.4 + i * 0.8, y + 1.03, z + 0.1, null, 8);
}
function ptxToiletRow(x0, z, n, y, ry) {
var cub = ptxMat(0x8AA8B8, null), wc = ptxMat(0xF4F4F4, null);
for (var i = 0; i < n; i++) {
var x = x0 + i * 1.2;
ptxBox(0.04, 2.0, 1.5, cub, x - 0.6, y + 1.0, z);
ptxBox(0.4, 0.4, 0.6, wc, x, y + 0.2, z - 0.4);
ptxBox(0.36, 0.35, 0.15, wc, x, y + 0.6, z - 0.68);
}
ptxBox(0.04, 2.0, 1.5, cub, x0 + n * 1.2 - 0.6, y + 1.0, z);
}
function ptxWhiteboard(x, y, z, ry, w) { ptxSign(["", ""], w || 2.4, 1.2, "#F4F6F8", "#C0C4C8", x, y + 1.5, z, ry); }
function ptxAssembly(x, z) { return __ZC(382, 22, this, arguments, new.target); }
function ptxRectMinus(rects, h) { return __ZC(382, 23, this, arguments, new.target); }
function ptxSlabHoles(x0, z0, x1, z1, y, th, mat, holes) {
var rects = [[x0, z0, x1, z1]];
(holes || []).forEach(function (h) { rects = ptxRectMinus(rects, h); });
rects.forEach(function (r) {
var w = r[2] - r[0], d = r[3] - r[1];
if (w < 0.05 || d < 0.05)
return;
ptxBox(w, th, d, mat, (r[0] + r[2]) / 2, y - th / 2, (r[1] + r[3]) / 2);
ptxFloor(r[0], r[1], r[2], r[3], y);
});
}
var PTX_FLOORMAT = { warehouse: [0xA4A49E, "concrete"], factory: [0x8E948E, "concrete"], datacentre: [0xC8CCD0, "floortile"], retail: [0xE4E0D8, "floortile"],
office: [0x5E6672, "plaster"], hospital: [0xC8D0C8, "floortile"], school: [0xB8B0A0, "floortile"], hotel: [0x7A4A3E, "plaster"], lab: [0xD8DCD8, "floortile"],
restaurant: [0xA87A5A, "tile"], house: [0xA88660, "wood"], site: [0x8A8478, "concrete"] };
var PTX_SKINMAT = { brick: [0xA05A40, "brick"], concrete: [0x9A968E, "concrete"], metal: [0x5E6E7A, "metalroof"], glass: [0x3A4048, "metal"], timber: [0x9A6A42, "wood"], plaster: [0xC8C2B4, "plaster"] };
var PTX_JOB = { warehouse: "warehouse operative", factory: "machine operator", retail: "shop assistant", datacentre: "engineer", office: "office worker", hospital: "nurse",
school: "teacher", hotel: "receptionist", lab: "lab technician", restaurant: "chef", house: "resident", site: "builder" };
function ptxBuildAll(G) { return __ZC(382, 24, this, arguments, new.target); }
function ptxOutside(S) { return __ZC(382, 25, this, arguments, new.target); }
function ptxShell(S, storeys, H, doors, o) { return __ZC(382, 26, this, arguments, new.target); }
function ptxExitPoint(D, w, d) { return __ZC(382, 27, this, arguments, new.target); }
function ptxBlock(B) { return __ZC(382, 28, this, arguments, new.target); }
function ptxRoom(R, xa, xb, za, zb, y, WH, north, inner, k, B) { return __ZC(382, 29, this, arguments, new.target); }
function ptxLiftCar(x, cz1, y, WH, k, B) { return __ZC(382, 30, this, arguments, new.target); }
function ptxFloorName(k) { return k === 0 ? "ground" : ["first", "second", "third", "fourth", "fifth"][k - 1] || String(k); }
function ptxLiftCard(L) { return __ZC(382, 31, this, arguments, new.target); }
function ptxRoomsFor(S) { return __ZC(382, 32, this, arguments, new.target); }
function ptxBlockBuilding(S) { return __ZC(382, 33, this, arguments, new.target); }
function ptxHall(S) { return __ZC(382, 34, this, arguments, new.target); }
function ptxSite(S) { return __ZC(382, 35, this, arguments, new.target); }
function ptxFurnish(rm) { return __ZC(382, 36, this, arguments, new.target); }
function ptxSafetyKit(S) { return __ZC(382, 37, this, arguments, new.target); }
function ptxPeople(S) { return __ZC(382, 38, this, arguments, new.target); }
function ptxBoards(S) { return __ZC(382, 39, this, arguments, new.target); }
var PTX_DRILLS = {
fire: { n: "Fire evacuation", i: "🔥", sub: "Find the call point, raise the alarm, get everyone out by the safest way" },
forklift: { n: "Forklift safety", i: "🚜", sub: "Fetch the delivery note from goods-in and bring it to the shift office" },
hazard: { n: "Hazard hunt", i: "⚠️", sub: "Walk the building and report everything that is unsafe" },
firstaid: { n: "First aid response", i: "⛑️", sub: "A colleague has collapsed: find them and help" },
spill: { n: "Spill response", i: "🧽", sub: "Something has spilled: make it safe and clear it up" }
};
function ptxDrillsHere() { return __ZC(382, 40, this, arguments, new.target); }
var PTXA = { ctx: null };
function ptxCtx() { return __ZC(382, 41, this, arguments, new.target); }
function ptxTone(f, dur, vol, type, at) { return __ZC(382, 42, this, arguments, new.target); }
function ptxAlarmTick(dt) {
var D = PTX.drill;
if (!D || !D.alarm)
return;
D.at = (D.at || 0) - dt;
if (D.at > 0)
return;
D.at = 1.0;
var P = camera.position, inside = Math.abs(P.x - PTX.base) < PTX.spec.w / 2 + 2 && Math.abs(P.z) < PTX.spec.d / 2 + 2, v = inside ? 0.05 : 0.018;
ptxTone(880, 0.48, v, "square", 0);
ptxTone(660, 0.48, v, "square", 0.5);
}
function ptxHorn() { ptxTone(392, 0.35, 0.06, "sawtooth"); ptxTone(392, 0.35, 0.06, "sawtooth", 0.45); }
function ptxDyn() { if (!PTX.dyn) {
PTX.dyn = new THREE.Group();
PTX.dyn.userData.keep = 1;
PTX.G.add(PTX.dyn);
} return PTX.dyn; }
function ptxDynClear() { if (PTX.dyn && PTX.dyn.parent) {
PTX.dyn.parent.remove(PTX.dyn);
} PTX.dyn = null; PTX.spots = PTX.spots.filter(function (s) { return !s.drill; }); }
function ptxDrillSpot(x, z, y, r, name, verb, fn) { var s = ptxSpot(x, z, y, r, name, verb, fn); s.drill = 1; return s; }
function ptxSmokeSprite(x, y, z, s, op) {
var m = new THREE.SpriteMaterial({ map: (typeof softGlow === "function" ? softGlow() : null), color: 0x5A5A5E, transparent: true, opacity: op || 0.55, depthWrite: false, fog: true });
var sp = new THREE.Sprite(m);
sp.scale.set(s, s, 1);
sp.position.set(x, y, z);
ptxDyn().add(sp);
return sp;
}
function ptxFarArea(p, minD) {
var list = PTX.open.filter(function (o) { return (o.x1 - o.x0) > 1.5 && (o.z1 - o.z0) > 1; }), best = null, bd = -1;
list.forEach(function (o, i) { var cx = (o.x0 + o.x1) / 2, cz = (o.z0 + o.z1) / 2, dd = Math.hypot(cx - p.x, cz - p.z) + (PTX.rnd() * 8); if (dd > bd && (!minD || dd > minD)) {
bd = dd;
best = o;
} });
return best || list[0];
}
function ptxAreaPoint(o) { return { x: o.x0 + (o.x1 - o.x0) * (0.3 + PTX.rnd() * 0.4), z: o.z0 + (o.z1 - o.z0) * (0.3 + PTX.rnd() * 0.4), y: o.y, o: o }; }
function ptxDrillStart(k) { return __ZC(382, 43, this, arguments, new.target); }
function ptxDrillEnd(quiet) { return __ZC(382, 44, this, arguments, new.target); }
function ptxDrillFinish(passed, rows, lines) { return __ZC(382, 45, this, arguments, new.target); }
function ptxFireStart(D) { return __ZC(382, 46, this, arguments, new.target); }
function ptxCallPoint_E(cp) { return __ZC(382, 47, this, arguments, new.target); }
function ptxFireReport() { return __ZC(382, 48, this, arguments, new.target); }
function ptxFireTick(dt) { return __ZC(382, 49, this, arguments, new.target); }
function ptxEvacuate() {
PTX.people.forEach(function (P, i) { P.state = "evac"; P.path = ptxRouteOut(P); P.pi = 0; P.sp = 1.35 + ((i * 37) % 10) / 25; });
}
function ptxRouteOut(P) { return __ZC(382, 50, this, arguments, new.target); }
function ptxPeopleTick(dt) { return __ZC(382, 51, this, arguments, new.target); }
function ptxForksTick(dt) { return __ZC(382, 52, this, arguments, new.target); }
function ptxForkStart(D) { return __ZC(382, 53, this, arguments, new.target); }
var PTX_HAZ = [
{ k: "spill", n: "Spill on the floor", why: "Someone could slip. Signs out, then clean it up." },
{ k: "cable", n: "Trailing cable across a walkway", why: "A trip hazard. Route cables away or cover them." },
{ k: "exit", n: "Fire exit blocked by boxes", why: "In a fire, every second counts. Exits stay clear at all times." },
{ k: "stack", n: "Boxes stacked too high", why: "They can topple onto someone. Stack low and stable." },
{ k: "wedge", n: "Fire door wedged open", why: "Fire doors hold back smoke only when they are shut." },
{ k: "ext", n: "Fire extinguisher missing from its bracket", why: "It must be there when it is needed. Report it." },
{ k: "pallet", n: "Broken pallet left in the way", why: "Trips and splinters. Take it to the scrap area." },
{ k: "drawer", n: "Drawer left open at knee height", why: "Easy to walk into. Close drawers after use." }
];
function ptxHazardStart(D) { return __ZC(382, 54, this, arguments, new.target); }
function ptxHazardDone() {
var D = PTX.drill;
if (!D || D.k !== "hazard")
return;
var rows = D.list.map(function (r) { return [r.found ? "✅ found" : "❌ missed", r.H.n]; });
ptxDrillFinish(D.found >= Math.ceil(D.list.length * 0.8), rows, D.list.filter(function (r) { return !r.found; }).map(function (r) { return r.H.n + ": " + r.H.why; }));
}
var PTX_AID = ["Check it is safe to go to them", "Check for a response: speak to them, tap their shoulders", "Call the emergency services (or get someone to)", "Open the airway and check for normal breathing", "Send for the AED and the first aid kit", "Stay with them until help arrives"];
function ptxAidStart(D) { return __ZC(382, 55, this, arguments, new.target); }
function ptxAedTake() { return __ZC(382, 56, this, arguments, new.target); }
function ptxAidCard() { return __ZC(382, 57, this, arguments, new.target); }
function ptxAidDone() { return __ZC(382, 58, this, arguments, new.target); }
var PTX_SPILL = ["Put wet floor signs round it", "Tell your supervisor", "Fetch the spill kit", "Clean it up with the spill kit"];
function ptxSpillStart(D) { return __ZC(382, 59, this, arguments, new.target); }
function ptxSpillKitTake() { var D = PTX.drill; if (!D || D.k !== "spill") {
setStatus("🧽 The spill kit: absorbent pads, gloves and bags for clearing up a spill safely.");
return;
} D.kit = true; setStatus("🧽 <b>You have the spill kit.</b> Take it back to the spill."); }
function ptxSpillCard() { return __ZC(382, 60, this, arguments, new.target); }
function ptxDrillTick(dt) {
var D = PTX.drill;
if (!D || !D.on)
return;
D.t += dt;
if (D.k === "fire")
ptxFireTick(dt);
ptxAlarmTick(dt);
}
var PTX_RECKEY = "somnu.sim.records";
function ptxRecords() { try {
var a = JSON.parse(localStorage.getItem(PTX_RECKEY) || "[]");
return Array.isArray(a) ? a : [];
}
catch (e) {
return [];
} }
function ptxRecordAdd(r) { try {
var a = ptxRecords();
a.unshift(r);
localStorage.setItem(PTX_RECKEY, JSON.stringify(a.slice(0, 60)));
}
catch (e) { } }
function ptxGround(x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, best = null;
for (var i = 0; i < PTX.floors.length; i++) {
var F = PTX.floors[i];
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= f + 0.75 && (best === null || F.y > best))
best = F.y;
}
return best === null ? 0 : best;
}
function ptxBlocked(x, z, feet) {
var S = PTX.spec;
if (!S)
return false;
if (Math.abs(x) > S.w / 2 + 75 || z < -S.d / 2 - 55 || z > S.d / 2 + 62)
return true;
return typeof worldSolidAt === "function" && worldSolidAt(PTX.solids, x, z, feet);
}
function ptxStorey() {
var feet = camera.position.y - 1.72, H = PTX.storeyH || 3.4;
if (PTX.pod && Math.abs(worldLocal().x - (PTX.pod.x0 + PTX.pod.x1) / 2) < (PTX.pod.x1 - PTX.pod.x0) / 2 && feet > 2)
return 1;
return Math.max(0, Math.round(feet / H));
}
function ptxEnv() { return __ZC(382, 61, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(PTX_KEY, {
base: PTX.base, far: 900, ownSky: true, tone: 560,
env: function () { return ptxEnv(); },
build: function (G) { ptxBuildAll(G); },
enter: function (opt) { return __ZC(382, 62, this, arguments, new.target); },
leave: function () { ptxDrillEnd(true); worldCard(null); },
ground: function (x, z, feet) { return ptxGround(x, z, feet); },
block: function (x, z, feet) { return ptxBlocked(x, z, feet); },
tick: function (dt) { ptxTick(dt); },
back: function () { ptxHome(); }
});
function ptxHome() { ptxDrillEnd(true); worldHome("<b>Back from the " + PTX_NAME + ".</b> Your scenarios are saved in the studio (☰ Menu → 🏗️ Simulation)."); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(PTX_KEY) < 0)
WLG.keys.push(PTX_KEY);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === PTX_KEY; })) {
DGR_WORLDS.push([PTX_KEY, "The Simulation Studio's training sites", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[PTX_KEY] = { id: PTX_KEY, name: "The Simulation Studio", def: 0, group: "hidden" };
}
function ptxForget() { PTX.built = false; PTX.G = null; PTX.dyn = null; PTX.mats = {}; PTX.geos = {}; PTX.solids = []; PTX.floors = []; PTX.spots = []; PTX.people = []; PTX.forks = []; PTX.fx = []; PTX.open = []; PTX.rooms = []; }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === PTX_KEY)
ptxForget(); return r; }; })();
function ptxTick(dt) { return __ZC(382, 63, this, arguments, new.target); }
function ptxBoardCard() { return __ZC(382, 64, this, arguments, new.target); }
function ptxPlanCard() { return __ZC(382, 65, this, arguments, new.target); }
function ptxRecordsCard() { return __ZC(382, 66, this, arguments, new.target); }
var PTX_EXAMPLES = [
"A warehouse with three forklifts, pallet racking and a fire exit drill",
"A two-storey office floor plan with meeting rooms, a kitchen and a lift",
"A hospital ward floor with a first aid emergency",
"A factory with two production lines and a hazard inspection",
"A supermarket with six checkouts and a spill in the aisles",
"A three-storey school with a fire evacuation where an exit is blocked",
"A construction site with scaffolding and a tower crane",
"A two-storey brick family house"
];
var PTX_SAVEKEY = "somnu.sim.saved";
function ptxKeeper() { try {
var c = typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config.sim_studio;
return (c && typeof c === "object") ? c : {};
}
catch (e) {
return {};
} }
function ptxIsKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function ptxAllowed() {
var K = ptxKeeper();
if (ptxIsKeeper())
return true;
if (K.off)
return false;
if (K.who === "keeper")
return false;
if (K.who === "members")
return typeof hasAccess !== "function" || hasAccess();
return true;
}
function ptxSaved() { try {
var a = JSON.parse(localStorage.getItem(PTX_SAVEKEY) || "[]");
return Array.isArray(a) ? a : [];
}
catch (e) {
return [];
} }
function ptxSaveAdd(S) {
try {
var a = ptxSaved().filter(function (r) { return r.t !== S.text; });
a.unshift({ t: S.text, title: S.title, at: Date.now(), s: S.src === "ai" ? ptxCompact(S) : null });
localStorage.setItem(PTX_SAVEKEY, JSON.stringify(a.slice(0, 30)));
}
catch (e) { }
}
function ptxSaveDel(t) { try {
localStorage.setItem(PTX_SAVEKEY, JSON.stringify(ptxSaved().filter(function (r) { return r.t !== t; })));
}
catch (e) { } }
function ptxCompact(S) { return { type: S.type, storeys: S.storeys, w: S.w, d: S.d, skin: S.skin, items: S.items, drills: S.drills, blocked: S.blocked, night: S.night, src: S.src }; }
function ptxCode(S) { var o = { t: S.text }; if (S.src === "ai")
o.s = ptxCompact(S); try {
return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
catch (e) {
return "";
} }
function ptxUncode(c) { try {
var s = String(c).replace(/-/g, "+").replace(/_/g, "/");
while (s.length % 4)
s += "=";
var o = JSON.parse(decodeURIComponent(escape(atob(s))));
if (!o || typeof o.t !== "string")
return null;
return o.s ? ptxClean(o.s, o.t) : ptxRead(o.t);
}
catch (e) {
return null;
} }
function ptxLink(S) { return location.origin + location.pathname + "?play&sim=" + ptxCode(S); }
function ptxLaunch(S) { return __ZC(382, 67, this, arguments, new.target); }
function ptxGoText(t) { t = String(t || "").trim(); if (t.length < 3) {
ptxMsg("Type or say a scenario first: a building, what is in it, and the drill.");
return;
} return ptxLaunch(ptxRead(t)); }
function ptxAiRead(text) { return __ZC(382, 68, this, arguments, new.target); }
function ptxDiffers(a, b) { return a.type !== b.type || a.storeys !== b.storeys || Math.abs(a.w - b.w) > 4 || Math.abs(a.d - b.d) > 4 || a.drills.join() !== b.drills.join() || JSON.stringify(a.items) !== JSON.stringify(b.items); }
function ptxAiLater(S) { return __ZC(382, 69, this, arguments, new.target); }
function ptxMsg(t) { var m = document.getElementById("ptx-msg"); if (m)
m.innerHTML = t; }
function ptxClose() { var p = document.getElementById("ptx-panel"); if (p)
p.style.display = "none"; ptxListenStop(); }
function ptxOpen() { return __ZC(382, 70, this, arguments, new.target); }
function ptxListen(ta, btn) { return __ZC(382, 71, this, arguments, new.target); }
function ptxListenStop() { try {
if (PTX.rec)
PTX.rec.stop();
}
catch (e) { } PTX.rec = null; }
(function () {
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "ptx-ps"; }))
PS_EXTRAS.push({ id: "ptx-ps", label: "🏗️ Simulation", show: function () { return ptxAllowed(); }, run: function () { setTimeout(ptxOpen, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var pl = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (pl && pl.ids.indexOf("ptx-ps") < 0)
pl.ids.push("ptx-ps");
}
})();
setTimeout(function () {
try {
var m = /[?&]sim=([A-Za-z0-9_-]+)/.exec(location.search);
if (!m)
return;
var S = ptxUncode(m[1]);
if (!S)
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 60) {
clearInterval(iv);
return;
}
if (typeof camera === "undefined" || !camera || typeof scene === "undefined" || !scene || typeof setWalk !== "function")
return;
if (typeof PERF_JOINING !== "undefined" && PERF_JOINING)
return;
clearInterval(iv);
ptxLaunch(S);
try {
var q = new URLSearchParams(location.search);
q.delete("sim");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 4000);
